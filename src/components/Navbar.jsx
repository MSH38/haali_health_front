import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Globe, Menu, X } from 'lucide-react'
import BrandLogo from './BrandLogo'
import { useScrolled } from '../hooks/useReveal'

/** Section links are absolute (`/#id`) so they work from any route. */
const LINKS = [
  { id: 'how-it-works', key: 'nav.howItWorks' },
  { id: 'for-providers', key: 'nav.forProviders' },
  { id: 'vbhc', key: 'nav.vbhc' },
  { id: 'clinical-ai', key: 'nav.clinicalAi' },
  { id: 'security', key: 'nav.security' },
]

export default function Navbar() {
  const { t, i18n } = useTranslation()
  const { pathname } = useLocation()
  const scrolled = useScrolled(24)
  const [open, setOpen] = useState(false)

  const next = i18n.resolvedLanguage === 'ar' ? 'en' : 'ar'

  /**
   * The navbar sits over a dark band at the top of every route (the home hero
   * and the secondary-page header), so it renders light-on-dark at rest and
   * becomes the white glass bar once scrolled — or whenever the mobile sheet
   * is open, so the sheet never hangs off a transparent header.
   */
  const solid = scrolled || open

  // Close the mobile sheet whenever the route changes.
  useEffect(() => setOpen(false), [pathname])

  // Lock body scroll while the mobile sheet is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const toggleLang = () => {
    i18n.changeLanguage(next)
    setOpen(false)
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solid
          ? 'border-b border-navy-900/10 bg-white/80 shadow-[0_1px_24px_-8px_rgba(17,26,64,.25)] backdrop-blur-xl backdrop-saturate-150'
          : 'border-b border-white/10 bg-navy-950/20 backdrop-blur-sm'
      }`}
    >
      <nav className="container-x flex h-20 items-center justify-between gap-4">
        <Link to="/" className="shrink-0 text-2xl" aria-label="Haali Health">
          <BrandLogo variant={solid ? 'dark' : 'light'} />
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 xl:flex">
          {LINKS.map((link) => (
            <li key={link.id}>
              <Link
                to={`/#${link.id}`}
                className={`rounded-lg px-3 py-2 text-[13px] font-semibold 2xl:px-4 2xl:text-sm transition-colors ${
                  solid
                    ? 'text-navy-800/75 hover:bg-navy-50 hover:text-navy-900'
                    : 'text-white/80 hover:bg-white/10 hover:text-white'
                }`}
              >
                {t(link.key)}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop actions */}
        <div className="hidden items-center gap-3 xl:flex">
          <button
            type="button"
            onClick={toggleLang}
            title={t('nav.switchTo')}
            aria-label={t('nav.switchTo')}
            className={`inline-flex items-center gap-2 rounded-xl border px-3.5 py-2.5 text-sm font-bold transition-colors ${
              solid
                ? 'border-navy-800/15 text-navy-800 hover:border-navy-800/30 hover:bg-navy-50'
                : 'border-white/25 text-white hover:border-white/50 hover:bg-white/10'
            }`}
          >
            <Globe className="h-4 w-4" aria-hidden="true" />
            <span>{next.toUpperCase()}</span>
          </button>

          <Link
            to="/#contact"
            className={
              solid
                ? 'btn-primary'
                : 'btn bg-white text-navy-900 shadow-card hover:-translate-y-0.5 hover:bg-mint-400 hover:text-navy-950 hover:shadow-glow active:translate-y-0'
            }
          >
            {t('nav.cta')}
          </Link>
        </div>

        {/* Mobile trigger */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? t('nav.close') : t('nav.menu')}
          className={`grid h-11 w-11 place-items-center rounded-xl border transition-colors xl:hidden ${
            solid ? 'border-navy-800/15 text-navy-800' : 'border-white/25 text-white'
          }`}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile sheet — always light, since `solid` is forced true while open */}
      <div
        className={`overflow-hidden border-t border-navy-900/10 bg-white/95 backdrop-blur-xl transition-[max-height] duration-300 xl:hidden ${
          open ? 'max-h-[30rem]' : 'max-h-0 border-t-0'
        }`}
      >
        <ul className="container-x flex flex-col gap-1 py-5">
          {LINKS.map((link) => (
            <li key={link.id}>
              <Link
                to={`/#${link.id}`}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-3 text-base font-semibold text-navy-800 transition-colors hover:bg-navy-50"
              >
                {t(link.key)}
              </Link>
            </li>
          ))}
          <li>
            <Link
              to="/about"
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-3 text-base font-semibold text-navy-800 transition-colors hover:bg-navy-50"
            >
              {t('pages.about.breadcrumb')}
            </Link>
          </li>
          <li className="mt-3 flex items-center gap-3">
            <button
              type="button"
              onClick={toggleLang}
              className="inline-flex items-center gap-2 rounded-xl border border-navy-800/15 px-4 py-3 text-sm font-bold text-navy-800"
            >
              <Globe className="h-4 w-4" aria-hidden="true" />
              {next.toUpperCase()}
            </button>
            <Link to="/#contact" onClick={() => setOpen(false)} className="btn-primary flex-1">
              {t('nav.cta')}
            </Link>
          </li>
        </ul>
      </div>
    </header>
  )
}
