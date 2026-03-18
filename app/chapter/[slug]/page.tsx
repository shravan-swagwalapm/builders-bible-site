import { notFound } from "next/navigation";
import { getChapter, getAllChapterSlugs } from "@/lib/content/parser";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";
import { getChapterBySlug } from "@/lib/content/manifest";
import { ChapterEndMarker } from "@/components/chapter-end-marker";
import { SectionPaginator } from "@/components/section-paginator";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllChapterSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = getChapterBySlug(slug);
  if (!entry) return {};

  const title = entry.chapterNumber
    ? `${entry.chapterNumber}: ${entry.title}`
    : entry.title;

  return {
    title: `${title} — The Builder's Bible`,
    description: `Read ${title} from The Builder's Bible — free, open-source guide to building AI-powered products.`,
  };
}

export default async function ChapterPage({ params }: PageProps) {
  const { slug } = await params;
  const chapter = await getChapter(slug);

  if (!chapter) notFound();

  const { entry, content, hasSections, prev, next } = chapter;

  return (
    <article className="max-w-[72ch] mx-auto px-6 py-14 sm:py-20">
      {/* Chapter header */}
      {entry.chapterNumber && (
        <span className="chapter-number">{entry.chapterNumber}</span>
      )}

      {/* MDX content — paginated for long chapters */}
      {hasSections ? (
        <SectionPaginator>
          <div className="prose-bb">{content}</div>
        </SectionPaginator>
      ) : (
        <div className="prose-bb">{content}</div>
      )}

      {/* Mark-as-read sentinel */}
      <ChapterEndMarker slug={slug} />

      {/* Chapter navigation */}
      <nav className="flex items-stretch gap-4 mt-20 pt-10 border-t border-[var(--border)]">
        {prev ? (
          <Link
            href={`/chapter/${prev.slug}`}
            className="flex-1 group flex items-center gap-3 p-5 rounded-xl border border-[var(--border)] bg-[var(--elevation-1)] hover:border-[var(--accent)]/40 transition-all duration-200"
          >
            <ChevronLeft className="w-5 h-5 text-[var(--muted-foreground)] group-hover:text-[var(--accent)] transition-colors shrink-0" />
            <div className="min-w-0">
              <div className="text-xs text-[var(--muted-foreground)] mb-0.5">
                Previous
              </div>
              <div className="text-sm font-medium truncate">
                {prev.chapterNumber ? `${prev.chapterNumber}: ` : ""}
                {prev.title}
              </div>
            </div>
          </Link>
        ) : (
          <div className="flex-1" />
        )}

        {next ? (
          <Link
            href={`/chapter/${next.slug}`}
            className="flex-1 group flex items-center justify-end gap-3 p-5 rounded-xl border border-[var(--border)] bg-[var(--elevation-1)] hover:border-[var(--accent)]/40 transition-all duration-200 text-right"
          >
            <div className="min-w-0">
              <div className="text-xs text-[var(--muted-foreground)] mb-0.5">
                Next
              </div>
              <div className="text-sm font-medium truncate">
                {next.chapterNumber ? `${next.chapterNumber}: ` : ""}
                {next.title}
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-[var(--muted-foreground)] group-hover:text-[var(--accent)] transition-colors shrink-0" />
          </Link>
        ) : (
          <div className="flex-1" />
        )}
      </nav>
    </article>
  );
}
