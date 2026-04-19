# 9. Convergence and Limits of Sequences

> **The central object.** Convergence is the foundation on which continuity, differentiation, integration, and every serious result in analysis is built. The $\varepsilon$-$N$ definition is the first genuinely non-trivial quantifier arrangement most students encounter: a prescription for *how close* and *how soon*, with the cutoff $N$ depending functionally on the tolerance $\varepsilon$.
>
> This chapter establishes the formal definition, proves the core structural theorems (uniqueness of limits, boundedness of convergent sequences, algebra of limits, the squeeze theorem, order preservation, monotone convergence), catalogs the standard limits that arise constantly in analysis, and works through a battery of qualifying-exam-level examples and problems — each with fully explicit $N$-constructions and numbered proof steps.

---

## 9.1 The $\varepsilon$-$N$ Definition

> **Definition 9.1 (Convergence).** A sequence $(x_n)_{n \in \mathbb{N}}$ of real numbers **converges to $L \in \mathbb{R}$** if
> $$\forall \varepsilon > 0,\ \exists N = N(\varepsilon) \in \mathbb{N}\ \text{such that}\ \forall n \geq N,\ |x_n - L| < \varepsilon.$$
>
> We write $x_n \to L$, or $\lim_{n \to \infty} x_n = L$. We say $(x_n)$ is **convergent** if some such $L$ exists, and **divergent** otherwise.

### Unpacking the quantifiers

| Symbol | Reading | Remark |
|---|---|---|
| $\varepsilon > 0$ | "any positive tolerance, however small" | The adversary's move. |
| $\exists N$ | "we can produce a cutoff index" | The prover's response. |
| $n \geq N$ | "from that point onward" | Tail of the sequence. |
| $\|x_n - L\| < \varepsilon$ | "$x_n$ lies in the open interval $(L - \varepsilon, L + \varepsilon)$" | Geometric reading. |

**The order of quantifiers is non-negotiable.** "$\forall \varepsilon > 0 \ \exists N$" means $N$ is permitted to depend on $\varepsilon$. Reversing to "$\exists N \ \forall \varepsilon$" would demand a single $N$ that works for every tolerance — which for non-constant sequences is impossible.

### Equivalent reformulations

All of the following are logically equivalent to Definition 9.1, and each is useful in different contexts.

1. **Strict vs. non-strict.** We can replace "$|x_n - L| < \varepsilon$" with "$|x_n - L| \leq \varepsilon$" — the resulting definition is equivalent (halve $\varepsilon$).
2. **Scaled tolerance.** We can replace "$|x_n - L| < \varepsilon$" with "$|x_n - L| < C\varepsilon$" for any fixed constant $C > 0$ — in practice, this means we tolerate any bound of the form "a constant times $\varepsilon$". We will use this freedom constantly.
3. **Neighborhood form.** For every open interval $U \ni L$, the set $\{n : x_n \notin U\}$ is finite.
4. **Eventually-in-neighborhood.** For every $\varepsilon > 0$, the sequence is **eventually** in $(L - \varepsilon, L + \varepsilon)$, where "eventually" means "for all but finitely many $n$."

### Strategy for $\varepsilon$-$N$ proofs

Every direct $\varepsilon$-$N$ proof follows the same four-step template:

1. **Fix $\varepsilon > 0$ arbitrary.**
2. **Scratch work.** Manipulate $|x_n - L|$ to get an upper bound of the form $f(n)$ that clearly tends to $0$.
3. **Solve $f(n) < \varepsilon$ for $n$.** This yields a condition "$n > g(\varepsilon)$".
4. **Choose $N$** to be any integer with $N > g(\varepsilon)$ (Archimedean property). Verify that for all $n \geq N$, $|x_n - L| \leq f(n) < \varepsilon$.

---

## 9.2 Uniqueness of Limits

> **Theorem 9.2 (Uniqueness).** A convergent sequence has a unique limit.

**Proof.**

1. Suppose for contradiction that $x_n \to L_1$ and $x_n \to L_2$ with $L_1 \neq L_2$.

2. Set $\varepsilon := \frac{|L_1 - L_2|}{2} > 0$ (positive since $L_1 \neq L_2$).

3. By $x_n \to L_1$, there exists $N_1 \in \mathbb{N}$ such that $|x_n - L_1| < \varepsilon$ for all $n \geq N_1$.

4. By $x_n \to L_2$, there exists $N_2 \in \mathbb{N}$ such that $|x_n - L_2| < \varepsilon$ for all $n \geq N_2$.

5. Let $N := \max(N_1, N_2)$. For any $n \geq N$ (at least one exists: $n = N$), both inequalities above hold.

6. Apply the triangle inequality with the "insert and subtract $x_n$" trick:
$$|L_1 - L_2| = |L_1 - x_n + x_n - L_2| \leq |L_1 - x_n| + |x_n - L_2| < \varepsilon + \varepsilon = 2\varepsilon = |L_1 - L_2|.$$

7. We have deduced $|L_1 - L_2| < |L_1 - L_2|$, a contradiction. Hence our assumption $L_1 \neq L_2$ is false, so $L_1 = L_2$. $\blacksquare$

**Interpretive remark.** The proof is the prototype of a "halve the gap" argument: we chose $\varepsilon$ to be half the distance between the two candidate limits, forcing any tail of the sequence to live simultaneously in two disjoint neighborhoods — impossible. This technique recurs throughout analysis (e.g., in separation arguments in metric spaces, in proving that isolated zeros of analytic functions are discrete, etc.).

**Consequence.** Uniqueness justifies the notational use of the definite article: *the* limit, not *a* limit. The symbol $\lim_{n \to \infty} x_n$ denotes a single real number.

---

## 9.3 Convergent $\Rightarrow$ Bounded

> **Theorem 9.3.** Every convergent sequence is bounded. That is, if $x_n \to L$, then there exists $M > 0$ such that $|x_n| \leq M$ for all $n \in \mathbb{N}$.

**Proof.**

1. **Apply the definition at $\varepsilon = 1$.** By $x_n \to L$, there exists $N \in \mathbb{N}$ such that $|x_n - L| < 1$ for all $n \geq N$.

2. **Bound the tail.** For $n \geq N$, by the triangle inequality,
$$|x_n| = |x_n - L + L| \leq |x_n - L| + |L| < 1 + |L|.$$

3. **Handle the head.** The initial terms $x_1, x_2, \ldots, x_{N-1}$ form a finite set of real numbers, so $\max\{|x_1|, \ldots, |x_{N-1}|\}$ exists and is finite.

4. **Combine.** Let
$$M := \max\bigl\{|x_1|, |x_2|, \ldots, |x_{N-1}|, 1 + |L|\bigr\}.$$
For $n < N$: $|x_n| \leq M$ by construction. For $n \geq N$: $|x_n| < 1 + |L| \leq M$. Either way $|x_n| \leq M$. $\blacksquare$

**Remark on the choice $\varepsilon = 1$.** Any fixed positive constant would serve; $\varepsilon = 1$ is the conventional choice.

### Contrapositive

