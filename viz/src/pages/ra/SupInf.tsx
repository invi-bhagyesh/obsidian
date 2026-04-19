import { useMemo, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Plus, Trash2 } from "lucide-react"
import Tex from "../../components/Tex"
import TopicShell, { Section, Card } from "../../components/TopicShell"
import { TOPICS } from "../../topics"

const topic = TOPICS.find((t) => t.slug === "ra/sup-inf")!

const fmt = (n: number, p = 4) =>
  !isFinite(n) ? "—" : Number(n.toPrecision(p)).toString()

// A "piece" of a set: either an interval with open/closed ends, or a single point
type Interval = {
  id: string
  kind: "interval"
  lo: number
  hi: number
  openLo: boolean
  openHi: boolean
}
type Point = { id: string; kind: "point"; x: number }
type Piece = Interval | Point

let UID = 1
const uid = () => `p${UID++}`

// ============ set operations ============
// Sup/inf and whether they are attained (= max/min)
function supremum(pieces: Piece[]): { val: number; attained: boolean } | null {
  if (pieces.length === 0) return null
  let best = -Infinity
  let attained = false
  for (const p of pieces) {
    if (p.kind === "point") {
      if (p.x > best) {
        best = p.x
        attained = true
      } else if (p.x === best) {
        attained = true
      }
    } else {
      const cand = p.hi
      if (cand > best) {
        best = cand
        attained = !p.openHi
      } else if (cand === best && !p.openHi) {
        attained = true
      }
    }
  }
  return { val: best, attained }
}
function infimum(pieces: Piece[]): { val: number; attained: boolean } | null {
  if (pieces.length === 0) return null
  let best = Infinity
  let attained = false
  for (const p of pieces) {
    if (p.kind === "point") {
      if (p.x < best) {
        best = p.x
        attained = true
      } else if (p.x === best) {
        attained = true
      }
    } else {
      const cand = p.lo
      if (cand < best) {
        best = cand
        attained = !p.openLo
      } else if (cand === best && !p.openLo) {
        attained = true
      }
    }
  }
  return { val: best, attained }
}
function pieceTex(p: Piece): string {
  if (p.kind === "point") return String.raw`\{${fmt(p.x, 3)}\}`
  const lb = p.openLo ? "(" : "["
  const rb = p.openHi ? ")" : "]"
  return `${lb}${fmt(p.lo, 3)},\\ ${fmt(p.hi, 3)}${rb}`
}

