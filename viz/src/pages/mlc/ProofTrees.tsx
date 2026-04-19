import { useState } from "react"
import Tex from "../../components/Tex"
import TopicShell, { Section, Card } from "../../components/TopicShell"
import { TOPICS } from "../../topics"

const topic = TOPICS.find((t) => t.slug === "mlc/proof-trees")!

// Natural deduction rules reference

type Rule = {
  name: string
  intro: boolean
  premises: string[]
  conclusion: string
  note?: string
}

const RULES: Rule[] = [
  { name: "∧-I", intro: true, premises: [String.raw`\varphi`, String.raw`\psi`], conclusion: String.raw`\varphi \land \psi` },
  { name: "∧-E₁", intro: false, premises: [String.raw`\varphi \land \psi`], conclusion: String.raw`\varphi` },
  { name: "∧-E₂", intro: false, premises: [String.raw`\varphi \land \psi`], conclusion: String.raw`\psi` },
  { name: "∨-I₁", intro: true, premises: [String.raw`\varphi`], conclusion: String.raw`\varphi \lor \psi` },
  { name: "∨-I₂", intro: true, premises: [String.raw`\psi`], conclusion: String.raw`\varphi \lor \psi` },
  {
    name: "∨-E", intro: false,
    premises: [String.raw`\varphi \lor \psi`, String.raw`\varphi \Rightarrow \chi`, String.raw`\psi \Rightarrow \chi`],
    conclusion: String.raw`\chi`,
    note: "(case analysis — discharge assumption in each branch)"
  },
  {
    name: "→-I", intro: true,
    premises: [String.raw`[\varphi] \vdots \psi`],
    conclusion: String.raw`\varphi \to \psi`,
    note: "(discharge assumption φ)"
  },
  { name: "→-E (MP)", intro: false, premises: [String.raw`\varphi`, String.raw`\varphi \to \psi`], conclusion: String.raw`\psi` },
  { name: "¬-I", intro: true, premises: [String.raw`[\varphi] \vdots \bot`], conclusion: String.raw`\neg\varphi` },
  { name: "¬-E", intro: false, premises: [String.raw`\varphi`, String.raw`\neg\varphi`], conclusion: String.raw`\bot` },
  { name: "⊥-E (ex falso)", intro: false, premises: [String.raw`\bot`], conclusion: String.raw`\varphi` },
  {
    name: "RAA", intro: false,
    premises: [String.raw`[\neg\varphi] \vdots \bot`],
    conclusion: String.raw`\varphi`,
    note: "(proof by contradiction — classical only)"
  },
]

type Step = { i: number; claim: string; rule: string; from: number[] }

