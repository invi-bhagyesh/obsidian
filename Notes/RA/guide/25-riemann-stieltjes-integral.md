# 25. The Riemann and Riemann-Stieltjes Integral

This is a **cornerstone lesson** — and the conclusion of the undergraduate real analysis course. Here we develop the **Riemann-Stieltjes integral**, a generalisation of the familiar Riemann integral that replaces $dx$ with a more general differential $d\alpha$ determined by an increasing "weighting" function $\alpha$. It unifies:

- Classical integration (Riemann, when $\alpha(x) = x$).
- Sums $\sum f(n)$ (when $\alpha$ is a step function).
- Probability / measure-theoretic integration (when $\alpha$ is a CDF).

We proceed through:
1. Partitions and upper/lower sums.
2. Integrability: the Darboux criterion.
3. Classes of integrable functions (continuous, monotonic).
4. Properties of the integral: linearity, monotonicity, additivity.
5. Fundamental theorem of calculus.
6. Integration by parts and change of variable.

---

## 25.1 Partitions, Upper and Lower Sums

> **Definition 25.1 (Partition).**
> A **partition** $P$ of $[a, b]$ is a finite set $\{x_0, x_1, \ldots, x_n\}$ with $a = x_0 < x_1 < x_2 < \cdots < x_n = b$. The **norm** of $P$ is $\|P\| = \max_i (x_i - x_{i-1})$.

> **Definition 25.2 (Refinement).**
> $P^*$ is a **refinement** of $P$ (written $P \subset P^*$) if every point of $P$ is also in $P^*$. Given partitions $P_1, P_2$, their **common refinement** is $P_1 \cup P_2$.

Let $\alpha : [a, b] \to \mathbb{R}$ be a **monotonically increasing** function, and let $f : [a, b] \to \mathbb{R}$ be a **bounded** function.

Write $\Delta\alpha_i = \alpha(x_i) - \alpha(x_{i-1}) \geq 0$.

> **Definition 25.3 (Upper and lower Stieltjes sums).**
> Given a partition $P = \{x_0, \ldots, x_n\}$, let
> $M_i = \sup_{x \in [x_{i-1}, x_i]} f(x), \qquad m_i = \inf_{x \in [x_{i-1}, x_i]} f(x).$
> 
> The **upper Stieltjes sum** is
> $U(P, f, \alpha) = \sum_{i=1}^n M_i \, \Delta \alpha_i,$
> and the **lower Stieltjes sum** is
> $L(P, f, \alpha) = \sum_{i=1}^n m_i \, \Delta \alpha_i.$

> **Definition 25.4 (Upper and lower integrals).**
> $\overline{\int_a^b} f \, d\alpha = \inf_P U(P, f, \alpha), \qquad \underline{\int_a^b} f \, d\alpha = \sup_P L(P, f, \alpha).$

---

## 25.2 Refinement Lemma

> **Lemma 25.5.** If $P^*$ refines $P$, then
> $L(P, f, \alpha) \leq L(P^*, f, \alpha) \leq U(P^*, f, \alpha) \leq U(P, f, \alpha).$

*Proof sketch.* Adding one point at a time, the new point splits some interval $[x_{i-1}, x_i]$ into $[x_{i-1}, c]$ and $[c, x_i]$. The sup of $f$ on each sub-piece is at most $M_i$, and the sum $M'_1 \Delta \alpha_1' + M'_2 \Delta \alpha_2' \leq M_i \Delta \alpha_i$. Similarly for lower sums with $\geq$. $\blacksquare$

> **Corollary 25.6.** For **any** two partitions $P_1, P_2$:
> $L(P_1, f, \alpha) \leq U(P_2, f, \alpha).$

*Proof.* Let $P = P_1 \cup P_2$ be the common refinement. By the lemma:
$$L(P_1, f, \alpha) \leq L(P, f, \alpha) \leq U(P, f, \alpha) \leq U(P_2, f, \alpha). \ \blacksquare$$

> **Corollary 25.7.** $\underline{\int} f d\alpha \leq \overline{\int} f d\alpha$.

---

## 25.3 Integrability: Definition and the Darboux Criterion

