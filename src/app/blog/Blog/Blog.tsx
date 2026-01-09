'use client'
import { Button } from '@/components/ui/button'
import { ArrowRightIcon } from '@/public/icons/ArrowRightIcon'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { IBlog } from '../Data/Blogs'

const Blog = ({ blog }: { blog: IBlog[] }) => {
  const router = useRouter()
  return (
    <>
      {blog.map((blog, index) => (
        <Link
          key={index}
          href={blog.link}
          className="space-y-5 rounded-xl border bg-zinc-100/50 p-5 shadow-xs transition-all hover:opacity-70"
        >
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold">{blog.title}</h1>
            <p className="text-zinc-500">{blog.date}</p>
          </div>

          <div>
            <span className="text-base text-zinc-800">{blog.description}</span>
          </div>

          <div className="flex items-center justify-between">
            <Button
              onClick={() => {
                router.push(blog.link)
              }}
              className="group flex gap-2 rounded-full border border-zinc-300 bg-linear-to-r from-primary via-secondary to-tertiary pr-1 text-zinc-700 hover:opacity-90"
            >
              View full article
              <div className="rounded-full border bg-white transition-all group-hover:-rotate-12">
                <ArrowRightIcon />
              </div>
            </Button>
            <div className="h-px w-full bg-linear-to-r from-transparent via-[#D2D8E183] to-transparent dark:via-[#959CB183]"></div>
          </div>
        </Link>
      ))}
    </>
  )
}

export default Blog
