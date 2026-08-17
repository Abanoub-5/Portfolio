import type {
  AiStack,
  AiWriteup,
  Certification,
  LearningTopic,
} from "./types";

export const aiConcepts: LearningTopic[] = [
  {
    title: "LLM APIs",
    description:
      "Calling large language models programmatically, handling requests, responses, and token limits.",
    status: "applying",
    tags: ["OpenAI", "Gemini", "AI SDK"],
  },
  {
    title: "Prompt Engineering",
    description:
      "Writing clear system prompts that steer model behavior without inventing facts.",
    status: "applying",
    tags: ["System prompts", "Instructions"],
  },
  {
    title: "Structured Outputs",
    description:
      "Getting models to return predictable, typed data instead of free-form text.",
    status: "applying",
    tags: ["Zod", "JSON"],
  },
  {
    title: "Tool Calling",
    description:
      "Giving the model real functions to call so it grounds answers in real data.",
    status: "applying",
    tags: ["Tools", "Functions"],
  },
  {
    title: "Agent Loops",
    description:
      "Letting a model call tools, read results, and keep going until the answer is complete.",
    status: "applying",
    tags: ["Multi-step", "streamText"],
  },
  {
    title: "Streaming Responses",
    description:
      "Sending model output to the user token by token for a responsive feel.",
    status: "applying",
    tags: ["SSE", "Text stream"],
  },
  {
    title: "Retrieval over Structured Data",
    description:
      "Searching and filtering structured portfolio data so answers stay accurate.",
    status: "applying",
    tags: ["searchPortfolio", "Data"],
  },
  {
    title: "Error Handling & Security",
    description:
      "Handling API failures gracefully and keeping secrets server-side.",
    status: "applying",
    tags: ["Env vars", "Server routes"],
  },
  {
    title: "Evaluation & Testing",
    description:
      "Writing tests that verify tools, validation, and agent behavior without a live API.",
    status: "exploring",
    tags: ["Vitest", "Mocking"],
  },
];

export const aiStack: AiStack[] = [
  { category: "Frameworks", items: ["Next.js", "AI SDK", "React"] },
  { category: "Providers", items: ["OpenAI", "Google Gemini"] },
  { category: "Validation", items: ["Zod"] },
  { category: "Deployment", items: ["Vercel"] },
  { category: "Testing", items: ["Vitest", "React Testing Library"] },
];

export const certifications: Certification[] = [
  // TODO: replace with your real certifications / programs
  {
    title: "AI SDK Learning Path",
    issuer: "Self-paced",
    year: "2026",
    url: null,
  },
];

export const aiWriteups: AiWriteup[] = [
  {
    title: "How I built a tool-using AI agent",
    summary:
      "A short write-up on the architecture behind the agent on this site: tools, schemas, and the agent loop.",
    tags: ["agents", "tools", "next.js"],
    url: null,
  },
  {
    title: "Why structured outputs matter",
    summary:
      "Notes on how Zod schemas turn fuzzy LLM output into data your code can trust.",
    tags: ["zod", "structured outputs"],
    url: null,
  },
];

export function getAiConcepts(): LearningTopic[] {
  return aiConcepts;
}

export function getAiStack(): AiStack[] {
  return aiStack;
}

export function getCertifications(): Certification[] {
  return certifications;
}

export function getAiWriteups(): AiWriteup[] {
  return aiWriteups;
}
