# 14. Alternating and Absolute Convergence

So far, our convergence tests have been designed for **positive-term series**. Once signs are allowed to vary, two genuinely new phenomena appear:

1. A series $\sum a_n$ can converge even though $\sum |a_n|$ diverges (this is called **conditional convergence**).
2. A series can converge purely because of cancellation between positive and negative terms.

This lesson develops the tools to handle such series: the **Leibniz alternating test**, **absolute vs. conditional convergence**, and the more subtle **Dirichlet and Abel tests** that exploit partial-sum cancellation.

---

## 14.1 Alternating Series and Leibniz's Test

> **Definition 14.1 (Alternating series).**
> A series of the form
> $\sum_{n=1}^{\infty} (-1)^{n+1} a_n = a_1 - a_2 + a_3 - a_4 + \cdots,\quad a_n > 0,$
> is called an **alternating series**.

> **Theorem 14.2 (Leibniz's alternating series test).**
> If $(a_n)$ satisfies
>
> (i) $a_n \geq a_{n+1} > 0$ for all $n$ (monotonically decreasing),
>
> (ii) $a_n \to 0$,
>
> then the alternating series $\sum_{n=1}^{\infty} (-1)^{n+1} a_n$ converges. Moreover, if $S$ is the sum and $S_N$ is the $N$-th partial sum, then
> $|S - S_N| \leq a_{N+1}.$

*Proof.* Let $S_N = \sum_{n=1}^{N} (-1)^{n+1} a_n$. Consider the even partial sums:

$$S_{2k} = (a_1 - a_2) + (a_3 - a_4) + \cdots + (a_{2k-1} - a_{2k}).$$

Each bracket is $\geq 0$ by (i), so $(S_{2k})$ is increasing. Re-grouping:

$$S_{2k} = a_1 - (a_2 - a_3) - (a_4 - a_5) - \cdots - a_{2k} \leq a_1.$$

So $(S_{2k})$ is increasing and bounded above by $a_1$; by the **Monotone Convergence Theorem**, $S_{2k} \to S$ for some $S \leq a_1$.

For odd partial sums: $S_{2k+1} = S_{2k} + a_{2k+1}$. Since $a_{2k+1} \to 0$,

$$\lim S_{2k+1} = \lim S_{2k} + \lim a_{2k+1} = S + 0 = S.$$

Both subsequences of $(S_N)$ converge to the same limit $S$, so $S_N \to S$.

**Tail estimate.** Since even partial sums increase to $S$ and odd ones decrease to $S$, $S$ always lies **between** consecutive partial sums:

$$S_{2k} \leq S \leq S_{2k+1}, \qquad S_{2k+2} \leq S \leq S_{2k+1}.$$

Therefore $|S - S_N|$ is at most the next term $a_{N+1}$. $\blacksquare$

> **Remark.** The error bound $|S - S_N| \leq a_{N+1}$ is extremely useful: for alternating series the truncation error is **controlled by the first omitted term**. This is much stronger than anything available for general positive-term series.

**Standard example — the alternating harmonic series.**
$$\sum_{n=1}^{\infty} \frac{(-1)^{n+1}}{n} = 1 - \tfrac{1}{2} + \tfrac{1}{3} - \tfrac{1}{4} + \cdots = \ln 2.$$
Here $a_n = 1/n$ is decreasing to 0, so Leibniz applies; yet $\sum 1/n$ diverges (harmonic). This is our prototype of a conditionally convergent series.

---

## 14.2 Absolute Convergence

> **Definition 14.3 (Absolute convergence).**
> A series $\sum a_n$ converges **absolutely** if $\sum |a_n|$ converges.

> **Theorem 14.4 (Absolute convergence implies convergence).**
> If $\sum |a_n|$ converges, then $\sum a_n$ converges, and
> $\left|\sum_{n=1}^{\infty} a_n\right| \leq \sum_{n=1}^{\infty} |a_n|.$

*Proof.* Let $S_N = \sum_{n=1}^N a_n$ and $T_N = \sum_{n=1}^N |a_n|$. Since $\sum |a_n|$ converges, $(T_N)$ is Cauchy: for every $\varepsilon > 0$ there is $N_0$ with
$$|T_M - T_N| = \sum_{k=N+1}^{M} |a_k| < \varepsilon \quad\text{for all } M > N \geq N_0.$$

By the triangle inequality,
$$|S_M - S_N| = \left|\sum_{k=N+1}^{M} a_k\right| \leq \sum_{k=N+1}^{M} |a_k| < \varepsilon.$$

So $(S_N)$ is Cauchy in $\mathbb{R}$, hence converges (ℝ complete). Letting $M \to \infty$ in $|S_N| \leq T_N$ gives the inequality. $\blacksquare$

> **Definition 14.5 (Conditional convergence).**
> A series $\sum a_n$ is **conditionally convergent** if it converges but $\sum |a_n|$ diverges.

**Classification summary.**

| Type | $\sum a_n$ | $\sum |a_n|$ | Example |
|------|-----------|-----------|---------|
| Absolutely convergent | converges | converges | $\sum (-1)^n / n^2$ |
| Conditionally convergent | converges | diverges | $\sum (-1)^{n+1} / n$ |
| Divergent | diverges | (often diverges) | $\sum (-1)^n$ |

> **Key principle.** All positive-term convergence tests (ratio, root, comparison, integral, etc.) can be applied to $\sum |a_n|$. If they show $\sum |a_n|$ converges, then $\sum a_n$ converges absolutely — no sign-handling required.

---

## 14.3 The Ratio and Root Tests Revisited

> **Theorem 14.6 (Ratio test, general form).**
> Let $\sum a_n$ be any series with $a_n \neq 0$. Let
> $L = \lim_{n\to\infty} \left|\frac{a_{n+1}}{a_n}\right|.$
> 
> (a) If $L < 1$, then $\sum a_n$ converges **absolutely**.
>
> (b) If $L > 1$ (or $L = \infty$), then $\sum a_n$ diverges.
>
> (c) If $L = 1$, the test is inconclusive.

> **Theorem 14.7 (Root test, general form).**
> Let $\sum a_n$ be any series, and let $L = \limsup_{n\to\infty} |a_n|^{1/n}$.
>
> (a) If $L < 1$, then $\sum a_n$ converges **absolutely**.
>
> (b) If $L > 1$, then $\sum a_n$ diverges.
>
> (c) If $L = 1$, inconclusive.

*Proof sketch.* Both results follow by applying the positive-term ratio/root tests (see [[13-series-convergence-tests]]) to $\sum |a_n|$, which gives absolute convergence, hence convergence by Theorem 14.4. The divergence part in the ratio test follows because $|a_{n+1}/a_n| > 1$ eventually forces $|a_n|$ non-decreasing, so $a_n \not\to 0$. $\blacksquare$

---

## 14.4 Dirichlet and Abel Tests

The Leibniz test exploits sign-alternation and monotonicity. Two more refined tests — due to **Dirichlet** and **Abel** — exploit the boundedness of partial sums of one series in combination with monotonicity of another. The key tool is:

> **Lemma 14.8 (Abel's summation by parts).**
> For sequences $(a_n)$, $(b_n)$ and partial sums $B_n = b_1 + b_2 + \cdots + b_n$ (with $B_0 = 0$),
> $\sum_{n=1}^{N} a_n b_n = a_N B_N - \sum_{n=1}^{N-1} (a_{n+1} - a_n) B_n.$

*Proof.* Write $b_n = B_n - B_{n-1}$. Then
$$\sum_{n=1}^N a_n b_n = \sum_{n=1}^N a_n (B_n - B_{n-1}) = \sum_{n=1}^N a_n B_n - \sum_{n=1}^{N} a_n B_{n-1}.$$
Re-index the second sum: $\sum_{n=1}^{N} a_n B_{n-1} = \sum_{m=0}^{N-1} a_{m+1} B_m = \sum_{m=1}^{N-1} a_{m+1} B_m$ (since $B_0 = 0$). Thus
$$\sum_{n=1}^N a_n b_n = \sum_{n=1}^N a_n B_n - \sum_{n=1}^{N-1} a_{n+1} B_n = a_N B_N + \sum_{n=1}^{N-1} (a_n - a_{n+1}) B_n. \ \blacksquare$$

> **Theorem 14.9 (Dirichlet's test).**
> Suppose
> (i) $(a_n)$ is monotonically decreasing with $a_n \to 0$,
>
> (ii) the partial sums $B_N = b_1 + \cdots + b_N$ are **bounded**: $|B_N| \leq M$ for all $N$.
>
> Then $\sum a_n b_n$ converges.

*Proof.* Using Abel's lemma,
$$\sum_{n=1}^N a_n b_n = a_N B_N + \sum_{n=1}^{N-1} (a_n - a_{n+1}) B_n.$$

The first term: $|a_N B_N| \leq a_N \cdot M \to 0$.

The second: since $a_n - a_{n+1} \geq 0$ and $|B_n| \leq M$,
$$\sum_{n=1}^{\infty} |(a_n - a_{n+1}) B_n| \leq M \sum_{n=1}^{\infty} (a_n - a_{n+1}) = M \cdot a_1 < \infty$$
(telescoping). So $\sum (a_n - a_{n+1}) B_n$ converges absolutely, and the partial sums of $\sum a_n b_n$ converge. $\blacksquare$

> **Theorem 14.10 (Abel's test).**
> Suppose
> (i) $(a_n)$ is monotonic and **bounded** (hence convergent),
>
> (ii) $\sum b_n$ converges.
>
> Then $\sum a_n b_n$ converges.

*Proof sketch.* Write $a_n = L + c_n$ where $L = \lim a_n$ and $c_n$ is monotonic with $c_n \to 0$. Then
$$\sum a_n b_n = L \sum b_n + \sum c_n b_n.$$
The first sum converges by hypothesis. The second converges by Dirichlet (partial sums of $\sum b_n$ are bounded since $\sum b_n$ converges). $\blacksquare$

> **Remark.** Leibniz is a special case of Dirichlet: take $b_n = (-1)^{n+1}$, whose partial sums alternate between 0 and 1, so are bounded by 1.

---

## 14.5 Worked Examples

**Example 1.** Test $\displaystyle \sum_{n=1}^{\infty} \frac{(-1)^{n+1}}{\sqrt{n}}$ for convergence and absolute convergence.

*Solution:* Let $a_n = 1/\sqrt{n}$.
- $a_n > 0$, $a_{n+1} < a_n$ (since $\sqrt{n+1} > \sqrt{n}$), and $a_n \to 0$.
- By Leibniz, the series **converges**.

Absolute series: $\sum 1/\sqrt{n} = \sum n^{-1/2}$ is a $p$-series with $p = 1/2 \leq 1$, hence **diverges**.

Conclusion: the series is **conditionally convergent**.

---

**Example 2.** Show that $\displaystyle \sum_{n=1}^{\infty} \frac{(-1)^{n+1}}{n^2}$ converges absolutely.

*Solution:* $\sum |a_n| = \sum 1/n^2$ is a $p$-series with $p = 2 > 1$, which converges. Hence the alternating series converges absolutely.

> **Note.** Once absolute convergence is established, Leibniz adds nothing — absolute convergence is the stronger property.

---

**Example 3.** Determine convergence of $\displaystyle \sum_{n=1}^{\infty} \frac{\sin n}{n}$.

*Solution:* Let $a_n = 1/n$, $b_n = \sin n$. We verify Dirichlet's hypotheses.
- $(a_n)$ decreases monotonically to 0. ✓
- Partial sums of $b_n$: using the identity
$$B_N = \sum_{n=1}^{N} \sin n = \frac{\sin(N/2)\sin((N+1)/2)}{\sin(1/2)},$$
we have $|B_N| \leq \dfrac{1}{\sin(1/2)} \approx 2.08$. Bounded. ✓

By Dirichlet, $\sum \frac{\sin n}{n}$ converges.

**Absolute?** $\sum \left|\frac{\sin n}{n}\right|$: one can show $|\sin n| \geq \frac{1}{2}$ for at least $1/3$ of integers $n$, so
$$\sum_{n=1}^{N} \frac{|\sin n|}{n} \geq \frac{1}{2} \cdot \frac{1}{3} \sum_{n=1}^{N} \frac{1}{n} \to \infty.$$
So $\sum \frac{\sin n}{n}$ is **conditionally convergent**.

---

**Example 4.** Investigate $\displaystyle \sum_{n=2}^{\infty} \frac{(-1)^n}{\ln n}$.

*Solution:* Let $a_n = 1/\ln n$.
- $a_n > 0$ for $n \geq 2$, $(\ln n)$ increases, so $a_n$ decreases.
- $a_n \to 0$ as $n \to \infty$.

By Leibniz, **converges**.

Absolute: $\sum \frac{1}{\ln n}$. Since $\ln n \leq n$ for $n \geq 1$, $\frac{1}{\ln n} \geq \frac{1}{n}$. By comparison with the harmonic series, $\sum 1/\ln n$ diverges.

Conclusion: **conditionally convergent**.

---

**Example 5.** Test $\displaystyle \sum_{n=1}^{\infty} (-1)^{n+1} \frac{n}{n^2+1}$ for convergence.

*Solution:* Let $a_n = \dfrac{n}{n^2+1}$. We need $(a_n)$ decreasing and $\to 0$.

$a_n \to 0$: $\dfrac{n}{n^2+1} \leq \dfrac{1}{n} \to 0$. ✓

Monotonicity: let $f(x) = \dfrac{x}{x^2+1}$. Then $f'(x) = \dfrac{(x^2+1) - x(2x)}{(x^2+1)^2} = \dfrac{1-x^2}{(x^2+1)^2}$. For $x \geq 1$, $f'(x) \leq 0$, so $f$ is decreasing, hence $a_n$ is decreasing for $n \geq 1$. ✓

By Leibniz, **converges**.

Absolute? $\sum \frac{n}{n^2+1}$. For large $n$, $\frac{n}{n^2+1} \sim \frac{1}{n}$, and by limit comparison with the harmonic series, $\sum \frac{n}{n^2+1}$ diverges.

Conclusion: **conditionally convergent**.

---

## 14.6 Practice Problems

1. Test $\displaystyle \sum_{n=1}^{\infty} \frac{(-1)^{n+1}}{n^p}$ for $p \in \mathbb{R}$: determine for which $p$ it converges absolutely, conditionally, or diverges.

2. Determine convergence of $\displaystyle \sum_{n=2}^{\infty} \frac{(-1)^n}{n \ln n}$.

3. Test $\displaystyle \sum_{n=1}^{\infty} \frac{\cos(n \pi/3)}{n}$ for convergence.

4. Prove that if $\sum a_n$ converges absolutely and $(b_n)$ is bounded, then $\sum a_n b_n$ converges absolutely.

5. Let $a_n = \dfrac{(-1)^{n+1}}{\sqrt{n} + (-1)^{n+1}}$. Show that the Leibniz test **fails** (explain why) but the series converges by more careful analysis.

### Solutions

**1.** Let $a_n = 1/n^p$.
- If $p > 1$: $\sum 1/n^p$ converges, so the alternating series converges **absolutely**.
- If $0 < p \leq 1$: $\sum 1/n^p$ diverges, but $a_n$ decreases to 0, so by Leibniz the alternating series converges — **conditionally**.
- If $p \leq 0$: $a_n \not\to 0$, so the divergence test shows **divergence**.

Summary: absolute for $p > 1$, conditional for $0 < p \leq 1$, divergent for $p \leq 0$.

---

**2.** $a_n = \dfrac{1}{n \ln n}$ is positive, decreasing, and $\to 0$. By Leibniz, **converges**.

Absolute: $\sum \frac{1}{n \ln n}$ diverges by the integral test:
$$\int_2^{\infty} \frac{dx}{x \ln x} = [\ln \ln x]_2^{\infty} = \infty.$$

Hence the original series is **conditionally convergent**.

---

**3.** Let $a_n = 1/n$, $b_n = \cos(n\pi/3)$. We check Dirichlet.
- $a_n \downarrow 0$. ✓
- $\sum_{k=1}^{N} \cos(k\pi/3)$: using the identity $\sum_{k=1}^{N} \cos(k\theta) = \dfrac{\sin(N\theta/2)\cos((N+1)\theta/2)}{\sin(\theta/2)}$ with $\theta = \pi/3$, we get
$$\left|\sum_{k=1}^{N} \cos(k\pi/3)\right| \leq \frac{1}{\sin(\pi/6)} = 2.$$

Bounded. By Dirichlet, the series **converges**.

*Note on absolute convergence.* The values $\cos(n\pi/3)$ cycle through $\{1/2, -1/2, -1, -1/2, 1/2, 1\}$, with average magnitude $2/3$. So $\sum |\cos(n\pi/3)|/n$ diverges by comparison with a positive multiple of $\sum 1/n$. **Conditionally convergent**.

---

**4.** Let $|b_n| \leq M$. Then
$$\sum_{n=1}^{N} |a_n b_n| \leq M \sum_{n=1}^{N} |a_n|.$$
Since $\sum |a_n|$ converges, its partial sums are bounded above by some $T$. Hence $\sum |a_n b_n|$ has partial sums bounded above by $MT$; being a series of non-negative terms with bounded partial sums, it converges. So $\sum a_n b_n$ converges absolutely. $\blacksquare$

---

**5.** Write
$$a_n = \frac{(-1)^{n+1}}{\sqrt{n} + (-1)^{n+1}}.$$

$|a_n| = \frac{1}{\sqrt{n} + (-1)^{n+1}}$, which is **not monotonically decreasing** (odd-indexed terms have denominator $\sqrt{n}+1$, even-indexed $\sqrt{n}-1$, so the sequence oscillates above and below). Leibniz **fails**.

Rationalise:
$$a_n = \frac{(-1)^{n+1}(\sqrt{n} - (-1)^{n+1})}{(\sqrt{n} + (-1)^{n+1})(\sqrt{n} - (-1)^{n+1})} = \frac{(-1)^{n+1}\sqrt{n} - 1}{n - 1}.$$

Split:
$$a_n = \underbrace{\frac{(-1)^{n+1}\sqrt{n}}{n-1}}_{= u_n} - \underbrace{\frac{1}{n-1}}_{= v_n}.$$

- $\sum u_n$: $u_n = \frac{(-1)^{n+1}\sqrt{n}}{n-1} \sim \frac{(-1)^{n+1}}{\sqrt{n}}$. More carefully, $\frac{\sqrt{n}}{n-1}$ is decreasing to 0 for $n \geq 2$, so $\sum u_n$ converges by Leibniz.
- $\sum v_n = \sum \frac{1}{n-1}$ **diverges** (harmonic).

So the sum $\sum a_n$ **diverges**, showing why the monotonicity hypothesis of Leibniz is essential.

> **Moral:** The Leibniz test requires **both** alternation and monotone decrease. Without monotonicity — even if $a_n \to 0$ — the series can diverge.

---

## 14.7 Summary

> **Hierarchy of convergence.**
> $$\text{absolute convergence} \ \Longrightarrow\ \text{convergence} \ \Longleftarrow\ \text{conditional convergence}.$$
> The converse of the first implication is **false** — many series converge without converging absolutely.

| Test | When to use | Conclusion |
|------|-------------|-----------|
| Absolute convergence | Any series with mixed signs | Check $\sum \|a_n\|$ converges |
| Leibniz | Alternating, $\|a_n\| \downarrow 0$ | Converges; error $\leq \|a_{N+1}\|$ |
| Dirichlet | $a_n \downarrow 0$, $\sum b_n$ has bounded partial sums | $\sum a_n b_n$ converges |
| Abel | $a_n$ monotone bounded, $\sum b_n$ converges | $\sum a_n b_n$ converges |
| General ratio/root | Any series | Absolute convergence if $L < 1$ |

> **Cornerstone lesson.** Absolute convergence is a strong property — it is preserved under rearrangement, regrouping, and product (next lesson [[15-rearrangement-of-series]]). Conditional convergence is fragile: rearranging a conditionally convergent series can change its sum to any real number (Riemann's rearrangement theorem).

---

## Related Topics

- [[12-infinite-series-introduction]] — partial sums, divergence test, positive series
- [[13-series-convergence-tests]] — ratio, root, comparison, integral for positive series
- [[15-rearrangement-of-series]] — Riemann's theorem on conditional convergence
- [[10-cauchy-sequences-completeness]] — completeness gives convergence from Cauchy
- [[09-convergence-and-limits]] — sequence convergence foundations
