# CHANGELOG.node.md — Living Architecture Nodes Action

## 2026-09-29 — v0.1.3 licensing/client-data/security release

### Licensing / IP

- Added EULA.md as the separate end-user license for the Marketplace Product.
- Clarified source-available proprietary status and that Free describes price.
- Reserved redistribution/white-label/competing hosted-service rights.
- Preserved Customer Content ownership.
- Added CONTRIBUTING.md inbound contribution license.
- Added THIRD_PARTY_NOTICES.md and strengthened trademark/notice documents.

### Client data

- Added src/client-data.js explicit allowlist shared by JSON export and GitHub step summary.
- Removed absolute workspace identity, full source/node inventories, source-content-like fields, and GitHub repository identity metadata from client-visible diagnostics.
- Expanded secret-shaped path redaction.
- Escaped hostile Markdown/control characters.

### Security

- Added private atomic diagnostic replacement.
- Added hard-link regression coverage.
- Retained traversal/symlink/absolute-path protections.
- Verified private vulnerability reporting.
- Runtime npm dependencies remain zero.
- Local git subprocess remains bounded execFileSync with no shell/network git operation.

### Release governance

- v0.1.3 published and independently verified live in GitHub Marketplace.
- v0/v0.1 advanced to the exact v0.1.3 commit after live verification.
- Both aliases independently clone-tested with 12/12 tests and release gate pass.
- Manifest now records v0.1.3 as live with no active candidate release.
- Release gate expanded to licensing/IP/privacy/security invariants.

## 2026-09-28 — v0.1.2 Marketplace hardening

- Removed unused raw `pro_license_key` input and configuration.
- Added explicit basic verification scope and semantic `NOT_VERIFIED` output.
- Added workspace/export authority confinement.
- Added path traversal, absolute export, symlink escape, checker, and redaction tests.
- Published and verified the Free GitHub Marketplace Action.

## 2026-06-03 — v0.1.1 Node 24 maintenance

- Updated the GitHub Action runtime from Node.js 20 to Node.js 24.

## 2026-06-02 — v0.1.0

Initial standalone GitHub Action wrapper.
