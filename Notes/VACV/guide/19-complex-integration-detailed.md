# 19. Complex Integration — Contour Integrals (Detailed Treatment)

> **Source.** Lectures 23–25, MAT 2238 (March 17–20, 2025). Companion to [[14-contour-integration-cauchy]] (which is the summary). This chapter provides the full lecture-level development with proofs, parametrisation drills, and ML-inequality applications.

> **Why this chapter.** An analytic function has derivatives of all orders — a fact that follows from Cauchy's integral formula. Complex integration is the bridge: it allows us to compute physical quantities (electrostatic potentials, fluid flows), special functions (Gamma, error function), and real integrals that are intractable by elementary means.

---

## 19.1 From Real to Complex Integration

In real calculus, $\int_a^b f(t)\,dt$ has **no path ambiguity** — the integration interval $[a, b] \subset \mathbb{R}$ is one-dimensional. In the complex plane, two points $z_0, z$ are joined by infinitely many curves; the integral depends a priori on which curve we choose.

We therefore study **contour integrals**:
$$\int_C f(z)\,dz$$
where $C$ is a specified curve from $z_0$ to $z$ in $\mathbb{C}$.

---

## 19.2 Curves, Arcs, Contours — Definitions

> **Definition (Curve / arc / path).** A set of points $\{z = x + iy\}$ in $\mathbb{C}$ is called a **curve** if there exist continuous real-valued functions $x(t), y(t)$ on a closed interval $[a, b]$ such that
> $$z(t) = x(t) + i y(t), \qquad a \le t \le b.$$
> The function $z(t)$ is called a **parametric representation** of the curve $C$.

**Example 1 (Unit circle).** $C : z(t) = e^{it}, \; 0 \le t \le 2\pi$ is the unit circle traversed counterclockwise (CCW). Alternative parametrisations:
- $z(t) = e^{-it}, \; 0 \le t \le 2\pi$ — same set, traversed clockwise (CW).
- $z(t) = \cos t + i \sin t$ — same as the first.

> **Definition (Simple closed curve).** A curve $C : z(t), \; a \le t \le b$ is **closed** if $z(a) = z(b)$, and **simple** if $z(t_1) \ne z(t_2)$ for $a \le t_1 < t_2 < b$ (no self-intersection except at endpoints). A **simple closed curve** has both properties.

> **Definition (Smooth curve).** $C : z(t), a \le t \le b$ is **smooth** ($C^1$ smooth) if:
> 1. $\dfrac{dz}{dt}$ exists and is continuous on $[a, b]$, and
> 2. $\dfrac{dz}{dt} \ne 0$ throughout $(a, b)$.

The non-vanishing derivative ensures the curve has a well-defined tangent at every interior point — no cusps.

> **Definition (Contour / piecewise-smooth curve).** A **contour** is a curve $C$ consisting of finitely many smooth arcs joined end-to-end. Equivalently, $z(t)$ is continuous on $[a, b]$ and $z'(t)$ is **piecewise continuous** on $[a, b]$.

**Example 2 (Polygonal line).**
$$z(t) = \begin{cases} t + i, & 0 \le t \le 1, \\ 1 + (t)i, & 1 \le t \le 2,\end{cases}$$
is two line segments — a contour but not smooth at $t = 1$ (the corner).

**Examples of simple closed contours.** Triangles, rectangles, circles, ellipses — any non-self-intersecting closed polygon or smooth oval.

### Piecewise notions in detail

> **Piecewise continuous on $[a, b]$.** A function $f$ is piecewise continuous on $[a, b]$ if $f$ is continuous everywhere on $[a, b]$ except possibly at finitely many points where, although $f$ is discontinuous, the one-sided limits exist (and are finite).

> **Piecewise smooth on $[a, b]$.** A function $f$ is piecewise smooth if $f$ is $C^1$ everywhere on $[a, b]$ except possibly at finitely many points where $f'$ exists but may not be continuous (jump in derivative).

For a contour $C : z(t), a \le t \le b$:
- $z(t)$ is **continuous** on $[a, b]$ (no jumps in position),
- $z'(t)$ is **piecewise continuous** on $[a, b]$ (smooth between corners).

---

## 19.3 Interior, Exterior, Jordan Curve Theorem

