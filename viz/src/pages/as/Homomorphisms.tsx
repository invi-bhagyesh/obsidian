import { useMemo, useState } from "react"
import { motion } from "framer-motion"
import Tex from "../../components/Tex"
import TopicShell, { Section, Card } from "../../components/TopicShell"
import { TOPICS } from "../../topics"
import { GROUPS } from "./groupData"

const topic = TOPICS.find((t) => t.slug === "as/homomorphisms")!

type G = (typeof GROUPS)[0]

// Check whether the assignment f: G -> H is a homomorphism
// and if so, report kernel and image
function analyze(
  G: G,
  H: G,
  f: number[],
): {
  ok: boolean
  violations: { a: number; b: number; lhs: number; rhs: number }[]
  kernel?: number[]
  image?: number[]
} {
  const violations: { a: number; b: number; lhs: number; rhs: number }[] = []
  for (let a = 0; a < G.order; a++) {
    for (let b = 0; b < G.order; b++) {
      const lhs = f[G.mul[a][b]]
      const rhs = H.mul[f[a]][f[b]]
      if (lhs !== rhs) violations.push({ a, b, lhs, rhs })
    }
  }
  const ok = violations.length === 0
  if (!ok) return { ok, violations }
  const kernel: number[] = []
  for (let a = 0; a < G.order; a++) if (f[a] === 0) kernel.push(a)
  const imSet = new Set<number>(f)
  const image = Array.from(imSet).sort((a, b) => a - b)
  return { ok, violations, kernel, image }
}

// Preset homomorphisms worth exploring
type Preset = {
  name: string
  gid: string
  hid: string
  f: (G: G) => number[]
  description: string
}

const PRESETS: Preset[] = [
  {
    name: "Z₆ → Z₃ (reduce mod 3)",
    gid: "Z6",
    hid: "Z6",
    f: (G) => G.elems.map((_, i) => i % 3),
    description:
      "Kernel = {0, 3} ≅ Z₂. Image = {0,1,2}. Doesn't actually map into Z₃, but mimics it inside Z₆.",
  },
  {
    name: "Z₄ → Z₄ (mult by 2)",
    gid: "Z4",
    hid: "Z4",
    f: (G) => G.elems.map((_, i) => (2 * i) % 4),
    description:
      "Kernel = {0, 2}. Image = {0, 2} — the unique subgroup of order 2.",
  },
  {
    name: "Z₆ → Z₆ (mult by 2)",
    gid: "Z6",
    hid: "Z6",
    f: (G) => G.elems.map((_, i) => (2 * i) % 6),
    description: "Kernel = {0, 3}. Image = {0,2,4} ≅ Z₃.",
  },
  {
    name: "D₃ → Z₂ (sign of reflection)",
    gid: "D3",
    hid: "Z4",
    f: (G) => G.elems.map((lbl) => (lbl.startsWith("s") ? 2 : 0)),
    description:
      "Sends rotations → 0, reflections → 2 (inside Z₄). Kernel = rotations.",
  },
  {
    name: "D₄ → Z₂ (sign)",
    gid: "D4",
    hid: "Z4",
    f: (G) => G.elems.map((lbl) => (lbl.startsWith("s") ? 2 : 0)),
    description: "Kernel = cyclic rotations ⟨r⟩, image = {0,2}.",
  },
  {
    name: "S₃ → Z₂ (even/odd)",
    gid: "S3",
    hid: "Z4",
    f: (G) =>
      G.elems.map((lbl) => {
        // labels: e, (12), (13), (23), (123), (132)
        if (lbl === "e" || lbl.length === 5) return 0
        return 2
      }),
    description:
      "The sign homomorphism — A₃ = {e,(123),(132)} is the kernel.",
  },
  {
    name: "Z₄ → Z₆ (zero map)",
    gid: "Z4",
    hid: "Z6",
    f: (G) => G.elems.map(() => 0),
    description: "Trivial homomorphism — kernel = all of G, image = {e}.",
  },
  {
    name: "Z₄ → Z₆ (broken: i ↦ i mod 6)",
    gid: "Z4",
    hid: "Z6",
    f: (G) => G.elems.map((_, i) => i),
    description:
      "NOT a homomorphism: f(2+2) = f(0) = 0, but f(2)+f(2) = 4. Mismatch.",
  },
  {
    name: "V₄ → Z₄ (broken: double flip)",
    gid: "V4",
    hid: "Z4",
    f: () => [0, 1, 2, 3],
    description:
      "NOT a homomorphism: a*a=e so f(a)+f(a)=2f(a)=2 should equal 0, but 2≠0 in Z₄.",
  },
]

