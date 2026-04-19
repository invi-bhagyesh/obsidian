import { useMemo, useState } from "react"
import { motion } from "framer-motion"
import Tex from "../../components/Tex"
import TopicShell, { Section, Card } from "../../components/TopicShell"
import { TOPICS } from "../../topics"

const topic = TOPICS.find((t) => t.slug === "as/polynomial-rings")!

// --- F_p polynomial arithmetic ---
// Represent polynomial as coefficient array, c[i] = coeff of x^i, low to high.

function mod(a: number, p: number) {
  return ((a % p) + p) % p
}

function trim(a: number[]): number[] {
  let i = a.length - 1
  while (i > 0 && a[i] === 0) i--
  return a.slice(0, i + 1)
}

function polyStr(a: number[], p?: number): string {
  const t = trim(a)
  if (t.length === 1 && t[0] === 0) return "0"
  const parts: string[] = []
  for (let i = t.length - 1; i >= 0; i--) {
    let c = t[i]
    if (p !== undefined) c = mod(c, p)
    if (c === 0) continue
    let term = ""
    if (i === 0) term = String(c)
    else {
      const co = c === 1 ? "" : c === -1 ? "-" : String(c)
      const pow = i === 1 ? "x" : `x^${i}`
      term = co + pow
    }
    parts.push(term)
  }
  if (parts.length === 0) return "0"
  return parts.join(" + ").replace(/\+ -/g, "- ")
}

function polyAdd(a: number[], b: number[], p: number): number[] {
  const n = Math.max(a.length, b.length)
  const out = Array(n).fill(0)
  for (let i = 0; i < n; i++) out[i] = mod((a[i] || 0) + (b[i] || 0), p)
  return trim(out)
}

function polyMul(a: number[], b: number[], p: number): number[] {
  const n = a.length + b.length - 1
  const out = Array(n).fill(0)
  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < b.length; j++) {
      out[i + j] = mod(out[i + j] + a[i] * b[j], p)
    }
  }
  return trim(out)
}

function modInverse(a: number, p: number): number {
  a = mod(a, p)
  for (let i = 1; i < p; i++) if ((a * i) % p === 1) return i
  throw new Error("no inverse")
}

function polyDivMod(num: number[], den: number[], p: number): { q: number[]; r: number[]; steps: { q: number[]; r: number[]; sub: number[] }[] } {
  const A = [...num.map((x) => mod(x, p))]
  const B = trim(den.map((x) => mod(x, p)))
  if (B.length === 1 && B[0] === 0) throw new Error("divide by zero")
  const degB = B.length - 1
  const lcBinv = modInverse(B[degB], p)
  let Q: number[] = [0]
  let R = trim(A)
  const steps: { q: number[]; r: number[]; sub: number[] }[] = []
  while (R.length - 1 >= degB && !(R.length === 1 && R[0] === 0)) {
    const degR = R.length - 1
    const shift = degR - degB
    const coeff = mod(R[degR] * lcBinv, p)
    const term = Array(shift + 1).fill(0)
    term[shift] = coeff
    const sub = polyMul(term, B, p)
    Q = polyAdd(Q, term, p)
    // R = R - sub
    const newR = Array(Math.max(R.length, sub.length)).fill(0)
    for (let i = 0; i < newR.length; i++)
      newR[i] = mod((R[i] || 0) - (sub[i] || 0), p)
    R = trim(newR)
    steps.push({ q: [...Q], r: [...R], sub })
  }
  return { q: trim(Q), r: trim(R), steps }
}

function polyGcd(a: number[], b: number[], p: number): number[] {
  let A = trim(a)
  let B = trim(b)
  while (!(B.length === 1 && B[0] === 0)) {
    const { r } = polyDivMod(A, B, p)
    A = B
    B = r
  }
  // normalize leading coeff to 1
  if (A.length > 0 && A[A.length - 1] !== 0) {
    const inv = modInverse(A[A.length - 1], p)
    A = A.map((c) => mod(c * inv, p))
  }
  return trim(A)
}

