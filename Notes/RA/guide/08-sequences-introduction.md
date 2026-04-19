# 8. Sequences in $\mathbb{R}$ — Introduction

> **The central object.** A **real sequence** is a function $x : \mathbb{N} \to \mathbb{R}$; it is the basic discrete analogue of a function on $[0, \infty)$ and the foundational object for convergence, series, and limit-based analysis. Almost every subsequent notion — limit, continuity, compactness, completeness — is articulated through sequences.
>
> This chapter gives the formal definition, introduces the structural properties (bounded, monotonic, subsequences), proves the **Monotone Convergence Theorem** and the **Bolzano–Weierstrass Theorem** via the monotonic-subsequence construction, and works a catalogue of exam-style examples at full rigor.

---

## 8.1 What Is a Sequence?

> **Definition 8.1.** A **sequence of real numbers** is a function $x : \mathbb{N} \to \mathbb{R}$. We write $x_n$ for $x(n)$ and denote the sequence $(x_n)_{n \in \mathbb{N}}$, or simply $(x_n)$. The element $x_n$ is called the **$n$-th term** of the sequence.

**Formal vs. informal notation.** The distinction between the sequence as a *function* and the set of its *values* is essential:

- The **sequence** $(x_n)_{n \in \mathbb{N}}$ is an ordered tuple indexed by $\mathbb{N}$; it records both the values and their positions.
- The **range** $\{x_n : n \in \mathbb{N}\} \subseteq \mathbb{R}$ is the set of values, which forgets both order and multiplicity.

For instance, the sequence $((-1)^n)$ has **infinitely many terms** (one at each natural number), but its range is the **two-point set** $\{-1, 1\}$. Confusing the two leads to classical errors: "bounded" and "has a convergent subsequence" refer to the sequence, not the range.

### Examples (with structural remarks)

- $x_n = 1/n$: the sequence $1, 1/2, 1/3, \ldots$ Strictly decreasing, bounded, converges to $0$.
- $x_n = (-1)^n$: $-1, 1, -1, 1, \ldots$ Bounded, not monotonic, divergent, but has two convergent subsequences.
- $x_n = n$: $1, 2, 3, \ldots$ Strictly increasing, unbounded above, divergent (to $+\infty$).
- $x_n = \sin(n)$ (with $n$ in radians): bounded by $1$, but neither monotonic nor periodic (by Weyl equidistribution, the values are dense in $[-1, 1]$).

### Indexing conventions

Some authors start at $n = 0$ or some other $n_0 \in \mathbb{Z}$, so $x : \{n_0, n_0 + 1, \ldots\} \to \mathbb{R}$. The theory is identical up to re-indexing: every result we state for $\mathbb{N}$-indexed sequences applies to $\mathbb{Z}_{\geq n_0}$-indexed sequences via the shift $n \mapsto n - n_0 + 1$.

**Remark (why $\mathbb{N}$ matters).** The key property of $\mathbb{N}$ used throughout is the **well-ordering principle** (equivalently, induction): every non-empty subset of $\mathbb{N}$ has a least element. This underlies the construction of subsequences (choose least unused index satisfying a property) and the definition of *first* index $N$ past which a property holds.

---

## 8.2 Bounded Sequences

> **Definition 8.2.** A sequence $(x_n)$ is:
> - **bounded above** if $\exists M \in \mathbb{R}$ such that $x_n \leq M$ for all $n \in \mathbb{N}$;
> - **bounded below** if $\exists m \in \mathbb{R}$ such that $x_n \geq m$ for all $n \in \mathbb{N}$;
> - **bounded** if it is bounded above and below, equivalently, $\exists M > 0$ with $|x_n| \leq M$ for all $n$.

**Equivalence of definitions.** The two characterisations of "bounded" are equivalent:

- *(two-sided bounds $\Rightarrow$ single bound)*: If $m \leq x_n \leq M$, set $M' = \max(|m|, |M|)$; then $|x_n| \leq M'$.
- *(single bound $\Rightarrow$ two-sided)*: If $|x_n| \leq M$, then $-M \leq x_n \leq M$.

### Examples

| Sequence | Bounded above? | Bounded below? | Bounded? |
|----------|:--:|:--:|:--:|
| $x_n = 1/n$ | Yes, by $1$ | Yes, by $0$ | Yes, $|x_n| \leq 1$ |
| $x_n = (-1)^n$ | Yes, by $1$ | Yes, by $-1$ | Yes, $|x_n| = 1$ |
| $x_n = n$ | **No** | Yes, by $1$ | No |
| $x_n = (-1)^n n$ | No | No | No |
| $x_n = (-1)^n / n$ | Yes | Yes | Yes, $|x_n| \leq 1$ |

**Remark (sharpness of bounds).** The sharpest upper bound is the **supremum** $\sup_n x_n$ (whenever bounded above), and the sharpest lower bound is $\inf_n x_n$. These bounds need not be attained; e.g., for $x_n = 1 - 1/n$, $\sup_n x_n = 1$ but $1 \neq x_n$ for any $n$.

**Proposition 8.3 (bounded sequence has finite sup/inf).** Let $(x_n)$ be bounded. Then $\sup_n x_n$ and $\inf_n x_n$ exist in $\mathbb{R}$.

*Proof.* The range $S = \{x_n : n \in \mathbb{N}\}$ is a non-empty subset of $\mathbb{R}$, bounded above by hypothesis. By the **least upper bound property** of $\mathbb{R}$ (a form of completeness), $\sup S$ exists. Likewise $\inf S$ exists. $\blacksquare$

This is where completeness enters. The analogous statement fails for sequences in $\mathbb{Q}$ (e.g., $x_n = $ truncated decimal expansion of $\sqrt{2}$ is bounded in $\mathbb{Q}$ but $\sup$ is irrational).

---

## 8.3 Monotonic Sequences

> **Definition 8.4.** The sequence $(x_n)$ is:
> - **increasing** (non-decreasing) if $x_n \leq x_{n+1}$ for all $n$,
> - **strictly increasing** if $x_n < x_{n+1}$ for all $n$,
> - **decreasing** (non-increasing) if $x_n \geq x_{n+1}$ for all $n$,
> - **strictly decreasing** if $x_n > x_{n+1}$ for all $n$,
> - **monotonic** if increasing or decreasing,
> - **strictly monotonic** if strictly increasing or strictly decreasing,
> - **eventually monotonic** if there exists $N_0$ such that $(x_n)_{n \geq N_0}$ is monotonic.

**Remark (closed condition on consecutive pairs).** Monotonicity is a *local* condition on consecutive pairs, but by induction implies the *global* statement $x_n \leq x_m$ whenever $n \leq m$ (for increasing sequences). This is useful: to prove monotonicity, one only needs $x_{n+1} - x_n \geq 0$ for all $n$.

