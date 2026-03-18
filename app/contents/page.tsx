import Link from "next/link";
import { MANIFEST, PARTS } from "@/lib/content/manifest";
import { ThemeToggle } from "@/components/theme-toggle";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Table of Contents — The Builder's Bible",
  description:
    "Full table of contents for The Builder's Bible — 34 chapters across 5 parts.",
};

export default function ContentsPage() {
  return (
    <div className="min-h-screen">
      <nav className="sticky top-0 z-40 backdrop-blur-md bg-[var(--background)]/80 border-b border-[var(--border)]">
        <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link
            href="/"
            className="font-heading font-bold text-sm tracking-tight"
          >
            The Builder&apos;s Bible
          </Link>
          <ThemeToggle />
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="font-heading text-3xl sm:text-4xl font-bold mb-10">
          Table of Contents
        </h1>

        <div className="space-y-10">
          {PARTS.map(({ part, title }) => {
            const chapters = MANIFEST.filter((ch) => ch.part === part);
            return (
              <section key={part}>
                <h2 className="font-heading text-lg font-semibold text-[var(--accent)] mb-4">
                  {title}
                </h2>
                <ul className="space-y-1">
                  {chapters.map((ch) => (
                    <li key={ch.slug}>
                      <Link
                        href={`/chapter/${ch.slug}`}
                        className="flex items-center gap-3 py-2 px-3 -mx-3 rounded-lg text-sm hover:bg-[var(--muted)] transition-colors group"
                      >
                        <span className="w-2 h-2 rounded-full bg-[var(--border)] group-hover:bg-[var(--accent)] transition-colors shrink-0" />
                        <span className="text-[var(--muted-foreground)] font-mono text-xs w-16 shrink-0">
                          {ch.chapterNumber || ch.type}
                        </span>
                        <span className="text-[var(--foreground)]">
                          {ch.title}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      </main>
    </div>
  );
}
