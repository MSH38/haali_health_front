import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { CheckCircle2, Loader2, Mail, Send } from 'lucide-react'
import Reveal from './Reveal'

const FREE_EMAIL_DOMAINS = [
  'gmail.com',
  'hotmail.com',
  'outlook.com',
  'yahoo.com',
  'icloud.com',
  'live.com',
  'proton.me',
]

const EMPTY = { name: '', hospital: '', email: '', role: '', interest: '' }

export default function Contact() {
  const { t } = useTranslation()
  const f = t('contact.form', { returnObjects: true })
  const assurances = t('contact.assurances', { returnObjects: true })

  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | done

  const update = (key) => (e) => {
    setValues((v) => ({ ...v, [key]: e.target.value }))
    setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev))
  }

  const validate = () => {
    const next = {}
    if (!values.name.trim()) next.name = f.errors.name
    if (!values.hospital.trim()) next.hospital = f.errors.hospital

    const email = values.email.trim().toLowerCase()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      next.email = f.errors.email
    } else if (FREE_EMAIL_DOMAINS.includes(email.split('@')[1])) {
      // This page sells to hospitals — a work address keeps the lead list clean.
      next.email = f.errors.emailPersonal
    }

    setErrors(next)
    return Object.keys(next).length === 0
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setStatus('sending')
    // TODO: replace with the real endpoint (CRM, form service, or API route).
    await new Promise((r) => setTimeout(r, 900))
    console.info('[Haali Health] demo request', values)
    setStatus('done')
  }

  const reset = () => {
    setValues(EMPTY)
    setErrors({})
    setStatus('idle')
  }

  const fieldClass = (key) =>
    `w-full rounded-xl border bg-white px-4 py-3.5 text-sm text-navy-900 shadow-sm outline-none transition-colors placeholder:text-navy-800/35 ${
      errors[key]
        ? 'border-red-400 focus:border-red-500'
        : 'border-navy-100 focus:border-mint-400 focus:ring-2 focus:ring-mint-400/25'
    }`

  return (
    <section id="contact" className="scroll-mt-20 bg-white py-20 lg:py-28">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-20">
          {/* Pitch */}
          <div className="text-center lg:text-start">
            <Reveal>
              <span className="eyebrow">
                <Mail className="h-3.5 w-3.5" />
                {t('contact.eyebrow')}
              </span>
              <h2 className="h2 mt-5">{t('contact.title')}</h2>
              <p className="lede mt-5">{t('contact.subtitle')}</p>
            </Reveal>

            <Reveal delay={120}>
              <ul className="mx-auto mt-8 max-w-md space-y-3 text-start lg:mx-0">
                {assurances.map((a) => (
                  <li key={a} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-mint-700" />
                    <span className="text-sm font-medium text-navy-800/75">{a}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Form card */}
          <Reveal delay={160}>
            <div className="relative">
              <div
                className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-mint-400/15 to-navy-800/10 blur-2xl"
                aria-hidden="true"
              />

              <div className="relative rounded-3xl border border-navy-100 bg-white p-7 shadow-lift sm:p-9">
                {status === 'done' ? (
                  <div className="py-10 text-center">
                    <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-mint-100 text-mint-800">
                      <CheckCircle2 className="h-8 w-8" />
                    </span>
                    <h3 className="mt-6 text-xl font-extrabold text-navy-900">{f.success}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-navy-800/60">{f.successNote}</p>
                    <button type="button" onClick={reset} className="btn-outline mt-7">
                      {f.again}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={onSubmit} noValidate>
                    <h3 className="text-xl font-extrabold text-navy-900">{f.title}</h3>

                    <div className="mt-7 space-y-5">
                      <div>
                        <label htmlFor="name" className="mb-2 block text-sm font-bold text-navy-800">
                          {f.name}
                        </label>
                        <input
                          id="name"
                          type="text"
                          value={values.name}
                          onChange={update('name')}
                          placeholder={f.namePlaceholder}
                          aria-invalid={!!errors.name}
                          className={fieldClass('name')}
                        />
                        {errors.name && (
                          <p className="mt-1.5 text-xs font-medium text-red-500">{errors.name}</p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="hospital"
                          className="mb-2 block text-sm font-bold text-navy-800"
                        >
                          {f.hospital}
                        </label>
                        <input
                          id="hospital"
                          type="text"
                          value={values.hospital}
                          onChange={update('hospital')}
                          placeholder={f.hospitalPlaceholder}
                          aria-invalid={!!errors.hospital}
                          className={fieldClass('hospital')}
                        />
                        {errors.hospital && (
                          <p className="mt-1.5 text-xs font-medium text-red-500">
                            {errors.hospital}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="mb-2 block text-sm font-bold text-navy-800"
                        >
                          {f.email}
                        </label>
                        <input
                          id="email"
                          type="email"
                          dir="ltr"
                          value={values.email}
                          onChange={update('email')}
                          placeholder={f.emailPlaceholder}
                          aria-invalid={!!errors.email}
                          className={`${fieldClass('email')} text-start`}
                        />
                        {errors.email && (
                          <p className="mt-1.5 text-xs font-medium text-red-500">{errors.email}</p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="role" className="mb-2 block text-sm font-bold text-navy-800">
                          {f.role}
                        </label>
                        <select
                          id="role"
                          value={values.role}
                          onChange={update('role')}
                          className={`${fieldClass('role')} appearance-none`}
                        >
                          <option value="">{f.rolePlaceholder}</option>
                          {f.roles.map((r) => (
                            <option key={r} value={r}>
                              {r}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Optional — helps route the enquiry, never blocks it. */}
                      <div>
                        <label
                          htmlFor="interest"
                          className="mb-2 flex items-center gap-2 text-sm font-bold text-navy-800"
                        >
                          {f.interest}
                          <span className="rounded-md bg-navy-50 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-navy-800/50">
                            {f.interestOptional}
                          </span>
                        </label>
                        <select
                          id="interest"
                          value={values.interest}
                          onChange={update('interest')}
                          className={`${fieldClass('interest')} appearance-none`}
                        >
                          <option value="">{f.interestPlaceholder}</option>
                          {f.interests.map((item) => (
                            <option key={item} value={item}>
                              {item}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      className="btn-primary mt-7 w-full disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {status === 'sending' ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          {f.submitting}
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          {f.submit}
                        </>
                      )}
                    </button>

                    <p className="mt-4 text-center text-xs leading-relaxed text-navy-800/45">
                      {f.privacy}
                    </p>
                  </form>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
