import { useMemo, useRef, useState } from "react"
import { motion } from "framer-motion"
import Tex from "../../components/Tex"
import TopicShell, { Section, Card } from "../../components/TopicShell"
import { TOPICS } from "../../topics"

const topic = TOPICS.find((t) => t.slug === "ra/inequalities")!

const fmt = (n: number, p = 4) =>
  !isFinite(n) ? "—" : Number(n.toPrecision(p)).toString()

// ================= AM-GM (n = 2) =================
// The classic semicircle proof: for a,b ≥ 0, draw a segment AB of length a+b
// split at P into lengths a and b. A semicircle on AB has radius (a+b)/2,
// and the altitude from P to the semicircle has length √(ab).
function AMGM() {
  const [a, setA] = useState(1.8)
  const [b, setB] = useState(5.4)

  const width = 720
  const height = 260
  const total = a + b
  const scale = (width - 60) / Math.max(total, 1e-6)
  const originX = 30
  const baseY = 200
  const aPx = a * scale
  const bPx = b * scale
  const r = (aPx + bPx) / 2
  const cx = originX + r
  const pX = originX + aPx
  const altitude = Math.sqrt(Math.max(0, a * b)) * scale
  const gm = Math.sqrt(a * b)
  const am = (a + b) / 2

  return (
    <Card>
      <p className="text-sm text-neutral-400 mb-4">
        <strong className="text-neutral-200">AM–GM for n = 2.</strong>{" "}
        <Tex math={String.raw`\frac{a+b}{2} \geq \sqrt{ab}`} /> with equality
        iff <Tex math="a = b" />. Geometric proof: on a segment of length{" "}
        <Tex math="a+b" />, the radius <Tex math="(a+b)/2" /> of the semicircle
        is at least the altitude <Tex math="\sqrt{ab}" /> at the split point.
      </p>

      <div className="grid grid-cols-2 gap-4 mb-3">
        {[
          ["a", a, setA],
          ["b", b, setB],
        ].map(([lbl, v, set]) => (
          <label key={lbl as string}>
            <div className="flex justify-between text-xs">
              <span className="text-neutral-500 font-mono">{lbl as string}</span>
              <span className="font-mono text-neutral-300">{fmt(v as number)}</span>
            </div>
            <input
              type="range"
              min={0.1}
              max={8}
              step={0.01}
              value={v as number}
              onChange={(e) =>
                (set as (n: number) => void)(Number(e.target.value))
              }
              className="w-full accent-indigo-400"
            />
          </label>
        ))}
      </div>

      <svg width={width} height={height} className="block w-full max-w-full">
        {/* base */}
        <line
          x1={originX}
          y1={baseY}
          x2={originX + total * scale}
          y2={baseY}
          stroke="#52525b"
        />
        {/* semicircle */}
        <path
          d={`M ${originX} ${baseY} A ${r} ${r} 0 0 1 ${originX + total * scale} ${baseY}`}
          fill="rgba(99,102,241,0.1)"
          stroke="#818cf8"
        />
        {/* radius (dashed vertical from center up) */}
        <line
          x1={cx}
          y1={baseY}
          x2={cx}
          y2={baseY - r}
          stroke="#a5b4fc"
          strokeDasharray="4 3"
        />
        {/* altitude at P */}
        <line
          x1={pX}
          y1={baseY}
          x2={pX}
          y2={baseY - altitude}
          stroke="#f59e0b"
          strokeWidth={2}
        />
        {/* labels */}
        <circle cx={originX} cy={baseY} r={3} fill="#e5e7eb" />
        <circle cx={pX} cy={baseY} r={3} fill="#fbbf24" />
        <circle cx={originX + total * scale} cy={baseY} r={3} fill="#e5e7eb" />
        <text
          x={originX + aPx / 2}
          y={baseY + 18}
          textAnchor="middle"
          fontSize="12"
          fill="#a1a1aa"
        >
          a = {fmt(a)}
        </text>
        <text
          x={pX + bPx / 2}
          y={baseY + 18}
          textAnchor="middle"
          fontSize="12"
          fill="#a1a1aa"
        >
          b = {fmt(b)}
        </text>
        <text
          x={cx + 6}
          y={baseY - r / 2}
          fontSize="11"
          fill="#a5b4fc"
          fontFamily="ui-monospace, monospace"
        >
          (a+b)/2 = {fmt(am)}
        </text>
        <text
          x={pX + 6}
          y={baseY - altitude / 2}
          fontSize="11"
          fill="#fbbf24"
          fontFamily="ui-monospace, monospace"
        >
          √(ab) = {fmt(gm)}
        </text>
      </svg>

      <div className="mt-3 flex gap-4 text-sm font-mono">
        <span className="text-indigo-300">AM = {fmt(am)}</span>
        <span className="text-amber-300">GM = {fmt(gm)}</span>
        <span
          className={
            Math.abs(a - b) < 1e-6
              ? "text-emerald-400"
              : "text-neutral-400"
          }
        >
          gap = {fmt(am - gm)}
        </span>
      </div>
    </Card>
  )
}

