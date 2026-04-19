# 1. The Real Number System

> **The foundational object.** The real number system $\mathbb{R}$ is characterized, up to isomorphism, as the **unique complete ordered field**. Every theorem of real analysis — from the intermediate value theorem and extreme value theorem, to the existence of derivatives and Riemann integrals, to the convergence of series and the compactness of $[0,1]$ — ultimately rests on three pillars: the **field axioms** (governing $+$ and $\cdot$), the **order axioms** (governing $<$), and the **completeness axiom** (closing the "holes" left by $\mathbb{Q}$).
>
> This chapter installs these three layers with surgical care. We derive every elementary consequence from the axioms, prove the irrationality of $\sqrt{2}$ in full (twice, by different routes), establish the absolute-value inequalities that drive every $\varepsilon$–$\delta$ argument later, and sharpen the Archimedean property into the density of $\mathbb{Q}$ in $\mathbb{R}$. We close with complex numbers, whose absence of a compatible order is what forces real and complex analysis apart.

---

## 1.1 Why Real Analysis Starts Here

Calculus uses real numbers freely, but it never explains what a real number *is*. Real analysis begins by fixing the structure of $\mathbb{R}$ — its algebraic, order, and completeness properties — because every later result (limits, continuity, derivatives, integrals) rests on these three layers.

We build up in stages:
- $\mathbb{N} = \{1, 2, 3, \ldots\}$ — natural numbers (in some conventions $\mathbb{N}$ includes $0$; we follow the convention $0 \notin \mathbb{N}$ for this course, noting the issue where relevant)
- $\mathbb{Z} = \{\ldots, -2, -1, 0, 1, 2, \ldots\}$ — integers
- $\mathbb{Q} = \{p/q : p, q \in \mathbb{Z},\ q \neq 0\}$ — rationals
- $\mathbb{R}$ — reals (rationals + irrationals)
- $\mathbb{C} = \{a + bi : a, b \in \mathbb{R}\}$ — complex numbers

Each layer is obtained by closing the previous under a missing operation:
1. $\mathbb{Z}$ closes $\mathbb{N}$ under subtraction (the equation $a + x = b$ always has a solution),
2. $\mathbb{Q}$ closes $\mathbb{Z}$ under non-zero division ($ax = b$ is solvable for $a \neq 0$),
3. $\mathbb{R}$ closes $\mathbb{Q}$ under **limits / suprema** (Cauchy sequences converge; bounded sets have least upper bounds),
4. $\mathbb{C}$ closes $\mathbb{R}$ under **root-taking of polynomials** (the fundamental theorem of algebra).

**Why this matters for analysis.** At step 3, a qualitative jump occurs: $\mathbb{Q}$ and $\mathbb{R}$ are both countably infinite orderings extended to ordered fields, but $\mathbb{R}$ is **uncountable** and **complete**, whereas $\mathbb{Q}$ is **countable** and **riddled with holes**. Every convergence theorem in analysis detects this gap.

**Philosophical note.** Three constructions realize $\mathbb{R}$ concretely:
- **Dedekind cuts:** $\mathbb{R}$ = set of downward-closed, non-empty, bounded-above subsets of $\mathbb{Q}$ with no maximum.
- **Cauchy sequences:** $\mathbb{R}$ = equivalence classes of Cauchy sequences of rationals, modulo null sequences.
- **Axiomatic:** $\mathbb{R}$ is the unique (up to unique isomorphism) Dedekind-complete ordered field.

All three yield the same object. We adopt the axiomatic viewpoint: treat $\mathbb{R}$ as a given complete ordered field and deduce from the axioms.

---

## 1.2 Field Axioms

> **Definition (Field).** A **field** is a triple $(F, +, \cdot)$ where $F$ is a set with at least two elements, and $+$ and $\cdot$ are binary operations on $F$ satisfying the eleven axioms below.

### Additive axioms

For all $a, b, c \in F$:

1. **(A1) Closure:** $a + b \in F$.
2. **(A2) Associativity:** $(a + b) + c = a + (b + c)$.
3. **(A3) Commutativity:** $a + b = b + a$.
4. **(A4) Identity:** $\exists\ 0 \in F$ such that $a + 0 = a$.
5. **(A5) Inverse:** $\forall a \in F,\ \exists\ (-a) \in F$ such that $a + (-a) = 0$.

### Multiplicative axioms

For all $a, b, c \in F$:

6. **(M1) Closure:** $a \cdot b \in F$.
7. **(M2) Associativity:** $(a \cdot b) \cdot c = a \cdot (b \cdot c)$.
8. **(M3) Commutativity:** $a \cdot b = b \cdot a$.
9. **(M4) Identity:** $\exists\ 1 \in F$ with $1 \neq 0$ such that $a \cdot 1 = a$.
10. **(M5) Inverse:** $\forall a \neq 0,\ \exists\ a^{-1} \in F$ such that $a \cdot a^{-1} = 1$.

### Distributivity

11. **(D)** $a \cdot (b + c) = a \cdot b + a \cdot c$.

$\mathbb{Q}$, $\mathbb{R}$, and $\mathbb{C}$ are fields. $\mathbb{Z}$ is *not* a field (no multiplicative inverse for $2$: $1/2 \notin \mathbb{Z}$). $\mathbb{N}$ is not even a group under $+$ (no additive inverses).

### Consequences of the field axioms

We derive the "obvious" rules of algebra rigorously from the axioms. Every step matters because real analysis proofs will later manipulate expressions under a stack of hypotheses; you need to know *exactly* which axioms justify each move.

> **Proposition 1.1 (Zero absorbs).** For all $a \in F$: $\ 0 \cdot a = 0$.

**Proof.**

1. $0 + 0 = 0$ by (A4) with $a = 0$.
2. Multiply both sides on the right by $a$: $\ (0 + 0) \cdot a = 0 \cdot a$.
3. By distributivity (D): $\ 0 \cdot a + 0 \cdot a = 0 \cdot a$.
4. Add $-(0 \cdot a)$ (which exists by A5) to both sides: $\ 0 \cdot a + 0 \cdot a + (-(0 \cdot a)) = 0 \cdot a + (-(0 \cdot a))$.
5. Associativity (A2) plus inverse (A5) gives: $\ 0 \cdot a + 0 = 0$, i.e., $\ 0 \cdot a = 0$. $\ \blacksquare$

*Why the proof is subtle.* Nothing about the symbol "$0$" intrinsically forces $0 \cdot a = 0$; the property falls out of the interaction between additive identity and distributivity. Lose distributivity and the result evaporates.

---

> **Proposition 1.2 ($(-1) \cdot a = -a$).** For all $a \in F$: $\ (-1) \cdot a = -a$.

**Proof.**

1. Compute $a + (-1) \cdot a$.
2. Using (M4) on the first summand: $\ 1 \cdot a + (-1) \cdot a$.
3. By distributivity (D): $\ (1 + (-1)) \cdot a$.
4. By the additive inverse (A5): $\ 0 \cdot a$.
5. By Proposition 1.1: $\ 0$.
6. So $a + (-1) \cdot a = 0$, meaning $(-1) \cdot a$ is an additive inverse of $a$. By uniqueness of inverse (proved like Proposition 1.3 below), $(-1) \cdot a = -a$. $\ \blacksquare$

---

> **Proposition 1.3 (No zero divisors).** In a field, $a \cdot b = 0 \iff a = 0$ or $b = 0$.

**Proof.**

$(\Leftarrow)$ If $a = 0$, then $a \cdot b = 0 \cdot b = 0$ by Proposition 1.1. Symmetric for $b = 0$.

$(\Rightarrow)$ Suppose $ab = 0$ and $a \neq 0$. We show $b = 0$.

1. Since $a \neq 0$, by (M5) the inverse $a^{-1}$ exists.
2. Multiply $ab = 0$ on the left by $a^{-1}$: $\ a^{-1}(ab) = a^{-1} \cdot 0$.
3. LHS: by (M2), $(a^{-1} a) b = 1 \cdot b = b$.
4. RHS: by Proposition 1.1, $a^{-1} \cdot 0 = 0$.
5. Therefore $b = 0$. $\ \blacksquare$

*Interpretation.* This is the **integral domain** property. It fails in $\mathbb{Z}/6\mathbb{Z}$ where $2 \cdot 3 = 0$ with both nonzero — which is precisely why $\mathbb{Z}/6\mathbb{Z}$ is not a field.

---

> **Proposition 1.4 (Cancellation).** In a field:
> (a) $a + c = b + c \implies a = b$.
> (b) $ac = bc$ and $c \neq 0 \implies a = b$.

**Proof.**

(a) Add $(-c)$ to both sides: $(a + c) + (-c) = (b + c) + (-c)$. Associativity: $a + (c + (-c)) = b + (c + (-c))$, i.e., $a + 0 = b + 0$, so $a = b$.

(b) Since $c \neq 0$, multiply both sides by $c^{-1}$ and argue as in (a), using (M2), (M5), and (M4). $\ \blacksquare$

