'use client'

import { languageName, posts } from '@/content/posts'
import type { Locale } from '@/content/types'
import { Link, usePathname } from '@/i18n/navigation'
import { useFormatter, useLocale, useTranslations } from 'next-intl'
import { ArrowLeft, ArrowRight } from './Icons'
import { Marquee } from './Marquee'

/** Header of an article: its term sliding huge in orange, the title in an open text file. */
export function PostHero({ related }: { related: Record<string, { slug: string; title: string }> }) {
  const t = useTranslations('Blog')
  const locale = useLocale() as Locale
  const format = useFormatter()
  const pathname = usePathname()
  const post = posts.find((p) => pathname === `/blog/${p.slug}`)
  if (!post) return null

  const language = languageName[post.lang][locale]
  const project = related[post.slug]
  return (
    <header className="post-hero">
      <Marquee text={post.term} className="post-echo" repeat={4} />
      <div className="wrap post-hero-in">
        <Link href="/blog" className="btn95 sm back">
          <ArrowLeft />
          {t('back')}
        </Link>
        <div className="win post-file" lang={post.lang === 'pt' ? 'pt-BR' : 'en'}>
          <div className="win-bar">
            <span className="win-title">
              {t('dir')}\{post.slug.slice(0, 24).toUpperCase()}.TXT
            </span>
            <span className="win-btns" aria-hidden="true">
              <i>_</i>
              <i>□</i>
              <i>×</i>
            </span>
          </div>
          <div className="post-file-body">
            <p className="post-meta">
              <time dateTime={post.date}>
                {format.dateTime(new Date(`${post.date}T12:00:00`), { day: 'numeric', month: 'long', year: 'numeric' })}
              </time>
              <span>{t('minutes', { count: post.readingMinutes })}</span>
              <span>{language}</span>
              <span>
                {t('by')}{' '}
                <Link href="/#sobre" rel="author">
                  Bruno Werner
                </Link>
              </span>
            </p>
            <h1 className="post-title wide">{post.title}</h1>
            <p className="post-desc">{post.description}</p>
            {project && (
              <Link href={`/projects/${project.slug}`} className="btn95 sm post-related">
                {t('relatedProject', { title: project.title })}
                <ArrowRight />
              </Link>
            )}
            {post.lang !== locale && (
              <p className="post-note" lang={locale === 'pt' ? 'pt-BR' : 'en'}>
                {t('onlyIn', { language: locale === 'pt' ? language.toLowerCase() : language })}
              </p>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
