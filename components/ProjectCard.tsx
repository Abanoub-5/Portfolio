import Link from "next/link";
import type { Project } from "@/data/types";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="flex h-full flex-col rounded-xl border border-zinc-200 bg-background p-6 transition-shadow hover:shadow-lg dark:border-zinc-800">
      <div className="mb-2 flex items-center justify-between gap-2">
        <span className="rounded-full bg-accent-soft px-2.5 py-0.5 text-xs font-medium capitalize text-accent-strong dark:bg-zinc-800 dark:text-accent">
          {project.category}
        </span>
        {project.featured && (
          <span className="text-xs font-medium text-zinc-400">Featured</span>
        )}
      </div>

      <h3 className="text-lg font-semibold tracking-tight">{project.title}</h3>
      <p className="mt-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
        {project.shortDescription}
      </p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.technologies.slice(0, 5).map((tech) => (
          <span
            key={tech}
            className="rounded-md bg-zinc-100 px-2 py-0.5 font-mono text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="mt-auto flex items-center gap-4 pt-5">
        <Link
          href={`/projects/${project.id}`}
          className="text-sm font-medium text-accent-strong hover:underline dark:text-accent"
        >
          View details →
        </Link>
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-zinc-500 hover:text-accent-strong hover:underline dark:hover:text-white"
          >
            GitHub
          </a>
        )}
      </div>
    </article>
  );
}