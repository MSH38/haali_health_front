import { useTranslation } from 'react-i18next'
import { Check, Play, Waypoints } from 'lucide-react'
import Reveal from './Reveal'
import { useVideo, VIDEO_SRC } from './VideoLightbox'

/**
 * Each step shows a real frame from the film rather than a gray box.
 *
 * `#t=<seconds>` is a media fragment: the browser fetches only metadata plus
 * the bytes around that timestamp and paints that frame as the still. No
 * ffmpeg-generated poster files needed, and giving each step a different
 * timestamp means three different stills instead of one repeated image.
 */
const STEP_FRAMES = [8, 52, 104]

function VideoFrame({ label, step, duration, startAt, onPlay }) {
  return (
    <button
      type="button"
      onClick={onPlay}
      aria-label={label}
      className="group relative block aspect-video w-full overflow-hidden rounded-2xl border border-navy-100 bg-navy-900 shadow-card transition-shadow duration-300 hover:shadow-lift"
    >
      <video
        src={`${VIDEO_SRC}#t=${startAt}`}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        preload="metadata"
        muted
        playsInline
        tabIndex={-1}
        aria-hidden="true"
      />

      {/* Legibility scrim for the badges and play control */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-navy-950/10 to-navy-950/25 transition-opacity duration-300 group-hover:from-navy-950/60"
        aria-hidden="true"
      />

      <div className="absolute inset-0 grid place-items-center">
        <span className="grid h-16 w-16 place-items-center rounded-full bg-white/95 text-navy-800 shadow-lift backdrop-blur transition-all duration-300 group-hover:scale-110 group-hover:bg-mint-400 group-hover:text-navy-950">
          <Play className="ms-0.5 h-6 w-6 fill-current rtl:ms-0 rtl:me-0.5" />
        </span>
      </div>

      {/* Corner meta */}
      <span className="absolute top-4 start-4 rounded-lg bg-navy-950/70 px-2.5 py-1 text-[11px] font-bold text-white/90 backdrop-blur">
        {step}
      </span>
      <span className="absolute bottom-4 start-4 text-xs font-medium text-white/75">{label}</span>
      <span
        dir="ltr"
        className="absolute bottom-4 end-4 rounded-md bg-navy-950/75 px-2 py-0.5 text-[11px] font-semibold tabular-nums text-white/90"
      >
        {duration}
      </span>
    </button>
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
                  <VideoFrame
                    label={t('video.play')}
                    step={`${step.n} · ${step.name}`}
                    duration={t('video.duration')}
                    startAt={STEP_FRAMES[i] ?? 0}
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