// ================= Cauchy-Schwarz (2D vectors) =================
function CauchySchwarz() {
  const W = 560
  const H = 420
  const cx = W / 2
  const cy = H / 2
  const scale = 50

  // state: endpoints of u and v relative to origin
  const [u, setU] = useState({ x: 3, y: 1 })
  const [v, setV] = useState({ x: 1, y: 2.2 })
  const dragging = useRef<null | "u" | "v">(null)
  const svgRef = useRef<SVGSVGElement>(null)

  const dot = u.x * v.x + u.y * v.y
  const nu = Math.hypot(u.x, u.y)
  const nv = Math.hypot(v.x, v.y)
  const rhs = nu * nv
  const slack = rhs - Math.abs(dot)
  const tight = Math.abs(slack) < 0.05

  const toPx = (p: { x: number; y: number }) => ({
    x: cx + p.x * scale,
    y: cy - p.y * scale,
  })
  const toMath = (evt: React.PointerEvent) => {
    const rect = svgRef.current!.getBoundingClientRect()
    const px = evt.clientX - rect.left
    const py = evt.clientY - rect.top
    return { x: (px - cx) / scale, y: -(py - cy) / scale }
  }

  const onMove = (e: React.PointerEvent) => {
    if (!dragging.current) return
    const p = toMath(e)
    if (dragging.current === "u") setU(p)
    else setV(p)
  }

  const ArrowHead = ({ color }: { color: string }) => (
    <marker
      id={`ah-${color.replace("#", "")}`}
      viewBox="0 0 10 10"
      refX="10"
      refY="5"
      markerWidth="6"
      markerHeight="6"
      orient="auto"
    >
      <path d="M 0 0 L 10 5 L 0 10 z" fill={color} />
    </marker>
  )

  const uEnd = toPx(u)
  const vEnd = toPx(v)
  const o = { x: cx, y: cy }

  return (
    <Card>
      <p className="text-sm text-neutral-400 mb-4">
        <strong className="text-neutral-200">Cauchy–Schwarz (vector form).</strong>{" "}
        <Tex math={String.raw`|\mathbf{u}\cdot\mathbf{v}|\ \leq\ \|\mathbf{u}\|\,\|\mathbf{v}\|`} />
        , with equality iff the vectors are parallel. Drag the arrowheads.
      </p>

      <svg
        ref={svgRef}
        width={W}
        height={H}
        className="block w-full max-w-full rounded-md bg-neutral-950 border border-neutral-800"
        onPointerMove={onMove}
        onPointerUp={() => (dragging.current = null)}
        onPointerLeave={() => (dragging.current = null)}
      >
        <defs>
          <ArrowHead color="#60a5fa" />
          <ArrowHead color="#f472b6" />
        </defs>
        {/* grid */}
        {Array.from({ length: 13 }).map((_, i) => {
          const x = i - 6
          return (
            <g key={i}>
              <line
                x1={cx + x * scale}
                y1={0}
                x2={cx + x * scale}
                y2={H}
                stroke="#1f2937"
              />
              <line
                x1={0}
                y1={cy + x * scale}
                x2={W}
                y2={cy + x * scale}
                stroke="#1f2937"
              />
            </g>
          )
        })}
        {/* axes */}
        <line x1={0} y1={cy} x2={W} y2={cy} stroke="#404040" />
        <line x1={cx} y1={0} x2={cx} y2={H} stroke="#404040" />
        {/* u arrow */}
        <line
          x1={o.x}
          y1={o.y}
          x2={uEnd.x}
          y2={uEnd.y}
          stroke="#60a5fa"
          strokeWidth={2}
          markerEnd="url(#ah-60a5fa)"
        />
        {/* v arrow */}
        <line
          x1={o.x}
          y1={o.y}
          x2={vEnd.x}
          y2={vEnd.y}
          stroke="#f472b6"
          strokeWidth={2}
          markerEnd="url(#ah-f472b6)"
        />
        {/* drag handles */}
        <circle
          cx={uEnd.x}
          cy={uEnd.y}
          r={9}
          fill="#60a5fa"
          stroke="#0b0d10"
          strokeWidth={2}
          style={{ cursor: "grab" }}
          onPointerDown={(e) => {
            ;(e.target as Element).setPointerCapture(e.pointerId)
            dragging.current = "u"
          }}
        />
        <circle
          cx={vEnd.x}
          cy={vEnd.y}
          r={9}
          fill="#f472b6"
          stroke="#0b0d10"
          strokeWidth={2}
          style={{ cursor: "grab" }}
          onPointerDown={(e) => {
            ;(e.target as Element).setPointerCapture(e.pointerId)
            dragging.current = "v"
          }}
        />
        <text
          x={uEnd.x + 10}
          y={uEnd.y - 10}
          fontSize="13"
          fill="#93c5fd"
          fontFamily="ui-monospace, monospace"
        >
          u
        </text>
        <text
          x={vEnd.x + 10}
          y={vEnd.y - 10}
          fontSize="13"
          fill="#f9a8d4"
          fontFamily="ui-monospace, monospace"
        >
          v
        </text>
      </svg>

      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3 text-sm font-mono">
        <Stat label="u·v" val={dot} color="text-neutral-200" />
        <Stat label="|u·v|" val={Math.abs(dot)} color="text-amber-300" />
        <Stat label="‖u‖‖v‖" val={rhs} color="text-emerald-300" />
        <Stat
          label="slack"
          val={slack}
          color={tight ? "text-rose-300" : "text-neutral-400"}
          hint={tight ? "equality (parallel)" : undefined}
        />
      </div>
    </Card>
  )
}

