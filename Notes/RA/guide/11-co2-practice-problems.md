---
title: "CO2 Practice Problems: Sequences, Convergence, Cauchy Sequences, Completeness"
type: guide
co: CO2
related: [08-sequences-introduction, 09-convergence-and-limits, 10-cauchy-sequences-completeness, 12-infinite-series-introduction]
---

# 11. CO2 Practice Problems — Sequences, Convergence, Cauchy Sequences

These problems cover CO2 (Lessons 8-16). Each solution is written at qualifying-exam level, with full $\varepsilon$–$N$ arguments, explicit bounds, numbered proof steps, verification sanity checks, and interpretive remarks. Work through each part before reading the solution.

Topics covered:
- **Sequences**: boundedness, monotonicity, subsequences.
- **Convergence**: the $\varepsilon$–$N$ definition and limit theorems.
- **Cauchy sequences**: equivalence with convergence in $\mathbb{R}$.
- **Completeness**: the Monotone Convergence Theorem, Bolzano–Weierstrass, and the completeness of $\mathbb{R}$.

---

## Part A: Basic Convergence and $\varepsilon$–$N$

### Problem A1
Use the $\varepsilon$–$N$ definition to prove $\displaystyle\lim_{n \to \infty} \frac{n + 1}{n} = 1$.

**Solution.**

*Setup.* Write $a_n = (n+1)/n$. We must exhibit, for every $\varepsilon > 0$, an index $N = N(\varepsilon) \in \mathbb{N}$ such that
$$n \geq N \;\Longrightarrow\; |a_n - 1| < \varepsilon.$$

*Step 1 — Simplify the error expression.* For every $n \geq 1$,
$$|a_n - 1| \;=\; \left|\frac{n+1}{n} - 1\right| \;=\; \left|\frac{(n+1) - n}{n}\right| \;=\; \frac{1}{n}.$$
This is an **equality**, not a bound; no estimation has been used yet.

*Step 2 — Solve the target inequality.* We require $1/n < \varepsilon$, i.e. $n > 1/\varepsilon$. Since $\varepsilon > 0$ is fixed, $1/\varepsilon$ is a fixed positive real number.

*Step 3 — Choice of $N$.* By the **Archimedean property** of $\mathbb{R}$ ([[10-cauchy-sequences-completeness]] foundational fact, equivalent to completeness), for any real $r > 0$ there exists $N \in \mathbb{N}$ with $N > r$. Concretely, take
$$N \;=\; \left\lfloor \tfrac{1}{\varepsilon} \right\rfloor + 1.$$
Then $N > 1/\varepsilon$.

*Step 4 — Verification.* For $n \geq N$,
$$|a_n - 1| \;=\; \frac{1}{n} \;\leq\; \frac{1}{N} \;<\; \frac{1}{1/\varepsilon} \;=\; \varepsilon. \quad\checkmark$$

*Sanity check.* Pick $\varepsilon = 0.01$. Then $N = 101$. Check $n = 101$: $|a_{101} - 1| = 1/101 \approx 0.0099 < 0.01$. ✓

*Interpretation.* The proof is a template: for monotone sequences of the form "numerator $-$ denominator $=$ constant," the error collapses to $c/n$, and we bound via the Archimedean property. $\blacksquare$

([[09-convergence-and-limits]])

---

### Problem A2
Prove $\displaystyle\lim_{n \to \infty} \frac{2n + 3}{n + 1} = 2$.

**Solution.**

*Setup.* Let $a_n = (2n+3)/(n+1)$ and $L = 2$. We must find, for each $\varepsilon > 0$, a threshold $N$ such that $n \geq N \Rightarrow |a_n - 2| < \varepsilon$.

*Step 1 — Algebraic simplification of the error.* Compute
$$|a_n - 2| \;=\; \left|\frac{2n + 3}{n + 1} - 2\right| \;=\; \left|\frac{2n + 3 - 2(n+1)}{n+1}\right| \;=\; \left|\frac{2n + 3 - 2n - 2}{n+1}\right| \;=\; \frac{1}{n+1}.$$

*Step 2 — Target inequality.* We want $1/(n+1) < \varepsilon$, equivalently $n + 1 > 1/\varepsilon$, i.e. $n > 1/\varepsilon - 1$.

*Step 3 — Choice of $N$.* By Archimedes, pick
$$N \;=\; \max\!\left(1,\; \left\lfloor \tfrac{1}{\varepsilon} - 1 \right\rfloor + 1 \right).$$
(The $\max$ with $1$ ensures $N \geq 1$ in case $\varepsilon \geq 1$, where $1/\varepsilon - 1 \leq 0$.)

*Step 4 — Verification.* For $n \geq N$,
$$n + 1 \;\geq\; N + 1 \;>\; \tfrac{1}{\varepsilon},$$
hence
$$|a_n - 2| \;=\; \frac{1}{n+1} \;<\; \varepsilon. \quad\checkmark$$

*Sanity check.* For $\varepsilon = 0.1$: $N = \lfloor 9\rfloor + 1 = 10$. At $n = 10$, $|a_{10} - 2| = 1/11 \approx 0.0909 < 0.1$. ✓

*Interpretation.* Whenever $a_n - L$ reduces to $c/(\text{linear in } n)$, one gets a clean closed form for $N$. The lesson: always **simplify the error expression to an exact form before estimating**; estimating too early loses tightness. $\blacksquare$

([[09-convergence-and-limits]])

---

### Problem A3
Prove that if $a_n \to a$, then $|a_n| \to |a|$. Is the converse true?

**Solution.**

*Setup.* Assume $a_n \to a$ in $\mathbb{R}$. We must show $|a_n| \to |a|$.

*Step 1 — Reverse triangle inequality.* For any $x, y \in \mathbb{R}$,
$$\bigl||x| - |y|\bigr| \;\leq\; |x - y|.$$
*Proof of reverse triangle inequality (for completeness):* By the triangle inequality, $|x| = |(x - y) + y| \leq |x - y| + |y|$, so $|x| - |y| \leq |x - y|$. Symmetrically, $|y| - |x| \leq |y - x| = |x - y|$. Taking the larger of the two bounds yields the reverse triangle inequality.

*Step 2 — $\varepsilon$–$N$ argument.* Let $\varepsilon > 0$. Since $a_n \to a$, there exists $N \in \mathbb{N}$ with
$$n \geq N \;\Longrightarrow\; |a_n - a| < \varepsilon.$$
By Step 1,
$$\bigl||a_n| - |a|\bigr| \;\leq\; |a_n - a| \;<\; \varepsilon.$$
This is precisely the $\varepsilon$–$N$ statement that $|a_n| \to |a|$. ✓

*Step 3 — Converse false.* Let $a_n = (-1)^n$. Then $|a_n| = 1 \to 1$ (constant sequence). Yet the subsequences $a_{2k} = 1$ and $a_{2k+1} = -1$ converge to $1$ and $-1$ respectively, so $(a_n)$ diverges (Problem D1 contrapositive).

*Interpretation.* The map $x \mapsto |x|$ is 1-Lipschitz (the reverse triangle inequality is exactly the 1-Lipschitz bound), so it is continuous and preserves limits. But $|\cdot|$ is not injective (it collapses $\pm x$ to the same value), so the converse fails: convergence of $|a_n|$ loses sign information. $\blacksquare$

([[09-convergence-and-limits]])

---

### Problem A4
Let $a_n \to a$ and $a_n \geq 0$ for all $n$. Show $a \geq 0$.

**Solution.** We argue by **contradiction**.

*Step 1 — Setup.* Suppose for contradiction $a < 0$.

*Step 2 — Choose $\varepsilon$ that forces $a_n$ negative.* Since $a < 0$, $|a| = -a > 0$. Set
$$\varepsilon \;=\; \tfrac{|a|}{2} \;=\; \tfrac{-a}{2} \;>\; 0.$$

*Step 3 — Extract the contradiction.* Since $a_n \to a$, there exists $N$ with $n \geq N \Rightarrow |a_n - a| < \varepsilon$. Unpacking:
$$a - \varepsilon < a_n < a + \varepsilon \quad \text{for } n \geq N.$$
The **upper bound** is
$$a_n \;<\; a + \varepsilon \;=\; a - \tfrac{a}{2} \;=\; \tfrac{a}{2} \;<\; 0,$$
using $a < 0 \Rightarrow a/2 < 0$.

This contradicts the hypothesis $a_n \geq 0$. Hence $a \geq 0$. $\blacksquare$

*Sanity check.* The argument is sharp: taking $\varepsilon = |a|$ wouldn't force $a_n < 0$, but $\varepsilon = |a|/2$ does. Strict inequality is lost in the limit.