> **Theorem (Jordan Curve Theorem).** Every simple closed contour $C$ in $\mathbb{C}$ divides the plane into two disjoint open sets: a **bounded interior** $\operatorname{Int}(C)$ and an **unbounded exterior** $\operatorname{Ext}(C)$. The points of $C$ form the common boundary of both.

Although intuitively obvious for simple shapes, this is a deep topological theorem — the proof for general continuous simple closed curves is non-trivial.

---

## 19.4 Definition of the Contour Integral

> **Definition (Contour integral).** Let $C : z(t), a \le t \le b$ be a contour and let $f$ be a continuous function defined on the points of $C$. The **contour integral** (or **line integral**) of $f$ along $C$ is
> $$\boxed{\int_C f(z)\,dz \;:=\; \int_a^b f(z(t))\,\frac{dz}{dt}\,dt.}$$

**Remarks.**

(a) The right-hand side is an ordinary (real-variable) integral with complex-valued integrand. Splitting into real and imaginary parts:
$$\int_a^b f(z(t)) z'(t)\,dt = \int_a^b u(t)\,dt + i \int_a^b v(t)\,dt,$$
where $f(z(t)) z'(t) = u(t) + i v(t)$.

(b) **Independence of parametrisation.** Although a contour admits many parametrisations, the integral value depends only on the contour (its image and orientation), not on which parametrisation is used. (Proof: change of variables in the Riemann integral.)

(c) **Convention on orientation.** When $C$ is described only as a set (e.g., "the unit circle"), we assume $z(t)$ traverses $C$ in the direction of increasing parameter $t$. If unstated otherwise, simple closed contours are taken **counterclockwise** (positive orientation).

---

## 19.5 Properties of the Contour Integral

For $f, g$ continuous on $C$ and constants $k_1, k_2 \in \mathbb{C}$:

**(P1) Linearity.**
$$\int_C [k_1 f(z) + k_2 g(z)]\,dz = k_1 \int_C f(z)\,dz + k_2 \int_C g(z)\,dz.$$

**(P2) Sense reversal.** Let $-C$ denote the same set of points traversed in the opposite direction. Then
$$\int_{-C} f(z)\,dz = -\int_C f(z)\,dz.$$

**(P3) Path partitioning.** If $C = C_1 + C_2$ (i.e., $C_1$ ends where $C_2$ begins), then
$$\int_C f(z)\,dz = \int_{C_1} f(z)\,dz + \int_{C_2} f(z)\,dz.$$

All three follow directly from the corresponding properties of the Riemann integral on $[a, b]$.

---

## 19.6 Evaluating Contour Integrals — Two Methods

### Method 1: Antiderivative

> **Theorem (Existence of antiderivative in SCD).** Let $f(z)$ be analytic in a simply connected domain $D$. Then there exists an analytic function $F(z)$ on $D$ such that $F'(z) = f(z)$ on $D$. Furthermore, for any contour $C$ in $D$ joining $z_0$ to $z_1$,
> $$\int_C f(z)\,dz = F(z_1) - F(z_0).$$

(Reference: Kreyszig, p. 647, §14.1.) Since the value depends only on the endpoints (not on the path), we also write
$$\int_{z_0}^{z_1} f(z)\,dz \;=\; F(z_1) - F(z_0).$$

> **Definition.** An **simply connected domain** (SCD) $D$ is one in which every simple closed curve in $D$ encloses only points of $D$.
>
> **Examples.** Open disc $B(a, r)$; the whole plane $\mathbb{C}$; any open convex set.
>
> **Non-example.** The annulus $r_1 < |z - a| < r_2$ (the small disc $|z - a| \le r_1$ is "missing" — a closed curve around it does not enclose only $D$-points).

**Example 3.** $\displaystyle\int_0^{1+i} z^2\,dz = \frac{z^3}{3}\bigg|_0^{1+i} = \frac{(1+i)^3}{3}.$

*Computation.* $(1+i)^2 = 2i$, so $(1+i)^3 = (1+i)(2i) = 2i + 2i^2 = -2 + 2i$. Hence
$$\int_0^{1+i} z^2\,dz = \frac{-2 + 2i}{3} = -\frac{2}{3} + \frac{2}{3}i.$$
This holds along *any* contour in $\mathbb{C}$ from $0$ to $1+i$, since $z^2$ is entire and has antiderivative $z^3/3$.

