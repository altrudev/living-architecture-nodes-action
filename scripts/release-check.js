'use strict';

const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const pkg = require('../package.json');
const manifest = require('../release/marketplace-manifest.json');
const failures = [];

function requireFile(rel) {
  const abs = path.join(root, rel);
  if (!fs.existsSync(abs)) failures.push('missing release file: ' + rel);
  return abs;
}

function text(rel) {
  const abs = requireFile(rel);
  return fs.existsSync(abs) ? fs.readFileSync(abs, 'utf8') : '';
}

for (const rel of [
  'action.yml','README.md','LICENSE','PRIVACY.md','SUPPORT.md','SECURITY.md',
  'CHANGELOG.md','ARCH.md','NERVE.md','CHANGELOG.node.md','PRODUCT_ROADMAP.md',
  'release/marketplace-manifest.json'
]) requireFile(rel);

const rootActionFiles = fs.readdirSync(root).filter((name) => name === 'action.yml' || name === 'action.yaml');
if (rootActionFiles.length !== 1) failures.push('repository must contain exactly one root action.yml/action.yaml');

const action = text('action.yml');
if (!action.includes('name: "Living Architecture Nodes Check"')) failures.push('Marketplace action name drifted');
if (!action.includes('branding:')) failures.push('action branding is required for Marketplace listing');
if (!action.includes('using: "node24"')) failures.push('Action runtime must remain node24 for this release');
if (!action.includes('main: "src/index.js"')) failures.push('Action entrypoint drifted');
if (action.includes('pro_license_key')) failures.push('raw pro_license_key input is forbidden');
if (!action.includes('verification_scope:')) failures.push('verification_scope output is missing');
if (!action.includes('semantic_architecture_status:')) failures.push('semantic_architecture_status output is missing');

if (pkg.version !== manifest.version) failures.push('package version and Marketplace manifest version differ');
if (manifest.version !== '0.1.2' || manifest.release_tag !== 'v0.1.2') failures.push('v0.1.2 release identity drifted');
if (manifest.pricing !== 'free') failures.push('GitHub Action Marketplace release must remain free');
if (manifest.paid_entitlements_enabled !== false) failures.push('paid entitlements must not be enabled in the Action');
if (manifest.runtime_network_access !== false) failures.push('runtime network access must remain false');
if (manifest.telemetry !== false) failures.push('telemetry must remain false');
if (manifest.marketplace_publication_verified !== true) failures.push('Marketplace publication must be explicitly verified');
if (manifest.marketplace_publish_allowed !== true) failures.push('Marketplace publication gate must be open after live listing verification');
if (!Array.isArray(manifest.marketplace_publish_blockers) || manifest.marketplace_publish_blockers.length !== 0) failures.push('Marketplace publish blockers must be empty after verification');
if (manifest.release_commit !== 'c7d44c31bb7631d8aec357b94803d89246555e7e') failures.push('verified release commit drifted');
if (manifest.alias_target_commit !== manifest.release_commit) failures.push('compatibility alias target must equal verified release commit');
if (JSON.stringify(manifest.floating_tags) !== JSON.stringify(['v0.1','v0'])) failures.push('compatibility alias set drifted');
if (manifest.marketplace_listing_url !== 'https://github.com/marketplace/actions/living-architecture-nodes-check') failures.push('Marketplace listing URL drifted');

for (const rel of ['src/workspace-authority.node.md','test/checker.test.node.md']) {
  const value = text(rel);
  if (value.includes('v0.1.1')) failures.push('stale release identity remains in current architecture memory: ' + rel);
}

const readme = text('README.md');
for (const phrase of [
  'Free GitHub Action',
  'NOT_VERIFIED',
  'no telemetry',
  'v0.1.2',
  'not a semantic architecture verdict'
]) {
  if (!readme.includes(phrase)) failures.push('README missing required Marketplace statement: ' + phrase);
}
if (readme.includes('pro_license_key')) failures.push('README still documents legacy pro_license_key');

const sourceFiles = [];
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const abs = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(abs);
    else if (entry.isFile() && entry.name.endsWith('.js')) sourceFiles.push(abs);
  }
}
walk(path.join(root, 'src'));

const forbiddenRuntime = [
  /require\(['"]https?['"]\)/,
  /require\(['"]net['"]\)/,
  /require\(['"]tls['"]\)/,
  /\bfetch\s*\(/,
  /https?:\/\//
];
const forbiddenSecrets = [
  /BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY/,
  /ghp_[A-Za-z0-9_]{20,}/,
  /github_pat_[A-Za-z0-9_]{20,}/,
  /sk_live_[A-Za-z0-9]+/
];

for (const abs of sourceFiles) {
  const value = fs.readFileSync(abs, 'utf8');
  const rel = path.relative(root, abs);
  for (const pattern of forbiddenRuntime) if (pattern.test(value)) failures.push('runtime network capability/literal detected: ' + rel);
  for (const pattern of forbiddenSecrets) if (pattern.test(value)) failures.push('credential/private material detected: ' + rel);
}

if (failures.length) {
  console.error('LAN GitHub Marketplace release check: FAILED');
  for (const failure of failures) console.error('- ' + failure);
  process.exit(1);
}

console.log('LAN GitHub Marketplace release check: VERIFIED');
console.log('Repository: ' + manifest.repository);
console.log('Action: ' + manifest.marketplace_name);
console.log('Release: ' + manifest.release_tag);
console.log('Pricing: FREE');
console.log('Runtime network access: none detected');
console.log('Telemetry: none');
console.log('Raw license-key input: absent');
console.log('Marketplace publication: VERIFIED LIVE');
console.log('Compatibility aliases: v0.1, v0 → ' + manifest.alias_target_commit);
