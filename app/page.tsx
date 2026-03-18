import { Book, Github, Download } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      <main className="max-w-2xl text-center space-y-8">
        <h1 className="font-heading text-5xl font-bold tracking-tight sm:text-7xl">
          The Builder&apos;s Bible
        </h1>
        <p className="text-muted-foreground text-lg sm:text-xl leading-relaxed">
          From zero to shipping AI-powered products.
          <br />
          34 chapters &middot; 700+ pages &middot; 4 projects &middot;{" "}
          <span className="text-accent font-medium">Free & Open Source</span>
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/chapter/ch-01-internet"
            className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-lg bg-accent text-accent-foreground font-medium transition-all hover:brightness-110 active:scale-[0.98]"
          >
            <Book className="w-5 h-5" />
            Start Reading
          </a>
          <a
            href="#"
            className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-lg border border-border text-foreground font-medium transition-all hover:bg-muted active:scale-[0.98]"
          >
            <Download className="w-5 h-5" />
            Download PDF
          </a>
        </div>
      </main>
    </div>
  );
}
