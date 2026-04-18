# 11. Elementary Complex Functions

---

## 11.1 The Complex Exponential

### Definition
$$e^z = e^{x+iy} = e^x(\cos y + i\sin y) = e^x e^{iy}$$

### Properties

| Property | Formula |
|----------|---------|
| Modulus | $|e^z| = e^x = e^{\text{Re}\,z}$ |
| Argument | $\arg(e^z) = y + 2n\pi = \text{Im}\,z + 2n\pi$ |
| Nonzero | $e^z \neq 0$ for all $z$ |
| Derivative | $\frac{d}{dz}e^z = e^z$ |
| Product | $e^{z_1+z_2} = e^{z_1}e^{z_2}$ |
| Periodicity | $e^{z+2\pi i} = e^z$ (period $2\pi i$) |
| Entire | $e^z$ is analytic on all of $\mathbb{C}$ |

**Verification via C-R:** $u = e^x\cos y$, $v = e^x\sin y$.
$u_x = e^x\cos y = v_y$ $\checkmark$, $u_y = -e^x\sin y = -v_x$ $\checkmark$.

### Key Consequences

- $e^z = 1 \iff z = 2n\pi i$ ($n$ integer)
- $e^{z_1} = e^{z_2} \iff z_1 - z_2 = 2n\pi i$
- $e^z$ maps horizontal strips of width $2\pi$ onto $\mathbb{C}\setminus\{0\}$

---

## 11.2 Complex Trigonometric Functions

### Definitions (via Euler's formula)
$$\cos z = \frac{e^{iz}+e^{-iz}}{2}, \qquad \sin z = \frac{e^{iz}-e^{-iz}}{2i}$$

### Real and Imaginary Parts
$$\sin z = \sin x\cosh y + i\cos x\sinh y$$
$$\cos z = \cos x\cosh y - i\sin x\sinh y$$

### Properties

| Property | Formula |
|----------|---------|
| Derivatives | $(\sin z)' = \cos z$, $(\cos z)' = -\sin z$ |
| Pythagorean | $\sin^2 z + \cos^2 z = 1$ |
| Addition | $\sin(z_1\pm z_2) = \sin z_1\cos z_2 \pm \cos z_1\sin z_2$ |
| Periodicity | $\sin(z+2\pi) = \sin z$, $\cos(z+2\pi) = \cos z$ |
| Zeros of $\sin$ | $z = n\pi$ ($n$ integer) — same as real case |
| Zeros of $\cos$ | $z = (n+\tfrac{1}{2})\pi$ — same as real case |
| Entire | Both $\sin z$ and $\cos z$ are entire |

### Moduli
$$|\sin z|^2 = \sin^2 x + \sinh^2 y$$
$$|\cos z|^2 = \cos^2 x + \sinh^2 y$$

**Critical difference from real case:** Complex sine and cosine are **unbounded**. As $|y| \to \infty$, $|\sin z| \to \infty$ and $|\cos z| \to \infty$.

### Other Trigonometric Functions
$$\tan z = \frac{\sin z}{\cos z}, \quad \cot z = \frac{\cos z}{\sin z}, \quad \sec z = \frac{1}{\cos z}, \quad \csc z = \frac{1}{\sin z}$$

---

## 11.3 Complex Hyperbolic Functions

### Definitions
$$\cosh z = \frac{e^z + e^{-z}}{2}, \qquad \sinh z = \frac{e^z - e^{-z}}{2}$$

### Properties

| Property | Formula |
|----------|---------|
| Derivatives | $(\sinh z)' = \cosh z$, $(\cosh z)' = \sinh z$ |
| Identity | $\cosh^2 z - \sinh^2 z = 1$ |
| Periodicity | Period $2\pi i$ |
| Entire | Both are entire |

### Connection to Trigonometric Functions
$$\sin(iz) = i\sinh z, \qquad \cos(iz) = \cosh z$$
$$\sinh(iz) = i\sin z, \qquad \cosh(iz) = \cos z$$

