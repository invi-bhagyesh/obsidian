import { useMemo, useState } from "react"
import Tex from "../../components/Tex"
import TopicShell, { Section, Card } from "../../components/TopicShell"
import { TOPICS } from "../../topics"

const topic = TOPICS.find((t) => t.slug === "vacv/line-integrals")!

type VF = {
  id: string
  name: string
  F: (x: number, y: number) => [number, number]
  potential?: string
  tex: string
  conservative: boolean
}

const FIELDS: VF[] = [
  {
    id: "gradxy",
    name: "∇(xy) = ⟨y, x⟩",
    F: (x, y) => [y, x],
    potential: "φ = xy",
    tex: String.raw`F = \langle y, x \rangle = \nabla(xy)`,
    conservative: true,
  },
  {
    id: "grad-r2",
    name: "∇(x²+y²)/2 = ⟨x, y⟩",
    F: (x, y) => [x, y],
    potential: "φ = (x²+y²)/2",
    tex: String.raw`F = \langle x, y \rangle = \nabla\tfrac{x^2+y^2}{2}`,
    conservative: true,
  },
  {
    id: "rot",
    name: "⟨-y, x⟩ (rotation)",
    F: (x, y) => [-y, x],
    tex: String.raw`F = \langle -y, x \rangle`,
    conservative: false,
  },
  {
    id: "shear",
    name: "⟨y, 0⟩",
    F: (_x, y) => [y, 0],
    tex: String.raw`F = \langle y, 0 \rangle`,
    conservative: false,
  },
  {
    id: "vortex",
    name: "(-y, x)/(x²+y²)",
    F: (x, y) => {
      const r2 = x * x + y * y + 0.01
      return [-y / r2, x / r2]
    },
    tex: String.raw`F = \frac{\langle -y,\, x\rangle}{x^2+y^2}`,
    conservative: false, // not on punctured plane, locally yes
  },
]

type Curve = {
  id: string
  name: string
  r: (t: number) => [number, number]
  tRange: [number, number]
}

const CURVES: Curve[] = [
  {
    id: "segment",
    name: "segment (0,0)→(2,1)",
    r: (t) => [2 * t, t],
    tRange: [0, 1],
  },
  {
    id: "parabola",
    name: "parabola y = x²",
    r: (t) => [t, t * t],
    tRange: [0, 1.5],
  },
  {
    id: "circle",
    name: "unit circle (CCW)",
    r: (t) => [Math.cos(t), Math.sin(t)],
    tRange: [0, 2 * Math.PI],
  },
  {
    id: "halfcircle",
    name: "upper semicircle",
    r: (t) => [Math.cos(t), Math.sin(t)],
    tRange: [0, Math.PI],
  },
  {
    id: "spiral",
    name: "spiral 0 → 2π",
    r: (t) => [(t / 4) * Math.cos(t), (t / 4) * Math.sin(t)],
    tRange: [0, 2 * Math.PI],
  },
  {
    id: "square",
    name: "unit square (CCW)",
    r: (t) => {
      // param: 0→1 bottom, 1→2 right, 2→3 top, 3→4 left
      if (t < 1) return [t, 0]
      if (t < 2) return [1, t - 1]
      if (t < 3) return [3 - t, 1]
      return [0, 4 - t]
    },
    tRange: [0, 4],
  },
]

function integrate(
  F: (x: number, y: number) => [number, number],
  r: (t: number) => [number, number],
  t0: number,
  t1: number,
  tUpTo: number,
  N = 400,
) {
  // integrate F · dr / dt dt from t0 to min(t1, tUpTo)
  const end = Math.max(t0, Math.min(t1, tUpTo))
  if (end <= t0) return 0
  let sum = 0
  const dt = (end - t0) / N
  for (let k = 0; k < N; k++) {
    const t = t0 + (k + 0.5) * dt
    const eps = 1e-4
    const [x, y] = r(t)
    const [xp1, yp1] = r(t + eps)
    const [xm1, ym1] = r(t - eps)
    const dxdt = (xp1 - xm1) / (2 * eps)
    const dydt = (yp1 - ym1) / (2 * eps)
    const [Fx, Fy] = F(x, y)
    sum += (Fx * dxdt + Fy * dydt) * dt
  }
  return sum
}

