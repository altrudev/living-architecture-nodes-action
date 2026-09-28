# src/config.js — Living Architecture Node

## Purpose

Normalizes Action inputs and constructs the authorized runtime configuration.

## Contracts

- GITHUB_WORKSPACE is the authority root;
- optional workspace stays inside that root;
- export path stays inside the selected workspace;
- no paid-license input is parsed.

## Current state

v0.1.2 Marketplace candidate with canonical workspace/export authority resolution.

## Regression triggers

Path escape, input/default drift from action.yml, or reintroduction of raw license data.
