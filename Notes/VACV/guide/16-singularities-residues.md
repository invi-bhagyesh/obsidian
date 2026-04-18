# 16. Singularities, Residues & the Residue Theorem

---

## 16.1 Isolated Singular Points

A point $z_0$ is an **isolated singular point** of $f$ if:
- $f$ is **not analytic** at $z_0$
- $f$ **is analytic** in some punctured disk $0 < |z-z_0| < R$

At an isolated singularity, $f$ has a Laurent series:
$$f(z) = \sum_{n=-\infty}^{\infty}c_n(z-z_0)^n = \underbrace{\sum_{n=0}^{\infty}a_n(z-z_0)^n}_{\text{analytic part}} + \underbrace{\sum_{n=1}^{\infty}\frac{b_n}{(z-z_0)^n}}_{\text{principal part}}$$

### Three Types of Isolated Singularities

| Type | Principal Part | Laurent Series |
|------|---------------|----------------|
| **Removable** | Empty ($b_n = 0$ for all $n$) | Only non-negative powers |
| **Pole of order $m$** | Finitely many terms ($b_m \neq 0$, $b_n = 0$ for $n > m$) | Finitely many negative powers |
| **Essential** | Infinitely many terms | Infinitely many negative powers |

---

## 16.2 Removable Singularities

$z_0$ is a **removable singularity** if $\lim_{z\to z_0}f(z)$ exists (and is finite).

Equivalently: the principal part of the Laurent series is empty.

**Example:** $f(z) = \frac{\sin z}{z}$ at $z_0 = 0$. Laurent series: $1 - \frac{z^2}{6}+\frac{z^4}{120}-\cdots$ (no negative powers). Define $f(0) = 1$ to "remove" the singularity.

**Test:** $z_0$ is removable iff $\lim_{z\to z_0}(z-z_0)f(z) = 0$.

---

## 16.3 Poles

$z_0$ is a **pole of order $m$** if the principal part has exactly $m$ terms:
$$f(z) = \frac{b_m}{(z-z_0)^m} + \cdots + \frac{b_1}{z-z_0} + a_0 + a_1(z-z_0) + \cdots$$

where $b_m \neq 0$.

A **simple pole** has order $m=1$.

### Characterization
$z_0$ is a pole of order $m$ iff:
$$f(z) = \frac{\phi(z)}{(z-z_0)^m}$$

where $\phi$ is analytic at $z_0$ and $\phi(z_0) \neq 0$.

**Test:** $z_0$ is a pole of order $m$ iff $(z-z_0)^m f(z)$ has a removable singularity at $z_0$ (with nonzero limit), but $(z-z_0)^{m-1}f(z)$ does not.

### Behavior at Poles
$$\lim_{z\to z_0}|f(z)| = \infty$$

(The function "blows up" at a pole.)

### Order of Poles for Rational Functions
If $f(z) = p(z)/q(z)$ where $p, q$ are analytic, $p(z_0) \neq 0$, and $q$ has a zero of order $m$ at $z_0$, then $f$ has a pole of order $m$ at $z_0$.

---

## 16.4 Essential Singularities

$z_0$ is an **essential singularity** if the principal part has infinitely many terms.

**Example:** $e^{1/z}$ at $z_0 = 0$: $e^{1/z} = 1+\frac{1}{z}+\frac{1}{2!z^2}+\frac{1}{3!z^3}+\cdots$ (infinitely many negative powers).

### Casorati-Weierstrass Theorem
> Near an essential singularity, $f$ comes arbitrarily close to every complex value. (More precisely: $f$ maps every punctured neighborhood of $z_0$ onto a dense subset of $\mathbb{C}$.)

### Picard's Theorem (stated without proof)
Near an essential singularity, $f$ takes every complex value, with at most one exception, infinitely often.

---

## 16.5 Residues

### Definition
The **residue** of $f$ at an isolated singularity $z_0$ is the coefficient $b_1$ in the Laurent series:

$$\boxed{\text{Res}_{z=z_0}f(z) = b_1 = \frac{1}{2\pi i}\oint_C f(z)\,dz}$$

where $C$ is any positively-oriented simple closed contour around $z_0$ containing no other singularities.

### Why Residues Matter
Rearranging:
$$\oint_C f(z)\,dz = 2\pi i\cdot\text{Res}_{z=z_0}f(z)$$

The residue is the **only** Laurent coefficient that contributes to the contour integral!

