interface FloppyProps {
  title: string
  top: string
  bottom?: string
  beige?: boolean
}

/** A 3.5" floppy drawn in CSS: metal shutter, paper label, write-protect notch. */
export function Floppy({ title, top, bottom = '1.44 MB', beige }: FloppyProps) {
  return (
    <span className={`floppy${beige ? ' beige' : ''}`}>
      <span className="shutter" />
      <span className="label">
        <small>{top}</small>
        <strong>{title}</strong>
        <i>{bottom}</i>
      </span>
      <span className="notch" />
    </span>
  )
}
