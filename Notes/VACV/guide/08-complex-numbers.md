# 8. Complex Numbers & Geometry

---

## 8.1 Definition and Algebraic Structure

A **complex number** is an ordered pair $z = (x, y)$ of real numbers, written as:

$$z = x + iy$$

where $i = (0,1)$ satisfies $i^2 = -1$.

- $x = \text{Re}\,z$ is the **real part**
- $y = \text{Im}\,z$ is the **imaginary part**
- Both $\text{Re}\,z$ and $\text{Im}\,z$ are **real numbers**

Two complex numbers are equal iff their real and imaginary parts are equal:
$$z_1 = z_2 \iff x_1 = x_2 \text{ and } y_1 = y_2$$

---

## 8.2 Arithmetic Operations

### Addition and Subtraction
$$(x_1+iy_1) + (x_2+iy_2) = (x_1+x_2) + i(y_1+y_2)$$
$$(x_1+iy_1) - (x_2+iy_2) = (x_1-x_2) + i(y_1-y_2)$$

### Multiplication
$$(x_1+iy_1)(x_2+iy_2) = (x_1x_2 - y_1y_2) + i(y_1x_2 + x_1y_2)$$

Rule: expand normally and replace $i^2 = -1$.

### Division
$$\frac{z_1}{z_2} = \frac{(x_1+iy_1)(x_2-iy_2)}{(x_2+iy_2)(x_2-iy_2)} = \frac{x_1x_2+y_1y_2}{x_2^2+y_2^2} + i\frac{y_1x_2 - x_1y_2}{x_2^2+y_2^2}$$

**Technique:** Multiply numerator and denominator by the conjugate of the denominator.

### Multiplicative Inverse
$$z^{-1} = \frac{\bar{z}}{|z|^2} = \frac{x-iy}{x^2+y^2} \quad (z \neq 0)$$

### Algebraic Laws
- **Commutative:** $z_1 + z_2 = z_2 + z_1$, $z_1z_2 = z_2z_1$
- **Associative:** $(z_1+z_2)+z_3 = z_1+(z_2+z_3)$, $(z_1z_2)z_3 = z_1(z_2z_3)$
- **Distributive:** $z(z_1+z_2) = zz_1 + zz_2$
- **Identities:** $z+0=z$, $z\cdot 1=z$
- **Binomial formula:** $(z_1+z_2)^n = \sum_{k=0}^{n}\binom{n}{k}z_1^k z_2^{n-k}$

---

## 8.3 Complex Conjugate

The **complex conjugate** of $z = x+iy$ is:
$$\bar{z} = x - iy$$

### Key Properties
| Property                  | Formula                                      |     |     |
| ------------------------- | -------------------------------------------- | --- | --- |
| Double conjugation        | $\overline{\bar{z}} = z$                     |     |     |
| Addition                  | $\overline{z_1+z_2} = \bar{z}_1 + \bar{z}_2$ |     |     |
| Multiplication            | $\overline{z_1 z_2} = \bar{z}_1 \bar{z}_2$   |     |     |
| Division                  | $\overline{z_1/z_2} = \bar{z}_1/\bar{z}_2$   |     |     |
| Real part extraction      | $\text{Re}\,z = \frac{z+\bar{z}}{2}$         |     |     |
| Imaginary part extraction | $\text{Im}\,z = \frac{z-\bar{z}}{2i}$        |     |     |
| Modulus connection        | $z\bar{z} = z^2$                             |     |     |
| Real iff                  | $z = \bar{z} \iff z \in \mathbb{R}$          |     |     |
| Pure imaginary iff        | $z = -\bar{z} \iff \text{Re}\,z = 0$         |     |     |

**Useful identity for computations:**
$$\text{Re}(iz) = -\text{Im}\,z, \qquad \text{Im}(iz) = \text{Re}\,z$$

---

## 8.4 Modulus (Absolute Value)

The **modulus** of $z = x+iy$ is:
$$|z| = \sqrt{x^2 + y^2} = \sqrt{z\bar{z}}$$

