import { PostHero } from '@/components/site/PostHero'
import { tornClip } from '@/components/site/torn'
import { projects } from '@/content/projects'
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
  // Post slug → the project it goes deeper on, so each article links back to its project
  const related = Object.fromEntries(
    projects.flatMap((p) => (p.relatedPost ? [[p.relatedPost, { slug: p.slug, title: p.title }]] : [])),
  )
  return (
    <div className="post-scope" style={style}>
      <PostHero related={related} />
      {children}
    </div>
  )
}