function HomomorphismExplorer() {
  const [pi, setPi] = useState(0)
  const preset = PRESETS[pi]
  const G = GROUPS.find((g) => g.id === preset.gid)!
  const H = GROUPS.find((g) => g.id === preset.hid)!
  const f = useMemo(() => preset.f(G), [preset, G])
  const result = useMemo(() => analyze(G, H, f), [G, H, f])

  const W = 520
  const GHeight = 240
  const leftX = 70
  const rightX = W - 70
  const gY = (i: number) => 30 + (i / Math.max(1, G.order - 1)) * (GHeight - 60)
  const hY = (i: number) => 30 + (i / Math.max(1, H.order - 1)) * (GHeight - 60)

  return (
    <Card>
      <p className="text-sm text-neutral-400 mb-3">
        <strong className="text-neutral-200">Homomorphism.</strong> A map{" "}
        <Tex math={String.raw`\varphi: G \to H`} /> with{" "}
        <Tex math={String.raw`\varphi(ab) = \varphi(a)\varphi(b)`} />. It
        automatically sends identity → identity and inverses → inverses.
      </p>

      <div className="flex flex-wrap gap-2 mb-3">
        {PRESETS.map((p, i) => (
          <button
            key={i}
            onClick={() => setPi(i)}
            className={`rounded-md border px-2 py-1 text-xs font-mono ${
              pi === i
                ? "border-amber-500/60 bg-amber-500/20 text-amber-200"
                : "border-neutral-800 text-neutral-400 hover:bg-neutral-900"
            }`}
          >
            {p.name}
          </button>
        ))}
      </div>

      <div className="rounded-md border border-neutral-800 bg-neutral-950 p-4">
        <div className="flex items-center justify-between mb-2 text-xs font-mono text-neutral-500">
          <span>
            G = <Tex math={G.tex} />
          </span>
          <span
            className={`rounded-md px-2 py-0.5 ${
              result.ok
                ? "bg-emerald-500/10 text-emerald-300 border border-emerald-500/40"
                : "bg-rose-500/10 text-rose-300 border border-rose-500/40"
            }`}
          >
            {result.ok ? "✓ homomorphism" : "✗ not a homomorphism"}
          </span>
          <span>
            H = <Tex math={H.tex} />
          </span>
        </div>

        <svg width={W} height={GHeight} className="block mx-auto max-w-full">
          {/* arrows */}
          {G.elems.map((_, i) => {
            const y1 = gY(i)
            const y2 = hY(f[i])
            const inKernel = result.ok && f[i] === 0
            return (
              <motion.line
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                x1={leftX + 20}
                y1={y1}
                x2={rightX - 20}
                y2={y2}
                stroke={inKernel ? "#34d399" : "#525252"}
                strokeWidth={inKernel ? 2 : 1.2}
                opacity={inKernel ? 0.9 : 0.5}
                strokeDasharray={inKernel ? "none" : "3 3"}
              />
            )
          })}
          {/* G column */}
          {G.elems.map((e, i) => (
            <motion.g
              key={`g${i}`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.03 }}
            >
              <circle
                cx={leftX}
                cy={gY(i)}
                r={12}
                fill="#1e293b"
                stroke={result.ok && f[i] === 0 ? "#34d399" : "#6366f1"}
                strokeWidth={result.ok && f[i] === 0 ? 2.5 : 1.5}
              />
              <text
                x={leftX}
                y={gY(i) + 3}
                textAnchor="middle"
                fontSize="10"
                fontFamily="ui-monospace, monospace"
                fill="#e5e5e5"
              >
                {e}
              </text>
            </motion.g>
          ))}
          {/* H column */}
          {H.elems.map((e, i) => {
            const inImage = result.ok && result.image!.includes(i)
            return (
              <motion.g
                key={`h${i}`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.03 }}
              >
                <circle
                  cx={rightX}
                  cy={hY(i)}
                  r={12}
                  fill={inImage ? "#3b0764" : "#1e293b"}
                  stroke={inImage ? "#a78bfa" : "#525252"}
                  strokeWidth={inImage ? 2.5 : 1.5}
                />
                <text
                  x={rightX}
                  y={hY(i) + 3}
                  textAnchor="middle"
                  fontSize="10"
                  fontFamily="ui-monospace, monospace"
                  fill="#e5e5e5"
                >
                  {e}
                </text>
              </motion.g>
            )
          })}
          <text x={leftX} y={16} textAnchor="middle" fontSize="11" fill="#737373">G</text>
          <text x={rightX} y={16} textAnchor="middle" fontSize="11" fill="#737373">H</text>
        </svg>

        {/* legend */}
        <div className="mt-2 flex items-center justify-center gap-4 text-xs">
          <span className="inline-flex items-center gap-1.5">
            <span className="inline-block w-3 h-3 rounded-full border-2 border-emerald-400 bg-slate-800" />
            <span className="text-neutral-400">kernel</span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="inline-block w-3 h-3 rounded-full bg-violet-950 border-2 border-violet-400" />
            <span className="text-neutral-400">image</span>
          </span>
        </div>
      </div>

      <p className="mt-3 text-xs text-neutral-500">{preset.description}</p>

      {result.ok ? (
        <div className="mt-3 grid sm:grid-cols-2 gap-3">
          <div className="rounded-md border border-emerald-500/30 bg-emerald-500/5 p-3">
            <div className="text-xs font-mono text-emerald-200 mb-1">
              ker φ
            </div>
            <div className="text-sm font-mono text-neutral-200">
              {"{"}
              {result.kernel!.map((i) => G.elems[i]).join(", ")}
              {"}"}
            </div>
            <div className="text-xs text-neutral-500 mt-1">
              |ker φ| = {result.kernel!.length}; normal in G.
            </div>
          </div>
          <div className="rounded-md border border-violet-500/30 bg-violet-500/5 p-3">
            <div className="text-xs font-mono text-violet-200 mb-1">
              im φ
            </div>
            <div className="text-sm font-mono text-neutral-200">
              {"{"}
              {result.image!.map((i) => H.elems[i]).join(", ")}
              {"}"}
            </div>
            <div className="text-xs text-neutral-500 mt-1">
              |im φ| = {result.image!.length}; subgroup of H.
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-3 rounded-md border border-rose-500/30 bg-rose-500/5 p-3 text-xs font-mono">
          <div className="text-rose-200 mb-1">
            Counterexample (from {result.violations.length} violation
            {result.violations.length === 1 ? "" : "s"}):
          </div>
          {(() => {
            const v = result.violations[0]
            return (
              <div className="text-neutral-300 space-y-0.5">
                <div>
                  a = {G.elems[v.a]}, b = {G.elems[v.b]}
                </div>
                <div>
                  φ(ab) = φ({G.elems[G.mul[v.a][v.b]]}) ={" "}
                  <span className="text-amber-300">{H.elems[v.lhs]}</span>
                </div>
                <div>
                  φ(a)·φ(b) = {H.elems[f[v.a]]}·{H.elems[f[v.b]]} ={" "}
                  <span className="text-sky-300">{H.elems[v.rhs]}</span>
                </div>
              </div>
            )
          })()}
        </div>
      )}

      {result.ok && (
        <div className="mt-3 rounded-md border border-neutral-800 bg-neutral-950 p-3">
          <div className="text-xs text-neutral-500 mb-1 font-mono">
            First isomorphism theorem
          </div>
          <div className="text-sm text-neutral-300">
            <Tex math={String.raw`G/\ker\varphi \cong \operatorname{im}\varphi`} />
            : <Tex math={G.tex} /> / (kernel of size {result.kernel!.length}) has order{" "}
            {G.order / result.kernel!.length} — matches |im φ| ={" "}
            {result.image!.length}. ✓
          </div>
        </div>
      )}
    </Card>
  )
}

