# 4. Divergence & Curl

---

## 4.1 Divergence of a Vector Field

### Definition

Let $\vec{F}: U \subseteq \mathbb{R}^3 \to \mathbb{R}^3$ be a differentiable vector field with $\vec{F} = P\hat{i} + Q\hat{j} + R\hat{k}$ where $P, Q, R \in C^1(U)$.

The **divergence** of $\vec{F}$ is the scalar field:

$$\boxed{\text{div}\;\vec{F} = \nabla \cdot \vec{F} = \frac{\partial P}{\partial x} + \frac{\partial Q}{\partial y} + \frac{\partial R}{\partial z}}$$

The divergence is the trace of the Jacobian matrix of $\vec{F}$.

### Symbolic Viewpoint
$\nabla$ is the "symbolic vector" $\frac{\partial}{\partial x}\hat{i} + \frac{\partial}{\partial y}\hat{j} + \frac{\partial}{\partial z}\hat{k}$, so:
$$\nabla \cdot \vec{F} = \left(\frac{\partial}{\partial x}\hat{i} + \frac{\partial}{\partial y}\hat{j} + \frac{\partial}{\partial z}\hat{k}\right)\cdot(P\hat{i} + Q\hat{j} + R\hat{k})$$

### Physical Interpretation: Fluid Flow Analogy

If $\vec{F}$ represents the velocity field of a fluid:
- **Divergence = net flux per unit volume** at a point
- If you draw a tiny box around a point, divergence measures:
  $$(\text{Rate fluid flows out}) - (\text{Rate fluid flows in})$$

---

## 4.2 Three Cases of Divergence

### Case 1: Positive Divergence ($\nabla \cdot \vec{F} > 0$) — **Source**
The field is expanding; fluid is being *created* at this point.

**Example:** $\vec{F} = x\hat{i} + y\hat{j} + z\hat{k}$ (position vector)
$$\nabla\cdot\vec{F} = 1 + 1 + 1 = 3 > 0$$
Every point acts as a source, pushing material outward.

### Case 2: Negative Divergence ($\nabla \cdot \vec{F} < 0$) — **Sink**
The field is compressing; fluid is being *absorbed* at this point.

**Example:** $\vec{F} = -x\hat{i} - y\hat{j} - z\hat{k}$
$$\nabla\cdot\vec{F} = -1 - 1 - 1 = -3 < 0$$
Every point acts as a sink.

### Case 3: Zero Divergence ($\nabla \cdot \vec{F} = 0$) — **Solenoidal**
No net creation or destruction; the field is **volume-preserving** (incompressible).

**Example:** $\vec{F} = -y\hat{i} + x\hat{j}$ (rotational/vortex field)
$$\nabla\cdot\vec{F} = 0 + 0 = 0$$
The fluid circulates but doesn't expand or compress.

> A vector field with $\nabla \cdot \vec{F} = 0$ everywhere is called **solenoidal** (or divergence-free).

---

## 4.3 The Gravitational Field has Zero Divergence

The gravitational force field $\vec{F}(\vec{r}) = -\frac{GMm}{r^2}\hat{r}$ on $\mathbb{R}^3 \setminus \{0\}$.

In Cartesian coordinates: $\vec{F} = -k\frac{x\hat{i}+y\hat{j}+z\hat{k}}{(x^2+y^2+z^2)^{3/2}}$ where $k = GMm$.

Computing $\frac{\partial F_1}{\partial x}$ where $F_1 = -kx(x^2+y^2+z^2)^{-3/2}$:
$$\frac{\partial F_1}{\partial x} = -k\left[\frac{1}{r^3} - \frac{3x^2}{r^5}\right]$$

By symmetry: $\frac{\partial F_2}{\partial y} = -k\left[\frac{1}{r^3} - \frac{3y^2}{r^5}\right]$, $\frac{\partial F_3}{\partial z} = -k\left[\frac{1}{r^3} - \frac{3z^2}{r^5}\right]$

$$\nabla\cdot\vec{F} = -k\left[\frac{3}{r^3} - \frac{3(x^2+y^2+z^2)}{r^5}\right] = -k\left[\frac{3}{r^3} - \frac{3r^2}{r^5}\right] = -k\left[\frac{3}{r^3} - \frac{3}{r^3}\right] = 0$$

