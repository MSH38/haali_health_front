import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { Info } from 'lucide-react'
import PageHero from '../components/layout/PageHero'
import StickyCta from '../components/layout/StickyCta'
import Reveal from '../components/Reveal'
import Icon from '../components/Icon'
import AmbientGlow from '../components/AmbientGlow'
import { COMPLIANCE_ITEMS, STATUS, STATUS_STYLES } from '../config/compliance'

export default function SecurityPage() {
  const { t } = useTranslation()
  const p = (k, o) => t(`pages.security.${k}`, o)

  const pillars = p('architecture.pillars', { returnObjects: true })
  const statusLabels = p('badgesSection.statusLabels', { returnObjects: true })
  const outputs = p('integration.outputs', { returnObjects: true })
  const technical = p('integration.technical', { returnObjects: true })

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
      />

      {/* ---------- Architecture ---------- */}
      <section className="bg-white py-20 lg:py-28">
        <div className="container-x">
          <Reveal className="mx-auto max-w-3xl text-center">
            <span className="eyebrow">{p('architecture.eyebrow')}</span>
            <h2 className="h2 mt-5">{p('architecture.title')}</h2>
            <p className="lede mt-5">{p('architecture.body')}</p>
          </Reveal>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((pillar, i) => (
              <Reveal key={pillar.title} delay={i * 90}>
                <article className="card card-hover group h-full">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-navy-800 text-mint-400 transition-colors duration-300 group-hover:bg-mint-400 group-hover:text-navy-950">
                    <Icon name={pillar.icon} className="h-5 w-5" strokeWidth={2.2} />
                  </span>
                  <h3 className="mt-5 text-base font-extrabold leading-snug text-navy-900">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-navy-800/65">{pillar.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Compliance posture ---------- */}
      <section className="relative overflow-hidden bg-navy-900 py-20 lg:py-28">
        <AmbientGlow />

        <div className="container-x relative">
          <Reveal className="mx-auto max-w-3xl text-center">
            <span className="eyebrow-dark">{p('badgesSection.eyebrow')}</span>
            <h2 className="mt-5 text-3xl font-extrabold leading-[1.35] tracking-tight text-white sm:text-4xl sm:leading-[1.35] lg:text-[2.75rem]">
              {p('badgesSection.title')}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-white/60 sm:text-lg">
              {p('badgesSection.subtitle')}
            </p>
          </Reveal>

          {/* Status is driven by src/config/compliance.js — never hardcoded here. */}
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {COMPLIANCE_ITEMS.map((item, i) => {
              const style = STATUS_STYLES[item.status]
              const copy = p(`badgesSection.items.${item.key}`, { returnObjects: true })

              return (
                <Reveal key={item.key} delay={i * 80}>
                  <article
                    className={`h-full rounded-2xl border p-6 backdrop-blur transition-all duration-300 hover:-translate-y-1 ${style.card}`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span
                        className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl ${style.icon}`}
                      >
                        <Icon name={item.icon} className="h-5 w-5" strokeWidth={2.2} />
                      </span>
                      <span
                        className={`rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${style.pill}`}
                      >
                        {statusLabels[item.status]}
                      </span>
                    </div>

                    <h3
                      className={`mt-5 text-base font-bold leading-snug ${
                        item.status === STATUS.BUILT || item.status === STATUS.CERTIFIED
                          ? 'text-white'
                          : 'text-white/80'
                      }`}
                    >
                      {copy.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/50">{copy.body}</p>
                  </article>
                </Reveal>
              )
            })}
          </div>

          {/* Explicit statement of what we do NOT hold. */}
          <Reveal delay={160}>
            <div className="mt-6 flex gap-3 rounded-2xl border border-dashed border-white/20 bg-navy-950/40 p-6">
              <Info className="mt-0.5 h-5 w-5 shrink-0 text-amber-300" aria-hidden="true" />
              <p className="text-sm leading-relaxed text-white/55">{p('badgesSection.honesty')}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- Integration framework ---------- */}
      <section className="bg-white py-20 lg:py-28">
        <div className="container-x">
          <Reveal className="mx-auto max-w-3xl text-center">
            <span className="eyebrow">{p('integration.eyebrow')}</span>
            <h2 className="h2 mt-5">{p('integration.title')}</h2>
            <p className="lede mt-5">{p('integration.body')}</p>
          </Reveal>

          <Reveal delay={80}>
            <h3 className="mt-14 text-[11px] font-bold uppercase tracking-widest text-mint-700">
              {p('integration.outputsTitle')}
            </h3>
          </Reveal>

          <div className="mt-5 grid gap-5 lg:grid-cols-3">
            {outputs.map((o, i) => (
              <Reveal key={o.title} delay={i * 90}>
                <article className="card card-hover group h-full">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-navy-800 text-mint-400 transition-colors duration-300 group-hover:bg-mint-400 group-hover:text-navy-950">
                    <Icon name={o.icon} className="h-5 w-5" strokeWidth={2.2} />
                  </span>
                  <h4 className="mt-5 text-lg font-extrabold leading-snug text-navy-900">
                    {o.title}
                  </h4>
                  <p className="mt-3 text-sm leading-relaxed text-navy-800/65">{o.body}</p>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal delay={120}>
            <h3 className="mt-14 text-[11px] font-bold uppercase tracking-widest text-mint-700">
              {p('integration.technicalTitle')}
            </h3>
          </Reveal>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {technical.map((item, i) => (
              <Reveal key={item.label} delay={i * 60}>
                <div className="flex items-center gap-3 rounded-xl border border-navy-100 bg-surface px-4 py-4 transition-colors hover:border-mint-300">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-navy-800 text-mint-400">
                    <Icon name={item.icon} className="h-4 w-4" strokeWidth={2.2} />
                  </span>
                  <span className="text-sm font-semibold text-navy-800">{item.label}</span>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={180}>
            <p className="mx-auto mt-10 max-w-3xl text-center text-xs leading-relaxed text-navy-800/45">
              {p('integration.note')}
            </p>
          </Reveal>
        </div>
      </section>

      <StickyCta />
    </>
  )
}
