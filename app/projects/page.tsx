import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects — The Builder's Bible",
  description:
    "4 milestone projects from The Builder's Bible — build real things with AI.",
};

const PROJECTS = [
  {
    number: 1,
    title: "Personal Dashboard",
    description:
      "Build a full-stack personal dashboard with authentication, data visualization, and deployment. Your first real web application.",
    slug: "project-01",
    tech: ["Next.js", "Supabase", "Tailwind", "Vercel"],
    part: "Part I",
    estimatedTime: "8-12 hours",
  },
  {
    number: 2,
    title: "AI Knowledge Assistant",
    description:
      "Create a RAG-powered chatbot that answers questions about your own documents. Embeddings, vector search, and prompt engineering.",
    slug: "project-02",
    tech: ["Python", "OpenAI", "FAISS", "Streamlit"],
    part: "Part II",
    estimatedTime: "10-15 hours",
  },
  {
    number: 3,
    title: "Production Chatbot",
    description:
      "Ship a production-grade AI chatbot with tool use, conversation memory, rate limiting, and a polished UI.",
    slug: "project-03",
    tech: ["Next.js", "Claude API", "Vercel AI SDK", "PostgreSQL"],
    part: "Part III",
    estimatedTime: "12-18 hours",
  },
  {
    number: 4,
    title: "AI Agent System",
    description:
      "Build a multi-agent system where specialized AI agents collaborate to solve complex tasks autonomously.",
    slug: "project-04",
    tech: ["Claude Code", "MCP", "Multi-agent", "Evaluation"],
    part: "Part V",
    estimatedTime: "15-20 hours",
  },
];

export default function ProjectsPage() {
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
        <h1 className="font-heading text-3xl sm:text-4xl font-bold mb-4">
          Projects
        </h1>
        <p className="text-[var(--muted-foreground)] mb-10 leading-relaxed">
          Four milestone projects, each building on the last. By the end,
          you&apos;ll have shipped a multi-agent AI system.
        </p>

        <div className="space-y-6">
          {PROJECTS.map((project) => (
            <Link
              key={project.slug}
              href={`/chapter/${project.slug}`}
              className="group block p-6 rounded-xl border border-[var(--border)] hover:border-[var(--accent)]/40 transition-all hover:shadow-[var(--glow-accent)]"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs text-[var(--accent)] font-medium mb-1">
                    {project.part} &middot; Project {project.number}
                  </div>
                  <h2 className="font-heading text-xl font-semibold mb-2 group-hover:text-[var(--accent)] transition-colors">
                    {project.title}
                  </h2>
                  <p className="text-sm text-[var(--muted-foreground)] leading-relaxed mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="text-xs px-2 py-0.5 rounded-full bg-[var(--muted)] text-[var(--muted-foreground)]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <ExternalLink className="w-5 h-5 text-[var(--muted-foreground)] group-hover:text-[var(--accent)] transition-colors shrink-0 mt-1" />
              </div>
              <div className="mt-4 text-xs text-[var(--muted-foreground)]">
                Estimated: {project.estimatedTime}
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
