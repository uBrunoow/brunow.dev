import { jobs } from '@/content/profile'
import type { Locale } from '@/content/types'
import { getLocale, getTranslations } from 'next-intl/server'
import Image from 'next/image'
import { Win } from './Win'

const fileName = (company: string) =>
  `${company
    .normalize('NFD')
    .replace(/[^\w\s]/g, '')
    .trim()
    .replace(/\s+/g, '_')
    .toUpperCase()}.EXE`

/** Work history as cascading windows, newest on top; the current job is still running. */
export async function Experience() {
  const t = await getTranslations('Experience')
  const locale = (await getLocale()) as Locale

  return (
    <section className="exp" id="experiencia" aria-labelledby="exp-title">
      <div className="wrap">
        <header className="sec-head">
          <p className="eyebrow">{t('eyebrow')}</p>
          <h2 id="exp-title" className="sec-title wide">
            {t('title')}
          </h2>
          <p className="sec-lead">{t('lead')}</p>
        </header>

        <ol className="cascade">
          {jobs.map((job) => (
            <Win
              key={job.company}
              as="li"
              title={fileName(job.company)}
              className={`job${job.current ? ' current' : ''}`}
              status={
                <>
                  <span>{job.current ? `● ${t('running')}` : t('ended')}</span>
                  <a href={job.url} target="_blank" rel="noopener noreferrer">
                    {new URL(job.url).host.replace(/^www\./, '')}
                  </a>
                </>
              }
            >
              <div className="job-body">
                <div className="job-head">
                  <span className="job-logo">
                    <Image src={job.logo} alt="" fill sizes="56px" />
                  </span>
                  <div>
                    <h3 className="job-co wide">{job.company}</h3>
                    <p className="job-role">{job.role[locale]}</p>
                  </div>
                  <p className="job-period">{job.period[locale]}</p>
                </div>
                <ul className="squares">
                  {job.highlights[locale].map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </Win>
          ))}
        </ol>
      </div>
    </section>
  )
}
