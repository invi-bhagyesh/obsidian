# 12. Complex Logarithm, Branches & Branch Cuts

---

## 12.1 The Multi-valued Logarithm

### Motivation
We seek $w$ such that $e^w = z$ for $z \neq 0$.

If $w = u+iv$ and $z = re^{i\theta}$, then $e^u e^{iv} = re^{i\theta}$, so $u = \ln r = \ln|z|$ and $v = \theta = \arg z$.

Since $\arg z$ is multi-valued, the logarithm is too:

### Definition
$$\boxed{\log z = \ln|z| + i\arg z = \ln|z| + i(\text{Arg}\,z + 2n\pi), \quad n \in \mathbb{Z}}$$

This is a **multi-valued function**: for each $z \neq 0$, there are infinitely many values of $\log z$, differing by multiples of $2\pi i$.

### Examples
- $\log 1 = \ln 1 + i(0+2n\pi) = 2n\pi i$
- $\log(-1) = \ln 1 + i(\pi+2n\pi) = i(2n+1)\pi$
- $\log i = \ln 1 + i(\pi/2+2n\pi) = i(4n+1)\pi/2$
- $\log(-i) = 0 + i(-\pi/2+2n\pi) = i(4n-1)\pi/2$

---

## 12.2 The Principal Logarithm

### Definition
$$\text{Log}\,z = \ln|z| + i\,\text{Arg}\,z$$

where $\text{Arg}\,z \in (-\pi, \pi]$ is the principal argument.

**Relationship:** $\log z = \text{Log}\,z + 2n\pi i$.

### Properties
$$\text{Log}(e^z) \neq z \text{ in general}$$

But: $e^{\text{Log}\,z} = z$ for all $z \neq 0$ (the logarithm inverts the exponential).

### Discontinuity of $\text{Log}\,z$
$\text{Log}\,z$ is **discontinuous** on the negative real axis $(-\infty, 0]$. As $z$ crosses the negative real axis:
- From above: $\text{Arg}\,z \to \pi$
- From below: $\text{Arg}\,z \to -\pi$

Jump of $2\pi$ in the imaginary part.

---

## 12.3 Branches of the Logarithm

### The Problem
$\log z$ is multi-valued. To make it a (single-valued) function, we must **choose a branch**: a consistent selection of one value at each point.

### Branch
A **branch** of $\log z$ is a continuous function $L(z)$ defined on some domain $D$ such that $e^{L(z)} = z$ for all $z \in D$.

Any branch has the form:
$$L(z) = \ln|z| + i\theta(z)$$

where $\theta(z)$ is a continuous choice of argument on $D$.

### Standard Branch Parametrized by $\alpha$
Fix a real number $\alpha$. Define:
$$\log_\alpha z = \ln r + i\theta, \qquad \alpha < \theta < \alpha + 2\pi$$

on the domain $\mathbb{C}$ minus the ray $\theta = \alpha$ (i.e., we cut the plane along the ray from the origin at angle $\alpha$).

**The principal logarithm** $\text{Log}\,z$ corresponds to $\alpha = -\pi$:
$$\text{Log}\,z = \ln r + i\theta, \qquad -\pi < \theta < \pi$$

defined on $\mathbb{C} \setminus (-\infty, 0]$.

### Analyticity
Each branch $\log_\alpha z$ is **analytic** on its domain, with derivative:
$$\frac{d}{dz}\log_\alpha z = \frac{1}{z}$$

---

## 12.4 Branch Points and Branch Cuts

### Branch Point
A **branch point** is a point around which a multi-valued function cannot be made single-valued and continuous.

For $\log z$: the branch point is $z = 0$ (and $z = \infty$). If we go around the origin once ($\theta \to \theta + 2\pi$), the function value jumps by $2\pi i$.

### Branch Cut
A **branch cut** is a curve connecting branch points along which we "cut" the plane to prevent traversing a closed loop around the branch point.

For $\log z$: any ray from the origin to infinity serves as a branch cut. Common choices:
- **Standard:** negative real axis $(-\infty, 0]$ (for the principal branch)
- $[0, +\infty)$ (positive real axis)
- Any ray $\theta = \alpha$

### Why Branch Cuts are Necessary
Without a cut, following a continuous argument around $z = 0$ gives:
$$\theta \to \theta + 2\pi \text{ after one loop}$$

This means $\log z$ would be discontinuous. The branch cut prevents completing such a loop.

---

## 12.5 Properties of Complex Logarithm

### Identities (Multi-valued)
$$\log(z_1 z_2) = \log z_1 + \log z_2$$
$$\log(z_1/z_2) = \log z_1 - \log z_2$$

These hold in the sense of sets (each side gives the same set of values).