function Stat({
  label,
  val,
  color,
  hint,
}: {
  label: string
  val: number
  color: string
  hint?: string
}) {
  return (
    <div className="rounded-md border border-neutral-800 bg-neutral-950 px-3 py-2">
      <div className="text-xs text-neutral-500">{label}</div>
      <div className={color}>{fmt(val)}</div>
      {hint && <div className="text-[10px] text-rose-400">{hint}</div>}
    </div>
  )
}

// ================= Triangle inequality =================
function Triangle() {
  const W = 560
  const H = 400
  type P = { x: number; y: number }
  const [pts, setPts] = useState<[P, P, P]>([
    { x: 100, y: 320 },
    { x: 460, y: 320 },
    { x: 280, y: 60 },
  ])
  const dragging = useRef<number | null>(null)
  const svgRef = useRef<SVGSVGElement>(null)

  const onMove = (e: React.PointerEvent) => {
    if (dragging.current === null) return
    const rect = svgRef.current!.getBoundingClientRect()
    const nx = e.clientX - rect.left
    const ny = e.clientY - rect.top
    setPts((prev) => {
      const next = [...prev] as [P, P, P]
      next[dragging.current!] = { x: nx, y: ny }
      return next
    })
  }

  const [A, B, C] = pts
  const dAB = Math.hypot(A.x - B.x, A.y - B.y) / 60
  const dBC = Math.hypot(B.x - C.x, B.y - C.y) / 60
  const dCA = Math.hypot(C.x - A.x, C.y - A.y) / 60
  const sides = [
    { name: "AB+BC vs CA", lhs: dAB + dBC, rhs: dCA },
    { name: "BC+CA vs AB", lhs: dBC + dCA, rhs: dAB },
    { name: "CA+AB vs BC", lhs: dCA + dAB, rhs: dBC },
  ]

  return (
    <Card>
      <p className="text-sm text-neutral-400 mb-4">
        <strong className="text-neutral-200">Triangle inequality.</strong>{" "}
        <Tex math={String.raw`|x+y|\leq|x|+|y|`} /> — equivalently, the sum of
        any two sides of a triangle is at least the third. Drag the vertices.
      </p>
      <svg
        ref={svgRef}
        width={W}
        height={H}
        className="block w-full max-w-full rounded-md bg-neutral-950 border border-neutral-800"
        onPointerMove={onMove}
        onPointerUp={() => (dragging.current = null)}
        onPointerLeave={() => (dragging.current = null)}
      >
        <polygon
          points={pts.map((p) => `${p.x},${p.y}`).join(" ")}
          fill="rgba(16,185,129,0.08)"
          stroke="#34d399"
          strokeWidth={1.5}
        />
        {(
          [
            [A, B, "AB"],
            [B, C, "BC"],
            [C, A, "CA"],
          ] as [P, P, string][]
        ).map(([p1, p2, n], i) => (
          <text
            key={i}
            x={(p1.x + p2.x) / 2}
            y={(p1.y + p2.y) / 2 - 6}
            textAnchor="middle"
            fontSize="11"
            fill="#a1a1aa"
            fontFamily="ui-monospace, monospace"
          >
            {n} = {fmt(Math.hypot(p1.x - p2.x, p1.y - p2.y) / 60, 3)}
          </text>
        ))}
        {pts.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={9}
            fill="#34d399"
            stroke="#0b0d10"
            strokeWidth={2}
            style={{ cursor: "grab" }}
            onPointerDown={(e) => {
              ;(e.target as Element).setPointerCapture(e.pointerId)
              dragging.current = i
            }}
          />
        ))}
        {pts.map((p, i) => (
          <text
            key={`l${i}`}
            x={p.x + 12}
            y={p.y + 4}
            fontSize="13"
            fill="#6ee7b7"
            fontFamily="ui-monospace, monospace"
          >
            {["A", "B", "C"][i]}
          </text>
        ))}
      </svg>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm font-mono">
        {sides.map((s) => {
          const ok = s.lhs >= s.rhs - 1e-6
          const tight = Math.abs(s.lhs - s.rhs) < 0.05
          return (
            <div
              key={s.name}
              className={`rounded-md border px-3 py-2 ${
                ok
                  ? tight
                    ? "border-amber-600 bg-amber-500/5"
                    : "border-neutral-800 bg-neutral-950"
                  : "border-rose-600 bg-rose-500/10"
              }`}
            >
              <div className="text-xs text-neutral-500">{s.name}</div>
              <div className="text-neutral-200">
                {fmt(s.lhs, 3)} {ok ? "≥" : "<"} {fmt(s.rhs, 3)}
              </div>
              {tight && ok && (
                <div className="text-[10px] text-amber-400 mt-1">
                  degenerate (collinear)
                </div>
              )}
            </div>
          )
        })}
      </div>
    </Card>
  )
}

