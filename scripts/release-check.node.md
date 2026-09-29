# scripts/release-check.js — Living Architecture Node

## Purpose

Deterministic Frequency gate for the **live GitHub Marketplace release state** and any future replacement-release preparation.

## Checks

- exactly one root Action metadata file;
- Action name, branding, Node 24 runtime, entrypoint, and outputs;
- no raw paid-license input;
- package/live release version synchronization;
- immutable v0.1.3 live release identity;
- v0.1/v0 compatibility aliases recorded at the exact verified v0.1.3 commit;
- live Marketplace verification and alias clone evidence;
- Free product boundary;
- EULA / proprietary source-available licensing / trademark / contribution / Customer Content ownership controls;
- zero runtime npm dependencies;
- no runtime network client, telemetry, dynamic eval, shell invocation, embedded credentials, or private signing material;
- explicit client-data allowlist;
- no source contents, absolute workspace paths, full repository inventory, or GitHub repository identity in diagnostics;
- bounded local git subprocess only;
- secure atomic diagnostic replacement;
- no future alias movement without a separately verified replacement release.

## Current state

v0.1.3 live Marketplace baseline.

## Regression trigger

Any failed release check blocks future release promotion, exact-tag creation, or compatibility-alias movement.
