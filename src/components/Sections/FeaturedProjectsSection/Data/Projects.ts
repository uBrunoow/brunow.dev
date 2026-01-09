import CasaAmarelaImage from '@/public/casa-amarela.png'
import EzstartImage from '@/public/ezstart.png'
import FirefightersImage from '@/public/firefighters.png'
import FlyUpBPOImage from '@/public/flyup-bpo.jpeg'

import type { StaticImageData } from 'next/image'
export interface IProject {
  title: string
  description: string
  image: StaticImageData
  link: string
  github_link?: string
  tags: string[]
  has_github?: boolean
  has_website?: boolean
}

export const DataProjects: IProject[] = [
  {
    title: 'Firefighters App',
    description:
      'A full-stack website and app for NOAR firefighters (Nucleus of Air Operations and Rescue.) in order to automate its activities when carrying out a rescue.',
    link: 'https://github.com/uBrunoow/sa-senai-bombeiros',
    github_link: 'https://github.com/uBrunoow/sa-senai-bombeiros',
    image: FirefightersImage,
    has_github: true,
    has_website: false,
    tags: ['React', 'React Native', 'NextJS', 'TypeScript'],
  },
  {
    title: 'Ezstart',
    description:
      'EzStart is a platform designed for developers who want to quickly get started in the Linux environment.',
    link: 'https://ezstart.vercel.app/',
    github_link: 'https://github.com/uBrunoow/ezstart',
    image: EzstartImage,
    has_github: true,
    has_website: true,
    tags: ['React', 'NextJS', 'TypeScript'],
  },
  {
    title: 'FlyUp BPO',
    description:
      'A robust Fintech SaaS designed to automate financial BPO operations. Features include automated OFX parsing, high-volume data processing with Python (Pandas), and AI-driven transaction classification using RAG models.',
    link: 'https://flyupbpo.com.br/',
    github_link: '',
    image: FlyUpBPOImage,
    has_github: false,
    has_website: true,
    tags: ['AI', 'React', 'Python', 'NextJS', 'TypeScript'],
  },
  {
    title: 'Casa Amarela',
    description:
      'Casa Amarela is a fullstack website that involves the creation of services such as bathing and grooming, in addition to the veterinary office.',
    link: 'https://homolog.casaamarela.top/',
    image: CasaAmarelaImage,
    has_github: false,
    has_website: true,
    tags: ['React', 'NextJS', 'TypeScript', 'Python'],
  },
]
