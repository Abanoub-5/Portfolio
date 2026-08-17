import type { Metadata } from "next";
import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/ProjectCard";

export const metadata: Metadata = {
  title: "Projects — Abanoub Malak",
  description:
    "Projects built by Abanoub Malak: AI tools, full-stack apps, and learning experiments.",
};

export default function ProjectsPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6">
      <div className="mb-12">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-accent-strong dark:text-accent">
          Portfolio
        </p>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Projects
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
          A growing collection of real projects. Each one is documented with
          the problem, the solution, and the key technical decisions behind it.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}