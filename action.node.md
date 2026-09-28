# action.yml — Living Architecture Node

## Purpose

Public GitHub Action metadata and execution contract for the free Living Architecture Nodes CI surface.

## Contracts

- one root Action metadata file;
- Node 24 runtime;
- no raw paid-license input;
- basic CI outputs stay distinct from semantic verification;
- no remote service or telemetry requirement.

## Current state

v0.1.1 Marketplace candidate.

Recent changes: removed the reserved license input, added verification scope outputs, and clarified repository-bound workspace/export paths.

## Regression triggers

Public outputs drift from runtime behavior; network access appears; a credential input is added; runtime/entrypoint changes without release review.
