import { Box, useMediaQuery } from '@mui/material'
import React from 'react'

const ContentWrapper = ({ children }: any) => {
  const isSmallScreen = useMediaQuery('(max-width: 1024px)')

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '20px',
        position: 'relative',
        overflowX: isSmallScreen ? 'hidden' : 'visible',
      }}
    >
      {children}
    </Box>
  )
}

export default ContentWrapper
