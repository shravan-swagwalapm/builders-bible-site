"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      onClick={handleCopy}
      className="absolute top-3 right-3 p-1.5 rounded-md bg-[var(--muted)] opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[var(--border)]"
      aria-label="Copy code"
    >
      {copied ? (
        <Check className="w-4 h-4 text-[var(--success)]" />
      ) : (
        <Copy className="w-4 h-4 text-[var(--muted-foreground)]" />
      )}
    </button>
  );
}