### Examples

- $x_n = 1/n$: strictly decreasing. Indeed, $1/(n+1) < 1/n \iff n < n+1$. ✓
- $x_n = n$: strictly increasing.
- $x_n = 1 - 1/n$: strictly increasing, bounded above by $1$. $x_{n+1} - x_n = -1/(n+1) + 1/n = 1/[n(n+1)] > 0$.
- $x_n = (-1)^n$: not monotonic (alternates).
- $x_n = (n - 10)^2$: decreases for $n \leq 10$, increases for $n \geq 10$ — eventually monotonic but not monotonic.

### Monotone Convergence Theorem

> **Theorem 8.5 (Monotone Convergence).** Every monotonic and bounded real sequence converges. Specifically:
> - If $(x_n)$ is increasing and bounded above, then $\lim_{n \to \infty} x_n = \sup\{x_n : n \in \mathbb{N}\}$.
> - If $(x_n)$ is decreasing and bounded below, then $\lim_{n \to \infty} x_n = \inf\{x_n : n \in \mathbb{N}\}$.

**Proof (increasing case).**

*Step 1: Sup exists.* Let $S = \{x_n : n \in \mathbb{N}\}$. By hypothesis $S$ is non-empty and bounded above, so by the **Least Upper Bound Property** of $\mathbb{R}$, $\alpha := \sup S \in \mathbb{R}$ exists.

*Step 2: Claim $x_n \to \alpha$.* Fix $\varepsilon > 0$. We seek $N \in \mathbb{N}$ such that $|x_n - \alpha| < \varepsilon$ for all $n \geq N$.

*Step 3: $\varepsilon$-characterisation of $\sup$.* Since $\alpha - \varepsilon < \alpha$ and $\alpha$ is the **least** upper bound, $\alpha - \varepsilon$ is **not** an upper bound of $S$. Hence there exists some element of $S$ strictly greater than $\alpha - \varepsilon$, i.e., $\exists N \in \mathbb{N}$ such that
$$x_N > \alpha - \varepsilon. \tag{$*$}$$

*Step 4: Upgrade to all $n \geq N$ via monotonicity.* For $n \geq N$, increasing monotonicity gives $x_n \geq x_N$. Combined with $(*)$ and the upper bound $x_n \leq \alpha$:
$$\alpha - \varepsilon < x_N \leq x_n \leq \alpha < \alpha + \varepsilon.$$

*Step 5: Extract $\varepsilon$-bound.* Subtracting $\alpha$:
$$-\varepsilon < x_n - \alpha \leq 0 < \varepsilon \quad \Longrightarrow \quad |x_n - \alpha| < \varepsilon.$$

*Step 6: Conclusion.* This holds for all $n \geq N$, so by definition $x_n \to \alpha = \sup_n x_n$. $\blacksquare$

**Proof (decreasing case).** Apply the increasing case to $y_n := -x_n$, which is increasing and bounded above by $-\inf_n x_n$. Then $y_n \to \sup y_n = -\inf x_n$, so $x_n = -y_n \to \inf_n x_n$. $\blacksquare$

**Interpretive remark.** The theorem is the **workhorse** for proving convergence without knowing the limit in advance. It converts a combinatorial/algebraic condition (monotonicity + boundedness) into an analytic conclusion (existence of limit). Critically, the limit value is *identified* as $\sup$ or $\inf$ — useful even when numerical evaluation is intractable.

**Why completeness is essential.** The proof uses the LUB property at Step 1. In $\mathbb{Q}$, the analogous theorem fails: the sequence of decimal truncations of $\sqrt{2}$ is increasing and bounded above (by $2$), but has no limit in $\mathbb{Q}$.

### Classical constants via Monotone Convergence

