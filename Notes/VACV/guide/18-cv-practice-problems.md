# 18. Complex Variables — Consolidated Practice Problems

---

These problems cover all CV topics at exam level. Time yourself: aim for 5-8 minutes per problem.

---

## Section A: Complex Numbers & Algebra

**Q1.** Express in the form $a+bi$:
(a) $(2+3i)^2(1-i)$
(b) $\frac{3-4i}{(1+i)(2+i)}$

**Q2.** Find the modulus and principal argument of $z = -\sqrt{3}+i$. Write $z$ in exponential form.

**Q3.** Find all fifth roots of $-32$.

**Q4.** Show that $|z_1+z_2|^2+|z_1-z_2|^2 = 2(|z_1|^2+|z_2|^2)$ (parallelogram law).

---

## Section B: Analytic Functions & Cauchy-Riemann

**Q5.** Determine where $f(z) = x^2+iy^2$ is (a) differentiable, (b) analytic.

**Q6.** Show that $f(z) = e^z$ is entire and find $f'(z)$ using C-R equations.

**Q7.** Verify that $f(z) = \frac{z^3+4}{(z^2-3)(z^2+1)}$ is analytic except at $z = \pm\sqrt{3}$ and $z = \pm i$.

**Q8.** If $f(z) = u+iv$ is analytic and $u = 3x^2y-y^3$, find $v$ and $f(z)$.

**Q9.** Show that if $f(z)$ is analytic in $D$ and $\text{Im}\,f$ is constant, then $f$ is constant.

---

## Section C: Harmonic Functions

**Q10.** Show that $u(x,y) = x^3-3xy^2$ is harmonic and find its harmonic conjugate.

**Q11.** If $f(z) = u+iv$ is analytic and $|f(z)| = c$ (constant) in a domain $D$, show $f$ is constant.

**Q12.** Is $h(x,y) = x^2+y^2$ harmonic? Justify.

---

## Section D: Elementary Functions & Logarithm

**Q13.** Find all values of $\log(1-i)$ and identify $\text{Log}(1-i)$.

**Q14.** Find all values of $i^{2/3}$.

**Q15.** Find all values of $(1+i)^i$.

**Q16.** Find all solutions of $e^z = -3$.

**Q17.** Show that $\sin z = 0$ iff $z = n\pi$ ($n$ integer).

---

## Section E: Contour Integration & Cauchy's Theorems

**Q18.** Evaluate $\oint_{|z|=2}\frac{e^z}{z-1}\,dz$.

**Q19.** Evaluate $\oint_{|z|=3}\frac{\cos z}{z(z-\pi)}\,dz$.

**Q20.** Evaluate $\oint_{|z|=1}\frac{dz}{z^2+9}$.

**Q21.** Evaluate $\oint_{|z-1|=1}\frac{e^z}{(z-1)^4}\,dz$.

---

## Section F: Series

**Q22.** Find the Taylor series of $f(z) = \frac{1}{1-z}$ about $z_0 = 2$.

**Q23.** Find the Laurent series of $f(z) = \frac{e^z}{z^2}$ about $z_0 = 0$.

**Q24.** Find the Laurent series of $\frac{1}{z(z-2)}$ valid in: (a) $0 < |z| < 2$; (b) $|z| > 2$.

**Q25.** Find the first three nonzero terms of the Laurent series of $\frac{1}{\sin z}$ about $z = 0$.

---

## Section G: Singularities & Residues

**Q26.** Classify the singularity and find the residue:
(a) $\frac{\sin z}{z}$ at $z=0$
(b) $\frac{1}{z^2(z-1)}$ at $z=0$ and $z=1$
(c) $e^{1/z}$ at $z=0$

**Q27.** Evaluate $\oint_{|z|=2}\frac{z+1}{z(z-1)(z+3)}\,dz$.

**Q28.** Evaluate $\oint_{|z|=5}\frac{4z-5}{z(z-1)}\,dz$.

---

## Section H: Real Integrals via Residues

**Q29.** Evaluate $\int_0^{2\pi}\frac{d\theta}{2+\cos\theta}$.

**Q30.** Evaluate $\int_{-\infty}^{\infty}\frac{dx}{(x^2+1)(x^2+9)}$.

**Q31.** Evaluate $\int_0^{\infty}\frac{\cos x}{x^2+1}\,dx$.

**Q32.** Evaluate $\int_{-\infty}^{\infty}\frac{x^2}{(x^2+4)^2}\,dx$.

---

## Complete Solutions

---

### Solution Q1

**(a)** Compute $(2+3i)^2(1-i)$.

**Step 1.** Expand $(2+3i)^2$:

$$(2+3i)^2 = 4 + 12i + 9i^2 = 4 + 12i - 9 = -5 + 12i$$

**Step 2.** Multiply by $(1-i)$:

$$(-5+12i)(1-i) = -5(1) + (-5)(-i) + 12i(1) + 12i(-i)$$
$$= -5 + 5i + 12i - 12i^2 = -5 + 17i + 12 = \boxed{7 + 17i}$$

**(b)** Compute $\frac{3-4i}{(1+i)(2+i)}$.

**Step 1.** Expand the denominator:

$$(1+i)(2+i) = 2 + i + 2i + i^2 = 2 + 3i - 1 = 1 + 3i$$

**Step 2.** Multiply numerator and denominator by the conjugate of $1+3i$:

$$\frac{3-4i}{1+3i} = \frac{(3-4i)(1-3i)}{(1+3i)(1-3i)} = \frac{3 - 9i - 4i + 12i^2}{1 + 9} = \frac{3 - 13i - 12}{10} = \frac{-9 - 13i}{10}$$

