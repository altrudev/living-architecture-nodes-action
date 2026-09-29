'use strict';

const { redactObject } = require('./redactor');

function sanitizePathPair(entry) {
  return {
    sourcePath: entry && entry.sourcePath ? entry.sourcePath : '',
    nodePath: entry && entry.nodePath ? entry.nodePath : ''
  };
}

function sanitizeCheckForOutput(check = {}) {
  const safe = {
    timestamp: check.timestamp,
    mode: check.mode,
    failOn: check.failOn,
    sourceFileCount: check.sourceFileCount,
    nodeFileCount: check.nodeFileCount,
    missingRequired: Array.isArray(check.missingRequired) ? check.missingRequired.slice() : [],
    missingNodes: Array.isArray(check.missingNodes) ? check.missingNodes.map(sanitizePathPair) : [],
    dirtyNodes: Array.isArray(check.dirtyNodes) ? check.dirtyNodes.map(sanitizePathPair) : [],
    orphanNodes: Array.isArray(check.orphanNodes) ? check.orphanNodes.slice() : [],
    healthScore: check.healthScore,
    status: check.status,
    shouldFail: Boolean(check.shouldFail),
    verification: {
      scope: check.verification && check.verification.scope,
      checksExecuted: check.verification && Array.isArray(check.verification.checksExecuted)
        ? check.verification.checksExecuted.slice()
        : [],
      semanticArchitecture: {
        status: check.verification && check.verification.semanticArchitecture
          ? check.verification.semanticArchitecture.status
          : 'NOT_VERIFIED',
        executed: Boolean(check.verification && check.verification.semanticArchitecture && check.verification.semanticArchitecture.executed),
        reason: check.verification && check.verification.semanticArchitecture
          ? check.verification.semanticArchitecture.reason
          : 'Semantic architecture verification was not executed.'
      }
    }
  };

  return redactObject(safe);
}

function createDiagnosticPayload(config, check) {
  return {
    schema: 'living-architecture-nodes-action-diagnostic@0.1.3',
    generatedAt: new Date().toISOString(),
    configuration: {
      mode: config.mode,
      failOn: config.failOn,
      changedOnly: config.changedOnly
    },
    check: sanitizeCheckForOutput(check)
  };
}

module.exports = {
  sanitizeCheckForOutput,
  createDiagnosticPayload
};
