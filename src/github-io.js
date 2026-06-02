'use strict';

const fs = require('fs');

function writeOutput(name, value) {
  const outputPath = process.env.GITHUB_OUTPUT;
  if (!outputPath) return;
  fs.appendFileSync(outputPath, `${name}=${String(value).replace(/\r?\n/g, ' ')}\n`, 'utf8');
}

function writeStepSummary(markdown) {
  const summaryPath = process.env.GITHUB_STEP_SUMMARY;
  if (!summaryPath) return;
  fs.appendFileSync(summaryPath, `${markdown}\n`, 'utf8');
}

function notice(message) {
  console.log(`::notice::${escapeCommand(message)}`);
}

function warning(message) {
  console.log(`::warning::${escapeCommand(message)}`);
}

function error(message) {
  console.log(`::error::${escapeCommand(message)}`);
}

function escapeCommand(message) {
  return String(message)
    .replace(/%/g, '%25')
    .replace(/\r/g, '%0D')
    .replace(/\n/g, '%0A');
}

module.exports = {
  writeOutput,
  writeStepSummary,
  notice,
  warning,
  error
};
