import LegalPage from '../components/layout/LegalPage'

/**
 * MVP website Privacy Policy (Review #20).
 *
 * Plain prose only — the voice/transcription pipeline diagram was removed
 * with the rest of the production processing claims, which belong in the
 * provider DPA rather than this page.
 */
export default function PrivacyPolicyPage() {
  return <LegalPage ns="privacy" />
}
