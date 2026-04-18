# 9. Convergence and Limits of Sequences

---

## 9.1 The $\varepsilon$-$N$ Definition

> **Definition.** A sequence $(x_n)$ of real numbers **converges to $L \in \mathbb{R}$** if:
> $$\forall \varepsilon > 0,\ \exists N \in \mathbb{N}\ \text{such that}\ \forall n \geq N,\ |x_n - L| < \varepsilon.$$

We write $x_n \to L$ or $\lim_{n \to \infty} x_n = L$.

We say $(x_n)$ is **convergent** if some such $L$ exists, and **divergent** otherwise.

### Reading the definition
- "$\varepsilon$" = any positive tolerance, however small.
- "$N$" = a cutoff index chosen in response to $\varepsilon$.
- "$n \geq N$" = from that point on.
- "$|x_n - L| < \varepsilon$" = $x_n$ is within $\varepsilon$ of $L$.

The order of quantifiers is critical: "for every $\varepsilon$, there exists $N$" — $N$ depends on $\varepsilon$.

---

## 9.2 Uniqueness of Limits

> **Theorem.** A convergent sequence has a unique limit.

*Proof.* Suppose $x_n \to L_1$ and $x_n \to L_2$ with $L_1 \neq L_2$. Set $\varepsilon = |L_1 - L_2|/2 > 0$.

- $\exists N_1$: $|x_n - L_1| < \varepsilon$ for $n \geq N_1$.
- $\exists N_2$: $|x_n - L_2| < \varepsilon$ for $n \geq N_2$.

For $n \geq \max(N_1, N_2)$:
$$|L_1 - L_2| = |L_1 - x_n + x_n - L_2| \leq |x_n - L_1| + |x_n - L_2| < 2\varepsilon = |L_1 - L_2|,$$
contradiction. $\blacksquare$

This justifies notation $\lim x_n$ (singular).

---

## 9.3 Convergent $\Rightarrow$ Bounded

> **Theorem.** Every convergent sequence is bounded.

*Proof.* Let $x_n \to L$. Take $\varepsilon = 1$: $\exists N$ with $|x_n - L| < 1$ for $n \geq N$, so $|x_n| < |L| + 1$. Let $M = \max(|x_1|, \ldots, |x_{N-1}|, |L| + 1)$. Then $|x_n| \leq M$ for all $n$. $\blacksquare$

**Contrapositive (useful):** Unbounded $\Rightarrow$ divergent. Example: $x_n = n$ is unbounded, so diverges.

**Warning:** The converse fails. Bounded does not imply convergent: $x_n = (-1)^n$ is bounded but diverges.

---

## 9.4 Algebra of Limits

> **Theorem (Algebra of Limits).** Suppose $x_n \to L$ and $y_n \to M$. Then:
> 1. $x_n + y_n \to L + M$
> 2. $c \cdot x_n \to c L$ for any $c \in \mathbb{R}$
> 3. $x_n \cdot y_n \to L \cdot M$
> 4. If $M \neq 0$ and $y_n \neq 0$ for all $n$: $x_n / y_n \to L / M$
> 5. $|x_n| \to |L|$

### Proof of (1)

Fix $\varepsilon > 0$. $\exists N_1$: $|x_n - L| < \varepsilon/2$ for $n \geq N_1$. $\exists N_2$: $|y_n - M| < \varepsilon/2$ for $n \geq N_2$. For $n \geq \max(N_1, N_2)$:
$$|(x_n + y_n) - (L + M)| \leq |x_n - L| + |y_n - M| < \varepsilon/2 + \varepsilon/2 = \varepsilon. \blacksquare$$

### Proof of (3)

$(x_n)$ convergent $\Rightarrow$ bounded: $|x_n| \leq K$ for some $K$. For $n \geq \max(N_1, N_2)$ (cleverly chosen):
$$|x_n y_n - LM| = |x_n y_n - x_n M + x_n M - LM| \leq |x_n||y_n - M| + |M||x_n - L|$$
$$\leq K \cdot \varepsilon/(2K) + |M| \cdot \varepsilon/(2(|M|+1)) < \varepsilon. \blacksquare$$

### Proof of (5)

By reverse triangle inequality: $\big||x_n| - |L|\big| \leq |x_n - L|$. $\blacksquare$

---

## 9.5 Order and Limits

> **Theorem.** Suppose $x_n \to L$.
> 1. If $x_n \geq a$ for all large $n$, then $L \geq a$.
> 2. If $x_n \leq b$ for all large $n$, then $L \leq b$.

