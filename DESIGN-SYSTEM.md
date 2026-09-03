# Biology 3Sec — Design System (Manga Ink)

Direction: **Manga × Modern Education × Scientific Editorial.** Black ink linework
and screentone on a warm paper ground, with a single red accent used the way a
manga volume uses one spot color. The system exists to make the site read as one
product across the hub and all three lessons, not four separately-designed apps.

Balance target: Education 45% · Editorial 20% · Manga 20% · Modern UI 15% — the
manga vocabulary (panels, stamps, hatching, speed lines) is used to *carry*
information (state, hierarchy, emphasis), not as decoration layered on top.

## Files

- `css/manga-system.css` — tokens + reusable textures/utilities, loaded on every page.
- `css/manga-skin.css` (root, and one per lesson folder) — remaps that page's own
  existing CSS variables onto the manga tokens, plus a handful of targeted fixes
  for the rules each page had hardcoded outside its variables.
- Original `css/style.css` per page is **untouched** — the skin loads after it and
  only overrides colour/texture, never layout, spacing, or structure.

This two-layer approach was a deliberate trade-off: it let the whole site get one
consistent visual identity without rewriting (and re-testing) four independent
HTML/JS applications from scratch. The cost is that spacing/radius values inside
each page's original CSS are not yet pulled onto the shared scale below — see
"Known gaps" at the end.

## Color

| Token | Value | Use |
|---|---|---|
| `--m-paper` | `#F2ECDC` | Default page background |
| `--m-paper-2` | `#FFFFFF` | Card / surface background |
| `--m-paper-3` | `#E7DFC8` | Recessed surface, screentone card, hover fill |
| `--m-ink` | `#14120F` | Primary text, borders, panel lines |
| `--m-ink-soft` | `#34302A` | Secondary text |
| `--m-muted` | `#6E6656` | Tertiary / metadata text |
| `--m-red` | `#DD2318` | The one accent — CTAs, active states, "correct" |
| `--m-red-dark` | `#A3150C` | Accent hover/pressed |
| `--m-red-tint` | `#F7DAD5` | Accent background wash |
| `--m-border` | `rgba(20,18,15,.22)` | Hairline dividers |

Night variant (`--m-n-*`) inverts to a black page with paper-coloured ink and a
brighter red, used on the two lesson pages that ship a light/dark toggle — so the
toggle still does something meaningful (day-paper ↔ night-ink) rather than being
disabled.

Semantic reuse instead of new hues: **success/correct → red** (a stamped "correct"
mark), **error/incorrect → ink + diagonal hatch texture**, never a second colour —
this is what keeps the palette to "paper / ink / one red" instead of sprawling
into a rainbow of state colours, and it doubles as a colour-blind-safe pattern
(hatch vs. flat), not colour alone, for right/wrong feedback.

## Typography

- **Display** — `Anton` (numerals, lesson numbers, big stat callouts, hero
  headline weight). Falls back to `Cairo`.
- **Body / Arabic** — `Cairo` (400/600/700/800/900) with `Noto Sans Arabic` as a
  second fallback for full Arabic glyph coverage.
- **Label / mono** — `JetBrains Mono` (badges, tags, technical captions).

All three families are loaded through one consolidated `<link>` per page (see
Performance report) instead of scattered `@import`s.

## Spacing

A 4px-base scale is now defined as tokens for new work:

```
--sp-1: 4px   --sp-4: 16px   --sp-12: 48px
--sp-2: 8px   --sp-6: 24px   --sp-16: 64px
--sp-3: 12px  --sp-8: 32px
```

Existing per-page layout spacing (padding/margin/gap already authored in each
`style.css`) was **not** rewritten onto this scale — those values already form a
coherent rhythm inside each page and touching every one across ~3,000 lines of
CSS was out of scope for a skin-level redesign. Treat `--sp-*` as the standard
for anything new.

## Radius & Shadow hierarchy

```
--m-radius-sm: 2px   small controls, buttons, tags
--m-radius-md: 3px   cards, panels        (= --m-radius, the default)
--m-radius-lg: 4px   hero / large containers
```

