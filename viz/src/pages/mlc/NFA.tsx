import { useMemo, useState } from "react"
import Tex from "../../components/Tex"
import TopicShell, { Section, Card } from "../../components/TopicShell"
import { TOPICS } from "../../topics"

const topic = TOPICS.find((t) => t.slug === "mlc/nfa")!

type NFA = {
  name: string
  desc: string
  alphabet: string[]
  states: string[]
  pos: Record<string, [number, number]>
  start: string
  accept: string[]
  // transitions include "ε" for epsilon
  trans: { from: string; sym: string; to: string }[]
}

const NFAS: NFA[] = [
  {
    name: "Ends in 01",
    desc: "Nondeterministically guesses when '01' begins.",
    alphabet: ["0", "1"],
    states: ["q0", "q1", "q2"],
    pos: { q0: [100, 160], q1: [270, 160], q2: [440, 160] },
    start: "q0",
    accept: ["q2"],
    trans: [
      { from: "q0", sym: "0", to: "q0" },
      { from: "q0", sym: "1", to: "q0" },
      { from: "q0", sym: "0", to: "q1" },
      { from: "q1", sym: "1", to: "q2" },
    ],
  },
  {
    name: "Contains 00 or 11",
    desc: "Two branches (one per substring), joined only at start.",
    alphabet: ["0", "1"],
    states: ["s", "a0", "a00", "b1", "b11"],
    pos: {
      s: [80, 160],
      a0: [230, 80], a00: [400, 80],
      b1: [230, 240], b11: [400, 240],
    },
    start: "s",
    accept: ["a00", "b11"],
    trans: [
      { from: "s", sym: "0", to: "s" },
      { from: "s", sym: "1", to: "s" },
      { from: "s", sym: "0", to: "a0" },
      { from: "a0", sym: "0", to: "a00" },
      { from: "a00", sym: "0", to: "a00" },
      { from: "a00", sym: "1", to: "a00" },
      { from: "s", sym: "1", to: "b1" },
      { from: "b1", sym: "1", to: "b11" },
      { from: "b11", sym: "0", to: "b11" },
      { from: "b11", sym: "1", to: "b11" },
    ],
  },
  {
    name: "ε-NFA: a*b*",
    desc: "Epsilon jump from a-loop to b-loop.",
    alphabet: ["a", "b"],
    states: ["p", "q"],
    pos: { p: [180, 160], q: [420, 160] },
    start: "p",
    accept: ["q"],
    trans: [
      { from: "p", sym: "a", to: "p" },
      { from: "p", sym: "ε", to: "q" },
      { from: "q", sym: "b", to: "q" },
    ],
  },
  {
    name: "3rd-to-last is 1",
    desc: "Classic exponential blow-up case: NFA has 4 states; minimal DFA has 8.",
    alphabet: ["0", "1"],
    states: ["r0", "r1", "r2", "r3"],
    pos: { r0: [80, 160], r1: [220, 160], r2: [360, 160], r3: [500, 160] },
    start: "r0",
    accept: ["r3"],
    trans: [
      { from: "r0", sym: "0", to: "r0" },
      { from: "r0", sym: "1", to: "r0" },
      { from: "r0", sym: "1", to: "r1" },
      { from: "r1", sym: "0", to: "r2" },
      { from: "r1", sym: "1", to: "r2" },
      { from: "r2", sym: "0", to: "r3" },
      { from: "r2", sym: "1", to: "r3" },
    ],
  },
]

// epsilon closure of a set of states
function epsilonClose(nfa: NFA, set: Set<string>): Set<string> {
  const out = new Set(set)
  const stack = [...set]
  while (stack.length) {
    const s = stack.pop()!
    for (const tr of nfa.trans) {
      if (tr.from === s && tr.sym === "ε" && !out.has(tr.to)) {
        out.add(tr.to)
        stack.push(tr.to)
      }
    }
  }
  return out
}

// move = union of δ(s, sym) for s in set, then epsilon-closure
function move(nfa: NFA, set: Set<string>, sym: string): Set<string> {
  const out = new Set<string>()
  for (const s of set) {
    for (const tr of nfa.trans) {
      if (tr.from === s && tr.sym === sym) out.add(tr.to)
    }
  }
  return epsilonClose(nfa, out)
}