### Properties
| Property | Formula |
|----------|---------|
| Non-negative | $|z| \geq 0$, equality iff $z = 0$ |
| Conjugate | $|\bar{z}| = |z|$ |
| Product | $|z_1z_2| = |z_1||z_2|$ |
| Quotient | $|z_1/z_2| = |z_1|/|z_2|$ |
| Real/Imag bounds | $|\text{Re}\,z| \leq |z|$, $|\text{Im}\,z| \leq |z|$ |
| Power | $|z^n| = |z|^n$ |

### Triangle Inequality
$$|z_1 + z_2| \leq |z_1| + |z_2|$$

**Reverse triangle inequality:**
$$\big||z_1| - |z_2|\big| \leq |z_1 - z_2|$$

**Geometric meaning:** $|z_1 - z_2|$ = distance between $z_1$ and $z_2$ in the complex plane.

---

## 8.5 Polar (Exponential) Form

Any nonzero $z = x+iy$ can be written in **polar form**:
$$z = r(\cos\theta + i\sin\theta) = re^{i\theta}$$

where:
- $r = |z| = \sqrt{x^2+y^2}$ is the **modulus**
- $\theta = \arg z$ is the **argument** (angle from positive real axis)
- $\tan\theta = y/x$ (with quadrant adjustment)

### Euler's Formula
$$e^{i\theta} = \cos\theta + i\sin\theta$$

