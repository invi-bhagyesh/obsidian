# 6. Green's Theorem, Stokes' Theorem & Divergence Theorem

---

These three theorems are the crown jewels of vector calculus. They connect integrals over regions to integrals over their boundaries: a deep generalization of the Fundamental Theorem of Calculus.

| Theorem    | Relates                                      | Domain     | Boundary  |
| ---------- | -------------------------------------------- | ---------- | --------- |
| Green's    | 2D region $\leftrightarrow$ boundary curve   | $\iint_D$  | $\oint_C$ |
| Stokes'    | Surface $\leftrightarrow$ boundary curve     | $\iint_S$  | $\oint_C$ |
| Divergence | 3D region $\leftrightarrow$ boundary surface | $\iiint_V$ | $\oint_S$ |

---

## 6.1 Green's Theorem

### Statement

Let $D$ be a simply connected region in $\mathbb{R}^2$ bounded by a positively oriented (counterclockwise), piecewise smooth, simple closed curve $C$. If $P$ and $Q$ have continuous first partial derivatives on an open region containing $D$, then:

$$\boxed{\oint_C P\;dx + Q\;dy = \iint_D \left(\frac{\partial Q}{\partial x} - \frac{\partial P}{\partial y}\right)dA}$$

### Orientation Convention
- **Positive orientation:** Counterclockwise (the region $D$ is on your left as you traverse $C$)
- If you traverse clockwise, the sign flips

### Special Cases

**Area formula:** Setting $P = -y, Q = x$ (or $P = 0, Q = x$ or $P = -y, Q = 0$):
$$\text{Area}(D) = \frac{1}{2}\oint_C (x\;dy - y\;dx)$$

**Circulation form:** $\oint_C \vec{F}\cdot d\vec{r} = \iint_D (\nabla\times\vec{F})\cdot\hat{k}\;dA$

**Flux form (2D Divergence Theorem):** If $\hat{n}$ is the outward unit normal to $C$:
$$\oint_C \vec{F}\cdot\hat{n}\;ds = \iint_D \nabla\cdot\vec{F}\;dA$$

### When Green's Theorem Doesn't Apply
- $C$ is not closed
- $D$ is not simply connected (has holes)
- $P$ or $Q$ not differentiable inside $D$

For regions with holes: apply Green's theorem to each simply connected piece.

---

## 6.2 Stokes' Theorem

### Statement

Let $S$ be an oriented, piecewise smooth surface bounded by a positively oriented, piecewise smooth, simple closed curve $C = \partial S$. If $\vec{F}$ has continuous first partial derivatives on an open region containing $S$, then:

$$\boxed{\oint_C \vec{F}\cdot d\vec{r} = \iint_S (\nabla\times\vec{F})\cdot d\vec{S}}$$

That is:
$$\oint_C \vec{F}\cdot d\vec{r} = \iint_S (\nabla\times\vec{F})\cdot\hat{n}\;dS$$

### Orientation Convention (Right-Hand Rule)
- Curl the fingers of your right hand in the direction of traversal around $C$
- Your thumb points in the direction of $\hat{n}$ (the chosen normal to $S$)
- Equivalently: if $\hat{n}$ points "up," $C$ is traversed counterclockwise when viewed from above

### Relation to Green's Theorem
Green's theorem is a special case of Stokes' theorem where $S$ is a flat region in the $xy$-plane with $\hat{n} = \hat{k}$:
$$(\nabla\times\vec{F})\cdot\hat{k} = \frac{\partial Q}{\partial x} - \frac{\partial P}{\partial y}$$

### Key Consequence
If $\vec{F} = \nabla f$ (conservative), then $\nabla\times\vec{F} = \vec{0}$, so:
$$\oint_C \nabla f\cdot d\vec{r} = \iint_S \vec{0}\cdot d\vec{S} = 0$$

This proves that conservative fields have zero circulation around closed curves.

### Surface Independence
Stokes' theorem implies: the surface integral $\iint_S (\nabla\times\vec{F})\cdot d\vec{S}$ is the same for **any** surface $S$ that has $C$ as its boundary (as long as orientation is consistent).

