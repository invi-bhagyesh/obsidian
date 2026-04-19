---
title: "Algebraic Structures — Master Index & Study Guide"
topic: "Algebraic Structures"
course: "MAT 2235"
chapter: 0
tags: [index, roadmap, glossary, theorem-index]
---

# 0. Algebraic Structures — Master Index

Welcome to the comprehensive **Algebraic Structures** study guide, built from the MAT 2235 syllabus. This index is your roadmap through **28 chapters** spanning **5 course outcomes (COs)** that progress from the most elementary notion of a binary operation to the classification of finite fields and the classical impossibility results of Greek geometry.

The guide is self-contained: each chapter provides definitions, theorems with proofs, worked examples, and practice problems. Reading sequentially delivers beginner-to-expert coverage; the dependency graph below supports targeted study.

---

## Reading Path at a Glance

```
CO1 — Foundations of Group Theory
  01 → 02 → 03 → 04 → 05 → 06 → 07 (practice)

CO2 — Cosets, Normality, and Counting
  08 → 09 → 10 → 11 → 12 → 13 → 14 (practice)

CO3 — Actions, Homomorphisms, and Isomorphism Theorems
  15 → 16 → 17 → 18 → 19 → 20 (practice)

CO4 — Ring Theory
  21 → 22 → 23 → 24 → 25 (practice)

CO5 — Fields, Extensions, and Constructibility
  26 → 27 → 28 (practice)
```

Each CO practice chapter compiles 25+ problems with full solutions covering the preceding content chapters.

---

## Chapter Table

| #   | Title                                       | Key ideas                                                                                                                           |     |                                                                                                            |
| --- | ------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | --- | ---------------------------------------------------------------------------------------------------------- |
| 01  | [[01-operations-and-algebraic-structures]]  | Binary operations, closure, magmas, semigroups, monoids; associativity/commutativity; identity and inverse                          |     |                                                                                                            |
| 02  | [[02-symmetries-of-the-plane]]              | Rigid motions, symmetry groups of geometric figures, dihedral groups as motivation                                                  |     |                                                                                                            |
| 03  | [[03-groups-definition-and-examples]]       | Group axioms, $                                                                                                                     | G   | $, examples ($\mathbb Z_n$, $S_n$, $D_n$, $U(n)$, $GL_n$), basic properties                                |
| 04  | [[04-subgroups-generators-cayley]]          | Subgroup test, $\langle S\rangle$, Cayley diagrams, finitely generated groups                                                       |     |                                                                                                            |
| 05  | [[05-permutation-groups-and-dihedral]]      | $S_n$, cycle decomposition, cycle type, sign, $A_n$, dihedral structure                                                             |     |                                                                                                            |
| 06  | [[06-cyclic-groups-and-order]]              | $                                                                                                                                   | a   | $, cyclic groups, subgroup structure of $\mathbb Z_n$, $\langle a^k\rangle = \langle a^{\gcd(n,k)}\rangle$ |
| 07  | [[07-co1-practice-problems]]                | **CO1 problem set** (25+ problems across chapters 01–06)                                                                            |     |                                                                                                            |
| 08  | [[08-equivalence-relations-and-partitions]] | Equivalence relations, equivalence classes, canonical partition ↔ relation bijection                                                |     |                                                                                                            |
| 09  | [[09-cosets-and-lagranges-theorem]]         | Left/right cosets, $[G:H]$, Lagrange's theorem, Fermat's little theorem, Euler's theorem                                            |     |                                                                                                            |
| 10  | [[10-normal-subgroups-and-quotient-groups]] | Normal subgroups, quotient $G/N$, normality characterizations, first examples of $G/N$                                              |     |                                                                                                            |
| 11  | [[11-direct-products]]                      | External/internal direct product, $\|(a,b)\| = \operatorname{lcm}(\|a\|,\|b\|)$, CRT for groups, FTFAG preview                      |     |                                                                                                            |
| 12  | [[12-subgroup-lattice-and-dihedral-groups]] | Subgroup lattice, full classification of subgroups of $D_n$, center, conjugacy, $D_n^{\mathrm{ab}}$                                 |     |                                                                                                            |
| 13  | [[13-burnsides-theorem]]                    | Group action basics, orbit-stabilizer, Burnside/Cauchy-Frobenius, necklaces, cube colorings                                         |     |                                                                                                            |
| 14  | [[14-co2-practice-problems]]                | **CO2 problem set** (25+ problems across chapters 08–13)                                                                            |     |                                                                                                            |
| 15  | [[15-group-actions]]                        | Action = homomorphism $G \to \mathrm{Sym}(X)$, faithful/transitive/regular, Cayley's theorem, class equation preview                |     |                                                                                                            |
| 16  | [[16-centralizer-normalizer-stabilizer]]    | $C_G(a)$, $N_G(S)$, class equation, $p$-groups have nontrivial center, Cauchy's theorem                                             |     |                                                                                                            |
| 17  | [[17-homomorphisms-and-isomorphisms]]       | Group homomorphisms, kernel/image, isomorphism invariants, $\mathrm{Aut}(G)$, $\mathrm{Inn}(G)$                                     |     |                                                                                                            |
| 18  | [[18-isomorphism-theorems]]                 | First/Second/Third isomorphism theorems, correspondence theorem, universal property factorization                                   |     |                                                                                                            |
| 19  | [[19-rings-definition-and-examples]]        | Ring axioms, subrings, units, zero divisors, $R^\times$, $\mathbb Z_n$ is a field iff $n$ prime                                     |     |                                                                                                            |
| 20  | [[20-co3-practice-problems]]                | **CO3 problem set** (25+ problems across chapters 15–19)                                                                            |     |                                                                                                            |
| 21  | [[21-integral-domains]]                     | Integral domain, cancellation, characteristic, Frobenius, irreducible vs prime, field of fractions                                  |     |                                                                                                            |
| 22  | [[22-ideals-and-quotient-rings]]            | Ideals, PIDs, quotient rings, prime/maximal ideals, $R/I$ field iff $I$ maximal                                                     |     |                                                                                                            |
| 23  | [[23-ring-homomorphisms]]                   | Ring homomorphisms, First/Second/Third iso for rings, evaluation $\operatorname{ev}_a$, CRT for rings                               |     |                                                                                                            |
| 24  | [[24-polynomial-rings]]                     | $D[x]$, degree, $D$ integral domain $\Rightarrow$ $D[x]$ integral domain, $F[x]$ is a PID, factor theorem                           |     |                                                                                                            |
| 25  | [[25-co4-practice-problems]]                | **CO4 problem set** (25+ problems across chapters 21–24)                                                                            |     |                                                                                                            |
| 26  | [[26-fields-and-irreducibility]]            | Irreducibility: rational root, Gauss's lemma, Eisenstein, reduction mod $p$; $F[x]/\langle p\rangle$ is a field iff $p$ irreducible |     |                                                                                                            |
| 27  | [[27-finite-fields-and-extensions]]         | Field extensions, minimal polynomial, tower law, classification of $\mathbb F_{p^n}$, Frobenius, constructibility impossibilities   |     |                                                                                                            |
| 28  | [[28-co5-practice-problems]]                | **CO5 problem set** (25+ problems across chapters 26–27)                                                                            |     |                                                                                                            |

