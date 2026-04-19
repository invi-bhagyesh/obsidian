# 26. CO5 Practice Problems — Differentiation, MVT, L'Hopital, Vector Derivatives, Riemann-Stieltjes

> **Scope.** This is a comprehensive problem set for **CO5** (Lessons 22–25 of MAT 2234), covering differentiation, mean value theorems, L'Hopital's rule, vector derivatives, and the Riemann-Stieltjes integral. Problems progress from $\varepsilon$-$\delta$ differentiability arguments, through applications of the Mean Value Theorem, L'Hopital's indeterminate forms, vector-valued derivatives, onto partitions and upper/lower sums for the Riemann-Stieltjes integral, the Darboux integrability criterion, the reduction theorem linking the Stieltjes integral to the classical Riemann integral and to summation, and finally to the Fundamental Theorem of Calculus, integration by parts, change of variables, and mean-value theorems for integrals.
>
> **Prerequisites:** [[22-differentiation]], [[23-mean-value-theorems]], [[24-lhopital-vector-derivatives]], [[25-riemann-stieltjes-integral]].
>
> Each part contains fully worked solutions at graduate qualifying-exam quality. For conceptual scaffolding, keep [[25-riemann-stieltjes-integral]] open alongside this set.

---

## 26.1 Part A — Partitions, Upper/Lower Sums, Darboux Criterion

**Problem 1.** Let $f(x) = x$ on $[0,1]$ and $\alpha(x) = x$. For the uniform partition $P_n = \{0, \tfrac{1}{n}, \tfrac{2}{n}, \ldots, 1\}$, compute $U(P_n, f, \alpha)$ and $L(P_n, f, \alpha)$, and show $U - L \to 0$.

**Problem 2.** Let $f(x) = x^2$ on $[0,1]$, $\alpha(x) = x$. For the partition $P_n$ from Problem 1, compute $L(P_n, f, \alpha)$ using the formula $\sum_{k=1}^{n} k^2 = \tfrac{n(n+1)(2n+1)}{6}$, and show it converges to $\tfrac{1}{3}$.

**Problem 3.** Let $f(x) = c$ (constant) on $[a,b]$, $\alpha$ any monotone increasing function. Show $U(P, f, \alpha) = L(P, f, \alpha) = c[\alpha(b) - \alpha(a)]$ for every partition $P$, hence $\int_a^b c \, d\alpha = c[\alpha(b) - \alpha(a)]$.

**Problem 4.** Let $f$ be monotone increasing on $[a,b]$, $\alpha(x) = x$. For the uniform partition $P_n$ of width $h = (b-a)/n$, show
$$U(P_n, f, \alpha) - L(P_n, f, \alpha) = h\,[f(b) - f(a)].$$
Conclude: every monotone function on $[a,b]$ is Riemann integrable.

**Problem 5.** Let $f(x) = \lfloor x \rfloor$ on $[0, 3]$, $\alpha(x) = x$. Compute $\int_0^3 f \, dx$ directly from the definition by using partitions that include the jump points $1, 2$.

**Problem 6 (Refinement).** Let $P \subseteq P^*$ be partitions of $[a,b]$. Prove $L(P, f, \alpha) \leq L(P^*, f, \alpha) \leq U(P^*, f, \alpha) \leq U(P, f, \alpha)$.

### Solutions — Part A

**Solution 1.**

*Setup.* Let $x_k = k/n$ for $k = 0, 1, \ldots, n$, so $\Delta x_k := x_k - x_{k-1} = 1/n$ and consequently $\Delta \alpha_k = \alpha(x_k) - \alpha(x_{k-1}) = 1/n$ since $\alpha(x) = x$.

*Strategy.* Exploit monotonicity of $f(x) = x$ to identify $M_k$ and $m_k$ explicitly, then sum.

*Computation.*

1. Since $f$ is strictly increasing on $[0,1]$, on each subinterval $[x_{k-1}, x_k]$ we have
$$M_k := \sup_{[x_{k-1}, x_k]} f = x_k = \frac{k}{n}, \qquad m_k := \inf_{[x_{k-1}, x_k]} f = x_{k-1} = \frac{k-1}{n}.$$

2. Compute the upper sum:
$$U(P_n, f, \alpha) = \sum_{k=1}^{n} M_k \Delta \alpha_k = \sum_{k=1}^{n} \frac{k}{n} \cdot \frac{1}{n} = \frac{1}{n^2} \sum_{k=1}^{n} k = \frac{1}{n^2} \cdot \frac{n(n+1)}{2} = \frac{n+1}{2n}.$$

3. Compute the lower sum:
$$L(P_n, f, \alpha) = \sum_{k=1}^{n} m_k \Delta \alpha_k = \sum_{k=1}^{n} \frac{k-1}{n} \cdot \frac{1}{n} = \frac{1}{n^2} \sum_{j=0}^{n-1} j = \frac{1}{n^2} \cdot \frac{(n-1)n}{2} = \frac{n-1}{2n}.$$

4. Their difference:
$$U(P_n) - L(P_n) = \frac{n+1}{2n} - \frac{n-1}{2n} = \frac{2}{2n} = \frac{1}{n} \xrightarrow{n \to \infty} 0.$$

5. By Darboux's criterion, $f \in \mathcal{R}[0,1]$, and since both $U(P_n), L(P_n) \to 1/2$:
$$\int_0^1 x \, dx = \lim_{n \to \infty} \frac{n+1}{2n} = \frac{1}{2}.$$

*Verification.* By the classical power rule, $\int_0^1 x \, dx = \tfrac{x^2}{2}\big|_0^1 = 1/2$. Agrees.

*Interpretation.* The symmetric arithmetic-mean structure of $(n+1)/(2n)$ and $(n-1)/(2n)$ around $1/2$ reflects the fact that the trapezoidal estimate equals the true value exactly for linear integrands. $\blacksquare$

---

**Solution 2.**

*Setup.* Same partition $P_n = \{k/n\}_{k=0}^{n}$ on $[0,1]$, now with $f(x) = x^2$. Since $f$ is increasing on $[0,1]$, $m_k = f(x_{k-1}) = (k-1)^2/n^2$ and $M_k = f(x_k) = k^2/n^2$.

*Strategy.* Sum the squares, take limits, check via the known antiderivative.

*Computation.*

1. Lower sum:
$$L(P_n) = \sum_{k=1}^{n} \frac{(k-1)^2}{n^2} \cdot \frac{1}{n} = \frac{1}{n^3} \sum_{k=1}^{n} (k-1)^2 = \frac{1}{n^3} \sum_{j=0}^{n-1} j^2.$$

2. Apply the closed form $\sum_{j=0}^{n-1} j^2 = \sum_{j=1}^{n-1} j^2 = \dfrac{(n-1)n(2n-1)}{6}$:
$$L(P_n) = \frac{(n-1)n(2n-1)}{6 n^3} = \frac{(1 - 1/n)(2 - 1/n)}{6} \xrightarrow{n \to \infty} \frac{1 \cdot 2}{6} = \frac{1}{3}.$$

3. Upper sum by analogous reasoning:
$$U(P_n) = \frac{1}{n^3} \sum_{k=1}^{n} k^2 = \frac{n(n+1)(2n+1)}{6 n^3} = \frac{(1 + 1/n)(2 + 1/n)}{6} \xrightarrow{n \to \infty} \frac{1}{3}.$$

4. Since $L(P_n), U(P_n) \to 1/3$, by the squeeze principle (and Darboux's criterion giving integrability),
$$\int_0^1 x^2 \, dx = \frac{1}{3}.$$

*Verification.* $U(P_n) - L(P_n) = \dfrac{1}{n^3}[n^2] = 1/n \to 0$, confirming integrability; and $\int_0^1 x^2 \, dx = x^3/3 \big|_0^1 = 1/3$ by the power rule. Agrees.

*Interpretation.* The cubic order in $n$ in the denominator exactly matches the quadratic growth of $k^2$ plus the linear number of subintervals — this is the archimedean cancellation that forces the Riemann sum to converge. $\blacksquare$

---

**Solution 3.**

*Setup.* $f \equiv c$ on $[a,b]$, $\alpha$ monotone increasing (so $\Delta \alpha_k = \alpha(x_k) - \alpha(x_{k-1}) \geq 0$). Let $P = \{x_0, x_1, \ldots, x_n\}$ be any partition.

*Strategy.* Show $\sup f = \inf f = c$ on every subinterval, then telescope.

*Computation.*

1. On each $[x_{k-1}, x_k]$, $f$ is constantly $c$, so
$$M_k = \sup_{[x_{k-1}, x_k]} f = c, \qquad m_k = \inf_{[x_{k-1}, x_k]} f = c.$$

2. Therefore
$$U(P, f, \alpha) = \sum_{k=1}^{n} c \cdot \Delta \alpha_k = c \sum_{k=1}^{n} [\alpha(x_k) - \alpha(x_{k-1})].$$

3. The sum telescopes:
$$\sum_{k=1}^{n} [\alpha(x_k) - \alpha(x_{k-1})] = \alpha(x_n) - \alpha(x_0) = \alpha(b) - \alpha(a).$$

4. Hence $U(P, f, \alpha) = c [\alpha(b) - \alpha(a)]$. The same computation gives $L(P, f, \alpha) = c[\alpha(b) - \alpha(a)]$.

5. Since the upper and lower sums coincide for every partition, the upper and lower Stieltjes integrals coincide:
$$\overline{\int_a^b} c \, d\alpha = \underline{\int_a^b} c \, d\alpha = c[\alpha(b) - \alpha(a)],$$
so $f \in \mathcal{R}(\alpha)$ on $[a,b]$ with
$$\boxed{\int_a^b c \, d\alpha = c[\alpha(b) - \alpha(a)].}$$

*Verification.* When $\alpha(x) = x$ this recovers the elementary $\int_a^b c \, dx = c(b-a)$. $\checkmark$

*Interpretation.* Constants are always Stieltjes-integrable against any monotone integrator, with the total integrator variation as the "weight." $\blacksquare$

---

**Solution 4.**

*Setup.* $f$ monotone increasing on $[a,b]$, $\alpha(x) = x$. Uniform partition $P_n$ with mesh $h = (b-a)/n$ and $x_k = a + kh$, $k = 0, \ldots, n$.

*Strategy.* Use monotonicity to identify $M_k$ and $m_k$, telescope the difference.

*Computation.*

1. By monotonicity, $M_k = f(x_k)$ and $m_k = f(x_{k-1})$, so
$$M_k - m_k = f(x_k) - f(x_{k-1}).$$

2. Since $\Delta \alpha_k = x_k - x_{k-1} = h$:
$$U(P_n) - L(P_n) = \sum_{k=1}^{n} (M_k - m_k) \, h = h \sum_{k=1}^{n} [f(x_k) - f(x_{k-1})].$$

3. The inner sum telescopes:
$$\sum_{k=1}^{n} [f(x_k) - f(x_{k-1})] = f(x_n) - f(x_0) = f(b) - f(a).$$

4. Therefore
$$\boxed{U(P_n, f, \alpha) - L(P_n, f, \alpha) = h \, [f(b) - f(a)].}$$

5. Given $\varepsilon > 0$, if $f(b) > f(a)$ choose $n > (b-a)[f(b)-f(a)]/\varepsilon$, equivalently
$$h < \frac{\varepsilon}{f(b) - f(a)},$$
so that $U(P_n) - L(P_n) < \varepsilon$. (If $f(b) = f(a)$, then $f$ is constant and integrability is trivial by Solution 3.)

6. By the Darboux criterion, $f \in \mathcal{R}[a,b]$.

*Verification.* Monotone decreasing $f$ is handled identically with $M_k = f(x_{k-1})$, $m_k = f(x_k)$, yielding $U - L = h[f(a) - f(b)]$.

*Interpretation.* This is the canonical proof that monotonicity suffices for Riemann integrability: the $U - L$ telescope is an order-of-magnitude $h \to 0$ argument requiring no modulus of continuity. $\blacksquare$

---

**Solution 5.**

*Setup.* $f(x) = \lfloor x \rfloor$: on $[0,1)$, $f = 0$; on $[1,2)$, $f = 1$; on $[2,3)$, $f = 2$; $f(3) = 3$.

*Strategy.* Use partitions that "trap" the jump points in arbitrarily short subintervals.

*Computation.*

1. For $\delta \in (0, 1/2)$ small, take
$$P_\delta = \{0, \, 1 - \delta, \, 1, \, 2 - \delta, \, 2, \, 3 - \delta, \, 3\}.$$
This has 6 subintervals.

2. Compute $M_k$, $m_k$, and widths on each:

| Subinterval | $m_k$ | $M_k$ | width |
| --- | --- | --- | --- |
| $[0, 1-\delta]$ | 0 | 0 | $1 - \delta$ |
| $[1 - \delta, 1]$ | 0 | 1 | $\delta$ |
| $[1, 2 - \delta]$ | 1 | 1 | $1 - \delta$ |
| $[2 - \delta, 2]$ | 1 | 2 | $\delta$ |
| $[2, 3 - \delta]$ | 2 | 2 | $1 - \delta$ |
| $[3 - \delta, 3]$ | 2 | 3 | $\delta$ |

3. Lower sum:
$$L(P_\delta) = 0(1-\delta) + 0 \cdot \delta + 1(1-\delta) + 1 \cdot \delta + 2(1-\delta) + 2 \cdot \delta.$$
Simplify: $1 - \delta + \delta + 2 - 2\delta + 2\delta = 3$.

4. Upper sum:
$$U(P_\delta) = 0(1-\delta) + 1 \cdot \delta + 1(1-\delta) + 2 \cdot \delta + 2(1-\delta) + 3 \cdot \delta.$$
Simplify: $\delta + (1 - \delta) + 2\delta + 2(1-\delta) + 3\delta = 1 + 2 + \delta + 2\delta - 2\delta + 3\delta - \delta = 3 + 3\delta$.

Let me re-do cleanly: $0 + \delta + (1-\delta) + 2\delta + (2 - 2\delta) + 3\delta = \delta + 1 - \delta + 2\delta + 2 - 2\delta + 3\delta = 3 + 3\delta$.

5. Difference: $U - L = 3\delta$. Since $\delta > 0$ was arbitrary, by Darboux's criterion $f \in \mathcal{R}[0,3]$.

6. As $\delta \to 0^+$, $L(P_\delta) = 3$ is constant and $U(P_\delta) \to 3$. Hence
$$\boxed{\int_0^3 \lfloor x \rfloor \, dx = 3.}$$

*Verification.* By additivity (Problem 16),
$$\int_0^3 \lfloor x \rfloor \, dx = \int_0^1 0 \, dx + \int_1^2 1 \, dx + \int_2^3 2 \, dx = 0 + 1 + 2 = 3. \checkmark$$

*Interpretation.* Jump discontinuities contribute zero to the Riemann integral as long as they form a set of measure zero (finitely many points here). The integrability of step functions is foundational for later extending via step-function approximation. $\blacksquare$

---

**Solution 6.**

*Setup.* $P \subseteq P^*$ means $P^*$ contains all points of $P$ plus possibly more.

*Strategy.* Reduce to adding one point at a time, compare $U$ (and $L$) before and after.

*Computation.*

1. *Reduction.* If $P^* = P \cup \{y_1, \ldots, y_m\}$ adds $m$ points, form the chain $P = P_0 \subset P_1 \subset \cdots \subset P_m = P^*$, each adding one point. Inequalities compose, so it suffices to prove the one-point case.

2. *One-point refinement.* Suppose $P^* = P \cup \{y\}$ with $y \in (x_{k-1}, x_k)$ for some $k$. Write $I = [x_{k-1}, x_k]$, $I' = [x_{k-1}, y]$, $I'' = [y, x_k]$.

3. *Upper sum comparison.* Let
$$M_k = \sup_{I} f, \quad M' = \sup_{I'} f, \quad M'' = \sup_{I''} f.$$
Since $I', I'' \subseteq I$, we have $M' \leq M_k$ and $M'' \leq M_k$.

