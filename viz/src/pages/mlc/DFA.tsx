import { useEffect, useMemo, useState } from "react"
import Tex from "../../components/Tex"
import TopicShell, { Section, Card } from "../../components/TopicShell"
import { TOPICS } from "../../topics"

const topic = TOPICS.find((t) => t.slug === "mlc/dfa")!

type DFA = {
  name: string
  desc: string
  alphabet: string[]
  states: { id: string; pos: [number, number] }[]
  start: string
  accept: string[]
  trans: Record<string, Record<string, string>>
}

const DFAS: DFA[] = [
  {
    name: "Ends in 01",
    desc: "Binary strings that end in the substring '01'.",
    alphabet: ["0", "1"],
    states: [
      { id: "q0", pos: [100, 160] },
      { id: "q1", pos: [250, 80] },
      { id: "q2", pos: [400, 160] },
    ],
    start: "q0",
    accept: ["q2"],
    trans: {
      q0: { "0": "q1", "1": "q0" },
      q1: { "0": "q1", "1": "q2" },
      q2: { "0": "q1", "1": "q0" },
    },
  },
  {
    name: "# 1s is even",
    desc: "Binary strings with an even number of 1s.",
    alphabet: ["0", "1"],
    states: [
      { id: "e", pos: [150, 160] },
      { id: "o", pos: [400, 160] },
    ],
    start: "e",
    accept: ["e"],
    trans: {
      e: { "0": "e", "1": "o" },
      o: { "0": "o", "1": "e" },
    },
  },
  {
    name: "Divisible by 3 (binary)",
    desc: "Binary numbers whose value mod 3 is 0. Track remainder.",
    alphabet: ["0", "1"],
    states: [
      { id: "r0", pos: [100, 80] },
      { id: "r1", pos: [270, 220] },
      { id: "r2", pos: [440, 80] },
    ],
    start: "r0",
    accept: ["r0"],
    trans: {
      // if current value ≡ r and next digit d, new value ≡ (2r + d) mod 3
      r0: { "0": "r0", "1": "r1" },
      r1: { "0": "r2", "1": "r0" },
      r2: { "0": "r1", "1": "r2" },
    },
  },
  {
    name: "Contains 'aba'",
    desc: "Strings over {a,b} that contain substring 'aba'.",
    alphabet: ["a", "b"],
    states: [
      { id: "s0", pos: [80, 160] },
      { id: "s1", pos: [220, 160] },
      { id: "s2", pos: [360, 160] },
      { id: "s3", pos: [500, 160] },
    ],
    start: "s0",
    accept: ["s3"],
    trans: {
      s0: { a: "s1", b: "s0" },
      s1: { a: "s1", b: "s2" },
      s2: { a: "s3", b: "s0" },
      s3: { a: "s3", b: "s3" },
    },
  },
  {
    name: "Starts with a, ends with b",
    desc: "Strings of length ≥ 2 over {a,b} starting with a and ending with b.",
    alphabet: ["a", "b"],
    states: [
      { id: "p0", pos: [80, 160] },
      { id: "p1", pos: [230, 80] },
      { id: "p2", pos: [380, 80] },
      { id: "pd", pos: [230, 240] },
    ],
    start: "p0",
    accept: ["p2"],
    trans: {
      p0: { a: "p1", b: "pd" },
      p1: { a: "p1", b: "p2" },
      p2: { a: "p1", b: "p2" },
      pd: { a: "pd", b: "pd" },
    },
  },
]

