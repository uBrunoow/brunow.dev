import React from 'react'
import Projects from './Projects/Projects'
import { Button } from '@/components/ui/button'
import { ArrowRightIcon } from '@/public/icons/ArrowRightIcon'
import { DataProjects } from './Data/Projects'

const FeaturedProjectsSection = () => {
  return (
    <div className="space-y-5">
      <p className="text-lg text-zinc-600">
        Throughout my professional journey in the programming field, I have
        worked on several projects that highlight my ability to transform ideas
        into reality. Below, I present a brief summary of some of my main
        projects:
      </p>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <Projects projects={DataProjects} />
      </div>

      <div className="flex items-center justify-between">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#D2D8E183] to-transparent dark:via-[#959CB183]"></div>

        <Button className="group flex gap-2 rounded-full border border-zinc-300 bg-gradient-to-r from-[#95F238] via-[#AAF23D] to-[#87BF34] pr-1 text-zinc-700 hover:opacity-90">
          View all projects
          <div className="rounded-full border bg-white transition-all group-hover:-rotate-12">
            <ArrowRightIcon />
          </div>
        </Button>
      </div>
    </div>
  )
}

export default FeaturedProjectsSection
