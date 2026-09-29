# src/client-data.js — Living Architecture Node

## Purpose

Defines the explicit client-data allowlist shared by JSON export and GitHub step-summary rendering.

## Contracts

- absolute runner/workspace paths are never exported;
- full source-file/node-file repository inventories are never exported;
- only counts and relative paths attached to findings are retained;
- secret-shaped path metadata is redacted;
- arbitrary future scanner/checker fields do not become exportable automatically;
- semantic NOT_VERIFIED status is preserved exactly.

## Current state

Security/privacy baseline for v0.1.3.

## Regression triggers

Adding fields without privacy review, exporting workspace/repository identifiers, exposing full inventories, or bypassing redaction.
