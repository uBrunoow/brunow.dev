import { About } from '@/components/site/About'
import { BlogSection } from '@/components/site/BlogSection'
import { Contact } from '@/components/site/Contact'
import { Experience } from '@/components/site/Experience'
import { Featured } from '@/components/site/Featured'
import { Hero } from '@/components/site/Hero'
import { Marquee } from '@/components/site/Marquee'
import { hasCv } from '@/content/cv'
import { getTranslations, setRequestLocale } from 'next-intl/server'

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('Services')

  return (
    <>
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
