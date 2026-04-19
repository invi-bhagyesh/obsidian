import { useMemo, useState } from "react"
import { motion } from "framer-motion"
import Tex from "../../components/Tex"
import TopicShell, { Section, Card } from "../../components/TopicShell"
import { TOPICS } from "../../topics"

const topic = TOPICS.find((t) => t.slug === "ra/riemann")!

type FuncSample = {
  id: string
  name: string
  tex: string
  f: (x: number) => number
  F: (x: number) => number // antiderivative when known
  dom: [number, number]
  yRange: [number, number]
  note?: string
}

const FUNCS: FuncSample[] = [
  {
    id: "sq",
    name: "x²",
    tex: String.raw`f(x) = x^2`,
    f: (x) => x * x,
    F: (x) => (x * x * x) / 3,
    dom: [0, 2],
    yRange: [0, 4.5],
  },
  {
    id: "sinx",
    name: "sin x",
    tex: String.raw`f(x) = \sin x`,
    f: (x) => Math.sin(x),
    F: (x) => -Math.cos(x),
    dom: [0, Math.PI],
    yRange: [0, 1.2],
  },
  {
    id: "expx",
    name: "eˣ",
    tex: String.raw`f(x) = e^x`,
    f: (x) => Math.exp(x),
    F: (x) => Math.exp(x),
    dom: [0, 2],
    yRange: [0, 8],
  },
  {
    id: "1x",
    name: "1/x on [1, 3]",
    tex: String.raw`f(x) = 1/x`,
    f: (x) => 1 / x,
    F: (x) => Math.log(x),
    dom: [1, 3],
    yRange: [0, 1.2],
  },
]

// Compute Darboux sums given partition — assumes monotone on [a,b] or uses sampled min/max per sub-interval
function darbouxSums(F: FuncSample, n: number) {
  const [a, b] = F.dom
  const dx = (b - a) / n
  let U = 0
  let L = 0
  const rects: { x0: number; x1: number; low: number; high: number }[] = []
  for (let i = 0; i < n; i++) {
    const x0 = a + i * dx
    const x1 = x0 + dx
    // sample many points in [x0, x1] to get inf & sup
    const samples = 12
    let mn = Infinity
    let mx = -Infinity
    for (let j = 0; j <= samples; j++) {
      const x = x0 + (j / samples) * dx
      const y = F.f(x)
      if (y < mn) mn = y
      if (y > mx) mx = y
    }
    U += mx * dx
    L += mn * dx
    rects.push({ x0, x1, low: mn, high: mx })
  }
  return { U, L, rects }
}

