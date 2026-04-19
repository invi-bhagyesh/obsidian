import { useMemo, useRef, useState } from "react"
import { motion } from "framer-motion"
import Tex from "../../components/Tex"
import TopicShell, { Section, Card } from "../../components/TopicShell"
import { TOPICS } from "../../topics"

const topic = TOPICS.find((t) => t.slug === "ra/continuity")!

type Fn = {
  id: string
  name: string
  tex: string
  f: (x: number) => number
  continuous: (x: number) => boolean // continuity at a single point x
  xDomain: [number, number]
  yRange: [number, number]
  // For continuous functions, we provide a δ that works given ε and point a
  suggestDelta?: (a: number, eps: number) => number
  notes?: string
}

// small helpers
const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v))

const FUNCS: Fn[] = [
  {
    id: "linear",
    name: "f(x) = 2x + 1",
    tex: String.raw`f(x) = 2x + 1`,
    f: (x) => 2 * x + 1,
    continuous: () => true,
    xDomain: [-3, 3],
    yRange: [-6, 8],
    suggestDelta: (_a, eps) => eps / 2,
    notes: "Lipschitz with constant 2 — δ = ε/2 works everywhere.",
  },
  {
    id: "quad",
    name: "f(x) = x²",
    tex: String.raw`f(x) = x^2`,
    f: (x) => x * x,
    continuous: () => true,
    xDomain: [-3, 3],
    yRange: [-0.5, 9],
    suggestDelta: (a, eps) => Math.min(1, eps / (2 * Math.abs(a) + 1)),
    notes: "Not Lipschitz on ℝ, but continuous: δ depends on a and ε.",
  },
  {
    id: "sinx",
    name: "f(x) = sin x",
    tex: String.raw`f(x) = \sin x`,
    f: (x) => Math.sin(x),
    continuous: () => true,
    xDomain: [-Math.PI * 1.5, Math.PI * 1.5],
    yRange: [-1.3, 1.3],
    suggestDelta: (_a, eps) => eps,
    notes: "Lipschitz(1) via MVT — δ = ε works.",
  },
  {
    id: "sinInv",
    name: "f(x) = sin(1/x), x ≠ 0",
    tex: String.raw`f(x) = \sin(1/x)`,
    f: (x) => (x === 0 ? 0 : Math.sin(1 / x)),
    continuous: (x) => x !== 0,
    xDomain: [-0.6, 0.6],
    yRange: [-1.3, 1.3],
    notes: "Oscillates wildly near 0 — no δ works for a = 0.",
  },
  {
    id: "step",
    name: "Heaviside step H(x)",
    tex: String.raw`H(x) = \begin{cases} 0 & x < 0 \\ 1 & x \ge 0 \end{cases}`,
    f: (x) => (x >= 0 ? 1 : 0),
    continuous: (x) => x !== 0,
    xDomain: [-2, 2],
    yRange: [-0.4, 1.4],
    notes: "Jumps at 0 — no neighbourhood maps into a small vertical band.",
  },
  {
    id: "dirichlet",
    name: "Dirichlet (rational indicator)",
    tex: String.raw`\mathbf{1}_{\mathbb{Q}}(x)`,
    f: (x) => {
      // pseudo-rational check: approximate by checking if x * denom is near integer for small denom
      for (let q = 1; q <= 50; q++) {
        if (Math.abs(x * q - Math.round(x * q)) < 1e-6) return 1
      }
      return 0
    },
    continuous: () => false,
    xDomain: [0, 1],
    yRange: [-0.4, 1.4],
    notes: "Discontinuous everywhere — ℚ and ℝ∖ℚ are both dense.",
  },
]

