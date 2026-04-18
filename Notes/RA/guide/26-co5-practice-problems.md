# 26. CO5 Practice Problems — The Riemann-Stieltjes Integral

> **Scope.** This is a comprehensive problem set for **CO5** (Lessons 34–36 of MAT 2234), covering the Riemann-Stieltjes integral. Problems progress from computational drills on partitions and upper/lower sums, through the Darboux integrability criterion, onto the reduction theorem that links the Stieltjes integral to the classical Riemann integral and to summation, and finally to the Fundamental Theorem of Calculus, integration by parts, change of variables, and mean-value theorems for integrals.
>
> **Prerequisites:** [[22-differentiation]], [[23-mean-value-theorems]], [[24-lhopital-vector-derivatives]], [[25-riemann-stieltjes-integral]].
>
> Each part contains fully worked solutions. For conceptual scaffolding, keep [[25-riemann-stieltjes-integral]] open alongside this set.

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

**Solution 1.** With $x_k = k/n$, $\Delta \alpha_k = 1/n$. Since $f$ is increasing, $M_k = x_k = k/n$ and $m_k = x_{k-1} = (k-1)/n$. Hence
$$U(P_n) = \sum_{k=1}^{n} \frac{k}{n} \cdot \frac{1}{n} = \frac{1}{n^2} \cdot \frac{n(n+1)}{2} = \frac{n+1}{2n}, \quad L(P_n) = \frac{n-1}{2n}.$$
Then $U - L = 1/n \to 0$, so $\int_0^1 x \, dx = \lim \tfrac{n+1}{2n} = \tfrac{1}{2}$. $\blacksquare$

**Solution 2.** $m_k = (x_{k-1})^2 = (k-1)^2/n^2$. So
$$L(P_n) = \sum_{k=1}^{n} \frac{(k-1)^2}{n^2} \cdot \frac{1}{n} = \frac{1}{n^3} \sum_{j=0}^{n-1} j^2 = \frac{1}{n^3} \cdot \frac{(n-1)n(2n-1)}{6}.$$
As $n \to \infty$, $L(P_n) \to \frac{2n^3}{6 n^3} = \frac{1}{3}$. Similarly $U(P_n) \to \frac{1}{3}$, so $\int_0^1 x^2 \, dx = \tfrac{1}{3}$. $\blacksquare$

**Solution 3.** For any partition $P = \{x_0, \ldots, x_n\}$, $M_k = m_k = c$ on each $[x_{k-1}, x_k]$. Hence
$$U(P) = L(P) = \sum_{k=1}^{n} c\,[\alpha(x_k) - \alpha(x_{k-1})] = c[\alpha(b) - \alpha(a)]$$
(telescoping). So $\overline{\int} f d\alpha = \underline{\int} f d\alpha = c[\alpha(b) - \alpha(a)]$. $\boxed{\int_a^b c \, d\alpha = c[\alpha(b) - \alpha(a)]}$ $\blacksquare$

**Solution 4.** On $[x_{k-1}, x_k]$, $M_k - m_k = f(x_k) - f(x_{k-1})$ since $f$ is increasing. So
$$U - L = h \sum_{k=1}^{n} [f(x_k) - f(x_{k-1})] = h[f(b) - f(a)] \quad \text{(telescoping)}.$$
Pick $n$ so that $h[f(b) - f(a)] < \varepsilon$. By Darboux's criterion, $f \in \mathcal{R}[a,b]$. $\blacksquare$

**Solution 5.** Use $P = \{0, 1-\delta, 1, 2-\delta, 2, 3\}$ for small $\delta > 0$. $f$ is $0, 0, 1, 1, 2$ on the five subintervals respectively.
- Lower sum: $0(1-\delta) + 0 \cdot \delta + 1(1-\delta) + 1 \cdot \delta + 2 \cdot 1 = 1 - \delta + \delta + 2 = 3$.

