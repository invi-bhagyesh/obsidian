# 10. Cauchy Sequences and Completeness of $\mathbb{R}$

---

## 10.1 Why Cauchy?

The $\varepsilon$-$N$ definition of convergence requires a candidate limit $L$ upfront: "$x_n \to L$ iff $|x_n - L| < \varepsilon$." But in many problems we don't know the limit in advance — think of $\sum 1/n^2$ or the recursion $x_{n+1} = \sqrt{2 + x_n}$. We need an **intrinsic** criterion: one that inspects the sequence itself, not any external limit.

The Cauchy criterion says: a sequence converges $\iff$ its terms get arbitrarily close *to each other*. In $\mathbb{R}$, this intrinsic condition is equivalent to convergence — a property known as **completeness**. This completeness is the same property that the LUB axiom encodes, viewed from a different angle.

---

## 10.2 Definition

> **Definition.** A sequence $(x_n)$ is a **Cauchy sequence** if
> $$\forall \varepsilon > 0,\ \exists N \in \mathbb{N}\ \text{such that}\ \forall m, n \geq N,\ |x_m - x_n| < \varepsilon.$$

Parse: eventually, *all pairs* of terms are within $\varepsilon$ of each other — not just adjacent pairs.

### Warning — adjacent-differences are not enough

$|x_{n+1} - x_n| < \varepsilon$ for large $n$ does **not** imply Cauchy. Counterexample: $x_n = \sum_{k=1}^n 1/k$ (partial harmonic sums). $|x_{n+1} - x_n| = 1/(n+1) \to 0$, but $(x_n)$ is not Cauchy — the tail sums are large. In fact the harmonic series diverges.

---

## 10.3 Convergent $\Rightarrow$ Cauchy

> **Theorem.** Every convergent sequence is Cauchy.

*Proof.* Suppose $x_n \to L$. Fix $\varepsilon > 0$. $\exists N$: $|x_n - L| < \varepsilon/2$ for $n \geq N$. For $m, n \geq N$:
$$|x_m - x_n| = |(x_m - L) - (x_n - L)| \leq |x_m - L| + |x_n - L| < \varepsilon/2 + \varepsilon/2 = \varepsilon. \blacksquare$$

---

## 10.4 Cauchy $\Rightarrow$ Bounded

> **Theorem.** Every Cauchy sequence is bounded.

*Proof.* Take $\varepsilon = 1$. $\exists N$: $|x_m - x_n| < 1$ for $m, n \geq N$. Fix $n = N$: $|x_m - x_N| < 1$, so $|x_m| < |x_N| + 1$ for $m \geq N$. Let $M = \max(|x_1|, \ldots, |x_{N-1}|, |x_N| + 1)$. Then $|x_n| \leq M$ for all $n$. $\blacksquare$

This is structurally identical to the argument "convergent $\Rightarrow$ bounded" in [[09-convergence-and-limits]].

---

## 10.5 Bolzano-Weierstrass Theorem

This is a linchpin of real analysis — both standalone and as the step that turns "Cauchy" into "convergent."

> **Theorem (Bolzano-Weierstrass, Sequence Version).** Every bounded sequence of real numbers has a convergent subsequence.

*Proof.* Let $(x_n)$ be bounded, $|x_n| \leq M$, so $x_n \in [-M, M]$ for all $n$. Bisect $[-M, M]$: at least one half, $I_1$, contains $x_n$ for infinitely many $n$. Pick $n_1$ with $x_{n_1} \in I_1$. Bisect $I_1$: one half $I_2$ contains $x_n$ for infinitely many $n > n_1$ (since infinitely many $x_n$ lie in $I_1$, and halving splits infinity as infinity+anything). Pick $n_2 > n_1$ with $x_{n_2} \in I_2$. Continue:
$$I_1 \supseteq I_2 \supseteq I_3 \supseteq \cdots,\quad |I_k| = 2M/2^k \to 0.$$

