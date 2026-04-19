import { useState } from "react"
import Tex from "../../components/Tex"
import TopicShell, { Section, Card } from "../../components/TopicShell"
import { TOPICS } from "../../topics"

const topic = TOPICS.find((t) => t.slug === "mlc/modus-ponens")!

type Axiom = { name: string; tex: string; plain: string }

const AXIOMS: Axiom[] = [
  {
    name: "A1",
    tex: String.raw`\varphi \to (\psi \to \varphi)`,
    plain: "φ → (ψ → φ)",
  },
  {
    name: "A2",
    tex: String.raw`(\varphi \to (\psi \to \chi)) \to ((\varphi \to \psi) \to (\varphi \to \chi))`,
    plain: "(φ → (ψ → χ)) → ((φ → ψ) → (φ → χ))",
  },
  {
    name: "A3",
    tex: String.raw`(\neg\psi \to \neg\varphi) \to ((\neg\psi \to \varphi) \to \psi)`,
    plain: "(¬ψ → ¬φ) → ((¬ψ → φ) → ψ)",
  },
]

type Line = { i: number; claim: string; tex: string; just: string; note?: string }

type Theorem = { name: string; goal: string; lines: Line[]; commentary: string }

const THEOREMS: Theorem[] = [
  {
    name: "φ → φ (reflexivity of →)",
    goal: String.raw`\varphi \to \varphi`,
    lines: [
      {
        i: 1,
        claim: "φ → ((φ → φ) → φ)",
        tex: String.raw`\varphi \to ((\varphi \to \varphi) \to \varphi)`,
        just: "A1 with ψ := (φ → φ)",
      },
      {
        i: 2,
        claim: "(φ → ((φ → φ) → φ)) → ((φ → (φ → φ)) → (φ → φ))",
        tex: String.raw`(\varphi \to ((\varphi \to \varphi) \to \varphi)) \to ((\varphi \to (\varphi \to \varphi)) \to (\varphi \to \varphi))`,
        just: "A2 with ψ := (φ → φ), χ := φ",
      },
      {
        i: 3,
        claim: "(φ → (φ → φ)) → (φ → φ)",
        tex: String.raw`(\varphi \to (\varphi \to \varphi)) \to (\varphi \to \varphi)`,
        just: "MP 1, 2",
      },
      {
        i: 4,
        claim: "φ → (φ → φ)",
        tex: String.raw`\varphi \to (\varphi \to \varphi)`,
        just: "A1 with ψ := φ",
      },
      {
        i: 5,
        claim: "φ → φ",
        tex: String.raw`\varphi \to \varphi`,
        just: "MP 4, 3",
      },
    ],
    commentary:
      "Five lines to prove the trivial-looking φ → φ. This is why natural deduction was invented.",
  },
  {
    name: "Hypothetical syllogism: (φ → ψ), (ψ → χ) ⊢ φ → χ (sketch via Deduction Theorem)",
    goal: String.raw`\varphi \to \chi`,
    lines: [
      {
        i: 1,
        claim: "φ → ψ",
        tex: String.raw`\varphi \to \psi`,
        just: "hypothesis",
      },
      {
        i: 2,
        claim: "ψ → χ",
        tex: String.raw`\psi \to \chi`,
        just: "hypothesis",
      },
      {
        i: 3,
        claim: "φ",
        tex: String.raw`\varphi`,
        just: "temporary assumption (discharge at end)",
      },
      {
        i: 4,
        claim: "ψ",
        tex: String.raw`\psi`,
        just: "MP 3, 1",
      },
      {
        i: 5,
        claim: "χ",
        tex: String.raw`\chi`,
        just: "MP 4, 2",
      },
      {
        i: 6,
        claim: "φ → χ",
        tex: String.raw`\varphi \to \chi`,
        just: "Deduction Theorem, discharge φ (line 3)",
      },
    ],
    commentary:
      "The Deduction Theorem (metatheorem) says: if Γ, φ ⊢ ψ, then Γ ⊢ φ → ψ. It saves us from unfolding into pure A1/A2/A3/MP.",
  },
  {
    name: "Double negation intro: φ ⊢ ¬¬φ (via A3)",
    goal: String.raw`\neg\neg\varphi`,
    lines: [
      {
        i: 1,
        claim: "φ",
        tex: String.raw`\varphi`,
        just: "hypothesis",
      },
      {
        i: 2,
        claim: "φ → (¬¬¬φ → φ)",
        tex: String.raw`\varphi \to (\neg\neg\neg\varphi \to \varphi)`,
        just: "A1 with ψ := ¬¬¬φ",
      },
      {
        i: 3,
        claim: "¬¬¬φ → φ",
        tex: String.raw`\neg\neg\neg\varphi \to \varphi`,
        just: "MP 1, 2",
      },
      {
        i: 4,
        claim: "¬¬¬φ → ¬φ",
        tex: String.raw`\neg\neg\neg\varphi \to \neg\varphi`,
        just: "DN₃ (pre-proved lemma)",
      },
      {
        i: 5,
        claim: "(¬¬¬φ → ¬φ) → ((¬¬¬φ → φ) → ¬¬φ)",
        tex: String.raw`(\neg\neg\neg\varphi \to \neg\varphi) \to ((\neg\neg\neg\varphi \to \varphi) \to \neg\neg\varphi)`,
        just: "A3 with ψ := ¬¬φ",
      },
      {
        i: 6,
        claim: "(¬¬¬φ → φ) → ¬¬φ",
        tex: String.raw`(\neg\neg\neg\varphi \to \varphi) \to \neg\neg\varphi`,
        just: "MP 4, 5",
      },
      {
        i: 7,
        claim: "¬¬φ",
        tex: String.raw`\neg\neg\varphi`,
        just: "MP 3, 6",
      },
    ],
    commentary:
      "Even double-negation introduction requires machinery via A3. Axiomatic systems trade intuition for uniformity.",
  },
  {
    name: "Absorption: (φ → (ψ → χ)), φ → ψ ⊢ φ → χ",
    goal: String.raw`\varphi \to \chi`,
    lines: [
      {
        i: 1,
        claim: "φ → (ψ → χ)",
        tex: String.raw`\varphi \to (\psi \to \chi)`,
        just: "hypothesis",
      },
      {
        i: 2,
        claim: "φ → ψ",
        tex: String.raw`\varphi \to \psi`,
        just: "hypothesis",
      },
      {
        i: 3,
        claim: "(φ → (ψ → χ)) → ((φ → ψ) → (φ → χ))",
        tex: String.raw`(\varphi \to (\psi \to \chi)) \to ((\varphi \to \psi) \to (\varphi \to \chi))`,
        just: "A2 instance",
      },
      {
        i: 4,
        claim: "(φ → ψ) → (φ → χ)",
        tex: String.raw`(\varphi \to \psi) \to (\varphi \to \chi)`,
        just: "MP 1, 3",
      },
      {
        i: 5,
        claim: "φ → χ",
        tex: String.raw`\varphi \to \chi`,
        just: "MP 2, 4",
      },
    ],
    commentary: "A2 literally says: distribute → over → . This is its textbook use.",
  },
]

