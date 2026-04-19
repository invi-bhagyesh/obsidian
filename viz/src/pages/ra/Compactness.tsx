import { useEffect, useMemo, useRef, useState } from "react"
import { motion } from "framer-motion"
import { Plus, Trash2, RotateCcw, Check, X } from "lucide-react"
import Tex from "../../components/Tex"
import TopicShell, { Section, Card } from "../../components/TopicShell"
import { TOPICS } from "../../topics"

const topic = TOPICS.find((t) => t.slug === "ra/compactness")!

type Ball = { id: string; c: number; r: number }

function rnd() {
  return Math.random().toString(36).slice(2, 9)
}

// Choose finite subcover greedy — sort by left endpoint, pick smallest set of
// intervals that covers [a,b]
function greedyCover(
  balls: Ball[],
  a: number,
  b: number,
): { ids: string[]; covers: boolean } {
  const items = balls
    .map((bl) => ({ bl, L: bl.c - bl.r, R: bl.c + bl.r }))
    .filter((x) => x.R > a && x.L < b)
    .sort((x, y) => x.L - y.L)

  const picked: string[] = []
  let reached = a
  let covered = false
  while (reached < b - 1e-9) {
    // pick the interval that starts ≤ reached and extends furthest to the right
    let best: (typeof items)[number] | null = null
    for (const it of items) {
      if (it.L <= reached + 1e-9) {
        if (!best || it.R > best.R) best = it
      }
    }
    if (!best || best.R <= reached + 1e-9) break
    picked.push(best.bl.id)
    reached = best.R
    if (reached >= b - 1e-9) {
      covered = true
      break
    }
  }
  if (reached >= b - 1e-9) covered = true
  return { ids: picked, covers: covered }
}

