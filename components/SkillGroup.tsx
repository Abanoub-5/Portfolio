import type { SkillCategory } from "@/data/types";

const levelLabel: Record<SkillCategory["skills"][number]["level"], string> = {
  learning: "Learning",
  working: "Working",
  proficient: "Proficient",
};

export function SkillGroup({ category }: { category: SkillCategory }) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-background p-6 dark:border-zinc-800">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
        {category.category}
      </h3>
      <ul className="mt-4 space-y-3">
        {category.skills.map((skill) => (
          <li key={skill.name} className="flex items-center justify-between gap-3">
            <span className="text-sm font-medium">{skill.name}</span>
            <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
              {levelLabel[skill.level]}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}