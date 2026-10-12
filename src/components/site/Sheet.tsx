import type { ReactNode } from 'react'
import { type TornSide, tornClip } from './torn'

interface SheetProps {
  torn?: TornSide
  seed?: number
  className?: string
  paperClassName?: string
  children: ReactNode
}

/** A sheet of grid paper with torn edges and a lighter fibre rim behind them. */
export function Sheet({ torn = 'both', seed = 1, className, paperClassName, children }: SheetProps) {
  return (
    <div className={['sheet', `torn-${torn}`, className].filter(Boolean).join(' ')}>
      <div className="rim" style={{ clipPath: tornClip(torn, seed + 101, 24) }} aria-hidden="true" />
      <div className={['paper', paperClassName].filter(Boolean).join(' ')} style={{ clipPath: tornClip(torn, seed, 18) }}>
        {children}
      </div>
    </div>
  )
}
