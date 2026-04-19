import { useMemo, useState } from "react"
import { motion } from "framer-motion"
import Tex from "../../components/Tex"
import TopicShell, { Section, Card } from "../../components/TopicShell"
import { TOPICS } from "../../topics"

const topic = TOPICS.find((t) => t.slug === "ra/differentiation")!

// ============ Secant → tangent ============
function SecantTangent() {
  const [a, setA] = useState(1.0)
  const [h, setH] = useState(0.8)

  const f = (x: number) => 0.5 * x * x * x - x + 1
  const fp = (x: number) => 1.5 * x * x - 1

  const W = 760
  const H = 300
  const pad = 30
  const xa = -2.4
  const xb = 2.4
  const ya = -3
  const yb = 5

  const toX = (x: number) => pad + ((x - xa) / (xb - xa)) * (W - 2 * pad)
  const toY = (y: number) => pad + ((yb - y) / (yb - ya)) * (H - 2 * pad)

  const curve = useMemo(() => {
    const pts: [number, number][] = []
    for (let i = 0; i <= 400; i++) {
      const x = xa + (i / 400) * (xb - xa)
      pts.push([x, f(x)])
    }
    return pts
  }, [])

  const fa = f(a)
  const fah = f(a + h)
  const secantSlope = (fah - fa) / h
  const tangentSlope = fp(a)

  // secant line: extend endpoints across plot
  const secY = (x: number) => fa + secantSlope * (x - a)
  const tanY = (x: number) => fa + tangentSlope * (x - a)

  return (
    <Card>
      <p className="text-sm text-neutral-400 mb-3">
        <strong className="text-neutral-200">Derivative = limit of secants.</strong>{" "}
        <Tex math={String.raw`f'(a) = \lim_{h \to 0} \frac{f(a+h) - f(a)}{h}`} />.
        Shrink h → 0; the secant through <Tex math="(a, f(a))" /> and{" "}
        <Tex math="(a+h, f(a+h))" /> rotates into the tangent.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
        <div className="flex items-center gap-2">
          <label className="text-xs text-neutral-500 font-mono w-6">a</label>
          <input
            type="range"
            min={xa + 0.2}
            max={xb - 0.2}
            step={0.01}
            value={a}
            onChange={(e) => setA(Number(e.target.value))}
            className="flex-1 accent-indigo-400"
          />
          <span className="font-mono text-xs text-neutral-300 w-14 text-right tabular-nums">
            {a.toFixed(2)}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-xs text-neutral-500 font-mono w-6">h</label>
          <input
            type="range"
            min={0.001}
            max={1.5}
            step={0.001}
            value={h}
            onChange={(e) => setH(Number(e.target.value))}
            className="flex-1 accent-amber-400"
          />
          <span className="font-mono text-xs text-neutral-300 w-14 text-right tabular-nums">
            {h.toFixed(3)}
          </span>
        </div>
      </div>

      <div className="rounded-md border border-neutral-800 bg-neutral-950 overflow-hidden">
        <svg width={W} height={H} className="block max-w-full">
          <line x1={pad} x2={W - pad} y1={toY(0)} y2={toY(0)} stroke="#52525b" />
          <line x1={toX(0)} x2={toX(0)} y1={pad} y2={H - pad} stroke="#52525b" />

          <polyline
            points={curve.map(([x, y]) => `${toX(x)},${toY(y)}`).join(" ")}
            fill="none"
            stroke="#a78bfa"
            strokeWidth={1.8}
          />

          {/* tangent (long dashed) */}
          <line
            x1={toX(xa)}
            y1={toY(tanY(xa))}
            x2={toX(xb)}
            y2={toY(tanY(xb))}
            stroke="#34d399"
            strokeWidth={1.2}
            strokeDasharray="6 4"
          />

          {/* secant */}
          <line
            x1={toX(xa)}
            y1={toY(secY(xa))}
            x2={toX(xb)}
            y2={toY(secY(xb))}
            stroke="#fbbf24"
            strokeWidth={1.5}
          />

          {/* points */}
          <circle cx={toX(a)} cy={toY(fa)} r={5} fill="#fbbf24" stroke="#0b0d10" strokeWidth={2} />
          <circle cx={toX(a + h)} cy={toY(fah)} r={5} fill="#fbbf24" stroke="#0b0d10" strokeWidth={2} />

          {/* slope triangle */}
          <line x1={toX(a)} x2={toX(a + h)} y1={toY(fa)} y2={toY(fa)} stroke="#fbbf24" opacity={0.4} strokeDasharray="2 2" />
          <line x1={toX(a + h)} x2={toX(a + h)} y1={toY(fa)} y2={toY(fah)} stroke="#fbbf24" opacity={0.4} strokeDasharray="2 2" />
        </svg>
      </div>

      <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
        <Stat label="f(a)" value={fa.toFixed(4)} color="indigo" />
        <Stat label="f(a + h)" value={fah.toFixed(4)} color="indigo" />
        <Stat label="secant slope" value={secantSlope.toFixed(4)} color="amber" />
        <Stat label="f'(a) (exact)" value={tangentSlope.toFixed(4)} color="emerald" />
      </div>

      <p className="mt-3 text-xs text-neutral-500">
        As h shrinks, the amber secant rotates toward the green tangent. The
        difference <Tex math={String.raw`|\text{secant slope} - f'(a)| \to 0`} /> is
        the content of the definition.
      </p>
    </Card>
  )
}

