import { getTranslations } from 'next-intl/server'

export async function Footer() {
  const t = await getTranslations('Footer')
  return (
    <footer className="site-footer">
      <div className="wrap">
        <span>{t('rights', { year: new Date().getFullYear() })}</span>
        <a href="#main">{t('top')} ↑</a>
        <span>{t('made')}</span>
      </div>
    </footer>
  )
}
