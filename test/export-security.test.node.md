# test/export-security.test.js — Living Architecture Node

## Purpose

Adversarial regression coverage for the Action's client-data allowlist, diagnostic export, and GitHub step-summary rendering model.

## Contracts

- absolute runner/workspace paths never enter JSON or Markdown;
- repository identity/environment metadata is omitted from diagnostic payloads;
- full source/node inventories and arbitrary future fields are not exported;
- source-content-like fields are not exported;
- secret-shaped paths are redacted;
- hostile Markdown/control characters are escaped;
- diagnostic files use private POSIX permissions where supported.

## Regression trigger

Any failure blocks release promotion.
