# CHANGELOG.node.md — Living Architecture Nodes Action

## 2026-06-02 — v0.1.0

### Added

- Created standalone GitHub Action wrapper for Living Architecture Nodes.
- Added required artifact detection.
- Added source-to-node companion file mapping.
- Added missing node detection.
- Added best-effort dirty-node detection from git diff.
- Added orphan node detection.
- Added JSON and Markdown diagnostic export.
- Added GitHub Action outputs and step summary support.
- Added action-use license and trademark notice.
- Added Living Architecture Nodes files for this action repository itself.

### Security / trust

- No telemetry.
- No external service calls.
- No network dependency.
- Diagnostic export uses file paths and counts, not source file contents.
- Pro license input is reserved and not actively validated in v0.1.0.

## 2026-06-02 — v0.1.0 self-check refinement

### Changed

- Added `.yml` and `.yaml` to default source extensions so `action.yml` and workflow files can have companion nodes.
- Added `.lan-action` to default excluded directories so generated diagnostics are not rescanned.
- Treated root `CHANGELOG.node.md` as a required cross-cutting artifact rather than an orphan companion node.

### Validation

- Local self-check reached HEALTHY 100/100 after refinement.