> **Corollary 9.4.** If $(x_n)$ is unbounded, then $(x_n)$ diverges.

This gives the quickest divergence test: exhibit an unbounded subsequence.

**Example.** $x_n = n$ is unbounded (Archimedean), hence divergent.

### Warning: the converse fails

Boundedness does **not** imply convergence. Standard counterexample: $x_n = (-1)^n$ is bounded (by $1$) but does not converge (Section 9.8).

---

## 9.4 Algebra of Limits

> **Theorem 9.5 (Algebra of Limits).** Suppose $x_n \to L$ and $y_n \to M$. Then:
> 1. $x_n + y_n \to L + M$.
> 2. $c \cdot x_n \to c L$ for any $c \in \mathbb{R}$.
> 3. $x_n \cdot y_n \to L \cdot M$.
> 4. If $M \neq 0$ and $y_n \neq 0$ for all $n$: $x_n / y_n \to L / M$.
> 5. $|x_n| \to |L|$.

### Proof of (1): sum rule

1. **Fix $\varepsilon > 0$.**

2. Apply $x_n \to L$ to the tolerance $\varepsilon/2 > 0$: there exists $N_1 \in \mathbb{N}$ with
$$|x_n - L| < \varepsilon/2 \quad \text{for all } n \geq N_1.$$

3. Apply $y_n \to M$ to the tolerance $\varepsilon/2 > 0$: there exists $N_2 \in \mathbb{N}$ with
$$|y_n - M| < \varepsilon/2 \quad \text{for all } n \geq N_2.$$

4. Set $N := \max(N_1, N_2)$. For $n \geq N$ both bounds hold simultaneously:
$$|(x_n + y_n) - (L + M)| = |(x_n - L) + (y_n - M)| \leq |x_n - L| + |y_n - M| < \tfrac{\varepsilon}{2} + \tfrac{\varepsilon}{2} = \varepsilon.$$

5. Since $\varepsilon > 0$ was arbitrary, $x_n + y_n \to L + M$. $\blacksquare$

**Interpretation.** We split the tolerance in half, one half per summand. This is the "$\varepsilon/k$ trick": if $k$ error terms each contribute at most $\varepsilon/k$, their sum is bounded by $\varepsilon$.

### Proof of (2): scalar rule

1. **Case $c = 0$.** Then $c x_n = 0$ is the zero sequence, which converges to $0 = c L$. Done.

2. **Case $c \neq 0$.** Fix $\varepsilon > 0$. Apply $x_n \to L$ to the tolerance $\varepsilon / |c| > 0$: there exists $N \in \mathbb{N}$ with $|x_n - L| < \varepsilon / |c|$ for $n \geq N$.

3. Then for $n \geq N$:
$$|c x_n - c L| = |c| \cdot |x_n - L| < |c| \cdot \frac{\varepsilon}{|c|} = \varepsilon. \quad \blacksquare$$

### Proof of (3): product rule

The product is subtler because both factors can drift. The standard trick: **insert a cross term**.

1. **Fix $\varepsilon > 0$.**

2. **Bound the drifting factor.** Since $(x_n)$ is convergent, it is bounded (Theorem 9.3): choose $K > 0$ with $|x_n| \leq K$ for all $n$.

3. **Split the error.** For any $n$,
$$|x_n y_n - L M| = |x_n y_n - x_n M + x_n M - L M| \leq |x_n| \cdot |y_n - M| + |M| \cdot |x_n - L|.$$

4. **Bound term 1.** Apply $y_n \to M$ to the tolerance $\dfrac{\varepsilon}{2K}$: there exists $N_1$ with
$$|y_n - M| < \frac{\varepsilon}{2K} \quad (n \geq N_1),$$
so $|x_n| \cdot |y_n - M| < K \cdot \dfrac{\varepsilon}{2K} = \dfrac{\varepsilon}{2}$.

5. **Bound term 2.** Apply $x_n \to L$ to the tolerance $\dfrac{\varepsilon}{2(|M| + 1)}$: there exists $N_2$ with
$$|x_n - L| < \frac{\varepsilon}{2(|M| + 1)} \quad (n \geq N_2),$$
so $|M| \cdot |x_n - L| \leq (|M| + 1) \cdot \dfrac{\varepsilon}{2(|M| + 1)} = \dfrac{\varepsilon}{2}$. (The "$+1$" protects against $M = 0$.)

6. **Combine.** For $n \geq N := \max(N_1, N_2)$:
$$|x_n y_n - L M| \leq |x_n| \cdot |y_n - M| + |M| \cdot |x_n - L| < \tfrac{\varepsilon}{2} + \tfrac{\varepsilon}{2} = \varepsilon. \quad \blacksquare$$

**Why the "+1"?** If $M = 0$, dividing by $|M|$ is illegal. Replacing $|M|$ by $|M| + 1 > 0$ is safe and costs nothing — it's a universal fix for terms that might vanish.

### Proof of (4): quotient rule

It suffices to prove $1/y_n \to 1/M$ and then apply (3) to $x_n \cdot (1/y_n)$.

1. **Fix $\varepsilon > 0$.**

2. **Bound $y_n$ away from zero.** Apply $y_n \to M$ to $\varepsilon_0 := |M|/2 > 0$: there exists $N_0$ with $|y_n - M| < |M|/2$ for $n \geq N_0$. Then by the reverse triangle inequality,
$$|y_n| \geq |M| - |y_n - M| > |M| - |M|/2 = |M|/2 \quad (n \geq N_0).$$

3. **Compute the error.**
$$\left|\frac{1}{y_n} - \frac{1}{M}\right| = \frac{|M - y_n|}{|y_n| \cdot |M|} \leq \frac{|y_n - M|}{(|M|/2) \cdot |M|} = \frac{2 |y_n - M|}{M^2} \quad (n \geq N_0).$$

4. **Shrink to $\varepsilon$.** Apply $y_n \to M$ to $\dfrac{\varepsilon M^2}{2}$: there exists $N_1$ with $|y_n - M| < \dfrac{\varepsilon M^2}{2}$ for $n \geq N_1$. For $n \geq N := \max(N_0, N_1)$,
$$\left|\frac{1}{y_n} - \frac{1}{M}\right| \leq \frac{2}{M^2} \cdot \frac{\varepsilon M^2}{2} = \varepsilon. \quad \blacksquare$$

### Proof of (5): absolute value rule

1. By the reverse triangle inequality, for all $n$:
$$\bigl| |x_n| - |L| \bigr| \leq |x_n - L|.$$

2. **Fix $\varepsilon > 0$.** Apply $x_n \to L$: there exists $N$ with $|x_n - L| < \varepsilon$ for $n \geq N$.

3. Then $\bigl||x_n| - |L|\bigr| \leq |x_n - L| < \varepsilon$, giving $|x_n| \to |L|$. $\blacksquare$

**Warning.** The converse of (5) is false: $x_n = (-1)^n$ gives $|x_n| = 1 \to 1$ while $(x_n)$ itself diverges.

---

## 9.5 Order and Limits

