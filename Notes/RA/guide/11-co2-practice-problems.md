# 11. CO2 Practice Problems — Sequences, Convergence, Cauchy Sequences

These problems cover CO2 (Lessons 8-16), specifically:
- Sequences: boundedness, monotonicity, subsequences
- Convergence, ε-N definition, limit theorems
- Cauchy sequences and completeness of $\mathbb{R}$
- Bolzano-Weierstrass theorem (sequence version)

---

## Part A: Basic Convergence and ε-N

### Problem A1
Use the ε-N definition to prove $\lim_{n \to \infty} \dfrac{n + 1}{n} = 1$.

**Solution.** Given $\varepsilon > 0$, we want $|(n+1)/n - 1| = 1/n < \varepsilon$. This holds iff $n > 1/\varepsilon$. Choose $N = \lceil 1/\varepsilon \rceil + 1$. Then $n \geq N \Rightarrow |a_n - 1| < \varepsilon$. $\blacksquare$

([[09-convergence-and-limits]])

---

### Problem A2
Prove $\lim_{n \to \infty} \dfrac{2n + 3}{n + 1} = 2$.

**Solution.** $\left|\frac{2n+3}{n+1} - 2\right| = \left|\frac{2n + 3 - 2(n+1)}{n+1}\right| = \frac{1}{n+1}$. Given $\varepsilon > 0$, take $N > 1/\varepsilon - 1$. $\blacksquare$

([[09-convergence-and-limits]])

---

### Problem A3
Prove that if $a_n \to a$, then $|a_n| \to |a|$. Is the converse true?

**Solution.** By reverse triangle inequality: $||a_n| - |a|| \leq |a_n - a| \to 0$. So $|a_n| \to |a|$.

Converse **false**. Example: $a_n = (-1)^n$; $|a_n| = 1 \to 1$, but $a_n$ itself diverges. $\blacksquare$

([[09-convergence-and-limits]])

---

### Problem A4
Let $a_n \to a$ and $a_n \geq 0$ for all $n$. Show $a \geq 0$.

**Solution.** Suppose $a < 0$; take $\varepsilon = |a|/2$. Eventually $|a_n - a| < \varepsilon$, i.e., $a - \varepsilon < a_n < a + \varepsilon < 0$, contradicting $a_n \geq 0$. So $a \geq 0$. $\blacksquare$

> **Note.** Strict inequality is not preserved: $a_n > 0$ does **not** imply $a > 0$. Counterexample: $a_n = 1/n \to 0$.

([[09-convergence-and-limits]])

---

## Part B: Algebraic and Standard Limits

### Problem B1
Compute $\lim_{n \to \infty} \dfrac{3n^2 + 2n - 1}{n^2 + 5}$.

**Solution.** Divide numerator and denominator by $n^2$:
$$\frac{3 + 2/n - 1/n^2}{1 + 5/n^2} \to \frac{3 + 0 - 0}{1 + 0} = 3. \ \blacksquare$$

([[09-convergence-and-limits]])

---

### Problem B2
Prove $\lim_{n \to \infty} n^{1/n} = 1$.

**Solution.** Let $a_n = n^{1/n}$. Write $a_n = 1 + b_n$ with $b_n > 0$ for $n \geq 2$. Then $n = (1 + b_n)^n \geq \binom{n}{2} b_n^2 = \frac{n(n-1)}{2} b_n^2$, so $b_n^2 \leq 2/(n-1)$, giving $b_n \to 0$. Hence $a_n \to 1$. $\blacksquare$

([[09-convergence-and-limits]])

---

### Problem B3
Prove $\lim_{n \to \infty} \dfrac{x^n}{n!} = 0$ for any $x \in \mathbb{R}$.

**Solution.** For fixed $x$, choose $N > 2|x|$. For $n > N$:
$$\left|\frac{x^n}{n!}\right| = \frac{|x|^N}{N!} \cdot \frac{|x|}{N+1} \cdot \frac{|x|}{N+2} \cdots \frac{|x|}{n} < \frac{|x|^N}{N!} \cdot \frac{1}{2^{n-N}}.$$
Right side $\to 0$ geometrically. $\blacksquare$

([[09-convergence-and-limits]])

---

### Problem B4
Let $a > 0$. Show $\lim_{n \to \infty} a^{1/n} = 1$.

