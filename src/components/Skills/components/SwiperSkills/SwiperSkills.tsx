import React from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import './styles.css'

// import required modules
import { Autoplay } from 'swiper/modules'

import SassLogo from '@/assets/SkillsLogos/file-type-sass.svg'
import MariaDBLogo from '@/assets/SkillsLogos/mariadb.svg'
import MUILogo from '@/assets/SkillsLogos/material-ui.svg'
import MongoDBLogo from '@/assets/SkillsLogos/mongodb-original-wordmark.svg'
import MySQLLogo from '@/assets/SkillsLogos/mysql-original-wordmark.svg'
import PostgreSQLLogo from '@/assets/SkillsLogos/postgresql-plain-wordmark.svg'
import PythonLogo from '@/assets/SkillsLogos/python.svg'
import SequelizeLogo from '@/assets/SkillsLogos/sequelize.svg'
import ShopifyLogo from '@/assets/SkillsLogos/shopify.svg'
import SQLiteLogo from '@/assets/SkillsLogos/sqlite.svg'
import SwaggerLogo from '@/assets/SkillsLogos/swagger.svg'
import TailwindcssLogo from '@/assets/SkillsLogos/tailwindcss-icon.svg'
import VercelLogo from '@/assets/SkillsLogos/vercel.svg'
import AxiosLogo from '@/assets/SkillsLogos/axios-logo.png'
import ExpoLogo from '@/assets/SkillsLogos/expo-logo.png'
import JwtLogo from '@/assets/SkillsLogos/jwt-logo.svg'
import Image from 'next/image'
import { useTheme } from '@mui/material'

export default function SwiperSkills() {
  const theme = useTheme()
  const isDarkTheme = theme.palette.mode === 'dark'

  return (
    <>
      <Swiper
        slidesPerView={5}
        spaceBetween={10}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide>
          <Image src={SassLogo} alt="" width={150} height={150} />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={MariaDBLogo} alt="" width={150} height={150} />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={MUILogo} alt="" width={150} height={150} />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={MongoDBLogo} alt="" width={150} height={150} />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={MySQLLogo} alt="" width={150} height={150} />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={PostgreSQLLogo} alt="" width={150} height={150} />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={PythonLogo} alt="" width={150} height={150} />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={SequelizeLogo} alt="" width={150} height={150} />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={ShopifyLogo} alt="" width={150} height={150} />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={SQLiteLogo} alt="" width={150} height={150} />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={SwaggerLogo} alt="" width={150} height={150} />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={TailwindcssLogo} alt="" width={150} height={150} />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            width={70}
            height={70}
            src={VercelLogo}
            alt=""
            style={{
              filter: isDarkTheme ? 'invert(1)' : 'invert(0)',
            }}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={AxiosLogo} alt="" width={150} height={150} />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            width={70}
            height={70}
            src={ExpoLogo}
            alt=""
            style={{
              filter: isDarkTheme ? 'invert(1)' : 'invert(0)',
            }}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={JwtLogo} alt="" width={150} height={150} />
        </SwiperSlide>
      </Swiper>
    </>
  )
}
