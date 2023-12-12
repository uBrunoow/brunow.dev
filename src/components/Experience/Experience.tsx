import {
  Avatar,
  Box,
  Chip,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material'
import React from 'react'
import AupiLogo from '@/assets/aupi_logo.jpg'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'

interface ExperienceProps {
  colorSchema: string
}

function Experience(props: ExperienceProps) {
  const isSmallScreen = useMediaQuery('(max-width: 768px)')
  const isMinimunScreen = useMediaQuery('(max-width: 430px)')
  const { t } = useTranslation()

  const theme = useTheme()
  const isDarkTheme = theme.palette.mode === 'dark'

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'start',
        justifyContent: 'space-between',
        flexDirection: isSmallScreen ? 'column' : 'row',
        width: '100%',
      }}
    >
      <Box
        width={isSmallScreen ? '100%' : '40%'}
        display={'flex'}
        alignItems={'start'}
        justifyContent={'center'}
        flexDirection={'column'}
        gap={5}
      >
        <Typography
          variant="h3"
          fontFamily={'Montserrat'}
          fontWeight={'500'}
          textAlign={isSmallScreen ? 'center' : 'left'}
          width={'100%'}
          mb={2}
        >
          {t('experience')}
        </Typography>
        <Typography
          variant="body1"
          textAlign={isSmallScreen ? 'center' : 'justify'}
          fontFamily={'Montserrat'}
          fontWeight={'500'}
          mb={5}
        >
          {t('experienceResume')}
        </Typography>
      </Box>
      <Grid width={isSmallScreen ? '100%' : '55%'} container spacing={1}>
        <Grid item xs={12}>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'end',
              flexDirection: 'row-reverse',
            }}
          >
            <Box
              sx={{
                background: props.colorSchema,
                borderRadius: '50%',
                height: '20px',
                width: '20px',
              }}
            />
            <Divider
              sx={{
                width: isMinimunScreen ? '70%' : '80%',
                borderStyle: 'dashed',
                borderColor: isDarkTheme ? '#fff' : '#000',
              }}
              orientation="horizontal"
            />
            <Typography
              variant="h5"
              fontFamily={'Montserrat'}
              fontWeight={'500'}
              textAlign={'left'}
              mb={2}
            >
              2023
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={11}>
          <Box
            sx={{
              width: '100%',
              height: '100%',
              boxShadow: '0px 0px 20px #0000004f',
              display: 'flex',
              alignItems: 'end',
              justifyContent: 'start',
              flexDirection: 'column',
              p: 2,
              position: 'relative',
              borderRadius: '5px',
              transition: 'transform 0.3s ease',
              '&::after': {
                content: '""',
                background: props.colorSchema,
                height: '1%',
                width: '95%',
                mt: 2,
                zIndex: 1,
                transform: 'scale(0)',
                transformOrigin: '100% 0% ',
                transition: 'transform 0.3s ease',
                borderRadius: 2,
              },
              '&:hover::after': {
                transform: 'scale(1.05)',
              },
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'start',
                justifyContent: 'space-between',
                flexDirection: 'row-reverse',
                width: '100%',
              }}
              mb={2}
            >
              <Box>
                <Typography
                  variant="button"
                  fontFamily={'Montserrat'}
                  fontWeight={'500'}
                  textAlign={'left'}
                  mb={2}
                >
                  {t('since')} 25/08/2023
                </Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'start',
                  justifyContent: 'start',
                  flexDirection: 'column',
                }}
              >
                <Image
                  src={AupiLogo}
                  alt=""
                  width={110}
                  height={110}
                  style={{ borderRadius: '10px', marginBottom: 12 }}
                />
                <Box
                  sx={{
                    display: 'flex',
                    gap: '15px',
                    flexDirection: isSmallScreen ? 'column' : 'row',
                  }}
                >
                  <Typography
                    variant="h6"
                    fontFamily={'Montserrat'}
                    fontWeight={'500'}
                    textAlign={isSmallScreen ? 'left' : 'right'}
                    mb={2}
                  >
                    Aupi soluções em TI
                  </Typography>
                  <Chip
                    label={t('seeCompany')}
                    component="a"
                    href="https://www.aupi.com.br/"
                    variant="outlined"
                    target="_blank"
                    clickable
                  />
                </Box>
              </Box>
            </Box>
            <Box>
              <Typography
                variant="body1"
                fontFamily={'Montserrat'}
                textAlign={'left'}
                fontWeight={`600`}
              >
                {t('developer')} Front-end
              </Typography>
              <List sx={{ listStyleType: 'disc' }}>
                <ListItem
                  sx={{
                    transition: 'background .3s ease',
                    '&:hover': {
                      background: isDarkTheme ? '#ffffff20' : '#00000020',
                    },
                  }}
                >
                  <Box
                    sx={{
                      background: isDarkTheme ? '#fff' : '#00000050',
                      height: '40px',
                      width: '.7%',
                      borderRadius: '50px',
                      mr: '7px',
                    }}
                  />
                  <ListItemText
                    sx={{
                      fontFamily: 'Montserrat',
                      fontWeight: '500',
                    }}
                    primary={t('dev1')}
                  />
                </ListItem>
                <ListItem
                  sx={{
                    transition: 'background .3s ease',
                    '&:hover': {
                      background: isDarkTheme ? '#ffffff20' : '#00000020',
                    },
                  }}
                >
                  <Box
                    sx={{
                      background: isDarkTheme ? '#fff' : '#00000050',
                      height: '40px',
                      width: '.7%',
                      borderRadius: '50px',
                      mr: '7px',
                    }}
                  />
                  <ListItemText
                    sx={{
                      fontFamily: 'Montserrat',
                      fontWeight: '500',
                    }}
                    primary={t('dev2')}
                  />
                </ListItem>
                <ListItem
                  sx={{
                    transition: 'background .3s ease',
                    '&:hover': {
                      background: isDarkTheme ? '#ffffff20' : '#00000020',
                    },
                  }}
                >
                  <Box
                    sx={{
                      background: isDarkTheme ? '#fff' : '#00000050',
                      height: '40px',
                      width: '0.5%',
                      borderRadius: '50px',
                      mr: '7px',
                    }}
                  />
                  <ListItemText
                    sx={{
                      fontFamily: 'Montserrat',
                      fontWeight: '500',
                    }}
                    primary={t('dev3')}
                  />
                </ListItem>
              </List>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={1}
          sx={{
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'end',
              flexDirection: 'row-reverse',
            }}
          >
            <Box
              sx={{
                background: isDarkTheme ? '#fff' : '#000',
                height: '500px',
                width: '8%',
                borderRadius: '50px',
                mr: '7px',
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Experience
