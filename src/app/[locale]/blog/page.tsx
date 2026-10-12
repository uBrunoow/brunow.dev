import { byLanguage, Clipping } from '@/components/site/Clipping'
import { PageHead } from '@/components/site/PageHead'
import { listedPosts } from '@/content/posts'
import type { Locale } from '@/content/types'
import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Blog' })
  return { title: t('pageTitle'), description: t('lead') }
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('Blog')
  const list = byLanguage(listedPosts, locale as Locale)

  return (
    <div className="page">
      <PageHead eyebrow={t('eyebrow')} title={t('pageTitle')} lead={t('lead')}>
        <p className="page-count">
          {t('dir')} · {t('count', { count: list.length })}
        </p>
      </PageHead>
      <div className="wrap blog-index">
        <ul className="clips">
          {list.map((post) => (
            <li key={post.slug}>
              <Clipping post={post} locale={locale as Locale} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
