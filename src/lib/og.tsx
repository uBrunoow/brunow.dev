import type { ReactNode } from 'react'

/** Same palette as globals.css; share cards are rendered outside the page, so the tokens are repeated here. */
const color = {
  ground: '#151413',
  groundLine: '#2e2b28',
  paper: '#ebe8e1',
  ink: '#161514',
  inkSoft: '#57534d',
  orange: '#ff5b1a',
  onDark: '#f1efe9',
  mutedDark: '#a19b91',
}

export const ogSize = { width: 1200, height: 630 }

type Font = { name: string; data: ArrayBuffer; weight: 500 | 700 | 800; style: 'normal' }

const sources: { name: string; query: string; weight: Font['weight'] }[] = [
  { name: 'Anybody', query: 'Anybody:wdth,wght@150,800', weight: 800 },
  { name: 'Archivo', query: 'Archivo:wght@700', weight: 700 },
  { name: 'Plex', query: 'IBM+Plex+Mono:wght@500', weight: 500 },
]

/** Asked without a browser user agent, Google Fonts answers with TrueType, which is what the renderer reads. */
async function loadFont({ name, query, weight }: (typeof sources)[number]): Promise<Font | null> {
  try {
    const css = await (await fetch(`https://fonts.googleapis.com/css2?family=${query}`)).text()
    const url = css.match(/src: url\((.+?)\) format\('(?:truetype|opentype)'\)/)?.[1]
    if (!url) return null
    return { name, data: await (await fetch(url)).arrayBuffer(), weight, style: 'normal' }
  } catch {
    // Offline build: the card falls back to the renderer's default face
    return null
  }
}

let fonts: Promise<Font[]> | undefined
export const ogFonts = () => {
  fonts ??= Promise.all(sources.map(loadFont)).then((list) => list.filter((f): f is Font => f !== null))
  return fonts
}

/** Path-like caption on top, the big element in the middle, a paper window at the bottom. */
function Frame({ path, aside, children }: { path: string; aside?: string; children: ReactNode }) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: '44px 56px 52px',
        background: color.ground,
        backgroundImage: `linear-gradient(${color.groundLine} 1px, transparent 1px), linear-gradient(90deg, ${color.groundLine} 1px, transparent 1px)`,
        backgroundSize: '48px 48px',
        fontFamily: 'Archivo',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontFamily: 'Plex',
          fontSize: 22,
          color: color.mutedDark,
        }}
      >
        <span>{path}</span>
        {aside && <span>{aside}</span>}
      </div>
      {children}
    </div>
  )
}

function Window({ name, children }: { name: string; children: ReactNode }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        border: `3px solid ${color.ink}`,
        background: color.paper,
        boxShadow: `10px 10px 0 ${color.orange}`,
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '8px 14px',
          background: color.ink,
          color: color.paper,
          fontFamily: 'Plex',
          fontSize: 18,
        }}
      >
        <span>{name}</span>
        <div style={{ display: 'flex', gap: 6 }}>
          {[0, 1, 2].map((i) => (
            <div key={i} style={{ width: 16, height: 16, background: i === 2 ? color.orange : color.paper }} />
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', padding: '24px 30px 26px', color: color.ink }}>
        {children}
      </div>
    </div>
  )
}

/** The display face is very wide, so the size shrinks with the word to keep it on one line. */
const termSize = (text: string) => Math.min(210, Math.floor(1050 / (Math.max(text.length, 1) * 0.92)))

export function PostCard({ term, title, meta, slug }: { term: string; title: string; meta: string; slug: string }) {
  return (
    <Frame path={'C:\\BRUNO.EXE\\BLOG\\'} aside={meta}>
      <div
        style={{
          display: 'flex',
          flex: 1,
          alignItems: 'center',
          fontFamily: 'Anybody',
          fontSize: termSize(term),
          lineHeight: 1,
          color: color.orange,
          letterSpacing: -2,
        }}
      >
        {term}
      </div>
      <Window name={`${slug}.txt`}>
        <div style={{ fontSize: title.length > 90 ? 34 : 40, lineHeight: 1.15 }}>{title}</div>
        <div style={{ marginTop: 14, fontFamily: 'Plex', fontSize: 20, color: color.inkSoft }}>Bruno Werner</div>
      </Window>
    </Frame>
  )
}

export function ProjectCard({ title, context, stack }: { title: string; context?: string; stack: string[] }) {
  return (
    <Frame path={'C:\\BRUNO.EXE\\PROJECTS\\'} aside={context}>
      <div
        style={{
          display: 'flex',
          flex: 1,
          alignItems: 'center',
          fontFamily: 'Anybody',
          fontSize: title.length <= 10 ? 130 : title.length <= 18 ? 92 : 70,
          lineHeight: 1.02,
          color: color.orange,
        }}
      >
        {title}
      </div>
      <Window name="stack.cfg">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          {stack.slice(0, 7).map((item) => (
            <span
              key={item}
              style={{ padding: '6px 14px', border: `2px solid ${color.ink}`, fontFamily: 'Plex', fontSize: 22 }}
            >
              {item}
            </span>
          ))}
        </div>
        <div style={{ marginTop: 16, fontFamily: 'Plex', fontSize: 20, color: color.inkSoft }}>Bruno Werner</div>
      </Window>
    </Frame>
  )
}

export function SiteCard({ role, description, host }: { role: string; description: string; host: string }) {
  return (
    <Frame path={'C:\\BRUNO.EXE\\'} aside={host}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          justifyContent: 'center',
          fontFamily: 'Anybody',
          fontSize: 128,
          lineHeight: 0.95,
        }}
      >
        <span style={{ color: color.onDark }}>BRUNO</span>
        <span style={{ color: color.orange }}>WERNER</span>
      </div>
      <Window name="readme.txt">
        <div style={{ fontSize: 36 }}>{role}</div>
        <div style={{ marginTop: 10, fontSize: 22, lineHeight: 1.3, color: color.inkSoft, fontFamily: 'Plex' }}>
          {description}
        </div>
      </Window>
    </Frame>
  )
}
