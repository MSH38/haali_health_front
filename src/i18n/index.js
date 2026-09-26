import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import en from './locales/en.json'
import ar from './locales/ar.json'
import enPages from './locales/en.pages.json'
import arPages from './locales/ar.pages.json'

// Secondary-page copy lives in its own file to keep each one reviewable.
// It is merged under a `pages.` prefix: t('pages.about.hero.title').
const merge = (base, pages) => ({ ...base, pages })

export const LANGS = {
  ar: { label: 'العربية', short: 'AR', dir: 'rtl' },
  en: { label: 'English', short: 'EN', dir: 'ltr' },
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: merge(en, enPages) },
      ar: { translation: merge(ar, arPages) },
    },
    fallbackLng: 'ar',
    supportedLngs: ['ar', 'en'],
    // `path` is listed first so /ar and /en URLs win once a router is added.
    detection: {
      order: ['path', 'querystring', 'localStorage', 'navigator'],
      lookupQuerystring: 'lang',
      lookupLocalStorage: 'haali_lang',
      caches: ['localStorage'],
    },
    interpolation: { escapeValue: false },
    returnObjects: true,
  })

/** Keeps <html lang/dir> in sync with the active language. */
export function applyDocumentLanguage(lng) {
  const cfg = LANGS[lng] ?? LANGS.ar
  document.documentElement.lang = lng
  document.documentElement.dir = cfg.dir
}

applyDocumentLanguage(i18n.resolvedLanguage || 'ar')
i18n.on('languageChanged', applyDocumentLanguage)

export default i18n
