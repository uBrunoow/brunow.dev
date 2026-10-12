import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['pt', 'en'],
  defaultLocale: 'pt',
  // Portuguese keeps the current URLs; English lives under /en
  localePrefix: 'as-needed',
  // Each page declares its own hreflang in <head>; the middleware's Link header would contradict the
  // single-language articles, whose copy under the other locale points its canonical to the original
  alternateLinks: false,
})
