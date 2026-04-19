# 20. Global Theorems: IVT, EVT, Connectedness, Uniform Continuity

> **The cornerstone.** Pointwise continuity, as developed in [[16-continuity]], is a local notion: it asks how a function behaves near a single point. The theorems of this chapter show how pointwise continuity, combined with **global topological features of the domain** (compactness, connectedness), forces global analytic consequences — existence of extrema, existence of intermediate values, and uniform control of oscillation.
>
> The pattern is uniform in structure. Each theorem pairs a topological property of the domain with a preservation statement for continuous images:
>
> - **Extreme Value Theorem (EVT / Weierstrass):** Continuous image of a compact set is compact; hence $f$ attains its max and min on any compact domain.
> - **Intermediate Value Theorem (IVT / Bolzano):** Continuous image of a connected set is connected; hence $f$ on an interval takes every intermediate value.
> - **Heine-Cantor Theorem:** Continuous functions on compact sets are automatically **uniformly continuous** — the $\delta$ in the $\varepsilon$-$\delta$ definition can be chosen independently of the base point.
>
> These three theorems underpin virtually every subsequent result in analysis: the existence of roots of polynomials, the attainability of suprema in optimization, the Riemann integrability of continuous functions, the interchange of limit and integral for uniformly continuous sequences, and the existence theory for ODEs via Picard iteration.

---

## 20.1 Preservation Theorems

We first isolate the **topological engine** behind EVT: continuity preserves compactness. Two proofs are given, one via the open-cover definition and one via sequential compactness. Both are essential in the graduate toolkit — the first extends verbatim to general metric spaces, the second is usually the cleanest approach in $\mathbb{R}^n$.

> **Theorem 20.1 (Continuity preserves compactness).**
> Let $f : K \to \mathbb{R}$ be continuous, and let $K \subset \mathbb{R}$ be compact. Then the image $f(K) \subset \mathbb{R}$ is compact.

**Proof (open-cover approach).** Let $\mathscr{V} = \{V_\alpha\}_{\alpha \in A}$ be an arbitrary open cover of $f(K)$ by open subsets of $\mathbb{R}$. We must extract a finite subcover.

*Step 1 — Pull back to a cover of the domain.* For each $\alpha \in A$, set
$$U_\alpha \;:=\; f^{-1}(V_\alpha) \;=\; \{x \in K : f(x) \in V_\alpha\}.$$
By the **topological characterisation of continuity** (preimages of open sets are open; [[16-continuity]]), each $U_\alpha$ is open in the subspace topology on $K$. We claim $\{U_\alpha\}$ covers $K$: given $x \in K$, the point $f(x) \in f(K) \subset \bigcup_\alpha V_\alpha$, so $f(x) \in V_\alpha$ for some $\alpha$, whence $x \in U_\alpha$.

*Step 2 — Extract a finite subcover of $K$.* Since $K$ is compact, the open cover $\{U_\alpha\}$ of $K$ has a finite subcover:
$$K \;\subset\; U_{\alpha_1} \cup U_{\alpha_2} \cup \cdots \cup U_{\alpha_n} \;=\; f^{-1}(V_{\alpha_1}) \cup \cdots \cup f^{-1}(V_{\alpha_n}).$$

*Step 3 — Push forward to a finite subcover of $f(K)$.* Apply $f$ to both sides. Since $f(f^{-1}(V)) \subset V$ for any $V$ (tautology: if $y = f(x)$ with $x \in f^{-1}(V)$ then $y \in V$),
$$f(K) \;\subset\; V_{\alpha_1} \cup V_{\alpha_2} \cup \cdots \cup V_{\alpha_n}.$$

Thus an arbitrary open cover of $f(K)$ admits a finite subcover, so $f(K)$ is compact. $\blacksquare$

**Proof (sequential compactness).** Recall that in $\mathbb{R}$ (indeed in any metric space) compactness is equivalent to sequential compactness: every sequence in the set admits a convergent subsequence whose limit lies in the set ([[07-compact-sets]]).

*Step 1 — Choose a sequence.* Let $(y_n)_{n \geq 1}$ be any sequence in $f(K)$. For each $n$, write $y_n = f(x_n)$ for some $x_n \in K$ (such an $x_n$ exists by definition of $f(K)$; pick one by the axiom of choice if necessary).

*Step 2 — Extract a convergent subsequence in $K$.* Since $K$ is sequentially compact, the sequence $(x_n) \subset K$ has a subsequence $(x_{n_k})$ with $x_{n_k} \to x^*$ for some $x^* \in K$.

*Step 3 — Use continuity.* Since $f$ is continuous at $x^*$ and $x_{n_k} \to x^*$, the **sequential characterisation of continuity** gives $f(x_{n_k}) \to f(x^*)$. That is, $y_{n_k} \to f(x^*) \in f(K)$.

*Step 4 — Conclude.* An arbitrary sequence in $f(K)$ has a subsequence converging to a limit in $f(K)$, so $f(K)$ is sequentially compact, hence compact. $\blacksquare$

**Interpretive remark.** The open-cover proof exhibits the **pull-back / push-forward** structure that recurs throughout topology: continuity is exactly the assertion that the pull-back $f^{-1}$ preserves opens, and this is the sole analytic input. The sequential proof, by contrast, requires **two** pieces: compactness of $K$ (to extract a subsequence) and continuity of $f$ (to pass the subsequence through).

---

> **Corollary 20.2 (Extreme Value Theorem / Weierstrass).**
> If $f : [a, b] \to \mathbb{R}$ is continuous on a non-degenerate closed bounded interval, then $f$ attains a **maximum** and a **minimum** on $[a, b]$. That is, there exist $x_{\min}, x_{\max} \in [a, b]$ with
> $$f(x_{\min}) \;\leq\; f(x) \;\leq\; f(x_{\max}) \qquad \forall\, x \in [a, b].$$

**Proof.**

*Step 1 — Compactness of the domain.* By the Heine-Borel theorem ([[07-compact-sets]]), $[a, b]$ is compact since it is closed and bounded in $\mathbb{R}$.

*Step 2 — Compactness of the image.* By Theorem 20.1, $f([a, b])$ is compact. In $\mathbb{R}$, compact is equivalent to closed-and-bounded (Heine-Borel, other direction).

*Step 3 — Existence of sup and inf.* Since $f([a, b])$ is bounded and non-empty, $M := \sup f([a, b])$ and $m := \inf f([a, b])$ both exist as finite real numbers (least-upper-bound property of $\mathbb{R}$).

*Step 4 — Attainment: $M \in f([a, b])$.* By definition of supremum, for each $n \in \mathbb{N}$ there exists $y_n \in f([a, b])$ with
$$M - \tfrac{1}{n} \;<\; y_n \;\leq\; M.$$
By the squeeze property, $y_n \to M$. Since $f([a, b])$ is closed (as it is compact), and $(y_n) \subset f([a, b])$ with $y_n \to M$, it follows that $M \in f([a, b])$. So some $x_{\max} \in [a, b]$ satisfies $f(x_{\max}) = M$.

*Step 5 — Attainment of the minimum.* The argument for $m$ is symmetric: either apply Step 4 to $-f$ (whose supremum is $-m$), or repeat with $m + 1/n > y_n \geq m$ and $y_n \to m$.

*Step 6 — Conclusion.* For every $x \in [a, b]$, $f(x) \in f([a,b]) \subset [m, M] = [f(x_{\min}), f(x_{\max})]$, giving the stated inequality. $\blacksquare$

