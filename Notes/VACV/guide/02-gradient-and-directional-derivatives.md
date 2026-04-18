# 2. Gradient, Directional Derivatives & Level Surfaces

---

## 2.1 The Gradient of a Scalar Field

Let $f: \mathbb{R}^3 \to \mathbb{R}$ be a differentiable scalar field. The **gradient** of $f$ is the vector field:

$$\nabla f = \text{grad } f = \frac{\partial f}{\partial x}\hat{i} + \frac{\partial f}{\partial y}\hat{j} + \frac{\partial f}{\partial z}\hat{k}$$

In $\mathbb{R}^2$: $\nabla f = \frac{\partial f}{\partial x}\hat{i} + \frac{\partial f}{\partial y}\hat{j}$

### The Del Operator
The **nabla** (or **del**) operator is defined as:
$$\nabla = \frac{\partial}{\partial x}\hat{i} + \frac{\partial}{\partial y}\hat{j} + \frac{\partial}{\partial z}\hat{k}$$

Think of it as a "symbolic vector" that acts on scalar fields to produce vector fields.

### Physical Meaning of the Gradient
1. **Direction:** $\nabla f$ points in the direction of the **steepest increase** of $f$
2. **Magnitude:** $\|\nabla f\|$ gives the **rate of steepest increase**
3. $-\nabla f$ points in the direction of steepest *decrease*
4. $\nabla f$ is **perpendicular to level curves/surfaces** of $f$

### Uses of Gradient
- Finding the rate of change of scalar fields in any direction
- Determining normal vectors to surfaces
- Identifying conservative vector fields ($\vec{F} = \nabla f$)

---

## 2.2 Directional Derivative

The **directional derivative** of $f$ at point $P$ in the direction of unit vector $\hat{u}$ measures the rate of change of $f$ along $\hat{u}$.

### Definition

$$D_{\hat{u}}f(P) = \lim_{t\to 0} \frac{f(P + t\hat{u}) - f(P)}{t}$$

### Computation Formula (Key Result)

If $f$ is differentiable at $P$:

$$\boxed{D_{\hat{u}}f = \nabla f \cdot \hat{u}}$$

For $\hat{u} = (\cos\alpha, \cos\beta, \cos\gamma)$ (direction cosines):
$$D_{\hat{u}}f = f_x\cos\alpha + f_y\cos\beta + f_z\cos\gamma$$

### Important: $\hat{u}$ must be a UNIT vector!

If given a direction $\vec{v}$ (not unit), first normalize: $\hat{u} = \frac{\vec{v}}{\|\vec{v}\|}$.

### Properties of Directional Derivatives

1. **Maximum value:** $D_{\hat{u}}f$ is maximum when $\hat{u}$ is in the direction of $\nabla f$
   $$\max D_{\hat{u}}f = \|\nabla f\|$$
   
2. **Minimum value:** $D_{\hat{u}}f$ is minimum when $\hat{u}$ is opposite to $\nabla f$
   $$\min D_{\hat{u}}f = -\|\nabla f\|$$

3. **Zero directional derivative:** $D_{\hat{u}}f = 0$ when $\hat{u} \perp \nabla f$ (i.e., along a level curve/surface)

4. **Special cases:**
   - $D_{\hat{i}}f = f_x$ (directional derivative along $x$-axis)
   - $D_{\hat{j}}f = f_y$ (directional derivative along $y$-axis)
   - $D_{\hat{k}}f = f_z$ (directional derivative along $z$-axis)

---

## 2.3 Directional Derivative Along a Curve

Let $C$ be a smooth curve with parametrization $\vec{r}(t)$ and let $f$ be differentiable along $C$.

The directional derivative of $f$ along $C$ at $\vec{r}(t_0)$ is:

$$D_{\hat{T}}f = \nabla f \cdot \hat{T}$$

where $\hat{T} = \frac{\vec{r}'(t)}{\|\vec{r}'(t)\|}$ is the unit tangent vector to $C$.

**Note:** This can also be written as:
$$\frac{df}{ds} = \nabla f \cdot \hat{T}$$
where $s$ is the arc length parameter.

Alternatively, without normalizing:
$$\frac{d}{dt}f(\vec{r}(t)) = \nabla f \cdot \vec{r}'(t)$$
(This is the chain rule — gives rate of change with respect to $t$, not arc length.)

---

## 2.4 Level Curves and Level Surfaces

### Level Curves ($\mathbb{R}^2$)
For $f: \mathbb{R}^2 \to \mathbb{R}$, the **level curve** at value $c$ is:
$$\{(x,y) : f(x,y) = c\}$$

