# 20. Global Theorems: IVT, EVT, Connectedness, Uniform Continuity

This is a **cornerstone lesson**. Pointwise continuity becomes powerful only when combined with global topological features of the domain. Three classical theorems emerge — each connecting a topological property of the domain with a property of continuous images:

- **Extreme Value Theorem (EVT / Weierstrass):** Continuous image of compact is compact, hence attains max/min.
- **Intermediate Value Theorem (IVT / Bolzano):** Continuous image of an interval is an interval.
- **Heine-Cantor Theorem:** Continuous functions on compact sets are **uniformly continuous**.

Together, these underpin optimization, root-finding, and integration.

---

## 20.1 Preservation Theorems

> **Theorem 20.1 (Continuity preserves compactness).**
> Let $f : K \to \mathbb{R}$ be continuous, and let $K \subset \mathbb{R}$ be compact. Then $f(K)$ is compact.

*Proof (open cover approach).* Let $\{V_\alpha\}$ be an open cover of $f(K)$. For each $\alpha$, $f^{-1}(V_\alpha)$ is open in $K$ (continuity: preimages of open are open). The collection $\{f^{-1}(V_\alpha)\}$ covers $K$.

By compactness of $K$, there is a finite subcover: $K \subset f^{-1}(V_{\alpha_1}) \cup \cdots \cup f^{-1}(V_{\alpha_n})$. Applying $f$: $f(K) \subset V_{\alpha_1} \cup \cdots \cup V_{\alpha_n}$. So $f(K)$ has a finite subcover — compact. $\blacksquare$

*Alternative proof (sequential).* Take any sequence $(y_n) \subset f(K)$; write $y_n = f(x_n)$ for some $x_n \in K$. Since $K$ is compact (= sequentially compact by [[07-compact-sets]]), $(x_n)$ has a subsequence $x_{n_k} \to x \in K$. By continuity of $f$, $f(x_{n_k}) \to f(x) \in f(K)$. So $(y_n)$ has a subsequence converging in $f(K)$. $\blacksquare$

> **Corollary 20.2 (Extreme Value Theorem / Weierstrass).**
> If $f : [a, b] \to \mathbb{R}$ is continuous, then $f$ attains a **maximum** and **minimum** on $[a, b]$:
> $\exists \ x_{\min}, x_{\max} \in [a, b] \ \text{such that}\ f(x_{\min}) \leq f(x) \leq f(x_{\max}) \ \forall x \in [a, b].$

*Proof.* $[a, b]$ is compact (Heine-Borel). By Theorem 20.1, $f([a, b])$ is compact, hence closed and bounded. A closed bounded nonempty subset of $\mathbb{R}$ contains its sup and inf: $\max f([a,b]) = M \in f([a,b])$ and $\min f([a,b]) = m \in f([a,b])$. So some $x_{\max}, x_{\min}$ realise them. $\blacksquare$

> **Remark.** Boundedness alone would only give sup/inf in $\mathbb{R}$; compactness (closed AND bounded) gives that the sup/inf are **attained** (in the image, hence achieved by some $x$ in the domain). Both hypotheses are essential:
> - On $[0, 1]$, $f(x) = 1/x$ for $x > 0$, $f(0) = 0$ is unbounded — not continuous (essential discontinuity).
> - On $[0, 1)$, $f(x) = x$ is continuous but attains no max.
> - On $(0, 1]$, $f(x) = 1/x$ is continuous, bounded below but unbounded above.

---

## 20.2 Connectedness

> **Definition 20.3 (Connected subset).**
> A subset $E \subset \mathbb{R}$ is **disconnected** if there exist open sets $U, V$ in $\mathbb{R}$ with
>
> $E \subset U \cup V, \quad U \cap V \cap E = \emptyset, \quad U \cap E \neq \emptyset, \quad V \cap E \neq \emptyset$.
>
> $E$ is **connected** if it is not disconnected.

> **Theorem 20.4 (Connected subsets of $\mathbb{R}$).**
> A subset $E \subset \mathbb{R}$ is connected iff $E$ is an **interval** (possibly degenerate: a single point or $\emptyset$).

