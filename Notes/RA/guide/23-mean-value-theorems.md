# 23. Mean Value Theorems and Taylor's Theorem

The **Mean Value Theorem** is one of the most important theorems in differential calculus. It asserts, roughly, that over any interval, at some interior point the **instantaneous rate of change** equals the **average rate of change**. From it flow:

- The classical **monotonicity tests**: $f' > 0 \Rightarrow f$ strictly increasing, etc.
- The **constant-on-interval characterization**: $f' \equiv 0 \Rightarrow f$ constant.
- **Taylor's theorem** with remainder — the cornerstone of polynomial approximation.
- **Darboux's theorem** (in a quick form).

We prove Rolle's theorem first, then Lagrange's (the standard MVT), then Cauchy's generalised MVT, and finally Taylor's theorem with multiple forms of the remainder.

---

## 23.1 Rolle's Theorem

> **Theorem 23.1 (Rolle).**
> Let $f : [a, b] \to \mathbb{R}$ satisfy:
> (i) $f$ is continuous on $[a, b]$,
>
> (ii) $f$ is differentiable on $(a, b)$,
>
> (iii) $f(a) = f(b)$.
>
> Then there exists $\xi \in (a, b)$ with $f'(\xi) = 0$.

*Proof.* If $f$ is constant on $[a, b]$, then $f' \equiv 0$ and any $\xi \in (a, b)$ works.

Otherwise, $f$ takes some value different from $f(a) = f(b)$ somewhere in $(a, b)$. By the EVT (Theorem 20.2), $f$ attains its max $M$ and min $m$ on $[a, b]$. At least one of $M, m$ differs from $f(a) = f(b)$.

Say $M \neq f(a)$ (the case $m \neq f(a)$ is symmetric). Then the max is attained at some $\xi \in (a, b)$ — strictly interior. By Theorem 22.6 (Fermat), $f'(\xi) = 0$. $\blacksquare$

> **Geometric interpretation.** If a continuous, differentiable curve starts and ends at the same height, somewhere in between the tangent line must be horizontal.

> **Why all three hypotheses matter:**
> - $f(x) = x$ on $[0, 1]$: fails (iii), no $\xi$ with $f'(\xi) = 0$.
> - $f(x) = |x|$ on $[-1, 1]$: fails (ii) at $0$, no $\xi$ with $f'(\xi) = 0$.
> - $f(x) = x$ on $[0, 1]$ but with $f(1) = 0$ redefined: fails (i), no $\xi$ with $f'(\xi) = 0$.

---

## 23.2 Lagrange's Mean Value Theorem

> **Theorem 23.2 (Lagrange MVT).**
> Let $f : [a, b] \to \mathbb{R}$ be continuous on $[a, b]$ and differentiable on $(a, b)$. Then there exists $\xi \in (a, b)$ with
> $f'(\xi) = \frac{f(b) - f(a)}{b - a}.$

*Proof.* Define
$$g(x) = f(x) - \frac{f(b) - f(a)}{b - a}(x - a).$$

Then $g$ is continuous on $[a, b]$ and differentiable on $(a, b)$. Compute:
$$g(a) = f(a), \qquad g(b) = f(b) - (f(b) - f(a)) = f(a).$$

So $g(a) = g(b)$. By Rolle, some $\xi \in (a, b)$ with $g'(\xi) = 0$. Compute:
$$g'(x) = f'(x) - \frac{f(b) - f(a)}{b - a},$$
so $g'(\xi) = 0$ gives $f'(\xi) = (f(b) - f(a))/(b - a)$. $\blacksquare$

> **Geometric interpretation.** On any smooth curve, somewhere the **tangent line is parallel to the chord** joining the endpoints.

> **Equivalent "Lagrange form."** For every $x \in [a, b]$,
> $f(x) = f(a) + f'(\xi)(x - a)$
> for some $\xi$ between $a$ and $x$. This is the "MVT remainder" form.

---

## 23.3 Consequences of MVT

