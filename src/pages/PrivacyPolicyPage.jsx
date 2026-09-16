import LegalPage from '../components/layout/LegalPage'

/**
 * Renders the four-step voice pipeline inside section 4 only.
 * Every other section falls through to the shared prose treatment.
 */
function VoicePipeline(section) {
  if (!section.steps) return null

  return (
    <ol className="mt-6 grid gap-3 sm:grid-cols-2">
      {section.steps.map((step, i) => (
        <li key={step.title} className="rounded-xl border border-navy-100 bg-surface p-5">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-navy-800 text-xs font-extrabold text-mint-400">
            {i + 1}
          </span>
          <h3 className="mt-3 text-sm font-bold text-navy-900">{step.title}</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-navy-800/65">{step.body}</p>
        </li>
      ))}
    </ol>
  )
}

export default function PrivacyPolicyPage() {
  return <LegalPage ns="privacy" renderSection={VoicePipeline} />
}
