import { useEffect, useMemo, useRef, useState } from "react"
import Tex from "../../components/Tex"
import { motion, AnimatePresence } from "framer-motion"
import { Play, Pause, RotateCcw } from "lucide-react"
import TopicShell, { Section, Card } from "../../components/TopicShell"
import { TOPICS } from "../../topics"

const topic = TOPICS.find((t) => t.slug === "ra/real-numbers")!

// ---------- Field / Order axioms ----------
const AXIOMS: {
  id: string
  name: string
  tex: (a: string, b: string, c: string) => string
  check: (a: number, b: number, c: number) => boolean
}[] = [
  {
    id: "add-comm",
    name: "Additive commutativity",
    tex: (a, b) => `${a}+${b} = ${b}+${a}`,
    check: (a, b) => near(a + b, b + a),
  },
  {
    id: "add-assoc",
    name: "Additive associativity",
    tex: (a, b, c) => `(${a}+${b})+${c} = ${a}+(${b}+${c})`,
    check: (a, b, c) => near(a + b + c, a + (b + c)),
  },
  {
    id: "mul-comm",
    name: "Multiplicative commutativity",
    tex: (a, b) => `${a}\\cdot${b} = ${b}\\cdot${a}`,
    check: (a, b) => near(a * b, b * a),
  },
  {
    id: "distrib",
    name: "Distributivity",
    tex: (a, b, c) => `${a}(${b}+${c}) = ${a}\\cdot${b} + ${a}\\cdot${c}`,
    check: (a, b, c) => near(a * (b + c), a * b + a * c),
  },
  {
    id: "add-inv",
    name: "Additive inverse",
    tex: (a) => `${a}+(-${a}) = 0`,
    check: (a) => near(a + -a, 0),
  },
  {
    id: "mul-inv",
    name: "Multiplicative inverse (a ≠ 0)",
    tex: (a) => `${a}\\cdot${a}^{-1} = 1`,
    check: (a) => (a === 0 ? true : near(a * (1 / a), 1)),
  },
  {
    id: "trichotomy",
    name: "Order trichotomy",
    tex: (a, b) =>
      `\\text{exactly one of } ${a}<${b},\\ ${a}=${b},\\ ${a}>${b}`,
    check: (a, b) => {
      const lt = a < b, eq = a === b, gt = a > b
      return [lt, eq, gt].filter(Boolean).length === 1
    },
  },
]
function near(x: number, y: number, eps = 1e-9) {
  return Math.abs(x - y) < eps
}
function fmt(n: number) {
  if (!isFinite(n)) return "—"
  if (Math.abs(n) < 1e-12) return "0"
  return Number(n.toPrecision(6)).toString()
}

function AxiomExplorer() {
  const [a, setA] = useState(2)
  const [b, setB] = useState(3)
  const [c, setC] = useState(5)
  return (
    <Card>
      <div className="grid grid-cols-3 gap-3 mb-4">
        {[
          ["a", a, setA],
          ["b", b, setB],
          ["c", c, setC],
        ].map(([label, val, set]) => (
          <label key={label as string} className="block">
            <span className="text-xs text-neutral-500 font-mono">
              {label as string}
            </span>
            <input
              type="number"
              value={val as number}
              onChange={(e) =>
                (set as (n: number) => void)(Number(e.target.value))
              }
              className="mt-1 w-full rounded-md bg-neutral-950 border border-neutral-800 px-3 py-1.5 text-sm font-mono focus:outline-none focus:border-neutral-500"
              step="any"
            />
          </label>
        ))}
      </div>
      <ul className="divide-y divide-neutral-800">
        {AXIOMS.map((ax) => {
          const ok = ax.check(a, b, c)
          return (
            <li
              key={ax.id}
              className="flex items-center gap-3 py-2.5 text-sm"
            >
              <span
                className={`h-2 w-2 rounded-full ${
                  ok ? "bg-emerald-400" : "bg-rose-400"
                }`}
              />
              <div className="flex-1">
                <div className="text-neutral-200">{ax.name}</div>
                <div className="text-neutral-500 text-xs mt-0.5">
                  <Tex math={ax.tex(fmt(a), fmt(b), fmt(c))} />
                </div>
              </div>
              <span
                className={`text-xs font-mono ${
                  ok ? "text-emerald-400" : "text-rose-400"
                }`}
              >
                {ok ? "holds" : "fails"}
              </span>
            </li>
          )
        })}
      </ul>
      <p className="mt-4 text-xs text-neutral-500">
        Try <code className="text-neutral-300">a = 0</code> to see the
        multiplicative inverse axiom's precondition.
      </p>
    </Card>
  )
}

