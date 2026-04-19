# 10. Cauchy Sequences and Completeness of $\mathbb{R}$

> **The completeness chapter.** The Cauchy criterion captures convergence *intrinsically* — without naming a limit in advance. In $\mathbb{R}$, a sequence converges if and only if it is Cauchy, and this equivalence is one of several mutually equivalent formulations of **completeness** (alongside LUB, Monotone Convergence, Bolzano–Weierstrass, and Nested Intervals).
>
> This chapter states the Cauchy definition with pitfalls, proves the foundational trio (convergent $\Rightarrow$ Cauchy, Cauchy $\Rightarrow$ bounded, Cauchy $\Rightarrow$ convergent), proves Bolzano–Weierstrass two ways, establishes the full equivalence of the five forms of completeness, derives Cauchy's classical limit theorems and the Banach fixed-point principle, and closes with extended worked examples and solutions at qualifying-exam depth.

---

## 10.1 Why Cauchy?

The $\varepsilon$-$N$ definition of convergence
$$x_n \to L \iff \forall\,\varepsilon > 0,\ \exists N,\ \forall n \geq N,\ |x_n - L| < \varepsilon$$
requires a candidate limit $L$ upfront. But in many problems the limit is *exactly what we are trying to locate*:

- partial sums $s_n = \sum_{k=1}^n 1/k^2$ — the limit $\pi^2/6$ is non-elementary;
- recursions such as $x_{n+1} = \sqrt{2 + x_n}$ — the limit is a fixed point we solve for *after* showing convergence;
- decimal expansions of irrationals — the limit is, by definition, the object we are constructing.

We need an **intrinsic** criterion: one that inspects only the sequence itself, never referencing an external limit.

> **The Cauchy criterion (informal).** A sequence converges iff its terms get arbitrarily close *to each other*.

In $\mathbb{R}$, this intrinsic mutual-closeness condition is equivalent to convergence — a property called **Cauchy completeness**, which turns out to be *logically equivalent* to the LUB axiom. Thus completeness has two faces:

- **Order-theoretic face (LUB):** every non-empty bounded-above subset has a supremum.
- **Metric face (Cauchy):** every Cauchy sequence converges.

In $\mathbb{Q}$ both fail simultaneously ($\{q \in \mathbb{Q} : q^2 < 2\}$ has no rational supremum, and the decimal approximations of $\sqrt{2}$ are Cauchy with no rational limit). In $\mathbb{R}$ both hold. In general metric spaces one can have Cauchy completeness without any order structure — the right generalisation is the *Cauchy* one, which is why it dominates higher analysis.

---

## 10.2 Definition

> **Definition 10.1 (Cauchy sequence).** A sequence $(x_n)_{n \geq 1}$ of real numbers is a **Cauchy sequence** if
> $$\forall\,\varepsilon > 0,\ \exists N \in \mathbb{N}\ \text{such that}\ \forall\,m, n \geq N,\ |x_m - x_n| < \varepsilon.$$

**Parsing.** Read left to right:

1. *No matter how small* a tolerance $\varepsilon > 0$ you demand,
2. you can find an index $N$ — a "tail starting point" — such that
3. *every pair* $(x_m, x_n)$ with both indices past $N$ lies within $\varepsilon$ of each other.

The *universal* quantifier on pairs is essential. It is *not* enough for consecutive terms to be close: it must be *all* pairs from the tail.

**Equivalent forms (all used in practice).** The following are all equivalent to Definition 10.1:

(a) $\forall\,\varepsilon > 0,\ \exists N,\ \forall n \geq N,\ \forall p \geq 0 : |x_{n+p} - x_n| < \varepsilon.$

(b) $\lim_{m,n \to \infty} |x_m - x_n| = 0$ (double limit; for every $\varepsilon$ there is $N$ beyond which the "matrix of pairwise differences" is uniformly small).

(c) For every $\varepsilon > 0$, there exists $N$ such that $\operatorname{diam}(\{x_n, x_{n+1}, \dots\}) < \varepsilon$ — i.e., the *tail diameters* tend to $0$.

Each form is useful in different proofs: (a) is handy when you parametrise by $(n, p)$; (b) is convenient when chaining with the triangle inequality; (c) is the cleanest topological statement.

---

### Warning — adjacent-differences are not enough

A seductive but **wrong** weakening: "$|x_{n+1} - x_n| \to 0$ implies Cauchy." This fails.

**Counterexample: the harmonic partial sums.** Let $x_n = \sum_{k=1}^n 1/k$.

- Adjacent differences: $|x_{n+1} - x_n| = 1/(n+1) \to 0$. ✓
- But $(x_n)$ is *not* Cauchy. For any $n$, the block $|x_{2n} - x_n| = \sum_{k=n+1}^{2n} 1/k \geq n \cdot (1/(2n)) = 1/2$, so pairs $m = 2n$, $n$ cannot be forced within $1/2$ no matter how large $N$ is. The tail diameters stay bounded below by $1/2$.

**Moral.** Cauchy-ness requires *all* pairs $(x_m, x_n)$ past $N$ to be close, not just neighbours. Telescoping arguments that control only $|x_{n+1} - x_n|$ can diverge (harmonic) or converge (alternating, with sign cancellation), depending on structure. The right generalisation is: sequences with $\sum |x_{n+1} - x_n| < \infty$ *are* Cauchy (by triangle-inequality on tails).

---

## 10.3 Convergent $\Rightarrow$ Cauchy

> **Theorem 10.2.** Every convergent sequence in $\mathbb{R}$ is Cauchy.

**Proof.**

*Setup.* Suppose $x_n \to L$ for some $L \in \mathbb{R}$. Fix $\varepsilon > 0$; we must produce $N$ so that $|x_m - x_n| < \varepsilon$ for all $m, n \geq N$.

*Step 1: Halve the tolerance.* Apply the $\varepsilon$-$N$ definition of $x_n \to L$ with tolerance $\varepsilon/2$: there exists $N$ such that
$$n \geq N \implies |x_n - L| < \varepsilon/2. \tag{$\ast$}$$

*Step 2: Compare two tail terms via $L$.* For any $m, n \geq N$, insert and subtract $L$ and apply the triangle inequality:
$$|x_m - x_n| = |(x_m - L) - (x_n - L)| \leq |x_m - L| + |x_n - L|. \tag{$\dagger$}$$

*Step 3: Apply ($\ast$).* Since both $m, n \geq N$, both terms in ($\dagger$) are less than $\varepsilon/2$:
$$|x_m - x_n| < \varepsilon/2 + \varepsilon/2 = \varepsilon.$$

*Conclusion.* For every $\varepsilon > 0$ we produced an $N$ as required, so $(x_n)$ is Cauchy. $\blacksquare$

**Remark (the $\varepsilon/2$ trick).** The "halve the budget" technique is ubiquitous: whenever you want two error terms to combine to $< \varepsilon$, apply each hypothesis with tolerance $\varepsilon/2$. This chapter will use it a dozen times; it is a reflex worth internalising.

**Remark (works in any metric space).** This direction holds in every metric space $(X, d)$: convergent $\Rightarrow$ Cauchy. Only the converse is special (and defines *completeness*).

---

## 10.4 Cauchy $\Rightarrow$ Bounded

> **Theorem 10.3.** Every Cauchy sequence in $\mathbb{R}$ is bounded.

**Proof.**

*Setup.* Let $(x_n)$ be Cauchy. We seek $M > 0$ with $|x_n| \leq M$ for all $n \geq 1$.

*Step 1: Fix a convenient tolerance.* Apply the Cauchy condition with $\varepsilon = 1$ (a *numerical* choice, not a variable quantifier): there exists $N \in \mathbb{N}$ such that
$$m, n \geq N \implies |x_m - x_n| < 1. \tag{$\ast$}$$

