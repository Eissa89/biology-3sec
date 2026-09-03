# CINEMATIC ANATOMICAL ATLAS — Design Plan Details

## 01 — Design Direction
- **Identity**: CINEMATIC ANATOMICAL ATLAS
- **Theme**: Digital X-Ray Laboratory + Anatomical Blueprint + Cinematic Documentary
- **Tone**: High Scientific Rigor, Premium Educational UX, RTL Mobile-first, Clean & Non-distracting
- **Key Feel**: REAL BONE textures, X-Ray Cyan scanning, Precise anatomical labels, Translucent cross-sections, Slow clinical camera sweeps, Blueprint grid accents.

## 02 — Color Palette & Tokens
- **Obsidian (`#080A0F`)**: Core Background / Space
- **Bone (`#E9E4D8`)**: Primary Bones & Structural Elements
- **X-Ray Cyan (`#70E8FF`)**: Scans, Overlays, Active Highlights
- **Deep Cyan (`#145D70`)**: Secondary Anatomical Accents & Borders
- **Anatomical Crimson (`#D8495B`)**: Spinal Cord, Neural Paths, Exam Traps, Warnings
- **Bone Shadow (`#596273`)**: Muted Skeleton / Background Contrast
- **Medical Gold (`#D6B66A`)**: Key Quantitative Data & visual anchors
- **Muted Text (`#9AA4B5`)**: Subtitles & Description labels
- **White (`#F7F8FA`)**: High-contrast Primary Body Text

## 03 — Typography System
- **Hero Title**: Bold Arabic Header ("الهيكل العظمي الكامل")
- **Subtitle**: "Axial & Appendicular Skeleton — الصف الثالث الثانوي"
- **Data Callouts**: Giant visual numbers (`206`, `33`, `26`, `37`, `22`, `12`, `24`) as anchor visual elements.

## 04 — Layout & Responsive Strategy
- **Desktop**: Sticky Sidebar Navigation, Split-screen Anatomical Views, Wide Cinematic Stage.
- **Mobile**: Compact Top Header, Bottom Navigation Bar, Touch-swipe cards, Collapsible Specimen Details, Zoomable SVGs.

## 05 — Motion & Accessibility
- Respect `prefers-reduced-motion` with static fallbacks.
- Smooth GSAP ScrollTrigger scanning lines and vertebra cross-section transitions.
- High contrast compliant typography (WCAG AAA for primary text).
