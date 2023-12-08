import BombeirosImage from '@/assets/mockrocket-capture.png'
import { StaticImageData } from 'next/image'

interface ITech {
  name: string
  color: string
}

interface IProjects {
  name: string
  desc: string
  img: StaticImageData
  tech_stack: ITech[]
  link?: string
}

export const ProjectsText: IProjects[] = [
  {
    name: 'SA SENAI BOMBEIROS',
    desc: 'A full-stack website and app for NOAR firefighters (Nucleus of Air Operations and Rescue.) in order to automate its activities when carrying out a rescue. The tools used were NextJS, TypeScript, React, React Native, Expo, Tailwindcss and a lot more. ',
    img: BombeirosImage,
    tech_stack: [
      {
        name: 'react',
        color: 'c',
      },
      {
        name: 'nodejs',
        color: 'c',
      },
      {
        name: 'typescript',
        color: 'c',
      },
      {
        name: 'react-native',
        color: 'c',
      },
      {
        name: 'nextjs',
        color: 'c',
      },
      {
        name: 'jwt-authentication',
        color: 'c',
      },
      {
        name: 'fastify',
        color: 'c',
      },
      {
        name: 'expo',
        color: 'c',
      },
      {
        name: 'tailwindcss',
        color: 'c',
      },
    ],
  },
  {
    name: 'React',
    desc: '',
    img: BombeirosImage,
    tech_stack: [
      {
        name: 'c',
        color: 'c',
      },
      {
        name: 'c',
        color: 'c',
      },
    ],
  },
]
