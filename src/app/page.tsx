'use client'
import ChangeTheme from '@/layout/Header/ChangeTheme'
import Header from '@/layout/Header/Header'
import Hero from '@/components/Hero/Hero'
import ContentWrapper from '@/ui/ContentWrapper/ContentWrapper'
import { Box, Button, CssBaseline, Typography } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Image from 'next/image'
import { useState } from 'react'
import { TypeAnimation } from 'react-type-animation'
import brunowImage from '@/assets/brunow-image.jpg'
import heroImage from '@/assets/hero-image.svg'
import { useTranslation } from 'react-i18next'
import ChangeLanguage from '@/layout/Header/ChangeLanguage'
import Skills from '@/components/Skills/Skills'
import Education from '@/components/Education/Education'
import Experience from '@/components/Experience/Experience'
import Projects from '@/components/Projects/Projects'

const Home = () => {
  const { t } = useTranslation()
  const [themeMode, setThemeMode] = useState('light')
  const [currentSection, setCurrentSection] = useState('')

  const toggleTheme = () => {
    setThemeMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
  }

  // Configuração do tema claro
  const lightTheme = createTheme({
    palette: {
      mode: 'light',
    },
  })

  // Configuração do tema escuro
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  })

  const theme = themeMode === 'light' ? lightTheme : darkTheme

  const handleNavigation = (section: string) => {
    setCurrentSection(section)
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ChangeLanguage />
        <Header
          currentSection={currentSection}
          setCurrentSection={setCurrentSection}
        />
        <Image
          src={heroImage}
          alt=""
          width={828}
          height={828}
          className="absolute right-10 z-[9] mt-[100px]"
        />
        <ChangeTheme onToggle={toggleTheme} />
        <ContentWrapper>
          <Box
            id="home"
            sx={{
              height: '828px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              zIndex: '10',
              position: 'relative',
            }}
          >
            <Box
              display={'flex'}
              alignItems={'center'}
              justifyContent={'space-between'}
              p={2}
              width={'100%'}
              mt={'100px'}
            >
              <Box
                width={'50%'}
                display={'flex'}
                alignItems={'start'}
                justifyContent={'center'}
                flexDirection={'column'}
                gap={5}
              >
                <Box>
                  <Typography variant="h3" className="font-montserrat">
                    {t('MyName')}
                  </Typography>
                  <TypeAnimation
                    sequence={[
                      'FRONT-END DEVELOPER',
                      1000,
                      'BACK-END DEVELOPER',
                      1000,
                    ]}
                    wrapper="span"
                    speed={50}
                    style={{
                      fontSize: '1.5rem',
                      display: 'inline-block',
                      fontWeight: '400',
                      lineHeight: '1.334',
                      letterSpacing: '0em',
                      color: '#0277b5',
                    }}
                    repeat={Infinity}
                    className="font-montserrat"
                  />
                </Box>
                <Typography
                  variant="body1"
                  textAlign={'justify'}
                  className="font-montserrat"
                  dangerouslySetInnerHTML={{ __html: t('aboutMe') }}
                />

                <Box
                  sx={{
                    display: 'flex',
                    gap: '15px',
                    '& > .colored-btn': {
                      backgroundColor: 'rgb(2,119,181)',
                      background:
                        'linear-gradient(77deg, rgba(2,119,181,1) 0%, rgba(60,78,204,1) 100%)',
                      color: '#fff',
                    },
                  }}
                >
                  <Button
                    href="#about"
                    color="primary"
                    variant="contained"
                    className="colored-btn"
                    onClick={() => handleNavigation('about')}
                  >
                    {t('about')} {t('me')}
                  </Button>
                  <Button href="#projects"> {t('projects')}</Button>
                </Box>
              </Box>

              <Box position={'relative'}>
                <Image
                  src={brunowImage}
                  alt=""
                  width={400}
                  height={400}
                  className=" rounded-full border-white border-8 relative z-10 shadow-black shadow-2xl"
                />
                <Box
                  sx={{
                    background: '#066aa0',
                    width: '400px',
                    height: '400px',
                    borderRadius: '100%',
                    position: 'absolute',
                    top: '0',
                    left: '200px',
                    zIndex: '2',
                  }}
                />
              </Box>
            </Box>
          </Box>
          <Box
            id="about"
            sx={{
              height: '828px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              zIndex: '10',
              position: 'relative',
            }}
          >
            <Hero />
          </Box>
          <Box
            id="education"
            sx={{
              height: '828px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              zIndex: '10',
              position: 'relative',
            }}
          >
            <Education />
          </Box>
          <Box
            id="experience"
            sx={{
              height: '828px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              zIndex: '10',
              position: 'relative',
            }}
          >
            <Experience />
          </Box>
          <Box
            id="skills"
            sx={{
              height: '1000px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              zIndex: '10',
              position: 'relative',
            }}
          >
            <Skills />
          </Box>
          <Box
            id="projects"
            sx={{
              height: '2500px',

              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              zIndex: '10',
              position: 'relative',
            }}
          >
            <Projects />
          </Box>
        </ContentWrapper>
      </ThemeProvider>
    </>
  )
}

export default Home