**Solution.**
- If $a \geq 1$: write $a^{1/n} = 1 + c_n$ with $c_n \geq 0$. Then $a = (1 + c_n)^n \geq 1 + n c_n$, so $c_n \leq (a-1)/n \to 0$. Hence $a^{1/n} \to 1$.
- If $0 < a < 1$: $1/a > 1$ so $(1/a)^{1/n} \to 1$, hence $a^{1/n} \to 1$. $\blacksquare$

([[09-convergence-and-limits]])

---

## Part C: Monotonicity and Boundedness

### Problem C1
Let $a_1 = \sqrt{2}$ and $a_{n+1} = \sqrt{2 + a_n}$. Show $(a_n)$ converges, and find its limit.

**Solution.**

**Monotonic.** $a_2 = \sqrt{2 + \sqrt{2}} > \sqrt{2} = a_1$. Inductively, if $a_n > a_{n-1} > 0$, then $a_{n+1} = \sqrt{2 + a_n} > \sqrt{2 + a_{n-1}} = a_n$. So $(a_n)$ is strictly increasing.

**Bounded above.** $a_1 < 2$. If $a_n < 2$, then $a_{n+1} = \sqrt{2 + a_n} < \sqrt{4} = 2$. So $a_n < 2$ for all $n$.

By **Monotone Convergence Theorem**, $a_n \to L$ for some $L \leq 2$. Take limit in $a_{n+1}^2 = 2 + a_n$: $L^2 = 2 + L$, so $L^2 - L - 2 = 0$, i.e., $L = 2$ or $L = -1$. Since $a_n > 0$, $L = 2$. $\blacksquare$

([[08-sequences-introduction]])

---

### Problem C2
Let $a_1 = 1$ and $a_{n+1} = \frac{a_n + 3}{2}$. Show $(a_n)$ converges and find the limit.

**Solution.** $a_1 = 1 < 3$. If $a_n < 3$, then $a_{n+1} = (a_n + 3)/2 < 3$. So bounded above by 3.

$a_{n+1} - a_n = (a_n + 3)/2 - a_n = (3 - a_n)/2 > 0$ (since $a_n < 3$). Increasing.

By MCT, $a_n \to L$. Limit equation: $L = (L + 3)/2$, so $L = 3$. $\blacksquare$

([[08-sequences-introduction]])

---

### Problem C3
Show that a decreasing sequence bounded below converges (equivalent formulation of MCT).

**Solution.** Let $(a_n)$ be decreasing with $a_n \geq K$ for all $n$. Consider $(-a_n)$: increasing and bounded above by $-K$. By MCT, $-a_n \to M$, so $a_n \to -M$. $\blacksquare$

([[08-sequences-introduction]])

---

### Problem C4
Show that $(1 + 1/n)^n$ converges. (This defines $e$.)

**Solution.**

**Increasing.** By binomial theorem:
$$\left(1 + \frac{1}{n}\right)^n = \sum_{k=0}^n \binom{n}{k} \frac{1}{n^k} = \sum_{k=0}^n \frac{1}{k!} \cdot \frac{n!}{(n-k)! n^k} = \sum_{k=0}^n \frac{1}{k!} \prod_{j=0}^{k-1}\left(1 - \frac{j}{n}\right).$$

Each factor $(1 - j/n)$ increases with $n$, so the whole expression increases.

**Bounded above.** $\prod_{j=0}^{k-1}(1 - j/n) \leq 1$, so the sum is bounded by $\sum_{k=0}^\infty 1/k! \leq 1 + \sum_{k=1}^\infty 1/2^{k-1} = 3$.

By MCT, converges to some $e \in [2, 3]$. $\blacksquare$

([[08-sequences-introduction]], [[09-convergence-and-limits]])

---

## Part D: Subsequences and Bolzano-Weierstrass

### Problem D1
Prove: if $a_n \to a$, every subsequence $a_{n_k}$ also converges to $a$.

**Solution.** Given $\varepsilon > 0$, find $N$ with $n \geq N \Rightarrow |a_n - a| < \varepsilon$. Since $n_k \geq k$ (indices are strictly increasing), taking $k \geq N$ gives $n_k \geq N$, hence $|a_{n_k} - a| < \varepsilon$. $\blacksquare$

([[08-sequences-introduction]])

---

### Problem D2
Let $a_n = (-1)^n + 1/n$. Show $(a_n)$ has two subsequences converging to different limits.

**Solution.** Even $n$: $a_{2k} = 1 + 1/(2k) \to 1$. Odd $n$: $a_{2k+1} = -1 + 1/(2k+1) \to -1$. Two different limits, so $(a_n)$ itself diverges. $\blacksquare$

