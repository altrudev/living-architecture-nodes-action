# Privacy

Living Architecture Nodes Action is local-first and runs inside the GitHub Actions runner or other execution environment selected by the user.

## Data handled

The Action enumerates repository-relative paths, checks required/companion-file presence, and uses local git metadata to determine changed-file relationships.

The normal architecture-memory scan does not read source-file contents.

## Client-safe diagnostic output

JSON, Markdown, and GitHub step-summary output are generated from the same explicit allowlist.

They may include counts and relative paths associated with architecture-memory findings. They do not intentionally include:

- absolute runner/workspace paths;
- full source-file or node-file inventories;
- source-file contents;
- GitHub repository identity, repository URL, ref, SHA, or event metadata;
- credentials or entitlement secrets.

Secret-shaped path values are defensively redacted. Markdown path values are escaped before rendering.

Diagnostic files are written inside the configured repository-relative export directory. If the calling workflow deliberately uploads those files as GitHub artifacts, GitHub stores them according to the calling workflow and repository settings.

## Network

The Action contains no runtime HTTP client and makes no remote API calls.

Changed-file detection invokes the local `git` executable with bounded `diff` and `status` commands. It does not invoke a shell and does not perform a network fetch.

GitHub Actions itself and other Actions in the caller's workflow may use network services independently; those are outside this Action's privacy boundary.

## Telemetry

There is no product telemetry.

## Commercial services

The Free GitHub Action does not validate paid licenses and does not require an account.

Any future remote or paid LAN capability must have a separate disclosed data/entitlement contract before activation.

## Ownership

Use of the Action does not transfer ownership of a user's repository, source code, architecture-memory files, or other Customer Content to Valentyn Rukhaylo / Altru.dev.

See [EULA.md](EULA.md) for the license terms governing the Product itself.