### Real and Imaginary Parts
$$\cosh z = \cosh x\cos y + i\sinh x\sin y$$
$$\sinh z = \sinh x\cos y + i\cosh x\sin y$$

**Verification that $\cosh z$ is entire:** $u = \cosh x\cos y$, $v = \sinh x\sin y$.
$u_x = \sinh x\cos y = v_y$ $\checkmark$, $u_y = -\cosh x\sin y = -v_x$ $\checkmark$.

---

## 11.4 Mappings

A complex function $w = f(z)$ defines a **mapping** (transformation) from the $z$-plane to the $w$-plane.

### Basic Mappings

| Function | Geometric Effect |
|----------|-----------------|
| $w = z + c$ | Translation by $c$ |
| $w = e^{i\alpha}z$ | Rotation by angle $\alpha$ |
| $w = az$ ($a > 0$) | Scaling by factor $a$ |
| $w = \bar{z}$ | Reflection in real axis |
| $w = z^2$ | Squares modulus, doubles argument |
| $w = e^z$ | Maps horizontal strips to sectors |

### The Mapping $w = z^2$

In polar form: $w = r^2 e^{2i\theta}$.
- Circles $|z| = r$ map to circles $|w| = r^2$
- Rays $\arg z = \theta$ map to rays $\arg w = 2\theta$
- The mapping is 2-to-1 (except at origin): both $z$ and $-z$ map to the same $w$

---

## Worked Examples

**Example 1:** Find all values of $z$ such that $e^z = -2$.

*Solution:*
$e^z = -2 = 2e^{i(\pi+2n\pi)}$. So $e^x = 2$ and $y = \pi+2n\pi$.

$x = \ln 2$, $y = (2n+1)\pi$.

$z = \ln 2 + i(2n+1)\pi$, $n \in \mathbb{Z}$.

**Example 2:** Show $\sin z = 0 \iff z = n\pi$.

*Solution:*
$\sin z = \sin x\cosh y + i\cos x\sinh y = 0$.

Real part: $\sin x\cosh y = 0$. Since $\cosh y \geq 1 > 0$, we need $\sin x = 0$, i.e., $x = n\pi$.

Imaginary part: $\cos x\sinh y = 0$. At $x = n\pi$: $\cos(n\pi) = (-1)^n \neq 0$, so $\sinh y = 0$, i.e., $y = 0$.

Therefore $z = n\pi + i\cdot 0 = n\pi$. $\checkmark$

**Example 3:** Compute $\sin(i)$.

*Solution:*
$$\sin(i) = \frac{e^{i\cdot i}-e^{-i\cdot i}}{2i} = \frac{e^{-1}-e^{1}}{2i} = \frac{-(e-e^{-1})}{2i} = \frac{-2\sinh 1}{2i} = \frac{-\sinh 1}{i} = i\sinh 1$$

Alternatively: $\sin(iz) = i\sinh z$, so $\sin(i) = i\sinh 1 \approx 1.1752i$.

**Example 4:** Show $|\sin z| \geq |\sin x|$ for all $z = x+iy$.

*Solution:*
$|\sin z|^2 = \sin^2 x + \sinh^2 y \geq \sin^2 x = |\sin x|^2$.

Taking square roots: $|\sin z| \geq |\sin x|$. $\checkmark$

---

## Practice Problems

1. Find all solutions of $e^z = 1+i$.

2. Compute $\cos(1+i)$ in the form $a+bi$.

3. Show that $|\cosh z|^2 = \cosh^2 x - \sin^2 y = \sinh^2 x + \cos^2 y$.

4. Find all zeros of $\cosh z$.

5. Verify that $\frac{d}{dz}\sin z = \cos z$ using the exponential definition.

### Solutions

**1.** Find all solutions of $e^z = 1+i$.

