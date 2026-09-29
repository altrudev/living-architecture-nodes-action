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

function requirePhrases(rel, phrases) {
  const value = text(rel);
  for (const phrase of phrases) {
    if (!value.includes(phrase)) failures.push(rel + ' missing required phrase: ' + phrase);
  }
  return value;
}

for (const rel of [
  'action.yml',
  'README.md',
  'EULA.md',
  'LICENSE',
  'NOTICE.md',
  'TRADEMARK.md',
  'THIRD_PARTY_NOTICES.md',
  'CONTRIBUTING.md',
  'PRIVACY.md',
  'SECURITY.md',
  'SUPPORT.md',
  'CHANGELOG.md',
  'RELEASE.md',
  'ARCH.md',
  'NERVE.md',
  'CHANGELOG.node.md',
  'PRODUCT_ROADMAP.md',
  'package.json',
  'package-lock.json',
  'release/marketplace-manifest.json',
  'src/client-data.js',
  'src/client-data.node.md',
  'test/export-security.test.js',
  'test/export-security.test.node.md'
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
if (!action.includes('client-safe local diagnostic')) failures.push('action metadata must describe client-safe diagnostics');

if (pkg.version !== manifest.candidate_release.version) failures.push('package version and candidate release version differ');
if (pkg.version !== '0.1.3' || manifest.candidate_release.tag !== 'v0.1.3') failures.push('v0.1.3 candidate release identity drifted');
if (pkg.license !== 'SEE LICENSE IN LICENSE') failures.push('package license field must point explicitly to LICENSE');
if (Object.keys(pkg.dependencies || {}).length !== 0) failures.push('runtime npm dependencies must remain zero');

const lock = JSON.parse(text('package-lock.json') || '{}');
if (lock.lockfileVersion !== 3) failures.push('package-lock.json must use lockfileVersion 3');
if (lock.packages?.['']?.version !== '0.1.3') failures.push('package-lock root version must equal 0.1.3');
if (Object.keys(lock.packages?.['']?.dependencies || {}).length !== 0) failures.push('package-lock root runtime dependencies must remain zero');

if (manifest.schema_version !== 2) failures.push('Marketplace manifest schema must be 2');
if (manifest.pricing !== 'free') failures.push('GitHub Action Marketplace release must remain free');
if (manifest.paid_entitlements_enabled !== false) failures.push('paid entitlements must not be enabled in the Action');

if (manifest.live_release?.version !== '0.1.2') failures.push('current live Marketplace version must remain 0.1.2 until candidate promotion');
if (manifest.live_release?.tag !== 'v0.1.2') failures.push('current live Marketplace tag drifted');
if (manifest.live_release?.commit !== 'c7d44c31bb7631d8aec357b94803d89246555e7e') failures.push('verified live release commit drifted');
if (manifest.live_release?.marketplace_verified !== true) failures.push('current live release must remain verified');

if (manifest.candidate_release?.marketplace_verified !== false) failures.push('v0.1.3 candidate must not be marked Marketplace verified before publication');
if (manifest.candidate_release?.marketplace_publish_allowed !== false) failures.push('v0.1.3 candidate publish flag must remain blocked before final promotion');
if (!Array.isArray(manifest.candidate_release?.marketplace_publish_blockers) || manifest.candidate_release.marketplace_publish_blockers.length < 4) {
  failures.push('candidate Marketplace blockers must remain explicit');
}

for (const tag of ['v0.1', 'v0']) {
  if (manifest.compatibility_aliases?.[tag] !== 'c7d44c31bb7631d8aec357b94803d89246555e7e') {
    failures.push(tag + ' must remain pinned to the verified v0.1.2 commit until v0.1.3 is verified live');
  }
}
if (manifest.compatibility_aliases?.verified !== true) failures.push('existing compatibility aliases must remain recorded as verified');
if (manifest.compatibility_aliases?.movement_allowed !== false) failures.push('compatibility alias movement must remain blocked before candidate verification');

const licensing = manifest.licensing || {};
if (licensing.model !== 'source-available-proprietary') failures.push('licensing model drifted');
if (licensing.eula_required !== true || licensing.eula_file !== 'EULA.md' || licensing.eula_version !== '1.0') failures.push('EULA contract drifted');
if (licensing.customer_content_ownership_retained !== true) failures.push('customer-content ownership retention must remain explicit');
if (licensing.official_action_use_free !== true) failures.push('official Action free-use grant must remain explicit');
if (licensing.modified_competing_redistribution_allowed !== false) failures.push('competing modified redistribution must remain prohibited');
if (licensing.hosted_competing_service_allowed !== false) failures.push('competing hosted-service use must remain prohibited');

requirePhrases('EULA.md', [
  'source-available proprietary software',
  'Free" describes price',
  'Customer Content',
  'does not transfer ownership of Customer Content',
  'competing commercial product',
  'hosted service',
  'GitHub-native fork',
  'British Columbia',
  'CAD $100',
  'THIRD_PARTY_NOTICES.md'
]);
requirePhrases('LICENSE', [
  'governed by the End User License Agreement in EULA.md',
  'not an OSI-approved open-source license'
]);
requirePhrases('TRADEMARK.md', [
  'Living Architecture Nodes™',
  'does not grant a trademark license',
  'confusingly similar'
]);
requirePhrases('CONTRIBUTING.md', [
  'worldwide, perpetual, irrevocable',
  'sublicensable',
  'You retain ownership'
]);
requirePhrases('THIRD_PARTY_NOTICES.md', [
  'no npm runtime dependencies',
  'git',
  'GitHub platform'
]);

const runtime = manifest.runtime_security || {};
if (runtime.npm_runtime_dependencies !== 0) failures.push('runtime dependency baseline drifted');
if (runtime.runtime_network_access !== false) failures.push('runtime network boundary drifted');
if (runtime.telemetry !== false) failures.push('telemetry boundary drifted');
if (runtime.source_contents_read_by_scanner !== false) failures.push('scanner source-content boundary drifted');
if (runtime.shell_invocation !== false) failures.push('shell invocation must remain false');
if (runtime.local_git_subprocess !== true) failures.push('bounded local git subprocess must remain explicitly documented');
if (runtime.private_vulnerability_reporting !== true) failures.push('private vulnerability reporting must remain enabled');

const clientData = manifest.client_data || {};
if (clientData.diagnostic_schema !== 'explicit-allowlist') failures.push('diagnostic export must use explicit allowlist');
if (clientData.absolute_workspace_paths_exported !== false) failures.push('absolute workspace paths must not be exported');
if (clientData.full_repository_inventory_exported !== false) failures.push('full repository inventories must not be exported');
if (clientData.source_contents_exported !== false) failures.push('source contents must not be exported');
if (clientData.repository_identity_metadata_exported !== false) failures.push('repository identity metadata must not be exported');
if (clientData.secret_metadata_redaction !== true) failures.push('secret metadata redaction must remain enabled');
if (clientData.markdown_path_escaping !== true) failures.push('Markdown path escaping must remain enabled');
if (clientData.atomic_diagnostic_replacement !== true) failures.push('diagnostic writes must remain atomic replacements');

const readme = requirePhrases('README.md', [
  'Free GitHub Action',
  'source-available proprietary software',
  'NOT_VERIFIED',
  'no telemetry',
  'zero npm runtime dependencies',
  'Client-data boundary',
  'End User License Agreement',
  'Your repository and Customer Content remain yours'
]);
if (/\bv0\.1\.2\b|\bv0\.1\.3\b/.test(readme)) failures.push('permanent Marketplace README must not hard-code the current/candidate patch version');
if (readme.includes('pro_license_key')) failures.push('README still documents legacy pro_license_key');

requirePhrases('PRIVACY.md', [
  'does not read source-file contents',
  'explicit allowlist',
  'absolute runner/workspace paths',
  'full source-file or node-file inventories',
  'does not transfer ownership'
]);
requirePhrases('SECURITY.md', [
  'no runtime npm dependencies',
  'does not invoke a shell',
  'private vulnerability reporting',
  'atomic same-directory replacement',
  '0600',
  '0700'
]);
requirePhrases('SUPPORT.md', [
  'private vulnerability reporting',
  'Do not include repository secrets'
]);

const clientDataSource = text('src/client-data.js');
for (const forbidden of ['workspace:', 'sourceFiles:', 'nodeFiles:', 'githubRepository', 'GITHUB_REPOSITORY', 'GITHUB_SHA', 'GITHUB_REF']) {
  if (clientDataSource.includes(forbidden)) failures.push('client-data allowlist contains forbidden field/token: ' + forbidden);
}
if (!clientDataSource.includes('redactObject')) failures.push('client-data allowlist must redact output');

const exporter = text('src/exporter.js');
if (!exporter.includes('writeAtomicWorkspaceFile')) failures.push('exporter must use atomic workspace writer');
if (!exporter.includes('sanitizeCheckForOutput')) failures.push('exporter must use the client-safe allowlist');

const indexSource = text('src/index.js');
if (!indexSource.includes('sanitizeCheckForOutput')) failures.push('GitHub step summary must use the client-safe allowlist');

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
  /XMLHttpRequest/,
  /WebSocket/,
  /\beval\s*\(/,
  /new Function/
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
  for (const pattern of forbiddenRuntime) if (pattern.test(value)) failures.push('forbidden runtime capability/literal detected: ' + rel);
  for (const pattern of forbiddenSecrets) if (pattern.test(value)) failures.push('credential/private material detected: ' + rel);

  if (rel !== path.join('src', 'git.js') && /child_process/.test(value)) {
    failures.push('child_process is allowed only in src/git.js: ' + rel);
  }
}

const gitSource = text('src/git.js');
if (!gitSource.includes("execFileSync('git'")) failures.push('src/git.js must invoke git with execFileSync');
if (/\bshell\s*:/.test(gitSource)) failures.push('src/git.js must not enable a shell');
if (/\bexecSync\b|\bspawn\b|\bexec\s*\(/.test(gitSource)) failures.push('src/git.js may use only execFileSync for the bounded git subprocess');

if (failures.length) {
  console.error('LAN GitHub Marketplace candidate release check: FAILED');
  for (const failure of failures) console.error('- ' + failure);
  process.exit(1);
}

console.log('LAN GitHub Marketplace candidate release check: VERIFIED');
console.log('Candidate: v' + manifest.candidate_release.version + ' (NOT YET MARKETPLACE LIVE)');
console.log('Current live release: ' + manifest.live_release.tag + ' @ ' + manifest.live_release.commit);
console.log('Compatibility aliases: v0.1 and v0 remain pinned to the current live release');
console.log('Pricing: FREE');
console.log('License: source-available proprietary; EULA v' + licensing.eula_version);
console.log('Customer Content ownership: retained by user');
console.log('Runtime npm dependencies: 0');
console.log('Runtime network access: none');
console.log('Shell invocation: none; bounded local git execFileSync only');
console.log('Telemetry: none');
console.log('Client-data export: explicit allowlist; no source contents, absolute paths, repository identity, or full inventory');
console.log('Private vulnerability reporting: enabled');
