# Optimization Log — Biology 3Sec

Chronological log of concrete changes. See `PERFORMANCE-REPORT.md` for the
before/after numbers and rationale, and `DESIGN-SYSTEM.md` for the visual
system these changes sit inside.

## Images — Lesson 1 (`أول درس/assets/images/`)

- Resized 5 illustration PNGs from native 1408×768/1376×768 down to 1200px
  width (matches actual max rendered size × 2 for retina).
- Generated WebP versions (quality 82) alongside optimized PNG fallbacks.
- `أول درس/index.html`: wrapped all 5 `<img class="zoomable-image">` in
  `<picture>` with a WebP `<source>`; added `loading="lazy"`,
  `decoding="async"`, and explicit `width`/`height` to each `<img>`.

## Video — Lesson 1 (`أول درس/assets/videos/`)

- Re-encoded `osmosis-turgor.mp4` and `casparian-strip.mp4`: 1280×720 → 854×480,
  H.264 CRF 27, audio re-encoded to 96kbps AAC (kept, not stripped), added
  `+faststart`.
- Generated a poster JPEG for each (`ffmpeg … thumbnail` filter).
- `أول درس/index.html`: added `poster="…"` and explicit `width="854"
  height="480"` to both `<video>` tags. `preload="metadata"` was already
  present — left as-is.

## Fonts — all 4 pages

- Removed `@import url(fonts.googleapis.com…)` from `أول درس/css/style.css`
  (was causing a request-waterfall for Arabic body text).
- Removed the equivalent `@import` from `css/manga-system.css` (Anton font).
- Added one consolidated `<link rel="preconnect">` ×2 + `<link
  rel="stylesheet">` per page, in `<head>`, before the manga stylesheets,
  covering every family/weight the site actually uses (Anton, Cairo, Noto Sans
  Arabic, JetBrains Mono).

## Scroll handlers — Lessons 1, 2, 3 (`js/app.js` in each)

- `initReadingProgress` (L2, L3) and the equivalent inline handler (L1):
  wrapped the scroll-triggered style write in a `requestAnimationFrame`
  ticking-flag pattern; added `{ passive: true }` to each
  `addEventListener('scroll', …)` call.

## Script loading — all 4 pages

- Added `defer` to every `<script src="…">` tag (hub: 1 file; L1: 3; L2: 3;
  L3: 12). Execution order unchanged (deferred scripts run in document order).

## Design system (formalization, not a new redesign)

- `css/manga-system.css`: added a documented spacing scale (`--sp-1`…`--sp-16`)
  and a radius hierarchy (`--m-radius-sm/md/lg`) as tokens for future work.
- Added a catch-all CSS rule set (attribute selectors) that recolors any stray
  inline `style="background: rgba(…)"` or hardcoded SVG `fill`/`stroke` hex
  left over from the original palette, so no page can silently show an
  un-reskinned cyan/gold/green element. Found and fixed two real instances
  this way (a light-blue inline-styled `<span>` in Lesson 2, and an id-only
  `<svg>` breathing animation in Lesson 2 that wasn't inside a recognized
  container class).

## Verification steps run after each group of changes

- Started a local static server, loaded all 4 pages in a headless browser at
  1400×1000, took full-page screenshots, and diffed visually against the prior
  version.
- Checked browser console for new errors on each page.
- Manually inspected the Lesson 1 media section screenshot to confirm the
  WebP images and video posters render (not broken/missing).
