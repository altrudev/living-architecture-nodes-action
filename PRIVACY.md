# Privacy

Living Architecture Nodes Action is local-first and runs inside the GitHub Actions runner for the repository invoking it.

## Data handled

The Action reads repository paths and metadata necessary to check Living Architecture Nodes structure and changed-file relationships.

The v0.1.1 Action does not upload source code or architecture-memory content to Altru.dev or another remote service.

## Network

The Action contains no runtime network client and makes no remote API calls.

GitHub Actions itself and other Actions in the caller's workflow may use network services independently; those are outside this Action's privacy boundary.

## Telemetry

There is no product telemetry in v0.1.1.

## Diagnostic exports

JSON and Markdown diagnostics are written locally under the configured repository-relative export path. If the calling workflow uploads those files as artifacts, GitHub stores them according to that workflow and the repository's GitHub settings.

## Commercial services

The free GitHub Action does not validate paid licenses and does not require an account.

Any future remote or paid LAN capability must have a separate disclosed data/entitlement contract before activation.
