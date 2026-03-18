import fs from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeRaw from "rehype-raw";
import rehypePrettyCode from "rehype-pretty-code";
import { rehypeAriaBoxes } from "@/lib/remark/rehype-aria-boxes";
import { rehypeSections } from "@/lib/remark/rehype-sections";
import { rehypeDiagramBlocks } from "@/lib/remark/rehype-diagram-blocks";
import { mdxComponents } from "@/components/content/mdx-components";
import {
  MANIFEST,
  getChapterBySlug,
  getAdjacentChapters,
  type ChapterEntry,
} from "./manifest";

/** Chapters need both enough sections AND enough content to warrant pagination */
const MIN_H2_COUNT = 8;
const MIN_LINE_COUNT = 550;

const CONTENT_DIR = path.join(process.cwd(), "content");

function preprocessMarkdown(raw: string): string {
  // Remove hardcoded chapter number spans (rendered by page.tsx from manifest)
  let md = raw.replace(/<span class="chapter-number">.*?<\/span>\n?/g, "");

  // Remove {.chapter-title} and {.part-title} kramdown attributes
  md = md.replace(/\{\.chapter-title\}/g, "");
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
          rehypeSections,
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
          rehypeDiagramBlocks,
        ],
      },
    },
  });

  const adjacent = getAdjacentChapters(slug);
  const h2Matches = processed.match(/^## /gm);
  const h2Count = h2Matches ? h2Matches.length : 0;
  const lineCount = processed.split("\n").length;

  return {
    entry,
    content,
    hasSections: h2Count >= MIN_H2_COUNT && lineCount >= MIN_LINE_COUNT,
    prev: adjacent.prev,
    next: adjacent.next,
  };
}

export function getAllChapterSlugs(): string[] {
  return MANIFEST.map((ch) => ch.slug);
}

export { MANIFEST, getChapterBySlug, getAdjacentChapters };
export type { ChapterEntry };
