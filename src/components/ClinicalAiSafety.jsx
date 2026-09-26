import { useTranslation } from 'react-i18next'
import { BrainCircuit, Check, ChevronRight, X } from 'lucide-react'
import Icon from './Icon'
import Reveal from './Reveal'

/**
 * Clinical AI & Safety (Review #15).
 *
 * The trust section for Medical Directors, CCIOs and clinical governance.
 * Two things carry the message and must not be softened into marketing: the
 * numbered workflow chain, which shows clinician review sitting between the AI
 * and the clinical record, and the Can / Does-not panel, which states the
 * boundary in plain language rather than implying it.
 *
 * Order is deliberate: the workflow comes first as the spine of the story, the
 * behaviour cards explain how each stage is kept safe, and the boundary panel
 * closes with the limits stated outright.
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

        {/* ---------- Governance workflow chain ---------- */}
        <Reveal delay={100}>
          <div className="mt-14 rounded-3xl border border-navy-100 bg-white p-7 shadow-card lg:p-9">
            <h3 className="text-center text-[11px] font-bold uppercase tracking-widest text-mint-700">
              {t('clinicalAi.flowTitle')}
            </h3>

            {/*
              The chain wraps on its own instead of forcing seven equal columns,
              so each step keeps its natural width and stays readable. Same
              order at every breakpoint; the chevron rotates to point down when
              the steps stack.
            */}
            <ol className="mt-6 flex flex-col items-stretch gap-1.5 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-x-1 sm:gap-y-2.5">
              {flow.map((stepLabel, i) => {
                const isLast = i === flow.length - 1
                return (
                  <li key={stepLabel} className="flex items-center gap-1.5 sm:gap-1">
                    <span
                      className={`flex flex-1 items-center gap-2.5 rounded-full border py-2 pl-2 pr-4 text-[12px] font-bold leading-snug sm:flex-none ${
                        isLast
                          ? 'border-mint-300 bg-mint-50 text-mint-800'
                          : 'border-navy-100 bg-surface text-navy-800/80'
                      }`}
                    >
                      <span
                        className={`grid h-6 w-6 shrink-0 place-items-center rounded-full text-[11px] font-extrabold ${
                          isLast
                            ? 'bg-mint-400 text-navy-900'
                            : 'bg-navy-800/5 text-navy-800/60'
                        }`}
                      >
                        {i + 1}
                      </span>
                      {stepLabel}
                    </span>
                    {!isLast && (
                      <ChevronRight
                        className="h-4 w-4 shrink-0 rotate-90 text-navy-800/25 sm:rotate-0 rtl:sm:rotate-180"
                        aria-hidden="true"
                      />
                    )}
                  </li>
                )
              })}
            </ol>
          </div>
        </Reveal>

        {/* ----------
          Five behaviour cards. A twelve-column grid lets the last row centre
          itself (3 + 2) instead of leaving a hole in the bottom-right.
        ---------- */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-12">
          {cards.map((card, i) => (
            <Reveal
              key={card.title}
              delay={(i % 3) * 90}
              className={`h-full ${i < 3 ? 'lg:col-span-4' : 'lg:col-span-6'}`}
            >
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

        {/* ---------- The boundary, stated plainly ---------- */}
        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          <Reveal delay={80}>
            <div className="h-full rounded-3xl border border-mint-300/60 bg-mint-50/60 p-7 lg:p-8">
              <h3 className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-mint-800">
                <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-mint-200 text-mint-800">
                  <Check className="h-3 w-3" strokeWidth={3.5} />
                </span>
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
              <h3 className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-navy-800/55">
                <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-navy-100 text-navy-800/55">
                  <X className="h-3 w-3" strokeWidth={3.5} />
                </span>
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
