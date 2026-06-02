'use strict';

const fs = require('fs');
const path = require('path');
const { ensureDir } = require('./fs-utils');
const { redactObject } = require('./redactor');
const { renderMarkdownSummary } = require('./summary');

async function exportDiagnostics(config, scan, check) {
  await ensureDir(config.exportDir);

  const payload = redactObject({
    schema: 'living-architecture-nodes-action-diagnostic@0.1.0',
    generatedAt: new Date().toISOString(),
    repository: {
      workspace: config.workspace,
      githubRepository: process.env.GITHUB_REPOSITORY || null,
      githubRef: process.env.GITHUB_REF || null,
      githubSha: process.env.GITHUB_SHA || null,
      githubEventName: process.env.GITHUB_EVENT_NAME || null
    },
    configuration: {
      mode: config.mode,
      failOn: config.failOn,
      changedOnly: config.changedOnly,
      sourceExtensions: config.sourceExtensions,
      excludeDirs: config.excludeDirs
    },
    scan,
    check
  });

  const jsonPath = path.join(config.exportDir, 'living-architecture-diagnostic.json');
  const markdownPath = path.join(config.exportDir, 'living-architecture-diagnostic.md');

  await fs.promises.writeFile(jsonPath, JSON.stringify(payload, null, 2), 'utf8');
  await fs.promises.writeFile(markdownPath, renderMarkdownSummary(check, scan), 'utf8');

  return { jsonPath, markdownPath };
}

module.exports = {
  exportDiagnostics
};
