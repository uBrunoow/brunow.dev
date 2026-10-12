import { notFound } from 'next/navigation'

// Lets unknown paths render the localized not-found page
export default function CatchAll() {
  notFound()
}
