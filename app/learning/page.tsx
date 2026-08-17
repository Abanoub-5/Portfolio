import type { Metadata } from "next";
import {
  getAiConcepts,
  getAiStack,
  getCertifications,
  getAiWriteups,
} from "@/data/learning";

export const metadata: Metadata = {
  title: "AI / Learning — Abanoub Malak",
  description:
    "Abanoub Malak's AI projects, AI stack, concepts he is learning, and write-ups.",
};

export default function LearningPage() {
  const concepts = getAiConcepts();
  const stack = getAiStack();
  const certifications = getCertifications();
  const writeups = getAiWriteups();

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6">
      <div className="mb-12">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-accent-strong dark:text-accent">
          AI / Learning
        </p>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          The AI journey
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
          The AI stack I&apos;m learning by doing — and the concepts I apply in
          every project I build.
        </p>
      </div>

      <section className="grid gap-10 md:grid-cols-2">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">
            Concepts I&apos;m learning
          </h2>
          <ul className="mt-4 space-y-3">
            {concepts.map((concept) => (
              <li
                key={concept.title}
                className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800"
              >
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-sm font-semibold">{concept.title}</h3>
                  <span className="shrink-0 rounded-full bg-zinc-100 px-2 py-0.5 text-xs capitalize text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
                    {concept.status}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                  {concept.description}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-10">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">AI stack</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {stack.map((group) => (
                <div
                  key={group.category}
                  className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800"
                >
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                    {group.category}
                  </h3>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-md bg-zinc-100 px-2 py-0.5 font-mono text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold tracking-tight">
              Courses &amp; programs
            </h2>
            <ul className="mt-4 space-y-3">
              {certifications.map((cert) => (
                <li
                  key={cert.title}
                  className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800"
                >
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-sm font-semibold">{cert.title}</h3>
                    <span className="shrink-0 text-xs text-zinc-500 dark:text-zinc-400">
                      {cert.year}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                    {cert.issuer}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold tracking-tight">
              Short write-ups
            </h2>
            <ul className="mt-4 space-y-3">
              {writeups.map((writeup) => (
                <li
                  key={writeup.title}
                  className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800"
                >
                  <h3 className="text-sm font-semibold">{writeup.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                    {writeup.summary}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {writeup.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md bg-zinc-100 px-2 py-0.5 font-mono text-xs text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}