*Step 2: Bound the tail using a fixed anchor.* Take $n = N$ in ($\ast$): for every $m \geq N$,
$$|x_m - x_N| < 1 \implies |x_m| \leq |x_m - x_N| + |x_N| < 1 + |x_N|.$$

So for all $m \geq N$, $|x_m| < |x_N| + 1$ — the tail is bounded.

*Step 3: Handle the finite head.* The terms $x_1, x_2, \dots, x_{N-1}$ form a finite set, hence have a finite maximum absolute value. Define
$$M \;=\; \max\{|x_1|,\ |x_2|,\ \dots,\ |x_{N-1}|,\ |x_N| + 1\}.$$

*Step 4: Combine.* For $n < N$: $|x_n| \leq \max\{|x_1|, \dots, |x_{N-1}|\} \leq M$. For $n \geq N$: $|x_n| < |x_N| + 1 \leq M$. Hence $|x_n| \leq M$ for all $n \geq 1$. $\blacksquare$

**Interpretive remark.** The proof has the *same shape* as "convergent $\Rightarrow$ bounded" from [[09-convergence-and-limits]]: pin a representative ($x_N$ here, $L$ there) and control the tail by the Cauchy/convergence condition; then pad by the finite head. The only structural input from Cauchy is "eventually nearby anchor $x_N$" — the hypothesis of a *limit* is never used, which is why Theorem 10.3 works even before we know the sequence converges.

---

## 10.5 Bolzano–Weierstrass Theorem

This theorem is the **engine** of the Cauchy $\Rightarrow$ convergent implication, and a central theorem in its own right. We give two proofs.

> **Theorem 10.4 (Bolzano–Weierstrass, sequence version).** Every bounded sequence of real numbers has a convergent subsequence.

### Proof A — bisection (nested intervals)

*Setup.* Let $(x_n)$ be a bounded sequence: there exists $M > 0$ with $x_n \in [-M, M]$ for all $n$. Set $I_0 := [-M, M]$.

*Step 1: Recursive bisection.* We construct a nested sequence $I_0 \supseteq I_1 \supseteq I_2 \supseteq \cdots$ of closed intervals, each containing $x_n$ for infinitely many indices $n$, with $|I_k| = 2M/2^k$.

*Base:* $I_0$ contains every $x_n$, so in particular contains $x_n$ for infinitely many $n$. Set $n_1 := 1$ (any index); pick $x_{n_1} \in I_0$.

*Recursive step:* Suppose $I_k$ is built with $x_n \in I_k$ for infinitely many $n$, and $n_k$ is chosen. Bisect $I_k$ at its midpoint into two closed subintervals $I_k^{\text{L}}, I_k^{\text{R}}$, each of length $|I_k|/2$. Since $I_k = I_k^{\text{L}} \cup I_k^{\text{R}}$, and the set $\{n : x_n \in I_k\}$ is infinite, at least one of $\{n : x_n \in I_k^{\text{L}}\}, \{n : x_n \in I_k^{\text{R}}\}$ must be infinite (finite union of finite sets is finite, contradiction). Let $I_{k+1}$ be such a half — an infinite index-set.

*Pick the next subsequence index.* Because $\{n : x_n \in I_{k+1}\}$ is infinite but $\{1, 2, \dots, n_k\}$ is finite, the set $\{n > n_k : x_n \in I_{k+1}\}$ is non-empty; pick its smallest element and call it $n_{k+1}$. This ensures $n_{k+1} > n_k$, so $(n_k)$ is strictly increasing — a legitimate subsequence indexing.

*Step 2: Cantor's Nested Intervals.* The intervals $I_k$ are closed, bounded, and nested; their lengths $|I_k| = 2M/2^k \to 0$. By the Nested Intervals Theorem (see [[07-compact-sets]] §7.8),
$$\bigcap_{k=0}^{\infty} I_k \;=\; \{L\}$$
for a unique $L \in \mathbb{R}$.

*Step 3: Show $x_{n_k} \to L$.* By construction, $x_{n_k} \in I_k$, and also $L \in I_k$. Since $I_k$ has length $2M/2^k$:
$$|x_{n_k} - L| \;\leq\; |I_k| \;=\; \frac{2M}{2^k}.$$

Given $\varepsilon > 0$, choose $K$ with $2M/2^K < \varepsilon$ (possible since $1/2^K \to 0$; e.g. $K > \log_2(2M/\varepsilon)$). Then for $k \geq K$: $|x_{n_k} - L| < \varepsilon$. Hence $x_{n_k} \to L$. $\blacksquare$

**Verification.** We used (i) bounded $\Rightarrow$ fits in $[-M,M]$; (ii) pigeonhole on infinite index sets to halve; (iii) Nested Intervals (which is itself equivalent to LUB); (iv) $1/2^k \to 0$. No hidden appeals to convergence of the original sequence or its monotonicity.

### Proof B — via monotonic subsequences

**Lemma (Monotonic subsequence lemma).** *Every real sequence has a monotonic (either increasing or decreasing) subsequence.*

*Proof sketch.* Call index $n$ a **peak** if $x_n \geq x_m$ for all $m > n$. Two cases:
- *Infinitely many peaks $n_1 < n_2 < \cdots$:* then $x_{n_1} \geq x_{n_2} \geq \cdots$ is a (weakly) decreasing subsequence.
- *Finitely many peaks, say none after $N$:* starting at any $n_1 > N$, since $n_1$ is not a peak, some $n_2 > n_1$ has $x_{n_2} > x_{n_1}$. Since $n_2$ is also not a peak, pick $n_3 > n_2$ with $x_{n_3} > x_{n_2}$, etc. We build a strictly increasing subsequence.
$\blacksquare$

**Proof B of Bolzano–Weierstrass.** Let $(x_n)$ be bounded. By the lemma, it has a monotonic subsequence $(x_{n_k})$. This subsequence is monotonic and bounded (inheriting the global bound), hence by the Monotone Convergence Theorem it converges. $\blacksquare$

**Remark.** Proof A makes the limit explicit (via bisection, which is algorithmic — you can *compute* $L$ to arbitrary precision). Proof B is slicker but invokes MCT (itself equivalent to completeness). Either is acceptable on a qualifying exam; conceptually, Proof B exhibits the monotonic subsequence lemma as a purely order-theoretic combinatorial fact (no completeness required until the final MCT step).

### Set-version reminder

> **Theorem 10.5 (Bolzano–Weierstrass, set version).** Every bounded infinite subset of $\mathbb{R}$ has a limit point in $\mathbb{R}$.

See [[07-compact-sets]] §7.7 for the proof. The sequence and set versions are equivalent in $\mathbb{R}$ (enumerate a countable bounded infinite set and apply the sequence version; conversely, pull a subsequence and consider its limit point).

### Historical note

A handwritten proof sketch by Bernard Bolzano (1817) predates Weierstrass's Berlin lectures (1865+) by decades. Weierstrass rediscovered and popularised the result. See `Bolzano.jpg` in [[../raw/]].

---

## 10.6 The Completeness Theorem: Cauchy $\Leftrightarrow$ Convergent in $\mathbb{R}$

> **Theorem 10.6 (Cauchy Completeness of $\mathbb{R}$).** A sequence of real numbers is Cauchy if and only if it is convergent.

**Proof.**

*($\Rightarrow$)* This is Theorem 10.2 of §10.3.

*($\Leftarrow$)* Let $(x_n)$ be Cauchy in $\mathbb{R}$.

*Step 1: Boundedness.* By Theorem 10.3, $(x_n)$ is bounded.

*Step 2: Extract a convergent subsequence.* By Bolzano–Weierstrass (Theorem 10.4), there is a subsequence $(x_{n_k})$ and $L \in \mathbb{R}$ with $x_{n_k} \to L$.