([[08-sequences-introduction]])

---

### Problem D3
Prove Bolzano-Weierstrass: every bounded sequence has a convergent subsequence.

**Solution.** Let $(a_n)$ be bounded, say $a_n \in [-M, M]$. 

**Step 1 (monotone subsequence theorem).** Every sequence has a monotonic subsequence. (Call $n$ a "peak" if $a_n \geq a_m$ for all $m > n$; consider whether there are finitely or infinitely many peaks.)

**Step 2.** A monotonic and bounded subsequence is convergent (by MCT). $\blacksquare$

**Alternative proof via bisection.** Split $[-M, M]$ into halves; one half has infinitely many terms. Repeat. Nested intervals of shrinking size give a unique point; a subsequence approaches it. ([[10-cauchy-sequences-completeness]])

---

### Problem D4
Suppose every subsequence of $(a_n)$ has a further subsequence converging to $a$. Show $a_n \to a$.

**Solution.** Suppose $a_n \not\to a$. Then some $\varepsilon > 0$ and a subsequence $a_{n_k}$ with $|a_{n_k} - a| \geq \varepsilon$. By hypothesis, $(a_{n_k})$ has a further subsequence $\to a$. But this contradicts $|a_{n_k} - a| \geq \varepsilon$. So $a_n \to a$. $\blacksquare$

([[08-sequences-introduction]])

---

## Part E: Cauchy Sequences and Completeness

### Problem E1
Prove directly from the definition: a convergent sequence is Cauchy.

**Solution.** Let $a_n \to a$. Given $\varepsilon > 0$, find $N$ with $n \geq N \Rightarrow |a_n - a| < \varepsilon/2$. For $m, n \geq N$:
$$|a_m - a_n| \leq |a_m - a| + |a - a_n| < \varepsilon/2 + \varepsilon/2 = \varepsilon. \ \blacksquare$$

([[10-cauchy-sequences-completeness]])

---

### Problem E2
Prove: every Cauchy sequence in $\mathbb{R}$ is bounded.

**Solution.** Take $\varepsilon = 1$. Find $N$ with $|a_m - a_n| < 1$ for $m, n \geq N$. In particular $|a_m - a_N| < 1$, so $|a_m| < |a_N| + 1$ for $m \geq N$. Let $M = \max(|a_1|, \ldots, |a_{N-1}|, |a_N| + 1)$. Then $|a_n| \leq M$ for all $n$. $\blacksquare$

([[10-cauchy-sequences-completeness]])

---

### Problem E3
Prove: a Cauchy sequence in $\mathbb{R}$ converges. (Completeness of $\mathbb{R}$.)

**Solution.** By Problem E2, Cauchy sequences are bounded. By Bolzano-Weierstrass, a subsequence $a_{n_k} \to a$. We show $a_n \to a$.

Given $\varepsilon > 0$, find $N_1$ so $m, n \geq N_1 \Rightarrow |a_m - a_n| < \varepsilon/2$ (Cauchy), and $K$ so $k \geq K \Rightarrow |a_{n_k} - a| < \varepsilon/2$. Pick $k \geq K$ with $n_k \geq N_1$. For $n \geq N_1$:
$$|a_n - a| \leq |a_n - a_{n_k}| + |a_{n_k} - a| < \varepsilon/2 + \varepsilon/2 = \varepsilon. \ \blacksquare$$

([[10-cauchy-sequences-completeness]])

---

### Problem E4
Give an example of a Cauchy sequence in $\mathbb{Q}$ that does **not** converge in $\mathbb{Q}$.

