import { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import { Play, Pause, RotateCcw } from "lucide-react"
import Tex from "../../components/Tex"
import TopicShell, { Section, Card } from "../../components/TopicShell"
import { TOPICS } from "../../topics"

const topic = TOPICS.find((t) => t.slug === "ra/sequences")!

// ========================= sample sequences =========================
type Sample = {
  id: string
  name: string
  tex: string
  limit: number | null // null => divergent
  fn: (n: number) => number
  findN: (eps: number) => number | null // smallest N so |a_n - L| < eps for n ≥ N
}

function minNSuch(pred: (n: number) => boolean, max = 5e6): number | null {
  // exponential search + binary search
  let n = 1
  while (n < max) {
    if (pred(n)) {
      let lo = Math.max(1, Math.floor(n / 2))
      let hi = n
      while (lo < hi) {
        const mid = Math.floor((lo + hi) / 2)
        if (pred(mid)) hi = mid
        else lo = mid + 1
      }
      return lo
    }
    n *= 2
  }
  return null
}

const SEQS: Sample[] = [
  {
    id: "1n",
    name: "1/n",
    tex: String.raw`a_n = \frac{1}{n}`,
    limit: 0,
    fn: (n) => 1 / n,
    findN: (eps) => (eps <= 0 ? null : Math.ceil(1 / eps)),
  },
  {
    id: "1n2",
    name: "1/n²",
    tex: String.raw`a_n = \frac{1}{n^2}`,
    limit: 0,
    fn: (n) => 1 / (n * n),
    findN: (eps) => (eps <= 0 ? null : Math.ceil(1 / Math.sqrt(eps))),
  },
  {
    id: "alt",
    name: "(-1)ⁿ/n",
    tex: String.raw`a_n = \frac{(-1)^n}{n}`,
    limit: 0,
    fn: (n) => (n % 2 === 0 ? 1 : -1) / n,
    findN: (eps) => (eps <= 0 ? null : Math.ceil(1 / eps)),
  },
  {
    id: "npow",
    name: "n/(n+1)",
    tex: String.raw`a_n = \frac{n}{n+1}`,
    limit: 1,
    fn: (n) => n / (n + 1),
    findN: (eps) => (eps <= 0 || eps >= 1 ? 1 : Math.ceil(1 / eps - 1)),
  },
  {
    id: "sqrt",
    name: "√(n+1) - √n",
    tex: String.raw`a_n = \sqrt{n+1} - \sqrt{n}`,
    limit: 0,
    fn: (n) => Math.sqrt(n + 1) - Math.sqrt(n),
    findN: (eps) =>
      minNSuch((n) => Math.abs(Math.sqrt(n + 1) - Math.sqrt(n)) < eps),
  },
  {
    id: "geom",
    name: "(1/2)ⁿ",
    tex: String.raw`a_n = (1/2)^n`,
    limit: 0,
    fn: (n) => Math.pow(0.5, n),
    findN: (eps) => (eps <= 0 ? null : Math.ceil(-Math.log2(eps))),
  },
  {
    id: "osc",
    name: "(-1)ⁿ (divergent)",
    tex: String.raw`a_n = (-1)^n`,
    limit: null,
    fn: (n) => (n % 2 === 0 ? 1 : -1),
    findN: () => null,
  },
]

// ========================= ε-N game =========================
function EpsilonNGame() {
  const [seqId, setSeqId] = useState<string>("1n")
  const [eps, setEps] = useState(0.1)
  const [showBand, setShowBand] = useState(true)
  const [showN, setShowN] = useState(true)

  const seq = SEQS.find((s) => s.id === seqId)!
  const N = seq.findN(eps)
  const L = seq.limit

  // decide plot window
  const NMAX = Math.min(100, Math.max(30, (N ?? 20) + 12))

  const pts = useMemo(() => {
    return Array.from({ length: NMAX }, (_, i) => ({ n: i + 1, a: seq.fn(i + 1) }))
  }, [seq, NMAX])

  // y-range
  const allY = pts.map((p) => p.a)
  let yMin = Math.min(...allY, L ?? 0, -1)
  let yMax = Math.max(...allY, L ?? 0, 1)
  const pad = (yMax - yMin) * 0.15 + 0.05
  yMin -= pad
  yMax += pad

  const W = 760
  const H = 280
  const padX = 40
  const padY = 20
  const toX = (n: number) => padX + ((n - 1) / (NMAX - 1)) * (W - 2 * padX)
  const toY = (y: number) =>
    padY + ((yMax - y) / (yMax - yMin)) * (H - 2 * padY)

  return (
    <Card>
      <p className="text-sm text-neutral-400 mb-3">
        <strong className="text-neutral-200">ε–N definition.</strong>{" "}
        <Tex math={String.raw`a_n \to L`} /> iff for every{" "}
        <Tex math="\varepsilon > 0" /> there exists{" "}
        <Tex math={String.raw`N \in \mathbb{N}`} /> such that{" "}
        <Tex math={String.raw`n \ge N \implies |a_n - L| < \varepsilon`} />. Pick
        an ε; we compute the smallest N that works.
      </p>

      <div className="flex flex-wrap items-center gap-2 mb-3">
        {SEQS.map((s) => (
          <button
            key={s.id}
            onClick={() => setSeqId(s.id)}
            className={`rounded-md border px-3 py-1 text-xs font-mono ${
              seqId === s.id
                ? "border-indigo-500/60 bg-indigo-500/20 text-indigo-200"
                : "border-neutral-800 text-neutral-400 hover:bg-neutral-900"
            }`}
          >
            {s.name}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-3">
        <label className="text-xs text-neutral-500 font-mono">ε</label>
        <input
          type="range"
          min={0.001}
          max={1}
          step={0.001}
          value={eps}
          onChange={(e) => setEps(Number(e.target.value))}
          className="w-52 accent-indigo-400"
        />
        <span className="font-mono text-neutral-300 text-sm tabular-nums">
          {eps.toFixed(3)}
        </span>
        <label className="ml-4 inline-flex items-center gap-1 text-xs text-neutral-400">
          <input type="checkbox" checked={showBand} onChange={(e) => setShowBand(e.target.checked)} className="accent-indigo-400" />
          show ε-band
        </label>
        <label className="inline-flex items-center gap-1 text-xs text-neutral-400">
          <input type="checkbox" checked={showN} onChange={(e) => setShowN(e.target.checked)} className="accent-indigo-400" />
          show N
        </label>
      </div>

      <div className="rounded-md border border-neutral-800 bg-neutral-950 overflow-hidden">
        <svg width={W} height={H} className="block max-w-full">
          {/* grid */}
          {L !== null && (
            <line
              x1={padX}
              x2={W - padX}
              y1={toY(L)}
              y2={toY(L)}
              stroke="#a78bfa"
              strokeDasharray="4 4"
              opacity={0.8}
            />
          )}
          {showBand && L !== null && (
            <rect
              x={padX}
              y={toY(L + eps)}
              width={W - 2 * padX}
              height={toY(L - eps) - toY(L + eps)}
              fill="#a78bfa"
              opacity={0.15}
            />
          )}
          {/* axes */}
          <line x1={padX} x2={W - padX} y1={H - padY} y2={H - padY} stroke="#52525b" />
          <line x1={padX} x2={padX} y1={padY} y2={H - padY} stroke="#52525b" />

          {/* N vertical line */}
          {showN && N !== null && (
            <>
              <line
                x1={toX(N)}
                x2={toX(N)}
                y1={padY}
                y2={H - padY}
                stroke="#fbbf24"
                strokeDasharray="3 3"
                opacity={0.7}
              />
              <text
                x={toX(N) + 6}
                y={padY + 12}
                fontSize="11"
                fill="#fbbf24"
                fontFamily="ui-monospace, monospace"
              >
                N = {N}
              </text>
            </>
          )}

          {/* points */}
          {pts.map((p) => {
            const inBand = L !== null && Math.abs(p.a - L) < eps
            const pastN = N !== null && p.n >= N
            const color = pastN ? "#34d399" : inBand ? "#a78bfa" : "#e879f9"
            return (
              <motion.circle
                key={p.n}
                cx={toX(p.n)}
                cy={toY(p.a)}
                r={3}
                fill={color}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: p.n * 0.006, duration: 0.15 }}
              />
            )
          })}

          {/* y labels: limit and ±eps */}
          {L !== null && (
            <>
              <text x={W - padX - 2} y={toY(L) - 4} textAnchor="end" fontSize="10" fill="#a78bfa" fontFamily="ui-monospace, monospace">
                L = {L}
              </text>
              <text x={padX - 4} y={toY(L + eps) - 2} textAnchor="end" fontSize="9" fill="#71717a" fontFamily="ui-monospace, monospace">
                {(L + eps).toFixed(2)}
              </text>
              <text x={padX - 4} y={toY(L - eps) + 10} textAnchor="end" fontSize="9" fill="#71717a" fontFamily="ui-monospace, monospace">
                {(L - eps).toFixed(2)}
              </text>
            </>
          )}

          {/* x ticks */}
          {[1, Math.floor(NMAX / 4), Math.floor(NMAX / 2), Math.floor((3 * NMAX) / 4), NMAX].map((n) => (
            <g key={n}>
              <line x1={toX(n)} x2={toX(n)} y1={H - padY} y2={H - padY + 3} stroke="#52525b" />
              <text x={toX(n)} y={H - padY + 14} textAnchor="middle" fontSize="9" fill="#71717a" fontFamily="ui-monospace, monospace">
                {n}
              </text>
            </g>
          ))}
        </svg>
      </div>

      <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
        <Stat label="sequence" value={seq.name} color="indigo" />
        <Stat
          label="limit L"
          value={L === null ? "DNE" : L.toString()}
          color={L === null ? "rose" : "violet"}
        />
        <Stat label="ε" value={eps.toFixed(3)} color="zinc" />
        <Stat
          label="smallest N"
          value={N === null ? "—" : N.toString()}
          color={N === null ? "rose" : "amber"}
        />
      </div>

      <div className="mt-3 text-xs">
        <Tex
          block
          math={
            L === null
              ? String.raw`\text{No } N \text{ works: the sequence does not converge.}`
              : `\\text{For } n \\ge ${N ?? "N"}, \\ |a_n - ${L}| < ${eps.toFixed(3)}`
          }
        />
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
  color: "indigo" | "violet" | "zinc" | "amber" | "rose"
}) {
  const cls = {
    indigo: "border-indigo-500/40 bg-indigo-500/10 text-indigo-200",
    violet: "border-violet-500/40 bg-violet-500/10 text-violet-200",
    zinc: "border-neutral-800 bg-neutral-900 text-neutral-400",
    amber: "border-amber-500/40 bg-amber-500/10 text-amber-200",
    rose: "border-rose-500/40 bg-rose-500/10 text-rose-200",
  }[color]
  return (
    <div className={`rounded-md border px-3 py-2 font-mono ${cls}`}>
      <div className="text-[10px] uppercase tracking-wider opacity-70">{label}</div>
      <div className="mt-0.5 text-sm">{value}</div>
    </div>
  )
}

// ========================= animated convergence ========================
function AnimatedPlay() {
  const [t, setT] = useState(1)
  const [playing, setPlaying] = useState(true)

  useEffect(() => {
    if (!playing) return
    const h = setInterval(() => {
      setT((x) => (x >= 80 ? 80 : x + 1))
    }, 80)
    return () => clearInterval(h)
  }, [playing])

  const NMAX = 80
  const pts = useMemo(() => Array.from({ length: NMAX }, (_, i) => {
    const n = i + 1
    // convergent: a_n = 1 + (-1)^n / n
    return { n, a: 1 + ((n % 2 === 0 ? 1 : -1) / n) }
  }), [])
  const shown = pts.slice(0, t)

  const W = 760
  const H = 210
  const padX = 40
  const padY = 20
  const toX = (n: number) => padX + ((n - 1) / (NMAX - 1)) * (W - 2 * padX)
  const toY = (y: number) => padY + ((2 - y) / 2) * (H - 2 * padY)

  return (
    <Card>
      <p className="text-sm text-neutral-400 mb-3">
        <strong className="text-neutral-200">Oscillating but convergent.</strong>{" "}
        <Tex math={String.raw`a_n = 1 + \frac{(-1)^n}{n} \to 1`} />. Watch terms
        spiral in to L as n grows.
      </p>

      <div className="flex items-center gap-2 mb-3">
        <button
          onClick={() => setPlaying((p) => !p)}
          className="inline-flex items-center gap-1.5 rounded-md bg-violet-500/20 border border-violet-500/50 px-3 py-1.5 text-sm hover:bg-violet-500/30"
        >
          {playing ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
          {playing ? "pause" : "play"}
        </button>
        <button
          onClick={() => {
            setT(1)
            setPlaying(true)
          }}
          className="inline-flex items-center gap-1.5 rounded-md border border-neutral-800 px-3 py-1.5 text-sm hover:bg-neutral-900"
        >
          <RotateCcw className="h-3.5 w-3.5" /> reset
        </button>
        <span className="ml-auto text-xs text-neutral-500 font-mono">n = {t}</span>
      </div>

      <div className="rounded-md border border-neutral-800 bg-neutral-950 overflow-hidden">
        <svg width={W} height={H} className="block max-w-full">
          <line x1={padX} x2={W - padX} y1={toY(1)} y2={toY(1)} stroke="#a78bfa" strokeDasharray="4 4" />
          <text x={W - padX - 2} y={toY(1) - 4} textAnchor="end" fontSize="10" fill="#a78bfa" fontFamily="ui-monospace, monospace">
            L = 1
          </text>
          <line x1={padX} x2={W - padX} y1={H - padY} y2={H - padY} stroke="#52525b" />
          <line x1={padX} x2={padX} y1={padY} y2={H - padY} stroke="#52525b" />
          {shown.length > 1 && (
            <polyline
              points={shown.map((p) => `${toX(p.n)},${toY(p.a)}`).join(" ")}
              fill="none"
              stroke="#e879f9"
              strokeWidth={1}
              opacity={0.35}
            />
          )}
          {shown.map((p) => (
            <circle key={p.n} cx={toX(p.n)} cy={toY(p.a)} r={2.5} fill="#e879f9" />
          ))}
        </svg>
      </div>
    </Card>
  )
}

// ========================= Convergence theorems =========================
function Theorems() {
  const items = [
    {
      name: "Uniqueness of limits",
      tex: String.raw`\text{If } a_n \to L_1 \text{ and } a_n \to L_2, \text{ then } L_1 = L_2.`,
    },
    {
      name: "Bounded + monotone ⇒ convergent",
      tex: String.raw`\text{If } a_n \text{ is monotone and bounded, it converges to its sup or inf.}`,
    },
    {
      name: "Algebra of limits",
      tex: String.raw`a_n \to A, \ b_n \to B \implies a_n \pm b_n \to A \pm B,\ \ a_n b_n \to AB,\ \ a_n/b_n \to A/B \ (B \ne 0)`,
    },
    {
      name: "Squeeze theorem",
      tex: String.raw`a_n \le b_n \le c_n,\ a_n, c_n \to L \implies b_n \to L.`,
    },
    {
      name: "Bolzano–Weierstrass",
      tex: String.raw`\text{Every bounded sequence in } \mathbb{R} \text{ has a convergent subsequence.}`,
    },
  ]
  return (
    <Card>
      <div className="grid gap-2">
        {items.map((it) => (
          <div key={it.name} className="rounded-md border border-neutral-800 bg-neutral-950 px-3 py-2">
            <div className="text-xs uppercase tracking-wider text-violet-300">{it.name}</div>
            <div className="mt-1 overflow-x-auto">
              <Tex block math={it.tex} />
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}

// ========================= main =========================
export default function Sequences() {
  return (
    <TopicShell topic={topic}>
      <Section title="The ε–N game">
        <EpsilonNGame />
      </Section>
      <Section title="Watch convergence happen">
        <AnimatedPlay />
      </Section>
      <Section title="Limit theorems">
        <Theorems />
      </Section>
    </TopicShell>
  )
}