---

## 6.3 Divergence Theorem (Gauss's Theorem)

### Statement

Let $V$ be a solid region in $\mathbb{R}^3$ bounded by a closed, piecewise smooth surface $S = \partial V$ with outward unit normal $\hat{n}$. If $\vec{F}$ has continuous first partial derivatives on an open region containing $V$, then:

$$\boxed{\oint_S \vec{F}\cdot d\vec{S} = \iiint_V \nabla\cdot\vec{F}\;dV}$$

That is: **total outward flux through $S$ = total divergence inside $V$**.

### Physical Interpretation
- The net outward flow of $\vec{F}$ through the closed surface $S$ equals the total "source strength" inside $V$.
- If $\nabla\cdot\vec{F} > 0$, there's a net outflow (sources inside).
- If $\nabla\cdot\vec{F} = 0$ everywhere, the total flux through any closed surface is zero.

### Orientation
- $\hat{n}$ always points **outward** from $V$ for the standard form
- This convention is crucial — flipping $\hat{n}$ flips the sign

---

## 6.4 Summary of Relationships

$$\underbrace{\text{FTC}}_{\int_a^b f'dx = f(b)-f(a)} \xrightarrow{\text{2D}} \underbrace{\text{Green's}}_{\oint_C = \iint_D} \xrightarrow{\text{3D}} \begin{cases}\text{Stokes' (curl)} \\ \text{Divergence (div)}\end{cases}$$

All share the pattern: **integral over a region = integral over its boundary**.

| Integral Identity                                                             | Operator   | Dimension |
| ----------------------------------------------------------------------------- | ---------- | --------- |
| $\int_a^b f'dx = f(b) - f(a)$                                                 | derivative | 1D        |
| $\oint_C \vec{F}\cdot d\vec{r} = \iint_D (\partial_x Q - \partial_y P)\;dA$   | curl (2D)  | 2D        |
| $\oint_C \vec{F}\cdot d\vec{r} = \iint_S (\nabla\times\vec{F})\cdot d\vec{S}$ | curl       | 3D        |
| $\oint_S \vec{F}\cdot d\vec{S} = \iiint_V \nabla\cdot\vec{F}\;dV$             | div        | 3D        |

---

## Worked Examples

### Green's Theorem

**Example 1:** Evaluate $\oint_C (xy\;dx + x^2\;dy)$ where $C$ is the triangle with vertices $(0,0)$, $(1,0)$, $(0,1)$ traversed counterclockwise.

*Solution:*
$P = xy$, $Q = x^2$. $\frac{\partial Q}{\partial x} - \frac{\partial P}{\partial y} = 2x - x = x$.

By Green's theorem:
$$\oint_C = \iint_D x\;dA$$

The triangle: $0 \leq x \leq 1$, $0 \leq y \leq 1-x$.

$$\iint_D x\;dA = \int_0^1\int_0^{1-x} x\;dy\;dx = \int_0^1 x(1-x)\;dx = \int_0^1 (x-x^2)\;dx = \frac{1}{2} - \frac{1}{3} = \frac{1}{6}$$

**Example 2:** Find the area enclosed by the ellipse $\frac{x^2}{a^2} + \frac{y^2}{b^2} = 1$.

*Solution:*
Parametrize: $x = a\cos t$, $y = b\sin t$, $0 \leq t \leq 2\pi$.

$$A = \frac{1}{2}\oint_C (x\;dy - y\;dx) = \frac{1}{2}\int_0^{2\pi}[a\cos t\cdot b\cos t - b\sin t\cdot(-a\sin t)]\;dt$$
$$= \frac{ab}{2}\int_0^{2\pi}(\cos^2 t + \sin^2 t)\;dt = \frac{ab}{2}\cdot 2\pi = \pi ab$$

### Stokes' Theorem

**Example 3:** Verify Stokes' theorem for $\vec{F} = y\hat{i} - x\hat{j} + z\hat{k}$ where $S$ is the upper hemisphere $x^2+y^2+z^2 = 1$, $z \geq 0$.

*Solution:*

**Line integral side:** $C$ is the unit circle $x^2+y^2 = 1$ in the $xy$-plane (counterclockwise from above).

Parametrize: $\vec{r}(t) = (\cos t, \sin t, 0)$, $0 \leq t \leq 2\pi$.

$$\oint_C \vec{F}\cdot d\vec{r} = \int_0^{2\pi}(\sin t(-\sin t) + (-\cos t)(\cos t) + 0)\;dt$$
$$= \int_0^{2\pi}(-\sin^2 t - \cos^2 t)\;dt = \int_0^{2\pi}(-1)\;dt = -2\pi$$

**Surface integral side:** $\nabla\times\vec{F} = \begin{vmatrix}\hat{i}&\hat{j}&\hat{k}\\\partial_x&\partial_y&\partial_z\\y&-x&z\end{vmatrix} = (0-0)\hat{i}-(0-0)\hat{j}+(-1-1)\hat{k} = -2\hat{k}$

By Stokes' theorem:
$$\iint_S (\nabla\times\vec{F})\cdot d\vec{S} = \iint_S (-2\hat{k})\cdot\hat{n}\;dS$$

Since $\nabla\times\vec{F} = -2\hat{k}$ is constant, and the projection of the hemisphere onto the $xy$-plane is the unit disk:

$$= -2\iint_S \hat{k}\cdot\hat{n}\;dS = -2\cdot\text{Area}(\text{projection}) = -2\pi$$

Both sides equal $-2\pi$. $\checkmark$

### Divergence Theorem

**Example 4:** Evaluate $\oiint_S \vec{F}\cdot d\vec{S}$ where $\vec{F} = x\hat{i} + y\hat{j} + z\hat{k}$ and $S$ is the sphere $x^2+y^2+z^2 = a^2$.

*Solution:*
$\nabla\cdot\vec{F} = 1 + 1 + 1 = 3$.

$$\oiint_S \vec{F}\cdot d\vec{S} = \iiint_V 3\;dV = 3\cdot\frac{4}{3}\pi a^3 = 4\pi a^3$$

**Example 5:** Evaluate $\oiint_S \vec{F}\cdot d\vec{S}$ where $\vec{F} = x^2\hat{i} + y^2\hat{j} + z^2\hat{k}$ and $S$ is the unit cube $[0,1]^3$.

*Solution:*
$\nabla\cdot\vec{F} = 2x + 2y + 2z$.

$$\oint_S \vec{F}\cdot d\vec{S} = \int_0^1\int_0^1\int_0^1 (2x+2y+2z)\;dx\;dy\;dz$$

By symmetry, each of the three integrals contributes equally:
$$= 3\int_0^1\int_0^1\int_0^1 2x\;dx\;dy\;dz = 3\cdot 2\cdot\frac{1}{2}\cdot 1\cdot 1 = 3$$

**Example 6:** Let $\vec{F} = (x^3, y^3, z^3)$ and $V$ be the solid ball $x^2+y^2+z^2 \leq a^2$. Find the outward flux.

*Solution:*
$\nabla\cdot\vec{F} = 3x^2 + 3y^2 + 3z^2 = 3r^2$.

Using spherical coordinates:
$$\iiint_V 3r^2\;dV = \int_0^{2\pi}\int_0^\pi\int_0^a 3r^2\cdot r^2\sin\phi\;dr\;d\phi\;d\theta$$
$$= 3\int_0^{2\pi}d\theta\int_0^\pi\sin\phi\;d\phi\int_0^a r^4\;dr = 3\cdot 2\pi\cdot 2\cdot\frac{a^5}{5} = \frac{12\pi a^5}{5}$$

---

## Practice Problems

1. Use Green's theorem to evaluate $\oint_C (3y\;dx + 5x\;dy)$ where $C$ is the circle $x^2+y^2 = 4$ (counterclockwise).

2. Use Green's theorem to find the area of the region bounded by $y = x^2$ and $y = x$.

3. Verify Stokes' theorem for $\vec{F} = (z, x, y)$ and the triangle with vertices $(1,0,0)$, $(0,1,0)$, $(0,0,1)$.

4. Use the Divergence theorem to evaluate $\oint_S (x^2\hat{i} + xy\hat{j} + xz\hat{k})\cdot d\vec{S}$ where $S$ is the surface of the region bounded by $x = 0$, $y = 0$, $z = 0$, and $2x + 2y + z = 4$.

5. If $\vec{F} = r^n\vec{r}$ where $\vec{r} = x\hat{i}+y\hat{j}+z\hat{k}$ and $r = \|\vec{r}\|$, show that $\nabla\cdot\vec{F} = (n+3)r^n$. Hence find the flux of $\vec{F}$ through the unit sphere for any $n$.

6. *(Exam-style)* Show that $\iiint_V \nabla^2 f\;dV = \oint_S \nabla f\cdot d\vec{S}$ (by applying the divergence theorem to $\vec{F} = \nabla f$).

### Solutions

1. $Q_x - P_y = 5 - 3 = 2$. $\oint_C = \iint_D 2\;dA = 2\cdot\pi(2)^2 = 8\pi$.

2. Area $= \frac{1}{2}\oint_C(x\;dy - y\;dx)$. Alternatively, $\int_0^1(x-x^2)dx = \frac{1}{2}-\frac{1}{3} = \frac{1}{6}$.

3. Line integral: Parametrize each edge of the triangle and compute. Surface integral: $\nabla\times\vec{F} = (1,1,1)$. The triangle has normal $\hat{n} = \frac{1}{\sqrt{3}}(1,1,1)$ and area $= \frac{\sqrt{3}}{2}$. So $\iint_S = (1,1,1)\cdot\frac{(1,1,1)}{\sqrt{3}}\cdot\frac{\sqrt{3}}{2} = \frac{3}{\sqrt{3}}\cdot\frac{\sqrt{3}}{2} = \frac{3}{2}$.

4. $\nabla\cdot\vec{F} = 2x+x+x = 4x$. The region: $0\leq x\leq 2$, $0\leq y\leq 2-x$, $0\leq z\leq 4-2x-2y$.
   $\iiint 4x\;dV = 4\int_0^2\int_0^{2-x}\int_0^{4-2x-2y}x\;dz\;dy\;dx = 4\int_0^2\int_0^{2-x}x(4-2x-2y)\;dy\;dx$
   $= 4\int_0^2 x[(4-2x)(2-x)-(2-x)^2]\;dx = 4\int_0^2 x(2-x)^2\;dx$
   $= 4\int_0^2(4x-4x^2+x^3)\;dx = 4[2x^2-\frac{4x^3}{3}+\frac{x^4}{4}]_0^2 = 4[8-\frac{32}{3}+4] = 4\cdot\frac{4}{3} = \frac{16}{3}$.

5. $\vec{F} = r^n(x,y,z)$. Using $\frac{\partial r}{\partial x} = \frac{x}{r}$: $\frac{\partial(r^n x)}{\partial x} = r^n + x\cdot nr^{n-1}\cdot\frac{x}{r} = r^n + nx^2r^{n-2}$.
   By symmetry: $\nabla\cdot\vec{F} = 3r^n + n(x^2+y^2+z^2)r^{n-2} = 3r^n + nr^n = (n+3)r^n$.
   Flux through unit sphere: $\iiint_{r\leq 1}(n+3)r^n\;dV = (n+3)\int_0^{2\pi}\int_0^\pi\int_0^1 r^{n+2}\sin\phi\;dr\;d\phi\;d\theta = (n+3)\cdot 4\pi\cdot\frac{1}{n+3} = 4\pi$ (for $n > -3$).

6. Set $\vec{F} = \nabla f$. Then $\nabla\cdot\vec{F} = \nabla\cdot(\nabla f) = \nabla^2 f$. By divergence theorem: $\iiint_V \nabla^2 f\;dV = \oint_S \nabla f\cdot d\vec{S}$. $\square$
