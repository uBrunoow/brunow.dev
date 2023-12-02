'use client'
import React from 'react'
import { Button } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { DarkMode, LightMode } from '@mui/icons-material'

type ChangeThemeProps = {
  onToggle: () => void
}
function ChangeTheme({ onToggle }: ChangeThemeProps) {
  const theme = useTheme()
  const isDarkTheme = theme.palette.mode === 'dark'

  return (
    <Button
      onClick={onToggle}
      sx={{
        position: 'fixed',
        top: 30,
        right: 150,
        zIndex: '12',
      }}
    >
      {isDarkTheme ? <LightMode /> : <DarkMode />}
    </Button>
  )
}

export default ChangeTheme
