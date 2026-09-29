# src/workspace-authority.js — Living Architecture Node

## Purpose

Defines the repository filesystem authority boundary and secure diagnostic write primitive.

## Contracts

- configured workspace remains inside GITHUB_WORKSPACE;
- parent traversal, absolute external targets, and symbolic-link path components are rejected;
- diagnostic replacement uses a private same-directory temporary file followed by atomic rename;
- a pre-existing hard link to the old destination inode is not modified by replacement;
- POSIX file mode 0600 and newly created output-directory mode 0700 are used where supported;
- no network access or telemetry.

## Current state

v0.1.3 security hardening candidate.

## Regression triggers

Path escape, direct truncate-overwrite, symlink following, hard-link side effects, or weakened private output permissions.
