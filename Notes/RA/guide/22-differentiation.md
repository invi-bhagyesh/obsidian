# 22. Differentiation

Differentiation converts a function at a point into its **instantaneous rate of change**, an idea central to calculus, dynamics, and optimisation. In this lesson we set up the derivative rigorously via limits, derive the standard algebraic rules, prove the **chain rule**, discuss **one-sided derivatives**, and state **Darboux's theorem** — the striking result that derivatives themselves satisfy an intermediate value property, even when they are not continuous.

---

## 22.1 The Definition of the Derivative

> **Definition 22.1 (Derivative at a point).**
> Let $f : E \to \mathbb{R}$ and let $a \in E$ be a **limit point** of $E$. We say $f$ is **differentiable** at $a$ if the limit
> $f'(a) := \lim_{h \to 0} \frac{f(a + h) - f(a)}{h}$
> exists (as a finite real number). The value $f'(a)$ is called the **derivative** of $f$ at $a$.

> **Equivalent forms.**
> $f'(a) = \lim_{x \to a} \frac{f(x) - f(a)}{x - a}.$
>
> The expression $\dfrac{f(x) - f(a)}{x - a}$ is the **slope of the secant line** joining $(a, f(a))$ and $(x, f(x))$. The derivative is the limit of such slopes, i.e., the **slope of the tangent line**.

> **Notation.** $f'(a)$ (Lagrange), $\dot{f}(a)$ (Newton), $\dfrac{df}{dx}\bigg|_{a}$ (Leibniz), $D f(a)$.

---

## 22.2 Differentiability Implies Continuity

> **Theorem 22.2.** If $f$ is differentiable at $a$, then $f$ is continuous at $a$.

*Proof.* We want $\lim_{x \to a} f(x) = f(a)$, i.e., $\lim_{x \to a} (f(x) - f(a)) = 0$. Write (for $x \neq a$):
$$f(x) - f(a) = \frac{f(x) - f(a)}{x - a} \cdot (x - a).$$

Taking the limit:
$$\lim_{x \to a} (f(x) - f(a)) = f'(a) \cdot \lim_{x \to a} (x - a) = f'(a) \cdot 0 = 0.$$

So $f$ is continuous at $a$. $\blacksquare$

> **Converse is false.** $f(x) = |x|$ is continuous at $0$ but not differentiable: $\lim_{h \to 0^+} (|h| - 0)/h = 1$, $\lim_{h \to 0^-} = -1$. Different one-sided derivatives, so no derivative at $0$.

> **Remarkable fact (Weierstrass, 1872).** There exist functions continuous on all of $\mathbb{R}$ but differentiable **nowhere**. Example:
> $W(x) = \sum_{n=0}^{\infty} a^n \cos(b^n \pi x)$
> for $0 < a < 1$, $b$ an odd integer with $ab > 1 + 3\pi/2$. The series converges uniformly (Weierstrass M-test), giving continuity, but the sum is nowhere differentiable.

---

## 22.3 Algebraic Rules

> **Theorem 22.3 (Algebraic differentiation rules).**
> If $f, g$ are differentiable at $a$, then:
>
> (i) **Sum:** $(f + g)'(a) = f'(a) + g'(a)$.
>
> (ii) **Constant multiple:** $(cf)'(a) = c f'(a)$.
>
> (iii) **Product (Leibniz):** $(fg)'(a) = f'(a) g(a) + f(a) g'(a)$.
>
> (iv) **Quotient:** if $g(a) \neq 0$, $(f/g)'(a) = \dfrac{f'(a) g(a) - f(a) g'(a)}{g(a)^2}$.

*Proofs.*

**(i), (ii):** Linearity of limits.

**(iii) Product rule.** Write
$$\frac{(fg)(x) - (fg)(a)}{x - a} = \frac{f(x) g(x) - f(a) g(x) + f(a) g(x) - f(a) g(a)}{x - a}$$
$$= \frac{f(x) - f(a)}{x - a} g(x) + f(a) \frac{g(x) - g(a)}{x - a}.$$

As $x \to a$: first term $\to f'(a) g(a)$ (using $g(x) \to g(a)$, i.e., continuity of $g$ which follows from differentiability). Second term $\to f(a) g'(a)$. Sum: $f'(a) g(a) + f(a) g'(a)$.

