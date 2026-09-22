import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Linkedin, Mail, Quote, User } from 'lucide-react'
import PageHero from '../components/layout/PageHero'
import StickyCta from '../components/layout/StickyCta'
import Reveal from '../components/Reveal'
import Icon from '../components/Icon'
import AmbientGlow from '../components/AmbientGlow'

/**
 * About — a company-purpose page (Reviews #18 / #19).
 *
 * Deliberately does NOT restate How It Works, Clinical AI & Safety, VBHC &
 * Analytics, Security & Governance or Integration Readiness. Each of those
 * has one authoritative home on the homepage, and duplicating them here is
 * how the site ends up with two versions of the same claim.
 *
 * The founder cards are placeholders on purpose: names, photos, biographies
 * and LinkedIn URLs are supplied by Haali before launch and must not be
 * invented. `team.founders[].linkedin` stays empty until a real profile URL
 * is provided, and the link only renders once one is.
 */
export default function AboutPage() {
  const { t } = useTranslation()
  const p = (k, o) => t(`pages.about.${k}`, o)

  const heroBody = p('hero.body', { returnObjects: true })
  const missionBody = p('mission.body', { returnObjects: true })
  const cards = p('philosophy.cards', { returnObjects: true })
  const points = p('regional.points', { returnObjects: true })
  const phases = p('extensibility.phases', { returnObjects: true })
  const whyBody = p('why.body', { returnObjects: true })
  const founders = p('team.founders', { returnObjects: true })

  return (
    <>
      <Helmet>
        <title>{p('meta.title')}</title>
        <meta name="description" content={p('meta.description')} />
      </Helmet>

      <PageHero
        eyebrow={p('hero.eyebrow')}
        title={p('hero.title')}
        breadcrumb={p('breadcrumb')}
      />

      {/* ---------- Hero continuation — text-led, no feature cards ---------- */}
      <section className="bg-navy-900 pb-20 lg:pb-24">
        <div className="container-x">
          <div className=" space-y-3">
            {heroBody.map((para, i) => (
              <Reveal key={para} delay={i * 80}>
                <p className="text-base leading-[1.9] text-white/65 sm:text-lg">{para}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

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
                    &ldquo;{p('mission.pullQuote')}&rdquo;
                  </p>
                </blockquote>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Principles ---------- */}
      <section className="border-y border-navy-100 bg-surface py-20 lg:py-28">
        <div className="container-x">
          <Reveal className="mx-auto max-w-3xl text-center">
            <span className="eyebrow">{p('philosophy.eyebrow')}</span>
            <h2 className="h2 mt-5">{p('philosophy.title')}</h2>
            <p className="lede mt-5">{p('philosophy.subtitle')}</p>
          </Reveal>

          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {cards.map((c, i) => (
              <Reveal key={c.title} delay={i * 100} className="h-full">
                <article className="card card-hover group flex h-full flex-col">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-navy-800 text-mint-400 transition-colors duration-300 group-hover:bg-mint-400 group-hover:text-navy-950">
                    <Icon name={c.icon} className="h-5 w-5" strokeWidth={2.2} />
                  </span>
                  <h3 className="mt-5 text-lg font-extrabold leading-snug text-navy-900">
                    {c.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-navy-800/65">{c.body}</p>
                  {/*
                    min-h reserves two lines, so the rule above the closing line
                    sits at the same height in all three cards even when one
                    point wraps and the others do not.
                  */}
                  <p className="mt-5 min-h-14 border-t border-navy-100 pt-4 text-sm font-bold text-mint-700">
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
        <AmbientGlow />

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

          <div className="mt-14 grid gap-4 lg:grid-cols-3">
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
                  {/*
                    Neutral styling across all three: Review #18 replaced the
                    "live today / in development" statuses precisely so no card
                    implies a shipped or committed pathway.
                  */}
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

      {/* ---------- Why we built Haali ---------- */}
      <section className="border-y border-navy-100 bg-surface py-20 lg:py-28">
        <div className="container-x">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <span className="eyebrow">{p('why.eyebrow')}</span>
              <h2 className="h2 mt-5">{p('why.title')}</h2>
            </Reveal>

            <div className="mt-8 space-y-5">
              {whyBody.map((para, i) => (
                <Reveal key={para} delay={80 + i * 80}>
                  <p className="text-[15px] leading-[1.9] text-navy-800/75 sm:text-base">{para}</p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={320}>
              <p className="mt-10 border-t border-navy-100 pt-8 text-xl font-extrabold leading-snug tracking-tight text-navy-900 sm:text-2xl">
                {p('why.closing')}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- Who we are ---------- */}
      <section className="bg-white py-20 lg:py-28">
        <div className="container-x">
          <Reveal className="mx-auto max-w-3xl text-center">
            <span className="eyebrow">{p('team.eyebrow')}</span>
            <h2 className="h2 mt-5">{p('team.title')}</h2>
          </Reveal>

          <div className="mx-auto mt-14 grid max-w-3xl gap-5 sm:grid-cols-2">
            {founders.map((founder, i) => {
              const Card = founder.linkedin ? 'a' : 'article'
              const linkProps = founder.linkedin
                ? {
                    href: founder.linkedin,
                    target: '_blank',
                    rel: 'noreferrer',
                    'aria-label': `${founder.name} — ${p('team.linkedin')}`,
                  }
                : {}

              return (
                <Reveal key={i} delay={i * 100}>
                  <Card
                    {...linkProps}
                    className={`card h-full text-center ${
                      founder.linkedin
                        ? 'group block cursor-pointer transition-transform duration-200 hover:-translate-y-1 focus-visible:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint-600 focus-visible:ring-offset-2'
                        : ''
                    }`}
                  >
                    {founder.photo ? (
                      <img
                        src={founder.photo}
                        alt={founder.name}
                        width={400}
                        height={400}
                        loading="lazy"
                        decoding="async"
                        className="mx-auto h-24 w-24 rounded-full object-cover ring-1 ring-navy-800/10"
                      />
                    ) : (
                      <>
                        <span className="mx-auto grid h-24 w-24 place-items-center rounded-full border border-dashed border-navy-800/20 bg-surface text-navy-800/30">
                          <User className="h-9 w-9" strokeWidth={1.6} aria-hidden="true" />
                        </span>
                        <p className="mt-3 text-[10px] font-semibold uppercase tracking-wider text-navy-800/35">
                          {p('team.photoLabel')}
                        </p>
                      </>
                    )}

                    <h3 className="mt-4 text-lg font-extrabold text-navy-900">{founder.name}</h3>
                    <p className="mt-1 text-sm font-bold text-mint-700">{founder.role}</p>
                    <div className="mt-3 space-y-3 text-sm leading-relaxed text-navy-800/65">
                      {String(founder.bio)
                        .split(/\n\s*\n/)
                        .map((para, j) => (
                          <p key={j}>{para}</p>
                        ))}
                    </div>

                    {founder.linkedin && (
                      <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-navy-800/70 transition-colors group-hover:text-mint-700">
                        <Linkedin className="h-4 w-4" aria-hidden="true" />
                        {p('team.linkedin')}
                      </span>
                    )}
                  </Card>
                </Reveal>
              )
            })}
          </div>

          {/* ---------- Speak to the team ---------- */}
          <Reveal delay={160}>
            <div className="mx-auto mt-10 max-w-3xl rounded-3xl border border-navy-100 bg-surface p-8 text-center lg:p-10">
              <h3 className="text-2xl font-extrabold tracking-tight text-navy-900">
                {p('team.contact.title')}
              </h3>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-navy-800/65">
                {p('team.contact.body')}
              </p>

              <div className="mt-7 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-8">
                <a
                  href="mailto:info@haalihealth.com"
                  className="inline-flex items-center gap-2 text-sm font-bold text-navy-800/75 transition-colors hover:text-mint-700"
                  dir="ltr"
                >
                  <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                  info@haalihealth.com
                </a>
                <a
                  href="https://www.linkedin.com/company/haali-health"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-bold text-navy-800/75 transition-colors hover:text-mint-700"
                  dir="ltr"
                >
                  <Linkedin className="h-4 w-4 shrink-0" aria-hidden="true" />
                  linkedin.com/company/haali-health
                </a>
              </div>

              <div className="mt-7 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
                <Link to="/#contact" className="btn-primary">
                  {p('team.contact.primary')}
                </Link>
                <Link to="/#contact" className="btn-outline">
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  {p('team.contact.secondary')}
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <StickyCta />
    </>
  )
}
