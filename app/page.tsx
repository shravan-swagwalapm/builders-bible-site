import Link from "next/link";
import {
  Book,
  Download,
  Compass,
  Briefcase,
  Hammer,
  ArrowRight,
} from "lucide-react";
import { MANIFEST, PARTS } from "@/lib/content/manifest";
import { ThemeToggle } from "@/components/theme-toggle";

const READER_PATHS = [
  {
    icon: Compass,
    title: "Curious Explorer",
    description:
      "You want to understand how tech works. Start from Chapter 1 and go linearly.",
    cta: "Start from the beginning",
    href: "/chapter/ch-01-internet",
  },
  {
    icon: Briefcase,
    title: "Career Changer",
    description:
      "You're in PM, marketing, or business and want to build. Jump to Part II.",
    cta: "Jump to AI fundamentals",
    href: "/chapter/ch-09-ai-history",
  },
  {
    icon: Hammer,
    title: "Builder",
    description:
      "You know the basics and want to ship. Go straight to the projects.",
    cta: "Start building",
    href: "/chapter/project-01",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md bg-[var(--background)]/80 border-b border-[var(--border)]">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link
            href="/"
            className="font-heading font-bold text-sm tracking-tight"
          >
            The Builder&apos;s Bible
          </Link>
          <div className="flex items-center gap-2">
            <Link
              href="/contents"
              className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors px-3 py-1.5"
            >
              Contents
            </Link>
            <Link
              href="/projects"
              className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors px-3 py-1.5"
            >
              Projects
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h1 className="font-heading text-5xl sm:text-7xl font-bold tracking-tight leading-[1.1]">
            The Builder&apos;s
            <br />
            <span className="text-[var(--accent)]">Bible</span>
          </h1>
          <p className="text-lg sm:text-xl text-[var(--muted-foreground)] leading-relaxed max-w-xl mx-auto">
            From zero to shipping AI-powered products. Everything you need to
            understand software, AI, and how to build real things.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1 text-sm text-[var(--muted-foreground)]">
            <span>34 Chapters</span>
            <span className="hidden sm:inline">&middot;</span>
            <span>700+ Pages</span>
            <span className="hidden sm:inline">&middot;</span>
            <span>4 Projects</span>
            <span className="hidden sm:inline">&middot;</span>
            <span className="text-[var(--accent)] font-medium">
              Free & Open Source
            </span>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
            <Link
              href="/chapter/foreword"
              className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-lg bg-[var(--accent)] text-[var(--accent-foreground)] font-medium transition-all hover:brightness-110 active:scale-[0.98]"
            >
              <Book className="w-5 h-5" />
              Start Reading
            </Link>
            <a
              href="#"
              className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-lg border border-[var(--border)] text-[var(--foreground)] font-medium transition-all hover:bg-[var(--muted)] active:scale-[0.98]"
            >
              <Download className="w-5 h-5" />
              Download PDF
            </a>
          </div>
        </div>
      </section>

      {/* Reader paths */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-2xl font-semibold text-center mb-10">
            Choose Your Path
          </h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {READER_PATHS.map((path) => (
              <Link
                key={path.title}
                href={path.href}
                className="group flex flex-col p-6 rounded-xl border border-[var(--border)] hover:border-[var(--accent)]/40 transition-all hover:shadow-[var(--glow-accent)]"
              >
                <path.icon className="w-8 h-8 text-[var(--accent)] mb-4" />
                <h3 className="font-heading font-semibold text-lg mb-2">
                  {path.title}
                </h3>
                <p className="text-sm text-[var(--muted-foreground)] flex-1 leading-relaxed">
                  {path.description}
                </p>
                <span className="mt-4 text-sm text-[var(--accent)] font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                  {path.cta}
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="py-16 px-6 bg-[var(--elevation-1)]">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-2xl font-semibold text-center mb-10">
            What&apos;s Inside
          </h2>
          <div className="space-y-6">
            {PARTS.map(({ part, title }) => {
              const chapters = MANIFEST.filter(
                (ch) => ch.part === part && ch.type !== "part-intro"
              );
              return (
                <div
                  key={part}
                  className="p-6 rounded-xl border border-[var(--border)] bg-[var(--card)]"
                >
                  <h3 className="font-heading font-semibold text-lg mb-3">
                    {title}
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-x-8 gap-y-1">
                    {chapters.map((ch) => (
                      <Link
                        key={ch.slug}
                        href={`/chapter/${ch.slug}`}
                        className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors py-1"
                      >
                        {ch.chapterNumber ? `${ch.chapterNumber}: ` : ""}
                        {ch.title}
                      </Link>
                    ))}
                  </div>
                  <div className="mt-2 text-xs text-[var(--muted-foreground)]">
                    {chapters.length} chapters
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-[var(--border)]">
        <div className="max-w-4xl mx-auto text-center text-sm text-[var(--muted-foreground)]">
          <p>
            Written by Shravan Tickoo with Claude. Free & open source.
          </p>
        </div>
      </footer>
    </div>
  );
}
