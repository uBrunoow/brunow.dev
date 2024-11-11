import React from 'react'
import ProfileHeader from './ProfileHeader/ProfileHeader'
import Link from 'next/link'
import {
  FlaskConical,
  FolderOpenDot,
  Linkedin,
  MessageSquareText,
} from 'lucide-react'
import MouseScroll from '@/components/MouseScroll'
import { Pattern } from '@/public/pattern'

const Header = () => {
  return (
    <div className="relative overflow-hidden p-1">
      <div className="absolute right-0 top-0 z-[-1] mt-20 flex w-full rotate-[10deg] flex-col text-left text-[120px] font-bold leading-[100px] text-zinc-700/20 opacity-20">
        <span>PASSIONATE</span>
        <span>DEVELOPER</span>
        <span>FULL-STACK</span>
        <span>PROGRAMMER</span>
        <span>FREELANCER</span>
      </div>

      <div className="absolute -right-[1000px] top-0 z-[-1] opacity-20">
        <Pattern />
      </div>

      <div className="container space-y-8 pt-[100px]">
        <ProfileHeader />

        <div className="">
          <p className="text-xl font-normal text-zinc-600">
            I&apos;m a fullstack developer from Brazil. I have{' '}
            <strong>+2 years</strong> of experience. I&apos;m a person with a
            passion for building beautiful and functional websites.
          </p>
        </div>

        <div className="flex items-center justify-start gap-8">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-[#D2D8E183] to-transparent dark:via-[#959CB183]"></div>

          <Link
            href={''}
            className="group flex items-center gap-2 text-lg font-semibold text-zinc-700 hover:text-black"
          >
            <div className="flex items-center justify-center rounded-md bg-gradient-to-r from-[#95F238] via-[#AAF23D] to-[#87BF34] p-1">
              <MessageSquareText size={18} />
            </div>
            Blog
          </Link>

          <Link
            href={''}
            className="group flex items-center gap-2 text-lg font-semibold text-zinc-700 hover:text-black"
          >
            <div className="flex items-center justify-center rounded-md bg-gradient-to-r from-[#95F238] via-[#AAF23D] to-[#87BF34] p-1">
              <FolderOpenDot size={18} />
            </div>
            Projects
          </Link>

          <Link
            href={''}
            className="group flex items-center gap-2 text-lg font-semibold text-zinc-700 hover:text-black"
          >
            <div className="flex items-center justify-center rounded-md bg-gradient-to-r from-[#95F238] via-[#AAF23D] to-[#87BF34] p-1">
              <Linkedin size={18} />
            </div>
            Linkedin
          </Link>

          <Link
            href={''}
            className="group flex items-center gap-2 text-lg font-semibold text-zinc-700 hover:text-black"
          >
            <div className="flex items-center justify-center rounded-md bg-gradient-to-r from-[#95F238] via-[#AAF23D] to-[#87BF34] p-1">
              <FlaskConical size={18} />
            </div>
            Experience
          </Link>
        </div>
      </div>

      <MouseScroll />
    </div>
  )
}

export default Header
