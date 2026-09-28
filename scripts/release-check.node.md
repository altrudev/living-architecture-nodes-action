# scripts/release-check.js — Living Architecture Node

## Purpose

Deterministic Frequency gate for the GitHub Marketplace Action release.

## Checks

- exactly one root Action metadata file;
- Action name, branding, runtime, entrypoint, and outputs;
- no raw license-key input;
- version/tag/documentation synchronization;
- Free product boundary;
- no runtime network capability/literals in src;
- no obvious embedded credentials/private keys;
- Marketplace publication remains blocked until GitHub release UI validation.

## Current state

v0.1.2 Marketplace candidate.

## Regression trigger

Any failed release check blocks merge, tagging, or Marketplace promotion.
