import { describe, expect, it, vi, beforeEach } from "vitest";
import { POST } from "@/app/api/agent/route";
import { getModel } from "@/lib/ai/provider";

vi.mock("@/lib/ai/provider", () => ({
  getModel: vi.fn(),
}));

vi.mock("@/lib/ai/system-prompt", () => ({
  systemPrompt: "test prompt",
}));

function configError(): never {
  throw new Error(
    "Missing OPENAI_API_KEY. Add it to your .env file (see .env.example).",
  );
}

describe("POST /api/agent", () => {
  beforeEach(() => {
    vi.mocked(getModel).mockReset();
    vi.mocked(getModel).mockImplementation(configError);
  });

  it("returns 400 for malformed JSON", async () => {
    const res = await POST(
      new Request("http://localhost/api/agent", {
        method: "POST",
        body: "not-json",
        headers: { "Content-Type": "application/json" },
      }),
    );
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toContain("valid JSON");
  });

  it("returns 400 for a non-array messages body", async () => {
    const res = await POST(
      new Request("http://localhost/api/agent", {
        method: "POST",
        body: JSON.stringify({ messages: "not-an-array" }),
        headers: { "Content-Type": "application/json" },
      }),
    );
    expect(res.status).toBe(400);
  });

  it("returns 400 for a body without messages", async () => {
    const res = await POST(
      new Request("http://localhost/api/agent", {
        method: "POST",
        body: JSON.stringify({}),
        headers: { "Content-Type": "application/json" },
      }),
    );
    expect(res.status).toBe(400);
  });

  it("returns a config error message (500) when the API key is missing", async () => {
    const res = await POST(
      new Request("http://localhost/api/agent", {
        method: "POST",
        body: JSON.stringify({
          messages: [
            {
              id: "1",
              role: "user",
              parts: [{ type: "text", text: "What projects has he built?" }],
            },
          ],
        }),
        headers: { "Content-Type": "application/json" },
      }),
    );
    expect(res.status).toBe(500);
    const body = await res.json();
    expect(body.error).toContain("not configured");
  });

  it("returns a generic error (500) for non-config failures", async () => {
    vi.mocked(getModel).mockImplementation(() => {
      throw new Error("Something exploded");
    });

    const res = await POST(
      new Request("http://localhost/api/agent", {
        method: "POST",
        body: JSON.stringify({
          messages: [
            {
              id: "1",
              role: "user",
              parts: [{ type: "text", text: "hi" }],
            },
          ],
        }),
        headers: { "Content-Type": "application/json" },
      }),
    );
    expect(res.status).toBe(500);
    const body = await res.json();
    expect(body.error).toContain("Something went wrong");
  });

  it("never leaks the raw error message", async () => {
    vi.mocked(getModel).mockImplementation(() => {
      throw new Error("SUPER_SECRET_INTERNAL_TOKEN=abc123");
    });

    const res = await POST(
      new Request("http://localhost/api/agent", {
        method: "POST",
        body: JSON.stringify({ messages: [] }),
        headers: { "Content-Type": "application/json" },
      }),
    );
    expect(res.status).toBe(500);
    const text = await res.text();
    expect(text).not.toContain("SUPER_SECRET_INTERNAL_TOKEN");
    expect(text).not.toContain("abc123");
  });
});