// ---------- Density of ℚ in ℝ ----------
function rationalBetween(
  lo: number,
  hi: number,
  maxDen = 10000,
): { p: number; q: number } | null {
  // Find the rational p/q with smallest q in (lo, hi).
  for (let q = 1; q <= maxDen; q++) {
    const p = Math.ceil(lo * q + 1e-12)
    if (p / q > lo && p / q < hi) return { p, q }
  }
  return null
}

function DensityDemo() {
  const [lo, setLo] = useState(Math.SQRT2)
  const [hi, setHi] = useState(Math.SQRT2 + 0.01)
  const rat = useMemo(() => rationalBetween(lo, hi), [lo, hi])
  const width = 760
  const height = 90

  // viewport around [lo, hi] with padding
  const span = hi - lo
  const pad = Math.max(span * 5, 0.0005)
  const vlo = lo - pad
  const vhi = hi + pad
  const xOf = (x: number) => ((x - vlo) / (vhi - vlo)) * width

  return (
    <Card>
      <p className="text-sm text-neutral-400 mb-4">
        <strong className="text-neutral-200">Density.</strong> Between any two
        reals, however close, there's always a rational. Pick an interval:
      </p>
      <div className="grid grid-cols-2 gap-3 mb-4">
        <label className="block">
          <span className="text-xs text-neutral-500 font-mono">lo</span>
          <input
            type="number"
            value={lo}
            step="any"
            onChange={(e) => setLo(Number(e.target.value))}
            className="mt-1 w-full rounded-md bg-neutral-950 border border-neutral-800 px-3 py-1.5 text-sm font-mono"
          />
        </label>
        <label className="block">
          <span className="text-xs text-neutral-500 font-mono">hi</span>
          <input
            type="number"
            value={hi}
            step="any"
            onChange={(e) => setHi(Number(e.target.value))}
            className="mt-1 w-full rounded-md bg-neutral-950 border border-neutral-800 px-3 py-1.5 text-sm font-mono"
          />
        </label>
      </div>
      <div className="overflow-x-auto">
        <svg
          width={width}
          height={height}
          className="block max-w-full"
        >
          {/* axis */}
          <line
            x1={0}
            y1={height / 2}
            x2={width}
            y2={height / 2}
            stroke="#404040"
          />
          {/* interval band */}
          {lo < hi && (
            <rect
              x={xOf(lo)}
              y={height / 2 - 18}
              width={xOf(hi) - xOf(lo)}
              height={36}
              fill="rgba(56,189,248,0.12)"
              stroke="rgba(56,189,248,0.4)"
            />
          )}
          {/* lo / hi ticks */}
          {[lo, hi].map((x, i) => (
            <g key={i}>
              <line
                x1={xOf(x)}
                y1={height / 2 - 22}
                x2={xOf(x)}
                y2={height / 2 + 22}
                stroke="#7dd3fc"
              />
              <text
                x={xOf(x)}
                y={i === 0 ? 14 : height - 4}
                textAnchor="middle"
                fontSize="11"
                fill="#9ca3af"
                fontFamily="ui-monospace, monospace"
              >
                {fmt(x)}
              </text>
            </g>
          ))}
          {/* rational */}
          {rat && (
            <motion.g
              key={`${rat.p}/${rat.q}`}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
            >
              <circle
                cx={xOf(rat.p / rat.q)}
                cy={height / 2}
                r={6}
                fill="#fbbf24"
                stroke="#0b0d10"
                strokeWidth={2}
              />
            </motion.g>
          )}
        </svg>
      </div>
      <div className="mt-4 text-sm">
        {rat ? (
          <div className="text-neutral-300">
            Smallest-denominator rational in the interval:{" "}
            <span className="font-mono text-amber-300">
              <Tex math={String.raw`\frac{${rat.p}}{${rat.q}} = ${fmt(rat.p / rat.q)}`} />
            </span>
          </div>
        ) : (
          <div className="text-neutral-500">
            No rational found with denominator ≤ 10 000 — try a wider interval.
          </div>
        )}
      </div>
    </Card>
  )
}

