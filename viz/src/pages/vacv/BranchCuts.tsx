import { useEffect, useRef, useState } from "react"
import Tex from "../../components/Tex"
import TopicShell, { Section, Card } from "../../components/TopicShell"
import { TOPICS } from "../../topics"

const topic = TOPICS.find((t) => t.slug === "vacv/branch-cuts")!

type Cut = "neg-real" | "pos-real" | "neg-imag" | "pos-imag"

function argInCut(x: number, y: number, cut: Cut): number {
  const a = Math.atan2(y, x)
  if (cut === "neg-real") return a
  if (cut === "pos-real") {
    let v = a
    if (v < 0) v += 2 * Math.PI
    return v
  }
  if (cut === "pos-imag") {
    let v = a - Math.PI / 2
    if (v > Math.PI) v -= 2 * Math.PI
    if (v < -Math.PI) v += 2 * Math.PI
    return v + Math.PI / 2
  }
  let v = a + Math.PI / 2
  if (v > Math.PI) v -= 2 * Math.PI
  if (v < -Math.PI) v += 2 * Math.PI
  return v - Math.PI / 2
}

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

const CUT_LABELS: Record<Cut, { label: string; tex: string }> = {
  "neg-real": { label: "negative real", tex: String.raw`(-\pi, \pi]` },
  "pos-real": { label: "positive real", tex: String.raw`[0, 2\pi)` },
  "pos-imag": { label: "positive imaginary", tex: String.raw`(-\tfrac{3\pi}{2}, \tfrac{\pi}{2}]` },
  "neg-imag": { label: "negative imaginary", tex: String.raw`(-\tfrac{\pi}{2}, \tfrac{3\pi}{2}]` },
}

