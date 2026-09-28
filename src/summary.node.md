# src/summary.js — Living Architecture Node

## Static layer

### Purpose

Renders console and Markdown summaries for basic CI findings.

### Contracts

- health score is labelled as heuristic maintenance status;
- semantic architecture is displayed as `NOT_VERIFIED`;
- summary explains that `NOT_VERIFIED` is not failure/unsafe.

## Dynamic layer

### Current stability state

v0.1.1 Marketplace candidate.

## Diagnostic layer

### Regression triggers

- wording overclaims verification;
- Marketplace/user-facing semantics diverge from checker output.
