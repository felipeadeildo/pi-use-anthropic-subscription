---
"pi-claude-max": patch
---

Advertise Claude Code 2.1.280 instead of 2.1.211. Anthropic gates newer models on the Claude Code version a request reports and answers with a 400 `claude_code_version_too_old` below the per-model minimum, which for Claude Opus 5.5 is 2.1.280.
