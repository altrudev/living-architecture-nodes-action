'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { checkRepository, computeHealthScore } = require('../src/checker');

function baseConfig() {
  return {
    workspace: process.cwd(),
    mode: 'check',
    failOn: 'missing-required',
    changedOnly: false,
    sourceExtensions: ['.js']
  };
}

function baseScan() {
  return {
    requiredArtifacts: [
      { path: 'ARCH.md', exists: true },
      { path: 'NERVE.md', exists: true },
      { path: 'CHANGELOG.node.md', exists: true }
    ],
    sourceFiles: [],
    nodeFiles: [],
    sourceMappings: [],
    orphanNodes: []
  };
}

test('healthy basic checks do not claim semantic verification', () => {
  const result = checkRepository(baseConfig(), baseScan());
  assert.equal(result.status, 'healthy');
  assert.equal(result.healthScore, 100);
  assert.equal(result.verification.scope, 'basic-local-ci');
  assert.equal(result.verification.semanticArchitecture.status, 'NOT_VERIFIED');
  assert.equal(result.verification.semanticArchitecture.executed, false);
  assert.equal(Object.prototype.hasOwnProperty.call(result, 'pro'), false);
});

test('maintenance score is bounded and remains separate from verification state', () => {
  const score = computeHealthScore({
    missingRequired: ['ARCH.md', 'NERVE.md', 'CHANGELOG.node.md'],
    missingNodes: Array(100).fill({}),
    dirtyNodes: Array(100).fill({}),
    orphanNodes: Array(100).fill({})
  });
  assert.equal(score, 0);
});