function Properties() {
  return (
    <Card>
      <p className="text-sm text-neutral-400 mb-3">
        <strong className="text-neutral-200">Automatic consequences.</strong>{" "}
        Only <Tex math={String.raw`\varphi(ab) = \varphi(a)\varphi(b)`} /> is
        assumed. Everything else falls out.
      </p>
      <ul className="space-y-2 text-sm text-neutral-300">
        <li className="flex gap-2">
          <span className="text-emerald-400 font-mono">·</span>
          <span>
            <Tex math={String.raw`\varphi(e_G) = e_H`} /> — since{" "}
            <Tex math={String.raw`\varphi(e)\varphi(e) = \varphi(e)`} /> forces{" "}
            <Tex math={String.raw`\varphi(e) = e_H`} /> by cancellation.
          </span>
        </li>
        <li className="flex gap-2">
          <span className="text-emerald-400 font-mono">·</span>
          <span>
            <Tex math={String.raw`\varphi(a^{-1}) = \varphi(a)^{-1}`} /> — from{" "}
            <Tex math={String.raw`\varphi(a)\varphi(a^{-1}) = \varphi(e) = e_H`} />.
          </span>
        </li>
        <li className="flex gap-2">
          <span className="text-emerald-400 font-mono">·</span>
          <span>
            <Tex math={String.raw`\ker\varphi \trianglelefteq G`} /> — kernels
            are always normal: if{" "}
            <Tex math={String.raw`k \in \ker\varphi`} /> then{" "}
            <Tex math={String.raw`\varphi(gkg^{-1}) = \varphi(g)e_H\varphi(g)^{-1} = e_H`} />.
          </span>
        </li>
        <li className="flex gap-2">
          <span className="text-emerald-400 font-mono">·</span>
          <span>
            <Tex math={String.raw`\operatorname{im}\varphi \le H`} /> — the
            image is a subgroup of H.
          </span>
        </li>
        <li className="flex gap-2">
          <span className="text-emerald-400 font-mono">·</span>
          <span>
            φ is injective <Tex math={String.raw`\iff \ker\varphi = \{e\}`} />{" "}
            — the kernel measures collapse.
          </span>
        </li>
        <li className="flex gap-2">
          <span className="text-emerald-400 font-mono">·</span>
          <span>
            <Tex math={String.raw`|G| = |\ker\varphi| \cdot |\operatorname{im}\varphi|`} />{" "}
            (first iso theorem, numerically).
          </span>
        </li>
      </ul>
    </Card>
  )
}

export default function Homomorphisms() {
  return (
    <TopicShell topic={topic}>
      <Section title="Map between groups — kernel & image">
        <HomomorphismExplorer />
      </Section>
      <Section title="What the structure condition forces">
        <Properties />
      </Section>
    </TopicShell>
  )
}
