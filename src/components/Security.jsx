import { useTranslation } from 'react-i18next'
import { ShieldCheck } from 'lucide-react'
import Icon from './Icon'
import Reveal from './Reveal'

export default function Security() {
  const { t } = useTranslation()
  const badges = t('security.badges', { returnObjects: true })
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
          <h2 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-[2.75rem]">
            {t('security.title')}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-white/60 sm:text-lg">
            {t('security.subtitle')}
          </p>
        </Reveal>

        {/* Compliance badges — international + GCC, side by side */}
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {badges.map((b, i) => (
            <Reveal key={b.title} delay={i * 80}>
              <div className="h-full rounded-2xl border border-white/10 bg-white/[.06] p-6 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-mint-400/40 hover:bg-white/[.09]">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-mint-400/15 text-mint-400">
                  <Icon name={b.icon} className="h-5 w-5" strokeWidth={2.2} />
                </span>
                <h3 className="mt-5 text-base font-bold leading-snug text-white">{b.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/50">{b.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Integration panel — deliberately vendor-neutral */}
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
