import { useTranslation } from 'react-i18next'
import { ArrowUp, Linkedin, Mail } from 'lucide-react'
import Logo from './Logo'

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
            <Logo variant="light" />
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
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-bold text-white">{col.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#top"
                      className="text-sm text-white/45 transition-colors hover:text-mint-400"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-7 sm:flex-row">
          <p className="text-xs text-white/35">
            © {year} HaaliHealth. {t('footer.rights')} · {t('footer.built')}
          </p>
          <a
            href="#top"
            className="inline-flex items-center gap-2 text-xs font-semibold text-white/45 transition-colors hover:text-mint-400"
          >
            <ArrowUp className="h-3.5 w-3.5" />
            {t('common.backToTop')}
          </a>
        </div>
      </div>
    </footer>
  )
}
