import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowUp, Linkedin, Mail } from 'lucide-react'
import BrandLogo from './BrandLogo'

/**
 * Destinations for the footer link columns, matched positionally to
 * `footer.columns[].links` in the translation files. Kept here rather than in
 * the locale files so translators never have to touch a URL.
 *
 * Locked by the FINAL FOOTER specification (Review #22): Product deep-links
 * to the three How It Works steps plus VBHC; Company covers About, provider
 * value, security and conversion; Legal is Privacy Policy only. Terms of
 * Service, Data Processing and a second Security destination were removed
 * under Reviews #21/#22 and must not come back without a real destination.
 */
const COLUMN_HREFS = [
  ['/#step-1', '/#step-2', '/#step-3', '/#vbhc'],
  ['/about', '/#for-providers', '/#security', '/#contact'],
  ['/privacy'],
]

export default function Footer() {
  const { t } = useTranslation()
  const columns = t('footer.columns', { returnObjects: true })
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-navy-100 bg-navy-950 text-white/70">
      <div className="container-x py-14 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_repeat(3,1fr)] lg:gap-12">
          {/* Brand */}
          <div>
            <Link to="/" className="text-2xl" aria-label="Haali Health">
              <BrandLogo variant="light" />
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/45">
              {t('footer.tagline')}
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href="mailto:info@haalihealth.com"
                aria-label="Email"
                className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 text-white/60 transition-colors hover:border-mint-400/50 hover:text-mint-400"
              >
                <Mail className="h-4 w-4" />
              </a>
              <a
                href="https://www.linkedin.com/company/haali-health"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 text-white/60 transition-colors hover:border-mint-400/50 hover:text-mint-400"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {columns.map((col, ci) => (
            <div key={col.title}>
              <h3 className="text-sm font-bold text-white">{col.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link, li) => (
                  <li key={link}>
                    <Link
                      to={COLUMN_HREFS[ci]?.[li] ?? '/'}
                      className="text-sm text-white/45 transition-colors hover:text-mint-400"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/*
          Clinical / demo disclaimer (Review #21). It replaces the removed
          Terms page, so it is static text rather than a navigation item — the
          final footer specification deliberately lists no such link.
        */}
        <p className="mt-5 text-xs leading-relaxed text-white/35">
          {t('footer.disclaimer')}
        </p>

        {/* Bottom bar */}
        <div className=" flex flex-col mt-2 border-t-2 border-white/10 items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs mt-5 text-white/35">
            © {year} Haali Health. {t('footer.rights')} • {t('footer.built')}
          </p>
          <div className="flex items-center gap-5">
            <Link
              to="/privacy"
              className="text-xs text-white/35 transition-colors hover:text-mint-400"
            >
              {t('pages.privacy.breadcrumb')}
            </Link>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center gap-2 text-xs font-semibold text-white/45 transition-colors hover:text-mint-400"
            >
              <ArrowUp className="h-3.5 w-3.5" />
              {t('common.backToTop')}
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
