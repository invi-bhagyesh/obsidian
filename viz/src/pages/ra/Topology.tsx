import { useEffect, useMemo, useRef, useState } from "react"
import { motion } from "framer-motion"
import { Plus, Trash2, RotateCcw, Play, Pause } from "lucide-react"
import Tex from "../../components/Tex"
import TopicShell, { Section, Card } from "../../components/TopicShell"
import { TOPICS } from "../../topics"

const topic = TOPICS.find((t) => t.slug === "ra/topology-of-r")!

// ========================= shared number-line helpers =========================
const LINE_MIN = -4
const LINE_MAX = 4
const LINE_PX = 720
const LINE_H = 110

function toX(v: number, width = LINE_PX): number {
  return ((v - LINE_MIN) / (LINE_MAX - LINE_MIN)) * width
}
function fromX(x: number, width = LINE_PX): number {
  return LINE_MIN + (x / width) * (LINE_MAX - LINE_MIN)
}

// ============================== Interval Builder ==============================
type Interval = {
  id: string
  a: number
  b: number
  leftOpen: boolean
  rightOpen: boolean
}

function rnd() {
  return Math.random().toString(36).slice(2, 9)
}

function contains(iv: Interval, x: number, eps = 1e-9): boolean {
  const leftOk = iv.leftOpen ? x > iv.a + eps : x >= iv.a - eps
  const rightOk = iv.rightOpen ? x < iv.b - eps : x <= iv.b + eps
  return leftOk && rightOk
}

// is x an interior point of the union (there exists δ>0 s.t. (x-δ,x+δ) ⊂ S)
function isInterior(ivs: Interval[], x: number): boolean {
  // union is union of intervals; x interior iff covered by some interval as an interior point
  // for each interval iv containing x, x is interior to iv iff a < x < b strictly
  // but because we union, we also need to handle the case where adjacency fills a gap
  // Simple test: check a tiny ε on both sides
  const EPS = 1e-4
  return (
    ivs.some((iv) => contains(iv, x - EPS)) &&
    ivs.some((iv) => contains(iv, x + EPS))
  )
}

function isInSet(ivs: Interval[], x: number): boolean {
  return ivs.some((iv) => contains(iv, x))
}

function isBoundary(ivs: Interval[], x: number): boolean {
  // boundary: every neighbourhood meets both S and R\S
  const EPS = 1e-4
  const inL = ivs.some((iv) => contains(iv, x - EPS))
  const inR = ivs.some((iv) => contains(iv, x + EPS))
  return inL !== inR || (isInSet(ivs, x) && !(inL && inR))
}

// Numerical helpers for rendering interior/closure/boundary as intervals
function mergeSorted(segs: [number, number][]): [number, number][] {
  if (segs.length === 0) return []
  const sorted = [...segs].sort((a, b) => a[0] - b[0])
  const out: [number, number][] = [sorted[0]]
  for (let i = 1; i < sorted.length; i++) {
    const last = out[out.length - 1]
    const cur = sorted[i]
    if (cur[0] <= last[1] + 1e-9) last[1] = Math.max(last[1], cur[1])
    else out.push(cur)
  }
  return out
}

function unionSegments(ivs: Interval[]): [number, number][] {
  return mergeSorted(ivs.map((iv) => [iv.a, iv.b] as [number, number]))
}

