import AlvaLogo from '@/public/alva-logo.png'
import AupiLogo from '@/public/aupi_logo.jpeg'
import CompreAlvaImage from '@/public/compre-alva.png'
import FlyUpLogo from '@/public/flyup-bpo-logo.png'
import type { StaticImageData } from 'next/image'
import type { ProjectCover } from './projects'
import type { Localized, LocalizedList } from './types'

export const contact = {
  email: 'brunowerner7@gmail.com',
  github: 'https://github.com/uBrunoow',
  linkedin: 'https://www.linkedin.com/in/bruno-werner-76a804288/',
}

/** "Who am I?" on the home page. */
export const about: LocalizedList = {
  pt: [
    'Sou desenvolvedor fullstack em Joinville, com mais de 4 anos construindo software para empresas em operação. Trabalho com Next.js e Python/Django, e a parte que mais gosto é ligar sistemas: ERP, CRM, transportadora e pagamento conversando sem ninguém redigitar nada.',
    'Cuido do projeto de ponta a ponta, da modelagem do banco e da arquitetura na AWS até a tela que o time usa todo dia. Quando algo falha em produção, quero que o log conte o que aconteceu e que o sistema saiba tentar de novo.',
    'Fora do código: música, academia, vôlei e basquete.',
  ],
  en: [
    "I'm a fullstack developer in Joinville, Brazil, with over 4 years building software for companies in operation. I work with Next.js and Python/Django, and the part I like most is connecting systems: ERP, CRM, carriers and payments talking without anyone retyping a thing.",
    'I own projects end to end, from database modelling and AWS architecture to the screen the team uses every day. When something fails in production, I want the log to say what happened and the system to know how to try again.',
    'Outside of code: music, the gym, volleyball and basketball.',
  ],
}

export const skills = [
  'Next.js',
  'React',
  'TypeScript',
  'Python',
  'Django',
  'Celery',
  'PostgreSQL',
  'AWS',
  'n8n',
  'Omie',
  'HubSpot',
  'React Native',
]

export interface Service {
  word: Localized
  title: Localized
  description: Localized
  tags: string[]
  image?: StaticImageData
  cover?: ProjectCover
}

export const services: Service[] = [
  {
    word: { pt: 'Integrar', en: 'Integrate' },
    title: { pt: 'Integrações e filas', en: 'Integrations and queues' },
    description: {
      pt: 'ERP, CRM, transportadoras e pagamentos conversando com retry, dead-letter, idempotência e logs que alguém consegue ler.',
      en: 'ERP, CRM, carriers and payments talking to each other with retries, dead-letter, idempotency and logs a person can read.',
    },
    tags: ['Omie', 'Bling', 'HubSpot', 'Celery'],
    cover: 'queue',
  },
  {
    word: { pt: 'Automatizar', en: 'Automate' },
    title: { pt: 'Fluxos operacionais', en: 'Operational flows' },
    description: {
      pt: 'Telas internas que levam o pedido do faturamento à expedição, com histórico, anexos e reprocessamento quando uma etapa falha.',
      en: 'Internal tools that move an order from invoicing to shipping, with history, attachments and replay when a step fails.',
    },
    tags: ['n8n', 'Kanban', 'S3', 'Zenlog'],
    cover: 'kanban',
  },
  {
    word: { pt: 'Construir', en: 'Build' },
    title: { pt: 'Portais B2B e e-commerce', en: 'B2B portals and e-commerce' },
    description: {
      pt: 'Vitrines por cliente, orçamentos, carrinho que não se perde e checkout com regras de frete e pagamento.',
      en: "Per-client storefronts, quotes, carts that don't get lost and checkout with shipping and payment rules.",
    },
    tags: ['Next.js', 'Django', 'Asaas', 'Shopify'],
    image: CompreAlvaImage,
  },
  {
    word: { pt: 'Medir', en: 'Measure' },
    title: { pt: 'Dados e painéis', en: 'Data and dashboards' },
    description: {
      pt: 'Painéis de receita com atribuição de canal e projeção, ETL de dados financeiros e IA aplicada à classificação.',
      en: 'Revenue dashboards with channel attribution and forecasting, financial data ETL and AI applied to classification.',
    },
    tags: ['Pandas', 'Next.js', 'MCP', 'RAG'],
    cover: 'chart',
  },
]

