# src/exporter.js — Living Architecture Node

## Purpose

Writes client-safe local JSON and Markdown diagnostic reports.

## Contracts

- output stays inside the authorized workspace;
- schema is living-architecture-nodes-action-diagnostic@0.1.3;
- exporter uses the explicit client-data allowlist;
- JSON and Markdown use the same sanitized check model;
- absolute workspace paths, repository identity metadata, full inventories, arbitrary future fields, and source contents are not exported;
- diagnostic files use private atomic replacement where supported;
- no remote service is called.

## Current state

v0.1.3 client-data hardening candidate.

## Regression triggers

Arbitrary scanner/checker serialization, unsafe direct overwrite, full inventory/path identity leakage, schema drift, or remote transmission.
