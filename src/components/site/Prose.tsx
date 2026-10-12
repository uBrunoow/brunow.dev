import type { ReactNode } from 'react'

/** Building blocks for articles written after the redesign. Older posts keep their own markup. */

export function Article({ children }: { children: ReactNode }) {
  return <section className="container article">{children}</section>
}

export function H2({ children }: { children: ReactNode }) {
  return <h2>{children}</h2>
}

export function H3({ children }: { children: ReactNode }) {
  return <h3>{children}</h3>
}

export function P({ children }: { children: ReactNode }) {
  return <p>{children}</p>
}

export function C({ children }: { children: ReactNode }) {
  return <code>{children}</code>
}

export function List({ items, ordered }: { items: ReactNode[]; ordered?: boolean }) {
  const Tag = ordered ? 'ol' : 'ul'
  return (
    <Tag>
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </Tag>
  )
}

export function Code({ title, code }: { title?: string; code: string }) {
  return (
    <figure className="code">
      {title && <figcaption>{title}</figcaption>}
      <pre>
        <code>{code.trim()}</code>
      </pre>
    </figure>
  )
}

export function Note({ children }: { children: ReactNode }) {
  return <aside className="note">{children}</aside>
}

/** Two-column comparison, used for trade-offs. */
export function Compare({
  left,
  right,
}: {
  left: { title: string; items: ReactNode[] }
  right: { title: string; items: ReactNode[] }
}) {
  return (
    <div className="compare">
      {[left, right].map((side) => (
        <div key={side.title}>
          <strong>{side.title}</strong>
          <List items={side.items} />
        </div>
      ))}
    </div>
  )
}
