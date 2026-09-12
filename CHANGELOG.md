# pi-claude-max

## 1.1.1

### Patch Changes

- [#5](https://github.com/bradennss/pi-claude-max/pull/5) [`b4a01ff`](https://github.com/bradennss/pi-claude-max/commit/b4a01ff7e02422222965fe5d41d20aaf1fbe3183) Thanks [@bradennss](https://github.com/bradennss)! - Reword the description to say the extension consumes Claude Pro/Max subscription usage.

## 1.1.0

### Minor Changes

- [#3](https://github.com/bradennss/pi-claude-max/pull/3) [`ac2b917`](https://github.com/bradennss/pi-claude-max/commit/ac2b91719e321f590f34b1b00cf150b1692d7162) Thanks [@bradennss](https://github.com/bradennss)! - The harness system prompt now travels in the first user message instead of a merged `system` block. Anthropic's billing classifier inspects `system[]` and routes third-party content to extra-usage billing, so `system` now carries only the attribution and identity blocks. This keeps requests on the Claude plan while the model still reads and follows the Pi guidelines and AGENTS.md context.

  The `PI_CLAUDE_MAX_CC_VERSION` and `PI_CLAUDE_MAX_DISABLE` environment variables are removed. The extension advertises a fixed Claude Code version and runs whenever Pi loads it.

## 1.0.1

### Patch Changes

- [`c9fc95d`](https://github.com/bradennss/pi-claude-max/commit/c9fc95d750d5b750cc313f2643d1529ed7edf3de) Thanks [@bradennss](https://github.com/bradennss)! - Update repository URLs to the renamed GitHub repository.

## 1.0.0

### Major Changes

- [`1db0d81`](https://github.com/bradennss/pi-claude-max/commit/1db0d8113323b2e33380a4f472cf68708b8d52a5) Thanks [@bradennss](https://github.com/bradennss)! - First stable release.
