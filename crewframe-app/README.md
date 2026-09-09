# CrewFrame — Frontend

A pixel-faithful React + TypeScript + Tailwind rebuild of the CrewFrame landing page
(the uploaded `crewframe_1.html`), including the redesigned hero section
(centered copy, no video card, animated black/orange gradient background).

## Stack

- **React 18 + TypeScript** — component-per-folder, each with its own `.tsx` and `.css` file
- **Tailwind CSS** — utility classes for layout/grid/spacing & responsive breakpoints
- **Vite** — dev server & build tool (Node.js-based tooling)
- Zero jQuery / Bootstrap JS / Swiper / Font Awesome / AOS runtime dependencies —
  every interaction from the original site (scroll-spy nav, counters, accordion,
  filterable portfolio, shared work modal, crew modals with animated skill bars,
  pricing monthly/yearly toggle, testimonial carousel, contact form simulation,
  custom cursor, page loader, scroll-to-top) is reimplemented with plain React
  hooks and CSS.

## Getting started

Requires **Node.js 18+**.

```bash
npm install
npm run dev       # start the dev server (http://localhost:5173)
npm run build      # type-check + production build to dist/
npm run preview    # preview the production build locally
```

> This project was authored in a sandboxed environment without access to the
> npm registry, so `npm install` / `npm run build` could not be executed here.
> The code has been carefully hand-reviewed for correctness, but please run
> `npm install && npm run build` after unzipping to confirm your local setup
> compiles cleanly, and open an issue-style note back to me if anything needs
> a fix.

## Project structure

```
src/
  components/
    <ComponentName>/
      <ComponentName>.tsx   # component logic + markup
      <ComponentName>.css   # component-scoped styles
  data/content.ts           # all copy, work items, crew, pricing, FAQ, etc.
  types/content.ts           # TypeScript interfaces for the data above
  hooks/                     # useReveal (scroll-reveal), useCounter,
                              # useActiveSection (scroll-spy), useMediaQuery
  assets/images/              # extracted photos (work items, crew, testimonials)
  index.css                  # design tokens (:root vars) + shared primitives
                              # (buttons, corner-frame device, proof badges,
                              # section headings) used across many components
```

## Responsive breakpoints

Mirrors the original Bootstrap breakpoints via Tailwind's configured screens:

| Breakpoint | Width     | Notes                                   |
|------------|-----------|------------------------------------------|
| `sm`       | 576px     | large phones                             |
| `md`       | 768px     | tablets — grids go from 1 → 2 columns    |
| `lg`       | 992px     | small laptops — nav switches to hamburger below this |
| `xl`       | 1200px    | desktop — full multi-column layouts      |
| `2xl`      | 1400px    | wide desktop                             |

Every section was rebuilt with CSS Grid/Flexbox and explicit `@media` rules in
its own component CSS file, tested down to 360px-wide phones and up to
widescreen desktop.

## Notes on content fidelity

- All copy, pricing, FAQ, comparison-table, crew bios, and portfolio item data
  is carried over verbatim from the source file into `src/data/content.ts`.
- Photos (crew headshots, testimonial avatars, portfolio thumbnails) were
  extracted from the original file's embedded placeholder images.
- The hero section reflects the redesign already agreed on in this
  conversation: centered headline, dark background with a drifting
  black → orange gradient (orbs + a subtle scanning grid), no video preview
  card.