Large soft glows (`box-shadow: 0 0 20px rgba(...)`) were replaced with **hard,
un-blurred offset shadows** — the signature manga "sticker" shadow:

```
--m-shadow-hard-sm: 3px 3px 0 var(--m-ink)   default card elevation
--m-shadow-hard:    5px 5px 0 var(--m-ink)   hero / emphasis panel
--m-shadow-red:     5px 5px 0 var(--m-red)   reserved for a rare highlight moment
```

Hover/active states shift the element toward its shadow (`translate(2px,2px)` +
shadow shrinks to 1–3px) — reads as a stamp being pressed down, and is the one
consistent micro-interaction pattern used for every button/card across the site.

## Components

- **Ink panel** (`.ink-panel` utility) — 3px ink border, hard offset shadow, 0–4px
  radius. This is the base for cards, quiz boxes, hero panels.
- **Stamp badge** (`.ink-stamp`) — small rotated red-outlined mark, used sparingly.
- **Screentone** (`.tone-dots`) — halftone dot texture for low-emphasis fills.
- **Speed lines** (`.tone-speedlines`, `.tone-speedlines-red`) — radiating line
  burst, reserved for hero/focal moments only (not applied broadly, per the "spend
  your boldness in one place" rule).
- **Hatch** (`.tone-hatch`) — diagonal line texture, the "incorrect" signal.
- **Real content media** (photos, diagrams, video) keep full colour and are framed
  like a clipped panel insert (`3px` ink border + hard shadow) rather than being
  recoloured — the ink system styles the *chrome* around content, never the
  content itself.
- **Decorative inline SVGs** (illustrative diagrams, not real photos) are
  recoloured into ink/red via scoped CSS (`.svg-diagram`, `.card-visual svg`,
  `.svg-interactive-stage`, plus an attribute-based catch-all for any stray
  hardcoded hex left in markup) — no manual per-illustration editing needed.

## Manga rules (so it doesn't tip into "game" or "plain school page")

1. One accent colour, always. If something needs a second signal, use ink +
   texture (hatch/dots), not a second hue.
2. Hard shadows only — no blur, no soft glow, except the rare red glow reserved
   for a single hero CTA moment.
3. Real educational imagery (cell diagrams, anatomy photos) is never recoloured —
   only its frame is styled. The manga system is packaging, not a filter over
   the science.
4. Speed-lines and screentone are seasoning, not sauce — used at low opacity, on
   focal elements only (hero backdrop, one badge), never tiled across full
   sections.
5. Emoji used inline in existing markup (sidebar icons, buttons) were left as-is
   — they can't be recoloured via CSS and replacing them site-wide with a custom
   icon set was out of scope for this pass (see Known gaps).

## Responsive breakpoints (inherited, unchanged)

Each page already defines `1024px` (tablet) and `768px`/`600px` (mobile)
breakpoints in its own `style.css`; the skin layer doesn't introduce new ones —
it only changes colour/texture at whatever breakpoint the original layout
already uses.

## Animation rules

- `prefers-reduced-motion: reduce` is respected globally (`manga-system.css`),
  in addition to each page's own existing reduced-motion block.
- New motion added by this pass is limited to the hover "stamp press" on
  buttons/cards (transform + shadow shrink) — no new looping or ambient
  animation was introduced.

## Known gaps (honest scope notes)

- Emoji icons (sidebar, buttons) are not part of a unified icon system — left
  as native emoji rather than swapped for a custom SVG set.
- Per-page spacing/radius values inside each lesson's own `style.css` were not
  migrated onto the new `--sp-*` scale (see above) — only the skin's own new
  rules use it.
- A from-scratch component library (buttons/cards/badges as shared, importable
  classes usable by *future* lessons) was not built — the current system skins
  each page's existing component classes rather than replacing them with a new
  shared component set. If a 4th lesson is added later, the fastest path is to
  reuse `manga-system.css` tokens and follow the same skin-file pattern used for
  lessons 1–3.
