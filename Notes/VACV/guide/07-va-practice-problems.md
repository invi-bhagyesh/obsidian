# 7. Vector Analysis — Consolidated Practice Problems

---

These problems cover all VA topics at exam level. Time yourself: aim for 5-8 minutes per problem.

---

## Section A: Gradient & Directional Derivatives

**Q1.** Let $f(x,y,z) = x^2y + yz^3$. Find:
(a) $\nabla f$
(b) $\nabla f$ at $(1, -1, 2)$
(c) $D_{\hat{u}}f$ at $(1, -1, 2)$ in the direction of $\vec{v} = (2, 1, -2)$

**Q2.** Find the equation of the tangent plane and the normal line to the surface $x^2 + 2y^2 + 3z^2 = 12$ at the point $(1, 1, \sqrt{3})$.

**Q3.** In what direction does $f(x,y,z) = xe^y + yz$ increase most rapidly at $(1, 0, 1)$? What is the maximum rate of increase?

**Q4.** Find the directional derivative of $f(x,y) = e^x\cos y$ at $(0, \pi/4)$ in the direction making angle $\pi/3$ with the positive $x$-axis.

**Q5.** Show that the surfaces $x^2 + y^2 + z^2 = 9$ and $z = x^2 + y^2 - 3$ are tangent to each other at $(2, -1, 2)$. *(Hint: show they share a normal direction.)*

---

## Section B: Divergence & Curl

**Q6.** Given $\vec{F} = (x^2yz, xy^2z, xyz^2)$, compute $\nabla\cdot\vec{F}$ and $\nabla\times\vec{F}$.

**Q7.** Find constants $a, b, c$ such that $\vec{F} = (x+2y+az)\hat{i} + (bx-3y-z)\hat{j} + (4x+cy+2z)\hat{k}$ is irrotational.

**Q8.** For the $\vec{F}$ in Q7 (with your values of $a, b, c$), find the scalar potential $f$ such that $\vec{F} = \nabla f$.

**Q9.** Verify that $\nabla\cdot(\nabla\times\vec{F}) = 0$ for $\vec{F} = (x^2y, y^2z, z^2x)$.

**Q10.** If $\phi = 2x^3y^2z^4$, find:
(a) $\nabla\phi$
(b) $\nabla^2\phi$
(c) $\nabla\times(\nabla\phi)$

---

## Section C: Line Integrals & Conservative Fields

**Q11.** Evaluate $\int_C (y^2\;dx + 2xy\;dy)$ along:
(a) The straight line from $(0,0)$ to $(1,1)$
(b) The parabola $y = x^2$ from $(0,0)$ to $(1,1)$
(c) Are the answers the same? Why?

**Q12.** Show that $\vec{F} = (2xy + z^3)\hat{i} + x^2\hat{j} + 3xz^2\hat{k}$ is conservative and find the potential function.

**Q13.** Evaluate $\int_C \vec{F}\cdot d\vec{r}$ for $\vec{F}$ in Q12 along any path from $(1, 0, 0)$ to $(0, 1, 1)$.

**Q14.** Compute $\oint_C (e^x\sin y\;dx + e^x\cos y\;dy)$ where $C$ is any closed curve. Explain.

---

## Section D: Surface Integrals

**Q15.** Compute $\iint_S z\;dS$ where $S$ is the hemisphere $z = \sqrt{4-x^2-y^2}$.

**Q16.** Find the flux of $\vec{F} = (x, y, z)$ through the surface of the cylinder $x^2+y^2 \leq 1$, $0 \leq z \leq 2$ (entire closed surface including top and bottom).

---

## Section E: Green's, Stokes', and Divergence Theorems

**Q17.** Use Green's theorem to evaluate $\oint_C [(x^2-y^2)dx + 2xy\;dy]$ where $C$ is the boundary of the region $0 \leq x \leq 1$, $0 \leq y \leq x$ (counterclockwise).

**Q18.** Verify Stokes' theorem for $\vec{F} = (y, -x, z^2)$ on the hemisphere $z = \sqrt{1-x^2-y^2}$, $z \geq 0$.

**Q19.** Use the Divergence theorem to evaluate $\oint_S (x^3\hat{i} + y^3\hat{j} + z^3\hat{k})\cdot d\vec{S}$ where $S$ is the sphere $x^2+y^2+z^2 = a^2$.

**Q20.** Let $V$ be the region bounded by $z = 0$, $z = 1$, $x^2+y^2 = 4$. Find $\oint_S \vec{F}\cdot d\vec{S}$ for $\vec{F} = (xz, yz, z^2)$.

---

## Complete Solutions

### Solution Q1
(a) $\nabla f = (2xy, x^2+z^3, 3yz^2)$

(b) At $(1,-1,2)$: $\nabla f = (2(1)(-1),\; 1+8,\; 3(-1)(4)) = (-2, 9, -12)$

(c) $\hat{u} = \frac{(2,1,-2)}{3} = (\frac{2}{3}, \frac{1}{3}, -\frac{2}{3})$
$D_{\hat{u}}f = (-2)(\frac{2}{3}) + 9(\frac{1}{3}) + (-12)(-\frac{2}{3}) = -\frac{4}{3} + 3 + 8 = \frac{29}{3}$

