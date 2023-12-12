'use client'
import ChangeTheme from '@/layout/Header/ChangeTheme'
import Header from '@/layout/Header/Header'
import ContentWrapper from '@/ui/ContentWrapper/ContentWrapper'
import { Box, Button, CssBaseline, Typography } from '@mui/material'
import { Dns, ExpandLess } from '@mui/icons-material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { TypeAnimation } from 'react-type-animation'
import brunowImage from '@/assets/brunow-image.jpg'
import { useTranslation } from 'react-i18next'
import ChangeLanguage from '@/layout/Header/ChangeLanguage'
import Skills from '@/components/Skills/Skills'
import Education from '@/components/Education/Education'
import Experience from '@/components/Experience/Experience'
import Projects from '@/components/Projects/Projects'
import { HexColorPicker } from 'react-colorful'
import HeroImage from '@/assets/heroImage'
import SwiperSkills from '@/components/Skills/components/SwiperSkills/SwiperSkills'

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

  const handleLinkClick = (
    section: string,
    event: React.MouseEvent<HTMLElement>,
  ) => {
    event.preventDefault()
    handleNavigation(section)

    const targetSection = document.getElementById(section)
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const [color, setColor] = useState('#0277b5')
  const [openColorPicker, setOpenColorPicker] = useState(false)

  const handleColorPicker = () => {
    setOpenColorPicker(!openColorPicker)
  }

  const substituirCores = (texto: string, cor: string) => {
    return texto.replace(
      /<span style="color: #0277b5;">/g,
      `<span style="color: ${cor};">`,
    )
  }

  const hexToRGB = (hex: string, opacity: number) => {
    const bigint = parseInt(hex.slice(1), 16)
    const r = (bigint >> 16) & 255
    const g = (bigint >> 8) & 255
    const b = bigint & 255
    return `rgba(${r}, ${g}, ${b}, ${opacity})`
  }

  const textoFormatado = substituirCores(t('aboutMe'), color)
  const nomeFormatado = substituirCores(t('MyName'), color)

  const [showScrollToTop, setShowScrollToTop] = useState(false)

  const handleScroll = () => {
    const scrollTop = window.scrollY
    setShowScrollToTop(scrollTop > 200)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Header
          colorSchema={color}
          currentSection={currentSection}
          handleNavigation={handleNavigation}
        />

        <ContentWrapper>
          <HeroImage colorSchema={hexToRGB(color, 0.5)} />
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              margin: '20px',
              position: 'fixed',
              zIndex: 1000,
              top: '11px',
              right: 0,
            }}
          >
            <>
              <ChangeLanguage colorSchema={color} />
              <ChangeTheme onToggle={toggleTheme} colorSchema={color} />
              <Box
                width={'64px'}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '6px 8px',
                  cursor: 'pointer',
                }}
              >
                <Box
                  onClick={handleColorPicker}
                  sx={{
                    background: color,
                    height: 20,
                    width: 20,

                    borderRadius: '50%',
                    zIndex: 100,
                    border:
                      themeMode === 'dark'
                        ? '3px solid white'
                        : '3px solid #8a8a8a50',
                  }}
                />
              </Box>
              {openColorPicker === true && (
                <Box
                  sx={{
                    top: 100,
                    right: 65,
                    zIndex: 200,
                    position: 'fixed',
                  }}
                >
                  <HexColorPicker color={color} onChange={setColor} />
                </Box>
              )}
            </>
          </Box>
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
                  <Typography
                    variant="h3"
                    className="font-montserrat"
                    dangerouslySetInnerHTML={{ __html: nomeFormatado }}
                  />
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
                    }}
                    repeat={Infinity}
                    className={`font-montserrat`}
                  />
                </Box>
                <Typography
                  variant="body1"
                  textAlign={'justify'}
                  className="font-montserrat"
                  dangerouslySetInnerHTML={{ __html: textoFormatado }}
                />

                <Box
                  sx={{
                    display: 'flex',
                    gap: '15px',
                    '& > .colored-btn': {
                      backgroundColor: color,
                      background: `linear-gradient(77deg, ${color} 0%, ${hexToRGB(
                        color,
                        0.5,
                      )} 100%)`,
                      color: '#fff',
                    },
                  }}
                >
                  <Button
                    color="primary"
                    variant="contained"
                    className="colored-btn"
                    onClick={(event) => handleLinkClick('skills', event)}
                  >
                    {t('skills')}
                  </Button>
                  <Box
                    sx={{
                      '& > .colored-btn': {
                        color,
                      },
                    }}
                  >
                    <Button
                      className="colored-btn"
                      startIcon={<Dns />}
                      onClick={(event) => handleLinkClick('projects', event)}
                    >
                      {t('projects')}
                    </Button>
                  </Box>
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
                    background: color,
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
            <Education colorSchema={color} />
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
            <Experience colorSchema={color} />
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
            sx={{
              width: '100%',
              height: '100px',
              overflowX: 'hidden',
              position: 'relative',
              background: 'transparent',
              boxShadow:
                themeMode === 'dark'
                  ? '0px 0px 20px #4141414f'
                  : '0px 0px 20px #0000004f',
              mb: 22,
              borderRadius: '10px',
            }}
          >
            <SwiperSkills />
          </Box>
          <Box
            id="projects"
            sx={{
              height: '2800px',
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
        {showScrollToTop && (
          <Box
            onClick={scrollToTop}
            sx={{
              position: 'fixed',
              bottom: '20px',
              right: '20px',
              cursor: 'pointer',
              zIndex: 1000,
              backgroundColor: color,
              padding: '10px',
              borderRadius: '50%',
            }}
          >
            <ExpandLess style={{ color: '#fff' }} />
          </Box>
        )}
      </ThemeProvider>
    </>
  )
}

export default Home
