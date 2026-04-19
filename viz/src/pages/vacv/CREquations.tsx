import { useState } from "react"
import Tex from "../../components/Tex"
import TopicShell, { Section, Card } from "../../components/TopicShell"
import { TOPICS } from "../../topics"

const topic = TOPICS.find((t) => t.slug === "vacv/cr-equations")!

type C = [number, number]

function cMul(a: C, b: C): C {
  return [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]]
}
function cExp(a: C): C {
  const e = Math.exp(a[0])
  return [e * Math.cos(a[1]), e * Math.sin(a[1])]
}
function cInv(a: C): C {
  const d = a[0] * a[0] + a[1] * a[1] + 1e-18
  return [a[0] / d, -a[1] / d]
}
function cSin(a: C): C {
  return [Math.sin(a[0]) * Math.cosh(a[1]), Math.cos(a[0]) * Math.sinh(a[1])]
}
function cPow(a: C, n: number): C {
  let r: C = [1, 0]
  for (let k = 0; k < n; k++) r = cMul(r, a)
  return r
}

type Fn = {
  id: string
  name: string
  tex: string
  f: (z: C) => C
  holomorphic: boolean
  note: string
}

const FUNCS: Fn[] = [
  {
    id: "sq",
    name: "z²",
    tex: String.raw`f(z) = z^2`,
    f: (z) => cMul(z, z),
    holomorphic: true,
    note: "Doubles angles at origin (not conformal at z=0, since f′(0) = 0).",
  },
  {
    id: "exp",
    name: "exp z",
    tex: String.raw`f(z) = e^z`,
    f: cExp,
    holomorphic: true,
    note: "Horizontal lines → radial rays; vertical lines → circles.",
  },
  {
    id: "inv",
    name: "1/z",
    tex: String.raw`f(z) = 1/z`,
    f: cInv,
    holomorphic: true,
    note: "Möbius-type map. Sends lines/circles to lines/circles.",
  },
  {
    id: "sin",
    name: "sin z",
    tex: String.raw`f(z) = \sin z`,
    f: cSin,
    holomorphic: true,
    note: "Maps strip to plane minus branch cuts. Conformal away from zeros of cos.",
  },
  {
    id: "cube",
    name: "z³",
    tex: String.raw`f(z) = z^3`,
    f: (z) => cPow(z, 3),
    holomorphic: true,
    note: "Triples angles at origin.",
  },
  {
    id: "conj",
    name: "z̄ (conjugate)",
    tex: String.raw`f(z) = \bar z`,
    f: (z) => [z[0], -z[1]],
    holomorphic: false,
    note: "Not holomorphic: fails CR equations (u_x = 1, v_y = -1). Reflection, preserves angles but reverses orientation.",
  },
]

function GridMap({ f, gridN = 10 }: { f: (z: C) => C; gridN?: number }) {
  const W = 360
  const H = 360
  const L = 1.6

  const toScreen = (x: number, y: number): [number, number] => [
    W / 2 + (x / L) * (W / 2 - 20),
    H / 2 - (y / L) * (H / 2 - 20),
  ]

  // vertical lines
  const vLines: string[] = []
  for (let i = 0; i <= gridN; i++) {
    const x = -L + (i / gridN) * 2 * L
    const pts: string[] = []
    for (let j = 0; j <= 60; j++) {
      const y = -L + (j / 60) * 2 * L
      const w = f([x, y])
      pts.push(toScreen(w[0], w[1]).join(","))
    }
    vLines.push(pts.join(" "))
  }
  const hLines: string[] = []
  for (let j = 0; j <= gridN; j++) {
    const y = -L + (j / gridN) * 2 * L
    const pts: string[] = []
    for (let i = 0; i <= 60; i++) {
      const x = -L + (i / 60) * 2 * L
      const w = f([x, y])
      pts.push(toScreen(w[0], w[1]).join(","))
    }
    hLines.push(pts.join(" "))
  }

  return (
    <svg width={W} height={H} className="bg-neutral-950 block mx-auto max-w-full">
      <line x1={0} y1={H / 2} x2={W} y2={H / 2} stroke="#404040" strokeDasharray="2 3" />
      <line x1={W / 2} y1={0} x2={W / 2} y2={H} stroke="#404040" strokeDasharray="2 3" />
      {vLines.map((p, i) => (
        <polyline
          key={`v${i}`}
          points={p}
          fill="none"
          stroke="#6366f1"
          strokeWidth={i === Math.floor(gridN / 2) ? 1.8 : 0.8}
          opacity={0.8}
        />
      ))}
      {hLines.map((p, i) => (
        <polyline
          key={`h${i}`}
          points={p}
          fill="none"
          stroke="#f59e0b"
          strokeWidth={i === Math.floor(gridN / 2) ? 1.8 : 0.8}
          opacity={0.8}
        />
      ))}
    </svg>
  )
}

