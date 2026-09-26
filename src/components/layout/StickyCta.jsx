import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowLeft, ArrowRight, X } from 'lucide-react'

/**
 * Sticky "Book a Demo" banner pinned to the bottom of secondary pages.
 *
 * Appears after a little scrolling so it never covers the page header on
 * arrival, and is dismissible — a bar the reader cannot close is hostile on
 * a legal page they are trying to read carefully.
 */
export default function StickyCta() {
  const { t, i18n } = useTranslation()
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const Arrow = i18n.resolvedLanguage === 'ar' ? ArrowLeft : ArrowRight

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (dismissed) return null

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 transition-all duration-500 ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-full opacity-0'
      }`}
    >
      <div className="border-t border-white/10 bg-navy-950/95 backdrop-blur-xl">
        <div className="container-x flex flex-col items-center gap-4 py-4 sm:flex-row sm:justify-between sm:py-5">
          <div className="text-center sm:text-start">
            <p className="text-sm font-bold text-white sm:text-base">{t('pages.common.ctaTitle')}</p>
            <p className="mt-0.5 text-xs text-white/50 sm:text-sm">{t('pages.common.ctaBody')}</p>
          </div>

          <div className="flex w-full shrink-0 items-center gap-2 sm:w-auto">
            <Link to="/#contact" className="btn-gradient group flex-1 sm:flex-none">
              {t('pages.common.ctaButton')}
              <Arrow className="h-4 w-4 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
            </Link>
            <button
              type="button"
              onClick={() => setDismissed(true)}
              aria-label={t('nav.close')}
              className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-white/15 text-white/50 transition-colors hover:border-white/35 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
