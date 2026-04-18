# 19. CO3 Practice Problems — Series, Continuity, Limits of Functions

These problems cover CO3 (Lessons 17-25), specifically:
- Infinite series: convergence tests, absolute vs conditional
- Rearrangements and double series
- Limits of functions, ε-δ continuity
- Types of discontinuities, monotonic functions
- IVT, EVT, uniform continuity

---

## Part A: Series Convergence Tests

### Problem A1
Determine convergence: $\displaystyle \sum_{n=1}^{\infty} \dfrac{n^2}{3^n}$.

**Solution.** Ratio test:
$$\left|\frac{a_{n+1}}{a_n}\right| = \frac{(n+1)^2}{3^{n+1}} \cdot \frac{3^n}{n^2} = \frac{(n+1)^2}{3 n^2} \to \frac{1}{3} < 1.$$
Converges. $\blacksquare$

([[13-series-convergence-tests]])

---

### Problem A2
Determine convergence: $\displaystyle \sum_{n=2}^{\infty} \dfrac{1}{n(\ln n)^2}$.

**Solution.** Integral test: $\int_2^\infty \dfrac{dx}{x (\ln x)^2} = \left[-\frac{1}{\ln x}\right]_2^\infty = \frac{1}{\ln 2}$. Finite, so converges. $\blacksquare$

([[13-series-convergence-tests]])

---

### Problem A3
For which $p$ does $\displaystyle \sum_{n=2}^{\infty} \dfrac{1}{n^p \ln n}$ converge?

**Solution.** For $p > 1$: compare with $\sum 1/n^p$ — if $p > 1$, $1/(n^p \ln n) \leq 1/n^p$, so converges.

For $p = 1$: $\sum 1/(n \ln n)$ diverges by integral test ($\int dx/(x \ln x) = \ln \ln x$).

For $p < 1$: compare with $\sum 1/n^p \ln n$, which for small $p$ diverges by integral test.

Answer: converges iff $p > 1$. $\blacksquare$

([[13-series-convergence-tests]])

---

### Problem A4
Test: $\displaystyle \sum_{n=1}^{\infty} \left(\sqrt{n+1} - \sqrt{n}\right)$.

**Solution.** Telescoping: $S_N = \sqrt{N+1} - 1 \to \infty$. Diverges. Alternatively, $\sqrt{n+1} - \sqrt{n} = 1/(\sqrt{n+1} + \sqrt{n}) \sim 1/(2\sqrt{n})$, which is a $p$-series with $p = 1/2 \leq 1$, diverges. $\blacksquare$

([[12-infinite-series-introduction]])

---

### Problem A5
Test absolute/conditional convergence: $\displaystyle \sum_{n=1}^{\infty} \dfrac{(-1)^{n+1}}{\sqrt{n}}$.

**Solution.** $|a_n| = 1/\sqrt{n}$, and $\sum 1/\sqrt{n}$ diverges ($p = 1/2$). Not absolutely convergent.

Alternating with $|a_n| \downarrow 0$: converges by Leibniz. **Conditionally convergent**. $\blacksquare$

([[14-alternating-and-absolute-convergence]])

---

### Problem A6
Discuss convergence of $\displaystyle \sum_{n=1}^{\infty} \dfrac{n!}{n^n}$.

**Solution.** Ratio test:
$$\left|\frac{a_{n+1}}{a_n}\right| = \frac{(n+1)!}{(n+1)^{n+1}} \cdot \frac{n^n}{n!} = \frac{n^n}{(n+1)^n} = \left(\frac{n}{n+1}\right)^n = \left(1 + \frac{1}{n}\right)^{-n} \to \frac{1}{e} < 1.$$
Converges. $\blacksquare$

([[13-series-convergence-tests]])

---

## Part B: Rearrangements and Products

### Problem B1
Prove that the Cauchy product of two absolutely convergent series is absolutely convergent.

