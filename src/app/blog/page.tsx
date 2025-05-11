import Blog from './Blog/Blog'
import { BlogData } from './Data/Blogs'

const BlogPage = () => {
  return (
    <section className="container py-[150px]">
      <div className="mt-5 grid grid-cols-1 gap-5">
        <Blog blog={BlogData} />
      </div>
    </section>
  )
}

export default BlogPage
