# 1. Vector Algebra & Fields

---

## 1.1 Vectors in $\mathbb{R}^n$

A **vector** in $\mathbb{R}^n$ is an ordered $n$-tuple of real numbers. We work primarily in $\mathbb{R}^2$ and $\mathbb{R}^3$.

**Notation:** $\vec{v} = (v_1, v_2, v_3) = v_1\hat{i} + v_2\hat{j} + v_3\hat{k}$

**Magnitude (length/norm):**
$$\|\vec{v}\| = \sqrt{v_1^2 + v_2^2 + v_3^2}$$

**Unit vector:** $\hat{v} = \frac{\vec{v}}{\|\vec{v}\|}$, with $\|\hat{v}\| = 1$.

**Standard basis vectors:** $\hat{i} = (1,0,0)$, $\hat{j} = (0,1,0)$, $\hat{k} = (0,0,1)$.

---

## 1.2 Vector Addition and Scalar Multiplication

For $\vec{u} = (u_1, u_2, u_3)$, $\vec{v} = (v_1, v_2, v_3)$, $c \in \mathbb{R}$:

- **Addition:** $\vec{u} + \vec{v} = (u_1+v_1,\; u_2+v_2,\; u_3+v_3)$
- **Scalar multiplication:** $c\vec{v} = (cv_1, cv_2, cv_3)$

**Properties:** Commutativity, associativity, distributivity all hold. $\vec{v} + \vec{0} = \vec{v}$, $\vec{v} + (-\vec{v}) = \vec{0}$.

---

## 1.3 Dot Product (Scalar Product)

**Definition:**
$$\vec{u} \cdot \vec{v} = u_1v_1 + u_2v_2 + u_3v_3$$

**Geometric form:**
$$\vec{u} \cdot \vec{v} = \|\vec{u}\|\|\vec{v}\|\cos\theta$$
where $\theta \in [0, \pi]$ is the angle between $\vec{u}$ and $\vec{v}$.

**Key Properties:**
1. $\vec{u} \cdot \vec{v} = \vec{v} \cdot \vec{u}$ (commutative)
2. $\vec{u} \cdot (\vec{v} + \vec{w}) = \vec{u}\cdot\vec{v} + \vec{u}\cdot\vec{w}$ (distributive)
3. $(c\vec{u}) \cdot \vec{v} = c(\vec{u} \cdot \vec{v})$
4. $\vec{v} \cdot \vec{v} = \|\vec{v}\|^2 \geq 0$, with equality iff $\vec{v} = \vec{0}$
5. $\hat{i}\cdot\hat{i} = \hat{j}\cdot\hat{j} = \hat{k}\cdot\hat{k} = 1$; $\hat{i}\cdot\hat{j} = \hat{j}\cdot\hat{k} = \hat{k}\cdot\hat{i} = 0$

**Orthogonality:** $\vec{u} \perp \vec{v} \iff \vec{u} \cdot \vec{v} = 0$.

**Angle between vectors:**
$$\cos\theta = \frac{\vec{u} \cdot \vec{v}}{\|\vec{u}\|\|\vec{v}\|}$$

### Cauchy-Schwarz Inequality
$$|\vec{u} \cdot \vec{v}| \leq \|\vec{u}\|\|\vec{v}\|$$

### Triangle Inequality
$$\|\vec{u} + \vec{v}\| \leq \|\vec{u}\| + \|\vec{v}\|$$

---

## 1.4 Projection

**Scalar projection** of $\vec{v}$ onto $\vec{u}$:
$$\text{comp}_{\vec{u}}\vec{v} = \frac{\vec{u} \cdot \vec{v}}{\|\vec{u}\|}$$

**Vector projection** of $\vec{v}$ onto $\vec{u}$:
$$\text{proj}_{\vec{u}}\vec{v} = \frac{\vec{u} \cdot \vec{v}}{\|\vec{u}\|^2}\vec{u} = \frac{\vec{u} \cdot \vec{v}}{\vec{u}\cdot\vec{u}}\vec{u}$$

**Projection along a direction $\hat{a}$:**
$$\text{proj}_{\hat{a}}\vec{v} = (\vec{v} \cdot \hat{a})\hat{a}$$

---

## 1.5 Cross Product (Vector Product)

**Definition** (for $\vec{u}, \vec{v} \in \mathbb{R}^3$):
$$\vec{u} \times \vec{v} = \begin{vmatrix} \hat{i} & \hat{j} & \hat{k} \\ u_1 & u_2 & u_3 \\ v_1 & v_2 & v_3 \end{vmatrix}$$

$$= (u_2v_3 - u_3v_2)\hat{i} - (u_1v_3 - u_3v_1)\hat{j} + (u_1v_2 - u_2v_1)\hat{k}$$

**Geometric interpretation:**
$$\|\vec{u} \times \vec{v}\| = \|\vec{u}\|\|\vec{v}\|\sin\theta$$

- Direction: perpendicular to both $\vec{u}$ and $\vec{v}$ (right-hand rule)
- Magnitude: area of the parallelogram spanned by $\vec{u}$ and $\vec{v}$