*Remark.* Note (b) **requires** $c \neq 0$. In $\mathbb{Z}$, $0 \cdot 1 = 0 \cdot 2$ but $1 \neq 2$; cancellation fails precisely when the would-be inverse does not exist.

---

## 1.3 Order Axioms

> **Definition (Ordered field).** An **ordered field** is a field $F$ equipped with a strict total order $<$ satisfying, for all $a, b, c \in F$:
>
> 1. **(O1) Trichotomy:** Exactly one of $a < b$, $a = b$, $b < a$ holds.
> 2. **(O2) Transitivity:** $a < b \wedge b < c \implies a < c$.
> 3. **(O3) Additive compatibility:** $a < b \implies a + c < b + c$.
> 4. **(O4) Multiplicative compatibility with positives:** $a < b \wedge c > 0 \implies ac < bc$.

Notation: $a \leq b$ means $a < b$ or $a = b$. "$a$ is positive" means $a > 0$; "$a$ is negative" means $a < 0$. The set of positives $P = \{x \in F : x > 0\}$ is closed under $+$ and $\cdot$ (exercise) and satisfies $F = P \sqcup \{0\} \sqcup (-P)$ (trichotomy).

### Consequences of the order axioms

> **Proposition 1.5 (Sign flip).** $a > 0 \iff -a < 0$.

**Proof.**

$(\Rightarrow)$ Suppose $a > 0$. Add $-a$ to both sides (O3): $a + (-a) > 0 + (-a)$, i.e., $0 > -a$, i.e., $-a < 0$.

$(\Leftarrow)$ Reverse the steps. $\ \blacksquare$

---

> **Proposition 1.6 (Squares are non-negative).** For all $a \in F$: $\ a^2 \geq 0$.

**Proof.** Use trichotomy.

**Case 1: $a = 0$.** Then $a^2 = 0 \cdot 0 = 0 \geq 0$. $\checkmark$

**Case 2: $a > 0$.** By (O4) with $c = a$: $0 \cdot a < a \cdot a$, i.e., $0 < a^2$. $\checkmark$

**Case 3: $a < 0$.** Then $-a > 0$ (Proposition 1.5). By Case 2, $(-a)^2 > 0$. But
$$(-a)^2 = ((-1)a)((-1)a) = ((-1)(-1))(a \cdot a) = 1 \cdot a^2 = a^2,$$
using Proposition 1.2, associativity, and the identity $(-1)(-1) = 1$ (exercise: this follows from Proposition 1.2 applied to $a = -1$). So $a^2 > 0$. $\checkmark$

In all cases $a^2 \geq 0$. $\ \blacksquare$

**Corollary.** $1 > 0$ (since $1 = 1^2 > 0$, and $1 \neq 0$ by M4, so $1 > 0$ by trichotomy).

---

> **Proposition 1.7 (Positivity of inverses).** If $a > 0$, then $a^{-1} > 0$.

**Proof.** Suppose for contradiction $a^{-1} \leq 0$.

- If $a^{-1} = 0$, then $1 = a \cdot a^{-1} = a \cdot 0 = 0$, contradicting $1 \neq 0$.
- If $a^{-1} < 0$, then $-a^{-1} > 0$ (Proposition 1.5). By (O4) with $c = a > 0$: $a \cdot (-a^{-1}) > 0 \cdot a$, i.e., $-(a \cdot a^{-1}) > 0$, i.e., $-1 > 0$. But $1 > 0$, so $-1 < 0$ (Proposition 1.5), contradiction.

Hence $a^{-1} > 0$. $\ \blacksquare$

---

> **Proposition 1.8 (Order reversal under inversion).** $0 < a < b \implies 0 < b^{-1} < a^{-1}$.

**Proof.**

1. $a, b > 0$, so $a^{-1}, b^{-1} > 0$ (Proposition 1.7).
2. Thus $ab > 0$, and $(ab)^{-1} = b^{-1} a^{-1} > 0$.
3. From $a < b$, multiply both sides by the positive quantity $(ab)^{-1} = a^{-1} b^{-1}$ (using (O4)):
$$a \cdot a^{-1} b^{-1} < b \cdot a^{-1} b^{-1}.$$
4. LHS: $(a \cdot a^{-1}) b^{-1} = 1 \cdot b^{-1} = b^{-1}$.
5. RHS: $(b \cdot b^{-1}) a^{-1} = 1 \cdot a^{-1} = a^{-1}$.
6. Hence $b^{-1} < a^{-1}$. $\ \blacksquare$

*Sanity check.* Take $a = 2, b = 3$: $a^{-1} = 0.5, b^{-1} \approx 0.333$, and indeed $0.333 < 0.5$. ✓

---

**Consequence: $\mathbb{C}$ is not orderable.** Suppose for contradiction that $\mathbb{C}$ admitted a compatible order $<$. Then by Proposition 1.6, $i^2 \geq 0$. But $i^2 = -1$, and $-1 < 0$ in any order where $1 > 0$ (which itself follows from Proposition 1.6). Contradiction. Hence no order on $\mathbb{C}$ can be compatible with the field operations.

$\mathbb{Q}$ and $\mathbb{R}$ are ordered fields; $\mathbb{C}$ is a field but not an ordered field. This single fact is why **real analysis uses order-based tools** (intervals, monotonicity, supremum) while **complex analysis must use metric-based tools** (modulus, winding number, holomorphy).

---

## 1.4 Completeness — What Separates $\mathbb{R}$ from $\mathbb{Q}$

Both $\mathbb{Q}$ and $\mathbb{R}$ are ordered fields. Structurally they look identical so far: you can add, multiply, compare, invert. The chasm opens at completeness.

> **Definition (Upper bound, supremum).** Let $S \subseteq F$ be non-empty.
> - $u \in F$ is an **upper bound** of $S$ if $x \leq u$ for all $x \in S$. $S$ is **bounded above** if an upper bound exists.
> - $\alpha \in F$ is a **least upper bound** (or **supremum**), written $\alpha = \sup S$, if $\alpha$ is an upper bound and $\alpha \leq u$ for every upper bound $u$ of $S$.
> - Dually for lower bounds and infima, $\inf S$.

> **Completeness Axiom (LUB Property, Dedekind completeness).** Every non-empty subset of $\mathbb{R}$ that is bounded above has a least upper bound in $\mathbb{R}$.

The LUB axiom is **not** a theorem; it is a defining property that singles out $\mathbb{R}$ among ordered fields. Equivalent formulations (see [[03-supremum-and-infimum]]):

- **Monotone convergence theorem** — every monotone bounded sequence converges.
- **Nested interval property** — the intersection of a nested sequence of closed bounded intervals is non-empty.
- **Bolzano–Weierstrass** — every bounded sequence has a convergent subsequence.
- **Cauchy completeness + Archimedean property** — every Cauchy sequence converges, and $\mathbb{N}$ is unbounded.

> **Theorem 1.9 ($\mathbb{Q}$ is not complete).** The set $S = \{x \in \mathbb{Q} : x > 0,\ x^2 < 2\}$ is non-empty and bounded above in $\mathbb{Q}$, but has no least upper bound in $\mathbb{Q}$.

**Proof.**

1. **Non-empty.** $1 \in S$ since $1^2 = 1 < 2$.
2. **Bounded above.** If $x \in S$ with $x > 0$, then $x^2 < 2 < 4 = 2^2$, so $x < 2$ (using monotonicity of squaring on positives). Hence $2$ is an upper bound.
3. **No LUB in $\mathbb{Q}$.** Suppose $\alpha = \sup S \in \mathbb{Q}$. Then $\alpha > 0$, and by trichotomy either $\alpha^2 < 2$, $\alpha^2 = 2$, or $\alpha^2 > 2$. We rule out each.

    **Case $\alpha^2 < 2$.** We show $\alpha$ is not an upper bound of $S$ by constructing $\alpha' \in S$ with $\alpha' > \alpha$. Let $\alpha' = \alpha + \varepsilon$ for small $\varepsilon > 0$. We need $\alpha'^2 < 2$:
    $$\alpha'^2 = \alpha^2 + 2\alpha\varepsilon + \varepsilon^2.$$
    If $\varepsilon \leq 1$, then $\varepsilon^2 \leq \varepsilon$, so
    $$\alpha'^2 \leq \alpha^2 + 2\alpha\varepsilon + \varepsilon = \alpha^2 + (2\alpha + 1)\varepsilon.$$
    We want $\alpha^2 + (2\alpha + 1)\varepsilon < 2$, i.e., $\varepsilon < \frac{2 - \alpha^2}{2\alpha + 1}$. Since the RHS is positive (numerator positive by assumption, denominator positive), choose a rational $\varepsilon \in \mathbb{Q}$ with $0 < \varepsilon < \min\{1, (2 - \alpha^2)/(2\alpha + 1)\}$. Then $\alpha' = \alpha + \varepsilon \in \mathbb{Q}$, $\alpha'^2 < 2$, so $\alpha' \in S$, yet $\alpha' > \alpha$. Contradiction with $\alpha$ being an upper bound.

    **Case $\alpha^2 > 2$.** We show $\alpha$ is not the *least* upper bound by finding a smaller upper bound. Take $\alpha' = \alpha - \varepsilon$ with $\varepsilon > 0$ small:
    $$\alpha'^2 = \alpha^2 - 2\alpha\varepsilon + \varepsilon^2 > \alpha^2 - 2\alpha\varepsilon.$$
    We want $\alpha'^2 > 2$, i.e., $\alpha^2 - 2\alpha\varepsilon > 2$, i.e., $\varepsilon < (\alpha^2 - 2)/(2\alpha)$. Choose such a rational $\varepsilon > 0$; then $\alpha' \in \mathbb{Q}$, $\alpha' < \alpha$, and $\alpha'^2 > 2$. For any $x \in S$ (so $x > 0, x^2 < 2$), we have $x^2 < 2 < \alpha'^2$, hence $x < \alpha'$ (monotonicity of squaring on positives). So $\alpha'$ is an upper bound smaller than $\alpha$, contradicting $\alpha = \sup S$.

    **Case $\alpha^2 = 2$.** Forbidden: Theorem 1.10 below.

