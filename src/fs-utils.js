'use strict';

const fs = require('fs');
const path = require('path');

async function exists(filePath) {
  try {
    await fs.promises.access(filePath);
    return true;
  } catch (_) {
    return false;
  }
}

async function ensureDir(dirPath) {
  await fs.promises.mkdir(dirPath, { recursive: true });
}

function toPosixPath(filePath) {
  return filePath.split(path.sep).join('/');
}

function relativePosix(root, filePath) {
  return toPosixPath(path.relative(root, filePath));
}

function isInsideExcludedDir(relativePath, excludeDirs) {
  const parts = toPosixPath(relativePath).split('/');
  return parts.some((part) => excludeDirs.includes(part));
}

async function walkFiles(root, options = {}) {
  const excludeDirs = options.excludeDirs || [];
  const results = [];

  async function walk(current) {
    const entries = await fs.promises.readdir(current, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(current, entry.name);
      const rel = relativePosix(root, fullPath);

      if (entry.isDirectory()) {
        if (!excludeDirs.includes(entry.name) && !isInsideExcludedDir(rel, excludeDirs)) {
          await walk(fullPath);
        }
        continue;
      }

      if (entry.isFile()) {
        results.push(fullPath);
      }
    }
  }

  await walk(root);
  return results;
}

module.exports = {
  exists,
  ensureDir,
  toPosixPath,
  relativePosix,
  isInsideExcludedDir,
  walkFiles
};
