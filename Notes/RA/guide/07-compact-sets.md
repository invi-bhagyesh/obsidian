# 7. Compact Sets

---

## 7.1 Why Compactness

Compactness is the single most powerful condition in analysis. It turns infinite/local information into finite/global information. When a set is compact:
- every continuous function on it attains its max and min (EVT);
- every continuous function on it is uniformly continuous;
- every sequence in it has a convergent subsequence with limit inside the set;
- every open cover has a finite subcover — an effective "finite reduction."

On $\mathbb{R}$, compactness has a very clean characterisation: **a subset of $\mathbb{R}$ is compact iff it is closed and bounded**. This is the Heine-Borel theorem, proved below.

---

## 7.2 Open Covers and the Abstract Definition

> **Definition.** Let $S \subseteq \mathbb{R}$. A collection $\mathcal{U} = \{U_\alpha\}_{\alpha \in I}$ of open subsets of $\mathbb{R}$ is an **open cover** of $S$ if
> $$S \subseteq \bigcup_{\alpha \in I} U_\alpha.$$

> **Definition.** A **subcover** of $\mathcal{U}$ is a sub-collection $\mathcal{U}' \subseteq \mathcal{U}$ that still covers $S$. A **finite subcover** is a finite sub-collection that covers $S$.

> **Definition (Heine-Borel/Cover compactness).** $S \subseteq \mathbb{R}$ is **compact** if every open cover of $S$ has a finite subcover.

Read this as: compactness = "we can always reduce to finitely many neighbourhoods." Even though the original cover may be uncountably infinite, compactness guarantees a finite selection suffices.

---

## 7.3 Examples and Non-Examples

### Non-examples first (they teach the definition)

**$\mathbb{R}$ is not compact.** Cover $\mathbb{R} = \bigcup_{n=1}^{\infty}(-n, n)$. No finite sub-collection covers $\mathbb{R}$ (any finite union is bounded).

**$(0, 1]$ is not compact.** Cover $(0, 1] \subseteq \bigcup_{n=2}^{\infty}(1/n, 2)$. Any finite sub-collection has minimum left-endpoint $1/N > 0$, missing $(0, 1/N]$.

**$(0, 1)$ is not compact.** Same idea — the cover $\{(1/n, 1 - 1/n) : n \geq 3\}$ has no finite subcover.

### Positive examples

**$[0, 1]$ is compact.** We will prove this (Heine-Borel §7.6).

**Any finite set $F = \{x_1, \ldots, x_n\} \subseteq \mathbb{R}$ is compact.** Given an open cover, pick one $U_i$ for each $x_i$ — $n$ sets suffice.

**$[a, b]$ for any $a \leq b$:** compact (§7.6).

---

## 7.4 Compactness Implies Closed and Bounded

> **Theorem.** Every compact subset of $\mathbb{R}$ is bounded.

*Proof.* Let $K$ be compact. Cover: $K \subseteq \bigcup_{n=1}^\infty (-n, n)$. By compactness, a finite subcover $\{(-n_1, n_1), \ldots, (-n_k, n_k)\}$ exists. Let $N = \max(n_1, \ldots, n_k)$. Then $K \subseteq (-N, N)$, so $K$ is bounded. $\blacksquare$

> **Theorem.** Every compact subset of $\mathbb{R}$ is closed.

*Proof.* Let $K$ be compact; we show $\mathbb{R} \setminus K$ is open. Fix $p \notin K$. For each $x \in K$, $p \neq x$, so choose radii $r_x = |p - x|/2 > 0$. The balls $V_x = N_{r_x}(x)$ and $W_x = N_{r_x}(p)$ are disjoint. The $V_x$ cover $K$:
$$K \subseteq \bigcup_{x \in K} V_x.$$
By compactness, finitely many $V_{x_1}, \ldots, V_{x_n}$ cover $K$. Let $W = \bigcap_{i=1}^n W_{x_i}$; $W$ is open (finite intersection of opens) and contains $p$. For every $q \in W$: $q \in W_{x_i}$ for each $i$, so $q \notin V_{x_i}$ for any $i$ (by disjointness), so $q \notin K$. Hence $W \subseteq \mathbb{R} \setminus K$. This shows $p$ is an interior point of $\mathbb{R} \setminus K$, so $\mathbb{R} \setminus K$ is open. $\blacksquare$

So compact $\Rightarrow$ closed and bounded. The converse (Heine-Borel) is deeper.