> **Definition 25.8 (Riemann-Stieltjes integrable).**
> $f$ is **Riemann-Stieltjes integrable** with respect to $\alpha$ on $[a, b]$, written $f \in \mathcal{R}(\alpha)$, if
> $\underline{\int_a^b} f \, d\alpha = \overline{\int_a^b} f \, d\alpha.$
> The common value is the **Riemann-Stieltjes integral**, written $\int_a^b f \, d\alpha$.

If $\alpha(x) = x$, this is the **Riemann integral**, written $\int_a^b f(x) \, dx$ or simply $\int_a^b f$. The set $\mathcal{R}(\alpha)$ with $\alpha(x) = x$ is denoted simply $\mathcal{R}$.

> **Theorem 25.9 (Cauchy / Darboux criterion for integrability).**
> $f \in \mathcal{R}(\alpha)$ on $[a, b]$ if and only if for every $\varepsilon > 0$ there exists a partition $P$ with
> $U(P, f, \alpha) - L(P, f, \alpha) < \varepsilon.$

*Proof.*

**(⇐)** Suppose such $P$ exists. Then $\overline{\int} f d\alpha - \underline{\int} f d\alpha \leq U(P) - L(P) < \varepsilon$. Since $\varepsilon$ arbitrary, the upper and lower integrals are equal.

**(⇒)** Suppose $f \in \mathcal{R}(\alpha)$, say with integral $I$. By definition of sup and inf of Stieltjes sums, find $P_1$ with $L(P_1) > I - \varepsilon/2$ and $P_2$ with $U(P_2) < I + \varepsilon/2$. Let $P = P_1 \cup P_2$. Then
$$I - \varepsilon/2 < L(P_1) \leq L(P) \leq U(P) \leq U(P_2) < I + \varepsilon/2,$$
so $U(P) - L(P) < \varepsilon$. $\blacksquare$

---

## 25.4 Classes of Integrable Functions

> **Theorem 25.10 (Continuous ⇒ integrable).** If $f$ is continuous on $[a, b]$ and $\alpha$ is increasing on $[a, b]$, then $f \in \mathcal{R}(\alpha)$.

*Proof.* By Heine-Cantor ([[20-ivt-and-connectedness]]), $f$ is uniformly continuous on $[a, b]$. Given $\varepsilon > 0$, find $\delta > 0$ with $|x - y| < \delta \Rightarrow |f(x) - f(y)| < \varepsilon / (\alpha(b) - \alpha(a) + 1)$ (if $\alpha(b) = \alpha(a)$, $\alpha$ is constant and the result is trivial).

Choose a partition $P$ with $\|P\| < \delta$. On each subinterval, $M_i - m_i < \varepsilon/(\alpha(b) - \alpha(a) + 1)$ (supremum and infimum are attained by continuity on a closed interval; their difference at any two points in the same subinterval is bounded by uniform continuity).

So
$$U(P) - L(P) = \sum_i (M_i - m_i) \Delta \alpha_i < \frac{\varepsilon}{\alpha(b) - \alpha(a) + 1} \sum \Delta\alpha_i = \frac{\varepsilon (\alpha(b) - \alpha(a))}{\alpha(b) - \alpha(a) + 1} < \varepsilon. \ \blacksquare$$

> **Theorem 25.11 (Monotonic ⇒ integrable, continuous $\alpha$).** If $f$ is monotonic on $[a, b]$ and $\alpha$ is continuous and increasing on $[a, b]$, then $f \in \mathcal{R}(\alpha)$.

*Proof sketch.* WLOG $f$ increasing, so on each subinterval $M_i = f(x_i)$ and $m_i = f(x_{i-1})$. Choose $P$ with $\Delta \alpha_i < \varepsilon/(f(b) - f(a) + 1)$ for all $i$ (possible since $\alpha$ continuous, so $\alpha$ uniformly continuous on $[a,b]$). Then
$$U - L = \sum (f(x_i) - f(x_{i-1})) \Delta \alpha_i \leq \left(\frac{\varepsilon}{f(b) - f(a) + 1}\right) \sum (f(x_i) - f(x_{i-1})) = \frac{\varepsilon (f(b) - f(a))}{f(b) - f(a) + 1} < \varepsilon. \ \blacksquare$$

