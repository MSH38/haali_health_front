/**
 * Haali Health wordmark.
 *
 * Set in DM Sans, two weights, two colours:
 *
 *     H   a   a   l   i   H e a l t h
 *     ▉   ▉   ▉   ▉   ▉   ▉ ▉ ▉ ▉ ▉ ▉
 *     ─── bold 700 ─────   ── regular 400 ──
 *   char char PURP char PURP  ──── charcoal ────
 *
 * The two purple glyphs are the second "a" and the "i" — read together they
 * spell **AI**. Everything in the kerning table below exists to make that
 * reading available without shouting it: the glyphs between and around them
 * are pulled in so "a·l·i" closes into a tight cluster, and the gap before
 * "Health" is closed further so the whole thing reads as one word.
 *
 * Sizing is inherited. Give the parent a `text-*` class; every offset here is
 * in `em`, so the kerning holds at any size.
 *
 * Contrast note: the spec's charcoal is for light ground. This site puts the
 * lockup on `bg-navy-950` (footer) and over the dark hero (navbar at rest),
 * where #1C1C1C is invisible — `variant="light"` swaps the charcoal for white
 * and steps the purple up to #A78BFA, since #7C3AED on navy-950 is 3.0:1.
 */

const CHARCOAL = '#1C1C1C'
const PURPLE = '#7C3AED'

// Dark-ground substitutes. Hue is held; only lightness moves.
const CHARCOAL_ON_DARK = '#FFFFFF'
const PURPLE_ON_DARK = '#A78BFA' // 7.4:1 on navy-950

/**
 * `accent` marks the glyphs that spell AI.
 * `pull` is extra negative tracking applied to the right of that glyph, on top
 * of the -0.01em riding on the whole word.
 */
const HAALI = [
  { char: 'H', accent: false },
  { char: 'a', accent: false },
  { char: 'a', accent: true, pull: '-0.015em' }, // ─┐ closes the AI cluster
  { char: 'l', accent: false, pull: '-0.02em' }, //  ─┘ around the neutral "l"
  { char: 'i', accent: true, pull: '-0.025em' }, // runs "i" into "Health"
]

export default function BrandLogo({ variant = 'dark', className = '' }) {
  const isLight = variant === 'light' // light = sitting on a dark background

  const base = isLight ? CHARCOAL_ON_DARK : CHARCOAL
  const accent = isLight ? PURPLE_ON_DARK : PURPLE

  return (
    // dir="ltr" pins glyph order and the physical margins below: the document
    // itself is RTL, and the mark must never mirror.
    <span
      dir="ltr"
      className={`inline-block whitespace-nowrap font-brand leading-none ${className}`}
    >
      {/* Screen readers get the name, not eleven separate letters. */}
      <span className="sr-only">Haali Health</span>

      <span aria-hidden="true">
        <span style={{ fontWeight: 700, letterSpacing: '-0.01em' }}>
          {HAALI.map((letter, i) => (
            <span
              key={i}
              style={{
                color: letter.accent ? accent : base,
                marginRight: letter.pull,
              }}
            >
              {letter.char}
            </span>
          ))}
        </span>

        <span style={{ fontWeight: 400, letterSpacing: '0.005em', color: base }}>Health</span>
      </span>
    </span>
  )
}
