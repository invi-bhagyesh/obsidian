import { useMemo, useState } from "react"
import Tex from "../../components/Tex"
import TopicShell, { Section, Card } from "../../components/TopicShell"
import { TOPICS } from "../../topics"

const topic = TOPICS.find((t) => t.slug === "mlc/cnf-dnf")!

type Node =
  | { t: "var"; name: string }
  | { t: "const"; val: boolean }
  | { t: "not"; x: Node }
  | { t: "and"; x: Node; y: Node }
  | { t: "or"; x: Node; y: Node }
  | { t: "imp"; x: Node; y: Node }
  | { t: "iff"; x: Node; y: Node }

type Tok =
  | { k: "lp" } | { k: "rp" } | { k: "not" } | { k: "and" } | { k: "or" }
  | { k: "imp" } | { k: "iff" } | { k: "var"; n: string }
  | { k: "T" } | { k: "F" }

function tokenize(s: string): Tok[] {
  const toks: Tok[] = []
  let i = 0
  while (i < s.length) {
    const c = s[i]
    if (c === " " || c === "\t") { i++; continue }
    if (c === "(") { toks.push({ k: "lp" }); i++; continue }
    if (c === ")") { toks.push({ k: "rp" }); i++; continue }
    if (c === "~" || c === "!" || c === "¬") { toks.push({ k: "not" }); i++; continue }
    if (c === "&" || c === "∧") { toks.push({ k: "and" }); i++; continue }
    if (c === "|" || c === "∨") { toks.push({ k: "or" }); i++; continue }
    if (s.startsWith("<->", i) || s.startsWith("<=>", i) || s.startsWith("↔", i)) {
      toks.push({ k: "iff" })
      i += s[i] === "↔" ? 1 : 3
      continue
    }
    if (s.startsWith("->", i) || s.startsWith("=>", i) || s.startsWith("→", i)) {
      toks.push({ k: "imp" })
      i += s[i] === "→" ? 1 : 2
      continue
    }
    if (/[A-Za-z]/.test(c)) {
      let j = i
      while (j < s.length && /[A-Za-z0-9_]/.test(s[j])) j++
      const name = s.slice(i, j)
      if (name === "T") toks.push({ k: "T" })
      else if (name === "F") toks.push({ k: "F" })
      else toks.push({ k: "var", n: name })
      i = j
      continue
    }
    throw new Error(`unexpected char '${c}'`)
  }
  return toks
}

function parse(toks: Tok[]): Node {
  let p = 0
  function atom(): Node {
    const t = toks[p]
    if (!t) throw new Error("unexpected end")
    if (t.k === "lp") {
      p++
      const e = iff()
      if (toks[p]?.k !== "rp") throw new Error("missing )")
      p++
      return e
    }
    if (t.k === "not") { p++; return { t: "not", x: atom() } }
    if (t.k === "var") { p++; return { t: "var", name: t.n } }
    if (t.k === "T") { p++; return { t: "const", val: true } }
    if (t.k === "F") { p++; return { t: "const", val: false } }
    throw new Error("expected atom")
  }
  function and(): Node {
    let l = atom()
    while (toks[p]?.k === "and") { p++; l = { t: "and", x: l, y: atom() } }
    return l
  }
  function or(): Node {
    let l = and()
    while (toks[p]?.k === "or") { p++; l = { t: "or", x: l, y: and() } }
    return l
  }
  function imp(): Node {
    const l = or()
    if (toks[p]?.k === "imp") { p++; return { t: "imp", x: l, y: imp() } }
    return l
  }
  function iff(): Node {
    let l = imp()
    while (toks[p]?.k === "iff") { p++; l = { t: "iff", x: l, y: imp() } }
    return l
  }
  const result = iff()
  if (p < toks.length) throw new Error("trailing tokens")
  return result
}

function collectVars(n: Node, set: Set<string> = new Set()): string[] {
  const walk = (x: Node) => {
    if (x.t === "var") set.add(x.name)
    else if (x.t === "const") return
    else if (x.t === "not") walk(x.x)
    else { walk(x.x); walk(x.y) }
  }
  walk(n)
  return [...set].sort()
}

