import MouseFollower from '@/components/MouseFollower'
import { Toaster } from '@/components/ui/sonner'
import Footer from '@/layout/Footer'
import Header from '@/layout/Header'

function DefaultLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
      <Toaster richColors />
      <MouseFollower />
    </>
  )
}

export default DefaultLayout
