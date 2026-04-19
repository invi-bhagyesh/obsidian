import { useMemo, useState } from "react"
import Tex from "../../components/Tex"
import TopicShell, { Section, Card } from "../../components/TopicShell"
import { TOPICS } from "../../topics"

const topic = TOPICS.find((t) => t.slug === "mlc/fol")!

// FOL AST:
// term: var | const | fn(args)
// formula: pred | eq | not | and | or | imp | iff | forall | exists
type Term =
  | { t: "var"; name: string }
  | { t: "const"; name: string }
  | { t: "fn"; name: string; args: Term[] }

type Formula =
  | { t: "pred"; name: string; args: Term[] }
  | { t: "eq"; l: Term; r: Term }
  | { t: "not"; x: Formula }
  | { t: "and"; x: Formula; y: Formula }
  | { t: "or"; x: Formula; y: Formula }
  | { t: "imp"; x: Formula; y: Formula }
  | { t: "iff"; x: Formula; y: Formula }
  | { t: "forall"; v: string; x: Formula }
  | { t: "exists"; v: string; x: Formula }

// A tiny universe of examples (no parser — curated)

type Ex = {
  id: string
  label: string
  plain: string
  tex: string
  f: Formula
  notes: string[]
}

function mkForall(v: string, x: Formula): Formula { return { t: "forall", v, x } }
function mkExists(v: string, x: Formula): Formula { return { t: "exists", v, x } }
function mkImp(x: Formula, y: Formula): Formula { return { t: "imp", x, y } }
function mkPred(name: string, ...args: Term[]): Formula { return { t: "pred", name, args } }
function vr(name: string): Term { return { t: "var", name } }

const EXAMPLES: Ex[] = [
  {
    id: "drinker",
    label: "Drinker paradox",
    plain: "∃x. (P(x) → ∀y. P(y))",
    tex: String.raw`\exists x.\, (P(x) \to \forall y.\, P(y))`,
    f: mkExists("x", mkImp(mkPred("P", vr("x")), mkForall("y", mkPred("P", vr("y"))))),
    notes: [
      "In any non-empty bar there is some person x such that, if x is drinking, everyone is drinking.",
      "Free vars: none. All variables bound.",
      "Both quantifier orders matter — swapping ∃x/∀y gives a different statement.",
    ],
  },
  {
    id: "shadowing",
    label: "Variable shadowing",
    plain: "∀x. (P(x) → ∃x. Q(x))",
    tex: String.raw`\forall x.\, (P(x) \to \exists x.\, Q(x))`,
    f: mkForall("x", mkImp(mkPred("P", vr("x")), mkExists("x", mkPred("Q", vr("x"))))),
    notes: [
      "The inner ∃x shadows the outer ∀x — the x in Q(x) is bound by the ∃.",
      "Scope is lexical: the innermost enclosing binder wins.",
      "This is legal but confusing. Rename to ∀x. (P(x) → ∃y. Q(y)) for clarity.",
    ],
  },
  {
    id: "infin",
    label: "Infinitude",
    plain: "∀x. ∃y. (y > x)",
    tex: String.raw`\forall x.\, \exists y.\, (y > x)`,
    f: mkForall("x", mkExists("y", mkPred(">", vr("y"), vr("x")))),
    notes: [
      "For every x there is a y bigger. Swapping quantifiers gives ∃y. ∀x. y > x — a single y bigger than all x.",
      "Order of quantifiers is essential.",
    ],
  },
  {
    id: "capture",
    label: "Naïve substitution captures",
    plain: "Substitute y for x in ∀y. (x = y)",
    tex: String.raw`\forall y.\, (x = y)[x := y]`,
    f: mkForall("y", { t: "eq", l: vr("x"), r: vr("y") }),
    notes: [
      "Original formula has free x, says 'x equals every y'.",
      "Naïve [x := y] would give ∀y. (y = y) — a tautology. That changes meaning!",
      "Fix: rename bound y to z first → ∀z. (x = z), then [x := y] → ∀z. (y = z). Safe.",
    ],
  },
  {
    id: "quant-commute",
    label: "∀ and ∃ don't commute",
    plain: "∃y. ∀x. R(x,y)  vs  ∀x. ∃y. R(x,y)",
    tex: String.raw`\exists y.\,\forall x.\, R(x,y) \;\Rightarrow\; \forall x.\,\exists y.\, R(x,y)`,
    f: mkImp(
      mkExists("y", mkForall("x", mkPred("R", vr("x"), vr("y")))),
      mkForall("x", mkExists("y", mkPred("R", vr("x"), vr("y"))))
    ),
    notes: [
      "Right-to-left direction fails in general. The single y depends on x in ∀x. ∃y., but not in ∃y. ∀x.",
      "Example: R(x, y) = 'y > x'. Then ∀x. ∃y. R(x, y) holds (successor), but ∃y. ∀x. R(x, y) fails (no largest).",
    ],
  },
  {
    id: "demorgan",
    label: "De Morgan for quantifiers",
    plain: "¬∀x. P(x) ≡ ∃x. ¬P(x)",
    tex: String.raw`\neg \forall x.\, P(x) \equiv \exists x.\, \neg P(x)`,
    f: { t: "iff", x: { t: "not", x: mkForall("x", mkPred("P", vr("x"))) },
         y: mkExists("x", { t: "not", x: mkPred("P", vr("x")) }) },
    notes: [
      "Dual rule: ¬∃x. P(x) ≡ ∀x. ¬P(x).",
      "Push negations past quantifiers by flipping ∀ ↔ ∃.",
    ],
  },
]

