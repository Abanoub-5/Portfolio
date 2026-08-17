import { describe, expect, it } from "vitest";
import { getSkillCategories } from "@/data/skills";
import { getExperience } from "@/data/experience";

describe("getSkillCategories", () => {
  it("returns multiple categories", () => {
    const categories = getSkillCategories();
    expect(categories.length).toBeGreaterThan(1);
  });

  it("every category has at least one skill", () => {
    for (const category of getSkillCategories()) {
      expect(category.skills.length).toBeGreaterThan(0);
    }
  });
});

describe("getExperience", () => {
  it("returns experience items", () => {
    const items = getExperience();
    expect(items.length).toBeGreaterThan(0);
  });

  it("items have valid types", () => {
    for (const item of getExperience()) {
      expect(["education", "internship", "program"]).toContain(item.type);
    }
  });
});