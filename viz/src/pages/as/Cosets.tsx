import { useMemo, useState } from "react"
import { motion } from "framer-motion"
import Tex from "../../components/Tex"
import TopicShell, { Section, Card } from "../../components/TopicShell"
import { TOPICS } from "../../topics"
import { GROUPS, allSubgroups, isNormal } from "./groupData"

const topic = TOPICS.find((t) => t.slug === "as/cosets")!

function cosetOf(G: (typeof GROUPS)[0], H: number[], g: number, side: "left" | "right"): number[] {
  const out = new Set<number>()
  for (const h of H) {
    if (side === "left") out.add(G.mul[g][h])
    else out.add(G.mul[h][g])
  }
  return Array.from(out).sort((a, b) => a - b)
}

function partition(G: (typeof GROUPS)[0], H: number[], side: "left" | "right") {
  const seen = new Set<number>()
  const out: { rep: number; coset: number[] }[] = []
  for (let g = 0; g < G.order; g++) {
    if (seen.has(g)) continue
    const c = cosetOf(G, H, g, side)
    c.forEach((x) => seen.add(x))
    out.push({ rep: g, coset: c })
  }
  return out
}

function CosetPartition() {
  const [id, setId] = useState("D3")
  const G = GROUPS.find((g) => g.id === id)!
  const subs = useMemo(() => allSubgroups(G), [G])
  const [hIdx, setHIdx] = useState(1)
  const [side, setSide] = useState<"left" | "right">("left")
  const H = subs[Math.min(hIdx, subs.length - 1)] ?? subs[0]

  const parts = useMemo(() => partition(G, H, side), [G, H, side])
  const normal = isNormal(G, H)

  const COLORS = ["#6366f1", "#34d399", "#f472b6", "#fb923c", "#22d3ee", "#a78bfa", "#eab308", "#f43f5e"]

  return (
    <Card>
      <p className="text-sm text-neutral-400 mb-3">
        <strong className="text-neutral-200">Cosets partition the group.</strong>{" "}
        For <Tex math={String.raw`H \le G`} />, the left cosets{" "}
        <Tex math={String.raw`gH = \{gh : h \in H\}`} /> are pairwise disjoint
        and cover <Tex math="G" />. All have the same size <Tex math="|H|" /> —
        so <Tex math="|G|" /> is divisible by <Tex math="|H|" />.
      </p>

      <div className="flex flex-wrap items-center gap-2 mb-3">
        {GROUPS.map((g) => (
          <button
            key={g.id}
            onClick={() => {
              setId(g.id)
              setHIdx(1)
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

      <div className="flex flex-wrap items-center gap-3 mb-3">
        <label className="text-xs text-neutral-500 font-mono">subgroup H</label>
        <select
          value={hIdx}
          onChange={(e) => setHIdx(Number(e.target.value))}
          className="rounded-md border border-neutral-800 bg-neutral-950 text-neutral-200 px-2 py-1 text-xs font-mono"
        >
          {subs.map((S, i) => (
            <option key={i} value={i}>
              |H|={S.length} : {"{"}
              {S.map((x) => G.elems[x]).join(", ")}
              {"}"}
            </option>
          ))}
        </select>

        <div className="inline-flex rounded-md overflow-hidden border border-neutral-800 text-xs font-mono">
          {(["left", "right"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setSide(s)}
              className={`px-3 py-1 ${
                side === s ? "bg-indigo-500/20 text-indigo-200" : "text-neutral-400"
              }`}
            >
              {s === "left" ? "gH" : "Hg"}
            </button>
          ))}
        </div>

        <span className="ml-auto text-xs text-neutral-500 font-mono">
          |G|/|H| = {G.order}/{H.length} = {G.order / H.length}
        </span>
      </div>

      <div className="rounded-md border border-neutral-800 bg-neutral-950 p-3">
        <div className="flex flex-wrap gap-2">
          {G.elems.map((e, i) => {
            // find which coset i is in
            const partIdx = parts.findIndex((p) => p.coset.includes(i))
            const col = COLORS[partIdx % COLORS.length]
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.02 }}
                style={{ borderColor: col, backgroundColor: `${col}22`, color: col }}
                className="rounded-md border px-2 py-1 font-mono text-xs"
              >
                {e}
              </motion.div>
            )
          })}
        </div>
      </div>

      <div className="mt-3 grid gap-2">
        {parts.map((p, i) => {
          const col = COLORS[i % COLORS.length]
          return (
            <div
              key={i}
              className="rounded-md border border-neutral-800 bg-neutral-950 px-3 py-2 text-xs font-mono flex items-center gap-2 flex-wrap"
            >
              <span style={{ color: col }} className="font-bold">
                {side === "left" ? `${G.elems[p.rep]}H` : `H${G.elems[p.rep]}`}
              </span>
              <span className="text-neutral-500">=</span>
              <span className="text-neutral-300">
                {"{ "}
                {p.coset.map((x) => G.elems[x]).join(", ")}
                {" }"}
              </span>
            </div>
          )
        })}
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="text-xs text-neutral-400">
          index [G : H] = {parts.length}
        </span>
        <span
          className={`ml-auto inline-block rounded-md border px-2 py-0.5 text-xs font-mono ${
            normal ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-200" : "border-rose-500/40 bg-rose-500/10 text-rose-200"
          }`}
        >
          {normal ? "H ⊴ G — left = right cosets" : "H is NOT normal — left ≠ right cosets"}
        </span>
      </div>
    </Card>
  )
}

function LeftVsRight() {
  const id = "D3"
  const G = GROUPS.find((g) => g.id === id)!
  const subs = useMemo(() => allSubgroups(G), [G])
  // pick a non-normal subgroup of order 2 in D3
  const H = subs.find((S) => S.length === 2 && !isNormal(G, S))!

  const leftP = partition(G, H, "left")
  const rightP = partition(G, H, "right")

  const COLORS = ["#6366f1", "#34d399", "#f472b6", "#fb923c"]

  return (
    <Card>
      <p className="text-sm text-neutral-400 mb-3">
        For a <em>non-normal</em> subgroup, left and right cosets disagree. Here{" "}
        <Tex math={String.raw`H = \{`} />
        {H.map((i) => G.elems[i]).join(", ")}
        <Tex math={String.raw`\} \le S_3 \cong D_3`} /> — a transposition, not
        normal.
      </p>

      <div className="grid md:grid-cols-2 gap-3">
        {([["left", leftP, "gH"], ["right", rightP, "Hg"]] as const).map(([key, parts, name]) => (
          <div key={key} className="rounded-md border border-neutral-800 bg-neutral-950 p-3">
            <div className="text-xs text-neutral-500 mb-2 font-mono">{name}</div>
            <div className="grid gap-1">
              {parts.map((p, i) => {
                const col = COLORS[i % COLORS.length]
                return (
                  <div
                    key={i}
                    className="flex items-center gap-2 text-xs font-mono"
                    style={{ color: col }}
                  >
                    <span className="font-bold">
                      {key === "left" ? `${G.elems[p.rep]}H` : `H${G.elems[p.rep]}`}
                    </span>
                    <span className="text-neutral-500">=</span>
                    <span>
                      {"{"}
                      {p.coset.map((x) => G.elems[x]).join(",")}
                      {"}"}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      <p className="mt-3 text-xs text-neutral-500">
        Normal subgroups are exactly those for which{" "}
        <Tex math={String.raw`gH = Hg \ \forall g`} /> — that's what makes the
        quotient group <Tex math={String.raw`G/H`} /> well-defined.
      </p>
    </Card>
  )
}

export default function Cosets() {
  return (
    <TopicShell topic={topic}>
      <Section title="Partition by cosets">
        <CosetPartition />
      </Section>
      <Section title="Left vs right: when H isn't normal">
        <LeftVsRight />
      </Section>
    </TopicShell>
  )
}