> **Remark (essential hypotheses).** Boundedness alone yields only $\sup$ and $\inf$ as real numbers; compactness (closed AND bounded) is what forces the sup/inf to be **attained** by the image. Both hypotheses — closedness of the domain AND continuity throughout — are essential. Dropping any one produces failures:
>
> | Domain | Function | What fails |
> |---|---|---|
> | $[0, 1]$ | $f(x) = 1/x$ if $x > 0$, $f(0) = 0$ | Not continuous at $0$; $f$ unbounded above. |
> | $[0, 1)$ | $f(x) = x$ | Domain not closed; $\sup f = 1$ not attained. |
> | $(0, 1]$ | $f(x) = 1/x$ | Domain not closed; $f$ unbounded above. |
> | $\mathbb{R}$ | $f(x) = x$ | Domain not bounded; both sup and inf infinite. |
> | $[0, 1]$ | $f(x) = x$ for $x < 1$, $f(1) = 0$ | Not continuous; $\sup f = 1$ not attained. |
>
> Each row illustrates one failed hypothesis. EVT is genuinely a three-legged stool: closedness, boundedness, continuity. Remove any leg and attainment can fail.

---

## 20.2 Connectedness

Connectedness is the topological obstruction that prevents a set from being split into two disjoint open pieces. In $\mathbb{R}$ it is equivalent to being an interval, but the topological formulation is what generalises to $\mathbb{R}^n$ and beyond.

> **Definition 20.3 (Disconnection, connectedness).**
> A subset $E \subset \mathbb{R}$ is **disconnected** if there exist open subsets $U, V$ of $\mathbb{R}$ satisfying all four conditions:
> 1. $E \subset U \cup V$ (*cover*),
> 2. $U \cap V \cap E = \emptyset$ (*separation: no overlap inside $E$*),
> 3. $U \cap E \neq \emptyset$ (*both pieces non-trivial*),
> 4. $V \cap E \neq \emptyset$.
>
> The pair $(U, V)$ is called a **separation** of $E$. We call $E$ **connected** if no such separation exists, i.e., $E$ cannot be split in this way.

*Remark on the definition.* Note that $U$ and $V$ need not themselves be disjoint as subsets of $\mathbb{R}$; only their traces on $E$ must be disjoint. Equivalently: $E$ is disconnected iff there exist two disjoint non-empty relatively open subsets of $E$ whose union is $E$. The "open in $\mathbb{R}$" version and the "open in $E$ (subspace topology)" version give the same notion of connectedness, by the standard correspondence between subspace opens and restrictions of ambient opens.

> **Theorem 20.4 (Connected subsets of $\mathbb{R}$ are exactly the intervals).**
> A subset $E \subset \mathbb{R}$ is connected if and only if $E$ is an **interval** (possibly degenerate: a single point, or the empty set).

Here "interval" is taken in the order-theoretic sense: $E$ is an interval if whenever $x, y \in E$ with $x < y$, the whole segment $[x, y]$ is contained in $E$. This includes all of $\emptyset$, $\{c\}$, $(a, b)$, $[a, b]$, $[a, b)$, $(a, b]$, $(-\infty, b)$, $(-\infty, b]$, $(a, \infty)$, $[a, \infty)$, and $\mathbb{R}$ itself.

**Proof.**

**($\Rightarrow$) Contrapositive: non-interval $\Rightarrow$ disconnected.**

Suppose $E$ is not an interval. Then there exist $a, b \in E$ and $c \in \mathbb{R}$ with $a < c < b$ but $c \notin E$. Define
$$U := (-\infty, c), \qquad V := (c, \infty).$$

We verify that $(U, V)$ is a separation of $E$.
- **Openness:** $U$ and $V$ are open rays in $\mathbb{R}$. ✓
- **Cover:** every $x \in E$ satisfies $x \neq c$ (since $c \notin E$), so $x < c$ or $x > c$, placing $x$ in $U$ or $V$. ✓
- **Disjointness on $E$:** $U \cap V = \emptyset$ in $\mathbb{R}$, so certainly $U \cap V \cap E = \emptyset$. ✓
- **Non-triviality:** $a < c$ and $a \in E$ gives $a \in U \cap E \neq \emptyset$; $b > c$ and $b \in E$ gives $b \in V \cap E \neq \emptyset$. ✓

Hence $E$ is disconnected.

**($\Leftarrow$) Interval $\Rightarrow$ connected.** We argue by contradiction.

Suppose $E$ is an interval yet $E$ is disconnected, so that a separation $(U, V)$ exists as in Definition 20.3.

*Step 1 — Pick witnesses.* Choose $a \in U \cap E$ and $b \in V \cap E$. Without loss of generality $a < b$ (interchange $U, V$ otherwise). Since $E$ is an interval and $a, b \in E$ with $a < b$, the whole segment $[a, b] \subset E$.

*Step 2 — Construct a "candidate separation point."* Define
$$c \;:=\; \sup \, \{ \, x \in [a, b] \,:\, x \in U \, \}.$$
The set is non-empty (contains $a$) and bounded above by $b$, so $c$ exists and $a \leq c \leq b$. Moreover $c \in [a, b] \subset E$, so $c \in E$. By the separation, $c \in U$ or $c \in V$ (exactly one).

*Step 3 — Case 1: $c \in U$.* Since $U$ and $V$ are disjoint on $E$ and $b \in V \cap E$, we have $c \neq b$, so $c < b$. Because $U$ is open, there exists $\delta > 0$ with $(c - \delta, c + \delta) \subset U$. Shrink $\delta$ if necessary so that $c + \delta \leq b$ (possible since $c < b$). Then $c + \delta/2 \in [a, b] \cap U$, and $c + \delta/2 > c$ — contradicting that $c$ is an **upper bound** of $\{x \in [a,b] : x \in U\}$.

*Step 4 — Case 2: $c \in V$.* Since $a \in U \cap E$ and $U, V$ disjoint on $E$, we have $c \neq a$, so $c > a$. Because $V$ is open, choose $\delta > 0$ with $(c - \delta, c + \delta) \subset V$; shrink so $c - \delta \geq a$. Then every $x \in (c - \delta, c]$ lies in $V$, hence (by disjointness on $E$) not in $U$. So every $x \in [a, b] \cap U$ satisfies $x \leq c - \delta < c$, making $c - \delta$ an upper bound — contradicting that $c$ is the **least** upper bound.

*Step 5 — Both cases contradict.* Hence no such separation exists; $E$ is connected. $\blacksquare$

**Interpretive remark.** The supremum argument in Step 2 is precisely the **least-upper-bound property of $\mathbb{R}$** in disguise; one can regard this theorem as one of the many equivalent formulations of Dedekind completeness. Over $\mathbb{Q}$, intervals need not be connected: e.g., $\{x \in \mathbb{Q} : x^2 < 2\}$ is a "$\mathbb{Q}$-interval" but admits the separation $U = (-\infty, \sqrt 2)$, $V = (\sqrt 2, \infty)$ restricted to $\mathbb{Q}$.

---

## 20.3 The Intermediate Value Theorem

> **Theorem 20.5 (Continuity preserves connectedness).**
> Let $f : E \to \mathbb{R}$ be continuous on a subset $E \subset \mathbb{R}$. If $E$ is connected, then $f(E)$ is connected.

**Proof.** Contrapositive: suppose $f(E)$ is disconnected, with separation $(U, V)$ as in Definition 20.3. Define
$$U' := f^{-1}(U) = \{x \in E : f(x) \in U\}, \qquad V' := f^{-1}(V).$$

We claim $(U', V')$ is a separation of $E$ (as subsets of $E$ in its subspace topology; or equivalently, as traces of opens in $\mathbb{R}$ — either version works).

