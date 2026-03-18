"use client";

import { useMarkReadOnComplete } from "@/hooks/use-reading-progress";

export function ChapterEndMarker({ slug }: { slug: string }) {
  useMarkReadOnComplete(slug);
  return <div id="chapter-end" className="h-1" aria-hidden />;
}
