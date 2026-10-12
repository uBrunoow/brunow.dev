import type { Project } from '@/content/projects'
import type { Locale } from '@/content/types'
import { Link } from '@/i18n/navigation'
import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import { Floppy } from './Floppy'

/** A project as a file window: its screen if there is one, otherwise its floppy. */
export async function ProjectCard({ project, locale, index }: { project: Project; locale: Locale; index: number }) {
  const t = await getTranslations('Work')
  const image = project.shots?.desktop ?? project.image

  return (
    <Link href={`/projects/${project.slug}`} className="win pcard">
      <span className="win-bar">
        <span className="win-title">{project.slug}.exe</span>
        <span className="win-btns" aria-hidden="true">
          <i>_</i>
          <i>×</i>
        </span>
      </span>
      {image ? (
        <span className="pcard-shot">
          <Image src={image} alt="" fill sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 420px" />
        </span>
      ) : (
        <span className="pcard-shot none" aria-hidden="true">
          <span className="pcard-disk">
            <Floppy title={project.title} top={(project.context ?? t(project.category)).toUpperCase()} beige={index % 2 === 1} />
          </span>
        </span>
      )}
      <span className="pcard-body">
        <span className="pcard-meta">
          <span>{t(project.category)}</span>
          {project.context && <span>{project.context}</span>}
          {project.period && <span>{project.period[locale]}</span>}
          {!image && <span>{t('internal')}</span>}
        </span>
        <span className="pcard-title wide">{project.title}</span>
        <span className="pcard-desc">{project.description[locale]}</span>
        <span className="chips">
          {project.stack.slice(0, 4).map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </span>
      </span>
    </Link>
  )
}
