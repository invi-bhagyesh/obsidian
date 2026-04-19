# 25. The Riemann and Riemann-Stieltjes Integral

> **The capstone.** The **Riemann-Stieltjes integral** $\int_a^b f\,d\alpha$ generalises the classical Riemann integral $\int_a^b f(x)\,dx$ by replacing the uniform measure $dx$ with a general "weighting" $d\alpha$ determined by a monotonically increasing function $\alpha : [a,b] \to \mathbb{R}$. This single framework unifies three seemingly disparate objects:
>
> - **Classical Riemann integration** (take $\alpha(x) = x$, so $d\alpha = dx$);
> - **Discrete summation** (take $\alpha$ a step function, so $d\alpha$ is a sum of Dirac masses at the jump points);
> - **Probabilistic / measure-theoretic integration** (take $\alpha$ the cumulative distribution function of a random variable, so $\int f\,d\alpha = E[f(X)]$).
>
> The chapter develops, in order:
> 1. Partitions and upper/lower (Darboux-Stieltjes) sums.
> 2. The refinement lemma and monotonicity of sums under refinement.
> 3. The Cauchy-Darboux criterion for integrability.
> 4. Classes of integrable functions: continuous, monotonic, boundedly-discontinuous.
> 5. Linearity, monotonicity, interval-additivity of the integral.
> 6. Tagged-Riemann-sum formulation.
> 7. Reduction to Riemann integration when $\alpha \in C^1$.
> 8. The Fundamental Theorem of Calculus (both parts), fully proved.
> 9. Integration by parts and change of variables.
> 10. Mean-value theorems for integrals.
>
> The treatment follows Rudin *Principles of Mathematical Analysis* Chapter 6 and Apostol *Mathematical Analysis* Chapter 7, at the level expected for a graduate qualifying exam in real analysis.

---

## 25.1 Partitions, Upper and Lower Stieltjes Sums

> **Definition 25.1 (Partition).**
> A **partition** $P$ of a closed bounded interval $[a, b]$ is a finite ordered set
> $$P = \{x_0, x_1, \ldots, x_n\}, \qquad a = x_0 < x_1 < x_2 < \cdots < x_n = b.$$
> The **norm** (or **mesh**) of $P$ is
> $$\|P\| = \max_{1 \leq i \leq n} (x_i - x_{i-1}).$$
> We write $\mathcal{P}[a,b]$ for the collection of all partitions of $[a,b]$.

**Remark (why ordered finite sets).** A partition is a finite ordered object, yet we write it as a set. The subset relation between sets $P \subset P^*$ then encodes refinement (adding points). Finiteness is essential: every sum below is a finite sum, so no convergence issues arise until we pass to sup/inf over all partitions.

> **Definition 25.2 (Refinement).**
> A partition $P^*$ is a **refinement** of $P$ (written $P \subseteq P^*$) if every point of $P$ is also a point of $P^*$. Given two partitions $P_1, P_2$ of $[a, b]$, their **common refinement** is $P_1 \cup P_2$ (ordered naturally as a subset of $[a,b]$).

Observe that the common refinement of any two partitions is itself a partition, and it refines each of them. This is the analogue, in the theory of integration, of the filter-basis property that makes Darboux's machine work.

Throughout, let
- $\alpha : [a, b] \to \mathbb{R}$ be **monotonically increasing** (so $x \leq y \Rightarrow \alpha(x) \leq \alpha(y)$), and
- $f : [a, b] \to \mathbb{R}$ be **bounded**.

Boundedness of $f$ ensures the sup/inf on every subinterval exists in $\mathbb{R}$; monotonicity of $\alpha$ ensures each increment $\Delta\alpha_i \geq 0$, so signs behave as expected.

Write
$$\Delta\alpha_i = \alpha(x_i) - \alpha(x_{i-1}) \geq 0, \qquad \Delta x_i = x_i - x_{i-1}.$$
Note $\sum_{i=1}^n \Delta\alpha_i = \alpha(b) - \alpha(a)$ (telescoping) and $\sum \Delta x_i = b - a$.

> **Definition 25.3 (Upper and lower Stieltjes sums).**
> Given a partition $P = \{x_0, \ldots, x_n\}$ of $[a,b]$, let
> $$M_i = \sup_{x \in [x_{i-1}, x_i]} f(x), \qquad m_i = \inf_{x \in [x_{i-1}, x_i]} f(x).$$
> The **upper Stieltjes sum** is
> $$U(P, f, \alpha) = \sum_{i=1}^n M_i \, \Delta\alpha_i,$$
> and the **lower Stieltjes sum** is
> $$L(P, f, \alpha) = \sum_{i=1}^n m_i \, \Delta\alpha_i.$$
> We write $U(P)$ and $L(P)$ when $f, \alpha$ are understood.

**Two immediate observations.**

1. If $|f(x)| \leq M$ on $[a,b]$, then both $|M_i|, |m_i| \leq M$, so
$$|U(P)|, |L(P)| \leq M \cdot (\alpha(b) - \alpha(a)),$$
so the sets $\{U(P) : P \in \mathcal{P}\}$ and $\{L(P) : P \in \mathcal{P}\}$ are bounded subsets of $\mathbb{R}$.

2. For every partition $P$, $m_i \leq M_i$, so
$$L(P) \leq U(P).$$

> **Definition 25.4 (Upper and lower integrals).**
> $$\overline{\int_a^b} f \, d\alpha \;=\; \inf_{P \in \mathcal{P}[a,b]} U(P, f, \alpha), \qquad \underline{\int_a^b} f \, d\alpha \;=\; \sup_{P \in \mathcal{P}[a,b]} L(P, f, \alpha).$$

The definitions make sense because $\{U(P)\}$ is bounded below (by $-M(\alpha(b) - \alpha(a))$) and $\{L(P)\}$ is bounded above.

**Interpretive remark.** $U(P)$ is a "pessimistic over-estimate" (take the largest value of $f$ on each subinterval) and $L(P)$ is a "pessimistic under-estimate". We expect refinement to force the two estimates closer. This is exactly what the refinement lemma will say.

---

## 25.2 The Refinement Lemma

> **Lemma 25.5 (Monotonicity under refinement).** If $P \subseteq P^*$, then
> $$L(P, f, \alpha) \leq L(P^*, f, \alpha) \leq U(P^*, f, \alpha) \leq U(P, f, \alpha).$$

**Proof.**

**(1) Reduction to one extra point.** By induction on $|P^* \setminus P|$. If $|P^* \setminus P| = 0$, $P^* = P$ and equality holds. If $P^* = P \cup \{c\}$ with $c \in (x_{i-1}, x_i)$ for some fixed $i$, we compare the two sums; the general case follows by adding points one at a time.

**(2) One-point refinement: upper sum.** Let $c \in (x_{i-1}, x_i)$ be the new point. All subintervals of $P$ other than the $i$th are untouched. On the $i$th interval, we split $[x_{i-1}, x_i]$ into $[x_{i-1}, c]$ and $[c, x_i]$. Set
$$M_i' = \sup_{[x_{i-1}, c]} f, \qquad M_i'' = \sup_{[c, x_i]} f.$$

Because $[x_{i-1}, c] \subseteq [x_{i-1}, x_i]$, the supremum over the smaller set is at most the supremum over the larger, so $M_i' \leq M_i$ and $M_i'' \leq M_i$.

Write $\Delta\alpha_i' = \alpha(c) - \alpha(x_{i-1})$ and $\Delta\alpha_i'' = \alpha(x_i) - \alpha(c)$, both $\geq 0$ by monotonicity of $\alpha$, and $\Delta\alpha_i' + \Delta\alpha_i'' = \Delta\alpha_i$. Then the contribution of the $i$th block to $U(P^*)$ is
$$M_i' \Delta\alpha_i' + M_i'' \Delta\alpha_i'' \leq M_i \Delta\alpha_i' + M_i \Delta\alpha_i'' = M_i \Delta\alpha_i,$$
which is exactly the $i$th block's contribution to $U(P)$. All other blocks agree. Hence $U(P^*) \leq U(P)$.

