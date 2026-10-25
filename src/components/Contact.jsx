import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { CheckCircle2, Clock, ExternalLink, Loader2, Mail, Phone, X } from 'lucide-react'
import Reveal from './Reveal'

// Override with VITE_CALENDLY_URL in .env if the booking page ever changes.
const CALENDLY_URL = import.meta.env.VITE_CALENDLY_URL || 'https://calendly.com/haalihealth-info/30min'

// Booking details must only ever go to Calendly over HTTPS — fail the build otherwise.
if (!/^https:\/\/calendly\.com\//.test(CALENDLY_URL)) {
  throw new Error(`VITE_CALENDLY_URL must be an https://calendly.com/ link, got "${CALENDLY_URL}"`)
}
// Brand colours, minus the leading '#'. Event details are shown by us above the
// calendar, so Calendly's own side panel is hidden to keep the picker on top.
// embed_* are the params Calendly's widget.js would add; setting them ourselves saves
// loading that extra script before the iframe can start.
function embedSrc() {
  const url = new URL(CALENDLY_URL)
  url.searchParams.set('embed_domain', window.location.host)
  url.searchParams.set('embed_type', 'Inline')
  url.searchParams.set('hide_gdpr_banner', '1')
  url.searchParams.set('hide_event_type_details', '1')
  url.searchParams.set('primary_color', '007a4e')
  return url.toString()
}