### Solution Q2
$F(x,y,z) = x^2+2y^2+3z^2$. $\nabla F = (2x, 4y, 6z)$.
At $(1,1,\sqrt{3})$: $\nabla F = (2, 4, 6\sqrt{3})$.

Tangent plane: $2(x-1) + 4(y-1) + 6\sqrt{3}(z-\sqrt{3}) = 0$
$\implies 2x + 4y + 6\sqrt{3}z = 24$, i.e., $x + 2y + 3\sqrt{3}z = 12$.

Normal line: $\vec{r}(t) = (1+2t,\; 1+4t,\; \sqrt{3}+6\sqrt{3}t)$.

### Solution Q3
$\nabla f = (e^y, xe^y+z, y)$. At $(1,0,1)$: $\nabla f = (1, 2, 0)$.

Direction of fastest increase: $\hat{u} = \frac{(1,2,0)}{\sqrt{5}}$.

Max rate $= \|\nabla f\| = \sqrt{1+4+0} = \sqrt{5}$.

### Solution Q4
$\nabla f = (e^x\cos y, -e^x\sin y)$. At $(0,\pi/4)$: $\nabla f = (\frac{\sqrt{2}}{2}, -\frac{\sqrt{2}}{2})$.

$\hat{u} = (\cos(\pi/3), \sin(\pi/3)) = (\frac{1}{2}, \frac{\sqrt{3}}{2})$.

$D_{\hat{u}}f = \frac{\sqrt{2}}{2}\cdot\frac{1}{2} + (-\frac{\sqrt{2}}{2})\cdot\frac{\sqrt{3}}{2} = \frac{\sqrt{2}}{4}(1-\sqrt{3})$

### Solution Q5
Surface 1: $F_1 = x^2+y^2+z^2$. $\nabla F_1 = (2x,2y,2z)$. At $(2,-1,2)$: $\nabla F_1 = (4,-2,4)$.
Surface 2: $F_2 = x^2+y^2-z$. $\nabla F_2 = (2x,2y,-1)$. At $(2,-1,2)$: $\nabla F_2 = (4,-2,-1)$.

Check: point on S1? $4+1+4=9$ $\checkmark$. On S2? $4+1-3=2$, $z=2$ $\checkmark$.

The normals are $(4,-2,4)$ and $(4,-2,-1)$. These are not parallel (no scalar $\lambda$ satisfies $(4,-2,4) = \lambda(4,-2,-1)$), so the surfaces are not tangent at this point — they intersect transversally.

The angle $\alpha$ between the surfaces at the intersection point satisfies:

$$\cos\alpha = \frac{|(4,-2,4)\cdot(4,-2,-1)|}{|(4,-2,4)|\,|(4,-2,-1)|} = \frac{|16+4-4|}{\sqrt{36}\cdot\sqrt{21}} = \frac{16}{6\sqrt{21}}$$

### Solution Q6
$\nabla\cdot\vec{F} = 2xyz + 2xyz + 2xyz = 6xyz$.

$\nabla\times\vec{F} = (xz^2-xy^2z)\hat{i}-(yz^2-x^2yz)\hat{j}+(y^2z-x^2z)\hat{k}$
$= xz(z-y^2)\hat{i} - yz(z-x^2)\hat{j} + z(y^2-x^2)\hat{k}$

### Solution Q7
$\nabla\times\vec{F} = \vec{0}$:
- $\hat{i}$: $c - (-1) = c+1 = 0 \implies c = -1$
- $\hat{j}$: $a - 4 = 0 \implies a = 4$
- $\hat{k}$: $b - 2 = 0 \implies b = 2$

### Solution Q8
With $a=4, b=2, c=-1$: $\vec{F} = (x+2y+4z, 2x-3y-z, 4x-y+2z)$.

$f_x = x+2y+4z \implies f = \frac{x^2}{2}+2xy+4xz+g(y,z)$

$f_y = 2x+g_y = 2x-3y-z \implies g_y = -3y-z$
$g = -\frac{3y^2}{2}-yz+h(z)$

$f_z = 4x-y+h'(z) = 4x-y+2z \implies h'(z)=2z \implies h=z^2$

$$f = \frac{x^2}{2}+2xy+4xz-\frac{3y^2}{2}-yz+z^2+C$$

### Solution Q9

Let $\vec{F} = (P, Q, R) = (x^2y,\; y^2z,\; z^2x)$.

**Step 1.** Compute $\nabla\times\vec{F}$ using the formula $\nabla\times\vec{F} = (R_y - Q_z,\; P_z - R_x,\; Q_x - P_y)$:

$$R_y - Q_z = 0 - y^2 = -y^2$$
$$P_z - R_x = 0 - z^2 = -z^2$$
$$Q_x - P_y = 0 - x^2 = -x^2$$

$$\nabla\times\vec{F} = (-y^2,\; -z^2,\; -x^2)$$

**Step 2.** Compute $\nabla\cdot(\nabla\times\vec{F})$:

$$\frac{\partial(-y^2)}{\partial x} + \frac{\partial(-z^2)}{\partial y} + \frac{\partial(-x^2)}{\partial z} = 0 + 0 + 0 = 0 \quad\checkmark$$

This confirms the identity $\nabla\cdot(\nabla\times\vec{F}) = 0$ (divergence of a curl is always zero).

### Solution Q10
$\phi = 2x^3y^2z^4$.

(a) $\nabla\phi = (6x^2y^2z^4,\; 4x^3yz^4,\; 8x^3y^2z^3)$

(b) $\nabla^2\phi = 12xy^2z^4 + 4x^3z^4 + 24x^3y^2z^2$

(c) $\nabla\times(\nabla\phi) = \vec{0}$ always (curl of a gradient is zero).

### Solution Q11
$P = y^2, Q = 2xy$. Check: $P_y = 2y = Q_x = 2y$. Conservative!

$f_x = y^2 \implies f = xy^2$. Check: $f_y = 2xy = Q$ $\checkmark$.

(a) $f(1,1)-f(0,0) = 1 - 0 = 1$
(b) Same: $f(1,1)-f(0,0) = 1$
(c) Yes, same because $\vec{F}$ is conservative (path independent). $\checkmark$

### Solution Q12
$P = 2xy+z^3, Q = x^2, R = 3xz^2$.
$P_y = 2x = Q_x$ $\checkmark$, $P_z = 3z^2 = R_x$ $\checkmark$, $Q_z = 0 = R_y$ $\checkmark$. Conservative.

$f_x = 2xy+z^3 \implies f = x^2y + xz^3 + g(y,z)$
$f_y = x^2 + g_y = x^2 \implies g_y = 0$
$f = x^2y + xz^3 + C$

### Solution Q13

Since $\vec{F}$ is conservative with potential $f(x,y,z) = x^2y + xz^3$, the integral is path-independent:

$$\int_C \vec{F}\cdot d\vec{r} = f(0,1,1) - f(1,0,0)$$

Evaluate: $f(0,1,1) = 0^2\cdot 1 + 0\cdot 1^3 = 0$, and $f(1,0,0) = 1^2\cdot 0 + 1\cdot 0^3 = 0$.

$$\int_C \vec{F}\cdot d\vec{r} = 0 - 0 = 0$$

### Solution Q14
$P = e^x\sin y, Q = e^x\cos y$. $P_y = e^x\cos y = Q_x$. Conservative!

$\oint_C \vec{F}\cdot d\vec{r} = 0$ for any closed curve (zero circulation for conservative fields).

### Solution Q15
$S: z = \sqrt{4-x^2-y^2}$. $dS = \frac{2}{\sqrt{4-x^2-y^2}}dA$.

$\iint_S z\;dS = \iint_D \sqrt{4-r^2}\cdot\frac{2}{\sqrt{4-r^2}}\;r\;dr\;d\theta = \iint_D 2r\;dr\;d\theta$

$= \int_0^{2\pi}\int_0^2 2r\;dr\;d\theta = 2\pi\cdot[r^2]_0^2 = 8\pi$.

### Solution Q16
By Divergence theorem: $\nabla\cdot\vec{F} = 3$.
$\oiint_S \vec{F}\cdot d\vec{S} = 3\cdot\text{Vol} = 3\cdot\pi(1)^2(2) = 6\pi$.

### Solution Q17
$P = x^2-y^2, Q = 2xy$. $Q_x - P_y = 2y-(-2y) = 4y$.

$\iint_D 4y\;dA = \int_0^1\int_0^x 4y\;dy\;dx = \int_0^1 2x^2\;dx = \frac{2}{3}$

### Solution Q18
**Line integral:** $C$ is unit circle, parametrize $(\cos t, \sin t, 0)$.
$\oint = \int_0^{2\pi}[\sin t(-\sin t)+(-\cos t)\cos t]\;dt = -2\pi$.

**Surface integral:** $\nabla\times\vec{F} = (0-0)\hat{i}-(0-0)\hat{j}+(-1-1)\hat{k} = -2\hat{k}$.
$\iint_S (-2\hat{k})\cdot\hat{n}\;dS = -2\cdot\text{(area of projection on }xy\text{-plane)} = -2\pi$.

Both $= -2\pi$. $\checkmark$

### Solution Q19
$\nabla\cdot\vec{F} = 3x^2+3y^2+3z^2 = 3r^2$.

$\iiint_V 3r^2\;dV = 3\int_0^{2\pi}\int_0^\pi\int_0^a r^4\sin\phi\;dr\;d\phi\;d\theta = 3\cdot 2\pi\cdot 2\cdot\frac{a^5}{5} = \frac{12\pi a^5}{5}$

### Solution Q20
$\nabla\cdot\vec{F} = z + z + 2z = 4z$.

$\iiint_V 4z\;dV = \int_0^{2\pi}\int_0^2\int_0^1 4z\cdot r\;dz\;dr\;d\theta = 4\cdot 2\pi\cdot\frac{r^2}{2}\Big|_0^2\cdot\frac{z^2}{2}\Big|_0^1 = 4\cdot 2\pi\cdot 2\cdot\frac{1}{2} = 8\pi$