const PROOFS: { name: string; goal: string; assumptions: string[]; steps: Step[]; note: string }[] = [
  {
    name: "MP composition",
    goal: String.raw`r`,
    assumptions: ["p", "p → q", "q → r"],
    steps: [
      { i: 1, claim: "p", rule: "assumption", from: [] },
      { i: 2, claim: "p → q", rule: "assumption", from: [] },
      { i: 3, claim: "q → r", rule: "assumption", from: [] },
      { i: 4, claim: "q", rule: "→-E", from: [1, 2] },
      { i: 5, claim: "r", rule: "→-E", from: [4, 3] },
    ],
    note: "Chain modus ponens twice.",
  },
  {
    name: "Commutativity of ∧",
    goal: String.raw`q \land p`,
    assumptions: ["p ∧ q"],
    steps: [
      { i: 1, claim: "p ∧ q", rule: "assumption", from: [] },
      { i: 2, claim: "p", rule: "∧-E₁", from: [1] },
      { i: 3, claim: "q", rule: "∧-E₂", from: [1] },
      { i: 4, claim: "q ∧ p", rule: "∧-I", from: [3, 2] },
    ],
    note: "Project both conjuncts, reassemble in the other order.",
  },
  {
    name: "Contrapositive",
    goal: String.raw`\neg q \to \neg p`,
    assumptions: ["p → q"],
    steps: [
      { i: 1, claim: "p → q", rule: "assumption", from: [] },
      { i: 2, claim: "¬q", rule: "assume for →-I (discharge later)", from: [] },
      { i: 3, claim: "p", rule: "assume for ¬-I (discharge later)", from: [] },
      { i: 4, claim: "q", rule: "→-E", from: [3, 1] },
      { i: 5, claim: "⊥", rule: "¬-E", from: [4, 2] },
      { i: 6, claim: "¬p", rule: "¬-I, discharge p (line 3)", from: [3, 5] },
      { i: 7, claim: "¬q → ¬p", rule: "→-I, discharge ¬q (line 2)", from: [2, 6] },
    ],
    note: "Two nested hypothetical assumptions.",
  },
  {
    name: "Excluded middle (classical)",
    goal: String.raw`p \lor \neg p`,
    assumptions: [],
    steps: [
      { i: 1, claim: "¬(p ∨ ¬p)", rule: "assume for RAA", from: [] },
      { i: 2, claim: "p", rule: "assume for ¬-I", from: [] },
      { i: 3, claim: "p ∨ ¬p", rule: "∨-I₁", from: [2] },
      { i: 4, claim: "⊥", rule: "¬-E", from: [3, 1] },
      { i: 5, claim: "¬p", rule: "¬-I, discharge p (line 2)", from: [2, 4] },
      { i: 6, claim: "p ∨ ¬p", rule: "∨-I₂", from: [5] },
      { i: 7, claim: "⊥", rule: "¬-E", from: [6, 1] },
      { i: 8, claim: "p ∨ ¬p", rule: "RAA, discharge ¬(p∨¬p) (line 1)", from: [1, 7] },
    ],
    note: "Classical logic: the double negation lets you flip ¬(p ∨ ¬p) into p ∨ ¬p.",
  },
  {
    name: "De Morgan: ¬(p ∧ q) ⊢ ¬p ∨ ¬q (classical)",
    goal: String.raw`\neg p \lor \neg q`,
    assumptions: ["¬(p ∧ q)"],
    steps: [
      { i: 1, claim: "¬(p ∧ q)", rule: "assumption", from: [] },
      { i: 2, claim: "¬(¬p ∨ ¬q)", rule: "assume for RAA", from: [] },
      { i: 3, claim: "¬p", rule: "assume for ¬-I", from: [] },
      { i: 4, claim: "¬p ∨ ¬q", rule: "∨-I₁", from: [3] },
      { i: 5, claim: "⊥", rule: "¬-E", from: [4, 2] },
      { i: 6, claim: "p", rule: "RAA, discharge ¬p (line 3)", from: [3, 5] },
      { i: 7, claim: "¬q", rule: "assume for ¬-I", from: [] },
      { i: 8, claim: "¬p ∨ ¬q", rule: "∨-I₂", from: [7] },
      { i: 9, claim: "⊥", rule: "¬-E", from: [8, 2] },
      { i: 10, claim: "q", rule: "RAA, discharge ¬q (line 7)", from: [7, 9] },
      { i: 11, claim: "p ∧ q", rule: "∧-I", from: [6, 10] },
      { i: 12, claim: "⊥", rule: "¬-E", from: [11, 1] },
      { i: 13, claim: "¬p ∨ ¬q", rule: "RAA, discharge ¬(¬p∨¬q) (line 2)", from: [2, 12] },
    ],
    note: "Classical proof: multiple nested RAAs. Intuitionistically, this direction fails.",
  },
  {
    name: "Currying: p ∧ q → r ⊢ p → (q → r)",
    goal: String.raw`p \to (q \to r)`,
    assumptions: ["(p ∧ q) → r"],
    steps: [
      { i: 1, claim: "(p ∧ q) → r", rule: "assumption", from: [] },
      { i: 2, claim: "p", rule: "assume for →-I", from: [] },
      { i: 3, claim: "q", rule: "assume for →-I", from: [] },
      { i: 4, claim: "p ∧ q", rule: "∧-I", from: [2, 3] },
      { i: 5, claim: "r", rule: "→-E", from: [4, 1] },
      { i: 6, claim: "q → r", rule: "→-I, discharge q (line 3)", from: [3, 5] },
      { i: 7, claim: "p → (q → r)", rule: "→-I, discharge p (line 2)", from: [2, 6] },
    ],
    note: "Isomorphism of function spaces: A×B → C ≡ A → (B → C).",
  },
]

