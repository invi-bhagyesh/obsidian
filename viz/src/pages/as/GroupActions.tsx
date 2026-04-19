import { useMemo, useState } from "react"
import { motion } from "framer-motion"
import Tex from "../../components/Tex"
import TopicShell, { Section, Card } from "../../components/TopicShell"
import { TOPICS } from "../../topics"

const topic = TOPICS.find((t) => t.slug === "as/group-actions")!

// --- Dihedral action on vertices of an n-gon ---
// Elements of D_n: rotations r^k (0..n-1) and reflections s·r^k (0..n-1)
// Rotation by k maps vertex i -> (i+k) mod n
// Reflection s·r^k maps i -> (k - i) mod n  (for reflection through axis of vertex 0 twisted by k)
type D = { type: "r" | "s"; k: number }
function dList(n: number): D[] {
  const out: D[] = []
  for (let k = 0; k < n; k++) out.push({ type: "r", k })
  for (let k = 0; k < n; k++) out.push({ type: "s", k })
  return out
}
function dLabel(g: D) {
  if (g.type === "r") return g.k === 0 ? "e" : g.k === 1 ? "r" : `r${g.k}`
  return g.k === 0 ? "s" : `sr${g.k}`
}
function dApply(g: D, i: number, n: number): number {
  if (g.type === "r") return ((i + g.k) % n + n) % n
  return ((g.k - i) % n + n) % n
}

function DihedralAction() {
  const [n, setN] = useState(6)
  const [gIdx, setGIdx] = useState(1)
  const elts = useMemo(() => dList(n), [n])
  const g = elts[Math.min(gIdx, elts.length - 1)]

  const W = 360
  const Hsvg = 360
  const cx = W / 2
  const cy = Hsvg / 2
  const R = 130

  // vertex positions
  const vPos = (i: number) => {
    const a = (2 * Math.PI * i) / n - Math.PI / 2
    return { x: cx + R * Math.cos(a), y: cy + R * Math.sin(a) }
  }

  // orbit of vertex 0 under <g>
  const orbit = useMemo(() => {
    const out = [0]
    let cur = 0
    while (true) {
      const nxt = dApply(g, cur, n)
      if (nxt === 0) break
      if (out.length > n) break
      out.push(nxt)
      cur = nxt
    }
    return out
  }, [g, n])

  return (
    <Card>
      <p className="text-sm text-neutral-400 mb-3">
        <strong className="text-neutral-200">Action of </strong>
        <Tex math={String.raw`D_n`} /> on the vertices of a regular{" "}
        <Tex math="n" />-gon. Pick an element — watch where each vertex goes.
      </p>

      <div className="flex flex-wrap items-center gap-3 mb-3">
        <label className="text-xs text-neutral-500 font-mono">n</label>
        <input
          type="range"
          min={3}
          max={10}
          value={n}
          onChange={(e) => {
            setN(Number(e.target.value))
            setGIdx(1)
          }}
          className="w-40 accent-amber-400"
        />
        <span className="text-xs font-mono text-neutral-300">{n}-gon</span>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-3">
        {elts.map((el, i) => (
          <button
            key={i}
            onClick={() => setGIdx(i)}
            className={`rounded-md border px-2 py-1 text-[11px] font-mono ${
              gIdx === i
                ? "border-amber-500/60 bg-amber-500/20 text-amber-200"
                : el.type === "r"
                ? "border-sky-700 text-sky-300 hover:bg-sky-900/30"
                : "border-rose-700 text-rose-300 hover:bg-rose-900/30"
            }`}
          >
            {dLabel(el)}
          </button>
        ))}
      </div>

      <div className="rounded-md border border-neutral-800 bg-neutral-950 overflow-hidden">
        <svg width={W} height={Hsvg} className="block mx-auto">
          {/* polygon outline */}
          <polygon
            points={Array.from({ length: n }, (_, i) => {
              const p = vPos(i)
              return `${p.x},${p.y}`
            }).join(" ")}
            fill="none"
            stroke="#404040"
            strokeWidth={1}
          />

          {/* reflection axis for s-type */}
          {g.type === "s" && (() => {
            const a = (Math.PI * g.k) / n - Math.PI / 2
            const x1 = cx + 180 * Math.cos(a)
            const y1 = cy + 180 * Math.sin(a)
            const x2 = cx - 180 * Math.cos(a)
            const y2 = cy - 180 * Math.sin(a)
            return (
              <line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#f43f5e"
                strokeDasharray="4 4"
                strokeOpacity={0.6}
              />
            )
          })()}

          {/* arrows from i to g·i */}
          {Array.from({ length: n }, (_, i) => {
            const img = dApply(g, i, n)
            const p1 = vPos(i)
            const p2 = vPos(img)
            if (i === img) return null
            // curved arrow
            const mx = (p1.x + p2.x) / 2
            const my = (p1.y + p2.y) / 2
            const dx = p2.x - p1.x
            const dy = p2.y - p1.y
            const d = Math.sqrt(dx * dx + dy * dy) || 1
            const nxu = -dy / d
            const nyu = dx / d
            const bend = 24
            const bx = mx + nxu * bend
            const by = my + nyu * bend
            return (
              <motion.path
                key={i}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: i * 0.03 }}
                d={`M ${p1.x} ${p1.y} Q ${bx} ${by} ${p2.x} ${p2.y}`}
                fill="none"
                stroke="#a78bfa"
                strokeWidth={1.6}
                opacity={0.6}
              />
            )
          })}

          {/* vertices */}
          {Array.from({ length: n }, (_, i) => {
            const p = vPos(i)
            const inOrbit = orbit.includes(i)
            return (
              <motion.g
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.04 }}
              >
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={13}
                  fill={inOrbit ? "#34d39930" : "#1e293b"}
                  stroke={inOrbit ? "#34d399" : "#6366f1"}
                  strokeWidth={inOrbit ? 2.5 : 1.5}
                />
                <text
                  x={p.x}
                  y={p.y + 3.5}
                  textAnchor="middle"
                  fontSize="10"
                  fontFamily="ui-monospace, monospace"
                  fill="#e5e5e5"
                >
                  {i}
                </text>
              </motion.g>
            )
          })}
        </svg>
      </div>

      <div className="mt-3 grid sm:grid-cols-2 gap-2 text-xs font-mono">
        <div className="rounded-md border border-emerald-500/30 bg-emerald-500/5 px-3 py-2">
          <div className="text-emerald-300 mb-1">
            orbit of 0 under ⟨{dLabel(g)}⟩
          </div>
          <div className="text-neutral-200">
            {"{"}
            {orbit.join(", ")}
            {"}"} &nbsp;|orbit| = {orbit.length}
          </div>
        </div>
        <div className="rounded-md border border-indigo-500/30 bg-indigo-500/5 px-3 py-2">
          <div className="text-indigo-300 mb-1">permutation of vertices</div>
          <div className="text-neutral-200">
            {Array.from({ length: n }, (_, i) => `${i}→${dApply(g, i, n)}`).join(", ")}
          </div>
        </div>
      </div>
    </Card>
  )
}

