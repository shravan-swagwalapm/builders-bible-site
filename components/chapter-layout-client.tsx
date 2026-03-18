"use client";

import { usePathname } from "next/navigation";
import { ChapterSidebar } from "./chapter-sidebar";
import { MobileDrawer } from "./mobile-drawer";
import { ReadingProgressBar } from "./reading-progress-bar";
import { ThemeToggle } from "./theme-toggle";
import { getChapterBySlug } from "@/lib/content/manifest";

export function ChapterLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const slug = pathname?.split("/chapter/")[1] ?? "";
  const entry = getChapterBySlug(slug);

  return (
    <div className="min-h-screen">
      <ReadingProgressBar />

      {/* Sticky header */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-[var(--background)]/80 border-b border-[var(--border)]">
        <div className="flex items-center gap-3 px-4 h-12">
          <MobileDrawer currentSlug={slug} />
          <div className="flex-1 min-w-0">
            {entry && (
              <div className="flex items-baseline gap-2 truncate">
                <span className="text-xs text-[var(--accent)] font-medium">
                  {entry.partTitle}
                </span>
                <span className="text-xs text-[var(--muted-foreground)]">
                  /
                </span>
                <span className="text-sm font-medium truncate">
                  {entry.chapterNumber
                    ? `${entry.chapterNumber}: ${entry.title}`
                    : entry.title}
                </span>
              </div>
            )}
          </div>
          <ThemeToggle />
        </div>
      </header>

      <div className="flex">
        {/* Desktop sidebar */}
        <aside className="hidden md:block w-72 shrink-0 sticky top-12 h-[calc(100vh-3rem)] bg-[var(--sidebar)] border-r border-[var(--sidebar-border)]">
          <ChapterSidebar currentSlug={slug} />
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
}
