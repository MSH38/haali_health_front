import Breadcrumbs from './Breadcrumbs'
import Reveal from '../Reveal'
import AmbientGlow from '../AmbientGlow'

/**
 * Shared header for every secondary page. Dark band so the fixed navbar
 * (which renders light-on-dark at the top of a page) stays legible.
 */
export default function PageHero({ eyebrow, title, subtitle, breadcrumb, meta }) {
  return (
    <section className="relative overflow-hidden bg-navy-900 pt-32 pb-16 lg:pt-40 lg:pb-20">
      <AmbientGlow />

      <div className="container-x relative">
        <Breadcrumbs current={breadcrumb} tone="light" />

        <Reveal>
          <div className="mt-7 max-w-3xl">
            {eyebrow && <span className="eyebrow-dark">{eyebrow}</span>}

            <h1 className="mt-5 text-3xl font-extrabold leading-[1.35] tracking-tight text-white sm:text-4xl sm:leading-[1.35] lg:text-[3rem]">
              {title}
            </h1>

            {subtitle && (
              <p className="mt-7 text-base leading-relaxed text-white/65 sm:mt-8 sm:text-lg">
                {subtitle}
              </p>
            )}

            {meta && (
              <p className="mt-7 border-t border-white/10 pt-5 text-xs font-medium text-white/40">
                {meta}
              </p>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
