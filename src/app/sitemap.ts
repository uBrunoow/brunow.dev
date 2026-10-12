import { listedPosts } from '@/content/posts'
import { projects } from '@/content/projects'
import { routing } from '@/i18n/routing'
import { absoluteUrl, htmlLang, localePath, postPath } from '@/lib/seo'
import type { MetadataRoute } from 'next'

/** One entry per locale, each listing its translations. */
function localized(path: string, lastModified?: string): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(routing.locales.map((l) => [htmlLang[l], absoluteUrl(localePath(l, path))]))
  return routing.locales.map((locale) => ({
    url: absoluteUrl(localePath(locale, path)),
    lastModified,
    alternates: { languages },
  }))
}

export default function sitemap(): MetadataRoute.Sitemap {
  const newest = listedPosts[0]?.date
  return [
    ...localized('/', newest),
    ...localized('/projects'),
    ...projects.flatMap((project) => localized(`/projects/${project.slug}`)),
    ...localized('/blog', newest),
    // Articles exist in a single language, so only their canonical URL is listed
    ...listedPosts.map((post) => ({ url: absoluteUrl(postPath(post.slug)), lastModified: post.updated ?? post.date })),
  ]
}