**Example 4.** $\displaystyle\int_{-\pi i}^{\pi i} \cos z\,dz = \sin z \big|_{-\pi i}^{\pi i} = \sin(\pi i) - \sin(-\pi i) = 2\sin(\pi i).$

(Using $\sin(\pi i) = i \sinh(\pi)$, this equals $2 i \sinh \pi$.)

**Example 5.** $\displaystyle\int_{8 + \pi i}^{8 - 3\pi i} e^{2z}\,dz = \frac{e^{2z}}{2}\bigg|_{8+\pi i}^{8 - 3\pi i} = \frac{e^{16 - 6\pi i} - e^{16 + 2\pi i}}{2} = \frac{e^{16}(1) - e^{16}(1)}{2} = 0.$

(Since $e^{-6\pi i} = e^{2\pi i} = 1$.)

### Method 2: Direct parametrisation

When no antiderivative is available (e.g., $f$ is non-analytic, or the antiderivative exists only on a non-simply-connected domain), we evaluate directly:
$$\int_C f(z)\,dz = \int_a^b f(z(t)) z'(t)\,dt.$$

**Example 6 (Churchill).** Find $\displaystyle\int_{C_1} f(z)\,dz$ and $\displaystyle\int_{C_2} f(z)\,dz$, where $f(z) = y - x - i 3 x^2$ (writing $z = x + iy$), and:
- $C_1$: from $0$ to $i$ vertically, then $i$ to $1+i$ horizontally;
- $C_2$: straight line from $0$ to $1 + i$.

*Solution along $C_2$ (the diagonal).* Parametrise $z(t) = t + it, \; 0 \le t \le 1$. Then $x = y = t$, so
$$f(z(t)) = t - t - i 3 t^2 = -3 i t^2, \qquad z'(t) = 1 + i.$$
$$\int_{C_2} f\,dz = \int_0^1 (-3 i t^2)(1 + i)\,dt = (-3i - 3i^2)\int_0^1 t^2\,dt = (3 - 3i) \cdot \frac{1}{3} = 1 - i.$$

*Solution along $C_1$.* Two pieces.
- $C_{1a}$: $z(t) = it, \; 0 \le t \le 1$. Here $x = 0, y = t$, so $f = t - 0 - 0 = t$ and $z'(t) = i$. $\int_{C_{1a}} = \int_0^1 t \cdot i\,dt = i/2.$
- $C_{1b}$: $z(t) = t + i, \; 0 \le t \le 1$. Here $x = t, y = 1$, so $f = 1 - t - i 3 t^2$ and $z'(t) = 1$. $\int_{C_{1b}} = \int_0^1 (1 - t - 3 i t^2)\,dt = 1 - \tfrac{1}{2} - i = \tfrac{1}{2} - i.$

Total: $\int_{C_1} = i/2 + 1/2 - i = 1/2 - i/2$.

**Observation.** $\int_{C_1} \ne \int_{C_2}$. This shows that for **non-analytic** $f$ (here $f = y - x - 3ix^2$ fails Cauchy–Riemann), the integral is **path-dependent**.

---

## 19.7 The Fundamental Integral $\displaystyle\oint_C \frac{dz}{(z - z_0)^m}$

This is the cornerstone calculation of complex integration: integrating $(z - z_0)^m$ ($m \in \mathbb{Z}$) around a circle $C$ centred at $z_0$.

**Setup.** Let $C$ be the circle $|z - z_0| = \rho$, parametrised CCW by
$$z(t) = z_0 + \rho e^{it}, \quad -\pi \le t \le \pi, \qquad z'(t) = i \rho e^{it}.$$

**Computation.**
$$\oint_C (z - z_0)^m\,dz = \int_{-\pi}^{\pi} (\rho e^{it})^m \cdot i \rho e^{it}\,dt = i \rho^{m+1} \int_{-\pi}^{\pi} e^{i(m+1)t}\,dt.$$