**Key Properties:**
1. $\vec{u} \times \vec{v} = -(\vec{v} \times \vec{u})$ (anti-commutative)
2. $\vec{u} \times (\vec{v} + \vec{w}) = \vec{u}\times\vec{v} + \vec{u}\times\vec{w}$
3. $(c\vec{u}) \times \vec{v} = c(\vec{u} \times \vec{v})$
4. $\vec{u} \times \vec{u} = \vec{0}$
5. $\vec{u} \times \vec{v} = \vec{0} \iff \vec{u} \parallel \vec{v}$ (or one is zero)
6. $\hat{i}\times\hat{j} = \hat{k}$, $\hat{j}\times\hat{k} = \hat{i}$, $\hat{k}\times\hat{i} = \hat{j}$

---

## 1.6 Scalar Triple Product

$$[\vec{u}, \vec{v}, \vec{w}] = \vec{u} \cdot (\vec{v} \times \vec{w}) = \begin{vmatrix} u_1 & u_2 & u_3 \\ v_1 & v_2 & v_3 \\ w_1 & w_2 & w_3 \end{vmatrix}$$

**Geometric interpretation:** $|[\vec{u}, \vec{v}, \vec{w}]|$ = volume of the parallelepiped formed by the three vectors.

**Key fact:** $[\vec{u}, \vec{v}, \vec{w}] = 0 \iff$ the three vectors are coplanar.

**Cyclic property:** $\vec{u}\cdot(\vec{v}\times\vec{w}) = \vec{v}\cdot(\vec{w}\times\vec{u}) = \vec{w}\cdot(\vec{u}\times\vec{v})$

---

## 1.7 Scalar Fields and Vector Fields

### Scalar Field
A **scalar field** is a function $f: D \subseteq \mathbb{R}^n \to \mathbb{R}$ that assigns a real number to each point.

**Examples:**
- Temperature distribution: $T(x,y,z)$
- Pressure field: $p(x,y,z)$
- Gravitational potential: $\phi(x,y,z)$

### Vector Field
A **vector field** is a function $\vec{F}: D \subseteq \mathbb{R}^n \to \mathbb{R}^n$ that assigns a vector to each point.

In $\mathbb{R}^3$: $\vec{F}(x,y,z) = P(x,y,z)\hat{i} + Q(x,y,z)\hat{j} + R(x,y,z)\hat{k}$

**Examples:**
- Velocity field of a fluid
- Gravitational force field: $\vec{F} = -\frac{GMm}{r^2}\hat{r}$
- Electric field
- Normal vector field on a surface
- Tangent vector field of a curve $\vec{r}'(t)$

### Types of Vector Fields
- **Conservative:** $\vec{F} = \nabla f$ for some scalar field $f$ (called the **potential function**)
- **Solenoidal:** $\nabla \cdot \vec{F} = 0$ (divergence-free)
- **Irrotational:** $\nabla \times \vec{F} = \vec{0}$ (curl-free)

---

## 1.8 Partial Derivatives of Scalar Fields

Let $f: \mathbb{R}^2 \to \mathbb{R}$.

**Partial derivative with respect to $x$:**
$$f_x(x_1, y_1) = \frac{\partial f}{\partial x}(x_1, y_1) = \lim_{h\to 0} \frac{f(x_1+h, y_1) - f(x_1, y_1)}{h}$$

**Partial derivative with respect to $y$:**
$$f_y(x_1, y_1) = \frac{\partial f}{\partial y}(x_1, y_1) = \lim_{k\to 0} \frac{f(x_1, y_1+k) - f(x_1, y_1)}{k}$$

**Geometric interpretation:** $f_x$ gives the slope of the tangent to the curve formed by intersecting the surface $z = f(x,y)$ with the plane $y = y_1$. Similarly for $f_y$.

The partial derivatives $f_x$ and $f_y$ are themselves functions of $x$ and $y$.

---

## 1.9 Differentiability of Scalar Fields

**Differentiability** of $f: \mathbb{R}^n \to \mathbb{R}$ at a point $P$ means all partial derivatives exist and are continuous at $P$.

**Total differential:**
$$df = \frac{\partial f}{\partial x}dx + \frac{\partial f}{\partial y}dy + \frac{\partial f}{\partial z}dz$$

---

## Worked Examples

**Example 1:** Find the angle between $\vec{u} = (1, 2, 3)$ and $\vec{v} = (2, -1, 1)$.

*Solution:*
$$\vec{u} \cdot \vec{v} = (1)(2) + (2)(-1) + (3)(1) = 2 - 2 + 3 = 3$$
$$\|\vec{u}\| = \sqrt{1+4+9} = \sqrt{14}, \quad \|\vec{v}\| = \sqrt{4+1+1} = \sqrt{6}$$
$$\cos\theta = \frac{3}{\sqrt{14}\sqrt{6}} = \frac{3}{\sqrt{84}} = \frac{3}{2\sqrt{21}}$$
$$\theta = \cos^{-1}\!\left(\frac{3}{2\sqrt{21}}\right)$$

