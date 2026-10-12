import { about, education, skills } from '@/content/profile'
import type { Locale } from '@/content/types'
import { Link } from '@/i18n/navigation'
import { getLocale, getTranslations } from 'next-intl/server'
import { ArrowUpRight } from './Icons'
import { Sheet } from './Sheet'
import { Win } from './Win'

/** "Who am I?" as a notepad file, the stack as installed programs, and education as a printed transcript. */
export async function About() {
  const t = await getTranslations('About')
  const te = await getTranslations('Education')
  const locale = (await getLocale()) as Locale

  return (
    <section className="about" id="sobre" aria-labelledby="about-title">
      <div className="wrap">
        <header className="sec-head">
          <p className="eyebrow">{t('eyebrow')}</p>
          <h2 id="about-title" className="sec-title wide">
            {t('title')}
          </h2>
        </header>

        <div className="about-grid">
          <Win title={t('file')} className="notepad" as="article">
            <p className="notepad-menu" aria-hidden="true">
              {t('menu')}
            </p>
            <div className="notepad-body">
              {about[locale].map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <span className="cursor" aria-hidden="true" />
            </div>
            <div className="win-status">
              <span>{t('status')}</span>
              <span>100%</span>
            </div>
          </Win>

          <Win title={t('installed')} className="programs" dark buttons="×" as="aside">
            <p className="programs-note">{t('installedNote')}</p>
            <ul>
              {skills.map((skill) => (
                <li key={skill}>
                  <span className="prog-ico" aria-hidden="true">
                    {skill.slice(0, 2)}
                  </span>
                  {skill}
                </li>
              ))}
            </ul>
          </Win>
        </div>

        <div className="edu" id="formacao">
          <header className="sec-head">
            <p className="eyebrow">{te('eyebrow')}</p>
            <h2 className="sec-title wide">{te('title')}</h2>
          </header>

          <Sheet torn="both" seed={31} className="transcript" paperClassName="transcript-in">
            <div className="tr-head">
              <p className="tr-doc wide">{te('doc')}</p>
              <dl>
                <div>
                  <dt>{te('student')}</dt>
                  <dd>Bruno Werner</dd>
                </div>
                <div>
                  <dt>{te('issued')}</dt>
                  <dd>2026</dd>
                </div>
              </dl>
            </div>

            <ol className="tr-list">
              {education.map((school) => (
                <li key={school.school} className="tr-row">
                  <div className="tr-school">
                    <p className="tr-name wide">{school.school}</p>
                    <p className="tr-full">{school.name[locale]}</p>
                    {school.place && <p className="tr-place">{school.place[locale]}</p>}
                    <span className={`tr-stamp${school.current ? ' live' : ''}`} aria-hidden="true">
                      {school.current ? te('inProgress') : te('done')}
                    </span>
                  </div>
                  <div className="tr-main">
                    <dl className="tr-fields">
                      <div>
                        <dt>{te('course')}</dt>
                        <dd>{school.course[locale]}</dd>
                      </div>
                      <div>
                        <dt>{te('period')}</dt>
                        <dd>{school.period[locale]}</dd>
                      </div>
                      <div>
                        <dt>{te('status')}</dt>
                        <dd>{school.current ? te('inProgress') : te('done')}</dd>
                      </div>
                    </dl>
                    <p className="tr-about">{school.about[locale]}</p>
                    <div className="tr-cols">
                      <div>
                        <p className="tr-lbl">{te('focus')}</p>
                        <ul className="squares">
                          {school.focus[locale].map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="tr-lbl">{te('work')}</p>
                        <ul className="tr-work">
                          {school.work.map((item) => (
                            <li key={item.url}>
                              {item.internal ? (
                                <Link href={item.url}>{item.label[locale]}</Link>
                              ) : (
                                <a href={item.url} target="_blank" rel="noopener noreferrer">
                                  {item.label[locale]}
                                  <ArrowUpRight />
                                </a>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </Sheet>
        </div>
      </div>
    </section>
  )
}
