# src/index.js — Living Architecture Node

## Static layer

### Purpose

Orchestrates configuration, scan, checks, export, GitHub outputs, summary, and CI exit status.

### Contracts

Publishes basic maintenance outputs plus explicit `verification_scope` and `semantic_architecture_status`.

## Dynamic layer

### Current stability state

v0.1.1 Marketplace candidate.

### Recent mutations

Added explicit verification-scope outputs and removed any Pro/license result surface.

## Diagnostic layer

### Regression triggers

- action.yml outputs and runtime outputs diverge;
- exit code stops following configured basic CI policy;
- semantic `NOT_VERIFIED` is omitted or converted into a failure.