$$= \boxed{-\frac{9}{10} - \frac{13}{10}i}$$

---

### Solution Q2

We have $z = -\sqrt{3} + i$.

**Modulus:**

$$|z| = \sqrt{(-\sqrt{3})^2 + 1^2} = \sqrt{3 + 1} = 2$$

**Principal argument:** Since $\text{Re}\,z = -\sqrt{3} < 0$ and $\text{Im}\,z = 1 > 0$, the point lies in the second quadrant. The reference angle is:

$$\alpha = \arctan\frac{|\text{Im}\,z|}{|\text{Re}\,z|} = \arctan\frac{1}{\sqrt{3}} = \frac{\pi}{6}$$

Therefore $\text{Arg}\,z = \pi - \frac{\pi}{6} = \frac{5\pi}{6}$.

**Exponential form:**

$$\boxed{z = 2e^{i5\pi/6}}$$

---

### Solution Q3

**Step 1.** Write $-32$ in exponential form:

$$-32 = 32 \cdot e^{i\pi}$$

**Step 2.** Apply the $n$th root formula with $n = 5$. The fifth roots are:

$$z_k = 32^{1/5} \cdot \exp\!\left(i\frac{\pi + 2k\pi}{5}\right) = 2\exp\!\left(i\frac{(2k+1)\pi}{5}\right), \quad k = 0, 1, 2, 3, 4$$

**Step 3.** List all five roots:

| $k$ | Argument | Root |
|-----|----------|------|
| $0$ | $\pi/5$ | $z_0 = 2e^{i\pi/5}$ |
| $1$ | $3\pi/5$ | $z_1 = 2e^{i3\pi/5}$ |
| $2$ | $\pi$ | $z_2 = 2e^{i\pi} = -2$ |
| $3$ | $7\pi/5$ | $z_3 = 2e^{i7\pi/5}$ |
| $4$ | $9\pi/5$ | $z_4 = 2e^{i9\pi/5}$ |

These five roots are equally spaced on the circle $|z| = 2$, separated by angles of $2\pi/5$.

---

### Solution Q4

We must prove $|z_1 + z_2|^2 + |z_1 - z_2|^2 = 2(|z_1|^2 + |z_2|^2)$.

**Step 1.** Use the identity $|w|^2 = w\bar{w}$. Expand the left-hand side:

$$|z_1 + z_2|^2 = (z_1 + z_2)\overline{(z_1 + z_2)} = (z_1 + z_2)(\bar{z}_1 + \bar{z}_2)$$
$$= |z_1|^2 + z_1\bar{z}_2 + \bar{z}_1 z_2 + |z_2|^2$$

$$|z_1 - z_2|^2 = (z_1 - z_2)(\bar{z}_1 - \bar{z}_2)$$
$$= |z_1|^2 - z_1\bar{z}_2 - \bar{z}_1 z_2 + |z_2|^2$$

**Step 2.** Add the two expressions. The cross-terms $z_1\bar{z}_2 + \bar{z}_1 z_2$ cancel:

$$|z_1 + z_2|^2 + |z_1 - z_2|^2 = 2|z_1|^2 + 2|z_2|^2 = 2(|z_1|^2 + |z_2|^2) \qquad\blacksquare$$

---

### Solution Q5

Write $f(z) = x^2 + iy^2$, so $u(x,y) = x^2$ and $v(x,y) = y^2$.

**Step 1.** Compute partial derivatives:

$$u_x = 2x, \quad u_y = 0, \quad v_x = 0, \quad v_y = 2y$$

**Step 2.** Check the Cauchy-Riemann equations $u_x = v_y$ and $u_y = -v_x$:
- $u_x = v_y \implies 2x = 2y \implies x = y$
- $u_y = -v_x \implies 0 = 0$ (satisfied everywhere)

All four partial derivatives are continuous everywhere, so by the C-R sufficient condition theorem, $f'(z)$ exists at every point where $x = y$.

**(a)** $f$ is differentiable on the line $y = x$.

**(b)** $f$ is **analytic nowhere**. Analyticity requires $f'(z)$ to exist in an open neighborhood of a point. But the set $\{z : x = y\}$ is a line, which has empty interior — no open disk is contained in this set. Hence there is no point at which $f$ is analytic. $\blacksquare$

---

### Solution Q6

Write $e^z = e^{x+iy} = e^x\cos y + ie^x\sin y$, so $u = e^x\cos y$ and $v = e^x\sin y$.

**Step 1.** Compute partial derivatives:

$$u_x = e^x\cos y, \quad u_y = -e^x\sin y, \quad v_x = e^x\sin y, \quad v_y = e^x\cos y$$

**Step 2.** Verify C-R equations:
- $u_x = e^x\cos y = v_y$ $\checkmark$
- $u_y = -e^x\sin y = -v_x$ $\checkmark$

**Step 3.** All four partial derivatives are products of $e^x$ with $\sin y$ or $\cos y$, hence continuous on all of $\mathbb{R}^2$.

By the C-R sufficient condition theorem, $f'(z)$ exists at every point in $\mathbb{C}$. Therefore $e^z$ is **entire**.

**Step 4.** Compute the derivative using $f'(z) = u_x + iv_x$:

$$f'(z) = e^x\cos y + ie^x\sin y = e^x(\cos y + i\sin y) = e^x e^{iy} = e^z \qquad\blacksquare$$

---

### Solution Q7

