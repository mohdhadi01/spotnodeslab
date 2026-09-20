# SpotNodes — spotnodes_web

Marketing site for SpotNodes, a software engineering studio.
React 19 · Vite · Tailwind CSS 4 · Framer Motion · GSAP · Lenis.

## Run it

```bash
npm install
npm run dev        # local dev server
npm run build      # production build → dist/
npm run preview    # preview the production build
```

## Editing content — one file: `src/data/site.json`

Almost everything on the site is data-driven. Edit `src/data/site.json`
and the UI updates — no component changes needed.

| Key | Controls |
| --- | --- |
| `brand` | Name shown in header/footer/browser tab |
| `seo` | Browser tab title + meta description |
| `nav` | Menu links (label + `#section` anchor) |
| `hero` | Eyebrow, headline, sub, buttons, availability pill, capability marquee |
| `hero.headline` | Array of lines; each line is an array of segments. Add `"serif": true` to a segment to render it in the blue italic serif accent |
| `hero.visual` | The 3 product screenshots floating in the hero (paths in `/public/images/`) |
| `work.featured` | The case-study cards (click → case modal). `accent` colors the dot markers, `image` is the screenshot |
| `work.archive` | The "More builds & experiments" grid |
| `services.items` | Accordion rows — title, description, tech stack chips, optional "Seen in X" link |
| `process.steps` | The horizontal scroll steps (desktop) / stacked list (mobile) |
| `studio` | Manifesto paragraph, count-up stats, principles, leadership team cards |
| `contact` | Heading, email, socials (empty `url` = hidden), form labels |
| `footer` | Tagline, location, back-to-top label |

### Images

Project screenshots live in `public/images/` and are referenced by path from
the JSON. To swap a screenshot: drop the new file in `public/images/` and
update the path in `site.json` (or just overwrite the file keeping the same
name). Team photos are `/akhilesh.png` and `/hadi.jpeg` in `public/`;
résumé PDFs live there too.

### Contact form

Submissions POST to a Google Apps Script endpoint. Set it in `.env`:

```
VITE_GOOGLE_APPS_SCRIPT_URL="https://script.google.com/macros/s/.../exec"
```

### ⚠️ Update before going live

- `contact.email` — currently a placeholder (`hello@spotnodes.dev`). Set the real inbox.
- `contact.socials` — LinkedIn / X URLs are empty (hidden until filled).
- favicon: `public/favicon.svg` (inline SVG, matches the node mark).

## Where the design lives

- `src/index.css` — design tokens: colors, fonts, type scale, shadows (Tailwind 4 `@theme`)
- `src/data/site.json` — all content (see above)
- `src/components/sections/` — Hero, Work, Services, Process, Studio, Contact
- `src/components/ui/` — Reveal/Headline, Magnetic, Cursor, Marquee, NodeField (hero canvas), Preloader
- Fonts: Clash Display + Satoshi (Fontshare), Instrument Serif + JetBrains Mono (Google Fonts)