---

## Course Outcome (CO) Summary

### CO1 — Groups: Examples and Elementary Structure
Master the group axioms by working through abundant concrete examples: additive groups, multiplicative groups, permutation groups, dihedral groups, matrix groups. Develop fluency with subgroup tests, generators, cyclic groups, and cycle notation. **Outcome:** identify whether a set with an operation forms a group; compute in $S_n$, $D_n$, $\mathbb Z_n$, $U(n)$; prove basic subgroup-theoretic results.

**Chapters:** 01, 02, 03, 04, 05, 06. **Practice:** 07.

### CO2 — Cosets, Quotients, and Counting Principles
Develop the partition viewpoint via equivalence relations and cosets. Prove Lagrange's theorem and derive Fermat/Euler. Construct quotient groups from normal subgroups. Handle products and subgroup lattices. Apply orbit-counting (Burnside) to combinatorial colorings. **Outcome:** compute $[G:H]$, verify normality, construct quotient groups, count orbits.

**Chapters:** 08, 09, 10, 11, 12, 13. **Practice:** 14.

### CO3 — Actions, Homomorphisms, and Isomorphism Theorems
Formalize group actions as homomorphisms $G \to \mathrm{Sym}(X)$, giving conjugation, Cayley's theorem, class equation, and Cauchy's theorem. Master the three isomorphism theorems and the correspondence theorem. **Outcome:** use actions for counting and structural proofs; identify images/kernels; apply isomorphism theorems to simplify quotients.

**Chapters:** 15, 16, 17, 18, 19 (rings as bridge). **Practice:** 20.

### CO4 — Ring Theory
Parallel development of rings alongside groups: rings, integral domains, ideals, quotient rings, homomorphisms, polynomial rings. Establish the division algorithm and that $F[x]$ is a PID. **Outcome:** identify integral domains/fields; build $R/I$; compute in $F[x]$; apply CRT.