These follow immediately and are among the most useful theorems in calculus.

> **Theorem 23.3 (Constant function characterization).**
> If $f : [a, b] \to \mathbb{R}$ is differentiable on $(a, b)$ and continuous on $[a, b]$ with $f'(x) = 0$ for all $x \in (a, b)$, then $f$ is constant on $[a, b]$.

*Proof.* For any $x \in (a, b]$: by MVT applied on $[a, x]$, $f(x) - f(a) = f'(\xi)(x - a) = 0$. So $f(x) = f(a)$. $\blacksquare$

> **Corollary 23.4.** If $f' \equiv g'$ on an interval, then $f - g$ is constant on that interval.

> **Theorem 23.5 (Monotonicity tests).**
> Suppose $f$ is continuous on $[a, b]$ and differentiable on $(a, b)$.
>
> (a) If $f'(x) \geq 0$ on $(a, b)$, then $f$ is increasing on $[a, b]$.
>
> (b) If $f'(x) > 0$ on $(a, b)$, then $f$ is strictly increasing on $[a, b]$.
>
> (c) If $f'(x) \leq 0$ on $(a, b)$, then $f$ is decreasing. If $f'(x) < 0$, strictly decreasing.

*Proof.* For any $x < y$ in $[a, b]$, by MVT $f(y) - f(x) = f'(\xi)(y - x)$ for some $\xi \in (x, y)$. If $f'(\xi) \geq 0$, $f(y) \geq f(x)$. If $f'(\xi) > 0$, $f(y) > f(x)$. $\blacksquare$

> **Remark.** The converse of (b) is **false** in one direction: $f$ strictly increasing does not imply $f' > 0$ everywhere. Example: $f(x) = x^3$ is strictly increasing on $\mathbb{R}$ but $f'(0) = 0$. However, $f'(x) \geq 0$ is necessary.

> **Theorem 23.6 (Lipschitz via bounded derivative).**
> If $f$ is differentiable on an interval $I$ with $|f'(x)| \leq L$ for all $x \in I$, then $|f(x) - f(y)| \leq L |x - y|$ for all $x, y \in I$.

*Proof.* By MVT, $f(x) - f(y) = f'(\xi)(x - y)$, so $|f(x) - f(y)| = |f'(\xi)||x - y| \leq L|x - y|$. $\blacksquare$

---

## 23.4 Cauchy's Generalised MVT

> **Theorem 23.7 (Cauchy MVT).**
> Let $f, g : [a, b] \to \mathbb{R}$ be continuous on $[a, b]$ and differentiable on $(a, b)$. Then there exists $\xi \in (a, b)$ with
> $(f(b) - f(a)) g'(\xi) = (g(b) - g(a)) f'(\xi).$
>
> If additionally $g(a) \neq g(b)$ and $g'(\xi) \neq 0$, this can be written
> $\frac{f(b) - f(a)}{g(b) - g(a)} = \frac{f'(\xi)}{g'(\xi)}.$

*Proof.* Define
$$h(x) = (f(b) - f(a)) g(x) - (g(b) - g(a)) f(x).$$

$h$ is continuous on $[a, b]$ and differentiable on $(a, b)$. Compute:
$$h(a) = (f(b) - f(a)) g(a) - (g(b) - g(a)) f(a) = f(b) g(a) - f(a) g(b),$$
$$h(b) = (f(b) - f(a)) g(b) - (g(b) - g(a)) f(b) = f(b) g(a) - f(a) g(b).$$

So $h(a) = h(b)$. By Rolle, some $\xi \in (a, b)$ with $h'(\xi) = 0$, i.e.,
$$(f(b) - f(a)) g'(\xi) - (g(b) - g(a)) f'(\xi) = 0. \ \blacksquare$$

**Special case: $g(x) = x$ recovers Lagrange's MVT.**

**Purpose of Cauchy MVT.** It is the key tool to prove L'Hôpital's rule (see [[24-lhopital-vector-derivatives]]) and to derive the **Cauchy form of the remainder** in Taylor's theorem.