**Solution.** Let $A = \sum |a_n|, B = \sum |b_n|$ both finite. $c_n = \sum_k a_k b_{n-k}$. Then
$$\sum_{n=0}^N |c_n| \leq \sum_{n=0}^N \sum_{k=0}^n |a_k||b_{n-k}| = \sum_{\substack{i,j \geq 0 \\ i+j \leq N}} |a_i||b_j| \leq A B.$$
Bounded partial sums; absolutely convergent. $\blacksquare$

([[15-rearrangement-of-series]])

---

### Problem B2
Compute $\displaystyle \sum_{n=1}^{\infty} \dfrac{1}{n^2}$ using double sums (one standard approach: Basel problem via Fourier series, not needed here; instead use the comparison with $\sum 1/(n(n+1))$ and the result of Euler).

**Solution.** This is the **Basel problem**. Euler's answer: $\pi^2/6$. Proof requires Fourier series or complex analysis. Here just acknowledge this value is a standard known limit.

For the series to converge: $\sum 1/n^2 < \sum 1/(n(n-1)) + 1 = 1 + 1 = 2$, using telescoping $1/(n(n-1)) = 1/(n-1) - 1/n$. So the sum is finite; the exact value $\pi^2/6$ requires more advanced tools. $\blacksquare$

---

### Problem B3
Show via rearrangement that $\sum_{n=1}^{\infty} (-1)^{n+1}/n$ has a rearrangement summing to $\frac{3}{2} \ln 2$.

**Solution.** Standard construction: two positives then one negative.
$$1 + \frac{1}{3} - \frac{1}{2} + \frac{1}{5} + \frac{1}{7} - \frac{1}{4} + \cdots$$
The partial sums: group in triples. The $k$-th triple is $\frac{1}{4k-3} + \frac{1}{4k-1} - \frac{1}{2k}$. This sums to $\frac{3}{2} \ln 2$ (computation in [[15-rearrangement-of-series]]). $\blacksquare$

---

### Problem B4
Test: $\displaystyle \sum_{n=1}^{\infty} \dfrac{\sin n}{n}$.

**Solution.** Dirichlet: $b_n = \sin n$ has bounded partial sums ($\left|\sum_{k=1}^N \sin k\right| \leq 1/\sin(1/2) \approx 2.08$), and $1/n \downarrow 0$. So converges.

Absolute: $\sum |\sin n|/n$ diverges (comparison with harmonic). **Conditionally convergent**. $\blacksquare$

([[14-alternating-and-absolute-convergence]])

---

## Part C: Limits of Functions

### Problem C1
Compute $\lim_{x \to 0} \dfrac{1 - \cos x}{x^2}$ using ε-δ and known limits.

**Solution.** $1 - \cos x = 2 \sin^2(x/2)$, so
$$\frac{1 - \cos x}{x^2} = \frac{2 \sin^2(x/2)}{x^2} = \frac{1}{2} \left(\frac{\sin(x/2)}{x/2}\right)^2 \to \frac{1}{2}. \ \blacksquare$$

([[18-important-limits-infinite-limits]])

---

### Problem C2
Prove using ε-δ: $\lim_{x \to 2}(x^2 + 1) = 5$.

**Solution.** $|(x^2 + 1) - 5| = |x^2 - 4| = |x-2||x+2|$. Restrict $|x - 2| < 1$: $1 < x < 3$ so $|x+2| < 5$. Then $|x^2 - 4| < 5|x-2|$. Choose $\delta = \min(1, \varepsilon/5)$. $\blacksquare$

([[16-continuity]])

---

### Problem C3
Show that $\lim_{x \to 0} \sin(1/x)$ does not exist.

**Solution.** Take $x_n = 1/(n \pi) \to 0$: $\sin(1/x_n) = 0 \to 0$. Take $y_n = 1/(2 n\pi + \pi/2) \to 0$: $\sin(1/y_n) = 1$. Two sequences with different images; by Heine's criterion, no limit. $\blacksquare$

([[16-continuity]])

---

### Problem C4
Compute $\lim_{x \to \infty} (\sqrt{x^2 + x} - x)$.

