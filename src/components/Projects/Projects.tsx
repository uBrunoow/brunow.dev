import ContentWrapper from '@/ui/ContentWrapper/ContentWrapper'
import { Box, Paper, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import testeImage from '../../assets/teste.png'

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
              p: 4,
              display: 'flex',
              alignItems: 'start',
              justifyContent: 'center',
              flexDirection: 'row',
              gap: '35px',
              width: '100%',
              borderRadius: 2,
              position: 'relative',
              zIndex: 3,
              height: '400px',
            }}
          >
            <Paper
              sx={{
                backgroundImage: `url(/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fteste.adb88ddf.png&w=3840&q=75)`,
                backgroundSize: 'cover',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                backgroundPosition: 'center center',
                alignItems: 'center',
                width: '100%',
                borderRadius: 2,
              }}
            />
            <Box sx={{ width: '100%' }}>
              <Typography variant="h5" fontWeight={'bold'}>
                Nome do projeto
              </Typography>
              <Typography variant="body1">Pequena desc</Typography>
              <Typography variant="body1">Tecnologias utilizadas</Typography>
              <Typography variant="body1">LINK GITHUB</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </ContentWrapper>
  )
}

export default Projects
