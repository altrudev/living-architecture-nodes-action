# Node: Living Architecture Nodes Check Workflow

## Static layer

### Purpose

Runs the Living Architecture Nodes GitHub Action against this repository to check architecture-memory health, required artifacts, missing node files, dirty node risk, and diagnostic handoff readiness.

### Responsibility boundary

This workflow is responsible for invoking the official Living Architecture Nodes Action during repository pushes, pull requests, or manual workflow runs.

It is not responsible for generating source code, modifying repository files, filing issues, publishing releases, or making architectural decisions.

### Dependencies

This workflow depends on:

- GitHub Actions runner environment
- `actions/checkout`
- `altrudev/living-architecture-nodes-action`
- Repository root artifacts:
  - `ARCH.md`
  - `NERVE.md`
  - `CHANGELOG.node.md`
- `.node.md` companion files throughout the repository

### Dependents

This workflow affects:

- repository quality checks
- architecture-memory compliance visibility
- AI/dev handoff readiness
- release confidence before public updates

### Contracts

Expected inputs:

- repository files checked out into the GitHub Actions workspace
- workflow configuration in `.github/workflows/living-architecture-nodes-check.yml`

Expected outputs:

- GitHub Actions job summary
- health score
- warning/failure status depending on configured threshold
- diagnostic JSON and Markdown reports when export output is enabled

Side effects:

- reads repository files
- writes diagnostic output into the configured export directory during the workflow run
- may fail or warn depending on configuration

## Dynamic layer

### Current stability state

Stable.

### Recent mutations

Created to document the workflow file flagged by the Living Architecture Nodes Action as missing a companion node.

### Known fragile points

- GitHub Actions runner behavior may change over time.
- JavaScript Action runtime versions may require updates.
- Workflow behavior depends on the referenced Action version tag.
- If source extension scanning includes `.yml` and `.yaml`, workflow files require companion node files.

### Interaction warnings

Changing `fail_on`, `changed_only`, or source extension settings can affect whether the workflow blocks CI or only reports diagnostics.

Updating the Action version should be tested with a manual `workflow_dispatch` run before relying on it for release checks.

### Performance observations

Expected to be lightweight for small and medium repositories. Large repositories may require tuned exclusions for generated folders, build outputs, vendored code, or dependency folders.

### Security notes

This workflow reads repository contents and produces diagnostic reports. Diagnostic exports should avoid exposing secrets, credentials, tokens, private keys, or unrelated user content.

## Diagnostic layer

### Past bug patterns

None recorded yet.

### Near misses

The initial workflow run succeeded but reported this workflow file as missing a `.node.md` companion file.

### Regression triggers

- Changing workflow paths without updating this node file
- Changing Action runtime version without testing
- Expanding scanned file extensions without adding node coverage
- Enabling strict failure thresholds before node coverage is complete

### Suspected hidden coupling

Workflow health is coupled to the Living Architecture Nodes Action version, GitHub Actions runtime support, and repository artifact layout.
