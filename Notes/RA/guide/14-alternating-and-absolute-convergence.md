# 14. Alternating and Absolute Convergence

> **The central shift.** Every convergence test we have built so far — the comparison, ratio, root, integral, and condensation tests — was designed for **positive-term** series, where monotonicity of partial sums $(S_N)$ does all the work. Once the signs of the terms are allowed to vary, two genuinely new phenomena appear and the theory must be rebuilt.
>
> 1. A series $\sum a_n$ can converge even though $\sum |a_n|$ diverges. This is called **conditional convergence**, and it is genuinely delicate: the sum depends on the *order* of summation (Riemann, next lesson).
> 2. A series can converge *purely* because of cancellation between positive and negative terms, not because the terms are small. The alternating harmonic series $\sum (-1)^{n+1}/n = \ln 2$ is the prototype: its terms decay only like $1/n$, yet the sum is finite because consecutive terms nearly cancel.
>
> This lesson develops the three tools that handle sign-varying series: the **Leibniz alternating test** (exploiting alternation + monotone decay), the principle that **absolute convergence implies convergence** (reducing sign-varying questions to positive-term ones), and the more refined **Dirichlet and Abel tests** that exploit bounded partial sums via Abel's summation by parts. We conclude with the classification hierarchy: absolute $\Longrightarrow$ conditional $\Longrightarrow$ convergent, strict in both directions.

---

## 14.1 Alternating Series and Leibniz's Test

> **Definition 14.1 (Alternating series).**
> A series of the form
> $$\sum_{n=1}^{\infty} (-1)^{n+1} a_n = a_1 - a_2 + a_3 - a_4 + \cdots,\qquad a_n > 0,$$
> is called an **alternating series**. The equivalent form $\sum (-1)^n a_n = -a_1 + a_2 - a_3 + \cdots$ differs only by an overall sign and is covered by the same theorems.

