import { describe, expect, it } from "vitest";
import {
  searchPortfolio,
  getProjectDetails,
  getProfileInfo,
} from "@/lib/portfolio/search";
import { projects } from "@/data/projects";

describe("searchPortfolio", () => {
  it("returns relevant results for a project query", () => {
    const results = searchPortfolio("linkedin");
    expect(results.length).toBeGreaterThan(0);
    expect(results.some((r) => r.type === "project")).toBe(true);
  });

  it("matches skills by name", () => {
    const results = searchPortfolio("React");
    expect(results.some((r) => r.type === "skill" && r.title === "React")).toBe(
      true,
    );
  });

  it("matches technologies in project haystacks", () => {
    const results = searchPortfolio("Next.js");
    expect(results.some((r) => r.type === "project")).toBe(true);
  });

  it("matches AI concepts", () => {
    const results = searchPortfolio("tool calling");
    expect(results.some((r) => r.type === "concept")).toBe(true);
  });

  it("returns empty array for empty or short queries", () => {
    expect(searchPortfolio("")).toEqual([]);
    expect(searchPortfolio("a")).toEqual([]);
  });

  it("respects the limit", () => {
    const results = searchPortfolio("ai", 3);
    expect(results.length).toBeLessThanOrEqual(3);
  });

  it("sorts by relevance (best match first)", () => {
    const results = searchPortfolio("project");
    for (let i = 1; i < results.length; i++) {
      expect(results[i - 1].score).toBeGreaterThanOrEqual(results[i].score);
    }
  });
});

describe("getProjectDetails", () => {
  it("returns a project by id", () => {
    const project = getProjectDetails("linkedin-ai-ranker");
    expect(project).toBeDefined();
    expect(project?.title).toBe("LinkedIn AI Ranker");
  });

  it("returns undefined for an unknown id", () => {
    expect(getProjectDetails("does-not-exist")).toBeUndefined();
  });

  it("every project in data resolves", () => {
    for (const project of projects) {
      expect(getProjectDetails(project.id)).toBeDefined();
    }
  });
});

describe("getProfileInfo", () => {
  it("returns profile basics", () => {
    const info = getProfileInfo();
    expect(info.name).toBeTruthy();
    expect(info.positioning).toBeTruthy();
  });
});