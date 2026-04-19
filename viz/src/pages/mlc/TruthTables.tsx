import { useMemo, useState } from "react"
import Tex from "../../components/Tex"
import TopicShell, { Section, Card } from "../../components/TopicShell"
import { TOPICS } from "../../topics"

const topic = TOPICS.find((t) => t.slug === "mlc/truth-tables")!

// AST
type Node =
  | { t: "var"; name: string }
  | { t: "const"; val: boolean }
  | { t: "not"; x: Node }
  | { t: "and"; x: Node; y: Node }
  | { t: "or"; x: Node; y: Node }
  | { t: "imp"; x: Node; y: Node }
  | { t: "iff"; x: Node; y: Node }
  | { t: "xor"; x: Node; y: Node }

// Tokens: ( ) ~ ! & | -> <-> ^ var T F
type Tok =
  | { k: "lp" } | { k: "rp" } | { k: "not" } | { k: "and" } | { k: "or" }
  | { k: "imp" } | { k: "iff" } | { k: "xor" } | { k: "var"; n: string }
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
    if (c === "^" || c === "⊕") { toks.push({ k: "xor" }); i++; continue }
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
      if (name === "T" || name === "true") toks.push({ k: "T" })
      else if (name === "F" || name === "false") toks.push({ k: "F" })
      else if (name === "and") toks.push({ k: "and" })
      else if (name === "or") toks.push({ k: "or" })
      else if (name === "not") toks.push({ k: "not" })
      else if (name === "xor") toks.push({ k: "xor" })
      else if (name === "iff") toks.push({ k: "iff" })
      else if (name === "implies") toks.push({ k: "imp" })
      else toks.push({ k: "var", n: name })
      i = j
      continue
    }
    throw new Error(`unexpected char '${c}'`)
  }
  return toks
}

// Pratt parser: ~ > & > ^ > | > -> > <->
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
  function xor(): Node {
    let l = and()
    while (toks[p]?.k === "xor") { p++; l = { t: "xor", x: l, y: and() } }
    return l
  }
  function or(): Node {
    let l = xor()
    while (toks[p]?.k === "or") { p++; l = { t: "or", x: l, y: xor() } }
    return l
  }
  function imp(): Node {
    const l = or()
    if (toks[p]?.k === "imp") { p++; return { t: "imp", x: l, y: imp() } } // right-assoc
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
    case "xor": return evaluate(n.x, env) !== evaluate(n.y, env)
  }
}

// enumerate all subformulas in evaluation order (leaves first, root last, deduped)
function subformulas(n: Node): Node[] {
  const out: Node[] = []
  const seen = new Set<string>()
  const key = (x: Node): string => {
    if (x.t === "var") return `v:${x.name}`
    if (x.t === "const") return `c:${x.val}`
    if (x.t === "not") return `n:${key(x.x)}`
    return `${x.t}:${key(x.x)}:${key(x.y)}`
  }
  const walk = (x: Node) => {
    if (x.t === "var" || x.t === "const") return
    if (x.t === "not") walk(x.x)
    else { walk(x.x); walk(x.y) }
    const k = key(x)
    if (!seen.has(k)) { seen.add(k); out.push(x) }
  }
  walk(n)
  return out
}

function display(n: Node): string {
  const go = (x: Node, p: number): string => {
    if (x.t === "var") return x.name
    if (x.t === "const") return x.val ? "T" : "F"
    if (x.t === "not") return `¬${go(x.x, 5)}`
    const ops: Record<string, [string, number]> = {
      and: ["∧", 4], xor: ["⊕", 3], or: ["∨", 2], imp: ["→", 1], iff: ["↔", 0],
    }
    const [sym, q] = ops[x.t as "and" | "or" | "imp" | "iff" | "xor"]
    const s = `${go((x as { x: Node; y: Node }).x, q)} ${sym} ${go((x as { x: Node; y: Node }).y, q + (x.t === "imp" ? 0 : 1))}`
    return p > q ? `(${s})` : s
  }
  return go(n, 0)
}

const CONNECTIVES = [
  { sym: "¬", ascii: "~ or !", name: "not", tex: String.raw`\neg p` },
  { sym: "∧", ascii: "&", name: "and", tex: String.raw`p \land q` },
  { sym: "∨", ascii: "|", name: "or", tex: String.raw`p \lor q` },
  { sym: "⊕", ascii: "^", name: "xor", tex: String.raw`p \oplus q` },
  { sym: "→", ascii: "->", name: "imp", tex: String.raw`p \to q` },
  { sym: "↔", ascii: "<->", name: "iff", tex: String.raw`p \leftrightarrow q` },
]

