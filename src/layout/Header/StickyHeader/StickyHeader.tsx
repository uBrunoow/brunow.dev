import React from 'react'
import Image from 'next/image'
import ProfileImage from '@/public/profile-image.jpeg'
import Link from 'next/link'
import { FolderOpenDot, Linkedin, Mail, MessageSquareText } from 'lucide-react'

const StickyHeader = () => {
  return (
    <div className="md:w-lg fixed top-0 z-1000 flex h-auto w-screen transform flex-row items-center justify-between bg-zinc-100/20 p-3 shadow-xs backdrop-blur-xs transition md:container md:left-1/2 md:top-[20px] md:-translate-x-1/2 md:rounded-2xl">
      <Link
        href={'/'}
        className="flex flex-col items-start gap-5 transition-all hover:scale-105 md:flex-row md:items-center md:gap-11"
      >
        <div className="inline-block rounded-full bg-linear-to-r from-[#95F238] via-[#AAF23D] to-[#87BF34] p-1 outline outline-4 outline-[#AAF23D50]">
          <div className="overflow-hidden rounded-full bg-white">
            <Image
              src={ProfileImage}
              alt=""
              className="size-8 rounded-full object-cover"
            />
          </div>
        </div>
      </Link>

      <div className="flex flex-row items-center justify-start gap-8">
        <Link
          href={'/blog'}
          className="group flex flex-col items-center text-sm font-semibold text-zinc-700 hover:text-black md:flex-row md:gap-2 md:text-lg"
        >
          <div className="flex items-center justify-center rounded-md bg-linear-to-r from-[#95F238] via-[#AAF23D] to-[#87BF34] p-1">
            <MessageSquareText size={18} />
          </div>
          Blog
        </Link>

        <Link
          href={'/projects'}
          className="group flex flex-col items-center text-sm font-semibold text-zinc-700 hover:text-black md:flex-row md:gap-2 md:text-lg"
        >
          <div className="flex items-center justify-center rounded-md bg-linear-to-r from-[#95F238] via-[#AAF23D] to-[#87BF34] p-1">
            <FolderOpenDot size={18} />
          </div>
          Projects
        </Link>

        <Link
          href={'https://www.linkedin.com/in/bruno-werner-76a804288/'}
          target="_blank"
          className="group flex flex-col items-center text-sm font-semibold text-zinc-700 hover:text-black md:flex-row md:gap-2 md:text-lg"
        >
          <div className="flex items-center justify-center rounded-md bg-linear-to-r from-[#95F238] via-[#AAF23D] to-[#87BF34] p-1">
            <Linkedin size={18} />
          </div>
          Linkedin
        </Link>

        <Link
          href="mailto:brunowerner7@gmail.com"
          className="group flex flex-col items-center text-sm font-semibold text-zinc-700 hover:text-black md:flex-row md:gap-2 md:text-lg"
        >
          <div className="flex items-center justify-center rounded-md bg-linear-to-r from-[#95F238] via-[#AAF23D] to-[#87BF34] p-1">
            <Mail size={18} />
          </div>
          Contact
        </Link>
      </div>
    </div>
  )
}

export default StickyHeader
