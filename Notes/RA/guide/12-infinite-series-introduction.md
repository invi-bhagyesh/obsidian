# 12. Infinite Series — Introduction

---

## 12.1 What Is a Series?

> **Definition.** Given a sequence $(a_n)$, the formal expression
> $$\sum_{n=1}^{\infty} a_n = a_1 + a_2 + a_3 + \cdots$$
> is an **infinite series**. The numbers $a_n$ are the **terms** of the series.

> **Definition.** The $N$-th **partial sum** is
> $$S_N = \sum_{n=1}^{N} a_n = a_1 + a_2 + \cdots + a_N.$$

The series $\sum a_n$ **converges** if the sequence $(S_N)$ of partial sums converges. Otherwise the series **diverges**. When convergent, the limit is the **sum**:
$$\sum_{n=1}^{\infty} a_n = \lim_{N \to \infty} S_N.$$

So a series is just a sequence in disguise — namely, the sequence of its partial sums. All the machinery from [[09-convergence-and-limits]] and [[10-cauchy-sequences-completeness]] carries over.

---

## 12.2 Basic Examples

### Geometric Series

> **Theorem.** For $r \in \mathbb{R}$:
> $$\sum_{n=0}^{\infty} r^n = \begin{cases} \dfrac{1}{1-r} & \text{if } |r| < 1 \\[0.3em] \text{diverges} & \text{if } |r| \geq 1 \end{cases}$$

*Proof.* Partial sum $S_N = 1 + r + r^2 + \cdots + r^N$. If $r \neq 1$:
$$(1 - r)S_N = 1 - r^{N+1}\ \Rightarrow\ S_N = \frac{1 - r^{N+1}}{1 - r}.$$
- $|r| < 1$: $r^{N+1} \to 0$, so $S_N \to 1/(1-r)$.
- $|r| > 1$: $|r^{N+1}| \to \infty$, $S_N$ unbounded.
- $r = 1$: $S_N = N+1 \to \infty$.
- $r = -1$: $S_N$ alternates between $1$ and $0$, no limit. $\blacksquare$

Starting at $n = 1$: $\sum_{n=1}^{\infty} r^n = r/(1-r)$ for $|r| < 1$.

### Telescoping Series

> **Example.** $\sum_{n=1}^{\infty} \frac{1}{n(n+1)} = 1$.

*Proof.* Partial fractions: $\frac{1}{n(n+1)} = \frac{1}{n} - \frac{1}{n+1}$. Partial sum telescopes:
$$S_N = \sum_{n=1}^{N}\left(\frac{1}{n} - \frac{1}{n+1}\right) = 1 - \frac{1}{N+1} \to 1. \blacksquare$$

### The Harmonic Series Diverges

> **Theorem.** $\sum_{n=1}^{\infty} \frac{1}{n} = \infty$.

*Proof.* Group terms:
$$S_{2^k} = 1 + \frac{1}{2} + \left(\frac{1}{3} + \frac{1}{4}\right) + \left(\frac{1}{5} + \cdots + \frac{1}{8}\right) + \cdots$$
The $j$-th group has $2^{j-1}$ terms, each $\geq 1/2^j$, so sums to $\geq 1/2$. Hence $S_{2^k} \geq 1 + k/2 \to \infty$. (Oresme, ~1350.) $\blacksquare$

This is striking: the terms $\to 0$, yet the sum is infinite.

### $p$-Series

> **Theorem ($p$-Series Test).** $\sum_{n=1}^{\infty} \frac{1}{n^p}$ converges $\iff p > 1$.

For $p \leq 0$ terms don't go to $0$ (divergence test). For $0 < p \leq 1$, compare with harmonic (diverges). For $p > 1$, use the integral test or Cauchy condensation — see [[13-series-convergence-tests]].

**Famous values:**
- $\sum 1/n^2 = \pi^2/6$ (Basel problem, Euler 1735).
- $\sum 1/n^4 = \pi^4/90$.
- $\sum 1/n^3$ is known to be irrational (Apéry) but no closed form.

---

## 12.3 The Divergence Test (Necessary Condition)

> **Theorem.** If $\sum a_n$ converges, then $a_n \to 0$.

*Proof.* $a_n = S_n - S_{n-1}$. If $S_n \to S$, then $a_n \to S - S = 0$. $\blacksquare$

