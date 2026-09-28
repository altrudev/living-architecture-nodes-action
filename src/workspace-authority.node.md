# src/workspace-authority.js — Living Architecture Node

## Static layer

### Purpose and responsibility boundary

Defines the filesystem authority boundary for the GitHub Action.

A configured workspace must remain inside the runner-provided repository root, and diagnostic exports must remain inside the selected workspace.

### Contracts

- repository-relative sub-workspaces are allowed;
- parent traversal outside the authorized root is denied;
- absolute export paths are denied;
- symbolic-link path escape is denied;
- the module performs no network access and collects no telemetry.

## Dynamic layer

### Current stability state

Candidate for v0.1.1 GitHub Marketplace release.

### Recent mutations

- Added during the Frequency Marketplace sweep to make the Action's local-first boundary enforceable rather than documentary.

## Diagnostic layer

### Regression triggers

- Allowing export paths outside the selected repository workspace.
- Following a symbolic link outside the authorized root.
- Accepting an arbitrary absolute workspace outside GITHUB_WORKSPACE.