**Step 1.** Express $1+i$ in polar form: $|1+i| = \sqrt{2}$, $\text{Arg}(1+i) = \frac{\pi}{4}$.

**Step 2.** From $e^z = e^{x+iy}$, equate moduli and arguments:

$$e^x = \sqrt{2} \implies x = \frac{1}{2}\ln 2$$

$$y = \frac{\pi}{4} + 2n\pi, \quad n \in \mathbb{Z}$$

**Step 3.** All solutions: $z = \frac{1}{2}\ln 2 + i\!\left(\frac{\pi}{4}+2n\pi\right)$, $n \in \mathbb{Z}$.

---

**2.** Compute $\cos(1+i)$ in the form $a + bi$.

Using the decomposition $\cos z = \cos x\cosh y - i\sin x\sinh y$ with $x = 1$, $y = 1$:

$$\cos(1+i) = \cos 1 \cdot \cosh 1 - i\sin 1 \cdot \sinh 1$$

$$\approx 0.5403 \times 1.5431 - i \times 0.8415 \times 1.1752 \approx 0.8337 - 0.9889i$$

---

**3.** Show that $|\cosh z|^2 = \cosh^2 x - \sin^2 y = \sinh^2 x + \cos^2 y$.

**Step 1.** From $\cosh z = \cosh x\cos y + i\sinh x\sin y$:

$$|\cosh z|^2 = \cosh^2 x\cos^2 y + \sinh^2 x\sin^2 y$$

**Step 2.** First identity — use $\sinh^2 x = \cosh^2 x - 1$:

$$= \cosh^2 x\cos^2 y + (\cosh^2 x - 1)\sin^2 y = \cosh^2 x(\cos^2 y + \sin^2 y) - \sin^2 y = \cosh^2 x - \sin^2 y \quad\checkmark$$

**Step 3.** Second identity — use $\cos^2 y = 1 - \sin^2 y$:

$$= \cosh^2 x(1-\sin^2 y) + \sinh^2 x\sin^2 y = \cosh^2 x - \sin^2 y(\cosh^2 x - \sinh^2 x)$$

$$= \cosh^2 x - \sin^2 y = \sinh^2 x + 1 - \sin^2 y = \sinh^2 x + \cos^2 y \quad\checkmark$$

---

**4.** Find all zeros of $\cosh z$.

**Step 1.** Use the identity $\cosh z = \cos(iz)$. Therefore $\cosh z = 0$ iff $\cos(iz) = 0$.

**Step 2.** The zeros of $\cos w$ are $w = \left(n+\frac{1}{2}\right)\pi$, $n \in \mathbb{Z}$.

**Step 3.** Setting $w = iz$: $iz = \left(n+\frac{1}{2}\right)\pi$, so $z = \frac{(n+\frac{1}{2})\pi}{i} = -i\!\left(n+\frac{1}{2}\right)\pi$.

**Step 4.** The zeros are $z = \left(n+\frac{1}{2}\right)\pi i \cdot (-1) = \pm\frac{\pi i}{2},\;\pm\frac{3\pi i}{2},\;\pm\frac{5\pi i}{2},\;\ldots$

Equivalently: $z = \frac{(2m+1)\pi i}{2}$, $m \in \mathbb{Z}$.

---

**5.** Verify that $\frac{d}{dz}\sin z = \cos z$ using the exponential definition.

**Step 1.** From the definition $\sin z = \frac{e^{iz}-e^{-iz}}{2i}$, differentiate term-by-term:

$$\frac{d}{dz}\sin z = \frac{1}{2i}\!\left(ie^{iz} - (-i)e^{-iz}\right) = \frac{ie^{iz}+ie^{-iz}}{2i}$$

**Step 2.** Simplify:

$$= \frac{i(e^{iz}+e^{-iz})}{2i} = \frac{e^{iz}+e^{-iz}}{2} = \cos z \qquad\checkmark$$
