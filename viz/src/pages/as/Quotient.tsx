import { useMemo, useState } from "react"
import { motion } from "framer-motion"
import Tex from "../../components/Tex"
import TopicShell, { Section, Card } from "../../components/TopicShell"
import { TOPICS } from "../../topics"
import { GROUPS, allSubgroups, isNormal } from "./groupData"

const topic = TOPICS.find((t) => t.slug === "as/quotient")!

function leftCoset(G: (typeof GROUPS)[0], H: number[], g: number): number[] {
  const out = new Set<number>()
  for (const h of H) out.add(G.mul[g][h])
  return Array.from(out).sort((a, b) => a - b)
}

function partition(G: (typeof GROUPS)[0], H: number[]) {
  const seen = new Set<number>()
  const out: { rep: number; coset: number[]; key: string }[] = []
  for (let g = 0; g < G.order; g++) {
    if (seen.has(g)) continue
    const c = leftCoset(G, H, g)
    c.forEach((x) => seen.add(x))
    out.push({ rep: g, coset: c, key: c.join(",") })
  }
  return out
}

function quotientTable(
  G: (typeof GROUPS)[0],
  parts: { rep: number; coset: number[]; key: string }[],
) {
  const keyToIdx = new Map<string, number>()
  parts.forEach((p, i) => keyToIdx.set(p.key, i))

  const n = parts.length
  const table: number[][] = Array.from({ length: n }, () => Array(n).fill(-1))

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      const prod = G.mul[parts[i].rep][parts[j].rep]
      // find coset containing prod
      for (let k = 0; k < n; k++) {
        if (parts[k].coset.includes(prod)) {
          table[i][j] = k
          break
        }
      }
    }
  }
  return table
}

// Is the coset multiplication well-defined? Try a1 ~ a2, b1 ~ b2 and check a1 b1 ~ a2 b2
function wellDefinedCheck(
  G: (typeof GROUPS)[0],
  parts: { rep: number; coset: number[]; key: string }[],
): { ok: boolean; witness?: { a1: number; a2: number; b1: number; b2: number; p1: number; p2: number } } {
  const cosetOf = (x: number) => parts.findIndex((p) => p.coset.includes(x))
  for (const pa of parts) {
    for (const a1 of pa.coset) {
      for (const a2 of pa.coset) {
        for (const pb of parts) {
          for (const b1 of pb.coset) {
            for (const b2 of pb.coset) {
              const p1 = G.mul[a1][b1]
              const p2 = G.mul[a2][b2]
              if (cosetOf(p1) !== cosetOf(p2)) {
                return { ok: false, witness: { a1, a2, b1, b2, p1, p2 } }
              }
            }
          }
        }
      }
    }
  }
  return { ok: true }
}

