# Living Architecture Nodes Action

Official GitHub Action wrapper for **Living Architecture Nodes** repository checks and diagnostic handoff exports.

This action checks whether a repository follows the Living Architecture Nodes structure:

- `ARCH.md`
- `NERVE.md`
- `CHANGELOG.node.md`
- `.node.md` companion files for source modules
- AI/dev diagnostic exports in JSON and Markdown

## Status

Version: `v0.1.0`

This first release is a free/basic CI wrapper. It does not include Pro license validation yet. The `pro_license_key` input is reserved for a future commercial release.

## Basic workflow

Create `.github/workflows/living-architecture-nodes.yml` in the repository you want to check:

```yaml
name: Living Architecture Nodes

on:
  pull_request:
  push:
    branches: [main]

jobs:
  lan-check:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Check Living Architecture Nodes
        uses: altrudev/living-architecture-nodes-action@v0.1.0
        with:
          fail_on: missing-required
          export_path: .lan-action

      - name: Upload Living Architecture diagnostics
        uses: actions/upload-artifact@v4
        if: always()
        with:
          name: living-architecture-diagnostics
          path: .lan-action/
```

## Inputs

| Input | Default | Purpose |
|---|---:|---|
| `workspace` | `GITHUB_WORKSPACE` | Repository path to scan. |
| `mode` | `check` | `check` or `export`. |
| `fail_on` | `missing-required` | Failure threshold: `never`, `missing-required`, `missing-nodes`, `dirty-nodes`, `warnings`. |
| `changed_only` | `true` | Focus dirty-node detection on changed source files. |
| `source_extensions` | common source extensions | Comma-separated source file extensions. |
| `exclude_dirs` | common generated folders | Comma-separated folders to ignore. |
| `export_path` | `.lan-action` | Output folder for diagnostic exports. |
| `write_summary` | `true` | Write a GitHub Actions step summary. |
| `pro_license_key` | empty | Reserved for future Pro unlock. |

## Outputs

| Output | Meaning |
|---|---|
| `health_score` | Computed architecture-memory score from 0 to 100. |
| `status` | `healthy`, `warning`, or `failed`. |
| `missing_required_count` | Number of missing required root artifacts. |
| `missing_node_count` | Number of source files without matching `.node.md` files. |
| `dirty_node_count` | Number of changed source files whose matching node was not changed. |
| `diagnostic_json` | Path to JSON diagnostic export. |
| `diagnostic_markdown` | Path to Markdown diagnostic export. |

## Failure thresholds

- `never`: never fail the workflow.
- `missing-required`: fail if `ARCH.md`, `NERVE.md`, or `CHANGELOG.node.md` is missing.
- `missing-nodes`: also fail if source files are missing `.node.md` companions.
- `dirty-nodes`: also fail when changed source files did not update matching node files.
- `warnings`: fail on any warning or less-than-perfect health.

## Diagnostic exports

The action writes:

```text
.lan-action/living-architecture-diagnostic.json
.lan-action/living-architecture-diagnostic.md
```

The JSON export is optimized for machine/AI ingestion. The Markdown export is optimized for human review and suggested investigation order.

## Recommended public/private model

The public Living Architecture Nodes specification remains adoption-friendly.

This action wrapper is source-visible for GitHub Actions usage, but it is not released under an open-source license. See `LICENSE` and `TRADEMARK.md`.

Developed by Altru.dev. Copyright 2026.
