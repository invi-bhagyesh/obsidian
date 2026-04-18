# 15. Rearrangement of Series

For finite sums, addition is commutative: the order of the terms does not affect the sum. For infinite series, this is **spectacularly false** in general. A series of real numbers, rearranged, can:

- keep the same sum (if the series is absolutely convergent),
- sum to a completely different number,
- diverge to $+\infty$, $-\infty$, or oscillate with no limit.

This is one of the most striking phenomena in elementary analysis. It was first observed by **Dirichlet** (1837) and explained fully by **Riemann** (1854). The key dividing line is exactly the distinction from the previous lesson:

$$\text{absolute convergence} \ \Longrightarrow\ \text{rearrangement is safe.}$$
$$\text{conditional convergence} \ \Longrightarrow\ \text{rearrangement is dangerous.}$$

This lesson also introduces **double series** and the **Cauchy product**, whose convergence behaviour depends crucially on the same distinction.

---

## 15.1 What is a Rearrangement?

> **Definition 15.1 (Rearrangement).**
> Let $\sum_{n=1}^{\infty} a_n$ be an infinite series and let $\sigma : \mathbb{N} \to \mathbb{N}$ be a **bijection**. The series
> $\sum_{n=1}^{\infty} a_{\sigma(n)}$
> is called a **rearrangement** of $\sum a_n$.

> **Question.** If $\sum a_n = S$, does $\sum a_{\sigma(n)} = S$?

**Answer (preview):**
- **Yes**, if $\sum a_n$ converges absolutely.
- **No**, in general, if $\sum a_n$ converges only conditionally.

---

## 15.2 Absolute Convergence and Rearrangement