export default function Contact() {
  const { t } = useTranslation()
  const b = t('contact.booking', { returnObjects: true })
  const assurances = t('contact.assurances', { returnObjects: true })

  const [src, setSrc] = useState(null)
  const [loaded, setLoaded] = useState(false)
  const [height, setHeight] = useState(560)

  // Start Calendly only once the page itself has finished loading and the browser is idle,
  // so the heavy booking app never competes with the main content (keeps Core Web Vitals,
  // and so SEO, unaffected) yet is usually ready before visitors scroll down to it.
  useEffect(() => {
    let idleId
    const start = () => {
      idleId = window.requestIdleCallback
        ? window.requestIdleCallback(() => setSrc(embedSrc()), { timeout: 2000 })
        : window.setTimeout(() => setSrc(embedSrc()), 200)
    }
    if (document.readyState === 'complete') start()
    else window.addEventListener('load', start, { once: true })
    return () => {
      window.removeEventListener('load', start)
      if (window.cancelIdleCallback) window.cancelIdleCallback(idleId)
      else window.clearTimeout(idleId)
    }
  }, [])

  // Picking a time opens the booking form, whose reCAPTCHA gets cropped inside the compact
  // frame — so from then on the same frame is shown as a modal (restyled, not remounted,
  // so Calendly keeps the chosen slot).
  const [modal, setModal] = useState(false)

  useEffect(() => {
    const onMessage = (e) => {
      if (e.origin !== 'https://calendly.com') return
      const event = e.data?.event
      // Calendly reports its content height, so the frame grows instead of scrolling.
      if (event === 'calendly.page_height') {
        const h = parseInt(e.data.payload?.height, 10)
        if (h > 0) setHeight(h)
      } else if (event === 'calendly.date_and_time_selected') {
        setModal(true)
      }
    }
    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [])

  useEffect(() => {
    if (!modal) return
    const onKey = (e) => e.key === 'Escape' && setModal(false)
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = overflow
      window.removeEventListener('keydown', onKey)
    }
  }, [modal])

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
          <div className="relative mx-auto mt-12 max-w-5xl">
            <div
              className="absolute -inset-4 rounded-[2.25rem] bg-gradient-to-br from-mint-400/10 via-transparent to-navy-800/10 blur-2xl"
              aria-hidden="true"
            />

            {/* Phones stack header → calendar → details; from lg the details sit beside the
                calendar, split by a fading vertical rule (start-side, so it follows RTL). */}
            <div className="relative grid overflow-hidden rounded-[1.75rem] border border-navy-100/80 bg-white shadow-lift lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:grid-rows-[auto_1fr]">
              {/* Soft tint behind the details column only. */}
              <div
                className="pointer-events-none absolute inset-y-0 start-0 hidden w-1/2 bg-gradient-to-b from-mint-50/70 via-navy-50/30 to-white lg:block"
                aria-hidden="true"
              />

              <div className="relative px-7 pt-8 text-center sm:px-10 sm:pt-10 lg:text-start">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-mint-700">
                  {b.host}
                </p>
                <h3 className="mt-3 text-2xl font-extrabold leading-snug tracking-tight text-navy-900">
                  {b.event}
                </h3>
                <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-semibold text-navy-800/60 ring-1 ring-navy-100">
                  <Clock className="h-3.5 w-3.5 text-mint-700" />
                  {b.duration}
                </p>
              </div>

              <div className="relative mt-8 border-t border-navy-100 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:mt-0 lg:border-t-0">
                <span
                  className="absolute inset-y-10 start-0 hidden w-px bg-gradient-to-b from-transparent via-navy-100 to-transparent lg:block"
                  aria-hidden="true"
                />

                <div className="mx-auto max-w-[400px] px-6 pb-3 pt-8 text-center sm:pt-10">
                  <p className="text-base font-bold text-navy-900">{b.pickTitle}</p>
                  <p className="mt-1.5 text-xs leading-relaxed text-navy-800/55">{b.pickNote}</p>
                </div>

                {/* Holds the frame's space while it's lifted into the modal, so the page doesn't jump. */}
                <div className="relative mx-auto max-w-[400px]" style={modal ? { height } : undefined}>
                  {!loaded && (
                    <div className="absolute inset-0 grid place-items-center text-sm text-navy-800/60">
                      <span className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        {b.loading}
                      </span>
                    </div>
                  )}
                  {/* dir=ltr stops RTL from mirroring it. The narrow width keeps Calendly in
                      its compact, borderless layout. The wrappers stay mounted in both modes
                      so React never reloads the iframe when the modal opens or closes. */}
                  {src ? (
                    <div
                      className={
                        modal
                          ? 'fixed inset-0 z-[100] grid place-items-center bg-navy-900/60 p-3 backdrop-blur-sm sm:p-6'
                          : ''
                      }
                      onClick={(e) => e.target === e.currentTarget && setModal(false)}
                      role={modal ? 'dialog' : undefined}
                      aria-modal={modal || undefined}
                      aria-label={modal ? b.event : undefined}
                    >
                      <div
                        className={
                          modal
                            ? 'relative h-full max-h-[760px] w-full max-w-[560px] overflow-hidden rounded-2xl bg-white shadow-lift'
                            : ''
                        }
                      >
                        {modal && (
                          <button
                            type="button"
                            onClick={() => setModal(false)}
                            aria-label={b.close}
                            className="absolute end-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-white text-navy-800/70 shadow ring-1 ring-navy-100 hover:text-navy-900"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        )}
                        <iframe
                          src={src}
                          title={b.event}
                          dir="ltr"
                          onLoad={() => setLoaded(true)}
                          // In the modal the frame fills the panel and scrolls on its own.
                          style={modal ? undefined : { height }}
                          className={`block w-full border-0 ${modal ? 'h-full' : ''}`}
                        />
                      </div>
                    </div>
                  ) : (
                    // Reserves the space so nothing shifts when the calendar arrives (CLS).
                    <div className="h-[560px] w-full" />
                  )}
                </div>
              </div>

              {/* Supporting details, kept small so the calendar stays the focus. */}
              <div className="relative border-t border-navy-100 px-7 py-8 sm:px-10 lg:border-t-0 lg:pb-10 lg:pt-6">
                <p className="text-sm leading-relaxed text-navy-800/65">{t('contact.subtitle')}</p>

                <ul className="mt-6 space-y-3">
                  {assurances.map((a) => (
                    <li key={a} className="flex items-start gap-2.5">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-mint-700" />
                      <span className="text-[13px] font-medium leading-relaxed text-navy-800/75">{a}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 space-y-2.5 border-t border-navy-100/80 pt-6 text-xs">
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

                <p className="mt-5 text-[11px] leading-relaxed text-navy-800/40">{b.privacy}</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
