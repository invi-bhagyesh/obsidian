import { useMemo, useState } from "react"
import { motion } from "framer-motion"
import Tex from "../../components/Tex"
import TopicShell, { Section, Card } from "../../components/TopicShell"
import { TOPICS } from "../../topics"
import { GROUPS, allSubgroups, isNormal, isSubset } from "./groupData"

const topic = TOPICS.find((t) => t.slug === "as/subgroup-lattice")!

function subName(H: number[], elems: string[]) {
  if (H.length === 1) return "⟨e⟩"
  return `⟨ ${H.map((i) => elems[i]).join(", ")} ⟩`
}

function Lattice() {
  const [id, setId] = useState("D3")
  const G = GROUPS.find((g) => g.id === id)!
  const [sel, setSel] = useState<number | null>(null)

  const subs = useMemo(() => allSubgroups(G), [G])

  // layout by rank (order)
  const byOrder = useMemo(() => {
    const m = new Map<number, number[][]>()
    subs.forEach((H) => {
      if (!m.has(H.length)) m.set(H.length, [])
      m.get(H.length)!.push(H)
    })
    return m
  }, [subs])

  const orders = Array.from(byOrder.keys()).sort((a, b) => a - b)

  // cover relations: H ⊂ K with no intermediate subgroup
  const covers = useMemo(() => {
    const out: { from: number; to: number }[] = []
    for (let i = 0; i < subs.length; i++) {
      for (let j = 0; j < subs.length; j++) {
        if (i === j) continue
        if (subs[i].length >= subs[j].length) continue
        if (!isSubset(subs[i], subs[j])) continue
        // check no intermediate
        let immediate = true
        for (let k = 0; k < subs.length; k++) {
          if (k === i || k === j) continue
          if (subs[k].length <= subs[i].length || subs[k].length >= subs[j].length) continue
          if (isSubset(subs[i], subs[k]) && isSubset(subs[k], subs[j])) {
            immediate = false
            break
          }
        }
        if (immediate) out.push({ from: i, to: j })
      }
    }
    return out
  }, [subs])

  // positions
  const W = 760
  const H = 400
  const padTop = 40
  const padBottom = 40
  const rows = orders.length
  const pos = useMemo(() => {
    const out: { x: number; y: number }[] = []
    orders.forEach((ord, rowIdx) => {
      const row = byOrder.get(ord)!
      const y = padTop + (rowIdx / Math.max(1, rows - 1)) * (H - padTop - padBottom)
      const rowLen = row.length
      row.forEach((_, i) => {
        const x = 80 + ((i + 1) / (rowLen + 1)) * (W - 160)
        // Find index of this subgroup in subs
        out.push({ x, y })
      })
    })
    // Reorder: we need indices aligned with subs. Build mapping order → flat row indices
    const flatMap = new Map<number, { x: number; y: number }>()
    let flat = 0
    orders.forEach((ord) => {
      byOrder.get(ord)!.forEach((H) => {
        flatMap.set(subs.indexOf(H), out[flat])
        flat++
      })
    })
    // Inverted
    return subs.map((_, i) => flatMap.get(i)!)
  }, [subs, orders, byOrder, rows])

  const invert = (rowIdx: number) => H - padBottom - (rowIdx / Math.max(1, rows - 1)) * (H - padTop - padBottom)
  void invert

  return (
    <Card>
      <p className="text-sm text-neutral-400 mb-3">
        <strong className="text-neutral-200">Subgroup lattice.</strong> Nodes =
        subgroups, edges = cover relations (immediate containment). Bottom =
        trivial subgroup <Tex math="\{e\}" />, top = the whole group.
      </p>

      <div className="flex flex-wrap items-center gap-2 mb-3">
        {GROUPS.map((g) => (
          <button
            key={g.id}
            onClick={() => {
              setId(g.id)
              setSel(null)
            }}
            className={`rounded-md border px-3 py-1 text-xs font-mono ${
              id === g.id
                ? "border-amber-500/60 bg-amber-500/20 text-amber-200"
                : "border-neutral-800 text-neutral-400 hover:bg-neutral-900"
            }`}
          >
            {g.name}
          </button>
        ))}
      </div>

      <div className="rounded-md border border-neutral-800 bg-neutral-950 overflow-hidden">
        <svg width={W} height={H} className="block max-w-full">
          {/* flip y: we want bottom = trivial */}
          <g transform={`translate(0, ${H}) scale(1, -1)`}>
            {covers.map((c, i) => {
              const p1 = pos[c.from]
              const p2 = pos[c.to]
              const hi = sel !== null && (sel === c.from || sel === c.to)
              return (
                <line
                  key={i}
                  x1={p1.x}
                  y1={H - p1.y}
                  x2={p2.x}
                  y2={H - p2.y}
                  stroke={hi ? "#fbbf24" : "#525252"}
                  strokeWidth={hi ? 2 : 1.2}
                  opacity={hi ? 1 : 0.7}
                />
              )
            })}
          </g>
          {pos.map((p, i) => {
            const normal = isNormal(G, subs[i])
            const isSel = sel === i
            return (
              <motion.g
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.03 }}
                onClick={() => setSel(i)}
                style={{ cursor: "pointer" }}
              >
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={isSel ? 12 : 9}
                  fill={normal ? "#34d399" : "#f472b6"}
                  stroke={isSel ? "#fbbf24" : "#0b0d10"}
                  strokeWidth={isSel ? 3 : 2}
                  opacity={0.85}
                />
                <text
                  x={p.x}
                  y={p.y + 24}
                  textAnchor="middle"
                  fontSize="10"
                  fill={isSel ? "#fbbf24" : "#a3a3a3"}
                  fontFamily="ui-monospace, monospace"
                >
                  |H|={subs[i].length}
                </text>
              </motion.g>
            )
          })}
        </svg>
      </div>

      <div className="mt-3 flex items-center gap-3 text-xs">
        <div className="inline-flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded-full bg-emerald-400" />
          <span className="text-neutral-400">normal subgroup</span>
        </div>
        <div className="inline-flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded-full bg-pink-400" />
          <span className="text-neutral-400">non-normal</span>
        </div>
        <span className="ml-auto text-neutral-500 font-mono">
          {subs.length} subgroups total
        </span>
      </div>

      {sel !== null && (
        <div className="mt-3 rounded-md border border-amber-500/40 bg-amber-500/10 px-3 py-2 text-sm text-amber-100">
          <div className="font-mono">{subName(subs[sel], G.elems)}</div>
          <div className="text-xs opacity-80 mt-1">
            = {"{ "}
            {subs[sel].map((i) => G.elems[i]).join(", ")}
            {" }"}
          </div>
          <div className="text-xs opacity-80 mt-1">
            order {subs[sel].length}{" "}·{" "}
            {isNormal(G, subs[sel]) ? (
              <span className="text-emerald-300">normal</span>
            ) : (
              <span className="text-pink-300">not normal</span>
            )}
          </div>
        </div>
      )}
    </Card>
  )
}

