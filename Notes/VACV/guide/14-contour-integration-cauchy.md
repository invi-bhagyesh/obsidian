# 14. Contour Integration & Cauchy's Theorems

---

## 14.1 Contours and Parametrization

### Arc
A **smooth arc** is a curve $z(t) = x(t)+iy(t)$, $a \leq t \leq b$, where $z'(t)$ is continuous and nonzero on $(a,b)$.

### Contour
A **contour** is a piecewise smooth curve: finitely many smooth arcs joined end-to-end.

A contour is **closed** if $z(a) = z(b)$. A **simple closed contour** does not cross itself.

### Orientation
Positive orientation (counterclockwise) = interior is on the left.

---

## 14.2 Contour Integrals

### Definition
For $f$ continuous on a contour $C$ parametrized by $z(t)$, $a \leq t \leq b$:

$$\int_C f(z)\,dz = \int_a^b f(z(t))\,z'(t)\,dt$$

### Properties
| Property | Formula |
|----------|---------|
| Linearity | $\int_C [af+bg]\,dz = a\int_C f\,dz + b\int_C g\,dz$ |
| Reversal | $\int_{-C}f\,dz = -\int_C f\,dz$ |
| Splitting | $\int_{C_1+C_2}f\,dz = \int_{C_1}f\,dz + \int_{C_2}f\,dz$ |

### ML-Inequality (Upper Bound)

> **Theorem.** If $|f(z)| \leq M$ on $C$ and $L$ = length of $C$, then:
> $$\left|\int_C f(z)\,dz\right| \leq ML$$

This is extremely useful for bounding integrals.

---

## 14.3 Antiderivatives

> **Theorem.** If $f$ is continuous in a domain $D$ and has an antiderivative $F$ (i.e., $F'(z) = f(z)$) throughout $D$, then for any contour $C$ in $D$ from $z_1$ to $z_2$:
> $$\int_C f(z)\,dz = F(z_2) - F(z_1)$$

**Corollary:** If $f$ has an antiderivative in $D$, then $\oint_C f(z)\,dz = 0$ for every closed contour in $D$.

**Example:** $\int_C z^2\,dz = \frac{z^3}{3}\Big|_{z_1}^{z_2} = \frac{z_2^3 - z_1^3}{3}$ (path independent since $z^2$ has antiderivative $z^3/3$).

---

## 14.4 Cauchy-Goursat Theorem

> **Theorem (Cauchy-Goursat).** If $f$ is analytic **on and inside** a simple closed contour $C$, then:
> $$\boxed{\oint_C f(z)\,dz = 0}$$

### Significance
- This is the fundamental theorem of complex analysis
- Analytic functions have zero circulation around any closed contour (within the domain of analyticity)
- It holds even without assuming $f'$ is continuous (Goursat's improvement)

### Simply Connected Domain Version
If $f$ is analytic in a simply connected domain $D$, then $\oint_C f(z)\,dz = 0$ for **every** closed contour $C$ in $D$.

### Multiply Connected Domains
If $f$ is analytic in the region between simple closed contours $C$ (outer) and $C_1, C_2, \ldots, C_n$ (inner, all with same orientation), then:

$$\oint_C f(z)\,dz = \sum_{k=1}^n \oint_{C_k} f(z)\,dz$$

**Deformation principle:** If $f$ is analytic between two simple closed contours, the integral over the outer equals the integral over the inner.

---

## 14.5 Cauchy Integral Formula

> **Theorem.** If $f$ is analytic on and inside a simple closed contour $C$ (positively oriented), and $z_0$ is any point inside $C$, then:
>
> $$\boxed{f(z_0) = \frac{1}{2\pi i}\oint_C \frac{f(z)}{z-z_0}\,dz}$$

### Rearranged form (more commonly used for computation):
$$\oint_C \frac{f(z)}{z-z_0}\,dz = 2\pi i\,f(z_0)$$

### Extended Cauchy Integral Formula (for derivatives)

> **Theorem.** If $f$ is analytic inside and on $C$, then $f$ has derivatives of all orders inside $C$, and:
>
> $$f^{(n)}(z_0) = \frac{n!}{2\pi i}\oint_C \frac{f(z)}{(z-z_0)^{n+1}}\,dz$$

Rearranged:
$$\oint_C \frac{f(z)}{(z-z_0)^{n+1}}\,dz = \frac{2\pi i}{n!}f^{(n)}(z_0)$$

