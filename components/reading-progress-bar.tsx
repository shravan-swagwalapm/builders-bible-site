"use client";

import { useScrollProgress } from "@/hooks/use-reading-progress";

export function ReadingProgressBar() {
  const progress = useScrollProgress();

  return (
    <div className="fixed top-0 left-0 right-0 h-0.5 z-50">
      <div
        className="h-full bg-[var(--accent)] transition-[width] duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
