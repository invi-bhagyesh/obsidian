import { useEffect, useMemo, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Play, Pause, RotateCcw, FastForward } from "lucide-react"
import Tex from "../../components/Tex"
import TopicShell, { Section, Card } from "../../components/TopicShell"
import { TOPICS } from "../../topics"

const topic = TOPICS.find((t) => t.slug === "ra/countability")!

// ============ Cantor's pairing (diagonal enumeration of ℕ × ℕ) ============
function cantorIndex(n: number): { p: number; q: number } {
  // walk anti-diagonals: (1,1), (1,2), (2,1), (1,3), (2,2), (3,1), ...
  let k = 0
  let idx = 0
  while (true) {
    k++
    for (let i = 1; i <= k; i++) {
      idx++
      if (idx === n) {
        const j = k - i + 1
        // zig-zag direction: go up on odd k, down on even k (aesthetic)
        if (k % 2 === 0) return { p: i, q: j }
        return { p: j, q: i }
      }
    }
  }
}

function CantorPairing() {
  const [n, setN] = useState(1)
  const [playing, setPlaying] = useState(false)
  const GRID = 8

  useEffect(() => {
    if (!playing) return
    const t = setInterval(() => {
      setN((prev) => {
        if (prev >= 36) {
          setPlaying(false)
          return prev
        }
        return prev + 1
      })
    }, 420)
    return () => clearInterval(t)
  }, [playing])

  const path = useMemo(() => {
    const arr: { p: number; q: number; n: number }[] = []
    for (let i = 1; i <= n; i++) arr.push({ ...cantorIndex(i), n: i })
    return arr
  }, [n])

  // grid cell size
  const size = 44
  const W = size * (GRID + 1) + 30
  const H = size * (GRID + 1) + 30
  const cx = (i: number) => 30 + (i - 0.5) * size
  const cy = (i: number) => 30 + (i - 0.5) * size

  return (
    <Card>
      <p className="text-sm text-neutral-400 mb-3">
        <strong className="text-neutral-200">ℚ is countable.</strong> Walk ℕ × ℕ
        along finite anti-diagonals — every pair <Tex math="(p, q)" /> is hit in
        finitely many steps. Skipping duplicates (non-coprime pairs) gives a
        bijection <Tex math={String.raw`\mathbb{N} \to \mathbb{Q}_{>0}`} />.
      </p>

      <div className="flex items-center gap-2 mb-4">
        <button
          onClick={() => setPlaying((p) => !p)}
          className="inline-flex items-center gap-1.5 rounded-md bg-indigo-500/20 border border-indigo-500/50 px-3 py-1.5 text-sm hover:bg-indigo-500/30"
        >
          {playing ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
          {playing ? "pause" : "play"}
        </button>
        <button
          onClick={() => {
            setN(1)
            setPlaying(false)
          }}
          className="inline-flex items-center gap-1.5 rounded-md border border-neutral-800 px-3 py-1.5 text-sm hover:bg-neutral-900"
        >
          <RotateCcw className="h-3.5 w-3.5" /> reset
        </button>
        <button
          onClick={() => setN((x) => Math.min(36, x + 1))}
          className="rounded-md border border-neutral-800 px-3 py-1.5 text-sm hover:bg-neutral-900"
        >
          +1
        </button>
        <button
          onClick={() => setN(36)}
          className="inline-flex items-center gap-1.5 rounded-md border border-neutral-800 px-3 py-1.5 text-sm hover:bg-neutral-900"
        >
          <FastForward className="h-3.5 w-3.5" /> fill
        </button>
        <span className="ml-auto text-xs text-neutral-400 font-mono">
          step {n} / 36
        </span>
      </div>

      <svg width={W} height={H} className="block max-w-full rounded-md bg-neutral-950 border border-neutral-800">
        {/* grid */}
        {Array.from({ length: GRID + 1 }, (_, i) => i).map((i) => (
          <g key={`g${i}`}>
            <line
              x1={30 + i * size}
              y1={30}
              x2={30 + i * size}
              y2={30 + GRID * size}
              stroke="#1f2937"
            />
            <line
              x1={30}
              y1={30 + i * size}
              x2={30 + GRID * size}
              y2={30 + i * size}
              stroke="#1f2937"
            />
          </g>
        ))}
        {/* axis labels */}
        {Array.from({ length: GRID }, (_, i) => i + 1).map((i) => (
          <g key={`ax${i}`}>
            <text
              x={cx(i)}
              y={22}
              textAnchor="middle"
              fontSize="11"
              fill="#71717a"
              fontFamily="ui-monospace, monospace"
            >
              {i}
            </text>
            <text
              x={22}
              y={cy(i) + 4}
              textAnchor="end"
              fontSize="11"
              fill="#71717a"
              fontFamily="ui-monospace, monospace"
            >
              {i}
            </text>
          </g>
        ))}
        {/* path polyline */}
        {path.length > 1 && (
          <motion.polyline
            points={path.map((p) => `${cx(p.p)},${cy(p.q)}`).join(" ")}
            fill="none"
            stroke="#a78bfa"
            strokeWidth={2}
            strokeLinejoin="round"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.3 }}
          />
        )}
        {/* points */}
        <AnimatePresence>
          {path.map((p) => {
            const coprime = gcd(p.p, p.q) === 1
            return (
              <motion.g
                key={`${p.n}-${p.p}-${p.q}`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              >
                <circle
                  cx={cx(p.p)}
                  cy={cy(p.q)}
                  r={coprime ? 9 : 5}
                  fill={coprime ? "#fbbf24" : "#52525b"}
                  stroke="#0b0d10"
                  strokeWidth={2}
                />
                {coprime && (
                  <text
                    x={cx(p.p)}
                    y={cy(p.q) + 3}
                    textAnchor="middle"
                    fontSize="9"
                    fill="#0b0d10"
                    fontFamily="ui-monospace, monospace"
                  >
                    {p.p}/{p.q}
                  </text>
                )}
              </motion.g>
            )
          })}
        </AnimatePresence>
      </svg>

      <p className="mt-3 text-xs text-neutral-500">
        Yellow = new coprime pair (counts as a fresh positive rational). Grey =
        duplicate (e.g. 2/2 = 1/1). Grid axis is <Tex math="p" /> (right) and{" "}
        <Tex math="q" /> (down).
      </p>
    </Card>
  )
}

