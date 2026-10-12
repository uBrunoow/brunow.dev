interface MarqueeProps {
  text: string
  className?: string
  /** How many copies fill one half of the track. */
  repeat?: number
  reverse?: boolean
}

/** Giant extended type sliding sideways. Decorative: the same words exist as real text nearby. */
export function Marquee({ text, className, repeat = 2, reverse }: MarqueeProps) {
  const copies = Array.from({ length: repeat * 2 }, (_, i) => i)
  return (
    <div className={['marquee', 'wide', className].filter(Boolean).join(' ')} aria-hidden="true">
      <div className={`track${reverse ? ' reverse' : ''}`}>
        {copies.map((i) => (
          <span key={i}>{text} ✦</span>
        ))}
      </div>
    </div>
  )
}
