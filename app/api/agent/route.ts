import { buildAgentResponse } from "@/lib/ai/agent";

export const runtime = "nodejs";

const isDev = process.env.NODE_ENV === "development";

function describeError(error: unknown): string {
  if (error instanceof Error) {
    const cause = error.cause instanceof Error ? ` cause=${error.cause.message}` : "";
    return `${error.name}: ${error.message}${cause}`;
  }
  if (typeof error === "object" && error !== null) {
    try {
      const keys = Object.keys(error as object);
      const summarized: Record<string, unknown> = {};
      for (const key of keys) {
        const value = (error as Record<string, unknown>)[key];
        summarized[key] =
          typeof value === "object" && value !== null
            ? JSON.stringify(value)
            : String(value);
      }
      return JSON.stringify(summarized);
    } catch {
      return String(error);
    }
  }
  return String(error);
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json(
      { error: "Invalid request: body must be valid JSON." },
      { status: 400 },
    );
  }

  const messages = (body as { messages?: unknown })?.messages;

  if (!Array.isArray(messages)) {
    return Response.json(
      { error: "Invalid request: expected a 'messages' array." },
      { status: 400 },
    );
  }

  try {
    const response = await buildAgentResponse({
      messages,
      onError: (error) => {
        console.error("[agent] stream error:", describeError(error));
        if (isDev) {
          return `[dev] Agent error: ${describeError(error)}`;
        }
        return "I ran into a problem while answering. Please try again in a moment.";
      },
    });

    return response;
  } catch (error) {
    console.error("[agent] route error:", describeError(error));
    const message =
      error instanceof Error ? error.message : "Unknown error";
    const isConfig = /(API_KEY|\.env)/i.test(message);

    if (isDev) {
      return Response.json(
        {
          error: `[dev] Agent error: ${describeError(error)}`,
        },
        { status: 500 },
      );
    }

    return Response.json(
      {
        error: isConfig
          ? "The AI agent is not configured yet. The site owner needs to add an API key."
          : "Something went wrong while running the AI agent.",
      },
      { status: 500 },
    );
  }
}