> **Example 8.6 (Euler's $e$).** The sequence $e_n = (1 + 1/n)^n$ is increasing and bounded above (by $3$), so $e := \lim e_n$ exists (with $e \approx 2.71828$).

> **Example 8.7 (Euler's constant $\gamma$).** The sequence $a_n = \sum_{k=1}^n 1/k - \ln n$ is decreasing and bounded below, so $\gamma := \lim a_n \approx 0.5772$ exists.

Full proofs are in [[09-convergence-and-limits]] and Practice Problem 4 below.

---

## 8.4 Operations on Sequences

Given sequences $(x_n), (y_n)$ and constant $c \in \mathbb{R}$, define termwise:

| Operation | Formula | Domain constraint |
|-----------|---------|-------------------|
| Sum | $(x_n + y_n)$ | — |
| Product | $(x_n y_n)$ | — |
| Scalar multiple | $(c x_n)$ | — |
| Quotient | $(x_n / y_n)$ | $y_n \neq 0$ for all $n$ |
| Absolute value | $(|x_n|)$ | — |
| Power | $(x_n^k)$ | $k \in \mathbb{N}$, or $x_n > 0$ for real $k$ |

### Inheritance of structural properties

**Bounded** is preserved by sum, product, scalar multiple, abs. value: if $|x_n| \leq M_1$, $|y_n| \leq M_2$, then $|x_n + y_n| \leq M_1 + M_2$, $|x_n y_n| \leq M_1 M_2$.

**Monotone** is *not* preserved by sum: $(x_n) = (n)$ and $(y_n) = (-n)$ are both monotonic, but $(x_n + y_n) = (0)$ is constant (vacuously both, but in a degenerate sense). A sharper example: $(n)$ and $(-n + (-1)^n)$ sum to $((-1)^n)$, not monotonic.

**Monotone** *is* preserved by:
- Sum of two increasing (or two decreasing) sequences.
- Product of two positive increasing sequences.
- Composition with a monotone function: if $f : \mathbb{R} \to \mathbb{R}$ is increasing and $(x_n)$ is increasing, so is $(f(x_n))$.

**Warning (quotient).** Requires $y_n \neq 0$ for *all* $n$; otherwise the quotient is undefined at those indices.

---

## 8.5 Subsequences

> **Definition 8.8.** A **subsequence** of $(x_n)$ is a sequence of the form $(x_{n_k})_{k \in \mathbb{N}}$ where $n_1 < n_2 < n_3 < \cdots$ is a **strictly increasing** sequence of natural-number indices.

**Equivalent formulation.** A subsequence is the composition $x \circ \sigma$, where $\sigma : \mathbb{N} \to \mathbb{N}$ is strictly increasing ($k \mapsto n_k$).

**Key inequality $n_k \geq k$.** If $(n_k)$ is strictly increasing with $n_1 \geq 1$, then by induction $n_k \geq k$ for all $k$:
- Base: $n_1 \geq 1 = k$.
- Step: $n_{k+1} > n_k \geq k$, so $n_{k+1} \geq k + 1$ (integer step).

This inequality is used repeatedly — it says "subsequence indices are at least as large as position".

### Examples from $x_n = 1/n$

- $(x_{2k}) = (1/2, 1/4, 1/6, \ldots)$: even-indexed, converges to $0$.
- $(x_{2k-1}) = (1, 1/3, 1/5, \ldots)$: odd-indexed.
- $(x_{k^2}) = (1, 1/4, 1/9, 1/16, \ldots)$: perfect-square indexed.
- $(x_{F_k})$ where $F_k$ is the $k$-th Fibonacci number: $(1, 1, 1/2, 1/3, 1/5, 1/8, \ldots)$.

### Fundamental fact

> **Proposition 8.9.** Every subsequence of a convergent sequence converges to the same limit.

**Proof.** Suppose $x_n \to L$. Let $(x_{n_k})$ be any subsequence, with strictly increasing indices $n_1 < n_2 < \cdots$.

*Step 1: Fix $\varepsilon > 0$.* By convergence of $(x_n)$, there exists $N \in \mathbb{N}$ such that
$$|x_n - L| < \varepsilon \quad \text{for all } n \geq N.$$

*Step 2: Choose $K$ using $n_k \geq k$.* Set $K = N$. For $k \geq K = N$, we have $n_k \geq k \geq N$ (by the inequality above).

*Step 3: Apply the $\varepsilon$-bound at index $n_k$.* Since $n_k \geq N$,
$$|x_{n_k} - L| < \varepsilon.$$

*Step 4: Conclude.* For all $k \geq K$, $|x_{n_k} - L| < \varepsilon$, i.e., $x_{n_k} \to L$. $\blacksquare$

**Contrapositive (divergence test).** *If two subsequences of $(x_n)$ converge to distinct limits, $(x_n)$ diverges.*

**Example 8.10 (canonical use).** $x_n = (-1)^n$. Then $x_{2k} = 1$ is constant, hence $\to 1$; and $x_{2k-1} = -1$ is constant, hence $\to -1$. Two distinct subsequential limits $\Rightarrow$ $(x_n)$ diverges.

### Existence of monotonic subsequences

> **Theorem 8.11 (Monotonic Subsequence Theorem).** Every real sequence has a monotonic subsequence.

This is a **combinatorial gem** that enables a slick proof of Bolzano–Weierstrass below. The proof uses the notion of a **peak**.

> **Definition 8.12.** An index $m \in \mathbb{N}$ is a **peak** of $(x_n)$ if $x_m \geq x_n$ for every $n > m$. (Some authors require strict inequality; we use $\geq$.)

**Proof of Theorem 8.11.**

*Setup.* Let $P = \{m \in \mathbb{N} : m \text{ is a peak of } (x_n)\}$. We split on $|P|$.

**Case 1: $P$ is infinite.** Enumerate $P$ in increasing order: $m_1 < m_2 < m_3 < \cdots$ (well-defined because $P \subseteq \mathbb{N}$ is infinite). I claim $(x_{m_k})$ is **decreasing**.

*Subproof.* For $k \geq 1$: $m_k$ is a peak and $m_{k+1} > m_k$, so by definition of peak $x_{m_k} \geq x_{m_{k+1}}$. ✓

Hence $(x_{m_k})$ is a decreasing (monotonic) subsequence.

**Case 2: $P$ is finite.** Let $M = \max P$ if $P \neq \emptyset$, else $M = 0$. Then for every $n > M$, the index $n$ is **not** a peak, meaning:
$$\forall n > M, \; \exists m > n \text{ with } x_m > x_n. \tag{$\dagger$}$$

We build an increasing subsequence $(x_{n_k})$ by recursion:

- $n_1 := M + 1$.
- Given $n_k > M$, apply $(\dagger)$ with $n = n_k$: choose $n_{k+1} > n_k$ with $x_{n_{k+1}} > x_{n_k}$. In particular $n_{k+1} > M$, so the recursion continues.

By construction $n_1 < n_2 < \cdots$ and $x_{n_1} < x_{n_2} < \cdots$. So $(x_{n_k})$ is a strictly increasing subsequence.

*Conclusion.* In both cases, we have produced a monotonic subsequence. $\blacksquare$

**Remark (non-constructive use of choice).** Case 2 uses (at most) **countable choice** to select $n_{k+1}$; in standard ZF this is acceptable, but constructively one must fix a choice function (e.g., "smallest such $m$").

### Consequence: Bolzano–Weierstrass

> **Theorem 8.13 (Bolzano–Weierstrass, sequence form).** Every bounded real sequence has a convergent subsequence.

**Proof.** Let $(x_n)$ be bounded.

*Step 1.* By Theorem 8.11, extract a monotonic subsequence $(x_{n_k})$.

*Step 2.* Boundedness is inherited by subsequences: if $|x_n| \leq M$ for all $n$, then $|x_{n_k}| \leq M$ for all $k$.

*Step 3.* Apply Monotone Convergence (Theorem 8.5) to the bounded monotonic sequence $(x_{n_k})$: it converges. $\blacksquare$

**Interpretive remark.** B–W is the **compactness statement** for $\mathbb{R}$ in sequence form: bounded subsets are "sequentially precompact". It is a consequence of completeness (via Monotone Convergence) and is equivalent to completeness in the presence of the Archimedean property. Full context is in [[10-cauchy-sequences-completeness]].

---

## 8.6 Important Named Sequences

### Arithmetic progression

$x_n = a + (n - 1)d$, common difference $d$, first term $a$.

- If $d = 0$: constant sequence, trivially bounded and monotonic.
- If $d > 0$: strictly increasing, unbounded above.
- If $d < 0$: strictly decreasing, unbounded below.
- **In all non-constant cases, unbounded.**

### Geometric progression

$x_n = a \cdot r^{n-1}$, common ratio $r$, first term $a \neq 0$.

Behaviour:
- $r = 0$: $x_1 = a$, $x_n = 0$ for $n \geq 2$ (if we allow $0^0 = 1$ convention at $n = 1$).
- $|r| < 1$: $x_n \to 0$, bounded.
- $r = 1$: constant $a$.
- $r = -1$: oscillates between $a$ and $-a$; bounded, divergent.
- $|r| > 1$: $|x_n| \to \infty$, unbounded.

*Proof of $|r| < 1 \Rightarrow r^n \to 0$.* If $r = 0$ trivial. Else let $s = 1/|r| > 1$, so $s = 1 + h$ with $h > 0$. By Bernoulli's inequality $s^n \geq 1 + nh$, hence $|r|^n = 1/s^n \leq 1/(1 + nh) \to 0$. So $|r|^n \to 0$, i.e., $r^n \to 0$. $\blacksquare$

### Harmonic sequence

$x_n = 1/n$. Strictly decreasing, bounded, $\lim x_n = 0$ by Archimedean property: given $\varepsilon > 0$, choose $N > 1/\varepsilon$; for $n \geq N$, $1/n \leq 1/N < \varepsilon$.

### Fibonacci

$F_1 = F_2 = 1$, $F_{n+2} = F_n + F_{n+1}$. Strictly increasing from $n \geq 2$, unbounded. Asymptotic: $F_n \sim \phi^n / \sqrt{5}$, where $\phi = (1 + \sqrt 5)/2$ is the golden ratio. (Binet's formula $F_n = (\phi^n - \psi^n)/\sqrt 5$ with $\psi = (1 - \sqrt 5)/2$.)

### $x_n = r^n$ for $|r| < 1$

Converges to $0$, by the proof above. If $r \in (0, 1)$, $(r^n)$ is also strictly **decreasing** (geometric decay).

### $x_n = \sqrt[n]{n} = n^{1/n}$

Converges to $1$. Non-trivial; full proof in [[09-convergence-and-limits]]. Sketch: $n^{1/n} = 1 + h_n$ with $h_n > 0$ for $n \geq 2$. Then $n = (1 + h_n)^n \geq \binom{n}{2} h_n^2 = \frac{n(n-1)}{2} h_n^2$, giving $h_n^2 \leq 2/(n-1) \to 0$.

### $x_n = a^{1/n}$ for $a > 0$

Converges to $1$. Proof: write $a^{1/n} = 1 + k_n$ with $k_n > 0$ for $a > 1$; Bernoulli gives $a = (1 + k_n)^n \geq 1 + n k_n$, so $k_n \leq (a - 1)/n \to 0$. For $0 < a < 1$, apply to $1/a$.

---

## 8.7 Tail of a Sequence

> **Definition 8.14.** The **$N$-tail** of $(x_n)$ is the sequence $(x_N, x_{N+1}, x_{N+2}, \ldots)$, i.e., $(x_{N + k - 1})_{k \in \mathbb{N}}$.

**Key principle (Tail invariance of convergence).** Convergence and limits depend only on the tail of the sequence; modifying finitely many terms does not affect either.

> **Proposition 8.15 (Tail Invariance).** Let $(x_n)$ and $(y_n)$ be sequences. Suppose $\exists N_0$ with $x_n = y_n$ for all $n \geq N_0$. Then:
> - $(x_n)$ is bounded iff $(y_n)$ is bounded;
> - $(x_n)$ converges iff $(y_n)$ converges;
> - when they converge, $\lim x_n = \lim y_n$.

**Proof sketch.** Boundedness: $|x_n| \leq \max(|x_1|, \ldots, |x_{N_0 - 1}|, \sup_{n \geq N_0} |y_n|)$. Convergence: given $\varepsilon > 0$, find $N_1 \geq N_0$ with $|y_n - L| < \varepsilon$ for $n \geq N_1$; then for $n \geq N_1$, $x_n = y_n$, so $|x_n - L| < \varepsilon$. $\blacksquare$

**Interpretive remark.** This is the precise way to say "only the long-run behaviour matters". It underlies *asymptotic* reasoning: statements like "eventually increasing" or "eventually positive" refer to tail properties.

---

## Worked Examples

### Example 1 (Rational sequence, bounded increasing)

**Problem.** Show that $x_n = \dfrac{n}{n+1}$ is strictly increasing and bounded above by $1$. Find $\lim x_n$ with full $\varepsilon$–$N$ justification.

**Setup.** We verify monotonicity, boundedness, and compute the limit via the $\varepsilon$-characterisation of $\sup$.

**Strategy.** 
1. Compute $x_{n+1} - x_n$ and check positivity.
2. Rewrite $x_n = 1 - 1/(n+1)$ to read off the upper bound and sup.
3. Invoke Monotone Convergence; identify limit as $\sup$; verify via $\varepsilon$–$N$.

**Computation.**

*Monotonicity.* Compute the consecutive difference:
$$x_{n+1} - x_n = \frac{n+1}{n+2} - \frac{n}{n+1} = \frac{(n+1)^2 - n(n+2)}{(n+1)(n+2)} = \frac{n^2 + 2n + 1 - n^2 - 2n}{(n+1)(n+2)} = \frac{1}{(n+1)(n+2)} > 0.$$
So $(x_n)$ is strictly increasing.

*Upper bound.* Algebraically,
$$x_n = \frac{n}{n+1} = \frac{(n+1) - 1}{n+1} = 1 - \frac{1}{n+1} < 1.$$
So $x_n < 1$ for all $n$, i.e., $1$ is a strict upper bound.

*Identify $\sup$.* We claim $\sup_n x_n = 1$. Since $x_n < 1$ for all $n$, $1$ is an upper bound. To show it is the *least* upper bound, fix $\varepsilon > 0$ and find $n$ with $x_n > 1 - \varepsilon$:
$$x_n > 1 - \varepsilon \iff 1 - \tfrac{1}{n+1} > 1 - \varepsilon \iff \tfrac{1}{n+1} < \varepsilon \iff n + 1 > 1/\varepsilon \iff n > 1/\varepsilon - 1.$$

So **choose** $N = \lceil 1/\varepsilon \rceil$, and for any $n \geq N$, $n + 1 > 1/\varepsilon$, hence $x_n > 1 - \varepsilon$. This shows $\sup x_n = 1$.

*Limit.* By Monotone Convergence (increasing, bounded above), $x_n \to \sup x_n = 1$.

**Verification ($\varepsilon$–$N$, direct).** Given $\varepsilon > 0$, choose $N = \lceil 1/\varepsilon \rceil$. For $n \geq N$:
$$|x_n - 1| = \left|1 - \frac{1}{n+1} - 1\right| = \frac{1}{n+1} \leq \frac{1}{N+1} < \frac{1}{N} \leq \varepsilon. \checkmark$$

**Interpretation.** The "$-1/(n+1)$" form makes both monotonicity and the limit obvious. This trick — rewriting a rational expression to expose its limiting behaviour — is generic for sequences of the form "polynomial/polynomial of equal degree".

$\blacksquare$

---

### Example 2 (Factorial series partial sums)

**Problem.** Prove the sequence $x_n = 1 + \dfrac{1}{2!} + \dfrac{1}{3!} + \cdots + \dfrac{1}{n!}$ converges.

**Setup.** This is the partial sum of $\sum 1/k!$ starting from $k = 1$. We use Monotone Convergence: show $(x_n)$ is increasing and bounded above.

**Strategy.** Compare $k!$ to a geometric lower bound $2^{k-1}$, converting the factorial sum into a geometric sum.

**Computation.**

*Monotonicity.* 
$$x_{n+1} - x_n = \frac{1}{(n+1)!} > 0.$$
So $(x_n)$ is strictly increasing.

*Upper bound via $k! \geq 2^{k-1}$ for $k \geq 1$.* We prove this auxiliary inequality by induction.

- **Base ($k = 1$)**: $1! = 1 \geq 1 = 2^0$. ✓
- **Induction step**: Assume $k! \geq 2^{k-1}$. Then
$$(k+1)! = (k+1) \cdot k! \geq 2 \cdot 2^{k-1} = 2^k \quad (\text{since } k + 1 \geq 2 \text{ for } k \geq 1). \checkmark$$

Hence $1/k! \leq 1/2^{k-1}$ for all $k \geq 1$.

*Bounding $x_n$.* 
$$x_n = 1 + \sum_{k=2}^n \frac{1}{k!} \leq 1 + \sum_{k=2}^n \frac{1}{2^{k-1}} = 1 + \left(\frac{1}{2} + \frac{1}{4} + \cdots + \frac{1}{2^{n-1}}\right).$$

The geometric sum is
$$\sum_{k=2}^n \frac{1}{2^{k-1}} = \frac{1/2 \cdot (1 - (1/2)^{n-1})}{1 - 1/2} = 1 - (1/2)^{n-1} < 1.$$

So $x_n < 1 + 1 = 2$ for all $n$.

*Applying Monotone Convergence.* $(x_n)$ is strictly increasing and bounded above by $2$. By Theorem 8.5, $(x_n)$ converges.

**Verification.** Numerical: $x_1 = 1$, $x_2 = 3/2$, $x_3 = 5/3 \approx 1.667$, $x_4 \approx 1.708$, $x_5 \approx 1.716$. The limit is $e - 1 \approx 1.71828$.

**Interpretation.** This is the **factorial tail of $e$**: $e = 1 + 1 + \sum_{k \geq 2} 1/k!$, so $x_n = e - 1 - r_n$ where $r_n \to 0^+$. The proof illustrates the standard technique of **dominating a positive series by a geometric series**, a cornerstone of convergence tests.

$\blacksquare$

---

### Example 3 (Nested radical recursion)

**Problem.** Let $a_1 = \sqrt 2$ and $a_{n+1} = \sqrt{2 + a_n}$. Show $(a_n)$ converges and find $\lim a_n$.

**Setup.** A recursively defined sequence. Standard approach: show bounded + monotonic $\Rightarrow$ convergent, then pass to limit in recursion.

**Strategy.**
1. Show $0 < a_n < 2$ for all $n$ (induction).
2. Show $a_{n+1} > a_n$ (induction or algebraic identity).
3. Apply Monotone Convergence: $L$ exists.
4. Pass to limit in $a_{n+1}^2 = 2 + a_n$, solve for $L$.

**Computation.**

*Step 1: Boundedness ($0 < a_n < 2$ for all $n$).*

- **Base**: $a_1 = \sqrt 2 \in (1, 2) \subset (0, 2)$. ✓
- **Step**: Assume $0 < a_n < 2$. Then $0 < 2 + a_n < 4$, so $0 < \sqrt{2 + a_n} < 2$, i.e., $0 < a_{n+1} < 2$. ✓

By induction, $0 < a_n < 2$ for all $n$.

*Step 2: Monotonicity ($a_{n+1} > a_n$).*

Compute
$$a_{n+1}^2 - a_n^2 = (2 + a_n) - a_n^2 = -a_n^2 + a_n + 2 = -(a_n^2 - a_n - 2) = -(a_n - 2)(a_n + 1).$$

For $a_n \in (0, 2)$: $a_n - 2 < 0$ and $a_n + 1 > 0$, so $-(a_n - 2)(a_n + 1) > 0$.

Hence $a_{n+1}^2 > a_n^2$. Since $a_n, a_{n+1} > 0$, taking positive square root gives $a_{n+1} > a_n$.

*Step 3: Convergence.* $(a_n)$ is strictly increasing and bounded above by $2$. By Monotone Convergence, $L := \lim a_n$ exists and $L \leq 2$. Also $L \geq a_1 = \sqrt 2 > 0$.

*Step 4: Solving for $L$.* The recursion $a_{n+1}^2 = 2 + a_n$ is a continuous identity. Passing $n \to \infty$:
- LHS: $a_{n+1} \to L$, so $a_{n+1}^2 \to L^2$ (by continuity of squaring, or algebra of limits).
- RHS: $2 + a_n \to 2 + L$.

Hence $L^2 = 2 + L$, i.e., $L^2 - L - 2 = 0$, factoring as $(L - 2)(L + 1) = 0$. Solutions: $L = 2$ or $L = -1$.

Since $L > 0$, we rule out $L = -1$. Hence $L = 2$.

**Verification.** Numerical:
- $a_1 = 1.4142$
- $a_2 = \sqrt{3.4142} = 1.8478$
- $a_3 = \sqrt{3.8478} = 1.9616$
- $a_4 = \sqrt{3.9616} = 1.9904$
- $a_5 = 1.9976$
- $a_{10} \approx 1.9999976$
Consistent with $L = 2$.

**Interpretation.** This is a typical *fixed-point* argument: the limit is a fixed point of $g(x) = \sqrt{2 + x}$. The recursion converges to the attracting fixed point $L = 2$; the other root $L = -1$ is outside the relevant domain. The *a priori* bound $a_n < 2$ is essential — without it, passing to the limit could give the wrong root.

$\blacksquare$

---

### Example 4 (Bounded but not monotonic)

**Problem.** Show that $x_n = (-1)^n \cdot \dfrac{n}{n+1}$ is bounded but not monotonic. Analyze its subsequences.

**Setup.** Verify boundedness algebraically; exhibit specific values to disprove monotonicity; find convergent subsequences.

**Strategy.**
1. Bound $|x_n|$.
2. Compute $x_1, x_2, x_3$ to rule out monotonicity.
3. Analyze even- and odd-indexed subsequences.

**Computation.**

*Boundedness.*
$$|x_n| = \left|(-1)^n\right| \cdot \frac{n}{n+1} = \frac{n}{n+1} < 1.$$
So $(x_n)$ is bounded by $1$.

*Not monotonic.*
- $x_1 = -1 \cdot 1/2 = -1/2$.
- $x_2 = 1 \cdot 2/3 = 2/3$.
- $x_3 = -1 \cdot 3/4 = -3/4$.

$x_2 > x_1$ (increase) but $x_3 < x_2$ (decrease). Neither monotonicity pattern holds.

*Subsequences.*

Even-indexed subsequence $y_k = x_{2k}$:
$$y_k = (-1)^{2k} \cdot \frac{2k}{2k+1} = \frac{2k}{2k+1} = 1 - \frac{1}{2k+1}.$$
Strictly increasing (difference $= 2/[(2k+1)(2k+3)] > 0$), bounded by $1$, $\lim y_k = 1$.

Odd-indexed subsequence $z_k = x_{2k-1}$:
$$z_k = (-1)^{2k-1} \cdot \frac{2k-1}{2k} = -\frac{2k-1}{2k} = -1 + \frac{1}{2k}.$$
Strictly decreasing, bounded below by $-1$, $\lim z_k = -1$.

**Verification.** Two subsequences converge to **different** limits ($1$ and $-1$), so by Proposition 8.9's contrapositive, $(x_n)$ **diverges**. Bounded + divergent + has convergent subsequences — exactly the Bolzano–Weierstrass scenario.

**Interpretation.** This is the canonical "bounded but divergent" sequence: sign oscillation overlaid on a convergent magnitude. The two subsequential limits $\pm 1$ are the $\liminf$ and $\limsup$ (covered in a later chapter).

$\blacksquare$

---

### Example 5 (Extracting monotonic subsequence explicitly)

**Problem.** Extract a monotonic subsequence from $x_n = (-1)^n(1 + 1/n)$.

**Setup.** Use the proof of Theorem 8.11 (peaks) or spot one directly.

**Strategy.** Look at even indices: $x_{2k} > 0$, approach $1$ from above — candidate decreasing subsequence.

**Computation.**

*Even-indexed subsequence.*
$$x_{2k} = (-1)^{2k}\left(1 + \frac{1}{2k}\right) = 1 + \frac{1}{2k}.$$

This is strictly **decreasing**:
$$x_{2(k+1)} - x_{2k} = \frac{1}{2(k+1)} - \frac{1}{2k} = \frac{k - (k+1)}{2k(k+1)} = \frac{-1}{2k(k+1)} < 0. \checkmark$$

So $(x_{2k})$ is strictly decreasing, bounded below by $1$, with $\lim x_{2k} = 1$ (by Monotone Convergence).

**Alternative: odd-indexed subsequence.**
$$x_{2k-1} = -1 - \frac{1}{2k-1}.$$
Strictly **increasing** from $-2$ towards $-1$:
$$x_{2(k+1)-1} - x_{2k-1} = -\frac{1}{2k+1} + \frac{1}{2k-1} = \frac{2}{(2k-1)(2k+1)} > 0. \checkmark$$

Both subsequences are monotonic.

**Verification.** The original sequence $(x_n) = (-2, 3/2, -4/3, 5/4, -6/5, \ldots)$ is *not* monotonic. Both subsequences converge (to $\pm 1$), so $(x_n)$ is divergent with subsequential limits $\{-1, 1\}$.

**Interpretation.** The Monotonic Subsequence Theorem guarantees *some* monotonic subsequence; here we see there can be more than one (in fact, infinitely many, since any thinning of $(x_{2k})$ is also monotonic).

$\blacksquare$

---

## Practice Problems

### Problems

1. Determine whether each sequence is bounded, monotonic, or neither:
   - (a) $x_n = n \sin(1/n)$
   - (b) $x_n = (n + 1)/(2n - 3)$ (for $n \geq 2$)
   - (c) $x_n = (-1)^n + 1/n$
   - (d) $x_n = 1 - (1/2)^n$

2. Let $x_1 > 0$ and $x_{n+1} = (x_n + 3/x_n)/2$. Show $(x_n)$ is bounded below by $\sqrt 3$ for $n \geq 2$ and eventually decreasing; hence convergent. Find $\lim x_n$ (Newton's method for $\sqrt 3$).

3. Prove: if $x_n \to L$ and $(x_{n_k})$ is any subsequence of $(x_n)$, then $x_{n_k} \to L$.

4. Show that $(1 + 1/n)^n$ is strictly increasing. *Hint:* AM-GM applied to $n$ copies of $(1 + 1/n)$ and one copy of $1$.

5. State and prove the Monotonic Subsequence Theorem.

---

### Solutions

---

**Solution 1.** Analyze each sequence.

---

**(a) $x_n = n \sin(1/n)$.**

*Setup.* Recall the inequality $\sin t < t$ for $t > 0$ and $\sin t > t - t^3/6$ for $t > 0$ (or use $\sin t \leq t$ from $|\sin t| \leq |t|$).

*Boundedness.* By Taylor: $\sin(1/n) = 1/n - 1/(6 n^3) + O(1/n^5)$, so
$$x_n = n \sin(1/n) = 1 - \frac{1}{6 n^2} + O(1/n^4).$$

Thus $x_n \to 1$, and $x_n < 1$ for all $n \geq 1$ (since $\sin(1/n) < 1/n$). Also $x_n > 0$ (since $\sin(1/n) > 0$ for $1/n \in (0, \pi/2)$, i.e., $n \geq 1$). So $0 < x_n < 1$: **bounded**.

*Monotonicity.* $x_n = 1 - 1/(6n^2) + \text{smaller}$, which is increasing in $n$. More rigorously: define $f(t) = \sin(t)/t$ for $t > 0$. Then $f'(t) = (t\cos t - \sin t)/t^2$. The numerator $g(t) = t \cos t - \sin t$ satisfies $g(0) = 0$, $g'(t) = -t \sin t < 0$ for $t \in (0, \pi)$. So $g(t) < 0$, hence $f'(t) < 0$: $f$ is decreasing on $(0, \pi)$. Setting $t = 1/n$, $f(1/n) = n \sin(1/n) = x_n$ is the value of a decreasing function on a decreasing argument $1/n$. Composition: $n \mapsto 1/n$ decreasing, $f$ decreasing; composition $n \mapsto x_n$ is **increasing**.

Conclusion: $(x_n)$ is **bounded and strictly increasing**; $\lim x_n = 1$. $\checkmark$

---

**(b) $x_n = (n + 1)/(2n - 3)$ for $n \geq 2$.**

*Limiting value.* $x_n = (1 + 1/n)/(2 - 3/n) \to 1/2$ as $n \to \infty$.

*Monotonicity.* Consecutive difference:
$$x_{n+1} - x_n = \frac{n+2}{2n-1} - \frac{n+1}{2n-3} = \frac{(n+2)(2n-3) - (n+1)(2n-1)}{(2n-1)(2n-3)}.$$

Numerator:
$$(n+2)(2n-3) = 2n^2 + 4n - 3n - 6 = 2n^2 + n - 6,$$
$$(n+1)(2n-1) = 2n^2 + 2n - n - 1 = 2n^2 + n - 1.$$
Difference: $(2n^2 + n - 6) - (2n^2 + n - 1) = -5$.

So $x_{n+1} - x_n = -5/[(2n-1)(2n-3)] < 0$ for $n \geq 2$. **Strictly decreasing** for $n \geq 2$.

*Boundedness.* At $n = 2$: $x_2 = 3/1 = 3$. As $n \to \infty$, $x_n \to 1/2$. Since $(x_n)_{n \geq 2}$ is strictly decreasing and converges to $1/2$, we have $1/2 < x_n \leq 3$ for all $n \geq 2$. **Bounded.**

Conclusion: **bounded and strictly decreasing** (eventually, $n \geq 2$). $\checkmark$

---

**(c) $x_n = (-1)^n + 1/n$.**

*Boundedness.* $|x_n| \leq |(-1)^n| + |1/n| \leq 1 + 1 = 2$. **Bounded.**

*Monotonicity.* 
- $x_1 = -1 + 1 = 0$.
- $x_2 = 1 + 1/2 = 3/2$.
- $x_3 = -1 + 1/3 = -2/3$.
- $x_4 = 1 + 1/4 = 5/4$.

$x_1 < x_2$ (increase), $x_2 > x_3$ (decrease). **Not monotonic.**

*Subsequential analysis.* $x_{2k} = 1 + 1/(2k) \to 1$ (decreasing to $1$); $x_{2k-1} = -1 + 1/(2k-1) \to -1$ (decreasing to $-1$). Two distinct subsequential limits; diverges.

Conclusion: **bounded, not monotonic**. $\checkmark$

---

**(d) $x_n = 1 - (1/2)^n$.**

*Monotonicity.* $x_{n+1} - x_n = -(1/2)^{n+1} + (1/2)^n = (1/2)^n [1 - 1/2] = (1/2)^{n+1} > 0$. **Strictly increasing.**

*Boundedness.* $x_1 = 1/2$, and $x_n = 1 - (1/2)^n < 1$. Also $(x_n)_{n \geq 1}$ is increasing, so $x_n \geq x_1 = 1/2$. Hence $1/2 \leq x_n < 1$: **bounded.**

$\lim x_n = 1$ (since $(1/2)^n \to 0$).

Conclusion: **bounded and strictly increasing**. $\checkmark$

---

**Solution 2.** Newton iteration for $\sqrt 3$.

**Setup.** $x_1 > 0$ arbitrary; $x_{n+1} = (x_n + 3/x_n)/2$. This is **Newton's method** applied to $f(x) = x^2 - 3$: the Newton update is $x - f(x)/f'(x) = x - (x^2 - 3)/(2x) = (x + 3/x)/2$.

**Strategy.**
1. Verify $x_n > 0$ for all $n$.
2. Show $x_n \geq \sqrt 3$ for $n \geq 2$ via AM-GM.
3. Show $(x_n)_{n \geq 2}$ is decreasing.
4. Apply Monotone Convergence; pass to limit.

**Computation.**

*Step 1: Positivity preserved.* If $x_n > 0$, then $3/x_n > 0$, so $x_{n+1} = (\text{positive})/2 > 0$. By induction, $x_n > 0$ for all $n \geq 1$.

*Step 2: Lower bound $x_n \geq \sqrt 3$ for $n \geq 2$.* By AM-GM applied to $x_n, 3/x_n > 0$:
$$x_{n+1} = \frac{x_n + 3/x_n}{2} \geq \sqrt{x_n \cdot \frac{3}{x_n}} = \sqrt 3.$$

This holds whenever $x_n > 0$, so $x_{n+1} \geq \sqrt 3$ for all $n \geq 1$, i.e., $x_m \geq \sqrt 3$ for all $m \geq 2$. $\checkmark$

*Step 3: Decreasing for $n \geq 2$.* For $n \geq 2$, we have $x_n \geq \sqrt 3$, so $x_n^2 \geq 3$, hence $3/x_n \leq x_n$. Therefore
$$x_{n+1} = \frac{x_n + 3/x_n}{2} \leq \frac{x_n + x_n}{2} = x_n.$$

So $x_{n+1} \leq x_n$ for $n \geq 2$, i.e., $(x_n)_{n \geq 2}$ is decreasing (with equality only when $x_n = \sqrt 3$, which is a fixed point).

*Step 4: Convergence.* $(x_n)_{n \geq 2}$ is decreasing and bounded below by $\sqrt 3$. By Monotone Convergence, $L := \lim x_n$ exists with $L \geq \sqrt 3$.

*Step 5: Identify $L$.* Pass $n \to \infty$ in the recursion:
$$L = \frac{L + 3/L}{2} \implies 2L = L + 3/L \implies L = 3/L \implies L^2 = 3 \implies L = \sqrt 3$$
(positive root, since $L > 0$).

**Verification.** With $x_1 = 1$: $x_2 = (1 + 3)/2 = 2$, $x_3 = (2 + 1.5)/2 = 1.75$, $x_4 = (1.75 + 3/1.75)/2 \approx 1.7321$, $x_5 \approx 1.7320508$. Matches $\sqrt 3 \approx 1.7320508$ to 7 decimals.

**Interpretation.** Newton's method converges **quadratically**: the error $|x_n - \sqrt 3|$ roughly squares each step. The monotone-decreasing behaviour starts after a single step because Newton's iteration always lands above (or at) $\sqrt 3$ when started from a positive $x_1$, an artifact of AM-GM.

$\blacksquare$

---

**Solution 3.** Subsequence inheriting limit (this is Proposition 8.9).

*Restate.* Suppose $x_n \to L$. Let $(n_k)_{k \in \mathbb{N}}$ be a strictly increasing sequence in $\mathbb{N}$, forming the subsequence $(x_{n_k})$. Claim: $x_{n_k} \to L$.

**Proof.**

*Step 1: Prelim inequality $n_k \geq k$.* Since $(n_k)$ is strictly increasing in $\mathbb{N}$ with $n_1 \geq 1$, by induction $n_k \geq k$:
- Base: $n_1 \geq 1$. ✓
- Step: $n_{k+1} > n_k \geq k$, so $n_{k+1} \geq k + 1$ (jump by at least 1, integer). ✓

*Step 2: Fix $\varepsilon > 0$.* By convergence of $(x_n)$, $\exists N \in \mathbb{N}$ such that
$$|x_n - L| < \varepsilon \quad \forall n \geq N. \tag{$*$}$$

*Step 3: Choose $K := N$.* For $k \geq K = N$, we have $n_k \geq k \geq N$ (from Step 1 + our choice).

*Step 4: Apply $(*)$ at index $n_k$.* $n_k \geq N$, so $|x_{n_k} - L| < \varepsilon$.

*Step 5: Conclude.* For all $k \geq K$, $|x_{n_k} - L| < \varepsilon$. Hence $x_{n_k} \to L$. $\blacksquare$

**Interpretation.** The subsequence "inherits" the convergence from the parent sequence. The key combinatorial input is $n_k \geq k$, which ensures the subsequence reaches past any given threshold $N$ within $N$ steps of itself.

---

**Solution 4.** Prove $(1 + 1/n)^n$ is strictly increasing.

**Setup.** Apply AM-GM to the $n + 1$ positive reals: $n$ copies of $(1 + 1/n)$ and one copy of $1$.

**Recall AM-GM (for positive reals $a_1, \ldots, a_m$).** 
$$\frac{a_1 + \cdots + a_m}{m} \geq (a_1 \cdots a_m)^{1/m},$$
with equality iff $a_1 = a_2 = \cdots = a_m$.

**Computation.**

Apply AM-GM with $m = n+1$ and the $n+1$ numbers $\{a_1, \ldots, a_{n+1}\} = \{(1 + 1/n), (1 + 1/n), \ldots, (1 + 1/n), 1\}$ ($n$ copies of $1 + 1/n$ plus one $1$):

*Arithmetic mean:*
$$\frac{n(1 + 1/n) + 1}{n+1} = \frac{(n + 1) + 1}{n + 1} = \frac{n + 2}{n + 1} = 1 + \frac{1}{n + 1}.$$

*Geometric mean:*
$$\left[(1 + 1/n)^n \cdot 1\right]^{1/(n+1)} = (1 + 1/n)^{n/(n+1)}.$$

AM-GM gives:
$$1 + \frac{1}{n+1} \geq (1 + 1/n)^{n/(n+1)}.$$

Since the terms $(1 + 1/n)$ and $1$ are **not all equal** ($1 + 1/n > 1$), AM-GM is **strict**:
$$1 + \frac{1}{n+1} > (1 + 1/n)^{n/(n+1)}.$$

*Raise both sides to power $n + 1$:* (valid since both sides are positive and $n+1 > 0$)
$$\left(1 + \frac{1}{n+1}\right)^{n+1} > \left[(1 + 1/n)^{n/(n+1)}\right]^{n+1} = (1 + 1/n)^n.$$

Hence $(1 + 1/(n+1))^{n+1} > (1 + 1/n)^n$, i.e., $(1 + 1/n)^n$ is **strictly increasing** in $n$. $\blacksquare$

**Corollary (boundedness — sketch).** Also $(1 + 1/n)^n < 3$ for all $n$: use the binomial expansion
$$(1 + 1/n)^n = \sum_{k=0}^n \binom{n}{k} \frac{1}{n^k}, \quad \binom{n}{k} \frac{1}{n^k} = \frac{1}{k!} \cdot \frac{n(n-1)\cdots(n-k+1)}{n^k} \leq \frac{1}{k!},$$
so $(1 + 1/n)^n \leq \sum_{k=0}^n 1/k! < 1 + \sum_{k=0}^\infty 1/2^k = 3$.

**Interpretation.** Combined with boundedness, Monotone Convergence gives the **definition of $e$**: $e := \lim (1 + 1/n)^n \approx 2.718$. This sequence is one of the canonical motivating examples for Monotone Convergence.

$\blacksquare$

---

**Solution 5.** State and prove the Monotonic Subsequence Theorem.

**Theorem.** Every real sequence has a monotonic subsequence.

**Proof.** Let $(x_n)$ be an arbitrary real sequence. Define the set of **peaks**
$$P = \{m \in \mathbb{N} : x_m \geq x_n \text{ for all } n > m\}.$$

We split on the cardinality of $P$.

**Case 1: $P$ is infinite.**

Enumerate $P$ in increasing order: $m_1 < m_2 < m_3 < \cdots$. (This is well-defined since $P$ is an infinite subset of $\mathbb{N}$; by well-ordering, it has a least element, remove it and repeat.)

*Claim: $(x_{m_k})$ is decreasing.* For each $k$, $m_k \in P$ is a peak, and $m_{k+1} > m_k$. So by definition of peak, $x_{m_k} \geq x_{m_{k+1}}$. ✓

Hence $(x_{m_k})$ is a **decreasing subsequence**.

**Case 2: $P$ is finite.**

Let $M = \max P$ if $P \neq \emptyset$, else $M = 0$. For every $n > M$, the index $n$ is **not** a peak, meaning
$$\forall n > M, \; \exists m > n \text{ such that } x_m > x_n. \tag{$\dagger$}$$

Define $(n_k)$ recursively:

- **Base:** $n_1 := M + 1$ (so $n_1 > M$).
- **Step:** Given $n_k > M$, apply $(\dagger)$: choose $n_{k+1} > n_k$ such that $x_{n_{k+1}} > x_{n_k}$. Note $n_{k+1} > n_k > M$, so $n_{k+1} > M$ and the recursion continues.

By construction $n_1 < n_2 < \cdots$ (indices strictly increasing) and $x_{n_1} < x_{n_2} < \cdots$ (values strictly increasing).

Hence $(x_{n_k})$ is a **strictly increasing subsequence**.

**Conclusion.** In both cases, we have exhibited a monotonic subsequence. $\blacksquare$

**Remark (elegance).** The peak definition is the key insight: it exhausts all "local maxima relative to the future". Either they are unbounded in index (giving decreases), or they are exhausted (after which every index can be beaten, giving increases).

**Corollary (Bolzano–Weierstrass).** Every bounded real sequence has a convergent subsequence.

*Proof.* Extract a monotonic subsequence (Theorem above); boundedness is inherited; apply Monotone Convergence.

$\blacksquare$

---

## Related Topics

- [[03-supremum-and-infimum]] — the LUB property powers Monotone Convergence (Theorem 8.5).
- [[09-convergence-and-limits]] — makes "$x_n \to L$" precise via $\varepsilon$–$N$; develops algebra of limits, squeeze theorem.
- [[10-cauchy-sequences-completeness]] — the Cauchy criterion, Bolzano–Weierstrass in full generality, completeness of $\mathbb{R}$.
- [[12-infinite-series-introduction]] — series as sequences of partial sums; comparison, ratio, root tests.
- [[18-important-limits-infinite-limits]] — $\sqrt[n]{n} \to 1$, $(1 + x/n)^n \to e^x$, and companions.