1. *Openness in $E$:* $U', V'$ are preimages of opens under a continuous function, hence open in $E$. ✓
2. *Cover:* for $x \in E$, $f(x) \in f(E) \subset U \cup V$, so $x \in U' \cup V'$. ✓
3. *Disjointness on $E$:* if $x \in U' \cap V'$ then $f(x) \in U \cap V \cap f(E) = \emptyset$ — impossible. ✓
4. *Non-triviality:* pick $y \in U \cap f(E)$; then $y = f(x)$ for some $x \in E$, and $x \in U'$. Similarly $V' \cap E \neq \emptyset$. ✓

So $E$ is disconnected — contradiction. Hence $f(E)$ must be connected. $\blacksquare$

> **Corollary 20.6 (Intermediate Value Theorem, Bolzano).**
> Let $f : [a, b] \to \mathbb{R}$ be continuous, and set $\alpha := f(a)$, $\beta := f(b)$. Then for every real number $\gamma$ **strictly between** $\alpha$ and $\beta$ (i.e., $\min(\alpha, \beta) < \gamma < \max(\alpha, \beta)$), there exists $c \in (a, b)$ with $f(c) = \gamma$.

**Proof.**

*Step 1 — $[a,b]$ connected.* By Theorem 20.4, the interval $[a, b]$ is a connected subset of $\mathbb{R}$.

*Step 2 — $f([a,b])$ connected.* By Theorem 20.5, $f([a, b])$ is connected.

*Step 3 — $f([a,b])$ is an interval.* By Theorem 20.4 (the ``$\Leftarrow$'' direction, with roles switched — or rather, the characterisation is an iff), any connected subset of $\mathbb{R}$ is an interval. So $f([a, b])$ is an interval.

*Step 4 — $\gamma$ lies in the image.* We have $\alpha, \beta \in f([a, b])$. Since $f([a, b])$ is an interval and $\gamma$ is strictly between $\alpha$ and $\beta$, the interval property forces $\gamma \in f([a, b])$. So there exists $c \in [a, b]$ with $f(c) = \gamma$.

*Step 5 — Endpoint exclusion.* Since $\gamma \neq \alpha = f(a)$, we have $c \neq a$. Since $\gamma \neq \beta = f(b)$, we have $c \neq b$. Hence $c \in (a, b)$. $\blacksquare$

**Alternative proof of IVT (direct bisection).** Since the bisection method is computationally important, we sketch it as an alternative. WLOG $f(a) < \gamma < f(b)$.

Define $a_0 = a, b_0 = b$. Inductively, set $m_n = (a_n + b_n)/2$ and
- if $f(m_n) \leq \gamma$: set $a_{n+1} = m_n$, $b_{n+1} = b_n$;
- if $f(m_n) > \gamma$: set $a_{n+1} = a_n$, $b_{n+1} = m_n$.

Then $a_n$ is non-decreasing, $b_n$ is non-increasing, $b_n - a_n = (b - a)/2^n \to 0$, and $f(a_n) \leq \gamma \leq f(b_n)$ at every step. By monotone convergence $a_n \uparrow c$, $b_n \downarrow c$ for a common limit $c \in [a, b]$. By continuity $f(a_n) \to f(c)$ and $f(b_n) \to f(c)$. Taking limits in $f(a_n) \leq \gamma \leq f(b_n)$ yields $f(c) = \gamma$. $\blacksquare$

**Alternative proof of IVT (least upper bound).** Still assuming $f(a) < \gamma < f(b)$, define
$$S := \{ x \in [a, b] : f(x) \leq \gamma \}, \qquad c := \sup S.$$
Then $a \in S$ so $S \neq \emptyset$; $S$ is bounded by $b$; so $c \in [a, b]$ exists. By continuity arguments paralleling Cases 1 and 2 of Theorem 20.4, one shows $f(c) = \gamma$: if $f(c) < \gamma$, continuity pushes $c$ upward, contradicting $c = \sup S$; if $f(c) > \gamma$, continuity pushes $c$ downward, same contradiction. $\blacksquare$

> **Remark.** Both alternative proofs bypass the abstract connectedness framework — they depend directly on the LUB axiom of $\mathbb{R}$. The three proofs together (abstract-topological, algorithmic bisection, direct LUB) illustrate the standard triad through which analysts approach such existence theorems.

**Classical application — fixed points.** If $f : [0, 1] \to [0, 1]$ is continuous, define $g(x) := f(x) - x$. Then $g$ is continuous, $g(0) = f(0) \geq 0$, and $g(1) = f(1) - 1 \leq 0$. By IVT, some $c \in [0, 1]$ has $g(c) = 0$, i.e., $f(c) = c$. This is the one-dimensional case of the **Brouwer fixed point theorem**.

**Classical application — root-finding and bisection.** A continuous $f$ with $f(a) < 0 < f(b)$ has a zero in $(a, b)$ by IVT; the bisection method above exhibits one explicitly and provides the error estimate $|c - m_n| \leq (b-a)/2^{n+1}$.

---

## 20.4 Uniform Continuity

Ordinary (pointwise) continuity is a **local** condition: given a base point $a$ and a tolerance $\varepsilon > 0$, one finds a $\delta = \delta(a, \varepsilon) > 0$ that may vary from point to point. **Uniform continuity** promotes this to a **global** condition: the same $\delta$ works everywhere in the domain simultaneously.

> **Definition 20.7 (Uniform continuity).**
> A function $f : E \to \mathbb{R}$ is **uniformly continuous** on $E$ if
> $$\forall \varepsilon > 0 \;\; \exists \delta > 0 \;\; \forall x, y \in E \,:\; |x - y| < \delta \;\Longrightarrow\; |f(x) - f(y)| < \varepsilon.$$
>
> Compare ordinary continuity on $E$: the quantifier order is $\forall \varepsilon \, \forall x \, \exists \delta$; for uniform continuity it is $\forall \varepsilon \, \exists \delta \, \forall x, y$. The swap of quantifiers is the entire point.

*Negation.* $f$ is **not** uniformly continuous iff there exists $\varepsilon_0 > 0$ such that for every $\delta > 0$ there exist $x, y \in E$ with $|x - y| < \delta$ and $|f(x) - f(y)| \geq \varepsilon_0$. Equivalently (take $\delta = 1/n$): there exist $\varepsilon_0 > 0$ and sequences $(x_n), (y_n)$ in $E$ with $x_n - y_n \to 0$ and $|f(x_n) - f(y_n)| \geq \varepsilon_0$ for all $n$. This is the standard **sequential criterion for failure** of uniform continuity.

**Examples and non-examples.**

- **$f(x) = x^2$ on $\mathbb{R}$ is NOT uniformly continuous.** Take $x_n = n$ and $y_n = n + 1/n$. Then $|x_n - y_n| = 1/n \to 0$, but
$$|f(x_n) - f(y_n)| = \left|n^2 - \left(n + \tfrac{1}{n}\right)^2\right| = \left|2 + \tfrac{1}{n^2}\right| \geq 2.$$
By the sequential criterion with $\varepsilon_0 = 2$, $f$ is not uniformly continuous.

- **$f(x) = x^2$ on $[0, 10]$ IS uniformly continuous.** Factor: $|x^2 - y^2| = |x - y| \cdot |x + y|$. On $[0, 10]$, $|x + y| \leq 20$, so $|x^2 - y^2| \leq 20 |x - y|$. Given $\varepsilon > 0$, $\delta = \varepsilon/20$ works uniformly.

- **$f(x) = 1/x$ on $(0, 1]$ is NOT uniformly continuous.** Take $x_n = 1/n$, $y_n = 1/(n+1)$. Then $|x_n - y_n| = 1/(n(n+1)) \to 0$, but
$$|f(x_n) - f(y_n)| = |n - (n+1)| = 1 \quad \text{for all } n.$$
Take $\varepsilon_0 = 1$.

