'use client'
import ContentWrapper from '@/ui/ContentWrapper/ContentWrapper'
import { Box, Button, Link, Typography } from '@mui/material'
import React from 'react'
import { useTheme } from '@mui/material/styles'
function Header() {
  const theme = useTheme()
  const isDarkTheme = theme.palette.mode === 'dark'

  return (
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
              BruNow.W()
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
                sx={{
                  color: isDarkTheme ? '#fff' : '#000',
                  textDecoration: 'none',
                  cursor: 'pointer',
                  '&:hover': { color: '#0277b5' },
                }}
              >
                About
              </Link>
            </Typography>
            <Typography className="font-montserrat">
              <Link
                sx={{
                  color: isDarkTheme ? '#fff' : '#000',
                  textDecoration: 'none',
                  cursor: 'pointer',
                  '&:hover': { color: '#0277b5' },
                }}
              >
                Education
              </Link>
            </Typography>
            <Typography className="font-montserrat">
              <Link
                sx={{
                  color: isDarkTheme ? '#fff' : '#000',
                  textDecoration: 'none',
                  cursor: 'pointer',
                  '&:hover': { color: '#0277b5' },
                }}
              >
                Experience
              </Link>
            </Typography>
            <Typography className="font-montserrat">
              <Link
                sx={{
                  color: isDarkTheme ? '#fff' : '#000',
                  textDecoration: 'none',
                  cursor: 'pointer',
                  '&:hover': { color: '#0277b5' },
                }}
              >
                Skills
              </Link>
            </Typography>
            <Typography className="font-montserrat">
              <Link
                sx={{
                  color: isDarkTheme ? '#fff' : '#000',
                  textDecoration: 'none',
                  cursor: 'pointer',
                  '&:hover': { color: '#0277b5' },
                }}
              >
                Projects
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
  )
}

export default Header
