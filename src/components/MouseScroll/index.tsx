import { ChevronDown, Mouse } from 'lucide-react'
import React from 'react'

const MouseScroll = () => {
  return (
    <div className="container relative mt-[70px] pb-[20px]">
      <div className="flex w-[100px] animate-bounce cursor-pointer flex-col items-center justify-center hover:text-[#95F238]">
        <p>Scroll</p>
        <Mouse size={20} />
        <ChevronDown size={20} />
      </div>
    </div>
  )
}

export default MouseScroll
