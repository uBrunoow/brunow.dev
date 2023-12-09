import { Box } from '@mui/material'
import React from 'react'

const ContentWrapper = ({ children }: any) => {
  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 20px',
        position: 'relative',
      }}
    >
      {children}
    </Box>
  )
}

export default ContentWrapper
