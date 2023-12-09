'use client'
import ContentWrapper from '@/ui/ContentWrapper/ContentWrapper'
import { Box, Button, Link, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useTheme } from '@mui/material/styles'
import { useTranslation } from 'react-i18next'

type HeaderProps = {
  colorSchema: string
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
                  href="#about"
                  onClick={() => handleLinkClick('about')}
                  sx={{
                    color:
                      props.currentSection === 'about'
                        ? props.colorSchema
                        : isDarkTheme
                          ? '#fff'
                          : '#000',
                    textDecoration: 'none',
                    cursor: 'pointer',
                    '&:hover': { color: props.colorSchema },
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
                  onClick={() => handleLinkClick('experience')}
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
                  onClick={() => handleLinkClick('skills')}
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
                  onClick={() => handleLinkClick('projects')}
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
