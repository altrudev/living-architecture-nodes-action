# src/checker.js — Living Architecture Node

## Static layer

### Purpose

Evaluates basic repository architecture-memory checks and the heuristic maintenance score.

### Contracts

- maintenance score is not a semantic architecture verdict;
- semantic architecture is `NOT_VERIFIED` in v0.1.1;
- `NOT_VERIFIED` means the check did not execute, not that it failed;
- no license or tier decision is made here.

## Dynamic layer

### Current stability state

v0.1.1 Marketplace candidate.

### Recent mutations

Separated basic-local-CI verification scope from deeper semantic verification.

## Diagnostic layer

### Regression triggers

- score being presented as semantic proof;
- semantic status changing without an actual semantic verifier;
- paid entitlement logic entering the free checker.