**(iv) Quotient rule.** Write $f/g = f \cdot (1/g)$. First compute $(1/g)'(a)$:
$$\frac{1/g(x) - 1/g(a)}{x - a} = \frac{g(a) - g(x)}{(x - a) g(x) g(a)} \to -\frac{g'(a)}{g(a)^2}.$$
Then product rule: $(f/g)'(a) = f'(a) \cdot \frac{1}{g(a)} + f(a) \cdot \left(-\frac{g'(a)}{g(a)^2}\right) = \frac{f'(a) g(a) - f(a) g'(a)}{g(a)^2}$. $\blacksquare$

---

## 22.4 The Chain Rule

> **Theorem 22.4 (Chain rule).**
> Let $f : E \to \mathbb{R}$, $g : F \to \mathbb{R}$, $f(E) \subset F$. Suppose $f$ is differentiable at $a$ and $g$ is differentiable at $f(a)$. Then $g \circ f$ is differentiable at $a$ and
> $(g \circ f)'(a) = g'(f(a)) \cdot f'(a).$

*Proof (Carathéodory's approach).* Write $b = f(a)$. Define
$$\phi(x) = \begin{cases} \dfrac{f(x) - f(a)}{x - a} & x \neq a \\ f'(a) & x = a \end{cases}, \qquad \psi(y) = \begin{cases} \dfrac{g(y) - g(b)}{y - b} & y \neq b \\ g'(b) & y = b \end{cases}.$$

Both $\phi$ at $a$ and $\psi$ at $b$ are continuous (since derivatives exist). For $x \neq a$:
$$\frac{g(f(x)) - g(f(a))}{x - a} = \psi(f(x)) \cdot \phi(x),$$
valid even when $f(x) = f(a)$ (then both sides are zero: the right because we set $\psi(b) = g'(b)$ when $y = b$ but the definition handles $y = b$ gracefully — careful reading of Carathéodory's trick).

Taking $x \to a$: $\phi(x) \to f'(a)$, and $f(x) \to f(a) = b$, so $\psi(f(x)) \to \psi(b) = g'(b)$. Product: $g'(b) \cdot f'(a) = g'(f(a)) f'(a)$. $\blacksquare$

> **Naive (incorrect) proof.** Writing
> $$\frac{g(f(x)) - g(f(a))}{x - a} = \frac{g(f(x)) - g(f(a))}{f(x) - f(a)} \cdot \frac{f(x) - f(a)}{x - a}$$
> fails when $f(x) = f(a)$ for $x$ arbitrarily close to $a$ (like $f(x) = x^2 \sin(1/x)$ near $0$). Carathéodory's $\phi, \psi$ formulation avoids the issue.

---

## 22.5 Standard Derivatives

Using the definition and algebraic rules:

| $f(x)$                                        | $f'(x)$                 | Notes                               |
| --------------------------------------------- | ----------------------- | ----------------------------------- |
| $c$ (constant)                                | $0$                     |                                     |
| $x^n$ ($n \in \mathbb{N}$)                    | $n x^{n-1}$             | induction on $n$ + product          |
| $x^\alpha$ ($\alpha \in \mathbb{R}$, $x > 0$) | $\alpha x^{\alpha - 1}$ | $e^{\alpha \ln x}$ + chain          |
| $e^x$                                         | $e^x$                   | power series / definition           |
| $a^x$                                         | $a^x \ln a$             | $e^{x \ln a}$ + chain               |
| $\ln x$                                       | $1/x$                   | inverse of $e^x$ + chain            |
| $\log_a x$                                    | $1/(x \ln a)$           |                                     |
| $\sin x$                                      | $\cos x$                | $(\sin(x+h) - \sin x)/h \to \cos x$ |
| $\cos x$                                      | $-\sin x$               |                                     |
| $\tan x$                                      | $\sec^2 x$              | quotient rule                       |
| $\arcsin x$                                   | $1/\sqrt{1-x^2}$        | inverse + chain                     |
| $\arccos x$                                   | $-1/\sqrt{1-x^2}$       |                                     |
| $\arctan x$                                   | $1/(1+x^2)$             |                                     |
| $\sinh x$                                     | $\cosh x$               |                                     |
| $\cosh x$                                     | $\sinh x$               |                                     |

*Proof of $\frac{d}{dx}\sin x = \cos x$.* Using the angle-addition identity:
$$\frac{\sin(x+h) - \sin x}{h} = \frac{\sin x \cos h + \cos x \sin h - \sin x}{h} = \sin x \cdot \frac{\cos h - 1}{h} + \cos x \cdot \frac{\sin h}{h}.$$
As $h \to 0$: $(\cos h - 1)/h \to 0$ (since $(1 - \cos h)/h^2 \to 1/2$ means $(1-\cos h)/h \to 0$), $(\sin h)/h \to 1$. Limit: $\sin x \cdot 0 + \cos x \cdot 1 = \cos x$. $\blacksquare$

---

## 22.6 One-Sided Derivatives

> **Definition 22.5.** If the limit $\lim_{h \to 0^+} \frac{f(a+h) - f(a)}{h} = f'_+(a)$ exists, it is the **right-hand derivative**. Similarly for the **left-hand derivative** $f'_-(a)$.

$f'(a)$ exists iff both one-sided derivatives exist and are equal.

**Example.** $f(x) = |x|$ has $f'_+(0) = 1$, $f'_-(0) = -1$, so $f'(0)$ does not exist.

---

## 22.7 Derivatives and Monotonicity (Preview)

> **Theorem 22.6.** Let $f$ be differentiable on an interval $I$ and $a$ be an interior point of $I$.
>
> - If $f$ has a **local maximum** at $a$, then $f'(a) = 0$.
> - If $f$ has a **local minimum** at $a$, then $f'(a) = 0$.

*Proof.* Suppose $f(a) \geq f(a + h)$ for all small $|h|$ (local max).

For $h > 0$: $(f(a + h) - f(a))/h \leq 0$, so $f'(a) = \lim_{h \to 0^+} (\ldots) \leq 0$.

For $h < 0$: $(f(a + h) - f(a))/h \geq 0$ (numerator $\leq 0$, denominator $< 0$), so $f'(a) = \lim_{h \to 0^-} (\ldots) \geq 0$.

Both: $f'(a) = 0$. $\blacksquare$

> **Critical points.** A point $a$ where $f'(a) = 0$ is called **critical**. Local extrema occur only at critical points or at endpoints/non-differentiable points.

> **Note.** The converse is false: $f'(a) = 0$ does not imply a local extremum. Example: $f(x) = x^3$ has $f'(0) = 0$ but no extremum at $0$.

---

## 22.8 Darboux's Theorem

A remarkable fact: derivatives need not be continuous, yet they satisfy an analog of IVT.

> **Theorem 22.7 (Darboux's intermediate value theorem for derivatives).**
> Let $f : [a, b] \to \mathbb{R}$ be differentiable on $[a, b]$ (with one-sided derivatives at the endpoints). For any value $c$ strictly between $f'(a)$ and $f'(b)$, there exists $\xi \in (a, b)$ with $f'(\xi) = c$.

*Proof.* Assume WLOG $f'(a) < c < f'(b)$. Define $g(x) = f(x) - cx$. Then $g'(x) = f'(x) - c$, so $g'(a) < 0 < g'(b)$.

$g$ is continuous on $[a, b]$ (differentiable implies continuous), hence attains a minimum on $[a, b]$ at some $\xi \in [a, b]$ (EVT).

- At $x = a$: $g'(a) < 0$ means $g(a + h) < g(a)$ for small $h > 0$. So the min is **not** at $a$.
- At $x = b$: $g'(b) > 0$ means $g(b - h) < g(b)$ for small $h > 0$. So the min is **not** at $b$.

Hence $\xi \in (a, b)$, an interior minimum. By Theorem 22.6, $g'(\xi) = 0$, i.e., $f'(\xi) = c$. $\blacksquare$

> **Consequence.** A derivative $f'$ cannot have a jump discontinuity. If $f'$ were discontinuous at $a$ with $f'(a^+) \neq f'(a^-)$ existing as finite limits, then all values between these one-sided limits would be attained by $f'$ near $a$ (by Darboux), yet $f'$ jumps from one to the other — contradiction.

> **Derivative pathology.** Derivatives **can** be discontinuous (not every derivative is continuous), but only with **essential** discontinuities (oscillation). Classical example: $f(x) = x^2 \sin(1/x)$ with $f(0) = 0$, has $f'(0) = 0$ but $f'(x) = 2x \sin(1/x) - \cos(1/x)$ for $x \neq 0$, which oscillates wildly near $0$.

---

## 22.9 Higher Derivatives

> **Definition 22.8.** If $f'$ exists on a neighbourhood of $a$ and is itself differentiable at $a$, the **second derivative** is $f''(a) = (f')'(a)$. Higher derivatives $f^{(n)}$ are defined recursively.
>
> We write $C^n(E)$ for the set of functions on $E$ with continuous derivatives up to order $n$, and $C^\infty$ for infinitely differentiable.

**Examples.**
- Polynomials are $C^\infty$.
- $e^x, \sin x, \cos x$ are $C^\infty$.
- $|x|$ is $C^0$ but not $C^1$.
- $x |x|$ is $C^1$ (derivative $= 2|x|$) but not $C^2$.
- For $k \geq 1$: $x^k |x|$ is $C^k$ but not $C^{k+1}$.

---

## 22.10 Worked Examples

**Example 1.** Using the definition, find the derivative of $f(x) = x^3$.

*Solution:*
$$f'(a) = \lim_{h \to 0} \frac{(a+h)^3 - a^3}{h} = \lim_{h \to 0} \frac{3a^2 h + 3a h^2 + h^3}{h} = \lim_{h \to 0} (3a^2 + 3ah + h^2) = 3a^2. \ \blacksquare$$

---

**Example 2.** Differentiate $f(x) = x^x$ for $x > 0$.

*Solution:* Write $f(x) = e^{x \ln x}$. By chain rule,
$$f'(x) = e^{x \ln x} \cdot (x \ln x)' = x^x \cdot (\ln x + 1). \ \blacksquare$$

---

**Example 3.** Let $f(x) = \begin{cases} x^2 \sin(1/x) & x \neq 0 \\ 0 & x = 0 \end{cases}$. Compute $f'(0)$ and show $f'$ is discontinuous at $0$.

*Solution:*

$f'(0) = \lim_{h \to 0} \frac{h^2 \sin(1/h) - 0}{h} = \lim_{h \to 0} h \sin(1/h) = 0$ (sandwich: $|h \sin(1/h)| \leq |h|$).

For $x \neq 0$, by product + chain rule:
$$f'(x) = 2x \sin(1/x) + x^2 \cos(1/x) \cdot (-1/x^2) = 2x \sin(1/x) - \cos(1/x).$$

As $x \to 0$: $2x \sin(1/x) \to 0$ but $\cos(1/x)$ oscillates between $-1$ and $1$. So $\lim_{x \to 0} f'(x)$ does not exist.

Hence $f'$ is defined everywhere but discontinuous at $0$ (essentially, 2nd-kind). By Darboux, this is "allowed" since $f'$ has an essential discontinuity, not a jump. $\blacksquare$

---

**Example 4.** Show that $f(x) = |x|^3$ is twice but not three times differentiable at $0$.

*Solution:* Write $f(x) = |x|^3 = \begin{cases} x^3 & x \geq 0 \\ -x^3 & x < 0 \end{cases}$.

$f'(x) = \begin{cases} 3x^2 & x \geq 0 \\ -3x^2 & x < 0 \end{cases} = 3 x^2 \operatorname{sgn}(x) + 0$, or more simply $f'(x) = 3 x |x|$.

At $x = 0$: $f'_+(0) = f'_-(0) = 0$, so $f'(0) = 0$, and $f'(x) = 3x|x|$ everywhere.

$f''(x) = 6|x|$ (from differentiating $3x|x| = 3x \cdot \operatorname{sgn}(x) \cdot x$ for $x \neq 0$, and checking at $0$: $f''(0) = \lim_{h \to 0} (3h|h|)/h = \lim 3|h| = 0$).

$f''$ is continuous but not differentiable at $0$: $f''(x) = 6|x|$ is the same shape as $|x|$. Hence $f$ is $C^2$ but not $C^3$. $\blacksquare$

---

**Example 5.** Show from first principles that if $f$ has a local maximum at $a$ (interior point of the domain) and $f$ is differentiable at $a$, then $f'(a) = 0$.

*Solution:* Already proved above as Theorem 22.6. Restating the argument clearly:

Suppose $f(a) \geq f(x)$ for all $x$ in some neighbourhood $(a - \delta, a + \delta)$.

For $0 < h < \delta$: $\dfrac{f(a+h) - f(a)}{h} \leq 0$ (numerator $\leq 0$, denominator $> 0$). Taking $h \to 0^+$: $f'(a) \leq 0$.

For $-\delta < h < 0$: $\dfrac{f(a+h) - f(a)}{h} \geq 0$ (numerator $\leq 0$, denominator $< 0$). Taking $h \to 0^-$: $f'(a) \geq 0$.

Both conditions: $f'(a) = 0$. $\blacksquare$

---

## 22.11 Practice Problems

1. Using the definition, show $(e^x)' = e^x$.

2. Compute $\frac{d}{dx}[\sin(\ln(1 + x^2))]$.

3. Let $f(x) = x^{1/3}$. Show $f$ is not differentiable at $0$, but is continuous there. Classify the type of failure.

4. Let $f : [0, 1] \to \mathbb{R}$ be differentiable with $f'(0) = 2$ and $f'(1) = -3$. Using Darboux, show $f'(\xi) = 0$ for some $\xi \in (0, 1)$.

5. Show that if $f : \mathbb{R} \to \mathbb{R}$ satisfies $|f(x) - f(y)| \leq (x - y)^2$ for all $x, y$, then $f$ is constant.

### Solutions

**1.** Use the limit definition of $e^x$ or the power series. Using the limit $\lim_{h \to 0}(e^h - 1)/h = 1$:
$$\frac{e^{x+h} - e^x}{h} = e^x \cdot \frac{e^h - 1}{h} \to e^x \cdot 1 = e^x. \ \blacksquare$$

---

**2.** Let $u = 1 + x^2$, $v = \ln u$, $y = \sin v$.
$$\frac{dy}{dx} = \cos v \cdot \frac{1}{u} \cdot 2x = \frac{2x \cos(\ln(1 + x^2))}{1 + x^2}. \ \blacksquare$$

---

**3.** $f(x) = x^{1/3}$. At $a = 0$:
$$\lim_{h \to 0} \frac{h^{1/3} - 0}{h} = \lim_{h \to 0} h^{-2/3}.$$
As $h \to 0^+$ (or $h \to 0^-$), $h^{-2/3} \to +\infty$. So the derivative **does not exist** (infinite). $f$ has a **vertical tangent** at the origin.

$f$ is continuous at $0$: $\lim_{h \to 0} h^{1/3} = 0 = f(0)$. ✓. So the failure is: continuity yes, differentiability no. $\blacksquare$

---

**4.** $0$ is strictly between $f'(0) = 2$ and $f'(1) = -3$. By Darboux's theorem applied to $f$ on $[0, 1]$, there is $\xi \in (0, 1)$ with $f'(\xi) = 0$. $\blacksquare$

---

**5.** Fix $a \in \mathbb{R}$. For $x \neq a$:
$$\left|\frac{f(x) - f(a)}{x - a}\right| \leq \frac{(x - a)^2}{|x - a|} = |x - a|.$$

As $x \to a$, this $\to 0$, so $f'(a) = 0$. This holds for every $a$; hence $f' \equiv 0$. By the MVT (or by direct argument — "a function with identically zero derivative is constant", see [[23-mean-value-theorems]]), $f$ is constant. $\blacksquare$

---

## 22.12 Summary

> **Core definitions.**
> - $f'(a) = \lim_{h \to 0} \frac{f(a+h) - f(a)}{h}$.
> - Differentiable ⇒ continuous (not reverse).
> - One-sided derivatives $f'_+, f'_-$; bilateral exists iff one-sided exist and agree.

> **Algebraic rules.** Sum, scalar, product, quotient, chain — memorise and use fluently.

> **Key facts.**
> - Interior local extrema have $f'(a) = 0$ (Fermat).
> - **Darboux:** derivatives satisfy the intermediate value property, even if discontinuous.
> - Derivatives can have essential discontinuities but **never jump discontinuities**.

> **The derivative is the central object of differential calculus**, and nearly every theorem in the next chapters (MVT, Taylor, L'Hôpital) rests on this definition.

---

## Related Topics

- [[16-continuity]] — differentiability implies continuity
- [[23-mean-value-theorems]] — Rolle, Lagrange MVT, Taylor's theorem
- [[24-lhopital-vector-derivatives]] — L'Hôpital's rule and vector-valued case
- [[20-ivt-and-connectedness]] — IVT, used in Darboux's theorem indirectly
- [[17-types-of-discontinuity-monotonic]] — derivatives and classification of discontinuities
- [[VACV/guide/02-vector-calculus]] — vector calculus analog (partial derivatives, gradient)