### Warning for Principal Logarithm
$$\text{Log}(z_1z_2) \neq \text{Log}\,z_1 + \text{Log}\,z_2 \text{ in general!}$$

The equality holds when $\text{Arg}\,z_1 + \text{Arg}\,z_2 \in (-\pi, \pi]$, but can fail otherwise.

**Example:** $\text{Log}(-1) + \text{Log}(-1) = i\pi + i\pi = 2\pi i$. But $\text{Log}((-1)(-1)) = \text{Log}(1) = 0$. So $\text{Log}(z_1z_2) \neq \text{Log}\,z_1 + \text{Log}\,z_2$.

### Logarithm of Negative Reals
$$\text{Log}(-x) = \ln x + i\pi \quad (x > 0)$$
$$\log(-x) = \ln x + i(2n+1)\pi$$

---

## 12.6 Logarithm as Inverse of Exponential

For any branch $L(z)$ of $\log z$:
$$e^{L(z)} = z \quad\text{for all } z \text{ in the domain}$$

But $L(e^z) = z$ **only** if $\text{Im}\,z$ falls in the correct $2\pi$-interval for that branch.

---

## Worked Examples

**Example 1:** Find all values of $\log(1+i)$.

*Solution:*
$|1+i| = \sqrt{2}$, $\text{Arg}(1+i) = \pi/4$.

$\log(1+i) = \ln\sqrt{2} + i(\pi/4+2n\pi) = \frac{1}{2}\ln 2 + i(2n+\tfrac{1}{4})\pi$, $n \in \mathbb{Z}$.

$\text{Log}(1+i) = \frac{1}{2}\ln 2 + i\frac{\pi}{4}$ (the $n=0$ value).

**Example 2:** Find all values of $\log(-e)$.

*Solution:*
$|-e| = e$, $\text{Arg}(-e) = \pi$.

$\log(-e) = \ln e + i(\pi+2n\pi) = 1 + i(2n+1)\pi$, $n \in \mathbb{Z}$.

**Example 3:** On which branch of the logarithm does $\log i = 5\pi i/2$?

*Solution:*
$\log i = \ln 1 + i\theta = i\theta$ where $\theta = \pi/2+2n\pi$.

For $\theta = 5\pi/2$: $n = 1$, so $\theta = \pi/2 + 2\pi = 5\pi/2$.

This belongs to the branch with $\alpha < \theta < \alpha + 2\pi$ where $\alpha = 2\pi$ works: $2\pi < 5\pi/2 < 4\pi$. So the branch with cut along $\theta = 2\pi$ (i.e., the positive real axis in the second sheet).

More precisely, this is the branch $\log_\alpha z$ with $\alpha = 2\pi$, i.e., $\theta \in (2\pi, 4\pi)$.

**Example 4:** Show that $\text{Log}\,z$ is analytic on $\mathbb{C}\setminus(-\infty, 0]$ with $\frac{d}{dz}\text{Log}\,z = \frac{1}{z}$.

*Proof sketch:*
On the cut plane, $\text{Log}\,z = \ln r + i\theta$ with $r > 0$, $-\pi < \theta < \pi$.

In polar C-R form: $u = \ln r$, $v = \theta$.

$u_r = 1/r$, $\frac{1}{r}v_\theta = 1/r$: $u_r = \frac{1}{r}v_\theta$ $\checkmark$.

$v_r = 0$, $-\frac{1}{r}u_\theta = 0$: $v_r = -\frac{1}{r}u_\theta$ $\checkmark$.

All partials continuous for $r > 0$. So $\text{Log}\,z$ is analytic.

$\frac{d}{dz}\text{Log}\,z = e^{-i\theta}(u_r+iv_r) = e^{-i\theta}\cdot\frac{1}{r} = \frac{1}{re^{i\theta}} = \frac{1}{z}$. $\checkmark$

---

## Practice Problems

1. Compute all values of: (a) $\log(-2i)$; (b) $\log(e^{3i})$; (c) $\text{Log}(-1-i)$.

2. Verify that $\text{Log}((-1)(-i)) \neq \text{Log}(-1)+\text{Log}(-i)$.

3. Show that $\log z$ is analytic on any branch, with derivative $1/z$.

4. Why can't we define a continuous branch of $\log z$ on the punctured plane $\mathbb{C}\setminus\{0\}$?

5. Find the branch of $\log z$ in which $\log(-1) = 3\pi i$.

### Solutions

**1.** Compute all values of the given logarithms.

**(a)** $\log(-2i)$.

$|-2i| = 2$ and $\text{Arg}(-2i) = -\frac{\pi}{2}$ (negative imaginary axis).