- **$f(x) = \sin x$ on $\mathbb{R}$ IS uniformly continuous.** By the mean value theorem (or the geometry of the unit circle), $|\sin x - \sin y| \leq |x - y|$. So any $\delta \leq \varepsilon$ works uniformly.

> **Diagnostic observation.** In a typical graduate exam, uniform continuity fails in exactly two ways:
>
> 1. **The domain is unbounded** and $f$ has super-Lipschitz growth (e.g., $x^2, x^3, e^x$): the oscillation $|f(x) - f(y)|$ over a tiny window of width $\delta$ grows with $|x|$, defeating any single $\delta$.
> 2. **The domain approaches a "bad point"** where $f$ blows up (e.g., $1/x$ near $0$, $\log x$ near $0$, $1/(1 - x)$ near $1$): the slope $|f(x) - f(y)|/|x - y|$ is unbounded near the singularity.
>
> Heine-Cantor (below) says that on a **compact** domain, neither failure mode can occur: boundedness rules out (1), closedness rules out (2).

---

## 20.5 The Heine-Cantor Theorem

> **Theorem 20.8 (Heine-Cantor).**
> If $f : K \to \mathbb{R}$ is continuous and $K \subset \mathbb{R}$ is compact, then $f$ is uniformly continuous on $K$.

**Proof (sequential / Bolzano-Weierstrass).** We prove the contrapositive: assume $f$ is continuous but **not** uniformly continuous, and derive a contradiction with compactness.

*Step 1 — Extract sequences via the failure criterion.* By the sequential negation of uniform continuity, there exist $\varepsilon_0 > 0$ and sequences $(x_n), (y_n) \subset K$ with
$$|x_n - y_n| < \tfrac{1}{n} \quad \text{and} \quad |f(x_n) - f(y_n)| \geq \varepsilon_0 \qquad \forall\, n \in \mathbb{N}.$$

*Step 2 — Use compactness on $(x_n)$.* Since $K$ is (sequentially) compact, $(x_n)$ admits a convergent subsequence $x_{n_k} \to x^* \in K$.

*Step 3 — Force $y_{n_k} \to x^*$ as well.* For each $k$, $|y_{n_k} - x^*| \leq |y_{n_k} - x_{n_k}| + |x_{n_k} - x^*| < 1/n_k + |x_{n_k} - x^*|$. Since $n_k \to \infty$ and $x_{n_k} \to x^*$, both terms vanish, giving $y_{n_k} \to x^*$.

*Step 4 — Apply continuity of $f$ at $x^*$.* Since $f$ is continuous at $x^*$ and both subsequences converge to $x^*$, sequential continuity gives
$$f(x_{n_k}) \to f(x^*), \qquad f(y_{n_k}) \to f(x^*).$$

*Step 5 — Contradict the lower bound.* By the triangle inequality,
$$|f(x_{n_k}) - f(y_{n_k})| \leq |f(x_{n_k}) - f(x^*)| + |f(x^*) - f(y_{n_k})| \to 0$$
as $k \to \infty$. But $|f(x_{n_k}) - f(y_{n_k})| \geq \varepsilon_0 > 0$ for every $k$ — contradiction.

Therefore $f$ must be uniformly continuous. $\blacksquare$

**Proof sketch (Lebesgue number lemma).** An alternative argument proceeds via the Lebesgue number lemma. Let $\varepsilon > 0$. By pointwise continuity at each $x \in K$, pick $\delta_x > 0$ so that $|y - x| < \delta_x \Rightarrow |f(y) - f(x)| < \varepsilon/2$. The open balls $\{B(x, \delta_x / 2) : x \in K\}$ cover $K$; by compactness, take a finite subcover by balls centred at $x_1, \ldots, x_N$ with radii $\delta_{x_i}/2$. The **Lebesgue number lemma** guarantees a single $\delta > 0$ — any $\delta \leq \min_i \delta_{x_i}/2$ works — such that every pair $y, z \in K$ with $|y - z| < \delta$ lies within a common ball $B(x_i, \delta_{x_i})$, whence
$$|f(y) - f(z)| \leq |f(y) - f(x_i)| + |f(x_i) - f(z)| < \varepsilon/2 + \varepsilon/2 = \varepsilon.$$
This produces the same conclusion via an explicit finite-cover argument. $\blacksquare$

**Interpretive remark.** Compactness does two things simultaneously for Heine-Cantor: (i) it lets sequences be "pinned down" via Bolzano-Weierstrass, and (ii) it provides a global Lebesgue number so that a single $\delta$ captures every local $\delta_x$. Both viewpoints are worth carrying.

---

## 20.6 Lipschitz and Hölder Continuity

Stronger-than-continuous regularity classes, each implying uniform continuity but each strictly stronger than the previous.

> **Definition 20.9 (Lipschitz and Hölder continuity).**
> Let $f : E \to \mathbb{R}$.
>
> - $f$ is **Lipschitz continuous** on $E$ (with constant $L$) if there exists $L \geq 0$ such that
>   $$|f(x) - f(y)| \leq L |x - y| \qquad \forall\, x, y \in E.$$
>   The infimum of such $L$ is the **Lipschitz constant** $\operatorname{Lip}(f)$.
>
> - $f$ is **Hölder continuous of exponent $\alpha \in (0, 1]$** on $E$ if there exists $C \geq 0$ such that
>   $$|f(x) - f(y)| \leq C |x - y|^\alpha \qquad \forall\, x, y \in E.$$

