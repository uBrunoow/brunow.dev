'use client'

import { Link } from '@/i18n/navigation'
import { type KeyboardEvent, useEffect, useRef, useState } from 'react'
import { Floppy } from './Floppy'
import { ArrowRight } from './Icons'

export interface Disk {
  slug: string
  title: string
  path: string
  context: string
  period: string
  year: string
  role: string
  description: string
  highlights: string[]
  stack: string[]
  log: string[]
  beige: boolean
}

interface Labels {
  label: string
  reading: string
  open: string
  events: string
  logs: string
  connected: string
  consoleLabel: string
}

const pad = (n: number) => String(n).padStart(2, '0')
const clock = () => {
  const d = new Date()
  return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
}

const linesFor = (disk: Disk, connected: string) => [...disk.log, `${connected}: ${disk.stack.slice(-3).join(', ')}`]

export function Drive({ disks, labels }: { disks: Disk[]; labels: Labels }) {
  const [selected, setSelected] = useState(0)
  // First paint shows the whole log; typing only starts once someone picks a disk.
  const [typed, setTyped] = useState(() =>
    linesFor(disks[0], labels.connected).map((text, i) => ({ time: `09:41:0${i}`, text })),
  )
  const [typing, setTyping] = useState(false)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const first = useRef(true)
  const disk = disks[selected]

  useEffect(() => {
    if (first.current) {
      first.current = false
      return
    }
    const lines = linesFor(disks[selected], labels.connected)
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setTyped(lines.map((text) => ({ time: clock(), text })))
      return
    }
    let cancelled = false
    const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
    ;(async () => {
      setTyping(true)
      setTyped([])
      for (const line of lines) {
        const time = clock()
        for (let i = 1; i <= line.length; i++) {
          if (cancelled) return
          const row = { time, text: line.slice(0, i) }
          setTyped((rows) => (i === 1 ? [...rows, row] : [...rows.slice(0, -1), row]))
          await wait(14)
        }
        await wait(220)
      }
      if (!cancelled) setTyping(false)
    })()
    return () => {
      cancelled = true
    }
  }, [selected, disks, labels.connected])

  const onKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const step = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0
    if (!step) return
    e.preventDefault()
    const next = (i + step + disks.length) % disks.length
    setSelected(next)
    tabs.current[next]?.focus()
  }

  return (
    <>
      <div className="disks" role="tablist" aria-label={labels.label}>
        {disks.map((d, i) => (
          <button
            key={d.slug}
            ref={(el) => {
              tabs.current[i] = el
            }}
            type="button"
            role="tab"
            id={`disk-${d.slug}`}
            aria-selected={i === selected}
            aria-controls="drive"
            tabIndex={i === selected ? 0 : -1}
            className="disk-btn"
            onClick={() => setSelected(i)}
            onKeyDown={(e) => onKey(e, i)}
          >
            <span className="shape">
              <Floppy title={d.title} top={`${d.context.toUpperCase()} · ${d.year}`} beige={d.beige} />
            </span>
            <span className="read" aria-hidden="true">
              {labels.reading}
            </span>
          </button>
        ))}
      </div>

      <section className="win drive" role="tabpanel" id="drive" aria-labelledby={`disk-${disk.slug}`}>
        <div className="win-bar">
          <span className="win-title">A:\{disk.path}</span>
          <span className="win-btns" aria-hidden="true">
            <i>_</i>
            <i>×</i>
          </span>
        </div>
        <div className="drive-body">
          <div className="drive-info">
            <h3 className="wide">{disk.title}</h3>
            <p className="meta">{[disk.context, disk.period, disk.role].filter(Boolean).join(' · ')}</p>
            <p className="desc">{disk.description}</p>
            {disk.highlights.length > 0 && (
              <ul className="squares">
                {disk.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
            <div className="chips">
              {disk.stack.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <Link href={`/projects/${disk.slug}`} className="btn95 hot drive-open">
              {labels.open}
              <ArrowRight />
            </Link>
          </div>
          <div className="console" aria-label={labels.consoleLabel}>
            <p className="console-head">A:\{disk.path}&gt; tail -f eventos.log</p>
            {typed.map((row, i) => (
              <p key={`${row.time}-${i}`} className="console-line">
                <s>{row.time}</s> <b>›</b> {row.text}
                {typing && i === typed.length - 1 && <span className="cursor" aria-hidden="true" />}
              </p>
            ))}
            {!typing && (
              <p className="console-line">
                <s>—</s> <b>›</b> <span className="cursor" aria-hidden="true" />
              </p>
            )}
          </div>
        </div>
        <div className="win-status">
          <span>
            {disk.path.toLowerCase()}.log · {labels.events.replace('{count}', String(disk.log.length))}
          </span>
          <span>{labels.logs}</span>
        </div>
      </section>
    </>
  )
}