*Remark (strict inequality).* The conclusion $a > 0$ fails in general: $a_n = 1/n > 0$ yet $a_n \to 0$ and $0 \not> 0$. So **weak inequalities pass to the limit, strict ones do not**. This is a recurring subtlety in analysis. $\blacksquare$

([[09-convergence-and-limits]])

---

## Part B: Algebraic and Standard Limits

### Problem B1
Compute $\displaystyle\lim_{n \to \infty} \frac{3n^2 + 2n - 1}{n^2 + 5}$.

**Solution.**

*Strategy.* For a rational expression in $n$, divide numerator and denominator by the highest power of $n$ appearing, then use the **Algebra of Limits** ([[09-convergence-and-limits]] Theorem 9.5): if $a_n \to a$, $b_n \to b$, then $a_n + b_n \to a + b$, $a_n b_n \to ab$, and if $b \neq 0$, $a_n/b_n \to a/b$.

*Step 1 — Divide by $n^2$.* For all $n \geq 1$,
$$\frac{3n^2 + 2n - 1}{n^2 + 5} \;=\; \frac{(3n^2 + 2n - 1)/n^2}{(n^2 + 5)/n^2} \;=\; \frac{3 + 2/n - 1/n^2}{1 + 5/n^2}.$$

*Step 2 — Identify building-block limits.*
- $1/n \to 0$ (Problem A1 with shifted $N$).
- $1/n^2 \to 0$ (use $1/n^2 \leq 1/n$ for $n \geq 1$, or direct $\varepsilon$–$N$: take $N = \lceil 1/\sqrt{\varepsilon}\rceil$).
- Constants $3$ and $1$ are trivially convergent to themselves.

*Step 3 — Apply algebra of limits.*
Numerator: $3 + 2 \cdot (1/n) - (1/n^2) \to 3 + 2 \cdot 0 - 0 = 3$.
Denominator: $1 + 5 \cdot (1/n^2) \to 1 + 5 \cdot 0 = 1 \neq 0$.

Since the denominator's limit $1 \neq 0$, the quotient rule applies:
$$\lim_{n \to \infty} \frac{3 + 2/n - 1/n^2}{1 + 5/n^2} \;=\; \frac{3}{1} \;=\; 3. \qquad \boxed{3}$$

*Verification.* Try $n = 10$: $(300 + 20 - 1)/(100 + 5) = 319/105 \approx 3.038$. Try $n = 100$: $(30000 + 200 - 1)/(10005) = 30199/10005 \approx 3.018$. Approaching $3$ from above ✓.

*Interpretation.* The **degree** of the rational expression (ratio of leading coefficients) dictates the limit. Dividing by $n^2$ reveals that the lower-order corrections vanish, leaving only the leading ratio $3/1$. $\blacksquare$

([[09-convergence-and-limits]])

---

### Problem B2
Prove $\displaystyle\lim_{n \to \infty} n^{1/n} = 1$.

**Solution.**

*Strategy.* The sequence $a_n = n^{1/n}$ is $\geq 1$ for $n \geq 1$. Write $a_n = 1 + b_n$ with $b_n \geq 0$ and bound $b_n$ using the binomial theorem.

*Step 1 — Write $a_n = 1 + b_n$ with $b_n \geq 0$.* For $n \geq 1$, $n^{1/n} \geq 1$ (since $n \geq 1$). Define $b_n = n^{1/n} - 1 \geq 0$. For $n = 1$, $b_1 = 0$. For $n \geq 2$, $b_n > 0$ since $n^{1/n} > 1$.

*Step 2 — Binomial expansion.* By the binomial theorem, for $n \geq 2$,
$$n \;=\; a_n^n \;=\; (1 + b_n)^n \;=\; \sum_{k=0}^n \binom{n}{k} b_n^k.$$
All terms are $\geq 0$. Keep only the $k = 2$ term:
$$n \;\geq\; \binom{n}{2} b_n^2 \;=\; \frac{n(n-1)}{2} b_n^2.$$

*Step 3 — Solve for $b_n$.* Divide by $n(n-1)/2$ (positive for $n \geq 2$):
$$b_n^2 \;\leq\; \frac{2n}{n(n-1)} \;=\; \frac{2}{n-1}.$$
Hence
$$0 \;\leq\; b_n \;\leq\; \sqrt{\frac{2}{n-1}}.$$

*Step 4 — Apply Squeeze Theorem.* The right-hand side $\sqrt{2/(n-1)} \to 0$ (given $\varepsilon > 0$, need $2/(n-1) < \varepsilon^2$, i.e. $n > 1 + 2/\varepsilon^2$). Thus $b_n \to 0$ by the **Squeeze Theorem** ([[09-convergence-and-limits]]): $0 \leq b_n \leq c_n$ with $c_n \to 0$ implies $b_n \to 0$.

*Step 5 — Conclude.* $a_n = 1 + b_n \to 1 + 0 = 1$. $\blacksquare$

*Sanity check.* $n = 100$: $100^{1/100} = e^{\ln 100/100} = e^{0.04605} \approx 1.0471$. Our bound predicts $b_n \leq \sqrt{2/99} \approx 0.1421$, consistent with the true $b_{100} \approx 0.0471$. ✓

*Interpretation.* The trick "write near-$1$ quantities as $1 + b_n$ and extract the lowest-order binomial term" is a standard graduate-exam technique. Picking the $k=2$ term (rather than $k=1$) gives a quadratic bound on $b_n$, which is tight enough. $\blacksquare$

([[09-convergence-and-limits]])

---

### Problem B3
Prove $\displaystyle\lim_{n \to \infty} \frac{x^n}{n!} = 0$ for every $x \in \mathbb{R}$.

**Solution.**

*Strategy.* For large $n$, each factor $|x|/k$ in the product expansion of $|x|^n/n!$ becomes $\leq 1/2$, so the tail decays geometrically.

*Step 1 — Reduce to $|x|^n/n!$.* Since $|x^n/n!| = |x|^n/n!$ and we want to show this $\to 0$, it suffices (by the Squeeze Theorem and the fact $|x^n/n!| \to 0 \iff x^n/n! \to 0$ from Problem A3) to prove the claim for $|x|$ in place of $x$. WLOG $x \geq 0$.

If $x = 0$ the sequence is identically $0$ for $n \geq 1$, done. Assume $x > 0$.

*Step 2 — Pick $N$ so $N+1 > 2x$.* By Archimedes, choose a fixed integer $N$ with
$$N \;\geq\; \lceil 2x \rceil.$$
Then for all $k \geq N + 1$, $k > 2x$, equivalently $x/k < 1/2$.

*Step 3 — Factor the $n$-th term.* For $n > N$,
$$\frac{x^n}{n!} \;=\; \underbrace{\frac{x^N}{N!}}_{=: C} \cdot \underbrace{\frac{x}{N+1} \cdot \frac{x}{N+2} \cdots \frac{x}{n}}_{n - N \text{ factors, each } < 1/2}.$$
The prefactor $C = x^N/N!$ is a **constant** (depends on $x$ but not on $n$).

*Step 4 — Geometric bound.* Each of the $n - N$ factors in the second product is $< 1/2$, so
$$\frac{x^n}{n!} \;<\; C \cdot \left(\frac{1}{2}\right)^{n - N} \;=\; C \cdot 2^N \cdot \frac{1}{2^n}.$$

Denote $C' = C \cdot 2^N$, a constant.

*Step 5 — Apply Squeeze Theorem.* $0 \leq x^n/n! \leq C'/2^n$. Since $C'/2^n \to 0$ (geometric), conclude $x^n/n! \to 0$. $\blacksquare$

*Verification of $C'/2^n \to 0$.* Given $\delta > 0$, need $C'/2^n < \delta$, i.e. $2^n > C'/\delta$, i.e. $n > \log_2(C'/\delta)$. Archimedean ✓.

*Interpretation.* The key insight is that factorials **grow faster than any fixed exponential**. The proof makes this precise by exhibiting, after a fixed "burn-in" of $N$ terms, a geometric rate of decay. This technique generalises: to show $f(n)/g(n) \to 0$ when $g$ grows "much faster," factor out an initial product that's manifestly bounded, then exhibit geometric decay on the tail. $\blacksquare$

([[09-convergence-and-limits]])

---

### Problem B4
Let $a > 0$. Show $\displaystyle\lim_{n \to \infty} a^{1/n} = 1$.

**Solution.**

*Strategy.* Handle $a \geq 1$ by the "write as $1 + c_n$" trick (like Problem B2), then reduce $0 < a < 1$ to the previous case by taking reciprocals.

