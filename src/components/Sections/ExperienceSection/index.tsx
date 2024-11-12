import React from 'react'

const ExperienceSection = () => {
  return (
    <div className="space-y-5">
      <p className="text-lg text-zinc-600">
        I have a history of working with a variety of frameworks and
        technologies, both front-end and back-end, and I specialize in creating
        solutions that are reliable and scalable to meet customer needs.
      </p>
      <div className="space-y-5">
        <div>
          <h3 className="text-lg font-semibold">
            Here is my experience background:
          </h3>
          <p className="text-zinc-600">
            My experience ranges from developing online applications to tracking
            performance and depuration, always with an emphasis on quality and
            innovation.
          </p>
        </div>

        <div className="space-y-5">
          <div>
            <h3 className="text-lg font-semibold text-zinc-800 hover:text-black">
              Aupi Soluções em TI
            </h3>
            <span className="italic">
              Fullstack Developer | 2023/8 ~ 2024/12
            </span>

            <div className="mt-3">
              <span className="">The main attributes are:</span>
              <ul className="ml-2 list-inside list-disc text-zinc-600">
                <li>
                  Creation of Mobile Applications and Websites (iOS, Android)
                </li>
                <li>
                  Creation of Websites:
                  <ul className="ml-2 list-inside list-disc text-zinc-600">
                    <li>E-commerces (Shopify/Tray)</li>
                    <li>Online ticket offices (Next JS, Python)</li>
                    <li>Management of a veterinary clinic (Next JS, Python)</li>
                  </ul>
                </li>

                <li>
                  Creation of Mobile Applications:
                  <ul className="ml-2 list-inside list-disc text-zinc-600">
                    <li>
                      Security for cell phones and cell phone businesses (React
                      Native, Python)
                    </li>
                    <li>
                      Geolocation system and background location (React Native,
                      Python)
                    </li>
                  </ul>
                </li>
              </ul>
            </div>

            <div className="mt-3">
              <span className="">The main results are:</span>
              <ul className="ml-2 list-inside list-disc text-zinc-600">
                <li>
                  Creating a package in Nodejs to speed up the start of
                  projects, a standard website development template and
                  applications
                </li>
                <li>
                  Knowledge of the software purchase/sale flow and the
                  development process
                </li>
                <li>
                  Git and Github in practice within a company, as well as good
                  practices for creating PR (Pull requests), creating Branches
                  and commits
                </li>
                <li>
                  Improving knowledge of business rules companies and creation
                  of database models and structure of the application
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExperienceSection
