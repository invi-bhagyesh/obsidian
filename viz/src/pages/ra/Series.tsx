import { useMemo, useState } from "react"
import { motion } from "framer-motion"
import Tex from "../../components/Tex"
import TopicShell, { Section, Card } from "../../components/TopicShell"
import { TOPICS } from "../../topics"

const topic = TOPICS.find((t) => t.slug === "ra/series")!

// ===== Series samples with closed-form partial sums when available =====
type Series = {
  id: string
  name: string
  tex: string
  a: (n: number) => number
  sum: number | "diverges"
}

const SERIES: Series[] = [
  {
    id: "geom2",
    name: "Σ (1/2)ⁿ",
    tex: String.raw`\sum_{n=1}^\infty (1/2)^n`,
    a: (n) => Math.pow(0.5, n),
    sum: 1,
  },
  {
    id: "geom3",
    name: "Σ (1/3)ⁿ",
    tex: String.raw`\sum_{n=1}^\infty (1/3)^n`,
    a: (n) => Math.pow(1 / 3, n),
    sum: 0.5,
  },
  {
    id: "harm",
    name: "Σ 1/n (harmonic)",
    tex: String.raw`\sum_{n=1}^\infty \frac{1}{n}`,
    a: (n) => 1 / n,
    sum: "diverges",
  },
  {
    id: "p2",
    name: "Σ 1/n²",
    tex: String.raw`\sum_{n=1}^\infty \frac{1}{n^2}`,
    a: (n) => 1 / (n * n),
    sum: Math.PI * Math.PI / 6,
  },
  {
    id: "phalf",
    name: "Σ 1/√n",
    tex: String.raw`\sum_{n=1}^\infty \frac{1}{\sqrt{n}}`,
    a: (n) => 1 / Math.sqrt(n),
    sum: "diverges",
  },
  {
    id: "alt-harm",
    name: "Σ (-1)ⁿ⁺¹ / n",
    tex: String.raw`\sum_{n=1}^\infty \frac{(-1)^{n+1}}{n}`,
    a: (n) => (n % 2 === 1 ? 1 : -1) / n,
    sum: Math.log(2),
  },
  {
    id: "fact",
    name: "Σ 1/n!",
    tex: String.raw`\sum_{n=0}^\infty \frac{1}{n!}`,
    a: (n) => 1 / fact(n - 1),
    sum: Math.E,
  },
]

function fact(n: number): number {
  if (n < 0) return 1
  let r = 1
  for (let i = 1; i <= n; i++) r *= i
  return r
}