### Consequences
1. **Analytic functions are infinitely differentiable** (all derivatives exist)
2. **Liouville's Theorem:** If $f$ is entire and bounded, then $f$ is constant
3. **Fundamental Theorem of Algebra:** Every nonconstant polynomial has a root in $\mathbb{C}$

---

## 14.6 Key Integral: $\oint_C \frac{1}{(z-z_0)^n}\,dz$

For $C$ a circle $|z-z_0| = r$ traversed counterclockwise:

$$\oint_C \frac{dz}{(z-z_0)^n} = \begin{cases} 2\pi i & \text{if } n = 1 \\ 0 & \text{if } n \neq 1 \text{ (integer)} \end{cases}$$

**Proof for $n=1$:** Parametrize $z = z_0+re^{it}$, $0 \leq t \leq 2\pi$. $dz = ire^{it}dt$.
$$\oint \frac{dz}{z-z_0} = \int_0^{2\pi}\frac{ire^{it}}{re^{it}}dt = \int_0^{2\pi}i\,dt = 2\pi i$$

**For $n \neq 1$:** $\frac{1}{(z-z_0)^n}$ has antiderivative $\frac{(z-z_0)^{1-n}}{1-n}$ (when $n \neq 1$), which is analytic on the contour, so the integral is $0$.

---

## 14.7 Maximum Modulus Principle

> If $f$ is analytic and nonconstant in a domain $D$, then $|f(z)|$ has **no maximum** in $D$.

> If $f$ is continuous on a closed bounded region $\bar{D}$ and analytic in its interior, then $|f(z)|$ attains its maximum on the **boundary**.

---

## Worked Examples

**Example 1:** Evaluate $\oint_{|z|=2}\frac{e^z}{z-1}\,dz$.

*Solution:*
$f(z) = e^z$ is entire. $z_0 = 1$ is inside $|z| = 2$.

By Cauchy integral formula: $\oint\frac{e^z}{z-1}dz = 2\pi i\cdot f(1) = 2\pi i\cdot e$.

**Example 2:** Evaluate $\oint_{|z|=1}\frac{z^2}{z-2}\,dz$.

*Solution:*
$z_0 = 2$ is **outside** $|z| = 1$. The integrand $\frac{z^2}{z-2}$ is analytic inside $|z|=1$.

By Cauchy-Goursat: $\oint = 0$.

**Example 3:** Evaluate $\oint_{|z|=1}\frac{\sin z}{z^3}\,dz$.

*Solution:*
This is $\oint\frac{f(z)}{(z-0)^3}dz$ with $f(z) = \sin z$, $z_0 = 0$, $n = 2$.

By extended Cauchy formula: $= \frac{2\pi i}{2!}f''(0)$.

$f''(z) = -\sin z$, $f''(0) = 0$.

$\oint = \frac{2\pi i}{2}\cdot 0 = 0$.

**Example 4:** Evaluate $\oint_{|z|=1}\frac{e^z}{z^2}\,dz$.

*Solution:*
$f(z) = e^z$, $z_0 = 0$, $n = 1$: $\oint\frac{f(z)}{(z-0)^2}dz = \frac{2\pi i}{1!}f'(0) = 2\pi i\cdot e^0 = 2\pi i$.

**Example 5:** Evaluate $\oint_{|z-i|=2}\frac{z}{z^2+1}\,dz$.

*Solution:*
$z^2+1 = (z-i)(z+i)$. So $\frac{z}{z^2+1} = \frac{z}{(z-i)(z+i)}$.

Inside $|z-i|=2$: both $z = i$ and $z = -i$ are inside (since $|(-i)-i| = 2$, the point $-i$ is on the boundary — we must check: $|-i-i| = |{-2i}| = 2$. On the boundary, not inside. So only $z = i$ is inside.)

Write $\frac{z}{(z-i)(z+i)} = \frac{f(z)}{z-i}$ where $f(z) = \frac{z}{z+i}$.

$\oint = 2\pi i\cdot f(i) = 2\pi i\cdot\frac{i}{2i} = 2\pi i\cdot\frac{1}{2} = \pi i$.

---

## Practice Problems

1. Evaluate $\oint_{|z|=3}\frac{\cos z}{z}\,dz$.

2. Evaluate $\oint_{|z|=1}\frac{dz}{z^2+4}$.

3. Use the ML-inequality to show $\left|\oint_{|z|=R}\frac{dz}{z^4+1}\right| \leq \frac{2\pi R}{R^4-1}$ for $R > 1$.