4. The difference $U(P) - U(P^*)$ equals
$$M_k[\alpha(x_k) - \alpha(x_{k-1})] - M'[\alpha(y) - \alpha(x_{k-1})] - M''[\alpha(x_k) - \alpha(y)].$$
Write $A = \alpha(y) - \alpha(x_{k-1}) \geq 0$ and $B = \alpha(x_k) - \alpha(y) \geq 0$ (both $\geq 0$ by monotonicity of $\alpha$). Then $A + B = \alpha(x_k) - \alpha(x_{k-1})$, so
$$U(P) - U(P^*) = M_k(A + B) - M' A - M'' B = (M_k - M')A + (M_k - M'')B \geq 0.$$
Hence $U(P^*) \leq U(P)$.

5. *Lower sum comparison.* Let $m_k, m', m''$ be the corresponding infima. Then $m', m'' \geq m_k$, and by the symmetric computation
$$L(P^*) - L(P) = (m' - m_k) A + (m'' - m_k) B \geq 0,$$
giving $L(P^*) \geq L(P)$.

6. *Middle inequality.* $L(P^*) \leq U(P^*)$ holds for any partition because on each subinterval $\inf f \leq \sup f$ and $\Delta \alpha_k \geq 0$.

7. Combining:
$$L(P) \leq L(P^*) \leq U(P^*) \leq U(P). \qquad \blacksquare$$

*Verification.* This is the foundational monotonicity lemma: upper sums decrease under refinement, lower sums increase.

*Interpretation.* Refinement "squeezes" the gap between $U$ and $L$. It is the logical engine behind the Darboux criterion: $f \in \mathcal{R}(\alpha)$ iff for every $\varepsilon > 0$ some partition achieves $U - L < \varepsilon$. $\blacksquare$

---

## 26.2 Part B — Integrability of Specific Functions

**Problem 7.** Show that the Dirichlet function
$$\chi_{\mathbb{Q}}(x) = \begin{cases} 1 & x \in \mathbb{Q}, \\ 0 & x \notin \mathbb{Q} \end{cases}$$
is **not** Riemann integrable on $[0, 1]$.

**Problem 8.** Show that the Thomae function (popcorn function)
$$T(x) = \begin{cases} 1/q & x = p/q \in \mathbb{Q} \text{ in lowest terms}, \\ 0 & x \notin \mathbb{Q} \end{cases}$$
**is** Riemann integrable on $[0,1]$ with $\int_0^1 T = 0$.

**Problem 9.** Let $f(x) = x$ for $x$ rational, $f(x) = 0$ for $x$ irrational. Is $f$ Riemann integrable on $[0,1]$?

**Problem 10.** Let $f : [0,1] \to \mathbb{R}$ be defined by $f(0) = 0$, $f(x) = 1$ for $0 < x \leq 1$. Compute $\int_0^1 f$ directly from Darboux.

**Problem 11 (Step function with finite jumps).** Let $f : [0, 4] \to \mathbb{R}$ be defined by
$$f(x) = \begin{cases} 1 & 0 \leq x < 1, \\ 2 & 1 \leq x < 2, \\ 3 & 2 \leq x < 3, \\ 4 & 3 \leq x \leq 4. \end{cases}$$
Compute $\int_0^4 f \, dx$.

**Problem 12.** Let $f : [0, 1] \to \mathbb{R}$ with $f(x) = 1/n$ when $x \in (1/(n+1), 1/n]$ and $f(0) = 0$. Show $f \in \mathcal{R}[0,1]$ and compute $\int_0^1 f$.

### Solutions — Part B

**Solution 7.**

*Setup.* $\chi_\mathbb{Q}$ on $[0,1]$. We prove the upper and lower Darboux integrals differ.

*Strategy.* Use density of rationals and irrationals.

*Computation.*

1. Let $P = \{0 = x_0 < x_1 < \cdots < x_n = 1\}$ be any partition of $[0,1]$.

2. On each subinterval $[x_{k-1}, x_k]$ of positive length, by density:
   - Rationals in $[x_{k-1}, x_k]$ exist, so $\sup \chi_\mathbb{Q} = 1$, hence $M_k = 1$.
   - Irrationals in $[x_{k-1}, x_k]$ exist, so $\inf \chi_\mathbb{Q} = 0$, hence $m_k = 0$.

3. Therefore
$$U(P, \chi_\mathbb{Q}) = \sum_{k=1}^{n} 1 \cdot (x_k - x_{k-1}) = 1, \qquad L(P, \chi_\mathbb{Q}) = \sum_{k=1}^{n} 0 \cdot (x_k - x_{k-1}) = 0.$$

4. Taking the infimum over all $P$ of $U(P)$ and the supremum over all $P$ of $L(P)$:
$$\overline{\int_0^1} \chi_\mathbb{Q} = 1, \qquad \underline{\int_0^1} \chi_\mathbb{Q} = 0.$$

5. Since $\overline{\int} \neq \underline{\int}$, $\chi_\mathbb{Q} \notin \mathcal{R}[0,1]$.

*Verification.* Every partition yields $U - L = 1$, so the Darboux criterion fails uniformly; there is no hope of making $U - L < \varepsilon$ for $\varepsilon < 1$.

*Interpretation.* The Dirichlet function is the prototypical example of a bounded non-Riemann-integrable function — it motivates the Lebesgue theory: $\chi_\mathbb{Q}$ is Lebesgue integrable with integral $0$ because $\mathbb{Q} \cap [0,1]$ has Lebesgue measure zero. $\blacksquare$

---

**Solution 8.**

*Setup.* $T : [0,1] \to [0,1]$ with $T(x) = 1/q$ for $x = p/q$ in lowest terms, $T(x) = 0$ for $x$ irrational. Observe $0 \leq T \leq 1$.

*Strategy.* Irrationals dense $\Rightarrow L(P) = 0$ always. For $U(P) < \varepsilon$, isolate the "large" values ($T \geq 1/N$) in a thin strip.

*Computation.*

1. **Lower sum.** On any subinterval $[x_{k-1}, x_k]$ of positive length, by density of irrationals, $\inf T = 0$. Hence $L(P, T) = 0$ for every partition $P$, and thus
$$\underline{\int_0^1} T = 0.$$

2. **Upper sum — key estimate.** Fix $\varepsilon > 0$. Pick $N \in \mathbb{N}$ with $1/N < \varepsilon/2$, i.e., $N > 2/\varepsilon$.

3. Consider the set
$$A_N = \{x \in [0,1] : T(x) \geq 1/N\} = \{p/q \in [0,1] : q \leq N\}.$$
Since each $q \in \{1, 2, \ldots, N\}$ contributes at most $q + 1$ rationals $p/q \in [0,1]$, the set $A_N$ has size
$$|A_N| \leq \sum_{q=1}^{N} (q+1) = \frac{N(N+1)}{2} + N \leq N^2.$$
In particular $A_N$ is *finite*. Call $K_N := |A_N|$.

4. **Enclose $A_N$ in thin intervals.** Around each point $a \in A_N$, center an open interval $J_a$ of length $\varepsilon/(2 K_N)$. Total length of $V := \bigcup_{a \in A_N} J_a$ is at most $K_N \cdot \varepsilon/(2K_N) = \varepsilon/2$.

5. **Construct the partition.** Choose a partition $P$ of $[0,1]$ so that every subinterval $[x_{k-1}, x_k]$ is either:
   - (Type I) contained in $V \cup (\text{boundaries})$, contributing total $\alpha$-length $\leq \varepsilon/2$; or
   - (Type II) disjoint from $A_N$, so $T(x) < 1/N$ on the (open) interior.

6. **Bound $U(P)$.** 
   - Type I subintervals: $M_k \leq 1$ (since $T \leq 1$), total length $\leq \varepsilon/2$, contribution $\leq \varepsilon/2$.
   - Type II subintervals: $M_k < 1/N < \varepsilon/2$, total length $\leq 1$, contribution $< \varepsilon/2$.
   
   Summing:
$$U(P, T) < \varepsilon/2 + \varepsilon/2 = \varepsilon.$$

7. **Conclude.** Since $\varepsilon > 0$ was arbitrary,
$$\overline{\int_0^1} T \leq \inf_P U(P, T) \leq \varepsilon \quad \forall \varepsilon > 0 \Rightarrow \overline{\int_0^1} T = 0.$$

8. Combined with step 1, $\overline{\int} = \underline{\int} = 0$, so $T \in \mathcal{R}[0,1]$ with
$$\boxed{\int_0^1 T \, dx = 0.}$$

*Verification.* $T$ is continuous at every irrational and discontinuous at every rational. Its set of discontinuities is $\mathbb{Q} \cap [0,1]$, of Lebesgue measure zero. By Lebesgue's criterion for Riemann integrability (a bounded function is Riemann integrable iff its discontinuity set has measure zero), $T$ is Riemann integrable. $\checkmark$

*Interpretation.* The popcorn function is the textbook example where the Riemann theory successfully handles a wildly-discontinuous function — thanks to the "sparse" nature of its jumps. $\blacksquare$

---

**Solution 9.**

*Setup.* $f(x) = x$ on $\mathbb{Q} \cap [0,1]$, $f(x) = 0$ otherwise.

*Strategy.* Show $\overline{\int} \neq \underline{\int}$ via density.

*Computation.*

1. **Lower sum.** On any subinterval $[x_{k-1}, x_k] \subseteq [0,1]$ with $x_{k-1} < x_k$, there are irrationals, hence $\inf f \leq 0$. Because $f \geq 0$ for rationals and $f = 0$ for irrationals, $\inf f = 0$. Therefore $L(P, f) = 0$ for every $P$, so $\underline{\int_0^1} f = 0$.

2. **Upper sum.** On $[x_{k-1}, x_k]$ with $x_{k-1} \geq 0$, rationals are dense, and $f(x) = x$ on rationals is an increasing function; thus $\sup f = \sup\{x : x \in \mathbb{Q} \cap [x_{k-1}, x_k]\} = x_k$ (density again).
   
3. Hence $M_k = x_k$ and
$$U(P, f) = \sum_{k=1}^{n} x_k (x_k - x_{k-1}).$$

4. This is a right-endpoint Riemann sum for $\int_0^1 x \, dx = 1/2$. As the mesh of $P \to 0$, $U(P, f) \to 1/2$. Taking infimum over $P$:
$$\overline{\int_0^1} f = \inf_P U(P, f) = \frac{1}{2}.$$

5. Since $\overline{\int} = 1/2 \neq 0 = \underline{\int}$, $f \notin \mathcal{R}[0,1]$.

*Verification.* The discontinuity set of $f$ is $[0,1] \setminus \{0\}$ (at every point $x \in (0,1]$, one can approach via rationals giving limit $x$ and via irrationals giving limit $0$, which disagree when $x > 0$). This set has positive Lebesgue measure, so Lebesgue's criterion predicts non-integrability. $\checkmark$

*Interpretation.* A modification of Dirichlet: non-constant rational-indicator still fails, because the "discontinuity in the $f$-sense" is on a full-measure set. $\blacksquare$

---

**Solution 10.**

*Setup.* $f(0) = 0$, $f(x) = 1$ for $x \in (0,1]$.

*Strategy.* Isolate $x = 0$ in a tiny subinterval; elsewhere $f \equiv 1$.

*Computation.*

1. For $\delta \in (0, 1)$, let $P_\delta = \{0, \delta, 1\}$. Two subintervals: $[0, \delta]$ and $[\delta, 1]$.

2. On $[0, \delta]$: $m_1 = \inf\{f(0), f(\text{positive})\} = 0$, $M_1 = 1$. Width $\delta$.

3. On $[\delta, 1]$: $f \equiv 1$, so $m_2 = M_2 = 1$. Width $1 - \delta$.

4. $L(P_\delta) = 0 \cdot \delta + 1 \cdot (1 - \delta) = 1 - \delta$.

5. $U(P_\delta) = 1 \cdot \delta + 1 \cdot (1 - \delta) = 1$.

6. $U(P_\delta) - L(P_\delta) = 1 - (1 - \delta) = \delta$.

7. Given $\varepsilon > 0$, pick $\delta < \varepsilon$ to get $U - L < \varepsilon$. By Darboux, $f \in \mathcal{R}[0,1]$.

8. Passing to the limit $\delta \to 0^+$: $L(P_\delta) \to 1$, $U(P_\delta) = 1$, so
$$\int_0^1 f = 1.$$

*Verification.* $f$ equals $1$ on $(0,1]$, which has measure $1$; the single discontinuity at $x = 0$ is measure zero. Integral is $1 \cdot 1 = 1$. $\checkmark$

*Interpretation.* Altering a function at a single point never affects its Riemann integral. $\blacksquare$

---

**Solution 11.**

*Setup.* Step function $f$ on $[0,4]$, piecewise constant $1, 2, 3, 4$ on $[0,1), [1,2), [2,3), [3,4]$.

*Strategy.* Use the monotone integrability theorem (Problem 4) then evaluate via additivity.

*Computation.*

1. $f$ is monotone increasing on $[0,4]$ (values $1, 2, 3, 4$ on successive pieces). By Problem 4, $f \in \mathcal{R}[0,4]$.

2. By additivity (Problem 16):
$$\int_0^4 f = \int_0^1 f + \int_1^2 f + \int_2^3 f + \int_3^4 f.$$

3. Each integral over a sub-piece $[k, k+1)$ or $[3, 4]$: $f$ equals a constant $c_k \in \{1, 2, 3, 4\}$ except possibly at a single endpoint. Modifying $f$ at a single point does not change the Riemann integral (or apply Solution 10 on each piece). Hence
$$\int_k^{k+1} f = (k+1) \cdot 1 = k+1, \quad k = 0, 1, 2, 3.$$

4. Sum:
$$\int_0^4 f = 1 + 2 + 3 + 4 = \boxed{10}.$$

*Verification.* The step function has 3 jump discontinuities at $x = 1, 2, 3$, a finite set, hence measure zero. Lebesgue's criterion gives integrability. Value matches the geometric expectation (sum of rectangle areas). $\checkmark$

*Interpretation.* Step functions are the "easy" case of Riemann integrability and are foundational: every Riemann integrable function can be approximated in $L^1$ by step functions. $\blacksquare$

---

**Solution 12.**

*Setup.* $f(x) = 1/n$ on $\left( \dfrac{1}{n+1}, \dfrac{1}{n} \right]$ for $n = 1, 2, 3, \ldots$, $f(0) = 0$. Note: as $n$ increases, the intervals $(1/(n+1), 1/n]$ are *closer to $0$*, and $f$ there is *smaller* ($= 1/n \to 0$).

*Strategy.* Show $f$ is monotone increasing (as $x$ increases from $0$ to $1$, $f$ increases in discrete jumps), then integrate via the series.

*Computation.*

1. **Monotonicity.** For $x \in (1/(n+1), 1/n]$, $f(x) = 1/n$. As $x$ increases (so $n$ decreases), $1/n$ increases. Hence $f$ is monotone increasing on $(0, 1]$. With $f(0) = 0$, $f$ is increasing on $[0,1]$.

2. $f$ is bounded: $0 \leq f \leq 1$. By Problem 4, $f \in \mathcal{R}[0,1]$.

3. **Computation via additivity.** For any finite $N$, by additivity
$$\int_0^1 f = \int_0^{1/(N+1)} f + \sum_{n=1}^{N} \int_{1/(n+1)}^{1/n} f.$$

4. On $(1/(n+1), 1/n]$, $f \equiv 1/n$, so
$$\int_{1/(n+1)}^{1/n} f = \frac{1}{n} \cdot \left( \frac{1}{n} - \frac{1}{n+1} \right) = \frac{1}{n} \cdot \frac{1}{n(n+1)} = \frac{1}{n^2(n+1)}.$$

5. $\int_0^{1/(N+1)} f$: $f$ is bounded by $1/(N+1)$ there (since on $(1/(n+1), 1/n]$ with $n > N$, $f = 1/n \leq 1/(N+1)$), so
$$\left| \int_0^{1/(N+1)} f \right| \leq \frac{1}{N+1} \cdot \frac{1}{N+1} = \frac{1}{(N+1)^2} \to 0.$$

6. Hence
$$\int_0^1 f = \sum_{n=1}^{\infty} \frac{1}{n^2(n+1)}.$$

7. **Evaluate the series via partial fractions.** Decompose
$$\frac{1}{n^2(n+1)} = \frac{A}{n} + \frac{B}{n^2} + \frac{C}{n+1}.$$
Multiplying: $1 = A n (n+1) + B(n+1) + C n^2$. Setting $n = 0$: $B = 1$. Setting $n = -1$: $C = 1$. Coefficient of $n^2$: $A + C = 0$ so $A = -1$.

$$\frac{1}{n^2(n+1)} = -\frac{1}{n} + \frac{1}{n^2} + \frac{1}{n+1}.$$

8. Sum the series:
$$\sum_{n=1}^{\infty} \frac{1}{n^2(n+1)} = \sum_{n=1}^{\infty} \frac{1}{n^2} - \sum_{n=1}^{\infty} \left( \frac{1}{n} - \frac{1}{n+1} \right) = \frac{\pi^2}{6} - 1.$$

   (The second sum is telescoping with value $1$; the first is the Basel sum $\zeta(2) = \pi^2/6$.)

9. Therefore
$$\boxed{\int_0^1 f = \frac{\pi^2}{6} - 1 \approx 0.6449.}$$

*Verification.* $\pi^2/6 \approx 1.6449$, minus $1$ gives $\approx 0.6449$, which is a plausible value given $0 \leq f \leq 1$ on $[0,1]$. Cross-check: the main contribution comes from the $n = 1$ interval $(1/2, 1]$ where $f \equiv 1$, contributing $1 \cdot 1/2 = 1/2$, consistent with $0.6449 > 0.5$. $\checkmark$

*Interpretation.* This is a clean example of a monotone function whose integral is a non-elementary constant. It illustrates how series with $\zeta$-function values arise naturally in elementary integration. $\blacksquare$

---

## 26.3 Part C — Algebraic Properties of the Integral

**Problem 13 (Linearity).** Prove: if $f, g \in \mathcal{R}(\alpha)$ on $[a,b]$ and $c \in \mathbb{R}$, then $cf + g \in \mathcal{R}(\alpha)$ with
$$\int_a^b (cf + g) \, d\alpha = c \int_a^b f \, d\alpha + \int_a^b g \, d\alpha.$$

**Problem 14 (Monotonicity).** Prove: if $f, g \in \mathcal{R}(\alpha)$ on $[a,b]$ with $f \leq g$ pointwise, then $\int_a^b f \, d\alpha \leq \int_a^b g \, d\alpha$.

**Problem 15 ($|\int| \leq \int |\cdot|$).** Show that if $f \in \mathcal{R}(\alpha)$ on $[a, b]$ then $|f| \in \mathcal{R}(\alpha)$ and
$$\left| \int_a^b f \, d\alpha \right| \leq \int_a^b |f| \, d\alpha.$$

**Problem 16 (Additivity in the interval).** Let $a < c < b$ and $f \in \mathcal{R}(\alpha)$ on $[a, b]$. Show $f \in \mathcal{R}(\alpha)$ on $[a, c]$ and on $[c, b]$ with
$$\int_a^b f \, d\alpha = \int_a^c f \, d\alpha + \int_c^b f \, d\alpha.$$

**Problem 17.** If $f \in \mathcal{R}(\alpha)$ on $[a,b]$ and $|f(x)| \leq M$ for all $x$, show $\left|\int_a^b f \, d\alpha\right| \leq M[\alpha(b) - \alpha(a)]$.

### Solutions — Part C

**Solution 13.**

*Setup.* Given $f, g \in \mathcal{R}(\alpha)$ on $[a,b]$, $c \in \mathbb{R}$. We must show $cf + g \in \mathcal{R}(\alpha)$ and compute its integral.

*Strategy.* Decompose into three steps: (i) integrability and linearity for sum, (ii) for scalar multiple with $c \geq 0$, (iii) for $c < 0$ via negation.

*Case (i) — Sum $f + g$.*

1. **Sup/inf inequalities.** On any subinterval $I$, 
$$\sup_I (f + g) \leq \sup_I f + \sup_I g, \qquad \inf_I (f + g) \geq \inf_I f + \inf_I g.$$
(First: $f(x) + g(x) \leq \sup f + \sup g$; take sup in $x$. Second: symmetric.)

2. Hence for any partition $P$:
$$U(P, f+g, \alpha) \leq U(P, f, \alpha) + U(P, g, \alpha),$$
$$L(P, f+g, \alpha) \geq L(P, f, \alpha) + L(P, g, \alpha).$$

3. **Integrability.** Given $\varepsilon > 0$, by Darboux pick $P_1, P_2$ with $U(P_i, \cdot, \alpha) - L(P_i, \cdot, \alpha) < \varepsilon/2$ for $f, g$ respectively. Let $P$ be a common refinement of $P_1, P_2$. Then by Problem 6, $U(P, f) - L(P, f) < \varepsilon/2$ and similarly for $g$. Thus
$$U(P, f+g, \alpha) - L(P, f+g, \alpha) \leq [U(P,f) + U(P,g)] - [L(P,f) + L(P,g)] < \varepsilon.$$
Hence $f + g \in \mathcal{R}(\alpha)$.

4. **Value of the integral.** From step 2, taking inf over $P$:
$$\overline{\int}(f + g) \leq \int f + \int g.$$
From the other inequality, taking sup over $P$:
$$\underline{\int}(f + g) \geq \int f + \int g.$$
Since $\underline{\int}(f+g) = \overline{\int}(f+g) = \int(f+g)$, we get
$$\int (f+g) \, d\alpha = \int f \, d\alpha + \int g \, d\alpha.$$

*Case (ii) — Scalar $cf$ with $c \geq 0$.*

5. For $c \geq 0$: $\sup_I (cf) = c \sup_I f$ and $\inf_I (cf) = c \inf_I f$. Hence $U(P, cf, \alpha) = c U(P, f, \alpha)$ and $L(P, cf, \alpha) = c L(P, f, \alpha)$.

6. $U(P, cf) - L(P, cf) = c[U(P,f) - L(P,f)]$. For any $\varepsilon > 0$, pick $P$ with $U - L < \varepsilon/(c+1)$ (to avoid division by zero if $c = 0$); then $U - L$ for $cf$ is $< c \varepsilon/(c+1) \leq \varepsilon$. So $cf \in \mathcal{R}(\alpha)$, and clearly $\int cf \, d\alpha = c \int f \, d\alpha$.

*Case (iii) — Scalar $cf$ with $c < 0$.*

7. It suffices to handle $c = -1$. Note $\sup_I (-f) = -\inf_I f$, so $U(P, -f, \alpha) = -L(P, f, \alpha)$ and $L(P, -f, \alpha) = -U(P, f, \alpha)$. Then
$$U(P, -f) - L(P, -f) = U(P, f) - L(P, f),$$
so $-f \in \mathcal{R}(\alpha)$, and $\int (-f) \, d\alpha = -\int f \, d\alpha$. For general $c < 0$, $cf = -|c| f$; combine case (ii) with $|c| \geq 0$ and the sign flip.

8. **Combining.** $cf + g \in \mathcal{R}(\alpha)$ with
$$\int (cf + g) = c \int f + \int g. \qquad \blacksquare$$

*Verification.* $c = 0$: $0 \cdot f + g = g$, integral is $\int g$. $c = 1$: $f + g$, integral is $\int f + \int g$. Both agree. $\checkmark$

*Interpretation.* The integral is a linear functional on $\mathcal{R}(\alpha)$. This makes $\mathcal{R}(\alpha)$ a vector space and $\int \cdot \, d\alpha : \mathcal{R}(\alpha) \to \mathbb{R}$ linear. $\blacksquare$

---

**Solution 14.**

*Setup.* $f \leq g$ pointwise on $[a,b]$, both in $\mathcal{R}(\alpha)$.

*Strategy.* Consider $h = g - f \geq 0$.

*Computation.*

1. By Problem 13, $h = g - f \in \mathcal{R}(\alpha)$.

2. For any partition $P$ and subinterval $I$: $h(x) \geq 0$ implies $\inf_I h \geq 0$, so $L(P, h, \alpha) \geq 0$ (since $\Delta \alpha_k \geq 0$).

3. Thus $\underline{\int} h \geq 0$, and since $h$ is integrable, $\int h \geq 0$.

4. By linearity: $\int h = \int g - \int f$, so $\int g - \int f \geq 0$, i.e., $\int f \leq \int g$. $\blacksquare$

*Verification.* If $f = g$, $\int f = \int g$ — equality, consistent. $\checkmark$

*Interpretation.* "Bigger integrand $\Rightarrow$ bigger integral." This, combined with linearity, means the integral is a positive linear functional. $\blacksquare$

---

**Solution 15.**

*Setup.* $f \in \mathcal{R}(\alpha)$; show $|f| \in \mathcal{R}(\alpha)$ and bound $|\int f|$ by $\int |f|$.

*Strategy.* Use the reverse triangle inequality to bound oscillation of $|f|$ by oscillation of $f$, then apply Darboux; then use monotonicity.

*Computation.*

1. **Oscillation bound.** On any interval $I$, by the reverse triangle inequality,
$$\big| |f(x)| - |f(y)| \big| \leq |f(x) - f(y)|.$$

2. Taking suprema: let $\omega_f(I) := \sup_I f - \inf_I f$ (the oscillation). Then for any $x, y \in I$, $|f(x) - f(y)| \leq \omega_f(I)$, so $||f(x)| - |f(y)|| \leq \omega_f(I)$, so
$$\omega_{|f|}(I) = \sup_I |f| - \inf_I |f| \leq \omega_f(I).$$

3. **Integrability of $|f|$.** For any partition $P$:
$$U(P, |f|, \alpha) - L(P, |f|, \alpha) = \sum_k \omega_{|f|}([x_{k-1}, x_k]) \Delta \alpha_k \leq \sum_k \omega_f([x_{k-1}, x_k]) \Delta \alpha_k = U(P, f, \alpha) - L(P, f, \alpha).$$

4. Given $\varepsilon > 0$, by Darboux applied to $f$, pick $P$ with $U(P, f) - L(P, f) < \varepsilon$; then the same $P$ gives $U(P, |f|) - L(P, |f|) < \varepsilon$. By Darboux, $|f| \in \mathcal{R}(\alpha)$.

5. **Inequality.** Since $-|f| \leq f \leq |f|$ pointwise, by monotonicity (Problem 14):
$$-\int |f| \, d\alpha \leq \int f \, d\alpha \leq \int |f| \, d\alpha.$$

6. Thus $\left|\int f \, d\alpha\right| \leq \int |f| \, d\alpha$. $\blacksquare$

*Verification.* Equality holds, e.g., when $f \geq 0$ (then $|f| = f$); strict inequality when $f$ changes sign. $\checkmark$

*Interpretation.* This is the integral form of the triangle inequality, indispensable in convergence arguments and absolute integrability discussions. $\blacksquare$

---

**Solution 16.**

*Setup.* $f \in \mathcal{R}(\alpha)$ on $[a,b]$, $c \in (a, b)$.

*Strategy.* Force $c$ to be a partition point; split sums; recognize sums from $[a,c]$ and $[c,b]$.

*Computation.*

1. **Integrability on each piece.** Given $\varepsilon > 0$, by Darboux pick $P$ on $[a,b]$ with $U(P, f, \alpha) - L(P, f, \alpha) < \varepsilon$.

2. WLOG refine $P$ to include $c$ (refining only decreases $U$ and increases $L$ by Problem 6, so $U - L$ still $< \varepsilon$).

3. Write $P = P_1 \cup P_2$ where $P_1$ is the restriction to $[a,c]$ and $P_2$ to $[c,b]$. Both partition the respective subintervals.

4. The sums split cleanly:
$$U(P, f, \alpha) = U(P_1, f, \alpha) + U(P_2, f, \alpha),$$
$$L(P, f, \alpha) = L(P_1, f, \alpha) + L(P_2, f, \alpha).$$

5. Hence
$$[U(P_1) - L(P_1)] + [U(P_2) - L(P_2)] = U(P) - L(P) < \varepsilon.$$
Since both summands are $\geq 0$, each is $< \varepsilon$. By Darboux, $f \in \mathcal{R}(\alpha)$ on $[a,c]$ and on $[c,b]$.

6. **Additivity formula.** Let $P$ range over partitions of $[a,b]$ containing $c$. Then
$$\overline{\int_a^b} f \, d\alpha = \inf_P U(P) = \inf_{P_1, P_2}[U(P_1) + U(P_2)] = \inf_{P_1} U(P_1) + \inf_{P_2} U(P_2) = \overline{\int_a^c} + \overline{\int_c^b}.$$
(The separation of the infimum into a sum of infima is valid because $P_1$ and $P_2$ are chosen independently.)

7. Similarly $\underline{\int_a^b} = \underline{\int_a^c} + \underline{\int_c^b}$. Since all three pairs $\overline{\int} = \underline{\int}$, we get the claimed additivity:
$$\int_a^b f \, d\alpha = \int_a^c f \, d\alpha + \int_c^b f \, d\alpha. \qquad \blacksquare$$

*Verification.* Take $f \equiv 1$, $\alpha = \text{id}$: $b - a = (c - a) + (b - c)$. $\checkmark$

*Interpretation.* Additivity underwrites the FTC and the definition of $\int_a^b$ for $a > b$ via $\int_a^b = -\int_b^a$ (consistency). $\blacksquare$

---

**Solution 17.**

*Setup.* $f \in \mathcal{R}(\alpha)$, $|f| \leq M$ on $[a,b]$.

*Strategy.* Apply $|\int| \leq \int |\cdot|$ then monotonicity with the constant $M$.

*Computation.*

1. By Problem 15, $|f| \in \mathcal{R}(\alpha)$ and $|\int f \, d\alpha| \leq \int |f| \, d\alpha$.

2. $|f(x)| \leq M$ pointwise, and $|f|, M$ both in $\mathcal{R}(\alpha)$. By monotonicity (Problem 14):
$$\int |f| \, d\alpha \leq \int M \, d\alpha = M[\alpha(b) - \alpha(a)]$$
(last step by Problem 3).

3. Combining:
$$\left|\int_a^b f \, d\alpha\right| \leq \int |f| \, d\alpha \leq M [\alpha(b) - \alpha(a)]. \qquad \blacksquare$$

*Verification.* Attained by $f \equiv M$: $\int f = M [\alpha(b) - \alpha(a)]$. $\checkmark$

*Interpretation.* This is the "$L^\infty$-control" of the integral — the integral is a continuous linear functional w.r.t. the sup norm with operator norm $\alpha(b) - \alpha(a)$. Essential for convergence theorems and estimates. $\blacksquare$

---

## 26.4 Part D — Stieltjes Sums and Step-Integrators

**Problem 18 (Sum as Stieltjes integral).** Let $\alpha : [0, n] \to \mathbb{R}$ be the step function $\alpha(x) = \lfloor x \rfloor$ (jumps of size $1$ at $x = 1, 2, \ldots, n$). Let $f$ be continuous. Show
$$\int_0^n f \, d\alpha = \sum_{k=1}^{n} f(k).$$

**Problem 19 (Unit step).** Let $\alpha(x) = \begin{cases} 0 & x < c, \\ 1 & x \geq c \end{cases}$ on $[a, b]$, with $a < c < b$. Show that if $f$ is continuous at $c$, then $\int_a^b f \, d\alpha = f(c)$.

**Problem 20 (Mixed integrator).** Compute $\int_0^3 x \, d\alpha(x)$ where $\alpha(x) = x^2 + \lfloor x \rfloor$.

**Problem 21 (Riemann reduction theorem).** Let $f$ be continuous and $\alpha \in C^1$ on $[a,b]$. Show
$$\int_a^b f \, d\alpha = \int_a^b f(x) \alpha'(x) \, dx.$$

**Problem 22.** Compute $\int_0^{\pi/2} \cos x \, d(\sin x)$. *Hint: use the reduction theorem.*

**Problem 23 (Non-integrable pair).** Let $f(x) = \alpha(x) = \mathbb{1}_{[c, b]}$ on $[a, b]$. Show that $\int_a^b f \, d\alpha$ **does not exist** — because $f$ and $\alpha$ share a discontinuity at $x = c$.

### Solutions — Part D

**Solution 18.**

*Setup.* $\alpha(x) = \lfloor x \rfloor$ on $[0, n]$, with jumps of size $1$ at $x = 1, 2, \ldots, n$. $f$ continuous on $[0, n]$.

*Strategy.* Use a partition that separates the jump points $\{k\}$ into their own thin intervals; everywhere else $\alpha$ is locally constant so $\Delta \alpha = 0$.

*Computation.*

1. Fix $\delta \in (0, 1/2)$. Take the partition
$$P_\delta = \{0, 1 - \delta, 1, 1 + \delta, 2 - \delta, 2, 2 + \delta, \ldots, n - \delta, n\}.$$

2. Analyze $\Delta \alpha_k$ on each subinterval:
   - $[k - \delta, k]$ for $k = 1, \ldots, n$: $\alpha(k - \delta) = k - 1$, $\alpha(k) = k$, so $\Delta \alpha = 1$.
   - $[k, k + \delta]$ for $k = 1, \ldots, n - 1$: $\alpha(k) = k = \alpha(k + \delta)$ (for $\delta < 1$), so $\Delta \alpha = 0$.
   - Other subintervals: $\alpha$ constant, $\Delta \alpha = 0$.

3. For any choice of tags, the Riemann-Stieltjes sum reduces to
$$S(P_\delta, f, \alpha) = \sum_{k=1}^{n} f(\tau_k) \cdot 1 \quad \text{where } \tau_k \in [k - \delta, k].$$

4. **Continuity argument.** By uniform continuity of $f$ on $[0,n]$ (Heine-Cantor), given $\varepsilon > 0$, pick $\delta > 0$ so that $|x - y| < \delta$ implies $|f(x) - f(y)| < \varepsilon/n$. Then for $\tau_k \in [k - \delta, k]$, $|\tau_k - k| \leq \delta$, so $|f(\tau_k) - f(k)| < \varepsilon/n$.

5. Hence
$$\left| S(P_\delta, f, \alpha) - \sum_{k=1}^{n} f(k) \right| = \left| \sum_{k=1}^n [f(\tau_k) - f(k)] \right| \leq \sum_{k=1}^{n} \frac{\varepsilon}{n} = \varepsilon.$$

6. Similarly, the upper and lower sums $U, L$ on these thin intervals differ by at most the oscillation of $f$ on $[k - \delta, k]$, which is $< \varepsilon/n$. Thus $U(P_\delta) - L(P_\delta) < \varepsilon$.

7. By Darboux, $f \in \mathcal{R}(\alpha)$; by step 5:
$$\boxed{\int_0^n f \, d\alpha = \sum_{k=1}^{n} f(k).}$$

*Verification.* When $f \equiv 1$: $\int_0^n 1 \, d\alpha = \alpha(n) - \alpha(0) = n$, and $\sum_{k=1}^n 1 = n$. $\checkmark$

*Interpretation.* Step integrators convert integrals into sums — a crucial duality. This identity underlies Abel summation, Euler-Maclaurin formulas, and number-theoretic applications of Stieltjes calculus. $\blacksquare$

---

**Solution 19.**

*Setup.* Unit step $\alpha$ at $c \in (a,b)$. $f$ continuous at $c$.

*Strategy.* Partition so $c$ is isolated in a thin subinterval; use continuity to pin down the contribution.

*Computation.*

1. For $\delta > 0$ small with $a < c - \delta$ and $c + \delta < b$, take
$$P_\delta = \{a, c - \delta, c, c + \delta, b\}.$$

2. Compute $\Delta \alpha$:
   - $[a, c - \delta]$: $\alpha(a) = 0 = \alpha(c-\delta)$, $\Delta \alpha = 0$.
   - $[c - \delta, c]$: $\alpha(c - \delta) = 0$, $\alpha(c) = 1$, $\Delta \alpha = 1$.
   - $[c, c + \delta]$: $\alpha(c) = 1 = \alpha(c + \delta)$, $\Delta \alpha = 0$.
   - $[c + \delta, b]$: $\Delta \alpha = 0$.

3. For any tag $\tau \in [c - \delta, c]$, the Riemann-Stieltjes sum is $S = f(\tau) \cdot 1 = f(\tau)$.

4. By continuity at $c$: given $\varepsilon > 0$, pick $\delta > 0$ with $|x - c| < \delta$ $\Rightarrow$ $|f(x) - f(c)| < \varepsilon$. Then $|\tau - c| < \delta$ implies $|f(\tau) - f(c)| < \varepsilon$.

5. On $[c - \delta, c]$, $\sup f - \inf f < 2\varepsilon$ (oscillation). So $U(P_\delta) - L(P_\delta) \leq 2\varepsilon \cdot 1 = 2\varepsilon$.

6. Since $\varepsilon$ is arbitrary, by Darboux $f \in \mathcal{R}(\alpha)$ and the integral equals the common limit
$$\lim_{\delta \to 0^+} S(P_\delta, f, \alpha) = f(c).$$

7. Hence
$$\boxed{\int_a^b f \, d\alpha = f(c).} \qquad \blacksquare$$

*Verification.* $f \equiv 1$ gives $\alpha(b) - \alpha(a) = 1$, and indeed $f(c) = 1$. $\checkmark$

*Interpretation.* The unit step $\alpha$ is the Stieltjes equivalent of a Dirac point mass at $c$: it "picks out" the value $f(c)$. This is the foundational example linking Stieltjes integration to measure theory (point masses = Dirac deltas). $\blacksquare$

---

**Solution 20.**

*Setup.* $\alpha(x) = x^2 + \lfloor x \rfloor$ on $[0, 3]$. $f(x) = x$.

*Strategy.* Write $\alpha = \alpha_1 + \alpha_2$ with $\alpha_1(x) = x^2$ smooth, $\alpha_2(x) = \lfloor x \rfloor$ step; use linearity in $\alpha$.

*Computation.*

1. **Linearity in integrator.** If $\alpha = \alpha_1 + \alpha_2$ with both increasing and $\int_a^b f \, d\alpha_i$ exists for $i = 1, 2$, then $\int_a^b f \, d\alpha$ exists and equals $\int f d\alpha_1 + \int f d\alpha_2$ (straightforward from Riemann-Stieltjes sums).

2. **Smooth part.** $\alpha_1(x) = x^2 \in C^1$, $\alpha_1'(x) = 2x$. By the reduction theorem (Problem 21):
$$\int_0^3 x \, d\alpha_1 = \int_0^3 x \cdot 2x \, dx = \int_0^3 2 x^2 \, dx = \frac{2 x^3}{3}\Bigg|_0^3 = \frac{54}{3} = 18.$$

3. **Step part.** $\alpha_2(x) = \lfloor x \rfloor$ has jumps of size $1$ at $x = 1, 2, 3$. By Problem 18:
$$\int_0^3 x \, d \lfloor x \rfloor = f(1) + f(2) + f(3) = 1 + 2 + 3 = 6.$$
   (Note: when the jump is at the right endpoint $x = 3$, we still pick up $f(3)$ — verify by partitioning $[3 - \delta, 3]$.)

4. **Sum:**
$$\int_0^3 x \, d\alpha = 18 + 6 = \boxed{24}. \qquad \blacksquare$$

*Verification.* Direct estimation: $\alpha(3) - \alpha(0) = 9 + 3 - 0 = 12$, and by Problem 17, $|\int f \, d\alpha| \leq 3 \cdot 12 = 36$ (using $|f| \leq 3$ on $[0,3]$), so $24 \leq 36$. $\checkmark$

*Interpretation.* Mixed integrators with smooth + jump decomposition are the discrete analogue of Lebesgue-Stieltjes measures decomposed into absolutely continuous + purely atomic parts. $\blacksquare$

---

**Solution 21.**

*Setup.* $f \in C[a,b]$, $\alpha \in C^1[a,b]$.

*Strategy.* Apply the MVT to $\alpha$ on each subinterval to relate $\Delta \alpha_k$ to $\alpha'$ at some point; compare two Riemann sums via uniform continuity of $\alpha'$.

*Computation.*

1. Both $f$ and $\alpha'$ are continuous on $[a,b]$, hence uniformly continuous (Heine-Cantor).

2. Given $\varepsilon > 0$, choose $\delta > 0$ such that for all $x, y \in [a,b]$ with $|x - y| < \delta$:
$$|\alpha'(x) - \alpha'(y)| < \frac{\varepsilon}{2(b - a)(1 + \|f\|_\infty)}.$$
(Here $\|f\|_\infty := \max_{[a,b]} |f|$, finite by EVT.)

3. Take any partition $P = \{x_0, \ldots, x_n\}$ with mesh $\mu(P) < \delta$, and any tags $\tau_k \in [x_{k-1}, x_k]$.

4. **MVT application.** Apply the MVT ([[23-mean-value-theorems]]) to $\alpha$ on $[x_{k-1}, x_k]$: $\exists \xi_k \in (x_{k-1}, x_k)$ with
$$\alpha(x_k) - \alpha(x_{k-1}) = \alpha'(\xi_k)(x_k - x_{k-1}).$$

5. Hence the Riemann-Stieltjes sum:
$$S(P, f, \alpha) = \sum_{k=1}^{n} f(\tau_k)[\alpha(x_k) - \alpha(x_{k-1})] = \sum_{k=1}^{n} f(\tau_k) \alpha'(\xi_k) \Delta x_k.$$

6. Compare with the ordinary Riemann sum $T(P, f \alpha', \tau) := \sum f(\tau_k) \alpha'(\tau_k) \Delta x_k$:
$$S - T = \sum_{k=1}^{n} f(\tau_k)[\alpha'(\xi_k) - \alpha'(\tau_k)] \Delta x_k.$$

7. Since $|\xi_k - \tau_k| \leq \mu(P) < \delta$, by step 2:
$$|\alpha'(\xi_k) - \alpha'(\tau_k)| < \frac{\varepsilon}{2(b-a)(1 + \|f\|_\infty)}.$$

8. Bound:
$$|S - T| \leq \|f\|_\infty \cdot \frac{\varepsilon}{2(b-a)(1 + \|f\|_\infty)} \cdot \sum \Delta x_k = \frac{\varepsilon \|f\|_\infty}{2(1 + \|f\|_\infty)} \leq \frac{\varepsilon}{2}.$$

9. **Passing to limit.** $f \alpha'$ is continuous, hence Riemann integrable on $[a,b]$. As $\mu(P) \to 0$, $T(P, f\alpha', \tau) \to \int_a^b f \alpha' \, dx$.

10. Similarly, $f \in \mathcal{R}(\alpha)$ (it is continuous w.r.t. $\alpha$ of bounded variation — see [[25-riemann-stieltjes-integral]]), so $S(P, f, \alpha) \to \int_a^b f \, d\alpha$.

11. By the bound $|S - T| < \varepsilon/2$ uniformly for mesh $< \delta$, both limits must be equal:
$$\boxed{\int_a^b f \, d\alpha = \int_a^b f(x) \alpha'(x) \, dx.} \qquad \blacksquare$$

*Verification.* Sanity check: $f \equiv 1$: LHS = $\alpha(b) - \alpha(a)$. RHS = $\int \alpha' \, dx = \alpha(b) - \alpha(a)$ by FTC. $\checkmark$

*Interpretation.* This is the reduction theorem — it turns the abstract Stieltjes integral into an ordinary Riemann integral whenever $\alpha \in C^1$. Graduate-level usage: this extends to $\alpha$ of bounded variation via the Lebesgue-Radon-Nikodym decomposition. $\blacksquare$

---

**Solution 22.**

*Setup.* Compute $\int_0^{\pi/2} \cos x \, d(\sin x)$.

*Strategy.* Apply reduction theorem (Problem 21) since $\sin x \in C^1$.

*Computation.*

1. $\alpha(x) = \sin x$, $\alpha'(x) = \cos x$, so $d\alpha = \cos x \, dx$.

2. By Problem 21:
$$\int_0^{\pi/2} \cos x \, d(\sin x) = \int_0^{\pi/2} \cos x \cdot \cos x \, dx = \int_0^{\pi/2} \cos^2 x \, dx.$$

3. Apply the power-reduction identity $\cos^2 x = \tfrac{1 + \cos 2x}{2}$:
$$\int_0^{\pi/2} \cos^2 x \, dx = \int_0^{\pi/2} \frac{1 + \cos 2x}{2} \, dx = \frac{1}{2} \cdot \frac{\pi}{2} + \frac{1}{2} \cdot \frac{\sin 2x}{2} \Bigg|_0^{\pi/2}.$$

4. Evaluate: $\sin \pi - \sin 0 = 0$, so the second term vanishes:
$$\int_0^{\pi/2} \cos^2 x \, dx = \frac{\pi}{4} + 0 = \frac{\pi}{4}.$$

5. Therefore
$$\boxed{\int_0^{\pi/2} \cos x \, d(\sin x) = \frac{\pi}{4}.} \qquad \blacksquare$$

*Verification.* Alternative: substitute $u = \sin x$, $du = \cos x \, dx$. When $x = 0$, $u = 0$; $x = \pi/2$, $u = 1$. Also $\cos x = \sqrt{1 - u^2}$ for $x \in [0, \pi/2]$. Integral becomes $\int_0^1 \sqrt{1 - u^2} \, du = \pi/4$ (area of quarter unit disk). $\checkmark$

*Interpretation.* The Stieltjes integral against $\sin x$ "remembers" the derivative $\cos x$ automatically, weighting by it — unifying substitution and integration by parts patterns. $\blacksquare$

---

**Solution 23.**

*Setup.* $f = \alpha = \mathbb{1}_{[c, b]}$ on $[a, b]$: $f(x) = 0$ for $x \in [a, c)$, $f(x) = 1$ for $x \in [c, b]$; same for $\alpha$. So $f$ and $\alpha$ both have a jump at $c$, both going $0 \to 1$.

*Strategy.* Show that no partition refinement can make $U - L < 1$, so Darboux fails.

*Computation.*

1. **Case 1: $c$ is in the interior of some subinterval $[x_{k-1}, x_k]$ (with $x_{k-1} < c < x_k$).** 

   Here $\alpha(x_k) = 1$, $\alpha(x_{k-1}) = 0$, so $\Delta \alpha_k = 1$. On this subinterval, $f$ takes values $0$ (on $[x_{k-1}, c)$) and $1$ (on $[c, x_k]$). So $M_k = 1$, $m_k = 0$, giving $(M_k - m_k) \Delta \alpha_k = 1$. All other subintervals have $\Delta \alpha_j = 0$, contributing $0$. Hence $U(P) - L(P) \geq 1$.

2. **Case 2: $c = x_j$ is a partition point for some $j$.** 

   - On $[x_{j-1}, x_j = c]$: $\alpha(x_{j-1}) = 0$, $\alpha(c) = 1$, so $\Delta \alpha_j = 1$. On this subinterval, $f = 0$ on $[x_{j-1}, c)$ and $f(c) = 1$. So $M_j = 1$, $m_j = 0$, giving contribution $(1 - 0) \cdot 1 = 1$.

   - Other subintervals: to the left, $\alpha \equiv 0$, so $\Delta \alpha = 0$, no contribution; to the right of $c$, $\alpha \equiv 1$, so $\Delta \alpha = 0$, no contribution.

   Hence $U(P) - L(P) = 1$, again $\geq 1$.

3. **Every refinement fails.** Both cases show $U(P) - L(P) \geq 1$ for every partition $P$.

4. Therefore $\overline{\int} f \, d\alpha - \underline{\int} f \, d\alpha \geq 1$; in particular $f \notin \mathcal{R}(\alpha)$ on $[a,b]$.

*Verification.* This is consistent with the textbook criterion: $f$ and $\alpha$ cannot share a discontinuity at the same point (in the same direction). $\checkmark$

*Interpretation.* Stieltjes integration "sees" jumps: if both the integrand and the integrator jump at the same point, the sum has an irreducible ambiguity about which "side" of the jump to use. The cleanest existence theorem requires: $f \in \mathcal{R}(\alpha)$ exists if $f$ continuous, $\alpha$ of bounded variation, or more generally if they do not share a common discontinuity. $\blacksquare$

---

## 26.5 Part E — Fundamental Theorem of Calculus

**Problem 24 (FTC I).** If $f$ is continuous on $[a, b]$ and $F(x) = \int_a^x f(t) \, dt$, show $F$ is differentiable on $(a, b)$ with $F'(x) = f(x)$.

**Problem 25 (FTC II).** If $f$ is continuous on $[a,b]$ and $G$ is any antiderivative of $f$ (i.e., $G' = f$), show $\int_a^b f = G(b) - G(a)$.

**Problem 26.** Compute $\frac{d}{dx} \int_0^{x^2} \sin(t^2) \, dt$.

**Problem 27 (Leibniz integral rule, basic).** Compute $\frac{d}{dx} \int_{\sin x}^{\cos x} e^{t^2} \, dt$.

**Problem 28.** Evaluate $\int_0^\pi \frac{x \sin x}{1 + \cos^2 x} \, dx$. *Hint: use the substitution $x \mapsto \pi - x$.*

**Problem 29.** Show that if $f$ is continuous on $[a, b]$ and $\int_a^x f(t) \, dt = 0$ for all $x \in [a, b]$, then $f \equiv 0$.

### Solutions — Part E

**Solution 24.**

*Setup.* $f \in C[a,b]$, $F(x) := \int_a^x f(t) \, dt$. Fix $x_0 \in (a, b)$; prove $F'(x_0) = f(x_0)$ directly.

*Strategy.* Use additivity of $\int$ to write the difference quotient as an average of $f$ over a short interval; use continuity.

*Computation.*

1. For $h \neq 0$ with $x_0 + h \in [a, b]$, by additivity (Problem 16):
$$F(x_0 + h) - F(x_0) = \int_a^{x_0 + h} f - \int_a^{x_0} f = \int_{x_0}^{x_0 + h} f(t) \, dt.$$
(For $h < 0$ this is $-\int_{x_0 + h}^{x_0} f$, but the formula works by convention $\int_a^b = -\int_b^a$.)

2. The difference quotient:
$$\frac{F(x_0 + h) - F(x_0)}{h} = \frac{1}{h} \int_{x_0}^{x_0 + h} f(t) \, dt.$$

3. Subtract $f(x_0)$:
$$\frac{F(x_0 + h) - F(x_0)}{h} - f(x_0) = \frac{1}{h} \int_{x_0}^{x_0 + h} [f(t) - f(x_0)] \, dt.$$
(Using $\int_{x_0}^{x_0 + h} f(x_0) \, dt = f(x_0) \cdot h$.)

4. **$\varepsilon$-$\delta$ argument.** By continuity at $x_0$: given $\varepsilon > 0$, $\exists \delta > 0$ such that
$$|t - x_0| < \delta \Rightarrow |f(t) - f(x_0)| < \varepsilon.$$

5. For $0 < |h| < \delta$ and $t$ between $x_0$ and $x_0 + h$, we have $|t - x_0| \leq |h| < \delta$, so $|f(t) - f(x_0)| < \varepsilon$.

6. Therefore (using $|\int| \leq \int |\cdot|$, Problem 15):
$$\left| \frac{1}{h} \int_{x_0}^{x_0 + h} [f(t) - f(x_0)] \, dt \right| \leq \frac{1}{|h|} \int_{\min(x_0, x_0 + h)}^{\max(x_0, x_0 + h)} |f(t) - f(x_0)| \, dt \leq \frac{1}{|h|} \cdot \varepsilon \cdot |h| = \varepsilon.$$

7. Hence $\left| \dfrac{F(x_0 + h) - F(x_0)}{h} - f(x_0) \right| < \varepsilon$ for all $0 < |h| < \delta$.

8. This shows $F'(x_0) = \lim_{h \to 0} \dfrac{F(x_0 + h) - F(x_0)}{h} = f(x_0)$, with appropriate one-sided limits at $x_0 = a, b$. $\blacksquare$

*Verification.* $f \equiv 1$: $F(x) = x - a$, $F'(x) = 1 = f(x)$. $\checkmark$

*Interpretation.* This is the deep fact that integration and differentiation are inverse operations — for continuous $f$. Historically it unified the calculus. $\blacksquare$

---

**Solution 25.**

*Setup.* $f \in C[a,b]$, $G$ an antiderivative on $[a,b]$ (continuous on $[a,b]$, $G'(x) = f(x)$ on $(a,b)$, using one-sided derivatives at endpoints).

*Strategy.* Compare $F(x) = \int_a^x f$ with $G(x)$ using the constant-function theorem.

*Computation.*

1. Define $F(x) = \int_a^x f(t) \, dt$. By Problem 24 (FTC I), $F$ is differentiable on $(a, b)$ with $F'(x) = f(x)$.

2. Define $H(x) := F(x) - G(x)$. Then $H$ is continuous on $[a,b]$ and differentiable on $(a,b)$ with
$$H'(x) = F'(x) - G'(x) = f(x) - f(x) = 0.$$

3. **Constant-function theorem** ([[23-mean-value-theorems]]): if $H$ is continuous on $[a,b]$, differentiable on $(a,b)$, and $H'(x) = 0$ throughout $(a,b)$, then $H$ is constant on $[a,b]$. (Proof: by MVT, $H(x) - H(a) = H'(\xi)(x - a) = 0$ for some $\xi \in (a,x)$.)

4. Say $H(x) = C$ for all $x \in [a,b]$. At $x = a$: $F(a) = \int_a^a f = 0$, so $C = -G(a)$.

5. At $x = b$: $F(b) - G(b) = -G(a)$, rearranging:
$$\int_a^b f = F(b) = G(b) - G(a). \qquad \blacksquare$$

*Verification.* Any two antiderivatives of $f$ differ by a constant (also by the constant-function theorem), so $G(b) - G(a)$ is independent of the choice of antiderivative. $\checkmark$

*Interpretation.* FTC II converts the hard task of computing a Riemann integral into the easier task of finding an antiderivative — the bread and butter of calculus. $\blacksquare$

---

**Solution 26.**

*Setup.* Compute $\dfrac{d}{dx} \int_0^{x^2} \sin(t^2) \, dt$.

*Strategy.* Recognize as a composition, apply chain rule with FTC I.

*Computation.*

1. Let $G(u) := \int_0^u \sin(t^2) \, dt$. Then $G$ is continuously differentiable (since $\sin(t^2)$ is continuous in $t$) with $G'(u) = \sin(u^2)$ by FTC I (Problem 24).

2. The expression $\int_0^{x^2} \sin(t^2) \, dt = G(x^2)$ is $G$ composed with $u(x) = x^2$.

3. $u'(x) = 2x$ (continuously differentiable).

4. By the chain rule:
$$\frac{d}{dx} G(x^2) = G'(x^2) \cdot (x^2)' = \sin((x^2)^2) \cdot 2x = 2x \sin(x^4).$$

5. Therefore
$$\boxed{\frac{d}{dx} \int_0^{x^2} \sin(t^2) \, dt = 2x \sin(x^4).} \qquad \blacksquare$$

*Verification.* At $x = 0$: derivative $= 0$, consistent with $\int_0^0 \sin(t^2) \, dt = 0$ (constant in a neighborhood of $x = 0$ from below but not above; actually we have $F(x) := G(x^2)$, $F(0) = 0$, and $F$ is even... so $F'(0) = 0$ indeed). $\checkmark$

*Interpretation.* Key pattern: $\frac{d}{dx} \int_a^{g(x)} f(t) \, dt = f(g(x)) g'(x)$. The constant lower limit contributes nothing. $\blacksquare$

---

**Solution 27.**

*Setup.* Compute $\dfrac{d}{dx} \int_{\sin x}^{\cos x} e^{t^2} \, dt$.

*Strategy.* Split via an intermediate constant, apply chain rule separately.

*Computation.*

1. Let $G(u) := \int_0^u e^{t^2} \, dt$. By FTC I, $G'(u) = e^{u^2}$.

2. Decompose using additivity:
$$\int_{\sin x}^{\cos x} e^{t^2} \, dt = \int_0^{\cos x} e^{t^2} \, dt - \int_0^{\sin x} e^{t^2} \, dt = G(\cos x) - G(\sin x).$$

3. Differentiate via chain rule:
$$\frac{d}{dx}[G(\cos x) - G(\sin x)] = G'(\cos x) \cdot (-\sin x) - G'(\sin x) \cdot \cos x.$$

4. Plug in:
$$= -\sin x \cdot e^{\cos^2 x} - \cos x \cdot e^{\sin^2 x}.$$

5. Therefore
$$\boxed{\frac{d}{dx} \int_{\sin x}^{\cos x} e^{t^2} \, dt = -\sin x \, e^{\cos^2 x} - \cos x \, e^{\sin^2 x}.} \qquad \blacksquare$$

*Verification.* At $x = \pi/4$: $\sin x = \cos x = 1/\sqrt 2$, so integral is $0$. Derivative at $x = \pi/4$: $-\frac{1}{\sqrt 2} e^{1/2} - \frac{1}{\sqrt 2} e^{1/2} = -\sqrt{2} e^{1/2} \neq 0$ — nonzero derivative at a zero of the integral. Consistent (function crosses zero transversally). $\checkmark$

*Interpretation.* **General Leibniz rule** for integrals with both limits variable:
$$\frac{d}{dx} \int_{a(x)}^{b(x)} f(t) \, dt = f(b(x)) b'(x) - f(a(x)) a'(x).$$ $\blacksquare$

---

**Solution 28.**

*Setup.* $I := \int_0^{\pi} \dfrac{x \sin x}{1 + \cos^2 x} \, dx$.

*Strategy.* Use the symmetry $x \mapsto \pi - x$ to relate $I$ to itself with a simpler integrand.

*Computation.*

1. **Substitute** $u = \pi - x$, so $du = -dx$. Limits: $x = 0 \Rightarrow u = \pi$; $x = \pi \Rightarrow u = 0$.

2. Then $\sin(\pi - u) = \sin u$, $\cos(\pi - u) = -\cos u$, so $\cos^2(\pi - u) = \cos^2 u$.

3. Substituting:
$$I = \int_\pi^0 \frac{(\pi - u) \sin u}{1 + \cos^2 u} (-du) = \int_0^\pi \frac{(\pi - u) \sin u}{1 + \cos^2 u} du.$$

4. Now **add the two expressions for $I$**:
$$2I = \int_0^\pi \frac{x \sin x + (\pi - x)\sin x}{1 + \cos^2 x} dx = \int_0^\pi \frac{\pi \sin x}{1 + \cos^2 x} dx = \pi \int_0^\pi \frac{\sin x}{1 + \cos^2 x} dx.$$

5. **Substitute** $v = \cos x$, $dv = -\sin x \, dx$. Limits: $x = 0 \Rightarrow v = 1$, $x = \pi \Rightarrow v = -1$.
$$\int_0^\pi \frac{\sin x}{1 + \cos^2 x} dx = -\int_1^{-1} \frac{dv}{1 + v^2} = \int_{-1}^{1} \frac{dv}{1 + v^2} = \arctan v \Big|_{-1}^{1} = \frac{\pi}{4} - \left(-\frac{\pi}{4}\right) = \frac{\pi}{2}.$$

6. Therefore:
$$2I = \pi \cdot \frac{\pi}{2} = \frac{\pi^2}{2} \Rightarrow I = \frac{\pi^2}{4}.$$

7. So
$$\boxed{\int_0^{\pi} \frac{x \sin x}{1 + \cos^2 x} dx = \frac{\pi^2}{4}.} \qquad \blacksquare$$

*Verification.* Rough estimate: on $[0, \pi]$, $\sin x \in [0, 1]$, $\cos^2 x \in [0, 1]$, so $\sin x / (1 + \cos^2 x) \in [0, 1]$. Multiplied by $x \in [0, \pi]$: integrand $\leq \pi$, integral $\leq \pi^2$. And $\pi^2/4 \approx 2.47$, well under $\pi^2 \approx 9.87$. $\checkmark$

*Interpretation.* The symmetry trick is fundamental: any integral of the form $\int_0^a f(x) \, dx$ where $f(a - x)$ has a useful relationship to $f(x)$ can be combined with the reflected integral to simplify. $\blacksquare$

---

**Solution 29.**

*Setup.* $f \in C[a,b]$, $F(x) := \int_a^x f(t) \, dt \equiv 0$ on $[a,b]$.

*Strategy.* Differentiate $F$ and apply FTC.

*Computation.*

1. $F \equiv 0$ on $[a, b]$, so $F$ is identically zero and in particular differentiable with $F'(x) = 0$ on $(a,b)$.

2. By FTC I (Problem 24), $F'(x) = f(x)$ for all $x \in (a, b)$.

3. Combining: $f(x) = 0$ for all $x \in (a, b)$.

4. By continuity of $f$, $f(a) = \lim_{x \to a^+} f(x) = 0$ and $f(b) = \lim_{x \to b^-} f(x) = 0$.

5. Hence $f \equiv 0$ on $[a, b]$. $\blacksquare$

*Verification.* Contrapositive: if $f \not\equiv 0$, say $f(x_0) > 0$ for some $x_0 \in (a, b)$, then by continuity, $f > 0$ in a neighborhood, making $F$ strictly increasing there, so $F$ cannot be identically zero. $\checkmark$

*Interpretation.* This is a uniqueness statement: distinct continuous functions have distinct cumulative integrals. Vital for ODE uniqueness theorems and for proving $L^1$-density results. $\blacksquare$

---

## 26.6 Part F — Integration by Parts, Change of Variables, MVT

**Problem 30 (IBP formula).** If $f, g \in C^1[a,b]$, show $\int_a^b f g' \, dx = f(b)g(b) - f(a)g(a) - \int_a^b f' g \, dx$.

**Problem 31 (Stieltjes IBP).** If $f, \alpha$ are monotone, not sharing a discontinuity, show the symmetric form
$$\int_a^b f \, d\alpha + \int_a^b \alpha \, df = f(b)\alpha(b) - f(a)\alpha(a).$$

**Problem 32.** Compute $\int_1^e \ln x \, dx$ using IBP.

**Problem 33 (Change of variables).** Evaluate $\int_0^1 x e^{x^2} \, dx$ via substitution $u = x^2$.

**Problem 34 (MVT for integrals).** If $f$ is continuous on $[a,b]$, show there exists $c \in [a,b]$ with $\int_a^b f = f(c)(b-a)$.

**Problem 35 (Weighted MVT).** If $f$ is continuous and $g \geq 0$ is integrable on $[a,b]$, show $\exists c \in [a,b]$ with $\int_a^b fg = f(c) \int_a^b g$.

**Problem 36.** Let $f$ be continuous on $[0,1]$. Show
$$\lim_{n \to \infty} \int_0^1 n x^n f(x) \, dx = f(1).$$

### Solutions — Part F

**Solution 30.**

*Setup.* $f, g \in C^1[a,b]$.

*Strategy.* Apply product rule, then FTC.

*Computation.*

1. By the product rule, $(fg)'(x) = f'(x) g(x) + f(x) g'(x)$ for all $x \in (a,b)$. Since $f, g \in C^1$, $(fg)' \in C[a,b]$.

2. By FTC II (Problem 25):
$$\int_a^b (fg)'(x) \, dx = f(b) g(b) - f(a) g(a).$$

3. By linearity (Problem 13):
$$\int_a^b (fg)'(x) \, dx = \int_a^b f'(x) g(x) \, dx + \int_a^b f(x) g'(x) \, dx.$$

4. Combining:
$$f(b) g(b) - f(a) g(a) = \int_a^b f' g \, dx + \int_a^b f g' \, dx.$$

5. Rearranging:
$$\boxed{\int_a^b f g' \, dx = f(b) g(b) - f(a) g(a) - \int_a^b f' g \, dx.} \qquad \blacksquare$$

*Verification.* Differentiate both sides w.r.t. $b$ (holding $a$ fixed): LHS $\to f(b) g'(b)$; RHS $\to f'(b) g(b) + f(b) g'(b) - f'(b) g(b) = f(b) g'(b)$. $\checkmark$

*Interpretation.* IBP is the "reverse product rule" and the key tool for handling integrals of products. $\blacksquare$

---

**Solution 31.**

*Setup.* $f$, $\alpha$ monotone on $[a,b]$, no shared discontinuity. We prove both $\int f \, d\alpha$ and $\int \alpha \, df$ exist and sum to the boundary evaluation.

*Strategy.* Use Abel summation on a generic partition sum, then pass to the mesh-zero limit.

*Computation.*

1. **Existence.** If $f$ and $\alpha$ do not share a common discontinuity, and both are monotone (hence of bounded variation), then $\int f \, d\alpha$ exists. A symmetric argument shows $\int \alpha \, df$ exists. (Proof is in [[25-riemann-stieltjes-integral]].)

2. **Abel summation.** Let $P = \{x_0, x_1, \ldots, x_n\}$, with tags $\tau_k \in [x_{k-1}, x_k]$. Define $\tau_0 := a$, $\tau_{n+1} := b$. Consider the Riemann-Stieltjes sum
$$S(P, f, \alpha) = \sum_{k=1}^{n} f(\tau_k) [\alpha(x_k) - \alpha(x_{k-1})].$$

3. Apply Abel summation (discrete integration by parts):
$$\sum_{k=1}^{n} f(\tau_k) [\alpha(x_k) - \alpha(x_{k-1})] = f(\tau_n) \alpha(x_n) - f(\tau_1) \alpha(x_0) - \sum_{k=1}^{n-1} \alpha(x_k) [f(\tau_{k+1}) - f(\tau_k)].$$

4. Using $x_0 = a, x_n = b$, and choosing $\tau_1 = a$, $\tau_n = b$ (extreme tags allowed on boundary subintervals):
$$= f(b) \alpha(b) - f(a) \alpha(a) - \sum_{k=1}^{n-1} \alpha(x_k) [f(\tau_{k+1}) - f(\tau_k)].$$

5. The final sum approximates $\int_a^b \alpha \, df$: it is a Riemann-Stieltjes sum for $\alpha$ against $f$, with tags $x_k$ and partition $\{\tau_1, \ldots, \tau_n\}$ (which becomes fine as $P$ does).

6. **Take mesh to zero.** As $\mu(P) \to 0$:
   - $S(P, f, \alpha) \to \int_a^b f \, d\alpha$ (existence from step 1);
   - $\sum_{k=1}^{n-1} \alpha(x_k) [f(\tau_{k+1}) - f(\tau_k)] \to \int_a^b \alpha \, df$.

7. Passing to the limit in step 4:
$$\int_a^b f \, d\alpha = f(b) \alpha(b) - f(a) \alpha(a) - \int_a^b \alpha \, df.$$

8. Rearranging:
$$\boxed{\int_a^b f \, d\alpha + \int_a^b \alpha \, df = f(b) \alpha(b) - f(a) \alpha(a).} \qquad \blacksquare$$

*Verification.* When $\alpha(x) = x$: LHS = $\int f \, dx + \int x \, df$. If also $f \in C^1$, $df = f' dx$, so $\int x \, df = \int x f' \, dx$, and the identity becomes the classical IBP applied to $\int f \cdot 1 \, dx = xf|_a^b - \int x f' \, dx$. $\checkmark$

*Interpretation.* The Stieltjes IBP is more symmetric than the Riemann IBP — it reveals the duality between $f$ and $\alpha$. It underlies Abel summation in number theory and the convergence of Dirichlet series. $\blacksquare$

---

**Solution 32.**

*Setup.* Compute $I := \int_1^e \ln x \, dx$.

*Strategy.* IBP with $u = \ln x$, $dv = dx$.

*Computation.*

1. Let $u = \ln x$, so $du = dx/x$. Let $dv = dx$, so $v = x$.

2. Apply IBP:
$$\int_1^e \ln x \, dx = [uv]_1^e - \int_1^e v \, du = [x \ln x]_1^e - \int_1^e x \cdot \frac{1}{x} \, dx.$$

3. Evaluate boundary: $x \ln x |_{x=e} = e \cdot \ln e = e \cdot 1 = e$, $x \ln x |_{x=1} = 1 \cdot 0 = 0$. So $[x \ln x]_1^e = e$.

4. Evaluate remaining integral: $\int_1^e 1 \, dx = e - 1$.

5. Combine:
$$I = e - (e - 1) = \boxed{1}. \qquad \blacksquare$$

*Verification.* Antiderivative of $\ln x$ is $x \ln x - x$. Evaluate: $(e \cdot 1 - e) - (1 \cdot 0 - 1) = 0 - (-1) = 1$. $\checkmark$

*Interpretation.* Canonical IBP example — the log integrand becomes $1/x$ after differentiation, which is algebraically simpler. $\blacksquare$

---

**Solution 33.**

*Setup.* Compute $\int_0^1 x e^{x^2} \, dx$.

*Strategy.* Substitution $u = x^2$.

*Computation.*

1. Let $u = x^2$, so $du = 2x \, dx$, i.e., $x \, dx = du/2$.

2. Limits: $x = 0 \Rightarrow u = 0$; $x = 1 \Rightarrow u = 1$.

3. Transform:
$$\int_0^1 x e^{x^2} \, dx = \int_0^1 e^u \cdot \frac{du}{2} = \frac{1}{2} \int_0^1 e^u \, du.$$

4. Evaluate: $\int_0^1 e^u \, du = e^u |_0^1 = e - 1$.

5. So:
$$\int_0^1 x e^{x^2} \, dx = \frac{1}{2}(e - 1) = \boxed{\frac{e - 1}{2}}. \qquad \blacksquare$$

*Verification.* By FTC: $\frac{d}{dx}\left[\tfrac{1}{2} e^{x^2}\right] = \tfrac{1}{2} \cdot 2x \cdot e^{x^2} = x e^{x^2}$, so antiderivative is $\tfrac{1}{2} e^{x^2}$. $\tfrac{1}{2} e^{x^2} |_0^1 = \tfrac{1}{2}(e - 1)$. $\checkmark$

*Interpretation.* The substitution $u = g(x)$ works exactly when the integrand contains $g'(x) dx$. Here $g(x) = x^2$, $g'(x) = 2x$, and $x \, dx$ is $g'(x)/2 \, dx$. $\blacksquare$

---

**Solution 34.**

*Setup.* $f \in C[a,b]$.

*Strategy.* Use EVT to find extrema, sandwich the integral, then IVT.

*Computation.*

1. By EVT (since $f$ continuous on compact $[a,b]$), $f$ attains its min $m$ and max $M$ on $[a,b]$: $m = f(x_m), M = f(x_M)$.

2. Pointwise: $m \leq f(x) \leq M$ for all $x \in [a,b]$.

3. By monotonicity of the integral (Problem 14):
$$m(b - a) = \int_a^b m \, dx \leq \int_a^b f \, dx \leq \int_a^b M \, dx = M(b-a).$$

4. **If $b = a$:** both sides are $0$ and $c = a$ works trivially.

5. **If $b > a$:** divide by $b - a > 0$:
$$m \leq \frac{1}{b-a} \int_a^b f \leq M.$$

6. By IVT applied to $f$ on the interval $[\min(x_m, x_M), \max(x_m, x_M)] \subseteq [a,b]$: $f$ takes every value in $[m, M]$, so $\exists c \in [a,b]$ with $f(c) = \frac{1}{b-a} \int_a^b f$.

7. Therefore
$$\int_a^b f \, dx = f(c)(b - a) \qquad \text{for some } c \in [a, b]. \qquad \blacksquare$$

*Verification.* $f \equiv k$: $\int = k(b-a) = f(c)(b-a)$ for any $c$. $\checkmark$

*Interpretation.* The "average value" of $f$ over $[a,b]$ equals $f(c)$ for some $c$ in the interval. Geometric interpretation: area under curve = area of a rectangle with height $f(c)$ and width $b-a$. $\blacksquare$

---

**Solution 35.**

*Setup.* $f \in C[a,b]$, $g \in \mathcal{R}[a,b]$ with $g \geq 0$ on $[a,b]$.

*Strategy.* Bracket $\int fg$ by $m \int g$ and $M \int g$; divide by $\int g$ (if positive) and use IVT.

*Computation.*

1. By EVT, let $m = \min_{[a,b]} f$, $M = \max_{[a,b]} f$, attained at $x_m, x_M \in [a,b]$.

2. Pointwise: $m \leq f(x) \leq M$. Since $g(x) \geq 0$, multiplying preserves inequalities:
$$m g(x) \leq f(x) g(x) \leq M g(x).$$

3. Integrating (by monotonicity, Problem 14):
$$m \int_a^b g \leq \int_a^b f g \leq M \int_a^b g.$$

4. **Case A: $\int g = 0$.** Then from step 3, $\int fg = 0 = f(c) \cdot 0$ for any $c \in [a,b]$. Choose e.g. $c = a$.

5. **Case B: $\int g > 0$.** Divide step 3 by $\int g$:
$$m \leq \frac{\int fg}{\int g} \leq M.$$
By IVT on $f$ (continuous, takes values $m$ at $x_m$ and $M$ at $x_M$), there exists $c \in [a,b]$ (specifically between $x_m$ and $x_M$) with
$$f(c) = \frac{\int_a^b fg}{\int_a^b g}.$$
Rearranging:
$$\int_a^b fg = f(c) \int_a^b g. \qquad \blacksquare$$

*Verification.* $g \equiv 1$ recovers Problem 34. $\checkmark$

*Interpretation.* "Weighted average value": $f(c)$ is the $g$-weighted average of $f$ over $[a,b]$. This is a continuous-version expected value: if $g/\int g$ is a probability density, then $f(c) = \mathbb{E}[f]$. $\blacksquare$

---

**Solution 36.**

*Setup.* $f \in C[0,1]$. Prove $\lim_n \int_0^1 n x^n f(x) \, dx = f(1)$.

*Strategy.* Split the integral at $1 - \delta$; show contribution from $[0, 1-\delta]$ vanishes; show contribution from $[1-\delta, 1]$ approaches $f(1)$ by continuity.

*Computation.*

1. Let $M := \|f\|_\infty = \max_{[0,1]} |f|$ (finite by EVT).

2. **First normalization.** Compute $\int_0^1 n x^n \, dx = \dfrac{n}{n+1}$, so
$$\int_0^1 n x^n \, dx \to 1 \text{ as } n \to \infty.$$
Consequently $n x^n \, dx$ is "almost" a probability measure; we call its integrals "expectations" loosely.

3. **Split the integral.** Fix $\varepsilon > 0$. By continuity at $1$, pick $\delta \in (0, 1)$ such that $|f(x) - f(1)| < \varepsilon/2$ for $x \in [1 - \delta, 1]$.

4. **Bound on $[0, 1 - \delta]$.** Here $x \leq 1 - \delta$, so $x^n \leq (1 - \delta)^n$. 
$$\left| \int_0^{1 - \delta} n x^n f(x) \, dx \right| \leq M \cdot n (1-\delta)^n \cdot (1 - \delta).$$
Since $1 - \delta < 1$, $n (1-\delta)^n \to 0$ (exponential decay beats polynomial). Thus $\exists N_1$ with
$$\left| \int_0^{1 - \delta} n x^n f(x) \, dx \right| < \varepsilon/4 \quad \forall n \geq N_1.$$

5. **Approximation on $[1 - \delta, 1]$.** Write:
$$\int_{1 - \delta}^1 n x^n f(x) \, dx = f(1) \int_{1-\delta}^1 n x^n \, dx + \int_{1-\delta}^1 n x^n [f(x) - f(1)] \, dx.$$

6. The first term: $\int_{1-\delta}^1 n x^n \, dx = \dfrac{n}{n+1}[1 - (1-\delta)^{n+1}] \to 1$ as $n \to \infty$. Pick $N_2$ with $n \geq N_2 \Rightarrow \left| \dfrac{n}{n+1}[1 - (1-\delta)^{n+1}] - 1 \right| < \dfrac{\varepsilon}{4 (|f(1)| + 1)}$.

7. The second term: $|f(x) - f(1)| < \varepsilon/2$ on $[1-\delta, 1]$, so
$$\left| \int_{1-\delta}^1 n x^n [f(x) - f(1)] \, dx \right| \leq \frac{\varepsilon}{2} \int_{1-\delta}^1 n x^n \, dx \leq \frac{\varepsilon}{2} \cdot 1 = \frac{\varepsilon}{2}.$$

8. **Combining.** For $n \geq \max(N_1, N_2)$:
$$\left| \int_0^1 n x^n f(x) \, dx - f(1) \right| \leq \frac{\varepsilon}{4} + \frac{\varepsilon}{4} + \frac{\varepsilon}{2} = \varepsilon.$$

9. Therefore
$$\boxed{\lim_{n \to \infty} \int_0^1 n x^n f(x) \, dx = f(1).} \qquad \blacksquare$$

*Verification.* $f \equiv 1$: $\int_0^1 n x^n \, dx = n/(n+1) \to 1 = f(1)$. $\checkmark$

Alternative via weighted MVT: by Problem 35, $\exists c_n \in [0,1]$ with $\int_0^1 nx^n f = f(c_n) \cdot n/(n+1)$. The density $n x^n / [n/(n+1)] = (n+1) x^n$ concentrates at $1$: its mean is $(n+1)/(n+2) \to 1$, forcing $c_n \to 1$. Continuity gives $f(c_n) \to f(1)$.

*Interpretation.* This is an "approximate-identity" lemma: $n x^n$ is approximately $\delta_{1}$, the Dirac mass at $1$, in the sense that $\int g \cdot n x^n \, dx \to g(1)$ for continuous $g$. A foundational tool in approximation theory, connecting to the Bernstein polynomials and Weierstrass theorem. $\blacksquare$

---

## 26.7 Part G — Mixed & Advanced Problems

**Problem 37 (Arc length setup).** Let $\gamma(t) = (\cos t, \sin t)$ on $[0, 2\pi]$. Compute $\int_0^{2\pi} \|\gamma'(t)\| \, dt$ and identify it as the arc length of the unit circle.

**Problem 38 (Cauchy-Schwarz for integrals).** Show $\left(\int_a^b fg \, dx\right)^2 \leq \int_a^b f^2 \, dx \cdot \int_a^b g^2 \, dx$.

**Problem 39 (Vanishing of continuous positive integral).** If $f$ is continuous, $f \geq 0$ on $[a, b]$, and $\int_a^b f = 0$, show $f \equiv 0$.

**Problem 40.** Evaluate $\lim_{n \to \infty} \frac{1}{n} \sum_{k=1}^{n} f(k/n)$ for continuous $f$ on $[0,1]$.

**Problem 41 (Riemann lemma).** Let $f \in \mathcal{R}[0, 2\pi]$. Show $\int_0^{2\pi} f(x) \sin(nx) \, dx \to 0$ as $n \to \infty$. *Hint: approximate by step functions.*

**Problem 42 (Improper integral convergence).** Show $\int_1^\infty \frac{\sin x}{x} \, dx$ converges. *Hint: use integration by parts.*

**Problem 43.** Let $f : [0, 1] \to \mathbb{R}$ be continuous with $\int_0^1 f(x) x^n \, dx = 0$ for all $n \geq 0$. Show $f \equiv 0$. *Hint: Weierstrass approximation — any continuous function is uniformly approximable by polynomials.*

### Solutions — Part G

**Solution 37.**

*Setup.* $\gamma : [0, 2\pi] \to \mathbb{R}^2$, $\gamma(t) = (\cos t, \sin t)$, the unit circle traversed once counterclockwise.

*Strategy.* Compute $\gamma'(t)$, its norm, integrate.

*Computation.*

1. Component-wise derivative ([[24-lhopital-vector-derivatives]]):
$$\gamma'(t) = \left(\frac{d}{dt} \cos t, \frac{d}{dt} \sin t\right) = (-\sin t, \cos t).$$

2. Euclidean norm:
$$\|\gamma'(t)\| = \sqrt{(-\sin t)^2 + (\cos t)^2} = \sqrt{\sin^2 t + \cos^2 t} = \sqrt{1} = 1.$$

3. Integrate:
$$\int_0^{2\pi} \|\gamma'(t)\| \, dt = \int_0^{2\pi} 1 \, dt = 2\pi.$$

4. This is the **arc length** of $\gamma$, which traces the unit circle once, so equals circumference $2\pi r$ with $r = 1$:
$$\boxed{\int_0^{2\pi} \|\gamma'(t)\| \, dt = 2\pi.} \qquad \blacksquare$$

*Verification.* Circle of radius $1$ has circumference $2\pi \cdot 1 = 2\pi$. $\checkmark$

*Interpretation.* Vector-valued derivatives unify path geometry and calculus: the arc length of a smooth curve $\gamma$ is the integral of its speed $\|\gamma'\|$ over the parameter interval. In physics, if $\gamma$ is a particle's position, $\|\gamma'\|$ is speed and the integral is total distance. $\blacksquare$

---

**Solution 38.**

*Setup.* $f, g \in \mathcal{R}[a,b]$.

*Strategy.* Consider the non-negative quadratic $\int (f - \lambda g)^2 \geq 0$ in $\lambda$; force its discriminant $\leq 0$.

*Computation.*

1. Both $f^2, g^2, fg \in \mathcal{R}[a,b]$ (products of integrable bounded functions are integrable; see [[25-riemann-stieltjes-integral]]).

2. For any $\lambda \in \mathbb{R}$:
$$0 \leq \int_a^b (f - \lambda g)^2 \, dx = \int f^2 - 2\lambda \int fg + \lambda^2 \int g^2.$$

3. **Case A: $\int g^2 = 0$.** Since $g^2 \geq 0$ and continuous (if $g$ is continuous), by Problem 39 $g \equiv 0$, so $\int fg = 0$, and the inequality $0 \leq \int f^2 \cdot 0 = 0$ holds with equality. (For non-continuous $g$, if $g = 0$ a.e. then $fg = 0$ a.e., same conclusion.)

4. **Case B: $\int g^2 > 0$.** The quadratic $Q(\lambda) := \int f^2 - 2\lambda \int fg + \lambda^2 \int g^2 \geq 0$ for all $\lambda$. As a quadratic in $\lambda$ with positive leading coefficient $\int g^2$, non-negativity requires discriminant $\leq 0$:
$$\text{disc} = (-2 \int fg)^2 - 4 \int g^2 \cdot \int f^2 = 4 \left(\int fg\right)^2 - 4 \int f^2 \cdot \int g^2 \leq 0.$$

5. Divide by $4$ and rearrange:
$$\left(\int_a^b fg \, dx\right)^2 \leq \int_a^b f^2 \, dx \cdot \int_a^b g^2 \, dx. \qquad \blacksquare$$

*Verification.* Equality iff $f$ and $g$ are linearly dependent (i.e., $f = \lambda g$ a.e.), which makes the quadratic a perfect square. $\checkmark$

*Interpretation.* Cauchy-Schwarz in the $L^2$-inner product: $\langle f, g \rangle := \int fg$. The inequality $|\langle f, g \rangle| \leq \|f\|_2 \|g\|_2$. Foundation for Hilbert space theory, Fourier analysis, and PDEs. $\blacksquare$

---

**Solution 39.**

*Setup.* $f \in C[a,b]$, $f \geq 0$, $\int_a^b f = 0$. Prove $f \equiv 0$.

*Strategy.* Contrapositive: assume $f(x_0) > 0$ somewhere; derive contradiction.

*Computation.*

1. Suppose for contradiction $\exists x_0 \in [a, b]$ with $f(x_0) > 0$. Let $\delta := f(x_0)/3 > 0$.

2. **Continuity at $x_0$:** $\exists \eta > 0$ such that $|x - x_0| < \eta$ (and $x \in [a,b]$) implies $|f(x) - f(x_0)| < \delta$, hence
$$f(x) > f(x_0) - \delta = \frac{2 f(x_0)}{3} > 0.$$

3. **Localize interval.** Let $I_{x_0} := [a, b] \cap (x_0 - \eta, x_0 + \eta)$. Since $x_0 \in [a, b]$, $I_{x_0}$ contains at least a half-neighborhood. In particular, $|I_{x_0}| \geq \min(\eta, \eta_{bdry}) > 0$, where $\eta_{bdry}$ accounts for boundary effects (if $x_0 = a$, $I_{x_0} = [a, a + \eta)$ has length $\eta$; similarly for $x_0 = b$).

4. Denote $|I_{x_0}| := L > 0$.

5. **Lower bound the integral.** $f \geq 0$ everywhere, so
$$\int_a^b f \, dx \geq \int_{I_{x_0}} f \, dx \geq \int_{I_{x_0}} \frac{2 f(x_0)}{3} \, dx = \frac{2 f(x_0)}{3} \cdot L > 0.$$

6. This contradicts $\int_a^b f = 0$.

7. Therefore no such $x_0$ exists; $f(x) \leq 0$ for all $x \in [a, b]$. Combined with $f \geq 0$, $f \equiv 0$. $\blacksquare$

*Verification.* $f \equiv 0$ trivially satisfies all hypotheses. The contrapositive argument shows this is the only possibility. $\checkmark$

*Interpretation.* "Continuous non-negative functions are determined by their integral" — if the integral is zero, they are zero. This fails for non-continuous $f$ (consider $\chi_{\mathbb{Q}}$, or $f$ zero except at one point). $\blacksquare$

---

**Solution 40.**

*Setup.* $f \in C[0, 1]$. Compute $\lim_n \dfrac{1}{n} \sum_{k=1}^n f(k/n)$.

*Strategy.* Recognize as a Riemann sum.

*Computation.*

1. Let $P_n = \{0, 1/n, 2/n, \ldots, 1\}$ the uniform partition of $[0, 1]$, mesh $\mu(P_n) = 1/n \to 0$.

2. With tags $\tau_k := k/n \in [(k-1)/n, k/n]$ (right endpoints), the Riemann sum is
$$S(P_n, f, \tau) = \sum_{k=1}^n f(k/n) \cdot \frac{1}{n} = \frac{1}{n} \sum_{k=1}^n f(k/n).$$

3. **Riemann sum convergence.** Since $f \in C[0,1] \subset \mathcal{R}[0,1]$, the Riemann sums $S(P_n, f, \tau)$ converge to $\int_0^1 f(x) \, dx$ as $\mu(P_n) \to 0$ (for *any* choice of tags).

4. **Explicit $\varepsilon$-$\delta$.** By uniform continuity (Heine-Cantor), given $\varepsilon > 0$, $\exists \delta > 0$ such that $|x - y| < \delta \Rightarrow |f(x) - f(y)| < \varepsilon$. For $n > 1/\delta$, $\mu(P_n) < \delta$, so on each subinterval $[x_{k-1}, x_k]$ the oscillation of $f$ is $< \varepsilon$. Hence $|S(P_n, f, \tau) - \int_0^1 f| \leq U(P_n) - L(P_n) \leq \varepsilon \cdot 1 = \varepsilon$ for all large $n$.

5. Therefore
$$\boxed{\lim_{n \to \infty} \frac{1}{n} \sum_{k=1}^n f(k/n) = \int_0^1 f(x) \, dx.} \qquad \blacksquare$$

*Verification.* $f \equiv 1$: $\frac{1}{n} \cdot n = 1 = \int_0^1 1 \, dx$. $\checkmark$

$f(x) = x$: $\frac{1}{n} \sum_{k=1}^n \frac{k}{n} = \frac{n+1}{2n} \to 1/2 = \int_0^1 x \, dx$. $\checkmark$

*Interpretation.* This is the bedrock identity "sums are integrals" — it legitimizes passing from discrete averages to continuous ones and is essential in probability (law of large numbers), physics (statistical mechanics), and numerical integration. $\blacksquare$

---

**Solution 41.**

*Setup.* $f \in \mathcal{R}[0, 2\pi]$. Prove $\int_0^{2\pi} f(x) \sin(nx) \, dx \to 0$.

*Strategy.* 
(a) Verify the claim on constants and step functions by direct computation.
(b) Approximate general $f$ by step functions in $L^1$.

*Computation.*

1. **Step A: constants.** For a constant $c$ on $[\alpha, \beta] \subset [0, 2\pi]$:
$$\int_\alpha^\beta c \sin(nx) \, dx = c \left[ -\frac{\cos(nx)}{n}\right]_\alpha^\beta = -\frac{c}{n}[\cos(n\beta) - \cos(n\alpha)].$$
Hence $\left|\int_\alpha^\beta c \sin(nx) \, dx\right| \leq \frac{2|c|}{n} \to 0$ as $n \to \infty$.

2. **Step B: step functions.** If $s$ is a step function on $[0, 2\pi]$, with partition $0 = y_0 < y_1 < \cdots < y_m = 2\pi$ and values $c_i$ on $[y_{i-1}, y_i)$, then by linearity:
$$\int_0^{2\pi} s(x) \sin(nx) \, dx = \sum_{i=1}^m \int_{y_{i-1}}^{y_i} c_i \sin(nx) \, dx,$$
and each term is $\leq 2|c_i|/n$. Total: $\leq \frac{2}{n} \sum |c_i| \to 0$ as $n \to \infty$.

3. **Step C: approximate $f$ by step functions.** Fix $\varepsilon > 0$. Since $f \in \mathcal{R}[0, 2\pi]$, by Darboux, $\exists$ partition $P$ with $U(P, f) - L(P, f) < \varepsilon/2$. Define the step function $s$ by $s = m_k := \inf_{[x_{k-1}, x_k]} f$ on $[x_{k-1}, x_k)$. Then
$$\int_0^{2\pi} |f - s| \, dx \leq \sum_k (M_k - m_k)(x_k - x_{k-1}) = U(P) - L(P) < \varepsilon/2.$$

4. **Step D: split the integral.**
$$\left| \int_0^{2\pi} f \sin(nx) \, dx \right| \leq \left| \int (f - s) \sin(nx) \, dx \right| + \left| \int s \sin(nx) \, dx \right|.$$

5. **First piece** (using $|\sin(nx)| \leq 1$):
$$\left| \int (f - s) \sin(nx) \, dx \right| \leq \int |f - s| \, dx < \varepsilon/2.$$

6. **Second piece** (by step B, for $n \geq N$ sufficiently large):
$$\left| \int s \sin(nx) \, dx \right| < \varepsilon/2.$$

7. Combining: $\left| \int f \sin(nx) \, dx \right| < \varepsilon$ for all $n \geq N$. Since $\varepsilon$ is arbitrary:
$$\lim_{n \to \infty} \int_0^{2\pi} f(x) \sin(nx) \, dx = 0. \qquad \blacksquare$$

*Verification.* $f \equiv 1$: $\int_0^{2\pi} \sin(nx) \, dx = [-\cos(nx)/n]_0^{2\pi} = (-\cos(2\pi n) + \cos 0)/n = 0$ for integer $n$. So limit is $0$, consistent. $\checkmark$

*Interpretation.* This is the **Riemann-Lebesgue lemma**. Oscillatory integrals against Riemann-integrable functions always vanish in the high-frequency limit — because the positive and negative oscillations cancel. Cornerstone of Fourier analysis and the foundation for convergence of Fourier series. $\blacksquare$

---

**Solution 42.**

*Setup.* Show $\int_1^\infty \dfrac{\sin x}{x} \, dx$ converges. Note: does not converge absolutely (since $\int_1^\infty |\sin x|/x \, dx = \infty$).

*Strategy.* IBP to transform to absolutely convergent form.

*Computation.*

1. For any $N > 1$, use IBP: $u = 1/x$, $dv = \sin x \, dx$; $du = -dx/x^2$, $v = -\cos x$.
$$\int_1^N \frac{\sin x}{x} \, dx = \left[-\frac{\cos x}{x}\right]_1^N - \int_1^N (-\cos x) \cdot \left(-\frac{1}{x^2}\right) \, dx = \left[-\frac{\cos x}{x}\right]_1^N - \int_1^N \frac{\cos x}{x^2} \, dx.$$

2. Evaluate the boundary term:
$$\left[-\frac{\cos x}{x}\right]_1^N = -\frac{\cos N}{N} + \cos 1.$$

3. **As $N \to \infty$:**
   - Boundary: $|\cos N|/N \leq 1/N \to 0$, so boundary $\to \cos 1$.
   - Remainder: the integral $\int_1^\infty \cos x / x^2 \, dx$ converges **absolutely** because $|\cos x / x^2| \leq 1/x^2$ and $\int_1^\infty 1/x^2 \, dx = 1$ converges.

4. Therefore both the boundary and the remainder have limits as $N \to \infty$, so $\int_1^N \sin x/x \, dx$ has a limit:
$$\int_1^\infty \frac{\sin x}{x} \, dx = \cos 1 - \int_1^\infty \frac{\cos x}{x^2} \, dx, \quad \text{convergent}. \qquad \blacksquare$$

*Verification.* Numerically, $\int_0^\infty \sin x / x \, dx = \pi/2$ (the Dirichlet integral), so $\int_1^\infty \sin x/x \, dx = \pi/2 - \int_0^1 \sin x /x \, dx$, a finite number. $\checkmark$

*Interpretation.* **Conditional convergence via IBP**: the oscillation of $\sin x$ gives a bounded antiderivative $\cos x$; the IBP trick transforms $1/x$ (which is not integrable at $\infty$) into $1/x^2$ (which is). A general method: for $\int f \sin(kx) \, dx$ with $f$ decreasing to $0$, the integral converges by the Dirichlet test. $\blacksquare$

---

**Solution 43.**

*Setup.* $f \in C[0,1]$, $\int_0^1 f(x) x^n \, dx = 0$ for all $n \geq 0$. Prove $f \equiv 0$.

*Strategy.* Extend orthogonality from monomials to all polynomials by linearity; extend to continuous functions by Weierstrass approximation; deduce $\int f^2 = 0$; conclude $f \equiv 0$ by Problem 39.

*Computation.*

1. **Orthogonality to polynomials.** For any polynomial $p(x) = \sum_{k=0}^m a_k x^k$:
$$\int_0^1 f(x) p(x) \, dx = \sum_{k=0}^m a_k \int_0^1 f(x) x^k \, dx = \sum a_k \cdot 0 = 0.$$

2. **Weierstrass approximation theorem.** Every continuous function $g : [0,1] \to \mathbb{R}$ is a uniform limit of polynomials: $\exists$ polynomials $p_n$ with $\|g - p_n\|_\infty \to 0$ as $n \to \infty$. (See e.g. [[25-riemann-stieltjes-integral]] or a real analysis text.)

3. **Apply with $g = f$.** Let $p_n$ be polynomials with $\|f - p_n\|_\infty < 1/n$.

4. Compute $\int f^2$:
$$\int_0^1 f^2 \, dx = \int_0^1 f(f - p_n) \, dx + \int_0^1 f p_n \, dx.$$

5. **Second term:** by step 1, $\int f p_n \, dx = 0$ for every $n$.

6. **First term:**
$$\left| \int_0^1 f(x)[f(x) - p_n(x)] \, dx \right| \leq \int_0^1 |f| \cdot |f - p_n| \, dx \leq \|f\|_\infty \cdot \|f - p_n\|_\infty \cdot (1 - 0) < \|f\|_\infty/n.$$

7. Therefore, for every $n$:
$$\left| \int_0^1 f^2 \, dx \right| \leq \frac{\|f\|_\infty}{n}.$$

8. Let $n \to \infty$: $\int_0^1 f^2 \, dx = 0$.

9. Since $f^2 \geq 0$ is continuous and $\int f^2 = 0$, by Problem 39, $f^2 \equiv 0$, hence $f \equiv 0$. $\blacksquare$

*Verification.* The hypothesis is strictly necessary: consider $f(x) = \sin(\pi x)$ — it satisfies $\int_0^1 f \cdot 1 \, dx \neq 0$, so it doesn't meet the hypothesis, so the conclusion can fail (indeed $f \not\equiv 0$). $\checkmark$

*Interpretation.* The monomials $\{x^n\}_{n \geq 0}$ form a "total set" in $C[0,1]$: a continuous function orthogonal to every monomial is zero. This is Weierstrass's theorem in action and is the prototype for "completeness of a basis" in Hilbert space (e.g., Fourier series, orthogonal polynomials). It is also the theoretical underpinning of the **moment problem**: a probability distribution on $[0,1]$ is uniquely determined by its moments. $\blacksquare$

---

## 26.8 Summary Table — Key Techniques for CO5

| Technique                     | When to use                                                 | Reference                   |
| ----------------------------- | ----------------------------------------------------------- | --------------------------- |
| Darboux criterion             | Prove integrability without computing the integral          | [[25-riemann-stieltjes-integral\|§25.3]] |
| Reduction to Riemann          | $\alpha \in C^1$: replace $d\alpha$ with $\alpha'(x) dx$    | [[25-riemann-stieltjes-integral\|§25.6]] |
| Step-function $\alpha$        | Converts integral to a sum                                  | Problems 18, 19             |
| FTC I                         | Differentiate integrals with variable upper limit            | Problems 24, 26, 27         |
| FTC II                        | Evaluate definite integral via antiderivative                | Problem 25                  |
| Integration by parts          | Integrand = product; one factor has simple antiderivative   | Problems 30–32              |
| Substitution                  | Integrand has composite $g(h(x)) h'(x)$                      | Problem 33                  |
| MVT for integrals             | Extract pointwise value from an integral                     | Problems 34–36              |
| Riemann sum → integral        | Evaluate limits of the form $\tfrac{1}{n}\sum f(k/n)$        | Problem 40                  |
| Weierstrass approximation     | Leverage polynomial density in $C[a,b]$                      | Problem 43                  |
| Riemann-Lebesgue lemma        | Oscillatory integrals vanish in high-frequency limit         | Problem 41                  |
| Conditional convergence (IBP) | Transform non-absolute integrals to absolute convergence    | Problem 42                  |
| Cauchy-Schwarz                | Bound $\int fg$ by $\|f\|_2 \|g\|_2$                        | Problem 38                  |

---

## 26.9 Cross-References

**CO5 prerequisites:**
- [[22-differentiation]] — derivatives needed for FTC and reduction theorem
- [[23-mean-value-theorems]] — MVT underlies FTC II and reduction theorem
- [[20-ivt-and-connectedness]] — IVT and EVT are used in MVT for integrals
- [[07-compact-sets]] — Heine-Cantor ensures continuous $f \Rightarrow f$ integrable

**CO5 core file:** [[25-riemann-stieltjes-integral]] — all theorems used here are proved there.

**Extensions** (beyond syllabus):
- Lebesgue integration theory
- Vector-valued integration $[a,b] \to \mathbb{R}^n$ — see [[24-lhopital-vector-derivatives]] §24.6
- Multivariable integration — see [[VACV/guide/06-multivariable-integrals]]
- Line integrals and Green's theorem — see [[VACV/guide/09-green-stokes-theorems]]

---

*End of CO5 practice set. This completes the five sets of practice problems covering the full MAT 2234 syllabus.*
