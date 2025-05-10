import { Cairo as FontSans } from 'next/font/google'
import '../styles/globals.css'
import Analytics from '@/components/Analytics'
import { googleAnalyticsConfig } from '@/config/google-analytics'
import { tagManagerConfig } from '@/config/tag-manager'
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google'
import DefaultLayout from './default-layout'
import { Providers } from './providers'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body
        className={`bg-linear-to-r from-transparent via-[#BFBFBF10] antialiased ${fontSans.className}`}
      >
        <GoogleTagManager gtmId={tagManagerConfig.tagManager.gtmId as string} />
        <GoogleAnalytics
          gaId={googleAnalyticsConfig.googleAnalytics.gaId as string}
        />
        <Analytics />
        <Providers>
          <DefaultLayout>{children}</DefaultLayout>
        </Providers>
      </body>
    </html>
  )
}
