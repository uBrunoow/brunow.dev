'use client'
import ContentWrapper from '@/ui/ContentWrapper/ContentWrapper'
import {
  Box,
  Button,
  Drawer,
  Link,
  List,
  ListItem,
  Typography,
  useMediaQuery,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useTheme } from '@mui/material/styles'
import { useTranslation } from 'react-i18next'
import { Logout, Menu } from '@mui/icons-material'

type HeaderProps = {
  colorSchema: string
  currentSection: string
  handleNavigation: (section: string) => void
}
function Header(props: HeaderProps) {
  const theme = useTheme()
  const isDarkTheme = theme.palette.mode === 'dark'
  const isMediumScreen = useMediaQuery('(max-width: 1024px)')
  const isSmallScreen = useMediaQuery('(max-width: 768px)')

  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true)
  }

  const handleDrawerClose = () => {
    setIsDrawerOpen(false)
  }

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
        height: isSmallScreen ? '120px' : '100px',
        display: 'block',
        position: 'fixed',
        zIndex: '12',
      }}
    >
      <ContentWrapper>
        <Box
          sx={{
            height: '100px',
            padding: '20px',
            display: 'flex',
            position: 'fixed',
            background: isDarkTheme ? '#121212' : '#fff',
            zIndex: '11',
            maxWidth: '1600px',
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box>
            <Typography
              variant="h4"
              fontFamily={'Montserrat'}
              fontWeight={'500'}
            >
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
          {!isMediumScreen && (
            <Box
              display={'flex'}
              gap={5}
              alignItems={'center'}
              position={'relative'}
              mr={'100px'}
            >
              <Typography fontFamily={'Montserrat'} fontWeight={'500'}>
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
              <Typography fontFamily={'Montserrat'} fontWeight={'500'}>
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
              <Typography fontFamily={'Montserrat'} fontWeight={'500'}>
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
              <Typography fontFamily={'Montserrat'} fontWeight={'500'}>
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
                  className="colored-btn"
                  sx={{
                    fontFamily: 'Montserrat',
                    fontWeight: '500',
                  }}
                  onClick={handleDownload}
                >
                  {t('Resume')}
                </Button>
              </Box>
            </Box>
          )}
          {isMediumScreen && (
            <>
              <Button
                onClick={handleDrawerOpen}
                sx={{ color: props.colorSchema }}
              >
                <Menu />
              </Button>
              <Drawer
                anchor="right"
                open={isDrawerOpen}
                onClose={handleDrawerClose}
              >
                <List
                  sx={{
                    width: '200px',
                    height: '100%',
                    position: 'relative',
                  }}
                >
                  {['education', 'experience', 'skills', 'projects'].map(
                    (section) => (
                      <ListItem key={section}>
                        <Link
                          href={`#${section}`}
                          onClick={(event) => {
                            handleDrawerClose()
                            handleLinkClick(section, event)
                          }}
                          sx={{
                            width: '100%',
                            color:
                              props.currentSection === section
                                ? props.colorSchema
                                : isDarkTheme
                                  ? '#fff'
                                  : '#000',
                            textDecoration: 'none',
                            cursor: 'pointer',
                            '&:hover': { color: props.colorSchema },
                          }}
                        >
                          {t(section)}
                        </Link>
                      </ListItem>
                    ),
                  )}
                  <Box
                    sx={{
                      '& > .colored-btn': {
                        border: `1px solid ${props.colorSchema}`,
                        color: props.colorSchema,
                        width: '90%',
                        ml: 1.3,
                        mt: 2,
                      },
                    }}
                  >
                    <Button
                      variant="outlined"
                      color="primary"
                      sx={{
                        fontFamily: 'Montserrat',
                        fontWeight: '500',
                      }}
                      className="colored-btn"
                      onClick={handleDownload}
                    >
                      {t('Resume')}
                    </Button>
                  </Box>
                  <Box
                    onClick={handleDrawerClose}
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      height: '50px',
                      background: props.colorSchema,
                      width: '100%',
                      border: 'none',
                      outline: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '5px',
                    }}
                  >
                    <Logout
                      sx={{
                        color: isDarkTheme ? '#000' : '#fff',
                        cursor: 'pointer',
                      }}
                    />{' '}
                    <Typography
                      variant="button"
                      sx={{
                        color: isDarkTheme ? '#000' : '#fff',
                        cursor: 'pointer',
                      }}
                    >
                      {t('closeMenu')}
                    </Typography>
                  </Box>
                </List>
              </Drawer>
            </>
          )}
        </Box>
      </ContentWrapper>
    </Box>
  )
}

export default Header
