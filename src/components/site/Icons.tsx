/** Pixel-straight icons on a 24 grid, square caps, to sit next to the retro windows. */

type IconProps = { className?: string }

const base = (className?: string) => ['icon', className].filter(Boolean).join(' ')

export function ArrowRight({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={base(className)} aria-hidden="true">
      <path d="M3 12h17M14 6l6 6-6 6" />
    </svg>
  )
}

export function ArrowDown({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={base(className)} aria-hidden="true">
      <path d="M12 3v17M6 14l6 6 6-6" />
    </svg>
  )
}

export function ArrowLeft({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={base(className)} aria-hidden="true">
      <path d="M21 12H4M10 6l-6 6 6 6" />
    </svg>
  )
}

export function ArrowUpRight({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={base(className)} aria-hidden="true">
      <path d="M6 18 18 6M8 6h10v10" />
    </svg>
  )
}

export function Check({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={base(className)} aria-hidden="true">
      <path d="m4 12 5 5L20 6" />
    </svg>
  )
}

export function Mail({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={base(className)} aria-hidden="true">
      <path d="M3 5h18v14H3zM3 6l9 7 9-7" />
    </svg>
  )
}

export function Download({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={base(className)} aria-hidden="true">
      <path d="M12 3v12M7 10l5 5 5-5M4 20h16" />
    </svg>
  )
}

export function Spark({ className }: IconProps) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <path d="M50 0C53 36 64 47 100 50C64 53 53 64 50 100C47 64 36 53 0 50C36 47 47 36 50 0Z" fill="currentColor" />
    </svg>
  )
}
