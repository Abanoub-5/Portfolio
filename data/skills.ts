import type { SkillCategory } from "./types";

export const skillCategories: SkillCategory[] = [
  {
    category: "Programming Languages",
    skills: [
      { name: "Python", level: "proficient" },
      { name: "JavaScript / TypeScript", level: "proficient" },
      { name: "C++", level: "working" },
      { name: "Java", level: "working" },
    ],
  },
  {
    category: "Web Frontend",
    skills: [
      { name: "HTML / CSS", level: "proficient" },
      { name: "React", level: "proficient" },
      { name: "Next.js", level: "working" },
      { name: "Tailwind CSS", level: "working" },
      { name: "Vite", level: "working" },
    ],
  },
  {
    category: "Web Backend",
    skills: [
      { name: "Node.js", level: "working" },
      { name: "ASP.NET Core", level: "learning" },
    ],
  },
  {
    category: "AI / Machine Learning",
    skills: [
      { name: "LLM APIs", level: "working" },
      { name: "AI SDK", level: "working" },
      { name: "Prompt Engineering", level: "working" },
      { name: "Tool Calling / Agents", level: "learning" },
      { name: "Zod / Structured Outputs", level: "learning" },
    ],
  },
  {
    category: "Tools & Practices",
    skills: [
      { name: "Git / GitHub", level: "proficient" },
      { name: "Testing (Vitest)", level: "working" },
      { name: "Vercel Deployment", level: "learning" },
    ],
  },
];

export function getSkillCategories(): SkillCategory[] {
  return skillCategories;
}
