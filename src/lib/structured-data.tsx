import { getPost } from '@/content/posts'
import { contact, jobs } from '@/content/profile'
import { getProject } from '@/content/projects'
import type { Locale } from '@/content/types'
import Portrait from '@/public/portrait-sticker.webp'
import { absoluteUrl, htmlLang, jobTitle, localePath, postPath, siteName, siteUrl } from './seo'

const personId = `${siteUrl}/#person`
const websiteId = `${siteUrl}/#website`

const crumbLabel: Record<Locale, { home: string; blog: string; projects: string }> = {
  pt: { home: 'Início', blog: 'Blog', projects: 'Projetos' },
  en: { home: 'Home', blog: 'Blog', projects: 'Projects' },
}

/** Schema.org JSON-LD; `<` is escaped so text can never close the script tag. */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  )
}

/**
 * Short form of the person, repeated on every page that cites them: an `@id` alone only resolves on the
 * home page, where the full node lives.
 */
const personRef = {
  '@type': 'Person',
  '@id': personId,
  name: siteName,
  url: siteUrl,
  sameAs: [contact.github, contact.linkedin],
}

const websiteRef = { '@type': 'WebSite', '@id': websiteId, name: siteName, url: siteUrl }

/** Articles are dated in Brazil; a bare date would be read as UTC midnight. */
const isoDate = (date: string) => `${date}T09:00:00-03:00`

function breadcrumbs(locale: Locale, trail: { name: string; path: string }[]) {
  const home = { name: crumbLabel[locale].home, path: '/' }
  return {
    '@type': 'BreadcrumbList',
    itemListElement: [home, ...trail].map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(localePath(locale, item.path)),
    })),
  }
}

/** Who the site is about and the site itself, for the home page. */
export function siteGraph(locale: Locale, description: string) {
  const current = jobs.find((job) => job.current)
  const url = absoluteUrl(localePath(locale, '/'))
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfilePage',
        '@id': `${url}#profile`,
        url,
        name: siteName,
        inLanguage: htmlLang[locale],
        mainEntity: { '@id': personId },
        isPartOf: { '@id': websiteId },
      },
      {
        ...personRef,
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
      },
      {
        ...websiteRef,
        inLanguage: Object.values(htmlLang),
        publisher: { '@id': personId },
      },
    ],
  }
}

/** BlogPosting and its breadcrumb trail, rendered at the top of each article. */
export function PostJsonLd({ slug }: { slug: string }) {
  const post = getPost(slug)
  if (!post) return null
  const url = absoluteUrl(postPath(slug))
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'BlogPosting',
            '@id': `${url}#article`,
            headline: post.title,
            description: post.description,
            datePublished: isoDate(post.date),
            dateModified: isoDate(post.updated ?? post.date),
            inLanguage: htmlLang[post.lang],
            url,
            mainEntityOfPage: url,
            image: absoluteUrl(`/api/og/post/${slug}`),
            timeRequired: `PT${post.readingMinutes}M`,
            author: personRef,
            publisher: personRef,
            isPartOf: websiteRef,
          },
          breadcrumbs(post.lang, [
            { name: crumbLabel[post.lang].blog, path: '/blog' },
            { name: post.title, path: `/blog/${slug}` },
          ]),
        ],
      }}
    />
  )
}

/**
 * A project as a creative work by the author. Projects with a public repository are source code;
 * client systems stay a plain CreativeWork, described only by what the page already says.
 */
export function ProjectJsonLd({ slug, locale }: { slug: string; locale: Locale }) {
  const project = getProject(slug)
  if (!project) return null
  const path = `/projects/${slug}`
  const url = absoluteUrl(localePath(locale, path))
  const repo = project.links?.find((link) => link.kind === 'repo')
  const site = project.links?.find((link) => link.kind === 'site')
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': repo ? 'SoftwareSourceCode' : 'CreativeWork',
            '@id': `${url}#project`,
            name: project.title,
            description: project.description[locale],
            url,
            inLanguage: htmlLang[locale],
            image: absoluteUrl(`/api/og/project/${slug}`),
            creator: personRef,
            keywords: project.stack.join(', '),
            ...(repo && { codeRepository: repo.url }),
            ...(site && !project.offline && { sameAs: site.url }),
            ...(project.relatedPost && {
              subjectOf: { '@type': 'BlogPosting', url: absoluteUrl(postPath(project.relatedPost)) },
            }),
            isPartOf: websiteRef,
          },
          breadcrumbs(locale, [
            { name: crumbLabel[locale].projects, path: '/projects' },
            { name: project.title, path },
          ]),
        ],
      }}
    />
  )
}
