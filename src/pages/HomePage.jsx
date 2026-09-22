import Seo from '../components/Seo'
import Hero from '../components/Hero'
import Challenge from '../components/Challenge'
import HowItWorks from '../components/HowItWorks'
import ClinicalAiSafety from '../components/ClinicalAiSafety'
import Benefits from '../components/Benefits'
import VbhcAnalytics from '../components/VbhcAnalytics'
import Security from '../components/Security'
import Contact from '../components/Contact'

/**
 * Section order is fixed by Review #16: product workflow → clinical trust →
 * provider value → strategic/executive value → enterprise readiness →
 * conversion. Reordering breaks the buyer journey the copy was written for.
 */
export default function HomePage() {
  return (
    <>
      <Seo />
      <Hero />
      <Challenge />
      <HowItWorks />
      <ClinicalAiSafety />
      <Benefits />
      <VbhcAnalytics />
      <Security />
      <Contact />
    </>
  )
}
