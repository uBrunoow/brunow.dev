'use client'

import { Link, usePathname } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import { useLocale } from 'next-intl'

export function LocaleSwitch({ label }: { label: string }) {
  const locale = useLocale()
  const pathname = usePathname()

  return (
    <div className="seg" role="group" aria-label={label}>
      {routing.locales.map((item) => (
        <Link
          key={item}
          href={pathname}
          locale={item}
          aria-current={item === locale ? 'true' : undefined}
          hrefLang={item}
          scroll={false}
        >
          {item.toUpperCase()}
        </Link>
      ))}
    </div>
  )
}