**Case 1: $a \geq 1$.**

*Step 1 — Set $c_n = a^{1/n} - 1$.* Since $a \geq 1$, $a^{1/n} \geq 1$, so $c_n \geq 0$.

*Step 2 — Bernoulli's inequality.* For real $c_n \geq 0$ and $n \geq 1$,
$$(1 + c_n)^n \;\geq\; 1 + n c_n.$$
*Proof of Bernoulli for $c \geq 0$ (induction).* Base $n = 1$: equality. Step: $(1+c)^{n+1} = (1+c)^n(1+c) \geq (1 + nc)(1+c) = 1 + (n+1)c + nc^2 \geq 1 + (n+1)c$ since $nc^2 \geq 0$.

*Step 3 — Derive bound on $c_n$.* Raising both sides of $a^{1/n} = 1 + c_n$ to the $n$th power:
$$a \;=\; (1 + c_n)^n \;\geq\; 1 + n c_n.$$
Hence
$$c_n \;\leq\; \frac{a - 1}{n}.$$

*Step 4 — Squeeze.* $0 \leq c_n \leq (a-1)/n$, and $(a-1)/n \to 0$ (constant divided by $n$). By the Squeeze Theorem, $c_n \to 0$, so $a^{1/n} = 1 + c_n \to 1$.

**Case 2: $0 < a < 1$.**

*Step 5 — Take reciprocals.* Let $b = 1/a > 1$. By Case 1, $b^{1/n} \to 1$.

*Step 6 — Apply the quotient rule.*
$$a^{1/n} \;=\; \frac{1}{b^{1/n}}.$$
By the algebra of limits ($b^{1/n} \to 1 \neq 0$),
$$a^{1/n} \;\to\; \frac{1}{1} \;=\; 1. \qquad \blacksquare$$

**Case 3: $a = 1$.** Trivially $1^{1/n} = 1 \to 1$.

*Sanity check.* $a = 2$, $n = 10$: $2^{0.1} \approx 1.0718$, bound says $c_{10} \leq 1/10 = 0.1$. ✓

*Interpretation.* Bernoulli's inequality is the cornerstone for controlling $(1 + c)^n$ when $c \geq 0$. The reciprocal trick reduces the $a < 1$ case to $a > 1$: whenever a statement concerns $a^{1/n}$ with $a > 0$, reducing to $a \geq 1$ loses no generality. $\blacksquare$

([[09-convergence-and-limits]])

---

## Part C: Monotonicity and Boundedness

### Problem C1
Let $a_1 = \sqrt{2}$ and $a_{n+1} = \sqrt{2 + a_n}$. Show $(a_n)$ converges and find its limit.

**Solution.**

*Strategy for recursive sequences.* Three standard steps: (i) show monotonicity by induction; (ii) show boundedness by induction; (iii) apply the **Monotone Convergence Theorem** (MCT); (iv) substitute into the recursion to find the limit.

**Step 1 — Strict monotonicity: $a_n$ is strictly increasing.**

*Base case.* $a_1 = \sqrt{2} \approx 1.4142$, $a_2 = \sqrt{2 + \sqrt{2}} \approx 1.8478$. So $a_2 > a_1$ numerically. Formally, $a_2^2 = 2 + \sqrt{2} > 2 = a_1^2$, and both are positive, so $a_2 > a_1$. ✓

*Inductive step.* Assume $a_n > a_{n-1} > 0$ (well-defined by induction: all $a_n > 0$). Then
$$a_{n+1}^2 \;=\; 2 + a_n \;>\; 2 + a_{n-1} \;=\; a_n^2.$$
Since $a_{n+1}, a_n > 0$, square-root preserves inequality: $a_{n+1} > a_n$.

By induction, $a_{n+1} > a_n$ for all $n \geq 1$.

**Step 2 — Upper bound: $a_n < 2$ for all $n$.**

*Base case.* $a_1 = \sqrt{2} < 2$. ✓

*Inductive step.* Assume $a_n < 2$. Then
$$a_{n+1} \;=\; \sqrt{2 + a_n} \;<\; \sqrt{2 + 2} \;=\; \sqrt{4} \;=\; 2.$$
By induction, $a_n < 2$ for all $n$.

**Step 3 — Apply MCT.** $(a_n)$ is monotonically increasing and bounded above (by $2$). By the **Monotone Convergence Theorem** ([[08-sequences-introduction]], [[10-cauchy-sequences-completeness]]), $(a_n)$ converges: there exists $L \in \mathbb{R}$ with $a_n \to L$, and $L = \sup_n a_n \leq 2$. Also, since $a_n \geq a_1 = \sqrt{2} > 0$, Problem A4 gives $L \geq \sqrt{2} > 0$.

**Step 4 — Determine $L$ from the recursion.** Pass to the limit in $a_{n+1}^2 = 2 + a_n$:
- LHS: $a_{n+1}^2 \to L^2$ by the product rule.
- RHS: $2 + a_n \to 2 + L$.

So $L^2 = 2 + L$, i.e. $L^2 - L - 2 = 0$. Factor: $(L - 2)(L + 1) = 0$. Roots: $L = 2$ or $L = -1$.

Since $L > 0$, $L = 2$. $\boxed{L = 2}$. $\blacksquare$

*Sanity check.* The first few terms: $\sqrt{2} \approx 1.414$, $\sqrt{2 + 1.414} \approx 1.848$, $\sqrt{2 + 1.848} \approx 1.962$, $\sqrt{2 + 1.962} \approx 1.990$. Approaching $2$. ✓

*Interpretation.* MCT is the workhorse for recursive sequences. The limit is always a **fixed point** of the iteration map $T(x) = \sqrt{2 + x}$: solving $T(L) = L$ gives the candidates. Starting below the fixed point and increasing confirms convergence to it (rather than to some other fixed point).

*Remark.* The quantity $L = 2$ equals $2\cos(\pi/2^\infty) \cdot \ldots$; more generally $\sqrt{2 + \sqrt{2 + \sqrt{2 + \cdots}}}$ is a classic nested-radical identity. $\blacksquare$

([[08-sequences-introduction]])

---

### Problem C2
Let $a_1 = 1$ and $a_{n+1} = \dfrac{a_n + 3}{2}$. Show $(a_n)$ converges and find its limit.

**Solution.**

**Step 1 — Upper bound $a_n < 3$.**

*Base.* $a_1 = 1 < 3$. ✓

*Step.* Assume $a_n < 3$. Then
$$a_{n+1} \;=\; \frac{a_n + 3}{2} \;<\; \frac{3 + 3}{2} \;=\; 3. \quad\checkmark$$

By induction, $a_n < 3$ for all $n$.

**Step 2 — Strict monotonicity: $a_n$ is increasing.**

Compute the difference:
$$a_{n+1} - a_n \;=\; \frac{a_n + 3}{2} - a_n \;=\; \frac{a_n + 3 - 2a_n}{2} \;=\; \frac{3 - a_n}{2}.$$
By Step 1, $3 - a_n > 0$, so $a_{n+1} - a_n > 0$. Hence $(a_n)$ is strictly increasing.

**Step 3 — MCT.** $(a_n)$ is increasing and bounded above by $3$; by MCT, $a_n \to L$ for some $L \in \mathbb{R}$ with $L \leq 3$.

**Step 4 — Solve the fixed-point equation.** Pass to the limit in $a_{n+1} = (a_n + 3)/2$. LHS $\to L$, RHS $\to (L+3)/2$, so
$$L \;=\; \frac{L + 3}{2} \;\Longleftrightarrow\; 2L = L + 3 \;\Longleftrightarrow\; L = 3. \qquad \boxed{L = 3}$$

*Sanity check.* $a_1 = 1$, $a_2 = 2$, $a_3 = 2.5$, $a_4 = 2.75$, $a_5 = 2.875$. Distances from $3$: $2, 1, 0.5, 0.25, 0.125$ — halving each step, confirming linear convergence at rate $1/2$ (consistent with the map $T(x) = (x + 3)/2$ having derivative $1/2$ at the fixed point). ✓

*Interpretation.* The iteration $a_{n+1} = (a_n + 3)/2$ is an **affine contraction** $T(x) = x/2 + 3/2$ with contraction factor $1/2 < 1$ and unique fixed point $3$. Whatever the initial condition, $(a_n) \to 3$ exponentially — indeed $|a_n - 3| = (1/2)^{n-1} \cdot |a_1 - 3| = 2 \cdot (1/2)^{n-1}$. $\blacksquare$

([[08-sequences-introduction]])

---

