'use strict';

const path = require('path');

const DEFAULT_SOURCE_EXTENSIONS = [
  '.js', '.jsx', '.ts', '.tsx', '.mjs', '.cjs',
  '.py', '.cs', '.java', '.go', '.rs', '.php', '.rb', '.swift',
  '.kt', '.kts', '.vue', '.svelte', '.html', '.css', '.yml', '.yaml'
];

const DEFAULT_EXCLUDE_DIRS = [
  '.git', 'node_modules', 'dist', 'build', 'out', 'coverage',
  '.next', '.nuxt', '.turbo', '.cache', 'vendor', '.venv', 'venv', '__pycache__', '.lan-action'
];

const REQUIRED_ARTIFACTS = ['ARCH.md', 'NERVE.md', 'CHANGELOG.node.md'];

function readInput(name, fallback = '') {
  const envName = `INPUT_${name.replace(/ /g, '_').toUpperCase()}`;
  const value = process.env[envName];
  return value === undefined || value === null || value === '' ? fallback : value;
}

function parseCsv(value, fallback) {
  if (!value || typeof value !== 'string') return fallback.slice();
  const parsed = value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
  return parsed.length > 0 ? parsed : fallback.slice();
}

function parseBoolean(value, fallback = false) {
  if (value === undefined || value === null || value === '') return fallback;
  return ['1', 'true', 'yes', 'on'].includes(String(value).trim().toLowerCase());
}

function getConfig(argv = process.argv) {
  const workspaceInput = readInput('workspace', '');
  const workspace = path.resolve(workspaceInput || process.env.GITHUB_WORKSPACE || process.cwd());
  const exportPathInput = readInput('export_path', '.lan-action');

  return {
    workspace,
    mode: readInput('mode', 'check').toLowerCase(),
    failOn: readInput('fail_on', 'missing-required').toLowerCase(),
    changedOnly: parseBoolean(readInput('changed_only', 'true'), true),
    sourceExtensions: parseCsv(readInput('source_extensions', DEFAULT_SOURCE_EXTENSIONS.join(',')), DEFAULT_SOURCE_EXTENSIONS),
    excludeDirs: parseCsv(readInput('exclude_dirs', DEFAULT_EXCLUDE_DIRS.join(',')), DEFAULT_EXCLUDE_DIRS),
    exportDir: path.resolve(workspace, exportPathInput),
    writeSummary: parseBoolean(readInput('write_summary', 'true'), true),
    proLicenseKey: readInput('pro_license_key', ''),
    localSelfCheck: argv.includes('--local-self-check')
  };
}

module.exports = {
  DEFAULT_SOURCE_EXTENSIONS,
  DEFAULT_EXCLUDE_DIRS,
  REQUIRED_ARTIFACTS,
  getConfig
};