**Auxiliary lemma.** For $m \in \mathbb{Z}$,
$$\int_{-\pi}^{\pi} e^{i m t}\,dt = \begin{cases} \dfrac{e^{i m \pi} - e^{-i m \pi}}{i m} = \dfrac{(-1)^m - (-1)^m}{im} = 0, & m \ne 0, \\ 2\pi, & m = 0. \end{cases}$$

(Used $e^{i m \pi} = (e^{i\pi})^m = (-1)^m$.)

**Apply with exponent $m + 1$:**
$$\int_{-\pi}^\pi e^{i(m+1)t}\,dt = \begin{cases} 0, & m + 1 \ne 0, \\ 2\pi, & m + 1 = 0.\end{cases}$$

Hence
$$\boxed{\oint_C (z - z_0)^m\,dz = \begin{cases} 2\pi i, & m = -1, \\ 0, & m \in \mathbb{Z}, m \ne -1.\end{cases}}$$

**Remarks.**
- For $m \ge 0$: $(z-z_0)^m$ is entire, so the answer $0$ is "expected" — the integrand has antiderivative $(z-z_0)^{m+1}/(m+1)$.
- For $m \le -2$: $(z-z_0)^m$ is *not* analytic at $z_0$ but has antiderivative $(z-z_0)^{m+1}/(m+1)$ on any annulus around $z_0$. Integrating around a closed loop returns $0$.
- For $m = -1$: there is no single-valued antiderivative around $z_0$ ($\log(z - z_0)$ has a branch cut). The integral picks up $2\pi i$ — the "winding number" times $2\pi i$.

This $m = -1$ case is the engine behind Cauchy's integral formula and the residue theorem.

---

## 19.8 Two Key Examples on the Unit Circle

Throughout, $C : z(t) = e^{it}, -\pi \le t \le \pi$ (unit circle, CCW).

**Example 7.** $\displaystyle\oint_C \frac{dz}{z}$.

By the formula above with $m = -1, z_0 = 0, \rho = 1$: answer is $2\pi i$.

*Direct verification.*
$$\oint_C \frac{dz}{z} = \int_{-\pi}^{\pi} \frac{1}{e^{it}} \cdot i e^{it}\,dt = \int_{-\pi}^{\pi} i\,dt = 2\pi i. \quad\checkmark$$

**Example 8.** $\displaystyle\oint_C z^2\,dz$.

By the formula with $m = 2$: answer is $0$.

*Direct verification.*
$$\oint_C z^2\,dz = \int_{-\pi}^\pi e^{2it} \cdot i e^{it}\,dt = i \int_{-\pi}^\pi e^{3it}\,dt = i \cdot 0 = 0. \quad\checkmark$$

(Alternatively: $z^2$ is entire, so the integral over any closed contour is $0$ by the antiderivative principle.)

**Conclusion drawn from Example 7.** The function $1/z$ is analytic on $\mathbb{C} \setminus \{0\}$ — but the punctured plane is *not* simply connected. There is no SCD containing the unit circle on which $1/z$ is analytic. So the antiderivative principle does not apply, and indeed the integral is non-zero.

---

## 19.9 The ML-Inequality (Bounds on Contour Integrals)

> **Theorem (ML-inequality).** Let $C$ be a contour of length $L$ and $f$ a piecewise-continuous function on $C$. If $M \ge 0$ is a constant such that
> $$|f(z)| \le M \quad \text{for all } z \in C \text{ at which } f \text{ is defined,}$$
> then
> $$\left| \int_C f(z)\,dz \right| \le M L.$$

**Length of a contour.** For a smooth $C : z(t), a \le t \le b$,
$$\operatorname{len}(C) := \int_a^b |z'(t)|\,dt.$$
For piecewise-smooth $C = \bigcup_{i=1}^n C_i$, $\operatorname{len}(C) = \sum \operatorname{len}(C_i)$.

**Example.** Half-circle of radius $2$: $z(t) = 2 e^{it}, -\pi/2 \le t \le \pi/2$. $z'(t) = 2 i e^{it}$, so $|z'(t)| = 2$. $\operatorname{len}(C) = \int_{-\pi/2}^{\pi/2} 2\,dt = 2\pi.$

### Application 1 — Bound on $\int z^2\,dz$ over a segment

