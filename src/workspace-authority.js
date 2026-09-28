'use strict';

const fs = require('fs');
const path = require('path');

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

module.exports = {
  isWithin,
  resolveInside,
  resolveWorkspace,
  resolveExportDir
};
