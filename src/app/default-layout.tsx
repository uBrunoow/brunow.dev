'use client'
import MouseFollower from '@/components/MouseFollower'
import { Toaster } from '@/components/ui/sonner'
import Footer from '@/layout/Footer'
import Header from '@/layout/Header'
import StickyHeader from '@/layout/Header/StickyHeader/StickyHeader'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

function DefaultLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMobile(window.innerWidth <= 768)
    }
  }, [])

  return (
    <>
      {pathname.includes('/blog') || pathname === '/projects' ? (
        <StickyHeader />
      ) : (
        <Header />
      )}
      {children}
      <Footer />
      <Toaster richColors />
      {/* <Sidebar /> */}
      {!isMobile && <MouseFollower />}
    </>
  )
}

export default DefaultLayout
