# 19. PYQ Guide — MAT 2238 Mid-Semester, March 2026

**Exam:** Vector Analysis and Complex Variables [MAT-2238]
**Date:** 12 March 2026 | **Duration:** 90 min | **Max Marks:** 30

---

# Section A — MCQs (1 mark each, 20 min)

---

## Question 1 [1 mark]

> **Which of the following are false?**
>
> 1. If $z_1$ and $z_2$ are complex numbers with positive real parts, then $\text{Arg}(z_1) + \text{Arg}(z_2) = \text{Arg}(z_1 z_2)$.
> 2. If $z_1$ and $z_2$ are complex numbers with negative real parts, then $\text{Arg}(z_1) + \text{Arg}(z_2) = \text{Arg}(z_1 z_2)$ if the product of their imaginary parts is negative.
> 3. $(-1+i)^7 = -8(1+i)$
> 4. If $c$ is any $n$th root of unity, then $1 + c + c^2 + \cdots + c^{n-1} = 0$.

### Answer: **(4)**

### Background Theory

**Principal Argument $\text{Arg}(z)$:** The unique value of $\arg(z)$ in $(-\pi, \pi]$.

**Key property of $\text{Arg}$:** For the product $z_1 z_2$, we always have $\arg(z_1 z_2) = \arg(z_1) + \arg(z_2)$, but for the *principal* argument $\text{Arg}$, the identity $\text{Arg}(z_1) + \text{Arg}(z_2) = \text{Arg}(z_1 z_2)$ holds only when the sum $\text{Arg}(z_1) + \text{Arg}(z_2)$ stays within $(-\pi, \pi]$. When both numbers have positive real parts, their arguments are in $(-\pi/2, \pi/2)$, so the sum is in $(-\pi, \pi)$ — the identity holds. This makes **option (1) TRUE**.

When both have negative real parts, their arguments are in $(\pi/2, \pi] \cup (-\pi, -\pi/2)$. The sum could exceed $\pi$ or go below $-\pi$. If the product of the imaginary parts is negative, one argument is in $(\pi/2, \pi)$ and the other in $(-\pi, -\pi/2)$, so the sum lands in $(-\pi/2, \pi/2) \subset (-\pi, \pi]$ — the identity holds. This makes **option (2) TRUE**.

**$n$th roots of unity:** The $n$th roots of unity are $1, \omega, \omega^2, \ldots, \omega^{n-1}$ where $\omega = e^{2\pi i/n}$. They satisfy $z^n - 1 = 0$, which factors as:

$$z^n - 1 = (z-1)(z^{n-1} + z^{n-2} + \cdots + z + 1) = 0$$

For a **primitive** root $\omega \neq 1$: since $\omega \neq 1$, we get $\omega^{n-1} + \omega^{n-2} + \cdots + 1 = 0$. But the statement says "if $c$ is **any** $n$th root of unity." If $c = 1$ (which is always an $n$th root of unity), then:

$$1 + 1 + 1^2 + \cdots + 1^{n-1} = n \neq 0$$

So the statement is **FALSE** for $c = 1$.

### Verification of Option (3)

Compute $(-1+i)^7$. First, $|-1+i| = \sqrt{2}$, $\text{Arg}(-1+i) = \frac{3\pi}{4}$.

$$(-1+i)^7 = (\sqrt{2})^7 \cdot e^{i \cdot 7 \cdot 3\pi/4} = 8\sqrt{2}\cdot e^{i\cdot 21\pi/4}$$

Reduce: $\frac{21\pi}{4} = 5\pi + \frac{\pi}{4} = 4\pi + \pi + \frac{\pi}{4}$, so $e^{i\cdot 21\pi/4} = e^{i\cdot 5\pi/4} = -\frac{\sqrt{2}}{2} - \frac{\sqrt{2}}{2}i$.

$$(-1+i)^7 = 8\sqrt{2}\left(-\frac{\sqrt{2}}{2} - \frac{\sqrt{2}}{2}i\right) = 8\sqrt{2}\cdot\left(-\frac{\sqrt{2}}{2}\right)(1+i) = -8(1+i)$$

So option (3) is **TRUE**. $\checkmark$

$$\boxed{\text{Answer: (4) is false}}$$

---

## Question 2 [1 mark]

> **The principal argument, $\text{Arg}(z)$, of the complex number $z = -1 - i$ is:**
>
> 1. $\frac{5\pi}{4}$ &emsp; 2. $\frac{\pi}{4}$ &emsp; 3. $-\frac{3\pi}{4}$ &emsp; 4. $-\frac{\pi}{4}$

### Answer: **(3)**

### Full Explanation

**Step 1.** Plot $z = -1 - i$ in the complex plane. The real part is $-1$ (negative) and the imaginary part is $-1$ (negative), so $z$ lies in the **third quadrant**.

