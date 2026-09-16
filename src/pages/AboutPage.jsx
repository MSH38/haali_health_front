import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { Quote } from 'lucide-react'
import PageHero from '../components/layout/PageHero'
import StickyCta from '../components/layout/StickyCta'
import Reveal from '../components/Reveal'
import Icon from '../components/Icon'

export default function AboutPage() {
  const { t } = useTranslation()
  const p = (k, o) => t(`pages.about.${k}`, o)

  const missionBody = p('mission.body', { returnObjects: true })
  const stats = p('mission.stats', { returnObjects: true })
  const cards = p('philosophy.cards', { returnObjects: true })
  const points = p('regional.points', { returnObjects: true })
  const phases = p('extensibility.phases', { returnObjects: true })

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

      {/* ---------- Mission ---------- */}
      <section className="bg-white py-20 lg:py-28">
        <div className="container-x">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
            <Reveal>
              <span className="eyebrow">{p('mission.eyebrow')}</span>
              <h2 className="h2 mt-5">{p('mission.title')}</h2>
            </Reveal>

            <div>
              {missionBody.map((para, i) => (
                <Reveal key={para} delay={80 + i * 80}>
                  <p className="mb-5 text-[15px] leading-[1.9] text-navy-800/75 sm:text-base">
                    {para}
                  </p>
                </Reveal>
              ))}

              <Reveal delay={240}>
                <blockquote className="mt-8 rounded-2xl border border-mint-300/50 bg-mint-50 p-6">
                  <Quote className="h-5 w-5 text-mint-600" aria-hidden="true" />
                  <p className="mt-3 text-lg font-bold leading-relaxed text-navy-900">
                    {p('mission.pullQuote')}
                  </p>
                </blockquote>
              </Reveal>
            </div>
          </div>

          <div className="mt-14 grid gap-4 sm:grid-cols-3">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 90}>
                <div className="rounded-2xl border border-navy-100 bg-surface p-6 text-center">
                  <div className="text-2xl font-extrabold tracking-tight text-navy-900">
                    {s.value}
                  </div>
                  <div className="mt-1 text-sm font-bold text-navy-800">{s.label}</div>
                  <div className="mt-2 text-xs leading-relaxed text-navy-800/50">{s.hint}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Core philosophy ---------- */}
      <section className="border-y border-navy-100 bg-surface py-20 lg:py-28">
        <div className="container-x">
          <Reveal className="mx-auto max-w-3xl text-center">
            <span className="eyebrow">{p('philosophy.eyebrow')}</span>
            <h2 className="h2 mt-5">{p('philosophy.title')}</h2>
            <p className="lede mt-5">{p('philosophy.subtitle')}</p>
          </Reveal>

          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {cards.map((c, i) => (
              <Reveal key={c.title} delay={i * 100}>
                <article className="card card-hover group flex h-full flex-col">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-navy-800 text-mint-400 transition-colors duration-300 group-hover:bg-mint-400 group-hover:text-navy-950">
                    <Icon name={c.icon} className="h-5 w-5" strokeWidth={2.2} />
                  </span>
                  <h3 className="mt-5 text-lg font-extrabold leading-snug text-navy-900">
                    {c.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-navy-800/65">{c.body}</p>
                  <p className="mt-5 border-t border-navy-100 pt-4 text-sm font-bold text-mint-700">
                    {c.point}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Regional focus ---------- */}
      <section className="relative overflow-hidden bg-navy-900 py-20 lg:py-28">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute inset-0 bg-grid-navy [background-size:56px_56px]" />
          <div className="absolute -top-24 end-[-8%] h-[28rem] w-[28rem] rounded-full bg-mint-500/15 blur-[120px]" />
        </div>

        <div className="container-x relative">
          <Reveal className="mx-auto max-w-3xl text-center">
            <span className="eyebrow-dark">{p('regional.eyebrow')}</span>
            <h2 className="mt-5 text-3xl font-extrabold leading-[1.35] tracking-tight text-white sm:text-4xl sm:leading-[1.35] lg:text-[2.75rem]">
              {p('regional.title')}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-white/60 sm:text-lg">
              {p('regional.body')}
            </p>
          </Reveal>

          <div className="mt-14 grid gap-4 sm:grid-cols-2">
            {points.map((pt, i) => (
              <Reveal key={pt.title} delay={i * 90}>
                <div className="h-full rounded-2xl border border-white/10 bg-white/[.06] p-6 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-mint-400/40">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-mint-400/15 text-mint-400">
                    <Icon name={pt.icon} className="h-5 w-5" strokeWidth={2.2} />
                  </span>
                  <h3 className="mt-5 text-base font-bold text-white">{pt.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/55">{pt.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Clinical extensibility ---------- */}
      <section className="bg-white py-20 lg:py-28">
        <div className="container-x">
          <Reveal className="mx-auto max-w-3xl text-center">
            <span className="eyebrow">{p('extensibility.eyebrow')}</span>
            <h2 className="h2 mt-5">{p('extensibility.title')}</h2>
            <p className="lede mt-5">{p('extensibility.body')}</p>
          </Reveal>

          <ol className="mt-14 grid gap-5 lg:grid-cols-3">
            {phases.map((ph, i) => (
              <Reveal as="li" key={ph.title} delay={i * 100}>
                <div className="card h-full">
                  <span
                    className={`inline-flex rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-wider ${
                      i === 0
                        ? 'border-mint-400/50 bg-mint-50 text-mint-700'
                        : 'border-navy-800/15 bg-navy-50 text-navy-800/60'
                    }`}
                  >
                    {ph.status}
                  </span>
                  <h3 className="mt-5 text-lg font-extrabold text-navy-900">{ph.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-navy-800/65">{ph.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>

          <Reveal delay={200}>
            <p className="mx-auto mt-10 max-w-3xl text-center text-xs leading-relaxed text-navy-800/45">
              {p('extensibility.note')}
            </p>
          </Reveal>
        </div>
      </section>

      <StickyCta />
    </>
  )
}