function ProofViewer() {
  const [idx, setIdx] = useState(0)
  const [step, setStep] = useState(PROOFS[0].steps.length)
  const proof = PROOFS[idx]

  return (
    <Card>
      <p className="text-sm text-neutral-400 mb-3">
        <strong className="text-neutral-200">Walk through proofs step by step.</strong>{" "}
        Pick a theorem; slide through the derivation.
      </p>

      <div className="flex flex-wrap gap-1 mb-3">
        {PROOFS.map((P, i) => (
          <button
            key={P.name}
            onClick={() => { setIdx(i); setStep(P.steps.length) }}
            className={`rounded-md border px-2 py-1 text-xs font-mono ${
              idx === i
                ? "border-teal-500/60 bg-teal-500/20 text-teal-200"
                : "border-neutral-800 text-neutral-400 hover:bg-neutral-900"
            }`}
          >
            {P.name}
          </button>
        ))}
      </div>

      <div className="rounded-md border border-neutral-800 bg-neutral-950 p-3">
        <div className="flex items-baseline gap-3 mb-2">
          <span className="text-xs font-mono text-neutral-500">goal:</span>
          <Tex math={proof.goal} />
          <span className="text-xs text-neutral-500 ml-auto">
            {proof.assumptions.length
              ? <>assuming <span className="font-mono text-teal-300">{proof.assumptions.join(", ")}</span></>
              : "no assumptions"}
          </span>
        </div>

        <div className="mb-2">
          <input
            type="range" min={1} max={proof.steps.length} step={1}
            value={step} onChange={(e) => setStep(+e.target.value)}
            className="w-full"
          />
          <div className="text-xs font-mono text-neutral-500 mt-1">
            step {step} / {proof.steps.length}
          </div>
        </div>

        <div className="space-y-1 font-mono text-xs">
          {proof.steps.slice(0, step).map((s) => (
            <div
              key={s.i}
              className={`grid grid-cols-[2ch_1fr_auto] gap-3 items-center py-0.5 ${
                s.i === step ? "text-amber-300" : "text-neutral-300"
              }`}
            >
              <div className="text-neutral-500 text-right">{s.i}.</div>
              <div>{s.claim}</div>
              <div className="text-[10px] text-neutral-500">
                {s.rule}
                {s.from.length ? ` [${s.from.join(", ")}]` : ""}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3 text-xs text-neutral-500">{proof.note}</div>
    </Card>
  )
}

function RulesList() {
  return (
    <Card>
      <p className="text-sm text-neutral-400 mb-3">
        Every connective has an <strong className="text-teal-300">introduction</strong>{" "}
        rule (how to prove it) and an{" "}
        <strong className="text-amber-300">elimination</strong> rule (how to
        use it).
      </p>

      <div className="grid md:grid-cols-2 gap-2">
        {RULES.map((r) => (
          <div
            key={r.name}
            className="rounded-md border border-neutral-800 bg-neutral-950 p-3"
          >
            <div className="flex items-center gap-2 mb-2">
              <span
                className={`rounded-md border px-2 py-0.5 text-xs font-mono ${
                  r.intro
                    ? "border-teal-500/40 bg-teal-500/10 text-teal-200"
                    : "border-amber-500/40 bg-amber-500/10 text-amber-200"
                }`}
              >
                {r.name}
              </span>
              {r.note && (
                <span className="text-[10px] text-neutral-500">{r.note}</span>
              )}
            </div>
            <div className="flex flex-col items-center py-1">
              <div className="flex gap-4 items-center text-sm">
                {r.premises.map((p, i) => (
                  <span key={i}><Tex math={p} /></span>
                ))}
              </div>
              <div className="border-t border-neutral-600 w-full my-1" />
              <div className="text-sm">
                <Tex math={r.conclusion} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}

function BigPicture() {
  return (
    <Card>
      <p className="text-sm text-neutral-400 mb-3">
        <strong className="text-neutral-200">Why natural deduction?</strong>
      </p>
      <ul className="space-y-2 text-sm text-neutral-300">
        <li className="flex gap-2">
          <span className="text-teal-400 font-mono">·</span>
          <span>
            Mimics real mathematical reasoning: assume, derive, discharge.
          </span>
        </li>
        <li className="flex gap-2">
          <span className="text-teal-400 font-mono">·</span>
          <span>
            <strong>Soundness:</strong> provable formulas are tautologies.
          </span>
        </li>
        <li className="flex gap-2">
          <span className="text-teal-400 font-mono">·</span>
          <span>
            <strong>Completeness:</strong> every tautology has a proof.
          </span>
        </li>
        <li className="flex gap-2">
          <span className="text-teal-400 font-mono">·</span>
          <span>
            <strong>Curry–Howard.</strong> Each intro rule is a constructor, each
            elim rule is an eliminator. Proofs = typed lambda terms.
          </span>
        </li>
        <li className="flex gap-2">
          <span className="text-teal-400 font-mono">·</span>
          <span>
            Removing RAA gives <strong>intuitionistic</strong> logic — no
            excluded middle, no double-negation elimination.
          </span>
        </li>
      </ul>
    </Card>
  )
}

export default function ProofTrees() {
  return (
    <TopicShell topic={topic}>
      <Section title="Walk through proofs">
        <ProofViewer />
      </Section>
      <Section title="Inference rules">
        <RulesList />
      </Section>
      <Section title="Natural deduction in one breath">
        <BigPicture />
      </Section>
    </TopicShell>
  )
}
