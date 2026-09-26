import { useTranslation } from 'react-i18next'
import { BarChart3, Target } from 'lucide-react'
import Icon from './Icon'
import Reveal from './Reveal'

/**
 * VBHC & Analytics (Reviews #16 / #17).
 *
 * Built to the locked specification, and the guardrails are load-bearing:
 *
 *  - Every figure is synthetic, so "Illustrative demo data" is pinned to the
 *    dashboard header rather than buried in small print.
 *  - Each metric carries an OBSERVED / MODELLED / ATTRIBUTED badge, and the
 *    modelled tile ships with the assumptions that produced it.
 *  - The trend line fluctuates. A steadily rising line, a green arrow or a
 *    positive delta would read as "Haali caused this improvement", which is a
 *    causal claim the product has no evidence for yet, so none appear here.
 */

/** Evidence badges. Deliberately neutral — none of these read as "good". */
const BADGE_STYLES = {
  observed: 'border-navy-800/15 bg-navy-50 text-navy-800/70',
  modelled: 'border-amber-400/40 bg-amber-50 text-amber-700',
  attributed: 'border-navy-800/10 bg-white text-navy-800/45',
}

function EvidenceBadge({ kind, label }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
        BADGE_STYLES[kind] ?? BADGE_STYLES.observed
      }`}
    >
      {label ?? kind}
    </span>
  )
}

/**
 * Illustrative cohort trend. The values wobble around a flat mean on purpose:
 * see the guardrail note above.
 */
const TREND = [62, 58, 65, 61, 66, 63]

function TrendChart({ xLabels }) {
  const W = 520
  const H = 150
  const min = 48
  const max = 76
  const x = (i) => (i / (TREND.length - 1)) * W
  const y = (v) => H - ((v - min) / (max - min)) * H
  const line = TREND.map((v, i) => `${i === 0 ? 'M' : 'L'} ${x(i)} ${y(v)}`).join(' ')
  const area = `${line} L ${W} ${H} L 0 ${H} Z`

  return (
    <div>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-36 w-full"
        preserveAspectRatio="none"
        role="img"
        aria-label="Illustrative cohort trend for a patient-reported measure across six periods"
      >
        {[0, 0.25, 0.5, 0.75, 1].map((f) => (
          <line
            key={f}
            x1="0"
            x2={W}
            y1={f * H}
            y2={f * H}
            stroke="currentColor"
            strokeWidth="1"
            className="text-navy-100"
          />
        ))}
        <path d={area} className="fill-navy-500/10" />
        <path
          d={line}
          fill="none"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="stroke-navy-600"
          vectorEffect="non-scaling-stroke"
        />
        {TREND.map((v, i) => (
          <circle key={i} cx={x(i)} cy={y(v)} r="4" className="fill-navy-600" />
        ))}
      </svg>

      <div className="mt-2 flex justify-between gap-1">
        {xLabels.map((l) => (
          <span key={l} className="text-[10px] font-medium text-navy-800/45">
            {l}
          </span>
        ))}
      </div>
    </div>
  )
}

/** Review-status split. Two bars rather than a donut — easier to read small. */
function ReviewSplit({ items }) {
  return (
    <div className="space-y-4">
      {items.map((item, i) => (
        <div key={item.label}>
          <div className="flex items-baseline justify-between gap-2">
            <span className="text-[12px] font-semibold leading-snug text-navy-800/75">
              {item.label}
            </span>
            <span className="text-sm font-extrabold tabular-nums text-navy-900">{item.value}%</span>
          </div>
          <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-navy-100">
            <div
              className={`h-full rounded-full ${i === 0 ? 'bg-navy-400' : 'bg-navy-700'}`}
              style={{ width: `${item.value}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