### Problem C3
Show that every decreasing sequence bounded below converges. (This is the "dual" form of MCT.)

**Solution.**

*Strategy.* Reduce to the standard MCT (increasing + bounded above $\Rightarrow$ convergent) by negation.

*Step 1 — Define the reflected sequence.* Let $(a_n)$ be decreasing (i.e. $a_{n+1} \leq a_n$ for all $n$) and bounded below (say $a_n \geq K$). Set $b_n = -a_n$.

*Step 2 — $b_n$ is increasing and bounded above.*
- Increasing: $b_{n+1} - b_n = -a_{n+1} + a_n = a_n - a_{n+1} \geq 0$. ✓
- Bounded above: $b_n = -a_n \leq -K$. ✓

*Step 3 — Apply MCT.* By the standard MCT, $b_n \to M$ for some $M \in \mathbb{R}$ with $M \leq -K$.

*Step 4 — Translate back to $a_n$.* By the limit rule $a_n \to a \Rightarrow -a_n \to -a$ (from algebra of limits with the constant sequence $-1$), $a_n = -b_n \to -M$.

Hence $(a_n)$ converges to $L = -M$, which satisfies $L \geq K$. $\blacksquare$

*Interpretation.* The trick is that the real line is **symmetric under $x \mapsto -x$**, reversing order. Any theorem phrased for increasing sequences immediately yields a parallel theorem for decreasing sequences. This is the standard "reflection principle" for ordered structures. $\blacksquare$

([[08-sequences-introduction]])

---

### Problem C4
Show that $\left(1 + \dfrac{1}{n}\right)^n$ converges. (This defines $e$.)

**Solution.**

*Strategy.* Expand by the binomial theorem; show the expansion is a term-by-term increasing function of $n$ and bounded above by a convergent series.

**Step 1 — Binomial expansion.** For $n \geq 1$,
$$\left(1 + \frac{1}{n}\right)^n \;=\; \sum_{k=0}^n \binom{n}{k} \frac{1}{n^k} \;=\; \sum_{k=0}^n \frac{n!}{k!(n-k)!} \cdot \frac{1}{n^k} \;=\; \sum_{k=0}^n \frac{1}{k!} \cdot \frac{n(n-1)\cdots(n-k+1)}{n^k}.$$

**Step 2 — Rewrite each term.** For each $k \geq 1$,
$$\frac{n(n-1)\cdots(n-k+1)}{n^k} \;=\; \prod_{j=0}^{k-1} \frac{n - j}{n} \;=\; \prod_{j=0}^{k-1}\left(1 - \frac{j}{n}\right).$$

So
$$\left(1 + \frac{1}{n}\right)^n \;=\; \sum_{k=0}^n \frac{1}{k!} \prod_{j=0}^{k-1}\left(1 - \frac{j}{n}\right).$$

**Step 3 — Monotonicity.** Each factor $(1 - j/n)$ is **strictly increasing in $n$** (for fixed $j \geq 1$): if $n' > n$ and $j \geq 1$, $j/n' < j/n$, so $1 - j/n' > 1 - j/n > 0$ (for $n > j$). Hence each term $\frac{1}{k!}\prod_{j=0}^{k-1}(1 - j/n)$ of the sum is increasing in $n$, and when passing from $n$ to $n+1$ we gain an additional term (the $k = n+1$ term, which is positive). Therefore the whole expression is increasing in $n$:
$$\left(1 + \frac{1}{n}\right)^n \;<\; \left(1 + \frac{1}{n+1}\right)^{n+1}.$$

**Step 4 — Upper bound.** Each factor $(1 - j/n) \leq 1$, so
$$\left(1 + \frac{1}{n}\right)^n \;\leq\; \sum_{k=0}^n \frac{1}{k!}.$$

Now bound $\sum_{k=0}^n 1/k!$. For $k \geq 1$, use $k! \geq 2^{k-1}$ (proof: $1! = 1 = 2^0$; $(k+1)! = (k+1) \cdot k! \geq 2 \cdot 2^{k-1} = 2^k$ for $k \geq 1$). So
$$\sum_{k=0}^n \frac{1}{k!} \;=\; 1 + \sum_{k=1}^n \frac{1}{k!} \;\leq\; 1 + \sum_{k=1}^n \frac{1}{2^{k-1}} \;\leq\; 1 + \sum_{k=0}^\infty \frac{1}{2^k} \;=\; 1 + 2 \;=\; 3.$$

**Step 5 — Apply MCT.** $(1 + 1/n)^n$ is increasing (Step 3) and bounded above by $3$ (Step 4). By MCT, it converges to some limit $e \in [2, 3]$. (Lower bound $2$: $(1 + 1/1)^1 = 2$, and the sequence is increasing.)

Define $\boxed{e := \displaystyle\lim_{n \to \infty}(1 + 1/n)^n \in [2, 3]}$.

*Sanity check.* $n = 1000$: $(1.001)^{1000} \approx 2.7169$, consistent with $e \approx 2.71828$. ✓

*Interpretation.* This is the most famous constructive definition of $e$. The limit is a supremum (by MCT), and the series-limit connection is: $(1 + 1/n)^n \to \sum_{k=0}^\infty 1/k!$ (the exponential series at $1$), justified rigorously by a double-limit / uniform-convergence argument (beyond the scope here). $\blacksquare$

([[08-sequences-introduction]], [[09-convergence-and-limits]])

---

## Part D: Subsequences and Bolzano–Weierstrass

### Problem D1
Prove: if $a_n \to a$, every subsequence $(a_{n_k})$ also converges to $a$.

**Solution.**

*Setup.* Let $a_n \to a$ and $(n_k)_{k=1}^\infty$ be a strictly increasing sequence of positive integers (defining a subsequence).

*Step 1 — Key inequality on $n_k$.* Strictly increasing $n_1 < n_2 < \cdots$ with $n_k \in \mathbb{N}$ forces
$$n_k \;\geq\; k \quad \text{for all } k \geq 1.$$
(Proof by induction: $n_1 \geq 1$; assume $n_k \geq k$. Then $n_{k+1} > n_k \geq k$, and since $n_{k+1} \in \mathbb{N}$, $n_{k+1} \geq k + 1$.)

*Step 2 — $\varepsilon$–$N$ for $(a_n)$.* Let $\varepsilon > 0$. Since $a_n \to a$, there exists $N \in \mathbb{N}$ such that
$$n \geq N \;\Longrightarrow\; |a_n - a| < \varepsilon.$$

*Step 3 — $\varepsilon$–$K$ for $(a_{n_k})$.* Choose $K = N$. Then for $k \geq K = N$, by Step 1, $n_k \geq k \geq N$, hence
$$|a_{n_k} - a| \;<\; \varepsilon.$$

This is the $\varepsilon$–$K$ condition for $a_{n_k} \to a$. $\blacksquare$

*Interpretation.* Subsequences inherit convergence because the subsequence indices grow at least as fast as the natural numbers. **Contrapositive (useful!)**: if two subsequences converge to different limits, the sequence itself cannot converge. This is the basis for showing divergence in Problem D2. $\blacksquare$

([[08-sequences-introduction]])

---

### Problem D2
Let $a_n = (-1)^n + 1/n$. Show $(a_n)$ has two subsequences converging to different limits, and conclude $(a_n)$ diverges.

**Solution.**

*Step 1 — Even subsequence.* Take $n_k = 2k$. Then
$$a_{2k} \;=\; (-1)^{2k} + \frac{1}{2k} \;=\; 1 + \frac{1}{2k}.$$
As $k \to \infty$, $1/(2k) \to 0$, so $a_{2k} \to 1$.

*Step 2 — Odd subsequence.* Take $n_k = 2k + 1$. Then
$$a_{2k+1} \;=\; (-1)^{2k+1} + \frac{1}{2k+1} \;=\; -1 + \frac{1}{2k+1}.$$
As $k \to \infty$, $a_{2k+1} \to -1$.

*Step 3 — Conclude divergence.* If $(a_n)$ converged to some $L$, by the **contrapositive of Problem D1**, every subsequence would converge to $L$. But we have two subsequences with limits $1$ and $-1$ respectively, and $1 \neq -1$. Contradiction.

Hence $(a_n)$ diverges. $\blacksquare$

*Sanity check.* Numerically: $a_1 = -1 + 1 = 0$, $a_2 = 1 + 0.5 = 1.5$, $a_3 = -1 + 0.333 \approx -0.667$, $a_4 = 1.25$, $a_5 \approx -0.8$. Oscillating between values near $\pm 1$, confirming divergence. ✓

