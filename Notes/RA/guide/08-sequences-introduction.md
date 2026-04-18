# 8. Sequences in $\mathbb{R}$ — Introduction

---

## 8.1 What Is a Sequence?

> **Definition.** A **sequence of real numbers** is a function $x : \mathbb{N} \to \mathbb{R}$. We write $x_n$ for $x(n)$ and denote the sequence $(x_n)_{n \in \mathbb{N}}$ or simply $(x_n)$.

Examples:
- $x_n = 1/n$: the sequence $1, 1/2, 1/3, \ldots$
- $x_n = (-1)^n$: the sequence $-1, 1, -1, 1, \ldots$
- $x_n = n$: $1, 2, 3, \ldots$
- $x_n = \sin(n)$: wild, but bounded.

A sequence is different from the set of its values — the ordering matters, and repetitions count. $((-1)^n)$ as a sequence is infinite, while its value set is $\{-1, 1\}$.

### Indexing conventions
Sometimes we start at $n = 0$ (so $x : \mathbb{N} \cup \{0\} \to \mathbb{R}$). The theory is identical up to a re-indexing.

---

## 8.2 Bounded Sequences

> **Definition.** A sequence $(x_n)$ is **bounded above** if $\{x_n : n \in \mathbb{N}\}$ is bounded above, i.e., $\exists M \in \mathbb{R}$ with $x_n \leq M$ for all $n$.

Analogously **bounded below**. A sequence is **bounded** if bounded both above and below: $\exists M > 0$ with $|x_n| \leq M$ for all $n$.

### Examples
- $x_n = 1/n$: bounded. $0 < x_n \leq 1$.
- $x_n = (-1)^n$: bounded. $|x_n| = 1$.
- $x_n = n$: not bounded (not bounded above).
- $x_n = (-1)^n n$: not bounded (neither above nor below).

---

## 8.3 Monotonic Sequences

> **Definition.** The sequence $(x_n)$ is:
> - **increasing** (non-decreasing) if $x_n \leq x_{n+1}$ for all $n$,
> - **strictly increasing** if $x_n < x_{n+1}$ for all $n$,
> - **decreasing** (non-increasing) if $x_n \geq x_{n+1}$ for all $n$,
> - **strictly decreasing** if $x_n > x_{n+1}$ for all $n$,
> - **monotonic** if it is increasing or decreasing,
> - **strictly monotonic** if strictly increasing or strictly decreasing.

### Examples
- $x_n = 1/n$: strictly decreasing.
- $x_n = n$: strictly increasing.
- $x_n = 1 - 1/n$: strictly increasing, bounded above by $1$.
- $x_n = (-1)^n$: not monotonic.

### Monotone Convergence

> **Theorem (Monotone Convergence).** Every monotonic and bounded sequence of real numbers converges.
> - If $(x_n)$ is increasing and bounded above, $\lim x_n = \sup\{x_n : n \in \mathbb{N}\}$.
> - If $(x_n)$ is decreasing and bounded below, $\lim x_n = \inf\{x_n : n \in \mathbb{N}\}$.

*Proof (increasing case).* Let $\alpha = \sup_n x_n$ (exists by LUB property). We claim $x_n \to \alpha$. Fix $\varepsilon > 0$. By the $\varepsilon$-characterisation of sup, $\exists N$ with $x_N > \alpha - \varepsilon$. For $n \geq N$: $\alpha - \varepsilon < x_N \leq x_n \leq \alpha$ (monotonicity + upper bound). So $|x_n - \alpha| < \varepsilon$ for all $n \geq N$. Hence $x_n \to \alpha$. $\blacksquare$

*The decreasing case is symmetric.*

This theorem is the workhorse for proving convergence without having to guess the limit. We use it to build classical constants:

