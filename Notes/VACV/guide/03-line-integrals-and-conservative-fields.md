# 3. Line Integrals & Conservative Fields

---

## 3.1 Curves and Parametrizations

A **smooth curve** $C$ in $\mathbb{R}^3$ is given by a parametrization:
$$\vec{r}(t) = x(t)\hat{i} + y(t)\hat{j} + z(t)\hat{k}, \quad a \leq t \leq b$$

where $\vec{r}'(t)$ exists and is continuous, and $\vec{r}'(t) \neq \vec{0}$ for $t \in (a,b)$.

**Tangent vector:** $\vec{r}'(t) = x'(t)\hat{i} + y'(t)\hat{j} + z'(t)\hat{k}$

**Unit tangent vector:** $\hat{T} = \frac{\vec{r}'(t)}{\|\vec{r}'(t)\|}$

**Arc length element:** $ds = \|\vec{r}'(t)\|dt = \sqrt{x'(t)^2 + y'(t)^2 + z'(t)^2}\;dt$

**Arc length:** $L = \int_a^b \|\vec{r}'(t)\|dt$

---

## 3.2 Line Integral of a Scalar Field

Let $f$ be a scalar field and $C$ a smooth curve parametrized by $\vec{r}(t)$, $a \leq t \leq b$.

$$\int_C f\;ds = \int_a^b f(\vec{r}(t))\|\vec{r}'(t)\|dt$$

**Physical interpretation:** If $f(x,y,z)$ represents linear density, then $\int_C f\;ds$ gives the total mass of a wire shaped like $C$.

**Key property:** The scalar line integral does **not** depend on the orientation (direction) of $C$.

---

## 3.3 Line Integral of a Vector Field (Work Integral)

Let $\vec{F}$ be a vector field and $C$ a smooth curve from $A$ to $B$.

$$\int_C \vec{F} \cdot d\vec{r} = \int_a^b \vec{F}(\vec{r}(t)) \cdot \vec{r}'(t)\;dt$$

**Expanded form:** If $\vec{F} = P\hat{i} + Q\hat{j} + R\hat{k}$:
$$\int_C \vec{F}\cdot d\vec{r} = \int_C P\;dx + Q\;dy + R\;dz$$

**Physical interpretation:**
- If $\vec{F}$ is a force field, $\int_C \vec{F}\cdot d\vec{r}$ is the **work** done by $\vec{F}$ along $C$.
- **Circulation** of $\vec{F}$ around a closed curve $C$: $\oint_C \vec{F}\cdot d\vec{r}$

**Key property:** The vector line integral **depends on orientation**:
$$\int_{-C}\vec{F}\cdot d\vec{r} = -\int_C \vec{F}\cdot d\vec{r}$$

---

## 3.4 Conservative Vector Fields

### Definition
A vector field $\vec{F}$ is **conservative** if there exists a scalar field $f$ (called the **potential function** or **scalar potential**) such that:
$$\vec{F} = \nabla f$$

That is, $P = f_x$, $Q = f_y$, $R = f_z$.

### Equivalent Conditions (for $C^1$ fields on simply connected domains)

The following are equivalent:
1. $\vec{F}$ is conservative ($\vec{F} = \nabla f$)
2. $\oint_C \vec{F}\cdot d\vec{r} = 0$ for every closed curve $C$
3. $\int_C \vec{F}\cdot d\vec{r}$ is **path-independent** (depends only on endpoints)
4. $\nabla \times \vec{F} = \vec{0}$ ($\vec{F}$ is irrotational)

### Test for Conservative Fields

For $\vec{F} = P\hat{i} + Q\hat{j} + R\hat{k}$ with continuous first partial derivatives:

$$\vec{F} \text{ is conservative} \iff \frac{\partial P}{\partial y} = \frac{\partial Q}{\partial x}, \quad \frac{\partial P}{\partial z} = \frac{\partial R}{\partial x}, \quad \frac{\partial Q}{\partial z} = \frac{\partial R}{\partial y}$$

In 2D, for $\vec{F} = P\hat{i} + Q\hat{j}$:
$$\vec{F} \text{ is conservative} \iff \frac{\partial P}{\partial y} = \frac{\partial Q}{\partial x}$$

---

## 3.5 Finding the Potential Function

If $\vec{F} = P\hat{i} + Q\hat{j} + R\hat{k}$ is conservative, find $f$ such that $\nabla f = \vec{F}$:

**Method (Integration):**

1. Integrate $f_x = P$ with respect to $x$:
   $$f = \int P\;dx + g(y,z)$$

2. Differentiate with respect to $y$ and set equal to $Q$:
   $$f_y = \frac{\partial}{\partial y}\int P\;dx + g_y(y,z) = Q$$
   Solve for $g_y(y,z)$.

3. Integrate $g_y$ with respect to $y$:
   $$g(y,z) = \int g_y\;dy + h(z)$$

4. Differentiate with respect to $z$ and set equal to $R$:
   $$f_z = R$$
   Solve for $h'(z)$ and integrate.

5. Combine: $f(x,y,z) = \int P\;dx + \int g_y\;dy + h(z) + C$.

---

## 3.6 Fundamental Theorem for Line Integrals

> **Theorem:** If $\vec{F} = \nabla f$ is conservative and $C$ is any smooth curve from point $A$ to point $B$, then:
> $$\int_C \vec{F}\cdot d\vec{r} = f(B) - f(A)$$

**This is the line-integral analogue of the Fundamental Theorem of Calculus.** The integral depends only on the values of $f$ at the endpoints.