// ================= AM-GM-HM trio =================
function MeansComparison() {
  const [a, setA] = useState(1)
  const [b, setB] = useState(9)
  const am = (a + b) / 2
  const gm = Math.sqrt(a * b)
  const hm = (2 * a * b) / (a + b)
  const data = useMemo(
    () => [
      { label: "HM", val: hm, color: "#fb7185" },
      { label: "GM", val: gm, color: "#fbbf24" },
      { label: "AM", val: am, color: "#818cf8" },
    ],
    [am, gm, hm],
  )
  const maxVal = Math.max(am, gm, hm, 1)

  return (
    <Card>
      <p className="text-sm text-neutral-400 mb-3">
        <strong className="text-neutral-200">HM ≤ GM ≤ AM.</strong>{" "}
        <Tex
          math={String.raw`\frac{2ab}{a+b}\ \leq\ \sqrt{ab}\ \leq\ \frac{a+b}{2}`}
        />
      </p>
      <div className="grid grid-cols-2 gap-4 mb-4">
        {[
          ["a", a, setA],
          ["b", b, setB],
        ].map(([lbl, v, set]) => (
          <label key={lbl as string}>
            <div className="flex justify-between text-xs">
              <span className="text-neutral-500 font-mono">{lbl as string}</span>
              <span className="font-mono text-neutral-300">{fmt(v as number)}</span>
            </div>
            <input
              type="range"
              min={0.1}
              max={10}
              step={0.01}
              value={v as number}
              onChange={(e) =>
                (set as (n: number) => void)(Number(e.target.value))
              }
              className="w-full accent-amber-400"
            />
          </label>
        ))}
      </div>
      <div className="space-y-2">
        {data.map((d) => (
          <div key={d.label} className="flex items-center gap-3">
            <span className="w-8 text-xs font-mono text-neutral-400">
              {d.label}
            </span>
            <div className="flex-1 h-3 bg-neutral-800 rounded">
              <motion.div
                className="h-full rounded"
                style={{ backgroundColor: d.color }}
                animate={{ width: `${(d.val / maxVal) * 100}%` }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
              />
            </div>
            <span className="w-20 text-right text-xs font-mono text-neutral-300">
              {fmt(d.val)}
            </span>
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs text-neutral-500">
        Equality throughout iff a = b.
      </p>
    </Card>
  )
}

export default function Inequalities() {
  return (
    <TopicShell topic={topic}>
      <Section title="AM–GM, geometrically">
        <AMGM />
      </Section>
      <Section title="HM ≤ GM ≤ AM">
        <MeansComparison />
      </Section>
      <Section title="Cauchy–Schwarz">
        <CauchySchwarz />
      </Section>
      <Section title="Triangle inequality">
        <Triangle />
      </Section>
    </TopicShell>
  )
}