**Step 2.** The reference angle (angle with the negative real axis) is:

$$\alpha = \arctan\left(\frac{|-1|}{|-1|}\right) = \arctan(1) = \frac{\pi}{4}$$

**Step 3.** For a point in the third quadrant, the principal argument is:

$$\text{Arg}(z) = -\pi + \alpha = -\pi + \frac{\pi}{4} = -\frac{3\pi}{4}$$

**Why not $\frac{5\pi}{4}$?** The angle $\frac{5\pi}{4}$ is the same direction, but the principal argument must lie in $(-\pi, \pi]$. Since $\frac{5\pi}{4} > \pi$, it is not the principal value. We subtract $2\pi$: $\frac{5\pi}{4} - 2\pi = -\frac{3\pi}{4}$.

$$\boxed{\text{Arg}(-1-i) = -\frac{3\pi}{4}}$$

---

## Question 3 [1 mark]

> **If $\vec{F}$ is a twice continuously differentiable vector field, which of the following expressions is always equal to zero?**
>
> 1. $\nabla \cdot (\nabla \times \vec{F})$ &emsp; 2. $\nabla \times (\nabla \times \vec{F})$ &emsp; 3. $\nabla(\nabla \cdot \vec{F})$ &emsp; 4. $\nabla \cdot \vec{F} + \nabla \times \vec{F}$

### Answer: **(1)**

### Full Explanation

This question tests a fundamental vector identity.

**The identity:** For any twice continuously differentiable vector field $\vec{F}$:

$$\boxed{\nabla \cdot (\nabla \times \vec{F}) = 0 \quad\text{always}}$$

In words: **the divergence of the curl is always zero**.

**Why is this true?** Let $\vec{F} = (P, Q, R)$. Then:

$$\nabla \times \vec{F} = \left(\frac{\partial R}{\partial y} - \frac{\partial Q}{\partial z},\; \frac{\partial P}{\partial z} - \frac{\partial R}{\partial x},\; \frac{\partial Q}{\partial x} - \frac{\partial P}{\partial y}\right)$$

Taking the divergence:

$$\nabla \cdot (\nabla \times \vec{F}) = \frac{\partial}{\partial x}\!\left(\frac{\partial R}{\partial y} - \frac{\partial Q}{\partial z}\right) + \frac{\partial}{\partial y}\!\left(\frac{\partial P}{\partial z} - \frac{\partial R}{\partial x}\right) + \frac{\partial}{\partial z}\!\left(\frac{\partial Q}{\partial x} - \frac{\partial P}{\partial y}\right)$$

$$= R_{yx} - Q_{zx} + P_{zy} - R_{xy} + Q_{xz} - P_{yz}$$

Since second-order mixed partials are equal (by continuity): $R_{yx} = R_{xy}$, $Q_{zx} = Q_{xz}$, $P_{zy} = P_{yz}$. Every term cancels.

**Why the others are NOT always zero:**

- Option (2): $\nabla \times (\nabla \times \vec{F}) = \nabla(\nabla \cdot \vec{F}) - \nabla^2 \vec{F}$. This is generally nonzero.
- Option (3): $\nabla(\nabla \cdot \vec{F})$ is the gradient of the divergence — no reason to be zero.
- Option (4): $\nabla \cdot \vec{F}$ is a scalar and $\nabla \times \vec{F}$ is a vector — you **cannot add** a scalar and a vector. This expression is not even well-defined.

$$\boxed{\nabla \cdot (\nabla \times \vec{F}) = 0}$$

---

## Question 4 [1 mark]

> **Let $f(x,y,z)$ be a differentiable scalar field at a point $P$. The direction in which $f$ decreases most rapidly is given by:**
>
> 1. $\nabla f$ &emsp; 2. $-\nabla f$ &emsp; 3. $|\nabla f|$ &emsp; 4. $\nabla \times (\nabla f)$

### Answer: **(2)**

### Full Explanation

**The gradient $\nabla f$** points in the direction of **steepest increase** of $f$. The rate of change of $f$ in a direction $\hat{u}$ is given by the directional derivative:

$$D_{\hat{u}} f = \nabla f \cdot \hat{u} = |\nabla f|\cos\theta$$

where $\theta$ is the angle between $\nabla f$ and $\hat{u}$.

- **Maximum increase:** $\theta = 0$ (direction of $\nabla f$), giving $D_{\hat{u}} f = |\nabla f|$.
- **Maximum decrease:** $\theta = \pi$ (direction of $-\nabla f$), giving $D_{\hat{u}} f = -|\nabla f|$.

So $f$ **decreases most rapidly** in the direction of $-\nabla f$.

**Why not the others?**

- Option (1): $\nabla f$ is the direction of maximum *increase*, not decrease.
- Option (3): $|\nabla f|$ is a scalar (the magnitude), not a direction.
- Option (4): $\nabla \times (\nabla f) = \vec{0}$ always (curl of gradient is zero) — this is another fundamental identity.

