import { Button } from '@/components/ui/button'
import { ArrowRightIcon } from '@/public/icons/ArrowRightIcon'
import React from 'react'
import Blog from './Blog/Blog'
import { BlogData } from './Data/Blogs'

const BlogSection = () => {
  return (
    <div className="mt-5 grid grid-cols-1 gap-5">
      <Blog blog={BlogData} />

      <div className="flex items-center justify-between">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#D2D8E183] to-transparent dark:via-[#959CB183]"></div>

        <Button className="group flex gap-2 rounded-full border border-zinc-300 bg-gradient-to-r from-[#95F238] via-[#AAF23D] to-[#87BF34] pr-1 text-zinc-700 hover:opacity-90">
          View all articles
          <div className="rounded-full border bg-white transition-all group-hover:-rotate-12">
            <ArrowRightIcon />
          </div>
        </Button>
      </div>
    </div>
  )
}

export default BlogSection
