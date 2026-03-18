import type { MDXComponents } from "mdx/types";
import { CopyButton } from "./copy-button";

function AriaBox({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
}

function Pre({
  children,
  ...props
}: React.HTMLAttributes<HTMLPreElement>) {
  const codeContent =
    typeof children === "object" &&
    children !== null &&
    "props" in children
      ? (children as React.ReactElement<{ children?: string }>).props.children
      : "";

  return (
    <div className="relative group">
      <pre {...props}>{children}</pre>
      <CopyButton text={typeof codeContent === "string" ? codeContent : ""} />
    </div>
  );
}

function Table({
  children,
  ...props
}: React.HTMLAttributes<HTMLTableElement>) {
  return (
    <div className="overflow-x-auto -mx-4 px-4 my-6">
      <table className="w-full text-sm" {...props}>
        {children}
      </table>
    </div>
  );
}

export const mdxComponents: MDXComponents = {
  // Override default elements
  pre: Pre,
  table: Table,

  // ARIA boxes are rendered as raw HTML divs via rehype-raw
  // They get styled via globals.css

  // Headings
  h1: (props) => (
    <h1
      className="font-heading text-3xl sm:text-4xl font-bold tracking-tight mt-12 mb-6"
      {...props}
    />
  ),
  h2: (props) => (
    <h2
      className="font-heading text-2xl sm:text-3xl font-semibold tracking-tight mt-14 mb-5 scroll-mt-20"
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="font-heading text-xl sm:text-2xl font-semibold mt-10 mb-4 scroll-mt-20"
      {...props}
    />
  ),
  h4: (props) => (
    <h4
      className="font-heading text-lg font-semibold mt-6 mb-2"
      {...props}
    />
  ),

  // Body
  p: (props) => (
    <p className="leading-[1.85] mb-5 text-[var(--foreground)]/90" {...props} />
  ),
  a: (props) => (
    <a
      className="text-[var(--accent)] underline underline-offset-2 decoration-[var(--accent)]/30 hover:decoration-[var(--accent)] transition-colors"
      {...props}
    />
  ),
  ul: (props) => <ul className="list-disc pl-6 space-y-2.5 mb-6" {...props} />,
  ol: (props) => (
    <ol className="list-decimal pl-6 space-y-2.5 mb-6" {...props} />
  ),
  li: (props) => <li className="leading-[1.75] text-[var(--foreground)]/90" {...props} />,
  blockquote: (props) => (
    <blockquote
      className="border-l-3 border-[var(--accent)]/30 pl-5 italic text-[var(--muted-foreground)] my-6 py-1"
      {...props}
    />
  ),
  hr: () => (
    <div className="my-12">
      <div className="h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />
    </div>
  ),
  code: (props) => {
    // Inline code (not inside pre)
    const isBlock =
      typeof props.className === "string" &&
      props.className.includes("language-");
    if (isBlock) return <code {...props} />;
    return (
      <code
        className="font-mono text-[0.88em] bg-[var(--muted)] text-[var(--accent)] px-1.5 py-0.5 rounded border border-[var(--border)]"
        {...props}
      />
    );
  },
  strong: (props) => (
    <strong className="font-semibold text-[var(--foreground)]" {...props} />
  ),

  // Images
  img: (props) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img className="rounded-lg my-6 max-w-full" alt="" {...props} />
  ),
};
