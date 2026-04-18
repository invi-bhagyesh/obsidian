# 10. Harmonic Functions & Harmonic Conjugates

---

## 10.1 Definition

A real-valued function $h(x,y)$ is **harmonic** in a domain $D$ if:

1. $h$ has continuous first and second order partial derivatives in $D$
2. $h$ satisfies **Laplace's equation** in $D$:

$$\boxed{\nabla^2 h = h_{xx} + h_{yy} = 0}$$

---

## 10.2 Connection to Analytic Functions

> **Theorem.** If $f(z) = u(x,y)+iv(x,y)$ is analytic in a domain $D$, then **both** $u$ and $v$ are harmonic in $D$.

### Proof

Since $f$ is analytic, $f''(z)$ exists in $D$, meaning $f'(z) = u_x+iv_x$ is also differentiable. This guarantees all second-order partials of $u$ and $v$ exist and are continuous.

From C-R equations: $u_x = v_y$ and $u_y = -v_x$.

Differentiate $u_x = v_y$ with respect to $x$: $u_{xx} = v_{yx}$.
Differentiate $u_y = -v_x$ with respect to $y$: $u_{yy} = -v_{xy}$.

Since second-order mixed partials are continuous, $v_{yx} = v_{xy}$, so:
$$u_{xx} + u_{yy} = v_{yx} - v_{xy} = 0 \qquad\blacksquare$$

Similarly, differentiating C-R the other way gives $v_{xx}+v_{yy} = 0$.

### Corollary
If $f(z) = u+iv$ is analytic at $z_0$, then $u$ and $v$ have continuous partial derivatives of **all orders** at $z_0$.

---

## 10.3 Harmonic Conjugate

### Definition
If $u$ and $v$ are harmonic in a domain $D$, and their first-order partial derivatives satisfy the C-R equations throughout $D$:
$$u_x = v_y \qquad\text{and}\qquad u_y = -v_x$$

then $v$ is called a **harmonic conjugate** of $u$.

### Key Theorem
> $f(z) = u+iv$ is **analytic** in $D$ $\iff$ $v$ is a harmonic conjugate of $u$ in $D$.

### Existence and Uniqueness

**Existence:** Any harmonic function $u$ on a simply connected domain has a harmonic conjugate $v$.

**Uniqueness:** The harmonic conjugate is unique **up to an additive constant**:
If $v_1$ and $v_2$ are both harmonic conjugates of $u$, then $v_1 - v_2 = C$ (constant).

### Warning on Order
$v$ is a harmonic conjugate of $u$ does **NOT** mean $u$ is a harmonic conjugate of $v$.

If $v$ is the harmonic conjugate of $u$, then $-u$ is the harmonic conjugate of $v$. (Because $f = u+iv$ analytic $\implies$ $if = -v+iu$ analytic, so $-u$ is the harmonic conjugate of $v$, not $u$.)

---

## 10.4 Finding the Harmonic Conjugate

**Method:** Given $u(x,y)$ harmonic, find $v(x,y)$ such that $u_x = v_y$ and $u_y = -v_x$.

### Step-by-Step Procedure

1. **Verify** $u$ is harmonic: check $u_{xx}+u_{yy} = 0$.

2. From $v_x = -u_y$, integrate with respect to $x$:
   $$v = \int (-u_y)\,dx + \varphi(y)$$
   
   Or equivalently, from $v_y = u_x$, integrate with respect to $y$:
   $$v = \int u_x\,dy + \psi(x)$$

3. Determine the arbitrary function by using the other C-R equation.

4. Write $f(z) = u + iv$.

---

## 10.5 Important Results

### Theorem: Constant Modulus
> If $f$ is analytic in a domain $D$ and $|f(z)|$ is constant throughout $D$, then $f$ is constant in $D$.

**Proof:** Let $|f(z)|^2 = u^2+v^2 = c^2$ on $D$.
- If $c = 0$: $f(z) = 0$ on $D$.
- If $c \neq 0$: Differentiate $u^2+v^2 = c^2$: $uu_x+vv_x = 0$ and $uu_y+vv_y = 0$.

