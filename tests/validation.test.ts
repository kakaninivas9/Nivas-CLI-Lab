import { describe, expect, it } from "vitest";
import { configSchema } from "../src/core/configLoader.js";

const base = { name: "study-cli", provider: "custom", api: "http://127.0.0.1:8787/chat" };
describe("configuration regressions", () => {
  it.each(["file:///tmp/model", "ftp://example.com/model"])("rejects unsupported API scheme %s", (api) => {
    expect(configSchema.safeParse({ ...base, api }).success).toBe(false);
  });
  it.each(["doctor", "help", 'chat\");process.exit();//', "Chat"])("rejects conflicting or unsafe command %s", (name) => {
    expect(configSchema.safeParse({ ...base, commands: [{ name, description: "test" }] }).success).toBe(false);
  });
  it("reports the duplicate command location", () => {
    const result = configSchema.safeParse({ ...base, commands: [{ name: "chat", description: "one" }, { name: "chat", description: "two" }] });
    expect(result.success).toBe(false);
    if (!result.success) expect(result.error.issues[0].path).toEqual(["commands", 1, "name"]);
  });
  it("accepts distinct commands and a valid credential variable", () => {
    expect(configSchema.safeParse({ ...base, auth: { type: "bearer", envVar: "STUDY_API_KEY" }, commands: [{ name: "explain", description: "Explain" }, { name: "quiz", description: "Quiz" }] }).success).toBe(true);
  });
  it("rejects a pasted key in the environment variable field", () => {
    expect(configSchema.safeParse({ ...base, auth: { type: "bearer", envVar: "sk-example-secret" } }).success).toBe(false);
  });
});
