# src/index.js — Living Architecture Node

## Purpose

Orchestrates configuration, scan, checks, local export, GitHub outputs, summary, and CI exit status.

## Contracts

Publishes the heuristic maintenance outputs plus explicit verification_scope and semantic_architecture_status.

## Current state

v0.1.2 Marketplace candidate.

## Regression triggers

action.yml outputs and runtime outputs diverge; semantic NOT_VERIFIED is omitted or converted into a failure; exit status stops following the configured basic CI policy.
