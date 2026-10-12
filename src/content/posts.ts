import type { Locale, Localized } from './types'

export interface Post {
  slug: string
  /** Language the article is written in. */
  lang: Locale
  date: string
  /** One word set large on the post's cover. */
  term: string
  title: string
  description: string
  readingMinutes: number
  /** Shorter <title> for search results (≤ 60 characters); the page keeps the full title. */
  seoTitle?: string
  /** Shorter meta description (≤ 160 characters) when the card description runs long. */
  seoDescription?: string
  /** Last meaningful revision (YYYY-MM-DD), for dateModified and the sitemap. */
  updated?: string
  /** Kept online but left out of listings: off the site's positioning. */
  hidden?: boolean
}

export const posts: Post[] = [
  {
    slug: 'filas-que-falham-bem-celery',
    lang: 'pt',
    date: '2026-10-09',
    term: 'Filas',
    title: 'Filas que falham bem: retry, dead-letter, circuit breaker e idempotência com Celery',
    description:
      'As decisões por trás de uma camada de eventos sobre a API de um ERP: o que tentar de novo, o que desistir, quando parar de chamar e como garantir que nada aconteça duas vezes.',
    seoTitle: 'Filas que falham bem: retry, DLQ e idempotência no Celery',
    seoDescription:
      'Retry, dead-letter, circuit breaker e idempotência com Celery: as decisões por trás de uma camada de eventos sobre a API de um ERP.',
    readingMinutes: 7,
  },
  {
    slug: 'automacao-com-n8n',
    lang: 'pt',
    date: '2026-10-04',
    term: 'n8n',
    title: 'Automação com n8n: onde ele brilha e onde eu prefiro escrever código',
    description:
      'Gatilhos, nós e ações; o que o n8n faz bem; e o critério que uso no dia a dia para decidir se uma integração vira um fluxo no n8n ou código no back-end.',
    seoTitle: 'n8n ou código? Onde a automação com n8n brilha',
    readingMinutes: 5,
  },
  {
    slug: 'modelagem-postgresql-drizzle-ducktix',
    lang: 'pt',
    date: '2026-09-28',
    term: 'SQL',
    title: 'Do modelo relacional ao app: regras de negócio no PostgreSQL com Drizzle',
    description:
      'Como modelei o Ducktix para Banco de Dados II: convenções, CHECK constraints como regra de negócio e o SELECT FOR UPDATE que impede vender mais ingressos do que existem.',
    seoTitle: 'Regras de negócio no PostgreSQL com Drizzle ORM',
    seoDescription:
      'Como modelei o Ducktix: convenções, CHECK constraints como regra de negócio e SELECT FOR UPDATE para não vender ingressos a mais.',
    readingMinutes: 6,
  },
  {
    slug: 'serverless-na-pratica',
    lang: 'pt',
    date: '2026-09-23',
    term: 'λ',
    title: 'Serverless na prática: como um evento vira resposta, e quando não usar',
    description:
      'O que é serverless de verdade, o caminho de uma requisição sem servidor provisionado, dois exemplos com AWS Lambda e os cenários em que um servidor comum ainda ganha.',
    seoTitle: 'Serverless na prática: como funciona e quando não usar',
    seoDescription:
      'O que é serverless de verdade, o caminho de uma requisição, dois exemplos com AWS Lambda e quando um servidor comum ainda ganha.',
    readingMinutes: 5,
  },
  {
    slug: 'batalha-de-assobios-pitch-tempo-real',
    lang: 'pt',
    date: '2026-09-14',
    term: 'Hz',
    title: 'Batalha de assobios: detectando pitch no navegador e pontuando em tempo real',
    description:
      'Como o x1biu capta o assobio pelo microfone com a Web Audio API, encontra a frequência por autocorrelação e compara com a música em cents, via WebSocket.',
    seoTitle: 'Detectando pitch de assobio no navegador em tempo real',
    readingMinutes: 6,
    hidden: true,
  },
  {
    slug: 'educacao-a-distancia-no-brasil',
    lang: 'pt',
    date: '2026-09-06',
    term: 'EaD',
    title: 'Uma plataforma não é uma educação: notas sobre EaD no Brasil',
    description:
      'Do curso por correspondência às plataformas digitais: o que a pesquisa para um seminário na UDESC me mostrou sobre educação a distância, e o que isso diz para quem constrói software.',
    seoTitle: 'Uma plataforma não é uma educação: EaD no Brasil',
    seoDescription:
      'Do curso por correspondência às plataformas digitais: o que pesquisar EaD no Brasil me ensinou sobre construir software educacional.',
    readingMinutes: 4,
    hidden: true,
  },
  {
    slug: 'adapter-pattern-importar-extratos-typescript',
    lang: 'pt',
    date: '2026-10-11',
    term: 'Adapter',
    title:
      'Adapter Pattern na prática: importando extratos OFX, Excel e PDF com um único contrato em TypeScript',
    description:
      'Como o padrão Adapter (GoF) permite importar extratos bancários em formatos diferentes para um modelo único de transação, sem mexer nas regras de negócio a cada formato novo.',
    seoTitle: 'Adapter Pattern em TypeScript: importando OFX, Excel e PDF',
    seoDescription:
      'Como o padrão Adapter (GoF) importa extratos OFX, Excel e PDF para um único modelo de transação sem mexer nas regras de negócio.',
    readingMinutes: 6,
  },
  {
    slug: 'builder-requestbuilder-typescript',
    lang: 'en',
    date: '2026-01-09',
    term: 'Builder',
    title:
      'Using the Builder Pattern to create API calls with a RequestBuilder in TypeScript',
    description:
      'A pragmatic approach to standardize HTTP calls in modern apps (React/Next.js/BFF), separating request construction (RequestBuilder) from execution (Axios, retry, token refresh).',
    seoTitle: 'Builder Pattern in TypeScript: a RequestBuilder for APIs',
    seoDescription:
      'A pragmatic way to standardize HTTP calls in React and Next.js: a RequestBuilder builds the request, Axios runs it with retry and token refresh.',
    readingMinutes: 7,
  },
  {
    slug: 'deploy-using-ci-cd-tools-aws-vercel',
    lang: 'en',
    date: '2025-05-10',
    term: 'CI / CD',
    title:
      'How to Deploy Applications Using CI/CD with CircleCI on AWS and Vercel',
    description:
      'Set up a CI/CD pipeline using AWS and Vercel for seamless deployment, with the essential steps and practices for automating the process.',
    seoTitle: 'CI/CD with CircleCI: deploying to AWS and Vercel',
    readingMinutes: 9,
  },
  {
    slug: 'grafana-prometheus-loki-django-docker',
    lang: 'en',
    date: '2024-11-12',
    term: 'Loki',
    title:
      'How to use Grafana, Prometheus and Loki in Django for a better debug in your applications using Docker Compose',
    description:
      'Integrate Grafana, Prometheus and Loki into Django projects to improve monitoring and debugging, configured in a Docker Compose environment.',
    seoTitle: 'Grafana, Prometheus and Loki for Django with Docker Compose',
    readingMinutes: 6,
  },
]

export const getPost = (slug: string) => posts.find((post) => post.slug === slug)

/** Posts shown in listings, newest first. */
export const listedPosts = posts.filter((post) => !post.hidden).sort((a, b) => b.date.localeCompare(a.date))

export const languageName: Record<Locale, Localized> = {
  pt: { pt: 'Português', en: 'Portuguese' },
  en: { pt: 'Inglês', en: 'English' },
}
