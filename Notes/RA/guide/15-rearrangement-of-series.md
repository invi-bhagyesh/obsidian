# 15. Rearrangement of Series

> **The central phenomenon.** For finite sums, addition is commutative: the order of the terms does not affect the sum. For infinite series, **this is spectacularly false in general.** A series of real numbers, rearranged, can keep the same sum, sum to a completely different number, diverge to $+\infty$, diverge to $-\infty$, or oscillate with no limit at all.
>
> This chapter makes the phenomenon precise, identifies exactly when it can and cannot occur (absolute vs. conditional convergence), proves the **Riemann rearrangement theorem** in full, and extends the analysis to double series and the Cauchy product through **Mertens' theorem**.

For finite sums, commutativity is trivial — $a + b = b + a$ and induction handles $n$ terms. For infinite series, the finite symbol "$\sum$" is actually a **limit of partial sums in a prescribed order**, and changing the order changes the sequence of partial sums. Whether the resulting new sequence still converges, and if so to what, is a subtle question.

The distinction was first observed by **Dirichlet** (1829, in the context of Fourier series) and fully resolved by **Riemann** (1854). The key dividing line is exactly the distinction from Chapter 14:

$$\text{absolute convergence} \ \Longrightarrow\ \text{rearrangement is safe.}$$
$$\text{conditional convergence} \ \Longrightarrow\ \text{rearrangement is dangerous.}$$

This chapter also introduces **double series** and the **Cauchy product**, whose convergence behaviour depends crucially on the same distinction.

---

## 15.1 What is a Rearrangement?

> **Definition 15.1 (Rearrangement).**
> Let $\sum_{n=1}^{\infty} a_n$ be an infinite series and let $\sigma : \mathbb{N} \to \mathbb{N}$ be a **bijection** (i.e., a permutation of the positive integers). The series
> $$\sum_{n=1}^{\infty} a_{\sigma(n)}$$
> is called a **rearrangement** of $\sum_{n=1}^{\infty} a_n$.

**Unpacking the definition.**
- The terms of the rearrangement are **exactly** the same terms as the original — with the same multiplicities — just reordered. No term is dropped, no term is duplicated, no term is added.
- The bijection condition is crucial: if $\sigma$ were merely injective, the rearrangement would drop terms; if merely surjective, it would duplicate them.
- Every $a_k$ appears in $\sum a_{\sigma(n)}$ exactly once — at position $n = \sigma^{-1}(k)$.

**Examples of bijections $\sigma: \mathbb{N} \to \mathbb{N}$.**

1. $\sigma = \text{identity}$: gives back the original series.
2. $\sigma(2k-1) = 2k$, $\sigma(2k) = 2k - 1$: swap adjacent pairs. Sequence: $a_2, a_1, a_4, a_3, a_6, a_5, \ldots$
3. Interleave two subsequences (odd indices first, then even): $\sigma(k) = 2k - 1$ for $k \leq N$, $\sigma(k) = 2(k - N)$ for $k > N$ — except this is not a bijection of $\mathbb{N}$ onto itself as stated. A genuine interleaving: enumerate odds first, then evens — but this is not a bijection because the evens never get enumerated in finite position. (Reading this slowly shows why we must be careful.)
4. A **cofinite** permutation: $\sigma$ that fixes all but finitely many indices. These are "tame" rearrangements; they never change the sum.

> **Central question.** If $\sum_{n=1}^{\infty} a_n = S$, does $\sum_{n=1}^{\infty} a_{\sigma(n)} = S$ for every bijection $\sigma$?

**Answer (preview).**
- **Yes**, if and only if $\sum a_n$ converges **absolutely**.
- **No**, in general, if $\sum a_n$ converges only **conditionally**. In fact the failure is maximal: any target $L \in [-\infty, +\infty]$ — including $\pm\infty$ and "no limit" — can be achieved by some rearrangement.

This astonishing dichotomy is the content of Theorems 15.2 (Dirichlet) and 15.4 (Riemann).

---

## 15.2 Absolute Convergence and Rearrangement

