import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        MyName: "Hi, I'm Bruno Werner",
        aboutMe:
          'I\'m a front-end and back-end developer trying to improve my skills to become a full-stack developer. I started programming in 2020, learning the basics of HTML, CSS, and JS. I evolved a lot learning about <span style="color: #0277b5;">HTML, CSS and JS</span>. I\'m evolving a lot more learning <span style="color: #0277b5;">React, Next.js 13, Node js, UIs, Redux</span> and a lot more about the frameworks. And now, I\'m trying to learn more about POO applied to <span style="color: #0277b5;">JAVA and Angular</span>.',
        about: 'About',
        education: 'Education',
        experience: 'Experience',
        skills: 'Skills',
        projects: 'Projects',
        me: 'me',
      },
    },
    pt: {
      translation: {
        MyName: 'Olá, sou o Bruno Werner',
        aboutMe:
          'Sou um desenvolvedor front-end e back-end tentando aprimorar minhas habilidades para me tornar um desenvolvedor full-stack. Comecei a programar em 2020, aprendendo o básico de HTML, CSS e JS. Evoluí muito aprendendo sobre <span style="color: #0277b5;">HTML, CSS and JS</span>. Estou evoluindo ainda mais aprendendo sobre <span style="color: #0277b5;">React, Next.js 13, Node js, UIs, Redux</span> e muitos outros frameworks. E agora estou tentando aprender mais sobre POO aplicado a <span style="color: #0277b5;">JAVA and Angular</span>.',
        about: 'Sobre',
        education: 'Educação',
        experience: 'Experiência',
        skills: 'Habilidades',
        projects: 'Projetos',
        me: 'mim',
      },
    },
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
