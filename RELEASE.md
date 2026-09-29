# GitHub Marketplace Release State

## Current verified Marketplace release

Living Architecture Nodes Check **v0.1.2** remains the immutable release currently verified live in GitHub Marketplace.

- exact tag: `v0.1.2`
- release commit: `c7d44c31bb7631d8aec357b94803d89246555e7e`
- Marketplace: **verified live**
- pricing: **Free**
- categories: **code-quality**, **utilities**

The exact tag must not move.

The compatibility aliases remain pinned to that verified release until a replacement release completes all promotion gates:

```text
v0.1 → c7d44c31bb7631d8aec357b94803d89246555e7e
v0   → c7d44c31bb7631d8aec357b94803d89246555e7e
```

## Candidate release — v0.1.3

v0.1.3 is the licensing, client-data, and security hardening candidate.

It must not be described as live until all of the following are complete:

1. the candidate is merged to `main`;
2. full Frequency verification passes from the exact merged commit;
3. immutable tag/release `v0.1.3` is created from that commit;
4. GitHub's Marketplace release UI validates the Action metadata;
5. **Publish this Action to the GitHub Marketplace** is selected;
6. the public Marketplace page independently shows `v0.1.3` as Latest;
7. `v0.1` and `v0` are advanced only after that live verification;
8. each moved alias is cloned and passes the candidate release verification.

## Licensing gate

The candidate must include and synchronize:

- `EULA.md`;
- `LICENSE`;
- `TRADEMARK.md`;
- `THIRD_PARTY_NOTICES.md`;
- `CONTRIBUTING.md`;
- `NOTICE.md`;
- `PRIVACY.md`;
- `SECURITY.md`;
- `SUPPORT.md`.

GitHub Marketplace's platform rights are preserved separately; the end-user license must not attempt to revoke rights Provider has granted GitHub under Marketplace/platform agreements.

## Immutable-release rule

Never repurpose, rewrite, or move an exact release tag. New runtime, licensing, privacy, or security behavior requires a new immutable release.
