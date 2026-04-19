// Shared finite-group definitions used across AS pages

export type Group = {
  id: string
  name: string
  tex: string
  elems: string[]
  mul: number[][]
  order: number
  abelian: boolean
  cyclic: boolean
  note?: string
}

export function buildZn(n: number): Group {
  const elems = Array.from({ length: n }, (_, i) => String(i))
  const mul = Array.from({ length: n }, (_, i) =>
    Array.from({ length: n }, (_, j) => (i + j) % n),
  )
  return {
    id: `Z${n}`,
    name: `ℤ/${n}ℤ`,
    tex: String.raw`\mathbb{Z}/${n}\mathbb{Z}`,
    elems,
    mul,
    order: n,
    abelian: true,
    cyclic: true,
    note: `Additive integers mod ${n}. Cyclic of order ${n}.`,
  }
}

export function buildDn(n: number): Group {
  const size = 2 * n
  const label = (i: number) => {
    if (i < n) return i === 0 ? "e" : i === 1 ? "r" : `r${i}`
    const k = i - n
    return k === 0 ? "s" : k === 1 ? "sr" : `sr${k}`
  }
  const elems = Array.from({ length: size }, (_, i) => label(i))
  const decode = (i: number): [number, number] =>
    i < n ? [0, i] : [1, i - n]
  const encode = (s: number, k: number) => ((k % n) + n) % n + (s === 1 ? n : 0)
  const mul = Array.from({ length: size }, (_, i) =>
    Array.from({ length: size }, (_, j) => {
      const [s1, k1] = decode(i)
      const [s2, k2] = decode(j)
      if (s1 === 0) return encode(s2, k1 + k2)
      if (s2 === 0) return encode(1, k1 - k2)
      return encode(0, k1 - k2)
    }),
  )
  return {
    id: `D${n}`,
    name: `D${n}`,
    tex: String.raw`D_{${n}}`,
    elems,
    mul,
    order: 2 * n,
    abelian: n <= 2,
    cyclic: false,
    note: `Dihedral group — symmetries of a regular ${n}-gon.`,
  }
}

export function buildS3(): Group {
  type Perm = [number, number, number]
  const perms: Perm[] = [
    [1, 2, 3],
    [2, 1, 3],
    [3, 2, 1],
    [1, 3, 2],
    [2, 3, 1],
    [3, 1, 2],
  ]
  const labels = ["e", "(12)", "(13)", "(23)", "(123)", "(132)"]
  const compose = (a: Perm, b: Perm): Perm => [b[a[0] - 1], b[a[1] - 1], b[a[2] - 1]]
  const match = (p: Perm) =>
    perms.findIndex((q) => q[0] === p[0] && q[1] === p[1] && q[2] === p[2])
  const mul = perms.map((a) => perms.map((b) => match(compose(a, b))))
  return {
    id: "S3",
    name: "S₃",
    tex: String.raw`S_3`,
    elems: labels,
    mul,
    order: 6,
    abelian: false,
    cyclic: false,
    note: "Smallest non-abelian group.",
  }
}

export function buildV4(): Group {
  return {
    id: "V4",
    name: "V₄",
    tex: String.raw`V_4 = \mathbb{Z}_2 \times \mathbb{Z}_2`,
    elems: ["e", "a", "b", "ab"],
    mul: [
      [0, 1, 2, 3],
      [1, 0, 3, 2],
      [2, 3, 0, 1],
      [3, 2, 1, 0],
    ],
    order: 4,
    abelian: true,
    cyclic: false,
    note: "Klein four-group. Every non-identity element has order 2.",
  }
}

export const GROUPS: Group[] = [
  buildZn(4),
  buildZn(6),
  buildZn(8),
  buildV4(),
  buildDn(3),
  buildDn(4),
  buildS3(),
]

export function elementOrder(G: Group, g: number): number {
  let cur = g
  for (let k = 1; k <= G.order; k++) {
    if (cur === 0) return k
    cur = G.mul[cur][g]
  }
  return -1
}

export function cyclicSubgroup(G: Group, g: number): number[] {
  const out = new Set<number>([0])
  let cur = g
  while (!out.has(cur)) {
    out.add(cur)
    cur = G.mul[cur][g]
  }
  return Array.from(out).sort((a, b) => a - b)
}

// Find all subgroups via closure starting from every subset of generators of size ≤ 2
export function allSubgroups(G: Group): number[][] {
  const seen = new Map<string, number[]>()

  const closure = (seeds: number[]) => {
    const set = new Set<number>([0, ...seeds])
    let changed = true
    while (changed) {
      changed = false
      const arr = Array.from(set)
      for (const a of arr) {
        for (const b of arr) {
          const p = G.mul[a][b]
          if (!set.has(p)) {
            set.add(p)
            changed = true
          }
        }
      }
    }
    const sorted = Array.from(set).sort((a, b) => a - b)
    const key = sorted.join(",")
    if (!seen.has(key)) seen.set(key, sorted)
  }

  // Take closure of all single and pair generators
  for (let i = 0; i < G.order; i++) closure([i])
  for (let i = 0; i < G.order; i++) {
    for (let j = i + 1; j < G.order; j++) closure([i, j])
  }
  return Array.from(seen.values()).sort((a, b) => a.length - b.length)
}

// is H (sorted) ⊆ K (sorted)?
export function isSubset(H: number[], K: number[]): boolean {
  let i = 0
  let j = 0
  while (i < H.length && j < K.length) {
    if (H[i] === K[j]) {
      i++
      j++
    } else if (H[i] > K[j]) {
      j++
    } else {
      return false
    }
  }
  return i === H.length
}

// Is H normal in G?
export function isNormal(G: Group, H: number[]): boolean {
  const set = new Set(H)
  for (let g = 0; g < G.order; g++) {
    for (const h of H) {
      // compute g h g^{-1}
      // find g^{-1}: it's k with g*k = 0
      let gInv = 0
      for (let k = 0; k < G.order; k++) if (G.mul[g][k] === 0) gInv = k
      const conj = G.mul[G.mul[g][h]][gInv]
      if (!set.has(conj)) return false
    }
  }
  return true
}
