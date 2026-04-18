# 15. Power Series, Taylor Series & Laurent Series

---

## 15.1 Power Series

A **power series** about $z_0$ is:
$$\sum_{n=0}^{\infty}a_n(z-z_0)^n = a_0 + a_1(z-z_0) + a_2(z-z_0)^2 + \cdots$$

### Radius of Convergence

Every power series has a **radius of convergence** $R$ ($0 \leq R \leq \infty$):
- Converges absolutely for $|z-z_0| < R$
- Diverges for $|z-z_0| > R$
- On $|z-z_0| = R$: must check case by case

**Formulas:**
$$\frac{1}{R} = \limsup_{n\to\infty}|a_n|^{1/n}$$

or (when the limit exists):
$$\frac{1}{R} = \lim_{n\to\infty}\left|\frac{a_{n+1}}{a_n}\right|$$

### Properties of Power Series (inside $|z-z_0| < R$)
1. **Absolute convergence** inside the circle
2. **Uniform convergence** on any closed disk $|z-z_0| \leq r < R$
3. The sum is **analytic** inside the circle
4. **Term-by-term differentiation:**
   $f'(z) = \sum_{n=1}^{\infty}na_n(z-z_0)^{n-1}$ (same radius of convergence)
5. **Term-by-term integration:**
   $\int f(z)\,dz = C + \sum_{n=0}^{\infty}\frac{a_n}{n+1}(z-z_0)^{n+1}$ (same radius)
6. **Uniqueness:** If two power series about the same point have the same sum, their coefficients are identical

---

## 15.2 Taylor Series

> **Taylor's Theorem.** If $f$ is analytic in a domain containing the disk $|z-z_0| < R_0$, then $f$ has the power series representation:
>
> $$\boxed{f(z) = \sum_{n=0}^{\infty}\frac{f^{(n)}(z_0)}{n!}(z-z_0)^n}$$
>
> valid for $|z-z_0| < R$, where $R$ is the distance from $z_0$ to the nearest singularity of $f$.

### Coefficient Formula (via Cauchy)
$$a_n = \frac{f^{(n)}(z_0)}{n!} = \frac{1}{2\pi i}\oint_C \frac{f(z)}{(z-z_0)^{n+1}}\,dz$$

### Maclaurin Series ($z_0 = 0$)
$$f(z) = \sum_{n=0}^{\infty}\frac{f^{(n)}(0)}{n!}z^n$$

### Important Maclaurin Series

| Function | Series | Radius |
|----------|--------|--------|
| $e^z$ | $\sum_{n=0}^{\infty}\frac{z^n}{n!}$ | $\infty$ |
| $\sin z$ | $\sum_{n=0}^{\infty}\frac{(-1)^n z^{2n+1}}{(2n+1)!}$ | $\infty$ |
| $\cos z$ | $\sum_{n=0}^{\infty}\frac{(-1)^n z^{2n}}{(2n)!}$ | $\infty$ |
| $\sinh z$ | $\sum_{n=0}^{\infty}\frac{z^{2n+1}}{(2n+1)!}$ | $\infty$ |
| $\cosh z$ | $\sum_{n=0}^{\infty}\frac{z^{2n}}{(2n)!}$ | $\infty$ |
| $\frac{1}{1-z}$ | $\sum_{n=0}^{\infty}z^n$ | $1$ |
| $\frac{1}{(1-z)^2}$ | $\sum_{n=1}^{\infty}nz^{n-1}$ | $1$ |
| $\text{Log}(1+z)$ | $\sum_{n=1}^{\infty}\frac{(-1)^{n-1}}{n}z^n$ | $1$ |

---

## 15.3 Laurent Series

### Motivation
Taylor series work only for analytic functions. What about functions with singularities? Laurent series handles this by allowing **negative powers**.

### Statement

> **Laurent's Theorem.** If $f$ is analytic in the annulus $r_1 < |z-z_0| < r_2$, then:
>
> $$\boxed{f(z) = \sum_{n=0}^{\infty}a_n(z-z_0)^n + \sum_{n=1}^{\infty}\frac{b_n}{(z-z_0)^n}}$$
>
> The first sum is the **analytic part** (or regular part). The second sum is the **principal part**.