// ============================ Heine-Borel demo ============================
function HeineBorel() {
  const [balls, setBalls] = useState<Ball[]>([
    { id: rnd(), c: 0.05, r: 0.12 },
    { id: rnd(), c: 0.22, r: 0.12 },
    { id: rnd(), c: 0.38, r: 0.12 },
    { id: rnd(), c: 0.55, r: 0.12 },
    { id: rnd(), c: 0.72, r: 0.12 },
    { id: rnd(), c: 0.9, r: 0.13 },
  ])
  const [mode, setMode] = useState<"closed" | "half" | "open-rational">("closed")
  const [showPicked, setShowPicked] = useState(false)
  const svgRef = useRef<SVGSVGElement | null>(null)
  const dragRef = useRef<{ id: string; kind: "c" | "r" } | null>(null)

  const W = 760
  const H = 170
  const pad = 30
  const toPx = (v: number) => pad + v * (W - 2 * pad)
  const fromPx = (x: number) => (x - pad) / (W - 2 * pad)

  const setName = mode === "closed" ? "[0, 1]" : mode === "half" ? "(0, 1]" : "[0, 1] ∩ ℚ"
  const interval = mode === "closed" ? { a: 0, b: 1 } : mode === "half" ? { a: 1e-6, b: 1 } : { a: 0, b: 1 }

  const picked = useMemo(() => greedyCover(balls, interval.a, interval.b), [balls, interval.a, interval.b])
  const pickedSet = useMemo(() => new Set(picked.ids), [picked.ids])

  const addBall = () => {
    setBalls((prev) => [...prev, { id: rnd(), c: 0.5, r: 0.1 }])
  }
  const removeBall = (id: string) => {
    setBalls((prev) => prev.filter((b) => b.id !== id))
  }

  const updateBall = (id: string, patch: Partial<Ball>) => {
    setBalls((prev) =>
      prev.map((b) =>
        b.id === id
          ? {
              ...b,
              ...patch,
              ...(patch.c !== undefined ? { c: Math.max(-0.15, Math.min(1.15, patch.c)) } : {}),
              ...(patch.r !== undefined ? { r: Math.max(0.01, Math.min(0.5, patch.r)) } : {}),
            }
          : b,
      ),
    )
  }

  const handlePointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!dragRef.current || !svgRef.current) return
    const r = svgRef.current.getBoundingClientRect()
    const xPx = e.clientX - r.left
    const v = fromPx(xPx)
    const { id, kind } = dragRef.current
    if (kind === "c") updateBall(id, { c: v })
    else {
      const b = balls.find((x) => x.id === id)
      if (!b) return
      updateBall(id, { r: Math.max(0.01, Math.abs(v - b.c)) })
    }
  }

  return (
    <Card>
      <p className="text-sm text-neutral-400 mb-3">
        <strong className="text-neutral-200">Heine–Borel.</strong> A subset of{" "}
        <Tex math={String.raw`\mathbb{R}`} /> is compact{" "}
        <Tex math={String.raw`\iff`} /> closed and bounded{" "}
        <Tex math={String.raw`\iff`} /> every open cover has a finite subcover.
        Drag open balls (centers and radii) and see whether they cover{" "}
        <span className="font-mono">{setName}</span>.
      </p>

      <div className="flex flex-wrap items-center gap-2 mb-3">
        {(["closed", "half", "open-rational"] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`rounded-md border px-3 py-1.5 text-xs font-mono ${
              mode === m
                ? "border-indigo-500/60 bg-indigo-500/20 text-indigo-200"
                : "border-neutral-800 text-neutral-400 hover:bg-neutral-900"
            }`}
          >
            {m === "closed" ? "[0, 1]" : m === "half" ? "(0, 1]" : "[0, 1] ∩ ℚ"}
          </button>
        ))}
        <div className="ml-auto flex items-center gap-2">
          <label className="inline-flex items-center gap-1 text-xs text-neutral-400">
            <input
              type="checkbox"
              checked={showPicked}
              onChange={(e) => setShowPicked(e.target.checked)}
              className="accent-indigo-400"
            />
            show finite subcover
          </label>
          <button
            onClick={addBall}
            className="inline-flex items-center gap-1.5 rounded-md border border-neutral-800 px-2.5 py-1.5 text-xs hover:bg-neutral-900"
          >
            <Plus className="h-3 w-3" /> add ball
          </button>
          <button
            onClick={() =>
              setBalls([
                { id: rnd(), c: 0.1, r: 0.15 },
                { id: rnd(), c: 0.35, r: 0.15 },
                { id: rnd(), c: 0.6, r: 0.15 },
                { id: rnd(), c: 0.88, r: 0.15 },
              ])
            }
            className="inline-flex items-center gap-1.5 rounded-md border border-neutral-800 px-2.5 py-1.5 text-xs hover:bg-neutral-900"
          >
            <RotateCcw className="h-3 w-3" /> reset
          </button>
        </div>
      </div>

      <div className="rounded-md border border-neutral-800 bg-neutral-950 overflow-hidden">
        <svg
          ref={svgRef}
          width={W}
          height={H}
          className="block max-w-full touch-none select-none"
          onPointerMove={handlePointerMove}
          onPointerUp={() => (dragRef.current = null)}
          onPointerLeave={() => (dragRef.current = null)}
        >
          {/* target set */}
          <rect
            x={toPx(interval.a)}
            y={20}
            width={toPx(interval.b) - toPx(interval.a)}
            height={10}
            fill="#fbbf24"
            opacity={0.8}
          />
          <text x={toPx((interval.a + interval.b) / 2)} y={15} textAnchor="middle" fontSize="10" fill="#fbbf24" fontFamily="ui-monospace, monospace">
            target: {setName}
          </text>

          {/* balls */}
          {balls.map((b, i) => {
            const L = toPx(b.c - b.r)
            const R = toPx(b.c + b.r)
            const highlighted = showPicked && pickedSet.has(b.id)
            const dim = showPicked && !highlighted
            const col = ["#6366f1", "#34d399", "#f472b6", "#fb923c", "#22d3ee", "#a78bfa"][i % 6]
            return (
              <g key={b.id} opacity={dim ? 0.22 : 1}>
                <rect
                  x={L}
                  y={50}
                  width={R - L}
                  height={32}
                  fill={col}
                  opacity={highlighted ? 0.55 : 0.28}
                />
                <line x1={L} x2={L} y1={45} y2={82} stroke={col} strokeDasharray="3 3" />
                <line x1={R} x2={R} y1={45} y2={82} stroke={col} strokeDasharray="3 3" />
                {/* center handle */}
                <circle
                  cx={toPx(b.c)}
                  cy={66}
                  r={7}
                  fill={col}
                  stroke="#0b0d10"
                  strokeWidth={2}
                  className="cursor-ew-resize"
                  onPointerDown={(e) => {
                    ;(e.target as Element).setPointerCapture?.(e.pointerId)
                    dragRef.current = { id: b.id, kind: "c" }
                  }}
                />
                {/* right-radius handle */}
                <circle
                  cx={R}
                  cy={66}
                  r={5}
                  fill="#0b0d10"
                  stroke={col}
                  strokeWidth={2}
                  className="cursor-ew-resize"
                  onPointerDown={(e) => {
                    ;(e.target as Element).setPointerCapture?.(e.pointerId)
                    dragRef.current = { id: b.id, kind: "r" }
                  }}
                />
              </g>
            )
          })}

          {/* axis */}
          <line x1={pad} x2={W - pad} y1={110} y2={110} stroke="#52525b" />
          {[0, 0.25, 0.5, 0.75, 1].map((v) => (
            <g key={v}>
              <line x1={toPx(v)} x2={toPx(v)} y1={107} y2={113} stroke="#52525b" />
              <text x={toPx(v)} y={128} textAnchor="middle" fontSize="10" fill="#71717a" fontFamily="ui-monospace, monospace">
                {v}
              </text>
            </g>
          ))}
        </svg>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-3">
        {picked.covers ? (
          <div className="inline-flex items-center gap-2 rounded-md border border-emerald-500/40 bg-emerald-500/10 px-3 py-1.5 text-sm text-emerald-200">
            <Check className="h-3.5 w-3.5" /> covers {setName} — finite subcover
            of size <span className="font-mono">{picked.ids.length}</span>
          </div>
        ) : (
          <div className="inline-flex items-center gap-2 rounded-md border border-rose-500/40 bg-rose-500/10 px-3 py-1.5 text-sm text-rose-200">
            <X className="h-3.5 w-3.5" /> does NOT cover {setName}
          </div>
        )}
        <span className="text-xs text-neutral-500">
          total balls: {balls.length}
        </span>
      </div>

      <div className="mt-3 grid gap-2">
        {balls.map((b, i) => (
          <div
            key={b.id}
            className="flex items-center gap-2 rounded-md border border-neutral-800 bg-neutral-950 px-3 py-1.5 text-xs font-mono"
          >
            <span className="text-neutral-500 w-6">B{i + 1}</span>
            <span>
              ({b.c.toFixed(2)}, r = {b.r.toFixed(2)})
            </span>
            <span className="text-neutral-600">→ ({(b.c - b.r).toFixed(2)}, {(b.c + b.r).toFixed(2)})</span>
            <button
              onClick={() => removeBall(b.id)}
              className="ml-auto text-neutral-500 hover:text-rose-400"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
      </div>

      <p className="mt-3 text-xs text-neutral-500">
        On the half-open set <Tex math="(0, 1]" /> — not closed — the cover{" "}
        <Tex math={String.raw`\{(1/n,\, 2): n \in \mathbb{N}\}`} /> has no finite
        subcover. Try building a cover of <Tex math="(0, 1]" /> with many tiny
        balls near 0; no finite selection will reach 0.
      </p>
    </Card>
  )
}

// ============================ Shrinking cover of (0,1] ============================
function NonCompact() {
  const [n, setN] = useState(4)

  const W = 760
  const H = 140
  const pad = 30
  const toPx = (v: number) => pad + v * (W - 2 * pad)

  const intervals = useMemo(() => {
    // U_k = (1/k, 2) for k=1..n.  Only captures points > 1/n.
    return Array.from({ length: n }, (_, k) => ({ L: 1 / (k + 1), R: 2, k: k + 1 }))
  }, [n])

  const notCovered = 1 / n // points in (0, 1/n] uncovered

  return (
    <Card>
      <p className="text-sm text-neutral-400 mb-3">
        The cover{" "}
        <Tex math={String.raw`\mathcal{U} = \{\, (1/n,\ 2) : n \in \mathbb{N}\,\}`} />{" "}
        is an open cover of <Tex math="(0, 1]" /> — but{" "}
        <em>any</em> finite sub-collection{" "}
        <Tex math={String.raw`U_{n_1}, \ldots, U_{n_k}`} /> fails: pick{" "}
        <Tex math={String.raw`N = \max n_j`} />; the point{" "}
        <Tex math="1/(N+1)" /> is not in any of them.
      </p>

      <div className="flex items-center gap-3 mb-3">
        <label className="text-xs text-neutral-500 font-mono">finite pick size N</label>
        <input
          type="range"
          min={1}
          max={20}
          value={n}
          onChange={(e) => setN(Number(e.target.value))}
          className="w-40 accent-rose-400"
        />
        <span className="font-mono text-neutral-300">{n}</span>
      </div>

      <div className="rounded-md border border-neutral-800 bg-neutral-950 overflow-hidden">
        <svg width={W} height={H} className="block max-w-full">
          {/* target */}
          <rect x={toPx(0) + 0.5} y={20} width={toPx(1) - toPx(0)} height={10} fill="#fbbf24" opacity={0.85} />
          <text x={toPx(0.5)} y={15} textAnchor="middle" fontSize="10" fill="#fbbf24" fontFamily="ui-monospace, monospace">
            (0, 1]
          </text>
          {/* intervals */}
          {intervals.map((it, i) => {
            const L = toPx(Math.max(0, it.L))
            const R = toPx(Math.min(1.15, it.R))
            const col = ["#6366f1", "#34d399", "#f472b6", "#fb923c", "#22d3ee", "#a78bfa"][i % 6]
            return (
              <g key={it.k}>
                <rect x={L} y={50 + i * 5} width={R - L} height={3} fill={col} opacity={0.7} />
              </g>
            )
          })}
          {/* uncovered region */}
          <rect x={toPx(0)} y={70} width={toPx(notCovered) - toPx(0)} height={12} fill="#f43f5e" opacity={0.5} />
          <text x={toPx(notCovered / 2)} y={95} textAnchor="middle" fontSize="10" fill="#fda4af" fontFamily="ui-monospace, monospace">
            (0, 1/{n}] uncovered
          </text>

          <line x1={pad} x2={W - pad} y1={115} y2={115} stroke="#52525b" />
          {[0, 0.25, 0.5, 0.75, 1].map((v) => (
            <g key={v}>
              <line x1={toPx(v)} x2={toPx(v)} y1={112} y2={118} stroke="#52525b" />
              <text x={toPx(v)} y={132} textAnchor="middle" fontSize="10" fill="#71717a" fontFamily="ui-monospace, monospace">
                {v}
              </text>
            </g>
          ))}
        </svg>
      </div>

      <p className="mt-3 text-xs text-neutral-500">
        No matter how large <Tex math="N" />, you can still find a point{" "}
        <Tex math={String.raw`0 < x \le 1/N`} /> that isn't covered. Hence{" "}
        <Tex math="(0, 1]" /> is <em>not</em> compact — it is bounded but not
        closed.
      </p>
    </Card>
  )
}

// ============================ Nested-interval / sequential compactness ============================
function NestedIntervals() {
  const [depth, setDepth] = useState(0)
  const [target, setTarget] = useState(0.7)
  const svgRef = useRef<SVGSVGElement | null>(null)

  useEffect(() => {
    const t = setInterval(() => {
      setDepth((d) => (d >= 8 ? 0 : d + 1))
    }, 1000)
    return () => clearInterval(t)
  }, [])

  const W = 760
  const H = 180
  const pad = 30
  const toPx = (v: number) => pad + v * (W - 2 * pad)

  // Bisection: at each depth, halve the interval containing target
  const intervals = useMemo(() => {
    const out: { L: number; R: number }[] = []
    let L = 0
    let R = 1
    out.push({ L, R })
    for (let i = 0; i < depth; i++) {
      const M = (L + R) / 2
      if (target < M) R = M
      else L = M
      out.push({ L, R })
    }
    return out
  }, [depth, target])

  const handleSet = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!svgRef.current) return
    const r = svgRef.current.getBoundingClientRect()
    const x = e.clientX - r.left
    const v = Math.max(0, Math.min(1, (x - pad) / (W - 2 * pad)))
    setTarget(v)
    setDepth(0)
  }

  return (
    <Card>
      <p className="text-sm text-neutral-400 mb-3">
        <strong className="text-neutral-200">Bolzano–Weierstrass.</strong> In{" "}
        <Tex math={String.raw`\mathbb{R}`} />, every bounded sequence has a
        convergent subsequence. Nested closed intervals{" "}
        <Tex math={String.raw`I_1 \supseteq I_2 \supseteq \cdots`} /> with lengths
        <Tex math="\to 0" /> have a unique common point — that's the limit.
      </p>

      <div className="flex items-center gap-3 mb-3">
        <label className="text-xs text-neutral-500 font-mono">target</label>
        <input
          type="range"
          min={0}
          max={1}
          step={0.001}
          value={target}
          onChange={(e) => {
            setTarget(Number(e.target.value))
            setDepth(0)
          }}
          className="w-40 accent-emerald-400"
        />
        <span className="font-mono text-neutral-300">{target.toFixed(3)}</span>
        <span className="ml-auto text-xs text-neutral-500 font-mono">
          depth {depth} / 8
        </span>
      </div>

      <div className="rounded-md border border-neutral-800 bg-neutral-950 overflow-hidden">
        <svg ref={svgRef} width={W} height={H} className="block max-w-full cursor-crosshair" onPointerDown={handleSet}>
          {intervals.map((iv, i) => {
            const y = 15 + i * 16
            const col = `hsl(${150 + i * 10}, 70%, 55%)`
            return (
              <motion.rect
                key={i}
                x={toPx(iv.L)}
                y={y}
                width={toPx(iv.R) - toPx(iv.L)}
                height={10}
                fill={col}
                initial={{ opacity: 0, scaleY: 0 }}
                animate={{ opacity: 0.65, scaleY: 1 }}
                transition={{ delay: i * 0.05 }}
              />
            )
          })}
          <line x1={toPx(target)} x2={toPx(target)} y1={10} y2={H - 20} stroke="#fbbf24" strokeDasharray="3 3" />
          <circle cx={toPx(target)} cy={10} r={5} fill="#fbbf24" />
          <text x={toPx(target) + 8} y={14} fontSize="10" fill="#fbbf24" fontFamily="ui-monospace, monospace">
            x = {target.toFixed(4)}
          </text>
        </svg>
      </div>

      <p className="mt-3 text-xs text-neutral-500">
        Click anywhere to change the target — each level halves the interval. The
        intersection <Tex math={String.raw`\bigcap_{n} I_n`} /> is exactly{" "}
        <Tex math="\{x\}" /> by completeness of <Tex math={String.raw`\mathbb{R}`} />.
      </p>
    </Card>
  )
}

