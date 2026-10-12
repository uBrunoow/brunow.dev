import { Flow } from '@/components/site/Architecture'
import { Floppy } from '@/components/site/Floppy'
import { ArrowLeft, ArrowRight, ArrowUpRight } from '@/components/site/Icons'
import { Marquee } from '@/components/site/Marquee'
import { Sheet } from '@/components/site/Sheet'
import { Win } from '@/components/site/Win'
import { posts } from '@/content/posts'
import { getProject, projects } from '@/content/projects'
import type { Locale } from '@/content/types'
import { Link } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import Image from 'next/image'
import type { CSSProperties } from 'react'
import { notFound } from 'next/navigation'

type Params = Promise<{ locale: string; slug: string }>

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => projects.map((project) => ({ locale, slug: project.slug })))
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, slug } = await params
  const project = getProject(slug)
  if (!project) return {}
  return { title: project.title, description: project.description[locale as Locale] }
}

/** A project opened like a file: properties dialog, its screen in a window, then what it does and how. */
export default async function ProjectPage({ params }: { params: Params }) {
  const { locale: raw, slug } = await params
  setRequestLocale(raw)
  const locale = raw as Locale
  const project = getProject(slug)
  if (!project) notFound()

  const t = await getTranslations('Project')
  const tw = await getTranslations('Work')
  const index = projects.indexOf(project)
  const next = projects[(index + 1) % projects.length]
  const post = project.relatedPost ? posts.find((p) => p.slug === project.relatedPost) : undefined
  const desktop = project.shots?.desktop ?? project.image
  const mobile = project.shots?.mobile
  const gallery = project.gallery ?? []
  const longestWord = Math.max(...project.title.split(/\s+/).map((word) => word.length))

  return (
    <article className="page project">
      <header className="pj-head">
        <Marquee text={project.title} className="page-echo" repeat={3} />
        <div className="wrap pj-head-in">
          <div className="pj-intro">
            <Link href="/projects" className="btn95 sm back">
              <ArrowLeft />
              {t('back')}
            </Link>
            <h1 className="pj-title wide" style={{ '--len': longestWord } as CSSProperties}>
              {project.title}
            </h1>
            <p className="pj-lead">{project.description[locale]}</p>
            {project.links && project.links.length > 0 && (
              <div className="ctas">
                {project.links.map((link, i) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`btn95${i === 0 ? ' hot' : ''}`}
                  >
                    {t(link.kind)}
                    <ArrowUpRight />
                  </a>
                ))}
              </div>
            )}
            {project.offline && <p className="pj-flag">{t('offline')}</p>}
            {!project.links && !project.offline && !desktop && <p className="pj-flag">{t('internal')}</p>}
          </div>

          <Win title={`${t('properties')}: ${project.slug}.exe`} className="props" buttons="?×" as="aside">
            <div className="props-top">
              <span className="props-disk" aria-hidden="true">
                <Floppy title={project.title} top={(project.context ?? tw(project.category)).toUpperCase()} />
              </span>
              <p className="props-name">{project.slug}.exe</p>
            </div>
            <dl>
              <div>
                <dt>{t('type')}</dt>
                <dd>{tw(project.category)}</dd>
              </div>
              {project.context && (
                <div>
                  <dt>{t('place')}</dt>
                  <dd>{project.context}</dd>
                </div>
              )}
              {project.role && (
                <div>
                  <dt>{t('role')}</dt>
                  <dd>{project.role[locale]}</dd>
                </div>
              )}
              {project.period && (
                <div>
                  <dt>{t('period')}</dt>
                  <dd>{project.period[locale]}</dd>
                </div>
              )}
              <div>
                <dt>{t('stack')}</dt>
                <dd>{project.stack.join(', ')}</dd>
              </div>
              {project.integrations && (
                <div>
                  <dt>{t('integrations')}</dt>
                  <dd>{project.integrations.join(', ')}</dd>
                </div>
              )}
            </dl>
          </Win>
        </div>
      </header>

      {desktop && (
        <div className="wrap pj-screen">
          <Win title={`${t('screen')} · ${project.title}`} className="screen">
            <span className="screen-frame">
              <Image
                src={desktop}
                alt={`${project.title}: ${project.description[locale]}`}
                fill
                sizes="(max-width: 860px) 92vw, 1200px"
                priority
              />
            </span>
          </Win>
          {mobile && (
            <span className="phone">
              <Image src={mobile} alt="" sizes="(max-width: 860px) 30vw, 200px" />
            </span>
          )}
        </div>
      )}

      <div className="wrap pj-body">
        <Sheet torn="both" seed={index + 11} paperClassName="pj-text">
          <h2 className="pj-sec-title wide">{t('about')}</h2>
          {project.about[locale].map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          {post && (
            <Link href={`/blog/${post.slug}`} className="btn95 hot">
              {t('post')}: {post.term}
              <ArrowRight />
            </Link>
          )}
        </Sheet>

        {project.highlights && (
          <section className="pj-high" aria-labelledby="high-title">
            <h2 id="high-title" className="pj-sec-title wide">
              {t('highlights')}
            </h2>
            <ul className="squares big">
              {project.highlights[locale].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        )}
      </div>

      {project.architecture && (
        <section className="pj-arch" aria-labelledby="arch-title">
          <div className="wrap">
            <h2 id="arch-title" className="pj-sec-title wide">
              {t('architecture')}
            </h2>
            <Flow layers={project.architecture} locale={locale} />
          </div>
        </section>
      )}

      {gallery.length > 0 && (
        <section className="wrap pj-gallery" aria-labelledby="gal-title">
          <h2 id="gal-title" className="pj-sec-title wide">
            {t('gallery')}
          </h2>
          <div className="gallery">
            {gallery.map((image, i) => (
              <Win key={image.src} title={`img_${String(i + 1).padStart(2, '0')}.png`} className="screen" buttons="×">
                <span className="screen-frame">
                  <Image src={image} alt="" fill sizes="(max-width: 860px) 92vw, 640px" />
                </span>
              </Win>
            ))}
          </div>
        </section>
      )}

      <Link href={`/projects/${next.slug}`} className="pj-next">
        <span className="wrap">
          <span className="pj-next-lbl">{t('next')} →</span>
          <strong className="wide">{next.title}</strong>
        </span>
      </Link>
    </article>
  )
}
