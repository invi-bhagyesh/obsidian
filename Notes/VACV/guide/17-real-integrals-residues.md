# 17. Evaluation of Real Integrals Using Residues

---

## 17.1 Overview

The residue theorem provides powerful techniques for evaluating real integrals that are difficult or impossible by elementary methods. There are several standard types.

---

## 17.2 Type I: Trigonometric Integrals $\int_0^{2\pi}R(\cos\theta,\sin\theta)\,d\theta$

### Setup
For integrals of the form $\int_0^{2\pi}R(\cos\theta,\sin\theta)\,d\theta$ where $R$ is a rational function:

**Substitution:** Let $z = e^{i\theta}$, so $dz = ie^{i\theta}d\theta = iz\,d\theta$, i.e., $d\theta = \frac{dz}{iz}$.

Then:
$$\cos\theta = \frac{z+z^{-1}}{2}, \qquad \sin\theta = \frac{z-z^{-1}}{2i}$$

The integral becomes a contour integral over the unit circle $|z| = 1$:

$$\int_0^{2\pi}R(\cos\theta,\sin\theta)\,d\theta = \oint_{|z|=1}R\left(\frac{z+z^{-1}}{2},\frac{z-z^{-1}}{2i}\right)\frac{dz}{iz}$$

Then evaluate using the residue theorem (summing residues inside $|z| = 1$).

### Example

Evaluate $I = \int_0^{2\pi}\frac{d\theta}{2+\cos\theta}$.

*Solution:*
$\cos\theta = (z+z^{-1})/2$. So $2+\cos\theta = 2+(z+z^{-1})/2 = (4+z+z^{-1})/2 = (z^2+4z+1)/(2z)$.

$I = \oint_{|z|=1}\frac{1}{(z^2+4z+1)/(2z)}\cdot\frac{dz}{iz} = \oint_{|z|=1}\frac{2z}{z^2+4z+1}\cdot\frac{dz}{iz} = \frac{2}{i}\oint_{|z|=1}\frac{dz}{z^2+4z+1}$

Roots of $z^2+4z+1 = 0$: $z = \frac{-4\pm\sqrt{16-4}}{2} = -2\pm\sqrt{3}$.

$z_1 = -2+\sqrt{3} \approx -0.27$ (inside $|z|=1$), $z_2 = -2-\sqrt{3} \approx -3.73$ (outside).

$\text{Res}_{z=z_1}\frac{1}{z^2+4z+1} = \frac{1}{2z_1+4} = \frac{1}{2(-2+\sqrt{3})+4} = \frac{1}{2\sqrt{3}}$.

$I = \frac{2}{i}\cdot 2\pi i\cdot\frac{1}{2\sqrt{3}} = \frac{2\pi}{\sqrt{3}}$.

---

## 17.3 Type II: Improper Integrals $\int_{-\infty}^{\infty}\frac{p(x)}{q(x)}\,dx$

### Setup
For $\int_{-\infty}^{\infty}\frac{p(x)}{q(x)}\,dx$ where $p, q$ are polynomials with $\deg q \geq \deg p + 2$ and $q$ has no real zeros:

1. Consider $\oint_C \frac{p(z)}{q(z)}\,dz$ where $C$ is the **semicircular contour**: real axis from $-R$ to $R$ plus the upper semicircle $\Gamma_R: z = Re^{i\theta}$, $0 \leq \theta \leq \pi$.

2. On $\Gamma_R$, $\left|\frac{p(z)}{q(z)}\right| \sim R^{\deg p - \deg q} \to 0$ as $R \to \infty$ (since $\deg q \geq \deg p + 2$). So $\int_{\Gamma_R}\to 0$.

3. Therefore:
$$\int_{-\infty}^{\infty}\frac{p(x)}{q(x)}\,dx = 2\pi i\sum\text{Res (upper half-plane)}$$

### Example

Evaluate $I = \int_{-\infty}^{\infty}\frac{dx}{(x^2+1)(x^2+4)}$.

*Solution:*