function TheoremWalker() {
  const [idx, setIdx] = useState(0)
  const [step, setStep] = useState(THEOREMS[0].lines.length)
  const T = THEOREMS[idx]

  return (
    <Card>
      <p className="text-sm text-neutral-400 mb-3">
        <strong className="text-neutral-200">Hilbert-style proofs.</strong>{" "}
        Only axioms and <em>modus ponens</em> (MP): from{" "}
        <Tex math={String.raw`\varphi`} /> and <Tex math={String.raw`\varphi \to \psi`} />,
        infer <Tex math={String.raw`\psi`} />.
      </p>

      <div className="flex flex-wrap gap-1 mb-3">
        {THEOREMS.map((Th, i) => (
          <button
            key={Th.name}
            onClick={() => { setIdx(i); setStep(Th.lines.length) }}
            className={`rounded-md border px-2 py-1 text-xs font-mono ${
              idx === i
                ? "border-teal-500/60 bg-teal-500/20 text-teal-200"
                : "border-neutral-800 text-neutral-400 hover:bg-neutral-900"
            }`}
          >
            {Th.name}
          </button>
        ))}
      </div>

      <div className="rounded-md border border-neutral-800 bg-neutral-950 p-3">
        <div className="flex items-baseline gap-3 mb-2">
          <span className="text-xs font-mono text-neutral-500">goal:</span>
          <Tex math={T.goal} />
        </div>

        <input
          type="range" min={1} max={T.lines.length} step={1}
          value={step} onChange={(e) => setStep(+e.target.value)}
          className="w-full"
        />
        <div className="text-xs font-mono text-neutral-500 mt-1 mb-2">
          step {step} / {T.lines.length}
        </div>

        <div className="space-y-1.5 font-mono text-xs">
          {T.lines.slice(0, step).map((L) => (
            <div
              key={L.i}
              className={`grid grid-cols-[2ch_1fr_auto] gap-3 items-center py-0.5 ${
                L.i === step ? "text-amber-300" : "text-neutral-300"
              }`}
            >
              <div className="text-neutral-500 text-right">{L.i}.</div>
              <div>
                <Tex math={L.tex} />
              </div>
              <div className="text-[10px] text-neutral-500 whitespace-nowrap">
                {L.just}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3 text-xs text-neutral-500">{T.commentary}</div>
    </Card>
  )
}

function AxiomCard() {
  return (
    <Card>
      <p className="text-sm text-neutral-400 mb-3">
        <strong className="text-neutral-200">
          Łukasiewicz / Church axiom system.
        </strong>{" "}
        Three axiom schemata + modus ponens, complete for classical propositional
        logic. Each schema stands for <em>all</em> instances obtained by
        substituting formulas for the metavariables.
      </p>
      <div className="space-y-2">
        {AXIOMS.map((a) => (
          <div
            key={a.name}
            className="rounded-md border border-neutral-800 bg-neutral-950 p-3 flex items-baseline gap-3"
          >
            <span className="rounded-md border border-teal-500/40 bg-teal-500/10 text-teal-200 px-2 py-0.5 text-xs font-mono">
              {a.name}
            </span>
            <Tex math={a.tex} />
          </div>
        ))}
      </div>

      <div className="mt-3 rounded-md border border-amber-500/30 bg-amber-500/5 px-3 py-2 text-xs font-mono">
        <div className="text-amber-200">Modus ponens (MP)</div>
        <div className="text-neutral-300 mt-1">
          from <Tex math={String.raw`\varphi`} /> and{" "}
          <Tex math={String.raw`\varphi \to \psi`} /> infer{" "}
          <Tex math={String.raw`\psi`} />.
        </div>
      </div>
    </Card>
  )
}

function Meta() {
  return (
    <Card>
      <p className="text-sm text-neutral-400 mb-3">
        <strong className="text-neutral-200">Metatheorems.</strong>
      </p>
      <ul className="space-y-2 text-sm text-neutral-300">
        <li className="flex gap-2">
          <span className="text-teal-400 font-mono">·</span>
          <span>
            <strong>Deduction theorem:</strong> if{" "}
            <Tex math={String.raw`\Gamma, \varphi \vdash \psi`} />, then{" "}
            <Tex math={String.raw`\Gamma \vdash \varphi \to \psi`} />. Lets us
            simulate natural deduction's →-I inside a Hilbert system.
          </span>
        </li>
        <li className="flex gap-2">
          <span className="text-teal-400 font-mono">·</span>
          <span>
            <strong>Soundness:</strong>{" "}
            <Tex math={String.raw`\vdash \varphi \Rightarrow \models \varphi`} />.
            Check: all three axioms are tautologies, MP preserves tautologies.
          </span>
        </li>
        <li className="flex gap-2">
          <span className="text-teal-400 font-mono">·</span>
          <span>
            <strong>Completeness (Gödel/Kalmár):</strong>{" "}
            <Tex math={String.raw`\models \varphi \Rightarrow \vdash \varphi`} />.
            Every tautology has a Hilbert-style proof.
          </span>
        </li>
        <li className="flex gap-2">
          <span className="text-teal-400 font-mono">·</span>
          <span>
            <strong>Why only →, ¬?</strong> Other connectives are definable:{" "}
            <Tex math={String.raw`\varphi \lor \psi := \neg\varphi \to \psi`} />,{" "}
            <Tex math={String.raw`\varphi \land \psi := \neg(\varphi \to \neg\psi)`} />.
          </span>
        </li>
        <li className="flex gap-2">
          <span className="text-teal-400 font-mono">·</span>
          <span>
            Hilbert systems are <em>concise to define</em> but awkward to use —
            good for metatheory, bad for human proofs.
          </span>
        </li>
      </ul>
    </Card>
  )
}

export default function ModusPonens() {
  return (
    <TopicShell topic={topic}>
      <Section title="Axioms & modus ponens">
        <AxiomCard />
      </Section>
      <Section title="Walk theorems line by line">
        <TheoremWalker />
      </Section>
      <Section title="Metatheorems">
        <Meta />
      </Section>
    </TopicShell>
  )
}
