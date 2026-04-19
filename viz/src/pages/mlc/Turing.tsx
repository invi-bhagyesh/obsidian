import { useEffect, useState } from "react"
import Tex from "../../components/Tex"
import TopicShell, { Section, Card } from "../../components/TopicShell"
import { TOPICS } from "../../topics"

const topic = TOPICS.find((t) => t.slug === "mlc/turing")!

type Dir = "L" | "R" | "S"

type TMRule = {
  state: string
  read: string
  write: string
  move: Dir
  next: string
}

type TM = {
  name: string
  desc: string
  initial: string
  tape: string
  blank: string
  accept: string[]
  reject: string[]
  rules: TMRule[]
}

const BLANK = "_"

function rulesLookup(rules: TMRule[], state: string, read: string): TMRule | null {
  return rules.find((r) => r.state === state && r.read === read) ?? null
}

// TM 1: binary increment. Move right to end, then add 1 with carry, return.
const increment: TM = {
  name: "Binary increment",
  desc: "Read the number left-to-right, add 1 from the least-significant side (right).",
  initial: "walk_right",
  tape: "1011",
  blank: BLANK,
  accept: ["halt"],
  reject: [],
  rules: [
    { state: "walk_right", read: "0", write: "0", move: "R", next: "walk_right" },
    { state: "walk_right", read: "1", write: "1", move: "R", next: "walk_right" },
    { state: "walk_right", read: BLANK, write: BLANK, move: "L", next: "carry" },
    // carry: try to add 1; if see 1 flip to 0 and carry, if see 0 flip to 1 and done
    { state: "carry", read: "0", write: "1", move: "L", next: "done" },
    { state: "carry", read: "1", write: "0", move: "L", next: "carry" },
    { state: "carry", read: BLANK, write: "1", move: "L", next: "done" },
    { state: "done", read: "0", write: "0", move: "S", next: "halt" },
    { state: "done", read: "1", write: "1", move: "S", next: "halt" },
    { state: "done", read: BLANK, write: BLANK, move: "S", next: "halt" },
  ],
}

// TM 2: recognize a^n b^n (n ≥ 0). Cross off an 'a' from left and a 'b' from right repeatedly.
const anbn: TM = {
  name: "Recognize aⁿbⁿ",
  desc: "Cross off matching pairs from both ends. Accept if nothing is left.",
  initial: "start",
  tape: "aaabbb",
  blank: BLANK,
  accept: ["accept"],
  reject: ["reject"],
  rules: [
    { state: "start", read: "a", write: "X", move: "R", next: "find_b" },
    { state: "start", read: "b", write: "b", move: "S", next: "reject" },
    { state: "start", read: "X", write: "X", move: "R", next: "skip_a" },
    { state: "start", read: "Y", write: "Y", move: "R", next: "check_done" },
    { state: "start", read: BLANK, write: BLANK, move: "S", next: "accept" },

    { state: "find_b", read: "a", write: "a", move: "R", next: "find_b" },
    { state: "find_b", read: "Y", write: "Y", move: "R", next: "find_b" },
    { state: "find_b", read: "b", write: "Y", move: "L", next: "back" },
    { state: "find_b", read: BLANK, write: BLANK, move: "S", next: "reject" },

    { state: "back", read: "a", write: "a", move: "L", next: "back" },
    { state: "back", read: "Y", write: "Y", move: "L", next: "back" },
    { state: "back", read: "X", write: "X", move: "R", next: "start" },

    { state: "skip_a", read: "a", write: "a", move: "R", next: "check_only_y" },
    { state: "skip_a", read: "Y", write: "Y", move: "R", next: "check_done" },

    { state: "check_only_y", read: "a", write: "a", move: "R", next: "check_only_y" },
    { state: "check_only_y", read: "Y", write: "Y", move: "R", next: "check_only_y" },
    { state: "check_only_y", read: BLANK, write: BLANK, move: "L", next: "back_to_mark" },
    { state: "check_only_y", read: "b", write: "b", move: "R", next: "reject" },

    { state: "back_to_mark", read: "a", write: "a", move: "L", next: "back_to_mark" },
    { state: "back_to_mark", read: "Y", write: "Y", move: "L", next: "back_to_mark" },
    { state: "back_to_mark", read: "X", write: "X", move: "R", next: "start" },

    { state: "check_done", read: "Y", write: "Y", move: "R", next: "check_done" },
    { state: "check_done", read: BLANK, write: BLANK, move: "S", next: "accept" },
    { state: "check_done", read: "a", write: "a", move: "S", next: "reject" },
    { state: "check_done", read: "b", write: "b", move: "S", next: "reject" },
  ],
}