Using C-R ($u_x = v_y$, $u_y = -v_x$): cross-multiply and add to get $(u^2+v^2)v_x = 0$. Since $u^2+v^2 = c^2 \neq 0$, we get $v_x = 0$, then $v_y = 0$, then $u_x = u_y = 0$. So $u$ and $v$ are constants. $\blacksquare$

### Theorem: $f$ and $\bar{f}$ both analytic $\implies$ constant
> If $f(z)$ and $\overline{f(z)}$ are both analytic in $D$, then $f$ is constant in $D$.

**Proof:** $f = u+iv$, $\bar{f} = u-iv$. From C-R for $f$: $u_x = v_y$, $u_y = -v_x$.
From C-R for $\bar{f}$: $u_x = -v_y$, $u_y = v_x$.
So $v_y = -v_y \implies v_y = 0$, and $v_x = -v_x \implies v_x = 0$.
Then $u_x = v_y = 0$ and $u_y = -v_x = 0$. All partials zero $\implies$ $f$ is constant. $\blacksquare$

### Laplacian for Analytic $f$
If $f(z) = u+iv$ is analytic, then:
$$f''(z) = u_{xx}+iv_{xx} = -u_{yy}-iv_{yy}$$

and both $u_{xx}+u_{yy} = 0$ and $v_{xx}+v_{yy} = 0$.

---

## Worked Examples

**Example 1:** Show $u(x,y) = x^2-y^2$ is harmonic and find its harmonic conjugate.

*Solution:*
$u_{xx} = 2$, $u_{yy} = -2$. $u_{xx}+u_{yy} = 0$ $\checkmark$. Harmonic.

$v_y = u_x = 2x \implies v = 2xy + \psi(x)$

$v_x = 2y + \psi'(x) = -u_y = -(-2y) = 2y$

$\psi'(x) = 0 \implies \psi(x) = C$.

$v(x,y) = 2xy + C$.

$f(z) = (x^2-y^2)+i(2xy) + iC = z^2 + iC$. $\checkmark$

**Example 2:** Given $u(x,y) = y^3 - 3x^2y$, find the harmonic conjugate and the analytic function.

*Solution:*

**Step 1.** Verify $u$ is harmonic:

$$u_{xx} = -6y, \qquad u_{yy} = 6y, \qquad u_{xx}+u_{yy} = 0 \quad\checkmark$$

**Step 2.** From the C-R equation $v_x = -u_y$:

$$u_y = 3y^2 - 3x^2, \qquad\text{so}\qquad v_x = -(3y^2-3x^2) = 3x^2 - 3y^2$$

**Step 3.** Integrate with respect to $x$:

$$v = \int(3x^2 - 3y^2)\,dx = x^3 - 3xy^2 + \varphi(y)$$

**Step 4.** Determine $\varphi(y)$ from the other C-R equation $v_y = u_x$:

$$v_y = -6xy + \varphi'(y), \qquad u_x = -6xy$$

$$\varphi'(y) = 0 \implies \varphi(y) = C$$

**Step 5.** Therefore $v = x^3 - 3xy^2 + C$, and:

$$f(z) = (y^3 - 3x^2y) + i(x^3 - 3xy^2) + iC$$

**Step 6.** Express in terms of $z$. Compute $iz^3$:

$$z^3 = (x+iy)^3 = x^3 - 3xy^2 + i(3x^2y - y^3)$$

$$iz^3 = i(x^3-3xy^2) + i^2(3x^2y-y^3) = -(3x^2y-y^3) + i(x^3-3xy^2)$$

$$= (y^3 - 3x^2y) + i(x^3 - 3xy^2) = u + iv$$

Therefore $f(z) = iz^3 + iC$. $\checkmark$

**Example 3:** If $f(z) = z^2$, what are $u_{xx}+u_{yy}$ and $v_{xx}+v_{yy}$?

*Solution:*
$u = x^2-y^2$: $u_{xx} = 2$, $u_{yy} = -2$. Sum $= 0$.
$v = 2xy$: $v_{xx} = 0$, $v_{yy} = 0$. Sum $= 0$. $\checkmark$

**Example 4:** Show that if $f$ is analytic in $D$ and $|f(z)|$ is constant, then $f$ is constant.

Already proved in Section 10.5. This is a very common exam question.