> **Theorem 25.12.** If $f$ has only finitely many discontinuities on $[a, b]$ and is bounded, and $\alpha$ is continuous at every discontinuity of $f$, then $f \in \mathcal{R}(\alpha)$.

---

## 25.5 Properties of the Integral

> **Theorem 25.13 (Linearity and related properties).** Let $f, g \in \mathcal{R}(\alpha)$ on $[a, b]$, and $c \in \mathbb{R}$.
>
> (i) $cf \in \mathcal{R}(\alpha)$ and $\int cf \, d\alpha = c \int f \, d\alpha$.
>
> (ii) $f + g \in \mathcal{R}(\alpha)$ and $\int (f + g) d\alpha = \int f d\alpha + \int g d\alpha$.
>
> (iii) If $f \leq g$ on $[a, b]$, $\int f d\alpha \leq \int g d\alpha$.
>
> (iv) $|f| \in \mathcal{R}(\alpha)$ and $\left|\int f d\alpha\right| \leq \int |f| d\alpha$.
>
> (v) $f^2 \in \mathcal{R}(\alpha)$. If also $g \in \mathcal{R}(\alpha)$, then $fg \in \mathcal{R}(\alpha)$.

> **Theorem 25.14 (Additivity over intervals).** Let $a < c < b$. Then $f \in \mathcal{R}(\alpha)$ on $[a, b]$ iff $f \in \mathcal{R}(\alpha)$ on $[a, c]$ and on $[c, b]$; and
> $\int_a^b f d\alpha = \int_a^c f d\alpha + \int_c^b f d\alpha.$

> **Theorem 25.15 (Linearity in $\alpha$).** If $f \in \mathcal{R}(\alpha_1) \cap \mathcal{R}(\alpha_2)$, then for positive constants $c_1, c_2$:
> $\int f \, d(c_1 \alpha_1 + c_2 \alpha_2) = c_1 \int f d\alpha_1 + c_2 \int f d\alpha_2.$

---

## 25.6 Riemann Sums Form

> **Theorem 25.16 (Riemann sums).** If $f \in \mathcal{R}(\alpha)$ on $[a, b]$, then for any sequence of partitions $P_n$ with $\|P_n\| \to 0$ and any choice of **tags** $t_i \in [x_{i-1}, x_i]$:
> $\lim_{n \to \infty} S(P_n, \{t_i\}, f, \alpha) = \int_a^b f \, d\alpha,$
> where $S(P, \{t_i\}, f, \alpha) = \sum_i f(t_i) \Delta \alpha_i$.

This is the formulation used in introductory calculus, where one typically imagines the tags at endpoints or midpoints.

---

## 25.7 Reduction to Riemann Integrals

> **Theorem 25.17 (Reduction theorem).** Suppose $\alpha$ is increasing on $[a, b]$ and $\alpha'$ is continuous (so $\alpha \in C^1$). Let $f$ be bounded on $[a, b]$. Then $f \in \mathcal{R}(\alpha)$ iff $f \alpha' \in \mathcal{R}$ (Riemann), and
> $\int_a^b f \, d\alpha = \int_a^b f(x) \alpha'(x) \, dx.$

*Proof sketch.* Given a partition $P$, by MVT there exist points $s_i \in (x_{i-1}, x_i)$ with $\Delta \alpha_i = \alpha'(s_i) \Delta x_i$. A careful comparison of Stieltjes sums $\sum f(t_i) \Delta \alpha_i = \sum f(t_i) \alpha'(s_i) \Delta x_i$ with Riemann sums $\sum f(t_i) \alpha'(t_i) \Delta x_i$ uses uniform continuity of $\alpha'$. $\blacksquare$

> **Why Stieltjes?** When $\alpha(x) = x$, this reduces to the Riemann integral, but when $\alpha$ is a step function, we get a weighted sum. E.g., $\alpha(x) = \sum_{k \leq x} 1 = \lfloor x \rfloor$ gives $\int_a^b f \, d\alpha = \sum_{k=\lceil a \rceil}^{\lfloor b \rfloor} f(k)$ — exactly $\sum$-notation! So sums and integrals are unified under the Stieltjes framework.