**Solution.** Rationalise:
$$\sqrt{x^2+x} - x = \frac{x^2 + x - x^2}{\sqrt{x^2+x} + x} = \frac{x}{\sqrt{x^2+x}+x} = \frac{1}{\sqrt{1+1/x} + 1} \to \frac{1}{2}. \ \blacksquare$$

([[18-important-limits-infinite-limits]])

---

## Part D: Continuity

### Problem D1
Let $f(x) = \dfrac{x^2 - 1}{x - 1}$ for $x \neq 1$, $f(1) = 3$. Is $f$ continuous at $x = 1$?

**Solution.** $\lim_{x \to 1} f(x) = \lim_{x \to 1}(x + 1) = 2 \neq 3 = f(1)$. **Removable discontinuity** at $1$. $\blacksquare$

([[17-types-of-discontinuity-monotonic]])

---

### Problem D2
Prove: if $f$ is continuous on $[a, b]$ and $f(a) < 0 < f(b)$, then some $c \in (a, b)$ with $f(c) = 0$.

**Solution.** This is the **IVT** applied with $\gamma = 0$. Details in [[20-ivt-and-connectedness]]. $\blacksquare$

---

### Problem D3
Show that $f(x) = \sin(1/x)$ for $x \neq 0$ has no continuous extension at $x = 0$.

**Solution.** By Problem C3, $\lim_{x \to 0} \sin(1/x)$ does not exist. So no value of $f(0)$ makes it continuous. Essential discontinuity (2nd kind). $\blacksquare$

([[17-types-of-discontinuity-monotonic]])

---

### Problem D4
Classify the discontinuity of $f(x) = x - \lfloor x \rfloor$ at each integer.

**Solution.** At $x = n$ (integer): 
$f(n^-) = \lim_{x \to n^-} (x - \lfloor x \rfloor) = \lim (x - (n-1)) = 1$.
$f(n^+) = \lim_{x \to n^+} (x - \lfloor x \rfloor) = \lim (x - n) = 0$.
$f(n) = n - n = 0$.

Jump discontinuity (magnitude 1) at every integer. $\blacksquare$

([[17-types-of-discontinuity-monotonic]])

---

### Problem D5 (Thomae)
Classify the continuity of Thomae's function: $T(x) = 1/q$ if $x = p/q$ in lowest terms, $T(x) = 0$ if $x$ irrational, $T(0) = 1$.

**Solution.** Continuous at every irrational, discontinuous at every rational. See [[16-continuity]] Example 4.

---

## Part E: Compactness, IVT, EVT

### Problem E1
Prove: a continuous function on a compact set attains its maximum.

**Solution.** $f : K \to \mathbb{R}$ continuous, $K$ compact. $f(K)$ is compact (image of compact under continuous). Closed bounded subset of $\mathbb{R}$ contains its sup, so $f$ attains max. $\blacksquare$

([[20-ivt-and-connectedness]])

---

### Problem E2
Prove: every polynomial of odd degree has a real root.

**Solution.** Odd degree $p$ with positive leading coefficient: $p(x) \to +\infty$ as $x \to +\infty$, $p(x) \to -\infty$ as $x \to -\infty$. Pick $M$ large: $p(-M) < 0 < p(M)$. By IVT on $[-M, M]$, some $c$ with $p(c) = 0$. $\blacksquare$

([[20-ivt-and-connectedness]])

---

### Problem E3
Show that $f(x) = x^2$ is uniformly continuous on $[0, 5]$ but not on $[0, \infty)$.

**Solution.**

**On $[0, 5]$.** $|x^2 - y^2| = |x-y||x+y| \leq 10 |x - y|$. Take $\delta = \varepsilon / 10$.

**On $[0, \infty)$.** Consider $x_n = n$, $y_n = n + 1/n$. $|x_n - y_n| = 1/n \to 0$, but $|x_n^2 - y_n^2| = 2 + 1/n^2 \not\to 0$. So no $\delta$ works uniformly. $\blacksquare$

([[20-ivt-and-connectedness]])

---