---

## 23.5 Taylor's Theorem

> **Theorem 23.8 (Taylor's theorem with Lagrange remainder).**
> Let $f : [a, b] \to \mathbb{R}$ be $n$ times differentiable on $[a, b]$, with $f^{(n)}$ continuous on $[a, b]$ and $f^{(n+1)}$ existing on $(a, b)$. For every $x \in (a, b]$, there exists $\xi \in (a, x)$ such that
> $f(x) = \sum_{k=0}^{n} \frac{f^{(k)}(a)}{k!} (x - a)^k + R_n(x),$
> where the **Lagrange remainder** is
> $R_n(x) = \frac{f^{(n+1)}(\xi)}{(n+1)!} (x - a)^{n+1}.$

The polynomial $T_n(x) = \sum_{k=0}^{n} \frac{f^{(k)}(a)}{k!} (x - a)^k$ is the **$n$-th Taylor polynomial** of $f$ centred at $a$.

*Proof.* Fix $x \neq a$. Define
$$M = \frac{f(x) - \sum_{k=0}^{n} \frac{f^{(k)}(a)}{k!} (x - a)^k}{(x - a)^{n+1}}.$$

So $f(x) = T_n(x) + M (x - a)^{n+1}$. We must show $M = f^{(n+1)}(\xi)/(n+1)!$ for some $\xi$.

Define $g : [a, x] \to \mathbb{R}$ by
$$g(t) = f(x) - \sum_{k=0}^{n} \frac{f^{(k)}(t)}{k!} (x - t)^k - M (x - t)^{n+1}.$$

Note $g(a) = f(x) - T_n(x) - M(x-a)^{n+1} = 0$ (by definition of $M$), and $g(x) = f(x) - f(x) - 0 = 0$. So $g(a) = g(x)$.

By Rolle's theorem, some $\xi \in (a, x)$ with $g'(\xi) = 0$. Computing $g'(t)$ (the sum telescopes; only one term survives — the one with $k = n$):
$$g'(t) = -\frac{f^{(n+1)}(t)}{n!}(x - t)^n + M (n+1)(x - t)^n.$$

Setting $g'(\xi) = 0$:
$$M (n+1)(x - \xi)^n = \frac{f^{(n+1)}(\xi)}{n!} (x - \xi)^n,$$
hence $M = \frac{f^{(n+1)}(\xi)}{(n+1)!}$, as required. $\blacksquare$

> **Special case $n = 0$.** $f(x) = f(a) + f'(\xi)(x - a)$ — recovers Lagrange's MVT.

> **Standard Maclaurin series.** For $a = 0$ (the centre is 0):
> - $e^x = \sum_{k=0}^\infty \frac{x^k}{k!}$ (converges for all $x$, Lagrange remainder $\to 0$).
> - $\sin x = \sum_{k=0}^\infty \frac{(-1)^k x^{2k+1}}{(2k+1)!}$.
> - $\cos x = \sum_{k=0}^\infty \frac{(-1)^k x^{2k}}{(2k)!}$.
> - $\ln(1+x) = \sum_{k=1}^\infty \frac{(-1)^{k+1} x^k}{k}$ (converges for $|x| < 1$ and at $x=1$).
> - $(1+x)^\alpha = \sum_{k=0}^\infty \binom{\alpha}{k} x^k$ (converges for $|x| < 1$; binomial).

---

## 23.6 Alternative Forms of the Remainder

> **Cauchy form.** $R_n(x) = \frac{f^{(n+1)}(\xi)}{n!} (x - \xi)^n (x - a)$ for some $\xi$ between $a$ and $x$.
>
> Derived from the same $g$ but using Cauchy MVT instead of Rolle.

> **Integral form (if $f^{(n+1)}$ is continuous).**
> $R_n(x) = \int_a^x \frac{f^{(n+1)}(t)}{n!} (x - t)^n \, dt.$
>
> Proved by repeated integration by parts. This is a stronger, more usable form when quantitative remainder control is needed.

---

## 23.7 Young's Form (Peano Remainder)

For applications where only local behaviour is of interest:

> **Theorem 23.9 (Taylor with Peano / little-$o$ remainder).**
> If $f$ is $n$ times differentiable at $a$, then
> $f(x) = T_n(x) + o((x - a)^n) \quad\text{as } x \to a.$
>
> That is, $\frac{f(x) - T_n(x)}{(x - a)^n} \to 0$ as $x \to a$.

This weaker form requires only pointwise $n$-th differentiability (not the stronger $C^n$ smoothness needed for Lagrange). Useful for deriving limits, e.g., in L'Hôpital's contexts.

---

## 23.8 Worked Examples

**Example 1.** Use the MVT to prove: for $0 < a < b$, $\dfrac{b - a}{b} < \ln(b/a) < \dfrac{b - a}{a}$.

*Solution:* Apply MVT to $f(x) = \ln x$ on $[a, b]$:
$$\ln b - \ln a = \frac{1}{\xi}(b - a) \quad \text{for some } \xi \in (a, b).$$

Since $a < \xi < b$, $\dfrac{1}{b} < \dfrac{1}{\xi} < \dfrac{1}{a}$. Multiplying by $(b - a) > 0$:
$$\frac{b - a}{b} < \ln(b/a) < \frac{b - a}{a}. \ \blacksquare$$

---

**Example 2.** Prove: $|\sin x - \sin y| \leq |x - y|$ for all $x, y \in \mathbb{R}$.

*Solution:* $f(x) = \sin x$, $f'(x) = \cos x$, $|f'(x)| \leq 1$. By Theorem 23.6 (Lipschitz from bounded derivative), $|\sin x - \sin y| \leq 1 \cdot |x - y|$. $\blacksquare$

---

**Example 3.** Use Taylor's theorem to estimate $\sqrt{1.1}$ and bound the error.

*Solution:* Let $f(x) = \sqrt{1 + x}$. Derivatives at $0$:
- $f(0) = 1$.
- $f'(x) = \frac{1}{2}(1+x)^{-1/2}$, $f'(0) = 1/2$.
- $f''(x) = -\frac{1}{4}(1+x)^{-3/2}$, $f''(0) = -1/4$.
- $f'''(x) = \frac{3}{8}(1+x)^{-5/2}$.

Taylor with $n = 2$, centre $a = 0$, $x = 0.1$:
$$f(0.1) = 1 + \frac{1}{2}(0.1) + \frac{-1/4}{2}(0.1)^2 + R_2,$$
$$= 1 + 0.05 - 0.00125 + R_2 = 1.04875 + R_2.$$

Lagrange remainder with $n = 2$:
$$R_2 = \frac{f'''(\xi)}{3!}(0.1)^3 = \frac{3/8 (1+\xi)^{-5/2}}{6} \cdot 0.001 = \frac{0.001 \cdot 3}{48 (1+\xi)^{5/2}}$$
with $\xi \in (0, 0.1)$. Worst case $\xi = 0$: $R_2 \leq \dfrac{0.003}{48} = 6.25 \times 10^{-5}$.

