import { useMemo, useState } from "react"
import Tex from "../../components/Tex"
import TopicShell, { Section, Card } from "../../components/TopicShell"
import { TOPICS } from "../../topics"

const topic = TOPICS.find((t) => t.slug === "vacv/contour-integrals")!

type C = [number, number]

function cAdd(a: C, b: C): C { return [a[0] + b[0], a[1] + b[1]] }
function cSub(a: C, b: C): C { return [a[0] - b[0], a[1] - b[1]] }
function cMul(a: C, b: C): C { return [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]] }
function cDiv(a: C, b: C): C {
  const d = b[0] * b[0] + b[1] * b[1] + 1e-18
  return [(a[0] * b[0] + a[1] * b[1]) / d, (a[1] * b[0] - a[0] * b[1]) / d]
}

function contourIntegrate(f: (z: C) => C, center: C, r: number, N = 800): C {
  // ∮ f dz over circle of radius r around center
  let sum: C = [0, 0]
  for (let k = 0; k < N; k++) {
    const t = (2 * Math.PI * (k + 0.5)) / N
    const z: C = [center[0] + r * Math.cos(t), center[1] + r * Math.sin(t)]
    const dz: C = [-r * Math.sin(t) * (2 * Math.PI / N), r * Math.cos(t) * (2 * Math.PI / N)]
    sum = cAdd(sum, cMul(f(z), dz))
  }
  return sum
}

type Example = {
  id: string
  name: string
  tex: string
  f: (z: C) => C
  poles: { z: C; order: number; residue: C; label: string }[]
}

const EXAMPLES: Example[] = [
  {
    id: "simple",
    name: "1/z",
    tex: String.raw`f(z) = \frac{1}{z}`,
    f: (z) => cDiv([1, 0], z),
    poles: [{ z: [0, 0], order: 1, residue: [1, 0], label: "z = 0" }],
  },
  {
    id: "two",
    name: "1/((z-1)(z+1))",
    tex: String.raw`f(z) = \frac{1}{(z-1)(z+1)}`,
    f: (z) => cDiv([1, 0], cMul(cSub(z, [1, 0]), cAdd(z, [1, 0]))),
    poles: [
      { z: [1, 0], order: 1, residue: [0.5, 0], label: "z = 1" },
      { z: [-1, 0], order: 1, residue: [-0.5, 0], label: "z = -1" },
    ],
  },
  {
    id: "double",
    name: "1/z²",
    tex: String.raw`f(z) = \frac{1}{z^2}`,
    f: (z) => cDiv([1, 0], cMul(z, z)),
    poles: [{ z: [0, 0], order: 2, residue: [0, 0], label: "z = 0 (double pole, residue 0)" }],
  },
  {
    id: "zsq1",
    name: "1/(z²+1)",
    tex: String.raw`f(z) = \frac{1}{z^2+1}`,
    f: (z) => cDiv([1, 0], cAdd(cMul(z, z), [1, 0])),
    poles: [
      { z: [0, 1], order: 1, residue: [0, -0.5], label: "z = i" },
      { z: [0, -1], order: 1, residue: [0, 0.5], label: "z = -i" },
    ],
  },
  {
    id: "exp",
    name: "exp(z)/z",
    tex: String.raw`f(z) = \frac{e^z}{z}`,
    f: (z) => {
      const e = Math.exp(z[0])
      const eZ: C = [e * Math.cos(z[1]), e * Math.sin(z[1])]
      return cDiv(eZ, z)
    },
    poles: [{ z: [0, 0], order: 1, residue: [1, 0], label: "z = 0, res = e⁰ = 1" }],
  },
]

