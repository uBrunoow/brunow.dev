'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
interface IErrors extends Error {
  response?: string
}

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: IErrors
  reset: () => void
}) {
  return (
    // <Suspense fallback={<Loader />}>
    <div className="fixed inset-0 z-40 flex min-h-screen flex-col items-center justify-center bg-white p-4 text-white dark:bg-dark">
      <div className="mb-8 flex items-center text-center text-4xl font-bold tracking-tighter text-black dark:text-white md:text-7xl lg:text-9xl">
        Oops, algo deu errado!
      </div>
      <h1 className="mb-4 text-center text-3xl font-bold text-black dark:text-white">
        Erro: {error.message}
      </h1>
      <p className="mb-8 max-w-xl text-center text-gray-400">
        Desculpe, mas ocorreu um erro inesperado. Por favor, tente novamente
        mais tarde ou entre em contato com o suporte se o problema persistir.
      </p>

      <div className="flex w-full max-w-md gap-2">
        <Button className="w-full border border-primary" onClick={reset}>
          Tente novamente
        </Button>
        <Button asChild>
          <Link
            href="/"
            className="w-full border border-zinc-700/20 bg-transparent text-zinc-500 hover:bg-zinc-100"
            prefetch={true}
          >
            Voltar para a Página Inicial
          </Link>
        </Button>
      </div>
      <div className="absolute left-0 top-0 z-[-1]">
        <svg
          width="1440"
          height="969"
          viewBox="0 0 1440 969"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Background</title>
          <mask
            id="mask0_95:1005"
            style={{ maskType: 'alpha' }}
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="1440"
            height="969"
          >
            <rect width="1440" height="969" fill="#95F238" />
          </mask>
          <g mask="url(#mask0_95:1005)">
            <path
              opacity="0.1"
              d="M1086.96 297.978L632.959 554.978L935.625 535.926L1086.96 297.978Z"
              fill="url(#paint0_linear_95:1005)"
            />
            <path
              opacity="0.1"
              d="M1324.5 755.5L1450 687V886.5L1324.5 967.5L-10 288L1324.5 755.5Z"
              fill="url(#paint1_linear_95:1005)"
            />
          </g>
          <defs>
            <linearGradient
              id="paint0_linear_95:1005"
              x1="1178.4"
              y1="151.853"
              x2="780.959"
              y2="453.581"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#95F238" />
              <stop offset="1" stopColor="#95F238" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_95:1005"
              x1="160.5"
              y1="220"
              x2="1099.45"
              y2="1192.04"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#95F238" />
              <stop offset="1" stopColor="#95F238" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
    // </Suspense>
  )
}
