import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { CalendarDays, CheckCircle2, ExternalLink, Loader2, Mail } from 'lucide-react'
import Reveal from './Reveal'

// Override with VITE_CALENDLY_URL in .env if the booking page ever changes.
const CALENDLY_URL = import.meta.env.VITE_CALENDLY_URL || 'https://calendly.com/haalihealth-info/30min'

// Booking details must only ever go to Calendly over HTTPS — fail the build otherwise.
if (!/^https:\/\/calendly\.com\//.test(CALENDLY_URL)) {
  throw new Error(`VITE_CALENDLY_URL must be an https://calendly.com/ link, got "${CALENDLY_URL}"`)
}
const CALENDLY_SCRIPT = 'https://assets.calendly.com/assets/external/widget.js'

// Loads Calendly's widget script once, no matter how many times the section mounts.
let scriptPromise
function loadCalendly() {
  if (window.Calendly) return Promise.resolve(window.Calendly)
  scriptPromise ??= new Promise((resolve, reject) => {
    const s = document.createElement('script')
    s.src = CALENDLY_SCRIPT
    s.async = true
    s.onload = () => resolve(window.Calendly)
    s.onerror = () => {
      scriptPromise = undefined
      reject(new Error('Calendly failed to load'))
    }
    document.body.appendChild(s)
  })
  return scriptPromise
}

export default function Contact() {
  const { t } = useTranslation()
  const b = t('contact.booking', { returnObjects: true })
  const assurances = t('contact.assurances', { returnObjects: true })

  const widgetRef = useRef(null)
  const [status, setStatus] = useState('loading') // loading | ready | error

  useEffect(() => {
    const el = widgetRef.current
    let cancelled = false

    // Brand colours, minus the leading '#'.
    const url = new URL(CALENDLY_URL)
    url.searchParams.set('hide_gdpr_banner', '1')
    url.searchParams.set('primary_color', '007a4e')

    loadCalendly()
      .then((Calendly) => {
        if (cancelled || !el) return
        el.innerHTML = ''
        Calendly.initInlineWidget({ url: url.toString(), parentElement: el })
        setStatus('ready')
      })
      .catch(() => !cancelled && setStatus('error'))

    return () => {
      cancelled = true
      if (el) el.innerHTML = ''
    }
  }, [])

  return (
    <section id="contact" className="scroll-mt-20 bg-white py-20 lg:py-28">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-20">
          {/* Pitch */}
          <div className="text-center lg:text-start">
            <Reveal>
              <span className="eyebrow">
                <Mail className="h-3.5 w-3.5" />
                {t('contact.eyebrow')}
              </span>
              <h2 className="h2 mt-5">{t('contact.title')}</h2>
              <p className="lede mt-5">{t('contact.subtitle')}</p>
            </Reveal>

            <Reveal delay={120}>
              <ul className="mx-auto mt-8 max-w-md space-y-3 text-start lg:mx-0">
                {assurances.map((a) => (
                  <li key={a} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-mint-700" />
                    <span className="text-sm font-medium text-navy-800/75">{a}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Booking card */}
          <Reveal delay={160}>
            <div className="relative">
              <div
                className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-mint-400/15 to-navy-800/10 blur-2xl"
                aria-hidden="true"
              />

              <div className="relative overflow-hidden rounded-3xl border border-navy-100 bg-white shadow-lift">
                <h3 className="flex items-center gap-2 px-7 pt-7 text-xl font-extrabold text-navy-900 sm:px-9 sm:pt-9">
                  <CalendarDays className="h-5 w-5 text-mint-700" />
                  {b.title}
                </h3>

                <div className="relative mt-4">
                  {status === 'loading' && (
                    <div className="absolute inset-0 grid place-items-center text-sm text-navy-800/60">
                      <span className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        {b.loading}
                      </span>
                    </div>
                  )}
                  {/* Calendly injects its iframe here; dir=ltr stops RTL from mirroring it. */}
                  <div ref={widgetRef} dir="ltr" className="h-[680px] w-full" />
                </div>

                <p className="border-t border-navy-100 px-7 py-4 text-center text-xs leading-relaxed text-navy-800/45 sm:px-9">
                  {status === 'error' && <>{b.fallback} </>}
                  <a
                    href={CALENDLY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-semibold text-mint-700 hover:underline"
                  >
                    {b.fallbackLink}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                  <span className="mt-2 block">{b.privacy}</span>
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