function OrbitStabilizer() {
  const n = 5
  const elts = dList(n)
  const xTarget = 0

  const stab: string[] = []
  const orbit = new Set<number>()
  for (const g of elts) {
    const img = dApply(g, xTarget, n)
    orbit.add(img)
    if (img === xTarget) stab.push(dLabel(g))
  }

  return (
    <Card>
      <p className="text-sm text-neutral-400 mb-3">
        <strong className="text-neutral-200">
          Orbit–stabilizer theorem.
        </strong>{" "}
        <Tex math={String.raw`|G| = |\mathrm{Orb}(x)| \cdot |\mathrm{Stab}(x)|`} />
        . Size of orbit times size of stabilizer equals |G|.
      </p>
      <div className="rounded-md border border-neutral-800 bg-neutral-950 p-3">
        <div className="text-xs text-neutral-500 mb-2 font-mono">
          Example: D₅ acting on a regular pentagon, looking at vertex 0
        </div>
        <div className="grid sm:grid-cols-3 gap-2 text-xs font-mono">
          <div className="rounded-md border border-sky-500/30 bg-sky-500/5 px-3 py-2">
            <div className="text-sky-300">|G| = |D₅|</div>
            <div className="text-neutral-200 text-lg mt-1">
              {elts.length}
            </div>
          </div>
          <div className="rounded-md border border-emerald-500/30 bg-emerald-500/5 px-3 py-2">
            <div className="text-emerald-300">|Orb(0)|</div>
            <div className="text-neutral-200 text-lg mt-1">
              {orbit.size}
            </div>
            <div className="text-neutral-500 text-[10px] mt-1">
              = {"{"}
              {Array.from(orbit).join(",")}
              {"}"}
            </div>
          </div>
          <div className="rounded-md border border-amber-500/30 bg-amber-500/5 px-3 py-2">
            <div className="text-amber-300">|Stab(0)|</div>
            <div className="text-neutral-200 text-lg mt-1">{stab.length}</div>
            <div className="text-neutral-500 text-[10px] mt-1">
              = {"{"}
              {stab.join(", ")}
              {"}"}
            </div>
          </div>
        </div>
        <div className="mt-3 text-xs text-center text-neutral-400 font-mono">
          {elts.length} = {orbit.size} × {stab.length} ✓
        </div>
      </div>
      <p className="mt-3 text-xs text-neutral-500">
        On a regular <Tex math="n" />-gon, the action of{" "}
        <Tex math={String.raw`D_n`} /> is transitive on vertices — there's one
        orbit of size <Tex math="n" /> — and each vertex has a 2-element
        stabilizer (identity + the reflection fixing it).
      </p>
    </Card>
  )
}