function ResidueDemo() {
  const [eid, setEid] = useState("two")
  const [cx, setCx] = useState(0)
  const [cy, setCy] = useState(0)
  const [r, setR] = useState(1.5)
  const e = EXAMPLES.find((x) => x.id === eid)!

  const integral = useMemo(
    () => contourIntegrate(e.f, [cx, cy], r),
    [e, cx, cy, r],
  )
  // divide by 2πi to get sum of residues
  const oneOver2pi = 1 / (2 * Math.PI)
  const residueSum: C = [integral[1] * oneOver2pi, -integral[0] * oneOver2pi]

  const enclosedPoles = e.poles.filter((p) => {
    const dx = p.z[0] - cx
    const dy = p.z[1] - cy
    return dx * dx + dy * dy < r * r
  })
  const expected: C = enclosedPoles.reduce<C>(
    (acc, p) => cAdd(acc, p.residue),
    [0, 0],
  )

  // viz
  const W = 360
  const H = 360
  const L = 3
  const toScreen = (x: number, y: number): [number, number] => [
    W / 2 + (x / L) * (W / 2 - 20),
    H / 2 - (y / L) * (H / 2 - 20),
  ]

  const bd = useMemo(() => {
    const pts: string[] = []
    for (let k = 0; k <= 100; k++) {
      const t = (2 * Math.PI * k) / 100
      const [sx, sy] = toScreen(cx + r * Math.cos(t), cy + r * Math.sin(t))
      pts.push(`${sx},${sy}`)
    }
    return pts.join(" ")
  }, [cx, cy, r])

  const zeroColor = "#fbbf24"

  return (
    <Card>
      <p className="text-sm text-neutral-400 mb-3">
        <strong className="text-neutral-200">Residue theorem.</strong>{" "}
        <Tex math={String.raw`\oint_\gamma f(z)\,dz = 2\pi i \sum_{z_k \in \mathrm{int}(\gamma)} \mathrm{Res}(f, z_k)`} />
        . Slide the contour to enclose different poles.
      </p>

      <div className="flex flex-wrap gap-2 mb-3">
        {EXAMPLES.map((E) => (
          <button
            key={E.id}
            onClick={() => {
              setEid(E.id)
              setCx(0)
              setCy(0)
              setR(1.5)
            }}
            className={`rounded-md border px-2 py-1 text-xs font-mono ${
              eid === E.id
                ? "border-teal-500/60 bg-teal-500/20 text-teal-200"
                : "border-neutral-800 text-neutral-400 hover:bg-neutral-900"
            }`}
          >
            {E.name}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-[1fr_260px] gap-3">
        <div className="rounded-md border border-neutral-800 bg-neutral-950 p-2">
          <svg width={W} height={H} className="block mx-auto max-w-full">
            <line x1={0} y1={H / 2} x2={W} y2={H / 2} stroke="#404040" strokeDasharray="2 3" />
            <line x1={W / 2} y1={0} x2={W / 2} y2={H} stroke="#404040" strokeDasharray="2 3" />

            {/* contour */}
            <polygon points={bd} fill="#34d39910" stroke="#34d399" strokeWidth={2} />

            {/* poles */}
            {e.poles.map((p, i) => {
              const [sx, sy] = toScreen(p.z[0], p.z[1])
              const inside = (p.z[0] - cx) ** 2 + (p.z[1] - cy) ** 2 < r * r
              return (
                <g key={i}>
                  <circle
                    cx={sx}
                    cy={sy}
                    r={7}
                    fill={inside ? "#f43f5e" : "#525252"}
                    stroke="#0b0d10"
                    strokeWidth={1.5}
                  />
                  <text
                    x={sx + 10}
                    y={sy + 3}
                    fontSize="10"
                    fontFamily="ui-monospace, monospace"
                    fill={inside ? "#fca5a5" : "#737373"}
                  >
                    {p.label}
                  </text>
                </g>
              )
            })}
            {/* center of contour */}
            {(() => {
              const [sx, sy] = toScreen(cx, cy)
              return <circle cx={sx} cy={sy} r={3} fill={zeroColor} />
            })()}
          </svg>
        </div>

        <div className="space-y-3">
          <div className="rounded-md border border-neutral-800 bg-neutral-950 p-3 space-y-2 text-xs font-mono">
            <div>
              <span className="text-neutral-500">center x</span>
              <input
                type="range"
                min={-2.5}
                max={2.5}
                step={0.05}
                value={cx}
                onChange={(e) => setCx(Number(e.target.value))}
                className="w-full accent-amber-400"
              />
              <span className="text-neutral-300">cx = {cx.toFixed(2)}</span>
            </div>
            <div>
              <span className="text-neutral-500">center y</span>
              <input
                type="range"
                min={-2.5}
                max={2.5}
                step={0.05}
                value={cy}
                onChange={(e) => setCy(Number(e.target.value))}
                className="w-full accent-amber-400"
              />
              <span className="text-neutral-300">cy = {cy.toFixed(2)}</span>
            </div>
            <div>
              <span className="text-neutral-500">radius</span>
              <input
                type="range"
                min={0.1}
                max={2.5}
                step={0.05}
                value={r}
                onChange={(e) => setR(Number(e.target.value))}
                className="w-full accent-amber-400"
              />
              <span className="text-neutral-300">r = {r.toFixed(2)}</span>
            </div>
          </div>

          <div className="rounded-md border border-neutral-800 bg-neutral-950 p-3 text-xs font-mono">
            <div className="text-sky-300 mb-1">numerical</div>
            <div className="text-neutral-200">
              ∮ f dz = {integral[0].toFixed(3)}{" + "}
              {integral[1].toFixed(3)}i
            </div>
            <div className="text-neutral-200 mt-1">
              ∑ Res ≈ {residueSum[0].toFixed(3)}{" + "}
              {residueSum[1].toFixed(3)}i
            </div>
            <div className="border-t border-neutral-800 my-2" />
            <div className="text-emerald-300">expected</div>
            <div className="text-neutral-200">
              ∑ Res = {expected[0].toFixed(3)}{" + "}
              {expected[1].toFixed(3)}i
            </div>
            <div
              className={`text-center mt-2 ${
                Math.hypot(residueSum[0] - expected[0], residueSum[1] - expected[1]) < 0.05
                  ? "text-emerald-300"
                  : "text-rose-300"
              }`}
            >
              {Math.hypot(residueSum[0] - expected[0], residueSum[1] - expected[1]) < 0.05
                ? "✓ matches"
                : "diff — check enclosure"}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3 rounded-md border border-neutral-800 bg-neutral-950 p-3 text-sm">
        <div className="font-mono text-neutral-300 mb-1">
          <Tex math={e.tex} />
        </div>
        <div className="text-xs text-neutral-500">
          Red dots = poles inside the contour. Gray = outside (don't
          contribute). Adjust the contour to see the residue sum change
          abruptly as poles cross the boundary.
        </div>
      </div>
    </Card>
  )
}

function ResidueFormulas() {
  return (
    <Card>
      <p className="text-sm text-neutral-400 mb-3">
        <strong className="text-neutral-200">Computing residues.</strong>
      </p>
      <ul className="space-y-2 text-sm text-neutral-300">
        <li className="flex gap-2">
          <span className="text-teal-400 font-mono">·</span>
          <span>
            <strong>Simple pole at z₀:</strong>{" "}
            <Tex math={String.raw`\mathrm{Res}(f, z_0) = \lim_{z\to z_0}(z-z_0)f(z)`} />
          </span>
        </li>
        <li className="flex gap-2">
          <span className="text-teal-400 font-mono">·</span>
          <span>
            <strong>Pole of order n:</strong>{" "}
            <Tex math={String.raw`\mathrm{Res}(f, z_0) = \frac{1}{(n-1)!}\lim_{z\to z_0}\frac{d^{n-1}}{dz^{n-1}}\bigl[(z-z_0)^n f(z)\bigr]`} />
          </span>
        </li>
        <li className="flex gap-2">
          <span className="text-teal-400 font-mono">·</span>
          <span>
            <strong>Quotient g/h with simple zero of h:</strong>{" "}
            <Tex math={String.raw`\mathrm{Res}(g/h, z_0) = g(z_0)/h'(z_0)`} />
          </span>
        </li>
        <li className="flex gap-2">
          <span className="text-teal-400 font-mono">·</span>
          <span>
            <strong>Laurent series:</strong> residue is the{" "}
            <Tex math={String.raw`a_{-1}`} /> coefficient in{" "}
            <Tex math={String.raw`f(z) = \sum_{n} a_n (z - z_0)^n`} />.
          </span>
        </li>
      </ul>

      <div className="mt-3 rounded-md border border-neutral-800 bg-neutral-950 p-3">
        <div className="text-xs font-mono text-neutral-400 mb-2">
          integrals by residues
        </div>
        <div className="text-sm text-neutral-300">
          <Tex math={String.raw`\int_{-\infty}^{\infty}\frac{dx}{x^2+1} = \pi`} />{" "}
          — close the contour in the upper half-plane, the only enclosed pole
          is z = i with residue 1/(2i), so the integral equals{" "}
          <Tex math={String.raw`2\pi i \cdot \frac{1}{2i} = \pi`} />.
        </div>
      </div>
    </Card>
  )
}

export default function ContourIntegrals() {
  return (
    <TopicShell topic={topic}>
      <Section title="Residue theorem — drag the contour">
        <ResidueDemo />
      </Section>
      <Section title="Computing residues">
        <ResidueFormulas />
      </Section>
    </TopicShell>
  )
}
