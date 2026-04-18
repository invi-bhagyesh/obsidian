# 9. Analytic Functions & Cauchy-Riemann Equations

---

## 9.1 Complex Functions

A **function of a complex variable** is a rule $f: D \to \mathbb{C}$ where $D \subseteq \mathbb{C}$.

Writing $z = x+iy$ and $w = f(z) = u(x,y) + iv(x,y)$:
- $u(x,y) = \text{Re}\,f(z)$
- $v(x,y) = \text{Im}\,f(z)$

Every complex function is equivalent to a pair of real-valued functions $u$ and $v$.

**Example:** $f(z) = z^2 = (x+iy)^2 = (x^2-y^2) + i(2xy)$, so $u = x^2-y^2$, $v = 2xy$.

---

## 9.2 Limits of Complex Functions

### Definition
$$\lim_{z\to z_0}f(z) = w_0$$

means: for every $\varepsilon > 0$, there exists $\delta > 0$ such that
$$|f(z)-w_0| < \varepsilon \quad\text{whenever}\quad 0 < |z-z_0| < \delta$$

**Key difference from real limits:** $z$ may approach $z_0$ from **any direction** in the plane. The limit must be the same regardless of the path of approach.

### Component-wise Theorem
> **Theorem.** $\lim_{z\to z_0}f(z) = w_0$ if and only if
> $$\lim_{(x,y)\to(x_0,y_0)}u(x,y) = u_0 \quad\text{and}\quad \lim_{(x,y)\to(x_0,y_0)}v(x,y) = v_0$$
> where $z_0 = x_0+iy_0$ and $w_0 = u_0+iv_0$.

### Limit Algebra
If $\lim_{z\to z_0}f(z) = w_0$ and $\lim_{z\to z_0}F(z) = W_0$, then:
- $\lim_{z\to z_0}[f(z)+F(z)] = w_0 + W_0$
- $\lim_{z\to z_0}[f(z)F(z)] = w_0 W_0$
- $\lim_{z\to z_0}\frac{f(z)}{F(z)} = \frac{w_0}{W_0}$ (if $W_0 \neq 0$)

**Example showing a limit does not exist:** $f(z) = z/\bar{z}$. As $z \to 0$:
- Along real axis ($z = x$): $f(z) = x/x = 1$
- Along imaginary axis ($z = iy$): $f(z) = iy/(-iy) = -1$

Different limits $\implies$ limit does not exist.

---

## 9.3 Continuity

$f$ is **continuous** at $z_0$ if:
1. $\lim_{z\to z_0}f(z)$ exists
2. $f(z_0)$ exists
3. $\lim_{z\to z_0}f(z) = f(z_0)$

Equivalently: $|f(z)-f(z_0)| < \varepsilon$ whenever $|z-z_0| < \delta$.

**Properties:**
- Sum, product, quotient (denominator $\neq 0$) of continuous functions are continuous
- Composition of continuous functions is continuous
- Polynomials are continuous everywhere
- $f = u+iv$ is continuous iff $u$ and $v$ are continuous

> **Theorem (Extreme Value).** If $f$ is continuous on a closed, bounded region $R$, then $|f(z)| \leq M$ for some $M \geq 0$, with equality for at least one $z \in R$.

---

## 9.4 Complex Derivative

### Definition
The **derivative** of $f$ at $z_0$ is:

$$f'(z_0) = \lim_{\Delta z \to 0}\frac{f(z_0+\Delta z)-f(z_0)}{\Delta z}$$

provided this limit exists. Then $f$ is **differentiable** at $z_0$.

**Critical point:** $\Delta z = \Delta x + i\Delta y$ can approach $0$ from **any direction**. This is much more restrictive than real differentiability.

### Differentiation Rules
All standard rules hold (identical to real calculus):

| Rule | Formula |
|------|---------|
| Constant | $\frac{d}{dz}c = 0$ |
| Identity | $\frac{d}{dz}z = 1$ |
| Power | $\frac{d}{dz}z^n = nz^{n-1}$ (integer $n$) |
| Linearity | $(cf)' = cf'$ |
| Sum | $(f+g)' = f'+g'$ |
| Product | $(fg)' = fg'+f'g$ |
| Quotient | $(f/g)' = (gf'-fg')/g^2$ |
| Chain | $\frac{d}{dz}g(f(z)) = g'(f(z))\cdot f'(z)$ |

### Key Examples

**$f(z) = z^2$:** $f'(z) = 2z$ (differentiable everywhere).

**$f(z) = \bar{z}$:** $\frac{\Delta w}{\Delta z} = \frac{\overline{\Delta z}}{\Delta z}$. Along real axis: $= 1$. Along imaginary axis: $= -1$. Derivative does not exist anywhere.

