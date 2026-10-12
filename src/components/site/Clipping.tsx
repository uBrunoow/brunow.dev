import { languageName, type Post } from '@/content/posts'
import type { Locale } from '@/content/types'
import { Link } from '@/i18n/navigation'
import { getFormatter, getTranslations } from 'next-intl/server'

/** One article as a clipping: its key term set huge in orange on an ink block, the rest on paper. */
export async function Clipping({ post, locale }: { post: Post; locale: Locale }) {
  const t = await getTranslations('Blog')
  const format = await getFormatter()
  return (
    <Link href={`/blog/${post.slug}`} className="clip" lang={post.lang === 'pt' ? 'pt-BR' : 'en'}>
      <span className="clip-term wide" aria-hidden="true">
        {post.term}
      </span>
      <span className="clip-body">
        <span className="clip-meta">
          <time dateTime={post.date}>
            {format.dateTime(new Date(`${post.date}T12:00:00`), { day: 'numeric', month: 'short', year: 'numeric' })}
          </time>
          <span>{t('minutes', { count: post.readingMinutes })}</span>
          <span>{languageName[post.lang][locale]}</span>
        </span>
        <span className="clip-title">{post.title}</span>
        <span className="clip-desc">{post.description}</span>
        <span className="clip-read">{t('read')} →</span>
      </span>
    </Link>
  )
}

/** Posts in the visitor's language come first, then the rest, each group newest first. */
export function byLanguage(list: Post[], locale: Locale) {
  return [...list.filter((p) => p.lang === locale), ...list.filter((p) => p.lang !== locale)]
}