So $\sqrt{1.1} \approx 1.04875$ with error $< 0.0001$. True value: $\sqrt{1.1} \approx 1.04881$. Error $\approx 6 \times 10^{-5}$. ✓

---

**Example 4.** Prove: if $f : \mathbb{R} \to \mathbb{R}$ is differentiable with $f'$ bounded, then $f$ is uniformly continuous on $\mathbb{R}$.

*Solution:* Say $|f'(x)| \leq L$. By MVT (Theorem 23.6):
$$|f(x) - f(y)| \leq L|x - y|.$$

Given $\varepsilon > 0$, take $\delta = \varepsilon/L$. $\blacksquare$

> **Note.** This shows differentiable functions with bounded derivatives are Lipschitz, hence uniformly continuous — stronger than just continuous.

---

**Example 5.** Prove: $f(x) = x^2$ is strictly convex on $\mathbb{R}$, using Taylor's theorem.

*Solution:* Convexity means $f\left(\frac{a + b}{2}\right) \leq \frac{f(a) + f(b)}{2}$ (and strict convexity uses strict inequality for $a \neq b$).

For $f(x) = x^2$, $f''(x) = 2 > 0$. Using Taylor at $c = (a+b)/2$:
$$f(a) = f(c) + f'(c)(a - c) + \frac{f''(\xi_1)}{2}(a - c)^2,$$
$$f(b) = f(c) + f'(c)(b - c) + \frac{f''(\xi_2)}{2}(b - c)^2.$$

