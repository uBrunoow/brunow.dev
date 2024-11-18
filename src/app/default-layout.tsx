'use client'
import MouseFollower from '@/components/MouseFollower'
import { Toaster } from '@/components/ui/sonner'
import Footer from '@/layout/Footer'
import Header from '@/layout/Header'
import StickyHeader from '@/layout/Header/StickyHeader/StickyHeader'
import { usePathname } from 'next/navigation'

function DefaultLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isMobile = window.innerWidth <= 768

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