> **Theorem 9.6 (Limits respect non-strict inequality).** Suppose $x_n \to L$.
> 1. If $x_n \geq a$ for all sufficiently large $n$, then $L \geq a$.
> 2. If $x_n \leq b$ for all sufficiently large $n$, then $L \leq b$.

**Proof of (1) (by contradiction).**

1. Suppose $L < a$. Set $\varepsilon := a - L > 0$.

2. By $x_n \to L$, there exists $N$ such that $|x_n - L| < \varepsilon = a - L$ for all $n \geq N$.

3. This gives $x_n - L < a - L$, i.e., $x_n < a$ for $n \geq N$.

4. But by hypothesis, $x_n \geq a$ for sufficiently large $n$ — say for $n \geq N'$.

5. For $n \geq \max(N, N')$ we have $x_n < a$ and $x_n \geq a$ simultaneously — contradiction. Hence $L \geq a$. $\blacksquare$

Part (2) is proved identically (replace $a - L$ by $L - b$ and swap inequalities), or apply (1) to $-x_n \to -L$.

### Warning: strict inequalities do not pass to limits

$x_n = 1/n > 0$ for all $n$, yet $\lim x_n = 0$, not $> 0$. The general principle: **limits preserve $\leq$ and $\geq$, but not $<$ or $>$.**

> **Corollary 9.7 (Comparison theorem).** If $x_n \to L$ and $y_n \to M$, and $x_n \leq y_n$ for all sufficiently large $n$, then $L \leq M$.

**Proof.** Apply Theorem 9.6(2) to the sequence $y_n - x_n \to M - L$, which is $\geq 0$ eventually. Hence $M - L \geq 0$, i.e., $L \leq M$. $\blacksquare$

### The squeeze theorem

> **Theorem 9.8 (Squeeze / Sandwich).** Suppose $a_n \leq x_n \leq b_n$ for all sufficiently large $n$, and $a_n \to L$ and $b_n \to L$. Then $x_n \to L$.

**Proof.**

1. **Fix $\varepsilon > 0$.**

2. **Apply $a_n \to L$:** there exists $N_1$ with $|a_n - L| < \varepsilon$, i.e., $L - \varepsilon < a_n < L + \varepsilon$, for $n \geq N_1$.

3. **Apply $b_n \to L$:** there exists $N_2$ with $|b_n - L| < \varepsilon$, i.e., $L - \varepsilon < b_n < L + \varepsilon$, for $n \geq N_2$.

4. Let $N_3$ be such that $a_n \leq x_n \leq b_n$ for $n \geq N_3$.

5. For $n \geq N := \max(N_1, N_2, N_3)$, we chain the inequalities:
$$L - \varepsilon < a_n \leq x_n \leq b_n < L + \varepsilon.$$
Hence $L - \varepsilon < x_n < L + \varepsilon$, i.e., $|x_n - L| < \varepsilon$.

6. Since $\varepsilon$ was arbitrary, $x_n \to L$. $\blacksquare$

**Slogan.** *"If you are trapped between two things going to $L$, you go to $L$."*

**Application: $\sin(n)/n \to 0$.** Since $|\sin(n)| \leq 1$ for all $n$, we have $-1/n \leq \sin(n)/n \leq 1/n$. Both $-1/n \to 0$ and $1/n \to 0$, so by the squeeze theorem, $\sin(n)/n \to 0$.

> **Corollary 9.9 (Absolute convergence to zero).** If $|x_n| \to 0$, then $x_n \to 0$.

**Proof.** From $-|x_n| \leq x_n \leq |x_n|$ and $|x_n| \to 0$, the squeeze gives $x_n \to 0$. $\blacksquare$

---

## 9.6 Sequential Criteria

The $\varepsilon$-$N$ definition admits several equivalent reformulations that are often more convenient in practice.

> **Theorem 9.10 (Equivalent formulations of $x_n \to L$).** The following are equivalent:
> 1. $x_n \to L$ in the $\varepsilon$-$N$ sense of Definition 9.1.
> 2. For every open interval $U \ni L$, only finitely many $x_n$ lie outside $U$.
> 3. $|x_n - L| \to 0$.
> 4. For every $\varepsilon > 0$, $\{n : |x_n - L| \geq \varepsilon\}$ is finite.
> 5. Every subsequence of $(x_n)$ converges to $L$.

**Proof sketch.**

$(1) \Rightarrow (2)$: Given $U \supset L$, choose $\varepsilon > 0$ with $(L - \varepsilon, L + \varepsilon) \subseteq U$. Then $\{n : x_n \notin U\} \subseteq \{n : |x_n - L| \geq \varepsilon\}$, and the latter is bounded above by $N - 1$, hence finite.

$(2) \Rightarrow (1)$: Given $\varepsilon > 0$, take $U = (L - \varepsilon, L + \varepsilon)$. The complement $\{n : x_n \notin U\}$ is finite; let $N - 1$ be its maximum (or $0$ if empty). Then $n \geq N$ implies $x_n \in U$, i.e., $|x_n - L| < \varepsilon$.

$(1) \Leftrightarrow (3)$: Definitional — $|x_n - L| \to 0$ means for all $\varepsilon > 0$, eventually $||x_n - L| - 0| < \varepsilon$, which is exactly the condition in (1).

$(1) \Leftrightarrow (4)$: The set $\{n : |x_n - L| \geq \varepsilon\}$ is finite iff there exists $N$ such that $n \geq N \Rightarrow |x_n - L| < \varepsilon$.

$(1) \Rightarrow (5)$: If $(x_{n_k})$ is a subsequence and $N$ works for $(x_n)$ at tolerance $\varepsilon$, then since $n_k \geq k$ for all $k$, taking $k \geq N$ gives $n_k \geq N$ and $|x_{n_k} - L| < \varepsilon$.

$(5) \Rightarrow (1)$: The full sequence is a subsequence of itself (with $n_k = k$). $\blacksquare$

### Useful contrapositive

> $(x_n)$ *fails to* converge to $L$ $\iff$ some subsequence fails to converge to $L$ $\iff$ some subsequence is bounded away from $L$ by some $\varepsilon_0 > 0$.

**Concrete divergence criterion.** If two subsequences of $(x_n)$ converge to different limits, $(x_n)$ diverges.

**Application.** $x_n = (-1)^n$. The even subsequence $(x_{2k}) = (1, 1, 1, \ldots) \to 1$, and the odd subsequence $(x_{2k-1}) = (-1, -1, -1, \ldots) \to -1$. Different limits $\Rightarrow (x_n)$ diverges.

---

## 9.7 Divergence to Infinity

> **Definition 9.11.** $x_n \to +\infty$ if for every $M > 0$ there exists $N \in \mathbb{N}$ with $x_n > M$ for all $n \geq N$.
>
> Symmetrically, $x_n \to -\infty$ if for every $M > 0$ there exists $N$ with $x_n < -M$ for all $n \geq N$.

**Caveat.** Such sequences are *divergent* — they have no real limit — but we speak of them as "diverging to $\pm\infty$" because they have a definite asymptotic direction.

### Examples

- $x_n = n \to \infty$: given $M > 0$, choose $N > M$ (Archimedean).
- $x_n = -n^2 \to -\infty$: given $M > 0$, choose $N > \sqrt{M}$.
- $x_n = n \sin(n)$: diverges (unbounded), but **not** to $\pm\infty$ — it takes arbitrarily large positive and negative values (since $\sin$ oscillates), so there is no fixed sign on the tail.

> **Proposition 9.12 (Reciprocal).** If $x_n > 0$ for all $n$ and $x_n \to 0$, then $1/x_n \to +\infty$. Conversely, if $x_n \to +\infty$, then $1/x_n \to 0^+$.

**Proof.** *(First direction.)* Given $M > 0$, apply $x_n \to 0$ to $\varepsilon = 1/M > 0$: there exists $N$ with $|x_n| < 1/M$ for $n \geq N$. Since $x_n > 0$, this gives $x_n < 1/M$, hence $1/x_n > M$. $\blacksquare$

---

## 9.8 Monotone Convergence Theorem

This is arguably the most important existence theorem in elementary analysis: it converts a structural property (monotonicity + boundedness) into convergence, without requiring us to know the limit in advance.

> **Theorem 9.13 (Monotone Convergence Theorem, MCT).**
> 1. Every bounded-above increasing sequence converges, and $\lim x_n = \sup_n x_n$.
> 2. Every bounded-below decreasing sequence converges, and $\lim x_n = \inf_n x_n$.

**Proof of (1).**

1. Let $(x_n)$ be increasing ($x_n \leq x_{n+1}$ for all $n$) and bounded above.

2. **Invoke completeness.** The set $S = \{x_n : n \in \mathbb{N}\}$ is non-empty (contains $x_1$) and bounded above, hence by the completeness of $\mathbb{R}$, $L := \sup S$ exists in $\mathbb{R}$.

3. **Claim: $x_n \to L$.** Fix $\varepsilon > 0$. Since $L - \varepsilon < L$ and $L$ is the least upper bound, $L - \varepsilon$ is **not** an upper bound for $S$. Hence there exists $N \in \mathbb{N}$ with $x_N > L - \varepsilon$.

4. **Use monotonicity.** For all $n \geq N$: $x_n \geq x_N > L - \varepsilon$ (increasing).

5. **Upper bound.** For all $n$: $x_n \leq L$ (since $L$ is an upper bound), so $x_n \leq L < L + \varepsilon$.

6. Combining (4) and (5): $L - \varepsilon < x_n \leq L$ for $n \geq N$. Hence $|x_n - L| < \varepsilon$.

7. Since $\varepsilon$ was arbitrary, $x_n \to L$. $\blacksquare$

Part (2) follows by applying (1) to $(-x_n)$, which is increasing and bounded above.

**Significance.** The MCT is our primary tool for proving existence of limits when the limit's value is not obvious. The two-step pattern —

*(a)* bounded + monotonic $\Rightarrow$ converges to some $L$;  
*(b)* identify $L$ via a fixed-point equation from the recursion —

underlies essentially all convergence proofs for recursive sequences.

> **Corollary 9.14.** A sequence that is bounded and eventually monotonic converges.

(Applying MCT to the tail — the finitely many pre-monotonic terms do not affect convergence.)

---

## 9.9 Standard Limits

These limits are invoked constantly and should be memorized. Each row is either proved in this section or in the worked examples/practice problems.

| Sequence $(x_n)$ | Limit | Proof location |
|---|---|---|
| $1/n$ | $0$ | Archimedean property |
| $1/n^p$, $p > 0$ | $0$ | Squeeze via $1/n$ |
| $r^n$, $\|r\| < 1$ | $0$ | Below |
| $r^n$, $r = 1$ | $1$ | Constant sequence |
| $r^n$, $\|r\| > 1$ | $\pm\infty$ or diverges | Dual of $\|r\| < 1$ |
| $n^{1/n}$ | $1$ | Below |
| $c^{1/n}$, $c > 0$ | $1$ | Below |
| $x^n / n!$ | $0$ (for any $x$) | Below |
| $(1 + 1/n)^n$ | $e$ | Below |
| $(1 + x/n)^n$ | $e^x$ | Log + continuity |
| $n^k / a^n$, $a > 1$, $k > 0$ | $0$ (exp beats poly) | Ratio test idea |
| $\ln n / n^p$, $p > 0$ | $0$ | L'Hôpital or substitution |

### Proof: $r^n \to 0$ when $|r| < 1$

1. **Case $r = 0$:** constant zero sequence, trivially converges to $0$.

2. **Case $0 < |r| < 1$:** Write $|r| = \dfrac{1}{1 + h}$ where $h > 0$ (solving: $h = \dfrac{1}{|r|} - 1 > 0$).

3. By the binomial theorem (or Bernoulli's inequality):
$$(1 + h)^n \geq 1 + nh \geq nh.$$

4. Therefore
$$|r^n| = |r|^n = \frac{1}{(1 + h)^n} \leq \frac{1}{nh}.$$

5. Given $\varepsilon > 0$, choose $N$ with $N > \dfrac{1}{h \varepsilon}$ (Archimedean). For $n \geq N$:
$$|r^n - 0| \leq \frac{1}{nh} \leq \frac{1}{Nh} < \varepsilon. \quad \blacksquare$$

### Proof: $n^{1/n} \to 1$

1. For $n \geq 1$, we have $n^{1/n} \geq 1$. Write $n^{1/n} = 1 + h_n$ with $h_n \geq 0$.

2. By the binomial theorem:
$$n = (1 + h_n)^n = \sum_{k=0}^n \binom{n}{k} h_n^k \geq \binom{n}{2} h_n^2 = \frac{n(n-1)}{2} h_n^2.$$

3. Solving for $h_n$ (valid for $n \geq 2$):
$$h_n^2 \leq \frac{2}{n - 1}, \quad \text{i.e.,} \quad 0 \leq h_n \leq \sqrt{\frac{2}{n - 1}}.$$

4. Both bounds tend to $0$; by the squeeze theorem, $h_n \to 0$.

5. Hence $n^{1/n} = 1 + h_n \to 1$. $\blacksquare$

**Explicit $N$.** Given $\varepsilon > 0$: we need $h_n < \varepsilon$, i.e., $\sqrt{2/(n-1)} < \varepsilon$, i.e., $n > 1 + 2/\varepsilon^2$. Take $N = \lceil 2 + 2/\varepsilon^2 \rceil$.

### Proof: $c^{1/n} \to 1$ for $c > 0$

1. **Case $c = 1$:** trivial.

2. **Case $c > 1$:** Write $c^{1/n} = 1 + k_n$ with $k_n > 0$. By Bernoulli:
$$c = (1 + k_n)^n \geq 1 + n k_n,$$
so $k_n \leq (c - 1)/n \to 0$. Hence $c^{1/n} \to 1$.

3. **Case $0 < c < 1$:** Apply case 2 to $1/c > 1$: $(1/c)^{1/n} \to 1$. By reciprocal (algebra of limits), $c^{1/n} = 1 / (1/c)^{1/n} \to 1$. $\blacksquare$

### Proof: $x^n / n! \to 0$ for any fixed $x \in \mathbb{R}$

1. **Setup.** Fix $x \in \mathbb{R}$ and set $a_n := |x|^n / n! \geq 0$. It suffices to show $a_n \to 0$ (by Corollary 9.9).

2. **Choose $N_0$ so that $N_0 > 2|x|$.** Archimedean property: such $N_0$ exists.

3. **Bound the tail.** For $n > N_0$:
$$a_n = \frac{|x|^n}{n!} = \frac{|x|^{N_0}}{N_0!} \cdot \prod_{k = N_0 + 1}^{n} \frac{|x|}{k}.$$
For each $k \geq N_0 + 1 > 2|x|$: $|x|/k < 1/2$. Hence
$$a_n \leq \frac{|x|^{N_0}}{N_0!} \cdot \left(\frac{1}{2}\right)^{n - N_0} = C \cdot \left(\frac{1}{2}\right)^n,$$
where $C := \dfrac{|x|^{N_0} \cdot 2^{N_0}}{N_0!}$ is a fixed positive constant.

4. Since $(1/2)^n \to 0$ (by the first standard limit proved above), $a_n \leq C \cdot (1/2)^n \to 0$, so $a_n \to 0$ by squeeze. $\blacksquare$

### Proof: $(1 + 1/n)^n \to e$

Define $e_n := (1 + 1/n)^n$. We show that $(e_n)$ is increasing and bounded above; MCT then gives convergence, and the limit is by definition called $e$.

**Monotonicity.** (A full proof is in [[08-sequences-introduction]] Problem 4.) Sketch: by the AM-GM inequality applied to $n$ copies of $1 + 1/n$ and one copy of $1$, one shows $e_n < e_{n+1}$.

**Boundedness.** Expand by the binomial theorem:
$$e_n = \sum_{k=0}^n \binom{n}{k} \cdot \frac{1}{n^k} = \sum_{k=0}^n \frac{1}{k!} \cdot \underbrace{\frac{n(n-1)\cdots(n-k+1)}{n^k}}_{\leq 1}.$$
The product in the underbrace equals $\prod_{j=0}^{k-1} (1 - j/n) \leq 1$. Hence
$$e_n \leq \sum_{k=0}^n \frac{1}{k!} \leq 1 + 1 + \frac{1}{2} + \frac{1}{2^2} + \cdots + \frac{1}{2^{n-1}} < 1 + 2 = 3,$$
using $k! \geq 2^{k-1}$ for $k \geq 1$.

Thus $(e_n)$ is increasing and bounded above by $3$; MCT gives convergence, and we define
$$e := \lim_{n \to \infty} \left(1 + \frac{1}{n}\right)^n \in [2, 3]. \quad \blacksquare$$

---

## 9.10 Sequences Defined by Recursion

Many practical sequences are defined by $x_{n+1} = f(x_n)$ — a **dynamical system**. The standard three-step technique:

1. **Existence.** Show $(x_n)$ is bounded and monotonic (possibly by induction), then apply MCT to conclude $x_n \to L$ for some $L \in \mathbb{R}$.

2. **Identify the limit.** If $f$ is continuous at $L$, then $x_{n+1} = f(x_n) \to f(L)$. But $(x_{n+1})$ is also a tail of $(x_n)$, hence converges to the same $L$. Uniqueness (Theorem 9.2) gives the **fixed-point equation**
$$L = f(L).$$

3. **Select the correct root.** The fixed-point equation may have multiple roots; use additional information (e.g., bounds from step 1) to identify the correct one.

### Worked recursion: $x_{n+1} = \sqrt{2 + x_n}$, $x_1 = 0$

**Step 1: boundedness.** Claim: $0 \leq x_n \leq 2$ for all $n$.

*Base.* $x_1 = 0 \in [0, 2]$. ✓

*Inductive step.* Suppose $0 \leq x_n \leq 2$. Then $2 \leq 2 + x_n \leq 4$, so $\sqrt{2} \leq x_{n+1} \leq 2$. In particular $0 \leq x_{n+1} \leq 2$. ✓

**Step 2: monotonicity.** Claim: $(x_n)$ is increasing.

$x_{n+1}^2 - x_n^2 = (2 + x_n) - x_n^2 = -(x_n^2 - x_n - 2) = -(x_n - 2)(x_n + 1)$. For $x_n \in [0, 2]$: $(x_n - 2) \leq 0$ and $(x_n + 1) > 0$, so $-(x_n - 2)(x_n + 1) \geq 0$, i.e., $x_{n+1}^2 \geq x_n^2$. Since both are non-negative, $x_{n+1} \geq x_n$. ✓

**Step 3: MCT.** Increasing and bounded above by $2$ $\Rightarrow$ $x_n \to L$ for some $L \in [0, 2]$.

**Step 4: fixed point.** Take limits in $x_{n+1} = \sqrt{2 + x_n}$:
$$L = \sqrt{2 + L} \ \Rightarrow\ L^2 = 2 + L \ \Rightarrow\ L^2 - L - 2 = 0 \ \Rightarrow\ (L - 2)(L + 1) = 0 \ \Rightarrow\ L = 2 \text{ or } L = -1.$$

**Step 5: select root.** Since $L \in [0, 2]$, $L = -1$ is excluded. Hence $L = 2$. $\blacksquare$

### Worked recursion: Heron/Newton for $\sqrt{a}$

$x_{n+1} = \dfrac{1}{2}\left(x_n + \dfrac{a}{x_n}\right)$ with $x_1 > 0$ and $a > 0$.

**Step 1: $x_n \geq \sqrt{a}$ for $n \geq 2$.** By AM-GM: $x_{n+1} = \tfrac{1}{2}(x_n + a/x_n) \geq \sqrt{x_n \cdot a/x_n} = \sqrt{a}$.

**Step 2: eventually decreasing.** For $n \geq 2$ (so $x_n \geq \sqrt{a}$, hence $x_n^2 \geq a$):
$$x_{n+1} - x_n = \frac{a - x_n^2}{2 x_n} \leq 0.$$

**Step 3: MCT.** Decreasing from $n = 2$ onward, bounded below by $\sqrt{a}$ $\Rightarrow$ $x_n \to L \geq \sqrt{a}$.

**Step 4: fixed point.** $L = \tfrac{1}{2}(L + a/L) \Rightarrow 2L^2 = L^2 + a \Rightarrow L^2 = a \Rightarrow L = \pm\sqrt{a}$. Since $L > 0$, $L = \sqrt{a}$. $\blacksquare$

---

## Worked Examples

### Example 1 (Direct $\varepsilon$-$N$: $1/n^2 \to 0$)

**Setup.** Prove $\dfrac{1}{n^2} \to 0$ directly from Definition 9.1.

**Strategy.** Given $\varepsilon > 0$, we seek $N$ such that $1/n^2 < \varepsilon$ for $n \geq N$, i.e., $n^2 > 1/\varepsilon$, i.e., $n > 1/\sqrt{\varepsilon}$.

**Computation.**

1. Fix $\varepsilon > 0$ arbitrary.
2. By the Archimedean property, there exists $N \in \mathbb{N}$ with $N > 1/\sqrt{\varepsilon}$. (Explicitly: $N = \lceil 1/\sqrt{\varepsilon} \rceil + 1$.)
3. For any $n \geq N$: $n^2 \geq N^2 > 1/\varepsilon$, so
$$\left| \frac{1}{n^2} - 0 \right| = \frac{1}{n^2} < \varepsilon.$$

**Verification.** Let $\varepsilon = 0.01$. Then $1/\sqrt{\varepsilon} = 10$, so $N = 11$ works: $1/11^2 = 1/121 \approx 0.00826 < 0.01$. ✓

**Interpretation.** The cutoff $N$ depends on $\varepsilon$ like $1/\sqrt{\varepsilon}$ — quadratically faster decay than $1/n$, so we need proportionally fewer terms to achieve tolerance $\varepsilon$. $\blacksquare$

---

### Example 2 (Rational function limit)

**Setup.** Compute $\displaystyle\lim_{n \to \infty} \dfrac{3n^2 + 2n - 1}{n^2 - 5n + 6}$.

**Strategy.** Divide numerator and denominator by the highest power of $n$ that appears, here $n^2$. Then apply algebra of limits.

**Computation.**

1. Divide:
$$\frac{3n^2 + 2n - 1}{n^2 - 5n + 6} = \frac{3 + 2/n - 1/n^2}{1 - 5/n + 6/n^2}.$$

2. Apply standard limits: $1/n \to 0$, $1/n^2 \to 0$.

3. Apply Theorem 9.5(1,2): $2/n \to 0$, $-1/n^2 \to 0$, so numerator $\to 3 + 0 - 0 = 3$. Similarly denominator $\to 1 - 0 + 0 = 1$.

4. Apply Theorem 9.5(4) (quotient, denominator nonzero): ratio $\to 3/1 = 3$.

**Verification.** Check $n = 100$: $(30201)/(9506) \approx 3.1771$. Check $n = 1000$: $(3002001)/(995006) \approx 3.0171$. Trend toward $3$. ✓

**Interpretation.** The leading terms $3n^2$ and $n^2$ dominate; the limit is the ratio of leading coefficients. This is the standard recipe for rational-function limits.

$\blacksquare$

---

### Example 3 (Squeeze with floor function)

**Setup.** Compute $\displaystyle\lim_{n \to \infty} \dfrac{\lfloor n\pi \rfloor}{n}$.

**Strategy.** The floor function satisfies $x - 1 < \lfloor x \rfloor \leq x$. Apply to $x = n\pi$ and squeeze.

**Computation.**

1. For any real $x$: $x - 1 < \lfloor x \rfloor \leq x$. Substituting $x = n\pi$:
$$n\pi - 1 < \lfloor n\pi \rfloor \leq n\pi.$$

2. Divide by $n > 0$:
$$\pi - \frac{1}{n} < \frac{\lfloor n\pi \rfloor}{n} \leq \pi.$$

3. The lower bound $\pi - 1/n \to \pi - 0 = \pi$ (algebra of limits).
   The upper bound $\pi$ is a constant, $\to \pi$.

4. By squeeze (Theorem 9.8), $\dfrac{\lfloor n\pi \rfloor}{n} \to \pi$.

**Verification.** $n = 1000$: $\lfloor 1000\pi \rfloor = 3141$, so ratio $= 3.141$, close to $\pi \approx 3.14159$. ✓

**Interpretation.** The rounding error is at most $1/n$, which vanishes; the floor function becomes invisible in the limit.

$\blacksquare$

---

### Example 4 ($\sqrt{n+1} - \sqrt{n} \to 0$: rationalization)

**Setup.** Show $\sqrt{n+1} - \sqrt{n} \to 0$.

**Strategy.** A difference of square roots is notoriously a $0 \cdot \infty$-type expression. Multiply by the conjugate $\sqrt{n+1} + \sqrt{n}$ to rationalize.

**Computation.**

1. Multiply and divide by the conjugate:
$$\sqrt{n+1} - \sqrt{n} = \frac{(\sqrt{n+1} - \sqrt{n})(\sqrt{n+1} + \sqrt{n})}{\sqrt{n+1} + \sqrt{n}} = \frac{(n+1) - n}{\sqrt{n+1} + \sqrt{n}} = \frac{1}{\sqrt{n+1} + \sqrt{n}}.$$

2. For $n \geq 1$: $\sqrt{n+1} + \sqrt{n} \geq 2\sqrt{n}$ (since $\sqrt{n+1} \geq \sqrt{n}$), so
$$0 \leq \sqrt{n+1} - \sqrt{n} = \frac{1}{\sqrt{n+1} + \sqrt{n}} \leq \frac{1}{2\sqrt{n}}.$$

3. Since $1/(2\sqrt{n}) \to 0$ (standard limit), by squeeze $\sqrt{n+1} - \sqrt{n} \to 0$.

**Verification.** $n = 10000$: $\sqrt{10001} - \sqrt{10000} \approx 100.00499988 - 100 = 0.00499988$. Expected $\approx 1/(2\sqrt{10000}) = 1/200 = 0.005$. ✓

**Interpretation.** The conjugate trick is the analytic analogue of "rationalizing denominators" in algebra — it converts an indeterminate form into a manageable quotient. Note the asymptotic is $\sim 1/(2\sqrt{n})$, so convergence is slow.

$\blacksquare$

---

### Example 5 (Continuity of square root along sequences)

**Setup.** If $x_n \to L$ with $L > 0$, show $\sqrt{x_n} \to \sqrt{L}$.

**Strategy.** Use the identity $\sqrt{x_n} - \sqrt{L} = (x_n - L)/(\sqrt{x_n} + \sqrt{L})$, then bound the denominator below.

**Computation.**

1. **Bound $\sqrt{x_n}$ away from $0$.** Since $x_n \to L > 0$, apply convergence at $\varepsilon_0 = L/2 > 0$: there exists $N_0$ with $|x_n - L| < L/2$ for $n \geq N_0$, hence $x_n > L/2 > 0$ and $\sqrt{x_n} > \sqrt{L/2}$.

2. **Identity.** For $n \geq N_0$:
$$|\sqrt{x_n} - \sqrt{L}| = \left|\frac{(\sqrt{x_n} - \sqrt{L})(\sqrt{x_n} + \sqrt{L})}{\sqrt{x_n} + \sqrt{L}}\right| = \frac{|x_n - L|}{\sqrt{x_n} + \sqrt{L}} \leq \frac{|x_n - L|}{\sqrt{L}}.$$

3. **Fix $\varepsilon > 0$.** Apply $x_n \to L$ at tolerance $\varepsilon \sqrt{L}$: there exists $N_1$ with $|x_n - L| < \varepsilon \sqrt{L}$ for $n \geq N_1$.

4. For $n \geq \max(N_0, N_1)$:
$$|\sqrt{x_n} - \sqrt{L}| \leq \frac{|x_n - L|}{\sqrt{L}} < \frac{\varepsilon \sqrt{L}}{\sqrt{L}} = \varepsilon. \quad \blacksquare$$

**Verification.** This is the sequential form of continuity of $\sqrt{\cdot}$ at $L > 0$. The bound on the denominator is what we need: $\sqrt{L}$ appears because we are at the point $L$. (At $L = 0$, the denominator can vanish and a separate argument is needed.)

**Interpretation.** The identity $|\sqrt{a} - \sqrt{b}| = |a - b|/(\sqrt{a} + \sqrt{b})$ is the "square root conjugate trick" — essential whenever working with $\sqrt{\cdot}$. It shows $\sqrt{\cdot}$ is *Lipschitz* on $[L/2, \infty)$ with constant $1/(2\sqrt{L/2})$.

$\blacksquare$

---

## Practice Problems

1. Using the $\varepsilon$-$N$ definition directly, prove $\dfrac{2n+1}{n+1} \to 2$.

2. Compute the limits (if they exist):
   - (a) $\displaystyle\lim_{n\to\infty} \dfrac{n^3 + 2n}{2n^3 - n^2 + 1}$
   - (b) $\displaystyle\lim_{n\to\infty} n[\ln(n+1) - \ln n]$
   - (c) $\displaystyle\lim_{n\to\infty} (\sqrt{n^2 + n} - n)$

3. Show that $(1 + 1/n)^n \to e$ implies $(1 - 1/n)^n \to 1/e$.

4. If $x_n \to L$, show $\dfrac{x_1 + x_2 + \cdots + x_n}{n} \to L$ (**Cesàro mean theorem**).

5. Prove: if $a_n \to 0$ and $(b_n)$ is bounded, then $a_n b_n \to 0$.

### Solutions

---

**Solution 1.** Prove $\dfrac{2n+1}{n+1} \to 2$ via direct $\varepsilon$-$N$.

**Setup.** Compute and bound the error term, then solve for $N$.

**Strategy.** Simplify $|x_n - 2|$ algebraically to a function of $n$ that visibly tends to $0$; choose $N$ via Archimedean.

**Computation.**

1. **Simplify the error.** For $n \geq 1$:
$$\left|\frac{2n+1}{n+1} - 2\right| = \left|\frac{2n + 1 - 2(n+1)}{n+1}\right| = \left|\frac{2n + 1 - 2n - 2}{n+1}\right| = \left|\frac{-1}{n+1}\right| = \frac{1}{n+1}.$$

2. **Solve for $n$.** We need $1/(n+1) < \varepsilon$, i.e., $n + 1 > 1/\varepsilon$, i.e., $n > 1/\varepsilon - 1$.

3. **Choose $N$.** Given $\varepsilon > 0$, by Archimedean property choose $N \in \mathbb{N}$ with $N > 1/\varepsilon - 1$ (equivalently, $N > 1/\varepsilon$ works too — conservative but correct). Take $N := \lceil 1/\varepsilon \rceil$.

4. **Verify.** For $n \geq N$:
$$\left|\frac{2n+1}{n+1} - 2\right| = \frac{1}{n+1} \leq \frac{1}{N+1} < \frac{1}{1/\varepsilon} = \varepsilon. \quad \blacksquare$$

**Check.** $\varepsilon = 0.01$: $N = 100$. $(2 \cdot 100 + 1)/(101) = 201/101 \approx 1.9901$, error $\approx 0.0099 < 0.01$. ✓

**Interpretation.** The convergence rate is $O(1/n)$ — the typical rate for rational-function-type convergences. $\blacksquare$

---

**Solution 2(a).** $\displaystyle\lim_{n\to\infty} \dfrac{n^3 + 2n}{2n^3 - n^2 + 1}$.

**Strategy.** Divide by highest power $n^3$; apply algebra of limits.

**Computation.**

1. Divide numerator and denominator by $n^3$:
$$\frac{n^3 + 2n}{2n^3 - n^2 + 1} = \frac{1 + 2/n^2}{2 - 1/n + 1/n^3}.$$

2. As $n \to \infty$: $2/n^2 \to 0$, $1/n \to 0$, $1/n^3 \to 0$.

3. Apply algebra of limits (sum and quotient rules; denominator $\to 2 \neq 0$):
$$\text{numerator} \to 1 + 0 = 1, \quad \text{denominator} \to 2 - 0 + 0 = 2, \quad \text{ratio} \to \frac{1}{2}.$$

**Answer.** $\boxed{1/2}$. $\blacksquare$

---

**Solution 2(b).** $\displaystyle\lim_{n \to \infty} n[\ln(n+1) - \ln n]$.

**Strategy.** Combine logarithms and connect to the defining limit of $e$.

**Computation.**

1. **Combine:**
$$n[\ln(n+1) - \ln n] = n \ln\left(\frac{n+1}{n}\right) = n \ln\left(1 + \frac{1}{n}\right).$$

2. **Pull $n$ inside the log as an exponent:**
$$n \ln\left(1 + \frac{1}{n}\right) = \ln\left[\left(1 + \frac{1}{n}\right)^n\right].$$

3. **Apply the standard limit $(1 + 1/n)^n \to e$.** By continuity of $\ln$ (proved in later chapter [[16-continuity]]):
$$\ln\left[\left(1 + \frac{1}{n}\right)^n\right] \to \ln(e) = 1.$$

**Answer.** $\boxed{1}$. $\blacksquare$

**Alternative (Taylor).** For $|x|$ small, $\ln(1 + x) = x - x^2/2 + O(x^3)$. Substituting $x = 1/n$:
$$n \ln(1 + 1/n) = n \cdot [1/n - 1/(2n^2) + O(1/n^3)] = 1 - 1/(2n) + O(1/n^2) \to 1. \quad \checkmark$$

---

**Solution 2(c).** $\displaystyle\lim_{n \to \infty} (\sqrt{n^2 + n} - n)$.

**Strategy.** Difference of square-root-like quantities — rationalize by multiplying by the conjugate $\sqrt{n^2 + n} + n$.

**Computation.**

1. **Rationalize:**
$$\sqrt{n^2 + n} - n = \frac{(\sqrt{n^2+n} - n)(\sqrt{n^2+n} + n)}{\sqrt{n^2+n} + n} = \frac{(n^2 + n) - n^2}{\sqrt{n^2+n} + n} = \frac{n}{\sqrt{n^2+n} + n}.$$

2. **Divide numerator and denominator by $n > 0$:**
$$\frac{n}{\sqrt{n^2+n} + n} = \frac{1}{\sqrt{n^2+n}/n + 1} = \frac{1}{\sqrt{1 + 1/n} + 1}.$$

3. **Apply $1/n \to 0$ and continuity of $\sqrt{\cdot}$ at $1$** (Example 5):
$$\sqrt{1 + 1/n} \to \sqrt{1} = 1, \quad \text{denominator} \to 1 + 1 = 2.$$

4. **Quotient rule:** limit $= 1/2$.

**Answer.** $\boxed{1/2}$. $\blacksquare$

**Geometric sanity check.** $\sqrt{n^2 + n} = n\sqrt{1 + 1/n} \approx n(1 + 1/(2n)) = n + 1/2$, so the difference $\approx 1/2$.

---

**Solution 3.** Deduce $(1 - 1/n)^n \to 1/e$ from $(1 + 1/n)^n \to e$.

**Strategy.** Rewrite $(1 - 1/n)^n$ in terms of $(1 + 1/m)^m$ for some suitable $m = m(n)$.

**Computation.**

1. **Algebraic rearrangement.**
$$\left(1 - \frac{1}{n}\right)^n = \left(\frac{n-1}{n}\right)^n = \left(\frac{n}{n-1}\right)^{-n} = \left[\left(1 + \frac{1}{n-1}\right)^n\right]^{-1}.$$

2. **Analyze the inner expression** $\left(1 + \dfrac{1}{n-1}\right)^n$.
$$\left(1 + \frac{1}{n-1}\right)^n = \left(1 + \frac{1}{n-1}\right)^{n-1} \cdot \left(1 + \frac{1}{n-1}\right).$$

3. **Take limits of each factor.**
   - Set $m := n - 1$; then $m \to \infty$ as $n \to \infty$, and $\left(1 + \dfrac{1}{m}\right)^m \to e$ by the standard limit.
   - $\left(1 + \dfrac{1}{n-1}\right) \to 1 + 0 = 1$ by algebra of limits.

4. **Product rule:**
$$\left(1 + \frac{1}{n-1}\right)^n = \underbrace{\left(1 + \frac{1}{n-1}\right)^{n-1}}_{\to e} \cdot \underbrace{\left(1 + \frac{1}{n-1}\right)}_{\to 1} \to e \cdot 1 = e.$$

5. **Reciprocal rule:**
$$\left(1 - \frac{1}{n}\right)^n = \left[\left(1 + \frac{1}{n-1}\right)^n\right]^{-1} \to \frac{1}{e}. \quad \blacksquare$$

**Verification.** $n = 1000$: $(0.999)^{1000} \approx 0.3677$, and $1/e \approx 0.3679$. ✓

**Interpretation.** The "index shift" $n \mapsto n - 1$ is a common maneuver; it works because subsequences of a convergent sequence converge to the same limit (Theorem 9.10(5)).

---

**Solution 4 (Cesàro mean theorem).** If $x_n \to L$, then $\sigma_n := \dfrac{x_1 + \cdots + x_n}{n} \to L$.

**Strategy.** Split the sum at a point $N_1$ chosen so that the "tail" terms $x_{N_1}, \ldots, x_n$ are all close to $L$. The head (finitely many terms) is dominated by $1/n$.

**Computation.**

1. **Fix $\varepsilon > 0$.**

2. **Apply $x_n \to L$ at tolerance $\varepsilon/2$:** there exists $N_1 \in \mathbb{N}$ with
$$|x_k - L| < \varepsilon/2 \quad \text{for all } k \geq N_1.$$

3. **Rewrite the Cesàro mean error.**
$$\sigma_n - L = \frac{1}{n}\sum_{k=1}^n (x_k - L).$$
Split the sum at index $N_1$:
$$\sigma_n - L = \underbrace{\frac{1}{n}\sum_{k=1}^{N_1 - 1}(x_k - L)}_{=: A_n} + \underbrace{\frac{1}{n}\sum_{k=N_1}^{n}(x_k - L)}_{=: B_n}.$$

4. **Bound $A_n$ (head).** Let $C := \sum_{k=1}^{N_1 - 1} |x_k - L|$, a finite constant (independent of $n$). Then $|A_n| \leq C/n$. Since $C/n \to 0$, there exists $N_2$ with $C/n < \varepsilon/2$ for $n \geq N_2$. Explicitly: $N_2 := \lceil 2C/\varepsilon \rceil + 1$.

5. **Bound $B_n$ (tail).** Using the triangle inequality and step 2:
$$|B_n| \leq \frac{1}{n} \sum_{k = N_1}^n |x_k - L| < \frac{1}{n} \cdot (n - N_1 + 1) \cdot \frac{\varepsilon}{2} \leq \frac{n}{n} \cdot \frac{\varepsilon}{2} = \frac{\varepsilon}{2}.$$

6. **Combine.** For $n \geq N := \max(N_1, N_2)$:
$$|\sigma_n - L| \leq |A_n| + |B_n| < \frac{\varepsilon}{2} + \frac{\varepsilon}{2} = \varepsilon. \quad \blacksquare$$

**Remark (strictness).** The Cesàro theorem admits a strict converse: **Cesàro convergence is strictly weaker than ordinary convergence**. Counterexample: $x_n = (-1)^n$ does not converge, but its Cesàro means $\sigma_n = \frac{(-1)^1 + \cdots + (-1)^n}{n} \in \{-1/n, 0\}$ converge to $0$.

**Significance.** Cesàro summability is the foundation of Fejér's theorem on Fourier series, of ergodic averages in dynamical systems, and of Abel/Tauberian summation in analytic number theory.

---

**Solution 5.** If $a_n \to 0$ and $(b_n)$ is bounded, then $a_n b_n \to 0$.

**Strategy.** Since $(b_n)$ is bounded but not necessarily convergent, we cannot invoke the product rule. Instead, bound $|a_n b_n|$ directly using $|b_n| \leq M$.

**Computation.**

1. **Setup.** Since $(b_n)$ is bounded, there exists $M > 0$ with $|b_n| \leq M$ for all $n$.

2. **Fix $\varepsilon > 0$.** Apply $a_n \to 0$ at tolerance $\varepsilon/M > 0$: there exists $N$ with
$$|a_n| = |a_n - 0| < \varepsilon/M \quad \text{for all } n \geq N.$$

3. **Combine.** For $n \geq N$:
$$|a_n b_n - 0| = |a_n| \cdot |b_n| < \frac{\varepsilon}{M} \cdot M = \varepsilon. \quad \blacksquare$$

**Caveat.** The hypothesis "$(b_n)$ bounded" cannot be dropped: $a_n = 1/n \to 0$ and $b_n = n$ is unbounded, yet $a_n b_n = 1$ does not tend to $0$.

**Standard application.** $\dfrac{\sin(n)}{n} = \dfrac{1}{n} \cdot \sin(n)$ where $a_n = 1/n \to 0$ and $b_n = \sin(n) \in [-1, 1]$ is bounded. Hence $\sin(n)/n \to 0$, reproving the example after Theorem 9.8.

---

## Related Topics

- [[08-sequences-introduction]] — bounded, monotonic setup; preliminary results.
- [[10-cauchy-sequences-completeness]] — the Cauchy criterion gives an intrinsic convergence test that does not require guessing the limit.
- [[11-bolzano-weierstrass]] — every bounded sequence has a convergent subsequence (extends Section 9.6's subsequence theme).
- [[13-series-convergence-tests]] — infinite series reduce to convergence of the partial-sum sequence.
- [[16-continuity]] — sequential continuity; $f$ continuous at $a$ iff $x_n \to a \Rightarrow f(x_n) \to f(a)$.
- [[18-important-limits-infinite-limits]] — comprehensive catalogue of standard limits with proofs.
