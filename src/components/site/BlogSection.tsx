import { listedPosts } from '@/content/posts'
import type { Locale } from '@/content/types'
import { Link } from '@/i18n/navigation'
import { getLocale, getTranslations } from 'next-intl/server'
import { byLanguage, Clipping } from './Clipping'
import { ArrowRight } from './Icons'
import { Sheet } from './Sheet'

export async function BlogSection() {
  const t = await getTranslations('Blog')
  const locale = (await getLocale()) as Locale
  const latest = byLanguage(listedPosts, locale).slice(0, 3)

  return (
    <section className="blog-home" id="blog" aria-labelledby="blog-title">
      <Sheet torn="both" seed={53} paperClassName="blog-home-in">
        <div className="wrap">
          <header className="sec-head">
            <p className="eyebrow">{t('eyebrow')}</p>
            <h2 id="blog-title" className="sec-title wide">
              {t('title')}
            </h2>
            <p className="sec-lead">{t('homeLead')}</p>
          </header>
          <ul className="clips">
            {latest.map((post) => (
              <li key={post.slug}>
                <Clipping post={post} locale={locale} />
              </li>
            ))}
          </ul>
          <div className="see-all">
            <Link href="/blog" className="btn95 hot">
              {t('viewAll')}
              <ArrowRight />
            </Link>
          </div>
        </div>
      </Sheet>
    </section>
  )
}