function IntervalBuilder() {
  const [ivs, setIvs] = useState<Interval[]>([
    { id: rnd(), a: -2, b: -0.5, leftOpen: false, rightOpen: true },
    { id: rnd(), a: 0.5, b: 2.5, leftOpen: true, rightOpen: false },
  ])
  const [probe, setProbe] = useState(1.5)
  const svgRef = useRef<SVGSVGElement | null>(null)

  const interiorSegs = useMemo(() => {
    const u = unionSegments(ivs)
    // interior removes all endpoints regardless of open/closed, so we shrink by an infinitesimal
    // for visual rendering, interior = open version of same segs
    return u.map(([a, b]) => [a, b] as [number, number])
  }, [ivs])

  const closureSegs = useMemo(() => unionSegments(ivs), [ivs])

  const boundaryPoints = useMemo(() => {
    const u = unionSegments(ivs)
    const pts: number[] = []
    for (const [a, b] of u) {
      pts.push(a, b)
    }
    return Array.from(new Set(pts))
  }, [ivs])

  const probeInSet = isInSet(ivs, probe)
  const probeInterior = isInterior(ivs, probe)
  const probeBoundary = isBoundary(ivs, probe)

  const addInterval = () => {
    setIvs((prev) => [
      ...prev,
      { id: rnd(), a: -1, b: 0, leftOpen: false, rightOpen: false },
    ])
  }

  const removeInterval = (id: string) => {
    setIvs((prev) => prev.filter((iv) => iv.id !== id))
  }

  const update = (id: string, patch: Partial<Interval>) => {
    setIvs((prev) =>
      prev.map((iv) => (iv.id === id ? { ...iv, ...patch } : iv)),
    )
  }

  const handleProbeMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!svgRef.current) return
    const r = svgRef.current.getBoundingClientRect()
    const x = e.clientX - r.left
    const v = fromX(x)
    setProbe(Math.max(LINE_MIN, Math.min(LINE_MAX, v)))
  }

  // renderer helpers
  const ROW_INPUT = 12
  const ROW_INTERIOR = 38
  const ROW_CLOSURE = 60
  const ROW_AXIS = 86

  return (
    <Card>
      <p className="text-sm text-neutral-400 mb-4">
        Build a set <Tex math={String.raw`S \subseteq \mathbb{R}`} /> as a union of
        intervals. Toggle open/closed endpoints. Drag the probe point to see
        whether it lies in the <span className="text-indigo-300">interior</span>,{" "}
        on the <span className="text-amber-300">boundary</span>, or outside the{" "}
        <span className="text-emerald-300">closure</span>.
      </p>

      <div className="flex flex-col gap-2 mb-4">
        {ivs.map((iv) => (
          <div
            key={iv.id}
            className="flex flex-wrap items-center gap-2 rounded-md border border-neutral-800 bg-neutral-950 px-3 py-2 text-sm"
          >
            <button
              onClick={() =>
                update(iv.id, { leftOpen: !iv.leftOpen })
              }
              className="font-mono text-base w-7 text-center rounded hover:bg-neutral-800"
              title="toggle left open/closed"
            >
              {iv.leftOpen ? "(" : "["}
            </button>
            <input
              type="number"
              step={0.1}
              value={iv.a}
              onChange={(e) =>
                update(iv.id, { a: Number(e.target.value) })
              }
              className="w-20 bg-neutral-900 border border-neutral-800 rounded px-2 py-1 font-mono text-xs"
            />
            <span className="text-neutral-600">,</span>
            <input
              type="number"
              step={0.1}
              value={iv.b}
              onChange={(e) =>
                update(iv.id, { b: Number(e.target.value) })
              }
              className="w-20 bg-neutral-900 border border-neutral-800 rounded px-2 py-1 font-mono text-xs"
            />
            <button
              onClick={() =>
                update(iv.id, { rightOpen: !iv.rightOpen })
              }
              className="font-mono text-base w-7 text-center rounded hover:bg-neutral-800"
              title="toggle right open/closed"
            >
              {iv.rightOpen ? ")" : "]"}
            </button>
            <button
              onClick={() => removeInterval(iv.id)}
              className="ml-auto text-neutral-500 hover:text-rose-400"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
        <button
          onClick={addInterval}
          className="inline-flex self-start items-center gap-1.5 rounded-md border border-neutral-800 px-3 py-1.5 text-sm hover:bg-neutral-900"
        >
          <Plus className="h-3.5 w-3.5" /> add interval
        </button>
      </div>

      <div className="rounded-md border border-neutral-800 bg-neutral-950 overflow-x-auto">
        <svg
          ref={svgRef}
          width={LINE_PX + 20}
          height={LINE_H}
          className="block cursor-crosshair"
          onPointerMove={handleProbeMove}
          onPointerDown={handleProbeMove}
        >
          <g transform="translate(10,0)">
            {/* Row labels */}
            <text x={-4} y={ROW_INPUT + 4} textAnchor="end" fontSize="9" fill="#71717a">
              S
            </text>
            <text x={-4} y={ROW_INTERIOR + 4} textAnchor="end" fontSize="9" fill="#71717a">
              int
            </text>
            <text x={-4} y={ROW_CLOSURE + 4} textAnchor="end" fontSize="9" fill="#71717a">
              cl
            </text>

            {/* Row: input S as colored bars */}
            {ivs.map((iv) => (
              <g key={iv.id}>
                <rect
                  x={toX(iv.a)}
                  y={ROW_INPUT - 5}
                  width={Math.max(1, toX(iv.b) - toX(iv.a))}
                  height={10}
                  fill="#6366f1"
                  opacity={0.55}
                />
                <EndpointDot x={toX(iv.a)} y={ROW_INPUT} open={iv.leftOpen} />
                <EndpointDot x={toX(iv.b)} y={ROW_INPUT} open={iv.rightOpen} />
              </g>
            ))}

            {/* Row: interior (open intervals) */}
            {interiorSegs.map(([a, b], i) => (
              <g key={`int${i}`}>
                <rect
                  x={toX(a)}
                  y={ROW_INTERIOR - 4}
                  width={Math.max(1, toX(b) - toX(a))}
                  height={8}
                  fill="#818cf8"
                  opacity={0.7}
                />
                <EndpointDot x={toX(a)} y={ROW_INTERIOR} open={true} />
                <EndpointDot x={toX(b)} y={ROW_INTERIOR} open={true} />
              </g>
            ))}

            {/* Row: closure (closed intervals) */}
            {closureSegs.map(([a, b], i) => (
              <g key={`cl${i}`}>
                <rect
                  x={toX(a)}
                  y={ROW_CLOSURE - 4}
                  width={Math.max(1, toX(b) - toX(a))}
                  height={8}
                  fill="#34d399"
                  opacity={0.5}
                />
                <EndpointDot x={toX(a)} y={ROW_CLOSURE} open={false} />
                <EndpointDot x={toX(b)} y={ROW_CLOSURE} open={false} />
              </g>
            ))}

            {/* Boundary markers above closure */}
            {boundaryPoints.map((x, i) => (
              <line
                key={`bd${i}`}
                x1={toX(x)}
                x2={toX(x)}
                y1={ROW_CLOSURE - 10}
                y2={ROW_CLOSURE + 10}
                stroke="#fbbf24"
                strokeWidth={1.5}
                strokeDasharray="2 2"
              />
            ))}

            {/* Axis */}
            <line x1={0} x2={LINE_PX} y1={ROW_AXIS} y2={ROW_AXIS} stroke="#52525b" />
            {[-4, -3, -2, -1, 0, 1, 2, 3, 4].map((v) => (
              <g key={v}>
                <line
                  x1={toX(v)}
                  x2={toX(v)}
                  y1={ROW_AXIS - 3}
                  y2={ROW_AXIS + 3}
                  stroke="#52525b"
                />
                <text
                  x={toX(v)}
                  y={ROW_AXIS + 15}
                  textAnchor="middle"
                  fontSize="10"
                  fill="#71717a"
                  fontFamily="ui-monospace, monospace"
                >
                  {v}
                </text>
              </g>
            ))}

            {/* Probe */}
            <motion.g
              animate={{ x: toX(probe) }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
              <line y1={0} y2={LINE_H - 18} stroke="#fbbf24" strokeWidth={1} />
              <circle cy={ROW_AXIS} r={6} fill="#fbbf24" stroke="#0b0d10" strokeWidth={2} />
            </motion.g>
          </g>
        </svg>
      </div>

      <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
        <Badge label="x" value={probe.toFixed(3)} color="amber" />
        <Badge
          label="x ∈ S"
          value={probeInSet ? "yes" : "no"}
          color={probeInSet ? "indigo" : "zinc"}
        />
        <Badge
          label="interior"
          value={probeInterior ? "yes" : "no"}
          color={probeInterior ? "indigo" : "zinc"}
        />
        <Badge
          label="boundary"
          value={probeBoundary ? "yes" : "no"}
          color={probeBoundary ? "amber" : "zinc"}
        />
      </div>

      <p className="mt-4 text-xs text-neutral-500">
        <span className="text-indigo-300">S</span> is the union you built.{" "}
        <span className="text-indigo-300">int S</span> is the largest open set
        inside S.{" "}
        <span className="text-emerald-300">cl S</span> is the smallest closed set
        containing S. The{" "}
        <span className="text-amber-300">boundary</span> ∂S = cl S ∖ int S.
      </p>
    </Card>
  )
}

function EndpointDot({ x, y, open }: { x: number; y: number; open: boolean }) {
  return (
    <circle
      cx={x}
      cy={y}
      r={4.5}
      fill={open ? "#0b0d10" : "#e5e7eb"}
      stroke="#e5e7eb"
      strokeWidth={1.5}
    />
  )
}

function Badge({
  label,
  value,
  color,
}: {
  label: string
  value: string
  color: "amber" | "indigo" | "zinc" | "emerald"
}) {
  const cls =
    color === "amber"
      ? "border-amber-500/40 bg-amber-500/10 text-amber-200"
      : color === "indigo"
      ? "border-indigo-500/40 bg-indigo-500/10 text-indigo-200"
      : color === "emerald"
      ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-200"
      : "border-neutral-800 bg-neutral-900 text-neutral-400"
  return (
    <div className={`rounded-md border px-3 py-2 font-mono ${cls}`}>
      <div className="text-[10px] uppercase tracking-wider opacity-70">{label}</div>
      <div className="mt-0.5 text-sm">{value}</div>
    </div>
  )
}

// ============================ Open Cover demo ============================
function OpenCoverDemo() {
  const [t, setT] = useState(0)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    if (!playing) return
    const h = setInterval(() => {
      setT((x) => {
        if (x >= 1) {
          setPlaying(false)
          return 1
        }
        return x + 0.02
      })
    }, 30)
    return () => clearInterval(h)
  }, [playing])

  // Three overlapping balls covering [0,1]
  const centers = [0.15, 0.5, 0.85]
  const r = 0.25 + 0.05 * (1 - t)

  const W = 720
  const H = 120
  const toPx = (v: number) => 20 + v * (W - 40)

  return (
    <Card>
      <p className="text-sm text-neutral-400 mb-3">
        <strong className="text-neutral-200">Open sets have "room".</strong>{" "}
        Every point of an open set <Tex math="U" /> has a whole
        <Tex math="\varepsilon" />-ball around it inside <Tex math="U" />.
        Here each ball <Tex math={String.raw`B(c, r)`} /> around a center is open
        — their union is open too.
      </p>

      <div className="flex items-center gap-2 mb-3">
        <button
          onClick={() => setPlaying((p) => !p)}
          className="inline-flex items-center gap-1.5 rounded-md bg-indigo-500/20 border border-indigo-500/50 px-3 py-1.5 text-sm hover:bg-indigo-500/30"
        >
          {playing ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
          {playing ? "pause" : "shrink"}
        </button>
        <button
          onClick={() => {
            setT(0)
            setPlaying(false)
          }}
          className="inline-flex items-center gap-1.5 rounded-md border border-neutral-800 px-3 py-1.5 text-sm hover:bg-neutral-900"
        >
          <RotateCcw className="h-3.5 w-3.5" /> reset
        </button>
        <label className="ml-2 text-xs text-neutral-500 font-mono">r</label>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={t}
          onChange={(e) => setT(Number(e.target.value))}
          className="w-40 accent-indigo-400"
        />
        <span className="font-mono text-neutral-400 text-xs">{r.toFixed(2)}</span>
      </div>

      <div className="rounded-md border border-neutral-800 bg-neutral-950">
        <svg width={W} height={H} className="block max-w-full">
          {/* axis */}
          <line x1={20} x2={W - 20} y1={80} y2={80} stroke="#52525b" />
          {[0, 0.25, 0.5, 0.75, 1].map((v) => (
            <g key={v}>
              <line x1={toPx(v)} x2={toPx(v)} y1={77} y2={83} stroke="#52525b" />
              <text x={toPx(v)} y={98} textAnchor="middle" fontSize="10" fill="#71717a" fontFamily="ui-monospace, monospace">
                {v}
              </text>
            </g>
          ))}
          {/* balls */}
          {centers.map((c, i) => {
            const x0 = toPx(Math.max(0, c - r))
            const x1 = toPx(Math.min(1, c + r))
            return (
              <g key={i}>
                <rect x={x0} y={45} width={x1 - x0} height={30} fill={["#6366f1", "#34d399", "#f472b6"][i]} opacity={0.25} />
                <line x1={x0} x2={x0} y1={40} y2={80} stroke={["#6366f1", "#34d399", "#f472b6"][i]} strokeDasharray="3 3" />
                <line x1={x1} x2={x1} y1={40} y2={80} stroke={["#6366f1", "#34d399", "#f472b6"][i]} strokeDasharray="3 3" />
                <circle cx={toPx(c)} cy={60} r={4} fill={["#6366f1", "#34d399", "#f472b6"][i]} />
              </g>
            )
          })}
          {/* target [0,1] */}
          <rect x={toPx(0)} y={15} width={toPx(1) - toPx(0)} height={6} fill="#fbbf24" />
          <text x={toPx(0.5)} y={11} textAnchor="middle" fontSize="10" fill="#fbbf24" fontFamily="ui-monospace, monospace">
            [0, 1]
          </text>
        </svg>
      </div>

      <p className="mt-3 text-xs text-neutral-500">
        Three open balls centered at 0.15, 0.5, 0.85 form an open cover of{" "}
        <Tex math="[0, 1]" />. Shrink the radius — does the union still cover?
        (Preview of compactness, next chapter.)
      </p>
    </Card>
  )
}

// ============================ Definitions card ============================
function Definitions() {
  const defs = [
    {
      name: "Open",
      color: "indigo",
      tex: String.raw`U \text{ is open} \iff \forall x \in U,\ \exists \varepsilon > 0:\ (x-\varepsilon, x+\varepsilon) \subseteq U`,
    },
    {
      name: "Closed",
      color: "emerald",
      tex: String.raw`F \text{ is closed} \iff \mathbb{R} \setminus F \text{ is open}`,
    },
    {
      name: "Interior point",
      color: "indigo",
      tex: String.raw`x \in \operatorname{int} S \iff \exists \varepsilon > 0:\ (x-\varepsilon, x+\varepsilon) \subseteq S`,
    },
    {
      name: "Limit point",
      color: "sky",
      tex: String.raw`x \text{ is a limit point of } S \iff \forall \varepsilon>0,\ (S \cap (x-\varepsilon, x+\varepsilon)) \setminus \{x\} \ne \emptyset`,
    },
    {
      name: "Closure",
      color: "emerald",
      tex: String.raw`\overline{S} = S \cup \{\text{limit points of } S\}`,
    },
    {
      name: "Boundary",
      color: "amber",
      tex: String.raw`\partial S = \overline{S} \setminus \operatorname{int} S`,
    },
  ] as const

  return (
    <Card>
      <div className="grid gap-3 md:grid-cols-2">
        {defs.map((d) => (
          <div
            key={d.name}
            className="rounded-md border border-neutral-800 bg-neutral-950 px-4 py-3"
          >
            <div
              className={
                d.color === "indigo"
                  ? "text-xs uppercase tracking-wider text-indigo-300"
                  : d.color === "emerald"
                  ? "text-xs uppercase tracking-wider text-emerald-300"
                  : d.color === "amber"
                  ? "text-xs uppercase tracking-wider text-amber-300"
                  : "text-xs uppercase tracking-wider text-sky-300"
              }
            >
              {d.name}
            </div>
            <div className="mt-2 overflow-x-auto">
              <Tex block math={d.tex} />
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}

// ============================ Classify quiz ============================
const EXAMPLES = [
  { label: "(0, 1)", open: true, closed: false },
  { label: "[0, 1]", open: false, closed: true },
  { label: "[0, 1)", open: false, closed: false },
  { label: "{1/n : n ∈ ℕ}", open: false, closed: false },
  { label: "{1/n : n ∈ ℕ} ∪ {0}", open: false, closed: true },
  { label: "ℚ", open: false, closed: false },
  { label: "ℝ", open: true, closed: true },
  { label: "∅", open: true, closed: true },
  { label: "ℝ ∖ ℚ", open: false, closed: false },
  { label: "{2}", open: false, closed: true },
]

function Classify() {
  const [answers, setAnswers] = useState<Record<number, { open?: boolean; closed?: boolean }>>({})

  const score = EXAMPLES.reduce((s, ex, i) => {
    const a = answers[i]
    if (!a) return s
    const openRight = a.open === ex.open
    const closedRight = a.closed === ex.closed
    return s + (openRight ? 1 : 0) + (closedRight ? 1 : 0)
  }, 0)

  const total = EXAMPLES.length * 2

  const set = (i: number, field: "open" | "closed", val: boolean) => {
    setAnswers((prev) => ({
      ...prev,
      [i]: { ...prev[i], [field]: val },
    }))
  }

  return (
    <Card>
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm text-neutral-400">
          Is each subset of <Tex math={String.raw`\mathbb{R}`} /> open? closed? (A
          set can be both, or neither!)
        </p>
        <div className="font-mono text-xs text-neutral-400">
          {score} / {total}
        </div>
      </div>

      <div className="overflow-x-auto rounded-md border border-neutral-800 bg-neutral-950">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-xs text-neutral-500 border-b border-neutral-800">
              <th className="px-3 py-2 text-left font-normal">set</th>
              <th className="px-3 py-2 font-normal">open?</th>
              <th className="px-3 py-2 font-normal">closed?</th>
            </tr>
          </thead>
          <tbody>
            {EXAMPLES.map((ex, i) => (
              <tr key={i} className="border-b border-neutral-800/60 last:border-0">
                <td className="px-3 py-2 font-mono text-neutral-300">{ex.label}</td>
                <td className="px-3 py-2 text-center">
                  <QuizToggle
                    value={answers[i]?.open}
                    correct={ex.open}
                    onPick={(v) => set(i, "open", v)}
                  />
                </td>
                <td className="px-3 py-2 text-center">
                  <QuizToggle
                    value={answers[i]?.closed}
                    correct={ex.closed}
                    onPick={(v) => set(i, "closed", v)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-3 text-xs text-neutral-500">
        Surprising ones: <Tex math={String.raw`\mathbb{R}`} /> and{" "}
        <Tex math={String.raw`\emptyset`} /> are both open and closed (the only
        "clopen" sets in <Tex math={String.raw`\mathbb{R}`} />, by connectedness).{" "}
        <Tex math={String.raw`\mathbb{Q}`} /> is neither.
      </p>
    </Card>
  )
}

function QuizToggle({
  value,
  correct,
  onPick,
}: {
  value: boolean | undefined
  correct: boolean
  onPick: (v: boolean) => void
}) {
  const state = (v: boolean) => {
    if (value === undefined) return "idle"
    if (value !== v) return "unpicked"
    return v === correct ? "right" : "wrong"
  }
  const clsFor = (s: string) =>
    s === "right"
      ? "border-emerald-500/50 bg-emerald-500/20 text-emerald-200"
      : s === "wrong"
      ? "border-rose-500/50 bg-rose-500/20 text-rose-200"
      : s === "unpicked"
      ? "border-neutral-800 text-neutral-600"
      : "border-neutral-800 text-neutral-300 hover:bg-neutral-900"
  return (
    <div className="inline-flex gap-1">
      <button
        onClick={() => onPick(true)}
        className={`rounded border px-2 py-0.5 text-xs font-mono ${clsFor(state(true))}`}
      >
        yes
      </button>
      <button
        onClick={() => onPick(false)}
        className={`rounded border px-2 py-0.5 text-xs font-mono ${clsFor(state(false))}`}
      >
        no
      </button>
    </div>
  )
}

// ========================= main page =========================
export default function Topology() {
  return (
    <TopicShell topic={topic}>
      <Section title="Interior, closure, boundary — live">
        <IntervalBuilder />
      </Section>
      <Section title="Key definitions">
        <Definitions />
      </Section>
      <Section title="Open balls cover closed intervals">
        <OpenCoverDemo />
      </Section>
      <Section title="Classify these subsets of ℝ">
        <Classify />
      </Section>
    </TopicShell>
  )
}
