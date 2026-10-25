import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { CheckCircle2, Clock, ExternalLink, Loader2, Mail, Phone } from 'lucide-react'
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

    // Brand colours, minus the leading '#'. Event details are shown by us above the
    // calendar, so Calendly's own side panel is hidden to keep the picker on top.
    const url = new URL(CALENDLY_URL)
    url.searchParams.set('hide_gdpr_banner', '1')
    url.searchParams.set('hide_event_type_details', '1')
    url.searchParams.set('primary_color', '007a4e')

    loadCalendly()
      .then((Calendly) => {
        if (cancelled || !el) return
        el.innerHTML = ''
        // resize: Calendly reports its content height, so the frame grows instead of scrolling.
        Calendly.initInlineWidget({ url: url.toString(), parentElement: el, resize: true })
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
        <Reveal>
          <div className="text-center">
            <span className="eyebrow">
              <Mail className="h-3.5 w-3.5" />
              {t('contact.eyebrow')}
            </span>
            <h2 className="h2 mx-auto mt-5 max-w-3xl">{t('contact.title')}</h2>
          </div>
        </Reveal>

        {/* Booking card */}
        <Reveal delay={120}>
          <div className="relative mx-auto mt-10 max-w-6xl">
            <div
              className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-mint-400/15 to-navy-800/10 blur-2xl"
              aria-hidden="true"
            />

            {/* Phones stack header → calendar → details; from lg the details sit beside the
                calendar, split by a vertical rule (border-s, so it follows RTL). */}
            <div className="relative grid overflow-hidden rounded-3xl border border-navy-100 bg-white shadow-lift lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] lg:grid-rows-[auto_1fr]">
              <div className="px-7 pt-7 text-center sm:px-9 sm:pt-9 lg:text-start">
                <p className="text-sm font-semibold text-navy-800/55">{b.host}</p>
                <h3 className="mt-1 text-xl font-extrabold text-navy-900">{b.event}</h3>
                <p className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-navy-800/55">
                  <Clock className="h-3.5 w-3.5" />
                  {b.duration}
                </p>
              </div>

              <div className="relative mt-6 border-t border-navy-100 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:mt-0 lg:border-s lg:border-t-0">
                {status === 'loading' && (
                  <div className="absolute inset-0 grid place-items-center text-sm text-navy-800/60">
                    <span className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      {b.loading}
                    </span>
                  </div>
                )}
                {/* Calendly injects its iframe here and sets the height itself once loaded;
                    dir=ltr stops RTL from mirroring it. */}
                <div ref={widgetRef} dir="ltr" className="h-[640px] w-full" />
              </div>

              {/* Supporting details, kept small so the calendar stays the focus. */}
              <div className="border-t border-navy-100 px-7 py-6 sm:px-9 lg:border-t-0 lg:pb-9 lg:pt-5">
                <p className="text-sm leading-relaxed text-navy-800/65">{t('contact.subtitle')}</p>

                <ul className="mt-5 space-y-2.5">
                  {assurances.map((a) => (
                    <li key={a} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-mint-700" />
                      <span className="text-xs font-medium leading-relaxed text-navy-800/70">{a}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 space-y-2 text-xs">
                  <p className="font-medium text-navy-800/60">
                    {t('contact.phone')}{' '}
                    <a
                      href="tel:+96897786116"
                      dir="ltr"
                      className="inline-flex items-center gap-1 font-bold text-mint-700 hover:underline"
                    >
                      <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                      +968 9778 6116
                    </a>
                  </p>
                  <p className="font-medium text-navy-800/60">
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
                  </p>
                </div>

                <p className="mt-5 text-[11px] leading-relaxed text-navy-800/45">{b.privacy}</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
