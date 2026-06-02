'use strict';

const path = require('path');
const { getChangedFiles } = require('./git');
const { nodePathForSource, isSourceFile } = require('./scanner');
const { toPosixPath } = require('./fs-utils');

function computeHealthScore({ missingRequired, missingNodes, dirtyNodes, orphanNodes }) {
  let score = 100;
  score -= missingRequired.length * 25;
  score -= Math.min(40, missingNodes.length * 3);
  score -= Math.min(25, dirtyNodes.length * 4);
  score -= Math.min(10, orphanNodes.length * 1);
  return Math.max(0, Math.min(100, score));
}

function statusForScore(score, hasFailure) {
  if (hasFailure || score < 70) return 'failed';
  if (score < 90) return 'warning';
  return 'healthy';
}

function shouldFail(failOn, result) {
  switch (failOn) {
    case 'never':
      return false;
    case 'missing-required':
      return result.missingRequired.length > 0;
    case 'missing-nodes':
      return result.missingRequired.length > 0 || result.missingNodes.length > 0;
    case 'dirty-nodes':
      return result.missingRequired.length > 0 || result.missingNodes.length > 0 || result.dirtyNodes.length > 0;
    case 'warnings':
      return result.healthScore < 100 || result.orphanNodes.length > 0;
    default:
      return result.missingRequired.length > 0;
  }
}

function detectDirtyNodes(config, scan) {
  if (!config.changedOnly) return [];

  const changedFiles = getChangedFiles(config.workspace);
  const changedSet = new Set(changedFiles);

  return changedFiles
    .filter((changedPath) => isSourceFile(changedPath, config.sourceExtensions))
    .map((sourcePath) => {
      const absolute = path.join(config.workspace, sourcePath);
      const nodePath = toPosixPath(path.relative(config.workspace, nodePathForSource(absolute)));
      return { sourcePath, nodePath };
    })
    .filter((entry) => !changedSet.has(entry.nodePath))
    .filter((entry) => scan.sourceMappings.some((mapping) => mapping.sourcePath === entry.sourcePath && mapping.nodeExists));
}

function checkRepository(config, scan) {
  const missingRequired = scan.requiredArtifacts.filter((artifact) => !artifact.exists).map((artifact) => artifact.path);
  const missingNodes = scan.sourceMappings.filter((mapping) => !mapping.nodeExists);
  const dirtyNodes = detectDirtyNodes(config, scan);
  const orphanNodes = scan.orphanNodes;
  const healthScore = computeHealthScore({ missingRequired, missingNodes, dirtyNodes, orphanNodes });

  const result = {
    timestamp: new Date().toISOString(),
    workspace: config.workspace,
    mode: config.mode,
    failOn: config.failOn,
    sourceFileCount: scan.sourceFiles.length,
    nodeFileCount: scan.nodeFiles.length,
    missingRequired,
    missingNodes,
    dirtyNodes,
    orphanNodes,
    healthScore,
    status: 'healthy',
    shouldFail: false,
    pro: {
      licenseProvided: Boolean(config.proLicenseKey),
      licenseValidated: false,
      note: 'Pro license validation is reserved for a future commercial release and is not active in v0.1.0.'
    }
  };

  result.shouldFail = shouldFail(config.failOn, result);
  result.status = statusForScore(healthScore, result.shouldFail);
  return result;
}

module.exports = {
  checkRepository,
  computeHealthScore,
  shouldFail
};