*Interpretation.* "Two subsequences, two different limits ⇒ diverges" is the standard divergence test. $\blacksquare$

([[08-sequences-introduction]])

---

### Problem D3
Prove **Bolzano–Weierstrass**: every bounded sequence in $\mathbb{R}$ has a convergent subsequence.

**Solution.** We present **two proofs**. The first uses the Monotone Subsequence Theorem; the second uses bisection (nested intervals).

### Proof 1 — via Monotone Subsequence Theorem

*Step 1 — Statement of MST.* **Every sequence in $\mathbb{R}$ has a monotone subsequence.**

*Proof of MST.* Call $n$ a **peak** of $(a_n)$ if $a_n \geq a_m$ for every $m > n$. Two cases:

  *Case A: Infinitely many peaks.* List the peaks in increasing order as $n_1 < n_2 < \cdots$. For each $k \geq 1$, $n_k$ is a peak, so $a_{n_k} \geq a_{n_{k+1}}$ (since $n_{k+1} > n_k$). Hence $(a_{n_k})$ is **monotonically decreasing** (weakly).

  *Case B: Finitely many peaks.* Let $N$ be greater than the index of all peaks. Then every $n \geq N$ is **not** a peak, i.e. for each $n \geq N$ there exists $m > n$ with $a_m > a_n$. Construct $(n_k)$ recursively: $n_1 = N$; having chosen $n_k \geq N$, pick any $n_{k+1} > n_k$ with $a_{n_{k+1}} > a_{n_k}$ (exists since $n_k$ is not a peak). Then $(a_{n_k})$ is **strictly increasing**. $\square$

*Step 2 — Apply MST + bounded hypothesis.* Let $(a_n)$ be bounded: $|a_n| \leq M$ for all $n$. By MST, extract a monotone subsequence $(a_{n_k})$. Since $(a_n)$ is bounded, so is $(a_{n_k})$.

*Step 3 — Apply MCT.* A monotone **bounded** sequence converges (MCT). So $a_{n_k} \to L$ for some $L \in \mathbb{R}$, $|L| \leq M$. $\blacksquare$

### Proof 2 — via Bisection (nested intervals)

*Step 1 — Initial interval.* $(a_n)$ bounded means $a_n \in [-M, M] =: I_0$ for all $n$. Let $S_0 = \mathbb{N}$ (all indices).

*Step 2 — Recursive halving.* Split $I_k = [c, d]$ into left half $[c, (c+d)/2]$ and right half $[(c+d)/2, d]$. At least **one** half contains $a_n$ for infinitely many $n \in S_k$ (because $S_k$ is infinite, and two halves cover $I_k$). Pick such a half and call it $I_{k+1}$; let $S_{k+1} \subseteq S_k$ be the (infinite) set of indices $n$ with $a_n \in I_{k+1}$.

*Step 3 — Diameter halves.* $|I_{k+1}| = |I_k|/2$, so $|I_k| = 2M/2^k \to 0$.

*Step 4 — Nested Intervals Theorem.* The intervals $I_0 \supseteq I_1 \supseteq \cdots$ are closed, bounded, and nonempty with $|I_k| \to 0$. By the **Nested Intervals Theorem** (equivalent to completeness of $\mathbb{R}$), $\bigcap_{k \geq 0} I_k = \{L\}$ for a unique $L \in \mathbb{R}$.

*Step 5 — Build the subsequence.* Recursively choose $n_1 \in S_1$, then $n_2 \in S_2$ with $n_2 > n_1$ (possible since $S_2$ is infinite), etc. This gives $n_1 < n_2 < \cdots$ with $a_{n_k} \in I_k$ for each $k$.

*Step 6 — Convergence to $L$.* Both $a_{n_k}$ and $L$ lie in $I_k$, so $|a_{n_k} - L| \leq |I_k| = 2M/2^k \to 0$. Hence $a_{n_k} \to L$. $\blacksquare$

*Interpretation.* Bolzano–Weierstrass is **equivalent** to the completeness of $\mathbb{R}$ (and to MCT, to the Nested Interval property, to the LUB axiom). Proof 1 is elegant and combinatorial; Proof 2 is explicit and generalises to higher dimensions and to compact metric spaces. Both are essential graduate-exam tools. $\blacksquare$

([[10-cauchy-sequences-completeness]])

---

### Problem D4
Suppose every subsequence of $(a_n)$ has a further subsequence converging to $a$. Show $a_n \to a$.

**Solution.**

*Strategy.* Contrapositive: assume $a_n \not\to a$, derive a contradiction.

*Step 1 — Negate convergence.* $a_n \not\to a$ means: there exists $\varepsilon_0 > 0$ such that for every $N \in \mathbb{N}$, some $n \geq N$ satisfies $|a_n - a| \geq \varepsilon_0$.

*Step 2 — Extract a "bad" subsequence.* Construct $(a_{n_k})$ recursively. Set $n_1$ to be any index $n \geq 1$ with $|a_n - a| \geq \varepsilon_0$. Having chosen $n_1 < \cdots < n_k$, take $n_{k+1}$ to be any index $> n_k$ with $|a_{n_{k+1}} - a| \geq \varepsilon_0$ (exists by Step 1 applied to $N = n_k + 1$). Then $(a_{n_k})$ is a subsequence satisfying
$$|a_{n_k} - a| \;\geq\; \varepsilon_0 \quad\text{for all } k.$$

*Step 3 — Apply the hypothesis.* By assumption, every subsequence has a further subsequence convergent to $a$. In particular, $(a_{n_k})$ has a subsequence $(a_{n_{k_j}})$ with $a_{n_{k_j}} \to a$.

*Step 4 — Derive contradiction.* For $j$ large enough, $|a_{n_{k_j}} - a| < \varepsilon_0/2 < \varepsilon_0$. But by Step 2, $|a_{n_{k_j}} - a| \geq \varepsilon_0$ (any sub-subsequence of $(a_{n_k})$ inherits the bound). Contradiction.

Hence $a_n \to a$. $\blacksquare$

*Interpretation.* This is a **convergence-lifting lemma**: local convergence of sub-subsequences implies global convergence. It is used constantly in topology and measure theory. A key takeaway: to prove $a_n \to a$, it often suffices to show every subsequence has a further subsequence converging to $a$ — a strategy that lets one **extract Bolzano–Weierstrass** twice or apply compactness. $\blacksquare$

([[08-sequences-introduction]])

---

## Part E: Cauchy Sequences and Completeness

### Problem E1
Prove directly from the definition: a convergent sequence is Cauchy.

**Solution.**

*Setup.* Assume $a_n \to a$. We must show: for every $\varepsilon > 0$, there exists $N$ such that $m, n \geq N \Rightarrow |a_m - a_n| < \varepsilon$.

*Step 1 — $\varepsilon$/$2$ splitting.* Let $\varepsilon > 0$. Since $a_n \to a$, there exists $N$ with
$$n \geq N \;\Longrightarrow\; |a_n - a| \;<\; \frac{\varepsilon}{2}.$$

*Step 2 — Triangle inequality.* For $m, n \geq N$,
$$|a_m - a_n| \;=\; |(a_m - a) + (a - a_n)| \;\leq\; |a_m - a| + |a - a_n| \;<\; \frac{\varepsilon}{2} + \frac{\varepsilon}{2} \;=\; \varepsilon. \quad\checkmark$$

So $(a_n)$ is Cauchy. $\blacksquare$

*Interpretation.* The "$\varepsilon/2$ trick" is the most ubiquitous device in analysis. We bound $\varepsilon$ by splitting it into two halves to absorb two separate error contributions. This technique generalises: to bound a sum of $k$ error terms, split $\varepsilon$ into $k$ equal parts. $\blacksquare$

([[10-cauchy-sequences-completeness]])

---

### Problem E2
Prove: every Cauchy sequence in $\mathbb{R}$ is bounded.

**Solution.**

*Step 1 — Fix a specific $\varepsilon$.* Let $(a_n)$ be Cauchy. Apply the Cauchy property with $\varepsilon = 1$: there exists $N$ such that
$$m, n \geq N \;\Longrightarrow\; |a_m - a_n| < 1.$$

*Step 2 — Bound the tail $a_m$ for $m \geq N$.* Fix $n = N$. Then for all $m \geq N$, $|a_m - a_N| < 1$, i.e.
$$a_N - 1 \;<\; a_m \;<\; a_N + 1,$$
hence
$$|a_m| \;\leq\; |a_N| + 1 \quad\text{for } m \geq N.$$
(This uses the reverse triangle inequality $|a_m| - |a_N| \leq |a_m - a_N| < 1$.)