By Cantor's nested intervals (see [[07-compact-sets]] §7.8), $\bigcap_k I_k = \{L\}$ for some $L \in \mathbb{R}$.

The subsequence $(x_{n_k})$ has $x_{n_k} \in I_k$ and $L \in I_k$, so $|x_{n_k} - L| \leq |I_k| = 2M/2^k \to 0$. Hence $x_{n_k} \to L$. $\blacksquare$

**Alternative proof** using the monotonic-subsequence theorem ([[08-sequences-introduction]] §8.5) plus Monotone Convergence: every sequence has a monotonic subsequence; if bounded, it's bounded and converges.

### Set-version reminder

> **Theorem (Bolzano-Weierstrass, Set Version).** Every bounded infinite subset of $\mathbb{R}$ has a limit point in $\mathbb{R}$.

See [[07-compact-sets]] §7.7.

### Historical note

A handwritten proof sketch by Bernard Bolzano (1817) predates Weierstrass's lectures by decades. See `Bolzano.jpg` in [[../raw/]].

---

## 10.6 The Completeness Theorem: Cauchy $\Leftrightarrow$ Convergent in $\mathbb{R}$

> **Theorem (Cauchy Completeness of $\mathbb{R}$).** A sequence of real numbers is Cauchy $\iff$ it is convergent.

*Proof.* ($\Rightarrow$) §10.3.

($\Leftarrow$) Let $(x_n)$ be Cauchy. By §10.4 it is bounded. By Bolzano-Weierstrass, some subsequence $(x_{n_k})$ converges to some $L \in \mathbb{R}$. We claim the full sequence $x_n \to L$.

Fix $\varepsilon > 0$. Since $(x_n)$ is Cauchy, $\exists N_1$: $|x_m - x_n| < \varepsilon/2$ for $m, n \geq N_1$. Since $x_{n_k} \to L$, $\exists K$: $|x_{n_k} - L| < \varepsilon/2$ for $k \geq K$. Pick any $k$ with $k \geq K$ and $n_k \geq N_1$ (possible since $n_k \to \infty$). For $n \geq N_1$:
$$|x_n - L| \leq |x_n - x_{n_k}| + |x_{n_k} - L| < \varepsilon/2 + \varepsilon/2 = \varepsilon. \blacksquare$$

So in $\mathbb{R}$, "Cauchy" and "convergent" are the same. This is **not** true in $\mathbb{Q}$:

> **Example of incompleteness of $\mathbb{Q}$.** The sequence $1, 1.4, 1.41, 1.414, \ldots$ of decimal approximations to $\sqrt{2}$ is Cauchy (each term within $10^{-n}$ of the next), but has no limit in $\mathbb{Q}$ because $\sqrt{2} \notin \mathbb{Q}$.

Completeness is therefore the property that makes $\mathbb{R}$ big enough to close all Cauchy sequences — the metric analogue of the LUB axiom.

### Three equivalent statements of completeness of $\mathbb{R}$

All of the following are equivalent and can replace the LUB axiom:

1. **LUB property:** Every non-empty set bounded above has a supremum.
2. **Cauchy completeness:** Every Cauchy sequence converges.
3. **Monotone convergence:** Every bounded monotone sequence converges.
4. **Bolzano-Weierstrass:** Every bounded sequence has a convergent subsequence.
5. **Nested intervals:** Every nested sequence of non-empty closed bounded intervals has non-empty intersection.

---

## 10.7 Cauchy's Theorems on Limits

The Cauchy criterion gives elegant proofs of several classical limit facts.

### Cauchy's first theorem on limits

> **Theorem.** If $x_n \to L$, then $\dfrac{x_1 + x_2 + \cdots + x_n}{n} \to L$.

This is the **Cesàro mean** result, proved in [[09-convergence-and-limits]] Problem 4. Named after Cauchy in some traditions, Cesàro in others.

### Cauchy's second theorem on limits

