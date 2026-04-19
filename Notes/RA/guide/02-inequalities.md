# 2. Classical Inequalities

> **The toolkit of analysis.** Real analysis is the systematic study of approximation, and approximation is the language of inequalities. Every convergence argument, every error estimate, every bound on a norm ultimately reduces to one of a small handful of classical inequalities — and the relations among them are not accidental. This chapter proves all of them with full rigour, tracks equality cases (which are often where the content of a theorem lives), and shows how they chain together: **Young $\Rightarrow$ Hölder $\Rightarrow$ Minkowski**, with **Cauchy-Schwarz** sitting at the $p=2$ vertex.
>
> The reader who internalises these proofs has internalised half of graduate real analysis.

---

## 2.1 Why Inequalities Come First

Analysis is built from inequalities, not equations. "Limit $= L$" means "distance to $L$ can be made smaller than any $\varepsilon > 0$." "Series $\sum a_n$ converges" means "partial sums stay within a bounded interval." "$f$ is continuous at $x_0$" means "$|f(x) - f(x_0)|$ can be controlled by $|x - x_0|$." In every case the statement is *not* an equation but an **estimate**, and estimates require inequalities.

The five inequalities in this chapter — **Cauchy-Schwarz**, **AM-GM**, **Young**, **Hölder**, **Minkowski** — together with the **triangle inequality**, form a toolkit that recurs in:

- proofs of convergence of series (Cauchy-Schwarz bounds cross-terms);
- $L^p$ space theory (Hölder and Minkowski establish that $\|\cdot\|_p$ is a norm);
- probability (Cauchy-Schwarz gives covariance bounds, Hölder gives moment inequalities);
- Fourier analysis (Parseval is an equality case of Cauchy-Schwarz);
- PDE theory (Sobolev embeddings chain Hölder-type estimates).

They form a **small ladder** with well-defined rungs:

1. **AM-GM** and **Young** are elementary building blocks (both ultimately descend from concavity of $\log$).
2. **Cauchy-Schwarz** is the $p = q = 2$ special case of Hölder, but admits its own elegant discriminant proof.
3. **Hölder** generalises Cauchy-Schwarz using Young applied pointwise then summed.
4. **Minkowski** is the triangle inequality for the $\ell^p$-norm, and follows from Hölder by a clever split of $|a_k + b_k|^p$.

The **triangle inequality** $|x + y| \leq |x| + |y|$ for real numbers is the degenerate ($n = 1$) case of Minkowski and the foundation on which all the others ultimately rest.

---

## 2.2 The Triangle Inequality

> **Theorem 2.1 (Triangle inequality in $\mathbb{R}$).** For all $x, y \in \mathbb{R}$:
> $$|x + y| \leq |x| + |y|,$$
> with equality iff $x, y$ have the same sign (or one of them is $0$).

**Proof.**

*Step 1 (Reduction to a square).* Since $|\cdot|$ is non-negative, $|x + y| \leq |x| + |y|$ is equivalent to its square:
$$|x + y|^2 \leq (|x| + |y|)^2.$$

This equivalence uses monotonicity of $t \mapsto t^2$ on $[0, \infty)$: both sides are non-negative, so squaring preserves the inequality.

*Step 2 (Expand both sides).* Using $|t|^2 = t^2$ for real $t$,
$$|x + y|^2 = (x + y)^2 = x^2 + 2xy + y^2.$$
$$(|x| + |y|)^2 = |x|^2 + 2|x||y| + |y|^2 = x^2 + 2|xy| + y^2.$$

*Step 3 (Compare).* The difference is
$$(|x| + |y|)^2 - |x + y|^2 = 2|xy| - 2xy = 2(|xy| - xy).$$

*Step 4 (Apply $|t| \geq t$).* For every real $t$, $|t| \geq t$ (this is definitional: if $t \geq 0$ then $|t| = t$; if $t < 0$ then $|t| = -t > t$). Hence $|xy| - xy \geq 0$, so
$$(|x| + |y|)^2 - |x + y|^2 \geq 0.$$

*Step 5 (Conclude).* Taking square roots (both sides non-negative), $|x + y| \leq |x| + |y|$.

*Step 6 (Equality).* Equality in Step 4 holds iff $|xy| = xy$, i.e., iff $xy \geq 0$, i.e., iff $x, y$ are both non-negative or both non-positive (allowing zero). $\blacksquare$

**Sanity check.** Take $x = 3, y = -5$. Then $|x+y| = |-2| = 2$ while $|x|+|y| = 3 + 5 = 8$, and indeed $2 \leq 8$ strictly — consistent with $xy = -15 < 0$.

**Reverse triangle inequality.** A useful companion:
$$\bigl| |x| - |y| \bigr| \leq |x - y|.$$
**Proof.** Apply Theorem 2.1: $|x| = |(x - y) + y| \leq |x - y| + |y|$, so $|x| - |y| \leq |x - y|$. By symmetry (swapping $x, y$), $|y| - |x| \leq |x - y|$. Combining, $||x| - |y|| \leq |x - y|$. $\blacksquare$

**Interpretive remark.** The reverse triangle inequality is what makes the norm (or absolute value) a **Lipschitz-continuous function** with constant $1$: small changes in input produce at most equally small changes in $|x|$. This is implicitly used every time one writes "by continuity of the norm…"

**Vector generalisation.** For $x, y \in \mathbb{R}^n$ and any norm $\|\cdot\|$, $\|x + y\| \leq \|x\| + \|y\|$. The proof for $\|\cdot\|_2$ follows from Cauchy-Schwarz (§2.3); the general case is Minkowski (§2.6).

---

## 2.3 AM-GM Inequality (Preliminary)

> **Theorem 2.2 (AM-GM).** For non-negative reals $a_1, \ldots, a_n$:
> $$\frac{a_1 + a_2 + \cdots + a_n}{n} \geq \sqrt[n]{a_1 a_2 \cdots a_n}$$
> with equality iff $a_1 = a_2 = \cdots = a_n$.

The left side is the **arithmetic mean** $A_n$ and the right is the **geometric mean** $G_n$. The statement reads "arithmetic mean dominates geometric mean," and is one of the oldest non-trivial inequalities in mathematics.

### The base case $n = 2$

> **Lemma 2.3.** For $a, b \geq 0$: $\dfrac{a + b}{2} \geq \sqrt{ab}$, with equality iff $a = b$.

**Proof.**

*Step 1.* Since both sides are non-negative, the inequality is equivalent to its square (monotonicity of $t \mapsto t^2$ on $[0, \infty)$):
$$\left(\frac{a + b}{2}\right)^2 \geq ab.$$

*Step 2.* Multiply both sides by $4$:
$$(a + b)^2 \geq 4ab.$$

*Step 3.* Expand:
$$a^2 + 2ab + b^2 \geq 4ab \iff a^2 - 2ab + b^2 \geq 0 \iff (a - b)^2 \geq 0. \checkmark$$

*Step 4.* The final inequality is immediate (squares are non-negative), and equality holds iff $a - b = 0$, i.e., $a = b$. $\blacksquare$

### Proof of AM-GM via concavity of $\log$

**Proof (of Theorem 2.2).**

If any $a_i = 0$, then $G_n = 0$ and $A_n \geq 0$, so the inequality holds trivially (with equality iff all $a_i = 0$). Assume $a_i > 0$ for all $i$.

*Step 1 (Strict concavity of $\log$).* The function $\log : (0, \infty) \to \mathbb{R}$ has second derivative $(\log)''(x) = -1/x^2 < 0$, so $\log$ is **strictly concave**. By the $n$-point Jensen inequality for concave functions, for any $x_1, \ldots, x_n > 0$ and weights $\lambda_1, \ldots, \lambda_n \geq 0$ with $\sum \lambda_i = 1$:
$$\log\!\left(\sum_{i=1}^n \lambda_i x_i\right) \geq \sum_{i=1}^n \lambda_i \log(x_i),$$
with equality iff all $x_i$ with $\lambda_i > 0$ are equal.

*Step 2 (Specialise the weights).* Set $\lambda_i = 1/n$ and $x_i = a_i$. Then $\sum \lambda_i = 1$, and
$$\log\!\left(\frac{1}{n}\sum_{i=1}^n a_i\right) \geq \frac{1}{n}\sum_{i=1}^n \log(a_i) = \log\!\left(\prod_{i=1}^n a_i\right)^{\!1/n} = \log\!\left(\sqrt[n]{a_1 \cdots a_n}\right).$$

*Step 3 (Exponentiate).* Since $\exp$ is strictly increasing, the inequality is preserved:
$$\frac{a_1 + \cdots + a_n}{n} \geq \sqrt[n]{a_1 \cdots a_n}.$$

*Step 4 (Equality).* Strict concavity of $\log$ gives equality in Step 2 iff all $a_i$ are equal. $\blacksquare$

### Alternative proof: Cauchy's forward-backward induction

An elementary proof avoiding Jensen runs as follows. It is included because it reveals the combinatorial structure of AM-GM.

**Proof (sketch).**

*Forward step (doubling).* If AM-GM holds for $n$, it holds for $2n$: given $a_1, \ldots, a_{2n}$,
$$\frac{1}{2n}\sum_{i=1}^{2n} a_i = \frac{1}{2}\!\left(\frac{1}{n}\sum_{i=1}^n a_i + \frac{1}{n}\sum_{i=n+1}^{2n} a_i\right) \stackrel{n=2}{\geq} \sqrt{A_n^{(1)} A_n^{(2)}} \stackrel{\text{IH}}{\geq} \sqrt{G_n^{(1)} G_n^{(2)}} = G_{2n}.$$
(Here we applied the $n = 2$ case in the middle and the inductive hypothesis twice.)

