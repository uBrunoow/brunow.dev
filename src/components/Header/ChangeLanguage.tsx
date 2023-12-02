import React, { useState } from 'react'
import i18n from '@/utils/Translate'
import { Button } from '@mui/material'

function ChangeLanguage() {
  const [language, setLanguage] = useState('en')

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'pt' : 'en'
    setLanguage(newLanguage)
    i18n.changeLanguage(newLanguage)
  }

  return (
    <Button
      sx={{
        position: 'fixed',
        top: 30,
        right: 100,
        zIndex: '15',
        fontWeight: '800',
      }}
      onClick={toggleLanguage}
    >
      {language === 'en' ? 'PT' : 'EN'}
    </Button>
  )
}

export default ChangeLanguage