// ============================ Summary card ============================
function Summary() {
  return (
    <Card>
      <div className="grid gap-3 md:grid-cols-2">
        <Item title="Compact ⇒ closed" body="If K is compact and x ∉ K, separate x from K by disjoint open neighbourhoods (uses Hausdorff). So ℝ ∖ K is open." />
        <Item title="Compact ⇒ bounded" body="If K were unbounded, {(-n, n) : n ∈ ℕ} would be an open cover with no finite subcover." />
        <Item title="Closed + bounded ⇒ compact" body="Prove by bisection: a bounded cover of [a, b] with no finite subcover splits into two halves, one of which still has no finite subcover. Iterate, apply nested intervals + compactness of a single point." />
        <Item title="Other characterisations" body="K compact ⟺ every sequence has a convergent subsequence in K ⟺ every infinite subset has a limit point in K." />
      </div>
    </Card>
  )
}

function Item({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-md border border-neutral-800 bg-neutral-950 p-3">
      <div className="text-sm font-medium text-neutral-200">{title}</div>
      <div className="mt-1 text-xs text-neutral-400 leading-relaxed">{body}</div>
    </div>
  )
}

// ========================= main =========================
export default function Compactness() {
  return (
    <TopicShell topic={topic}>
      <Section title="Finite subcover — the Heine–Borel game">
        <HeineBorel />
      </Section>
      <Section title="(0, 1] is not compact">
        <NonCompact />
      </Section>
      <Section title="Nested intervals capture the limit">
        <NestedIntervals />
      </Section>
      <Section title="Three equivalent definitions">
        <Summary />
      </Section>
    </TopicShell>
  )
}
