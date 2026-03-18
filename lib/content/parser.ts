import fs from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeRaw from "rehype-raw";
import rehypePrettyCode from "rehype-pretty-code";
import { rehypeAriaBoxes } from "@/lib/remark/rehype-aria-boxes";
import { mdxComponents } from "@/components/content/mdx-components";
import {
  MANIFEST,
  getChapterBySlug,
  getAdjacentChapters,
  type ChapterEntry,
} from "./manifest";

const CONTENT_DIR = path.join(process.cwd(), "content");

function preprocessMarkdown(raw: string): string {
  // Remove {.chapter-title} and {.part-title} kramdown attributes
  let md = raw.replace(/\{\.chapter-title\}/g, "");
  md = md.replace(/\{\.part-title\}/g, "");
  md = md.replace(/\{\.part-subtitle\}/g, "");

  // Escape < followed by numbers/symbols that MDX would interpret as JSX
  // e.g. <100ms, <2s, <50%, but NOT valid HTML like <div>, <span>, etc.
  md = md.replace(/<(\d)/g, "&lt;$1");

  // Escape stray < not followed by valid HTML tag names or /
  // Valid HTML tags start with a letter; also allow / for closing tags
  // This catches cases like <-- arrows, <= comparisons, etc.
  md = md.replace(/<(?![a-zA-Z/!])/g, "&lt;");

  return md;
}

export async function getChapter(slug: string) {
  const entry = getChapterBySlug(slug);
  if (!entry) return null;

  const filePath = path.join(CONTENT_DIR, entry.path);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const processed = preprocessMarkdown(raw);

  const { content } = await compileMDX({
    source: processed,
    components: mdxComponents,
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          [
            rehypeRaw,
            {
              passThrough: [
                "mdxFlowExpression",
                "mdxJsxFlowElement",
                "mdxJsxTextElement",
                "mdxTextExpression",
                "mdxjsEsm",
              ],
            },
          ],
          rehypeAriaBoxes,
          rehypeSlug,
          [
            rehypeAutolinkHeadings,
            { behavior: "wrap", properties: { className: ["anchor"] } },
          ],
          [
            rehypePrettyCode,
            {
              theme: "github-dark-dimmed",
              keepBackground: true,
            },
          ],
        ],
      },
    },
  });

  const adjacent = getAdjacentChapters(slug);

  return {
    entry,
    content,
    prev: adjacent.prev,
    next: adjacent.next,
  };
}

export function getAllChapterSlugs(): string[] {
  return MANIFEST.map((ch) => ch.slug);
}

export { MANIFEST, getChapterBySlug, getAdjacentChapters };
export type { ChapterEntry };