// TM 3: binary palindrome check — simplified to {a,b}*
const palindrome: TM = {
  name: "Palindrome (over {a,b})",
  desc: "Match first unread character with the last one. Repeat toward the middle.",
  initial: "start",
  tape: "abba",
  blank: BLANK,
  accept: ["accept"],
  reject: ["reject"],
  rules: [
    { state: "start", read: "a", write: "X", move: "R", next: "right_a" },
    { state: "start", read: "b", write: "X", move: "R", next: "right_b" },
    { state: "start", read: BLANK, write: BLANK, move: "S", next: "accept" },
    { state: "start", read: "X", write: "X", move: "R", next: "accept" },

    { state: "right_a", read: "a", write: "a", move: "R", next: "right_a" },
    { state: "right_a", read: "b", write: "b", move: "R", next: "right_a" },
    { state: "right_a", read: "X", write: "X", move: "L", next: "check_a" },
    { state: "right_a", read: BLANK, write: BLANK, move: "L", next: "check_a" },

    { state: "right_b", read: "a", write: "a", move: "R", next: "right_b" },
    { state: "right_b", read: "b", write: "b", move: "R", next: "right_b" },
    { state: "right_b", read: "X", write: "X", move: "L", next: "check_b" },
    { state: "right_b", read: BLANK, write: BLANK, move: "L", next: "check_b" },

    { state: "check_a", read: "a", write: "X", move: "L", next: "back" },
    { state: "check_a", read: "b", write: "b", move: "S", next: "reject" },
    { state: "check_a", read: "X", write: "X", move: "S", next: "accept" },

    { state: "check_b", read: "b", write: "X", move: "L", next: "back" },
    { state: "check_b", read: "a", write: "a", move: "S", next: "reject" },
    { state: "check_b", read: "X", write: "X", move: "S", next: "accept" },

    { state: "back", read: "a", write: "a", move: "L", next: "back" },
    { state: "back", read: "b", write: "b", move: "L", next: "back" },
    { state: "back", read: "X", write: "X", move: "R", next: "start" },
  ],
}

const TMS: TM[] = [increment, anbn, palindrome]

function runTM(tm: TM, input: string, maxSteps = 500) {
  // tape: array; head: index; state: string
  // Pad with blanks on both sides
  let tape: string[] = [...input].map((c) => c)
  let head = 0
  let state = tm.initial
  const history: { tape: string[]; head: number; state: string; note: string }[] = [
    { tape: [...tape], head, state, note: "initial" },
  ]
  for (let step = 0; step < maxSteps; step++) {
    if (tm.accept.includes(state) || tm.reject.includes(state)) break
    while (head < 0) { tape.unshift(BLANK); head++ }
    while (head >= tape.length) tape.push(BLANK)
    const read = tape[head]
    const rule = rulesLookup(tm.rules, state, read)
    if (!rule) {
      history.push({ tape: [...tape], head, state, note: "no rule — halt (reject)" })
      state = tm.reject[0] ?? "halt"
      history.push({ tape: [...tape], head, state, note: "rejected" })
      break
    }
    tape[head] = rule.write
    if (rule.move === "L") head--
    else if (rule.move === "R") head++
    state = rule.next
    history.push({
      tape: [...tape],
      head,
      state,
      note: `δ(${rule.state},${rule.read}) = (${rule.next},${rule.write},${rule.move})`,
    })
  }
  return history
}