---

## 7.5 Closed Subsets of Compact Sets

> **Theorem.** If $K$ is compact and $F \subseteq K$ is closed, then $F$ is compact.

*Proof.* Let $\mathcal{U}$ be an open cover of $F$. Add $\mathbb{R} \setminus F$ (open, since $F$ closed) to get an open cover of $K$. By compactness, a finite subcover exists. Drop $\mathbb{R} \setminus F$ if present — what remains is a finite subcover of $F$ from $\mathcal{U}$. $\blacksquare$

---

## 7.6 The Heine-Borel Theorem

> **Theorem (Heine-Borel).** A subset $K \subseteq \mathbb{R}$ is compact $\iff$ $K$ is closed and bounded.

### Direction $\Rightarrow$
Done in §7.4.

### Direction $\Leftarrow$ — the hard work

**Step 1.** We prove $[a, b]$ is compact.

*Proof.* Suppose $\mathcal{U}$ is an open cover of $[a, b]$ with *no* finite subcover. Bisect: at least one of $[a, (a+b)/2]$ and $[(a+b)/2, b]$ has no finite subcover (else both do and their union does). Call it $I_1$. Bisect $I_1$, pick a half $I_2$ without finite subcover. Continue:
$$[a, b] = I_0 \supseteq I_1 \supseteq I_2 \supseteq \cdots$$
with $|I_n| = (b - a)/2^n \to 0$, each $I_n$ with no finite subcover.

By nested intervals (Cantor, see [[08-sequences-introduction]] or derived from LUB), $\bigcap_n I_n = \{x_0\}$ for some $x_0 \in [a, b]$.

Now $x_0 \in U_0$ for some $U_0 \in \mathcal{U}$ (cover). Since $U_0$ is open, $\exists \varepsilon > 0$ with $(x_0 - \varepsilon, x_0 + \varepsilon) \subseteq U_0$. For $n$ large, $|I_n| < \varepsilon$ and $x_0 \in I_n$, so $I_n \subseteq (x_0 - \varepsilon, x_0 + \varepsilon) \subseteq U_0$.

But then $\{U_0\}$ is a finite subcover of $I_n$ — contradicting "no finite subcover." $\blacksquare$

**Step 2.** General closed and bounded $K \subseteq \mathbb{R}$.

Since $K$ is bounded, $K \subseteq [a, b]$ for some $a, b$. Since $K$ is closed and $[a, b]$ is compact, $K$ is compact by §7.5. $\blacksquare$

---

## 7.7 Sequential Compactness

> **Definition.** $S \subseteq \mathbb{R}$ is **sequentially compact** if every sequence in $S$ has a subsequence converging to a point of $S$.

> **Theorem.** On $\mathbb{R}$: $S$ is compact $\iff$ $S$ is sequentially compact.

### ($\Rightarrow$) Compact $\Rightarrow$ sequentially compact

*Proof sketch.* Let $K$ be compact, $(x_n)$ a sequence in $K$. Suppose for contradiction no subsequence converges to a point of $K$. Then for every $x \in K$, there is a neighbourhood $N_{\varepsilon_x}(x)$ containing only finitely many $x_n$. These neighbourhoods cover $K$; by compactness, finitely many suffice. But then only finitely many $x_n$ total — contradiction. $\blacksquare$

### ($\Leftarrow$) Sequentially compact $\Rightarrow$ compact (on $\mathbb{R}$)

This uses the Bolzano-Weierstrass theorem, which we prove fully in [[10-cauchy-sequences-completeness]] and connects to closed + bounded via:

> **Theorem (Bolzano-Weierstrass — set version).** Every bounded infinite subset of $\mathbb{R}$ has a limit point in $\mathbb{R}$.

*Proof.* Let $S$ be bounded infinite, $S \subseteq [a, b]$. Bisect $[a, b]$; one half contains infinitely many elements of $S$. Bisect that half; repeat. We get nested intervals $I_n$ of length $(b-a)/2^n$, each containing infinitely many elements of $S$. Let $\{x_0\} = \bigcap I_n$ (nested intervals). Every neighbourhood of $x_0$ contains some $I_n$, hence infinitely many points of $S$, so $x_0$ is a limit point. $\blacksquare$

If $S$ is also closed, then $x_0 \in S$. In particular: every closed and bounded set $K$ is **sequentially compact** — every sequence has a subsequence converging inside $K$. This is exactly the sequence-based Heine-Borel.

---

