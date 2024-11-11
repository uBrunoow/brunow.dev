import BlogSection from '@/components/Sections/BlogSection'
import ContactSection from '@/components/Sections/ContactSection'
import ExperienceSection from '@/components/Sections/ExperienceSection'
import FeaturedProjectsSection from '@/components/Sections/FeaturedProjectsSection'
import WhoAmISection from '@/components/Sections/WhoAmISection'

export default function Home() {
  return (
    <section className="container py-[100px]">
      <div className="flex flex-col flex-wrap justify-start gap-8 space-y-8">
        <div>
          <h1 className="text-3xl font-semibold">Who am I?</h1>
          <WhoAmISection />
        </div>
        <div>
          <h1 className="text-3xl font-semibold">Featured Projects</h1>
          <FeaturedProjectsSection />
        </div>
        <div>
          <h1 className="text-3xl font-semibold">Blog</h1>
          <BlogSection />
        </div>
        <div>
          <h1 className="text-3xl font-semibold">Experience</h1>
          <ExperienceSection />
        </div>
        <div>
          <h1 className="text-3xl font-semibold">Contact</h1>
          <ContactSection />
        </div>
      </div>
    </section>
  )
}
