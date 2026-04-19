# 13. Series Convergence Tests

> **The convergence toolkit.** A **series** $\sum a_n$ converges iff its partial sums $s_N = \sum_{n=1}^{N} a_n$ form a Cauchy sequence in $\mathbb{R}$. For series of non-negative terms, the partial sums are monotone, so convergence is equivalent to boundedness of $(s_N)$. Every test in this chapter is, at root, a way of extracting boundedness from the structure of $a_n$.
>
> This chapter states and proves the nine classical tests (Divergence, Comparison, Limit Comparison, Ratio, Root, Integral, Cauchy Condensation, Raabe, Gauss), gives worked examples in the Setup/Strategy/Computation/Verification/Interpretation format, and closes with a graduate-qualifying-exam practice set.

---

## 13.1 Toolkit Overview

These tests apply mostly to series $\sum a_n$ of **non-negative** terms (positive eventually). The alternating and absolute-convergence theory is deferred to [[14-alternating-and-absolute-convergence]].

| Test | When to use | Strength |
|---|---|---|
| Divergence test | Any series | Very weak (necessary, not sufficient) |
| Comparison | Terms bounded by known series | Simple, powerful |
| Limit comparison | Terms $\sim$ known terms | Most practical |
| Ratio (d'Alembert) | Factorials, exponentials, $n^k$ | Strong; inconclusive when limit $=1$ |
| Root (Cauchy) | $n$-th power structure | Strongest ratio/root family |
| Integral | Monotone decreasing, integrable | Powerful for $p$-series and log terms |
| Cauchy condensation | $a_n$ decreasing positive | Simplifies to sparser series |
| Raabe | Ratio-test failure with rate $1 + R/n$ | Refines ratio |
| Gauss | Ratio-test failure with asymptotic expansion | Most refined |
| Alternating | Alternating with $|a_n| \searrow 0$ | (See [[14-alternating-and-absolute-convergence]]) |

**Reading order.** The tests form a hierarchy of sharpness: Comparison $\subset$ Limit Comparison $\subset$ Ratio $\subset$ Raabe $\subset$ Gauss (each refines the previous when the previous is inconclusive). Root and Integral form a parallel track: Root for $n$-th-power structure, Integral for monotone structure with continuous analogue.

---

## 13.2 Comparison Test

> **Theorem 13.1 (Direct Comparison).** Let $(a_n), (b_n)$ be sequences with $0 \leq a_n \leq b_n$ for all $n \geq N_0$ (some fixed index). Then:
> 1. $\sum b_n$ converges $\implies \sum a_n$ converges.
> 2. $\sum a_n$ diverges $\implies \sum b_n$ diverges.

**Proof.**

*Setup.* Let $s_N = \sum_{n=1}^{N} a_n$ and $t_N = \sum_{n=1}^{N} b_n$. For $n \geq N_0$ the inequality $a_n \leq b_n$ holds; the finitely many earlier terms contribute a fixed constant to each partial sum and so cannot affect convergence.

*(1) Convergence of $\sum b_n$ forces convergence of $\sum a_n$.*

**Step 1.** Since $b_n \geq 0$, the sequence $(t_N)$ is monotone non-decreasing. By hypothesis $\sum b_n$ converges, so $(t_N)$ has a finite limit $T = \lim_{N \to \infty} t_N$. In particular, $(t_N)$ is bounded: $t_N \leq T$ for all $N$.

**Step 2.** Since $a_n \geq 0$, the sequence $(s_N)$ is also monotone non-decreasing. For $N \geq N_0$,
$$s_N - s_{N_0 - 1} = \sum_{n=N_0}^{N} a_n \leq \sum_{n=N_0}^{N} b_n = t_N - t_{N_0 - 1} \leq T - t_{N_0 - 1}.$$
Thus $s_N \leq s_{N_0 - 1} + T - t_{N_0 - 1}$ for all $N \geq N_0$, i.e., $(s_N)$ is bounded above.

**Step 3.** A monotone non-decreasing sequence that is bounded above converges (Monotone Convergence Theorem; see [[05-monotone-and-bolzano-weierstrass]]). Hence $\lim_{N \to \infty} s_N$ exists in $\mathbb{R}$, i.e., $\sum a_n$ converges.

*(2) Contrapositive.* If $\sum b_n$ converged, then by (1) so would $\sum a_n$. So $\sum a_n$ divergent forces $\sum b_n$ divergent. $\blacksquare$

**Sharp form (quantitative).** Under the hypotheses of (1), $\sum_{n=1}^{\infty} a_n \leq \sum_{n=1}^{N_0 - 1}(a_n - b_n) + \sum_{n=1}^{\infty} b_n$. The tail comparison is term-wise, so the tail sums inherit term-wise inequality: $\sum_{n \geq N_0} a_n \leq \sum_{n \geq N_0} b_n$.

**Remark (why non-negativity matters).** If $a_n$ changes sign, boundedness of $(s_N)$ is **not** implied by a term-wise estimate. Consider $a_n = (-1)^n$, $b_n = 1$: $|a_n| \leq b_n$ but $\sum b_n = \infty$ while $\sum a_n$ diverges by oscillation — the implication in direction (1) would require $\sum |a_n|$ (absolute convergence, see [[14-alternating-and-absolute-convergence]]).

### Examples

**Example 13.1.** $\sum_{n=1}^{\infty} \frac{1}{n^2 + n}$.

*Setup.* Terms positive. Look for simple upper bound.

*Strategy.* $n^2 + n \geq n^2$, so $\tfrac{1}{n^2 + n} \leq \tfrac{1}{n^2}$.

*Computation.* $\sum 1/n^2$ converges (Basel series, $= \pi^2/6$), so by Theorem 13.1(1), $\sum \tfrac{1}{n^2 + n}$ converges.

*Verification.* Partial fractions: $\tfrac{1}{n^2+n} = \tfrac{1}{n} - \tfrac{1}{n+1}$, telescoping to $1$. So the sum is exactly $1$, confirming convergence.

*Interpretation.* Comparison gives convergence for free; exact value requires extra structure.

---

**Example 13.2.** $\sum_{n=2}^{\infty} \frac{1}{n - \sqrt{n}}$.

*Setup.* Terms positive for $n \geq 2$. Look for lower bound.

*Strategy.* $n - \sqrt{n} = n(1 - n^{-1/2}) \leq n$, so $\tfrac{1}{n - \sqrt{n}} \geq \tfrac{1}{n}$.

*Computation.* $\sum 1/n$ diverges (harmonic series), so by Theorem 13.1(2), $\sum \tfrac{1}{n-\sqrt{n}}$ diverges.

*Verification.* Asymptotically $n - \sqrt n = n(1 - n^{-1/2}) \sim n$, so the terms behave like $1/n$ in the limit; limit comparison (next section) will confirm.

---

**Example 13.3.** $\sum_{n=1}^{\infty} \frac{1}{2^n + n}$.

*Setup.* Terms positive.

*Strategy.* $2^n + n \geq 2^n$, so $\tfrac{1}{2^n + n} \leq \tfrac{1}{2^n}$.

*Computation.* $\sum 1/2^n = 1$ (geometric), converges. By Theorem 13.1(1), original series converges.

*Interpretation.* Exponential dominance: once $2^n$ is in the denominator, no polynomial perturbation can save divergence.

---

## 13.3 Limit Comparison Test

> **Theorem 13.2 (Limit Comparison).** Let $a_n, b_n > 0$ for $n \geq N_0$, and suppose
> $$L = \lim_{n \to \infty} \frac{a_n}{b_n} \in [0, \infty].$$
>
> 1. If $0 < L < \infty$: $\sum a_n$ converges iff $\sum b_n$ converges.
> 2. If $L = 0$ and $\sum b_n$ converges, then $\sum a_n$ converges.
> 3. If $L = \infty$ and $\sum b_n$ diverges, then $\sum a_n$ diverges.

**Proof.**

*(1) Case $0 < L < \infty$.*

**Step 1 (extract bounds).** Let $\varepsilon = L/2 > 0$. By definition of limit, $\exists N \geq N_0$ such that for all $n \geq N$:
$$\left|\frac{a_n}{b_n} - L\right| < \frac{L}{2} \iff \frac{L}{2} < \frac{a_n}{b_n} < \frac{3L}{2}.$$
(The left inequality uses $L - L/2 = L/2$, the right uses $L + L/2 = 3L/2$.)

**Step 2 (term-wise inequalities).** Since $b_n > 0$, multiply through:
$$\frac{L}{2} \cdot b_n < a_n < \frac{3L}{2} \cdot b_n \qquad (n \geq N). \tag{$\star$}$$

**Step 3 (apply direct comparison in both directions).**

($\Rightarrow$) Assume $\sum b_n$ converges. Then $\sum \tfrac{3L}{2} b_n = \tfrac{3L}{2} \sum b_n$ converges (constant multiplier). From ($\star$), $a_n \leq \tfrac{3L}{2} b_n$ for $n \geq N$. By Theorem 13.1(1), $\sum a_n$ converges.

($\Leftarrow$) Assume $\sum a_n$ converges. From ($\star$), $b_n \leq \tfrac{2}{L} a_n$ for $n \geq N$. Same argument: $\sum b_n$ converges.

*(2) Case $L = 0$.*

**Step 1.** $\exists N$: for $n \geq N$, $a_n/b_n < 1$, i.e., $a_n < b_n$.

**Step 2.** If $\sum b_n$ converges, by Theorem 13.1(1), $\sum a_n$ converges.

*(3) Case $L = \infty$.*

**Step 1.** $\exists N$: for $n \geq N$, $a_n/b_n > 1$, i.e., $a_n > b_n$.

**Step 2.** If $\sum b_n$ diverges, then $\sum a_n \geq \sum b_n$ termwise (beyond $N$), so $\sum a_n$ diverges by Theorem 13.1(2).

$\blacksquare$

**Remark (why $L=0$ doesn't give two-sided).** In case (2), if $\sum b_n$ diverges, we *cannot* conclude anything about $\sum a_n$. Example: $a_n = 1/n^2$, $b_n = 1/n$, $L = \lim (1/n^2)/(1/n) = \lim 1/n = 0$; $\sum b_n = \infty$ but $\sum a_n < \infty$.

**Remark (choice of $b_n$).** The test is only as powerful as our ability to guess an asymptotic comparand. The standard bestiary:
- Rational in $n$: pick $b_n = n^{\deg \text{num} - \deg \text{denom}}$.
- $\sin(1/n), \tan(1/n), 1 - \cos(1/n), e^{1/n} - 1, \ln(1 + 1/n)$: use Taylor expansions at $0$.
- $\sqrt{n+1} - \sqrt n$: rationalise.

### Examples

**Example 13.4.** $\sum_{n=1}^{\infty} \frac{3n^2 + 1}{n^5 + 2}$.

*Setup.* Rational function; $\deg$ numerator $= 2$, $\deg$ denominator $= 5$, so decay like $1/n^3$.

*Strategy.* Limit comparison with $b_n = 1/n^3$.

*Computation.*
$$\frac{a_n}{b_n} = \frac{3n^2 + 1}{n^5 + 2} \cdot n^3 = \frac{n^3(3n^2 + 1)}{n^5 + 2} = \frac{3n^5 + n^3}{n^5 + 2} \xrightarrow{n\to\infty} 3.$$

*Verification.* $L = 3 \in (0, \infty)$; $\sum 1/n^3$ converges ($p=3>1$); by Theorem 13.2(1), $\sum a_n$ converges.

*Interpretation.* The leading-order behaviour $3/n^3$ controls everything; the $+1$ and $+2$ are irrelevant asymptotically.

---

**Example 13.5.** $\sum_{n=1}^{\infty} \sin(1/n)$.

*Setup.* For $n \geq 1$, $0 < 1/n \leq 1$, so $\sin(1/n) > 0$.

*Strategy.* Taylor: $\sin x = x - x^3/6 + O(x^5)$, so $\sin(1/n) \sim 1/n$. Compare with $b_n = 1/n$.

*Computation.*
$$\frac{\sin(1/n)}{1/n} \xrightarrow{n\to\infty} 1$$
by the standard limit $\lim_{x \to 0^+} \sin x / x = 1$.

*Verification.* $L = 1$; $\sum 1/n$ diverges; by Theorem 13.2(1), $\sum \sin(1/n)$ diverges.

*Interpretation.* The small-angle expansion kills any hope of convergence; the sine function behaves linearly near zero.

---

**Example 13.6.** $\sum_{n=1}^{\infty} (e^{1/n} - 1)$.

*Setup.* $e^{1/n} - 1 > 0$ since $e^x > 1$ for $x > 0$.

*Strategy.* $e^x - 1 = x + x^2/2 + \ldots \sim x$ as $x \to 0$. Compare with $b_n = 1/n$.

*Computation.*
$$\lim_{n\to\infty} \frac{e^{1/n} - 1}{1/n} = \lim_{x \to 0^+} \frac{e^x - 1}{x} = 1.$$

*Verification.* $L = 1$; $\sum 1/n$ diverges; so $\sum (e^{1/n} - 1)$ diverges.

**Interpretive summary.** Limit comparison replaces "find exact upper/lower bounds" with "guess the asymptotic form." That makes it the workhorse test for analytic expressions.

---

## 13.4 Ratio Test (d'Alembert)

> **Theorem 13.3 (Ratio Test).** Let $a_n > 0$ for all large $n$, and suppose
> $$L = \lim_{n \to \infty} \frac{a_{n+1}}{a_n} \in [0, \infty].$$
>
> 1. If $L < 1$: $\sum a_n$ converges.
> 2. If $L > 1$ (including $L = \infty$): $\sum a_n$ diverges.
> 3. If $L = 1$: test is **inconclusive**.

**Proof.**

*(1) Case $L < 1$ — convergence.*

**Step 1 (pick a geometric bound).** Since $L < 1$, choose $r$ with $L < r < 1$ (e.g., $r = (L+1)/2$). Set $\varepsilon = r - L > 0$.

**Step 2 (apply definition of limit).** $\exists N$ such that for all $n \geq N$,
$$\left|\frac{a_{n+1}}{a_n} - L\right| < \varepsilon = r - L \implies \frac{a_{n+1}}{a_n} < L + (r - L) = r.$$

**Step 3 (iterate).** For $k \geq 1$,
$$a_{N+k} = a_N \cdot \frac{a_{N+1}}{a_N} \cdot \frac{a_{N+2}}{a_{N+1}} \cdots \frac{a_{N+k}}{a_{N+k-1}} < a_N \cdot r^k.$$

**Step 4 (compare with geometric series).** $\sum_{k=0}^{\infty} a_N r^k = a_N/(1 - r) < \infty$ since $0 < r < 1$. By Theorem 13.1(1) applied to $(a_{N+k})_{k \geq 0}$ and $(a_N r^k)_{k \geq 0}$, $\sum_{k \geq 0} a_{N+k}$ converges. Adding the finitely many terms $a_1, \ldots, a_{N-1}$ preserves convergence: $\sum_{n=1}^{\infty} a_n$ converges.

*(2) Case $L > 1$ — divergence.*

**Step 1.** If $L = \infty$, the argument is analogous (use any $r > 1$). If $1 < L < \infty$, pick $r$ with $1 < r < L$ and set $\varepsilon = L - r > 0$.

**Step 2.** $\exists N$: for $n \geq N$,
$$\left|\frac{a_{n+1}}{a_n} - L\right| < L - r \implies \frac{a_{n+1}}{a_n} > L - (L - r) = r > 1.$$

**Step 3 (iterate downward).** $a_{N+k} > a_N \cdot r^k \to \infty$ as $k \to \infty$, since $r > 1$ and $a_N > 0$.

**Step 4 (contradict the divergence test).** $a_n \not\to 0$, so by the Divergence Test (if $\sum a_n$ converges then $a_n \to 0$; contrapositive), $\sum a_n$ diverges.

*(3) Case $L = 1$ — inconclusive.*

**Counterexample 1 (convergent):** $a_n = 1/n^2$. Ratio $= n^2/(n+1)^2 \to 1$. Series converges ($p=2 > 1$).

**Counterexample 2 (divergent):** $a_n = 1/n$. Ratio $= n/(n+1) \to 1$. Series diverges (harmonic).

Both produce $L = 1$, with opposite conclusions, so the test cannot be decisive. $\blacksquare$

**Remark (why $\limsup$ suffices for convergence half).** If only $\limsup a_{n+1}/a_n = L^* < 1$, the Step 2 argument still produces an eventual ratio bound $< r$ for some $r < 1$, and convergence follows. For divergence, only $\liminf a_{n+1}/a_n > 1$ is needed. The two-sided statement above with an ordinary limit is the most common form.

### Examples

**Example 13.7.** $\sum_{n=1}^{\infty} \frac{n!}{n^n}$.

*Setup.* Factorial vs $n$-th power — classic ratio territory.

*Strategy.* Compute $a_{n+1}/a_n$ and simplify.

*Computation.*
$$\frac{a_{n+1}}{a_n} = \frac{(n+1)!}{(n+1)^{n+1}} \cdot \frac{n^n}{n!} = \frac{(n+1) \cdot n^n}{(n+1)^{n+1}} = \frac{n^n}{(n+1)^n} = \frac{1}{(1 + 1/n)^n}.$$
As $n \to \infty$, $(1+1/n)^n \to e$, so
$$\lim_{n\to\infty} \frac{a_{n+1}}{a_n} = \frac{1}{e} \approx 0.368 < 1.$$

*Verification.* $L = 1/e < 1$, so by Theorem 13.3(1), $\sum n!/n^n$ converges.

*Interpretation.* Factorials grow like $n^n/e^n$ (Stirling), so $a_n \sim \sqrt{2\pi n}/e^n$ — exponential decay in $n$, convergence secured.

---

**Example 13.8.** $\sum_{n=1}^{\infty} \frac{2^n \, n!}{n^n}$.

*Setup.* Same structure with extra factor $2^n$.

*Computation.*
$$\frac{a_{n+1}}{a_n} = \frac{2^{n+1} (n+1)!}{(n+1)^{n+1}} \cdot \frac{n^n}{2^n n!} = 2 \cdot \frac{n^n}{(n+1)^n} = \frac{2}{(1 + 1/n)^n} \to \frac{2}{e} \approx 0.736 < 1.$$

Converges.

---

**Example 13.9.** $\sum_{n=1}^{\infty} \frac{3^n \, n!}{n^n}$.

*Computation.* Analogous: $a_{n+1}/a_n \to 3/e \approx 1.104 > 1$. Diverges.

*Interpretation.* The threshold is $e$: $\sum c^n n!/n^n$ converges iff $c < e$, diverges iff $c > e$, and is inconclusive (by ratio) at $c = e$.

---

**Example 13.10.** $\sum_{n=0}^{\infty} \frac{x^n}{n!}$ for $x \in \mathbb{R}$.

*Setup.* For $x = 0$, sum is $1$. For $x \neq 0$, apply ratio test to $|a_n| = |x|^n/n!$.

*Computation.* $|a_{n+1}|/|a_n| = |x|/(n+1) \to 0 < 1$ for every $x \in \mathbb{R}$.

*Conclusion.* Series converges absolutely for all $x \in \mathbb{R}$, defining $e^x$.

### Ratio Test Limitations

Ratio gives $L = 1$ for:
- $\sum 1/n$ (diverges): ratio $= n/(n+1) \to 1$.
- $\sum 1/n^2$ (converges): ratio $= (n/(n+1))^2 \to 1$.

In the borderline $L = 1$ regime, use Raabe's test (§13.8) or Integral test (§13.6) or Cauchy condensation (§13.7).

---

## 13.5 Root Test (Cauchy)

> **Theorem 13.4 (Root Test).** Let $a_n \geq 0$ and set
> $$L = \limsup_{n \to \infty} a_n^{1/n} \in [0, \infty].$$
>
> 1. If $L < 1$: $\sum a_n$ converges.
> 2. If $L > 1$: $\sum a_n$ diverges.
> 3. If $L = 1$: inconclusive.

**Proof.**

*(1) Case $L < 1$.*

**Step 1 (geometric bound).** Pick $r$ with $L < r < 1$. Set $\varepsilon = (r - L)/2 > 0$, so $L + \varepsilon < r$.

**Step 2 (limsup property).** By definition of $\limsup$, $\exists N$ such that for all $n \geq N$,
$$a_n^{1/n} < L + \varepsilon < r.$$
(Only finitely many terms exceed $L + \varepsilon$.)

**Step 3 (raise to $n$).** $a_n < r^n$ for $n \geq N$.

**Step 4 (geometric comparison).** $\sum r^n < \infty$ since $0 < r < 1$. By Theorem 13.1(1), $\sum a_n$ converges.

*(2) Case $L > 1$.*

**Step 1.** By definition of $\limsup$, there exists a subsequence $(a_{n_k})$ with $a_{n_k}^{1/n_k} \to L > 1$.

**Step 2.** $\exists K$ such that $a_{n_k}^{1/n_k} > 1$ for $k \geq K$, hence $a_{n_k} > 1$.

**Step 3 (Divergence Test).** The subsequence $(a_{n_k})$ does not tend to $0$, so $(a_n)$ itself does not tend to $0$. Hence $\sum a_n$ diverges.

*(3) Case $L = 1$ — inconclusive.*

**Counterexamples.** $a_n = 1/n$ gives $a_n^{1/n} = n^{-1/n} \to 1$ (since $\ln(n^{-1/n}) = -\ln n / n \to 0$). Series diverges. $a_n = 1/n^2$: $a_n^{1/n} = n^{-2/n} \to 1$. Series converges. $\blacksquare$

**Remark (why $\limsup$, not $\lim$?).** $\liminf / \limsup$ always exist in $[0, \infty]$, whereas $\lim$ may fail (consider $a_n = 2^n$ for even $n$ and $a_n = 3^n$ for odd $n$: $a_n^{1/n}$ oscillates between $2$ and $3$). Using $\limsup$ gives the strongest possible form.

### Strength: Root vs Ratio

> **Theorem 13.5.** If $a_n > 0$ and $\lim_{n \to \infty} a_{n+1}/a_n = L$, then $\lim_{n \to \infty} a_n^{1/n} = L$ (same limit).

**Proof sketch.** For $L > 0$: given $\varepsilon > 0$, $\exists N$ with $L - \varepsilon < a_{n+1}/a_n < L + \varepsilon$ for $n \geq N$. Telescoping from $N$ to $N + k$:
$$(L - \varepsilon)^k < \frac{a_{N+k}}{a_N} < (L + \varepsilon)^k.$$
Raise to $1/(N+k)$: $(L - \varepsilon)^{k/(N+k)} a_N^{1/(N+k)} < a_{N+k}^{1/(N+k)} < (L+\varepsilon)^{k/(N+k)} a_N^{1/(N+k)}$. As $k \to \infty$, $k/(N+k) \to 1$ and $a_N^{1/(N+k)} \to 1$, so both bounds $\to L \pm \varepsilon$, respectively. Since $\varepsilon$ arbitrary, $a_n^{1/n} \to L$. Case $L = 0$ similar. $\blacksquare$

**Converse fails.** Let $a_n = 2 + (-1)^n$: terms alternate $1, 3, 1, 3, \ldots$. Ratio $a_{n+1}/a_n$ alternates $3, 1/3$, so $\lim$ does not exist. But $a_n^{1/n} \to 1$ (both $1^{1/n} \to 1$ and $3^{1/n} \to 1$), so root test gives $L = 1$ (inconclusive).

**Moral.** Root test is strictly stronger: it succeeds in cases where ratio test has no limit.

### Examples

**Example 13.11.** $\sum_{n=1}^{\infty} (1 - 1/n)^{n^2}$.

*Setup.* $a_n = (1 - 1/n)^{n^2} \geq 0$.

*Strategy.* Use root test; the $n^2$ exponent makes $a_n^{1/n} = (1 - 1/n)^n$ tractable.

*Computation.* $a_n^{1/n} = (1 - 1/n)^n \to e^{-1} = 1/e < 1$ (standard limit).

*Verification.* $L = 1/e < 1$, converges.

*Interpretation.* Without the root test, this would be a nightmare — but the $n$-th power structure signals "root test."

---

**Example 13.12.** $\sum_{n=1}^{\infty} \frac{n^n}{3^n n!}$.

*Setup.* Could try ratio; here root also works with Stirling.

*Strategy (root).* $a_n^{1/n} = n / (3 (n!)^{1/n})$. Stirling: $(n!)^{1/n} \sim n/e$, so $a_n^{1/n} \to (n)/(3 \cdot n/e) = e/3 < 1$.

*Verification.* $L = e/3 \approx 0.906 < 1$, converges.

*Sanity check via ratio.* $a_{n+1}/a_n = \tfrac{(n+1)^{n+1}}{3^{n+1}(n+1)!} \cdot \tfrac{3^n n!}{n^n} = \tfrac{(n+1)^n}{3 n^n} = \tfrac{(1+1/n)^n}{3} \to e/3$. Matches.

---

**Example 13.13.** $\sum_{n=1}^{\infty} \frac{2^n}{n^n}$.

*Computation.* $a_n^{1/n} = 2/n \to 0 < 1$. Converges, very rapidly.

---

## 13.6 Integral Test

> **Theorem 13.6 (Integral Test).** Let $f : [1, \infty) \to [0, \infty)$ be **continuous, positive, and decreasing** (or just monotone non-increasing), and set $a_n = f(n)$. Then
> $$\sum_{n=1}^{\infty} a_n \text{ converges} \iff \int_1^{\infty} f(x) \, dx \text{ converges.}$$

**Proof.**

*Setup.* Since $f$ is non-increasing and non-negative on $[1, \infty)$, for each integer $n \geq 1$ and $x \in [n, n+1]$,
$$f(n+1) \leq f(x) \leq f(n).$$
(Left inequality: $x \geq n$ so $f(x) \leq f(n)$? No — since $f$ is decreasing, $x \geq n \Rightarrow f(x) \leq f(n)$. Right: $x \leq n+1 \Rightarrow f(x) \geq f(n+1)$.)

**Step 1 (integrate).** Integrate the double inequality over $[n, n+1]$ (length $1$):
$$f(n+1) \cdot 1 \leq \int_n^{n+1} f(x) \, dx \leq f(n) \cdot 1,$$
i.e., $a_{n+1} \leq \int_n^{n+1} f(x) \, dx \leq a_n$.

**Step 2 (sum from $n = 1$ to $N$).** Using the right inequality: $\int_n^{n+1} f \leq a_n$. Summing,
$$\int_1^{N+1} f(x) \, dx = \sum_{n=1}^{N} \int_n^{n+1} f(x)\, dx \leq \sum_{n=1}^{N} a_n = s_N. \tag{I}$$
Using the left: $a_{n+1} \leq \int_n^{n+1} f$. Summing,
$$s_{N+1} - a_1 = \sum_{n=1}^{N} a_{n+1} \leq \sum_{n=1}^{N} \int_n^{n+1} f(x)\, dx = \int_1^{N+1} f(x)\, dx. \tag{II}$$

Combining (I) and (II):
$$s_{N+1} - a_1 \leq \int_1^{N+1} f(x) \, dx \leq s_N. \tag{$\star\star$}$$

**Step 3 ($\Rightarrow$).** Assume $\int_1^\infty f$ converges, say to $I$. Then $\int_1^{N+1} f \leq I$ for all $N$. From ($\star\star$) left: $s_{N+1} \leq a_1 + I$, so $(s_N)$ is bounded. Since $a_n \geq 0$, $(s_N)$ is monotone non-decreasing. By MCT, $\sum a_n$ converges.

**Step 4 ($\Leftarrow$).** Assume $\sum a_n$ converges, say to $S$. Then $s_N \leq S$ for all $N$. From ($\star\star$) right: $\int_1^{N+1} f \leq S$. Since $f \geq 0$, the improper integral $\int_1^\infty f = \lim_{N \to \infty} \int_1^{N+1} f$ is monotone non-decreasing in $N$, bounded by $S$, hence converges.

$\blacksquare$

**Quantitative form.** Letting $N \to \infty$ in ($\star\star$):
$$\sum_{n=1}^{\infty} a_n - a_1 \leq \int_1^\infty f(x)\, dx \leq \sum_{n=1}^{\infty} a_n,$$
so the sum and integral differ by at most $a_1$.

**Remark (monotone hypothesis is necessary).** Without monotonicity, the inequalities fail. Example: $f(x) = \sin^2(\pi x)$ is non-negative; $f(n) = 0$ for all integers $n$, so $\sum f(n) = 0$ converges; but $\int_1^\infty f(x)\, dx = \infty$ (average value $1/2$).

### Examples

**Example 13.14 ($p$-series).** $\sum_{n=1}^{\infty} 1/n^p$, $p > 0$.

*Setup.* $f(x) = 1/x^p$ is positive, continuous, decreasing on $[1, \infty)$.

*Computation of integral.*
$$\int_1^\infty \frac{dx}{x^p} = \begin{cases} \left[\tfrac{x^{1-p}}{1-p}\right]_1^\infty = \tfrac{1}{p-1} & \text{if } p > 1, \\ [\ln x]_1^\infty = \infty & \text{if } p = 1, \\ \left[\tfrac{x^{1-p}}{1-p}\right]_1^\infty = \infty & \text{if } p < 1.\end{cases}$$

*Conclusion.* $\sum 1/n^p$ converges iff $p > 1$. (For $p \leq 0$, $a_n \not\to 0$, so divergence is trivial.)

---

**Example 13.15.** $\sum_{n=2}^{\infty} 1/(n \ln n)$.

*Setup.* $f(x) = 1/(x \ln x)$ on $[2, \infty)$; positive, decreasing (derivative $< 0$ for $x > e$, which is $\leq 2$... actually checking: $f'(x) = -(\ln x + 1)/(x \ln x)^2 < 0$ for $x \geq 2$ since $\ln x > 0$).

*Computation.*
$$\int_2^\infty \frac{dx}{x \ln x} = \left[\ln \ln x\right]_2^\infty = \lim_{x \to \infty} \ln \ln x - \ln \ln 2 = \infty.$$

*Conclusion.* Diverges.

---

**Example 13.16.** $\sum_{n=2}^{\infty} 1/(n (\ln n)^p)$, $p > 0$.

*Computation.* Substitution $u = \ln x$, $du = dx/x$:
$$\int_2^\infty \frac{dx}{x(\ln x)^p} = \int_{\ln 2}^\infty \frac{du}{u^p}.$$
This is a $p$-integral in $u$: converges iff $p > 1$.

*Conclusion.* $\sum 1/(n (\ln n)^p)$ converges iff $p > 1$.

**Interpretation.** Logarithmic factors behave like "slowed-down" $p$-series. Each extra $\ln$ narrows the convergent regime: $\sum 1/(n \ln n)$ diverges, $\sum 1/(n \ln n \ln \ln n)$ diverges, etc. — compare [[12-infinite-series-introduction]] for the full Abel–Dini hierarchy.

---

## 13.7 Cauchy Condensation Test

> **Theorem 13.7 (Cauchy Condensation).** Let $(a_n)_{n \geq 1}$ be a **non-increasing non-negative** sequence: $a_1 \geq a_2 \geq \cdots \geq 0$. Then
> $$\sum_{n=1}^{\infty} a_n \text{ converges} \iff \sum_{k=0}^{\infty} 2^k a_{2^k} \text{ converges.}$$

**Proof.**

*Setup.* The key observation: since $(a_n)$ is decreasing, we can sandwich blocks of consecutive terms between two explicit values. Specifically, for $k \geq 0$ and any $n$ with $2^k \leq n < 2^{k+1}$, by monotonicity
$$a_{2^{k+1}} \leq a_n \leq a_{2^k}. \tag{sandwich}$$

There are $2^{k+1} - 2^k = 2^k$ such indices $n$.

**Step 1 (block sum bounds).** Sum (sandwich) over $n = 2^k, 2^k + 1, \ldots, 2^{k+1} - 1$:
$$2^k \cdot a_{2^{k+1}} \leq \sum_{n = 2^k}^{2^{k+1} - 1} a_n \leq 2^k \cdot a_{2^k}. \tag{B}$$

**Step 2 (sum blocks over $k$).** Summing (B) for $k = 0, 1, \ldots, K-1$:
$$\sum_{k=0}^{K-1} 2^k a_{2^{k+1}} \leq \sum_{n=1}^{2^K - 1} a_n \leq \sum_{k=0}^{K-1} 2^k a_{2^k}. \tag{S}$$

The left side: reindex $j = k+1$: $\sum_{j=1}^{K} 2^{j-1} a_{2^j} = \tfrac12 \sum_{j=1}^{K} 2^j a_{2^j}$.

Rewriting (S):
$$\frac{1}{2} \sum_{j=1}^{K} 2^j a_{2^j} \leq \sum_{n=1}^{2^K - 1} a_n \leq \sum_{k=0}^{K-1} 2^k a_{2^k}. \tag{S'}$$

**Step 3 (bidirectional comparison).**

($\Rightarrow$) Assume $\sum 2^k a_{2^k}$ converges, say to $T$. Right of (S'): $\sum_{n=1}^{2^K - 1} a_n \leq T$ for all $K$. The partial sums of $\sum a_n$ are monotone (since $a_n \geq 0$) and bounded by $T$ (any partial sum $s_N$ is bounded by $\sum_{n=1}^{2^K - 1} a_n$ for the smallest $K$ with $2^K - 1 \geq N$). By MCT, $\sum a_n$ converges.

($\Leftarrow$) Assume $\sum a_n$ converges, say to $S$. Left of (S'): $\tfrac12 \sum_{j=1}^{K} 2^j a_{2^j} \leq S$, so $\sum_{j=1}^{K} 2^j a_{2^j} \leq 2S$. Plus $2^0 a_{2^0} = a_1$ constant, so $\sum_{k=0}^{K} 2^k a_{2^k} \leq a_1 + 2S$. Bounded monotone $\Rightarrow$ convergent.

$\blacksquare$

**Remark (why "condensation"?).** The test replaces the full series by the sparser (geometrically indexed) subsequence $(2^k a_{2^k})$, which has only $O(\log N)$ nonzero entries for partial sums up to $N$. The decreasing hypothesis is what lets us "pack" block sums into single terms.

### Examples

**Example 13.17.** $a_n = 1/n$ (harmonic).

*Setup.* $(1/n)$ is decreasing, $\geq 0$.

*Condensed.* $2^k a_{2^k} = 2^k \cdot 1/2^k = 1$. $\sum_{k \geq 0} 1$ diverges.

*Conclusion.* Harmonic series diverges (same as known).

---

**Example 13.18.** $a_n = 1/n^p$, $p > 0$.

*Condensed.* $2^k \cdot 1/2^{kp} = 2^{k(1 - p)}$.

*Geometric analysis.* $\sum (2^{1 - p})^k$ converges iff $2^{1-p} < 1$ iff $1 - p < 0$ iff $p > 1$.

*Conclusion.* $\sum 1/n^p$ converges iff $p > 1$. (Same as integral test.)

---

**Example 13.19.** $a_n = 1/(n \ln n)$ (for $n \geq 2$).

*Setup.* Check monotonicity: numerically $a_2 > a_3 > \cdots$; formally $n \ln n$ increasing, so $1/(n \ln n)$ decreasing.

*Condensed.* $2^k a_{2^k} = 2^k \cdot \tfrac{1}{2^k \ln 2^k} = \tfrac{1}{k \ln 2}$.

*Analysis.* $\sum 1/(k \ln 2) = (1/\ln 2) \sum 1/k$: harmonic-like, diverges.

*Conclusion.* Diverges. (Matches integral test.)

**Interpretation.** Condensation turns logarithmic series into harmonic-like series, trading log factors for simpler structure. Especially efficient for $\sum 1/(n (\ln n)^p (\ln \ln n)^q \cdots)$ towers.

---

## 13.8 Raabe's Test

> **Theorem 13.8 (Raabe).** Let $a_n > 0$ and suppose the limit
> $$R = \lim_{n \to \infty} n\left(\frac{a_n}{a_{n+1}} - 1\right)$$
> exists in $[-\infty, \infty]$. Then:
>
> 1. $R > 1$: $\sum a_n$ **converges**.
> 2. $R < 1$: $\sum a_n$ **diverges**.
> 3. $R = 1$: **inconclusive** (try Gauss).

Equivalently, writing $a_n/a_{n+1} = 1 + R_n/n$ with $R_n \to R$, the same dichotomy holds.

**Proof.**

*(1) Case $R > 1$ — convergence.*

**Step 1 (pick intermediate).** Choose $r$ with $1 < r < R$. Set $\varepsilon = (R - r)/2 > 0$.

**Step 2 (apply limit).** $\exists N$: for $n \geq N$,
$$n\left(\frac{a_n}{a_{n+1}} - 1\right) > R - \varepsilon > r.$$
Rearranging: $a_n/a_{n+1} > 1 + r/n$, i.e., $a_{n+1} < a_n / (1 + r/n)$.

**Step 3 (compare to $1/n^r$ via telescoping).** Consider $b_n = 1/n^r$; then $\sum b_n$ converges (since $r > 1$). The key identity is to show $(n a_n - (n+1) a_{n+1})$ is bounded below by a constant multiple of $a_{n+1}$, yielding a telescoping estimate.

From Step 2: $n a_n > n a_{n+1} + r a_{n+1} \Rightarrow n a_n - n a_{n+1} > r a_{n+1} \Rightarrow n(a_n - a_{n+1}) > r a_{n+1}$. Equivalently, $n a_n - (n+1) a_{n+1} > (r - 1) a_{n+1}$.

**Step 4 (telescope).** Sum from $n = N$ to $n = M$:
$$\sum_{n=N}^{M} (n a_n - (n+1) a_{n+1}) > (r - 1) \sum_{n=N}^{M} a_{n+1}.$$
Left side telescopes to $N a_N - (M+1) a_{M+1}$. Since $a_{M+1} \geq 0$,
$$N a_N > N a_N - (M+1) a_{M+1} > (r - 1) \sum_{n=N+1}^{M+1} a_n.$$
So $\sum_{n=N+1}^{M+1} a_n < N a_N / (r - 1)$ for every $M \geq N$. Bounded monotone partial sums, so $\sum a_n$ converges.

*(2) Case $R < 1$ — divergence.*

**Step 1.** Choose $s$ with $R < s < 1$. Set $\varepsilon = (s - R)/2 > 0$.

**Step 2.** $\exists N$: for $n \geq N$,
$$n\left(\frac{a_n}{a_{n+1}} - 1\right) < R + \varepsilon < s < 1.$$
Rearranging: $a_n/a_{n+1} < 1 + s/n \leq \exp(s/n)$ (using $1 + x \leq e^x$).

**Step 3 (compare to $1/n^s$).** Consider $b_n = 1/n^s$: $b_n/b_{n+1} = ((n+1)/n)^s = (1 + 1/n)^s \geq 1 + s/n$ (by Bernoulli-like inequality for $s < 1$... actually by Bernoulli $s < 1$, $(1 + 1/n)^s \leq 1 + s/n$, so need a different approach).

Alternative: use the inequality $a_n/a_{n+1} < 1 + s/n$ for $n \geq N$, iterate:
$$\frac{a_n}{a_N} = \prod_{k=N}^{n-1} \frac{a_{k+1}}{a_k} > \prod_{k=N}^{n-1} \frac{1}{1 + s/k} = \prod_{k=N}^{n-1} \frac{k}{k + s}.$$

Logarithm: $\ln(a_n/a_N) > -\sum_{k=N}^{n-1} \ln(1 + s/k)$. Since $\ln(1 + s/k) \leq s/k$,
$$\ln(a_n/a_N) > -s \sum_{k=N}^{n-1} 1/k \geq -s \ln(n/N) - C$$
for some constant $C$, using $\sum_{k=N}^{n-1} 1/k \leq \ln(n/N) + 1$. Hence $a_n \geq a_N \cdot (N/n)^s \cdot e^{-C} = C' / n^s$ for some $C' > 0$.

**Step 4.** Since $s < 1$, $\sum 1/n^s$ diverges. By Theorem 13.1(2), $\sum a_n$ diverges.

*(3) Case $R = 1$ — inconclusive.*

Counterexamples (see §13.9 below) show both convergence and divergence occur when $R = 1$. $\blacksquare$

**When to reach for Raabe.** If the ratio test gives $L = 1$ but you can see $a_n/a_{n+1} \approx 1 + c/n$, compute $c$: that's $R$.

### Examples

**Example 13.20.** $a_n = 1/n^p$.

*Computation.* $a_n/a_{n+1} = ((n+1)/n)^p = (1 + 1/n)^p = 1 + p/n + O(1/n^2)$. So $n(a_n/a_{n+1} - 1) = p + O(1/n) \to p$.

*Verification.* $R = p$; Raabe says converges iff $p > 1$. Matches $p$-series.

---

**Example 13.21.** $a_n = \frac{(2n)!}{4^n (n!)^2 (n+1)}$.

*Setup.* Ratio test first.
$$\frac{a_{n+1}}{a_n} = \frac{(2n+2)!}{4^{n+1} ((n+1)!)^2 (n+2)} \cdot \frac{4^n (n!)^2 (n+1)}{(2n)!} = \frac{(2n+1)(2n+2)(n+1)}{4(n+1)^2 (n+2)} = \frac{(2n+1)(2n+2)}{4(n+1)(n+2)}.$$
As $n \to \infty$, numerator $\sim 4n^2$, denominator $\sim 4 n^2$, ratio $\to 1$. Ratio test inconclusive.

*Raabe.* Compute
$$\frac{a_n}{a_{n+1}} = \frac{4(n+1)(n+2)}{(2n+1)(2n+2)} = \frac{2(n+1)(n+2)}{(2n+1)(n+1)} = \frac{2(n+2)}{2n+1} = \frac{2n + 4}{2n + 1} = 1 + \frac{3}{2n+1}.$$

*Computation.* $n(a_n/a_{n+1} - 1) = 3n/(2n + 1) \to 3/2 > 1$.

*Conclusion.* $R = 3/2 > 1$: Raabe says **converges**.

---

## 13.9 Gauss's Test

> **Theorem 13.9 (Gauss).** Let $a_n > 0$ and suppose the ratio admits the asymptotic expansion
> $$\frac{a_n}{a_{n+1}} = 1 + \frac{\alpha}{n} + \frac{\beta_n}{n^{1+\delta}}$$
> for some $\delta > 0$ and some **bounded** sequence $(\beta_n)$ (i.e., $|\beta_n| \leq M$ for all $n$). Then:
>
> 1. $\alpha > 1$: $\sum a_n$ **converges**.
> 2. $\alpha \leq 1$: $\sum a_n$ **diverges**.

**Key improvement over Raabe.** Gauss handles the boundary case $\alpha = 1$ (Raabe's inconclusive regime) by examining the next-order correction. The critical insight: even when $R = 1$ in Raabe, if the expansion is $a_n/a_{n+1} = 1 + 1/n + \beta_n/n^{1+\delta}$, the bounded $\beta_n/n^{1+\delta}$ term is not enough to save convergence, and the series diverges.

**Proof sketch.**

*Case $\alpha > 1$.* Raabe's test applies: $n(a_n/a_{n+1} - 1) = \alpha + \beta_n/n^\delta \to \alpha > 1$. Converges.

*Case $\alpha < 1$.* Raabe's test applies: $n(a_n/a_{n+1} - 1) \to \alpha < 1$. Diverges.

*Case $\alpha = 1$ (the new content).* Here Raabe is inconclusive. The key is a telescoping argument against the logarithmic series.

**Step 1.** Consider $b_n = 1/(n \ln n)$ (divergent). Compute
$$\frac{b_n}{b_{n+1}} = \frac{(n+1)\ln(n+1)}{n \ln n} = \left(1 + \frac{1}{n}\right)\left(1 + \frac{\ln(1 + 1/n)}{\ln n}\right).$$
Expanding: $\ln(1 + 1/n) = 1/n - 1/(2n^2) + O(1/n^3)$, so
$$\frac{b_n}{b_{n+1}} = 1 + \frac{1}{n} + \frac{1}{n \ln n} + O\!\left(\frac{1}{n^2 \ln n}\right).$$

**Step 2.** Given $a_n/a_{n+1} = 1 + 1/n + \beta_n/n^{1+\delta}$ (bounded $\beta_n$, $\delta > 0$), the correction $\beta_n/n^{1+\delta}$ is smaller than $1/(n \ln n)$ for large $n$ (since $n^\delta$ eventually beats $\ln n$). Hence
$$\frac{a_n}{a_{n+1}} < \frac{b_n}{b_{n+1}} \qquad \text{for } n \geq N.$$
Telescoping: $a_n/a_N < b_n/b_N$, i.e., $a_n > (a_N/b_N) b_n = C/(n \ln n)$. Since $\sum 1/(n \ln n)$ diverges, so does $\sum a_n$.

*Case $\alpha = 1$ with expansion as stated:* diverges. Combining with the $\alpha < 1$ case, "$\alpha \leq 1 \Rightarrow$ diverges." $\blacksquare$

**Remark (sharpness of Gauss).** Gauss's test is sharp for the hypergeometric series (below): the convergence condition $\alpha > 1$ corresponds exactly to absolute convergence of the $_2F_1$ function at $z = 1$.

### Example — Hypergeometric Series

**Example 13.22.** Consider
$$a_n = \frac{\alpha (\alpha + 1) \cdots (\alpha + n - 1) \cdot \beta(\beta+1)\cdots(\beta + n - 1)}{n! \cdot \gamma(\gamma+1)\cdots(\gamma+n-1)},$$
the terms of the Gauss hypergeometric series ${}_2F_1(\alpha, \beta; \gamma; 1)$.

*Computing the ratio.*
$$\frac{a_{n+1}}{a_n} = \frac{(\alpha + n)(\beta + n)}{(n+1)(\gamma + n)}.$$
So
$$\frac{a_n}{a_{n+1}} = \frac{(n+1)(\gamma + n)}{(\alpha + n)(\beta + n)}.$$

*Asymptotic expansion.* Expand:
$$(n+1)(\gamma + n) = n^2 + (\gamma + 1)n + \gamma, \qquad (\alpha + n)(\beta + n) = n^2 + (\alpha + \beta) n + \alpha\beta.$$

So
$$\frac{a_n}{a_{n+1}} = \frac{n^2 + (\gamma + 1)n + \gamma}{n^2 + (\alpha + \beta) n + \alpha\beta} = 1 + \frac{(\gamma + 1 - \alpha - \beta) n + (\gamma - \alpha\beta)}{n^2 + (\alpha + \beta)n + \alpha\beta}.$$

Expanding to order $1/n$:
$$\frac{a_n}{a_{n+1}} = 1 + \frac{\gamma + 1 - \alpha - \beta}{n} + O\!\left(\frac{1}{n^2}\right).$$

*Applying Gauss.* Here the coefficient of $1/n$ is $\gamma + 1 - \alpha - \beta$, playing the role of $\alpha$ in Theorem 13.9. So:

- Converges iff $\gamma + 1 - \alpha - \beta > 1$, i.e., $\gamma > \alpha + \beta$.
- Diverges iff $\gamma \leq \alpha + \beta$.

*Classical result.* ${}_2F_1(\alpha, \beta; \gamma; 1)$ converges iff $\operatorname{Re}(\gamma - \alpha - \beta) > 0$ (Gauss's 1813 sum), with the explicit value given by Gauss's formula.

---

## 13.10 Strategy — Which Test to Use?

**Workflow.**

1. **Always** check $a_n \to 0$ first. If not: series diverges.
2. **Familiar form?** Geometric $\sum r^n$ ($|r|<1$ converges); $p$-series $\sum 1/n^p$ ($p>1$ converges) — use these as comparands.
3. **Factorials, exponentials, $n^k$?** Ratio test first (cleanest for products of factorials).
4. **$a_n$ contains $n$-th power $(f(n))^n$?** Root test.
5. **$a_n$ is a rational function of $n$ or an elementary transcendental?** Limit comparison with $1/n^p$.
6. **$a_n = f(n)$ for $f$ monotone decreasing with elementary antiderivative?** Integral test.
7. **$a_n$ decreasing with log factors?** Cauchy condensation.
8. **Ratio test gave $1$, with refined form $a_n/a_{n+1} = 1 + R/n + \ldots$?** Raabe, then Gauss if Raabe fails.
9. **Alternating?** Go to [[14-alternating-and-absolute-convergence]].

### Combined example

$\sum_{n=1}^{\infty} \frac{n^n}{3^n n!}$. Ratio test:
$$\frac{a_{n+1}}{a_n} = \frac{(n+1)^{n+1}}{3^{n+1}(n+1)!} \cdot \frac{3^n n!}{n^n} = \frac{(n+1)^n}{3 n^n} = \frac{(1 + 1/n)^n}{3} \to \frac{e}{3} < 1.$$
Converges.

---

## 13.11 Worked Examples (Qualifying-Exam Style)

**Example 13.23.** Test $\sum_{n=1}^{\infty} \dfrac{n!}{n^n}$.

*Setup.* Positive terms; factorial vs $n^n$; ratio test natural.

*Strategy.* Compute $a_{n+1}/a_n$.

*Computation.*
$$\frac{a_{n+1}}{a_n} = \frac{(n+1)!}{(n+1)^{n+1}} \cdot \frac{n^n}{n!} = \frac{(n+1) \cdot n!}{(n+1)^{n+1}} \cdot \frac{n^n}{n!} = \frac{n^n}{(n+1)^n} = \frac{1}{(1 + 1/n)^n}.$$
As $n \to \infty$, $(1 + 1/n)^n \to e$ (definition of $e$). So
$$L = \lim_{n \to \infty} \frac{a_{n+1}}{a_n} = \frac{1}{e} \approx 0.368.$$

*Verification.* $L < 1$, so by Theorem 13.3(1), series converges.

*Interpretive remark.* Stirling gives $n! \sim \sqrt{2\pi n} \cdot (n/e)^n$, so $a_n \sim \sqrt{2\pi n}/e^n$ — exponential decay. $\blacksquare$

---

**Example 13.24.** Test $\sum_{n=1}^{\infty} \dfrac{n^3}{2^n}$.

*Setup.* Polynomial over exponential; classic ratio test.

*Strategy.* Compute ratio.

*Computation.*
$$\frac{a_{n+1}}{a_n} = \frac{(n+1)^3}{2^{n+1}} \cdot \frac{2^n}{n^3} = \frac{1}{2} \left(\frac{n+1}{n}\right)^3 = \frac{1}{2} (1 + 1/n)^3.$$
As $n \to \infty$, $(1 + 1/n)^3 \to 1$, so $L = 1/2$.

*Verification.* $L = 1/2 < 1$, converges by ratio test.

*Sanity check.* Exponential beats any polynomial: $\sum n^k/r^n$ converges for any $k \geq 0$ and any $r > 1$. $\blacksquare$

---

**Example 13.25.** Test $\sum_{n=2}^{\infty} \dfrac{1}{n (\log n)^2}$.

*Setup.* $f(x) = 1/(x (\log x)^2)$, decreasing for $x \geq 2$, positive. Integral test applies.

*Strategy.* Compute $\int_2^\infty f$.

*Computation.* Substitute $u = \log x$, $du = dx/x$:
$$\int_2^\infty \frac{dx}{x (\log x)^2} = \int_{\log 2}^\infty \frac{du}{u^2} = \left[-\frac{1}{u}\right]_{\log 2}^\infty = 0 - \left(-\frac{1}{\log 2}\right) = \frac{1}{\log 2}.$$

*Verification.* Finite, so integral converges; by Theorem 13.6, series converges.

*Alternative via condensation.* $2^k a_{2^k} = 2^k / (2^k (k \log 2)^2) = 1/(k^2 (\log 2)^2)$. $\sum 1/k^2$ converges, so condensed series converges; original converges.

*Interpretation.* Logarithmic "slowing" of $p$-series: $p = 1$ is borderline, and $(\log n)^p$ with $p > 1$ pulls convergence back. $\blacksquare$

---

**Example 13.26.** Test $\sum_{n=1}^{\infty} n^{-1 - 1/n}$.

*Setup.* $a_n = 1/n^{1 + 1/n} = \tfrac{1}{n} \cdot \tfrac{1}{n^{1/n}}$.

*Strategy.* Limit comparison. $n^{1/n} \to 1$ as $n \to \infty$ (standard: $\ln(n^{1/n}) = \ln n / n \to 0$). So $a_n \sim 1/n$.

*Computation.*
$$\frac{a_n}{1/n} = \frac{1}{n^{1/n}} \xrightarrow{n\to\infty} 1.$$

*Verification.* $L = 1 \in (0, \infty)$; $\sum 1/n$ diverges (harmonic); so $\sum n^{-1-1/n}$ diverges.

*Subtle check.* Even though $n^{-1-1/n} < 1/n$ termwise (for $n \geq 2$ since $n^{1/n} > 1$), limit comparison still confirms divergence because the ratio approaches $1$. Direct comparison from below would fail here. $\blacksquare$

---

**Example 13.27.** Test $\sum_{n=1}^{\infty} \dfrac{(n!)^2}{(2n)!}$.

*Setup.* Factorials; use ratio.

*Strategy.* Compute $a_{n+1}/a_n$.

*Computation.*
$$\frac{a_{n+1}}{a_n} = \frac{((n+1)!)^2}{(2n+2)!} \cdot \frac{(2n)!}{(n!)^2} = \frac{(n+1)^2 (n!)^2}{(2n+2)(2n+1)(2n)!} \cdot \frac{(2n)!}{(n!)^2} = \frac{(n+1)^2}{(2n+2)(2n+1)}.$$

Simplify: $(2n+2) = 2(n+1)$, so
$$\frac{(n+1)^2}{2(n+1)(2n+1)} = \frac{n+1}{2(2n+1)}.$$
As $n \to \infty$: numerator $\sim n$, denominator $\sim 4n$, so $L = 1/4$.

*Verification.* $L = 1/4 < 1$, converges.

*Explicit bound.* $(n!)^2/(2n)! = 1/\binom{2n}{n} \leq 1/2^n$ for large $n$ (central binomial coefficient), so series converges geometrically.

*Interpretation.* $\binom{2n}{n} \sim 4^n/\sqrt{\pi n}$ (Stirling), so $a_n \sim \sqrt{\pi n}/4^n$. $\blacksquare$

---

## 13.12 Practice Problems

1. Determine convergence of each:
   - (a) $\sum \dfrac{n+1}{n^2 + 2n + 3}$
   - (b) $\sum_{n=2}^{\infty} \dfrac{1}{(\ln n)^2}$
   - (c) $\sum \dfrac{n!}{10^n}$
   - (d) $\sum \dfrac{1}{n!}$
   - (e) $\sum \dfrac{2^n}{n^{100}}$

2. Show that $\sum_{n=2}^{\infty} \dfrac{1}{n^p (\ln n)^q}$ converges iff $p > 1$, or $p = 1$ and $q > 1$.

3. Apply Raabe's test to $\sum \dfrac{1 \cdot 3 \cdot 5 \cdots (2n-1)}{2 \cdot 4 \cdot 6 \cdots (2n)}$. Does it converge?

4. Test $\sum_{n=1}^\infty (1 - \cos(1/n))$ using limit comparison.

5. Prove: if $\sum a_n$ converges absolutely and $(b_n)$ is a bounded sequence, then $\sum a_n b_n$ converges absolutely.

### Solutions

---

**Solution 1(a).** $\sum \dfrac{n+1}{n^2 + 2n + 3}$.

*Setup.* Rational expression, degree $1$ in numerator, degree $2$ in denominator: asymptotic $\sim 1/n$.

*Strategy.* Limit comparison with $b_n = 1/n$.

*Computation.*
$$\frac{a_n}{b_n} = \frac{(n+1) n}{n^2 + 2n + 3} = \frac{n^2 + n}{n^2 + 2n + 3} \xrightarrow{n\to\infty} 1.$$

*Verification.* $L = 1 \in (0, \infty)$; $\sum 1/n$ diverges; so by Theorem 13.2(1), $\sum a_n$ **diverges**.

*Alternative (direct comparison).* For $n \geq 1$, $n^2 + 2n + 3 \leq 4n^2$ (since $2n + 3 \leq 3n^2$ for $n \geq 2$), so $a_n \geq (n+1)/(4n^2) \geq 1/(4n)$. $\sum 1/(4n)$ diverges, so $\sum a_n$ diverges. $\blacksquare$

---

**Solution 1(b).** $\sum_{n=2}^{\infty} 1/(\ln n)^2$.

*Setup.* Logarithmic, decreasing.

*Strategy.* Direct comparison from below: for large $n$, $\ln n < \sqrt n$, so $(\ln n)^2 < n$, so $1/(\ln n)^2 > 1/n$.

*Verification of $\ln n < \sqrt n$ eventually.* Consider $g(x) = \sqrt x - \ln x$; $g'(x) = 1/(2\sqrt x) - 1/x = (x - 2\sqrt x)/(2 x \sqrt x) > 0$ for $x > 4$. So $g$ is eventually increasing; $g(16) = 4 - \ln 16 = 4 - 2.77 > 0$. Hence $\sqrt n > \ln n$ for $n \geq 16$.

*Computation.* For $n \geq 16$: $1/(\ln n)^2 > 1/n$. $\sum 1/n$ diverges, so $\sum 1/(\ln n)^2$ **diverges** by direct comparison.

*Interpretation.* $1/(\ln n)^2$ decays so slowly that even the harmonic series outpaces it from below. $\blacksquare$

---

**Solution 1(c).** $\sum n!/10^n$.

*Strategy.* Ratio test.

*Computation.*
$$\frac{a_{n+1}}{a_n} = \frac{(n+1)!}{10^{n+1}} \cdot \frac{10^n}{n!} = \frac{n+1}{10} \xrightarrow{n\to\infty} \infty.$$

*Verification.* $L = \infty > 1$, diverges.

*Interpretive remark.* Factorials outgrow any fixed exponential; $n!/c^n \to \infty$ for every $c > 0$. $\blacksquare$

---

**Solution 1(d).** $\sum 1/n!$.

*Strategy.* Ratio test.

*Computation.* $a_{n+1}/a_n = n!/(n+1)! = 1/(n+1) \to 0$.

*Verification.* $L = 0 < 1$, converges.

*Explicit value.* $\sum_{n=0}^\infty 1/n! = e$, so $\sum_{n=1}^\infty 1/n! = e - 1 \approx 1.718$. $\blacksquare$

---

**Solution 1(e).** $\sum 2^n/n^{100}$.

*Strategy.* Ratio test.

*Computation.*
$$\frac{a_{n+1}}{a_n} = \frac{2^{n+1}}{(n+1)^{100}} \cdot \frac{n^{100}}{2^n} = 2 \left(\frac{n}{n+1}\right)^{100} = 2 \cdot \frac{1}{(1 + 1/n)^{100}} \to 2.$$

*Verification.* $L = 2 > 1$, diverges.

*Interpretation.* Exponential $2^n$ beats the polynomial $n^{100}$ no matter how large the polynomial degree. (Contrast with 1(d): factorials beat exponentials, exponentials beat polynomials.) $\blacksquare$

---

**Solution 2.** $\sum_{n=2}^{\infty} 1/(n^p (\ln n)^q)$ converges iff $p > 1$, or $p = 1$ and $q > 1$.

*Setup.* Apply Cauchy condensation (Theorem 13.7); the sequence $a_n = 1/(n^p (\ln n)^q)$ is decreasing for $p > 0$, $q \geq 0$ (or even $q$ negative, provided $n$ large enough that $n^p (\ln n)^q$ is increasing; handle $q < 0$ separately if needed).

*Condensed series.*
$$2^k a_{2^k} = 2^k \cdot \frac{1}{(2^k)^p (k \ln 2)^q} = \frac{1}{(\ln 2)^q} \cdot \frac{2^k}{2^{kp} k^q} = \frac{1}{(\ln 2)^q} \cdot \frac{2^{k(1-p)}}{k^q}.$$

*Case analysis.*

**Case $p > 1$.** $2^{k(1-p)} = r^k$ with $r = 2^{1-p} < 1$. Then
$$2^k a_{2^k} = \frac{r^k}{(\ln 2)^q k^q}.$$
Since $r^k$ decays geometrically (faster than any polynomial in $k$), $\sum r^k/k^q$ converges. Apply Theorem 13.7: $\sum a_n$ **converges**.

**Case $p < 1$.** $2^{k(1-p)} \to \infty$ as $k \to \infty$; the term $2^{k(1-p)}/k^q \to \infty$ (since exponential growth beats polynomial in $k$). So the condensed series' terms don't tend to $0$, hence diverges. $\sum a_n$ **diverges**.

**Case $p = 1$.** Condensed:
$$2^k a_{2^k} = \frac{1}{(\ln 2)^q k^q}.$$
This is (a constant multiple of) the $p$-series $\sum 1/k^q$: converges iff $q > 1$.

*Combined result.* $\sum 1/(n^p (\ln n)^q)$ converges iff:
- $p > 1$ (any $q$); or
- $p = 1$ and $q > 1$.

*Interpretation.* The "critical line" for $p$-series is $p = 1$. At the critical line, a logarithmic factor with exponent $q > 1$ is enough to restore convergence, but not $q \leq 1$. This refines the convergence hierarchy indefinitely: $\sum 1/(n \ln n \log_2 \log_2 n)$ still diverges. $\blacksquare$

---

**Solution 3.** Raabe's test on $a_n = \dfrac{1 \cdot 3 \cdot 5 \cdots (2n-1)}{2 \cdot 4 \cdot 6 \cdots (2n)}$.

*Setup.* Equivalently, $a_n = \tfrac{(2n)!}{4^n (n!)^2} = \binom{2n}{n}/4^n$. Positive, decreasing.

*Ratio.*
$$\frac{a_{n+1}}{a_n} = \frac{2n+1}{2n+2}.$$
So
$$\frac{a_n}{a_{n+1}} = \frac{2n+2}{2n+1} = 1 + \frac{1}{2n+1}.$$

*Raabe computation.*
$$n \left(\frac{a_n}{a_{n+1}} - 1\right) = n \cdot \frac{1}{2n+1} = \frac{n}{2n+1} \xrightarrow{n\to\infty} \frac{1}{2}.$$

*Verification.* $R = 1/2 < 1$. By Theorem 13.8(2), $\sum a_n$ **diverges**.

*Sanity check via Stirling.*
$$a_n = \binom{2n}{n}/4^n \sim \frac{4^n/\sqrt{\pi n}}{4^n} = \frac{1}{\sqrt{\pi n}}.$$
So $a_n \sim C/\sqrt n$. Then $\sum a_n \sim C \sum 1/\sqrt n$, which diverges ($p = 1/2 < 1$). Confirms Raabe.

*Interpretation.* This is the Wallis-product coefficient; ratio test gives exactly $1$, but Raabe captures the $1/\sqrt n$ rate, yielding divergence. $\blacksquare$

---

**Solution 4.** $\sum (1 - \cos(1/n))$ by limit comparison.

*Setup.* For $n \geq 1$, $1 - \cos(1/n) \geq 0$ with strict inequality for $n \geq 1$ (since $\cos(1/n) < 1$).

*Strategy.* Taylor: $\cos x = 1 - x^2/2 + x^4/24 + \ldots$, so $1 - \cos x = x^2/2 - x^4/24 + \ldots \sim x^2/2$ as $x \to 0$. With $x = 1/n$: $1 - \cos(1/n) \sim 1/(2n^2)$. Compare with $b_n = 1/n^2$.

*Computation.*
$$\frac{1 - \cos(1/n)}{1/n^2} = \frac{1 - \cos(1/n)}{(1/n)^2} \xrightarrow{n\to\infty} \lim_{x \to 0} \frac{1 - \cos x}{x^2} = \frac{1}{2}$$
(standard limit, or L'Hôpital twice).

*Verification.* $L = 1/2 \in (0, \infty)$; $\sum 1/n^2$ converges; by Theorem 13.2(1), $\sum (1 - \cos(1/n))$ **converges**.

*Rigorous bound (avoiding the limit).* For $|x| \leq 1$, Taylor with remainder: $1 - \cos x = x^2/2 - x^4/24 + \ldots$, and the alternating tail has $|1 - \cos x - x^2/2| \leq x^4/24$. For $x = 1/n$ and $n \geq 1$: $|1 - \cos(1/n) - 1/(2n^2)| \leq 1/(24 n^4)$, so $1 - \cos(1/n) \leq 1/(2n^2) + 1/(24 n^4) \leq 1/n^2$ for $n \geq 1$. Direct comparison to $\sum 1/n^2$ gives convergence. $\blacksquare$

---

**Solution 5.** If $\sum a_n$ converges absolutely and $(b_n)$ is bounded, then $\sum a_n b_n$ converges absolutely.

*Setup.* Given: $\sum |a_n| < \infty$; $\exists M > 0$ such that $|b_n| \leq M$ for all $n$. Goal: $\sum |a_n b_n| < \infty$.

*Strategy.* Direct comparison.

*Computation.* For every $n$,
$$|a_n b_n| = |a_n| \cdot |b_n| \leq M \cdot |a_n|.$$
Hence
$$\sum_{n=1}^{N} |a_n b_n| \leq M \sum_{n=1}^{N} |a_n| \leq M \sum_{n=1}^{\infty} |a_n| < \infty.$$

*Verification.* The partial sums of $\sum |a_n b_n|$ are monotone (non-decreasing) and bounded above by $M \sum |a_n|$. By MCT, $\sum |a_n b_n|$ converges, i.e., $\sum a_n b_n$ **converges absolutely**.

*Consequence.* $\sum a_n b_n$ converges (absolute convergence implies convergence; see [[14-alternating-and-absolute-convergence]]).

*Interpretive remark.* This is the key lemma behind Abel/Dirichlet summation tests and the product of absolutely convergent and bounded sequences. It says: absolute convergence is preserved under bounded perturbation of the factors. $\blacksquare$

---

## 13.13 Cross-References

**Prerequisites:**
- [[12-infinite-series-introduction]] — series foundations, Cauchy criterion, Divergence Test
- [[10-cauchy-sequences-completeness]] — Cauchy criterion underpins all tests
- [[05-monotone-and-bolzano-weierstrass]] — Monotone Convergence Theorem

**Next topics:**
- [[14-alternating-and-absolute-convergence]] — Leibniz test, absolute vs conditional convergence
- [[15-rearrangement-of-series]] — Riemann rearrangement theorem for conditionally convergent series

**Related:**
- [[25-riemann-stieltjes-integral]] — Integral test formally uses Riemann integrals
- [[26-improper-integrals]] — Same comparison tests apply to $\int_1^\infty f$

**Further reading:**
- Abel–Dini theorem (logarithmic hierarchy of divergent series)
- Kummer's test (vast generalisation of Raabe)
- Bertrand's test (between Raabe and Gauss in sharpness)