---

## 25.8 Fundamental Theorem of Calculus

> **Theorem 25.18 (FTC, Part I).** Let $f \in \mathcal{R}$ on $[a, b]$. Define
> $F(x) = \int_a^x f(t) \, dt.$
> Then $F$ is continuous on $[a, b]$. Moreover, if $f$ is continuous at $x_0 \in [a, b]$, then $F$ is differentiable at $x_0$ and $F'(x_0) = f(x_0)$.

*Proof.*

**Continuity.** Since $f$ is bounded, say $|f| \leq M$, for $x, y \in [a, b]$:
$$|F(x) - F(y)| = \left|\int_y^x f \, dt\right| \leq M |x - y|.$$
So $F$ is Lipschitz, hence continuous.

**Differentiability.** Let $f$ be continuous at $x_0$. For $h \neq 0$:
$$\frac{F(x_0 + h) - F(x_0)}{h} - f(x_0) = \frac{1}{h}\int_{x_0}^{x_0 + h} (f(t) - f(x_0)) \, dt.$$

Given $\varepsilon > 0$, by continuity of $f$ at $x_0$, find $\delta > 0$ with $|t - x_0| < \delta \Rightarrow |f(t) - f(x_0)| < \varepsilon$. For $|h| < \delta$:
$$\left| \frac{F(x_0 + h) - F(x_0)}{h} - f(x_0) \right| \leq \frac{1}{|h|} \int_{x_0}^{x_0+h} |f(t) - f(x_0)| \, dt \leq \frac{1}{|h|} \cdot \varepsilon \cdot |h| = \varepsilon. \ \blacksquare$$

> **Theorem 25.19 (FTC, Part II / Evaluation).** Let $f \in \mathcal{R}$ on $[a, b]$. Suppose $F : [a, b] \to \mathbb{R}$ satisfies $F' = f$ on $[a, b]$ (i.e., $F$ is an antiderivative of $f$). Then
> $\int_a^b f(x) \, dx = F(b) - F(a).$

*Proof.* Let $P = \{x_0, \ldots, x_n\}$ be any partition. For each $i$, by MVT on $F$ over $[x_{i-1}, x_i]$:
$$F(x_i) - F(x_{i-1}) = F'(t_i)(x_i - x_{i-1}) = f(t_i) \Delta x_i$$
for some $t_i \in (x_{i-1}, x_i)$.

Sum: $F(b) - F(a) = \sum f(t_i) \Delta x_i$ (telescoping). This is a Riemann sum, bounded by $L(P) \leq F(b) - F(a) \leq U(P)$.

By integrability, as $\|P\| \to 0$, $L(P), U(P) \to \int_a^b f$. Hence $F(b) - F(a) = \int_a^b f$. $\blacksquare$

---

## 25.9 Integration by Parts and Change of Variables

> **Theorem 25.20 (Integration by parts, Riemann-Stieltjes).** If $f \in \mathcal{R}(\alpha)$, then $\alpha \in \mathcal{R}(f)$, and
> $\int_a^b f \, d\alpha + \int_a^b \alpha \, df = f(b) \alpha(b) - f(a) \alpha(a).$

*Proof sketch.* Abel-summation-like argument on Riemann sums. Holds symmetrically in $(f, \alpha)$. $\blacksquare$

> **Theorem 25.21 (Change of variable).** Let $\varphi : [c, d] \to [a, b]$ be strictly increasing and continuous, with $\varphi(c) = a$, $\varphi(d) = b$. Let $f \in \mathcal{R}(\alpha)$ on $[a, b]$. Then
> $\int_a^b f \, d\alpha = \int_c^d (f \circ \varphi) \, d(\alpha \circ \varphi).$

> **Theorem 25.22 (Classical Riemann substitution).** If $\varphi \in C^1$ with $\varphi' > 0$ (say), $f$ continuous, then
> $\int_a^b f(x) \, dx = \int_{\varphi^{-1}(a)}^{\varphi^{-1}(b)} f(\varphi(u)) \, \varphi'(u) \, du.$

---

## 25.10 Mean Value Theorems for Integrals

