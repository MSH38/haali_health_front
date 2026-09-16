/**
 * SINGLE SOURCE OF TRUTH FOR COMPLIANCE CLAIMS.
 *
 * Read this before editing anything on the Security or Privacy pages.
 *
 * Hospital IT audit teams read those pages and will ask for the certificate.
 * Publishing "Certified" before a certificate exists is a procurement-ending
 * problem and a legal exposure, so every claim carries an explicit status:
 *
 *   'built'       — an engineering fact, true in the product today.
 *                   Safe to state plainly. Verify with engineering before use.
 *   'in-progress' — actively being pursued, NOT yet awarded. Renders in amber
 *                   with an explicit "not yet certified" label.
 *   'planned'     — on the roadmap, not started. Renders muted.
 *   'certified'   — formally awarded. ONLY set this when the certificate is in
 *                   hand; add `evidence` with the certificate/report reference.
 *
 * To publish a newly awarded certification: change its `status` to 'certified'
 * and add `evidence`. Nothing else needs to change anywhere in the codebase.
 */

export const STATUS = {
  BUILT: 'built',
  IN_PROGRESS: 'in-progress',
  PLANNED: 'planned',
  CERTIFIED: 'certified',
}

/** `key` maps to security.badges.<key> in the translation files. */
export const COMPLIANCE_ITEMS = [
  { key: 'pdpl', icon: 'landmark', status: STATUS.IN_PROGRESS },
  { key: 'residency', icon: 'server', status: STATUS.BUILT },
  { key: 'encryption', icon: 'lock', status: STATUS.BUILT },
  { key: 'nphies', icon: 'plug', status: STATUS.BUILT },
  { key: 'iso', icon: 'shield-check', status: STATUS.IN_PROGRESS },
]

/** Tailwind classes per status. Amber/muted must never read as "achieved". */
export const STATUS_STYLES = {
  [STATUS.CERTIFIED]: {
    pill: 'border-mint-400/40 bg-mint-400/10 text-mint-300',
    icon: 'bg-mint-400/15 text-mint-400',
    card: 'border-white/12 bg-white/[.06] hover:border-mint-400/40',
  },
  [STATUS.BUILT]: {
    pill: 'border-mint-400/40 bg-mint-400/10 text-mint-300',
    icon: 'bg-mint-400/15 text-mint-400',
    card: 'border-white/12 bg-white/[.06] hover:border-mint-400/40',
  },
  [STATUS.IN_PROGRESS]: {
    pill: 'border-amber-400/30 bg-amber-400/10 text-amber-300',
    icon: 'bg-white/5 text-white/45',
    card: 'border-dashed border-white/20 bg-navy-950/40 hover:border-white/30',
  },
  [STATUS.PLANNED]: {
    pill: 'border-white/15 bg-white/5 text-white/50',
    icon: 'bg-white/5 text-white/35',
    card: 'border-dashed border-white/15 bg-navy-950/40 hover:border-white/25',
  },
}
