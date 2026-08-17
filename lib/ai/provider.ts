import { openai } from "@ai-sdk/openai";
import { createGoogle } from "@ai-sdk/google";

export type Provider = "openai" | "google";

const DEFAULT_PROVIDER: Provider = "openai";

export function getConfiguredProvider(): Provider {
  const configured = process.env.AI_PROVIDER?.toLowerCase();
  if (configured === "google" || configured === "gemini") return "google";
  return DEFAULT_PROVIDER;
}

export function getModel() {
  const provider = getConfiguredProvider();

  if (provider === "google") {
    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    if (!apiKey) {
      throw new Error(
        "Missing GOOGLE_GENERATIVE_AI_API_KEY. Add it to your .env file.",
      );
    }
    const googleProvider = createGoogle({ apiKey });
    return googleProvider(process.env.GEMINI_MODEL ?? "gemini-3.6-flash");
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error(
      "Missing OPENAI_API_KEY. Add it to your .env file (see .env.example).",
    );
  }
  return openai(process.env.OPENAI_MODEL ?? "gpt-4o-mini");
}
