# 24. L'Hôpital's Rule and Vector-Valued Derivatives

This lesson ties up two separate strands of the differential calculus:

1. **L'Hôpital's rule** — a systematic technique for evaluating limits of the indeterminate forms $0/0$, $\infty/\infty$, and their cousins, using derivatives.
2. **Derivatives of vector-valued functions** $f : [a, b] \to \mathbb{R}^n$ — the natural next step from scalar calculus, setting up the language for curves, tangent vectors, and (eventually) multivariable analysis.

Both topics rest on the MVT framework built in [[23-mean-value-theorems]].

---

## 24.1 L'Hôpital's Rule ($0/0$ Form)

> **Theorem 24.1 (L'Hôpital, $0/0$ form).**
> Let $f, g$ be differentiable on $(a, b)$ with $g'(x) \neq 0$ on $(a, b)$. Suppose
> $\lim_{x \to a^+} f(x) = 0 = \lim_{x \to a^+} g(x),$
> and $\lim_{x \to a^+} \dfrac{f'(x)}{g'(x)} = L$ (where $L$ may be $\pm\infty$). Then
> $\lim_{x \to a^+} \frac{f(x)}{g(x)} = L.$

*Proof (finite $L$; the case $L = \pm\infty$ is similar).* Extend $f, g$ by defining $f(a) = g(a) = 0$. Then $f, g$ are continuous on $[a, b)$ (differentiable on $(a, b)$ and with the correct limit at $a$).

For any $x \in (a, b)$, by **Cauchy's MVT** (Theorem 23.7) on $[a, x]$:
$$\frac{f(x) - f(a)}{g(x) - g(a)} = \frac{f(x)}{g(x)} = \frac{f'(\xi_x)}{g'(\xi_x)}$$
for some $\xi_x \in (a, x)$.

As $x \to a^+$, $\xi_x \to a^+$ (since $a < \xi_x < x$). So $f'(\xi_x)/g'(\xi_x) \to L$, and hence $f(x)/g(x) \to L$. $\blacksquare$

> **Analogous versions.**
> - At two-sided limit $x \to a$, use both one-sided applications.
> - At $\infty$: if $f, g \to 0$ as $x \to \infty$ and $f'/g' \to L$, then $f/g \to L$.

---

## 24.2 L'Hôpital's Rule ($\infty/\infty$ Form)

> **Theorem 24.2 (L'Hôpital, $\infty/\infty$ form).**
> Let $f, g$ be differentiable on $(a, b)$ with $g'(x) \neq 0$. Suppose
> $\lim_{x \to a^+} |g(x)| = \infty$,
> and $\lim_{x \to a^+} f'(x)/g'(x) = L$. Then $\lim_{x \to a^+} f(x)/g(x) = L$.

> **Note.** The hypothesis on $f$ can be anything — **only $g \to \infty$ is needed**, perhaps surprisingly. In particular, $f$ can stay bounded.

*Proof sketch.* Fix $\varepsilon > 0$. Find $c \in (a, b)$ so that for $x \in (a, c)$:
$$\left|\frac{f'(x)}{g'(x)} - L\right| < \varepsilon.$$

For $x \in (a, c)$ and any fixed $y \in (x, c)$ (we'll let $y$ move later), Cauchy's MVT on $[x, y]$:
$$\frac{f(y) - f(x)}{g(y) - g(x)} = \frac{f'(\xi)}{g'(\xi)} \text{ for some } \xi \in (x, y).$$

Since $|g| \to \infty$ as we approach $a^+$, the left side resembles $f(x)/g(x)$ (up to terms dominated by $g$). Technical manipulation — standard but fiddly — yields $|f(x)/g(x) - L| < 2\varepsilon$ for $x$ close to $a^+$. $\blacksquare$

---

## 24.3 Other Indeterminate Forms

L'Hôpital handles $0/0$ and $\infty/\infty$ directly. Other forms must be converted first.

| Form | Convert to $0/0$ or $\infty/\infty$ via... |
|------|-------------------------------------------|
| $0 \cdot \infty$ | $f \cdot g = \dfrac{f}{1/g}$ or $\dfrac{g}{1/f}$ |
| $\infty - \infty$ | Combine into single fraction (common denominator) |
| $0^0, \ \infty^0, \ 1^\infty$ | Take logarithm: $\ln(f^g) = g \ln f$ |

### Example conversions

**$0 \cdot \infty$.** $\lim_{x \to 0^+} x \ln x$:
$$x \ln x = \frac{\ln x}{1/x} \text{ (now } \infty/\infty\text{)}.$$
L'Hôpital: $\dfrac{1/x}{-1/x^2} = -x \to 0$.

**$\infty - \infty$.** $\lim_{x \to 0} \left(\frac{1}{\sin x} - \frac{1}{x}\right)$:
$$\frac{x - \sin x}{x \sin x} \text{ (now } 0/0\text{)}.$$

**$1^\infty$.** $\lim_{x \to 0}(1 + x)^{1/x}$: take log $\to \lim \frac{\ln(1+x)}{x} = 1$, so original limit $= e^1 = e$.

---

## 24.4 When L'Hôpital Fails

> **Warning.** L'Hôpital gives the **limit of $f'/g'$ equals limit of $f/g$** — if the former exists. It does NOT mean the derivative ratio must exist. If $\lim f'/g'$ does not exist, L'Hôpital tells us nothing, and $\lim f/g$ may still exist.

**Example of failure.** $\lim_{x \to \infty} \frac{x + \sin x}{x}$. Direct: $\to 1$.

L'Hôpital: $\frac{1 + \cos x}{1}$ does not have a limit. So L'Hôpital cannot be applied; but the original limit is $1$, obtainable directly.

> **Best practice.** Always check first whether you genuinely have an indeterminate form, and whether the derivative ratio limit exists. If it doesn't, try another approach.

---

## 24.5 Vector-Valued Functions: Setup

> **Definition 24.3.** A **vector-valued function** on $[a, b]$ is a map $f : [a, b] \to \mathbb{R}^n$, written $f(t) = (f_1(t), f_2(t), \ldots, f_n(t))$, where each $f_i : [a, b] \to \mathbb{R}$ is a **coordinate function**.

> **Norm.** $\|x\|$ denotes the Euclidean norm $\|x\| = \sqrt{x_1^2 + \cdots + x_n^2}$.

> **Definition 24.4 (Limit of vector-valued function).**
> $\lim_{t \to t_0} f(t) = L$ means $\|f(t) - L\| \to 0$, which is equivalent to coordinate-wise convergence: $f_i(t) \to L_i$ for each $i$.

> **Definition 24.5 (Continuity).**
> $f$ is continuous at $t_0$ iff each coordinate function $f_i$ is continuous at $t_0$.

---

## 24.6 Derivatives of Vector-Valued Functions

> **Definition 24.6 (Derivative).**
> $f : [a, b] \to \mathbb{R}^n$ is differentiable at $t \in (a, b)$ if
> $f'(t) := \lim_{h \to 0} \frac{f(t + h) - f(t)}{h}$
> exists in $\mathbb{R}^n$.

> **Theorem 24.7 (Coordinate characterization).** $f$ is differentiable at $t$ iff each $f_i$ is differentiable at $t$, in which case $f'(t) = (f_1'(t), \ldots, f_n'(t))$.

*Proof.* The limit $\frac{f(t+h) - f(t)}{h}$ is a vector whose coordinates are $\frac{f_i(t+h) - f_i(t)}{h}$. Vector limit exists iff each coordinate limit exists. $\blacksquare$

> **Geometric interpretation.** If $f(t) = (x(t), y(t))$ traces a curve in $\mathbb{R}^2$, then $f'(t) = (x'(t), y'(t))$ is the **tangent vector** at $f(t)$. Its magnitude $\|f'(t)\|$ is the **speed** (distance per unit $t$), and direction $f'(t)/\|f'(t)\|$ is the **unit tangent**.

---

## 24.7 Algebraic Rules

> **Theorem 24.8.** Let $f, g : [a, b] \to \mathbb{R}^n$ and $\phi : [a, b] \to \mathbb{R}$ be differentiable. Then:
>
> (i) **Sum:** $(f + g)'(t) = f'(t) + g'(t)$.
>
> (ii) **Scalar multiplication:** $(\phi \cdot f)'(t) = \phi'(t) f(t) + \phi(t) f'(t)$.
>
> (iii) **Inner product:** $(f \cdot g)'(t) = f'(t) \cdot g(t) + f(t) \cdot g'(t)$, where "$\cdot$" is the Euclidean inner product.
>
> (iv) **Cross product ($n = 3$):** $(f \times g)'(t) = f'(t) \times g(t) + f(t) \times g'(t)$.
>
> (v) **Chain rule (scalar-in-scalar-out reparametrisation):** If $\phi : I \to [a, b]$ is differentiable and $f : [a, b] \to \mathbb{R}^n$, then $(f \circ \phi)'(t) = \phi'(t) f'(\phi(t))$.

*Proofs.* All follow from coordinate-wise application of scalar rules. For the inner product, write $f \cdot g = \sum f_i g_i$, differentiate each term by the product rule, collect. $\blacksquare$

**Key application: if $\|f(t)\| = $ constant, then $f'(t) \perp f(t)$.**

*Proof.* $\|f\|^2 = f \cdot f = $ constant. Differentiate: $2 f \cdot f' = 0$, so $f \cdot f' = 0$. $\blacksquare$

**Geometric meaning:** motion on a sphere has velocity tangent to the sphere. In particular, uniform circular motion has velocity perpendicular to the position vector from the centre.

---

## 24.8 Failure of the Classical MVT in Vector Form

> **Warning.** Lagrange's MVT does NOT extend to vector-valued functions. That is, there need not exist $\xi \in (a, b)$ with $f(b) - f(a) = f'(\xi)(b - a)$.

**Counterexample.** $f(t) = (\cos t, \sin t) : [0, 2\pi] \to \mathbb{R}^2$.

$f(2\pi) - f(0) = (1 - 1, 0 - 0) = (0, 0)$. For the MVT conclusion, we'd need $f'(\xi) \cdot 2\pi = 0$, i.e., $f'(\xi) = 0$. But $f'(t) = (-\sin t, \cos t)$ has $\|f'(t)\| = 1 \neq 0$ for all $t$. So no such $\xi$ exists. $\blacksquare$

---

## 24.9 MVT Inequality Version (Vector-Valued)

Instead of an equality, we have an **inequality** that is genuinely useful.

> **Theorem 24.9 (Vector-valued MVT inequality).**
> Let $f : [a, b] \to \mathbb{R}^n$ be continuous on $[a, b]$ and differentiable on $(a, b)$. Then there exists $\xi \in (a, b)$ such that
> $\|f(b) - f(a)\| \leq \|f'(\xi)\| (b - a).$
>
> More usefully:
> $\|f(b) - f(a)\| \leq (b - a) \sup_{t \in (a, b)} \|f'(t)\|.$

*Proof (inequality form).* Define $\phi(t) = (f(b) - f(a)) \cdot f(t)$, a scalar function. $\phi$ is differentiable with $\phi'(t) = (f(b) - f(a)) \cdot f'(t)$.

Apply Lagrange's (scalar) MVT to $\phi$:
$$\phi(b) - \phi(a) = \phi'(\xi)(b - a) \quad \text{for some } \xi \in (a, b).$$

Left side: $\phi(b) - \phi(a) = (f(b) - f(a)) \cdot f(b) - (f(b) - f(a)) \cdot f(a) = (f(b) - f(a)) \cdot (f(b) - f(a)) = \|f(b) - f(a)\|^2$.

Right side: $(f(b) - f(a)) \cdot f'(\xi) \cdot (b - a)$. By Cauchy-Schwarz, $|(f(b) - f(a)) \cdot f'(\xi)| \leq \|f(b) - f(a)\| \|f'(\xi)\|$.

Hence
$$\|f(b) - f(a)\|^2 \leq \|f(b) - f(a)\| \|f'(\xi)\| (b - a).$$

If $\|f(b) - f(a)\| > 0$, divide:
$$\|f(b) - f(a)\| \leq \|f'(\xi)\| (b - a). \ \blacksquare$$

---

## 24.10 Worked Examples

**Example 1.** Compute $\displaystyle \lim_{x \to 0} \frac{\tan x - x}{x^3}$ using L'Hôpital.

*Solution:* Both numerator and denominator $\to 0$ ($0/0$).

Apply L'Hôpital:
$$\lim_{x \to 0} \frac{\sec^2 x - 1}{3 x^2}.$$
Numerator and denominator $\to 0$ again. L'Hôpital again:
$$\lim_{x \to 0} \frac{2 \sec^2 x \tan x}{6 x}.$$
Again $0/0$. One more L'Hôpital:
$$\lim_{x \to 0} \frac{2[\sec^2 x \cdot \sec^2 x + \tan x \cdot 2 \sec^2 x \tan x]}{6}.$$
At $x = 0$: $\sec^2 0 = 1$, $\tan 0 = 0$. Numerator: $2[1 \cdot 1 + 0] = 2$. Denominator: $6$.
Limit: $2/6 = 1/3$. $\blacksquare$

(Alternative: use Taylor series. $\tan x = x + x^3/3 + \cdots$, so $\tan x - x = x^3/3 + \cdots$, and $(tan x - x)/x^3 \to 1/3$.)

---

**Example 2.** Compute $\lim_{x \to \infty} x^{1/x}$.

*Solution:* $1^\infty$ form (as $x \to \infty$, base $x^{1/x}$ has $x \to \infty$, exponent $1/x \to 0$; actually this is $\infty^0$, also indeterminate).

Take log: $\ln(x^{1/x}) = \frac{\ln x}{x}$. By rate comparison (or L'Hôpital):
$$\lim_{x \to \infty} \frac{\ln x}{x} \stackrel{\infty/\infty}{=} \lim_{x \to \infty} \frac{1/x}{1} = 0.$$

Hence $x^{1/x} \to e^0 = 1$. $\blacksquare$

---

**Example 3.** For $f(t) = (\cos t, \sin t, t) : \mathbb{R} \to \mathbb{R}^3$ (a helix), compute $f'(t)$ and $\|f'(t)\|$.

*Solution:* $f'(t) = (-\sin t, \cos t, 1)$. 
$$\|f'(t)\| = \sqrt{\sin^2 t + \cos^2 t + 1} = \sqrt{2}.$$

**Interpretation:** the helix is traversed at constant speed $\sqrt{2}$.

---

**Example 4.** Let $f : [0, 1] \to \mathbb{R}^2$ be differentiable with $f(0) = (0, 0)$ and $\|f'(t)\| \leq 1$ for all $t$. Show $\|f(1)\| \leq 1$.

*Solution:* By Theorem 24.9:
$$\|f(1) - f(0)\| \leq (1 - 0) \sup_{t} \|f'(t)\| \leq 1.$$

Since $f(0) = 0$, $\|f(1)\| \leq 1$. $\blacksquare$

This generalises the scalar statement "bounded derivative gives Lipschitz-Lipschitz" to vector-valued functions.

---

**Example 5.** Show: if $f : [a, b] \to \mathbb{R}^n$ is differentiable with $f'(t) = 0$ for all $t \in (a, b)$, then $f$ is constant.

*Solution:* By Theorem 24.9:
$$\|f(x) - f(a)\| \leq (x - a) \sup_{t \in (a, x)} \|f'(t)\| = 0.$$

So $f(x) = f(a)$ for all $x \in [a, b]$. $\blacksquare$

This is the vector-valued version of Theorem 23.3.

---

## 24.11 Practice Problems

1. Compute $\displaystyle \lim_{x \to 0} \frac{e^x - 1 - x}{x^2}$.

2. Compute $\displaystyle \lim_{x \to 0^+} (\sin x)^x$.

3. Compute $\displaystyle \lim_{x \to \infty} \left(\frac{x + 2}{x - 1}\right)^x$.

4. For $f(t) = (t^2, t^3, e^t)$, compute $f'(1)$.

5. Suppose $f : [a, b] \to \mathbb{R}^n$ is differentiable and $\|f'(t)\| = 1$ for all $t$. Prove that the length of the curve is $b - a$.

### Solutions

**1.** $0/0$. L'Hôpital:
$$\lim_{x \to 0} \frac{e^x - 1}{2x} \stackrel{0/0}{=} \lim_{x \to 0} \frac{e^x}{2} = \frac{1}{2}. \ \blacksquare$$

(Also: Taylor $e^x - 1 - x = x^2/2 + O(x^3)$.)

---

**2.** $0^0$ form. Take log:
$$\ln((\sin x)^x) = x \ln(\sin x).$$

$x \to 0^+$: $\ln(\sin x) \to -\infty$, $x \to 0$. So $0 \cdot (-\infty)$. Rewrite:
$$x \ln(\sin x) = \frac{\ln(\sin x)}{1/x} \stackrel{-\infty/\infty}{\longrightarrow}.$$

L'Hôpital:
$$\frac{\cos x / \sin x}{-1/x^2} = \frac{-x^2 \cos x}{\sin x} = \frac{-x \cos x}{\sin x/x}.$$
As $x \to 0^+$: numerator $\to 0$, denominator $\to 1$, so ratio $\to 0$.

Hence $(\sin x)^x \to e^0 = 1$. $\blacksquare$

---

**3.** $1^\infty$ form. Take log:
$$x \ln\left(\frac{x + 2}{x - 1}\right) = x \ln\left(1 + \frac{3}{x - 1}\right).$$

For large $x$, $\ln(1 + 3/(x-1)) \approx 3/(x-1)$, so the expression $\approx 3x/(x-1) \to 3$.

More formally: let $u = 3/(x-1) \to 0$. Then $\ln(1+u)/u \to 1$, and the expression is
$$x \cdot u \cdot \frac{\ln(1+u)}{u} = \frac{3x}{x-1} \cdot \frac{\ln(1+u)}{u} \to 3 \cdot 1 = 3.$$

Hence the original limit is $e^3$. $\blacksquare$

---

**4.** $f'(t) = (2t, 3t^2, e^t)$, so $f'(1) = (2, 3, e)$. $\blacksquare$

---

**5.** The length of a differentiable curve $f : [a, b] \to \mathbb{R}^n$ is
$$L = \int_a^b \|f'(t)\| \, dt.$$
(This formula is developed from the Riemann integral — see [[25-riemann-stieltjes-integral]].)

If $\|f'(t)\| = 1$, then $L = \int_a^b 1 \, dt = b - a$. $\blacksquare$

Such a parametrisation is called a **unit-speed** or **arc-length** parametrisation.

---

## 24.12 Summary

> **L'Hôpital's rule — workflow.**
>
> 1. **Identify** the indeterminate form: $0/0$ or $\infty/\infty$ (or convert from $0\cdot\infty$, $\infty-\infty$, $1^\infty$, etc.).
> 2. **Differentiate** numerator and denominator **separately** (not the quotient as a whole).
> 3. **Compute** the limit of $f'(x)/g'(x)$. If it exists (possibly $\pm\infty$), it equals the original limit.
> 4. **If** the new quotient is still indeterminate, **iterate**.
> 5. **If** $f'/g'$ has no limit, L'Hôpital is **inconclusive** — try another method.

> **Vector-valued functions: key facts.**
>
> - Derivative is coordinate-wise: $f'(t) = (f_1'(t), \ldots, f_n'(t))$.
> - Algebraic rules (sum, scalar $\cdot$ vector, dot product, cross product) mirror scalar rules.
> - $\|f\|$ constant $\Rightarrow f \perp f'$.
> - Classical MVT **fails** as equality; the inequality $\|f(b) - f(a)\| \leq (b-a) \sup \|f'\|$ holds.
> - Zero-derivative-on-interval $\Rightarrow$ constant, still valid (via inequality MVT).

> **Conceptual synthesis.** Scalar derivatives talk about **rates of change**; vector derivatives also encode **direction**. Many scalar results carry over in coordinate form; the interesting exception is the classical MVT, which becomes an **inequality** in vector form.

---

## Related Topics

- [[22-differentiation]] — foundation of derivatives
- [[23-mean-value-theorems]] — Cauchy MVT underlies L'Hôpital
- [[18-important-limits-infinite-limits]] — indeterminate forms catalogue
- [[25-riemann-stieltjes-integral]] — arc length, integration of vector-valued functions
- [[VACV/guide/02-vector-calculus]] — vector calculus, partial derivatives
- [[12-infinite-series-introduction]] — Taylor expansions used in many limit evaluations
