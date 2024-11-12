import { Button } from '@/components/ui/button'
import { ArrowRightIcon } from '@/public/icons/ArrowRightIcon'
import Link from 'next/link'
import React from 'react'

const ContactSection = () => {
  return (
    <div className="space-y-5">
      <p className="text-lg text-zinc-600">
        I am motivated as a developer by my passion for code and my appetite for
        novel challenges. Please get in touch with me if you want to create
        something incredible or if you have prospects for partnership!
      </p>

      <div className="flex items-center justify-between">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#D2D8E183] to-transparent dark:via-[#959CB183]"></div>

        <Link href="mailto:brunowerner7@gmail.com">
          <Button className="group flex gap-2 rounded-full border border-zinc-300 bg-gradient-to-r from-[#95F238] via-[#AAF23D] to-[#87BF34] pr-1 text-zinc-700 hover:opacity-90">
            Contact me
            <div className="rounded-full border bg-white transition-all group-hover:-rotate-12">
              <ArrowRightIcon />
            </div>
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default ContactSection