The function $f(z) = \frac{z^3 + 4}{(z^2-3)(z^2+1)}$ is a ratio of two polynomials. By the quotient rule, a rational function is analytic at every point where the denominator is nonzero.

**Step 1.** Find where the denominator vanishes:
- $z^2 - 3 = 0 \implies z = \pm\sqrt{3}$
- $z^2 + 1 = 0 \implies z = \pm i$

**Step 2.** Since $z^3 + 4$ does not vanish at any of these four points (one can check: $(\pm\sqrt{3})^3 + 4 \neq 0$ and $(\pm i)^3 + 4 \neq 0$), these are genuine singularities of $f$.

Therefore $f$ is analytic on $\mathbb{C} \setminus \{\pm\sqrt{3}, \pm i\}$. $\blacksquare$

---

### Solution Q8

Given: $u = 3x^2y - y^3$ and $f = u + iv$ is analytic.

**Step 1.** Verify $u$ is harmonic:

$$u_{xx} = \frac{\partial^2}{\partial x^2}(3x^2y - y^3) = 6y, \qquad u_{yy} = \frac{\partial^2}{\partial y^2}(3x^2y - y^3) = -6y$$

$$u_{xx} + u_{yy} = 6y - 6y = 0 \quad\checkmark$$

**Step 2.** Find $v$ using the C-R equations. From $v_x = -u_y$:

$$u_y = 3x^2 - 3y^2, \qquad \text{so} \qquad v_x = -(3x^2 - 3y^2) = -3x^2 + 3y^2$$

**Step 3.** Integrate $v_x$ with respect to $x$:

$$v = \int(-3x^2 + 3y^2)\,dx = -x^3 + 3xy^2 + \varphi(y)$$

where $\varphi(y)$ is an arbitrary function of $y$ alone.

**Step 4.** Determine $\varphi(y)$ using $v_y = u_x$:

$$v_y = 6xy + \varphi'(y), \qquad u_x = 6xy$$

$$6xy + \varphi'(y) = 6xy \implies \varphi'(y) = 0 \implies \varphi(y) = C$$

**Step 5.** Therefore:

$$v = -x^3 + 3xy^2 + C$$

**Step 6.** Express $f(z)$ in terms of $z$. We have:

$$f(z) = (3x^2y - y^3) + i(-x^3 + 3xy^2) + iC$$

To identify this as a function of $z$, compute $-iz^3$:

$$z^3 = (x+iy)^3 = x^3 + 3x^2(iy) + 3x(iy)^2 + (iy)^3 = x^3 - 3xy^2 + i(3x^2y - y^3)$$

$$-iz^3 = -i(x^3 - 3xy^2) - i^2(3x^2y - y^3) = (3x^2y - y^3) + i(-x^3 + 3xy^2)$$

This matches $u + iv$, so:

$$\boxed{f(z) = -iz^3 + iC}$$

---

### Solution Q9

Let $f(z) = u + iv$ be analytic in a domain $D$, with $\text{Im}\,f = v = c$ (constant) throughout $D$.

**Step 1.** Since $v$ is constant, all its partial derivatives vanish:

$$v_x = 0 \quad\text{and}\quad v_y = 0 \quad\text{throughout } D$$

**Step 2.** Apply the Cauchy-Riemann equations:

$$u_x = v_y = 0, \qquad u_y = -v_x = 0$$

**Step 3.** Since $u_x = u_y = 0$ throughout the domain $D$ (which is open and connected), $u$ is constant on $D$.

Therefore both $u$ and $v$ are constant, so $f$ is constant on $D$. $\blacksquare$

---

### Solution Q10

Given $u(x,y) = x^3 - 3xy^2$.

**Step 1.** Verify $u$ is harmonic:

$$u_{xx} = 6x, \qquad u_{yy} = -6x, \qquad u_{xx} + u_{yy} = 0 \quad\checkmark$$

**Step 2.** Find the harmonic conjugate $v$ using $v_y = u_x$:

$$v_y = u_x = 3x^2 - 3y^2$$

$$v = \int(3x^2 - 3y^2)\,dy = 3x^2 y - y^3 + \psi(x)$$

**Step 3.** Determine $\psi(x)$ using $v_x = -u_y$:

$$v_x = 6xy + \psi'(x), \qquad -u_y = -(-6xy) = 6xy$$

$$6xy + \psi'(x) = 6xy \implies \psi'(x) = 0 \implies \psi(x) = C$$

**Step 4.** Therefore $v = 3x^2y - y^3 + C$.

**Step 5.** Express $f(z)$ in terms of $z$:

$$f(z) = (x^3 - 3xy^2) + i(3x^2y - y^3) + iC$$

Recognising that $z^3 = (x+iy)^3 = (x^3 - 3xy^2) + i(3x^2y - y^3)$:

$$\boxed{f(z) = z^3 + iC}$$

---

### Solution Q11

Let $f(z) = u + iv$ be analytic in a domain $D$ with $|f(z)| = c$ (constant) throughout $D$.

**Case 1:** If $c = 0$, then $|f(z)| = 0$ everywhere, so $f(z) = 0$ throughout $D$.

**Case 2:** If $c \neq 0$. We have $u^2 + v^2 = c^2$ throughout $D$.

**Step 1.** Differentiate $u^2 + v^2 = c^2$ with respect to $x$ and $y$:

$$2uu_x + 2vv_x = 0 \quad \Longrightarrow \quad uu_x + vv_x = 0 \tag{i}$$
$$2uu_y + 2vv_y = 0 \quad \Longrightarrow \quad uu_y + vv_y = 0 \tag{ii}$$

