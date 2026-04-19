# 12. Infinite Series — Introduction

> **The central transition.** An infinite series is not a sum. Literally, the symbol $\sum_{n=1}^\infty a_n$ denotes a limit of finite sums — a limit of a specific sequence, namely the sequence of *partial sums*. Every theorem about series is, at bottom, a theorem about sequences in disguise; the axiom of completeness of $\mathbb{R}$ (via Cauchy sequences or the monotone convergence theorem) is the only ingredient making any of this nontrivial.
>
> This chapter sets out the foundational vocabulary — partial sums, convergence, the Cauchy criterion — and proves the core structural theorems (divergence test, linearity, comparison) whose contrapositives and extensions populate the remainder of the course.

---

## 12.1 What Is a Series?

> **Definition 12.1.1 (Series and terms).** Given a sequence $(a_n)_{n \geq 1}$ of real numbers, the formal expression
> $$\sum_{n=1}^{\infty} a_n \;=\; a_1 + a_2 + a_3 + \cdots$$
> is called an **infinite series**. The numbers $a_n$ are the **terms** of the series.

Notice: by itself, the symbol $\sum_{n=1}^\infty a_n$ is *formal* — it is not yet a real number, because we have not said what adding infinitely many reals means. Real-number addition is binary; it has no native definition for countably infinite operands.

> **Definition 12.1.2 (Partial sum).** The $N$-th **partial sum** of the series $\sum a_n$ is the finite sum
> $$S_N \;=\; \sum_{n=1}^{N} a_n \;=\; a_1 + a_2 + \cdots + a_N.$$
> The sequence $(S_N)_{N \geq 1}$ is the **sequence of partial sums**.

> **Definition 12.1.3 (Convergence of a series).** The series $\sum_{n=1}^\infty a_n$ **converges** (to the value $S$) if the sequence $(S_N)$ of partial sums converges (to $S$) in the sense of [[09-convergence-and-limits]]. Otherwise, the series **diverges**. When convergent we write
> $$\sum_{n=1}^\infty a_n \;:=\; \lim_{N \to \infty} S_N.$$

So a series is just a sequence in disguise — the sequence of its partial sums. All of the machinery from [[09-convergence-and-limits]] and [[10-cauchy-sequences-completeness]] — limit laws, the Bolzano–Weierstrass theorem, Cauchy completeness — carries over verbatim. When you see a statement about series, translate it mentally into a statement about the sequence $(S_N)$.

**Unpacking the definition (ε-N form).** The statement $\sum_{n=1}^\infty a_n = S$ means:
$$\forall \varepsilon > 0,\ \exists N_0 \in \mathbb{N},\ \forall N \geq N_0 :\ |S_N - S| < \varepsilon,$$
i.e., for every tolerance $\varepsilon$, eventually the partial sums lie within $\varepsilon$ of the putative sum $S$. This is precisely ε-N convergence applied to $(S_N)$.

**Remark (starting index).** Whether a series starts at $n = 0$, $n = 1$, or $n = k_0$ affects the *value* of the sum but not whether it converges: changing the starting index adds or subtracts finitely many terms, so the tail sequence of partial sums differs from the original only by a constant shift.

---

## 12.2 Basic Examples

### Geometric Series

> **Theorem 12.2.1 (Geometric Series).** Fix $r \in \mathbb{R}$. Then
> $$\sum_{n=0}^{\infty} r^n \;=\; \begin{cases} \dfrac{1}{1-r} & \text{if } |r| < 1, \\[0.3em] \text{diverges} & \text{if } |r| \geq 1. \end{cases}$$

**Proof.** Step-by-step analysis of partial sums.

*Step 1. Closed form for $S_N$ when $r \neq 1$.* Consider
$$S_N \;=\; 1 + r + r^2 + \cdots + r^N \;=\; \sum_{n=0}^{N} r^n.$$
Multiply both sides by $r$:
$$r S_N \;=\; r + r^2 + \cdots + r^{N+1}.$$
Subtracting, the inner terms telescope:
$$(1 - r) S_N \;=\; S_N - r S_N \;=\; 1 - r^{N+1}.$$
Since $r \neq 1$ we have $1 - r \neq 0$, so we may divide:
$$\boxed{S_N \;=\; \frac{1 - r^{N+1}}{1 - r} \quad \text{for } r \neq 1.}$$

*Step 2. Case $|r| < 1$.* We must show $r^{N+1} \to 0$. Given $\varepsilon > 0$: since $|r| < 1$, the sequence $|r|^{N+1}$ is positive and strictly decreasing. Taking logarithms (valid since $|r| > 0$; the case $r = 0$ is trivial), $|r|^{N+1} < \varepsilon$ iff $(N+1) \log|r| < \log \varepsilon$, iff (noting $\log|r| < 0$) $N + 1 > \log \varepsilon / \log |r|$. So choose
$$N_0 \;=\; \left\lceil \frac{\log \varepsilon}{\log |r|} \right\rceil.$$
For $N \geq N_0$: $|r^{N+1}| < \varepsilon$. Hence $r^{N+1} \to 0$. By the algebra of limits,
$$S_N \;=\; \frac{1 - r^{N+1}}{1 - r} \;\longrightarrow\; \frac{1 - 0}{1 - r} \;=\; \frac{1}{1 - r}.$$

*Step 3. Case $|r| > 1$.* Then $|r|^{N+1} \to \infty$ (explicit $N$: given $M > 0$, take $N_0 = \lceil \log M / \log |r| \rceil$; for $N \geq N_0$, $|r|^{N+1} \geq |r|^{N_0+1} > M$). Hence $|S_N| = |1 - r^{N+1}|/|1 - r| \geq (|r|^{N+1} - 1)/|1 - r| \to \infty$, so $(S_N)$ is unbounded and cannot converge.

*Step 4. Case $r = 1$.* Every term equals $1$, so $S_N = N + 1 \to \infty$: divergent.

*Step 5. Case $r = -1$.* Then $S_N = 1 - 1 + 1 - \cdots$ alternates: $S_0 = 1, S_1 = 0, S_2 = 1, \ldots$. The subsequence $(S_{2k}) = (1, 1, 1, \ldots)$ converges to $1$; the subsequence $(S_{2k+1}) = (0, 0, 0, \ldots)$ converges to $0$. Two subsequences with different limits $\Rightarrow (S_N)$ diverges.

Combining cases $3$–$5$: for $|r| \geq 1$ the series diverges. $\blacksquare$

**Verification.** For $r = 1/2$: $\sum_{n=0}^\infty (1/2)^n = 1/(1 - 1/2) = 2$. Check $S_0 = 1, S_1 = 3/2, S_2 = 7/4, S_3 = 15/8, \ldots, S_N = 2 - 2^{-N} \to 2$. ✓

**Shifted starting index.** If the sum starts at $n = 1$ rather than $n = 0$, then we subtract $r^0 = 1$:
$$\sum_{n=1}^{\infty} r^n \;=\; \left(\sum_{n=0}^{\infty} r^n\right) - 1 \;=\; \frac{1}{1-r} - 1 \;=\; \frac{r}{1-r} \quad (|r| < 1).$$

### Telescoping Series

> **Example 12.2.2.** $\displaystyle \sum_{n=1}^{\infty} \frac{1}{n(n+1)} \;=\; 1.$

**Proof.** *Setup.* Denote $a_n = 1/(n(n+1))$.

