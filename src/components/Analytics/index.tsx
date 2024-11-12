import { googleAnalyticsConfig } from '@/config/google-analytics'
import Script from 'next/script'
import React from 'react'

function Analytics() {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsConfig.googleAnalytics.gaId}`}
      />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${googleAnalyticsConfig.googleAnalytics.gaId}');
        `}
      </Script>
    </>
  )
}

export default Analytics