// ===== Partial-sum visualizer =====
function PartialSums() {
  const [id, setId] = useState("p2")
  const s = SERIES.find((x) => x.id === id)!
  const [N, setN] = useState(40)

  const partial = useMemo(() => {
    const out: { n: number; S: number; a: number }[] = []
    let S = 0
    for (let n = 1; n <= N; n++) {
      const a = s.a(n)
      S += a
      out.push({ n, S, a })
    }
    return out
  }, [s, N])

  const W = 760
  const H = 260
  const padX = 40
  const padY = 20
  const allY = partial.map((p) => p.S)
  const targetY = typeof s.sum === "number" ? s.sum : null
  let yMin = Math.min(...allY, targetY ?? 0)
  let yMax = Math.max(...allY, targetY ?? 0)
  const pad = (yMax - yMin) * 0.15 + 0.05
  yMin -= pad
  yMax += pad

  const toX = (n: number) => padX + ((n - 1) / (N - 1)) * (W - 2 * padX)
  const toY = (y: number) => padY + ((yMax - y) / (yMax - yMin)) * (H - 2 * padY)

  return (
    <Card>
      <p className="text-sm text-neutral-400 mb-3">
        A series <Tex math={String.raw`\sum a_n`} /> converges iff its partial
        sums <Tex math={String.raw`S_N = \sum_{n=1}^N a_n`} /> converge. Pick a
        series; trace <Tex math="S_N" /> as N grows.
      </p>

      <div className="flex flex-wrap items-center gap-2 mb-3">
        {SERIES.map((x) => (
          <button
            key={x.id}
            onClick={() => setId(x.id)}
            className={`rounded-md border px-3 py-1 text-xs font-mono ${
              id === x.id
                ? "border-indigo-500/60 bg-indigo-500/20 text-indigo-200"
                : "border-neutral-800 text-neutral-400 hover:bg-neutral-900"
            }`}
          >
            {x.name}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-3 mb-3">
        <label className="text-xs text-neutral-500 font-mono">N</label>
        <input
          type="range"
          min={5}
          max={200}
          value={N}
          onChange={(e) => setN(Number(e.target.value))}
          className="w-52 accent-indigo-400"
        />
        <span className="font-mono text-neutral-300">{N}</span>
        <span className="ml-auto text-xs text-neutral-500 font-mono">
          S<sub>{N}</sub> = {partial[partial.length - 1].S.toFixed(6)}
        </span>
      </div>

      <div className="rounded-md border border-neutral-800 bg-neutral-950 overflow-hidden">
        <svg width={W} height={H} className="block max-w-full">
          {targetY !== null && (
            <>
              <line x1={padX} x2={W - padX} y1={toY(targetY)} y2={toY(targetY)} stroke="#34d399" strokeDasharray="4 4" />
              <text x={W - padX - 4} y={toY(targetY) - 4} textAnchor="end" fontSize="10" fill="#34d399" fontFamily="ui-monospace, monospace">
                L = {targetY.toFixed(6)}
              </text>
            </>
          )}
          <line x1={padX} x2={W - padX} y1={H - padY} y2={H - padY} stroke="#52525b" />
          <line x1={padX} x2={padX} y1={padY} y2={H - padY} stroke="#52525b" />
          {/* partial-sum curve */}
          <motion.polyline
            points={partial.map((p) => `${toX(p.n)},${toY(p.S)}`).join(" ")}
            fill="none"
            stroke="#a78bfa"
            strokeWidth={1.5}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.6 }}
          />
          {partial.map((p) => (
            <circle key={p.n} cx={toX(p.n)} cy={toY(p.S)} r={2} fill="#a78bfa" />
          ))}
          {[1, Math.floor(N / 4), Math.floor(N / 2), Math.floor((3 * N) / 4), N].map((n) => (
            <g key={n}>
              <line x1={toX(n)} x2={toX(n)} y1={H - padY} y2={H - padY + 3} stroke="#52525b" />
              <text x={toX(n)} y={H - padY + 14} textAnchor="middle" fontSize="9" fill="#71717a" fontFamily="ui-monospace, monospace">
                {n}
              </text>
            </g>
          ))}
        </svg>
      </div>

      <div className="mt-3 text-xs font-mono text-neutral-400">
        verdict:{" "}
        {s.sum === "diverges" ? (
          <span className="text-rose-300">diverges</span>
        ) : (
          <span className="text-emerald-300">converges to {s.sum.toFixed(6)}</span>
        )}
      </div>
    </Card>
  )
}

// ===== Test runner =====
type TestResult = "converges" | "diverges" | "inconclusive"

function runComparison(id: string): TestResult {
  // Compare to 1/n^p benchmark
  const s = SERIES.find((x) => x.id === id)!
  if (s.id === "geom2" || s.id === "geom3" || s.id === "fact") return "converges"
  if (s.id === "harm") return "diverges"
  if (s.id === "p2") return "converges"
  if (s.id === "phalf") return "diverges"
  if (s.id === "alt-harm") return "inconclusive" // absolute comparison fails
  return "inconclusive"
}

function runRatio(id: string): { result: TestResult; L: number | null } {
  const s = SERIES.find((x) => x.id === id)!
  // compute |a_{n+1}/a_n| at large n
  const N = 1000
  const aN = Math.abs(s.a(N))
  const aN1 = Math.abs(s.a(N + 1))
  if (aN === 0) return { result: "inconclusive", L: null }
  const L = aN1 / aN
  if (L < 1 - 1e-6) return { result: "converges", L }
  if (L > 1 + 1e-6) return { result: "diverges", L }
  return { result: "inconclusive", L }
}

function runRoot(id: string): { result: TestResult; L: number | null } {
  const s = SERIES.find((x) => x.id === id)!
  const N = 500
  const val = Math.abs(s.a(N))
  if (val <= 0) return { result: "inconclusive", L: null }
  const L = Math.pow(val, 1 / N)
  if (L < 1 - 1e-6) return { result: "converges", L }
  if (L > 1 + 1e-6) return { result: "diverges", L }
  return { result: "inconclusive", L }
}

function runIntegral(id: string): TestResult {
  // Only meaningful when a_n = f(n) for positive, decreasing f. Hard-code
  // classical p-series interpretation
  if (id === "harm") return "diverges"
  if (id === "p2") return "converges"
  if (id === "phalf") return "diverges"
  return "inconclusive"
}

function runAlternating(id: string): TestResult {
  // Leibniz test: a_n decreases to 0, alternating sign
  if (id === "alt-harm") return "converges"
  return "inconclusive"
}

function TestBench() {
  const [id, setId] = useState("p2")
  const s = SERIES.find((x) => x.id === id)!

  const comp = runComparison(id)
  const ratio = runRatio(id)
  const root = runRoot(id)
  const integ = runIntegral(id)
  const alt = runAlternating(id)

  const rows: { name: string; res: TestResult; info?: string }[] = [
    { name: "comparison (vs geometric / p-series)", res: comp },
    { name: "ratio test", res: ratio.result, info: ratio.L !== null ? `L = ${ratio.L.toFixed(4)}` : undefined },
    { name: "root test", res: root.result, info: root.L !== null ? `L = ${root.L.toFixed(4)}` : undefined },
    { name: "integral test", res: integ, info: "positive decreasing only" },
    { name: "Leibniz (alternating)", res: alt, info: "alternating only" },
  ]

  return (
    <Card>
      <p className="text-sm text-neutral-400 mb-3">
        Each test has a scope. Switch the series — see which tests decide it,
        which are inconclusive, and which simply don't apply.
      </p>

      <div className="flex flex-wrap items-center gap-2 mb-3">
        {SERIES.map((x) => (
          <button
            key={x.id}
            onClick={() => setId(x.id)}
            className={`rounded-md border px-3 py-1 text-xs font-mono ${
              id === x.id
                ? "border-indigo-500/60 bg-indigo-500/20 text-indigo-200"
                : "border-neutral-800 text-neutral-400 hover:bg-neutral-900"
            }`}
          >
            {x.name}
          </button>
        ))}
      </div>

      <div className="mb-3 rounded-md border border-neutral-800 bg-neutral-950 p-3">
        <Tex block math={s.tex} />
        <div className="text-xs text-neutral-500 mt-2">
          actual behavior:{" "}
          {s.sum === "diverges" ? (
            <span className="text-rose-300 font-mono">diverges</span>
          ) : (
            <span className="text-emerald-300 font-mono">
              converges to {s.sum.toFixed(6)}
            </span>
          )}
        </div>
      </div>

      <div className="overflow-x-auto rounded-md border border-neutral-800 bg-neutral-950">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-xs text-neutral-500 border-b border-neutral-800">
              <th className="px-3 py-2 text-left font-normal">test</th>
              <th className="px-3 py-2 text-left font-normal">verdict</th>
              <th className="px-3 py-2 text-left font-normal">info</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.name} className="border-b border-neutral-800/60 last:border-0">
                <td className="px-3 py-2 font-mono text-neutral-300">{r.name}</td>
                <td className="px-3 py-2">
                  <Verdict v={r.res} />
                </td>
                <td className="px-3 py-2 text-xs text-neutral-500 font-mono">{r.info || ""}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-3 text-xs text-neutral-500">
        Ratio / root give <Tex math={String.raw`L = \lim |a_{n+1}/a_n|`} /> or{" "}
        <Tex math={String.raw`L = \lim |a_n|^{1/n}`} />.{" "}
        <Tex math="L < 1" /> ⇒ converges (absolutely), <Tex math="L > 1" /> ⇒
        diverges, <Tex math="L = 1" /> is inconclusive.
      </p>
    </Card>
  )
}

