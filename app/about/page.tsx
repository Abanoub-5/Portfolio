import type { Metadata } from "next";
import { profile } from "@/data/profile";
import { getExperience } from "@/data/experience";
import { getSkillCategories } from "@/data/skills";
import { SkillGroup } from "@/components/SkillGroup";

export const metadata: Metadata = {
  title: "About — Abanoub Malak",
  description:
    "About Abanoub Malak: education, technical background, AI interests, and current learning focus.",
};

export default function AboutPage() {
  const experience = getExperience();
  const skillCategories = getSkillCategories();

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6">
      <div className="mb-12">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-accent-strong dark:text-accent">
          About
        </p>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          From student to engineer
        </h1>
      </div>

      <section className="grid gap-10 md:grid-cols-2">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">
            The short story
          </h2>
          <p className="mt-3 leading-relaxed text-zinc-600 dark:text-zinc-300">
            I&apos;m {profile.name}, a {profile.title.toLowerCase()} based in{" "}
            {profile.location}. I got into programming through the classic
            languages — Python, C++, Java — then moved into web development with
            React and TypeScript, and now I&apos;m focused on the AI stack.
          </p>
          <p className="mt-3 leading-relaxed text-zinc-600 dark:text-zinc-300">
            What drives me is building things that work end to end: an idea,
            an API, a UI, a deployed product. AI has become the natural next
            step, because it makes software genuinely useful.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold tracking-tight">
            Interests &amp; focus
          </h2>
          <ul className="mt-3 space-y-2 text-zinc-600 dark:text-zinc-300">
            <li className="flex items-start gap-3">
              <span className="mt-0.5 text-accent-strong dark:text-accent">
                →
              </span>
              <span className="leading-relaxed">
                Building AI applications, not just calling APIs
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5 text-accent-strong dark:text-accent">
                →
              </span>
              <span className="leading-relaxed">
                Tool calling, agents, and structured outputs
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5 text-accent-strong dark:text-accent">
                →
              </span>
              <span className="leading-relaxed">
                Clean, maintainable, well-tested code
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5 text-accent-strong dark:text-accent">
                →
              </span>
              <span className="leading-relaxed">
                Learning in public through shipped projects
              </span>
            </li>
          </ul>
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-bold tracking-tight">Experience</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {experience.map((item) => (
            <div
              key={item.id}
              className="rounded-xl border border-zinc-200 p-6 dark:border-zinc-800"
            >
              <span className="rounded-full bg-accent-soft px-2.5 py-0.5 text-xs font-medium capitalize text-accent-strong dark:bg-zinc-800 dark:text-accent">
                {item.type}
              </span>
              <h3 className="mt-3 text-lg font-semibold tracking-tight">
                {item.title}
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                {item.organization} · {item.period}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                {item.description}
              </p>
              <ul className="mt-3 space-y-1.5">
                {item.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-300"
                  >
                    <span className="mt-0.5 text-accent-strong dark:text-accent">
                      →
                    </span>
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-bold tracking-tight">Skills</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category) => (
            <SkillGroup key={category.category} category={category} />
          ))}
        </div>
      </section>
    </div>
  );
}