---

## 16.6 Computing Residues

### Method 1: From Laurent Series
Expand $f$ in a Laurent series and read off $b_1$.

### Method 2: Simple Poles ($m = 1$)

$$\boxed{\text{Res}_{z=z_0}f(z) = \lim_{z\to z_0}(z-z_0)f(z)}$$

**Special case:** If $f(z) = \frac{p(z)}{q(z)}$ with $p(z_0) \neq 0$, $q(z_0) = 0$, $q'(z_0) \neq 0$ (simple zero):

$$\text{Res}_{z=z_0}\frac{p(z)}{q(z)} = \frac{p(z_0)}{q'(z_0)}$$

### Method 3: Poles of Order $m$

$$\boxed{\text{Res}_{z=z_0}f(z) = \frac{1}{(m-1)!}\lim_{z\to z_0}\frac{d^{m-1}}{dz^{m-1}}\left[(z-z_0)^m f(z)\right]}$$

### Method 4: For Pole of Order 2

$$\text{Res}_{z=z_0}f(z) = \lim_{z\to z_0}\frac{d}{dz}\left[(z-z_0)^2 f(z)\right]$$

---

## 16.7 Cauchy's Residue Theorem

> **Theorem.** Let $C$ be a positively-oriented simple closed contour. If $f$ is analytic on and inside $C$ except for finitely many isolated singularities $z_1, z_2, \ldots, z_n$ inside $C$, then:
>
> $$\boxed{\oint_C f(z)\,dz = 2\pi i\sum_{k=1}^{n}\text{Res}_{z=z_k}f(z)}$$

This is the **most powerful computational tool** in complex analysis.

---

## 16.8 Zeros and Poles

### Zeros
$z_0$ is a **zero of order $m$** of $f$ if $f(z_0) = f'(z_0) = \cdots = f^{(m-1)}(z_0) = 0$ but $f^{(m)}(z_0) \neq 0$.

Equivalently: $f(z) = (z-z_0)^m g(z)$ where $g$ is analytic and $g(z_0) \neq 0$.

### Relationship: Zeros and Poles
If $f$ has a zero of order $m$ at $z_0$, then $1/f$ has a pole of order $m$ at $z_0$.

---

## Worked Examples

**Example 1:** Classify the singularity of $\frac{e^z-1}{z}$ at $z = 0$.

*Solution:*
$e^z - 1 = z + \frac{z^2}{2}+\cdots$, so $\frac{e^z-1}{z} = 1+\frac{z}{2}+\frac{z^2}{6}+\cdots$

No negative powers $\implies$ **removable singularity** (limit $= 1$).

**Example 2:** Find $\text{Res}_{z=0}\frac{e^z}{z^3}$.

*Solution:*
$\frac{e^z}{z^3} = \frac{1}{z^3}+\frac{1}{z^2}+\frac{1}{2z}+\frac{1}{6}+\cdots$

$b_1 = 1/2$. So $\text{Res}_{z=0} = \frac{1}{2}$.

**Example 3:** Find $\text{Res}_{z=1}\frac{z^2}{(z-1)(z+2)}$.

*Solution:*
Simple pole at $z=1$: $\text{Res} = \lim_{z\to 1}(z-1)\cdot\frac{z^2}{(z-1)(z+2)} = \frac{1}{3}$.

Or: $p(z)/q(z)$ with $q(z) = z^2+z-2$, $q'(z) = 2z+1$. $\frac{p(1)}{q'(1)} = \frac{1}{3}$.

**Example 4:** Find $\text{Res}_{z=0}\frac{z\cos z}{(z-\pi)^2}$.

*Solution:*
$z=0$ is not a singularity (the function is analytic at $z=0$). Residue $= 0$!

At $z = \pi$: pole of order 2. $\text{Res}_{z=\pi} = \lim_{z\to\pi}\frac{d}{dz}[(z-\pi)^2\cdot\frac{z\cos z}{(z-\pi)^2}] = \lim_{z\to\pi}\frac{d}{dz}(z\cos z) = \lim_{z\to\pi}(\cos z - z\sin z) = -1-0 = -1$.

**Example 5:** Evaluate $\oint_{|z|=2}\frac{z}{(z-1)(z+3)}\,dz$.

*Solution:*
Singularities: $z = 1$ (inside $|z|=2$), $z = -3$ (outside $|z|=2$).

