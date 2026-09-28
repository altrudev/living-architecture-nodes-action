# action.yml — Living Architecture Node

## Static layer

### Purpose and responsibility boundary

Public GitHub Action metadata and execution contract for the free Living Architecture Nodes CI surface.

### Contracts

- exactly one root Action metadata file;
- Node 24 runtime;
- no raw license-key or paid entitlement input;
- basic CI outputs are distinct from semantic verification;
- no remote service or telemetry requirement.

## Dynamic layer

### Current stability state

v0.1.1 Marketplace candidate.

### Recent mutations

- Removed the reserved raw `pro_license_key` input.
- Added `verification_scope` and `semantic_architecture_status` outputs.
- Clarified workspace/export paths must remain inside `GITHUB_WORKSPACE`.

## Security notes

The Action itself does not request GitHub API authority or repository write permission.

## Diagnostic layer

### Regression triggers

- adding a credential/license-key input;
- changing public outputs without matching docs;
- adding a network dependency;
- changing the runtime or entrypoint without release review.