*Strategy.* Decompose via partial fractions and exploit massive cancellation in the partial sums.

*Step 1. Partial fraction decomposition.* Seek $A, B$ with $\frac{1}{n(n+1)} = \frac{A}{n} + \frac{B}{n+1}$. Clearing denominators: $1 = A(n+1) + Bn$. Set $n = 0$: $1 = A$. Set $n = -1$: $1 = -B$, so $B = -1$. Hence
$$\frac{1}{n(n+1)} \;=\; \frac{1}{n} - \frac{1}{n+1}.$$
*Verification:* $\frac{1}{n} - \frac{1}{n+1} = \frac{(n+1) - n}{n(n+1)} = \frac{1}{n(n+1)}$. ✓

*Step 2. Telescoping the partial sum.* Write out all terms:
$$S_N \;=\; \sum_{n=1}^{N}\left(\frac{1}{n} - \frac{1}{n+1}\right) \;=\; \left(1 - \frac{1}{2}\right) + \left(\frac{1}{2} - \frac{1}{3}\right) + \cdots + \left(\frac{1}{N} - \frac{1}{N+1}\right).$$
Every intermediate $-1/k$ cancels with a subsequent $+1/k$; only $+1$ (from the first group) and $-1/(N+1)$ (from the last) survive:
$$S_N \;=\; 1 - \frac{1}{N+1}.$$

*Step 3. Limit.* $\lim_{N \to \infty} (1 - 1/(N+1)) = 1 - 0 = 1$.

*Verification.* $S_1 = 1/2, S_2 = 2/3, S_3 = 3/4, \ldots, S_N = N/(N+1)$, matching the closed form. $\blacksquare$

**Interpretation.** A telescoping series arises whenever the terms admit the form $a_n = b_n - b_{n+1}$, in which case $S_N = b_1 - b_{N+1}$ and convergence reduces to determining $\lim b_{N+1}$. This is the simplest mechanism by which an infinite series can be summed in closed form.

### The Harmonic Series Diverges

> **Theorem 12.2.3 (Divergence of the harmonic series).** $\displaystyle \sum_{n=1}^{\infty} \frac{1}{n} \;=\; \infty.$

**Proof (Oresme, c. 1350).** *Strategy.* Group the terms into dyadic blocks and bound each block from below by $1/2$.

*Step 1. Block decomposition.* For $k \geq 1$ define the $k$-th block
$$B_k \;=\; \left\{\frac{1}{n} : 2^{k-1} < n \leq 2^k\right\} \;=\; \left\{\frac{1}{2^{k-1} + 1}, \frac{1}{2^{k-1} + 2}, \ldots, \frac{1}{2^k}\right\}.$$
Block $B_k$ contains exactly $2^k - 2^{k-1} = 2^{k-1}$ terms.

*Step 2. Lower bound for each block.* Within $B_k$, every term satisfies $1/n \geq 1/2^k$ (since $n \leq 2^k$). Therefore
$$\sum_{n = 2^{k-1} + 1}^{2^k} \frac{1}{n} \;\geq\; \underbrace{2^{k-1}}_{\text{count}} \cdot \underbrace{\frac{1}{2^k}}_{\text{min term}} \;=\; \frac{1}{2}.$$

*Step 3. Assembling $S_{2^K}$.* Write
$$S_{2^K} \;=\; 1 + \sum_{k=1}^{K} \left(\sum_{n=2^{k-1}+1}^{2^k} \frac{1}{n}\right) \;\geq\; 1 + K \cdot \frac{1}{2}.$$
Explicitly:
$$S_1 = 1,\ S_2 \geq 1 + \tfrac{1}{2},\ S_4 \geq 1 + \tfrac{2}{2},\ S_8 \geq 1 + \tfrac{3}{2},\ \ldots,\ S_{2^K} \geq 1 + \tfrac{K}{2}.$$

*Step 4. Unboundedness.* Given any $M > 0$, choose $K \geq 2M$. Then $S_{2^K} \geq 1 + K/2 \geq 1 + M > M$. Hence the subsequence $(S_{2^K})_{K \geq 1}$ is unbounded, so $(S_N)$ is unbounded, and therefore $(S_N)$ cannot converge (every convergent sequence is bounded). Since $(S_N)$ is also increasing (every $a_n = 1/n > 0$), $S_N \to +\infty$. $\blacksquare$

**Interpretative remark.** This is striking: the terms tend to $0$ ($1/n \to 0$) yet the sum is infinite. So **$a_n \to 0$ is not sufficient for convergence**. Oresme's argument shows the harmonic series diverges *logarithmically*: $S_N \sim \ln N + \gamma$, where $\gamma \approx 0.5772$ is the Euler–Mascheroni constant. Doubling $N$ adds only $\sim \ln 2 \approx 0.693$ to the partial sum — extremely slow growth, but unbounded.

### $p$-Series

> **Theorem 12.2.4 ($p$-Series Test).** $\displaystyle \sum_{n=1}^{\infty} \frac{1}{n^p}$ converges $\iff p > 1$.

Full proof deferred to [[13-series-convergence-tests]], where three approaches are given:
- *Integral test:* compare with $\int_1^\infty x^{-p} dx$, which equals $1/(p-1)$ for $p > 1$ and diverges otherwise.
- *Cauchy condensation:* the series converges iff $\sum 2^k \cdot 2^{-kp} = \sum 2^{k(1-p)}$ (geometric) converges, which happens iff $1 - p < 0$.
- *Comparison:* for $p \leq 1$, compare with the harmonic series; for $p > 1$, comparison with a geometric-type bound.

**Quick sketch for the two easy directions:**
- *$p \leq 0$:* terms satisfy $1/n^p \geq 1$ for all $n \geq 1$, so $a_n \not\to 0$; divergence by the $n$-th term test (§12.3).
- *$0 < p \leq 1$:* $1/n^p \geq 1/n$ for $n \geq 1$, so by comparison with the harmonic series, $\sum 1/n^p$ diverges.

**Famous values (Euler and beyond).**
- $\displaystyle \sum_{n=1}^{\infty} \frac{1}{n^2} \;=\; \frac{\pi^2}{6}$ — the **Basel problem**, solved by Euler in 1735.
- $\displaystyle \sum_{n=1}^{\infty} \frac{1}{n^4} \;=\; \frac{\pi^4}{90}$.
- More generally $\zeta(2k) = \frac{(-1)^{k+1} B_{2k} (2\pi)^{2k}}{2 (2k)!}$ in terms of Bernoulli numbers.
- $\displaystyle \sum_{n=1}^{\infty} \frac{1}{n^3} = \zeta(3)$, known (Apéry 1978) to be irrational — no closed form known.

---

## 12.3 The Divergence Test (Necessary Condition)

> **Theorem 12.3.1 (Necessary condition for convergence).** If $\sum_{n=1}^\infty a_n$ converges, then $\displaystyle \lim_{n \to \infty} a_n = 0$.

**Proof.** *Setup.* Suppose $\sum a_n$ converges, so $S_N \to S$ for some $S \in \mathbb{R}$.

*Key identity.* For $n \geq 2$,
$$a_n \;=\; S_n - S_{n-1}.$$
(For $n = 1$: $a_1 = S_1$, so this identity will be applied for $n \geq 2$; it does not affect the limit as $n \to \infty$.)