**Step 2.** Apply the Cauchy-Riemann equations $u_x = v_y$ and $u_y = -v_x$. Substitute into (i) and (ii):

From (i): $uu_x + v v_x = 0$

From (ii): $u(-v_x) + v(u_x) = 0$, i.e., $-uv_x + vu_x = 0$ $\tag{iii}$

**Step 3.** From (i): $uu_x = -vv_x$. From (iii): $vu_x = uv_x$.

Multiply (i) by $u$: $u^2 u_x + uv v_x = 0$.

Multiply (iii) by $v$: $-uv \cdot v_x + v^2 u_x = 0$, i.e., $v^2 u_x = uv \cdot v_x$.

Substitute $uv \cdot v_x = v^2 u_x$ into the first: $u^2 u_x + v^2 u_x = 0$, giving $(u^2 + v^2)u_x = 0$.

Since $u^2 + v^2 = c^2 \neq 0$, we conclude $u_x = 0$.

**Step 4.** Similarly, $u_y = 0$. By C-R: $v_y = u_x = 0$ and $v_x = -u_y = 0$.

All partial derivatives of $u$ and $v$ vanish on the connected domain $D$, so $u$ and $v$ are constant. Hence $f$ is constant. $\blacksquare$

---

### Solution Q12

Compute the Laplacian of $h(x,y) = x^2 + y^2$:

$$h_{xx} = 2, \qquad h_{yy} = 2$$

$$h_{xx} + h_{yy} = 4 \neq 0$$

Since $h$ does not satisfy Laplace's equation, $h$ is **not harmonic**. $\blacksquare$

---

### Solution Q13

**Step 1.** Express $1 - i$ in polar form:

$$|1-i| = \sqrt{1^2 + (-1)^2} = \sqrt{2}, \qquad \text{Arg}(1-i) = -\frac{\pi}{4}$$

**Step 2.** Apply the definition of complex logarithm:

$$\log(1-i) = \ln|1-i| + i\,\arg(1-i) = \ln\sqrt{2} + i\!\left(-\frac{\pi}{4} + 2n\pi\right), \quad n \in \mathbb{Z}$$

$$= \boxed{\frac{1}{2}\ln 2 + i\!\left(-\frac{\pi}{4} + 2n\pi\right), \quad n \in \mathbb{Z}}$$

**Step 3.** The principal value ($n = 0$):

$$\text{Log}(1-i) = \frac{1}{2}\ln 2 - \frac{\pi}{4}i$$

---

### Solution Q14

We use $z^c = e^{c\log z}$.

**Step 1.** Compute $\log i$:

$$\log i = \ln|i| + i\arg(i) = 0 + i\!\left(\frac{\pi}{2} + 2n\pi\right) = i\!\left(\frac{\pi}{2} + 2n\pi\right)$$

**Step 2.** Compute $i^{2/3} = e^{\frac{2}{3}\log i}$:

$$i^{2/3} = \exp\!\left[\frac{2}{3} \cdot i\!\left(\frac{\pi}{2} + 2n\pi\right)\right] = \exp\!\left[i\!\left(\frac{\pi}{3} + \frac{4n\pi}{3}\right)\right]$$

**Step 3.** Since $c = 2/3 = p/q$ with $q = 3$, there are exactly 3 distinct values (for $n = 0, 1, 2$):

| $n$ | Exponent | Value |
|-----|----------|-------|
| $0$ | $e^{i\pi/3}$ | $\cos\frac{\pi}{3} + i\sin\frac{\pi}{3} = \frac{1}{2} + i\frac{\sqrt{3}}{2}$ |
| $1$ | $e^{i5\pi/3}$ | $\cos\frac{5\pi}{3} + i\sin\frac{5\pi}{3} = \frac{1}{2} - i\frac{\sqrt{3}}{2}$ |
| $2$ | $e^{i3\pi} = e^{i\pi}$ | $-1$ |

---

### Solution Q15

**Step 1.** Compute $\log(1+i)$:

$$|1+i| = \sqrt{2}, \qquad \arg(1+i) = \frac{\pi}{4} + 2n\pi$$

$$\log(1+i) = \frac{1}{2}\ln 2 + i\!\left(\frac{\pi}{4} + 2n\pi\right)$$

**Step 2.** Compute $(1+i)^i = e^{i\log(1+i)}$:

$$i\log(1+i) = i\!\left[\frac{1}{2}\ln 2 + i\!\left(\frac{\pi}{4} + 2n\pi\right)\right] = \frac{i}{2}\ln 2 + i^2\!\left(\frac{\pi}{4} + 2n\pi\right)$$

$$= -\!\left(\frac{\pi}{4} + 2n\pi\right) + \frac{i\ln 2}{2}$$

**Step 3.** Therefore:

$$(1+i)^i = e^{-(\pi/4 + 2n\pi)} \cdot e^{i(\ln 2)/2}$$

This gives infinitely many values (since $c = i$ is not rational).

**Step 4.** The principal value ($n = 0$):

$$(1+i)^i = e^{-\pi/4}\!\left[\cos\!\left(\frac{\ln 2}{2}\right) + i\sin\!\left(\frac{\ln 2}{2}\right)\right]$$

---

### Solution Q16

We solve $e^z = -3$ where $z = x + iy$.

**Step 1.** Write $-3$ in polar form:

$$-3 = 3e^{i(\pi + 2n\pi)}, \quad n \in \mathbb{Z}$$

**Step 2.** From $e^z = e^x \cdot e^{iy} = 3e^{i(2n+1)\pi}$, equate moduli and arguments:

$$e^x = 3 \implies x = \ln 3$$
$$y = (2n+1)\pi, \quad n \in \mathbb{Z}$$

**Step 3.** All solutions:

$$\boxed{z = \ln 3 + i(2n+1)\pi, \quad n \in \mathbb{Z}}$$

---

### Solution Q17

We prove: $\sin z = 0$ if and only if $z = n\pi$ for some integer $n$.

**Step 1.** Decompose $\sin z$ into real and imaginary parts. With $z = x + iy$:

$$\sin z = \sin x\cosh y + i\cos x\sinh y$$

Setting $\sin z = 0$ requires both parts to vanish:

$$\sin x\cosh y = 0 \tag{real part}$$
$$\cos x\sinh y = 0 \tag{imaginary part}$$

**Step 2.** From the real part: since $\cosh y \geq 1 > 0$ for all real $y$, we must have $\sin x = 0$, giving $x = n\pi$ for some integer $n$.

**Step 3.** From the imaginary part: at $x = n\pi$, we have $\cos(n\pi) = (-1)^n \neq 0$. Therefore $\sinh y = 0$, which gives $y = 0$.

**Step 4.** Therefore $z = x + iy = n\pi + 0i = n\pi$. $\blacksquare$

---

### Solution Q18

The integrand $\frac{e^z}{z-1}$ has a singularity only at $z = 1$.

**Step 1.** Check: $|1| = 1 < 2$, so $z_0 = 1$ lies inside the contour $|z| = 2$.

**Step 2.** Write the integrand in the form $\frac{f(z)}{z - z_0}$ where $f(z) = e^z$ is entire.

**Step 3.** By the **Cauchy Integral Formula**:

$$\oint_{|z|=2}\frac{e^z}{z-1}\,dz = 2\pi i \cdot f(1) = 2\pi i \cdot e$$

$$= \boxed{2\pi i e}$$

---

### Solution Q19

The integrand $\frac{\cos z}{z(z-\pi)}$ has simple poles at $z = 0$ and $z = \pi$.

**Step 1.** Determine which poles lie inside $|z| = 3$:
- $|0| = 0 < 3$ (inside $\checkmark$)
- $|\pi| = \pi \approx 3.1416 > 3$ (outside $\times$)

Only $z = 0$ lies inside the contour.

**Step 2.** Write the integrand as $\frac{f(z)}{z - 0}$ where $f(z) = \frac{\cos z}{z - \pi}$, which is analytic on and inside $|z| = 3$ (since the only other singularity $z = \pi$ lies outside).

**Step 3.** By the **Cauchy Integral Formula**:

$$\oint_{|z|=3}\frac{\cos z}{z(z-\pi)}\,dz = 2\pi i \cdot f(0) = 2\pi i \cdot \frac{\cos 0}{0 - \pi} = 2\pi i \cdot \frac{1}{-\pi} = \boxed{-2i}$$

*Note: If the contour were $|z| = 4$ (both poles inside), partial fractions give $A = \frac{\cos 0}{0-\pi} = -\frac{1}{\pi}$ and $B = \frac{\cos\pi}{\pi} = -\frac{1}{\pi}$, yielding $\oint = 2\pi i(-\frac{1}{\pi} - \frac{1}{\pi}) = -4i$.*

---

### Solution Q20

**Step 1.** Factor the denominator: $z^2 + 9 = (z - 3i)(z + 3i)$.

**Step 2.** Check which poles lie inside $|z| = 1$:
- $|3i| = 3 > 1$ (outside)
- $|-3i| = 3 > 1$ (outside)

**Step 3.** Since both poles lie outside $|z| = 1$, the integrand $\frac{1}{z^2+9}$ is analytic on and inside the contour.

**Step 4.** By the **Cauchy-Goursat Theorem**:

$$\boxed{\oint_{|z|=1}\frac{dz}{z^2+9} = 0}$$

---

### Solution Q21

The integrand is $\frac{e^z}{(z-1)^4}$.

**Step 1.** This has the form $\frac{f(z)}{(z - z_0)^{n+1}}$ with $f(z) = e^z$, $z_0 = 1$, and $n = 3$.

**Step 2.** Check: $|1 - 1| = 0 < 1$, so $z_0 = 1$ lies inside $|z - 1| = 1$.

**Step 3.** By the **Extended Cauchy Integral Formula**:

$$\oint_{|z-1|=1}\frac{f(z)}{(z-1)^{4}}\,dz = \frac{2\pi i}{3!}\,f'''(1)$$

**Step 4.** Since $f(z) = e^z$, all derivatives equal $e^z$, so $f'''(1) = e$.

$$\oint = \frac{2\pi i}{6} \cdot e = \boxed{\frac{\pi i e}{3}}$$

---

### Solution Q22

We seek the Taylor series of $f(z) = \frac{1}{1-z}$ about $z_0 = 2$.

**Step 1.** Let $w = z - 2$, so $z = w + 2$ and:

$$\frac{1}{1-z} = \frac{1}{1-(w+2)} = \frac{1}{-1-w} = \frac{-1}{1+w}$$

**Step 2.** Expand using the geometric series $\frac{1}{1+w} = \sum_{n=0}^{\infty}(-1)^n w^n$ for $|w| < 1$:

$$f(z) = -\sum_{n=0}^{\infty}(-1)^n(z-2)^n = \sum_{n=0}^{\infty}(-1)^{n+1}(z-2)^n$$

$$= -1 + (z-2) - (z-2)^2 + (z-2)^3 - \cdots$$

