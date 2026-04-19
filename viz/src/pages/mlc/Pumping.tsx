import { useMemo, useState } from "react"
import Tex from "../../components/Tex"
import TopicShell, { Section, Card } from "../../components/TopicShell"
import { TOPICS } from "../../topics"

const topic = TOPICS.find((t) => t.slug === "mlc/pumping")!

type Language = {
  id: string
  name: string
  desc: string
  regular: boolean
  // membership check
  inL: (s: string) => boolean
  // for non-regular languages: a "you" function that produces w given adversary's p
  chooseW?: (p: number) => string
  // proof sketch
  proof: string
}

const LANGS: Language[] = [
  {
    id: "anbn",
    name: "aⁿbⁿ",
    desc: "Equal number of a's followed by equal number of b's.",
    regular: false,
    inL: (s) => {
      const m = s.match(/^(a*)(b*)$/)
      if (!m) return false
      return m[1].length === m[2].length
    },
    chooseW: (p) => "a".repeat(p) + "b".repeat(p),
    proof:
      "Given p, pick w = aᵖbᵖ. Any split xyz with |xy| ≤ p forces y ⊆ aᵖ, so y = aᵏ with k ≥ 1. " +
      "Pumping to xy²z gives aᵖ⁺ᵏbᵖ which breaks the count. ✗ not regular.",
  },
  {
    id: "palindromes",
    name: "Palindromes over {a,b}",
    desc: "Strings equal to their reverse.",
    regular: false,
    inL: (s) => [...s].reverse().join("") === s,
    chooseW: (p) => "a".repeat(p) + "b" + "a".repeat(p),
    proof:
      "Given p, pick w = aᵖ b aᵖ. Any split with |xy| ≤ p has y inside the first aᵖ. " +
      "Pumping shifts the count of a's on the left but not the right — no longer a palindrome.",
  },
  {
    id: "squares",
    name: "{ ww : w ∈ {a,b}* }",
    desc: "Strings that are the concatenation of a word with itself.",
    regular: false,
    inL: (s) => {
      if (s.length % 2) return false
      const h = s.length / 2
      return s.slice(0, h) === s.slice(h)
    },
    chooseW: (p) => {
      const w = "a".repeat(p) + "b"
      return w + w
    },
    proof:
      "Pick w = aᵖb aᵖb. Any pumpable y ⊆ aᵖ on the left side changes the length of the first half without matching the second.",
  },
  {
    id: "primes",
    name: "Unary primes {aᵖ : p prime}",
    desc: "aⁿ where n is prime.",
    regular: false,
    inL: (s) => {
      if (![...s].every((c) => c === "a")) return false
      const n = s.length
      if (n < 2) return false
      for (let k = 2; k * k <= n; k++) if (n % k === 0) return false
      return true
    },
    chooseW: (p) => {
      // find prime ≥ p
      let n = Math.max(p, 2)
      while (true) {
        let prime = true
        for (let k = 2; k * k <= n; k++) if (n % k === 0) { prime = false; break }
        if (prime) return "a".repeat(n)
        n++
      }
    },
    proof:
      "Pick a prime n ≥ p and w = aⁿ. For any split with y = aᵏ (k ≥ 1), pump to i = n + 1 copies ⇒ |xyⁿ⁺¹z| = n + nk = n(1+k), composite. ✗",
  },
  {
    id: "even",
    name: "Even length",
    desc: "Strings of even length — regular, passes pumping.",
    regular: true,
    inL: (s) => s.length % 2 === 0,
    proof:
      "Pumping holds: take p = 2. For any w in L with |w| ≥ 2, split as y = (first 2 chars) and pump — length stays even.",
  },
  {
    id: "parens",
    name: "Balanced parens",
    desc: "Balanced parenthesis strings over ( and ).",
    regular: false,
    inL: (s) => {
      let c = 0
      for (const ch of s) {
        if (ch === "(") c++
        else if (ch === ")") { c--; if (c < 0) return false }
        else return false
      }
      return c === 0
    },
    chooseW: (p) => "(".repeat(p) + ")".repeat(p),
    proof:
      "Pick w = (ᵖ)ᵖ. Split with |xy| ≤ p forces y ⊆ (ᵖ. Pumping adds opening parens without matching closes — unbalanced.",
  },
]