*Limit computation.* Since $(S_n)$ and $(S_{n-1})$ are both convergent subsequences (actually shifts) of $(S_N)$, both have the same limit $S$. By the algebra of limits,
$$\lim_{n \to \infty} a_n \;=\; \lim_{n \to \infty}(S_n - S_{n-1}) \;=\; S - S \;=\; 0. \qquad\blacksquare$$

> **Corollary 12.3.2 (Divergence test / "$n$-th term test").** If $a_n \not\to 0$, then $\sum a_n$ diverges.

This is the contrapositive of Theorem 12.3.1 and is the single most useful *quick-kill* in series analysis: before invoking any subtle test, check whether the terms tend to $0$.

### Examples of divergence by the $n$-th term test

- **$\sum (-1)^n$:** The terms oscillate between $+1$ and $-1$. The subsequences $(a_{2k}) = (1, 1, \ldots)$ and $(a_{2k+1}) = (-1, -1, \ldots)$ have different limits, so $a_n \not\to 0$. Diverges.
- **$\sum \dfrac{n}{n+1}$:** $a_n = 1 - 1/(n+1) \to 1 \neq 0$. Diverges.
- **$\sum \cos(1/n)$:** As $n \to \infty$, $1/n \to 0$ and $\cos$ is continuous at $0$, so $\cos(1/n) \to \cos 0 = 1 \neq 0$. Diverges.
- **$\sum (1 + 1/n)^n$:** $a_n \to e \neq 0$. Diverges.
- **$\sum n \sin(1/n)$:** Using $\sin x / x \to 1$ as $x \to 0$, $a_n = \sin(1/n)/(1/n) \to 1 \neq 0$. Diverges.

> **Warning (the converse fails!).** $a_n \to 0$ does **not** guarantee convergence.

*Counterexamples abound:*
- Harmonic: $\sum 1/n$ diverges despite $1/n \to 0$ (Theorem 12.2.3).
- $\sum 1/\sqrt{n}$ diverges ($p$-series with $p = 1/2$), despite $1/\sqrt n \to 0$.
- $\sum 1/(n \ln n)$ diverges (Example 5 below), again with $a_n \to 0$.

The $n$-th term test is a *one-way street*: $a_n \not\to 0 \Rightarrow$ divergence, but $a_n \to 0$ is inconclusive.

---

## 12.4 Cauchy Criterion for Series

> **Theorem 12.4.1 (Cauchy Criterion for Series).** The series $\sum_{n=1}^\infty a_n$ converges if and only if
> $$\forall \varepsilon > 0,\ \exists N \in \mathbb{N},\ \forall n > m \geq N :\ \left|\sum_{k=m+1}^{n} a_k\right| < \varepsilon.$$

**Proof.** *Strategy.* Recast series convergence as sequence convergence, then apply the Cauchy criterion for sequences (from [[10-cauchy-sequences-completeness]]) which is equivalent to convergence because $\mathbb{R}$ is complete.

*($\Rightarrow$) Assume $\sum a_n$ converges.* Then $(S_N)$ converges in $\mathbb{R}$. Every convergent real sequence is Cauchy: given $\varepsilon > 0$, there exists $N$ such that for all $n, m \geq N$, $|S_n - S_m| < \varepsilon$. For $n > m \geq N$,
$$S_n - S_m \;=\; \sum_{k=1}^{n} a_k - \sum_{k=1}^{m} a_k \;=\; \sum_{k=m+1}^{n} a_k.$$
Hence $\left|\sum_{k=m+1}^{n} a_k\right| = |S_n - S_m| < \varepsilon$, as required.

*($\Leftarrow$) Assume the Cauchy tail condition.* Given $\varepsilon > 0$, choose $N$ from the hypothesis. For any $n > m \geq N$, $|S_n - S_m| = |\sum_{k=m+1}^n a_k| < \varepsilon$; the case $n = m$ is trivial ($0 < \varepsilon$); the case $m > n$ is handled by swapping. Hence $(S_N)$ is Cauchy. By completeness of $\mathbb{R}$, $(S_N)$ converges, i.e., $\sum a_n$ converges. $\blacksquare$

**Remark (intrinsic criterion).** Observe that the Cauchy criterion does **not** require knowing the limit $S$ in advance — convergence is characterized entirely by internal behavior of the partial sums. This is why it is so powerful: we can prove convergence without having any candidate value.

**Application 1 — re-deriving the divergence test.** Take the Cauchy criterion with $n = m + 1$: for all $m \geq N$,
$$|a_{m+1}| \;=\; \left|\sum_{k=m+1}^{m+1} a_k\right| \;<\; \varepsilon.$$
Thus $a_m \to 0$. So Theorem 12.3.1 is a direct special case of Theorem 12.4.1.

**Application 2 — disproving convergence.** Often easier than finding a candidate limit: to show $\sum a_n$ diverges, find $\varepsilon_0 > 0$ such that for every $N$, there exist $n > m \geq N$ with $|\sum_{k=m+1}^n a_k| \geq \varepsilon_0$. We use this exact structure to disprove the convergence of $\sum 1/(n \ln n)$ in Example 5.

**Application 3 — tail-to-zero formulation.** Equivalently: $\sum a_n$ converges iff for every $\varepsilon > 0$, there exists $N$ such that $|\text{any consecutive block past index } N| < \varepsilon$. "Tails are small."

---

## 12.5 Linearity and Elementary Properties

> **Theorem 12.5.1 (Linearity of series).** Suppose $\sum_{n=1}^\infty a_n = A$ and $\sum_{n=1}^\infty b_n = B$ both converge, and let $c \in \mathbb{R}$. Then both of the following series converge:
> 1. $\displaystyle \sum_{n=1}^\infty (a_n + b_n) \;=\; A + B.$
> 2. $\displaystyle \sum_{n=1}^\infty c \, a_n \;=\; c A.$

**Proof.** Let $A_N = \sum_{k=1}^N a_k$ and $B_N = \sum_{k=1}^N b_k$ denote the partial sums. By hypothesis $A_N \to A$ and $B_N \to B$.

*(1) Sum.* For any finite $N$,
$$\sum_{k=1}^{N}(a_k + b_k) \;=\; \sum_{k=1}^N a_k + \sum_{k=1}^N b_k \;=\; A_N + B_N$$
(finite sums commute with addition). By the algebra of sequence limits (sum rule for convergent sequences), $A_N + B_N \to A + B$. Hence the partial sums of $\sum(a_k + b_k)$ converge to $A + B$.

*(2) Scalar multiple.* For any $N$,
$$\sum_{k=1}^N c a_k \;=\; c \sum_{k=1}^N a_k \;=\; c \cdot A_N,$$
using distributivity of multiplication over finite sums. By the scalar-multiple rule for sequence limits, $c A_N \to c A$. $\blacksquare$

**Caveat.** Linearity requires *both* series to converge first. Without that, $\sum(a_n + b_n)$ may converge even when $\sum a_n$ and $\sum b_n$ individually diverge. Example: $a_n = 1, b_n = -1$. Neither $\sum a_n$ nor $\sum b_n$ converges, but $\sum(a_n + b_n) = \sum 0 = 0$ converges trivially.

### Adding, removing, or modifying finitely many terms

**Lemma 12.5.2.** Convergence of $\sum_{n=1}^\infty a_n$ is unaffected by modifying, removing, or prepending finitely many terms. Only the *value* of the sum changes (by the net modification).

