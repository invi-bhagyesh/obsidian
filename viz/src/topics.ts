export type Subject = "RA" | "AS" | "VACV" | "MLC"

export interface Topic {
  slug: string
  subject: Subject
  number: number
  title: string
  blurb: string
  status: "live" | "soon"
}

export const SUBJECTS: Record<Subject, { name: string; color: string }> = {
  RA: { name: "Real Analysis", color: "from-sky-500 to-indigo-500" },
  AS: { name: "Algebraic Structures", color: "from-amber-500 to-rose-500" },
  VACV: { name: "Vector Analysis & Complex Variables", color: "from-emerald-500 to-teal-500" },
  MLC: { name: "Mathematical Logic & Computability", color: "from-violet-500 to-fuchsia-500" },
}

export const TOPICS: Topic[] = [
  // --- Real Analysis ---
  { slug: "ra/real-numbers", subject: "RA", number: 1, title: "Real Number System & Completeness",
    blurb: "Field axioms, order, and why ℚ has holes — watch a Cauchy sequence converge to √2.", status: "live" },
  { slug: "ra/inequalities", subject: "RA", number: 2, title: "Inequalities",
    blurb: "AM–GM, Cauchy–Schwarz, triangle inequality — visualized geometrically.", status: "live" },
  { slug: "ra/sup-inf", subject: "RA", number: 3, title: "Supremum & Infimum",
    blurb: "Build sets on a number line, watch sup and inf emerge.", status: "live" },
  { slug: "ra/countability", subject: "RA", number: 4, title: "Finite, Countable, Uncountable",
    blurb: "Cantor diagonalization, animated.", status: "live" },
  { slug: "ra/topology-of-r", subject: "RA", number: 5, title: "Open & Closed Sets",
    blurb: "Interior, boundary, closure — drag points, watch regions update.", status: "live" },
  { slug: "ra/compactness", subject: "RA", number: 6, title: "Compactness",
    blurb: "Heine–Borel: find a finite subcover of any open cover.", status: "live" },
  { slug: "ra/sequences", subject: "RA", number: 7, title: "Sequences & Limits",
    blurb: "ε–N game. Pick ε, find N.", status: "live" },
  { slug: "ra/cauchy", subject: "RA", number: 8, title: "Cauchy Sequences",
    blurb: "Terms cluster together without knowing the limit.", status: "live" },
  { slug: "ra/series", subject: "RA", number: 9, title: "Series & Convergence Tests",
    blurb: "Comparison, ratio, root, integral — live test outcomes.", status: "live" },
  { slug: "ra/continuity", subject: "RA", number: 10, title: "Continuity (ε–δ)",
    blurb: "Pick ε, find δ. Watch the envelope collapse.", status: "live" },
  { slug: "ra/differentiation", subject: "RA", number: 11, title: "Differentiation & MVT",
    blurb: "Rolle, mean value theorem, tangent lines that must exist.", status: "live" },
  { slug: "ra/riemann", subject: "RA", number: 12, title: "Riemann(-Stieltjes) Integral",
    blurb: "Upper/lower Darboux sums squeeze together.", status: "live" },

  // --- Algebraic Structures ---
  { slug: "as/groups", subject: "AS", number: 1, title: "Groups — Cayley Tables",
    blurb: "Z_n, D_n, S_n side by side. Click cells to trace products.", status: "live" },
  { slug: "as/subgroup-lattice", subject: "AS", number: 2, title: "Subgroup Lattice",
    blurb: "Hasse diagram of subgroups for small groups.", status: "live" },
  { slug: "as/cosets", subject: "AS", number: 3, title: "Cosets & Lagrange",
    blurb: "Partition a group by left cosets of H.", status: "live" },
  { slug: "as/quotient", subject: "AS", number: 4, title: "Quotient Groups",
    blurb: "Collapse cosets into a new group.", status: "live" },
  { slug: "as/homomorphisms", subject: "AS", number: 5, title: "Homomorphisms & Kernels",
    blurb: "Drag an arrow between groups, see what's preserved.", status: "live" },
  { slug: "as/group-actions", subject: "AS", number: 6, title: "Group Actions",
    blurb: "Orbits, stabilizers, Burnside's theorem.", status: "live" },
  { slug: "as/rings", subject: "AS", number: 7, title: "Rings & Ideals",
    blurb: "Two operation tables. Watch ideals absorb products.", status: "live" },
  { slug: "as/polynomial-rings", subject: "AS", number: 8, title: "Polynomial Rings",
    blurb: "Division, gcd, irreducibility in F[x].", status: "live" },
  { slug: "as/fields", subject: "AS", number: 9, title: "Fields & Extensions",
    blurb: "Build F_p, F_{p^n}, see minimal polynomials.", status: "live" },

  // --- VACV ---
  { slug: "vacv/vector-fields", subject: "VACV", number: 1, title: "Vector Fields",
    blurb: "Drag to reshape a field, see streamlines in real time.", status: "live" },
  { slug: "vacv/divergence-curl", subject: "VACV", number: 2, title: "Divergence & Curl",
    blurb: "Scalar-field heatmaps of ∇·F and ∇×F.", status: "live" },
  { slug: "vacv/line-integrals", subject: "VACV", number: 3, title: "Line Integrals",
    blurb: "Draw a curve, watch ∫F·dr accumulate.", status: "live" },
  { slug: "vacv/greens-stokes", subject: "VACV", number: 4, title: "Green, Stokes, Divergence Theorems",
    blurb: "Boundary vs. interior — side-by-side computation.", status: "live" },
  { slug: "vacv/complex-functions", subject: "VACV", number: 5, title: "Complex Functions — Domain Coloring",
    blurb: "z² , 1/z, exp z rendered via hue = arg, brightness = |f|.", status: "live" },
  { slug: "vacv/cr-equations", subject: "VACV", number: 6, title: "Cauchy–Riemann",
    blurb: "Conformal maps preserve angles — watch a grid deform.", status: "live" },
  { slug: "vacv/contour-integrals", subject: "VACV", number: 7, title: "Contour Integrals & Residues",
    blurb: "Drag poles inside/outside a contour.", status: "live" },
  { slug: "vacv/branch-cuts", subject: "VACV", number: 8, title: "Branch Cuts of log z",
    blurb: "Multi-sheeted surface of the complex log.", status: "live" },

  // --- MLC ---
  { slug: "mlc/truth-tables", subject: "MLC", number: 1, title: "Truth Tables & Connectives",
    blurb: "Type any formula, get its truth table and NF.", status: "live" },
  { slug: "mlc/cnf-dnf", subject: "MLC", number: 2, title: "CNF / DNF Conversion",
    blurb: "Step-through normalization.", status: "soon" },
  { slug: "mlc/proof-trees", subject: "MLC", number: 3, title: "Proof Trees (Natural Deduction)",
    blurb: "Build proofs in propositional calculus interactively.", status: "soon" },
  { slug: "mlc/modus-ponens", subject: "MLC", number: 4, title: "Axiomatic Propositional Calculus",
    blurb: "Chain axioms and MP to derive theorems.", status: "soon" },
  { slug: "mlc/fol", subject: "MLC", number: 5, title: "First-Order Logic",
    blurb: "Quantifier scope, free/bound variables, substitution.", status: "soon" },
  { slug: "mlc/dfa", subject: "MLC", number: 6, title: "DFA Simulator",
    blurb: "Build a DFA, feed it strings, watch states light up.", status: "soon" },
  { slug: "mlc/nfa", subject: "MLC", number: 7, title: "NFA → DFA",
    blurb: "Subset construction animated.", status: "soon" },
  { slug: "mlc/regex-kleene", subject: "MLC", number: 8, title: "Regex ↔ Automata",
    blurb: "Kleene's theorem, both directions.", status: "soon" },
  { slug: "mlc/pumping", subject: "MLC", number: 9, title: "Pumping Lemma",
    blurb: "Play the adversary game for non-regularity.", status: "soon" },
  { slug: "mlc/turing", subject: "MLC", number: 10, title: "Turing Machines",
    blurb: "Tape animator. Universal TM & halting problem intuition.", status: "soon" },
]