function DarbouxDemo() {
  const [id, setId] = useState("sq")
  const [n, setN] = useState(8)
  const F = FUNCS.find((x) => x.id === id)!
  const { U, L, rects } = useMemo(() => darbouxSums(F, n), [F, n])
  const exact = F.F(F.dom[1]) - F.F(F.dom[0])

  const W = 760
  const H = 280
  const pad = 32
  const [xa, xb] = F.dom
  const [ya, yb] = F.yRange
  const toX = (x: number) => pad + ((x - xa) / (xb - xa)) * (W - 2 * pad)
  const toY = (y: number) => pad + ((yb - y) / (yb - ya)) * (H - 2 * pad)

  const curve = useMemo(() => {
    const pts: [number, number][] = []
    for (let i = 0; i <= 400; i++) {
      const x = xa + (i / 400) * (xb - xa)
      pts.push([x, F.f(x)])
    }
    return pts
  }, [F, xa, xb])

  return (
    <Card>
      <p className="text-sm text-neutral-400 mb-3">
        <strong className="text-neutral-200">Upper vs lower sums.</strong> Given a
        partition, <Tex math="U(P, f)" /> over-estimates and{" "}
        <Tex math="L(P, f)" /> under-estimates. The function is{" "}
        <em>Riemann-integrable</em> iff these squeeze together:{" "}
        <Tex math={String.raw`\inf_P U = \sup_P L`} />.
      </p>

      <div className="flex flex-wrap items-center gap-2 mb-3">
        {FUNCS.map((fn) => (
          <button
            key={fn.id}
            onClick={() => setId(fn.id)}
            className={`rounded-md border px-3 py-1 text-xs font-mono ${
              id === fn.id
                ? "border-indigo-500/60 bg-indigo-500/20 text-indigo-200"
                : "border-neutral-800 text-neutral-400 hover:bg-neutral-900"
            }`}
          >
            {fn.name}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-3 mb-3">
        <label className="text-xs text-neutral-500 font-mono">partitions n</label>
        <input
          type="range"
          min={2}
          max={120}
          value={n}
          onChange={(e) => setN(Number(e.target.value))}
          className="w-52 accent-indigo-400"
        />
        <span className="font-mono text-neutral-300 tabular-nums">{n}</span>
        <span className="ml-auto text-xs text-neutral-500 font-mono">
          exact = {exact.toFixed(5)}
        </span>
      </div>

      <div className="rounded-md border border-neutral-800 bg-neutral-950 overflow-hidden">
        <svg width={W} height={H} className="block max-w-full">
          {/* axis */}
          <line x1={pad} x2={W - pad} y1={toY(0)} y2={toY(0)} stroke="#52525b" />
          <line x1={toX(xa)} x2={toX(xa)} y1={pad} y2={H - pad} stroke="#52525b" />

          {/* Upper rectangles */}
          {rects.map((r, i) => (
            <rect
              key={`u${i}`}
              x={toX(r.x0)}
              y={toY(r.high)}
              width={toX(r.x1) - toX(r.x0)}
              height={toY(0) - toY(r.high)}
              fill="#f472b6"
              opacity={0.22}
              stroke="#f472b6"
              strokeOpacity={0.6}
              strokeWidth={0.5}
            />
          ))}
          {/* Lower rectangles (on top, smaller) */}
          {rects.map((r, i) => (
            <rect
              key={`l${i}`}
              x={toX(r.x0)}
              y={toY(r.low)}
              width={toX(r.x1) - toX(r.x0)}
              height={toY(0) - toY(r.low)}
              fill="#34d399"
              opacity={0.35}
            />
          ))}

          {/* curve */}
          <polyline
            points={curve.map(([x, y]) => `${toX(x)},${toY(y)}`).join(" ")}
            fill="none"
            stroke="#a78bfa"
            strokeWidth={2}
          />
        </svg>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
        <Stat label="L (lower sum)" value={L.toFixed(5)} color="emerald" />
        <Stat label="U (upper sum)" value={U.toFixed(5)} color="rose" />
        <Stat label="U − L" value={(U - L).toFixed(5)} color="amber" />
      </div>

      <p className="mt-3 text-xs text-neutral-500">
        Green = lower sum (inscribed rectangles), magenta = upper sum
        (circumscribed). As <Tex math={String.raw`n \to \infty`} /> the two collapse to the
        exact value.
      </p>
    </Card>
  )
}

function Stat({
  label,
  value,
  color,
}: {
  label: string
  value: string
  color: "emerald" | "rose" | "amber" | "indigo"
}) {
  const cls = {
    emerald: "border-emerald-500/40 bg-emerald-500/10 text-emerald-200",
    rose: "border-rose-500/40 bg-rose-500/10 text-rose-200",
    amber: "border-amber-500/40 bg-amber-500/10 text-amber-200",
    indigo: "border-indigo-500/40 bg-indigo-500/10 text-indigo-200",
  }[color]
  return (
    <div className={`rounded-md border px-3 py-2 font-mono ${cls}`}>
      <div className="text-[10px] uppercase tracking-wider opacity-70">{label}</div>
      <div className="mt-0.5 text-sm">{value}</div>
    </div>
  )
}

// ============ Convergence of U and L to the exact value ============
function UvsL() {
  const [id, setId] = useState("sq")
  const F = FUNCS.find((x) => x.id === id)!

  const data = useMemo(() => {
    const ns = [2, 4, 6, 8, 12, 16, 24, 32, 48, 64, 96, 128]
    return ns.map((n) => {
      const { U, L } = darbouxSums(F, n)
      return { n, U, L }
    })
  }, [F])

  const exact = F.F(F.dom[1]) - F.F(F.dom[0])

  const W = 760
  const H = 240
  const pad = 40
  const nMin = Math.min(...data.map((d) => d.n))
  const nMax = Math.max(...data.map((d) => d.n))
  const yVals = [...data.map((d) => d.U), ...data.map((d) => d.L), exact]
  const yMin = Math.min(...yVals)
  const yMax = Math.max(...yVals)
  const padY = (yMax - yMin) * 0.15 + 0.001
  const toX = (n: number) => pad + ((Math.log(n) - Math.log(nMin)) / (Math.log(nMax) - Math.log(nMin))) * (W - 2 * pad)
  const toY = (y: number) => pad + ((yMax + padY - y) / (yMax - yMin + 2 * padY)) * (H - 2 * pad)

  return (
    <Card>
      <p className="text-sm text-neutral-400 mb-3">
        Both sums approach the integral from opposite sides. Criterion:{" "}
        <Tex math="f" /> is integrable iff for every{" "}
        <Tex math="\varepsilon > 0" /> there is a partition with{" "}
        <Tex math="U(P, f) - L(P, f) < \varepsilon" />.
      </p>

      <div className="flex flex-wrap items-center gap-2 mb-3">
        {FUNCS.map((fn) => (
          <button
            key={fn.id}
            onClick={() => setId(fn.id)}
            className={`rounded-md border px-3 py-1 text-xs font-mono ${
              id === fn.id
                ? "border-indigo-500/60 bg-indigo-500/20 text-indigo-200"
                : "border-neutral-800 text-neutral-400 hover:bg-neutral-900"
            }`}
          >
            {fn.name}
          </button>
        ))}
      </div>

      <div className="rounded-md border border-neutral-800 bg-neutral-950 overflow-hidden">
        <svg width={W} height={H} className="block max-w-full">
          <line x1={pad} x2={W - pad} y1={toY(exact)} y2={toY(exact)} stroke="#fbbf24" strokeDasharray="3 3" />
          <text x={W - pad - 4} y={toY(exact) - 4} textAnchor="end" fontSize="10" fill="#fbbf24" fontFamily="ui-monospace, monospace">
            exact = {exact.toFixed(4)}
          </text>

          {/* U line */}
          <polyline
            points={data.map((d) => `${toX(d.n)},${toY(d.U)}`).join(" ")}
            fill="none"
            stroke="#f472b6"
            strokeWidth={2}
          />
          {data.map((d) => (
            <circle key={`u${d.n}`} cx={toX(d.n)} cy={toY(d.U)} r={3} fill="#f472b6" />
          ))}

          {/* L line */}
          <polyline
            points={data.map((d) => `${toX(d.n)},${toY(d.L)}`).join(" ")}
            fill="none"
            stroke="#34d399"
            strokeWidth={2}
          />
          {data.map((d) => (
            <circle key={`l${d.n}`} cx={toX(d.n)} cy={toY(d.L)} r={3} fill="#34d399" />
          ))}

          <line x1={pad} x2={W - pad} y1={H - pad} y2={H - pad} stroke="#52525b" />
          {data.map((d) => (
            <g key={`t${d.n}`}>
              <text x={toX(d.n)} y={H - pad + 12} textAnchor="middle" fontSize="9" fill="#71717a" fontFamily="ui-monospace, monospace">
                {d.n}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </Card>
  )
}

// ============ Fundamental theorem of calculus ============
function FTC() {
  const [t, setT] = useState(1.0)
  const f = (x: number) => Math.sin(x) + 1 // positive
  const F = (x: number) => -Math.cos(x) + x + 1 // ∫_0^x f = -cos x + x + 1 (since F(0)=0)

  const W = 760
  const H = 260
  const pad = 34
  const xa = 0
  const xb = 2 * Math.PI
  const ya = -0.3
  const yb = 2.3
  const toX = (x: number) => pad + ((x - xa) / (xb - xa)) * (W - 2 * pad)
  const toY = (y: number) => pad + ((yb - y) / (yb - ya)) * (H - 2 * pad)

  const curve = useMemo(() => {
    const out: [number, number][] = []
    for (let i = 0; i <= 400; i++) {
      const x = xa + (i / 400) * (xb - xa)
      out.push([x, f(x)])
    }
    return out
  }, [])

  const shaded = useMemo(() => {
    // area under f from 0 to t
    const out: string[] = []
    out.push(`M ${toX(0)} ${toY(0)}`)
    const steps = 120
    for (let i = 0; i <= steps; i++) {
      const x = (i / steps) * t
      out.push(`L ${toX(x)} ${toY(f(x))}`)
    }
    out.push(`L ${toX(t)} ${toY(0)}`)
    out.push("Z")
    return out.join(" ")
  }, [t])

  const Ft = F(t)

  return (
    <Card>
      <p className="text-sm text-neutral-400 mb-3">
        <strong className="text-neutral-200">Fundamental theorem.</strong>{" "}
        <Tex math={String.raw`\Phi(t) = \int_0^t f(x)\,dx`} /> is differentiable
        with <Tex math={String.raw`\Phi'(t) = f(t)`} />. Drag t; green area vs the
        antiderivative value.
      </p>

      <div className="flex items-center gap-3 mb-3">
        <label className="text-xs text-neutral-500 font-mono">t</label>
        <input
          type="range"
          min={0}
          max={xb}
          step={0.01}
          value={t}
          onChange={(e) => setT(Number(e.target.value))}
          className="w-64 accent-emerald-400"
        />
        <span className="font-mono text-neutral-300 tabular-nums">{t.toFixed(2)}</span>
        <span className="ml-auto text-xs text-neutral-500 font-mono">
          Φ(t) = {Ft.toFixed(4)}
        </span>
      </div>

      <div className="rounded-md border border-neutral-800 bg-neutral-950 overflow-hidden">
        <svg width={W} height={H} className="block max-w-full">
          <line x1={pad} x2={W - pad} y1={toY(0)} y2={toY(0)} stroke="#52525b" />

          <path d={shaded} fill="#34d399" opacity={0.28} />

          <polyline
            points={curve.map(([x, y]) => `${toX(x)},${toY(y)}`).join(" ")}
            fill="none"
            stroke="#a78bfa"
            strokeWidth={2}
          />

          <motion.line
            animate={{ x1: toX(t), x2: toX(t) }}
            initial={false}
            y1={toY(0)}
            y2={toY(f(t))}
            stroke="#fbbf24"
            strokeWidth={1.2}
            strokeDasharray="3 3"
          />
          <motion.circle
            animate={{ cx: toX(t), cy: toY(f(t)) }}
            initial={false}
            r={5}
            fill="#fbbf24"
            stroke="#0b0d10"
            strokeWidth={2}
          />
          <text x={toX(t) + 8} y={toY(f(t)) - 6} fontSize="10" fill="#fbbf24" fontFamily="ui-monospace, monospace">
            f(t) = {f(t).toFixed(3)}
          </text>
        </svg>
      </div>

      <p className="mt-3 text-xs text-neutral-500">
        The rate at which the green area grows (as t increases) is exactly the
        height <Tex math="f(t)" />.
      </p>
    </Card>
  )
}

export default function Riemann() {
  return (
    <TopicShell topic={topic}>
      <Section title="Upper and lower Darboux sums">
        <DarbouxDemo />
      </Section>
      <Section title="Squeezing to the integral">
        <UvsL />
      </Section>
      <Section title="Fundamental theorem: Φ′ = f">
        <FTC />
      </Section>
    </TopicShell>
  )
}
