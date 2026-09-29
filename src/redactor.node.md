# src/redactor.js — Living Architecture Node

## Purpose

Defense-in-depth redaction for secret-shaped values in client-visible diagnostic metadata.

## Contracts

- covers GitHub tokens, common API-key/token/password assignments, private-key blocks, Google/AWS/Slack/OpenAI-style credential shapes;
- recursive object redaction is deterministic;
- no network access or telemetry;
- redaction is not permission to collect source contents.

## Current state

Expanded for v0.1.3.

## Regression triggers

A covered secret survives export, redaction diverges between JSON/Markdown, or broader data collection is justified solely by redaction.