Wait, let me redo. $f(x) = \lfloor x \rfloor$ gives $f = 0$ on $[0,1)$, $f = 1$ on $[1, 2)$, $f = 2$ on $[2, 3)$, $f(3) = 3$. On $[0, 1-\delta]$, $f = 0$, width $1-\delta$. On $[1-\delta, 1]$, $f$ takes values $0$ and $1$ (at $x=1$), so $m = 0$, $M = 1$, width $\delta$. On $[1, 2-\delta]$, $f = 1$, width $1-\delta$. On $[2-\delta, 2]$, $m = 1$, $M = 2$, width $\delta$. On $[2, 3]$, $f = 2$ (except $f(3) = 3$), so $m = 2$, $M = 3$, width $1$.

$$L(P) = 0(1-\delta) + 0\cdot \delta + 1(1-\delta) + 1 \cdot \delta + 2 \cdot 1 = 1 - \delta + \delta + 2 = 3.$$
$$U(P) = 0(1-\delta) + 1 \cdot \delta + 1(1-\delta) + 2 \cdot \delta + 3 \cdot 1 = \delta + 1 - \delta + 2\delta + 3 = 4 + 2\delta.$$

As $\delta \to 0^+$, $U - L \to 1$ — this suggests a finer partition is needed near $x = 3$. Taking partition $\{0, 1-\delta, 1, 2-\delta, 2, 3-\delta, 3\}$: the last subinterval $[3-\delta, 3]$ has $m = 2$, $M = 3$, width $\delta$, and $[2, 3-\delta]$ has $f = 2$, width $1 - \delta$.

$$L = 0 + 0 + 1(1-\delta) + \delta + 2(1-\delta) + 2\delta = 1 - \delta + \delta + 2 - 2\delta + 2\delta = 3.$$
$$U = 0 + \delta + (1-\delta) + 2\delta + 2(1-\delta) + 3\delta = \delta + 1 - \delta + 2\delta + 2 - 2\delta + 3\delta = 3 + 3\delta \to 3.$$

So $\int_0^3 \lfloor x \rfloor \, dx = 0 \cdot 1 + 1 \cdot 1 + 2 \cdot 1 = 3$. $\boxed{3}$ $\blacksquare$

**Solution 6.** It suffices to prove the claim when $P^*$ refines $P$ by a single point $y \in (x_{k-1}, x_k)$. Let $M' = \sup_{[x_{k-1}, y]} f$, $M'' = \sup_{[y, x_k]} f$. Then $M', M'' \leq M_k$, so
$$M'[\alpha(y) - \alpha(x_{k-1})] + M''[\alpha(x_k) - \alpha(y)] \leq M_k [\alpha(x_k) - \alpha(x_{k-1})],$$
hence $U(P^*) \leq U(P)$. Similarly $L(P) \leq L(P^*)$. Iterating gives the general case. $\blacksquare$

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

**Solution 7.** On any subinterval $[x_{k-1}, x_k]$ with $x_k > x_{k-1}$: there are rationals (so $M_k = 1$) and irrationals (so $m_k = 0$). For every partition,
$$U(P) = \sum 1 \cdot (x_k - x_{k-1}) = 1, \quad L(P) = \sum 0 = 0.$$
Hence $\overline{\int} = 1 \neq 0 = \underline{\int}$. Not integrable. $\blacksquare$

**Solution 8.** Fix $\varepsilon > 0$. Let $N$ be large enough that $1/N < \varepsilon/2$. The set
$$A_N = \{x \in [0,1] : T(x) \geq 1/N\} = \{p/q : q \leq N\}$$
is finite — call its size $K_N$. Enclose each point of $A_N$ in an interval of length $\varepsilon/(2K_N)$; call this union $V$ (total length $\leq \varepsilon/2$). Choose a partition $P$ with subintervals of each type either entirely in $V$ or entirely in $[0,1] \setminus V$ (possible by subdividing finely enough). On subintervals in $V$: $M_k \leq 1$. On subintervals outside $V$: $M_k < 1/N < \varepsilon/2$. Then
$$U(P) < 1 \cdot \varepsilon/2 + (\varepsilon/2) \cdot 1 = \varepsilon.$$
Since $L(P) = 0$ always (irrationals dense), $\overline{\int} \leq \varepsilon$ for all $\varepsilon > 0$, so $\overline{\int} = 0 = \underline{\int}$. Hence $\int_0^1 T = 0$. $\blacksquare$

