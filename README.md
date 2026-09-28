# Living Architecture Nodes Action

**Free GitHub Action for keeping repository architecture memory from silently falling behind the code.**

Living Architecture Nodes Action checks the repository-local architecture-memory structure used by Living Architecture Nodes and produces CI-friendly diagnostics for humans and AI-assisted development workflows.

## What it checks

- required repository memory: `ARCH.md`, `NERVE.md`, and `CHANGELOG.node.md`;
- missing `.node.md` companions for source modules;
- orphan node files;
- changed source files whose matching node memory was not updated;
- configurable CI failure thresholds;
- local JSON and Markdown diagnostic handoff reports.

The maintenance score is a **heuristic CI signal, not a semantic architecture verdict**.

The free Action does not claim to understand whether the architecture itself is correct. In v0.1.2:

```text
Verification scope: basic-local-ci
Semantic architecture: NOT_VERIFIED
```

**NOT_VERIFIED means that deeper semantic verification was not executed. It does not mean failed or unsafe.**

## Free and local-first

This is a **Free GitHub Action**.

- no account required;
- no license key;
- no telemetry;
- no remote API calls;
- no source-code upload;
- no paid capability gating in the Action;
- diagnostic reports are written only to the checked repository workspace.

Future commercial LAN capabilities remain separate from this free Marketplace Action.

## Basic workflow

Create `.github/workflows/living-architecture-nodes.yml`:

```yaml
name: Living Architecture Nodes

on:
  pull_request:
  push:
    branches: [main]

permissions:
  contents: read

jobs:
  lan-check:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Check architecture memory
        uses: altrudev/living-architecture-nodes-action@v0.1.2
        with:
          fail_on: missing-required
          export_path: .lan-action

      - name: Upload diagnostics
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: living-architecture-diagnostics
          path: .lan-action/
```

For highest supply-chain assurance, pin third-party Actions to full commit SHAs in your own workflow.

## Inputs

| Input | Default | Purpose |
|---|---|---|
| `workspace` | repository root | Repository-relative subdirectory to scan. It cannot escape `GITHUB_WORKSPACE`. |
| `mode` | `check` | `check` or `export`; both run validation and write local reports. |
| `fail_on` | `missing-required` | `never`, `missing-required`, `missing-nodes`, `dirty-nodes`, or `warnings`. |
| `changed_only` | `true` | Focus dirty-node detection on changed source files. |
| `source_extensions` | common source extensions | Comma-separated source extensions to scan. |
| `exclude_dirs` | generated/vendor folders | Comma-separated folder names to ignore. |
| `export_path` | `.lan-action` | Workspace-relative diagnostic output folder. |
| `write_summary` | `true` | Write a GitHub step summary. |

## Outputs

| Output | Meaning |
|---|---|
| `health_score` | Heuristic architecture-memory maintenance score, 0–100. |
| `status` | Basic CI policy status: `healthy`, `warning`, or `failed`. |
| `verification_scope` | Executed verification scope; v0.1.2 is `basic-local-ci`. |
| `semantic_architecture_status` | `NOT_VERIFIED` in v0.1.2. |
| `missing_required_count` | Missing required root artifacts. |
| `missing_node_count` | Source files missing companion nodes. |
| `dirty_node_count` | Changed source files without matching node updates. |
| `diagnostic_json` | Path to local JSON diagnostic output. |
| `diagnostic_markdown` | Path to local Markdown diagnostic output. |

## Failure thresholds

- `never` — never fail the workflow.
- `missing-required` — fail when required root memory is missing.
- `missing-nodes` — also fail for missing companion nodes.
- `dirty-nodes` — also fail when changed source did not update matching node memory.
- `warnings` — fail on any maintenance warning.

## Repository and export authority

The Action treats `GITHUB_WORKSPACE` as its filesystem authority root.

A configured `workspace` may select a repository subdirectory but cannot escape the repository root. Diagnostic `export_path` must remain inside the selected workspace. Parent traversal, absolute export paths, and symbolic-link escape are rejected.

## Diagnostic exports

The Action writes:

```text
.lan-action/living-architecture-diagnostic.json
.lan-action/living-architecture-diagnostic.md
```

Reports contain structure/status metadata and file paths, not source-file contents.

## Git history

Changed-file drift checks work best with:

```yaml
- uses: actions/checkout@v4
  with:
    fetch-depth: 0
```

Shallow history can reduce the available comparison range.

## Product boundary

The GitHub Action is the **free CI surface** for Living Architecture Nodes.

It is not the private commercial LAN engine, the VS Code extension, a general AI-agent runtime, or a license server.

## Privacy, security, support

- [Privacy](PRIVACY.md)
- [Security](SECURITY.md)
- [Support](SUPPORT.md)
- [License](LICENSE)
- [Changelog](CHANGELOG.md)

Developed by **Valentyn Rukhaylo / Altru.dev**.