*Backward step.* If AM-GM holds for $n$, it holds for $n - 1$: given $a_1, \ldots, a_{n-1}$, apply AM-GM for $n$ with a padded term $a_n = A_{n-1} := (a_1 + \cdots + a_{n-1})/(n-1)$. One computes $A_n = A_{n-1}$ and $G_n = (G_{n-1}^{n-1} A_{n-1})^{1/n}$, so $A_{n-1} \geq (G_{n-1}^{n-1} A_{n-1})^{1/n}$, giving $A_{n-1}^n \geq G_{n-1}^{n-1} A_{n-1}$, hence $A_{n-1}^{n-1} \geq G_{n-1}^{n-1}$, hence $A_{n-1} \geq G_{n-1}$.

Base case $n = 2$ by Lemma 2.3. Forward step reaches all powers of $2$; backward step fills in the gaps. Hence AM-GM holds for all $n \geq 1$. $\blacksquare$

**Sanity check ($n = 3$, $a = 1, b = 4, c = 4$).** $A_3 = 9/3 = 3$, $G_3 = \sqrt[3]{16} \approx 2.52$. Indeed $3 > 2.52$; equality would require $a = b = c$, which fails.

**Interpretive remark.** AM-GM says: given a fixed sum, the product is maximised by equal summands; given a fixed product, the sum is minimised by equal factors. This is a fundamental optimisation heuristic — for instance, it explains why a cube of given volume has the smallest surface area among rectangular boxes.

---

## 2.4 Cauchy-Schwarz Inequality

> **Theorem 2.4 (Cauchy-Schwarz).** For all real numbers $a_1, \ldots, a_n$ and $b_1, \ldots, b_n$:
> $$\boxed{\left|\sum_{k=1}^{n} a_k b_k\right| \leq \sqrt{\sum_{k=1}^{n} a_k^2} \cdot \sqrt{\sum_{k=1}^{n} b_k^2}}$$
> with equality iff the vectors $(a_1, \ldots, a_n)$ and $(b_1, \ldots, b_n)$ are **proportional**, i.e., there exist $\lambda, \mu \in \mathbb{R}$ not both zero with $\lambda a_k + \mu b_k = 0$ for all $k$.

### Proof (discriminant method)

**Proof.**

*Step 1 (Trivial case).* If $b_k = 0$ for all $k$, then the right side is $0$ and the left side is also $0$ (every term $a_k b_k = 0$); the inequality holds with equality, and the vectors are proportional (take $\lambda = 0, \mu = 1$). Henceforth assume $\sum b_k^2 > 0$.

*Step 2 (Define the quadratic).* For $t \in \mathbb{R}$, define
$$P(t) := \sum_{k=1}^n (a_k + t b_k)^2.$$
Since each summand is a square of a real number, $P(t) \geq 0$ for all $t \in \mathbb{R}$.

*Step 3 (Expand to quadratic form).* Expanding $(a_k + t b_k)^2 = a_k^2 + 2 t a_k b_k + t^2 b_k^2$ and summing:
$$P(t) = \underbrace{\sum b_k^2}_{=: B} \cdot t^2 + 2 \underbrace{\sum a_k b_k}_{=: C} \cdot t + \underbrace{\sum a_k^2}_{=: A}.$$

By Step 1, $B > 0$, so $P$ is a genuine quadratic in $t$ (not degenerate to linear or constant).

*Step 4 (Discriminant condition).* A quadratic $P(t) = Bt^2 + 2Ct + A$ with $B > 0$ satisfies $P(t) \geq 0$ for all $t \in \mathbb{R}$ iff its discriminant is non-positive:
$$\Delta := (2C)^2 - 4BA \leq 0 \iff 4C^2 \leq 4AB \iff C^2 \leq AB.$$

*Step 5 (Unpack).* Substituting $A, B, C$:
$$\left(\sum a_k b_k\right)^2 \leq \left(\sum a_k^2\right)\left(\sum b_k^2\right).$$

*Step 6 (Take square roots).* Both sides are non-negative; $t \mapsto \sqrt{t}$ is monotone increasing on $[0, \infty)$. Hence
$$\left|\sum a_k b_k\right| = \sqrt{\left(\sum a_k b_k\right)^2} \leq \sqrt{\left(\sum a_k^2\right)\left(\sum b_k^2\right)} = \sqrt{\sum a_k^2}\sqrt{\sum b_k^2}.$$

*Step 7 (Equality).* Equality in the discriminant ($\Delta = 0$) holds iff $P$ has a real double root $t_0$. At $t = t_0$:
$$P(t_0) = \sum_{k=1}^n (a_k + t_0 b_k)^2 = 0.$$
A sum of squares of reals equals zero iff each summand is zero, hence $a_k = -t_0 b_k$ for all $k$. Setting $\lambda = 1, \mu = t_0$, this gives $a_k + t_0 b_k = 0$, so $(a_k)$ and $(b_k)$ are proportional.

Conversely, if $a_k = c b_k$ for some scalar $c$ (or symmetrically), both sides of Cauchy-Schwarz equal $|c| \sum b_k^2$, so equality holds. $\blacksquare$

**Verification (equality test).** Take $a = (1, 2)$ and $b = (3, 6) = 3a$. Then
- LHS: $|a \cdot b| = |1\cdot 3 + 2 \cdot 6| = 15$.
- RHS: $\sqrt{5} \cdot \sqrt{45} = \sqrt{225} = 15$. $\checkmark$

Take $a = (1, 0)$ and $b = (0, 1)$ (orthogonal, not proportional).
- LHS: $0$. RHS: $1 \cdot 1 = 1$. Strict inequality. $\checkmark$

### Alternative proof: normalisation

