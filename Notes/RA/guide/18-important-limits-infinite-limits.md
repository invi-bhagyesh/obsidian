# 18. Important Limits, Limits at Infinity, and Infinite Limits

This lesson catalogues the standard limits every analyst needs at their fingertips, then extends the $\varepsilon$-$\delta$ framework to cover:

- **Limits at infinity**: $\lim_{x \to \infty} f(x)$ and $\lim_{x \to -\infty} f(x)$.
- **Infinite limits**: $\lim_{x \to a} f(x) = \pm\infty$.

These tools let us discuss the asymptotic behaviour of functions rigorously and are the bridge between sequence limits and function limits.

---

## 18.1 Limits at Infinity

> **Definition 18.1 ($\lim_{x\to\infty}$).**
> Let $f$ be defined on some interval $(M_0, \infty)$. We say
> $\lim_{x \to \infty} f(x) = L$
> if for every $\varepsilon > 0$ there exists $M \in \mathbb{R}$ such that
> $x > M \ \Longrightarrow\ |f(x) - L| < \varepsilon.$

> **Definition 18.2 ($\lim_{x \to -\infty}$).**
> $\lim_{x \to -\infty} f(x) = L$ means: for every $\varepsilon > 0$ there exists $M$ such that $x < M \Rightarrow |f(x) - L| < \varepsilon$.

> **Heine's theorem extends.** $\lim_{x \to \infty} f(x) = L$ iff for every sequence $x_n \to \infty$ (i.e., $x_n \to \infty$ as sequence), $f(x_n) \to L$.

**Standard limits at infinity.**

$$\lim_{x \to \infty} \frac{1}{x} = 0, \qquad \lim_{x \to \infty} \frac{1}{x^p} = 0 \ (p > 0), \qquad \lim_{x \to \infty} \frac{\ln x}{x} = 0.$$

$$\lim_{x \to -\infty} e^x = 0, \qquad \lim_{x \to \infty} e^{-x} = 0, \qquad \lim_{x \to \infty} \left(1 + \frac{a}{x}\right)^x = e^a.$$

---

## 18.2 Infinite Limits

> **Definition 18.3 ($\lim_{x\to a} f(x) = +\infty$).**
> $\lim_{x \to a} f(x) = +\infty$ means: for every $M > 0$ there exists $\delta > 0$ such that
> $0 < |x - a| < \delta \ \Longrightarrow\ f(x) > M.$

> **Definition 18.4 ($\lim_{x\to a} f(x) = -\infty$).**
> $\lim_{x \to a} f(x) = -\infty$ means: for every $M > 0$ there exists $\delta > 0$ such that
> $0 < |x - a| < \delta \ \Longrightarrow\ f(x) < -M.$

Analogously, $\lim_{x \to a^+} f(x) = \pm\infty$ and $\lim_{x \to \infty} f(x) = \pm\infty$ are defined.

**Examples.**
- $\lim_{x \to 0} \frac{1}{x^2} = +\infty$.
- $\lim_{x \to 0^+} \frac{1}{x} = +\infty$, $\lim_{x \to 0^-} \frac{1}{x} = -\infty$.
- $\lim_{x \to \infty} \ln x = +\infty$.
- $\lim_{x \to \infty} e^x = +\infty$.

> **Important.** "$\lim f = +\infty$" is a statement that the limit **does not exist** in $\mathbb{R}$. It gives extra information (the way in which the limit fails to exist). By the classification in [[17-types-of-discontinuity-monotonic]], if $\lim_{x \to a} f(x) = \pm\infty$ with $f$ defined on a deleted neighbourhood of $a$, we have an essential discontinuity at $a$.

---

## 18.3 Catalogue of Important Limits

These limits appear again and again. Most can be proved by $\varepsilon$-$\delta$, by sequence methods, or by Taylor expansion.

### Trigonometric

$$\boxed{\ \lim_{x \to 0} \frac{\sin x}{x} = 1\ }$$

*Proof.* For $0 < x < \pi/2$, compare areas of triangle, sector, and larger triangle inscribed in unit circle:
$$\sin x \leq x \leq \tan x.$$

