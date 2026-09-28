# Security

## Security model

Living Architecture Nodes Action runs with the permissions and filesystem access provided by the calling GitHub Actions job.

The Action itself does not request a GitHub token, invoke GitHub APIs, or perform network access.

## Filesystem boundary

- `GITHUB_WORKSPACE` is the authority root.
- Optional `workspace` must remain inside that root.
- `export_path` must remain inside the selected workspace.
- Parent traversal is rejected.
- Absolute export paths are rejected.
- Symbolic-link escape is rejected.

## Workflow permissions

The recommended example uses:

```yaml
permissions:
  contents: read
```

The Action does not require write permission to repository contents.

## Secrets

Do not pass credentials or tokens as LAN inputs. v0.1.1 has no license-key input.

Diagnostic output has defensive redaction for common credential shapes, but workflows should not deliberately place secrets in repository filenames or LAN metadata.

## Reporting

For security-sensitive reports, do not post credentials, private repository content, or exploitable customer material in a public issue. Use the private contact route published at https://altru.dev.