*Step 3 — Bound the initial segment.* The finite set $\{|a_1|, |a_2|, \ldots, |a_{N-1}|\}$ has a maximum:
$$M_0 \;:=\; \max(|a_1|, |a_2|, \ldots, |a_{N-1}|).$$
(If $N = 1$ there is no initial segment; set $M_0 = 0$.)

*Step 4 — Combine.* Let $M = \max(M_0, |a_N| + 1)$. Then for every $n \in \mathbb{N}$:
- If $n < N$: $|a_n| \leq M_0 \leq M$.
- If $n \geq N$: $|a_n| \leq |a_N| + 1 \leq M$.

So $|a_n| \leq M$ for all $n$, i.e. $(a_n)$ is bounded. $\blacksquare$

*Verification.* Every convergent sequence is Cauchy (E1) and is also bounded (easy exercise). E2 extends boundedness to Cauchy sequences without needing a limit.

*Interpretation.* The proof showcases a standard **"tail + initial segment"** decomposition: split the sequence at index $N$; the tail is bounded by the Cauchy property (pinned near $a_N$), and the initial segment is finite, hence bounded trivially. $\blacksquare$

([[10-cauchy-sequences-completeness]])

---

### Problem E3
Prove: every Cauchy sequence in $\mathbb{R}$ converges. (**Completeness of $\mathbb{R}$**.)

**Solution.**

*Strategy.* Boundedness (E2) + Bolzano–Weierstrass (D3) gives a convergent subsequence. Then show the full sequence converges to the same limit, using Cauchy-ness.

**Step 1 — Cauchy ⇒ bounded (E2).** So $|a_n| \leq M$ for some $M$.

**Step 2 — Bolzano–Weierstrass.** Extract a convergent subsequence $(a_{n_k})$ with $a_{n_k} \to a$ for some $a \in \mathbb{R}$.

**Step 3 — Show $a_n \to a$.** Let $\varepsilon > 0$.

*Use Cauchy:* there exists $N_1$ such that
$$m, n \geq N_1 \;\Longrightarrow\; |a_m - a_n| < \frac{\varepsilon}{2}. \quad (*)$$

*Use subsequence convergence:* there exists $K$ such that
$$k \geq K \;\Longrightarrow\; |a_{n_k} - a| < \frac{\varepsilon}{2}. \quad (**)$$

*Fix a "bridging" index.* Since $n_k \to \infty$ (strictly increasing) and $k \to \infty$, pick $k_0 \geq K$ with $n_{k_0} \geq N_1$ (possible since $n_k \to \infty$, so some $k \geq K$ has $n_k \geq N_1$). Set $n^* = n_{k_0}$; then $n^* \geq N_1$ and $|a_{n^*} - a| < \varepsilon/2$ by $(**)$.

*Apply $(*)$ and $(**)$:* for $n \geq N_1$,
$$|a_n - a| \;\leq\; |a_n - a_{n^*}| + |a_{n^*} - a| \;\stackrel{(*), (**)}{<}\; \frac{\varepsilon}{2} + \frac{\varepsilon}{2} \;=\; \varepsilon.$$

Hence $a_n \to a$. $\blacksquare$

*Interpretation.* **Completeness of $\mathbb{R}$ is the statement "Cauchy ⇒ convergent."** It is equivalent to the LUB axiom, MCT, Bolzano–Weierstrass, and the Nested Intervals property. This is the **key distinguishing feature of $\mathbb{R}$ vs. $\mathbb{Q}$**: both satisfy "convergent ⇒ Cauchy" (E1 works in any normed space), but only $\mathbb{R}$ satisfies the converse.

The proof architecture — bounded ⇒ Bolzano–Weierstrass subseq ⇒ extend to full sequence via Cauchy — is the canonical completeness argument and recurs in Banach spaces, Hilbert spaces, and complete metric spaces. $\blacksquare$

([[10-cauchy-sequences-completeness]])

---

### Problem E4
Give an example of a Cauchy sequence in $\mathbb{Q}$ that does **not** converge in $\mathbb{Q}$.

**Solution.**

*Setup.* We exhibit Newton's iteration for $\sqrt{2}$:
$$a_1 \;=\; 1, \qquad a_{n+1} \;=\; \frac{a_n}{2} + \frac{1}{a_n} \;=\; \frac{a_n^2 + 2}{2 a_n}.$$

*Step 1 — All $a_n \in \mathbb{Q}$.* By induction, if $a_n \in \mathbb{Q}_{>0}$, then $a_{n+1} = (a_n^2 + 2)/(2a_n) \in \mathbb{Q}_{>0}$ (rational arithmetic). Base: $a_1 = 1 \in \mathbb{Q}_{>0}$. ✓

