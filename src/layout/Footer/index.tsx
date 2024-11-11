import React from 'react'

const Footer = () => {
  return (
    <div className="container space-y-5 pb-[50px]">
      <div className="text-md flex flex-row gap-8 font-semibold text-zinc-700">
        <span className="hover:text-black">Blog</span>
        <span className="hover:text-black">Projects</span>
        <span className="hover:text-black">Experience</span>
        <span className="hover:text-black">Github</span>
        <span className="hover:text-black">Linkedin</span>
      </div>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#D2D8E183] to-transparent dark:via-[#959CB183]"></div>

      <div className="flex w-full items-center justify-between text-zinc-500">
        <div>
          <span>Built with Next.js, Tailwind and Vercel</span>
        </div>
        <div>Coded by me (Bruno Werner :P)</div>
      </div>
    </div>
  )
}

export default Footer
