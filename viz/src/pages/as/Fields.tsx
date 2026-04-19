import { useMemo, useState } from "react"
import { motion } from "framer-motion"
import Tex from "../../components/Tex"
import TopicShell, { Section, Card } from "../../components/TopicShell"
import { TOPICS } from "../../topics"

const topic = TOPICS.find((t) => t.slug === "as/fields")!

function mod(a: number, p: number) {
  return ((a % p) + p) % p
}

function modInverse(a: number, p: number): number {
  a = mod(a, p)
  for (let i = 1; i < p; i++) if ((a * i) % p === 1) return i
  return -1
}

// --- F_p table ---
function FpTable() {
  const [p, setP] = useState(5)
  const primes = [2, 3, 5, 7, 11]
  const isPrime = (n: number) => {
    if (n < 2) return false
    for (let i = 2; i * i <= n; i++) if (n % i === 0) return false
    return true
  }

  const elems = Array.from({ length: p }, (_, i) => i)
  const mulTab = elems.map((i) => elems.map((j) => (i * j) % p))

  const invMap = elems.map((a) => (a === 0 ? null : modInverse(a, p)))

  return (
    <Card>
      <p className="text-sm text-neutral-400 mb-3">
        <strong className="text-neutral-200">Prime field </strong>
        <Tex math={String.raw`\mathbb{F}_p = \mathbb{Z}/p\mathbb{Z}`} />. Every
        nonzero element has an inverse because <Tex math="p" /> is prime — so
        we can divide.
      </p>

      <div className="flex flex-wrap items-center gap-3 mb-3">
        <label className="text-xs text-neutral-500 font-mono">p</label>
        <div className="inline-flex rounded-md border border-neutral-800 overflow-hidden text-xs font-mono">
          {primes.map((q) => (
            <button
              key={q}
              onClick={() => setP(q)}
              className={`px-3 py-1 ${
                p === q ? "bg-amber-500/20 text-amber-200" : "text-neutral-400"
              }`}
            >
              {q}
            </button>
          ))}
        </div>
        <span
          className={`ml-auto rounded-md border px-2 py-0.5 text-xs font-mono ${
            isPrime(p)
              ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-200"
              : "border-rose-500/40 bg-rose-500/10 text-rose-200"
          }`}
        >
          {isPrime(p) ? "field" : "not a field"}
        </span>
      </div>

      <div className="rounded-md border border-neutral-800 bg-neutral-950 overflow-x-auto">
        <div className="text-xs font-mono px-3 py-2 text-violet-300">
          multiplication mod {p}
        </div>
        <table className="border-collapse">
          <thead>
            <tr>
              <th className="border border-neutral-800 px-2 py-1 text-xs text-violet-400 bg-neutral-950">
                ·
              </th>
              {elems.map((e) => (
                <th
                  key={e}
                  className="border border-neutral-800 px-2 py-1 text-xs text-violet-400 bg-neutral-950 font-mono"
                >
                  {e}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {elems.map((i) => (
              <tr key={i}>
                <th className="border border-neutral-800 px-2 py-1 text-xs text-violet-400 bg-neutral-950 font-mono">
                  {i}
                </th>
                {elems.map((j) => (
                  <motion.td
                    key={j}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: (i + j) * 0.01 }}
                    className="border border-neutral-800 px-2 py-1 text-center text-xs font-mono text-neutral-300"
                  >
                    {mulTab[i][j]}
                  </motion.td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-3 rounded-md border border-neutral-800 bg-neutral-950 p-3">
        <div className="text-xs text-neutral-500 mb-2 font-mono">
          multiplicative inverses
        </div>
        <div className="flex flex-wrap gap-2">
          {elems.slice(1).map((a) => {
            const inv = invMap[a]
            return (
              <div
                key={a}
                className={`rounded-md border px-2 py-1 text-xs font-mono ${
                  inv === null
                    ? "border-rose-500/40 text-rose-300"
                    : "border-emerald-500/40 text-emerald-200"
                }`}
              >
                {a}⁻¹ = {inv === null ? "—" : inv}
              </div>
            )
          })}
        </div>
      </div>
    </Card>
  )
}

// --- F_4 and F_8 via multiplication table lookup ---
// F_4 = F_2[a]/(a^2+a+1), elements {0, 1, a, a+1}
// F_8 = F_2[b]/(b^3+b+1), elements {0, 1, b, b+1, b^2, b^2+1, b^2+b, b^2+b+1}
// F_9 = F_3[c]/(c^2+1), elements = a + b*c for a,b in {0,1,2}

type Field = {
  id: string
  name: string
  tex: string
  p: number
  n: number
  minpoly: string
  elems: string[]
  mul: number[][]
  add: number[][]
  generator: number // primitive element index
}

// Build F_2[x]/(x^2+x+1)
function buildF4(): Field {
  // labels for (c1*a + c0): 0, 1, a, a+1 i.e., [0,0]=0 [0,1]=1 [1,0]=2 [1,1]=3
  const elems = ["0", "1", "a", "a+1"]
  // arithmetic: bit 0 = constant, bit 1 = a coeff
  // a^2 = a + 1 (since a^2 + a + 1 = 0 in F_2)
  const size = 4
  const add = Array.from({ length: size }, (_, i) =>
    Array.from({ length: size }, (_, j) => i ^ j),
  )
  const mulPair = (i: number, j: number): number => {
    const a1 = (i >> 1) & 1
    const a0 = i & 1
    const b1 = (j >> 1) & 1
    const b0 = j & 1
    // (a1 a + a0)(b1 a + b0) = a1 b1 a^2 + (a1 b0 + a0 b1) a + a0 b0
    // a^2 = a + 1 → a1 b1 a^2 = a1 b1 (a + 1) = a1 b1 a + a1 b1
    const c1 = (a1 * b0 + a0 * b1 + a1 * b1) % 2
    const c0 = (a0 * b0 + a1 * b1) % 2
    return (c1 << 1) | c0
  }
  const mul = Array.from({ length: size }, (_, i) =>
    Array.from({ length: size }, (_, j) => mulPair(i, j)),
  )
  return {
    id: "F4",
    name: "𝔽₄",
    tex: String.raw`\mathbb{F}_4`,
    p: 2,
    n: 2,
    minpoly: "a² + a + 1 = 0",
    elems,
    add,
    mul,
    generator: 2, // a is a generator
  }
}

function buildF8(): Field {
  // F_2[x]/(x^3 + x + 1). Let b = x.
  // Elements: c2*b^2 + c1*b + c0, index = (c2,c1,c0) binary
  const elems = ["0", "1", "b", "b+1", "b²", "b²+1", "b²+b", "b²+b+1"]
  const size = 8
  const add = Array.from({ length: size }, (_, i) =>
    Array.from({ length: size }, (_, j) => i ^ j),
  )
  // b^3 = b + 1
  const reduce = (c: number[]): number => {
    // c: coefficients c[0], c[1], c[2], c[3], c[4], ... low to high
    // reduce modulo b^3 + b + 1
    while (c.length > 3) {
      const top = c.length - 1
      const v = c[top]
      if (v === 1) {
        // x^top = x^(top-3) * x^3 = x^(top-3) * (b + 1)
        // so subtract x^top and add x^(top-3) * (b + 1) = x^(top-2) + x^(top-3)
        c[top] = 0
        c[top - 2] = (c[top - 2] + 1) % 2
        c[top - 3] = (c[top - 3] + 1) % 2
      }
      c.pop()
    }
    while (c.length < 3) c.push(0)
    return (c[2] << 2) | (c[1] << 1) | c[0]
  }
  const mulPair = (i: number, j: number): number => {
    const a = [i & 1, (i >> 1) & 1, (i >> 2) & 1]
    const b = [j & 1, (j >> 1) & 1, (j >> 2) & 1]
    const c = Array(5).fill(0)
    for (let x = 0; x < 3; x++)
      for (let y = 0; y < 3; y++) c[x + y] = (c[x + y] + a[x] * b[y]) % 2
    return reduce(c)
  }
  const mul = Array.from({ length: size }, (_, i) =>
    Array.from({ length: size }, (_, j) => mulPair(i, j)),
  )
  return {
    id: "F8",
    name: "𝔽₈",
    tex: String.raw`\mathbb{F}_8`,
    p: 2,
    n: 3,
    minpoly: "b³ + b + 1 = 0",
    elems,
    add,
    mul,
    generator: 2,
  }
}

function buildF9(): Field {
  // F_3[x]/(x^2 + 1). Let c = x, c^2 = -1 = 2 in F_3
  // elems a + b*c, a,b in 0..2, index = 3b + a
  const elems: string[] = []
  for (let b = 0; b < 3; b++)
    for (let a = 0; a < 3; a++) {
      let s = ""
      if (a === 0 && b === 0) s = "0"
      else if (b === 0) s = String(a)
      else if (a === 0) s = b === 1 ? "c" : `${b}c`
      else s = `${a}+${b === 1 ? "c" : `${b}c`}`
      elems.push(s)
    }
  const size = 9
  const decode = (k: number) => ({ a: k % 3, b: Math.floor(k / 3) })
  const encode = (a: number, b: number) => mod(a, 3) + 3 * mod(b, 3)
  const add = Array.from({ length: size }, (_, i) =>
    Array.from({ length: size }, (_, j) => {
      const { a: a1, b: b1 } = decode(i)
      const { a: a2, b: b2 } = decode(j)
      return encode(a1 + a2, b1 + b2)
    }),
  )
  const mul = Array.from({ length: size }, (_, i) =>
    Array.from({ length: size }, (_, j) => {
      const { a: a1, b: b1 } = decode(i)
      const { a: a2, b: b2 } = decode(j)
      // (a1 + b1 c)(a2 + b2 c) = a1 a2 + (a1 b2 + a2 b1)c + b1 b2 c^2
      // c^2 = -1 = 2
      const aOut = a1 * a2 + 2 * b1 * b2
      const bOut = a1 * b2 + a2 * b1
      return encode(aOut, bOut)
    }),
  )
  return {
    id: "F9",
    name: "𝔽₉",
    tex: String.raw`\mathbb{F}_9`,
    p: 3,
    n: 2,
    minpoly: "c² + 1 = 0 (i.e. c² = 2)",
    elems,
    add,
    mul,
    generator: 3, // c
  }
}

const FIELDS: Field[] = [buildF4(), buildF8(), buildF9()]

function FieldExtension() {
  const [id, setId] = useState("F4")
  const F = FIELDS.find((f) => f.id === id)!

  // powers of the primitive element
  const powers = useMemo(() => {
    const out: number[] = [1] // g^0 = 1
    let cur = F.generator
    for (let i = 1; i < F.elems.length; i++) {
      out.push(cur)
      cur = F.mul[cur][F.generator]
    }
    return out
  }, [F])

  return (
    <Card>
      <p className="text-sm text-neutral-400 mb-3">
        <strong className="text-neutral-200">Field extensions.</strong>{" "}
        <Tex math={String.raw`\mathbb{F}_{p^n}`} /> is built as{" "}
        <Tex math={String.raw`\mathbb{F}_p[x]/(f)`} /> for some irreducible{" "}
        <Tex math="f" /> of degree <Tex math="n" />. Elements are polynomials
        of degree <Tex math={String.raw`< n`} /> over{" "}
        <Tex math={String.raw`\mathbb{F}_p`} />.
      </p>

      <div className="flex flex-wrap gap-2 mb-3">
        {FIELDS.map((f) => (
          <button
            key={f.id}
            onClick={() => setId(f.id)}
            className={`rounded-md border px-3 py-1 text-xs font-mono ${
              id === f.id
                ? "border-amber-500/60 bg-amber-500/20 text-amber-200"
                : "border-neutral-800 text-neutral-400 hover:bg-neutral-900"
            }`}
          >
            {f.name} ({f.elems.length})
          </button>
        ))}
      </div>

      <div className="rounded-md border border-neutral-800 bg-neutral-950 p-3 mb-3">
        <div className="text-xs text-neutral-500 mb-1 font-mono">
          minimal polynomial
        </div>
        <div className="text-sm font-mono text-amber-200">{F.minpoly}</div>
        <div className="text-xs text-neutral-500 mt-2">
          |F| = {F.p}^{F.n} = {F.elems.length}. Characteristic {F.p} — adding a
          nonzero element to itself {F.p} times gives 0.
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-3">
        {(["add", "mul"] as const).map((op) => {
          const tab = op === "add" ? F.add : F.mul
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
                      className={`border border-neutral-800 px-2 py-1 text-[10px] text-${accent}-400 bg-neutral-950 font-mono`}
                    >
                      {sym}
                    </th>
                    {F.elems.map((e, j) => (
                      <th
                        key={j}
                        className={`border border-neutral-800 px-1 py-1 text-[10px] text-${accent}-400 bg-neutral-950 font-mono`}
                      >
                        {e}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {F.elems.map((e, i) => (
                    <tr key={i}>
                      <th
                        className={`border border-neutral-800 px-2 py-1 text-[10px] text-${accent}-400 bg-neutral-950 font-mono`}
                      >
                        {e}
                      </th>
                      {F.elems.map((_, j) => (
                        <motion.td
                          key={j}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: (i + j) * 0.01 }}
                          className="border border-neutral-800 px-1 py-1 text-center text-[10px] font-mono text-neutral-300"
                        >
                          {F.elems[tab[i][j]]}
                        </motion.td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        })}
      </div>

      <div className="mt-3 rounded-md border border-sky-500/30 bg-sky-500/5 p-3">
        <div className="text-xs font-mono text-sky-300 mb-2">
          powers of the primitive element{" "}
          <span className="text-sky-200">{F.elems[F.generator]}</span>
        </div>
        <div className="flex flex-wrap gap-2 text-[11px] font-mono">
          {powers.map((p, i) => (
            <div
              key={i}
              className="rounded-md border border-sky-500/40 bg-sky-500/10 px-2 py-1 text-sky-200"
            >
              g^{i} = {F.elems[p]}
            </div>
          ))}
        </div>
        <div className="mt-2 text-xs text-neutral-500">
          <Tex math={String.raw`\mathbb{F}_{p^n}^\times`} /> is cyclic of order{" "}
          {F.elems.length - 1} — every nonzero element is a power of{" "}
          <span className="font-mono">{F.elems[F.generator]}</span>.
        </div>
      </div>
    </Card>
  )
}

function MinimalPolynomials() {
  const examples = [
    {
      el: String.raw`\sqrt{2}`,
      over: String.raw`\mathbb{Q}`,
      poly: String.raw`x^2 - 2`,
      deg: 2,
    },
    {
      el: String.raw`\sqrt[3]{2}`,
      over: String.raw`\mathbb{Q}`,
      poly: String.raw`x^3 - 2`,
      deg: 3,
    },
    {
      el: String.raw`\zeta_5`,
      over: String.raw`\mathbb{Q}`,
      poly: String.raw`x^4 + x^3 + x^2 + x + 1`,
      deg: 4,
    },
    {
      el: String.raw`i`,
      over: String.raw`\mathbb{R}`,
      poly: String.raw`x^2 + 1`,
      deg: 2,
    },
    {
      el: String.raw`a \in \mathbb{F}_4`,
      over: String.raw`\mathbb{F}_2`,
      poly: String.raw`x^2 + x + 1`,
      deg: 2,
    },
    {
      el: String.raw`\sqrt{2} + \sqrt{3}`,
      over: String.raw`\mathbb{Q}`,
      poly: String.raw`x^4 - 10x^2 + 1`,
      deg: 4,
    },
  ]

  return (
    <Card>
      <p className="text-sm text-neutral-400 mb-3">
        <strong className="text-neutral-200">Minimal polynomial.</strong> For{" "}
        <Tex math={String.raw`\alpha`} /> algebraic over <Tex math="F" />, the
        minimal polynomial is the unique monic irreducible{" "}
        <Tex math="f \in F[x]" /> with{" "}
        <Tex math={String.raw`f(\alpha) = 0`} />. Its degree equals{" "}
        <Tex math={String.raw`[F(\alpha):F]`} />.
      </p>
      <div className="grid md:grid-cols-2 gap-2">
        {examples.map((e, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.05 }}
            className="rounded-md border border-neutral-800 bg-neutral-950 px-3 py-2"
          >
            <div className="flex items-baseline gap-2">
              <span className="text-xs text-neutral-500">α =</span>
              <Tex math={e.el} />
              <span className="text-xs text-neutral-500">over</span>
              <Tex math={e.over} />
            </div>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-xs text-neutral-500 font-mono">
                min poly
              </span>
              <span className="text-emerald-300">
                <Tex math={e.poly} />
              </span>
              <span className="ml-auto text-xs text-neutral-500 font-mono">
                deg {e.deg}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
      <p className="mt-3 text-xs text-neutral-500">
        The field{" "}
        <Tex math={String.raw`F(\alpha) \cong F[x]/(f)`} /> — adjoining α is the
        same as quotienting by its minimal polynomial.
      </p>
    </Card>
  )
}

function TowersAndDegrees() {
  return (
    <Card>
      <p className="text-sm text-neutral-400 mb-3">
        <strong className="text-neutral-200">Tower law.</strong> If{" "}
        <Tex math={String.raw`F \subseteq K \subseteq L`} /> are fields, then{" "}
        <Tex math={String.raw`[L:F] = [L:K] \cdot [K:F]`} />.
      </p>
      <div className="rounded-md border border-neutral-800 bg-neutral-950 p-4 flex flex-col items-center gap-1 font-mono text-sm">
        <div className="text-violet-300">ℚ(∛2, ω)</div>
        <div className="text-neutral-600 text-xs">| 2 (root of x² + x + 1)</div>
        <div className="text-sky-300">ℚ(∛2)</div>
        <div className="text-neutral-600 text-xs">| 3 (root of x³ − 2)</div>
        <div className="text-emerald-300">ℚ</div>
        <div className="text-xs text-neutral-500 mt-3">
          total degree = 2 × 3 = 6. This is the splitting field of x³ − 2.
        </div>
      </div>
      <p className="mt-3 text-xs text-neutral-500">
        A finite field <Tex math={String.raw`\mathbb{F}_{p^n}`} /> has a unique
        subfield <Tex math={String.raw`\mathbb{F}_{p^d}`} /> for each{" "}
        <Tex math={String.raw`d \mid n`} />. So subfields of{" "}
        <Tex math={String.raw`\mathbb{F}_{64}`} /> form a lattice matching the
        divisor lattice of 6.
      </p>
    </Card>
  )
}

export default function Fields() {
  return (
    <TopicShell topic={topic}>
      <Section title="Prime field F_p">
        <FpTable />
      </Section>
      <Section title="Extensions F_p[x]/(f)">
        <FieldExtension />
      </Section>
      <Section title="Minimal polynomials">
        <MinimalPolynomials />
      </Section>
      <Section title="Tower law & subfield lattice">
        <TowersAndDegrees />
      </Section>
    </TopicShell>
  )
}
