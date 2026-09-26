# HaaliHealth — Landing Page

B2B landing page for HaaliHealth, aimed at hospital executives in the GCC.

**Narrative:** hooks on AI **Voice Triage**, closes on **value-based care / PROMs** — attention from the voice layer, the buying decision from the reimbursement argument.

## Stack

React 18 (Vite) · Tailwind CSS 3 · react-i18next · react-helmet-async · lucide-react

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production bundle in dist/
npm run preview  # serve the built bundle
```

## Structure

```
src/
  App.jsx                  section composition
  i18n/
    index.js               i18next setup + <html lang/dir> sync
    locales/ar.json        ← all Arabic copy
    locales/en.json        ← all English copy
  hooks/useReveal.js       IntersectionObserver reveal + scroll tracker
  components/
    Seo.jsx                per-language meta, canonical, hreflang
    Navbar.jsx             sticky, glass-on-scroll, AR/EN toggle
    Hero.jsx               split layout + live-triage widget
    Challenge.jsx          the value-based-care problem
    HowItWorks.jsx         3-step zig-zag with video placeholders
    Benefits.jsx           stats row + 6 benefit cards
    Security.jsx           HIPAA + SDAIA/PDPL badges, HIS integration
    Contact.jsx            lead form with validation
    Footer.jsx
```

**No copy lives in components.** All text is in the two locale files, so translation and copy edits never touch JSX.

## Routes

| Path | Page | Audience |
|---|---|---|
| `/` | Landing page | Hospital executives |
| `/about` | About Us | Executives, clinical leadership |
| `/privacy` | Privacy Policy | Compliance, DPO, legal |
| `/terms` | Terms of Service & Medical Disclaimer | Legal, clinical governance |
| `/security` | Security & Compliance | CTO, CCIO, IT security audit |

Routing is `react-router-dom` with `BrowserRouter`. Unknown paths fall back to
the landing page. `ScrollManager` resets scroll on navigation and handles
cross-page hash links (`/#contact` from any route).

**Deep links need a server rewrite.** Configs are included for Netlify
(`public/_redirects`), Vercel (`vercel.json`) and Azure Static Web Apps
(`public/staticwebapp.config.json`). On nginx, add
`try_files $uri $uri/ /index.html;`. Without one, `/about` returns 404.

## ⚠️ Compliance claims — read before editing

`src/config/compliance.js` is the **single source of truth** for every
certification claim on the site. Each item carries a status:

| Status | Meaning | Renders as |
|---|---|---|
| `built` | Engineering fact, true in the product today | Mint, confident |
| `in-progress` | Being pursued, **not yet awarded** | Amber, dashed, "not yet certified" |
| `planned` | On the roadmap, not started | Muted |
| `certified` | Formally awarded, certificate in hand | Mint, confident |

**As of this build, no item is `certified`.** The Security page states this
explicitly rather than leaving it implied.

Hospital IT audit teams read these pages and will ask for the certificate.
Publishing "Certified" before one exists ends procurement and creates legal
exposure. To publish a newly awarded certification, change its `status` to
`'certified'` — nothing else in the codebase needs to change.

## Language & RTL

Arabic is the default (`fallbackLng: 'ar'`). The toggle calls `i18n.changeLanguage()`; a listener in `src/i18n/index.js` sets `<html lang>` and `<html dir>`, and the choice persists to `localStorage`.

Layout uses **logical properties** throughout (`ps-`/`pe-`, `ms-`/`me-`, `start-`/`end-`, `text-start`), so one stylesheet serves both directions — there is no mirrored CSS.

### Moving to /ar and /en URLs

The detector already lists `path` first, so it will pick up the segment as soon as routing exists:

1. `npm i react-router-dom`
2. Wrap `<App />` in a router with a `/:lng` route
3. On route change, call `i18n.changeLanguage(params.lng)`
4. Update `SITE` in `src/components/Seo.jsx`

`Seo.jsx` already emits the `hreflang` alternates those routes need.

## Design system

Both scales are **derived from the official HAALI logo**, sampled pixel-wise from
`HAALI-Logo-1.png`. The logo is a left-to-right ramp between exactly two colours:

| | Hex | Role |
|---|---|---|
| **Logo blue** | `#5170FF` | `navy-500` — brand blue |
| **Logo green** | `#00FFA2` | `mint-400` — brand green |

Every other step is generated at those same hues (blue **H=229**, green **H=158**),
so no tint drifts off-brand.

