# scripts/release-check.js — Living Architecture Node

## Purpose

Deterministic Frequency gate for candidate promotion to GitHub Marketplace.

## Checks

- exact Action metadata and Node 24 entrypoint;
- candidate package version synchronization;
- current live release immutability and alias freeze;
- Free product boundary;
- separate EULA and proprietary source-available license model;
- trademark, third-party notices, contribution rights, customer-content ownership;
- zero npm runtime dependencies and lockfile consistency;
- explicit client-data allowlist and secure exporter/summary path;
- bounded local git subprocess only;
- no runtime network client, telemetry, dynamic eval, or embedded credentials;
- candidate remains NOT LIVE until Marketplace publication is independently verified.

## Current state

v0.1.3 candidate gate.

## Regression trigger

Any failed check blocks merge, exact-tag creation, Marketplace publication, or alias movement.