**Solution 9.** No. For any subinterval $[x_{k-1}, x_k] \subset [0,1]$ with $x_{k-1} > 0$, $M_k = x_k$ (rationals dense) and $m_k = 0$ (irrationals dense). So $U(P) = \sum x_k (x_k - x_{k-1}) \to \int_0^1 x \, dx = 1/2$, while $L(P) = 0$. $\overline{\int} = 1/2 \neq 0$. Not integrable. $\blacksquare$

**Solution 10.** Take $P_\delta = \{0, \delta, 1\}$. Then $m_1 = 0$, $M_1 = 1$ on $[0, \delta]$; $m_2 = M_2 = 1$ on $[\delta, 1]$. So $L(P_\delta) = 1 - \delta$, $U(P_\delta) = \delta + (1 - \delta) = 1$. $U - L = \delta \to 0$, hence $f$ integrable with $\int_0^1 f = 1$. $\blacksquare$

**Solution 11.** $f$ is monotone increasing (with jumps), hence integrable. The value on each $[k, k+1)$ is constant $k+1$, so
$$\int_0^4 f = 1 + 2 + 3 + 4 = 10.$$
(Formally: at the boundary $x = k$, choosing left or right value only affects a measure-zero set.) $\boxed{10}$ $\blacksquare$

**Solution 12.** $f$ is bounded ($0 \leq f \leq 1$) and monotone **decreasing** for $x \in (0, 1]$ (smaller $x$ means larger $n$ means smaller $1/n$, actually wait: as $x \to 0^+$, $n \to \infty$, so $f \to 0$). So $f$ is increasing on $(0, 1]$. By Problem 4, monotone bounded is integrable. For the value:
$$\int_0^1 f = \sum_{n=1}^{\infty} \frac{1}{n} \cdot \left(\frac{1}{n} - \frac{1}{n+1}\right) = \sum_{n=1}^{\infty} \frac{1}{n^2(n+1)}.$$
This converges (compare with $\sum 1/n^3$). Via partial fractions $\frac{1}{n^2(n+1)} = \frac{1}{n^2} - \frac{1}{n} + \frac{1}{n+1}$, and
$$\sum_{n=1}^{\infty} \frac{1}{n^2(n+1)} = \frac{\pi^2}{6} - 1.$$
So $\int_0^1 f = \pi^2/6 - 1 \approx 0.6449$. $\blacksquare$

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

**Solution 13.** *Case $c \geq 0$*. For any partition, $\sup(cf + g) \leq c\sup f + \sup g$, so $U(P, cf + g, \alpha) \leq c U(P, f, \alpha) + U(P, g, \alpha)$. Similarly $L(P, cf + g, \alpha) \geq c L(P, f, \alpha) + L(P, g, \alpha)$. Since $f, g \in \mathcal{R}(\alpha)$, given $\varepsilon > 0$, pick $P$ so that $U - L$ for $f$ and $g$ is each $< \varepsilon$. Then $U(P, cf+g) - L(P, cf+g) \leq (c+1)\varepsilon$ — wait, this needs refinement. Take common partition refinement. Then $U(P, cf+g) \leq cU(P, f) + U(P, g) \leq c\int f + \int g + (c+1)\varepsilon$, and similarly $L \geq c \int f + \int g - (c+1)\varepsilon$. Hence $cf + g$ is integrable and the value is $c \int f + \int g$. *Case $c < 0$*: note $\sup(cf) = c \inf f$, so $U(P, cf) = c L(P, f)$, and the claim follows by similar reasoning. $\blacksquare$