**Contrapositive (the "nth-term test"):** If $a_n \not\to 0$, then $\sum a_n$ diverges.

### Examples of divergence by nth-term
- $\sum (-1)^n$: $a_n$ doesn't tend to $0$. Diverges.
- $\sum \frac{n}{n+1}$: $a_n \to 1 \neq 0$. Diverges.
- $\sum \cos(1/n)$: $a_n \to 1$. Diverges.

**Warning:** The converse fails. $a_n \to 0$ does **not** guarantee convergence (harmonic: $1/n \to 0$ but $\sum 1/n$ diverges).

---

## 12.4 Cauchy Criterion for Series

> **Theorem (Cauchy Criterion).** $\sum a_n$ converges $\iff$
> $$\forall \varepsilon > 0,\ \exists N,\ \forall n > m \geq N :\ \left|\sum_{k=m+1}^{n} a_k\right| < \varepsilon.$$

*Proof.* The series converges iff $(S_n)$ converges iff $(S_n)$ is Cauchy (by [[10-cauchy-sequences-completeness]]). $|S_n - S_m| = |a_{m+1} + \cdots + a_n|$. $\blacksquare$

This is the intrinsic convergence test — no need for a limit guess.

**Application — rederiving the divergence test:** taking $n = m + 1$ gives $|a_{m+1}| < \varepsilon$, so $a_n \to 0$ is necessary.

---

## 12.5 Linearity and Elementary Properties

> **Theorem.** Suppose $\sum a_n = A$ and $\sum b_n = B$ both converge, and $c \in \mathbb{R}$. Then:
> 1. $\sum (a_n + b_n) = A + B$.
> 2. $\sum c \cdot a_n = c A$.

*Proof.* Partial sums: $\sum_{k=1}^N (a_k + b_k) = \sum a_k + \sum b_k \to A + B$ (algebra of sequence limits). Similarly $\sum c a_k = c \sum a_k \to cA$. $\blacksquare$

### Adding/removing finite terms

Convergence/divergence of $\sum a_n$ is unaffected by modifying, removing, or prepending finitely many terms — the sum changes by a constant but the convergence status does not.

### Non-commutativity alert

A convergent series that is not *absolutely* convergent is **not** invariant under rearrangement. See [[15-rearrangement-of-series]] for Riemann's rearrangement theorem.

---

## 12.6 Series of Positive Terms

Many tests and intuitions apply specifically to series $\sum a_n$ with $a_n \geq 0$. For such series:

> **Proposition.** If $a_n \geq 0$, then $\sum a_n$ converges $\iff$ the partial sums $(S_N)$ are bounded above.

*Proof.* $(S_N)$ is increasing (since $S_N - S_{N-1} = a_N \geq 0$). An increasing sequence converges iff bounded above (Monotone Convergence). $\blacksquare$

This is the cleanest criterion for positive series: "show partial sums stay bounded."

### Notation $\sum a_n < \infty$
For series of non-negative terms, $\sum a_n < \infty$ means the sum is finite (i.e., converges); $\sum a_n = \infty$ means it diverges to $+\infty$.

---

## 12.7 Comparison Test (Preliminary)

> **Theorem (Comparison Test).** Suppose $0 \leq a_n \leq b_n$ for all $n$ (or eventually).
> 1. If $\sum b_n < \infty$, then $\sum a_n < \infty$.
> 2. If $\sum a_n = \infty$, then $\sum b_n = \infty$.

*Proof.* Partial sums satisfy $S_N^a = \sum_{k=1}^N a_k \leq \sum_{k=1}^N b_k = S_N^b$. If $(S_N^b)$ is bounded, so is $(S_N^a)$. $\blacksquare$

### Examples

- $\sum \frac{1}{n^2 + 1}$ converges: $0 \leq \frac{1}{n^2+1} \leq \frac{1}{n^2}$, and $\sum 1/n^2$ converges.
- $\sum \frac{1}{\sqrt{n}}$ diverges: $\frac{1}{\sqrt{n}} \geq \frac{1}{n}$ and $\sum 1/n$ diverges.
- $\sum \frac{\sin^2 n}{n^2}$ converges: $0 \leq \sin^2 n/n^2 \leq 1/n^2$.

