import type { ArchitectureLayer } from '@/content/projects'
import type { Locale } from '@/content/types'

const pick = (item: string, locale: Locale) => item.split('|')[locale === 'pt' ? 0 : 1] ?? item

/** How a system is put together: one small window per layer, wired left to right. */
export function Flow({ layers, locale }: { layers: ArchitectureLayer[]; locale: Locale }) {
  return (
    <ol className="flow">
      {layers.map((layer, i) => (
        <li key={layer.label.en} className="win flow-step">
          <span className="win-bar">
            <span className="win-title">
              {String(i + 1).padStart(2, '0')} · {layer.label[locale]}
            </span>
          </span>
          <ul>
            {layer.items.map((item) => (
              <li key={item}>{pick(item, locale)}</li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  )
}
