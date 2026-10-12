import { posts } from '@/content/posts'
import { getProject, projects } from '@/content/projects'
import type { Locale } from '@/content/types'
import { routing } from '@/i18n/routing'
import { ogFonts, ogSize, PostCard, ProjectCard, SiteCard } from '@/lib/og'
import { htmlLang, jobTitle, siteUrl } from '@/lib/seo'
import { getTranslations } from 'next-intl/server'
import { ImageResponse } from 'next/og'

type Params = Promise<{ kind: string; slug: string }>

// Every card is rendered at build time; anything else is a 404
export const dynamic = 'force-static'
export const dynamicParams = false

export function generateStaticParams() {
  return [
    ...routing.locales.map((locale) => ({ kind: 'site', slug: locale })),
    ...posts.map((post) => ({ kind: 'post', slug: post.slug })),
    ...projects.map((project) => ({ kind: 'project', slug: project.slug })),
  ]
}

async function card(kind: string, slug: string) {
  if (kind === 'post') {
    const post = posts.find((p) => p.slug === slug)
    if (!post) return null
    const date = new Intl.DateTimeFormat(htmlLang[post.lang], { day: 'numeric', month: 'short', year: 'numeric' })
    const meta = `${date.format(new Date(`${post.date}T12:00:00`))} · ${post.readingMinutes} min`
    return <PostCard term={post.term} title={post.title} meta={meta} slug={post.slug} />
  }
  if (kind === 'project') {
    const project = getProject(slug)
    if (!project) return null
    return <ProjectCard title={project.title} context={project.context} stack={project.stack} />
  }
  if (kind === 'site' && routing.locales.includes(slug as Locale)) {
    const t = await getTranslations({ locale: slug, namespace: 'Metadata' })
    const role = `${jobTitle[slug as Locale]} · Joinville, SC`
    return <SiteCard role={role} description={t('description')} host={new URL(siteUrl).host} />
  }
  return null
}

export async function GET(_request: Request, { params }: { params: Params }) {
  const { kind, slug } = await params
  const element = await card(kind, slug)
  if (!element) return new Response('Not found', { status: 404 })
  return new ImageResponse(element, { ...ogSize, fonts: await ogFonts() })
}
