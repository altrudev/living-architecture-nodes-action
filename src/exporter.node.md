# src/exporter.js — Living Architecture Node

## Purpose

Writes local JSON and Markdown diagnostic reports.

## Contracts

- output stays inside the authorized workspace export directory;
- schema is living-architecture-nodes-action-diagnostic@0.1.2;
- diagnostic payload passes through defensive redaction;
- no repository content is transmitted to a remote service.

## Current state

v0.1.2 Marketplace candidate.

## Regression triggers

Schema/version drift, export outside the authorized workspace, or remote transmission is introduced.
