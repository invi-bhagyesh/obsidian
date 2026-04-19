import { useMemo, useState } from "react"
import Tex from "../../components/Tex"
import TopicShell, { Section, Card } from "../../components/TopicShell"
import { TOPICS } from "../../topics"

const topic = TOPICS.find((t) => t.slug === "mlc/regex-kleene")!

// Regex AST:
type Re =
  | { t: "eps" }
  | { t: "char"; c: string }
  | { t: "alt"; a: Re; b: Re }
  | { t: "cat"; a: Re; b: Re }
  | { t: "star"; a: Re }

// tiny regex parser: alt has lowest precedence, cat middle, star highest
// syntax: literals (a-z, 0-9), (), |, *. Empty → ε
function parseRegex(s: string): Re {
  let i = 0
  function peek() { return s[i] }
  function alt(): Re {
    let a = cat()
    while (peek() === "|") { i++; a = { t: "alt", a, b: cat() } }
    return a
  }
  function cat(): Re {
    let parts: Re[] = []
    while (i < s.length && peek() !== "|" && peek() !== ")") {
      parts.push(star())
    }
    if (parts.length === 0) return { t: "eps" }
    let r = parts[0]
    for (let k = 1; k < parts.length; k++) r = { t: "cat", a: r, b: parts[k] }
    return r
  }
  function star(): Re {
    let a = atom()
    while (peek() === "*") { i++; a = { t: "star", a } }
    return a
  }
  function atom(): Re {
    const c = peek()
    if (c === "(") {
      i++
      const r = alt()
      if (peek() !== ")") throw new Error("missing )")
      i++
      return r
    }
    if (c === undefined || c === "|" || c === ")") return { t: "eps" }
    i++
    return { t: "char", c }
  }
  const r = alt()
  if (i < s.length) throw new Error("trailing input")
  return r
}

function display(r: Re, p = 0): string {
  if (r.t === "eps") return "ε"
  if (r.t === "char") return r.c
  if (r.t === "star") return `${display(r.a, 3)}*`
  if (r.t === "cat") {
    const s = `${display(r.a, 2)}${display(r.b, 2)}`
    return p > 2 ? `(${s})` : s
  }
  const s = `${display(r.a, 1)}|${display(r.b, 1)}`
  return p > 1 ? `(${s})` : s
}

// Thompson construction: build an NFA with numeric state ids
type Trans = { from: number; sym: string; to: number }

function thompson(r: Re): { start: number; accept: number; trans: Trans[]; nStates: number } {
  let n = 0
  const trans: Trans[] = []
  function fresh() { return n++ }
  function build(re: Re): { s: number; a: number } {
    if (re.t === "eps") {
      const s = fresh(), a = fresh()
      trans.push({ from: s, sym: "ε", to: a })
      return { s, a }
    }
    if (re.t === "char") {
      const s = fresh(), a = fresh()
      trans.push({ from: s, sym: re.c, to: a })
      return { s, a }
    }
    if (re.t === "cat") {
      const A = build(re.a)
      const B = build(re.b)
      trans.push({ from: A.a, sym: "ε", to: B.s })
      return { s: A.s, a: B.a }
    }
    if (re.t === "alt") {
      const A = build(re.a)
      const B = build(re.b)
      const s = fresh(), a = fresh()
      trans.push({ from: s, sym: "ε", to: A.s })
      trans.push({ from: s, sym: "ε", to: B.s })
      trans.push({ from: A.a, sym: "ε", to: a })
      trans.push({ from: B.a, sym: "ε", to: a })
      return { s, a }
    }
    // star
    const A = build(re.a)
    const s = fresh(), a = fresh()
    trans.push({ from: s, sym: "ε", to: A.s })
    trans.push({ from: s, sym: "ε", to: a })
    trans.push({ from: A.a, sym: "ε", to: A.s })
    trans.push({ from: A.a, sym: "ε", to: a })
    return { s, a }
  }
  const { s, a } = build(r)
  return { start: s, accept: a, trans, nStates: n }
}

// simulate the NFA
function epsClose(nstates: number, trans: Trans[], set: Set<number>): Set<number> {
  const out = new Set(set)
  const stack = [...set]
  while (stack.length) {
    const s = stack.pop()!
    for (const tr of trans) {
      if (tr.from === s && tr.sym === "ε" && !out.has(tr.to)) {
        out.add(tr.to)
        stack.push(tr.to)
      }
    }
  }
  void nstates
  return out
}

