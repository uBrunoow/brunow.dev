'use client'

import { CV_PATH } from '@/content/cv-path'
import { jobs } from '@/content/profile'
import type { Locale } from '@/content/types'
import { Link, usePathname } from '@/i18n/navigation'
import { useLocale, useTranslations } from 'next-intl'
import { LocaleSwitch } from './LocaleSwitch'
import { Logo } from './Logo'
import { tornClip } from './torn'

/** The torn sheet across the top of every page. On the home page it also carries the facts. */
export function Header({ hasCv }: { hasCv: boolean }) {
  const t = useTranslations('Nav')
  const locale = useLocale() as Locale
  const pathname = usePathname()
  const home = pathname === '/'
  const onProjects = pathname.startsWith('/projects')
  const onBlog = pathname.startsWith('/blog')
  const [current, previous] = jobs

  return (
    <>
      <a href="#main" className="skip">
        {t('skip')}
      </a>
      <header className="sheet torn-bottom hdr">
        <div className="rim" style={{ clipPath: tornClip('bottom', 202, 24) }} aria-hidden="true" />
        <div className="paper" style={{ clipPath: tornClip('bottom', 101, 18) }}>
          <div className="wrap hdr-in">
            <div className="hdr-row">
              <Link href="/" className="brand" aria-label={`Bruno Werner, ${t('home')}`}>
                <Logo />
                <b>Bruno Werner</b>
              </Link>
              <nav className="nav" aria-label={t('menu')}>
                <Link href="/#sobre">{t('about')}</Link>
                <Link href="/projects" aria-current={onProjects ? 'page' : undefined}>
                  {t('projects')}
                </Link>
                <Link href="/#experiencia">{t('experience')}</Link>
                <Link href="/blog" aria-current={onBlog ? 'page' : undefined}>
                  {t('blog')}
                </Link>
                {hasCv && (
                  <a href={CV_PATH} download>
                    {t('cv')}
                  </a>
                )}
                <Link href="/#contato">{t('contact')}</Link>
              </nav>
              <LocaleSwitch label={t('language')} />
            </div>
            {home && (
              <dl className="facts">
                <div>
                  <dt>{t('role')}</dt>
                  <dd>{t('roleSub')}</dd>
                </div>
                <div>
                  <dt>{current.period[locale]}</dt>
                  <dd>{current.company}</dd>
                </div>
                <div>
                  <dt>{previous.period[locale]}</dt>
                  <dd>{previous.company}</dd>
                </div>
              </dl>
            )}
          </div>
        </div>
      </header>
    </>
  )
}