### Coefficients
$$a_n = \frac{1}{2\pi i}\oint_C \frac{f(z)}{(z-z_0)^{n+1}}\,dz, \qquad b_n = \frac{1}{2\pi i}\oint_C f(z)(z-z_0)^{n-1}\,dz$$

where $C$ is any positively-oriented circle $|z-z_0| = \rho$ with $r_1 < \rho < r_2$.

### Unified Form
Writing $c_n = a_n$ for $n \geq 0$ and $c_{-n} = b_n$ for $n \geq 1$:
$$f(z) = \sum_{n=-\infty}^{\infty}c_n(z-z_0)^n$$

### Uniqueness
The Laurent series in a given annulus is **unique**.

---

## 15.4 Finding Laurent Series: Techniques

### Method 1: Known Taylor Series with Substitution

**Example:** Find the Laurent series of $\frac{e^z}{z^3}$ about $z_0 = 0$.

$e^z = 1 + z + \frac{z^2}{2!} + \frac{z^3}{3!} + \cdots$

$\frac{e^z}{z^3} = \frac{1}{z^3}+\frac{1}{z^2}+\frac{1}{2z}+\frac{1}{6}+\frac{z}{24}+\cdots$

### Method 2: Partial Fractions + Geometric Series

**Example:** Find the Laurent series of $\frac{1}{z(z-1)}$ for $0 < |z| < 1$.

$\frac{1}{z(z-1)} = \frac{-1}{z} + \frac{1}{z-1} = -\frac{1}{z} - \frac{1}{1-z} = -\frac{1}{z} - \sum_{n=0}^{\infty}z^n$

$= -\frac{1}{z} - 1 - z - z^2 - \cdots$

### Method 3: Different Regions Give Different Series

The same function can have different Laurent series in different annuli around the same point.

**Example:** $f(z) = \frac{1}{z(z-1)}$ about $z_0 = 0$:
- **Region $0 < |z| < 1$:** (above) $-\frac{1}{z}-1-z-z^2-\cdots$
- **Region $|z| > 1$:** Use $\frac{1}{z-1} = \frac{1}{z}\cdot\frac{1}{1-1/z} = \frac{1}{z}\sum_{n=0}^{\infty}\frac{1}{z^n} = \sum_{n=0}^{\infty}\frac{1}{z^{n+1}}$.
  So $\frac{1}{z(z-1)} = -\frac{1}{z}+\frac{1}{z-1} = -\frac{1}{z}+\sum_{n=0}^{\infty}\frac{1}{z^{n+1}} = \sum_{n=2}^{\infty}\frac{1}{z^n}$

---

## Worked Examples

**Example 1:** Find the Taylor series of $f(z) = \frac{1}{1+z^2}$ about $z_0 = 0$.

*Solution:*
$\frac{1}{1+z^2} = \frac{1}{1-(-z^2)} = \sum_{n=0}^{\infty}(-z^2)^n = \sum_{n=0}^{\infty}(-1)^n z^{2n}$

Valid for $|z^2| < 1$, i.e., $|z| < 1$. (Nearest singularities at $z = \pm i$, distance $1$ from origin.)

**Example 2:** Find the Taylor series of $\frac{z}{z-2}$ about $z_0 = 1$.

*Solution:*
Let $w = z-1$, so $z = 1+w$ and $z-2 = w-1$.

$\frac{z}{z-2} = \frac{1+w}{w-1} = -\frac{1+w}{1-w} = -(1+w)\sum_{n=0}^{\infty}w^n = -(1+w)(1+w+w^2+\cdots)$

$= -(1+2w+2w^2+2w^3+\cdots) = -1-2\sum_{n=1}^{\infty}(z-1)^n$

Valid for $|z-1| < 1$ (nearest singularity at $z = 2$, distance $1$).

**Example 3:** Find the Laurent series of $\frac{\sin z}{z^4}$ about $z_0 = 0$.

*Solution:*
$\sin z = z - \frac{z^3}{6} + \frac{z^5}{120} - \cdots$

$\frac{\sin z}{z^4} = \frac{1}{z^3}-\frac{1}{6z}+\frac{z}{120}-\cdots$

Valid for $0 < |z| < \infty$.

**Example 4:** Find the Laurent series of $f(z) = \frac{1}{(z-1)(z-3)}$ in the annulus $1 < |z| < 3$.