*Proof of (1).* Suppose $L < a$. Take $\varepsilon = a - L > 0$: $\exists N$ with $|x_n - L| < \varepsilon$ for $n \geq N$, so $x_n < L + \varepsilon = a$, contradicting $x_n \geq a$. Hence $L \geq a$. $\blacksquare$

**Warning:** Strict inequalities do not pass to limits. $x_n = 1/n > 0$ for all $n$, but $\lim x_n = 0$.

> **Theorem (Sandwich / Squeeze).** If $a_n \leq x_n \leq b_n$ for all large $n$, and $a_n \to L$ and $b_n \to L$, then $x_n \to L$.

*Proof.* Fix $\varepsilon > 0$. $\exists N_1, N_2$: $|a_n - L| < \varepsilon$ for $n \geq N_1$, $|b_n - L| < \varepsilon$ for $n \geq N_2$. For $n \geq \max(N_1, N_2)$: $L - \varepsilon < a_n \leq x_n \leq b_n < L + \varepsilon$, so $|x_n - L| < \varepsilon$. $\blacksquare$

**Application:** $x_n = \sin(n)/n$. Since $|\sin(n)| \leq 1$: $-1/n \leq x_n \leq 1/n$; both bounds $\to 0$, so $x_n \to 0$.

---

## 9.6 Divergence to Infinity

> **Definition.** $x_n \to +\infty$ if for every $M > 0$, $\exists N$ with $x_n > M$ for all $n \geq N$.

Symmetrically $x_n \to -\infty$. These are divergent sequences (no real limit) but with a definite "direction."

### Examples
- $x_n = n \to \infty$
- $x_n = -n^2 \to -\infty$
- $x_n = n \sin(n)$: diverges but **not** to $\pm\infty$ (oscillates in sign, not eventually bounded away from $0$).

---

## 9.7 Standard Limits

These should be memorised; they're invoked constantly.

| Sequence $(x_n)$ | Limit |
|---|---|
| $1/n$ | $0$ |
| $1/n^p$, $p > 0$ | $0$ |
| $r^n$, $|r| < 1$ | $0$ |
| $r^n$, $r = 1$ | $1$ |
| $r^n$, $\|r\| > 1$ | diverges ($\pm\infty$ if $r > 1$) |
| $n^{1/n}$ | $1$ |
| $c^{1/n}$, $c > 0$ | $1$ |
| $\frac{x^n}{n!}$ | $0$ (for any $x$) |
| $\left(1 + \frac{1}{n}\right)^n$ | $e$ |
| $\left(1 + \frac{x}{n}\right)^n$ | $e^x$ |
| $\frac{n^k}{a^n}$, $a > 1$, $k > 0$ fixed | $0$ (exponential beats polynomial) |
| $\frac{\ln n}{n^p}$, $p > 0$ | $0$ |

### Proof that $n^{1/n} \to 1$

For $n \geq 1$, write $n^{1/n} = 1 + h_n$ where $h_n \geq 0$. Then
$$n = (1 + h_n)^n \geq \binom{n}{2} h_n^2 = \frac{n(n-1)}{2} h_n^2,$$
so $h_n^2 \leq 2/(n-1)$ for $n \geq 2$, giving $h_n \to 0$ and hence $n^{1/n} \to 1$. $\blacksquare$

### Proof that $x^n/n! \to 0$

Fix $x$. Choose $N > 2|x|$. For $n \geq N$:
$$\frac{|x|^n}{n!} = \frac{|x|^N}{N!} \cdot \prod_{k=N+1}^{n} \frac{|x|}{k} \leq \frac{|x|^N}{N!} \cdot \left(\frac{1}{2}\right)^{n - N} \to 0. \blacksquare$$

### Proof that $(1 + 1/n)^n \to e$

Let $e_n = (1 + 1/n)^n$. As shown in [[08-sequences-introduction]] Problem 4, $(e_n)$ is increasing. Boundedness: binomial expansion
$$e_n = \sum_{k=0}^{n} \binom{n}{k} n^{-k} = \sum_{k=0}^n \frac{1}{k!} \cdot \frac{n(n-1)\cdots(n-k+1)}{n^k} \leq \sum_{k=0}^n \frac{1}{k!} \leq 3.$$
So $(e_n)$ is increasing and bounded above, hence convergent. Define $e = \lim e_n$. $\blacksquare$

---

## 9.8 Subsequences and Convergence

> **Theorem.** $x_n \to L$ $\iff$ every subsequence of $(x_n)$ converges to $L$.

