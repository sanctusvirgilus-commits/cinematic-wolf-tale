# Plan: "The Wolf of Scotland" - Cinematic Narrative Experience

Build a cinematic, atmospheric web-based storytelling experience based on the provided script about Ewan and Skoll.

## Scope Summary
- **Visual Style:** Cinematic, hyper-realistic, dark fantasy (simulated via high-quality imagery/CSS effects).
- **Core Experience:** A scrolling or slide-based narrative with synchronized audio-visual cues.
- **Components:** Teleprompter/Subtitle system, high-end visual transitions, ambient soundscape, and an interactive ending.
- **Constraints:** No database/Supabase. Client-side state only.

## Affected Areas
- `src/App.tsx`: Main entry and layout.
- `src/components/CinematicScene.tsx`: Reusable component for each scene with animations.
- `src/components/AmbientSoundtrack.tsx`: Audio management.
- `src/components/ui/teleprompter.tsx`: Adapt or use for narration display.
- `src/index.css`: Custom cinematic animations (fog, parallax, vignette).

## Assumptions & Open Questions
- **Visuals:** We will use high-quality Unsplash or placeholder URLs that match the "Scottish Highlands" and "Wolf" themes.
- **Audio:** We will use a royalty-free cinematic orchestral track (e.g., from a CDN) and ambient wind/howl sounds.
- **Navigation:** The experience will be a vertically scrolling immersion or a timed slideshow. A scroll-triggered approach (using Framer Motion) is preferred for a "cinematic" feel.

## Phases

### Phase 1: Foundation & Assets
- Setup project structure.
- Define the narrative data structure (Scene 1-7 + Ending).
- Source high-quality placeholders for imagery and ambient audio.
- **Owner:** frontend_engineer

### Phase 2: Cinematic Core (UI/UX)
- Implement `CinematicScene` component using Framer Motion for parallax and fade effects.
- Create an "Atmospheric Overlay" (vignette, grain, moving fog/mist using CSS/SVG).
- Integrate `Teleprompter` for the narration text.
- **Owner:** frontend_engineer

### Phase 3: Audio & Interaction
- Implement `AmbientSoundtrack` component with play/pause and volume controls (start on user interaction).
- Add "Scene Transitions" that trigger based on scroll position or manual navigation.
- **Owner:** frontend_engineer

### Phase 4: Final Polish & Ending
- Implement Scene 7 (The Mystery) with fading effects.
- Build the "Ending" screen with the call-to-action text and glowing wolf eyes animation.
- Quick fixes for CSS/typography (Scottish-inspired serif fonts).
- **Owner:** quick_fix_engineer

## Execution Handoff

**Plan status:** ready

**Dispatch order:**
1. frontend_engineer — Build the core cinematic engine and narrative scenes.
2. quick_fix_engineer — Refine typography, transitions, and finalize the "Ending" screen interactions.

**Per-agent instructions:**

### 1. frontend_engineer
- **Phases:** 1, 2, 3
- **Scope:** 
    - Create a data-driven narrative engine in `src/App.tsx`.
    - Build `CinematicScene` component using `framer-motion` for scroll-linked animations.
    - Implement a "Mist/Fog" overlay using CSS animations.
    - Setup audio handling for cinematic background music and sound effects (howls).
- **Files:** `src/App.tsx`, `src/components/CinematicScene.tsx`, `src/components/AmbientSoundtrack.tsx`, `src/index.css`.
- **Depends on:** none
- **Acceptance criteria:** All 7 scenes + ending are navigable; parallax/fade effects work; ambient audio plays; mobile-responsive.

### 2. quick_fix_engineer
- **Phases:** 4
- **Scope:** 
    - Polish the "Ending" screen (glowing eyes effect).
    - Ensure typography matches the "Dark Fantasy" aesthetic (use a serif font like 'Cinzel' or 'EB Garamond' if available via Google Fonts).
    - Minor CSS tweaks for the "Teleprompter" narration visibility.
- **Files:** `src/index.css`, `src/App.tsx`, `index.html`.
- **Depends on:** frontend_engineer
- **Acceptance criteria:** Final visual polish is applied; no text overflows; ending call-to-action is prominent.

**Do not dispatch:** supabase_engineer (out of scope).
