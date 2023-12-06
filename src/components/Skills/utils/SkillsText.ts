import TypescriptImage from '@/assets/SkillsLogos/typescript-icon.svg'
import ReactImage from '@/assets/SkillsLogos/react.svg'
import PrismaImage from '@/assets/SkillsLogos/file-type-light-prisma.svg'
import NextImage from '@/assets/SkillsLogos/next-js.svg'
import FastifyImage from '@/assets/SkillsLogos/fastify.svg'
import ExpressImage from '@/assets/SkillsLogos/express-original.svg'
import NodeImage from '@/assets/SkillsLogos/node-js.svg'
import ReduxImage from '@/assets/SkillsLogos/redux-original.svg'

interface Skill {
  name: string
  img: string
  progress: number
  colorSchema: string
  inversion?: boolean
}

export const SkillsText: Skill[] = [
  {
    name: 'React',
    img: ReactImage,
    progress: 90,
    colorSchema: '#3FE1FF',
  },
  {
    name: 'Node js',
    img: NodeImage,
    progress: 70,
    colorSchema: '#539E43',
  },
  {
    name: 'Typescript',
    img: TypescriptImage,
    progress: 90,
    colorSchema: '#007ACC',
  },
  {
    name: 'Next.js',
    img: NextImage,
    progress: 60,
    colorSchema: '#000',
    inversion: true,
  },
  {
    name: 'Redux',
    img: ReduxImage,
    progress: 40,
    colorSchema: '#764ABC',
  },
  {
    name: 'Fastify',
    img: FastifyImage,
    progress: 50,
    colorSchema: '#000',
    inversion: true,
  },
  {
    name: 'Express',
    img: ExpressImage,
    progress: 50,
    colorSchema: '#000',
    inversion: true,
  },
  {
    name: 'Prisma',
    img: PrismaImage,
    progress: 30,
    colorSchema: '#121212',
    inversion: true,
  },
]
