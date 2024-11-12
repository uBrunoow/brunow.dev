import { ChevronDown, Mouse } from 'lucide-react'
import React from 'react'

const MouseScroll = () => {
  const handleClickScroll = () => {
    const isMobile = window.innerWidth <= 768
    const scrollAmount = isMobile ? 800 : 500

    window.scrollTo({
      top: scrollAmount,
      behavior: 'smooth',
    })
  }

  return (
    <div
      onClick={handleClickScroll}
      className="container relative mt-[70px] pb-[20px]"
    >
      <div className="flex w-[50px] animate-bounce cursor-pointer flex-col items-center justify-center hover:text-[#95F238]">
        <p>Scroll</p>
        <Mouse size={20} />
        <ChevronDown size={20} />
      </div>
    </div>
  )
}

export default MouseScroll
