'use client'

import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'

export default function ErrorPage({ reset }: { error: Error; reset: () => void }) {
  const t = useTranslations('Error')
  return (
    <div className="state">
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
            <button type="button" className="btn95 hot" onClick={reset}>
              {t('retry')}
            </button>
            <Link href="/" className="btn95">
              {t('home')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