function TMSim() {
  const [idx, setIdx] = useState(0)
  const tm = TMS[idx]
  const [input, setInput] = useState(tm.tape)
  const [step, setStep] = useState(0)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    setInput(tm.tape)
    setStep(0)
    setPlaying(false)
  }, [idx, tm])

  const history = runTM(tm, input)

  useEffect(() => {
    if (!playing) return
    if (step >= history.length - 1) { setPlaying(false); return }
    const h = setTimeout(() => setStep((s) => s + 1), 320)
    return () => clearTimeout(h)
  }, [playing, step, history])

  const frame = history[Math.min(step, history.length - 1)]
  const accepted = tm.accept.includes(frame.state)
  const rejected = tm.reject.includes(frame.state)

  // Display tape: center head if possible, show 15 cells on each side
  const width = 21
  const startIdx = Math.max(0, frame.head - Math.floor(width / 2))
  const cells: { c: string; globalIdx: number }[] = []
  for (let i = 0; i < width; i++) {
    const g = startIdx + i
    cells.push({ c: g >= 0 && g < frame.tape.length ? frame.tape[g] : BLANK, globalIdx: g })
  }

  return (
    <Card>
      <p className="text-sm text-neutral-400 mb-3">
        <strong className="text-neutral-200">Turing machine simulator.</strong>{" "}
        The head reads a symbol, writes a symbol, moves left/right/stay, and
        changes state.
      </p>

      <div className="flex flex-wrap gap-1 mb-3">
        {TMS.map((T, i) => (
          <button
            key={T.name}
            onClick={() => setIdx(i)}
            className={`rounded-md border px-2 py-1 text-xs font-mono ${
              idx === i
                ? "border-teal-500/60 bg-teal-500/20 text-teal-200"
                : "border-neutral-800 text-neutral-400 hover:bg-neutral-900"
            }`}
          >
            {T.name}
          </button>
        ))}
      </div>
      <div className="text-xs text-neutral-500 mb-3">{tm.desc}</div>

      <div className="flex items-center gap-2 mb-3">
        <input
          value={input}
          onChange={(e) => { setInput(e.target.value); setStep(0); setPlaying(false) }}
          className="flex-1 rounded-md border border-neutral-800 bg-neutral-950 px-3 py-2 text-sm font-mono text-neutral-100"
        />
        <button
          onClick={() => { setPlaying(!playing); if (step >= history.length - 1) setStep(0) }}
          className="rounded-md border border-teal-500/60 bg-teal-500/20 text-teal-200 px-3 py-1.5 text-xs font-mono"
        >
          {playing ? "pause" : "play"}
        </button>
        <button
          onClick={() => { setStep(0); setPlaying(false) }}
          className="rounded-md border border-neutral-700 text-neutral-400 px-3 py-1.5 text-xs font-mono hover:bg-neutral-900"
        >
          reset
        </button>
      </div>

      <div className="rounded-md border border-neutral-800 bg-neutral-950 p-3">
        <div className="flex items-center justify-center gap-0">
          {cells.map((c, i) => {
            const isHead = c.globalIdx === frame.head
            return (
              <div
                key={i}
                className={`w-7 h-9 border ${
                  isHead
                    ? "border-amber-400 bg-amber-500/20 text-amber-200"
                    : "border-neutral-800 bg-neutral-900 text-neutral-300"
                } flex items-center justify-center font-mono text-sm -ml-px`}
              >
                {c.c === BLANK ? <span className="text-neutral-600">␣</span> : c.c}
              </div>
            )
          })}
        </div>
        <div className="flex items-center justify-center mt-1">
          {cells.map((c, i) => (
            <div key={i} className="w-7 text-center -ml-px">
              {c.globalIdx === frame.head ? (
                <div className="text-amber-400 text-xs font-mono">▲</div>
              ) : null}
            </div>
          ))}
        </div>

        <div className="mt-3 flex items-center justify-between">
          <div className="text-xs font-mono text-neutral-400">
            state: <span className={
              accepted ? "text-emerald-300" : rejected ? "text-rose-300" : "text-teal-300"
            }>{frame.state}</span>
          </div>
          <div className="text-xs font-mono text-neutral-500">step {step} / {history.length - 1}</div>
        </div>

        <div className="mt-2 text-[11px] text-neutral-500 font-mono">{frame.note}</div>

        <input type="range" min={0} max={history.length - 1} step={1}
          value={step} onChange={(e) => { setStep(+e.target.value); setPlaying(false) }}
          className="w-full mt-2" />

        {(accepted || rejected) && step === history.length - 1 && (
          <div className={`mt-2 inline-block rounded-md border px-2 py-0.5 text-xs font-mono ${
            accepted
              ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-200"
              : "border-rose-500/40 bg-rose-500/10 text-rose-200"
          }`}>
            {accepted ? "✓ ACCEPTED" : "✗ REJECTED"}
          </div>
        )}
      </div>
    </Card>
  )
}

