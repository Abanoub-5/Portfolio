import { describe, expect, it } from "vitest";
import { portfolioTools } from "@/lib/ai/tools";

type SearchResult = {
  query: string;
  count: number;
  results: { type: string; id: string; title: string; snippet: string }[];
};

type ProjectResult =
  | { found: true; project: { title: string; technologies: string[]; keyDecisions: string[] } }
  | { found: false; message: string };

type SkillsResult = {
  count: number;
  categories: { category: string; skills: string[] }[];
};

type ExperienceResult = {
  count: number;
  items: {
    type: string;
    title: string;
    organization: string;
    period: string;
    description: string;
    highlights: string[];
  }[];
};

describe("portfolio tools", () => {
  it("searchPortfolio returns structured results", async () => {
    const raw = await portfolioTools.searchPortfolio.execute(
      { query: "projects", limit: 5 },
      { toolCallId: "1" } as never,
    );
    const result = raw as SearchResult;
    expect(result.count).toBeGreaterThan(0);
    expect(result.results[0]).toHaveProperty("title");
    expect(result.results[0]).toHaveProperty("snippet");
  });

  it("searchPortfolio returns no results for nonsense query", async () => {
    const raw = await portfolioTools.searchPortfolio.execute(
      { query: "zzzznotarealwordzzz", limit: 5 },
      { toolCallId: "1" } as never,
    );
    const result = raw as SearchResult;
    expect(result.count).toBe(0);
    expect(result.results).toEqual([]);
  });

  it("getProject returns full details for a known project", async () => {
    const raw = await portfolioTools.getProject.execute(
      { id: "linkedin-ai-ranker" },
      { toolCallId: "1" } as never,
    );
    const result = raw as ProjectResult;
    expect(result.found).toBe(true);
    if (result.found) {
      expect(result.project.title).toBe("LinkedIn AI Ranker");
      expect(result.project.technologies.length).toBeGreaterThan(0);
      expect(result.project.keyDecisions.length).toBeGreaterThan(0);
    }
  });

  it("getProject reports not found gracefully", async () => {
    const raw = await portfolioTools.getProject.execute(
      { id: "nope" },
      { toolCallId: "1" } as never,
    );
    const result = raw as ProjectResult;
    expect(result.found).toBe(false);
    if (!result.found) expect(result.message).toContain("nope");
  });

  it("getSkills returns grouped skills", async () => {
    const raw = await portfolioTools.getSkills.execute(
      {},
      { toolCallId: "1" } as never,
    );
    const result = raw as SkillsResult;
    expect(result.count).toBeGreaterThan(1);
    const categories = result.categories.map((c) => c.category);
    expect(categories).toContain("AI / Machine Learning");
  });

  it("getSkills filters by category", async () => {
    const raw = await portfolioTools.getSkills.execute(
      { category: "Programming Languages" },
      { toolCallId: "1" } as never,
    );
    const result = raw as SkillsResult;
    expect(result.categories.length).toBe(1);
    expect(result.categories[0].category).toBe("Programming Languages");
  });

  it("getExperience returns items, optionally filtered", async () => {
    const allRaw = await portfolioTools.getExperience.execute(
      {},
      { toolCallId: "1" } as never,
    );
    const all = allRaw as ExperienceResult;
    expect(all.count).toBeGreaterThan(0);

    const educationRaw = await portfolioTools.getExperience.execute(
      { type: "education" },
      { toolCallId: "1" } as never,
    );
    const education = educationRaw as ExperienceResult;
    expect(education.items.length).toBeGreaterThan(0);
    for (const item of education.items) {
      expect(item.type).toBe("education");
    }
  });

  it("getProfile returns profile info", async () => {
    const raw = await portfolioTools.getProfile.execute(
      {},
      { toolCallId: "1" } as never,
    );
    const result = raw as { name: string; aiLearning: string[] };
    expect(result.name).toBeTruthy();
    expect(result.aiLearning.length).toBeGreaterThan(0);
  });
});