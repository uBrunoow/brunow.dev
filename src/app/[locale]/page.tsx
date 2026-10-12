import { About } from '@/components/site/About'
import { BlogSection } from '@/components/site/BlogSection'
import { Contact } from '@/components/site/Contact'
import { Experience } from '@/components/site/Experience'
import { Featured } from '@/components/site/Featured'
import { Hero } from '@/components/site/Hero'
import { Marquee } from '@/components/site/Marquee'
import { hasCv } from '@/content/cv'
import type { Locale } from '@/content/types'
import { pageMetadata } from '@/lib/seo'
import { JsonLd, siteGraph } from '@/lib/structured-data'
import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Metadata' })
  return {
    ...pageMetadata({ locale: locale as Locale, path: '/', title: t('title'), description: t('description') }),
    // The home page shows the bare name, without the "· Bruno Werner" suffix
    title: { absolute: t('title') },
  }
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('Services')
  const meta = await getTranslations('Metadata')

  return (
    <>
      <JsonLd data={siteGraph(locale as Locale, meta('description'))} />
      <Hero />
      <div className="tape-wrap">
        <Marquee text={t('words').replace(/ ✦$/, '')} className="tape" repeat={3} />
      </div>
      <About />
      <Featured />
      <Experience />
      <BlogSection />
      <Contact hasCv={hasCv()} />
    </>
  )
}
