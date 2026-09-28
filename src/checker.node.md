# src/checker.js — Living Architecture Node

## Purpose

Evaluates basic repository architecture-memory checks and the heuristic maintenance score.

## Contracts

- maintenance score is not a semantic architecture verdict;
- semantic architecture is NOT_VERIFIED in v0.1.1;
- NOT_VERIFIED means the check did not execute, not that it failed;
- no license or tier decision is made here.

## Current state

v0.1.1 Marketplace candidate.

## Regression triggers

Score presented as semantic proof, semantic status changes without a verifier, or paid entitlement logic enters the free checker.