> **Theorem 15.2 (Dirichlet's rearrangement theorem).**
> If $\sum a_n$ converges absolutely with sum $S$, then every rearrangement $\sum a_{\sigma(n)}$ also converges absolutely to $S$.

*Proof.* Let $S_N = \sum_{n=1}^{N} a_n$ and $S'_N = \sum_{n=1}^{N} a_{\sigma(n)}$. Let $T_N = \sum_{n=1}^{N} |a_n|$, converging to $T = \sum |a_n|$.

**Step 1: Absolute convergence of the rearrangement.** For any $N$,
$$\sum_{n=1}^{N} |a_{\sigma(n)}| \leq T.$$
(The left side is the sum of $N$ of the values $|a_n|$ — which ones depends on $\sigma(1), \ldots, \sigma(N)$ — but all are bounded by the infinite sum.) So the partial sums of $\sum |a_{\sigma(n)}|$ are bounded, hence the series converges. Thus $\sum a_{\sigma(n)}$ converges absolutely.

**Step 2: The sums are equal.** Let $\varepsilon > 0$. Choose $M$ so that $\sum_{n > M} |a_n| < \varepsilon/2$ and $\left|S - S_M\right| < \varepsilon/2$.

Since $\sigma$ is a bijection, there exists $N_0$ such that the set $\{\sigma(1), \ldots, \sigma(N_0)\}$ contains $\{1, 2, \ldots, M\}$. For any $N \geq N_0$, the sum $S'_N$ contains every $a_1, \ldots, a_M$ plus some other $a_k$'s with $k > M$:
$$S'_N - S_M = \sum_{\substack{k \in \sigma(\{1,\ldots,N\}) \\ k > M}} a_k.$$
Therefore
$$|S'_N - S_M| \leq \sum_{k > M} |a_k| < \varepsilon/2.$$
Combining:
$$|S'_N - S| \leq |S'_N - S_M| + |S_M - S| < \varepsilon/2 + \varepsilon/2 = \varepsilon.$$

So $S'_N \to S$. $\blacksquare$

> **Corollary 15.3.** Absolutely convergent series are **unconditionally convergent**: the sum is independent of order.

---

## 15.3 Riemann's Rearrangement Theorem

For **conditionally** convergent series, the situation is as bad as possible:

> **Theorem 15.4 (Riemann's rearrangement theorem).**
> Let $\sum a_n$ be a conditionally convergent series of real numbers. For **any** $L \in [-\infty, +\infty]$, there exists a rearrangement $\sum a_{\sigma(n)}$ with sum $L$. Furthermore, there exists a rearrangement whose partial sums have no limit (oscillating).

*Proof sketch (target $L \in \mathbb{R}$).* Split the series into positive and negative parts:

$$p_n = \max(a_n, 0), \qquad q_n = \max(-a_n, 0).$$

So $a_n = p_n - q_n$ and $|a_n| = p_n + q_n$.

**Key observation.** Since $\sum a_n$ converges but $\sum |a_n|$ diverges:
- If both $\sum p_n$ and $\sum q_n$ converged, then $\sum |a_n| = \sum p_n + \sum q_n$ would converge — contradiction.
- If only one diverged, say $\sum p_n = \infty$ but $\sum q_n < \infty$, then $\sum a_n = \sum p_n - \sum q_n = \infty - \text{finite} = \infty$, contradicting convergence of $\sum a_n$.

So **both** $\sum p_n$ and $\sum q_n$ must diverge to $+\infty$. Also $p_n, q_n \to 0$ (as $a_n \to 0$).

**Construction.** Let $P_1, P_2, \ldots$ be the nonzero $p_n$'s in order; $Q_1, Q_2, \ldots$ the nonzero $q_n$'s in order. Both lists are unbounded-sum and term-by-term $\to 0$.

To rearrange so the sum is $L$: greedily alternate between adding positive terms until the running total first exceeds $L$, then subtracting negative terms until the running total first falls below $L$, then positive terms until it first exceeds $L$, etc.

This uses each $P_j$ and each $Q_k$ exactly once (both lists diverge to $+\infty$, so each "exceed $L$" or "fall below $L$" phase terminates). The running total oscillates around $L$, and at each switch it overshoots by at most one term; since $P_j, Q_k \to 0$, the overshoot $\to 0$, so the partial sums converge to $L$. $\blacksquare$

**Classical illustration — the alternating harmonic.** We know
$$\ln 2 = 1 - \tfrac{1}{2} + \tfrac{1}{3} - \tfrac{1}{4} + \tfrac{1}{5} - \tfrac{1}{6} + \cdots$$

Consider the rearrangement that takes **two** positive terms for every one negative:
$$1 + \tfrac{1}{3} - \tfrac{1}{2} + \tfrac{1}{5} + \tfrac{1}{7} - \tfrac{1}{4} + \tfrac{1}{9} + \tfrac{1}{11} - \tfrac{1}{6} + \cdots$$

Let $T_{3N}$ denote the $3N$-th partial sum. One can show
$$T_{3N} = \sum_{k=1}^{2N} \frac{1}{2k-1} - \sum_{k=1}^{N} \frac{1}{2k}.$$

Using $\sum_{k=1}^{M} 1/k = \ln M + \gamma + o(1)$ (Euler-Mascheroni), after algebra:
$$T_{3N} \to \ln 2 + \tfrac{1}{2}\ln 2 = \tfrac{3}{2}\ln 2.$$

So the rearranged series sums to $\tfrac{3}{2}\ln 2 \neq \ln 2$.

> **Moral.** For conditionally convergent series, "$\sum a_n = L$" is a statement about a **specific** ordering of terms.

---

## 15.4 Double Series

Often a series of the form $\sum_{i,j} a_{ij}$ appears, where $a_{ij}$ is doubly indexed. In what order should one sum?

Three natural orderings:
1. **Row sums:** $\sum_{i=1}^{\infty} \left( \sum_{j=1}^{\infty} a_{ij} \right)$
2. **Column sums:** $\sum_{j=1}^{\infty} \left( \sum_{i=1}^{\infty} a_{ij} \right)$
3. **Any one-dimensional enumeration:** pick a bijection $\phi : \mathbb{N} \to \mathbb{N}^2$ and compute $\sum_{k=1}^{\infty} a_{\phi(k)}$.

In general these can give **different** answers, even when each makes sense.

> **Theorem 15.5 (Fubini for double series — absolute case).**
> Suppose
> $\sum_{i=1}^{\infty} \sum_{j=1}^{\infty} |a_{ij}| < \infty.$
> Then all three orderings give the same (finite) sum:
> $\sum_{i} \sum_{j} a_{ij} = \sum_{j} \sum_{i} a_{ij} = \sum_{k} a_{\phi(k)}$
> for every bijection $\phi$.

*Proof idea.* The hypothesis says the double sum is absolutely convergent. Rearrangement-invariance (Dirichlet's theorem, extended to double indices) gives the result. A full proof uses monotone convergence on the non-negative $|a_{ij}|$ and then a dominated-convergence argument.

**Standard counterexample (non-absolute).** Let
$$a_{ij} = \begin{cases} +1 & i = j, \\ -1 & i = j+1, \\ 0 & \text{otherwise.} \end{cases}$$

Row sums: $\sum_j a_{ij}$ — for row $i$, only $j = i$ (contributes $+1$) and $j = i-1$ (contributes $-1$, if $i \geq 2$). So row 1 sums to $+1$, rows $i \geq 2$ sum to $0$. Total: $\sum_i (\text{row sum}) = 1$.

Column sums: $\sum_i a_{ij}$ — for column $j$, only $i = j$ ($+1$) and $i = j+1$ ($-1$). Each column sums to $0$. Total: $\sum_j 0 = 0$.

So row-then-column gives 1, column-then-row gives 0. Not equal.

---

## 15.5 Cauchy Product

Suppose $\sum a_n$ and $\sum b_n$ are two series. Their **Cauchy product** is the series $\sum c_n$ where
$$c_n = \sum_{k=0}^{n} a_k \, b_{n-k} = a_0 b_n + a_1 b_{n-1} + \cdots + a_n b_0.$$

This is the "natural" multiplication of power series: if $f(x) = \sum a_n x^n$ and $g(x) = \sum b_n x^n$, then formally $f(x) g(x) = \sum c_n x^n$ with $c_n$ as above.

> **Theorem 15.6 (Mertens' theorem).**
> If $\sum a_n$ converges absolutely to $A$ and $\sum b_n$ converges (at least conditionally) to $B$, then the Cauchy product $\sum c_n$ converges to $AB$.

*Proof sketch.* Let $A_N = \sum_{n=0}^{N} a_n$, $B_N = \sum_{n=0}^N b_n$, $C_N = \sum_{n=0}^N c_n$. Write $\beta_n = B_n - B$ (tail error). Then
$$C_N = \sum_{n=0}^{N} \sum_{k=0}^{n} a_k b_{n-k} = \sum_{k=0}^{N} a_k B_{N-k} = \sum_{k=0}^{N} a_k (B + \beta_{N-k}) = A_N B + \sum_{k=0}^{N} a_k \beta_{N-k}.$$
The first term $\to AB$. The second: $|\beta_{N-k}| \to 0$ and $\sum |a_k|$ converges, so by a dominated-convergence style argument the second term $\to 0$. Details — fix $\varepsilon$, split the sum at some threshold $M$: for $k \leq M$, $|\beta_{N-k}| \to 0$; for $k > M$, $\sum_{k > M} |a_k|$ is small. $\blacksquare$

> **Theorem 15.7 (Abel's theorem on Cauchy products).**
> If $\sum a_n = A$, $\sum b_n = B$, and $\sum c_n = C$ all converge, then $C = AB$. (The stronger result that $\sum c_n$ converges at all requires at least one of $\sum a_n, \sum b_n$ to converge absolutely, as in Mertens.)

**Counterexample without absolute convergence.** Take $a_n = b_n = (-1)^n / \sqrt{n+1}$. Both series converge (Leibniz), but the Cauchy product $c_n$ has terms
$$c_n = (-1)^n \sum_{k=0}^{n} \frac{1}{\sqrt{(k+1)(n-k+1)}}.$$
By AM-GM, $\sqrt{(k+1)(n-k+1)} \leq \frac{n+2}{2}$, so
$$|c_n| \geq \sum_{k=0}^{n} \frac{2}{n+2} = \frac{2(n+1)}{n+2} \to 2 \neq 0.$$
Since $c_n \not\to 0$, the Cauchy product **diverges**.

---

## 15.6 Worked Examples

**Example 1.** Show by direct computation that rearranging
$$\ln 2 = 1 - \tfrac{1}{2} + \tfrac{1}{3} - \tfrac{1}{4} + \cdots$$
by taking one positive, then one negative, then one negative:
$$1 - \tfrac{1}{2} - \tfrac{1}{4} + \tfrac{1}{3} - \tfrac{1}{6} - \tfrac{1}{8} + \tfrac{1}{5} - \tfrac{1}{10} - \tfrac{1}{12} + \cdots$$
gives $\tfrac{1}{2} \ln 2$.

*Solution:* Group the terms in triples. The $k$-th triple is
$$\frac{1}{2k-1} - \frac{1}{4k-2} - \frac{1}{4k} = \frac{1}{2k-1} - \frac{1}{2(2k-1)} - \frac{1}{4k} = \frac{1}{2(2k-1)} - \frac{1}{4k}.$$

Factor $1/2$:
$$\frac{1}{2}\left( \frac{1}{2k-1} - \frac{1}{2k} \right).$$

Summing over $k$:
$$\sum_{k=1}^{\infty} \frac{1}{2}\left( \frac{1}{2k-1} - \frac{1}{2k} \right) = \tfrac{1}{2} \ln 2.$$

So this particular rearrangement gives half the original sum, confirming the non-unconditional nature of conditionally convergent series.

---

**Example 2.** Compute the Cauchy product of $\sum_{n=0}^{\infty} \frac{x^n}{n!}$ with itself, and identify the resulting series.

*Solution:* Let $a_n = b_n = \dfrac{x^n}{n!}$. Then
$$c_n = \sum_{k=0}^{n} \frac{x^k}{k!} \cdot \frac{x^{n-k}}{(n-k)!} = x^n \sum_{k=0}^{n} \frac{1}{k!(n-k)!} = \frac{x^n}{n!} \sum_{k=0}^{n} \binom{n}{k} = \frac{x^n}{n!} \cdot 2^n = \frac{(2x)^n}{n!}.$$

So the Cauchy product is $\sum \frac{(2x)^n}{n!} = e^{2x}$, consistent with $e^x \cdot e^x = e^{2x}$.

> **Note.** $\sum x^n/n!$ converges absolutely for all $x$, so Mertens guarantees the product is $e^x \cdot e^x$.

---

**Example 3.** Verify that the double series
$$\sum_{i=1}^{\infty} \sum_{j=1}^{\infty} \frac{1}{i^2 j^2}$$
has the same value when iterated in either order. Compute this value.

*Solution:* Each factor is a $p$-series with $p = 2 > 1$, absolutely convergent. Since $a_{ij} = 1/(i^2 j^2) \geq 0$ and
$$\sum_{i,j} \frac{1}{i^2 j^2} = \left( \sum_i \frac{1}{i^2} \right)\left( \sum_j \frac{1}{j^2} \right) = \frac{\pi^2}{6} \cdot \frac{\pi^2}{6} = \frac{\pi^4}{36} < \infty,$$
Fubini-for-absolute-series applies: both iterated orders give $\pi^4/36$.

---

**Example 4.** Show that $\sum_{n=1}^{\infty} \frac{(-1)^{n+1}}{n^2}$ equals half of $\sum_{n=1}^{\infty} \frac{1}{n^2}$ plus an extra correction — or, use the identity to find the value.

*Solution:* We have
$$\sum_{n=1}^{\infty} \frac{1}{n^2} = \sum_{n \text{ odd}} \frac{1}{n^2} + \sum_{n \text{ even}} \frac{1}{n^2}.$$
For the even part, $\sum_{k=1}^{\infty} \frac{1}{(2k)^2} = \frac{1}{4} \sum_{k=1}^{\infty} \frac{1}{k^2}$. Let $S = \sum \frac{1}{n^2}$, $S_o = \sum_{n \text{ odd}} \frac{1}{n^2}$, $S_e = S/4$. Then $S = S_o + S/4$, so $S_o = \tfrac{3}{4} S$.

Now
$$\sum_{n=1}^{\infty} \frac{(-1)^{n+1}}{n^2} = S_o - S_e = \tfrac{3}{4}S - \tfrac{1}{4} S = \tfrac{1}{2} S = \frac{\pi^2}{12}.$$

This rearrangement (splitting by parity) is valid because $\sum \frac{1}{n^2}$ converges **absolutely**.

> Compare to the alternating harmonic: the same split-by-parity trick for $\sum (-1)^{n+1}/n$ would give $\tfrac{3}{4}\sum 1/n - \tfrac{1}{4}\sum 1/n = \tfrac{1}{2} \infty$, which is meaningless — precisely because that series is only conditionally convergent.

---

**Example 5.** Compute the Cauchy product of $\sum_{n=0}^{\infty} r^n$ (for $|r| < 1$) with itself.

*Solution:* $a_n = b_n = r^n$. Both converge absolutely to $\frac{1}{1-r}$. The Cauchy product:
$$c_n = \sum_{k=0}^{n} r^k \cdot r^{n-k} = (n+1) r^n.$$

So $\sum c_n = \sum (n+1) r^n$. By Mertens, this equals $\left(\frac{1}{1-r}\right)^2 = \frac{1}{(1-r)^2}$.

Verification: $\sum_{n=0}^{\infty} (n+1) r^n = \frac{d}{dr} \sum r^{n+1} = \frac{d}{dr} \frac{r}{1-r} = \frac{1}{(1-r)^2}$. ✓

---

## 15.7 Practice Problems

1. (Riemann rearrangement.) Describe a rearrangement of $\sum (-1)^{n+1}/n$ that sums to $2$ (no need for formulas; describe the algorithm).

2. Suppose $\sum a_n$ converges absolutely and $b_n = a_{\sigma(n)}$ for some bijection $\sigma$. Show that $\sum |a_n - b_n|$ may not be finite, but $\sum a_n = \sum b_n$ nevertheless.

3. Compute
$$\sum_{n=1}^{\infty} \sum_{m=1}^{\infty} \frac{1}{(m+n)!}$$
by changing the order of summation.

4. The Cauchy product of $\sum_{n=0}^{\infty} 1$ (diverges) with itself is not defined, but formally $c_n = n+1$. Is $\sum (n+1)$ summable by any generalised method?

5. Show: if $\sum a_n$ and $\sum b_n$ both converge absolutely, then their Cauchy product converges absolutely.

### Solutions

**1.** Split into positive terms $p_1, p_2, \ldots = 1, \tfrac{1}{3}, \tfrac{1}{5}, \ldots$ and negative terms $-q_1, -q_2, \ldots = -\tfrac{1}{2}, -\tfrac{1}{4}, \ldots$. Both $\sum p_k = \infty$ and $\sum q_k = \infty$, and $p_k, q_k \to 0$.

**Algorithm.** Maintain a running total $R$, starting at $R=0$.
- Add positive terms $p_1, p_2, \ldots$ in order until $R$ first exceeds $2$.
- Subtract negative terms $q_1, q_2, \ldots$ in order until $R$ first falls below $2$.
- Add next unused positive terms until $R$ first exceeds $2$.
- Continue.

Since $\sum p_k = \infty$, each "exceed $2$" phase terminates; since $\sum q_k = \infty$, each "fall below $2$" phase terminates. Since $p_k, q_k \to 0$, the overshoot at each switch $\to 0$. So $R \to 2$. The sequence of terms used is a rearrangement of the original (each $p_k$ and each $q_k$ is used exactly once).

---

**2.** Take $a_n = (-1)^{n+1}/n^2$ and $\sigma$ any nontrivial bijection. $\sum |a_n - b_n|$ depends on $\sigma$; for example, if $\sigma$ swaps adjacent terms $a_{2k-1} \leftrightarrow a_{2k}$ for infinitely many $k$, then $|a_{2k-1} - b_{2k-1}| = |a_{2k-1} - a_{2k}| = \frac{1}{(2k-1)^2} + \frac{1}{(2k)^2}$, and summing gives a comparable order — convergent in this case.

A cleaner example: let $a_n = 1/n^2$ with the bijection $\sigma$ that fixes all except moving $a_1$ to position 100 (and cycling positions 2–100). Then $|a_n - b_n| \neq 0$ only at 100 indices, hence the sum is trivially finite. But for pathological bijections with long-range cycles one can arrange any behaviour.

**Regardless**, by Theorem 15.2, $\sum a_n = \sum b_n$. The distinction is that $\sum (a_n - b_n)$ can be computed term by term using absolute convergence, but the termwise absolute difference $\sum |a_n - b_n|$ is a different (larger) quantity.

---

**3.** Swap order using Fubini (all terms $\geq 0$, absolute convergence):
$$\sum_{n=1}^{\infty} \sum_{m=1}^{\infty} \frac{1}{(m+n)!} = \sum_{k=2}^{\infty} \frac{\#\{(m,n) : m+n=k,\ m,n \geq 1\}}{k!} = \sum_{k=2}^{\infty} \frac{k-1}{k!}.$$

Evaluate:
$$\sum_{k=2}^{\infty} \frac{k-1}{k!} = \sum_{k=2}^{\infty} \frac{1}{(k-1)!} - \sum_{k=2}^{\infty} \frac{1}{k!} = \sum_{j=1}^{\infty} \frac{1}{j!} - \sum_{k=2}^{\infty} \frac{1}{k!}.$$

The first sum is $e - 1$. The second is $e - 1 - 1 = e - 2$. So the answer is
$$(e - 1) - (e - 2) = 1.$$

---

**4.** $\sum (n+1) = 1 + 2 + 3 + \cdots$ is the sum of positive integers. Its Cesàro and Abel sums also diverge. However, it can be assigned a value via **zeta regularization**: $\zeta(-1) = -1/12$. (This is not "real" summation — it's analytic continuation of $\zeta(s) = \sum n^{-s}$. This is **not** used in real analysis, but appears in physics and number theory.)

In standard real analysis: $\sum (n+1)$ **diverges** and no elementary summation method assigns it a finite value.

---

**5.** Let $A = \sum |a_n|$, $B = \sum |b_n|$. Then $|c_n| = \left| \sum_{k=0}^{n} a_k b_{n-k} \right| \leq \sum_{k=0}^{n} |a_k||b_{n-k}|$. Summing:
$$\sum_{n=0}^{N} |c_n| \leq \sum_{n=0}^{N} \sum_{k=0}^{n} |a_k||b_{n-k}|.$$

Re-index using $j = n - k$:
$$\sum_{n=0}^{N} \sum_{k=0}^{n} |a_k||b_{n-k}| = \sum_{\substack{k,j \geq 0 \\ k + j \leq N}} |a_k||b_j| \leq \left(\sum_{k=0}^{N} |a_k|\right)\left(\sum_{j=0}^{N} |b_j|\right) \leq A \cdot B.$$

So $\sum |c_n|$ has bounded partial sums, hence converges. $\blacksquare$

This shows that absolute convergence is **closed** under the Cauchy product (as one would hope).

---

## 15.8 Summary

> **Key distinctions.**
>
> | Property | Absolute | Conditional |
> |---------|---------|-------------|
> | Convergence preserved under rearrangement | ✓ | ✗ |
> | Sum depends on order | No | Yes (can be any value) |
> | Cauchy product well-behaved | ✓ | Generally ✗ |
> | Split by parity / group terms | ✓ | Dangerous |
> | Double sum Fubini-swappable | ✓ | Generally ✗ |

> **Big picture.** Conditional convergence is a **fragile** cancellation phenomenon. Absolute convergence gives every manipulation you expect from finite sums. In practice, whenever you need to rearrange, regroup, or multiply series, check absolute convergence first.

> **Historical note.** Dirichlet's original observation (1829) that $\sum (-1)^{n+1}/n$ can be rearranged to any sum was completed by **Riemann** (1854) into the theorem above. Cauchy earlier thought (1821) that rearrangement always preserved the sum — a natural mistake but wrong. This episode is one of the moments where **rigour in analysis** was forced upon mathematicians.

---

## Related Topics

- [[14-alternating-and-absolute-convergence]] — the absolute vs. conditional distinction this lesson builds on
- [[13-series-convergence-tests]] — positive-series tests used to verify absolute convergence
- [[12-infinite-series-introduction]] — foundations of series
- [[16-continuity]] — continuity of power series (which rely on absolute convergence within radius of convergence)
- [[10-cauchy-sequences-completeness]] — completeness underlies all these convergence statements
