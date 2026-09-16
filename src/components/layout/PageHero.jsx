import Breadcrumbs from './Breadcrumbs'
import Reveal from '../Reveal'

/**
 * Shared header for every secondary page. Dark band so the fixed navbar
 * (which renders light-on-dark at the top of a page) stays legible.
 */
export default function PageHero({ eyebrow, title, subtitle, breadcrumb, meta }) {
  return (
    <section className="relative overflow-hidden bg-navy-900 pt-32 pb-16 lg:pt-40 lg:pb-20">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-grid-navy [background-size:56px_56px]" />
        <div className="absolute -top-24 start-[-6%] h-[26rem] w-[26rem] rounded-full bg-mint-500/15 blur-[120px]" />
        <div className="absolute bottom-[-10rem] end-[-6%] h-[24rem] w-[24rem] rounded-full bg-navy-400/20 blur-[120px]" />
      </div>

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
