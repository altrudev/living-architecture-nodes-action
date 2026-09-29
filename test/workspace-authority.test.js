'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const os = require('os');
const path = require('path');
const {
  resolveWorkspace,
  resolveExportDir,
  writeAtomicWorkspaceFile
} = require('../src/workspace-authority');

test('workspace may be root or a repository subdirectory', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'lan-action-root-'));
  fs.mkdirSync(path.join(root, 'packages'));
  assert.equal(resolveWorkspace(root, ''), fs.realpathSync(root));
  assert.equal(resolveWorkspace(root, 'packages'), path.join(fs.realpathSync(root), 'packages'));
});

test('workspace cannot escape GITHUB_WORKSPACE authority', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'lan-action-root-'));
  assert.throws(() => resolveWorkspace(root, '../outside'));
});

test('export path must remain relative and inside selected workspace', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'lan-action-root-'));
  assert.equal(resolveExportDir(root, '.lan-action'), path.join(fs.realpathSync(root), '.lan-action'));
  assert.throws(() => resolveExportDir(root, '../outside'));
  assert.throws(() => resolveExportDir(root, path.resolve(root, 'absolute')));
});

test('symbolic-link escape is rejected', (t) => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'lan-action-root-'));
  const outside = fs.mkdtempSync(path.join(os.tmpdir(), 'lan-action-outside-'));
  const link = path.join(root, 'linked');
  try {
    fs.symlinkSync(outside, link, 'dir');
  } catch (error) {
    t.skip('symlink unavailable: ' + error.message);
    return;
  }
  assert.throws(() => resolveExportDir(root, 'linked/output'));
});

test('atomic export replacement does not modify an external hard link to the old inode', async (t) => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'lan-action-hardlink-root-'));
  const outside = fs.mkdtempSync(path.join(os.tmpdir(), 'lan-action-hardlink-out-'));
  const exportDir = path.join(root, '.lan-action');
  const target = path.join(exportDir, 'living-architecture-diagnostic.json');
  const outsideFile = path.join(outside, 'client.txt');

  fs.mkdirSync(exportDir);
  fs.writeFileSync(outsideFile, 'client-original');

  try {
    fs.linkSync(outsideFile, target);
  } catch (error) {
    t.skip('hard links unavailable: ' + error.message);
    return;
  }

  await writeAtomicWorkspaceFile(root, '.lan-action/living-architecture-diagnostic.json', 'new-diagnostic');

  assert.equal(fs.readFileSync(outsideFile, 'utf8'), 'client-original');
  assert.equal(fs.readFileSync(target, 'utf8'), 'new-diagnostic');
});
