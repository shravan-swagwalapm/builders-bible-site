"use client";

import { useState, useEffect, useCallback } from "react";
import { getReadChapters, markChapterRead, isChapterRead } from "@/lib/progress";
import { MANIFEST } from "@/lib/content/manifest";

export function useReadingProgress() {
  const [readSlugs, setReadSlugs] = useState<string[]>([]);

  useEffect(() => {
    setReadSlugs(getReadChapters());
  }, []);

  const markRead = useCallback((slug: string) => {
    markChapterRead(slug);
    setReadSlugs(getReadChapters());
  }, []);

  const checkRead = useCallback(
    (slug: string) => readSlugs.includes(slug),
    [readSlugs]
  );

  const percentage = Math.round(
    (readSlugs.length / MANIFEST.length) * 100
  );

  return { readSlugs, markRead, checkRead, percentage };
}

export function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function handleScroll() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) {
        setProgress(0);
        return;
      }
      setProgress(Math.min(100, Math.round((scrollTop / docHeight) * 100)));
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return progress;
}

export function useMarkReadOnComplete(slug: string) {
  const { markRead } = useReadingProgress();

  useEffect(() => {
    const sentinel = document.getElementById("chapter-end");
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          markRead(slug);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [slug, markRead]);
}
