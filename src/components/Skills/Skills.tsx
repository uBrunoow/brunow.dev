import { Box, Typography, LinearProgress, useMediaQuery } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import { SkillsText } from './utils/SkillsText'
import ContentWrapper from '@/ui/ContentWrapper/ContentWrapper'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@mui/material/styles'

function Skills() {
  const { t } = useTranslation()
  const isSmallScreen = useMediaQuery('(max-width: 768px)')
  const theme = useTheme()
  const isDarkTheme = theme.palette.mode === 'dark'

  const invertColor = (color: string): string => {
    return (
      '#' +
      (0xffffff ^ parseInt(color.slice(1), 16)).toString(16).padStart(6, '0')
    )
  }

  return (
    <>
      <ContentWrapper>
        <Typography
          variant="h3"
          fontFamily={'Montserrat'}
          fontWeight={'500'}
          textAlign={'center'}
          mb={2}
        >
          {t('skills')}
        </Typography>
        <Typography
          variant="body1"
          textAlign={'center'}
          fontFamily={'Montserrat'}
          fontWeight={'500'}
          mb={5}
        >
          {t('skillsResume')}
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
                width: isSmallScreen ? '100%' : '250px',
                transition: 'transform 0.3s ease',
                '&::after': {
                  content: '""',
                  filter:
                    skill?.inversion && isDarkTheme ? 'invert(1)' : 'invert(0)',
                  background: skill.colorSchema,
                  height: 50,
                  width: '76%',
                  position: 'absolute',
                  left: '12%',
                  bottom: 0,
                  transform: 'scale(0)',
                  transformOrigin: '50% 100%',
                  transition: 'transform 0.3s ease',
                  zIndex: 2,
                  borderRadius: 2,
                },
                '&:hover::after': {
                  transform: 'scale(1.05)',
                },
                '&:hover': {
                  transform: 'scale(1.05)',
                },
              }}
            >
              <Box
                sx={{
                  boxShadow: '0px 0px 20px #0000004f',
                  background: isDarkTheme ? '#1A1A1A' : '#ffffff',
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
                      skill?.inversion && isDarkTheme
                        ? 'invert(1)'
                        : 'invert(0)',
                  }}
                >
                  <Image src={skill?.img} alt="" height={70} width={70} />
                </Box>
                <Typography
                  fontWeight={'600'}
                  variant="body1"
                  letterSpacing={2}
                  textTransform={'uppercase'}
                  sx={{
                    fontFamily: 'Montserrat',
                    fontWeight: '500',
                  }}
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
    </>
  )
}

export default Skills
