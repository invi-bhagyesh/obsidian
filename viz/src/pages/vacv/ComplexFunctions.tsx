import { useEffect, useRef, useState } from "react"
import Tex from "../../components/Tex"
import TopicShell, { Section, Card } from "../../components/TopicShell"
import { TOPICS } from "../../topics"

const topic = TOPICS.find((t) => t.slug === "vacv/complex-functions")!

type C = [number, number]

function cAdd(a: C, b: C): C {
  return [a[0] + b[0], a[1] + b[1]]
}
function cSub(a: C, b: C): C {
  return [a[0] - b[0], a[1] - b[1]]
}
function cMul(a: C, b: C): C {
  return [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]]
}
function cDiv(a: C, b: C): C {
  const d = b[0] * b[0] + b[1] * b[1] + 1e-18
  return [(a[0] * b[0] + a[1] * b[1]) / d, (a[1] * b[0] - a[0] * b[1]) / d]
}
function cExp(a: C): C {
  const e = Math.exp(a[0])
  return [e * Math.cos(a[1]), e * Math.sin(a[1])]
}
function cSin(a: C): C {
  return [Math.sin(a[0]) * Math.cosh(a[1]), Math.cos(a[0]) * Math.sinh(a[1])]
}
function cLog(a: C): C {
  return [0.5 * Math.log(a[0] * a[0] + a[1] * a[1] + 1e-18), Math.atan2(a[1], a[0])]
}
function cPow(a: C, n: number): C {
  let r: C = [1, 0]
  for (let k = 0; k < n; k++) r = cMul(r, a)
  return r
}

type Fn = {
  id: string
  name: string
  tex: string
  f: (z: C) => C
  note: string
}

const FUNCS: Fn[] = [
  {
    id: "sq",
    name: "z²",
    tex: String.raw`f(z) = z^2`,
    f: (z) => cMul(z, z),
    note: "Doubles the argument; zero at origin has order 2.",
  },
  {
    id: "cube",
    name: "z³",
    tex: String.raw`f(z) = z^3`,
    f: (z) => cPow(z, 3),
    note: "Triples the argument; zero of order 3 at origin.",
  },
  {
    id: "inv",
    name: "1/z",
    tex: String.raw`f(z) = 1/z`,
    f: (z) => cDiv([1, 0], z),
    note: "Simple pole at z=0. Hue wraps the opposite way.",
  },
  {
    id: "exp",
    name: "exp z",
    tex: String.raw`f(z) = e^z`,
    f: cExp,
    note: "Periodic with period 2πi. Never zero.",
  },
  {
    id: "log",
    name: "log z",
    tex: String.raw`f(z) = \log z`,
    f: cLog,
    note: "Branch cut on (−∞, 0]. Multivalued on C∖{0}.",
  },
  {
    id: "sin",
    name: "sin z",
    tex: String.raw`f(z) = \sin z`,
    f: cSin,
    note: "Zeros at z = nπ on the real axis.",
  },
  {
    id: "rational",
    name: "(z²-1)/(z²+1)",
    tex: String.raw`f(z) = \frac{z^2 - 1}{z^2 + 1}`,
    f: (z) => cDiv(cSub(cMul(z, z), [1, 0]), cAdd(cMul(z, z), [1, 0])),
    note: "Zeros at ±1; poles at ±i.",
  },
  {
    id: "poly",
    name: "z³ − 1",
    tex: String.raw`f(z) = z^3 - 1`,
    f: (z) => cSub(cPow(z, 3), [1, 0]),
    note: "Three zeros at the cube roots of unity.",
  },
]

// HSV to RGB
function hsv2rgb(h: number, s: number, v: number): [number, number, number] {
  const c = v * s
  const hp = ((h % 1) + 1) % 1 * 6
  const x = c * (1 - Math.abs((hp % 2) - 1))
  let r = 0, g = 0, b = 0
  if (hp < 1) [r, g, b] = [c, x, 0]
  else if (hp < 2) [r, g, b] = [x, c, 0]
  else if (hp < 3) [r, g, b] = [0, c, x]
  else if (hp < 4) [r, g, b] = [0, x, c]
  else if (hp < 5) [r, g, b] = [x, 0, c]
  else [r, g, b] = [c, 0, x]
  const m = v - c
  return [Math.round((r + m) * 255), Math.round((g + m) * 255), Math.round((b + m) * 255)]
}