### Problem E4
Prove: if $f : K \to \mathbb{R}^n$ is continuous with $K$ compact, then $f$ is uniformly continuous.

**Solution.** Heine-Cantor theorem ([[20-ivt-and-connectedness]]). Proof by contradiction using compactness to extract a convergent subsequence from a "failing" family of pairs $(x_n, y_n)$ with $|x_n - y_n| \to 0$ but $|f(x_n) - f(y_n)| \geq \varepsilon_0$. $\blacksquare$

---

## Part F: Mixed

### Problem F1
Show: if $f : [0, 1] \to [0, 1]$ is continuous, then $f$ has a fixed point.

**Solution.** Let $g(x) = f(x) - x$. $g(0) = f(0) \geq 0$, $g(1) = f(1) - 1 \leq 0$. IVT: some $c$ with $g(c) = 0$, i.e., $f(c) = c$. $\blacksquare$

([[20-ivt-and-connectedness]])

---

### Problem F2
Prove: a function continuous on $\mathbb{R}$ with $\lim_{|x| \to \infty} f(x) = 0$ attains max or min on $\mathbb{R}$ (possibly zero).

**Solution.** If $f \equiv 0$, done. Else WLOG some $x_0$ with $f(x_0) > 0$. Choose $M$ with $|f(x)| < f(x_0)/2$ for $|x| > M$. On compact $[-M, M]$, $f$ attains its max by EVT; this max $\geq f(x_0)$, hence is $\geq f$ everywhere. Global max attained. $\blacksquare$

([[20-ivt-and-connectedness]])

---

### Problem F3
Let $f$ continuous on $[a, b]$ with $f(a) = f(b)$. Show $f$ attains some value at least twice in $[a, b]$.

**Solution.** Obvious at endpoints. If $f$ constant, attains every value infinitely. Else some $c \in (a, b)$ with $f(c) \neq f(a)$. Say $f(c) > f(a)$. Then any value $\gamma \in (f(a), f(c))$ is attained on $[a, c]$ by IVT and also on $[c, b]$ by IVT (since $f(b) = f(a) < \gamma < f(c)$). Two points. $\blacksquare$

([[20-ivt-and-connectedness]])

---

### Problem F4
Prove: a monotonic function on $[a, b]$ can have at most countably many discontinuities.

**Solution.** Theorem 17.7 in [[17-types-of-discontinuity-monotonic]]. Each discontinuity (jump) corresponds to an open interval in the image; pick a rational in each; disjoint intervals give distinct rationals; $\mathbb{Q}$ countable. $\blacksquare$

---

### Problem F5
Let $f, g$ continuous on $[a, b]$ with $f \leq g$ on $\mathbb{Q} \cap [a, b]$. Show $f \leq g$ on $[a, b]$.

**Solution.** $g - f$ continuous, and $(g - f)(q) \geq 0$ for every rational $q \in [a, b]$. If $(g - f)(c) < 0$ for some $c$, by continuity there's a neighbourhood where $g - f < 0$; this neighbourhood contains rationals (density), contradiction. So $g - f \geq 0$ everywhere. $\blacksquare$

---

## Summary

| Problem Topic | Key lesson | Core technique |
|---|---|---|
| A1-A6 | [[13-series-convergence-tests]], [[14-alternating-and-absolute-convergence]] | Ratio, root, integral, Leibniz, Dirichlet |
| B1-B4 | [[15-rearrangement-of-series]] | Cauchy product, rearrangement |
| C1-C4 | [[16-continuity]], [[18-important-limits-infinite-limits]] | ε-δ, standard limits |
| D1-D5 | [[17-types-of-discontinuity-monotonic]] | Discontinuity classification |
| E1-E4 | [[20-ivt-and-connectedness]] | EVT, IVT, Heine-Cantor |
| F1-F5 | multiple | Fixed-point, monotonic, dense values |

---

## Related Topics

- [[12-infinite-series-introduction]] through [[20-ivt-and-connectedness]] — CO3 content
- [[22-differentiation]] — next unit (CO4) builds on continuity
