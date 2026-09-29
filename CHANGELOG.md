# Changelog

## 0.1.3 — Candidate

Licensing, client-data, and self-security hardening.

### Licensing / IP

- added a separate End User License Agreement required for Marketplace use;
- clarified that Free describes price, not open-source status;
- preserved free official Action use while reserving proprietary implementation rights;
- restricted unauthorized repackaging, white-label distribution, competing hosted service use, and confusing branding;
- explicitly preserved user ownership of Customer Content;
- added contribution licensing terms;
- added third-party notices and strengthened trademark/notice language.

### Client data / privacy

- replaced broad diagnostic serialization with an explicit client-data allowlist;
- removed absolute runner/workspace paths from diagnostics;
- removed full source-file/node-file inventories from diagnostics;
- removed GitHub repository/ref/SHA/event identity metadata from diagnostics;
- kept only counts and relative paths attached to findings;
- unified JSON and GitHub/Markdown summary output on the same sanitized model;
- expanded secret-shaped path metadata redaction;
- escaped hostile Markdown/control characters in path values.

### Security

- diagnostic writes now use private same-directory temporary files followed by atomic rename;
- added hard-link overwrite regression coverage;
- retained traversal/absolute-path/symlink escape protections;
- documented bounded local git subprocess use with no shell and no network command;
- verified GitHub private vulnerability reporting is enabled;
- runtime npm dependencies remain zero;
- added lockfile and npm-audit release evidence.

### Release governance

- preserved immutable v0.1.2 and its verified Marketplace commit;
- kept v0/v0.1 aliases pinned to the live v0.1.2 release while v0.1.3 remains a candidate;
- separated live Marketplace state from candidate state in the release manifest;
- expanded the Frequency release gate to cover licensing, client-data, security, and alias immutability.

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
