# 2. Classical Inequalities

---

## 2.1 Why Inequalities Come First

Analysis is built from inequalities, not equations. "Limit $= L$" means "distance to $L$ can be made smaller than any $\varepsilon$." "Series converges" means "partial sums stay bounded." The five inequalities in this chapter — Cauchy-Schwarz, AM-GM, Young, Hölder, Minkowski — are the toolkit that makes nearly every later proof possible.

They form a small ladder:
- **AM-GM** and **Young** are elementary building blocks.
- **Cauchy-Schwarz** is the $p = q = 2$ case of Hölder.
- **Hölder** generalises Cauchy-Schwarz using Young.
- **Minkowski** is the triangle inequality for $\ell^p$-norms, and follows from Hölder.

---

## 2.2 AM-GM Inequality (Preliminary)

> **Theorem (AM-GM).** For non-negative reals $a_1, \ldots, a_n$:
> $$\frac{a_1 + a_2 + \cdots + a_n}{n} \geq \sqrt[n]{a_1 a_2 \cdots a_n}$$
> with equality iff $a_1 = a_2 = \cdots = a_n$.

For $n = 2$: $(a+b)/2 \geq \sqrt{ab}$, which is equivalent to $(a-b)^2 \geq 0$.

We state the general case without full proof (it follows from convexity of $-\log$ on $(0, \infty)$ or by Cauchy's forward-backward induction).

---

## 2.3 Cauchy-Schwarz Inequality

> **Theorem (Cauchy-Schwarz).** For all real numbers $a_1, \ldots, a_n$ and $b_1, \ldots, b_n$:
> $$\boxed{\left|\sum_{k=1}^{n} a_k b_k\right| \leq \sqrt{\sum_{k=1}^{n} a_k^2} \cdot \sqrt{\sum_{k=1}^{n} b_k^2}}$$
> with equality iff $(a_1, \ldots, a_n)$ and $(b_1, \ldots, b_n)$ are proportional.

### Proof (discriminant method)

Consider, for $t \in \mathbb{R}$,
$$P(t) = \sum_{k=1}^n (a_k + t b_k)^2 = \sum a_k^2 + 2t \sum a_k b_k + t^2 \sum b_k^2.$$

$P(t) \geq 0$ for all $t$. Assume not all $b_k = 0$ (else both sides are $0$). $P$ is a quadratic in $t$ with non-negative values, so its discriminant is $\leq 0$:
$$\left(2\sum a_k b_k\right)^2 - 4\left(\sum a_k^2\right)\left(\sum b_k^2\right) \leq 0$$
$$\left(\sum a_k b_k\right)^2 \leq \left(\sum a_k^2\right)\left(\sum b_k^2\right).$$
Taking square roots gives the result. Equality holds iff $P$ has a real root $t_0$, i.e., $\sum (a_k + t_0 b_k)^2 = 0$, i.e., $a_k = -t_0 b_k$ for all $k$. $\blacksquare$

### Integral form
For $f, g$ Riemann integrable on $[a, b]$:
$$\left|\int_a^b f(x) g(x)\, dx\right| \leq \sqrt{\int_a^b f^2\, dx} \cdot \sqrt{\int_a^b g^2\, dx}$$

Proof: the same discriminant trick applied to $P(t) = \int_a^b (f + tg)^2\, dx$.

### Vector form
$$|\vec{u} \cdot \vec{v}| \leq \|\vec{u}\|\,\|\vec{v}\|$$
This is the special case used in VACV (see [[01-vector-algebra-and-fields]]).

---

## 2.4 Young's Inequality

> **Definition.** Two numbers $p, q > 1$ are called **conjugate exponents** if
> $$\frac{1}{p} + \frac{1}{q} = 1.$$

Equivalently, $q = p/(p-1)$. Examples: $(p,q) = (2,2)$, $(3, 3/2)$, $(4, 4/3)$. As $p \to 1^+$, $q \to \infty$; as $p \to \infty$, $q \to 1^+$.

> **Theorem (Young's Inequality).** Let $p, q > 1$ be conjugate exponents. For all $a, b \geq 0$:
> $$\boxed{ab \leq \frac{a^p}{p} + \frac{b^q}{q}}$$
> with equality iff $a^p = b^q$.

### Proof (via concavity of $\log$)

If $a = 0$ or $b = 0$, trivially $0 \leq \text{RHS}$. Assume $a, b > 0$.

$\log$ is concave on $(0, \infty)$, so for any $x, y > 0$ and weights $\lambda + \mu = 1$ with $\lambda, \mu > 0$:
$$\log(\lambda x + \mu y) \geq \lambda \log x + \mu \log y.$$

Take $\lambda = 1/p$, $\mu = 1/q$, $x = a^p$, $y = b^q$:
$$\log\!\left(\frac{a^p}{p} + \frac{b^q}{q}\right) \geq \frac{1}{p}\log(a^p) + \frac{1}{q}\log(b^q) = \log a + \log b = \log(ab).$$

Exponentiating: $ab \leq a^p/p + b^q/q$. Equality in concavity iff $x = y$, i.e., $a^p = b^q$. $\blacksquare$

### Special case $p = q = 2$
$$ab \leq \frac{a^2}{2} + \frac{b^2}{2}$$
This is just $(a-b)^2 \geq 0$ rearranged.

---

## 2.5 Hölder's Inequality

> **Theorem (Hölder).** Let $p, q > 1$ be conjugate exponents. For all real $a_k, b_k$:
> $$\boxed{\sum_{k=1}^n |a_k b_k| \leq \left(\sum_{k=1}^n |a_k|^p\right)^{1/p} \left(\sum_{k=1}^n |b_k|^q\right)^{1/q}}$$

For $p = q = 2$, Hölder reduces to Cauchy-Schwarz.

### Proof (via Young)

Let $A = \left(\sum |a_k|^p\right)^{1/p}$ and $B = \left(\sum |b_k|^q\right)^{1/q}$. If $A = 0$ or $B = 0$, all $a_k$ or all $b_k$ are zero, so both sides vanish. Assume $A, B > 0$.

Normalise: set $\alpha_k = |a_k|/A$ and $\beta_k = |b_k|/B$. Then $\sum \alpha_k^p = 1$ and $\sum \beta_k^q = 1$. By Young's inequality applied to each $k$:
$$\alpha_k \beta_k \leq \frac{\alpha_k^p}{p} + \frac{\beta_k^q}{q}.$$
Sum over $k$:
$$\sum_k \alpha_k \beta_k \leq \frac{1}{p}\sum \alpha_k^p + \frac{1}{q}\sum \beta_k^q = \frac{1}{p} + \frac{1}{q} = 1.$$
So $\sum |a_k b_k|/(AB) \leq 1$, giving $\sum |a_k b_k| \leq AB$. $\blacksquare$

### Integral form
$$\int_a^b |f(x) g(x)|\, dx \leq \left(\int_a^b |f|^p\right)^{1/p} \left(\int_a^b |g|^q\right)^{1/q}$$

### Equality condition
Equality in Hölder iff there exist constants $\lambda, \mu \geq 0$, not both zero, with $\lambda |a_k|^p = \mu |b_k|^q$ for all $k$.

---

## 2.6 Minkowski's Inequality

> **Theorem (Minkowski).** For $p \geq 1$ and real $a_k, b_k$:
> $$\boxed{\left(\sum_{k=1}^n |a_k + b_k|^p\right)^{1/p} \leq \left(\sum_{k=1}^n |a_k|^p\right)^{1/p} + \left(\sum_{k=1}^n |b_k|^p\right)^{1/p}}$$

This is the **triangle inequality for the $\ell^p$-norm** $\|x\|_p = \left(\sum |x_k|^p\right)^{1/p}$.

### Proof (via Hölder, for $p > 1$)

Case $p = 1$ reduces to $|a_k + b_k| \leq |a_k| + |b_k|$, summed.

For $p > 1$, let $q$ be the conjugate: $1/p + 1/q = 1$, so $q(p-1) = p$.
$$\sum |a_k + b_k|^p = \sum |a_k + b_k| \cdot |a_k + b_k|^{p-1}$$
$$\leq \sum |a_k| \cdot |a_k+b_k|^{p-1} + \sum |b_k| \cdot |a_k+b_k|^{p-1}.$$
Apply Hölder to each of the two sums (conjugate exponents $p, q$):
$$\sum |a_k| \cdot |a_k+b_k|^{p-1} \leq \|a\|_p \left(\sum |a_k+b_k|^{q(p-1)}\right)^{1/q} = \|a\|_p \|a+b\|_p^{p/q}$$
and similarly for the second sum. So
$$\|a+b\|_p^p \leq (\|a\|_p + \|b\|_p) \|a+b\|_p^{p/q}.$$
Divide both sides by $\|a+b\|_p^{p/q}$ (if it's zero, inequality is trivial) and use $p - p/q = 1$:
$$\|a+b\|_p \leq \|a\|_p + \|b\|_p. \blacksquare$$

### Integral form
$$\left(\int |f+g|^p\right)^{1/p} \leq \left(\int |f|^p\right)^{1/p} + \left(\int |g|^p\right)^{1/p}.$$

---

## 2.7 Summary Table

| Inequality     | Statement                             | Needs                     |                       |                        |
| -------------- | ------------------------------------- | ------------------------- | --------------------- | ---------------------- |
| Triangle       | $\|x+y\| \leq \|x\|+\|y\|$            | Linearity, absolute value |                       |                        |
| Cauchy-Schwarz | $                                     | \langle a,b\rangle        | \leq \|a\|_2 \|b\|_2$ | Quadratic discriminant |
| AM-GM          | arithmetic mean $\geq$ geometric mean | Concavity of $\log$       |                       |                        |
| Young          | $ab \leq a^p/p + b^q/q$               | Concavity of $\log$       |                       |                        |
| Hölder         | $\sum                                 | a_k b_k                   | \leq \|a\|_p \|b\|_q$ | Young                  |
| Minkowski      | $\|a+b\|_p \leq \|a\|_p + \|b\|_p$    | Hölder                    |                       |                        |

Logical flow: **Young $\Rightarrow$ Hölder $\Rightarrow$ Minkowski**, with Cauchy-Schwarz as the $p=2$ special case.

---

## Worked Examples

**Example 1:** Prove that for positive reals $a, b, c$: $(a+b+c)\!\left(\frac{1}{a}+\frac{1}{b}+\frac{1}{c}\right) \geq 9$.

*Solution:* By Cauchy-Schwarz with $a_k = \sqrt{a_k}$ on the left and $b_k = 1/\sqrt{a_k}$:
$$\left(\sum_k 1\right)^2 = \left(\sum_k \sqrt{a_k}\cdot\frac{1}{\sqrt{a_k}}\right)^2 \leq \left(\sum_k a_k\right)\left(\sum_k \frac{1}{a_k}\right)$$
With $n=3$: $9 \leq (a+b+c)(1/a+1/b+1/c)$. $\blacksquare$

---

**Example 2:** Apply Hölder with $p=3, q=3/2$ to bound $\sum a_k b_k$ if $a_k, b_k \geq 0$, $\sum a_k^3 = 1$, $\sum b_k^{3/2} = 8$.

*Solution:*
$$\sum a_k b_k \leq \left(\sum a_k^3\right)^{1/3}\left(\sum b_k^{3/2}\right)^{2/3} = 1^{1/3} \cdot 8^{2/3} = 4.$$

---

**Example 3:** Use Minkowski to show that if $\|a\|_p = 3$ and $\|b\|_p = 4$, then $\|a+b\|_p \leq 7$.

*Solution:* Immediate: $\|a+b\|_p \leq \|a\|_p + \|b\|_p = 3 + 4 = 7$.

---

**Example 4:** Prove $\sin\theta + \cos\theta \leq \sqrt{2}$ for all $\theta \in \mathbb{R}$.

*Solution:* By Cauchy-Schwarz with $(a_1, a_2) = (\sin\theta, \cos\theta)$, $(b_1, b_2) = (1, 1)$:
$$\sin\theta + \cos\theta = a_1 b_1 + a_2 b_2 \leq \sqrt{a_1^2 + a_2^2}\sqrt{b_1^2 + b_2^2} = \sqrt{1}\cdot\sqrt{2} = \sqrt{2}. \blacksquare$$

---

**Example 5:** For $a, b > 0$, use Young with $p = q = 2$ to prove $ab \leq (a^2 + b^2)/2$. Now use this to show $(a+b)^2 \leq 2(a^2+b^2)$.

*Solution:* Young gives $ab \leq a^2/2 + b^2/2$. Then
$$(a+b)^2 = a^2 + 2ab + b^2 \leq a^2 + (a^2 + b^2) + b^2 = 2(a^2+b^2). \blacksquare$$

---

## Practice Problems

1. Prove $\displaystyle \sum_{k=1}^n k \leq \sqrt{n} \cdot \sqrt{\sum_{k=1}^n k^2}$ and identify when equality holds.

2. For $a, b, c > 0$ with $a + b + c = 1$, prove $a^2 + b^2 + c^2 \geq 1/3$.

3. State and prove Hölder's inequality for the case $p = 3, q = 3/2$.

4. For $p \geq 1$, show $\|\cdot\|_p$ is a norm on $\mathbb{R}^n$ (i.e., verify positivity, homogeneity, and triangle inequality).

5. Prove $\displaystyle \int_0^1 f(x)\, dx \leq \sqrt{\int_0^1 f(x)^2\, dx}$ for non-negative $f$ on $[0,1]$.

### Solutions

**1.** Apply Cauchy-Schwarz with $a_k = 1$, $b_k = k$:
$$\sum_{k=1}^n 1 \cdot k \leq \sqrt{\sum 1^2}\sqrt{\sum k^2} = \sqrt{n}\sqrt{\sum k^2}. \quad \blacksquare$$
Equality iff $(1,1,\ldots,1)$ is proportional to $(1,2,\ldots,n)$, which holds only when $n = 1$.

**2.** By Cauchy-Schwarz: $(1+1+1)(a^2+b^2+c^2) \geq (a+b+c)^2 = 1$, so $a^2+b^2+c^2 \geq 1/3$. $\blacksquare$

**3.** Statement: $\sum|a_k b_k| \leq (\sum|a_k|^3)^{1/3}(\sum|b_k|^{3/2})^{2/3}$. Proof: $p = 3, q = 3/2$ are conjugate ($1/3 + 2/3 = 1$). Apply the general Hölder proof (§2.5) with these exponents. $\blacksquare$

**4.** Write $\|x\|_p = (\sum|x_k|^p)^{1/p}$.
- **Positivity:** $\|x\|_p \geq 0$ and $\|x\|_p = 0 \iff$ all $x_k = 0$ $\iff x = 0$.
- **Homogeneity:** $\|cx\|_p = (\sum|cx_k|^p)^{1/p} = |c|(\sum|x_k|^p)^{1/p} = |c|\|x\|_p$.
- **Triangle:** Minkowski's inequality, proved in §2.6. $\blacksquare$

**5.** Apply Cauchy-Schwarz integral form with $g(x) \equiv 1$:
$$\int_0^1 f(x) \cdot 1\, dx \leq \sqrt{\int_0^1 f^2}\sqrt{\int_0^1 1^2} = \sqrt{\int_0^1 f^2}. \blacksquare$$

---

## Related Topics
- [[01-real-number-system]] — absolute value and ordered field foundations
- [[03-supremum-and-infimum]] — inequalities often appear inside sup/inf arguments
- [[13-series-convergence-tests]] — Hölder and Minkowski extend to infinite sums
- [[25-riemann-stieltjes-integral]] — integral forms of these inequalities