**Special cases:**
- $e^{i\pi} = -1$ (Euler's identity)
- $e^{i\pi/2} = i$
- $e^{i0} = 1$
- $e^{2\pi i} = 1$

### Argument

The argument is **multi-valued**: if $\theta_0$ is one value, then $\arg z = \theta_0 + 2n\pi$ for any integer $n$.

The **principal argument** $\text{Arg}\,z$ is the unique value in $(-\pi, \pi]$:
$$\text{Arg}\,z \in (-\pi, \pi]$$

So $\arg z = \text{Arg}\,z + 2n\pi$, $n \in \mathbb{Z}$.

### Converting Between Forms

**Cartesian to polar:** $r = \sqrt{x^2+y^2}$, $\theta = \arctan(y/x)$ (adjust for quadrant).

**Polar to Cartesian:** $x = r\cos\theta$, $y = r\sin\theta$.

---

## 8.6 Multiplication and Division in Polar Form

### Multiplication
$$z_1z_2 = r_1r_2\,e^{i(\theta_1+\theta_2)}$$

**Moduli multiply, arguments add.**

### Division
$$\frac{z_1}{z_2} = \frac{r_1}{r_2}\,e^{i(\theta_1-\theta_2)}$$

### Power (de Moivre's Theorem)
$$z^n = r^n e^{in\theta} = r^n(\cos n\theta + i\sin n\theta)$$

for any integer $n$.

---

## 8.7 Roots of Complex Numbers

The $n$th roots of $z = re^{i\theta}$ are:

$$z^{1/n} = r^{1/n}\exp\left(i\frac{\theta + 2k\pi}{n}\right), \quad k = 0, 1, \ldots, n-1$$

This gives exactly $n$ distinct roots, equally spaced on a circle of radius $r^{1/n}$.

**Example:** The cube roots of unity ($z^3 = 1$):
$$z_k = e^{2\pi i k/3}, \quad k=0,1,2$$
$$z_0 = 1, \quad z_1 = -\frac{1}{2}+i\frac{\sqrt{3}}{2}, \quad z_2 = -\frac{1}{2}-i\frac{\sqrt{3}}{2}$$

---

## 8.8 Regions in the Complex Plane

| Region | Description |
|--------|-------------|
| $|z - z_0| < r$ | Open disk centered at $z_0$, radius $r$ |
| $|z - z_0| = r$ | Circle |
| $|z - z_0| \leq r$ | Closed disk |
| $0 < |z - z_0| < r$ | Punctured (deleted) disk |
| $r_1 < |z - z_0| < r_2$ | Annulus |
| $\text{Re}\,z > 0$ | Right half-plane |
| $\text{Im}\,z > 0$ | Upper half-plane |

**Definitions:**
- **Open set:** every point has a neighborhood entirely contained in the set
- **Connected set:** any two points can be joined by a path within the set
- **Domain:** an open, connected set
- **Bounded set:** contained inside some circle $|z| < R$
- **Simply connected:** every closed curve can be shrunk to a point (no "holes")

---

## Worked Examples

**Example 1:** Compute $\frac{4+i}{2-3i}$.

*Solution:*
$$\frac{4+i}{2-3i} = \frac{(4+i)(2+3i)}{(2-3i)(2+3i)} = \frac{8+12i+2i+3i^2}{4+9} = \frac{8+14i-3}{13} = \frac{5+14i}{13} = \frac{5}{13}+\frac{14}{13}i$$

**Example 2:** Find all values of $(-8i)^{1/3}$.

*Solution:*

**Step 1.** Write $-8i$ in exponential form. Since $-8i$ lies on the negative imaginary axis:

$$|-8i| = 8, \qquad \text{Arg}(-8i) = -\frac{\pi}{2}$$

$$-8i = 8\,e^{-i\pi/2}$$

**Step 2.** Apply the $n$th root formula with $n = 3$:

$$(-8i)^{1/3} = 8^{1/3}\exp\!\left(i\frac{-\pi/2 + 2k\pi}{3}\right) = 2\exp\!\left(i\frac{-\pi/2+2k\pi}{3}\right), \quad k = 0, 1, 2$$

**Step 3.** Evaluate each root:

- $k=0$: $\theta = -\pi/6$. $\quad z_0 = 2(\cos(-\pi/6)+i\sin(-\pi/6)) = 2\!\left(\frac{\sqrt{3}}{2} - \frac{i}{2}\right) = \sqrt{3} - i$

- $k=1$: $\theta = (-\pi/2+2\pi)/3 = \pi/2$. $\quad z_1 = 2(\cos(\pi/2)+i\sin(\pi/2)) = 2i$

- $k=2$: $\theta = (-\pi/2+4\pi)/3 = 7\pi/6$. $\quad z_2 = 2(\cos(7\pi/6)+i\sin(7\pi/6)) = 2\!\left(-\frac{\sqrt{3}}{2} - \frac{i}{2}\right) = -\sqrt{3} - i$

The three cube roots are: $\sqrt{3}-i$, $\;2i$, $\;-\sqrt{3}-i$.

**Example 3:** Prove the triangle inequality $|z_1+z_2| \leq |z_1|+|z_2|$.

*Proof:*
$$|z_1+z_2|^2 = (z_1+z_2)\overline{(z_1+z_2)} = (z_1+z_2)(\bar{z}_1+\bar{z}_2)$$
$$= |z_1|^2 + z_1\bar{z}_2 + \bar{z}_1z_2 + |z_2|^2 = |z_1|^2 + 2\text{Re}(z_1\bar{z}_2) + |z_2|^2$$

Since $\text{Re}(z_1\bar{z}_2) \leq |z_1\bar{z}_2| = |z_1||z_2|$:
$$|z_1+z_2|^2 \leq |z_1|^2 + 2|z_1||z_2| + |z_2|^2 = (|z_1|+|z_2|)^2$$

Taking square roots gives the result. $\blacksquare$

**Example 4:** Write $f(z) = z + 1/z$ in the form $u(r,\theta)+iv(r,\theta)$.

*Solution:* With $z = re^{i\theta}$:
$$f(z) = re^{i\theta} + \frac{1}{r}e^{-i\theta} = \left(r+\frac{1}{r}\right)\cos\theta + i\left(r-\frac{1}{r}\right)\sin\theta$$

So $u(r,\theta) = (r+1/r)\cos\theta$, $v(r,\theta) = (r-1/r)\sin\theta$.

---

## Practice Problems

1. Express in the form $a+bi$: (a) $(3+4i)(2-i)$; (b) $\frac{1+2i}{3-4i}$; (c) $i^{2023}$.

2. Find $|z|$ and $\text{Arg}\,z$ for: (a) $z = -1+i$; (b) $z = -2i$; (c) $z = 3$.

3. Find all fourth roots of $-16$.

4. Verify that $z = 1 \pm i$ satisfy $z^2 - 2z + 2 = 0$.

5. Prove that $|z_1z_2| = |z_1||z_2|$ using the polar form.

6. Describe the set of points satisfying $|z-1+i| < 2$ and sketch it.

### Solutions

**1.** Express in the form $a + bi$.

**(a)** $(3+4i)(2-i) = 6 - 3i + 8i - 4i^2 = 6 + 5i - 4(-1) = 6 + 5i + 4 = 10 + 5i$.

**(b)** Multiply numerator and denominator by the conjugate of $3 - 4i$:

$$\frac{1+2i}{3-4i} = \frac{(1+2i)(3+4i)}{(3-4i)(3+4i)} = \frac{3+4i+6i+8i^2}{9+16} = \frac{3+10i-8}{25} = \frac{-5+10i}{25} = -\frac{1}{5}+\frac{2}{5}i$$

**(c)** Since $i^4 = 1$, reduce the exponent modulo 4: $2023 = 4 \times 505 + 3$.

$$i^{2023} = i^3 = i^2 \cdot i = -i$$

---

**2.** Find $|z|$ and $\text{Arg}\,z$.

**(a)** $z = -1+i$. $|z| = \sqrt{(-1)^2+1^2} = \sqrt{2}$. Since $\text{Re}\,z < 0$, $\text{Im}\,z > 0$ (second quadrant): $\text{Arg}\,z = \pi - \arctan\frac{1}{1} = \pi - \frac{\pi}{4} = \frac{3\pi}{4}$.

**(b)** $z = -2i$. $|z| = 2$. Since $z$ lies on the negative imaginary axis: $\text{Arg}\,z = -\frac{\pi}{2}$.

**(c)** $z = 3$. $|z| = 3$. Since $z$ is a positive real number: $\text{Arg}\,z = 0$.

---

**3.** Find all fourth roots of $-16$.

**Step 1.** Write $-16 = 16e^{i\pi}$.

**Step 2.** Apply the $n$th root formula with $n = 4$:

$$z_k = 16^{1/4}\exp\!\left(i\frac{\pi+2k\pi}{4}\right) = 2\exp\!\left(i\frac{(2k+1)\pi}{4}\right), \quad k = 0,1,2,3$$

**Step 3.** Evaluate:

| $k$ | Argument | Root |
|-----|----------|------|
| $0$ | $\pi/4$ | $2e^{i\pi/4} = \sqrt{2}+i\sqrt{2}$ |
| $1$ | $3\pi/4$ | $2e^{i3\pi/4} = -\sqrt{2}+i\sqrt{2}$ |
| $2$ | $5\pi/4$ | $2e^{i5\pi/4} = -\sqrt{2}-i\sqrt{2}$ |
| $3$ | $7\pi/4$ | $2e^{i7\pi/4} = \sqrt{2}-i\sqrt{2}$ |

---

**4.** Verify that $z = 1 \pm i$ satisfy $z^2 - 2z + 2 = 0$.

**For $z = 1+i$:**

$$(1+i)^2 - 2(1+i) + 2 = (1+2i+i^2) - 2 - 2i + 2 = (1+2i-1) - 2-2i+2 = 2i - 2i = 0 \quad\checkmark$$

**For $z = 1-i$:**

$$(1-i)^2 - 2(1-i) + 2 = (1-2i+i^2) - 2+2i + 2 = (1-2i-1) - 2+2i+2 = -2i+2i = 0 \quad\checkmark$$

---

**5.** Prove $|z_1z_2| = |z_1||z_2|$ using polar form.

**Proof.** Write $z_1 = r_1 e^{i\theta_1}$ and $z_2 = r_2 e^{i\theta_2}$ where $r_1 = |z_1|$ and $r_2 = |z_2|$.

Then $z_1 z_2 = r_1 r_2\, e^{i(\theta_1+\theta_2)}$.

Taking the modulus: $|z_1 z_2| = r_1 r_2 = |z_1||z_2|$. $\blacksquare$

---

**6.** The inequality $|z - 1 + i| < 2$ can be rewritten as $|z - (1-i)| < 2$.

This describes an **open disk** centered at $z_0 = 1-i$ (the point $(1,-1)$ in the complex plane) with radius $2$. All points strictly inside the circle $|z-(1-i)| = 2$ are included; the boundary circle is excluded.
