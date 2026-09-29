# src/checker.js — Living Architecture Node

## Purpose

Evaluates basic repository architecture-memory checks and the heuristic maintenance score.

## Contracts

- no absolute workspace path is stored in the check result;
- maintenance score is not a semantic architecture verdict;
- semantic architecture remains NOT_VERIFIED in the Free Action;
- no license/tier decision occurs in the checker.

## Current state

v0.1.3 candidate.

## Regression triggers

Workspace identity enters the result, score is presented as semantic proof, semantic status changes without a verifier, or paid entitlement logic enters the Free checker.
