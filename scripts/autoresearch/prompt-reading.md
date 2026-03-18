# Autoresearch: Reading Experience Polish

## Scope
- `app/chapter/[slug]/page.tsx` — Chapter page
- `app/chapter/layout.tsx` — Chapter layout
- `components/chapter-layout-client.tsx` — Layout with sidebar
- `components/chapter-sidebar.tsx` — Sidebar navigation
- `components/content/mdx-components.tsx` — MDX component styling
- `components/content/copy-button.tsx` — Code copy button
- `app/globals.css` — ARIA box styling, code block styling

## Target URL
http://localhost:3333/chapter/ch-01-internet

## Design Principles (Impeccable)

### What makes it score higher:
- **Reading comfort**: Line height 1.7-1.8 for body. Max width 72ch. Optimized for 15-20 min reading sessions.
- **Typography**: Fluid headings via clamp(). Clear hierarchy: chapter number → title → section headings → body.
- **ARIA boxes**: Each type visually distinct. Left border accent + subtle background. Label text small, uppercase, in Space Grotesk.
- **Code blocks**: Dark background with Shiki syntax highlighting. Copy button appears on hover. Language label visible.
- **Sidebar**: Clean, dense information. Current chapter highlighted with teal. Reading progress dots (green/gray).
- **Navigation**: Prev/Next cards feel tactile. Hover state shows direction clearly.

### What makes it score lower:
- Body text too small or too large
- ARIA boxes that look like errors/warnings (too bright/alarming)
- Code blocks that blend into background
- Sidebar that feels cluttered or hard to scan
- Navigation that's ambiguous about direction

## Rules
- Only edit files in scope
- Do NOT change content parsing or manifest
- Every change must pass `scripts/autoresearch/guard.sh`
- Test with Chapter 1 (it has all content types: ARIA boxes, code, tables, mermaid)
