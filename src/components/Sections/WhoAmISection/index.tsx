import React from 'react'

const WhoAmISection = () => {
  return (
    <div className="space-y-5">
      <p className="text-lg text-zinc-600">
        With over 2 years of experience in web application development, I’ve
        honed my skills in frontend and backend development. Outside of tech, I
        enjoy music, fitness, and team sports like volleyball and basketball.
      </p>
      <div className="space-y-5">
        <div>
          <h3 className="text-lg font-semibold">
            Here is my educational background:
          </h3>
          <p className="text-zinc-600">
            In addition to my hands-on experience in web development, my
            education has also played a critical role in providing a strong
            foundation for my career.
          </p>
        </div>

        <div className="space-y-5">
          <div>
            <h3 className="text-lg font-semibold text-zinc-800 hover:text-black">
              UDESC - Santa Catarina State University
            </h3>
            <span className="italic">
              Technology in Systems Analysis and Development | 2024/1 ~ 2027/2
            </span>

            <div className="mt-3">
              <ul className="ml-2 list-inside list-disc text-zinc-600">
                <li>Software Engineering and Agile Methodologies</li>
                <li>Systems Architecture and Service Integration</li>
                <li>Data Analysis and Artificial Intelligence</li>
              </ul>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-zinc-800 hover:text-black">
              SESI/SENAI
            </h3>
            <span className="italic">
              Systems Development Technician | 2021/1 - 2023/2
            </span>

            <div className="mt-3">
              <ul className="ml-2 list-inside list-disc text-zinc-600">
                <li>Programming Logic and Data Structures</li>
                <li>Development of Web and Mobile Applications</li>
                <li>Database and SQL</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WhoAmISection
