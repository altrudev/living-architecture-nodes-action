# GitHub Marketplace Release — v0.1.2

This repository is prepared for a Free GitHub Action Marketplace release.

## Frequency release gates

Before publication:

1. `npm run verify` passes.
2. Repository is public.
3. Exactly one root `action.yml` / `action.yaml` exists.
4. No raw license-key input exists.
5. No runtime network client is present.
6. Architecture-memory companion files are complete.
7. Release tag is `v0.1.2`.
8. GitHub's release UI reports **Everything looks good!** for the Action metadata.
9. The repository owner accepts the GitHub Marketplace Developer Agreement if prompted.
10. Select **Publish this Action to the GitHub Marketplace**.
11. Select a primary category; suggested: **Code quality**. Optional secondary: **Utilities**.
12. Publish with two-factor authentication.

## Tag strategy

Exact release:

```text
v0.1.2
```

After the Marketplace release is validated, compatibility aliases may point to the same verified commit:

```text
v0.1
v0
```

Users who require immutable behavior should pin the exact tag or full commit SHA.

## Important

Creating a GitHub Release by API/CLI is not treated as proof that the Action was listed in Marketplace. Marketplace publication is only complete after the GitHub release UI has the Marketplace option selected and the public listing is independently checked.
