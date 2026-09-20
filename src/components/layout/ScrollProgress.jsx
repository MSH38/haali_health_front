import { useEffect, useRef } from 'react'

/**
 * Thin brand-gradient bar across the very top of the viewport that fills as
 * the reader scrolls. Updated with rAF and a direct style write rather than
 * React state, so scrolling never triggers a re-render. Grows from the
 * reading-start edge in both LTR and RTL.
 */
export default function ScrollProgress() {
  const barRef = useRef(null)

  useEffect(() => {
    let frame = 0

    const update = () => {
      frame = 0
      const el = barRef.current
      if (!el) return
      const max = document.documentElement.scrollHeight - window.innerHeight
      const progress = max > 0 ? Math.min(window.scrollY / max, 1) : 0
      el.style.transform = `scaleX(${progress})`
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px]" aria-hidden="true">
      <div
        ref={barRef}
        className="h-full origin-left bg-brand-gradient rtl:origin-right"
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  )
}