**Solution 14.** $\int (g - f) \, d\alpha \geq 0$ because $g - f \geq 0$ on $[a,b]$ forces $L(P, g-f, \alpha) \geq 0$ for every $P$, hence $\underline{\int}(g-f) \geq 0$. By Problem 13, $\int g - \int f = \int (g-f) \geq 0$. $\blacksquare$

**Solution 15.** *Integrability.* On any subinterval $[x_{k-1}, x_k]$,
$$\sup |f| - \inf |f| \leq \sup f - \inf f.$$
(Because $||f(x)| - |f(y)|| \leq |f(x) - f(y)|$.) So $U(P, |f|, \alpha) - L(P, |f|, \alpha) \leq U(P, f, \alpha) - L(P, f, \alpha)$. If $f$ integrable, so is $|f|$. *Inequality.* Since $-|f| \leq f \leq |f|$, by Problem 14, $-\int |f| \leq \int f \leq \int |f|$, i.e., $|\int f| \leq \int |f|$. $\blacksquare$

**Solution 16.** Given $\varepsilon > 0$, pick $P$ on $[a,b]$ with $U(P, f, \alpha) - L(P, f, \alpha) < \varepsilon$. WLOG $c \in P$ (refine). Then $P$ splits into $P_1$ on $[a,c]$ and $P_2$ on $[c,b]$, with
$$U(P) = U(P_1) + U(P_2), \quad L(P) = L(P_1) + L(P_2).$$
Both $U(P_i) - L(P_i) < \varepsilon$, so $f$ integrable on each subinterval. For the identity, note $\overline{\int}_a^b = \overline{\int}_a^c + \overline{\int}_c^b$ (same for $\underline{\int}$). $\blacksquare$

**Solution 17.** $-M \leq f \leq M$, so by monotonicity (and Problem 3 for constants),
$$-M[\alpha(b) - \alpha(a)] \leq \int_a^b f \, d\alpha \leq M[\alpha(b) - \alpha(a)],$$
giving $|\int f| \leq M[\alpha(b) - \alpha(a)]$. $\blacksquare$

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

**Solution 18.** Take partition $P_\delta = \{0, 1-\delta, 1, 1+\delta, 2-\delta, 2, 2+\delta, \ldots, n-\delta, n\}$ (avoiding the jump points in the interior of subintervals). On $[k-\delta, k]$, $\Delta \alpha = \alpha(k) - \alpha(k-\delta) = k - (k-1) = 1$ (jump), width $\delta$. On $[k, k+\delta]$, $\Delta \alpha = \alpha(k+\delta) - \alpha(k) = k - k = 0$. On $[k+\delta, k+1-\delta]$ (interior), $\Delta \alpha = 0$. So only subintervals abutting jump points contribute. By continuity of $f$, $M_k, m_k \to f(k)$ on $[k-\delta, k]$ as $\delta \to 0$. Total Riemann-Stieltjes sum $\to \sum_{k=1}^{n} f(k) \cdot 1 = \sum_{k=1}^{n} f(k)$. $\boxed{\int_0^n f \, d\alpha = \sum_{k=1}^{n} f(k)}$ $\blacksquare$

**Solution 19.** Partition $\{a, c - \delta, c, c + \delta, b\}$. Only the subinterval containing the jump contributes: $\Delta \alpha = 1$ across $[c - \delta, c]$ (since $\alpha(c-\delta) = 0$, $\alpha(c) = 1$). On that subinterval, $M, m \to f(c)$ by continuity. Others have $\Delta \alpha = 0$. So integral $= f(c)$. $\boxed{\int_a^b f \, d\alpha = f(c)}$ $\blacksquare$

