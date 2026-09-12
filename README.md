# pi-claude-max

A [Pi](https://pi.dev) extension that consumes Claude Pro/Max subscription usage instead of extra usage.

> **Note:** This makes Pi identify to Anthropic's API the way the official Claude Code CLI does. Using a third-party harness with your subscription may be against Anthropic's terms; understand the risk before using it.

## Install

```bash
# from npm
pi install npm:pi-claude-max

# or from git
pi install git:github.com/bradennss/pi-claude-max

# try it for a single run without installing
pi -e npm:pi-claude-max
```

Then, optionally, silence the extra-usage warning by adding to `~/.pi/agent/settings.json`:

```json
{
  "warnings": { "anthropicExtraUsage": false }
}
```

## Requirements

- Pi authenticated with an Anthropic OAuth token via `/login anthropic`.
- Node.js >= 20.

## Development

```bash
pnpm install
pnpm run check
```

## Contributing

Every change that affects the published package needs a [changeset](https://github.com/changesets/changesets). Add one before opening a pull request:

```bash
pnpm changeset
```

CI blocks pull requests that change the package without a changeset. For changes that should not trigger a release, add an empty changeset with `pnpm changeset --empty` or apply the `@changesets/skip` label.

## Releasing

Releases are automated with Changesets:

1. Merging changesets into `main` opens or updates a **Version Packages** pull request that bumps the version and updates `CHANGELOG.md`.
2. Merging that pull request publishes to npm and creates the matching GitHub release and tag.

## License

[MIT](LICENSE)
