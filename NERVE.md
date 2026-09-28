# NERVE.md — Living Architecture Nodes Action Hub

## Current release state

**v0.1.2 LIVE and VERIFIED in GitHub Marketplace.**

Exact release commit: `c7d44c31bb7631d8aec357b94803d89246555e7e`.

Marketplace categories: `code-quality`, `utilities`.

## Cascade map

| Node | At-risk dependents | Reason |
|---|---|---|
| action.yml | README, Marketplace listing, runtime outputs | Public contract |
| src/config.js | scanner/exporter/index | Input and authority normalization |
| src/workspace-authority.js | config/export path | Filesystem confinement |
| src/scanner.js | checker/exporter/summary | Scan shape |
| src/git.js | checker | Changed-file evidence |
| src/checker.js | index/exporter/summary | Status and verification semantics |
| src/summary.js | exporter/step summary | User-facing claims |
| scripts/release-check.js | Marketplace promotion / alias movement | Release gate |
| release/marketplace-manifest.json | v0.1/v0 aliases | Verified release identity |

## 2026-09-28 Frequency Marketplace sweep

- Free product boundary verified.
- `basic-local-ci` verification scope verified.
- Semantic architecture remains `NOT_VERIFIED`.
- Filesystem authority and adversarial path tests passed.
- Marketplace v0.1.2 listing verified live.
- Compatibility aliases `v0.1` and `v0` authorized only for the verified release commit.

## Regression triggers

- `v0.1.2` exact tag is moved.
- A moving alias points anywhere except the currently verified compatible release.
- Runtime network access or raw license secrets appear.
- Health score is described as semantic architecture proof.
- Marketplace publication is claimed without live evidence.
