import type { Metadata } from "next";
import { profile } from "@/data/profile";
import { Button } from "@/components/Button";

export const metadata: Metadata = {
  title: "Contact — Abanoub Malak",
  description:
    "Get in touch with Abanoub Malak via GitHub, LinkedIn, or email.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6">
      <div className="mb-12">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-accent-strong dark:text-accent">
          Contact
        </p>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Let&apos;s connect
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
          I&apos;m always open to opportunities, collaborations, or a good
          conversation about software and AI.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        <a
          href={profile.github}
          target="_blank"
          rel="noopener noreferrer"
          className="group rounded-xl border border-zinc-200 p-6 transition-shadow hover:shadow-lg dark:border-zinc-800"
        >
          <h2 className="text-lg font-semibold tracking-tight">GitHub</h2>
          <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
            Code, projects, and experiments.
          </p>
          <p className="mt-3 text-sm font-medium text-accent-strong group-hover:underline dark:text-accent">
            github.com/Abanoub-5 →
          </p>
        </a>

        <a
          href={profile.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="group rounded-xl border border-zinc-200 p-6 transition-shadow hover:shadow-lg dark:border-zinc-800"
        >
          <h2 className="text-lg font-semibold tracking-tight">LinkedIn</h2>
          <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
            Professional profile and background.
          </p>
          <p className="mt-3 text-sm font-medium text-accent-strong group-hover:underline dark:text-accent">
            Connect on LinkedIn →
          </p>
        </a>

        <a
          href={`mailto:${profile.email}`}
          className="group rounded-xl border border-zinc-200 p-6 transition-shadow hover:shadow-lg dark:border-zinc-800"
        >
          <h2 className="text-lg font-semibold tracking-tight">Email</h2>
          <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
            For direct inquiries.
          </p>
          <p className="mt-3 text-sm font-medium text-accent-strong group-hover:underline dark:text-accent">
            Send an email →
          </p>
        </a>
      </div>

      <div className="mt-12 rounded-xl border border-zinc-200 bg-zinc-50 p-8 text-center dark:border-zinc-800 dark:bg-zinc-900/50">
        <h2 className="text-xl font-semibold tracking-tight">
          Want to know more?
        </h2>
        <p className="mx-auto mt-2 max-w-lg text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
          Ask my personal AI agent — it answers questions about my projects,
          skills, and experience from my structured portfolio data.
        </p>
        <div className="mt-5">
          <Button href="/agent">Talk to my AI agent</Button>
        </div>
      </div>
    </div>
  );
}