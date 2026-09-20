import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import {
  Activity,
  AlertTriangle,
  Check,
  ClipboardList,
  Mic,
  Pencil,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  TrendingUp,
  X,
} from 'lucide-react'

/**
 * Static "hero graphic" mocks of the Haali product surfaces.
 *
 * Built from live DOM rather than screenshots so they stay crisp on retina,
 * inherit the brand scale from tailwind.config.js, and mirror under RTL —
 * every offset uses logical properties (`start-*`, `end-*`, `ps-*`, `pe-*`).
 *
 * LAYOUT. The cluster is laid out on a fixed-width canvas and scaled to
 * whatever width the column gives it, so text wraps identically at every
 * breakpoint. Within that canvas the cards are NOT individually positioned —
 * they sit in two flow columns laid over each other in a 3-track grid, where
 * the middle track is the overlap zone. That structure is what keeps the
 * composition safe: cards are sized by their content, so absolutely
 * positioning each one means hand-tuning tops against heights that change
 * whenever the copy does, and they collide the moment an estimate is off.
 * Here a column can only push its own cards down, the grid row auto-sizes to
 * the taller column, and the one overlap is the deliberate horizontal one.
 *
 * The stage height is measured from the canvas rather than fixed as an aspect
 * ratio, so nothing can be clipped by a ratio that stopped matching.
 *
 * Below `sm` the canvas would scale to ~0.55 and be unreadable, so the cards
 * fall back to a plain stack.
 *
 * One `variant` per How It Works step, so the zig-zag shows three different
 * surfaces rather than the same picture three times. All three are assembled
 * from the same primitives, which is what keeps them looking like one product
 * rather than three unrelated screenshots.
 *
 * Decorative: each tree is hidden from assistive tech behind one label.
 */

/**
 * Design width of the canvas. Kept close to the width the How It Works column
 * actually gives it (~560px at 1440) so the downscale stays mild and the type
 * renders near its nominal size.
 */
const CANVAS_W = 640

/**
 * Column geometry. The two columns sit side by side across a real gutter
 * rather than overlapping. Cards are opaque, so any horizontal overlap
 * occludes the card behind it and clips its headings mid-word — which is what
 * "overlapping bento" turns into once the cards carry real text. The layered
 * look comes from the vertical stagger, the stepped widths and the shadows.
 */
const LEAD_W = 350
const GUTTER = 18
const KPI_W = 300

/* --------------------------------------------------------------- primitives */

const TONES = {
  plain: 'bg-white border-slate-200',
  alert: 'bg-red-50 border-red-200',
}

const ACCENTS = {
  red: 'text-red-600',
  mint: 'text-mint-700',
  navy: 'text-navy-900',
}

function Card({ tone = 'plain', className = '', children }) {
  return <div className={`rounded-2xl border ${TONES[tone]} ${className}`}>{children}</div>
}

function Kpi({ label, value, sub, tone = 'plain', accent = 'red', Icon = AlertTriangle, children }) {
  return (
    <Card tone={tone} className="flex-1 p-3.5 shadow-sm">
      <div className="flex items-center gap-1.5">
        <Icon
          className={`h-3 w-3 shrink-0 ${tone === 'alert' ? 'text-red-500' : 'text-navy-800/40'}`}
          strokeWidth={2.5}
        />
        <span className="truncate text-[11px] font-bold uppercase tracking-wider text-navy-800/55">
          {label}
        </span>
      </div>

      <p className={`mt-1.5 text-[30px] font-extrabold leading-none tabular-nums ${ACCENTS[accent]}`}>
        {value}
      </p>
      <p className="mt-1 text-[11px] font-medium text-navy-800/50">{sub}</p>

      {children}
    </Card>
  )
}

/**
 * Wraps rather than truncating: the aside drops to its own line when the
 * column is too narrow to carry both, instead of clipping the heading.
 */
