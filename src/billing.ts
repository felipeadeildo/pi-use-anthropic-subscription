import { createHash } from "node:crypto";

export const DEFAULT_CLAUDE_CODE_VERSION = "2.1.280";

export const CLAUDE_CODE_IDENTITY =
  "You are Claude Code, Anthropic's official CLI for Claude.";

const FINGERPRINT_SALT = "59cf53e54c78";

export function userAgent(
  version: string = DEFAULT_CLAUDE_CODE_VERSION,
): string {
  return `claude-cli/${version} (external, cli)`;
}

export function computeFingerprint(
  firstUserMessageText: string,
  version: string = DEFAULT_CLAUDE_CODE_VERSION,
): string {
  const sampled = [4, 7, 20]
    .map((i) => firstUserMessageText[i] || "0")
    .join("");

  return createHash("sha256")
    .update(`${FINGERPRINT_SALT}${sampled}${version}`)
    .digest("hex")
    .slice(0, 3);
}

export function billingAttribution(
  firstUserMessageText: string,
  version: string = DEFAULT_CLAUDE_CODE_VERSION,
): string {
  const fingerprint = computeFingerprint(firstUserMessageText, version);
  return `x-anthropic-billing-header: cc_version=${version}.${fingerprint}; cc_entrypoint=cli;`;
}