*Proof.* Let $(a'_n)$ differ from $(a_n)$ only for $n \leq K$ (finitely many indices). For $N > K$,
$$S'_N - S_N \;=\; \sum_{k=1}^K (a'_k - a_k) \;=:\; \Delta,$$
a constant independent of $N$. So $(S'_N)$ and $(S_N)$ differ by the constant $\Delta$ for all $N > K$; one converges iff the other does, and the sums differ by $\Delta$. $\blacksquare$

### Non-commutativity alert: rearrangement

A convergent series that is not *absolutely* convergent is **not** invariant under rearrangement. In stark contrast to finite sums, one can permute the terms of a conditionally convergent series to make the resulting series:
- converge to any desired real value,
- diverge to $+\infty$,
- diverge to $-\infty$,
- or oscillate without limit.

This is **Riemann's rearrangement theorem** — see [[15-rearrangement-of-series]]. The upshot: series notation is fundamentally *ordered*; "infinite sum" is not a well-defined set-theoretic object without additional assumptions (such as absolute convergence).

---

## 12.6 Series of Positive Terms

Many tests and intuitions apply specifically to series $\sum a_n$ with $a_n \geq 0$ (or, more generally, $a_n \geq 0$ eventually — all but finitely many).

> **Proposition 12.6.1 (Monotone convergence for series).** If $a_n \geq 0$ for all $n$, then
> $$\sum_{n=1}^\infty a_n \text{ converges} \iff (S_N) \text{ is bounded above}.$$

**Proof.** $(\Rightarrow)$ Every convergent real sequence is bounded, so this direction is immediate (Theorem: convergent $\Rightarrow$ bounded, from [[09-convergence-and-limits]]).

$(\Leftarrow)$ Since $a_n \geq 0$, we have $S_N - S_{N-1} = a_N \geq 0$, so $(S_N)$ is (weakly) increasing. An increasing, bounded-above real sequence converges by the **Monotone Convergence Theorem** ([[09-convergence-and-limits]]) — specifically, to $\sup_N S_N$. $\blacksquare$

**Operational reading.** This is the cleanest criterion for positive-term series: "show the partial sums stay bounded, and convergence is automatic." You don't need a candidate sum; you need only a ceiling.

**Notation.** For series of non-negative terms, write $\sum a_n < \infty$ to indicate convergence (the sum is a finite real number), and $\sum a_n = \infty$ to indicate divergence (necessarily to $+\infty$; oscillation is impossible by monotonicity). Example: $\sum 1/n = \infty$, $\sum 1/n^2 < \infty$.

---

## 12.7 Comparison Test (Preliminary)

> **Theorem 12.7.1 (Comparison Test).** Suppose $0 \leq a_n \leq b_n$ for all $n$ (or eventually — i.e., for all $n \geq N_0$).
> 1. If $\sum b_n < \infty$, then $\sum a_n < \infty$.
> 2. If $\sum a_n = \infty$, then $\sum b_n = \infty$.

**Proof.** Statements (1) and (2) are contrapositives of each other, so we prove (1).

*Step 1. Partial sums inequality.* Let $S_N^a = \sum_{k=1}^N a_k$ and $S_N^b = \sum_{k=1}^N b_k$. The inequality $0 \leq a_k \leq b_k$, summed from $k = 1$ to $N$, gives
$$0 \;\leq\; S_N^a \;\leq\; S_N^b \quad \text{for all } N.$$
(If the inequality $a_k \leq b_k$ only holds for $k \geq N_0$, then $S_N^a - S_N^b$ differs from $\sum_{k=N_0}^N (a_k - b_k) \leq 0$ by a constant; the argument goes through.)

*Step 2. Bounded-above.* $\sum b_n < \infty$ means $(S_N^b)$ converges, hence is bounded: $S_N^b \leq M$ for some $M < \infty$ and all $N$. By Step 1, $S_N^a \leq S_N^b \leq M$ for all $N$.

*Step 3. Convergence.* $(S_N^a)$ is increasing (since $a_n \geq 0$) and bounded above by $M$. By Monotone Convergence, $(S_N^a)$ converges, i.e., $\sum a_n < \infty$. $\blacksquare$

### Examples

- **$\displaystyle \sum_{n=1}^\infty \frac{1}{n^2 + 1}$ converges.** We have $0 \leq \frac{1}{n^2 + 1} \leq \frac{1}{n^2}$. Since $\sum 1/n^2 < \infty$ ($p$-series with $p = 2$), comparison gives convergence.

- **$\displaystyle \sum_{n=1}^\infty \frac{1}{\sqrt n}$ diverges.** We have $\frac{1}{\sqrt n} \geq \frac{1}{n}$ for $n \geq 1$ (since $\sqrt n \leq n$), and $\sum 1/n$ diverges. Comparison: $\sum 1/\sqrt n$ diverges.

- **$\displaystyle \sum_{n=1}^\infty \frac{\sin^2 n}{n^2}$ converges.** Since $0 \leq \sin^2 n \leq 1$, we have $0 \leq \sin^2 n / n^2 \leq 1/n^2$, and $\sum 1/n^2 < \infty$ allows comparison.

Full treatment (limit comparison, ratio, root, integral, Cauchy condensation, Raabe, Gauss) in [[13-series-convergence-tests]].

---

## 12.8 Important Expansions

These series appear constantly and should be recognized:

- **Exponential:** $\displaystyle e^x \;=\; \sum_{n=0}^{\infty} \frac{x^n}{n!}$ — converges for every $x \in \mathbb{R}$ (ratio test: $|x/(n+1)| \to 0 < 1$).
- **Sine:** $\displaystyle \sin x \;=\; \sum_{n=0}^{\infty} \frac{(-1)^n x^{2n+1}}{(2n+1)!}$ — converges for every $x \in \mathbb{R}$.
- **Cosine:** $\displaystyle \cos x \;=\; \sum_{n=0}^{\infty} \frac{(-1)^n x^{2n}}{(2n)!}$ — converges for every $x \in \mathbb{R}$.
- **Natural logarithm:** $\displaystyle \ln(1 + x) \;=\; \sum_{n=1}^{\infty} \frac{(-1)^{n+1} x^n}{n}$ — converges for $-1 < x \leq 1$ (divergent at $x = -1$ by the harmonic series; conditionally convergent at $x = 1$ by the alternating series test, [[14-alternating-and-absolute-convergence]]).
- **Geometric:** $\displaystyle \frac{1}{1 - x} \;=\; \sum_{n=0}^{\infty} x^n$ — for $|x| < 1$ (Theorem 12.2.1).
- **Binomial ($\alpha \in \mathbb{R}$):** $\displaystyle (1 + x)^\alpha \;=\; \sum_{n=0}^{\infty} \binom{\alpha}{n} x^n$ for $|x| < 1$, where $\binom{\alpha}{n} = \alpha(\alpha - 1) \cdots (\alpha - n + 1)/n!$. For $\alpha \in \mathbb{Z}_{\geq 0}$ this reduces to the finite binomial theorem.

These expansions are introduced now as *familiar identities*; rigorous convergence proofs (radius of convergence, derivative-integration term by term, Taylor's theorem with remainder) fall under the theory of **power series** — see [[13-series-convergence-tests]] for the ratio test and [[14-alternating-and-absolute-convergence]] for absolute convergence.

---

## Worked Examples

**Example 1.** Determine the sum of $\displaystyle \sum_{n=1}^{\infty} \frac{1}{(2n-1)(2n+1)}$.

*Setup.* Terms $a_n = 1/((2n-1)(2n+1))$: the first few are $1/3, 1/15, 1/35, 1/63, \ldots$.

*Strategy.* Partial fractions to produce a telescoping decomposition.

*Computation — Step 1. Partial fraction decomposition.* Seek $A, B$ with
$$\frac{1}{(2n - 1)(2n + 1)} \;=\; \frac{A}{2n - 1} + \frac{B}{2n + 1}.$$
Clearing denominators: $1 = A(2n + 1) + B(2n - 1)$. Setting $n = 1/2$: $1 = 2A$, so $A = 1/2$. Setting $n = -1/2$: $1 = -2B$, so $B = -1/2$. Hence
$$\frac{1}{(2n - 1)(2n + 1)} \;=\; \frac{1}{2}\left(\frac{1}{2n - 1} - \frac{1}{2n + 1}\right).$$
*Verification:* $\frac{1}{2}\left(\frac{1}{2n-1} - \frac{1}{2n+1}\right) = \frac{1}{2} \cdot \frac{(2n+1) - (2n-1)}{(2n-1)(2n+1)} = \frac{1}{2} \cdot \frac{2}{(2n-1)(2n+1)}$. ✓

*Step 2. Telescoping the partial sum.*
$$S_N \;=\; \sum_{n=1}^{N} \frac{1}{2}\left(\frac{1}{2n-1} - \frac{1}{2n+1}\right) \;=\; \frac{1}{2}\sum_{n=1}^{N}\left(\frac{1}{2n-1} - \frac{1}{2n+1}\right).$$
Expanding:
$$\sum_{n=1}^N \left(\frac{1}{2n-1} - \frac{1}{2n+1}\right) = \left(1 - \frac{1}{3}\right) + \left(\frac{1}{3} - \frac{1}{5}\right) + \left(\frac{1}{5} - \frac{1}{7}\right) + \cdots + \left(\frac{1}{2N-1} - \frac{1}{2N+1}\right).$$
Internal cancellation leaves $1 - 1/(2N + 1)$. Hence
$$S_N \;=\; \frac{1}{2}\left(1 - \frac{1}{2N+1}\right).$$

*Step 3. Limit.* $\lim_{N \to \infty} S_N = \frac{1}{2}(1 - 0) = \frac{1}{2}$.

*Verification.* $S_1 = \frac{1}{2}(1 - 1/3) = 1/3$. ✓ Direct check: $a_1 = 1/(1 \cdot 3) = 1/3$. ✓

*Interpretation.* The series $\sum 1/((2n-1)(2n+1)) = 1/2$. Since $1/((2n-1)(2n+1)) \sim 1/(4n^2)$ as $n \to \infty$, one sees this is essentially a finer version of $\sum 1/(4n^2) = \pi^2/24$, but with a cleaner closed form obtained via telescoping. $\blacksquare$

---

**Example 2.** Does $\displaystyle \sum_{n=1}^{\infty}\left(1 + \frac{1}{n}\right)^n$ converge?

*Setup.* Terms $a_n = (1 + 1/n)^n$.

*Strategy.* Apply the divergence test (Corollary 12.3.2): if $a_n \not\to 0$, the series diverges.

*Computation.* A classical result from [[09-convergence-and-limits]]: the sequence $(1 + 1/n)^n$ is monotonically increasing and bounded above, converging to Euler's number,
$$\lim_{n \to \infty}\left(1 + \frac{1}{n}\right)^n \;=\; e \;\approx\; 2.71828\ldots$$
In particular $e \neq 0$, so $a_n \not\to 0$.

*Conclusion.* By the divergence test, the series $\sum (1 + 1/n)^n$ diverges. Indeed, $S_N \geq N \cdot 2 = 2N \to \infty$ since $a_n \geq 2$ for all $n \geq 1$ (the sequence is $\geq a_1 = 2$).

*Interpretation.* The terms actually *grow* toward $e$, so the partial sums grow approximately like $e \cdot N$. $\blacksquare$

---

**Example 3.** Sum $\displaystyle \sum_{n=1}^{\infty}\frac{2^n + 3^n}{5^n}$.

*Setup.* Terms $a_n = (2^n + 3^n)/5^n = (2/5)^n + (3/5)^n$.

*Strategy.* Exploit linearity (Theorem 12.5.1) to split into two geometric series, then sum each via Theorem 12.2.1.

*Computation — Step 1. Splitting.* Define $b_n = (2/5)^n$ and $c_n = (3/5)^n$. Both have ratios $|r| < 1$, so both $\sum b_n$ and $\sum c_n$ converge. By linearity,
$$\sum_{n=1}^\infty \frac{2^n + 3^n}{5^n} \;=\; \sum_{n=1}^\infty (2/5)^n + \sum_{n=1}^\infty (3/5)^n.$$

*Step 2. Each geometric sum.* Starting at $n = 1$, the formula is $\sum_{n=1}^\infty r^n = r/(1 - r)$:
$$\sum_{n=1}^\infty (2/5)^n \;=\; \frac{2/5}{1 - 2/5} \;=\; \frac{2/5}{3/5} \;=\; \frac{2}{3}.$$
$$\sum_{n=1}^\infty (3/5)^n \;=\; \frac{3/5}{1 - 3/5} \;=\; \frac{3/5}{2/5} \;=\; \frac{3}{2}.$$

*Step 3. Total.* $\frac{2}{3} + \frac{3}{2} = \frac{4}{6} + \frac{9}{6} = \frac{13}{6}$.

*Verification.* Compute $S_1 = (2 + 3)/5 = 1$. Then $S_2 = 1 + (4 + 9)/25 = 1 + 13/25 = 38/25 = 1.52$. Target: $13/6 \approx 2.1667$. The tail $\sum_{n=3}^\infty \leq \sum_{n=3}^\infty 2 \cdot (3/5)^n = 2 \cdot (3/5)^3/(1 - 3/5) = 2 \cdot (27/125)/(2/5) = 2 \cdot 27/50 = 27/25 = 1.08$. Adding: $S_2 + \text{tail-bound} = 1.52 + 1.08 = 2.60 \geq 2.167$. ✓ (A rough sanity check.)

*Interpretation.* Splitting a series into a finite sum of geometric pieces is a canonical application of linearity. The hypothesis that *both pieces converge* is essential for linearity to apply. $\blacksquare$

---

**Example 4.** Show that $\displaystyle \sum_{n=1}^{\infty}\frac{n}{2^n}$ converges and find its sum.

*Setup.* Let $S = \sum_{n=1}^\infty n/2^n$. First we must establish convergence; then compute the value.

*Strategy.* Convergence: comparison with a geometric series. Value: exploit the telescoping structure obtained by multiplying by $2$ and reindexing.

*Convergence.* For $n \geq 1$, the ratio $a_{n+1}/a_n = \frac{(n+1)/2^{n+1}}{n/2^n} = \frac{n+1}{2n} \to \frac{1}{2} < 1$. By the ratio test (see [[13-series-convergence-tests]]), $\sum n/2^n$ converges absolutely. (Equivalently: for large $n$, $a_{n+1}/a_n < 3/4$, so $a_n \leq C (3/4)^{n}$, allowing comparison with a geometric series.)

*Computation — Step 1. Setup the trick.* Since the series converges absolutely, we may legitimately rearrange and shift indices. Compute
$$2 S \;=\; 2 \sum_{n=1}^\infty \frac{n}{2^n} \;=\; \sum_{n=1}^\infty \frac{n}{2^{n-1}}.$$

*Step 2. Shift index.* Let $m = n - 1$, so $n = m + 1$ and $n$ ranges over $\{1, 2, \ldots\}$ iff $m$ ranges over $\{0, 1, 2, \ldots\}$:
$$2S \;=\; \sum_{m=0}^\infty \frac{m+1}{2^m} \;=\; \sum_{m=0}^\infty \frac{1}{2^m} + \sum_{m=0}^\infty \frac{m}{2^m}.$$

*Step 3. Evaluate each piece.*
- $\sum_{m=0}^\infty 1/2^m = 1/(1 - 1/2) = 2$ (geometric, Theorem 12.2.1).
- $\sum_{m=0}^\infty m/2^m = 0 + \sum_{m=1}^\infty m/2^m = 0 + S$ (the $m = 0$ term contributes $0$).

Hence $2S = 2 + S$, giving $S = 2$.

*Verification.* Compute first partial sums: $S_1 = 1/2 = 0.5$. $S_2 = 1/2 + 2/4 = 1$. $S_3 = 1 + 3/8 = 1.375$. $S_4 = 1.375 + 4/16 = 1.625$. $S_5 = 1.625 + 5/32 \approx 1.781$. Matching the limit $S = 2$ from below — consistent. ✓

Another check via direct closed form: differentiating $\sum_{n=0}^\infty x^n = 1/(1-x)$ gives $\sum_{n=1}^\infty n x^{n-1} = 1/(1-x)^2$. Multiply by $x$: $\sum_{n=1}^\infty n x^n = x/(1-x)^2$. At $x = 1/2$: $(1/2)/(1/2)^2 = (1/2)/(1/4) = 2$. ✓

*Interpretation.* The algebraic trick of "doubling and shifting" is a classical method for summing $\sum n r^n$. Legitimacy requires absolute convergence — otherwise the rearrangement used in Step 2 is not justified (see [[15-rearrangement-of-series]]). $\blacksquare$

---

**Example 5.** Show $\displaystyle \sum_{n=2}^{\infty}\frac{1}{n \ln n}$ diverges.

*Setup.* Terms $a_n = 1/(n \ln n)$, defined for $n \geq 2$ (where $\ln n > 0$). Note $a_n \to 0$, so the divergence test is inconclusive.

*Strategy A — Integral test.* Compare $\sum_{n=2}^\infty 1/(n \ln n)$ with the integral
$$\int_2^\infty \frac{dx}{x \ln x}.$$
Substitute $u = \ln x$, $du = dx/x$:
$$\int_2^\infty \frac{dx}{x \ln x} \;=\; \int_{\ln 2}^\infty \frac{du}{u} \;=\; \lim_{R \to \infty} [\ln u]_{\ln 2}^R \;=\; \lim_{R \to \infty}(\ln R - \ln \ln 2) \;=\; \infty.$$
Since the integrand $1/(x \ln x)$ is positive and decreasing for $x \geq 2$ (derivative: $-(1 + \ln x)/(x \ln x)^2 < 0$ for $x \geq 2$ since $\ln x \geq \ln 2 > 0$), the integral test applies:
$$\sum_{n=2}^N \frac{1}{n \ln n} \;\geq\; \int_2^{N+1} \frac{dx}{x \ln x} \;=\; \ln \ln (N+1) - \ln \ln 2 \;\to\; \infty.$$
Hence $\sum 1/(n \ln n) = \infty$. (Full integral test: [[13-series-convergence-tests]].)

*Strategy B — Cauchy criterion (direct).* We show the series does **not** satisfy the Cauchy criterion, hence diverges. Specifically, we produce a fixed $\varepsilon_0 > 0$ and, for every $N$, indices $n > m \geq N$ with $\sum_{k=m+1}^n a_k \geq \varepsilon_0$.

*Construction.* Take $m = n_0$ and $n = 2 n_0$ (where $n_0$ is to be chosen $\geq N$). Then the block $\sum_{k = n_0 + 1}^{2 n_0} \frac{1}{k \ln k}$ has $n_0$ terms, each bounded below by the smallest, $1/(2 n_0 \ln(2 n_0))$. Hence
$$\sum_{k = n_0 + 1}^{2 n_0} \frac{1}{k \ln k} \;\geq\; n_0 \cdot \frac{1}{2 n_0 \ln(2 n_0)} \;=\; \frac{1}{2 \ln(2 n_0)}.$$

*Issue.* As $n_0 \to \infty$, this lower bound goes to $0$, so it does *not* immediately give a fixed lower bound. Refine the construction: for each $N$, we want a block of sufficient length to accumulate a fixed amount.

*Refined construction.* Use dyadic blocks as in Oresme's argument. For $k \geq 2$ let $B_k = \{n : 2^{k-1} < n \leq 2^k\}$; on $B_k$, $1/(n \ln n) \geq 1/(2^k \ln 2^k) = 1/(2^k \cdot k \ln 2)$, and $|B_k| = 2^{k-1}$. So
$$\sum_{n = 2^{k-1} + 1}^{2^k} \frac{1}{n \ln n} \;\geq\; \frac{2^{k-1}}{2^k \cdot k \ln 2} \;=\; \frac{1}{2 k \ln 2}.$$

Hence the total over $k = 2, \ldots, K$:
$$\sum_{n = 3}^{2^K} \frac{1}{n \ln n} \;\geq\; \sum_{k=2}^K \frac{1}{2 k \ln 2} \;=\; \frac{1}{2 \ln 2}\sum_{k=2}^K \frac{1}{k}.$$
The right side is $\frac{1}{2 \ln 2}(H_K - 1)$ where $H_K$ is the $K$-th harmonic number, which $\to \infty$. So $\sum 1/(n \ln n) = \infty$. ✓

*Interpretation.* The series $\sum 1/(n (\ln n)^p)$ converges iff $p > 1$ (so-called Bertrand series). For $p = 1$, we get the present example, which diverges extremely slowly — $S_N \sim \ln \ln N$, meaning it takes roughly $e^{e^M}$ terms to exceed $M$. For $N = 10^{100}$, $S_N \approx \ln \ln 10^{100} = \ln(100 \ln 10) \approx \ln 230 \approx 5.4$. Astonishingly slow. $\blacksquare$

---

## Practice Problems

1. Determine whether each series converges; find the sum when possible.
   - (a) $\displaystyle \sum_{n=1}^\infty (1/3)^n$
   - (b) $\displaystyle \sum_{n=1}^\infty \ln\!\left(1 + \frac{1}{n}\right)$
   - (c) $\displaystyle \sum_{n=1}^\infty \frac{1}{n^2 + n}$
   - (d) $\displaystyle \sum_{n=1}^\infty (-1)^n$

2. Prove that $\displaystyle \sum_{n=1}^\infty \frac{1}{n(n+1)(n+2)} = \frac{1}{4}$.

3. Show that if $a_n \geq 0$ and $\sum a_n$ converges, then $\sum a_n^2$ converges.

4. Give a counterexample to show: $\sum a_n$ convergent and $(b_n)$ bounded does **not** imply $\sum a_n b_n$ convergent.

5. Find all $x \in \mathbb{R}$ for which $\sum_{n=0}^\infty x^n/n!$ converges (this defines $e^x$).

### Solutions

**Solution 1(a).** $\sum_{n=1}^\infty (1/3)^n$.

*Setup.* Geometric series with ratio $r = 1/3$, starting at $n = 1$.

*Strategy.* Apply Theorem 12.2.1 (or its $n=1$ variant).

*Computation.* Since $|r| = 1/3 < 1$, the series converges, and starting at $n = 1$ the formula is
$$\sum_{n=1}^\infty r^n = \frac{r}{1 - r} = \frac{1/3}{1 - 1/3} = \frac{1/3}{2/3} = \frac{1}{2}.$$

*Verification.* $S_1 = 1/3, S_2 = 1/3 + 1/9 = 4/9, S_3 = 4/9 + 1/27 = 13/27$. Target: $0.5$. Values approach $0.5$ from below. ✓ Closed form: $S_N = \frac{1/3 (1 - (1/3)^N)}{1 - 1/3} = \frac{1}{2}(1 - 3^{-N}) \to 1/2$. ✓

*Conclusion.* Converges; sum $= 1/2$. $\blacksquare$

---

**Solution 1(b).** $\sum_{n=1}^\infty \ln(1 + 1/n)$.

*Setup.* Terms $a_n = \ln(1 + 1/n) = \ln((n+1)/n) = \ln(n+1) - \ln n$.

*Strategy.* Recognize as telescoping; compute the partial sum in closed form.

*Computation — Step 1. Telescoping.*
$$S_N \;=\; \sum_{n=1}^{N} [\ln(n+1) - \ln n].$$
Writing out: $(\ln 2 - \ln 1) + (\ln 3 - \ln 2) + \cdots + (\ln(N+1) - \ln N) = \ln(N+1) - \ln 1 = \ln(N+1)$.

*Step 2. Limit.* $\ln(N + 1) \to \infty$ as $N \to \infty$.

*Verification.* Divergence test cross-check: $a_n = \ln(1 + 1/n) \to \ln 1 = 0$, so the divergence test is inconclusive (and indeed the series diverges despite $a_n \to 0$, analogous to the harmonic series). This is expected because $\ln(1 + 1/n) \sim 1/n$ (Taylor), so the series behaves like the harmonic series asymptotically.

*Conclusion.* Diverges to $+\infty$. $\blacksquare$

---

**Solution 1(c).** $\sum_{n=1}^\infty \frac{1}{n^2 + n}$.

*Setup.* Terms $a_n = 1/(n^2 + n) = 1/(n(n+1))$.

*Strategy.* This is exactly Example 12.2.2 — telescope via $\frac{1}{n(n+1)} = \frac{1}{n} - \frac{1}{n+1}$.

*Computation.* Partial sum $S_N = 1 - 1/(N+1) \to 1$.

*Verification.* $S_1 = 1 - 1/2 = 1/2$; directly $a_1 = 1/(1 \cdot 2) = 1/2$. ✓

*Conclusion.* Converges; sum $= 1$. $\blacksquare$

---

**Solution 1(d).** $\sum_{n=1}^\infty (-1)^n$.

*Setup.* Terms $a_n = (-1)^n$.

*Strategy.* Divergence test.

*Computation.* The subsequences $a_{2k} = 1$ and $a_{2k+1} = -1$ converge to different limits, so $a_n$ does not converge, i.e., $a_n \not\to 0$.

*Conclusion.* Diverges by Corollary 12.3.2. $\blacksquare$

*Secondary check.* Partial sums: $S_N = \sum_{n=1}^N (-1)^n$ equals $0$ if $N$ even, $-1$ if $N$ odd. Two distinct subsequential limits, so $(S_N)$ diverges directly.

---

**Solution 2.** Prove $\sum_{n=1}^\infty \frac{1}{n(n+1)(n+2)} = \frac{1}{4}$.

*Setup.* Terms $a_n = 1/(n(n+1)(n+2))$. First few: $1/6, 1/24, 1/60, \ldots$.

*Strategy.* Partial fractions give a decomposition that telescopes.

*Computation — Step 1. Partial fractions.* Seek $A, B, C$ with
$$\frac{1}{n(n+1)(n+2)} \;=\; \frac{A}{n} + \frac{B}{n+1} + \frac{C}{n+2}.$$
Clearing denominators: $1 = A(n+1)(n+2) + Bn(n+2) + Cn(n+1)$.

Set $n = 0$: $1 = 2A$, so $A = 1/2$.
Set $n = -1$: $1 = -B$, so $B = -1$.
Set $n = -2$: $1 = 2C$, so $C = 1/2$.

Verification: $\frac{1}{2n} - \frac{1}{n+1} + \frac{1}{2(n+2)}$. Common denominator $2n(n+1)(n+2)$:
$$= \frac{(n+1)(n+2) - 2n(n+2) + n(n+1)}{2n(n+1)(n+2)}.$$
Numerator: $(n+1)(n+2) - 2n(n+2) + n(n+1) = (n^2 + 3n + 2) - (2n^2 + 4n) + (n^2 + n) = 2 - 0 = ?$

Let me recompute: $(n+1)(n+2) = n^2 + 3n + 2$; $2n(n+2) = 2n^2 + 4n$; $n(n+1) = n^2 + n$. Sum: $(n^2 + 3n + 2) - (2n^2 + 4n) + (n^2 + n) = (n^2 - 2n^2 + n^2) + (3n - 4n + n) + 2 = 0 + 0 + 2 = 2$. 

So the sum is $\frac{2}{2n(n+1)(n+2)} = \frac{1}{n(n+1)(n+2)}$. ✓

*Step 2. Regroup for telescoping.* Write
$$\frac{1}{n(n+1)(n+2)} \;=\; \frac{1}{2}\left[\frac{1}{n} - \frac{1}{n+1}\right] - \frac{1}{2}\left[\frac{1}{n+1} - \frac{1}{n+2}\right].$$
*Check:* $\frac{1}{2}(\frac{1}{n} - \frac{1}{n+1}) - \frac{1}{2}(\frac{1}{n+1} - \frac{1}{n+2}) = \frac{1}{2n} - \frac{1}{2(n+1)} - \frac{1}{2(n+1)} + \frac{1}{2(n+2)} = \frac{1}{2n} - \frac{1}{n+1} + \frac{1}{2(n+2)}$, matching Step 1. ✓

*Step 3. Telescoping partial sum.* Let $T_N = \sum_{n=1}^N (\frac{1}{n} - \frac{1}{n+1}) = 1 - \frac{1}{N+1}$ and $U_N = \sum_{n=1}^N (\frac{1}{n+1} - \frac{1}{n+2}) = \frac{1}{2} - \frac{1}{N+2}$ (shift of $T$).

Then
$$S_N \;=\; \frac{1}{2} T_N - \frac{1}{2} U_N \;=\; \frac{1}{2}\left(1 - \frac{1}{N+1}\right) - \frac{1}{2}\left(\frac{1}{2} - \frac{1}{N+2}\right).$$

*Step 4. Limit.* As $N \to \infty$: $\frac{1}{N+1} \to 0$ and $\frac{1}{N+2} \to 0$, so
$$S_N \;\longrightarrow\; \frac{1}{2}(1) - \frac{1}{2} \cdot \frac{1}{2} \;=\; \frac{1}{2} - \frac{1}{4} \;=\; \frac{1}{4}.$$

*Verification.* $S_1 = 1/6$. From closed form: $S_1 = \frac{1}{2}(1 - 1/2) - \frac{1}{2}(1/2 - 1/3) = \frac{1}{4} - \frac{1}{2} \cdot \frac{1}{6} = \frac{1}{4} - \frac{1}{12} = \frac{3 - 1}{12} = \frac{2}{12} = \frac{1}{6}$. ✓

*Conclusion.* $\sum_{n=1}^\infty 1/(n(n+1)(n+2)) = 1/4$. $\blacksquare$

---

**Solution 3.** If $a_n \geq 0$ and $\sum a_n$ converges, then $\sum a_n^2$ converges.

*Setup.* Given: $a_n \geq 0$ for all $n$, and $\sum_{n=1}^\infty a_n = A < \infty$.

*Goal.* Prove $\sum a_n^2 < \infty$.

*Strategy.* Show that eventually $a_n^2 \leq a_n$ (because the terms are small), then apply the comparison test.

*Computation — Step 1. Terms tend to $0$.* By Theorem 12.3.1 (divergence test in its positive form), convergence of $\sum a_n$ forces $a_n \to 0$.

*Step 2. Eventually $a_n \leq 1$.* Take $\varepsilon = 1$ in the ε-N definition: there exists $N$ such that for all $n \geq N$, $|a_n - 0| < 1$, i.e., $0 \leq a_n < 1$ (using $a_n \geq 0$).

*Step 3. Eventually $a_n^2 \leq a_n$.* For $n \geq N$, since $0 \leq a_n \leq 1$,
$$a_n^2 \;=\; a_n \cdot a_n \;\leq\; a_n \cdot 1 \;=\; a_n.$$
Also $a_n^2 \geq 0$.

*Step 4. Comparison test.* On $n \geq N$, $0 \leq a_n^2 \leq a_n$. The tail $\sum_{n=N}^\infty a_n$ converges (tails of convergent series converge; alternatively, apply Lemma 12.5.2). By the comparison test (Theorem 12.7.1), $\sum_{n=N}^\infty a_n^2 < \infty$. Adding back the finite prefix $\sum_{n=1}^{N-1} a_n^2$ (a finite sum of non-negative numbers, hence finite), the full series $\sum_{n=1}^\infty a_n^2 < \infty$.

*Interpretation.* $\ell^1 \subset \ell^2$ for sequences (of non-negative terms). The converse fails: $a_n = 1/n$ gives $\sum a_n = \infty$ but $\sum a_n^2 = \pi^2/6 < \infty$. So $\ell^2$ is strictly larger than $\ell^1$. $\blacksquare$

---

**Solution 4.** Counterexample: $\sum a_n$ convergent, $(b_n)$ bounded, but $\sum a_n b_n$ divergent.

*Strategy.* Take $a_n$ such that $\sum a_n$ is conditionally convergent (cancellation essential), and $b_n$ bounded but aligned with $a_n$'s sign so the cancellation is destroyed.

*Construction.* Let
$$a_n \;=\; \frac{(-1)^n}{\sqrt n}, \qquad b_n \;=\; (-1)^n.$$

*Verify $\sum a_n$ converges.* Apply the alternating series test (Leibniz; [[14-alternating-and-absolute-convergence]]): $|a_n| = 1/\sqrt n$ is monotonically decreasing to $0$. Hence $\sum (-1)^n/\sqrt n$ converges (conditionally).

*Verify $(b_n)$ bounded.* $|b_n| = 1$ for all $n$. ✓

*Verify $\sum a_n b_n$ diverges.* Compute
$$a_n b_n \;=\; \frac{(-1)^n}{\sqrt n} \cdot (-1)^n \;=\; \frac{(-1)^{2n}}{\sqrt n} \;=\; \frac{1}{\sqrt n}.$$
So $\sum a_n b_n = \sum 1/\sqrt n$, which is a $p$-series with $p = 1/2 \leq 1$, diverging (Theorem 12.2.4).

*Conclusion.* $\sum a_n$ converges, $(b_n)$ bounded, but $\sum a_n b_n$ diverges. The assertion fails.

*Remark (when it does follow).* If $(b_n)$ is bounded *and monotonic*, and $\sum a_n$ converges, then $\sum a_n b_n$ converges — this is **Abel's test**. The counterexample above has $b_n = (-1)^n$ which is bounded but **not** monotonic, and this is precisely why the conclusion can fail. Abel's test (and its cousin, **Dirichlet's test**) are covered in [[14-alternating-and-absolute-convergence]]. $\blacksquare$

---

**Solution 5.** Convergence of $\sum_{n=0}^\infty x^n/n!$ for $x \in \mathbb{R}$.

*Setup.* Terms $a_n(x) = x^n/n!$. Convention: $0! = 1$, so $a_0(x) = 1$.

*Strategy.* Apply the ratio test (see [[13-series-convergence-tests]]): if $\lim_{n \to \infty} |a_{n+1}/a_n| = L$, then the series converges absolutely when $L < 1$ and diverges when $L > 1$.

*Computation — Step 1. Ratio.* For $x \neq 0$,
$$\left|\frac{a_{n+1}(x)}{a_n(x)}\right| \;=\; \left|\frac{x^{n+1}/(n+1)!}{x^n/n!}\right| \;=\; \frac{|x|}{n+1}.$$

*Step 2. Limit of the ratio.* As $n \to \infty$, $|x|/(n+1) \to 0$ for every fixed $x \in \mathbb{R}$. Thus $L = 0 < 1$.

*Step 3. Conclusion by the ratio test.* The series converges absolutely for every $x \in \mathbb{R}$. The case $x = 0$: the series is $1 + 0 + 0 + \cdots = 1$, trivially convergent.

*Explicit ε-N bound.* Given $\varepsilon > 0$ and $x \in \mathbb{R}$, choose $N_0 \geq 2|x|$. For $n \geq N_0$, $|a_{n+1}/a_n| = |x|/(n+1) \leq |x|/N_0 \leq 1/2$, so by induction $|a_n| \leq (1/2)^{n - N_0} |a_{N_0}|$, summable as a geometric series.

*Interpretation.* This is the power series defining $e^x$. The infinite radius of convergence (convergence for all $x \in \mathbb{R}$) reflects that the coefficients $1/n!$ decay super-geometrically, dominating any polynomial growth rate of $x^n$.

*Conclusion.* $\sum_{n=0}^\infty x^n/n!$ converges absolutely for all $x \in \mathbb{R}$; its sum is defined to be $e^x$. $\blacksquare$

---

## Related Topics
- [[09-convergence-and-limits]] — partial sums are sequences; ε-N machinery
- [[10-cauchy-sequences-completeness]] — Cauchy criterion carries over to series
- [[13-series-convergence-tests]] — comparison, ratio, root, integral, Cauchy condensation, Raabe, Gauss
- [[14-alternating-and-absolute-convergence]] — alternating series, absolute vs conditional convergence, Abel and Dirichlet tests
- [[15-rearrangement-of-series]] — Riemann rearrangement theorem: conditional convergence is order-dependent
