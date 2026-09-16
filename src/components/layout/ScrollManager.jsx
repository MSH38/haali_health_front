import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Route-aware scrolling.
 *
 * Navigating to a new page starts at the top; navigating to a hash
 * (e.g. /#contact from another page) scrolls to that section once it has
 * mounted. Honours prefers-reduced-motion.
 */
export default function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const behavior = reduced ? 'auto' : 'smooth'

    if (hash) {
      // Wait a frame so the target section exists before scrolling to it.
      const id = requestAnimationFrame(() => {
        document.querySelector(hash)?.scrollIntoView({ behavior, block: 'start' })
      })
      return () => cancelAnimationFrame(id)
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname, hash])

  return null
}
