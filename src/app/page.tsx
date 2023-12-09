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
import { useTranslation } from 'react-i18next'
import ChangeLanguage from '@/layout/Header/ChangeLanguage'
import Skills from '@/components/Skills/Skills'
import Education from '@/components/Education/Education'
import Experience from '@/components/Experience/Experience'
import Projects from '@/components/Projects/Projects'
import { HexColorPicker } from 'react-colorful'
import HeroImage from '@/assets/heroImage'

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

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header
          colorSchema={color}
          currentSection={currentSection}
          setCurrentSection={setCurrentSection}
        />
        <HeroImage colorSchema={hexToRGB(color, 0.5)} />
        <ChangeLanguage colorSchema={color} />
        <ChangeTheme onToggle={toggleTheme} colorSchema={color} />
        <Box
          onClick={handleColorPicker}
          sx={{
            background: color,
            height: 30,
            width: 30,
            top: 34,
            right: 65,
            position: 'fixed',
            borderRadius: '50%',
            zIndex: 100,
            border:
              themeMode === 'dark' ? '3px solid white' : '3px solid #8a8a8a50',
          }}
        />
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
                    href="#about"
                    color="primary"
                    variant="contained"
                    className="colored-btn"
                    onClick={() => handleNavigation('about')}
                  >
                    {t('about')} {t('me')}
                  </Button>
                  <Box
                    sx={{
                      '& > .colored-btn': {
                        color,
                      },
                    }}
                  >
                    <Button href="#projects" className="colored-btn">
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
