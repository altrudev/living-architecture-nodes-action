# CHANGELOG.node.md — Living Architecture Nodes Action

## 2026-09-28 — v0.1.1 Marketplace hardening

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

Marketplace publication is not considered complete until GitHub's release UI validates the Action and the Marketplace publication checkbox is selected.

## 2026-06-02 — v0.1.0

Initial standalone GitHub Action wrapper with basic repository architecture-memory checks, dirty-node risk, diagnostic export, and GitHub step summary.