function Simulator() {
  const [idx, setIdx] = useState(0)
  const dfa = DFAS[idx]
  const [input, setInput] = useState("0101")
  const [step, setStep] = useState(0)
  const [playing, setPlaying] = useState(false)

  const validInput = useMemo(
    () => [...input].every((c) => dfa.alphabet.includes(c)),
    [input, dfa]
  )

  const trace = useMemo(() => {
    if (!validInput) return null
    const out: { state: string; justRead: string | null }[] = [
      { state: dfa.start, justRead: null },
    ]
    let cur = dfa.start
    for (const c of input) {
      cur = dfa.trans[cur][c]
      out.push({ state: cur, justRead: c })
    }
    return out
  }, [dfa, input, validInput])

  useEffect(() => {
    setStep(0)
    setPlaying(false)
  }, [idx, input])

  useEffect(() => {
    if (!playing || !trace) return
    if (step >= trace.length - 1) {
      setPlaying(false)
      return
    }
    const h = setTimeout(() => setStep((s) => s + 1), 450)
    return () => clearTimeout(h)
  }, [playing, step, trace])

  const currentState = trace ? trace[step].state : dfa.start
  const justRead = trace?.[step]?.justRead ?? null
  const accepted = trace && step === trace.length - 1 && dfa.accept.includes(currentState)

  // compute edges with labels bundled per (from,to)
  const edgeMap = new Map<string, { from: string; to: string; labels: string[] }>()
  for (const from of Object.keys(dfa.trans)) {
    for (const sym of Object.keys(dfa.trans[from])) {
      const to = dfa.trans[from][sym]
      const k = `${from}->${to}`
      if (!edgeMap.has(k)) edgeMap.set(k, { from, to, labels: [] })
      edgeMap.get(k)!.labels.push(sym)
    }
  }

  const W = 580
  const H = 320

  function statePos(id: string): [number, number] {
    const s = dfa.states.find((x) => x.id === id)!
    return s.pos
  }

  return (
    <Card>
      <p className="text-sm text-neutral-400 mb-3">
        <strong className="text-neutral-200">Build a DFA, feed it strings.</strong>{" "}
        The highlighted state is the current one; the blue edge is the
        transition just taken.
      </p>

      <div className="flex flex-wrap gap-1 mb-3">
        {DFAS.map((d, i) => (
          <button
            key={d.name}
            onClick={() => setIdx(i)}
            className={`rounded-md border px-2 py-1 text-xs font-mono ${
              idx === i
                ? "border-teal-500/60 bg-teal-500/20 text-teal-200"
                : "border-neutral-800 text-neutral-400 hover:bg-neutral-900"
            }`}
          >
            {d.name}
          </button>
        ))}
      </div>

      <div className="text-xs text-neutral-500 mb-3">
        alphabet: <span className="text-violet-300 font-mono">{"{" + dfa.alphabet.join(", ") + "}"}</span>{" "}
        · {dfa.desc}
      </div>

      <div className="rounded-md border border-neutral-800 bg-neutral-950 p-2">
        <svg width={W} height={H} className="block mx-auto max-w-full">
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5"
              markerWidth="8" markerHeight="8" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#888" />
            </marker>
            <marker id="arrow-blue" viewBox="0 0 10 10" refX="8" refY="5"
              markerWidth="8" markerHeight="8" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#38bdf8" />
            </marker>
          </defs>

          {/* start arrow */}
          {(() => {
            const [sx, sy] = statePos(dfa.start)
            return (
              <line
                x1={sx - 48} y1={sy} x2={sx - 26} y2={sy}
                stroke="#888" strokeWidth={1.5} markerEnd="url(#arrow)"
              />
            )
          })()}

          {/* edges */}
          {[...edgeMap.values()].map((e) => {
            const [fx, fy] = statePos(e.from)
            const [tx, ty] = statePos(e.to)
            // does the trace step use this exact edge?
            const isActive =
              justRead !== null &&
              trace![step - 1].state === e.from &&
              currentState === e.to &&
              e.labels.includes(justRead)
            if (e.from === e.to) {
              // self loop
              return (
                <g key={`${e.from}->${e.to}`}>
                  <path
                    d={`M ${fx - 16} ${fy - 18} Q ${fx} ${fy - 52} ${fx + 16} ${fy - 18}`}
                    fill="none"
                    stroke={isActive ? "#38bdf8" : "#888"}
                    strokeWidth={isActive ? 2.2 : 1.3}
                    markerEnd={isActive ? "url(#arrow-blue)" : "url(#arrow)"}
                  />
                  <text x={fx} y={fy - 44} fontSize="11" textAnchor="middle"
                    fill={isActive ? "#38bdf8" : "#d4d4d8"} fontFamily="monospace">
                    {e.labels.join(",")}
                  </text>
                </g>
              )
            }
            // curved line
            const midx = (fx + tx) / 2
            const midy = (fy + ty) / 2
            const dx = tx - fx, dy = ty - fy
            const L = Math.hypot(dx, dy)
            const nx = -dy / L, ny = dx / L
            const bend = 18
            const cx = midx + nx * bend, cy = midy + ny * bend
            // shorten to node edge
            const rNode = 24
            const ang1 = Math.atan2(cy - fy, cx - fx)
            const ang2 = Math.atan2(ty - cy, tx - cx)
            const x1 = fx + rNode * Math.cos(ang1), y1 = fy + rNode * Math.sin(ang1)
            const x2 = tx - rNode * Math.cos(ang2), y2 = ty - rNode * Math.sin(ang2)
            return (
              <g key={`${e.from}->${e.to}`}>
                <path
                  d={`M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`}
                  fill="none"
                  stroke={isActive ? "#38bdf8" : "#888"}
                  strokeWidth={isActive ? 2.2 : 1.3}
                  markerEnd={isActive ? "url(#arrow-blue)" : "url(#arrow)"}
                />
                <text x={cx} y={cy - 4} fontSize="11" textAnchor="middle"
                  fill={isActive ? "#38bdf8" : "#d4d4d8"} fontFamily="monospace">
                  {e.labels.join(",")}
                </text>
              </g>
            )
          })}

          {/* states */}
          {dfa.states.map((s) => {
            const isCur = currentState === s.id
            const isAcc = dfa.accept.includes(s.id)
            return (
              <g key={s.id}>
                <circle
                  cx={s.pos[0]} cy={s.pos[1]} r={24}
                  fill={isCur ? "#0f766e" : "#171717"}
                  stroke={isCur ? "#5eead4" : "#525252"}
                  strokeWidth={isCur ? 2 : 1}
                />
                {isAcc && (
                  <circle
                    cx={s.pos[0]} cy={s.pos[1]} r={19}
                    fill="none"
                    stroke={isCur ? "#5eead4" : "#737373"}
                    strokeWidth={1}
                  />
                )}
                <text x={s.pos[0]} y={s.pos[1] + 4} fontSize="11"
                  textAnchor="middle" fill={isCur ? "#f0fdfa" : "#d4d4d8"}
                  fontFamily="monospace">
                  {s.id}
                </text>
              </g>
            )
          })}
        </svg>
      </div>

      <div className="mt-3 flex gap-2 items-center">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`input over {${dfa.alphabet.join(",")}}`}
          className={`flex-1 rounded-md border px-3 py-2 text-sm font-mono ${
            validInput
              ? "border-neutral-800 bg-neutral-950 text-neutral-100"
              : "border-rose-500/50 bg-rose-500/5 text-rose-200"
          }`}
        />
        <button
          onClick={() => { setPlaying(!playing); if (step >= (trace?.length ?? 1) - 1) setStep(0) }}
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

      <div className="mt-3">
        <input
          type="range" min={0} max={trace ? trace.length - 1 : 0} step={1}
          value={step} onChange={(e) => { setStep(+e.target.value); setPlaying(false) }}
          className="w-full"
        />
        <div className="text-[11px] font-mono text-neutral-500 mt-1 flex items-center justify-between">
          <span>
            step {step} / {(trace?.length ?? 1) - 1}
          </span>
          {trace && (
            <span className={accepted ? "text-emerald-300" : step === trace.length - 1 ? "text-rose-300" : "text-amber-300"}>
              {step === trace.length - 1
                ? accepted ? "✓ ACCEPTED" : "✗ REJECTED"
                : "running…"}
            </span>
          )}
        </div>
      </div>

      <div className="mt-3 rounded-md border border-neutral-800 bg-neutral-950 p-3 text-xs font-mono">
        <div className="text-neutral-500 mb-1">tape: read {step} of {input.length}</div>
        <div className="text-sm">
          {[...input].map((c, i) => (
            <span
              key={i}
              className={
                i < step ? "text-neutral-500" :
                i === step ? "text-amber-300 font-semibold underline underline-offset-2" :
                "text-neutral-300"
              }
            >
              {c}
            </span>
          ))}
          {step >= input.length && <span className="text-neutral-600"> ␣ (end)</span>}
        </div>
      </div>
    </Card>
  )
}