// free variables
function freeVarsTerm(t: Term, bound: Set<string>, out: Set<string>) {
  if (t.t === "var") { if (!bound.has(t.name)) out.add(t.name) }
  else if (t.t === "const") return
  else t.args.forEach((a) => freeVarsTerm(a, bound, out))
}

function freeVars(f: Formula, bound: Set<string> = new Set(), out: Set<string> = new Set()): Set<string> {
  switch (f.t) {
    case "pred": f.args.forEach((t) => freeVarsTerm(t, bound, out)); return out
    case "eq": freeVarsTerm(f.l, bound, out); freeVarsTerm(f.r, bound, out); return out
    case "not": return freeVars(f.x, bound, out)
    case "and": case "or": case "imp": case "iff":
      freeVars(f.x, bound, out); freeVars(f.y, bound, out); return out
    case "forall": case "exists": {
      const b = new Set(bound); b.add(f.v); return freeVars(f.x, b, out)
    }
  }
}

// compute scope: for each variable occurrence in the rendered formula, which binder binds it? None = free.
type Occurrence = { name: string; kind: "binder" | "free" | "bound"; binderIndex: number | null }

// Instead of parsing rendered text, walk the AST producing spans with annotations.
type Span = { text: string; occ?: Occurrence }

function termSpans(t: Term, binders: { v: string; index: number }[]): Span[] {
  if (t.t === "var") {
    const bind = [...binders].reverse().find((b) => b.v === t.name)
    return [{
      text: t.name,
      occ: bind
        ? { name: t.name, kind: "bound", binderIndex: bind.index }
        : { name: t.name, kind: "free", binderIndex: null },
    }]
  }
  if (t.t === "const") return [{ text: t.name }]
  const out: Span[] = [{ text: `${t.name}(` }]
  t.args.forEach((a, i) => {
    if (i > 0) out.push({ text: ", " })
    out.push(...termSpans(a, binders))
  })
  out.push({ text: ")" })
  return out
}

function formulaSpans(
  f: Formula,
  binders: { v: string; index: number }[],
  binderCounter: { c: number },
  p = 0,
): Span[] {
  switch (f.t) {
    case "pred": {
      const out: Span[] = []
      if (["=", "<", ">", "≤", "≥", "∈"].includes(f.name) && f.args.length === 2) {
        out.push(...termSpans(f.args[0], binders))
        out.push({ text: ` ${f.name} ` })
        out.push(...termSpans(f.args[1], binders))
        return out
      }
      out.push({ text: `${f.name}(` })
      f.args.forEach((a, i) => {
        if (i > 0) out.push({ text: ", " })
        out.push(...termSpans(a, binders))
      })
      out.push({ text: ")" })
      return out
    }
    case "eq": {
      return [
        ...termSpans(f.l, binders),
        { text: " = " },
        ...termSpans(f.r, binders),
      ]
    }
    case "not":
      return [{ text: "¬" }, ...formulaSpans(f.x, binders, binderCounter, 5)]
    case "and": case "or": case "imp": case "iff": {
      const symMap = { and: " ∧ ", or: " ∨ ", imp: " → ", iff: " ↔ " }
      const prMap = { and: 4, or: 2, imp: 1, iff: 0 }
      const q = prMap[f.t]
      const inner: Span[] = [
        ...formulaSpans(f.x, binders, binderCounter, q + (f.t === "imp" ? 0 : 1)),
        { text: symMap[f.t] },
        ...formulaSpans(f.y, binders, binderCounter, q + (f.t === "and" || f.t === "or" ? 0 : 0)),
      ]
      if (p > q) return [{ text: "(" }, ...inner, { text: ")" }]
      return inner
    }
    case "forall": case "exists": {
      const idx = binderCounter.c
      binderCounter.c++
      const sym = f.t === "forall" ? "∀" : "∃"
      const out: Span[] = [
        { text: sym },
        { text: f.v, occ: { name: f.v, kind: "binder", binderIndex: idx } },
        { text: ". " },
      ]
      out.push(...formulaSpans(f.x, [...binders, { v: f.v, index: idx }], binderCounter, 0))
      return out
    }
  }
}

