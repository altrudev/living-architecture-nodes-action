#!/usr/bin/env node
'use strict';

const path = require('path');
const { getConfig } = require('./config');
const { scanRepository } = require('./scanner');
const { checkRepository } = require('./checker');
const { exportDiagnostics } = require('./exporter');
const { renderConsoleSummary, renderMarkdownSummary } = require('./summary');
const { writeOutput, writeStepSummary, notice, warning, error } = require('./github-io');

async function main() {
  const config = getConfig(process.argv);
  const scan = await scanRepository(config);
  const check = checkRepository(config, scan);
  const exports = await exportDiagnostics(config, scan, check);

  console.log(renderConsoleSummary(check));
  console.log(`Diagnostic JSON: ${path.relative(config.workspace, exports.jsonPath)}`);
  console.log(`Diagnostic Markdown: ${path.relative(config.workspace, exports.markdownPath)}`);

  writeOutput('health_score', check.healthScore);
  writeOutput('status', check.status);
  writeOutput('missing_required_count', check.missingRequired.length);
  writeOutput('missing_node_count', check.missingNodes.length);
  writeOutput('dirty_node_count', check.dirtyNodes.length);
  writeOutput('diagnostic_json', path.relative(config.workspace, exports.jsonPath));
  writeOutput('diagnostic_markdown', path.relative(config.workspace, exports.markdownPath));

  if (config.writeSummary) {
    writeStepSummary(renderMarkdownSummary(check, scan));
  }

  if (check.status === 'healthy') {
    notice(`Living Architecture Nodes healthy: ${check.healthScore}/100`);
  } else if (check.status === 'warning') {
    warning(`Living Architecture Nodes warnings detected: ${check.healthScore}/100`);
  } else {
    error(`Living Architecture Nodes failed policy: ${check.healthScore}/100`);
  }

  if (check.shouldFail) {
    process.exitCode = 1;
  }
}

main().catch((err) => {
  error(err && err.stack ? err.stack : String(err));
  process.exitCode = 1;
});
