import AlvaImage from '@/public/alva.png'
import CasaAmarelaImage from '@/public/casa-amarela.png'
import CompreAlvaImage from '@/public/compre-alva.png'
import CrewAiImage from '@/public/crew-ai.png'
import EzstartImage from '@/public/ezstart.png'
import FirefightersImage from '@/public/firefighters.png'
import FlyUpBPOImage from '@/public/flyup-bpo.jpeg'
import IngressoGospelImage from '@/public/ingresso-gospel.png'
import SenaiImage from '@/public/senai.png'
import AlvaSiteDesktop from '@/public/shots/alva-site-d.webp'
import AlvaToolsDesktop from '@/public/shots/alva-tools-d.webp'
import AlvaSiteMobile from '@/public/shots/alva-site-m.webp'
import CompreAlvaDesktop from '@/public/shots/compre-alva-d.webp'
import CompreAlvaMobile from '@/public/shots/compre-alva-m.webp'
import DucktixDesktop from '@/public/shots/ducktix-d.webp'
import EzstartDesktop from '@/public/shots/ezstart-d.webp'
import EzstartMobile from '@/public/shots/ezstart-m.webp'
import FlyUpDesktop from '@/public/shots/flyup-app-d.webp'
import FlyUpMobile from '@/public/shots/flyup-app-m.webp'
import ReceitaDesktop from '@/public/shots/receita-d.webp'
import SmartsafeImage from '@/public/smartsafe.png'
import X1biuDesktop from '@/public/shots/x1biu-d.webp'
import type { StaticImageData } from 'next/image'
import type { Localized, LocalizedList } from './types'

export type ProjectCategory = 'work' | 'personal' | 'study'
export type ProjectCover = 'kanban' | 'chart' | 'queue'
export type ProjectLinkKind = 'site' | 'repo' | 'frontend' | 'backend'

export interface ArchitectureLayer {
  label: Localized
  /** Plain names, or "português|english" when the item needs translating. */
  items: string[]
}

export interface Project {
  slug: string
  title: string
  category: ProjectCategory
  /** Where the project was built (company, school or event). Only set when known. */
  context?: string
  period?: Localized
  role?: Localized
  /** One line for the cards. */
  description: Localized
  /** Paragraphs for the project page. */
  about: LocalizedList
  highlights?: LocalizedList
  stack: string[]
  integrations?: string[]
  architecture?: ArchitectureLayer[]
  /** Real screenshots, framed as a browser and a phone. */
  shots?: { desktop: StaticImageData; mobile?: StaticImageData }
  /** Background behind the framed screenshots. */
  tint?: string
  /** Older screenshot or mockup kept from the previous portfolio. */
  image?: StaticImageData
  gallery?: StaticImageData[]
  /** Drawn cover for internal systems that have no public screenshot. */
  cover?: ProjectCover
  links?: { kind: ProjectLinkKind; url: string }[]
  /** The public site no longer answers. */
  offline?: boolean
  /** Slug of a blog post that goes deeper on this project. */
  relatedPost?: string
  featured?: boolean
  /** Synthetic log lines shown on the home page. Illustrative only, never real data. */
  log?: LocalizedList
}

const layer = (pt: string, en: string, items: string[]): ArchitectureLayer => ({
  label: { pt, en },
  items,
})

