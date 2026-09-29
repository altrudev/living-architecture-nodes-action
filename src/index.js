#!/usr/bin/env node
'use strict';

const path = require('path');
const { getConfig } = require('./config');
const { scanRepository } = require('./scanner');
const { checkRepository } = require('./checker');
const { exportDiagnostics } = require('./exporter');
const { sanitizeCheckForOutput } = require('./client-data');
const { renderConsoleSummary, renderMarkdownSummary } = require('./summary');
const { writeOutput, writeStepSummary, notice, warning, error } = require('./github-io');

async function main() {
  const config = getConfig(process.argv);
  const scan = await scanRepository(config);
  const check = checkRepository(config, scan);
  const safeCheck = sanitizeCheckForOutput(check);
  const exports = await exportDiagnostics(config, scan, check);

  console.log(renderConsoleSummary(safeCheck));
  console.log('Diagnostic JSON: ' + path.relative(config.workspace, exports.jsonPath));
  console.log('Diagnostic Markdown: ' + path.relative(config.workspace, exports.markdownPath));

  writeOutput('health_score', safeCheck.healthScore);
  writeOutput('status', safeCheck.status);
  writeOutput('verification_scope', safeCheck.verification.scope);
  writeOutput('semantic_architecture_status', safeCheck.verification.semanticArchitecture.status);
  writeOutput('missing_required_count', safeCheck.missingRequired.length);
  writeOutput('missing_node_count', safeCheck.missingNodes.length);
  writeOutput('dirty_node_count', safeCheck.dirtyNodes.length);
  writeOutput('diagnostic_json', path.relative(config.workspace, exports.jsonPath));
  writeOutput('diagnostic_markdown', path.relative(config.workspace, exports.markdownPath));

  if (config.writeSummary) writeStepSummary(renderMarkdownSummary(safeCheck));

  if (safeCheck.status === 'healthy') notice('Living Architecture Nodes basic CI checks healthy: ' + safeCheck.healthScore + '/100');
  else if (safeCheck.status === 'warning') warning('Living Architecture Nodes basic CI warnings detected: ' + safeCheck.healthScore + '/100');
  else error('Living Architecture Nodes basic CI policy failed: ' + safeCheck.healthScore + '/100');

  if (safeCheck.shouldFail) process.exitCode = 1;
}

main().catch((err) => {
  error(err && err.stack ? err.stack : String(err));
  process.exitCode = 1;
});
