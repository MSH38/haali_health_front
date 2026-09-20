import { useTranslation } from 'react-i18next'
import { ArrowLeft, ArrowRight, CheckCircle2, Mic, Play, Stethoscope } from 'lucide-react'
import Reveal from './Reveal'
import AmbientGlow from './AmbientGlow'
import { useVideo } from './VideoLightbox'

/** Fake voice waveform — decorative only. */
function Waveform() {
  const bars = [0.4, 0.75, 1, 0.55, 0.9, 0.35, 0.7, 1, 0.5, 0.85, 0.45, 0.95, 0.6, 0.8, 0.4]
  return (
    <div className="flex h-10 items-center gap-[3px]" aria-hidden="true">
      {bars.map((h, i) => (
        <span
          key={i}
          className="w-[3px] flex-1 rounded-full bg-mint-400/80 animate-wave"
          style={{ height: `${h * 100}%`, animationDelay: `${i * 70}ms` }}
        />
      ))}
    </div>
  )
}

export default function Hero() {
  const { t, i18n } = useTranslation()
  const isRtl = i18n.resolvedLanguage === 'ar'
  const Arrow = isRtl ? ArrowLeft : ArrowRight
  const w = t('hero.widget', { returnObjects: true })
  const openVideo = useVideo()

  return (
    <section id="top" className="relative overflow-hidden bg-navy-900 pt-32 pb-20 lg:pt-40 lg:pb-28">
      <AmbientGlow grid={64} intensity="strong" />

      <div className="container-x relative">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          {/* ---------- Copy ---------- */}
          <div className="text-center lg:text-start">
            <Reveal>
              <span className="eyebrow-dark">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-mint-400 animate-pulse-ring" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-mint-400" />
                </span>
                {t('hero.eyebrow')}
              </span>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="mt-6 text-[2.5rem] font-extrabold leading-[1.2] tracking-tight text-white sm:text-5xl sm:leading-[1.2] lg:text-[3.6rem]">
                <span className="text-spectrum block">{t('hero.titleAccent')}</span>
                <span className="block">{t('hero.title')}</span>
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-white/70 sm:mt-8 sm:text-lg lg:mx-0">
                {t('hero.subtitle')}
              </p>
            </Reveal>

            <Reveal delay={240}>
              <div className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center lg:justify-start">
                <a href="#contact" className="btn-gradient group">
                  {t('hero.ctaPrimary')}
                  <Arrow className="h-4 w-4 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
                </a>
                <button type="button" onClick={openVideo} className="btn-outline-dark group">
                  <Play className="h-4 w-4 fill-current transition-transform group-hover:scale-110" />
                  {t('hero.ctaSecondary')}
                </button>
              </div>
            </Reveal>

            <Reveal delay={320}>
              <p className="mt-10 border-t border-white/10 pt-6 text-xs font-medium uppercase tracking-wider text-white/40">
                {t('hero.trustLabel')}
              </p>
            </Reveal>
          </div>

          {/* ---------- Interactive UI placeholder ---------- */}
          <Reveal delay={200} className="relative">
            {/* Glow behind the card — green and blue, breathing out of phase */}
            <div aria-hidden="true">
              <div className="absolute inset-6 rounded-[2rem] bg-mint-400/20 blur-3xl animate-drift-b" />
              <div className="absolute inset-x-16 bottom-0 top-1/2 rounded-[2rem] bg-navy-500/25 blur-3xl animate-drift-c" />
            </div>

            {/* Float lives here, not on <Reveal>, so it can't fight the reveal transform. */}
            <div className="relative animate-float">
              <div className="relative overflow-hidden rounded-[1.75rem] border border-white/15 bg-white/[.07] p-[3px] shadow-2xl backdrop-blur-xl">
                {/*
                  Rotating light around the frame. The layer is oversized
                  (-inset-full) rather than centred with translate classes,
                  because the spin animation owns `transform` and would wipe
                  them out.
                */}
                <div
                  className="absolute -inset-full animate-spin-slow bg-[conic-gradient(from_0deg,transparent_0deg,#00FFA2_60deg,transparent_120deg,transparent_180deg,#5170FF_240deg,transparent_300deg)] opacity-70"
                  aria-hidden="true"
                />
              <div className="relative rounded-[1.6rem] bg-navy-950/95 p-6 sm:p-7">
                {/* Card header */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span className="grid h-9 w-9 place-items-center rounded-xl bg-mint-400/15 text-mint-400">
                      <Mic className="h-4 w-4" />
                    </span>
                    <span className="text-sm font-bold text-white">{w.label}</span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-mint-400/10 px-2.5 py-1 text-[11px] font-semibold text-mint-300">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-mint-400" />
                    {w.status}
                  </span>
                </div>

                {/* Waveform */}
                <div className="mt-5 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                  <Waveform />
                </div>

                {/* Transcript */}
                <p className="mt-5 text-sm leading-relaxed text-white/85">“{w.transcript}”</p>

                <span className="mt-3 inline-flex items-center gap-1.5 rounded-md bg-white/5 px-2.5 py-1 text-[11px] font-medium text-white/55">
                  {w.dialect}
                </span>

                {/* Confidence meter */}
                <div className="mt-6">
                  <div className="flex items-center justify-between text-[11px] font-semibold text-white/50">
                    <span>{w.confidence}</span>
                    <span className="text-mint-300">94%</span>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full w-[94%] rounded-full bg-brand-gradient" />
                  </div>
                </div>

                {/* Outcome */}
                <div className="mt-6 rounded-xl border border-mint-400/25 bg-mint-400/10 p-4">
                  <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-mint-300">
                    <Stethoscope className="h-3.5 w-3.5" />
                    {w.outcome}
                  </div>
                  <p className="mt-1.5 text-base font-bold text-white">{w.outcomeValue}</p>
                </div>

                {/* HIS handoff */}
                <div className="mt-4 flex items-center gap-2 text-xs font-medium text-white/50">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-mint-400" />
                  {w.handoff}
                </div>
              </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
