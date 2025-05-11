
import type { SVGProps } from 'react'

export function WebIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="2em"
      height="2em"
      viewBox="0 0 48 48"
      {...props}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M24.04 42.5c10.215 0 18.46-8.285 18.46-18.54c0-10.215-8.245-18.46-18.46-18.46C13.785 5.5 5.5 13.745 5.5 23.96c0 10.255 8.285 18.54 18.54 18.54m16.012-27.75H7.96m32.195 18.275H7.857M5.6 24h36.8M24.04 5.5v37"
      ></path>
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M24.02 42.5c5.108 0 9.23-8.285 9.23-18.54c0-10.215-4.122-18.46-9.23-18.46c-5.128 0-9.27 8.245-9.27 18.46c0 10.255 4.142 18.54 9.27 18.54"
      ></path>
    </svg>
  )
}
