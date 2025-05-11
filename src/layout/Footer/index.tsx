import Link from 'next/link'

const Footer = () => {
  return (
    <div className="container space-y-5 pb-[50px]">
      <div className="text-md flex flex-col gap-8 font-semibold text-zinc-700 md:flex-row">
        <Link href={'/blog'}>
          <span className="hover:text-black">Blog</span>
        </Link>
        <Link href={'/projects'}>
          <span className="hover:text-black">Projects</span>
        </Link>

        <Link target="_blank" href={'https://github.com/uBrunoow'}>
          <span className="hover:text-black">Github</span>
        </Link>
        <Link
          target="_blank"
          href={'https://www.linkedin.com/in/bruno-werner-76a804288/'}
        >
          <span className="hover:text-black">Linkedin</span>
        </Link>
      </div>

      <div className="h-px w-full bg-linear-to-r from-transparent via-[#D2D8E183] to-transparent dark:via-[#959CB183]"></div>

      <div className="flex w-full flex-col items-start justify-between text-zinc-500 md:flex-row md:items-center">
        <div>
          <span>
            Built with{' '}
            <Link
              target="_blank"
              className="hover:text-black"
              href={'https://nextjs.org/'}
            >
              Next.js
            </Link>
            ,{' '}
            <Link
              target="_blank"
              className="hover:text-black"
              href={'https://tailwindcss.com/'}
            >
              Tailwind
            </Link>{' '}
            and{' '}
            <Link
              target="_blank"
              className="hover:text-black"
              href={'https://vercel.com/'}
            >
              Vercel
            </Link>
          </span>
        </div>
        <div>Coded by me (Bruno Werner :P)</div>
      </div>
    </div>
  )
}

export default Footer
