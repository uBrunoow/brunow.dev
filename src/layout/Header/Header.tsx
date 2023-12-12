'use client'
import ContentWrapper from '@/ui/ContentWrapper/ContentWrapper'
import { Box, Button, Link, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useTheme } from '@mui/material/styles'
import { useTranslation } from 'react-i18next'

type HeaderProps = {
  colorSchema: string
  currentSection: string
  handleNavigation: (section: string) => void
}
function Header(props: HeaderProps) {
  const theme = useTheme()
  const isDarkTheme = theme.palette.mode === 'dark'

  const handleLinkClick = (
    section: string,
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    event.preventDefault()
    props.handleNavigation(section)

    const targetSection = document.getElementById(section)
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  useEffect(() => {
    const currentHash = window.location.hash.slice(1)

    if (currentHash && currentHash !== props.currentSection) {
      props.handleNavigation(currentHash)
    }
  }, [props])

  useEffect(() => {
    const handleScroll = () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const scrollPosition = window.scrollY
      const sections = ['home', 'education', 'experience', 'skills', 'projects']

      let foundSection = ''
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            foundSection = section
            break
          }
        }
      }

      if (foundSection && foundSection !== props.currentSection) {
        props.handleNavigation(foundSection)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [props])

  const { t } = useTranslation()

  const handleDownload = () => {
    const fileUrl =
      'https://drive.google.com/file/d/1g7I0aiPqGHOKl9mZu9JBcVVaFaWD2w80/view?usp=sharing'
    window.open(fileUrl, '_blank')
  }

  return (
    <Box
      sx={{
        background: isDarkTheme ? '#121212' : '#fff',
        width: '100%',
        height: '100px',
        display: 'block',
        position: 'fixed',
        zIndex: '12',
      }}
    >
      <ContentWrapper>
        <Box
          sx={{
            height: '100px',
            paddingY: '20px',
            display: 'flex',
            position: 'fixed',
            background: isDarkTheme ? '#121212' : '#fff',
            zIndex: '11',
          }}
        >
          <Box
            display={'flex'}
            alignItems={'center'}
            justifyContent={'space-between'}
            width={'1400px'}
          >
            <Box>
              <Typography variant="h4" className="font-montserrat">
                <Link
                  href="#home"
                  onClick={(event) => handleLinkClick('home', event)}
                  sx={{
                    color:
                      props.currentSection === 'home'
                        ? props.colorSchema
                        : isDarkTheme
                          ? '#fff'
                          : '#000',
                    textDecoration: 'none',
                    cursor: 'pointer',
                    '&:hover': {},
                  }}
                >
                  BruNow.W()
                </Link>
              </Typography>
            </Box>
            <Box
              display={'flex'}
              gap={5}
              alignItems={'center'}
              position={'relative'}
            >
              <Typography className="font-montserrat">
                <Link
                  href="#education"
                  onClick={(event) => handleLinkClick('education', event)}
                  sx={{
                    color:
                      props.currentSection === 'education'
                        ? props.colorSchema
                        : isDarkTheme
                          ? '#fff'
                          : '#000',
                    textDecoration: 'none',
                    cursor: 'pointer',
                    '&:hover': { color: props.colorSchema },
                  }}
                >
                  {t('education')}
                </Link>
              </Typography>
              <Typography className="font-montserrat">
                <Link
                  href="#experience"
                  onClick={(event) => handleLinkClick('experience', event)}
                  sx={{
                    color:
                      props.currentSection === 'experience'
                        ? props.colorSchema
                        : isDarkTheme
                          ? '#fff'
                          : '#000',
                    textDecoration: 'none',
                    cursor: 'pointer',
                    '&:hover': { color: props.colorSchema },
                  }}
                >
                  {t('experience')}
                </Link>
              </Typography>
              <Typography className="font-montserrat">
                <Link
                  href="#skills"
                  onClick={(event) => handleLinkClick('skills', event)}
                  sx={{
                    color:
                      props.currentSection === 'skills'
                        ? props.colorSchema
                        : isDarkTheme
                          ? '#fff'
                          : '#000',
                    textDecoration: 'none',
                    cursor: 'pointer',
                    '&:hover': { color: props.colorSchema },
                  }}
                >
                  {t('skills')}
                </Link>
              </Typography>
              <Typography className="font-montserrat">
                <Link
                  href="#projects"
                  onClick={(event) => handleLinkClick('projects', event)}
                  sx={{
                    color:
                      props.currentSection === 'projects'
                        ? props.colorSchema
                        : isDarkTheme
                          ? '#fff'
                          : '#000',
                    textDecoration: 'none',
                    cursor: 'pointer',
                    '&:hover': { color: props.colorSchema },
                  }}
                >
                  {t('projects')}
                </Link>
              </Typography>
              <Box
                sx={{
                  '& > .colored-btn': {
                    border: `1px solid ${props.colorSchema}`,
                    color: props.colorSchema,
                  },
                }}
              >
                <Button
                  variant="outlined"
                  color="primary"
                  className="font-montserrat colored-btn"
                  onClick={handleDownload}
                >
                  Resume
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </ContentWrapper>
    </Box>
  )
}

export default Header
