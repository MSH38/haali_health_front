import { useTranslation } from 'react-i18next'
import { AlertTriangle } from 'lucide-react'
import Reveal from './Reveal'

export default function Challenge() {
  const { t } = useTranslation()
  const points = t('challenge.points', { returnObjects: true })

  return (
    <section className="border-b border-navy-100 bg-surface py-20 lg:py-28">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <Reveal>
            <span className="eyebrow">
              <AlertTriangle className="h-3.5 w-3.5" />
              {t('challenge.eyebrow')}
            </span>
            <h2 className="h2 mt-5">{t('challenge.title')}</h2>
          </Reveal>

          <div>
            <Reveal delay={100}>
              <p className="lede">{t('challenge.body')}</p>
            </Reveal>

            <ul className="mt-9 space-y-5">
              {points.map((p, i) => (
                <Reveal as="li" key={p.title} delay={180 + i * 90}>
                  <div className="flex gap-4 border-s-2 border-mint-400/50 ps-5">
                    <div>
                      <h3 className="text-base font-bold text-navy-900">{p.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-navy-800/60">{p.body}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