**Step 1.** Verify the degree condition: $\deg q = 4$, $\deg p = 0$, so $\deg q - \deg p = 4 \geq 2$. The method applies, and the semicircular arc vanishes as $R \to \infty$.

**Step 2.** Use partial fractions to simplify residue computation:

$$\frac{1}{(z^2+1)(z^2+4)} = \frac{1}{3}\!\left(\frac{1}{z^2+1} - \frac{1}{z^2+4}\right)$$

**Step 3.** Identify poles in the upper half-plane: $z = i$ (from $z^2+1$) and $z = 2i$ (from $z^2+4$), both simple.

**Step 4.** Compute residues. For a simple pole of $\frac{1}{z^2+a^2}$ at $z = ai$, the residue is $\frac{1}{2ai}$:

$$\text{Res}_{z=i}\frac{1}{3(z^2+1)} = \frac{1}{3}\cdot\frac{1}{2i} = \frac{1}{6i}$$

$$\text{Res}_{z=2i}\frac{-1}{3(z^2+4)} = \frac{-1}{3}\cdot\frac{1}{2(2i)} = \frac{-1}{12i}$$

**Step 5.** Sum residues:

$$\frac{1}{6i} - \frac{1}{12i} = \frac{2-1}{12i} = \frac{1}{12i}$$

**Step 6.** Apply $I = 2\pi i \cdot \sum\text{Res}$:

$$I = 2\pi i \cdot \frac{1}{12i} = \frac{\pi}{6}$$

---

## 17.4 Type III: Fourier-type Integrals $\int_{-\infty}^{\infty}\frac{p(x)}{q(x)}e^{iax}\,dx$

### Setup
For $\int_{-\infty}^{\infty}\frac{p(x)}{q(x)}e^{iax}\,dx$ with $a > 0$, $\deg q \geq \deg p + 1$:

Use the same semicircular contour. By **Jordan's Lemma**, $\int_{\Gamma_R}\frac{p(z)}{q(z)}e^{iaz}\,dz \to 0$ as $R \to \infty$ (the condition is weaker: only need $\deg q \geq \deg p + 1$).

$$\int_{-\infty}^{\infty}\frac{p(x)}{q(x)}e^{iax}\,dx = 2\pi i\sum\text{Res (upper half-plane)}$$

### Jordan's Lemma
> If $f(z) \to 0$ uniformly as $|z| \to \infty$ on the upper semicircle, then:
> $$\lim_{R\to\infty}\int_{\Gamma_R}f(z)e^{iaz}\,dz = 0 \quad (a > 0)$$

### Getting Real Integrals
To find $\int_{-\infty}^{\infty}\frac{p(x)}{q(x)}\cos(ax)\,dx$ or $\int_{-\infty}^{\infty}\frac{p(x)}{q(x)}\sin(ax)\,dx$:

Compute $\int_{-\infty}^{\infty}\frac{p(x)}{q(x)}e^{iax}\,dx$ and take the real or imaginary part.

### Example

Evaluate $I = \int_{-\infty}^{\infty}\frac{\cos x}{x^2+1}\,dx$.

*Solution:*
Consider $J = \int_{-\infty}^{\infty}\frac{e^{ix}}{x^2+1}\,dx$. Then $I = \text{Re}(J)$.

Pole in upper half-plane: $z = i$ (simple).

$\text{Res}_{z=i}\frac{e^{iz}}{z^2+1} = \frac{e^{i\cdot i}}{2i} = \frac{e^{-1}}{2i}$.

$J = 2\pi i\cdot\frac{e^{-1}}{2i} = \frac{\pi}{e}$.

Since $J$ is real, $I = \text{Re}(J) = \frac{\pi}{e}$.

---

## 17.5 Type IV: Integrals with Simple Poles on the Real Axis

If $f$ has simple poles on the real axis, use **indented contours**: small semicircular detours around the poles.

### Indented Path Lemma
If $f$ has a simple pole at $x_0$ on the real axis, and $C_\rho$ is the upper semicircle $z = x_0 + \rho e^{i\theta}$, $0 \leq \theta \leq \pi$, then:

$$\lim_{\rho\to 0}\int_{C_\rho}f(z)\,dz = -\pi i\cdot\text{Res}_{z=x_0}f(z)$$

(The minus sign comes from traversing the indentation in the clockwise direction.)

---

## 17.6 Summary of Methods

| Integral Type | Contour | Key Condition |
|---------------|---------|---------------|
| $\int_0^{2\pi}R(\cos\theta,\sin\theta)\,d\theta$ | Unit circle $|z|=1$ | $z=e^{i\theta}$ substitution |
| $\int_{-\infty}^{\infty}\frac{p(x)}{q(x)}\,dx$ | Upper semicircle | $\deg q \geq \deg p + 2$ |
| $\int_{-\infty}^{\infty}\frac{p(x)}{q(x)}e^{iax}\,dx$ | Upper semicircle | $a > 0$, $\deg q \geq \deg p + 1$ |
| Poles on real axis | Indented semicircle | Simple poles only |

**Always check:** Which poles are inside the contour? Only sum those residues.

---

## Worked Examples

**Example 1:** Evaluate $\int_0^{2\pi}\frac{d\theta}{5-4\cos\theta}$.

*Solution:*
$z = e^{i\theta}$, $\cos\theta = (z+z^{-1})/2$, $d\theta = dz/(iz)$.

$5-4\cos\theta = 5-2(z+z^{-1}) = \frac{-2z^2+5z-2}{z} = \frac{-(2z^2-5z+2)}{z} = \frac{-(2z-1)(z-2)}{z}$.

$I = \oint_{|z|=1}\frac{z}{-(2z-1)(z-2)}\cdot\frac{dz}{iz} = \frac{1}{-i}\oint\frac{dz}{(2z-1)(z-2)}$

$= \frac{-1}{i}\oint\frac{dz}{2(z-1/2)(z-2)}$.

Poles: $z = 1/2$ (inside), $z = 2$ (outside).

$\text{Res}_{z=1/2} = \frac{1}{2(1/2-2)} = \frac{1}{2(-3/2)} = \frac{-1}{3}$.

$I = \frac{-1}{i}\cdot 2\pi i\cdot\frac{-1}{3} = \frac{2\pi}{3}$.

**Example 2:** Evaluate $\int_0^{\infty}\frac{dx}{x^4+1}$.

*Solution:*
$\int_{-\infty}^{\infty}\frac{dx}{x^4+1} = 2\int_0^{\infty}\frac{dx}{x^4+1}$ (even function).

$z^4+1 = 0 \implies z = e^{i(2k+1)\pi/4}$, $k = 0,1,2,3$.

Upper half-plane poles: $z_1 = e^{i\pi/4} = \frac{1+i}{\sqrt{2}}$, $z_2 = e^{i3\pi/4} = \frac{-1+i}{\sqrt{2}}$.

$\text{Res}_{z=z_k}\frac{1}{z^4+1} = \frac{1}{4z_k^3} = \frac{z_k}{4z_k^4} = \frac{z_k}{4(-1)} = -\frac{z_k}{4}$.

$\sum\text{Res} = -\frac{z_1+z_2}{4} = -\frac{(1+i+(-1)+i)}{4\sqrt{2}} = -\frac{2i}{4\sqrt{2}} = -\frac{i}{2\sqrt{2}}$.

$\int_{-\infty}^{\infty} = 2\pi i\cdot\left(-\frac{i}{2\sqrt{2}}\right) = 2\pi\cdot\frac{1}{2\sqrt{2}} = \frac{\pi}{\sqrt{2}}$.

$\int_0^{\infty}\frac{dx}{x^4+1} = \frac{1}{2}\cdot\frac{\pi}{\sqrt{2}} = \frac{\pi}{2\sqrt{2}} = \frac{\pi\sqrt{2}}{4}$.

**Example 3:** Evaluate $\int_0^{\infty}\frac{x\sin x}{x^2+4}\,dx$.