**Proof (Schwarz's original idea).**

WLOG $A := \|a\|_2 > 0$ and $B := \|b\|_2 > 0$ (else equality with both sides zero). Set $\hat{a}_k = a_k/A$, $\hat{b}_k = b_k/B$ so that $\sum \hat{a}_k^2 = \sum \hat{b}_k^2 = 1$. Apply $2|xy| \leq x^2 + y^2$ (equivalent to $(|x| - |y|)^2 \geq 0$) with $x = \hat{a}_k, y = \hat{b}_k$:
$$2|\hat{a}_k \hat{b}_k| \leq \hat{a}_k^2 + \hat{b}_k^2.$$

Sum over $k$:
$$2 \sum_k |\hat{a}_k \hat{b}_k| \leq \sum_k \hat{a}_k^2 + \sum_k \hat{b}_k^2 = 2,$$
so $\sum_k |\hat{a}_k \hat{b}_k| \leq 1$, hence $\sum_k |a_k b_k| \leq AB$. Since $|\sum a_k b_k| \leq \sum |a_k b_k|$, the result follows. $\blacksquare$

**Remark.** This proof uses the $p = q = 2$ case of Young's inequality (proved in §2.5); it is the prototype of the Hölder proof.

### Integral form

> **Corollary 2.5 (Cauchy-Schwarz for integrals).** For $f, g$ Riemann integrable on $[a, b]$:
> $$\left|\int_a^b f(x)\, g(x)\, dx\right| \leq \sqrt{\int_a^b f(x)^2\, dx} \cdot \sqrt{\int_a^b g(x)^2\, dx}.$$

**Proof.** Define $P(t) := \int_a^b (f(x) + t\, g(x))^2\, dx \geq 0$, expand as
$$P(t) = \left(\int g^2\right) t^2 + 2\left(\int fg\right) t + \left(\int f^2\right),$$
and apply the discriminant argument verbatim. Equality iff $f = -t_0 g$ a.e. (in the Riemann sense, on a set whose complement has measure $0$ or is very sparse in a suitable sense — the precise Lebesgue statement is cleaner). $\blacksquare$

### Vector form

For $u, v \in \mathbb{R}^n$ with the standard inner product:
$$|u \cdot v| \leq \|u\|_2 \, \|v\|_2.$$
This is the statement that the **cosine** of the angle between two vectors, defined via $\cos\theta := u \cdot v / (\|u\|\|v\|)$, lies in $[-1, 1]$. The Cauchy-Schwarz inequality is thus the assertion that angles exist.

**Interpretive remark.** Cauchy-Schwarz is the inner-product-space manifestation of the triangle inequality: $\|u + v\|^2 = \|u\|^2 + 2 u \cdot v + \|v\|^2 \leq \|u\|^2 + 2\|u\|\|v\| + \|v\|^2 = (\|u\| + \|v\|)^2$, giving $\|u + v\| \leq \|u\| + \|v\|$.

---

## 2.5 Young's Inequality

> **Definition (Conjugate exponents).** Two numbers $p, q \in (1, \infty)$ are **conjugate exponents** if
> $$\frac{1}{p} + \frac{1}{q} = 1.$$

**Equivalent formulations.** Rearranging: $q = p/(p-1)$; or $pq = p + q$; or $(p-1)(q-1) = 1$.

**Examples.**
- $(p, q) = (2, 2)$ (self-conjugate).
- $(p, q) = (3, 3/2)$: $1/3 + 2/3 = 1$.
- $(p, q) = (4, 4/3)$: $1/4 + 3/4 = 1$.
- $(p, q) = (\infty, 1)$ (limit case): $1/p + 1/q = 1$ is then interpreted with $1/\infty = 0$.

As $p \to 1^+$, $q \to \infty$; as $p \to \infty$, $q \to 1^+$. The map $p \mapsto q$ is a decreasing involution on $(1, \infty)$ with fixed point $p = 2$.

> **Theorem 2.6 (Young's Inequality).** Let $p, q \in (1, \infty)$ be conjugate exponents. For all $a, b \geq 0$:
> $$\boxed{\,ab \leq \frac{a^p}{p} + \frac{b^q}{q}\,}$$
> with equality iff $a^p = b^q$.

### Proof (via strict concavity of $\log$)

**Proof.**

*Step 1 (Trivial boundary cases).* If $a = 0$: LHS $= 0$, RHS $= b^q/q \geq 0$, so the inequality holds. Equality iff $b^q/q = 0$, i.e., $b = 0$; then $a^p = b^q = 0$ as claimed. Symmetrically for $b = 0$. Henceforth assume $a > 0$ and $b > 0$.

*Step 2 (Concavity of $\log$).* As noted in §2.3, $\log$ is strictly concave on $(0, \infty)$. For weights $\lambda, \mu \geq 0$ with $\lambda + \mu = 1$ and points $x, y > 0$:
$$\log(\lambda x + \mu y) \geq \lambda \log x + \mu \log y, \quad\text{equality iff } x = y \text{ or } \lambda \in \{0, 1\}.$$

*Step 3 (Choose parameters).* Set
$$\lambda = \frac{1}{p}, \quad \mu = \frac{1}{q}, \quad x = a^p, \quad y = b^q.$$

The weights satisfy $\lambda + \mu = 1/p + 1/q = 1$ by the conjugacy relation. Both $x, y > 0$ since $a, b > 0$.

*Step 4 (Apply Step 2).*
$$\log\!\left(\frac{a^p}{p} + \frac{b^q}{q}\right) = \log\!\left(\lambda x + \mu y\right) \geq \lambda \log x + \mu \log y = \frac{1}{p}\log(a^p) + \frac{1}{q}\log(b^q).$$

*Step 5 (Simplify RHS of Step 4).* Using $\log(a^p) = p \log a$:
$$\frac{1}{p} \cdot p \log a + \frac{1}{q} \cdot q \log b = \log a + \log b = \log(ab).$$

*Step 6 (Exponentiate).* Exponentiation is strictly increasing on $\mathbb{R}$, so
$$\frac{a^p}{p} + \frac{b^q}{q} \geq e^{\log(ab)} = ab.$$

*Step 7 (Equality).* By the equality clause in Step 2, equality in Young iff $x = y$, i.e., $a^p = b^q$. $\blacksquare$

### Proof (via the area under a curve)

This geometric proof of Young was given by Young himself.

**Proof.**

Consider the function $\varphi(x) = x^{p-1}$ on $[0, \infty)$. Its inverse is $\varphi^{-1}(y) = y^{1/(p-1)} = y^{q-1}$ (using $q - 1 = 1/(p-1)$ from $(p-1)(q-1) = 1$).

For $a, b \geq 0$, consider the rectangle $[0, a] \times [0, b]$ in the $(x, y)$-plane. The curve $y = \varphi(x)$ passes through this rectangle. The area under the curve from $0$ to $a$ is
$$\int_0^a x^{p-1}\, dx = \frac{a^p}{p}.$$
The area to the left of the curve from $0$ to $b$ (equivalently, under $\varphi^{-1}$) is
$$\int_0^b y^{q-1}\, dy = \frac{b^q}{q}.$$

These two regions together cover the rectangle $[0, a] \times [0, b]$ (possibly with overlap, never with gaps), so their areas sum to at least the rectangle's area:
$$\frac{a^p}{p} + \frac{b^q}{q} \geq ab.$$

Equality iff the point $(a, b)$ lies on the curve $y = \varphi(x)$, i.e., $b = a^{p-1}$, i.e., $b^q = a^{q(p-1)} = a^p$ (using $q(p-1) = p$). $\blacksquare$

**Sanity check ($p = q = 2$).** Young becomes $ab \leq a^2/2 + b^2/2$, equivalent to $(a - b)^2 \geq 0$, with equality iff $a = b$, i.e., $a^p = a^2 = b^2 = b^q$. $\checkmark$

**Sanity check ($p = 4, q = 4/3$, $a = 1, b = 1$).** RHS $= 1/4 + 3/4 = 1 = ab$. Equality since $a^p = b^q = 1$. $\checkmark$

### Special case $p = q = 2$

Young reduces to
$$ab \leq \frac{a^2 + b^2}{2} \iff 2ab \leq a^2 + b^2 \iff (a - b)^2 \geq 0.$$

This is the **polarisation-style** inequality underlying the AM-GM for $n = 2$ and the Cauchy-Schwarz proof.

### Weighted form

> **Theorem 2.7 (Weighted Young).** For $a, b \geq 0$, $\varepsilon > 0$, and conjugate $p, q$:
> $$ab \leq \frac{\varepsilon a^p}{p} + \frac{b^q}{\varepsilon^{q/p} \, q}.$$

**Proof.** Apply Theorem 2.6 to $a' = \varepsilon^{1/p} a$ and $b' = \varepsilon^{-1/p} b$: $a' b' = ab$, and
$$a'b' \leq \frac{(a')^p}{p} + \frac{(b')^q}{q} = \frac{\varepsilon a^p}{p} + \frac{\varepsilon^{-q/p} b^q}{q}. \blacksquare$$

**Interpretive remark.** The parameter $\varepsilon$ lets one trade off the two terms — useful in PDE and interpolation arguments where one term is "bad" and should be absorbed.

---

## 2.6 Hölder's Inequality

> **Theorem 2.8 (Hölder).** Let $p, q \in (1, \infty)$ be conjugate exponents. For all real (or complex) $a_1, \ldots, a_n$ and $b_1, \ldots, b_n$:
> $$\boxed{\sum_{k=1}^n |a_k b_k| \leq \left(\sum_{k=1}^n |a_k|^p\right)^{1/p} \left(\sum_{k=1}^n |b_k|^q\right)^{1/q}.}$$
> Equality iff there exist $\lambda, \mu \geq 0$, not both zero, with $\lambda |a_k|^p = \mu |b_k|^q$ for all $k$.

For $p = q = 2$, Hölder reduces to Cauchy-Schwarz.

### Proof (via Young, normalisation)

**Proof.**

*Step 1 (Notation).* Write
$$A := \left(\sum_{k=1}^n |a_k|^p\right)^{1/p}, \qquad B := \left(\sum_{k=1}^n |b_k|^q\right)^{1/q}.$$

*Step 2 (Trivial case).* If $A = 0$, then $\sum |a_k|^p = 0$, which (since each $|a_k|^p \geq 0$) forces $a_k = 0$ for all $k$. Then $\sum |a_k b_k| = 0 = AB$, equality holds, and the proportionality condition is satisfied with $\lambda = 1, \mu = 0$. Symmetrically for $B = 0$. Henceforth assume $A > 0$ and $B > 0$.

*Step 3 (Normalise).* Define
$$\alpha_k := \frac{|a_k|}{A}, \qquad \beta_k := \frac{|b_k|}{B}.$$
Then $\sum_k \alpha_k^p = A^{-p} \sum_k |a_k|^p = A^{-p} \cdot A^p = 1$, and similarly $\sum_k \beta_k^q = 1$.

*Step 4 (Pointwise Young).* Apply Theorem 2.6 with $a = \alpha_k, b = \beta_k$:
$$\alpha_k \beta_k \leq \frac{\alpha_k^p}{p} + \frac{\beta_k^q}{q} \quad \text{for each } k = 1, \ldots, n.$$

*Step 5 (Sum over $k$).* Summation is linear, so
$$\sum_{k=1}^n \alpha_k \beta_k \leq \frac{1}{p}\sum_{k=1}^n \alpha_k^p + \frac{1}{q}\sum_{k=1}^n \beta_k^q = \frac{1}{p} \cdot 1 + \frac{1}{q} \cdot 1 = \frac{1}{p} + \frac{1}{q} = 1.$$

*Step 6 (Denormalise).* Multiply both sides by $AB$:
$$\sum_{k=1}^n \frac{|a_k|}{A} \cdot \frac{|b_k|}{B} \cdot AB = \sum_k |a_k b_k| \leq AB = \left(\sum |a_k|^p\right)^{1/p}\left(\sum |b_k|^q\right)^{1/q}.$$

*Step 7 (Equality).* Equality in Step 4 holds for index $k$ iff $\alpha_k^p = \beta_k^q$. For equality in Step 5 (the summed inequality), this must hold for **every** $k$ with $\alpha_k > 0$ or $\beta_k > 0$. Equivalently, $|a_k|^p / A^p = |b_k|^q / B^q$, i.e., $B^q |a_k|^p = A^p |b_k|^q$ for all $k$. Setting $\lambda = B^q, \mu = A^p$ gives the stated condition. $\blacksquare$

**Verification.** With $a = (1, 2, 3), b = (1, 1, 1), p = 3, q = 3/2$:
- LHS: $|1| + |2| + |3| = 6$.
- RHS: $(1 + 8 + 27)^{1/3} \cdot (1 + 1 + 1)^{2/3} = 36^{1/3} \cdot 3^{2/3} = (36 \cdot 9)^{1/3} \cdot \dots$

Let me recompute: $36^{1/3} \approx 3.302$, $3^{2/3} \approx 2.080$, product $\approx 6.869$. Indeed $6 \leq 6.869$. $\checkmark$

Equality would require $|a_k|^3 \propto |b_k|^{3/2}$, i.e., $|a_k|^2 \propto |b_k|$, which fails here.

### Proof ($p = 1, q = \infty$ case)

> **Corollary 2.9.** For all $a_1, \ldots, a_n$ and $b_1, \ldots, b_n$:
> $$\sum_{k=1}^n |a_k b_k| \leq \left(\sum_{k=1}^n |a_k|\right) \cdot \max_{1 \leq k \leq n} |b_k|.$$

**Proof.** $|a_k b_k| = |a_k| |b_k| \leq |a_k| \cdot \max_j |b_j|$ for each $k$. Sum: $\sum_k |a_k b_k| \leq (\sum_k |a_k|) \max_j |b_j|$. $\blacksquare$

This is the $p = 1, q = \infty$ "limit case" of Hölder, where $\|b\|_\infty := \max |b_k|$.

### Integral form

> **Corollary 2.10 (Hölder for integrals).** For $f, g$ measurable on $[a, b]$ and conjugate $p, q \in (1, \infty)$:
> $$\int_a^b |f(x) g(x)|\, dx \leq \left(\int_a^b |f|^p\right)^{1/p} \left(\int_a^b |g|^q\right)^{1/q}.$$

**Proof.** The argument of Theorem 2.8 transfers verbatim with sums replaced by integrals. Normalise by $\|f\|_p$ and $\|g\|_q$; apply pointwise Young to $|f(x)|/\|f\|_p$ and $|g(x)|/\|g\|_q$; integrate. $\blacksquare$

### Equality condition (full statement)

Equality in Hölder holds iff there exist constants $\lambda, \mu \geq 0$, not both zero, with
$$\lambda |a_k|^p = \mu |b_k|^q \quad \text{for all } k,$$
and (for the triangle-inequality absorption when one takes $|\sum a_k b_k|$ rather than $\sum |a_k b_k|$) the phases of $a_k b_k$ agree.

**Interpretive remark.** Hölder interpolates between $\|\cdot\|_1 - \|\cdot\|_\infty$ duality (which is trivial) and $\|\cdot\|_2$-self-duality (Cauchy-Schwarz). Every duality pairing in functional analysis on $L^p$ spaces traces back to Hölder.

---

## 2.7 Minkowski's Inequality

> **Theorem 2.11 (Minkowski).** For $p \in [1, \infty)$ and real (or complex) $a_1, \ldots, a_n$ and $b_1, \ldots, b_n$:
> $$\boxed{\left(\sum_{k=1}^n |a_k + b_k|^p\right)^{1/p} \leq \left(\sum_{k=1}^n |a_k|^p\right)^{1/p} + \left(\sum_{k=1}^n |b_k|^p\right)^{1/p}.}$$
> For $p > 1$, equality iff the vectors $(a_k)$ and $(b_k)$ are non-negative multiples of each other.

This is the **triangle inequality for the $\ell^p$-norm**
$$\|x\|_p := \left(\sum_{k=1}^n |x_k|^p\right)^{1/p}.$$

### Proof (via Hölder, for $p > 1$)

**Proof.**

*Case $p = 1$ (base).* Apply the triangle inequality pointwise: $|a_k + b_k| \leq |a_k| + |b_k|$. Sum over $k$:
$$\sum_k |a_k + b_k| \leq \sum_k |a_k| + \sum_k |b_k|. \quad \checkmark$$
Here $\|\cdot\|_1$ is just the sum of absolute values.

*Case $p > 1$.* Let $q = p/(p-1)$ be the conjugate of $p$. Note $q(p - 1) = p$, which is the algebraic identity we shall exploit.

*Step 1 (Trivial case).* If $\|a + b\|_p = 0$, then $a_k + b_k = 0$ for all $k$ and the LHS of Minkowski is $0$; the RHS is non-negative, so the inequality holds. Henceforth assume $\|a + b\|_p > 0$.

*Step 2 (Split $|a_k + b_k|^p$).* Write
$$|a_k + b_k|^p = |a_k + b_k| \cdot |a_k + b_k|^{p-1}.$$
By the pointwise triangle inequality $|a_k + b_k| \leq |a_k| + |b_k|$:
$$|a_k + b_k|^p \leq (|a_k| + |b_k|) \cdot |a_k + b_k|^{p-1} = |a_k| \cdot |a_k + b_k|^{p-1} + |b_k| \cdot |a_k + b_k|^{p-1}.$$

Sum over $k$:
$$\sum_k |a_k + b_k|^p \leq \sum_k |a_k| \cdot |a_k + b_k|^{p-1} + \sum_k |b_k| \cdot |a_k + b_k|^{p-1}. \tag{$*$}$$

*Step 3 (Apply Hölder to each sum on the right).* For the first sum, set $u_k = |a_k|$ and $v_k = |a_k + b_k|^{p-1}$. Then by Theorem 2.8 with exponents $p, q$:
$$\sum_k u_k v_k \leq \left(\sum_k u_k^p\right)^{1/p} \left(\sum_k v_k^q\right)^{1/q} = \|a\|_p \left(\sum_k |a_k + b_k|^{q(p-1)}\right)^{1/q}.$$

Since $q(p - 1) = p$:
$$\sum_k v_k^q = \sum_k |a_k + b_k|^p = \|a + b\|_p^p.$$

Hence $(\sum v_k^q)^{1/q} = (\|a+b\|_p^p)^{1/q} = \|a+b\|_p^{p/q}$. So
$$\sum_k |a_k| \cdot |a_k + b_k|^{p-1} \leq \|a\|_p \cdot \|a+b\|_p^{p/q}.$$

Similarly,
$$\sum_k |b_k| \cdot |a_k + b_k|^{p-1} \leq \|b\|_p \cdot \|a+b\|_p^{p/q}.$$

*Step 4 (Combine).* Substituting into $(*)$:
$$\|a + b\|_p^p = \sum_k |a_k + b_k|^p \leq (\|a\|_p + \|b\|_p) \cdot \|a+b\|_p^{p/q}. \tag{$**$}$$

*Step 5 (Divide).* By Step 1, $\|a+b\|_p > 0$, so $\|a+b\|_p^{p/q} > 0$. Divide $(**)$ by $\|a+b\|_p^{p/q}$:
$$\|a + b\|_p^{\,p - p/q} \leq \|a\|_p + \|b\|_p.$$

The exponent simplifies:
$$p - \frac{p}{q} = p\!\left(1 - \frac{1}{q}\right) = p \cdot \frac{1}{p} = 1,$$
using $1/p + 1/q = 1$ hence $1 - 1/q = 1/p$.

Therefore
$$\|a + b\|_p \leq \|a\|_p + \|b\|_p. \quad \blacksquare$$

*Step 6 (Equality).* Tracing backwards: equality in Minkowski requires equality in both Hölder applications (Step 3) and in the pointwise triangle inequality (Step 2). The Hölder equalities give $|a_k|^p \propto |a_k + b_k|^p$ and $|b_k|^p \propto |a_k + b_k|^p$, hence $|a_k| \propto |b_k|$. The pointwise triangle equality requires $a_k$ and $b_k$ to have the same sign (in the real case) or the same phase (in the complex case). Together: $(a_k)$ and $(b_k)$ are non-negative scalar multiples of each other.

**Sanity check.** Take $a = (1, 0), b = (0, 1), p = 2$: $\|a + b\|_2 = \sqrt 2$, $\|a\|_2 + \|b\|_2 = 2$. Indeed $\sqrt 2 \approx 1.41 \leq 2$. Strict because $a$ and $b$ are orthogonal, not proportional.

Take $a = (3, 0), b = (1, 0), p = 2$ (parallel): $\|a+b\|_2 = 4$, $\|a\|_2 + \|b\|_2 = 3 + 1 = 4$. Equality $\checkmark$.

### Integral form

> **Corollary 2.12 (Minkowski for integrals).** For $f, g \in L^p(X, \mu)$ with $p \in [1, \infty)$:
> $$\left(\int |f + g|^p\, d\mu\right)^{1/p} \leq \left(\int |f|^p\, d\mu\right)^{1/p} + \left(\int |g|^p\, d\mu\right)^{1/p}.$$

**Proof.** Same as above with sums replaced by integrals and Hölder's integral version in place of Theorem 2.8. $\blacksquare$

**Interpretive remark.** Minkowski is the statement that $L^p$ is a normed space: $\|\cdot\|_p$ satisfies the triangle inequality. Without Minkowski, the ubiquitous $L^p$ spaces would just be sets, not analytic objects.

### The case $0 < p < 1$

Surprisingly, Minkowski **fails** for $0 < p < 1$. Example: $a = (1, 0), b = (0, 1), p = 1/2$.
- $\|a + b\|_{1/2} = (1 + 1)^2 = 4$.
- $\|a\|_{1/2} + \|b\|_{1/2} = 1 + 1 = 2$.

So $4 > 2$, violating the putative triangle inequality. In fact $\|\cdot\|_p$ for $p < 1$ is only a **quasi-norm**, and the unit ball is not convex.

---

## 2.8 Summary Table

| Inequality     | Statement                                                            | Needs                     |
| -------------- | -------------------------------------------------------------------- | ------------------------- |
| Triangle       | $\|x + y\| \leq \|x\| + \|y\|$                                       | Linearity, absolute value |
| Cauchy-Schwarz | $\left\|\sum a_k b_k\right\| \leq \|a\|_2 \|b\|_2$                   | Quadratic discriminant    |
| AM-GM          | $\bar a \geq \sqrt[n]{\prod a_k}$                                    | Concavity of $\log$       |
| Young          | $ab \leq a^p/p + b^q/q$                                              | Concavity of $\log$       |
| Hölder         | $\sum\|a_k b_k\| \leq \|a\|_p \|b\|_q$                                | Young                     |
| Minkowski      | $\|a + b\|_p \leq \|a\|_p + \|b\|_p$                                 | Hölder                    |

**Logical flow.**
$$\text{concavity of } \log \;\Rightarrow\; \text{Young} \;\Rightarrow\; \text{Hölder} \;\Rightarrow\; \text{Minkowski},$$
with Cauchy-Schwarz as the $p = q = 2$ special case of Hölder (also reached directly via the discriminant method).

---

## Worked Examples

**Example 1.** Prove that for positive reals $a, b, c$:
$$(a + b + c)\!\left(\frac{1}{a} + \frac{1}{b} + \frac{1}{c}\right) \geq 9.$$

*Setup.* We want to exploit the symmetry and the structure of the sum-times-reciprocal-sum. This pattern is characteristic of Cauchy-Schwarz applied to vectors of the form $(\sqrt{a_k}, 1/\sqrt{a_k})$.

*Strategy.* Use Cauchy-Schwarz in the form
$$\left(\sum_k u_k v_k\right)^2 \leq \left(\sum_k u_k^2\right)\left(\sum_k v_k^2\right)$$
with $u_k = \sqrt{a_k}$ and $v_k = 1/\sqrt{a_k}$. Then $u_k v_k = 1$, so $\sum u_k v_k = n$, and the result is $n^2 \leq (\sum a_k)(\sum 1/a_k)$.

*Computation.* Let $n = 3$, $a_1 = a, a_2 = b, a_3 = c$. Take $u_k = \sqrt{a_k}$ and $v_k = 1/\sqrt{a_k}$. All are positive since $a, b, c > 0$. Then
$$u_k v_k = \sqrt{a_k} \cdot \frac{1}{\sqrt{a_k}} = 1, \quad \sum u_k v_k = 3.$$
$$\sum u_k^2 = a + b + c, \quad \sum v_k^2 = \frac{1}{a} + \frac{1}{b} + \frac{1}{c}.$$

By Cauchy-Schwarz,
$$9 = 3^2 = \left(\sum u_k v_k\right)^2 \leq \left(\sum u_k^2\right)\left(\sum v_k^2\right) = (a + b + c)\left(\frac{1}{a} + \frac{1}{b} + \frac{1}{c}\right).$$

*Verification.* Test with $a = b = c = 1$: LHS $= 3 \cdot 3 = 9 \geq 9$. Equality as predicted — and Cauchy-Schwarz equality requires $(u_k)$ and $(v_k)$ proportional, i.e., $\sqrt{a_k} \propto 1/\sqrt{a_k}$, i.e., $a_k$ constant. $\checkmark$

Test with $a = 1, b = 2, c = 3$: $(6)(11/6) = 11 \geq 9$. $\checkmark$

*Interpretation.* This inequality says the arithmetic mean times the harmonic-mean reciprocal is at least $n^2$. It is a special case of the **AM-HM** inequality: $\mathrm{AM} \geq \mathrm{HM}$, where $\mathrm{HM} = n / \sum (1/a_k)$. $\blacksquare$

---

**Example 2.** Apply Hölder with $p = 3, q = 3/2$ to bound $\sum a_k b_k$, assuming $a_k, b_k \geq 0$, $\sum a_k^3 = 1$, and $\sum b_k^{3/2} = 8$.

*Setup.* Hölder requires conjugate exponents: verify $1/3 + 2/3 = 1$. $\checkmark$ The hypotheses give us the $\ell^3$- and $\ell^{3/2}$-norms of $(a_k)$ and $(b_k)$ directly.

*Strategy.* Directly substitute into Hölder's inequality.

*Computation.* By Theorem 2.8 with $p = 3, q = 3/2$:
$$\sum_k a_k b_k \leq \left(\sum_k a_k^3\right)^{1/3} \left(\sum_k b_k^{3/2}\right)^{2/3}.$$

Substitute the given values:
$$\sum_k a_k b_k \leq 1^{1/3} \cdot 8^{2/3} = 1 \cdot (2^3)^{2/3} = 1 \cdot 2^2 = 4.$$

*Verification.* The equality case would require $\lambda a_k^3 = \mu b_k^{3/2}$ for all $k$, i.e., $a_k^2 \propto b_k$. One can check: take $a_k = c \cdot b_k^{1/2}$ for a suitable constant $c$; with $\sum a_k^3 = c^3 \sum b_k^{3/2} = 8c^3 = 1$ so $c = 1/2$; then $\sum a_k b_k = \frac{1}{2} \sum b_k^{3/2} = 4$. So the bound $4$ is tight. $\checkmark$

*Interpretation.* This is a textbook example of how Hölder converts moment bounds (on $a^3, b^{3/2}$) into cross-moment bounds (on $ab$). The same technique is central in probability, where it is known as the **moment inequality**. $\blacksquare$

---

**Example 3.** Use Minkowski to show that if $\|a\|_p = 3$ and $\|b\|_p = 4$, then $\|a + b\|_p \leq 7$.

*Setup.* Minkowski is the triangle inequality for $\|\cdot\|_p$ — it applies directly.

*Strategy.* Apply Theorem 2.11.

*Computation.* By Minkowski:
$$\|a + b\|_p \leq \|a\|_p + \|b\|_p = 3 + 4 = 7.$$

*Verification.* The bound is sharp: take $b_k = (4/3) a_k$ for all $k$ (so $b = (4/3) a$). Then $\|b\|_p = (4/3)\|a\|_p = 4 \checkmark$, and $\|a + b\|_p = \|(7/3) a\|_p = (7/3) \|a\|_p = 7 \checkmark$, with equality.

Conversely, for counter-oriented vectors (e.g., $b = -(4/3) a$), one has $\|a + b\|_p = \|-a/3\|_p = 1$, strictly less than $7$.

*Interpretation.* Minkowski is the $\ell^p$-incarnation of "the sum of two vectors is no longer than the sum of their lengths." Equality is achieved exactly when the vectors point in the same direction. $\blacksquare$

---

**Example 4.** Prove $\sin\theta + \cos\theta \leq \sqrt{2}$ for all $\theta \in \mathbb{R}$.

*Setup.* The left side is a linear combination of $\sin\theta$ and $\cos\theta$; there's a hidden inner-product structure. Consider $(\sin\theta, \cos\theta)$ as a unit vector, and $(1, 1)$ as a second vector of norm $\sqrt 2$.

*Strategy.* Apply Cauchy-Schwarz to the vectors $u = (\sin\theta, \cos\theta)$ and $v = (1, 1)$.

*Computation.* By Theorem 2.4:
$$|\sin\theta \cdot 1 + \cos\theta \cdot 1| \leq \sqrt{\sin^2\theta + \cos^2\theta} \cdot \sqrt{1^2 + 1^2} = \sqrt{1} \cdot \sqrt{2} = \sqrt 2.$$

Since $|\sin\theta + \cos\theta| \leq \sqrt 2$, in particular $\sin\theta + \cos\theta \leq \sqrt 2$.

*Verification (equality case).* Equality requires $(\sin\theta, \cos\theta) \propto (1, 1)$, i.e., $\sin\theta = \cos\theta$, i.e., $\theta = \pi/4 + k\pi$. At $\theta = \pi/4$: $\sin(\pi/4) + \cos(\pi/4) = \sqrt 2/2 + \sqrt 2/2 = \sqrt 2$. $\checkmark$ At $\theta = 5\pi/4$: $-\sqrt 2/2 - \sqrt 2/2 = -\sqrt 2$; so $|\sin\theta + \cos\theta| = \sqrt 2$ but $\sin\theta + \cos\theta = -\sqrt 2 < \sqrt 2$.

*Interpretation.* More generally, $a \sin\theta + b \cos\theta \leq \sqrt{a^2 + b^2}$, the familiar "amplitude bound" in physics. This is Cauchy-Schwarz in disguise, and it is the reason sinusoids have well-defined amplitudes. $\blacksquare$

---

**Example 5.** For $a, b > 0$, use Young with $p = q = 2$ to prove $ab \leq (a^2 + b^2)/2$. Now use this to show $(a + b)^2 \leq 2(a^2 + b^2)$.

*Setup.* Young with conjugate exponents $(2, 2)$ gives exactly the AM-GM-type inequality $ab \leq (a^2 + b^2)/2$. The second part follows by bounding the cross term.

*Strategy.* Apply Theorem 2.6 with $p = q = 2$, then substitute into the expansion of $(a+b)^2$.

*Computation.*

*Step 1 (Young with $p = q = 2$).*
$$ab \leq \frac{a^p}{p} + \frac{b^q}{q} = \frac{a^2}{2} + \frac{b^2}{2} = \frac{a^2 + b^2}{2}.$$

*Step 2 (Expand $(a+b)^2$).*
$$(a+b)^2 = a^2 + 2ab + b^2.$$

*Step 3 (Substitute).* Using $2ab \leq a^2 + b^2$:
$$(a+b)^2 = a^2 + 2ab + b^2 \leq a^2 + (a^2 + b^2) + b^2 = 2a^2 + 2b^2 = 2(a^2 + b^2).$$

*Verification.* At $a = b$: $(2a)^2 = 4a^2$ and $2(2a^2) = 4a^2$. Equality $\checkmark$.
At $a = 1, b = 0$: $1 \leq 2$. $\checkmark$

*Interpretation.* This is the **parallelogram law inequality**: for vectors in an inner-product space, $\|x + y\|^2 \leq 2(\|x\|^2 + \|y\|^2)$. Combined with $\|x - y\|^2 \leq 2(\|x\|^2 + \|y\|^2)$, it gives $\|x + y\|^2 + \|x - y\|^2 = 2(\|x\|^2 + \|y\|^2)$ — the parallelogram identity, which characterises inner-product spaces among normed spaces. $\blacksquare$

---

## Practice Problems

1. Prove $\displaystyle \sum_{k=1}^n k \leq \sqrt{n} \cdot \sqrt{\sum_{k=1}^n k^2}$ and identify when equality holds.

2. For $a, b, c > 0$ with $a + b + c = 1$, prove $a^2 + b^2 + c^2 \geq 1/3$.

3. State and prove Hölder's inequality for the case $p = 3, q = 3/2$.

4. For $p \geq 1$, show $\|\cdot\|_p$ is a norm on $\mathbb{R}^n$ (i.e., verify positivity, homogeneity, and triangle inequality).

5. Prove $\displaystyle \int_0^1 f(x)\, dx \leq \sqrt{\int_0^1 f(x)^2\, dx}$ for non-negative $f$ on $[0, 1]$.

6. **(Bernoulli's inequality.)** Prove that for every real $x \geq -1$ and every integer $n \geq 1$,
$$(1 + x)^n \geq 1 + nx,$$
with equality iff $x = 0$ or $n = 1$. Extend to real exponents $r \geq 1$ (hint: use convexity of $x \mapsto x^r$).

7. **(Power mean inequality.)** For $a_1, \ldots, a_n > 0$ and $r \in \mathbb{R} \setminus \{0\}$, define
$$M_r(a) = \left(\frac{1}{n}\sum_{k=1}^n a_k^r\right)^{1/r}.$$
Prove: if $r < s$, then $M_r(a) \leq M_s(a)$, with equality iff all $a_k$ are equal.

### Solutions

---

**Solution 1.** Prove $\sum_{k=1}^n k \leq \sqrt n \cdot \sqrt{\sum_{k=1}^n k^2}$.

*Setup.* The inequality has the form $\sum 1 \cdot k \leq \sqrt{\sum 1^2} \cdot \sqrt{\sum k^2}$, which is Cauchy-Schwarz with $a_k = 1, b_k = k$.

*Strategy.* Apply Theorem 2.4 directly.

*Computation.*

*Step 1.* Set $a_k = 1$ and $b_k = k$ for $k = 1, \ldots, n$. Both are real, and the Cauchy-Schwarz inequality gives
$$\left|\sum_{k=1}^n a_k b_k\right| \leq \sqrt{\sum_{k=1}^n a_k^2} \cdot \sqrt{\sum_{k=1}^n b_k^2}.$$

*Step 2.* Compute each sum:
- $\sum_{k=1}^n a_k b_k = \sum_{k=1}^n k = \frac{n(n+1)}{2}$ (a positive quantity; the absolute value does nothing).
- $\sum_{k=1}^n a_k^2 = \sum_{k=1}^n 1 = n$.
- $\sum_{k=1}^n b_k^2 = \sum_{k=1}^n k^2 = \frac{n(n+1)(2n+1)}{6}$.

*Step 3.* Substitute:
$$\sum_{k=1}^n k \leq \sqrt n \cdot \sqrt{\sum_{k=1}^n k^2}.$$

*Verification (equality).* By the equality clause of Cauchy-Schwarz (Theorem 2.4), equality holds iff $(a_k) = (1, 1, \ldots, 1)$ and $(b_k) = (1, 2, \ldots, n)$ are proportional. Proportionality requires $b_k / a_k = k$ constant, which fails for $n \geq 2$ (since $b_1/a_1 = 1 \neq 2 = b_2/a_2$). Hence equality holds iff $n = 1$.

*Sanity check ($n = 3$).* LHS $= 1 + 2 + 3 = 6$. RHS $= \sqrt 3 \cdot \sqrt{1 + 4 + 9} = \sqrt 3 \cdot \sqrt{14} = \sqrt{42} \approx 6.48$. Indeed $6 < 6.48$. $\checkmark$

*Interpretation.* Substituting the closed forms gives the equivalent inequality
$$\frac{n(n+1)}{2} \leq \sqrt n \cdot \sqrt{\frac{n(n+1)(2n+1)}{6}} = \sqrt{\frac{n^2(n+1)(2n+1)}{6}},$$
which squares to $\frac{n^2(n+1)^2}{4} \leq \frac{n^2(n+1)(2n+1)}{6}$, i.e., $\frac{n+1}{4} \leq \frac{2n+1}{6}$, i.e., $6(n+1) \leq 4(2n+1)$, i.e., $6n + 6 \leq 8n + 4$, i.e., $2 \leq 2n$, i.e., $n \geq 1$. So the inequality is equivalent to $n \geq 1$ — a pleasant sanity check. $\blacksquare$

---

**Solution 2.** For $a + b + c = 1$ with $a, b, c > 0$: prove $a^2 + b^2 + c^2 \geq 1/3$.

*Setup.* The hypothesis fixes the sum; we need a lower bound on the sum of squares. Cauchy-Schwarz relates these via $(1 + 1 + 1)(a^2 + b^2 + c^2) \geq (a + b + c)^2$.

*Strategy.* Apply Cauchy-Schwarz with $(a_k) = (1, 1, 1)$ and $(b_k) = (a, b, c)$.

*Computation.*

*Step 1.* By Theorem 2.4 (squared form),
$$\left(\sum_{k=1}^3 1 \cdot b_k\right)^2 \leq \left(\sum_{k=1}^3 1^2\right)\left(\sum_{k=1}^3 b_k^2\right).$$

*Step 2.* Compute each piece:
- $\sum 1 \cdot b_k = a + b + c = 1$.
- $\sum 1^2 = 3$.
- $\sum b_k^2 = a^2 + b^2 + c^2$.

*Step 3.* Substitute:
$$1^2 \leq 3(a^2 + b^2 + c^2) \implies a^2 + b^2 + c^2 \geq \frac{1}{3}.$$

*Verification (equality).* By Cauchy-Schwarz equality, $(1, 1, 1) \propto (a, b, c)$, i.e., $a = b = c$. Combined with $a + b + c = 1$: $a = b = c = 1/3$. Check: $3 \cdot (1/3)^2 = 1/3$. $\checkmark$

*Alternative proof via power means.* The power mean inequality (Problem 7) says $M_1(a, b, c) \leq M_2(a, b, c)$:
$$\frac{a + b + c}{3} \leq \sqrt{\frac{a^2 + b^2 + c^2}{3}} \implies \frac{1}{3} \leq \sqrt{\frac{a^2 + b^2 + c^2}{3}},$$
squaring and rearranging: $a^2 + b^2 + c^2 \geq 1/3$.

*Alternative proof via convexity (Jensen).* The function $f(x) = x^2$ is convex, so by Jensen
$$\frac{f(a) + f(b) + f(c)}{3} \geq f\!\left(\frac{a + b + c}{3}\right) = f(1/3) = 1/9,$$
giving $a^2 + b^2 + c^2 \geq 3 \cdot 1/9 = 1/3$.

*Interpretation.* The inequality $a^2 + b^2 + c^2 \geq (a + b + c)^2/n$ is fundamental — it says: among probability distributions on $\{1, \ldots, n\}$, the minimiser of $\sum p_k^2$ is the uniform distribution (which has value $1/n$). This is the **collision probability** minimisation in information theory. $\blacksquare$

---

**Solution 3.** State and prove Hölder's inequality for $p = 3, q = 3/2$.

*Setup.* Verify conjugacy: $1/3 + 2/3 = 1$. $\checkmark$ Specialise Theorem 2.8 to these exponents; the proof is just the general proof with concrete numbers, but doing it out is instructive.

*Statement.* For $a_1, \ldots, a_n$ and $b_1, \ldots, b_n$ real,
$$\sum_{k=1}^n |a_k b_k| \leq \left(\sum_{k=1}^n |a_k|^3\right)^{1/3} \left(\sum_{k=1}^n |b_k|^{3/2}\right)^{2/3}.$$

*Strategy.* Follow the Young-normalisation proof step by step.

*Computation.*

*Step 1 (Trivial case).* If $(\sum |a_k|^3)^{1/3} = 0$, all $a_k = 0$ and both sides are zero. Symmetrically for $b$. Assume both norms positive; write
$$A := \left(\sum |a_k|^3\right)^{1/3}, \quad B := \left(\sum |b_k|^{3/2}\right)^{2/3}.$$

*Step 2 (Young at $p = 3, q = 3/2$).* For $\alpha, \beta \geq 0$:
$$\alpha \beta \leq \frac{\alpha^3}{3} + \frac{\beta^{3/2}}{3/2} = \frac{\alpha^3}{3} + \frac{2 \beta^{3/2}}{3}.$$

*Proof of Step 2.* Young (Theorem 2.6) with $p = 3, q = 3/2$: $\alpha\beta \leq \alpha^p/p + \beta^q/q$. Here $\alpha^p/p = \alpha^3/3$ and $\beta^q/q = \beta^{3/2} / (3/2) = 2\beta^{3/2}/3$. $\checkmark$

*Step 3 (Normalise).* Set $\alpha_k := |a_k|/A$ and $\beta_k := |b_k|/B^{1/1}$ — wait, the normalisation constant for $b$ must make $\sum \beta_k^{3/2} = 1$. Let's redo: set
$$\alpha_k := \frac{|a_k|}{A}, \quad \beta_k := \frac{|b_k|}{B^{3/2 \cdot 2/3}} = \frac{|b_k|}{B}.$$

Then $\sum \alpha_k^3 = A^{-3} \sum |a_k|^3 = 1$. And $B^{3/2} = \left((\sum |b_k|^{3/2})^{2/3}\right)^{3/2} = \sum |b_k|^{3/2}$, so $\sum \beta_k^{3/2} = B^{-3/2} \sum |b_k|^{3/2} = 1$. $\checkmark$

*Step 4 (Apply Step 2 and sum).* For each $k$:
$$\alpha_k \beta_k \leq \frac{\alpha_k^3}{3} + \frac{2 \beta_k^{3/2}}{3}.$$
Sum:
$$\sum_k \alpha_k \beta_k \leq \frac{1}{3} \sum_k \alpha_k^3 + \frac{2}{3} \sum_k \beta_k^{3/2} = \frac{1}{3} \cdot 1 + \frac{2}{3} \cdot 1 = 1.$$

*Step 5 (Denormalise).* Multiply by $AB$:
$$\sum_k |a_k b_k| = AB \sum_k \alpha_k \beta_k \leq AB = \left(\sum |a_k|^3\right)^{1/3}\left(\sum |b_k|^{3/2}\right)^{2/3}.$$

*Verification.* Take $a = (1, 1), b = (1, 1)$: LHS $= 2$. RHS $= 2^{1/3} \cdot 2^{2/3} = 2^{1/3 + 2/3} = 2$. Equality $\checkmark$ (and indeed $|a_k|^3 = |b_k|^{3/2}$ both equal $1$).

Take $a = (2, 0), b = (1, 1)$: LHS $= 2$. RHS $= 8^{1/3} \cdot 2^{2/3} = 2 \cdot 2^{2/3} = 2^{5/3} \approx 3.17$. $\checkmark$

*Interpretation.* The exponents $(3, 3/2)$ are useful in problems involving cubic and square-root quantities — e.g., bounding $\sum a_k b_k$ where $a_k^3$ and $b_k^{3/2}$ have physical or combinatorial meaning (cf. Gagliardo-Nirenberg). $\blacksquare$

---

**Solution 4.** Show $\|\cdot\|_p$ is a norm on $\mathbb{R}^n$ for $p \geq 1$.

*Setup.* A norm on $\mathbb{R}^n$ is a function $N : \mathbb{R}^n \to [0, \infty)$ satisfying:
(N1) **Positivity:** $N(x) \geq 0$, and $N(x) = 0 \iff x = 0$.
(N2) **Absolute homogeneity:** $N(cx) = |c| N(x)$ for all $c \in \mathbb{R}$ and $x \in \mathbb{R}^n$.
(N3) **Triangle inequality (subadditivity):** $N(x + y) \leq N(x) + N(y)$.

We verify each for $N(x) = \|x\|_p = \left(\sum_{k=1}^n |x_k|^p\right)^{1/p}$, $p \geq 1$.

*Strategy.* (N1) is immediate from non-negativity of $|x_k|^p$. (N2) uses $|cx_k|^p = |c|^p |x_k|^p$ and factoring. (N3) is Minkowski (Theorem 2.11).

*Computation.*

*(N1) Positivity.* Each $|x_k|^p \geq 0$, so $\sum |x_k|^p \geq 0$, so $\|x\|_p \geq 0$.

$(\Leftarrow)$: If $x = 0$, then $x_k = 0$ for all $k$, so $|x_k|^p = 0$ and $\|x\|_p = 0^{1/p} = 0$.

$(\Rightarrow)$: Suppose $\|x\|_p = 0$. Then $\sum |x_k|^p = 0$. Since each $|x_k|^p \geq 0$, a sum of non-negative reals equals $0$ iff each term is $0$. So $|x_k|^p = 0$ for all $k$, hence $|x_k| = 0$, hence $x_k = 0$. Therefore $x = 0$. $\checkmark$

*(N2) Absolute homogeneity.* For $c \in \mathbb{R}$ and $x \in \mathbb{R}^n$:
$$\|cx\|_p = \left(\sum_{k=1}^n |cx_k|^p\right)^{1/p} = \left(\sum_{k=1}^n |c|^p |x_k|^p\right)^{1/p} = \left(|c|^p \sum_{k=1}^n |x_k|^p\right)^{1/p}.$$

Since $|c|^p \geq 0$ and the $p$-th root is multiplicative on $[0, \infty)$:
$$= (|c|^p)^{1/p} \left(\sum |x_k|^p\right)^{1/p} = |c|^{p \cdot 1/p} \|x\|_p = |c| \cdot \|x\|_p. \checkmark$$

*(N3) Triangle inequality.* This is Minkowski's inequality (Theorem 2.11) applied to $a = x$ and $b = y$:
$$\|x + y\|_p = \left(\sum |x_k + y_k|^p\right)^{1/p} \leq \left(\sum |x_k|^p\right)^{1/p} + \left(\sum |y_k|^p\right)^{1/p} = \|x\|_p + \|y\|_p. \checkmark$$

All three axioms hold, so $\|\cdot\|_p$ is a norm on $\mathbb{R}^n$ for every $p \geq 1$. $\blacksquare$

*Remark on $p = \infty$.* For $p = \infty$, $\|x\|_\infty := \max_k |x_k|$, and the norm axioms follow directly from properties of $\max$ without needing Minkowski. Indeed, $\lim_{p \to \infty} \|x\|_p = \|x\|_\infty$ (this uses that for any finite vector, the term with maximum absolute value dominates the sum as $p \to \infty$).

*Remark on $0 < p < 1$.* (N1) and (N2) still hold, but (N3) fails, as shown in §2.7. For $p < 1$, $\|\cdot\|_p$ is only a **quasi-norm**: there is a constant $K_p$ with $\|x + y\|_p \leq K_p(\|x\|_p + \|y\|_p)$. $\blacksquare$

---

**Solution 5.** Prove $\int_0^1 f(x)\, dx \leq \sqrt{\int_0^1 f(x)^2\, dx}$ for non-negative $f$ on $[0, 1]$.

*Setup.* The claimed inequality is Cauchy-Schwarz for integrals (Corollary 2.5) with $g(x) \equiv 1$.

*Strategy.* Apply Corollary 2.5 with $g \equiv 1$, exploiting $\int_0^1 1^2\, dx = 1$.

*Computation.*

*Step 1 (Apply Corollary 2.5).* With $f$ as given and $g(x) = 1$:
$$\left|\int_0^1 f(x) \cdot 1\, dx\right| \leq \sqrt{\int_0^1 f(x)^2\, dx} \cdot \sqrt{\int_0^1 1^2\, dx}.$$

*Step 2 (Simplify).* Since $f \geq 0$, $\int_0^1 f(x)\, dx \geq 0$, so the absolute value is redundant. And $\int_0^1 1^2\, dx = \int_0^1 1\, dx = 1$, so $\sqrt{1} = 1$.

Therefore:
$$\int_0^1 f(x)\, dx \leq \sqrt{\int_0^1 f(x)^2\, dx}. \checkmark$$

*Verification.* Take $f(x) = x$: LHS $= \int_0^1 x\, dx = 1/2$. RHS $= \sqrt{\int_0^1 x^2\, dx} = \sqrt{1/3} \approx 0.577$. Indeed $0.5 \leq 0.577$. $\checkmark$

Take $f(x) = c$ (constant $c \geq 0$): LHS $= c$, RHS $= \sqrt{c^2} = c$. Equality — and indeed the equality case of Cauchy-Schwarz for integrals is $f \propto g$, which for $g \equiv 1$ means $f$ is constant. $\checkmark$

*Interpretation.* This is the fundamental observation that the **first moment** of a non-negative function is bounded by the square root of its **second moment** (when integrated over a unit-measure set). In probability, it says $\mathbb E[X] \leq \sqrt{\mathbb E[X^2]}$, an immediate consequence of Jensen's inequality applied to the convex function $t \mapsto t^2$, or equivalently the Cauchy-Schwarz inequality in $L^2$. $\blacksquare$

*Generalisation.* For any measure space $(X, \mu)$ with $\mu(X) = M < \infty$ and $f \geq 0$ integrable:
$$\int f\, d\mu \leq \sqrt M \cdot \sqrt{\int f^2\, d\mu}.$$
This is the useful inequality $\|f\|_{L^1(\mu)} \leq \sqrt{\mu(X)} \cdot \|f\|_{L^2(\mu)}$, and it is the simplest instance of the **inclusion** $L^2 \subseteq L^1$ on finite measure spaces. $\blacksquare$

---

**Solution 6 (Bernoulli's inequality).** For $x \geq -1$ and integer $n \geq 1$: $(1 + x)^n \geq 1 + nx$.

*Setup.* The inequality is an assertion about polynomials and their lower-order approximations. For $x > 0$, Bernoulli says the full binomial expansion exceeds its first two terms — obvious since remaining terms are non-negative. For $-1 \leq x \leq 0$, it is subtler.

*Strategy (induction on $n$).*

*Computation.*

*Base case $n = 1$.* $(1 + x)^1 = 1 + x = 1 + 1 \cdot x$. Equality. $\checkmark$

*Inductive step.* Assume $(1 + x)^n \geq 1 + nx$ for some $n \geq 1$ and all $x \geq -1$. Prove $(1 + x)^{n+1} \geq 1 + (n+1)x$.

Since $x \geq -1$, $1 + x \geq 0$. Multiply the inductive hypothesis by $(1 + x) \geq 0$ (inequality preserved):
$$(1 + x)^{n+1} = (1 + x)^n \cdot (1 + x) \geq (1 + nx)(1 + x).$$

Expand the right side:
$$(1 + nx)(1 + x) = 1 + x + nx + nx^2 = 1 + (n+1)x + nx^2.$$

Since $n \geq 1$ and $x^2 \geq 0$, $nx^2 \geq 0$, so
$$(1 + x)^{n+1} \geq 1 + (n+1)x + nx^2 \geq 1 + (n+1)x. \checkmark$$

By induction, Bernoulli holds for all $n \geq 1$.

*Equality.* Equality at each step requires $(1+x)^n = 1 + nx$ (inductive hypothesis equality) and $nx^2 = 0$. The second forces $x = 0$ (for $n \geq 1$). Hence equality iff $x = 0$ or $n = 1$.

*Extension to real $r \geq 1$.*

*Step 1 (Differentiable approach).* Let $f(x) = (1 + x)^r - (1 + rx)$ for $x \geq -1$, where $r \geq 1$ is real. Then
$$f'(x) = r(1+x)^{r-1} - r = r\!\left[(1+x)^{r-1} - 1\right].$$

Since $r - 1 \geq 0$, the function $t \mapsto t^{r-1}$ is increasing on $[0, \infty)$; hence $(1 + x)^{r-1} \geq 1$ iff $1 + x \geq 1$ iff $x \geq 0$, and $(1+x)^{r-1} \leq 1$ for $-1 \leq x \leq 0$ (with $(1+x)^{r-1}$ well-defined on $[0, \infty)$ if we take $r - 1 \geq 0$; care needed if $-1 \leq x < 0$ and $r - 1$ is not an integer — we then use the principal branch, which is real and $\geq 0$).

So $f'(x) \leq 0$ on $[-1, 0]$ and $f'(x) \geq 0$ on $[0, \infty)$, with $f'(0) = 0$. Therefore $x = 0$ is a minimum of $f$, and $f(x) \geq f(0) = 0$, i.e., $(1 + x)^r \geq 1 + rx$.

*Alternative proof via convexity.* The function $\phi(t) = t^r$ is convex on $[0, \infty)$ for $r \geq 1$ (since $\phi''(t) = r(r-1) t^{r-2} \geq 0$). The tangent line to $\phi$ at $t = 1$ is $L(t) = 1 + r(t - 1)$. By convexity, $\phi(t) \geq L(t)$ for all $t \geq 0$. Set $t = 1 + x$ ($x \geq -1$): $(1 + x)^r \geq 1 + r((1+x) - 1) = 1 + rx$. $\checkmark$

*Interpretation.* Bernoulli is the **first-order Taylor underestimate** for $(1 + x)^r$ at $x = 0$ when $r \geq 1$: the tangent line undershoots the convex curve. For $0 < r < 1$, the curve is concave and the inequality reverses: $(1 + x)^r \leq 1 + rx$ for $x \geq -1$. Bernoulli is the key step in proving $\lim_{n \to \infty} (1 + a/n)^n = e^a$ and in comparison tests for series. $\blacksquare$

---

**Solution 7 (Power mean inequality).** For $a_1, \ldots, a_n > 0$ and $r < s$: $M_r(a) \leq M_s(a)$.

*Setup.* $M_r$ is the **$r$-th power mean** (or **Hölder mean**): $M_r = (n^{-1} \sum a_k^r)^{1/r}$. Special cases: $M_1$ = arithmetic mean, $M_2$ = quadratic mean, $M_{-1}$ = harmonic mean. By convention, $M_0 := \sqrt[n]{a_1 \cdots a_n}$ (geometric mean), obtained as $\lim_{r \to 0} M_r$.

The statement "$M_r \leq M_s$ for $r < s$" encodes AM-GM ($M_0 \leq M_1$), AM-HM ($M_{-1} \leq M_1$), and AM-QM ($M_1 \leq M_2$) simultaneously.

*Strategy.* Jensen's inequality applied to the convex function $\phi(t) = t^{s/r}$ when $s/r > 1$ (i.e., $r$ and $s$ same sign, $|s| > |r|$) — and a separate argument for mixed signs or zero.

*Computation (case $0 < r < s$).*

*Step 1 (Transform).* Let $b_k := a_k^r > 0$ and $\rho := s/r > 1$. The function $\phi(t) := t^\rho$ is convex on $[0, \infty)$ for $\rho > 1$ ($\phi''(t) = \rho(\rho - 1) t^{\rho - 2} \geq 0$).

*Step 2 (Jensen).* By Jensen's inequality for convex functions with uniform weights $\lambda_k = 1/n$:
$$\phi\!\left(\frac{1}{n}\sum_{k=1}^n b_k\right) \leq \frac{1}{n} \sum_{k=1}^n \phi(b_k),$$
equivalently
$$\left(\frac{1}{n}\sum b_k\right)^\rho \leq \frac{1}{n} \sum b_k^\rho.$$

*Step 3 (Substitute).* $b_k = a_k^r$ so $b_k^\rho = a_k^{r\rho} = a_k^s$. Hence
$$\left(\frac{1}{n}\sum a_k^r\right)^{s/r} \leq \frac{1}{n} \sum a_k^s.$$

*Step 4 (Take $(1/s)$-th root).* Both sides are positive. Since $s > 0$, $t \mapsto t^{1/s}$ is increasing on $[0, \infty)$; applying:
$$\left(\left(\frac{1}{n}\sum a_k^r\right)^{s/r}\right)^{1/s} \leq \left(\frac{1}{n}\sum a_k^s\right)^{1/s}.$$
The LHS simplifies to $\left(\frac{1}{n}\sum a_k^r\right)^{1/r} = M_r(a)$; the RHS is $M_s(a)$. Hence $M_r \leq M_s$ for $0 < r < s$. $\checkmark$

*Equality.* By strict convexity of $t^\rho$ for $\rho > 1$, Jensen equality holds iff all $b_k$ are equal, i.e., all $a_k^r$ equal, i.e., all $a_k$ equal (since $a_k > 0$).

*Case $r < s < 0$.* Set $c_k := 1/a_k$, so $c_k^{-r} = a_k^r$ and $c_k^{-s} = a_k^s$. Note $-s < -r$, both positive. By the positive case:
$$M_{-s}(c) \leq M_{-r}(c) \iff \left(\frac{1}{n}\sum c_k^{-s}\right)^{-1/s} \leq \left(\frac{1}{n}\sum c_k^{-r}\right)^{-1/r}.$$

Substituting:
$$\left(\frac{1}{n}\sum a_k^s\right)^{-1/s} \leq \left(\frac{1}{n}\sum a_k^r\right)^{-1/r}.$$

Since $-1/s > 0$ and $-1/r > 0$ (both $r, s < 0$), and the exponents are non-negative, taking reciprocals flips the inequality:
$$\left(\frac{1}{n}\sum a_k^s\right)^{1/s} \geq \left(\frac{1}{n}\sum a_k^r\right)^{1/r},$$
i.e., $M_s \geq M_r$. $\checkmark$

*Case $r < 0 < s$.* Combine $M_r \leq M_0 \leq M_s$ by continuity arguments (strictly, use the limiting definition $M_0 = \lim_{t \to 0} M_t$ and the monotone convergence of $M_t$).

Alternatively, apply AM-GM: $\lim_{t \to 0^+} M_t = G_n = \sqrt[n]{a_1 \cdots a_n}$, and by AM-GM (Theorem 2.2), $G_n \leq A_n = M_1 \leq M_s$ for $s \geq 1$. For $0 < s < 1$: by the positive case, $M_s \leq M_1 \leq \ldots$, so one needs $G_n \leq M_s$ — which again follows from strict concavity of $\log$ and Jensen applied to $t \mapsto \log t$.

*Sanity check ($n = 2, a = 1, b = 4$).*
- $M_{-1} = 2/(1 + 1/4) = 8/5 = 1.6$ (harmonic mean).
- $M_0 = \sqrt{4} = 2$ (geometric mean).
- $M_1 = (1 + 4)/2 = 2.5$ (arithmetic mean).
- $M_2 = \sqrt{(1 + 16)/2} = \sqrt{8.5} \approx 2.92$ (quadratic mean).

Indeed $M_{-1} < M_0 < M_1 < M_2$. $\checkmark$

*Interpretation.* The power mean inequality is a unified statement encompassing AM-GM, AM-HM, and AM-QM as special cases. It ranks all $M_r$ along the real line: smaller $r$ gives smaller mean, with extremes $M_{-\infty} = \min a_k$ and $M_{+\infty} = \max a_k$. It is a direct consequence of Jensen applied to power functions. $\blacksquare$

---

## Related Topics
- [[01-real-number-system]] — absolute value, ordered-field foundations, and the triangle inequality for $\mathbb R$
- [[03-supremum-and-infimum]] — inequalities frequently appear inside sup/inf arguments
- [[13-series-convergence-tests]] — Hölder and Minkowski extend to infinite sums, yielding $\ell^p$ space theory
- [[25-riemann-stieltjes-integral]] — integral forms of these inequalities, generalised to Stieltjes integrators
- Lebesgue theory: $L^p$ spaces, duality, and the full measure-theoretic versions of Hölder and Minkowski
