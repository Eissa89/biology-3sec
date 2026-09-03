# UPGRADE-LOG — Session 2

Follow-up engineering pass on top of the existing manga-ink redesign
(see DESIGN-SYSTEM.md, PERFORMANCE-REPORT.md, OPTIMIZATION-LOG.md for the
original build). Goal: turn three independent, well-built lesson pages into
one cohesive, production-grade learning platform. Everything below was
implemented and verified with an automated headless-browser test pass
(Playwright) against a local server — not just written and assumed to work.

## What was added

**Cross-lesson progress tracking** (`js/progress.js`, `js/progress-ui.js`,
`css/progress.css`)
A shared `localStorage` record, written by each lesson's quiz on completion
and read by a new "My Progress" section on the hub. Shows per-lesson
status (not started / completed with score), and unlocks a printable
certificate of completion (student name + all three scores) once all three
lessons are done. No backend, no accounts — but it's the difference between
"three pages" and "a platform that remembers the learner."
Verified: quiz completion in each lesson writes a score visible from the
hub in the same browsing session; language toggle re-renders the panel
correctly; reset button clears state; certificate populates correctly.

**PWA support** (`manifest.json`, `sw.js`)
Installable web app (icons, theme color, standalone display) with a runtime
caching service worker — a student who's opened a lesson once can reopen it
with a weak or no connection. Deliberately has no hardcoded precache list
(the project's folder names are Arabic and could be deployed under any base
path), so it caches opportunistically as pages are actually visited instead.
Registered from all 4 pages with deploy-path-agnostic relative paths.
Verified: registers successfully with the correct scope from the hub and
all three lesson subfolders.

**Favicon & app icons**
Previously missing entirely (a real 403 in the wild). Added `favicon.svg`
(brand mark, matches the ink/red palette) plus rasterized PNGs at 16/32/180/
192/512px for browser tabs, `apple-touch-icon`, and PWA manifest icons.

**Dead code removed**
Lesson 3 was loading 10 `<script>` files from `prompts/` (an AI
image-generation prompt reference library — see that folder's own README)
on every single page visit, even though nothing in the runtime code ever
reads them. Confirmed unused via search before removing; files are kept on
disk as documentation, just no longer shipped to visitors as extra requests.

**SEO / discoverability**
Open Graph + Twitter Card meta tags, `Course`/`LearningResource` JSON-LD
structured data, `sitemap.xml`, and `robots.txt` on the hub page.
Note: the sitemap and robots.txt use a `REPLACE-WITH-YOUR-DOMAIN`
placeholder — the real hosting domain wasn't known at build time, so swap
that in before publishing.

**Accessibility fixes** (real issues found via WCAG contrast math + markup
audit, not a cosmetic pass)
- Two range sliders (`#auxin-slider`, `#contractile-slider`) and the five
  numbered tendril-lab step buttons had no accessible name beyond raw
  numbers/no label at all — added `aria-label`s describing what each one
  actually does. Added `aria-live="polite"` to the text spans next to them
  so a screen reader announces the result as the value changes.
- Two icon-only buttons (`#theme-toggle` in lesson 2, `#modal-close` in
  lesson 1) had no accessible name — added `aria-label`s.
- Six colour/text combinations across the hub and all three lessons used
  the brand red (`--m-red`, #DD2318) at normal/small text sizes on the
  paper background, which measures **4.11:1** — under WCAG AA's 4.5:1
  minimum for text that size (confirmed by calculation, not eyeballing).
  Swapped those specific rules to `--m-red-dark` (#A3150C, **6.67:1**,
  passes AA), which is already part of the existing design system, so
  nothing new was introduced — just a more careful choice of which
  existing token to use where. Every other `--m-red` usage (headings,
  numerals, badges, borders — anything large enough to only need 3:1)
  was left untouched, and each change was screenshotted before/after to
  confirm no visual regression.

## What's still not done (being upfront, matching this project's own habit
of listing gaps rather than glossing over them)

- No 4th lesson / expanded curriculum coverage.
- No CSS/JS bundling or minification — files are still shipped as
  individually authored/organized units. Given the current per-lesson file
  count is already modest after removing the 10 dead prompt scripts, the
  remaining request-count benefit of bundling is small relative to the risk
  of introducing a build step into what is currently a zero-build static
  site.
- `sitemap.xml` / `robots.txt` need the real domain substituted in before
  going live.
- No server-side analytics — progress tracking is entirely local to each
  student's browser/device and is lost if they clear site data or switch
  devices.

# UPGRADE-LOG — Session 3

Content-correctness pass rather than an infrastructure one: fixing a
media-matching bug in Lesson 1 and completing Lesson 2's curriculum
coverage. Lesson 3 was intentionally left untouched, pending its own
dedicated pass once 1 and 2 are settled.

## What was added

**Lesson 1 — Fixed image/video-to-section mismatch** (`أول درس/index.html`)
All 5 illustrations were sitting under the wrong heading — some pairs were
straightforwardly swapped between two sections, others carried `alt` text
describing content the image didn't actually show. Confirmed by opening
and visually inspecting each of the 5 source PNGs directly (the existing
`alt` text couldn't be trusted, since it was itself part of the mismatch)
against what each section actually teaches:
- The turgor-pressure/plasmolysis illustration and the tissue-cross-section
  illustration were swapped between the osmosis section (`phys-section`)
  and the structural-support section (`structural-section`) — the existing
  Arabic captions were already correct; only the image files pointed to
  the wrong picture.
- A second, bilingual turgor-pressure/plasmolysis illustration had no
  section at all — moved into "الفجوة العصارية وضغط الامتلاء"
  (`vacuole-turgor`), which previously shipped with zero media despite
  being the one section actually about turgor pressure.
- Two wall-thickening diagrams (cellulose/lignin/suberin/cuticle) were
  sitting together under "الأنسجة والفلين" with backwards `alt` text;
  split apart and moved to "السليلوز واللجنين" (`deposits-cellulose`) and
  "الكيوتين والسيوبرين" (`deposits-cutin`) — the two sections whose entire
  subject is those specific materials, and which previously had no
  illustrations of their own.
- The Casparian-strip section's image was removed rather than reassigned:
  none of the 5 uploaded illustrations actually depict a Casparian strip
  or endodermis, so forcing one in would just relocate the mismatch
  instead of fixing it. The section's video (which is correct) now stands
  on its own.
Net result: same 5 images, same 2 videos, zero assets added or removed —
just placed where their actual content matches the heading above them.
Verified by inspecting every image directly, re-reading each destination
section's text, and confirming HTML tag balance (`div`/`section` open =
close counts) after every edit.

**Lesson 2 — Completed the skeletal system: added the appendicular
skeleton** (`ثاني درس/`)
The lesson's own `compiled-spec.md` was literally titled "Lesson 02: Axial
Skeleton" — the appendicular skeleton (pectoral girdle, pelvic girdle,
upper and lower limbs) was mentioned only as a one-line comparison in
Chapter 02 and never actually taught, despite the hub page and Chapter
01/02 already advertising the full "206 bones" / "126 appendicular"
figures. Two new chapters were inserted right after the axial deep-dives:
- **Chapter 06 — الحزام الصدري والطرف العلوي (Pectoral Girdle & Upper
  Limb)**: clavicle + scapula (4 bones), and the 30-bone free upper limb
  (humerus, radius/ulna, 8 carpals, 5 metacarpals, 14 phalanges) × 2 = 60.
  Includes a schematic inline SVG matching the existing anatomical-diagram
  style.
