'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { sanitizeCheckForOutput, createDiagnosticPayload } = require('../src/client-data');
const { renderMarkdownSummary } = require('../src/summary');
const { exportDiagnostics } = require('../src/exporter');

function checkFixture(root) {
  return {
    timestamp: '2026-09-29T12:00:00.000Z',
    workspace: root,
    mode: 'check',
    failOn: 'missing-required',
    sourceFileCount: 2,
    nodeFileCount: 0,
    sourceContents: 'CLIENT_SOURCE_SECRET_X7Y9Z_DO_NOT_EXPORT',
    sourceFiles: ['all-source-inventory.js'],
    nodeFiles: ['all-node-inventory.node.md'],
    missingRequired: [],
    missingNodes: [{
      sourcePath: 'token=ghp_ABCDEFGHIJKLMNOPQRSTUVWXYZ123456.js',
      nodePath: 'token=ghp_ABCDEFGHIJKLMNOPQRSTUVWXYZ123456.node.md',
      nodeExists: false,
      unexpected: 'PRIVATE_INTERNAL_FIELD'
    }],
    dirtyNodes: [],
    orphanNodes: ['bad\n[click](command:evil).node.md'],
    healthScore: 97,
    status: 'warning',
    shouldFail: false,
    verification: {
      scope: 'basic-local-ci',
      checksExecuted: ['required-artifacts', 'node-coverage'],
      semanticArchitecture: {
        status: 'NOT_VERIFIED',
        executed: false,
        reason: 'Not executed'
      }
    }
  };
}

function configFixture(root) {
  return {
    workspace: root,
    exportDir: path.join(root, '.lan-action'),
    mode: 'check',
    failOn: 'missing-required',
    changedOnly: true,
    sourceExtensions: ['.js'],
    excludeDirs: ['node_modules', '.lan-action']
  };
}

test('client-data allowlist drops absolute paths, full inventory, source contents, and unknown fields', () => {
  const root = path.join(os.tmpdir(), 'client-private-root');
  const safe = sanitizeCheckForOutput(checkFixture(root));
  const text = JSON.stringify(safe);

  for (const forbidden of [
    root,
    'CLIENT_SOURCE_SECRET_X7Y9Z_DO_NOT_EXPORT',
    'all-source-inventory.js',
    'all-node-inventory.node.md',
    'PRIVATE_INTERNAL_FIELD',
    'ghp_ABCDEFGHIJKLMNOPQRSTUVWXYZ123456'
  ]) {
    assert.equal(text.includes(forbidden), false);
  }

  assert.equal(Object.prototype.hasOwnProperty.call(safe, 'workspace'), false);
  assert.equal(Object.prototype.hasOwnProperty.call(safe, 'sourceFiles'), false);
  assert.equal(Object.prototype.hasOwnProperty.call(safe, 'nodeFiles'), false);
  assert.equal(text.includes('[REDACTED]'), true);
});

test('diagnostic payload excludes repository identity and environment metadata', () => {
  const root = path.join(os.tmpdir(), 'client-private-root');
  const safe = sanitizeCheckForOutput(checkFixture(root));
  const payload = createDiagnosticPayload(configFixture(root), safe);
  const text = JSON.stringify(payload);

  assert.equal(text.includes(root), false);
  assert.equal(Object.prototype.hasOwnProperty.call(payload, 'repository'), false);
  assert.deepEqual(Object.keys(payload.configuration).sort(), ['changedOnly', 'failOn', 'mode']);
});

test('Markdown uses the sanitized model and escapes hostile filenames', () => {
  const root = path.join(os.tmpdir(), 'client-private-root');
  const safe = sanitizeCheckForOutput(checkFixture(root));
  const markdown = renderMarkdownSummary(safe);

  assert.equal(markdown.includes(root), false);
  assert.equal(markdown.includes('ghp_ABCDEFGHIJKLMNOPQRSTUVWXYZ123456'), false);
  assert.equal(markdown.includes('[click](command:evil)'), false);
  assert.equal(markdown.includes('[REDACTED]'), true);
  assert.match(markdown, /\\\[click\\\]\\\(command:evil\\\)/);
});

test('real export writes only client-safe JSON and Markdown with private modes where supported', async () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'lan-action-export-'));
  const config = configFixture(root);
  const check = checkFixture(root);
  const result = await exportDiagnostics(config, {}, check);

  const json = fs.readFileSync(result.jsonPath, 'utf8');
  const markdown = fs.readFileSync(result.markdownPath, 'utf8');

  for (const output of [json, markdown]) {
    for (const forbidden of [
      root,
      'CLIENT_SOURCE_SECRET_X7Y9Z_DO_NOT_EXPORT',
      'all-source-inventory.js',
      'all-node-inventory.node.md',
      'ghp_ABCDEFGHIJKLMNOPQRSTUVWXYZ123456'
    ]) {
      assert.equal(output.includes(forbidden), false);
    }
    assert.equal(output.includes('[REDACTED]'), true);
  }

  if (process.platform !== 'win32') {
    assert.equal(fs.statSync(result.jsonPath).mode & 0o077, 0);
    assert.equal(fs.statSync(result.markdownPath).mode & 0o077, 0);
    assert.equal(fs.statSync(path.dirname(result.jsonPath)).mode & 0o077, 0);
  }
});