function QuotientDemo() {
  const [id, setId] = useState("D4")
  const G = GROUPS.find((g) => g.id === id)!
  const subs = useMemo(() => allSubgroups(G), [G])
  const normalSubs = useMemo(
    () => subs.filter((H) => isNormal(G, H) && H.length > 1 && H.length < G.order),
    [G, subs],
  )
  const [hIdx, setHIdx] = useState(0)
  const H = normalSubs[Math.min(hIdx, normalSubs.length - 1)] ?? subs[0]

  const parts = useMemo(() => partition(G, H), [G, H])
  const qTable = useMemo(() => quotientTable(G, parts), [G, parts])

  const COLORS = ["#6366f1", "#34d399", "#f472b6", "#fb923c", "#22d3ee", "#a78bfa", "#eab308", "#f43f5e"]

  return (
    <Card>
      <p className="text-sm text-neutral-400 mb-3">
        <strong className="text-neutral-200">Quotient group </strong>
        <Tex math={String.raw`G/H`} />. When{" "}
        <Tex math={String.raw`H \trianglelefteq G`} />, left cosets form a group
        under <Tex math={String.raw`(aH)(bH) = (ab)H`} />. Collapse each coset
        into a point — you get a new group of order{" "}
        <Tex math={String.raw`[G:H] = |G|/|H|`} />.
      </p>

      <div className="flex flex-wrap items-center gap-2 mb-3">
        {GROUPS.map((g) => (
          <button
            key={g.id}
            onClick={() => {
              setId(g.id)
              setHIdx(0)
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

      {normalSubs.length === 0 ? (
        <div className="rounded-md border border-neutral-800 bg-neutral-950 p-4 text-sm text-neutral-400">
          No proper non-trivial normal subgroups available for this group in the
          small-group library.
        </div>
      ) : (
        <>
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <label className="text-xs text-neutral-500 font-mono">
              normal subgroup H
            </label>
            <select
              value={hIdx}
              onChange={(e) => setHIdx(Number(e.target.value))}
              className="rounded-md border border-neutral-800 bg-neutral-950 text-neutral-200 px-2 py-1 text-xs font-mono"
            >
              {normalSubs.map((S, i) => (
                <option key={i} value={i}>
                  |H|={S.length} : {"{"}
                  {S.map((x) => G.elems[x]).join(", ")}
                  {"}"}
                </option>
              ))}
            </select>
            <span className="ml-auto text-xs text-neutral-500 font-mono">
              |G/H| = {G.order}/{H.length} = {parts.length}
            </span>
          </div>

          {/* Collapse animation: elements → coset bubbles */}
          <div className="rounded-md border border-neutral-800 bg-neutral-950 p-4 mb-3">
            <div className="text-xs text-neutral-500 mb-3 font-mono">
              Step 1: group elements, colored by coset
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {G.elems.map((e, i) => {
                const pi = parts.findIndex((p) => p.coset.includes(i))
                const col = COLORS[pi % COLORS.length]
                return (
                  <motion.div
                    key={i}
                    layout
                    initial={{ opacity: 0, y: 4 }}
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

            <div className="text-xs text-neutral-500 mb-3 font-mono">
              Step 2: collapse each coset into a single element of G/H
            </div>
            <div className="flex flex-wrap gap-3">
              {parts.map((p, i) => {
                const col = COLORS[i % COLORS.length]
                return (
                  <motion.div
                    key={i}
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.4 + i * 0.08 }}
                    style={{ borderColor: col, backgroundColor: `${col}33`, color: col }}
                    className="rounded-lg border-2 px-3 py-2 font-mono text-sm shadow"
                  >
                    <div className="text-[10px] opacity-70">coset #{i}</div>
                    <div className="font-bold">
                      {G.elems[p.rep]}H
                    </div>
                    <div className="text-[10px] opacity-70 mt-0.5">
                      = {"{"}
                      {p.coset.map((x) => G.elems[x]).join(",")}
                      {"}"}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Quotient Cayley table */}
          <div className="rounded-md border border-neutral-800 bg-neutral-950 overflow-x-auto">
            <div className="text-xs text-neutral-500 px-3 pt-3 pb-2 font-mono">
              Cayley table of{" "}
              <Tex math={String.raw`G/H`} /> (order {parts.length})
            </div>
            <table className="border-collapse">
              <thead>
                <tr>
                  <th className="bg-neutral-950 border border-neutral-800 px-2 py-1 text-xs text-neutral-500">
                    ·
                  </th>
                  {parts.map((p, j) => {
                    const col = COLORS[j % COLORS.length]
                    return (
                      <th
                        key={j}
                        style={{ color: col }}
                        className="border border-neutral-800 px-2 py-1 text-xs font-mono font-bold"
                      >
                        {G.elems[p.rep]}H
                      </th>
                    )
                  })}
                </tr>
              </thead>
              <tbody>
                {parts.map((pi, i) => {
                  const rowCol = COLORS[i % COLORS.length]
                  return (
                    <tr key={i}>
                      <th
                        style={{ color: rowCol }}
                        className="border border-neutral-800 px-2 py-1 text-xs font-mono font-bold bg-neutral-950"
                      >
                        {G.elems[pi.rep]}H
                      </th>
                      {parts.map((_, j) => {
                        const k = qTable[i][j]
                        const col = COLORS[k % COLORS.length]
                        return (
                          <motion.td
                            key={j}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 + (i + j) * 0.03 }}
                            style={{
                              backgroundColor: `${col}22`,
                              color: col,
                            }}
                            className="border border-neutral-800 px-2 py-1 text-center text-xs font-mono"
                          >
                            {G.elems[parts[k].rep]}H
                          </motion.td>
                        )
                      })}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          <p className="mt-3 text-xs text-neutral-500">
            Because <Tex math="H" /> is normal, the product{" "}
            <Tex math={String.raw`(aH)(bH) = abH`} /> doesn't depend on which
            representative we pick — the table above is consistent.
          </p>
        </>
      )}
    </Card>
  )
}

function WellDefinedCheck() {
  const [id, setId] = useState("D3")
  const G = GROUPS.find((g) => g.id === id)!
  const subs = useMemo(() => allSubgroups(G), [G])
  const proper = subs.filter((H) => H.length > 1 && H.length < G.order)
  const [hIdx, setHIdx] = useState(0)
  const H = proper[Math.min(hIdx, proper.length - 1)] ?? proper[0]
  const normal = H ? isNormal(G, H) : true

  const parts = useMemo(() => (H ? partition(G, H) : []), [G, H])
  const check = useMemo(() => (H ? wellDefinedCheck(G, parts) : { ok: true }), [G, H, parts])

  return (
    <Card>
      <p className="text-sm text-neutral-400 mb-3">
        <strong className="text-neutral-200">Why normality matters.</strong>{" "}
        Quotient multiplication <Tex math={String.raw`(aH)(bH) = (ab)H`} /> must
        not depend on the choice of <Tex math="a" />,{" "}
        <Tex math="b" />. Pick a non-normal <Tex math="H" /> and you'll find
        representatives <Tex math={String.raw`a_1 \sim a_2`} />,{" "}
        <Tex math={String.raw`b_1 \sim b_2`} /> whose products land in different
        cosets.
      </p>

      <div className="flex flex-wrap items-center gap-2 mb-3">
        {GROUPS.map((g) => (
          <button
            key={g.id}
            onClick={() => {
              setId(g.id)
              setHIdx(0)
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
          {proper.map((S, i) => (
            <option key={i} value={i}>
              |H|={S.length} : {"{"}
              {S.map((x) => G.elems[x]).join(",")}
              {"}"} {isNormal(G, S) ? "(normal)" : ""}
            </option>
          ))}
        </select>
        <span
          className={`ml-auto rounded-md border px-2 py-0.5 text-xs font-mono ${
            normal
              ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-200"
              : "border-rose-500/40 bg-rose-500/10 text-rose-200"
          }`}
        >
          {normal ? "H ⊴ G" : "H not normal"}
        </span>
      </div>

      {check.ok ? (
        <div className="rounded-md border border-emerald-500/30 bg-emerald-500/5 p-3 text-sm">
          <div className="font-mono text-emerald-200 mb-1">
            ✓ Coset multiplication is well-defined.
          </div>
          <div className="text-xs text-neutral-400">
            Every pair of representatives <Tex math={String.raw`a_1,a_2 \in aH`} />,{" "}
            <Tex math={String.raw`b_1,b_2 \in bH`} /> gives{" "}
            <Tex math={String.raw`a_1 b_1 \sim a_2 b_2 \pmod H`} />.
          </div>
        </div>
      ) : (
        <div className="rounded-md border border-rose-500/30 bg-rose-500/5 p-3 text-sm">
          <div className="font-mono text-rose-200 mb-1">
            ✗ Not well-defined — counterexample found:
          </div>
          <div className="text-xs text-neutral-300 font-mono space-y-0.5 mt-2">
            <div>
              a₁ = <span className="text-amber-300">{G.elems[check.witness!.a1]}</span>, a₂ ={" "}
              <span className="text-amber-300">{G.elems[check.witness!.a2]}</span> (same coset)
            </div>
            <div>
              b₁ = <span className="text-sky-300">{G.elems[check.witness!.b1]}</span>, b₂ ={" "}
              <span className="text-sky-300">{G.elems[check.witness!.b2]}</span> (same coset)
            </div>
            <div>
              a₁b₁ = <span className="text-rose-300">{G.elems[check.witness!.p1]}</span>, a₂b₂ ={" "}
              <span className="text-rose-300">{G.elems[check.witness!.p2]}</span> (different cosets!)
            </div>
          </div>
        </div>
      )}
    </Card>
  )
}

function FamousQuotients() {
  const examples = [
    {
      G: String.raw`\mathbb{Z}`,
      H: String.raw`n\mathbb{Z}`,
      Q: String.raw`\mathbb{Z}/n\mathbb{Z}`,
      note: "Integers mod n — the original source of modular arithmetic.",
    },
    {
      G: String.raw`\mathbb{Z}`,
      H: String.raw`\{0\}`,
      Q: String.raw`\mathbb{Z}`,
      note: "Quotient by the trivial subgroup recovers G.",
    },
    {
      G: String.raw`G`,
      H: String.raw`G`,
      Q: String.raw`\{e\}`,
      note: "Quotient by the whole group collapses everything to a point.",
    },
    {
      G: String.raw`D_n`,
      H: String.raw`\langle r \rangle`,
      Q: String.raw`\mathbb{Z}/2\mathbb{Z}`,
      note: "Kill the rotations; what remains is reflection-vs-not.",
    },
    {
      G: String.raw`S_n`,
      H: String.raw`A_n`,
      Q: String.raw`\mathbb{Z}/2\mathbb{Z}`,
      note: "Sign homomorphism: even vs odd permutation.",
    },
    {
      G: String.raw`\mathbb{R}`,
      H: String.raw`\mathbb{Z}`,
      Q: String.raw`S^1`,
      note: "Real line modulo integers = circle (topologically).",
    },
    {
      G: String.raw`GL_n`,
      H: String.raw`SL_n`,
      Q: String.raw`\mathbb{R}^\times`,
      note: "Determinant map; kernel is SL_n.",
    },
  ]

  return (
    <Card>
      <p className="text-sm text-neutral-400 mb-3">
        <strong className="text-neutral-200">Quotients in the wild.</strong>{" "}
        The same construction produces modular arithmetic, signs of
        permutations, and even the circle.
      </p>
      <div className="grid md:grid-cols-2 gap-2">
        {examples.map((ex, i) => (
          <div
            key={i}
            className="rounded-md border border-neutral-800 bg-neutral-950 px-3 py-2"
          >
            <div className="text-sm">
              <Tex math={ex.G} /> <span className="text-neutral-500">/</span>{" "}
              <Tex math={ex.H} />{" "}
              <span className="text-neutral-500">≅</span> <Tex math={ex.Q} />
            </div>
            <div className="text-xs text-neutral-500 mt-1">{ex.note}</div>
          </div>
        ))}
      </div>

      <p className="mt-3 text-xs text-neutral-500">
        By the <em>first isomorphism theorem</em>,{" "}
        <Tex math={String.raw`G/\ker\varphi \cong \operatorname{im}\varphi`} />{" "}
        — every quotient arises as the image of some homomorphism.
      </p>
    </Card>
  )
}

export default function Quotient() {
  return (
    <TopicShell topic={topic}>
      <Section title="Collapse cosets → G/H">
        <QuotientDemo />
      </Section>
      <Section title="Why normality: well-defined multiplication">
        <WellDefinedCheck />
      </Section>
      <Section title="Famous quotients">
        <FamousQuotients />
      </Section>
    </TopicShell>
  )
}