- **Chapter 07 — الحزام الحوضي والطرف السفلي (Pelvic Girdle & Lower
  Limb)**: the 2-bone pelvic girdle and its sacroiliac joint, and the
  30-bone free lower limb (femur, patella, tibia/fibula, 7 tarsals, 5
  metatarsals, 14 phalanges) × 2 = 60. Closes with a callout tying the new
  numbers back to ones already on the page: 4 + 60 + 2 + 60 = 126, and
  126 + 80 = 206.
This pushed the former chapters 06–08 (Connections, Exam Traps, Final
Test) to 08–10 — updated everywhere: section `id`s, sidebar nav, mobile
bottom nav, `data/lesson.json`, and the `chapter` field on every existing
question/flashcard that referenced them. 5 new quiz questions and 5 new
flashcards were added for the new material (including two new exam-trap
cards: pelvis-vs-pelvic-girdle, and the commonly-forgotten patella), and
2 pre-existing exam-trap questions/flashcards were renumbered into the
now-9th trap chapter. The hero title/subtitle, page `<title>`, meta
description, and hero SVG were broadened from "الهيكل المحوري" (axial
only) to "الهيكل العظمي الكامل" (complete skeleton) — the SVG now also
outlines the limbs, previously described in the lesson's own
storyboard.md as deliberately "muted".
Also fixed while touching this: the embedded JS fallback arrays in
`quiz.js` and `flashcards.js` (used for `file://` access without CORS)
had drifted out of sync with `data/questions.json` /
`data/flashcards.json` — they were missing the two exam-trap items even
before this session. Both fallbacks now mirror their JSON files exactly,
13 items each.
Verified: all 3 JSON data files parse; both JS files pass a syntax check;
all 5 inline SVGs (2 new + 3 pre-existing) are well-formed XML;
`div`/`section` tag counts balance before and after; chapter IDs run
1→10 with no gaps or duplicates across `index.html`, `lesson.json`,
`questions.json`, and `flashcards.json`. This was static verification
(file parsing, tag balancing, cross-file ID matching), not a
browser-driven test pass like Session 2's Playwright run — no headless
browser was available in this session, so an actual click-through is
still worth doing before publishing.

**Lesson 2 documentation kept in sync**
`compiled-spec.md`, `storyboard.md`, `decisions.md`, and
`design-plan-details.md` all described the lesson as axial-only; updated
each to reflect the appendicular addition (new official-curriculum bone
counts, renumbered storyboard chapters, a dated `decisions.md` entry
explaining the chapter-renumbering rationale).

## What was intentionally left alone

- **Lesson 3** — not opened, not touched. Its own dedicated pass comes
  after lessons 1 and 2 are settled, per instruction.

## What's still not done (carried over from Session 2 — still true)

- No 4th lesson / expanded curriculum coverage beyond what Lessons 1–3
  already cover.
- No CSS/JS bundling or minification, for the same reasoning as Session 2.
- `sitemap.xml` / `robots.txt` still need the real domain substituted in
  for `REPLACE-WITH-YOUR-DOMAIN` before going live.
- No server-side analytics — progress tracking is still local-only.
- New this session: Lesson 2's appendicular content hasn't been
  proofread in an actual browser yet (fonts, RTL layout, SVG scaling at
  mobile widths) — the checks above are structural/static, not visual.
- Lesson 3 has not been looked at yet at all.
