const STORAGE_KEY = "bb-reading-progress";

export function getReadChapters(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function markChapterRead(slug: string): void {
  if (typeof window === "undefined") return;
  const chapters = getReadChapters();
  if (!chapters.includes(slug)) {
    chapters.push(slug);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(chapters));
  }
}

export function isChapterRead(slug: string): boolean {
  return getReadChapters().includes(slug);
}

export function getProgressPercentage(totalChapters: number): number {
  const read = getReadChapters().length;
  if (totalChapters === 0) return 0;
  return Math.round((read / totalChapters) * 100);
}