export default function VbhcAnalytics() {
  const { t } = useTranslation()
  const chain = t('vbhc.chain', { returnObjects: true })
  // Last entry is the destination the pipeline produces, not a step in it.
  const steps = chain.slice(0, -1)
  const destination = chain[chain.length - 1]
  const cards = t('vbhc.cards', { returnObjects: true })
  const d = t('vbhc.dashboard', { returnObjects: true })
  const evidence = t('vbhc.evidence', { returnObjects: true })
  const badgeLabel = (kind) => evidence.find((e) => e.badge === kind)?.title ?? kind

  return (
    <section id="vbhc" className="scroll-mt-20 bg-white py-20 lg:py-28">
      <div className="container-x">
        {/* ---------- 1. Section introduction ---------- */}
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="eyebrow">
            <BarChart3 className="h-3.5 w-3.5" />
            {t('vbhc.eyebrow')}
          </span>
          <h2 className="h2 mt-5">{t('vbhc.title')}</h2>
          <p className="lede mt-5">{t('vbhc.subtitle')}</p>
        </Reveal>

        {/* ---------- 2. Value chain: five steps, one destination ---------- */}
        <Reveal delay={80}>
          <div className="mt-14 rounded-3xl border border-navy-100 bg-surface p-6 lg:p-8">
            <h3 className="text-[11px] font-bold uppercase tracking-widest text-mint-700">
              {t('vbhc.chainTitle')}
            </h3>

            {/*
              The five steps are the pipeline; the sixth chain entry is the
              destination it produces, so it sits below the rail rather than
              competing with the steps as a seventh equal pill.
            */}
            <ol className="mt-6 grid gap-x-3 gap-y-5 lg:grid-cols-5">
              {steps.map((stage, i) => (
                <li key={stage} className="relative flex gap-4 lg:block">
                  {/* Vertical rail (mobile) — connects this step to the next */}
                  {i < steps.length - 1 && (
                    <span
                      className="absolute top-7 h-[calc(100%-0.5rem)] w-px bg-navy-200 ltr:left-[13px] rtl:right-[13px] lg:hidden"
                      aria-hidden="true"
                    />
                  )}
                  {/*
                    Desktop rail: half-line, circle, half-line — so the circle
                    lands on the cell's centre line, directly above its label.
                    The outer halves are transparent (not absent) to keep every
                    circle on the same centre regardless of position.
                  */}
                  <div className="flex items-center">
                    <span
                      className={`hidden h-px flex-1 lg:block ${i === 0 ? 'bg-transparent' : 'bg-navy-200'}`}
                      aria-hidden="true"
                    />
                    <span className="relative z-10 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-navy-200 bg-white text-[11px] font-extrabold tabular-nums text-navy-800/70 lg:mx-2">
                      {i + 1}
                    </span>
                    <span
                      className={`hidden h-px flex-1 lg:block ${
                        i === steps.length - 1 ? 'bg-transparent' : 'bg-navy-200'
                      }`}
                      aria-hidden="true"
                    />
                  </div>
                  <p className="self-center text-[13px] font-bold leading-snug text-navy-900 lg:mt-3 lg:px-2 lg:text-center">
                    {stage}
                  </p>
                </li>
              ))}
            </ol>

            <div className="mt-7 flex items-center gap-4 rounded-2xl bg-navy-800 px-5 py-4">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-mint-400 text-navy-900">
                <Target className="h-5 w-5" strokeWidth={2.2} aria-hidden="true" />
              </span>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-mint-400">
                  {t('vbhc.chainOutcome')}
                </p>
                <p className="mt-0.5 text-base font-extrabold leading-snug text-white">
                  {destination}
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ---------- 3. Executive-value cards ---------- */}
        <div className="mt-6 grid gap-5 lg:mt-8 lg:grid-cols-3">
          {cards.map((card, i) => (
            <Reveal key={card.title} delay={i * 90}>
              <article className="card card-hover group h-full">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-navy-800 text-mint-400 transition-colors duration-300 group-hover:bg-mint-400 group-hover:text-navy-900">
                  <Icon name={card.icon} className="h-5 w-5" strokeWidth={2.2} />
                </span>
                <h3 className="mt-5 text-[11px] font-bold uppercase tracking-widest text-mint-700">
                  {card.title}
                </h3>
                <p className="mt-2 text-lg font-extrabold leading-snug text-navy-900">
                  {card.headline}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-navy-800/65">{card.body}</p>
              </article>
            </Reveal>
          ))}
        </div>

        {/* ---------- 4–12. Executive Snapshot ---------- */}
        <Reveal delay={100}>
          <div className="mt-6 overflow-hidden rounded-3xl border border-navy-100 bg-surface shadow-card lg:mt-8">
            {/* Header — the illustrative label stays attached to the dashboard */}
            <div className="flex flex-col gap-3 border-b border-navy-100 bg-white px-6 py-5 sm:flex-row sm:items-center sm:justify-between lg:px-8">
              <div>
                <h3 className="text-lg font-extrabold tracking-tight text-navy-900">{d.title}</h3>
                <p className="mt-1 text-sm text-navy-800/55">{d.subtitle}</p>
              </div>
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-amber-400/40 bg-amber-50 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-amber-700">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                {d.label}
              </span>
            </div>

            <div className="space-y-4 p-6 lg:p-8">
              {/* Row 1 — four KPI cards */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {d.kpis.map((kpi) => (
                  <div key={kpi.label} className="rounded-2xl border border-navy-100 bg-white p-5">
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-[28px] font-extrabold leading-none tabular-nums text-navy-900">
                        {kpi.value}
                      </span>
                      <EvidenceBadge kind={kpi.badge} label={badgeLabel(kpi.badge)} />
                    </div>
                    <p className="mt-3 text-[12px] font-semibold leading-snug text-navy-800/60">
                      {kpi.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* Row 2 — trend chart (~62%) + review-status split */}
              <div className="grid gap-4 lg:grid-cols-[1.65fr_1fr]">
                <div className="rounded-2xl border border-navy-100 bg-white p-5">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h4 className="text-sm font-extrabold text-navy-900">{d.chart.title}</h4>
                      <p className="mt-0.5 text-[11px] font-medium text-navy-800/45">
                        {d.chart.sub}
                      </p>
                    </div>
                    <EvidenceBadge kind={d.chart.badge} label={badgeLabel(d.chart.badge)} />
                  </div>

                  <p className="mt-4 text-[10px] font-semibold uppercase tracking-wider text-navy-800/40">
                    {d.chart.yLabel}
                  </p>
                  <div className="mt-2">
                    <TrendChart xLabels={d.chart.xLabels} />
                  </div>
                </div>

                <div className="rounded-2xl border border-navy-100 bg-white p-5">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <h4 className="text-sm font-extrabold text-navy-900">{d.split.title}</h4>
                    <EvidenceBadge kind={d.split.badge} label={badgeLabel(d.split.badge)} />
                  </div>
                  <div className="mt-6">
                    <ReviewSplit items={d.split.items} />
                  </div>
                </div>
              </div>

              {/* Row 3 — modelled value, visibly distinct from the observed rows */}
              <div className="grid gap-4 lg:grid-cols-2">
                <div className="rounded-2xl border border-dashed border-amber-400/50 bg-amber-50/40 p-6">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <h4 className="text-sm font-extrabold text-navy-900">{d.capacity.title}</h4>
                    <EvidenceBadge kind={d.capacity.badge} label={badgeLabel(d.capacity.badge)} />
                  </div>
                  <p className="mt-4 text-[40px] font-extrabold leading-none tabular-nums text-navy-900">
                    {d.capacity.value}
                  </p>
                  <p className="mt-2 text-[13px] font-semibold text-navy-800/65">
                    {d.capacity.label}
                  </p>
                  <p className="mt-4 border-t border-amber-400/25 pt-3 text-[11px] leading-relaxed text-navy-800/50">
                    {d.capacity.note}
                  </p>
                </div>

                <div className="rounded-2xl border border-dashed border-amber-400/50 bg-white p-6">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <h4 className="text-sm font-extrabold text-navy-900">{d.assumptions.title}</h4>
                    <EvidenceBadge
                      kind={d.assumptions.badge}
                      label={badgeLabel(d.assumptions.badge)}
                    />
                  </div>
                  <dl className="mt-4 divide-y divide-navy-100">
                    {d.assumptions.items.map((item) => (
                      <div
                        key={item.label}
                        className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5 py-2.5"
                      >
                        <dt className="text-[12px] font-medium text-navy-800/60">{item.label}</dt>
                        <dd className="text-[12px] font-bold tabular-nums text-navy-900">
                          {item.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ---------- 13. Evidence-status panel ---------- */}
        <Reveal delay={120}>
          <h3 className="mt-12 text-[11px] font-bold uppercase tracking-widest text-mint-700">
            {t('vbhc.evidenceTitle')}
          </h3>
        </Reveal>

        <div className="mt-5 grid gap-4 lg:grid-cols-3">
          {evidence.map((e, i) => (
            <Reveal key={e.badge} delay={i * 80}>
              <div className="h-full rounded-2xl border border-navy-100 bg-surface p-5">
                <EvidenceBadge kind={e.badge} label={e.title} />
                <p className="mt-3 text-sm font-semibold leading-relaxed text-navy-800/80">
                  {e.body}
                </p>
                <p className="mt-2 text-[11px] leading-relaxed text-navy-800/45">{e.examples}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* ---------- 14–15. Strategic close + CTA ---------- */}
        <Reveal delay={140}>
          <div className="mt-12 rounded-3xl border border-navy-100 bg-navy-50/70 p-8 lg:p-12">
            <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center lg:gap-14">
              <div>
                <h3 className="text-2xl font-extrabold leading-snug tracking-tight text-navy-900 sm:text-[1.75rem]">
                  {t('vbhc.closing.title')}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-navy-800/70">
                  {t('vbhc.closing.body')}
                </p>
              </div>

              <div className="lg:text-end">
                <p className="text-sm font-bold text-navy-800/70">{t('vbhc.cta.prompt')}</p>
                <a href="#contact" className="btn-primary mt-4">
                  {t('vbhc.cta.button')}
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
