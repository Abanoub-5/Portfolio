import type { Project } from "./types";

export const projects: Project[] = [
  {
    id: "ai-portfolio",
    title: "Personal AI Portfolio",
    shortDescription:
      "This website — a Next.js portfolio with a real tool-using AI agent.",
    description:
      "A production-quality personal website built with Next.js, TypeScript, and Tailwind CSS. It showcases projects, skills, and learning, and ships a working personal AI agent that answers questions about me using structured portfolio data.",
    problem:
      "I wanted one project that proves I can build a professional web app AND master the AI stack end to end, from LLM API calls to tool calling and deployment.",
    solution:
      "Combined a classic portfolio site with a real AI agent. The agent uses the AI SDK, runs server-side, streams responses, and calls validated tools (searchPortfolio, getProject, getSkills, getExperience) backed by Zod schemas so it never invents information.",
    technologies: [
      "Next.js",
      "TypeScript",
      "React",
      "Tailwind CSS",
      "AI SDK",
      "OpenAI / Gemini",
      "Zod",
      "Vitest",
    ],
    keyDecisions: [
      "Server-side API route keeps the API key off the client.",
      "Tools return data from structured local files instead of long prompt blobs.",
      "Zod schemas validate every tool input before execution.",
      "Streaming responses keep the chat feel instant.",
    ],
    github: null,
    demo: null,
    image: null,
    featured: true,
    category: "ai",
  },
  {
    id: "linkedin-ai-ranker",
    title: "LinkedIn AI Ranker",
    shortDescription:
      "Analyzes LinkedIn profiles and ranks them for roles using AI.",
    description:
      "A full-stack app that takes LinkedIn profile data, scores completeness, matches it against target roles, and ranks candidates using multiple AI providers.",
    problem:
      "Hiring and profile review are slow and subjective. I wanted a tool that analyzes a profile against a role and explains why it ranks where it does.",
    solution:
      "Built a React + Vite client and a Node/TypeScript server with a provider abstraction supporting OpenAI, Anthropic, and Gemini. Separate modules score completeness, role match, and overall score, each tested with Vitest.",
    technologies: [
      "React",
      "Vite",
      "TypeScript",
      "Node.js",
      "Express",
      "OpenAI",
      "Anthropic",
      "Gemini",
      "Vitest",
    ],
    keyDecisions: [
      "A provider interface keeps AI calls swappable between vendors.",
      "Analysis logic is split into small, tested modules.",
      "Validation runs before any AI call to fail fast on bad input.",
    ],
    github: "https://github.com/Abanoub-5/frontend-capstone",
    demo: null,
    image: null,
    featured: true,
    category: "ai",
  },
  {
    id: "streaming-ai-chat",
    title: "Streaming AI Chat Interface",
    shortDescription:
      "A chat UI that streams responses from Google Gemini.",
    description:
      "An interactive chat interface that streams tokens live from Google Gemini, demonstrating real-time LLM response handling in the browser.",
    problem:
      "Basic AI calls feel slow and disconnected. I wanted to learn how streaming responses work and how to build a chat UI around them.",
    solution:
      "Built a chat interface where the model's reply appears token by token using streaming, wired through a backend route so the API key never reaches the browser.",
    technologies: ["React", "TypeScript", "Google Gemini", "Streaming", "Node.js"],
    keyDecisions: [
      "Streamed responses instead of waiting for the full reply.",
      "Kept the API key server-side.",
    ],
    github: "https://github.com/Abanoub-5/frontend-capstone",
    demo: null,
    image: null,
    featured: true,
    category: "ai",
  },
  {
    id: "accessibility-playground",
    title: "Accessibility Playground",
    shortDescription:
      "A playground exploring accessible UI patterns and best practices.",
    description:
      "A project focused on building accessible interfaces: keyboard navigation, focus management, ARIA, contrast, and responsive layouts.",
    problem:
      "Good engineering means building for everyone. I wanted hands-on practice with accessibility beyond the basics.",
    solution:
      "Created a set of pages demonstrating accessible patterns and the trade-offs behind them, using semantic HTML, ARIA, and keyboard-first interaction.",
    technologies: ["HTML", "CSS", "JavaScript", "TypeScript", "React"],
    keyDecisions: [
      "Prioritized semantic HTML over ARIA where possible.",
      "Tested at multiple viewport sizes for responsiveness.",
    ],
    github: "https://github.com/Abanoub-5/frontend-capstone",
    demo: null,
    image: null,
    featured: false,
    category: "web",
  },
];

export function getProjectById(id: string): Project | undefined {
  return projects.find((project) => project.id === id);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((project) => project.featured);
}
