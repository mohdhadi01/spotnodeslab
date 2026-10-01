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
| `hero` | Badge, headline, sub, CTAs, stat chips, the "Free intro call" availability card, capability marquee |
| `hero.headline` | Array of lines; each line is an array of segments. Add `"mark": true` to a segment for the blue highlighter accent |
| `hero.card` | The hero booking card — title, length, note, timezone |
| `work.featured` | Flagship case-study cards in the filterable grid. `platforms` (mobile/web/web3) drives the filter tabs, `device: "phone"` + `phoneImage` render a phone mockup (fallback: browser frame), `siteUrl` appears in the fake address bar, `status`/`timeline` show as chips. Missing screenshots render a tinted blueprint wireframe. Click → case modal. Note: no external app/store/web links are rendered anywhere in the work section by design (per client decision); an optional `links[]` array is still supported if that ever changes |
| `work.filters` | The platform filter tabs (id + label) |
| `work.more` | One merged grid of independent builds + earlier client work; each item has a `group` tag ("Independent build" / "Earlier client work"). Odd counts get a CTA filler cell automatically |
| `work.sideEngineering` | The compact "Lab notes" list |
| `ctaBand` | The blue "Have something in mind?" banner |
| `services.items` | Bento cards — title, tagline, description, stack chips, icon (`globe\|smartphone\|gamepad\|trending`) |
| `engagements.items` | Pricing cards (`featured: true` gets the accent border + "Most popular"). `cta.prefill` pre-fills the message form |
| `process.steps` | Sticky-number walkthrough — num, title, description, `youGet` chip |
| `studio` | Manifesto paragraph, count-up stats, leadership team cards |
| `faq.items` | Accordion questions/answers |
| `connect` | Conversion hub: `schedule` (slots, daysAhead, skipWeekend, form labels), `message` (form labels), `direct` (email, `whatsapp` — empty = hidden, socials) |
| `footer` | Tagline, location, back-to-top label |

### Images

Project screenshots live in `public/images/` and are referenced by path from
the JSON. To swap a screenshot: drop the new file in `public/images/` and
update the path in `site.json` (or just overwrite the file keeping the same
name). Team photos are `/akhilesh.png` and `/hadi.jpeg` in `public/`;
résumé PDFs live there too.

### Contact form + scheduler (zero config)

Both the message form and the intro-call scheduler forward submissions
straight to the inbox in `connect.direct.email` via FormSubmit — no signup,
no API key, no backend, no .env.

One-time activation: the FIRST submission ever makes FormSubmit email that
inbox a confirmation link. Click "Activate Form" in that email once, and
every later submission arrives as a nicely formatted email (subject lines:
"Intro call request: ..." / "New project enquiry (...)") with the sender's
name, email and message so you can reply directly.

### ⚠️ Update before going live

- `connect.direct.email` is set to spotnodeslab@gmail.com (used across site, footer and mailto links).
- `connect.direct.whatsapp` — empty (hidden). Set the number in international format, e.g. `919999999999`, to enable the WhatsApp button + dock item.
- `connect.direct.socials` — LinkedIn / X URLs are empty (hidden until filled).
- Scheduler slots are offered in IST from `connect.schedule.slots` — booking requests arrive in your Google Sheet with `type: "schedule-call"` and the chosen `slot`.
- favicon: `public/favicon.svg` (inline SVG, matches the node mark).

## Where the design lives

- `src/index.css` — design tokens: colors, fonts, type scale, shadows (Tailwind 4 `@theme`)
- `src/data/site.json` — all content (see above)
- `src/components/sections/` — Hero, Work, Services, Process, Studio, Contact
- `src/components/ui/` — Reveal/Headline, Magnetic, Cursor, Marquee, NodeField (hero canvas), Preloader
- Fonts: Clash Display + Satoshi (Fontshare), Instrument Serif + JetBrains Mono (Google Fonts)
