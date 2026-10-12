/**
 * Torn paper edges as a clip-path polygon. Seeded so the server and the
 * browser draw the same teeth and no script is needed to tear the paper.
 */
export type TornSide = 'top' | 'bottom' | 'both'

const rng = (seed: number) => () => {
  seed = (seed * 16807) % 2147483647
  return (seed - 1) / 2147483646
}

function edge(r: () => number, amp: number) {
  const points: [number, number][] = []
  let x = 0
  while (x < 100) {
    const deep = r() < 0.12
    points.push([x, deep ? amp * (0.75 + r() * 0.5) : amp * r() * 0.55])
    x += 0.7 + r() * 1.8
  }
  points.push([100, amp * r() * 0.5])
  return points
}

const fmt = (n: number) => Number(n.toFixed(2))

export function tornClip(side: TornSide, seed: number, amp = 18) {
  const r = rng(seed * 7919 + 13)
  const top =
    side === 'bottom' ? ['0 0', '100% 0'] : edge(r, amp).map(([x, d]) => `${fmt(x)}% ${fmt(d)}px`)
  const bottom =
    side === 'top'
      ? ['100% 100%', '0 100%']
      : edge(r, amp)
          .reverse()
          .map(([x, d]) => `${fmt(x)}% calc(100% - ${fmt(d)}px)`)
  return `polygon(${[...top, ...bottom].join(',')})`
}
