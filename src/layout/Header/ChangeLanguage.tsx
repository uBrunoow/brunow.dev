import React, { useState } from 'react'
import i18n from '@/utils/Translate'
import { Box, Button } from '@mui/material'

interface ChangeLanguageProps {
  colorSchema: string
}

function ChangeLanguage(props: ChangeLanguageProps) {
  const [language, setLanguage] = useState('en')

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'pt' : 'en'
    setLanguage(newLanguage)
    i18n.changeLanguage(newLanguage)
  }

  return (
    <Box
      sx={{
        zIndex: '15',
        '& > .colored-btn': {
          color: props.colorSchema,
        },
      }}
    >
      <Button
        sx={{
          fontWeight: '800',
        }}
        onClick={toggleLanguage}
        className="colored-btn"
      >
        {language === 'en' ? 'PT' : 'EN'}
      </Button>
    </Box>
  )
}

export default ChangeLanguage
