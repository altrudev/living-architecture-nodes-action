# src/summary.js — Living Architecture Node

## Purpose

Renders console and Markdown summaries for the basic CI findings.

## Contracts

- only sanitized check data reaches Markdown rendering;
- hostile Markdown/control characters in repository paths are escaped;
- [REDACTED] remains readable as a redaction marker;
- health score is identified as heuristic;
- NOT_VERIFIED is not represented as failure or safety certification.

## Current state

v0.1.3 candidate.

## Regression triggers

Raw unsanitized paths reach the summary, Markdown injection becomes possible, or verification wording overclaims assurance.
