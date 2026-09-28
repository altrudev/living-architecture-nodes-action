# Product Roadmap — Living Architecture Nodes Action

## v0.1.2 — Free Marketplace foundation

- basic architecture-memory CI checks;
- missing/orphan/changed-node risk;
- local diagnostics and step summary;
- explicit verification scope;
- workspace/export authority controls;
- no telemetry, network client, account, or license key;
- GitHub Marketplace listing/release foundation.

## v0.2.x — Better free CI intelligence

Candidate work:

- configuration file support;
- monorepo path filters;
- language/framework mapping presets;
- better first-commit and shallow-history behavior;
- optional SARIF export;
- richer PR-friendly summaries without requiring repository write permission.

## Separate commercial direction

Paid LAN capabilities should not be implemented as a raw secret or license key in this Action.

Future commercial value belongs in the signed LAN entitlement/product contract and/or a separate GitHub App/service, where organization features such as cross-repository architecture, shared policy, dashboards, verified history, and advanced semantic analysis can be implemented cleanly.

## Boundary

This repository remains the Free CI wrapper. It must not absorb the private LAN engine, VS Code product, payment service, or general agent runtime.