function CRCheck({ f }: { f: (z: C) => C }) {
  // numerically compute u_x, u_y, v_x, v_y at a few points
  const pts: [number, number][] = [
    [0.5, 0.3],
    [1, 0],
    [-0.4, 0.7],
  ]
  const h = 1e-4

  const rows = pts.map(([x, y]) => {
    const fxp = f([x + h, y])
    const fxm = f([x - h, y])
    const fyp = f([x, y + h])
    const fym = f([x, y - h])
    const ux = (fxp[0] - fxm[0]) / (2 * h)
    const vx = (fxp[1] - fxm[1]) / (2 * h)
    const uy = (fyp[0] - fym[0]) / (2 * h)
    const vy = (fyp[1] - fym[1]) / (2 * h)
    return {
      x, y,
      ux, uy, vx, vy,
      cr1: Math.abs(ux - vy),
      cr2: Math.abs(uy + vx),
    }
  })

  const ok = rows.every((r) => r.cr1 < 1e-3 && r.cr2 < 1e-3)

  return (
    <div className="rounded-md border border-neutral-800 bg-neutral-950 p-3">
      <div className="text-xs font-mono text-neutral-500 mb-2">
        Cauchy-Riemann check: u_x = v_y and u_y = -v_x
      </div>
      <div className="space-y-1 text-xs font-mono">
        {rows.map((r, i) => (
          <div key={i} className="flex items-center gap-3">
            <span className="text-neutral-400">
              z=({r.x},{r.y})
            </span>
            <span className={r.cr1 < 1e-3 ? "text-emerald-300" : "text-rose-300"}>
              u_x−v_y = {r.cr1.toExponential(1)}
            </span>
            <span className={r.cr2 < 1e-3 ? "text-emerald-300" : "text-rose-300"}>
              u_y+v_x = {r.cr2.toExponential(1)}
            </span>
          </div>
        ))}
      </div>
      <div
        className={`mt-2 rounded-md border px-2 py-0.5 text-xs font-mono inline-block ${
          ok
            ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-200"
            : "border-rose-500/40 bg-rose-500/10 text-rose-200"
        }`}
      >
        {ok ? "✓ holomorphic" : "✗ CR fails — not holomorphic"}
      </div>
    </div>
  )
}

function Conformal() {
  const [id, setId] = useState("exp")
  const fn = FUNCS.find((x) => x.id === id)!

  return (
    <Card>
      <p className="text-sm text-neutral-400 mb-3">
        <strong className="text-neutral-200">Holomorphic = conformal.</strong>{" "}
        Where <Tex math={String.raw`f'(z) \ne 0`} />, holomorphic maps preserve
        angles: orthogonal grid lines stay orthogonal (rotated and scaled
        locally by <Tex math={String.raw`f'(z)`} />).
      </p>

      <div className="flex flex-wrap gap-2 mb-3">
        {FUNCS.map((F) => (
          <button
            key={F.id}
            onClick={() => setId(F.id)}
            className={`rounded-md border px-2 py-1 text-xs font-mono ${
              id === F.id
                ? "border-teal-500/60 bg-teal-500/20 text-teal-200"
                : F.holomorphic
                ? "border-neutral-800 text-neutral-400 hover:bg-neutral-900"
                : "border-rose-700 text-rose-300 hover:bg-rose-900/20"
            }`}
          >
            {F.name}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-3">
        <div className="rounded-md border border-neutral-800 bg-neutral-950 p-2">
          <div className="text-xs text-neutral-500 px-2 pt-1 font-mono">
            domain (standard grid)
          </div>
          <IdentityGrid />
        </div>
        <div className="rounded-md border border-neutral-800 bg-neutral-950 p-2">
          <div className="text-xs text-neutral-500 px-2 pt-1 font-mono">
            image under <Tex math={fn.tex} />
          </div>
          <GridMap f={fn.f} />
        </div>
      </div>

      <div className="mt-3 text-xs text-neutral-500">{fn.note}</div>

      <div className="mt-3">
        <CRCheck f={fn.f} />
      </div>
    </Card>
  )
}

function IdentityGrid() {
  return <GridMap f={(z) => z} />
}

function HarmonicAndLaplace() {
  return (
    <Card>
      <p className="text-sm text-neutral-400 mb-3">
        <strong className="text-neutral-200">
          Consequences of the CR equations.
        </strong>
      </p>
      <ul className="space-y-2 text-sm text-neutral-300">
        <li className="flex gap-2">
          <span className="text-teal-400 font-mono">·</span>
          <span>
            If <Tex math={String.raw`f = u + iv`} /> is holomorphic, both{" "}
            <Tex math="u" /> and <Tex math="v" /> are <em>harmonic</em>:{" "}
            <Tex math={String.raw`\Delta u = u_{xx} + u_{yy} = 0`} />. From{" "}
            <Tex math={String.raw`u_x = v_y`} /> and <Tex math={String.raw`u_y = -v_x`} />,
            cross-differentiate.
          </span>
        </li>
        <li className="flex gap-2">
          <span className="text-teal-400 font-mono">·</span>
          <span>
            <Tex math="u" /> and <Tex math="v" /> are <em>conjugate harmonic</em>{" "}
            — the level curves of one are orthogonal to the level curves of the
            other.
          </span>
        </li>
        <li className="flex gap-2">
          <span className="text-teal-400 font-mono">·</span>
          <span>
            <Tex math={String.raw`f'(z) = u_x + iv_x = v_y - iu_y`} /> — the
            derivative has two equivalent formulas.
          </span>
        </li>
        <li className="flex gap-2">
          <span className="text-teal-400 font-mono">·</span>
          <span>
            Any holomorphic f with <Tex math={String.raw`f'(z_0) \ne 0`} /> is
            conformal at <Tex math="z_0" />: locally multiplies all tangent
            vectors by <Tex math={String.raw`f'(z_0)`} /> — a rotation and
            scaling.
          </span>
        </li>
      </ul>
    </Card>
  )
}

export default function CREquations() {
  return (
    <TopicShell topic={topic}>
      <Section title="Grid deformation — conformal maps">
        <Conformal />
      </Section>
      <Section title="Why CR implies harmonic, conformal">
        <HarmonicAndLaplace />
      </Section>
    </TopicShell>
  )
}
