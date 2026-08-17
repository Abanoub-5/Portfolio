import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, getProjectById } from "@/data/projects";

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return projects.map((project) => ({ id: project.id }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { id } = await params;
  const project = getProjectById(id);
  if (!project) return { title: "Project not found" };
  return {
    title: `${project.title} — Abanoub Malak`,
    description: project.shortDescription,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;
  const project = getProjectById(id);
  if (!project) notFound();

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6">
      <Link
        href="/projects"
        className="text-sm font-medium text-zinc-500 hover:text-accent-strong hover:underline dark:text-zinc-400 dark:hover:text-white"
      >
        ← All projects
      </Link>

      <div className="mt-6">
        <span className="rounded-full bg-accent-soft px-2.5 py-0.5 text-xs font-medium capitalize text-accent-strong dark:bg-zinc-800 dark:text-accent">
          {project.category}
        </span>
        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
          {project.title}
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-300">
          {project.description}
        </p>
      </div>

      {project.github || project.demo ? (
        <div className="mt-6 flex flex-wrap gap-3">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-strong"
            >
              View on GitHub
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-zinc-300 px-5 py-2.5 text-sm font-medium transition-colors hover:border-accent dark:border-zinc-700"
            >
              Live demo
            </a>
          )}
        </div>
      ) : (
        <p className="mt-6 text-sm text-zinc-500 dark:text-zinc-400">
          Links coming soon.
        </p>
      )}

      <div className="mt-12 grid gap-8 md:grid-cols-2">
        <section>
          <h2 className="text-xl font-semibold tracking-tight">Problem</h2>
          <p className="mt-3 leading-relaxed text-zinc-600 dark:text-zinc-300">
            {project.problem}
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold tracking-tight">Solution</h2>
          <p className="mt-3 leading-relaxed text-zinc-600 dark:text-zinc-300">
            {project.solution}
          </p>
        </section>
      </div>

      <section className="mt-12">
        <h2 className="text-xl font-semibold tracking-tight">Technologies</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="rounded-md bg-zinc-100 px-2.5 py-1 font-mono text-sm text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
            >
              {tech}
            </span>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold tracking-tight">
          Key technical decisions
        </h2>
        <ul className="mt-4 space-y-2">
          {project.keyDecisions.map((decision) => (
            <li
              key={decision}
              className="flex items-start gap-3 text-zinc-600 dark:text-zinc-300"
            >
              <span className="mt-0.5 text-accent-strong dark:text-accent">
                →
              </span>
              <span className="leading-relaxed">{decision}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}