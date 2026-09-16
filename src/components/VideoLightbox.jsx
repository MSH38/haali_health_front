import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { X } from 'lucide-react'

/** Swap for a CDN URL before launch — nothing else needs to change. */
export const VIDEO_SRC = '/media/haali-overview.mp4'

const VideoContext = createContext(() => {})

/** `const openVideo = useVideo()` — call it to open the player. */
export const useVideo = () => useContext(VideoContext)

export function VideoProvider({ children }) {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const videoRef = useRef(null)
  const closeRef = useRef(null)
  const lastFocused = useRef(null)

  const openVideo = useCallback(() => {
    lastFocused.current = document.activeElement
    setOpen(true)
  }, [])

  const close = useCallback(() => {
    setOpen(false)
    // Return focus to whatever opened the player.
    lastFocused.current?.focus?.()
  }, [])

  // Escape to close; lock the page behind the overlay.
  useEffect(() => {
    if (!open) return

    const onKey = (e) => {
      if (e.key === 'Escape') close()
    }
    document.addEventListener('keydown', onKey)

    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    closeRef.current?.focus()

    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open, close])

  // Stop playback when the dialog unmounts so audio never outlives it.
  useEffect(() => {
    if (open) return
    const v = videoRef.current
    if (v) {
      v.pause()
      v.currentTime = 0
    }
  }, [open])

  return (
    <VideoContext.Provider value={openVideo}>
      {children}

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={t('video.title')}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
        >
          {/* Backdrop */}
          <button
            type="button"
            aria-label={t('video.close')}
            onClick={close}
            className="absolute inset-0 cursor-default bg-navy-950/85 backdrop-blur-sm"
          />

          <div className="relative z-10 w-full max-w-5xl">
            <div className="mb-3 flex items-center justify-between gap-4">
              <h2 className="text-sm font-bold text-white/90 sm:text-base">{t('video.title')}</h2>
              <button
                ref={closeRef}
                type="button"
                onClick={close}
                aria-label={t('video.close')}
                className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/20 text-white/80 transition-colors hover:border-white/50 hover:bg-white/10 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="overflow-hidden rounded-2xl border border-white/15 bg-black shadow-2xl">
              <video
                ref={videoRef}
                src={VIDEO_SRC}
                className="aspect-video w-full"
                controls
                autoPlay
                playsInline
                preload="metadata"
                controlsList="nodownload"
              />
            </div>
          </div>
        </div>
      )}
    </VideoContext.Provider>
  )
}