Note $(a - c) + (b - c) = 0$, so adding:
$$f(a) + f(b) = 2f(c) + \frac{f''(\xi_1)}{2}(a-c)^2 + \frac{f''(\xi_2)}{2}(b-c)^2 = 2f(c) + (a-c)^2 + (b-c)^2.$$
(using $f'' = 2$).

Since $(a-c)^2 + (b-c)^2 > 0$ for $a \neq b$:
$$f(a) + f(b) > 2 f(c) \quad \Longleftrightarrow \quad f\left(\frac{a+b}{2}\right) < \frac{f(a) + f(b)}{2}. \ \blacksquare$$

---

## 23.9 Practice Problems

1. Use MVT to prove: $\dfrac{x}{1+x} < \ln(1 + x) < x$ for $x > 0$.

2. Let $f : [0, \infty) \to \mathbb{R}$ be differentiable with $\lim_{x \to \infty} f'(x) = L$. Prove $\lim_{x \to \infty} f(x)/x = L$.

3. Prove: if $f'(x) \geq 0$ for all $x \in (a, b)$ and $f'$ is not identically zero on any subinterval, then $f$ is strictly increasing.

4. Use Taylor's theorem to show $|\cos x - (1 - x^2/2)| \leq |x|^3/6$ for all $x$.

5. Let $f : [0, 1] \to \mathbb{R}$ be $C^2$ with $f(0) = f(1) = 0$ and $|f''(x)| \leq M$. Show $|f(x)| \leq M/8$ for all $x \in [0, 1]$.

### Solutions

**1.** $f(t) = \ln(1 + t)$. By MVT on $[0, x]$: $\ln(1+x) = \frac{x}{1 + \xi}$ for some $\xi \in (0, x)$.

Since $0 < \xi < x$: $1 < 1 + \xi < 1 + x$, so $\dfrac{x}{1+x} < \dfrac{x}{1+\xi} < x$. Thus $\dfrac{x}{1+x} < \ln(1+x) < x$. $\blacksquare$

---

**2.** Given $\varepsilon > 0$, find $N$ with $|f'(x) - L| < \varepsilon$ for $x > N$.