*Step 3: Upgrade subsequential convergence to full convergence.* We claim $x_n \to L$. Fix $\varepsilon > 0$.

- By Cauchy, there exists $N_1$ with $|x_m - x_n| < \varepsilon/2$ for all $m, n \geq N_1$.
- By $x_{n_k} \to L$, there exists $K$ with $|x_{n_k} - L| < \varepsilon/2$ for all $k \geq K$.
- Since $n_k \to \infty$ (subsequence indices are strictly increasing unbounded), we can pick $k^*$ with $k^* \geq K$ **and** $n_{k^*} \geq N_1$ (enlarge $k^*$ if necessary).

Now for every $n \geq N_1$:
$$|x_n - L| \;\leq\; \underbrace{|x_n - x_{n_{k^*}}|}_{< \varepsilon/2\ \text{by Cauchy, both } \geq N_1} \;+\; \underbrace{|x_{n_{k^*}} - L|}_{< \varepsilon/2\ \text{by subseq limit, } k^* \geq K} \;<\; \varepsilon.$$

Hence $x_n \to L$. $\blacksquare$

**Verification of the tricky step.** The splicing "pick $k^*$ with both $k^* \geq K$ and $n_{k^*} \geq N_1$": since $n_k \to \infty$, the set $\{k : n_k \geq N_1\}$ is *cofinite* (contains all sufficiently large $k$); intersecting with $\{k : k \geq K\}$ is still non-empty — in fact contains all sufficiently large $k$. So $k^*$ exists; in fact we can take $k^* = \max(K, k_{N_1})$ where $k_{N_1}$ is the first $k$ with $n_k \geq N_1$.

**Interpretive remark.** The proof uses *both* the Cauchy property and Bolzano–Weierstrass. Each alone is insufficient: Cauchy tells us the sequence has a "self-consistent" limit *candidate* (tail diameters $\to 0$), and Bolzano–Weierstrass supplies an actual limit $L$ inside $\mathbb{R}$. Completeness of $\mathbb{R}$ is the statement that the candidate always exists as a real number.

> **Example 10.7 (Incompleteness of $\mathbb{Q}$).** The sequence
> $$x_1 = 1,\ x_2 = 1.4,\ x_3 = 1.41,\ x_4 = 1.414,\ \ldots$$
> of decimal approximations of $\sqrt{2}$ truncated at $n-1$ decimals is a sequence of rationals. For $m \geq n$, $|x_m - x_n| \leq 10^{-(n-1)}$, so it is Cauchy in $\mathbb{Q}$ (and in $\mathbb{R}$). Yet its $\mathbb{R}$-limit $\sqrt{2}$ is not in $\mathbb{Q}$. Hence $\mathbb{Q}$ is **not complete**: Cauchy sequences in $\mathbb{Q}$ can fail to have $\mathbb{Q}$-limits.

Completeness is therefore the property that makes $\mathbb{R}$ "big enough" to close all Cauchy sequences — the *metric* analogue of the LUB axiom.

---

### Equivalence of the forms of completeness

> **Theorem 10.8 (Equivalence of completeness forms).** *For an Archimedean ordered field $F$ (in particular, for the structure of $\mathbb{R}$), the following are equivalent:*
>
> **(LUB)** Every non-empty subset of $F$ bounded above has a supremum in $F$.
> **(MCT)** Every bounded monotone sequence in $F$ converges in $F$.
> **(BW)** Every bounded sequence in $F$ has a convergent subsequence.
> **(CC)** Every Cauchy sequence in $F$ converges in $F$.
> **(NIT)** Every nested sequence $I_1 \supseteq I_2 \supseteq \cdots$ of non-empty closed bounded intervals has non-empty intersection; if also $|I_k| \to 0$, the intersection is a singleton.

Any one of these can be taken as the completeness axiom; the others then follow.

**Proof structure.** We establish a cycle of implications:
$$\text{(LUB)} \Rightarrow \text{(MCT)} \Rightarrow \text{(NIT)} \Rightarrow \text{(BW)} \Rightarrow \text{(CC)} \Rightarrow \text{(MCT)}\ \text{(closes the cycle indirectly)}$$
and also $\text{(CC)} \Rightarrow \text{(LUB)}$ to close back. We sketch each link.

**(LUB) $\Rightarrow$ (MCT).** Let $(x_n)$ be increasing and bounded above. Set $L := \sup\{x_n : n \in \mathbb{N}\}$, which exists by LUB. Fix $\varepsilon > 0$: $L - \varepsilon$ is not an upper bound, so some $x_N > L - \varepsilon$. Monotonicity: $x_n \geq x_N > L - \varepsilon$ for $n \geq N$; and $x_n \leq L$ always. So $|x_n - L| < \varepsilon$. (Analogous for decreasing, with $\inf$.) ✓

**(MCT) $\Rightarrow$ (NIT).** Let $I_k = [a_k, b_k]$ be nested closed intervals. Then $(a_k)$ is increasing (each new interval starts no earlier) and bounded above by $b_1$; by MCT, $a_k \to a$. Similarly $b_k \to b$ decreasing bounded below by $a_1$. Since $a_k \leq b_k$ for each $k$, $a \leq b$, and $[a, b] \subseteq \bigcap I_k$ — hence non-empty. If $|I_k| = b_k - a_k \to 0$, then $b - a \leq \lim(b_k - a_k) = 0$, so $a = b$ and the intersection is the singleton $\{a\}$. ✓

**(NIT) $\Rightarrow$ (BW).** This is Proof A of §10.5. ✓

**(BW) $\Rightarrow$ (CC).** This is the content of Theorem 10.6, second half. ✓

**(CC) $\Rightarrow$ (LUB).** Let $S \subseteq F$ be non-empty and bounded above. Pick any $b_1$ with $b_1$ an upper bound of $S$ and any $a_1 \in S$. By bisection, build sequences $(a_k), (b_k)$ in $F$ with:
- $a_k \leq a_{k+1}$, $b_k \geq b_{k+1}$,
- each $b_k$ remains an upper bound of $S$, each $a_k$ lies below some element of $S$,
- $b_k - a_k = (b_1 - a_1)/2^{k-1} \to 0$.

Then both sequences are Cauchy (their pairwise differences shrink geometrically), so by (CC) they converge to the same limit $L$. One checks $L = \sup S$: $L$ is an upper bound (as limit of upper bounds $b_k$); any $L' < L$ fails to be an upper bound (since $a_k > L - \varepsilon$ eventually for some small $\varepsilon$, and $a_k$ is dominated by some $s_k \in S$). ✓

**Closing the cycle.** We have LUB $\Rightarrow$ MCT $\Rightarrow$ NIT $\Rightarrow$ BW $\Rightarrow$ CC $\Rightarrow$ LUB, so all five are mutually equivalent. $\blacksquare$

**Remark (Archimedean hypothesis).** The proof of (CC) $\Rightarrow$ (LUB) implicitly uses that $1/2^k \to 0$, which requires the *Archimedean property* ($\mathbb{N}$ unbounded in $F$). Without Archimedean-ness, Cauchy completeness and LUB are *not* equivalent: there exist non-Archimedean Cauchy-complete ordered fields (e.g. the Levi-Civita field) that do not have LUB. For $\mathbb{R}$ itself, Archimedean-ness follows from LUB (or from any of the five forms), so no separate hypothesis is needed.

---

## 10.7 Cauchy's Theorems on Limits

Using the Cauchy criterion and its consequences, several classical theorems follow cleanly. These are named after Cauchy in the Indian/French tradition and Cesàro/Stolz in other traditions; both attributions point to the 19th-century emergence of rigorous limit theory.

