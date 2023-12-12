import ContentWrapper from '@/ui/ContentWrapper/ContentWrapper'
import { Android } from '@mui/icons-material'
import { Box, Divider, Typography } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { EducationText } from './utils/EducationText'

interface EducationProps {
  colorSchema: string
}

function Education(props: EducationProps) {
  const { t } = useTranslation()

  return (
    <ContentWrapper>
      <Typography
        variant="h3"
        className="font-montserrat"
        textAlign={'center'}
        mb={2}
      >
        {t('education')}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        <Typography
          variant="body1"
          textAlign={'center'}
          className="font-montserrat"
          mb={5}
          maxWidth={700}
        >
          {t('educationResume')}
        </Typography>
      </Box>
      <Box
        sx={{
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: '43px',
        }}
      >
        {EducationText.map((education, index) => (
          <Box
            key={index}
            sx={{
              width: '400px',
              height: '400px',
              boxShadow: '0px 0px 20px #0000004f',
              position: 'relative',
              borderRadius: 2,
              zIndex: 3,
              p: 3,
              overflow: 'hidden',
              transition: 'transform 0.3s ease',
              '&::after': {
                content: '""',
                background: props.colorSchema,
                height: 30,
                width: '76%',
                position: 'absolute',
                left: '12%',
                bottom: -12,
                transform: 'scale(0)',
                transformOrigin: '50% 100%',
                transition: 'transform 0.3s ease',
                zIndex: 2,
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
                position: 'relative',
                zIndex: 5,
              }}
            >
              <Box
                sx={{
                  my: '12px',
                }}
              >
                {React.createElement(education.icon, {
                  fontSize: 'large',
                  htmlColor: props.colorSchema,
                })}
                <Divider
                  sx={{
                    my: '12px',
                  }}
                />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'start',
                  justifyContent: 'start',
                  flexDirection: 'column',
                  gap: '12px',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'start',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    width: '100%',
                  }}
                >
                  <Typography
                    variant="button"
                    className="font-montserrat"
                    color={'#00000050'}
                  >
                    {t('since')} {education.since}
                  </Typography>
                  <Typography
                    variant="button"
                    className="font-montserrat"
                    color={'#00000050'}
                  >
                    {education.city}/{education.uf}
                  </Typography>
                </Box>
                <Typography
                  fontWeight={'700'}
                  variant="h5"
                  className="font-montserrat"
                >
                  {education.school}
                </Typography>
                {education.course.map((cours, index) => (
                  <Box
                    key={index}
                    sx={{
                      width: '100%',
                      display: 'flex',
                      transition: 'background .3s ease',
                      px: 1,
                      py: '10px',
                      '&:hover': {
                        background: '#00000020',
                      },
                    }}
                  >
                    <Box
                      sx={{
                        background: '#0000007b',
                        height: '30px',
                        width: '.5%',
                        borderRadius: '50px',
                        mr: '7px',
                      }}
                    />
                    <Typography
                      className="font-montserrat"
                      textAlign={'left'}
                      variant="body1"
                    >
                      {cours}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>

            <Box
              sx={{
                position: 'absolute',
                width: '100%',
                height: '40px',
                top: -30,
                right: 0,
                background: props.colorSchema,
                opacity: 0.5,
                zIndex: 4,
              }}
            />
          </Box>
        ))}
      </Box>
    </ContentWrapper>
  )
}

export default Education
