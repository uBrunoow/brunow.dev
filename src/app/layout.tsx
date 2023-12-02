import type { Metadata } from 'next'
import { Roboto_Flex as Roboto, Montserrat, Righteous } from 'next/font/google'
import './globals.css'

const roboto = Roboto({ subsets: ['latin'], variable: '--font-roboto' })

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: '500',
  variable: '--font-montserrat',
})
const righteous = Righteous({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-righteous',
})

export const metadata: Metadata = {
  title: 'Bruno Werner | Front-end Developer',
  description: 'My personal website',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} ${montserrat.variable} ${righteous.variable}  font-montserrat `}
      >
        {children}
      </body>
    </html>
  )
}
