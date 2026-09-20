import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollManager from './components/layout/ScrollManager'
import ScrollProgress from './components/layout/ScrollProgress'

import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage'
import TermsPage from './pages/TermsPage'
import SecurityPage from './pages/SecurityPage'

export default function App() {
  return (
    <BrowserRouter>
      <ScrollManager />
      <ScrollProgress />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/security" element={<SecurityPage />} />
          {/* Unknown paths fall back to the landing page. */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}
