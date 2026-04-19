import { useMemo, useState } from "react"
import Tex from "../../components/Tex"
import TopicShell, { Section, Card } from "../../components/TopicShell"
import { TOPICS } from "../../topics"

const topic = TOPICS.find((t) => t.slug === "vacv/vector-fields")!

type Field2D = {
  id: string
  name: string
  F: (x: number, y: number) => [number, number]
  tex: string
  note: string
}

const FIELDS: Field2D[] = [
  {
    id: "radial",
    name: "Radial",
    tex: String.raw`F = \langle x, y \rangle`,
    F: (x, y) => [x, y],
    note: "Points outward. Divergence 2 everywhere; curl 0.",
  },
  {
    id: "rotation",
    name: "Rotation",
    tex: String.raw`F = \langle -y, x \rangle`,
    F: (x, y) => [-y, x],
    note: "Counter-clockwise flow. Divergence 0; curl 2.",
  },
  {
    id: "shear",
    name: "Shear",
    tex: String.raw`F = \langle y, 0 \rangle`,
    F: (_, y) => [y, 0],
    note: "Horizontal shear. Divergence 0; curl -1.",
  },
  {
    id: "saddle",
    name: "Saddle",
    tex: String.raw`F = \langle x, -y \rangle`,
    F: (x, y) => [x, -y],
    note: "Hyperbolic stagnation point at origin.",
  },
  {
    id: "vortex",
    name: "Vortex (1/r)",
    tex: String.raw`F = \frac{1}{r^2}\langle -y, x \rangle`,
    F: (x, y) => {
      const r2 = x * x + y * y + 0.01
      return [-y / r2, x / r2]
    },
    note: "Irrotational vortex — curl zero except at origin.",
  },
  {
    id: "source",
    name: "Source",
    tex: String.raw`F = \frac{1}{r^2}\langle x, y \rangle`,
    F: (x, y) => {
      const r2 = x * x + y * y + 0.01
      return [x / r2, y / r2]
    },
    note: "Point source; flow radiates outward.",
  },
  {
    id: "gradient",
    name: "Gradient of x²+y²",
    tex: String.raw`F = \nabla(x^2 + y^2) = \langle 2x, 2y \rangle`,
    F: (x, y) => [2 * x, 2 * y],
    note: "Gradient field — conservative; curl 0; ∇·F = 4.",
  },
  {
    id: "dipole",
    name: "Dipole",
    tex: String.raw`F = \langle x^2 - y^2, 2xy \rangle`,
    F: (x, y) => [x * x - y * y, 2 * x * y],
    note: "Real/imaginary parts of z² — conformal.",
  },
]

function FieldViz({ f }: { f: Field2D }) {
  const W = 520
  const H = 520
  const L = 3 // coordinate half-width: x,y ∈ [-L, L]

  const toScreen = (x: number, y: number): [number, number] => [
    W / 2 + (x / L) * (W / 2 - 20),
    H / 2 - (y / L) * (H / 2 - 20),
  ]

  const nGrid = 20
  const vectors = useMemo(() => {
    const out: { x: number; y: number; u: number; v: number; mag: number }[] = []
    const step = (2 * L) / nGrid
    let maxMag = 0
    for (let i = 0; i <= nGrid; i++) {
      for (let j = 0; j <= nGrid; j++) {
        const x = -L + i * step
        const y = -L + j * step
        const [u, v] = f.F(x, y)
        const m = Math.sqrt(u * u + v * v)
        maxMag = Math.max(maxMag, m)
        out.push({ x, y, u, v, mag: m })
      }
    }
    return out.map((p) => ({ ...p, mag: p.mag / (maxMag || 1) }))
  }, [f])

  // streamlines: integrate a few trajectories forward + backward
  const streamlines = useMemo(() => {
    const starts: [number, number][] = []
    const Nseeds = 10
    for (let k = 0; k < Nseeds; k++) {
      const t = (k / (Nseeds - 1)) * 2 * Math.PI
      starts.push([1.5 * Math.cos(t), 1.5 * Math.sin(t)])
      starts.push([2.5 * Math.cos(t), 2.5 * Math.sin(t)])
    }
    const dt = 0.03
    const lines: [number, number][][] = []
    for (const [sx, sy] of starts) {
      const fwd: [number, number][] = []
      let x = sx
      let y = sy
      for (let k = 0; k < 250; k++) {
        fwd.push([x, y])
        const [u, v] = f.F(x, y)
        const m = Math.sqrt(u * u + v * v) + 1e-6
        x += (u / m) * dt * 3
        y += (v / m) * dt * 3
        if (Math.abs(x) > 3.5 || Math.abs(y) > 3.5) break
      }
      const back: [number, number][] = []
      x = sx
      y = sy
      for (let k = 0; k < 250; k++) {
        back.push([x, y])
        const [u, v] = f.F(x, y)
        const m = Math.sqrt(u * u + v * v) + 1e-6
        x -= (u / m) * dt * 3
        y -= (v / m) * dt * 3
        if (Math.abs(x) > 3.5 || Math.abs(y) > 3.5) break
      }
      lines.push([...back.reverse(), ...fwd])
    }
    return lines
  }, [f])

  return (
    <svg width={W} height={H} className="block mx-auto max-w-full bg-neutral-950">
      {/* axes */}
      <line x1={0} y1={H / 2} x2={W} y2={H / 2} stroke="#404040" strokeDasharray="2 4" />
      <line x1={W / 2} y1={0} x2={W / 2} y2={H} stroke="#404040" strokeDasharray="2 4" />

      {/* streamlines */}
      {streamlines.map((line, i) => {
        if (line.length < 2) return null
        const pts = line
          .map(([x, y]) => toScreen(x, y))
          .map(([sx, sy]) => `${sx},${sy}`)
          .join(" ")
        return (
          <polyline
            key={i}
            points={pts}
            fill="none"
            stroke="#22d3ee"
            strokeWidth={0.9}
            opacity={0.45}
          />
        )
      })}

      {/* vector arrows */}
      {vectors.map((p, i) => {
        const [sx, sy] = toScreen(p.x, p.y)
        const scale = 14 * p.mag
        const [ex, ey] = toScreen(p.x + (p.u / (Math.abs(p.u) + Math.abs(p.v) + 1e-6)) * (scale / 18), p.y + (p.v / (Math.abs(p.u) + Math.abs(p.v) + 1e-6)) * (scale / 18))
        void ex; void ey
        const u = p.u
        const v = p.v
        const m = Math.sqrt(u * u + v * v) + 1e-6
        const ux = u / m
        const uy = v / m
        const tx = sx + ux * scale
        const ty = sy - uy * scale // flip y
        // arrowhead
        const ah = 4
        const a1x = tx - ux * ah + uy * ah * 0.6
        const a1y = ty + uy * ah + ux * ah * 0.6
        const a2x = tx - ux * ah - uy * ah * 0.6
        const a2y = ty + uy * ah - ux * ah * 0.6
        // color by magnitude
        const c = Math.round(120 + p.mag * 130)
        const color = `hsl(${220 - p.mag * 180},80%,${Math.min(60 + p.mag * 10, 75)}%)`
        void c
        return (
          <g key={i}>
            <line x1={sx} y1={sy} x2={tx} y2={ty} stroke={color} strokeWidth={1.2} />
            <polygon
              points={`${tx},${ty} ${a1x},${a1y} ${a2x},${a2y}`}
              fill={color}
            />
          </g>
        )
      })}
    </svg>
  )
}