**Solution 20.** Split $\alpha = \alpha_1 + \alpha_2$ with $\alpha_1 = x^2$ (continuous) and $\alpha_2 = \lfloor x \rfloor$ (step). By linearity in $\alpha$ (routine verification):
$$\int_0^3 x \, d\alpha = \int_0^3 x \cdot 2x \, dx + \int_0^3 x \, d\lfloor x \rfloor = \int_0^3 2x^2 \, dx + (f(1) + f(2) + f(3))$$
$$= \frac{2 x^3}{3}\Big|_0^3 + (1 + 2 + 3) = 18 + 6 = 24. \quad \boxed{24}$$ $\blacksquare$

**Solution 21.** Fix $\varepsilon > 0$. By uniform continuity of $\alpha'$ (compact domain), pick $\delta$ so $|x - y| < \delta \Rightarrow |\alpha'(x) - \alpha'(y)| < \varepsilon$. Pick partition $P$ with mesh $< \delta$. By MVT on $[x_{k-1}, x_k]$: $\exists \xi_k \in [x_{k-1}, x_k]$ with $\alpha(x_k) - \alpha(x_{k-1}) = \alpha'(\xi_k)(x_k - x_{k-1})$. For any tag $\tau_k \in [x_{k-1}, x_k]$:
$$\sum f(\tau_k) [\alpha(x_k) - \alpha(x_{k-1})] = \sum f(\tau_k) \alpha'(\xi_k) \Delta x_k.$$
Compare with $\sum f(\tau_k) \alpha'(\tau_k) \Delta x_k$: the difference is $\sum f(\tau_k) [\alpha'(\xi_k) - \alpha'(\tau_k)] \Delta x_k$, bounded by $\|f\|_\infty \varepsilon (b-a)$. As mesh $\to 0$, both sums approach their respective integrals; hence they are equal. $\boxed{\int f \, d\alpha = \int f \alpha' \, dx}$ $\blacksquare$

**Solution 22.** Reduction: $d(\sin x) = \cos x \, dx$, so
$$\int_0^{\pi/2} \cos x \, d(\sin x) = \int_0^{\pi/2} \cos^2 x \, dx = \int_0^{\pi/2} \frac{1 + \cos 2x}{2} \, dx = \frac{\pi}{4} + 0 = \frac{\pi}{4}. \quad \boxed{\pi/4}$$ $\blacksquare$

**Solution 23.** For any partition $P$ containing $c$ in the interior of some subinterval $[x_{k-1}, x_k]$: the jump of $\alpha$ across this subinterval is $1$, and $\sup_{[x_{k-1}, x_k]} f = 1$, $\inf = 0$. Contribution to $U - L$ is $1 \cdot 1 = 1$. This cannot be reduced by refinement since $c$ is always in the interior of *some* subinterval unless $c$ itself is a partition point — but even then, whichever subinterval has $c$ as its left endpoint has $\sup f = 1$ there, but we cannot make both $f$ and $\alpha$ well-behaved at the jump simultaneously. More carefully: if $c = x_j$ (partition point), on $[x_{j-1}, x_j = c]$ we have $f = 0$ on the interior but $f(c) = 1$, so $\sup f = 1$, $\inf f = 0$ there, and $\Delta \alpha_j = \alpha(c) - \alpha(x_{j-1}) = 1 - 0 = 1$. Contribution to $U - L \geq 1$. The integral fails to exist. This is the canonical example showing $f$ and $\alpha$ **cannot share a discontinuity at the same point**. $\blacksquare$

---

## 26.5 Part E — Fundamental Theorem of Calculus

**Problem 24 (FTC I).** If $f$ is continuous on $[a, b]$ and $F(x) = \int_a^x f(t) \, dt$, show $F$ is differentiable on $(a, b)$ with $F'(x) = f(x)$.