function GameCard() {
  const [langId, setLangId] = useState(LANGS[0].id)
  const lang = LANGS.find((L) => L.id === langId)!

  // Adversary (machine) chooses p; You pick w; Adversary picks a split; You pump i.
  const [p, setP] = useState(4)
  const [split, setSplit] = useState({ x: 1, y: 2 }) // y length ≥ 1, x+y ≤ p
  const [iPump, setIPump] = useState(2)

  const w = useMemo(
    () => (lang.chooseW ? lang.chooseW(p) : "a".repeat(p) + "b".repeat(p)),
    [lang, p]
  )

  // clamp split
  const xLen = Math.min(Math.max(0, split.x), Math.max(0, p - 1))
  const yLen = Math.min(Math.max(1, split.y), Math.max(1, p - xLen))
  const zStart = xLen + yLen
  const z = w.slice(zStart)
  const x = w.slice(0, xLen)
  const y = w.slice(xLen, zStart)

  const pumped = x + y.repeat(iPump) + z
  const stillIn = lang.inL(pumped)

  return (
    <Card>
      <p className="text-sm text-neutral-400 mb-3">
        <strong className="text-neutral-200">Adversary game.</strong>{" "}
        If L is regular, there is a pumping length <Tex math="p" /> such that
        for every <Tex math="w \in L" /> with <Tex math="|w| \ge p" />, there
        is a split <Tex math={String.raw`w = xyz`} /> with{" "}
        <Tex math={String.raw`|xy| \le p`} /> and <Tex math={String.raw`|y| \ge 1`} /> so that{" "}
        <Tex math={String.raw`xy^i z \in L`} /> for all{" "}
        <Tex math={String.raw`i \ge 0`} />. To prove non-regularity, play the
        opposite: for every p, you choose w; for every legal split,
        you find an i that breaks it.
      </p>

      <div className="flex flex-wrap gap-1 mb-3">
        {LANGS.map((L) => (
          <button
            key={L.id}
            onClick={() => { setLangId(L.id); setIPump(2) }}
            className={`rounded-md border px-2 py-1 text-xs font-mono ${
              langId === L.id
                ? "border-teal-500/60 bg-teal-500/20 text-teal-200"
                : L.regular
                ? "border-neutral-800 text-neutral-400 hover:bg-neutral-900"
                : "border-rose-700 text-rose-300 hover:bg-rose-900/20"
            }`}
          >
            {L.name}
          </button>
        ))}
      </div>

      <div className="text-xs text-neutral-500 mb-3">{lang.desc}</div>

      <div className="grid md:grid-cols-3 gap-3 text-xs">
        <div className="rounded-md border border-amber-500/30 bg-amber-500/5 p-3">
          <div className="font-mono text-amber-300 mb-2">1. adversary picks p</div>
          <input type="range" min={2} max={10} step={1}
            value={p} onChange={(e) => setP(+e.target.value)}
            className="w-full" />
          <div className="font-mono text-neutral-300 mt-1">p = {p}</div>
        </div>
        <div className="rounded-md border border-teal-500/30 bg-teal-500/5 p-3">
          <div className="font-mono text-teal-300 mb-2">2. you pick w (suggested)</div>
          <div className="font-mono text-neutral-200 break-all">{w}</div>
          <div className="text-[10px] text-neutral-500 mt-1">|w| = {w.length}</div>
        </div>
        <div className="rounded-md border border-violet-500/30 bg-violet-500/5 p-3">
          <div className="font-mono text-violet-300 mb-2">3. adversary splits w = xyz</div>
          <div className="space-y-1">
            <div>
              <span className="font-mono text-neutral-400">|x| = </span>
              <input type="range" min={0} max={p - 1} step={1}
                value={xLen} onChange={(e) => setSplit({ x: +e.target.value, y: yLen })}
                className="w-32 align-middle" />
              <span className="font-mono text-neutral-300 ml-2">{xLen}</span>
            </div>
            <div>
              <span className="font-mono text-neutral-400">|y| = </span>
              <input type="range" min={1} max={Math.max(1, p - xLen)} step={1}
                value={yLen} onChange={(e) => setSplit({ x: xLen, y: +e.target.value })}
                className="w-32 align-middle" />
              <span className="font-mono text-neutral-300 ml-2">{yLen}</span>
            </div>
            <div className="text-[10px] text-neutral-500">|xy| ≤ p: {xLen + yLen} ≤ {p} ✓</div>
          </div>
        </div>
      </div>

      <div className="mt-3 rounded-md border border-neutral-800 bg-neutral-950 p-3">
        <div className="text-xs font-mono text-neutral-400 mb-2">current split:</div>
        <div className="flex font-mono text-sm">
          <span className="text-teal-300">{x || "ε"}</span>
          <span className="text-neutral-500 mx-0.5">·</span>
          <span className="text-amber-300 underline underline-offset-2">{y}</span>
          <span className="text-neutral-500 mx-0.5">·</span>
          <span className="text-violet-300">{z || "ε"}</span>
        </div>

        <div className="mt-3 text-xs font-mono text-neutral-400">
          4. you pump to i = {iPump}:
        </div>
        <input type="range" min={0} max={5} step={1}
          value={iPump} onChange={(e) => setIPump(+e.target.value)}
          className="w-full mt-1" />

        <div className="mt-2 text-sm font-mono break-all">
          <span className="text-teal-300">{x || "ε"}</span>
          <span className="text-amber-300 underline underline-offset-2">
            {iPump === 0 ? "ε" : y.repeat(iPump)}
          </span>
          <span className="text-violet-300">{z || "ε"}</span>
        </div>

        <div className={`mt-3 rounded-md border px-3 py-2 text-xs font-mono inline-block ${
          stillIn
            ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-200"
            : "border-rose-500/40 bg-rose-500/10 text-rose-200"
        }`}>
          xy<sup>{iPump}</sup>z {stillIn ? "∈ L" : "∉ L"} — L {stillIn ? "survives this pump" : "broken, split refuted!"}
        </div>

        {!lang.regular && !stillIn && (
          <div className="mt-2 text-xs text-rose-300">
            Found a counterexample for this split. In a full proof you'd show
            this works for <em>all</em> legal splits (not just the one you
            picked).
          </div>
        )}
      </div>

      <div className="mt-3 rounded-md border border-neutral-800 bg-neutral-950 p-3 text-xs text-neutral-400">
        <div className="font-mono text-neutral-300 mb-1">proof sketch:</div>
        {lang.proof}
      </div>
    </Card>
  )
}

