import { Star } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const FeaturedProjectsSection = () => {
  return (
    <div className="space-y-5">
      <p className="text-lg text-zinc-600">
        Throughout my professional journey in the programming field, I have
        worked on several projects that highlight my ability to transform ideas
        into reality. Below, I present a brief summary of some of my main
        projects:
      </p>

      <div className="grid grid-cols-2 gap-8">
        <div>
          <Image
            src={
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmpa-OPGCHyX-GPQRrwoR289o79lh94R-ERw&s'
            }
            width={100}
            height={100}
            className="mb-2 w-full overflow-hidden transition-transform duration-300"
            alt=""
          />

          <div className="space-y-3">
            <div className="flex w-full justify-between">
              <h3>Project 1</h3>

              <div className="flex flex-row gap-2">
                <div className="flex items-center gap-1">
                  <p>2512</p>
                  <Star size={20} />
                </div>
                <div>Github</div>
                <div>Go to</div>
              </div>
            </div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.
              Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum.
            </p>

            <div className="flex w-full gap-2">
              <p className="rounded-sm bg-zinc-200 px-2 py-1 text-sm">Tag 1</p>
              <p className="rounded-sm bg-zinc-200 px-2 py-1 text-sm">Tag 2</p>
              <p className="rounded-sm bg-zinc-200 px-2 py-1 text-sm">Tag 3</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeaturedProjectsSection
