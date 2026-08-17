import Link from "next/link";
import { profile } from "@/data/profile";
import { getFeaturedProjects } from "@/data/projects";
import { getSkillCategories } from "@/data/skills";
import { ProjectCard } from "@/components/ProjectCard";
import { Button } from "@/components/Button";

export default function Home() {
  const featured = getFeaturedProjects();
  const skillCategories = getSkillCategories();

  return (
    <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
      <section className="flex min-h-[60vh] flex-col justify-center py-16 sm:py-24">
        <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-accent-strong dark:text-accent">
          {profile.title}
        </p>
        <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
          {profile.name}
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-zinc-600 sm:text-xl dark:text-zinc-300">
          {profile.positioning}
        </p>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-500 dark:text-zinc-400">
          {profile.intro}
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Button href="/projects">View projects</Button>
          <Button href="/agent" variant="secondary">
            Talk to my AI agent
          </Button>
        </div>
      </section>

      <section className="py-12 sm:py-16" id="featured-projects">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Featured projects
            </h2>
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
              Real work, built to prove concepts — including the AI agent on
              this very site.
            </p>
          </div>
          <Link
            href="/projects"
            className="shrink-0 text-sm font-medium text-accent-strong hover:underline dark:text-accent"
          >
            All projects →
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      <section className="py-12 sm:py-16" id="skills">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Skills
            </h2>
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
              Languages, web, and AI — grouped by category and current level.
            </p>
          </div>
          <Link
            href="/about"
            className="shrink-0 text-sm font-medium text-accent-strong hover:underline dark:text-accent"
          >
            More about me →
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          {skillCategories.slice(0, 4).map((category) => (
            <div
              key={category.category}
              className="rounded-xl border border-zinc-200 p-6 dark:border-zinc-800"
            >
              <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                {category.category}
              </h3>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {category.skills.map((skill) => (
                  <span
                    key={skill.name}
                    className="rounded-md bg-zinc-100 px-2 py-1 font-mono text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}