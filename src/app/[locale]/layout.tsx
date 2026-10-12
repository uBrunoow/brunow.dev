import Analytics from '@/components/Analytics'
import { Footer } from '@/components/site/Footer'
import { Header } from '@/components/site/Header'
import { googleAnalyticsConfig } from '@/config/google-analytics'
import { tagManagerConfig } from '@/config/tag-manager'
import { routing } from '@/i18n/routing'
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google'
import type { Metadata, Viewport } from 'next'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { hasCv } from '@/content/cv'
import { Anybody, Archivo, IBM_Plex_Mono, Silkscreen } from 'next/font/google'
import { notFound } from 'next/navigation'

const anybody = Anybody({
  subsets: ['latin', 'latin-ext'],
  axes: ['wdth'],
  variable: '--font-anybody',
  display: 'swap',
})

const archivo = Archivo({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-archivo',
  display: 'swap',
})

const plex = IBM_Plex_Mono({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600'],
  variable: '--font-plex',
  display: 'swap',
})

const silkscreen = Silkscreen({
  subsets: ['latin', 'latin-ext'],
  weight: '400',
  variable: '--font-silk',
  display: 'swap',
})

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export const viewport: Viewport = {
  themeColor: '#151413',
  colorScheme: 'dark',
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Metadata' })
  return {
    metadataBase: new URL('https://brunow-dev.vercel.app'),
    title: { default: t('title'), template: '%s · Bruno Werner' },
    description: t('description'),
    alternates: {
      canonical: locale === routing.defaultLocale ? '/' : `/${locale}`,
      languages: { 'pt-BR': '/', en: '/en' },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      locale: locale === 'pt' ? 'pt_BR' : 'en_US',
      type: 'website',
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)

  return (
    <html
      lang={locale === 'pt' ? 'pt-BR' : 'en'}
      className={`${anybody.variable} ${archivo.variable} ${plex.variable} ${silkscreen.variable}`}
      suppressHydrationWarning
    >
      <body>
        <GoogleTagManager gtmId={tagManagerConfig.tagManager.gtmId as string} />
        <GoogleAnalytics gaId={googleAnalyticsConfig.googleAnalytics.gaId as string} />
        <Analytics />
        <NextIntlClientProvider>
          <Header hasCv={hasCv()} />
          <main id="main">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