function DomainColoring() {
  const [id, setId] = useState("sq")
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fn = FUNCS.find((x) => x.id === id)!

  useEffect(() => {
    const cv = canvasRef.current
    if (!cv) return
    const ctx = cv.getContext("2d")
    if (!ctx) return
    const W = cv.width
    const H = cv.height
    const L = 3
    const img = ctx.createImageData(W, H)
    for (let py = 0; py < H; py++) {
      for (let px = 0; px < W; px++) {
        const x = -L + (px / W) * 2 * L
        const y = L - (py / H) * 2 * L
        const w = fn.f([x, y])
        const mag = Math.sqrt(w[0] * w[0] + w[1] * w[1])
        let arg = Math.atan2(w[1], w[0])
        if (arg < 0) arg += 2 * Math.PI
        const hue = arg / (2 * Math.PI)
        // brightness: modulate with log(|w|) to create rings
        const u = Math.log(mag + 1e-12) / Math.LN2
        const t = u - Math.floor(u) // 0..1
        const v = 0.35 + 0.55 * t
        const [r, g, b] = hsv2rgb(hue, 1, v)
        const idx = (py * W + px) * 4
        img.data[idx] = r
        img.data[idx + 1] = g
        img.data[idx + 2] = b
        img.data[idx + 3] = 255
      }
    }
    ctx.putImageData(img, 0, 0)
    // axes
    ctx.strokeStyle = "rgba(255,255,255,0.15)"
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(0, H / 2)
    ctx.lineTo(W, H / 2)
    ctx.moveTo(W / 2, 0)
    ctx.lineTo(W / 2, H)
    ctx.stroke()
  }, [fn])

  return (
    <Card>
      <p className="text-sm text-neutral-400 mb-3">
        <strong className="text-neutral-200">Domain coloring.</strong> Each
        point <Tex math="z" /> in the plane is colored by{" "}
        <Tex math={String.raw`f(z)`} />: hue ={" "}
        <Tex math={String.raw`\arg f(z)`} />, brightness = log-bands of{" "}
        <Tex math={String.raw`|f(z)|`} />.
      </p>

      <div className="flex flex-wrap gap-2 mb-3">
        {FUNCS.map((F) => (
          <button
            key={F.id}
            onClick={() => setId(F.id)}
            className={`rounded-md border px-2 py-1 text-xs font-mono ${
              id === F.id
                ? "border-teal-500/60 bg-teal-500/20 text-teal-200"
                : "border-neutral-800 text-neutral-400 hover:bg-neutral-900"
            }`}
          >
            {F.name}
          </button>
        ))}
      </div>

      <div className="rounded-md border border-neutral-800 bg-neutral-950 p-2">
        <canvas
          ref={canvasRef}
          width={420}
          height={420}
          className="block mx-auto max-w-full"
        />
      </div>

      <div className="mt-3 rounded-md border border-neutral-800 bg-neutral-950 p-3">
        <div className="text-sm text-neutral-200 mb-1">
          <Tex math={fn.tex} />
        </div>
        <div className="text-xs text-neutral-500">{fn.note}</div>
      </div>

      <div className="mt-3 text-xs text-neutral-500 space-y-1">
        <div>
          <strong className="text-neutral-300">Zero:</strong> all colors
          converge. The multiplicity = number of times hue wheels counter-clockwise around it.
        </div>
        <div>
          <strong className="text-neutral-300">Pole:</strong> all colors
          converge too, but hue wheels clockwise (reversed order).
        </div>
        <div>
          <strong className="text-neutral-300">Log bands:</strong> each doubling
          of <Tex math={String.raw`|f|`} /> is one brightness cycle — they pack
          near zeros and spread near poles.
        </div>
      </div>
    </Card>
  )
}

function HueWheel() {
  const sz = 160
  const ctx = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const cv = ctx.current
    if (!cv) return
    const g = cv.getContext("2d")
    if (!g) return
    const img = g.createImageData(sz, sz)
    for (let y = 0; y < sz; y++) {
      for (let x = 0; x < sz; x++) {
        const dx = (x - sz / 2) / (sz / 2)
        const dy = -(y - sz / 2) / (sz / 2)
        const r = Math.sqrt(dx * dx + dy * dy)
        let arg = Math.atan2(dy, dx)
        if (arg < 0) arg += 2 * Math.PI
        const hue = arg / (2 * Math.PI)
        const [R, G, B] = r <= 1 ? hsv2rgb(hue, 1, 0.9) : [11, 13, 16]
        const idx = (y * sz + x) * 4
        img.data[idx] = R
        img.data[idx + 1] = G
        img.data[idx + 2] = B
        img.data[idx + 3] = 255
      }
    }
    g.putImageData(img, 0, 0)
  }, [])

  return (
    <Card>
      <p className="text-sm text-neutral-400 mb-3">
        <strong className="text-neutral-200">Color ↔ complex number.</strong>{" "}
        The legend below shows how angle maps to hue. Red = positive real, cyan
        = negative real, etc.
      </p>
      <div className="flex items-center gap-4">
        <canvas
          ref={ctx}
          width={sz}
          height={sz}
          className="rounded-full border border-neutral-800"
        />
        <ul className="text-xs text-neutral-300 space-y-1 font-mono">
          <li><span className="inline-block w-3 h-3 bg-red-500 align-middle mr-2" />arg 0 — positive real</li>
          <li><span className="inline-block w-3 h-3 bg-yellow-400 align-middle mr-2" />arg π/3</li>
          <li><span className="inline-block w-3 h-3 bg-green-500 align-middle mr-2" />arg 2π/3</li>
          <li><span className="inline-block w-3 h-3 bg-cyan-400 align-middle mr-2" />arg π — negative real</li>
          <li><span className="inline-block w-3 h-3 bg-blue-500 align-middle mr-2" />arg 4π/3</li>
          <li><span className="inline-block w-3 h-3 bg-pink-500 align-middle mr-2" />arg 5π/3</li>
        </ul>
      </div>
    </Card>
  )
}

export default function ComplexFunctions() {
  return (
    <TopicShell topic={topic}>
      <Section title="Color legend">
        <HueWheel />
      </Section>
      <Section title="Domain coloring gallery">
        <DomainColoring />
      </Section>
    </TopicShell>
  )
}
