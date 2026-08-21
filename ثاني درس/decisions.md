# Key Design & Architectural Decisions — Lesson 02

## 1. Architectural Isolation
`ثاني درس/` is completely standalone and isolated from `أول درس/`. No files in `أول درس/` were modified, moved, or deleted.

## 2. Scientific Data Safety & Verification
All content in `data/lesson.json`, `data/flashcards.json`, and `data/questions.json` explicitly categorizes concepts into three clear taxonomy levels:
- `OFFICIAL_CURRICULUM` (Mined strictly from Ministry textbook: e.g. 206 total bones, 33 vertebrae, 5 regions, Skull protective box, Thoracic cage movement during respiration).
- `SUPPLEMENTARY_ANATOMY` (Anatomical depth like Atlas C1, Axis C2, specific ligament names).
- `NEEDS_SOURCE_VERIFICATION` (Disputed numbers like 32 vs 33 or total bone counts including auditory ossicles 22 vs 28). Disputed items are NOT used as single mandatory correct answers in quiz scoring.

## 3. Interactive SVG Visuals vs External Assets
All primary anatomical diagrams (Axial Skeleton overview, Vertebra cross-section & Neural Canal, Skull, Thoracic Cage, Pelvic Girdle connection, Direct vs Indirect map) are implemented as self-contained Inline SVGs with CSS & GSAP controls to eliminate external image dependencies and broken URLs.

## 4. Mobile UX & Navigation
Desktop uses a rich dark sidebar with X-ray cyan status indicators. Mobile uses a fixed bottom navigation bar with easy thumb targets for seamless navigation across all 8 chapters.
