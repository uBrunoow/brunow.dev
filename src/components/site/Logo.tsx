interface LogoProps {
  className?: string
  /** Draw the line in on mount. */
  animate?: boolean
  title?: string
}

/**
 * "Seta": an angular single-line B. Both bowls meet in a peak at the waist and
 * the orange arrow points at it from the gap in the stem. Heavy stroke with
 * mitred corners so it sits with the condensed headings.
 */
export function Logo({ className, animate, title }: LogoProps) {
  return (
    <svg
      viewBox="124 62 264 388"
      className={['logo', animate ? 'logo-draw' : '', className].filter(Boolean).join(' ')}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <path
        className="ld"
        fill="none"
        stroke="currentColor"
        strokeWidth="46"
        strokeLinejoin="miter"
        strokeMiterlimit="4"
        d="M192 210V100L344 184L256 240L344 328L192 412V290L256 240"
      />
      <path className="b lb" d="M150 222L212 254L150 286Z" />
    </svg>
  )
}