**Problem 25 (FTC II).** If $f$ is continuous on $[a,b]$ and $G$ is any antiderivative of $f$ (i.e., $G' = f$), show $\int_a^b f = G(b) - G(a)$.

**Problem 26.** Compute $\frac{d}{dx} \int_0^{x^2} \sin(t^2) \, dt$.

**Problem 27 (Leibniz integral rule, basic).** Compute $\frac{d}{dx} \int_{\sin x}^{\cos x} e^{t^2} \, dt$.

**Problem 28.** Evaluate $\int_0^\pi \frac{x \sin x}{1 + \cos^2 x} \, dx$. *Hint: use the substitution $x \mapsto \pi - x$.*

**Problem 29.** Show that if $f$ is continuous on $[a, b]$ and $\int_a^x f(t) \, dt = 0$ for all $x \in [a, b]$, then $f \equiv 0$.

### Solutions — Part E

**Solution 24.** Fix $x \in (a,b)$. For $h > 0$ small:
$$\frac{F(x+h) - F(x)}{h} = \frac{1}{h} \int_x^{x+h} f(t) \, dt.$$
By continuity, given $\varepsilon > 0$, $\exists \delta > 0$ with $|t - x| < \delta \Rightarrow |f(t) - f(x)| < \varepsilon$. Then for $0 < h < \delta$:
$$\left| \frac{1}{h} \int_x^{x+h} f(t) \, dt - f(x) \right| = \left| \frac{1}{h} \int_x^{x+h} [f(t) - f(x)] \, dt \right| \leq \frac{1}{h} \cdot \varepsilon \cdot h = \varepsilon.$$
So $F'(x^+) = f(x)$. Similar for $h < 0$. $\boxed{F'(x) = f(x)}$ $\blacksquare$

**Solution 25.** Let $F(x) = \int_a^x f$. By FTC I, $F'(x) = f(x) = G'(x)$ on $(a,b)$, so $F - G$ is constant (by the constant-function theorem, [[23-mean-value-theorems]]). Say $F - G = c$. Then $F(a) = 0$ gives $c = -G(a)$, hence $F(b) = G(b) - G(a)$, i.e., $\int_a^b f = G(b) - G(a)$. $\blacksquare$

**Solution 26.** Let $F(u) = \int_0^u \sin(t^2) \, dt$. Then $\int_0^{x^2} \sin(t^2) \, dt = F(x^2)$. Chain rule + FTC:
$$\frac{d}{dx} F(x^2) = F'(x^2) \cdot 2x = \sin(x^4) \cdot 2x = \boxed{2x \sin(x^4)}. \quad \blacksquare$$

**Solution 27.** Let $F(u) = \int_0^u e^{t^2} \, dt$. Then the integral equals $F(\cos x) - F(\sin x)$.
$$\frac{d}{dx}[F(\cos x) - F(\sin x)] = e^{\cos^2 x} \cdot (-\sin x) - e^{\sin^2 x} \cdot \cos x = \boxed{-\sin x \cdot e^{\cos^2 x} - \cos x \cdot e^{\sin^2 x}}. \quad \blacksquare$$

**Solution 28.** Let $I = \int_0^\pi \frac{x \sin x}{1 + \cos^2 x} dx$. Substitute $u = \pi - x$, $du = -dx$:
$$I = \int_\pi^0 \frac{(\pi - u) \sin(\pi - u)}{1 + \cos^2(\pi - u)} (-du) = \int_0^\pi \frac{(\pi - u) \sin u}{1 + \cos^2 u} du.$$
Sum: $2I = \pi \int_0^\pi \frac{\sin u}{1 + \cos^2 u} du$. Substitute $v = \cos u$, $dv = -\sin u \, du$:
$$\int_0^\pi \frac{\sin u}{1 + \cos^2 u} du = \int_{-1}^{1} \frac{dv}{1 + v^2} = \arctan v \Big|_{-1}^{1} = \pi/2.$$
So $2I = \pi \cdot \pi/2$, giving $I = \pi^2/4$. $\boxed{\pi^2/4}$ $\blacksquare$