For large $x$: by MVT on $[N, x]$, $f(x) - f(N) = f'(\xi)(x - N)$ for some $\xi \in (N, x)$. So
$$\frac{f(x)}{x} = \frac{f(N)}{x} + \frac{f'(\xi)(x - N)}{x} = \frac{f(N)}{x} + f'(\xi)\left(1 - \frac{N}{x}\right).$$

As $x \to \infty$: $f(N)/x \to 0$, $(1 - N/x) \to 1$, and $|f'(\xi) - L| < \varepsilon$ (since $\xi > N$). So $\limsup |f(x)/x - L| \leq \varepsilon$. Since $\varepsilon$ arbitrary, $f(x)/x \to L$. $\blacksquare$

---

**3.** Suppose for contradiction $a \leq x_1 < x_2 \leq b$ with $f(x_1) = f(x_2)$. $f$ is increasing (since $f' \geq 0$), so $f \equiv f(x_1)$ on $[x_1, x_2]$. Then $f' \equiv 0$ on $(x_1, x_2)$, contradicting the assumption. So $f(x_1) < f(x_2)$; strict increase. $\blacksquare$

---

**4.** $f(x) = \cos x$, $f'(x) = -\sin x$, $f''(x) = -\cos x$, $f'''(x) = \sin x$. Taylor at $0$ with $n = 2$:
$$\cos x = 1 - \frac{x^2}{2} + R_2, \qquad R_2 = \frac{f'''(\xi)}{6} x^3 = \frac{\sin \xi}{6} x^3.$$

$|R_2| \leq |x|^3/6$. $\blacksquare$

---

**5.** Taylor at $c$ with $n = 1$:
$$f(0) = f(c) + f'(c)(0 - c) + \frac{f''(\xi_1)}{2} c^2,$$
$$f(1) = f(c) + f'(c)(1 - c) + \frac{f''(\xi_2)}{2} (1 - c)^2.$$

Using $f(0) = f(1) = 0$: add $(1-c) \cdot$(first) $+ c \cdot$(second):
$$0 = f(c) + \frac{(1-c) f''(\xi_1)}{2} c^2 + \frac{c f''(\xi_2)}{2}(1-c)^2.$$

So
$$f(c) = -\frac{(1-c) c^2 f''(\xi_1) + c (1-c)^2 f''(\xi_2)}{2}.$$

Bounding by $|f''| \leq M$:
$$|f(c)| \leq \frac{M}{2}\left[(1-c)c^2 + c(1-c)^2\right] = \frac{M}{2} c(1-c).$$

$c(1-c) \leq 1/4$ (maximum at $c = 1/2$). So $|f(c)| \leq M/8$. $\blacksquare$

---

## 23.10 Summary

> **Mean Value Theorem hierarchy:**
>
> | Theorem | Statement | Conclusion |
> |---------|----------|-----------|
> | **Rolle** | $f(a) = f(b)$ | $\exists \xi : f'(\xi) = 0$ |
> | **Lagrange** | Any $f$ continuous + differentiable | $\exists \xi : f'(\xi) = (f(b)-f(a))/(b-a)$ |
> | **Cauchy** | Two functions $f, g$ | $\exists \xi : (f(b)-f(a)) g'(\xi) = (g(b)-g(a)) f'(\xi)$ |
> | **Taylor** | $f$ is $C^n$ and $(n+1)$-differentiable | Remainder $R_n(x) = f^{(n+1)}(\xi) (x-a)^{n+1}/(n+1)!$ |

> **Corollaries — the "practical" MVT toolkit:**
>
> - $f' \equiv 0 \Rightarrow f$ constant.
> - $f' > 0$ (or $\geq 0$) $\Rightarrow f$ (strictly) increasing.
> - $|f'| \leq L \Rightarrow f$ is $L$-Lipschitz.
> - Converse of $f'(a) = 0$ does NOT give extremum (need 2nd-derivative or sign-change test).

> **Taylor's theorem.** Polynomial approximation with explicit error:
> $f(x) = f(a) + f'(a)(x-a) + \cdots + \frac{f^{(n)}(a)}{n!}(x-a)^n + R_n(x).$
> Three standard forms of $R_n$: Lagrange, Cauchy, Integral. Each has its use.

> **Conceptual picture.** MVT converts **differential** information ($f'$) into **integral / global** information (values of $f$ over intervals). It's the bridge between pointwise slope and overall change — the mechanism behind the fundamental theorem of calculus.

---

## Related Topics

- [[22-differentiation]] — derivative definition, algebraic rules, Darboux
- [[24-lhopital-vector-derivatives]] — L'Hôpital using Cauchy MVT
- [[20-ivt-and-connectedness]] — EVT used in Rolle's proof
- [[25-riemann-stieltjes-integral]] — MVT for integrals, FTC
- [[12-infinite-series-introduction]] — Taylor series as $n \to \infty$
- [[14-alternating-and-absolute-convergence]] — convergence of Taylor series via remainder estimates