function CardTitle({ Icon, children, aside }) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-x-2 gap-y-0.5">
      <span className="flex shrink-0 items-center gap-1.5 whitespace-nowrap text-[14px] font-extrabold text-navy-900">
        {Icon ? (
          <Icon className="h-3.5 w-3.5 shrink-0 self-center text-navy-600" strokeWidth={2.5} />
        ) : null}
        {children}
      </span>
      {aside ? (
        <span className="min-w-0 text-[11px] font-medium text-navy-800/45">{aside}</span>
      ) : null}
    </div>
  )
}

/** The Accept / Correct / Reject triad shown beside every suggested code. */
function CodeActions() {
  const actions = [
    { label: 'Accept', Icon: Check, className: 'border-mint-200 bg-mint-50 text-mint-800' },
    { label: 'Correct', Icon: Pencil, className: 'border-slate-200 bg-white text-navy-800/70' },
    { label: 'Reject', Icon: X, className: 'border-slate-200 bg-white text-navy-800/50' },
  ]

  return (
    <div className="flex shrink-0 items-center gap-1">
      {actions.map(({ label, Icon, className }) => (
        <span
          key={label}
          className={`inline-flex items-center gap-1 rounded-full border px-2 py-[3px] text-[11px] font-semibold ${className}`}
        >
          <Icon className="h-2.5 w-2.5" strokeWidth={3} />
          {label}
        </span>
      ))}
    </div>
  )
}

function SuggestedCode({ term, code, meta }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1.5 border-t border-slate-100 py-2 first:border-t-0 first:pt-0">
      <div className="min-w-0">
        <p className="truncate text-[12px] font-bold text-navy-900">
          {term}{' '}
          <span dir="ltr" className="font-medium tabular-nums text-navy-800/45">
            {code}
          </span>
        </p>
        <p className="mt-0.5 truncate text-[11px] font-medium text-navy-800/45">{meta}</p>
      </div>
      <CodeActions />
    </div>
  )
}

function Bar({ label, count, percent }) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-2">
        <span className="truncate text-[12px] font-semibold text-navy-900">{label}</span>
        <span className="text-[12px] font-extrabold tabular-nums text-navy-800/60">{count}</span>
      </div>
      <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-gradient-to-r from-navy-600 to-navy-400"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  )
}

function Chip({ children }) {
  return (
    <span className="inline-flex items-center rounded-md bg-navy-50 px-1.5 py-0.5 text-[11px] font-semibold text-navy-700">
      {children}
    </span>
  )
}

/* ------------------------------------------------------------- shared cards */

/** Bar-chart style list. Counts drive the bar widths, longest = full width. */
function BarListCard({ title, Icon, items, className = '' }) {
  const max = Math.max(...items.map((i) => i.count))

  return (
    <Card className={`p-3.5 shadow-xl ${className}`}>
      <CardTitle Icon={Icon}>{title}</CardTitle>

      <div className="mt-3 space-y-2.5">
        {items.map((item) => (
          <Bar key={item.label} {...item} percent={(item.count / max) * 100} />
        ))}
      </div>
    </Card>
  )
}

function SuggestedCodesCard({ className = '' }) {
  return (
    <Card className={`p-3.5 shadow-xl ${className}`}>
      <CardTitle aside="6, each needs a person to decide">Suggested codes</CardTitle>

      <div className="mt-2.5">
        <SuggestedCode
          term="Generalized weakness"
          code="1137501002"
          meta="SNOMED_CT GPS · confidence 0.85"
        />
        <SuggestedCode term="Dizziness" code="404640003" meta="SNOMED_CT GPS · confidence 0.75" />
        <SuggestedCode
          term="Hypoglycaemia"
          code="302866003"
          meta="SNOMED_CT GPS · confidence 0.71"
        />
      </div>
    </Card>
  )
}

/* ------------------------------------------------------- 01 · Voice Triage */

