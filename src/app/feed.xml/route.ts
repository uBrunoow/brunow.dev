import { listedPosts } from '@/content/posts'
import { absoluteUrl, htmlLang, localePath, postPath, siteName } from '@/lib/seo'

export const dynamic = 'force-static'

const escape = (text: string) =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const rfc822 = (date: string) => new Date(`${date}T09:00:00-03:00`).toUTCString()

/** RSS 2.0 feed of the listed articles, newest first. */
export function GET() {
  const blog = absoluteUrl(localePath('pt', '/blog'))
  const items = listedPosts
    .map((post) => {
      const url = absoluteUrl(postPath(post.slug))
      return `    <item>
      <title>${escape(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${rfc822(post.date)}</pubDate>
      <description>${escape(post.description)}</description>
      <dc:language>${htmlLang[post.lang]}</dc:language>
    </item>`
    })
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${siteName} · Blog</title>
    <link>${blog}</link>
    <description>Integrações, ERP, filas e arquitetura de software, na prática.</description>
    <language>pt-BR</language>
    <lastBuildDate>${rfc822(listedPosts[0]?.date ?? '2026-01-01')}</lastBuildDate>
    <atom:link href="${absoluteUrl('/feed.xml')}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } })
}