## 7.8 Cantor's Nested Intervals Theorem

> **Theorem (Cantor's Nested Intervals).** Let $I_1 \supseteq I_2 \supseteq I_3 \supseteq \cdots$ be a decreasing chain of non-empty closed bounded intervals in $\mathbb{R}$. Then
> $$\bigcap_{n=1}^{\infty} I_n \neq \emptyset.$$
> If furthermore $|I_n| \to 0$, the intersection is a single point.

*Proof.* Write $I_n = [a_n, b_n]$. Then $(a_n)$ is non-decreasing ($a_n \leq a_{n+1}$, since $I_{n+1} \subseteq I_n$) and bounded above by $b_1$. So $\alpha = \sup_n a_n$ exists (LUB), and $\alpha \leq b_n$ for all $n$ (each $b_n$ is an upper bound). Similarly, $\beta = \inf_n b_n \geq a_n$. Then $[\alpha, \beta] \subseteq I_n$ for all $n$, so $[\alpha, \beta] \subseteq \bigcap I_n$.

If $|I_n| = b_n - a_n \to 0$, then $\alpha = \beta$ and the intersection is a single point. $\blacksquare$

**Note.** The theorem fails without closedness (e.g., $(0, 1/n)$) or without boundedness (e.g., $[n, \infty)$). These failures are essentially *why* compactness is defined the way it is.

---

## 7.9 Compactness Summary

On $\mathbb{R}$, the following are equivalent:

1. $K$ is compact (every open cover has a finite subcover).
2. $K$ is closed and bounded.
3. $K$ is sequentially compact (every sequence has a subsequence converging in $K$).
4. Every infinite subset of $K$ has a limit point in $K$.

These equivalences collapse on $\mathbb{R}$ but diverge in general metric spaces (1) $\Rightarrow$ (3) always, but e.g., in infinite-dimensional spaces closed and bounded is weaker than compact.

---

## Worked Examples

**Example 1:** Show that $K = \{0\} \cup \{1/n : n \in \mathbb{N}\}$ is compact.

*Solution:* Closed: $0$ is the only limit point and $0 \in K$. Bounded: $K \subseteq [0, 1]$. By Heine-Borel, $K$ is compact. $\blacksquare$

Alternative (direct): Given open cover $\mathcal{U}$, pick $U_0 \in \mathcal{U}$ containing $0$. $U_0$ open, so contains $(-\varepsilon, \varepsilon)$ for some $\varepsilon > 0$. All but finitely many $1/n$ lie in $U_0$. The finitely many remaining $1/n$ are covered by finitely many $U \in \mathcal{U}$. So finite subcover exists. $\blacksquare$

---

**Example 2:** Show that $(0, 1)$ is **not** compact by exhibiting an open cover with no finite subcover.

*Solution:* Take $U_n = (1/n, 1)$ for $n \geq 2$. Then $\bigcup_{n \geq 2} U_n = (0, 1)$. A finite sub-collection has max index $N$, covering only $(1/N, 1)$, missing $(0, 1/N]$. No finite subcover. $\blacksquare$

---

**Example 3:** Let $K_n = [-n, n] \cap \{x : \sin x \geq 0\}$. Is $K_n$ compact?

*Solution:* $\{x : \sin x \geq 0\} = \bigcup_{k}[2k\pi, (2k+1)\pi]$, a union of closed intervals, hence closed. Intersection with $[-n, n]$ (closed, bounded) is closed and bounded. By Heine-Borel, $K_n$ is compact. $\blacksquare$

---

**Example 4:** Prove the intersection of a nested sequence of non-empty compact sets $K_1 \supseteq K_2 \supseteq \cdots$ in $\mathbb{R}$ is non-empty.

*Solution:* Suppose $\bigcap K_n = \emptyset$. Then $\bigcup_n (\mathbb{R} \setminus K_n) = \mathbb{R} \supseteq K_1$. The $\mathbb{R} \setminus K_n$ are open (each $K_n$ is closed), so this is an open cover of $K_1$. By compactness of $K_1$, a finite subcover: $K_1 \subseteq \bigcup_{i=1}^{m}(\mathbb{R} \setminus K_{n_i}) = \mathbb{R} \setminus \bigcap_i K_{n_i} = \mathbb{R} \setminus K_{n_{\max}}$ (nested). So $K_1 \cap K_{n_{\max}} = \emptyset$, i.e., $K_{n_{\max}} = \emptyset$ (since $K_{n_{\max}} \subseteq K_1$). Contradicts non-emptiness. $\blacksquare$

This **finite intersection property** is a restatement of compactness.

---

**Example 5:** Show that the Cantor set $C$ is compact.

*Solution:* $C = \bigcap_n C_n$ where $C_n$ is a finite union of closed intervals (so $C_n$ is closed). Intersection of closed sets is closed. $C \subseteq [0, 1]$, so bounded. Closed and bounded, hence compact by Heine-Borel. $\blacksquare$

---

## Practice Problems

1. Prove that the union of finitely many compact subsets of $\mathbb{R}$ is compact.

2. Let $A \subseteq \mathbb{R}$ be non-empty bounded. Must $\overline{A}$ be compact? Give a proof or counterexample.

3. Prove directly (without Heine-Borel) that any closed subset of $[0, 1]$ is sequentially compact.

4. Prove that $K \subseteq \mathbb{R}$ is compact iff every infinite subset of $K$ has a limit point in $K$.

5. Show that if $f : K \to \mathbb{R}$ is continuous and $K$ is compact, then $f(K)$ is compact. (Continuous image of compact is compact.) (Use the open-cover definition.)

### Solutions

**1.** Let $K_1, \ldots, K_n$ be compact. Given an open cover $\mathcal{U}$ of $\bigcup K_i$: $\mathcal{U}$ covers each $K_i$, so each $K_i$ has a finite subcover $\mathcal{U}_i \subseteq \mathcal{U}$. The union $\bigcup_i \mathcal{U}_i$ is finite and covers $\bigcup K_i$. $\blacksquare$

**2.** Yes. $A$ is bounded, so $\overline{A}$ is bounded (any upper bound of $A$ is one of $\overline{A}$: if $x = \lim a_n$ and $a_n \leq M$ then $x \leq M$). $\overline{A}$ is closed by definition of closure. Heine-Borel $\Rightarrow$ $\overline{A}$ compact. $\blacksquare$

**3.** Let $F \subseteq [0, 1]$ closed. Take a sequence $(x_n) \subseteq F$. Since $x_n \in [0, 1]$ bounded, apply Bolzano-Weierstrass (sequence version, to be proved in [[10-cauchy-sequences-completeness]]): a subsequence $(x_{n_k})$ converges to some $x \in \mathbb{R}$. Since $x_{n_k} \in F$ for all $k$ and $F$ is closed, $x \in F$. $\blacksquare$

**4.** ($\Rightarrow$) If $K$ is compact (hence closed and bounded), any infinite subset $S \subseteq K$ is bounded, so by Bolzano-Weierstrass (set version) has a limit point $x_0$ in $\mathbb{R}$. Since $x_0$ is a limit point of $S \subseteq K$ and $K$ is closed, $x_0 \in K$.

($\Leftarrow$) Suppose every infinite subset of $K$ has a limit point in $K$. We show $K$ is closed and bounded.

*Bounded:* If $K$ were unbounded, pick $x_n \in K$ with $|x_n| > n$; this infinite subset $\{x_n\}$ has no limit point in $\mathbb{R}$ (goes to $\infty$). Contradiction.

*Closed:* Let $y$ be a limit point of $K$. Choose $x_n \in K$ with $|x_n - y| < 1/n$; infinite subset has limit point in $K$, which must be $y$ (unique limit), so $y \in K$. $\blacksquare$

**5.** Let $\mathcal{V}$ be an open cover of $f(K)$ in $\mathbb{R}$. For each $V \in \mathcal{V}$, $f^{-1}(V)$ is open in $K$ (continuity). The $f^{-1}(V)$ cover $K$. By compactness, finitely many $f^{-1}(V_1), \ldots, f^{-1}(V_n)$ cover $K$. Then $V_1, \ldots, V_n$ cover $f(K)$. $\blacksquare$

Consequence: when combined with $f(K)$ bounded + attaining sup/inf, this gives the **Extreme Value Theorem** — proved in [[20-ivt-and-connectedness]].

---

## Related Topics
- [[05-open-sets-closed-sets]] — open/closed is the language of compactness
- [[08-sequences-introduction]] — setup for sequential compactness
- [[10-cauchy-sequences-completeness]] — Bolzano-Weierstrass sequence version
- [[16-continuity]] — continuity preserves compactness
- [[20-ivt-and-connectedness]] — EVT uses compactness; Heine-Cantor uses it for uniform continuity
