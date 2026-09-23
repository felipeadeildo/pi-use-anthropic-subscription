import { expect, test } from "vitest";
import { CLAUDE_CODE_IDENTITY } from "../src/billing.ts";
import {
  type SystemBlock,
  extractFirstUserMessageText,
  isOAuthClaudeCodeSystem,
  relocateSystemToUser,
} from "../src/system-prompt.ts";

const oauthSystem: SystemBlock[] = [
  {
    type: "text",
    text: CLAUDE_CODE_IDENTITY,
    cache_control: { type: "ephemeral" },
  },
  { type: "text", text: "You are an expert coding assistant." },
];

test("isOAuthClaudeCodeSystem detects the OAuth Claude Code shape", () => {
  expect(isOAuthClaudeCodeSystem(oauthSystem)).toBe(true);
});

test("isOAuthClaudeCodeSystem rejects API-key / foreign shapes", () => {
  expect(isOAuthClaudeCodeSystem(undefined)).toBe(false);
  expect(isOAuthClaudeCodeSystem("a plain string system")).toBe(false);
  expect(isOAuthClaudeCodeSystem([])).toBe(false);
  expect(
    isOAuthClaudeCodeSystem([
      { type: "text", text: "You are a helpful assistant." },
    ]),
  ).toBe(false);
});

test("extractFirstUserMessageText handles string and block content", () => {
  expect(
    extractFirstUserMessageText([{ role: "user", content: "hi there" }]),
  ).toBe("hi there");
  expect(
    extractFirstUserMessageText([
      { role: "assistant", content: "ignored" },
      { role: "user", content: [{ type: "text", text: "block text" }] },
    ]),
  ).toBe("block text");
  expect(extractFirstUserMessageText([])).toBe("");
});

test("relocateSystemToUser keeps only attribution + identity in system", () => {
  const messages = [
    { role: "user", content: "Reply with the single word: pong" },
  ];
  const { system } = relocateSystemToUser(oauthSystem, messages, "2.1.280");
  expect(system.length).toBe(2);
  expect(system[0].text).toBe(
    "x-anthropic-billing-header: cc_version=2.1.280.3a6; cc_entrypoint=cli;",
  );
  expect(system[0].cache_control).toBeUndefined();
  expect(system[1].text).toBe(CLAUDE_CODE_IDENTITY);
  expect(system[1].cache_control).toEqual({ type: "ephemeral" });
});

test("relocateSystemToUser prepends the harness prompt to string user content", () => {
  const { messages } = relocateSystemToUser(
    oauthSystem,
    [{ role: "user", content: "do the thing" }],
    "2.1.280",
  );
  expect(messages.length).toBe(1);
  expect(messages[0].content).toBe(
    "<system-instructions>\nYou are an expert coding assistant.\n</system-instructions>\n\ndo the thing",
  );
});

test("relocateSystemToUser unshifts a block into array user content", () => {
  const { messages } = relocateSystemToUser(
    oauthSystem,
    [{ role: "user", content: [{ type: "text", text: "do the thing" }] }],
    "2.1.280",
  );
  const content = messages[0].content as { type?: string; text?: string }[];
  expect(content.length).toBe(2);
  expect(content[0].text).toBe(
    "<system-instructions>\nYou are an expert coding assistant.\n</system-instructions>",
  );
  expect(content[1].text).toBe("do the thing");
});

test("relocateSystemToUser leaves messages untouched when there is no user system block", () => {
  const single: SystemBlock[] = [{ type: "text", text: CLAUDE_CODE_IDENTITY }];
  const { system, messages } = relocateSystemToUser(
    single,
    [{ role: "user", content: "x" }],
    "2.1.280",
  );
  expect(system.length).toBe(2);
  expect(system[1].text).toBe(CLAUDE_CODE_IDENTITY);
  expect(messages[0].content).toBe("x");
});

test("relocateSystemToUser creates a user message when none exists", () => {
  const { messages } = relocateSystemToUser(oauthSystem, [], "2.1.280");
  expect(messages.length).toBe(1);
  expect(messages[0].role).toBe("user");
  expect(messages[0].content).toBe(
    "<system-instructions>\nYou are an expert coding assistant.\n</system-instructions>",
  );
});