$$\boxed{-\nabla f}$$

---

## Question 5 [1 mark]

> **The equation $|z - i| = |z + i|$ represents which locus in the complex plane?**
>
> 1. A circle centered at the origin with radius 1
> 2. The imaginary axis ($y$-axis)
> 3. The real axis ($x$-axis)
> 4. A line passing through $(0,1)$ and $(0,-1)$

### Answer: **(3)**

### Full Explanation

**Step 1.** Write $z = x + iy$. Then:

$$|z - i| = |x + i(y-1)| = \sqrt{x^2 + (y-1)^2}$$

$$|z + i| = |x + i(y+1)| = \sqrt{x^2 + (y+1)^2}$$

**Step 2.** Set them equal and square both sides:

$$x^2 + (y-1)^2 = x^2 + (y+1)^2$$

$$y^2 - 2y + 1 = y^2 + 2y + 1$$

$$-4y = 0 \implies y = 0$$

**Step 3.** The locus $y = 0$ is the **real axis** ($x$-axis).

**Geometric interpretation:** $|z - i|$ is the distance from $z$ to the point $i = (0,1)$, and $|z + i|$ is the distance from $z$ to the point $-i = (0,-1)$. The set of points equidistant from $(0,1)$ and $(0,-1)$ is the **perpendicular bisector** of the segment joining them, which is the $x$-axis.

**Why not option (4)?** A line through $(0,1)$ and $(0,-1)$ would be the $y$-axis (the line $x = 0$), not the $x$-axis. The perpendicular bisector is *perpendicular* to the line joining the two points.

$$\boxed{\text{The real axis } (x\text{-axis})}$$

---

# Section B — Descriptive (20+ marks)

---

## Question 6 [4 marks]

> Let $f : \mathbb{R}^2 \to \mathbb{R}$ be a non-constant continuously differentiable scalar field and let $f(x,y) = \alpha$ describe a level curve $\mathcal{C}$ where $\alpha \in \mathbb{R}$. If $\vec{r}(t) = x(t)\hat{i} + y(t)\hat{j}$ is a smooth parametrization of $\mathcal{C}$, prove that the directional derivative of $f$ along the curve is $0$.

### Background Theory

**Level curve:** The set of points $(x,y)$ where $f(x,y)$ equals a constant $\alpha$. Think of contour lines on a topographic map — along a contour line, the elevation (function value) doesn't change.

**Directional derivative along a curve:** The rate of change of $f$ in the direction of the tangent vector $\vec{r}\,'(t)$ at a point on the curve. Formally:

$$D_{\vec{r}\,'(t)} f = \frac{\nabla f \cdot \vec{r}\,'(t)}{\|\vec{r}\,'(t)\|}$$

**Chain rule for multivariable functions:** If $(x(t), y(t))$ traces a path, then:

$$\frac{d}{dt}f(x(t), y(t)) = \frac{\partial f}{\partial x}\frac{dx}{dt} + \frac{\partial f}{\partial y}\frac{dy}{dt} = \nabla f \cdot \vec{r}\,'(t)$$

### Solution

**Step 1.** Since $\vec{r}(t) = (x(t), y(t))$ parametrizes the level curve $\mathcal{C}$, every point on the curve satisfies:

$$f(x(t), y(t)) = \alpha \quad\text{for all } t \tag{1}$$

where $\alpha$ is a constant.

**Step 2.** Differentiate equation (1) with respect to $t$ using the multivariable chain rule. Since $f$ is continuously differentiable and $(x(t), y(t))$ is smooth:

$$\frac{d}{dt}f(x(t), y(t)) = \frac{\partial f}{\partial x}\frac{dx}{dt} + \frac{\partial f}{\partial y}\frac{dy}{dt} = 0 \tag{2}$$

The right-hand side is $0$ because $\frac{d}{dt}(\alpha) = 0$ (derivative of a constant).

**Step 3.** Recognize the left-hand side as a dot product:

$$\frac{\partial f}{\partial x}\frac{dx}{dt} + \frac{\partial f}{\partial y}\frac{dy}{dt} = \nabla f(x(t), y(t)) \cdot \vec{r}\,'(t) = 0 \tag{3}$$

**Step 4.** The directional derivative of $f$ along the curve at $\vec{r}(t)$ is:

$$D_{\hat{T}} f = \frac{\nabla f \cdot \vec{r}\,'(t)}{\|\vec{r}\,'(t)\|} = \frac{0}{\|\vec{r}\,'(t)\|} = 0$$

where $\hat{T} = \vec{r}\,'(t)/\|\vec{r}\,'(t)\|$ is the unit tangent vector (well-defined since $\mathcal{C}$ is smooth, so $\vec{r}\,'(t) \neq \vec{0}$).

$$\boxed{D_{\hat{T}} f = 0}$$

**Geometric interpretation:** The gradient $\nabla f$ is always **perpendicular** to level curves. Since the tangent vector $\vec{r}\,'(t)$ is along the level curve, the dot product $\nabla f \cdot \vec{r}\,'(t) = 0$. This means $f$ has zero rate of change along its level curves — the function value doesn't change if you walk along a contour. $\blacksquare$

---

## Question 7 [3 marks]

> Find the directional derivative of $f(x,y,z) = 2x^2 + 3y^2 + z^2$ at $P(2,1,3)$ in the direction of the unit vector $\hat{b} = \left(\frac{1}{\sqrt{5}}, 0, \frac{-2}{\sqrt{5}}\right)$. At $P$, along which direction will $f$ have the maximum rate of increase?

### Background Theory

**Gradient of a scalar field:** $\nabla f = \left(\frac{\partial f}{\partial x}, \frac{\partial f}{\partial y}, \frac{\partial f}{\partial z}\right)$.

**Directional derivative** in the direction of a unit vector $\hat{b}$: $D_{\hat{b}} f(P) = \nabla f(P) \cdot \hat{b}$.

**Maximum rate of increase** occurs in the direction of $\nabla f(P)$, and the maximum rate itself equals $|\nabla f(P)|$.

### Solution

**Step 1.** Compute the partial derivatives:

$$\frac{\partial f}{\partial x} = 4x, \qquad \frac{\partial f}{\partial y} = 6y, \qquad \frac{\partial f}{\partial z} = 2z$$

**Step 2.** Evaluate the gradient at $P(2,1,3)$:

$$\nabla f(P) = (4(2),\; 6(1),\; 2(3)) = (8, 6, 6)$$

**Step 3.** Compute the directional derivative. The direction is the unit vector $\hat{b} = \left(\frac{1}{\sqrt{5}}, 0, \frac{-2}{\sqrt{5}}\right)$:

$$D_{\hat{b}} f(P) = \nabla f(P) \cdot \hat{b} = (8, 6, 6) \cdot \left(\frac{1}{\sqrt{5}}, 0, \frac{-2}{\sqrt{5}}\right)$$

$$= \frac{8}{\sqrt{5}} + 0 + \frac{-12}{\sqrt{5}} = \frac{8 - 12}{\sqrt{5}} = \frac{-4}{\sqrt{5}}$$

$$\boxed{D_{\hat{b}} f(P) = \frac{-4}{\sqrt{5}}}$$

The negative sign means $f$ is **decreasing** in the direction of $\hat{b}$.

**Step 4.** The direction of maximum rate of increase is $\nabla f(P)$:

$$\boxed{\text{Direction of maximum increase: } \nabla f(P) = (8, 6, 6)}$$

(Or as a unit vector: $\hat{u} = \frac{(8,6,6)}{|(8,6,6)|} = \frac{(8,6,6)}{\sqrt{64+36+36}} = \frac{(8,6,6)}{\sqrt{136}} = \frac{(8,6,6)}{2\sqrt{34}}$.)

The maximum rate of increase is $|\nabla f(P)| = \sqrt{64+36+36} = \sqrt{136} = 2\sqrt{34}$.

---

## Question 8 [3 marks]

> Find the equation of the tangent plane to the surface $z = xy$ at the point $P(2,3,6)$.

### Background Theory

**Tangent plane to a surface $F(x,y,z) = 0$:** If a surface is given implicitly by $F(x,y,z) = 0$, the tangent plane at a point $P(a,b,c)$ is:

$$\nabla F(P) \cdot (x-a, y-b, z-c) = 0$$

That is: $F_x(P)(x-a) + F_y(P)(y-b) + F_z(P)(z-c) = 0$.

The gradient $\nabla F$ at a point on the surface is **normal** (perpendicular) to the surface there.

### Solution

**Step 1.** Rewrite the surface equation as $F(x,y,z) = 0$:

$$z = xy \implies F(x,y,z) = xy - z = 0$$

**Step 2.** Compute the gradient of $F$:

$$\nabla F = \left(\frac{\partial F}{\partial x},\; \frac{\partial F}{\partial y},\; \frac{\partial F}{\partial z}\right) = (y,\; x,\; -1)$$

**Step 3.** Evaluate at $P(2,3,6)$:

$$\nabla F(P) = (3, 2, -1)$$

**Step 4.** Verify that $P$ lies on the surface: $z = xy \implies 6 = 2 \cdot 3 = 6$. $\checkmark$

**Step 5.** Write the tangent plane equation:

$$\nabla F(P) \cdot (x-2,\; y-3,\; z-6) = 0$$

$$3(x-2) + 2(y-3) + (-1)(z-6) = 0$$

$$3x - 6 + 2y - 6 - z + 6 = 0$$

$$\boxed{3x + 2y - z = 6}$$

---

## Question 9 [3 marks]

> For what value of the constant $a$ will the vector field $\vec{v} = (axy - z^3)\hat{i} + (a-2)x^2\hat{j} + (1-a)xz^2\hat{k}$ have its curl identically zero?

### Background Theory

**Curl of a vector field $\vec{v} = (P, Q, R)$:**

$$\nabla \times \vec{v} = \begin{vmatrix} \hat{i} & \hat{j} & \hat{k} \\ \frac{\partial}{\partial x} & \frac{\partial}{\partial y} & \frac{\partial}{\partial z} \\ P & Q & R \end{vmatrix}$$

$$= \hat{i}\!\left(\frac{\partial R}{\partial y} - \frac{\partial Q}{\partial z}\right) - \hat{j}\!\left(\frac{\partial R}{\partial x} - \frac{\partial P}{\partial z}\right) + \hat{k}\!\left(\frac{\partial Q}{\partial x} - \frac{\partial P}{\partial y}\right)$$

A vector field with $\nabla \times \vec{v} = \vec{0}$ everywhere is called **irrotational** (or conservative, if the domain is simply connected). This means $\vec{v}$ can be written as the gradient of some scalar potential.

### Solution

**Step 1.** Identify the components:

$$P = axy - z^3, \qquad Q = (a-2)x^2, \qquad R = (1-a)xz^2$$

**Step 2.** Compute each component of $\nabla \times \vec{v}$ and set it to zero.

**$\hat{i}$-component:** $\frac{\partial R}{\partial y} - \frac{\partial Q}{\partial z}$:

$$\frac{\partial R}{\partial y} = \frac{\partial}{\partial y}[(1-a)xz^2] = 0$$

$$\frac{\partial Q}{\partial z} = \frac{\partial}{\partial z}[(a-2)x^2] = 0$$

$\hat{i}$-component: $0 - 0 = 0$. $\checkmark$ (Automatically zero for any $a$.)

**$\hat{j}$-component:** $-\left(\frac{\partial R}{\partial x} - \frac{\partial P}{\partial z}\right)$:

$$\frac{\partial R}{\partial x} = (1-a)z^2$$

$$\frac{\partial P}{\partial z} = -3z^2$$

Setting $\frac{\partial R}{\partial x} = \frac{\partial P}{\partial z}$:

$$(1-a)z^2 = -3z^2 \implies 1 - a = -3 \implies a = 4 \tag{i}$$

**$\hat{k}$-component:** $\frac{\partial Q}{\partial x} - \frac{\partial P}{\partial y}$:

$$\frac{\partial Q}{\partial x} = 2(a-2)x$$

$$\frac{\partial P}{\partial y} = ax$$

Setting them equal:

$$2(a-2)x = ax \implies 2a - 4 = a \implies a = 4 \tag{ii}$$

**Step 3.** Both conditions (i) and (ii) give $a = 4$, which is consistent.

$$\boxed{a = 4}$$

**Verification:** With $a = 4$: $\vec{v} = (4xy - z^3)\hat{i} + 2x^2\hat{j} - 3xz^2\hat{k}$. Check: $Q_x = 4x = P_y = 4x$ $\checkmark$; $R_x = -3z^2 = P_z = -3z^2$ $\checkmark$; $R_y = 0 = Q_z = 0$ $\checkmark$.

---

## Question 10 [3 marks]

> Does the value $\displaystyle\lim_{z \to 0} \frac{z}{\bar{z}}$ exist? If so, find the value, otherwise justify.

### Background Theory

**Complex limits:** For a limit $\lim_{z \to z_0} f(z)$ to exist in $\mathbb{C}$, the function must approach the same value regardless of the **path** along which $z$ approaches $z_0$. If two different paths give different limits, the limit does not exist.

**Notation:** $\bar{z}$ denotes the complex conjugate. If $z = x + iy$, then $\bar{z} = x - iy$.

### Solution

**Step 1.** Write $z = x + iy$ and $\bar{z} = x - iy$:

$$\frac{z}{\bar{z}} = \frac{x+iy}{x-iy}$$

**Step 2. Path 1 — along the real axis** ($y = 0$, $z = x$):

$$\frac{z}{\bar{z}} = \frac{x + 0}{x - 0} = \frac{x}{x} = 1 \quad\text{as } x \to 0$$

$$\lim_{\substack{z \to 0 \\ \text{real axis}}} \frac{z}{\bar{z}} = 1$$

**Step 3. Path 2 — along the imaginary axis** ($x = 0$, $z = iy$):

$$\frac{z}{\bar{z}} = \frac{0 + iy}{0 - iy} = \frac{iy}{-iy} = -1 \quad\text{as } y \to 0$$

$$\lim_{\substack{z \to 0 \\ \text{imag axis}}} \frac{z}{\bar{z}} = -1$$

**Step 4.** Since the limit along the real axis ($= 1$) differs from the limit along the imaginary axis ($= -1$):

$$\boxed{\lim_{z \to 0} \frac{z}{\bar{z}} \text{ does not exist}}$$

**Formal justification (proof by contradiction):** Suppose the limit $L$ exists. Then for every $\varepsilon > 0$, there exists $\delta > 0$ such that $0 < |z| < \delta \implies \left|\frac{z}{\bar{z}} - L\right| < \varepsilon$.

Choose $\varepsilon = \min\left\{\frac{|L-1|}{2}, \frac{|L+1|}{2}\right\}$. For any $\delta > 0$, take $z = i\delta/2$ (on the imaginary axis): $\frac{z}{\bar{z}} = -1$, so $\left|\frac{z}{\bar{z}} - L\right| = |{-1} - L| = |1 + L|$. But also take $z = \delta/2$ (on the real axis): $\frac{z}{\bar{z}} = 1$, so $\left|\frac{z}{\bar{z}} - L\right| = |1-L|$. For both to be $< \varepsilon$, we need $|1-L| < \varepsilon$ and $|1+L| < \varepsilon$. By triangle inequality: $2 = |(1-L) - (-(1+L))| \leq |1-L| + |1+L| < 2\varepsilon$, so $\varepsilon > 1$. But if $L \neq 1$ and $L \neq -1$, we can choose $\varepsilon$ small enough to get a contradiction. And if $L = 1$, then $|1+L| = 2 \not< \varepsilon$ for small $\varepsilon$; if $L = -1$, then $|1-L| = 2 \not< \varepsilon$. Contradiction in all cases. $\blacksquare$

---

## Question 11 [3 marks]

> Show that the function $f(z) = z^2 + 2z + 1$ defined for all $z \in \mathbb{C}$ is continuous at $z = 1$, i.e., $\lim_{z \to 1} f(z) = f(1)$, using the $\varepsilon$-$\delta$ definition of limits.

### Background Theory

**$\varepsilon$-$\delta$ definition of limit in $\mathbb{C}$:** We say $\lim_{z \to z_0} f(z) = L$ if: for every $\varepsilon > 0$, there exists a $\delta > 0$ such that

$$0 < |z - z_0| < \delta \implies |f(z) - L| < \varepsilon$$

**Continuity at $z_0$:** $f$ is continuous at $z_0$ if $\lim_{z \to z_0} f(z) = f(z_0)$, i.e., the same definition but with $L = f(z_0)$ and we allow $z = z_0$ too.

The strategy is: compute $|f(z) - f(z_0)|$, factor it in terms of $|z - z_0|$, then bound the remaining factors using the assumption $|z - z_0| < \delta$.

### Solution

**Step 1.** Compute $f(1)$:

$$f(1) = 1 + 2 + 1 = 4$$

We need to show: $\lim_{z \to 1} (z^2 + 2z + 1) = 4$.

**Step 2.** Compute $|f(z) - 4|$:

$$|z^2 + 2z + 1 - 4| = |z^2 + 2z - 3| = |(z+3)(z-1)|= |z+3|\cdot|z-1|$$

**Step 3.** We need to bound $|z+3|$. Assume $|z - 1| < \delta \leq 1$ (we will choose $\delta \leq 1$). Then by the triangle inequality:

$$|z| \leq |z - 1| + |1| < 1 + 1 = 2$$

$$|z + 3| \leq |z| + 3 < 2 + 3 = 5$$

**Step 4.** Under $|z - 1| < \delta \leq 1$:

$$|f(z) - 4| = |z+3|\cdot|z-1| < 5\delta$$

**Step 5.** Given $\varepsilon > 0$, choose:

$$\delta = \min\left\{1, \;\frac{\varepsilon}{5}\right\}$$

Then for $0 < |z - 1| < \delta$:

$$|f(z) - 4| < 5\delta \leq 5 \cdot \frac{\varepsilon}{5} = \varepsilon$$

**Step 6.** Conclusion: For every $\varepsilon > 0$, we have found $\delta = \min\{1, \varepsilon/5\} > 0$ such that $|z - 1| < \delta$ implies $|f(z) - 4| < \varepsilon$.

$$\boxed{\lim_{z \to 1} f(z) = 4 = f(1), \text{ so } f \text{ is continuous at } z = 1. \quad\blacksquare}$$

---

## Question 12 [2 marks]

> Let $\phi : \mathbb{R}^3 \to \mathbb{R}$ be such that $\nabla\phi(x,y,z) = 2xyz^3\,\hat{i} + x^2 z^3\,\hat{j} + 3x^2 y z^2\,\hat{k}$.
>
> Find $\phi(x,y,z)$ if $\phi(1,-2,2) = 4$.

### Background Theory

**Gradient and potential:** If $\nabla \phi = (P, Q, R)$, then:

$$\frac{\partial \phi}{\partial x} = P, \qquad \frac{\partial \phi}{\partial y} = Q, \qquad \frac{\partial \phi}{\partial z} = R$$

To find $\phi$, integrate one component and determine the arbitrary functions using the other components.

**Shortcut (by inspection):** If you can spot a function whose partial derivatives match, you can write $\phi$ directly. The key observation is looking for a common product structure.

### Solution

**Step 1.** We have:

$$\frac{\partial \phi}{\partial x} = 2xyz^3, \qquad \frac{\partial \phi}{\partial y} = x^2 z^3, \qquad \frac{\partial \phi}{\partial z} = 3x^2 y z^2$$

**Step 2.** Integrate $\frac{\partial \phi}{\partial x} = 2xyz^3$ with respect to $x$:

$$\phi = \int 2xyz^3\,dx = x^2 y z^3 + g(y,z)$$

where $g(y,z)$ is an arbitrary function of $y$ and $z$ (constant with respect to $x$).

**Step 3.** Determine $g(y,z)$ using $\frac{\partial \phi}{\partial y} = x^2 z^3$:

$$\frac{\partial \phi}{\partial y} = x^2 z^3 + \frac{\partial g}{\partial y} = x^2 z^3$$

$$\frac{\partial g}{\partial y} = 0 \implies g(y,z) = h(z)$$

**Step 4.** Determine $h(z)$ using $\frac{\partial \phi}{\partial z} = 3x^2 y z^2$:

$$\frac{\partial \phi}{\partial z} = 3x^2 y z^2 + h'(z) = 3x^2 y z^2$$

$$h'(z) = 0 \implies h(z) = C$$

**Step 5.** So $\phi(x,y,z) = x^2 y z^3 + C$.

**Step 6.** Apply the initial condition $\phi(1, -2, 2) = 4$:

$$\phi(1,-2,2) = (1)^2(-2)(2)^3 + C = (1)(-2)(8) + C = -16 + C = 4$$

$$C = 20$$

$$\boxed{\phi(x,y,z) = x^2 y z^3 + 20}$$

---

## Question 13 [2 marks]

> Find all complex 4th roots of $-16$, exhibit them as vertices of a square, and identify the principal root.

### Background Theory

**$n$th roots of a complex number $w$:** If $w = |w|e^{i\theta}$, the $n$ roots are:

$$z_k = |w|^{1/n} \cdot e^{i(\theta + 2k\pi)/n}, \qquad k = 0, 1, \ldots, n-1$$

These $n$ roots are equally spaced on a circle of radius $|w|^{1/n}$, separated by angle $2\pi/n$. For $n = 4$, they form a **square**.

**Principal root:** The root with the smallest non-negative argument, i.e., $k = 0$ using $\theta = \text{Arg}(w)$.

### Solution

**Step 1.** Write $-16$ in polar form:

$$-16 = 16 \cdot e^{i\pi}$$

So $|w| = 16$ and $\text{Arg}(w) = \pi$.

**Step 2.** The four 4th roots are:

$$z_k = 16^{1/4} \cdot e^{i(\pi + 2k\pi)/4} = 2\,e^{i\pi(1+2k)/4}, \qquad k = 0, 1, 2, 3$$

**Step 3.** Compute each root:

| $k$ | Angle $\theta_k = \frac{(1+2k)\pi}{4}$ | Root $z_k = 2e^{i\theta_k}$ | Rectangular form |
|---|---|---|---|
| $0$ | $\frac{\pi}{4}$ | $2e^{i\pi/4}$ | $2\left(\frac{\sqrt{2}}{2} + \frac{\sqrt{2}}{2}i\right) = \sqrt{2} + \sqrt{2}\,i$ |
| $1$ | $\frac{3\pi}{4}$ | $2e^{i3\pi/4}$ | $2\left(-\frac{\sqrt{2}}{2} + \frac{\sqrt{2}}{2}i\right) = -\sqrt{2} + \sqrt{2}\,i$ |
| $2$ | $\frac{5\pi}{4}$ | $2e^{i5\pi/4}$ | $2\left(-\frac{\sqrt{2}}{2} - \frac{\sqrt{2}}{2}i\right) = -\sqrt{2} - \sqrt{2}\,i$ |
| $3$ | $\frac{7\pi}{4}$ | $2e^{i7\pi/4}$ | $2\left(\frac{\sqrt{2}}{2} - \frac{\sqrt{2}}{2}i\right) = \sqrt{2} - \sqrt{2}\,i$ |

**Step 4. Vertices of a square:** All four roots lie on a circle of radius $2$, equally spaced at $90°$ apart. They form a square with vertices at $(\pm\sqrt{2}, \pm\sqrt{2})$ in the complex plane, rotated $45°$ from the axes.

**Step 5.** The **principal root** is $z_0$ (using $k = 0$ with the principal argument):

$$\boxed{\text{Principal root: } z_0 = \sqrt{2} + \sqrt{2}\,i = 2e^{i\pi/4}}$$

$$\boxed{(-16)^{1/4} = \left\{\sqrt{2}+\sqrt{2}\,i,\; -\sqrt{2}+\sqrt{2}\,i,\; -\sqrt{2}-\sqrt{2}\,i,\; \sqrt{2}-\sqrt{2}\,i\right\}}$$

---

## Question 14 [2 marks]

> Given the curve $\mathcal{C}: \vec{r}(t) = \left(t, \frac{t^2}{4}, 2\right)$, find the tangent vector $\vec{r}\,'(t)$ at the point $P(2,1,2)$. Use this to find the parametric representation of the tangent line at $P$.

### Background Theory

**Tangent vector to a parametric curve:** If $\vec{r}(t) = (x(t), y(t), z(t))$, the tangent vector at parameter value $t$ is:

$$\vec{r}\,'(t) = \left(\frac{dx}{dt}, \frac{dy}{dt}, \frac{dz}{dt}\right)$$

**Tangent line:** The tangent line at a point $\vec{r}(t_0)$ passes through $\vec{r}(t_0)$ in the direction of $\vec{r}\,'(t_0)$. Its parametric form is:

$$L(\omega) = \vec{r}(t_0) + \omega\,\vec{r}\,'(t_0), \qquad \omega \in \mathbb{R}$$

### Solution

**Step 1.** Find the parameter value $t_0$ corresponding to $P(2,1,2)$.

From $\vec{r}(t) = \left(t, \frac{t^2}{4}, 2\right)$, we need:

$$t = 2, \quad \frac{t^2}{4} = 1, \quad 2 = 2$$

At $t = 2$: $x = 2$ $\checkmark$, $y = 4/4 = 1$ $\checkmark$, $z = 2$ $\checkmark$. So $t_0 = 2$.

**Step 2.** Compute the tangent vector:

$$\vec{r}\,'(t) = \left(\frac{d}{dt}(t),\; \frac{d}{dt}\!\left(\frac{t^2}{4}\right),\; \frac{d}{dt}(2)\right) = \left(1,\; \frac{t}{2},\; 0\right)$$

**Step 3.** Evaluate at $t_0 = 2$:

$$\vec{r}\,'(2) = \left(1,\; \frac{2}{2},\; 0\right) = (1, 1, 0)$$

$$\boxed{\vec{r}\,'(2) = (1, 1, 0)}$$

**Step 4.** Write the parametric equation of the tangent line at $P$:

$$L(\omega) = \vec{r}(2) + \omega\,\vec{r}\,'(2) = (2, 1, 2) + \omega(1, 1, 0)$$

$$\boxed{L(\omega) = (2 + \omega,\; 1 + \omega,\; 2), \qquad \omega \in \mathbb{R}}$$

In component form:

$$x = 2 + \omega, \qquad y = 1 + \omega, \qquad z = 2$$

The tangent line lies in the plane $z = 2$ (which makes sense since the curve has constant $z = 2$), and it passes through $(2,1,2)$ with direction $(1,1,0)$.

---

# Summary Table

| Q | Topic | Key Concept | Marks |
|---|-------|-------------|-------|
| 1 | Complex numbers | Roots of unity, $\text{Arg}$ product rule | 1 |
| 2 | Complex numbers | Principal argument in third quadrant | 1 |
| 3 | Vector calculus identity | $\nabla \cdot (\nabla \times \vec{F}) = 0$ | 1 |
| 4 | Gradient | Direction of steepest decrease = $-\nabla f$ | 1 |
| 5 | Complex locus | Perpendicular bisector / equidistant set | 1 |
| 6 | Directional derivative | Gradient $\perp$ level curves $\implies$ $D_T f = 0$ | 4 |
| 7 | Directional derivative | $D_{\hat{b}}f = \nabla f \cdot \hat{b}$, max along $\nabla f$ | 3 |
| 8 | Tangent plane | $\nabla F \cdot (\vec{X} - \vec{a}) = 0$ | 3 |
| 9 | Curl | Set $\nabla \times \vec{v} = \vec{0}$ and solve for $a$ | 3 |
| 10 | Complex limit | Path dependence $\implies$ limit DNE | 3 |
| 11 | $\varepsilon$-$\delta$ continuity | Factor, bound, choose $\delta$ | 3 |
| 12 | Scalar potential | Integrate gradient components | 2 |
| 13 | $n$th roots | De Moivre, roots on circle | 2 |
| 14 | Tangent line to curve | $\vec{r}\,'(t_0)$ and parametric line | 2 |
