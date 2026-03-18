"use client";

import { useState, useEffect, useCallback } from "react";
import { Menu, X } from "lucide-react";
import { ChapterSidebar } from "./chapter-sidebar";

interface MobileDrawerProps {
  currentSlug?: string;
}

export function MobileDrawer({ currentSlug }: MobileDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const close = useCallback(() => setIsOpen(false), []);

  // Close on route change
  useEffect(() => {
    close();
  }, [currentSlug, close]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden p-2 rounded-lg hover:bg-[var(--muted)] transition-colors"
        aria-label="Open navigation"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
          onClick={close}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 bottom-0 w-72 bg-[var(--sidebar)] z-50 transform transition-transform duration-300 ease-[var(--ease-out-quart)] md:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="absolute top-3 right-3">
          <button
            onClick={close}
            className="p-2 rounded-lg hover:bg-[var(--sidebar-accent)] transition-colors"
            aria-label="Close navigation"
          >
            <X className="w-5 h-5 text-[var(--sidebar-foreground)]" />
          </button>
        </div>
        <ChapterSidebar currentSlug={currentSlug} />
      </div>
    </>
  );
}
