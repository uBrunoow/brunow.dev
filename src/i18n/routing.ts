import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['pt', 'en'],
  defaultLocale: 'pt',
  // Portuguese keeps the current URLs; English lives under /en
  localePrefix: 'as-needed',
})
