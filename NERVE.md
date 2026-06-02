# NERVE.md — Living Architecture Nodes Action Hub

In this repository, `NERVE.md` is the central hub file. NERVE is used descriptively as an abbreviation for Node Evidence & Regression Visibility Engine.

## Dirty flags

No dirty nodes at v0.1.0 package creation.

## Cascade map

| Flagged node | At-risk dependents | Reason |
|---|---|---|
| `src/config.js` | `src/index.js`, `action.yml` | Input names and defaults must align. |
| `src/scanner.js` | `src/checker.js`, `src/exporter.js`, `src/summary.js` | Scan shape feeds checks and reports. |
| `src/git.js` | `src/checker.js` | Dirty-node detection depends on changed-file output. |
| `src/summary.js` | `src/exporter.js`, GitHub step summary | Markdown output is reused in multiple contexts. |
| `src/github-io.js` | `src/index.js` | Output/annotation formatting affects GitHub Action UX. |

## Cross-node pattern detection

No repeated bug class observed yet.

## Temporal pattern log

| Date | Change | Later effect |
|---|---|---|
| 2026-06-02 | Initial GitHub Action wrapper created. | Baseline established. |

## Troubleshooting playbooks

### Workflow fails even though repo looks compliant

1. Confirm `ARCH.md`, `NERVE.md`, and `CHANGELOG.node.md` exist at repository root.
2. Check `source_extensions` includes the source language in use.
3. Check excluded directories are not hiding intended source files.
4. Confirm `fail_on` threshold is not stricter than intended.
5. Review `.lan-action/living-architecture-diagnostic.md`.

### Dirty nodes are not detected in pull requests

1. Confirm `actions/checkout` uses `fetch-depth: 0`.
2. Confirm the workflow runs on `pull_request` or has enough git history.
3. Review `src/git.js` behavior.
4. Compare changed source files with changed `.node.md` files manually.

### Missing nodes count is too high

1. Review `source_extensions`.
2. Add generated folders to `exclude_dirs`.
3. Confirm source-to-node naming convention is acceptable for the repository.

## Health scores

| Node | Score | Status |
|---|---:|---|
| `action.yml` | 95 | healthy |
| `src/index.js` | 95 | healthy |
| `src/config.js` | 95 | healthy |
| `src/fs-utils.js` | 95 | healthy |
| `src/scanner.js` | 95 | healthy |
| `src/git.js` | 90 | watch |
| `src/checker.js` | 95 | healthy |
| `src/redactor.js` | 90 | watch |
| `src/exporter.js` | 95 | healthy |
| `src/summary.js` | 95 | healthy |
| `src/github-io.js` | 95 | healthy |

## Likely culprit nodes

None currently flagged.
