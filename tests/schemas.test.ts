import { describe, expect, it } from "vitest";
import {
  searchPortfolioSchema,
  getProjectSchema,
  getSkillsSchema,
  getExperienceSchema,
} from "@/lib/ai/schemas";

describe("searchPortfolioSchema", () => {
  it("accepts a valid query", () => {
    const result = searchPortfolioSchema.safeParse({ query: "React projects" });
    expect(result.success).toBe(true);
  });

  it("accepts an optional limit", () => {
    const result = searchPortfolioSchema.safeParse({ query: "ai", limit: 5 });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.limit).toBe(5);
  });

  it("applies the default limit", () => {
    const result = searchPortfolioSchema.safeParse({ query: "ai" });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.limit).toBe(8);
  });

  it("rejects a query that is too short", () => {
    const result = searchPortfolioSchema.safeParse({ query: "a" });
    expect(result.success).toBe(false);
  });

  it("rejects a query that is too long", () => {
    const result = searchPortfolioSchema.safeParse({
      query: "x".repeat(201),
    });
    expect(result.success).toBe(false);
  });

  it("rejects non-string queries", () => {
    const result = searchPortfolioSchema.safeParse({ query: 123 });
    expect(result.success).toBe(false);
  });

  it("rejects an out-of-range limit", () => {
    const result = searchPortfolioSchema.safeParse({ query: "ai", limit: 0 });
    expect(result.success).toBe(false);
    const tooBig = searchPortfolioSchema.safeParse({ query: "ai", limit: 100 });
    expect(tooBig.success).toBe(false);
  });
});

describe("getProjectSchema", () => {
  it("accepts a valid id", () => {
    const result = getProjectSchema.safeParse({ id: "linkedin-ai-ranker" });
    expect(result.success).toBe(true);
  });

  it("rejects an empty id", () => {
    const result = getProjectSchema.safeParse({ id: "" });
    expect(result.success).toBe(false);
  });

  it("rejects a missing id", () => {
    const result = getProjectSchema.safeParse({});
    expect(result.success).toBe(false);
  });
});

describe("getSkillsSchema", () => {
  it("accepts no input", () => {
    const result = getSkillsSchema.safeParse({});
    expect(result.success).toBe(true);
  });

  it("accepts a category filter", () => {
    const result = getSkillsSchema.safeParse({ category: "AI / Machine Learning" });
    expect(result.success).toBe(true);
  });

  it("rejects a non-string category", () => {
    const result = getSkillsSchema.safeParse({ category: 42 });
    expect(result.success).toBe(false);
  });
});

describe("getExperienceSchema", () => {
  it("accepts no input", () => {
    const result = getExperienceSchema.safeParse({});
    expect(result.success).toBe(true);
  });

  it("accepts a valid type", () => {
    const result = getExperienceSchema.safeParse({ type: "education" });
    expect(result.success).toBe(true);
  });

  it("rejects an invalid type", () => {
    const result = getExperienceSchema.safeParse({ type: "job" });
    expect(result.success).toBe(false);
  });
});