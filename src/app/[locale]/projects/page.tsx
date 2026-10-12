import { PageHead } from '@/components/site/PageHead'
import { ProjectCard } from '@/components/site/ProjectCard'
import { projects } from '@/content/projects'
import type { Locale } from '@/content/types'
import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Projects' })
  return { title: t('title'), description: t('lead') }
}

export default async function ProjectsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('Projects')
  const groups = [
    { id: 'trabalho', title: t('work'), lead: t('workLead'), items: projects.filter((p) => p.category === 'work') },
    { id: 'lab', title: t('lab'), lead: t('labLead'), items: projects.filter((p) => p.category !== 'work') },
  ]

  return (
    <div className="page">
      <PageHead eyebrow={t('eyebrow')} title={t('title')} lead={t('lead')} />

      {groups.map((group) => (
        <section key={group.id} className="pgroup" id={group.id} aria-labelledby={`${group.id}-title`}>
          <div className="wrap">
            <header className="pgroup-head">
              <h2 id={`${group.id}-title`} className="sec-title wide">
                {group.title}
              </h2>
              <p className="sec-lead">{group.lead}</p>
              <p className="pgroup-count">C:\PROJETOS\{group.id.toUpperCase()} · {t('count', { count: group.items.length })}</p>
            </header>
            <ul className="pcards">
              {group.items.map((project, i) => (
                <li key={project.slug}>
                  <ProjectCard project={project} locale={locale as Locale} index={i} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}
    </div>
  )
}
