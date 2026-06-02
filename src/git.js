'use strict';

const fs = require('fs');
const { execFileSync } = require('child_process');
const { toPosixPath } = require('./fs-utils');

function runGit(args, cwd) {
  try {
    return execFileSync('git', args, {
      cwd,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore']
    }).trim();
  } catch (_) {
    return '';
  }
}

function getEventBaseSha() {
  const eventPath = process.env.GITHUB_EVENT_PATH;
  if (!eventPath || !fs.existsSync(eventPath)) return '';

  try {
    const event = JSON.parse(fs.readFileSync(eventPath, 'utf8'));
    return event && event.pull_request && event.pull_request.base && event.pull_request.base.sha
      ? event.pull_request.base.sha
      : '';
  } catch (_) {
    return '';
  }
}

function getChangedFiles(workspace) {
  const baseSha = getEventBaseSha();
  const candidates = [];

  if (baseSha) candidates.push([`${baseSha}...HEAD`]);
  if (process.env.GITHUB_BASE_REF) candidates.push([`origin/${process.env.GITHUB_BASE_REF}...HEAD`]);
  candidates.push(['HEAD~1', 'HEAD']);

  for (const candidate of candidates) {
    const output = runGit(['diff', '--name-only', ...candidate], workspace);
    if (output) {
      return output
        .split(/\r?\n/)
        .map((line) => toPosixPath(line.trim()))
        .filter(Boolean);
    }
  }

  const status = runGit(['status', '--porcelain'], workspace);
  if (!status) return [];

  return status
    .split(/\r?\n/)
    .map((line) => toPosixPath(line.slice(3).trim()))
    .filter(Boolean);
}

module.exports = {
  getChangedFiles
};
