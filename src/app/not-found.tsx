'use client'

import NextError from 'next/error'

// Requests that never reach a locale segment
export default function GlobalNotFound() {
  return (
    <html lang="pt-BR">
      <body>
        <NextError statusCode={404} />
      </body>
    </html>
  )
}
