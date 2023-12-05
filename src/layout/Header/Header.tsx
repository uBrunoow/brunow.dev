'use client'
import ContentWrapper from '@/ui/ContentWrapper/ContentWrapper'
import { Box, Button, Link, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useTheme } from '@mui/material/styles'
import { useTranslation } from 'react-i18next'

type HeaderProps = {
  currentSection: string
  setCurrentSection: React.Dispatch<React.SetStateAction<string>>
}
function Header(props: HeaderProps) {
  const theme = useTheme()
  const isDarkTheme = theme.palette.mode === 'dark'

  const handleLinkClick = (section: string) => {
    props.setCurrentSection(section)
  }

  useEffect(() => {
    const currentHash = window.location.hash.slice(1)

    if (currentHash && currentHash !== props.currentSection) {
      props.setCurrentSection(currentHash)
    }
  }, [props])

  const { t } = useTranslation()

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
              <Typography variant="h4" className="font-righteous">
                <Link
                  href="#home"
                  onClick={() => handleLinkClick('home')}
                  sx={{
                    color:
                      props.currentSection === 'home'
                        ? '#0277b5'
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
                  href="#about"
                  onClick={() => handleLinkClick('about')}
                  sx={{
                    color:
                      props.currentSection === 'about'
                        ? '#0277b5'
                        : isDarkTheme
                          ? '#fff'
                          : '#000',
                    textDecoration: 'none',
                    cursor: 'pointer',
                    '&:hover': { color: '#0277b5' },
                  }}
                >
                  {t('about')}
                </Link>
              </Typography>
              <Typography className="font-montserrat">
                <Link
                  href="#education"
                  onClick={() => handleLinkClick('education')}
                  sx={{
                    color:
                      props.currentSection === 'education'
                        ? '#0277b5'
                        : isDarkTheme
                          ? '#fff'
                          : '#000',
                    textDecoration: 'none',
                    cursor: 'pointer',
                    '&:hover': { color: '#0277b5' },
                  }}
                >
                  {t('education')}
                </Link>
              </Typography>
              <Typography className="font-montserrat">
                <Link
                  href="#experience"
                  onClick={() => handleLinkClick('experience')}
                  sx={{
                    color:
                      props.currentSection === 'experience'
                        ? '#0277b5'
                        : isDarkTheme
                          ? '#fff'
                          : '#000',
                    textDecoration: 'none',
                    cursor: 'pointer',
                    '&:hover': { color: '#0277b5' },
                  }}
                >
                  {t('experience')}
                </Link>
              </Typography>
              <Typography className="font-montserrat">
                <Link
                  href="#skills"
                  onClick={() => handleLinkClick('skills')}
                  sx={{
                    color:
                      props.currentSection === 'skills'
                        ? '#0277b5'
                        : isDarkTheme
                          ? '#fff'
                          : '#000',
                    textDecoration: 'none',
                    cursor: 'pointer',
                    '&:hover': { color: '#0277b5' },
                  }}
                >
                  {t('skills')}
                </Link>
              </Typography>
              <Typography className="font-montserrat">
                <Link
                  href="#projects"
                  onClick={() => handleLinkClick('projects')}
                  sx={{
                    color:
                      props.currentSection === 'projects'
                        ? '#0277b5'
                        : isDarkTheme
                          ? '#fff'
                          : '#000',
                    textDecoration: 'none',
                    cursor: 'pointer',
                    '&:hover': { color: '#0277b5' },
                  }}
                >
                  {t('projects')}
                </Link>
              </Typography>
              <Button
                variant="outlined"
                color="primary"
                className="font-montserrat"
              >
                Resume
              </Button>
            </Box>
          </Box>
        </Box>
      </ContentWrapper>
    </Box>
  )
}

export default Header