> **Theorem 14.2 (Leibniz's alternating series test).**
> Let $(a_n)_{n \geq 1}$ be a sequence of real numbers satisfying
>
> **(i)** $a_n \geq a_{n+1} > 0$ for all $n$ (monotonically decreasing to $0^+$),
>
> **(ii)** $a_n \to 0$ as $n \to \infty$.
>
> Then the alternating series $\displaystyle \sum_{n=1}^{\infty} (-1)^{n+1} a_n$ converges to some sum $S \in (0, a_1]$. Moreover, for every $N \geq 1$,
> $$|S - S_N| \leq a_{N+1},$$
> where $S_N = \sum_{n=1}^N (-1)^{n+1} a_n$ is the $N$-th partial sum; in fact $S - S_N$ has the same sign as $(-1)^{N+2} a_{N+1}$ (the first omitted term).

**Proof.** The proof has three stages: (A) the even partial-sum subsequence $(S_{2k})$ is increasing and bounded above, hence converges by the Monotone Convergence Theorem; (B) the odd partial-sum subsequence $(S_{2k+1})$ converges to the same limit; (C) the two subsequences together cover all of $(S_N)$, so $S_N$ itself converges, and the tail estimate drops out of the interlacing.

**Step 1. Even partial sums form an increasing sequence.**

For any $k \geq 1$,
$$S_{2(k+1)} - S_{2k} = (-1)^{2k+2} a_{2k+1} + (-1)^{2k+3} a_{2k+2} = a_{2k+1} - a_{2k+2} \geq 0,$$
using hypothesis (i) in the last step. Hence $(S_{2k})$ is monotonically increasing.

**Step 2. Even partial sums are bounded above by $a_1$.**

Group the terms of $S_{2k}$ differently, leaving $a_1$ alone and pairing the rest starting from index $2$:
$$S_{2k} = a_1 - (a_2 - a_3) - (a_4 - a_5) - \cdots - (a_{2k-2} - a_{2k-1}) - a_{2k}.$$
By (i), each parenthesised difference $(a_{2j} - a_{2j+1})$ is non-negative, and $a_{2k} > 0$. Thus we are subtracting a non-negative quantity from $a_1$:
$$S_{2k} \leq a_1 \quad \text{for all } k \geq 1.$$

**Step 3. Convergence of $(S_{2k})$.**

By Steps 1 and 2, $(S_{2k})$ is monotone increasing and bounded above. The **Monotone Convergence Theorem** (see [[10-cauchy-sequences-completeness]]) gives
$$S_{2k} \;\longrightarrow\; S := \sup_{k} S_{2k}, \qquad S \leq a_1.$$
Moreover, $S_2 = a_1 - a_2 > 0$ since $a_2 < a_1$, so $S \geq S_2 > 0$; hence $S \in (0, a_1]$.

**Step 4. Convergence of $(S_{2k+1})$ to the same limit.**

For odd indices,
$$S_{2k+1} = S_{2k} + a_{2k+1}.$$
Taking $k \to \infty$ and using the algebra of limits,
$$\lim_{k \to \infty} S_{2k+1} = \lim_{k \to \infty} S_{2k} + \lim_{k \to \infty} a_{2k+1} = S + 0 = S,$$
where we used hypothesis (ii), $a_n \to 0$, for the second limit.

**Step 5. Both subsequences cover $(S_N)$, so $S_N \to S$.**

Every $N$ is either even ($N = 2k$) or odd ($N = 2k+1$), and both corresponding subsequences converge to $S$. Formally: given $\varepsilon > 0$, choose $K$ large enough that both
$$|S_{2k} - S| < \varepsilon \quad\text{and}\quad |S_{2k+1} - S| < \varepsilon \qquad (k \geq K).$$
Then for all $N \geq 2K$, $|S_N - S| < \varepsilon$. Hence $S_N \to S$.

**Step 6. The tail estimate $|S - S_N| \leq a_{N+1}$.**

From Steps 1–3, the even subsequence increases up to $S$ from below. A parallel argument shows the **odd** subsequence $(S_{2k+1})$ is monotonically *decreasing* and bounded below by $S$: indeed,
$$S_{2k+3} - S_{2k+1} = -a_{2k+2} + a_{2k+3} = -(a_{2k+2} - a_{2k+3}) \leq 0,$$
so $(S_{2k+1})$ decreases, and $S_{2k+1} = S_{2k} + a_{2k+1} \geq S_{2k}$ together with $S_{2k} \nearrow S$ gives $S_{2k+1} \geq S$.

Consequently we have the interlacing inequalities
$$S_2 \leq S_4 \leq \cdots \leq S_{2k} \leq S \leq S_{2k+1} \leq S_{2k-1} \leq \cdots \leq S_1 = a_1.$$

This immediately bounds the error: $S$ lies between consecutive partial sums $S_N$ and $S_{N+1}$, so
$$|S - S_N| \leq |S_{N+1} - S_N| = a_{N+1}.$$

Moreover the sign of $S - S_N$ matches the sign of $S_{N+1} - S_N = (-1)^{N+2} a_{N+1}$, i.e., the first omitted term. $\blacksquare$

> **Remark 14.2a (Why this bound is extraordinary).** The estimate $|S - S_N| \leq a_{N+1}$ is among the sharpest error bounds in all of analysis: the truncation error is *exactly* controlled by the first omitted term. For general positive-term series, no such bound exists — you might have to sum many more terms before the tail is small. Numerical computation of $\pi$ via $\pi/4 = 1 - 1/3 + 1/5 - \cdots$ is slow precisely because alternating convergence is typically *only* as fast as the decay of $a_n$.

> **Remark 14.2b (Why both hypotheses matter).** The hypothesis $a_n \to 0$ alone is insufficient — a counterexample is constructed in Practice Problem 5 below, where $a_n \to 0$ but $a_n$ is not monotonic, and the series diverges. Nor is monotonicity alone sufficient: if $a_n \not\to 0$ (say $a_n = 1$ for all $n$), the partial sums $1, 0, 1, 0, \ldots$ oscillate and the series diverges by the $n$-th term test.

**Prototype example — the alternating harmonic series.** Consider
$$\sum_{n=1}^{\infty} \frac{(-1)^{n+1}}{n} = 1 - \frac{1}{2} + \frac{1}{3} - \frac{1}{4} + \cdots.$$
Here $a_n = 1/n$: positive, decreasing ($\frac{1}{n+1} < \frac{1}{n}$), tending to $0$. Leibniz applies, so the series converges. Its sum is $\ln 2$ (classical, proved via the Taylor expansion of $\ln(1+x)$ at $x = 1$ using Abel's limit theorem).

But $\sum 1/n$ diverges (harmonic, $p$-series with $p=1$). This is our prototype of a **conditionally convergent** series, to be defined precisely in §14.2.

> **Numerical illustration.** To compute $\ln 2 \approx 0.6931$ to $10^{-2}$ accuracy using the error bound $|S - S_N| \leq 1/(N+1)$, we need $N \geq 99$. This is embarrassingly slow — a manifestation of the conditional (not absolute) nature of the convergence.

---

## 14.2 Absolute Convergence

> **Definition 14.3 (Absolute convergence).**
> A real series $\sum_{n=1}^\infty a_n$ converges **absolutely** if the series of absolute values $\sum_{n=1}^\infty |a_n|$ converges (in $\mathbb{R}$).

Absolute convergence is a *stronger* form of convergence: it reduces sign-handling to the positive-term theory developed in [[13-series-convergence-tests]], because every positive-term test may be applied to $\sum |a_n|$ without modification. The fundamental theorem justifying this reduction is:

> **Theorem 14.4 (Absolute convergence implies convergence).**
> If $\sum_{n=1}^\infty |a_n|$ converges in $\mathbb{R}$, then $\sum_{n=1}^\infty a_n$ also converges, and the triangle inequality holds:
> $$\left|\sum_{n=1}^{\infty} a_n\right| \;\leq\; \sum_{n=1}^{\infty} |a_n|.$$

**Proof.** The idea is to establish that the partial sums $(S_N)$ of $\sum a_n$ form a **Cauchy sequence** in $\mathbb{R}$, using the fact that the partial sums $(T_N)$ of the positive-term series $\sum |a_n|$ are Cauchy (a consequence of their convergence). Then completeness of $\mathbb{R}$ delivers the conclusion.

**Step 1. Set up the partial sums.**

Define
$$S_N = \sum_{n=1}^N a_n, \qquad T_N = \sum_{n=1}^N |a_n|.$$
By hypothesis, $T_N \to T := \sum_{n=1}^\infty |a_n|$ as $N \to \infty$.

**Step 2. $(T_N)$ is Cauchy.**

Every convergent sequence in $\mathbb{R}$ is Cauchy. Explicitly: for every $\varepsilon > 0$ there exists $N_0 = N_0(\varepsilon) \in \mathbb{N}$ such that for all $M, N \geq N_0$,
$$|T_M - T_N| < \varepsilon.$$
If $M > N$, we can write $T_M - T_N = \sum_{k=N+1}^M |a_k| \geq 0$; so the Cauchy condition becomes
$$\sum_{k=N+1}^{M} |a_k| < \varepsilon \qquad \text{for all } M > N \geq N_0. \tag{$\star$}$$

**Step 3. $(S_N)$ is Cauchy — via the triangle inequality.**

For $M > N \geq N_0$,
$$|S_M - S_N| \;=\; \left|\sum_{k=N+1}^{M} a_k\right| \;\overset{\triangle}{\leq}\; \sum_{k=N+1}^{M} |a_k| \;\overset{(\star)}{<}\; \varepsilon.$$
The inequality marked $\triangle$ is the **triangle inequality** applied to the finite sum $a_{N+1} + a_{N+2} + \cdots + a_M$; it uses only $|x + y| \leq |x| + |y|$, iterated $M - N - 1$ times.

Hence $(S_N)$ is a Cauchy sequence of real numbers.

**Step 4. Convergence via completeness.**

Cauchy sequences in $\mathbb{R}$ converge ($\mathbb{R}$ is complete, see [[10-cauchy-sequences-completeness]]). Therefore $S_N \to S$ for some $S \in \mathbb{R}$. This is exactly the statement that $\sum_{n=1}^\infty a_n$ converges.

**Step 5. The triangle inequality for the sum.**

For every finite $N$,
$$|S_N| = \left| \sum_{n=1}^N a_n \right| \leq \sum_{n=1}^N |a_n| = T_N.$$
Taking $N \to \infty$ and using continuity of the absolute value (so $|S_N| \to |S|$) and of the inequality under limits:
$$|S| \leq T, \qquad \text{i.e.,} \qquad \left|\sum_{n=1}^\infty a_n \right| \leq \sum_{n=1}^\infty |a_n|. \qquad \blacksquare$$

> **Remark 14.4a (The completeness of $\mathbb{R}$ is essential).** This theorem is *false* over $\mathbb{Q}$: an absolutely convergent series of rationals need not have a rational sum (e.g., $\sum 1/n^2 = \pi^2/6 \notin \mathbb{Q}$). The proof above crucially invokes the completeness of $\mathbb{R}$ in Step 4. In a general normed vector space $(X, \|\cdot\|)$, the statement "every absolutely convergent series converges" is *equivalent* to completeness (i.e., to $X$ being a Banach space).

> **Remark 14.4b (The converse fails).** Convergence does *not* imply absolute convergence: the alternating harmonic series $\sum (-1)^{n+1}/n$ converges (to $\ln 2$) yet $\sum 1/n$ diverges. This motivates the next definition.

> **Definition 14.5 (Conditional convergence).**
> A series $\sum a_n$ is **conditionally convergent** if it converges but $\sum |a_n|$ diverges.

**Classification summary.** Every series falls into exactly one of three disjoint classes:

| Class | $\sum a_n$ | $\sum \lvert a_n\rvert$ | Prototype |
|------|-----------|-----------|---------|
| Absolutely convergent | converges | converges | $\sum (-1)^n / n^2$ |
| Conditionally convergent | converges | diverges | $\sum (-1)^{n+1} / n$ |
| Divergent | diverges | diverges (often) | $\sum (-1)^n$, $\sum 1/n$ |

> **Key methodological principle.** All positive-term convergence tests (ratio, root, comparison, limit comparison, integral, Cauchy condensation, etc.) can be applied to $\sum |a_n|$. If any of them shows $\sum |a_n|$ converges, then by Theorem 14.4, $\sum a_n$ converges absolutely — with **no sign-handling required**. Only when $\sum |a_n|$ diverges must we turn to the more delicate tools of §14.1 and §14.4.

---

## 14.3 The Ratio and Root Tests Revisited

The ratio and root tests from [[13-series-convergence-tests]] were stated for positive-term series. Combined with Theorem 14.4, they extend immediately to *any* real (or complex) series.

> **Theorem 14.6 (Ratio test, general form).**
> Let $\sum a_n$ be a series with $a_n \neq 0$ for all sufficiently large $n$, and suppose the limit
> $$L \;=\; \lim_{n \to \infty} \left|\frac{a_{n+1}}{a_n}\right|$$
> exists in $[0, +\infty]$.
>
> **(a)** If $L < 1$, then $\sum a_n$ converges **absolutely**.
>
> **(b)** If $L > 1$ (including $L = +\infty$), then $\sum a_n$ **diverges**.
>
> **(c)** If $L = 1$, the test is **inconclusive**.

**Proof.**

*Part (a).* Apply the positive-term ratio test (Theorem 13.? of [[13-series-convergence-tests]]) to $\sum |a_n|$. Since $\lim_n |a_{n+1}|/|a_n| = L < 1$, that test yields convergence of $\sum |a_n|$. By Theorem 14.4, $\sum a_n$ converges absolutely.

*Part (b).* Suppose $L > 1$. Choose $r$ with $1 < r < L$ (if $L = +\infty$, any $r > 1$ works). By definition of limit, there exists $N_0$ such that for all $n \geq N_0$,
$$\left|\frac{a_{n+1}}{a_n}\right| > r, \qquad \text{i.e.,} \qquad |a_{n+1}| > r |a_n|.$$
Iterating for $n = N_0, N_0+1, \ldots, N_0 + k - 1$:
$$|a_{N_0 + k}| > r^k |a_{N_0}|.$$
Since $r > 1$, $r^k \to \infty$, so $|a_{N_0 + k}| \to \infty$ as $k \to \infty$. In particular $a_n \not\to 0$, and by the $n$-th term test (Divergence Test), $\sum a_n$ diverges.

*Part (c).* The standard counterexamples $\sum 1/n$ (divergent, $L = 1$) and $\sum 1/n^2$ (convergent, $L = 1$) show that when $L = 1$ either conclusion is possible. $\blacksquare$

> **Theorem 14.7 (Root test, general form).**
> Let $\sum a_n$ be any series, and let
> $$L \;=\; \limsup_{n \to \infty} |a_n|^{1/n} \;\in\; [0, +\infty].$$
>
> **(a)** If $L < 1$, then $\sum a_n$ converges **absolutely**.
>
> **(b)** If $L > 1$, then $\sum a_n$ **diverges**.
>
> **(c)** If $L = 1$, the test is **inconclusive**.

**Proof.**

*Part (a).* Choose $r$ with $L < r < 1$. By definition of $\limsup$, there exists $N_0$ such that
$$|a_n|^{1/n} < r \qquad \text{for all } n \geq N_0,$$
i.e., $|a_n| < r^n$. The geometric series $\sum r^n$ converges since $|r| < 1$. By the comparison test applied to $\sum |a_n|$, the series $\sum |a_n|$ converges. Theorem 14.4 concludes $\sum a_n$ converges absolutely.

*Part (b).* If $L > 1$, then $|a_n|^{1/n} > 1$ for infinitely many $n$, so $|a_n| > 1$ for infinitely many $n$; hence $a_n \not\to 0$ and $\sum a_n$ diverges by the Divergence Test.

*Part (c).* Same counterexamples as the ratio test: $\sum 1/n$ and $\sum 1/n^2$ both have $\limsup |a_n|^{1/n} = 1$, one diverges and the other converges. $\blacksquare$

> **Remark 14.7a (Root $\succ$ Ratio).** Whenever the ratio test gives a value $L$, the root test gives the same $L$ (a classical fact: $\lim |a_{n+1}/a_n| = L \Longrightarrow \lim |a_n|^{1/n} = L$). But the root test applies more broadly: it uses $\limsup$ rather than $\lim$, so it can handle sequences where $|a_{n+1}/a_n|$ oscillates. Example: $a_n = 2^{-n}$ for even $n$ and $a_n = 3^{-n}$ for odd $n$. Ratios oscillate, but $\limsup |a_n|^{1/n} = 1/2 < 1$.

---

## 14.4 Dirichlet and Abel Tests

The Leibniz test exploits two features simultaneously: (1) the sign of the terms alternates, and (2) the magnitudes decrease to $0$. Can we relax (1), insisting only that the "sign factor" have *bounded* partial sums (not just alternating ones)? Yes — this is **Dirichlet's test**. It is the tool used to handle series like $\sum \sin(n)/n$ or $\sum \cos(n\theta)/n^p$ with $0 < p \leq 1$, where no alternation is visible but the trigonometric partial sums remain bounded.

The key algebraic trick is a discrete analogue of integration by parts:

> **Lemma 14.8 (Abel's summation by parts).**
> Let $(a_n)$ and $(b_n)$ be any two sequences. Define the partial sums $B_n = b_1 + b_2 + \cdots + b_n$ for $n \geq 1$, with the convention $B_0 = 0$. Then for every $N \geq 1$,
> $$\sum_{n=1}^{N} a_n b_n \;=\; a_N B_N \;-\; \sum_{n=1}^{N-1} (a_{n+1} - a_n) B_n.$$
> Equivalently,
> $$\sum_{n=1}^{N} a_n b_n \;=\; a_N B_N \;+\; \sum_{n=1}^{N-1} (a_n - a_{n+1}) B_n.$$

**Proof.** The strategy is to rewrite each $b_n$ as a "discrete derivative" $B_n - B_{n-1}$ (the discrete analogue of $dB/dx$) and then re-index the sum to shift the "derivative" onto the factor $a_n$ — precisely the discrete counterpart of $\int u \, dv = uv - \int v \, du$.

**Step 1. Write $b_n$ as a telescoping difference.**

By definition of $B_n$, $b_n = B_n - B_{n-1}$ for every $n \geq 1$ (using $B_0 = 0$).

**Step 2. Substitute and split.**
$$\sum_{n=1}^N a_n b_n = \sum_{n=1}^N a_n (B_n - B_{n-1}) = \underbrace{\sum_{n=1}^N a_n B_n}_{(\mathrm{I})} - \underbrace{\sum_{n=1}^N a_n B_{n-1}}_{(\mathrm{II})}.$$

**Step 3. Re-index (II) to shift the index.**

Let $m = n - 1$ in (II): when $n = 1$, $m = 0$; when $n = N$, $m = N-1$. Thus
$$(\mathrm{II}) = \sum_{m=0}^{N-1} a_{m+1} B_m.$$
Since $B_0 = 0$, the $m = 0$ term vanishes, leaving
$$(\mathrm{II}) = \sum_{m=1}^{N-1} a_{m+1} B_m.$$

**Step 4. Combine.**

Separate the $n = N$ term in (I):
$$(\mathrm{I}) = a_N B_N + \sum_{n=1}^{N-1} a_n B_n.$$
Subtracting (II):
$$\sum_{n=1}^N a_n b_n = a_N B_N + \sum_{n=1}^{N-1} a_n B_n - \sum_{n=1}^{N-1} a_{n+1} B_n = a_N B_N + \sum_{n=1}^{N-1} (a_n - a_{n+1}) B_n. \qquad \blacksquare$$

> **Analogy with integration by parts.** Write $\Delta a_n := a_{n+1} - a_n$ for the forward difference. Then Abel's lemma reads $\sum a_n b_n = a_N B_N - \sum B_n (\Delta a_n)$ — compare $\int u \, dv = uv\big|_a^b - \int v \, du$. The boundary term $a_N B_N$ corresponds to $uv\big|_a^b$, and the sum of $B_n \Delta a_n$ corresponds to $\int v \, du$.

With Abel's lemma in hand, both tests follow cleanly.

> **Theorem 14.9 (Dirichlet's test).**
> Suppose $(a_n)$ and $(b_n)$ satisfy:
>
> **(i)** $(a_n)$ is monotonically decreasing with $a_n \to 0$,
>
> **(ii)** the partial sums $B_N = b_1 + \cdots + b_N$ are **bounded**: there exists $M > 0$ with $|B_N| \leq M$ for all $N \geq 1$.
>
> Then $\displaystyle \sum_{n=1}^\infty a_n b_n$ converges.

**Proof.** We apply Abel's lemma and show both pieces — the boundary term $a_N B_N$ and the remainder sum — have finite limits as $N \to \infty$.

**Step 1. Boundary term vanishes.**

$|a_N B_N| \leq a_N \cdot M$ by (ii). Since $a_N \to 0$ by (i), $a_N B_N \to 0$.

**Step 2. The remainder series converges absolutely.**

Consider
$$\sum_{n=1}^{\infty} (a_n - a_{n+1}) B_n.$$
We show it converges absolutely. For each $n$, $a_n - a_{n+1} \geq 0$ by monotonicity of $(a_n)$, and $|B_n| \leq M$, so
$$|(a_n - a_{n+1}) B_n| = (a_n - a_{n+1}) |B_n| \leq M (a_n - a_{n+1}).$$

Now observe that $\sum_{n=1}^{K} (a_n - a_{n+1})$ **telescopes**:
$$\sum_{n=1}^{K} (a_n - a_{n+1}) = a_1 - a_{K+1}.$$
As $K \to \infty$, $a_{K+1} \to 0$, so $\sum_{n=1}^\infty (a_n - a_{n+1}) = a_1 < \infty$ (and crucially is finite).

Hence
$$\sum_{n=1}^\infty |(a_n - a_{n+1}) B_n| \leq M \sum_{n=1}^{\infty}(a_n - a_{n+1}) = M a_1 < \infty.$$
By Theorem 14.4, $\sum (a_n - a_{n+1}) B_n$ converges absolutely, hence converges.

**Step 3. Assemble.**

Denote by $U_N = \sum_{n=1}^{N-1} (a_n - a_{n+1}) B_n$ the partial sums of the remainder series; by Step 2, $U_N \to U$ for some $U \in \mathbb{R}$. By Abel's lemma,
$$\sum_{n=1}^N a_n b_n = a_N B_N + U_N \;\longrightarrow\; 0 + U = U.$$
Thus $\sum a_n b_n$ converges (to $U$). $\blacksquare$

> **Theorem 14.10 (Abel's test).**
> Suppose $(a_n)$ and $(b_n)$ satisfy:
>
> **(i)** $(a_n)$ is **monotonic and bounded** (hence, by the Monotone Convergence Theorem, convergent — say $a_n \to L$),
>
> **(ii)** $\sum_{n=1}^\infty b_n$ converges.
>
> Then $\displaystyle \sum_{n=1}^\infty a_n b_n$ converges.

**Proof.** The idea is to decompose $a_n = L + c_n$ where $c_n = a_n - L \to 0$ monotonically, reducing Abel's test to a linear combination of a trivially convergent series and a Dirichlet-type series.

**Step 1. Decompose $(a_n)$.**

Set $L = \lim a_n$ and $c_n = a_n - L$. Then:
- $c_n \to 0$ (by definition of $L$).
- $c_n$ is monotonic in the same direction as $a_n$ (shifting by a constant preserves monotonicity).

**Step 2. Ensure $c_n$ is monotonically decreasing to $0^+$.**

If $(a_n)$ is decreasing, then $(c_n)$ is decreasing; since $c_n \to 0$ from above (as $a_n \geq L$), we have $c_n \geq 0$ and $c_n \downarrow 0$. In this case Dirichlet applies directly to $\sum c_n b_n$.

If $(a_n)$ is increasing, then $(c_n)$ is increasing with $c_n \leq 0$; set $\tilde c_n = -c_n \geq 0$, decreasing to $0$. Then $\sum c_n b_n = -\sum \tilde c_n b_n$ and we reduce to the previous case.

In either case, $\sum c_n b_n$ will have the same convergence behaviour as a Dirichlet-type sum with monotone decay factor.

**Step 3. Partial sums of $\sum b_n$ are bounded.**

Since $\sum b_n$ converges (hypothesis (ii)), its partial sums $B_N = b_1 + \cdots + b_N$ form a convergent (hence bounded) sequence. So there is $M$ with $|B_N| \leq M$ for all $N$.

**Step 4. Apply Dirichlet to $\sum c_n b_n$.**

By Steps 2 and 3, $(c_n)$ (or its sign-flip) is monotone decreasing to $0$, and $(B_N)$ is bounded. Theorem 14.9 gives convergence of $\sum c_n b_n$.

**Step 5. Combine.**

Write
$$\sum_{n=1}^N a_n b_n = \sum_{n=1}^N (L + c_n) b_n = L \sum_{n=1}^N b_n + \sum_{n=1}^N c_n b_n.$$
Both terms on the right converge as $N \to \infty$: the first by (ii), the second by Step 4. Hence $\sum a_n b_n$ converges. $\blacksquare$

> **Remark 14.10a (Leibniz is a special case of Dirichlet).** Take $b_n = (-1)^{n+1}$. Then
> $$B_N = \sum_{k=1}^N (-1)^{k+1} = \begin{cases} 1 & N \text{ odd} \\ 0 & N \text{ even}\end{cases},$$
> so $|B_N| \leq 1$ for all $N$. If additionally $(a_n) \downarrow 0$, Dirichlet (Theorem 14.9) gives convergence of $\sum (-1)^{n+1} a_n$ — exactly the Leibniz test. Dirichlet is thus a **strict generalization** of Leibniz.

> **Remark 14.10b (Trigonometric partial sums are bounded).** Dirichlet applies immediately to $\sum a_n \cos(n\theta)$ and $\sum a_n \sin(n\theta)$ for $\theta \not\equiv 0 \pmod{2\pi}$, because the partial sums $\sum \cos(k\theta)$ and $\sum \sin(k\theta)$ are uniformly bounded by $1/|\sin(\theta/2)|$ — a closed-form identity proved via complex exponentials (see Worked Example 3).

---

## 14.5 Worked Examples

**Example 1.** Determine the convergence behaviour of
$$\sum_{n=1}^{\infty} \frac{(-1)^{n+1}}{\sqrt{n}}.$$

**Setup.** This is an alternating series with $a_n = 1/\sqrt n > 0$ for $n \geq 1$. We must test **convergence** (via Leibniz) and then **absolute convergence** (via a positive-term test on $\sum 1/\sqrt n$).

**Strategy.** Verify the two Leibniz hypotheses for $a_n = 1/\sqrt n$, then apply the $p$-series test (with $p = 1/2$) to $\sum |a_n| = \sum n^{-1/2}$.

**Computation — Leibniz hypotheses.**

*Hypothesis (i): $a_n$ is monotonically decreasing.* Let $f(x) = 1/\sqrt x = x^{-1/2}$. Then $f'(x) = -\tfrac12 x^{-3/2} < 0$ for $x > 0$. Hence $f$ is strictly decreasing on $(0, \infty)$, so $a_n = f(n)$ is strictly decreasing. Equivalently by elementary algebra: $\sqrt{n+1} > \sqrt n \Longrightarrow 1/\sqrt{n+1} < 1/\sqrt n$. ✓

*Hypothesis (ii): $a_n \to 0$.* For $\varepsilon > 0$, choose $N > 1/\varepsilon^2$; then $n \geq N \Longrightarrow \sqrt n \geq \sqrt N > 1/\varepsilon \Longrightarrow 1/\sqrt n < \varepsilon$. So $1/\sqrt n \to 0$. ✓

By Leibniz (Theorem 14.2), $\sum (-1)^{n+1}/\sqrt n$ **converges**.

**Computation — absolute convergence.**
$$\sum_{n=1}^\infty |a_n| = \sum_{n=1}^\infty \frac{1}{\sqrt n} = \sum_{n=1}^\infty \frac{1}{n^{1/2}}.$$
This is a $p$-series with $p = 1/2$. Since $p = 1/2 \leq 1$, the $p$-series test gives **divergence**.

**Verification.** Cross-check via the integral test:
$$\int_1^\infty \frac{dx}{\sqrt x} = \lim_{R \to \infty} \left[2\sqrt x\right]_1^R = \lim_{R \to \infty}(2\sqrt R - 2) = \infty,$$
confirming divergence of $\sum 1/\sqrt n$.

**Interpretation.** The series converges, but not absolutely — this is a genuine case of **conditional convergence**. The convergence relies entirely on the alternating signs; removing them ($\sum 1/\sqrt n$) destroys convergence.

**Error bound.** The Leibniz tail estimate gives $|S - S_N| \leq 1/\sqrt{N+1}$. To compute $S$ to accuracy $10^{-2}$, we need $N \geq 10^4 - 1$ — even slower than the alternating harmonic series, consistent with slower decay.

---

**Example 2.** Show that
$$\sum_{n=1}^{\infty} \frac{(-1)^{n+1}}{n^2}$$
converges absolutely, and give a bound on its sum.

**Setup.** Again alternating with $a_n = 1/n^2$, but now the magnitudes decay faster.

**Strategy.** Directly verify absolute convergence by applying the $p$-series test to $\sum 1/n^2$.

**Computation.**
$$\sum_{n=1}^\infty |a_n| = \sum_{n=1}^\infty \frac{1}{n^2}.$$
This is a $p$-series with $p = 2 > 1$. Hence $\sum 1/n^2$ **converges**, and by Theorem 14.4 the original alternating series converges **absolutely**.

**Verification via integral test.**
$$\int_1^\infty \frac{dx}{x^2} = \left[-\frac{1}{x}\right]_1^\infty = 0 - (-1) = 1 < \infty. \ \checkmark$$

**Bound on the sum.** By the triangle inequality part of Theorem 14.4,
$$\left|\sum_{n=1}^\infty \frac{(-1)^{n+1}}{n^2}\right| \leq \sum_{n=1}^\infty \frac{1}{n^2} = \frac{\pi^2}{6} \approx 1.6449.$$
(The actual sum is $\pi^2/12 \approx 0.8225$, but we obtain this only from deeper Fourier-series arguments.)

**Interpretation.** Once absolute convergence is established, Leibniz adds no new information — absolute convergence is the stronger property and implies convergence automatically. The extra feature of absolute convergence is that it is **rearrangement-invariant**: we may reorder the terms arbitrarily without changing the sum, a property not shared with conditionally convergent series (see [[15-rearrangement-of-series]]).

---

**Example 3.** Determine the convergence of
$$\sum_{n=1}^{\infty} \frac{\sin n}{n}.$$

**Setup.** There is no alternation here — the signs of $\sin n$ follow an irregular pattern determined by the orbit of $n \pmod{2\pi}$ on the unit circle. So Leibniz does not apply. We attempt Dirichlet with $a_n = 1/n$ and $b_n = \sin n$.

**Strategy.** Verify: (1) $a_n = 1/n$ decreases monotonically to $0$; (2) the partial sums $B_N = \sum_{k=1}^N \sin k$ are bounded — we compute them explicitly via a closed-form identity.

**Computation of $B_N$.** We derive the identity
$$B_N = \sum_{k=1}^N \sin k = \frac{\sin(N/2) \, \sin((N+1)/2)}{\sin(1/2)}.$$

*Derivation.* Multiply and divide by $2 \sin(1/2)$, and use the product-to-sum identity $2 \sin A \sin B = \cos(A - B) - \cos(A + B)$:
$$2 \sin(1/2) \sin k = \cos\!\left(k - \tfrac12\right) - \cos\!\left(k + \tfrac12\right).$$
Summing over $k = 1, \ldots, N$ telescopes:
$$2 \sin(1/2) \, B_N = \sum_{k=1}^N \left[\cos\!\left(k - \tfrac12\right) - \cos\!\left(k + \tfrac12\right)\right] = \cos(\tfrac12) - \cos(N + \tfrac12).$$
Using the sum-to-product identity $\cos A - \cos B = -2 \sin(\tfrac{A+B}{2}) \sin(\tfrac{A-B}{2})$ with $A = 1/2$, $B = N + 1/2$:
$$\cos(\tfrac12) - \cos(N + \tfrac12) = -2 \sin\!\left(\tfrac{N+1}{2}\right) \sin\!\left(-\tfrac{N}{2}\right) = 2 \sin\!\left(\tfrac{N+1}{2}\right) \sin\!\left(\tfrac{N}{2}\right).$$
Therefore
$$B_N = \frac{\sin(N/2) \, \sin((N+1)/2)}{\sin(1/2)}.$$

**Boundedness.** Since $|\sin x| \leq 1$ for all $x$,
$$|B_N| \leq \frac{1}{\sin(1/2)} \approx \frac{1}{0.4794} \approx 2.086 < \infty \quad \text{for all } N.$$

Both Dirichlet hypotheses hold:
- $(1/n) \downarrow 0$: monotone decrease to $0$. ✓
- $|B_N| \leq 1/\sin(1/2) \approx 2.086$: bounded. ✓

By Dirichlet's test (Theorem 14.9), $\sum \sin n / n$ **converges**.

**Absolute convergence?** We claim $\sum |\sin n|/n$ diverges. Intuitively, $|\sin n|$ is "typically" of order $1$ (more precisely, its Cesàro average is $2/\pi$), so $|\sin n|/n \sim 1/n$ on average, and $\sum 1/n$ diverges.

*Rigorous argument.* We use that $|\sin x| \geq 1/2$ on the set $\bigcup_{k \in \mathbb{Z}} [k\pi + \pi/6, k\pi + 5\pi/6]$, which covers an interval of length $2\pi/3$ in every period $\pi$. Hence in every block of $\pi \approx 3.14$ consecutive integers, at least $\lfloor 2\pi/3 \rfloor = 2$ of them satisfy $|\sin n| \geq 1/2$. So at least $\frac{2}{4} = \tfrac12$ of every four consecutive integers have $|\sin n| \geq 1/2$ (equidistribution of $n$ mod $2\pi$ gives a slightly better $\approx 2/3$, but $1/2$ suffices for divergence).

Therefore for some constant $c > 0$,
$$\sum_{n=1}^{N} \frac{|\sin n|}{n} \geq c \sum_{\substack{n=1 \\ |\sin n| \geq 1/2}}^{N} \frac{1}{n} \geq \frac{c}{2} \cdot \sum_{n=1}^N \frac{1}{n} \to \infty,$$
using the divergence of the harmonic series. Hence $\sum |\sin n|/n = \infty$.

**Conclusion.** $\sum \sin n/n$ is **conditionally convergent**.

**Interpretation.** This is the canonical example of a Dirichlet-type series that falls outside the Leibniz framework. It also underlies the convergence of **Fourier series** of discontinuous functions like the sawtooth (Dirichlet's original motivation for the test).

---

**Example 4.** Investigate
$$\sum_{n=2}^{\infty} \frac{(-1)^n}{\ln n}.$$

**Setup.** Alternating series with $a_n = 1/\ln n$, defined for $n \geq 2$ since $\ln 1 = 0$.

**Strategy.** Leibniz for convergence; compare $\sum 1/\ln n$ with $\sum 1/n$ for absolute convergence.

**Computation — Leibniz hypotheses.**

*(i) Monotonicity.* $\ln$ is strictly increasing on $(0, \infty)$, so $\ln(n+1) > \ln n > 0$ for $n \geq 2$, hence
$$a_{n+1} = \frac{1}{\ln(n+1)} < \frac{1}{\ln n} = a_n. \ \checkmark$$

*(ii) Limit.* As $n \to \infty$, $\ln n \to \infty$, so $a_n = 1/\ln n \to 0$. ✓

By Leibniz, the series **converges**.

**Computation — absolute convergence.**

$\sum_{n=2}^\infty 1/\ln n$: we show this diverges by **comparison with the harmonic series**.

*Claim.* For all $n \geq 2$, $\ln n \leq n$, hence $1/\ln n \geq 1/n$.

*Proof of claim.* Let $g(x) = x - \ln x$ for $x \geq 1$. Then $g(1) = 1 - 0 = 1 > 0$ and $g'(x) = 1 - 1/x \geq 0$ for $x \geq 1$, so $g$ is non-decreasing on $[1, \infty)$, hence $g(x) \geq g(1) = 1 > 0$, i.e., $x > \ln x$ for $x \geq 1$. In particular $\ln n < n$ for $n \geq 2$, so $1/\ln n > 1/n > 0$. ✓

By the direct comparison test,
$$\sum_{n=2}^\infty \frac{1}{\ln n} \geq \sum_{n=2}^\infty \frac{1}{n} = \infty.$$
So $\sum 1/\ln n$ diverges.

**Conclusion.** The series $\sum (-1)^n / \ln n$ is **conditionally convergent**.

**Interpretation.** Logarithmic decay is extremely slow — slower than any $p$-series with $p > 0$. In the classification of decay rates
$$\frac{1}{\ln n} \gg \frac{1}{n^p} \ (p > 0) \gg \frac{1}{n \ln n} \gg \frac{1}{n^2},$$
only the last two correspond to convergent positive-term series. The alternating series in between require Leibniz to coax out convergence via sign cancellation.

---

**Example 5.** Test the convergence of
$$\sum_{n=1}^{\infty} (-1)^{n+1} \frac{n}{n^2+1}.$$

**Setup.** Alternating series with $a_n = n/(n^2 + 1)$.

**Strategy.** Check Leibniz hypotheses (monotone decrease requires a derivative computation) and then check $\sum n/(n^2+1)$ for absolute convergence via limit comparison with $\sum 1/n$.

**Computation — $a_n \to 0$.**

For $n \geq 1$,
$$a_n = \frac{n}{n^2 + 1} = \frac{1}{n + 1/n} \leq \frac{1}{n},$$
and $1/n \to 0$, so $a_n \to 0$ by sandwich. ✓

**Computation — monotone decrease.**

Define $f(x) = x/(x^2 + 1)$ for $x \geq 1$. By the quotient rule:
$$f'(x) = \frac{(x^2 + 1) \cdot 1 - x \cdot 2x}{(x^2 + 1)^2} = \frac{x^2 + 1 - 2x^2}{(x^2 + 1)^2} = \frac{1 - x^2}{(x^2 + 1)^2}.$$
For $x \geq 1$, $1 - x^2 \leq 0$ (with equality at $x = 1$), so $f'(x) \leq 0$. Hence $f$ is decreasing on $[1, \infty)$, and therefore $a_n = f(n)$ is decreasing for $n \geq 1$. ✓

**Verification of decrease without calculus.** We can check $a_{n+1} \leq a_n$ directly: cross-multiplying (both sides positive), $a_{n+1} \leq a_n \iff (n+1)(n^2 + 1) \leq n((n+1)^2 + 1)$. Expand:
- LHS: $(n+1)(n^2 + 1) = n^3 + n + n^2 + 1 = n^3 + n^2 + n + 1$.
- RHS: $n((n+1)^2 + 1) = n(n^2 + 2n + 2) = n^3 + 2n^2 + 2n$.
- Difference: $\text{RHS} - \text{LHS} = n^2 + n - 1 > 0$ for $n \geq 1$. ✓

By Leibniz, the series **converges**.

**Computation — absolute convergence.**

Test $\sum_{n=1}^\infty n/(n^2 + 1)$ via **limit comparison** with $\sum 1/n$:
$$\lim_{n \to \infty} \frac{n/(n^2 + 1)}{1/n} = \lim_{n \to \infty} \frac{n^2}{n^2 + 1} = \lim_{n \to \infty} \frac{1}{1 + 1/n^2} = 1 \in (0, \infty).$$
Since $\sum 1/n$ diverges and the limit is positive and finite, by the Limit Comparison Test, $\sum n/(n^2 + 1)$ also diverges.

**Conclusion.** $\sum (-1)^{n+1} n/(n^2 + 1)$ is **conditionally convergent**.

**Interpretation.** The terms decay like $1/n$, which is precisely at the boundary of absolute summability. So alternation is necessary *and* sufficient to induce convergence — another archetypal conditional case.

---

## 14.6 Practice Problems

1. Test $\displaystyle \sum_{n=1}^{\infty} \frac{(-1)^{n+1}}{n^p}$ for $p \in \mathbb{R}$: classify absolute / conditional / divergent behaviour as a function of $p$.

2. Determine the convergence of $\displaystyle \sum_{n=2}^{\infty} \frac{(-1)^n}{n \ln n}$.

3. Test $\displaystyle \sum_{n=1}^{\infty} \frac{\cos(n \pi/3)}{n}$ for convergence.

4. Prove: if $\sum a_n$ converges absolutely and $(b_n)$ is bounded, then $\sum a_n b_n$ converges absolutely.

5. Let $a_n = \dfrac{(-1)^{n+1}}{\sqrt{n} + (-1)^{n+1}}$ for $n \geq 2$. Show that the Leibniz test **fails** (explain precisely why) and that the series in fact **diverges**.

6. Use Dirichlet's test to prove: if $0 < \theta < 2\pi$ and $(a_n) \downarrow 0$, then $\sum a_n \cos(n\theta)$ and $\sum a_n \sin(n\theta)$ both converge.

7. Show that if $\sum a_n$ is conditionally convergent, then the series $\sum a_n^+$ of positive parts and $\sum a_n^-$ of negative parts both diverge (to $+\infty$).

### Solutions

---

**Solution 1.** Test $\sum_{n=1}^\infty (-1)^{n+1}/n^p$ for every $p \in \mathbb{R}$.

**Setup.** Let $a_n = 1/n^p$. We split into cases by $p$.

**Case A: $p > 1$.** The positive $p$-series $\sum 1/n^p$ converges, so the alternating series converges **absolutely** by Theorem 14.4.

*Check that Leibniz also applies:* $a_n = n^{-p}$ is positive and decreases to $0$ whenever $p > 0$. So the alternating series also converges by Leibniz — but absolute convergence is the stronger classification.

**Case B: $0 < p \leq 1$.** Absolute convergence fails: $\sum 1/n^p$ is a $p$-series with $p \leq 1$, which diverges (harmonic-like). So $\sum |a_n|$ diverges. However, Leibniz still applies:
- Monotonicity: $f(x) = x^{-p}$ has $f'(x) = -p x^{-p-1} < 0$ for $x > 0$, so $(a_n)$ decreases.
- Limit: $a_n = n^{-p} \to 0$ as $n \to \infty$ since $p > 0$.

By Leibniz, the alternating series **converges**. Since $\sum |a_n|$ diverges, it is **conditionally convergent**.

**Case C: $p = 0$.** $a_n = 1/n^0 = 1$, so the series becomes $\sum (-1)^{n+1}$. Partial sums oscillate between $0$ and $1$, and $a_n \not\to 0$. By the Divergence Test, the series **diverges**.

**Case D: $p < 0$.** Write $p = -q$ with $q > 0$. Then $a_n = n^{-p} = n^q \to \infty$, so the terms $(-1)^{n+1} n^q$ do not approach $0$. By the Divergence Test, the series **diverges**.

**Summary.**

| Range of $p$ | Classification |
|---|---|
| $p > 1$ | Absolutely convergent |
| $0 < p \leq 1$ | Conditionally convergent |
| $p \leq 0$ | Divergent |

> **Interpretation.** The threshold $p = 1$ separates absolute from conditional convergence (think harmonic series), and $p = 0$ is the threshold between conditional convergence and divergence (the $n$-th term test boundary).

---

**Solution 2.** Determine convergence of $\sum_{n=2}^\infty (-1)^n/(n \ln n)$.

**Setup.** Alternating with $a_n = 1/(n \ln n)$ for $n \geq 2$.

**Leibniz check.**

*Monotonicity:* The function $g(x) = x \ln x$ has derivative $g'(x) = \ln x + 1 > 0$ for $x > 1/e$, hence $g$ is increasing on $[2, \infty)$. Therefore $1/g(x) = 1/(x \ln x)$ is decreasing, and $a_n = 1/(n \ln n)$ is decreasing. ✓

*Limit:* $n \ln n \to \infty$, so $a_n \to 0$. ✓

By Leibniz, the series **converges**.

**Absolute convergence — integral test on $\sum 1/(n \ln n)$.**

Consider $\displaystyle \int_2^\infty \frac{dx}{x \ln x}$. Substitute $u = \ln x$, $du = dx/x$; when $x = 2$, $u = \ln 2$; as $x \to \infty$, $u \to \infty$. Thus
$$\int_2^\infty \frac{dx}{x \ln x} = \int_{\ln 2}^\infty \frac{du}{u} = \left[\ln u\right]_{\ln 2}^\infty = \infty.$$

By the integral test (noting $1/(x \ln x)$ is positive, continuous, and decreasing on $[2, \infty)$), $\sum_{n=2}^\infty 1/(n \ln n)$ **diverges**.

**Conclusion.** $\sum (-1)^n /(n \ln n)$ is **conditionally convergent**.

> **Interpretation.** This series sits one "logarithm slower" than the alternating harmonic series: it converges for the same reason (alternation + monotone decay), but the absolute series is just barely above the threshold of divergence — the integral $\int dx/(x \ln x)$ diverges logarithmically (as $\ln \ln x$), the slowest divergence of all.

---

**Solution 3.** Test $\sum_{n=1}^\infty \cos(n\pi/3)/n$ for convergence.

**Setup.** There is no alternation, but the numerator $\cos(n\pi/3)$ cycles through a fixed pattern of six values. We attempt Dirichlet with $a_n = 1/n$ and $b_n = \cos(n\pi/3)$.

**Dirichlet hypothesis (i).** $a_n = 1/n$ decreases monotonically to $0$. ✓

**Dirichlet hypothesis (ii) — bounded partial sums of $b_n$.**

*Derivation of closed form.* Write $\theta = \pi/3$. By a derivation analogous to Worked Example 3 (multiply by $2\sin(\theta/2)$ and telescope via product-to-sum):
$$\sum_{k=1}^N \cos(k\theta) = \frac{\sin(N\theta/2) \cos((N+1)\theta/2)}{\sin(\theta/2)}.$$

*Boundedness.* Since $|\sin|, |\cos| \leq 1$:
$$\left|\sum_{k=1}^N \cos(k\pi/3)\right| \leq \frac{1}{\sin(\pi/6)} = \frac{1}{1/2} = 2 \quad\text{for all } N. \ \checkmark$$

*Concrete verification.* The values $\cos(k\pi/3)$ for $k = 1, 2, 3, 4, 5, 6$ are $\frac12, -\frac12, -1, -\frac12, \frac12, 1$, summing to $0$. The pattern is periodic with period $6$, so partial sums oscillate among at most six distinct values, all bounded in $[-1, 1]$. Explicitly:
| $N$ | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | ... |
|---|---|---|---|---|---|---|---|---|---|
| $B_N$ | $\tfrac12$ | $0$ | $-1$ | $-\tfrac32$ | $-1$ | $0$ | $\tfrac12$ | $0$ | ... |

So $|B_N| \leq 3/2 \leq 2$ for all $N$. ✓

By Dirichlet (Theorem 14.9), $\sum \cos(n\pi/3)/n$ **converges**.

**Absolute convergence?** The sequence $|\cos(n\pi/3)|$ cycles through $\{1/2, 1/2, 1, 1/2, 1/2, 1\}$, with average $2/3$. Hence
$$\sum_{n=1}^\infty \frac{|\cos(n\pi/3)|}{n} \geq \frac{1}{2} \sum_{n=1}^\infty \frac{1}{n} = \infty,$$
where we used $|\cos(n\pi/3)| \geq 1/2$ for all $n$. So the absolute series **diverges**.

**Conclusion.** **Conditionally convergent**.

---

**Solution 4.** If $\sum a_n$ converges absolutely and $|b_n| \leq M$, then $\sum a_n b_n$ converges absolutely.

**Setup.** Let $T_N = \sum_{n=1}^N |a_n|$ and $U_N = \sum_{n=1}^N |a_n b_n|$.

**Proof.** By hypothesis, $(T_N)$ converges to some $T \in \mathbb{R}$; in particular $T_N \leq T$ for all $N$ (since $T_N$ is monotone increasing in $N$, being a sum of non-negatives).

**Step 1. $(U_N)$ is increasing.** Since $|a_n b_n| \geq 0$, $U_{N+1} - U_N = |a_{N+1} b_{N+1}| \geq 0$.

**Step 2. $(U_N)$ is bounded above.** Using $|b_n| \leq M$:
$$U_N = \sum_{n=1}^N |a_n b_n| = \sum_{n=1}^N |a_n| \cdot |b_n| \leq M \sum_{n=1}^N |a_n| = M \cdot T_N \leq M T.$$

**Step 3. Conclusion.** $(U_N)$ is monotone increasing and bounded above; by the Monotone Convergence Theorem, it converges. Therefore $\sum |a_n b_n|$ converges, i.e., $\sum a_n b_n$ converges **absolutely** (hence converges by Theorem 14.4). $\blacksquare$

> **Interpretation.** Absolute convergence is preserved under multiplication by a bounded factor — a clean general principle. The analogous statement for mere convergence (dropping "absolutely") is false: take $a_n = (-1)^{n+1}/\sqrt n$ (conditionally convergent) and $b_n = (-1)^{n+1}/\sqrt n$ (bounded). Then $a_n b_n = 1/n$, and $\sum 1/n$ diverges.

---

**Solution 5.** Let
$$a_n = \frac{(-1)^{n+1}}{\sqrt n + (-1)^{n+1}}, \qquad n \geq 2.$$
Show that Leibniz fails and the series diverges.

**Setup.** This problem demonstrates the *necessity* of the monotonicity hypothesis in Leibniz. The modification $(-1)^{n+1}$ in the denominator wobbles the magnitudes in a way that defeats monotonicity, and despite the alternation and decay $|a_n| \to 0$, the series diverges.

**Step 1. Leibniz fails — non-monotonicity.**

Note $|a_n| = 1/(\sqrt n + (-1)^{n+1})$. For odd $n$, denominator is $\sqrt n + 1$; for even $n$, denominator is $\sqrt n - 1$. Since $\sqrt n + 1 > \sqrt n - 1$, we get
$$|a_{\text{odd}}| = \frac{1}{\sqrt n + 1} \;<\; \frac{1}{\sqrt n - 1} \;=\; |a_{\text{even}}|.$$
So $(|a_n|)$ is not monotonically decreasing: it oscillates above and below. The Leibniz test does not apply.

**Step 2. Rationalise to reveal the divergence.**

Multiply numerator and denominator of $a_n$ by the conjugate $\sqrt n - (-1)^{n+1}$:
$$a_n = \frac{(-1)^{n+1} \left(\sqrt n - (-1)^{n+1}\right)}{\left(\sqrt n + (-1)^{n+1}\right)\left(\sqrt n - (-1)^{n+1}\right)} = \frac{(-1)^{n+1}\sqrt n - ((-1)^{n+1})^2}{n - ((-1)^{n+1})^2}.$$
Since $((-1)^{n+1})^2 = 1$, the expression simplifies to
$$a_n = \frac{(-1)^{n+1} \sqrt n - 1}{n - 1} = \underbrace{\frac{(-1)^{n+1} \sqrt n}{n-1}}_{=: u_n} - \underbrace{\frac{1}{n-1}}_{=: v_n}.$$

**Step 3. Convergence of $\sum u_n$.**

$u_n = (-1)^{n+1} \sqrt n/(n - 1)$ is alternating. Let $c_n = \sqrt n/(n-1)$; we check Leibniz for $c_n$.

*Limit:* $c_n = \sqrt n/(n-1) \sim 1/\sqrt n \to 0$. ✓

*Monotonicity:* Define $h(x) = \sqrt x/(x - 1)$ for $x \geq 2$. By the quotient rule:
$$h'(x) = \frac{\tfrac{1}{2\sqrt x}(x - 1) - \sqrt x}{(x-1)^2} = \frac{(x-1) - 2x}{2\sqrt x (x-1)^2} = \frac{-x - 1}{2\sqrt x (x-1)^2} < 0 \quad\text{for } x \geq 2.$$
So $h$ is decreasing, hence $c_n$ is decreasing. ✓

By Leibniz, $\sum u_n$ **converges**.

**Step 4. Divergence of $\sum v_n$.**

$\sum_{n \geq 2} v_n = \sum_{n \geq 2} 1/(n-1) = \sum_{m \geq 1} 1/m$, the harmonic series, which **diverges**.

**Step 5. Combine.**

$\sum a_n = \sum u_n - \sum v_n$: the first converges, the second diverges. Therefore $\sum a_n$ **diverges**.

(Formally: if $\sum a_n$ converged, then $\sum v_n = \sum u_n - \sum a_n$ would converge, a contradiction.)

**Conclusion.** The series **diverges**, even though $a_n \to 0$ and the signs alternate. The failure of monotonicity in $|a_n|$ is decisive.

> **Moral.** Leibniz's test requires **all three** conditions: alternation, $|a_n| \to 0$, **and** monotonicity of $|a_n|$. Dropping monotonicity — even slightly — can destroy convergence. This example shows that alternation + decay *alone* is insufficient: cancellation must happen in an orderly fashion (monotonically shrinking terms) to guarantee convergence.

---

**Solution 6.** Prove that if $(a_n) \downarrow 0$ and $0 < \theta < 2\pi$, then $\sum a_n \cos(n\theta)$ and $\sum a_n \sin(n\theta)$ both converge.

**Strategy.** Apply Dirichlet with $b_n = \cos(n\theta)$ (or $\sin(n\theta)$). Hypothesis (i) on $(a_n)$ is given. We only need to bound the partial sums of $(b_n)$.

**Partial sums of cosines and sines.** From Worked Example 3,
$$\sum_{k=1}^N \cos(k\theta) = \frac{\sin(N\theta/2) \cos((N+1)\theta/2)}{\sin(\theta/2)}, \qquad \sum_{k=1}^N \sin(k\theta) = \frac{\sin(N\theta/2) \sin((N+1)\theta/2)}{\sin(\theta/2)}.$$

(The sine formula is derived by the same $2\sin(\theta/2)$-telescope, using the product-to-sum identity $2 \sin A \sin B = \cos(A-B) - \cos(A+B)$.)

**Boundedness.** Since $|\sin x|, |\cos x| \leq 1$, both partial sums satisfy
$$\left|\sum_{k=1}^N \cos(k\theta)\right|, \; \left|\sum_{k=1}^N \sin(k\theta)\right| \leq \frac{1}{|\sin(\theta/2)|}.$$

Crucially, $\sin(\theta/2) \neq 0$ requires $\theta/2 \not\equiv 0 \pmod \pi$, i.e., $\theta \not\equiv 0 \pmod{2\pi}$. This is precisely our hypothesis $0 < \theta < 2\pi$. Hence the bound is finite.

**Conclusion via Dirichlet.** By Theorem 14.9 with $b_n = \cos(n\theta)$ (or $\sin(n\theta)$), both series $\sum a_n \cos(n\theta)$ and $\sum a_n \sin(n\theta)$ converge. $\blacksquare$

> **Remark.** When $\theta = 0$, $\cos(n\theta) = 1$ and the series reduces to $\sum a_n$, which need not converge (e.g., $a_n = 1/n$). The hypothesis $\theta \neq 0$ is not decorative — it is exactly what makes the partial sums of $\cos(n\theta)$ bounded.

---

**Solution 7.** If $\sum a_n$ is conditionally convergent, then $\sum a_n^+$ and $\sum a_n^-$ both diverge to $+\infty$, where $a_n^+ = \max(a_n, 0)$ and $a_n^- = \max(-a_n, 0)$.

**Setup.** Recall the decomposition
$$a_n = a_n^+ - a_n^-, \qquad |a_n| = a_n^+ + a_n^-,$$
so $a_n^+ = (|a_n| + a_n)/2$ and $a_n^- = (|a_n| - a_n)/2$.

**Step 1. Neither $\sum a_n^+$ nor $\sum a_n^-$ can converge.**

Suppose for contradiction that $\sum a_n^+$ converges, say to $A^+ \in \mathbb{R}$. Since $\sum a_n$ also converges (to some $A$), the algebra of convergent series gives
$$\sum a_n^- = \sum (a_n^+ - a_n) = A^+ - A \in \mathbb{R},$$
i.e., $\sum a_n^-$ converges. Then
$$\sum |a_n| = \sum (a_n^+ + a_n^-) = A^+ + (A^+ - A) = 2A^+ - A \in \mathbb{R},$$
so $\sum |a_n|$ converges — contradicting conditional convergence.

Analogously, if $\sum a_n^-$ converges, then $\sum a_n^+ = \sum a_n + \sum a_n^- \in \mathbb{R}$, and again $\sum |a_n|$ converges, contradiction.

**Step 2. Divergence is to $+\infty$.**

Since $a_n^+ \geq 0$, the partial sums of $\sum a_n^+$ are monotonically increasing; a divergent monotone increasing sequence of reals must tend to $+\infty$. Hence $\sum a_n^+ = +\infty$. Analogously $\sum a_n^- = +\infty$. $\blacksquare$

> **Interpretation.** A conditionally convergent series is a *delicate balance*: an infinite sum of positive contributions and an infinite sum of negative contributions cancel to a finite value. If one rearranges the order of summation — delaying negative terms while admitting extra positive ones, say — one can shift the balance to any desired limit. This is **Riemann's rearrangement theorem**, covered in [[15-rearrangement-of-series]].

---

## 14.7 Summary

> **Hierarchy of convergence.** For any real series $\sum a_n$:
> $$\text{absolute convergence} \;\Longrightarrow\; \text{convergence}.$$
> The converse is **false**: many series converge conditionally (sum finite, but $\sum |a_n| = \infty$). Every convergent series is either absolutely convergent or conditionally convergent; these two categories are **disjoint** and together exhaust the class of convergent series.

**Test selection flowchart.**

| Test | When to use | Conclusion |
|------|-------------|-----------|
| Absolute convergence | Any series with mixed signs | Check $\sum |a_n|$ via any positive-term test |
| Leibniz | Alternating, $|a_n| \downarrow 0$ | Converges; $|S - S_N| \leq |a_{N+1}|$ |
| Dirichlet | $a_n \downarrow 0$, $\sum b_n$ has bounded partial sums | $\sum a_n b_n$ converges |
| Abel | $(a_n)$ monotone bounded, $\sum b_n$ converges | $\sum a_n b_n$ converges |
| General ratio/root | Any series | Absolute convergence if $L < 1$ |

> **Cornerstone lesson.** Absolute convergence is *rigid*: the sum is invariant under rearrangement, regrouping, and absolutely-convergent products (next lesson [[15-rearrangement-of-series]]). Conditional convergence is *fragile*: rearranging a conditionally convergent series can change its sum to *any* prescribed real number — or make it diverge (Riemann's rearrangement theorem). Absolute convergence is the "honest" form of infinite summation; conditional convergence is a numerical accident of the chosen order.

> **Qualifying-exam checklist.**
> 1. Given a sign-varying series: first try $\sum |a_n|$ via positive-term tests. If that works, you have absolute convergence.
> 2. If $\sum |a_n|$ diverges, look for alternating structure (Leibniz) or hidden Dirichlet structure (bounded trigonometric / sign partial sums times monotone decay).
> 3. For ratio/root tests, remember they give absolute convergence, not just convergence — use them freely on any series.
> 4. For the error bound $|S - S_N| \leq |a_{N+1}|$ in the Leibniz case, state the monotonicity explicitly; the bound requires it.
> 5. Always check $a_n \to 0$ first — the Divergence Test catches many "obviously wrong" series and is a $0$-effort step.

---

## Related Topics

- [[12-infinite-series-introduction]] — partial sums, divergence test, positive series
- [[13-series-convergence-tests]] — ratio, root, comparison, integral for positive series
- [[15-rearrangement-of-series]] — Riemann's theorem on conditional convergence
- [[10-cauchy-sequences-completeness]] — completeness gives convergence from Cauchy
- [[09-convergence-and-limits]] — sequence convergence foundations