// ε-δ envelope game
function EpsilonDelta() {
  const [id, setId] = useState("quad")
  const [a, setA] = useState(1)
  const [eps, setEps] = useState(0.5)
  const [delta, setDelta] = useState(0.3)
  const [autoDelta, setAutoDelta] = useState(true)
  const svgRef = useRef<SVGSVGElement | null>(null)

  const F = FUNCS.find((f) => f.id === id)!

  const effectiveDelta = autoDelta && F.suggestDelta ? F.suggestDelta(a, eps) : delta

  const W = 760
  const H = 320
  const pad = 32
  const [xa, xb] = F.xDomain
  const [ya, yb] = F.yRange
  const toX = (x: number) => pad + ((x - xa) / (xb - xa)) * (W - 2 * pad)
  const toY = (y: number) => pad + ((yb - y) / (yb - ya)) * (H - 2 * pad)

  // Sample the function along x
  const curve = useMemo(() => {
    const pts: { x: number; y: number }[] = []
    const steps = 600
    for (let i = 0; i <= steps; i++) {
      const x = xa + (i / steps) * (xb - xa)
      const y = F.f(x)
      pts.push({ x, y })
    }
    return pts
  }, [F, xa, xb])

  // Compute whether all f(x) for |x - a| < δ land in (f(a) - ε, f(a) + ε)
  const Fa = F.f(a)
  const check = useMemo(() => {
    const steps = 200
    let minF = Infinity
    let maxF = -Infinity
    for (let i = 0; i <= steps; i++) {
      const x = a - effectiveDelta + (i / steps) * 2 * effectiveDelta
      const y = F.f(x)
      if (y < minF) minF = y
      if (y > maxF) maxF = y
    }
    const within = minF > Fa - eps - 1e-9 && maxF < Fa + eps + 1e-9
    return { within, minF, maxF }
  }, [F, a, effectiveDelta, eps, Fa])

  const handleSvgClick = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!svgRef.current) return
    const r = svgRef.current.getBoundingClientRect()
    const xPx = e.clientX - r.left
    const x = xa + ((xPx - pad) / (W - 2 * pad)) * (xb - xa)
    setA(clamp(x, xa, xb))
  }

  return (
    <Card>
      <p className="text-sm text-neutral-400 mb-3">
        <strong className="text-neutral-200">Continuity at a.</strong>{" "}
        <Tex math="f" /> is continuous at <Tex math="a" /> iff{" "}
        <Tex math={String.raw`\forall \varepsilon > 0,\ \exists \delta > 0:\ |x - a| < \delta \implies |f(x) - f(a)| < \varepsilon`} />
        . Shift a, pick ε, adjust δ — can you fit the graph inside the horizontal
        band?
      </p>

      <div className="flex flex-wrap items-center gap-2 mb-3">
        {FUNCS.map((f) => (
          <button
            key={f.id}
            onClick={() => {
              setId(f.id)
              setA(0)
            }}
            className={`rounded-md border px-3 py-1 text-xs font-mono ${
              id === f.id
                ? "border-indigo-500/60 bg-indigo-500/20 text-indigo-200"
                : "border-neutral-800 text-neutral-400 hover:bg-neutral-900"
            }`}
          >
            {f.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
        <div className="flex items-center gap-2">
          <label className="text-xs text-neutral-500 font-mono w-6">a</label>
          <input
            type="range"
            min={xa}
            max={xb}
            step={(xb - xa) / 1000}
            value={a}
            onChange={(e) => setA(Number(e.target.value))}
            className="flex-1 accent-indigo-400"
          />
          <span className="font-mono text-xs text-neutral-300 w-14 text-right tabular-nums">
            {a.toFixed(3)}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-xs text-neutral-500 font-mono w-6">ε</label>
          <input
            type="range"
            min={0.01}
            max={(yb - ya) / 3}
            step={0.01}
            value={eps}
            onChange={(e) => setEps(Number(e.target.value))}
            className="flex-1 accent-amber-400"
          />
          <span className="font-mono text-xs text-neutral-300 w-14 text-right tabular-nums">
            {eps.toFixed(3)}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-xs text-neutral-500 font-mono w-6">δ</label>
          <input
            type="range"
            min={0.001}
            max={(xb - xa) / 3}
            step={0.001}
            value={effectiveDelta}
            disabled={autoDelta}
            onChange={(e) => setDelta(Number(e.target.value))}
            className="flex-1 accent-emerald-400 disabled:opacity-50"
          />
          <span className="font-mono text-xs text-neutral-300 w-14 text-right tabular-nums">
            {effectiveDelta.toFixed(3)}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3 mb-3 text-xs">
        <label className="inline-flex items-center gap-1 text-neutral-400">
          <input type="checkbox" checked={autoDelta} onChange={(e) => setAutoDelta(e.target.checked)} className="accent-emerald-400" />
          suggest δ automatically
        </label>
        <div className="ml-auto">
          {check.within ? (
            <span className="inline-block rounded-md border border-emerald-500/40 bg-emerald-500/10 px-2 py-0.5 text-emerald-200 font-mono">
              ✓ δ works — (a − δ, a + δ) ↦ within ε
            </span>
          ) : (
            <span className="inline-block rounded-md border border-rose-500/40 bg-rose-500/10 px-2 py-0.5 text-rose-200 font-mono">
              ✗ δ too large — shrink it
            </span>
          )}
        </div>
      </div>

      <div className="rounded-md border border-neutral-800 bg-neutral-950 overflow-hidden">
        <svg
          ref={svgRef}
          width={W}
          height={H}
          className="block max-w-full cursor-crosshair"
          onPointerDown={handleSvgClick}
        >
          {/* axes */}
          <line x1={pad} x2={W - pad} y1={toY(0)} y2={toY(0)} stroke="#52525b" />
          <line x1={toX(0)} x2={toX(0)} y1={pad} y2={H - pad} stroke="#52525b" />

          {/* ε horizontal band */}
          <rect
            x={pad}
            y={toY(Fa + eps)}
            width={W - 2 * pad}
            height={Math.max(2, toY(Fa - eps) - toY(Fa + eps))}
            fill="#fbbf24"
            opacity={0.12}
          />
          <line x1={pad} x2={W - pad} y1={toY(Fa + eps)} y2={toY(Fa + eps)} stroke="#fbbf24" strokeDasharray="3 3" />
          <line x1={pad} x2={W - pad} y1={toY(Fa - eps)} y2={toY(Fa - eps)} stroke="#fbbf24" strokeDasharray="3 3" />

          {/* δ vertical band */}
          <rect
            x={toX(a - effectiveDelta)}
            y={pad}
            width={Math.max(2, toX(a + effectiveDelta) - toX(a - effectiveDelta))}
            height={H - 2 * pad}
            fill="#34d399"
            opacity={0.1}
          />
          <line x1={toX(a - effectiveDelta)} x2={toX(a - effectiveDelta)} y1={pad} y2={H - pad} stroke="#34d399" strokeDasharray="3 3" />
          <line x1={toX(a + effectiveDelta)} x2={toX(a + effectiveDelta)} y1={pad} y2={H - pad} stroke="#34d399" strokeDasharray="3 3" />

          {/* curve */}
          <path
            d={
              "M " +
              curve
                .map((p, i) => {
                  const y = toY(p.y)
                  // Avoid huge jumps for discontinuous
                  if (i === 0) return `${toX(p.x)} ${y}`
                  return `L ${toX(p.x)} ${y}`
                })
                .join(" ")
            }
            fill="none"
            stroke="#a78bfa"
            strokeWidth={1.5}
          />

          {/* image of (a-δ, a+δ) highlighted */}
          {(() => {
            const lo = a - effectiveDelta
            const hi = a + effectiveDelta
            const seg: { x: number; y: number }[] = []
            const steps = 400
            for (let i = 0; i <= steps; i++) {
              const x = lo + (i / steps) * (hi - lo)
              seg.push({ x, y: F.f(x) })
            }
            return (
              <path
                d={"M " + seg.map((p, i) => `${i === 0 ? "" : "L "}${toX(p.x)} ${toY(p.y)}`).join(" ")}
                fill="none"
                stroke={check.within ? "#34d399" : "#f43f5e"}
                strokeWidth={2.5}
              />
            )
          })()}

          {/* a and f(a) markers */}
          <motion.g
            animate={{ cx: toX(a) }}
          >
            <circle cx={toX(a)} cy={toY(Fa)} r={6} fill="#fbbf24" stroke="#0b0d10" strokeWidth={2} />
            <line x1={toX(a)} x2={toX(a)} y1={toY(Fa)} y2={toY(0)} stroke="#fbbf24" strokeDasharray="2 2" opacity={0.5} />
            <text x={toX(a) + 6} y={toY(0) + 14} fontSize="10" fill="#fbbf24" fontFamily="ui-monospace, monospace">
              a = {a.toFixed(2)}
            </text>
            <text x={toX(a) + 6} y={toY(Fa) - 4} fontSize="10" fill="#fbbf24" fontFamily="ui-monospace, monospace">
              f(a) = {Fa.toFixed(2)}
            </text>
          </motion.g>
        </svg>
      </div>

      {F.notes && (
        <p className="mt-3 text-xs text-neutral-500">{F.notes}</p>
      )}
    </Card>
  )
}

// ============ Uniform continuity demo ============
function UniformContinuity() {
  const [id, setId] = useState<"lipschitz" | "quad-bounded" | "quad-unbounded" | "recip">("lipschitz")

  const configs = {
    lipschitz: {
      title: "2x + 1 on ℝ",
      f: (x: number) => 2 * x + 1,
      dom: [-2, 2] as [number, number],
      yr: [-4, 6] as [number, number],
      uniform: true,
      reason: "Lipschitz(2) on all of ℝ — one δ (= ε/2) works everywhere.",
    },
    "quad-bounded": {
      title: "x² on [−2, 2]",
      f: (x: number) => x * x,
      dom: [-2, 2] as [number, number],
      yr: [-0.5, 5] as [number, number],
      uniform: true,
      reason: "Continuous on a compact set ⇒ uniformly continuous (Heine).",
    },
    "quad-unbounded": {
      title: "x² on ℝ",
      f: (x: number) => x * x,
      dom: [-4, 4] as [number, number],
      yr: [-1, 18] as [number, number],
      uniform: false,
      reason: "As |x| grows, the slope grows — no single δ works for all points.",
    },
    recip: {
      title: "1/x on (0, 1]",
      f: (x: number) => 1 / x,
      dom: [0.02, 1.2] as [number, number],
      yr: [0, 40] as [number, number],
      uniform: false,
      reason: "Near 0 the function blows up — δ must shrink as a → 0.",
    },
  } as const

  const c = configs[id]
  const W = 760
  const H = 220
  const pad = 32
  const [xa, xb] = c.dom
  const [ya, yb] = c.yr
  const toX = (x: number) => pad + ((x - xa) / (xb - xa)) * (W - 2 * pad)
  const toY = (y: number) => pad + ((yb - y) / (yb - ya)) * (H - 2 * pad)

  const curve = useMemo(() => {
    const pts: { x: number; y: number }[] = []
    const steps = 400
    for (let i = 0; i <= steps; i++) {
      const x = xa + (i / steps) * (xb - xa)
      pts.push({ x, y: c.f(x) })
    }
    return pts
  }, [c, xa, xb])

  return (
    <Card>
      <p className="text-sm text-neutral-400 mb-3">
        <strong className="text-neutral-200">Uniform continuity.</strong>{" "}
        <Tex math="f" /> is uniformly continuous on <Tex math="A" /> iff{" "}
        <Tex math={String.raw`\forall \varepsilon > 0,\ \exists \delta > 0:\ |x - y| < \delta \implies |f(x) - f(y)| < \varepsilon`} />
        {" "}(the same δ works for all pairs x, y, not just one point).
      </p>

      <div className="flex flex-wrap items-center gap-2 mb-3">
        {(Object.keys(configs) as (keyof typeof configs)[]).map((k) => (
          <button
            key={k}
            onClick={() => setId(k)}
            className={`rounded-md border px-3 py-1 text-xs font-mono ${
              id === k
                ? "border-indigo-500/60 bg-indigo-500/20 text-indigo-200"
                : "border-neutral-800 text-neutral-400 hover:bg-neutral-900"
            }`}
          >
            {configs[k].title}
          </button>
        ))}
      </div>

      <div className="rounded-md border border-neutral-800 bg-neutral-950 overflow-hidden">
        <svg width={W} height={H} className="block max-w-full">
          <line x1={pad} x2={W - pad} y1={toY(0)} y2={toY(0)} stroke="#52525b" />
          <line x1={toX(0)} x2={toX(0)} y1={pad} y2={H - pad} stroke="#52525b" />
          <polyline
            points={curve.map((p) => `${toX(p.x)},${toY(p.y)}`).join(" ")}
            fill="none"
            stroke={c.uniform ? "#34d399" : "#f43f5e"}
            strokeWidth={1.8}
          />
        </svg>
      </div>

      <div className="mt-3 text-xs">
        <span className="font-mono">
          {c.uniform ? (
            <span className="text-emerald-300">uniformly continuous ✓</span>
          ) : (
            <span className="text-rose-300">not uniformly continuous ✗</span>
          )}
        </span>
        <div className="text-neutral-500 mt-1">{c.reason}</div>
      </div>
    </Card>
  )
}

// ============ IVT demo ============
function IVTDemo() {
  const [target, setTarget] = useState(0.5)

  const f = (x: number) => x * x * x - x // between -2 and 2

  const W = 760
  const H = 260
  const pad = 30
  const xa = -2, xb = 2
  const ya = -2, yb = 6
  const toX = (x: number) => pad + ((x - xa) / (xb - xa)) * (W - 2 * pad)
  const toY = (y: number) => pad + ((yb - y) / (yb - ya)) * (H - 2 * pad)

  const curve = useMemo(() => {
    const pts: { x: number; y: number }[] = []
    for (let i = 0; i <= 400; i++) {
      const x = xa + (i / 400) * (xb - xa)
      pts.push({ x, y: f(x) })
    }
    return pts
  }, [])

  // find crossings numerically
  const crossings = useMemo(() => {
    const out: number[] = []
    for (let i = 0; i < curve.length - 1; i++) {
      const y1 = curve[i].y - target
      const y2 = curve[i + 1].y - target
      if (y1 * y2 < 0) {
        const frac = y1 / (y1 - y2)
        out.push(curve[i].x + frac * (curve[i + 1].x - curve[i].x))
      }
    }
    return out
  }, [curve, target])

  return (
    <Card>
      <p className="text-sm text-neutral-400 mb-3">
        <strong className="text-neutral-200">Intermediate value theorem.</strong>{" "}
        If <Tex math="f" /> is continuous on <Tex math="[a, b]" /> and{" "}
        <Tex math="y" /> lies between <Tex math="f(a)" /> and <Tex math="f(b)" />
        , then some <Tex math={String.raw`c \in (a, b)`} /> satisfies{" "}
        <Tex math="f(c) = y" />. Drag the horizontal line; every crossing is a
        solution.
      </p>

      <div className="flex items-center gap-3 mb-3">
        <label className="text-xs text-neutral-500 font-mono">y</label>
        <input
          type="range"
          min={-2}
          max={6}
          step={0.05}
          value={target}
          onChange={(e) => setTarget(Number(e.target.value))}
          className="w-64 accent-amber-400"
        />
        <span className="font-mono text-neutral-300 tabular-nums">{target.toFixed(2)}</span>
        <span className="ml-auto text-xs text-neutral-500 font-mono">
          {crossings.length} solution{crossings.length === 1 ? "" : "s"}
        </span>
      </div>

      <div className="rounded-md border border-neutral-800 bg-neutral-950 overflow-hidden">
        <svg width={W} height={H} className="block max-w-full">
          <line x1={pad} x2={W - pad} y1={toY(0)} y2={toY(0)} stroke="#52525b" />
          <line x1={toX(0)} x2={toX(0)} y1={pad} y2={H - pad} stroke="#52525b" />
          <line x1={pad} x2={W - pad} y1={toY(target)} y2={toY(target)} stroke="#fbbf24" />
          <text x={W - pad - 4} y={toY(target) - 4} textAnchor="end" fontSize="10" fill="#fbbf24" fontFamily="ui-monospace, monospace">
            y = {target.toFixed(2)}
          </text>
          <polyline
            points={curve.map((p) => `${toX(p.x)},${toY(p.y)}`).join(" ")}
            fill="none"
            stroke="#a78bfa"
            strokeWidth={1.8}
          />
          {crossings.map((x, i) => (
            <motion.g key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.05 }}>
              <circle cx={toX(x)} cy={toY(target)} r={5} fill="#34d399" stroke="#0b0d10" strokeWidth={2} />
              <text x={toX(x)} y={toY(target) - 10} textAnchor="middle" fontSize="10" fill="#34d399" fontFamily="ui-monospace, monospace">
                {x.toFixed(3)}
              </text>
            </motion.g>
          ))}
        </svg>
      </div>

      <p className="mt-3 text-xs text-neutral-500">
        Here <Tex math="f(x) = x^3 - x" />, continuous on <Tex math="[-2, 2]" />.
        Every target y in the image is hit — that's a direct consequence of
        continuity + connectedness of the interval.
      </p>
    </Card>
  )
}

// ============ main ============
export default function Continuity() {
  return (
    <TopicShell topic={topic}>
      <Section title="The ε–δ envelope">
        <EpsilonDelta />
      </Section>
      <Section title="Uniform continuity: one δ to rule them all?">
        <UniformContinuity />
      </Section>
      <Section title="Intermediate value theorem">
        <IVTDemo />
      </Section>
    </TopicShell>
  )
}