function Defn() {
  return (
    <Card>
      <p className="text-sm text-neutral-400 mb-3">
        A deterministic finite automaton is a 5-tuple{" "}
        <Tex math={String.raw`M = (Q, \Sigma, \delta, q_0, F)`} />.
      </p>
      <ul className="space-y-2 text-sm text-neutral-300">
        <li className="flex gap-2">
          <span className="text-teal-400 font-mono w-5">Q</span>
          <span>finite set of states.</span>
        </li>
        <li className="flex gap-2">
          <span className="text-teal-400 font-mono w-5">Σ</span>
          <span>input alphabet.</span>
        </li>
        <li className="flex gap-2">
          <span className="text-teal-400 font-mono w-5">δ</span>
          <span>transition function <Tex math={String.raw`Q \times \Sigma \to Q`} />.</span>
        </li>
        <li className="flex gap-2">
          <span className="text-teal-400 font-mono w-5">q₀</span>
          <span>start state.</span>
        </li>
        <li className="flex gap-2">
          <span className="text-teal-400 font-mono w-5">F</span>
          <span>accepting states <Tex math={String.raw`F \subseteq Q`} />.</span>
        </li>
      </ul>
      <div className="mt-3 text-xs text-neutral-500">
        A string <Tex math="w" /> is <em>accepted</em> iff running δ starting
        from q₀ along w ends in F. The language{" "}
        <Tex math={String.raw`L(M)`} /> is the set of accepted strings.
        Languages recognized by DFAs = <em>regular languages</em>.
      </div>
    </Card>
  )
}

