# Changelog

## 0.1.2

Marketplace hardening release.

### Added

- explicit basic verification scope output;
- explicit semantic architecture `NOT_VERIFIED` output;
- repository/workspace filesystem authority boundary;
- path traversal, absolute export, and symbolic-link escape tests;
- Marketplace release manifest and deterministic preflight;
- Privacy, Security, Support, and release documentation.

### Changed

- removed the unused `pro_license_key` input;
- clarified that the 0–100 maintenance score is heuristic and not a semantic architecture verdict;
- confined configured workspaces and diagnostic exports to `GITHUB_WORKSPACE`;
- updated diagnostic schema to `living-architecture-nodes-action-diagnostic@0.1.2`;
- positioned the Action as the permanently useful Free CI surface for LAN.

### Privacy / security

- no product telemetry;
- no runtime network client;
- no paid entitlement call;
- no raw license secret;
- no source-code upload.

## 0.1.1 — Node 24 maintenance

- Updated the Action runtime from Node.js 20 to Node.js 24.
- Preserved the v0.1.0 basic feature set.

## 0.1.0

Initial public/basic GitHub Action wrapper.

- required artifact checks;
- missing/orphan node checks;
- changed-file dirty-node risk;
- heuristic maintenance score;
- JSON/Markdown diagnostic export;
- GitHub step summary and outputs.
