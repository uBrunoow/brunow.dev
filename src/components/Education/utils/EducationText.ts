import { Android, AutoStories, Boy } from '@mui/icons-material'
import { ReactElement } from 'react'

interface IEducation {
  icon: React.ElementType
  school: string
  course: string[]
  since: string
  city: string
  uf: string
}

export const EducationText: IEducation[] = [
  {
    icon: Android,
    school: 'Sesi Senai',
    course: [
      'Ensino médio completo',
      'Educação técnica em desenvolvimento de sistemas',
    ],
    since: '2021 - atual',
    city: 'Joinville',
    uf: 'SC',
  },
  {
    icon: AutoStories,
    school: 'Univille',
    course: ['Ensino fundamental completo'],
    since: '2019 - 2021',
    city: 'Joinville',
    uf: 'SC',
  },
  {
    icon: Boy,
    school: 'Dalva Zanotto de lemos',
    course: ['Ensino fundamental incompleto'],
    since: '2011 - 2019',
    city: 'Vacaria',
    uf: 'RS',
  },
]