export interface Job {
  company: string
  url: string
  logo: StaticImageData
  current?: boolean
  /** Short span for the credits receipt. */
  years: string
  role: Localized
  period: Localized
  highlights: LocalizedList
}

export const jobs: Job[] = [
  {
    company: 'Alva Personal Care',
    url: 'https://alvapersonalcare.com.br',
    logo: AlvaLogo,
    current: true,
    years: '2026–',
    role: { pt: 'Desenvolvedor Fullstack Pleno', en: 'Mid-level Fullstack Developer' },
    period: { pt: 'fev 2026 – atual', en: 'Feb 2026 – now' },
    highlights: {
      pt: [
        'Construí o Compre Alva, portal B2B com vitrines por cliente, orçamentos, cupons e pagamento via Asaas',
        'Desenhei o fluxo de faturamento do Alva Tools, um kanban integrado a Omie, n8n, Zenlog e DataFrete',
        'Criei a camada de eventos sobre a API do Omie, com retry, dead-letter, circuit breaker e filas isoladas por conta',
        'Entreguei o Painel Receita, com atribuição de canal B2B e B2C, modo TV e servidor MCP',
        'Automatizei a carteirização de clientes e as fases de CS no HubSpot',
      ],
      en: [
        'Built Compre Alva, a B2B portal with per-client storefronts, quotes, coupons and Asaas payments',
        'Designed the Alva Tools billing flow, a kanban integrated with Omie, n8n, Zenlog and DataFrete',
        'Created the event layer over the Omie API, with retries, dead-letter, circuit breaker and per-account queues',
        'Shipped Painel Receita, with B2B and B2C channel attribution, a TV mode and an MCP server',
        'Automated client portfolio assignment and CS stages in HubSpot',
      ],
    },
  },
  {
    company: 'FlyUp BPO',
    url: 'https://app.flyupbpo.com.br',
    logo: FlyUpLogo,
    years: '2025',
    role: { pt: 'Desenvolvedor Fullstack Pleno', en: 'Mid-level Fullstack Developer' },
    period: { pt: '2025 – jan 2026', en: '2025 – Jan 2026' },
    highlights: {
      pt: [
        'Fui o único responsável técnico da plataforma, da arquitetura ao deploy',
        'Troquei planilhas descentralizadas por um sistema web multi-tenant em Next.js e Python',
        'Escrevi o ETL de extratos OFX e Excel com Pandas e mantive a AWS (EC2, RDS, S3)',
        'Classifiquei transações automaticamente com RAG',
      ],
      en: [
        'Sole technical lead for the platform, from architecture to deployment',
        'Replaced scattered spreadsheets with a multi-tenant web system in Next.js and Python',
        'Wrote the OFX and Excel statement ETL with Pandas and ran AWS (EC2, RDS, S3)',
        'Classified transactions automatically with RAG',
      ],
    },
  },
  {
    company: 'Aupi Soluções em TI',
    url: 'https://aupi.com.br',
    logo: AupiLogo,
    years: '2023–24',
    role: { pt: 'Desenvolvedor Fullstack Júnior', en: 'Junior Fullstack Developer' },
    period: { pt: 'ago 2023 – dez 2024', en: 'Aug 2023 – Dec 2024' },
    highlights: {
      pt: [
        'Entreguei sistemas de venda de ingressos e de clínicas veterinárias em Next.js e Python',
        'Construí apps React Native com geolocalização em segundo plano',
        'Integrei lojas Shopify e Tray a ferramentas externas',
        'Criei um pacote Node interno e templates para iniciar projetos mais rápido',
      ],
      en: [
        'Shipped ticketing and veterinary clinic systems in Next.js and Python',
        'Built React Native apps with background geolocation',
        'Integrated Shopify and Tray stores with external tools',
        'Created an internal Node package and templates to start projects faster',
      ],
    },
  },
]