($\Rightarrow$) Proved in [[08-sequences-introduction]] §8.5.

($\Leftarrow$) The full sequence is a subsequence of itself.

### Useful contrapositive

> $(x_n)$ *does not* converge to $L$ $\iff$ some subsequence does not converge to $L$.

**Application:** $x_n = (-1)^n$. The subsequence $(x_{2k}) = (1, 1, \ldots)$ converges to $1$, but $(x_{2k-1}) = (-1, -1, \ldots)$ converges to $-1$. Different limits $\Rightarrow (x_n)$ diverges.

### $\lim\sup$ and $\lim\inf$ (preview)

For a bounded sequence:
$$\limsup_{n\to\infty} x_n = \lim_{N\to\infty} \sup_{n \geq N} x_n, \quad \liminf_{n\to\infty} x_n = \lim_{N\to\infty} \inf_{n \geq N} x_n.$$

These are the largest and smallest subsequential limits. $(x_n)$ converges $\iff$ $\liminf x_n = \limsup x_n$, and then this common value is the limit.

---

## 9.9 Sequences Defined by Recursion

Many practical sequences are defined by $x_{n+1} = f(x_n)$ (a **dynamical system**). The standard technique:

1. **Existence of limit** — show $(x_n)$ is bounded and monotonic (or Cauchy); apply Monotone Convergence.
2. **Value of limit** — if $x_n \to L$ and $f$ continuous, then $x_{n+1} = f(x_n) \to f(L)$. Since $x_{n+1}$ is also a subsequence-indexed version of $x_n$, $L = f(L)$ — a **fixed-point equation**.

### Example: $x_{n+1} = \sqrt{2 + x_n}$, $x_1 = 0$
Bounded above by $2$ (induction), increasing (rearrange $x_{n+1}^2 = 2 + x_n$). Converges to $L$ with $L^2 = 2 + L \Rightarrow L = 2$.

### Example: $x_{n+1} = (x_n + a/x_n)/2$, $x_1 > 0$ (Newton/Heron for $\sqrt{a}$)
Bounded below by $\sqrt{a}$ (AM-GM) and eventually decreasing. Converges to $\sqrt{a}$ (fixed point of the map).

---

## Worked Examples

**Example 1:** Prove that $\frac{1}{n^2} \to 0$ directly from the $\varepsilon$-$N$ definition.

*Solution:* Given $\varepsilon > 0$, we need $N$ with $1/n^2 < \varepsilon$ for $n \geq N$, i.e., $n > 1/\sqrt{\varepsilon}$. Choose $N > 1/\sqrt{\varepsilon}$ (Archimedean). Then for $n \geq N$:
$$\left|\frac{1}{n^2} - 0\right| = \frac{1}{n^2} < \frac{1}{N^2} < \varepsilon. \blacksquare$$

---

**Example 2:** Compute $\lim_{n \to \infty} \frac{3n^2 + 2n - 1}{n^2 - 5n + 6}$.

*Solution:* Divide numerator and denominator by $n^2$:
$$\frac{3n^2 + 2n - 1}{n^2 - 5n + 6} = \frac{3 + 2/n - 1/n^2}{1 - 5/n + 6/n^2}.$$
Since $1/n \to 0$ and $1/n^2 \to 0$, by algebra of limits (9.4):
$$\text{numerator} \to 3,\ \text{denominator} \to 1,\ \text{ratio} \to 3. \blacksquare$$

---

**Example 3:** Use the sandwich theorem to compute $\lim_{n\to\infty} \frac{\lfloor n\pi \rfloor}{n}$.

*Solution:* $n\pi - 1 < \lfloor n\pi \rfloor \leq n\pi$. Divide by $n$:
$$\pi - \frac{1}{n} < \frac{\lfloor n\pi \rfloor}{n} \leq \pi.$$
Both bounds tend to $\pi$, so $\lfloor n\pi \rfloor/n \to \pi$. $\blacksquare$

---

**Example 4:** Show $\sqrt{n+1} - \sqrt{n} \to 0$.

*Solution:* Rationalise:
$$\sqrt{n+1} - \sqrt{n} = \frac{(\sqrt{n+1} - \sqrt{n})(\sqrt{n+1} + \sqrt{n})}{\sqrt{n+1} + \sqrt{n}} = \frac{1}{\sqrt{n+1} + \sqrt{n}} \to 0. \blacksquare$$

---

**Example 5:** If $x_n \to L$ with $L > 0$, show $\sqrt{x_n} \to \sqrt{L}$.