Here "interval" means: for all $x, y \in E$ with $x < y$, the entire $[x, y] \subset E$.

*Proof.*

**(⇒)** Suppose $E$ is not an interval: there exist $a < c < b$ with $a, b \in E$ but $c \notin E$. Set $U = (-\infty, c)$, $V = (c, \infty)$. Both open, $E \subset U \cup V$ (since $c \notin E$), $U \cap V = \emptyset$, and $a \in U \cap E$, $b \in V \cap E$. So $E$ is disconnected.

**(⇐)** Suppose $E$ is an interval, but disconnected: $E \subset U \cup V$ with the separation above. Pick $a \in U \cap E$, $b \in V \cap E$; WLOG $a < b$. The entire $[a, b]$ lies in $E$ (interval). Let
$$c = \sup\{x \in [a, b] : x \in U\}.$$
Since $a \in U \cap [a, b]$, this sup exists; $c \leq b$.

Case 1: $c \in U$. Then $c < b$ (otherwise $b \in U \cap V \cap E$, contradiction). Since $U$ is open, a small interval $(c - \delta, c + \delta) \subset U$, so there are points of $[a,b]$ greater than $c$ in $U$ — contradicting that $c$ is the sup.

Case 2: $c \in V$. Then $c > a$. Since $V$ is open, $(c - \delta, c + \delta) \subset V$ for some $\delta > 0$. So all points of $[a, b]$ in $(c - \delta, c]$ are in $V$, hence not in $U$; this means the sup is at most $c - \delta < c$, contradiction.

Either way, contradiction. $\blacksquare$

---

## 20.3 Intermediate Value Theorem

> **Theorem 20.5 (Continuity preserves connectedness).**
> Let $f : E \to \mathbb{R}$ be continuous and $E$ connected. Then $f(E)$ is connected.

*Proof.* Suppose $f(E)$ disconnected: $f(E) \subset U \cup V$ with the separation. Then $E \subset f^{-1}(U) \cup f^{-1}(V)$, with $f^{-1}(U), f^{-1}(V)$ open in $E$ (continuity), disjoint on $E$, and each meeting $E$ (since $U, V$ meet $f(E)$). So $E$ is disconnected, contradiction. $\blacksquare$

> **Corollary 20.6 (Intermediate Value Theorem, Bolzano).**
> If $f : [a, b] \to \mathbb{R}$ is continuous with $f(a) = \alpha$ and $f(b) = \beta$, then for every $\gamma$ strictly between $\alpha$ and $\beta$, there exists $c \in (a, b)$ with $f(c) = \gamma$.

*Proof.* $[a, b]$ is an interval, hence connected. By Theorem 20.5, $f([a, b])$ is connected, hence an interval (Theorem 20.4). Since $\alpha, \beta \in f([a, b])$ and $\gamma$ is between them, $\gamma \in f([a, b])$. So some $c \in [a, b]$ with $f(c) = \gamma$. Since $\gamma \neq \alpha = f(a)$ and $\gamma \neq \beta = f(b)$, $c \in (a, b)$. $\blacksquare$

**Classical application — continuous self-map of $[0,1]$ has a fixed point.** If $f : [0,1] \to [0,1]$ is continuous, define $g(x) = f(x) - x$. Then $g(0) = f(0) \geq 0$ and $g(1) = f(1) - 1 \leq 0$. By IVT, some $c \in [0,1]$ with $g(c) = 0$, i.e., $f(c) = c$.

**Classical application — root finding.** A continuous function with $f(a) < 0 < f(b)$ has a root in $(a, b)$. This is the basis of the **bisection method**.

---

## 20.4 Uniform Continuity

Ordinary continuity is a **pointwise** condition: given a point $a$ and $\varepsilon > 0$, find $\delta > 0$ (which may depend on $a$). **Uniform continuity** strengthens this: the same $\delta$ works at every point.

> **Definition 20.7 (Uniform continuity).**
> $f : E \to \mathbb{R}$ is **uniformly continuous** on $E$ if for every $\varepsilon > 0$ there exists $\delta > 0$ such that
> $x, y \in E, \ |x - y| < \delta \ \Longrightarrow\ |f(x) - f(y)| < \varepsilon.$