function ClinicalSummaryCard({ className = '' }) {
  return (
    <Card className={`p-4 shadow-xl ${className}`}>
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="relative grid h-2 w-2 place-items-center">
            <span className="absolute inset-0 animate-pulse-ring rounded-full bg-red-500/40" />
            <span className="h-2 w-2 rounded-full bg-red-500" />
          </span>
          <span className="text-lg font-extrabold tracking-tight text-red-600">Critical</span>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-navy-50 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-navy-700">
          <Sparkles className="h-2.5 w-2.5" strokeWidth={2.5} />
          AI summary
        </span>
      </div>

      <p className="mt-3 text-[12px] font-medium leading-[1.65] text-navy-800/80">
        <span className="font-bold text-navy-900">Patient-reported:</span> The patient was uncertain
        about feeling generally well and said he does not remember the dietary/lifestyle advice
        given by doctors. He reported low blood sugar episodes (shakiness, sweating, dizziness)
        occurring often, consistent with the safety flag{' '}
        <span className="font-bold text-navy-900">&ldquo;Severe low blood sugar&rdquo;</span>.
      </p>

      <p className="mt-3 text-[11px] leading-relaxed text-navy-800/45">
        AI generated, patient reported. Not a clinical assessment. Consent given at 16:50, in
        English.
      </p>

      <div className="mt-3 border-t border-slate-100 pt-3">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-2.5 py-1 text-[11px] font-bold text-red-700 ring-1 ring-inset ring-red-200">
          <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
          Critical • Severe low blood sugar
        </span>
      </div>
    </Card>
  )
}

function TriageKpis({ className = '' }) {
  return (
    <div className={`flex gap-3 ${className}`}>
      <Kpi label="Needs your review" value="14" sub="of 15 waiting" />
      <Kpi label="Critical" value="6" sub="act today" tone="alert">
        <ul className="mt-2 space-y-0.5 border-t border-red-200/70 pt-2">
          {['Stephen Boyle', 'Michael Evans'].map((name) => (
            <li key={name} className="truncate text-[11px] font-semibold text-red-700">
              {name}
            </li>
          ))}
        </ul>
      </Kpi>
    </div>
  )
}

/* -------------------------------------------------------- 02 · Haali Voice */

/** Patient question + the vetted answer, with its sources shown. */
function CompanionCard({ className = '' }) {
  return (
    <Card className={`p-4 shadow-xl ${className}`}>
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="grid h-6 w-6 place-items-center rounded-full bg-navy-800">
            <Mic className="h-3 w-3 text-mint-400" strokeWidth={2.5} />
          </span>
          <span className="text-base font-extrabold tracking-tight text-navy-900">Haali Voice</span>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-mint-50 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-mint-800">
          <ShieldCheck className="h-2.5 w-2.5" strokeWidth={2.5} />
          Vetted only
        </span>
      </div>

      {/* Patient turn */}
      <div className="mt-3 flex justify-end">
        <p className="max-w-[80%] rounded-2xl rounded-ee-md bg-navy-50 px-3 py-2 text-[12px] font-medium leading-[1.6] text-navy-900">
          I skipped breakfast today — should I still take my metformin?
        </p>
      </div>

      {/* Companion turn */}
      <div className="mt-2 flex justify-start">
        <div className="max-w-[88%] rounded-2xl rounded-es-md border border-slate-200 bg-white px-3 py-2">
          <p className="text-[12px] font-medium leading-[1.65] text-navy-800/80">
            Your plan says to take metformin{' '}
            <span className="font-bold text-navy-900">with food</span>. Have something to eat first,
            then take it. If you cannot eat, skip this dose and tell your nurse at the next check-in.
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-1 border-t border-slate-100 pt-2">
            <Chip>Trust diabetes guidance v4</Chip>
            <Chip>Patient care plan</Chip>
          </div>
        </div>
      </div>

      <p className="mt-3 text-[11px] leading-relaxed text-navy-800/45">
        Answers are drawn only from vetted clinical content and this patient&rsquo;s own profile. No
        open-ended generation. Escalates to a clinician when out of scope.
      </p>
    </Card>
  )
}