function LagrangeGame() {
  const [id, setId] = useState("D4")
  const G = GROUPS.find((g) => g.id === id)!
  const subs = useMemo(() => allSubgroups(G), [G])

  const divisors = useMemo(() => {
    const out: number[] = []
    for (let d = 1; d <= G.order; d++) if (G.order % d === 0) out.push(d)
    return out
  }, [G])

  const countByOrder = useMemo(() => {
    const m = new Map<number, number>()
    subs.forEach((s) => m.set(s.length, (m.get(s.length) || 0) + 1))
    return m
  }, [subs])

  return (
    <Card>
      <p className="text-sm text-neutral-400 mb-3">
        <strong className="text-neutral-200">Lagrange's theorem.</strong>{" "}
        <Tex math="|H|" /> divides <Tex math="|G|" /> for every subgroup{" "}
        <Tex math={String.raw`H \le G`} />. The converse fails — not every
        divisor must have a subgroup.
      </p>

      <div className="flex flex-wrap items-center gap-2 mb-3">
        {GROUPS.map((g) => (
          <button
            key={g.id}
            onClick={() => setId(g.id)}
            className={`rounded-md border px-3 py-1 text-xs font-mono ${
              id === g.id
                ? "border-indigo-500/60 bg-indigo-500/20 text-indigo-200"
                : "border-neutral-800 text-neutral-400 hover:bg-neutral-900"
            }`}
          >
            {g.name}
          </button>
        ))}
      </div>

      <div className="rounded-md border border-neutral-800 bg-neutral-950 overflow-x-auto p-3">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-xs text-neutral-500">
              <th className="px-3 py-2 text-left font-normal">d | |G|</th>
              <th className="px-3 py-2 text-left font-normal"># subgroups of order d</th>
            </tr>
          </thead>
          <tbody>
            {divisors.map((d) => {
              const c = countByOrder.get(d) || 0
              return (
                <tr key={d} className="border-t border-neutral-800/60">
                  <td className="px-3 py-1.5 font-mono text-neutral-300">{d}</td>
                  <td className="px-3 py-1.5 font-mono">
                    <span className={c > 0 ? "text-emerald-300" : "text-neutral-600"}>
                      {c}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <p className="mt-3 text-xs text-neutral-500">
        Try <span className="font-mono">A₄</span> (not listed here) — it has
        order 12 but no subgroup of order 6. For abelian groups, every divisor
        of <Tex math="|G|" /> is realized (Cauchy/Sylow).
      </p>
    </Card>
  )
}

export default function SubgroupLattice() {
  return (
    <TopicShell topic={topic}>
      <Section title="Hasse diagram — click a node">
        <Lattice />
      </Section>
      <Section title="Lagrange: which orders appear?">
        <LagrangeGame />
      </Section>
    </TopicShell>
  )
}