Every case fails. Hence no $\alpha \in \mathbb{Q}$ can serve as $\sup S$. $\ \blacksquare$

The hole at $\sqrt{2}$ is not an optical illusion — it is a genuine absence in $\mathbb{Q}$, patched up only by passing to $\mathbb{R}$.

---

### $\sqrt{2}$ is irrational — two proofs

> **Theorem 1.10.** There is no $r \in \mathbb{Q}$ with $r^2 = 2$.

**Proof 1 (Pythagorean, by contradiction, using parity).**

1. Suppose $r = p/q$ with $p, q \in \mathbb{Z}$, $q \neq 0$, and $\gcd(p, q) = 1$ (lowest terms), and $r^2 = 2$.
2. Then $p^2/q^2 = 2$, so $p^2 = 2q^2$. Thus $p^2$ is even.
3. **Claim:** $p$ is even. If $p$ were odd, write $p = 2m + 1$, so $p^2 = 4m^2 + 4m + 1 = 2(2m^2 + 2m) + 1$, which is odd. Contradiction with $p^2$ even. Hence $p$ is even.
4. Write $p = 2k$. Substitute: $(2k)^2 = 2q^2 \implies 4k^2 = 2q^2 \implies q^2 = 2k^2$. So $q^2$ is even, hence $q$ is even (same argument).
5. Both $p$ and $q$ are even, so $2 \mid \gcd(p, q)$, contradicting $\gcd(p, q) = 1$. $\ \blacksquare$

**Proof 2 (Descent, no coprimality assumption).**

1. Suppose $p^2 = 2q^2$ has a solution with $p, q \in \mathbb{Z}^+$. By well-ordering, pick one with $q$ minimal.
2. As above, $p$ is even, $p = 2k$, and $q^2 = 2k^2$.
3. So $(q, k)$ is another positive solution, with $k < q$ (since $2k^2 = q^2 \leq q \cdot q$ and $k = q/\sqrt{2}$ — but we cannot use $\sqrt{2}$ here; instead: $2k^2 = q^2$ means $k^2 = q^2/2 < q^2$, so $k < q$).
4. This contradicts minimality of $q$. $\ \blacksquare$

**Proof 3 sketch (rational roots theorem).** If $r = p/q$ in lowest terms is a root of $x^2 - 2 = 0$, the rational roots theorem forces $q \mid 1$ (leading coefficient) and $p \mid 2$ (constant term). So $r \in \{\pm 1, \pm 2\}$. None squares to $2$. Contradiction.

*Interpretation.* Each proof highlights a different technique you will reuse:
- **Proof 1** — parity arguments, extracted from number theory.
- **Proof 2** — infinite descent, the ancestor of minimal-counterexample arguments.
- **Proof 3** — integer roots of polynomials, from abstract algebra.

This proves $\mathbb{Q} \subsetneq \mathbb{R}$ — there are reals that are not rational.

---

## 1.5 The Archimedean Property

A structural consequence of completeness:

> **Theorem 1.11 (Archimedean property).** For every $x \in \mathbb{R}$, there exists $n \in \mathbb{N}$ with $n > x$. Equivalently: $\mathbb{N}$ is unbounded above in $\mathbb{R}$.

**Proof.** Suppose for contradiction $\mathbb{N}$ is bounded above in $\mathbb{R}$. By the LUB axiom, let $\alpha = \sup \mathbb{N}$.

1. Since $\alpha$ is the *least* upper bound, $\alpha - 1 < \alpha$ is not an upper bound. So there exists $n \in \mathbb{N}$ with $n > \alpha - 1$.
2. Then $n + 1 \in \mathbb{N}$ and $n + 1 > \alpha$, contradicting $\alpha$ being an upper bound of $\mathbb{N}$. $\ \blacksquare$

> **Corollary 1.12 (Archimedean, equivalent forms).** For all $x, y \in \mathbb{R}$ with $x > 0$:
> (a) $\exists n \in \mathbb{N}: nx > y$.
> (b) $\exists n \in \mathbb{N}: 1/n < x$.
> (c) $\forall \varepsilon > 0\ \exists n \in \mathbb{N}: 1/n < \varepsilon$, i.e., $\inf\{1/n : n \in \mathbb{N}\} = 0$.

**Proof.** (a) Apply Theorem 1.11 to $y/x$. (b) Apply (a) with $y = 1$. (c) Restate (b). $\ \blacksquare$

*Why this matters.* The Archimedean property is precisely the statement that $\mathbb{R}$ has **no infinitesimals**: no positive $\varepsilon \in \mathbb{R}$ satisfies $\varepsilon < 1/n$ for all $n$. (Non-Archimedean ordered fields — such as the hyperreals — do have infinitesimals, and form the basis of non-standard analysis.)

---

> **Theorem 1.13 (Density of $\mathbb{Q}$ in $\mathbb{R}$).** If $x, y \in \mathbb{R}$ with $x < y$, there exists $q \in \mathbb{Q}$ with $x < q < y$.

**Proof.**

1. Since $y - x > 0$, by Corollary 1.12(b) there exists $n \in \mathbb{N}$ with $1/n < y - x$, i.e., $ny - nx > 1$.
2. We seek $m \in \mathbb{Z}$ with $nx < m < ny$. Since $ny$ and $nx$ differ by more than $1$, some integer lies strictly between them.
3. Formally: let $m = \lfloor nx \rfloor + 1$. Then $m - 1 \leq nx < m$, so $m > nx$; and $m \leq nx + 1 < nx + (ny - nx) = ny$.
4. So $nx < m < ny$; dividing by $n > 0$: $x < m/n < y$. Set $q = m/n \in \mathbb{Q}$. $\ \blacksquare$

**Corollary 1.14 (Density of irrationals).** Between any two reals lies an irrational.

**Proof.** Given $x < y$, by density of $\mathbb{Q}$ find $q \in \mathbb{Q}$ with $x - \sqrt{2} < q < y - \sqrt{2}$. Then $q + \sqrt{2}$ is irrational (else $\sqrt{2} \in \mathbb{Q}$) and $x < q + \sqrt{2} < y$. $\ \blacksquare$

*Interpretation.* $\mathbb{R}$ consists of $\mathbb{Q}$ (countable) and $\mathbb{R} \setminus \mathbb{Q}$ (uncountable), yet **both are dense** in $\mathbb{R}$. Neither subset is "bigger" in the order-theoretic sense, though they differ wildly in cardinality — see [[04-sets-finite-countable-uncountable]].

---

## 1.6 Absolute Value

For $x \in \mathbb{R}$, define
$$|x| = \begin{cases} x & \text{if } x \geq 0, \\ -x & \text{if } x < 0. \end{cases}$$

Equivalently, $|x| = \max\{x, -x\} = \sqrt{x^2}$ (where the square root is the non-negative one).

### Properties of absolute value

For all $x, y \in \mathbb{R}$ and $a \geq 0$:

1. $|x| \geq 0$, with $|x| = 0 \iff x = 0$.
2. $|-x| = |x|$.
3. $|xy| = |x|\,|y|$.
4. $|x + y| \leq |x| + |y|$ — **triangle inequality.**
5. $\big|\,|x| - |y|\,\big| \leq |x - y|$ — **reverse triangle inequality.**
6. $|x| \leq a \iff -a \leq x \leq a$.
7. $|x - y|$ = distance between $x$ and $y$ on the real line.

Properties 1–3 and 6 are routine case analyses. We prove 4 and 5 carefully.

### Proof of the triangle inequality

> **Theorem 1.15.** $|x + y| \leq |x| + |y|$ for all $x, y \in \mathbb{R}$.

**Proof 1 (via Property 6).**

