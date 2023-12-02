'use client'
import ChangeTheme from '@/components/Header/ChangeTheme'
import Header from '@/components/Header/Header'
import ContentWrapper from '@/ui/ContentWrapper/ContentWrapper'
import { Box, Button, CssBaseline, Typography, styled } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { useState } from 'react'

const Triangulo90Graus = styled('div')({
  width: 0,
  height: 0,
  borderStyle: 'solid',
  borderWidth: '828px 828px 0px 828px',
  borderColor: 'transparent #0277b5 transparent transparent ',
  position: 'absolute',
  right: '0',
  zIndex: '9',
  marginTop: '90px',
})
const Home = () => {
  const [themeMode, setThemeMode] = useState('light')

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

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <Triangulo90Graus />
        <ChangeTheme onToggle={toggleTheme} />
        <ContentWrapper>
          <Box
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
                    Hi, I&apos;m Bruno Werner
                  </Typography>
                  <Typography
                    variant="h5"
                    color="#0277b5"
                    className="font-montserrat"
                  >
                    FRONT-END DEVELOPER
                  </Typography>
                </Box>
                <Typography
                  variant="body1"
                  textAlign={'justify'}
                  className="font-montserrat"
                >
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Velit cum, itaque molestiae culpa saepe ad provident
                  necessitatibus atque iusto at quidem. Laboriosam ipsum
                  inventore voluptatem excepturi commodi harum, ea blanditiis?
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    gap: '15px',
                    '& > .colored-btn': {
                      backgroundColor: '#0277b5',
                      color: '#fff',
                    },
                  }}
                >
                  <Button
                    color="primary"
                    variant="contained"
                    className="colored-btn"
                  >
                    About me
                  </Button>
                  <Button>Projects</Button>
                </Box>
              </Box>

              <Typography>bbbbbbbbbbbbbb</Typography>
            </Box>
          </Box>
        </ContentWrapper>
      </ThemeProvider>
    </>
  )
}

export default Home
