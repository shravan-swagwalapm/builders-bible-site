import { ChapterLayoutClient } from "@/components/chapter-layout-client";

export default function ChapterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ChapterLayoutClient>{children}</ChapterLayoutClient>;
}
