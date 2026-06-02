# Product Roadmap — Living Architecture Nodes Action

## v0.1.x — Public basic action

- Required artifact detection
- Missing node detection
- Dirty-node risk detection
- Diagnostic JSON/Markdown export
- GitHub step summary
- Artifact upload support through workflow example

## v0.2.x — Better CI intelligence

- Config file support: `living-architecture-nodes.config.json`
- Path filters for monorepos
- Language-specific mapping presets
- PR comment summary
- SARIF export option
- Better first-commit and shallow-clone handling

## v0.3.x — Pro-ready reports

- Architecture drift report
- Cascade map export
- Health score history
- AI handoff bundle zip
- Client-ready Markdown report
- Redaction policy configuration

## v1.0 — Commercial wrapper

- License validation
- Team policy gates
- Private repo support workflow
- Enterprise configuration profile
- Signed release package
- Official compatibility badge rules

## Boundaries

This action should remain a CI wrapper. It should not absorb the private core engine, desktop app, VS Code extension, or license service implementation.