function evaluate(n: Node, env: Record<string, boolean>): boolean {
  switch (n.t) {
    case "var": return !!env[n.name]
    case "const": return n.val
    case "not": return !evaluate(n.x, env)
    case "and": return evaluate(n.x, env) && evaluate(n.y, env)
    case "or": return evaluate(n.x, env) || evaluate(n.y, env)
    case "imp": return !evaluate(n.x, env) || evaluate(n.y, env)
    case "iff": return evaluate(n.x, env) === evaluate(n.y, env)
  }
}

// Rewrite steps:
// Step 1: eliminate ↔ using p↔q = (p→q) ∧ (q→p)
// Step 2: eliminate → using p→q = ¬p ∨ q
// Step 3: push ¬ inward (De Morgan)
// Step 4: distribute — for CNF: ∨ over ∧; for DNF: ∧ over ∨

function elimIff(n: Node): Node {
  if (n.t === "var" || n.t === "const") return n
  if (n.t === "not") return { t: "not", x: elimIff(n.x) }
  if (n.t === "iff") {
    const a = elimIff(n.x)
    const b = elimIff(n.y)
    return { t: "and", x: { t: "imp", x: a, y: b }, y: { t: "imp", x: b, y: a } }
  }
  const nn = n as { t: "and" | "or" | "imp"; x: Node; y: Node }
  return { t: nn.t, x: elimIff(nn.x), y: elimIff(nn.y) }
}

function elimImp(n: Node): Node {
  if (n.t === "var" || n.t === "const") return n
  if (n.t === "not") return { t: "not", x: elimImp(n.x) }
  if (n.t === "imp") {
    return { t: "or", x: { t: "not", x: elimImp(n.x) }, y: elimImp(n.y) }
  }
  if (n.t === "iff") return elimImp(elimIff(n))
  return { t: n.t, x: elimImp(n.x), y: elimImp(n.y) }
}

function toNNF(n: Node): Node {
  if (n.t === "var" || n.t === "const") return n
  if (n.t === "not") {
    const x = n.x
    if (x.t === "not") return toNNF(x.x)
    if (x.t === "var" || x.t === "const") return n
    if (x.t === "and") return toNNF({ t: "or", x: { t: "not", x: x.x }, y: { t: "not", x: x.y } })
    if (x.t === "or") return toNNF({ t: "and", x: { t: "not", x: x.x }, y: { t: "not", x: x.y } })
    if (x.t === "imp") return toNNF({ t: "and", x: x.x, y: { t: "not", x: x.y } })
    if (x.t === "iff") return toNNF({ t: "not", x: elimIff(x) })
    return n
  }
  if (n.t === "imp" || n.t === "iff") return toNNF(elimImp(n))
  return { t: n.t, x: toNNF(n.x), y: toNNF(n.y) }
}

// CNF from truth table (canonical): AND over all false rows of (OR of negated-matching literals)
// DNF from truth table (canonical): OR over all true rows of (AND of matching literals)

function canonicalCNF(vars: string[], rows: { env: Record<string, boolean>; val: boolean }[]): string {
  const falseRows = rows.filter((r) => !r.val)
  if (falseRows.length === 0) return "T"
  const clauses = falseRows.map((r) => {
    const lits = vars.map((v) => (r.env[v] ? `¬${v}` : v))
    return `(${lits.join(" ∨ ")})`
  })
  return clauses.join(" ∧ ")
}

function canonicalDNF(vars: string[], rows: { env: Record<string, boolean>; val: boolean }[]): string {
  const trueRows = rows.filter((r) => r.val)
  if (trueRows.length === 0) return "F"
  const terms = trueRows.map((r) => {
    const lits = vars.map((v) => (r.env[v] ? v : `¬${v}`))
    return `(${lits.join(" ∧ ")})`
  })
  return terms.join(" ∨ ")
}