> **Theorem 25.23 (MVT for integrals, integral form).** If $f$ is continuous on $[a, b]$, there exists $\xi \in [a, b]$ with
> $\int_a^b f \, dx = f(\xi) (b - a).$

*Proof.* Let $M = \max f$, $m = \min f$ on $[a, b]$ (attained by EVT). Then $m(b-a) \leq \int_a^b f \leq M(b-a)$. Divide: $m \leq \bar{f} \leq M$ where $\bar{f} = \frac{1}{b-a} \int f$. By IVT, $\bar{f} = f(\xi)$ for some $\xi$. $\blacksquare$

> **Theorem 25.24 (Generalised MVT for integrals).** If $f$ is continuous and $g \in \mathcal{R}$ with $g \geq 0$ (or $g \leq 0$) on $[a, b]$, then
> $\int_a^b f g \, dx = f(\xi) \int_a^b g \, dx$
> for some $\xi \in [a, b]$.

*Proof.* Let $M = \max f$, $m = \min f$. Since $g \geq 0$: $m g \leq f g \leq M g$, integrating: $m \int g \leq \int f g \leq M \int g$. If $\int g > 0$: divide, apply IVT. If $\int g = 0$: both sides zero. $\blacksquare$

---

## 25.11 Worked Examples

**Example 1 (Fundamental Riemann integral computation).** Evaluate $\int_0^1 x^2 \, dx$.

*Solution:* Partition $[0, 1]$ into $n$ equal subintervals, $x_i = i/n$. Since $f(x) = x^2$ is continuous, $\int$ exists. Riemann sum with right endpoints:
$$\sum_{i=1}^n \frac{i^2}{n^2} \cdot \frac{1}{n} = \frac{1}{n^3} \sum_{i=1}^n i^2 = \frac{1}{n^3} \cdot \frac{n(n+1)(2n+1)}{6} \to \frac{1}{3}. \ \blacksquare$$

Alternatively, by FTC Part II: antiderivative $F(x) = x^3/3$, so $\int_0^1 x^2 = F(1) - F(0) = 1/3$.

---

**Example 2 (Stieltjes integral with step $\alpha$).** Let $\alpha(x) = \lfloor x \rfloor$. Compute $\int_0^3 x^2 \, d\alpha$.

*Solution:* $\alpha$ jumps by 1 at each positive integer; is continuous elsewhere. The Stieltjes integral with step $\alpha$ picks up $f$-values at jump points weighted by jump sizes:
$$\int_0^3 x^2 \, d\alpha = \sum_{k=1}^{3} k^2 \cdot 1 = 1 + 4 + 9 = 14.$$

(Convention: jump points at $k$ contribute $f(k) \cdot $jump size; with right-continuous $\alpha$.)

> **Lesson.** The Stieltjes framework unifies sums and integrals: a discrete sum is a special case of an integral.

---

**Example 3.** Compute $\dfrac{d}{dx} \int_0^{x^2} \sin t \, dt$.

*Solution:* Let $F(u) = \int_0^u \sin t \, dt = 1 - \cos u$. Then $\int_0^{x^2} \sin t \, dt = F(x^2)$. Chain rule:
$$\frac{d}{dx} F(x^2) = F'(x^2) \cdot 2x = \sin(x^2) \cdot 2x. \ \blacksquare$$

---

**Example 4.** Use change of variable to evaluate $\int_0^1 x \sqrt{1 - x^2} \, dx$.

*Solution:* Substitute $u = 1 - x^2$, so $du = -2x \, dx$. When $x = 0$, $u = 1$; when $x = 1$, $u = 0$. So
$$\int_0^1 x \sqrt{1 - x^2} \, dx = \int_1^0 \sqrt{u} \cdot \left(-\frac{1}{2}\right) du = \frac{1}{2} \int_0^1 \sqrt{u} \, du = \frac{1}{2} \cdot \frac{2}{3} = \frac{1}{3}. \ \blacksquare$$

---

**Example 5 (Non-integrable function — Dirichlet).** Show that the Dirichlet function $D(x) = \mathbf{1}_{\mathbb{Q}}(x)$ on $[0, 1]$ is **not** Riemann integrable.

