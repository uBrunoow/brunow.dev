import React from 'react'
import type { SVGProps } from 'react'

export function DeviconNextjs(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="2em"
      height="2em"
      viewBox="0 0 128 128"
      {...props}
    >
      <circle cx={64} cy={64} r={64}></circle>
      <path
        fill="url(#deviconNextjs0)"
        d="M106.317 112.014L49.167 38.4H38.4v51.179h8.614v-40.24l52.54 67.884a64 64 0 0 0 6.763-5.209"
      ></path>
      <path
        fill="url(#deviconNextjs1)"
        d="M81.778 38.4h8.533v51.2h-8.533z"
      ></path>
      <defs>
        <linearGradient
          id="deviconNextjs0"
          x1={109}
          x2={144.5}
          y1={116.5}
          y2={160.5}
          gradientTransform="scale(.71111)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fff"></stop>
          <stop offset={1} stopColor="#fff" stopOpacity={0}></stop>
        </linearGradient>
        <linearGradient
          id="deviconNextjs1"
          x1={121}
          x2={120.799}
          y1={54}
          y2={106.875}
          gradientTransform="scale(.71111)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fff"></stop>
          <stop offset={1} stopColor="#fff" stopOpacity={0}></stop>
        </linearGradient>
      </defs>
    </svg>
  )
}
