import ContentWrapper from '@/ui/ContentWrapper/ContentWrapper'
import { Box, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import testeImage from '@/assets/teste.png'

function Projects() {
  return (
    <ContentWrapper>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'start',
          justifyContent: 'space-between',
          flexDirection: 'column',
        }}
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
              textAlign={'justify'}
              mb={2}
            >
              Projects
            </Typography>
            <Typography
              variant="body1"
              textAlign={'justify'}
              className="font-montserrat"
              mb={5}
            >
              Ao longo da minha jornada profissional no área da programação,
              tenho trabalhado em diversos projetos que destacam minha
              habilidade em transformar ideias em realidade. Abaixo, apresento
              um breve resumo de alguns dos meus principais projetos:
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '50px',
            flexDirection: 'row',
            width: '100%',
          }}
        >
          <Box
            sx={{
              boxShadow: '0px 0px 20px #0000004f',
              p: 2,
              display: 'flex',
              alignItems: 'start',
              justifyContent: 'center',
              flexDirection: 'row',
              gap: '15px',
              width: '100%',
              borderRadius: 2,
              position: 'relative',
              zIndex: 3,
            }}
          >
            <Image src={testeImage} width={700} alt="" />
            <Box sx={{ width: '100%' }}>
              <Typography>aaaaaaaaaaaa</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </ContentWrapper>
  )
}

export default Projects
