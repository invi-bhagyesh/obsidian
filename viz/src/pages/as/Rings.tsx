import { useMemo, useState } from "react"
import { motion } from "framer-motion"
import Tex from "../../components/Tex"
import TopicShell, { Section, Card } from "../../components/TopicShell"
import { TOPICS } from "../../topics"

const topic = TOPICS.find((t) => t.slug === "as/rings")!

type Ring = {
  id: string
  name: string
  tex: string
  elems: string[]
  add: number[][]
  mul: number[][]
  n: number
  integralDomain: boolean
  field: boolean
  note: string
}

function buildZn(n: number): Ring {
  const elems = Array.from({ length: n }, (_, i) => String(i))
  const add = Array.from({ length: n }, (_, i) =>
    Array.from({ length: n }, (_, j) => (i + j) % n),
  )
  const mul = Array.from({ length: n }, (_, i) =>
    Array.from({ length: n }, (_, j) => (i * j) % n),
  )
  // check field/domain
  const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b))
  let prime = n > 1
  for (let d = 2; d < n; d++) if (n % d === 0) prime = false
  let domain = true
  for (let i = 1; i < n && domain; i++)
    for (let j = 1; j < n && domain; j++)
      if ((i * j) % n === 0) domain = false
  void gcd
  return {
    id: `Z${n}`,
    name: `ℤ/${n}ℤ`,
    tex: String.raw`\mathbb{Z}/${n}\mathbb{Z}`,
    elems,
    add,
    mul,
    n,
    integralDomain: domain,
    field: prime,
    note: `Integers mod ${n}${prime ? " — a field." : domain ? " — an integral domain." : " — has zero divisors."}`,
  }
}

// GF(4) = F_2[x]/(x^2+x+1), elems: 0, 1, a, a+1 where a^2 = a+1
function buildGF4(): Ring {
  const elems = ["0", "1", "a", "a+1"]
  // identify: 0=00, 1=01, a=10, a+1=11
  // XOR addition on bits
  const addBits = (i: number, j: number) => i ^ j
  // mul: a^2 = a+1 → 10 · 10 = 11; a·(a+1) = a^2 + a = 1 → 10·11 = 01
  const table = [
    [0, 0, 0, 0],
    [0, 1, 2, 3],
    [0, 2, 3, 1],
    [0, 3, 1, 2],
  ]
  const add = Array.from({ length: 4 }, (_, i) =>
    Array.from({ length: 4 }, (_, j) => addBits(i, j)),
  )
  return {
    id: "GF4",
    name: "𝔽₄",
    tex: String.raw`\mathbb{F}_4`,
    elems,
    add,
    mul: table,
    n: 4,
    integralDomain: true,
    field: true,
    note: "Field of 4 elements. Characteristic 2: x+x=0 for all x.",
  }
}

const RINGS: Ring[] = [
  buildZn(4),
  buildZn(5),
  buildZn(6),
  buildZn(7),
  buildZn(8),
  buildZn(12),
  buildGF4(),
]

// All ideals of Z_n: <d> for each divisor d of n (as subset of Z_n)
function idealsZn(R: Ring): number[][] {
  if (R.id === "GF4") {
    // Fields: only {0} and whole ring
    return [[0], Array.from({ length: 4 }, (_, i) => i)]
  }
  const n = R.n
  const out: number[][] = []
  const divs: number[] = []
  for (let d = 1; d <= n; d++) if (n % d === 0) divs.push(d)
  for (const d of divs) {
    const I: number[] = []
    for (let k = 0; k * d < n; k++) I.push((k * d) % n)
    out.push(I.sort((a, b) => a - b))
  }
  return out
}

