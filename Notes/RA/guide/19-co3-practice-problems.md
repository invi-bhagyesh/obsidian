---
title: "CO3 Practice Problems — Series, Continuity, Limits of Functions"
type: guide
co: CO3
related: [12-infinite-series-introduction, 13-series-convergence-tests, 14-alternating-and-absolute-convergence, 15-rearrangement-of-series, 16-continuity, 17-types-of-discontinuity-monotonic, 18-important-limits-infinite-limits, 20-ivt-and-connectedness]
---

# 19. CO3 Practice Problems — Series, Continuity, Limits of Functions

These problems cover CO3 (Lessons 12–20), specifically:

- **Infinite series**: convergence tests (ratio, root, integral, comparison), absolute vs. conditional convergence.
- **Rearrangements and Cauchy products** of series.
- **Limits of functions** — $\varepsilon$–$\delta$ formulation, Heine's criterion.
- **Continuity** — $\varepsilon$–$\delta$, types of discontinuities, monotonic functions.
- **IVT, EVT, uniform continuity** (Heine–Cantor).

Problems are at the qualifying-exam level: each solution develops the full $\varepsilon$–$\delta$ or inequality manipulation, with numbered steps, sanity checks, and interpretive remarks.

---

## Part A — Series Convergence Tests

### Problem A1

Determine convergence: $\displaystyle \sum_{n=1}^{\infty} \dfrac{n^2}{3^n}$.

**Solution.** We use the **ratio test**.

**Setup.** Let $a_n = n^2 / 3^n$. Since $a_n > 0$ for all $n \geq 1$, absolute values are superfluous; we compute $L := \lim_{n \to \infty} a_{n+1}/a_n$.

**Step 1 — Form the ratio.**
$$\frac{a_{n+1}}{a_n} = \frac{(n+1)^2}{3^{n+1}} \cdot \frac{3^n}{n^2} = \frac{(n+1)^2}{3 n^2} = \frac{1}{3}\left(1 + \frac{1}{n}\right)^2.$$

**Step 2 — Pass to the limit.** As $n \to \infty$, $(1 + 1/n)^2 \to 1$, so
$$L = \lim_{n \to \infty} \frac{a_{n+1}}{a_n} = \frac{1}{3} \cdot 1 = \frac{1}{3} < 1.$$

**Step 3 — Apply the ratio test.** Since $L < 1$, the series converges absolutely (hence converges).

**Sanity check.** The polynomial $n^2$ is dominated by the exponential $3^n$. For large $n$, $a_n \sim n^2 / 3^n$ decays geometrically, so convergence is geometric-fast. Numerically, $a_{10} = 100/59049 \approx 1.7 \times 10^{-3}$, confirming rapid decay.

**Interpretive remark.** For any $r > 1$ and any polynomial $p(n)$, the series $\sum p(n)/r^n$ converges by the same ratio computation — exponential growth always dominates polynomial growth.

$\blacksquare$

([[13-series-convergence-tests]])

---

### Problem A2

Determine convergence: $\displaystyle \sum_{n=2}^{\infty} \dfrac{1}{n(\ln n)^2}$.

**Solution.** We use the **integral test**.

**Setup.** Define $f(x) = 1/[x (\ln x)^2]$ for $x \geq 2$.

**Step 1 — Verify the hypotheses of the integral test.**
- *Positivity.* $x > 0$ and $(\ln x)^2 > 0$ for $x \geq 2$ (since $\ln 2 > 0$). So $f(x) > 0$.
- *Monotone decreasing.* Compute $f'(x)$ or observe that both $x$ and $(\ln x)^2$ are increasing on $[2, \infty)$, so their product is increasing and its reciprocal $f(x)$ is decreasing.
- *Continuous.* $f$ is a composition/product of continuous functions on $[2, \infty)$.

The integral test applies: $\sum_{n=2}^\infty f(n)$ converges iff $\int_2^\infty f(x)\, dx$ converges.

**Step 2 — Evaluate the improper integral.** Substitute $u = \ln x$, so $du = dx/x$:
$$\int_2^\infty \frac{dx}{x (\ln x)^2} = \int_{\ln 2}^{\infty} \frac{du}{u^2}.$$

The latter is a standard $p$-integral with $p = 2 > 1$:
$$\int_{\ln 2}^{\infty} \frac{du}{u^2} = \left[-\frac{1}{u}\right]_{\ln 2}^{\infty} = 0 - \left(-\frac{1}{\ln 2}\right) = \frac{1}{\ln 2}.$$

**Step 3 — Conclude.** The integral is finite, so the series converges.

**Sanity check.** $1/\ln 2 \approx 1.443$. This is the value of the improper integral, not the sum itself; but it shows the series' tail is $O(1/\ln N)$ as $N \to \infty$ (since $\int_N^\infty f = 1/\ln N$).

**Interpretive remark.** This is the borderline example. The series $\sum 1/[n (\ln n)^p]$ converges iff $p > 1$ (integral test: $\int du/u^p$ converges iff $p > 1$). Slightly "smaller" denominators like $n \ln n$ already diverge.

$\blacksquare$

([[13-series-convergence-tests]])

---

### Problem A3

For which $p \in \mathbb{R}$ does $\displaystyle \sum_{n=2}^{\infty} \dfrac{1}{n^p \ln n}$ converge?

**Solution.** We analyse three cases via comparison / integral tests.

**Case 1: $p > 1$.** Choose any $q$ with $1 < q < p$. For $n \geq 2$, $\ln n \geq \ln 2 > 0$, so
$$\frac{1}{n^p \ln n} \leq \frac{1}{(\ln 2) \cdot n^p}.$$

But this is still a $p$-series bound; to do better, note $\ln n \to \infty$ and so for $n$ large enough, $\ln n \geq 1$, giving $\frac{1}{n^p \ln n} \leq \frac{1}{n^p}$. Since $\sum 1/n^p$ converges ($p$-test, $p > 1$), by direct comparison $\sum 1/(n^p \ln n)$ converges.

More cleanly: for all $n \geq 3$, $\ln n \geq 1$ so $1/(n^p \ln n) \leq 1/n^p$, and $\sum 1/n^p$ converges. Add the finitely many terms $n = 2$ separately; the total still converges.

**Case 2: $p = 1$.** This is $\sum 1/(n \ln n)$. Apply the integral test with $f(x) = 1/(x \ln x)$ on $[2, \infty)$:
- $f > 0$, continuous, decreasing (since $x \ln x$ is increasing).
- Substitute $u = \ln x$, $du = dx/x$:
$$\int_2^\infty \frac{dx}{x \ln x} = \int_{\ln 2}^\infty \frac{du}{u} = \lim_{M \to \infty} [\ln u]_{\ln 2}^M = \lim_{M \to \infty} (\ln M - \ln \ln 2) = +\infty.$$

So the integral diverges, hence the series diverges.

**Case 3: $p < 1$.** We show divergence by comparison. For any $p < 1$, choose $q$ with $p < q < 1$.

*Claim.* For sufficiently large $n$, $n^p \ln n < n^q$.