**Solution 29.** Define $F(x) = \int_a^x f$. $F \equiv 0$ by hypothesis, so $F' \equiv 0$. But $F'(x) = f(x)$ by FTC I. Hence $f \equiv 0$. $\blacksquare$

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

**Solution 30.** $(fg)' = f'g + fg'$. By FTC II: $f(b)g(b) - f(a)g(a) = \int_a^b (fg)' = \int_a^b f'g + \int_a^b fg'$. Rearrange. $\blacksquare$

**Solution 31.** For a partition $P = \{x_0, \ldots, x_n\}$, Abel summation gives
$$\sum_k f(\xi_k)[\alpha(x_k) - \alpha(x_{k-1})] = f(b)\alpha(b) - f(a)\alpha(a) - \sum_k \alpha(x_k)[f(\xi_{k+1}) - f(\xi_k)]$$
(for suitable tags). In the mesh-zero limit, LHS $\to \int f \, d\alpha$, last term $\to \int \alpha \, df$. Provided both integrals exist (ensured by Stieltjes existence criterion: if one exists, so does the other, unless shared discontinuity). Hence $\int f \, d\alpha + \int \alpha \, df = f(b)\alpha(b) - f(a)\alpha(a)$. $\blacksquare$

**Solution 32.** IBP with $u = \ln x$, $dv = dx$ gives $du = dx/x$, $v = x$:
$$\int_1^e \ln x \, dx = x \ln x \Big|_1^e - \int_1^e 1 \, dx = e - 0 - (e - 1) = 1. \quad \boxed{1} \quad \blacksquare$$

**Solution 33.** $u = x^2$, $du = 2x \, dx$, so $x \, dx = du/2$. When $x = 0, u = 0$; $x = 1, u = 1$:
$$\int_0^1 x e^{x^2} \, dx = \int_0^1 e^u \cdot \frac{du}{2} = \frac{1}{2}(e - 1). \quad \boxed{(e-1)/2} \quad \blacksquare$$

**Solution 34.** Let $m = \min f$, $M = \max f$ (exist by EVT). Then $m(b-a) \leq \int_a^b f \leq M(b-a)$, so $\int f / (b-a) \in [m, M]$. By IVT, $\exists c \in [a,b]$ with $f(c) = \int f / (b-a)$. $\blacksquare$

**Solution 35.** Let $m \leq f \leq M$. Then $mg \leq fg \leq Mg$, so $m \int g \leq \int fg \leq M \int g$. If $\int g = 0$, then $g = 0$ a.e. so $\int fg = 0 = f(c) \cdot 0$ for any $c$. If $\int g > 0$: $\int fg / \int g \in [m, M]$. By IVT, $\exists c$ with $f(c) = \int fg / \int g$. $\blacksquare$

**Solution 36.** $\int_0^1 n x^n \, dx = \frac{n}{n+1} \to 1$. By weighted MVT, $\exists c_n \in [0,1]$ with
$$\int_0^1 n x^n f(x) \, dx = f(c_n) \cdot \frac{n}{n+1}.$$
$n x^n$ concentrates near $x = 1$ (its mean under the normalization $(n+1)x^n$ is $(n+1)/(n+2) \to 1$), forcing $c_n \to 1$. By continuity $f(c_n) \to f(1)$, and the prefactor $\to 1$. Hence the limit is $f(1)$. More rigorously: split $\int_0^{1-\delta} + \int_{1-\delta}^{1}$. First piece $\leq M \cdot n(1-\delta)^n / (n+1) \to 0$. Second piece $\approx f(1) \cdot \int_{1-\delta}^{1} n x^n \, dx \to f(1)$ as $\delta \to 0$. $\boxed{f(1)}$ $\blacksquare$

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

**Solution 37.** $\gamma'(t) = (-\sin t, \cos t)$, $\|\gamma'(t)\| = \sqrt{\sin^2 t + \cos^2 t} = 1$. So $\int_0^{2\pi} 1 \, dt = 2\pi$, which is the arc length (circumference) of the unit circle. $\boxed{2\pi}$ $\blacksquare$

