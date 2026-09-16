import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { Info } from 'lucide-react'
import PageHero from './PageHero'
import StickyCta from './StickyCta'
import Reveal from '../Reveal'

/**
 * Shared shell for the two legal pages (Privacy, Terms).
 *
 * Renders a jump-to-section index plus numbered prose sections. `children`
 * is injected between the index and the sections, which is where the Terms
 * page puts its clinical disclaimer callout.
 */
export default function LegalPage({ ns, children, renderSection }) {
  const { t } = useTranslation()
  const p = (k) => t(`pages.${ns}.${k}`)
  const sections = t(`pages.${ns}.sections`, { returnObjects: true })

  return (
    <>
      <Helmet>
        <title>{p('meta.title')}</title>
        <meta name="description" content={p('meta.description')} />
      </Helmet>

      <PageHero
        eyebrow={p('hero.eyebrow')}
        title={p('hero.title')}
        subtitle={p('hero.subtitle')}
        breadcrumb={p('breadcrumb')}
        meta={`${t('pages.common.lastUpdated')}: ${p('updated')}`}
      />

      <section className="bg-white py-16 lg:py-20">
        <div className="container-x">
          <div className="mx-auto max-w-3xl">
            {/* Scope note */}
            <Reveal>
              <div className="flex gap-3 rounded-2xl border border-navy-100 bg-surface p-5">
                <Info className="mt-0.5 h-5 w-5 shrink-0 text-navy-800/40" aria-hidden="true" />
                <p className="text-sm leading-relaxed text-navy-800/65">{p('disclaimer')}</p>
              </div>
            </Reveal>

            {/* Jump index */}
            <Reveal delay={80}>
              <nav aria-label={t('pages.common.onThisPage')} className="mt-10">
                <h2 className="text-[11px] font-bold uppercase tracking-widest text-mint-700">
                  {t('pages.common.onThisPage')}
                </h2>
                <ol className="mt-4 space-y-2">
                  {sections.map((s) => (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        className="text-sm font-semibold text-navy-800/70 underline-offset-4 transition-colors hover:text-mint-700 hover:underline"
                      >
                        {s.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </Reveal>

            {children}

            {/* Sections */}
            <div className="mt-12 space-y-12">
              {sections.map((s) => (
                <Reveal as="section" key={s.id} id={s.id} className="scroll-mt-28">
                  <h2 className="text-xl font-extrabold tracking-tight text-navy-900 sm:text-2xl">
                    {s.title}
                  </h2>

                  {s.body.map((para) => (
                    <p key={para} className="mt-4 text-[15px] leading-[1.9] text-navy-800/75">
                      {para}
                    </p>
                  ))}

                  {/* Page-specific extras (voice pipeline, SLA table) */}
                  {renderSection?.(s)}

                  {s.bullets?.length > 0 && (
                    <ul className="mt-5 space-y-2.5 border-s-2 border-mint-400/40 ps-5">
                      {s.bullets.map((b) => (
                        <li key={b} className="text-sm leading-relaxed text-navy-800/70">
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <StickyCta />
    </>
  )
}
