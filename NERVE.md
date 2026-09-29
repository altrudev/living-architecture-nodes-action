# NERVE.md — Living Architecture Nodes Action Hub

## Current state

**v0.1.3 is LIVE and VERIFIED in GitHub Marketplace.**

Verified immutable release commit:

`d1a4dbdefa0ce0b177e8f0835219a8625ec2db1b`

**v0.1 and v0 now resolve to the same verified v0.1.3 commit.**

## Cascade map

| Node | At-risk dependents | Reason |
|---|---|---|
| `action.yml` | README, Marketplace listing, runtime outputs | Public contract |
| `EULA.md` | LICENSE, README, NOTICE, Marketplace legal boundary | End-user rights |
| `TRADEMARK.md` | branding/listing | Source identity |
| `CONTRIBUTING.md` | accepted PRs | Contribution rights |
| `src/config.js` | scanner/exporter/index | Input normalization |
| `src/workspace-authority.js` | export path/write safety | Filesystem confinement |
| `src/scanner.js` | checker | Scan shape |
| `src/git.js` | checker | Changed-file evidence |
| `src/checker.js` | client-data/index | Status semantics |
| `src/client-data.js` | exporter/step summary | Client-data allowlist |
| `src/redactor.js` | client-data | Secret-shaped metadata defense |
| `src/summary.js` | GitHub summary/export Markdown | User-visible findings |
| `src/exporter.js` | local diagnostics | Client-data persistence |
| `scripts/release-check.js` | merge/tag/Marketplace/alias movement | Promotion gate |
| `release/marketplace-manifest.json` | release state/aliases/license/security | Machine source of truth |

## v0.1.3 Frequency hardening — promoted live

- Added a separate Marketplace EULA and explicit proprietary source-available license model.
- Preserved free official Action use while restricting repackaging, white-label distribution, competing hosted use, and confusing branding.
- Added contribution licensing terms to avoid ambiguous inbound IP.
- Explicitly preserved Customer Content ownership.
- Added third-party notice discipline.
- Replaced arbitrary diagnostic serialization with an explicit client-data allowlist.
- Removed absolute workspace path, full inventory, repository identity metadata, and arbitrary checker fields from exports.
- Unified JSON and GitHub/Markdown summaries on the same sanitized model.
- Expanded secret-shaped metadata redaction and Markdown escaping.
- Added private atomic diagnostic replacement and hard-link regression coverage.
- Verified GitHub private vulnerability reporting is enabled.
- Runtime npm dependencies remain zero.
- Public Marketplace listing verified v0.1.3 as Latest.
- v0.1 and v0 aliases advanced only after live verification and independently clone-tested.
- Local git use is documented as bounded `execFileSync`, no shell, no network command.

## Promotion order

1. Update code/docs/license under a candidate branch.
2. Run architecture-memory self-check.
3. Run product/security/privacy/IP tests.
4. Run release gate.
5. Merge only the verified candidate.
6. Repeat the full sweep from the exact merged `main` commit.
7. Create immutable `v0.1.3`.
8. Publish that exact release through GitHub Marketplace.
9. Verify the public listing says `v0.1.3` Latest.
10. Move `v0.1` and `v0` only after live verification.
11. Clone each alias and rerun verification.

## Regression triggers

- exact release tag moves;
- aliases move before replacement release verification;
- EULA/licensing documents diverge from Marketplace/readme claims;
- Customer Content ownership becomes ambiguous;
- runtime dependency/network/telemetry appears;
- raw checker/scanner state reaches client-visible output;
- source contents, absolute paths, full inventories, or repository identity appear in diagnostics;
- summary Markdown renders unescaped repository-controlled path content;
- unsafe direct diagnostic overwrite returns;
- Marketplace publication is claimed without live evidence.
