# src/config.js — Living Architecture Node

## Static layer

### Purpose

Normalizes Action inputs and constructs an authorized runtime configuration.

### Dependencies

Calls `src/workspace-authority.js`.

### Contracts

- `GITHUB_WORKSPACE` is the authority root;
- optional workspace remains inside that root;
- export path remains inside selected workspace;
- no paid-license input is parsed.

## Dynamic layer

### Current stability state

v0.1.1 Marketplace candidate.

### Recent mutations

- Added canonical workspace/export authority resolution.
- Removed legacy Pro-license configuration.

## Diagnostic layer

### Regression triggers

- accepting paths outside the repository root;
- reintroducing a raw paid-license secret;
- input defaults drifting from `action.yml`.
