# src/summary.js — Living Architecture Node

## Purpose

Renders console and Markdown summaries for basic CI findings.

## Contracts

- the health score is labelled as a heuristic maintenance score;
- semantic architecture is displayed as NOT_VERIFIED;
- NOT_VERIFIED is explicitly not a failed/unsafe verdict.

## Current state

v0.1.2 Marketplace candidate.

## Regression triggers

User-facing wording overclaims verification or diverges from checker output.