const BINDER_COLORS = [
  "text-teal-300",
  "text-violet-300",
  "text-amber-300",
  "text-rose-300",
  "text-sky-300",
  "text-emerald-300",
]

function ScopeViewer() {
  const [id, setId] = useState(EXAMPLES[0].id)
  const ex = EXAMPLES.find((e) => e.id === id)!

  const spans = useMemo(() => {
    const counter = { c: 0 }
    return formulaSpans(ex.f, [], counter)
  }, [ex])

  const free = useMemo(() => [...freeVars(ex.f)].sort(), [ex])

  return (
    <Card>
      <p className="text-sm text-neutral-400 mb-3">
        <strong className="text-neutral-200">Scope & binding.</strong> Each
        quantifier gets a color; variable occurrences are colored by the binder
        they belong to. Black = free.
      </p>

      <div className="flex flex-wrap gap-1 mb-3">
        {EXAMPLES.map((E) => (
          <button
            key={E.id}
            onClick={() => setId(E.id)}
            className={`rounded-md border px-2 py-1 text-xs font-mono ${
              id === E.id
                ? "border-teal-500/60 bg-teal-500/20 text-teal-200"
                : "border-neutral-800 text-neutral-400 hover:bg-neutral-900"
            }`}
          >
            {E.label}
          </button>
        ))}
      </div>

      <div className="rounded-md border border-neutral-800 bg-neutral-950 p-4">
        <div className="text-[11px] text-neutral-500 font-mono mb-1">LaTeX:</div>
        <div className="mb-3"><Tex math={ex.tex} /></div>

        <div className="text-[11px] text-neutral-500 font-mono mb-1">spanned:</div>
        <div className="text-sm font-mono flex flex-wrap">
          {spans.map((s, i) => {
            if (!s.occ) {
              return <span key={i} className="text-neutral-300">{s.text}</span>
            }
            const color = s.occ.binderIndex !== null
              ? BINDER_COLORS[s.occ.binderIndex % BINDER_COLORS.length]
              : "text-neutral-100"
            const decor =
              s.occ.kind === "binder" ? "underline underline-offset-2 font-semibold"
              : s.occ.kind === "free" ? "underline decoration-rose-500 decoration-2 underline-offset-2" : ""
            return (
              <span key={i} className={`${color} ${decor}`}>{s.text}</span>
            )
          })}
        </div>

        <div className="mt-3 text-xs font-mono">
          <span className="text-neutral-500">free variables: </span>
          {free.length === 0 ? (
            <span className="text-emerald-300">(none — closed formula / sentence)</span>
          ) : (
            <span className="text-rose-300">{free.join(", ")}</span>
          )}
        </div>
      </div>

      <ul className="mt-3 space-y-2 text-xs text-neutral-400">
        {ex.notes.map((n, i) => (
          <li key={i} className="flex gap-2">
            <span className="text-teal-400 font-mono">·</span>
            <span>{n}</span>
          </li>
        ))}
      </ul>
    </Card>
  )
}

