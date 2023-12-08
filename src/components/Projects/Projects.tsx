'use client'
import ContentWrapper from '@/ui/ContentWrapper/ContentWrapper'
import { Box, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import { ProjectsText } from './utils/ProjectsText'

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
          width={'75%'}
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
            flexDirection: 'column',
            width: '100%',
          }}
        >
          {ProjectsText.map((project, index) => (
            <Box
              key={index}
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
                height: '300px',
              }}
            >
              <Image
                src={project.img}
                alt=""
                style={{
                  width: '75%',
                  borderRadius: '8px',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'start',
                  justifyContent: 'space-between',
                  flexDirection: 'column',
                  height: '100%',
                }}
              >
                <Box>
                  <Typography variant="h5" fontWeight={'bold'}>
                    {project.name}
                  </Typography>
                  <Typography variant="body1">{project.desc}</Typography>
                </Box>
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                  }}
                >
                  <Box
                    sx={{
                      width: '70%',
                      display: 'flex',
                      alignItems: 'start',
                      justifyContent: 'start',
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      gap: '5px',
                    }}
                  >
                    {project.tech_stack.map((tech, index) => (
                      <Box
                        key={index}
                        sx={{
                          background: 'red',
                          paddingX: '10px',
                          paddingY: '5px',
                          borderRadius: '50px',
                        }}
                      >
                        <Typography variant="body1">{tech.name}</Typography>
                      </Box>
                    ))}
                  </Box>
                  <Typography variant="body1">LINK GITHUB</Typography>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </ContentWrapper>
  )
}

export default Projects
