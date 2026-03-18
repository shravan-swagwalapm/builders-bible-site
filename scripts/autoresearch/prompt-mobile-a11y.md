# Autoresearch: Mobile + Accessibility

## Scope
All components and pages.

## Scoring Method
Use Lighthouse CLI instead of vision model:
```bash
npx lighthouse http://localhost:3333 --chrome-flags="--headless" --output=json --quiet | jq '.categories.accessibility.score * 100'
```

## Targets
- Lighthouse Accessibility: > 95
- Lighthouse Performance: > 90
- Mobile touch targets: minimum 44x44px
- Focus indicators: visible on all interactive elements

## Design Principles

### What makes it score higher:
- All interactive elements have `:focus-visible` outlines
- Color contrast ratios meet WCAG AA (4.5:1 for text, 3:1 for large text)
- Images have alt text (or aria-hidden if decorative)
- Buttons/links have accessible labels
- Mobile sidebar drawer works with swipe gestures
- Touch targets are 44px minimum on mobile
- Heading hierarchy is sequential (no skipping h2 → h4)

### What makes it score lower:
- Missing alt text on images
- Low contrast text (especially muted text on dark backgrounds)
- Focus traps in mobile drawer
- Non-semantic HTML (div where button should be)
- Missing ARIA labels on icon-only buttons
- Scrollable areas without keyboard access

## Rules
- Only make accessibility and mobile improvements
- Do NOT change visual design significantly
- Every change must pass `scripts/autoresearch/guard.sh`
- Test on both / and /chapter/ch-01-internet