function LineIntegralViz() {
  const [fid, setFid] = useState("gradxy")
  const [cid, setCid] = useState("parabola")
  const [t, setT] = useState(1)
  const f = FIELDS.find((x) => x.id === fid)!
  const c = CURVES.find((x) => x.id === cid)!

  const tActual = useMemo(() => {
    const [t0, t1] = c.tRange
    return t0 + t * (t1 - t0)
  }, [t, c])

  const total = useMemo(
    () => integrate(f.F, c.r, c.tRange[0], c.tRange[1], tActual),
    [f, c, tActual],
  )

  const W = 460
  const H = 460
  const L = 2.5
  const toScreen = (x: number, y: number): [number, number] => [
    W / 2 + (x / L) * (W / 2 - 30),
    H / 2 - (y / L) * (H / 2 - 30),
  ]

  const fullPath = useMemo(() => {
    const N = 150
    const pts: [number, number][] = []
    for (let k = 0; k <= N; k++) {
      const u = c.tRange[0] + (k / N) * (c.tRange[1] - c.tRange[0])
      pts.push(c.r(u))
    }
    return pts
  }, [c])

  const tracedPath = useMemo(() => {
    const N = 150
    const pts: [number, number][] = []
    for (let k = 0; k <= N; k++) {
      const u = c.tRange[0] + (k / N) * (tActual - c.tRange[0])
      pts.push(c.r(u))
      if (u >= tActual) break
    }
    return pts
  }, [c, tActual])

  // sample field background
  const bgField = useMemo(() => {
    const arr: { x: number; y: number; u: number; v: number; m: number }[] = []
    const N = 12
    let M = 0
    for (let i = 0; i <= N; i++) {
      for (let j = 0; j <= N; j++) {
        const x = -L + ((i + 0.2) * 2 * L) / N
        const y = -L + ((j + 0.2) * 2 * L) / N
        const [u, v] = f.F(x, y)
        const m = Math.sqrt(u * u + v * v)
        M = Math.max(M, m)
        arr.push({ x, y, u, v, m })
      }
    }
    return arr.map((p) => ({ ...p, m: p.m / (M || 1) }))
  }, [f])

  const [rxN, ryN] = c.r(tActual)

  return (
    <Card>
      <p className="text-sm text-neutral-400 mb-3">
        <strong className="text-neutral-200">Line integral</strong>{" "}
        <Tex math={String.raw`\int_C F \cdot d\mathbf{r} = \int_{t_0}^{t_1} F(r(t)) \cdot r'(t)\,dt`} />
        . Work done by F along the curve.
      </p>

      <div className="flex flex-wrap gap-2 mb-3">
        {FIELDS.map((F) => (
          <button
            key={F.id}
            onClick={() => setFid(F.id)}
            className={`rounded-md border px-2 py-1 text-xs font-mono ${
              fid === F.id
                ? "border-teal-500/60 bg-teal-500/20 text-teal-200"
                : "border-neutral-800 text-neutral-400 hover:bg-neutral-900"
            }`}
          >
            {F.name}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-2 mb-3">
        {CURVES.map((C) => (
          <button
            key={C.id}
            onClick={() => {
              setCid(C.id)
              setT(1)
            }}
            className={`rounded-md border px-2 py-1 text-xs font-mono ${
              cid === C.id
                ? "border-emerald-500/60 bg-emerald-500/20 text-emerald-200"
                : "border-neutral-800 text-neutral-400 hover:bg-neutral-900"
            }`}
          >
            {C.name}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-3 mb-3">
        <label className="text-xs text-neutral-500 font-mono">progress</label>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={t}
          onChange={(e) => setT(Number(e.target.value))}
          className="flex-1 accent-amber-400"
        />
        <span className="text-xs font-mono text-neutral-300 w-16 text-right">
          t = {tActual.toFixed(2)}
        </span>
      </div>

      <div className="grid md:grid-cols-[1fr_220px] gap-3">
        <div className="rounded-md border border-neutral-800 bg-neutral-950 p-2">
          <svg width={W} height={H} className="block mx-auto max-w-full">
            {/* axes */}
            <line x1={0} y1={H / 2} x2={W} y2={H / 2} stroke="#404040" strokeDasharray="2 4" />
            <line x1={W / 2} y1={0} x2={W / 2} y2={H} stroke="#404040" strokeDasharray="2 4" />

            {/* field arrows */}
            {bgField.map((p, i) => {
              const [sx, sy] = toScreen(p.x, p.y)
              const m = Math.sqrt(p.u * p.u + p.v * p.v) + 1e-6
              const scale = 12 * p.m
              const tx = sx + (p.u / m) * scale
              const ty = sy - (p.v / m) * scale
              return (
                <line
                  key={i}
                  x1={sx}
                  y1={sy}
                  x2={tx}
                  y2={ty}
                  stroke="#6366f1"
                  opacity={0.4}
                  strokeWidth={1}
                />
              )
            })}

            {/* full curve ghost */}
            <polyline
              points={fullPath.map(([x, y]) => toScreen(x, y).join(",")).join(" ")}
              fill="none"
              stroke="#525252"
              strokeWidth={1}
              strokeDasharray="3 3"
            />
            {/* traced portion */}
            {tracedPath.length > 1 && (
              <polyline
                points={tracedPath.map(([x, y]) => toScreen(x, y).join(",")).join(" ")}
                fill="none"
                stroke={total >= 0 ? "#34d399" : "#f43f5e"}
                strokeWidth={2.5}
              />
            )}
            {/* current point */}
            {(() => {
              const [px, py] = toScreen(rxN, ryN)
              const [Fx, Fy] = f.F(rxN, ryN)
              const m = Math.sqrt(Fx * Fx + Fy * Fy) + 1e-6
              const eps = 1e-3
              const [xp1, yp1] = c.r(tActual + eps)
              const [xm1, ym1] = c.r(tActual - eps)
              const dx = (xp1 - xm1) / (2 * eps)
              const dy = (yp1 - ym1) / (2 * eps)
              const dm = Math.sqrt(dx * dx + dy * dy) + 1e-6
              const [tex, tey] = [px + (dx / dm) * 30, py - (dy / dm) * 30]
              const [fex, fey] = [px + (Fx / m) * 30, py - (Fy / m) * 30]
              return (
                <g>
                  <line
                    x1={px}
                    y1={py}
                    x2={tex}
                    y2={tey}
                    stroke="#34d399"
                    strokeWidth={2}
                  />
                  <line
                    x1={px}
                    y1={py}
                    x2={fex}
                    y2={fey}
                    stroke="#fbbf24"
                    strokeWidth={2}
                  />
                  <circle cx={px} cy={py} r={5} fill="#fbbf24" stroke="#0b0d10" strokeWidth={2} />
                </g>
              )
            })()}
          </svg>
        </div>

        <div className="rounded-md border border-neutral-800 bg-neutral-950 p-3 flex flex-col gap-2 text-xs font-mono">
          <div className="text-neutral-500">field</div>
          <div className="text-amber-200 text-[11px]">
            <Tex math={f.tex} />
          </div>

          <div className="text-neutral-500 mt-2">curve</div>
          <div className="text-neutral-300">{c.name}</div>

          <div className="border-t border-neutral-800 pt-2 mt-1">
            <div className="text-neutral-500 mb-1">partial work</div>
            <div
              className={`text-xl ${
                total >= 0 ? "text-emerald-300" : "text-rose-300"
              }`}
            >
              {total.toFixed(3)}
            </div>
          </div>
          <div className="text-[10px] text-neutral-500 leading-snug">
            green = tangent r′(t), yellow = field F at point. Their dot product
            is instantaneously accumulated.
          </div>

          {f.conservative && (
            <div className="mt-2 rounded-md border border-emerald-500/40 bg-emerald-500/10 p-2 text-emerald-200 text-[11px]">
              Conservative — work depends only on endpoints.{" "}
              {f.potential && <span>{f.potential}</span>}
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}

function FTCLine() {
  return (
    <Card>
      <p className="text-sm text-neutral-400 mb-3">
        <strong className="text-neutral-200">
          FTC for line integrals.
        </strong>{" "}
        If <Tex math={String.raw`F = \nabla\varphi`} />, then{" "}
        <Tex math={String.raw`\int_C F \cdot d\mathbf{r} = \varphi(\mathbf{r}(t_1)) - \varphi(\mathbf{r}(t_0))`} />
        . Path doesn't matter, only endpoints.
      </p>

      <ul className="space-y-2 text-sm text-neutral-300">
        <li className="flex gap-2">
          <span className="text-teal-400 font-mono">·</span>
          <span>
            <strong>Conservative</strong>{" "}
            <Tex math={String.raw`\iff`} /> path-independent{" "}
            <Tex math={String.raw`\iff \oint F\cdot d\mathbf{r} = 0`} /> for
            every loop <Tex math={String.raw`\iff \nabla\times F = 0`} /> (on
            simply connected domain).
          </span>
        </li>
        <li className="flex gap-2">
          <span className="text-teal-400 font-mono">·</span>
          <span>
            Try the vortex field on the unit circle:{" "}
            <Tex math={String.raw`\oint \frac{-y\,dx + x\,dy}{x^2+y^2} = 2\pi`} />
            . The domain isn't simply connected (origin removed), so{" "}
            <Tex math={String.raw`\nabla\times F = 0`} /> locally but the
            integral isn't zero globally.
          </span>
        </li>
        <li className="flex gap-2">
          <span className="text-teal-400 font-mono">·</span>
          <span>
            Scalar line integrals{" "}
            <Tex math={String.raw`\int_C f\,ds`} /> don't care about direction,
            only length-weighted value.
          </span>
        </li>
      </ul>
    </Card>
  )
}

export default function LineIntegrals() {
  return (
    <TopicShell topic={topic}>
      <Section title="Accumulate ∫F·dr along a curve">
        <LineIntegralViz />
      </Section>
      <Section title="FTC for line integrals">
        <FTCLine />
      </Section>
    </TopicShell>
  )
}