### Cauchy's First Theorem on Limits — Cesàro Means

> **Theorem 10.9 (Cesàro / Cauchy's First Theorem).** If $x_n \to L$ (with $L \in \mathbb{R}$), then
> $$\sigma_n \;:=\; \frac{x_1 + x_2 + \cdots + x_n}{n} \;\longrightarrow\; L.$$

**Proof.** Fix $\varepsilon > 0$. Since $x_n \to L$, choose $N$ with $|x_n - L| < \varepsilon/2$ for $n > N$. Split:
$$\sigma_n - L \;=\; \frac{\sum_{k=1}^{n}(x_k - L)}{n} \;=\; \underbrace{\frac{\sum_{k=1}^{N}(x_k - L)}{n}}_{=:A_n} \;+\; \underbrace{\frac{\sum_{k=N+1}^{n}(x_k - L)}{n}}_{=:B_n}.$$

- $A_n$: the numerator is a fixed constant $C := \sum_{k=1}^{N}(x_k - L)$, so $|A_n| = |C|/n \to 0$. Choose $N' \geq N$ with $|C|/n < \varepsilon/2$ for $n \geq N'$.
- $B_n$: each summand $|x_k - L| < \varepsilon/2$ for $k > N$, and there are $n - N$ summands, so $|B_n| \leq (n - N)(\varepsilon/2)/n < \varepsilon/2$.

For $n \geq N'$: $|\sigma_n - L| \leq |A_n| + |B_n| < \varepsilon/2 + \varepsilon/2 = \varepsilon$. $\blacksquare$

**Interpretation.** The Cesàro mean is always at least as tame as the original sequence: oscillating sequences may get their oscillation damped out (e.g. $x_n = (-1)^n$ diverges, but $\sigma_n = 0$ or $\approx 0$, so Cesàro-summable to $0$). This is the start of "summability theory."

### Cauchy's Second Theorem on Limits — Geometric Mean

> **Theorem 10.10 (Cauchy's Second Theorem).** Let $(x_n)$ be a positive sequence with $x_{n+1}/x_n \to L \in [0, \infty]$. Then $x_n^{1/n} \to L$.

**Proof.** If $L \in (0, \infty)$: take logarithms, $y_n := \ln x_n$. Then $y_{n+1} - y_n = \ln(x_{n+1}/x_n) \to \ln L$. By a Cesàro-type argument (applied to the telescoping sum),
$$\frac{y_n}{n} \;=\; \frac{y_1 + (y_2 - y_1) + (y_3 - y_2) + \cdots + (y_n - y_{n-1})}{n} \;=\; \frac{y_1}{n} \;+\; \frac{1}{n}\sum_{k=1}^{n-1}(y_{k+1} - y_k).$$

The first term $\to 0$; the second is the Cesàro mean of $(y_{k+1} - y_k)$, which has limit $\ln L$, so it $\to \ln L$ by Theorem 10.9. Thus $(\ln x_n)/n \to \ln L$, and exponentiating (continuity of $\exp$): $x_n^{1/n} = e^{(\ln x_n)/n} \to e^{\ln L} = L$.

For $L = 0$ or $L = \infty$, adapt the argument similarly using $\log$ with extended conventions, or bound directly. $\blacksquare$

**Example (factorials).** $x_n = n!$. Then $x_{n+1}/x_n = n+1 \to \infty$, so $(n!)^{1/n} \to \infty$. Stirling gives the sharper $(n!)^{1/n} \sim n/e$, consistent.

**Example (binomial coefficients).** $x_n = \binom{2n}{n}$. Then $x_{n+1}/x_n = \binom{2n+2}{n+1}/\binom{2n}{n} = \frac{(2n+2)(2n+1)}{(n+1)^2} \to 4$. Hence $\binom{2n}{n}^{1/n} \to 4$.

### Cauchy's Third Theorem — Stolz–Cesàro

> **Theorem 10.11 (Stolz–Cesàro).** Let $(b_n)$ be strictly increasing and unbounded above. If $\dfrac{a_{n+1} - a_n}{b_{n+1} - b_n} \to L$, then $\dfrac{a_n}{b_n} \to L$.

This is often called the **discrete L'Hôpital's rule**: the ratio of "derivatives" (finite differences) controls the ratio of "values." Useful for evaluating $a_n/b_n$ of "$\infty/\infty$ type" when $b_n \to \infty$.

*Proof sketch.* Fix $\varepsilon > 0$; choose $N$ so that $L - \varepsilon < (a_{k+1} - a_k)/(b_{k+1} - b_k) < L + \varepsilon$ for $k \geq N$. Multiply by the positive $b_{k+1} - b_k$ and sum from $k = N$ to $n - 1$, telescoping the numerator and denominator. After dividing by $b_n$ and noting $b_N/b_n \to 0$ (since $b_n \to \infty$), one gets $a_n/b_n \to L$. $\blacksquare$

**Example.** $a_n = 1 + \frac{1}{2} + \cdots + \frac{1}{n}$, $b_n = \ln n$. Then $\Delta a_n = 1/(n+1)$, $\Delta b_n = \ln(1 + 1/n) \sim 1/n$, so $\Delta a_n / \Delta b_n \to 1$, giving $a_n / \ln n \to 1$ — the "Euler–Mascheroni" asymptotic, $\sum_{k=1}^n 1/k \sim \ln n$.

### Cauchy's General Principle of Convergence

> **Cauchy's general principle of convergence.** A sequence converges if and only if it is Cauchy.

Exactly Theorem 10.6, restated. Cauchy used this as a *test*: it allows you to certify convergence of a sequence without knowing or guessing the limit, a major conceptual advance from 1820s-era analysis.

---

## 10.8 Contractions and Banach Fixed-Point Principle

Completeness makes contraction mappings tractable.

> **Definition 10.12 (Contraction).** A map $f : [a, b] \to [a, b]$ is a **contraction** (with constant $c$) if there exists $c \in [0, 1)$ such that
> $$|f(x) - f(y)| \leq c|x - y| \qquad \forall\,x, y \in [a, b].$$

Any contraction is continuous (take $y \to x$). If $c = 1$ we call $f$ **non-expansive**; contraction requires $c$ *strictly* less than $1$.

> **Theorem 10.13 (Banach Fixed-Point Theorem on $\mathbb{R}$).** Every contraction $f : [a, b] \to [a, b]$ has a unique fixed point $p \in [a, b]$. Moreover, for any starting point $x_0 \in [a, b]$, the iterates $x_{n+1} = f(x_n)$ converge to $p$, with the explicit error bound
> $$|x_n - p| \leq \frac{c^n}{1 - c}|x_1 - x_0|.$$

**Proof.**

*Step 1: Estimate adjacent differences.* For $n \geq 1$:
$$|x_{n+1} - x_n| = |f(x_n) - f(x_{n-1})| \leq c|x_n - x_{n-1}| \leq c^2|x_{n-1} - x_{n-2}| \leq \cdots \leq c^n|x_1 - x_0|.$$

*Step 2: Show $(x_n)$ is Cauchy.* For $n > m \geq 0$, apply the triangle inequality:
$$|x_n - x_m| \leq \sum_{k=m}^{n-1} |x_{k+1} - x_k| \leq \sum_{k=m}^{n-1} c^k |x_1 - x_0| = c^m \frac{1 - c^{n-m}}{1 - c}|x_1 - x_0| < \frac{c^m}{1-c}|x_1 - x_0|. \tag{$\star$}$$

Since $c \in [0, 1)$, $c^m \to 0$. Given $\varepsilon > 0$, choose $M$ with $c^M/(1-c) \cdot |x_1 - x_0| < \varepsilon$; then for $m, n \geq M$, $|x_n - x_m| < \varepsilon$. So $(x_n)$ is Cauchy.

*Step 3: Existence of limit.* By Cauchy Completeness (Theorem 10.6), $x_n \to p$ for some $p \in \mathbb{R}$. Since $[a, b]$ is closed and each $x_n \in [a, b]$, $p \in [a, b]$.

*Step 4: $p$ is a fixed point.* Since $f$ is continuous (contractions are $c$-Lipschitz, hence continuous):
$$p = \lim_{n \to \infty} x_{n+1} = \lim_{n \to \infty} f(x_n) = f(\lim_{n \to \infty} x_n) = f(p).$$

*Step 5: Uniqueness.* Suppose $p, q$ are both fixed points. Then
$$|p - q| = |f(p) - f(q)| \leq c|p - q|,$$
i.e., $(1 - c)|p - q| \leq 0$. Since $1 - c > 0$, $|p - q| = 0$, so $p = q$.

*Step 6: Error bound.* Fix $n$, let $m \to \infty$ in ($\star$) with $x_m \to p$: $|x_n - p| \leq c^n/(1-c) \cdot |x_1 - x_0|$. (Actually we need to redo this with $n$ fixed and $m \to \infty$: apply ($\star$) with roles swapped — $|x_n - x_m| \leq c^n/(1-c)\cdot|x_1 - x_0|$ for $m \geq n$, then let $m \to \infty$.) $\blacksquare$

**Interpretive remark.** This theorem is the backbone of:
- **Newton's method:** iteration $x_{n+1} = x_n - f(x_n)/f'(x_n)$ is a contraction near a simple root.
- **Picard iteration for ODEs:** the map $y \mapsto y_0 + \int_{t_0}^t F(s, y(s))\,ds$ is a contraction on a suitable function-space ball, giving local existence/uniqueness for $y' = F(t, y)$.
- **Numerical fixed-point solvers:** any $x = f(x)$ equation with $|f'| < 1$ is solved iteratively.

The theorem generalises verbatim to complete metric spaces (Banach's 1922 theorem).

---

## 10.9 Completeness in Pictures

$\mathbb{R}$ is the **completion** of $\mathbb{Q}$. Two constructions yield the same $\mathbb{R}$:

- **Cantor's construction (metric completion):** Reals are equivalence classes of Cauchy sequences of rationals, where $(x_n) \sim (y_n)$ if $|x_n - y_n| \to 0$. Addition and multiplication are termwise, order is defined via eventual dominance. This gives the metric analogue of completion — any Cauchy sequence of rationals "names" a real.

- **Dedekind's construction (order completion):** Reals are Dedekind cuts, i.e. sets $A \subset \mathbb{Q}$ satisfying (i) $\emptyset \neq A \neq \mathbb{Q}$, (ii) $A$ is downward-closed, (iii) $A$ has no largest element. Each real number is identified with the cut $\{q \in \mathbb{Q} : q < r\}$. This gives the order analogue — every bounded-above set of rationals has a real sup.

Both yield the *unique* complete ordered field (up to isomorphism). Equivalently, LUB, Cauchy completeness, MCT, BW, and NIT are five lenses on the same fact: $\mathbb{R}$ has **no gaps**.

**Why this matters.** In more general metric spaces (function spaces, $p$-adic numbers, abstract completions), the Cauchy/metric formulation *is* the only one available — there is no order. Cauchy completeness is the "correct" generalisation of the gap-freeness of $\mathbb{R}$.

---

## Worked Examples

**Example 10.14.** *Show that $x_n = \sum_{k=1}^{n} \dfrac{1}{k^2}$ is Cauchy, and hence converges.*

**Setup.** We want to show $(x_n)$ is Cauchy: for every $\varepsilon > 0$, find $N$ with $|x_m - x_n| < \varepsilon$ whenever $m, n \geq N$.

**Strategy.** WLOG $m > n$ (or else $|x_m - x_n| = 0 < \varepsilon$). Then
$$|x_m - x_n| = \sum_{k=n+1}^{m} \frac{1}{k^2}.$$
Bound $1/k^2$ by a telescoping comparison $1/(k(k-1)) = 1/(k-1) - 1/k$ (valid for $k \geq 2$).

**Computation.** For $k \geq 2$: $k^2 > k(k-1)$, so $1/k^2 < 1/(k(k-1)) = 1/(k-1) - 1/k$. Hence for $m > n \geq 1$:
$$|x_m - x_n| = \sum_{k=n+1}^{m} \frac{1}{k^2} < \sum_{k=n+1}^{m} \left(\frac{1}{k-1} - \frac{1}{k}\right) = \frac{1}{n} - \frac{1}{m} < \frac{1}{n}.$$

Given $\varepsilon > 0$, by the Archimedean property choose $N \in \mathbb{N}$ with $N > 1/\varepsilon$, i.e., $1/N < \varepsilon$.

**Verification.** For $m, n \geq N$ with (WLOG) $m > n$: $|x_m - x_n| < 1/n \leq 1/N < \varepsilon$. For $m = n$, trivially $|x_m - x_n| = 0$. ✓

**Interpretation.** By Cauchy Completeness, $(x_n)$ converges. (Euler showed the limit is $\pi^2/6$, but that's a separate computation — Cauchy gave convergence *without* knowing the value, the whole point of the intrinsic criterion.)

---

**Example 10.15.** *Show $x_n = \sum_{k=1}^{n} \dfrac{(-1)^{k+1}}{k}$ is Cauchy.*

**Setup.** Partial sums of the alternating harmonic series. This is more delicate than Example 10.14 — the $|a_k|$ are $1/k$ which are NOT summable, so we cannot dominate $|x_m - x_n|$ by $\sum |a_k|$.

**Strategy.** Use the *alternating series tail bound*: for an alternating series with $|a_k|$ decreasing to $0$, the tail $|\sum_{k=n+1}^m a_k| \leq |a_{n+1}|$.

**Computation.** For $m > n$:
$$|x_m - x_n| = \left|\sum_{k=n+1}^{m} \frac{(-1)^{k+1}}{k}\right|.$$

The terms $(-1)^{k+1}/k$ alternate in sign with magnitudes $1/k$ decreasing. Group them in pairs starting from index $n+1$:
- If $m - n$ is even: the sum pairs up as $\pm\left[(1/(n+1) - 1/(n+2)) + (1/(n+3) - 1/(n+4)) + \cdots\right]$, each parenthesis positive and decreasing to 0, and the whole sum is dominated by the first term $1/(n+1)$.
- If $m - n$ is odd: similarly after pairing, plus one extra term of magnitude $\leq 1/(n+1)$ by monotonicity.

In both cases, $|x_m - x_n| \leq 1/(n+1)$.

Given $\varepsilon > 0$, choose $N \in \mathbb{N}$ with $N + 1 > 1/\varepsilon$, i.e. $N > 1/\varepsilon - 1$.

**Verification.** For $m, n \geq N$ (WLOG $m > n$): $|x_m - x_n| \leq 1/(n+1) \leq 1/(N+1) < \varepsilon$. ✓

**Interpretation.** Cauchy, hence convergent; the limit is $\ln 2$ by standard computation. Note the contrast with Example 10.16 below: the non-alternating harmonic series diverges, but alternation induces enough cancellation to save convergence. This is the archetype of "conditional convergence."

---

**Example 10.16.** *Show $x_n = 1 + \dfrac{1}{2} + \dfrac{1}{3} + \cdots + \dfrac{1}{n}$ is **not** Cauchy (hence the harmonic series diverges).*

**Setup.** We need to show the Cauchy condition *fails*: there exists $\varepsilon_0 > 0$ such that for every $N$, we can find $m, n \geq N$ with $|x_m - x_n| \geq \varepsilon_0$.

**Strategy.** Classic dyadic trick: for any $n$, look at $m = 2n$ and bound $x_{2n} - x_n$ from below.

**Computation.** For any $n \geq 1$:
$$x_{2n} - x_n = \sum_{k=n+1}^{2n} \frac{1}{k}.$$

The sum has $n$ terms, each $\geq 1/(2n)$ (since $k \leq 2n$ means $1/k \geq 1/(2n)$). Hence
$$x_{2n} - x_n \geq n \cdot \frac{1}{2n} = \frac{1}{2}.$$

**Verification.** Take $\varepsilon_0 = 1/2$. For any $N \geq 1$, set $n := N$, $m := 2N$. Both $m, n \geq N$, and $|x_m - x_n| = x_{2N} - x_N \geq 1/2 = \varepsilon_0$. So the Cauchy condition fails at tolerance $\varepsilon_0 = 1/2$, regardless of $N$. ✓

**Interpretation.** Since $(x_n)$ is not Cauchy, it does not converge; the harmonic series diverges. Alternative classical proof: $x_{2^k} \geq 1 + k/2$ (by iterating the dyadic bound), unbounded above. Both proofs hinge on the same inequality — one framed via Cauchy (intrinsic), the other via boundedness (extrinsic).

---

**Example 10.17.** *Investigate whether $f(x) = \dfrac{1}{2}\left(x + \dfrac{3}{x}\right)$ is a contraction on $[1, 2]$, and on a suitable subinterval; find its fixed point.*

**Setup.** This is the Babylonian/Heron iteration for $\sqrt{3}$ (in general, $f(x) = (x + a/x)/2$ for $\sqrt{a}$).

**Strategy.** Compute the difference $f(x) - f(y)$ and factor; find the Lipschitz constant by bounding $|f'|$ (equivalently) or by direct algebra.

**Computation.** Write
$$f(x) - f(y) = \frac{1}{2}(x - y) + \frac{3}{2}\left(\frac{1}{x} - \frac{1}{y}\right) = \frac{1}{2}(x-y) + \frac{3}{2} \cdot \frac{y - x}{xy} = \frac{1}{2}(x - y)\left(1 - \frac{3}{xy}\right).$$

So $|f(x) - f(y)| = \frac{1}{2}|x - y|\cdot \left|1 - \frac{3}{xy}\right|$.

*On $[1, 2]$:* $xy \in [1, 4]$, so $3/(xy) \in [3/4, 3]$, hence $1 - 3/(xy) \in [-2, 1/4]$ and $|1 - 3/(xy)| \leq 2$. So $|f(x) - f(y)| \leq |x - y|$ — merely non-expansive, *not* a strict contraction. This $[1,2]$ scope is *not* fine enough.

*On $[\sqrt{3}, 2]$ (or more concretely $[1.5, 2]$):* $xy \geq 1.5 \cdot 1.5 = 2.25$, so $3/(xy) \leq 3/2.25 = 4/3$, giving $|1 - 3/(xy)| \leq 1/3 \cdot \text{(hmm, verify)}$. Let me recompute: $xy \geq 2.25$ gives $3/(xy) \in (0, 4/3]$, so $1 - 3/(xy) \in [1 - 4/3, 1) = [-1/3, 1)$, and $|1 - 3/(xy)| \leq \max(1/3, 1) = 1$. Not good enough yet.

*On a narrower interval, $[1.7, 1.8]$:* $xy \geq 2.89$, $3/(xy) \leq 3/2.89 \approx 1.038$; $1 - 3/(xy) \in [-0.038, \text{something}]$, narrow. Precisely, on $[\sqrt{3} - \delta, \sqrt{3} + \delta]$ for small $\delta$, $xy \to 3$ so $1 - 3/(xy) \to 0$, and $f$ is arbitrarily contracting near the fixed point.

**Key observation.** The contraction constant depends on the interval. Globally on $[1, 2]$, $f$ is non-expansive but not contracting; locally near $\sqrt{3} \approx 1.732$, $f$ is a strong contraction. Banach's theorem applies on any closed interval where $f$ maps to itself *and* is a strict contraction. On $[\sqrt{3}, 2]$, one checks $f([\sqrt{3}, 2]) \subseteq [\sqrt{3}, 2]$ (AM-GM: $f(x) \geq \sqrt{x \cdot 3/x} = \sqrt{3}$; and $f$ decreasing on $[\sqrt{3}, \infty)$, so $f(x) \leq f(\sqrt{3}) = \sqrt{3} \leq 2$ — wait, $f(\sqrt{3}) = \sqrt{3}$, so $f$ maps $[\sqrt{3}, 2]$ into $[\sqrt{3}, f(2)] = [\sqrt{3}, 7/4] \subseteq [\sqrt{3}, 2]$). On this range, $|1 - 3/(xy)|$ can still equal 1 (at $x = y = \sqrt{3}$ doesn't happen since $xy = 3$ giving $0$; elsewhere bounded). Direct estimate: $|f(x) - f(y)| / |x - y| \leq \max |f'(\xi)| = \max |(1 - 3/\xi^2)/2|$; on $[\sqrt{3}, 2]$, $\xi^2 \in [3, 4]$, $3/\xi^2 \in [3/4, 1]$, so $|1 - 3/\xi^2|/2 \in [0, 1/8]$. Hence $c = 1/8$ and Banach gives unique fixed point $p = \sqrt{3}$ with $|x_n - \sqrt{3}| \leq (1/8)^n/(7/8) \cdot |x_1 - x_0|$ — extremely fast convergence.

**Verification.** Fixed point: $x = (x + 3/x)/2 \iff 2x = x + 3/x \iff x^2 = 3 \iff x = \sqrt{3}$ (positive root). ✓ Newton's method on $g(x) = x^2 - 3$ produces exactly this iteration; the quadratic convergence (doubling of correct digits each step) matches the vanishing Lipschitz constant at the root.

**Interpretation.** The takeaway: Banach-contraction is *interval-sensitive*. Verify both (i) $f(I) \subseteq I$ and (ii) $|f'| \leq c < 1$ on $I$. Newton's method's success is precisely Banach applied on a small ball around the root.

---

**Example 10.18.** *Give a direct proof that $x_n = \sqrt{n+1} - \sqrt{n}$ is Cauchy, without first computing its limit.*

**Setup.** We want to bypass "$x_n \to 0$, therefore convergent, therefore Cauchy" and instead derive Cauchy-ness from algebraic manipulation of $x_m - x_n$.

**Strategy.** Rationalise: $\sqrt{n+1} - \sqrt{n} = 1/(\sqrt{n+1} + \sqrt{n})$. This makes the magnitude $x_n = 1/(\sqrt{n+1} + \sqrt{n}) < 1/(2\sqrt{n})$ obvious, and then control $|x_m - x_n|$ by triangle inequality.

**Computation.** For any $n$:
$$x_n = \sqrt{n+1} - \sqrt{n} = \frac{(\sqrt{n+1} - \sqrt{n})(\sqrt{n+1} + \sqrt{n})}{\sqrt{n+1} + \sqrt{n}} = \frac{(n+1) - n}{\sqrt{n+1} + \sqrt{n}} = \frac{1}{\sqrt{n+1} + \sqrt{n}}.$$

Since $\sqrt{n+1} \geq \sqrt{n}$, $\sqrt{n+1} + \sqrt{n} \geq 2\sqrt{n}$, so $0 < x_n \leq 1/(2\sqrt{n})$.

For $m, n \geq 1$, by triangle inequality:
$$|x_m - x_n| \leq x_m + x_n \leq \frac{1}{2\sqrt{m}} + \frac{1}{2\sqrt{n}} \leq \frac{1}{\sqrt{\min(m,n)}}.$$

Given $\varepsilon > 0$, choose $N \in \mathbb{N}$ with $N > 1/\varepsilon^2$, i.e., $1/\sqrt{N} < \varepsilon$.

**Verification.** For $m, n \geq N$: $\min(m, n) \geq N$, so $|x_m - x_n| \leq 1/\sqrt{\min(m,n)} \leq 1/\sqrt{N} < \varepsilon$. ✓

**Interpretation.** Cauchy $\Rightarrow$ convergent in $\mathbb{R}$, with limit $0$ by the squeeze $0 < x_n \leq 1/(2\sqrt{n}) \to 0$. The Cauchy route is pedagogically instructive: we show convergence *without* needing to guess or verify the limit value. In practice, for sequences where $x_n \to 0$ is obvious, direct $\varepsilon$-$N$ is shorter; Cauchy shines when the limit is unknown (Examples 10.14, 10.15) or non-elementary.

---

## Practice Problems

1. Prove that $x_n = \sum_{k=1}^{n} \dfrac{1}{k!}$ is Cauchy. Hence show $\sum 1/k!$ converges (to $e - 1$, though you are not asked to identify the limit).

2. Let $(a_n)$ be a Cauchy sequence in $\mathbb{R}$. Prove that $(a_n^2)$ is also Cauchy.

3. Construct a sequence $(x_n)$ of rationals that is Cauchy in $\mathbb{Q}$ but has no rational limit. Explain how this demonstrates the incompleteness of $\mathbb{Q}$.

4. Prove: $(x_n)$ is Cauchy $\iff$ every subsequence $(x_{n_k})$ of $(x_n)$ is Cauchy.

5. Let $f : \mathbb{R} \to \mathbb{R}$ satisfy $|f(x) - f(y)| \leq r|x - y|$ for some $0 < r < 1$ and all $x, y \in \mathbb{R}$. Show that for any starting point $x_0 \in \mathbb{R}$, the iterates $x_{n+1} = f(x_n)$ converge to the unique fixed point $p$ of $f$, with the error bound $|x_n - p| \leq r^n/(1-r)\cdot|x_1 - x_0|$.

6. (Bonus.) Let $(x_n)$ be Cauchy. Show that $(|x_n|)$ is Cauchy. Does the converse hold?

### Solutions

---

**Solution 1.** $x_n = \sum_{k=1}^n 1/k!$ is Cauchy.

**Setup.** Show the tail $|x_m - x_n|$ is eventually smaller than any $\varepsilon > 0$.

**Strategy.** Dominate $1/k!$ by a geometric series, using the bound $k! \geq 2^{k-1}$ for $k \geq 1$ (easy induction: $1! = 1 = 2^0$, $(k+1)! = (k+1) \cdot k! \geq 2 \cdot 2^{k-1} = 2^k$ whenever $k+1 \geq 2$).

**Computation.** For $m > n \geq 1$:
$$|x_m - x_n| = \sum_{k=n+1}^{m} \frac{1}{k!} \leq \sum_{k=n+1}^{m} \frac{1}{2^{k-1}} = \frac{1}{2^n}\sum_{j=0}^{m-n-1} \frac{1}{2^j} < \frac{1}{2^n} \cdot 2 = \frac{1}{2^{n-1}}.$$

(In the last step, geometric sum $\sum_{j=0}^{\infty} 1/2^j = 2$.)

Given $\varepsilon > 0$, choose $N$ with $1/2^{N-1} < \varepsilon$ — e.g., $N > 1 + \log_2(1/\varepsilon)$, ceiling.

**Verification.** For $m, n \geq N$ (WLOG $m > n$): $|x_m - x_n| < 1/2^{n-1} \leq 1/2^{N-1} < \varepsilon$. ✓

**Interpretation.** By Cauchy Completeness, $(x_n)$ converges. In fact, adding the $k = 0$ term (value $1$), $\sum_{k=0}^{\infty} 1/k! = e$, so $\lim x_n = e - 1$. The Cauchy proof certified convergence independent of this computation — the whole point. $\blacksquare$

---

**Solution 2.** $(a_n)$ Cauchy $\Rightarrow$ $(a_n^2)$ Cauchy.

**Setup.** Given: $(a_n)$ Cauchy. Show for every $\varepsilon > 0$ there exists $N$ with $|a_m^2 - a_n^2| < \varepsilon$ for $m, n \geq N$.

**Strategy.** Factor $a_m^2 - a_n^2 = (a_m + a_n)(a_m - a_n)$. Bound $|a_m + a_n|$ using Cauchy $\Rightarrow$ bounded (Theorem 10.3), then use Cauchy on $|a_m - a_n|$.

**Computation.** By Theorem 10.3, there exists $M > 0$ with $|a_n| \leq M$ for all $n$. Then
$$|a_m^2 - a_n^2| = |a_m + a_n| \cdot |a_m - a_n| \leq (|a_m| + |a_n|) \cdot |a_m - a_n| \leq 2M \cdot |a_m - a_n|.$$

If $M = 0$, then $a_n = 0$ for all $n$ and the claim is trivial. Assume $M > 0$.

Given $\varepsilon > 0$, set $\varepsilon' := \varepsilon/(2M)$. By Cauchy-ness of $(a_n)$, there exists $N$ with $|a_m - a_n| < \varepsilon'$ for $m, n \geq N$.

**Verification.** For $m, n \geq N$: $|a_m^2 - a_n^2| \leq 2M \cdot |a_m - a_n| < 2M \cdot \varepsilon' = 2M \cdot \varepsilon/(2M) = \varepsilon$. ✓

**Interpretation.** More generally, if $g : \mathbb{R} \to \mathbb{R}$ is *uniformly* Lipschitz on bounded sets and $(a_n)$ is Cauchy (hence bounded), then $(g(a_n))$ is Cauchy. The squaring map $x \mapsto x^2$ is locally Lipschitz but not globally; the boundedness of $(a_n)$ rescues us. Contrast: if $a_n \to \infty$, $(a_n)$ is not Cauchy, and "Cauchy-ness of $(a_n^2)$" doesn't even arise. $\blacksquare$

---

**Solution 3.** Construct a Cauchy sequence in $\mathbb{Q}$ with no rational limit.

**Setup.** The standard construction: decimal truncations of $\sqrt{2}$.

**Construction.** Define $x_n$ inductively: $x_1 := 1$ (the largest integer with $x_1^2 \leq 2$); $x_n :=$ the largest rational of the form $k/10^{n-1}$ (with $k \in \mathbb{N}$) such that $x_n^2 \leq 2$. Explicitly:
$$x_1 = 1,\ x_2 = 1.4,\ x_3 = 1.41,\ x_4 = 1.414,\ x_5 = 1.4142,\ \ldots$$

Each $x_n \in \mathbb{Q}$ by construction (finite decimals are rational).

**Cauchy-ness in $\mathbb{Q}$.** For $m \geq n$, by construction $0 \leq x_m - x_n \leq 10^{-(n-1)}$ (the extra decimals can only add value in the $10^{-(n)}, 10^{-(n+1)}, \ldots$ positions, summing to at most $10^{-(n-1)}$ via geometric series $\sum_{k=n}^{\infty} 9 \cdot 10^{-k} = 10^{-(n-1)}$).

Given $\varepsilon > 0$ (rational, WLOG), by the Archimedean property of $\mathbb{Q}$ (itself valid), choose $N$ with $10^{-(N-1)} < \varepsilon$. Then for $m, n \geq N$: $|x_m - x_n| \leq 10^{-(\min(m,n) - 1)} \leq 10^{-(N-1)} < \varepsilon$. ✓

**No rational limit.** In $\mathbb{R}$, $x_n \to \sqrt{2}$ (by construction, $x_n^2 \leq 2$ and $x_n^2 \geq 2 - 2 \cdot 10^{-(n-1)} \cdot x_n - 10^{-2(n-1)}$, so $x_n^2 \to 2$; hence $x_n \to \sqrt{2}$ by continuity of $\sqrt{\cdot}$). Suppose $x_n \to q \in \mathbb{Q}$ for some rational $q$. Then (uniqueness of limits in $\mathbb{R}$) $q = \sqrt{2}$, contradicting the classical irrationality of $\sqrt{2}$. Hence no rational limit exists.

**Interpretation.** This exhibits $\mathbb{Q}$ as *not* Cauchy-complete: a perfectly well-defined Cauchy sequence of rationals points at a gap in $\mathbb{Q}$. Cantor's construction of $\mathbb{R}$ fills all such gaps simultaneously, forming a complete ordered field. The same sequence shows $\mathbb{Q}$ is not LUB-complete: $\{x_n : n \geq 1\}$ is bounded above (by $2$) but has no rational supremum (the only candidate would be $\sqrt{2}$). $\blacksquare$

---

**Solution 4.** $(x_n)$ Cauchy $\iff$ every subsequence is Cauchy.

**$(\Rightarrow)$.** Assume $(x_n)$ is Cauchy. Let $(x_{n_k})$ be any subsequence.

*Strategy.* Propagate Cauchy-ness via the index inequality $n_k \geq k$.

*Proof.* Given $\varepsilon > 0$, by Cauchy-ness of $(x_n)$ choose $N$ with $|x_m - x_n| < \varepsilon$ for $m, n \geq N$. Since $n_k \geq k$ (for strictly increasing subsequence indices starting $n_1 \geq 1$; a trivial induction), if $k, l \geq N$ then $n_k, n_l \geq N$, so $|x_{n_k} - x_{n_l}| < \varepsilon$. Hence $(x_{n_k})$ is Cauchy.

**$(\Leftarrow)$.** Assume every subsequence of $(x_n)$ is Cauchy; in particular, $(x_n)$ is a subsequence of itself (with $n_k = k$), so $(x_n)$ is Cauchy. ✓

**Verification.** Both directions complete. ✓

**Interpretation.** This is a useful sanity check: Cauchy-ness is *preserved under passing to subsequences* (unlike, say, "strictly increasing"). More strikingly, if even *one* subsequence fails to be Cauchy, the full sequence fails; and *every* subsequence of a non-Cauchy sequence can still be Cauchy — wait, no, the implication is: full Cauchy $\iff$ all sub-Cauchy. What *does* hold, as a partial converse in $\mathbb{R}$: if $(x_n)$ has a convergent subsequence *and* is Cauchy, then the full sequence converges (Theorem 10.6 logic). $\blacksquare$

---

**Solution 5.** Global Banach on $\mathbb{R}$ with explicit error bound.

**Setup.** $f : \mathbb{R} \to \mathbb{R}$ with $|f(x) - f(y)| \leq r|x - y|$, $0 < r < 1$. Iterates $x_{n+1} = f(x_n)$. Want: $x_n \to p$ unique fixed point, $|x_n - p| \leq r^n/(1-r)\cdot|x_1 - x_0|$.

**Strategy.** Mimic the proof of Theorem 10.13, with the interval $[a, b]$ replaced by $\mathbb{R}$ (so we need $\mathbb{R}$-completeness rather than compactness of $[a,b]$ — but both hold here).

**Computation.**

*Step 1: Geometric estimate on adjacent differences.*
$$|x_{n+1} - x_n| = |f(x_n) - f(x_{n-1})| \leq r|x_n - x_{n-1}| \leq r^2|x_{n-1} - x_{n-2}| \leq \cdots \leq r^n|x_1 - x_0|.$$

*Step 2: Cauchy estimate.* For $n > m$:
$$|x_n - x_m| \leq \sum_{k=m}^{n-1}|x_{k+1} - x_k| \leq \sum_{k=m}^{n-1} r^k |x_1 - x_0| = r^m \cdot \frac{1 - r^{n-m}}{1 - r}|x_1 - x_0| < \frac{r^m}{1-r}|x_1 - x_0|. \tag{$\star$}$$

Since $r \in (0, 1)$, $r^m \to 0$, so given $\varepsilon > 0$ we find $M$ with $r^M/(1-r)\cdot|x_1 - x_0| < \varepsilon$; for $m, n \geq M$, $|x_m - x_n| < \varepsilon$. Hence $(x_n)$ Cauchy.

*Step 3: Existence.* By Cauchy Completeness of $\mathbb{R}$, $x_n \to p$ for some $p \in \mathbb{R}$.

*Step 4: $p = f(p)$.* $f$ is continuous (Lipschitz $\Rightarrow$ uniformly continuous). So $p = \lim x_{n+1} = \lim f(x_n) = f(p)$.

*Step 5: Uniqueness.* If $f(q) = q$, then $|p - q| = |f(p) - f(q)| \leq r|p - q|$; since $1 - r > 0$, $|p - q| = 0$, $p = q$.

*Step 6: Error bound.* Fix $n$. In ($\star$), let $m := n$ and take $n' \to \infty$ (rename for clarity: $|x_n - x_{n'}| \leq r^n/(1-r)\cdot|x_1 - x_0|$ for $n' > n$). Since $x_{n'} \to p$ as $n' \to \infty$, by continuity of $|\cdot|$: $|x_n - p| \leq r^n/(1-r)\cdot|x_1 - x_0|$. ✓

**Verification.** Existence via Cauchy Completeness, uniqueness via the contraction property, error bound via the geometric tail estimate. All steps justified. $\blacksquare$

**Interpretation.** This is the "global" Banach fixed-point theorem — $f$ defined on all of $\mathbb{R}$, contracting with constant $r < 1$. The error bound is exponential decay at rate $r$, independent of $x_0$ (up to the prefactor $|x_1 - x_0|$). This explicit rate is what makes Banach iteration a *numerical algorithm* — you can compute the fixed point to any prescribed accuracy in a predictable number of steps.

---

**Solution 6 (bonus).** $(x_n)$ Cauchy $\Rightarrow$ $(|x_n|)$ Cauchy; converse?

**Forward.** By the reverse triangle inequality:
$$\big| |x_m| - |x_n| \big| \leq |x_m - x_n|.$$

Given $\varepsilon > 0$, choose $N$ for $(x_n)$-Cauchy; then $||x_m| - |x_n|| \leq |x_m - x_n| < \varepsilon$ for $m, n \geq N$. Hence $(|x_n|)$ is Cauchy. ✓

**Converse fails.** Take $x_n = (-1)^n$. Then $|x_n| = 1$ for all $n$, so $(|x_n|)$ is constant, hence Cauchy. But $x_{2n} = 1, x_{2n+1} = -1$, so $|x_{2n+1} - x_{2n}| = 2$ — not Cauchy.

**Interpretation.** Absolute value is a *contraction* ($1$-Lipschitz), preserving Cauchy-ness. But the operation is lossy (it kills sign information), so Cauchy-ness of $(|x_n|)$ is strictly weaker than of $(x_n)$. The same phenomenon occurs in any Banach space and underlies why norms control one direction of convergence but not the other. $\blacksquare$

---

## Related Topics

- [[01-real-number-system]] — ordered field background and the Archimedean property
- [[03-supremum-and-infimum]] — LUB axiom, equivalent to Cauchy completeness
- [[07-compact-sets]] — Bolzano–Weierstrass set version; Nested Intervals Theorem
- [[08-sequences-introduction]] — monotonic subsequence lemma, subsequences
- [[09-convergence-and-limits]] — $\varepsilon$-$N$ definition, convergent $\Rightarrow$ bounded, Cesàro mean
- [[13-series-convergence-tests]] — Cauchy criterion for series, absolute vs conditional convergence
