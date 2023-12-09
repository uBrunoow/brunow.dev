'use client'
import React from 'react'
import { Box, Button } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { DarkMode, LightMode } from '@mui/icons-material'

type ChangeThemeProps = {
  onToggle: () => void
  colorSchema: string
}
function ChangeTheme(props: ChangeThemeProps) {
  const theme = useTheme()
  const isDarkTheme = theme.palette.mode === 'dark'

  return (
    <Box
      sx={{
        '& > .colored-btn': {
          color: props.colorSchema,
        },
      }}
    >
      <Button
        onClick={props.onToggle}
        sx={{
          position: 'fixed',
          top: 30,
          right: 150,
          zIndex: '12',
        }}
        className="colored-btn"
      >
        {isDarkTheme ? <LightMode /> : <DarkMode />}
      </Button>
    </Box>
  )
}

export default ChangeTheme