> **Theorem 15.2 (Dirichlet's rearrangement theorem).**
> If $\sum_{n=1}^{\infty} a_n$ converges absolutely with sum $S$, then for **every** bijection $\sigma: \mathbb{N} \to \mathbb{N}$ the rearrangement $\sum_{n=1}^{\infty} a_{\sigma(n)}$ also converges absolutely, and its sum equals $S$.

**Proof.** Let
$$S_N = \sum_{n=1}^{N} a_n, \qquad S'_N = \sum_{n=1}^{N} a_{\sigma(n)}, \qquad T_N = \sum_{n=1}^{N} |a_n|.$$
By hypothesis, $S_N \to S$ and $T_N \to T := \sum_{n=1}^{\infty} |a_n| < \infty$. We prove absolute convergence of the rearrangement first, then prove the sums are equal.

---

*Step 1: The rearrangement converges absolutely.*

Fix any $N \in \mathbb{N}$. The partial sum of absolute values of the rearrangement is
$$T'_N := \sum_{n=1}^{N} |a_{\sigma(n)}|.$$
Let $M := \max\{\sigma(1), \sigma(2), \ldots, \sigma(N)\}$ — the largest original index used in the first $N$ terms of the rearrangement. Since $\sigma(1), \ldots, \sigma(N)$ are $N$ **distinct** elements of $\{1, 2, \ldots, M\}$ (distinct because $\sigma$ is injective, and all $\leq M$ by choice of $M$), we have
$$T'_N = \sum_{n=1}^{N} |a_{\sigma(n)}| \leq \sum_{k=1}^{M} |a_k| = T_M \leq T.$$
Thus the partial sums $T'_N$ are bounded above by the constant $T$. Since $T'_N$ is monotone non-decreasing (each new term is non-negative), the monotone convergence theorem for sequences (Theorem 6.4) implies $T'_N$ converges. Hence $\sum |a_{\sigma(n)}|$ converges, which means $\sum a_{\sigma(n)}$ converges **absolutely**. In particular, $S'_N$ converges to some real limit $S'$.

---

*Step 2: The two sums are equal, $S = S'$.*

Let $\varepsilon > 0$. We produce $N_0$ such that $|S'_N - S| < \varepsilon$ for all $N \geq N_0$.

**(a) Choose a tail bound for the original series.** Since $\sum |a_n|$ converges, its tail goes to zero. Choose $M \in \mathbb{N}$ large enough that
$$\sum_{n = M+1}^{\infty} |a_n| < \frac{\varepsilon}{2},$$
and simultaneously
$$|S - S_M| = \left| \sum_{n = M+1}^{\infty} a_n \right| \leq \sum_{n = M+1}^{\infty} |a_n| < \frac{\varepsilon}{2}. \tag{$\ast$}$$

**(b) Choose $N_0$ so all of $a_1, \ldots, a_M$ appear early in the rearrangement.** Since $\sigma$ is a bijection, each of the indices $1, 2, \ldots, M$ has a pre-image $\sigma^{-1}(k)$. Let
$$N_0 := \max\{\sigma^{-1}(1), \sigma^{-1}(2), \ldots, \sigma^{-1}(M)\}.$$
Then for $N \geq N_0$, the set $\{\sigma(1), \sigma(2), \ldots, \sigma(N)\}$ contains all of $\{1, 2, \ldots, M\}$ (because their pre-images are all $\leq N_0 \leq N$).

**(c) Estimate $|S'_N - S_M|$ for $N \geq N_0$.** For such $N$, decompose
$$S'_N = \sum_{n=1}^{N} a_{\sigma(n)} = \underbrace{\sum_{\substack{n \leq N \\ \sigma(n) \leq M}} a_{\sigma(n)}}_{= S_M \text{ (all indices } 1,\ldots,M \text{ appear, each once)}} + \sum_{\substack{n \leq N \\ \sigma(n) > M}} a_{\sigma(n)}.$$
The first summation equals $S_M$ precisely because every index $k \in \{1, \ldots, M\}$ occurs exactly once among $\sigma(1), \ldots, \sigma(N)$ (by (b)), and distinct $n$'s give distinct $\sigma(n)$'s. Hence
$$S'_N - S_M = \sum_{\substack{n \leq N \\ \sigma(n) > M}} a_{\sigma(n)}.$$
The indices appearing in this last sum are **distinct** integers greater than $M$, so (by the triangle inequality and (a))
$$|S'_N - S_M| \leq \sum_{\substack{n \leq N \\ \sigma(n) > M}} |a_{\sigma(n)}| \leq \sum_{k > M} |a_k| < \frac{\varepsilon}{2}. \tag{$\ast\ast$}$$

**(d) Assemble.** Combining $(\ast)$ and $(\ast\ast)$ via the triangle inequality,
$$|S'_N - S| \leq |S'_N - S_M| + |S_M - S| < \frac{\varepsilon}{2} + \frac{\varepsilon}{2} = \varepsilon \quad \text{for all } N \geq N_0.$$

Hence $S'_N \to S$ as $N \to \infty$, i.e., $\sum a_{\sigma(n)} = S$. $\blacksquare$

---

*Interpretive remarks.*

- **Step 1** uses only that $\{\sigma(1), \ldots, \sigma(N)\}$ is a set of $N$ distinct positive integers; any such set's $|a_k|$-values sum to at most $T$. This is why absolute convergence is preserved.
- **Step 2** uses the bijectivity of $\sigma$ essentially: both that $\sigma^{-1}(k)$ exists (so each original term eventually shows up in the rearrangement) and that $\sigma$ is injective (so no original term is double-counted).
- The proof does **not** use continuity of any operation, just the triangle inequality and monotone convergence of a non-negative series. So the theorem holds verbatim in any Banach space: **absolute convergence in a Banach space implies unconditional convergence.**
- The converse (unconditional convergence $\Rightarrow$ absolute convergence) is true in $\mathbb{R}$ and finite-dimensional Banach spaces (Steinitz), but **fails** in infinite-dimensional Banach spaces (Dvoretzky–Rogers theorem).

> **Corollary 15.3 (Unconditional convergence for absolutely convergent series).** If $\sum a_n$ converges absolutely, then the sum $S = \sum a_n$ is well-defined **independently of the ordering of the terms**. In this sense, an absolutely convergent series behaves like a (countable) commutative sum.

*Proof.* Immediate from Theorem 15.2: every ordering $\sigma$ gives the same sum $S$. $\blacksquare$

---

## 15.3 Riemann's Rearrangement Theorem

For **conditionally convergent** series, the situation is as bad as could possibly be imagined:

> **Theorem 15.4 (Riemann's rearrangement theorem).**
> Let $\sum_{n=1}^{\infty} a_n$ be a conditionally convergent series of real numbers. Then:
> 1. For every extended real $L \in [-\infty, +\infty]$, there exists a bijection $\sigma: \mathbb{N} \to \mathbb{N}$ with $\sum_{n=1}^{\infty} a_{\sigma(n)} = L$.
> 2. There exist bijections $\sigma$ such that the partial sums of $\sum a_{\sigma(n)}$ oscillate: $\liminf S'_N < \limsup S'_N$, with any prescribed pair of lim-inf/lim-sup values in $[-\infty, +\infty]$.

We prove the theorem for $L \in \mathbb{R}$ (the finite case); the extensions to $L = \pm\infty$ and to prescribed oscillation are straightforward modifications of the same construction.

---

**Proof (for finite target $L \in \mathbb{R}$).**

*Step 1: Split into positive and negative parts.*

For each $n$, define
$$p_n := \max(a_n, 0) = \frac{a_n + |a_n|}{2}, \qquad q_n := \max(-a_n, 0) = \frac{|a_n| - a_n}{2}.$$
Then $p_n, q_n \geq 0$, and by direct verification
$$a_n = p_n - q_n, \qquad |a_n| = p_n + q_n. \tag{$\dagger$}$$

*Step 2: Both $\sum p_n$ and $\sum q_n$ diverge to $+\infty$.*

This is the key combinatorial fact that drives the whole theorem. We give a careful case analysis.

From $(\dagger)$:
$$\sum_{n=1}^{N} |a_n| = \sum_{n=1}^{N} p_n + \sum_{n=1}^{N} q_n, \qquad \sum_{n=1}^{N} a_n = \sum_{n=1}^{N} p_n - \sum_{n=1}^{N} q_n.$$

Let $P_N := \sum_{n=1}^N p_n$ and $Q_N := \sum_{n=1}^N q_n$. Both are monotone non-decreasing.

**Case A:** Both $P_N$ and $Q_N$ converge, say to $P, Q$ respectively. Then $\sum |a_n| = P + Q < \infty$, so $\sum a_n$ converges absolutely. But this contradicts the hypothesis that $\sum a_n$ converges only conditionally. So this case is impossible.

**Case B:** $P_N \to +\infty$ and $Q_N \to Q < \infty$. Then $\sum a_n = \lim (P_N - Q_N) = +\infty - Q = +\infty$, contradicting convergence of $\sum a_n$. Impossible.

**Case C:** $P_N \to P < \infty$ and $Q_N \to +\infty$. Symmetrically, $\sum a_n \to -\infty$. Impossible.

**Case D:** Both $P_N \to +\infty$ and $Q_N \to +\infty$. The only remaining case — so this is what must hold.

*Step 3: The terms $p_n, q_n$ tend to $0$.*

Since $\sum a_n$ converges, $a_n \to 0$, hence $|a_n| \to 0$. From $0 \leq p_n \leq |a_n|$ and $0 \leq q_n \leq |a_n|$, the squeeze theorem gives $p_n \to 0$ and $q_n \to 0$.

*Step 4: Extract the positive and negative subsequences.*

Let $(P_j)_{j=1}^{\infty}$ be the subsequence of $(p_n)$ consisting of its **strictly positive** values (i.e., the values of $a_n$ whenever $a_n > 0$), indexed in the order they appear. Similarly let $(Q_k)_{k=1}^{\infty}$ be the strictly positive values of $(q_n)$ (i.e., the $-a_n$'s when $a_n < 0$).

Both lists are infinite (because $\sum p_n$ and $\sum q_n$ diverge — if only finitely many $p_n$ were positive, $\sum p_n$ would be finite), both have sum $+\infty$, and both have $P_j \to 0$, $Q_k \to 0$.

*Step 5: The construction.*

We build a rearrangement $\sum b_n$ in phases, targeting $L$. Maintain a running partial sum $R$; start at $R = 0$ and with no terms used. Successively:

**Phase 1 (Positive):** Append $P_1, P_2, \ldots$ in order, **stopping** at the first index $j_1$ such that $P_1 + P_2 + \cdots + P_{j_1} > L$. Such $j_1$ exists because $\sum P_j = +\infty$. Update $R$.

**Phase 2 (Negative):** Append $-Q_1, -Q_2, \ldots$ in order, stopping at the first $k_1$ such that the new running total is $< L$. Exists because $\sum Q_k = +\infty$.

**Phase 3 (Positive):** Append the next unused positive terms $P_{j_1 + 1}, P_{j_1 + 2}, \ldots$, stopping at the first new index $j_2$ such that $R > L$ again. Exists for the same reason.

Continue alternating phases. At each phase, the running total first crosses from one side of $L$ to the other and then just barely goes over.

*Step 6: Every original term is used exactly once.*

Each phase uses at least one new term (by minimality of $j_1, k_1, j_2, k_2, \ldots$) and eventually terminates because the relevant divergent tail forces the running total to cross $L$. So the construction produces an infinite sequence of phases, and each $P_j$ and each $Q_k$ is eventually consumed (if any were not, some phase would never terminate). Thus the listing $b_1, b_2, \ldots$ is a genuine rearrangement $b_n = a_{\sigma(n)}$ of the original $(a_n)$.

*Step 7: The rearranged series converges to $L$.*

At the end of each phase, the running total overshoots $L$ by at most the **last term used in that phase** (because before the last term, the running total was on the other side of $L$). Explicitly, if the last term used in the $m$-th phase is $t_m$ (a $P$-term or a $-Q$-term), then
$$|R_m - L| \leq |t_m|.$$
Since $P_j \to 0$ and $Q_k \to 0$, we have $|t_m| \to 0$ as $m \to \infty$.

Moreover, during any phase, the running total moves monotonically toward $L$ until crossing — so any partial sum taken **mid-phase** is between the previous phase's endpoint and the current phase's endpoint. That is, for any partial sum $S'_N = \sum_{n=1}^N b_n$, we have $S'_N$ sandwiched between two consecutive phase-endpoints:
$$\min(R_{m-1}, R_m) \leq S'_N \leq \max(R_{m-1}, R_m) \quad \text{for some } m.$$
(Where $R_0 = 0$ is the starting value.) Since both $R_{m-1}$ and $R_m$ are within $\max(|t_{m-1}|, |t_m|)$ of $L$, and these last-term sizes tend to $0$,
$$|S'_N - L| \to 0 \quad \text{as } N \to \infty.$$

Hence $\sum a_{\sigma(n)} = L$, completing the proof. $\blacksquare$

---

*Interpretive remarks.*

- The proof is **constructive**: given $L$, it actually describes the rearrangement. The algorithm is "greedy" — always take just enough terms to overshoot.
- The construction generalizes trivially:
  - **Target $+\infty$:** In each positive phase, overshoot a larger and larger target ($T_m = m$, say) before switching to a short negative phase to absorb one $-Q_k$.
  - **Target $-\infty$:** Mirror image.
  - **Oscillation between $\liminf = a$ and $\limsup = b$:** Alternate, targeting $b$ in positive phases and $a$ in negative phases.
- **Moral:** For a conditionally convergent series, writing "$\sum a_n = L$" is only meaningful once the ordering is fixed. Unlike the finite case, summation is **not** a set-theoretic operation — it requires a sequence.

---

**Classical illustration — the alternating harmonic series.**

We recall (from Chapter 14) that
$$\ln 2 \;=\; \sum_{n=1}^{\infty} \frac{(-1)^{n+1}}{n} \;=\; 1 - \tfrac{1}{2} + \tfrac{1}{3} - \tfrac{1}{4} + \tfrac{1}{5} - \tfrac{1}{6} + \cdots.$$

Consider the rearrangement that takes **two positive terms for every one negative** — i.e., always two new odd reciprocals before one even reciprocal:
$$\underbrace{1 + \tfrac{1}{3}}_{\text{two pos}} \underbrace{-\tfrac{1}{2}}_{\text{one neg}} \underbrace{+ \tfrac{1}{5} + \tfrac{1}{7}}_{\text{two pos}} \underbrace{- \tfrac{1}{4}}_{\text{one neg}} + \tfrac{1}{9} + \tfrac{1}{11} - \tfrac{1}{6} + \cdots.$$

Let $T_{3N}$ denote the partial sum after $3N$ terms (i.e., after $N$ complete blocks of pattern $+,+,-$).

**Computing $T_{3N}$.** Each block of three terms contributes two odd reciprocals (the $(2N-1)$-th and $(2N)$-th odd reciprocals $\tfrac{1}{4N - 3}$ and $\tfrac{1}{4N-1}$) and one even reciprocal ($\tfrac{1}{2N}$). Hence
$$T_{3N} = \sum_{k=1}^{2N} \frac{1}{2k - 1} - \sum_{k=1}^{N} \frac{1}{2k}.$$

**Asymptotic evaluation.** Using the Euler–Mascheroni expansion $H_M := \sum_{k=1}^M 1/k = \ln M + \gamma + o(1)$:

- $\sum_{k=1}^{2N} \tfrac{1}{2k-1} = H_{4N} - \tfrac{1}{2}H_{2N} = (\ln(4N) + \gamma) - \tfrac{1}{2}(\ln(2N) + \gamma) + o(1) = \tfrac{1}{2}\ln(8N^2/2N) + \tfrac{\gamma}{2} + o(1) \ldots$

Let us instead compute cleanly. Write
$$\sum_{k=1}^{2N} \frac{1}{2k - 1} = H_{4N} - \tfrac{1}{2} H_{2N}.$$
(*Justification:* $\sum_{k=1}^{2N} \tfrac{1}{2k-1} = H_{4N} - \sum_{k=1}^{2N} \tfrac{1}{2k} = H_{4N} - \tfrac{1}{2}H_{2N}$.)
And $\sum_{k=1}^{N} \tfrac{1}{2k} = \tfrac{1}{2}H_N$.

Thus
$$T_{3N} = H_{4N} - \tfrac{1}{2}H_{2N} - \tfrac{1}{2}H_N.$$

Using $H_M = \ln M + \gamma + o(1)$:
$$T_{3N} = \ln(4N) - \tfrac{1}{2}\ln(2N) - \tfrac{1}{2}\ln N + o(1) = \ln 4 + \ln N - \tfrac{1}{2}\ln 2 - \tfrac{1}{2}\ln N - \tfrac{1}{2}\ln N + o(1).$$
The $\ln N$'s cancel, leaving
$$T_{3N} \to \ln 4 - \tfrac{1}{2}\ln 2 = 2\ln 2 - \tfrac{1}{2}\ln 2 = \tfrac{3}{2}\ln 2.$$

**Verification.** So the rearranged sum is $\tfrac{3}{2}\ln 2 \neq \ln 2$. Numerically, $\ln 2 \approx 0.6931$, and the rearrangement converges to $\approx 1.0397$.

> **Moral.** For a conditionally convergent series, the statement "$\sum a_n = L$" implicitly depends on the order of summation.

---

## 15.4 Double Series

A **double series** is a formal sum $\sum_{i, j = 1}^{\infty} a_{ij}$ indexed by a pair of positive integers. Three natural orderings suggest themselves:

1. **Iterated row-first (row sums):**
$$R := \sum_{i=1}^{\infty} \left( \sum_{j=1}^{\infty} a_{ij} \right).$$
Fix a row $i$, sum along its columns; then sum the row-totals.

2. **Iterated column-first (column sums):**
$$C := \sum_{j=1}^{\infty} \left( \sum_{i=1}^{\infty} a_{ij} \right).$$
Opposite order.

3. **One-dimensional enumeration:** Pick any bijection $\phi: \mathbb{N} \to \mathbb{N}^2$ (e.g., the antidiagonal enumeration $\phi(1) = (1,1), \phi(2) = (1,2), \phi(3) = (2,1), \phi(4) = (1,3), \ldots$) and form
$$E_\phi := \sum_{k=1}^{\infty} a_{\phi(k)}.$$

In general, $R$, $C$, and $E_\phi$ can all be different — or some may exist and others not. Under absolute convergence, however, all agree:

> **Theorem 15.5 (Fubini's theorem for double series — absolute case).**
> Suppose $a_{ij} \in \mathbb{R}$ (or $\mathbb{C}$) satisfies
> $$\sum_{i=1}^{\infty} \sum_{j=1}^{\infty} |a_{ij}| < \infty. \tag{A}$$
> Then:
> 1. Every row sum $\sum_{j} a_{ij}$ converges absolutely to some $r_i \in \mathbb{R}$.
> 2. Every column sum $\sum_{i} a_{ij}$ converges absolutely to some $c_j \in \mathbb{R}$.
> 3. The iterated row- and column-sums both converge absolutely.
> 4. For every bijection $\phi: \mathbb{N} \to \mathbb{N}^2$, the one-dimensional enumeration $\sum_k a_{\phi(k)}$ converges absolutely to a common value $S$.
> 5. $R = C = S$.

**Proof outline.** The non-negative case (Tonelli's theorem for series) is handled by monotone convergence: for $a_{ij} \geq 0$, both $R$ and $C$ and every $E_\phi$ equal the supremum $\sup_{I,J} \sum_{i \leq I, j \leq J} a_{ij}$, which is common. Apply this to $|a_{ij}|$ to get absolute convergence of every ordering. Then the real/complex case follows by writing $a_{ij} = a_{ij}^+ - a_{ij}^-$ (or real/imaginary parts) and applying linearity, noting that the positive and negative parts each have absolutely-convergent iterated sums bounded by $\sum |a_{ij}|$. The enumeration claim follows from Theorem 15.2 applied to the one-dimensional rearrangement between $E_\phi$ and $E_{\phi'}$. $\blacksquare$

---

**Standard counterexample (non-absolute case).**

Let
$$a_{ij} = \begin{cases} +1 & \text{if } i = j, \\ -1 & \text{if } i = j + 1, \\ 0 & \text{otherwise.} \end{cases}$$

Visually (the matrix with $i$ = row, $j$ = column):
$$
\begin{pmatrix}
1 & 0 & 0 & 0 & \cdots \\
-1 & 1 & 0 & 0 & \cdots \\
0 & -1 & 1 & 0 & \cdots \\
0 & 0 & -1 & 1 & \cdots \\
\vdots & & & & \ddots
\end{pmatrix}
$$

**Row sums.** For row $i$: entries are $+1$ at $j = i$ and (if $i \geq 2$) $-1$ at $j = i - 1$. Row $1$ sums to $+1$; each later row sums to $0$. Total:
$$R = \sum_{i=1}^{\infty} (\text{row}_i) = 1 + 0 + 0 + \cdots = 1.$$

**Column sums.** For column $j$: entries are $+1$ at $i = j$ and $-1$ at $i = j + 1$. Each column sums to $0$. Total:
$$C = \sum_{j=1}^{\infty} 0 = 0.$$

**So $R = 1 \neq 0 = C$.**

Why no contradiction with Theorem 15.5? Because $\sum_{i,j} |a_{ij}| = \sum_{i \geq 1}$ ($1 + 1$-many terms) $= \infty$, failing (A).

**One-dimensional enumeration behaviour.** Choose $\phi$ enumerating antidiagonals: $(1,1), (2,1), (1,2), (3,1), (2,2), (1,3), \ldots$. One can check the partial sums oscillate between $1$ and $0$ and never converge. This is consistent with Riemann's theorem — different enumerations give different "sums."

---

## 15.5 Cauchy Product

Given two series $\sum_{n=0}^{\infty} a_n$ and $\sum_{n=0}^{\infty} b_n$, their **Cauchy product** is the series $\sum_{n=0}^{\infty} c_n$ with
$$c_n := \sum_{k=0}^{n} a_k b_{n - k} = a_0 b_n + a_1 b_{n-1} + \cdots + a_n b_0. \tag{CP}$$

**Motivation: power series multiplication.** If $f(x) = \sum a_n x^n$ and $g(x) = \sum b_n x^n$ are formal power series, then formally
$$f(x) g(x) = \sum_{n = 0}^{\infty} \left( \sum_{k=0}^{n} a_k b_{n-k} \right) x^n = \sum_{n=0}^{\infty} c_n x^n.$$
So the Cauchy product at $x = 1$ gives the "multiplication" of the sums $\sum a_n$ and $\sum b_n$. But does $\sum c_n$ converge? And does it equal $\left(\sum a_n\right)\left(\sum b_n\right)$? The answer depends on the convergence type.

---

> **Theorem 15.6 (Mertens' theorem, 1875).**
> If $\sum a_n$ converges absolutely to $A$ and $\sum b_n$ converges (at least conditionally) to $B$, then the Cauchy product $\sum c_n$ converges to $AB$.

**Proof.**

Let $A_N := \sum_{n=0}^N a_n$, $B_N := \sum_{n=0}^N b_n$, $C_N := \sum_{n=0}^N c_n$. Let $\beta_n := B_n - B$ be the tail error, so $B_n = B + \beta_n$ and $\beta_n \to 0$.

*Step 1: Re-express $C_N$ in terms of $a_k$ and $B_{N-k}$.*

By interchanging the order of summation (which is a finite sum, so valid):
$$C_N = \sum_{n=0}^{N} \sum_{k=0}^{n} a_k b_{n-k} = \sum_{k=0}^{N} a_k \sum_{n=k}^{N} b_{n-k} = \sum_{k=0}^{N} a_k \sum_{m=0}^{N-k} b_m = \sum_{k=0}^{N} a_k B_{N-k}.$$

Substituting $B_{N - k} = B + \beta_{N-k}$:
$$C_N = \sum_{k=0}^{N} a_k (B + \beta_{N-k}) = B \cdot \sum_{k=0}^{N} a_k + \sum_{k=0}^{N} a_k \beta_{N-k} = B \cdot A_N + E_N,$$
where
$$E_N := \sum_{k=0}^{N} a_k \beta_{N - k}.$$

*Step 2: The main term tends to $AB$.*

Since $A_N \to A$, we have $B \cdot A_N \to BA$.

*Step 3: The error term $E_N$ tends to $0$.*

Let $\varepsilon > 0$. Since $\beta_n \to 0$, there exists $M$ such that $|\beta_n| < \varepsilon$ for all $n \geq M$. Let $\alpha := \sup_n |\beta_n|$ (finite because $\beta_n \to 0$ bounds the sequence). Let $T := \sum_{k=0}^{\infty} |a_k| < \infty$.

For $N > M$, split:
$$E_N = \underbrace{\sum_{k=0}^{N-M-1} a_k \beta_{N-k}}_{I_N} + \underbrace{\sum_{k=N-M}^{N} a_k \beta_{N-k}}_{II_N}.$$
In $I_N$, we have $N - k \geq M + 1 > M$, so $|\beta_{N-k}| < \varepsilon$; hence
$$|I_N| \leq \sum_{k=0}^{N-M-1} |a_k| \cdot \varepsilon \leq \varepsilon \cdot T.$$
In $II_N$, there are $M + 1$ terms, each with $|a_k \beta_{N-k}| \leq \alpha |a_k|$, so
$$|II_N| \leq \alpha \sum_{k = N - M}^{N} |a_k|.$$
Since $\sum |a_k| < \infty$, its tail $\sum_{k \geq N - M} |a_k| \to 0$ as $N \to \infty$ (for fixed $M$). So for $N$ large enough,
$$|II_N| < \varepsilon.$$

Combining: $|E_N| \leq |I_N| + |II_N| < \varepsilon T + \varepsilon = \varepsilon(T + 1)$ for $N$ sufficiently large. Since $\varepsilon$ is arbitrary, $E_N \to 0$.

*Step 4: Conclude.*

$C_N = B A_N + E_N \to BA + 0 = AB$. $\blacksquare$

---

> **Theorem 15.7 (Abel on Cauchy products).**
> If $\sum a_n = A$, $\sum b_n = B$, and $\sum c_n = C$ all converge (the last of these as a hypothesis), then $C = AB$.

*Proof sketch.* By Abel's summation theorem, $f(x) = \sum a_n x^n \to A$, $g(x) = \sum b_n x^n \to B$, $h(x) = \sum c_n x^n \to C$ as $x \to 1^-$. But $h(x) = f(x) g(x)$ for $|x| < 1$ (termwise multiplication of absolutely convergent power series inside the radius of convergence). Taking $x \to 1^-$ gives $C = AB$. $\blacksquare$

Theorem 15.7 is a **consistency** result: it says that **if** the Cauchy product converges, then its value must be $AB$. It does not guarantee convergence in the first place. Mertens (15.6) provides the convergence guarantee under an absolute-convergence assumption.

---

**Counterexample: neither factor absolutely convergent.**

Take $a_n = b_n = \frac{(-1)^n}{\sqrt{n + 1}}$ for $n \geq 0$. Both series converge by the Leibniz alternating test (magnitudes $1/\sqrt{n+1}$ decrease monotonically to $0$). Neither is absolutely convergent ($\sum 1/\sqrt{n+1}$ is a $p$-series with $p = 1/2 \leq 1$).

The Cauchy product has
$$c_n = \sum_{k=0}^{n} \frac{(-1)^k}{\sqrt{k+1}} \cdot \frac{(-1)^{n-k}}{\sqrt{n-k+1}} = (-1)^n \sum_{k=0}^{n} \frac{1}{\sqrt{(k+1)(n-k+1)}}.$$

By AM–GM, $\sqrt{(k+1)(n - k + 1)} \leq \tfrac{1}{2}\big((k+1) + (n - k + 1)\big) = \tfrac{n + 2}{2}$. Hence
$$\frac{1}{\sqrt{(k+1)(n-k+1)}} \geq \frac{2}{n + 2},$$
giving
$$|c_n| \geq \sum_{k=0}^{n} \frac{2}{n+2} = \frac{2(n + 1)}{n + 2} \to 2 \neq 0.$$

Since $c_n \not\to 0$, the Cauchy product **diverges** (the $n$-th term test). This shows Mertens' absolute convergence hypothesis cannot be dropped in general.

---

## 15.6 Worked Examples

### Example 1. Rearrangement to $\tfrac{1}{2}\ln 2$.

**Setup.** Starting from the alternating harmonic sum $\ln 2 = 1 - \tfrac{1}{2} + \tfrac{1}{3} - \tfrac{1}{4} + \cdots$, consider the rearrangement that takes **one positive, then two negatives**:
$$1 - \tfrac{1}{2} - \tfrac{1}{4} + \tfrac{1}{3} - \tfrac{1}{6} - \tfrac{1}{8} + \tfrac{1}{5} - \tfrac{1}{10} - \tfrac{1}{12} + \cdots.$$

**Goal.** Show that this rearrangement sums to $\tfrac{1}{2}\ln 2$.

**Strategy.** Group terms in triples (one positive followed by two negatives) and compute the telescoping sum of blocks.

**Computation.** The $k$-th triple $(k \geq 1)$ consists of:
- the $k$-th positive term: $\tfrac{1}{2k - 1}$;
- the $(2k - 1)$-th negative term: $-\tfrac{1}{2(2k - 1)} = -\tfrac{1}{4k - 2}$;
- the $(2k)$-th negative term: $-\tfrac{1}{2 \cdot 2k} = -\tfrac{1}{4k}$.

So the $k$-th block is
$$B_k = \frac{1}{2k - 1} - \frac{1}{4k - 2} - \frac{1}{4k}.$$

Simplify the first two terms (common denominator $2(2k-1) = 4k - 2$):
$$\frac{1}{2k-1} - \frac{1}{4k - 2} = \frac{2}{4k-2} - \frac{1}{4k-2} = \frac{1}{4k - 2} = \frac{1}{2(2k-1)}.$$

So
$$B_k = \frac{1}{2(2k - 1)} - \frac{1}{4k} = \frac{1}{2}\left( \frac{1}{2k-1} - \frac{1}{2k}\right).$$

Summing over $k$ from $1$ to $\infty$:
$$\sum_{k=1}^{\infty} B_k = \frac{1}{2} \sum_{k=1}^{\infty} \left( \frac{1}{2k - 1} - \frac{1}{2k}\right) = \frac{1}{2} \cdot \ln 2 = \frac{1}{2} \ln 2.$$
(The inner sum is the standard alternating harmonic series.)

**Verification.** Numerically, $\tfrac{1}{2}\ln 2 \approx 0.3466$, well below $\ln 2 \approx 0.6931$. Computing the partial sum of the first three blocks:
$B_1 = 1 - \tfrac{1}{2} - \tfrac{1}{4} = 0.25$;
$B_2 = \tfrac{1}{3} - \tfrac{1}{6} - \tfrac{1}{8} = 0.0417$;
$B_3 = \tfrac{1}{5} - \tfrac{1}{10} - \tfrac{1}{12} \approx 0.0167$.
Sum $\approx 0.3083$ — already converging toward $0.3466$. ✓

**Interpretation.** A purely combinatorial rearrangement pattern (take $p$ positives then $q$ negatives, repeat) forces the sum toward $\ln 2 + \tfrac{1}{2}\ln(p/q)$. With $p = 1, q = 2$, we get $\ln 2 + \tfrac{1}{2}\ln(1/2) = \ln 2 - \tfrac{1}{2}\ln 2 = \tfrac{1}{2}\ln 2$. ✓

---

### Example 2. Cauchy product of $e^x$ with itself.

**Setup.** Take $a_n = b_n = \dfrac{x^n}{n!}$ and compute the Cauchy product $\sum c_n$.

**Goal.** Show $\sum c_n = e^{2x}$, consistent with $e^x \cdot e^x = e^{2x}$.

**Strategy.** Direct calculation of $c_n$ using the binomial theorem; then justify convergence via Mertens.

**Computation.** By the definition of Cauchy product (CP):
$$c_n = \sum_{k=0}^{n} \frac{x^k}{k!} \cdot \frac{x^{n-k}}{(n-k)!} = \sum_{k=0}^{n} \frac{x^n}{k!(n-k)!} = \frac{x^n}{n!} \sum_{k=0}^{n} \frac{n!}{k!(n-k)!} = \frac{x^n}{n!} \sum_{k=0}^{n} \binom{n}{k}.$$

By the binomial theorem, $\sum_{k=0}^{n} \binom{n}{k} = (1 + 1)^n = 2^n$. Hence
$$c_n = \frac{x^n}{n!} \cdot 2^n = \frac{(2x)^n}{n!}.$$

So
$$\sum_{n=0}^{\infty} c_n = \sum_{n=0}^{\infty} \frac{(2x)^n}{n!} = e^{2x}.$$

**Verification.** The exponential series $\sum \tfrac{x^n}{n!}$ converges **absolutely** for all $x \in \mathbb{R}$ (by the ratio test: $|a_{n+1}/a_n| = |x|/(n+1) \to 0$). By Mertens' theorem (Theorem 15.6), the Cauchy product converges to the product of the sums:
$$\left(\sum \tfrac{x^n}{n!}\right)^2 = (e^x)(e^x) = e^{2x}. \checkmark$$

This matches the direct computation.

**Interpretation.** This is the series-theoretic proof of the exponential identity $e^x \cdot e^x = e^{2x}$. The binomial theorem is exactly the combinatorial statement that the Cauchy product's coefficients are the appropriate convolution sums.

---

### Example 3. Fubini for $\sum_{i,j} 1/(i^2 j^2)$.

**Setup.** Compute
$$S := \sum_{i=1}^{\infty} \sum_{j=1}^{\infty} \frac{1}{i^2 j^2}.$$

**Goal.** Show the value is independent of iteration order, and evaluate it.

**Strategy.** Verify absolute summability, apply Fubini (Theorem 15.5), and use the known value of $\zeta(2)$.

**Computation.** Since $a_{ij} = 1/(i^2 j^2) \geq 0$, absolute summability equals summability. Factor:
$$\sum_{i=1}^{\infty} \sum_{j=1}^{\infty} \frac{1}{i^2 j^2} = \sum_{i=1}^{\infty} \frac{1}{i^2} \sum_{j=1}^{\infty} \frac{1}{j^2} = \left( \sum_{i=1}^{\infty} \frac{1}{i^2} \right)^2 = \left(\frac{\pi^2}{6}\right)^2 = \frac{\pi^4}{36}.$$

Each factor equals $\pi^2/6 < \infty$ (Euler, 1735 — the Basel problem). Hence
$$\sum_{i, j} \frac{1}{i^2 j^2} = \frac{\pi^4}{36} < \infty.$$

**Verification.** By Theorem 15.5, both iterated sums and every one-dimensional enumeration yield the same value, $\pi^4 / 36 \approx 2.705$.

**Interpretation.** This is a toy case of the **multi-zeta value** $\zeta(2,2)$ — products of Basel sums. The same factorization gives $\zeta(p) \zeta(q) = \sum_{i,j} 1/(i^p j^q)$ for $p, q > 1$, with absolute convergence ensuring the double sum is well-defined irrespective of order.

---

### Example 4. Sum $\sum (-1)^{n+1}/n^2$ via split-by-parity.

**Setup.** Evaluate $\displaystyle\sum_{n=1}^{\infty} \frac{(-1)^{n+1}}{n^2}$, given $\displaystyle\sum_{n=1}^{\infty} \frac{1}{n^2} = \frac{\pi^2}{6}$.

**Goal.** Find the value of the alternating series.

**Strategy.** Split $\sum 1/n^2$ into odd and even parts; use linear algebra to recover $S_o$ and $S_e$; then $\sum (-1)^{n+1}/n^2 = S_o - S_e$.

**Computation.** Let
$$S = \sum_{n=1}^{\infty} \frac{1}{n^2}, \quad S_o = \sum_{n \text{ odd}} \frac{1}{n^2}, \quad S_e = \sum_{n \text{ even}} \frac{1}{n^2}.$$

*Relation 1:* $S = S_o + S_e$ (by splitting naturally over odds and evens — valid because $\sum 1/n^2$ converges **absolutely**, so rearrangements are safe by Theorem 15.2).

*Relation 2:* $S_e = \sum_{k=1}^\infty 1/(2k)^2 = \tfrac{1}{4} S$.

Solving: $S_o = S - S_e = S - \tfrac{1}{4}S = \tfrac{3}{4}S$.

Hence
$$\sum_{n=1}^{\infty} \frac{(-1)^{n+1}}{n^2} = S_o - S_e = \tfrac{3}{4}S - \tfrac{1}{4}S = \tfrac{1}{2}S = \frac{\pi^2}{12}.$$

**Verification.** Numerically, $\pi^2/12 \approx 0.8225$. Computing the partial sum $1 - 1/4 + 1/9 - 1/16 + 1/25 - \cdots$ converges slowly; $1 - 0.25 + 0.111 - 0.0625 + 0.04 - 0.0278 + 0.0204 \approx 0.832$ after seven terms. ✓

**Interpretation.** The "split-by-parity" manipulation is valid here because the series $\sum 1/n^2$ converges **absolutely**. Compare to the alternating harmonic series $\sum (-1)^{n+1}/n$: attempting the same trick gives $\tfrac{3}{4}\infty - \tfrac{1}{4}\infty$, which is meaningless. The underlying issue is that the odd-harmonic and even-harmonic partial sums both diverge — only their **signed combination** (in the original order) converges.

---

### Example 5. Cauchy product of geometric series.

**Setup.** For $|r| < 1$, both series $\sum_{n=0}^{\infty} r^n$ and $\sum_{n=0}^{\infty} r^n$ equal $\tfrac{1}{1-r}$. Compute their Cauchy product.

**Goal.** Verify Mertens' theorem by explicit computation.

**Strategy.** Compute $c_n$ from the definition, sum, and compare with $(1/(1-r))^2$.

**Computation.** With $a_n = b_n = r^n$:
$$c_n = \sum_{k=0}^{n} r^k \cdot r^{n-k} = \sum_{k=0}^{n} r^n = (n + 1) r^n.$$

So the Cauchy product is
$$\sum_{n=0}^{\infty} c_n = \sum_{n=0}^{\infty} (n + 1) r^n.$$

This sum can be evaluated by differentiation of the geometric series:
$$\sum_{n=0}^{\infty} r^{n+1} = \frac{r}{1 - r}.$$
Differentiating termwise (valid within radius of convergence):
$$\frac{d}{dr}\left(\frac{r}{1-r}\right) = \sum_{n=0}^{\infty} (n+1) r^n.$$
Compute the derivative:
$$\frac{d}{dr}\frac{r}{1 - r} = \frac{(1-r) - r(-1)}{(1-r)^2} = \frac{1}{(1-r)^2}.$$

Hence
$$\sum_{n=0}^{\infty} (n+1) r^n = \frac{1}{(1 - r)^2}.$$

**Verification.** By Mertens' theorem (valid because $\sum r^n$ converges absolutely for $|r| < 1$):
$$\sum c_n = \left(\sum r^n\right)^2 = \left(\frac{1}{1-r}\right)^2 = \frac{1}{(1-r)^2}. \checkmark$$

**Interpretation.** The Cauchy product of two geometric series is a **negative binomial** series. More generally, the Cauchy product of $(1-r)^{-\alpha}$ and $(1-r)^{-\beta}$ — expanded as binomial series — gives $(1-r)^{-(\alpha + \beta)}$, an instance of the **Vandermonde convolution** for the generalized binomial coefficients.

---

## 15.7 Practice Problems

1. (Riemann rearrangement, algorithmic.) Describe a rearrangement of $\sum (-1)^{n+1}/n$ that sums to $2$. No explicit formulas required — just the algorithm and the key convergence estimates.

2. Suppose $\sum a_n$ converges absolutely and $b_n = a_{\sigma(n)}$ for some bijection $\sigma: \mathbb{N} \to \mathbb{N}$. Is it always true that $\sum |a_n - b_n| < \infty$? Answer and justify. (Regardless, why does $\sum a_n = \sum b_n$?)

3. Compute
$$\sum_{n=1}^{\infty} \sum_{m=1}^{\infty} \frac{1}{(m + n)!}$$
by changing the order of summation.

4. The Cauchy product of $\sum_{n=0}^{\infty} 1$ (which diverges) with itself has terms $c_n = n + 1$. Is $\sum (n+1) = 1 + 2 + 3 + \cdots$ summable by any reasonable method (Cesàro, Abel, zeta regularization)?

5. Show: if $\sum a_n$ and $\sum b_n$ both converge absolutely, then their Cauchy product converges **absolutely**.

---

### Solutions

**Solution 1.**

*Setup.* Split $\sum (-1)^{n+1}/n$ into positive terms $p_1, p_2, \ldots = 1, \tfrac{1}{3}, \tfrac{1}{5}, \tfrac{1}{7}, \ldots$ (odd reciprocals) and negative terms $-q_1, -q_2, \ldots = -\tfrac{1}{2}, -\tfrac{1}{4}, -\tfrac{1}{6}, \ldots$ (even reciprocals). By Step 2 of the proof of Theorem 15.4 (or direct verification), both $\sum p_k$ and $\sum q_k$ equal $+\infty$, and $p_k, q_k \to 0$.

*Algorithm.* Maintain a running total $R$, starting at $R = 0$.
- **Phase 1:** Add positive terms $p_1, p_2, \ldots$ in order, stopping as soon as $R > 2$. Let $j_1$ be the index at which this happens.
- **Phase 2:** Subtract negative terms $q_1, q_2, \ldots$ in order (i.e., subtract $q_k$ from $R$), stopping as soon as $R < 2$. Let $k_1$ be the stopping index.
- **Phase 3:** Add the next unused positive terms $p_{j_1 + 1}, p_{j_1 + 2}, \ldots$, stopping as soon as $R > 2$.
- **Phase 4:** Subtract the next unused negative terms $q_{k_1 + 1}, q_{k_1 + 2}, \ldots$, stopping as soon as $R < 2$.
- Continue alternating. The full sequence of terms defines the rearrangement $\sigma$.

*Why the algorithm terminates in each phase.* In every positive phase, because $\sum p_k = +\infty$, adding enough unused positives will eventually push $R$ above $2$. In every negative phase, because $\sum q_k = +\infty$, subtracting enough unused negatives will eventually push $R$ below $2$. So each phase has a finite (but ever-growing) length.

*Why the rearrangement uses each original term exactly once.* Each new phase begins where the previous same-sign phase left off; since both sequences $(p_k), (q_k)$ are used up monotonically (never skipped, never repeated) and every phase consumes at least one new term, every $p_k$ and $q_k$ is eventually consumed. Hence the terms $b_n$ form a bijective rearrangement.

*Convergence to $2$.* At the end of phase $m$, the running total $R_m$ differs from $2$ by at most the **last term used** in that phase. That is, $|R_m - 2| \leq \max(p_{j_m}, q_{k_m})$, which tends to $0$. For any partial sum $S'_N$ (not necessarily at a phase-end), $S'_N$ lies monotonically between two consecutive $R_{m-1}$ and $R_m$, so $|S'_N - 2|$ is also bounded by the max of two successive last-terms, which tends to $0$.

*Conclusion.* $\sum b_n = 2 \neq \ln 2$. $\blacksquare$

---

**Solution 2.**

*Claim 1: $\sum |a_n - b_n|$ need not be finite.*

*Counterexample.* Take $a_n = 1/n^2$ (absolutely convergent — in fact $\sum 1/n^2 = \pi^2/6$). Choose a permutation $\sigma$ that shuffles blocks of large indices far from their starting positions — say, define $\sigma$ by swapping, for each $m \geq 1$, index $m$ with index $N_m$ where $(N_m)$ grows fast enough. Then $a_m = 1/m^2$ is large and $b_m = a_{\sigma(m)} = 1/N_m^2$ is small; $|a_m - b_m| \approx 1/m^2$. Summed, this gives $\sum |a_m - b_m| \approx \sum 1/m^2 < \infty$ — a bad attempt at a counterexample.

Let us try harder. Take $a_n = 1/n$ — oh, but this doesn't converge. We need an absolutely convergent $\sum a_n$. OK, take $a_n = 1/n^2$ and let $\sigma$ be the transposition that swaps indices $1$ and $N$ for some large $N$ (holding all others fixed). Then $|a_n - b_n| = 0$ for $n \neq 1, N$, and $|a_1 - b_1| = |1 - 1/N^2|$, $|a_N - b_N| = |1/N^2 - 1|$. So $\sum |a_n - b_n| = 2|1 - 1/N^2| < 2$ — still finite.

A clean example where $\sum|a_n - b_n|$ **diverges**: let $a_n = (-1)^{n+1}/n^2$, and let $\sigma$ swap each pair of adjacent indices, so $b_{2k-1} = a_{2k}$ and $b_{2k} = a_{2k-1}$. Then
$$|a_{2k-1} - b_{2k-1}| = \left|\frac{1}{(2k-1)^2} - \frac{-1}{(2k)^2}\right| = \frac{1}{(2k-1)^2} + \frac{1}{(2k)^2}.$$
Summing over $k$ gives
$$\sum_{k=1}^\infty \left( \frac{1}{(2k-1)^2} + \frac{1}{(2k)^2}\right) = \sum_{n=1}^\infty \frac{1}{n^2} = \frac{\pi^2}{6} < \infty.$$
Still finite.

*Moral:* For absolutely convergent $\sum a_n$, $\sum |a_n - b_n| \leq 2 \sum |a_n| < \infty$ **always** (by the triangle inequality $|a_n - b_n| \leq |a_n| + |b_n|$ and the fact that $(b_n)$ is a rearrangement, so $\sum |b_n| = \sum |a_n|$ by Theorem 15.2). So actually $\sum |a_n - b_n|$ **is** always finite! The original problem statement's premise was ill-posed.

*Claim 2: $\sum a_n = \sum b_n$.*

By Theorem 15.2, directly: $\sum b_n = \sum a_{\sigma(n)} = \sum a_n$. $\blacksquare$

**Correction to the problem.** The correct question is: is it the case that $\sum (a_n - b_n)$ equals $\sum a_n - \sum b_n = 0$? Answer: **yes** by linearity of absolutely-convergent series. The distinction the problem was reaching for is that $\sum (a_n - b_n) = 0$ as a genuine series (partial sums converge to $0$) even though the termwise differences can be sizeable.

---

**Solution 3.**

*Setup.* Compute $\displaystyle\sum_{n=1}^{\infty} \sum_{m=1}^{\infty} \frac{1}{(m+n)!}$.

*Strategy.* Reorganize by the value of $k = m + n$.

*Computation.* All terms are non-negative, so Fubini (Theorem 15.5) plus Tonelli applies regardless of finiteness — and we'll verify finiteness at the end. Reindex:
$$\sum_{m, n \geq 1} \frac{1}{(m + n)!} = \sum_{k = 2}^{\infty} \frac{\#\{(m, n) \in \mathbb{N}^2 : m + n = k\}}{k!} = \sum_{k=2}^{\infty} \frac{k - 1}{k!}.$$

The count $\#\{(m,n) : m + n = k, m, n \geq 1\} = k - 1$ (choose $m \in \{1, 2, \ldots, k-1\}$; $n$ is determined).

Now evaluate:
$$\sum_{k=2}^{\infty} \frac{k - 1}{k!} = \sum_{k=2}^{\infty} \left(\frac{k}{k!} - \frac{1}{k!}\right) = \sum_{k=2}^{\infty} \frac{1}{(k-1)!} - \sum_{k=2}^{\infty} \frac{1}{k!}.$$

For the first:
$$\sum_{k=2}^{\infty} \frac{1}{(k-1)!} = \sum_{j = 1}^{\infty} \frac{1}{j!} = e - 1.$$

For the second:
$$\sum_{k=2}^{\infty} \frac{1}{k!} = e - 1 - \frac{1}{1!} = e - 2.$$

Hence
$$\sum_{k=2}^{\infty} \frac{k - 1}{k!} = (e - 1) - (e - 2) = 1.$$

*Verification.* Numerically, terms decay like $\tfrac{k-1}{k!}$, e.g., $\tfrac{1}{2!} = 0.5, \tfrac{2}{3!} = 0.333, \tfrac{3}{4!} = 0.125, \tfrac{4}{5!} = 0.0333, \tfrac{5}{6!} = 0.00694, \ldots$ Sum: $\approx 0.998$ after 5 terms — approaching $1$. ✓

*Interpretation.* The double series has "only" total sum $1$, much smaller than the factor $\sum 1/n!$ itself would suggest, because of the strong double-factorial decay.

---

**Solution 4.**

*Setup.* $\sum_{n=0}^{\infty} (n + 1) = 1 + 2 + 3 + 4 + \cdots$. Does any summation method assign it a finite value?

*Cesàro and Abel.* The Cesàro means $\frac{1}{N}\sum_{n=1}^{N} S_n$, where $S_n = \tfrac{n(n+1)}{2}$, grow like $N^2/4$ — diverge. The Abel limit $\lim_{r \to 1^-} \sum (n+1) r^n = \lim_{r \to 1^-} 1/(1 - r)^2 = +\infty$ — diverges. Both standard methods diverge.

*Zeta regularization.* The Riemann zeta function $\zeta(s) = \sum_{n=1}^\infty 1/n^s$ converges for $\Re s > 1$ and extends by analytic continuation to all $s \in \mathbb{C}$ (except a simple pole at $s = 1$). The value at $s = -1$ is
$$\zeta(-1) = -\frac{1}{12}.$$
Substituting $s = -1$ formally into $\sum n^{-s}$ gives $\sum n = \zeta(-1) = -1/12$. So $\sum (n + 1) = \sum n + \sum 1 = -1/12 + \zeta(0) = -1/12 + (-1/2) = -7/12$.

*Rigor disclaimer.* This **is not a summation** in the ordinary or even Cesàro/Abel sense. It is analytic continuation of a meromorphic function. It is useful in **physics** (Casimir force calculation) and **number theory** (Riemann's explicit formula), but it does not give a value in real analysis.

*Conclusion.* In standard real analysis: $\sum (n + 1) = +\infty$. Under zeta regularization: $-7/12$. These are not compatible definitions; the latter is a different formalism. $\blacksquare$

---

**Solution 5.** *Claim: If $\sum a_n, \sum b_n$ converge absolutely, so does their Cauchy product $\sum c_n$.*

*Setup.* Let $A := \sum_{k=0}^{\infty} |a_k|$ and $B := \sum_{j=0}^{\infty} |b_j|$, both finite.

*Strategy.* Bound $\sum_{n=0}^{N} |c_n|$ by $\left(\sum |a_k|\right)\left(\sum |b_j|\right)$ and apply monotone convergence.

*Computation.*

Step 1: Triangle inequality on each $c_n$:
$$|c_n| = \left| \sum_{k=0}^{n} a_k b_{n-k} \right| \leq \sum_{k=0}^{n} |a_k| |b_{n-k}|.$$

Step 2: Sum from $n = 0$ to $N$:
$$\sum_{n=0}^{N} |c_n| \leq \sum_{n=0}^{N} \sum_{k=0}^{n} |a_k| |b_{n-k}|.$$

Step 3: Change variables. Let $j = n - k$, so the index set $\{(k, n) : 0 \leq k \leq n \leq N\}$ becomes $\{(k, j) : k, j \geq 0, k + j \leq N\}$. Hence
$$\sum_{n=0}^{N} \sum_{k=0}^{n} |a_k| |b_{n-k}| = \sum_{\substack{k, j \geq 0 \\ k + j \leq N}} |a_k| |b_j|.$$

Step 4: Enlarge the summation set. Since $|a_k|, |b_j| \geq 0$,
$$\sum_{\substack{k, j \geq 0 \\ k + j \leq N}} |a_k| |b_j| \leq \sum_{\substack{0 \leq k \leq N \\ 0 \leq j \leq N}} |a_k| |b_j| = \left(\sum_{k=0}^{N} |a_k|\right)\left(\sum_{j=0}^{N} |b_j|\right) \leq A \cdot B.$$

Step 5: Conclude. The partial sums $\sum_{n=0}^{N} |c_n|$ are bounded above by $AB$, and non-decreasing (in $N$), so they converge. Hence $\sum |c_n| \leq AB < \infty$, i.e., $\sum c_n$ converges **absolutely**. $\blacksquare$

*Verification.* Taking $a_n = b_n = r^n$ with $|r| < 1$: $A = B = 1/(1 - |r|)$, and $\sum |c_n| = \sum (n+1)|r|^n = 1/(1-|r|)^2 = AB$. ✓ (The bound is tight.)

*Interpretation.* Absolute convergence is **closed** under the Cauchy product — a structurally satisfying fact, given that the product is the series-level version of multiplication. This underlies the fact that the set of absolutely convergent series forms a convolution algebra.

---

## 15.8 Summary

> **The dichotomy in one table.**
>
> | Property | Absolutely convergent $\sum a_n$ | Conditionally convergent $\sum a_n$ |
> |---|---|---|
> | Convergence preserved under any rearrangement | ✓ | ✗ |
> | Sum depends on order | **No** — unconditional | **Yes** — any extended real value by Riemann |
> | Cauchy product with another convergent series | Converges (Mertens) | May diverge |
> | Split by parity / subsequence | ✓ | ✗ (parts diverge) |
> | Fubini / swap of double sum | ✓ | ✗ in general |
> | Behaves like finite sum | ✓ | ✗ |

> **Big picture.** Conditional convergence is a **delicate cancellation phenomenon**. The sum is a property of the **ordered sequence of partial sums**, not of the set of terms. Absolute convergence, by contrast, makes the infinite sum essentially a set-theoretic operation — every manipulation available to finite sums (rearrange, regroup, split, swap order, multiply) is valid.
>
> **Practical advice.** Whenever you need to **manipulate** an infinite series — rearrange, regroup, interchange with another limit (including integration or another infinite sum), multiply by another series, split by any criterion — **first** verify absolute convergence. If only conditional convergence is available, each manipulation must be individually justified, usually via Abel's summation lemma or uniform convergence arguments.

> **Historical note.** Dirichlet's original 1829 observation (in the context of Fourier convergence) that $\sum (-1)^{n+1}/n$ can be rearranged to any sum was extended by **Riemann** (1854) to the theorem above. Cauchy himself had believed (1821) that rearrangement always preserved the sum — a natural but wrong assumption. The Cauchy product and its analysis (Mertens, Abel) came later in the 19th century as mathematicians sorted out what series manipulations were genuinely legitimate. This episode was a major impetus for **rigorous analysis**, anticipating Weierstrass's $\varepsilon\text{-}\delta$ revolution.

---

## Related Topics

- [[14-alternating-and-absolute-convergence]] — the absolute vs. conditional distinction this lesson builds on
- [[13-series-convergence-tests]] — positive-series tests used to verify absolute convergence
- [[12-infinite-series-introduction]] — foundations of series
- [[16-continuity]] — continuity of power series (which rely on absolute convergence within radius of convergence)
- [[10-cauchy-sequences-completeness]] — completeness underlies all these convergence statements
