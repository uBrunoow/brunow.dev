import { getPost } from '@/content/posts'
import type { Locale } from '@/content/types'
import { getPathname } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import type { Metadata } from 'next'

export const siteName = 'Bruno Werner'

/** Public origin, without a trailing slash. Set NEXT_PUBLIC_SITE_URL when the site moves to its own domain. */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://brunow-dev.vercel.app').replace(/\/$/, '')

export const jobTitle: Record<Locale, string> = {
  pt: 'Desenvolvedor Fullstack',
  en: 'Fullstack Developer',
}

export const htmlLang: Record<Locale, string> = { pt: 'pt-BR', en: 'en' }
const ogLocale: Record<Locale, string> = { pt: 'pt_BR', en: 'en_US' }

/** Path of a page in a locale: Portuguese has no prefix, English lives under /en. */
export const localePath = (locale: Locale, path: string) => getPathname({ href: path, locale })

export const absoluteUrl = (path: string) => `${siteUrl}${path === '/' ? '' : path}`

interface PageSeo {
  locale: Locale
  /** Locale-less path, e.g. "/projects/ducktix". */
  path: string
  title: string
  description: string
  /** Path of the share card; defaults to the site card in this locale. */
  image?: string
}

/**
 * Metadata for a page that exists in every locale: its own canonical plus hreflang to its translations.
 * Next replaces `openGraph` wholesale in child segments, so every page sends the full set.
 */
export function pageMetadata({ locale, path, title, description, image }: PageSeo): Metadata {
  const languages = Object.fromEntries(routing.locales.map((l) => [htmlLang[l], localePath(l, path)]))
  const canonical = localePath(locale, path)
  return {
    title,
    description,
    alternates: {
      canonical,
      languages: { ...languages, 'x-default': localePath(routing.defaultLocale, path) },
      types: { 'application/rss+xml': '/feed.xml' },
    },
    openGraph: {
      type: 'website',
      siteName,
      url: canonical,
      title,
      description,
      locale: ogLocale[locale],
      alternateLocale: routing.locales.filter((l) => l !== locale).map((l) => ogLocale[l]),
      images: [{ url: image ?? `/api/og/site/${locale}`, width: 1200, height: 630, alt: title }],
    },
    twitter: { card: 'summary_large_image', title, description },
  }
}

/** Canonical URL of an article: the one in the language it is written in, whatever the interface locale. */
export const postPath = (slug: string) => {
  const post = getPost(slug)
  if (!post) throw new Error(`Unknown post: ${slug}`)
  return localePath(post.lang, `/blog/${slug}`)
}

/**
 * Metadata for an article. Each one is written in a single language, so the copy served under the other
 * locale points its canonical back to the original and no hreflang is declared.
 */
export function postMetadata(slug: string): () => Metadata {
  return () => {
    const post = getPost(slug)
    if (!post) return {}
    const url = postPath(slug)
    const description = post.seoDescription ?? post.description
    return {
      // Search results get the short title, without the "· Bruno Werner" suffix that would push it past 60 characters
      title: { absolute: post.seoTitle ?? post.title },
      description,
      alternates: { canonical: url, types: { 'application/rss+xml': '/feed.xml' } },
      // Hidden posts stay reachable by link but out of the index, like they are out of the listings
      ...(post.hidden && { robots: { index: false, follow: true } }),
      openGraph: {
        type: 'article',
        siteName,
        url,
        title: post.title,
        description,
        locale: ogLocale[post.lang],
        publishedTime: post.date,
        modifiedTime: post.updated ?? post.date,
        authors: [siteUrl],
        images: [{ url: `/api/og/post/${slug}`, width: 1200, height: 630, alt: post.title }],
      },
      twitter: { card: 'summary_large_image', title: post.title, description },
    }
  }
}
