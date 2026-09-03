# Performance Report — Biology 3Sec

Scope note up front: this pass targeted the **highest-impact, lowest-risk**
items from the performance brief — real measured payload reduction, the one
recurring jank pattern (unthrottled scroll handlers) repeated across all three
lessons, and script/font loading order. It did not rewrite the JS architecture,
add a service worker, or split JS into modules — see "Not done" at the end.

## Method

Audited every HTML/CSS/JS/image/video file in the repo (`du`, `wc -l`, `grep`
for scroll/resize/interval listeners, `ffprobe` for video specs). Fixed what
the audit actually found — no speculative changes. Re-screenshotted all 4 pages
after each change and checked the browser console for errors.

## Before → After (measured)

### Images (Lesson 1 — the only lesson with raster images)

| File | Before (PNG) | After PNG (optimized+resized) | After WebP (served to modern browsers) |
|---|---:|---:|---:|
| turgor-pressure illustration | 1.33 MB | 1.02 MB | **134 KB** |
| tissue wall depositions | 934 KB | 742 KB | **84 KB** |
| tissue comparison | 950 KB | 730 KB | **80 KB** |
| epidermis/cork | 1.32 MB | 1.01 MB | **133 KB** |
| casparian strip diagram | 1.27 MB | 979 KB | **134 KB** |
| **Total** | **5.80 MB** | 4.47 MB | **565 KB (−90%)** |

Fix: resized from native 1408×768 (2.4× larger than ever displayed, given the
existing `max-width`/2-column grid) down to 1200px width — still crisp at 2×
retina for the actual display size — and served via `<picture>` with a WebP
source and the optimized PNG as fallback. Added `loading="lazy" decoding="async"`
plus explicit `width`/`height` (all below-the-fold, so lazy-loading them costs
nothing and saves the initial-load byte count entirely for anyone who doesn't
scroll that far).

### Video (Lesson 1 — the only lesson with video)

| File | Before | After | Change |
|---|---:|---:|---:|
| osmosis-turgor.mp4 | 2.77 MB (1280×720, no poster) | 887 KB (854×480 + poster) | −68% |
| casparian-strip.mp4 | 2.77 MB (1280×720, no poster) | 1.08 MB (854×480 + poster) | −61% |
| **Total** | **5.53 MB** | **1.97 MB (−64%)** | |

Fix: re-encoded with `ffmpeg` (H.264, CRF 27, audio kept at 96kbps AAC — the
original audio track was preserved since it's real content, not decoration) and
downscaled to 854px width, which is still well above the element's rendered
size (the CSS caps these at `max-height: 320px` / a ~580px-wide column). Added
`+faststart` for progressive playback start, and generated a poster frame for
each so there's no black flash before metadata loads. `preload="metadata"` was
already correctly set in the original markup — no change needed there.

### Fonts (all 4 pages)

**Before:** the hub loaded fonts via a normal `<link>`, but Lesson 1's own
`style.css` loaded Cairo/Noto Sans Arabic via `@import` inside the stylesheet —
which the browser can't discover until it has already fetched and started
parsing that CSS file, adding a full extra round-trip before Arabic body text
can render in its final font. Lessons 2 and 3 had no explicit web-font link at
all (falling back to system fonts), and the new manga system font (`Anton`) was
initially wired up the same way — via `@import` in `manga-system.css`.

**After:** every page now loads one consolidated `<link rel="stylesheet">`
(plus `preconnect` to `fonts.googleapis.com`/`fonts.gstatic.com`) directly in
`<head>`, discoverable by the browser's preload scanner before any CSS has to
be parsed. The `@import` in Lesson 1's `style.css` and in `manga-system.css`
was removed. This is a request-waterfall fix (fewer serial round-trips before
text renders in its final font), not a byte-size fix — Google Fonts' own CSS
response is small either way.

### Scroll handlers (Lessons 1, 2, 3 — identical pattern in all three)

**Before:** each lesson's "reading progress bar" ran a `window.addEventListener
('scroll', …)` with no `{ passive: true }` and no throttling — every scroll
event synchronously wrote `element.style.width`, which on a low-end phone
firing scroll at high frequency causes layout thrashing and janky scrolling
(exactly the pattern the brief called out under "Scroll Performance").

**After:** all three now use a `requestAnimationFrame` ticking-flag pattern
(one style write per animation frame, not per scroll event) and `{ passive:
true }` on the listener (so the browser doesn't have to wait for the handler
before it can start scrolling). Behavior is visually identical — verified by
screenshot — just no longer blocking the compositor.

### Script loading (all 4 pages)

**Before:** all `<script src="…">` tags (main.js on the hub; app/quiz/flashcards
on each lesson; 12 separate small files on Lesson 3) sat at the end of `<body>`
with no `defer`. This is close to `defer` in practice (scripts are already
after all content) but still blocks the parser at that point while each file is
fetched+executed in sequence.

**After:** added `defer` to every `<script>` tag. Execution order is preserved
(deferred scripts still run in document order, and still after DOM parsing) —
this is a strictly-safe change, not a behavioral one.

## Total project payload

| | Before | After |
|---|---:|---:|
| On-disk project size | 12 MB | 7.4 MB |
| Bytes a modern browser actually downloads for Lesson 1's media (images+video) | ~11.3 MB | **~2.5 MB (−78%)** |

(On-disk size still includes the PNG fallback files, which is why it doesn't
drop as far as the "bytes actually downloaded" number — the PNGs only get
fetched by browsers without WebP support.)

## Verified no regressions

- All 4 pages screenshotted full-page before and after; visually identical
  layout, spacing, and content.
- Lesson 1's video posters, image framing, and zoom-modal (`.zoomable-image` →
  `#modal-img`) still work — the modal JS reads `img.src`, which still resolves
  to the (now-optimized) PNG fallback, so no JS changes were needed there.
- Checked browser console on all 4 pages after every change; no new errors
  introduced (one pre-existing, unrelated 403 on a missing favicon on all 4
  pages — present before this pass too, not something this work touched).
- Reading-progress bar behavior confirmed unchanged, just throttled.

## Not done (explicitly, so scope is honest)

The original brief is a full production-performance-audit spec (JS module
splitting, service-worker/PWA caching strategy, IntersectionObserver-based lazy
init for quiz/flashcards, DOM-query caching audit inside each `app.js`,
debounced search input, font subsetting, bundling Lesson 3's 12 small script
files). These were **not** implemented in this pass:

- No JS architecture changes (module splitting into `js/core|ui|quiz|...`) —
  each lesson's `app.js`/`quiz.js`/`flashcards.js` already load in a sensible
  order and are small (107–386 lines); splitting them further has real
  refactor risk for limited measured benefit given their size.
- No service worker / offline caching — not present before, and adding one
  safely (cache versioning, update strategy) is a separate, riskier project of
  its own that deserves dedicated testing rather than being folded in here.
- Lesson 3's 12 separate small `<script>` files (content/prompts data) were not
  bundled into one file — real request-count win, but combining them risks
  load-order/global-scope bugs that need per-file inspection to do safely; left
  as a flagged opportunity rather than guessed at.
- No systematic DOM-query-caching pass inside each `app.js`/`quiz.js` —
  the scroll-handler fix was the one *measured, repeated* pattern found in the
  audit; a line-by-line query-caching pass across ~1,900 lines of JS wasn't
  completed and would need its own review pass to avoid subtle state bugs in
  the quiz/flashcard logic.

If you want the next pass to pick one of these up, the JS module split and the
Lesson-3 script bundling are the two with the best effort-to-benefit ratio.
