import Image from 'next/image'
import React from 'react'
import ProfileImage from '@/public/profile-image.jpeg'
import AupiImage from '@/public/aupi_logo.jpeg'
import Link from 'next/link'

const ProfileHeader = () => {
  return (
    <div className="flex flex-col items-start gap-5 md:flex-row md:items-center md:gap-11">
      <div className="inline-block rounded-full bg-gradient-to-r from-[#95F238] via-[#AAF23D] to-[#87BF34] p-1 outline outline-4 outline-[#AAF23D50]">
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
            <div className="rounded-md transition-shadow hover:shadow-md hover:shadow-[#87BF34]">
              <Image
                src={AupiImage}
                alt=""
                className="h-6 w-6 overflow-hidden rounded-md p-1 shadow-md shadow-[#87BF34]"
              />
            </div>
            Aupi Soluções em TI
          </Link>
        </span>
      </div>
    </div>
  )
}

export default ProfileHeader