*Solution:* For large $n$, $x_n > 0$. Using the identity:
$$|\sqrt{x_n} - \sqrt{L}| = \frac{|x_n - L|}{\sqrt{x_n} + \sqrt{L}} \leq \frac{|x_n - L|}{\sqrt{L}}.$$
Given $\varepsilon > 0$: $\exists N$ with $|x_n - L| < \varepsilon \sqrt{L}$ for $n \geq N$. Then $|\sqrt{x_n} - \sqrt{L}| < \varepsilon$. $\blacksquare$

---

## Practice Problems

1. Using the $\varepsilon$-$N$ definition directly, prove $\frac{2n+1}{n+1} \to 2$.

2. Compute the limits (if they exist):
   - (a) $\displaystyle\lim_{n\to\infty} \frac{n^3 + 2n}{2n^3 - n^2 + 1}$
   - (b) $\displaystyle\lim_{n\to\infty} n[\ln(n+1) - \ln n]$
   - (c) $\displaystyle\lim_{n\to\infty} (\sqrt{n^2 + n} - n)$

3. Show that $(1 + 1/n)^n \to e$ implies $(1 - 1/n)^n \to 1/e$.

4. If $x_n \to L$, show $\frac{x_1 + x_2 + \cdots + x_n}{n} \to L$ (**Cesàro mean**).

5. Prove: if $a_n \to 0$ and $(b_n)$ is bounded, then $a_n b_n \to 0$.

### Solutions

**1.** $\left|\frac{2n+1}{n+1} - 2\right| = \left|\frac{2n+1 - 2(n+1)}{n+1}\right| = \frac{1}{n+1}$. Given $\varepsilon > 0$, choose $N > 1/\varepsilon - 1$. Then for $n \geq N$: $1/(n+1) \leq 1/(N+1) < \varepsilon$. $\blacksquare$

**2(a).** Divide by $n^3$: $\frac{1 + 2/n^2}{2 - 1/n + 1/n^3} \to \frac{1}{2}$.

**2(b).** $n \ln\left(1 + \frac{1}{n}\right) = \ln\left(\left(1 + \frac{1}{n}\right)^n\right) \to \ln e = 1$.

**2(c).** Rationalise: $\sqrt{n^2+n} - n = \frac{n^2+n - n^2}{\sqrt{n^2+n}+n} = \frac{n}{\sqrt{n^2+n}+n} = \frac{1}{\sqrt{1+1/n}+1} \to \frac{1}{2}$.

**3.** $(1 - 1/n)^n = \left(\frac{n-1}{n}\right)^n = \frac{1}{(n/(n-1))^n} = \frac{1}{(1 + 1/(n-1))^n}$. And
$$\left(1 + \frac{1}{n-1}\right)^n = \left(1 + \frac{1}{n-1}\right)^{n-1} \cdot \left(1 + \frac{1}{n-1}\right) \to e \cdot 1 = e.$$
So $(1 - 1/n)^n \to 1/e$. $\blacksquare$

**4.** (Cesàro.) Given $\varepsilon > 0$. $\exists N_1$: $|x_n - L| < \varepsilon/2$ for $n \geq N_1$. Split the sum at $N_1$:
$$\left|\frac{x_1 + \cdots + x_n}{n} - L\right| = \left|\frac{(x_1 - L) + \cdots + (x_n - L)}{n}\right|$$
$$\leq \frac{|(x_1-L) + \cdots + (x_{N_1-1} - L)|}{n} + \frac{|(x_{N_1}-L) + \cdots + (x_n - L)|}{n}.$$
First term: fixed numerator, denominator $\to \infty$, so $< \varepsilon/2$ for $n \geq N_2$.
Second term: $\leq \frac{(n - N_1 + 1)(\varepsilon/2)}{n} \leq \varepsilon/2$.
For $n \geq \max(N_1, N_2)$: total $< \varepsilon$. $\blacksquare$

**5.** Let $|b_n| \leq M$. Given $\varepsilon > 0$: $\exists N$ with $|a_n| < \varepsilon/M$ for $n \geq N$. Then $|a_n b_n| \leq M \cdot \varepsilon/M = \varepsilon$. $\blacksquare$

---

## Related Topics
- [[08-sequences-introduction]] — bounded, monotonic setup
- [[10-cauchy-sequences-completeness]] — Cauchy criterion is an intrinsic convergence test
- [[13-series-convergence-tests]] — series convergence reduces to sequence convergence
- [[16-continuity]] — limits of sequences characterise continuity
- [[18-important-limits-infinite-limits]] — catalogue of key limits