*Solution:* For any partition $P$ of $[0, 1]$: every subinterval $[x_{i-1}, x_i]$ contains both rationals (where $D = 1$) and irrationals (where $D = 0$). So $M_i = 1$ and $m_i = 0$ for every $i$.

Hence $U(P, D) = \sum 1 \cdot \Delta x_i = 1$ and $L(P, D) = \sum 0 \cdot \Delta x_i = 0$. So $\overline{\int_0^1} D = 1$, $\underline{\int_0^1} D = 0$. Upper $\neq$ lower, so $D \notin \mathcal{R}$. $\blacksquare$

> **Moral.** The Riemann integral is inadequate for "very wild" functions. This motivates the Lebesgue integral, a subject for further study.

---

## 25.12 Practice Problems

1. Prove that $f(x) = x$ on $[0, 1]$ is Riemann integrable directly from the Darboux criterion (no FTC). Compute the integral.

2. Let $\alpha(x) = x$ for $x \in [0, 1]$ and $\alpha(x) = 2 + x$ for $x \in (1, 2]$ (jump of 2 at $x = 1$). Compute $\int_0^2 x \, d\alpha$.

3. Let $f$ be continuous on $[a, b]$ with $\int_a^b f \, dx = 0$ and $f \geq 0$. Show $f \equiv 0$.

4. Let $F(x) = \int_0^x \frac{\sin t}{t} \, dt$ (with $F(0) = 0$, using the limit $\sin t / t \to 1$). Find $F'(x)$.

5. Let $\alpha : [0, 1] \to \mathbb{R}$ be increasing with $\alpha(0) = 0$, $\alpha(1) = 1$, and $\alpha$ continuous. For $f$ continuous on $[0,1]$, show $\left|\int_0^1 f \, d\alpha\right| \leq \max_{[0,1]} |f|$.

### Solutions

**1.** Partition $[0, 1]$ into $n$ equal subintervals. $f(x) = x$ is increasing, so $M_i = i/n$, $m_i = (i-1)/n$, $\Delta x_i = 1/n$.

$$U(P_n) = \sum_{i=1}^n \frac{i}{n} \cdot \frac{1}{n} = \frac{1}{n^2} \cdot \frac{n(n+1)}{2} = \frac{n+1}{2n},$$
$$L(P_n) = \sum_{i=1}^n \frac{i-1}{n} \cdot \frac{1}{n} = \frac{1}{n^2} \cdot \frac{n(n-1)}{2} = \frac{n-1}{2n}.$$

$U - L = 1/n \to 0$. By Darboux, integrable. Both converge to $1/2$, so $\int_0^1 x \, dx = 1/2$. $\blacksquare$

---

**2.** $\alpha$ has a jump of 2 at $x = 1$ and $\alpha' = 1$ elsewhere. 

The continuous part contributes $\int_0^1 x \cdot 1 \, dx + \int_1^2 x \cdot 1 \, dx = 1/2 + 3/2 = 2$.

The jump at $x = 1$ contributes $f(1) \cdot (\text{jump}) = 1 \cdot 2 = 2$.

Total: $\int_0^2 x \, d\alpha = 2 + 2 = 4$. $\blacksquare$

---

**3.** Suppose $f(x_0) > 0$ for some $x_0 \in (a, b)$ (boundary case similar). By continuity, $f(x) \geq f(x_0)/2$ on $(x_0 - \delta, x_0 + \delta) \cap [a, b]$ for some $\delta > 0$. Then
$$\int_a^b f \, dx \geq \int_{x_0 - \delta}^{x_0 + \delta} f \, dx \geq \frac{f(x_0)}{2} \cdot 2\delta > 0,$$
contradicting $\int f = 0$. So $f \equiv 0$. $\blacksquare$

---

**4.** By FTC Part I, $F'(x) = \frac{\sin x}{x}$ for $x > 0$. At $x = 0$: $F'(0) = \lim_{h \to 0} \frac{F(h) - F(0)}{h} = \lim_{h \to 0} \frac{1}{h} \int_0^h \frac{\sin t}{t} dt$. Since $\sin t/t \to 1$ as $t \to 0$, for small $h$ the integrand is close to 1, so the average over $[0, h]$ is close to 1. Hence $F'(0) = 1$. So $F'(x) = \sin x / x$ for $x \neq 0$ and $F'(0) = 1$. $\blacksquare$