function LemmaCard() {
  return (
    <Card>
      <p className="text-sm text-neutral-400 mb-3">
        <strong className="text-neutral-200">Pumping Lemma (for regular languages).</strong>
      </p>
      <div className="rounded-md border border-neutral-800 bg-neutral-950 p-3 text-sm text-neutral-300">
        <p className="mb-2">
          If <Tex math="L" /> is regular, then there exists a pumping length{" "}
          <Tex math={String.raw`p \ge 1`} /> such that every{" "}
          <Tex math={String.raw`w \in L`} /> with{" "}
          <Tex math={String.raw`|w| \ge p`} /> can be written as{" "}
          <Tex math={String.raw`w = xyz`} /> with:
        </p>
        <ul className="space-y-1 ml-4 text-xs font-mono">
          <li>· |y| ≥ 1</li>
          <li>· |xy| ≤ p</li>
          <li>· for all i ≥ 0: xy<sup>i</sup>z ∈ L</li>
        </ul>
        <p className="mt-3">
          <strong className="text-teal-300">Why it's true:</strong> a DFA with
          p states that reads w of length ≥ p must revisit some state — that
          loop is y. Traversing the loop 0, 1, 2, … times stays in L.
        </p>
        <p className="mt-2">
          <strong className="text-amber-300">Limitation.</strong> It's a
          necessary condition — every regular language satisfies it. But some
          non-regular languages satisfy it too (pumping is not sufficient).
          For sharper non-regularity proofs: Myhill–Nerode.
        </p>
      </div>
    </Card>
  )
}

function Strategy() {
  return (
    <Card>
      <p className="text-sm text-neutral-400 mb-3">
        <strong className="text-neutral-200">How to prove L is not regular.</strong>{" "}
        Play as "You" in the adversary game:
      </p>
      <ol className="space-y-2 text-sm text-neutral-300 list-decimal pl-5">
        <li>
          Assume L is regular with pumping length <Tex math="p" /> (adversary
          picks p, but since we can't see it, we treat p as arbitrary).
        </li>
        <li>
          <strong>You pick w</strong> ∈ L with <Tex math={String.raw`|w| \ge p`} />{" "}
          — choose cleverly so any legal split is forced to land somewhere
          specific. Classic trick: use aᵖbᵖ so y lies inside aᵖ.
        </li>
        <li>
          <strong>For every legal split</strong>{" "}
          <Tex math={String.raw`w = xyz`} /> with <Tex math={String.raw`|xy| \le p`} />,{" "}
          <Tex math={String.raw`|y| \ge 1`} />, pick an{" "}
          <Tex math={String.raw`i \ge 0`} /> such that{" "}
          <Tex math={String.raw`xy^i z \notin L`} />.
        </li>
        <li>Contradiction ⇒ L not regular.</li>
      </ol>
    </Card>
  )
}

export default function Pumping() {
  return (
    <TopicShell topic={topic}>
      <Section title="The lemma">
        <LemmaCard />
      </Section>
      <Section title="Play the adversary game">
        <GameCard />
      </Section>
      <Section title="Proof strategy">
        <Strategy />
      </Section>
    </TopicShell>
  )
}