function PatientProfileCard({ className = '' }) {
  const meds = [
    { name: 'Metformin 500mg', schedule: 'Twice daily, with food' },
    { name: 'Ramipril 5mg', schedule: 'Once daily, morning' },
  ]

  return (
    <Card className={`p-3.5 shadow-xl ${className}`}>
      <CardTitle Icon={ClipboardList} aside="Synced from HIS">
        Patient profile
      </CardTitle>

      <div className="mt-2.5 flex flex-wrap gap-1">
        <Chip>Type 2 diabetes</Chip>
        <Chip>Hypertension</Chip>
        <Chip>Arabic · Gulf</Chip>
      </div>

      <div className="mt-2">
        {meds.map((med) => (
          <div key={med.name} className="border-t border-slate-100 py-2 first:pt-1.5">
            <p className="truncate text-[12px] font-bold text-navy-900">{med.name}</p>
            <p className="mt-0.5 truncate text-[11px] font-medium text-navy-800/45">
              {med.schedule}
            </p>
          </div>
        ))}
      </div>
    </Card>
  )
}

function CompanionKpis({ className = '' }) {
  return (
    <div className={`flex gap-3 ${className}`}>
      <Kpi
        label="Answered without staff"
        value="68%"
        sub="of routine questions"
        accent="mint"
        Icon={ShieldCheck}
      />
      <Kpi
        label="Escalated to a nurse"
        value="9"
        sub="out of scope, routed"
        accent="navy"
        Icon={Activity}
      />
    </div>
  )
}

/* ---------------------------------------------------- 03 · Automated PROMs */

function PromScoreCard({ className = '' }) {
  return (
    <Card className={`p-4 shadow-xl ${className}`}>
      <div className="flex items-center justify-between gap-3">
        <div>
          <span className="text-base font-extrabold tracking-tight text-navy-900">
            EQ-5D-5L index
          </span>
          <p className="mt-0.5 text-[11px] font-medium text-navy-800/45">
            Week 12 · knee replacement cohort · n=214
          </p>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-mint-50 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-mint-800">
          <TrendingUp className="h-2.5 w-2.5" strokeWidth={2.5} />
          Improving
        </span>
      </div>

      <div className="mt-3 flex items-end gap-2">
        <span className="text-[36px] font-extrabold leading-none tabular-nums text-navy-900">
          0.81
        </span>
        <span className="pb-0.5 text-[12px] font-bold tabular-nums text-mint-700">
          +0.14 vs baseline
        </span>
      </div>

      {/* Baseline → week 12 trend. Heights are the index scaled to the plot. */}
      <div className="mt-3 flex h-12 items-end gap-1">
        {[0.67, 0.69, 0.72, 0.71, 0.76, 0.79, 0.81].map((score, i, all) => (
          <div
            key={score}
            className={`flex-1 rounded-sm ${i === all.length - 1 ? 'bg-navy-600' : 'bg-navy-200'}`}
            style={{ height: `${(score / 0.81) * 100}%` }}
          />
        ))}
      </div>

      <p className="mt-3 border-t border-slate-100 pt-3 text-[11px] leading-relaxed text-navy-800/45">
        Collected in the patient&rsquo;s own routine, not as a separate chore. Streamed to the HIS
        at 09:12 — reimbursement-ready for P4Q and VBP reporting.
      </p>
    </Card>
  )
}

function PromsKpis({ className = '' }) {
  return (
    <div className={`flex gap-3 ${className}`}>
      <Kpi
        label="Response rate"
        value="86%"
        sub="across active cohorts"
        accent="mint"
        Icon={TrendingUp}
      />
      <Kpi
        label="Reports to HIS"
        value="214"
        sub="this week, automated"
        accent="navy"
        Icon={ClipboardList}
      />
    </div>
  )
}

/* -------------------------------------------------------------- composition */

/**
 * Each variant fills the same four slots, so the silhouette stays put.
 * slotA/slotB stack in the leading column, slotC/slotD in the trailing one.
 */