**(3) One-point refinement: lower sum.** Let $m_i' = \inf_{[x_{i-1}, c]} f$ and $m_i'' = \inf_{[c, x_i]} f$. The infimum over a smaller set is at least the infimum over the larger, so $m_i' \geq m_i$ and $m_i'' \geq m_i$. Thus
$$m_i' \Delta\alpha_i' + m_i'' \Delta\alpha_i'' \geq m_i (\Delta\alpha_i' + \Delta\alpha_i'') = m_i \Delta\alpha_i,$$
so $L(P^*) \geq L(P)$.

**(4) Middle inequality.** Already noted: $L(Q) \leq U(Q)$ for any single partition $Q$, applied to $Q = P^*$.

**(5) Iteration.** For an arbitrary refinement $P \subseteq P^*$, add the points of $P^* \setminus P$ one at a time. Each step preserves the monotonicity inequalities, so the conclusion holds. $\blacksquare$

> **Corollary 25.6 (Cross-comparison).** For **any** two partitions $P_1, P_2 \in \mathcal{P}[a,b]$,
> $$L(P_1, f, \alpha) \leq U(P_2, f, \alpha).$$

**Proof.** Let $P = P_1 \cup P_2$ be the common refinement. Since $P_1 \subseteq P$ and $P_2 \subseteq P$, Lemma 25.5 gives
$$L(P_1) \leq L(P) \leq U(P) \leq U(P_2). \ \blacksquare$$

> **Corollary 25.7 (Upper $\geq$ lower integral).** $\displaystyle \underline{\int_a^b} f\,d\alpha \leq \overline{\int_a^b} f\,d\alpha.$

**Proof.** Fix any $P_2 \in \mathcal{P}$. By Corollary 25.6, $L(P_1) \leq U(P_2)$ for every $P_1$, so taking sup over $P_1$:
$$\underline{\int} f\,d\alpha = \sup_{P_1} L(P_1) \leq U(P_2).$$
Since this holds for every $P_2$, take inf over $P_2$:
$$\underline{\int} f\,d\alpha \leq \inf_{P_2} U(P_2) = \overline{\int} f\,d\alpha. \ \blacksquare$$

**Interpretive remark.** Corollary 25.7 is the precise statement "lower estimates are always $\leq$ upper estimates." Equality is not automatic — it defines integrability.

---

## 25.3 Integrability: Definition and the Darboux Criterion

> **Definition 25.8 (Riemann-Stieltjes integrable).**
> A bounded function $f : [a, b] \to \mathbb{R}$ is **Riemann-Stieltjes integrable** with respect to a monotonically increasing $\alpha$, written $f \in \mathcal{R}(\alpha)$ on $[a, b]$, if
> $$\underline{\int_a^b} f \, d\alpha \;=\; \overline{\int_a^b} f \, d\alpha.$$
> The common value is the **Riemann-Stieltjes integral**, written $\displaystyle\int_a^b f\,d\alpha$.

When $\alpha(x) = x$, this is the **Riemann integral**, written $\int_a^b f(x)\,dx$ or $\int_a^b f$. The class $\mathcal{R}(\alpha)$ with $\alpha(x) = x$ is written $\mathcal{R}$.

> **Theorem 25.9 (Cauchy-Darboux criterion for integrability).**
> A bounded $f$ is in $\mathcal{R}(\alpha)$ on $[a, b]$ if and only if for every $\varepsilon > 0$ there exists a partition $P$ such that
> $$U(P, f, \alpha) - L(P, f, \alpha) < \varepsilon.$$

**Proof.**

**($\Leftarrow$) Such $P$ exist $\Rightarrow$ integrable.**

**(1)** Assume that for every $\varepsilon > 0$ there is a partition $P_\varepsilon$ with $U(P_\varepsilon) - L(P_\varepsilon) < \varepsilon$.

**(2)** By Corollary 25.7 and the definitions of sup/inf,
$$L(P_\varepsilon) \leq \underline{\int} f\,d\alpha \leq \overline{\int} f\,d\alpha \leq U(P_\varepsilon).$$

**(3)** Subtract:
$$0 \leq \overline{\int} f\,d\alpha - \underline{\int} f\,d\alpha \leq U(P_\varepsilon) - L(P_\varepsilon) < \varepsilon.$$

**(4)** Since $\varepsilon > 0$ was arbitrary, the non-negative quantity $\overline{\int} - \underline{\int}$ is less than every positive number, hence zero. Therefore the upper and lower integrals coincide, i.e., $f \in \mathcal{R}(\alpha)$.

**($\Rightarrow$) Integrable $\Rightarrow$ such $P$ exist.**

**(1) Setup.** Suppose $f \in \mathcal{R}(\alpha)$, with common value $I = \int_a^b f\,d\alpha$. Fix $\varepsilon > 0$.

**(2) Approximate the sup.** Since $I = \sup_P L(P)$ and $I - \varepsilon/2 < I$, there exists a partition $P_1$ with
$$L(P_1) > I - \varepsilon/2.$$

**(3) Approximate the inf.** Similarly, since $I = \inf_P U(P)$ and $I + \varepsilon/2 > I$, there is a partition $P_2$ with
$$U(P_2) < I + \varepsilon/2.$$

**(4) Common refinement.** Let $P = P_1 \cup P_2$. By Lemma 25.5,
$$L(P_1) \leq L(P), \qquad U(P) \leq U(P_2).$$

**(5) Combine.**
$$I - \varepsilon/2 < L(P_1) \leq L(P) \leq U(P) \leq U(P_2) < I + \varepsilon/2.$$

**(6) Subtract endpoints.**
$$U(P) - L(P) < (I + \varepsilon/2) - (I - \varepsilon/2) = \varepsilon. \ \blacksquare$$

**Verification remark.** The argument has an "approximation game" flavour: given $\varepsilon$, produce two partitions — one making $L$ close to $I$ from below, one making $U$ close from above — then **merge** them via the common refinement. Merging only improves both estimates (Lemma 25.5), so both approximations now hold on the same partition $P$, yielding $U(P) - L(P) < \varepsilon$. This merge-then-refine pattern is archetypal in integration theory.

> **Consequence (useful inequalities).** If $f \in \mathcal{R}(\alpha)$ and $P$ satisfies $U(P) - L(P) < \varepsilon$, then for any tags $t_i, s_i \in [x_{i-1}, x_i]$:
> $$L(P) \leq \sum f(s_i)\Delta\alpha_i, \sum f(t_i)\Delta\alpha_i \leq U(P),$$
> so any tagged sum lies within $\varepsilon$ of $\int_a^b f\,d\alpha$.

This observation will be formalised in §25.6.

---

## 25.4 Classes of Integrable Functions

We now identify wide classes of functions that are Riemann-Stieltjes integrable. The two workhorse results — continuous $f$ and monotonic $f$ — use the same Cauchy-Darboux strategy (produce a partition with $U - L < \varepsilon$) but differ in how the partition is chosen.

> **Theorem 25.10 (Continuous $\Rightarrow$ integrable).** If $f : [a, b] \to \mathbb{R}$ is continuous and $\alpha : [a, b] \to \mathbb{R}$ is monotonically increasing, then $f \in \mathcal{R}(\alpha)$ on $[a, b]$.

**Proof.**

**(0) Trivial case.** If $\alpha(b) = \alpha(a)$, then by monotonicity $\alpha$ is constant on $[a,b]$, every $\Delta\alpha_i = 0$, so $U(P) = L(P) = 0$ for every $P$, and $f \in \mathcal{R}(\alpha)$ with integral $0$. Assume henceforth $\alpha(b) > \alpha(a)$.

**(1) Invoke uniform continuity.** By the Heine-Cantor theorem (see [[20-ivt-and-connectedness]]), a continuous function on the compact interval $[a, b]$ is **uniformly continuous**. Given $\varepsilon > 0$, define
$$\eta = \frac{\varepsilon}{\alpha(b) - \alpha(a)} > 0.$$
By uniform continuity, there exists $\delta > 0$ such that
$$x, y \in [a, b], \ |x - y| < \delta \ \Longrightarrow \ |f(x) - f(y)| < \eta.$$

**(2) Choose a partition of small mesh.** Take any partition $P = \{x_0, \ldots, x_n\}$ with $\|P\| < \delta$; e.g., the uniform partition $x_i = a + i(b - a)/n$ for $n$ large enough that $(b-a)/n < \delta$.

**(3) Bound $M_i - m_i$ on each subinterval.** On each $[x_{i-1}, x_i]$, both the sup $M_i$ and the inf $m_i$ are **attained** (Extreme Value Theorem, since $f$ continuous on a compact interval). Say $M_i = f(u_i)$ and $m_i = f(v_i)$ with $u_i, v_i \in [x_{i-1}, x_i]$. Then $|u_i - v_i| \leq x_i - x_{i-1} \leq \|P\| < \delta$, so by uniform continuity,
$$M_i - m_i = f(u_i) - f(v_i) \leq |f(u_i) - f(v_i)| < \eta.$$

**(4) Bound $U(P) - L(P)$.**
$$U(P) - L(P) = \sum_{i=1}^n (M_i - m_i)\Delta\alpha_i < \eta \sum_{i=1}^n \Delta\alpha_i = \eta(\alpha(b) - \alpha(a)) = \varepsilon.$$

**(5) Invoke Darboux.** Since $\varepsilon > 0$ was arbitrary, by Theorem 25.9, $f \in \mathcal{R}(\alpha)$. $\blacksquare$

**Interpretive remark.** Step (3) is where continuity is used essentially. For general bounded $f$, we cannot control $M_i - m_i$ just by making the subinterval small; this is why the Dirichlet function (Example 5) fails to be integrable.

> **Theorem 25.11 (Monotonic $\Rightarrow$ integrable, continuous $\alpha$).** If $f : [a, b] \to \mathbb{R}$ is monotonic and $\alpha : [a, b] \to \mathbb{R}$ is continuous and monotonically increasing, then $f \in \mathcal{R}(\alpha)$ on $[a, b]$.

**Proof.**

**(0) Setup.** WLOG $f$ is monotonically increasing (the decreasing case follows by replacing $f$ with $-f$; both have the same integrability). If $f(b) = f(a)$, $f$ is constant and trivially integrable. Assume $f(b) > f(a)$. If $\alpha$ is constant, again trivial; assume $\alpha(b) > \alpha(a)$.

**(1) Key feature of monotonicity.** If $f$ is increasing, on each $[x_{i-1}, x_i]$,
$$M_i = \sup_{[x_{i-1}, x_i]} f = f(x_i), \qquad m_i = \inf_{[x_{i-1}, x_i]} f = f(x_{i-1}).$$
Unlike in the continuous case, this requires no limit argument — it is just the definition of monotonicity. Hence
$$M_i - m_i = f(x_i) - f(x_{i-1}).$$
(Note this is generally **not** small; monotonic functions can have jumps of any size.)

**(2) Exploit continuity of $\alpha$ instead.** Since $\alpha$ is continuous on the compact $[a, b]$, $\alpha$ is uniformly continuous. Given $\varepsilon > 0$, set
$$\eta = \frac{\varepsilon}{f(b) - f(a)} > 0.$$
By uniform continuity, there is $\delta > 0$ such that $|x - y| < \delta \Rightarrow |\alpha(x) - \alpha(y)| < \eta$.

**(3) Choose partition of mesh $< \delta$.** Then $\Delta\alpha_i = \alpha(x_i) - \alpha(x_{i-1}) < \eta$ for every $i$.

**(4) Bound $U(P) - L(P)$.**
$$U(P) - L(P) = \sum_{i=1}^n \bigl(f(x_i) - f(x_{i-1})\bigr) \Delta\alpha_i < \eta \sum_{i=1}^n (f(x_i) - f(x_{i-1})) = \eta(f(b) - f(a)) = \varepsilon,$$
where the sum telescopes.

**(5) Darboux.** $f \in \mathcal{R}(\alpha)$ by Theorem 25.9. $\blacksquare$

**Remark (role-reversal).** Theorem 25.10 exploits continuity of $f$ to make $M_i - m_i$ small. Theorem 25.11 exploits continuity of $\alpha$ to make $\Delta\alpha_i$ small. In each case, one of the two factors in $(M_i - m_i)\Delta\alpha_i$ is controlled, and the other factor is bounded over the sum by a telescoping argument.

> **Theorem 25.12 (Bounded with finitely many discontinuities).** If $f$ is bounded on $[a, b]$, has only finitely many points of discontinuity, and $\alpha$ is continuous at every discontinuity of $f$, then $f \in \mathcal{R}(\alpha)$ on $[a, b]$.

*Proof idea.* Isolate each discontinuity inside a short subinterval of small $\Delta\alpha$ (using continuity of $\alpha$), and on the remaining union of compact pieces $f$ is continuous so Theorem 25.10 applies there; adding up gives $U - L < \varepsilon$.

---

## 25.5 Properties of the Integral

> **Theorem 25.13 (Linearity, monotonicity, bounds).** Let $f, g \in \mathcal{R}(\alpha)$ on $[a, b]$, $c \in \mathbb{R}$.
>
> (i) $cf \in \mathcal{R}(\alpha)$ and $\int cf\,d\alpha = c\int f\,d\alpha$.
>
> (ii) $f + g \in \mathcal{R}(\alpha)$ and $\int(f + g)\,d\alpha = \int f\,d\alpha + \int g\,d\alpha$.
>
> (iii) If $f \leq g$ on $[a, b]$, then $\int f\,d\alpha \leq \int g\,d\alpha$.
>
> (iv) $|f| \in \mathcal{R}(\alpha)$ and $\bigl|\int f\,d\alpha\bigr| \leq \int |f|\,d\alpha$.
>
> (v) $f^2 \in \mathcal{R}(\alpha)$. Consequently, $fg = \tfrac14[(f+g)^2 - (f-g)^2] \in \mathcal{R}(\alpha)$.

All parts follow from Darboux applied to carefully chosen partitions; e.g., (iv) uses the identity $\bigl||f(x)| - |f(y)|\bigr| \leq |f(x) - f(y)|$ so that oscillation of $|f|$ is bounded by oscillation of $f$.

> **Theorem 25.14 (Additivity over intervals).** Let $a < c < b$. Then $f \in \mathcal{R}(\alpha)$ on $[a, b]$ iff $f \in \mathcal{R}(\alpha)$ on $[a, c]$ and on $[c, b]$, and in that case
> $$\int_a^b f\,d\alpha \;=\; \int_a^c f\,d\alpha + \int_c^b f\,d\alpha.$$

*Sketch.* Any partition of $[a,b]$ containing $c$ splits into partitions of $[a,c]$ and $[c,b]$, so $U(P, [a,b]) = U(P_1, [a,c]) + U(P_2, [c,b])$ and similarly for $L$. The Darboux criterion then transfers in both directions.

> **Theorem 25.15 (Linearity in $\alpha$).** If $f \in \mathcal{R}(\alpha_1) \cap \mathcal{R}(\alpha_2)$ and $c_1, c_2 > 0$, then $f \in \mathcal{R}(c_1\alpha_1 + c_2\alpha_2)$ and
> $$\int f\,d(c_1\alpha_1 + c_2\alpha_2) \;=\; c_1\int f\,d\alpha_1 + c_2\int f\,d\alpha_2.$$

---

## 25.6 Tagged Riemann Sums

> **Definition (tagged Riemann-Stieltjes sum).** A **tag** for a partition $P = \{x_0, \ldots, x_n\}$ is a choice $t_i \in [x_{i-1}, x_i]$ for each $i$. The corresponding **tagged sum** is
> $$S(P, \{t_i\}, f, \alpha) = \sum_{i=1}^n f(t_i)\,\Delta\alpha_i.$$

> **Theorem 25.16 (Riemann-sum characterisation).** If $f \in \mathcal{R}(\alpha)$ on $[a, b]$, then for any sequence of partitions $P_n$ with $\|P_n\| \to 0$ and any choice of tags $\{t_i^{(n)}\}$,
> $$\lim_{n\to\infty} S(P_n, \{t_i^{(n)}\}, f, \alpha) \;=\; \int_a^b f\,d\alpha.$$

*Why this matters.* It is the formulation one meets in introductory calculus: "$\int f$ is the limit of Riemann sums." Theorem 25.16 asserts this limit exists **independently of tag choice** once $\|P\| \to 0$.

*Sketch.* For any partition $P$ and tags $\{t_i\}$,
$$L(P) \leq S(P, \{t_i\}, f, \alpha) \leq U(P),$$
since $m_i \leq f(t_i) \leq M_i$. By the Darboux criterion, $U(P_n) - L(P_n) \to 0$, so both $L(P_n)$ and $U(P_n)$ converge to $\int f\,d\alpha$, hence so does $S$, by squeeze. (For the full statement — which requires $\|P\| \to 0$, not merely refinement — one needs an extra lemma controlling $U(P) - L(P)$ by the mesh; the argument is standard and we omit it here.)

---

## 25.7 Reduction to Riemann Integrals

> **Theorem 25.17 (Reduction: $d\alpha = \alpha'\,dx$).** Let $\alpha$ be monotonically increasing on $[a, b]$ with $\alpha \in C^1[a, b]$ (i.e., $\alpha'$ exists and is continuous). Let $f$ be bounded on $[a, b]$. Then
> $$f \in \mathcal{R}(\alpha) \iff f\alpha' \in \mathcal{R} \quad \text{(the ordinary Riemann class)},$$
> and when either holds,
> $$\int_a^b f\,d\alpha = \int_a^b f(x)\alpha'(x)\,dx.$$

**Proof sketch.**

**(1)** Fix a partition $P$ and any tags $t_i$. On each subinterval $[x_{i-1}, x_i]$, the Mean Value Theorem applied to $\alpha$ gives $s_i \in (x_{i-1}, x_i)$ with
$$\Delta\alpha_i = \alpha'(s_i)\,\Delta x_i.$$

**(2)** The Stieltjes-sum tag-$t_i$ expression becomes
$$\sum_i f(t_i)\,\Delta\alpha_i = \sum_i f(t_i)\alpha'(s_i)\,\Delta x_i.$$
Compare with the Riemann sum $\sum_i f(t_i)\alpha'(t_i)\,\Delta x_i$. The difference is
$$\sum_i f(t_i)[\alpha'(s_i) - \alpha'(t_i)]\,\Delta x_i.$$

**(3)** Since $\alpha'$ is continuous on the compact $[a,b]$, it is uniformly continuous. Given $\varepsilon > 0$, choose $\delta$ with $|u - v| < \delta \Rightarrow |\alpha'(u) - \alpha'(v)| < \varepsilon$. If $\|P\| < \delta$, then $|s_i - t_i| < \delta$ and the difference above is bounded in absolute value by $\|f\|_\infty \cdot \varepsilon \cdot (b - a)$, which is $O(\varepsilon)$.

**(4)** Hence $\sum f(t_i)\Delta\alpha_i$ and $\sum (f\alpha')(t_i)\Delta x_i$ differ by an amount going to $0$ as $\|P\| \to 0$. They converge to the same limit; by Theorem 25.16, this limit is both $\int f\,d\alpha$ and $\int f\alpha'\,dx$. $\blacksquare$

> **Why Stieltjes?**
>
> - $\alpha(x) = x \Rightarrow d\alpha = dx$: classical Riemann integral.
> - $\alpha \in C^1 \Rightarrow d\alpha = \alpha'(x)\,dx$: generalised integral, equals ordinary Riemann of $f\alpha'$.
> - $\alpha$ a step function, jumping by $c_k$ at $x = k$: $d\alpha$ is a sum of Dirac masses, and $\int f\,d\alpha = \sum_k c_k f(k)$.
>
> So sums and integrals are unified. This is the first bridge from the Riemann theory to the Lebesgue theory.

For instance, with $\alpha(x) = \lfloor x\rfloor$, $\int_a^b f\,d\alpha = \sum_{k=\lceil a\rceil}^{\lfloor b\rfloor} f(k) \cdot 1$ — a finite sum.

---

## 25.8 The Fundamental Theorem of Calculus

> **Theorem 25.18 (FTC, Part I — the derivative of the integral).** Let $f \in \mathcal{R}$ on $[a, b]$, and define $F : [a,b] \to \mathbb{R}$ by
> $$F(x) = \int_a^x f(t)\,dt.$$
>
> (a) $F$ is Lipschitz-continuous on $[a, b]$.
>
> (b) If $f$ is continuous at a point $x_0 \in [a, b]$, then $F$ is differentiable at $x_0$ and $F'(x_0) = f(x_0)$.

**Proof.**

### Part (a): continuity.

**(1)** Since $f$ is Riemann-integrable, $f$ is bounded, say $|f(t)| \leq M$ for all $t \in [a, b]$ and some $M \geq 0$.

**(2)** For $x, y \in [a, b]$ with $x > y$, by interval additivity,
$$F(x) - F(y) = \int_a^x f - \int_a^y f = \int_y^x f(t)\,dt.$$

**(3)** By monotonicity and linearity of the integral,
$$\left|\int_y^x f(t)\,dt\right| \leq \int_y^x |f(t)|\,dt \leq \int_y^x M\,dt = M(x - y).$$

**(4)** Therefore
$$|F(x) - F(y)| \leq M|x - y|$$
for all $x, y \in [a, b]$. $F$ is Lipschitz with constant $M$, hence uniformly continuous.

### Part (b): differentiability where $f$ is continuous.

**(1) Setup.** Let $x_0 \in [a, b]$ and suppose $f$ is continuous at $x_0$. We must show
$$\lim_{h \to 0} \frac{F(x_0 + h) - F(x_0)}{h} = f(x_0),$$
where the limit is one-sided at the endpoints.

**(2) Express the difference quotient.** For $h > 0$ (the $h < 0$ case is analogous),
$$F(x_0 + h) - F(x_0) = \int_{x_0}^{x_0+h} f(t)\,dt,$$
so
$$\frac{F(x_0+h) - F(x_0)}{h} - f(x_0) = \frac{1}{h}\int_{x_0}^{x_0+h} f(t)\,dt - f(x_0) = \frac{1}{h}\int_{x_0}^{x_0+h} [f(t) - f(x_0)]\,dt,$$
using $f(x_0) = \frac{1}{h}\int_{x_0}^{x_0+h} f(x_0)\,dt$.

**(3) Control the integrand by continuity.** Given $\varepsilon > 0$, by continuity of $f$ at $x_0$ there exists $\delta > 0$ with
$$t \in [a,b], \ |t - x_0| < \delta \ \Longrightarrow \ |f(t) - f(x_0)| < \varepsilon.$$

**(4) Apply to the difference quotient.** For $0 < h < \delta$, every $t \in [x_0, x_0 + h]$ satisfies $|t - x_0| \leq h < \delta$, so $|f(t) - f(x_0)| < \varepsilon$. Hence
$$\left|\frac{F(x_0+h) - F(x_0)}{h} - f(x_0)\right| = \left|\frac{1}{h}\int_{x_0}^{x_0+h}[f(t) - f(x_0)]\,dt\right| \leq \frac{1}{h}\int_{x_0}^{x_0+h}|f(t) - f(x_0)|\,dt \leq \frac{1}{h}\cdot\varepsilon\cdot h = \varepsilon.$$

**(5)** The same $\delta$ works for $-\delta < h < 0$ by symmetry. Hence
$$\lim_{h \to 0} \frac{F(x_0+h) - F(x_0)}{h} = f(x_0),$$
so $F'(x_0)$ exists and equals $f(x_0)$. $\blacksquare$

**Interpretive remark.** Part (a) needs no continuity of $f$ — merely boundedness (implied by integrability). Part (b) crucially uses continuity at one point. This is why, even for Riemann-integrable $f$ with finitely many discontinuities, $F$ may fail to be differentiable at precisely those discontinuities — but it is differentiable everywhere else and continuous throughout.

> **Theorem 25.19 (FTC, Part II — evaluation via antiderivatives).** Let $f \in \mathcal{R}$ on $[a, b]$, and suppose $F : [a, b] \to \mathbb{R}$ is a continuous function that is differentiable on $(a, b)$ with $F'(x) = f(x)$ there. Then
> $$\int_a^b f(x)\,dx \;=\; F(b) - F(a).$$

**Proof.**

**(1) Setup: partition and MVT.** Let $P = \{x_0, x_1, \ldots, x_n\}$ be any partition of $[a, b]$. By the Mean Value Theorem (see [[23-mean-value-theorems]]) applied to $F$ on each $[x_{i-1}, x_i]$, there exists $t_i \in (x_{i-1}, x_i)$ with
$$F(x_i) - F(x_{i-1}) = F'(t_i)(x_i - x_{i-1}) = f(t_i)\,\Delta x_i.$$
The MVT applies because $F$ is continuous on the closed interval and differentiable on the open interval, and this is the standard hypothesis.

**(2) Telescope.** Sum over $i$:
$$F(b) - F(a) = \sum_{i=1}^n [F(x_i) - F(x_{i-1})] = \sum_{i=1}^n f(t_i)\,\Delta x_i \;=:\; S(P, \{t_i\}, f).$$
So $F(b) - F(a)$ equals a particular tagged Riemann sum.

**(3) Sandwich by Darboux sums.** For each $i$, $t_i \in [x_{i-1}, x_i]$, so $m_i \leq f(t_i) \leq M_i$ (where $m_i, M_i$ are the inf/sup of $f$ on the $i$th subinterval). Multiplying by $\Delta x_i \geq 0$ and summing:
$$L(P, f) \leq F(b) - F(a) \leq U(P, f).$$

**(4) Squeeze via integrability.** Since $f \in \mathcal{R}$, by Theorem 25.9 there exist partitions $P_n$ with $U(P_n) - L(P_n) \to 0$. Both $L(P_n)$ and $U(P_n)$ converge to $\int_a^b f$. Apply step (3) to $P = P_n$:
$$L(P_n) \leq F(b) - F(a) \leq U(P_n),$$
and take $n \to \infty$. By squeeze,
$$F(b) - F(a) = \int_a^b f(x)\,dx. \ \blacksquare$$

**Verification remark.** The proof makes no use of continuity of $f$. Only $f \in \mathcal{R}$ and existence of an antiderivative $F$ on the interior are required. Surprisingly, integrability and antiderivative-existence are **independent** properties: there exist Riemann-integrable functions (e.g., with a single jump) that have **no** antiderivative; and there exist functions with antiderivatives (the derivative of Volterra's function) that are **not** Riemann-integrable. FTC II gives the clean link only when both hold.

---

## 25.9 Integration by Parts and Change of Variables

> **Theorem 25.20 (Integration by parts, Riemann-Stieltjes).** If $f \in \mathcal{R}(\alpha)$ on $[a, b]$, then $\alpha \in \mathcal{R}(f)$ on $[a, b]$, and
> $$\int_a^b f\,d\alpha + \int_a^b \alpha\,df \;=\; f(b)\alpha(b) - f(a)\alpha(a).$$

**Proof sketch.** Let $P = \{x_0, \ldots, x_n\}$ be a partition and $\{t_i\}$ tags. The key algebraic identity is **Abel summation**:
$$\sum_{i=1}^n f(t_i)\,[\alpha(x_i) - \alpha(x_{i-1})] = f(b)\alpha(b) - f(a)\alpha(a) - \sum_{i=0}^{n} \alpha(x_i)\,[f(t_{i+1}) - f(t_i)]$$
(with the convention $t_0 = a, t_{n+1} = b$). Passing to the limit $\|P\| \to 0$ using Theorem 25.16 on both sides yields the claim. The identity is completely symmetric in the roles of $f$ and $\alpha$ — hence integration by parts. $\blacksquare$

**Special case.** If $\alpha = g$ with $g \in C^1$ and $f \in C^1$, Theorem 25.17 reduces this to the classical integration by parts $\int_a^b f\,g'\,dx = [fg]_a^b - \int_a^b f'\,g\,dx$.

> **Theorem 25.21 (Change of variable, Riemann-Stieltjes).** Let $\varphi : [c, d] \to [a, b]$ be a strictly increasing continuous surjection with $\varphi(c) = a$, $\varphi(d) = b$. If $f \in \mathcal{R}(\alpha)$ on $[a, b]$, then $(f \circ \varphi) \in \mathcal{R}(\alpha \circ \varphi)$ on $[c, d]$, and
> $$\int_a^b f\,d\alpha \;=\; \int_c^d (f \circ \varphi)\,d(\alpha \circ \varphi).$$

*Proof idea.* Any partition $Q = \{u_0, \ldots, u_n\}$ of $[c, d]$ maps via $\varphi$ to a partition $P = \{\varphi(u_0), \ldots, \varphi(u_n)\}$ of $[a, b]$ with $x_i = \varphi(u_i)$. Then $\Delta(\alpha \circ \varphi)_i = \alpha(\varphi(u_i)) - \alpha(\varphi(u_{i-1})) = \Delta\alpha_i$ and the sup/inf of $f \circ \varphi$ over $[u_{i-1}, u_i]$ equals the sup/inf of $f$ over $[x_{i-1}, x_i]$ (since $\varphi$ is a bijection). Hence $U(Q, f\circ\varphi, \alpha\circ\varphi) = U(P, f, \alpha)$ and similarly for $L$. Equality of upper/lower integrals follows by bijection of partitions.

> **Theorem 25.22 (Classical Riemann substitution).** Let $\varphi : [c, d] \to [a, b]$ be $C^1$ with $\varphi' > 0$ on $[c, d]$ (so $\varphi$ is strictly increasing, $\varphi(c) = a$, $\varphi(d) = b$). If $f$ is continuous on $[a, b]$, then
> $$\int_a^b f(x)\,dx \;=\; \int_c^d f(\varphi(u))\,\varphi'(u)\,du.$$

**Proof.** Apply Theorem 25.21 with $\alpha(x) = x$, and then use Theorem 25.17 on the right side: $\alpha\circ\varphi = \varphi$, $d(\alpha\circ\varphi) = d\varphi = \varphi'(u)\,du$. $\blacksquare$

---

## 25.10 Mean Value Theorems for Integrals

> **Theorem 25.23 (MVT for integrals).** If $f : [a, b] \to \mathbb{R}$ is continuous, then there exists $\xi \in [a, b]$ with
> $$\int_a^b f(x)\,dx \;=\; f(\xi)(b - a).$$

**Proof.**

**(1)** By the Extreme Value Theorem, $f$ attains its max $M$ and min $m$ on the compact $[a, b]$: $m = f(v)$, $M = f(u)$ for some $u, v \in [a, b]$.

**(2)** Integrate the pointwise inequality $m \leq f(x) \leq M$:
$$m(b - a) \leq \int_a^b f \leq M(b - a).$$

**(3)** Divide by $b - a > 0$:
$$m \leq \bar{f} := \frac{1}{b - a}\int_a^b f \leq M.$$

**(4)** By the Intermediate Value Theorem (see [[20-ivt-and-connectedness]]), $f$ (continuous on $[a, b]$) attains every value between $m = f(v)$ and $M = f(u)$, in particular $\bar f$. So $\bar f = f(\xi)$ for some $\xi$ between $u$ and $v$ (hence in $[a, b]$). $\blacksquare$

> **Theorem 25.24 (Generalised MVT).** If $f$ is continuous on $[a, b]$ and $g \in \mathcal{R}$ with $g \geq 0$ (or $g \leq 0$) on $[a, b]$, then there exists $\xi \in [a, b]$ with
> $$\int_a^b f(x)g(x)\,dx \;=\; f(\xi)\int_a^b g(x)\,dx.$$

**Proof.**

**(1)** WLOG $g \geq 0$ (the case $g \leq 0$ follows by replacing $g$ by $-g$).

**(2)** With $m, M$ the min/max of $f$ as in Theorem 25.23, $mg \leq fg \leq Mg$ pointwise (since $g \geq 0$). Integrate:
$$m\int g \leq \int fg \leq M\int g.$$

**(3)** If $\int g > 0$: divide by $\int g$. Then $m \leq \frac{\int fg}{\int g} \leq M$, and by IVT, the middle equals $f(\xi)$ for some $\xi \in [a, b]$.

**(4)** If $\int g = 0$: since $g \geq 0$, we have $0 \leq \int fg \leq M\cdot 0 = 0$ (using $f \leq M$, $fg \leq Mg$), and also $\int fg \geq m \cdot 0 = 0$. So both sides of the equation are $0$, any $\xi$ works. $\blacksquare$

---

## 25.11 Worked Examples

### Example 1 (Fundamental Riemann computation). Evaluate $\displaystyle\int_0^1 x^2\,dx$.

**Setup.** We want to evaluate the Riemann integral of the continuous function $f(x) = x^2$ over $[0, 1]$. Since $f$ is continuous on $[0,1]$, by Theorem 25.10 it is integrable; we compute the value in two ways.

**Strategy.**
- *Method A (from definition):* Partition into $n$ equal subintervals, evaluate $U(P_n), L(P_n)$, let $n \to \infty$, use squeeze.
- *Method B (via FTC II):* Exhibit an antiderivative and evaluate.

**Computation (Method A).**

**(1)** Let $P_n$ have $x_i = i/n$, so $\Delta x_i = 1/n$.

**(2)** Since $f(x) = x^2$ is increasing on $[0, 1]$, $M_i = (i/n)^2$ and $m_i = ((i-1)/n)^2$.

**(3)** Upper sum:
$$U(P_n) = \sum_{i=1}^n \frac{i^2}{n^2}\cdot\frac{1}{n} = \frac{1}{n^3}\sum_{i=1}^n i^2 = \frac{1}{n^3}\cdot\frac{n(n+1)(2n+1)}{6} = \frac{(n+1)(2n+1)}{6n^2}.$$

**(4)** Lower sum:
$$L(P_n) = \sum_{i=1}^n \frac{(i-1)^2}{n^2}\cdot\frac{1}{n} = \frac{1}{n^3}\sum_{i=0}^{n-1} i^2 = \frac{(n-1)(2n-1)}{6n^2}.$$

**(5)** Take limits: both $U(P_n) \to 2n\cdot 2n/(6n^2) = 4n^2/(6n^2) \to 1/3$ and similarly $L(P_n) \to 1/3$. Upper and lower integrals equal $1/3$.

**Computation (Method B).** $F(x) = x^3/3$ has $F'(x) = x^2 = f(x)$. By Theorem 25.19,
$$\int_0^1 x^2\,dx = F(1) - F(0) = 1/3.$$

**Verification.** Method A and Method B agree; $U(P_n) - L(P_n) = [(n+1)(2n+1) - (n-1)(2n-1)]/(6n^2) = [6n]/(6n^2) = 1/n \to 0$, consistent with Darboux and providing a numerical rate of convergence.

**Interpretation.** This is the paradigm: for continuous $f$, both Riemann's limit definition and Newton-Leibniz's antiderivative recipe give the same value. $\int_0^1 x^2 = 1/3$. $\blacksquare$

---

### Example 2 (Stieltjes integral with step $\alpha$). Let $\alpha(x) = \lfloor x\rfloor$. Compute $\displaystyle\int_0^3 x^2\,d\alpha$.

**Setup.** $\alpha(x) = \lfloor x\rfloor$ is a monotonically increasing step function: $\alpha = 0$ on $[0, 1)$, $\alpha = 1$ on $[1, 2)$, $\alpha = 2$ on $[2, 3)$, $\alpha(3) = 3$. It has unit jumps at $x = 1, 2, 3$ and is flat in between. $f(x) = x^2$ is continuous, so Theorem 25.10 says $f \in \mathcal{R}(\alpha)$.

**Strategy.** On any interval where $\alpha$ is constant, $\Delta\alpha_i = 0$, contributing $0$ to every Stieltjes sum. All contribution comes from the jumps. We make this precise by computing Stieltjes sums directly on a partition whose points straddle the jumps.

**Computation.**

**(1) Choose a refined partition.** For small $\varepsilon > 0$, take
$$P_\varepsilon = \{0,\, 1-\varepsilon,\, 1+\varepsilon,\, 2-\varepsilon,\, 2+\varepsilon,\, 3-\varepsilon,\, 3\}.$$

**(2) Compute $\Delta\alpha_i$ on each subinterval.**
- $[0, 1-\varepsilon]$: $\alpha$ constant ($=0$), $\Delta\alpha = 0$.
- $[1-\varepsilon, 1+\varepsilon]$: $\alpha$ jumps from $0$ to $1$, $\Delta\alpha = 1$.
- $[1+\varepsilon, 2-\varepsilon]$: $\alpha$ constant ($=1$), $\Delta\alpha = 0$.
- $[2-\varepsilon, 2+\varepsilon]$: $\alpha$ jumps from $1$ to $2$, $\Delta\alpha = 1$.
- $[2+\varepsilon, 3-\varepsilon]$: $\alpha$ constant ($=2$), $\Delta\alpha = 0$.
- $[3-\varepsilon, 3]$: $\alpha$ jumps from $2$ to $3$ at $x = 3$, $\Delta\alpha = 1$.

**(3) Compute $U(P_\varepsilon), L(P_\varepsilon)$.** Only intervals with non-zero $\Delta\alpha$ contribute. On $[k-\varepsilon, k+\varepsilon]$ (for $k = 1, 2$) with $f(x) = x^2$:
- $M_i = \sup f = (k + \varepsilon)^2$,
- $m_i = \inf f = (k - \varepsilon)^2$.

On $[3-\varepsilon, 3]$: $M = 9, m = (3-\varepsilon)^2$.

**(4) Upper and lower sums.**
$$U(P_\varepsilon) = (1+\varepsilon)^2 + (2+\varepsilon)^2 + 9, \qquad L(P_\varepsilon) = (1-\varepsilon)^2 + (2-\varepsilon)^2 + (3-\varepsilon)^2.$$

**(5) Let $\varepsilon \to 0$.**
$$U(P_\varepsilon) \to 1 + 4 + 9 = 14, \qquad L(P_\varepsilon) \to 1 + 4 + 9 = 14.$$
Both converge to $14$, so by squeeze (and Darboux), $\int_0^3 x^2\,d\alpha = 14$.

**Verification.** The general formula: if $\alpha$ jumps by $c_k$ at $x = k$ and is continuous elsewhere, and $f$ is continuous at each $k$, then
$$\int f\,d\alpha = \sum_k c_k\,f(k).$$
Applied with jumps $1$ at $k = 1, 2, 3$ and $f(x) = x^2$: $\int_0^3 x^2\,d\alpha = 1\cdot 1 + 1\cdot 4 + 1\cdot 9 = 14$. $\checkmark$

**Interpretation.** The Stieltjes integral against $\lfloor x\rfloor$ has collapsed to a discrete sum. This is the precise sense in which "sums are integrals" — and conversely, integrals are limits of sums. The bridge between discrete and continuous is built into the very definition of $d\alpha$. $\blacksquare$

---

### Example 3 (Chain rule with FTC). Compute $\displaystyle\frac{d}{dx}\int_0^{x^2}\sin t\,dt$.

**Setup.** Define $G(x) = \int_0^{x^2}\sin t\,dt$. We use FTC Part I to find $dG/dx$ via composition.

**Strategy.** Set $F(u) = \int_0^u \sin t\,dt$ so $G(x) = F(x^2)$. Compute $F'$ via FTC I, then apply the chain rule with $u = x^2$.

**Computation.**

**(1)** $f(t) = \sin t$ is continuous on $\mathbb R$, so by FTC I (Theorem 25.18b), $F$ is differentiable with $F'(u) = \sin u$.

**(2)** By the chain rule,
$$\frac{dG}{dx} = \frac{dF}{du}\bigg|_{u=x^2}\cdot\frac{du}{dx} = \sin(x^2)\cdot 2x = 2x\sin(x^2).$$

**Verification.** Let's double-check with an explicit antiderivative. $\int_0^u\sin t\,dt = 1 - \cos u$, so $G(x) = 1 - \cos(x^2)$. Then $G'(x) = -(-\sin(x^2))\cdot 2x = 2x\sin(x^2)$. $\checkmark$

**Interpretation.** "Differentiation under the integral sign with variable upper limit" is handled cleanly by FTC I + chain rule. For both-limits-variable integrals, Leibniz's rule generalises. $\blacksquare$

---

### Example 4 (Change of variable). Evaluate $\displaystyle\int_0^1 x\sqrt{1 - x^2}\,dx$.

**Setup.** The integrand is continuous on $[0, 1]$, hence Riemann-integrable by Theorem 25.10.

**Strategy.** Substitute $u = 1 - x^2$ to eliminate the square root. Track the transformation of limits and of $dx$.

**Computation.**

**(1) Define substitution.** Let $u = g(x) = 1 - x^2$, so $du/dx = -2x$, i.e., $du = -2x\,dx$. Equivalently, $x\,dx = -\tfrac12\,du$.

**(2) Transform limits.** $x = 0 \Rightarrow u = 1$. $x = 1 \Rightarrow u = 0$.

**(3) Substitute.** The integrand $x\sqrt{1-x^2}\,dx = \sqrt{u}\cdot(-\tfrac12)\,du$. Hence
$$\int_0^1 x\sqrt{1-x^2}\,dx = \int_1^0 \sqrt u\cdot\left(-\tfrac12\right)du = \frac12\int_0^1\sqrt u\,du,$$
flipping limits absorbs the minus sign.

**(4) Evaluate.** $\int_0^1 u^{1/2}\,du = [u^{3/2}/(3/2)]_0^1 = 2/3$. So
$$\int_0^1 x\sqrt{1-x^2}\,dx = \tfrac12\cdot\tfrac23 = \tfrac13.$$

**Verification.** Direct antiderivative: $F(x) = -\tfrac13(1-x^2)^{3/2}$. Check: $F'(x) = -\tfrac13\cdot\tfrac32(1-x^2)^{1/2}\cdot(-2x) = x(1-x^2)^{1/2}$. $\checkmark$ Then $F(1) - F(0) = 0 - (-1/3) = 1/3$. $\checkmark$

**Interpretation.** This is Theorem 25.22 in action. The substitution $\varphi(u) : u \mapsto$ (inverse) converts a hard-looking integral into an elementary one. The systematic rule is: replace $x$ by $\varphi(u)$, $dx$ by $\varphi'(u)\,du$, and the limits of $x$ by the preimage limits of $u$. $\blacksquare$

---

### Example 5 (Dirichlet — non-integrable). Show that
$$D(x) = \mathbf{1}_{\mathbb{Q}}(x) = \begin{cases} 1 & x \in \mathbb{Q}\\ 0 & x \notin\mathbb{Q}\end{cases}$$
is **not** Riemann integrable on $[0, 1]$.

**Setup.** We want to show $\overline{\int_0^1} D \neq \underline{\int_0^1} D$.

**Strategy.** Compute $U(P, D)$ and $L(P, D)$ for an arbitrary partition, using the **density** of $\mathbb Q$ and $\mathbb R\setminus\mathbb Q$ in $\mathbb R$.

**Computation.**

**(1) Density observation.** Every non-degenerate subinterval $[x_{i-1}, x_i] \subseteq [0, 1]$ with $x_{i-1} < x_i$ contains both a rational point (by density of $\mathbb Q$ in $\mathbb R$) and an irrational point (by density of irrationals, proved via countability of $\mathbb Q$ versus uncountability of $\mathbb R$).

**(2) Hence.** On each $[x_{i-1}, x_i]$,
$$M_i = \sup D = 1 \quad (\text{at any rational in the interval}),$$
$$m_i = \inf D = 0 \quad (\text{at any irrational in the interval}).$$

**(3) Upper sum.**
$$U(P, D) = \sum_i 1\cdot\Delta x_i = \sum_i\Delta x_i = 1 - 0 = 1.$$

**(4) Lower sum.** $L(P, D) = \sum_i 0\cdot\Delta x_i = 0$.

**(5) Upper/lower integrals.**
$$\overline{\int_0^1} D = \inf_P U(P, D) = \inf_P 1 = 1, \qquad \underline{\int_0^1} D = \sup_P L(P, D) = 0.$$

**(6) Conclusion.** $\overline{\int} D = 1 \neq 0 = \underline{\int} D$, so $D \notin \mathcal{R}$. $\blacksquare$

**Verification.** Attempt to refute via the Darboux criterion: we need $P$ with $U(P) - L(P) < \varepsilon$ for every $\varepsilon > 0$. But $U(P) - L(P) = 1 - 0 = 1$ for every $P$, so no such $P$ exists for $\varepsilon < 1$. $\checkmark$

**Interpretation.** The Riemann integral is inadequate for functions that oscillate wildly on every interval. The obstruction is that **oscillation** $M_i - m_i$ does not tend to $0$ as $\|P\| \to 0$. The Lebesgue integral resolves this: on $[0, 1]$, $D$ is Lebesgue-integrable (as a simple function) with value $0$, because the set $\mathbb Q \cap [0, 1]$ has Lebesgue measure zero. This is the motivating example for measure theory. $\blacksquare$

---

## 25.12 Practice Problems

1. Prove directly from the Darboux criterion that $f(x) = x$ on $[0, 1]$ is Riemann integrable (do **not** use the FTC). Compute the integral.

2. Let
$$\alpha(x) = \begin{cases} x & x \in [0, 1]\\ 2 + x & x \in (1, 2]\end{cases}$$
(a jump of $2$ at $x = 1$). Compute $\int_0^2 x\,d\alpha$.

3. Let $f$ be continuous on $[a, b]$ with $f \geq 0$ and $\int_a^b f\,dx = 0$. Prove $f \equiv 0$.

4. Let $F(x) = \int_0^x \frac{\sin t}{t}\,dt$, using the convention $\sin(0)/0 := 1$. Find $F'(x)$ for all $x \in \mathbb R$.

5. Let $\alpha$ be continuous and monotonically increasing on $[0, 1]$ with $\alpha(0) = 0, \alpha(1) = 1$. For $f$ continuous on $[0, 1]$, prove
$$\left|\int_0^1 f\,d\alpha\right| \leq \max_{[0,1]}|f|.$$

### Solutions

---

**Solution 1 (direct Darboux computation for $f(x) = x$).**

**Setup.** We will show $f(x) = x$ on $[0, 1]$ satisfies the Cauchy-Darboux criterion (Theorem 25.9) and compute the integral as the common limit of $U$ and $L$.

**Strategy.** Use uniform partitions $P_n$ with $n$ equal subintervals, exploit monotonicity of $f$ to identify $M_i = x_i$ and $m_i = x_{i-1}$, and evaluate the resulting sums using the arithmetic progression formula $\sum_{k=1}^n k = n(n+1)/2$.

**Computation.**

**(1) Partition.** Let $P_n$ be the uniform partition with $x_i = i/n$ for $i = 0, 1, \ldots, n$; so $\Delta x_i = 1/n$ and $\|P_n\| = 1/n$.

**(2) $M_i, m_i$.** Since $f(x) = x$ is monotonically increasing on $[0, 1]$:
$$M_i = f(x_i) = i/n, \qquad m_i = f(x_{i-1}) = (i-1)/n.$$

**(3) Upper sum.**
$$U(P_n) = \sum_{i=1}^n \frac{i}{n}\cdot\frac{1}{n} = \frac{1}{n^2}\sum_{i=1}^n i = \frac{1}{n^2}\cdot\frac{n(n+1)}{2} = \frac{n+1}{2n} = \frac12 + \frac{1}{2n}.$$

**(4) Lower sum.**
$$L(P_n) = \sum_{i=1}^n \frac{i-1}{n}\cdot\frac{1}{n} = \frac{1}{n^2}\sum_{i=0}^{n-1}i = \frac{1}{n^2}\cdot\frac{(n-1)n}{2} = \frac{n-1}{2n} = \frac12 - \frac{1}{2n}.$$

**(5) Darboux gap.**
$$U(P_n) - L(P_n) = \frac{n+1}{2n} - \frac{n-1}{2n} = \frac{2}{2n} = \frac1n.$$

**(6) Verify criterion.** Given any $\varepsilon > 0$, choose any integer $n > 1/\varepsilon$. Then $U(P_n) - L(P_n) = 1/n < \varepsilon$. By Theorem 25.9, $f \in \mathcal{R}$.

**(7) Compute the integral.** Since
$$\underline{\int} f = \sup_P L(P) \geq \lim_n L(P_n) = \lim_n\left(\frac12 - \frac{1}{2n}\right) = \frac12,$$
and
$$\overline{\int} f = \inf_P U(P) \leq \lim_n U(P_n) = \lim_n\left(\frac12 + \frac{1}{2n}\right) = \frac12,$$
and by Corollary 25.7 $\underline{\int} \leq \overline{\int}$, we conclude
$$\underline{\int_0^1} f = \overline{\int_0^1} f = \tfrac12.$$

**Verification.** FTC II: $F(x) = x^2/2$, $F'(x) = x$, $\int_0^1 x\,dx = F(1) - F(0) = 1/2 - 0 = 1/2$. $\checkmark$

**Interpretation.** This is the archetypal Darboux calculation. Every step — partition choice, evaluation of sup/inf from monotonicity, summation formula, and the $1/n \to 0$ squeeze — is explicit. We did not invoke the FTC; we verified integrability and computed the value from first principles. $\blacksquare$

---

**Solution 2 (Stieltjes integral with a mixed step).**

**Setup.** $\alpha$ increases linearly on $[0, 1]$ and $(1, 2]$ but has a jump of size $2$ at $x = 1$:
$$\alpha(1^-) = 1, \ \alpha(1) = \alpha(1^+) = 3, \ \alpha(2) = 4.$$
Thus $\alpha$ has continuous "slope-$1$" components on $[0, 1]$ and $[1, 2]$, plus a point-mass of magnitude $2$ at $x = 1$. The integrand $f(x) = x$ is continuous (hence in $\mathcal{R}(\alpha)$ by Theorem 25.10). Note $f$ is continuous at the jump point $x = 1$, a hypothesis needed for the jump contribution to be well-defined.

**Strategy.** Decompose $\alpha = \alpha_c + \alpha_j$, where $\alpha_c(x) = x$ is the continuous (slope-$1$) part and $\alpha_j$ is the pure-jump part (a step function increasing by $2$ at $x = 1$). By linearity in $\alpha$ (Theorem 25.15 — extended to non-negative step increments),
$$\int_0^2 x\,d\alpha = \int_0^2 x\,d\alpha_c + \int_0^2 x\,d\alpha_j.$$
Use Theorem 25.17 for $\alpha_c$ (Riemann) and the jump-sum formula for $\alpha_j$.

**Computation.**

**(1) Continuous part.** $\alpha_c(x) = x$ is $C^1$ with $\alpha_c'(x) = 1$. By Theorem 25.17,
$$\int_0^2 x\,d\alpha_c = \int_0^2 x\cdot 1\,dx = \left[\frac{x^2}{2}\right]_0^2 = 2.$$

Alternatively, split as $\int_0^1 x\,dx + \int_1^2 x\,dx = 1/2 + (2 - 1/2) = 1/2 + 3/2 = 2$.

**(2) Jump part.** $\alpha_j$ is zero on $[0, 1)$ and $2$ on $[1, 2]$; it has a single jump of size $c_1 = 2$ at $x = 1$. Since $f(x) = x$ is continuous at $x = 1$,
$$\int_0^2 x\,d\alpha_j = f(1)\cdot c_1 = 1\cdot 2 = 2.$$

(To verify rigorously: use the partition $\{0, 1-\varepsilon, 1+\varepsilon, 2\}$. Only the interval $[1-\varepsilon, 1+\varepsilon]$ has nonzero $\Delta\alpha_j = 2$. The contribution to $U$ is $(1+\varepsilon)\cdot 2$, to $L$ is $(1-\varepsilon)\cdot 2$. Both $\to 2$ as $\varepsilon \to 0$, squeezing the integral to $2$.)

**(3) Sum.** $\int_0^2 x\,d\alpha = 2 + 2 = 4$.

**Verification.** Directly from a tagged Riemann-Stieltjes sum: take $P = \{0, 1-\varepsilon, 1+\varepsilon, 2\}$ with tags at midpoints. Then
- $[0, 1-\varepsilon]$: $\Delta\alpha = (1-\varepsilon) - 0 = 1-\varepsilon$, tag $\approx 1/2$, contribution $\approx (1/2)(1-\varepsilon)$.
- $[1-\varepsilon, 1+\varepsilon]$: $\Delta\alpha = \alpha(1+\varepsilon) - \alpha(1-\varepsilon) = (3+\varepsilon) - (1-\varepsilon) = 2 + 2\varepsilon$, tag $1$, contribution $\approx 1\cdot(2+2\varepsilon)$.
- $[1+\varepsilon, 2]$: $\Delta\alpha = 4 - (3+\varepsilon) = 1-\varepsilon$, tag $\approx 3/2$, contribution $\approx (3/2)(1-\varepsilon)$.

Sum: $(1-\varepsilon)/2 + 2 + 2\varepsilon + (3/2)(1-\varepsilon) \to 1/2 + 2 + 3/2 = 4$ as $\varepsilon \to 0$, $\|P\| \to 0$. $\checkmark$

**Interpretation.** The Stieltjes integral decomposes cleanly into a "smooth part" (which reduces to a Riemann integral via $d\alpha = \alpha'\,dx$) and a "jump part" (which is a weighted point-mass sum $\sum f(x_k) c_k$). This decomposition is the Riemann-Stieltjes analogue of the Lebesgue decomposition into absolutely continuous and pure-point components. $\blacksquare$

---

**Solution 3 ($f$ continuous, $\geq 0$, $\int f = 0 \Rightarrow f \equiv 0$).**

**Setup.** We prove the contrapositive: if $f \not\equiv 0$ on $[a, b]$ (so $f(x_0) > 0$ for some $x_0$, since $f \geq 0$), then $\int_a^b f > 0$.

**Strategy.** Use continuity of $f$ at $x_0$ to find a small interval around $x_0$ where $f$ stays bounded below by a positive constant, then bound the integral below by the area of the corresponding "box".

**Computation.**

**(1) Assume $f(x_0) > 0$ for some $x_0 \in (a, b)$** (the endpoint case is handled by symmetric argument on a one-sided neighbourhood). Let $c = f(x_0)/2 > 0$.

**(2) Continuity at $x_0$.** By continuity of $f$ at $x_0$, there exists $\delta > 0$ such that
$$|t - x_0| < \delta \ \Longrightarrow \ |f(t) - f(x_0)| < c = f(x_0)/2.$$
In particular,
$$f(t) > f(x_0) - c = f(x_0)/2 > 0 \quad \text{for } t \in (x_0 - \delta, x_0 + \delta).$$

**(3) Shrink if needed to stay inside $[a, b]$.** Replace $\delta$ by $\min(\delta, (b-a)/2, x_0 - a, b - x_0)$; the interval $I = [x_0 - \delta, x_0 + \delta]$ has length $2\delta > 0$ and is contained in $[a, b]$.

**(4) Bound the integral below.** Since $f \geq 0$ everywhere and $f \geq f(x_0)/2$ on $I$,
$$\int_a^b f\,dx \geq \int_{x_0 - \delta}^{x_0 + \delta} f\,dx \geq \frac{f(x_0)}{2}\cdot 2\delta = f(x_0)\,\delta > 0.$$

**(5) Contradiction.** $\int_a^b f \geq f(x_0)\delta > 0$ contradicts the assumption $\int_a^b f = 0$. Hence no such $x_0$ exists, i.e., $f(x_0) = 0$ for all $x_0 \in (a, b)$.

**(6) Boundary.** At $x_0 = a$ or $x_0 = b$, continuity of $f$ and $f(x) = 0$ on $(a, b)$ force $f(a) = \lim_{x\to a^+} f(x) = 0$ and similarly $f(b) = 0$. $\blacksquare$

**Verification.** The result is **false without continuity**: e.g., $f = 0$ except $f(0) = 1$ on $[0, 1]$ is Riemann-integrable with $\int f = 0$, yet $f \not\equiv 0$. The proof used continuity at $x_0$ crucially in step (2) to secure the "box" on which $f \geq f(x_0)/2$.

**Interpretation.** The statement is a **rigidity theorem**: for continuous non-negative functions on a compact interval, vanishing of the integral forces vanishing pointwise. The Lebesgue analogue states the same for $L^1$ functions, but "$f \equiv 0$" must be replaced by "$f = 0$ almost everywhere". $\blacksquare$

---

**Solution 4 (FTC for the sine integral).**

**Setup.** Define the **sine integral**
$$F(x) = \int_0^x \frac{\sin t}{t}\,dt,$$
with the integrand defined at $t = 0$ by $\sin(0)/0 := 1$ (the removable singularity). We compute $F'$ on all of $\mathbb R$.

**Strategy.** The integrand $g(t) = \sin t/t$ (with $g(0) := 1$) is continuous on $\mathbb R$: continuous at $t \neq 0$ by quotient of continuous functions, continuous at $t = 0$ because $\lim_{t\to 0}\sin t/t = 1 = g(0)$. Apply FTC I.

**Computation.**

**(1) Continuity of $g$.** Already verified above.

**(2) For $x \neq 0$.** By FTC I, part (b) (Theorem 25.18b), since $g$ is continuous at $x$,
$$F'(x) = g(x) = \frac{\sin x}{x}.$$

**(3) For $x = 0$.** Again by FTC I, since $g$ is continuous at $0$ with $g(0) = 1$,
$$F'(0) = g(0) = 1.$$

**(4) Unified formula.**
$$F'(x) = \begin{cases} \sin x/x & x \neq 0\\ 1 & x = 0\end{cases} = g(x).$$

**Verification (direct check at $0$).** Confirm $F'(0) = 1$ by the limit definition:
$$F'(0) = \lim_{h\to 0}\frac{F(h) - F(0)}{h} = \lim_{h\to 0}\frac{1}{h}\int_0^h g(t)\,dt.$$
Since $g$ is continuous at $0$ with $g(0) = 1$, MVT for integrals (Theorem 25.23) gives $\int_0^h g(t)\,dt = g(\xi_h)\cdot h$ for some $\xi_h$ between $0$ and $h$; dividing by $h$ and letting $h \to 0$ sends $\xi_h \to 0$ and so $g(\xi_h) \to g(0) = 1$. $\checkmark$

**Interpretation.** FTC I requires only continuity of the integrand at the point of differentiation, not on an open neighbourhood. After redefining the integrand at the removable singularity, the theorem applies uniformly across $\mathbb R$. $F$ is the prototypical "sine integral" that cannot be expressed in elementary closed form — yet FTC tells us precisely what its derivative is. $\blacksquare$

---

**Solution 5 (bound for $\int f\,d\alpha$ with increasing $\alpha$).**

**Setup.** $\alpha$ is continuous and monotonically increasing on $[0, 1]$ with $\alpha(0) = 0, \alpha(1) = 1$. $f$ is continuous on $[0, 1]$, so $f \in \mathcal{R}(\alpha)$ by Theorem 25.10. Let $M = \max_{[0,1]}|f|$, which is attained and finite by EVT.

**Strategy.** Use the pointwise inequality $-M \leq f(x) \leq M$ and integrate against $d\alpha \geq 0$.

**Computation.**

**(1) Pointwise bound.** For all $x \in [0, 1]$, $|f(x)| \leq M$, i.e., $-M \leq f(x) \leq M$.

**(2) Integrate against $d\alpha$.** Since $\alpha$ is increasing, $d\alpha$ is a "non-negative measure", i.e., $g \leq h \Rightarrow \int g\,d\alpha \leq \int h\,d\alpha$ (Theorem 25.13 (iii)). Also $\int c\,d\alpha = c\cdot (\alpha(1) - \alpha(0))$ for constants (Theorem 25.15, or directly from the definition of $d\alpha$ for constant integrands). Hence
$$-M\int_0^1 d\alpha \leq \int_0^1 f\,d\alpha \leq M\int_0^1 d\alpha.$$

**(3) Evaluate $\int_0^1 d\alpha$.** For any partition $P$, $U(P, 1, \alpha) = L(P, 1, \alpha) = \sum \Delta\alpha_i = \alpha(1) - \alpha(0) = 1$. So $\int_0^1 1\,d\alpha = 1$.

**(4) Combine.** $-M \leq \int_0^1 f\,d\alpha \leq M$, equivalently,
$$\left|\int_0^1 f\,d\alpha\right| \leq M = \max_{[0,1]}|f|. \ \blacksquare$$

**Verification.** Equality can hold: take $f \equiv M$ constant (assuming $f \geq 0$); then $\int_0^1 f\,d\alpha = M\cdot 1 = M$. So the bound is sharp. For non-constant $f$, strict inequality usually holds.

**Interpretation.** This is the Stieltjes analogue of "$|\bar f| \leq \|f\|_\infty$" — the average (weighted by $d\alpha$, total weight $1$) of $f$ is bounded by the pointwise max of $|f|$. It is the integral form of the triangle inequality, with $d\alpha/[\alpha(1)-\alpha(0)]$ as a probability measure on $[0, 1]$ and the integral as the expected value. This foreshadows Jensen's inequality and the general theory of probability. $\blacksquare$

---

## 25.13 Summary

> **Riemann-Stieltjes framework (§25.1-§25.3).**
>
> Given bounded $f$ and monotonically increasing $\alpha$ on $[a, b]$:
>
> - **Partitions** $P$; **upper sum** $U(P) = \sum M_i\Delta\alpha_i$; **lower sum** $L(P) = \sum m_i\Delta\alpha_i$ (Def 25.3).
> - **Refinement lemma:** refinement of $P$ increases $L$ and decreases $U$ (Lemma 25.5). Any $L(P_1) \leq U(P_2)$ (Corollary 25.6).
> - **Upper integral** $\overline{\int} f\,d\alpha = \inf_P U(P)$; **lower integral** $\underline{\int} f\,d\alpha = \sup_P L(P)$.
> - $f \in \mathcal{R}(\alpha)$ iff upper = lower integral (Def 25.8).
> - **Cauchy-Darboux criterion:** $f \in \mathcal{R}(\alpha)$ iff $\forall\varepsilon > 0\;\exists P : U(P) - L(P) < \varepsilon$ (Theorem 25.9).

> **Classes of integrable functions (§25.4).**
>
> - Continuous $f$, any increasing $\alpha$: $f \in \mathcal{R}(\alpha)$. Proof uses Heine-Cantor uniform continuity of $f$ to make $M_i - m_i$ small.
> - Monotonic $f$, continuous $\alpha$: $f \in \mathcal{R}(\alpha)$. Proof uses uniform continuity of $\alpha$ to make $\Delta\alpha_i$ small, together with the telescoping $\sum (f(x_i) - f(x_{i-1})) = f(b) - f(a)$.
> - Bounded $f$ with finitely many discontinuities (continuous $\alpha$ at each): $f \in \mathcal{R}(\alpha)$.

> **Properties of the integral (§25.5).**
>
> - Linearity in $f$: $\int(cf + g)\,d\alpha = c\int f\,d\alpha + \int g\,d\alpha$.
> - Linearity in $\alpha$: $\int f\,d(c_1\alpha_1 + c_2\alpha_2) = c_1\int f\,d\alpha_1 + c_2\int f\,d\alpha_2$ (positive coefficients).
> - Monotonicity: $f \leq g \Rightarrow \int f\,d\alpha \leq \int g\,d\alpha$.
> - Triangle: $|\int f\,d\alpha| \leq \int|f|\,d\alpha$.
> - Additivity over intervals: $\int_a^b = \int_a^c + \int_c^b$ (Theorem 25.14).
> - Algebra: $f, g \in \mathcal{R}(\alpha) \Rightarrow f^2, fg \in \mathcal{R}(\alpha)$.

> **Tagged Riemann-Stieltjes sums (§25.6).** $f \in \mathcal{R}(\alpha) \Rightarrow \sum f(t_i)\Delta\alpha_i \to \int f\,d\alpha$ as $\|P\| \to 0$, for any tag choice.

> **Reduction (§25.7).** $\alpha \in C^1$ increasing $\Rightarrow$ $\int f\,d\alpha = \int f\alpha'\,dx$ (Theorem 25.17). $\alpha$ step $\Rightarrow$ $\int f\,d\alpha = \sum c_k f(x_k)$.

> **Fundamental Theorem of Calculus (§25.8).**
>
> - **Part I (Theorem 25.18):** $F(x) = \int_a^x f$ is Lipschitz; $F'(x_0) = f(x_0)$ at any point of continuity of $f$.
> - **Part II (Theorem 25.19):** If $F' = f$ on $(a, b)$ and $F$ continuous on $[a, b]$, $f \in \mathcal{R}$, then $\int_a^b f = F(b) - F(a)$.

> **Integration techniques (§25.9).**
>
> - **Integration by parts** (Theorem 25.20): $\int f\,d\alpha + \int \alpha\,df = f(b)\alpha(b) - f(a)\alpha(a)$.
> - **Change of variable** (Theorem 25.21, 25.22): $\varphi$ strictly increasing continuous $\Rightarrow \int_a^b f\,d\alpha = \int_c^d (f\circ\varphi)\,d(\alpha\circ\varphi)$; if $\varphi \in C^1$ with $\varphi' > 0$, $\int_a^b f\,dx = \int_c^d f(\varphi(u))\varphi'(u)\,du$.

> **Mean Value Theorems (§25.10).**
>
> - Continuous $f$ on $[a, b] \Rightarrow \int_a^b f = f(\xi)(b - a)$ for some $\xi \in [a, b]$ (Theorem 25.23).
> - Generalised: continuous $f$, $g \in \mathcal{R}$ with $g \geq 0 \Rightarrow \int fg = f(\xi)\int g$ (Theorem 25.24).

> **Limits of the Riemann framework.** The Dirichlet function $\mathbf{1}_{\mathbb Q}$ on $[0, 1]$ is not Riemann-integrable (Example 5). Resolution: Lebesgue integration, where the same function is integrable with value zero. This is the bridge from undergraduate real analysis to graduate measure theory.

> **Closing big picture.** The Riemann-Stieltjes integral:
> - Unifies classical integration, discrete summation, and probability/measure-theoretic integration under a single notation $\int f\,d\alpha$.
> - Supplies the technical backbone for expectations, distributions, and Lebesgue-Stieltjes measures in probability theory.
> - Anchors the sequence $\mathbb R \to$ topology $\to$ sequences/series $\to$ continuity $\to$ differentiation $\to$ **integration** — the arc of undergraduate analysis culminates here.
> - Motivates, by its limitations (Dirichlet, pointwise-vs-uniform subtleties), the abstract theory of measure and the Lebesgue integral in the graduate sequence.

---

## Related Topics

- [[20-ivt-and-connectedness]] — Heine-Cantor uniform continuity, used essentially in Theorem 25.10.
- [[23-mean-value-theorems]] — MVT used in the proof of FTC Part II (Theorem 25.19) and in the reduction theorem (Theorem 25.17).
- [[22-differentiation]] — FTC realises integration as the inverse of differentiation.
- [[17-types-of-discontinuity-monotonic]] — monotonic functions have only jump discontinuities and countably many of them; key to integrability in Theorem 25.11 and Theorem 25.12.
- [[07-compact-sets]] — compactness of $[a,b]$ underlies EVT and uniform continuity used throughout.
- [[24-lhopital-vector-derivatives]] — vector-valued analogues of the integral; arc length as a Riemann-Stieltjes integral.
- [[VACV/guide/03-line-integrals]] — line integrals in multivariate calculus, a direct extension of the Riemann-Stieltjes framework to curves.