function accepts(r: Re, input: string): boolean {
  const nfa = thompson(r)
  let cur = epsClose(nfa.nStates, nfa.trans, new Set([nfa.start]))
  for (const c of input) {
    const next = new Set<number>()
    for (const s of cur) {
      for (const tr of nfa.trans) {
        if (tr.from === s && tr.sym === c) next.add(tr.to)
      }
    }
    cur = epsClose(nfa.nStates, nfa.trans, next)
    if (cur.size === 0) return false
  }
  return cur.has(nfa.accept)
}

// layout NFA states in a horizontal line, scaled
function layoutNFA(nfa: ReturnType<typeof thompson>) {
  // BFS layering from start
  const layer = new Map<number, number>()
  const queue = [nfa.start]
  layer.set(nfa.start, 0)
  while (queue.length) {
    const s = queue.shift()!
    const l = layer.get(s)!
    for (const tr of nfa.trans) {
      if (tr.from === s && !layer.has(tr.to)) {
        layer.set(tr.to, l + 1)
        queue.push(tr.to)
      }
    }
  }
  // if any unreachable, put at last layer
  for (let i = 0; i < nfa.nStates; i++) {
    if (!layer.has(i)) layer.set(i, 0)
  }
  const maxL = Math.max(...layer.values())
  // slot within layer
  const byLayer = new Map<number, number[]>()
  for (let i = 0; i < nfa.nStates; i++) {
    const l = layer.get(i)!
    if (!byLayer.has(l)) byLayer.set(l, [])
    byLayer.get(l)!.push(i)
  }
  const W = 640, H = 280
  const pos: [number, number][] = Array.from({ length: nfa.nStates }, () => [0, 0])
  for (let l = 0; l <= maxL; l++) {
    const ids = byLayer.get(l) ?? []
    ids.forEach((id, k) => {
      const x = 40 + l * ((W - 80) / Math.max(1, maxL))
      const y = ids.length === 1 ? H / 2 : 50 + k * ((H - 100) / (ids.length - 1))
      pos[id] = [x, y]
    })
  }
  return { pos, W, H }
}

const EXAMPLES = [
  "a|b",
  "ab",
  "a*",
  "(a|b)*",
  "a*b*",
  "(0|1(01*0)*1)*",
  "(ab|ba)*",
]

