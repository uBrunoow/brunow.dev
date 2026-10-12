'use client'

import { type PointerEvent, useEffect, useRef, useState } from 'react'

export interface LogLine {
  level: 'ok' | 'retry' | 'skip'
  text: string
}

interface Labels {
  logLabel: string
  logOk: string
  dead: string
  syncLabel: string
  syncing: string
  /** Raw ICU string with a {count} placeholder. */
  queue: string
  done: string
  next: string
  paused: string
  pause: string
  resume: string
  cancel: string
  minimize: string
  close: string
  nope: string[]
  hint: string
}

const pad = (n: number) => String(n).padStart(2, '0')
const clock = () => {
  const d = new Date()
  return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
}
const TOTAL = 14
const VISIBLE = 7

/** Drag a window by its title bar. Uses the `translate` property so it composes with rotate and the pop-in. */
function useDrag() {
  const ref = useRef<HTMLElement>(null)
  const state = useRef({ x: 0, y: 0, sx: 0, sy: 0, on: false })
  const onPointerDown = (e: PointerEvent<HTMLElement>) => {
    if ((e.target as HTMLElement).closest('button')) return
    const s = state.current
    s.on = true
    s.sx = e.clientX - s.x
    s.sy = e.clientY - s.y
    e.currentTarget.setPointerCapture(e.pointerId)
    if (ref.current) ref.current.style.zIndex = '9'
  }
  const onPointerMove = (e: PointerEvent<HTMLElement>) => {
    const s = state.current
    if (!s.on || !ref.current) return
    s.x = e.clientX - s.sx
    s.y = e.clientY - s.sy
    ref.current.style.translate = `${s.x}px ${s.y}px`
  }
  const stop = () => {
    state.current.on = false
    if (ref.current) ref.current.style.zIndex = ''
  }
  return { ref, bar: { onPointerDown, onPointerMove, onPointerUp: stop, onPointerCancel: stop } }
}

export function HeroDesk({ lines, labels }: { lines: LogLine[]; labels: Labels }) {
  const [log, setLog] = useState(() =>
    lines.slice(0, VISIBLE - 1).map((line, i) => ({ ...line, time: `09:41:0${i}`, id: i })),
  )
  const [minimized, setMinimized] = useState(false)
  const [logStatus, setLogStatus] = useState(labels.logOk)
  const [done, setDone] = useState(9)
  const [paused, setPaused] = useState(false)
  const [syncNote, setSyncNote] = useState<string | null>(null)
  const nopeIndex = useRef(0)
  const logWin = useDrag()
  const syncWin = useDrag()

  // live log and sync progress
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let next = VISIBLE - 1
    const logTimer = setInterval(() => {
      const line = lines[next % lines.length]
      const id = next++
      setLog((current) => [...current, { ...line, time: clock(), id }].slice(-VISIBLE))
    }, 1400)
    return () => clearInterval(logTimer)
  }, [lines])

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const timer = setInterval(() => setDone((d) => (d >= TOTAL ? 0 : d + 1)), 650)
    return () => clearInterval(timer)
  }, [paused])

  // subtle parallax on everything marked data-par inside the hero
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!window.matchMedia('(pointer: fine)').matches) return
    const items = [...document.querySelectorAll<HTMLElement>('.hero [data-par]')]
    const move = (e: globalThis.PointerEvent) => {
      const x = e.clientX / window.innerWidth - 0.5
      const y = e.clientY / window.innerHeight - 0.5
      for (const el of items) {
        const k = Number(el.dataset.par)
        el.style.translate = `${x * k}px ${y * k}px`
      }
    }
    window.addEventListener('pointermove', move, { passive: true })
    return () => window.removeEventListener('pointermove', move)
  }, [])

  const nope = (target: 'log' | 'sync') => {
    const message = labels.nope[nopeIndex.current++ % labels.nope.length]
    if (target === 'log') setLogStatus(message)
    else setSyncNote(message)
    const el = (target === 'log' ? logWin : syncWin).ref.current
    el?.animate([{ rotate: '-2deg' }, { rotate: '2deg' }], { duration: 70, iterations: 4, direction: 'alternate' })
  }

  const complete = done >= TOTAL
  const title = paused ? labels.paused : complete ? labels.done : labels.syncing
  const sub = syncNote ?? (complete ? labels.next : labels.queue.replace('{count}', String(TOTAL - done)))

  return (
    <>
      <section className="win w-log" aria-label={labels.logLabel} ref={logWin.ref}>
        <div className="win-bar" {...logWin.bar}>
          <span className="win-title">alva-hub.log</span>
          <span className="win-btns">
            <button type="button" aria-label={labels.minimize} onClick={() => setMinimized((m) => !m)}>
              _
            </button>
            <button type="button" aria-label={labels.close} onClick={() => nope('log')}>
              ×
            </button>
          </span>
        </div>
        <div className="win-body" hidden={minimized}>
          <ul className="log">
            {log.map((line) => (
              <li key={line.id}>
                <time>{line.time}</time>
                <em className={line.level}>{line.level}</em>
                <span>{line.text}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="win-status">
          <span>{logStatus}</span>
          <span>{labels.dead}</span>
        </div>
      </section>

      <p className="hint" aria-hidden="true">
        {labels.hint}
      </p>

      <section className="win w-sync" aria-label={labels.syncLabel} ref={syncWin.ref}>
        <div className="win-bar" {...syncWin.bar}>
          <span className="win-title">SYNC_OMIE.EXE</span>
          <span className="win-btns">
            <button type="button" aria-label={labels.close} onClick={() => nope('sync')}>
              ×
            </button>
          </span>
        </div>
        <div className="win-body">
          <div className="sync-row">
            <span className="sync-ico" aria-hidden="true" />
            <div>
              <p>
                <strong>{title}</strong>
              </p>
              <p>{sub}</p>
            </div>
          </div>
          <div className="bar" aria-hidden="true">
            <i style={{ width: `${(done / TOTAL) * 100}%` }} />
          </div>
          <div className="sync-actions">
            <button
              className="btn95 sm"
              type="button"
              onClick={() => {
                setPaused((p) => !p)
                setSyncNote(null)
              }}
            >
              {paused ? labels.resume : labels.pause}
            </button>
            <button className="btn95 sm" type="button" onClick={() => nope('sync')}>
              {labels.cancel}
            </button>
          </div>
        </div>
      </section>
    </>
  )
}