Note the key difference: "$\delta$" depends on $\varepsilon$ only, not on $x$ or $y$.

**Examples and non-examples.**

- $f(x) = x^2$ on $\mathbb{R}$ is **not** uniformly continuous. Take $x_n = n$, $y_n = n + 1/n$: $|x_n - y_n| = 1/n \to 0$ but $|f(x_n) - f(y_n)| = 2 + 1/n^2 \not\to 0$.
- $f(x) = x^2$ on $[0, 10]$ **is** uniformly continuous. $|x^2 - y^2| = |x-y||x+y| \leq 20|x-y|$; take $\delta = \varepsilon/20$.
- $f(x) = 1/x$ on $(0, 1]$ is **not** uniformly continuous. Take $x_n = 1/n$, $y_n = 1/(n+1)$: $|x_n - y_n| = 1/(n(n+1)) \to 0$ but $|f(x_n) - f(y_n)| = |n - (n+1)| = 1 \not\to 0$.
- $f(x) = \sin x$ on $\mathbb{R}$ **is** uniformly continuous. $|\sin x - \sin y| \leq |x - y|$, so $\delta = \varepsilon$ works.

> **Observation.** Uniform continuity fails when:
> - The domain is **unbounded** and $f$ grows faster than any Lipschitz function (e.g., $x^2, e^x$).
> - The domain has a "bad boundary" where $f$ blows up (e.g., $1/x$ near $0$).

---

## 20.5 Heine-Cantor Theorem

> **Theorem 20.8 (Heine-Cantor).**
> If $f : K \to \mathbb{R}$ is continuous and $K \subset \mathbb{R}$ is compact, then $f$ is uniformly continuous on $K$.

*Proof (by contradiction / Bolzano-Weierstrass).* Suppose $f$ is not uniformly continuous: there exists $\varepsilon_0 > 0$ such that for every $\delta > 0$, some $x, y \in K$ satisfy $|x - y| < \delta$ but $|f(x) - f(y)| \geq \varepsilon_0$.

Take $\delta = 1/n$: pick $x_n, y_n \in K$ with $|x_n - y_n| < 1/n$ and $|f(x_n) - f(y_n)| \geq \varepsilon_0$.

By compactness of $K$ (sequential), $(x_n)$ has a convergent subsequence $x_{n_k} \to x^* \in K$. Since $|x_{n_k} - y_{n_k}| < 1/n_k \to 0$, $y_{n_k} \to x^*$ as well.

By continuity of $f$ at $x^*$: $f(x_{n_k}) \to f(x^*)$ and $f(y_{n_k}) \to f(x^*)$. So $|f(x_{n_k}) - f(y_{n_k})| \to 0$, contradicting $|f(x_{n_k}) - f(y_{n_k})| \geq \varepsilon_0$ for all $k$. $\blacksquare$