**Chapters:** 21, 22, 23, 24. **Practice:** 25.

### CO5 — Fields, Extensions, and Constructibility
Irreducibility criteria; fields from quotients $F[x]/\langle p\rangle$; algebraic extensions with the tower law; classification and uniqueness of finite fields $\mathbb F_{p^n}$; Frobenius; compass-and-straightedge impossibility proofs. **Outcome:** prove irreducibility; compute $[L:F]$; navigate subfields of $\mathbb F_{p^n}$; prove impossibility of the classical Greek constructions.

**Chapters:** 26, 27. **Practice:** 28.

---

## Theorem Index

The guide's most important named theorems, in order of first appearance.

### Group Theory
- **Uniqueness of identity and inverse** — [[03-groups-definition-and-examples]]
- **Subgroup Test** — [[04-subgroups-generators-cayley]]
- **Cycle Decomposition** — [[05-permutation-groups-and-dihedral]]
- **Order of $a^k$** in a cyclic group — [[06-cyclic-groups-and-order]]
- **Equivalence relations ↔ partitions** — [[08-equivalence-relations-and-partitions]]
- **Lagrange's Theorem:** $|H| \mid |G|$ — [[09-cosets-and-lagranges-theorem]]
- **Fermat's Little Theorem / Euler's Theorem** — [[09-cosets-and-lagranges-theorem]]
- **Normality equivalences** ($gHg^{-1} \subseteq H$ etc.) — [[10-normal-subgroups-and-quotient-groups]]
- **$|(a, b)| = \operatorname{lcm}(|a|, |b|)$** — [[11-direct-products]]
- **CRT for groups:** $\mathbb Z_m \times \mathbb Z_n \cong \mathbb Z_{mn}$ iff $\gcd(m,n)=1$ — [[11-direct-products]]
- **Classification of subgroups of $D_n$** — [[12-subgroup-lattice-and-dihedral-groups]]
- **Orbit-Stabilizer Theorem** — [[13-burnsides-theorem]], [[15-group-actions]]
- **Cauchy-Frobenius-Burnside:** $\|X/G\| = \tfrac{1}{|G|}\sum_g |X^g|$ — [[13-burnsides-theorem]]
- **Cayley's Theorem:** $G \hookrightarrow S_{|G|}$ — [[15-group-actions]]
- **Class Equation:** $|G| = |Z(G)| + \sum [G:C_G(g)]$ — [[16-centralizer-normalizer-stabilizer]]
- **$p$-groups have nontrivial center** — [[16-centralizer-normalizer-stabilizer]]
- **Cauchy's Theorem:** $p \mid |G| \Rightarrow \exists g$ with $|g| = p$ — [[16-centralizer-normalizer-stabilizer]]
- **Injective ⟺ trivial kernel** — [[17-homomorphisms-and-isomorphisms]]
- **First Isomorphism Theorem:** $G/\ker\varphi \cong \operatorname{im}\varphi$ — [[18-isomorphism-theorems]]
- **Second (Diamond) Isomorphism Theorem** — [[18-isomorphism-theorems]]
- **Third (Cancellation) Isomorphism Theorem** — [[18-isomorphism-theorems]]
- **Correspondence / Lattice Theorem** — [[18-isomorphism-theorems]]
- **$\operatorname{Inn}(G) \cong G/Z(G)$** — [[17-homomorphisms-and-isomorphisms]]

### Ring Theory
- **Subring Test** — [[19-rings-definition-and-examples]]
- **$\mathbb Z_n$ is a field iff $n$ is prime** — [[19-rings-definition-and-examples]]
- **Units are not zero divisors** — [[19-rings-definition-and-examples]]
- **Finite Integral Domain ⟹ Field** — [[21-integral-domains]]
- **$\operatorname{char}(\text{ID}) \in \{0\} \cup \text{primes}$** — [[21-integral-domains]]
- **Frobenius is a ring homomorphism** — [[21-integral-domains]]
- **Field of fractions (universal property)** — [[21-integral-domains]]
- **Every ideal of $\mathbb Z$ is principal** — [[22-ideals-and-quotient-rings]]
- **$R/I$ is a field iff $I$ is maximal** — [[22-ideals-and-quotient-rings]]
- **$R/I$ is an integral domain iff $I$ is prime** — [[22-ideals-and-quotient-rings]]
- **First Isomorphism Theorem for rings** — [[23-ring-homomorphisms]]
- **Second / Third iso for rings** — [[23-ring-homomorphisms]]
- **Correspondence theorem for rings** — [[23-ring-homomorphisms]]
- **CRT for rings:** coprime ideals decompose $R/IJ$ — [[23-ring-homomorphisms]]
- **Universal property of $F[x]$** — [[23-ring-homomorphisms]]
- **$D$ integral domain ⟹ $D[x]$ integral domain** — [[24-polynomial-rings]]
- **$(D[x])^\times = D^\times$ when $D$ is an integral domain** — [[24-polynomial-rings]]
- **Division algorithm over $F[x]$** — [[24-polynomial-rings]]
- **$F[x]$ is a PID** — [[24-polynomial-rings]]
- **Factor theorem / Remainder theorem** — [[24-polynomial-rings]]
- **A polynomial over an ID has at most $\deg f$ roots** — [[24-polynomial-rings]]