function display(n: Node, p = 0): string {
  if (n.t === "var") return n.name
  if (n.t === "const") return n.val ? "T" : "F"
  if (n.t === "not") return `¬${display(n.x, 5)}`
  const ops: Record<string, [string, number]> = {
    and: ["∧", 4], or: ["∨", 2], imp: ["→", 1], iff: ["↔", 0],
  }
  const [sym, q] = ops[n.t as "and" | "or" | "imp" | "iff"]
  const s = `${display((n as { x: Node }).x, q)} ${sym} ${display((n as { y: Node }).y, q + (n.t === "imp" ? 0 : 1))}`
  return p > q ? `(${s})` : s
}

function StepByStep() {
  const [input, setInput] = useState("p -> (q -> r)")

  const result = useMemo(() => {
    try {
      const ast = parse(tokenize(input))
      const vars = collectVars(ast)
      if (vars.length > 5) return { err: "too many vars (>5)" }
      const s1 = elimIff(ast)
      const s2 = elimImp(s1)
      const s3 = toNNF(s2)
      const N = 1 << vars.length
      const rows: { env: Record<string, boolean>; val: boolean }[] = []
      for (let m = 0; m < N; m++) {
        const env: Record<string, boolean> = {}
        for (let i = 0; i < vars.length; i++) env[vars[i]] = !!((m >> (vars.length - 1 - i)) & 1)
        rows.push({ env, val: evaluate(ast, env) })
      }
      const cnf = canonicalCNF(vars, rows)
      const dnf = canonicalDNF(vars, rows)
      return { err: null as string | null, ast, s1, s2, s3, vars, rows, cnf, dnf }
    } catch (e) {
      return { err: (e as Error).message }
    }
  }, [input])

  const exs = [
    "p -> (q -> r)",
    "(p | q) & (~p | r)",
    "~(p & q) | r",
    "p <-> q",
    "(p | q) -> (p & q)",
    "~(p -> q)",
  ]

  return (
    <Card>
      <p className="text-sm text-neutral-400 mb-3">
        <strong className="text-neutral-200">Normalize step by step.</strong>{" "}
        Eliminate ↔, then →, then push negations in (NNF), then read CNF / DNF
        off the truth table.
      </p>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full rounded-md border border-neutral-800 bg-neutral-950 px-3 py-2 text-sm font-mono text-neutral-100 focus:border-teal-500 focus:outline-none"
      />
      <div className="mt-2 flex flex-wrap gap-1">
        {exs.map((e) => (
          <button
            key={e}
            onClick={() => setInput(e)}
            className="rounded-md border border-neutral-800 bg-neutral-950 px-2 py-0.5 text-[11px] font-mono text-neutral-400 hover:border-teal-500/60 hover:text-teal-200"
          >
            {e}
          </button>
        ))}
      </div>

      {result.err ? (
        <div className="mt-3 rounded-md border border-rose-500/40 bg-rose-500/10 px-3 py-2 text-xs font-mono text-rose-200">
          {result.err}
        </div>
      ) : (
        <div className="mt-3 space-y-2">
          {[
            { n: "original", v: display(result.ast!), color: "text-neutral-200" },
            { n: "1. eliminate ↔", v: display(result.s1!), color: "text-teal-300" },
            { n: "2. eliminate →", v: display(result.s2!), color: "text-teal-300" },
            { n: "3. NNF (push ¬ inward)", v: display(result.s3!), color: "text-teal-300" },
            { n: "canonical CNF (from FALSE rows)", v: result.cnf!, color: "text-violet-300" },
            { n: "canonical DNF (from TRUE rows)", v: result.dnf!, color: "text-amber-300" },
          ].map((s, i) => (
            <div
              key={i}
              className="rounded-md border border-neutral-800 bg-neutral-950 px-3 py-2 flex items-start gap-3"
            >
              <div className="text-xs text-neutral-500 font-mono w-56 shrink-0">{s.n}</div>
              <div className={`text-sm font-mono ${s.color} break-all`}>{s.v}</div>
            </div>
          ))}
        </div>
      )}
    </Card>
  )
}