Divide by $\sin x$ ($> 0$):
$$1 \leq \frac{x}{\sin x} \leq \frac{1}{\cos x}.$$

Reciprocal and squeeze:
$$\cos x \leq \frac{\sin x}{x} \leq 1.$$

As $x \to 0^+$, $\cos x \to 1$. By the sandwich (squeeze) theorem, $\sin x / x \to 1$. The limit from the left is the same by evenness of $\sin x / x$ (since $\sin(-x)/(-x) = \sin x / x$). $\blacksquare$

$$\lim_{x \to 0} \frac{1 - \cos x}{x^2} = \frac{1}{2}, \qquad \lim_{x \to 0} \frac{\tan x}{x} = 1, \qquad \lim_{x \to 0} \frac{\arcsin x}{x} = 1.$$

*Proof of the first.* Using $1 - \cos x = 2\sin^2(x/2)$:
$$\frac{1 - \cos x}{x^2} = \frac{2 \sin^2(x/2)}{x^2} = \frac{1}{2} \left(\frac{\sin(x/2)}{x/2}\right)^2 \to \frac{1}{2} \cdot 1^2 = \frac{1}{2}. \ \blacksquare$$

### Exponential and Logarithmic

$$\boxed{\ \lim_{x \to 0} \frac{e^x - 1}{x} = 1\ }$$

*Proof.* From the series $e^x = 1 + x + x^2/2! + x^3/3! + \cdots$:
$$\frac{e^x - 1}{x} = 1 + \frac{x}{2!} + \frac{x^2}{3!} + \cdots$$

This is continuous in $x$ (power series with infinite radius), and at $x = 0$ it equals $1$. $\blacksquare$

$$\boxed{\ \lim_{x \to 0} \frac{\ln(1+x)}{x} = 1\ }$$

*Proof.* Substitute $y = \ln(1+x)$, so $x = e^y - 1$. As $x \to 0$, $y \to 0$. Then
$$\frac{\ln(1+x)}{x} = \frac{y}{e^y - 1} \to \frac{1}{1} = 1. \ \blacksquare$$

$$\lim_{x \to \infty} \left(1 + \frac{1}{x}\right)^x = e, \qquad \lim_{x \to 0} (1 + x)^{1/x} = e.$$

### Power-Exponential Rate Comparisons

$$\lim_{x \to \infty} \frac{x^p}{e^x} = 0 \quad (\text{any } p > 0), \qquad \lim_{x \to \infty} \frac{\ln x}{x^p} = 0 \quad (\text{any } p > 0).$$

*Proof sketch.* For the first: $e^x > \frac{x^{n+1}}{(n+1)!}$ for $x > 0$ (one term of the series), so $\frac{x^p}{e^x} < \frac{(n+1)! x^p}{x^{n+1}} = (n+1)! \cdot x^{p - n - 1} \to 0$ if $n + 1 > p$. $\blacksquare$

> **Rate hierarchy.** As $x \to \infty$:
> $$\ln x \ll x^p \ll e^x \ll x!$$
> where "$\ll$" means strictly slower growth. Specifically, $f \ll g$ iff $f(x)/g(x) \to 0$.

### Power Rules

$$\lim_{x \to 0} \frac{(1+x)^\alpha - 1}{x} = \alpha \quad (\text{any } \alpha \in \mathbb{R}).$$

*Proof.* $(1+x)^\alpha = e^{\alpha \ln(1+x)}$. Let $y = \alpha \ln(1+x)$. As $x \to 0$, $y \to 0$, and $y/x \to \alpha \cdot 1 = \alpha$. So
$$\frac{(1+x)^\alpha - 1}{x} = \frac{e^y - 1}{x} = \frac{e^y - 1}{y} \cdot \frac{y}{x} \to 1 \cdot \alpha = \alpha. \ \blacksquare$$

---

## 18.4 Algebra of Limits, Infinity Version

For limits that are $\pm\infty$, careful case analysis is needed.