1. $-|x| \leq x \leq |x|$ (by definition of $|x|$; split cases $x \geq 0$ and $x < 0$).
2. $-|y| \leq y \leq |y|$.
3. Add the two inequalities (using order-additivity O3):
$$-(|x| + |y|) = -|x| + (-|y|) \leq x + y \leq |x| + |y|.$$
4. Setting $a = |x| + |y| \geq 0$ and applying Property 6 in reverse: $|x + y| \leq |x| + |y|$. $\ \blacksquare$

**Proof 2 (direct squaring, shows the inequality is sharp).**

1. Both sides non-negative, so squaring preserves the inequality direction.
2. $(|x| + |y|)^2 = |x|^2 + 2|x||y| + |y|^2 = x^2 + 2|xy| + y^2$ (using Property 3).
3. $(x + y)^2 = x^2 + 2xy + y^2$.
4. Subtracting: $(|x| + |y|)^2 - (x + y)^2 = 2(|xy| - xy) \geq 0$, since $|xy| \geq xy$ for all reals.
5. Hence $(x + y)^2 \leq (|x| + |y|)^2$, so $|x + y| \leq |x| + |y|$.

**Equality condition.** From Proof 2, equality holds iff $|xy| = xy$ iff $xy \geq 0$ iff $x, y$ have the same sign (or one is zero). Geometrically: $x$ and $y$ point the same way along the number line.

### Proof of the reverse triangle inequality

> **Theorem 1.16.** $\big|\,|x| - |y|\,\big| \leq |x - y|$ for all $x, y \in \mathbb{R}$.

**Proof.**

1. Write $x = (x - y) + y$. Triangle inequality (Theorem 1.15):
$$|x| \leq |x - y| + |y|,$$
so $|x| - |y| \leq |x - y|$.

2. By symmetry (swap $x \leftrightarrow y$):
$$|y| - |x| \leq |y - x| = |x - y|$$
(using Property 2: $|y - x| = |-(x - y)| = |x - y|$).

3. So both $|x| - |y| \leq |x - y|$ and $-(|x| - |y|) = |y| - |x| \leq |x - y|$.
4. By Property 6, $\big|\,|x| - |y|\,\big| \leq |x - y|$. $\ \blacksquare$

**Interpretation.** The triangle inequality says "the direct path is shortest." The reverse triangle inequality says "small change in input ⇒ small change in magnitude" — it is the statement that $|\cdot|: \mathbb{R} \to \mathbb{R}$ is **$1$-Lipschitz continuous**, a fact we will use constantly in continuity proofs.

---

### Generalized triangle inequality (induction)

> **Corollary 1.17.** For $x_1, \ldots, x_n \in \mathbb{R}$:
> $$\left| \sum_{k=1}^n x_k \right| \leq \sum_{k=1}^n |x_k|.$$

**Proof.** Induction on $n$. Base $n = 1$: trivial. Step: assume for $n$, prove for $n + 1$:
$$\left|\sum_{k=1}^{n+1} x_k\right| = \left|\left(\sum_{k=1}^n x_k\right) + x_{n+1}\right| \overset{\text{Thm 1.15}}{\leq} \left|\sum_{k=1}^n x_k\right| + |x_{n+1}| \overset{\text{IH}}{\leq} \sum_{k=1}^n |x_k| + |x_{n+1}| = \sum_{k=1}^{n+1} |x_k|. \ \blacksquare$$

---

## 1.7 Intervals in $\mathbb{R}$

For $a, b \in \mathbb{R}$ with $a < b$:

| Notation | Definition | Type |
|----------|-----------|------|
| $(a, b)$ | $\{x : a < x < b\}$ | Open, bounded |
| $[a, b]$ | $\{x : a \leq x \leq b\}$ | Closed, bounded (also *compact*) |
| $[a, b)$ | $\{x : a \leq x < b\}$ | Half-open, bounded |
| $(a, b]$ | $\{x : a < x \leq b\}$ | Half-open, bounded |
| $(a, \infty)$ | $\{x : x > a\}$ | Open, unbounded |
| $[a, \infty)$ | $\{x : x \geq a\}$ | Closed, unbounded |
| $(-\infty, b)$ | $\{x : x < b\}$ | Open, unbounded |
| $(-\infty, b]$ | $\{x : x \leq b\}$ | Closed, unbounded |
| $(-\infty, \infty)$ | $\mathbb{R}$ | Both open and closed |

**Note.** $\infty$ and $-\infty$ are *symbols*, not elements of $\mathbb{R}$. Writing $(-\infty, b)$ is shorthand for $\{x \in \mathbb{R} : x < b\}$.

### Characterization of intervals

> **Proposition 1.18.** A subset $I \subseteq \mathbb{R}$ is an interval $\iff$ for all $x, y \in I$ with $x < y$, every $z \in \mathbb{R}$ with $x < z < y$ also lies in $I$ (convexity on the line).

**Proof sketch.** $(\Rightarrow)$ All nine interval types above are convex by inspection. $(\Leftarrow)$ Suppose $I$ is convex, set $a = \inf I \in [-\infty, \infty]$ and $b = \sup I \in [-\infty, \infty]$ (with the convention $\inf \emptyset = +\infty$, etc.). Convexity forces $I$ to be one of $(a, b)$, $[a, b]$, $[a, b)$, $(a, b]$ (depending on whether the endpoints belong to $I$). $\ \blacksquare$

*Why this matters.* In topology, "connected subsets of $\mathbb{R}$" are exactly the intervals. The intermediate value theorem is the statement that the image of a connected set under a continuous map is connected.

---

## 1.8 The Extended Real Line

Sometimes we adjoin $+\infty$ and $-\infty$ to $\mathbb{R}$:
$$\overline{\mathbb{R}} = \mathbb{R} \cup \{-\infty, +\infty\}.$$

### Conventions
- $-\infty < x < +\infty$ for all $x \in \mathbb{R}$.
- $x + \infty = \infty$ and $x - \infty = -\infty$ for $x \in \mathbb{R}$.
- $\infty + \infty = \infty$; $-\infty + (-\infty) = -\infty$.
- $x \cdot \infty = \infty$ if $x > 0$ and $x \cdot \infty = -\infty$ if $x < 0$.
- $\infty \cdot \infty = \infty$, $(-\infty) \cdot \infty = -\infty$.

### Indeterminate (undefined) forms
- $\infty - \infty$, $0 \cdot \infty$, $\infty / \infty$, $0 / 0$, $1^\infty$, $0^0$, $\infty^0$.

These are left undefined because they cannot be assigned consistent values — limit processes yield different answers depending on the path.

$\overline{\mathbb{R}}$ is *not* a field (it fails closure of $+$ once indeterminate forms appear, and there are no additive inverses for $\pm \infty$). It is a convenient **order-completion**: every subset of $\overline{\mathbb{R}}$ has a supremum and infimum (taking $\sup \emptyset = -\infty$, $\inf \emptyset = +\infty$ by convention).

*Use case.* Statements like "$\lim_{n \to \infty} a_n = +\infty$" or "$\sup S = +\infty$ when $S$ is unbounded above" become uniform and clean in $\overline{\mathbb{R}}$.

---

## 1.9 The Complex Number System

### Definition
$$\mathbb{C} = \{a + bi : a, b \in \mathbb{R}\}, \quad i^2 = -1.$$

For $z = a + bi$: **real part** $\operatorname{Re}(z) = a$, **imaginary part** $\operatorname{Im}(z) = b$.

Formally, $\mathbb{C}$ can be constructed as $\mathbb{R}^2$ with $(a, b) + (c, d) = (a + c, b + d)$ and $(a, b) \cdot (c, d) = (ac - bd, ad + bc)$. Setting $i = (0, 1)$ one checks $i^2 = (-1, 0)$, identified with $-1 \in \mathbb{R}$.

### Operations

For $z = a + bi$, $w = c + di$:
- $z + w = (a + c) + (b + d)i$
- $z \cdot w = (ac - bd) + (ad + bc)i$
- **Conjugate:** $\bar{z} = a - bi$
- **Modulus:** $|z| = \sqrt{a^2 + b^2} = \sqrt{z\bar{z}}$
- **Inverse** (for $z \neq 0$): $z^{-1} = \bar{z}/|z|^2$

*Verification of $z^{-1}$.* $z \cdot z^{-1} = z \cdot \bar{z}/|z|^2 = |z|^2 / |z|^2 = 1$. ✓

### Properties of conjugation and modulus

1. $\overline{z + w} = \bar{z} + \bar{w}$, $\overline{zw} = \bar{z}\bar{w}$.
2. $\bar{\bar{z}} = z$.
3. $z + \bar{z} = 2\operatorname{Re}(z)$, $z - \bar{z} = 2i\operatorname{Im}(z)$.
4. $|z|^2 = z\bar{z}$.
5. $|zw| = |z||w|$.
6. $|z + w| \leq |z| + |w|$ (triangle inequality in $\mathbb{C}$).
7. $\big||z| - |w|\big| \leq |z - w|$.

