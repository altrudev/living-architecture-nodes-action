# test/workspace-authority.test.js — Living Architecture Node

## Purpose

Adversarial regression tests for the Action filesystem authority and diagnostic replacement boundary.

## Coverage

- repository root and subdirectory acceptance;
- parent traversal rejection;
- absolute export rejection;
- symbolic-link escape rejection;
- atomic diagnostic replacement;
- hard-link overwrite resistance: replacing a diagnostic must not modify another hard link to the old destination inode;
- private diagnostic file/directory modes are covered by export-security tests where POSIX modes are supported.

## Current state

Updated for the v0.1.3 licensing/client-data/security candidate.

## Regression trigger

Any failing filesystem-authority or atomic-replacement case blocks Marketplace release promotion.
