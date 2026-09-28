# ARCH.md — Living Architecture Nodes Action

## Product intent

This repository is the official **free GitHub Action** for Living Architecture Nodes repository checks and local diagnostic exports.

It is the CI/adoption surface for LAN. It must remain distinct from the private commercial LAN engine, the VS Code extension, a GitHub App/service, payment processing or license issuance, and a general AI-agent runtime.

## Runtime architecture

action.yml → src/index.js → src/config.js / src/workspace-authority.js → src/scanner.js → src/checker.js / src/git.js → src/summary.js → src/exporter.js / src/redactor.js → local .lan-action reports.

## v0.1.1 contracts

The Action performs basic local CI checks:

- required ARCH.md, NERVE.md, and CHANGELOG.node.md;
- source-to-node coverage;
- orphan-node detection;
- changed-file/node drift when history is available;
- configurable failure thresholds;
- local JSON/Markdown reports.

The Action does **not** perform semantic architectural verification. A perfect maintenance score does not prove architecture correctness.

Verification scope: basic-local-ci. Semantic architecture status: NOT_VERIFIED.

## Authority

GITHUB_WORKSPACE is the filesystem authority root. An optional workspace may select a subdirectory but cannot escape the root. export_path must remain inside the selected workspace. Parent traversal, absolute export paths, and symbolic-link escape are rejected.

## Network/privacy

The Action has no runtime network client, no telemetry, no remote source upload, and no paid entitlement call.

## Marketplace release boundary

v0.1.1 is intended as a Free GitHub Marketplace Action release.

Repository/API release creation is not sufficient proof of Marketplace publication. GitHub's Action release UI must validate metadata and have **Publish this Action to the GitHub Marketplace** selected.

## Known limits

- changed-file detection depends on available git history;
- shallow clones can reduce drift coverage;
- source extension mapping is generic;
- large monorepos may need path filters later.
