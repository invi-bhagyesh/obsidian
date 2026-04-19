import { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import { Play, Pause, RotateCcw } from "lucide-react"
import Tex from "../../components/Tex"
import TopicShell, { Section, Card } from "../../components/TopicShell"
import { TOPICS } from "../../topics"

const topic = TOPICS.find((t) => t.slug === "ra/cauchy")!

// Sample sequences
type Seq = {
  id: string
  name: string
  tex: string
  fn: (n: number) => number
  cauchy: boolean
  converges: boolean
  note: string
}

const SEQS: Seq[] = [
  {
    id: "sqrt2",
    name: "Babylonian √2",
    tex: String.raw`x_{n+1} = \tfrac{1}{2}\left(x_n + \tfrac{2}{x_n}\right)`,
    fn: (n) => {
      let x = 1
      for (let i = 0; i < n; i++) x = 0.5 * (x + 2 / x)
      return x
    },
    cauchy: true,
    converges: true,
    note: "Cauchy in ℝ (converges to √2). Cauchy in ℚ too — but the limit escapes ℚ.",
  },
  {
    id: "harm-partial",
    name: "partial harmonic",
    tex: String.raw`H_n = \sum_{k=1}^{n} \frac{1}{k}`,
    fn: (n) => {
      let s = 0
      for (let k = 1; k <= n; k++) s += 1 / k
      return s
    },
    cauchy: false,
    converges: false,
    note: "Not Cauchy — consecutive blocks don't shrink: H_{2n} − H_n ≥ 1/2 for all n.",
  },
  {
    id: "alt-partial",
    name: "alternating harmonic (partial sums)",
    tex: String.raw`S_n = \sum_{k=1}^{n} \frac{(-1)^{k+1}}{k}`,
    fn: (n) => {
      let s = 0
      for (let k = 1; k <= n; k++) s += (k % 2 === 0 ? -1 : 1) / k
      return s
    },
    cauchy: true,
    converges: true,
    note: "Cauchy; converges to ln 2.",
  },
  {
    id: "sin-osc",
    name: "sin(n)",
    tex: String.raw`a_n = \sin(n)`,
    fn: (n) => Math.sin(n),
    cauchy: false,
    converges: false,
    note: "Bounded but not Cauchy. (By equidistribution, values are dense in [−1, 1].)",
  },
  {
    id: "geom-half",
    name: "partial ∑ (1/2)ᵏ",
    tex: String.raw`S_n = \sum_{k=1}^{n} (1/2)^k`,
    fn: (n) => 1 - Math.pow(0.5, n),
    cauchy: true,
    converges: true,
    note: "Cauchy; converges to 1.",
  },
]

function pairwiseSup(seq: Seq, from: number, to: number): number {
  // sup over i, j >= from and <= to of |a_i - a_j|
  const vals: number[] = []
  for (let k = from; k <= to; k++) vals.push(seq.fn(k))
  let mn = Infinity
  let mx = -Infinity
  for (const v of vals) {
    if (v < mn) mn = v
    if (v > mx) mx = v
  }
  return mx - mn
}

// ========================= Pairwise distance game =========================
function PairwiseGame() {
  const [seqId, setSeqId] = useState("sqrt2")
  const [N, setN] = useState(10)
  const [MMAX, setMMAX] = useState(60)

  const seq = SEQS.find((s) => s.id === seqId)!

  const sup = pairwiseSup(seq, N, MMAX)

  const pts = useMemo(() => {
    return Array.from({ length: MMAX }, (_, i) => ({ n: i + 1, a: seq.fn(i + 1) }))
  }, [seq, MMAX])

  const allY = pts.map((p) => p.a)
  let yMin = Math.min(...allY)
  let yMax = Math.max(...allY)
  const pad = (yMax - yMin) * 0.15 + 0.05
  yMin -= pad
  yMax += pad

  const W = 760
  const H = 260
  const padX = 40
  const padY = 20
  const toX = (n: number) => padX + ((n - 1) / (MMAX - 1)) * (W - 2 * padX)
  const toY = (y: number) => padY + ((yMax - y) / (yMax - yMin)) * (H - 2 * padY)

  // band of all values for n >= N
  const tail = pts.filter((p) => p.n >= N).map((p) => p.a)
  const tailMin = tail.length ? Math.min(...tail) : 0
  const tailMax = tail.length ? Math.max(...tail) : 0

  return (
    <Card>
      <p className="text-sm text-neutral-400 mb-3">
        <strong className="text-neutral-200">Cauchy.</strong>{" "}
        <Tex math={String.raw`(a_n)`} /> is Cauchy iff{" "}
        <Tex math={String.raw`\forall \varepsilon > 0,\ \exists N:\ m, n \ge N \implies |a_m - a_n| < \varepsilon`} />
        . The tail "clusters" without needing to know a limit. Pick N; the strip
        below shows the tail's{" "}
        <em>diameter</em>{" "}
        <Tex math={String.raw`\sup_{m,n \ge N} |a_m - a_n|`} />.
      </p>

      <div className="flex flex-wrap items-center gap-2 mb-3">
        {SEQS.map((s) => (
          <button
            key={s.id}
            onClick={() => {
              setSeqId(s.id)
              setN(Math.min(N, 10))
            }}
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
        <label className="text-xs text-neutral-500 font-mono">N (tail starts at)</label>
        <input
          type="range"
          min={1}
          max={MMAX - 5}
          value={N}
          onChange={(e) => setN(Number(e.target.value))}
          className="w-48 accent-indigo-400"
        />
        <span className="font-mono text-neutral-300">{N}</span>
        <label className="ml-4 text-xs text-neutral-500 font-mono">horizon M</label>
        <input
          type="range"
          min={20}
          max={200}
          value={MMAX}
          onChange={(e) => setMMAX(Number(e.target.value))}
          className="w-32 accent-indigo-400"
        />
        <span className="font-mono text-neutral-300 text-xs">{MMAX}</span>
      </div>

      <div className="rounded-md border border-neutral-800 bg-neutral-950 overflow-hidden">
        <svg width={W} height={H} className="block max-w-full">
          {/* tail strip */}
          <rect
            x={toX(N)}
            y={toY(tailMax)}
            width={Math.max(2, toX(MMAX) - toX(N))}
            height={Math.max(2, toY(tailMin) - toY(tailMax))}
            fill="#a78bfa"
            opacity={0.2}
          />
          <line x1={toX(N)} x2={toX(N)} y1={padY} y2={H - padY} stroke="#fbbf24" strokeDasharray="3 3" />
          <text x={toX(N) + 5} y={padY + 12} fontSize="11" fill="#fbbf24" fontFamily="ui-monospace, monospace">
            N = {N}
          </text>

          {/* axes */}
          <line x1={padX} x2={W - padX} y1={H - padY} y2={H - padY} stroke="#52525b" />
          <line x1={padX} x2={padX} y1={padY} y2={H - padY} stroke="#52525b" />

          {/* points */}
          {pts.map((p) => (
            <motion.circle
              key={p.n}
              cx={toX(p.n)}
              cy={toY(p.a)}
              r={2.5}
              fill={p.n >= N ? "#a78bfa" : "#71717a"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: p.n * 0.003 }}
            />
          ))}
          {/* sup bracket */}
          <line x1={padX + 2} x2={padX + 2} y1={toY(tailMax)} y2={toY(tailMin)} stroke="#a78bfa" strokeWidth={2} />
          <text x={padX + 8} y={(toY(tailMax) + toY(tailMin)) / 2 + 4} fontSize="10" fill="#c4b5fd" fontFamily="ui-monospace, monospace">
            diam = {sup.toFixed(4)}
          </text>

          {[1, Math.floor(MMAX / 4), Math.floor(MMAX / 2), Math.floor((3 * MMAX) / 4), MMAX].map((n) => (
            <g key={n}>
              <line x1={toX(n)} x2={toX(n)} y1={H - padY} y2={H - padY + 3} stroke="#52525b" />
              <text x={toX(n)} y={H - padY + 14} textAnchor="middle" fontSize="9" fill="#71717a" fontFamily="ui-monospace, monospace">
                {n}
              </text>
            </g>
          ))}
        </svg>
      </div>

      <div className="mt-3 text-xs text-neutral-400">{seq.note}</div>

      <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
        <Stat label="diameter of tail" value={sup.toFixed(5)} color="violet" />
        <Stat label="Cauchy?" value={seq.cauchy ? "yes" : "no"} color={seq.cauchy ? "emerald" : "rose"} />
        <Stat
          label="converges in ℝ?"
          value={seq.converges ? "yes" : "no"}
          color={seq.converges ? "emerald" : "rose"}
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
  color: "violet" | "emerald" | "rose" | "zinc"
}) {
  const cls = {
    violet: "border-violet-500/40 bg-violet-500/10 text-violet-200",
    emerald: "border-emerald-500/40 bg-emerald-500/10 text-emerald-200",
    rose: "border-rose-500/40 bg-rose-500/10 text-rose-200",
    zinc: "border-neutral-800 bg-neutral-900 text-neutral-400",
  }[color]
  return (
    <div className={`rounded-md border px-3 py-2 font-mono ${cls}`}>
      <div className="text-[10px] uppercase tracking-wider opacity-70">{label}</div>
      <div className="mt-0.5 text-sm">{value}</div>
    </div>
  )
}

// ========================= ℚ is not complete =========================
function QIsNotComplete() {
  const [n, setN] = useState(1)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    if (!playing) return
    const h = setInterval(() => {
      setN((x) => (x >= 8 ? x : x + 1))
    }, 900)
    return () => clearInterval(h)
  }, [playing])

  // Decimal approximations from Babylonian method: all in ℚ, but limit is √2 ∉ ℚ
  const terms = useMemo(() => {
    const out: number[] = []
    let x = 1
    for (let i = 0; i < 8; i++) {
      out.push(x)
      x = 0.5 * (x + 2 / x)
    }
    return out
  }, [])

  const W = 760
  const H = 120
  const pad = 30

  const minV = Math.sqrt(2) - 0.05
  const maxV = terms[0] + 0.05
  const toX = (v: number) => pad + ((v - minV) / (maxV - minV)) * (W - 2 * pad)

  return (
    <Card>
      <p className="text-sm text-neutral-400 mb-3">
        <strong className="text-neutral-200">ℚ is Cauchy but not complete.</strong>{" "}
        The Babylonian iterates are all rational — each is a Cauchy sequence in{" "}
        <Tex math={String.raw`\mathbb{Q}`} /> — yet they converge to{" "}
        <Tex math={String.raw`\sqrt{2} \notin \mathbb{Q}`} />. That's why{" "}
        <Tex math={String.raw`\mathbb{R}`} /> is defined as the completion of{" "}
        <Tex math={String.raw`\mathbb{Q}`} /> — filling in every gap a Cauchy
        sequence can "see".
      </p>

      <div className="flex items-center gap-2 mb-3">
        <button
          onClick={() => setPlaying((p) => !p)}
          className="inline-flex items-center gap-1.5 rounded-md bg-indigo-500/20 border border-indigo-500/50 px-3 py-1.5 text-sm hover:bg-indigo-500/30"
        >
          {playing ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
          {playing ? "pause" : "iterate"}
        </button>
        <button
          onClick={() => {
            setN(1)
            setPlaying(false)
          }}
          className="inline-flex items-center gap-1.5 rounded-md border border-neutral-800 px-3 py-1.5 text-sm hover:bg-neutral-900"
        >
          <RotateCcw className="h-3.5 w-3.5" /> reset
        </button>
        <span className="ml-auto text-xs text-neutral-500 font-mono">n = {n}</span>
      </div>

      <div className="rounded-md border border-neutral-800 bg-neutral-950 overflow-hidden">
        <svg width={W} height={H} className="block max-w-full">
          <line x1={pad} x2={W - pad} y1={H / 2 + 20} y2={H / 2 + 20} stroke="#52525b" />
          {/* √2 marker */}
          <line x1={toX(Math.sqrt(2))} x2={toX(Math.sqrt(2))} y1={15} y2={H / 2 + 25} stroke="#fbbf24" strokeDasharray="3 3" />
          <text x={toX(Math.sqrt(2))} y={12} textAnchor="middle" fontSize="11" fill="#fbbf24" fontFamily="ui-monospace, monospace">
            √2 ∉ ℚ
          </text>

          {terms.slice(0, n).map((v, i) => (
            <motion.g
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.08 }}
            >
              <circle cx={toX(v)} cy={H / 2 + 20} r={6} fill="#a78bfa" stroke="#0b0d10" strokeWidth={2} />
              <text
                x={toX(v)}
                y={H / 2 + 48}
                textAnchor="middle"
                fontSize="9"
                fill="#71717a"
                fontFamily="ui-monospace, monospace"
              >
                x{i + 1}
              </text>
            </motion.g>
          ))}
        </svg>
      </div>

      <div className="mt-3 overflow-x-auto">
        <table className="min-w-full text-xs font-mono">
          <thead>
            <tr className="text-neutral-500 border-b border-neutral-800">
              <th className="px-2 py-1 text-left font-normal">n</th>
              <th className="px-2 py-1 text-left font-normal">x_n</th>
              <th className="px-2 py-1 text-left font-normal">|x_n − √2|</th>
            </tr>
          </thead>
          <tbody>
            {terms.slice(0, n).map((v, i) => (
              <tr key={i} className="border-b border-neutral-800/60 last:border-0">
                <td className="px-2 py-1 text-neutral-400">{i + 1}</td>
                <td className="px-2 py-1 text-neutral-200">{v.toFixed(12)}</td>
                <td className="px-2 py-1 text-rose-300">{Math.abs(v - Math.sqrt(2)).toExponential(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}

// ========================= Theorem cards =========================
function KeyFacts() {
  const items = [
    {
      t: "Convergent ⇒ Cauchy",
      body: String.raw`a_n \to L \implies \forall \varepsilon>0,\ \exists N:\ m,n \ge N \implies |a_m - a_n| \le |a_m - L| + |L - a_n| < \varepsilon.`,
    },
    {
      t: "Cauchy ⇒ bounded",
      body: String.raw`\text{Choose } \varepsilon = 1.\ \text{Then } |a_n| < |a_N| + 1 \text{ for } n \ge N;\ \text{first } N-1 \text{ terms are bounded too.}`,
    },
    {
      t: "Cauchy + subseq → L ⇒ seq → L",
      body: String.raw`|a_n - L| \le |a_n - a_{n_k}| + |a_{n_k} - L| \to 0.`,
    },
    {
      t: "Completeness of ℝ",
      body: String.raw`\text{In } \mathbb{R},\ (a_n) \text{ is Cauchy} \iff (a_n) \text{ converges.}`,
    },
  ]
  return (
    <Card>
      <div className="grid gap-3 md:grid-cols-2">
        {items.map((it) => (
          <div key={it.t} className="rounded-md border border-neutral-800 bg-neutral-950 px-4 py-3">
            <div className="text-xs uppercase tracking-wider text-indigo-300">{it.t}</div>
            <div className="mt-2 overflow-x-auto">
              <Tex block math={it.body} />
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}

// ========================= main =========================
export default function Cauchy() {
  return (
    <TopicShell topic={topic}>
      <Section title="Does the tail cluster?">
        <PairwiseGame />
      </Section>
      <Section title="Why ℝ had to be built — ℚ has gaps">
        <QIsNotComplete />
      </Section>
      <Section title="Key facts">
        <KeyFacts />
      </Section>
    </TopicShell>
  )
}
