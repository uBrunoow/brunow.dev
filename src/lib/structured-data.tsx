import { getPost } from '@/content/posts'
import { contact, jobs } from '@/content/profile'
import type { Locale } from '@/content/types'
import Portrait from '@/public/portrait-sticker.webp'
import { absoluteUrl, htmlLang, jobTitle, postPath, siteName, siteUrl } from './seo'

const personId = `${siteUrl}/#person`
const websiteId = `${siteUrl}/#website`

/** Schema.org JSON-LD; `<` is escaped so text can never close the script tag. */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  )
}

/** Who the site is about and the site itself, for the home page. */
export function siteGraph(locale: Locale, description: string) {
  const current = jobs.find((job) => job.current)
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': personId,
        name: siteName,
        url: siteUrl,
        image: absoluteUrl(Portrait.src),
        jobTitle: jobTitle[locale],
        description,
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Joinville',
          addressRegion: 'SC',
          addressCountry: 'BR',
        },
        ...(current && { worksFor: { '@type': 'Organization', name: current.company, url: current.url } }),
        knowsAbout: ['Next.js', 'React', 'TypeScript', 'Python', 'Django', 'PostgreSQL', 'AWS', 'ERP integrations'],
        sameAs: [contact.github, contact.linkedin],
      },
      {
        '@type': 'WebSite',
        '@id': websiteId,
        url: siteUrl,
        name: siteName,
        inLanguage: Object.values(htmlLang),
        publisher: { '@id': personId },
      },
    ],
  }
}

/** BlogPosting for one article, rendered at the top of its page. */
export function PostJsonLd({ slug }: { slug: string }) {
  const post = getPost(slug)
  if (!post) return null
  const url = absoluteUrl(postPath(slug))
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.description,
        datePublished: post.date,
        inLanguage: htmlLang[post.lang],
        url,
        mainEntityOfPage: url,
        image: absoluteUrl(`/api/og/post/${slug}`),
        timeRequired: `PT${post.readingMinutes}M`,
        author: { '@type': 'Person', '@id': personId, name: siteName, url: siteUrl },
        publisher: { '@id': personId },
        isPartOf: { '@id': websiteId },
      }}
    />
  )
}
