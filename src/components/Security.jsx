import { useTranslation } from 'react-i18next'
import { CircleDashed, ShieldCheck } from 'lucide-react'
import Icon from './Icon'
import Reveal from './Reveal'

export default function Security() {
  const { t } = useTranslation()
  const safeguards = t('security.safeguards', { returnObjects: true })
  const roadmap = t('security.roadmap', { returnObjects: true })
  const integrations = t('security.integrations', { returnObjects: true })

  return (
    <section id="security" className="relative overflow-hidden bg-navy-900 py-20 lg:py-28">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-grid-navy [background-size:56px_56px]" />
        <div className="absolute -top-24 end-[-8%] h-[28rem] w-[28rem] rounded-full bg-mint-500/15 blur-[120px]" />
        <div className="absolute bottom-[-10rem] start-[-8%] h-[26rem] w-[26rem] rounded-full bg-navy-400/20 blur-[120px]" />
      </div>

      <div className="container-x relative">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="eyebrow-dark">
            <ShieldCheck className="h-3.5 w-3.5" />
            {t('security.eyebrow')}
          </span>
          <h2 className="mt-5 text-3xl font-extrabold leading-[1.35] tracking-tight text-white sm:text-4xl sm:leading-[1.35] lg:text-[2.75rem]">
            {t('security.title')}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-white/60 sm:text-lg">
            {t('security.subtitle')}
          </p>
        </Reveal>

        {/* ---------- What is actually true today ---------- */}
        <Reveal delay={80}>
          <h3 className="mt-14 text-center text-[11px] font-bold uppercase tracking-widest text-mint-300">
            {t('security.safeguardsTitle')}
          </h3>
        </Reveal>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {safeguards.map((s, i) => (
            <Reveal key={s.title} delay={i * 80}>
              <div className="h-full rounded-2xl border border-white/12 bg-white/[.06] p-6 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-mint-400/40 hover:bg-white/[.09]">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-mint-400/15 text-mint-400">
                  <Icon name={s.icon} className="h-5 w-5" strokeWidth={2.2} />
                </span>
                <h4 className="mt-5 text-base font-bold leading-snug text-white">{s.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-white/50">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* ---------- What is NOT yet true, said plainly ---------- */}
        <Reveal delay={100}>
          <div className="mt-6 rounded-3xl border border-dashed border-white/20 bg-navy-950/40 p-8 lg:mt-8 lg:p-10">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <h3 className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-white/60">
                <CircleDashed className="h-3.5 w-3.5" />
                {t('security.roadmapTitle')}
              </h3>
            </div>

            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/55">
              {t('security.roadmapNote')}
            </p>

            <ul className="mt-7 grid gap-3 sm:grid-cols-3">
              {roadmap.map((r) => (
                <li
                  key={r.name}
                  className="rounded-xl border border-white/10 bg-white/[.03] p-5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white/5 text-white/45">
                      <Icon name={r.icon} className="h-4 w-4" strokeWidth={2.2} />
                    </span>
                    {/* Amber, not mint: this must never read as "achieved". */}
                    <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-300">
                      {r.status}
                    </span>
                  </div>
                  <h4 className="mt-4 text-sm font-bold text-white/85">{r.name}</h4>
                  <p className="mt-1.5 text-xs leading-relaxed text-white/45">{r.scope}</p>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* ---------- Integration panel — deliberately vendor-neutral ---------- */}
        <Reveal delay={120}>
          <div className="mt-6 rounded-3xl border border-white/10 bg-white/[.04] p-8 backdrop-blur lg:mt-8 lg:p-12">
            <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-14">
              <div>
                <h3 className="text-2xl font-extrabold leading-snug tracking-tight text-white sm:text-[1.75rem]">
                  {t('security.integrationTitle')}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-white/60">
                  {t('security.integrationBody')}
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {integrations.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-3 rounded-xl border border-white/10 bg-navy-950/40 px-4 py-4 transition-colors hover:border-white/25"
                  >
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white/10 text-mint-300">
                      <Icon name={item.icon} className="h-4 w-4" strokeWidth={2.2} />
                    </span>
                    <span className="text-sm font-semibold text-white/85">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <p className="mt-8 border-t border-white/10 pt-6 text-xs leading-relaxed text-white/35">
              {t('security.note')}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
