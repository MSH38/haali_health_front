import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ChevronLeft, ChevronRight } from 'lucide-react'

/**
 * Breadcrumb trail. The chevron direction follows the reading direction,
 * so the arrow points "forward" in both LTR and RTL.
 */
export default function Breadcrumbs({ current, tone = 'dark' }) {
  const { t, i18n } = useTranslation()
  const isRtl = i18n.resolvedLanguage === 'ar'
  const Chevron = isRtl ? ChevronLeft : ChevronRight

  const light = tone === 'light' // light = sitting on a dark background

  return (
    <nav aria-label="Breadcrumb">
      <ol
        className={`flex flex-wrap items-center gap-1.5 text-xs font-semibold ${
          light ? 'text-white/50' : 'text-navy-800/50'
        }`}
      >
        <li>
          <Link
            to="/"
            className={`rounded transition-colors ${
              light ? 'hover:text-mint-300' : 'hover:text-mint-700'
            }`}
          >
            {t('pages.common.home')}
          </Link>
        </li>
        <li aria-hidden="true" className="opacity-50">
          <Chevron className="h-3.5 w-3.5" />
        </li>
        <li aria-current="page" className={light ? 'text-white/90' : 'text-navy-900'}>
          {current}
        </li>
      </ol>
    </nav>
  )
}