const VARIANTS = {
  triage: {
    label:
      'Haali triage queue: patients needing review, the AI clinical summary, suggested SNOMED codes and what is raising alerts.',
    slotA: (p) => <TriageKpis {...p} />,
    slotB: (p) => <ClinicalSummaryCard {...p} />,
    slotC: (p) => <SuggestedCodesCard {...p} />,
    slotD: (p) => (
      <BarListCard
        {...p}
        title="What is raising alerts"
        Icon={Stethoscope}
        items={[
          { label: 'Missed doses', count: 5 },
          { label: 'Foot infection', count: 4 },
          { label: 'High blood sugar crisis', count: 3 },
        ]}
      />
    ),
  },

  companion: {
    label:
      'Haali Voice companion: a patient question answered from vetted clinical content, the synced patient profile, and what patients ask most.',
    slotA: (p) => <CompanionKpis {...p} />,
    slotB: (p) => <CompanionCard {...p} />,
    slotC: (p) => <PatientProfileCard {...p} />,
    slotD: (p) => (
      <BarListCard
        {...p}
        title="What patients ask most"
        Icon={Mic}
        items={[
          { label: 'Medication timing', count: 42 },
          { label: 'Side effects', count: 31 },
          { label: 'Appointment prep', count: 18 },
        ]}
      />
    ),
  },

  proms: {
    label:
      'Automated PROMs: the EQ-5D-5L outcome trend, response rates by instrument, and reports streamed to the HIS.',
    slotA: (p) => <PromsKpis {...p} />,
    slotB: (p) => <PromScoreCard {...p} />,
    slotC: (p) => <SuggestedCodesCard {...p} />,
    slotD: (p) => (
      <BarListCard
        {...p}
        title="Response rate by instrument"
        Icon={ClipboardList}
        items={[
          { label: 'EQ-5D-5L', count: 92 },
          { label: 'Oxford Knee Score', count: 74 },
          { label: 'PHQ-9', count: 61 },
        ]}
      />
    ),
  },
}

const SLOT_KEYS = ['slotA', 'slotB', 'slotC', 'slotD']

/** How long each card holds the foreground before the focus moves on. */
const FOCUS_MS = 2600

/** Starting card per variant, so the three clusters are out of step. */
const VARIANT_PHASE = { triage: 1, companion: 2, proms: 0 }

/**
 * Advances a focus index while the cluster is on screen.
 *
 * Returns `null` instead of an index when the viewer asked for reduced motion,
 * which the cards read as "everything is in focus" — so the mock degrades to
 * the flat, fully legible version rather than freezing with one card lit and
 * the rest dimmed. Also parks the timer when scrolled away, so three of these
 * on one page are not all ticking in the background.
 */
function useFocusCycle(count, phase = 0) {
  const ref = useRef(null)
  const [index, setIndex] = useState(phase)

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIndex(null)
      return undefined
    }

    let timer = null
    const stop = () => {
      clearInterval(timer)
      timer = null
    }
    const play = () => {
      if (!timer) timer = setInterval(() => setIndex((i) => ((i ?? 0) + 1) % count), FOCUS_MS)
    }

    if (typeof IntersectionObserver === 'undefined') {
      play()
      return stop
    }

    const observer = new IntersectionObserver(([entry]) => (entry.isIntersecting ? play() : stop()), {
      threshold: 0.25,
    })
    observer.observe(el)
    return () => {
      observer.disconnect()
      stop()
    }
  }, [count])

  return [ref, index]
}

/**
 * Drift plus focus, on two nested elements because both are transforms and a
 * CSS animation would otherwise overwrite the inline one.
 *
 * The focused card grows 3% and lifts to full opacity; the rest sit back. The
 * growth is bounded well under the 24px column gap and the 18px gutter, so
 * nothing can drift or scale into a neighbour.
 */
function FocusCard({ active, delay, children }) {
  return (
    <div
      className="relative animate-float-card motion-reduce:animate-none"
      style={{ animationDelay: `${delay}ms`, zIndex: active ? 30 : 0 }}
    >
      <div
        className={`transition-[transform,opacity,filter] duration-700 ease-out ${
          active ? 'scale-[1.03] opacity-100 drop-shadow-2xl' : 'scale-100 opacity-60'
        }`}
      >
        {children}
      </div>
    </div>
  )
}