// ============ MVT demo ============
function MVT() {
  const [id, setId] = useState("cubic")

  const funcs = {
    cubic: { f: (x: number) => x * x * x - x, fp: (x: number) => 3 * x * x - 1, dom: [-1.5, 1.7] },
    sin: { f: (x: number) => Math.sin(x) + 0.5 * x, fp: (x: number) => Math.cos(x) + 0.5, dom: [0, Math.PI * 1.4] },
    exp: { f: (x: number) => Math.exp(0.6 * x) - 1, fp: (x: number) => 0.6 * Math.exp(0.6 * x), dom: [-1, 2] },
  } as const

  const { f, fp, dom } = funcs[id as keyof typeof funcs]
  const [A, B] = dom
  const [xa, xb] = [A, B]
  const fA = f(A)
  const fB = f(B)
  const meanSlope = (fB - fA) / (B - A)

  // Find c in (A, B) with f'(c) = mean slope via bisection on fp(x) - meanSlope changing sign
  const c = useMemo(() => {
    const samples = 2000
    let best: { x: number; diff: number } = { x: A, diff: Infinity }
    for (let i = 1; i < samples; i++) {
      const x = A + (i / samples) * (B - A)
      const d = Math.abs(fp(x) - meanSlope)
      if (d < best.diff) best = { x, diff: d }
    }
    return best.x
  }, [id, A, B, meanSlope])

  const W = 760
  const H = 300
  const pad = 30
  const ya = Math.min(fA, fB, f(c)) - 1
  const yb = Math.max(fA, fB, f(c)) + 1
  const toX = (x: number) => pad + ((x - xa) / (xb - xa)) * (W - 2 * pad)
  const toY = (y: number) => pad + ((yb - y) / (yb - ya)) * (H - 2 * pad)

  const curve = useMemo(() => {
    const pts: [number, number][] = []
    for (let i = 0; i <= 400; i++) {
      const x = xa + (i / 400) * (xb - xa)
      pts.push([x, f(x)])
    }
    return pts
  }, [id])

  const fc = f(c)
  // Tangent at c
  const tanLine = (x: number) => fc + fp(c) * (x - c)

  return (
    <Card>
      <p className="text-sm text-neutral-400 mb-3">
        <strong className="text-neutral-200">Mean Value Theorem.</strong> If f is
        continuous on <Tex math="[a, b]" /> and differentiable on{" "}
        <Tex math="(a, b)" />, then there exists{" "}
        <Tex math={String.raw`c \in (a, b)`} /> with{" "}
        <Tex math={String.raw`f'(c) = \frac{f(b) - f(a)}{b - a}`} /> — some
        tangent is parallel to the chord <Tex math="AB" />.
      </p>

      <div className="flex flex-wrap items-center gap-2 mb-3">
        {(["cubic", "sin", "exp"] as const).map((k) => (
          <button
            key={k}
            onClick={() => setId(k)}
            className={`rounded-md border px-3 py-1 text-xs font-mono ${
              id === k
                ? "border-indigo-500/60 bg-indigo-500/20 text-indigo-200"
                : "border-neutral-800 text-neutral-400 hover:bg-neutral-900"
            }`}
          >
            {k}
          </button>
        ))}
      </div>

      <div className="rounded-md border border-neutral-800 bg-neutral-950 overflow-hidden">
        <svg width={W} height={H} className="block max-w-full">
          <line x1={pad} x2={W - pad} y1={toY(0)} y2={toY(0)} stroke="#52525b" />

          <polyline
            points={curve.map(([x, y]) => `${toX(x)},${toY(y)}`).join(" ")}
            fill="none"
            stroke="#a78bfa"
            strokeWidth={1.8}
          />
          {/* chord */}
          <line x1={toX(A)} y1={toY(fA)} x2={toX(B)} y2={toY(fB)} stroke="#fbbf24" strokeWidth={1.5} />
          {/* tangent at c */}
          <line
            x1={toX(xa)}
            y1={toY(tanLine(xa))}
            x2={toX(xb)}
            y2={toY(tanLine(xb))}
            stroke="#34d399"
            strokeWidth={1.4}
            strokeDasharray="5 4"
          />

          <circle cx={toX(A)} cy={toY(fA)} r={5} fill="#fbbf24" stroke="#0b0d10" strokeWidth={2} />
          <circle cx={toX(B)} cy={toY(fB)} r={5} fill="#fbbf24" stroke="#0b0d10" strokeWidth={2} />
          <motion.circle
            cx={toX(c)}
            cy={toY(fc)}
            r={6}
            fill="#34d399"
            stroke="#0b0d10"
            strokeWidth={2}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
          />
          <text x={toX(A)} y={toY(fA) - 8} textAnchor="middle" fontSize="10" fill="#fbbf24" fontFamily="ui-monospace, monospace">
            A
          </text>
          <text x={toX(B)} y={toY(fB) - 8} textAnchor="middle" fontSize="10" fill="#fbbf24" fontFamily="ui-monospace, monospace">
            B
          </text>
          <text x={toX(c) + 6} y={toY(fc) - 6} fontSize="10" fill="#34d399" fontFamily="ui-monospace, monospace">
            c = {c.toFixed(3)}
          </text>
        </svg>
      </div>

      <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
        <Stat label="chord slope" value={meanSlope.toFixed(4)} color="amber" />
        <Stat label="f'(c)" value={fp(c).toFixed(4)} color="emerald" />
        <Stat label="c" value={c.toFixed(4)} color="indigo" />
      </div>
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
  color: "indigo" | "amber" | "emerald"
}) {
  const cls = {
    indigo: "border-indigo-500/40 bg-indigo-500/10 text-indigo-200",
    amber: "border-amber-500/40 bg-amber-500/10 text-amber-200",
    emerald: "border-emerald-500/40 bg-emerald-500/10 text-emerald-200",
  }[color]
  return (
    <div className={`rounded-md border px-3 py-2 font-mono ${cls}`}>
      <div className="text-[10px] uppercase tracking-wider opacity-70">{label}</div>
      <div className="mt-0.5 text-sm">{value}</div>
    </div>
  )
}