function Verdict({ v }: { v: TestResult }) {
  const map = {
    converges: "border-emerald-500/40 bg-emerald-500/10 text-emerald-200",
    diverges: "border-rose-500/40 bg-rose-500/10 text-rose-200",
    inconclusive: "border-neutral-800 bg-neutral-900 text-neutral-400",
  }[v]
  return (
    <span className={`inline-block rounded-md border px-2 py-0.5 text-xs font-mono ${map}`}>
      {v}
    </span>
  )
}

// ===== p-series slider =====
function PSeries() {
  const [p, setP] = useState(2)
  const N = 200
  const partials = useMemo(() => {
    const out: number[] = []
    let s = 0
    for (let n = 1; n <= N; n++) {
      s += 1 / Math.pow(n, p)
      out.push(s)
    }
    return out
  }, [p])

  const W = 760
  const H = 220
  const padX = 40
  const padY = 20
  const yMax = Math.max(...partials) + 0.2
  const yMin = 0
  const toX = (n: number) => padX + ((n - 1) / (N - 1)) * (W - 2 * padX)
  const toY = (y: number) => padY + ((yMax - y) / (yMax - yMin)) * (H - 2 * padY)
  const last = partials[partials.length - 1]

  const verdict = p > 1 ? "converges" : "diverges"

  return (
    <Card>
      <p className="text-sm text-neutral-400 mb-3">
        <strong className="text-neutral-200">p-series.</strong>{" "}
        <Tex math={String.raw`\sum_{n=1}^\infty \frac{1}{n^p}`} /> converges iff{" "}
        <Tex math="p > 1" />. Drag p across 1 to watch the regime change.
      </p>

      <div className="flex items-center gap-3 mb-3">
        <label className="text-xs text-neutral-500 font-mono">p</label>
        <input
          type="range"
          min={0.1}
          max={3}
          step={0.01}
          value={p}
          onChange={(e) => setP(Number(e.target.value))}
          className="w-64 accent-emerald-400"
        />
        <span className="font-mono text-neutral-300 tabular-nums">{p.toFixed(2)}</span>
        <span className="ml-auto font-mono text-xs">
          {verdict === "converges" ? (
            <span className="text-emerald-300">converges</span>
          ) : (
            <span className="text-rose-300">diverges</span>
          )}
        </span>
      </div>

      <div className="rounded-md border border-neutral-800 bg-neutral-950 overflow-hidden">
        <svg width={W} height={H} className="block max-w-full">
          <line x1={padX} x2={W - padX} y1={H - padY} y2={H - padY} stroke="#52525b" />
          <line x1={padX} x2={padX} y1={padY} y2={H - padY} stroke="#52525b" />
          <polyline
            points={partials.map((v, i) => `${toX(i + 1)},${toY(v)}`).join(" ")}
            fill="none"
            stroke={verdict === "converges" ? "#34d399" : "#f43f5e"}
            strokeWidth={1.5}
          />
          <text x={W - padX - 4} y={padY + 12} textAnchor="end" fontSize="10" fill="#71717a" fontFamily="ui-monospace, monospace">
            S<tspan baselineShift="sub" fontSize="8">{N}</tspan> = {last.toFixed(4)}
          </text>
        </svg>
      </div>
    </Card>
  )
}

// ===== Main =====
export default function Series() {
  return (
    <TopicShell topic={topic}>
      <Section title="Partial sums">
        <PartialSums />
      </Section>
      <Section title="Run the tests">
        <TestBench />
      </Section>
      <Section title="The p-series threshold">
        <PSeries />
      </Section>
    </TopicShell>
  )
}
