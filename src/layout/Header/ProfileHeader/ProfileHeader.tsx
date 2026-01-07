import AupiImage from '@/public/aupi_logo.jpeg'
import FlyupBPOImage from '@/public/flyup-bpo-logo.png'
import ProfileImage from '@/public/profile-image.jpeg'
import Image from 'next/image'
import Link from 'next/link'

const ProfileHeader = () => {
  return (
    <div className="flex w-full flex-col items-start gap-5 md:flex-row md:items-center md:gap-11">
      <div className="inline-block rounded-full bg-linear-to-r from-primary via-secondary to-tertiary p-1 outline-4 outline-primary/20">
        <div className="overflow-hidden rounded-full bg-white">
          <Image
            src={ProfileImage}
            alt=""
            className="size-16 rounded-full object-cover"
          />
        </div>
      </div>

      <div>
        <h1 className="text-3xl font-semibold">Bruno Werner</h1>
        <span className="flex flex-col items-center gap-2 text-lg font-medium text-zinc-600 md:flex-row">
          Developer experience at{' '}
          <Link
            href="https://aupi.com.br"
            target="_blank"
            className="flex flex-row items-center gap-2 hover:text-black"
          >
            <div className="rounded-md transition-shadow hover:shadow-md hover:shadow-tertiary">
              <Image
                src={AupiImage}
                alt=""
                className="h-6 w-6 overflow-hidden rounded-md p-1 shadow-md shadow-tertiary"
              />
            </div>
            Aupi Soluções em TI
          </Link>
          <Link
            href="https://app.flyupbpo.com.br"
            target="_blank"
            className="flex flex-row items-center gap-2 hover:text-black"
          >
            <div className="rounded-md transition-shadow hover:shadow-md hover:shadow-tertiary">
              <Image
                src={FlyupBPOImage}
                alt=""
                className="h-6 w-6 overflow-hidden rounded-md p-1 shadow-md shadow-tertiary"
              />
            </div>
            Flyup BPO
          </Link>
        </span>
      </div>
    </div>
  )
}

export default ProfileHeader
