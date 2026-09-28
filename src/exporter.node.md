# src/exporter.js — Living Architecture Node

## Static layer

### Purpose

Writes local JSON and Markdown diagnostic reports.

### Contracts

- output stays inside the authorized workspace export directory;
- schema is `living-architecture-nodes-action-diagnostic@0.1.1`;
- payload is passed through defensive redaction;
- no source file contents are uploaded or transmitted.

## Dynamic layer

### Current stability state

v0.1.1 Marketplace candidate.

## Diagnostic layer

### Regression triggers

- schema/version drift;
- export outside authorized workspace;
- adding remote transmission.
