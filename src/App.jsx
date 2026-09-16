import Seo from './components/Seo'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Challenge from './components/Challenge'
import HowItWorks from './components/HowItWorks'
import Benefits from './components/Benefits'
import Security from './components/Security'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { VideoProvider } from './components/VideoLightbox'

export default function App() {
  return (
    <VideoProvider>
      <Seo />
      <Navbar />
      <main>
        <Hero />
        <Challenge />
        <HowItWorks />
        <Benefits />
        <Security />
        <Contact />
      </main>
      <Footer />
    </VideoProvider>
  )
}
