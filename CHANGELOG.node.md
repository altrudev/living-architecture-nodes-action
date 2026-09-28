# CHANGELOG.node.md — Living Architecture Nodes Action

## 2026-09-28 — v0.1.2 Marketplace hardening

### Changed

- Removed unused raw `pro_license_key` input and configuration.
- Added explicit basic verification scope and semantic `NOT_VERIFIED` output.
- Clarified the maintenance score is heuristic, not a semantic architecture verdict.
- Added workspace/export authority confinement to `GITHUB_WORKSPACE`.
- Added path traversal, absolute export, symlink escape, checker, and redaction tests.
- Added Marketplace release manifest/preflight.
- Added privacy, security, support, changelog, and release documentation.

### Product boundary

- GitHub Action remains Free.
- No account or paid entitlement required.
- No runtime network client or telemetry.
- Commercial LAN capabilities remain outside this Action.

### Release state

Marketplace publication verified live. Exact tag `v0.1.2` is pinned to `c7d44c31bb7631d8aec357b94803d89246555e7e`. Moving aliases `v0.1` and `v0` are authorized to target that exact commit.

## 2026-06-03 — v0.1.1 Node 24 maintenance

- Updated the GitHub Action runtime from Node.js 20 to Node.js 24.
- Preserved the existing basic checker behavior.

## 2026-06-02 — v0.1.0

Initial standalone GitHub Action wrapper with basic repository architecture-memory checks, dirty-node risk, diagnostic export, and GitHub step summary.
