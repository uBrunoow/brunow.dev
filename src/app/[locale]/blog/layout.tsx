import { PostHero } from '@/components/site/PostHero'
import { tornClip } from '@/components/site/torn'
import { setRequestLocale } from 'next-intl/server'
import type { CSSProperties } from 'react'

export default async function BlogLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  // Articles are pasted on a torn sheet; the index page ignores these variables.
  const style = { '--torn': tornClip('both', 77, 18) } as CSSProperties
  return (
    <div className="post-scope" style={style}>
      <PostHero />
      {children}
    </div>
  )
}