**Example 2:** Find $\vec{u} \times \vec{v}$ for $\vec{u} = (1, 2, 3)$, $\vec{v} = (2, -1, 1)$.

*Solution:*
$$\vec{u} \times \vec{v} = \begin{vmatrix} \hat{i} & \hat{j} & \hat{k} \\ 1 & 2 & 3 \\ 2 & -1 & 1 \end{vmatrix} = \hat{i}(2\cdot1 - 3\cdot(-1)) - \hat{j}(1\cdot1 - 3\cdot2) + \hat{k}(1\cdot(-1) - 2\cdot2)$$
$$= 5\hat{i} + 5\hat{j} - 5\hat{k} = (5, 5, -5)$$

Area of parallelogram $= \|\vec{u}\times\vec{v}\| = \sqrt{25+25+25} = 5\sqrt{3}$.

**Example 3:** Find the scalar triple product $[\vec{u}, \vec{v}, \vec{w}]$ for $\vec{u}=(1,0,1)$, $\vec{v}=(0,1,1)$, $\vec{w}=(1,1,0)$.

*Solution:*
$$[\vec{u}, \vec{v}, \vec{w}] = \begin{vmatrix} 1 & 0 & 1 \\ 0 & 1 & 1 \\ 1 & 1 & 0 \end{vmatrix} = 1(0-1) - 0(0-1) + 1(0-1) = -1 + 0 - 1 = -2$$

Volume of parallelepiped $= |{-2}| = 2$.

---

## Practice Problems

1. Given $\vec{a} = 3\hat{i} - 2\hat{j} + \hat{k}$ and $\vec{b} = \hat{i} + 4\hat{j} - 2\hat{k}$, find:
   (a) $\vec{a} \cdot \vec{b}$
   (b) The angle between $\vec{a}$ and $\vec{b}$
   (c) $\vec{a} \times \vec{b}$
   (d) $\text{proj}_{\vec{b}}\vec{a}$

2. Show that $\vec{u} = \hat{i} + \hat{j}$, $\vec{v} = \hat{i} - \hat{j}$ are orthogonal.

3. Find a unit vector perpendicular to both $\vec{a} = (1, 2, -1)$ and $\vec{b} = (3, 0, 1)$.

4. Determine whether the vectors $\vec{u} = (1, 2, 3)$, $\vec{v} = (4, 5, 6)$, $\vec{w} = (7, 8, 9)$ are coplanar.

5. If $f(x,y,z) = x^2y + yz^3$, find $\frac{\partial f}{\partial x}$, $\frac{\partial f}{\partial y}$, and $\frac{\partial f}{\partial z}$.

### Solutions

1. (a) $\vec{a}\cdot\vec{b} = 3(1) + (-2)(4) + 1(-2) = 3 - 8 - 2 = -7$
   (b) $\|\vec{a}\| = \sqrt{14}$, $\|\vec{b}\| = \sqrt{21}$, $\cos\theta = \frac{-7}{\sqrt{14}\sqrt{21}} = \frac{-7}{\sqrt{294}} = \frac{-7}{7\sqrt{6}} = \frac{-1}{\sqrt{6}}$, so $\theta = \cos^{-1}(-1/\sqrt{6})$
   (c) $\vec{a}\times\vec{b} = \begin{vmatrix}\hat{i}&\hat{j}&\hat{k}\\3&-2&1\\1&4&-2\end{vmatrix} = (4-4)\hat{i} - (-6-1)\hat{j} + (12+2)\hat{k} = 0\hat{i} + 7\hat{j} + 14\hat{k}$
   (d) $\text{proj}_{\vec{b}}\vec{a} = \frac{-7}{21}\vec{b} = -\frac{1}{3}(\hat{i}+4\hat{j}-2\hat{k})$

2. $\vec{u}\cdot\vec{v} = 1(1) + 1(-1) = 0$. Since dot product is zero, they are orthogonal. $\checkmark$

3. $\vec{a}\times\vec{b} = \begin{vmatrix}\hat{i}&\hat{j}&\hat{k}\\1&2&-1\\3&0&1\end{vmatrix} = (2-0)\hat{i}-(1+3)\hat{j}+(0-6)\hat{k} = 2\hat{i}-4\hat{j}-6\hat{k}$
   $\|\vec{a}\times\vec{b}\| = \sqrt{4+16+36} = \sqrt{56} = 2\sqrt{14}$
   Unit vector: $\hat{n} = \frac{1}{2\sqrt{14}}(2\hat{i}-4\hat{j}-6\hat{k}) = \frac{1}{\sqrt{14}}(\hat{i}-2\hat{j}-3\hat{k})$

4. $[\vec{u},\vec{v},\vec{w}] = \begin{vmatrix}1&2&3\\4&5&6\\7&8&9\end{vmatrix} = 1(45-48)-2(36-42)+3(32-35) = -3+12-9 = 0$. Since the scalar triple product is zero, they are coplanar. $\checkmark$

5. $f_x = 2xy$, $f_y = x^2 + z^3$, $f_z = 3yz^2$.