**Solution.** Consider the sequence $a_1 = 1$, $a_{n+1} = \frac{a_n}{2} + \frac{1}{a_n}$ (Newton's method for $\sqrt{2}$). In $\mathbb{R}$, $a_n \to \sqrt{2}$. The tail $(a_n)$ is Cauchy. But $\sqrt{2} \notin \mathbb{Q}$, so no limit in $\mathbb{Q}$. $\blacksquare$

This shows **$\mathbb{Q}$ is not complete**.

([[10-cauchy-sequences-completeness]])

---

## Part F: Mixed

### Problem F1 (Stolz-Cesàro test)
Let $(a_n)$ be any sequence and $(b_n)$ strictly increasing to $\infty$. Show: if $(a_{n+1} - a_n)/(b_{n+1} - b_n) \to L$, then $a_n/b_n \to L$.

**Solution sketch.** By telescoping:
$$\frac{a_n}{b_n} = \frac{a_N + \sum_{k=N}^{n-1}(a_{k+1} - a_k)}{b_n} = \frac{a_N - \frac{a_{k+1}-a_k}{b_{k+1}-b_k}(b_N - \text{noise})}{b_n} \to L.$$

Detailed proof mimics Cesàro's theorem; see [[10-cauchy-sequences-completeness]]. $\blacksquare$

---

### Problem F2 (Cesàro means)
Let $a_n \to a$. Show $\sigma_n = \frac{a_1 + a_2 + \cdots + a_n}{n} \to a$.

**Solution.** Given $\varepsilon > 0$, find $N$ with $n \geq N \Rightarrow |a_n - a| < \varepsilon/2$. For $n > N$:
$$|\sigma_n - a| = \left|\frac{(a_1 - a) + \cdots + (a_N - a)}{n} + \frac{(a_{N+1} - a) + \cdots + (a_n - a)}{n}\right|$$
$$\leq \frac{|(a_1 - a) + \cdots + (a_N - a)|}{n} + \frac{(n - N)(\varepsilon/2)}{n}.$$

First term $\to 0$ as $n \to \infty$ (fixed numerator). Second $\leq \varepsilon/2$. So for large $n$, $|\sigma_n - a| < \varepsilon$. $\blacksquare$

([[10-cauchy-sequences-completeness]])

---

### Problem F3
Let $a_n = \sum_{k=1}^n \frac{1}{k}$ (harmonic). Show $(a_n)$ is not Cauchy.

**Solution.** For any $N$, consider $n = 2N$: $a_{2N} - a_N = \sum_{k=N+1}^{2N} 1/k \geq N \cdot 1/(2N) = 1/2$. So $(a_n)$ fails the Cauchy criterion with $\varepsilon_0 = 1/2$. $\blacksquare$

Alternatively: $a_n \to \infty$, so divergent, hence not Cauchy.

([[10-cauchy-sequences-completeness]])

---

### Problem F4
Let $a_n$ be Cauchy and $b_n$ Cauchy in $\mathbb{R}$. Show $a_n b_n$ is Cauchy.

**Solution.** Both are bounded: $|a_n|, |b_n| \leq M$. For $m, n$:
$$|a_m b_m - a_n b_n| \leq |a_m b_m - a_m b_n| + |a_m b_n - a_n b_n| = |a_m||b_m - b_n| + |b_n||a_m - a_n| \leq M(|b_m - b_n| + |a_m - a_n|).$$

For $\varepsilon > 0$, find $N$ so both differences are $< \varepsilon/(2M)$. $\blacksquare$

([[10-cauchy-sequences-completeness]])

---

### Problem F5
Let $a_n \to a$ and $b_n \to b$ with $b \neq 0$ and $b_n \neq 0$ for all $n$. Show $a_n/b_n \to a/b$.

**Solution.** By the algebra-of-limits theorem ([[09-convergence-and-limits]] Theorem 9.5), this follows from $a_n \to a$, $b_n \to b \neq 0$. Explicitly:
$$\left|\frac{a_n}{b_n} - \frac{a}{b}\right| = \left|\frac{a_n b - a b_n}{b_n b}\right| = \frac{|a_n b - a b + a b - a b_n|}{|b_n b|} \leq \frac{|b||a_n - a| + |a||b - b_n|}{|b_n b|}.$$

Since $b_n \to b \neq 0$, $|b_n| \geq |b|/2$ eventually, so $|b_n b| \geq |b|^2/2$. Numerator $\to 0$, denominator bounded below by $|b|^2/2 > 0$. So the ratio $\to 0$. $\blacksquare$

---

## Summary

| Problem Topic | Key lesson | Core technique |
|---|---|---|
| A1-A4 | [[09-convergence-and-limits]] | ε-N definition, basic limit properties |
| B1-B4 | [[09-convergence-and-limits]] | Algebra of limits, standard limits |
| C1-C4 | [[08-sequences-introduction]] | MCT, recursive sequences |
| D1-D4 | [[08-sequences-introduction]] | Subsequences, Bolzano-Weierstrass |
| E1-E4 | [[10-cauchy-sequences-completeness]] | Cauchy criterion, completeness |
| F1-F5 | multiple | Cesaro, algebra, mixed applications |

---

## Related Topics

- [[08-sequences-introduction]] through [[10-cauchy-sequences-completeness]] — CO2 content
- [[12-infinite-series-introduction]] — next unit (CO3) uses these sequence foundations
