import type { ReactNode } from 'react'

interface WinProps {
  title: ReactNode
  children: ReactNode
  status?: ReactNode
  className?: string
  /** Ink title bar with orange text instead of the orange bar. */
  dark?: boolean
  /** Which decorative buttons to draw on the title bar. */
  buttons?: string
  label?: string
  as?: 'section' | 'div' | 'article' | 'aside' | 'li'
}

/** A retro OS window. The title-bar buttons are drawn, not interactive. */
export function Win({ title, children, status, className, dark, buttons = '_□×', label, as: Tag = 'div' }: WinProps) {
  return (
    <Tag className={['win', dark ? 'dark' : '', className].filter(Boolean).join(' ')} aria-label={label}>
      <div className="win-bar">
        <span className="win-title">{title}</span>
        <span className="win-btns" aria-hidden="true">
          {[...buttons].map((b) => (
            <i key={b}>{b}</i>
          ))}
        </span>
      </div>
      {children}
      {status && <div className="win-status">{status}</div>}
    </Tag>
  )
}