---

## Practice Problems

1. Verify that $u = e^x\cos y$ is harmonic. Find the harmonic conjugate $v$ and express $f = u+iv$ in terms of $z$.

2. Is $h(x,y) = x^3-3xy$ harmonic? Why or why not?

3. Given $v(x,y) = e^x\sin y$, find a harmonic function $u$ such that $f = u+iv$ is analytic.

4. Show that if $u$ is harmonic in $D$, then $u_{xy} = u_{yx}$ and $u_{xxy}+u_{yyy} = 0$ (i.e., $\nabla^2(u_y) = 0$ — partial derivatives of harmonic functions are also harmonic).

5. If $f(z)$ is analytic and purely real-valued (i.e., $\text{Im}\,f = 0$), show that $f$ is constant.

### Solutions

**1.** Verify that $u = e^x\cos y$ is harmonic, find the harmonic conjugate, and express $f = u+iv$ in terms of $z$.

**Step 1.** Check harmonicity: $u_{xx} = e^x\cos y$, $u_{yy} = -e^x\cos y$. $u_{xx}+u_{yy} = 0$. $\checkmark$

**Step 2.** Find $v$ using $v_y = u_x = e^x\cos y$:

$$v = \int e^x\cos y\,dy = e^x\sin y + \psi(x)$$

**Step 3.** Determine $\psi(x)$ from $v_x = -u_y$:

$$v_x = e^x\sin y + \psi'(x), \qquad -u_y = -(-e^x\sin y) = e^x\sin y$$

$$\psi'(x) = 0 \implies \psi(x) = C$$

**Step 4.** Therefore $v = e^x\sin y + C$, and:

$$f(z) = e^x\cos y + ie^x\sin y + iC = e^x(\cos y + i\sin y) + iC = e^{x+iy} + iC = e^z + iC$$

---

**2.** Is $h(x,y) = x^3 - 3xy$ harmonic?

Compute: $h_{xx} = 6x$, $h_{yy} = 0$. Then $h_{xx}+h_{yy} = 6x$, which is not identically zero. **Not harmonic.** $\blacksquare$

---

**3.** Given $v(x,y) = e^x\sin y$, find $u$ such that $f = u + iv$ is analytic.

**Step 1.** From the C-R equation $u_x = v_y$:

$$u_x = v_y = e^x\cos y$$

**Step 2.** Integrate with respect to $x$:

$$u = \int e^x\cos y\,dx = e^x\cos y + \varphi(y)$$

**Step 3.** From $u_y = -v_x = -e^x\sin y$:

$$u_y = -e^x\sin y + \varphi'(y) = -e^x\sin y \implies \varphi'(y) = 0 \implies \varphi(y) = C$$

**Step 4.** Therefore $u = e^x\cos y + C$, and $f(z) = e^x(\cos y + i\sin y) + C = e^z + C$.

---

**4.** Show that partial derivatives of harmonic functions are also harmonic.

**Proof.** Let $u$ be harmonic: $u_{xx}+u_{yy} = 0$.

Differentiate with respect to $y$ (valid since $u$ has continuous partials of all orders — guaranteed because $u$ is the real part of an analytic function):

$$u_{xxy} + u_{yyy} = 0$$

This is precisely $\nabla^2(u_y) = (u_y)_{xx} + (u_y)_{yy} = 0$, so $u_y$ is harmonic.

Similarly, differentiating $u_{xx}+u_{yy}=0$ with respect to $x$ gives $u_{xxx}+u_{yyx} = 0$, i.e., $\nabla^2(u_x) = 0$, so $u_x$ is harmonic. $\blacksquare$

---

**5.** If $f(z)$ is analytic and purely real-valued, show $f$ is constant.

**Proof.** Since $f$ is purely real, $\text{Im}\,f = v = 0$ throughout the domain.

Therefore $v_x = 0$ and $v_y = 0$ everywhere.

By the Cauchy-Riemann equations:

$$u_x = v_y = 0 \qquad\text{and}\qquad u_y = -v_x = 0$$

Since $u_x = u_y = 0$ throughout a connected domain, $u$ is constant. Hence $f = u + i\cdot 0$ is constant. $\blacksquare$
