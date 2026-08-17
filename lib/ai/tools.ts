import { z } from "zod";
import { tool } from "ai";
import {
  searchPortfolio,
  getProjectDetails,
  getProfileInfo,
} from "@/lib/portfolio/search";
import { getSkillCategories } from "@/data/skills";
import { getExperience } from "@/data/experience";
import { getAiConcepts } from "@/data/learning";
import { projects } from "@/data/projects";
import {
  searchPortfolioSchema,
  getProjectSchema,
  getSkillsSchema,
  getExperienceSchema,
} from "@/lib/ai/schemas";

export const portfolioTools = {
  searchPortfolio: tool({
    description:
      "Search the portfolio for relevant information about projects, skills, experience, and AI learning. Use this as the primary tool for most questions.",
    inputSchema: searchPortfolioSchema,
    execute: async ({ query, limit }) => {
      const results = searchPortfolio(query, limit);
      return {
        query,
        count: results.length,
        results: results.map((result) => ({
          type: result.type,
          id: result.id,
          title: result.title,
          snippet: result.snippet,
        })),
      };
    },
  }),

  getProject: tool({
    description:
      "Return full details about a single project by its id. Use when the visitor asks about a specific project.",
    inputSchema: getProjectSchema,
    execute: async ({ id }) => {
      const project = getProjectDetails(id);
      if (!project) {
        return {
          found: false,
          message: `No project with id "${id}" was found. Available projects: ${projects
            .map((p) => p.id)
            .join(", ")}.`,
        };
      }
      return {
        found: true,
        project: {
          id: project.id,
          title: project.title,
          shortDescription: project.shortDescription,
          description: project.description,
          problem: project.problem,
          solution: project.solution,
          technologies: project.technologies,
          keyDecisions: project.keyDecisions,
          github: project.github,
          demo: project.demo,
        },
      };
    },
  }),

  getSkills: tool({
    description:
      "Return Abanoub's technical skills grouped by category. Optionally filter to one category.",
    inputSchema: getSkillsSchema,
    execute: async ({ category }) => {
      const categories = getSkillCategories();
      const filtered = category
        ? categories.filter(
            (c) =>
              c.category.toLowerCase().includes(category.toLowerCase()) ||
              category.toLowerCase().includes(c.category.toLowerCase()),
          )
        : categories;
      return {
        count: filtered.length,
        categories: filtered.map((c) => ({
          category: c.category,
          skills: c.skills.map((skill) => skill.name),
        })),
      };
    },
  }),

  getExperience: tool({
    description:
      "Return Abanoub's education and program experience. Optionally filter by type: 'education', 'internship', or 'program'.",
    inputSchema: getExperienceSchema,
    execute: async ({ type }) => {
      const items = getExperience();
      const filtered = type ? items.filter((item) => item.type === type) : items;
      return {
        count: filtered.length,
        items: filtered.map((item) => ({
          type: item.type,
          title: item.title,
          organization: item.organization,
          period: item.period,
          description: item.description,
          highlights: item.highlights,
        })),
      };
    },
  }),

  getProfile: tool({
    description:
      "Return Abanoub's basic profile information: name, current focus, and short introduction.",
    inputSchema: z.object({}).describe("No input required."),
    execute: async () => {
      return {
        ...getProfileInfo(),
        aiLearning: getAiConcepts().map((c) => c.title),
      };
    },
  }),
};

export type PortfolioToolName = keyof typeof portfolioTools;