$\text{Res}_{z=1} = \frac{1}{1+3} = \frac{1}{4}$.

$\oint = 2\pi i\cdot\frac{1}{4} = \frac{\pi i}{2}$.

**Example 6:** Evaluate $\oint_{|z|=3}\frac{5z-2}{z(z-1)}\,dz$.

*Solution:*
Both $z = 0$ and $z = 1$ are inside $|z| = 3$.

$\text{Res}_{z=0} = \lim_{z\to 0}\frac{5z-2}{z-1} = \frac{-2}{-1} = 2$.

$\text{Res}_{z=1} = \lim_{z\to 1}\frac{5z-2}{z} = \frac{3}{1} = 3$.

$\oint = 2\pi i(2+3) = 10\pi i$.

**Example 7:** Classify the singularity of $e^{1/z}$ at $z = 0$.

Laurent series: $1+\frac{1}{z}+\frac{1}{2z^2}+\frac{1}{6z^3}+\cdots$ — infinitely many negative-power terms.

**Essential singularity.** $\text{Res}_{z=0}e^{1/z} = 1$ (coefficient of $1/z$).

---

## Practice Problems

1. Classify the singularity and find the residue at the given point:
   (a) $\frac{z}{e^z-1}$ at $z=0$; (b) $\frac{\sin z}{z^2}$ at $z=0$; (c) $\frac{1}{z^2(z-i)}$ at $z=0$ and $z=i$.

2. Evaluate $\oint_{|z|=2}\frac{e^z}{z(z-1)^2}\,dz$.

3. Evaluate $\oint_{|z|=4}\frac{z^3+2z}{(z-i)(z+3i)}\,dz$.

4. Find $\text{Res}_{z=0}\frac{z-\sin z}{z^3}$.

5. Show that $\text{Res}_{z=z_0}\frac{1}{(z-z_0)^n} = 0$ for $n \neq 1$ and $= 1$ for $n = 1$.

### Solutions

**1.** Classify the singularity and find the residue at the given point.

**(a)** $\frac{z}{e^z-1}$ at $z = 0$.

**Step 1.** Expand $e^z - 1$ in its Maclaurin series:

$$e^z - 1 = z + \frac{z^2}{2} + \frac{z^3}{6} + \cdots = z\!\left(1 + \frac{z}{2} + \frac{z^2}{6} + \cdots\right)$$

**Step 2.** Therefore:

$$\frac{z}{e^z-1} = \frac{1}{1+z/2+z^2/6+\cdots} = 1 - \frac{z}{2} + \cdots$$

The Laurent series has **no negative powers**. Therefore $z = 0$ is a **removable singularity**, and $\text{Res}_{z=0} = 0$.

**(b)** $\frac{\sin z}{z^2}$ at $z = 0$.

**Step 1.** Expand: $\sin z = z - \frac{z^3}{6} + \frac{z^5}{120} - \cdots$

**Step 2.** Divide by $z^2$:

$$\frac{\sin z}{z^2} = \frac{1}{z} - \frac{z}{6} + \frac{z^3}{120} - \cdots$$

The principal part is $\frac{1}{z}$ (one negative-power term), so $z = 0$ is a **simple pole**.

$\text{Res}_{z=0} = 1$ (coefficient of $1/z$).

**(c)** $\frac{1}{z^2(z-i)}$: at $z = 0$ and $z = i$.

**At $z = 0$ (pole of order 2):** Apply the order-$m$ residue formula with $m = 2$:

$$\text{Res}_{z=0} = \frac{1}{1!}\lim_{z\to 0}\frac{d}{dz}\!\left[z^2 \cdot \frac{1}{z^2(z-i)}\right] = \lim_{z\to 0}\frac{d}{dz}\!\left[\frac{1}{z-i}\right]$$

$$= \lim_{z\to 0}\frac{-1}{(z-i)^2} = \frac{-1}{(-i)^2} = \frac{-1}{-1} = 1$$

**At $z = i$ (simple pole):** Cancel the factor $(z-i)$:

$$\text{Res}_{z=i} = \lim_{z\to i}\frac{1}{z^2} = \frac{1}{i^2} = \frac{1}{-1} = -1$$

---

**2.** Evaluate $\oint_{|z|=2}\frac{e^z}{z(z-1)^2}\,dz$.

**Step 1.** Identify singularities inside $|z| = 2$: $z = 0$ (simple pole) and $z = 1$ (pole of order 2).