**Proof of Property 6 (complex triangle inequality).**

1. $|z + w|^2 = (z + w)\overline{(z + w)} = (z + w)(\bar{z} + \bar{w}) = z\bar{z} + z\bar{w} + w\bar{z} + w\bar{w}$.
2. $= |z|^2 + (z\bar{w} + \overline{z\bar{w}}) + |w|^2 = |z|^2 + 2\operatorname{Re}(z\bar{w}) + |w|^2$.
3. Since $\operatorname{Re}(\zeta) \leq |\zeta|$ for any $\zeta \in \mathbb{C}$, and $|z\bar{w}| = |z||\bar{w}| = |z||w|$:
$$|z + w|^2 \leq |z|^2 + 2|z||w| + |w|^2 = (|z| + |w|)^2.$$
4. Both sides non-negative, take square roots: $|z + w| \leq |z| + |w|$. $\ \blacksquare$

### Polar form

Every $z \neq 0$ has a polar representation
$$z = r(\cos\theta + i\sin\theta) = re^{i\theta},$$
where $r = |z| > 0$ and $\theta = \arg(z) \in (-\pi, \pi]$ (principal argument). The exponential form uses **Euler's identity** $e^{i\theta} = \cos\theta + i\sin\theta$ (established rigorously via power series in complex analysis).

**De Moivre's theorem:** $(re^{i\theta})^n = r^n e^{in\theta}$ for all $n \in \mathbb{Z}$.

*Proof sketch.* Induction on $n \geq 0$ using $e^{i\alpha} \cdot e^{i\beta} = e^{i(\alpha + \beta)}$ (which reduces to the sine/cosine addition formulas). Extend to negative $n$ via $e^{-i\theta} = 1/e^{i\theta}$.

$\mathbb{C}$ is a field, but as established in §1.3 it **cannot** be ordered compatibly with its field structure. Because of this, real analysis — fundamentally an order-based subject — develops its core theory on $\mathbb{R}$; complex analysis (see [[08-complex-numbers]]) substitutes metric and holomorphic structure for order.

---

## 1.10 Worked Examples

**Example 1 (Density of $\mathbb{R}$).** Prove that if $a, b \in \mathbb{R}$ with $a < b$, then there exists $c \in \mathbb{R}$ with $a < c < b$.

**Setup.** We must *exhibit* such $c$. The midpoint is the natural candidate.

**Strategy.** Take $c = (a + b)/2$ and verify both strict inequalities using order-compatibility axioms (O3) and (O4).

**Computation.**

1. Start from $a < b$.
2. Add $a$ to both sides (O3): $a + a < a + b$, i.e., $2a < a + b$.
3. $2 > 0$ (since $1 > 0$ and $2 = 1 + 1 > 0$), so $2^{-1} > 0$ (Proposition 1.7). Multiply by $2^{-1}$ (O4): $a < (a + b)/2 = c$. ✓
4. Similarly, add $b$ to $a < b$ (O3): $a + b < 2b$. Multiply by $2^{-1} > 0$ (O4): $c = (a + b)/2 < b$. ✓
5. Combining: $a < c < b$. $\ \blacksquare$

**Verification.** Take $a = 1.2, b = 1.3$. Then $c = 1.25$, and indeed $1.2 < 1.25 < 1.3$. ✓

**Interpretation.** This shows $\mathbb{R}$ (and more generally *any* ordered field with characteristic zero) is **densely ordered**: between any two elements lies another. Combined with density of $\mathbb{Q}$ in $\mathbb{R}$, we see both $\mathbb{Q}$ and $\mathbb{R}$ have no "gaps" in the order-theoretic sense, yet only $\mathbb{R}$ is complete. Density and completeness are independent properties.

---

**Example 2 (Absolute-value inequality).** Solve $|2x - 5| < 3$.

**Setup.** An inequality with absolute value; use Property 6 to remove the $|\cdot|$.

**Strategy.** Translate $|u| < a$ into $-a < u < a$ (for $a > 0$), then solve the linear double inequality.

**Computation.**

1. $|2x - 5| < 3 \iff -3 < 2x - 5 < 3$.
2. Add $5$ to all three parts (O3 applied twice): $2 < 2x < 8$.
3. Divide by $2 > 0$ (multiply by $1/2 > 0$, O4): $1 < x < 4$.
4. Solution set: the open interval $(1, 4)$.

**Verification.** Check boundary behavior.
- At $x = 1$: $|2(1) - 5| = |-3| = 3$, not strictly $< 3$. Boundary excluded. ✓
- At $x = 4$: $|2(4) - 5| = 3$. Boundary excluded. ✓
- Interior test: $x = 2.5$ gives $|2(2.5) - 5| = 0 < 3$. ✓

**Interpretation.** Geometrically, $|2x - 5| < 3$ says "the point $2x$ is within distance $3$ of $5$," i.e., $2x \in (2, 8)$, i.e., $x \in (1, 4)$. Absolute-value inequalities are always statements about **distance**.

---

**Example 3 (Max/min formula).** Prove that for all $a, b \in \mathbb{R}$,
$$\max(a, b) = \frac{a + b + |a - b|}{2}, \quad \min(a, b) = \frac{a + b - |a - b|}{2}.$$

**Setup.** A closed-form identity for the piecewise function $\max$. Prove by case analysis.

**Strategy.** Split on the sign of $a - b$ (which determines $|a - b|$), verify the formula in each case, and check the symmetry $a + b = \max(a, b) + \min(a, b)$ to get $\min$ for free.

**Computation.**

**Case 1: $a \geq b$.** Then $a - b \geq 0$, so $|a - b| = a - b$. Compute:
$$\frac{a + b + (a - b)}{2} = \frac{2a}{2} = a = \max(a, b). \ \checkmark$$

**Case 2: $a < b$.** Then $a - b < 0$, so $|a - b| = -(a - b) = b - a$. Compute:
$$\frac{a + b + (b - a)}{2} = \frac{2b}{2} = b = \max(a, b). \ \checkmark$$

In both cases the formula holds. For the $\min$ formula, note
$$\max(a, b) + \min(a, b) = a + b \implies \min(a, b) = a + b - \max(a, b) = \frac{2(a + b) - (a + b + |a - b|)}{2} = \frac{a + b - |a - b|}{2}. \ \checkmark$$

$\blacksquare$

**Verification.** Take $a = 7, b = 3$: $|a - b| = 4$; $(7 + 3 + 4)/2 = 7 = \max$. ✓. And $(7 + 3 - 4)/2 = 3 = \min$. ✓.

Take $a = -2, b = 5$: $|a - b| = 7$; $(-2 + 5 + 7)/2 = 5 = \max$. ✓.

**Interpretation.** These formulas are the **algebraic** encoding of what is essentially a case distinction. They let us manipulate $\max$ and $\min$ inside algebraic proofs without case splits — a trick used throughout optimization and inequalities.

---

**Example 4 (De Moivre computation).** Compute $(1 + i)^8$.

**Setup.** Power of a complex number; polar form makes exponentiation trivial via De Moivre.

**Strategy.** Convert to polar, apply De Moivre, convert back.

**Computation.**

1. **Polar form of $1 + i$.** $r = |1 + i| = \sqrt{1^2 + 1^2} = \sqrt{2}$. $\theta = \arg(1 + i) = \arctan(1/1) = \pi/4$ (first quadrant). So $1 + i = \sqrt{2}\, e^{i\pi/4}$.
2. **Apply De Moivre:** $(1 + i)^8 = (\sqrt{2})^8 \cdot e^{i \cdot 8 \cdot \pi/4} = 2^4 \cdot e^{i 2\pi} = 16 \cdot e^{i 2\pi}$.
3. **Back to rectangular:** $e^{i 2\pi} = \cos(2\pi) + i\sin(2\pi) = 1 + 0 i = 1$.
4. **Final:** $(1 + i)^8 = 16$.

**Verification (direct).** Compute step by step:
- $(1 + i)^2 = 1 + 2i + i^2 = 2i$.
- $(1 + i)^4 = (2i)^2 = 4i^2 = -4$.
- $(1 + i)^8 = (-4)^2 = 16$. ✓

**Interpretation.** Polar form turns multiplication into addition of angles, so $(re^{i\theta})^n$ is routine. Without polar form, even $(1 + i)^8$ requires several binomial expansions. This is why physicists and engineers universally work in polar form for wave and AC-circuit calculations.

---

**Example 5 (The $\varepsilon/2$ trick).** Show that if $|x - a| < \varepsilon/2$ and $|y - b| < \varepsilon/2$, then $|(x + y) - (a + b)| < \varepsilon$.

**Setup.** Prototype of a limit proof: given distance control on $x$ and $y$ individually, derive distance control on their sum.

**Strategy.** Regroup the expression algebraically, then apply the triangle inequality, then combine the two hypothesized bounds.

**Computation.**