*Alternative proof (Lebesgue number lemma).* Let $\varepsilon > 0$. For each $x \in K$, by continuity pick $\delta_x > 0$ with $|y - x| < \delta_x \Rightarrow |f(y) - f(x)| < \varepsilon/2$. The open balls $B(x, \delta_x/2)$ cover $K$. By compactness, a finite subcover exists. The "Lebesgue number" of this cover (every point of $K$ is within some fixed distance of a ball's centre) provides a uniform $\delta$. (Details omitted.)

---

## 20.6 Lipschitz and Hölder Continuity

Stronger-than-continuous notions, both implying uniform continuity.

> **Definition 20.9.** $f : E \to \mathbb{R}$ is
>
> - **Lipschitz continuous** if there exists $L \geq 0$ with $|f(x) - f(y)| \leq L |x - y|$ for all $x, y \in E$.
> - **Hölder continuous of exponent $\alpha \in (0, 1]$** if there exists $C \geq 0$ with $|f(x) - f(y)| \leq C |x - y|^\alpha$.

Note Hölder with $\alpha = 1$ is Lipschitz.

> **Hierarchy of regularity.**
> $$\text{Lipschitz} \subsetneq \text{Hölder}_\alpha \ (\alpha < 1) \subsetneq \text{uniformly continuous} \subsetneq \text{continuous}$$

> **Examples.**
> - $f(x) = \sqrt{x}$ on $[0, 1]$ is Hölder of exponent $1/2$ (not Lipschitz).
> - $f(x) = x \sin(1/x)$ (with $f(0) = 0$) is continuous but not Hölder on $[0, 1]$.

---

## 20.7 Continuity on $\mathbb{R}^n$ (Brief Note)

All the theorems of this lesson extend, with identical statements, to continuous functions $f : K \to \mathbb{R}^m$ where $K$ is a compact subset of $\mathbb{R}^n$. The proofs use:

- Heine-Borel in $\mathbb{R}^n$ (closed + bounded $\Leftrightarrow$ compact).
- Norm in place of absolute value: $\|x - y\|$ in $\mathbb{R}^n$.
- Sequential compactness.

The theorems are thus:

- **EVT:** Continuous $f : K \to \mathbb{R}$ on compact $K \subset \mathbb{R}^n$ attains max/min.
- **Heine-Cantor:** Continuous $f : K \to \mathbb{R}^m$ on compact $K$ is uniformly continuous.
- **IVT (via path-connectedness):** If $K$ is path-connected, $f(K) \subset \mathbb{R}$ is an interval.

---

## 20.8 Worked Examples

**Example 1.** Show that every polynomial $p(x)$ of odd degree has a real root.

*Solution:* Let $p(x) = a_n x^n + \cdots + a_0$ with $a_n \neq 0$, $n$ odd. WLOG $a_n > 0$ (else apply to $-p$).

As $x \to +\infty$: $p(x)/x^n \to a_n > 0$, so $p(x) \to +\infty$.
As $x \to -\infty$: $p(x)/x^n \to a_n > 0$, but $x^n \to -\infty$ (odd $n$), so $p(x) \to -\infty$.

Pick $M > 0$ so large that $p(-M) < 0 < p(M)$. $p$ is continuous on $[-M, M]$; by IVT, $p(c) = 0$ for some $c \in (-M, M)$. $\blacksquare$

> **Note.** Even-degree polynomials need not have real roots ($x^2 + 1$, for example).

---

**Example 2.** Prove that $f(x) = \sqrt{x}$ is uniformly continuous on $[0, \infty)$.

*Solution:* We show $|\sqrt{x} - \sqrt{y}| \leq \sqrt{|x - y|}$ for $x, y \geq 0$.

WLOG $x \geq y$. Then $\sqrt{x} = \sqrt{(x - y) + y} \leq \sqrt{x - y} + \sqrt{y}$ (since $\sqrt{a + b} \leq \sqrt{a} + \sqrt{b}$ for $a, b \geq 0$). Hence $\sqrt{x} - \sqrt{y} \leq \sqrt{x - y}$.

So $|\sqrt{x} - \sqrt{y}| \leq \sqrt{|x - y|}$. Given $\varepsilon > 0$, take $\delta = \varepsilon^2$: $|x - y| < \delta \Rightarrow |\sqrt{x} - \sqrt{y}| < \sqrt{\delta} = \varepsilon$. $\blacksquare$

> This shows $\sqrt{x}$ is Hölder continuous of exponent $1/2$ (and hence uniformly continuous), but it is **not** Lipschitz: near $x = 0$, $|\sqrt{x} - \sqrt{0}|/|x - 0| = 1/\sqrt{x} \to \infty$.

---

**Example 3.** Prove: every continuous function $f : [0, 1] \to [0, 1]$ has a fixed point.

*Solution:* Define $g(x) = f(x) - x$, continuous on $[0, 1]$.
- $g(0) = f(0) - 0 = f(0) \geq 0$.
- $g(1) = f(1) - 1 \leq 0$.

If $g(0) = 0$, then $f(0) = 0$ — fixed point.
If $g(1) = 0$, then $f(1) = 1$ — fixed point.
Otherwise $g(0) > 0 > g(1)$, and by IVT some $c \in (0, 1)$ with $g(c) = 0$, i.e., $f(c) = c$. $\blacksquare$

> **Note.** This is the 1D case of the **Brouwer fixed-point theorem**. The $n$-D case is harder — it fails on an open cube but holds on a closed ball in $\mathbb{R}^n$.

---

**Example 4.** Show that $f(x) = \frac{1}{1+x^2}$ is uniformly continuous on $\mathbb{R}$.

*Solution:* We show $f$ is Lipschitz. Compute:
$$f(x) - f(y) = \frac{1}{1+x^2} - \frac{1}{1+y^2} = \frac{(y^2 - x^2)}{(1+x^2)(1+y^2)} = \frac{-(x+y)(x-y)}{(1+x^2)(1+y^2)}.$$

Bound $|x + y|/((1+x^2)(1+y^2))$. By AM-GM-style inequalities, $1 + x^2 \geq 2|x|$, so
$$\frac{|x|}{(1+x^2)(1+y^2)} \leq \frac{|x|}{1 + x^2} \leq \frac{1}{2}.$$
Similarly for $|y|/((1+x^2)(1+y^2))$. Adding:
$$\frac{|x + y|}{(1+x^2)(1+y^2)} \leq 1.$$

So $|f(x) - f(y)| \leq |x - y|$. Take $\delta = \varepsilon$ uniformly. $\blacksquare$

---

**Example 5.** Let $f : (0, 1] \to \mathbb{R}$ be continuous. Show: $f$ extends to a continuous function on $[0, 1]$ iff $f$ is uniformly continuous on $(0, 1]$.

*Solution:*

**(⇒)** If $f$ extends continuously to $[0, 1]$, then the extension is continuous on the compact $[0, 1]$, hence uniformly continuous (Heine-Cantor), and the restriction to $(0, 1]$ is still uniformly continuous.

**(⇐)** Suppose $f$ uniformly continuous on $(0, 1]$. Define $f(0) = \lim_{x \to 0^+} f(x)$. We must show the limit exists.

Take any sequence $x_n \to 0^+$. It is Cauchy. For $\varepsilon > 0$, find $\delta > 0$ (uniform continuity) with $|x - y| < \delta \Rightarrow |f(x) - f(y)| < \varepsilon$. Since $(x_n)$ is Cauchy, eventually $|x_m - x_n| < \delta$, hence $|f(x_m) - f(x_n)| < \varepsilon$. So $(f(x_n))$ is Cauchy in $\mathbb{R}$, hence convergent.

All sequences $x_n \to 0^+$ give a Cauchy sequence $f(x_n)$; standard argument (mixing sequences) shows the limit is the same for every such sequence. Call it $L$; set $f(0) = L$. The extension is continuous at $0$ by Heine's criterion. $\blacksquare$

---

## 20.9 Practice Problems

1. Let $f : [a, b] \to \mathbb{R}$ be continuous. Prove that $|f|$ is also continuous and attains its max on $[a, b]$.

2. Use IVT to prove: the equation $x - \cos x = 0$ has a solution in $(0, \pi/2)$.

3. Show that $f(x) = x^2$ is uniformly continuous on any bounded interval but not on $\mathbb{R}$.

4. Let $f : \mathbb{R} \to \mathbb{R}$ be continuous with $\lim_{x \to \infty} f(x) = \lim_{x \to -\infty} f(x) = 0$. Show that $f$ attains either a maximum or a minimum on $\mathbb{R}$ (possibly both).

5. Let $f : [0, \infty) \to \mathbb{R}$ be continuous with $\lim_{x \to \infty} f(x) = L$. Show that $f$ is uniformly continuous on $[0, \infty)$.

### Solutions

**1.** $|f|(x) = ||f(x)|| = |f(x)|$. For continuity, $||a| - |b|| \leq |a - b|$ (reverse triangle inequality). So for $|x - y| < \delta$: $||f|(x) - |f|(y)| = ||f(x)| - |f(y)|| \leq |f(x) - f(y)| < \varepsilon$. So $|f|$ continuous on $[a, b]$ if $f$ is. By EVT, $|f|$ attains its max. $\blacksquare$

---

**2.** Let $g(x) = x - \cos x$. Continuous on $[0, \pi/2]$. $g(0) = 0 - 1 = -1 < 0$. $g(\pi/2) = \pi/2 - 0 = \pi/2 > 0$. By IVT, $g(c) = 0$ for some $c \in (0, \pi/2)$. $\blacksquare$

---

**3.** **On $\mathbb{R}$, not uniform.** Take $x_n = n$, $y_n = n + 1/n$. $|x_n - y_n| = 1/n \to 0$, but $|x_n^2 - y_n^2| = 2n \cdot (1/n) + 1/n^2 = 2 + 1/n^2 \to 2 \neq 0$. So no $\delta$ can work for, say, $\varepsilon = 1$.

**On $[-M, M]$, uniform.** $|x^2 - y^2| = |x-y||x+y| \leq |x - y| \cdot 2M$. Take $\delta = \varepsilon/(2M)$. $\blacksquare$

---

**4.** If $f \equiv 0$, then both max and min are $0$. Otherwise, WLOG some $x_0$ with $f(x_0) > 0$. Choose $M > 0$ with $|f(x)| < f(x_0)/2$ for $|x| > M$. Then on $[-M, M]$ (compact), $f$ attains a max $M_0 \geq f(x_0) > 0$. Outside $[-M, M]$, $f(x) < f(x_0)/2 \leq M_0$. So $M_0$ is the global max.

(Symmetric argument for global min if some $f(x_0) < 0$.) $\blacksquare$

---

**5.** Given $\varepsilon > 0$. Since $f(x) \to L$, find $N$ with $|f(x) - L| < \varepsilon/2$ for $x \geq N$. Then for $x, y \geq N$: $|f(x) - f(y)| \leq |f(x) - L| + |L - f(y)| < \varepsilon$. So uniform continuity holds on $[N, \infty)$ trivially (with no $\delta$ required — any $\delta$ works).

On $[0, N+1]$, $f$ is continuous on a compact set, hence uniformly continuous by Heine-Cantor: there is $\delta_1 > 0$ with $|x - y| < \delta_1, x, y \in [0, N+1] \Rightarrow |f(x) - f(y)| < \varepsilon$.

Take $\delta = \min(\delta_1, 1)$. For $x, y \in [0, \infty)$ with $|x - y| < \delta \leq 1$: either both $\leq N+1$ (use $\delta_1$) or both $\geq N$ (use the tail estimate). (If one is $<N$ and the other $> N+1$, $|x-y| > 1 \geq \delta$, impossible.) So $|f(x) - f(y)| < \varepsilon$. $\blacksquare$

---

## 20.10 Summary

> **The three global theorems:**
>
> | Theorem | Domain property | Conclusion |
> |--------|----------------|-----------|
> | **EVT (Weierstrass)** | Compact | $f$ attains max and min |
> | **IVT (Bolzano)** | Connected (interval) | $f$ takes all intermediate values |
> | **Heine-Cantor** | Compact | $f$ is uniformly continuous |

> **Topological preservation theorems:**
>
> - Continuous image of compact is compact.
> - Continuous image of connected is connected.

> **Uniform continuity hierarchy:**
> $$\text{Lipschitz} \Rightarrow \text{Hölder}_\alpha \ (\alpha < 1) \Rightarrow \text{uniform} \Rightarrow \text{continuous}.$$
> Each implication is strict (examples given).

> **Why these theorems matter.**
> - EVT is the **foundation of optimization**: max/min exist so they can be sought.
> - IVT is the **foundation of root-finding**: roots exist between sign changes.
> - Heine-Cantor lets us upgrade from pointwise to uniform estimates on compact sets, critical in **integration theory** and **sequences of functions**.

---

## Related Topics

- [[07-compact-sets]] — compactness, Heine-Borel, Bolzano-Weierstrass
- [[16-continuity]] — $\varepsilon$-$\delta$ and sequential continuity
- [[17-types-of-discontinuity-monotonic]] — images of monotonic continuous functions
- [[22-differentiation]] — differentiability builds on continuity
- [[25-riemann-stieltjes-integral]] — Heine-Cantor is essential for integrability
