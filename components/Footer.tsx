import Link from "next/link";
import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-between gap-3 px-4 py-6 text-sm text-zinc-500 sm:flex-row sm:px-6 dark:text-zinc-400">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <div className="flex items-center gap-4">
          <Link
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent-strong dark:hover:text-white"
          >
            GitHub
          </Link>
          <Link
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent-strong dark:hover:text-white"
          >
            LinkedIn
          </Link>
          <Link href="/agent" className="hover:text-accent-strong dark:hover:text-white">
            Talk to my AI
          </Link>
        </div>
      </div>
    </footer>
  );
}