**$f(z) = |z|^2$:** $\frac{\Delta w}{\Delta z} = \bar{z} + \overline{\Delta z} + z\frac{\overline{\Delta z}}{\Delta z}$. The limit exists **only at $z = 0$** (where $f'(0) = 0$). Differentiable at one point but nowhere else!

**Lesson:** Differentiability in $\mathbb{C}$ is much more restrictive than in $\mathbb{R}$. Continuous partial derivatives of $u$ and $v$ do NOT guarantee complex differentiability.

> **Theorem.** If $f'(z_0)$ exists, then $f$ is continuous at $z_0$. (Converse is false.)

---

## 9.5 The Cauchy-Riemann Equations

### Necessary Condition

> **Theorem (Cauchy-Riemann, Necessary).** Suppose $f(z) = u(x,y)+iv(x,y)$ and $f'(z_0)$ exists at $z_0 = x_0+iy_0$. Then:
>
> 1. The first-order partial derivatives of $u$ and $v$ exist at $(x_0,y_0)$
> 2. They satisfy the **Cauchy-Riemann (C-R) equations:**
>
> $$\boxed{u_x = v_y, \qquad u_y = -v_x}$$
>
> 3. The derivative can be expressed as:
> $$f'(z_0) = u_x + iv_x = v_y - iu_y$$

### Proof (Key Argument)

Since $f'(z_0) = \lim_{\Delta z\to 0}\frac{\Delta w}{\Delta z}$ exists, the limit must be the same along all directions.

**Along the real axis** ($\Delta z = \Delta x$, $\Delta y = 0$):
$$f'(z_0) = \lim_{\Delta x\to 0}\frac{u(x_0+\Delta x,y_0)-u(x_0,y_0)}{\Delta x} + i\lim_{\Delta x\to 0}\frac{v(x_0+\Delta x,y_0)-v(x_0,y_0)}{\Delta x}$$
$$= u_x(x_0,y_0) + iv_x(x_0,y_0)$$

**Along the imaginary axis** ($\Delta z = i\Delta y$, $\Delta x = 0$):
$$f'(z_0) = \lim_{\Delta y\to 0}\frac{u(x_0,y_0+\Delta y)-u(x_0,y_0)}{i\Delta y} + i\lim_{\Delta y\to 0}\frac{v(x_0,y_0+\Delta y)-v(x_0,y_0)}{i\Delta y}$$
$$= \frac{u_y}{i} + \frac{iv_y}{i} = -iu_y + v_y = v_y - iu_y$$

Equating real and imaginary parts:
$$u_x = v_y, \qquad v_x = -u_y \qquad\blacksquare$$

### Warning: C-R Equations are Necessary but NOT Sufficient

**Counterexample:** $f(z) = \begin{cases}\frac{(\bar{z})^2}{z} & z\neq 0 \\ 0 & z=0\end{cases}$

Let $u(x,y) = \frac{x^3-3xy^2}{x^2+y^2}$ and $v(x,y) = \frac{y^3-3x^2y}{x^2+y^2}$ for $(x,y)\neq(0,0)$.

At the origin: $u_x(0,0) = 1 = v_y(0,0)$ and $u_y(0,0) = 0 = -v_x(0,0)$. So C-R equations are satisfied at $(0,0)$.

But: along $y = x$, $\frac{f(\Delta z)-f(0)}{\Delta z} = \frac{\overline{\Delta z}^2}{(\Delta z)^2} = \frac{(\Delta x - i\Delta x)^2}{(\Delta x+i\Delta x)^2} = \frac{(1-i)^2}{(1+i)^2} = -1$.

Along the real axis: limit $= 1$.

Different limits $\implies f'(0)$ does not exist, despite C-R being satisfied.

**The issue:** $u_x$ is not continuous at $(0,0)$.

---

## 9.6 Sufficient Conditions for Differentiability

> **Theorem (C-R Sufficient).** Let $f(z) = u(x,y)+iv(x,y)$ be defined in an $\varepsilon$-neighborhood of $z_0 = x_0+iy_0$. Suppose:
>
> (a) $u_x, u_y, v_x, v_y$ exist **everywhere** in the neighborhood
>
> (b) These four partial derivatives are **continuous** at $(x_0,y_0)$
>
> (c) $u$ and $v$ satisfy the C-R equations at $(x_0,y_0)$: $u_x = v_y$, $u_y = -v_x$
>
> Then $f'(z_0)$ exists, and $f'(z_0) = u_x + iv_x\big|_{(x_0,y_0)}$.

**In practice:** To show $f$ is differentiable:
1. Find $u$ and $v$
2. Compute $u_x, u_y, v_x, v_y$
3. Verify C-R equations
4. Verify continuity of the partials
5. If all hold, $f'(z) = u_x + iv_x$

---

## 9.7 Analytic Functions

### Definition
$f$ is **analytic at** $z_0$ if $f'(z)$ exists for every $z$ in some neighborhood of $z_0$ (not just at $z_0$ itself).

$f$ is **analytic in a domain** $D$ if it is analytic at every point of $D$.

$f$ is **entire** if it is analytic on all of $\mathbb{C}$.

### Key Facts
- Analytic $\implies$ differentiable, but NOT conversely ($f(z) = |z|^2$ is differentiable at $z=0$ but not analytic there, since it's not differentiable in any neighborhood of $0$)
- If $f$ is analytic in $D$, all derivatives $f^{(n)}(z)$ exist in $D$
- Sum, product, quotient (denominator $\neq 0$), composition of analytic functions are analytic

### Singular Points
A point $z_0$ is a **singular point** of $f$ if $f$ fails to be analytic at $z_0$ but is analytic at some point in every neighborhood of $z_0$.

**Examples of entire functions:** polynomials, $e^z$, $\sin z$, $\cos z$.

**Examples with singularities:** $1/z$ (singular at $0$), $\frac{z^3+4}{(z^2-3)(z^2+1)}$ (singular at $\pm\sqrt{3}, \pm i$).

---

## 9.8 C-R Equations in Polar Form

For $z = re^{i\theta}$ with $f(z) = u(r,\theta)+iv(r,\theta)$:

$$\boxed{u_r = \frac{1}{r}v_\theta, \qquad v_r = -\frac{1}{r}u_\theta}$$

And $f'(z) = e^{-i\theta}(u_r+iv_r)$.

---

## Worked Examples

**Example 1:** Show $f(z) = e^z$ is entire.

*Solution:*
$f(z) = e^{x+iy} = e^x\cos y + ie^x\sin y$. So $u = e^x\cos y$, $v = e^x\sin y$.

$u_x = e^x\cos y = v_y$ $\checkmark$
$u_y = -e^x\sin y = -v_x$ $\checkmark$

All partials are continuous everywhere on $\mathbb{R}^2$. C-R satisfied everywhere.

$f'(z) = u_x+iv_x = e^x\cos y + ie^x\sin y = e^z$. $\checkmark$

**Example 2:** Show $f(z) = \bar{z}$ is nowhere analytic.

*Solution:*
$u = x$, $v = -y$. $u_x = 1$, $v_y = -1$. Since $u_x \neq v_y$, C-R equations fail everywhere. So $f'(z)$ does not exist at any point. Hence $f$ is nowhere differentiable, let alone analytic.

**Example 3:** Show $f(z) = 3xy + i(3y-x)$ is differentiable everywhere on $\mathbb{C}$ [or show it is not].

*Solution:*
$u = 3xy$, $v = 3y-x$. Check C-R: $u_x = 3y$, $v_y = 3$. We need $3y = 3$, i.e., $y = 1$. Also $u_y = 3x$, $v_x = -1$. We need $3x = 1$, i.e., $x = 1/3$.

C-R equations are satisfied only at $z = 1/3 + i$. Since there is no open neighborhood where C-R holds, $f$ is nowhere analytic.

**Example 4:** Show $f(z) = \cosh x\cos y + i\sinh x\sin y$ is entire.

*Solution:*
$u = \cosh x\cos y$, $v = \sinh x\sin y$.

$u_x = \sinh x\cos y = v_y = \sinh x\cos y$ $\checkmark$
$u_y = -\cosh x\sin y = -v_x = -\cosh x\sin y$ $\checkmark$

All partials continuous on $\mathbb{R}^2$. So $f$ is entire.

$f'(z) = u_x + iv_x = \sinh x\cos y + i\cosh x\sin y$.

(Note: this function equals $\cosh z$.)

---

## Practice Problems

1. Show that $f(z) = z^3$ satisfies the C-R equations everywhere and find $f'(z)$ using C-R.

2. Determine where $f(z) = |z|^2$ is (a) differentiable, (b) analytic.

3. Show that $f(z) = e^{-y}(\cos x + i\sin x)$ is entire. What familiar function is this?

4. Verify C-R equations for $f(z) = 1/z$ (at $z \neq 0$) using polar form.

5. Find all points where $f(z) = x^2+iy^2$ is differentiable.

### Solutions

1. **Show that $f(z) = z^3$ satisfies the C-R equations everywhere and find $f'(z)$.**

   **Step 1.** Expand: $f(z) = (x+iy)^3 = x^3 + 3x^2(iy) + 3x(iy)^2 + (iy)^3 = (x^3-3xy^2) + i(3x^2y-y^3)$.

   So $u = x^3-3xy^2$ and $v = 3x^2y-y^3$.

   **Step 2.** Compute partial derivatives and verify C-R:
   - $u_x = 3x^2-3y^2$, $\quad v_y = 3x^2-3y^2$. $\quad u_x = v_y$ $\checkmark$
   - $u_y = -6xy$, $\quad v_x = 6xy$. $\quad u_y = -v_x$ $\checkmark$

   All partials are polynomials, hence continuous everywhere. C-R holds everywhere.

   **Step 3.** Compute $f'(z) = u_x + iv_x = (3x^2-3y^2) + i(6xy) = 3(x^2-y^2+2ixy) = 3(x+iy)^2 = 3z^2$. $\checkmark$

---

2. **Determine where $f(z) = |z|^2$ is (a) differentiable, (b) analytic.**

   **Step 1.** Write $f(z) = |z|^2 = x^2+y^2$, so $u = x^2+y^2$ and $v = 0$.

   **Step 2.** Compute partial derivatives:

   $$u_x = 2x, \quad u_y = 2y, \quad v_x = 0, \quad v_y = 0$$

   **Step 3.** Check C-R:
   - $u_x = v_y \implies 2x = 0 \implies x = 0$
   - $u_y = -v_x \implies 2y = 0 \implies y = 0$

   Both conditions hold simultaneously only at $(x,y) = (0,0)$, i.e., $z = 0$.

   **(a)** Since all partials are continuous and C-R holds at $z = 0$, $f$ is **differentiable only at $z = 0$**.

   **(b)** $f$ is **analytic nowhere**. Analyticity at a point requires differentiability in an entire open neighbourhood, but $f$ is differentiable only at the single point $z = 0$.

3. $f(z) = e^{-y}(\cos x + i\sin x)$, so $u = e^{-y}\cos x$ and $v = e^{-y}\sin x$.

   **Partial derivatives:**
   $$u_x = -e^{-y}\sin x, \quad u_y = -e^{-y}\cos x, \quad v_x = e^{-y}\cos x, \quad v_y = -e^{-y}\sin x$$

   **Check C-R equations:**
   - $u_x = -e^{-y}\sin x = v_y$ $\checkmark$
   - $u_y = -e^{-y}\cos x = -v_x$ $\checkmark$

   All partials are continuous on $\mathbb{R}^2$, so $f$ is **entire** by the C-R sufficient condition.

   **Derivative:** $f'(z) = u_x + iv_x = -e^{-y}\sin x + ie^{-y}\cos x = ie^{-y}(\cos x + i\sin x) = ie^{-y}e^{ix} = ie^{i(x+iy)} = ie^{iz}$.

   **Identification:** Since $f'(z) = ie^{iz}$ and $\frac{d}{dz}e^{iz} = ie^{iz}$, we conclude $f(z) = e^{iz}$.

4. **Verify C-R equations for $f(z) = 1/z$ using polar form.**

   **Step 1.** Write $f(z) = \frac{1}{z} = \frac{1}{re^{i\theta}} = \frac{1}{r}e^{-i\theta} = \frac{1}{r}(\cos\theta - i\sin\theta)$.

   So $u(r,\theta) = \frac{\cos\theta}{r}$ and $v(r,\theta) = -\frac{\sin\theta}{r}$.

   **Step 2.** The polar C-R equations are $u_r = \frac{1}{r}v_\theta$ and $v_r = -\frac{1}{r}u_\theta$. Compute:

   $$u_r = -\frac{\cos\theta}{r^2}, \qquad \frac{1}{r}v_\theta = \frac{1}{r}\cdot\frac{-\cos\theta}{r} = -\frac{\cos\theta}{r^2} = u_r \quad\checkmark$$

   $$v_r = \frac{\sin\theta}{r^2}, \qquad -\frac{1}{r}u_\theta = -\frac{1}{r}\cdot\frac{-\sin\theta}{r} = \frac{\sin\theta}{r^2} = v_r \quad\checkmark$$

   Both polar C-R equations are satisfied for all $r > 0$, confirming $f(z) = 1/z$ is analytic on $\mathbb{C}\setminus\{0\}$.

---

5. **Find all points where $f(z) = x^2 + iy^2$ is differentiable.**

   **Step 1.** Identify: $u = x^2$, $v = y^2$.

   **Step 2.** Compute partial derivatives:
   $$u_x = 2x, \quad u_y = 0, \quad v_x = 0, \quad v_y = 2y$$

   **Step 3.** Check C-R equations:
   - $u_x = v_y \implies 2x = 2y \implies x = y$
   - $u_y = -v_x \implies 0 = 0$ (satisfied everywhere)

   All partials are continuous, so $f$ is differentiable at every point on the line $y = x$.

   **Step 4.** $f$ is **analytic nowhere**, since the set $\{z : x = y\}$ is a line with empty interior — no open disk lies entirely within this set.