> **Rules (careful: some are indeterminate).**
>
> | Limit form | Result |
> |-----------|--------|
> | $\infty + \infty$ | $+\infty$ |
> | $\infty + L$ (finite $L$) | $+\infty$ |
> | $\infty \cdot L$, $L > 0$ | $+\infty$ |
> | $\infty \cdot L$, $L < 0$ | $-\infty$ |
> | $L / \infty$ (finite $L$) | $0$ |
> | $L / 0^+$, $L > 0$ | $+\infty$ |
> | $\infty - \infty$ | **indeterminate** |
> | $0 \cdot \infty$ | **indeterminate** |
> | $\infty / \infty$ | **indeterminate** |
> | $0/0$ | **indeterminate** |
> | $1^\infty$ | **indeterminate** |
> | $0^0$ | **indeterminate** |
> | $\infty^0$ | **indeterminate** |

"Indeterminate" means the limit depends on the specific functions; it cannot be determined from the limit forms alone. L'Hôpital's rule (see [[24-lhopital-vector-derivatives]]) handles most of these.

---

## 18.5 Squeeze/Sandwich Theorem

> **Theorem 18.5 (Squeeze theorem for function limits).**
> If $f(x) \leq g(x) \leq h(x)$ on a deleted neighbourhood of $a$ and $\lim_{x \to a} f(x) = \lim_{x \to a} h(x) = L$, then $\lim_{x \to a} g(x) = L$.

*Proof.* Given $\varepsilon > 0$, find $\delta_1, \delta_2$ so that $|f(x) - L| < \varepsilon$ and $|h(x) - L| < \varepsilon$ respectively. Take $\delta = \min(\delta_1, \delta_2)$. For $0 < |x - a| < \delta$:
$$L - \varepsilon < f(x) \leq g(x) \leq h(x) < L + \varepsilon,$$
so $|g(x) - L| < \varepsilon$. $\blacksquare$

The theorem holds equally for $a = \pm\infty$ and for $L = \pm\infty$ (with suitable interpretation).

---

## 18.6 Continuity and Asymptotics

> **Definition 18.6 (Asymptotes).**
> - $y = L$ is a **horizontal asymptote** of $y = f(x)$ if $\lim_{x \to \infty} f(x) = L$ or $\lim_{x \to -\infty} f(x) = L$.
> - $x = a$ is a **vertical asymptote** of $y = f(x)$ if any of $f(a^+), f(a^-)$ is $\pm\infty$.
> - $y = mx + b$ is a **slant (oblique) asymptote** if $\lim_{x \to \infty} [f(x) - (mx + b)] = 0$ with $m \neq 0$ (and similarly at $-\infty$).

To find a slant asymptote: $m = \lim_{x \to \infty} f(x)/x$, then $b = \lim_{x \to \infty} [f(x) - mx]$.

---

## 18.7 Worked Examples

**Example 1.** Compute $\lim_{x \to 0} \frac{\tan x - \sin x}{x^3}$.

*Solution:*
$$\frac{\tan x - \sin x}{x^3} = \frac{\sin x}{x^3}(1/\cos x - 1) = \frac{\sin x}{x} \cdot \frac{1 - \cos x}{x^2 \cos x}.$$

As $x \to 0$:
- $\sin x / x \to 1$,
- $(1 - \cos x)/x^2 \to 1/2$,
- $1/\cos x \to 1$.

Product: $1 \cdot \frac{1}{2} \cdot 1 = \frac{1}{2}$. $\blacksquare$

---

**Example 2.** Compute $\lim_{x \to \infty} \left(\frac{x+1}{x-1}\right)^x$.

*Solution:* Write
$$\frac{x+1}{x-1} = 1 + \frac{2}{x-1}.$$

Then
$$\left(1 + \frac{2}{x-1}\right)^x = \left[\left(1 + \frac{2}{x-1}\right)^{(x-1)/2}\right]^{2x/(x-1)}.$$

The inner bracket approaches $e$ as $x \to \infty$ (letting $u = (x-1)/2 \to \infty$). The outer exponent $2x/(x-1) \to 2$.

So the limit is $e^2$. $\blacksquare$

---

**Example 3.** Compute $\lim_{x \to \infty} \left(\sqrt{x^2 + x + 1} - x\right)$.