// ============ Rolle ============
function RolleDemo() {
  const [a, setA] = useState(-1.5)
  const [b, setB] = useState(1.5)

  // f(x) = (x-a)(x-b) * g(x) where g is smooth and nonzero; pick a simple h(x) = cos(x) * (x - a)(x - b)
  // For Rolle we just need f(a) = f(b). Build f(x) = sin(π (x - a)/(b - a))
  const f = (x: number) => Math.sin((Math.PI * (x - a)) / (b - a))

  const W = 760
  const H = 220
  const pad = 30
  const xa = a - 0.4
  const xb = b + 0.4
  const ya = -1.2
  const yb = 1.2
  const toX = (x: number) => pad + ((x - xa) / (xb - xa)) * (W - 2 * pad)
  const toY = (y: number) => pad + ((yb - y) / (yb - ya)) * (H - 2 * pad)

  const curve = useMemo(() => {
    const pts: [number, number][] = []
    for (let i = 0; i <= 400; i++) {
      const x = xa + (i / 400) * (xb - xa)
      pts.push([x, f(x)])
    }
    return pts
  }, [a, b])

  // critical points: fp(x) = 0 ⇒ cos = 0 ⇒ π(x-a)/(b-a) = π/2 + kπ
  const critical = useMemo(() => {
    const out: number[] = []
    for (let k = -5; k < 5; k++) {
      const x = a + ((b - a) / Math.PI) * (Math.PI / 2 + k * Math.PI)
      if (x > a + 1e-6 && x < b - 1e-6) out.push(x)
    }
    return out
  }, [a, b])

  return (
    <Card>
      <p className="text-sm text-neutral-400 mb-3">
        <strong className="text-neutral-200">Rolle's theorem.</strong> If f is
        continuous on <Tex math="[a, b]" />, differentiable on{" "}
        <Tex math="(a, b)" />, and <Tex math="f(a) = f(b)" />, then some{" "}
        <Tex math={String.raw`c \in (a, b)`} /> has <Tex math="f'(c) = 0" />.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
        <div className="flex items-center gap-2">
          <label className="text-xs text-neutral-500 font-mono w-6">a</label>
          <input
            type="range"
            min={-3}
            max={0.5}
            step={0.01}
            value={a}
            onChange={(e) => setA(Number(e.target.value))}
            className="flex-1 accent-indigo-400"
          />
          <span className="font-mono text-xs text-neutral-300 w-14 text-right tabular-nums">
            {a.toFixed(2)}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-xs text-neutral-500 font-mono w-6">b</label>
          <input
            type="range"
            min={0.6}
            max={3}
            step={0.01}
            value={b}
            onChange={(e) => setB(Number(e.target.value))}
            className="flex-1 accent-indigo-400"
          />
          <span className="font-mono text-xs text-neutral-300 w-14 text-right tabular-nums">
            {b.toFixed(2)}
          </span>
        </div>
      </div>

      <div className="rounded-md border border-neutral-800 bg-neutral-950 overflow-hidden">
        <svg width={W} height={H} className="block max-w-full">
          <line x1={pad} x2={W - pad} y1={toY(0)} y2={toY(0)} stroke="#52525b" />
          <polyline points={curve.map(([x, y]) => `${toX(x)},${toY(y)}`).join(" ")} fill="none" stroke="#a78bfa" strokeWidth={1.8} />
          <line x1={toX(a)} x2={toX(b)} y1={toY(0)} y2={toY(0)} stroke="#fbbf24" strokeDasharray="4 4" />

          <circle cx={toX(a)} cy={toY(0)} r={5} fill="#fbbf24" stroke="#0b0d10" strokeWidth={2} />
          <circle cx={toX(b)} cy={toY(0)} r={5} fill="#fbbf24" stroke="#0b0d10" strokeWidth={2} />

          {critical.map((x, i) => (
            <motion.g
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.06 }}
            >
              {/* horizontal tangent */}
              <line x1={toX(x) - 35} x2={toX(x) + 35} y1={toY(f(x))} y2={toY(f(x))} stroke="#34d399" strokeDasharray="3 3" />
              <circle cx={toX(x)} cy={toY(f(x))} r={5} fill="#34d399" stroke="#0b0d10" strokeWidth={2} />
              <text x={toX(x)} y={toY(f(x)) + (f(x) > 0 ? -9 : 18)} textAnchor="middle" fontSize="10" fill="#34d399" fontFamily="ui-monospace, monospace">
                c={x.toFixed(2)}
              </text>
            </motion.g>
          ))}
        </svg>
      </div>

      <p className="mt-3 text-xs text-neutral-500">
        Rolle is the MVT specialized to <Tex math="f(a) = f(b)" />. Here we use{" "}
        <Tex math={String.raw`f(x) = \sin\!\left(\frac{\pi(x-a)}{b-a}\right)`} /> so{" "}
        <Tex math="f(a) = f(b) = 0" /> identically — critical points show as
        horizontal tangents.
      </p>
    </Card>
  )
}

export default function Differentiation() {
  return (
    <TopicShell topic={topic}>
      <Section title="Secants rotating into tangents">
        <SecantTangent />
      </Section>
      <Section title="Mean Value Theorem">
        <MVT />
      </Section>
      <Section title="Rolle's theorem">
        <RolleDemo />
      </Section>
    </TopicShell>
  )
}
