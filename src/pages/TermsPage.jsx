import { useTranslation } from 'react-i18next'
import { AlertTriangle } from 'lucide-react'
import LegalPage from '../components/layout/LegalPage'
import Reveal from '../components/Reveal'

/** SLA table, rendered inside the availability section only. */
function SlaTable(section) {
  if (!section.sla) return null

  return (
    <div className="mt-6">
      <h3 className="text-[11px] font-bold uppercase tracking-widest text-mint-700">
        {section.slaTitle}
      </h3>
      <dl className="mt-4 divide-y divide-navy-100 overflow-hidden rounded-2xl border border-navy-100">
        {section.sla.map((row) => (
          <div
            key={row.metric}
            className="flex flex-col gap-1 bg-white p-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
          >
            <dt className="text-sm font-bold text-navy-900">{row.metric}</dt>
            <dd className="sm:text-end">
              <span className="text-sm font-extrabold text-mint-700">{row.value}</span>
              <span className="block text-xs text-navy-800/50">{row.note}</span>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

/**
 * The mandatory clinical disclaimer.
 *
 * Deliberately the loudest element on the page: a reader skimming the Terms
 * must not be able to miss the boundary of what this product does. Section
 * numbering in the translation file skips "2" because this occupies that slot.
 */
function ClinicalDisclaimer() {
  const { t } = useTranslation()
  const points = t('pages.terms.criticalPoints', { returnObjects: true })

  return (
    <Reveal delay={120}>
      <section id="disclaimer" className="mt-10 scroll-mt-28">
        <div className="overflow-hidden rounded-2xl border-2 border-amber-400/70 bg-amber-50">
          <div className="flex items-center gap-2.5 border-b border-amber-400/40 bg-amber-400/20 px-6 py-3.5">
            <AlertTriangle className="h-4 w-4 shrink-0 text-amber-700" aria-hidden="true" />
            <h2 className="text-[11px] font-extrabold uppercase tracking-widest text-amber-800">
              2. {t('pages.terms.criticalTitle')}
            </h2>
          </div>

          <div className="p-6 sm:p-8">
            <p className="text-base font-bold leading-relaxed text-navy-900 sm:text-lg">
              {t('pages.terms.criticalBody')}
            </p>

            <ul className="mt-6 space-y-2.5 border-t border-amber-400/40 pt-6">
              {points.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-600"
                    aria-hidden="true"
                  />
                  <span className="text-sm font-medium leading-relaxed text-navy-800">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </Reveal>
  )
}

export default function TermsPage() {
  return (
    <LegalPage ns="terms" renderSection={SlaTable}>
      <ClinicalDisclaimer />
    </LegalPage>
  )
}
