import { afterAll, beforeAll, describe, expect, it } from "vitest";
// @ts-expect-error The example is intentionally plain JavaScript.
import { createStudyServer } from "../examples/study/server.mjs";
const server = createStudyServer();
let url: string;
beforeAll(async () => { await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve)); url = `http://127.0.0.1:${server.address().port}/chat`; });
afterAll(async () => { await new Promise<void>((resolve) => server.close(resolve)); });
describe("offline practice API", () => {
  it("returns an explicitly labelled demo response", async () => {
    const response = await fetch(url, { method: "POST", body: JSON.stringify({ input: "binary search" }) });
    expect(response.status).toBe(200);
    expect((await response.json()).reply).toContain("no AI inference");
  });
  it.each(['{', '{}', '{"input":42}'])("rejects malformed input %s", async (body) => {
    expect((await fetch(url, { method: "POST", body })).status).toBe(400);
  });
  it("rejects oversized bodies", async () => { expect((await fetch(url, { method: "POST", body: 'x'.repeat(9000) })).status).toBe(413); });
  it("rejects unsupported routes", async () => { expect((await fetch(url)).status).toBe(404); });
});