*Solution:*
Partial fractions: $f(z) = \frac{1}{2}\left(\frac{1}{z-3}-\frac{1}{z-1}\right)$.

For $|z| < 3$: $\frac{1}{z-3} = -\frac{1}{3}\cdot\frac{1}{1-z/3} = -\frac{1}{3}\sum_{n=0}^{\infty}\frac{z^n}{3^n}$

For $|z| > 1$: $\frac{1}{z-1} = \frac{1}{z}\cdot\frac{1}{1-1/z} = \sum_{n=0}^{\infty}\frac{1}{z^{n+1}}$

$$f(z) = \frac{1}{2}\left(-\sum_{n=0}^{\infty}\frac{z^n}{3^{n+1}} - \sum_{n=0}^{\infty}\frac{1}{z^{n+1}}\right)$$

---

## Practice Problems

1. Find the Maclaurin series and radius of convergence for $f(z) = \frac{z}{(1+z)^2}$.

2. Find the Laurent series of $e^{1/z}$ about $z_0 = 0$. What is the principal part?

3. Find the Laurent series of $\frac{1}{z^2-z}$ valid for (a) $0 < |z| < 1$; (b) $|z| > 1$.

4. Find the first four nonzero terms of the Taylor series of $\tan z$ about $z = 0$.

5. Find the Laurent series of $\frac{z}{(z-1)(z-2)}$ in the annulus $1 < |z| < 2$.

### Solutions

**1.** Find the Maclaurin series and radius of convergence for $f(z) = \frac{z}{(1+z)^2}$.

**Step 1.** Note that $\frac{1}{(1+z)^2} = \frac{d}{dz}\!\left[\frac{-1}{1+z}\right]$. Start from the geometric series:

$$\frac{1}{1+z} = \sum_{n=0}^{\infty}(-1)^n z^n, \quad |z| < 1$$

**Step 2.** Differentiate term-by-term (valid inside the radius of convergence):

$$\frac{-1}{(1+z)^2} = \sum_{n=1}^{\infty}(-1)^n n z^{n-1} \implies \frac{1}{(1+z)^2} = \sum_{n=1}^{\infty}(-1)^{n-1}nz^{n-1}$$

**Step 3.** Multiply by $z$:

$$\frac{z}{(1+z)^2} = \sum_{n=1}^{\infty}(-1)^{n-1}nz^n = z - 2z^2 + 3z^3 - 4z^4 + \cdots$$

**Step 4.** The radius of convergence equals that of the original geometric series: $R = 1$.

(The nearest singularity of $f$ to $z_0 = 0$ is at $z = -1$, distance $1$, confirming $R = 1$.)

---

**2.** Find the Laurent series of $e^{1/z}$ about $z_0 = 0$.

**Step 1.** Substitute $w = 1/z$ into the Maclaurin series of $e^w$:

$$e^{1/z} = \sum_{n=0}^{\infty}\frac{1}{n!\,z^n} = 1 + \frac{1}{z} + \frac{1}{2!\,z^2} + \frac{1}{3!\,z^3} + \cdots$$

**Step 2.** This series is valid for $0 < |z| < \infty$ (i.e., all $z \neq 0$).

**Step 3.** The **principal part** is $\sum_{n=1}^{\infty}\frac{1}{n!\,z^n}$, which has infinitely many terms. Therefore $z = 0$ is an essential singularity of $e^{1/z}$.

---

**3.** Find the Laurent series of $\frac{1}{z^2-z}$ valid for (a) $0 < |z| < 1$; (b) $|z| > 1$.

**Step 1.** Partial fractions: $\frac{1}{z^2-z} = \frac{1}{z(z-1)} = \frac{-1}{z} + \frac{1}{z-1}$.

(Verify: $\frac{-1}{z}+\frac{1}{z-1} = \frac{-(z-1)+z}{z(z-1)} = \frac{1}{z(z-1)}$ $\checkmark$)

**(a)** $0 < |z| < 1$: We need to expand $\frac{1}{z-1}$ for $|z| < 1$:

$$\frac{1}{z-1} = \frac{-1}{1-z} = -\sum_{n=0}^{\infty}z^n \quad(|z| < 1)$$

$$f(z) = -\frac{1}{z} - \sum_{n=0}^{\infty}z^n = -\frac{1}{z} - 1 - z - z^2 - \cdots$$

