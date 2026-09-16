import { useTranslation } from 'react-i18next'
import { Check, Play, Waypoints } from 'lucide-react'
import Reveal from './Reveal'
import { useVideo } from './VideoLightbox'

/**
 * Media frame for a step. Clicking play opens the overview film in the
 * lightbox. Once per-step footage exists, drop a <video> or poster <img>
 * inside — the frame, ratio and hover state stay as they are.
 */
function VideoPlaceholder({ label, step, duration, onPlay }) {
  return (
    <div className="group relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-navy-100 bg-gradient-to-br from-navy-50 to-navy-100 shadow-card transition-shadow duration-300 hover:shadow-lift">
      {/* Faint grid texture */}
      <div
        className="absolute inset-0 opacity-[0.35] [background-image:linear-gradient(to_right,rgba(17,26,64,.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(17,26,64,.07)_1px,transparent_1px)] [background-size:32px_32px]"
        aria-hidden="true"
      />

      <div className="absolute inset-0 grid place-items-center">
        <button
          type="button"
          onClick={onPlay}
          aria-label={label}
          className="grid h-16 w-16 place-items-center rounded-full bg-white text-navy-800 shadow-lift transition-all duration-300 group-hover:scale-110 group-hover:bg-mint-400 group-hover:text-navy-950"
        >
          <Play className="ms-0.5 h-6 w-6 fill-current rtl:ms-0 rtl:me-0.5" />
        </button>
      </div>

      {/* Corner meta */}
      <span className="absolute top-4 start-4 rounded-lg bg-white/80 px-2.5 py-1 text-[11px] font-bold text-navy-800/70 backdrop-blur">
        {step}
      </span>
      <span className="absolute bottom-4 start-4 text-xs font-medium text-navy-800/45">{label}</span>
      <span
        dir="ltr"
        className="absolute bottom-4 end-4 rounded-md bg-navy-950/75 px-2 py-0.5 text-[11px] font-semibold tabular-nums text-white/90"
      >
        {duration}
      </span>
    </div>
  )
}

export default function HowItWorks() {
  const { t } = useTranslation()
  const steps = t('how.steps', { returnObjects: true })
  const openVideo = useVideo()

  return (
    <section id="solutions" className="bg-white py-20 lg:py-28">
      <div className="container-x">
        {/* Header */}
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="eyebrow">
            <Waypoints className="h-3.5 w-3.5" />
            {t('how.eyebrow')}
          </span>
          <h2 className="h2 mt-5">{t('how.title')}</h2>
          <p className="lede mt-5">{t('how.subtitle')}</p>
        </Reveal>

        {/* Zig-zag rows */}
        <div className="mt-16 space-y-20 lg:mt-24 lg:space-y-28">
          {steps.map((step, i) => {
            const flipped = i % 2 === 1

            return (
              <div key={step.name} className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                {/* Media */}
                <Reveal delay={80} className={flipped ? 'lg:order-2' : 'lg:order-1'}>
                  <VideoPlaceholder
                    label={t('video.play')}
                    step={`${step.n} · ${step.name}`}
                    duration={t('video.duration')}
                    onPlay={openVideo}
                  />
                </Reveal>

                {/* Copy */}
                <Reveal delay={160} className={flipped ? 'lg:order-1' : 'lg:order-2'}>
                  <div className="flex items-center gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-navy-800 text-sm font-extrabold text-mint-400">
                      {step.n}
                    </span>
                    <div>
                      <span className="block text-[11px] font-bold uppercase tracking-widest text-mint-700">
                        {step.tag}
                      </span>
                      <span className="block text-lg font-extrabold text-navy-900">{step.name}</span>
                    </div>
                  </div>

                  <h3 className="mt-6 text-2xl font-extrabold leading-snug tracking-tight text-navy-900 sm:text-[1.75rem]">
                    {step.title}
                  </h3>

                  <p className="mt-4 text-base leading-relaxed text-navy-800/65">{step.body}</p>

                  <ul className="mt-7 space-y-3">
                    {step.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-3">
                        <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-mint-100 text-mint-800">
                          <Check className="h-3 w-3" strokeWidth={3.5} />
                        </span>
                        <span className="text-sm font-medium leading-relaxed text-navy-800/80">
                          {b}
                        </span>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