// ============ set builder visualization ============
function SetBuilder() {
  const [pieces, setPieces] = useState<Piece[]>([
    { id: uid(), kind: "interval", lo: 0, hi: 1, openLo: true, openHi: true },
    { id: uid(), kind: "point", x: 2 },
  ])
  const sup = useMemo(() => supremum(pieces), [pieces])
  const inf = useMemo(() => infimum(pieces), [pieces])

  const vmin = useMemo(() => {
    let m = Infinity
    for (const p of pieces)
      m = Math.min(m, p.kind === "point" ? p.x : p.lo)
    return isFinite(m) ? m : 0
  }, [pieces])
  const vmax = useMemo(() => {
    let m = -Infinity
    for (const p of pieces)
      m = Math.max(m, p.kind === "point" ? p.x : p.hi)
    return isFinite(m) ? m : 1
  }, [pieces])
  const pad = Math.max((vmax - vmin) * 0.15, 0.5)
  const vlo = vmin - pad
  const vhi = vmax + pad
  const W = 720
  const H = 140
  const xOf = (x: number) => ((x - vlo) / (vhi - vlo)) * (W - 40) + 20

  const addInterval = () =>
    setPieces((s) => [
      ...s,
      { id: uid(), kind: "interval", lo: vmax + 0.5, hi: vmax + 1.5, openLo: true, openHi: true },
    ])
  const addPoint = () =>
    setPieces((s) => [...s, { id: uid(), kind: "point", x: vmax + 0.5 }])
  const remove = (id: string) =>
    setPieces((s) => s.filter((p) => p.id !== id))
  const update = (id: string, patch: Partial<Piece>) =>
    setPieces((s) =>
      s.map((p) => (p.id === id ? ({ ...p, ...patch } as Piece) : p)),
    )

  return (
    <Card>
      <p className="text-sm text-neutral-400 mb-4">
        Build a set <Tex math="S \subset \mathbb{R}" /> by adding intervals and
        points. Toggle each endpoint open/closed. Watch{" "}
        <Tex math="\sup S" /> and <Tex math="\inf S" /> update — and see whether
        they are attained (= max / min) or merely approached.
      </p>

      <div className="flex gap-2 mb-4 flex-wrap">
        <button
          onClick={addInterval}
          className="inline-flex items-center gap-1.5 rounded-md bg-indigo-500/20 border border-indigo-500/50 px-3 py-1.5 text-sm hover:bg-indigo-500/30"
        >
          <Plus className="h-3.5 w-3.5" /> interval
        </button>
        <button
          onClick={addPoint}
          className="inline-flex items-center gap-1.5 rounded-md bg-amber-500/20 border border-amber-500/50 px-3 py-1.5 text-sm hover:bg-amber-500/30"
        >
          <Plus className="h-3.5 w-3.5" /> point
        </button>
        <button
          onClick={() => setPieces([])}
          className="inline-flex items-center gap-1.5 rounded-md border border-neutral-800 px-3 py-1.5 text-sm hover:bg-neutral-900"
        >
          clear
        </button>
      </div>

      <svg
        width={W}
        height={H}
        className="block w-full max-w-full rounded-md bg-neutral-950 border border-neutral-800"
      >
        {/* axis */}
        <line x1={20} y1={H / 2} x2={W - 20} y2={H / 2} stroke="#404040" />
        {/* ticks at integers */}
        {Array.from(
          { length: Math.ceil(vhi) - Math.floor(vlo) + 1 },
          (_, i) => Math.floor(vlo) + i,
        ).map((t) => (
          <g key={t}>
            <line
              x1={xOf(t)}
              y1={H / 2 - 4}
              x2={xOf(t)}
              y2={H / 2 + 4}
              stroke="#52525b"
            />
            <text
              x={xOf(t)}
              y={H / 2 + 18}
              textAnchor="middle"
              fontSize="10"
              fill="#71717a"
              fontFamily="ui-monospace, monospace"
            >
              {t}
            </text>
          </g>
        ))}
        {/* pieces */}
        <AnimatePresence>
          {pieces.map((p) => {
            if (p.kind === "point")
              return (
                <motion.circle
                  key={p.id}
                  cx={xOf(p.x)}
                  cy={H / 2}
                  r={5}
                  fill="#fbbf24"
                  stroke="#0b0d10"
                  strokeWidth={2}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                />
              )
            return (
              <motion.g
                key={p.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <line
                  x1={xOf(p.lo)}
                  y1={H / 2}
                  x2={xOf(p.hi)}
                  y2={H / 2}
                  stroke="#818cf8"
                  strokeWidth={6}
                  strokeLinecap="butt"
                />
                <circle
                  cx={xOf(p.lo)}
                  cy={H / 2}
                  r={6}
                  fill={p.openLo ? "#0b0d10" : "#818cf8"}
                  stroke="#818cf8"
                  strokeWidth={2}
                />
                <circle
                  cx={xOf(p.hi)}
                  cy={H / 2}
                  r={6}
                  fill={p.openHi ? "#0b0d10" : "#818cf8"}
                  stroke="#818cf8"
                  strokeWidth={2}
                />
              </motion.g>
            )
          })}
        </AnimatePresence>
        {/* sup marker */}
        {sup && (
          <motion.g
            initial={false}
            animate={{ x: xOf(sup.val) }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
          >
            <line
              x1={0}
              y1={H / 2 - 38}
              x2={0}
              y2={H / 2 + 10}
              stroke="#34d399"
              strokeDasharray="3 3"
            />
            <text
              x={0}
              y={H / 2 - 42}
              textAnchor="middle"
              fontSize="10"
              fill="#34d399"
              fontFamily="ui-monospace, monospace"
            >
              sup = {fmt(sup.val, 3)} {sup.attained && "(max)"}
            </text>
          </motion.g>
        )}
        {/* inf marker */}
        {inf && (
          <motion.g
            initial={false}
            animate={{ x: xOf(inf.val) }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
          >
            <line
              x1={0}
              y1={H / 2 - 10}
              x2={0}
              y2={H / 2 + 38}
              stroke="#fb7185"
              strokeDasharray="3 3"
            />
            <text
              x={0}
              y={H / 2 + 52}
              textAnchor="middle"
              fontSize="10"
              fill="#fb7185"
              fontFamily="ui-monospace, monospace"
            >
              inf = {fmt(inf.val, 3)} {inf.attained && "(min)"}
            </text>
          </motion.g>
        )}
      </svg>

      {/* piece editors */}
      <div className="mt-4 space-y-2">
        {pieces.map((p) => (
          <PieceRow
            key={p.id}
            piece={p}
            onChange={(patch) => update(p.id, patch)}
            onDelete={() => remove(p.id)}
          />
        ))}
        {pieces.length === 0 && (
          <div className="text-sm text-neutral-500 italic">
            Empty set — sup and inf are undefined (or conventionally ±∞).
          </div>
        )}
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="rounded-md border border-neutral-800 bg-neutral-950 px-4 py-3">
          <div className="text-xs text-neutral-500">sup S</div>
          {sup ? (
            <>
              <div className="text-lg text-emerald-300 font-mono">
                {fmt(sup.val)}
              </div>
              <div className="text-xs mt-1">
                {sup.attained ? (
                  <span className="text-emerald-400">attained → max S exists</span>
                ) : (
                  <span className="text-neutral-400">
                    not attained → no max
                  </span>
                )}
              </div>
            </>
          ) : (
            <div className="text-neutral-500">—</div>
          )}
        </div>
        <div className="rounded-md border border-neutral-800 bg-neutral-950 px-4 py-3">
          <div className="text-xs text-neutral-500">inf S</div>
          {inf ? (
            <>
              <div className="text-lg text-rose-300 font-mono">
                {fmt(inf.val)}
              </div>
              <div className="text-xs mt-1">
                {inf.attained ? (
                  <span className="text-rose-400">attained → min S exists</span>
                ) : (
                  <span className="text-neutral-400">
                    not attained → no min
                  </span>
                )}
              </div>
            </>
          ) : (
            <div className="text-neutral-500">—</div>
          )}
        </div>
      </div>

      {pieces.length > 0 && (
        <div className="mt-4 text-sm text-neutral-400">
          S ={" "}
          <Tex
            math={pieces.map(pieceTex).join(" \\cup ")}
          />
        </div>
      )}
    </Card>
  )
}

function PieceRow({
  piece,
  onChange,
  onDelete,
}: {
  piece: Piece
  onChange: (patch: Partial<Piece>) => void
  onDelete: () => void
}) {
  if (piece.kind === "point") {
    return (
      <div className="flex items-center gap-3 rounded-md border border-amber-500/30 bg-amber-500/5 px-3 py-2">
        <span className="text-xs uppercase tracking-wider text-amber-400 w-16">
          point
        </span>
        <label className="text-xs text-neutral-500 font-mono">x</label>
        <input
          type="number"
          step="0.1"
          value={piece.x}
          onChange={(e) => onChange({ x: Number(e.target.value) })}
          className="w-24 rounded-md bg-neutral-950 border border-neutral-800 px-2 py-1 text-sm font-mono"
        />
        <div className="flex-1" />
        <button
          onClick={onDelete}
          className="text-neutral-500 hover:text-rose-400"
          aria-label="remove"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    )
  }
  return (
    <div className="flex items-center gap-2 rounded-md border border-indigo-500/30 bg-indigo-500/5 px-3 py-2 text-sm">
      <span className="text-xs uppercase tracking-wider text-indigo-300 w-16">
        interval
      </span>
      <button
        onClick={() => onChange({ openLo: !piece.openLo })}
        className="font-mono px-1 text-neutral-300 hover:text-white"
        title="toggle open/closed"
      >
        {piece.openLo ? "(" : "["}
      </button>
      <input
        type="number"
        step="0.1"
        value={piece.lo}
        onChange={(e) => onChange({ lo: Number(e.target.value) })}
        className="w-20 rounded-md bg-neutral-950 border border-neutral-800 px-2 py-1 font-mono"
      />
      <span className="text-neutral-500">,</span>
      <input
        type="number"
        step="0.1"
        value={piece.hi}
        onChange={(e) => onChange({ hi: Number(e.target.value) })}
        className="w-20 rounded-md bg-neutral-950 border border-neutral-800 px-2 py-1 font-mono"
      />
      <button
        onClick={() => onChange({ openHi: !piece.openHi })}
        className="font-mono px-1 text-neutral-300 hover:text-white"
      >
        {piece.openHi ? ")" : "]"}
      </button>
      <div className="flex-1" />
      <button
        onClick={onDelete}
        className="text-neutral-500 hover:text-rose-400"
        aria-label="remove"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  )
}

// ============ ε-characterisation game ============
function EpsilonGame() {
  // Pre-defined set: S = (0, 1] ∪ {0}  --- actually just use (0, 1)
  const pieces: Piece[] = [
    { id: "a", kind: "interval", lo: 0, hi: 1, openLo: true, openHi: true },
  ]
  const [M, setM] = useState(1.0)
  const [eps, setEps] = useState(0.1)

  // Find a witness x ∈ S with x > M − eps (for the real sup M = 1)
  const target = M - eps
  let witness: number | null = null
  if (target < 1) {
    // pick midpoint of (max(0, target), 1)
    const lo = Math.max(0, target + 1e-9)
    witness = (lo + 1) / 2
    if (!(witness > target && witness < 1)) witness = null
  }
  const isUpperBound = M >= 1
  const correctSup = M === 1

  return (
    <Card>
      <p className="text-sm text-neutral-400 mb-3">
        <strong className="text-neutral-200">
          ε-characterisation of the supremum.
        </strong>{" "}
        <Tex math={String.raw`M = \sup S`} /> iff <em>(i)</em>{" "}
        <Tex math="x \le M" /> for all <Tex math="x \in S" />, and <em>(ii)</em>{" "}
        for every <Tex math={String.raw`\varepsilon > 0`} /> there is some{" "}
        <Tex math={String.raw`x \in S`} /> with{" "}
        <Tex math={String.raw`x > M - \varepsilon`} />.
      </p>
      <p className="text-sm text-neutral-500 mb-4">
        Take <Tex math="S = (0, 1)" />. Guess a candidate <Tex math="M" />, pick
        any <Tex math={String.raw`\varepsilon > 0`} />, and the demo either
        finds a witness or flags a failure.
      </p>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <label>
          <div className="flex justify-between text-xs">
            <span className="text-neutral-500 font-mono">candidate M</span>
            <span className="font-mono text-neutral-300">{fmt(M, 3)}</span>
          </div>
          <input
            type="range"
            min={0}
            max={2}
            step={0.01}
            value={M}
            onChange={(e) => setM(Number(e.target.value))}
            className="w-full accent-emerald-400"
          />
        </label>
        <label>
          <div className="flex justify-between text-xs">
            <span className="text-neutral-500 font-mono">ε</span>
            <span className="font-mono text-neutral-300">{fmt(eps, 3)}</span>
          </div>
          <input
            type="range"
            min={0.001}
            max={1}
            step={0.001}
            value={eps}
            onChange={(e) => setEps(Number(e.target.value))}
            className="w-full accent-amber-400"
          />
        </label>
      </div>

      <EpsSvg pieces={pieces} M={M} eps={eps} witness={witness} />

      <div className="mt-4 space-y-2 text-sm">
        <Condition
          ok={isUpperBound}
          text={
            <>
              (i) M is an upper bound:{" "}
              {isUpperBound
                ? "yes, no x ∈ S exceeds M."
                : `no — 1 > M = ${fmt(M, 3)} would be in S if S were closed; pick x closer to 1.`}
            </>
          }
        />
        <Condition
          ok={witness !== null}
          text={
            witness !== null ? (
              <>
                (ii) witness found: x = {fmt(witness, 4)} ∈ S and x &gt; M − ε ={" "}
                {fmt(target, 4)}.
              </>
            ) : (
              <>
                (ii) no witness — since M − ε ≥ 1 = sup S, no element of S
                exceeds M − ε. This means M is <em>much</em> larger than the
                true sup; shrink M toward 1.
              </>
            )
          }
        />
        {correctSup && (
          <div className="mt-3 rounded-md border border-emerald-500/40 bg-emerald-500/10 px-3 py-2 text-emerald-300 text-sm">
            M = 1 = sup S ✓ Both conditions pass for every ε &gt; 0.
          </div>
        )}
        {!isUpperBound && (
          <div className="mt-3 rounded-md border border-rose-500/40 bg-rose-500/10 px-3 py-2 text-rose-300 text-sm">
            M &lt; 1 = true sup: fails condition (i). M is not an upper bound.
          </div>
        )}
        {isUpperBound && M > 1 && (
          <div className="mt-3 rounded-md border border-amber-500/40 bg-amber-500/10 px-3 py-2 text-amber-300 text-sm">
            M &gt; 1: upper bound but not least. For small ε, condition (ii)
            eventually fails.
          </div>
        )}
      </div>

      <p className="mt-3 text-xs text-neutral-500">
        Bonus: <Tex math="\sup(0,1) = 1" /> but <Tex math="1 \notin (0,1)" />,
        so <Tex math="\max(0,1)" /> does not exist.
      </p>
    </Card>
  )
}

function Condition({
  ok,
  text,
}: {
  ok: boolean
  text: React.ReactNode
}) {
  return (
    <div className="flex items-start gap-2">
      <span
        className={`mt-1.5 inline-block h-2 w-2 rounded-full ${
          ok ? "bg-emerald-400" : "bg-rose-400"
        }`}
      />
      <div className={ok ? "text-neutral-300" : "text-neutral-400"}>{text}</div>
    </div>
  )
}

function EpsSvg({
  pieces,
  M,
  eps,
  witness,
}: {
  pieces: Piece[]
  M: number
  eps: number
  witness: number | null
}) {
  const W = 720
  const H = 120
  const vlo = -0.2
  const vhi = 2.2
  const xOf = (x: number) => ((x - vlo) / (vhi - vlo)) * (W - 40) + 20
  const p = pieces[0] as Interval
  return (
    <svg
      width={W}
      height={H}
      className="block w-full max-w-full rounded-md bg-neutral-950 border border-neutral-800"
    >
      <line x1={20} y1={H / 2} x2={W - 20} y2={H / 2} stroke="#404040" />
      {[0, 1, 2].map((t) => (
        <g key={t}>
          <line
            x1={xOf(t)}
            y1={H / 2 - 3}
            x2={xOf(t)}
            y2={H / 2 + 3}
            stroke="#52525b"
          />
          <text
            x={xOf(t)}
            y={H / 2 + 18}
            textAnchor="middle"
            fontSize="10"
            fill="#71717a"
            fontFamily="ui-monospace, monospace"
          >
            {t}
          </text>
        </g>
      ))}
      {/* the set */}
      <line
        x1={xOf(p.lo)}
        y1={H / 2}
        x2={xOf(p.hi)}
        y2={H / 2}
        stroke="#818cf8"
        strokeWidth={6}
      />
      <circle cx={xOf(p.lo)} cy={H / 2} r={5} fill="#0b0d10" stroke="#818cf8" strokeWidth={2} />
      <circle cx={xOf(p.hi)} cy={H / 2} r={5} fill="#0b0d10" stroke="#818cf8" strokeWidth={2} />
      {/* M − eps band */}
      <rect
        x={xOf(M - eps)}
        y={H / 2 - 18}
        width={Math.max(0, xOf(M) - xOf(M - eps))}
        height={36}
        fill="rgba(245,158,11,0.1)"
        stroke="rgba(245,158,11,0.35)"
      />
      {/* M marker */}
      <line
        x1={xOf(M)}
        y1={H / 2 - 30}
        x2={xOf(M)}
        y2={H / 2 + 30}
        stroke="#34d399"
        strokeWidth={2}
      />
      <text
        x={xOf(M)}
        y={H / 2 - 34}
        textAnchor="middle"
        fontSize="11"
        fill="#34d399"
        fontFamily="ui-monospace, monospace"
      >
        M = {fmt(M, 3)}
      </text>
      <text
        x={xOf(M - eps / 2)}
        y={H / 2 + 48}
        textAnchor="middle"
        fontSize="10"
        fill="#fbbf24"
        fontFamily="ui-monospace, monospace"
      >
        (M − ε, M]
      </text>
      {/* witness */}
      {witness !== null && (
        <motion.g
          key={fmt(witness, 5)}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 240, damping: 18 }}
        >
          <circle cx={xOf(witness)} cy={H / 2} r={6} fill="#fbbf24" stroke="#0b0d10" strokeWidth={2} />
          <text
            x={xOf(witness)}
            y={H / 2 - 12}
            textAnchor="middle"
            fontSize="10"
            fill="#fbbf24"
            fontFamily="ui-monospace, monospace"
          >
            x = {fmt(witness, 3)}
          </text>
        </motion.g>
      )}
    </svg>
  )
}

// ============ Archimedean property ============
function Archimedean() {
  const [x, setX] = useState(3.14)
  const n = Math.floor(x) + 1

  return (
    <Card>
      <p className="text-sm text-neutral-400 mb-3">
        <strong className="text-neutral-200">Archimedean property.</strong>{" "}
        <Tex math={String.raw`\mathbb{N} \text{ is unbounded in } \mathbb{R}`} />{" "}
        — for every real <Tex math="x" /> there is a natural{" "}
        <Tex math="n" /> with <Tex math="n > x" />. Equivalently, for every{" "}
        <Tex math={String.raw`\varepsilon > 0`} /> some{" "}
        <Tex math="1/n < \varepsilon" />.
      </p>
      <label>
        <div className="flex justify-between text-xs">
          <span className="text-neutral-500 font-mono">x</span>
          <span className="font-mono text-neutral-300">{fmt(x, 4)}</span>
        </div>
        <input
          type="range"
          min={-5}
          max={100}
          step={0.01}
          value={x}
          onChange={(e) => setX(Number(e.target.value))}
          className="w-full accent-emerald-400"
        />
      </label>
      <div className="mt-4 rounded-md border border-neutral-800 bg-neutral-950 px-4 py-3 text-sm">
        <div className="text-neutral-400">
          Smallest <Tex math="n \in \mathbb{N}" /> with{" "}
          <Tex math="n > x" />:
        </div>
        <div className="mt-1 text-lg font-mono text-emerald-300">n = {n}</div>
        <div className="mt-2 text-xs text-neutral-500">
          This would <em>fail</em> if ℕ were bounded above — then{" "}
          <Tex math="\sup \mathbb{N}" /> would exist, and for{" "}
          <Tex math={String.raw`\varepsilon = 1`} /> some <Tex math="n \in \mathbb{N}" /> would
          lie in <Tex math={String.raw`(\sup\mathbb{N} - 1,\ \sup\mathbb{N}]`} />, making{" "}
          <Tex math="n+1 > \sup \mathbb{N}" />, a contradiction.
        </div>
      </div>
    </Card>
  )
}

export default function SupInf() {
  return (
    <TopicShell topic={topic}>
      <Section title="Build a set, watch sup and inf">
        <SetBuilder />
      </Section>
      <Section title="ε-characterisation — the workhorse tool">
        <EpsilonGame />
      </Section>
      <Section title="Archimedean property">
        <Archimedean />
      </Section>
      <Section title="LUB axiom — what makes ℝ complete">
        <Card>
          <Tex block math={String.raw`\text{Every nonempty subset of } \mathbb{R} \text{ bounded above has a least upper bound.}`} />
          <p className="mt-3 text-sm text-neutral-400">
            The set{" "}
            <Tex math={String.raw`\{q \in \mathbb{Q} : q^2 < 2\}`} /> is
            bounded above in <Tex math={String.raw`\mathbb{Q}`} /> but has no
            rational supremum — its "least upper bound"{" "}
            <Tex math={String.raw`\sqrt{2}`} /> is irrational. In{" "}
            <Tex math={String.raw`\mathbb{R}`} />, the LUB axiom fixes this:
            every such gap is filled by a real number.
          </p>
        </Card>
      </Section>
    </TopicShell>
  )
}
