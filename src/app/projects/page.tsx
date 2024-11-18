import React from 'react'
import Projects from './Projects/Projects'
import { DataProjects } from './Data/Projects'

const ProjectPage = () => {
  return (
    <section className="container py-[150px]">
      <div className="space-y-5">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <Projects projects={DataProjects} />
        </div>
      </div>
    </section>
  )
}

export default ProjectPage