function TruthTableToNF() {
  const rows = [
    { p: false, q: false, v: false },
    { p: false, q: true, v: true },
    { p: true, q: false, v: true },
    { p: true, q: true, v: false },
  ]
  return (
    <Card>
      <p className="text-sm text-neutral-400 mb-3">
        <strong className="text-neutral-200">How canonical NFs work.</strong>{" "}
        Consider <Tex math={String.raw`p \oplus q`} /> (XOR).
      </p>

      <div className="grid md:grid-cols-[auto_1fr] gap-4 items-start">
        <table className="text-xs font-mono rounded-md border border-neutral-800 bg-neutral-950">
          <thead className="bg-neutral-900/50 border-b border-neutral-800">
            <tr>
              <th className="px-3 py-1 text-left text-teal-300">p</th>
              <th className="px-3 py-1 text-left text-teal-300">q</th>
              <th className="px-3 py-1 text-left text-amber-300">p⊕q</th>
              <th className="px-3 py-1 text-left text-violet-300">clause / term</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-b border-neutral-800/50 last:border-0">
                <td className="px-3 py-1">{r.p ? "T" : "F"}</td>
                <td className="px-3 py-1">{r.q ? "T" : "F"}</td>
                <td className={`px-3 py-1 ${r.v ? "text-emerald-300" : "text-rose-400"}`}>
                  {r.v ? "T" : "F"}
                </td>
                <td className="px-3 py-1 text-neutral-400">
                  {r.v
                    ? `${r.p ? "p" : "¬p"} ∧ ${r.q ? "q" : "¬q"}  (DNF term)`
                    : `${r.p ? "¬p" : "p"} ∨ ${r.q ? "¬q" : "q"}  (CNF clause)`}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="text-sm text-neutral-300 space-y-3">
          <div>
            <div className="text-xs text-neutral-500 font-mono mb-1">DNF: OR of TRUE rows</div>
            <div className="rounded-md border border-amber-500/30 bg-amber-500/5 px-3 py-1 font-mono">
              (¬p ∧ q) ∨ (p ∧ ¬q)
            </div>
          </div>
          <div>
            <div className="text-xs text-neutral-500 font-mono mb-1">CNF: AND over FALSE rows of complements</div>
            <div className="rounded-md border border-violet-500/30 bg-violet-500/5 px-3 py-1 font-mono">
              (p ∨ q) ∧ (¬p ∨ ¬q)
            </div>
          </div>
          <div className="text-xs text-neutral-500">
            Every propositional formula has a unique canonical CNF and DNF over
            a fixed variable ordering (up to reordering within clauses/terms).
          </div>
        </div>
      </div>
    </Card>
  )
}

function Uses() {
  return (
    <Card>
      <p className="text-sm text-neutral-400 mb-3">
        <strong className="text-neutral-200">Why it matters.</strong>
      </p>
      <ul className="space-y-2 text-sm text-neutral-300">
        <li className="flex gap-2">
          <span className="text-teal-400 font-mono">·</span>
          <span>
            <strong>SAT solvers.</strong> Most industrial solvers want input in
            CNF (as a set of clauses).
          </span>
        </li>
        <li className="flex gap-2">
          <span className="text-teal-400 font-mono">·</span>
          <span>
            <strong>Resolution / proof theory.</strong> Resolution rule works
            on CNF clauses.
          </span>
        </li>
        <li className="flex gap-2">
          <span className="text-teal-400 font-mono">·</span>
          <span>
            <strong>Digital logic.</strong> DNF ≈ sum of products; CNF ≈
            product of sums. Direct translation to gates.
          </span>
        </li>
        <li className="flex gap-2">
          <span className="text-teal-400 font-mono">·</span>
          <span>
            <strong>Complexity caveat.</strong> CNF conversion via distribution
            can blow up exponentially. Tseitin encoding keeps it linear by
            introducing fresh variables.
          </span>
        </li>
      </ul>
    </Card>
  )
}

export default function CnfDnf() {
  return (
    <TopicShell topic={topic}>
      <Section title="Step-through normalization">
        <StepByStep />
      </Section>
      <Section title="Reading NFs off a truth table">
        <TruthTableToNF />
      </Section>
      <Section title="Where CNF & DNF show up">
        <Uses />
      </Section>
    </TopicShell>
  )
}
