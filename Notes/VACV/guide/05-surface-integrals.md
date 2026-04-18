# 5. Surface Integrals

---

## 5.1 Surfaces and Parametrizations

### Implicit Form
A surface $S$ in $\mathbb{R}^3$ can be given implicitly: $F(x,y,z) = c$.

The **normal vector** is $\vec{n} = \nabla F$.

### Explicit Form (Graph)
$z = g(x,y)$, equivalently $F(x,y,z) = z - g(x,y) = 0$.

Normal: $\vec{n} = (-g_x, -g_y, 1)$ (upward-pointing).

### Parametric Form
$\vec{r}(u,v) = x(u,v)\hat{i} + y(u,v)\hat{j} + z(u,v)\hat{k}$, $(u,v) \in D$.

The **tangent vectors** are $\vec{r}_u$ and $\vec{r}_v$.

The **normal vector** is $\vec{n} = \vec{r}_u \times \vec{r}_v$.

The **surface area element** is:
$$dS = \|\vec{r}_u \times \vec{r}_v\|\;du\;dv$$

---

## 5.2 Types of Surfaces

- **Open surface:** has a boundary curve (e.g., hemisphere, paraboloid cap)
- **Closed surface:** has no boundary; encloses a volume (e.g., sphere, cube, torus)
- **Oriented surface:** has a consistently chosen normal direction (outward for closed surfaces)
- **Simply connected surface:** any closed curve on it can be shrunk to a point
- **Smooth surface:** $\vec{r}_u \times \vec{r}_v \neq \vec{0}$ everywhere

---

## 5.3 Surface Area

### For $z = g(x,y)$ over region $D$:
$$\text{Area}(S) = \iint_D \sqrt{1 + g_x^2 + g_y^2}\;dA$$

### For parametric surface $\vec{r}(u,v)$:
$$\text{Area}(S) = \iint_D \|\vec{r}_u \times \vec{r}_v\|\;du\;dv$$

---

## 5.4 Surface Integral of a Scalar Field

For a scalar function $f$ over surface $S$:

$$\iint_S f\;dS = \iint_D f(\vec{r}(u,v))\|\vec{r}_u \times \vec{r}_v\|\;du\;dv$$

**For $z = g(x,y)$:**
$$\iint_S f\;dS = \iint_D f(x, y, g(x,y))\sqrt{1 + g_x^2 + g_y^2}\;dA$$

**Physical interpretation:** If $f$ is surface density, $\iint_S f\;dS$ gives total mass.

---

## 5.5 Surface Integral of a Vector Field (Flux Integral)

For a vector field $\vec{F}$ through an oriented surface $S$ with unit normal $\hat{n}$:

$$\iint_S \vec{F}\cdot d\vec{S} = \iint_S \vec{F}\cdot\hat{n}\;dS = \iint_S (\vec{F}\cdot\hat{n})\;dS$$

This is the **flux** of $\vec{F}$ through $S$.

### Computation

**Parametric form:**
$$\iint_S \vec{F}\cdot d\vec{S} = \iint_D \vec{F}(\vec{r}(u,v))\cdot(\vec{r}_u \times \vec{r}_v)\;du\;dv$$

**For $z = g(x,y)$ (upward normal):**
$$\iint_S \vec{F}\cdot d\vec{S} = \iint_D \vec{F}(x,y,g(x,y))\cdot(-g_x, -g_y, 1)\;dA$$

$$= \iint_D \left(-Pg_x - Qg_y + R\right)dA$$

**For closed surfaces:** Choose **outward** normal (convention).

### Physical Interpretation
- **Flux** measures the net flow of $\vec{F}$ through $S$
- Positive flux: net flow in the direction of $\hat{n}$
- Zero flux: equal amounts flowing in and out

---

## 5.6 Common Surface Parametrizations

### Sphere of radius $a$:
$\vec{r}(\theta, \phi) = a\sin\phi\cos\theta\;\hat{i} + a\sin\phi\sin\theta\;\hat{j} + a\cos\phi\;\hat{k}$

$0 \leq \theta \leq 2\pi$, $0 \leq \phi \leq \pi$

$\|\vec{r}_\theta \times \vec{r}_\phi\| = a^2\sin\phi$, so $dS = a^2\sin\phi\;d\theta\;d\phi$.

Outward normal: $\hat{n} = \frac{\vec{r}}{a} = (\sin\phi\cos\theta, \sin\phi\sin\theta, \cos\phi)$.

### Cylinder of radius $a$, height $h$:
$\vec{r}(\theta, z) = a\cos\theta\;\hat{i} + a\sin\theta\;\hat{j} + z\hat{k}$

$0 \leq \theta \leq 2\pi$, $0 \leq z \leq h$

$\|\vec{r}_\theta \times \vec{r}_z\| = a$, so $dS = a\;d\theta\;dz$.

Outward normal: $\hat{n} = (\cos\theta, \sin\theta, 0)$.

