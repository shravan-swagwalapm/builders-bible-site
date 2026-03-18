"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, BookOpen } from "lucide-react";
import { MANIFEST, PARTS } from "@/lib/content/manifest";
import { useReadingProgress } from "@/hooks/use-reading-progress";

interface ChapterSidebarProps {
  currentSlug?: string;
}

export function ChapterSidebar({ currentSlug }: ChapterSidebarProps) {
  const { checkRead, percentage } = useReadingProgress();

  // Find current chapter's part to auto-expand it
  const currentChapter = MANIFEST.find((ch) => ch.slug === currentSlug);
  const currentPart = currentChapter?.part;

  const [expandedParts, setExpandedParts] = useState<Set<number>>(() => {
    const initial = new Set<number>();
    if (currentPart !== undefined) initial.add(currentPart);
    return initial;
  });

  const togglePart = (part: number) => {
    setExpandedParts((prev) => {
      const next = new Set(prev);
      if (next.has(part)) next.delete(part);
      else next.add(part);
      return next;
    });
  };

  return (
    <nav className="h-full flex flex-col" aria-label="Chapter navigation">
      {/* Header */}
      <div className="p-4 border-b border-[var(--sidebar-border)]">
        <Link
          href="/"
          className="flex items-center gap-2 text-[var(--sidebar-foreground)] hover:text-[var(--accent)] transition-colors"
        >
          <BookOpen className="w-5 h-5" />
          <span className="font-heading font-semibold text-sm">
            The Builder&apos;s Bible
          </span>
        </Link>
        {/* Progress bar */}
        <div className="mt-3 flex items-center gap-2">
          <div className="flex-1 h-1 bg-[var(--sidebar-border)] rounded-full overflow-hidden">
            <div
              className="h-full bg-[var(--accent)] rounded-full transition-all duration-500"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <span className="text-xs text-[var(--muted-foreground)] tabular-nums">
            {percentage}%
          </span>
        </div>
      </div>

      {/* Chapter list */}
      <div className="flex-1 overflow-y-auto py-2">
        {PARTS.map(({ part, title }) => {
          const chapters = MANIFEST.filter((ch) => ch.part === part);
          const isExpanded = expandedParts.has(part);

          return (
            <div key={part}>
              <button
                onClick={() => togglePart(part)}
                className="w-full flex items-center gap-2 px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-[var(--muted-foreground)] hover:text-[var(--sidebar-foreground)] transition-colors text-left"
              >
                <ChevronRight
                  className={`w-3 h-3 shrink-0 transition-transform ${isExpanded ? "rotate-90" : ""}`}
                />
                <span className="truncate">{title}</span>
              </button>

              {isExpanded && (
                <ul className="pb-2">
                  {chapters.map((ch) => {
                    const isCurrent = ch.slug === currentSlug;
                    const isRead = checkRead(ch.slug);

                    return (
                      <li key={ch.slug}>
                        <Link
                          href={`/chapter/${ch.slug}`}
                          className={`flex items-center gap-2 px-4 py-1.5 text-sm transition-colors ${
                            isCurrent
                              ? "text-[var(--accent)] bg-[var(--sidebar-accent)] font-medium border-l-2 border-[var(--accent)]"
                              : "text-[var(--sidebar-foreground)] hover:text-[var(--accent)] hover:bg-[var(--sidebar-accent)]/50 border-l-2 border-transparent"
                          }`}
                        >
                          {/* Reading progress dot */}
                          <span
                            className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                              isRead
                                ? "bg-[var(--success)]"
                                : "bg-[var(--sidebar-border)]"
                            }`}
                          />
                          <span className="truncate">
                            {ch.chapterNumber
                              ? `${ch.chapterNumber.replace("Chapter ", "Ch ")}: `
                              : ""}
                            {ch.title}
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
}