*Solution:* This is of the form $\infty - \infty$. Rationalise:
$$\sqrt{x^2 + x + 1} - x = \frac{x^2 + x + 1 - x^2}{\sqrt{x^2 + x + 1} + x} = \frac{x + 1}{\sqrt{x^2 + x + 1} + x}.$$

Divide numerator and denominator by $x$:
$$\frac{1 + 1/x}{\sqrt{1 + 1/x + 1/x^2} + 1} \to \frac{1 + 0}{\sqrt{1 + 0 + 0} + 1} = \frac{1}{2}. \ \blacksquare$$

---

**Example 4.** Find all asymptotes of $f(x) = \dfrac{x^2 + 1}{x - 1}$.

*Solution:*

**Vertical.** $x = 1$ makes denominator $0$; numerator is $2 \neq 0$. $\lim_{x \to 1^+} f = +\infty$, $\lim_{x \to 1^-} f = -\infty$. So $x = 1$ is a vertical asymptote.

**Horizontal.** $\lim_{x \to \pm\infty} f(x)$: polynomial division,
$$\frac{x^2 + 1}{x - 1} = x + 1 + \frac{2}{x - 1}.$$
As $x \to \infty$, $f(x) \to \infty$; as $x \to -\infty$, $f(x) \to -\infty$. No horizontal asymptote.

**Slant.** $f(x) = x + 1 + \frac{2}{x-1}$, and the last term $\to 0$ as $x \to \pm\infty$. So $y = x + 1$ is a slant asymptote (both directions). $\blacksquare$

---

**Example 5.** Show $\lim_{x \to 0^+} x \ln x = 0$.

*Solution:* This is of the form $0 \cdot \infty$ (or $0 \cdot (-\infty)$, since $\ln x \to -\infty$).

Substitute $u = 1/x$, so $u \to \infty$ as $x \to 0^+$:
$$x \ln x = \frac{\ln(1/u)}{u} = -\frac{\ln u}{u} \to -0 = 0$$
since $\ln u / u \to 0$ (rate comparison). $\blacksquare$

This also justifies the convention $0^0 = 1$ in many contexts: $\lim_{x \to 0^+} x^x = \lim e^{x \ln x} = e^0 = 1$.

---

## 18.8 Practice Problems

1. Compute $\lim_{x \to 0} \frac{\sin(ax)}{\sin(bx)}$ for $a, b \in \mathbb{R}, b \neq 0$.

2. Compute $\lim_{x \to \infty} x\left(\sqrt{x^2 + 1} - \sqrt{x^2 - 1}\right)$.

3. Compute $\lim_{x \to 0} \frac{a^x - 1}{x}$ for $a > 0$.

4. Find all asymptotes of $g(x) = \sqrt{x^2 + 2x}$.

5. Prove that $\lim_{x \to 0^+} x^\alpha \ln x = 0$ for every $\alpha > 0$.

### Solutions

**1.** 
$$\frac{\sin(ax)}{\sin(bx)} = \frac{\sin(ax)}{ax} \cdot \frac{bx}{\sin(bx)} \cdot \frac{a}{b} \to 1 \cdot 1 \cdot \frac{a}{b} = \frac{a}{b}. \ \blacksquare$$

---

**2.** Rationalise:
$$x(\sqrt{x^2+1} - \sqrt{x^2-1}) = \frac{x((x^2+1) - (x^2-1))}{\sqrt{x^2+1} + \sqrt{x^2-1}} = \frac{2x}{\sqrt{x^2+1} + \sqrt{x^2-1}}.$$

Divide by $x$:
$$\frac{2}{\sqrt{1 + 1/x^2} + \sqrt{1 - 1/x^2}} \to \frac{2}{1 + 1} = 1. \ \blacksquare$$

---

**3.** Write $a^x = e^{x \ln a}$:
$$\frac{a^x - 1}{x} = \frac{e^{x \ln a} - 1}{x} = \frac{e^{x \ln a} - 1}{x \ln a} \cdot \ln a \to 1 \cdot \ln a = \ln a. \ \blacksquare$$

---

**4.** $g(x) = \sqrt{x^2 + 2x}$. Domain: $x^2 + 2x \geq 0$, i.e., $x \leq -2$ or $x \geq 0$.