*Solution:*
$\int_{-\infty}^{\infty}\frac{x\sin x}{x^2+4}\,dx = \text{Im}\int_{-\infty}^{\infty}\frac{xe^{ix}}{x^2+4}\,dx$ (integrand is even in $x\sin x$, so $\int_0^\infty = \frac{1}{2}\int_{-\infty}^{\infty}$).

Pole in UHP: $z = 2i$. $\text{Res}_{z=2i}\frac{ze^{iz}}{z^2+4} = \frac{2ie^{-2}}{4i} = \frac{e^{-2}}{2}$.

$\int_{-\infty}^{\infty}\frac{xe^{ix}}{x^2+4}\,dx = 2\pi i\cdot\frac{e^{-2}}{2} = \frac{\pi i}{e^2}$.

$\int_{-\infty}^{\infty}\frac{x\sin x}{x^2+4}\,dx = \text{Im}\left(\frac{\pi i}{e^2}\right) = \frac{\pi}{e^2}$.

$\int_0^{\infty}\frac{x\sin x}{x^2+4}\,dx = \frac{1}{2}\cdot\frac{\pi}{e^2} = \frac{\pi}{2e^2}$.

---

## Practice Problems

1. Evaluate $\int_0^{2\pi}\frac{d\theta}{3+2\sin\theta}$.

2. Evaluate $\int_{-\infty}^{\infty}\frac{dx}{(x^2+1)^2}$.

3. Evaluate $\int_0^{\infty}\frac{\cos 2x}{x^2+9}\,dx$.

4. Evaluate $\int_{-\infty}^{\infty}\frac{x^2}{(x^2+1)(x^2+4)}\,dx$.

5. Evaluate $\int_0^{2\pi}\frac{\cos^2\theta}{5-4\cos\theta}\,d\theta$.

### Solutions

**1.** Evaluate $\int_0^{2\pi}\frac{d\theta}{3+2\sin\theta}$.

**Step 1.** Substitute $z = e^{i\theta}$, $d\theta = \frac{dz}{iz}$, $\sin\theta = \frac{z - z^{-1}}{2i}$.

$$2\sin\theta = \frac{z - z^{-1}}{i} = \frac{z^2 - 1}{iz}$$

$$3 + 2\sin\theta = 3 + \frac{z^2-1}{iz} = \frac{3iz + z^2 - 1}{iz}$$

**Step 2.** Substitute:

$$I = \oint_{|z|=1}\frac{iz}{3iz + z^2 - 1}\cdot\frac{dz}{iz} = \oint_{|z|=1}\frac{dz}{z^2 + 3iz - 1}$$

**Step 3.** Find the roots of $z^2 + 3iz - 1 = 0$ using the quadratic formula:

$$z = \frac{-3i \pm \sqrt{(3i)^2 + 4}}{2} = \frac{-3i \pm \sqrt{-9+4}}{2} = \frac{-3i \pm i\sqrt{5}}{2}$$

$$z_1 = \frac{i(-3+\sqrt{5})}{2}, \qquad z_2 = \frac{i(-3-\sqrt{5})}{2}$$

Since $\sqrt{5} \approx 2.236$: $|z_1| = \frac{3-\sqrt{5}}{2} \approx 0.382 < 1$ (inside), $|z_2| = \frac{3+\sqrt{5}}{2} \approx 2.618 > 1$ (outside).

**Step 4.** Compute the residue at $z_1$. Since $z^2 + 3iz - 1 = (z-z_1)(z-z_2)$:

$$\text{Res}_{z=z_1} = \frac{1}{z_1 - z_2} = \frac{1}{i\sqrt{5}}$$

**Step 5.** Apply the Residue Theorem:

$$I = 2\pi i \cdot \frac{1}{i\sqrt{5}} = \boxed{\frac{2\pi}{\sqrt{5}} = \frac{2\pi\sqrt{5}}{5}}$$

---

**2.** Evaluate $\int_{-\infty}^{\infty}\frac{dx}{(x^2+1)^2}$.

