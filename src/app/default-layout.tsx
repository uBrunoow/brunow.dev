'use client'
import MouseFollower from '@/components/MouseFollower'
import { Toaster } from '@/components/ui/sonner'
import Footer from '@/layout/Footer'
import Header from '@/layout/Header'
import StickyHeader from '@/layout/Header/StickyHeader/StickyHeader'
import Sidebar from '@/layout/Sidebar'
import { usePathname } from 'next/navigation'

function DefaultLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <>
      {pathname === '/blog' || pathname === '/projects' ? (
        <StickyHeader />
      ) : (
        <Header />
      )}
      {children}
      <Footer />
      <Toaster richColors />
      {/* <Sidebar /> */}
      <MouseFollower />
    </>
  )
}

export default DefaultLayout