4. Evaluate $\oint_{|z|=2}\frac{z+1}{z^2-z}\,dz$.

5. Evaluate $\oint_{|z-1|=1}\frac{e^z}{(z-1)^3}\,dz$.

### Solutions

**1.** Evaluate $\oint_{|z|=3}\frac{\cos z}{z}\,dz$.

**Step 1.** The integrand has the form $\frac{f(z)}{z - z_0}$ with $f(z) = \cos z$ (entire) and $z_0 = 0$.

**Step 2.** Since $|0| = 0 < 3$, the point $z_0 = 0$ lies inside the contour.

**Step 3.** By the **Cauchy Integral Formula**:

$$\oint_{|z|=3}\frac{\cos z}{z}\,dz = 2\pi i \cdot f(0) = 2\pi i \cdot \cos 0 = 2\pi i$$

---

**2.** Evaluate $\oint_{|z|=1}\frac{dz}{z^2+4}$.

**Step 1.** Factor the denominator: $z^2 + 4 = (z - 2i)(z + 2i)$.

**Step 2.** Check which singularities lie inside $|z| = 1$:
- $|2i| = 2 > 1$ (outside)
- $|-2i| = 2 > 1$ (outside)

**Step 3.** Since the integrand $\frac{1}{z^2+4}$ is analytic on and inside $|z| = 1$, by the **Cauchy-Goursat Theorem**:

$$\oint_{|z|=1}\frac{dz}{z^2+4} = 0$$

---

**3.** Use the ML-inequality to show $\left|\oint_{|z|=R}\frac{dz}{z^4+1}\right| \leq \frac{2\pi R}{R^4-1}$ for $R > 1$.

**Step 1.** Find an upper bound $M$ for $|f(z)| = \left|\frac{1}{z^4+1}\right|$ on $|z| = R$.

On the contour $|z| = R$, by the reverse triangle inequality:

$$|z^4 + 1| \geq \big||z^4| - |1|\big| = |R^4 - 1| = R^4 - 1 \quad(\text{since } R > 1)$$

Therefore:

$$\left|\frac{1}{z^4+1}\right| \leq \frac{1}{R^4-1} = M$$

**Step 2.** The length of the contour $|z| = R$ is $L = 2\pi R$.

**Step 3.** By the **ML-inequality**:

$$\left|\oint_{|z|=R}\frac{dz}{z^4+1}\right| \leq ML = \frac{2\pi R}{R^4-1} \qquad\blacksquare$$

---

**4.** Evaluate $\oint_{|z|=2}\frac{z+1}{z^2-z}\,dz$.

**Step 1.** Factor the denominator: $z^2 - z = z(z-1)$. Singularities at $z = 0$ and $z = 1$, both inside $|z| = 2$.

**Step 2.** Decompose into partial fractions:

$$\frac{z+1}{z(z-1)} = \frac{A}{z} + \frac{B}{z-1}$$

Setting $z = 0$: $A = \frac{0+1}{0-1} = -1$. Setting $z = 1$: $B = \frac{1+1}{1} = 2$.

**Step 3.** Therefore:

$$\oint_{|z|=2}\frac{z+1}{z(z-1)}\,dz = -\oint_{|z|=2}\frac{dz}{z} + 2\oint_{|z|=2}\frac{dz}{z-1}$$

**Step 4.** By the Cauchy Integral Formula (or the fundamental integral $\oint\frac{dz}{z-z_0} = 2\pi i$ when $z_0$ is inside):

$$= -(2\pi i) + 2(2\pi i) = -2\pi i + 4\pi i = 2\pi i$$

---

**5.** Evaluate $\oint_{|z-1|=1}\frac{e^z}{(z-1)^3}\,dz$.

**Step 1.** The integrand has the form $\frac{f(z)}{(z-z_0)^{n+1}}$ with $f(z) = e^z$, $z_0 = 1$, and $n = 2$.

**Step 2.** Since $z_0 = 1$ is the centre of the contour $|z-1| = 1$, it lies inside.

**Step 3.** By the **Extended Cauchy Integral Formula**:

$$\oint_{|z-1|=1}\frac{e^z}{(z-1)^3}\,dz = \frac{2\pi i}{2!}\,f''(1)$$

**Step 4.** Since $f(z) = e^z$, we have $f''(z) = e^z$, so $f''(1) = e$.

$$\oint = \frac{2\pi i}{2}\cdot e = \pi i e$$