function Burnside() {
  const [n, setN] = useState(4)
  const [c, setC] = useState(3)

  // For D_n acting on necklaces with c colors:
  //   number of distinct colorings = (1/|G|) Σ |Fix(g)|
  //   Rotations r^k: |Fix| = c^gcd(n,k)
  //   Reflections: depends on n parity
  //     n odd: n reflections with |Fix| = c^((n+1)/2)
  //     n even: n/2 reflections through 2 vertices (fix 2 vertices) |Fix| = c^(n/2+1)
  //             n/2 reflections through 2 edges (no fixed vertices) |Fix| = c^(n/2)

  const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b))

  const rows: { el: string; fix: number }[] = []
  for (let k = 0; k < n; k++) {
    rows.push({ el: k === 0 ? "e" : k === 1 ? "r" : `r^${k}`, fix: Math.pow(c, gcd(n, k)) })
  }
  if (n % 2 === 1) {
    for (let k = 0; k < n; k++) {
      rows.push({ el: `sr^${k}`, fix: Math.pow(c, (n + 1) / 2) })
    }
  } else {
    for (let k = 0; k < n; k++) {
      // alternate: even k → vertex axis, odd k → edge axis
      const fix = k % 2 === 0 ? Math.pow(c, n / 2 + 1) : Math.pow(c, n / 2)
      rows.push({ el: `sr^${k}`, fix })
    }
  }
  const total = rows.reduce((s, r) => s + r.fix, 0)
  const distinct = total / (2 * n)

  return (
    <Card>
      <p className="text-sm text-neutral-400 mb-3">
        <strong className="text-neutral-200">Burnside's lemma.</strong> Count
        colorings of a bracelet up to rotation <em>and</em> reflection:{" "}
        <Tex math={String.raw`|X/G| = \frac{1}{|G|}\sum_{g\in G} |\mathrm{Fix}(g)|`} />
        .
      </p>
      <div className="flex flex-wrap items-center gap-4 mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xs text-neutral-500 font-mono">beads n</span>
          <input
            type="range"
            min={3}
            max={8}
            value={n}
            onChange={(e) => setN(Number(e.target.value))}
            className="w-32 accent-amber-400"
          />
          <span className="text-xs font-mono text-neutral-300">{n}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-neutral-500 font-mono">colors c</span>
          <input
            type="range"
            min={2}
            max={5}
            value={c}
            onChange={(e) => setC(Number(e.target.value))}
            className="w-32 accent-amber-400"
          />
          <span className="text-xs font-mono text-neutral-300">{c}</span>
        </div>
      </div>

      <div className="rounded-md border border-neutral-800 bg-neutral-950 overflow-x-auto">
        <table className="min-w-full text-xs">
          <thead>
            <tr className="text-neutral-500">
              <th className="px-3 py-2 text-left font-normal">g</th>
              <th className="px-3 py-2 text-right font-normal">|Fix(g)|</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-t border-neutral-900">
                <td className="px-3 py-1 font-mono text-neutral-300">{r.el}</td>
                <td className="px-3 py-1 font-mono text-right text-emerald-300">
                  {r.fix}
                </td>
              </tr>
            ))}
            <tr className="border-t border-neutral-700">
              <td className="px-3 py-1.5 font-mono text-amber-300">Σ</td>
              <td className="px-3 py-1.5 font-mono text-right text-amber-300">
                {total}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-3 rounded-md border border-violet-500/30 bg-violet-500/5 p-3 text-sm">
        <span className="text-neutral-400 font-mono">distinct bracelets = </span>
        <span className="font-mono">
          {total}/{2 * n} ={" "}
        </span>
        <span className="text-violet-200 font-mono text-lg">{distinct}</span>
      </div>

      <p className="mt-3 text-xs text-neutral-500">
        For a <em>necklace</em> (rotation only), divide by <Tex math="n" />{" "}
        instead of <Tex math="2n" />. A 4-bead, 3-color bracelet gives 21 — easy
        to check by hand, miserable to enumerate.
      </p>
    </Card>
  )
}

export default function GroupActions() {
  return (
    <TopicShell topic={topic}>
      <Section title="Action of Dₙ on a regular n-gon">
        <DihedralAction />
      </Section>
      <Section title="Orbit–stabilizer">
        <OrbitStabilizer />
      </Section>
      <Section title="Burnside: counting colorings">
        <Burnside />
      </Section>
    </TopicShell>
  )
}