// Check if poly in F_p[x] is irreducible by trying all monic divisors up to deg n/2
function isIrreducible(a: number[], p: number): boolean {
  const t = trim(a)
  const n = t.length - 1
  if (n < 1) return false
  // has root in F_p?
  for (let v = 0; v < p; v++) {
    let y = 0
    for (let i = t.length - 1; i >= 0; i--) y = mod(y * v + t[i], p)
    if (y === 0 && n >= 1) return false
  }
  // check all polys of degree 2..n/2
  const maxd = Math.floor(n / 2)
  if (maxd < 2) return true
  const trydiv = (deg: number): boolean => {
    // generate all monic polys of this degree, try each
    const coeffs = Array(deg + 1).fill(0)
    coeffs[deg] = 1
    const rec = (idx: number): boolean => {
      if (idx < 0) {
        const { r } = polyDivMod(t, coeffs, p)
        if (r.length === 1 && r[0] === 0) return true
        return false
      }
      for (let v = 0; v < p; v++) {
        coeffs[idx] = v
        if (rec(idx - 1)) return true
      }
      return false
    }
    return rec(deg - 1)
  }
  for (let d = 2; d <= maxd; d++) {
    if (trydiv(d)) return false
  }
  return true
}

function parsePoly(s: string, p: number): number[] | null {
  // accepts e.g. "x^3 + 2x + 1" or "3x^2 - x + 1"
  s = s.replace(/\s+/g, "")
  if (s.length === 0) return null
  // normalize leading sign
  if (s[0] !== "-" && s[0] !== "+") s = "+" + s
  const re = /([+-])(\d*)x(?:\^(\d+))?|([+-])(\d+)/g
  const out: number[] = []
  let match
  let consumed = 0
  while ((match = re.exec(s)) !== null) {
    consumed += match[0].length
    if (match[2] !== undefined || match[3] !== undefined || match[0].includes("x")) {
      // term with x
      const sign = match[1] === "-" ? -1 : 1
      const coeff = match[2] === "" || match[2] === undefined ? 1 : Number(match[2])
      const power = match[3] === undefined ? 1 : Number(match[3])
      while (out.length <= power) out.push(0)
      out[power] = mod(out[power] + sign * coeff, p)
    } else {
      // constant
      const sign = match[4] === "-" ? -1 : 1
      const coeff = Number(match[5])
      if (out.length === 0) out.push(0)
      out[0] = mod(out[0] + sign * coeff, p)
    }
  }
  if (consumed < s.length) return null
  return trim(out)
}

const PRIMES = [2, 3, 5, 7]

