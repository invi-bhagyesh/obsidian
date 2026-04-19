import { useMemo, useState } from "react"
import Tex from "../../components/Tex"
import TopicShell, { Section, Card } from "../../components/TopicShell"
import { TOPICS } from "../../topics"

const topic = TOPICS.find((t) => t.slug === "vacv/divergence-curl")!

type Field = {
  id: string
  name: string
  F: (x: number, y: number) => [number, number]
  divClosed: string
  curlClosed: string
}

const FIELDS: Field[] = [
  {
    id: "radial",
    name: "⟨x, y⟩",
    F: (x, y) => [x, y],
    divClosed: "∇·F = 2",
    curlClosed: "∇×F = 0",
  },
  {
    id: "rot",
    name: "⟨-y, x⟩",
    F: (x, y) => [-y, x],
    divClosed: "∇·F = 0",
    curlClosed: "∇×F = 2",
  },
  {
    id: "stretch",
    name: "⟨x², y²⟩",
    F: (x, y) => [x * x, y * y],
    divClosed: "∇·F = 2x + 2y",
    curlClosed: "∇×F = 0",
  },
  {
    id: "twist",
    name: "⟨xy, -xy⟩",
    F: (x, y) => [x * y, -x * y],
    divClosed: "∇·F = y - x",
    curlClosed: "∇×F = -y - x",
  },
  {
    id: "sink",
    name: "⟨-x, -y⟩",
    F: (x, y) => [-x, -y],
    divClosed: "∇·F = -2",
    curlClosed: "∇×F = 0",
  },
  {
    id: "sin",
    name: "⟨sin y, cos x⟩",
    F: (x, y) => [Math.sin(y), Math.cos(x)],
    divClosed: "∇·F = 0",
    curlClosed: "∇×F = -sin x - cos y",
  },
]

function numDivCurl(
  f: (x: number, y: number) => [number, number],
  x: number,
  y: number,
  h = 0.001,
): { div: number; curl: number } {
  const [fx1, fy1] = f(x + h, y)
  const [fx0, fy0] = f(x - h, y)
  const [gx1, gy1] = f(x, y + h)
  const [gx0, gy0] = f(x, y - h)
  const dPdx = (fx1 - fx0) / (2 * h)
  const dQdx = (fy1 - fy0) / (2 * h)
  const dPdy = (gx1 - gx0) / (2 * h)
  const dQdy = (gy1 - gy0) / (2 * h)
  return { div: dPdx + dQdy, curl: dQdx - dPdy }
}

function Heatmap({
  F,
  mode,
}: {
  F: (x: number, y: number) => [number, number]
  mode: "div" | "curl"
}) {
  const W = 300
  const H = 300
  const L = 3
  const N = 36

  const { grid, maxAbs } = useMemo(() => {
    const g: number[][] = []
    let M = 1e-6
    for (let i = 0; i < N; i++) {
      const row: number[] = []
      for (let j = 0; j < N; j++) {
        const x = -L + ((i + 0.5) * 2 * L) / N
        const y = -L + ((j + 0.5) * 2 * L) / N
        const { div, curl } = numDivCurl(F, x, y)
        const v = mode === "div" ? div : curl
        M = Math.max(M, Math.abs(v))
        row.push(v)
      }
      g.push(row)
    }
    return { grid: g, maxAbs: M }
  }, [F, mode])

  const cellW = W / N
  const cellH = H / N

  const color = (v: number): string => {
    const t = v / (maxAbs + 1e-9) // -1..1
    if (t > 0) {
      const l = 30 + 40 * Math.min(1, t)
      return `hsl(220, 80%, ${l}%)` // blue = positive
    }
    const l = 30 + 40 * Math.min(1, -t)
    return `hsl(0, 80%, ${l}%)` // red = negative
  }

  return (
    <svg width={W} height={H} className="bg-neutral-950">
      {grid.map((row, i) =>
        row.map((v, j) => (
          <rect
            key={`${i}-${j}`}
            x={i * cellW}
            y={H - (j + 1) * cellH}
            width={cellW + 0.5}
            height={cellH + 0.5}
            fill={color(v)}
            opacity={0.85}
          />
        )),
      )}
      {/* axes */}
      <line x1={0} y1={H / 2} x2={W} y2={H / 2} stroke="#737373" strokeDasharray="2 3" />
      <line x1={W / 2} y1={0} x2={W / 2} y2={H} stroke="#737373" strokeDasharray="2 3" />
    </svg>
  )
}

