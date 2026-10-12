import { contact } from '@/content/profile'
import { listedPosts } from '@/content/posts'
import { projects } from '@/content/projects'
import { absoluteUrl, localePath, postPath, siteName } from '@/lib/seo'
import { getTranslations } from 'next-intl/server'

export const dynamic = 'force-static'

/** Plain-Markdown map of the site for language models (llmstxt.org), built from the same content files. */
export async function GET() {
  const t = await getTranslations({ locale: 'pt', namespace: 'Metadata' })
  const lines = [
    `# ${siteName}`,
    '',
    `> ${t('description')}`,
    '',
    'Site em português (padrão) e inglês (/en). Cada artigo do blog é escrito em um só idioma.',
    '',
    '## Páginas',
    '',
    `- [Início](${absoluteUrl('/')}): quem sou, experiência, formação e contato`,
    `- [Projetos](${absoluteUrl(localePath('pt', '/projects'))}): sistemas em produção e projetos de estudo`,
    `- [Blog](${absoluteUrl(localePath('pt', '/blog'))}): artigos técnicos`,
    '',
    '## Artigos',
    '',
    ...listedPosts.map((post) => `- [${post.title}](${absoluteUrl(postPath(post.slug))}): ${post.description}`),
    '',
    '## Projetos',
    '',
    ...projects.map(
      (project) =>
        `- [${project.title}](${absoluteUrl(localePath('pt', `/projects/${project.slug}`))}): ${project.description.pt}`,
    ),
    '',
    '## Contato',
    '',
    `- [GitHub](${contact.github})`,
    `- [LinkedIn](${contact.linkedin})`,
    '',
  ]
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } })
}
