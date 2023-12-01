'use client'
import ContentWrapper from '@/ui/ContentWrapper/ContentWrapper'
import { Box, Button, IconButton, Link, Typography } from '@mui/material'
import React, { useState } from 'react'
import { SettingsSuggest } from '@mui/icons-material'
function Header() {
  const [showConfigIsOpen, setShowConfigIsOpen] = useState(false)
  const showConfigOptions = () => {
    setShowConfigIsOpen(!showConfigIsOpen)
  }

  return (
    <ContentWrapper>
      <Box
        sx={{
          height: '100px',
          paddingY: '20px',
          display: 'flex',
        }}
      >
        <Box
          display={'flex'}
          alignItems={'center'}
          justifyContent={'space-between'}
          width={'100%'}
        >
          <Box>Logo</Box>
          <Box display={'flex'} gap={5} alignItems={'center'}>
            <Typography>
              <Link
                sx={{
                  color: '#000',
                  textDecoration: 'none',
                  cursor: 'pointer',
                  '&:hover': { color: '#1976d2' },
                }}
              >
                About
              </Link>
            </Typography>
            <Typography>
              <Link
                sx={{
                  color: '#000',
                  textDecoration: 'none',
                  cursor: 'pointer',
                  '&:hover': { color: '#1976d2' },
                }}
              >
                Education
              </Link>
            </Typography>
            <Typography>
              <Link
                sx={{
                  color: '#000',
                  textDecoration: 'none',
                  cursor: 'pointer',
                  '&:hover': { color: '#1976d2' },
                }}
              >
                Experience
              </Link>
            </Typography>
            <Typography>
              <Link
                sx={{
                  color: '#000',
                  textDecoration: 'none',
                  cursor: 'pointer',
                  '&:hover': { color: '#1976d2' },
                }}
              >
                Skills
              </Link>
            </Typography>
            <Typography>
              <Link
                sx={{
                  color: '#000',
                  textDecoration: 'none',
                  cursor: 'pointer',
                  '&:hover': { color: '#1976d2' },
                }}
              >
                Projects
              </Link>
            </Typography>
            <Button variant="outlined" color="primary">
              Resume
            </Button>
            <IconButton color="primary" onClick={showConfigOptions}>
              <SettingsSuggest />
            </IconButton>
            {showConfigIsOpen && (
              <Box sx={{}}>
                <Typography>AAAAAAAAA</Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </ContentWrapper>
  )
}

export default Header
