import { existsSync } from 'node:fs'
import { join } from 'node:path'

/** Server-only check: the CV link renders only once public/cv.pdf exists. */
export function hasCv() {
  return existsSync(join(process.cwd(), 'public', 'cv.pdf'))
}