| Token | Value | Contrast on white | Use |
|---|---|---|---|
| `navy-500` | `#5170FF` | 4.07 | Brand blue — UI, focus ring, large text |
| `navy-800` | `#1A2A70` | 13.05 | Primary buttons, body text |
| `navy-900` | `#111A40` | 16.86 | Dark sections |
| `navy-950` | `#090E25` | 19.07 | Deepest surface, footer |
| `mint-400` | `#00FFA2` | 1.33 | Brand green — **dark backgrounds only** |
| `mint-700` | `#007A4E` | 5.39 | Green text on light backgrounds |
| `surface` | `#F5F8FF` | — | Blue-tinted light section background |

### The gradient

`bg-brand-gradient` reproduces the logo ramp (`100deg, #5170FF → #00FFA2`). It is
used on the hero CTA (`.btn-gradient`), the confidence meter, the logo mark, and
the wordmark via `.text-gradient`.

> **Contrast warning:** `mint-400` (`#00FFA2`) scores **1.33:1 on white** — it is
> unreadable as text on light backgrounds. On light sections use `mint-700` or
> darker. The palette comments in `tailwind.config.js` note this per step.

Fonts: **Tajawal** (Arabic, with Cairo fallback), **Inter** (English), loaded from Google Fonts in `index.html`. The font family swaps automatically on `html[dir]`.

Section rhythm alternates deliberately: dark hero → light → white → light → dark security → white contact → dark footer.

## Animations

`Reveal` wraps a section in a fade + rise driven by IntersectionObserver. It fires **once** and disconnects. `delay` staggers siblings.

```jsx
<Reveal delay={120}>…</Reveal>
```

`prefers-reduced-motion: reduce` is honoured globally — reveals resolve instantly and decorative loops stop.

## Placeholders to replace before launch

| What | Where |
|---|---|
| **Form submission** — currently a 900 ms mock + `console.info` | `src/components/Contact.jsx` → `onSubmit` |
| **Logo** — inline SVG wordmark | `src/components/Logo.jsx` |
| **Per-step footage** — all three frames open the same overview film | `src/components/HowItWorks.jsx` → `VideoPlaceholder` |
| **Video hosting** — 24.9 MB served from `public/` | `VIDEO_SRC` in `src/components/VideoLightbox.jsx` |
| **Hero widget** — animated mock triage session | `src/components/Hero.jsx` |
| **Real metrics** — no invented statistics are used | `benefits.stats` in both locale files |
| **Domain** — `https://haalihealth.com` | `SITE` in `src/components/Seo.jsx` |

## The overview film

`public/media/haali-overview.mp4` — 1920×1080, H.264/AAC, 2:43, 24.9 MB.

It plays in a lightbox (`VideoLightbox.jsx`), opened from two places:

- The hero's **"Watch How it Works"** button
- The play button on all three *How it Works* step frames

`preload="metadata"` means the file costs nothing until someone clicks. Escape
and the backdrop close it, focus returns to the trigger, and playback resets on
close so audio never outlives the dialog.

### Faststart

The source file shipped with its `moov` atom at the **end**, which forces a
browser to download all 24.9 MB before the first frame renders. The copy in
`public/media/` has been remuxed so `moov` sits at byte 32 — playback now starts
almost immediately and seeking works over HTTP range requests.

If the file is ever re-exported, re-apply this or playback will stall again:

```bash
ffmpeg -i input.mp4 -c copy -movflags +faststart public/media/haali-overview.mp4
```

### Still worth doing before launch

24.9 MB is heavy for GCC mobile connections. Recommended:

```bash
# ~5-8 MB at visually identical quality
ffmpeg -i haali-overview.mp4 -vf scale=1280:-2 -c:v libx264 -crf 24 \
       -preset slow -c:a aac -b:a 128k -movflags +faststart out.mp4

# poster frame, so the media panels show real footage instead of a gray frame
ffmpeg -i haali-overview.mp4 -ss 3 -vframes 1 -q:v 3 public/media/poster.jpg
```

Then move the file to a CDN and point `VIDEO_SRC` at it — that constant is the
only thing that needs to change.

## Notes on claims

The page makes **no fabricated performance numbers** (no "40% fewer ER visits"). The stat row uses qualitative markers only. Add real figures to `benefits.stats` once they can be substantiated.

Integration is shown **vendor-neutrally** — HL7/FHIR, REST API, sync, SSO — with no Epic or Cerner logos, since displaying partner marks without an agreement carries legal risk. Compliance badges pair **HIPAA** (international signal) with **SDAIA / PDPL** and **GCC data residency** (what a Gulf CIO actually asks about). A disclaimer under the panel notes that certifications are confirmed per deployment.