1. Regroup: $(x + y) - (a + b) = (x - a) + (y - b)$.
2. Apply triangle inequality (Theorem 1.15):
$$|(x + y) - (a + b)| = |(x - a) + (y - b)| \leq |x - a| + |y - b|.$$
3. Substitute the hypotheses:
$$|x - a| + |y - b| < \varepsilon/2 + \varepsilon/2 = \varepsilon.$$
4. So $|(x + y) - (a + b)| < \varepsilon$. $\ \blacksquare$

**Verification (dimensional).** If each input is controlled to tolerance $\delta = \varepsilon/2$, the sum is controlled to tolerance $\varepsilon$. The "loss factor" is $2$, exactly the number of summands.

**Interpretation.** This **$\varepsilon/2$ trick** is the workhorse of analysis. It generalizes: for an $n$-term sum, control each term to $\varepsilon/n$ to get total error $< \varepsilon$. The trick is what makes "the sum of two continuous functions is continuous," "the sum of two convergent sequences converges," and "linearity of the Riemann integral" all go through. You will invoke it so often it becomes muscle memory.

---

**Example 6 (Density of $\mathbb{Q}$, constructive).** Find a rational number between $\sqrt{3}$ and $\sqrt{3} + 10^{-3}$.

**Setup.** Apply the density theorem (Theorem 1.13), but explicitly construct the rational.

**Strategy.** Theorem 1.13 tells us to pick $n > 1/(y - x)$ and set $q = \lfloor nx \rfloor + 1)/n$.

**Computation.**

1. Here $x = \sqrt{3} \approx 1.7320508\ldots$ and $y = \sqrt{3} + 10^{-3} \approx 1.7330508\ldots$. Gap: $y - x = 10^{-3}$.
2. Choose $n$ with $1/n < 10^{-3}$, i.e., $n > 1000$. Take $n = 1001$.
3. $nx = 1001 \sqrt{3} \approx 1733.8228\ldots$, so $\lfloor nx \rfloor = 1733$ and $m = 1734$.
4. $q = m/n = 1734/1001 \approx 1.73226\ldots$

**Verification.**
- Is $q > \sqrt{3}$? Need $1734/1001 > \sqrt{3}$, i.e., $1734 > 1001\sqrt{3} \approx 1733.82$. Yes. ✓
- Is $q < \sqrt{3} + 10^{-3}$? Need $1734/1001 - \sqrt{3} < 10^{-3}$. Compute: $q - \sqrt{3} \approx 1.73226 - 1.73205 = 0.00021 < 10^{-3}$. ✓

**Interpretation.** Any gap, no matter how small, contains a rational. The density theorem is **constructive**: the decimal expansion of $\sqrt{3}$ itself gives a sequence of rational approximations, and truncation at enough decimal places always lands in the target gap.

---

## 1.11 Practice Problems

1. Prove that $\sqrt{3}$ is irrational.

2. Solve $|x - 2| + |x + 1| = 5$ for all $x \in \mathbb{R}$.

3. (Parallelogram law.) Show that for all $a, b \in \mathbb{R}$: $|a + b|^2 + |a - b|^2 = 2(a^2 + b^2)$.

4. Find all $z \in \mathbb{C}$ with $z^3 = 8$. Locate them on the unit circle scaled by $2$.

5. (Refined triangle inequality.) Prove $|x| + |y| \leq |x + y| + |x - y|$ for all $x, y \in \mathbb{R}$.

6. Prove that every non-empty subset of $\mathbb{R}$ bounded below has a greatest lower bound (infimum). *[I.e., the LUB axiom is equivalent to the GLB property.]*