**Solution 38.** Consider $\int (f - \lambda g)^2 \geq 0$ for all $\lambda$. Expanding: $\int f^2 - 2\lambda \int fg + \lambda^2 \int g^2 \geq 0$. As a quadratic in $\lambda$, its discriminant $\leq 0$:
$$4\left(\int fg\right)^2 - 4 \int f^2 \cdot \int g^2 \leq 0,$$
giving $\left(\int fg\right)^2 \leq \int f^2 \int g^2$. $\blacksquare$

**Solution 39.** Suppose $f(x_0) = 3\delta > 0$ for some $x_0 \in (a,b)$. By continuity, $f \geq \delta$ on some neighborhood $(x_0 - \eta, x_0 + \eta) \subset (a, b)$. So
$$\int_a^b f \geq \int_{x_0 - \eta}^{x_0 + \eta} f \geq \delta \cdot 2\eta > 0,$$
contradiction. If $x_0 \in \{a, b\}$, similar argument on one-sided neighborhood. $\blacksquare$

**Solution 40.** This is a right Riemann sum for $\int_0^1 f$. With uniform partition $P_n$, width $1/n$, right endpoints $k/n$:
$$\frac{1}{n} \sum_{k=1}^{n} f(k/n) = \sum_{k=1}^{n} f(k/n) \cdot \frac{1}{n} \to \int_0^1 f(x) \, dx.$$
(Convergence holds since $f$ continuous $\Rightarrow$ integrable; Riemann sums with decreasing mesh $\to$ integral.) $\blacksquare$

**Solution 41.** *Step function case.* If $f = c$ constant on $[a, b] \subset [0, 2\pi]$: $\int_a^b c \sin(nx) \, dx = -c[\cos(nb) - \cos(na)]/n$, bounded by $2c/n \to 0$. By linearity, same for step functions. *General case.* By Darboux, given $\varepsilon > 0$, $\exists$ step function $s$ with $\int |f - s| < \varepsilon$. Then
$$\left| \int f \sin(nx) \right| \leq \left| \int s \sin(nx) \right| + \int |f - s| \cdot 1 < \varepsilon/n \text{-level} + \varepsilon.$$
More precisely: $\limsup_n |\int f \sin(nx)| \leq \varepsilon$ for all $\varepsilon > 0$, so the limit is $0$. $\blacksquare$

**Solution 42.** IBP with $u = 1/x$, $dv = \sin x \, dx$: $du = -dx/x^2$, $v = -\cos x$.
$$\int_1^N \frac{\sin x}{x} dx = -\frac{\cos x}{x} \Big|_1^N - \int_1^N \frac{\cos x}{x^2} dx = \cos 1 - \frac{\cos N}{N} - \int_1^N \frac{\cos x}{x^2} dx.$$
As $N \to \infty$: $\cos N / N \to 0$. Also $\int_1^\infty \cos x / x^2 \, dx$ converges absolutely since $|\cos x / x^2| \leq 1/x^2$ and $\int 1/x^2$ converges. Hence the integral converges (to $\cos 1 - \int_1^\infty \cos x / x^2 \, dx$). $\blacksquare$

**Solution 43.** By Weierstrass approximation, $\exists$ polynomial $p_n$ with $\|f - p_n\|_\infty < 1/n$ on $[0,1]$. By hypothesis, $\int f p_n = 0$ for every $n$. Hence
$$\int f^2 = \int f(f - p_n) + \int f p_n = \int f(f - p_n) \leq \|f\|_\infty \cdot \frac{1}{n} \to 0.$$
So $\int f^2 = 0$. Since $f^2 \geq 0$ and continuous, by Problem 39, $f^2 \equiv 0$, hence $f \equiv 0$. $\blacksquare$

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
