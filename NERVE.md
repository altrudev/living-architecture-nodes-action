# NERVE.md — Living Architecture Nodes Action Hub

## Current release state

v0.1.2 Marketplace candidate.

## Cascade map

| Node | At-risk dependents | Reason |
|---|---|---|
| action.yml | README, Marketplace listing, runtime outputs | Public contract |
| src/config.js | scanner/exporter/index | Input and authority normalization |
| src/workspace-authority.js | config/export path | Filesystem confinement |
| src/scanner.js | checker/exporter/summary | Scan shape |
| src/git.js | checker | Changed-file evidence |
| src/checker.js | index/exporter/summary | Status and verification semantics |
| src/summary.js | exporter/step summary | User-facing claims |
| scripts/release-check.js | Marketplace promotion | Release gate |

## 2026-09-28 Frequency Marketplace sweep

- Removed unused raw pro_license_key.
- Kept the Action genuinely useful and Free.
- Added explicit basic-local-ci verification scope.
- Added semantic architecture NOT_VERIFIED semantics.
- Added repository/export authority confinement.
- Added traversal, absolute-path, symlink, checker, and redaction regression tests.
- Added Marketplace release/privacy/security/support documentation.
- Added a deterministic release preflight.

## Troubleshooting

### Changed-file drift missing

1. Use actions/checkout with fetch-depth: 0.
2. Verify pull-request/base history exists.
3. Inspect src/git.js.
4. Unavailable change history reduces evidence; it does not create semantic verification.

### Export rejected

1. Confirm export_path is repository-relative.
2. Confirm no parent traversal.
3. Confirm the path does not traverse a symlink outside the workspace.

## Regression triggers

- Action gains repository write/API permission it does not need.
- Any raw license secret reappears.
- Runtime network access appears.
- Health score is described as semantic architecture proof.
- Marketplace release is claimed without GitHub Marketplace publication evidence.
