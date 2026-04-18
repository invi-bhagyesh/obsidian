# Real Analysis Study Guide — Complete Index

## MAT 2234 — Real Analysis
### Manipal Institute of Technology — Department of Mathematics

---

## About This Guide

This is a comprehensive, self-contained study guide to **MAT 2234 Real Analysis**, covering the full 36-lesson syllabus across **5 Course Outcomes (COs)**. It is designed to take a motivated student from beginner to expert, mirroring the style of the companion [[maths/Notes/VACV/guide/00-index|VACV Guide]]. Every major theorem is proved, every subtle point (rearrangement of series, Thomae-vs-Dirichlet, Darboux integrability, Weierstrass's nowhere-differentiable function) is discussed, and every CO has its own 25+ problem set with full solutions.

**Audience.** A student with single-variable calculus and basic proof skills. No prior real analysis required. By the end, you should be able to:
- Prove theorems from first principles using $\varepsilon$-$\delta$ and $\varepsilon$-$N$ rigor.
- Decide whether a given series converges or diverges.
- Analyze continuity, differentiability, and integrability of real functions.
- Apply the Riemann-Stieltjes integral as a unified framework for integration and summation.

---

## Part A: CO1 — The Real Number System & Topology of $\mathbb{R}$ (Lessons 1–7)

> **Learning outcome:** Apply the fundamental properties of real numbers and their topology to identify compact sets and prove convergence-related statements.

| #  | Topic                                                      | File                                                     |
| -- | ---------------------------------------------------------- | -------------------------------------------------------- |
| 1  | The Real Number System — field, order, completeness axioms | [[01-real-number-system]]                                |
| 2  | Inequalities — AM-GM, Cauchy-Schwarz, triangle inequality   | [[02-inequalities]]                                      |
| 3  | Supremum & Infimum — LUB property, Archimedean, density    | [[03-supremum-and-infimum]]                              |
| 4  | Finite, Countable & Uncountable Sets — Cantor diagonal     | [[04-sets-finite-countable-uncountable]]                 |
| 5  | Open Sets & Closed Sets — topology of $\mathbb{R}$         | [[05-open-sets-closed-sets]]                             |
| 6  | **CO1 Practice Problems** (25+ with full solutions)        | [[06-co1-practice-problems]]                             |
| 7  | Compact Sets — Heine-Borel & Bolzano-Weierstrass (set)     | [[07-compact-sets]]                                      |

## Part B: CO2 — Sequences & Completeness (Lessons 8–16)

> **Learning outcome:** Demonstrate a rigorous understanding of sequences in $\mathbb{R}$ via convergence, monotonicity, boundedness, and Cauchy completeness.

| #  | Topic                                                  | File                                        |
| -- | ------------------------------------------------------ | ------------------------------------------- |
| 8  | Sequences — boundedness, monotonicity, subsequences    | [[08-sequences-introduction]]               |
| 9  | Convergence & Limits — $\varepsilon$-$N$, algebra, MCT | [[09-convergence-and-limits]]               |
| 10 | Cauchy Sequences & Completeness of $\mathbb{R}$        | [[10-cauchy-sequences-completeness]]        |
| 11 | **CO2 Practice Problems** (25+ with full solutions)     | [[11-co2-practice-problems]]                |

## Part C: CO3 — Series, Limits of Functions, Continuity (Lessons 17–24)

> **Learning outcome:** Determine convergence of infinite series and analyze limits and continuity of real-valued functions.

| #  | Topic                                                    | File                                                |
| -- | -------------------------------------------------------- | --------------------------------------------------- |
| 12 | Infinite Series — partial sums, telescoping, divergence   | [[12-infinite-series-introduction]]                 |
| 13 | Convergence Tests — comparison, ratio, root, integral    | [[13-series-convergence-tests]]                     |
| 14 | Alternating & Absolute Convergence — Leibniz, Abel, Dirichlet | [[14-alternating-and-absolute-convergence]]      |
| 15 | **Rearrangements** — Dirichlet, Riemann rearrangement, Cauchy product | [[15-rearrangement-of-series]]        |
| 16 | Continuity — $\varepsilon$-$\delta$, sequential, topological characterization | [[16-continuity]]                     |
| 17 | Types of Discontinuity & Monotonic Functions              | [[17-types-of-discontinuity-monotonic]]             |
| 18 | Important Limits, Infinite Limits, Indeterminate Forms   | [[18-important-limits-infinite-limits]]             |
| 19 | **CO3 Practice Problems** (25+ with full solutions)       | [[19-co3-practice-problems]]                        |

## Part D: CO4 — Uniform Continuity, Differentiation, MVT, Taylor (Lessons 25–32)

> **Learning outcome:** Apply differential calculus rigorously: uniform continuity, chain rule via Carathéodory, the Mean Value Theorems, Taylor expansion, L'Hôpital's rule, and vector-valued derivatives.

| #  | Topic                                                  | File                                                  |
| -- | ------------------------------------------------------ | ----------------------------------------------------- |
| 20 | **IVT, EVT, Connectedness, Uniform Continuity**         | [[20-ivt-and-connectedness]]                          |
| 21 | **CO4 Practice Problems** (25+ with full solutions)     | [[21-co4-practice-problems]]                          |
| 22 | Differentiation — Carathéodory chain rule, Darboux thm  | [[22-differentiation]]                                |
| 23 | **Mean Value Theorems** — Rolle, Lagrange, Cauchy, Taylor | [[23-mean-value-theorems]]                          |
| 24 | L'Hôpital's Rule & Vector-Valued Derivatives            | [[24-lhopital-vector-derivatives]]                    |

## Part E: CO5 — The Riemann-Stieltjes Integral (Lessons 33–36)

> **Learning outcome:** Analyze the Riemann-Stieltjes integral and prove the Fundamental Theorem of Calculus.

| #  | Topic                                                    | File                                          |
| -- | -------------------------------------------------------- | --------------------------------------------- |
| 25 | **Riemann-Stieltjes Integral** — Darboux, FTC, IBP, MVT   | [[25-riemann-stieltjes-integral]]             |
| 26 | **CO5 Practice Problems** (40+ with full solutions)       | [[26-co5-practice-problems]]                  |

---

## Dependency / Study Roadmap

The guide is arranged so each topic builds on the ones before. The recommended path:

```
                    ┌──────────────────────────┐
                    │  01 Real number system    │
                    └─────────────┬────────────┘
                                  │
                  ┌───────────────┼───────────────┐
                  │               │               │
                  ▼               ▼               ▼
         ┌───────────────┐ ┌────────────┐ ┌────────────────┐
         │ 02 Inequalities│ │ 03 Sup/Inf │ │ 04 Countability│
         └───────┬───────┘ └──────┬─────┘ └────────┬───────┘
                 │                │                │
                 └────────────────┼────────────────┘
                                  ▼
                        ┌──────────────────┐
                        │ 05 Open/Closed   │
                        └─────────┬────────┘
                                  ▼
                        ┌─────────────────┐
                        │ 07 Compact sets │   ◄─── 06 CO1 practice
                        └─────────┬───────┘
                                  ▼
                        ┌──────────────────────┐
                        │ 08 Sequences intro    │
                        └──────────┬───────────┘
                                  ▼
                        ┌──────────────────────┐
                        │ 09 Convergence/MCT    │
                        └──────────┬───────────┘
                                  ▼
                        ┌──────────────────────────┐
                        │ 10 Cauchy & completeness │    ◄─── 11 CO2 practice
                        └──────────┬───────────────┘
                                  ▼
                        ┌──────────────────────┐
                        │ 12 Series intro       │
                        └──────────┬───────────┘
                                  ▼
                        ┌──────────────────────┐
                        │ 13 Convergence tests │
                        └──────────┬───────────┘
                                  ▼
                        ┌──────────────────────────────┐
                        │ 14 Alt/Abs convergence       │
                        └──────────┬───────────────────┘
                                  ▼
                        ┌──────────────────────────────┐
                        │ 15 Rearrangements (Riemann)  │
                        └──────────┬───────────────────┘
                                  ▼
                        ┌──────────────────────┐
                        │ 16 Continuity         │
                        └──────────┬───────────┘
                                  ▼
                        ┌──────────────────────────┐
                        │ 17 Discontinuities/Monotonic │
                        └──────────┬───────────────────┘
                                  ▼
                        ┌──────────────────────────┐
                        │ 18 Limits, indeterminate   │   ◄─── 19 CO3 practice
                        └──────────┬───────────────┘
                                  ▼
                        ┌──────────────────────────┐
                        │ 20 IVT/EVT/Uniform cont. │
                        └──────────┬───────────────┘
                                  ▼
                        ┌──────────────────────┐
                        │ 22 Differentiation   │    ◄─── 21 CO4 practice
                        └──────────┬───────────┘          (placed early by chapter plan;
                                  ▼                        use after §22-24)
                        ┌──────────────────────┐
                        │ 23 Mean value thms   │
                        └──────────┬───────────┘
                                  ▼
                        ┌──────────────────────────┐
                        │ 24 L'Hôpital, vector-val. │
                        └──────────┬───────────────┘
                                  ▼
                        ┌──────────────────────────────┐
                        │ 25 Riemann-Stieltjes integral │   ◄─── 26 CO5 practice
                        └──────────────────────────────┘
```

**Note on practice file placement.** CO4 practice (file 21) is numbered before file 22 for lesson-ordering reasons but should be attempted *after* files 22–24. Similarly CO1 practice (file 06) follows file 05 in numbering but should be done after file 07.

---

## How to Use This Guide

1. **Read each topic file sequentially** — definitions compound.
2. **Work every in-text example yourself** before reading the solution.
3. **Attempt practice problems at the end of each topic**, then check the *Solutions* section.
4. **Use the CO practice files (06, 11, 19, 21, 26) for timed exam practice.**
5. **When stuck, re-read the relevant theorem** — most proofs use the *same* half-dozen techniques (Cauchy criterion, Bolzano-Weierstrass, Heine-Borel, MVT, sandwich).

### A recommended study schedule (42 days)

| Week | Focus                                          | Files         |
| ---- | ---------------------------------------------- | ------------- |
| 1    | Real numbers, sup/inf, countability            | 01, 02, 03, 04 |
| 2    | Topology of $\mathbb{R}$                       | 05, 07 + CO1 (06) |
| 3    | Sequences & completeness                        | 08, 09, 10 + CO2 (11) |
| 4    | Series & their subtleties                       | 12, 13, 14    |
| 5    | Rearrangements, continuity                      | 15, 16, 17, 18 + CO3 (19) |
| 6    | Differentiation, MVT, Taylor                    | 20, 22, 23, 24 + CO4 (21) |
| 7    | Riemann-Stieltjes integration                   | 25 + CO5 (26) |

---

## Key Theorem Index

Quick-reference for the most-used results in the guide.

### From CO1 (Real Numbers & Topology)
- **Completeness (LUB) Property.** Every non-empty bounded-above subset of $\mathbb{R}$ has a supremum. ⟶ [[03-supremum-and-infimum#3.2]]
- **Archimedean Property.** For any $x > 0$, $\exists n \in \mathbb{N}$ with $n > x$. ⟶ [[03-supremum-and-infimum#3.3]]
- **Density of $\mathbb{Q}$.** Between any two reals lies a rational. ⟶ [[03-supremum-and-infimum]]
- **Cantor diagonal.** $\mathbb{R}$ is uncountable. ⟶ [[04-sets-finite-countable-uncountable]]
- **Heine-Borel.** $K \subset \mathbb{R}$ is compact $\iff$ closed and bounded. ⟶ [[07-compact-sets]]
- **Bolzano-Weierstrass (set form).** Every infinite bounded subset of $\mathbb{R}$ has a limit point. ⟶ [[07-compact-sets]]

### From CO2 (Sequences)
- **Monotone Convergence Theorem.** Bounded monotone sequence $\Rightarrow$ convergent. ⟶ [[09-convergence-and-limits]]
- **Bolzano-Weierstrass (sequence form).** Every bounded sequence has a convergent subsequence. ⟶ [[09-convergence-and-limits]]
- **Cauchy criterion.** A sequence in $\mathbb{R}$ converges $\iff$ it is Cauchy. ⟶ [[10-cauchy-sequences-completeness]]
- **Banach fixed-point (contraction).** Every contraction on $\mathbb{R}$ has a unique fixed point, found via iteration. ⟶ [[10-cauchy-sequences-completeness]]

### From CO3 (Series & Continuity)
- **Cauchy condensation.** $\sum a_n$ ($a_n$ decreasing positive) converges $\iff \sum 2^k a_{2^k}$ converges. ⟶ [[13-series-convergence-tests]]
- **Leibniz's test.** Alternating series of decreasing terms $\to 0$ converges. ⟶ [[14-alternating-and-absolute-convergence]]
- **Riemann rearrangement theorem.** A conditionally convergent series can be rearranged to sum to any $L \in \mathbb{R} \cup \{\pm\infty\}$. ⟶ [[15-rearrangement-of-series]]
- **Mertens product.** If $\sum a_n$ converges absolutely and $\sum b_n$ converges, the Cauchy product converges to $(\sum a_n)(\sum b_n)$. ⟶ [[15-rearrangement-of-series]]
- **Heine's sequential criterion.** $\lim_{x \to a} f = L \iff f(x_n) \to L$ for every $x_n \to a$. ⟶ [[16-continuity]]
- **Monotonic discontinuity theorem.** Discontinuities of a monotone function are at most countable. ⟶ [[17-types-of-discontinuity-monotonic]]

### From CO4 (Differentiation)
- **IVT (Bolzano).** Continuous image of a connected set is connected. ⟶ [[20-ivt-and-connectedness]]
- **EVT (Weierstrass).** Continuous function on compact set attains min/max. ⟶ [[20-ivt-and-connectedness]]
- **Heine-Cantor.** Continuous function on compact set is uniformly continuous. ⟶ [[20-ivt-and-connectedness]]
- **Carathéodory chain rule.** $f$ differentiable at $a \iff \exists$ continuous $\varphi$ at $a$ with $f(x) - f(a) = \varphi(x)(x-a)$. ⟶ [[22-differentiation]]
- **Darboux's theorem.** Derivatives satisfy the IVT (no jump discontinuities). ⟶ [[22-differentiation]]
- **Rolle's theorem.** $f$ continuous $[a,b]$, differentiable $(a,b)$, $f(a) = f(b)$ $\Rightarrow \exists c$ with $f'(c) = 0$. ⟶ [[23-mean-value-theorems]]
- **Lagrange MVT.** $\exists c$ with $f'(c) = \frac{f(b) - f(a)}{b - a}$. ⟶ [[23-mean-value-theorems]]
- **Taylor's theorem.** $f(x) = \sum_{k=0}^{n} \frac{f^{(k)}(a)}{k!}(x-a)^k + R_n$ with Lagrange/Cauchy/integral/Peano remainder. ⟶ [[23-mean-value-theorems]]
- **L'Hôpital's rule.** $0/0$ or $\infty/\infty$ indeterminate forms can be resolved by $\lim f'/g'$. ⟶ [[24-lhopital-vector-derivatives]]

### From CO5 (Integration)
- **Darboux criterion.** $f \in \mathcal{R}(\alpha)$ $\iff$ $\forall \varepsilon > 0, \exists P$ with $U(P) - L(P) < \varepsilon$. ⟶ [[25-riemann-stieltjes-integral]]
- **Continuous $\Rightarrow$ integrable.** Via Heine-Cantor. ⟶ [[25-riemann-stieltjes-integral]]
- **Monotone $\Rightarrow$ integrable.** Telescoping upper-minus-lower. ⟶ [[25-riemann-stieltjes-integral]]
- **Stieltjes reduction.** $\alpha \in C^1 \Rightarrow \int f \, d\alpha = \int f(x) \alpha'(x) \, dx$. ⟶ [[25-riemann-stieltjes-integral]]
- **FTC I.** $F(x) = \int_a^x f \Rightarrow F' = f$ (for continuous $f$). ⟶ [[25-riemann-stieltjes-integral]]
- **FTC II.** $\int_a^b f = G(b) - G(a)$ for any antiderivative $G$. ⟶ [[25-riemann-stieltjes-integral]]
- **MVT for integrals.** $\exists c \in [a,b]$ with $\int_a^b f = f(c)(b-a)$. ⟶ [[25-riemann-stieltjes-integral]]

---

## Glossary of Notation

| Symbol                         | Meaning                                                          |
| ------------------------------ | ---------------------------------------------------------------- |
| $\mathbb{N}, \mathbb{Z}, \mathbb{Q}, \mathbb{R}$ | Natural numbers, integers, rationals, reals              |
| $\sup A, \inf A$               | Supremum (least upper bound) and infimum of $A \subseteq \mathbb{R}$ |
| $\max A, \min A$               | Maximum / minimum element (when it exists)                        |
| $B_\varepsilon(x), B(x, r)$    | Open ball / $\varepsilon$-neighborhood of $x$                     |
| $A'$                           | Derived set (set of limit points) of $A$                          |
| $\overline{A}$, $A^\circ, \partial A$ | Closure, interior, boundary of $A$                         |
| $a_n \to L$                    | Sequence $a_n$ converges to $L$                                   |
| $\limsup, \liminf$             | Limit superior and limit inferior of a sequence                   |
| $\sum a_n$                     | Infinite series $a_1 + a_2 + \cdots$                              |
| $\mathcal{R}(\alpha)[a,b]$     | Set of functions Riemann-Stieltjes integrable on $[a,b]$ w.r.t.\ $\alpha$ |
| $\mathcal{R}[a,b]$             | Riemann integrable functions on $[a,b]$ (case $\alpha(x) = x$)    |
| $U(P, f, \alpha), L(P, f, \alpha)$ | Upper/lower Darboux-Stieltjes sums                            |
| $\overline{\int}, \underline{\int}$ | Upper / lower (Stieltjes) integrals                          |
| $f \in C^k$                    | $f$ is $k$ times continuously differentiable                      |
| $\varepsilon$-$\delta$         | Cauchy's definition-language for limits/continuity                |
| $\varepsilon$-$N$              | Definition-language for sequence convergence                      |
| $\blacksquare$                 | End of proof (Q.E.D.)                                             |
| $\boxed{\cdot}$                | Final answer / headline result                                    |
| $[[file]]$                     | Obsidian-style cross-reference to another file in this guide      |

---

## Cross-Reference to VACV Guide

Several topics overlap with the companion [[maths/Notes/VACV/guide/00-index|Vector Analysis & Complex Variables guide]]. Key connections:

- **Riemann-Stieltjes integration ([[25-riemann-stieltjes-integral]])** generalizes the Riemann integral — see [[03-line-integrals-and-conservative-fields|Line Integrals]] for a vector-valued extension.
- **Vector-valued derivatives ([[24-lhopital-vector-derivatives]])** connect to [[02-gradient-and-directional-derivatives|Gradient]] and [[04-divergence-and-curl|Divergence/Curl]].
- **Completeness of $\mathbb{R}$ ([[10-cauchy-sequences-completeness]])** underlies convergence of complex power series — see [[15-taylor-laurent-series|Taylor & Laurent Series]].
- **Continuity in $\mathbb{R}$ ([[16-continuity]])** is the scalar prerequisite for analyticity — see [[09-analytic-functions-cauchy-riemann|Analytic Functions]].

---

## File Statistics

- **Content files:** 22 (01–05, 07–10, 12–18, 20, 22–25)
- **Practice files:** 5 (06, 11, 19, 21, 26)
- **Total files:** 27 (including this index, file 00)
- **Total worked examples:** ~150
- **Total practice problems:** ~130 (with full solutions)
- **Total theorems proved in full:** ~80

---

*Prepared as a companion to MAT 2234. All proofs are self-contained. For feedback or corrections, flag within the Obsidian vault.*

**Good luck, and enjoy the journey into rigorous analysis.** $\blacksquare$
