import Link from "next/link";
import {
  Book,
  Download,
  Compass,
  Briefcase,
  Hammer,
  ArrowRight,
  Star,
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
    accent: "oklch(0.72 0.15 175)", // teal
  },
  {
    icon: Briefcase,
    title: "Career Changer",
    description:
      "You're in PM, marketing, or business and want to build. Jump to Part II.",
    cta: "Jump to AI fundamentals",
    href: "/chapter/ch-09-ai-history",
    accent: "oklch(0.68 0.15 250)", // blue
  },
  {
    icon: Hammer,
    title: "Builder",
    description:
      "You know the basics and want to ship. Go straight to the projects.",
    cta: "Start building",
    href: "/chapter/project-01",
    accent: "oklch(0.78 0.15 75)", // amber
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md bg-[var(--background)]/80 border-b border-[var(--border)]">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="font-heading font-bold text-[15px] tracking-tight"
          >
            The Builder&apos;s Bible
          </Link>
          <div className="flex items-center gap-1">
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
            <a
              href="https://github.com/shravan-swagwalapm/builders-bible"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors px-2 py-1.5 flex items-center gap-1"
            >
              <Star className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">GitHub</span>
            </a>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* Hero — tall, commanding, lots of breathing room */}
      <section className="relative pt-44 pb-32 px-6 overflow-hidden">
        {/* Radial glow behind hero — visible ambient light */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 55% at 50% 25%, oklch(0.72 0.15 175 / 0.12), transparent 70%)",
          }}
        />
        <div className="relative max-w-3xl mx-auto text-center space-y-8">
          <p className="text-sm font-mono tracking-widest uppercase text-[var(--accent)]">
            Free &amp; Open Source
          </p>
          <h1 className="font-heading font-bold tracking-tight leading-[1.05]" style={{ fontSize: "clamp(3rem, 8vw, 5.5rem)" }}>
            The Builder&apos;s
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, oklch(0.78 0.17 170), oklch(0.60 0.16 240))",
              }}
            >
              Bible
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-[var(--muted-foreground)] leading-relaxed max-w-xl mx-auto">
            From zero to shipping AI-powered products.{" "}
            <span className="text-[var(--foreground)]">Everything you need</span> to
            understand software, AI, and how to build real things.
          </p>
          <p className="text-[11px] font-mono tracking-[0.2em] uppercase text-[var(--muted-foreground)]/60">
            For PMs &middot; Founders &middot; Designers &middot; Career Changers &middot; Builders
          </p>
          <div className="flex items-center justify-center gap-6 sm:gap-10 tabular-nums pt-2">
            {[
              { value: "34", label: "Chapters" },
              { value: "700+", label: "Pages" },
              { value: "4", label: "Projects" },
              { value: "198k", label: "Words" },
            ].map((stat, i) => (
              <div key={stat.label} className="text-center flex items-center gap-6 sm:gap-10">
                <div>
                  <div className="text-3xl sm:text-4xl font-heading font-bold text-[var(--foreground)]">
                    {stat.value}
                  </div>
                  <div className="text-[10px] text-[var(--muted-foreground)] uppercase tracking-[0.15em]">
                    {stat.label}
                  </div>
                </div>
                {i < 3 && (
                  <div className="w-px h-8 bg-[var(--border)]" />
                )}
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Link
              href="/chapter/foreword"
              className="group inline-flex items-center justify-center gap-2.5 h-13 px-10 rounded-xl bg-[var(--accent)] text-[var(--accent-foreground)] font-semibold text-base shadow-[0_0_20px_-4px_var(--accent)] transition-all hover:shadow-[0_0_32px_-2px_var(--accent)] hover:brightness-110 active:scale-[0.97]"
            >
              <Book className="w-5 h-5" />
              Start Reading
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <a
              href="https://github.com/shravan-swagwalapm/builders-bible/raw/main/output/The-Builders-Bible.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 h-13 px-10 rounded-xl border border-[var(--border)] bg-[var(--elevation-1)] text-[var(--foreground)] font-medium text-base transition-all hover:bg-[var(--muted)] hover:border-[var(--muted-foreground)]/30 active:scale-[0.97]"
            >
              <Download className="w-5 h-5" />
              Download PDF
            </a>
          </div>
        </div>
      </section>

      {/* Reader paths — more padding, visual weight */}
      <section className="py-28 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-sm font-mono tracking-widest uppercase text-[var(--accent)] mb-3">
              Three ways in
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold">
              Choose Your Path
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {READER_PATHS.map((path) => (
              <Link
                key={path.title}
                href={path.href}
                className="path-card group flex flex-col p-7 rounded-2xl border border-[var(--border)] bg-[var(--elevation-1)] transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                style={{
                  "--card-accent": path.accent,
                  borderTopWidth: 2,
                  borderTopColor: path.accent,
                } as React.CSSProperties}
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-5"
                  style={{
                    backgroundColor: `color-mix(in oklch, ${path.accent} 10%, transparent)`,
                    borderWidth: 1,
                    borderColor: `color-mix(in oklch, ${path.accent} 20%, transparent)`,
                  }}
                >
                  <path.icon className="w-7 h-7" style={{ color: path.accent }} />
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2">
                  {path.title}
                </h3>
                <p className="text-sm text-[var(--muted-foreground)] flex-1 leading-relaxed">
                  {path.description}
                </p>
                <span
                  className="mt-5 text-sm font-medium flex items-center gap-1.5 group-hover:gap-2.5 transition-all"
                  style={{ color: path.accent }}
                >
                  {path.cta}
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Divider — light-bleed gradient */}
      <div className="max-w-5xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-[var(--accent)]/15 to-transparent" />
      </div>

      {/* Table of Contents — cleaner, more structured */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-sm font-mono tracking-widest uppercase text-[var(--accent)] mb-3">
              5 parts &middot; 34 chapters &middot; 4 projects
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold">
              What&apos;s Inside
            </h2>
          </div>
          <div className="space-y-5">
            {PARTS.map(({ part, title }) => {
              const chapters = MANIFEST.filter(
                (ch) => ch.part === part && ch.type !== "part-intro"
              );
              // Distinct accent hue per part for visual variety
              const partAccents: Record<number, string> = {
                [-1]: "oklch(0.65 0.02 250)", // frontmatter — neutral
                0: "oklch(0.72 0.15 175)",    // teal
                1: "oklch(0.68 0.15 250)",    // blue
                2: "oklch(0.68 0.15 300)",    // violet
                3: "oklch(0.72 0.15 145)",    // green
                4: "oklch(0.78 0.15 75)",     // amber
                5: "oklch(0.70 0.15 340)",    // rose
                99: "oklch(0.65 0.02 250)",   // backmatter — neutral
              };
              const accentColor = partAccents[part] ?? "oklch(0.72 0.15 175)";

              return (
                <div
                  key={part}
                  className="group p-6 sm:p-7 rounded-2xl border border-[var(--border)] bg-[var(--elevation-1)] hover:border-[var(--muted-foreground)]/15 hover:bg-[var(--elevation-1)]/80 transition-all duration-200"
                  style={{ borderLeftWidth: 3, borderLeftColor: accentColor }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span
                        className="text-xs font-mono font-bold px-2 py-0.5 rounded"
                        style={{ color: accentColor, backgroundColor: `color-mix(in oklch, ${accentColor} 12%, transparent)` }}
                      >
                        {part === -1 ? "—" : part === 99 ? "—" : part}
                      </span>
                      <h3 className="font-heading font-semibold text-base sm:text-lg">
                        {title}
                      </h3>
                    </div>
                    <span className="text-xs text-[var(--muted-foreground)] font-mono">
                      {chapters.length} ch.
                    </span>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-x-8 gap-y-1">
                    {chapters.map((ch) => (
                      <Link
                        key={ch.slug}
                        href={`/chapter/${ch.slug}`}
                        className="group/link text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors py-1.5 flex items-center gap-2"
                      >
                        <span
                          className="w-1 h-1 rounded-full shrink-0 transition-all group-hover/link:w-1.5 group-hover/link:h-1.5"
                          style={{ backgroundColor: accentColor, opacity: 0.5 }}
                        />
                        <span className="truncate">
                          {ch.chapterNumber
                            ? `${ch.chapterNumber.replace("Chapter ", "")}: `
                            : ""}
                          {ch.title}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer divider */}
      <div className="max-w-5xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />
      </div>

      {/* Footer */}
      <footer className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-5">
          <p className="font-heading font-semibold text-sm text-[var(--foreground)]">
            The Builder&apos;s Bible
          </p>
          <p className="text-sm text-[var(--muted-foreground)]">
            Written by Shravan Tickoo with Claude &middot; Free &amp; open source &middot; First Edition, March 2026
          </p>
          <div className="flex items-center justify-center gap-4">
            <a
              href="https://github.com/shravan-swagwalapm/builders-bible"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
            >
              GitHub &rarr;
            </a>
            <span className="text-[var(--border)]">&middot;</span>
            <a
              href="https://creativecommons.org/licenses/by-sa/4.0/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
            >
              CC BY-SA 4.0
            </a>
          </div>
          <p className="text-xs text-[var(--muted-foreground)]/50">
            &copy; {new Date().getFullYear()} Rethink Systems
          </p>
        </div>
      </footer>
    </div>
  );
}
