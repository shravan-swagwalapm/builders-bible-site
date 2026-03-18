export type ChapterType =
  | "chapter"
  | "project"
  | "frontmatter"
  | "backmatter"
  | "part-intro";

export interface ChapterEntry {
  slug: string;
  path: string;
  part: number;
  partTitle: string;
  title: string;
  chapterNumber: string;
  type: ChapterType;
}

const PART_TITLES: Record<number, string> = {
  [-1]: "Frontmatter",
  0: "Part 0 — The First Step",
  1: "Part I — How Software Works",
  2: "Part II — How AI Works",
  3: "Part III — Building with AI",
  4: "Part IV — Production Engineering",
  5: "Part V — The Frontier",
  [99]: "Backmatter",
};

function entry(
  path: string,
  part: number,
  chapterNumber: string,
  title: string,
  type: ChapterType
): ChapterEntry {
  const slug = path
    .replace(/\.md$/, "")
    .replace(/\//g, "-")
    .replace(/^(frontmatter|backmatter|part-\d+|projects)-/, "");
  return {
    slug,
    path,
    part,
    partTitle: PART_TITLES[part] ?? "",
    title,
    chapterNumber,
    type,
  };
}

export const MANIFEST: ChapterEntry[] = [
  // ── Frontmatter ───────────────────────────────
  entry("frontmatter/foreword.md", -1, "", "Foreword", "frontmatter"),
  entry("frontmatter/about-the-author.md", -1, "", "About the Author", "frontmatter"),
  entry("frontmatter/how-to-read.md", -1, "", "How to Read This Book", "frontmatter"),
  entry("frontmatter/state-of-the-art.md", -1, "", "The State of the Art", "frontmatter"),

  // ── Part 0: The First Step ────────────────────
  entry("part-0/part-intro.md", 0, "", "Part 0 Introduction", "part-intro"),
  entry("part-0/ch-00-1-computer-not-fragile.md", 0, "Chapter 0.1", "Your Computer Is Not Fragile", "chapter"),
  entry("part-0/ch-00-2-setting-up.md", 0, "Chapter 0.2", "Setting Up Your Workshop", "chapter"),
  entry("part-0/ch-00-3-first-conversation.md", 0, "Chapter 0.3", "Your First Conversation with AI", "chapter"),

  // ── Part I: How Software Works ────────────────
  entry("part-1/part-intro.md", 1, "", "Part I Introduction", "part-intro"),
  entry("part-1/ch-01-internet.md", 1, "Chapter 1", "The Internet — How Your Phone Talks to Zomato", "chapter"),
  entry("part-1/ch-02-frontend.md", 1, "Chapter 2", "Frontend — What the User Sees", "chapter"),
  entry("part-1/ch-03-backend.md", 1, "Chapter 3", "Backend — The Engine Room", "chapter"),
  entry("part-1/ch-04-databases.md", 1, "Chapter 4", "Databases — Where Data Lives", "chapter"),
  entry("part-1/ch-05-version-control.md", 1, "Chapter 5", "Version Control — Time Travel for Code", "chapter"),
  entry("part-1/ch-06-deployment.md", 1, "Chapter 6", "Deployment — Shipping to the World", "chapter"),
  entry("part-1/ch-07-testing.md", 1, "Chapter 7", "Testing — Proving It Works", "chapter"),
  entry("part-1/ch-08-architecture.md", 1, "Chapter 8", "Architecture — The Big Picture", "chapter"),
  entry("projects/project-01.md", 1, "Project 1", "Build a Personal Dashboard", "project"),

  // ── Part II: How AI Works ─────────────────────
  entry("part-2/part-intro.md", 2, "", "Part II Introduction", "part-intro"),
  entry("part-2/ch-09-ai-history.md", 2, "Chapter 9", "A Brief History of AI", "chapter"),
  entry("part-2/ch-10-llms.md", 2, "Chapter 10", "Large Language Models", "chapter"),
  entry("part-2/ch-11-prompt-engineering.md", 2, "Chapter 11", "Prompt Engineering", "chapter"),
  entry("part-2/ch-12-embeddings.md", 2, "Chapter 12", "Embeddings — Teaching Machines Meaning", "chapter"),
  entry("part-2/ch-13-rag.md", 2, "Chapter 13", "RAG — Retrieval-Augmented Generation", "chapter"),
  entry("part-2/ch-14-fine-tuning.md", 2, "Chapter 14", "Fine-Tuning", "chapter"),
  entry("part-2/ch-15-agents.md", 2, "Chapter 15", "Agents — AI That Takes Action", "chapter"),
  entry("part-2/ch-16-mcp.md", 2, "Chapter 16", "MCP — The Model Context Protocol", "chapter"),
  entry("part-2/ch-17-multimodal.md", 2, "Chapter 17", "Multimodal AI", "chapter"),
  entry("part-2/ch-18-evaluations.md", 2, "Chapter 18", "Evaluations — Measuring AI Quality", "chapter"),
  entry("projects/project-02.md", 2, "Project 2", "Build an AI Knowledge Assistant", "project"),

  // ── Part III: Building with AI ────────────────
  entry("part-3/part-intro.md", 3, "", "Part III Introduction", "part-intro"),
  entry("part-3/ch-19-claude-code.md", 3, "Chapter 19", "Claude Code — Your AI Pair Programmer", "chapter"),
  entry("part-3/ch-20-ai-landscape.md", 3, "Chapter 20", "The AI Landscape", "chapter"),
  entry("part-3/ch-21-design-systems.md", 3, "Chapter 21", "Design Systems", "chapter"),
  entry("part-3/ch-22-production-chatbot.md", 3, "Chapter 22", "Production Chatbot", "chapter"),
  entry("part-3/ch-23-multi-agent.md", 3, "Chapter 23", "Multi-Agent Systems", "chapter"),
  entry("projects/project-03.md", 3, "Project 3", "Build a Production Chatbot", "project"),

  // ── Part IV: Production Engineering ───────────
  entry("part-4/part-intro.md", 4, "", "Part IV Introduction", "part-intro"),
  entry("part-4/ch-24-system-design.md", 4, "Chapter 24", "System Design", "chapter"),
  entry("part-4/ch-25-analytics.md", 4, "Chapter 25", "Analytics — Measuring What Matters", "chapter"),
  entry("part-4/ch-26-token-economics.md", 4, "Chapter 26", "Token Economics", "chapter"),
  entry("part-4/ch-27-cicd.md", 4, "Chapter 27", "CI/CD — Continuous Integration & Deployment", "chapter"),
  entry("part-4/ch-28-security.md", 4, "Chapter 28", "Security", "chapter"),
  entry("part-4/ch-29-open-source.md", 4, "Chapter 29", "Open Source", "chapter"),

  // ── Part V: The Frontier ──────────────────────
  entry("part-5/part-intro.md", 5, "", "Part V Introduction", "part-intro"),
  entry("part-5/ch-30-compound-ai.md", 5, "Chapter 30", "Compound AI Systems", "chapter"),
  entry("part-5/ch-31-reasoning.md", 5, "Chapter 31", "Reasoning Models", "chapter"),
  entry("part-5/ch-32-voice-ai.md", 5, "Chapter 32", "Voice AI", "chapter"),
  entry("part-5/ch-33-auto-research.md", 5, "Chapter 33", "Auto-Research", "chapter"),
  entry("part-5/ch-34-whats-next.md", 5, "Chapter 34", "What's Next", "chapter"),
  entry("projects/project-04.md", 5, "Project 4", "Build an AI Agent System", "project"),

  // ── Backmatter ────────────────────────────────
  entry("backmatter/appendix-a-resources.md", 99, "", "Appendix A: Resources", "backmatter"),
  entry("backmatter/appendix-b-claude-templates.md", 99, "", "Appendix B: Claude Templates", "backmatter"),
  entry("backmatter/appendix-c-design-system.md", 99, "", "Appendix C: Design System", "backmatter"),
  entry("backmatter/appendix-d-glossary.md", 99, "", "Appendix D: Glossary", "backmatter"),
  entry("backmatter/appendix-e-case-studies.md", 99, "", "Appendix E: Case Studies", "backmatter"),
  entry("backmatter/afterword.md", 99, "", "Afterword", "backmatter"),
  entry("backmatter/colophon.md", 99, "", "Colophon", "backmatter"),
];

/** Only chapters that should appear in the reader (excludes title-page, copyright, TOC) */
export const READABLE_CHAPTERS = MANIFEST;

/** Get unique parts for navigation */
export const PARTS = [
  ...new Map(
    MANIFEST.map((ch) => [ch.part, { part: ch.part, title: ch.partTitle }])
  ).values(),
];

export function getChapterBySlug(slug: string): ChapterEntry | undefined {
  return MANIFEST.find((ch) => ch.slug === slug);
}

export function getAdjacentChapters(slug: string): {
  prev: ChapterEntry | null;
  next: ChapterEntry | null;
} {
  const idx = MANIFEST.findIndex((ch) => ch.slug === slug);
  return {
    prev: idx > 0 ? MANIFEST[idx - 1] : null,
    next: idx < MANIFEST.length - 1 ? MANIFEST[idx + 1] : null,
  };
}
