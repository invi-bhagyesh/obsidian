# 13. Series Convergence Tests

---

## 13.1 Toolkit Overview

These tests apply mostly to series $\sum a_n$ of **non-negative** terms. Roughly:

| Test | When to use | Strength |
|---|---|---|
| Divergence test | Any series | Very weak (necessary, not sufficient) |
| Comparison | Terms bounded by known series | Simple, powerful |
| Limit comparison | Terms $\sim$ known terms | Most practical |
| Ratio (d'Alembert) | Factorials, exponentials, $n^k$ | Strong; inconclusive when limit $=1$ |
| Root (Cauchy) | $n$-th power structure | Strongest ratio/root family |
| Integral | Monotone decreasing, integrable | Powerful for $p$-series and log terms |
| Cauchy condensation | $a_n$ decreasing positive | Simplifies to sparser series |
| Raabe | Ratio-test failure with rate | Refines ratio |
| Gauss | Ratio-test failure with asymptotic | Most refined |
| Alternating | Alternating with $|a_n| \searrow 0$ | (See [[14-alternating-and-absolute-convergence]]) |

---

## 13.2 Comparison Test

> **Theorem (Comparison).** Let $a_n, b_n \geq 0$ eventually and $a_n \leq b_n$.
> 1. $\sum b_n < \infty \Rightarrow \sum a_n < \infty$.
> 2. $\sum a_n = \infty \Rightarrow \sum b_n = \infty$.

*Proof.* See [[12-infinite-series-introduction]] §12.7. $\blacksquare$

### Examples
- $\sum \frac{1}{n^2 + n}$: $\leq 1/n^2$, converges.
- $\sum \frac{1}{n - \sqrt{n}}$ (for $n \geq 2$): $\geq 1/n$, diverges.
- $\sum \frac{1}{2^n + n}$: $\leq 1/2^n$, converges.

---

## 13.3 Limit Comparison Test

> **Theorem (Limit Comparison).** Let $a_n, b_n > 0$ eventually. Suppose
> $$\lim_{n \to \infty} \frac{a_n}{b_n} = L.$$
> 1. If $0 < L < \infty$: $\sum a_n$ and $\sum b_n$ share convergence status.
> 2. If $L = 0$ and $\sum b_n$ converges, then $\sum a_n$ converges.
> 3. If $L = \infty$ and $\sum b_n$ diverges, then $\sum a_n$ diverges.

*Proof of (1).* With $L > 0$, for large $n$: $L/2 \cdot b_n < a_n < 3L/2 \cdot b_n$. Apply comparison in both directions. $\blacksquare$

### Examples

- $\sum \frac{3n^2 + 1}{n^5 + 2}$: compare with $1/n^3$. Ratio $\to 3$. $\sum 1/n^3$ converges, so series converges.
- $\sum \sin(1/n)$: compare with $1/n$. $\sin(1/n)/(1/n) \to 1$. $\sum 1/n$ diverges, so $\sum \sin(1/n)$ diverges.
- $\sum (e^{1/n} - 1)$: ratio with $1/n$ gives $(e^{1/n} - 1)/(1/n) \to 1$. Diverges.

Limit comparison replaces the hassle of finding exact upper/lower bounds with "what does $a_n$ look like asymptotically?"

---

## 13.4 Ratio Test (d'Alembert)

> **Theorem (Ratio Test).** Suppose $a_n > 0$ eventually, and
> $$L = \lim_{n \to \infty} \frac{a_{n+1}}{a_n}\ \text{exists in}\ [0, \infty].$$
> - If $L < 1$, $\sum a_n$ converges.
> - If $L > 1$ (including $L = \infty$), $\sum a_n$ diverges.
> - If $L = 1$, inconclusive.

*Proof.* Suppose $L < 1$. Pick $r$ with $L < r < 1$. $\exists N$: $a_{n+1}/a_n < r$ for $n \geq N$. So $a_{N+k} \leq a_N r^k$. By comparison with geometric $\sum a_N r^k < \infty$, series converges.

Suppose $L > 1$. Pick $r$ with $1 < r < L$. $\exists N$: $a_{n+1}/a_n > r$, so $a_{N+k} \geq a_N r^k \to \infty$. $a_n \not\to 0$, diverges. $\blacksquare$

### Examples

- $\sum \frac{n!}{n^n}$: $\frac{a_{n+1}}{a_n} = \frac{(n+1)!}{(n+1)^{n+1}} \cdot \frac{n^n}{n!} = \frac{n^n}{(n+1)^n} = \frac{1}{(1 + 1/n)^n} \to 1/e < 1$. Converges.
- $\sum \frac{2^n n!}{n^n}$: $\frac{a_{n+1}}{a_n} = 2/(1 + 1/n)^n \to 2/e < 1$. Converges.
- $\sum \frac{3^n n!}{n^n}$: ratio $\to 3/e > 1$. Diverges.
- $\sum \frac{x^n}{n!}$: ratio $= |x|/(n+1) \to 0$. Converges for all $x$.

### Ratio test limitations

Inconclusive when $L = 1$:
- $\sum 1/n$ diverges, but ratio $= n/(n+1) \to 1$.
- $\sum 1/n^2$ converges, but ratio $\to 1$ also.

For these borderline cases, use Raabe or integral tests.

---

## 13.5 Root Test (Cauchy)

> **Theorem (Root Test).** Let $a_n \geq 0$. Set
> $$L = \limsup_{n \to \infty} a_n^{1/n}.$$
> - If $L < 1$, $\sum a_n$ converges.
> - If $L > 1$, $\sum a_n$ diverges.
> - If $L = 1$, inconclusive.

*Proof.* If $L < 1$, pick $r \in (L, 1)$. Eventually $a_n^{1/n} < r$, so $a_n < r^n$. Compare with $\sum r^n < \infty$.

If $L > 1$, eventually $a_n^{1/n} > 1$, so $a_n > 1$ along a subsequence. $a_n \not\to 0$. Diverges. $\blacksquare$

### Strength compared to ratio

When both apply, they give the same answer, but root test is often stronger (it uses $\limsup$, which always exists, whereas ratio test requires an ordinary limit).

**Key fact.** If $\lim a_{n+1}/a_n = L$, then $\lim a_n^{1/n} = L$ too (converse fails).

### Examples

- $\sum (1 - 1/n)^{n^2}$: $a_n^{1/n} = (1 - 1/n)^n \to 1/e < 1$. Converges.
- $\sum n^n/(3^n n!)$: $a_n^{1/n} = n/(3 \cdot (n!)^{1/n})$. With $(n!)^{1/n} \sim n/e$ (Stirling), ratio $\to e/3 < 1$. Converges.
- $\sum 2^n / n^n$: $a_n^{1/n} = 2/n \to 0$. Converges.

---

## 13.6 Integral Test

> **Theorem (Integral Test).** Let $f : [1, \infty) \to [0, \infty)$ be **decreasing**. Let $a_n = f(n)$. Then
> $$\sum_{n=1}^{\infty} a_n\ \text{converges}\iff \int_1^\infty f(x)\, dx\ \text{converges.}$$

*Proof sketch.* For $x \in [n, n+1]$: $f(n+1) \leq f(x) \leq f(n)$. Integrate:
$$a_{n+1} \leq \int_n^{n+1} f(x)\, dx \leq a_n.$$
Sum from $1$ to $N$:
$$\sum_{n=2}^{N+1} a_n \leq \int_1^{N+1} f(x)\, dx \leq \sum_{n=1}^{N} a_n.$$
Both bounds are finite iff the integral is finite, by Monotone Convergence. $\blacksquare$

### Examples

- **$p$-series:** $\int_1^\infty dx/x^p$ converges iff $p > 1$. So $\sum 1/n^p$ converges iff $p > 1$.
- $\sum 1/(n \ln n)$ diverges: $\int_2^\infty dx/(x \ln x) = \ln \ln x \to \infty$.
- $\sum 1/(n (\ln n)^p)$ converges iff $p > 1$: $\int_2^\infty dx/(x (\ln x)^p) = (\ln x)^{1-p}/(1-p)$ for $p \neq 1$; finite iff $p > 1$.

---

## 13.7 Cauchy Condensation Test

> **Theorem (Cauchy Condensation).** Let $a_n \geq 0$ be **decreasing**. Then
> $$\sum_{n=1}^{\infty} a_n\ \text{converges}\iff \sum_{k=0}^{\infty} 2^k a_{2^k}\ \text{converges.}$$

*Proof sketch.* Since $a_n$ is decreasing, the terms $a_{2^k}, a_{2^k + 1}, \ldots, a_{2^{k+1} - 1}$ (that's $2^k$ terms) each lie between $a_{2^{k+1}}$ and $a_{2^k}$. Summing groups:
$$\sum_{n=2^k}^{2^{k+1}-1} a_n \in [2^k a_{2^{k+1}},\ 2^k a_{2^k}].$$
Summing over $k$ and comparing to $\sum 2^k a_{2^k}$: both series converge together. $\blacksquare$

### Why it's useful
Condensed series often collapse to geometric series or to series with simpler structure.

- $a_n = 1/n$: $2^k \cdot 1/2^k = 1$ constant — diverges. Matches harmonic series.
- $a_n = 1/n^p$: $2^k \cdot 1/2^{kp} = (2^{1-p})^k$, geometric, converges iff $2^{1-p} < 1$ iff $p > 1$.
- $a_n = 1/(n \ln n)$: $2^k \cdot 1/(2^k \ln 2^k) = 1/(k \ln 2)$, a harmonic-like series, diverges.

---

## 13.8 Raabe's Test

> **Theorem (Raabe).** Let $a_n > 0$ with $a_n/a_{n+1} = 1 + R_n/n$. If $R_n \to R$:
> - $R > 1$: $\sum a_n$ converges.
> - $R < 1$: $\sum a_n$ diverges.
> - $R = 1$: inconclusive (use Gauss).

Equivalently: set $L = \lim n(a_n/a_{n+1} - 1)$.
- $L > 1$: converges.
- $L < 1$: diverges.
- $L = 1$: inconclusive.

### When to use
When the ratio test gives $\lim a_{n+1}/a_n = 1$, the deviation from $1$ is $O(1/n)$ — Raabe measures that deviation.

### Examples

- $a_n = \frac{(2n)!}{4^n (n!)^2} \cdot \frac{1}{n+1}$ (e.g., appears in binomial series). Ratio $a_{n+1}/a_n$ is close to $1$; Raabe's test yields convergence.

- $\sum 1/n^p$: $a_n/a_{n+1} = ((n+1)/n)^p = (1 + 1/n)^p \approx 1 + p/n$. So $R = p$. Raabe: converges iff $p > 1$. Agrees with $p$-series.

---

## 13.9 Gauss's Test

> **Theorem (Gauss).** Let $a_n > 0$ with
> $$\frac{a_n}{a_{n+1}} = 1 + \frac{\alpha}{n} + O\!\left(\frac{1}{n^{1+\delta}}\right)$$
> for some $\delta > 0$ (more generally, $O(1/n^{1+\delta})$ is replaced by a bounded sequence times $1/n^{1+\delta}$). Then:
> - $\alpha > 1$: $\sum a_n$ converges.
> - $\alpha \leq 1$: $\sum a_n$ diverges.

Gauss's test covers the Raabe borderline case $R = 1$ by examining the next-order behaviour.

### Example

$a_n = \frac{\alpha(\alpha+1)\cdots(\alpha+n-1)}{n! \cdot \beta(\beta+1)\cdots(\beta+n-1)}$ (hypergeometric series). Ratio computed explicitly:
$$a_n/a_{n+1} = \frac{(n+1)(\beta+n)}{(n+1)(\alpha+n)} \approx 1 + \frac{\beta - \alpha}{n} + O(1/n^2).$$
By Gauss: converges iff $\beta - \alpha > 1$, i.e., $\beta > \alpha + 1$.

---

## 13.10 Strategy — Which Test to Use?

1. **Always** check $a_n \to 0$ first. If not: diverges.
2. **Familiar form?** Geometric → known; $p$-series → known.
3. **Factorials/exponentials?** Ratio test.
4. **$n$-th power?** Root test.
5. **Algebraic $a_n$ dominated by simple $b_n$?** Comparison or limit comparison.
6. **Monotone positive with continuous analogue?** Integral test.
7. **Monotone positive, slow variation?** Cauchy condensation.
8. **Ratio test gave $1$?** Raabe. If Raabe gives $1$, Gauss.

### Example of combining tests

$\sum \frac{n^n}{3^n n!}$. Ratio: $a_{n+1}/a_n = \frac{(n+1)^{n+1} \cdot 3^n n!}{3^{n+1}(n+1)! \cdot n^n} = \frac{(n+1)^n}{3 n^n} = \frac{(1+1/n)^n}{3} \to e/3 < 1$. Converges by ratio.

---

## Worked Examples

**Example 1:** Test $\sum \frac{n!}{n^n}$ for convergence.

*Solution:* Ratio test: $\frac{a_{n+1}}{a_n} = \frac{(n+1)!}{(n+1)^{n+1}} \cdot \frac{n^n}{n!} = \frac{(n+1) n^n}{(n+1)^{n+1}} = \left(\frac{n}{n+1}\right)^n = \frac{1}{(1+1/n)^n} \to \frac{1}{e} < 1$. Converges. $\blacksquare$

---

**Example 2:** Test $\sum \frac{n^3}{2^n}$.

*Solution:* Ratio: $\frac{a_{n+1}}{a_n} = \frac{(n+1)^3}{2^{n+1}} \cdot \frac{2^n}{n^3} = \frac{1}{2}\left(1 + \frac{1}{n}\right)^3 \to \frac{1}{2} < 1$. Converges. $\blacksquare$

---

**Example 3:** Test $\sum \frac{1}{n \log^2 n}$ (for $n \geq 2$).

*Solution:* Integral test: $f(x) = 1/(x (\log x)^2)$ is decreasing and positive for $x \geq 2$.
$$\int_2^\infty \frac{dx}{x(\log x)^2} = \left[-\frac{1}{\log x}\right]_2^\infty = 0 - \left(-\frac{1}{\log 2}\right) = \frac{1}{\log 2} < \infty.$$
Converges. $\blacksquare$

---

**Example 4:** Test $\sum n^{-1-1/n}$.

*Solution:* Here $a_n = 1/n \cdot 1/n^{1/n}$. Since $n^{1/n} \to 1$, $a_n \sim 1/n$, so $\sum a_n$ diverges by limit comparison with harmonic series. $\blacksquare$

---

**Example 5:** Test $\sum \frac{(n!)^2}{(2n)!}$.

*Solution:* Ratio: $\frac{a_{n+1}}{a_n} = \frac{((n+1)!)^2}{(2n+2)!} \cdot \frac{(2n)!}{(n!)^2} = \frac{(n+1)^2}{(2n+1)(2n+2)} = \frac{n+1}{2(2n+1)} \to \frac{1}{4} < 1$. Converges. $\blacksquare$

---

## Practice Problems

1. Determine convergence of:
   - (a) $\sum \frac{n+1}{n^2 + 2n + 3}$
   - (b) $\sum \frac{1}{(\ln n)^2}$ ($n \geq 2$)
   - (c) $\sum \frac{n!}{10^n}$
   - (d) $\sum \frac{1}{n!}$
   - (e) $\sum \frac{2^n}{n^{100}}$

2. Show that $\sum \frac{1}{n^p (\ln n)^q}$ (for $n \geq 2$) converges iff $p > 1$ or ($p = 1$ and $q > 1$).

3. Apply Raabe's test to $\sum \frac{1 \cdot 3 \cdot 5 \cdots (2n-1)}{2 \cdot 4 \cdot 6 \cdots (2n)}$. Does it converge?

4. Test $\sum \left(1 - \cos(1/n)\right)$ using limit comparison.

5. Prove that if $\sum a_n$ converges absolutely and $(b_n)$ is bounded, then $\sum a_n b_n$ converges absolutely.

### Solutions

**1(a).** $a_n = (n+1)/(n^2 + 2n + 3) \sim 1/n$. Limit comparison with $\sum 1/n$: diverges.

**1(b).** $1/(\ln n)^2$. For large $n$: $\ln n < \sqrt{n}$ eventually, so $(\ln n)^2 < n$, so $1/(\ln n)^2 > 1/n$. Compare with harmonic: diverges.

**1(c).** Ratio: $(n+1)!/10^{n+1} \cdot 10^n/n! = (n+1)/10 \to \infty > 1$. Diverges.

**1(d).** Ratio: $1/(n+1)! \cdot n! = 1/(n+1) \to 0 < 1$. Converges. (Sum is $e - 1$.)

**1(e).** Ratio: $2^{n+1}/(n+1)^{100} \cdot n^{100}/2^n = 2(n/(n+1))^{100} \to 2 > 1$. Diverges. (Exponential beats polynomial.)

**2.** Cauchy condensation. $a_n = 1/(n^p(\ln n)^q)$, decreasing. Condensed terms:
$$2^k a_{2^k} = 2^k \cdot \frac{1}{2^{kp} (k \ln 2)^q} = \frac{1}{(k \ln 2)^q} \cdot 2^{k(1-p)}.$$

Case $p > 1$: $2^{k(1-p)}$ decays geometrically, dominating factor $1/k^q$; converges.
Case $p < 1$: $2^{k(1-p)} \to \infty$, series diverges.
Case $p = 1$: series becomes $\sum 1/(k \ln 2)^q = C \sum 1/k^q$; converges iff $q > 1$. $\blacksquare$

**3.** $a_n = \prod_{k=1}^n (2k-1)/(2k)$. $a_n/a_{n+1} = (2n+2)/(2n+1) = 1 + 1/(2n+1)$. So $n(a_n/a_{n+1} - 1) = n/(2n+1) \to 1/2 < 1$. Raabe: **diverges**. (In fact $a_n \sim C/\sqrt{n}$ by Stirling, consistent with $\sum 1/\sqrt{n}$ divergence.) $\blacksquare$

**4.** $1 - \cos(1/n) \sim (1/n)^2/2 = 1/(2n^2)$ (Taylor expansion of $\cos$). Limit comparison with $\sum 1/n^2$: $L = 1/2 \in (0, \infty)$. $\sum 1/n^2$ converges, so our series converges. $\blacksquare$

**5.** $|b_n| \leq M$. Then $|a_n b_n| \leq M |a_n|$, and $\sum M|a_n| = M\sum |a_n| < \infty$. Comparison: $\sum |a_n b_n| < \infty$, hence $\sum a_n b_n$ converges absolutely (and hence converges). $\blacksquare$

---

## Related Topics
- [[12-infinite-series-introduction]] — series foundations, Cauchy criterion
- [[14-alternating-and-absolute-convergence]] — alternating series, abs vs cond
- [[15-rearrangement-of-series]] — rearrangements of conditional series
- [[10-cauchy-sequences-completeness]] — Cauchy criterion underlies all tests
- [[25-riemann-stieltjes-integral]] — integral test formally uses Riemann integrals