export const projects: Project[] = [
  {
    slug: 'compre-alva',
    title: 'Compre Alva',
    category: 'work',
    context: 'Alva',
    featured: true,
    log: {
      pt: ["POST /pedidos 201 vitrine=cliente-a","fila: omie.pedido.incluir","omie 200 OK > faturar"],
      en: ["POST /orders 201 storefront=client-a","queue: omie.order.create","omie 200 OK > invoice"],
    },
    period: { pt: '2026 – atual', en: '2026 – now' },
    role: { pt: 'Desenvolvedor fullstack', en: 'Fullstack developer' },
    description: {
      pt: 'Portal B2B onde clientes e vendedores montam pedidos de atacado, com vitrines por cliente, orçamentos e integração com o Omie.',
      en: 'B2B portal where clients and sales reps build wholesale orders, with per-client storefronts, quotes and Omie integration.',
    },
    about: {
      pt: [
        'O Compre Alva é o canal B2B da Alva Personal Care. Clientes de atacado, vendedores e o time de marketing fazem pedidos por ele, e cada pedido segue integrado ao ERP Omie para ser faturado.',
        'Cada cliente enxerga uma vitrine própria, e a URL carrega o contexto da vitrine. Operadores podem entrar como o cliente para montar o pedido por ele, orçamentos viram checkout e pedidos podem ficar em rascunho até serem finalizados.',
        'A integração com o Omie cobre pedidos, clientes, estoque e produtos, com webhooks, fila de envio com reprocessamento e logs de integração para o time investigar falhas sem depender de mim.',
      ],
      en: [
        'Compre Alva is the B2B channel of Alva Personal Care. Wholesale clients, sales reps and the marketing team place orders through it, and every order flows into the Omie ERP to be invoiced.',
        'Each client sees their own storefront, and the URL carries the storefront context. Operators can act as the client to build an order for them, quotes turn into checkouts and orders can stay as drafts until they are finished.',
        'The Omie integration covers orders, customers, stock and products, with webhooks, a sending queue with replay and integration logs so the team can investigate failures without depending on me.',
      ],
    },
    highlights: {
      pt: [
        'Vitrines por cliente com o contexto na URL e grupos de acesso',
        'Operador montando o pedido em nome do cliente',
        'Orçamentos, rascunhos e espelho do pedido em PDF',
        'Cupons, descontos e itens bonificados enviados na ordem certa para faturar no Omie',
        'Transportadora exigida no checkout e transportadoras próprias por vitrine',
        'Pré-cadastro com validação de CNPJ e carrinho persistido no servidor',
        'Testes end-to-end, testes de carga e changelog do produto',
      ],
      en: [
        'Per-client storefronts with the context in the URL and access groups',
        'Operators building the order on behalf of the client',
        'Quotes, drafts and an order summary exported as PDF',
        'Coupons, discounts and bonus items sent in the right order to invoice in Omie',
        'Required carrier at checkout and custom carriers per storefront',
        'Pre-registration with CNPJ validation and a server-side cart',
        'End-to-end tests, load tests and a product changelog',
      ],
    },
    stack: ['Django', 'Python', 'Next.js', 'React', 'TypeScript'],
    integrations: ['Omie', 'Asaas', 'HubSpot', 'Live Shopping'],
    architecture: [
      layer('Quem usa', 'Who uses it', ['Clientes B2B|B2B clients', 'Vendedores|Sales reps', 'Marketing']),
      layer('Front-end', 'Front end', ['Next.js', 'Vitrines por slug|Storefronts by slug']),
      layer('Back-end', 'Back end', ['API Django|Django API', 'Fila de integração|Integration queue', 'Logs']),
      layer('Integrações', 'Integrations', ['Omie (ERP)', 'Asaas (pagamentos)|Asaas (payments)', 'HubSpot (CRM)', 'Live Shopping']),
    ],
    shots: { desktop: CompreAlvaDesktop, mobile: CompreAlvaMobile },
    tint: '#0B2A6B',
    gallery: [CompreAlvaImage],
    links: [{ kind: 'site', url: 'https://atendimento.comprealva.com.br' }],
  },
  {
    slug: 'alva-tools',
    title: 'Alva Tools',
    category: 'work',
    context: 'Alva',
    featured: true,
    log: {
      pt: ["card movido: conferência > faturar","n8n: nota emitida no omie","zenlog: etiqueta gerada","datafrete: cotação anexada"],
      en: ["card moved: review > invoice","n8n: invoice issued in omie","zenlog: label printed","datafrete: quote attached"],
    },
    period: { pt: '2026 – atual', en: '2026 – now' },
    role: { pt: 'Desenvolvedor fullstack', en: 'Fullstack developer' },
    description: {
      pt: 'Ferramentas internas da Alva, com o fluxo de faturamento que leva cada pedido do Omie à expedição via n8n, Zenlog e DataFrete.',
      en: "Alva's internal tools, including the billing flow that takes every order from Omie to shipping through n8n, Zenlog and DataFrete.",
    },
    about: {
      pt: [
        'O Alva Tools reúne as ferramentas internas que o time da Alva usa no dia a dia: acessos, processos operacionais, dados estratégicos e automações. Construí e mantenho os módulos de faturamento, documentos fiscais e carteirização de clientes.',
        'O módulo principal é o fluxo de faturamento, um kanban que acompanha cada pedido da entrada até a expedição e substituiu planilhas e mensagens soltas. Cada mudança de etapa dispara integrações: ajuste fiscal e liberação de faturamento no Omie, envio para separação pelo n8n, cotação de frete no DataFrete e acompanhamento logístico com a XPM. Quando uma integração falha, o card mostra o erro e permite reprocessar só aquela etapa.',
        'Notas fiscais e XML ficam salvos e disponíveis numa página pública de documentos, um painel de tempos mostra em que etapa os pedidos param e a importação de planilhas de carteirização distribui os clientes entre os vendedores no HubSpot.',
      ],
      en: [
        "Alva Tools gathers the internal tools Alva's team uses every day: access, operational processes, strategic data and automations. I built and maintain the billing, tax documents and client portfolio modules.",
        'The main module is the billing flow, a kanban that follows every order from entry to shipping and replaced spreadsheets and scattered messages. Each stage change triggers integrations: tax adjustment and invoicing release in Omie, picking requests through n8n, freight quotes from DataFrete and logistics tracking with XPM. When an integration fails, the card shows the error and lets you replay just that step.',
        'Invoices and XML files are stored and available on a public documents page, a timing dashboard shows where orders get stuck, and a spreadsheet import assigns client portfolios to sales reps in HubSpot.',
      ],
    },
    highlights: {
      pt: [
        'Kanban de faturamento com bloquear, priorizar e arrastar pedidos',
        'Timeline com auditoria e comentários em cada pedido',
        'Anexos no S3 em qualquer etapa, registrados no histórico',
        'Fila serial para o ajuste fiscal no Omie',
        'Reprocessamento de etapas com erro direto no card',
        'Feature flag para liberar o fluxo novo aos poucos',
        'Página de ajuda que documenta o processo para o time',
      ],
      en: [
        'Billing kanban to block, prioritize and drag orders',
        'Timeline with audit trail and comments on every order',
        'S3 attachments at any stage, recorded in the history',
        'Serial queue for the tax adjustment in Omie',
        'Replay of failed steps straight from the card',
        'Feature flag to roll the new flow out gradually',
        'Help page documenting the process for the team',
      ],
    },
    stack: ['Django', 'Python', 'n8n', 'AWS S3'],
    integrations: ['Omie', 'n8n', 'Zenlog', 'Senior', 'DataFrete', 'XPM', 'HubSpot'],
    architecture: [
      layer('Entrada', 'Input', ['Compre Alva', 'Omie', 'Planilhas|Spreadsheets']),
      layer('Alva Tools', 'Alva Tools', [
        'Kanban de faturamento|Billing kanban',
        'Documentos fiscais|Tax documents',
        'Carteirização|Client portfolios',
        'Anexos S3|S3 attachments',
      ]),
      layer('Automação', 'Automation', ['n8n', 'Fila fiscal|Tax queue', 'Reprocessamento|Replay']),
      layer('Parceiros', 'Partners', ['Zenlog / Senior', 'DataFrete', 'XPM', 'HubSpot']),
    ],
    shots: { desktop: AlvaToolsDesktop },
    tint: '#E8EEF8',
    links: [{ kind: 'site', url: 'https://tools.alvapersonalcare.com.br' }],
    relatedPost: 'automacao-com-n8n',
  },
  {
    slug: 'painel-receita',
    title: 'Painel Receita',
    category: 'work',
    context: 'Alva',
    featured: true,
    log: {
      pt: ["etl: pedidos b2b + b2c","canal atribuído: vendedor","modo tv: atualizado","mcp: consulta respondida"],
      en: ["etl: b2b + b2c orders","channel attributed: sales rep","tv mode: refreshed","mcp: query answered"],
    },
    period: { pt: '2026 – atual', en: '2026 – now' },
    role: { pt: 'Desenvolvedor fullstack', en: 'Fullstack developer' },
    description: {
      pt: 'Painel de receita B2B e B2C com atribuição de canal, projeção de vendas, modo TV e servidor MCP.',
      en: 'B2B and B2C revenue dashboard with channel attribution, sales forecasting, a TV mode and an MCP server.',
    },
    about: {
      pt: [
        'Painel usado pela gestão para acompanhar a receita do varejo e do atacado num lugar só.',
        'Os dados chegam por webhooks do Bling (varejo) e do Omie (atacado), com log de cada evento e rotinas que revalidam os pedidos dos últimos dias. Em cima disso ficam canais de atribuição com agrupadores, projeção de vendas e análises de perdas, descontos e cupons.',
        'Tem um modo TV que alterna entre varejo, atacado e o acumulado, permissões por grupo de usuários e um servidor MCP que expõe os dados do painel para assistentes de IA. O backend foi refatorado em domínios: ERP, Classificação, Realizado e Projeção.',
      ],
      en: [
        'A dashboard leadership uses to follow retail and wholesale revenue in one place.',
        'Data arrives through webhooks from Bling (retail) and Omie (wholesale), with a log for every event and jobs that revalidate the last days of orders. On top of that sit attribution channels with groupings, sales forecasting and analyses of losses, discounts and coupons.',
        'It has a TV mode that rotates between retail, wholesale and the running total, permissions per user group and an MCP server that exposes the dashboard data to AI assistants. The back end was refactored into domains: ERP, Classification, Actuals and Forecast.',
      ],
    },
    highlights: {
      pt: [
        'Atribuição de canal para varejo e atacado com agrupadores',
        'Projeção de vendas usando também o previsto do Omie',
        'Importação e exportação do layout CMC',
        'Visões de perdas, descontos e cupons',
        'Modo TV com rotação entre painéis',
        'Permissões por grupo de usuários',
        'Servidor MCP para consultas por IA',
      ],
      en: [
        'Channel attribution for retail and wholesale with groupings',
        'Sales forecasting that also uses Omie forecasts',
        'Import and export of the CMC layout',
        'Views for losses, discounts and coupons',
        'TV mode rotating between dashboards',
        'Permissions per user group',
        'MCP server for AI queries',
      ],
    },
    stack: ['Django', 'Python', 'Celery'],
    integrations: ['Bling', 'Omie', 'MCP'],
    architecture: [
      layer('Fontes', 'Sources', ['Bling (varejo)|Bling (retail)', 'Omie (atacado)|Omie (wholesale)']),
      layer('Ingestão', 'Ingestion', ['Webhooks', 'Logs de evento|Event logs', 'Tarefas Celery|Celery tasks']),
      layer('Domínios', 'Domains', ['ERP', 'Classificação|Classification', 'Realizado|Actuals', 'Projeção|Forecast']),
      layer('Saídas', 'Outputs', ['Painéis|Dashboards', 'Modo TV|TV mode', 'Exportações|Exports', 'Servidor MCP|MCP server']),
    ],
    shots: { desktop: ReceitaDesktop },
    tint: '#0B2A6B',
    links: [{ kind: 'site', url: 'https://receita.comprealva.com.br' }],
  },
  {
    slug: 'alva-hub',
    title: 'Alva Hub',
    category: 'work',
    context: 'Alva',
    featured: true,
    log: {
      pt: ["webhook pedido.alterado recebido","X-Delivery-ID repetido: ignorado","omie 429 > retry agendado","circuit breaker fechado: 200 OK"],
      en: ["webhook order.updated received","duplicate X-Delivery-ID: skipped","omie 429 > retry scheduled","circuit breaker closed: 200 OK"],
    },
    period: { pt: '2026 – atual', en: '2026 – now' },
    role: { pt: 'Desenvolvedor back-end', en: 'Back-end developer' },
    description: {
      pt: 'Camada de eventos sobre a API do Omie com retry, dead-letter, circuit breaker e idempotência.',
      en: 'Event layer over the Omie API with retries, dead-letter, circuit breaker and idempotency.',
    },
    about: {
      pt: [
        'Serviço que centraliza a comunicação com a API do Omie e entrega os eventos para os outros sistemas da empresa.',
        'Ele foi desenhado para falhar bem: tarefas com limite de tentativas e dead-letter, replay de eventos pelo admin, circuit breaker para quedas da API do Omie, rate limit e token por destino, chave de idempotência e número de sequência em cada entrega.',
        'As filas são isoladas por conta do ERP, então um problema numa conta não trava as outras, e o time recebe um e-mail quando um evento cai na dead-letter.',
      ],
      en: [
        "A service that centralizes communication with the Omie API and delivers events to the company's other systems.",
        'It was designed to fail well: tasks with retry limits and dead-letter, event replay from the admin, a circuit breaker for Omie API outages, rate limits and tokens per destination, an idempotency key and a sequence number on every delivery.',
        "Queues are isolated per ERP account, so a problem in one account doesn't stall the others, and the team gets an email when an event lands in the dead-letter.",
      ],
    },
    highlights: {
      pt: [
        'max_retries e dead-letter em todas as tarefas',
        'Replay de eventos em dead-letter pelo admin',
        'Circuit breaker global para falhas sistêmicas do Omie',
        'Rate limit e token de autenticação por destino',
        'Idempotência (X-Delivery-ID) e sequence_number nas entregas',
        'Filas isoladas por conta do ERP',
      ],
      en: [
        'max_retries and dead-letter on every task',
        'Replay of dead-lettered events from the admin',
        'Global circuit breaker for systemic Omie failures',
        'Rate limit and auth token per destination',
        'Idempotency (X-Delivery-ID) and sequence_number on deliveries',
        'Queues isolated per ERP account',
      ],
    },
    stack: ['Python', 'Django', 'Celery'],
    integrations: ['Omie', 'Webhooks'],
    architecture: [
      layer('Origem', 'Source', ['API do Omie|Omie API']),
      layer('Alva Hub', 'Alva Hub', ['Tarefas Celery|Celery tasks', 'Retry e dead-letter|Retry and dead-letter', 'Circuit breaker']),
      layer('Entrega', 'Delivery', ['Idempotência|Idempotency', 'Sequência|Sequencing', 'Rate limit por destino|Rate limit per destination']),
      layer('Destinos', 'Destinations', ['Sistemas internos via webhook|Internal systems via webhook']),
    ],
    cover: 'queue',
    relatedPost: 'filas-que-falham-bem-celery',
  },
  {
    slug: 'flyup-bpo',
    title: 'FlyUp BPO',
    category: 'work',
    context: 'FlyUp',
    featured: true,
    log: {
      pt: ["upload extrato.ofx","adapter OFX > Transaction[]","rag: categoria sugerida","conciliação pronta"],
      en: ["upload statement.ofx","OFX adapter > Transaction[]","rag: category suggested","reconciliation ready"],
    },
    period: { pt: '2025 – jan 2026', en: '2025 – Jan 2026' },
    role: { pt: 'Responsável técnico', en: 'Technical lead' },
    description: {
      pt: 'SaaS financeiro que importa extratos OFX e Excel e classifica transações com RAG.',
      en: 'Finance SaaS that imports OFX and Excel statements and classifies transactions with RAG.',
    },
    about: {
      pt: [
        'A FlyUp cuida do financeiro de outras empresas. A plataforma substituiu planilhas descentralizadas por um sistema web multi-tenant, em que cada cliente tem seus dados separados.',
        'Fui o único responsável técnico, da arquitetura ao deploy. O sistema importa extratos OFX e planilhas Excel com Pandas, classifica transações com RAG e mostra painéis com previsão de contas a pagar e a receber.',
        'Mantive a infraestrutura na AWS (EC2, RDS e S3) sem time de DevOps e montei pipelines de CI/CD com Jenkins e CircleCI.',
      ],
      en: [
        "FlyUp runs the finances of other companies. The platform replaced scattered spreadsheets with a multi-tenant web system where each client's data is kept apart.",
        'I was the sole technical lead, from architecture to deployment. The system imports OFX statements and Excel sheets with Pandas, classifies transactions with RAG and shows dashboards with payables and receivables forecasts.',
        'I ran the AWS infrastructure (EC2, RDS and S3) without a DevOps team and set up CI/CD pipelines with Jenkins and CircleCI.',
      ],
    },
    highlights: {
      pt: [
        'Importação de extratos OFX e Excel para um modelo único de transação',
        'Classificação automática de transações com RAG',
        'Painéis com previsão de contas a pagar e a receber',
        'Arquitetura multi-tenant',
        'Infraestrutura AWS e CI/CD mantidos por mim',
      ],
      en: [
        'OFX and Excel statements imported into a single transaction model',
        'Automatic transaction classification with RAG',
        'Dashboards with payables and receivables forecasts',
        'Multi-tenant architecture',
        'AWS infrastructure and CI/CD run by me',
      ],
    },
    stack: ['Next.js', 'TypeScript', 'Python', 'Pandas', 'AWS'],
    integrations: ['OFX', 'Excel', 'RAG', 'Jenkins', 'CircleCI'],
    architecture: [
      layer('Entrada', 'Input', ['Extratos OFX|OFX statements', 'Planilhas Excel|Excel sheets']),
      layer('Processamento', 'Processing', ['Python', 'ETL com Pandas|Pandas ETL', 'Classificação com RAG|RAG classification']),
      layer('Plataforma', 'Platform', ['Next.js', 'Multi-tenant', 'Painéis|Dashboards']),
      layer('Infra', 'Infra', ['AWS EC2', 'RDS', 'S3', 'CI/CD']),
    ],
    shots: { desktop: FlyUpDesktop, mobile: FlyUpMobile },
    tint: '#111214',
    gallery: [FlyUpBPOImage],
    links: [{ kind: 'site', url: 'https://app.flyupbpo.com.br' }],
    relatedPost: 'adapter-pattern-importar-extratos-typescript',
  },
  {
    slug: 'ingresso-gospel',
    title: 'Ingresso Gospel',
    category: 'work',
    context: 'Aupi',
    role: { pt: 'Desenvolvedor fullstack', en: 'Fullstack developer' },
    description: {
      pt: 'Venda de ingressos e gestão de eventos para o público gospel, conectando organizadores e participantes.',
      en: 'Ticket sales and event management for the gospel audience, connecting organizers and attendees.',
    },
    about: {
      pt: [
        'Plataforma de venda de ingressos e gestão de eventos voltada ao público gospel, desenvolvida na Aupi.',
        'Organizadores cadastram e gerenciam eventos, e o público compra ingressos com segurança. O sistema foi construído em Next.js e Python para aguentar o tráfego alto de abertura de vendas.',
      ],
      en: [
        'A ticketing and event management platform for the gospel audience, built at Aupi.',
        'Organizers create and manage events, and the audience buys tickets safely. The system was built with Next.js and Python to handle the heavy traffic when sales open.',
      ],
    },
    stack: ['Next.js', 'React', 'TypeScript', 'Python'],
    image: IngressoGospelImage,
    offline: true,
  },
  {
    slug: 'smartsafe',
    title: 'Smartsafe',
    category: 'work',
    role: { pt: 'Desenvolvedor mobile e back-end', en: 'Mobile and back-end developer' },
    description: {
      pt: 'Planos de proteção para celulares e películas, vendidos junto com o aparelho.',
      en: 'Protection plans for phones and screen protectors, sold alongside the device.',
    },
    about: {
      pt: [
        'Plataforma que permite que lojistas ofereçam planos de proteção para celulares e películas no momento da venda do aparelho.',
        'O app foi feito em React Native com Expo, com back-end em Python.',
      ],
      en: [
        'A platform that lets retailers offer protection plans for phones and screen protectors at the moment the device is sold.',
        'The app was built with React Native and Expo, with a Python back end.',
      ],
    },
    stack: ['React Native', 'Expo', 'TypeScript', 'Python'],
    image: SmartsafeImage,
    offline: true,
  },
  {
    slug: 'casa-amarela',
    title: 'Casa Amarela',
    category: 'work',
    context: 'Aupi',
    role: { pt: 'Desenvolvedor fullstack', en: 'Fullstack developer' },
    description: {
      pt: 'Agenda de banho, tosa e consultório veterinário.',
      en: 'Booking for grooming services and a veterinary clinic.',
    },
    about: {
      pt: [
        'Sistema para uma clínica veterinária, desenvolvido na Aupi: agendamento de banho e tosa e gestão do consultório.',
        'Front-end em Next.js e back-end em Python.',
      ],
      en: [
        'A system for a veterinary clinic, built at Aupi: booking for grooming and management of the clinic.',
        'Front end in Next.js and back end in Python.',
      ],
    },
    stack: ['Next.js', 'React', 'TypeScript', 'Python'],
    image: CasaAmarelaImage,
    offline: true,
  },
  {
    slug: 'instituto-senai-dashboards',
    title: 'Instituto SENAI Dashboards',
    category: 'work',
    context: 'Aupi',
    role: { pt: 'Desenvolvedor fullstack', en: 'Fullstack developer' },
    description: {
      pt: 'Gráficos de umidade e temperatura coletados por MQTT e armazenados em Django.',
      en: 'Humidity and temperature charts collected over MQTT and stored in Django.',
    },
    about: {
      pt: [
        'Painel para o Instituto SENAI que mostra leituras de umidade e temperatura de sensores.',
        'As leituras chegam por MQTT, são armazenadas num back-end Django e exibidas em gráficos num front-end Next.js.',
      ],
      en: [
        'A dashboard for Instituto SENAI that shows humidity and temperature readings from sensors.',
        'Readings arrive over MQTT, are stored in a Django back end and shown as charts in a Next.js front end.',
      ],
    },
    stack: ['Next.js', 'TypeScript', 'Django', 'Python'],
    integrations: ['MQTT'],
    architecture: [
      layer('Sensores', 'Sensors', ['Umidade|Humidity', 'Temperatura|Temperature']),
      layer('Mensageria', 'Messaging', ['MQTT']),
      layer('Back-end', 'Back end', ['Django']),
      layer('Front-end', 'Front end', ['Next.js', 'Gráficos|Charts']),
    ],
    image: SenaiImage,
    offline: true,
  },
  {
    slug: 'alva-personal-care',
    title: 'Alva Personal Care',
    category: 'work',
    description: {
      pt: 'E-commerce de cosméticos naturais e produtos de beleza.',
      en: 'E-commerce for natural cosmetics and beauty products.',
    },
    about: {
      pt: [
        'Loja virtual da Alva Personal Care, marca de cosméticos naturais.',
        'Construída sobre a Shopify, com tema e seções em Liquid.',
      ],
      en: [
        'The online store of Alva Personal Care, a natural cosmetics brand.',
        'Built on Shopify, with the theme and sections written in Liquid.',
      ],
    },
    stack: ['Shopify', 'Liquid'],
    shots: { desktop: AlvaSiteDesktop, mobile: AlvaSiteMobile },
    tint: '#C9E6F4',
    gallery: [AlvaImage],
    links: [{ kind: 'site', url: 'https://alvapersonalcare.com.br/' }],
  },
  {
    slug: 'ezstart',
    title: 'EzStart',
    category: 'personal',
    description: {
      pt: 'Guia para quem está começando a desenvolver no Linux.',
      en: 'A starter guide for developers new to Linux.',
    },
    about: {
      pt: [
        'Projeto pessoal para facilitar o primeiro contato de desenvolvedores com o Linux.',
        'A pessoa escolhe as ferramentas que quer usar e recebe os comandos prontos para copiar e instalar tudo.',
      ],
      en: [
        "A personal project to make developers' first steps on Linux easier.",
        'You pick the tools you want and get the commands ready to copy and install everything.',
      ],
    },
    stack: ['Next.js', 'React', 'TypeScript'],
    shots: { desktop: EzstartDesktop, mobile: EzstartMobile },
    tint: '#DDF5EA',
    gallery: [EzstartImage],
    links: [{ kind: 'site', url: 'https://ezstart.vercel.app/' }],
  },
  {
    slug: 'x1biu',
    title: 'x1biu',
    category: 'personal',
    period: { pt: '2026', en: '2026' },
    role: { pt: 'Desenvolvedor fullstack', en: 'Fullstack developer' },
    description: {
      pt: 'Batalha 1 contra 1 de assobios: o microfone capta o pitch e o servidor pontua a afinação em tempo real por WebSocket.',
      en: 'A 1v1 whistling battle: the microphone captures the pitch and the server scores tuning in real time over WebSocket.',
    },
    about: {
      pt: [
        'Um projeto declaradamente inútil: dois jogadores entram na fila, são pareados, a mesma música toca para os dois e cada um assobia acompanhando a melodia. Quem assobiar mais afinado vence e sobe no ranking.',
        'O navegador capta o microfone com a Web Audio API e encontra a frequência do assobio por autocorrelação, sem bibliotecas. Cada frame vai por WebSocket para o Django Channels, que compara com a referência da música em cents, normalizando a oitava, e devolve a pontuação dos dois jogadores ao vivo.',
        'O pareamento roda numa tarefa periódica do Celery Beat, e o histórico de pitch de cada partida fica salvo para desenhar o gráfico depois.',
      ],
      en: [
        'A proudly useless project: two players join a queue, get matched, the same song plays for both and each one whistles along with the melody. Whoever whistles more in tune wins and climbs the ranking.',
        'The browser captures the microphone with the Web Audio API and finds the whistle frequency through autocorrelation, with no libraries. Each frame goes over WebSocket to Django Channels, which compares it with the song reference in cents, normalizing the octave, and sends both players their scores live.',
        'Matchmaking runs in a periodic Celery Beat task, and each match keeps its pitch history to draw the chart afterwards.',
      ],
    },
    highlights: {
      pt: [
        'Detecção de pitch no navegador por autocorrelação, com portão de silêncio e faixa de assobio',
        'Pontuação em cents com normalização de oitava',
        'Partidas em tempo real com Django Channels e WebSocket',
        'Fila e pareamento com Celery Beat e Redis',
        'Ranking global e histórico de partidas com gráfico de pitch',
      ],
      en: [
        'In-browser pitch detection through autocorrelation, with a silence gate and a whistle range',
        'Scoring in cents with octave normalization',
        'Real-time matches with Django Channels and WebSocket',
        'Queue and matchmaking with Celery Beat and Redis',
        'Global ranking and match history with a pitch chart',
      ],
    },
    stack: ['Next.js', 'TypeScript', 'Django', 'Django Channels', 'Celery', 'Redis', 'PostgreSQL'],
    architecture: [
      layer('Navegador', 'Browser', ['Web Audio API', 'Autocorrelação|Autocorrelation', 'Next.js']),
      layer('Tempo real', 'Real time', ['WebSocket', 'Django Channels']),
      layer('Back-end', 'Back end', ['Django + DRF', 'Pontuação em cents|Scoring in cents', 'Celery Beat']),
      layer('Dados', 'Data', ['PostgreSQL', 'Redis']),
    ],
    shots: { desktop: X1biuDesktop },
    tint: '#C4F03A',
    links: [
      { kind: 'site', url: 'https://x1biu.vercel.app' },
      { kind: 'repo', url: 'https://github.com/uBrunoow/x1biu' },
    ],
    relatedPost: 'batalha-de-assobios-pitch-tempo-real',
  },
  {
    slug: 'crew-ai-for-questions',
    title: 'Crew AI for Questions',
    category: 'personal',
    description: {
      pt: 'Agentes CrewAI que geram alternativas erradas plausíveis a partir de uma pergunta e da resposta correta.',
      en: 'CrewAI agents that generate plausible wrong answers from a question and its correct answer.',
    },
    about: {
      pt: [
        'Projeto com agentes de IA para montar questões de múltipla escolha.',
        'A pessoa cadastra a pergunta e a resposta correta, e os agentes do CrewAI geram as alternativas falsas com base nas duas. Roda em Python com Django e Docker.',
      ],
      en: [
        'A project with AI agents to build multiple-choice questions.',
        'You enter the question and the correct answer, and CrewAI agents generate the wrong options based on both. It runs on Python with Django and Docker.',
      ],
    },
    stack: ['Python', 'Django', 'CrewAI', 'Docker'],
    image: CrewAiImage,
    links: [{ kind: 'repo', url: 'https://github.com/uBrunoow/crew-ai-for-questions-app' }],
  },
  {
    slug: 'firefighters-app',
    title: 'Firefighters App',
    category: 'study',
    context: 'SENAI',
    description: {
      pt: 'App e site para o NOAR (Núcleo de Operações Aéreas e Resgate) registrar ocorrências de resgate.',
      en: 'App and site for NOAR (an air operations and rescue unit) to log rescue operations.',
    },
    about: {
      pt: [
        'Projeto do curso técnico no SENAI para o NOAR, o Núcleo de Operações Aéreas e Resgate, automatizar o registro das atividades durante um resgate.',
        'São três partes: um app em React Native para a equipe em campo, um site em Next.js para a gestão e uma API em Python com banco PostgreSQL.',
      ],
      en: [
        'A SENAI technical course project for NOAR, an air operations and rescue unit, to automate the logging of activities during a rescue.',
        'It has three parts: a React Native app for the field team, a Next.js site for management and a Python API with a PostgreSQL database.',
      ],
    },
    stack: ['React Native', 'Next.js', 'TypeScript', 'Python', 'PostgreSQL'],
    architecture: [
      layer('Campo', 'Field', ['App React Native|React Native app']),
      layer('Gestão', 'Management', ['Site Next.js|Next.js site']),
      layer('API', 'API', ['Python']),
      layer('Dados', 'Data', ['PostgreSQL']),
    ],
    image: FirefightersImage,
    links: [
      { kind: 'frontend', url: 'https://github.com/uBrunoow/sa-senai-bombeiros' },
      { kind: 'backend', url: 'https://github.com/uBrunoow/sa-senai-bombeiros-backend' },
    ],
  },
  {
    slug: 'ducktix',
    title: 'Ducktix',
    category: 'study',
    context: 'UDESC',
    period: { pt: '2026', en: '2026' },
    role: { pt: 'Modelagem do banco e desenvolvimento fullstack', en: 'Database modeling and fullstack development' },
    description: {
      pt: 'Plataforma de ingressos com lotes, pedidos, cupons e check-in, modelada em PostgreSQL para Banco de Dados II.',
      en: 'Ticketing platform with batches, orders, coupons and check-in, modeled in PostgreSQL for Databases II.',
    },
    about: {
      pt: [
        'Trabalho da disciplina de Banco de Dados II na UDESC que virou um produto completo: organizadores publicam eventos presenciais, online ou híbridos, vendem ingressos em lotes e fazem o check-in na porta; participantes compram, aplicam cupons e recebem os ingressos.',
        'A entrega cobriu o caminho inteiro do banco: modelo conceitual, modelo lógico com dicionário de dados, DDL e a aplicação usando esse esquema. As regras que não podem ser quebradas, como não vender mais do que existe ou não ter evento online com endereço, ficam em CHECK constraints no PostgreSQL.',
        'A venda trava a linha do lote com SELECT ... FOR UPDATE dentro de uma transação, para que dois compradores disputando a última vaga não passem os dois. Em produção o banco é o Neon, com um driver que mantém a sessão para essas transações.',
      ],
      en: [
        'A Databases II assignment at UDESC that became a complete product: organizers publish in-person, online or hybrid events, sell tickets in batches and check people in at the door; attendees buy, apply coupons and receive their tickets.',
        'The delivery covered the whole database path: conceptual model, logical model with a data dictionary, DDL and the application running on that schema. Rules that cannot be broken, such as never selling more than exists or never having an online event with an address, live in PostgreSQL CHECK constraints.',
        'A sale locks the batch row with SELECT ... FOR UPDATE inside a transaction, so two buyers fighting over the last seat cannot both get through. In production the database is Neon, with a driver that keeps the session open for those transactions.',
      ],
    },
    highlights: {
      pt: [
        'Modelo conceitual, lógico e DDL documentados com o porquê de cada mudança',
        'Regras de negócio como CHECK constraints no banco e no schema do Drizzle',
        'Controle de estoque concorrente com SELECT ... FOR UPDATE',
        'Valores em centavos e datas com fuso horário',
        'Cupons por evento, pagamento simulado e emissão de ingressos com QR Code',
        'Check-in lendo o QR Code pela câmera',
        'Painel do organizador com ocupação e receita por lote',
      ],
      en: [
        'Conceptual model, logical model and DDL documented with the reason for each change',
        'Business rules as CHECK constraints in the database and in the Drizzle schema',
        'Concurrent stock control with SELECT ... FOR UPDATE',
        'Amounts in cents and timezone-aware dates',
        'Per-event coupons, simulated payment and tickets issued with a QR code',
        'Check-in by reading the QR code with the camera',
        'Organizer dashboard with occupancy and revenue per batch',
      ],
    },
    stack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Drizzle ORM', 'Neon'],
    architecture: [
      layer('Quem usa', 'Who uses it', ['Organizadores|Organizers', 'Participantes|Attendees']),
      layer('Aplicação', 'Application', ['Next.js', 'Server actions', 'Drizzle ORM']),
      layer('Banco', 'Database', ['PostgreSQL (Neon)', 'CHECK constraints', 'SELECT ... FOR UPDATE']),
      layer('Serviços', 'Services', ['Vercel Blob', 'Resend (e-mail)', 'QR Code']),
    ],
    shots: { desktop: DucktixDesktop },
    tint: '#F3E7A6',
    links: [
      { kind: 'site', url: 'https://ducktix.vercel.app' },
      { kind: 'repo', url: 'https://github.com/uBrunoow/ducktix' },
    ],
    relatedPost: 'modelagem-postgresql-drizzle-ducktix',
  },
]

export const featuredProjects = projects.filter((project) => project.featured)

export const getProject = (slug: string) => projects.find((project) => project.slug === slug)
