import { hasCv } from '@/content/cv'
import { CV_PATH } from '@/content/cv-path'
import { getProject } from '@/content/projects'
import type { Locale } from '@/content/types'
import { Link } from '@/i18n/navigation'
import Portrait from '@/public/portrait-sticker.webp'
import { getLocale, getTranslations } from 'next-intl/server'
import Image from 'next/image'
import { Floppy } from './Floppy'
import { HeroDesk, type LogLine } from './HeroDesk'
import { ArrowDown, Download, Spark } from './Icons'
import { Marquee } from './Marquee'
import { Sheet } from './Sheet'

const level = (line: string): LogLine['level'] =>
  /429|retry/i.test(line) ? 'retry' : /repetido|duplicate|repeated|ignor/i.test(line) ? 'skip' : 'ok'

/** The cover: sticker portrait over giant marquee type, with draggable system windows doing real work. */
export async function Hero() {
  const t = await getTranslations('Hero')
  const locale = (await getLocale()) as Locale
  const cv = hasCv()

  const lines: LogLine[] = ['alva-hub', 'compre-alva', 'alva-tools'].flatMap(
    (slug) => getProject(slug)?.log?.[locale].map((text) => ({ level: level(text), text })) ?? [],
  )

  return (
    <section className="hero" aria-labelledby="hero-title">
      <h1 id="hero-title" className="sr-only">
        {t('h1')}
      </h1>

      <div className="stage">
        <Marquee text={t('name')} className="m1" repeat={2} />
        <Marquee text={t('topics')} className="m2" reverse />

        <Spark className="spark s1" />
        <Spark className="spark s2" />

        <Image
          src={Portrait}
          alt={t('photoAlt')}
          priority
          className="sticker"
          data-par="10"
          sizes="(max-width: 820px) 92vw, 600px"
        />

        <div className="hazard" data-par="-18" aria-hidden="true">
          <span className="tri">!</span>
          <b>{t('hazard')}</b>
        </div>

        <HeroDesk
          lines={lines}
          labels={{
            logLabel: t('logLabel'),
            logOk: t('logOk'),
            dead: t('dead'),
            syncLabel: t('syncLabel'),
            syncing: t('syncing'),
            queue: t.raw('queue') as string,
            done: t('done'),
            next: t('next'),
            paused: t('paused'),
            pause: t('pause'),
            resume: t('resume'),
            cancel: t('cancel'),
            minimize: t('minimize'),
            close: t('close'),
            nope: [t('nope1'), t('nope2'), t('nope3')],
            hint: t('hint'),
          }}
        />

        <div className="hero-disk" data-par="-26" aria-hidden="true">
          <Floppy title="Bruno.exe" top={t('disk').toUpperCase()} bottom="2026 · 1.44 MB" beige />
        </div>
      </div>

      <Sheet torn="top" seed={7} className="hero-foot" paperClassName="hero-foot-in">
        <div className="wrap hero-pitch">
          <div>
            <p className="eyebrow">{t('eyebrow')}</p>
            <p className="pitch wide">{t.rich('pitch', { mark: (chunks) => <mark>{chunks}</mark> })}</p>
          </div>
          <div>
            <p className="lede">{t('lede')}</p>
            <div className="ctas">
              <Link href="/#projetos" className="btn95 hot">
                {t('projects')}
                <ArrowDown />
              </Link>
              <Link href="/#contato" className="btn95">
                {t('contact')}
              </Link>
              {cv && (
                <a href={CV_PATH} download className="btn95">
                  <Download />
                  {t('cv')}
                </a>
              )}
            </div>
          </div>
        </div>
      </Sheet>
    </section>
  )
}
