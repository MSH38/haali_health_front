import { useTranslation } from 'react-i18next'
import { BrainCircuit, Check, ChevronRight, X } from 'lucide-react'
import Icon from './Icon'
import Reveal from './Reveal'

/**
 * Clinical AI & Safety (Review #15).
 *
 * The trust section for Medical Directors, CCIOs and clinical governance.
 * Two things carry the message and must not be softened into marketing: the
 * left-to-right workflow strip, which shows clinician review sitting between
 * the AI and the clinical record, and the Can / Does-not panel, which states
 * the boundary in plain language rather than implying it.
 */
export default function ClinicalAiSafety() {
  const { t } = useTranslation()
  const cards = t('clinicalAi.cards', { returnObjects: true })
  const flow = t('clinicalAi.flow', { returnObjects: true })
  const can = t('clinicalAi.can', { returnObjects: true })
  const cannot = t('clinicalAi.cannot', { returnObjects: true })

  return (
    <section
      id="clinical-ai"
      className="scroll-mt-20 border-y border-navy-100 bg-surface py-20 lg:py-28"
    >
      <div className="container-x">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="eyebrow">
            <BrainCircuit className="h-3.5 w-3.5" />
            {t('clinicalAi.eyebrow')}
          </span>
          <h2 className="h2 mt-5">{t('clinicalAi.title')}</h2>
          <p className="lede mt-5">{t('clinicalAi.subtitle')}</p>
        </Reveal>

        {/* ---------- Five behaviour cards ---------- */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, i) => (
            <Reveal key={card.title} delay={(i % 3) * 90}>
              <article className="card card-hover group h-full">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-navy-800 text-mint-400 transition-colors duration-300 group-hover:bg-mint-400 group-hover:text-navy-900">
                  <Icon name={card.icon} className="h-5 w-5" strokeWidth={2.2} />
                </span>
                <h3 className="mt-5 text-lg font-extrabold leading-snug text-navy-900">
                  {card.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-navy-800/65">{card.body}</p>
              </article>
            </Reveal>
          ))}
        </div>

        {/* ---------- Governance workflow strip ---------- */}
        <Reveal delay={100}>
          <div className="mt-6 rounded-3xl border border-navy-100 bg-white p-7 shadow-card lg:mt-8 lg:p-9">
            <h3 className="text-[11px] font-bold uppercase tracking-widest text-mint-700">
              {t('clinicalAi.flowTitle')}
            </h3>

            {/* Horizontal on desktop, stacked on mobile — same order either way. */}
            <ol className="mt-5 flex flex-col gap-2 lg:flex-row lg:flex-wrap lg:items-stretch">
              {flow.map((stepLabel, i) => (
                <li key={stepLabel} className="flex items-center gap-2 lg:flex-1">
                  <span
                    className={`flex-1 rounded-xl border px-3 py-3 text-center text-[12px] font-bold leading-snug ${
                      i === flow.length - 1
                        ? 'border-mint-300 bg-mint-50 text-mint-800'
                        : 'border-navy-100 bg-surface text-navy-800/80'
                    }`}
                  >
                    {stepLabel}
                  </span>
                  {i < flow.length - 1 && (
                    <ChevronRight
                      className="h-4 w-4 shrink-0 rotate-90 text-navy-800/25 lg:rotate-0 rtl:lg:rotate-180"
                      aria-hidden="true"
                    />
                  )}
                </li>
              ))}
            </ol>
          </div>
        </Reveal>

        {/* ---------- The boundary, stated plainly ---------- */}
        <div className="mt-6 grid gap-5 lg:mt-8 lg:grid-cols-2">
          <Reveal delay={80}>
            <div className="h-full rounded-3xl border border-mint-300/60 bg-mint-50/60 p-7 lg:p-8">
              <h3 className="text-[11px] font-bold uppercase tracking-widest text-mint-800">
                {t('clinicalAi.canTitle')}
              </h3>
              <ul className="mt-5 space-y-3">
                {can.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-mint-200 text-mint-800">
                      <Check className="h-3 w-3" strokeWidth={3.5} />
                    </span>
                    <span className="text-sm font-medium leading-relaxed text-navy-800/80">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={160}>
            <div className="h-full rounded-3xl border border-dashed border-navy-800/20 bg-white p-7 lg:p-8">
              <h3 className="text-[11px] font-bold uppercase tracking-widest text-navy-800/55">
                {t('clinicalAi.cannotTitle')}
              </h3>
              <ul className="mt-5 space-y-3">
                {cannot.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-navy-100 text-navy-800/55">
                      <X className="h-3 w-3" strokeWidth={3.5} />
                    </span>
                    <span className="text-sm font-medium leading-relaxed text-navy-800/70">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
