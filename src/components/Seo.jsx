import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { LANGS } from '../i18n'

const SITE = 'https://haalihealth.com'

/** Per-language meta tags, canonical and hreflang alternates. */
export default function Seo() {
  const { t, i18n } = useTranslation()
  const lng = i18n.resolvedLanguage || 'ar'
  const dir = LANGS[lng]?.dir ?? 'rtl'

  const title = t('meta.title')
  const description = t('meta.description')
  const canonical = `${SITE}/${lng}`

  return (
    <Helmet>
      <html lang={lng} dir={dir} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      {/* hreflang alternates — these resolve once /ar and /en routes exist */}
      <link rel="alternate" hrefLang="ar" href={`${SITE}/ar`} />
      <link rel="alternate" hrefLang="en" href={`${SITE}/en`} />
      <link rel="alternate" hrefLang="x-default" href={`${SITE}/ar`} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Haali Health" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:locale" content={t('meta.ogLocale')} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />

      <meta name="theme-color" content="#0A2540" />
    </Helmet>
  )
}