### Level Surfaces ($\mathbb{R}^3$)
For $f: \mathbb{R}^3 \to \mathbb{R}$, the **level surface** at value $c$ is:
$$\{(x,y,z) : f(x,y,z) = c\}$$

### Key Property
> **$\nabla f$ is perpendicular to the level curves/surfaces of $f$ at every point.**

This follows from: if $\vec{r}(t)$ lies on a level surface $f = c$, then $f(\vec{r}(t)) = c$, so:
$$\frac{d}{dt}f(\vec{r}(t)) = \nabla f \cdot \vec{r}'(t) = 0$$

Therefore $\nabla f \perp \vec{r}'(t)$ for every tangent vector to the level surface.

### Normal Vector to a Surface
If a surface is given implicitly by $f(x,y,z) = c$, then:
$$\vec{n} = \nabla f$$
is a normal vector to the surface at any point.

### Tangent Plane
The tangent plane to the surface $f(x,y,z) = c$ at point $(x_0, y_0, z_0)$ is:

$$f_x(P)(x-x_0) + f_y(P)(y-y_0) + f_z(P)(z-z_0) = 0$$

or equivalently: $\nabla f(P) \cdot (\vec{r} - \vec{r}_0) = 0$.

---

## 2.5 Tangent Planes to Parametric Surfaces

Let a surface be given by $\vec{r}(u,v) = x(u,v)\hat{i} + y(u,v)\hat{j} + z(u,v)\hat{k}$.

The **tangent vectors** at a point are $\vec{r}_u$ and $\vec{r}_v$.

The **normal vector** is:
$$\vec{n} = \vec{r}_u \times \vec{r}_v$$

The **tangent plane** passes through the point and is spanned by $\vec{r}_u$ and $\vec{r}_v$.

### Theorem (Tangent Plane)
If $S$ is a smooth surface and $\vec{r}(u_0, v_0)$ is a point on $S$, then the tangent plane to $S$ at this point consists of all vectors:
$$\vec{r}(u_0,v_0) + s\vec{r}_u(u_0,v_0) + t\vec{r}_v(u_0,v_0), \quad s,t \in \mathbb{R}$$

---

## Worked Examples

**Example 1:** Given $f(x,y,z) = x^2 + y^2 + z^2$, find $\nabla f$ and the directional derivative at $(1, 2, 3)$ in the direction of $\vec{v} = (1, 1, 1)$.

*Solution:*
$$\nabla f = 2x\hat{i} + 2y\hat{j} + 2z\hat{k}$$
At $(1,2,3)$: $\nabla f = 2\hat{i} + 4\hat{j} + 6\hat{k}$

Unit vector: $\hat{u} = \frac{(1,1,1)}{\sqrt{3}} = \left(\frac{1}{\sqrt{3}}, \frac{1}{\sqrt{3}}, \frac{1}{\sqrt{3}}\right)$

$$D_{\hat{u}}f = \nabla f \cdot \hat{u} = \frac{2}{\sqrt{3}} + \frac{4}{\sqrt{3}} + \frac{6}{\sqrt{3}} = \frac{12}{\sqrt{3}} = 4\sqrt{3}$$

**Example 2:** Given $\phi(x,y,z) = 6x^3y^2z$, find (a) $\nabla\phi$ and (b) $\nabla\cdot(\nabla\phi)$.

*Solution:*
(a) $\nabla\phi = \left(\frac{\partial\phi}{\partial x}, \frac{\partial\phi}{\partial y}, \frac{\partial\phi}{\partial z}\right) = (18x^2y^2z,\; 12x^3yz,\; 6x^3y^2)$

(b) $\nabla\cdot(\nabla\phi) = \nabla^2\phi = \frac{\partial^2\phi}{\partial x^2} + \frac{\partial^2\phi}{\partial y^2} + \frac{\partial^2\phi}{\partial z^2} = 36xy^2z + 12x^3z + 0 = 36xy^2z + 12x^3z$

**Example 3:** Consider the scalar field $f(x,y) = x^2 + 4y^2$. Find the directional derivative at $(1, 1)$ in the direction making angle $\pi/6$ with the positive $x$-axis.

*Solution:*
$\nabla f = (2x, 8y)$. At $(1,1)$: $\nabla f = (2, 8)$.

Direction: $\hat{u} = (\cos(\pi/6), \sin(\pi/6)) = (\frac{\sqrt{3}}{2}, \frac{1}{2})$

$$D_{\hat{u}}f = 2\cdot\frac{\sqrt{3}}{2} + 8\cdot\frac{1}{2} = \sqrt{3} + 4$$

**Example 4:** Find the maximum rate of change of $f(x,y,z) = x^2 + y^2 + z^2$ at $(1,2,3)$ and the direction in which it occurs.