// ---------- Completeness fails in ℚ (Babylonian sqrt(2)) ----------
type Term = { p: bigint; q: bigint }
function babylonianStep(t: Term): Term {
  // x_{n+1} = (x_n + 2/x_n) / 2, done with exact rationals
  // x = p/q  =>  next = (p/q + 2q/p)/2 = (p^2 + 2q^2) / (2pq)
  const num = t.p * t.p + 2n * t.q * t.q
  const den = 2n * t.p * t.q
  const g = bigGcd(num < 0n ? -num : num, den < 0n ? -den : den)
  return { p: num / g, q: den / g }
}
function bigGcd(a: bigint, b: bigint): bigint {
  while (b) {
    ;[a, b] = [b, a % b]
  }
  return a || 1n
}
function toFloat(t: Term) {
  return Number(t.p) / Number(t.q)
}
function digitsOfTerm(t: Term, digits = 30): string {
  // long division-ish to `digits` decimal places
  let p = t.p < 0n ? -t.p : t.p
  const q = t.q
  const sign = t.p < 0n ? "-" : ""
  const intPart = p / q
  let rem = p % q
  let out = sign + intPart.toString() + "."
  for (let i = 0; i < digits; i++) {
    rem *= 10n
    out += (rem / q).toString()
    rem = rem % q
  }
  return out
}

