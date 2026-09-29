'use strict';

const path = require('path');
const { createDiagnosticPayload, sanitizeCheckForOutput } = require('./client-data');
const { renderMarkdownSummary } = require('./summary');
const { writeAtomicWorkspaceFile } = require('./workspace-authority');

async function exportDiagnostics(config, scan, check) {
  const exportRelative = path.relative(config.workspace, config.exportDir);
  const jsonRelative = path.join(exportRelative, 'living-architecture-diagnostic.json');
  const markdownRelative = path.join(exportRelative, 'living-architecture-diagnostic.md');

  const safeCheck = sanitizeCheckForOutput(check);
  const payload = createDiagnosticPayload(config, safeCheck);

  const jsonPath = await writeAtomicWorkspaceFile(
    config.workspace,
    jsonRelative,
    JSON.stringify(payload, null, 2),
    0o600
  );
  const markdownPath = await writeAtomicWorkspaceFile(
    config.workspace,
    markdownRelative,
    renderMarkdownSummary(safeCheck),
    0o600
  );

  return { jsonPath, markdownPath };
}

module.exports = { exportDiagnostics };
