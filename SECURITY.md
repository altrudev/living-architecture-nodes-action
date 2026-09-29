# Security Policy

## Runtime security model

Living Architecture Nodes Action runs with the permissions and filesystem access provided by the calling GitHub Actions job.

The Action:

- does not request or require a GitHub token;
- does not invoke GitHub APIs;
- has no runtime npm dependencies;
- contains no runtime HTTP client or telemetry;
- does not use `eval` or dynamic code execution;
- invokes the local `git` executable only for bounded changed-file `diff` / `status` analysis;
- does not invoke a shell;
- does not read source-file contents during architecture-memory scanning.

## Filesystem boundary

- `GITHUB_WORKSPACE` is the authority root.
- Optional `workspace` must remain inside that root.
- `export_path` must remain inside the selected workspace.
- Parent traversal is rejected.
- Absolute export paths are rejected.
- Symbolic-link path escape is rejected.
- Diagnostic writes use atomic same-directory replacement: a private temporary file is written and then renamed over the destination.
- The hard-link regression test verifies that replacing an existing diagnostic does not modify another hard link to the old inode.
- On POSIX systems, new diagnostic files use mode `0600` and newly created export directories use mode `0700`.

## Client-data boundary

Diagnostic JSON and GitHub/Markdown summaries use the same explicit allowlist.

Absolute workspace paths, full repository inventories, source contents, GitHub repository identity/environment metadata, and arbitrary future checker fields are not exported.

Secret-shaped path metadata is defensively redacted before output.

## Workflow permissions

The recommended workflow uses:

```yaml
permissions:
  contents: read
```

The Action does not require repository-content write permission.

## Secrets

Do not pass credentials or tokens as LAN inputs. The Free Action has no license-key input.

Redaction is defense in depth. It is not permission to deliberately place secrets in filenames or diagnostic metadata.

## Reporting a vulnerability

Do not disclose credentials, exploitable customer material, private repository content, or vulnerability details in a public issue.

Prefer GitHub private vulnerability reporting:

https://github.com/altrudev/living-architecture-nodes-action/security/advisories/new

If that route is unavailable, use the private contact path published at:

https://altru.dev

Include the affected release/tag, minimal reproduction, expected/actual behavior, and the minimum information necessary to demonstrate the issue.

## Supported release line

Security fixes are applied to the current Marketplace release line. Older releases may not receive backports.