*Step 2 — $(a_n)$ converges to $\sqrt{2}$ in $\mathbb{R}$.* (This is the classical convergence of Newton's method for $\sqrt{2}$.)
- *Lower bound.* $a_{n+1}^2 - 2 = \left(\frac{a_n^2 + 2}{2a_n}\right)^2 - 2 = \frac{(a_n^2 + 2)^2 - 8a_n^2}{4a_n^2} = \frac{(a_n^2 - 2)^2}{4a_n^2} \geq 0$. So $a_{n+1}^2 \geq 2$ for $n \geq 1$, i.e. $a_n \geq \sqrt{2}$ for $n \geq 2$.
- *Monotone decrease (for $n \geq 2$).* $a_{n+1} - a_n = \frac{a_n^2 + 2}{2a_n} - a_n = \frac{2 - a_n^2}{2a_n} \leq 0$ (using $a_n^2 \geq 2$).
- *MCT.* $(a_n)_{n \geq 2}$ is decreasing and bounded below by $\sqrt{2}$, so $a_n \to L$ with $L \geq \sqrt{2}$. Pass to the limit in the recursion: $L = L/2 + 1/L$, i.e. $L^2 = 2$, so $L = \sqrt{2}$.

*Step 3 — $(a_n)$ is Cauchy.* Every convergent (in $\mathbb{R}$) sequence is Cauchy (E1). This Cauchy property uses only rational distances $|a_m - a_n|$ and holds regardless of whether the limit lies in $\mathbb{Q}$.

*Step 4 — No limit in $\mathbb{Q}$.* The unique limit in $\mathbb{R}$ is $\sqrt{2}$, but $\sqrt{2} \notin \mathbb{Q}$ (classical irrationality proof). Uniqueness of limits (a single limit in $\mathbb{R}$ forces no other limit in $\mathbb{Q} \subset \mathbb{R}$) implies $(a_n)$ has no limit in $\mathbb{Q}$. $\blacksquare$

*Sanity check.* $a_1 = 1$, $a_2 = 1.5$, $a_3 = 17/12 \approx 1.4167$, $a_4 = 577/408 \approx 1.41422$, $a_5 \approx 1.414213562$. Quadratic convergence to $\sqrt{2} = 1.414213562\ldots$ ✓

*Interpretation.* This shows **$\mathbb{Q}$ is not complete**. The completion of $\mathbb{Q}$ with respect to the usual absolute value is $\mathbb{R}$; more generally, the construction of $\mathbb{R}$ *as* equivalence classes of Cauchy sequences in $\mathbb{Q}$ (Cantor's construction) is motivated precisely by this example. Alternative completions of $\mathbb{Q}$ using the $p$-adic absolute values give the $p$-adic numbers $\mathbb{Q}_p$. $\blacksquare$

([[10-cauchy-sequences-completeness]])

---

## Part F: Mixed

### Problem F1 (Stolz–Cesàro)
Let $(a_n)$ be any sequence and $(b_n)$ strictly increasing to $\infty$. Show: if $\dfrac{a_{n+1} - a_n}{b_{n+1} - b_n} \to L$, then $\dfrac{a_n}{b_n} \to L$.

**Solution.**

*Setup.* Given $\varepsilon > 0$. By hypothesis, there exists $N$ such that
$$n \geq N \;\Longrightarrow\; \left|\frac{a_{n+1} - a_n}{b_{n+1} - b_n} - L\right| < \frac{\varepsilon}{2}. \quad (*)$$
Denote $c_n = a_{n+1} - a_n - L(b_{n+1} - b_n)$. Then $(*)$ says $|c_n| < \frac{\varepsilon}{2}(b_{n+1} - b_n)$ for $n \geq N$.

*Step 1 — Telescope.* For $n > N$,
$$a_n - a_N \;=\; \sum_{k=N}^{n-1}(a_{k+1} - a_k) \;=\; \sum_{k=N}^{n-1}\bigl[L(b_{k+1} - b_k) + c_k\bigr] \;=\; L(b_n - b_N) + \sum_{k=N}^{n-1} c_k.$$

*Step 2 — Rewrite $a_n/b_n - L$.* Divide by $b_n$:
$$\frac{a_n}{b_n} - L \;=\; \frac{a_N - L b_N}{b_n} + \frac{1}{b_n}\sum_{k=N}^{n-1} c_k.$$

*Step 3 — Bound the two pieces.*
- **Piece 1.** $\dfrac{a_N - L b_N}{b_n} \to 0$ as $n \to \infty$, since $a_N - L b_N$ is a fixed constant and $b_n \to \infty$. So there exists $N_1 \geq N$ with $\left|\dfrac{a_N - L b_N}{b_n}\right| < \dfrac{\varepsilon}{2}$ for $n \geq N_1$.

- **Piece 2.** $\left|\dfrac{1}{b_n}\sum_{k=N}^{n-1} c_k\right| \;\leq\; \dfrac{1}{b_n}\sum_{k=N}^{n-1} |c_k| \;<\; \dfrac{1}{b_n} \cdot \dfrac{\varepsilon}{2}\sum_{k=N}^{n-1}(b_{k+1} - b_k) \;=\; \dfrac{\varepsilon}{2} \cdot \dfrac{b_n - b_N}{b_n} \;\leq\; \dfrac{\varepsilon}{2}$,

using the telescoping $\sum (b_{k+1} - b_k) = b_n - b_N$ and the fact $0 < b_n - b_N \leq b_n$ (since $b_N \geq 0$ once $N$ is large — if not, note $b_n - b_N < b_n$ whenever $b_N > 0$, which happens eventually since $b_n \to \infty$; pick $N$ with $b_N > 0$).

*Step 4 — Combine.* For $n \geq N_1$,
$$\left|\frac{a_n}{b_n} - L\right| \;\leq\; \left|\frac{a_N - L b_N}{b_n}\right| + \left|\frac{1}{b_n}\sum_{k=N}^{n-1} c_k\right| \;<\; \frac{\varepsilon}{2} + \frac{\varepsilon}{2} \;=\; \varepsilon. \quad\checkmark$$

Hence $a_n/b_n \to L$. $\blacksquare$

*Interpretation.* Stolz–Cesàro is the **discrete analogue of L'Hôpital's rule**: to compute $\lim a_n/b_n$ (formal $\infty/\infty$), replace by $\lim \Delta a_n/\Delta b_n$. It fails without the "increasing and unbounded" hypothesis on $b_n$: take $b_n = 1$ constant, trivially. $\blacksquare$

([[10-cauchy-sequences-completeness]])

---

### Problem F2 (Cesàro Means)
Let $a_n \to a$. Show $\sigma_n := \dfrac{a_1 + a_2 + \cdots + a_n}{n} \to a$.

**Solution.**

*Setup.* We want $\sigma_n \to a$. Let $\varepsilon > 0$.

*Step 1 — Choose $N$ from $a_n \to a$.* There exists $N \in \mathbb{N}$ with
$$n \geq N + 1 \;\Longrightarrow\; |a_n - a| < \frac{\varepsilon}{2}.$$

*Step 2 — Split $\sigma_n - a$ into initial and tail.* For $n > N$,
$$\sigma_n - a \;=\; \frac{\sum_{k=1}^n a_k}{n} - a \;=\; \frac{\sum_{k=1}^n (a_k - a)}{n} \;=\; \underbrace{\frac{\sum_{k=1}^N (a_k - a)}{n}}_{=:A_n} + \underbrace{\frac{\sum_{k=N+1}^n (a_k - a)}{n}}_{=:B_n}.$$

*Step 3 — Bound $A_n$ (initial segment).* The numerator $S := \sum_{k=1}^N (a_k - a)$ is a **fixed constant** (independent of $n$). So
$$|A_n| \;=\; \frac{|S|}{n} \;\to\; 0.$$
Choose $N_1 \geq N + 1$ such that
$$n \geq N_1 \;\Longrightarrow\; |A_n| \;=\; \frac{|S|}{n} \;<\; \frac{\varepsilon}{2}.$$
(Concretely, $N_1 = \max(N+1, \lceil 2|S|/\varepsilon \rceil + 1)$.)

*Step 4 — Bound $B_n$ (tail).*
$$|B_n| \;=\; \left|\frac{\sum_{k=N+1}^n (a_k - a)}{n}\right| \;\leq\; \frac{\sum_{k=N+1}^n |a_k - a|}{n} \;<\; \frac{(n - N) \cdot \varepsilon/2}{n} \;\leq\; \frac{\varepsilon}{2}.$$
(Using $|a_k - a| < \varepsilon/2$ for $k \geq N + 1$, and $(n-N)/n < 1$.)

*Step 5 — Combine.* For $n \geq N_1$,
$$|\sigma_n - a| \;\leq\; |A_n| + |B_n| \;<\; \frac{\varepsilon}{2} + \frac{\varepsilon}{2} \;=\; \varepsilon. \quad\checkmark$$

Hence $\sigma_n \to a$. $\blacksquare$

*Sanity check.* If $a_n = 1 + (-1)^n/n$ (so $a_n \to 1$), compute $\sigma_{100}$ numerically: average of oscillating terms around $1$ should be very close to $1$. The averaging cancels oscillations faster than the underlying convergence. ✓

*Interpretation.* **Cesàro summability** can accelerate convergence (e.g., $a_n = (-1)^n$ diverges, but $\sigma_n \to 0$ — Cesàro sums the divergent series $1 - 1 + 1 - \cdots$). The converse of F2 is false: $\sigma_n$ can converge while $a_n$ diverges. The converse **does** hold under the additional assumption $n(a_{n+1} - a_n) \to 0$ (Hardy's Tauberian theorem).

The proof technique — **split into initial segment (fixed, $\to 0$ as $n \to \infty$) and tail (bounded by $\varepsilon$)** — is the standard averaging argument, recurring in ergodic theory, Fourier series, and spectral theorems. $\blacksquare$

([[10-cauchy-sequences-completeness]])

---

### Problem F3
Let $a_n = \sum_{k=1}^n \dfrac{1}{k}$ (harmonic partial sums). Show $(a_n)$ is **not** Cauchy.

**Solution.**

*Strategy.* Produce $\varepsilon_0 > 0$ such that, for every $N \in \mathbb{N}$, we can find $m, n \geq N$ with $|a_m - a_n| \geq \varepsilon_0$. Take $\varepsilon_0 = 1/2$.

*Step 1 — Block estimate.* For any $N \in \mathbb{N}$, consider $m = 2N$, $n = N$. Both satisfy $m, n \geq N$. Compute
$$a_{2N} - a_N \;=\; \sum_{k=N+1}^{2N} \frac{1}{k}.$$
There are exactly $N$ terms in the sum. Each term $1/k$ for $N+1 \leq k \leq 2N$ satisfies $1/k \geq 1/(2N)$ (since $k \leq 2N$). Therefore
$$a_{2N} - a_N \;\geq\; N \cdot \frac{1}{2N} \;=\; \frac{1}{2}.$$

*Step 2 — Negate Cauchy.* For every $N$, taking $m = 2N, n = N$ yields $|a_m - a_n| \geq 1/2$. Hence **for $\varepsilon_0 = 1/2$, no $N$ works**, violating the Cauchy criterion.

Therefore $(a_n)$ is not Cauchy. $\blacksquare$

*Corollary.* By completeness (E3, contrapositive), $(a_n)$ does **not** converge. Combined with monotonicity ($a_n$ increasing), this means $a_n \to \infty$. Thus the harmonic series $\sum 1/k$ diverges.

*Sanity check.* $a_1 = 1, a_2 = 1.5, a_4 = 2.083, a_8 \approx 2.718, a_{16} \approx 3.38, a_{32} \approx 4.06$. Grows without bound, roughly like $\ln n$ (since $a_n = \ln n + \gamma + O(1/n)$ where $\gamma \approx 0.5772$ is the Euler–Mascheroni constant). ✓

*Interpretation.* The "double-the-index" trick is the classical argument (attributed to Oresme, $\sim 1350$) showing the harmonic series diverges, via dyadic grouping:
$$\sum_{k=1}^\infty \frac{1}{k} \;=\; 1 + \frac{1}{2} + \underbrace{\left(\frac{1}{3} + \frac{1}{4}\right)}_{\geq 1/2} + \underbrace{\left(\frac{1}{5} + \cdots + \frac{1}{8}\right)}_{\geq 1/2} + \cdots \;=\; \infty.$$

The failure of the Cauchy criterion here foreshadows the **integral test** in [[12-infinite-series-introduction]]. $\blacksquare$

([[10-cauchy-sequences-completeness]])

---

### Problem F4
Let $(a_n)$ and $(b_n)$ both be Cauchy in $\mathbb{R}$. Show $(a_n b_n)$ is Cauchy.

**Solution.**

*Strategy.* Bound $|a_m b_m - a_n b_n|$ by a standard "add and subtract" splitting, using that both sequences are bounded (E2).

*Step 1 — Boundedness.* By E2, there exist $M_1, M_2$ with $|a_n| \leq M_1$ and $|b_n| \leq M_2$ for all $n$. Set $M = \max(M_1, M_2) > 0$.

(If $M = 0$, both sequences are identically $0$, trivially Cauchy. Assume $M > 0$.)

*Step 2 — Add and subtract.* For any $m, n$,
$$a_m b_m - a_n b_n \;=\; a_m b_m - a_m b_n + a_m b_n - a_n b_n \;=\; a_m(b_m - b_n) + b_n(a_m - a_n).$$

*Step 3 — Triangle inequality and bounds.*
$$|a_m b_m - a_n b_n| \;\leq\; |a_m| \cdot |b_m - b_n| + |b_n| \cdot |a_m - a_n| \;\leq\; M\bigl(|b_m - b_n| + |a_m - a_n|\bigr).$$

*Step 4 — Use both Cauchy hypotheses.* Given $\varepsilon > 0$:
- Since $(a_n)$ is Cauchy, there exists $N_1$ with $m, n \geq N_1 \Rightarrow |a_m - a_n| < \varepsilon/(2M)$.
- Since $(b_n)$ is Cauchy, there exists $N_2$ with $m, n \geq N_2 \Rightarrow |b_m - b_n| < \varepsilon/(2M)$.

Let $N = \max(N_1, N_2)$. For $m, n \geq N$,
$$|a_m b_m - a_n b_n| \;\leq\; M\left(\frac{\varepsilon}{2M} + \frac{\varepsilon}{2M}\right) \;=\; \varepsilon. \quad\checkmark$$

Hence $(a_n b_n)$ is Cauchy. $\blacksquare$

*Interpretation.* This result is a "completeness-free" statement: the Cauchy property is preserved by multiplication, even in $\mathbb{Q}$ or any metric ring. Combined with E3 (Cauchy ⇒ convergent in $\mathbb{R}$), this gives the **product rule for limits**: if $a_n \to a, b_n \to b$ in $\mathbb{R}$, then $a_n b_n \to ab$ (since both are Cauchy, so is the product, and limits are unique). $\blacksquare$

([[10-cauchy-sequences-completeness]])

---

### Problem F5
Let $a_n \to a$ and $b_n \to b$ with $b \neq 0$ and $b_n \neq 0$ for all $n$. Show $a_n/b_n \to a/b$.

**Solution.**

*Strategy.* The key difficulty is bounding $1/|b_n b|$ from above, which requires showing $|b_n|$ is bounded **below** by a positive constant eventually. Use $b_n \to b \neq 0$ to find such a bound.

**Step 1 — Uniform lower bound on $|b_n|$.**

Set $\delta = |b|/2 > 0$ (strict since $b \neq 0$). Since $b_n \to b$, there exists $N_0$ with
$$n \geq N_0 \;\Longrightarrow\; |b_n - b| < \delta = \frac{|b|}{2}.$$
By the reverse triangle inequality,
$$|b_n| \;\geq\; |b| - |b_n - b| \;>\; |b| - \frac{|b|}{2} \;=\; \frac{|b|}{2} \quad\text{for } n \geq N_0.$$

Hence $|b_n b| = |b_n| \cdot |b| \geq |b|^2/2$ for $n \geq N_0$.

**Step 2 — Algebraic manipulation of the error.**

$$\left|\frac{a_n}{b_n} - \frac{a}{b}\right| \;=\; \left|\frac{a_n b - a b_n}{b_n b}\right| \;=\; \frac{|a_n b - a b_n|}{|b_n b|}.$$

Add and subtract $ab$ in the numerator:
$$|a_n b - a b_n| \;=\; |a_n b - a b + a b - a b_n| \;=\; |b(a_n - a) - a(b_n - b)| \;\leq\; |b|\,|a_n - a| + |a|\,|b_n - b|.$$

**Step 3 — Combine the bounds.** For $n \geq N_0$,
$$\left|\frac{a_n}{b_n} - \frac{a}{b}\right| \;\leq\; \frac{|b|\,|a_n - a| + |a|\,|b_n - b|}{|b|^2/2} \;=\; \frac{2}{|b|} |a_n - a| + \frac{2|a|}{|b|^2}|b_n - b|. \quad (*)$$

**Step 4 — Finish via $\varepsilon$–$N$.** Let $\varepsilon > 0$.
- Since $a_n \to a$: $\exists N_1$ with $n \geq N_1 \Rightarrow |a_n - a| < \dfrac{\varepsilon |b|}{4}$, so $\dfrac{2}{|b|}|a_n - a| < \dfrac{\varepsilon}{2}$.
- Since $b_n \to b$: $\exists N_2$ with $n \geq N_2 \Rightarrow |b_n - b| < \dfrac{\varepsilon |b|^2}{4(|a| + 1)}$, so $\dfrac{2|a|}{|b|^2}|b_n - b| < \dfrac{\varepsilon |a|}{2(|a| + 1)} < \dfrac{\varepsilon}{2}$.

(Denominator $|a| + 1$ avoids division by zero when $a = 0$.)

Let $N = \max(N_0, N_1, N_2)$. For $n \geq N$, $(*)$ gives
$$\left|\frac{a_n}{b_n} - \frac{a}{b}\right| \;<\; \frac{\varepsilon}{2} + \frac{\varepsilon}{2} \;=\; \varepsilon. \quad\checkmark$$

Hence $a_n/b_n \to a/b$. $\blacksquare$

*Sanity check.* The constants $2/|b|$ and $2|a|/|b|^2$ in $(*)$ are finite since $b \neq 0$; the proof would break if $b = 0$ (division by zero in the bound, matching the hypothesis failure).

*Interpretation.* The quotient rule is subtler than the sum or product rules because $x \mapsto 1/x$ is **not Lipschitz on $\mathbb{R} \setminus \{0\}$** (its derivative blows up near $0$). The proof circumvents this by using convergence $b_n \to b \neq 0$ to cordon off a neighborhood of $0$, making $1/b_n$ uniformly bounded.

The hypothesis $b_n \neq 0$ for all $n$ is needed to ensure $a_n/b_n$ is even defined; the conclusion actually only needs $b_n \neq 0$ **eventually** (once $n \geq N_0$, Step 1). Qualifying-exam level proofs should explicitly address these edge cases. $\blacksquare$

([[09-convergence-and-limits]])

---

## Summary

| Problem Topic | Key lesson | Core technique |
|---|---|---|
| A1–A4 | [[09-convergence-and-limits]] | $\varepsilon$–$N$ definition, Archimedean property, reverse triangle inequality |
| B1–B4 | [[09-convergence-and-limits]] | Algebra of limits, Bernoulli, binomial bounds, factorial growth |
| C1–C4 | [[08-sequences-introduction]] | Monotone Convergence Theorem, fixed-point iteration, binomial expansion |
| D1–D4 | [[08-sequences-introduction]], [[10-cauchy-sequences-completeness]] | Subsequences, Monotone Subsequence Theorem, Bolzano–Weierstrass |
| E1–E4 | [[10-cauchy-sequences-completeness]] | Cauchy criterion, completeness of $\mathbb{R}$ vs. $\mathbb{Q}$ |
| F1–F5 | multiple | Stolz–Cesàro, Cesàro means, harmonic divergence, algebra of Cauchy sequences |

### Architectural takeaway

The entire CO2 content is organised around the **completeness axiom** of $\mathbb{R}$, stated equivalently as:
1. Every nonempty bounded-above set has a supremum (LUB).
2. **Every monotone bounded sequence converges (MCT)**.
3. **Every bounded sequence has a convergent subsequence (Bolzano–Weierstrass)**.
4. **Every Cauchy sequence converges (metric completeness)**.
5. Nested closed bounded intervals with diameters $\to 0$ have nonempty intersection (NIP).

Knowing one of these, all follow. Qualifying-exam questions regularly test this equivalence tree.

---

## Related Topics

- [[08-sequences-introduction]] through [[10-cauchy-sequences-completeness]] — CO2 lesson content.
- [[12-infinite-series-introduction]] — next unit (CO3) uses the Cauchy criterion for partial sums.