function Build() {
  const [regex, setRegex] = useState("(a|b)*abb")
  const [testInput, setTestInput] = useState("aabbabb")

  const result = useMemo(() => {
    try {
      const ast = parseRegex(regex)
      const nfa = thompson(ast)
      const layout = layoutNFA(nfa)
      return { ast, nfa, layout, err: null as string | null }
    } catch (e) {
      return { err: (e as Error).message }
    }
  }, [regex])

  const match = useMemo(() => {
    if (!result.ast) return null
    try { return accepts(result.ast, testInput) } catch { return null }
  }, [result.ast, testInput])

  return (
    <Card>
      <p className="text-sm text-neutral-400 mb-3">
        <strong className="text-neutral-200">Thompson's construction.</strong>{" "}
        Turn any regex into an NFA. Each operator corresponds to a little
        gadget — combined they form a full machine in{" "}
        <Tex math={String.raw`O(|r|)`} /> states.
      </p>

      <input
        value={regex}
        onChange={(e) => setRegex(e.target.value)}
        className="w-full rounded-md border border-neutral-800 bg-neutral-950 px-3 py-2 text-sm font-mono text-neutral-100 focus:border-teal-500 focus:outline-none"
      />
      <div className="mt-2 flex flex-wrap gap-1">
        {EXAMPLES.map((e) => (
          <button
            key={e}
            onClick={() => setRegex(e)}
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
        <>
          <div className="mt-3 text-xs font-mono text-neutral-400">
            parsed: <span className="text-teal-300">{display(result.ast!)}</span>
            {" · "}
            <span className="text-violet-300">{result.nfa!.nStates} states</span>
            {" · "}
            <span className="text-amber-300">{result.nfa!.trans.length} transitions</span>
          </div>

          <div className="mt-3 rounded-md border border-neutral-800 bg-neutral-950 p-2">
            <svg width={result.layout!.W} height={result.layout!.H} className="block mx-auto max-w-full">
              <defs>
                <marker id="arr-t" viewBox="0 0 10 10" refX="8" refY="5"
                  markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#888" />
                </marker>
              </defs>
              {result.nfa!.trans.map((tr, i) => {
                const [fx, fy] = result.layout!.pos[tr.from]
                const [tx, ty] = result.layout!.pos[tr.to]
                const isEps = tr.sym === "ε"
                if (tr.from === tr.to) {
                  return (
                    <g key={i}>
                      <path
                        d={`M ${fx - 10} ${fy - 12} Q ${fx} ${fy - 36} ${fx + 10} ${fy - 12}`}
                        fill="none" stroke={isEps ? "#a855f7" : "#888"}
                        strokeWidth={1.2} markerEnd="url(#arr-t)"
                      />
                      <text x={fx} y={fy - 28} fontSize="10" textAnchor="middle"
                        fill={isEps ? "#a855f7" : "#d4d4d8"} fontFamily="monospace">{tr.sym}</text>
                    </g>
                  )
                }
                const dx = tx - fx, dy = ty - fy
                const L = Math.hypot(dx, dy)
                const nx = -dy / L, ny = dx / L
                const bend = fy === ty ? 0 : 10
                const midx = (fx + tx) / 2, midy = (fy + ty) / 2
                const cx = midx + nx * bend, cy = midy + ny * bend
                const r = 14
                const ang1 = Math.atan2(cy - fy, cx - fx)
                const ang2 = Math.atan2(ty - cy, tx - cx)
                const x1 = fx + r * Math.cos(ang1), y1 = fy + r * Math.sin(ang1)
                const x2 = tx - r * Math.cos(ang2), y2 = ty - r * Math.sin(ang2)
                return (
                  <g key={i}>
                    <path d={`M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`}
                      fill="none" stroke={isEps ? "#a855f7" : "#888"}
                      strokeWidth={1.2} markerEnd="url(#arr-t)" />
                    <text x={cx} y={cy - 3} fontSize="10" textAnchor="middle"
                      fill={isEps ? "#a855f7" : "#d4d4d8"} fontFamily="monospace">{tr.sym}</text>
                  </g>
                )
              })}
              {result.layout!.pos.map(([x, y], i) => {
                const isStart = i === result.nfa!.start
                const isAcc = i === result.nfa!.accept
                return (
                  <g key={i}>
                    <circle cx={x} cy={y} r={12}
                      fill={isStart ? "#1e3a3a" : "#171717"}
                      stroke={isStart ? "#5eead4" : isAcc ? "#5eead4" : "#525252"}
                      strokeWidth={1.2}
                    />
                    {isAcc && (
                      <circle cx={x} cy={y} r={8.5} fill="none"
                        stroke="#5eead4" strokeWidth={1} />
                    )}
                    <text x={x} y={y + 3} fontSize="9" textAnchor="middle"
                      fill="#d4d4d8" fontFamily="monospace">{i}</text>
                  </g>
                )
              })}
            </svg>
          </div>

          <div className="mt-3 flex items-center gap-2">
            <input
              value={testInput}
              onChange={(e) => setTestInput(e.target.value)}
              placeholder="test input"
              className="flex-1 rounded-md border border-neutral-800 bg-neutral-950 px-3 py-2 text-sm font-mono text-neutral-100"
            />
            {match !== null && (
              <span className={`rounded-md border px-2 py-0.5 text-xs font-mono ${
                match
                  ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-200"
                  : "border-rose-500/40 bg-rose-500/10 text-rose-200"
              }`}>
                {match ? "✓ match" : "✗ no match"}
              </span>
            )}
          </div>
        </>
      )}
    </Card>
  )
}

function Gadgets() {
  const W = 260
  const H = 110
  return (
    <Card>
      <p className="text-sm text-neutral-400 mb-3">
        <strong className="text-neutral-200">Thompson's gadgets.</strong>{" "}
        Each operator glues in a little fragment with one start and one accept
        state.
      </p>
      <div className="grid md:grid-cols-2 gap-3">
        {/* ε */}
        <div className="rounded-md border border-neutral-800 bg-neutral-950 p-3">
          <div className="text-xs font-mono text-teal-300 mb-1">ε (empty string)</div>
          <svg width={W} height={H} className="block mx-auto">
            <circle cx={40} cy={55} r={12} fill="#171717" stroke="#5eead4" />
            <circle cx={W - 40} cy={55} r={12} fill="#171717" stroke="#5eead4" />
            <circle cx={W - 40} cy={55} r={8.5} fill="none" stroke="#5eead4" />
            <path d={`M 52 55 L ${W - 52} 55`} stroke="#a855f7" strokeWidth={1.3}
              markerEnd="url(#ar1)" fill="none" />
            <text x={W / 2} y={48} fontSize="11" fill="#a855f7"
              textAnchor="middle" fontFamily="monospace">ε</text>
            <defs>
              <marker id="ar1" viewBox="0 0 10 10" refX="8" refY="5"
                markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#a855f7" />
              </marker>
            </defs>
          </svg>
        </div>

        {/* single char */}
        <div className="rounded-md border border-neutral-800 bg-neutral-950 p-3">
          <div className="text-xs font-mono text-teal-300 mb-1">char c</div>
          <svg width={W} height={H} className="block mx-auto">
            <circle cx={40} cy={55} r={12} fill="#171717" stroke="#5eead4" />
            <circle cx={W - 40} cy={55} r={12} fill="#171717" stroke="#5eead4" />
            <circle cx={W - 40} cy={55} r={8.5} fill="none" stroke="#5eead4" />
            <path d={`M 52 55 L ${W - 52} 55`} stroke="#888" strokeWidth={1.3}
              markerEnd="url(#ar2)" fill="none" />
            <text x={W / 2} y={48} fontSize="11" fill="#d4d4d8"
              textAnchor="middle" fontFamily="monospace">c</text>
            <defs>
              <marker id="ar2" viewBox="0 0 10 10" refX="8" refY="5"
                markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#888" />
              </marker>
            </defs>
          </svg>
        </div>

        {/* concat */}
        <div className="rounded-md border border-neutral-800 bg-neutral-950 p-3">
          <div className="text-xs font-mono text-teal-300 mb-1">ab (concat)</div>
          <svg width={W} height={H} className="block mx-auto">
            <rect x={20} y={35} width={80} height={40} fill="#111827" stroke="#525252" />
            <text x={60} y={59} fontSize="11" fill="#d4d4d8" textAnchor="middle"
              fontFamily="monospace">A</text>
            <rect x={W - 100} y={35} width={80} height={40} fill="#111827" stroke="#525252" />
            <text x={W - 60} y={59} fontSize="11" fill="#d4d4d8" textAnchor="middle"
              fontFamily="monospace">B</text>
            <path d={`M 100 55 L ${W - 100} 55`} stroke="#a855f7" strokeWidth={1.3}
              markerEnd="url(#ar3)" fill="none" />
            <text x={W / 2} y={48} fontSize="10" fill="#a855f7" textAnchor="middle"
              fontFamily="monospace">ε</text>
            <defs>
              <marker id="ar3" viewBox="0 0 10 10" refX="8" refY="5"
                markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#a855f7" />
              </marker>
            </defs>
          </svg>
        </div>

        {/* alt */}
        <div className="rounded-md border border-neutral-800 bg-neutral-950 p-3">
          <div className="text-xs font-mono text-teal-300 mb-1">a|b (alt)</div>
          <svg width={W} height={H} className="block mx-auto">
            <circle cx={20} cy={55} r={10} fill="#171717" stroke="#5eead4" />
            <rect x={80} y={15} width={60} height={30} fill="#111827" stroke="#525252" />
            <text x={110} y={34} fontSize="10" fill="#d4d4d8" textAnchor="middle" fontFamily="monospace">A</text>
            <rect x={80} y={65} width={60} height={30} fill="#111827" stroke="#525252" />
            <text x={110} y={84} fontSize="10" fill="#d4d4d8" textAnchor="middle" fontFamily="monospace">B</text>
            <circle cx={W - 20} cy={55} r={10} fill="#171717" stroke="#5eead4" />
            <circle cx={W - 20} cy={55} r={7} fill="none" stroke="#5eead4" />
            <path d="M 30 55 L 80 30" stroke="#a855f7" fill="none" markerEnd="url(#ar4)" />
            <path d="M 30 55 L 80 80" stroke="#a855f7" fill="none" markerEnd="url(#ar4)" />
            <path d={`M 140 30 L ${W - 30} 55`} stroke="#a855f7" fill="none" markerEnd="url(#ar4)" />
            <path d={`M 140 80 L ${W - 30} 55`} stroke="#a855f7" fill="none" markerEnd="url(#ar4)" />
            <defs>
              <marker id="ar4" viewBox="0 0 10 10" refX="8" refY="5"
                markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#a855f7" />
              </marker>
            </defs>
          </svg>
        </div>

        {/* star */}
        <div className="rounded-md border border-neutral-800 bg-neutral-950 p-3 md:col-span-2">
          <div className="text-xs font-mono text-teal-300 mb-1">a* (star)</div>
          <svg width={W * 2 + 20} height={H} className="block mx-auto">
            <circle cx={30} cy={55} r={10} fill="#171717" stroke="#5eead4" />
            <rect x={100} y={35} width={80} height={40} fill="#111827" stroke="#525252" />
            <text x={140} y={59} fontSize="11" fill="#d4d4d8" textAnchor="middle" fontFamily="monospace">A</text>
            <circle cx={280} cy={55} r={10} fill="#171717" stroke="#5eead4" />
            <circle cx={280} cy={55} r={7} fill="none" stroke="#5eead4" />
            {/* skip edge */}
            <path d="M 40 55 Q 155 15 270 55" stroke="#a855f7" fill="none" markerEnd="url(#ar5)" />
            {/* enter A */}
            <path d="M 40 55 L 100 55" stroke="#a855f7" fill="none" markerEnd="url(#ar5)" />
            {/* exit A */}
            <path d="M 180 55 L 270 55" stroke="#a855f7" fill="none" markerEnd="url(#ar5)" />
            {/* loopback */}
            <path d="M 180 55 Q 140 95 100 55" stroke="#a855f7" fill="none" markerEnd="url(#ar5)" />
            <defs>
              <marker id="ar5" viewBox="0 0 10 10" refX="8" refY="5"
                markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#a855f7" />
              </marker>
            </defs>
          </svg>
        </div>
      </div>
    </Card>
  )
}

function KleeneTheorem() {
  return (
    <Card>
      <p className="text-sm text-neutral-400 mb-3">
        <strong className="text-neutral-200">Kleene's theorem.</strong>
      </p>
      <ul className="space-y-2 text-sm text-neutral-300">
        <li className="flex gap-2">
          <span className="text-teal-400 font-mono">·</span>
          <span>
            <strong>Equivalence:</strong>{" "}
            <Tex math="L" /> is regular ⇔ <Tex math="L" /> is the language of
            some regular expression ⇔ <Tex math="L" /> is the language of some
            DFA/NFA.
          </span>
        </li>
        <li className="flex gap-2">
          <span className="text-teal-400 font-mono">·</span>
          <span>
            <strong>Regex → NFA:</strong> Thompson's construction (recursive).
            Linear in regex size.
          </span>
        </li>
        <li className="flex gap-2">
          <span className="text-teal-400 font-mono">·</span>
          <span>
            <strong>DFA → Regex:</strong> state elimination. Rip states out one
            by one, accumulating regexes on the remaining edges.
          </span>
        </li>
        <li className="flex gap-2">
          <span className="text-teal-400 font-mono">·</span>
          <span>
            <strong>NFA → DFA → regex</strong> composes. Can blow up
            exponentially — regexes produced this way are often huge.
          </span>
        </li>
        <li className="flex gap-2">
          <span className="text-teal-400 font-mono">·</span>
          <span>
            <strong>Real-world regex</strong> engines (PCRE, JS) add
            backreferences. Those extensions push the language beyond regular.
          </span>
        </li>
      </ul>
    </Card>
  )
}

export default function RegexKleene() {
  return (
    <TopicShell topic={topic}>
      <Section title="Regex → NFA (Thompson's construction)">
        <Build />
      </Section>
      <Section title="Constructor gadgets">
        <Gadgets />
      </Section>
      <Section title="Kleene's theorem">
        <KleeneTheorem />
      </Section>
    </TopicShell>
  )
}