function RegularTricks() {
  return (
    <Card>
      <p className="text-sm text-neutral-400 mb-3">
        <strong className="text-neutral-200">Closure properties.</strong> Regular
        languages are closed under:
      </p>
      <ul className="space-y-2 text-sm text-neutral-300">
        <li className="flex gap-2">
          <span className="text-teal-400 font-mono">·</span>
          <span>union, intersection, complement (product / swap-accept).</span>
        </li>
        <li className="flex gap-2">
          <span className="text-teal-400 font-mono">·</span>
          <span>concatenation, Kleene star (via NFA construction).</span>
        </li>
        <li className="flex gap-2">
          <span className="text-teal-400 font-mono">·</span>
          <span>reversal, homomorphism, inverse homomorphism.</span>
        </li>
        <li className="flex gap-2">
          <span className="text-teal-400 font-mono">·</span>
          <span>
            <strong>Myhill–Nerode:</strong> L is regular ⇔ L has finitely many
            equivalence classes under the indistinguishability relation. The
            minimal DFA has exactly that many states.
          </span>
        </li>
      </ul>
    </Card>
  )
}

export default function DFA() {
  return (
    <TopicShell topic={topic}>
      <Section title="DFA simulator">
        <Simulator />
      </Section>
      <Section title="Formal definition">
        <Defn />
      </Section>
      <Section title="What regular means">
        <RegularTricks />
      </Section>
    </TopicShell>
  )
}
