"use client";

import { useState, useEffect, useCallback, useRef, useId } from "react";
import { ChevronLeft, ChevronRight, List } from "lucide-react";
import Link from "next/link";

interface ChapterLink {
  slug: string;
  title: string;
  chapterNumber: string;
}

interface SectionPaginatorProps {
  children: React.ReactNode;
  prevChapter?: ChapterLink | null;
  nextChapter?: ChapterLink | null;
}

interface DomSection {
  index: number;
  title: string;
  element: HTMLElement;
}

export function SectionPaginator({
  children,
  prevChapter,
  nextChapter,
}: SectionPaginatorProps) {
  const [currentSection, setCurrentSection] = useState(0);
  const [showToc, setShowToc] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [sections, setSections] = useState<DomSection[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const scopeId = useId().replace(/:/g, "-");

  // Discover sections from DOM on mount
  useEffect(() => {
    if (!containerRef.current) return;
    const els = containerRef.current.querySelectorAll(
      ":scope .chapter-section"
    );
    const discovered: DomSection[] = Array.from(els).map((el, idx) => ({
      index: idx,
      title: el.getAttribute("data-section-title") || `Section ${idx + 1}`,
      element: el as HTMLElement,
    }));
    setSections(discovered);
  }, []);

  const totalSections = sections.length;

  // Toggle section visibility via inline styles
  useEffect(() => {
    if (sections.length === 0) return;

    if (showAll) {
      sections.forEach((s) => {
        s.element.style.display = "block";
      });
      return;
    }

    sections.forEach((s, idx) => {
      s.element.style.display = idx === currentSection ? "block" : "none";
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentSection, showAll, sections]);

  const goTo = useCallback((idx: number) => {
    setCurrentSection(idx);
    setShowToc(false);
    setShowAll(false);
  }, []);

  const goPrev = useCallback(() => {
    if (currentSection > 0) goTo(currentSection - 1);
  }, [currentSection, goTo]);

  const goNext = useCallback(() => {
    if (currentSection < totalSections - 1) goTo(currentSection + 1);
  }, [currentSection, totalSections, goTo]);

  // Keyboard navigation (left/right arrows)
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (showAll) return;
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === "ArrowLeft" && !e.metaKey) goPrev();
      if (e.key === "ArrowRight" && !e.metaKey) goNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [goPrev, goNext, showAll]);

  return (
    <div ref={containerRef} id={`sp-${scopeId}`}>
      {/*
        Scoped style hides all sections by default, shows first.
        Prevents flash-of-all-content before JS hydrates.
        Inline styles from useEffect take over once mounted.
      */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            #sp-${scopeId} .chapter-section { display: none; }
            #sp-${scopeId} .chapter-section:first-child { display: block; }
          `,
        }}
      />

      {/* Section header bar */}
      {totalSections > 0 && (
        <div className="sticky top-14 z-30 -mx-6 px-6 py-3 mb-8 backdrop-blur-md bg-[var(--background)]/80 border-b border-[var(--border)]">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <button
                onClick={() => setShowToc(!showToc)}
                className="flex items-center gap-1.5 text-xs font-medium text-[var(--muted-foreground)] hover:text-[var(--accent)] transition-colors"
                aria-label="Toggle section list"
              >
                <List className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Sections</span>
              </button>
              {!showAll && (
                <span className="text-xs text-[var(--muted-foreground)] tabular-nums">
                  {currentSection + 1} / {totalSections}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowAll(!showAll)}
                className={`text-xs px-2.5 py-1 rounded-md transition-colors ${
                  showAll
                    ? "bg-[var(--accent)]/10 text-[var(--accent)]"
                    : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                }`}
              >
                {showAll ? "Paginated" : "Show All"}
              </button>

              {!showAll && (
                <div className="flex items-center gap-1">
                  <button
                    onClick={goPrev}
                    disabled={currentSection === 0}
                    className="p-1.5 rounded-md text-[var(--muted-foreground)] hover:text-[var(--foreground)] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    aria-label="Previous section"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={goNext}
                    disabled={currentSection === totalSections - 1}
                    className="p-1.5 rounded-md text-[var(--muted-foreground)] hover:text-[var(--foreground)] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    aria-label="Next section"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Section title */}
          {!showAll && sections[currentSection] && (
            <div className="mt-1.5 text-sm font-medium text-[var(--foreground)] truncate">
              {sections[currentSection].title}
            </div>
          )}

          {/* Progress dots */}
          {!showAll && totalSections <= 20 && (
            <div className="flex items-center gap-1 mt-2">
              {sections.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goTo(idx)}
                  className={`h-1 rounded-full transition-all ${
                    idx === currentSection
                      ? "w-6 bg-[var(--accent)]"
                      : idx < currentSection
                      ? "w-1.5 bg-[var(--accent)]/40"
                      : "w-1.5 bg-[var(--border)]"
                  }`}
                  aria-label={`Go to section ${idx + 1}: ${sections[idx]?.title}`}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Section table of contents dropdown */}
      {showToc && (
        <div className="mb-8 p-4 rounded-xl border border-[var(--border)] bg-[var(--elevation-1)]">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)] mb-3">
            In this chapter
          </h3>
          <ol className="space-y-1">
            {sections.map((section) => (
              <li key={section.index}>
                <button
                  onClick={() => goTo(section.index)}
                  className={`w-full text-left text-sm px-3 py-1.5 rounded-lg transition-colors ${
                    section.index === currentSection && !showAll
                      ? "bg-[var(--accent)]/10 text-[var(--accent)] font-medium"
                      : "text-[var(--foreground)]/80 hover:text-[var(--accent)] hover:bg-[var(--accent)]/5"
                  }`}
                >
                  <span className="text-[var(--muted-foreground)] text-xs tabular-nums mr-2">
                    {section.index + 1}.
                  </span>
                  {section.title}
                </button>
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Chapter content */}
      {children}

      {/* Bottom navigation */}
      {totalSections > 0 && (
        <>
          {/* Section navigation (not on last section, not in show-all) */}
          {!showAll && currentSection < totalSections - 1 && (
            <nav className="flex items-stretch gap-4 mt-12 pt-8 border-t border-[var(--border)]">
              {currentSection > 0 ? (
                <button
                  onClick={goPrev}
                  className="flex-1 group flex items-center gap-3 p-4 rounded-xl border border-[var(--border)] bg-[var(--elevation-1)] hover:border-[var(--accent)]/40 transition-all"
                >
                  <ChevronLeft className="w-4 h-4 text-[var(--muted-foreground)] group-hover:text-[var(--accent)] transition-colors shrink-0" />
                  <div className="min-w-0 text-left">
                    <div className="text-xs text-[var(--muted-foreground)] mb-0.5">
                      Previous Section
                    </div>
                    <div className="text-sm font-medium truncate">
                      {sections[currentSection - 1]?.title}
                    </div>
                  </div>
                </button>
              ) : (
                <div className="flex-1" />
              )}

              <button
                onClick={goNext}
                className="flex-1 group flex items-center justify-end gap-3 p-4 rounded-xl border border-[var(--border)] bg-[var(--elevation-1)] hover:border-[var(--accent)]/40 transition-all text-right"
              >
                <div className="min-w-0">
                  <div className="text-xs text-[var(--muted-foreground)] mb-0.5">
                    Next Section
                  </div>
                  <div className="text-sm font-medium truncate">
                    {sections[currentSection + 1]?.title}
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[var(--muted-foreground)] group-hover:text-[var(--accent)] transition-colors shrink-0" />
              </button>
            </nav>
          )}

          {/* Chapter navigation (last section or show-all mode) */}
          {(showAll || currentSection === totalSections - 1) && (
            <nav className="flex items-stretch gap-4 mt-20 pt-10 border-t border-[var(--border)]">
              {prevChapter ? (
                <Link
                  href={`/chapter/${prevChapter.slug}`}
                  className="flex-1 group flex items-center gap-3 p-5 rounded-xl border border-[var(--border)] bg-[var(--elevation-1)] hover:border-[var(--accent)]/40 transition-all duration-200"
                >
                  <ChevronLeft className="w-5 h-5 text-[var(--muted-foreground)] group-hover:text-[var(--accent)] transition-colors shrink-0" />
                  <div className="min-w-0">
                    <div className="text-xs text-[var(--muted-foreground)] mb-0.5">
                      Previous Chapter
                    </div>
                    <div className="text-sm font-medium truncate">
                      {prevChapter.chapterNumber
                        ? `${prevChapter.chapterNumber}: `
                        : ""}
                      {prevChapter.title}
                    </div>
                  </div>
                </Link>
              ) : (
                <div className="flex-1" />
              )}

              {nextChapter ? (
                <Link
                  href={`/chapter/${nextChapter.slug}`}
                  className="flex-1 group flex items-center justify-end gap-3 p-5 rounded-xl border border-[var(--border)] bg-[var(--elevation-1)] hover:border-[var(--accent)]/40 transition-all duration-200 text-right"
                >
                  <div className="min-w-0">
                    <div className="text-xs text-[var(--muted-foreground)] mb-0.5">
                      Next Chapter
                    </div>
                    <div className="text-sm font-medium truncate">
                      {nextChapter.chapterNumber
                        ? `${nextChapter.chapterNumber}: `
                        : ""}
                      {nextChapter.title}
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-[var(--muted-foreground)] group-hover:text-[var(--accent)] transition-colors shrink-0" />
                </Link>
              ) : (
                <div className="flex-1" />
              )}
            </nav>
          )}
        </>
      )}
    </div>
  );
}