Full treatment in [[13-series-convergence-tests]].

---

## 12.8 Important Expansions

These series are used constantly in analysis:

- **Exponential:** $\displaystyle e^x = \sum_{n=0}^{\infty} \frac{x^n}{n!}$ (converges for all $x \in \mathbb{R}$)
- **Sine:** $\displaystyle \sin x = \sum_{n=0}^{\infty} \frac{(-1)^n x^{2n+1}}{(2n+1)!}$
- **Cosine:** $\displaystyle \cos x = \sum_{n=0}^{\infty} \frac{(-1)^n x^{2n}}{(2n)!}$
- **Natural log:** $\displaystyle \ln(1 + x) = \sum_{n=1}^{\infty} \frac{(-1)^{n+1} x^n}{n}$ (converges for $-1 < x \leq 1$)
- **Geometric:** $\displaystyle \frac{1}{1-x} = \sum_{n=0}^{\infty} x^n$ (for $|x| < 1$)
- **Binomial ($\alpha \in \mathbb{R}$):** $\displaystyle (1 + x)^\alpha = \sum_{n=0}^{\infty} \binom{\alpha}{n} x^n$ for $|x| < 1$

These are introduced now because they are familiar; convergence justifications follow from tests in [[13-series-convergence-tests]] and the theory of power series (deferred to a more advanced course).

---

## Worked Examples

**Example 1:** Determine the sum of $\displaystyle \sum_{n=1}^{\infty} \frac{1}{(2n-1)(2n+1)}$.

*Solution:* Partial fractions: $\frac{1}{(2n-1)(2n+1)} = \frac{1}{2}\left(\frac{1}{2n-1} - \frac{1}{2n+1}\right)$. Telescope:
$$S_N = \frac{1}{2}\sum_{n=1}^{N}\left(\frac{1}{2n-1} - \frac{1}{2n+1}\right) = \frac{1}{2}\left(1 - \frac{1}{2N+1}\right) \to \frac{1}{2}.$$
Sum $= 1/2$. $\blacksquare$

---

**Example 2:** Does $\displaystyle \sum_{n=1}^{\infty}\left(1 + \frac{1}{n}\right)^n$ converge?

*Solution:* $a_n = (1 + 1/n)^n \to e \neq 0$. By divergence test, the series diverges. $\blacksquare$

---

**Example 3:** Sum $\displaystyle \sum_{n=1}^{\infty}\frac{2^n + 3^n}{5^n}$.

*Solution:* Split as two geometric series:
$$\sum \frac{2^n}{5^n} + \sum \frac{3^n}{5^n} = \sum(2/5)^n + \sum(3/5)^n.$$
Starting $n = 1$: $(2/5)/(1 - 2/5) + (3/5)/(1 - 3/5) = (2/5)/(3/5) + (3/5)/(2/5) = 2/3 + 3/2 = 13/6$. $\blacksquare$

---

**Example 4:** Show that $\sum_{n=1}^{\infty}\frac{n}{2^n}$ converges and find its sum.

*Solution:* Let $S = \sum_{n=1}^\infty n/2^n$. $2S = \sum n/2^{n-1} = \sum_{n=1}^\infty n/2^{n-1}$. Shift index $m = n - 1$:
$$2S = \sum_{m=0}^\infty (m+1)/2^m = \sum_{m=0}^\infty 1/2^m + \sum_{m=0}^\infty m/2^m = 2 + 0 + S.$$
So $S = 2$. (Justifiable by ratio test + telescoping; power-series-style manipulation legitimate for absolutely convergent series.) $\blacksquare$

---

**Example 5:** Show $\sum_{n=2}^{\infty}\frac{1}{n \ln n}$ diverges.

*Solution:* Compare with $\int_2^\infty \frac{dx}{x \ln x} = \ln \ln x \Big|_2^\infty = \infty$. (Full integral-test argument in [[13-series-convergence-tests]].) $\blacksquare$

A concrete Cauchy-criterion version:
$$\sum_{k=n+1}^{2n}\frac{1}{k \ln k} \geq \frac{n}{2n \ln(2n)} = \frac{1}{2\ln(2n)} \not\to 0,$$
so partial sums don't form a Cauchy sequence.

---

## Practice Problems