function OpTables() {
  const [id, setId] = useState("Z6")
  const R = RINGS.find((r) => r.id === id)!

  const Cell = ({ v, op }: { v: number; op: "+" | "·" }) => {
    const col = op === "+" ? "emerald" : "violet"
    const isZero = v === 0
    return (
      <div
        className={`font-mono text-[11px] text-center py-1 border border-neutral-800 ${
          isZero
            ? `bg-${col}-500/10 text-${col}-300`
            : "bg-neutral-950 text-neutral-300"
        }`}
      >
        {R.elems[v]}
      </div>
    )
  }
  void Cell

  return (
    <Card>
      <p className="text-sm text-neutral-400 mb-3">
        <strong className="text-neutral-200">Ring.</strong> A set with two
        operations: <Tex math="+" /> makes it an abelian group, and{" "}
        <Tex math={String.raw`\cdot`} /> distributes over <Tex math="+" />.
      </p>

      <div className="flex flex-wrap gap-2 mb-3">
        {RINGS.map((r) => (
          <button
            key={r.id}
            onClick={() => setId(r.id)}
            className={`rounded-md border px-2 py-1 text-xs font-mono ${
              id === r.id
                ? "border-amber-500/60 bg-amber-500/20 text-amber-200"
                : "border-neutral-800 text-neutral-400 hover:bg-neutral-900"
            }`}
          >
            {r.name}
          </button>
        ))}
      </div>

      <div className="text-xs text-neutral-500 mb-2 italic">{R.note}</div>

      <div className="grid md:grid-cols-2 gap-3">
        {(["add", "mul"] as const).map((op) => {
          const tab = op === "add" ? R.add : R.mul
          const sym = op === "add" ? "+" : "·"
          const accent = op === "add" ? "emerald" : "violet"
          return (
            <div
              key={op}
              className="rounded-md border border-neutral-800 bg-neutral-950 overflow-x-auto"
            >
              <div
                className={`text-xs font-mono px-3 py-2 text-${accent}-300`}
              >
                {op === "add" ? "addition" : "multiplication"} ({sym})
              </div>
              <table className="border-collapse">
                <thead>
                  <tr>
                    <th
                      className={`border border-neutral-800 px-2 py-1 text-xs text-${accent}-400 bg-neutral-950`}
                    >
                      {sym}
                    </th>
                    {R.elems.map((e, j) => (
                      <th
                        key={j}
                        className={`border border-neutral-800 px-2 py-1 text-xs text-${accent}-400 bg-neutral-950 font-mono`}
                      >
                        {e}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {R.elems.map((e, i) => (
                    <tr key={i}>
                      <th
                        className={`border border-neutral-800 px-2 py-1 text-xs text-${accent}-400 bg-neutral-950 font-mono`}
                      >
                        {e}
                      </th>
                      {R.elems.map((_, j) => {
                        const v = tab[i][j]
                        const isZero = v === 0 && op === "mul" && i > 0 && j > 0
                        return (
                          <motion.td
                            key={j}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: (i + j) * 0.015 }}
                            className={`border border-neutral-800 px-2 py-1 text-center text-xs font-mono ${
                              isZero
                                ? "bg-rose-500/15 text-rose-300"
                                : "text-neutral-300"
                            }`}
                          >
                            {R.elems[v]}
                          </motion.td>
                        )
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        })}
      </div>

      <div className="mt-3 flex flex-wrap gap-2 text-xs">
        <span
          className={`rounded-md border px-2 py-0.5 font-mono ${
            R.field
              ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-200"
              : "border-neutral-800 text-neutral-500"
          }`}
        >
          field {R.field ? "✓" : "✗"}
        </span>
        <span
          className={`rounded-md border px-2 py-0.5 font-mono ${
            R.integralDomain
              ? "border-sky-500/40 bg-sky-500/10 text-sky-200"
              : "border-neutral-800 text-neutral-500"
          }`}
        >
          integral domain {R.integralDomain ? "✓" : "✗"}
        </span>
        {!R.integralDomain && (
          <span className="text-rose-400 font-mono">
            red cells: zero divisors a·b = 0 with a,b ≠ 0
          </span>
        )}
      </div>
    </Card>
  )
}

function IdealExplorer() {
  const [id, setId] = useState("Z12")
  const R = RINGS.find((r) => r.id === id)!
  const ideals = useMemo(() => idealsZn(R), [R])
  const [iIdx, setIIdx] = useState(1)
  const I = ideals[Math.min(iIdx, ideals.length - 1)]

  // check absorption: for each r in R, i in I, r*i in I?
  const violations: { r: number; i: number; p: number }[] = []
  for (let r = 0; r < R.n; r++) {
    for (const i of I) {
      const p = R.mul[r][i]
      if (!I.includes(p)) violations.push({ r, i, p })
    }
  }
  const isIdeal = violations.length === 0

  // Try a random non-ideal subgroup for contrast: none needed; all additive subgroups of Z_n are ideals because it's commutative
  // So the demo: pick a subset that isn't a subgroup, show it fails
  const quotientSize = R.n / I.length

  return (
    <Card>
      <p className="text-sm text-neutral-400 mb-3">
        <strong className="text-neutral-200">Ideal.</strong> A subset{" "}
        <Tex math={String.raw`I \subseteq R`} /> closed under addition and{" "}
        <em>absorbing</em> products: <Tex math={String.raw`r \cdot i \in I`} />{" "}
        for every <Tex math={String.raw`r \in R,\ i \in I`} />. This is what
        makes <Tex math={String.raw`R/I`} /> a ring.
      </p>

      <div className="flex flex-wrap gap-2 mb-3">
        {RINGS.filter((r) => r.id !== "GF4").map((r) => (
          <button
            key={r.id}
            onClick={() => {
              setId(r.id)
              setIIdx(1)
            }}
            className={`rounded-md border px-2 py-1 text-xs font-mono ${
              id === r.id
                ? "border-amber-500/60 bg-amber-500/20 text-amber-200"
                : "border-neutral-800 text-neutral-400 hover:bg-neutral-900"
            }`}
          >
            {r.name}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-3">
        <label className="text-xs text-neutral-500 font-mono">
          ideal ⟨d⟩
        </label>
        <select
          value={iIdx}
          onChange={(e) => setIIdx(Number(e.target.value))}
          className="rounded-md border border-neutral-800 bg-neutral-950 text-neutral-200 px-2 py-1 text-xs font-mono"
        >
          {ideals.map((S, k) => (
            <option key={k} value={k}>
              {"{"}
              {S.join(",")}
              {"}"} (|I|={S.length})
            </option>
          ))}
        </select>
      </div>

      <div className="rounded-md border border-neutral-800 bg-neutral-950 p-3">
        <div className="text-xs text-neutral-500 mb-2 font-mono">
          ring elements — ideal highlighted
        </div>
        <div className="flex flex-wrap gap-2">
          {R.elems.map((e, i) => {
            const inI = I.includes(i)
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.02 }}
                className={`rounded-md border px-2 py-1 font-mono text-xs ${
                  inI
                    ? "border-emerald-500/60 bg-emerald-500/20 text-emerald-200"
                    : "border-neutral-800 text-neutral-500"
                }`}
              >
                {e}
              </motion.div>
            )
          })}
        </div>

        <div className="mt-3 text-xs text-neutral-500 mb-2 font-mono">
          absorption check: r·i for r ∈ R, i ∈ I
        </div>
        <div className="flex flex-wrap gap-1">
          {R.elems.map((_, r) => (
            <div key={r} className="flex gap-1">
              {I.map((i) => {
                const p = R.mul[r][i]
                const back = I.includes(p)
                return (
                  <span
                    key={`${r}-${i}`}
                    className={`px-1.5 py-0.5 text-[10px] rounded font-mono ${
                      back
                        ? "bg-emerald-500/10 text-emerald-300"
                        : "bg-rose-500/20 text-rose-300"
                    }`}
                    title={`${R.elems[r]} · ${R.elems[i]} = ${R.elems[p]}`}
                  >
                    {R.elems[p]}
                  </span>
                )
              })}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
        <span
          className={`rounded-md border px-2 py-0.5 font-mono ${
            isIdeal
              ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-200"
              : "border-rose-500/40 bg-rose-500/10 text-rose-200"
          }`}
        >
          {isIdeal ? "✓ ideal" : "✗ not an ideal"}
        </span>
        <span className="font-mono text-neutral-500">
          |R/I| = {R.n}/{I.length} = {quotientSize}
        </span>
        <span className="ml-auto text-neutral-400 font-mono">
          Z_{R.n} / ⟨{I[1] ?? I[0]}⟩ ≅ Z_{quotientSize}
        </span>
      </div>
    </Card>
  )
}

function ZeroDivisors() {
  return (
    <Card>
      <p className="text-sm text-neutral-400 mb-3">
        <strong className="text-neutral-200">Zero divisors & units.</strong> In{" "}
        <Tex math={String.raw`\mathbb{Z}/n\mathbb{Z}`} />, each nonzero{" "}
        <Tex math="a" /> is either a <em>unit</em> (coprime to n — has a
        multiplicative inverse) or a <em>zero divisor</em> (shares a factor
        with n).
      </p>
      <ZeroDivTable />
      <p className="mt-3 text-xs text-neutral-500">
        Prime <Tex math="n" /> ⟹ no zero divisors ⟹{" "}
        <Tex math={String.raw`\mathbb{Z}/n\mathbb{Z}`} /> is a field. Composite{" "}
        <Tex math="n" /> always gives a zero divisor (and never a field).
      </p>
    </Card>
  )
}

function ZeroDivTable() {
  const [n, setN] = useState(12)
  const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b))
  const items = Array.from({ length: n }, (_, i) => {
    if (i === 0) return { i, kind: "zero" as const }
    const g = gcd(i, n)
    return { i, kind: g === 1 ? ("unit" as const) : ("zero-div" as const) }
  })

  return (
    <>
      <div className="flex items-center gap-3 mb-3">
        <label className="text-xs text-neutral-500 font-mono">n</label>
        <input
          type="range"
          min={2}
          max={24}
          value={n}
          onChange={(e) => setN(Number(e.target.value))}
          className="w-48 accent-amber-400"
        />
        <span className="text-xs font-mono text-neutral-300">n = {n}</span>
      </div>
      <div className="rounded-md border border-neutral-800 bg-neutral-950 p-3">
        <div className="flex flex-wrap gap-1.5">
          {items.map((it) => (
            <span
              key={it.i}
              className={`rounded-md px-2 py-1 text-xs font-mono ${
                it.kind === "zero"
                  ? "bg-neutral-800 text-neutral-400"
                  : it.kind === "unit"
                  ? "bg-emerald-500/20 text-emerald-200 border border-emerald-500/40"
                  : "bg-rose-500/20 text-rose-200 border border-rose-500/40"
              }`}
            >
              {it.i}
            </span>
          ))}
        </div>
        <div className="mt-3 text-xs font-mono flex flex-wrap gap-3">
          <span className="text-emerald-300">
            units ({items.filter((x) => x.kind === "unit").length}) = φ({n})
          </span>
          <span className="text-rose-300">
            zero divisors (
            {items.filter((x) => x.kind === "zero-div").length})
          </span>
        </div>
      </div>
    </>
  )
}

export default function Rings() {
  return (
    <TopicShell topic={topic}>
      <Section title="Two operation tables">
        <OpTables />
      </Section>
      <Section title="Ideals — the absorbing subrings">
        <IdealExplorer />
      </Section>
      <Section title="Units vs zero divisors">
        <ZeroDivisors />
      </Section>
    </TopicShell>
  )
}
