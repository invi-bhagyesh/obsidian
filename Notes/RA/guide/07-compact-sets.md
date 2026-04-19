# 7. Compact Sets

> **The organising principle.** **Compactness** is the single most powerful finiteness condition in analysis. It converts *local* hypotheses — which hold in a neighbourhood of each point — into *global* conclusions holding uniformly on the whole set. Three equivalent formulations make this possible:
>
> 1. **(Heine-Borel / open-cover compactness)** every open cover admits a finite subcover;
> 2. **(Sequential compactness)** every sequence has a convergent subsequence with limit in the set;
> 3. **(Bolzano-Weierstrass property)** every infinite subset has a limit point in the set.
>
> On $\mathbb{R}$ (and more generally on $\mathbb{R}^n$), compactness collapses to the simplest possible criterion: **closed and bounded**. This chapter proves this equivalence — the Heine-Borel theorem — in complete detail, derives the principal consequences, and catalogues the standard worked examples of a qualifying exam.

---

## 7.1 Why Compactness — Motivation

Compactness is the *right* hypothesis behind a remarkable number of fundamental theorems:

1. **(Extreme Value Theorem, EVT)** every continuous $f : K \to \mathbb{R}$ with $K$ compact attains its supremum and infimum on $K$;
2. **(Heine-Cantor)** every continuous $f : K \to \mathbb{R}$ with $K$ compact is *uniformly* continuous;
3. **(Dini's theorem)** a monotone sequence of continuous functions on a compact set converging pointwise to a continuous limit converges uniformly;
4. **(Arzelà-Ascoli)** a family of continuous functions on a compact set is precompact in $C(K)$ iff it is uniformly bounded and equicontinuous;
5. **(Preservation)** the continuous image of a compact set is compact; a closed subset of a compact set is compact.

All of these theorems fail on non-compact sets (typically: bounded but non-closed, or closed but unbounded). The archetype: $f(x) = 1/x$ is continuous on $(0, 1]$ (bounded, not closed) but fails to attain its supremum and fails to be uniformly continuous. The obstruction is *exactly* the missing limit point $0$.

**Motto.** Compactness = finiteness up to arbitrary refinement. What is true near each point of a compact set is true uniformly on the whole set.

---

## 7.2 Open Covers and the Cover Definition

We begin with the most conceptually important formulation.

> **Definition 7.1 (Open cover).** Let $S \subseteq \mathbb{R}$. A collection $\mathcal{U} = \{U_\alpha\}_{\alpha \in I}$ of open subsets of $\mathbb{R}$ (indexed by an arbitrary set $I$) is an **open cover** of $S$ if
> $$S \subseteq \bigcup_{\alpha \in I} U_\alpha.$$

> **Definition 7.2 (Subcover).** A **subcover** of $\mathcal{U}$ is a sub-collection $\mathcal{U}' \subseteq \mathcal{U}$ that still covers $S$. A **finite subcover** is a sub-collection $\{U_{\alpha_1}, \ldots, U_{\alpha_n}\}$ of finitely many members of $\mathcal{U}$ with $S \subseteq \bigcup_{i=1}^{n} U_{\alpha_i}$.

> **Definition 7.3 (Compact set).** $S \subseteq \mathbb{R}$ is **compact** if every open cover of $S$ has a finite subcover.

**Reading the definition.** The quantifier structure is
$$\forall \mathcal{U} \text{ open cover of } S,\ \exists \text{ finite } \mathcal{U}' \subseteq \mathcal{U}\ \text{ covering } S.$$
Compactness is a *universal* condition over all possible open covers — no matter how perverse the covering, we can always reduce to a finite sub-collection. Even if the original cover is uncountably infinite (as it is, for instance, when every point $x$ is put inside its own tiny ball $B(x, r_x)$), compactness guarantees that finitely many balls already do the job.

*Logical dual (FIP).* The negation $\neg$(compact) reads: *there exists* an open cover with *no* finite subcover. Equivalently, by taking complements, a set $S$ is compact iff it has the **finite intersection property (FIP)**: every family of closed subsets of $S$ with the property that every finite sub-family has non-empty intersection, has non-empty total intersection. We use this form in Example 4 below.

---

## 7.3 Examples and Non-Examples

Non-examples are the best way to internalise Definition 7.3. In each case we exhibit a specific open cover with no finite subcover.

### Non-examples

**(N1) $\mathbb{R}$ is not compact.** Let $\mathcal{U} = \{(-n, n) : n \in \mathbb{N}\}$. Then $\mathbb{R} = \bigcup_{n=1}^{\infty} (-n, n)$. Any finite sub-collection $\{(-n_1, n_1), \ldots, (-n_k, n_k)\}$ has union $(-N, N)$ where $N = \max_i n_i < \infty$, which is bounded and misses $N \in \mathbb{R}$. Hence no finite subcover exists.

**(N2) $(0, 1]$ is not compact.** Let $U_n = (1/n, 2)$ for $n \geq 2$. For each $x \in (0, 1]$, pick $n$ with $1/n < x$; then $x \in (1/n, 2) = U_n$. So $\mathcal{U} = \{U_n\}$ covers $(0, 1]$. A finite sub-collection has maximum index $N$, hence union $(1/N, 2)$, missing every point in $(0, 1/N]$ — non-empty since $1/(N+1) \in (0, 1/N]$. The obstruction is the missing limit point $0$.

**(N3) $(0, 1)$ is not compact.** Let $U_n = (1/n, 1 - 1/n)$ for $n \geq 3$. Clearly $(0, 1) = \bigcup_n U_n$. A finite sub-collection has maximum index $N$; its union is $(1/N, 1 - 1/N)$, missing points near both endpoints. Two obstructions: missing limit points $0$ and $1$.

### Positive examples

**(P1) Every finite set is compact.** If $F = \{x_1, \ldots, x_n\}$ and $\mathcal{U}$ covers $F$, choose one $U_i \in \mathcal{U}$ with $x_i \in U_i$ for each $i$. Then $\{U_1, \ldots, U_n\}$ is a finite subcover of size at most $n$.

**(P2) $[a, b]$ is compact for every $a \leq b$ in $\mathbb{R}$.** This is the *content* of the Heine-Borel theorem and is proved in §7.6.

**(P3) The Cantor set is compact** (worked Example 5 below).

**(P4) Any closed bounded subset of $\mathbb{R}$ is compact** (Heine-Borel, §7.6).

**Structural remark.** Observe the common failure mode of (N1), (N2), (N3): either unboundedness or a missing limit point. This is not a coincidence — Heine-Borel asserts that these are the only obstructions on $\mathbb{R}$.

---

## 7.4 Compact $\Rightarrow$ Closed and Bounded

We prove the *easy* direction of Heine-Borel first, in two theorems.

> **Theorem 7.4 (Compact $\Rightarrow$ bounded).** Every compact subset $K$ of $\mathbb{R}$ is bounded.

**Proof.**

**Step 1 — exhibit a cover by bounded sets.** Consider the nested open cover
$$\mathcal{U} = \{(-n, n) : n \in \mathbb{N}\}.$$
Each $(-n, n)$ is open in $\mathbb{R}$, and $\bigcup_{n=1}^\infty (-n, n) = \mathbb{R} \supseteq K$. So $\mathcal{U}$ is an open cover of $K$.

**Step 2 — extract a finite subcover.** By compactness of $K$, a finite subcover exists:
$$K \subseteq (-n_1, n_1) \cup \cdots \cup (-n_k, n_k) \quad \text{for some } n_1, \ldots, n_k \in \mathbb{N}.$$

**Step 3 — conclude boundedness.** Let $N = \max(n_1, \ldots, n_k)$. The intervals $(-n_i, n_i)$ are nested: the largest, $(-N, N)$, contains all the others. Hence
$$K \subseteq (-N, N),$$
so every $x \in K$ satisfies $|x| < N$. By Definition, $K$ is bounded. $\blacksquare$

*Remark.* The proof illustrates the cover philosophy: we *chose* a cover making boundedness self-evident, then used compactness to reduce to a finite (hence bounded) sub-cover.

---

> **Theorem 7.5 (Compact $\Rightarrow$ closed).** Every compact subset $K$ of $\mathbb{R}$ is closed.

**Proof.** We show that the complement $\mathbb{R} \setminus K$ is open; equivalently, that every point $p \in \mathbb{R} \setminus K$ has an open neighbourhood contained entirely in $\mathbb{R} \setminus K$. Fix $p \notin K$.

**Step 1 — disjoint neighbourhood pairs (Hausdorff separation).** For each $x \in K$, $p \neq x$, so $|p - x| > 0$. Set
$$r_x := \tfrac{1}{2} |p - x| > 0, \qquad V_x := N_{r_x}(x) = (x - r_x, x + r_x), \qquad W_x := N_{r_x}(p) = (p - r_x, p + r_x).$$
By the triangle inequality, $V_x \cap W_x = \emptyset$: if $q \in V_x \cap W_x$, then
$$|p - x| \leq |p - q| + |q - x| < r_x + r_x = |p - x|,$$
a contradiction. Thus we have a collection of *disjoint* open pairs $(V_x, W_x)$ separating $p$ from each $x \in K$.

**Step 2 — cover $K$ and extract a finite subcover.** The family $\{V_x\}_{x \in K}$ is an open cover of $K$ (since $x \in V_x$). By compactness of $K$, finitely many suffice:
$$K \subseteq V_{x_1} \cup V_{x_2} \cup \cdots \cup V_{x_n} \quad \text{for some } x_1, \ldots, x_n \in K.$$

**Step 3 — build a neighbourhood of $p$ avoiding $K$.** Set
$$W := W_{x_1} \cap W_{x_2} \cap \cdots \cap W_{x_n}.$$
This is a *finite* intersection of open sets, hence open, and it contains $p$ (since $p \in W_{x_i}$ for each $i$).

**Step 4 — verify $W \cap K = \emptyset$.** Let $q \in W$. Then $q \in W_{x_i}$ for every $i \in \{1, \ldots, n\}$. By Step 1, $W_{x_i} \cap V_{x_i} = \emptyset$, so $q \notin V_{x_i}$ for every $i$. Hence $q \notin V_{x_1} \cup \cdots \cup V_{x_n} \supseteq K$, i.e., $q \notin K$. Thus $W \subseteq \mathbb{R} \setminus K$.

**Step 5 — conclude.** We have shown: for every $p \in \mathbb{R} \setminus K$, there is an open set $W \ni p$ with $W \subseteq \mathbb{R} \setminus K$. Hence $p$ is an interior point of $\mathbb{R} \setminus K$. Since $p$ was arbitrary, $\mathbb{R} \setminus K$ is open. Therefore $K$ is closed. $\blacksquare$

*Why finite intersections were crucial.* In Step 3, the finiteness of the subcover is what lets us take the intersection $W = \bigcap W_{x_i}$ and still get an *open* set. An arbitrary intersection of open sets may fail to be open — e.g., $\bigcap_n (-1/n, 1/n) = \{0\}$. Compactness is doing its work here.

*Generalisation.* The same proof shows: in any Hausdorff topological space, compact sets are closed. The essential ingredient is the Hausdorff axiom (Step 1) plus finite subcovers (Step 2).

---

**Combined statement.** From Theorems 7.4 and 7.5:
$$K \subseteq \mathbb{R} \text{ compact} \implies K \text{ is closed and bounded}.$$
The converse (Heine-Borel, §7.6) is deeper and will require the least-upper-bound property of $\mathbb{R}$.

---

## 7.5 Closed Subsets of Compact Sets

> **Theorem 7.6 (Closed subset of compact is compact).** If $K$ is compact and $F \subseteq K$ is closed (as a subset of $\mathbb{R}$), then $F$ is compact.

**Proof.** Let $\mathcal{U} = \{U_\alpha\}_{\alpha \in I}$ be an arbitrary open cover of $F$. We manufacture a finite subcover in three steps.

**Step 1 — extend to a cover of $K$.** Since $F$ is closed in $\mathbb{R}$, its complement $\mathbb{R} \setminus F$ is open. Append it:
$$\widetilde{\mathcal{U}} := \mathcal{U} \cup \{\mathbb{R} \setminus F\}.$$
This is an open cover of $K$: indeed, for every $x \in K$, either $x \in F$ (covered by $\mathcal{U}$) or $x \notin F$ (covered by $\mathbb{R} \setminus F$).

**Step 2 — apply compactness of $K$.** By compactness, there is a finite subcover
$$K \subseteq U_{\alpha_1} \cup \cdots \cup U_{\alpha_n} \cup (\mathbb{R} \setminus F) \quad (\star)$$
(possibly without the $\mathbb{R} \setminus F$ term, if not needed).

**Step 3 — restrict to $F$.** Since every $x \in F$ satisfies $x \notin \mathbb{R} \setminus F$, the set $\mathbb{R} \setminus F$ contributes nothing to covering $F$; it can be dropped from $(\star)$ without losing the covering property for $F$:
$$F \subseteq U_{\alpha_1} \cup \cdots \cup U_{\alpha_n}.$$
This is a finite sub-collection of $\mathcal{U}$ covering $F$. Since $\mathcal{U}$ was arbitrary, $F$ is compact. $\blacksquare$

*Interpretation.* Compactness is inherited by closed subsets. Contrast: a closed subset of a non-compact set may or may not be compact — e.g., $\{1/n : n \in \mathbb{N}\}$ is not closed in $\mathbb{R}$ but $\{1/n\} \cup \{0\}$ is, and is compact.

---

## 7.6 The Heine-Borel Theorem

> **Theorem 7.7 (Heine-Borel).** Let $K \subseteq \mathbb{R}$. Then
> $$K \text{ is compact} \iff K \text{ is closed and bounded}.$$

**Proof of $(\Rightarrow)$.** This is the content of §7.4: Theorems 7.4 and 7.5 together.

**Proof of $(\Leftarrow)$.** We argue in two steps: (i) every closed bounded interval $[a, b]$ is compact; (ii) a closed bounded set sits inside such an interval and inherits compactness from Theorem 7.6.

### Step 1 — Every closed bounded interval $[a, b]$ is compact

This is the technical heart of the argument. We proceed by contradiction, using repeated bisection.

**Setup.** Suppose, for contradiction, that there exists an open cover $\mathcal{U}$ of $[a, b]$ *with no finite subcover*. Call such a set **bad**. Our assumption: $I_0 := [a, b]$ is bad.

**Step 1.1 — bisection yields a nested bad sequence.** Let $m_0 := (a + b)/2$, the midpoint. The two closed halves
$$[a, m_0], \qquad [m_0, b]$$
partition $I_0$ (up to the shared endpoint $m_0$, which is irrelevant). **Key observation:** at least one half must itself be bad. For if both $[a, m_0]$ and $[m_0, b]$ admitted finite subcovers $\mathcal{U}'_L \subseteq \mathcal{U}$ and $\mathcal{U}'_R \subseteq \mathcal{U}$, then
$$\mathcal{U}'_L \cup \mathcal{U}'_R$$
would be a finite sub-collection of $\mathcal{U}$ covering $I_0 = [a, m_0] \cup [m_0, b]$, contradicting badness of $I_0$.

Select a bad half and call it $I_1$. Continuing by induction on $n$, if $I_n$ is a bad closed interval with bisected halves, at least one half is bad; let $I_{n+1}$ be that bad half. We obtain a nested chain
$$I_0 \supseteq I_1 \supseteq I_2 \supseteq \cdots \supseteq I_n \supseteq \cdots$$
where each $I_n = [a_n, b_n]$ is a closed bounded interval, **bad**, of length
$$|I_n| = b_n - a_n = \frac{b - a}{2^n} \xrightarrow{n \to \infty} 0.$$

**Step 1.2 — extract the unique point in the intersection.** By Cantor's Nested Intervals Theorem (proved in §7.8 below as Theorem 7.10, or derived from the Least-Upper-Bound property of $\mathbb{R}$),
$$\bigcap_{n=0}^{\infty} I_n \neq \emptyset.$$
Since $|I_n| \to 0$, the intersection is a *single* point, say $\{x_0\}$.

Moreover, $x_0 \in I_0 = [a, b]$.

**Step 1.3 — locate $x_0$ inside a cover element.** Since $\mathcal{U}$ covers $[a, b] \ni x_0$, there exists $U_0 \in \mathcal{U}$ with $x_0 \in U_0$. Since $U_0$ is open in $\mathbb{R}$, there exists $\varepsilon > 0$ with
$$(x_0 - \varepsilon, x_0 + \varepsilon) \subseteq U_0.$$

**Step 1.4 — the contradiction.** Choose $n$ so large that $|I_n| = (b-a)/2^n < \varepsilon$. Such $n$ exists (Archimedean property). Since $x_0 \in I_n$ and $|I_n| < \varepsilon$, every $y \in I_n$ satisfies $|y - x_0| \leq |I_n| < \varepsilon$, so
$$I_n \subseteq (x_0 - \varepsilon, x_0 + \varepsilon) \subseteq U_0.$$
Hence $\{U_0\}$ — a sub-collection of size $1$ — is a finite subcover of $I_n$.

But $I_n$ was *bad*: no finite sub-collection of $\mathcal{U}$ covers it. Contradiction.

Therefore our assumption (that $[a, b]$ is bad) was false, and $[a, b]$ is compact. $\blacksquare$

*Where each hypothesis of Heine-Borel is used.*
- **Closedness and boundedness of $[a, b]$** $\Rightarrow$ nested bad intervals can be constructed with lengths tending to $0$.
- **Nested Intervals Theorem** $\Rightarrow$ guarantees $\bigcap I_n \ni x_0$ (this uses the LUB property, i.e., completeness of $\mathbb{R}$).
- **Openness of $U_0$** $\Rightarrow$ gives an $\varepsilon$-neighbourhood of $x_0$ inside $U_0$.
- **Archimedean property** $\Rightarrow$ lets us make $|I_n| < \varepsilon$.

Any one of these fails, Heine-Borel fails. This is why closed-and-bounded is the *exact* characterisation, and why it is false over e.g. $\mathbb{Q}$ (no LUB property): the interval $\{x \in \mathbb{Q} : 0 \leq x^2 \leq 2\}$ is closed and bounded in $\mathbb{Q}$ but non-compact.

### Step 2 — General closed and bounded $K$

**Step 2.1 — bound $K$ in an interval.** Since $K$ is bounded, there exists $M > 0$ with $|x| \leq M$ for all $x \in K$. Hence
$$K \subseteq [-M, M].$$

**Step 2.2 — invoke compactness of $[-M, M]$ and closedness of $K$.** By Step 1, $[-M, M]$ is compact. By hypothesis, $K$ is closed in $\mathbb{R}$, hence closed as a subset of $[-M, M]$. By Theorem 7.6 (closed subsets of compact are compact), $K$ is compact. $\blacksquare$

This completes the proof of Heine-Borel.

---

## 7.7 Sequential Compactness

We now relate compactness to convergent subsequences.

> **Definition 7.8 (Sequential compactness).** $S \subseteq \mathbb{R}$ is **sequentially compact** if every sequence $(x_n) \subseteq S$ has a subsequence $(x_{n_k})$ that converges to some limit $L \in S$.

> **Theorem 7.9 (Compactness = sequential compactness, on $\mathbb{R}$).** For $K \subseteq \mathbb{R}$:
> $$K \text{ is compact} \iff K \text{ is sequentially compact}.$$

We prove both directions carefully.

### Direction $(\Rightarrow)$: Compact $\Rightarrow$ sequentially compact

**Proof.** Let $K$ be compact and let $(x_n) \subseteq K$ be a sequence. We seek a convergent subsequence with limit in $K$.

**Step 1 — set up for contradiction.** Suppose no subsequence of $(x_n)$ converges to any point of $K$. Then for every $p \in K$, the point $p$ is *not* a limit of any subsequence, which implies: there exists $\varepsilon_p > 0$ such that the neighbourhood $N_{\varepsilon_p}(p)$ contains only **finitely many** terms $x_n$. (For if every neighbourhood of $p$ contained infinitely many $x_n$, we could construct a subsequence converging to $p$ by standard diagonal selection.)

**Step 2 — extract a finite subcover.** The neighbourhoods $\{N_{\varepsilon_p}(p) : p \in K\}$ form an open cover of $K$. By compactness, finitely many suffice:
$$K \subseteq N_{\varepsilon_{p_1}}(p_1) \cup \cdots \cup N_{\varepsilon_{p_m}}(p_m).$$

**Step 3 — count terms.** Each $N_{\varepsilon_{p_i}}(p_i)$ contains only finitely many $x_n$, so their union contains only finitely many $x_n$. But $(x_n) \subseteq K$ and $K$ is covered, so *all* infinitely many terms $x_n$ lie in this finite-size union. Contradiction.

Therefore, our assumption was false: some subsequence converges to a point of $K$. $\blacksquare$

*Remark on Step 1.* The implication *if every neighbourhood of $p$ contains infinitely many $x_n$, then some subsequence converges to $p$* is the routine diagonal construction: choose $n_1$ with $x_{n_1} \in N_1(p)$, then $n_2 > n_1$ with $x_{n_2} \in N_{1/2}(p)$, etc., yielding $x_{n_k} \to p$.

### Direction $(\Leftarrow)$: Sequentially compact $\Rightarrow$ compact (on $\mathbb{R}$)

**Proof via Heine-Borel.** Assume $K$ is sequentially compact. By Heine-Borel it suffices to show $K$ is closed and bounded.

**Closed.** Let $p$ be a limit point of $K$. Choose $x_n \in K$ with $|x_n - p| < 1/n$, so $x_n \to p$. By sequential compactness, some subsequence $x_{n_k} \to L \in K$. But $x_{n_k} \to p$ too (subsequences of convergent sequences inherit the limit), so $L = p$ by uniqueness of limits. Hence $p \in K$, so $K$ is closed.

**Bounded.** If $K$ were unbounded, choose $x_n \in K$ with $|x_n| > n$ for each $n$. Every subsequence of this $(x_n)$ has $|x_{n_k}| \to \infty$, so *no* subsequence converges. This contradicts sequential compactness. $\blacksquare$

### Bolzano-Weierstrass (Set Version)

The foundational tool underlying both directions is:

> **Theorem 7.10 (Bolzano-Weierstrass, set version).** Every bounded infinite subset $S \subseteq \mathbb{R}$ has a limit point in $\mathbb{R}$.

**Proof.** Since $S$ is bounded, $S \subseteq [a, b]$ for some $a < b$ in $\mathbb{R}$.

**Step 1 — nested bisection selecting infinite halves.** Bisect $[a, b]$ at the midpoint. At least one closed half contains infinitely many elements of $S$: if both halves contained only finitely many, then their union $[a, b]$ would contain only finitely many, contradicting $|S| = \infty$ (and $S \subseteq [a, b]$). Select a half with infinitely many elements and call it $I_1$. Bisect $I_1$ and repeat: pick a closed half $I_2$ with infinitely many elements. Inductively, obtain a nested chain
$$[a, b] = I_0 \supseteq I_1 \supseteq I_2 \supseteq \cdots$$
with $|I_n| = (b - a)/2^n \to 0$ and each $I_n$ containing **infinitely many** elements of $S$.

**Step 2 — identify $x_0$.** By Cantor's Nested Intervals Theorem, $\bigcap_n I_n = \{x_0\}$ for some $x_0 \in [a, b]$.

**Step 3 — $x_0$ is a limit point of $S$.** Let $\varepsilon > 0$. Choose $n$ with $|I_n| < \varepsilon$. Since $x_0 \in I_n$,
$$I_n \subseteq (x_0 - \varepsilon, x_0 + \varepsilon).$$
By Step 1, $I_n$ contains infinitely many elements of $S$. Hence $(x_0 - \varepsilon, x_0 + \varepsilon)$ contains infinitely many elements of $S$, in particular one not equal to $x_0$. This is the definition of a limit point. $\blacksquare$

**Corollary 7.11 (Sequence version).** Every bounded sequence $(x_n) \subseteq \mathbb{R}$ has a convergent subsequence.

*Proof sketch.* Either $(x_n)$ has a finite image (in which case some value repeats infinitely often — constant subsequence), or $(x_n)$ has an infinite image $S$, which is bounded and hence has a limit point $x_0$ by Theorem 7.10; a subsequence then converges to $x_0$ by the standard extraction argument.

**Consequence.** If $K$ is closed and bounded, any sequence in $K$ is bounded, hence has a convergent subsequence (Corollary 7.11) with limit $L \in \mathbb{R}$. Since $K$ is closed, $L \in K$. This directly verifies sequential compactness of closed and bounded sets — another path to Heine-Borel via sequences.

---

## 7.8 Cantor's Nested Intervals Theorem

The tool invoked in both the Heine-Borel and Bolzano-Weierstrass proofs above.

> **Theorem 7.12 (Cantor's Nested Intervals).** Let $I_1 \supseteq I_2 \supseteq I_3 \supseteq \cdots$ be a decreasing chain of non-empty closed bounded intervals in $\mathbb{R}$, where $I_n = [a_n, b_n]$. Then
> $$\bigcap_{n=1}^{\infty} I_n \neq \emptyset.$$
> Moreover, if $|I_n| = b_n - a_n \to 0$, the intersection is a single point.

**Proof.**

**Step 1 — monotonicity of endpoints.** Since $I_{n+1} \subseteq I_n$, we have $[a_{n+1}, b_{n+1}] \subseteq [a_n, b_n]$, which gives
$$a_n \leq a_{n+1} \quad \text{and} \quad b_{n+1} \leq b_n \quad \text{for all } n.$$
So $(a_n)$ is non-decreasing and $(b_n)$ is non-increasing.

**Step 2 — the endpoints sandwich.** For any $m, n \in \mathbb{N}$, WLOG $m \leq n$ (else swap). Then $I_n \subseteq I_m$, so
$$a_m \leq a_n \leq b_n \leq b_m.$$
Hence $a_m \leq b_n$ for *every* $m, n$. In particular every $b_n$ is an upper bound for $(a_m)$.

**Step 3 — apply LUB.** Since $(a_n)$ is non-decreasing and bounded above (e.g., by $b_1$), its supremum
$$\alpha := \sup_{n} a_n$$
exists in $\mathbb{R}$ by the Least-Upper-Bound property. Since every $b_n$ is an upper bound for $(a_m)$ and $\alpha$ is the *least* upper bound,
$$\alpha \leq b_n \quad \text{for every } n.$$
Symmetrically, $\beta := \inf_n b_n$ exists, and by the same reasoning $a_n \leq \beta$ for every $n$.

**Step 4 — the intersection is $[\alpha, \beta]$.** For every $n$: $a_n \leq \alpha \leq \beta \leq b_n$. So $[\alpha, \beta] \subseteq [a_n, b_n] = I_n$ for every $n$, giving $[\alpha, \beta] \subseteq \bigcap_n I_n$.

Conversely, if $x \in \bigcap_n I_n$, then $a_n \leq x \leq b_n$ for every $n$, so $\alpha \leq x \leq \beta$, i.e., $x \in [\alpha, \beta]$. Hence $\bigcap_n I_n = [\alpha, \beta]$.

In particular, $\bigcap_n I_n \neq \emptyset$.

**Step 5 — uniqueness when $|I_n| \to 0$.** If $b_n - a_n \to 0$, then $\beta - \alpha \leq b_n - a_n \to 0$, so $\beta - \alpha \leq 0$. Since $\alpha \leq \beta$, equality forces $\alpha = \beta$. Hence $\bigcap_n I_n = \{\alpha\}$, a single point. $\blacksquare$

**Failure without closedness.** The sequence $I_n = (0, 1/n)$ is a nested chain of open bounded intervals, but $\bigcap_n I_n = \emptyset$. The "missing" point $0$ is not in any $I_n$, though it is a limit of $I_n$.

**Failure without boundedness.** The sequence $I_n = [n, \infty)$ is a nested chain of closed *unbounded* intervals, but $\bigcap_n I_n = \emptyset$ — pushed to $+\infty$.

These failure modes are *exactly* the failure modes of compactness. This is why compactness encodes closed-and-bounded on $\mathbb{R}$.

---

## 7.9 Bolzano-Weierstrass in $\mathbb{R}^n$

The results above generalise seamlessly to Euclidean $n$-space.

> **Theorem 7.13 (Heine-Borel in $\mathbb{R}^n$).** $K \subseteq \mathbb{R}^n$ is compact iff $K$ is closed and bounded (in the Euclidean metric $\|\cdot\|$).

**Proof sketch.** The non-trivial direction reduces to showing $[a_1, b_1] \times \cdots \times [a_n, b_n]$ is compact. One inductive route: a product of two compact sets is compact (Tychonoff's finite case), proved by the tube lemma. An alternative route — the route we emphasise — is a direct bisection argument in $n$ dimensions, bisecting the box into $2^n$ sub-boxes at each stage.

> **Theorem 7.14 (Bolzano-Weierstrass in $\mathbb{R}^n$).** Every bounded sequence in $\mathbb{R}^n$ has a convergent subsequence.

**Proof (component-wise extraction).** Let $(x^{(k)})_{k \geq 1} \subseteq \mathbb{R}^n$ be bounded; write $x^{(k)} = (x^{(k)}_1, \ldots, x^{(k)}_n)$. Each coordinate sequence $(x^{(k)}_i)_{k \geq 1}$ is bounded in $\mathbb{R}$. Apply Bolzano-Weierstrass in $\mathbb{R}$ successively:

**Iteration 1.** Extract a subsequence $(x^{(k_j^{(1)})})$ whose first coordinate converges, $x^{(k_j^{(1)})}_1 \to L_1$.

**Iteration 2.** From that subsequence, extract a further subsequence $(x^{(k_j^{(2)})})$ whose second coordinate converges, $x^{(k_j^{(2)})}_2 \to L_2$. The first coordinate still converges (subsequences inherit convergence), $x^{(k_j^{(2)})}_1 \to L_1$.

**Iteration $n$.** After $n$ such nested extractions, obtain a subsequence with every coordinate converging: $x^{(k_j^{(n)})}_i \to L_i$ for each $i = 1, \ldots, n$. By the coordinate-wise characterisation of convergence in $\mathbb{R}^n$,
$$x^{(k_j^{(n)})} \to L := (L_1, \ldots, L_n) \in \mathbb{R}^n. \qquad \blacksquare$$

*Remark.* This coordinate-wise technique is called **nested extraction** or **diagonalisation** — it is the standard method to upgrade a $1$-dimensional result to $n$ dimensions. The method generalises further: in infinite dimensions, it underlies the Banach-Alaoglu theorem.

---

## 7.10 Compactness Summary — Equivalences on $\mathbb{R}^n$

On $\mathbb{R}^n$, the following conditions on $K$ are equivalent:

1. $K$ is **compact** (every open cover has a finite subcover).
2. $K$ is **closed and bounded** (Heine-Borel).
3. $K$ is **sequentially compact** (every sequence has a subsequence converging in $K$).
4. $K$ satisfies the **Bolzano-Weierstrass property**: every infinite subset has a limit point in $K$.
5. $K$ satisfies the **finite intersection property** (every collection of closed subsets of $K$ with the finite-intersection property has non-empty total intersection).

**In general metric spaces**, (1) $\Leftrightarrow$ (3) $\Leftrightarrow$ (4) $\Leftrightarrow$ (5) still hold, but (2) is strictly weaker than compactness. The classic counterexample:

*Example.* In the Hilbert space $\ell^2 = \{(a_n) : \sum |a_n|^2 < \infty\}$, the closed unit ball $\overline{B}(0, 1) = \{x : \|x\| \leq 1\}$ is closed and bounded. But the orthonormal basis $(e_n)_{n \geq 1}$ with $e_n = (0, \ldots, 0, 1, 0, \ldots)$ (the $1$ in the $n$-th slot) satisfies $\|e_n - e_m\| = \sqrt{2}$ for $n \neq m$. No subsequence can be Cauchy, let alone convergent. So $\overline{B}(0, 1)$ is *not* sequentially compact, hence not compact — yet it is closed and bounded. This is the characteristic failure of Heine-Borel in infinite dimensions.

---

## 7.11 Worked Examples

---

### Example 1: $K = \{0\} \cup \{1/n : n \in \mathbb{N}\}$ is compact

**Setup.** Define $K = \{0\} \cup \{1, 1/2, 1/3, 1/4, \ldots\} \subseteq \mathbb{R}$. Show $K$ is compact.

**Strategy.** Two independent proofs: (a) via Heine-Borel (verify closed and bounded); (b) directly via open covers (useful technique worth the practice).

**Computation — (a) via Heine-Borel.**

*Bounded.* $K \subseteq [0, 1]$ since $0 \in K$ and $1/n \in (0, 1]$ for $n \in \mathbb{N}$.

*Closed.* We show $\mathbb{R} \setminus K$ is open. Let $p \in \mathbb{R} \setminus K$.

- If $p < 0$: the neighbourhood $(p - |p|/2, 0)$ avoids $K$.
- If $p > 1$: the neighbourhood $(1, \infty)$ contains $p$ and avoids $K$.
- If $0 < p \leq 1$ and $p \notin K$: $p \notin \{1/n\}$, so there exist consecutive reciprocals $1/(n+1) < p < 1/n$. Let $\delta = \frac{1}{2}\min(p - 1/(n+1), 1/n - p) > 0$. The neighbourhood $(p - \delta, p + \delta)$ avoids $K$.

In each case, $p$ is an interior point of $\mathbb{R} \setminus K$, so $\mathbb{R} \setminus K$ is open and $K$ is closed.

By Heine-Borel, $K$ is compact. $\checkmark$

**Computation — (b) directly from the open-cover definition.**

Let $\mathcal{U}$ be an arbitrary open cover of $K$.

*Step 1.* Since $0 \in K$, choose $U_0 \in \mathcal{U}$ with $0 \in U_0$. $U_0$ is open, so $(-\varepsilon, \varepsilon) \subseteq U_0$ for some $\varepsilon > 0$.

*Step 2.* By the Archimedean property, there exists $N \in \mathbb{N}$ with $1/N < \varepsilon$. For every $n \geq N$: $1/n \leq 1/N < \varepsilon$, so $1/n \in (-\varepsilon, \varepsilon) \subseteq U_0$. Hence $U_0$ covers $0$ and all $1/n$ with $n \geq N$ — i.e., all but finitely many elements of $K$.

*Step 3.* The remaining finitely many elements $\{1, 1/2, \ldots, 1/(N-1)\}$ (at most $N - 1$ points) each admit a cover element: choose $U_k \in \mathcal{U}$ with $1/k \in U_k$ for $k = 1, \ldots, N - 1$.

*Step 4.* The finite sub-collection $\{U_0, U_1, \ldots, U_{N-1}\}$ covers $K$.

**Verification.** Both proofs yield the same conclusion.

**Interpretation.** The compactness of $K$ encodes the fact that the sequence $1/n$ accumulates at $0$, and this accumulation point is *already* in $K$. Compare with $K' := \{1/n : n \in \mathbb{N}\}$ without $0$: this is *not* compact — the cover $\{(1/(n+1), 1) : n \geq 1\}$ has no finite subcover (exercise; this is the same $(0, 1]$ argument as (N2) above).

$\blacksquare$

---

### Example 2: $(0, 1)$ is not compact — explicit cover

**Setup.** Exhibit an open cover of $(0, 1)$ with no finite subcover.

**Strategy.** Build a cover whose elements shrink towards $0$ (the missing limit point). We use $U_n = (1/n, 1)$.

**Computation.**

*Construct the cover.* For $n \geq 2$, let
$$U_n = (1/n, 1), \qquad \mathcal{U} = \{U_n : n \geq 2\}.$$
Each $U_n$ is open.

*Verify $\mathcal{U}$ covers $(0, 1)$.* Let $x \in (0, 1)$. By the Archimedean property, choose $n \geq 2$ with $1/n < x$. Then $x \in (1/n, 1) = U_n$. $\checkmark$

*No finite subcover.* Suppose, for contradiction, $\{U_{n_1}, \ldots, U_{n_k}\}$ is a finite sub-collection covering $(0, 1)$. Let $N = \max(n_1, \ldots, n_k) < \infty$. Since the $U_n$ are nested ($U_n \subseteq U_{n+1}$), the union of the sub-collection is just $U_N = (1/N, 1)$.

But $(0, 1) \not\subseteq (1/N, 1)$: for any $y \in (0, 1/N]$ (non-empty since $1/(N+1) \in (0, 1/N]$), $y \in (0, 1)$ yet $y \notin (1/N, 1)$. Contradiction.

**Verification.** The cover $\mathcal{U}$ is open and covers $(0, 1)$; no finite sub-collection suffices. Hence $(0, 1)$ is not compact.

**Interpretation.** The obstruction is localised at $0$. Heine-Borel confirms: $(0, 1)$ is bounded but not closed — the "almost-limit-point" $0$ is missing. Adding $0$ gives $[0, 1)$, still not compact (missing $1$). Only $[0, 1]$ is compact. $\blacksquare$

---

### Example 3: $K = [-n, n] \cap \{x : \sin x \geq 0\}$

**Setup.** Show $K = [-n, n] \cap \{x : \sin x \geq 0\}$ is compact.

**Strategy.** Express $K$ as a finite intersection of closed sets inside a closed bounded interval, then apply Heine-Borel.

**Computation.**

*Step 1 — identify the sign set.* $\sin x \geq 0$ iff $x \in [2k\pi, (2k+1)\pi]$ for some $k \in \mathbb{Z}$. Hence
$$A := \{x : \sin x \geq 0\} = \bigcup_{k \in \mathbb{Z}} [2k\pi, (2k+1)\pi].$$

*Step 2 — $A$ is closed.* Method 1: $A = \sin^{-1}([0, \infty))$. Since $\sin$ is continuous and $[0, \infty)$ is closed, $A$ is closed as the preimage of a closed set under a continuous function.

Method 2 (direct): the complement $\mathbb{R} \setminus A = \{\sin x < 0\} = \bigcup_{k \in \mathbb{Z}} ((2k+1)\pi, (2k+2)\pi)$ is a union of open intervals, hence open.

*Step 3 — $K = [-n, n] \cap A$ is closed.* Intersection of two closed sets.

*Step 4 — $K$ is bounded.* $K \subseteq [-n, n]$, so $|x| \leq n$ for $x \in K$.

*Step 5 — Heine-Borel.* $K$ is closed and bounded in $\mathbb{R}$, hence compact.

**Verification.** Each step uses only standard properties. The intersection with $[-n, n]$ renders the otherwise unbounded set $A$ into a finite union of closed intervals, hence a finite union of compact sets, which is compact (Practice Problem 1).

**Interpretation.** Compactness is preserved by *finite* intersection (intersection of a finite number of closed subsets of a compact set is closed, hence compact). $K$ concretely is a finite union of closed bounded intervals — a typical compact set on the line. $\blacksquare$

---

### Example 4: Nested compact sets have non-empty intersection

**Setup.** Let $K_1 \supseteq K_2 \supseteq K_3 \supseteq \cdots$ be a nested sequence of non-empty compact subsets of $\mathbb{R}$. Show $\bigcap_{n \geq 1} K_n \neq \emptyset$.

**Strategy.** Argue by contradiction using the *finite intersection property* formulation of compactness: an empty total intersection gives a cover of $K_1$ by open complements, which by compactness has a finite subcover, forcing some $K_n$ to be empty.

**Computation.**

*Assume for contradiction:* $\bigcap_{n \geq 1} K_n = \emptyset$.

*Step 1 — open cover of $K_1$.* Take complements:
$$\emptyset = \bigcap_{n \geq 1} K_n \implies \mathbb{R} = \mathbb{R} \setminus \bigcap_{n \geq 1} K_n = \bigcup_{n \geq 1} (\mathbb{R} \setminus K_n)$$
by De Morgan. Since each $K_n$ is compact $\Rightarrow$ closed (Theorem 7.5), each $\mathbb{R} \setminus K_n$ is open. Since $K_1 \subseteq \mathbb{R}$, the family $\{\mathbb{R} \setminus K_n : n \geq 1\}$ is an open cover of $K_1$.

*Step 2 — apply compactness of $K_1$.* A finite sub-collection covers $K_1$:
$$K_1 \subseteq (\mathbb{R} \setminus K_{n_1}) \cup \cdots \cup (\mathbb{R} \setminus K_{n_m}).$$
Using De Morgan again,
$$K_1 \subseteq \mathbb{R} \setminus (K_{n_1} \cap \cdots \cap K_{n_m}).$$

*Step 3 — exploit nesting.* Let $N := \max(n_1, \ldots, n_m)$. By nesting, $K_{n_i} \supseteq K_N$ for every $i$, so
$$K_{n_1} \cap \cdots \cap K_{n_m} \supseteq K_N.$$
Hence
$$K_1 \subseteq \mathbb{R} \setminus K_N, \quad \text{i.e.,} \quad K_1 \cap K_N = \emptyset.$$

*Step 4 — contradiction.* By nesting, $K_N \subseteq K_1$, so $K_1 \cap K_N = K_N$. Combining with Step 3: $K_N = \emptyset$. But each $K_n$ was assumed non-empty. Contradiction.

**Verification.** All steps used only the hypotheses (compactness of each $K_n$, closedness from Theorem 7.5, nesting, and non-emptiness).

**Interpretation.** This is one direction of the **finite intersection property (FIP)**: compactness of $K_1$ forces any countable descending chain of non-empty closed sub-collections to have non-empty total intersection. More generally: a family of closed subsets of a compact $K$ with the finite-intersection property has non-empty total intersection. The converse is also true and gives the FIP characterisation of compactness (§7.10, item 5). $\blacksquare$

---

### Example 5: The Cantor set is compact

**Setup.** Let $C$ be the standard Cantor middle-thirds set in $[0, 1]$, defined inductively by
$$C_0 = [0, 1], \quad C_{n+1} = \tfrac{1}{3} C_n \cup (\tfrac{2}{3} + \tfrac{1}{3} C_n), \quad C = \bigcap_{n=0}^{\infty} C_n.$$
So $C_1 = [0, 1/3] \cup [2/3, 1]$, $C_2 = [0, 1/9] \cup [2/9, 1/3] \cup [2/3, 7/9] \cup [8/9, 1]$, etc. Show $C$ is compact.

**Strategy.** Show $C$ is closed (intersection of closed sets) and bounded (subset of $[0, 1]$), then apply Heine-Borel.

**Computation.**

*Step 1 — structure of each $C_n$.* By induction: $C_n$ is a disjoint union of $2^n$ closed intervals, each of length $3^{-n}$. Base case $n = 0$: $C_0 = [0, 1]$ is one interval of length $1$. Inductive step: $C_{n+1} = \tfrac{1}{3} C_n \cup (\tfrac{2}{3} + \tfrac{1}{3} C_n)$. If $C_n$ has $2^n$ closed intervals of length $3^{-n}$, then scaling by $1/3$ produces $2^n$ intervals of length $3^{-n-1}$ in $[0, 1/3]$, and translating by $2/3$ produces another $2^n$ in $[2/3, 1]$. Total: $2^{n+1}$ closed intervals of length $3^{-n-1}$. $\checkmark$

*Step 2 — each $C_n$ is closed.* A finite union of closed intervals is closed.

*Step 3 — $C$ is closed.* $C = \bigcap_{n \geq 0} C_n$, an intersection (infinite) of closed sets, hence closed.

*Step 4 — $C$ is bounded.* $C \subseteq C_0 = [0, 1]$.

*Step 5 — Heine-Borel.* Closed and bounded $\Rightarrow$ compact.

**Verification.** The argument is short because we exploited the inductive construction. Alternative route: $C = \phi^{-1}(\{0, 2\}^{\mathbb{N}}) $ where $\phi$ is the base-$3$ representation — $C$ corresponds to sequences of $0$s and $2$s.

**Interpretation.** The Cantor set is a canonical compact set with remarkable additional features:

- **Uncountable** (bijects with $\{0, 2\}^{\mathbb{N}} \cong \{0, 1\}^{\mathbb{N}} \cong [0, 1]$ via binary expansions modulo a countable set).
- **Totally disconnected** (the only connected subsets are singletons).
- **Perfect** (closed with no isolated points — every point is a limit point).
- **Nowhere dense** (its closure has empty interior).
- **Measure zero** (the total length removed is $\sum_{n=1}^{\infty} 2^{n-1}/3^n = 1$).

A compact, perfect, nowhere-dense, uncountable, measure-zero set — all at once. The Cantor set is one of the most important compact sets in all of analysis, appearing in fractal geometry, ergodic theory, and topology. $\blacksquare$

---

## 7.12 Practice Problems

1. Prove that the union of finitely many compact subsets of $\mathbb{R}$ is compact. What happens for a countably infinite union?

2. Let $A \subseteq \mathbb{R}$ be non-empty and bounded. Must the closure $\overline{A}$ be compact? Give a full proof or a counterexample.

3. Prove directly — without invoking Heine-Borel — that every closed subset of $[0, 1]$ is sequentially compact.

4. Prove that $K \subseteq \mathbb{R}$ is compact iff every infinite subset of $K$ has a limit point in $K$. (The Bolzano-Weierstrass characterisation.)

5. **(Continuous image of compact is compact.)** Let $f : K \to \mathbb{R}$ be continuous and $K \subseteq \mathbb{R}$ compact. Prove that $f(K)$ is compact. Use the open-cover definition. Deduce the Extreme Value Theorem.

6. Let $K$ be compact and $U$ open in $\mathbb{R}$ with $K \subseteq U$. Show that there exists $\delta > 0$ such that the $\delta$-neighbourhood $K_\delta := \{x \in \mathbb{R} : \operatorname{dist}(x, K) < \delta\}$ satisfies $K_\delta \subseteq U$. (This is the *Lebesgue covering lemma* in the special case $\mathcal{U} = \{U\}$.)

7. Give an example of a bounded sequence in $\mathbb{R}^n$ that does *not* converge, but every subsequence that converges does so to the same limit.

---

### Solutions

---

**Solution 1.** Finite union of compacts is compact; countable union need not be.

**Setup.** Let $K_1, K_2, \ldots, K_n$ be compact subsets of $\mathbb{R}$ and let $K := K_1 \cup \cdots \cup K_n$.

**Strategy.** Given an open cover of $K$, extract a finite subcover from each $K_i$ separately, then merge.

**Computation.**

*Step 1.* Let $\mathcal{U}$ be an arbitrary open cover of $K$. Since $K_i \subseteq K$ for each $i$, $\mathcal{U}$ also covers each $K_i$.

*Step 2.* By compactness of $K_i$, extract a finite subcover $\mathcal{U}_i \subseteq \mathcal{U}$ with $K_i \subseteq \bigcup \mathcal{U}_i$.

*Step 3.* Form the union $\widetilde{\mathcal{U}} := \mathcal{U}_1 \cup \mathcal{U}_2 \cup \cdots \cup \mathcal{U}_n$. A finite union of finite sets is finite.

*Step 4.* $\widetilde{\mathcal{U}} \subseteq \mathcal{U}$ and covers $K$:
$$K = \bigcup_{i=1}^n K_i \subseteq \bigcup_{i=1}^n \left(\bigcup \mathcal{U}_i\right) = \bigcup \widetilde{\mathcal{U}}.$$

**Verification.** $\widetilde{\mathcal{U}}$ is a finite sub-collection of $\mathcal{U}$ covering $K$. Since $\mathcal{U}$ was arbitrary, $K$ is compact.

**Counterexample for countable union.** $K_n = \{n\}$ is a singleton, hence compact for each $n$. But $\bigcup_n K_n = \mathbb{N}$ is unbounded, hence non-compact (by Theorem 7.4). $\blacksquare$

---

**Solution 2.** Closure of a bounded set is compact.

**Setup.** $A \subseteq \mathbb{R}$ non-empty and bounded. Claim: $\overline{A}$ is compact.

**Strategy.** Apply Heine-Borel: show $\overline{A}$ is closed and bounded.

**Computation.**

*Closed.* By definition (or standard topology): $\overline{A}$ is the smallest closed set containing $A$, in particular closed.

*Bounded.* $A$ is bounded, so there exist $m \leq M \in \mathbb{R}$ with $A \subseteq [m, M]$. The interval $[m, M]$ is closed, so $\overline{A} \subseteq \overline{[m, M]} = [m, M]$. Hence $\overline{A}$ is bounded.

*Alternative verification via sequences.* If $x \in \overline{A}$, there is a sequence $a_n \to x$ with $a_n \in A$; since $m \leq a_n \leq M$ and limits preserve non-strict inequalities, $m \leq x \leq M$.

*Heine-Borel.* $\overline{A}$ is closed and bounded $\Rightarrow$ compact.

**Verification.** Both arguments are legitimate; the second is more elementary (avoids citing "closure of closed is closed" as a black box).

**Interpretation.** Given any bounded set $A$, we can always "compactify" by taking the closure. This is the analyst's standard trick: to invoke compactness-based theorems (EVT, uniform continuity, etc.), replace $A$ by $\overline{A}$ if needed. $\blacksquare$

---

**Solution 3.** Closed subsets of $[0, 1]$ are sequentially compact — direct proof.

**Setup.** Let $F \subseteq [0, 1]$ be closed. Show that every sequence in $F$ has a subsequence converging to a point of $F$.

**Strategy.** Bisection argument specialised to $[0, 1]$: find nested closed halves containing infinitely many terms, then extract via the Nested Intervals Theorem. Do *not* invoke Heine-Borel.

**Computation.**

Let $(x_n) \subseteq F \subseteq [0, 1]$.

*Step 1 — nested bisection.* Set $I_0 := [0, 1]$. Since $(x_n)$ has infinitely many terms in $I_0$, at least one of $[0, 1/2]$ and $[1/2, 1]$ contains infinitely many $x_n$. Call that half $I_1$. Proceeding by induction: if $I_k = [a_k, b_k]$ contains infinitely many $x_n$, at least one of the two halves does; call it $I_{k+1}$. We obtain
$$I_0 \supseteq I_1 \supseteq I_2 \supseteq \cdots, \qquad |I_k| = 2^{-k}, \qquad \text{each } I_k \ni \text{ infinitely many } x_n.$$

*Step 2 — Nested Intervals Theorem.* $\bigcap_k I_k = \{L\}$ for a unique $L \in [0, 1]$.

*Step 3 — extract a subsequence.* Choose $n_1 \in \mathbb{N}$ with $x_{n_1} \in I_1$. Suppose $n_1 < n_2 < \cdots < n_k$ have been chosen with $x_{n_j} \in I_j$. Since $I_{k+1}$ contains infinitely many $x_n$, we may pick $n_{k+1} > n_k$ with $x_{n_{k+1}} \in I_{k+1}$. The resulting $(x_{n_k})_{k \geq 1}$ is a subsequence.

*Step 4 — convergence.* For every $k$: $x_{n_k}, L \in I_k$, so
$$|x_{n_k} - L| \leq |I_k| = 2^{-k} \to 0.$$
Hence $x_{n_k} \to L$.

*Step 5 — limit in $F$.* Each $x_{n_k} \in F$ and $F$ is closed; limits of convergent sequences in a closed set remain in the set. So $L \in F$.

**Verification.** Used only: bisection, the Nested Intervals Theorem (which itself uses only the LUB property), and closedness of $F$. No invocation of Heine-Borel.

**Interpretation.** This is essentially the route by which sequential compactness is proved in more general settings (compact metric spaces = sequentially compact, via total boundedness plus completeness). $\blacksquare$

---

**Solution 4.** $K$ compact $\iff$ every infinite subset of $K$ has a limit point in $K$.

**Setup.** $K \subseteq \mathbb{R}$. Prove both directions of the Bolzano-Weierstrass characterisation.

**Strategy.** $(\Rightarrow)$: combine Heine-Borel with Theorem 7.10 (Bolzano-Weierstrass set version) and closedness. $(\Leftarrow)$: contrapose each of "bounded" and "closed" using the hypothesis.

**Computation.**

**Direction $(\Rightarrow)$.** Assume $K$ is compact, so (by Theorems 7.4, 7.5) closed and bounded. Let $S \subseteq K$ be infinite. Then $S$ is bounded (as a subset of the bounded $K$). By Theorem 7.10, $S$ has a limit point $L \in \mathbb{R}$. Every limit point of $S \subseteq K$ is in particular a limit point of $K$ (any neighbourhood of $L$ meets $S \setminus \{L\} \subseteq K \setminus \{L\}$). Since $K$ is closed, $L \in K$.

Hence every infinite subset of $K$ has a limit point in $K$.

**Direction $(\Leftarrow)$.** Assume every infinite subset of $K$ has a limit point in $K$. We prove $K$ is closed and bounded, then apply Heine-Borel.

*$K$ is bounded.* Contrapose: if $K$ is unbounded, choose $x_n \in K$ with $|x_n| > n$ for each $n \in \mathbb{N}$. By construction $(x_n)$ has infinitely many *distinct* terms (since $|x_n| > n$ forces $x_{n+1} \neq x_n$ eventually, and in fact all terms can be selected distinct), so $S := \{x_n : n \in \mathbb{N}\}$ is an infinite subset of $K$. For any $L \in \mathbb{R}$, at most finitely many $x_n$ lie in $(L - 1, L + 1)$ (only those with $|x_n| \leq |L| + 1$, a finite collection). Hence $L$ is *not* a limit point of $S$. So $S$ has no limit point in $\mathbb{R}$, a fortiori none in $K$. Contradiction.

*$K$ is closed.* Let $y$ be a limit point of $K$ in $\mathbb{R}$. Choose $x_n \in K$ with $0 < |x_n - y| < 1/n$ for each $n$ (possible because $y$ is a limit point). The set $S := \{x_n\}$ is infinite (since $|x_n - y| \to 0$ strictly, so the $x_n$ are eventually distinct). By hypothesis, $S$ has a limit point $L \in K$.

We claim $L = y$. Indeed, $x_n \to y$ in $\mathbb{R}$ (from the bound $|x_n - y| < 1/n$). Every limit point of $S$ must then equal $y$: if $L'$ is a limit point of $S$, there is a subsequence $(x_{n_k}) \to L'$; but $(x_{n_k}) \to y$ also (inherited), so $L' = y$ by uniqueness of limits.

Thus $y = L \in K$. So $K$ contains all its limit points, i.e., $K$ is closed.

*Heine-Borel.* Closed and bounded $\Rightarrow$ compact.

**Verification.** Both directions completed. The deep content is in the set-version of Bolzano-Weierstrass (Theorem 7.10), which is used in $(\Rightarrow)$. In $(\Leftarrow)$, we only need elementary sequence arguments. $\blacksquare$

---

**Solution 5.** Continuous image of compact is compact; EVT.

**Setup.** $f : K \to \mathbb{R}$ continuous, $K \subseteq \mathbb{R}$ compact. Show $f(K) \subseteq \mathbb{R}$ is compact. Deduce EVT.

**Strategy.** Pull an open cover of $f(K)$ back through $f^{-1}$ to an open cover of $K$; use compactness of $K$; push forward.

**Computation.**

**Step 1 — pull-back.** Let $\mathcal{V} = \{V_\alpha\}_{\alpha \in I}$ be an open cover of $f(K)$ in $\mathbb{R}$. For each $\alpha$, consider the preimage
$$f^{-1}(V_\alpha) = \{x \in K : f(x) \in V_\alpha\}.$$
By continuity of $f$, each $f^{-1}(V_\alpha)$ is open in $K$ (relative topology). Explicitly, $f^{-1}(V_\alpha) = K \cap W_\alpha$ for some $W_\alpha$ open in $\mathbb{R}$.

**Step 2 — $\{f^{-1}(V_\alpha)\}$ covers $K$.** Given $x \in K$: $f(x) \in f(K) \subseteq \bigcup_\alpha V_\alpha$, so $f(x) \in V_\alpha$ for some $\alpha$, i.e., $x \in f^{-1}(V_\alpha)$.

**Step 3 — compactness of $K$.** The family $\{W_\alpha \cap K\}$ is an open cover of $K$, so there is a finite subcover. Equivalently, there exist $\alpha_1, \ldots, \alpha_n$ with
$$K \subseteq f^{-1}(V_{\alpha_1}) \cup \cdots \cup f^{-1}(V_{\alpha_n}).$$

**Step 4 — push-forward.** Apply $f$:
$$f(K) \subseteq f\!\left(\bigcup_{i=1}^n f^{-1}(V_{\alpha_i})\right) = \bigcup_{i=1}^n f(f^{-1}(V_{\alpha_i})) \subseteq \bigcup_{i=1}^n V_{\alpha_i}.$$
(The inclusion $f(f^{-1}(V)) \subseteq V$ holds for any function and any set $V$.)

**Step 5.** Hence $\{V_{\alpha_1}, \ldots, V_{\alpha_n}\}$ is a finite sub-collection of $\mathcal{V}$ covering $f(K)$. Since $\mathcal{V}$ was arbitrary, $f(K)$ is compact.

**Corollary — Extreme Value Theorem.** Let $f : K \to \mathbb{R}$ be continuous on a non-empty compact $K \subseteq \mathbb{R}$. By the above, $f(K)$ is compact, hence closed and bounded (Theorems 7.4, 7.5).

- *Boundedness of $f(K)$* $\Rightarrow$ $M := \sup f(K)$ and $m := \inf f(K)$ exist in $\mathbb{R}$.
- *Closedness of $f(K)$* $\Rightarrow$ $M, m \in f(K)$. (The supremum of a set is always a limit point or an element; in a closed set, it is an element.) So there exist $x_1, x_2 \in K$ with $f(x_1) = m$ and $f(x_2) = M$.

Hence $f$ attains its minimum and maximum on $K$. $\blacksquare$

**Verification.** All preimage manipulations are standard. The formula $f(f^{-1}(V)) \subseteq V$ with equality $f(f^{-1}(V \cap \operatorname{Im} f)) = V \cap \operatorname{Im} f$ justifies Step 4.

**Interpretation.** Compactness is the *essential* ingredient of EVT. Without it (e.g., $f(x) = x$ on $(0, 1)$), the sup/inf need not be attained. This result generalises: continuous maps between topological spaces preserve compactness. $\blacksquare$

---

**Solution 6.** Thickening a compact set inside an open set (Lebesgue-style lemma).

**Setup.** $K$ compact, $U$ open, $K \subseteq U$. Show: $\exists \delta > 0$ with $K_\delta = \{x : \operatorname{dist}(x, K) < \delta\} \subseteq U$.

**Strategy.** Define $g(x) = \operatorname{dist}(x, \mathbb{R} \setminus U)$ (distance to the complement of $U$). Continuity of $g$ plus compactness of $K$ yield a positive minimum $\delta$.

**Computation.**

*Step 1 — set up $g$.* Let $g : \mathbb{R} \to \mathbb{R}$ be $g(x) = \operatorname{dist}(x, \mathbb{R} \setminus U) = \inf_{y \notin U} |x - y|$.

If $U = \mathbb{R}$, then $\mathbb{R} \setminus U = \emptyset$ and take $\delta = 1$ (say). Assume henceforth $U \neq \mathbb{R}$.

*Step 2 — $g$ is continuous.* Standard fact: $|g(x) - g(x')| \leq |x - x'|$ (1-Lipschitz), from the reverse triangle inequality for distance functions. In particular, $g$ is continuous on $\mathbb{R}$.

*Step 3 — $g$ is positive on $K$.* For $x \in K \subseteq U$: $x \notin \mathbb{R} \setminus U$. Since $\mathbb{R} \setminus U$ is closed (as complement of open), $g(x) = \operatorname{dist}(x, \mathbb{R} \setminus U) > 0$ iff $x \notin \mathbb{R} \setminus U$. (A point has distance $0$ to a closed set iff it belongs to it.) Hence $g(x) > 0$ for every $x \in K$.

*Step 4 — EVT on $K$.* $K$ is compact and $g|_K$ is continuous, so by Solution 5, $g|_K$ attains its minimum:
$$\delta := \min_{x \in K} g(x) = g(x_0) > 0 \quad \text{for some } x_0 \in K.$$
Now take this $\delta$.

*Step 5 — verify $K_\delta \subseteq U$.* Let $y \in K_\delta$, so $\operatorname{dist}(y, K) < \delta$. Pick $x \in K$ with $|y - x| < \delta$.

Suppose for contradiction $y \notin U$, i.e., $y \in \mathbb{R} \setminus U$. Then
$$g(x) = \operatorname{dist}(x, \mathbb{R} \setminus U) \leq |x - y| < \delta = \min_{K} g \leq g(x),$$
a contradiction. Hence $y \in U$.

**Verification.** $\delta > 0$ is guaranteed by compactness of $K$ plus continuity of $g$ (EVT); the rest is distance-function manipulation.

**Interpretation.** This is a specialised form of the **Lebesgue covering lemma**: if $\{U_\alpha\}$ is an open cover of a compact $K$, there exists $\delta > 0$ (a *Lebesgue number*) such that every ball $B(x, \delta)$ with $x \in K$ lies inside some $U_\alpha$. The Lebesgue number lemma is indispensable in proofs of uniform continuity (Heine-Cantor) and in topology (lifting properties for covering spaces). $\blacksquare$

---

**Solution 7.** Bounded non-convergent sequence with all convergent subsequences sharing a limit.

**Setup.** Find $(x_n) \subseteq \mathbb{R}^n$ bounded, non-convergent, yet whenever a subsequence $(x_{n_k})$ converges, its limit is a fixed $L$.

**Strategy.** Take a sequence with two values repeated, one going to infinity slowly… actually bounded. So alternate: put most terms near a fixed $L$, but periodically "bounce" to a different value, in a way that keeps the sequence bounded but disables convergence, yet every subsequence that converges must converge to $L$. The trick: let the "bouncing" subsequence itself diverge.

**Computation.**

*Example.* In $\mathbb{R}$, set
$$x_n = \begin{cases} 0 & \text{if } n \text{ is not a perfect square} \\ 1 & \text{if } n \text{ is a perfect square, but $\sqrt n$ is even} \\ -1 & \text{if } n \text{ is a perfect square, but $\sqrt n$ is odd} \end{cases}$$

Actually, let's take a cleaner example:
$$x_n = \begin{cases} 1/\sqrt n & \text{if } n \text{ is not a perfect square} \\ 1 & \text{if } n \text{ is a perfect square} \end{cases}$$

*Bounded:* $|x_n| \leq 1$ for all $n$.

*Non-convergent:* $(x_n)$ has subsequence $1, 1, 1, \ldots$ (the perfect-square indices) with limit $1$, and subsequence $1/\sqrt{2}, 1/\sqrt{3}, 1/\sqrt{5}, \ldots$ with limit $0$. Two different subsequence limits, so $x_n \not\to$ anything.

Hmm — this example has *two* subsequential limits, contradicting the requirement. Let me correct.

*Correct example.* The requirement is *every convergent subsequence* has the same limit. For a bounded sequence, this is equivalent (by Bolzano-Weierstrass) to having a unique subsequential limit, which forces convergence of the whole sequence to that limit. So the hypothesis is self-contradictory in $\mathbb{R}^n$: **no such example exists**.

*Proof.* Let $(x_n) \subseteq \mathbb{R}^n$ be bounded with all convergent subsequences having limit $L$. Suppose for contradiction $x_n \not\to L$. Then there exists $\varepsilon > 0$ and a subsequence $(x_{n_k})$ with $\|x_{n_k} - L\| \geq \varepsilon$ for all $k$. The subsequence $(x_{n_k})$ is still bounded, so by Bolzano-Weierstrass in $\mathbb{R}^n$ (Theorem 7.14), a sub-subsequence $(x_{n_{k_j}}) \to L'$ for some $L' \in \mathbb{R}^n$. Since $\|x_{n_{k_j}} - L\| \geq \varepsilon$ for all $j$, taking $j \to \infty$: $\|L' - L\| \geq \varepsilon$, so $L' \neq L$. But by hypothesis every convergent subsequence has limit $L$. Contradiction.

Hence $x_n \to L$, and the sequence is convergent, contradicting "non-convergent". No such sequence exists.

**Verification.** The argument uses only Bolzano-Weierstrass in $\mathbb{R}^n$ (Theorem 7.14) plus the definition of convergence. The conclusion is a standard exam lemma:

> **Fact.** If $(x_n)$ is bounded in $\mathbb{R}^n$ and all convergent subsequences share a single limit $L$, then $x_n \to L$.

**Interpretation.** This is a useful corollary of Bolzano-Weierstrass: uniqueness of subsequential limits for a bounded sequence forces convergence. The hypothesis "bounded" is essential — unbounded sequences may have a unique finite subsequential limit while diverging (e.g., $x_n = 0$ for $n$ odd, $x_n = n$ for $n$ even: only $0$ is a subsequential limit, but the even-indexed terms escape to $\infty$). $\blacksquare$

---

## 7.13 Cross-References

**Previous material relied upon:**
- [[05-open-sets-closed-sets]] — open / closed sets; closure; limit points (the language of compactness).
- [[03-supremum-and-infimum]] (or equivalent) — LUB property of $\mathbb{R}$, used throughout (especially Cantor's Nested Intervals).

**Subsequent material building on this chapter:**
- [[08-sequences-introduction]] — sequence machinery supporting sequential compactness.
- [[10-cauchy-sequences-completeness]] — Bolzano-Weierstrass sequence version in full; completeness of $\mathbb{R}$.
- [[16-continuity]] — continuity and compactness: $f(K)$ compact when $K$ compact.
- [[20-ivt-and-connectedness]] — Extreme Value Theorem and Heine-Cantor (uniform continuity).
- [[25-function-spaces]] — Arzelà-Ascoli: compact subsets of $C(K)$ via uniform boundedness and equicontinuity.

**Qualifying-exam essentials from this chapter:**
- Statement **and** proof of Heine-Borel in $\mathbb{R}^n$.
- Two directions of compactness $\Leftrightarrow$ sequential compactness.
- Bolzano-Weierstrass (both set and sequence versions).
- Finite intersection property.
- Continuous image of compact is compact $\Rightarrow$ Extreme Value Theorem.
- Closed subset of compact is compact.
- Compactness in infinite-dimensional Banach spaces: failure of Heine-Borel; Arzelà-Ascoli as a substitute.
