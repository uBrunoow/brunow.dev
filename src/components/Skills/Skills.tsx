import { Box, Typography, LinearProgress } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import { SkillsText } from './utils/SkillsText'
import ContentWrapper from '@/ui/ContentWrapper/ContentWrapper'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@mui/material/styles'
function Skills() {
  const { t } = useTranslation()

  const theme = useTheme()
  const isDarkTheme = theme.palette.mode === 'dark'

  const invertColor = (color: string): string => {
    return (
      '#' +
      (0xffffff ^ parseInt(color.slice(1), 16)).toString(16).padStart(6, '0')
    )
  }

  return (
    <ContentWrapper>
      <Typography
        variant="h3"
        className="font-montserrat"
        textAlign={'center'}
        mb={2}
      >
        Skills
      </Typography>
      <Typography
        variant="body1"
        textAlign={'center'}
        className="font-montserrat"
        mb={5}
      >
        Destacam-se competências como desenvolvimento em tecnologias específicas
        (por exemplo, React, TypeScript, Next.js), experiência em frameworks
        (como React Native e Expo), conhecimento em backend (Fastify, Express,
        Prisma), e proficiência em linguagens como TypeScript.
      </Typography>
      <Box
        sx={{
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: '15px',
        }}
      >
        {SkillsText.map((skill, index) => (
          <Box
            key={index}
            sx={{
              p: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              gap: '15px',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <Box
              sx={{
                background:
                  'linear-gradient(90deg, rgba(2,119,181,1) 0%, rgba(0,0,0,0) 100%)',
                opacity: 0.2,
                height: 70,
                width: 70,
                position: 'absolute',
                left: 70,
                bottom: 70,
                borderRadius: '100%',
                overflow: 'hidden',
                zIndex: 2,
              }}
            />
            <Box
              sx={{
                boxShadow: '0px 0px 20px #0000004f',
                background: isDarkTheme ? '#2b2b2b57' : '#ffffff57',
                p: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                gap: '15px',
                width: 200,
                borderRadius: 2,
                position: 'relative',
                zIndex: 3,
              }}
            >
              <Box
                sx={{
                  height: 100,
                  width: 100,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textTransform: 'uppercase',
                  borderRadius: '5px',
                  overflow: 'hidden',
                  filter:
                    skill?.inversion && isDarkTheme ? 'invert(1)' : 'invert(0)',
                }}
              >
                <Image src={skill?.img} alt="" height={70} width={70} />
              </Box>
              <Typography
                fontWeight={'600'}
                variant="body1"
                letterSpacing={2}
                textTransform={'uppercase'}
                className="font-montserrat"
              >
                {skill?.name}
              </Typography>
              <LinearProgress
                variant="determinate"
                value={skill.progress}
                sx={{
                  width: '100%',
                  background: '#00000014',
                  '& > span': {
                    background:
                      skill?.inversion && isDarkTheme
                        ? invertColor(skill.colorSchema)
                        : skill.colorSchema,
                  },
                }}
              />
            </Box>
          </Box>
        ))}
      </Box>
    </ContentWrapper>
  )
}

export default Skills
