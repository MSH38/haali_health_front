/**
 * HAALI wordmark.
 *
 * The official logo colours each glyph individually, not as a gradient sweep —
 * verified pixel-wise against HAALI-Logo-1.png:
 *
 *     H   A   A   L   I
 *     ▉   ▉   ▉   ▉   ▉
 *   blue blue GREEN blue GREEN
 *
 * The two green letters spell **AI**. That is the whole point of the mark, so
 * the letters are coloured individually here — a left-to-right gradient would
 * destroy it.
 *
 * Contrast note: the exact brand green (#00FFA2 / mint-400) scores 1.33:1 on
 * white and is unreadable there, so the light-background lockup steps the
 * accent down to mint-600 (3.46:1, passes AA for large text). On dark
 * backgrounds the exact brand colours are used.
 */

// `ai: true` marks the glyphs that spell AI.
const WORDMARK = [
  { char: 'H', ai: false },
  { char: 'A', ai: false },
  { char: 'A', ai: true },
  { char: 'L', ai: false },
  { char: 'I', ai: true },
]

export default function Logo({ variant = 'dark', className = '' }) {
  const isLight = variant === 'light' // light = sitting on a dark background

  // Exact brand blue works on both grounds (4.07:1 on white, 4.05:1 on the hero).
  const blue = 'text-navy-500'
  const green = isLight ? 'text-mint-400' : 'text-mint-600'

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      {/* Mark: stylised "H" whose crossbar doubles as a pulse line */}
      <span
        className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl ${
          isLight ? 'bg-white/10 ring-1 ring-white/20' : 'bg-navy-950'
        }`}
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
          <defs>
            <linearGradient
              id="haali-mark"
              x1="0"
              y1="0"
              x2="24"
              y2="0"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#5170FF" />
              <stop offset="100%" stopColor="#00FFA2" />
            </linearGradient>
          </defs>
          <path
            d="M5 18V6M5 12h6.5M11.5 6v12M19 6.5v11"
            stroke="url(#haali-mark)"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </svg>
      </span>

      <span className="text-[1.3rem] font-extrabold tracking-tight">
        {/* Screen readers get the plain name, not five separate letters. */}
        <span className="sr-only">Haali Health</span>

        <span aria-hidden="true">
          {WORDMARK.map((letter, i) => (
            <span key={i} className={letter.ai ? green : blue}>
              {letter.char}
            </span>
          ))}
          <span className={isLight ? 'text-white/85' : 'text-navy-800'}>Health</span>
        </span>
      </span>
    </span>
  )
}