function CompletenessDemo() {
  const [terms, setTerms] = useState<Term[]>([{ p: 1n, q: 1n }])
  const [playing, setPlaying] = useState(false)
  const lastRef = useRef<number>(0)

  useEffect(() => {
    if (!playing) return
    let raf = 0
    const tick = (now: number) => {
      if (now - lastRef.current > 420) {
        lastRef.current = now
        setTerms((prev) => {
          if (prev.length >= 10) {
            setPlaying(false)
            return prev
          }
          return [...prev, babylonianStep(prev[prev.length - 1])]
        })
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [playing])

  const latest = terms[terms.length - 1]
  const sqrt2 = Math.SQRT2

  return (
    <Card>
      <p className="text-sm text-neutral-400 mb-4">
        <strong className="text-neutral-200">Completeness fails in ℚ.</strong>{" "}
        The Babylonian iteration{" "}
        <Tex math="x_{n+1} = \tfrac{1}{2}(x_n + 2/x_n)" /> produces{" "}
        <em>rational</em> terms that cluster together — they're Cauchy — yet
        their would-be limit <Tex math="\sqrt{2}" /> is{" "}
        <em>not</em> rational. In ℚ, this sequence has no limit.
      </p>

      <div className="flex items-center gap-2 mb-4">
        <button
          onClick={() => setPlaying((p) => !p)}
          className="inline-flex items-center gap-1.5 rounded-md bg-indigo-500/20 border border-indigo-500/50 px-3 py-1.5 text-sm hover:bg-indigo-500/30"
        >
          {playing ? (
            <Pause className="h-3.5 w-3.5" />
          ) : (
            <Play className="h-3.5 w-3.5" />
          )}
          {playing ? "pause" : "step"}
        </button>
        <button
          onClick={() => {
            setTerms([{ p: 1n, q: 1n }])
            setPlaying(false)
          }}
          className="inline-flex items-center gap-1.5 rounded-md border border-neutral-800 px-3 py-1.5 text-sm hover:bg-neutral-900"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          reset
        </button>
        <button
          onClick={() =>
            setTerms((prev) =>
              prev.length >= 10
                ? prev
                : [...prev, babylonianStep(prev[prev.length - 1])],
            )
          }
          className="rounded-md border border-neutral-800 px-3 py-1.5 text-sm hover:bg-neutral-900"
        >
          +1 step
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg border border-neutral-800">
        <table className="w-full text-sm">
          <thead className="bg-neutral-900/60 text-neutral-400 text-xs uppercase tracking-wider">
            <tr>
              <th className="text-left px-3 py-2 w-10">n</th>
              <th className="text-left px-3 py-2">
                x<sub>n</sub> (rational)
              </th>
              <th className="text-left px-3 py-2">decimal</th>
              <th className="text-right px-3 py-2">|xₙ − √2|</th>
            </tr>
          </thead>
          <tbody className="font-mono text-neutral-200">
            <AnimatePresence initial={false}>
              {terms.map((t, i) => {
                const f = toFloat(t)
                const err = Math.abs(f - sqrt2)
                return (
                  <motion.tr
                    key={i}
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="border-t border-neutral-800"
                  >
                    <td className="px-3 py-2 text-neutral-500">{i}</td>
                    <td className="px-3 py-2 break-all">
                      {t.p.toString()} / {t.q.toString()}
                    </td>
                    <td className="px-3 py-2 text-neutral-400">
                      {digitsOfTerm(t, 18)}…
                    </td>
                    <td className="px-3 py-2 text-right text-neutral-500">
                      {err === 0 ? "0" : err.toExponential(2)}
                    </td>
                  </motion.tr>
                )
              })}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      <div className="mt-4 text-sm text-neutral-400">
        Latest term:{" "}
        <Tex
          math={String.raw`x_{${terms.length - 1}} = \frac{${latest.p.toString()}}{${latest.q.toString()}}`}
        />
      </div>
    </Card>
  )
}

// ---------- Main page ----------
export default function RealNumbers() {
  return (
    <TopicShell topic={topic}>
      <Section title="Field axioms at a glance">
        <p className="text-neutral-400 text-sm mb-4">
          The real numbers form a <em>complete ordered field</em>. That's three
          layers: <strong>field</strong> (addition & multiplication with the
          expected algebraic laws), <strong>order</strong> (every pair is
          comparable), and <strong>completeness</strong> (no "holes"). Change
          the inputs to watch every axiom verified live:
        </p>
        <AxiomExplorer />
      </Section>

      <Section title="Density of ℚ in ℝ">
        <DensityDemo />
      </Section>

      <Section title="Completeness — and why ℚ isn't complete">
        <CompletenessDemo />
      </Section>

      <Section title="Statement of the completeness axiom">
        <Card>
          <Tex block math={String.raw`\text{Every nonempty subset } S \subseteq \mathbb{R} \text{ that is bounded above has a least upper bound } \sup S \in \mathbb{R}.`} />
          <p className="mt-4 text-sm text-neutral-400">
            Equivalent formulations you'll see in the course: every Cauchy
            sequence converges; every bounded monotone sequence converges;
            nested closed intervals have nonempty intersection; every bounded
            sequence has a convergent subsequence (Bolzano–Weierstrass). The
            demo above shows why this property fails in <Tex math="\mathbb{Q}" /> —
            the iterates are Cauchy, but their "limit" <Tex math="\sqrt{2}" />{" "}
            is irrational.
          </p>
        </Card>
      </Section>
    </TopicShell>
  )
}
