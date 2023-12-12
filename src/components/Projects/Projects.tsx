'use client'
import ContentWrapper from '@/ui/ContentWrapper/ContentWrapper'
import {
  Box,
  Chip,
  Link,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { GitHub, Language } from '@mui/icons-material'
import fetchProjects from '@/api/fetchProjects'
import getProjectImage from './utils/getProjetcsImage'
import removeHyphens from './utils/removeHypens'
import { IProjects } from '@/interfaces/IProjects'
import { useTranslation } from 'react-i18next'

function Projects() {
  const { t } = useTranslation()
  const theme = useTheme()
  const isDarkTheme = theme.palette.mode === 'dark'
  const isSmallScreen = useMediaQuery('(max-width: 768px)')

  const [githubProjects, setGithubProjects] = useState<IProjects[]>([])

  useEffect(() => {
    const findProjects = async () => {
      const response = await fetchProjects()
      setGithubProjects(response)
      console.log(response)
    }

    findProjects()
  }, [])

  const projectNamesToDisplay = [
    'sa-senai-bombeiros',
    'Banco-Inter',
    'nlw-spacetime',
    'shopping-cart',
    'crud-api',
    'weather-api',
  ]

  const filteredProjects = githubProjects.filter((project) =>
    projectNamesToDisplay.includes(project.name),
  )

  const getProjectColor = (projectName: string) => {
    switch (projectName) {
      case 'sa-senai-bombeiros':
        return '#ff000052'
      case 'Banco-Inter':
        return '#FD7A0552'
      case 'nlw-spacetime':
        return '#2C214852'
      case 'shopping-cart':
        return '#FFF15952'
      case 'crud-api':
        return '#2EA65952'
      case 'weather-api':
        return '#10409952'
      default:
        return '#00000052'
    }
  }
  const getProjectTextColor = (projectName: string) => {
    switch (projectName) {
      case 'sa-senai-bombeiros':
        return isDarkTheme ? '#ff6b6b' : '#ff0000'
      case 'Banco-Inter':
        return '#fd7905'
      case 'nlw-spacetime':
        return isDarkTheme ? '#5c4597' : '#2c2148'
      case 'shopping-cart':
        return isDarkTheme ? '#ffea00' : '#9c9331'
      case 'crud-api':
        return '#2ea65a'
      case 'weather-api':
        return '#104099'
      default:
        return '#000000'
    }
  }
  const getWallpaperColor = (projectName: string) => {
    switch (projectName) {
      case 'sa-senai-bombeiros':
        return '#ff0000'
      case 'Banco-Inter':
        return '#fd7905'
      case 'nlw-spacetime':
        return '#2c2148'
      case 'shopping-cart':
        return '#ffea00'
      case 'crud-api':
        return '#2ea65a'
      case 'weather-api':
        return '#104099'
      default:
        return '#000000'
    }
  }

  return (
    <ContentWrapper>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'start',
          justifyContent: 'space-between',
          flexDirection: 'column',
        }}
      >
        <Box
          width={'75%'}
          display={'flex'}
          alignItems={'start'}
          justifyContent={'center'}
          flexDirection={'column'}
          gap={5}
        >
          <Box>
            <Typography
              variant="h3"
              className="font-montserrat"
              textAlign={'justify'}
              mb={2}
            >
              {t('projects')}
            </Typography>
            <Typography
              variant="body1"
              textAlign={'justify'}
              className="font-montserrat"
              mb={5}
            >
              {t('projectsResume')}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '50px',
            flexDirection: 'column',
            width: '100%',
          }}
        >
          {filteredProjects.map((project, index) => {
            const marginValues = ['70', '-70', '70', '-70', '70', '-70']

            const margin = marginValues[index % marginValues.length]

            return (
              <Box
                key={index}
                sx={{
                  boxShadow: '0px 0px 20px #0000004f',
                  p: 4,
                  marginLeft: isSmallScreen ? '0px' : `${margin}px`,
                  display: 'flex',
                  alignItems: 'start',
                  justifyContent: 'center',
                  flexDirection: isSmallScreen ? 'column' : 'row',
                  gap: '35px',
                  width: '100%',
                  borderRadius: 2,
                  position: 'relative',
                  zIndex: 2,
                  height: isSmallScreen ? '100%' : '350px',
                  transition: 'transform 0.3s ease',
                  overflow: 'hidden',
                  mb: '30px',
                  '&::after': {
                    content: '""',
                    background: getWallpaperColor(project.name),
                    height: '95%',
                    width: '1%',
                    right: '-4%',
                    bottom: 0,
                    zIndex: 1,
                    transform: 'scale(0)',
                    transformOrigin: '100% 0% ',
                    transition: 'transform 0.3s ease',
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
                <Link
                  href={project.html_url}
                  target="_blank"
                  sx={{
                    width: '100%',
                    height: '100%',
                  }}
                >
                  <Image
                    src={getProjectImage(project.name)}
                    alt=""
                    style={{
                      width: '100%',
                      borderRadius: '8px',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </Link>
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'start',
                    justifyContent: 'space-between',
                    flexDirection: 'column',
                    height: '100%',
                    gap: isSmallScreen ? '100px' : '0px',
                  }}
                >
                  <Box>
                    <Typography
                      variant="h5"
                      fontWeight={'bold'}
                      className="font-montserrat"
                      textTransform={'capitalize'}
                    >
                      {removeHyphens(project.name)}
                    </Typography>
                    <Typography
                      variant="body1"
                      textAlign={'justify'}
                      className="font-montserrat"
                    >
                      {(() => {
                        switch (project.description) {
                          case 'A replica of the inter bank website to improve my skills with NextJS, Tailwind and a lot more':
                            return t('BancoInterResume')
                          case 'My project is a full-stack application developed with technologies: React JS, Node.js, JavaScript and CSS. It is a powerful CRUD (Create, Read, Update, Delete) application that allows users to perform basic data management operations.':
                            return t('CrudApiResume')
                          case 'A project done in a week of nlw-space-time, where I learned many things, some of them were basic and even advanced knowledge of NextJS ,TypeScript , React , React Native , NodeJs ,Next Auth , JWT Authentication and a lor more':
                            return t('NlwSpacetimeResume')
                          case 'A full-stack website and app for NOAR firefighters (Nucleus of Air Operations and Rescue.) in order to automate its activities when carrying out a rescue. The tools used were NextJS, TypeScript, React, React Native, Expo, Tailwindcss and a lot more.':
                            return t('SaSenaiBombeirosResume')
                          case 'A site inspired by Mercado Livre made with React JSX, JavaScript and CSS':
                            return t('ShoppingCartResume')
                          case 'A weather-api using OpenWeatherApi and OpenCageData to make a Complete Weather App made with NextJS , Tailwindcss , TypeScript , React and a lot more':
                            return t('WeatherApiResume')
                          default:
                            return project.description
                        }
                      })()}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'flex-end',
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}
                  >
                    <Box
                      sx={{
                        width: '70%',
                        display: 'flex',
                        alignItems: 'start',
                        justifyContent: 'start',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        gap: '8px',
                      }}
                    >
                      {project.topics.map((topic, index) => (
                        <Box
                          key={index}
                          sx={{
                            background: getProjectColor(project.name),
                            paddingX: '10px',
                            paddingY: '3px',
                            borderRadius: '50px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <Typography
                            variant="caption"
                            className="font-montserrat"
                            sx={{
                              color: getProjectTextColor(project.name),
                              fontWeight: '700',
                            }}
                          >
                            {topic}
                          </Typography>
                        </Box>
                      ))}
                    </Box>

                    <Chip
                      label="Github"
                      component="a"
                      href={project.html_url}
                      variant="outlined"
                      target="_blank"
                      clickable
                      avatar={<GitHub />}
                      sx={{
                        mr: 1,
                      }}
                    />

                    {project.homepage && (
                      <Chip
                        label="Website"
                        component="a"
                        href={project.homepage}
                        variant="outlined"
                        target="_blank"
                        clickable
                        avatar={<Language />}
                      />
                    )}
                  </Box>
                </Box>
              </Box>
            )
          })}
        </Box>
      </Box>
    </ContentWrapper>
  )
}

export default Projects
