import { useTranslation } from 'react-i18next'
import { Check, Waypoints } from 'lucide-react'
import Reveal from './Reveal'
import DashboardMockup from './DashboardMockup'

/**
 * One product surface per step, in step order — the interface itself rather
 * than a still from the film. Rendered as DOM, so it stays sharp at any
 * density and picks up the brand scale automatically.
 */
const STEP_VARIANTS = ['precheck', 'followup', 'review']

export default function HowItWorks() {
  const { t } = useTranslation()
  const steps = t('how.steps', { returnObjects: true })

  return (
    <section id="how-it-works" className="bg-white py-20 lg:py-28">
      <div className="container-x">
        {/* Header */}
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="eyebrow">
            <Waypoints className="h-3.5 w-3.5" />
            {t('how.eyebrow')}
          </span>
          <h2 className="h2 mt-5">{t('how.title')}</h2>
          <p className="lede mt-5">{t('how.subtitle')}</p>
        </Reveal>

        {/* Zig-zag rows */}
        <div className="mt-16 space-y-20 lg:mt-24 lg:space-y-28">
          {steps.map((step, i) => {
            const flipped = i % 2 === 1

            return (
              <div
                key={step.name}
                id={step.id}
                className="grid scroll-mt-28 items-center gap-10 lg:grid-cols-2 lg:gap-16"
              >
                {/* Media */}
                <Reveal delay={80} className={flipped ? 'lg:order-2' : 'lg:order-1'}>
                  <DashboardMockup variant={STEP_VARIANTS[i] ?? 'precheck'} />
                </Reveal>

                {/* Copy */}
                <Reveal delay={160} className={flipped ? 'lg:order-1' : 'lg:order-2'}>
                  <div className="flex items-center gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-navy-800 text-sm font-extrabold text-mint-400">
                      {step.n}
                    </span>
                    <div>
                      <span className="block text-[11px] font-bold uppercase tracking-widest text-mint-700">
                        {step.tag}
                      </span>
                      <span className="block text-lg font-extrabold text-navy-900">{step.name}</span>
                    </div>
                  </div>

                  <h3 className="mt-6 text-2xl font-extrabold leading-snug tracking-tight text-navy-900 sm:text-[1.75rem]">
                    {step.title}
                  </h3>

                  <p className="mt-4 text-base leading-relaxed text-navy-800/65">{step.body}</p>

                  <ul className="mt-7 space-y-3">
                    {step.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-3">
                        <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-mint-100 text-mint-800">
                          <Check className="h-3 w-3" strokeWidth={3.5} />
                        </span>
                        <span className="text-sm font-medium leading-relaxed text-navy-800/80">
                          {b}
                        </span>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