**Problem.** Find an upper bound for $\left| \int_C z^2\,dz \right|$, where $C$ is the straight line from $0$ to $1 + i$.

*Strategy.* Use ML.

*Step 1: $M$.* On $C$, parametrise $z(t) = t + it, 0 \le t \le 1$. Then $|z|^2 = 2 t^2 \le 2$, so $|z^2| = |z|^2 \le 2$. Take $M = 2$.

*Step 2: $L$.* $z'(t) = 1 + i$, $|z'(t)| = \sqrt 2$. $L = \int_0^1 \sqrt 2\,dt = \sqrt 2.$

*Step 3.* $\left| \int_C z^2\,dz \right| \le 2 \sqrt 2.$

*Verification.* The exact value (from Example 3) is $\frac{(1+i)^3}{3} = \frac{-2+2i}{3}$, with modulus $\frac{2\sqrt 2}{3} \approx 0.943$. The bound $2\sqrt 2 \approx 2.83$ holds. $\checkmark$

### Application 2 — Reverse triangle inequality

**Problem.** Let $C$ be the arc of $|z| = 2$ from $z = 2$ to $z = -2i$ in the first quadrant. Show that
$$\left|\int_C \frac{z + 4}{z^3 - 1}\,dz\right| \le \frac{6\pi}{7}.$$

*Strategy.* Use ML. The bound on $|z^3 - 1|$ in the denominator requires the **reverse triangle inequality**.

*Reverse triangle inequality (proof).* For $a, b \in \mathbb{C}$:
$$|a| = |a + b - b| \le |a + b| + |b| \implies |a + b| \ge |a| - |b|.$$
By symmetry $|a + b| \ge |b| - |a|$. Combining:
$$|a + b| \ge \big| |a| - |b| \big|. \quad\blacksquare$$

*Step 1: Bound $|f(z)|$ on $C$.*

Numerator: $|z + 4| \le |z| + 4 = 2 + 4 = 6$ (triangle inequality, since $|z| = 2$).

Denominator: $|z^3 - 1| \ge \big| |z^3| - 1 \big| = |8 - 1| = 7$ (reverse triangle, $|z^3| = 8$).

So $|f(z)| \le 6/7$ on $C$. Take $M = 6/7$.

*Step 2: Length.* $C$ is one quarter of $|z| = 2$, so $L = \frac{1}{4} \cdot (2\pi \cdot 2) = \pi.$ (Or directly: $z = 2 e^{it}, -\pi/2 \le t \le 0$ gives $L = \int_{-\pi/2}^0 2\,dt = \pi$ — but the problem says first-quadrant arc from $2$ to $-2i$ which actually traverses an angle… let me recompute the angular range based on the problem statement: from $2$ ($t=0$) to $-2i$ ($t = -\pi/2$), so length $= \pi$. ✓)

*Step 3.* $\left|\int_C f\,dz\right| \le M L = \tfrac{6}{7} \cdot \pi = \tfrac{6\pi}{7}. \quad\blacksquare$

---

## 19.10 Worked Examples (Drill)

**Example 9.** Evaluate $\displaystyle\oint_{|z|=1} \overline{z}\,dz.$

*Solution.* $\overline z$ is **not analytic** anywhere (fails Cauchy–Riemann). So the antiderivative method fails — we parametrise.

$z(t) = e^{it}, -\pi \le t \le \pi$. Then $\overline{z(t)} = e^{-it}$ and $z'(t) = i e^{it}$.
$$\oint_C \overline z\,dz = \int_{-\pi}^\pi e^{-it} \cdot i e^{it}\,dt = i \int_{-\pi}^\pi 1\,dt = 2\pi i.$$

**Example 10.** Evaluate $\displaystyle\oint_{|z|=1} \frac{1}{z^2}\,dz.$

*Solution.* By the fundamental integral with $m = -2$: answer is $0$.

*Direct check.* Antiderivative $-1/z$ exists on $\mathbb{C} \setminus \{0\}$ (single-valued, unlike $\log z$). On the closed loop, the antiderivative returns to its start, giving $0$.

**Example 11.** Bound $\left| \oint_{|z|=R} \frac{dz}{z^4 + 1} \right|$ for $R > 1$.