### Cone $z = \sqrt{x^2+y^2}$, $0 \leq z \leq h$:
$\vec{r}(r,\theta) = r\cos\theta\;\hat{i} + r\sin\theta\;\hat{j} + r\hat{k}$, $0 \leq r \leq h$

---

## Worked Examples

**Example 1:** Find the surface area of the hemisphere $z = \sqrt{a^2 - x^2 - y^2}$.

*Solution:*
$g_x = \frac{-x}{\sqrt{a^2-x^2-y^2}}$, $g_y = \frac{-y}{\sqrt{a^2-x^2-y^2}}$.

$1 + g_x^2 + g_y^2 = 1 + \frac{x^2+y^2}{a^2-x^2-y^2} = \frac{a^2}{a^2-x^2-y^2}$

$$A = \iint_D \frac{a}{\sqrt{a^2-x^2-y^2}}\;dA$$

Switch to polar: $x = r\cos\theta$, $y = r\sin\theta$, $0 \leq r \leq a$, $0 \leq \theta \leq 2\pi$.

$$A = \int_0^{2\pi}\int_0^a \frac{a}{\sqrt{a^2-r^2}}\;r\;dr\;d\theta = 2\pi a\left[-\sqrt{a^2-r^2}\right]_0^a = 2\pi a^2$$

**Example 2:** Compute the flux of $\vec{F} = z\hat{k}$ through the upper hemisphere $x^2+y^2+z^2 = a^2$, $z \geq 0$, with outward normal.

*Solution:*
Using $z = \sqrt{a^2-x^2-y^2}$ over $D: x^2+y^2 \leq a^2$:

$\vec{F}\cdot(-g_x, -g_y, 1) = 0\cdot(-g_x) + 0\cdot(-g_y) + z\cdot 1 = z = \sqrt{a^2-r^2}$

$$\text{Flux} = \int_0^{2\pi}\int_0^a \sqrt{a^2-r^2}\;r\;dr\;d\theta = 2\pi\left[-\frac{1}{3}(a^2-r^2)^{3/2}\right]_0^a = \frac{2\pi a^3}{3}$$

**Example 3:** Compute $\iint_S \vec{F}\cdot d\vec{S}$ where $\vec{F} = x\hat{i} + y\hat{j} + z\hat{k}$ and $S$ is the sphere $x^2+y^2+z^2 = a^2$ (outward normal).

*Solution:*
On the sphere: $\hat{n} = \frac{1}{a}(x,y,z)$.
$\vec{F}\cdot\hat{n} = \frac{1}{a}(x^2+y^2+z^2) = \frac{a^2}{a} = a$.

$$\iint_S \vec{F}\cdot d\vec{S} = \iint_S a\;dS = a\cdot 4\pi a^2 = 4\pi a^3$$

Alternatively, by the Divergence Theorem: $\nabla\cdot\vec{F} = 3$, so flux $= 3\cdot\frac{4}{3}\pi a^3 = 4\pi a^3$. $\checkmark$

---

## Practice Problems

1. Find the surface area of the paraboloid $z = x^2 + y^2$ below $z = 4$.

2. Evaluate $\iint_S (x^2+y^2)\;dS$ where $S$ is the sphere $x^2+y^2+z^2 = 1$.

3. Compute the flux of $\vec{F} = x\hat{i} + y\hat{j}$ through the cylinder $x^2+y^2 = 1$, $0 \leq z \leq 1$ (outward normal; don't include top/bottom).

4. Compute $\iint_S \vec{F}\cdot d\vec{S}$ where $\vec{F} = (x,y,z)$ and $S$ is the cube $[0,1]^3$ with outward normal.

### Solutions

1. $g_x = 2x$, $g_y = 2y$. $A = \iint_{x^2+y^2\leq 4}\sqrt{1+4x^2+4y^2}\;dA$.
   Polar: $\int_0^{2\pi}\int_0^2 \sqrt{1+4r^2}\;r\;dr\;d\theta = 2\pi\cdot\frac{1}{12}[(1+4r^2)^{3/2}]_0^2 = \frac{\pi}{6}(17^{3/2}-1)$.

2. Using spherical coords: $x^2+y^2 = \sin^2\phi$ on the unit sphere. $dS = \sin\phi\;d\theta\;d\phi$.
   $\iint_S \sin^2\phi\;\sin\phi\;d\theta\;d\phi = 2\pi\int_0^\pi \sin^3\phi\;d\phi = 2\pi\cdot\frac{4}{3} = \frac{8\pi}{3}$.

3. On cylinder: $\hat{n} = (\cos\theta, \sin\theta, 0)$, $\vec{F}\cdot\hat{n} = \cos^2\theta + \sin^2\theta = 1$.
   Flux $= \int_0^{2\pi}\int_0^1 1\cdot(1)\;dz\;d\theta = 2\pi$.

4. By Divergence Theorem: $\nabla\cdot\vec{F} = 3$, Flux $= 3\cdot\text{Vol}([0,1]^3) = 3$.
