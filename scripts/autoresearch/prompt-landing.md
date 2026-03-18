# Autoresearch: Landing Page Polish

## Scope
- `app/page.tsx` — Landing page
- `app/globals.css` — Design tokens and styles
- `components/theme-toggle.tsx` — Theme toggle button

## Target URL
http://localhost:3333

## Design Principles (Impeccable)

### What makes it score higher:
- **Typography hierarchy**: One element should be 3x bigger than the rest. Headings in Space Grotesk, body in DM Sans.
- **Color harmony**: 60% background, 30% foreground/muted, 10% accent (teal). OKLCH only.
- **Whitespace**: Generous. Padding should feel luxurious, not cramped. Like Stripe's documentation.
- **Dark mode execution**: Deep navy background (not pure black). Warm white text (not pure white). Film grain overlay.
- **Motion**: Subtle hover states. Cards should have a gentle lift on hover (box-shadow + glow).
- **Visual hierarchy**: Hero → Paths → TOC → Footer. Each section distinct.

### What makes it score lower:
- Pure black (#000) or pure white (#fff) anywhere
- Inconsistent spacing between sections
- Generic/template feel — needs to feel handcrafted
- Poor contrast ratios
- Elements that feel "floaty" (no visual weight)
- AI slop: anything that looks like a generic SaaS landing page

## Rules
- Only edit files in scope
- Do NOT change the content structure or routing
- Every change must pass `scripts/autoresearch/guard.sh`
- Prefer CSS changes over component restructuring
- Keep changes small and targeted per iteration