**Corollary:** For a closed curve ($A = B$): $\oint_C \nabla f \cdot d\vec{r} = 0$.

---

## Worked Examples

**Example 1:** Evaluate $\int_C \vec{F}\cdot d\vec{r}$ where $\vec{F} = (y^2, 2xy)$ and $C$ is the curve $y = x^2$ from $(0,0)$ to $(1,1)$.

*Solution:*
Parametrize: $x = t$, $y = t^2$, $0 \leq t \leq 1$.
$dx = dt$, $dy = 2t\;dt$.

$$\int_C y^2\;dx + 2xy\;dy = \int_0^1 (t^2)^2\;dt + 2t(t^2)(2t)\;dt = \int_0^1 (t^4 + 4t^4)\;dt$$
$$= \int_0^1 5t^4\;dt = [t^5]_0^1 = 1$$

**Verification via potential function:** Check: $P_y = 2y = Q_x = 2y$. So $\vec{F}$ is conservative.
$f_x = y^2 \implies f = xy^2 + g(y)$. $f_y = 2xy + g'(y) = 2xy \implies g'(y) = 0 \implies g = C$.
So $f = xy^2$. Then $\int_C \vec{F}\cdot d\vec{r} = f(1,1) - f(0,0) = 1 - 0 = 1$. $\checkmark$

**Example 2:** Show that $\vec{F} = (-4x-3y+4z)\hat{i} + (-3x+3y+5z)\hat{j} + (4x+5y+3z)\hat{k}$ is conservative, and find the potential function.

*Solution:*

Check: $P_y = -3 = Q_x = -3$ $\checkmark$; $P_z = 4 = R_x = 4$ $\checkmark$; $Q_z = 5 = R_y = 5$ $\checkmark$.

So $\vec{F}$ is conservative.

**Finding $f$:**

$f_x = -4x - 3y + 4z \implies f = -2x^2 - 3xy + 4xz + g(y,z)$

$f_y = -3x + g_y = -3x + 3y + 5z \implies g_y = 3y + 5z$

$g = \frac{3}{2}y^2 + 5yz + h(z)$

$f_z = 4x + 5y + h'(z) = 4x + 5y + 3z \implies h'(z) = 3z \implies h(z) = \frac{3}{2}z^2$

$$\boxed{f(x,y,z) = -2x^2 + \frac{3}{2}y^2 + \frac{3}{2}z^2 - 3xy + 4xz + 5yz + C}$$

**Example 3:** Evaluate $\int_C (2x\;dx + 3y^2\;dy)$ where $C$ is any path from $(1,0)$ to $(2,1)$.

*Solution:*
$\vec{F} = (2x, 3y^2)$. Check: $P_y = 0 = Q_x = 0$. Conservative.

$f_x = 2x \implies f = x^2 + g(y)$. $f_y = g'(y) = 3y^2 \implies g = y^3$.

$f = x^2 + y^3$.

$$\int_C \vec{F}\cdot d\vec{r} = f(2,1) - f(1,0) = (4+1) - (1+0) = 4$$

---

## Practice Problems

1. Evaluate $\int_C (x^2+y)\;dx + (x-y^2)\;dy$ where $C$ is the line segment from $(0,0)$ to $(2,4)$.

2. Determine if $\vec{F} = (ye^{xy}, xe^{xy})$ is conservative. If so, find the potential and evaluate $\int_C \vec{F}\cdot d\vec{r}$ from $(0,0)$ to $(1,1)$.

3. Evaluate $\oint_C (y\;dx - x\;dy)$ where $C$ is the unit circle traversed counterclockwise. Is this zero? Why or why not?

4. Find the work done by $\vec{F} = (2xyz, x^2z, x^2y)$ along any path from $(1,1,1)$ to $(2,3,4)$.

5. Show that $\vec{F} = (y^2z^3, 2xyz^3, 3xy^2z^2)$ is conservative and find $f$.

### Solutions

1. Parametrize: $\vec{r}(t) = (2t, 4t)$, $0 \leq t \leq 1$. $dx = 2dt$, $dy = 4dt$.
   $\int_0^1 [(4t^2+4t)(2) + (2t-16t^2)(4)]dt = \int_0^1 (8t^2+8t+8t-64t^2)dt = \int_0^1 (-56t^2+16t)dt$
   $= [-\frac{56}{3}t^3 + 8t^2]_0^1 = -\frac{56}{3} + 8 = \frac{-56+24}{3} = -\frac{32}{3}$

2. $P_y = e^{xy}+xye^{xy}$, $Q_x = e^{xy}+xye^{xy}$. Equal, so conservative.
   $f_x = ye^{xy} \implies f = e^{xy} + g(y)$. $f_y = xe^{xy} + g'(y) = xe^{xy} \implies g'(y) = 0$.
   $f = e^{xy}$. $\int_C \vec{F}\cdot d\vec{r} = e^{1\cdot1} - e^{0\cdot0} = e - 1$.

3. $P = y$, $Q = -x$. $P_y = 1 \neq Q_x = -1$. Not conservative!
   So $\oint_C \neq 0$. By Green's theorem: $\oint = \iint_D(-1-1)dA = -2\pi$.

4. Check: $P_y = 2xz = Q_x$, $P_z = 2xy = R_x$, $Q_z = x^2 = R_y$. Conservative.
   $f = x^2yz$. Work $= f(2,3,4) - f(1,1,1) = 48 - 1 = 47$.

5. $P_y = 2yz^3 = Q_x$, $P_z = 3y^2z^2 = R_x$, $Q_z = 6xyz^2 = R_y$. Conservative.
   $f = xy^2z^3 + C$.