**Step 1.** Degree check: $\deg q = 4$, $\deg p = 0$, so $\deg q - \deg p = 4 \geq 2$. The method applies.

**Step 2.** Factor: $(z^2+1)^2 = [(z-i)(z+i)]^2$. The pole $z = i$ in the UHP has order 2.

**Step 3.** Apply the residue formula for a pole of order $m = 2$:

$$\text{Res}_{z=i}\frac{1}{(z^2+1)^2} = \lim_{z\to i}\frac{d}{dz}\!\left[(z-i)^2\cdot\frac{1}{(z-i)^2(z+i)^2}\right] = \lim_{z\to i}\frac{d}{dz}\!\left[\frac{1}{(z+i)^2}\right]$$

$$= \lim_{z\to i}\frac{-2}{(z+i)^3} = \frac{-2}{(2i)^3} = \frac{-2}{-8i} = \frac{1}{4i}$$

**Step 4.** By the Residue Theorem:

$$\int_{-\infty}^{\infty}\frac{dx}{(x^2+1)^2} = 2\pi i \cdot \frac{1}{4i} = \boxed{\frac{\pi}{2}}$$

---

**3.** Evaluate $\int_0^{\infty}\frac{\cos 2x}{x^2+9}\,dx$.

**Step 1.** Since $\frac{\cos 2x}{x^2+9}$ is even:

$$\int_0^{\infty}\frac{\cos 2x}{x^2+9}\,dx = \frac{1}{2}\int_{-\infty}^{\infty}\frac{\cos 2x}{x^2+9}\,dx = \frac{1}{2}\,\text{Re}\int_{-\infty}^{\infty}\frac{e^{2ix}}{x^2+9}\,dx$$

**Step 2.** Since $a = 2 > 0$ and $\deg q - \deg p = 2 - 0 = 2 \geq 1$, by **Jordan's Lemma** the semicircular arc vanishes. Close in the UHP.

**Step 3.** The only UHP pole is $z = 3i$ (simple). Compute:

$$\text{Res}_{z=3i}\frac{e^{2iz}}{z^2+9} = \frac{e^{2i(3i)}}{2(3i)} = \frac{e^{-6}}{6i}$$

**Step 4.** By the Residue Theorem:

$$\int_{-\infty}^{\infty}\frac{e^{2ix}}{x^2+9}\,dx = 2\pi i \cdot \frac{e^{-6}}{6i} = \frac{\pi e^{-6}}{3}$$

This is real, confirming $\text{Re}(\cdot) = \frac{\pi e^{-6}}{3}$.

**Step 5.** Therefore:

$$\int_0^{\infty}\frac{\cos 2x}{x^2+9}\,dx = \frac{1}{2}\cdot\frac{\pi e^{-6}}{3} = \boxed{\frac{\pi}{6e^6}}$$

---

**4.** Evaluate $\int_{-\infty}^{\infty}\frac{x^2}{(x^2+1)(x^2+4)}\,dx$.

**Step 1.** Use partial fractions. Set $\frac{x^2}{(x^2+1)(x^2+4)} = \frac{A}{x^2+1} + \frac{B}{x^2+4}$.

Multiplying through: $x^2 = A(x^2+4) + B(x^2+1)$.

Set $x^2 = -1$: $-1 = A(-1+4) = 3A$, so $A = -\frac{1}{3}$.

Set $x^2 = -4$: $-4 = B(-4+1) = -3B$, so $B = \frac{4}{3}$.

$$\frac{x^2}{(x^2+1)(x^2+4)} = \frac{-1/3}{x^2+1} + \frac{4/3}{x^2+4}$$

**Step 2.** Use the standard result $\int_{-\infty}^{\infty}\frac{dx}{x^2+a^2} = \frac{\pi}{a}$ (for $a > 0$):

$$I = -\frac{1}{3}\int_{-\infty}^{\infty}\frac{dx}{x^2+1} + \frac{4}{3}\int_{-\infty}^{\infty}\frac{dx}{x^2+4}$$

