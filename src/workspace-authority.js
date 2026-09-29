'use strict';

const fs = require('fs');
const fsConstants = fs.constants;
const path = require('path');
const crypto = require('crypto');

function isWithin(root, candidate) {
  const relative = path.relative(root, candidate);
  return relative === '' || (relative !== '..' && !relative.startsWith('..' + path.sep) && !path.isAbsolute(relative));
}

function existingAncestor(target) {
  let current = target;
  while (!fs.existsSync(current)) {
    const parent = path.dirname(current);
    if (parent === current) break;
    current = parent;
  }
  return current;
}

function rejectSymlinkComponents(rootReal, candidate) {
  const relative = path.relative(rootReal, candidate);
  let current = rootReal;
  for (const segment of relative.split(path.sep).filter(Boolean)) {
    current = path.join(current, segment);
    if (!fs.existsSync(current)) break;
    if (fs.lstatSync(current).isSymbolicLink()) {
      throw new Error('LAN workspace authority denied: symbolic-link path component: ' + current);
    }
  }
}

function resolveInside(root, target, options = {}) {
  const rootReal = fs.realpathSync(path.resolve(root));
  const candidate = path.isAbsolute(target)
    ? path.resolve(target)
    : path.resolve(rootReal, target || '.');

  if (!isWithin(rootReal, candidate)) {
    throw new Error('LAN workspace authority denied: target escapes authorized root');
  }

  rejectSymlinkComponents(rootReal, candidate);

  const ancestor = existingAncestor(candidate);
  const ancestorReal = fs.realpathSync(ancestor);
  if (!isWithin(rootReal, ancestorReal)) {
    throw new Error('LAN workspace authority denied: resolved path escapes authorized root');
  }

  if (options.mustExist && !fs.existsSync(candidate)) {
    throw new Error('LAN workspace authority denied: target does not exist');
  }

  return candidate;
}

function resolveWorkspace(githubWorkspace, workspaceInput = '') {
  if (!githubWorkspace) throw new Error('GITHUB_WORKSPACE (or local workspace root) is required');
  return resolveInside(githubWorkspace, workspaceInput || '.', { mustExist: true });
}

function resolveExportDir(workspace, exportPath) {
  if (path.isAbsolute(exportPath || '')) {
    throw new Error('LAN export_path must be workspace-relative');
  }
  return resolveInside(workspace, exportPath || '.lan-action');
}

function noFollowFlag() {
  return typeof fsConstants.O_NOFOLLOW === 'number' ? fsConstants.O_NOFOLLOW : 0;
}

async function ensurePrivateDirectory(workspace, relativeDir) {
  const target = resolveInside(workspace, relativeDir || '.');
  const existed = fs.existsSync(target);
  await fs.promises.mkdir(target, { recursive: true, mode: 0o700 });

  const verified = resolveInside(workspace, relativeDir || '.', { mustExist: true });
  if (!existed && process.platform !== 'win32') {
    await fs.promises.chmod(verified, 0o700);
  }
  return verified;
}

async function writeAtomicWorkspaceFile(workspace, relativePath, content, mode = 0o600) {
  if (path.isAbsolute(relativePath)) {
    throw new Error('LAN workspace authority denied: write target must be relative');
  }

  const parentRel = path.dirname(relativePath);
  const parent = await ensurePrivateDirectory(workspace, parentRel === '.' ? '' : parentRel);
  const base = path.basename(relativePath);
  const tempName = '.' + base + '.lan-tmp-' + crypto.randomBytes(8).toString('hex');
  const tempRel = path.join(parentRel, tempName);
  const tempPath = resolveInside(workspace, tempRel);
  const flags = fsConstants.O_WRONLY | fsConstants.O_CREAT | fsConstants.O_EXCL | noFollowFlag();

  let handle;
  try {
    handle = await fs.promises.open(tempPath, flags, mode);
    await handle.writeFile(content, 'utf8');
    await handle.sync();
    if (process.platform !== 'win32') await handle.chmod(mode);
    await handle.close();
    handle = null;

    const parentAgain = resolveInside(workspace, parentRel === '.' ? '' : parentRel, { mustExist: true });
    if (parentAgain !== parent) {
      throw new Error('LAN workspace authority denied: destination parent changed during write');
    }

    const finalPath = resolveInside(workspace, relativePath);
    await fs.promises.rename(tempPath, finalPath);
    return finalPath;
  } finally {
    if (handle) await handle.close();
    try {
      await fs.promises.unlink(tempPath);
    } catch (_) {
      // Temp path was renamed or already removed.
    }
  }
}

module.exports = {
  isWithin,
  resolveInside,
  resolveWorkspace,
  resolveExportDir,
  ensurePrivateDirectory,
  writeAtomicWorkspaceFile
};