### Field Theory
- **Rational Root Theorem** — [[26-fields-and-irreducibility]]
- **Gauss's Lemma** — [[26-fields-and-irreducibility]]
- **Eisenstein's Criterion** — [[26-fields-and-irreducibility]]
- **Reduction mod $p$ theorem** — [[26-fields-and-irreducibility]]
- **$F[x]/\langle p(x)\rangle$ is a field iff $p$ is irreducible** — [[26-fields-and-irreducibility]]
- **Fundamental Theorem of Algebra** (stated) — [[26-fields-and-irreducibility]]
- **Classification of irreducibles over $\mathbb R[x]$** — [[26-fields-and-irreducibility]]
- **Minimal polynomial is unique monic irreducible in kernel of $\operatorname{ev}_\alpha$** — [[27-finite-fields-and-extensions]]
- **$F(\alpha) \cong F[x]/\langle m_\alpha\rangle$** — [[27-finite-fields-and-extensions]]
- **Tower Law:** $[L:F] = [L:K][K:F]$ — [[27-finite-fields-and-extensions]]
- **Finite extension ⟹ algebraic** — [[27-finite-fields-and-extensions]]
- **Existence and uniqueness of $\mathbb F_{p^n}$** — [[27-finite-fields-and-extensions]]
- **$\mathbb F_{p^m} \subseteq \mathbb F_{p^n}$ iff $m \mid n$** — [[27-finite-fields-and-extensions]]
- **$\mathbb F_{p^n}^\times$ is cyclic** — [[27-finite-fields-and-extensions]]
- **Frobenius $\varphi_p(a) = a^p$ generates $\operatorname{Aut}(\mathbb F_{p^n}/\mathbb F_p)$** — [[27-finite-fields-and-extensions]]
- **Constructibility ⟹ $[\mathbb Q(\alpha):\mathbb Q]$ a power of $2$** — [[27-finite-fields-and-extensions]]
- **Impossibility:** doubling the cube, trisecting the angle, squaring the circle — [[27-finite-fields-and-extensions]]

---

## Dependency Graph

```
01 → 02, 03
02 → 03, 05
03 → 04, 05, 06, 08, 09, 10, 11, 12, 15, 17, 18, 19
04 → 05, 06, 09
05 → 06, 15 (via S_n examples)
06 → 09, 11, 16 (order-based proofs)
08 → 09 (cosets use equivalence relations)
09 → 10, 11, 16, 18
10 → 11, 12, 18
11 → 13 (FTFAG preview via examples)
12 → 13, 15 (dihedral examples in actions)
13 → 15 (orbit-stabilizer in both)
15 → 16 (class equation)
16 → 17 (kernels/images), 18
17 → 18, 19 (homomorphism parallels)
18 → 19, 22 (structural quotients)
19 → 21, 22, 23
21 → 22, 24 (field of fractions, polynomials over ID)
22 → 23, 26, 27 (maximal ideals → fields)
23 → 24, 27 (ev_α specialization)
24 → 26, 27
26 → 27
```

Every problem chapter ($07, 14, 20, 25, 28$) depends on every preceding content chapter of its CO.

---

## Glossary

A curated mini-glossary of recurring notation and terminology. Click chapter links for definitions.

