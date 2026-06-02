# ARCH.md — Living Architecture Nodes Action

## Intent layer

This repository is the official GitHub Action wrapper for Living Architecture Nodes checks and diagnostic exports. It is designed to run inside GitHub Actions without external dependencies, scan a repository workspace, detect missing architecture-memory artifacts, detect missing `.node.md` companion files, detect dirty-node risk from changed files, and export JSON/Markdown diagnostic bundles.

The action must preserve the commercial boundary: it may expose a free/basic checker, but must not include private commercial core engine logic or paid desktop/VS Code implementation internals.

## Reality layer

v0.1.0 is a standalone Node 20 JavaScript action using only built-in Node modules. It implements:

- required artifact checks for `ARCH.md`, `NERVE.md`, and `CHANGELOG.node.md`
- source-file scanning by extension
- `.node.md` matching
- orphan node detection
- best-effort changed-file detection through local git diff
- dirty-node detection for changed source files where matching node files were not changed
- JSON and Markdown diagnostic export
- GitHub Actions outputs and step summary

Pro license validation is not active in v0.1.0. The `pro_license_key` input is reserved for a future commercial release.

## Gap log

| Date | Gap | Status |
|---|---|---|
| 2026-06-02 | Pro license validation input exists but no remote/cryptographic license validation is implemented. | Intentional placeholder; do not market as active paid gating. |
| 2026-06-02 | Dirty detection depends on checkout history and available git refs. | Documented via `fetch-depth: 0` recommendation. |
| 2026-06-02 | Source extension mapping is generic and may need language/framework-specific node mapping later. | Accepted for v0.1.0. |

## Module index

| Module | Node file | Health | Notes |
|---|---|---:|---|
| `action.yml` | `action.node.md` | 95 | Public GitHub Action metadata and input/output contract. |
| `src/index.js` | `src/index.node.md` | 95 | Main orchestration entrypoint. |
| `src/config.js` | `src/config.node.md` | 95 | Reads GitHub Action inputs and normalizes config. |
| `src/fs-utils.js` | `src/fs-utils.node.md` | 95 | Filesystem helpers and path normalization. |
| `src/scanner.js` | `src/scanner.node.md` | 95 | Repository scanning and source-to-node mapping. |
| `src/git.js` | `src/git.node.md` | 90 | Best-effort changed-file detection; sensitive to checkout depth. |
| `src/checker.js` | `src/checker.node.md` | 95 | Policy checks and health scoring. |
| `src/redactor.js` | `src/redactor.node.md` | 90 | Secret redaction helper; should stay conservative. |
| `src/exporter.js` | `src/exporter.node.md` | 95 | Writes JSON and Markdown diagnostic exports. |
| `src/summary.js` | `src/summary.node.md` | 95 | Human-readable report rendering. |
| `src/github-io.js` | `src/github-io.node.md` | 95 | GitHub Actions outputs, summaries, and annotations. |

## Static layer

### Purpose and responsibility boundary

This repository provides the GitHub Action wrapper only. It must not become the full private commercial engine, VS Code extension, desktop app, or license server.

### Dependencies

Calls:

- local filesystem
- local git CLI
- GitHub Actions environment variables and output files

Called by:

- GitHub Actions workflow runner
- local `node src/index.js` self-checks

### Contracts

Inputs are declared in `action.yml`. Outputs are declared in `action.yml`. Diagnostic exports are written to `export_path`.

## Dynamic layer

### Current stability state

Stable for v0.1.0 MVP/basic checks.

### Recent mutations

Initial action implementation created fresh as standalone wrapper.

### Known fragile points

- dirty-node detection requires useful git history in the checked-out repository
- `HEAD~1` fallback can fail on shallow clones or first commits
- language-specific source-to-node mapping is intentionally simple

### Interaction warnings

Changing scan extensions or exclude directories affects missing-node counts and workflow failures.

### Performance observations

Recursive scan is acceptable for small/medium repositories. Very large monorepos may need path filters later.

### Security notes

Diagnostic export includes file paths but no source contents. Redactor is present for future expansions and defensive output cleanup.

## Diagnostic layer

### Past bug patterns

- None yet.

### Near misses

- Pro license input could be misunderstood as active validation. README and reports explicitly state it is reserved for future release.

### Regression triggers

- Changing `action.yml` inputs without updating `src/config.js`.
- Changing output names without updating `src/index.js`.
- Changing report structure without updating `src/exporter.js` and `src/summary.js`.

### Suspected hidden coupling

- Git diff behavior is coupled to `actions/checkout` fetch depth.