function gcd(a: number, b: number): number {
  a = Math.abs(a); b = Math.abs(b)
  while (b) [a, b] = [b, a % b]
  return a || 1
}

// ============ Cantor diagonalization ============
function CantorDiagonal() {
  const N_ROWS = 10
  const N_DIGITS = 12

  // seed a reproducible list of "reals" in [0,1)
  const list = useMemo(() => {
    const rng = mulberry32(42)
    return Array.from({ length: N_ROWS }, () => {
      let s = "0."
      for (let i = 0; i < N_DIGITS; i++) s += Math.floor(rng() * 10).toString()
      return s
    })
  }, [])

  const [step, setStep] = useState(0) // 0..N_ROWS; number of flipped diagonal digits
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    if (!playing) return
    const t = setInterval(() => {
      setStep((prev) => {
        if (prev >= N_ROWS) {
          setPlaying(false)
          return prev
        }
        return prev + 1
      })
    }, 520)
    return () => clearInterval(t)
  }, [playing])

  const diagDigits = list.map((s, i) => s[2 + i]) // skip "0."
  const flipDigit = (d: string) => {
    // map d to a different digit, avoiding 0 and 9 to avoid ambiguous reps
    const n = Number(d)
    return n === 5 ? "3" : "5"
  }
  const antiDiag = diagDigits.map((d) => flipDigit(d))

  const antiDiagPartial = "0." + antiDiag.slice(0, step).join("") + "…"

  return (
    <Card>
      <p className="text-sm text-neutral-400 mb-3">
        <strong className="text-neutral-200">ℝ is uncountable.</strong> Suppose
        someone hands you a list <Tex math={String.raw`x_1, x_2, x_3, \ldots`} />{" "}
        of every real in <Tex math="[0, 1)" />. Build a new real{" "}
        <Tex math="d" /> differing from <Tex math={String.raw`x_n`} /> in the{" "}
        <Tex math="n" />-th decimal place — then <Tex math="d" /> cannot be on
        the list.
      </p>

      <div className="flex items-center gap-2 mb-4">
        <button
          onClick={() => setPlaying((p) => !p)}
          className="inline-flex items-center gap-1.5 rounded-md bg-rose-500/20 border border-rose-500/50 px-3 py-1.5 text-sm hover:bg-rose-500/30"
        >
          {playing ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
          {playing ? "pause" : "flip"}
        </button>
        <button
          onClick={() => {
            setStep(0)
            setPlaying(false)
          }}
          className="inline-flex items-center gap-1.5 rounded-md border border-neutral-800 px-3 py-1.5 text-sm hover:bg-neutral-900"
        >
          <RotateCcw className="h-3.5 w-3.5" /> reset
        </button>
        <span className="ml-auto text-xs text-neutral-400 font-mono">
          flipped {step} / {N_ROWS}
        </span>
      </div>

      <div className="rounded-md border border-neutral-800 bg-neutral-950 overflow-x-auto">
        <table className="min-w-full text-sm font-mono">
          <tbody>
            {list.map((s, i) => {
              const digits = s.slice(2).split("")
              return (
                <tr key={i} className="border-b border-neutral-800/60 last:border-0">
                  <td className="px-3 py-1.5 text-neutral-500">
                    x<sub>{i + 1}</sub> =
                  </td>
                  <td className="py-1.5 text-neutral-300 tracking-wider">
                    0.
                    {digits.map((d, j) => {
                      const isDiag = j === i
                      const flipped = isDiag && i < step
                      return (
                        <span
                          key={j}
                          className={
                            flipped
                              ? "bg-rose-500/30 text-rose-200 px-0.5 rounded line-through"
                              : isDiag
                              ? "bg-amber-500/20 text-amber-200 px-0.5 rounded"
                              : ""
                          }
                        >
                          {d}
                        </span>
                      )
                    })}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-4 rounded-md border border-rose-500/40 bg-rose-500/10 px-3 py-2">
        <div className="text-xs uppercase tracking-wider text-rose-300">
          anti-diagonal
        </div>
        <div className="mt-1 text-lg font-mono text-rose-200">
          d = {antiDiagPartial}
        </div>
        <div className="mt-1 text-xs text-rose-200/80">
          differs from <Tex math={String.raw`x_n`} /> in digit{" "}
          <Tex math="n" /> for every <Tex math="n \leq" /> {step}
        </div>
      </div>

      <p className="mt-3 text-xs text-neutral-500">
        Therefore <em>no</em> enumeration of <Tex math="[0, 1)" /> can be
        complete — <Tex math="[0, 1)" /> (and hence{" "}
        <Tex math={String.raw`\mathbb{R}`} />) is uncountable.
      </p>
    </Card>
  )
}

function mulberry32(a: number) {
  return function () {
    let t = (a += 0x6d2b79f5)
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// ============ Hilbert's hotel ============
function HilbertHotel() {
  const N = 12
  const [arrived, setArrived] = useState(false)
  const [shifted, setShifted] = useState(false)

  const cellW = 44
  const gap = 6
  const totalW = N * (cellW + gap) + 80
  const H = 120

  const reset = () => {
    setArrived(false)
    setShifted(false)
  }

  return (
    <Card>
      <p className="text-sm text-neutral-400 mb-3">
        <strong className="text-neutral-200">Hilbert's hotel.</strong> A hotel
        with ℕ rooms, every room full. A new guest arrives — no problem: move
        the occupant of room <Tex math="n" /> to room <Tex math="n+1" />, and
        place the newcomer in room 1. Infinity is Dedekind-infinite: it has a
        proper subset equivalent to itself.
      </p>

      <div className="flex items-center gap-2 mb-4">
        <button
          onClick={() => setArrived(true)}
          disabled={arrived}
          className="inline-flex items-center gap-1.5 rounded-md bg-amber-500/20 border border-amber-500/50 px-3 py-1.5 text-sm hover:bg-amber-500/30 disabled:opacity-40"
        >
          guest arrives
        </button>
        <button
          onClick={() => setShifted(true)}
          disabled={!arrived || shifted}
          className="inline-flex items-center gap-1.5 rounded-md bg-indigo-500/20 border border-indigo-500/50 px-3 py-1.5 text-sm hover:bg-indigo-500/30 disabled:opacity-40"
        >
          shift n → n+1
        </button>
        <button
          onClick={reset}
          className="inline-flex items-center gap-1.5 rounded-md border border-neutral-800 px-3 py-1.5 text-sm hover:bg-neutral-900"
        >
          <RotateCcw className="h-3.5 w-3.5" /> reset
        </button>
      </div>

      <div className="relative overflow-hidden rounded-md border border-neutral-800 bg-neutral-950 p-4" style={{ minWidth: 0 }}>
        <svg width={totalW} height={H} className="block max-w-full">
          {/* new guest icon */}
          <AnimatePresence>
            {arrived && (
              <motion.g
                key="new"
                initial={{ x: -40, opacity: 0 }}
                animate={{
                  x: shifted ? 20 + 0 * (cellW + gap) + cellW / 2 - 10 : 0,
                  y: shifted ? 30 : 30,
                  opacity: 1,
                }}
                transition={{ duration: 0.6 }}
                exit={{ opacity: 0 }}
              >
                <circle cx={20} cy={60} r={11} fill="#fbbf24" stroke="#0b0d10" strokeWidth={2} />
                <text
                  x={20}
                  y={64}
                  textAnchor="middle"
                  fontSize="12"
                  fontFamily="ui-monospace, monospace"
                  fill="#0b0d10"
                >
                  ★
                </text>
              </motion.g>
            )}
          </AnimatePresence>
          {/* rooms */}
          {Array.from({ length: N }).map((_, i) => {
            const roomX = 70 + i * (cellW + gap)
            return (
              <g key={i}>
                <rect
                  x={roomX}
                  y={35}
                  width={cellW}
                  height={50}
                  fill="#111827"
                  stroke="#374151"
                  rx={4}
                />
                <text
                  x={roomX + cellW / 2}
                  y={28}
                  textAnchor="middle"
                  fontSize="11"
                  fill="#71717a"
                  fontFamily="ui-monospace, monospace"
                >
                  {i + 1}
                </text>
              </g>
            )
          })}
          {/* occupants (original) */}
          {Array.from({ length: N }).map((_, i) => {
            // occupant initially at room i (label i+1), shifts to room i+1 (label i+2)
            const targetIdx = shifted ? i + 1 : i
            const x = 70 + targetIdx * (cellW + gap) + cellW / 2
            if (targetIdx >= N && shifted) {
              // slides out to the right
              return (
                <motion.g
                  key={`o${i}`}
                  initial={false}
                  animate={{ x: totalW + 20, opacity: 0 }}
                  transition={{ duration: 0.7, delay: i * 0.02 }}
                >
                  <circle cx={70 + i * (cellW + gap) + cellW / 2} cy={60} r={11} fill="#60a5fa" />
                  <text x={70 + i * (cellW + gap) + cellW / 2} y={64} textAnchor="middle" fontSize="11" fontFamily="ui-monospace, monospace" fill="#0b0d10">
                    {i + 1}
                  </text>
                </motion.g>
              )
            }
            return (
              <motion.g
                key={`o${i}`}
                initial={false}
                animate={{ x, y: 60 }}
                transition={{ type: "spring", stiffness: 200, damping: 25, delay: i * 0.03 }}
              >
                <circle r={11} fill="#60a5fa" stroke="#0b0d10" strokeWidth={2} />
                <text y={4} textAnchor="middle" fontSize="11" fontFamily="ui-monospace, monospace" fill="#0b0d10">
                  {i + 1}
                </text>
              </motion.g>
            )
          })}
          {/* new guest into room 1 */}
          {shifted && (
            <motion.g
              initial={{ x: 0, opacity: 0 }}
              animate={{ x: 70 + cellW / 2, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <circle cy={60} r={11} fill="#fbbf24" stroke="#0b0d10" strokeWidth={2} />
              <text y={64} textAnchor="middle" fontSize="12" fontFamily="ui-monospace, monospace" fill="#0b0d10">
                ★
              </text>
            </motion.g>
          )}
        </svg>
      </div>

      <p className="mt-3 text-xs text-neutral-500">
        … {N + 1}, {N + 2}, … continue forever. The new guest fit because
        ℕ ∼ ℕ ∪ {"{"}★{"}"} — both are countably infinite.
      </p>
    </Card>
  )
}

// ============ Countable union of countables ============
function UnionOfCountables() {
  const [rows, setRows] = useState(3)
  const path = useMemo(() => {
    // Cantor's diagonal argument again: enumerate pairs (i,j) with i ≤ rows
    const arr: { i: number; j: number }[] = []
    for (let s = 2; s <= 2 * rows + 8; s++) {
      for (let i = 1; i < s; i++) {
        const j = s - i
        if (i >= 1 && i <= rows && j >= 1) arr.push({ i, j })
      }
    }
    return arr.slice(0, rows * 7)
  }, [rows])
  const [n, setN] = useState(1)
  const [playing, setPlaying] = useState(false)
  useEffect(() => {
    if (!playing) return
    const t = setInterval(() => {
      setN((x) => {
        if (x >= path.length) {
          setPlaying(false)
          return x
        }
        return x + 1
      })
    }, 200)
    return () => clearInterval(t)
  }, [playing, path.length])

  const cell = 36
  const W = cell * 8 + 60
  const H = cell * rows + 60
  const cx = (j: number) => 50 + (j - 0.5) * cell
  const cy = (i: number) => 40 + (i - 0.5) * cell

  const pts = path.slice(0, n)

  return (
    <Card>
      <p className="text-sm text-neutral-400 mb-3">
        <strong className="text-neutral-200">A countable union of countable sets is countable.</strong>{" "}
        Each row is a countable set <Tex math={String.raw`A_i = \{a_{i,1}, a_{i,2}, \ldots\}`} />;
        the diagonal walk enumerates the union <Tex math={String.raw`\bigcup_{i \in \mathbb{N}} A_i`} />.
      </p>

      <div className="flex items-center gap-3 mb-4">
        <label className="text-xs text-neutral-500 font-mono">rows</label>
        <input
          type="range"
          min={2}
          max={6}
          value={rows}
          onChange={(e) => {
            setRows(Number(e.target.value))
            setN(1)
            setPlaying(false)
          }}
          className="w-40 accent-emerald-400"
        />
        <span className="font-mono text-neutral-300">{rows}</span>
        <button
          onClick={() => setPlaying((p) => !p)}
          className="inline-flex items-center gap-1.5 rounded-md bg-emerald-500/20 border border-emerald-500/50 px-3 py-1.5 text-sm hover:bg-emerald-500/30"
        >
          {playing ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
          {playing ? "pause" : "play"}
        </button>
        <button
          onClick={() => {
            setN(1)
            setPlaying(false)
          }}
          className="inline-flex items-center gap-1.5 rounded-md border border-neutral-800 px-3 py-1.5 text-sm hover:bg-neutral-900"
        >
          <RotateCcw className="h-3.5 w-3.5" /> reset
        </button>
      </div>

      <svg width={W} height={H} className="block max-w-full rounded-md bg-neutral-950 border border-neutral-800">
        {Array.from({ length: rows }, (_, i) => (
          <text
            key={`r${i}`}
            x={30}
            y={cy(i + 1) + 4}
            textAnchor="end"
            fontSize="11"
            fill="#71717a"
            fontFamily="ui-monospace, monospace"
          >
            A<tspan baselineShift="sub" fontSize="8">{i + 1}</tspan>
          </text>
        ))}
        {Array.from({ length: rows }).map((_, i) =>
          Array.from({ length: 8 }).map((__, j) => (
            <circle
              key={`${i}-${j}`}
              cx={cx(j + 1)}
              cy={cy(i + 1)}
              r={5}
              fill="#1f2937"
            />
          )),
        )}
        {pts.length > 1 && (
          <polyline
            points={pts.map((p) => `${cx(p.j)},${cy(p.i)}`).join(" ")}
            fill="none"
            stroke="#34d399"
            strokeWidth={2}
          />
        )}
        {pts.map((p, k) => (
          <motion.circle
            key={k}
            cx={cx(p.j)}
            cy={cy(p.i)}
            r={7}
            fill="#34d399"
            stroke="#0b0d10"
            strokeWidth={2}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
          />
        ))}
      </svg>
    </Card>
  )
}

// ============ main page ============
export default function Countability() {
  return (
    <TopicShell topic={topic}>
      <Section title="ℚ is countable — Cantor's zig-zag">
        <CantorPairing />
      </Section>
      <Section title="Countable union of countables">
        <UnionOfCountables />
      </Section>
      <Section title="ℝ is uncountable — the diagonal argument">
        <CantorDiagonal />
      </Section>
      <Section title="Hilbert's hotel">
        <HilbertHotel />
      </Section>
    </TopicShell>
  )
}