// subset construction → list of DFA states (as sorted state-sets), transitions, accept set
function subsetConstruction(nfa: NFA): {
  states: string[][] // sorted state ids
  labels: string[]   // "{q0,q1}"
  start: number
  accept: number[]
  trans: Record<number, Record<string, number>>
} {
  const startSet = epsilonClose(nfa, new Set([nfa.start]))
  const sortKey = (s: Set<string>) => [...s].sort().join(",")
  const idx = new Map<string, number>()
  const states: string[][] = []
  const enqueue = (s: Set<string>) => {
    const k = sortKey(s)
    if (idx.has(k)) return idx.get(k)!
    idx.set(k, states.length)
    states.push([...s].sort())
    return states.length - 1
  }
  enqueue(startSet)
  const trans: Record<number, Record<string, number>> = {}
  let head = 0
  while (head < states.length) {
    const cur = new Set(states[head])
    trans[head] = {}
    for (const sym of nfa.alphabet) {
      const dst = move(nfa, cur, sym)
      trans[head][sym] = enqueue(dst)
    }
    head++
  }
  const accept: number[] = states
    .map((ss, i) => ({ ss, i }))
    .filter(({ ss }) => ss.some((s) => nfa.accept.includes(s)))
    .map(({ i }) => i)
  const labels = states.map((ss) => ss.length ? `{${ss.join(",")}}` : "∅")
  return { states, labels, start: 0, accept, trans }
}

function NFAView({ nfa, highlight }: { nfa: NFA; highlight: Set<string> }) {
  const W = 580
  const H = 320

  const edgeMap = new Map<string, { from: string; to: string; labels: string[] }>()
  for (const e of nfa.trans) {
    const k = `${e.from}->${e.to}`
    if (!edgeMap.has(k)) edgeMap.set(k, { from: e.from, to: e.to, labels: [] })
    edgeMap.get(k)!.labels.push(e.sym)
  }

  return (
    <svg width={W} height={H} className="block mx-auto max-w-full">
      <defs>
        <marker id="arrow2" viewBox="0 0 10 10" refX="8" refY="5"
          markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#888" />
        </marker>
      </defs>
      {(() => {
        const [sx, sy] = nfa.pos[nfa.start]
        return (
          <line x1={sx - 48} y1={sy} x2={sx - 26} y2={sy}
            stroke="#888" strokeWidth={1.5} markerEnd="url(#arrow2)" />
        )
      })()}
      {[...edgeMap.values()].map((e) => {
        const [fx, fy] = nfa.pos[e.from]
        const [tx, ty] = nfa.pos[e.to]
        const isEps = e.labels.includes("ε")
        const label = e.labels.join(",")
        if (e.from === e.to) {
          return (
            <g key={`${e.from}->${e.to}`}>
              <path
                d={`M ${fx - 16} ${fy - 18} Q ${fx} ${fy - 52} ${fx + 16} ${fy - 18}`}
                fill="none" stroke={isEps ? "#a855f7" : "#888"} strokeWidth={1.3}
                markerEnd="url(#arrow2)"
              />
              <text x={fx} y={fy - 44} fontSize="11" textAnchor="middle"
                fill={isEps ? "#a855f7" : "#d4d4d8"} fontFamily="monospace">{label}</text>
            </g>
          )
        }
        const midx = (fx + tx) / 2
        const midy = (fy + ty) / 2
        const dx = tx - fx, dy = ty - fy
        const L = Math.hypot(dx, dy)
        const nx = -dy / L, ny = dx / L
        const bend = 20
        const cx = midx + nx * bend, cy = midy + ny * bend
        const rNode = 22
        const ang1 = Math.atan2(cy - fy, cx - fx)
        const ang2 = Math.atan2(ty - cy, tx - cx)
        const x1 = fx + rNode * Math.cos(ang1), y1 = fy + rNode * Math.sin(ang1)
        const x2 = tx - rNode * Math.cos(ang2), y2 = ty - rNode * Math.sin(ang2)
        return (
          <g key={`${e.from}->${e.to}`}>
            <path
              d={`M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`}
              fill="none" stroke={isEps ? "#a855f7" : "#888"} strokeWidth={1.3}
              markerEnd="url(#arrow2)"
            />
            <text x={cx} y={cy - 4} fontSize="11" textAnchor="middle"
              fill={isEps ? "#a855f7" : "#d4d4d8"} fontFamily="monospace">{label}</text>
          </g>
        )
      })}
      {nfa.states.map((s) => {
        const [x, y] = nfa.pos[s]
        const on = highlight.has(s)
        const isAcc = nfa.accept.includes(s)
        return (
          <g key={s}>
            <circle cx={x} cy={y} r={22}
              fill={on ? "#0f766e" : "#171717"}
              stroke={on ? "#5eead4" : "#525252"}
              strokeWidth={on ? 2 : 1}
            />
            {isAcc && (
              <circle cx={x} cy={y} r={17} fill="none"
                stroke={on ? "#5eead4" : "#737373"} strokeWidth={1} />
            )}
            <text x={x} y={y + 4} fontSize="10" textAnchor="middle"
              fill={on ? "#f0fdfa" : "#d4d4d8"} fontFamily="monospace">{s}</text>
          </g>
        )
      })}
    </svg>
  )
}

