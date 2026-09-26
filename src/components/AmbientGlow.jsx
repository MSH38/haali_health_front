/**
 * Animated background for dark sections: a faint grid plus three slowly
 * drifting light sources — a brand green and two brand blues.
 *
 * Cycles are 18–28s and opacities low on purpose. This should read as a
 * room with living light in it, not as motion that competes with the copy.
 * Everything animates transform/opacity only (GPU-composited), and the
 * global prefers-reduced-motion rule in index.css freezes it entirely.
 */
export default function AmbientGlow({ grid = 56, intensity = 'normal' }) {
  const strong = intensity === 'strong'

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div
        className="absolute inset-0 bg-grid-navy"
        style={{ backgroundSize: `${grid}px ${grid}px` }}
      />

      <div
        className={`absolute -top-32 start-[-10%] h-[32rem] w-[32rem] rounded-full blur-[120px] animate-drift-a ${
          strong ? 'bg-mint-500/20' : 'bg-mint-500/15'
        }`}
      />
      <div
        className={`absolute bottom-[-12rem] end-[-6%] h-[34rem] w-[34rem] rounded-full blur-[130px] animate-drift-b ${
          strong ? 'bg-navy-400/30' : 'bg-navy-400/20'
        }`}
      />
      {/* Third light source, drifting on its own cycle. */}
      <div
        className={`absolute top-1/3 end-[18%] h-[22rem] w-[22rem] rounded-full blur-[120px] animate-drift-c ${
          strong ? 'bg-navy-500/25' : 'bg-navy-500/15'
        }`}
      />

      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-navy-950/50" />
    </div>
  )
}