/**
 * Measures the stage's real width and the canvas's natural height, and returns
 * the scale between them. The stage is then given that scaled height, so it
 * reserves exactly the room the cluster needs — no aspect ratio to drift out
 * of sync with the content.
 */
function useCanvasFit() {
  const stageRef = useRef(null)
  const canvasRef = useRef(null)
  const [{ scale, height }, setFit] = useState({ scale: 1, height: 0 })

  useLayoutEffect(() => {
    const stage = stageRef.current
    const canvas = canvasRef.current
    if (!stage || !canvas) return undefined

    const measure = () => {
      // offsetHeight is pre-transform, so it stays the design height.
      const next = stage.clientWidth / CANVAS_W
      setFit({ scale: next, height: canvas.offsetHeight * next })
    }
    measure()

    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', measure)
      return () => window.removeEventListener('resize', measure)
    }

    const observer = new ResizeObserver(measure)
    observer.observe(stage)
    observer.observe(canvas)
    return () => observer.disconnect()
  }, [])

  return { stageRef, canvasRef, scale, height }
}

export default function DashboardMockup({ variant = 'triage', className = '' }) {
  const spec = VARIANTS[variant] ?? VARIANTS.triage
  const { stageRef, canvasRef, scale, height } = useCanvasFit()
  // Phase-shifted per variant so the three clusters on the page do not pulse
  // in lockstep as the reader scrolls past them.
  const [cycleRef, focus] = useFocusCycle(SLOT_KEYS.length, VARIANT_PHASE[variant] ?? 0)

  return (
    <div ref={cycleRef} role="img" aria-label={spec.label} className={`select-none ${className}`}>
      {/* Phone: plain stack. The canvas would scale to ~0.55 here. */}
      <div aria-hidden="true" className="space-y-3 sm:hidden">
        {SLOT_KEYS.map((slot) => (
          <div key={slot}>{spec[slot]({})}</div>
        ))}
      </div>

      {/* Tablet and up: the canvas, scaled into whatever width we are given. */}
      <div
        ref={stageRef}
        aria-hidden="true"
        className="relative hidden w-full sm:block"
        style={{ height: height || undefined }}
      >
        {/* Soft brand glow behind the cluster, so the white cards read as lifted. */}
        <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[3rem] bg-brand-gradient-soft opacity-[0.07] blur-3xl" />

        <div
          ref={canvasRef}
          className="absolute start-0 top-0 grid origin-top-left items-start rtl:origin-top-right"
          style={{
            width: CANVAS_W,
            transform: `scale(${scale})`,
            // Middle track is the gutter, so neither column can reach the other.
            gridTemplateColumns: `${LEAD_W}px ${GUTTER}px 1fr`,
          }}
        >
          {/* Leading column */}
          <div className="col-start-1 col-end-2 row-start-1 space-y-6">
            {/* Narrower than the hero, for a stepped leading edge. Inline, not a
                Tailwind class: a class built at runtime is never emitted,
                because the scanner only sees literal source text. */}
            <FocusCard active={focus === null || focus === 0} delay={0}>
              <div style={{ width: KPI_W }}>{spec.slotA({})}</div>
            </FocusCard>
            <FocusCard active={focus === null || focus === 1} delay={900}>
              {spec.slotB({})}
            </FocusCard>
          </div>

          {/* Trailing column, dropped so the two columns do not line up. */}
          <div className="col-start-3 col-end-4 row-start-1 space-y-6 pt-12">
            <FocusCard active={focus === null || focus === 2} delay={1800}>
              {spec.slotC({})}
            </FocusCard>
            <FocusCard active={focus === null || focus === 3} delay={2700}>
              {spec.slotD({})}
            </FocusCard>
          </div>
        </div>
      </div>
    </div>
  )
}