**No vertical asymptote** (inside the domain, the function is continuous; at the boundary $x = 0, -2$, $g(0) = 0$, $g(-2) = 0$ — continuous).

**Horizontal?** As $x \to \pm\infty$, $g(x) \to +\infty$. No horizontal.

**Slant as $x \to +\infty$.**
$$m = \lim_{x \to \infty} \frac{\sqrt{x^2 + 2x}}{x} = \lim_{x \to \infty} \sqrt{1 + 2/x} = 1.$$
$$b = \lim_{x \to \infty} (\sqrt{x^2 + 2x} - x) = \lim_{x \to \infty} \frac{2x}{\sqrt{x^2+2x}+x} = \lim_{x \to \infty} \frac{2}{\sqrt{1 + 2/x}+1} = 1.$$

Slant asymptote as $x \to +\infty$: $y = x + 1$.

**As $x \to -\infty$.** For $x < 0$, $|x| = -x$, so $\sqrt{x^2+2x}/x = -\sqrt{1 + 2/x} \to -1$. Hence $m = -1$.
$$b = \lim_{x \to -\infty}(\sqrt{x^2+2x} + x) = \lim_{x \to -\infty} \frac{2x}{\sqrt{x^2+2x} - x}.$$
Denominator: for $x < 0$, $\sqrt{x^2+2x} - x > 0$, and $\sqrt{x^2+2x} = |x|\sqrt{1 + 2/x} \to |x|\cdot 1 = -x$. So denom $\to -x - x = -2x$. Thus $b = \lim 2x/(-2x) = -1$.

Slant asymptote as $x \to -\infty$: $y = -x - 1$. $\blacksquare$

---

**5.** Substitute $u = 1/x$, so $u \to \infty$ as $x \to 0^+$:
$$x^\alpha \ln x = \left(\frac{1}{u}\right)^\alpha \ln\left(\frac{1}{u}\right) = -\frac{\ln u}{u^\alpha}.$$

By the rate comparison $\ln u / u^\alpha \to 0$ for any $\alpha > 0$ (see Section 18.3), this $\to 0$. $\blacksquare$

---

## 18.9 Summary Table of Key Limits

| Limit | Value | Technique |
|-------|-------|-----------|
| $\lim_{x \to 0} \sin x / x$ | $1$ | Geometric/sandwich |
| $\lim_{x \to 0} (1 - \cos x)/x^2$ | $1/2$ | $1-\cos = 2\sin^2(x/2)$ |
| $\lim_{x \to 0} \tan x / x$ | $1$ | $\tan = \sin/\cos$ |
| $\lim_{x \to 0} (e^x - 1)/x$ | $1$ | Power series / definition |
| $\lim_{x \to 0} \ln(1+x)/x$ | $1$ | Inverse of exponential limit |
| $\lim_{x \to \infty} (1 + 1/x)^x$ | $e$ | Definition of $e$ |
| $\lim_{x \to 0}(1 + x)^{1/x}$ | $e$ | Substitute $u = 1/x$ |
| $\lim_{x \to 0} ((1+x)^\alpha - 1)/x$ | $\alpha$ | $e^{\alpha \ln(1+x)}$ |
| $\lim_{x \to \infty} x^p / e^x$ | $0$ | Exp beats poly |
| $\lim_{x \to \infty} \ln x / x^p$ | $0$ | Poly beats log |
| $\lim_{x \to 0^+} x^\alpha \ln x$ | $0$ | Substitute $u = 1/x$ |

> **Universal technique.** Whenever you face an indeterminate form, the goal is to rearrange algebraically until you can apply one of these standard limits, a sandwich, or L'Hôpital. Memorise the values; learn to recognise them through disguises.

---

## Related Topics

- [[16-continuity]] — $\varepsilon$-$\delta$, sequential definition
- [[17-types-of-discontinuity-monotonic]] — classification of discontinuities
- [[20-ivt-and-connectedness]] — continuity on intervals
- [[24-lhopital-vector-derivatives]] — L'Hôpital's rule for indeterminate forms
- [[12-infinite-series-introduction]] — Taylor/power series underlying many limits
- [[09-convergence-and-limits]] — sequence analogs ($n \to \infty$ limits)
