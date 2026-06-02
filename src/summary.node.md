# src/summary.js — Living Architecture Node

## Static layer

### Purpose and responsibility boundary

Console, Markdown, and step-summary report rendering.

This node must remain focused on its stated responsibility and should not absorb unrelated product, licensing, or UI concerns.

### Dependencies

Calls: None.

Called by: src/index.js, src/exporter.js.

### Contracts

- Accepts only normalized inputs from its direct caller unless otherwise stated.
- Returns deterministic data structures or performs one bounded side effect.
- Must not call remote services or collect telemetry.

## Dynamic layer

### Current stability state

Stable for v0.1.0.

### Recent mutations

Initial implementation created for the GitHub Action wrapper.

### Known fragile points

- Changes to file paths, action input names, or report shapes can cascade into dependent modules.
- Keep behavior local-first and CI-safe.

### Interaction warnings

Review `ARCH.md` and `NERVE.md` before changing this module because the action relies on tight alignment between metadata, scanner output, checker output, and reports.

### Performance observations

Acceptable for small and medium repositories. Large repositories may require path filtering in later versions.

### Security notes

No telemetry. No remote calls. Avoid exporting source contents or secrets.

## Diagnostic layer

### Past bug patterns

None yet.

### Near misses

None yet.

### Regression triggers

- Changing public output shape without updating README and `action.yml`.
- Changing source matching behavior without updating check/report expectations.

### Suspected hidden coupling

Potential coupling to GitHub Actions checkout behavior and git history depth.