### Groups
- **$|G|$** — order of a group [[03-groups-definition-and-examples]]
- **$|a|$** — order of an element [[06-cyclic-groups-and-order]]
- **$\langle S\rangle$** — subgroup generated by $S$ [[04-subgroups-generators-cayley]]
- **$Z(G)$** — center of $G$ [[16-centralizer-normalizer-stabilizer]]
- **$C_G(a), C_G(S)$** — centralizer [[16-centralizer-normalizer-stabilizer]]
- **$N_G(H)$** — normalizer [[16-centralizer-normalizer-stabilizer]]
- **$G_x$** — stabilizer of $x$ [[13-burnsides-theorem]]
- **$G \cdot x$** — orbit of $x$ [[13-burnsides-theorem]]
- **$[G:H]$** — index [[09-cosets-and-lagranges-theorem]]
- **$N \trianglelefteq G$** — $N$ is normal in $G$ [[10-normal-subgroups-and-quotient-groups]]
- **$G/N$** — quotient group [[10-normal-subgroups-and-quotient-groups]]
- **$H \times K$** — direct product [[11-direct-products]]
- **$S_n, A_n, D_n, \mathbb Z_n, U(n), GL_n$** — standard groups [[03-groups-definition-and-examples]], [[05-permutation-groups-and-dihedral]]
- **$\operatorname{Aut}(G), \operatorname{Inn}(G)$** — automorphism / inner automorphism groups [[17-homomorphisms-and-isomorphisms]]

### Rings
- **$R^\times$** — group of units [[19-rings-definition-and-examples]]
- **zero divisor** — [[19-rings-definition-and-examples]]
- **integral domain** — [[21-integral-domains]]
- **$\operatorname{char}(R)$** — characteristic [[21-integral-domains]]
- **$\operatorname{Frac}(D)$** — field of fractions [[21-integral-domains]]
- **$\varphi_p(a) = a^p$** — Frobenius [[21-integral-domains]], [[27-finite-fields-and-extensions]]
- **$\langle S\rangle$** — ideal generated by $S$ [[22-ideals-and-quotient-rings]]
- **PID** — principal ideal domain [[22-ideals-and-quotient-rings]]
- **prime / maximal ideal** — [[22-ideals-and-quotient-rings]]
- **$\operatorname{ev}_a$** — evaluation homomorphism [[23-ring-homomorphisms]]

### Fields
- **$F(\alpha)$** — field generated by $\alpha$ [[27-finite-fields-and-extensions]]
- **$[L:F]$** — degree of extension [[27-finite-fields-and-extensions]]
- **$m_\alpha(x)$** — minimal polynomial [[27-finite-fields-and-extensions]]
- **$\mathbb F_{p^n}$** — unique field of order $p^n$ [[27-finite-fields-and-extensions]]
- **$\Phi_n(x)$** — $n$th cyclotomic polynomial [[26-fields-and-irreducibility]]
- **$\operatorname{Aut}(L/F)$** — field automorphisms fixing $F$ [[27-finite-fields-and-extensions]]

---

## How to Use This Guide

### For first-time learners
1. Read chapters **in order**. Each chapter ends with 6–8 practice problems (full solutions included).
2. After every CO, complete the CO practice chapter (07, 14, 20, 25, 28) — 25+ problems each.
3. Do **not skip** the worked examples; the examples carry the intuition that abstracts into the definitions.

### For exam preparation
1. Review the theorem index above; make sure you can state and sketch a proof of each.
2. Work through CO practice chapters cold (no peeking at solutions first).
3. Revisit any chapter where a practice problem felt unfamiliar.

### For graduate-level depth
- Pair this guide with Dummit & Foote, *Abstract Algebra* (chapters 1–14) for full rigor.
- Use the theorem index as a skeleton; each theorem has a corresponding rigorous development in a standard text.
- The constructibility theorem in [[27-finite-fields-and-extensions]] is the natural gateway into **Galois theory**, not covered here but the next step in the curriculum.

### For problem-based study
- Every chapter's end-of-section practice can be treated as a self-test.
- The CO practice chapters can be treated as qualifying-exam simulations.

---

## Topics Beyond This Guide

These topics are natural next steps but lie outside MAT 2235:
- **Sylow's theorems** (previewed in [[16-centralizer-normalizer-stabilizer]])
- **Fundamental Theorem of Finite Abelian Groups** (previewed in [[11-direct-products]])
- **Semidirect products** (previewed in [[12-subgroup-lattice-and-dihedral-groups]])
- **Galois theory** (extending [[27-finite-fields-and-extensions]])
- **Algebraic number theory / Dedekind domains** (extending [[22-ideals-and-quotient-rings]])
- **Representation theory** (extending [[15-group-actions]])

---

**Every chapter in this guide was written to be self-contained**: you can pick up any chapter and read it with minimal back-references, though the linear path maximizes coherence. The ubiquitous `[[wikilinks]]` let you hop between related ideas in Obsidian's graph view.

Total: **28 chapters · ~200+ worked examples · ~175+ practice problems · all with full solutions**.

---

*End of Algebraic Structures Master Index.*