7. (Bernoulli's inequality.) Prove that for all $x > -1$ and integers $n \geq 0$: $(1 + x)^n \geq 1 + nx$, with equality iff $n \in \{0, 1\}$ or $x = 0$.

8. (Archimedean consequence.) Prove: if $x \in \mathbb{R}$ satisfies $0 \leq x < 1/n$ for every $n \in \mathbb{N}$, then $x = 0$.

9. Show that for all $z, w \in \mathbb{C}$:
$$|z + w|^2 + |z - w|^2 = 2(|z|^2 + |w|^2).$$
(The complex parallelogram law.)

10. *(Qualifying-exam level.)* Suppose $F$ is an ordered field in which every non-empty set bounded above has a least upper bound. Prove that $F$ is Archimedean, i.e., $\mathbb{N}$ is unbounded in $F$. Then prove the density of "rationals" of $F$ (i.e., the image of $\mathbb{Q}$ in $F$ under the canonical embedding).

---

### Solutions

**Solution 1 (Irrationality of $\sqrt{3}$).**

**Setup.** Mirror the proof for $\sqrt{2}$, replacing parity (mod $2$) by divisibility by $3$.

**Strategy.** Assume $\sqrt{3} = p/q$ with $\gcd(p, q) = 1$, derive contradiction.

**Computation.**

1. Suppose $\sqrt{3} = p/q$ with $p, q \in \mathbb{Z}$, $q \neq 0$, $\gcd(p, q) = 1$.
2. Square: $p^2/q^2 = 3$, so $p^2 = 3q^2$. Therefore $3 \mid p^2$.
3. **Claim:** $3 \mid p$. Since $3$ is prime, if $3 \nmid p$ then by Fermat/Euclid's lemma $3 \nmid p \cdot p = p^2$. Contrapositive: $3 \mid p^2 \implies 3 \mid p$.
4. Write $p = 3k$ with $k \in \mathbb{Z}$. Substitute: $(3k)^2 = 3q^2 \implies 9k^2 = 3q^2 \implies q^2 = 3k^2$. So $3 \mid q^2$, hence by the claim (applied to $q$), $3 \mid q$.
5. Both $p$ and $q$ are divisible by $3$, so $3 \mid \gcd(p, q) = 1$. But $3 \nmid 1$, contradiction. $\ \blacksquare$

**Verification (structural).** The same strategy proves $\sqrt{n}$ is irrational whenever $n$ is not a perfect square. The key step is Euclid's lemma ($p$ prime, $p \mid ab \Rightarrow p \mid a$ or $p \mid b$), which is exactly the failure mode in $\mathbb{Z}/n\mathbb{Z}$ for composite $n$.

**Interpretation.** Irrationality is a **divisibility-theoretic** phenomenon at heart, though it bears analytic consequences (existence of transcendentals, density arguments, measure theory).

---

**Solution 2 (Sum of absolute values).** Solve $|x - 2| + |x + 1| = 5$.

**Setup.** The LHS is a piecewise-linear function of $x$; break into intervals determined by the "critical points" $x = 2$ and $x = -1$ (where one of the inner expressions changes sign).

**Strategy.** Split into three regions, solve the resulting linear equations, check each candidate lies in its region of origin.

**Computation.**

**Region A: $x \geq 2$.** Then $x - 2 \geq 0$, so $|x - 2| = x - 2$; also $x + 1 \geq 3 > 0$, so $|x + 1| = x + 1$.

Equation: $(x - 2) + (x + 1) = 5 \implies 2x - 1 = 5 \implies x = 3$.

Check $x = 3 \geq 2$. ✓ Valid solution.

**Region B: $-1 \leq x < 2$.** Then $x - 2 < 0$, so $|x - 2| = -(x - 2) = 2 - x$; and $x + 1 \geq 0$, so $|x + 1| = x + 1$.

Equation: $(2 - x) + (x + 1) = 5 \implies 3 = 5$, which is false. No solutions in this region.

**Region C: $x < -1$.** Then $x - 2 < -3 < 0$, so $|x - 2| = 2 - x$; and $x + 1 < 0$, so $|x + 1| = -(x + 1) = -x - 1$.

Equation: $(2 - x) + (-x - 1) = 5 \implies 1 - 2x = 5 \implies -2x = 4 \implies x = -2$.

Check $x = -2 < -1$. ✓ Valid solution.

**Final answer.** $x = 3$ or $x = -2$.

**Verification.**
- $x = 3$: $|3 - 2| + |3 + 1| = 1 + 4 = 5$. ✓
- $x = -2$: $|-2 - 2| + |-2 + 1| = 4 + 1 = 5$. ✓

**Interpretation.** Geometrically, the equation asks: *which points $x$ on the real line have the sum of distances from $2$ and $-1$ equal to $5$?* Since $|2 - (-1)| = 3$, the interval $[-1, 2]$ has "inner distance" $3$ from the two critical points (sum of distances $\equiv 3$ there, ruling out region B). Outside $[-1, 2]$, the sum grows linearly with slope $2$ (in both directions). To reach $5$, we add $2 = 5 - 3$ to the inner sum, which requires walking $(5 - 3)/2 = 1$ unit beyond either endpoint: $x = 2 + 1 = 3$ or $x = -1 - 1 = -2$.

---

**Solution 3 (Parallelogram law, real).** Show $|a + b|^2 + |a - b|^2 = 2(a^2 + b^2)$.

**Setup.** For real $a, b$: $|x|^2 = x^2$. So the LHS is $(a + b)^2 + (a - b)^2$.

**Strategy.** Expand both squares and collect terms.

**Computation.**

1. $(a + b)^2 = a^2 + 2ab + b^2$ (by distributivity and commutativity).
2. $(a - b)^2 = a^2 - 2ab + b^2$.
3. Sum: $(a + b)^2 + (a - b)^2 = (a^2 + 2ab + b^2) + (a^2 - 2ab + b^2) = 2a^2 + 2b^2 = 2(a^2 + b^2)$. $\ \blacksquare$

**Verification.** Take $a = 3, b = 1$: LHS $= 16 + 4 = 20$; RHS $= 2(9 + 1) = 20$. ✓

**Interpretation.** The parallelogram law says: *in a parallelogram with sides $a$ and $b$, the sum of squares of diagonals equals twice the sum of squares of sides.* This generalizes to inner product spaces and characterizes them among normed spaces (the Jordan–von Neumann theorem: a norm comes from an inner product iff it satisfies the parallelogram law).

---

**Solution 4 (Cube roots of $8$).** Find all $z \in \mathbb{C}$ with $z^3 = 8$.

**Setup.** $8 \in \mathbb{R} \subset \mathbb{C}$, with polar form $8 = 8 e^{i \cdot 0} = 8 e^{i \cdot 2k\pi}$ for any $k \in \mathbb{Z}$.

**Strategy.** Write $z = re^{i\theta}$, equate moduli and arguments, then enumerate the three distinct arguments.

**Computation.**

1. Write $z = re^{i\theta}$ with $r > 0$, $\theta \in \mathbb{R}$.
2. $z^3 = r^3 e^{i 3\theta}$, and we want this to equal $8 = 8 e^{i 2k\pi}$ for some $k \in \mathbb{Z}$.
3. **Modulus:** $r^3 = 8$, so $r = 2$ (positive real cube root).
4. **Argument:** $3\theta = 2k\pi$ for some $k$, so $\theta = 2k\pi/3$.
5. Distinct values of $z$ arise from $k = 0, 1, 2$ (since $\theta$ and $\theta + 2\pi$ give the same $z$):
   - $k = 0$: $\theta = 0$, $z_0 = 2 e^{i \cdot 0} = 2$.
   - $k = 1$: $\theta = 2\pi/3$, $z_1 = 2 e^{i 2\pi/3} = 2(\cos(120°) + i\sin(120°)) = 2(-1/2 + i\sqrt{3}/2) = -1 + i\sqrt{3}$.
   - $k = 2$: $\theta = 4\pi/3$, $z_2 = 2 e^{i 4\pi/3} = 2(-1/2 - i\sqrt{3}/2) = -1 - i\sqrt{3}$.

**Final answer.** $\{2,\ -1 + i\sqrt{3},\ -1 - i\sqrt{3}\}$.

**Verification.**
- $z_0^3 = 8$. ✓
- $z_1^3 = (2e^{i 2\pi/3})^3 = 8 e^{i 2\pi} = 8$. ✓
- Sum of roots: $2 + (-1 + i\sqrt{3}) + (-1 - i\sqrt{3}) = 0$. This matches Vieta's formula for $z^3 - 8 = 0$ (sum of roots $= 0$ since coefficient of $z^2$ is zero). ✓
- Product: $2 \cdot (-1 + i\sqrt{3})(-1 - i\sqrt{3}) = 2(1 + 3) = 8$. Matches Vieta (product of roots $=$ constant term $\cdot (-1)^3 = 8$). ✓

**Interpretation.** The three cube roots of $8$ are the vertices of an equilateral triangle inscribed in the circle $|z| = 2$, with one vertex at $z = 2$. More generally, the $n$-th roots of any $w \in \mathbb{C}^*$ form the vertices of a regular $n$-gon centered at the origin, with radius $|w|^{1/n}$.

---

**Solution 5 (Refined triangle inequality).** Prove $|x| + |y| \leq |x + y| + |x - y|$.

**Setup.** The RHS equals the sum of two "triangle inequality components" applied differently.

**Strategy.** Express $2x$ and $2y$ as combinations of $(x + y)$ and $(x - y)$, then apply triangle inequality twice and add.

**Computation.**

1. Note: $2x = (x + y) + (x - y)$ and $2y = (x + y) - (x - y)$.
2. Triangle inequality on $2x$:
$$2|x| = |2x| = |(x + y) + (x - y)| \leq |x + y| + |x - y|.$$
3. Triangle inequality on $2y$ (using $|{-(x - y)}| = |x - y|$):
$$2|y| = |2y| = |(x + y) - (x - y)| \leq |x + y| + |{-(x - y)}| = |x + y| + |x - y|.$$
4. Add:
$$2|x| + 2|y| \leq 2(|x + y| + |x - y|).$$
5. Divide by $2 > 0$:
$$|x| + |y| \leq |x + y| + |x - y|. \ \blacksquare$$

**Verification.** Take $x = 3, y = -5$: LHS = $3 + 5 = 8$; $|x + y| = 2, |x - y| = 8$, RHS = $10$. $8 \leq 10$. ✓ (The gap $2$ is the "pointing-opposite penalty.")

Take $x = 3, y = 2$: LHS = $5$; $|x + y| = 5, |x - y| = 1$, RHS = $6$. $5 \leq 6$. ✓

**Interpretation.** This is the real-line prototype of a **quadrilateral inequality**: the sum of two "sides" ($|x|, |y|$) is bounded by the sum of the two "diagonals" ($|x + y|, |x - y|$) of the parallelogram spanned by $x, y$. The inequality becomes equality when $x, y$ have the same sign (no triangle cancellation).

---

**Solution 6 (GLB from LUB).** Prove every non-empty $S \subseteq \mathbb{R}$ bounded below has a greatest lower bound.

**Setup.** Reduce to LUB by reflecting through $0$.

**Strategy.** Let $-S = \{-s : s \in S\}$; a lower bound of $S$ becomes an upper bound of $-S$, and vice versa.

**Computation.**

1. Let $S \neq \emptyset$ be bounded below, with lower bound $m$ (so $s \geq m$ for all $s \in S$).
2. Define $-S := \{-s : s \in S\} \neq \emptyset$.
3. For all $s \in S$: $s \geq m \implies -s \leq -m$. So $-m$ is an upper bound of $-S$. Hence $-S$ is bounded above.
4. By the LUB axiom, $\alpha := \sup(-S) \in \mathbb{R}$ exists.
5. **Claim:** $-\alpha = \inf S$.
    - *Lower bound:* For all $s \in S$: $-s \leq \alpha \implies s \geq -\alpha$. So $-\alpha$ is a lower bound.
    - *Greatest:* Suppose $\beta$ is a lower bound of $S$. Then $-\beta$ is an upper bound of $-S$ (same argument as step 3). By definition of $\sup$: $\alpha \leq -\beta$, i.e., $-\alpha \geq \beta$. So $-\alpha$ is the greatest lower bound.
6. Hence $\inf S = -\sup(-S) \in \mathbb{R}$ exists. $\ \blacksquare$

**Verification.** Take $S = \{1/n : n \in \mathbb{N}\}$; $-S = \{-1/n : n \in \mathbb{N}\}$. $\sup(-S) = 0$ (approached by $-1/n$ as $n \to \infty$ from below). Hence $\inf S = 0$. Check: $0$ is indeed the greatest lower bound of $\{1, 1/2, 1/3, \ldots\}$, since every $1/n > 0$ and by Archimedean property no positive number lower-bounds the set. ✓

**Interpretation.** The LUB axiom implies the GLB axiom, and conversely. They are **symmetric** ways of stating the same completeness property. Either suffices as the defining property of $\mathbb{R}$.

---

**Solution 7 (Bernoulli's inequality).** For $x > -1$ and $n \in \mathbb{Z}_{\geq 0}$: $(1 + x)^n \geq 1 + nx$.

**Setup.** Induction on $n$. The hypothesis $x > -1$ ensures $1 + x > 0$, so multiplying by $(1 + x)$ preserves inequalities.

**Strategy.** Base $n = 0$: trivial equality. Step: assume $(1 + x)^n \geq 1 + nx$, deduce $(1 + x)^{n+1} \geq 1 + (n+1)x$.

**Computation.**

**Base case $n = 0$.** $(1 + x)^0 = 1 = 1 + 0 \cdot x$. Equality. ✓

**Base case $n = 1$.** $(1 + x)^1 = 1 + x = 1 + 1 \cdot x$. Equality. ✓

**Inductive step.** Assume $(1 + x)^n \geq 1 + nx$ for some $n \geq 1$. Then:
$$(1 + x)^{n+1} = (1 + x)^n \cdot (1 + x).$$
Since $1 + x > 0$, multiply the inductive hypothesis by $(1 + x)$ (O4):
$$(1 + x)^{n+1} \geq (1 + nx)(1 + x) = 1 + x + nx + nx^2 = 1 + (n + 1)x + nx^2.$$
Since $nx^2 \geq 0$ (Proposition 1.6 and $n \geq 0$), we conclude:
$$(1 + x)^{n+1} \geq 1 + (n + 1)x + nx^2 \geq 1 + (n + 1)x. \ \checkmark$$

**Equality analysis.** Equality in the step requires $nx^2 = 0$. For $n \geq 2$, this forces $x = 0$. For $n = 0, 1$, equality is automatic. So equality holds iff $n \in \{0, 1\}$ or $x = 0$. $\ \blacksquare$

**Verification.** Take $x = 1/2, n = 3$: LHS = $(3/2)^3 = 27/8 = 3.375$; RHS = $1 + 3/2 = 2.5$. $3.375 \geq 2.5$. ✓

Take $x = -1/2, n = 2$: LHS = $(1/2)^2 = 0.25$; RHS = $1 + 2(-1/2) = 0$. $0.25 \geq 0$. ✓

**Interpretation.** Bernoulli's inequality is the workhorse for estimating $e^x$ from below (via $(1 + x/n)^n$), proving $\lim (1 + 1/n)^n = e$, showing divergence of the harmonic series, and much more. The hypothesis $x > -1$ is essential: for $x < -1$ the sign of $(1 + x)^n$ alternates with parity of $n$.

---

**Solution 8 (Archimedean consequence).** If $0 \leq x < 1/n$ for every $n \in \mathbb{N}$, then $x = 0$.

**Setup.** Use Corollary 1.12(c) — given any positive $\varepsilon$, there is $n$ with $1/n < \varepsilon$.

**Strategy.** Suppose $x > 0$ and derive contradiction.

**Computation.**

1. Suppose $x > 0$. By Corollary 1.12(b) applied to $x$: there exists $n \in \mathbb{N}$ with $1/n < x$.
2. But the hypothesis says $x < 1/n$ for every $n$, contradicting $1/n < x$.
3. Hence the supposition $x > 0$ fails; combined with $x \geq 0$, we get $x = 0$. $\ \blacksquare$

**Verification.** The conclusion cannot be strengthened: the condition "$0 \leq x < 1/n$ for all $n$" is strictly stronger than "$0 \leq x$." The former forces $x = 0$, the latter only ensures non-negativity.

**Interpretation.** This is the *"to prove something is zero, show it is smaller than every positive number"* technique — the engine behind many analysis proofs (e.g., showing a continuous function whose integral is zero is identically zero).

---

**Solution 9 (Complex parallelogram law).** Show $|z + w|^2 + |z - w|^2 = 2(|z|^2 + |w|^2)$.

**Setup.** Use $|u|^2 = u\bar{u}$ and expand.

**Strategy.** Expand both $|z + w|^2$ and $|z - w|^2$ using conjugation, sum, simplify.

**Computation.**

1. $|z + w|^2 = (z + w)\overline{(z + w)} = (z + w)(\bar{z} + \bar{w}) = z\bar{z} + z\bar{w} + w\bar{z} + w\bar{w} = |z|^2 + z\bar{w} + w\bar{z} + |w|^2$.
2. $|z - w|^2 = (z - w)(\bar{z} - \bar{w}) = z\bar{z} - z\bar{w} - w\bar{z} + w\bar{w} = |z|^2 - z\bar{w} - w\bar{z} + |w|^2$.
3. Sum: $|z + w|^2 + |z - w|^2 = 2|z|^2 + 2|w|^2 = 2(|z|^2 + |w|^2)$.

The cross terms $\pm (z\bar{w} + w\bar{z})$ cancel. $\ \blacksquare$

**Verification.** Take $z = 1 + i, w = 1 - i$: $|z|^2 = 2, |w|^2 = 2$. $z + w = 2, z - w = 2i$; $|z + w|^2 = 4, |z - w|^2 = 4$. LHS = $8$; RHS = $2(2 + 2) = 8$. ✓

**Interpretation.** Holds in any inner product space with $|u|^2 = \langle u, u \rangle$. The cancellation of cross terms $z\bar{w} + w\bar{z} = 2\operatorname{Re}(z\bar{w})$ between the $+$ and $-$ versions is the algebraic signature of the parallelogram identity.

---

**Solution 10 (Qualifying-exam: Completeness ⇒ Archimedean).**

**Setup.** Show that in any Dedekind-complete ordered field $F$, the image of $\mathbb{N}$ (via $n \mapsto 1 + 1 + \cdots + 1$, $n$ copies) is unbounded, and the image of $\mathbb{Q}$ is dense.

**Strategy.** Mimic the proof of Theorem 1.11 purely from the axioms, being careful to distinguish $\mathbb{N} \subset F$ (the abstract image) from $\mathbb{N}$-the-set.

**Computation.**

**Part 1: Archimedean property.**

1. Every ordered field $F$ contains a canonical image of $\mathbb{N}$: $\mathbf{1}, \mathbf{1} + \mathbf{1}, \ldots$, where $\mathbf{1}$ is the multiplicative identity of $F$. We denote this embedded copy by $N \subset F$.
2. Suppose $N$ is bounded above in $F$. By completeness, $\alpha = \sup N \in F$ exists.
3. $\alpha - \mathbf{1} < \alpha$, so $\alpha - \mathbf{1}$ is not an upper bound of $N$. Hence there exists $k \in N$ with $k > \alpha - \mathbf{1}$.
4. Then $k + \mathbf{1} \in N$ (closure of $N$ under adding $\mathbf{1}$) and $k + \mathbf{1} > \alpha$, contradicting $\alpha$ being an upper bound.
5. So $N$ is unbounded. $\ \blacksquare$

**Part 2: Density of $\mathbb{Q} \hookrightarrow F$.**

1. The embedded $N$ generates an embedded $\mathbb{Z}$ (via additive inverses) and then an embedded $\mathbb{Q}$ (via $a \cdot b^{-1}$ for $a, b \in \mathbb{Z}$, $b \neq 0$). Denote this rational subfield $Q \subset F$.
2. Given $x < y$ in $F$, Archimedean (Part 1 applied to $y - x$): there exists $n \in N$ with $n > 1/(y - x)$, i.e., $n \cdot (y - x) > 1$, i.e., $ny - nx > 1$.
3. Apply Archimedean again: $N \cdot x$ is unbounded above (since $N$ is and $x$ has a definite sign; handle the two signs separately, or reduce to $x > 0$ WLOG by shifting). So some $m \in \mathbb{Z} \subset F$ satisfies $m - 1 \leq nx < m$. Then $m > nx$ and $m = (m - 1) + 1 \leq nx + 1 < nx + (ny - nx) = ny$. Hence $nx < m < ny$, and dividing by $n > 0$: $x < m/n < y$. Since $m \in \mathbb{Z} \subset Q$ and $n \in N \subset Q$, $m/n \in Q$. $\ \blacksquare$

**Verification.** Every Dedekind-complete ordered field is Archimedean (this is step 1). The converse also holds for "Cauchy-complete Archimedean" fields (they must be Dedekind-complete). Together: $\mathbb{R}$ is the unique Dedekind-complete ordered field up to isomorphism, and also the unique Cauchy-complete Archimedean ordered field.

**Interpretation.** The LUB axiom is *strictly stronger* than the Archimedean property. Non-Archimedean ordered fields exist (e.g., rational functions $\mathbb{R}(x)$ with $x$ declared "larger than every real constant") — they automatically fail to be Dedekind-complete. Completeness in the Dedekind sense subsumes both "no holes" and "no infinitesimals."

---

## 1.12 Cross-References

**Previous:** *(none; this is the first chapter)*

**Next:**
- [[02-inequalities]] — Cauchy–Schwarz, Hölder, Minkowski, AM-GM: inequalities built on the absolute value and the order structure.
- [[03-supremum-and-infimum]] — the LUB axiom made explicit, with approximation lemmas ($\varepsilon$-characterization of sup), properties of sup/inf under unions, translates, and scalar multiples.
- [[04-sets-finite-countable-uncountable]] — $|\mathbb{Q}| \neq |\mathbb{R}|$: Cantor's diagonal argument, uncountability of $\mathbb{R}$, the fact that the irrationals carry "most" of $\mathbb{R}$ in a cardinality sense.
- [[08-sequences-introduction]] — sequences in $\mathbb{R}$ and $\overline{\mathbb{R}}$, $\varepsilon$–$N$ definition of limit, the Archimedean property as the engine of most convergence proofs.

**Further reading.**
- Rudin, *Principles of Mathematical Analysis* (3e), Ch. 1 — axiomatic treatment, Dedekind cut construction in an appendix.
- Tao, *Analysis I*, Ch. 5 — construction of $\mathbb{R}$ via Cauchy sequences with full detail.
- Landau, *Foundations of Analysis* — Peano axioms → $\mathbb{Z}$ → $\mathbb{Q}$ → $\mathbb{R}$ from scratch.
- Spivak, *Calculus* — gentler introduction with strong motivation.
