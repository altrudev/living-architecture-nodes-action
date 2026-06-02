'use strict';

const path = require('path');
const { REQUIRED_ARTIFACTS } = require('./config');
const { exists, relativePosix, walkFiles } = require('./fs-utils');

function isSourceFile(filePath, sourceExtensions) {
  const lower = filePath.toLowerCase();
  if (lower.endsWith('.node.md')) return false;
  return sourceExtensions.includes(path.extname(lower));
}

function nodePathForSource(sourcePath) {
  const dir = path.dirname(sourcePath);
  const ext = path.extname(sourcePath);
  const base = path.basename(sourcePath, ext);
  return path.join(dir, `${base}.node.md`);
}

async function scanRepository(config) {
  const allFiles = await walkFiles(config.workspace, { excludeDirs: config.excludeDirs });
  const sourceFiles = allFiles.filter((filePath) => isSourceFile(filePath, config.sourceExtensions));
  const nodeFiles = allFiles.filter((filePath) => {
    const rel = relativePosix(config.workspace, filePath);
    return filePath.toLowerCase().endsWith('.node.md') && rel !== 'CHANGELOG.node.md';
  });

  const requiredArtifacts = [];
  for (const artifact of REQUIRED_ARTIFACTS) {
    const fullPath = path.join(config.workspace, artifact);
    requiredArtifacts.push({
      path: artifact,
      exists: await exists(fullPath)
    });
  }

  const sourceMappings = [];
  for (const sourcePath of sourceFiles) {
    const nodePath = nodePathForSource(sourcePath);
    sourceMappings.push({
      sourcePath: relativePosix(config.workspace, sourcePath),
      nodePath: relativePosix(config.workspace, nodePath),
      nodeExists: await exists(nodePath)
    });
  }

  const sourceNodeSet = new Set(sourceMappings.map((item) => item.nodePath));
  const orphanNodes = nodeFiles
    .map((filePath) => relativePosix(config.workspace, filePath))
    .filter((nodePath) => !sourceNodeSet.has(nodePath));

  return {
    requiredArtifacts,
    sourceFiles: sourceFiles.map((filePath) => relativePosix(config.workspace, filePath)),
    nodeFiles: nodeFiles.map((filePath) => relativePosix(config.workspace, filePath)),
    sourceMappings,
    orphanNodes
  };
}

module.exports = {
  scanRepository,
  nodePathForSource,
  isSourceFile
};
