import { featuredProjects } from '@/content/projects'
import type { Locale } from '@/content/types'
import { Link } from '@/i18n/navigation'
import { getLocale, getTranslations } from 'next-intl/server'
import { type Disk, Drive } from './Drive'
import { ArrowRight } from './Icons'

/** Top 5: each project is a floppy; picking one reads it into the A:\ drive window. */
export async function Featured() {
  const t = await getTranslations('Featured')
  const locale = (await getLocale()) as Locale

  const disks: Disk[] = featuredProjects.slice(0, 5).map((project, i) => ({
    slug: project.slug,
    title: project.title,
    path: project.slug.replace(/-/g, '_').toUpperCase(),
    context: project.context ?? '',
    period: project.period?.[locale] ?? '',
    year: project.period?.en.slice(0, 4) ?? '',
    role: project.role?.[locale] ?? '',
    description: project.description[locale],
    highlights: (project.highlights?.[locale] ?? []).slice(0, 3),
    stack: [...new Set([...project.stack, ...(project.integrations ?? [])])].slice(0, 7),
    log: project.log?.[locale] ?? [],
    beige: i % 2 === 1,
  }))

  return (
    <section className="featured" id="projetos" aria-labelledby="featured-title">
      <div className="wrap">
        <header className="featured-head">
          <div>
            <p className="eyebrow">{t('eyebrow')}</p>
            <h2 id="featured-title" className="sec-title wide">
              {t('title')}
            </h2>
          </div>
          <p className="note">{t('note')}</p>
        </header>

        <Drive
          disks={disks}
          labels={{
            label: t('label'),
            reading: t('reading'),
            open: t('open'),
            events: t.raw('events') as string,
            logs: t('logs'),
            connected: t('connected'),
            consoleLabel: t('consoleLabel'),
          }}
        />

        <div className="see-all">
          <Link href="/projects" className="btn95 ink">
            {t('all')}
            <ArrowRight />
          </Link>
        </div>
      </div>
    </section>
  )
}
