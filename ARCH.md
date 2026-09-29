# ARCH.md — Living Architecture Nodes Action

## Product intent

This repository is the official **Free GitHub Action** for Living Architecture Nodes repository checks and client-safe local diagnostic exports.

It is the CI/adoption surface for LAN. It must remain distinct from:

- the private commercial LAN engine;
- the VS Code extension;
- a GitHub App or hosted service;
- payment processing or license issuance;
- a general AI-agent runtime.

The Action is free to use under its EULA, but the implementation is **source-available proprietary software**.

## Runtime architecture

```text
action.yml
   ↓
src/index.js
   ↓
src/config.js ──→ src/workspace-authority.js
   ↓
src/scanner.js
   ↓
src/checker.js ←── src/git.js
   ↓
src/client-data.js ──→ src/redactor.js
   ├──→ src/summary.js → GitHub step summary
   └──→ src/exporter.js → private local JSON/Markdown diagnostics
```

## Free verification contract

The Action performs basic local CI checks:

- required `ARCH.md`, `NERVE.md`, and `CHANGELOG.node.md`;
- source-to-node coverage;
- orphan-node detection;
- changed-file/node drift when local git history is available;
- configurable failure thresholds;
- client-safe local JSON/Markdown reports.

The maintenance score is heuristic. It is not semantic architecture proof.

```text
verification_scope = basic-local-ci
semantic_architecture_status = NOT_VERIFIED
```

## Client-data architecture

The normal scanner enumerates paths and metadata. It does not read source-file contents.

Client-visible JSON and Markdown are produced from `src/client-data.js`, an explicit allowlist. That boundary excludes:

- absolute runner/workspace paths;
- full source/node inventories;
- source contents;
- GitHub repository/ref/SHA/event identity metadata;
- arbitrary future checker/scanner fields.

Relative paths associated with findings are retained because they are necessary to make the diagnostic actionable. Secret-shaped path values are redacted and Markdown path values are escaped.

## Filesystem authority

`GITHUB_WORKSPACE` is the authority root.

Optional `workspace` and `export_path` values cannot escape that root. Parent traversal, absolute external targets, and symbolic-link components are rejected.

Diagnostic files are written through private same-directory temporary files followed by atomic rename. This avoids truncating a pre-existing destination inode and prevents a hard link to the old inode from being modified by replacement.

On POSIX systems, diagnostic files use `0600` and newly created export directories use `0700`.

## Runtime authority

The Action has zero npm runtime dependencies.

It has no runtime HTTP client, GitHub API call, telemetry, `eval`, or dynamic code execution.

Changed-file analysis invokes the local `git` executable using `execFileSync` with bounded `diff` and `status` commands. No shell is invoked and no network git command is used.

## Licensing/IP architecture

End-user use is governed by `EULA.md`.

The license model is source-available proprietary:

- official Free Action use is granted;
- Customer Content remains the user's property;
- competing modified redistribution and hosted competing service use are not granted;
- trademark rights are separate;
- contribution rights are defined in `CONTRIBUTING.md`;
- third-party obligations are tracked in `THIRD_PARTY_NOTICES.md`;
- GitHub platform/Marketplace rights granted separately to GitHub are preserved.

## Release architecture

Exact tags are immutable.

Current live release:

```text
v0.1.2 → c7d44c31bb7631d8aec357b94803d89246555e7e
v0.1   → same verified commit
v0     → same verified commit
```

v0.1.3 is a candidate until the merged commit passes Frequency, the immutable release is published through GitHub Marketplace, the public listing is verified, and only then are moving aliases advanced.

## Known limits

- changed-file detection depends on available git history;
- shallow clones can reduce drift coverage;
- source-extension mapping is generic;
- filesystem race resistance is bounded by Node.js/platform filesystem primitives;
- this Action does not claim semantic architecture verification.
