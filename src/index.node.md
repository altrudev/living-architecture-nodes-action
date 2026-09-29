# src/index.js — Living Architecture Node

## Purpose

Orchestrates configuration, scan, checks, client-safe local export, GitHub outputs, summary, and CI exit status.

## Contracts

- GitHub step summary is rendered only from sanitizeCheckForOutput();
- console status exposes counts/status only;
- public outputs remain heuristic/basic-CI semantics;
- semantic status remains NOT_VERIFIED unless a real semantic verifier executes.

## Current state

v0.1.3 security/privacy candidate.

## Regression triggers

Raw checker/scanner state reaches the GitHub step summary, action.yml outputs diverge, or semantic NOT_VERIFIED is silently upgraded to a pass.