**(b)** $|z| > 1$: We need to expand $\frac{1}{z-1}$ for $|z| > 1$:

$$\frac{1}{z-1} = \frac{1}{z}\cdot\frac{1}{1-1/z} = \frac{1}{z}\sum_{n=0}^{\infty}\frac{1}{z^n} = \sum_{n=0}^{\infty}\frac{1}{z^{n+1}} \quad(|z| > 1)$$

$$f(z) = -\frac{1}{z} + \sum_{n=0}^{\infty}\frac{1}{z^{n+1}}$$

The $n=0$ term of the sum is $\frac{1}{z}$, which cancels with $-\frac{1}{z}$. For $n \geq 1$:

$$f(z) = \sum_{n=1}^{\infty}\frac{1}{z^{n+1}} = \frac{1}{z^2} + \frac{1}{z^3} + \frac{1}{z^4} + \cdots$$

---

**4.** Find the first four nonzero terms of the Taylor series of $\tan z$ about $z = 0$.

**Step 1.** Write $\tan z = \frac{\sin z}{\cos z}$ and perform long division of the known series:

$$\sin z = z - \frac{z^3}{6} + \frac{z^5}{120} - \frac{z^7}{5040} + \cdots$$

$$\cos z = 1 - \frac{z^2}{2} + \frac{z^4}{24} - \frac{z^6}{720} + \cdots$$

**Step 2.** Divide $\sin z$ by $\cos z$. Write $\tan z = a_1 z + a_3 z^3 + a_5 z^5 + a_7 z^7 + \cdots$ (only odd powers by symmetry).

From $\sin z = \cos z \cdot \tan z$, equate coefficients:

- $z^1$: $1 = a_1$, so $a_1 = 1$.
- $z^3$: $-\frac{1}{6} = a_3 - \frac{a_1}{2} = a_3 - \frac{1}{2}$, so $a_3 = \frac{1}{3}$.
- $z^5$: $\frac{1}{120} = a_5 - \frac{a_3}{2} + \frac{a_1}{24} = a_5 - \frac{1}{6} + \frac{1}{24}$, so $a_5 = \frac{1}{120} + \frac{1}{6} - \frac{1}{24} = \frac{1+20-5}{120} = \frac{2}{15}$.
- $z^7$: By a similar calculation, $a_7 = \frac{17}{315}$.

**Step 3.** Therefore:

$$\tan z = z + \frac{z^3}{3} + \frac{2z^5}{15} + \frac{17z^7}{315} + \cdots$$

Valid for $|z| < \pi/2$ (nearest singularity of $\tan z$ is at $z = \pm\pi/2$).

---

**5.** Find the Laurent series of $\frac{z}{(z-1)(z-2)}$ in the annulus $1 < |z| < 2$.

**Step 1.** Partial fractions:

$$\frac{z}{(z-1)(z-2)} = \frac{A}{z-1} + \frac{B}{z-2}$$

Setting $z = 1$: $A = \frac{1}{1-2} = -1$. Setting $z = 2$: $B = \frac{2}{2-1} = 2$.

$$f(z) = \frac{-1}{z-1} + \frac{2}{z-2}$$

**Step 2.** Expand $\frac{-1}{z-1}$ for $|z| > 1$ (valid in the annulus):

$$\frac{-1}{z-1} = -\frac{1}{z}\cdot\frac{1}{1-1/z} = -\frac{1}{z}\sum_{n=0}^{\infty}\frac{1}{z^n} = -\sum_{n=0}^{\infty}\frac{1}{z^{n+1}}$$

**Step 3.** Expand $\frac{2}{z-2}$ for $|z| < 2$ (valid in the annulus):

$$\frac{2}{z-2} = \frac{-2}{2-z} = -\frac{1}{1-z/2}\cdot 1 = -\sum_{n=0}^{\infty}\frac{z^n}{2^n}$$

**Step 4.** Combine:

$$f(z) = -\sum_{n=0}^{\infty}\frac{1}{z^{n+1}} - \sum_{n=0}^{\infty}\frac{z^n}{2^n}$$

$$= \cdots - \frac{1}{z^3} - \frac{1}{z^2} - \frac{1}{z} - 1 - \frac{z}{2} - \frac{z^2}{4} - \cdots$$