function DivCurlPlay() {
  const [id, setId] = useState("radial")
  const f = FIELDS.find((x) => x.id === id)!

  return (
    <Card>
      <p className="text-sm text-neutral-400 mb-3">
        <strong className="text-neutral-200">Divergence</strong>{" "}
        <Tex math={String.raw`\nabla\cdot F = \partial_x P + \partial_y Q`} /> —
        net flux out of a tiny box. <strong className="text-neutral-200">Curl</strong>{" "}
        <Tex math={String.raw`\nabla\times F = \partial_x Q - \partial_y P`} />{" "}
        — net rotation around a tiny loop.
      </p>

      <div className="flex flex-wrap gap-2 mb-3">
        {FIELDS.map((F) => (
          <button
            key={F.id}
            onClick={() => setId(F.id)}
            className={`rounded-md border px-2 py-1 text-xs font-mono ${
              id === F.id
                ? "border-teal-500/60 bg-teal-500/20 text-teal-200"
                : "border-neutral-800 text-neutral-400 hover:bg-neutral-900"
            }`}
          >
            {F.name}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-3">
        <div className="rounded-md border border-neutral-800 bg-neutral-950 p-3">
          <div className="text-xs font-mono text-sky-300 mb-1">
            divergence (blue ≥ 0, red &lt; 0)
          </div>
          <Heatmap F={f.F} mode="div" />
          <div className="mt-2 text-xs font-mono text-neutral-400">
            {f.divClosed}
          </div>
        </div>
        <div className="rounded-md border border-neutral-800 bg-neutral-950 p-3">
          <div className="text-xs font-mono text-violet-300 mb-1">
            curl (blue = CCW, red = CW)
          </div>
          <Heatmap F={f.F} mode="curl" />
          <div className="mt-2 text-xs font-mono text-neutral-400">
            {f.curlClosed}
          </div>
        </div>
      </div>
    </Card>
  )
}

function Interpretation() {
  return (
    <Card>
      <p className="text-sm text-neutral-400 mb-3">
        <strong className="text-neutral-200">Physical picture.</strong> Drop a
        tiny closed surface or loop and measure what crosses it.
      </p>

      <div className="grid md:grid-cols-2 gap-3">
        <div className="rounded-md border border-sky-500/30 bg-sky-500/5 p-3">
          <div className="text-sky-300 font-mono text-sm mb-2">divergence</div>
          <p className="text-sm text-neutral-300">
            <Tex math={String.raw`\nabla\cdot F(p) = \lim_{V\to p} \frac{1}{|V|}\oint_{\partial V} F \cdot d\mathbf{A}`} />
          </p>
          <ul className="text-xs text-neutral-400 mt-2 space-y-1">
            <li>· &gt; 0: net outflow (source)</li>
            <li>· &lt; 0: net inflow (sink)</li>
            <li>· = 0: incompressible</li>
          </ul>
        </div>
        <div className="rounded-md border border-violet-500/30 bg-violet-500/5 p-3">
          <div className="text-violet-300 font-mono text-sm mb-2">curl (z-component)</div>
          <p className="text-sm text-neutral-300">
            <Tex math={String.raw`(\nabla\times F)_z = \lim_{A\to p}\frac{1}{|A|}\oint_{\partial A} F\cdot d\mathbf{r}`} />
          </p>
          <ul className="text-xs text-neutral-400 mt-2 space-y-1">
            <li>· &gt; 0: CCW rotation</li>
            <li>· &lt; 0: CW rotation</li>
            <li>· = 0: irrotational (paddle-wheel doesn't spin)</li>
          </ul>
        </div>
      </div>

      <div className="mt-3 rounded-md border border-neutral-800 bg-neutral-950 p-3">
        <div className="text-xs font-mono text-neutral-400 mb-2">identities</div>
        <ul className="text-sm text-neutral-300 space-y-1">
          <li>
            <Tex math={String.raw`\nabla\cdot(\nabla\times F) = 0`} /> (curl is
            divergence-free)
          </li>
          <li>
            <Tex math={String.raw`\nabla\times(\nabla\phi) = 0`} /> (gradient is
            curl-free)
          </li>
          <li>
            <Tex math={String.raw`\nabla\cdot(\nabla\phi) = \Delta\phi`} /> (divergence of
            gradient = Laplacian)
          </li>
        </ul>
      </div>
    </Card>
  )
}

export default function DivergenceCurl() {
  return (
    <TopicShell topic={topic}>
      <Section title="Divergence & curl heatmaps">
        <DivCurlPlay />
      </Section>
      <Section title="Physical interpretation">
        <Interpretation />
      </Section>
    </TopicShell>
  )
}