function Defn() {
  return (
    <Card>
      <p className="text-sm text-neutral-400 mb-3">
        A (deterministic) Turing machine is a 7-tuple{" "}
        <Tex math={String.raw`M = (Q, \Sigma, \Gamma, \delta, q_0, q_{\text{acc}}, q_{\text{rej}})`} />.
      </p>
      <ul className="space-y-2 text-sm text-neutral-300">
        <li className="flex gap-2"><span className="text-teal-400 font-mono w-5">Q</span><span>states.</span></li>
        <li className="flex gap-2"><span className="text-teal-400 font-mono w-5">Σ</span><span>input alphabet (no blank).</span></li>
        <li className="flex gap-2"><span className="text-teal-400 font-mono w-5">Γ</span><span>tape alphabet <Tex math={String.raw`\Sigma \cup \{\_\} \subseteq \Gamma`} />.</span></li>
        <li className="flex gap-2">
          <span className="text-teal-400 font-mono w-5">δ</span>
          <span>
            <Tex math={String.raw`Q \times \Gamma \to Q \times \Gamma \times \{L, R, S\}`} />
            {" "}— read → (next state, write, move).
          </span>
        </li>
        <li className="flex gap-2"><span className="text-teal-400 font-mono w-5">q₀</span><span>start state.</span></li>
        <li className="flex gap-2"><span className="text-teal-400 font-mono w-5">q_a</span><span>accept state (halting).</span></li>
        <li className="flex gap-2"><span className="text-teal-400 font-mono w-5">q_r</span><span>reject state (halting).</span></li>
      </ul>
      <div className="mt-3 text-xs text-neutral-500">
        The language <Tex math={String.raw`L(M)`} /> is the set of inputs on
        which M halts in <Tex math="q_a" />. A language accepted by some TM is{" "}
        <em>recursively enumerable</em>. If M <em>always halts</em>,{" "}
        <Tex math={String.raw`L(M)`} /> is <em>decidable</em> (recursive).
      </div>
    </Card>
  )
}

function UTMandHalting() {
  return (
    <Card>
      <p className="text-sm text-neutral-400 mb-3">
        <strong className="text-neutral-200">
          Universal TM & the halting problem.
        </strong>
      </p>
      <ul className="space-y-3 text-sm text-neutral-300">
        <li className="flex gap-2">
          <span className="text-teal-400 font-mono">·</span>
          <span>
            <strong>Universal TM (U):</strong> a fixed machine that takes{" "}
            <Tex math={String.raw`\langle M, x \rangle`} /> (an encoded
            description of M and its input) and simulates M on x. Like an
            interpreter for TM code.
          </span>
        </li>
        <li className="flex gap-2">
          <span className="text-teal-400 font-mono">·</span>
          <span>
            <strong>Halting problem HALT</strong> ={" "}
            <Tex math={String.raw`\{\langle M, x \rangle : M \text{ halts on } x\}`} />.
            Is there a TM that decides HALT? No — HALT is undecidable.
          </span>
        </li>
        <li className="flex gap-2">
          <span className="text-teal-400 font-mono">·</span>
          <span>
            <strong>Diagonal argument.</strong> Suppose <Tex math="H" /> decides HALT. Build{" "}
            <Tex math="D" />: on input{" "}
            <Tex math={String.raw`\langle M \rangle`} />,{" "}
            D runs <Tex math={String.raw`H(\langle M, \langle M\rangle\rangle)`} />. If H says yes (M halts on its own code), D loops; if no, D halts.
            Now ask what D does on <Tex math={String.raw`\langle D\rangle`} /> — either case is a contradiction.
          </span>
        </li>
        <li className="flex gap-2">
          <span className="text-teal-400 font-mono">·</span>
          <span>
            <strong>Rice's theorem.</strong> Every non-trivial semantic
            property of TMs is undecidable. "Does M accept the empty string?"
            "Is L(M) finite?" All undecidable.
          </span>
        </li>
        <li className="flex gap-2">
          <span className="text-teal-400 font-mono">·</span>
          <span>
            <strong>Church–Turing thesis.</strong> Anything effectively
            computable is TM-computable. Lambda calculus, register machines,
            and modern computers are all equivalent in computational power.
          </span>
        </li>
      </ul>
    </Card>
  )
}

export default function Turing() {
  return (
    <TopicShell topic={topic}>
      <Section title="Tape simulator">
        <TMSim />
      </Section>
      <Section title="Formal definition">
        <Defn />
      </Section>
      <Section title="Universal TM & halting problem">
        <UTMandHalting />
      </Section>
    </TopicShell>
  )
}