function NFASim() {
  const [idx, setIdx] = useState(0)
  const [input, setInput] = useState("0101")
  const nfa = NFAS[idx]

  const validInput = [...input].every((c) => nfa.alphabet.includes(c))

  const trace = useMemo(() => {
    if (!validInput) return null
    const steps: Set<string>[] = [epsilonClose(nfa, new Set([nfa.start]))]
    let cur = steps[0]
    for (const c of input) {
      cur = move(nfa, cur, c)
      steps.push(cur)
    }
    return steps
  }, [nfa, input, validInput])

  const [step, setStep] = useState(0)
  const current = trace ? trace[Math.min(step, trace.length - 1)] : new Set<string>()
  const accepted = trace && step === trace.length - 1
    ? [...current].some((s) => nfa.accept.includes(s))
    : null

  return (
    <Card>
      <p className="text-sm text-neutral-400 mb-3">
        <strong className="text-neutral-200">NFA simulator.</strong> Multiple
        states can be active at once — the machine accepts if <em>any</em>{" "}
        branch ends in F. Purple edges are <Tex math="\varepsilon" /> (free)
        transitions.
      </p>

      <div className="flex flex-wrap gap-1 mb-3">
        {NFAS.map((n, i) => (
          <button
            key={n.name}
            onClick={() => { setIdx(i); setStep(0) }}
            className={`rounded-md border px-2 py-1 text-xs font-mono ${
              idx === i
                ? "border-teal-500/60 bg-teal-500/20 text-teal-200"
                : "border-neutral-800 text-neutral-400 hover:bg-neutral-900"
            }`}
          >
            {n.name}
          </button>
        ))}
      </div>
      <div className="text-xs text-neutral-500 mb-3">{nfa.desc}</div>

      <div className="rounded-md border border-neutral-800 bg-neutral-950 p-2">
        <NFAView nfa={nfa} highlight={current} />
      </div>

      <div className="mt-3 flex gap-2 items-center">
        <input
          value={input}
          onChange={(e) => { setInput(e.target.value); setStep(0) }}
          className={`flex-1 rounded-md border px-3 py-2 text-sm font-mono ${
            validInput ? "border-neutral-800 bg-neutral-950 text-neutral-100"
              : "border-rose-500/50 bg-rose-500/5 text-rose-200"
          }`}
        />
      </div>

      {trace && (
        <>
          <div className="mt-2">
            <input
              type="range" min={0} max={trace.length - 1} step={1}
              value={step} onChange={(e) => setStep(+e.target.value)}
              className="w-full"
            />
            <div className="text-[11px] font-mono text-neutral-500 mt-1 flex items-center justify-between">
              <span>step {step} / {trace.length - 1}</span>
              {step === trace.length - 1 && (
                <span className={accepted ? "text-emerald-300" : "text-rose-300"}>
                  {accepted ? "✓ ACCEPTED" : "✗ REJECTED"}
                </span>
              )}
            </div>
          </div>
          <div className="mt-2 text-xs font-mono text-neutral-400">
            active set: <span className="text-teal-300">
              {"{" + [...current].sort().join(", ") + "}"}
            </span>
          </div>
        </>
      )}
    </Card>
  )
}

