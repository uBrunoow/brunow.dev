import { LogosDjangoIcon } from '@/public/languages/Django'
import { DeviconNextjs } from '@/public/languages/Next'
import { DeviconNodejs } from '@/public/languages/Node'
import { DeviconPython } from '@/public/languages/Python'
import { DeviconReact } from '@/public/languages/React'
import { DeviconTailwindcss } from '@/public/languages/Tailwindcss'
import { DeviconTypescript } from '@/public/languages/Typescript'
import React, { useEffect, useState } from 'react'

const Sidebar = () => {
  const [isScrolled, setIsScrolled] = useState(false)

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsScrolled(true)
    } else {
      setIsScrolled(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className="fixed right-5 top-0 flex h-screen flex-col items-center justify-center gap-5">
      <div
        className={`transition-all duration-300 ${isScrolled ? 'grayscale-0' : 'grayscale'}`}
      >
        <DeviconReact />
      </div>
      <div
        className={`transition-all duration-300 ${isScrolled ? 'grayscale-0' : 'grayscale'}`}
      >
        <DeviconTypescript />
      </div>
      <div
        className={`transition-all duration-300 ${isScrolled ? 'grayscale-0' : 'grayscale'}`}
      >
        <DeviconNodejs />
      </div>
      <div
        className={`transition-all duration-300 ${isScrolled ? 'grayscale-0' : 'grayscale'}`}
      >
        <DeviconNextjs />
      </div>
      <div
        className={`transition-all duration-300 ${isScrolled ? 'grayscale-0' : 'grayscale'}`}
      >
        <DeviconTailwindcss />
      </div>
      <div
        className={`transition-all duration-300 ${isScrolled ? 'grayscale-0' : 'grayscale'}`}
      >
        <DeviconPython />
      </div>
      <div
        className={`transition-all duration-300 ${isScrolled ? 'grayscale-0' : 'grayscale'}`}
      >
        <LogosDjangoIcon />
      </div>
    </div>
  )
}

export default Sidebar