*Proof of claim.* Equivalent to $\ln n < n^{q - p}$, where $q - p > 0$. This holds for all $n$ large: $\ln n$ grows slower than any positive power. Formally, $\lim_{n \to \infty} \ln n / n^{q-p} = 0$ (L'Hôpital or known limit).

So for $n \geq N_0$, $1/(n^p \ln n) > 1/n^q$. Since $\sum 1/n^q$ diverges ($q < 1$), the comparison test gives divergence of $\sum 1/(n^p \ln n)$.

**Conclusion.**
$$\sum_{n=2}^{\infty} \frac{1}{n^p \ln n} \text{ converges iff } p > 1.$$

**Interpretive remark.** Compare with $\sum 1/n^p$, which converges iff $p > 1$. The extra factor $\ln n$ in the denominator does *not* change the threshold for convergence, only the rate at the border ($p = 1$). Logarithmic factors are "second-order" effects: they refine the convergence behaviour near $p = 1$ but don't shift the threshold.

$\blacksquare$

([[13-series-convergence-tests]])

---

### Problem A4

Test: $\displaystyle \sum_{n=1}^{\infty} \left(\sqrt{n+1} - \sqrt{n}\right)$.

**Solution.** Two approaches.

**Approach 1: Telescoping.** The $N$-th partial sum is
$$S_N = \sum_{n=1}^{N} (\sqrt{n+1} - \sqrt{n}) = (\sqrt{2} - \sqrt{1}) + (\sqrt{3} - \sqrt{2}) + \cdots + (\sqrt{N+1} - \sqrt{N}).$$

All intermediate terms cancel, leaving
$$S_N = \sqrt{N+1} - 1.$$

As $N \to \infty$, $\sqrt{N+1} \to \infty$, so $S_N \to \infty$. The series **diverges**.

**Approach 2: Asymptotic / comparison.** Rationalise:
$$\sqrt{n+1} - \sqrt{n} = \frac{(\sqrt{n+1} - \sqrt{n})(\sqrt{n+1} + \sqrt{n})}{\sqrt{n+1} + \sqrt{n}} = \frac{(n+1) - n}{\sqrt{n+1} + \sqrt{n}} = \frac{1}{\sqrt{n+1} + \sqrt{n}}.$$

For $n \geq 1$, $\sqrt{n+1} + \sqrt{n} \leq 2\sqrt{n+1} \leq 2\sqrt{2n} = 2\sqrt{2}\sqrt{n}$, so
$$\sqrt{n+1} - \sqrt{n} \geq \frac{1}{2\sqrt{2}} \cdot \frac{1}{\sqrt{n}}.$$

Since $\sum 1/\sqrt{n}$ is a $p$-series with $p = 1/2 \leq 1$, it diverges. By direct comparison, so does our series.

**Sanity check.** Both approaches agree: divergence. The first gives the explicit partial-sum formula $S_N = \sqrt{N+1} - 1 \sim \sqrt{N}$, so $S_N$ diverges at rate $\sqrt{N}$. The second approach reveals the comparison with $1/\sqrt{n}$, which is the honest asymptotic.

**Interpretive remark.** This example shows that **$a_n \to 0$ is necessary but not sufficient for convergence**: here $a_n = \sqrt{n+1} - \sqrt{n} \to 0$, but the sum still diverges. The rate of decay ($\sim 1/\sqrt{n}$) is too slow.

$\blacksquare$

([[12-infinite-series-introduction]])

---

### Problem A5

Test absolute / conditional convergence: $\displaystyle \sum_{n=1}^{\infty} \dfrac{(-1)^{n+1}}{\sqrt{n}}$.

**Solution.**

**Step 1 — Test absolute convergence.** The series of absolute values is
$$\sum_{n=1}^{\infty} \left| \frac{(-1)^{n+1}}{\sqrt{n}} \right| = \sum_{n=1}^\infty \frac{1}{\sqrt{n}},$$
a $p$-series with $p = 1/2 < 1$. This diverges.

So the original series is **not absolutely convergent**.

**Step 2 — Test convergence via Leibniz (alternating series test).** Write $a_n = 1/\sqrt{n}$. The series is $\sum_{n=1}^\infty (-1)^{n+1} a_n$ with:

- *Positivity.* $a_n > 0$ for $n \geq 1$ ✓.
- *Monotone decreasing.* $\sqrt{n+1} > \sqrt{n}$, so $1/\sqrt{n+1} < 1/\sqrt{n}$, i.e., $a_{n+1} < a_n$ ✓.
- *Limit zero.* $a_n = 1/\sqrt{n} \to 0$ as $n \to \infty$ ✓.

By the **Leibniz criterion**, the series converges.

**Step 3 — Conclude.** The series converges but not absolutely; it is **conditionally convergent**.

**Sanity check (tail bound).** By Leibniz, the error in truncating at the $N$-th partial sum is bounded by the next term:
$$\left| S - S_N \right| \leq a_{N+1} = \frac{1}{\sqrt{N+1}}.$$

This bound is tight: e.g., for $N = 100$, the tail is at most $\approx 0.0995$.

**Interpretive remark.** Conditional convergence is fragile: the Riemann rearrangement theorem says we can rearrange the terms of a conditionally convergent series to converge to any real number, or to diverge (see B3). Absolute convergence, by contrast, is rearrangement-invariant.

$\blacksquare$

([[14-alternating-and-absolute-convergence]])

---

### Problem A6

Discuss convergence of $\displaystyle \sum_{n=1}^{\infty} \dfrac{n!}{n^n}$.

**Solution.** We apply the **ratio test**.

**Setup.** Let $a_n = n! / n^n > 0$.

**Step 1 — Form the ratio.**
$$\frac{a_{n+1}}{a_n} = \frac{(n+1)!}{(n+1)^{n+1}} \cdot \frac{n^n}{n!}.$$

Simplify $(n+1)!/n! = n+1$:
$$\frac{a_{n+1}}{a_n} = \frac{(n+1) \cdot n^n}{(n+1)^{n+1}} = \frac{n^n}{(n+1)^n} = \left(\frac{n}{n+1}\right)^n = \left(1 + \frac{1}{n}\right)^{-n}.$$

**Step 2 — Evaluate the limit.** Using the definition $\lim_{n\to\infty} (1 + 1/n)^n = e$:
$$L = \lim_{n \to \infty} \left(1 + \frac{1}{n}\right)^{-n} = \frac{1}{e} \approx 0.368 < 1.$$

**Step 3 — Apply the ratio test.** Since $L = 1/e < 1$, the series converges.

**Sanity check (Stirling).** By Stirling's formula, $n! \sim \sqrt{2\pi n} \, (n/e)^n$, so
$$a_n = \frac{n!}{n^n} \sim \sqrt{2\pi n} \cdot \frac{1}{e^n} \to 0$$
exponentially, confirming convergence is geometric-fast (with ratio $1/e$ in the limit).

**Interpretive remark.** The limit $1/e$ is sharp: $\sum n!/n^n$ converges, whereas a slight perturbation $\sum (n!)^{1+\varepsilon}/n^n$ or similar may diverge. This problem is a classic illustration of why the limit $\lim (1+1/n)^n = e$ matters in series analysis.

$\blacksquare$

([[13-series-convergence-tests]])

---

## Part B — Rearrangements and Products

### Problem B1

Prove that the **Cauchy product** of two absolutely convergent series is absolutely convergent.

**Solution.**

**Setup.** Let $\sum a_n$ and $\sum b_n$ be two absolutely convergent series: $A := \sum_{n=0}^\infty |a_n| < \infty$, $B := \sum_{n=0}^\infty |b_n| < \infty$. The Cauchy product is $\sum c_n$ with
$$c_n := \sum_{k=0}^{n} a_k b_{n-k}.$$

**Goal.** Show $\sum |c_n| < \infty$.

**Step 1 — Triangle inequality on $c_n$.**
$$|c_n| = \left| \sum_{k=0}^n a_k b_{n-k} \right| \leq \sum_{k=0}^n |a_k| \cdot |b_{n-k}|.$$

**Step 2 — Bound partial sums of $|c_n|$.** For any $N \geq 0$,
$$\sum_{n=0}^N |c_n| \leq \sum_{n=0}^N \sum_{k=0}^n |a_k| |b_{n-k}|.$$

The right-hand side is a double sum over pairs $(k, n-k) = (i, j)$ with $i + j = n$, $0 \leq n \leq N$. Reindexing $i = k$, $j = n - k$: we sum over $(i, j) \in \mathbb{Z}_{\geq 0}^2$ with $i + j \leq N$:
$$\sum_{n=0}^N \sum_{k=0}^n |a_k| |b_{n-k}| = \sum_{\substack{i, j \geq 0 \\ i + j \leq N}} |a_i| |b_j|.$$

**Step 3 — Majorise by the full double sum.** The constraint $i + j \leq N$ is implied by $0 \leq i \leq N$ and $0 \leq j \leq N$ (and is strictly weaker), so
$$\sum_{\substack{i, j \geq 0 \\ i + j \leq N}} |a_i| |b_j| \leq \sum_{i=0}^{N} \sum_{j=0}^N |a_i| |b_j| = \left(\sum_{i=0}^N |a_i|\right)\left(\sum_{j=0}^N |b_j|\right) \leq AB.$$

**Step 4 — Conclude.** The partial sums $\sum_{n=0}^N |c_n|$ are monotone increasing (each term non-negative) and bounded above by $AB$. By the monotone convergence theorem for series, $\sum_{n=0}^\infty |c_n| \leq AB < \infty$.

Hence $\sum c_n$ is absolutely convergent.

**Interpretive remark.** This proof uses only the non-negativity of $|a_i| |b_j|$ and Tonelli-style reindexing. A stronger theorem (Mertens / Cauchy): under absolute convergence,
$$\sum_{n=0}^\infty c_n = \left(\sum_{n=0}^\infty a_n\right) \left(\sum_{n=0}^\infty b_n\right).$$

The "value" of the product equals the product of values, not just the absolute-convergence claim.

$\blacksquare$

([[15-rearrangement-of-series]])

---

### Problem B2

Prove $\displaystyle \sum_{n=1}^{\infty} \dfrac{1}{n^2}$ converges, and bound the sum.

**Solution.** This is the **Basel problem**; Euler proved $\sum 1/n^2 = \pi^2/6$. Here we focus on the convergence and a clean upper bound.

**Step 1 — Elementary convergence via telescoping bound.** For $n \geq 2$,
$$\frac{1}{n^2} < \frac{1}{n(n-1)} = \frac{1}{n-1} - \frac{1}{n}.$$

(To verify: $n(n-1) = n^2 - n < n^2$, so $1/n^2 < 1/[n(n-1)]$ for $n \geq 2$.)

**Step 2 — Telescope.** Summing from $n = 2$ to $N$:
$$\sum_{n=2}^N \frac{1}{n^2} < \sum_{n=2}^N \left(\frac{1}{n-1} - \frac{1}{n}\right) = 1 - \frac{1}{N}.$$

Adding the $n = 1$ term:
$$\sum_{n=1}^N \frac{1}{n^2} < 1 + \left(1 - \frac{1}{N}\right) = 2 - \frac{1}{N} < 2.$$

**Step 3 — Conclude convergence.** Partial sums are monotone increasing and bounded above by $2$, so the series converges; let $S = \sum 1/n^2$. We've shown $S \leq 2$.

**Step 4 — Exact value (Euler).** The exact value is
$$\sum_{n=1}^\infty \frac{1}{n^2} = \frac{\pi^2}{6} \approx 1.6449.$$

This can be proved via Fourier series (expanding $x^2$ on $[-\pi, \pi]$), via the infinite-product formula for $\sin x$, or via complex-analytic contour integrals. The proof is not elementary; for this course, we accept it as a known value.

**Sanity check.** $\pi^2/6 \approx 1.6449 < 2$ ✓ (consistent with our upper bound).

**Interpretive remark.** The Basel problem launched much of 18th-century analytic number theory. Its generalisation $\zeta(s) = \sum 1/n^s$ is the Riemann zeta function, central to modern analytic number theory. For even $s$, closed-form values exist; for odd $s$, only $\zeta(3)$ (Apéry's constant) is known to be irrational, and even this is non-trivial.

$\blacksquare$

---

### Problem B3

Show via rearrangement that the alternating harmonic series $\sum_{n=1}^\infty (-1)^{n+1}/n$ has a rearrangement summing to $\frac{3}{2} \ln 2$.

**Solution.**

**Background.** The alternating harmonic series $\sum (-1)^{n+1}/n$ converges conditionally to $\ln 2$ (Leibniz + standard identity). By the **Riemann rearrangement theorem**, any conditionally convergent real series can be rearranged to sum to any prescribed value, or to diverge. We construct the specific rearrangement converging to $\frac{3}{2}\ln 2$.

**Construction.** Rearrange in blocks "two positives then one negative":
$$1 + \frac{1}{3} - \frac{1}{2} + \frac{1}{5} + \frac{1}{7} - \frac{1}{4} + \frac{1}{9} + \frac{1}{11} - \frac{1}{6} + \cdots$$

The $k$-th block (for $k \geq 1$) is
$$B_k := \frac{1}{4k - 3} + \frac{1}{4k - 1} - \frac{1}{2k}.$$

Check: for $k = 1$, $B_1 = 1 + 1/3 - 1/2$ ✓. For $k = 2$, $B_2 = 1/5 + 1/7 - 1/4$ ✓.

**Step 1 — Partial sum after $K$ blocks.** Let $T_K = \sum_{k=1}^K B_k$.

$$T_K = \sum_{k=1}^K \left( \frac{1}{4k-3} + \frac{1}{4k-1}\right) - \sum_{k=1}^K \frac{1}{2k}.$$

The first sum collects odd-denominator terms $1, 1/3, 1/5, 1/7, \ldots, 1/(4K - 3), 1/(4K - 1)$, i.e., the odd reciprocals up to $1/(4K-1)$. There are $2K$ such terms.

**Step 2 — Relate to partial sums of the original series.** Let $H_N := \sum_{n=1}^N 1/n$ (harmonic) and recall that $H_N = \ln N + \gamma + o(1)$ (Euler–Mascheroni).

The *odd* reciprocals up to $1/(2m-1)$ sum to
$$\sum_{j=1}^m \frac{1}{2j-1} = H_{2m-1} - \frac{1}{2} H_{m-1} = H_{2m} - \frac{1}{2} H_m + O(1/m),$$
wait — more cleanly: $\sum_{j=1}^m 1/(2j-1) = H_{2m} - \frac{1}{2}H_m$ is not quite right either. Let's use the identity
$$\sum_{j=1}^m \frac{1}{2j - 1} = H_{2m} - \frac{1}{2}H_m.$$

*Derivation.* $H_{2m} = \sum_{n=1}^{2m} 1/n = \sum_{\text{odd } n \leq 2m} 1/n + \sum_{\text{even } n \leq 2m} 1/n = \sum_{j=1}^m 1/(2j-1) + \sum_{j=1}^m 1/(2j)$, and the even sum is $\frac{1}{2}\sum_{j=1}^m 1/j = \frac{1}{2} H_m$. So $\sum 1/(2j-1) = H_{2m} - \frac{1}{2} H_m$ ✓.

**Step 3 — Apply with $m = 2K$.** The first sum in $T_K$ is $\sum_{j=1}^{2K} 1/(2j-1) = H_{4K} - \frac{1}{2} H_{2K}$.

The second sum is $\sum_{k=1}^K 1/(2k) = \frac{1}{2} H_K$.

So
$$T_K = H_{4K} - \frac{1}{2} H_{2K} - \frac{1}{2} H_K.$$

**Step 4 — Use $H_N = \ln N + \gamma + o(1)$.**
$$T_K = [\ln(4K) + \gamma] - \frac{1}{2}[\ln(2K) + \gamma] - \frac{1}{2}[\ln K + \gamma] + o(1).$$

Simplify:
$$T_K = \ln(4K) - \frac{1}{2}\ln(2K) - \frac{1}{2}\ln K + \gamma(1 - 1/2 - 1/2) + o(1).$$

The $\gamma$ coefficient is $0$:
$$T_K = \ln(4K) - \frac{1}{2}\ln(2K) - \frac{1}{2}\ln K + o(1) = \ln(4K) - \frac{1}{2}\ln(2K \cdot K) + o(1).$$

Combine:
$$T_K = \ln(4K) - \frac{1}{2}\ln(2K^2) + o(1) = \ln\frac{4K}{\sqrt{2K^2}} + o(1) = \ln\frac{4K}{K\sqrt{2}} + o(1) = \ln\frac{4}{\sqrt{2}} + o(1) = \ln(2\sqrt{2}) + o(1).$$

**Step 5 — Finalise.**
$$\ln(2\sqrt{2}) = \ln 2 + \frac{1}{2} \ln 2 = \frac{3}{2} \ln 2.$$

So $T_K \to \frac{3}{2} \ln 2$ as $K \to \infty$.

**Step 6 — Between-block variation is negligible.** Within each block $B_k$ of three terms, each term is $O(1/k)$, so the partial sums between blocks differ from the block-endpoint sums by $O(1/k) \to 0$. So along the full sequence of partial sums (not just at block ends), convergence to $\frac{3}{2} \ln 2$ holds.

**Conclusion.** The rearrangement "two positives, one negative" of $\sum (-1)^{n+1}/n$ converges to $\frac{3}{2} \ln 2$.

**Sanity check.** $\frac{3}{2}\ln 2 \approx 1.5 \cdot 0.693 = 1.0397$, versus original sum $\ln 2 \approx 0.693$. The rearrangement is genuinely different from the original — precisely the Riemann pathology.

**Interpretive remark.** The "trick" is that taking two positive terms before one negative shifts the running sum upward relative to the alternating pattern. By choosing $p$ positives for every $q$ negatives, one obtains the sum $\ln 2 + \frac{1}{2}\ln(p/q)$. For $p = 2, q = 1$: $\ln 2 + \frac{1}{2}\ln 2 = \frac{3}{2}\ln 2$ ✓.

$\blacksquare$

([[15-rearrangement-of-series]])

---

### Problem B4

Test: $\displaystyle \sum_{n=1}^{\infty} \dfrac{\sin n}{n}$.

**Solution.**

**Strategy.** Apply **Dirichlet's test**: if $(b_n)$ is a monotone sequence with $b_n \to 0$, and the partial sums $\sum_{k=1}^N a_k$ are bounded, then $\sum a_n b_n$ converges.

**Step 1 — Identify $a_n, b_n$.** Take $a_n = \sin n$, $b_n = 1/n$.

**Step 2 — Verify $b_n \downarrow 0$.** $b_n = 1/n$ is positive, decreasing, $\to 0$ ✓.

**Step 3 — Bound partial sums of $\sin n$.** Use the identity (sum of sines):
$$\sum_{k=1}^N \sin k = \frac{\sin(N/2) \sin((N+1)/2)}{\sin(1/2)}.$$

*Derivation.* Multiply both sides by $2\sin(1/2)$ and use the product-to-sum identity $2 \sin(1/2) \sin k = \cos(k - 1/2) - \cos(k + 1/2)$. The sum telescopes:
$$\sum_{k=1}^N 2 \sin(1/2) \sin k = \sum_{k=1}^N [\cos(k - 1/2) - \cos(k + 1/2)] = \cos(1/2) - \cos(N + 1/2).$$

Then $\sum_{k=1}^N \sin k = [\cos(1/2) - \cos(N + 1/2)] / [2 \sin(1/2)]$, which via product-to-sum can be written as above.

**Step 4 — Bound.** Regardless of the exact form, $|\cos(1/2) - \cos(N + 1/2)| \leq 2$, so
$$\left|\sum_{k=1}^N \sin k\right| \leq \frac{1}{|\sin(1/2)|} \approx \frac{1}{0.479} \approx 2.086.$$

So the partial sums of $\sin k$ are bounded uniformly in $N$.

**Step 5 — Apply Dirichlet's test.** Bounded partial sums of $a_n$ + monotone $b_n \downarrow 0$ implies $\sum (\sin n)/n$ converges.

**Step 6 — Test absolute convergence.** Consider $\sum |\sin n|/n$. We claim this diverges.

*Argument.* For each integer $n$, $|\sin n| \geq 1/2$ except when $n$ is very close (mod $\pi$) to $0$ or $\pi$. Equidistribution of $\{n \bmod \pi\}$ on $[0, \pi)$ (Weyl) means the set $\{n : |\sin n| \geq 1/2\}$ has density $\geq 2/3$ in $\mathbb{N}$ (the measure of $\{\theta \in [0, \pi) : |\sin \theta| \geq 1/2\} = [\pi/6, 5\pi/6]$ has length $2\pi/3$, density $2/3$).

So $\sum_n |\sin n|/n$ has a positive-density subseries bounded below by $(1/2) \sum' 1/n$, which diverges (harmonic-type sub-series with positive density diverges).

More elementarily: use $\sin^2 n = (1 - \cos(2n))/2$, so
$$\sum \frac{\sin^2 n}{n} = \frac{1}{2} \sum \frac{1}{n} - \frac{1}{2}\sum \frac{\cos(2n)}{n}.$$

The first diverges (harmonic); the second converges by Dirichlet. So $\sum \sin^2 n / n$ diverges. And $|\sin n| \geq \sin^2 n$, so by comparison $\sum |\sin n|/n$ diverges.

**Conclusion.** $\sum \sin n / n$ is **conditionally convergent**.

**Interpretive remark.** Dirichlet's test is a vast generalisation of Leibniz's test (take $a_n = (-1)^n$, bounded partial sums with $|partial| \leq 1$). It's the natural tool for oscillatory series like $\sum \sin(n\theta)/n^p$ for $\theta \notin 2\pi \mathbb{Z}$.

$\blacksquare$

([[14-alternating-and-absolute-convergence]])

---

## Part C — Limits of Functions

### Problem C1

Compute $\lim_{x \to 0} \dfrac{1 - \cos x}{x^2}$ using the known limit $\lim_{u \to 0} \sin u / u = 1$.

**Solution.**

**Strategy.** Rewrite $1 - \cos x$ using a half-angle identity to reduce to $\sin$.

**Step 1 — Half-angle identity.** Using $\cos x = 1 - 2\sin^2(x/2)$:
$$1 - \cos x = 2 \sin^2\!\left(\frac{x}{2}\right).$$

**Step 2 — Substitute into the quotient.**
$$\frac{1 - \cos x}{x^2} = \frac{2 \sin^2(x/2)}{x^2} = \frac{2 \sin^2(x/2)}{(x/2)^2 \cdot 4} = \frac{1}{2} \left(\frac{\sin(x/2)}{x/2}\right)^2.$$

**Step 3 — Pass to the limit.** As $x \to 0$, $u := x/2 \to 0$, and $\sin u / u \to 1$. Squaring is continuous, so
$$\lim_{x \to 0} \left(\frac{\sin(x/2)}{x/2}\right)^2 = 1^2 = 1.$$

Hence
$$\lim_{x \to 0} \frac{1 - \cos x}{x^2} = \frac{1}{2}.$$

**Sanity check via Taylor.** $\cos x = 1 - x^2/2 + x^4/24 - \cdots$, so $1 - \cos x = x^2/2 - x^4/24 + \cdots$, and $(1 - \cos x)/x^2 = 1/2 - x^2/24 + O(x^4) \to 1/2$ ✓.

**Interpretive remark.** This is the second key trigonometric limit, after $\lim \sin x/x = 1$. Both follow from geometric/analytic properties of the sine function — or equivalently from the Taylor series. The combination of the two gives the Taylor expansion of $\cos$ near $0$ at quadratic order.

$\blacksquare$

([[18-important-limits-infinite-limits]])

---

### Problem C2

Prove using $\varepsilon$–$\delta$: $\lim_{x \to 2}(x^2 + 1) = 5$.

**Solution.**

**Goal.** Given $\varepsilon > 0$, produce $\delta > 0$ such that $0 < |x - 2| < \delta$ implies $|(x^2 + 1) - 5| < \varepsilon$.

**Step 1 — Factor the target expression.**
$$|(x^2 + 1) - 5| = |x^2 - 4| = |x - 2| \cdot |x + 2|.$$

We control $|x - 2|$ directly (by $\delta$); we need to also bound $|x + 2|$.

**Step 2 — Preliminary restriction.** Impose the preliminary condition $|x - 2| < 1$, i.e., $1 < x < 3$.

Under this restriction, $x + 2 \in (3, 5)$, so $|x + 2| < 5$.

**Step 3 — Combined bound.** If $|x - 2| < 1$ also, then
$$|x^2 - 4| = |x - 2| \cdot |x + 2| < 5 |x - 2|.$$

To force this to be $< \varepsilon$, demand $5|x - 2| < \varepsilon$, i.e., $|x - 2| < \varepsilon / 5$.

**Step 4 — Choose $\delta$.** Let
$$\delta := \min\!\left(1, \frac{\varepsilon}{5}\right) > 0.$$

**Step 5 — Verify.** Suppose $0 < |x - 2| < \delta$. Then:
- $|x - 2| < 1$, so $|x + 2| < 5$ (by Step 2).
- $|x - 2| < \varepsilon/5$.

Therefore
$$|(x^2 + 1) - 5| = |x - 2| \cdot |x + 2| < \frac{\varepsilon}{5} \cdot 5 = \varepsilon. \qquad \checkmark$$

**Conclusion.** The $\varepsilon$–$\delta$ definition of the limit is satisfied: $\lim_{x \to 2}(x^2 + 1) = 5$.

**Sanity check.** For $\varepsilon = 0.01$, $\delta = \min(1, 0.002) = 0.002$. Check: $x = 2.001 \Rightarrow x^2 + 1 = 5.004001 \Rightarrow |\cdot - 5| = 0.004001 < 0.01$ ✓. (The $\delta = \varepsilon/5$ bound is not tight but is simple; a tighter analysis would use $|x + 2| \leq 4 + \delta \leq 4 + \varepsilon/5$ and solve a quadratic for $\delta$.)

**Interpretive remark.** The technique of **preliminary restriction** (step 2) is standard: to bound $|f(x) - L| = |x - a| \cdot g(x)$ where $g$ is continuous, first restrict $x$ to a bounded neighbourhood of $a$ so that $g$ is bounded, then choose $\delta \leq \varepsilon/\max g$. This decouples the "nuisance factor" $g$ from the primary factor $|x - a|$.

$\blacksquare$

([[16-continuity]])

---

### Problem C3

Show that $\lim_{x \to 0} \sin(1/x)$ does not exist.

**Solution.**

**Strategy.** Use **Heine's sequential criterion**: $\lim_{x \to a} f(x) = L$ iff for every sequence $x_n \to a$ with $x_n \neq a$, $f(x_n) \to L$. Equivalently, exhibit two sequences converging to $0$ whose $f$-images converge to different values.

**Step 1 — Construct sequences.**
- $x_n := 1/(n\pi)$. Then $x_n \to 0$, $x_n \neq 0$, and $\sin(1/x_n) = \sin(n\pi) = 0$. So $f(x_n) \to 0$.
- $y_n := 1/(2n\pi + \pi/2)$. Then $y_n \to 0$, $y_n \neq 0$, and $\sin(1/y_n) = \sin(2n\pi + \pi/2) = \sin(\pi/2) = 1$. So $f(y_n) \to 1$.

**Step 2 — Conclude.** Two sequences both tending to $0$, but $f(x_n) \to 0 \neq 1 \leftarrow f(y_n)$. By Heine's criterion (contrapositive), $\lim_{x \to 0} f(x)$ cannot equal both $0$ and $1$, hence does not exist.

**Alternative via $\varepsilon$–$\delta$.** Suppose for contradiction $\lim_{x \to 0} f(x) = L$. Take $\varepsilon = 1/4$. There exists $\delta > 0$ such that $0 < |x| < \delta \Rightarrow |f(x) - L| < 1/4$.

But for any $\delta > 0$, we can find $n$ large enough that both $x_n, y_n \in (0, \delta)$. So both $|0 - L| < 1/4$ and $|1 - L| < 1/4$, giving
$$1 = |1 - 0| = |(1 - L) - (0 - L)| \leq |1 - L| + |0 - L| < 1/4 + 1/4 = 1/2,$$
a contradiction.

**Interpretive remark.** $\sin(1/x)$ is the archetypal **essential (second-kind) discontinuity**. Near $0$, the function oscillates between $-1$ and $1$ infinitely many times in any neighbourhood. Neither one-sided limit exists. Contrast with $x \sin(1/x)$, which *does* have limit $0$ at $0$ (squeeze: $|x \sin(1/x)| \leq |x| \to 0$).

$\blacksquare$

([[16-continuity]])

---

### Problem C4

Compute $\lim_{x \to \infty} (\sqrt{x^2 + x} - x)$.

**Solution.**

**Strategy.** Rationalise (multiply by the conjugate).

**Step 1 — Rationalise.**
$$\sqrt{x^2 + x} - x = \frac{(\sqrt{x^2 + x} - x)(\sqrt{x^2 + x} + x)}{\sqrt{x^2 + x} + x} = \frac{(x^2 + x) - x^2}{\sqrt{x^2 + x} + x} = \frac{x}{\sqrt{x^2 + x} + x}.$$

**Step 2 — Simplify by dividing by $x$.** For $x > 0$, divide numerator and denominator by $x$:
$$\frac{x}{\sqrt{x^2 + x} + x} = \frac{1}{\sqrt{1 + 1/x} + 1}.$$

(Here we used $\sqrt{x^2 + x}/x = \sqrt{1 + 1/x}$, valid for $x > 0$.)

**Step 3 — Pass to the limit.** As $x \to \infty$, $1/x \to 0$, so $\sqrt{1 + 1/x} \to \sqrt{1} = 1$. Therefore
$$\lim_{x \to \infty} \frac{1}{\sqrt{1 + 1/x} + 1} = \frac{1}{1 + 1} = \frac{1}{2}.$$

**Sanity check via Taylor.** For large $x$:
$$\sqrt{x^2 + x} = x\sqrt{1 + 1/x} = x\left(1 + \frac{1}{2x} - \frac{1}{8x^2} + O(x^{-3})\right) = x + \frac{1}{2} - \frac{1}{8x} + O(x^{-2}).$$

So $\sqrt{x^2 + x} - x = 1/2 - 1/(8x) + O(x^{-2}) \to 1/2$ ✓. This also reveals the next-order correction: the difference approaches $1/2$ at rate $O(1/x)$.

**Interpretive remark.** The formal identity "$\infty - \infty$" is indeterminate. Rationalisation makes precise what the indeterminacy hides: in this case, a finite limit $1/2$. The technique generalises to $\sqrt{P(x)} - \sqrt{Q(x)}$ for polynomials $P, Q$ of the same degree — multiply by the conjugate to get a ratio of a polynomial (of one lower degree) over a sum of roots.

$\blacksquare$

([[18-important-limits-infinite-limits]])

---

## Part D — Continuity

### Problem D1

Let $f(x) = \dfrac{x^2 - 1}{x - 1}$ for $x \neq 1$, $f(1) = 3$. Is $f$ continuous at $x = 1$?

**Solution.**

**Step 1 — Compute the limit at $x = 1$.** For $x \neq 1$,
$$f(x) = \frac{x^2 - 1}{x - 1} = \frac{(x - 1)(x + 1)}{x - 1} = x + 1.$$

Hence $\lim_{x \to 1} f(x) = \lim_{x \to 1}(x + 1) = 2$.

**Step 2 — Compare with $f(1)$.** $f(1) = 3 \neq 2 = \lim_{x \to 1} f(x)$.

**Step 3 — Classify.** Both one-sided limits exist and agree (equal $2$), but the common value does not match $f(1)$. This is a **removable discontinuity** (also called a first-kind discontinuity where the one-sided limits coincide).

**Step 4 — How to "remove" it.** Redefine $\tilde f(1) := 2$. Then $\tilde f(x) = x + 1$ for all $x$, continuous everywhere.

**Interpretive remark.** Removability is a precise statement: the function and its limit disagree at a single point, but a single-point modification restores continuity. Contrast with jump discontinuities (one-sided limits disagree) and essential discontinuities (at least one one-sided limit fails to exist).

$\blacksquare$

([[17-types-of-discontinuity-monotonic]])

---

### Problem D2

Prove: if $f : [a, b] \to \mathbb{R}$ is continuous and $f(a) < 0 < f(b)$, then there exists $c \in (a, b)$ with $f(c) = 0$.

**Solution.** This is the **Intermediate Value Theorem (IVT)** applied with intermediate value $\gamma = 0$.

**Setup.** $f$ continuous on $[a, b]$, $f(a) < 0 < f(b)$.

**Proof via bisection (constructive).**

**Step 1.** Define $a_0 = a$, $b_0 = b$, and the midpoint $m_0 = (a + b)/2$.

**Step 2 — Recursive bisection.** Given $a_n, b_n$ with $f(a_n) \leq 0 \leq f(b_n)$ and $b_n - a_n = (b - a)/2^n$, let $m_n := (a_n + b_n)/2$. Compute $f(m_n)$:

- If $f(m_n) = 0$, we're done: $c = m_n$ works.
- If $f(m_n) > 0$, set $a_{n+1} = a_n$, $b_{n+1} = m_n$.
- If $f(m_n) < 0$, set $a_{n+1} = m_n$, $b_{n+1} = b_n$.

In each case, $f(a_{n+1}) \leq 0 \leq f(b_{n+1})$ and $b_{n+1} - a_{n+1} = (b - a)/2^{n+1}$.

**Step 3 — Nested interval argument.** $(a_n)$ is increasing and bounded above (by $b$); $(b_n)$ is decreasing and bounded below (by $a$). Both converge: $a_n \to c_-$, $b_n \to c_+$. Since $b_n - a_n \to 0$, $c_- = c_+ =: c$.

**Step 4 — Show $f(c) = 0$.** By continuity at $c$:
$$f(c) = \lim_{n \to \infty} f(a_n) \leq 0, \qquad f(c) = \lim_{n \to \infty} f(b_n) \geq 0.$$

(The first inequality uses $f(a_n) \leq 0$ for all $n$; limits preserve weak inequalities. Similarly for the second.)

Therefore $f(c) = 0$.

**Step 5 — Verify $c \in (a, b)$.** $c \in [a, b]$ clearly. $c \neq a$ (since $f(a) < 0 = f(c)$) and $c \neq b$ (since $f(b) > 0 = f(c)$). So $c \in (a, b)$.

**Interpretive remark.** The bisection proof is constructive: it produces an explicit sequence converging to a root, at rate $(b-a)/2^n$ per step. Non-constructively, one can prove IVT via the supremum $c := \sup\{x \in [a, b] : f(x) \leq 0\}$ and show $f(c) = 0$ using continuity; both proofs rely essentially on the completeness of $\mathbb{R}$ (least-upper-bound property or nested intervals).

$\blacksquare$

([[20-ivt-and-connectedness]])

---

### Problem D3

Show that $f(x) = \sin(1/x)$ for $x \neq 0$ has no continuous extension at $x = 0$.

**Solution.**

**Claim.** There is no value $f(0) \in \mathbb{R}$ making $f$ continuous at $0$.

**Argument.** Continuity at $0$ requires $\lim_{x \to 0} f(x) = f(0)$. But by Problem C3, $\lim_{x \to 0} \sin(1/x)$ does **not exist**. So no choice of $f(0)$ can make the limit equal to $f(0)$, because there is no limit to match.

**Classification.** $f$ has an **essential (second-kind) discontinuity** at $x = 0$ — a discontinuity where at least one one-sided limit fails to exist. In fact, neither one-sided limit $\lim_{x \to 0^\pm} \sin(1/x)$ exists, because the same oscillation argument applies to each side separately.

**Oscillation.** The **cluster set** $\{L : \exists x_n \to 0, f(x_n) \to L\}$ is the full interval $[-1, 1]$: for every $L \in [-1, 1]$, choose $\theta$ with $\sin\theta = L$ and set $x_n = 1/(\theta + 2n\pi)$; then $x_n \to 0$ and $\sin(1/x_n) = \sin\theta = L$.

**Interpretive remark.** This is the simplest natural example of an essential discontinuity. Any modification to "tame" it — multiplication by $x$, as in $g(x) = x \sin(1/x)$ — produces a function with a removable discontinuity (since $|g(x)| \leq |x| \to 0$, so $\lim_{x \to 0} g(x) = 0$). The factor $x$ dampens the oscillation.

$\blacksquare$

([[17-types-of-discontinuity-monotonic]])

---

### Problem D4

Classify the discontinuities of $f(x) = x - \lfloor x \rfloor$ (the fractional-part function) at each integer.

**Solution.**

**Setup.** $\lfloor x \rfloor$ is the greatest integer $\leq x$. So $f(x) = x - \lfloor x\rfloor$ is the fractional part, $f(x) \in [0, 1)$ for all $x \in \mathbb{R}$.

**Step 1 — Values on each unit interval.** For $n \leq x < n + 1$ (with $n \in \mathbb{Z}$), $\lfloor x \rfloor = n$, so $f(x) = x - n$, a linear function on $[n, n+1)$ with $f(n) = 0$ and $\lim_{x \to (n+1)^-} f(x) = 1$.

**Step 2 — Compute one-sided limits at $x = n$.**

*Left limit.* Approach from below: $x \to n^-$ means $n - 1 \leq x < n$, so $\lfloor x\rfloor = n - 1$, $f(x) = x - (n-1)$. As $x \to n^-$, $f(x) \to n - (n - 1) = 1$.

So $\lim_{x \to n^-} f(x) = 1$.

*Right limit.* Approach from above: $x \to n^+$ means $n \leq x < n + 1$, so $\lfloor x\rfloor = n$, $f(x) = x - n$. As $x \to n^+$, $f(x) \to n - n = 0$.

So $\lim_{x \to n^+} f(x) = 0$.

*Value at $n$.* $f(n) = n - n = 0$.

**Step 3 — Classify.** At $x = n$:
- Left limit $= 1$.
- Right limit $= 0$.
- $f(n) = 0$ (matches the right limit).

Both one-sided limits exist but differ. This is a **jump discontinuity** (first-kind) with jump magnitude $|1 - 0| = 1$.

The function is right-continuous at $n$ (since right limit $= f(n) = 0$) but not left-continuous.

**Sanity check.** $f(0) = 0$, $f(0.9) = 0.9$, $f(0.99) = 0.99 \to 1$ as we approach $1$ from below; $f(1) = 0$, $f(1.01) = 0.01 \to 0$ as we approach from above ✓.

**Interpretive remark.** Every monotonic function has at most countably many jump discontinuities (F4). $f$ is not monotonic globally but is monotonic on each $[n, n+1)$; the discontinuities are "resets" between these pieces. The fractional-part function is the building block for many periodic constructions.

$\blacksquare$

([[17-types-of-discontinuity-monotonic]])

---

### Problem D5 (Thomae's function)

Classify the continuity of Thomae's function:
$$T(x) = \begin{cases} 1/q & \text{if } x = p/q \in \mathbb{Q} \text{ in lowest terms}, q \geq 1, \\ 0 & \text{if } x \in \mathbb{R} \setminus \mathbb{Q}, \\ 1 & \text{if } x = 0. \end{cases}$$

**Solution.**

**Claim.** $T$ is continuous at every irrational point, and discontinuous at every rational point.

**Part 1: Discontinuity at rationals.**

Let $x_0 = p/q \in \mathbb{Q}$ (in lowest terms), so $T(x_0) = 1/q > 0$.

Choose a sequence of irrationals $x_n \to x_0$ (exists since irrationals are dense): $T(x_n) = 0$ for all $n$, so
$$\lim_{n \to \infty} T(x_n) = 0 \neq 1/q = T(x_0).$$

By Heine's criterion, $T$ is not continuous at $x_0$.

**Part 2: Continuity at irrationals.**

Let $x_0 \in \mathbb{R} \setminus \mathbb{Q}$, so $T(x_0) = 0$. We show $\lim_{x \to x_0} T(x) = 0$, i.e., the definition of continuity is met.

**Step 1 — Fix $\varepsilon > 0$.** Choose $N$ such that $1/N < \varepsilon$, i.e., $N > 1/\varepsilon$. Take $N = \lfloor 1/\varepsilon\rfloor + 1$.

**Step 2 — Count "bad" rationals.** The only points $x$ where $T(x) \geq \varepsilon$ are rationals $p/q$ (in lowest terms) with $1/q \geq \varepsilon$, i.e., $q \leq N$.

In any bounded interval $[x_0 - 1, x_0 + 1]$, the number of such rationals is finite: for each $q \in \{1, 2, \ldots, N\}$, the rationals $p/q$ in the interval form a finite arithmetic progression ($p$ ranging over at most $2q + 1$ integers).

So finitely many points $y_1, y_2, \ldots, y_M \in [x_0 - 1, x_0 + 1]$ satisfy $T(y_i) \geq \varepsilon$.

**Step 3 — Choose $\delta$.** Since $x_0$ is irrational, $x_0 \notin \{y_1, \ldots, y_M\}$ (each $y_i$ is rational). Set
$$\delta := \min\big(1, \min_{1 \leq i \leq M} |x_0 - y_i|\big) > 0.$$

**Step 4 — Verify.** For any $x$ with $0 < |x - x_0| < \delta$:
- $|x - x_0| < 1$, so $x \in [x_0 - 1, x_0 + 1]$.
- $|x - x_0| < |x_0 - y_i|$ for all $i$, so $x \notin \{y_1, \ldots, y_M\}$.

Therefore $T(x) < \varepsilon$, whether $x$ is irrational ($T(x) = 0$) or rational ($T(x) = 1/q$ with $q > N$, so $T(x) < 1/N < \varepsilon$).

Hence $|T(x) - T(x_0)| = T(x) < \varepsilon$. Continuity at $x_0$ ✓.

**Step 5 — Conclusion.** $T$ is continuous exactly on $\mathbb{R} \setminus \mathbb{Q}$ and discontinuous exactly on $\mathbb{Q}$.

**Interpretive remark.** Thomae's function is a canonical counterexample: a function continuous on an *uncountable, dense* set (the irrationals) and discontinuous on a *countable, dense* set (the rationals). Its set of continuity points is $G_\delta$ (intersection of open sets), as must be true for any function ($\text{Cont}(f) = \bigcap_n \{x : \omega(f, x) < 1/n\}$ is $G_\delta$). The rationals are not $G_\delta$ (Baire category), so there's no function with $\text{Cont}(f) = \mathbb{Q}$ — a deep result.

$\blacksquare$

([[16-continuity]])

---

## Part E — Compactness, IVT, EVT

### Problem E1

Prove: a continuous function on a compact set attains its maximum.

**Solution.** Let $K \subseteq \mathbb{R}$ (or $\mathbb{R}^n$, same proof) be compact and $f : K \to \mathbb{R}$ continuous. We show $\exists x^* \in K$ with $f(x^*) = \sup_{x \in K} f(x)$.

**Step 1 — $f(K)$ is compact.** The continuous image of a compact set is compact. Proof sketch: given any open cover of $f(K)$, pull it back via $f^{-1}$ to an open cover of $K$ (using continuity), extract a finite subcover of $K$, push forward to a finite subcover of $f(K)$.

**Step 2 — $f(K)$ is closed and bounded in $\mathbb{R}$.** Compact subsets of $\mathbb{R}$ are closed and bounded (Heine–Borel). So $M := \sup f(K) < \infty$ (bounded) and $M \in f(K)$ (closed: the sup of a closed set in $\mathbb{R}$ lies in the set).

*Proof of $M \in f(K)$.* By definition of sup, there exist $y_n \in f(K)$ with $y_n \to M$. Since $f(K)$ is closed, $M \in f(K)$.

**Step 3 — Conclude.** $M = f(x^*)$ for some $x^* \in K$, i.e., $f$ attains its max.

**Symmetric argument for min.** The infimum is similarly attained.

**Interpretive remark.** This is the **Extreme Value Theorem**. The hypotheses are essential: on the non-compact interval $(0, 1)$, $f(x) = x$ has sup $= 1$ not attained. Continuity is also essential: on $[0, 1]$, the discontinuous $f(x) = x$ for $x < 1$ and $f(1) = 0$ has sup $= 1$ not attained.

$\blacksquare$

([[20-ivt-and-connectedness]])

---

### Problem E2

Prove: every polynomial of odd degree has a real root.

**Solution.**

**Setup.** Let $p(x) = a_n x^n + a_{n-1} x^{n-1} + \cdots + a_0$ with $n$ odd and $a_n \neq 0$. WLOG $a_n > 0$ (else replace $p$ by $-p$; the root sets are the same).

**Step 1 — Behaviour at $\pm\infty$.**
$$p(x) = a_n x^n \left(1 + \frac{a_{n-1}}{a_n x} + \cdots + \frac{a_0}{a_n x^n}\right).$$

As $|x| \to \infty$, the factor in parentheses $\to 1$, so $p(x) \sim a_n x^n$ for $|x|$ large.

- As $x \to +\infty$: $a_n x^n \to +\infty$ (since $n$ odd, $a_n > 0$). So $p(x) \to +\infty$.
- As $x \to -\infty$: $a_n x^n \to -\infty$ (since $n$ odd makes $x^n < 0$ for $x < 0$). So $p(x) \to -\infty$.

**Step 2 — Concrete values.** Pick $M > 0$ large enough that $p(M) > 0$ and $p(-M) < 0$. Formally: there exists $M_1$ such that $p(x) > 0$ for all $x > M_1$ (definition of $p(x) \to +\infty$ with $\varepsilon = 1$); similarly $M_2$ for the negative side. Take $M = \max(M_1, M_2)$.

**Step 3 — Apply IVT.** $p$ is continuous on $[-M, M]$ (polynomials are continuous), and $p(-M) < 0 < p(M)$. By IVT (Problem D2), $\exists c \in (-M, M)$ with $p(c) = 0$.

**Interpretive remark.** The result is sharp: even-degree polynomials need not have real roots (e.g., $x^2 + 1$). The key is the sign change forced by odd degree and the intermediate value principle. Every complex-coefficient polynomial of any degree $\geq 1$ has a complex root (Fundamental Theorem of Algebra), but that's a deeper result relying on complex-analytic or topological tools.

$\blacksquare$

([[20-ivt-and-connectedness]])

---

### Problem E3

Show that $f(x) = x^2$ is **uniformly continuous** on $[0, 5]$ but **not** uniformly continuous on $[0, \infty)$.

**Solution.**

**Part 1: Uniform continuity on $[0, 5]$.**

**Goal.** Given $\varepsilon > 0$, produce $\delta > 0$ such that for all $x, y \in [0, 5]$ with $|x - y| < \delta$, $|x^2 - y^2| < \varepsilon$.

**Step 1 — Factor.**
$$|x^2 - y^2| = |x - y| \cdot |x + y|.$$

**Step 2 — Bound $|x + y|$ uniformly.** For $x, y \in [0, 5]$, $x + y \in [0, 10]$, so $|x + y| \leq 10$.

**Step 3 — Combined bound.**
$$|x^2 - y^2| \leq 10 |x - y|.$$

**Step 4 — Choose $\delta$.** Take $\delta = \varepsilon/10$. Then $|x - y| < \delta$ implies $|x^2 - y^2| < 10 \cdot \varepsilon/10 = \varepsilon$ ✓. Crucially, $\delta$ depends on $\varepsilon$ alone, not on $x$ or $y$.

**Part 2: Failure on $[0, \infty)$.**

**Strategy.** Negate the definition of uniform continuity: $\exists \varepsilon_0 > 0$ such that for every $\delta > 0$, $\exists x, y$ with $|x - y| < \delta$ but $|f(x) - f(y)| \geq \varepsilon_0$.

**Step 1 — Construct the "bad" pairs.** For each $n \in \mathbb{N}$, set
$$x_n := n, \qquad y_n := n + \frac{1}{n}.$$

**Step 2 — $|x_n - y_n| \to 0$.**
$$|x_n - y_n| = \frac{1}{n} \to 0.$$

**Step 3 — $|f(x_n) - f(y_n)|$ is bounded away from $0$.**
$$|y_n^2 - x_n^2| = \left|\left(n + \frac{1}{n}\right)^2 - n^2\right| = \left|2 + \frac{1}{n^2}\right| = 2 + \frac{1}{n^2} \geq 2.$$

**Step 4 — Conclude.** Take $\varepsilon_0 = 2$. For any proposed $\delta > 0$, choose $n > 1/\delta$ so that $|x_n - y_n| = 1/n < \delta$; but $|f(x_n) - f(y_n)| \geq 2 = \varepsilon_0$. No uniform $\delta$ exists.

Hence $f$ is not uniformly continuous on $[0, \infty)$.

**Interpretive remark.** The distinction: on a bounded set, $|x + y|$ is uniformly bounded, so $\delta = \varepsilon/(\text{bound})$ works. On an unbounded set, $|x + y|$ grows without bound, making $\delta$ necessarily depend on location. This is the prototypical failure of uniform continuity, remedied by the **Heine–Cantor theorem** (E4): continuous on compact $\Rightarrow$ uniformly continuous.

$\blacksquare$

([[20-ivt-and-connectedness]])

---

### Problem E4

Prove: if $f : K \to \mathbb{R}^n$ is continuous and $K \subseteq \mathbb{R}^m$ is compact, then $f$ is uniformly continuous (Heine–Cantor Theorem).

**Solution.**

**Strategy.** Contradiction + extraction of a convergent subsequence using compactness.

**Suppose for contradiction** $f$ is not uniformly continuous. Then
$$\exists \varepsilon_0 > 0 : \forall \delta > 0, \exists x, y \in K, |x - y| < \delta \text{ but } |f(x) - f(y)| \geq \varepsilon_0.$$

**Step 1 — Build sequences.** For each $n \in \mathbb{N}$, take $\delta = 1/n$. The negation gives $x_n, y_n \in K$ with
$$|x_n - y_n| < \frac{1}{n} \quad \text{and} \quad |f(x_n) - f(y_n)| \geq \varepsilon_0.$$

**Step 2 — Extract a convergent subsequence from $(x_n)$.** Since $K$ is compact, the sequence $(x_n)$ has a convergent subsequence $(x_{n_k}) \to x^* \in K$ (Bolzano–Weierstrass / sequential compactness).

**Step 3 — The companion subsequence.** Consider $(y_{n_k})$. Since $|x_{n_k} - y_{n_k}| < 1/n_k \to 0$ and $x_{n_k} \to x^*$, we have
$$|y_{n_k} - x^*| \leq |y_{n_k} - x_{n_k}| + |x_{n_k} - x^*| \to 0.$$

So $y_{n_k} \to x^*$ as well.

**Step 4 — Use continuity of $f$ at $x^*$.** Since $f$ is continuous at $x^* \in K$,
$$f(x_{n_k}) \to f(x^*) \quad \text{and} \quad f(y_{n_k}) \to f(x^*).$$

Hence
$$|f(x_{n_k}) - f(y_{n_k})| \leq |f(x_{n_k}) - f(x^*)| + |f(x^*) - f(y_{n_k})| \to 0.$$

**Step 5 — Contradiction.** But we assumed $|f(x_{n_k}) - f(y_{n_k})| \geq \varepsilon_0 > 0$ for all $k$. This contradicts $|f(x_{n_k}) - f(y_{n_k})| \to 0$.

**Conclusion.** The assumption of non-uniform continuity is false; $f$ is uniformly continuous on $K$.

**Interpretive remark.** The proof leverages **sequential compactness** (Bolzano–Weierstrass): every sequence has a convergent subsequence. This is equivalent to the open-cover definition of compactness in metric spaces. Without compactness (as in E3), no such subsequence extraction is possible, and uniform continuity can fail.

$\blacksquare$

([[20-ivt-and-connectedness]])

---

## Part F — Mixed

### Problem F1 (Brouwer 1D)

Let $f : [0, 1] \to [0, 1]$ be continuous. Show $f$ has a fixed point, i.e., $\exists c \in [0, 1]$ with $f(c) = c$.

**Solution.**

**Setup.** Define $g : [0, 1] \to \mathbb{R}$ by $g(x) := f(x) - x$. We seek $c$ with $g(c) = 0$.

**Step 1 — Continuity.** $g$ is continuous (difference of continuous functions).

**Step 2 — Evaluate at endpoints.**
- $g(0) = f(0) - 0 = f(0)$. Since $f$ maps into $[0, 1]$, $f(0) \in [0, 1]$, so $g(0) \geq 0$.
- $g(1) = f(1) - 1$. Since $f(1) \leq 1$, $g(1) \leq 0$.

**Step 3 — Case analysis.**

*Case A: $g(0) = 0$.* Then $f(0) = 0$, so $c = 0$ is a fixed point.

*Case B: $g(1) = 0$.* Then $f(1) = 1$, so $c = 1$ is a fixed point.

*Case C: $g(0) > 0$ and $g(1) < 0$.* Then $g$ is continuous on $[0, 1]$ with $g(0) > 0 > g(1)$. Apply IVT (D2, sign-flipped): $\exists c \in (0, 1)$ with $g(c) = 0$, i.e., $f(c) = c$.

In all cases, a fixed point exists.

**Interpretive remark.** This is the 1-dimensional case of **Brouwer's fixed-point theorem**, which generalises: every continuous $f : \overline{B^n} \to \overline{B^n}$ has a fixed point, where $\overline{B^n}$ is the closed unit ball in $\mathbb{R}^n$. The 1-D version follows from IVT; higher dimensions require more topology (simplicial approximation, degree theory, or Sperner's lemma).

Applications: existence of equilibria in game theory (Nash), ODE/PDE existence theorems (Schauder's theorem), etc.

$\blacksquare$

([[20-ivt-and-connectedness]])

---

### Problem F2

Prove: a continuous function $f : \mathbb{R} \to \mathbb{R}$ with $\lim_{|x| \to \infty} f(x) = 0$ attains its maximum or minimum on $\mathbb{R}$ (the extremum may be zero).

**Solution.**

**Case A: $f \equiv 0$.** Then $f$ attains every value $\geq$ min $= 0$ and $\leq$ max $= 0$. (Max and min both equal $0$, attained everywhere.) Done.

**Case B: $f \not\equiv 0$.** Then $\exists x_0 \in \mathbb{R}$ with $f(x_0) \neq 0$. WLOG $f(x_0) > 0$ (else apply the argument to $-f$ to attain the minimum of $f$).

**Step 1 — Use the vanishing-at-infinity hypothesis.** Given $\varepsilon = f(x_0)/2 > 0$, by $\lim_{|x| \to \infty} f(x) = 0$, there exists $M > 0$ such that
$$|x| > M \implies |f(x)| < f(x_0)/2.$$

**Step 2 — Ensure $x_0$ is in the bounded region.** Extend $M$ if necessary to $M' := \max(M, |x_0| + 1)$. Then $x_0 \in (-M', M') \subseteq [-M', M']$, and $|x| > M'$ still implies $|f(x)| < f(x_0)/2$.

**Step 3 — Apply EVT on the compact interval.** $f$ is continuous on the compact interval $[-M', M']$, so by EVT (E1) $f$ attains its maximum there at some $x^* \in [-M', M']$:
$$f(x^*) = \max_{x \in [-M', M']} f(x) \geq f(x_0).$$

(The inequality holds because $x_0 \in [-M', M']$.)

**Step 4 — $f(x^*)$ is the global max.** For $|x| > M'$, $f(x) < f(x_0)/2 < f(x_0) \leq f(x^*)$.

So $f(x^*) \geq f(x)$ for all $x \in \mathbb{R}$: $f(x^*)$ is the global maximum, attained at $x^*$.

**Interpretive remark.** The "vanishing at infinity" hypothesis reduces a problem on the non-compact set $\mathbb{R}$ to a problem on a compact sub-interval, where EVT applies. The argument generalises to $\mathbb{R}^n$ and to general "proper" continuous functions (preimages of compacta are compact).

$\blacksquare$

([[20-ivt-and-connectedness]])

---

### Problem F3

Let $f : [a, b] \to \mathbb{R}$ be continuous with $f(a) = f(b)$. Show $f$ attains some value at least twice in $[a, b]$.

**Solution.**

**Trivial sub-case.** If $f$ is constant, every value is attained infinitely. Done.

**Non-trivial case.** Assume $f$ non-constant. Then $\exists c \in (a, b)$ with $f(c) \neq f(a) = f(b)$.

**WLOG $f(c) > f(a)$.** (If $f(c) < f(a)$, apply the symmetric argument below.)

**Step 1 — Pick an intermediate value $\gamma$.** Choose $\gamma \in (f(a), f(c))$, e.g., $\gamma = (f(a) + f(c))/2$. Then $f(a) < \gamma < f(c)$ and $f(b) = f(a) < \gamma < f(c)$.

**Step 2 — Apply IVT on $[a, c]$.** $f$ is continuous on $[a, c]$, $f(a) < \gamma < f(c)$. By IVT, $\exists c_1 \in (a, c)$ with $f(c_1) = \gamma$.

**Step 3 — Apply IVT on $[c, b]$.** $f$ is continuous on $[c, b]$, $f(c) > \gamma > f(a) = f(b)$. So $\gamma$ lies strictly between $f(c)$ and $f(b)$. By IVT, $\exists c_2 \in (c, b)$ with $f(c_2) = \gamma$.

**Step 4 — Distinct preimages.** $c_1 \in (a, c)$ and $c_2 \in (c, b)$, so $c_1 < c < c_2$; in particular $c_1 \neq c_2$. Both have $f$-value $\gamma$.

**Conclusion.** The value $\gamma$ is attained at least twice. $\blacksquare$

**Interpretive remark.** This is a disguised form of Rolle's theorem's *qualitative* content (though Rolle gives a derivative statement, not an IVT one). Generalisation: if $f$ is continuous on $[a, b]$ with $f(a) = f(b)$ and $f$ is not constant, then $f$ attains a continuum of values at least twice (any value between $\min f$ and $\max f$ other than the extremum).

([[20-ivt-and-connectedness]])

---

### Problem F4

Prove: a monotonic function $f : [a, b] \to \mathbb{R}$ can have at most countably many discontinuities.

**Solution.** WLOG $f$ is non-decreasing (else apply the proof to $-f$).

**Step 1 — Classification of discontinuities for monotonic $f$.** For non-decreasing $f$ and any $x_0 \in [a, b]$:
- The left limit $f(x_0^-) := \lim_{x \to x_0^-} f(x) = \sup\{f(x) : x < x_0\}$ exists (monotone increasing and bounded above by $f(x_0)$).
- Similarly, the right limit $f(x_0^+) := \lim_{x \to x_0^+} f(x) = \inf\{f(x) : x > x_0\}$ exists.
- $f(x_0^-) \leq f(x_0) \leq f(x_0^+)$ (monotonicity).

A discontinuity at $x_0$ occurs iff $f(x_0^-) < f(x_0^+)$, i.e., iff the "jump" $J(x_0) := f(x_0^+) - f(x_0^-) > 0$. All discontinuities of monotonic functions are **jump (first-kind) discontinuities**.

**Step 2 — Associate each jump to a rational.** For each discontinuity $x_0$, the jump interval $(f(x_0^-), f(x_0^+))$ is a non-empty open interval in $\mathbb{R}$. By density of $\mathbb{Q}$, it contains at least one rational $q(x_0)$.

**Step 3 — Distinct discontinuities give distinct rationals.** Suppose $x_1 < x_2$ are two discontinuity points. By monotonicity:
$$f(x_1^+) \leq f(x_2^-).$$

(Any $x$ with $x_1 < x < x_2$ satisfies $f(x_1^+) \leq f(x) \leq f(x_2^-)$; take sup over $x < x_2$ and inf over $x > x_1$.)

So the jump intervals $(f(x_1^-), f(x_1^+))$ and $(f(x_2^-), f(x_2^+))$ are disjoint:
$$f(x_1^-) < f(x_1^+) \leq f(x_2^-) < f(x_2^+).$$

Hence $q(x_1) \neq q(x_2)$.

**Step 4 — Injection into $\mathbb{Q}$.** The map $x_0 \mapsto q(x_0)$ from {discontinuities of $f$} $\to \mathbb{Q}$ is injective. Since $\mathbb{Q}$ is countable, so is {discontinuities of $f$}.

**Conclusion.** The set of discontinuities of a monotonic function on $[a, b]$ is at most countable. $\blacksquare$

**Interpretive remark.** The bound is sharp: one can construct monotonic functions with dense discontinuity sets (e.g., $f(x) = \sum_{q_n < x} 2^{-n}$ where $(q_n)$ enumerates rationals in $[0, 1]$; this is monotone increasing and discontinuous at every rational). The discontinuity set *is* countable (it equals $\{q_n\}$), but it is dense.

This theorem is foundational for **Lebesgue's theorem on differentiation of monotonic functions**: a monotonic function is differentiable almost everywhere.

([[17-types-of-discontinuity-monotonic]])

---

### Problem F5

Let $f, g : [a, b] \to \mathbb{R}$ be continuous with $f(q) \leq g(q)$ for every $q \in \mathbb{Q} \cap [a, b]$. Show $f \leq g$ on all of $[a, b]$.

**Solution.**

**Setup.** Let $h := g - f$. Then $h$ is continuous on $[a, b]$ and $h(q) \geq 0$ for every rational $q \in [a, b]$.

**Goal.** $h(x) \geq 0$ for all $x \in [a, b]$.

**Proof by contradiction.** Suppose $\exists c \in [a, b]$ with $h(c) < 0$. Set $\varepsilon := -h(c)/2 > 0$.

**Step 1 — Continuity at $c$.** By continuity of $h$ at $c$, $\exists \delta > 0$ such that $|x - c| < \delta$ and $x \in [a, b]$ imply $|h(x) - h(c)| < \varepsilon = -h(c)/2$.

**Step 2 — Consequence.** For such $x$:
$$h(x) < h(c) + \varepsilon = h(c) - h(c)/2 = h(c)/2 < 0.$$

So $h(x) < 0$ on the interval $N_c := (c - \delta, c + \delta) \cap [a, b]$.

**Step 3 — Density of $\mathbb{Q}$.** $N_c$ is a non-empty open interval in $[a, b]$ (since $c \in [a, b]$, at least one of $(c - \delta, c)$ or $(c, c + \delta)$ intersects $(a, b)$; if $c \in (a, b)$, both do; if $c = a$ or $c = b$, one does). By density of rationals, $N_c \cap \mathbb{Q} \neq \emptyset$.

So $\exists q \in N_c \cap \mathbb{Q}$ with $h(q) < 0$.

**Step 4 — Contradiction.** But by hypothesis, $h(q) = g(q) - f(q) \geq 0$. Contradiction.

**Conclusion.** No such $c$ exists; $h(x) \geq 0$ for all $x \in [a, b]$, i.e., $f \leq g$ everywhere.

**Interpretive remark.** The principle: a continuous function is determined by its values on any dense subset. Consequently, two continuous functions agreeing on a dense set agree everywhere (apply this result in both directions: $f \leq g$ and $g \leq f$ on $\mathbb{Q}$ give $f = g$). This is the core reason $C([a, b])$ has such a tight structure: continuity + density ⇒ global constraints from local data.

$\blacksquare$

([[16-continuity]])

---

## Summary of CO3

CO3 encompasses the architecture of real analysis on series and continuous functions:

1. **Infinite Series** — convergence as a limit of partial sums; battery of convergence tests (comparison, ratio, root, integral, alternating, Dirichlet/Abel).

2. **Absolute vs Conditional Convergence** — absolute convergence is rearrangement-invariant; conditional convergence is fragile (Riemann rearrangement).

3. **Limits of Functions** — $\varepsilon$–$\delta$ definition, Heine's sequential criterion, standard limits.

4. **Continuity** — $\varepsilon$–$\delta$, classification of discontinuities (removable, jump, essential), behaviour under operations.

5. **Topology of $\mathbb{R}$ via continuous functions** — IVT (connectedness), EVT (compactness), Heine–Cantor (uniform continuity), fixed-point theorems.

## Summary Table

| Problem Topic | Key lesson | Core technique |
|---|---|---|
| A1–A6 | [[13-series-convergence-tests]], [[14-alternating-and-absolute-convergence]] | Ratio, root, integral, comparison, Leibniz, Dirichlet |
| B1–B4 | [[15-rearrangement-of-series]] | Cauchy product, rearrangement, asymptotic expansion |
| C1–C4 | [[16-continuity]], [[18-important-limits-infinite-limits]] | $\varepsilon$–$\delta$, Heine's criterion, standard limits |
| D1–D5 | [[17-types-of-discontinuity-monotonic]] | Discontinuity classification |
| E1–E4 | [[20-ivt-and-connectedness]] | EVT, IVT, Heine–Cantor |
| F1–F5 | multiple | Fixed-point, monotonic, density-based extension |

## Related Concepts

- [[12-infinite-series-introduction]]
- [[13-series-convergence-tests]]
- [[14-alternating-and-absolute-convergence]]
- [[15-rearrangement-of-series]]
- [[16-continuity]]
- [[17-types-of-discontinuity-monotonic]]
- [[18-important-limits-infinite-limits]]
- [[20-ivt-and-connectedness]]
- [[22-differentiation]] — next unit (CO4) builds on continuity

---

*Last updated: 2026-04-19*
