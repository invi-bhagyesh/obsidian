import { useMemo, useState } from "react"
import Tex from "../../components/Tex"
import TopicShell, { Section, Card } from "../../components/TopicShell"
import { TOPICS } from "../../topics"

const topic = TOPICS.find((t) => t.slug === "vacv/greens-stokes")!

type VF = {
  id: string
  name: string
  P: (x: number, y: number) => number
  Q: (x: number, y: number) => number
  curlClosed: string
  divClosed: string
}

const FIELDS: VF[] = [
  {
    id: "rot",
    name: "⟨-y, x⟩",
    P: (_x, y) => -y,
    Q: (x) => x,
    curlClosed: "∂Q/∂x - ∂P/∂y = 1 - (-1) = 2",
    divClosed: "∂P/∂x + ∂Q/∂y = 0",
  },
  {
    id: "radial",
    name: "⟨x, y⟩",
    P: (x) => x,
    Q: (_x, y) => y,
    curlClosed: "∂Q/∂x - ∂P/∂y = 0",
    divClosed: "∂P/∂x + ∂Q/∂y = 2",
  },
  {
    id: "xy",
    name: "⟨xy, x²⟩",
    P: (x, y) => x * y,
    Q: (x) => x * x,
    curlClosed: "∂Q/∂x - ∂P/∂y = 2x - x = x",
    divClosed: "∂P/∂x + ∂Q/∂y = y + 0 = y",
  },
  {
    id: "poly",
    name: "⟨x²y, xy²⟩",
    P: (x, y) => x * x * y,
    Q: (x, y) => x * y * y,
    curlClosed: "∂Q/∂x - ∂P/∂y = y² - x²",
    divClosed: "∂P/∂x + ∂Q/∂y = 2xy + 2xy = 4xy",
  },
]

function lineInt(f: VF, curve: (t: number) => [number, number], t0: number, t1: number, N = 600): number {
  let sum = 0
  const dt = (t1 - t0) / N
  for (let k = 0; k < N; k++) {
    const t = t0 + (k + 0.5) * dt
    const eps = 1e-4
    const [x, y] = curve(t)
    const [xp, yp] = curve(t + eps)
    const [xm, ym] = curve(t - eps)
    const dxdt = (xp - xm) / (2 * eps)
    const dydt = (yp - ym) / (2 * eps)
    sum += (f.P(x, y) * dxdt + f.Q(x, y) * dydt) * dt
  }
  return sum
}

function fluxInt(f: VF, curve: (t: number) => [number, number], t0: number, t1: number, N = 600): number {
  // ∮ F · n ds = ∮ P dy - Q dx
  let sum = 0
  const dt = (t1 - t0) / N
  for (let k = 0; k < N; k++) {
    const t = t0 + (k + 0.5) * dt
    const eps = 1e-4
    const [x, y] = curve(t)
    const [xp, yp] = curve(t + eps)
    const [xm, ym] = curve(t - eps)
    const dxdt = (xp - xm) / (2 * eps)
    const dydt = (yp - ym) / (2 * eps)
    sum += (f.P(x, y) * dydt - f.Q(x, y) * dxdt) * dt
  }
  return sum
}

// Double integrate g(x,y) over a region specified by polygon (convex assumed)
function regionInt(
  g: (x: number, y: number) => number,
  xRange: [number, number],
  yRange: [number, number],
  inside: (x: number, y: number) => boolean,
  N = 80,
): { value: number; area: number } {
  const [x0, x1] = xRange
  const [y0, y1] = yRange
  const dx = (x1 - x0) / N
  const dy = (y1 - y0) / N
  let sum = 0
  let area = 0
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      const x = x0 + (i + 0.5) * dx
      const y = y0 + (j + 0.5) * dy
      if (inside(x, y)) {
        sum += g(x, y) * dx * dy
        area += dx * dy
      }
    }
  }
  return { value: sum, area }
}

type Region = {
  id: string
  name: string
  boundary: (t: number) => [number, number]
  tRange: [number, number]
  xRange: [number, number]
  yRange: [number, number]
  inside: (x: number, y: number) => boolean
  area: number
}

