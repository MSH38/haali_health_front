/**
 * Haali Health wordmark.
 *
 * This is the supplied brand artwork, not a type recreation — the print export
 * (`HaaliHealth - Print Export@4x.png`, 3133×443, charcoal #1C1C1C with the
 * "aa…i" glyphs in #7C3AED) converted to lossless WebP with its transparency
 * intact. The two purple glyphs spell **AI**; that is the point of the mark, so
 * it must never be recoloured as a single flat fill or a gradient sweep.
 *
 * Two lockups ship:
 *
 *   dark  → source colours, for light grounds (navbar, footer, body)
 *   light → charcoal remapped to white, purple stepped up to #A78BFA
 *           (7.4:1 on navy-950), for dark grounds
 *
 * The light lockup is generated from the same source by nearest-colour remap,
 * so the AI glyphs survive. Regenerate both together if the artwork changes.
 *
 * Sizing is explicit, not inherited: pass a height class (`h-7`, `h-8`…) via
 * `className`. Width follows the 7.09:1 aspect automatically.
 */

const SOURCES = {
  dark: '/media/brand/haali-health-logo.webp',
  light: '/media/brand/haali-health-logo-light.webp',
}

// Intrinsic size of the exported asset — set on the tag so the navbar never
// reflows while the logo decodes.
const INTRINSIC = { width: 900, height: 127 }

export default function BrandLogo({ variant = 'dark', className = '' }) {
  return (
    // dir="ltr" pins the physical box: the document itself is RTL, and the
    // mark must never mirror.
    <img
      dir="ltr"
      src={SOURCES[variant] ?? SOURCES.dark}
      alt="Haali Health"
      width={INTRINSIC.width}
      height={INTRINSIC.height}
      decoding="async"
      className={`w-auto max-w-full select-none ${className || 'h-8'}`}
    />
  )
}
