'use client'
import { ArrowRightIcon } from '@/public/icons/ArrowRightIcon'
import { GithubIcon } from '@/public/icons/GithubIcon'
import { WebIcon } from '@/public/icons/WebIcon'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { IProject } from '../Data/Projects'

const Projects = ({ projects }: { projects: IProject[] }) => {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null
  }

  return (
    <>
      {projects.map((project, index) => (
        <Link
          key={index}
          href={project.link}
          target="_blank"
          className="group flex h-full flex-col justify-between overflow-hidden rounded-sm shadow-xs transition-all hover:shadow-md"
        >
          <div className="h-full overflow-hidden">
            <Image
              src={project.image}
              width={500}
              height={300}
              quality={100}
              className="mb-2 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              alt=""
            />
          </div>
          <div className="flex h-full flex-col justify-between space-y-3 px-5 pb-5 pt-1">
            <div className="flex w-full justify-between">
              <h3 className="z-1 truncate text-xl font-semibold hover:text-primary">
                {project.title}
              </h3>

              <div className="flex flex-row gap-2">
                {project.has_github && (
                  <Link
                    target="_blank"
                    href={project.github_link ?? '#'}
                    className="rounded-full border bg-[#f7f7f7] transition-all hover:rotate-12"
                  >
                    <GithubIcon />
                  </Link>
                )}
                {project.has_website && (
                  <Link
                    target="_blank"
                    href={project.link ?? '#'}
                    className="rounded-full border bg-[#f7f7f7] transition-all hover:rotate-12"
                  >
                    <WebIcon />
                  </Link>
                )}
                <div className="rounded-full border bg-[#f7f7f7] transition-all hover:-rotate-12">
                  <ArrowRightIcon />
                </div>
              </div>
            </div>
            <p className="flex h-full items-start overflow-hidden">
              {project.description}
            </p>
            <div className="flex w-full items-end gap-2">
              {project.tags.map((tag, tagIndex) => (
                <p
                  key={tagIndex}
                  className="z-1 rounded-sm bg-zinc-200 px-2 py-1 text-sm transition-all hover:bg-primary hover:text-zinc-500"
                >
                  {tag}
                </p>
              ))}
            </div>
          </div>
        </Link>
      ))}
    </>
  )
}

export default Projects
