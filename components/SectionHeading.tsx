export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-10">
      {eyebrow && (
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-accent-strong dark:text-accent">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      {description && (
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
          {description}
        </p>
      )}
    </div>
  );
}