function BranchColoring() {
  const [cut, setCut] = useState<Cut>("neg-real")
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const cv = canvasRef.current
    if (!cv) return
    const ctx = cv.getContext("2d")
    if (!ctx) return
    const W = cv.width
    const H = cv.height
    const L = 2.5
    const img = ctx.createImageData(W, H)
    for (let py = 0; py < H; py++) {
      for (let px = 0; px < W; px++) {
        const x = -L + (px / W) * 2 * L
        const y = L - (py / H) * 2 * L
        const r = Math.sqrt(x * x + y * y)
        const arg = argInCut(x, y, cut)
        // hue = arg / (2π) mapped to [0,1)
        const hue = ((arg + Math.PI) / (2 * Math.PI)) % 1
        const u = Math.log(r + 1e-12) / Math.LN2
        const t = u - Math.floor(u)
        const v = 0.35 + 0.55 * t
        const [R, G, B] = hsv2rgb(hue, 1, v)
        const idx = (py * W + px) * 4
        img.data[idx] = R
        img.data[idx + 1] = G
        img.data[idx + 2] = B
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
    // draw branch cut in red
    ctx.strokeStyle = "rgba(244, 63, 94, 0.9)"
    ctx.lineWidth = 2
    ctx.beginPath()
    if (cut === "neg-real") {
      ctx.moveTo(W / 2, H / 2)
      ctx.lineTo(0, H / 2)
    } else if (cut === "pos-real") {
      ctx.moveTo(W / 2, H / 2)
      ctx.lineTo(W, H / 2)
    } else if (cut === "pos-imag") {
      ctx.moveTo(W / 2, H / 2)
      ctx.lineTo(W / 2, 0)
    } else {
      ctx.moveTo(W / 2, H / 2)
      ctx.lineTo(W / 2, H)
    }
    ctx.stroke()
    // origin marker
    ctx.fillStyle = "rgba(255,255,255,0.9)"
    ctx.beginPath()
    ctx.arc(W / 2, H / 2, 3, 0, 2 * Math.PI)
    ctx.fill()
  }, [cut])

  return (
    <Card>
      <p className="text-sm text-neutral-400 mb-3">
        <strong className="text-neutral-200">Branch of log.</strong>{" "}
        <Tex math={String.raw`\log z = \ln |z| + i\arg z`} />. The argument is
        multivalued — pick a branch by choosing where the argument jumps by{" "}
        <Tex math={String.raw`2\pi`} />. The <span className="text-rose-300">red line</span>{" "}
        marks the branch cut where hue discontinuously wraps.
      </p>

      <div className="flex flex-wrap gap-2 mb-3">
        {(Object.keys(CUT_LABELS) as Cut[]).map((c) => (
          <button
            key={c}
            onClick={() => setCut(c)}
            className={`rounded-md border px-2 py-1 text-xs font-mono ${
              cut === c
                ? "border-teal-500/60 bg-teal-500/20 text-teal-200"
                : "border-neutral-800 text-neutral-400 hover:bg-neutral-900"
            }`}
          >
            cut along {CUT_LABELS[c].label}
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

      <div className="mt-3 rounded-md border border-neutral-800 bg-neutral-950 p-3 text-xs text-neutral-400">
        <div>
          Branch: <Tex math={String.raw`\arg z \in `} /> <Tex math={CUT_LABELS[cut].tex} />
        </div>
        <div className="mt-1">
          Crossing the cut jumps <Tex math={String.raw`\mathrm{Im}(\log z)`} /> by{" "}
          <Tex math={String.raw`\pm 2\pi i`} /> — you land on a different sheet.
        </div>
      </div>
    </Card>
  )
}

function RiemannSurface() {
  const [theta, setTheta] = useState(0.5)
  const [phi, setPhi] = useState(0.35)
  const [sheets, setSheets] = useState(3)
  const W = 440
  const H = 360

  // 3D → 2D projection with two angles (theta = yaw, phi = pitch)
  const ct = Math.cos(theta), st = Math.sin(theta)
  const cp = Math.cos(phi), sp = Math.sin(phi)
  const project = (x: number, y: number, z: number): [number, number] => {
    const xr = ct * x - st * y
    const yr = st * x + ct * y
    const yp = cp * yr - sp * z
    const zp = sp * yr + cp * z
    void zp
    return [W / 2 + xr * 80, H / 2 - yp * 80]
  }

  // draw concentric rings on each sheet, where z = arg / (2π) (helicoid height)
  const sheetRings: { path: string; hue: number; k: number }[] = []
  for (let k = 0; k < sheets; k++) {
    // along each sheet, θ goes from 0 to 2π
    for (let rIdx = 1; rIdx <= 3; rIdx++) {
      const r = 0.6 * rIdx
      const pts: string[] = []
      const N = 80
      for (let i = 0; i <= N; i++) {
        const t = (i / N) * 2 * Math.PI
        const x = r * Math.cos(t)
        const y = r * Math.sin(t)
        const totalArg = t + k * 2 * Math.PI
        const z = (totalArg / (2 * Math.PI)) * 0.6 - sheets * 0.3
        const [px, py] = project(x, y, z)
        pts.push(`${px.toFixed(1)},${py.toFixed(1)}`)
      }
      sheetRings.push({
        path: pts.join(" "),
        hue: k,
        k,
      })
    }
  }

  // radial spokes
  const spokes: { path: string; k: number }[] = []
  for (let k = 0; k < sheets; k++) {
    for (let sIdx = 0; sIdx < 8; sIdx++) {
      const t0 = (sIdx / 8) * 2 * Math.PI
      const pts: string[] = []
      for (let i = 0; i <= 20; i++) {
        const r = 0.1 + (i / 20) * 1.8
        const x = r * Math.cos(t0)
        const y = r * Math.sin(t0)
        const totalArg = t0 + k * 2 * Math.PI
        const z = (totalArg / (2 * Math.PI)) * 0.6 - sheets * 0.3
        const [px, py] = project(x, y, z)
        pts.push(`${px.toFixed(1)},${py.toFixed(1)}`)
      }
      spokes.push({ path: pts.join(" "), k })
    }
  }

  const sheetColors = ["#10b981", "#6366f1", "#f59e0b", "#f43f5e", "#a855f7"]

  return (
    <Card>
      <p className="text-sm text-neutral-400 mb-3">
        <strong className="text-neutral-200">Riemann surface of log z.</strong>{" "}
        The log is multivalued because <Tex math={String.raw`\arg z`} /> winds
        by <Tex math={String.raw`2\pi`} /> each turn. Stack infinitely many
        copies of the punctured plane in a helicoid — each full turn climbs one
        sheet, and log becomes single-valued.
      </p>

      <div className="grid md:grid-cols-[1fr_auto] gap-4 items-center">
        <div className="rounded-md border border-neutral-800 bg-neutral-950 p-2">
          <svg width={W} height={H} className="block mx-auto max-w-full">
            {spokes.map((s, i) => (
              <polyline
                key={`s${i}`}
                points={s.path}
                fill="none"
                stroke={sheetColors[s.k % sheetColors.length]}
                strokeWidth={0.7}
                opacity={0.55}
              />
            ))}
            {sheetRings.map((r, i) => (
              <polyline
                key={`r${i}`}
                points={r.path}
                fill="none"
                stroke={sheetColors[r.k % sheetColors.length]}
                strokeWidth={1.3}
                opacity={0.9}
              />
            ))}
          </svg>
        </div>

        <div className="space-y-3 text-xs font-mono text-neutral-400">
          <div>
            <div className="mb-1">yaw (rotate)</div>
            <input
              type="range" min={-Math.PI} max={Math.PI} step={0.01}
              value={theta} onChange={(e) => setTheta(+e.target.value)}
              className="w-full"
            />
          </div>
          <div>
            <div className="mb-1">pitch (tilt)</div>
            <input
              type="range" min={0} max={1.2} step={0.01}
              value={phi} onChange={(e) => setPhi(+e.target.value)}
              className="w-full"
            />
          </div>
          <div>
            <div className="mb-1">sheets: {sheets}</div>
            <input
              type="range" min={1} max={5} step={1}
              value={sheets} onChange={(e) => setSheets(+e.target.value)}
              className="w-full"
            />
          </div>
          <div className="space-y-1">
            {Array.from({ length: sheets }).map((_, k) => (
              <div key={k} className="flex items-center gap-2">
                <span
                  className="inline-block w-3 h-3"
                  style={{ background: sheetColors[k % sheetColors.length] }}
                />
                sheet k={k}, log adds {k}·2πi
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-3 rounded-md border border-neutral-800 bg-neutral-950 p-3 text-xs text-neutral-400">
        <div>
          On sheet <Tex math="k" />:{" "}
          <Tex math={String.raw`\log_k z = \ln |z| + i(\arg z + 2\pi k)`} />.
        </div>
        <div className="mt-1">
          Walking once around the origin takes you from sheet{" "}
          <Tex math="k" /> to sheet <Tex math={String.raw`k+1`} /> — the spiral
          never closes.
        </div>
      </div>
    </Card>
  )
}

function WindingWalk() {
  const [angle, setAngle] = useState(0)
  const W = 380
  const H = 300

  // walk around origin at radius 1
  const N = 120
  const pts: [number, number][] = []
  for (let i = 0; i <= N; i++) {
    const t = (i / N) * angle
    pts.push([Math.cos(t), Math.sin(t)])
  }

  const toScreen = (x: number, y: number): [number, number] => [
    W / 2 + x * 80,
    H / 2 - y * 80,
  ]

  const polyline = pts.map((p) => toScreen(p[0], p[1]).join(",")).join(" ")
  const current = pts[pts.length - 1]
  const [cx, cy] = toScreen(current[0], current[1])

  const logRe = Math.log(1)
  const logIm = angle

  return (
    <Card>
      <p className="text-sm text-neutral-400 mb-3">
        <strong className="text-neutral-200">Winding around the origin.</strong>{" "}
        Watch what log does as you walk counterclockwise along{" "}
        <Tex math="|z| = 1" />: the real part stays at 0, the imaginary part
        climbs with <Tex math={String.raw`\arg z`} />. After one full loop it
        has gained <Tex math={String.raw`2\pi i`} /> — you've jumped a sheet.
      </p>

      <div className="grid md:grid-cols-2 gap-3">
        <div className="rounded-md border border-neutral-800 bg-neutral-950 p-2">
          <div className="text-xs text-neutral-500 px-2 pt-1 font-mono">z-plane</div>
          <svg width={W} height={H} className="block mx-auto max-w-full">
            <circle cx={W / 2} cy={H / 2} r={80} fill="none"
              stroke="#374151" strokeDasharray="2 3" />
            <line x1={0} y1={H / 2} x2={W} y2={H / 2} stroke="#374151" strokeDasharray="2 3" />
            <line x1={W / 2} y1={0} x2={W / 2} y2={H} stroke="#374151" strokeDasharray="2 3" />
            <polyline points={polyline} fill="none"
              stroke="#10b981" strokeWidth={2} />
            <circle cx={cx} cy={cy} r={6} fill="#10b981" />
            <circle cx={W / 2} cy={H / 2} r={3} fill="#f43f5e" />
            <text x={W / 2 + 6} y={H / 2 - 6} fill="#f43f5e"
              fontSize="10" fontFamily="monospace">0</text>
          </svg>
        </div>

        <div className="rounded-md border border-neutral-800 bg-neutral-950 p-2">
          <div className="text-xs text-neutral-500 px-2 pt-1 font-mono">
            log-plane: Re log z, Im log z
          </div>
          <svg width={W} height={H} className="block mx-auto max-w-full">
            <line x1={0} y1={H / 2} x2={W} y2={H / 2} stroke="#374151" strokeDasharray="2 3" />
            <line x1={W / 2} y1={0} x2={W / 2} y2={H} stroke="#374151" strokeDasharray="2 3" />
            {/* sheet boundaries: Im log = kπ */}
            {[-2, -1, 1, 2].map((k) => (
              <line key={k}
                x1={0} y1={H / 2 - k * Math.PI * 30}
                x2={W} y2={H / 2 - k * Math.PI * 30}
                stroke="#6366f1" strokeDasharray="1 4" opacity={0.4} />
            ))}
            <polyline
              points={pts.map((_p, i) => {
                const t = (i / N) * angle
                const x = W / 2 + Math.log(1) * 30
                const y = H / 2 - t * 30
                return `${x},${y}`
              }).join(" ")}
              fill="none" stroke="#f59e0b" strokeWidth={2}
            />
            <circle
              cx={W / 2 + logRe * 30}
              cy={H / 2 - logIm * 30}
              r={6} fill="#f59e0b"
            />
          </svg>
        </div>
      </div>

      <div className="mt-3">
        <div className="mb-1 text-xs font-mono text-neutral-400">
          angle walked: {(angle / Math.PI).toFixed(2)}π (sheet{" "}
          {Math.floor(angle / (2 * Math.PI))})
        </div>
        <input
          type="range" min={0} max={3 * 2 * Math.PI} step={0.01}
          value={angle} onChange={(e) => setAngle(+e.target.value)}
          className="w-full"
        />
      </div>

      <div className="mt-3 rounded-md border border-neutral-800 bg-neutral-950 p-3 text-xs font-mono">
        <div className="text-neutral-400">at current point:</div>
        <div className="mt-1 text-teal-300">
          z = ({current[0].toFixed(3)}, {current[1].toFixed(3)})
        </div>
        <div className="text-amber-300">
          log z = ln 1 + i·{angle.toFixed(3)} = 0 + {angle.toFixed(3)}i
        </div>
        <div className="text-violet-300 mt-1">
          principal value: {(((angle + Math.PI) % (2 * Math.PI)) - Math.PI).toFixed(3)}i{" "}
          (jumps at ±π)
        </div>
      </div>
    </Card>
  )
}

function OtherCuts() {
  return (
    <Card>
      <p className="text-sm text-neutral-400 mb-3">
        <strong className="text-neutral-200">Other multi-valued functions.</strong>{" "}
        Roots and fractional powers inherit the same cut.
      </p>
      <ul className="space-y-3 text-sm text-neutral-300">
        <li className="flex gap-2">
          <span className="text-teal-400 font-mono">·</span>
          <span>
            <Tex math={String.raw`\sqrt{z} = e^{\frac12 \log z}`} /> — two
            sheets. A full loop around 0 gives{" "}
            <Tex math={String.raw`\sqrt{z} \to -\sqrt{z}`} /> (sign flip). Two
            loops restore the value.
          </span>
        </li>
        <li className="flex gap-2">
          <span className="text-teal-400 font-mono">·</span>
          <span>
            <Tex math={String.raw`z^{1/n}`} /> has <Tex math="n" /> sheets;
            loops around 0 cycle through the <Tex math="n" /> roots.
          </span>
        </li>
        <li className="flex gap-2">
          <span className="text-teal-400 font-mono">·</span>
          <span>
            <Tex math={String.raw`z^{\alpha}`} /> with <Tex math={String.raw`\alpha \notin \mathbb{Q}`} /> has
            infinitely many sheets — like log.
          </span>
        </li>
        <li className="flex gap-2">
          <span className="text-teal-400 font-mono">·</span>
          <span>
            <Tex math={String.raw`\sqrt{(z-a)(z-b)}`} /> has a branch cut
            between <Tex math="a" /> and <Tex math="b" /> — two branch points,
            so the cut is finite.
          </span>
        </li>
        <li className="flex gap-2">
          <span className="text-teal-400 font-mono">·</span>
          <span>
            <Tex math={String.raw`\arctan z = \tfrac{1}{2i}\log\frac{1+iz}{1-iz}`} />{" "}
            — branch points at <Tex math={String.raw`\pm i`} />.
          </span>
        </li>
      </ul>
    </Card>
  )
}

export default function BranchCuts() {
  return (
    <TopicShell topic={topic}>
      <Section title="Picking a branch">
        <BranchColoring />
      </Section>
      <Section title="Winding once = climb a sheet">
        <WindingWalk />
      </Section>
      <Section title="Riemann surface (infinite helicoid)">
        <RiemannSurface />
      </Section>
      <Section title="Other multivalued functions">
        <OtherCuts />
      </Section>
    </TopicShell>
  )
}
