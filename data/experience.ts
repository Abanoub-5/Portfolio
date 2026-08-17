import type { ExperienceItem } from "./types";

export const experience: ExperienceItem[] = [
  {
    id: "education",
    type: "education",
    title: "B.Sc. Computer Engineering",
    // TODO: replace with your university name
    organization: "University",
    period: "Ongoing",
    description:
      "Studying the fundamentals of computer systems, software engineering, and the math behind modern computing and AI.",
    highlights: [
      "Algorithms and data structures",
      "Software engineering fundamentals",
      "Systems programming (C++, Java)",
    ],
  },
  {
    id: "ai-learning-program",
    type: "program",
    title: "AI Engineering Learning Program",
    organization: "Self-directed",
    period: "Current focus",
    description:
      "A structured self-learning track covering the full AI stack: LLM APIs, prompt engineering, structured outputs, tool calling, agent loops, and deployment.",
    highlights: [
      "Built real AI projects (LinkedIn AI Ranker, streaming chat, this site)",
      "Applied Zod schemas and tool calling in production-like code",
      "Deployed AI features with server-side API routes",
    ],
  },
  {
    id: "github-open-source",
    type: "program",
    title: "Open Source & Personal Projects",
    organization: "GitHub",
    period: "Ongoing",
    description:
      "Building and shipping personal projects publicly, with version control, testing, and clean architecture as the default.",
    highlights: [
      "frontend-capstone: LinkedIn AI Ranker + streaming chat",
      "This portfolio: full Next.js site with a personal AI agent",
    ],
  },
];

export function getExperience(): ExperienceItem[] {
  return experience;
}