$$\log(-2i) = \ln 2 + i\!\left(-\frac{\pi}{2}+2n\pi\right), \quad n \in \mathbb{Z}$$

**(b)** $\log(e^{3i})$.

$|e^{3i}| = 1$, and $\arg(e^{3i}) = 3 + 2n\pi$.

$$\log(e^{3i}) = \ln 1 + i(3+2n\pi) = i(3+2n\pi), \quad n \in \mathbb{Z}$$

For the principal value: since $3 < \pi \approx 3.1416$, the angle $3$ radians lies in the second quadrant (upper half-plane), so $\text{Arg}(e^{3i}) = 3 \in (-\pi, \pi]$.

$$\text{Log}(e^{3i}) = 3i$$

**(c)** $\text{Log}(-1-i)$.

$|-1-i| = \sqrt{2}$. The point $-1-i$ lies in the third quadrant, so $\text{Arg}(-1-i) = -\pi + \frac{\pi}{4} = -\frac{3\pi}{4}$.

$$\text{Log}(-1-i) = \frac{1}{2}\ln 2 - \frac{3\pi}{4}i$$

---

**2.** Verify that $\text{Log}(z_1 z_2) \neq \text{Log}\,z_1 + \text{Log}\,z_2$ in general.

Take $z_1 = z_2 = -1$. Then $z_1 z_2 = 1$.

$$\text{Log}(1) = 0$$

$$\text{Log}(-1) + \text{Log}(-1) = i\pi + i\pi = 2\pi i$$

Since $0 \neq 2\pi i$, we have $\text{Log}(z_1 z_2) \neq \text{Log}\,z_1 + \text{Log}\,z_2$. $\blacksquare$

(The identity fails because $\text{Arg}(-1) + \text{Arg}(-1) = 2\pi \notin (-\pi, \pi]$.)

---

**3.** Show that any branch of $\log z$ is analytic with derivative $1/z$.

**Proof.** On any branch $\log_\alpha z = \ln r + i\theta$ (with $\alpha < \theta < \alpha + 2\pi$, $r > 0$), we verify the polar C-R equations.

Let $u(r,\theta) = \ln r$ and $v(r,\theta) = \theta$. Then:

$$u_r = \frac{1}{r}, \quad \frac{1}{r}v_\theta = \frac{1}{r}: \quad u_r = \frac{1}{r}v_\theta \quad\checkmark$$

$$v_r = 0, \quad -\frac{1}{r}u_\theta = 0: \quad v_r = -\frac{1}{r}u_\theta \quad\checkmark$$

All partials are continuous for $r > 0$. By the polar C-R sufficient condition, $\log_\alpha z$ is analytic on its domain.

The derivative is $f'(z) = e^{-i\theta}(u_r + iv_r) = e^{-i\theta}\cdot\frac{1}{r} = \frac{1}{re^{i\theta}} = \frac{1}{z}$. $\blacksquare$

---

**4.** Why can't we define a continuous branch of $\log z$ on $\mathbb{C}\setminus\{0\}$?

Suppose a continuous branch $L(z)$ existed on the punctured plane. Traverse the unit circle $z(t) = e^{it}$, $0 \leq t \leq 2\pi$.

Since $e^{L(z)} = z$, we have $L(e^{it}) = it + 2\pi i k(t)$ for some integer-valued function $k(t)$.

By continuity, $k(t)$ must be continuous and integer-valued, hence constant: $k(t) = k_0$.

At $t = 0$: $L(1) = 2\pi i k_0$.

At $t = 2\pi$: $L(e^{2\pi i}) = L(1) = 2\pi i + 2\pi i k_0$.

But this gives $2\pi i k_0 = 2\pi i + 2\pi i k_0$, hence $0 = 2\pi i$ — a contradiction.

Therefore no continuous single-valued branch of $\log z$ exists on the full punctured plane. $\blacksquare$

---

**5.** Find the branch of $\log z$ in which $\log(-1) = 3\pi i$.

**Step 1.** We have $\log(-1) = \ln|-1| + i\arg(-1) = i(\pi + 2n\pi)$.

**Step 2.** For $\log(-1) = 3\pi i$, we need $\pi + 2n\pi = 3\pi$, giving $n = 1$.

**Step 3.** This value corresponds to the argument $\theta = 3\pi$ for $z = -1$. The branch must satisfy $\alpha < 3\pi < \alpha + 2\pi$, i.e., $\pi < \alpha < 3\pi$.

Choosing $\alpha = 2\pi$: the branch is $\log_{2\pi} z = \ln r + i\theta$ with $\theta \in (2\pi, 4\pi)$, with the branch cut along the ray $\theta = 2\pi$ (the positive real axis).
