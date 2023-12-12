import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        MyName: 'Hi, I\'m<span style="color: #0277b5;"> Bruno Werner</span>',
        aboutMe:
          'I\'m a front-end and back-end developer trying to improve my skills to become a full-stack developer. I started programming in 2020, learning the basics of <span style="color: #0277b5;"> HTML, CSS, and JS</span>. I evolved a lot by learning about those thecnologies. I\'m evolving a lot more by learning <span style="color: #0277b5;">React, Next.js 13, Node js, UIs, Redux</span> and a lot more about the frameworks. And now, I\'m trying to learn more about OOP applied to <span style="color: #0277b5;">JAVA and Angular</span>.',
        about: 'About',
        education: 'Education',
        experience: 'Experience',
        skills: 'Skills',
        projects: 'Projects',
        me: 'me',
        skillsResume:
          'Skills such as development in specific technologies (e.g., React, TypeScript, Next.js), experience in frameworks (such as React Native and Expo), backend knowledge (Fastify, Express, Prisma), and proficiency in languages ​​such as TypeScript stand out.',
        projectsResume:
          'Throughout my professional journey in the programming field, I have worked on several projects that highlight my ability to transform ideas into reality. Below, I present a brief summary of some of my main projects:',
        experienceResume:
          'My professional career covers the development of various projects, from business websites to e-commerce platforms.',
        since: 'Since',
        developer: 'Developer',
        dev1: 'Development of a website for business control between the company and the employee using Next.js',
        dev2: 'Development of e-commerce websites using certain technologies such as shopify and tray',
        dev3: 'Development of a website to assist in the sale of tickets for gospel events',
        seeCompany: 'See more from the company',
        educationResume:
          'Below highlights my educational journey where I completed secondary education integrated with technical and elementary education.',
      },
    },
    pt: {
      translation: {
        MyName: 'Olá, sou o <span style="color: #0277b5;"> Bruno Werner</span>',
        aboutMe:
          'Sou um desenvolvedor front-end e back-end tentando aprimorar minhas habilidades para me tornar um desenvolvedor full-stack. Comecei a programar em 2020, aprendendo o básico de <span style="color: #0277b5;">HTML, CSS e JS</span>. Evoluí muito aprendendo sobre essas tecnologias. Estou evoluindo ainda mais aprendendo sobre <span style="color: #0277b5;">React, Next.js 13, Node js, UIs, Redux</span> e muitos outros frameworks. E agora estou tentando aprender mais sobre POO aplicado a <span style="color: #0277b5;">JAVA and Angular</span>.',
        about: 'Sobre',
        education: 'Educação',
        experience: 'Experiência',
        skills: 'Habilidades',
        projects: 'Projetos',
        me: 'mim',
        skillsResume:
          'Destacam-se competências como desenvolvimento em tecnologias específicas (por exemplo, React, TypeScript, Next.js), experiência em frameworks (como React Native e Expo), conhecimento em backend (Fastify, Express,Prisma), e proficiência em linguagens como TypeScript.',
        projectsResume:
          'Ao longo da minha jornada profissional no área da programação, tenho trabalhado em diversos projetos que destacam minha habilidade em transformar ideias em realidade. Abaixo, apresento um breve resumo de alguns dos meus principais projetos:',
        experienceResume:
          'Meu percurso profissional abrange o desenvolvimento de diversos projetos, desde websites empresariais até plataformas de e-commerce.',
        since: 'Desde',
        developer: 'Desenvolvedor',
        dev1: 'Desenvolvimento de um site para controle empresarial entre a empresa e o funcionário usando Next.js',
        dev2: 'Desenvolvimento de sites do ramo e-commerce utilizando certas tecnologias como shopify e tray',
        dev3: 'Desenvolvimento de um site com o intuito de auxiliar na venda de ingressos para eventos gospel',
        seeCompany: 'Ver mais da empresa',
        educationResume:
          'Abaixo destacam-se minha jornada educacional aonde alcancei a conclusão do ensino médio integrado ao técnico e ao ensino fundamental.',
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