**Step 3.** Radius of convergence: The nearest singularity of $f$ to $z_0 = 2$ is at $z = 1$, with distance $|2-1| = 1$.

$$\boxed{R = 1}$$

---

### Solution Q23

**Step 1.** Write the Maclaurin series of $e^z$:

$$e^z = 1 + z + \frac{z^2}{2!} + \frac{z^3}{3!} + \frac{z^4}{4!} + \cdots$$

**Step 2.** Divide by $z^2$:

$$\frac{e^z}{z^2} = \frac{1}{z^2} + \frac{1}{z} + \frac{1}{2} + \frac{z}{6} + \frac{z^2}{24} + \cdots$$

This is the Laurent series about $z_0 = 0$, valid for $0 < |z| < \infty$.

The **principal part** is $\frac{1}{z^2} + \frac{1}{z}$, so $z = 0$ is a **pole of order 2**.

---

### Solution Q24

**Step 1.** Partial fractions. Write $\frac{1}{z(z-2)} = \frac{A}{z} + \frac{B}{z-2}$.

Setting $z = 0$: $A = \frac{1}{0-2} = -\frac{1}{2}$. Setting $z = 2$: $B = \frac{1}{2}$.

$$\frac{1}{z(z-2)} = \frac{-1}{2z} + \frac{1}{2(z-2)}$$

**(a)** Region $0 < |z| < 2$. We need $\frac{1}{z-2}$ expanded for $|z| < 2$:

$$\frac{1}{z-2} = \frac{-1}{2-z} = -\frac{1}{2}\cdot\frac{1}{1-z/2} = -\frac{1}{2}\sum_{n=0}^{\infty}\frac{z^n}{2^n} \quad (|z| < 2)$$

Therefore:

$$\frac{1}{z(z-2)} = -\frac{1}{2z} + \frac{1}{2}\cdot\left(-\frac{1}{2}\right)\sum_{n=0}^{\infty}\frac{z^n}{2^n} = \boxed{-\frac{1}{2z} - \sum_{n=0}^{\infty}\frac{z^n}{2^{n+2}}}$$

**(b)** Region $|z| > 2$. We need $\frac{1}{z-2}$ expanded for $|z| > 2$:

$$\frac{1}{z-2} = \frac{1}{z}\cdot\frac{1}{1-2/z} = \frac{1}{z}\sum_{n=0}^{\infty}\frac{2^n}{z^n} = \sum_{n=0}^{\infty}\frac{2^n}{z^{n+1}} \quad (|z| > 2)$$

Therefore:

$$\frac{1}{z(z-2)} = -\frac{1}{2z} + \frac{1}{2}\sum_{n=0}^{\infty}\frac{2^n}{z^{n+1}}$$

The $n=0$ term of the sum gives $\frac{1}{2z}$, which cancels with $-\frac{1}{2z}$. For $n \geq 1$:

$$= \boxed{\sum_{n=1}^{\infty}\frac{2^{n-1}}{z^{n+1}}} = \frac{1}{z^2} + \frac{2}{z^3} + \frac{4}{z^4} + \cdots$$

---

### Solution Q25

We seek the Laurent series of $\csc z = \frac{1}{\sin z}$ about $z = 0$.

**Step 1.** Write $\sin z = z - \frac{z^3}{6} + \frac{z^5}{120} - \cdots = z\!\left(1 - \frac{z^2}{6} + \frac{z^4}{120} - \cdots\right)$.

**Step 2.** Factor out $z$:

$$\frac{1}{\sin z} = \frac{1}{z} \cdot \frac{1}{1 - (z^2/6 - z^4/120 + \cdots)}$$

**Step 3.** Let $w = z^2/6 - z^4/120 + \cdots$ (small for $|z|$ small). Use $\frac{1}{1-w} = 1 + w + w^2 + \cdots$:

$$\frac{1}{1-w} = 1 + \left(\frac{z^2}{6} - \frac{z^4}{120} + \cdots\right) + \left(\frac{z^2}{6}\right)^2 + \cdots$$

$$= 1 + \frac{z^2}{6} + \left(-\frac{1}{120} + \frac{1}{36}\right)z^4 + \cdots = 1 + \frac{z^2}{6} + \frac{7z^4}{360} + \cdots$$

**Step 4.** Multiply by $\frac{1}{z}$:

$$\boxed{\frac{1}{\sin z} = \frac{1}{z} + \frac{z}{6} + \frac{7z^3}{360} + \cdots}$$

---

### Solution Q26

**(a)** $f(z) = \frac{\sin z}{z}$ at $z = 0$.

Expand: $\frac{\sin z}{z} = \frac{1}{z}\!\left(z - \frac{z^3}{6} + \frac{z^5}{120} - \cdots\right) = 1 - \frac{z^2}{6} + \frac{z^4}{120} - \cdots$

The Laurent series has **no negative powers**, so $z = 0$ is a **removable singularity**.

The residue (coefficient of $1/z$) is $\text{Res}_{z=0} = 0$.

**(b)** $f(z) = \frac{1}{z^2(z-1)}$.

**At $z = 0$** (pole of order 2): Apply the formula for a pole of order $m = 2$:

$$\text{Res}_{z=0} = \frac{1}{(2-1)!}\lim_{z\to 0}\frac{d}{dz}\!\left[z^2 \cdot \frac{1}{z^2(z-1)}\right] = \lim_{z\to 0}\frac{d}{dz}\!\left[\frac{1}{z-1}\right]$$

$$= \lim_{z\to 0}\frac{-1}{(z-1)^2} = \frac{-1}{(-1)^2} = \boxed{-1}$$

