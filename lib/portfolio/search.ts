import { getProjectById, projects } from "@/data/projects";
import { skillCategories } from "@/data/skills";
import { experience } from "@/data/experience";
import { aiConcepts, aiStack } from "@/data/learning";
import { profile } from "@/data/profile";

export interface SearchResult {
  type: "project" | "skill" | "experience" | "concept" | "profile";
  id: string;
  title: string;
  snippet: string;
  score: number;
}

function normalize(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9\s]/g, " ").trim();
}

function words(query: string): string[] {
  return normalize(query)
    .split(/\s+/)
    .filter((word) => word.length > 1);
}

function tokenMatches(
  queryTokens: string[],
  target: string,
): number {
  const normalized = normalize(target);
  return queryTokens.reduce(
    (count, token) => (normalized.includes(token) ? count + 1 : count),
    0,
  );
}

function buildSearchPool(): SearchResult[] {
  const pool: SearchResult[] = [];

  for (const project of projects) {
    const haystack = [
      project.title,
      project.shortDescription,
      project.description,
      project.problem,
      project.solution,
      ...project.technologies,
      ...project.keyDecisions,
    ].join(" ");
    pool.push({
      type: "project",
      id: project.id,
      title: project.title,
      snippet: project.shortDescription,
      score: 0,
    });
    (pool[pool.length - 1] as unknown as { haystack: string }).haystack =
      haystack;
  }

  for (const category of skillCategories) {
    for (const skill of category.skills) {
      const entry: SearchResult & { haystack?: string } = {
        type: "skill",
        id: skill.name,
        title: skill.name,
        snippet: `${skill.name} (${category.category})`,
        score: 0,
      };
      entry.haystack = `${skill.name} ${category.category} ${skill.level}`;
      pool.push(entry);
    }
  }

  for (const item of experience) {
    const haystack = [
      item.title,
      item.organization,
      item.description,
      ...item.highlights,
    ].join(" ");
    pool.push({
      type: "experience",
      id: item.id,
      title: item.title,
      snippet: item.description,
      score: 0,
    });
    (pool[pool.length - 1] as unknown as { haystack: string }).haystack =
      haystack;
  }

  for (const concept of aiConcepts) {
    const haystack = [
      concept.title,
      concept.description,
      ...concept.tags,
    ].join(" ");
    pool.push({
      type: "concept",
      id: concept.title,
      title: concept.title,
      snippet: concept.description,
      score: 0,
    });
    (pool[pool.length - 1] as unknown as { haystack: string }).haystack =
      haystack;
  }

  for (const stack of aiStack) {
    for (const item of stack.items) {
      pool.push({
        type: "concept",
        id: item,
        title: item,
        snippet: `${item} (${stack.category})`,
        score: 0,
      });
      (pool[pool.length - 1] as unknown as { haystack: string }).haystack =
        `${item} ${stack.category}`;
    }
  }

  return pool;
}

const searchPool = buildSearchPool();

export function searchPortfolio(query: string, limit = 8): SearchResult[] {
  const tokens = words(query);
  if (tokens.length === 0) return [];

  const ranked = searchPool
    .map((entry) => {
      const haystack = (entry as unknown as { haystack?: string }).haystack;
      const score = tokenMatches(tokens, haystack ?? entry.title);
      return { ...entry, score };
    })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title));

  return ranked.slice(0, limit);
}

export function getProjectDetails(id: string) {
  return getProjectById(id);
}

export function getProfileInfo() {
  return {
    name: profile.name,
    title: profile.title,
    positioning: profile.positioning,
    intro: profile.intro,
    location: profile.location,
  };
}
