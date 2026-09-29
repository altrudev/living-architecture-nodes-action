# action.yml — Living Architecture Node

## Purpose

Public GitHub Action metadata and execution contract for the Free Living Architecture Nodes CI surface.

## Contracts

- exactly one root Action metadata file;
- Node 24 runtime;
- no raw paid-license input;
- basic CI outputs stay distinct from semantic verification;
- diagnostic outputs are described as client-safe and local;
- no remote service or telemetry requirement;
- permanent Marketplace copy avoids patch-version drift.

## Current state

v0.1.3 licensing/client-data/security hardening candidate. v0.1.2 remains the verified live Marketplace release until promotion completes.

## Regression triggers

Public outputs drift from runtime behavior, network access appears, a credential input is added, patch-version claims enter permanent metadata, or runtime/entrypoint changes without release review.