**At $z = 1$** (simple pole): Apply the simple pole formula:

$$\text{Res}_{z=1} = \lim_{z\to 1}(z-1)\cdot\frac{1}{z^2(z-1)} = \lim_{z\to 1}\frac{1}{z^2} = \boxed{1}$$

**(c)** $f(z) = e^{1/z}$ at $z = 0$.

The Laurent series about $z = 0$:

$$e^{1/z} = \sum_{n=0}^{\infty}\frac{1}{n!\,z^n} = 1 + \frac{1}{z} + \frac{1}{2!\,z^2} + \frac{1}{3!\,z^3} + \cdots$$

The principal part has infinitely many terms, so $z = 0$ is an **essential singularity**.

The residue is the coefficient of $1/z$: $\text{Res}_{z=0} = \boxed{1}$.

---

### Solution Q27

The integrand is $\frac{z+1}{z(z-1)(z+3)}$.

**Step 1.** Identify poles: $z = 0$, $z = 1$, $z = -3$.

**Step 2.** Determine which poles lie inside $|z| = 2$:
- $|0| = 0 < 2$ $\checkmark$
- $|1| = 1 < 2$ $\checkmark$
- $|-3| = 3 > 2$ $\times$

**Step 3.** All three poles are simple. Compute residues using $\text{Res}_{z=z_0}\frac{p(z)}{q(z)} = \frac{p(z_0)}{q'(z_0)}$ where $p(z) = z+1$ and $q(z) = z(z-1)(z+3) = z^3 + 2z^2 - 3z$, so $q'(z) = 3z^2 + 4z - 3$.

Alternatively, for simple poles of a product, cancel the corresponding factor:

$$\text{Res}_{z=0} = \frac{0+1}{(0-1)(0+3)} = \frac{1}{-3} = -\frac{1}{3}$$

$$\text{Res}_{z=1} = \frac{1+1}{1\cdot(1+3)} = \frac{2}{4} = \frac{1}{2}$$

**Step 4.** Apply the **Residue Theorem**:

$$\oint_{|z|=2}\frac{z+1}{z(z-1)(z+3)}\,dz = 2\pi i\!\left(-\frac{1}{3} + \frac{1}{2}\right) = 2\pi i \cdot \frac{1}{6} = \boxed{\frac{\pi i}{3}}$$

---

### Solution Q28

The integrand is $\frac{4z-5}{z(z-1)}$.

**Step 1.** Poles at $z = 0$ and $z = 1$, both simple. Since $|0| < 5$ and $|1| < 5$, both lie inside $|z| = 5$.

**Step 2.** Compute residues by cancelling the corresponding linear factor:

$$\text{Res}_{z=0} = \lim_{z\to 0}\frac{4z-5}{z-1} = \frac{-5}{-1} = 5$$

$$\text{Res}_{z=1} = \lim_{z\to 1}\frac{4z-5}{z} = \frac{-1}{1} = -1$$

**Step 3.** By the **Residue Theorem**:

$$\oint_{|z|=5}\frac{4z-5}{z(z-1)}\,dz = 2\pi i(5 + (-1)) = \boxed{8\pi i}$$

---

### Solution Q29

We evaluate $I = \int_0^{2\pi}\frac{d\theta}{2+\cos\theta}$ using the **trigonometric substitution** method.

**Step 1.** Let $z = e^{i\theta}$, so $d\theta = \frac{dz}{iz}$ and $\cos\theta = \frac{z + z^{-1}}{2}$.

$$2 + \cos\theta = 2 + \frac{z + z^{-1}}{2} = \frac{4z + z^2 + 1}{2z} = \frac{z^2 + 4z + 1}{2z}$$

**Step 2.** Substitute into the integral:

$$I = \oint_{|z|=1}\frac{1}{(z^2+4z+1)/(2z)}\cdot\frac{dz}{iz} = \oint_{|z|=1}\frac{2z}{z^2+4z+1}\cdot\frac{dz}{iz}$$

$$= \frac{2}{i}\oint_{|z|=1}\frac{dz}{z^2+4z+1}$$

**Step 3.** Find the roots of $z^2 + 4z + 1 = 0$:

$$z = \frac{-4 \pm \sqrt{16-4}}{2} = \frac{-4 \pm 2\sqrt{3}}{2} = -2 \pm \sqrt{3}$$

- $z_1 = -2 + \sqrt{3} \approx -0.268$ : $|z_1| < 1$ (inside)
- $z_2 = -2 - \sqrt{3} \approx -3.732$ : $|z_2| > 1$ (outside)

**Step 4.** Since $z_1$ is a simple pole, and $z^2 + 4z + 1 = (z - z_1)(z - z_2)$:

$$\text{Res}_{z=z_1}\frac{1}{z^2+4z+1} = \frac{1}{z_1 - z_2} = \frac{1}{(-2+\sqrt{3})-(-2-\sqrt{3})} = \frac{1}{2\sqrt{3}}$$

**Step 5.** By the Residue Theorem:

$$I = \frac{2}{i}\cdot 2\pi i \cdot \frac{1}{2\sqrt{3}} = \frac{2 \cdot 2\pi}{2\sqrt{3}} = \frac{2\pi}{\sqrt{3}} = \boxed{\frac{2\pi\sqrt{3}}{3}}$$

---

### Solution Q30

We evaluate $I = \int_{-\infty}^{\infty}\frac{dx}{(x^2+1)(x^2+9)}$.

**Step 1.** Use **partial fractions**:

$$\frac{1}{(z^2+1)(z^2+9)} = \frac{1}{8}\!\left(\frac{1}{z^2+1} - \frac{1}{z^2+9}\right)$$

(Verify: $\frac{1}{8}\cdot\frac{(z^2+9)-(z^2+1)}{(z^2+1)(z^2+9)} = \frac{8}{8(z^2+1)(z^2+9)} = \frac{1}{(z^2+1)(z^2+9)}$ $\checkmark$)

**Step 2.** The degree condition $\deg q - \deg p = 4 - 0 = 4 \geq 2$ is satisfied, so we can close the contour with a semicircle in the upper half-plane.

**Step 3.** Identify poles in the upper half-plane (UHP):
- From $z^2 + 1 = 0$: $z = i$ (UHP)
- From $z^2 + 9 = 0$: $z = 3i$ (UHP)

**Step 4.** Compute residues. For $\frac{1}{z^2+a^2}$ with simple pole at $z = ai$:

$$\text{Res}_{z=ai}\frac{1}{z^2+a^2} = \frac{1}{2z}\bigg|_{z=ai} = \frac{1}{2ai}$$

Therefore:

$$\text{Res}_{z=i}\frac{1}{8(z^2+1)} = \frac{1}{8}\cdot\frac{1}{2i} = \frac{1}{16i}$$

$$\text{Res}_{z=3i}\frac{-1}{8(z^2+9)} = \frac{-1}{8}\cdot\frac{1}{6i} = \frac{-1}{48i}$$

**Step 5.** Sum the residues:

$$\frac{1}{16i} - \frac{1}{48i} = \frac{3 - 1}{48i} = \frac{2}{48i} = \frac{1}{24i}$$

**Step 6.** Apply the residue theorem for the upper semicircular contour:

$$I = 2\pi i \cdot \frac{1}{24i} = \boxed{\frac{\pi}{12}}$$

---

### Solution Q31

We evaluate $\int_0^{\infty}\frac{\cos x}{x^2+1}\,dx$.

**Step 1.** Since $\frac{\cos x}{x^2+1}$ is an even function of $x$:

$$\int_0^{\infty}\frac{\cos x}{x^2+1}\,dx = \frac{1}{2}\int_{-\infty}^{\infty}\frac{\cos x}{x^2+1}\,dx$$

**Step 2.** Express as the real part of a Fourier-type integral:

$$\int_{-\infty}^{\infty}\frac{\cos x}{x^2+1}\,dx = \text{Re}\int_{-\infty}^{\infty}\frac{e^{ix}}{x^2+1}\,dx$$

**Step 3.** Close the contour in the UHP (valid since $a = 1 > 0$ and $\deg q - \deg p = 2 - 0 = 2 \geq 1$; by **Jordan's Lemma**, the semicircular arc contribution vanishes).

**Step 4.** The only pole of $\frac{e^{iz}}{z^2+1}$ in the UHP is $z = i$ (simple). Compute the residue:

$$\text{Res}_{z=i}\frac{e^{iz}}{z^2+1} = \frac{e^{iz}}{2z}\bigg|_{z=i} = \frac{e^{i \cdot i}}{2i} = \frac{e^{-1}}{2i}$$

**Step 5.** By the Residue Theorem:

$$\int_{-\infty}^{\infty}\frac{e^{ix}}{x^2+1}\,dx = 2\pi i \cdot \frac{e^{-1}}{2i} = \frac{\pi}{e}$$

This result is real, so $\text{Re}\!\left(\frac{\pi}{e}\right) = \frac{\pi}{e}$.

**Step 6.** Therefore:

$$\int_0^{\infty}\frac{\cos x}{x^2+1}\,dx = \frac{1}{2}\cdot\frac{\pi}{e} = \boxed{\frac{\pi}{2e}}$$

---

### Solution Q32

We evaluate $I = \int_{-\infty}^{\infty}\frac{x^2}{(x^2+4)^2}\,dx$.

**Step 1.** Degree check: $\deg q = 4$, $\deg p = 2$, so $\deg q - \deg p = 2 \geq 2$. The semicircular contour method applies.

**Step 2.** Factor: $(z^2 + 4)^2 = [(z-2i)(z+2i)]^2$. The poles are $z = 2i$ and $z = -2i$, each of order 2.

**Step 3.** Only $z = 2i$ lies in the upper half-plane. Compute the residue at this pole of order 2 using the formula:

$$\text{Res}_{z=2i}f(z) = \lim_{z\to 2i}\frac{d}{dz}\!\left[(z-2i)^2 \cdot \frac{z^2}{(z-2i)^2(z+2i)^2}\right] = \lim_{z\to 2i}\frac{d}{dz}\!\left[\frac{z^2}{(z+2i)^2}\right]$$

**Step 4.** Compute the derivative using the quotient rule. Let $g(z) = \frac{z^2}{(z+2i)^2}$:

$$g'(z) = \frac{2z(z+2i)^2 - z^2 \cdot 2(z+2i)}{(z+2i)^4} = \frac{2z(z+2i) - 2z^2}{(z+2i)^3} = \frac{4iz}{(z+2i)^3}$$

**Step 5.** Evaluate at $z = 2i$:

$$g'(2i) = \frac{4i(2i)}{(2i+2i)^3} = \frac{8i^2}{(4i)^3} = \frac{-8}{64i^3} = \frac{-8}{-64i} = \frac{1}{8i}$$

**Step 6.** By the Residue Theorem:

$$I = 2\pi i \cdot \frac{1}{8i} = \boxed{\frac{\pi}{4}}$$