> **Theorem.** If $x_n > 0$ and $x_{n+1}/x_n \to L$, then $x_n^{1/n} \to L$.

*Proof sketch.* Take logs: $\ln x_n^{1/n} = (1/n)\ln x_n$. By Cesàro applied to $\ln x_{n+1} - \ln x_n \to \ln L$:
$$\frac{1}{n}\ln x_n = \frac{1}{n}\sum_{k=1}^{n-1}(\ln x_{k+1} - \ln x_k) + \frac{\ln x_1}{n} \to \ln L + 0 = \ln L.$$
Exponentiate: $x_n^{1/n} \to L$. $\blacksquare$

**Application:** $x_n = n!$. Then $x_{n+1}/x_n = n+1 \to \infty$, so $(n!)^{1/n} \to \infty$. (Consistent with Stirling.)

### Cauchy's third theorem (Stolz-Cesàro)

> **Theorem (Stolz-Cesàro).** Let $(b_n)$ be strictly increasing and unbounded. If $\dfrac{a_{n+1} - a_n}{b_{n+1} - b_n} \to L$, then $\dfrac{a_n}{b_n} \to L$.

This is the **discrete L'Hospital**. Useful for sums over $n$ divided by $n$.

### Cauchy general principle

> **Cauchy's general principle of convergence.** A sequence converges $\iff$ it is Cauchy.

Exactly Theorem 10.6 restated — but this is how Cauchy originally phrased it, providing a test for convergence without needing to guess the limit.

---

## 10.8 Contractions and Banach Fixed-Point Principle

A useful corollary of completeness.

> **Definition.** $f : [a, b] \to [a, b]$ is a **contraction** if $\exists c \in [0, 1)$ with
> $$|f(x) - f(y)| \leq c|x - y|\quad \text{for all } x, y \in [a, b].$$

> **Theorem (Banach Fixed-Point, on $\mathbb{R}$).** Every contraction $f : [a, b] \to [a, b]$ has a unique fixed point $p \in [a, b]$. Moreover, any sequence $x_{n+1} = f(x_n)$ with $x_0 \in [a, b]$ converges to $p$.

*Proof sketch.* $|x_{n+1} - x_n| \leq c|x_n - x_{n-1}| \leq \cdots \leq c^n|x_1 - x_0|$. Summing geometrically, for $m < n$:
$$|x_n - x_m| \leq (c^m + c^{m+1} + \cdots + c^{n-1})|x_1 - x_0| \leq \frac{c^m}{1-c}|x_1 - x_0| \to 0.$$
So $(x_n)$ is Cauchy, hence converges to some $p \in [a, b]$ (closed; limit stays inside). Continuity of $f$ (follows from contraction) gives $p = f(p)$. Uniqueness: if $p, q$ are both fixed, $|p - q| = |f(p) - f(q)| \leq c|p - q|$, forcing $|p - q| = 0$. $\blacksquare$

This underlies Newton's method, Picard iteration for ODEs, and countless numerical algorithms.

---

## 10.9 Completeness in Pictures