**Step 2.** Residue at $z = 0$ (simple pole): Cancel the factor $z$:

$$\text{Res}_{z=0} = \lim_{z\to 0}\frac{e^z}{(z-1)^2} = \frac{e^0}{(-1)^2} = 1$$

**Step 3.** Residue at $z = 1$ (pole of order 2): Apply the order-2 formula:

$$\text{Res}_{z=1} = \lim_{z\to 1}\frac{d}{dz}\!\left[\frac{e^z}{z}\right] = \lim_{z\to 1}\frac{ze^z - e^z}{z^2} = \lim_{z\to 1}\frac{e^z(z-1)}{z^2} = \frac{e \cdot 0}{1} = 0$$

**Step 4.** By the **Residue Theorem**:

$$\oint = 2\pi i(1 + 0) = 2\pi i$$

---

**3.** Evaluate $\oint_{|z|=4}\frac{z^3+2z}{(z-i)(z+3i)}\,dz$.

**Step 1.** Singularities: $z = i$ and $z = -3i$, both simple poles. Check: $|i| = 1 < 4$ and $|-3i| = 3 < 4$, so both are inside $|z| = 4$.

**Step 2.** Residue at $z = i$: Cancel $(z - i)$:

$$\text{Res}_{z=i} = \frac{i^3+2i}{i-(-3i)} = \frac{-i+2i}{4i} = \frac{i}{4i} = \frac{1}{4}$$

**Step 3.** Residue at $z = -3i$: Cancel $(z + 3i)$:

$$\text{Res}_{z=-3i} = \frac{(-3i)^3+2(-3i)}{-3i-i} = \frac{27i - 6i}{-4i} = \frac{21i}{-4i} = -\frac{21}{4}$$

**Step 4.** By the **Residue Theorem**:

$$\oint = 2\pi i\!\left(\frac{1}{4} - \frac{21}{4}\right) = 2\pi i(-5) = -10\pi i$$

---

**4.** Find $\text{Res}_{z=0}\frac{z-\sin z}{z^3}$.

**Step 1.** Expand $z - \sin z$ using the Maclaurin series of $\sin z$:

$$z - \sin z = z - \left(z - \frac{z^3}{6} + \frac{z^5}{120} - \cdots\right) = \frac{z^3}{6} - \frac{z^5}{120} + \cdots$$

**Step 2.** Divide by $z^3$:

$$\frac{z-\sin z}{z^3} = \frac{1}{6} - \frac{z^2}{120} + \cdots$$

**Step 3.** The series has **no negative powers**, so $z = 0$ is a **removable singularity** and $\text{Res}_{z=0} = 0$.

---

**5.** Show that $\text{Res}_{z=z_0}\frac{1}{(z-z_0)^n} = 0$ for $n \neq 1$ and $= 1$ for $n = 1$.

**Proof.** The function $f(z) = (z-z_0)^{-n}$ is already in Laurent series form: it consists of a single term $c_{-n}(z-z_0)^{-n}$ with $c_{-n} = 1$, and all other coefficients are zero.

The residue is defined as the coefficient $c_{-1}$ of $(z-z_0)^{-1}$. Therefore:

- If $n = 1$: $c_{-1} = 1$, so $\text{Res}_{z=z_0}f(z) = 1$.
- If $n \neq 1$: $c_{-1} = 0$, so $\text{Res}_{z=z_0}f(z) = 0$.

*Alternatively*, by direct computation: parametrise $C: z = z_0 + re^{it}$, $0 \leq t \leq 2\pi$. Then $dz = ire^{it}dt$ and:

$$\oint_C\frac{dz}{(z-z_0)^n} = \int_0^{2\pi}\frac{ire^{it}}{r^n e^{int}}\,dt = \frac{i}{r^{n-1}}\int_0^{2\pi}e^{i(1-n)t}\,dt$$

For $n = 1$: the integral is $\int_0^{2\pi}1\,dt = 2\pi$, giving $\oint = 2\pi i$.

For $n \neq 1$: $\int_0^{2\pi}e^{i(1-n)t}\,dt = \frac{e^{2\pi i(1-n)}-1}{i(1-n)} = 0$ (since $1-n$ is a nonzero integer).

Therefore $\text{Res} = \frac{1}{2\pi i}\oint_C f\,dz$ equals $1$ when $n=1$ and $0$ otherwise. $\blacksquare$