function Gallery() {
  const [id, setId] = useState("radial")
  const f = FIELDS.find((x) => x.id === id)!

  return (
    <Card>
      <p className="text-sm text-neutral-400 mb-3">
        <strong className="text-neutral-200">Vector field on</strong>{" "}
        <Tex math={String.raw`\mathbb{R}^2`} />. Each point gets a vector.
        Streamlines (cyan) follow <Tex math={String.raw`F(x,y)`} />.
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

      <div className="rounded-md border border-neutral-800 bg-neutral-950 p-2">
        <FieldViz f={f} />
      </div>

      <div className="mt-3 rounded-md border border-neutral-800 bg-neutral-950 p-3">
        <div className="text-sm text-neutral-200 font-mono mb-1">
          <Tex math={f.tex} />
        </div>
        <div className="text-xs text-neutral-500">{f.note}</div>
      </div>
    </Card>
  )
}

function Interpretation() {
  return (
    <Card>
      <p className="text-sm text-neutral-400 mb-3">
        <strong className="text-neutral-200">Reading a vector field.</strong>
      </p>
      <ul className="space-y-2 text-sm text-neutral-300">
        <li className="flex gap-2">
          <span className="text-teal-400 font-mono">·</span>
          <span>
            <span className="font-semibold text-teal-200">Streamlines</span>{" "}
            are curves tangent to <Tex math="F" /> everywhere. Solve{" "}
            <Tex math={String.raw`\frac{d\mathbf{r}}{dt} = F(\mathbf{r})`} />.
          </span>
        </li>
        <li className="flex gap-2">
          <span className="text-teal-400 font-mono">·</span>
          <span>
            <span className="font-semibold text-teal-200">Zeros</span>{" "}
            (stagnation points): <Tex math={String.raw`F = 0`} />. Classify
            them with the Jacobian — source, sink, saddle, spiral.
          </span>
        </li>
        <li className="flex gap-2">
          <span className="text-teal-400 font-mono">·</span>
          <span>
            <span className="font-semibold text-teal-200">Conservative</span>{" "}
            (gradient) fields: <Tex math={String.raw`F = \nabla\phi`} />.
            Equivalent to curl-free on simply connected domains.
          </span>
        </li>
        <li className="flex gap-2">
          <span className="text-teal-400 font-mono">·</span>
          <span>
            <span className="font-semibold text-teal-200">Incompressible</span>:{" "}
            <Tex math={String.raw`\nabla \cdot F = 0`} />. Streamlines
            conserve area.
          </span>
        </li>
        <li className="flex gap-2">
          <span className="text-teal-400 font-mono">·</span>
          <span>
            <span className="font-semibold text-teal-200">Irrotational</span>:{" "}
            <Tex math={String.raw`\nabla \times F = 0`} />. A paddle-wheel
            placed anywhere wouldn't spin.
          </span>
        </li>
      </ul>
    </Card>
  )
}

export default function VectorFields() {
  return (
    <TopicShell topic={topic}>
      <Section title="Vector field gallery">
        <Gallery />
      </Section>
      <Section title="How to read a field">
        <Interpretation />
      </Section>
    </TopicShell>
  )
}
