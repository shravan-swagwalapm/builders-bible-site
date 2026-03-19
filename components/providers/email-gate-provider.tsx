"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Book, ArrowRight } from "lucide-react";

const LS_KEY = "bb-email-captured";

type PendingAction = {
  type: "internal" | "external";
  href: string;
};

function useReducedMotion() {
  const [prefersReduced, setPrefersReduced] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(mql.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);
  return prefersReduced;
}

export function EmailGateProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const reducedMotion = useReducedMotion();

  const [isGated, setIsGated] = useState(true);
  const [showOverlay, setShowOverlay] = useState(false);
  const [phase, setPhase] = useState<"form" | "success">("form");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const pendingRef = useRef<PendingAction | null>(null);
  const overlayVisibleRef = useRef(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Check localStorage on mount
  useEffect(() => {
    try {
      if (localStorage.getItem(LS_KEY) === "true") {
        setIsGated(false);
      }
    } catch {
      // localStorage unavailable — stay gated
    }
  }, []);

  const replayAction = useCallback(() => {
    const action = pendingRef.current;
    if (!action) return;
    pendingRef.current = null;

    if (action.type === "external") {
      window.open(action.href, "_blank");
    } else {
      router.push(action.href);
    }
  }, [router]);

  const dismissGate = useCallback(() => {
    overlayVisibleRef.current = false;
    setShowOverlay(false);
    setIsGated(false);
    setTimeout(replayAction, reducedMotion ? 0 : 350);
  }, [replayAction, reducedMotion]);

  // Click interception — capture phase
  useEffect(() => {
    if (!isGated) return;

    function handler(e: MouseEvent) {
      // Walk up from target to find clickable element
      let el = e.target as HTMLElement | null;
      let clickable: HTMLAnchorElement | HTMLButtonElement | null = null;

      while (el) {
        if (el.tagName === "NAV" || el.tagName === "HEADER") return; // allow nav/header
        if (
          (el.tagName === "A" || el.tagName === "BUTTON") &&
          !clickable
        ) {
          clickable = el as HTMLAnchorElement | HTMLButtonElement;
        }
        el = el.parentElement;
      }

      if (!clickable) return;

      // Don't intercept if overlay is already showing
      if (overlayVisibleRef.current) return;

      e.preventDefault();
      e.stopPropagation();

      // Determine action
      if (clickable.tagName === "A") {
        const anchor = clickable as HTMLAnchorElement;
        const href = anchor.getAttribute("href") || "/";
        const isExternal = anchor.target === "_blank";
        pendingRef.current = { type: isExternal ? "external" : "internal", href };
      } else {
        // Button — no specific href, just show gate
        pendingRef.current = null;
      }

      overlayVisibleRef.current = true;
      setShowOverlay(true);
      setPhase("form");
      setError("");
    }

    document.addEventListener("click", handler, true);
    return () => document.removeEventListener("click", handler, true);
  }, [isGated]);

  // Focus input when overlay shows
  useEffect(() => {
    if (showOverlay && phase === "form") {
      // Small delay for animation
      const t = setTimeout(() => inputRef.current?.focus(), reducedMotion ? 0 : 500);
      return () => clearTimeout(t);
    }
  }, [showOverlay, phase, reducedMotion]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;

    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError("Please enter a valid email address.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        setSubmitting(false);
        return;
      }

      // Success — write localStorage now, but keep listener active until dismiss
      try {
        localStorage.setItem(LS_KEY, "true");
      } catch {
        // localStorage write failed — non-critical
      }
      setPhase("success");
      setSubmitting(false);
    } catch {
      setError("Network error. Please try again.");
      setSubmitting(false);
    }
  }

  // Motion variants
  const instant = { duration: 0 };
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: reducedMotion ? instant : { duration: 0.4, ease: [0.25, 1, 0.5, 1] as const } },
    exit: { opacity: 0, transition: reducedMotion ? instant : { duration: 0.3 } },
  };

  const staggerContainer = {
    visible: {
      transition: reducedMotion
        ? {}
        : { staggerChildren: 0.08 },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: reducedMotion ? 0 : 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: reducedMotion ? instant : { duration: 0.4, ease: [0.25, 1, 0.5, 1] as const },
    },
    exit: {
      opacity: 0,
      transition: reducedMotion ? instant : { duration: 0.2 },
    },
  };

  return (
    <>
      {children}

      <AnimatePresence>
        {showOverlay && (
          <motion.div
            id="email-gate-overlay"
            key="email-gate"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-[100] flex items-center justify-center px-6"
            style={{ backgroundColor: "var(--background)" }}
          >
            {/* Grid pattern */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.03]"
              style={{
                backgroundImage:
                  "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
                backgroundSize: "64px 64px",
              }}
            />
            {/* Radial teal glow centered on form */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 50% 40% at 50% 50%, oklch(0.72 0.15 175 / 0.08), transparent 65%)",
              }}
            />

            <div className="relative w-full max-w-lg">
              <AnimatePresence mode="wait">
                {phase === "form" ? (
                  <motion.div
                    key="form"
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <motion.p
                      variants={fadeUp}
                      className="text-xs font-mono tracking-[0.25em] uppercase text-[var(--accent)]"
                    >
                      Free &amp; Open Source
                    </motion.p>

                    <motion.div
                      variants={fadeUp}
                      className="w-16 h-0.5 bg-[var(--accent)] mt-5 mb-6"
                    />

                    <motion.h2
                      variants={fadeUp}
                      className="font-heading font-bold"
                      style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}
                    >
                      Before you dive in
                    </motion.h2>

                    <motion.p
                      variants={fadeUp}
                      className="text-base sm:text-lg text-[var(--muted-foreground)] leading-relaxed mt-4 max-w-md"
                    >
                      For new updates in the world of AI and product management, please provide your email id
                    </motion.p>

                    <motion.form
                      variants={fadeUp}
                      onSubmit={handleSubmit}
                      className="mt-8"
                    >
                      <input
                        ref={inputRef}
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (error) setError("");
                        }}
                        placeholder="your@email.com"
                        autoComplete="email"
                        className="w-full h-14 px-5 bg-[var(--elevation-1)] border border-[var(--border)] rounded-xl text-base text-[var(--foreground)] placeholder:text-[var(--muted-foreground)]/50 transition-all duration-200 focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]/30 focus:outline-none"
                      />

                      {error && (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-sm text-[var(--destructive)] mt-2"
                        >
                          {error}
                        </motion.p>
                      )}

                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full h-13 mt-4 rounded-xl bg-[var(--accent)] text-[var(--accent-foreground)] font-semibold text-base transition-all hover:brightness-110 active:scale-[0.97] disabled:opacity-60 disabled:cursor-not-allowed"
                        style={{
                          boxShadow: "0 0 20px -4px var(--accent)",
                        }}
                      >
                        {submitting ? (
                          <span className="animate-pulse">...</span>
                        ) : (
                          <>Continue to the Book →</>
                        )}
                      </button>
                    </motion.form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success"
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <motion.p
                      variants={fadeUp}
                      className="text-xs font-mono tracking-[0.25em] uppercase text-[var(--accent)]"
                    >
                      You&apos;re In
                    </motion.p>

                    <motion.div
                      variants={fadeUp}
                      className="w-16 h-0.5 bg-[var(--accent)] mt-5 mb-6"
                    />

                    <motion.h2
                      variants={fadeUp}
                      className="font-heading font-bold"
                      style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}
                    >
                      You&apos;re all set
                    </motion.h2>

                    <motion.p
                      variants={fadeUp}
                      className="text-base sm:text-lg text-[var(--muted-foreground)] leading-relaxed mt-4"
                    >
                      New updates will be sent via email
                    </motion.p>

                    <motion.div variants={fadeUp} className="mt-8">
                      <button
                        onClick={dismissGate}
                        className="group inline-flex items-center justify-center gap-2.5 w-full h-13 rounded-xl bg-[var(--accent)] text-[var(--accent-foreground)] font-semibold text-base transition-all hover:brightness-110 active:scale-[0.97]"
                        style={{
                          boxShadow: "0 0 20px -4px var(--accent)",
                        }}
                      >
                        <Book className="w-5 h-5" />
                        Start Reading Now
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                      </button>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