$\mathbb{R}$ is the "completion" of $\mathbb{Q}$. Starting from $\mathbb{Q}$:
- every Cauchy sequence of rationals names a real (Cantor's construction of $\mathbb{R}$);
- every Dedekind cut of $\mathbb{Q}$ names a real (Dedekind's construction);

and both yield the same $\mathbb{R}$ — the unique complete ordered field (up to isomorphism).

Equivalently, the LUB axiom, Cauchy completeness, and nested-intervals are three lenses on the same fact: $\mathbb{R}$ has no "gaps."

---

## Worked Examples

**Example 1:** Show that $x_n = \sum_{k=1}^{n} 1/k^2$ is Cauchy, hence converges.

*Solution:* For $m > n$:
$$|x_m - x_n| = \sum_{k=n+1}^{m} \frac{1}{k^2} < \sum_{k=n+1}^{m} \frac{1}{k(k-1)} = \sum_{k=n+1}^{m}\left(\frac{1}{k-1} - \frac{1}{k}\right) = \frac{1}{n} - \frac{1}{m} < \frac{1}{n}.$$
Given $\varepsilon > 0$, choose $N > 1/\varepsilon$. Then $|x_m - x_n| < 1/n \leq 1/N < \varepsilon$ for $m, n \geq N$. Cauchy. $\blacksquare$

---

**Example 2:** Show $x_n = \sum_{k=1}^{n}\frac{(-1)^{k+1}}{k}$ is Cauchy.

*Solution:* For $m > n$:
$$|x_m - x_n| = \left|\sum_{k=n+1}^{m}\frac{(-1)^{k+1}}{k}\right| \leq \frac{1}{n+1}$$
(alternating series tail bound). Given $\varepsilon > 0$, $N > 1/\varepsilon - 1$: $|x_m - x_n| \leq 1/(n+1) < \varepsilon$. Cauchy. $\blacksquare$

(Limit is $\ln 2$.)

---

**Example 3:** Show that $x_n = 1 + 1/2 + \cdots + 1/n$ is **not** Cauchy.

*Solution:* For $n$ arbitrary, $|x_{2n} - x_n| = \sum_{k=n+1}^{2n} 1/k \geq \sum_{k=n+1}^{2n} 1/(2n) = n \cdot 1/(2n) = 1/2$. So for $\varepsilon = 1/2$, we cannot find $N$. Not Cauchy, hence harmonic series diverges. $\blacksquare$

---

**Example 4:** Apply Banach's principle: show $f(x) = (x + 3/x)/2$ is a contraction on $[1, 2]$, find its fixed point.

*Solution:* For $x, y \in [1, 2]$:
$$f(x) - f(y) = \frac{1}{2}(x - y) + \frac{3}{2}\left(\frac{1}{x} - \frac{1}{y}\right) = \frac{1}{2}(x-y)\left(1 - \frac{3}{xy}\right).$$
For $x, y \in [1, 2]$: $xy \in [1, 4]$, so $3/(xy) \in [3/4, 3]$, giving $|1 - 3/(xy)| \leq 2$. Hmm — actually $|1 - 3/(xy)| \leq |3/(xy) - 1| \leq \max(|3/1 - 1|, |3/4 - 1|) = 2$. So $|f(x) - f(y)| \leq (1/2) \cdot 2 \cdot |x - y| = |x - y|$ — not a strict contraction on $[1, 2]$.

Restrict to $[1.5, 2]$: $xy \geq 2.25$, $3/(xy) \leq 4/3$, $|1 - 3/(xy)| \leq 1/2$. Then $|f(x) - f(y)| \leq (1/2)(1/2)|x-y| = (1/4)|x-y|$, contracting with $c = 1/4$. Fixed point: $x = (x + 3/x)/2 \Rightarrow x^2 = 3 \Rightarrow x = \sqrt{3}$.

---

**Example 5:** Give a direct proof that $x_n = \sqrt{n+1} - \sqrt{n}$ is Cauchy (without computing the limit).

*Solution:* $|x_n - x_m|$? We computed $x_n = 1/(\sqrt{n+1} + \sqrt{n}) < 1/(2\sqrt{n})$. For $m > n$:
$$|x_n - x_m| \leq |x_n| + |x_m| \leq 1/(2\sqrt{n}) + 1/(2\sqrt{m}) \leq 1/\sqrt{n}.$$
Given $\varepsilon > 0$, $N > 1/\varepsilon^2$: $|x_n - x_m| < \varepsilon$ for $n \geq N$. Cauchy. $\blacksquare$

Actually $x_n \to 0$, so we're showing convergence by showing it's Cauchy (equivalent to showing $x_n \to 0$ directly in this case).

---

## Practice Problems

1. Prove that $x_n = \sum_{k=1}^n 1/k!$ is Cauchy.

2. Let $(a_n)$ be Cauchy. Show that $(a_n^2)$ is Cauchy.

3. Construct a sequence $(x_n)$ of rationals that is Cauchy in $\mathbb{Q}$ but has no rational limit.

4. Prove: $(x_n)$ is Cauchy $\iff$ every subsequence of $(x_n)$ is Cauchy.

5. Let $f : \mathbb{R} \to \mathbb{R}$ satisfy $|f(x) - f(y)| \leq r|x - y|$ with $0 < r < 1$. Show that for any $x_0 \in \mathbb{R}$, the iterates $x_{n+1} = f(x_n)$ converge to the unique fixed point of $f$.

### Solutions

**1.** For $m > n$:
$$|x_m - x_n| = \sum_{k=n+1}^{m} \frac{1}{k!} < \sum_{k=n+1}^{m} \frac{1}{2^{k-1}} < \frac{1}{2^{n-1}}$$
(using $k! \geq 2^{k-1}$). Given $\varepsilon > 0$, pick $N$ with $1/2^{N-1} < \varepsilon$. Cauchy. $\blacksquare$

**2.** $(a_n)$ Cauchy $\Rightarrow$ bounded: $|a_n| \leq M$. For $m, n$ large:
$$|a_m^2 - a_n^2| = |a_m + a_n| \cdot |a_m - a_n| \leq 2M|a_m - a_n|.$$
Given $\varepsilon > 0$, pick $N$ so that $|a_m - a_n| < \varepsilon/(2M)$ for $m, n \geq N$. Then $|a_m^2 - a_n^2| < \varepsilon$. $\blacksquare$

**3.** Take $x_1 = 1, x_2 = 1.4, x_3 = 1.41, x_4 = 1.414, \ldots$ (decimal expansion of $\sqrt{2}$ truncated at the $n$-th decimal). All $x_n \in \mathbb{Q}$. For $m > n$: $|x_m - x_n| \leq 10^{-n}$, so Cauchy. Limit would be $\sqrt{2} \notin \mathbb{Q}$. So no rational limit exists. $\blacksquare$

**4.** ($\Rightarrow$) Let $(x_n)$ be Cauchy, $(x_{n_k})$ a subsequence. Given $\varepsilon > 0$, $\exists N$: $|x_m - x_n| < \varepsilon$ for $m, n \geq N$. For $k, l \geq N$: $n_k, n_l \geq N$, so $|x_{n_k} - x_{n_l}| < \varepsilon$. Cauchy.

($\Leftarrow$) The full sequence is a subsequence of itself. $\blacksquare$

**5.** $|x_{n+1} - x_n| = |f(x_n) - f(x_{n-1})| \leq r|x_n - x_{n-1}| \leq \cdots \leq r^n|x_1 - x_0|$. For $m < n$:
$$|x_n - x_m| \leq |x_n - x_{n-1}| + \cdots + |x_{m+1} - x_m| \leq (r^{m} + \cdots + r^{n-1})|x_1 - x_0| \leq \frac{r^m}{1-r}|x_1 - x_0| \to 0.$$
So $(x_n)$ Cauchy, converges to some $p$. Since $f$ is continuous (Lipschitz $\Rightarrow$ continuous), $p = \lim x_{n+1} = \lim f(x_n) = f(p)$.

Uniqueness: if $f(p) = p$, $f(q) = q$, then $|p - q| = |f(p)-f(q)| \leq r|p-q|$; for $r < 1$ this forces $|p-q| = 0$. $\blacksquare$

---

## Related Topics
- [[01-real-number-system]] — ordered field background
- [[03-supremum-and-infimum]] — LUB is equivalent to Cauchy completeness
- [[07-compact-sets]] — Bolzano-Weierstrass set version; nested intervals
- [[08-sequences-introduction]] — monotonic subsequence lemma
- [[09-convergence-and-limits]] — $\varepsilon$-$N$ definition; Cesàro mean
- [[13-series-convergence-tests]] — Cauchy criterion for series