export interface Education {
  school: string
  name: Localized
  course: Localized
  period: Localized
  /** Still enrolled. */
  current?: boolean
  place?: Localized
  about: Localized
  focus: LocalizedList
  /** Coursework that is public: projects, decks and repositories. */
  work: { label: Localized; url: string; internal?: boolean }[]
}

export const education: Education[] = [
  {
    school: 'UDESC',
    name: { pt: 'Universidade do Estado de Santa Catarina', en: 'Santa Catarina State University' },
    course: {
      pt: 'Tecnologia em Análise e Desenvolvimento de Sistemas',
      en: 'Technology in Systems Analysis and Development',
    },
    period: { pt: '2024/1 – 2027/2', en: '2024/1 – 2027/2' },
    current: true,
    place: { pt: 'Centro de Ciências Tecnológicas (CCT), Joinville', en: 'Center for Technological Sciences (CCT), Joinville' },
    about: {
      pt: 'Graduação tecnológica na universidade pública estadual de Santa Catarina. O curso cobre o ciclo completo do software, da programação e dos bancos de dados à arquitetura, à integração de serviços e à gestão de projetos.',
      en: "Technology degree at Santa Catarina's public state university. The course covers the full software cycle, from programming and databases to architecture, service integration and project management.",
    },
    focus: {
      pt: [
        'Engenharia de Software e Metodologias Ágeis',
        'Arquitetura de Sistemas e Integração de Serviços',
        'Análise de Dados e Inteligência Artificial',
      ],
      en: [
        'Software Engineering and Agile Methodologies',
        'Systems Architecture and Service Integration',
        'Data Analysis and Artificial Intelligence',
      ],
    },
    work: [
      { label: { pt: 'Ducktix, Banco de Dados II (PostgreSQL)', en: 'Ducktix, Databases II (PostgreSQL)' }, url: '/projects/ducktix', internal: true },
      { label: { pt: 'Seminário: Serverless', en: 'Seminar: Serverless' }, url: 'https://serverless-soft.vercel.app' },
      { label: { pt: 'Seminário: Educação a Distância no Brasil', en: 'Seminar: Distance Education in Brazil' }, url: 'https://educacao-a-distancia.vercel.app' },
      { label: { pt: 'Artigo: Adapter Pattern', en: 'Article: Adapter Pattern' }, url: '/blog/adapter-pattern-importar-extratos-typescript', internal: true },
      { label: { pt: 'Trabalhos em C: algoritmos de ordenação', en: 'C coursework: sorting algorithms' }, url: 'https://github.com/uBrunoow/sorting-algorithms' },
    ],
  },
  {
    school: 'SESI/SENAI',
    name: { pt: 'Serviço Nacional de Aprendizagem Industrial', en: 'National Service for Industrial Training' },
    course: { pt: 'Técnico em Desenvolvimento de Sistemas', en: 'Systems Development Technician' },
    period: { pt: '2021/1 – 2023/2', en: '2021/1 – 2023/2' },
    about: {
      pt: 'Curso técnico com foco prático. No SENAI o aprendizado é organizado em situações de aprendizagem: projetos aplicados a problemas reais, que foram meu primeiro contato com sistemas completos, do banco ao app.',
      en: 'A hands-on technical course. At SENAI learning is organized around learning situations: projects applied to real problems, which were my first contact with complete systems, from database to app.',
    },
    focus: {
      pt: ['Lógica de Programação e Estruturas de Dados', 'Desenvolvimento de Aplicações Web e Mobile', 'Banco de Dados e SQL'],
      en: ['Programming Logic and Data Structures', 'Web and Mobile Application Development', 'Databases and SQL'],
    },
    work: [
      { label: { pt: 'Firefighters App, app e site para o NOAR', en: 'Firefighters App, app and site for NOAR' }, url: '/projects/firefighters-app', internal: true },
    ],
  },
]