$$= -\frac{1}{3}\cdot\pi + \frac{4}{3}\cdot\frac{\pi}{2} = -\frac{\pi}{3} + \frac{2\pi}{3} = \boxed{\frac{\pi}{3}}$$

---

**5.** Evaluate $\int_0^{2\pi}\frac{\cos^2\theta}{5-4\cos\theta}\,d\theta$.

**Step 1.** Use the double-angle identity $\cos^2\theta = \frac{1+\cos 2\theta}{2}$:

$$I = \int_0^{2\pi}\frac{1+\cos 2\theta}{2(5-4\cos\theta)}\,d\theta = \frac{1}{2}\underbrace{\int_0^{2\pi}\frac{d\theta}{5-4\cos\theta}}_{I_1} + \frac{1}{2}\underbrace{\int_0^{2\pi}\frac{\cos 2\theta}{5-4\cos\theta}\,d\theta}_{I_2}$$

**Step 2.** From Worked Example 1 above, $I_1 = \frac{2\pi}{3}$.

**Step 3.** Evaluate $I_2$. Substitute $z = e^{i\theta}$, $\cos 2\theta = \frac{z^2+z^{-2}}{2}$, and from Example 1: $5-4\cos\theta = \frac{-(2z-1)(z-2)}{z}$.

$$I_2 = \oint_{|z|=1}\frac{(z^2+z^{-2})/2}{-(2z-1)(z-2)/z}\cdot\frac{dz}{iz}$$

$$= \oint_{|z|=1}\frac{(z^4+1)/(2z^2)}{-(2z-1)(z-2)/z}\cdot\frac{dz}{iz} = \frac{1}{-2i}\oint_{|z|=1}\frac{z^4+1}{z^2(2z-1)(z-2)}\,dz$$

**Step 4.** Inside $|z|=1$: poles at $z = 0$ (order 2) and $z = 1/2$ (simple). The pole $z = 2$ is outside.

Let $g(z) = \frac{z^4+1}{z^2(2z-1)(z-2)}$.

**Residue at $z = 1/2$** (simple pole): Write $(2z-1) = 2(z-1/2)$ and cancel:

$$\text{Res}_{z=1/2} = \frac{(1/2)^4+1}{(1/2)^2 \cdot 2 \cdot (1/2-2)} = \frac{17/16}{1/4 \cdot 2 \cdot (-3/2)} = \frac{17/16}{-3/4} = -\frac{17}{12}$$

**Residue at $z = 0$** (pole of order 2): Let $h(z) = z^2 g(z) = \frac{z^4+1}{(2z-1)(z-2)}$.

$$\text{Res}_{z=0} = h'(0)$$

By the quotient rule with $h(z) = \frac{z^4+1}{2z^2-5z+2}$:

$$h'(z) = \frac{4z^3(2z^2-5z+2) - (z^4+1)(4z-5)}{(2z^2-5z+2)^2}$$

At $z = 0$: numerator $= 0 \cdot 2 - 1 \cdot (-5) = 5$, denominator $= 4$.

$$\text{Res}_{z=0} = \frac{5}{4}$$

**Sum of residues:** $-\frac{17}{12} + \frac{5}{4} = -\frac{17}{12} + \frac{15}{12} = -\frac{1}{6}$.

$$I_2 = \frac{-1}{2i}\cdot 2\pi i\cdot\!\left(-\frac{1}{6}\right) = \frac{-1}{2i}\cdot\frac{-\pi i}{3} = \frac{\pi i}{6i} = \frac{\pi}{6}$$

**Step 5.** Combine:

$$I = \frac{1}{2}I_1 + \frac{1}{2}I_2 = \frac{1}{2}\cdot\frac{2\pi}{3} + \frac{1}{2}\cdot\frac{\pi}{6} = \frac{\pi}{3} + \frac{\pi}{12} = \frac{4\pi + \pi}{12} = \frac{5\pi}{12}$$

*Alternatively,* this integral can be computed by a direct residue calculation. The answer is $\boxed{\frac{5\pi}{12}}$.
