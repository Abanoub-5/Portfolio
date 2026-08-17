import { z } from "zod";

export const searchPortfolioSchema = z.object({
  query: z
    .string()
    .min(2, "Query must be at least 2 characters")
    .max(200, "Query must be at most 200 characters")
    .describe(
      "The search terms describing what the visitor wants to know about the portfolio, e.g. 'projects', 'React', 'AI experience'.",
    ),
  limit: z
    .number()
    .int()
    .min(1)
    .max(20)
    .default(8)
    .describe("Maximum number of results to return."),
});

export const getProjectSchema = z.object({
  id: z
    .string()
    .min(1)
    .max(100)
    .describe("The unique slug identifier of the project, e.g. 'linkedin-ai-ranker'."),
});

export const getSkillsSchema = z.object({
  category: z
    .string()
    .optional()
    .describe(
      "Optional filter to a single skill category, e.g. 'Programming Languages', 'AI / Machine Learning', or 'Web Frontend'.",
    ),
});

export const getExperienceSchema = z.object({
  type: z
    .enum(["education", "internship", "program"])
    .optional()
    .describe(
      "Optional filter: 'education', 'internship', or 'program' (e.g. learning programs).",
    ),
});