const REGIONS: Region[] = [
  {
    id: "disk",
    name: "unit disk",
    boundary: (t) => [Math.cos(t), Math.sin(t)],
    tRange: [0, 2 * Math.PI],
    xRange: [-1, 1],
    yRange: [-1, 1],
    inside: (x, y) => x * x + y * y <= 1,
    area: Math.PI,
  },
  {
    id: "square",
    name: "[0,1]×[0,1]",
    boundary: (t) => {
      if (t < 1) return [t, 0]
      if (t < 2) return [1, t - 1]
      if (t < 3) return [3 - t, 1]
      return [0, 4 - t]
    },
    tRange: [0, 4],
    xRange: [0, 1],
    yRange: [0, 1],
    inside: (x, y) => x >= 0 && x <= 1 && y >= 0 && y <= 1,
    area: 1,
  },
  {
    id: "triangle",
    name: "triangle (0,0)(1,0)(0,1)",
    boundary: (t) => {
      if (t < 1) return [t, 0]
      if (t < 2) return [2 - t, t - 1]
      return [0, 3 - t]
    },
    tRange: [0, 3],
    xRange: [0, 1],
    yRange: [0, 1],
    inside: (x, y) => x >= 0 && y >= 0 && x + y <= 1,
    area: 0.5,
  },
  {
    id: "ellipse",
    name: "ellipse x²/4 + y² = 1",
    boundary: (t) => [2 * Math.cos(t), Math.sin(t)],
    tRange: [0, 2 * Math.PI],
    xRange: [-2, 2],
    yRange: [-1, 1],
    inside: (x, y) => x * x / 4 + y * y <= 1,
    area: 2 * Math.PI,
  },
]

