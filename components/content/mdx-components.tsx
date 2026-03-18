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
      className="font-heading text-2xl sm:text-3xl font-semibold tracking-tight mt-10 mb-4 scroll-mt-20"
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="font-heading text-xl sm:text-2xl font-semibold mt-8 mb-3 scroll-mt-20"
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
    <p className="leading-[1.8] mb-4 text-[var(--foreground)]/90" {...props} />
  ),
  a: (props) => (
    <a
      className="text-[var(--accent)] underline underline-offset-2 decoration-[var(--accent)]/30 hover:decoration-[var(--accent)] transition-colors"
      {...props}
    />
  ),
  ul: (props) => <ul className="list-disc pl-6 space-y-2 mb-4" {...props} />,
  ol: (props) => (
    <ol className="list-decimal pl-6 space-y-2 mb-4" {...props} />
  ),
  li: (props) => <li className="leading-[1.7]" {...props} />,
  blockquote: (props) => (
    <blockquote
      className="border-l-2 border-[var(--accent)]/40 pl-4 italic text-[var(--muted-foreground)] my-4"
      {...props}
    />
  ),
  hr: () => (
    <hr className="border-[var(--border)] my-10" />
  ),
  code: (props) => {
    // Inline code (not inside pre)
    const isBlock =
      typeof props.className === "string" &&
      props.className.includes("language-");
    if (isBlock) return <code {...props} />;
    return (
      <code
        className="font-mono text-[0.9em] bg-[var(--muted)] px-1.5 py-0.5 rounded"
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