const EXAMPLES = [
  "p & q",
  "p | q",
  "~p",
  "p -> q",
  "p <-> q",
  "(p -> q) & (q -> r) -> (p -> r)",
  "~(p & q) <-> (~p | ~q)",
  "p | ~p",
  "p & ~p",
  "(p -> q) <-> (~q -> ~p)",
]

function TruthTable() {
  const [input, setInput] = useState("(p -> q) & (q -> r) -> (p -> r)")

  const result = useMemo(() => {
    try {
      const toks = tokenize(input)
      const ast = parse(toks)
      const vars = collectVars(ast)
      if (vars.length > 6) return { err: "too many variables (>6) — try fewer" }
      const subs = subformulas(ast)
      // column order: vars, then all subformulas (root is last)
      const rows: { env: Record<string, boolean>; vals: boolean[] }[] = []
      const N = 1 << vars.length
      for (let m = 0; m < N; m++) {
        const env: Record<string, boolean> = {}
        for (let i = 0; i < vars.length; i++) {
          env[vars[i]] = !!((m >> (vars.length - 1 - i)) & 1)
        }
        const vals: boolean[] = []
        for (const sub of subs) vals.push(evaluate(sub, env))
        rows.push({ env, vals })
      }
      const rootIdx = subs.length - 1
      const all = rows.every((r) => r.vals[rootIdx])
      const none = rows.every((r) => !r.vals[rootIdx])
      const classification: "tautology" | "contradiction" | "contingent" = all
        ? "tautology"
        : none
        ? "contradiction"
        : "contingent"
      const numTrue = rows.filter((r) => r.vals[rootIdx]).length
      return { err: null as string | null, ast, vars, subs, rows, rootIdx, classification, numTrue, N }
    } catch (e) {
      return { err: (e as Error).message }
    }
  }, [input])

  return (
    <Card>
      <p className="text-sm text-neutral-400 mb-3">
        <strong className="text-neutral-200">Type a formula.</strong>{" "}
        Variables: lowercase letters.{" "}
        Operators: <code className="font-mono text-teal-300">~</code>{" "}
        <code className="font-mono text-teal-300">&amp;</code>{" "}
        <code className="font-mono text-teal-300">|</code>{" "}
        <code className="font-mono text-teal-300">-&gt;</code>{" "}
        <code className="font-mono text-teal-300">&lt;-&gt;</code>{" "}
        <code className="font-mono text-teal-300">^</code>.
      </p>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full rounded-md border border-neutral-800 bg-neutral-950 px-3 py-2 text-sm font-mono text-neutral-100 focus:border-teal-500 focus:outline-none"
        placeholder="p & ~q | (r -> s)"
      />

      <div className="mt-2 flex flex-wrap gap-1">
        {EXAMPLES.map((e) => (
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
          parse error: {result.err}
        </div>
      ) : (
        <>
          <div className="mt-3 flex items-center gap-2 text-xs font-mono flex-wrap">
            <span
              className={`rounded-md border px-2 py-0.5 ${
                result.classification === "tautology"
                  ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-200"
                  : result.classification === "contradiction"
                  ? "border-rose-500/40 bg-rose-500/10 text-rose-200"
                  : "border-amber-500/40 bg-amber-500/10 text-amber-200"
              }`}
            >
              {result.classification}
            </span>
            <span className="text-neutral-500">
              {result.numTrue} / {result.N} rows true
            </span>
            <span className="text-neutral-500">
              formula: <span className="text-neutral-200">{display(result.ast!)}</span>
            </span>
          </div>

          <div className="mt-3 overflow-x-auto rounded-md border border-neutral-800 bg-neutral-950">
            <table className="w-full text-xs font-mono">
              <thead>
                <tr className="border-b border-neutral-800 bg-neutral-900/50">
                  {result.vars!.map((v) => (
                    <th key={v} className="px-2 py-1 text-teal-300 text-left">
                      {v}
                    </th>
                  ))}
                  {result.subs!.map((s, i) => (
                    <th
                      key={i}
                      className={`px-2 py-1 text-left ${
                        i === result.rootIdx ? "text-amber-300" : "text-violet-300"
                      }`}
                    >
                      {display(s)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {result.rows!.map((row, ri) => (
                  <tr key={ri} className="border-b border-neutral-800/50 last:border-0">
                    {result.vars!.map((v) => (
                      <td key={v} className={`px-2 py-1 ${row.env[v] ? "text-emerald-300" : "text-neutral-500"}`}>
                        {row.env[v] ? "T" : "F"}
                      </td>
                    ))}
                    {row.vals.map((b, bi) => (
                      <td
                        key={bi}
                        className={`px-2 py-1 ${
                          bi === result.rootIdx
                            ? b
                              ? "text-amber-300 font-semibold"
                              : "text-rose-400 font-semibold"
                            : b
                            ? "text-emerald-300"
                            : "text-neutral-500"
                        }`}
                      >
                        {b ? "T" : "F"}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </Card>
  )
}

function ConnectivesTable() {
  return (
    <Card>
      <p className="text-sm text-neutral-400 mb-3">
        The six connectives most often used in propositional logic.
      </p>
      <div className="overflow-x-auto rounded-md border border-neutral-800 bg-neutral-950">
        <table className="w-full text-sm font-mono">
          <thead>
            <tr className="border-b border-neutral-800 bg-neutral-900/50">
              <th className="px-3 py-2 text-left text-neutral-400">name</th>
              <th className="px-3 py-2 text-left text-teal-300">symbol</th>
              <th className="px-3 py-2 text-left text-violet-300">ascii</th>
              <th className="px-3 py-2 text-left text-neutral-400">example</th>
            </tr>
          </thead>
          <tbody>
            {CONNECTIVES.map((c) => (
              <tr key={c.sym} className="border-b border-neutral-800/50 last:border-0">
                <td className="px-3 py-2 text-neutral-300">{c.name}</td>
                <td className="px-3 py-2 text-teal-200 text-lg">{c.sym}</td>
                <td className="px-3 py-2 text-violet-200">{c.ascii}</td>
                <td className="px-3 py-2"><Tex math={c.tex} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-3 rounded-md border border-neutral-800 bg-neutral-950 p-3 text-xs font-mono text-neutral-400">
        <div>Precedence (tightest first): <span className="text-teal-300">¬ &gt; ∧ &gt; ⊕ &gt; ∨ &gt; → &gt; ↔</span></div>
        <div className="mt-1">→ is right-associative: <span className="text-teal-300">p → q → r = p → (q → r)</span>.</div>
      </div>
    </Card>
  )
}

function KeyEquivalences() {
  const laws = [
    { name: "double negation", l: String.raw`\neg\neg p`, r: String.raw`p` },
    { name: "De Morgan", l: String.raw`\neg(p \land q)`, r: String.raw`\neg p \lor \neg q` },
    { name: "De Morgan", l: String.raw`\neg(p \lor q)`, r: String.raw`\neg p \land \neg q` },
    { name: "implication", l: String.raw`p \to q`, r: String.raw`\neg p \lor q` },
    { name: "contrapositive", l: String.raw`p \to q`, r: String.raw`\neg q \to \neg p` },
    { name: "biconditional", l: String.raw`p \leftrightarrow q`, r: String.raw`(p \to q) \land (q \to p)` },
    { name: "distributivity", l: String.raw`p \land (q \lor r)`, r: String.raw`(p \land q) \lor (p \land r)` },
    { name: "distributivity", l: String.raw`p \lor (q \land r)`, r: String.raw`(p \lor q) \land (p \lor r)` },
    { name: "idempotence", l: String.raw`p \land p`, r: String.raw`p` },
    { name: "absorption", l: String.raw`p \lor (p \land q)`, r: String.raw`p` },
    { name: "excluded middle", l: String.raw`p \lor \neg p`, r: String.raw`T` },
    { name: "contradiction", l: String.raw`p \land \neg p`, r: String.raw`F` },
  ]
  return (
    <Card>
      <p className="text-sm text-neutral-400 mb-3">
        Tautological equivalences that let you rewrite formulas.
      </p>
      <div className="grid md:grid-cols-2 gap-2">
        {laws.map((L, i) => (
          <div key={i} className="rounded-md border border-neutral-800 bg-neutral-950 px-3 py-2 flex items-center gap-3">
            <div className="text-xs text-neutral-500 w-28 shrink-0">{L.name}</div>
            <Tex math={L.l} />
            <span className="text-teal-400">≡</span>
            <Tex math={L.r} />
          </div>
        ))}
      </div>
    </Card>
  )
}

export default function TruthTables() {
  return (
    <TopicShell topic={topic}>
      <Section title="Type a formula → get its truth table">
        <TruthTable />
      </Section>
      <Section title="Connective cheat-sheet">
        <ConnectivesTable />
      </Section>
      <Section title="Key tautological equivalences">
        <KeyEquivalences />
      </Section>
    </TopicShell>
  )
}