function GreenDemo() {
  const [fid, setFid] = useState("rot")
  const [rid, setRid] = useState("disk")
  const f = FIELDS.find((x) => x.id === fid)!
  const r = REGIONS.find((x) => x.id === rid)!

  const circ = useMemo(
    () => lineInt(f, r.boundary, r.tRange[0], r.tRange[1]),
    [f, r],
  )
  const curlDbl = useMemo(() => {
    // compute curl numerically
    const curl = (x: number, y: number) => {
      const h = 1e-4
      const dQdx = (f.Q(x + h, y) - f.Q(x - h, y)) / (2 * h)
      const dPdy = (f.P(x, y + h) - f.P(x, y - h)) / (2 * h)
      return dQdx - dPdy
    }
    return regionInt(curl, r.xRange, r.yRange, r.inside).value
  }, [f, r])

  const flux = useMemo(
    () => fluxInt(f, r.boundary, r.tRange[0], r.tRange[1]),
    [f, r],
  )
  const divDbl = useMemo(() => {
    const div = (x: number, y: number) => {
      const h = 1e-4
      const dPdx = (f.P(x + h, y) - f.P(x - h, y)) / (2 * h)
      const dQdy = (f.Q(x, y + h) - f.Q(x, y - h)) / (2 * h)
      return dPdx + dQdy
    }
    return regionInt(div, r.xRange, r.yRange, r.inside).value
  }, [f, r])

  // boundary viz
  const W = 320
  const H = 320
  const L = 2.3
  const toScreen = (x: number, y: number): [number, number] => [
    W / 2 + (x / L) * (W / 2 - 20),
    H / 2 - (y / L) * (H / 2 - 20),
  ]
  const bd = useMemo(() => {
    const N = 120
    const pts: [number, number][] = []
    for (let k = 0; k <= N; k++) {
      const t = r.tRange[0] + (k / N) * (r.tRange[1] - r.tRange[0])
      pts.push(r.boundary(t))
    }
    return pts
  }, [r])

  return (
    <Card>
      <p className="text-sm text-neutral-400 mb-3">
        <strong className="text-neutral-200">Green's theorem.</strong>{" "}
        <Tex math={String.raw`\oint_{\partial D} P\,dx + Q\,dy = \iint_D \left(\frac{\partial Q}{\partial x} - \frac{\partial P}{\partial y}\right) dA`} />
        . Line integral around boundary = double integral of curl inside.
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
        {REGIONS.map((R) => (
          <button
            key={R.id}
            onClick={() => setRid(R.id)}
            className={`rounded-md border px-2 py-1 text-xs font-mono ${
              rid === R.id
                ? "border-emerald-500/60 bg-emerald-500/20 text-emerald-200"
                : "border-neutral-800 text-neutral-400 hover:bg-neutral-900"
            }`}
          >
            {R.name}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-[1fr_1fr] gap-3">
        <div className="rounded-md border border-neutral-800 bg-neutral-950 p-2">
          <svg width={W} height={H} className="block mx-auto max-w-full">
            <line x1={0} y1={H / 2} x2={W} y2={H / 2} stroke="#404040" strokeDasharray="2 3" />
            <line x1={W / 2} y1={0} x2={W / 2} y2={H} stroke="#404040" strokeDasharray="2 3" />
            <polygon
              points={bd.map(([x, y]) => toScreen(x, y).join(",")).join(" ")}
              fill="#34d39910"
              stroke="#34d399"
              strokeWidth={2}
            />
          </svg>
          <div className="mt-1 text-center text-xs text-neutral-500 font-mono">
            area = {r.area.toFixed(3)}
          </div>
        </div>

        <div className="rounded-md border border-neutral-800 bg-neutral-950 p-3 space-y-3 text-xs font-mono">
          <div>
            <div className="text-neutral-500 mb-1">circulation form (tangent)</div>
            <div className="flex items-center justify-between">
              <span className="text-emerald-300">∮ P dx + Q dy</span>
              <span className="text-neutral-300">{circ.toFixed(3)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-emerald-300">∫∫ (∂Q/∂x − ∂P/∂y) dA</span>
              <span className="text-neutral-300">{curlDbl.toFixed(3)}</span>
            </div>
            <div className="text-[10px] text-neutral-500 mt-1">{f.curlClosed}</div>
            <div
              className={`mt-1 text-center ${
                Math.abs(circ - curlDbl) < 0.05 ? "text-emerald-300" : "text-rose-300"
              }`}
            >
              {Math.abs(circ - curlDbl) < 0.05 ? "✓ matches" : `diff ${(circ - curlDbl).toFixed(3)}`}
            </div>
          </div>

          <div className="border-t border-neutral-800 pt-3">
            <div className="text-neutral-500 mb-1">flux form (outward normal)</div>
            <div className="flex items-center justify-between">
              <span className="text-sky-300">∮ P dy − Q dx</span>
              <span className="text-neutral-300">{flux.toFixed(3)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sky-300">∫∫ (∂P/∂x + ∂Q/∂y) dA</span>
              <span className="text-neutral-300">{divDbl.toFixed(3)}</span>
            </div>
            <div className="text-[10px] text-neutral-500 mt-1">{f.divClosed}</div>
            <div
              className={`mt-1 text-center ${
                Math.abs(flux - divDbl) < 0.05 ? "text-emerald-300" : "text-rose-300"
              }`}
            >
              {Math.abs(flux - divDbl) < 0.05 ? "✓ matches" : `diff ${(flux - divDbl).toFixed(3)}`}
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

function StokesDivergence() {
  return (
    <Card>
      <p className="text-sm text-neutral-400 mb-3">
        <strong className="text-neutral-200">
          The family of boundary ↔ interior theorems.
        </strong>{" "}
        All one idea: "integrate a derivative over a region → evaluate on the
        boundary."
      </p>

      <div className="grid md:grid-cols-3 gap-3">
        <div className="rounded-md border border-emerald-500/30 bg-emerald-500/5 p-3">
          <div className="text-emerald-300 font-mono text-sm mb-2">Green (2D)</div>
          <div className="text-xs text-neutral-300 text-center">
            <Tex math={String.raw`\oint_{\partial D} P\,dx + Q\,dy = \iint_D (Q_x - P_y)\,dA`} />
          </div>
          <div className="text-xs text-neutral-500 mt-2">
            region D in ℝ², bounded by closed curve ∂D
          </div>
        </div>
        <div className="rounded-md border border-violet-500/30 bg-violet-500/5 p-3">
          <div className="text-violet-300 font-mono text-sm mb-2">Stokes (3D)</div>
          <div className="text-xs text-neutral-300 text-center">
            <Tex math={String.raw`\oint_{\partial S} F \cdot d\mathbf{r} = \iint_S (\nabla\times F) \cdot d\mathbf{S}`} />
          </div>
          <div className="text-xs text-neutral-500 mt-2">
            surface S in ℝ³, bounded by curve ∂S. Green = Stokes in the plane.
          </div>
        </div>
        <div className="rounded-md border border-sky-500/30 bg-sky-500/5 p-3">
          <div className="text-sky-300 font-mono text-sm mb-2">Divergence (3D)</div>
          <div className="text-xs text-neutral-300 text-center">
            <Tex math={String.raw`\oiint_{\partial V} F \cdot d\mathbf{S} = \iiint_V \nabla\cdot F\,dV`} />
          </div>
          <div className="text-xs text-neutral-500 mt-2">
            volume V bounded by closed surface ∂V. Generalization of FTC.
          </div>
        </div>
      </div>

      <p className="mt-3 text-xs text-neutral-500">
        Unified by the{" "}
        <strong className="text-neutral-300">generalized Stokes' theorem</strong>{" "}
        <Tex math={String.raw`\int_{\partial M} \omega = \int_M d\omega`} />{" "}
        for differential forms on manifolds. FTC is the 1D version.
      </p>
    </Card>
  )
}

export default function GreenStokes() {
  return (
    <TopicShell topic={topic}>
      <Section title="Green's theorem — boundary ↔ curl">
        <GreenDemo />
      </Section>
      <Section title="Stokes & divergence — the full family">
        <StokesDivergence />
      </Section>
    </TopicShell>
  )
}