*Solution.* On $|z| = R$, $|z^4 + 1| \ge R^4 - 1$ (reverse triangle). So $M = 1/(R^4 - 1)$, $L = 2\pi R$, giving the bound $\dfrac{2\pi R}{R^4 - 1}$.

---

## 19.11 Practice Problems

1. Compute $\displaystyle\int_0^{2 + i} z\,dz$ along (a) the straight line from $0$ to $2 + i$; (b) the path going from $0$ to $2$ to $2 + i$. Show the answers agree, and justify why.

2. Evaluate $\displaystyle\oint_{|z|=1} z \overline z\,dz.$

3. Evaluate $\displaystyle\oint_{|z|=2} (z - 1)^{-1}\,dz$ directly by parametrisation.

4. Use the ML-inequality to show $\left|\displaystyle\oint_{|z|=R} \frac{e^z}{z^2}\,dz\right| \le \frac{2\pi e^R}{R}$ for $R > 0$.

5. Find an upper bound for $\left|\displaystyle\int_C \frac{dz}{z^2 - 1}\right|$, where $C$ is the line segment from $z = 2$ to $z = 2 + 2i$.

### Solutions

**Solution 1.** Let $f(z) = z$, which is entire with antiderivative $F(z) = z^2/2$. Both paths (a) and (b) are contours from $0$ to $2 + i$ in $\mathbb C$ (a SCD), so
$$\int_C z\,dz = F(2+i) - F(0) = \frac{(2+i)^2}{2} = \frac{4 + 4i + i^2}{2} = \frac{3 + 4i}{2} = \tfrac{3}{2} + 2i.$$
Same value along (a) and (b) — the antiderivative principle guarantees path independence.

**Solution 2.** $z \overline z = |z|^2$. On $|z| = 1$, $z \overline z = 1$. So
$$\oint_C 1\,dz = \int_{-\pi}^\pi 1 \cdot i e^{it}\,dt = i \cdot \frac{e^{it}}{i}\bigg|_{-\pi}^\pi = e^{i\pi} - e^{-i\pi} = -1 - (-1) = 0.$$
(The integrand is constant $1$ along $C$, integrating to zero around any closed loop.)

**Solution 3.** $C : |z| = 2$, so $z(t) = 2 e^{it}, -\pi \le t \le \pi$, $z'(t) = 2i e^{it}$.
$$\oint_C \frac{dz}{z - 1} = \int_{-\pi}^\pi \frac{2 i e^{it}}{2 e^{it} - 1}\,dt.$$
Direct computation is messy; alternatively, since $1$ is inside $|z| = 2$, by the formula $\oint (z - z_0)^{-1}\,dz = 2\pi i$ for any simple closed contour enclosing $z_0$ (proved via the deformation principle, [[20-cauchy-integral-theorem-detailed]]), the answer is $2\pi i$.

**Solution 4.** On $|z| = R$, $|e^z| = e^{\operatorname{Re} z} \le e^{|z|} = e^R$. And $|z^2| = R^2$. So $|f(z)| \le e^R / R^2$. Length $L = 2\pi R$. ML gives
$$\left|\oint f\,dz\right| \le \frac{e^R}{R^2} \cdot 2\pi R = \frac{2\pi e^R}{R}. \quad\blacksquare$$

**Solution 5.** Parametrise $C : z = 2 + i t, 0 \le t \le 2$. Then $|z|^2 = 4 + t^2$, so $|z| \ge 2$ and $|z|^2 \ge 4$. Reverse triangle: $|z^2 - 1| \ge |z^2| - 1 = (4 + t^2) - 1 \ge 3$ on $C$. Hence $\left|\frac{1}{z^2 - 1}\right| \le \frac{1}{3}$. Length: $L = 2$. So
$$\left|\int_C \frac{dz}{z^2 - 1}\right| \le \frac{1}{3} \cdot 2 = \frac{2}{3}.$$

---

## 19.12 Cross-References

- **Summary chapter:** [[14-contour-integration-cauchy]]
- **Next:** [[20-cauchy-integral-theorem-detailed]] — Cauchy's Integral Theorem, principle of deformation, Cauchy Integral Formula
- **Series/residues:** [[15-taylor-laurent-series]], [[16-singularities-residues]], [[17-real-integrals-residues]]
