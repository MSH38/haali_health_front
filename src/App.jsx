import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollManager from './components/layout/ScrollManager'
import ScrollProgress from './components/layout/ScrollProgress'

import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage'

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
          {/*
            Reviews #21/#22 removed the standalone Terms and Security pages
            from the MVP. The routes stay as redirects so existing links and
            bookmarks land on the single authoritative destination rather
            than on a 404 — Security & Governance now lives on the homepage.
          */}
          <Route path="/security" element={<Navigate to="/#security" replace />} />
          <Route path="/terms" element={<Navigate to="/" replace />} />
          {/* Unknown paths fall back to the landing page. */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}
