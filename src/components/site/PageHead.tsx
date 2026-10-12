import type { ReactNode } from 'react'
import { Marquee } from './Marquee'

/** Top of an inner page: the title huge over a sliding echo of itself. */
export function PageHead({
  eyebrow,
  title,
  lead,
  echo,
  children,
}: {
  eyebrow: string
  title: string
  lead?: string
  echo?: string
  children?: ReactNode
}) {
  return (
    <header className="page-head">
      <Marquee text={echo ?? title} className="page-echo" repeat={3} />
      <div className="wrap page-head-in">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="page-title wide">{title}</h1>
        {lead && <p className="page-lead">{lead}</p>}
        {children}
      </div>
    </header>
  )
}