function Division() {
  const [p, setP] = useState(5)
  const [aStr, setAStr] = useState("x^3 + 2x^2 + 4x + 1")
  const [bStr, setBStr] = useState("x + 2")

  const A = parsePoly(aStr, p) ?? [0]
  const B = parsePoly(bStr, p) ?? [1]
  const res = useMemo(() => {
    try {
      return polyDivMod(A, B, p)
    } catch {
      return null
    }
  }, [A, B, p])

  return (
    <Card>
      <p className="text-sm text-neutral-400 mb-3">
        <strong className="text-neutral-200">
          Polynomial division in <Tex math={String.raw`\mathbb{F}_p[x]`} />.
        </strong>{" "}
        For <Tex math={String.raw`a, b \in F[x]`} />, there exist unique{" "}
        <Tex math="q, r" /> with <Tex math={String.raw`a = bq + r`} /> and{" "}
        <Tex math={String.raw`\deg r < \deg b`} />.
      </p>

      <div className="flex flex-wrap items-center gap-3 mb-3">
        <label className="text-xs text-neutral-500 font-mono">prime p</label>
        <div className="inline-flex rounded-md border border-neutral-800 overflow-hidden text-xs font-mono">
          {PRIMES.map((q) => (
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
      </div>

      <div className="grid sm:grid-cols-2 gap-2 mb-3">
        <div>
          <div className="text-xs text-neutral-500 mb-1 font-mono">dividend a(x)</div>
          <input
            value={aStr}
            onChange={(e) => setAStr(e.target.value)}
            className="w-full rounded-md border border-neutral-800 bg-neutral-950 px-2 py-1 text-xs font-mono text-neutral-200"
          />
        </div>
        <div>
          <div className="text-xs text-neutral-500 mb-1 font-mono">divisor b(x)</div>
          <input
            value={bStr}
            onChange={(e) => setBStr(e.target.value)}
            className="w-full rounded-md border border-neutral-800 bg-neutral-950 px-2 py-1 text-xs font-mono text-neutral-200"
          />
        </div>
      </div>

      {res === null ? (
        <div className="rounded-md border border-rose-500/30 bg-rose-500/5 p-3 text-xs font-mono text-rose-200">
          Couldn't parse or divisor is zero. Use terms like "3x^2", "x", "-1".
        </div>
      ) : (
        <div className="rounded-md border border-neutral-800 bg-neutral-950 p-3 space-y-2">
          <div className="text-sm font-mono text-neutral-200">
            a(x) = <span className="text-sky-300">{polyStr(A, p)}</span>
          </div>
          <div className="text-sm font-mono text-neutral-200">
            b(x) = <span className="text-rose-300">{polyStr(B, p)}</span>
          </div>
          <div className="border-t border-neutral-800 pt-2 space-y-1 font-mono text-sm">
            <div className="text-neutral-200">
              quotient q(x) ={" "}
              <span className="text-emerald-300">{polyStr(res.q, p)}</span>
            </div>
            <div className="text-neutral-200">
              remainder r(x) ={" "}
              <span className="text-amber-300">{polyStr(res.r, p)}</span>
            </div>
          </div>
          <div className="text-xs text-neutral-500 border-t border-neutral-800 pt-2">
            Check: <span className="text-neutral-400 font-mono">b·q + r =</span>{" "}
            <span className="font-mono text-neutral-300">
              {polyStr(polyAdd(polyMul(B, res.q, p), res.r, p), p)}
            </span>
            <span className="text-neutral-500"> (should equal a(x))</span>
          </div>
        </div>
      )}

      <p className="mt-3 text-xs text-neutral-500">
        Coefficients live in <Tex math={String.raw`\mathbb{F}_p`} /> (integers
        mod p), so e.g. 4+3 = 2 in{" "}
        <Tex math={String.raw`\mathbb{F}_5`} />. Try <em>x⁴+1</em> ÷ <em>x²+1</em>{" "}
        in <Tex math={String.raw`\mathbb{F}_2`} />.
      </p>
    </Card>
  )
}

function Gcd() {
  const [p, setP] = useState(5)
  const [aStr, setAStr] = useState("x^3 - 1")
  const [bStr, setBStr] = useState("x^2 - 1")

  const A = parsePoly(aStr, p) ?? [0]
  const B = parsePoly(bStr, p) ?? [0]
  const g = useMemo(() => {
    try {
      return polyGcd(A, B, p)
    } catch {
      return null
    }
  }, [A, B, p])

  return (
    <Card>
      <p className="text-sm text-neutral-400 mb-3">
        <strong className="text-neutral-200">Euclidean algorithm for polynomials.</strong>{" "}
        Same as for integers — repeatedly replace{" "}
        <Tex math="(a, b)" /> with <Tex math="(b, a \bmod b)" /> until the
        second is zero. The result is the monic gcd.
      </p>

      <div className="flex flex-wrap items-center gap-3 mb-3">
        <label className="text-xs text-neutral-500 font-mono">prime p</label>
        <div className="inline-flex rounded-md border border-neutral-800 overflow-hidden text-xs font-mono">
          {PRIMES.map((q) => (
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
      </div>

      <div className="grid sm:grid-cols-2 gap-2 mb-3">
        <input
          value={aStr}
          onChange={(e) => setAStr(e.target.value)}
          className="rounded-md border border-neutral-800 bg-neutral-950 px-2 py-1 text-xs font-mono text-neutral-200"
          placeholder="a(x)"
        />
        <input
          value={bStr}
          onChange={(e) => setBStr(e.target.value)}
          className="rounded-md border border-neutral-800 bg-neutral-950 px-2 py-1 text-xs font-mono text-neutral-200"
          placeholder="b(x)"
        />
      </div>

      <div className="rounded-md border border-neutral-800 bg-neutral-950 p-3">
        {g === null ? (
          <div className="text-xs text-rose-300 font-mono">parse error</div>
        ) : (
          <>
            <div className="text-sm font-mono text-neutral-200">
              gcd ={" "}
              <span className="text-emerald-300">{polyStr(g, p)}</span>
            </div>
          </>
        )}
      </div>

      <p className="mt-3 text-xs text-neutral-500">
        A shared root <Tex math={String.raw`\alpha`} /> of{" "}
        <Tex math="a" /> and <Tex math="b" /> forces{" "}
        <Tex math={String.raw`(x - \alpha)`} /> to divide their gcd.
      </p>
    </Card>
  )
}

function Irreducibility() {
  const [p, setP] = useState(2)

  // enumerate all monic polys up to degree 4 over F_p
  const polys = useMemo(() => {
    const maxDeg = p === 2 ? 5 : p === 3 ? 3 : 2
    const out: { poly: number[]; deg: number; irr: boolean; label: string }[] = []
    for (let d = 1; d <= maxDeg; d++) {
      // generate all monic polys of degree d
      const coeffs = Array(d + 1).fill(0)
      coeffs[d] = 1
      const rec = (idx: number) => {
        if (idx < 0) {
          const poly = [...coeffs]
          out.push({
            poly,
            deg: d,
            irr: isIrreducible(poly, p),
            label: polyStr(poly, p),
          })
          return
        }
        for (let v = 0; v < p; v++) {
          coeffs[idx] = v
          rec(idx - 1)
        }
      }
      rec(d - 1)
    }
    return out
  }, [p])

  return (
    <Card>
      <p className="text-sm text-neutral-400 mb-3">
        <strong className="text-neutral-200">Irreducible polynomials</strong>{" "}
        over <Tex math={String.raw`\mathbb{F}_p`} /> are like primes for{" "}
        <Tex math={String.raw`\mathbb{F}_p[x]`} />. They're the building blocks
        of finite fields: quotient by an irreducible of degree{" "}
        <Tex math="n" /> gives a field of size <Tex math="p^n" />.
      </p>

      <div className="flex flex-wrap items-center gap-3 mb-3">
        <label className="text-xs text-neutral-500 font-mono">prime p</label>
        <div className="inline-flex rounded-md border border-neutral-800 overflow-hidden text-xs font-mono">
          {[2, 3].map((q) => (
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
      </div>

      <div className="rounded-md border border-neutral-800 bg-neutral-950 p-3 max-h-80 overflow-y-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {polys.map((q, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: Math.min(i * 0.005, 0.5) }}
              className={`rounded-md border px-2 py-1 text-xs font-mono ${
                q.irr
                  ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-200"
                  : "border-neutral-800 text-neutral-500"
              }`}
            >
              <span className="opacity-50">d={q.deg}</span>{" "}
              {q.label}
            </motion.div>
          ))}
        </div>
      </div>

      <p className="mt-3 text-xs text-neutral-500">
        Green = irreducible. Over{" "}
        <Tex math={String.raw`\mathbb{F}_2`} />,{" "}
        <Tex math={String.raw`x^2 + x + 1`} /> is the unique monic irreducible
        quadratic — and{" "}
        <Tex math={String.raw`\mathbb{F}_2[x]/(x^2+x+1) = \mathbb{F}_4`} />.
      </p>
    </Card>
  )
}

export default function PolynomialRings() {
  return (
    <TopicShell topic={topic}>
      <Section title="Division algorithm in F_p[x]">
        <Division />
      </Section>
      <Section title="Euclidean algorithm — polynomial gcd">
        <Gcd />
      </Section>
      <Section title="Irreducibility">
        <Irreducibility />
      </Section>
    </TopicShell>
  )
}
