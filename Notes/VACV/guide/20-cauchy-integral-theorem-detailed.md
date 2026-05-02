# 20. Cauchy's Integral Theorem & Formula (Detailed Treatment)

> **Source.** Lectures 26–27, MAT 2238 (March 22 / 25, 2025). References: Kreyszig pp. 652–660, Churchill 8th ed. p. 159. Companion to [[14-contour-integration-cauchy]] (summary). This chapter dissects the Cauchy Integral Theorem ingredient by ingredient, develops the **principle of deformation of paths**, and builds up to the **Cauchy Integral Formula** with the derivative formulas of all orders.

---

## 20.1 Cauchy's Integral Theorem (CIT)

> **Theorem (Cauchy's Integral Theorem; Kreyszig p. 652).** Let $f(z)$ be analytic in a simply connected domain $D$. Then for every simple closed contour $C$ lying in $D$,
> $$\boxed{\oint_C f(z)\,dz = 0.}$$

**On the proof.** Cauchy himself proved this assuming $f'$ is continuous, using Green's theorem. Goursat later removed the continuity hypothesis on $f'$. We use it as given (for the standard MAT 2238 syllabus, the continuous-derivative version suffices). See Kreyszig p. 654 for the Green's-theorem proof.

### Three ingredients

CIT has **three** essential ingredients. Removing any one can break the conclusion.

**(1) Analyticity.** $f$ must be analytic on (or rather *throughout*) the relevant domain $D$.
**(2) Simple connectedness of $D$.** The domain must have no "holes."
**(3) Closed contour.** $C$ must be closed (and simple).

### Examples where CIT applies

For any **closed** contour $C$ in $\mathbb{C}$:
- $\oint_C e^z\,dz = 0$ ($e^z$ entire).
- $\oint_C \cos z\,dz = 0$ ($\cos z$ entire).
- $\oint_C z^n\,dz = 0$ for $n = 0, 1, 2, \ldots$ ($z^n$ entire).

**Example 1.** $\oint_C \sec z\,dz$ where $C$ is the unit circle.

$\sec z = 1/\cos z$ has singularities where $\cos z = 0$, i.e., at $z = \pi/2 + n\pi, n \in \mathbb{Z}$. The closest is $z = \pm\pi/2$, with $|\pi/2| \approx 1.57 > 1$. So all singularities lie *outside* $|z| = 1$. We can find a SCD containing the unit circle (e.g., $D = \{z : |z| < 1 + \pi/4\}$) on which $\sec z$ is analytic. By CIT, $\oint_C \sec z\,dz = 0$.

**Example 2.** $\oint_C \dfrac{1}{z^2 + 4}\,dz$ where $C$ is the unit circle.

Singularities at $z = \pm 2i$, with $|\pm 2i| = 2 > 1$. Outside $C$. So $1/(z^2+4)$ is analytic on a SCD containing $C$, and the integral is $0$.

### The fundamental non-example

**Example 3.** $\oint_C \overline z\,dz$ where $C : |z| = 1$.

$\overline z$ is **not** analytic on any SCD that contains $C$ (it isn't analytic anywhere — fails Cauchy–Riemann). CIT does not apply.

By direct computation (Lec 23 Example 9 / [[19-complex-integration-detailed]] Example 9), the integral equals $2\pi i \ne 0$.

**Take-away.** CIT requires analyticity. Without it the integral can be nonzero.

---

## 20.2 Why Each of the Three Ingredients Matters

We illustrate by removing each ingredient separately.

### (1) Removing analyticity

Considered in Example 3 above. Conclusion: if $f$ is not analytic on a SCD containing $C$, the integral may be nonzero ($2\pi i$ in that case).

### (2) Removing simple connectedness

> **Definition (Multiply connected domain).** A domain that is *not* simply connected is **multiply connected**. The annulus $\{z : r_1 < |z - a| < r_2\}$ is doubly connected. A region with two holes is triply connected, etc.

**Key example.** Consider $\oint_C \dfrac{1}{z^2}\,dz$ where $C : |z| = 1$.

$1/z^2$ is *not* analytic on any SCD containing $C$ (the origin is in any SCD containing $C$, since $C$ encircles $0$). So CIT does not apply directly. Yet:

*Direct computation.*
$$\oint_C \frac{dz}{z^2} = \int_{-\pi}^\pi \frac{i e^{it}}{e^{2it}}\,dt = i \int_{-\pi}^\pi e^{-it}\,dt = 0.$$
(Using the auxiliary lemma from [[19-complex-integration-detailed]] §19.7.)

So:
$$\boxed{f \text{ analytic on a SCD } D \supseteq C \;\Longrightarrow\; \oint_C f\,dz = 0,}$$
but the **converse is false**: $\oint_C f = 0$ does not imply analyticity on a SCD. The integral can be zero "accidentally" even on multiply connected domains.

For $f(z) = 1/z$, however, the integral *is* nonzero ($2\pi i$, see [[19-complex-integration-detailed]]). So multiply-connected behaviour is genuinely interesting.

### (3) Removing "closed"

CIT requires a *closed* contour. Without closure, the conclusion fails.

**Example 4 (typical).** For $f(z) = e^{z/2}$ (entire),
$$\int_{8 + \pi i}^{8 - 3\pi i} e^{z/2}\,dz = 2 e^{z/2}\bigg|_{8+\pi i}^{8 - 3\pi i} = 0.$$
Here the integral happens to vanish because the path endpoints differ by $2\pi i \cdot 2 = 4\pi i$ wait — actually because $e^{(8 - 3\pi i)/2} = e^{4 - 3\pi i / 2} = e^4 \cdot e^{-3\pi i/2} = e^4 (i)$ and similarly the other endpoint. The non-closed integral can be any complex number; closure is what forces $0$ (when $f$ is analytic on a SCD).

---

## 20.3 The Fundamental Integral $\oint_C (z - z_0)^m\,dz$ via CIT

> **Setup.** Let $z_0 \in \mathbb{C}$, $m \in \mathbb{Z}$, and $\gamma$ any simple closed contour enclosing $z_0$ (CCW).

**Claim.**
$$\oint_\gamma (z - z_0)^m\,dz = \begin{cases} 2\pi i, & m = -1, \\ 0, & m \ne -1, m \in \mathbb{Z}.\end{cases}$$

**Proof.**

*Case $m \ge 0$.* $(z - z_0)^m$ is entire; analyticity holds on any SCD containing $\gamma$. By CIT, integral $= 0$.

*Case $m \le -2$.* $(z - z_0)^m$ is analytic on $\mathbb{C} \setminus \{z_0\}$ and has antiderivative $\dfrac{(z - z_0)^{m+1}}{m+1}$ (which is single-valued, since $m + 1 \ne 0$). Around the closed contour $\gamma$, the antiderivative returns to its starting value, giving $0$.

But wait — $\gamma$ encircles $z_0$, so $\gamma$ is not in any SCD where $(z-z_0)^m$ is analytic. The argument needs the principle of deformation (§20.4). For now, accept that the answer is $0$, computed directly on the circle $|z - z_0| = \rho$ via [[19-complex-integration-detailed]] §19.7.

*Case $m = -1$.* On the circle $|z - z_0| = \rho$:
$$\oint \frac{dz}{z - z_0} = \int_{-\pi}^\pi \frac{i\rho e^{it}}{\rho e^{it}}\,dt = 2\pi i.$$

For an arbitrary simple closed contour $\gamma$ around $z_0$, use the deformation principle (§20.4) to replace $\gamma$ by a small circle around $z_0$, getting the same value $2\pi i$. $\blacksquare$

**Key takeaway.** The integral around any simple closed contour enclosing $z_0$ counterclockwise depends only on the winding around $z_0$, not on the contour's shape — a theme that crystallises in §20.4.

---

## 20.4 Principle of Deformation of Paths

> **Theorem (Principle of deformation).** Let $C_1$ and $C_2$ be two positively oriented simple closed contours, with $C_1$ inside $C_2$. If $f$ is analytic on a doubly connected domain $D$ that contains both contours and the region between them, then
> $$\boxed{\oint_{C_1} f(z)\,dz = \oint_{C_2} f(z)\,dz.}$$

**Reference.** Churchill 8th ed., p. 159.

### Proof

Cut the doubly connected region open with two crosscuts $\overline{AB}$ and $\overline{CD}$ to make it simply connected. Specifically, label four points $A, D$ on $C_2$ and $B, C$ on $C_1$, with $\overline{AB}$ and $\overline{CD}$ being the cut segments. (See accompanying figure in lecture notes.)

Define two simple closed contours:
$$\Gamma_1 = \overline{AB} + \widehat{BFC} + \overline{CD} + \widehat{DEA}, \qquad \Gamma_2 = \overline{AB} + \widehat{BGC} + \overline{CD} + \widehat{DHA},$$
where $\widehat{BFC}, \widehat{BGC}$ are arcs of $C_1$ on opposite sides of the crosscut, and similarly for $\widehat{DEA}, \widehat{DHA}$ on $C_2$.

Each $\Gamma_i$ encloses a simply connected subregion on which $f$ is analytic. By CIT,
$$\oint_{\Gamma_1} f\,dz = 0, \qquad \oint_{\Gamma_2} f\,dz = 0 \quad\Longrightarrow\quad \oint_{\Gamma_1 + \Gamma_2} f\,dz = 0.$$

Adding the two and noting that the crosscuts $\overline{AB}, \overline{CD}$ are traversed *both* in forward and reverse direction (so their contributions cancel):
$$0 = \int_{\widehat{DEA}} f + \int_{\widehat{AHD}} f \;-\; \int_{\widehat{BFC}} f - \int_{\widehat{CGB}} f.$$

The first pair reassembles into $-\oint_{C_2} f$ (note signs: $\widehat{DEA}$ and $\widehat{AHD}$ together = $C_2$ traversed once CCW with a sign reversal pattern). The second pair reassembles into $-\oint_{C_1} f$ traversed CCW.

Working through the signs:
$$\oint_{C_2} f\,dz = \oint_{C_1} f\,dz. \quad\blacksquare$$

(A clean modern presentation uses the **fundamental class** of homology; for our purposes the figure-and-cancellation argument is sufficient.)

### Geometric interpretation

If $C_1$ can be **continuously deformed** into $C_2$ through a family of simple closed contours all lying in the analyticity region, then the integral is unchanged by the deformation. The integral is a **topological invariant** of the contour relative to the singularities of $f$.

### CIT for doubly connected domains

The deformation principle is equivalent to:
> If $f$ is analytic on the closed region between $C_1$ and $C_2$ (with $C_1$ inside $C_2$), then $\oint_{C_2} f - \oint_{C_1} f = 0$, i.e., $\oint_{\partial R} f = 0$ where $\partial R$ is the boundary traversed in the standard sense (outer CCW, inner CW).

### CIT for triply connected domains

If $f$ is analytic on a triply connected region with outer boundary $C_3$ and inner boundaries $C_1, C_2$ (both CCW), then
$$\oint_{C_3} f\,dz = \oint_{C_1} f\,dz + \oint_{C_2} f\,dz.$$

By induction, for an $(n+1)$-tuply connected region with outer $C$ and inner $C_1, \ldots, C_n$:
$$\oint_C f\,dz = \sum_{k=1}^n \oint_{C_k} f\,dz.$$

### Application: extending the fundamental integral

> **Conclusion.** For any simple closed contour $\gamma$ enclosing $z_0$ (CCW),
> $$\oint_\gamma (z - z_0)^m\,dz = \begin{cases} 2\pi i, & m = -1, \\ 0, & m \ne -1, m \in \mathbb{Z}. \end{cases}$$
> *(No restriction to circles — the deformation principle lets us replace any such $\gamma$ by a small circle $|z - z_0| = \rho$.)*

---

## 20.5 Worked Examples — Applying CIT

These are from Kreyszig p. 659, Problem Set 14.2.

For each, $C$ is the unit circle (CCW). Decide whether $\oint_C f\,dz$ can be computed by CIT.

| $f(z)$ | Singularities | Inside $C$? | CIT applies? | Integral |
|---|---|---|---|---|
| $e^{z^2}$ | none (entire) | — | yes | $0$ |
| $1/(4z - 1)$ | $z = 1/4$ | yes | **no** ($z_0$ inside) | (CIF, §20.6) |
| $1/(z^4 - 1.2)$ | $z^4 = 1.2$, $|z| = 1.2^{1/4} > 1$ | no | yes | $0$ |
| $1/\bar z$ | $\bar z$ not analytic | — | **no** | (compute directly) |
| $\operatorname{Re} z$ | not analytic | — | **no** | (compute directly) |
| $1/(\pi z - 1)$ | $z = 1/\pi$, inside | yes | **no** | (CIF) |
| $1/|z|^2$ | not analytic | — | **no** | — |
| $1/(5z - 1)$ | $z = 1/5$, inside | yes | **no** | (CIF) |
| $\bar z^3$ | not analytic | — | **no** | — |
| $\log(1 - z)$ | $1 - z \le 0$ requires $z \ge 1$ — branch point at $z = 1$ on the boundary | — | depends on $C$ | careful! |

*Sample resolution: $f(z) = 1/(z^4 - 1.2)$.* Singularities at $z^4 = 1.2$, i.e., $|z| = 1.2^{1/4} \approx 1.047 > 1$. So all four singularities lie outside $C$. There is a SCD (e.g., $|z| < 1.04$) containing $C$ on which $f$ is analytic. By CIT, $\oint_C f\,dz = 0.$

### Example 5 — Log on a parallelogram

**Problem.** Evaluate $\oint_C \log(1 - z)\,dz$, where $C$ is the parallelogram with vertices $\pm i$ and $\pm(1 + i)$.

*Analysis.* $\log(1 - z)$ is the principal logarithm, analytic when $1 - z \notin (-\infty, 0]$, i.e., when $z \ne 1, 2, 3, \ldots$. The branch cut starts at $z = 1$ and extends along the real axis to $+\infty$. Within the parallelogram (vertices $\pm i, \pm(1+i)$), this entire branch cut $z \in [1, \infty)$ lies outside (the rightmost extent of the parallelogram is $\operatorname{Re} z = 1$, on the boundary at the corners $1 + i$ and $1 - i$). Actually the parallelogram has vertices at $\pm i$ on the imaginary axis and $\pm(1 + i)$, so it spans $-1 \le \operatorname{Re} z \le 1$. The branch cut $[1, \infty)$ does not enter the *interior*.

By CIT (the branch cut and the singularity at $z = 1$ touch only the boundary corner $1 + i$ but do not penetrate the open interior), $\log(1 - z)$ is analytic on a SCD containing $C$ (with care at the boundary), hence $\oint_C \log(1 - z)\,dz = 0$.

### Example 6 — Deformation in action

**Problem.** Evaluate $\oint_C \dfrac{dz}{4z - 1}$ where $C$ is the unit circle.

*Analysis.* Singularity at $z = 1/4$, *inside* $C$. CIT does not apply.

*Trick: rewrite to use the fundamental integral.* $\dfrac{1}{4z - 1} = \dfrac{1/4}{z - 1/4}$. So
$$\oint_C \frac{dz}{4z - 1} = \frac{1}{4} \oint_C \frac{dz}{z - 1/4}.$$

By the deformation principle, $\oint_C \frac{dz}{z - 1/4} = \oint_{C_1} \frac{dz}{z - 1/4}$, where $C_1$ is any small circle around $1/4$, e.g., $|z - 1/4| = 3/4$. By the fundamental integral, this equals $2\pi i$. So
$$\oint_C \frac{dz}{4z - 1} = \frac{1}{4} \cdot 2\pi i = \frac{\pi i}{2}.$$

This is the **Cauchy Integral Formula** in action — formalised next.

---

## 20.6 Cauchy's Integral Formula (CIF)

> **Theorem (Cauchy Integral Formula; Kreyszig p. 660).** Let $f$ be analytic everywhere inside and on a simple closed contour $C$ (CCW), in a SCD $D$. Then for any point $z_0$ inside $C$,
> $$\boxed{f(z_0) = \frac{1}{2\pi i} \oint_C \frac{f(z)}{z - z_0}\,dz.}$$

**Equivalent form.** $\displaystyle\oint_C \frac{f(z)}{z - z_0}\,dz = 2\pi i\,f(z_0)$.

**Strength of the conclusion.** The values of $f$ on the boundary $C$ completely determine $f$ inside $C$ — a very strong rigidity property of analytic functions, with no real-analysis analogue.

### Proof sketch

Let $C_\rho : |z - z_0| = \rho$ be a small circle around $z_0$, with $\rho$ chosen so $C_\rho$ lies inside $C$. By the deformation principle,
$$\oint_C \frac{f(z)}{z - z_0}\,dz = \oint_{C_\rho} \frac{f(z)}{z - z_0}\,dz.$$

On $C_\rho$, write $f(z) = f(z_0) + [f(z) - f(z_0)]$:
$$\oint_{C_\rho} \frac{f(z)}{z - z_0}\,dz = f(z_0) \oint_{C_\rho} \frac{dz}{z - z_0} + \oint_{C_\rho} \frac{f(z) - f(z_0)}{z - z_0}\,dz.$$

The first integral is $2\pi i$. For the second, $f$ is continuous so $|f(z) - f(z_0)| \to 0$ as $z \to z_0$. By ML on a small enough $C_\rho$, this integral can be made arbitrarily small. Letting $\rho \to 0$ shows it must be $0$.

Hence $\oint_C \frac{f(z)}{z - z_0}\,dz = 2\pi i f(z_0)$. $\blacksquare$

### Worked examples on CIF

**Example 7.** $\displaystyle\oint_{|z|=2} \frac{e^z}{z - 1}\,dz$.

$f(z) = e^z$ is entire; $z_0 = 1$ is inside $|z| = 2$. By CIF: $2\pi i \cdot e^1 = 2\pi e i$.

**Example 8.** $\displaystyle\oint_{|z| = 1} \frac{z^2}{z - 2}\,dz$.

$z_0 = 2$ is *outside* $|z| = 1$. The integrand $z^2/(z-2)$ is analytic on a SCD containing $|z| = 1$. CIF/CIT: integral $= 0$.

**Example 9.** $\displaystyle\oint_{|z - i| = 2} \frac{z}{z^2 + 1}\,dz$.

Factor: $z^2 + 1 = (z - i)(z + i)$. Inside $|z - i| = 2$: $z = i$ is at the centre (inside), $z = -i$ has $|-i - i| = 2$, exactly on the boundary — undefined singularity on the contour means the integral is technically improper. Assuming the problem intends $|z - i| = r$ for some $r$ slightly less than $2$ (so $-i$ is outside), only $z = i$ is inside.

Write $\dfrac{z}{(z-i)(z+i)} = \dfrac{f(z)}{z - i}$ with $f(z) = \dfrac{z}{z + i}$. Then $f(i) = \dfrac{i}{2i} = \dfrac{1}{2}$, and CIF gives
$$\oint = 2\pi i \cdot \tfrac{1}{2} = \pi i.$$

---

## 20.7 Cauchy's Integral Formula for Derivatives

> **Theorem (Generalised CIF).** Let $f$ be analytic in a domain $D$. Then $f$ has derivatives of all orders in $D$, and for any simple closed contour $C$ in $D$ enclosing a point $z_0 \in D$ (with full interior in $D$, CCW),
> $$\boxed{f^{(n)}(z_0) = \frac{n!}{2\pi i} \oint_C \frac{f(z)}{(z - z_0)^{n+1}}\,dz, \qquad n = 0, 1, 2, \ldots}$$

(For $n = 0$: ordinary CIF. For $n \ge 1$: derivative formulas.)

**Consequence.** An analytic function is **infinitely differentiable** — a remarkable contrast with real analysis, where $C^k$ does not imply $C^{k+1}$ (e.g., $|x|^3$ is $C^2$ but not $C^3$ at $0$). In complex analysis, "differentiable once" implies "differentiable forever and analytic."

### Proof sketch (for $n = 1$)

From CIF, $f(z_0 + h) - f(z_0) = \frac{1}{2\pi i} \oint_C f(z) \left[ \frac{1}{z - z_0 - h} - \frac{1}{z - z_0}\right]\,dz$. Compute the bracketed quantity:
$$\frac{1}{z - z_0 - h} - \frac{1}{z - z_0} = \frac{h}{(z - z_0 - h)(z - z_0)}.$$

Hence
$$\frac{f(z_0 + h) - f(z_0)}{h} = \frac{1}{2\pi i} \oint_C \frac{f(z)}{(z - z_0 - h)(z - z_0)}\,dz.$$

Letting $h \to 0$ inside the integral (justifiable by uniform continuity on compact $C$):
$$f'(z_0) = \frac{1}{2\pi i} \oint_C \frac{f(z)}{(z - z_0)^2}\,dz.$$

The general formula follows by induction. $\blacksquare$

### Worked examples on the derivative formula

**Example 10.** $\displaystyle\oint_C \frac{\cos z}{(z - \pi i)^2}\,dz$, $C$ encloses $\pi i$.

This is the $n = 1$ formula with $f(z) = \cos z$, $z_0 = \pi i$:
$$\oint_C \frac{\cos z}{(z - \pi i)^2}\,dz = \frac{2\pi i}{1!}\,f'(\pi i) = 2\pi i \cdot (-\sin(\pi i)) = -2\pi i \sin(\pi i).$$

Using $\sin(\pi i) = i \sinh(\pi)$, the answer is $-2\pi i \cdot i \sinh \pi = 2\pi \sinh \pi$.

**Example 11.** $\displaystyle\oint_C \frac{z^4 - 3z^2 + 6}{(z + i)^3}\,dz$, $C$ encloses $-i$.

This is $n = 2$ with $f(z) = z^4 - 3z^2 + 6$, $z_0 = -i$.

$f'(z) = 4z^3 - 6z, \; f''(z) = 12z^2 - 6$. So $f''(-i) = 12(-1) - 6 = -18$.

By the formula:
$$\oint = \frac{2\pi i}{2!} \cdot f''(-i) = \pi i \cdot (-18) = -18\pi i.$$

---

## 20.8 Practice Problems

1. Determine whether CIT applies to $\displaystyle\oint_{|z|=1} f(z)\,dz$ for each of:
   (a) $f(z) = z e^{z}$, (b) $f(z) = \dfrac{1}{z - 1/2}$, (c) $f(z) = \overline z^2$, (d) $f(z) = \dfrac{1}{z^2 + 9}$.

2. Use CIF to evaluate $\displaystyle\oint_{|z|=2} \dfrac{\sin z}{z}\,dz$.

3. Use the derivative form of CIF to evaluate $\displaystyle\oint_{|z|=1} \dfrac{e^z}{z^4}\,dz$.

4. Evaluate $\displaystyle\oint_{|z|=3} \dfrac{z+1}{(z-1)(z-2)}\,dz$ using partial fractions and CIF.

5. By the deformation principle, show that $\displaystyle\oint_C \dfrac{dz}{z - z_0} = 2\pi i$ for *any* simple closed contour $C$ enclosing $z_0$ (CCW), without restricting $C$ to be a circle.

### Solutions

**Solution 1.**

(a) $z e^z$ is entire, so analytic on $\mathbb C \supseteq C$. CIT applies: $\oint = 0$. ✓

(b) Singularity at $z_0 = 1/2$, $|1/2| = 1/2 < 1$, *inside* $C$. CIT does **not** apply. (CIF gives $\oint = 2\pi i$.)

(c) $\overline z^2 = \overline{z^2}$ is *not* analytic anywhere. CIT does **not** apply.

Direct computation: $\oint_C \overline{z}^2\,dz = \int_{-\pi}^\pi (e^{-it})^2 \cdot ie^{it}\,dt = i \int_{-\pi}^\pi e^{-it}\,dt = 0$. So the answer happens to be $0$ (not by CIT but coincidentally).

(d) Singularities at $z = \pm 3i$, with $|\pm 3i| = 3 > 1$. Outside $C$. CIT applies: $\oint = 0$. ✓

**Solution 2.** $\sin z$ is entire; $z_0 = 0$ is inside $|z| = 2$. By CIF (with $f(z) = \sin z$):
$$\oint_C \frac{\sin z}{z}\,dz = 2\pi i \cdot \sin 0 = 0.$$

**Solution 3.** This is the $n = 3$ formula with $f(z) = e^z$, $z_0 = 0$:
$$\oint_C \frac{e^z}{z^4}\,dz = \frac{2\pi i}{3!} f^{(3)}(0) = \frac{2\pi i}{6} \cdot e^0 = \frac{\pi i}{3}.$$

**Solution 4.** Partial fractions:
$$\frac{z + 1}{(z - 1)(z - 2)} = \frac{A}{z - 1} + \frac{B}{z - 2}.$$
Multiplying out: $z + 1 = A(z - 2) + B(z - 1)$. At $z = 1$: $2 = -A$, so $A = -2$. At $z = 2$: $3 = B$.

Both $z = 1$ and $z = 2$ lie inside $|z| = 3$. So
$$\oint_C \frac{z+1}{(z-1)(z-2)}\,dz = -2 \cdot 2\pi i + 3 \cdot 2\pi i = 2\pi i.$$

**Solution 5.** Let $C$ be any simple closed contour enclosing $z_0$ CCW. Choose $\rho > 0$ small enough that $C_\rho : |z - z_0| = \rho$ lies inside $C$ and the annular region between them is contained in $\mathbb{C} \setminus \{z_0\}$ (where $1/(z - z_0)$ is analytic).

By the principle of deformation:
$$\oint_C \frac{dz}{z - z_0} = \oint_{C_\rho} \frac{dz}{z - z_0}.$$

On $C_\rho$, parametrise $z = z_0 + \rho e^{it}, -\pi \le t \le \pi$. Then
$$\oint_{C_\rho} \frac{dz}{z - z_0} = \int_{-\pi}^\pi \frac{i \rho e^{it}}{\rho e^{it}}\,dt = 2\pi i.$$

Hence $\oint_C \frac{dz}{z - z_0} = 2\pi i$ for any such $C$. $\blacksquare$

---

## 20.9 Summary

| Result | Statement |
|---|---|
| **CIT** | $f$ analytic on SCD $D$ $\implies \oint_C f = 0$ for any simple closed $C \subset D$. |
| **Three ingredients** | analyticity, simple connectedness, closed contour. |
| **Fundamental integral** | $\oint_C (z - z_0)^m\,dz = 2\pi i$ if $m = -1$, else $0$, for $C$ enclosing $z_0$ CCW. |
| **Deformation principle** | If $f$ analytic between $C_1$ and $C_2$ (both CCW, $C_1$ inside $C_2$), $\oint_{C_1} f = \oint_{C_2} f$. |
| **CIT (multiply connected)** | $\oint_{\partial R} f = 0$ for boundary of multiply connected region with $f$ analytic on $\overline R$. |
| **CIF** | $f(z_0) = \dfrac{1}{2\pi i}\oint_C \dfrac{f(z)}{z - z_0}\,dz$. |
| **Generalised CIF** | $f^{(n)}(z_0) = \dfrac{n!}{2\pi i}\oint_C \dfrac{f(z)}{(z - z_0)^{n+1}}\,dz$. |
| **Consequence** | Analytic ⟹ infinitely differentiable. |

## Cross-References

- **Previous:** [[19-complex-integration-detailed]] — contour integral definitions, ML inequality
- **Summary chapter:** [[14-contour-integration-cauchy]] — concise statements
- **Next:** [[15-taylor-laurent-series]] — power series expansion of analytic functions; [[16-singularities-residues]] — residues from the $m = -1$ case; [[17-real-integrals-residues]] — application to real integrals.
