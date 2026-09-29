# src/git.js — Living Architecture Node

## Purpose

Best-effort changed-file detection using local git metadata and GitHub event metadata.

## Contracts

- invokes the local git executable with execFileSync;
- never invokes a shell;
- uses only bounded diff/status commands;
- performs no git fetch/push or remote network operation;
- returns relative changed-file paths only.

## Current state

Reviewed for v0.1.3.

## Regression triggers

Shell invocation, network-capable git commands, arbitrary command construction, or changed-file evidence being treated as semantic verification.