> **Example (Euler's $e$).** The sequence $e_n = (1 + 1/n)^n$ is increasing and bounded above (by $3$), so converges. Its limit is $e \approx 2.718$.

> **Example (Harmonic approximations).** $a_n = \sum_{k=1}^{n} 1/k - \ln n$ is bounded and decreasing; the limit is **Euler's constant** $\gamma \approx 0.5772$.

Full proofs in [[09-convergence-and-limits]].

---

## 8.4 Operations on Sequences

Given sequences $(x_n), (y_n)$ and $c \in \mathbb{R}$:
- Sum: $(x_n + y_n)$
- Product: $(x_n y_n)$
- Scalar multiple: $(c \cdot x_n)$
- Quotient: $(x_n / y_n)$, provided $y_n \neq 0$ for all $n$
- Absolute value: $(|x_n|)$
- Power: $(x_n^k)$

These inherit boundedness/monotonicity only partially — e.g., the sum of two bounded sequences is bounded, but the sum of two monotonic sequences may not be monotonic (e.g., $x_n = n$ and $y_n = -n$).

---

## 8.5 Subsequences

> **Definition.** A **subsequence** of $(x_n)$ is $(x_{n_k})_{k \in \mathbb{N}}$ where $n_1 < n_2 < n_3 < \cdots$ are a strictly increasing sequence of indices.

Examples from $x_n = 1/n$:
- $(x_{2k}) = (1/2, 1/4, 1/6, \ldots)$: even-indexed subsequence.
- $(x_{2k-1}) = (1, 1/3, 1/5, \ldots)$: odd-indexed.
- $(x_{k^2}) = (1, 1/4, 1/9, 1/16, \ldots)$.

### Fundamental fact

> **Proposition.** Every subsequence of a convergent sequence converges to the same limit.

*Proof.* Suppose $x_n \to L$. Fix $\varepsilon > 0$; $\exists N$ with $|x_n - L| < \varepsilon$ for $n \geq N$. For any strictly increasing index sequence $(n_k)$, by induction $n_k \geq k$, so $n_k \geq N$ when $k \geq N$. Then $|x_{n_k} - L| < \varepsilon$. Hence $x_{n_k} \to L$. $\blacksquare$

**Contrapositive (useful for divergence):** If two subsequences of $(x_n)$ converge to different limits, $(x_n)$ does not converge.

**Example:** $x_n = (-1)^n$. Then $x_{2k} = 1 \to 1$ and $x_{2k-1} = -1 \to -1$. Two different limits, so $((-1)^n)$ diverges.

### Existence of monotonic subsequences

> **Theorem.** Every real sequence has a monotonic subsequence.

*Proof.* Call $m \in \mathbb{N}$ a **peak** if $x_m \geq x_n$ for all $n \geq m$.

Case 1: $(x_n)$ has infinitely many peaks $m_1 < m_2 < \cdots$. Then $x_{m_1} \geq x_{m_2} \geq \cdots$ is a decreasing subsequence.

Case 2: Only finitely many peaks. After the last peak $M$, no later index is a peak, so for each $n > M$, $\exists m > n$ with $x_m > x_n$. Build $n_1 > M$ arbitrary, $n_2$ with $x_{n_2} > x_{n_1}$, etc. — a strictly increasing subsequence. $\blacksquare$

### Consequence (toward Bolzano-Weierstrass)

> **Theorem (Bolzano-Weierstrass, sequence version).** Every bounded sequence in $\mathbb{R}$ has a convergent subsequence.

*Proof.* By the previous theorem, extract a monotonic subsequence $(x_{n_k})$. It is bounded (subsequence of a bounded sequence). By Monotone Convergence, $(x_{n_k})$ converges. $\blacksquare$

Full context and proofs in [[10-cauchy-sequences-completeness]].

---

## 8.6 Important Named Sequences

### Arithmetic progression
$x_n = a + (n-1)d$, with common difference $d$. Unbounded unless $d = 0$.

### Geometric progression
$x_n = a \cdot r^{n-1}$, with common ratio $r$.
- $|r| < 1$: $x_n \to 0$.
- $r = 1$: constant.
- $r = -1$: oscillates between $a$ and $-a$.
- $|r| > 1$: $|x_n| \to \infty$.

### Harmonic sequence
$x_n = 1/n$. Converges to $0$ (Archimedean).

### Fibonacci
$F_1 = F_2 = 1$, $F_{n+2} = F_n + F_{n+1}$. Grows like $\phi^n$ where $\phi = (1+\sqrt{5})/2$.

### $x_n = r^n$ for $|r| < 1$
Converges to $0$. Proof: $|r^n| = |r|^n \to 0$ (geometric decay; rigorous via logarithms or monotone convergence).

### $x_n = \sqrt[n]{n}$
Converges to $1$. (Non-trivial; proved in [[09-convergence-and-limits]] or [[18-important-limits-infinite-limits]].)

---

## 8.7 Tail of a Sequence

> **Definition.** The **tail** of $(x_n)$ starting at $N$ is the sequence $(x_{N}, x_{N+1}, x_{N+2}, \ldots)$.

**Key principle.** Convergence and limits depend only on the behaviour of the tail — changing finitely many terms of a sequence does not affect convergence or the limit value. Formally: if $(x_n)$ and $(y_n)$ agree for all $n \geq N_0$, then $(x_n)$ converges iff $(y_n)$ converges, and limits are equal.

This is the precise way to say "what matters is the long run."

---

## Worked Examples

**Example 1:** Show that $x_n = n/(n+1)$ is strictly increasing and bounded above by $1$.

*Solution:* $x_{n+1} - x_n = \frac{n+1}{n+2} - \frac{n}{n+1} = \frac{(n+1)^2 - n(n+2)}{(n+1)(n+2)} = \frac{1}{(n+1)(n+2)} > 0$. Strictly increasing. Also $x_n = 1 - 1/(n+1) < 1$. $\blacksquare$

By Monotone Convergence, $x_n \to \sup_n x_n = 1$ (we show $1$ is the sup by $\varepsilon$-char: given $\varepsilon > 0$, choose $n > 1/\varepsilon$ to get $x_n > 1 - \varepsilon$).

---

**Example 2:** Prove that the sequence $x_n = 1 + 1/2! + 1/3! + \cdots + 1/n!$ is convergent.

*Solution:* **Monotonic:** $x_{n+1} - x_n = 1/(n+1)! > 0$. Strictly increasing.

**Bounded above:** For $k \geq 2$, $k! \geq 2^{k-1}$ (by induction: $2! = 2 \geq 2^1$; if $k! \geq 2^{k-1}$ then $(k+1)! \geq (k+1) \cdot 2^{k-1} \geq 2^k$). So
$$x_n \leq 1 + \sum_{k=2}^{n} 1/2^{k-1} = 1 + (1/2 + 1/4 + \cdots + 1/2^{n-1}) \leq 1 + 1 = 2.$$
By Monotone Convergence, $(x_n)$ converges. (Limit is $e - 1$.)

---

**Example 3:** Let $a_1 = \sqrt{2}$ and $a_{n+1} = \sqrt{2 + a_n}$. Show $(a_n)$ converges and find the limit.

*Solution:* **Bounded:** Show $a_n < 2$ by induction. Base: $a_1 = \sqrt{2} < 2$. Step: if $a_n < 2$, $a_{n+1} = \sqrt{2+a_n} < \sqrt{4} = 2$.

**Monotonic (increasing):** Show $a_{n+1} > a_n$. $a_{n+1}^2 - a_n^2 = (2 + a_n) - a_n^2 = -(a_n - 2)(a_n + 1)$. Since $0 < a_n < 2$ and $a_n + 1 > 0$: $a_{n+1}^2 > a_n^2$, so $a_{n+1} > a_n > 0$.

By Monotone Convergence, $L = \lim a_n$ exists. Pass $n \to \infty$ in $a_{n+1}^2 = 2 + a_n$: $L^2 = 2 + L$, so $L^2 - L - 2 = 0$, so $L = 2$ or $L = -1$. Since $a_n > 0$, $L \geq 0$, so $L = 2$. $\blacksquare$

---

**Example 4:** Show that the sequence $x_n = (-1)^n n/(n+1)$ is bounded but not monotonic.

*Solution:* $|x_n| = n/(n+1) < 1$, so bounded. $x_1 = -1/2$, $x_2 = 2/3$, $x_3 = -3/4$: alternates sign, not monotonic. $\blacksquare$

Note: $(x_{2k})$ increases to $1$; $(x_{2k-1})$ decreases to $-1$. Different subsequence limits $\Rightarrow$ no limit.

---

**Example 5:** Extract a monotonic subsequence from $x_n = (-1)^n(1 + 1/n)$.

*Solution:* Even-indexed: $x_{2k} = 1 + 1/(2k)$ — strictly decreasing, positive, converges to $1$. This is a monotonic subsequence. $\blacksquare$

---

## Practice Problems

1. Determine whether each sequence is bounded, monotonic, or neither:
   - (a) $x_n = n\sin(1/n)$
   - (b) $x_n = (n+1)/(2n-3)$
   - (c) $x_n = (-1)^n + 1/n$
   - (d) $x_n = 1 - (1/2)^n$

2. Let $x_1 > 0$ and $x_{n+1} = (x_n + 3/x_n)/2$. Show $(x_n)$ is bounded below by $\sqrt{3}$ (for $n \geq 2$) and eventually decreasing, hence convergent. Find the limit. (Newton's method for $\sqrt{3}$.)

3. Prove: if $x_n \to L$ and $(x_{n_k})$ is any subsequence, then $x_{n_k} \to L$.

4. Show that $(1 + 1/n)^n$ is increasing. (*Hint:* AM-GM applied to $n$ copies of $(1 + 1/n)$ and one copy of $1$.)

5. Show that every sequence has a monotonic subsequence. (State and prove carefully.)

### Solutions

**1.**
- (a) $x_n = n\sin(1/n)$. Using $\sin(1/n) \approx 1/n$: $x_n \to 1$. In fact $x_n$ is increasing and bounded (standard fact). Bounded, monotonic.
- (b) $x_n = (n+1)/(2n-3)$. $x_n = (1 + 1/n)/(2 - 3/n) \to 1/2$. Check monotonicity: $x_{n+1} - x_n = \frac{n+2}{2n-1} - \frac{n+1}{2n-3} = \frac{(n+2)(2n-3) - (n+1)(2n-1)}{(2n-1)(2n-3)} = \frac{-5}{(2n-1)(2n-3)} < 0$ (for $n \geq 2$). Strictly decreasing (for $n \geq 2$). Bounded (between $1/2$ and a small number). Monotonic eventually.
- (c) $(-1)^n + 1/n$: bounded by $2$. Not monotonic: $x_1 = 0, x_2 = 3/2, x_3 = -2/3$.
- (d) $1 - (1/2)^n$: strictly increasing ($(1/2)^{n+1} < (1/2)^n$), bounded above by $1$, below by $1/2$. Monotonic, bounded.

**2.** By AM-GM: $x_{n+1} = \frac{x_n + 3/x_n}{2} \geq \sqrt{x_n \cdot 3/x_n} = \sqrt{3}$ for all $n \geq 1$ (provided $x_n > 0$, which is preserved). So $x_n \geq \sqrt{3}$ for $n \geq 2$.

For $n \geq 2$: $x_n \geq \sqrt{3}$ so $x_n^2 \geq 3$ so $3/x_n \leq x_n$. Then $x_{n+1} = (x_n + 3/x_n)/2 \leq (x_n + x_n)/2 = x_n$. So $(x_n)_{n \geq 2}$ is decreasing.

Monotone Convergence $\Rightarrow L = \lim x_n$ exists, $L \geq \sqrt{3}$. Passing to the limit in the recursion: $L = (L + 3/L)/2 \Rightarrow 2L = L + 3/L \Rightarrow L = 3/L \Rightarrow L^2 = 3 \Rightarrow L = \sqrt{3}$.

**3.** (Proved in §8.5.) Fix $\varepsilon > 0$; $\exists N$: $|x_n - L| < \varepsilon$ for $n \geq N$. Since $(n_k)$ strictly increasing, $n_k \geq k \geq N$ once $k \geq N$. Then $|x_{n_k} - L| < \varepsilon$. $\blacksquare$

**4.** Apply AM-GM to $n$ copies of $(1 + 1/n)$ and one copy of $1$:
$$\frac{n(1 + 1/n) + 1}{n + 1} \geq \sqrt[n+1]{(1 + 1/n)^n \cdot 1}.$$
LHS $= (n + 1 + 1)/(n+1) = 1 + 1/(n+1)$. Raise both sides to power $n+1$:
$$(1 + 1/(n+1))^{n+1} \geq (1 + 1/n)^n. \blacksquare$$

**5.** (Proved in §8.5.) *Peak* $m$: $x_m \geq x_n$ for all $n \geq m$. Two cases.
- Infinitely many peaks $\to$ decreasing subsequence.
- Finitely many $\to$ after the last peak, strictly increasing subsequence.

Either case gives a monotonic subsequence. $\blacksquare$

---

## Related Topics
- [[03-supremum-and-infimum]] — LUB axiom powers Monotone Convergence
- [[09-convergence-and-limits]] — makes "$x_n \to L$" precise
- [[10-cauchy-sequences-completeness]] — Cauchy criterion, Bolzano-Weierstrass, completeness
- [[12-infinite-series-introduction]] — series = sequence of partial sums