---

**5.** Let $M = \max |f|$. Then $-M \leq f(x) \leq M$ on $[0, 1]$. Since $\alpha$ is increasing, $d\alpha \geq 0$, so
$$-M (\alpha(1) - \alpha(0)) \leq \int_0^1 f d\alpha \leq M(\alpha(1) - \alpha(0)),$$
$$-M \leq \int_0^1 f d\alpha \leq M.$$

Hence $\left|\int f d\alpha\right| \leq M = \max |f|$. $\blacksquare$

---

## 25.13 Summary

> **Riemann-Stieltjes framework.**
>
> Given $f$ bounded, $\alpha$ increasing on $[a, b]$:
>
> - **Partitions** $P$; **upper sum** $U(P)$, **lower sum** $L(P)$; refinement lemma.
> - **Upper integral** $\overline{\int}$, **lower integral** $\underline{\int}$.
> - **Integrable** means $\underline{\int} = \overline{\int}$.
> - **Darboux criterion:** $f \in \mathcal{R}(\alpha)$ iff $\inf_P (U(P) - L(P)) = 0$.

> **Classes of integrable functions.**
> - Continuous $f$ on $[a, b]$, any increasing $\alpha$: $f \in \mathcal{R}(\alpha)$.
> - Monotonic $f$, continuous $\alpha$: $f \in \mathcal{R}(\alpha)$.
> - Bounded $f$ with finitely many discontinuities (and $\alpha$ continuous at those): $f \in \mathcal{R}(\alpha)$.

> **Key properties.**
> - Linearity in $f$ and in $\alpha$.
> - Monotonicity: $f \leq g \Rightarrow \int f \leq \int g$.
> - Additivity over intervals.
> - $\left|\int f d\alpha\right| \leq \int |f| d\alpha$.
> - $fg \in \mathcal{R}(\alpha)$ if $f, g \in \mathcal{R}(\alpha)$.

> **Fundamental Theorem of Calculus.**
> - Part I: $F(x) = \int_a^x f$ is continuous; differentiable where $f$ is continuous, with $F' = f$.
> - Part II: if $F' = f$, $\int_a^b f = F(b) - F(a)$.

> **Integration techniques.**
> - Integration by parts (symmetric in $f, \alpha$).
> - Change of variable.
> - Stieltjes reduces to Riemann when $\alpha \in C^1$: $d\alpha = \alpha'(x) dx$.
> - Stieltjes becomes summation when $\alpha$ is a step function.

> **Mean Value Theorems for integrals.**
> - Continuous $f$: $\int_a^b f = f(\xi)(b - a)$ for some $\xi$.
> - Generalised: $\int f g = f(\xi) \int g$ for $g \geq 0$.

> **Limits of the Riemann integral.** Dirichlet's function is not Riemann integrable — motivating the Lebesgue integral. This is a theme picked up in graduate measure theory.

> **Closing big picture.** The Riemann-Stieltjes integral is the culmination of undergraduate real analysis. It:
> - Unites discrete summation and continuous integration.
> - Provides the foundation for probability theory (integrating against CDFs).
> - Lays the groundwork for Lebesgue measure and generalised integration.
> - Completes the cycle: **real numbers → topology → sequences/series → functions/continuity → derivatives → integral.**

---

## Related Topics

- [[20-ivt-and-connectedness]] — Heine-Cantor uniform continuity used in integrability of continuous functions
- [[23-mean-value-theorems]] — MVT used in FTC Part II and reduction theorem
- [[22-differentiation]] — FTC shows integration as inverse to differentiation
- [[17-types-of-discontinuity-monotonic]] — monotonic functions have countable discontinuities; key to integrability
- [[07-compact-sets]] — compactness used for EVT, uniform continuity
- [[24-lhopital-vector-derivatives]] — vector-valued analogues, arc length
- [[VACV/guide/03-line-integrals]] — line integrals, a direct continuation in vector calculus