function SubstitutionGame() {
  // Formula: ∀y. (x = y). Substitute x := t. Show both naive and safe.
  const [t, setT] = useState("z")
  const original = String.raw`\forall y.\, (x = y)`
  // naive: free to become bound
  const captured = t === "y"
  const naive = `∀y. (${t} = y)`
  const safeRename = `∀z. (${t} = z)`

  return (
    <Card>
      <p className="text-sm text-neutral-400 mb-3">
        <strong className="text-neutral-200">Capture-avoiding substitution.</strong>{" "}
        Substitute <Tex math={String.raw`x := t`} /> in{" "}
        <Tex math={original} />.
      </p>

      <div className="flex items-center gap-3 mb-3">
        <label className="text-xs font-mono text-neutral-400">t =</label>
        <select
          value={t}
          onChange={(e) => setT(e.target.value)}
          className="rounded-md border border-neutral-800 bg-neutral-950 px-2 py-1 text-xs font-mono text-neutral-200"
        >
          {["z", "w", "y", "f(y)", "c"].map((v) => (
            <option key={v} value={v}>{v}</option>
          ))}
        </select>
      </div>

      <div className="grid md:grid-cols-2 gap-3">
        <div className={`rounded-md border p-3 ${
          captured ? "border-rose-500/50 bg-rose-500/5" : "border-neutral-800 bg-neutral-950"
        }`}>
          <div className="text-xs font-mono text-neutral-500 mb-1">naïve substitution</div>
          <div className={`text-sm font-mono ${captured ? "text-rose-200" : "text-neutral-200"}`}>
            {naive}
          </div>
          {captured && (
            <div className="text-xs text-rose-300 mt-2">
              ⚠ <strong>variable capture.</strong> The free y in t got
              accidentally bound by ∀y — meaning changed.
            </div>
          )}
        </div>

        <div className="rounded-md border border-emerald-500/40 bg-emerald-500/5 p-3">
          <div className="text-xs font-mono text-neutral-500 mb-1">
            safe: α-rename bound var first
          </div>
          <div className="text-sm font-mono text-emerald-200">{safeRename}</div>
          <div className="text-xs text-emerald-300 mt-2">
            Rename ∀y to ∀z (a fresh name), then substitute. No capture.
          </div>
        </div>
      </div>

      <div className="mt-3 text-xs text-neutral-500">
        Rule of thumb: before substituting t for x, rename any bound variable
        that equals a free variable of t.
      </div>
    </Card>
  )
}

function RulesCard() {
  return (
    <Card>
      <p className="text-sm text-neutral-400 mb-3">
        <strong className="text-neutral-200">Quantifier rules.</strong>
      </p>
      <ul className="space-y-2 text-sm text-neutral-300">
        <li className="flex gap-2">
          <span className="text-teal-400 font-mono">·</span>
          <span>
            <strong>∀-I:</strong> from <Tex math={String.raw`\varphi(x)`} /> (with
            x arbitrary, not free in assumptions), infer{" "}
            <Tex math={String.raw`\forall x.\, \varphi(x)`} />.
          </span>
        </li>
        <li className="flex gap-2">
          <span className="text-teal-400 font-mono">·</span>
          <span>
            <strong>∀-E:</strong> from <Tex math={String.raw`\forall x.\, \varphi(x)`} />,
            infer <Tex math={String.raw`\varphi(t)`} /> for any term t (capture-avoiding).
          </span>
        </li>
        <li className="flex gap-2">
          <span className="text-teal-400 font-mono">·</span>
          <span>
            <strong>∃-I:</strong> from <Tex math={String.raw`\varphi(t)`} />,
            infer <Tex math={String.raw`\exists x.\, \varphi(x)`} />.
          </span>
        </li>
        <li className="flex gap-2">
          <span className="text-teal-400 font-mono">·</span>
          <span>
            <strong>∃-E:</strong> from <Tex math={String.raw`\exists x.\, \varphi(x)`} /> and{" "}
            <Tex math={String.raw`[\varphi(a)] \vdots \chi`} /> (a fresh), infer{" "}
            <Tex math={String.raw`\chi`} />.
          </span>
        </li>
        <li className="flex gap-2">
          <span className="text-teal-400 font-mono">·</span>
          <span>
            <strong>Duality:</strong> <Tex math={String.raw`\neg\forall x.\, \varphi \equiv \exists x.\, \neg\varphi`} />,{" "}
            <Tex math={String.raw`\neg\exists x.\, \varphi \equiv \forall x.\, \neg\varphi`} />.
          </span>
        </li>
      </ul>
    </Card>
  )
}

export default function FOL() {
  return (
    <TopicShell topic={topic}>
      <Section title="Scope, free vs bound variables">
        <ScopeViewer />
      </Section>
      <Section title="Capture-avoiding substitution">
        <SubstitutionGame />
      </Section>
      <Section title="Quantifier inference rules">
        <RulesCard />
      </Section>
    </TopicShell>
  )
}
