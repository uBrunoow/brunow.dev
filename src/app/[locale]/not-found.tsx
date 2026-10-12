import { ArrowRight } from '@/components/site/Icons'
import { Marquee } from '@/components/site/Marquee'
import { Link } from '@/i18n/navigation'
import { getTranslations } from 'next-intl/server'

export default async function NotFound() {
  const t = await getTranslations('NotFound')
  return (
    <div className="state">
      <Marquee text="404" className="state-echo" repeat={6} />
      <div className="win dialog state-win">
        <div className="win-bar">
          <span className="win-title">{t('file')}</span>
          <span className="win-btns" aria-hidden="true">
            <i>×</i>
          </span>
        </div>
        <div className="state-body">
          <span className="state-ico" aria-hidden="true">
            !
          </span>
          <div>
            <h1 className="wide">{t('title')}</h1>
            <p>{t('lead')}</p>
          </div>
          <div className="dialog-actions">
            <Link href="/" className="btn95 hot">
              {t('home')}
              <ArrowRight />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