**Key insight:** Despite all vectors pointing inward, $\nabla \cdot \vec{F} = 0$ for $\vec{r} \neq 0$. This is because the field magnitude increases ($\propto 1/r^2$) as you move inward while the surface area decreases ($\propto r^2$), so the net flux through any shell is constant — no accumulation.

---

## 4.4 The Laplacian

The **Laplacian** of a scalar field $f$ is:
$$\nabla^2 f = \nabla \cdot (\nabla f) = \frac{\partial^2 f}{\partial x^2} + \frac{\partial^2 f}{\partial y^2} + \frac{\partial^2 f}{\partial z^2}$$

The operator $\nabla^2 = \frac{\partial^2}{\partial x^2} + \frac{\partial^2}{\partial y^2} + \frac{\partial^2}{\partial z^2}$ is called the **Laplacian operator**.

**Connection to harmonic functions:** $f$ is **harmonic** iff $\nabla^2 f = 0$ (Laplace's equation).

The gravitational potential $f(x,y,z) = \frac{c}{r}$ satisfies $\nabla^2 f = 0$ for $r \neq 0$.

---

## 4.5 Curl of a Vector Field

### Definition

Let $\vec{F} = P\hat{i} + Q\hat{j} + R\hat{k}$ be a differentiable vector field. The **curl** of $\vec{F}$ is the vector field:

$$\boxed{\text{curl}\;\vec{F} = \nabla \times \vec{F} = \begin{vmatrix} \hat{i} & \hat{j} & \hat{k} \\ \frac{\partial}{\partial x} & \frac{\partial}{\partial y} & \frac{\partial}{\partial z} \\ P & Q & R \end{vmatrix}}$$

$$= \left(\frac{\partial R}{\partial y} - \frac{\partial Q}{\partial z}\right)\hat{i} - \left(\frac{\partial R}{\partial x} - \frac{\partial P}{\partial z}\right)\hat{j} + \left(\frac{\partial Q}{\partial x} - \frac{\partial P}{\partial y}\right)\hat{k}$$

### Physical Interpretation
- **Curl** measures the local **rotation** (or vorticity) of the vector field
- The curl vector points along the **axis of rotation** (by right-hand rule)
- The magnitude $\|\nabla \times \vec{F}\|$ measures the **intensity of rotation**

> A vector field with $\nabla \times \vec{F} = \vec{0}$ everywhere is called **irrotational**.

---

## 4.6 Key Identities

### Identity 1: Curl of a Gradient is Zero
> **Theorem:** If $f$ is a $C^2$ scalar field, then:
> $$\nabla \times (\nabla f) = \vec{0}$$

**Proof:**
$$\nabla \times (\nabla f) = \begin{vmatrix} \hat{i} & \hat{j} & \hat{k} \\ \frac{\partial}{\partial x} & \frac{\partial}{\partial y} & \frac{\partial}{\partial z} \\ f_x & f_y & f_z \end{vmatrix} = (f_{zy}-f_{yz})\hat{i} - (f_{zx}-f_{xz})\hat{j} + (f_{yx}-f_{xy})\hat{k} = \vec{0}$$

by equality of mixed partials ($f_{xy} = f_{yx}$ etc. when $f \in C^2$). $\square$

**Consequence:** Conservative fields are irrotational: $\vec{F} = \nabla f \implies \nabla \times \vec{F} = \vec{0}$.

### Identity 2: Divergence of a Curl is Zero
> **Theorem:** If $\vec{F}$ is a $C^2$ vector field, then:
> $$\nabla \cdot (\nabla \times \vec{F}) = 0$$

**Proof:**
$$\nabla \cdot (\nabla \times \vec{F}) = \frac{\partial}{\partial x}(R_y - Q_z) + \frac{\partial}{\partial y}(P_z - R_x) + \frac{\partial}{\partial z}(Q_x - P_y)$$
$$= R_{xy} - Q_{xz} + P_{yz} - R_{xy} + Q_{xz} - P_{yz} = 0$$

by equality of mixed partials. $\square$

### Summary of the Conservative-Irrotational-Solenoidal Trichotomy

For the gravitational field $\vec{F} = \nabla f$:
- **Conservative:** $\vec{F} = \nabla f$ $\checkmark$
- **Irrotational:** $\nabla \times \vec{F} = \vec{0}$ $\checkmark$
- **Solenoidal:** $\nabla \cdot \vec{F} = 0$ $\checkmark$

### Converse: Irrotational $\implies$ Conservative (on simply connected domains)

> **Theorem:** Let $\vec{F}$ be a continuously differentiable vector field on a simply connected domain. If $\nabla \times \vec{F} = \vec{0}$, then $\vec{F}$ is conservative (i.e., $\exists f$ such that $\vec{F} = \nabla f$). Proof uses Stokes' theorem.

---

## 4.7 Product Rules for Div and Curl

Assuming sufficient differentiability:

1. $\nabla(fg) = f\nabla g + g\nabla f$
2. $\nabla \cdot (f\vec{F}) = f(\nabla\cdot\vec{F}) + \vec{F}\cdot\nabla f$
3. $\nabla \times (f\vec{F}) = f(\nabla\times\vec{F}) + (\nabla f)\times\vec{F}$
4. $\text{div}(\vec{u}\times\vec{v}) = \vec{v}\cdot\text{curl}\;\vec{u} - \vec{u}\cdot\text{curl}\;\vec{v}$
5. $\nabla\left(\frac{f}{g}\right) = \frac{g\nabla f - f\nabla g}{g^2}$

---

## 4.8 The Laplacian of a Scalar Field (from Div of Grad)

If $\phi: \mathbb{R}^3 \to \mathbb{R}$ is $C^2$ and $\nabla^2\phi = 0$, then:
- $\nabla\phi$ is **solenoidal** (since $\nabla\cdot(\nabla\phi) = \nabla^2\phi = 0$)
- $\nabla\phi$ is clearly **conservative** (since it's a gradient)
- Therefore $\nabla\phi$ is also **irrotational** (since $\nabla\times(\nabla\phi) = \vec{0}$)

**Example:** The gravitational field — its potential satisfies Laplace's equation.

---

## Worked Examples

**Example 1:** Find $\text{div}\;\vec{F}$ and $\text{curl}\;\vec{F}$ at $(1,-1,1)$ for $\vec{F} = x^2z^2\hat{i} - 2y^3z^2\hat{j} + xy^2z\hat{k}$.

*Solution:*
$$\nabla\cdot\vec{F} = \frac{\partial}{\partial x}(x^2z^2) + \frac{\partial}{\partial y}(-2y^3z^2) + \frac{\partial}{\partial z}(xy^2z) = 2xz^2 - 6y^2z^2 + xy^2$$

At $(1,-1,1)$: $\nabla\cdot\vec{F} = 2(1)(1) - 6(1)(1) + 1(1) = 2 - 6 + 1 = -3$.

**Example 2:** Find div and curl of $\vec{F}(x,y) = -y\hat{i} + x\hat{j}$.

*Solution:*
$$\text{div}\;\vec{F} = \frac{\partial(-y)}{\partial x} + \frac{\partial(x)}{\partial y} = 0 + 0 = 0 \quad\text{(solenoidal)}$$

$$\text{curl}\;\vec{F} = \begin{vmatrix}\hat{i}&\hat{j}&\hat{k}\\\partial_x&\partial_y&\partial_z\\-y&x&0\end{vmatrix} = \hat{i}(0) - \hat{j}(0) + \hat{k}(1-(-1)) = 2\hat{k}$$

This is the vortex field — zero divergence (no expansion) but nonzero curl (rotation about $z$-axis).

**Example 3:** Given $\phi(x,y,z) = 6x^3y^2z$, find (a) $\nabla\phi$ and (b) div(grad $\phi$).

*Solution:*
(a) $\nabla\phi = (18x^2y^2z,\; 12x^3yz,\; 6x^3y^2)$

(b) $\nabla^2\phi = 36xy^2z + 12x^3z + 0 = 36xy^2z + 12x^3z$

Note: $\nabla^2\phi = \frac{\partial^2\phi}{\partial x^2}+\frac{\partial^2\phi}{\partial y^2}+\frac{\partial^2\phi}{\partial z^2}$.

**Example 4:** Find $a, b, c$ so that $\vec{F} = (-4x-3y+az)\hat{i} + (bx+3y+5z)\hat{j} + (4x+cy+3z)\hat{k}$ is irrotational.

*Solution:*
$\nabla\times\vec{F} = \vec{0}$ requires:
- $\hat{i}$-component: $\frac{\partial R}{\partial y} - \frac{\partial Q}{\partial z} = c - 5 = 0 \implies c = 5$
- $\hat{j}$-component: $\frac{\partial P}{\partial z} - \frac{\partial R}{\partial x} = a - 4 = 0 \implies a = 4$
- $\hat{k}$-component: $\frac{\partial Q}{\partial x} - \frac{\partial P}{\partial y} = b - (-3) = b + 3 = 0 \implies b = -3$

So $a = 4, b = -3, c = 5$.

**Example 5:** Show that $\vec{F} = (-4x-3y+4z)\hat{i} + (-3x+3y+5z)\hat{j} + (4x+5y+3z)\hat{k}$ is conservative and find the potential function $f$.

*Solution:*
Already verified $\nabla\times\vec{F} = \vec{0}$ (with $a=4, b=-3, c=5$ from above).

$f_x = -4x-3y+4z \implies f = -2x^2 - 3xy + 4xz + g(y,z)$

$f_y = -3x + g_y = -3x + 3y + 5z \implies g_y = 3y + 5z$

$g = \frac{3}{2}y^2 + 5yz + h(z)$

$f_z = 4x + 5y + h'(z) = 4x + 5y + 3z \implies h'(z) = 3z \implies h = \frac{3}{2}z^2$

$$f = -2x^2 + \frac{3}{2}y^2 + \frac{3}{2}z^2 - 3xy + 4xz + 5yz + C$$

---

## Practice Problems

1. Find $\nabla\cdot\vec{F}$ and $\nabla\times\vec{F}$ for $\vec{F} = (x^2y, yz^2, zx^2)$.

2. Verify that $\nabla\times(\nabla f) = \vec{0}$ for $f(x,y,z) = x^2y + yz^2$.

3. Verify that $\nabla\cdot(\nabla\times\vec{F}) = 0$ for $\vec{F} = (xy, yz, zx)$.

4. If $\phi: \mathbb{R}^3 \to \mathbb{R}$ is $C^2$ with $\nabla^2\phi = 0$, show that $\nabla\phi$ is both solenoidal and irrotational.

5. *(Exam-style)* Assuming sufficient differentiability, prove:
   (a) $\text{div}(\vec{u}\times\vec{v}) = \vec{v}\cdot\text{curl}\;\vec{u} - \vec{u}\cdot\text{curl}\;\vec{v}$
   (b) $\nabla(fg) = f\nabla g + g\nabla f$

### Solutions

1. $\nabla\cdot\vec{F} = 2xy + z^2 + x^2$.
   $\nabla\times\vec{F} = (0-2yz)\hat{i} - (2zx-0)\hat{j} + (0-x^2)\hat{k} = -2yz\hat{i} - 2zx\hat{j} - x^2\hat{k}$.

2. $\nabla f = (2xy, x^2+z^2, 2yz)$.
   $\nabla\times(\nabla f) = (2z-2z)\hat{i} - (0-0)\hat{j} + (2x-2x)\hat{k} = \vec{0}$. $\checkmark$

3. $\nabla\times\vec{F} = (0-y)\hat{i} - (z-0)\hat{j} + (0-x)\hat{k} = (-y,-z,-x)$.
   $\nabla\cdot(\nabla\times\vec{F}) = 0 + 0 + 0 = 0$. $\checkmark$ (None of the components depend on themselves.)

4. Solenoidal: $\nabla\cdot(\nabla\phi) = \nabla^2\phi = 0$ $\checkmark$.
   Irrotational: $\nabla\times(\nabla\phi) = \vec{0}$ by identity 1 $\checkmark$.

5. (a) Write out components: $\vec{u}\times\vec{v} = (u_2v_3-u_3v_2, u_3v_1-u_1v_3, u_1v_2-u_2v_1)$.
   Take divergence and expand using product rule. After simplification, the terms rearrange into $\vec{v}\cdot(\nabla\times\vec{u}) - \vec{u}\cdot(\nabla\times\vec{v})$.
   
   (b) $[\nabla(fg)]_i = \frac{\partial(fg)}{\partial x_i} = f\frac{\partial g}{\partial x_i} + g\frac{\partial f}{\partial x_i}$, so $\nabla(fg) = f\nabla g + g\nabla f$. $\checkmark$