Note that Hölder with $\alpha = 1$ coincides with Lipschitz. Hölder with $\alpha > 1$ on a connected open set forces $f$ to be constant (differentiate: $|f'(x)| \leq \lim_{h \to 0} C |h|^{\alpha - 1} = 0$), so exponents above $1$ are trivial on intervals.

> **Proposition (Hölder $\Rightarrow$ uniform continuity).** Every Hölder continuous (and in particular every Lipschitz) function is uniformly continuous.

*Proof.* Given $\varepsilon > 0$, take $\delta = (\varepsilon / C)^{1/\alpha}$. Then $|x - y| < \delta$ gives $|f(x) - f(y)| \leq C |x - y|^\alpha < C \delta^\alpha = \varepsilon$. $\blacksquare$

> **Hierarchy of regularity classes.** On a generic domain $E \subset \mathbb{R}$:
> $$\text{Lipschitz} \;\subsetneq\; \text{Hölder}_\alpha\,(0 < \alpha < 1) \;\subsetneq\; \text{uniformly continuous} \;\subsetneq\; \text{continuous}.$$
> Each inclusion is **strict**; witnesses below.

> **Witnesses of strictness.**
> - **$\sqrt{x}$ on $[0, 1]$** is Hölder with exponent $1/2$ (Example 2 below) but **not Lipschitz**: $(\sqrt{x} - 0)/(x - 0) = 1/\sqrt{x} \to \infty$ as $x \to 0^+$.
> - **$f(x) = x \sin(1/x)$** on $(0, 1]$ (extended by $f(0) = 0$) is continuous on $[0, 1]$ (hence uniformly continuous by Heine-Cantor), but is not Hölder of any exponent $\alpha > 0$. Near $0$ the function oscillates with amplitude $x$ but between zeros spaced $O(1/n)$ apart, producing oscillations with modulus of continuity worse than any power function.
> - **$f(x) = x^2$ on $\mathbb{R}$** is continuous but not uniformly continuous (Example above).

---

## 20.7 Continuity on $\mathbb{R}^n$ (Brief Note)

All three headline theorems of this chapter extend, **with identical statements**, to continuous functions $f : K \to \mathbb{R}^m$ where $K$ is a compact subset of $\mathbb{R}^n$. Required ingredients:

- **Heine-Borel in $\mathbb{R}^n$:** a subset is compact iff closed and bounded (identical proof via bisection along each coordinate axis).
- **Norm** in place of absolute value: use $\|x - y\|_2$ or any equivalent norm; all the quantifier structure is identical.
- **Sequential compactness** in $\mathbb{R}^n$ (diagonal/component-wise Bolzano-Weierstrass).

With these in hand:

- **EVT (general version):** Continuous $f : K \to \mathbb{R}$ on compact $K \subset \mathbb{R}^n$ attains max and min.
- **Heine-Cantor:** Continuous $f : K \to \mathbb{R}^m$ on compact $K \subset \mathbb{R}^n$ is uniformly continuous.
- **IVT on path-connected sets:** If $K \subset \mathbb{R}^n$ is path-connected and $f : K \to \mathbb{R}$ continuous, then $f(K)$ is an interval. Path-connectedness ($\Rightarrow$ connectedness) is the $n$-dimensional analogue of "being an interval"; the proof reduces to the 1-D IVT by restricting $f$ to continuous paths $\gamma : [0, 1] \to K$.

---

## 20.8 Worked Examples

### Example 1 — Every odd-degree polynomial has a real root.

**Setup.** Let $p(x) = a_n x^n + a_{n-1} x^{n-1} + \cdots + a_0$ with $a_n \neq 0$ and $n$ odd ($n \geq 1$).

**Strategy.** Use the asymptotic behaviour of $p$ at $\pm \infty$ to find a sign-change interval, then apply IVT.

**Computation.**

*Step 1 — WLOG assumption.* If $a_n < 0$, replace $p$ by $-p$; this negates every value of $p$ but does not affect whether $p$ has a root. So assume $a_n > 0$.

*Step 2 — Asymptotic dominance.* For large $|x|$,
$$p(x) \;=\; a_n x^n \left( 1 + \frac{a_{n-1}}{a_n x} + \cdots + \frac{a_0}{a_n x^n} \right).$$
The parenthesised factor tends to $1$ as $|x| \to \infty$. So for $|x|$ sufficiently large, this factor is, say, $> 1/2$, giving
$$\operatorname{sign}(p(x)) = \operatorname{sign}(a_n x^n) = \operatorname{sign}(x^n) \qquad \text{for } |x| \gg 0.$$

*Step 3 — Sign at $\pm \infty$.* Since $n$ is odd, $x^n \to +\infty$ as $x \to +\infty$ and $x^n \to -\infty$ as $x \to -\infty$. Together with $a_n > 0$:
$$p(x) \to +\infty \quad (x \to +\infty), \qquad p(x) \to -\infty \quad (x \to -\infty).$$

*Step 4 — Choose witnesses.* Pick $M > 0$ large enough that $p(M) > 0$ and $p(-M) < 0$. $p$ is a polynomial, hence continuous on all of $\mathbb{R}$, and in particular on the compact interval $[-M, M]$.

*Step 5 — Apply IVT.* Since $p(-M) < 0 < p(M)$, IVT guarantees some $c \in (-M, M)$ with $p(c) = 0$.

**Verification.** The proof uses only (i) continuity of polynomials, (ii) the asymptotic dominance of the leading term, and (iii) IVT. It does **not** require differentiability, factorisation, or the fundamental theorem of algebra.

**Interpretation.** The odd-degree hypothesis is essential: $p(x) = x^2 + 1$ has no real root (even degree, always positive). The statement is tight: over $\mathbb{C}$ every polynomial has a root (FTA), but that requires much deeper machinery (e.g. Liouville's theorem or winding numbers). IVT gives the real version of FTA in the one case it can handle. $\blacksquare$

---

### Example 2 — $\sqrt{x}$ is uniformly continuous on $[0, \infty)$.

**Setup.** Let $f : [0, \infty) \to \mathbb{R}$ be $f(x) = \sqrt{x}$. Note the domain is closed but **not** compact (unbounded).

**Strategy.** Establish the inequality $|\sqrt x - \sqrt y| \leq \sqrt{|x - y|}$ (i.e., Hölder continuity of exponent $1/2$), then invoke the Hölder-implies-uniform implication.

**Computation.**

*Step 1 — Reduction.* Without loss of generality assume $x \geq y \geq 0$ (else swap).

*Step 2 — Key algebraic inequality.* Claim: $\sqrt{a + b} \leq \sqrt a + \sqrt b$ for $a, b \geq 0$. *Proof.* Square both sides: $(\sqrt a + \sqrt b)^2 = a + 2\sqrt{ab} + b \geq a + b$ since $\sqrt{ab} \geq 0$. Taking square roots (monotone on $[0, \infty)$) gives the claim.

*Step 3 — Apply.* Write $x = (x - y) + y$. Then
$$\sqrt x = \sqrt{(x - y) + y} \;\leq\; \sqrt{x - y} + \sqrt y.$$
Rearranging,
$$\sqrt x - \sqrt y \leq \sqrt{x - y} = \sqrt{|x - y|}.$$

*Step 4 — Absolute value.* Since $x \geq y$ we have $\sqrt x - \sqrt y \geq 0$, so $|\sqrt x - \sqrt y| = \sqrt x - \sqrt y \leq \sqrt{|x - y|}$.

*Step 5 — Translate into uniform continuity.* Given $\varepsilon > 0$, choose $\delta = \varepsilon^2$. Then $|x - y| < \delta$ gives $|\sqrt x - \sqrt y| \leq \sqrt{|x - y|} < \sqrt{\delta} = \varepsilon$. ✓

**Verification.** Cross-check: $f$ is Hölder-$1/2$ with constant $C = 1$. Via the proposition in §20.6, this gives $\delta = (\varepsilon / 1)^{1/(1/2)} = \varepsilon^2$ — matches.

**Interpretation.** This is a notable case where a function is uniformly continuous on an **unbounded** domain; Heine-Cantor gives only the compact-domain case, so the uniform continuity here is established by hand via the Hölder inequality. Note that $\sqrt x$ is **not** Lipschitz on $[0, \infty)$: near $0$, $(\sqrt x - 0)/(x - 0) = 1/\sqrt x \to \infty$. So $\sqrt x$ sits in the strict gap Hölder $\setminus$ Lipschitz. $\blacksquare$

---

### Example 3 — Every continuous $f : [0, 1] \to [0, 1]$ has a fixed point.

**Setup.** $f : [0, 1] \to [0, 1]$ continuous. A **fixed point** is $c$ with $f(c) = c$.

**Strategy.** Consider the "defect function" $g(x) = f(x) - x$ and apply IVT to find a zero of $g$.

**Computation.**

*Step 1 — Auxiliary function.* Define $g : [0, 1] \to \mathbb{R}$ by $g(x) = f(x) - x$. Both $f$ and $x \mapsto x$ are continuous, so $g$ is continuous by algebra of continuous functions.

*Step 2 — Sign at endpoints.* 
- $g(0) = f(0) - 0 = f(0) \in [0, 1]$, so $g(0) \geq 0$.
- $g(1) = f(1) - 1 \in [0, 1] - 1 = [-1, 0]$, so $g(1) \leq 0$.

*Step 3 — Case split.*
- If $g(0) = 0$: $f(0) = 0$, so $c = 0$ is a fixed point.
- If $g(1) = 0$: $f(1) = 1$, so $c = 1$ is a fixed point.
- Otherwise $g(0) > 0$ and $g(1) < 0$. By IVT on $[0, 1]$, some $c \in (0, 1)$ has $g(c) = 0$, i.e., $f(c) = c$.

**Verification.** In all three cases a fixed point is produced. The hypothesis that $f$ maps **into** $[0, 1]$ (not merely continuity on $[0, 1]$) is essential; without it, the sign conditions at the endpoints fail. Example of failure if $f : [0,1] \to \mathbb{R}$ is merely continuous: $f(x) = x + 1$ has no fixed point.

**Interpretation.** This is the **1-D Brouwer fixed-point theorem**. The $n$-D generalisation ("every continuous self-map of a closed ball in $\mathbb{R}^n$ has a fixed point") fails the IVT-style proof and requires algebraic topology (degree theory, homology). Intriguingly, the statement is sharp: an open interval $(0, 1)$ can be self-mapped continuously without any fixed point ($f(x) = x/2$), and so can a bounded non-closed set. $\blacksquare$

---

### Example 4 — $f(x) = 1/(1 + x^2)$ is uniformly continuous on $\mathbb{R}$.

**Setup.** $f : \mathbb{R} \to \mathbb{R}$, $f(x) = 1/(1 + x^2)$. Domain is unbounded, so Heine-Cantor does not apply directly.

**Strategy.** Show $f$ is Lipschitz on all of $\mathbb{R}$.

**Computation.**

*Step 1 — Difference identity.*
$$f(x) - f(y) = \frac{1}{1 + x^2} - \frac{1}{1 + y^2} = \frac{(1 + y^2) - (1 + x^2)}{(1 + x^2)(1 + y^2)} = \frac{y^2 - x^2}{(1 + x^2)(1 + y^2)} = \frac{-(x - y)(x + y)}{(1 + x^2)(1 + y^2)}.$$

*Step 2 — Bound the auxiliary factor.* We show
$$\frac{|x + y|}{(1 + x^2)(1 + y^2)} \;\leq\; 1 \qquad \forall\, x, y \in \mathbb{R}.$$

*Step 3 — Sub-estimate for $|x|$.* By AM-GM, $1 + x^2 \geq 2|x|$, so
$$\frac{|x|}{1 + x^2} \leq \frac{1}{2}.$$
Therefore
$$\frac{|x|}{(1 + x^2)(1 + y^2)} \leq \frac{|x|}{1 + x^2} \cdot \frac{1}{1 + y^2} \leq \frac{1}{2} \cdot 1 = \frac{1}{2}.$$
Symmetrically $|y| / [(1+x^2)(1+y^2)] \leq 1/2$.

*Step 4 — Combine via triangle inequality.*
$$\frac{|x + y|}{(1 + x^2)(1 + y^2)} \leq \frac{|x|}{(1+x^2)(1+y^2)} + \frac{|y|}{(1+x^2)(1+y^2)} \leq \tfrac{1}{2} + \tfrac{1}{2} = 1. \checkmark$$

*Step 5 — Lipschitz conclusion.* Combining Steps 1 and 4,
$$|f(x) - f(y)| \leq 1 \cdot |x - y| = |x - y|.$$
So $f$ is Lipschitz with constant $L = 1$. Given $\varepsilon > 0$, $\delta = \varepsilon$ works uniformly.

**Verification.** Check at $x = 0, y = 1$: $f(0) = 1, f(1) = 1/2$; $|f(0) - f(1)| = 1/2 \leq 1 \cdot |0 - 1| = 1$. ✓

**Interpretation.** This is an interesting case because $f$ has derivative $f'(x) = -2x/(1 + x^2)^2$, which is bounded: $|f'(x)| \leq \sup_x 2|x|/(1+x^2)^2 \leq 2 \cdot \sup_x (|x|/(1+x^2)) \cdot \sup_x (1/(1+x^2)) \leq 2 \cdot 1/2 \cdot 1 = 1$. Via the mean value theorem, $|f(x) - f(y)| = |f'(\xi)(x-y)| \leq |x - y|$ — an alternative proof. Whenever $f'$ is bounded on an interval, $f$ is Lipschitz (and conversely, if $f$ is Lipschitz and differentiable, $\|f'\|_\infty \leq \operatorname{Lip}(f)$). $\blacksquare$

---

### Example 5 — Continuous extension criterion.

**Claim.** Let $f : (0, 1] \to \mathbb{R}$ be continuous. Then $f$ admits a continuous extension $\tilde f : [0, 1] \to \mathbb{R}$ if and only if $f$ is uniformly continuous on $(0, 1]$.

**Setup.** We prove both directions separately; the non-trivial one is ($\Leftarrow$).

**Strategy ($\Rightarrow$).** If the extension exists, it is continuous on a compact set, hence uniformly continuous (Heine-Cantor); restriction preserves uniform continuity.

**Computation ($\Rightarrow$).**

*Step 1.* Suppose $\tilde f : [0, 1] \to \mathbb{R}$ is continuous and $\tilde f |_{(0,1]} = f$.

*Step 2.* $[0, 1]$ is compact; by Heine-Cantor, $\tilde f$ is uniformly continuous on $[0, 1]$.

*Step 3.* If $\tilde f$ is uniformly continuous on $[0, 1]$, its restriction $f$ to the subset $(0, 1]$ is uniformly continuous (same $\delta$ from Definition 20.7 works — the quantifier $\forall x, y$ over $(0, 1] \subset [0, 1]$ is a weaker quantifier than over $[0,1]$). ✓

**Strategy ($\Leftarrow$).** Construct $\tilde f$ by defining $\tilde f(0) := \lim_{x \to 0^+} f(x)$. Show the limit exists (using Cauchy completeness) and that the extension is continuous at $0$.

**Computation ($\Leftarrow$).**

*Step 1 — Sequential Cauchy extraction.* Take any sequence $x_n \to 0^+$ in $(0, 1]$. $(x_n)$ converges in $\mathbb{R}$, hence is Cauchy.

*Step 2 — Image is Cauchy.* Given $\varepsilon > 0$, pick $\delta > 0$ from uniform continuity: $|x - y| < \delta \Rightarrow |f(x) - f(y)| < \varepsilon$. Since $(x_n)$ is Cauchy, find $N$ with $|x_m - x_n| < \delta$ for all $m, n \geq N$. Then $|f(x_m) - f(x_n)| < \varepsilon$. So $(f(x_n))$ is a Cauchy sequence in $\mathbb{R}$.

*Step 3 — Completeness.* $\mathbb{R}$ is complete, so $f(x_n) \to L$ for some $L \in \mathbb{R}$.

*Step 4 — Independence of sequence.* We show $L$ depends only on $f$, not on the choice of $x_n$. Let $(x_n')$ be a second sequence in $(0, 1]$ with $x_n' \to 0$, giving $f(x_n') \to L'$. Interleave into a merged sequence $z_1 = x_1, z_2 = x_1', z_3 = x_2, z_4 = x_2', \ldots$. Then $z_n \to 0$ as well, so by the argument above $f(z_n) \to M$ for some $M \in \mathbb{R}$. But $(f(x_n))$ and $(f(x_n'))$ are subsequences of $(f(z_n))$, so both converge to $M$. Hence $L = M = L'$.

*Step 5 — Define the extension.* Set $\tilde f(0) := L$ and $\tilde f(x) := f(x)$ for $x \in (0, 1]$.

*Step 6 — Continuity at $0$.* Given $\varepsilon > 0$, use the $\delta$ from uniform continuity. For $0 < x < \delta$: pick any sequence $y_n \to 0^+$. Since $y_n$ eventually satisfies $|x - y_n| < \delta$, we get $|f(x) - f(y_n)| \leq \varepsilon$. Letting $n \to \infty$ (using $f(y_n) \to L = \tilde f(0)$) yields $|f(x) - \tilde f(0)| \leq \varepsilon$. So $\tilde f(x) \to \tilde f(0)$ as $x \to 0^+$. ✓

*Step 7 — Continuity elsewhere.* For $x \in (0, 1]$, $\tilde f$ agrees with $f$ near $x$, and $f$ is continuous at $x$. ✓

**Verification.** The converse direction used only Cauchy completeness of $\mathbb{R}$ and the definition of uniform continuity — no compactness of the codomain, no special structure of $(0, 1]$ beyond "$0$ is a boundary point accessible by sequences."

**Interpretation.** This is a **general metric-space completion principle**: uniform continuity is precisely the regularity needed to push a continuous map to the closure of its domain. The result generalises to: any uniformly continuous map from a dense subset of a metric space into a **complete** metric space extends uniquely and continuously to the whole space (the *extension theorem*). This is a cornerstone of defining the Riemann integral (via step functions dense in continuous functions), completing metric spaces, and constructing Lebesgue's $L^p$ spaces. $\blacksquare$

---

## 20.9 Practice Problems

1. Let $f : [a, b] \to \mathbb{R}$ be continuous. Prove that $|f|$ is also continuous and attains its maximum on $[a, b]$.
2. Use IVT to prove that the equation $x - \cos x = 0$ has a solution in $(0, \pi/2)$.
3. Show that $f(x) = x^2$ is uniformly continuous on every bounded interval, but not uniformly continuous on $\mathbb{R}$.
4. Let $f : \mathbb{R} \to \mathbb{R}$ be continuous with $\lim_{x \to \infty} f(x) = \lim_{x \to -\infty} f(x) = 0$. Show that $f$ attains a maximum **or** a minimum on $\mathbb{R}$ (possibly both).
5. Let $f : [0, \infty) \to \mathbb{R}$ be continuous with $\lim_{x \to \infty} f(x) = L$ finite. Show that $f$ is uniformly continuous on $[0, \infty)$.

### Solutions

**Solution 1.** Continuity and attainment of $|f|$.

*Step 1 — $|f|$ is continuous.* Recall the **reverse triangle inequality**: $\big||a| - |b|\big| \leq |a - b|$ for all $a, b \in \mathbb{R}$. (Proof: $|a| = |(a - b) + b| \leq |a - b| + |b|$, so $|a| - |b| \leq |a - b|$; symmetrically $|b| - |a| \leq |b - a| = |a - b|$.)

*Step 2 — Translate to $\varepsilon$-$\delta$.* Fix $c \in [a, b]$ and $\varepsilon > 0$. By continuity of $f$ at $c$, choose $\delta > 0$ such that $|x - c| < \delta \Rightarrow |f(x) - f(c)| < \varepsilon$. Then by Step 1,
$$\big||f|(x) - |f|(c)\big| = \big||f(x)| - |f(c)|\big| \leq |f(x) - f(c)| < \varepsilon.$$
So $|f|$ is continuous at $c$. Since $c$ was arbitrary, $|f|$ is continuous on $[a, b]$.

*Step 3 — Attainment of max.* $[a, b]$ is compact and $|f| : [a, b] \to \mathbb{R}$ is continuous, so by EVT (Corollary 20.2), $|f|$ attains its maximum on $[a, b]$.

**Verification.** Note that $\max |f|$ need not equal $|f(x_\max)|$ where $x_\max$ maximises $f$; e.g., $f(x) = x - 1/2$ on $[0, 1]$ has $\max f = 1/2$ but $\max |f| = 1/2$ attained at both $x = 0$ (where $f = -1/2$) and $x = 1$ (where $f = 1/2$). $\blacksquare$

---

**Solution 2.** Root of $g(x) = x - \cos x$ in $(0, \pi/2)$.

*Step 1 — Continuity.* $g$ is a sum/difference of continuous functions ($x$ and $\cos x$), so $g$ is continuous on $\mathbb{R}$.

*Step 2 — Evaluate at endpoints.*
- $g(0) = 0 - \cos 0 = 0 - 1 = -1 < 0$.
- $g(\pi/2) = \pi/2 - \cos(\pi/2) = \pi/2 - 0 = \pi/2 \approx 1.571 > 0$.

*Step 3 — Apply IVT.* Since $g$ is continuous on $[0, \pi/2]$ and $g(0) < 0 < g(\pi/2)$, by IVT (with $\gamma = 0$), there exists $c \in (0, \pi/2)$ with $g(c) = 0$, i.e., $c = \cos c$.

**Verification.** Numerically, $c \approx 0.7391$ (the Dottie number), which indeed lies in $(0, \pi/2) \approx (0, 1.571)$. ✓

**Interpretation.** Uniqueness follows from monotonicity: $g'(x) = 1 + \sin x > 0$ on $(0, \pi/2)$, so $g$ is strictly increasing and has exactly one zero. (IVT alone gives existence, not uniqueness; monotonicity gives uniqueness.) $\blacksquare$

---

**Solution 3.** $f(x) = x^2$: uniform on bounded, not on $\mathbb{R}$.

**Part (a) — Not uniformly continuous on $\mathbb{R}$.** 

Take $x_n = n$ and $y_n = n + 1/n$. Then:
- $|x_n - y_n| = 1/n \to 0$;
- $|f(x_n) - f(y_n)| = |n^2 - (n + 1/n)^2| = |n^2 - n^2 - 2 - 1/n^2| = |2 + 1/n^2| \geq 2$.

By the sequential criterion for failure of uniform continuity (take $\varepsilon_0 = 1$): for any proposed $\delta > 0$, pick $n$ with $1/n < \delta$; then $|x_n - y_n| < \delta$ but $|f(x_n) - f(y_n)| \geq 2 > 1$. No $\delta$ works uniformly. $\blacksquare$

**Part (b) — Uniformly continuous on $[-M, M]$ for any $M > 0$.**

*Step 1 — Factor.* $|x^2 - y^2| = |x - y| \cdot |x + y|$.

*Step 2 — Bound $|x + y|$.* For $x, y \in [-M, M]$, $|x + y| \leq |x| + |y| \leq 2M$.

*Step 3 — Lipschitz on $[-M, M]$.* $|f(x) - f(y)| \leq 2M \cdot |x - y|$.

*Step 4 — Choose $\delta$.* Given $\varepsilon > 0$, take $\delta = \varepsilon/(2M)$. Then $|x - y| < \delta \Rightarrow |f(x) - f(y)| < 2M \cdot \varepsilon/(2M) = \varepsilon$. ✓

**Interpretation.** This example neatly illustrates the point of Heine-Cantor: on bounded intervals (closed or not, but here compact $[-M, M]$), $f$ is even Lipschitz. The failure on $\mathbb{R}$ is driven by the unboundedness of the Lipschitz constant ($|f'(x)| = 2|x| \to \infty$), a symptom of the "unbounded domain + super-Lipschitz growth" failure mode. $\blacksquare$

---

**Solution 4.** $f$ with vanishing limits attains max or min.

*Step 1 — Trivial case.* If $f \equiv 0$, both max and min equal $0$, attained everywhere. Done.

*Step 2 — Assume $f \not\equiv 0$.* Then either some $x_0$ has $f(x_0) > 0$, or some has $f(x_0) < 0$ (possibly both). WLOG assume $f(x_0) > 0$ (else apply the argument to $-f$).

*Step 3 — Use decay at infinity.* Since $f(x) \to 0$ as $x \to \pm \infty$, we can choose $M > 0$ such that $|f(x)| < f(x_0)/2$ for all $|x| > M$. Enlarging $M$ if necessary, assume $|x_0| \leq M$.

*Step 4 — EVT on $[-M, M]$.* $f$ is continuous on the compact interval $[-M, M]$; by EVT (Corollary 20.2), $f$ attains a maximum on $[-M, M]$ at some point $x^* \in [-M, M]$. Since $x_0 \in [-M, M]$, this max satisfies $f(x^*) \geq f(x_0) > 0$.

*Step 5 — Compare with the exterior.* For $|x| > M$, $|f(x)| < f(x_0)/2 \leq f(x^*)/2 < f(x^*)$. So $f(x) < f(x^*)$ for all such $x$.

*Step 6 — Global maximum.* Combining Steps 4 and 5, $f(x) \leq f(x^*)$ for all $x \in \mathbb{R}$. So $x^*$ is the global maximum of $f$ on $\mathbb{R}$.

*Step 7 — Symmetric case.* If instead some $f(x_0) < 0$, apply the argument to $-f$ to produce a global minimum. In general at least one of max or min is attained; both are attained if $f$ takes both signs. $\blacksquare$

**Interpretation.** The hypothesis $\lim_{|x| \to \infty} f = 0$ is a form of **tightness** or **vanishing at infinity**. It makes $\mathbb{R}$ effectively compact for the purposes of optimisation: points "at infinity" don't carry useful values. A variant result: if $\lim_{|x| \to \infty} f = c$ (any finite constant, not necessarily $0$), then $f - c$ has vanishing limits and attains its max or min, which transfers to $f$. $\blacksquare$

---

**Solution 5.** $f : [0, \infty) \to \mathbb{R}$ continuous with $\lim_{\infty} f = L$: uniform continuity.

**Strategy.** Split $[0, \infty)$ into a compact piece (handle with Heine-Cantor) and a tail (handle with the limit).

*Step 1 — Tail estimate.* Fix $\varepsilon > 0$. Since $f(x) \to L$, pick $N$ with $|f(x) - L| < \varepsilon/2$ for all $x \geq N$. Then for all $x, y \geq N$,
$$|f(x) - f(y)| \leq |f(x) - L| + |L - f(y)| < \varepsilon/2 + \varepsilon/2 = \varepsilon.$$

*Step 2 — Compact piece estimate.* On the compact interval $[0, N+1]$, $f$ is continuous, hence uniformly continuous by Heine-Cantor (Theorem 20.8): there exists $\delta_1 > 0$ such that $x, y \in [0, N+1]$ with $|x - y| < \delta_1$ gives $|f(x) - f(y)| < \varepsilon$.

*Step 3 — Combine via overlap.* Let $\delta := \min(\delta_1, 1)$. Take any $x, y \in [0, \infty)$ with $|x - y| < \delta$. We claim $|f(x) - f(y)| < \varepsilon$ in all cases. WLOG $x \leq y$, so $y - x < \delta \leq 1$.

- **Case A — Both points in $[0, N+1]$.** Apply Step 2 with $\delta_1$. Since $\delta \leq \delta_1$, $|x - y| < \delta_1$, so $|f(x) - f(y)| < \varepsilon$. ✓
- **Case B — Both points in $[N, \infty)$.** Apply Step 1. $|f(x) - f(y)| < \varepsilon$. ✓
- **Case C — $x < N$ and $y > N+1$.** Then $y - x > N + 1 - N = 1 \geq \delta$, contradicting $|x - y| < \delta$. So this case is vacuous.
- **Case D — $x < N$ and $N \leq y \leq N + 1$.** Both in $[0, N+1]$, handled by Case A.
- **Case E — $N \leq x \leq N+1$ and $y > N + 1$.** Both in $[N, \infty)$, handled by Case B.

The overlap region $[N, N+1]$ ensures every pair falls into at least one of Cases A or B. ✓

*Step 4 — Conclusion.* For all $x, y \in [0, \infty)$ with $|x - y| < \delta$, $|f(x) - f(y)| < \varepsilon$. This establishes uniform continuity. $\blacksquare$

**Verification.** The overlap trick (using $[0, N+1]$ rather than $[0, N]$) is load-bearing: without it, a pair $(x, y) = (N - \delta/2, N + \delta/2)$ could straddle the split and fail to be handled by either piece. The overlap of width $1$ guarantees that whenever $|x - y| < 1$ and $x, y$ straddle the split, both endpoints lie in the overlap region $[N, N+1]$ and the compact estimate applies.

**Interpretation.** This is a "tightness" argument very similar in spirit to Solution 4. Having a limit at infinity is a **one-point compactification**-style condition: the behaviour at infinity is controlled by a single value $L$, morally adding $\infty$ as a point where $f$ extends continuously. Indeed, the map $[0, \infty] \to \mathbb{R}$ sending $\infty \to L$ is continuous on the (compact) one-point compactification, and Heine-Cantor there gives uniform continuity — restricted to $[0, \infty)$, this recovers the problem statement. $\blacksquare$

---

## 20.10 Summary

> **The three global theorems.**
>
> | Theorem | Domain property | Conclusion |
> |---|---|---|
> | **EVT (Weierstrass)** | Compact | $f$ attains max and min |
> | **IVT (Bolzano)** | Connected (interval) | $f$ takes every intermediate value |
> | **Heine-Cantor** | Compact | $f$ is uniformly continuous |

> **Topological preservation under continuity.**
>
> - Continuous image of **compact** is compact. (Theorem 20.1)
> - Continuous image of **connected** is connected. (Theorem 20.5)
> - Continuous image of **path-connected** is path-connected. (Same proof composition argument.)
>
> Continuous image of **closed**, of **bounded**, of **open** — these may fail! E.g., $f(x) = 1/(1 + x^2)$ maps the closed set $\mathbb{R}$ to $(0, 1]$ (not closed); $f(x) = \sin x$ maps the open set $\mathbb{R}$ to $[-1, 1]$ (not open).

> **Uniform continuity hierarchy.**
> $$\text{Lipschitz} \;\Rightarrow\; \text{Hölder}_\alpha\,(\alpha \in (0,1)) \;\Rightarrow\; \text{uniform cts} \;\Rightarrow\; \text{continuous}.$$
> Each implication is strict (witnesses in §20.6). On compact domains, "uniform cts $\Leftrightarrow$ continuous" by Heine-Cantor.

> **Why these theorems matter — downstream consequences.**
>
> - **EVT** is the foundation of optimisation theory: an objective function continuous on a compact feasible set attains its optima. Without compactness, no guarantee (Example: $f(x) = e^{-x}$ on $[0, \infty)$ — bounded, no minimum attained).
> - **IVT** is the foundation of root-finding: provides existence of zeros on sign-change intervals (bisection method, Newton's method convergence). Together with Brouwer, it underpins fixed-point theory.
> - **Heine-Cantor** is essential for upgrading pointwise estimates to uniform ones on compact sets. It is the key ingredient in:
>    - Riemann integrability of continuous functions ([[25-riemann-stieltjes-integral]]): uniform continuity lets the upper and lower Darboux sums be made arbitrarily close.
>    - Interchange of limit and integral for uniformly continuous sequences on compact sets.
>    - Existence theory for ODEs (Picard-Lindelöf): requires Lipschitz (hence uniformly continuous) right-hand sides.

---

## Related Topics

- [[07-compact-sets]] — compactness in $\mathbb{R}$, Heine-Borel, Bolzano-Weierstrass
- [[16-continuity]] — $\varepsilon$-$\delta$ and sequential continuity; topological characterisation
- [[17-types-of-discontinuity-monotonic]] — images of monotonic continuous functions; preimages of intervals
- [[22-differentiation]] — differentiability as a strengthening of continuity; MVT
- [[25-riemann-stieltjes-integral]] — Heine-Cantor is essential for integrability of continuous functions