1. Determine whether each series converges; find the sum when possible.
   - (a) $\sum_{n=1}^\infty (1/3)^n$
   - (b) $\sum_{n=1}^\infty \ln(1 + 1/n)$
   - (c) $\sum_{n=1}^\infty \frac{1}{n^2 + n}$
   - (d) $\sum_{n=1}^\infty (-1)^n$

2. Prove that $\sum_{n=1}^\infty \frac{1}{n(n+1)(n+2)} = \frac{1}{4}$.

3. Show that if $a_n \geq 0$ and $\sum a_n$ converges, then $\sum a_n^2$ converges.

4. Prove: if $\sum a_n$ converges and $(b_n)$ is bounded and monotonic, then... (in general, nothing follows — give a **counterexample** if the assertion were $\sum a_n b_n$ converges).

5. Find all $x \in \mathbb{R}$ for which $\sum_{n=0}^\infty x^n/n!$ converges (this is $e^x$). Use the ratio test (see [[13-series-convergence-tests]]).

### Solutions

**1(a).** Geometric, $r = 1/3 < 1$. Sum $= (1/3)/(1 - 1/3) = 1/2$.

**1(b).** $\ln(1 + 1/n) = \ln(n+1) - \ln n$. Telescopes: $S_N = \ln(N+1) - \ln 1 = \ln(N+1) \to \infty$. Diverges.

**1(c).** $\frac{1}{n^2+n} = \frac{1}{n(n+1)} = \frac{1}{n} - \frac{1}{n+1}$. Telescopes to $1 - 1/(N+1) \to 1$. Sum $= 1$.

**1(d).** $a_n = (-1)^n \not\to 0$. Diverges.

**2.** Partial fractions: $\frac{1}{n(n+1)(n+2)} = \frac{A}{n} + \frac{B}{n+1} + \frac{C}{n+2}$. Solve: $A = 1/2, B = -1, C = 1/2$. So
$$\frac{1}{n(n+1)(n+2)} = \frac{1}{2}\left[\frac{1}{n} - \frac{1}{n+1}\right] - \frac{1}{2}\left[\frac{1}{n+1} - \frac{1}{n+2}\right].$$
Telescope:
$$S_N = \frac{1}{2}\left(1 - \frac{1}{N+1}\right) - \frac{1}{2}\left(\frac{1}{2} - \frac{1}{N+2}\right) \to \frac{1}{2} - \frac{1}{4} = \frac{1}{4}. \blacksquare$$

**3.** $\sum a_n < \infty$, $a_n \geq 0$ $\Rightarrow a_n \to 0$ $\Rightarrow$ for large $n$, $0 \leq a_n \leq 1$, hence $0 \leq a_n^2 \leq a_n$. Comparison test: $\sum a_n^2$ converges. $\blacksquare$

**4.** Counterexample: $a_n = (-1)^n/n$ (alternating harmonic, converges). $b_n = (-1)^n$ (bounded, not monotonic — but if we take $b_n = 1$ if $n$ odd, $-1$ if even, which is bounded but not monotonic; try $b_n = $ constant). With $b_n = 1$: $\sum a_n b_n = \sum a_n$ converges. OK.

Actual counterexample: Let $a_n = (-1)^n/\sqrt{n}$. $\sum a_n$ converges (alternating). Let $b_n = (-1)^n$ (bounded, not monotonic). $\sum a_n b_n = \sum 1/\sqrt{n}$ **diverges**.

(For bounded monotonic $b_n$, one can actually prove convergence — this is Abel's test. So the right counterexample drops monotonicity.)

**5.** Ratio: $|a_{n+1}/a_n| = |x|/(n+1) \to 0 < 1$ for any $x$. So $\sum x^n/n!$ converges absolutely for all $x \in \mathbb{R}$. Sum is $e^x$. $\blacksquare$

---

## Related Topics
- [[09-convergence-and-limits]] — partial sums are sequences
- [[10-cauchy-sequences-completeness]] — Cauchy criterion carries over
- [[13-series-convergence-tests]] — comparison, ratio, root, integral, Cauchy condensation, Raabe, Gauss
- [[14-alternating-and-absolute-convergence]] — alternating series, absolute vs conditional
- [[15-rearrangement-of-series]] — Riemann rearrangement theorem