*Solution:*
$\nabla f(1,2,3) = (2, 4, 6)$

Maximum rate of change $= \|\nabla f\| = \sqrt{4+16+36} = \sqrt{56} = 2\sqrt{14}$

Direction: $\hat{u} = \frac{(2,4,6)}{2\sqrt{14}} = \frac{1}{\sqrt{14}}(1, 2, 3)$

**Example 5:** Find the equation of the tangent plane to the surface $x^2 + y^2 + z^2 = 14$ at $(1, 2, 3)$.

*Solution:*
$f(x,y,z) = x^2 + y^2 + z^2$, so $\nabla f = (2x, 2y, 2z)$.
At $(1,2,3)$: $\nabla f = (2, 4, 6)$.

Tangent plane: $2(x-1) + 4(y-2) + 6(z-3) = 0$
$$2x + 4y + 6z = 28 \quad \Longrightarrow \quad x + 2y + 3z = 14$$

**Example 6:** Let $f(x,y,z) = xy + yz + xz$. Find the directional derivative at $(1, -1, 3)$ along the curve $\vec{r}(t) = (t, 1-2t, 3t)$ (which passes through the point at $t = 1$).

*Solution:*
$\nabla f = (y+z, x+z, y+x)$. At $(1,-1,3)$: $\nabla f = (2, 4, 0)$.

$\vec{r}'(t) = (1, -2, 3)$, so $\hat{T} = \frac{(1,-2,3)}{\sqrt{14}}$.

$$D_{\hat{T}}f = (2,4,0)\cdot\frac{(1,-2,3)}{\sqrt{14}} = \frac{2-8+0}{\sqrt{14}} = \frac{-6}{\sqrt{14}}$$

The function is *decreasing* along the curve at this point.

---

## Practice Problems

1. Find $\nabla f$ for $f(x,y,z) = e^x\sin y + z^2$.

2. Find the directional derivative of $f(x,y) = x^2 - 3xy + y^2$ at $(1,2)$ in the direction of $\vec{v} = (3,4)$.

3. Find the direction in which $f(x,y,z) = x^2 + 2y^2 - z$ increases most rapidly at $(1, 1, 4)$. What is the maximum rate of increase?

4. Find the tangent plane and normal line to $x^2 + 2y^2 + 3z^2 = 6$ at $(1, 1, 1)$.

5. At what points on the ellipsoid $x^2 + 4y^2 + 9z^2 = 36$ is the tangent plane parallel to the $xy$-plane?

6. Find the directional derivative of $f(x,y,z) = x^2yz$ at $(2, 1, 3)$ in the direction from $(2,1,3)$ to $(4,3,1)$.

### Solutions

1. $\nabla f = (e^x\sin y,\; e^x\cos y,\; 2z)$

2. $\nabla f = (2x-3y, -3x+2y) = (2-6, -3+4) = (-4, 1)$ at $(1,2)$.
   $\hat{u} = \frac{(3,4)}{5}$. $D_{\hat{u}}f = \frac{(-4)(3)+(1)(4)}{5} = \frac{-8}{5}$.

3. $\nabla f = (2x, 4y, -1)$. At $(1,1,4)$: $\nabla f = (2, 4, -1)$.
   Direction: $\hat{u} = \frac{(2,4,-1)}{\sqrt{21}}$.
   Max rate $= \|\nabla f\| = \sqrt{4+16+1} = \sqrt{21}$.

4. $\nabla f = (2x, 4y, 6z)$. At $(1,1,1)$: $\nabla f = (2, 4, 6)$.
   Tangent plane: $2(x-1)+4(y-1)+6(z-1)=0 \implies x+2y+3z=6$.
   Normal line: $\frac{x-1}{2} = \frac{y-1}{4} = \frac{z-1}{6}$, or $\vec{r}(t) = (1+2t, 1+4t, 1+6t)$.

5. Tangent plane parallel to $xy$-plane means $\nabla f = (2x, 8y, 18z)$ is parallel to $\hat{k}$. So $2x = 0, 8y = 0 \implies x = 0, y = 0$. Then $9z^2 = 36 \implies z = \pm 2$. Points: $(0, 0, \pm 2)$.

6. Direction: $\vec{v} = (4-2, 3-1, 1-3) = (2, 2, -2)$, $\hat{u} = \frac{(2,2,-2)}{2\sqrt{3}} = \frac{1}{\sqrt{3}}(1,1,-1)$.
   $\nabla f = (2xyz, x^2z, x^2y) = (12, 12, 4)$ at $(2,1,3)$.
   $D_{\hat{u}}f = \frac{12+12-4}{\sqrt{3}} = \frac{20}{\sqrt{3}} = \frac{20\sqrt{3}}{3}$.