function SubsetConstruction() {
  const [idx, setIdx] = useState(0)
  const nfa = NFAS[idx]
  const dfa = useMemo(() => subsetConstruction(nfa), [nfa])

  // layout DFA states in a grid
  const cols = Math.min(4, Math.ceil(Math.sqrt(dfa.states.length)))
  const rows = Math.ceil(dfa.states.length / cols)
  const W = 600
  const H = Math.max(240, rows * 110)
  const nodePos = (i: number): [number, number] => {
    const r = Math.floor(i / cols)
    const c = i % cols
    return [80 + c * ((W - 160) / Math.max(1, cols - 1) || 0), 60 + r * 100]
  }

  const edgeMap = new Map<string, { from: number; to: number; labels: string[] }>()
  for (const [fromStr, row] of Object.entries(dfa.trans)) {
    const from = +fromStr
    for (const [sym, to] of Object.entries(row)) {
      const k = `${from}->${to}`
      if (!edgeMap.has(k)) edgeMap.set(k, { from, to, labels: [] })
      edgeMap.get(k)!.labels.push(sym)
    }
  }

  return (
    <Card>
      <p className="text-sm text-neutral-400 mb-3">
        <strong className="text-neutral-200">Subset construction.</strong>{" "}
        States of the DFA are{" "}
        <em>sets</em> of NFA states. Start: ε-closure of <Tex math="q_0" />.
        Transition: <Tex math={String.raw`\delta(S, a) = \bigcup_{s \in S} \delta(s, a)`} />,
        then ε-close.
      </p>

      <div className="flex flex-wrap gap-1 mb-3">
        {NFAS.map((n, i) => (
          <button
            key={n.name}
            onClick={() => setIdx(i)}
            className={`rounded-md border px-2 py-1 text-xs font-mono ${
              idx === i
                ? "border-teal-500/60 bg-teal-500/20 text-teal-200"
                : "border-neutral-800 text-neutral-400 hover:bg-neutral-900"
            }`}
          >
            {n.name}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-[1fr_1fr] gap-3">
        <div className="rounded-md border border-neutral-800 bg-neutral-950 p-2">
          <div className="text-xs text-neutral-500 px-2 pt-1 font-mono">original NFA</div>
          <NFAView nfa={nfa} highlight={new Set()} />
        </div>
        <div className="rounded-md border border-neutral-800 bg-neutral-950 p-2">
          <div className="text-xs text-neutral-500 px-2 pt-1 font-mono">
            equivalent DFA ({dfa.states.length} states)
          </div>
          <svg width={W} height={H} className="block mx-auto max-w-full">
            <defs>
              <marker id="arrow3" viewBox="0 0 10 10" refX="8" refY="5"
                markerWidth="8" markerHeight="8" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#888" />
              </marker>
            </defs>
            {[...edgeMap.values()].map((e) => {
              const [fx, fy] = nodePos(e.from)
              const [tx, ty] = nodePos(e.to)
              if (e.from === e.to) {
                return (
                  <g key={`${e.from}->${e.to}`}>
                    <path
                      d={`M ${fx - 16} ${fy - 22} Q ${fx} ${fy - 54} ${fx + 16} ${fy - 22}`}
                      fill="none" stroke="#888" strokeWidth={1.3} markerEnd="url(#arrow3)" />
                    <text x={fx} y={fy - 46} fontSize="10" textAnchor="middle"
                      fill="#d4d4d8" fontFamily="monospace">{e.labels.join(",")}</text>
                  </g>
                )
              }
              const midx = (fx + tx) / 2, midy = (fy + ty) / 2
              const dx = tx - fx, dy = ty - fy
              const L = Math.hypot(dx, dy)
              const nx = -dy / L, ny = dx / L
              const cx = midx + nx * 18, cy = midy + ny * 18
              const r = 26
              const ang1 = Math.atan2(cy - fy, cx - fx)
              const ang2 = Math.atan2(ty - cy, tx - cx)
              const x1 = fx + r * Math.cos(ang1), y1 = fy + r * Math.sin(ang1)
              const x2 = tx - r * Math.cos(ang2), y2 = ty - r * Math.sin(ang2)
              return (
                <g key={`${e.from}->${e.to}`}>
                  <path d={`M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`}
                    fill="none" stroke="#888" strokeWidth={1.3} markerEnd="url(#arrow3)" />
                  <text x={cx} y={cy - 4} fontSize="10" textAnchor="middle"
                    fill="#d4d4d8" fontFamily="monospace">{e.labels.join(",")}</text>
                </g>
              )
            })}
            {dfa.states.map((_, i) => {
              const [x, y] = nodePos(i)
              const isAcc = dfa.accept.includes(i)
              const isStart = i === dfa.start
              return (
                <g key={i}>
                  <ellipse cx={x} cy={y} rx={28} ry={18}
                    fill={isStart ? "#1e3a3a" : "#171717"}
                    stroke={isStart ? "#5eead4" : "#525252"}
                    strokeWidth={isStart ? 2 : 1}
                  />
                  {isAcc && (
                    <ellipse cx={x} cy={y} rx={24} ry={14} fill="none"
                      stroke="#737373" strokeWidth={1} />
                  )}
                  <text x={x} y={y + 3} fontSize="9" textAnchor="middle"
                    fill="#d4d4d8" fontFamily="monospace">{dfa.labels[i]}</text>
                </g>
              )
            })}
          </svg>
        </div>
      </div>

      <div className="mt-3 overflow-x-auto rounded-md border border-neutral-800 bg-neutral-950">
        <table className="w-full text-xs font-mono">
          <thead>
            <tr className="border-b border-neutral-800 bg-neutral-900/50">
              <th className="px-3 py-2 text-left text-teal-300">subset</th>
              {nfa.alphabet.map((a) => (
                <th key={a} className="px-3 py-2 text-left text-violet-300">δ(·, {a})</th>
              ))}
              <th className="px-3 py-2 text-left text-amber-300">accepting?</th>
            </tr>
          </thead>
          <tbody>
            {dfa.states.map((_, i) => (
              <tr key={i} className="border-b border-neutral-800/50 last:border-0">
                <td className="px-3 py-1 text-neutral-300">
                  {dfa.labels[i]}{i === dfa.start ? " (start)" : ""}
                </td>
                {nfa.alphabet.map((a) => (
                  <td key={a} className="px-3 py-1 text-neutral-400">
                    {dfa.labels[dfa.trans[i][a]]}
                  </td>
                ))}
                <td className="px-3 py-1">
                  {dfa.accept.includes(i) ? (
                    <span className="text-emerald-300">yes</span>
                  ) : (
                    <span className="text-neutral-500">no</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}

function Theory() {
  return (
    <Card>
      <p className="text-sm text-neutral-400 mb-3">
        <strong className="text-neutral-200">Equivalence of NFA and DFA.</strong>
      </p>
      <ul className="space-y-2 text-sm text-neutral-300">
        <li className="flex gap-2">
          <span className="text-teal-400 font-mono">·</span>
          <span>
            Every NFA (even with ε-transitions) accepts a regular language and
            can be converted to an equivalent DFA via subset construction.
          </span>
        </li>
        <li className="flex gap-2">
          <span className="text-teal-400 font-mono">·</span>
          <span>
            <strong>Size blow-up.</strong> An NFA with n states can require up to{" "}
            <Tex math={String.raw`2^n`} /> DFA states. "3rd-to-last is 1" is
            the canonical example: 4 → 8.
          </span>
        </li>
        <li className="flex gap-2">
          <span className="text-teal-400 font-mono">·</span>
          <span>
            <strong>NFAs are often smaller / easier to write.</strong> Regex
            compilation goes regex → NFA → DFA for this reason.
          </span>
        </li>
        <li className="flex gap-2">
          <span className="text-teal-400 font-mono">·</span>
          <span>
            Subset construction is a special case of the{" "}
            <em>powerset / determinization</em> pattern that appears throughout
            computer science.
          </span>
        </li>
      </ul>
    </Card>
  )
}

export default function NFA() {
  return (
    <TopicShell topic={topic}>
      <Section title="NFA simulator">
        <NFASim />
      </Section>
      <Section title="Subset construction → DFA">
        <SubsetConstruction />
      </Section>
      <Section title="Why they're equivalent">
        <Theory />
      </Section>
    </TopicShell>
  )
}
