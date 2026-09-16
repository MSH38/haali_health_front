import { useTranslation } from 'react-i18next'
import { Sparkles } from 'lucide-react'
import Icon from './Icon'
import Reveal from './Reveal'

export default function Benefits() {
  const { t } = useTranslation()
  const stats = t('benefits.stats', { returnObjects: true })
  const cards = t('benefits.cards', { returnObjects: true })

  return (
    <section id="benefits" className="border-y border-navy-100 bg-surface py-20 lg:py-28">
      <div className="container-x">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="eyebrow">
            <Sparkles className="h-3.5 w-3.5" />
            {t('benefits.eyebrow')}
          </span>
          <h2 className="h2 mt-5">{t('benefits.title')}</h2>
          <p className="lede mt-5">{t('benefits.subtitle')}</p>
        </Reveal>

        {/* Headline stats */}
        <div className="mx-auto mt-14 grid max-w-4xl gap-4 sm:grid-cols-3">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 90}>
              <div className="rounded-2xl border border-navy-100 bg-white p-6 text-center shadow-card">
                <div className="text-3xl font-extrabold tracking-tight text-navy-900">
                  {s.value}
                </div>
                <div className="mt-2 text-sm font-bold text-navy-800">{s.label}</div>
                <div className="mt-1 text-xs leading-relaxed text-navy-800/50">{s.hint}</div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Benefit cards */}
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:mt-8 lg:grid-cols-3">
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
      </div>
    </section>
  )
}
