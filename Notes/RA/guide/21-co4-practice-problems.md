# 21. CO4 Practice Problems — Differentiation, MVT, Taylor, L'Hôpital

These problems cover CO4 (Lessons 29-33):
- Derivatives: definition, algebraic/chain rules, Darboux
- Mean Value Theorems: Rolle, Lagrange, Cauchy
- Taylor's theorem with remainder
- L'Hôpital's rule
- Vector-valued derivatives

---

## Part A: Derivatives from Definition

### Problem A1
Use the definition to show $(x^n)' = n x^{n-1}$ for $n \in \mathbb{N}$.

**Solution.** By the binomial theorem:
$$\frac{(x+h)^n - x^n}{h} = \frac{\sum_{k=1}^n \binom{n}{k} x^{n-k} h^k}{h} = \sum_{k=1}^n \binom{n}{k} x^{n-k} h^{k-1}.$$

As $h \to 0$, only the $k = 1$ term survives: $\binom{n}{1} x^{n-1} = n x^{n-1}$. $\blacksquare$

([[22-differentiation]])

---

### Problem A2
Show that $f(x) = x |x|$ is differentiable at $0$ and compute $f'(0)$.

**Solution.** $f(x) = x^2$ for $x \geq 0$, $f(x) = -x^2$ for $x < 0$.
$$\frac{f(h) - f(0)}{h} = \frac{h|h|}{h} = |h| \to 0 \text{ as } h \to 0.$$

So $f'(0) = 0$. Note $f$ is $C^1$ (derivative $f'(x) = 2|x|$) but not $C^2$. $\blacksquare$

([[22-differentiation]])

---

### Problem A3
Is $f(x) = |x|$ differentiable at $0$? Justify.

**Solution.** $f'_+(0) = \lim_{h \to 0^+} |h|/h = 1$. $f'_-(0) = \lim_{h \to 0^-} |h|/h = -1$. Different one-sided derivatives, so not differentiable at $0$. $\blacksquare$

([[22-differentiation]])

---

### Problem A4
Let $f(x) = \begin{cases} x^2 \sin(1/x) & x \neq 0 \\ 0 & x = 0 \end{cases}$. Is $f$ differentiable at $0$?

**Solution.** $\frac{f(h) - f(0)}{h} = h \sin(1/h)$. $|h \sin(1/h)| \leq |h| \to 0$ by sandwich. So $f'(0) = 0$ exists. $\blacksquare$

([[22-differentiation]])

---

## Part B: Algebraic Rules and Chain Rule

### Problem B1
Compute $\dfrac{d}{dx} \left[\sin(e^{x^2})\right]$.

**Solution.** Chain rule multiple times:
$$\cos(e^{x^2}) \cdot e^{x^2} \cdot 2x = 2x \, e^{x^2} \cos(e^{x^2}). \ \blacksquare$$

([[22-differentiation]])

---

### Problem B2
Let $f(x) = \ln(1 + x^2)$. Find $f'(x)$ and evaluate at $x = 1$.

**Solution.** $f'(x) = \frac{2x}{1 + x^2}$. $f'(1) = 2/2 = 1$. $\blacksquare$

([[22-differentiation]])

---

### Problem B3
Compute $\dfrac{d}{dx} x^x$ for $x > 0$.

**Solution.** $x^x = e^{x \ln x}$, so
$$\frac{d}{dx} x^x = e^{x \ln x} \cdot (\ln x + 1) = x^x (\ln x + 1). \ \blacksquare$$

([[22-differentiation]])

---

### Problem B4
Let $y = \arctan(\tan x)$. Find $dy/dx$ (treating $y$ as a proper function on $(-\pi/2, \pi/2)$).

**Solution.** On this interval, $\arctan(\tan x) = x$, so $y' = 1$. Verification by chain: $y' = \frac{1}{1 + \tan^2 x} \cdot \sec^2 x = 1$. $\blacksquare$

([[22-differentiation]])

---

## Part C: MVT and Applications

### Problem C1
Use MVT to prove: $\sin x < x$ for $x > 0$.

**Solution.** Let $g(x) = x - \sin x$. $g(0) = 0$, $g'(x) = 1 - \cos x \geq 0$ (with equality only at $2\pi k$). So $g$ is increasing; $g(x) > 0$ for $x > 0$. $\blacksquare$

([[23-mean-value-theorems]])

---

### Problem C2
Show $|e^x - 1 - x| \leq \dfrac{x^2}{2} e^{|x|}$ for all $x \in \mathbb{R}$.

**Solution.** Let $g(x) = e^x - 1 - x$. $g(0) = 0$, $g'(x) = e^x - 1$, $g''(x) = e^x$. By Taylor at $0$ with $n = 1$:
$$g(x) = g(0) + g'(0) x + \frac{g''(\xi)}{2} x^2 = 0 + 0 + \frac{e^\xi}{2} x^2.$$
$\xi$ between $0$ and $x$, so $e^\xi \leq e^{|x|}$. Hence $|g(x)| \leq \frac{e^{|x|}}{2} x^2$. $\blacksquare$

([[23-mean-value-theorems]])

---

### Problem C3
Let $f$ differentiable on $\mathbb{R}$ with $f(0) = 0$ and $|f'(x)| \leq 1$ for all $x$. Show $|f(x)| \leq |x|$ for all $x$.

**Solution.** By MVT on $[0, x]$ (or $[x, 0]$): $f(x) - f(0) = f'(\xi) x$, so $|f(x)| = |f'(\xi)||x| \leq |x|$. $\blacksquare$

([[23-mean-value-theorems]])

---

### Problem C4
Use Rolle's theorem to show: a polynomial of degree $n$ has at most $n$ real roots.

**Solution.** Induction on $n$. $n = 0$: nonzero constant has 0 roots. $n \geq 1$: if $p$ has $\geq n + 1$ distinct roots $r_1 < \cdots < r_{n+1}$, by Rolle applied between consecutive roots, $p'$ has $\geq n$ roots $s_i \in (r_i, r_{i+1})$. But $\deg p' = n - 1$; induction says at most $n - 1$ roots, contradiction. $\blacksquare$

([[23-mean-value-theorems]])

---

## Part D: Taylor's Theorem

### Problem D1
Write the Maclaurin expansion of $\ln(1 + x)$ up to degree 4, with Lagrange remainder.

**Solution.** Derivatives at 0: $f^{(k)}(0) = (-1)^{k-1}(k-1)!$ for $k \geq 1$.
$$\ln(1 + x) = x - \frac{x^2}{2} + \frac{x^3}{3} - \frac{x^4}{4} + R_4, \qquad R_4 = \frac{x^5}{5 (1 + \xi)^5}$$
for some $\xi$ between 0 and $x$. $\blacksquare$

([[23-mean-value-theorems]])

---

### Problem D2
Estimate $\sqrt{2}$ using Taylor expansion of $(1+x)^{1/2}$ at $x = 0$, $x = 1$.

**Solution.** Take $f(x) = (1 + x)^{1/2}$, centre $a = 0$, evaluated at $x = 1$:
$$f(x) = 1 + \frac{x}{2} - \frac{x^2}{8} + \frac{x^3}{16} - \frac{5 x^4}{128} + \cdots$$

At $x = 1$: $\sqrt{2} \approx 1 + 1/2 - 1/8 + 1/16 - 5/128 = 1.398$. True $\sqrt{2} \approx 1.414$. The radius of convergence of the binomial series at $x = 1$ is borderline; convergence is slow. $\blacksquare$

---

### Problem D3
Use Taylor's theorem to prove $\cos x \geq 1 - x^2/2$ for all $x \in \mathbb{R}$.

**Solution.** Taylor at $0$: $\cos x = 1 - x^2/2 + R_2$, with
$$R_2 = \frac{\cos^{(3)}(\xi)}{6} x^3 = \frac{\sin \xi}{6} x^3.$$

This doesn't immediately give the sign. Use $n = 3$ instead:
$$\cos x = 1 - \frac{x^2}{2} + \frac{\cos^{(4)}(\xi)}{24} x^4 = 1 - \frac{x^2}{2} + \frac{\cos \xi}{24} x^4.$$

$\cos \xi \geq -1$, so $R \geq -x^4/24$. Then $\cos x \geq 1 - x^2/2 - x^4/24$... this is actually weaker.

**Better approach.** Direct: let $g(x) = \cos x - (1 - x^2/2)$. $g(0) = 0$, $g'(x) = -\sin x + x$, $g'(0) = 0$, $g''(x) = -\cos x + 1 \geq 0$. So $g'$ is increasing, $g'(0) = 0$, so $g' \geq 0$ on $[0, \infty)$ (by MVT), hence $g$ increasing on $[0, \infty)$, hence $g \geq 0$. Symmetric on $(-\infty, 0]$. $\blacksquare$

([[23-mean-value-theorems]])

---

### Problem D4
Let $f$ be $C^2$ on $[a, b]$ with $f(a) = f(b) = 0$. Show there exists $\xi$ with $f''(\xi) = \dfrac{8}{(b-a)^2} \max_{[a,b]} |f|$.

**Solution sketch.** WLOG max at $c \in (a, b)$ with $f(c) = M > 0$. By Taylor at $c$: $f(a) = f(c) + f'(c)(a - c) + f''(\xi_1)/2 (a - c)^2$, $f(b) = f(c) + f'(c)(b - c) + f''(\xi_2)/2 (b - c)^2$. Since $f(a) = f(b) = 0$ and $f'(c) = 0$ (interior max):
$$M = \frac{f''(\xi_1)}{2}(c - a)^2 \cdot (-1), \qquad M = \frac{f''(\xi_2)}{2}(b - c)^2 \cdot (-1).$$

(i.e., $f''(\xi_i) = -2M/(c-a)^2$, etc.) Thus $|f''(\xi_1)| = 2M/(c - a)^2$. Minimising over position of $c$: worst case $c = (a+b)/2$, giving $|f''| \geq 8M/(b-a)^2$. $\blacksquare$

---

## Part E: L'Hôpital's Rule

### Problem E1
Compute $\lim_{x \to 0} \dfrac{\ln(1+x)}{x}$.

**Solution.** $0/0$. L'Hôpital: $\dfrac{1/(1+x)}{1} \to 1$. $\blacksquare$

([[24-lhopital-vector-derivatives]])

---

### Problem E2
Compute $\lim_{x \to \infty} x \cdot e^{-x}$.

**Solution.** $\infty \cdot 0$. Rewrite as $\dfrac{x}{e^x}$ ($\infty/\infty$). L'Hôpital: $\dfrac{1}{e^x} \to 0$. $\blacksquare$

([[24-lhopital-vector-derivatives]])

---

### Problem E3
Compute $\lim_{x \to 0} \dfrac{x - \sin x}{x^3}$.

**Solution.** $0/0$. Thrice L'Hôpital:
$$\lim \frac{1 - \cos x}{3 x^2} = \lim \frac{\sin x}{6 x} = \lim \frac{\cos x}{6} = \frac{1}{6}. \ \blacksquare$$

Or use Taylor: $\sin x = x - x^3/6 + O(x^5)$, so $x - \sin x = x^3/6 + O(x^5)$, ratio $\to 1/6$. ([[24-lhopital-vector-derivatives]])

---

### Problem E4
Compute $\lim_{x \to 0^+} x^{\sin x}$.

**Solution.** $0^0$ form. Take log:
$$\sin x \cdot \ln x = \frac{\ln x}{1/\sin x}.$$

As $x \to 0^+$: $\ln x \to -\infty$, $1/\sin x \to \infty$. L'Hôpital:
$$\frac{1/x}{-\cos x/\sin^2 x} = \frac{\sin^2 x}{-x \cos x} = \frac{\sin x}{\cos x} \cdot \frac{\sin x}{-x} \to 0 \cdot (-1) = 0.$$

So $x^{\sin x} \to e^0 = 1$. $\blacksquare$

([[24-lhopital-vector-derivatives]])

---

### Problem E5
Show that L'Hôpital fails for $\lim_{x \to \infty} \dfrac{x + \cos x}{x}$.

**Solution.** Direct: $(x + \cos x)/x = 1 + (\cos x)/x \to 1 + 0 = 1$.

L'Hôpital: $\dfrac{1 - \sin x}{1}$ has no limit (oscillates). So L'Hôpital is inconclusive; use the direct computation instead. $\blacksquare$

([[24-lhopital-vector-derivatives]])

---

## Part F: Vector-Valued Derivatives

### Problem F1
For $f(t) = (\cos t, \sin t, t^2)$, compute $f'(t)$ and $\|f'(t)\|$ at $t = \pi$.

**Solution.** $f'(t) = (-\sin t, \cos t, 2t)$. At $t = \pi$: $f'(\pi) = (0, -1, 2\pi)$. $\|f'(\pi)\| = \sqrt{0 + 1 + 4\pi^2} = \sqrt{1 + 4\pi^2}$. $\blacksquare$

([[24-lhopital-vector-derivatives]])

---

### Problem F2
Give an example of a differentiable $f : [0, 1] \to \mathbb{R}^2$ with $f(0) = f(1)$ but $f'(t) \neq 0$ for every $t$.

**Solution.** $f(t) = (\cos(2\pi t), \sin(2\pi t))$. $f(0) = f(1) = (1, 0)$. $f'(t) = (-2\pi \sin(2\pi t), 2\pi \cos(2\pi t))$, and $\|f'(t)\| = 2\pi \neq 0$ for all $t$.

This shows the classical MVT fails as an equality in the vector-valued case. $\blacksquare$

([[24-lhopital-vector-derivatives]])

---

### Problem F3
Let $f : [a, b] \to \mathbb{R}^n$ be differentiable with $f'(t) = 0$ for all $t$. Show $f$ is constant.

**Solution.** By the MVT inequality for vector-valued functions ($\|f(x) - f(y)\| \leq (x - y) \sup \|f'\| = 0$), $f(x) = f(y)$ for all $x, y$. So $f$ is constant. $\blacksquare$

([[24-lhopital-vector-derivatives]])

---

### Problem F4
For $f(t) = (\cos t, \sin t)$, verify that $f \perp f'$ by direct computation.

**Solution.** $f(t) \cdot f'(t) = \cos t \cdot (-\sin t) + \sin t \cdot \cos t = 0$. ✓ $\blacksquare$

This is a special case of the theorem: if $\|f\|$ is constant, $f \perp f'$. Here $\|f(t)\| = 1$ always.

([[24-lhopital-vector-derivatives]])

---

## Part G: Mixed / Challenging

### Problem G1
Prove: if $f, g$ differentiable with $f' = g'$ and $f(a) = g(a)$ for some $a$, then $f = g$ on the interval.

**Solution.** Let $h = f - g$. $h' = 0$ and $h(a) = 0$. By MVT, $h \equiv 0$. So $f = g$. $\blacksquare$

([[23-mean-value-theorems]])

---

### Problem G2
Using MVT, prove: $\sqrt[n]{1 + x} < 1 + x/n$ for $x > 0$, $n \geq 2$.

**Solution.** Let $f(y) = y^{1/n}$. $f$ strictly concave on $[0, \infty)$ (since $f''(y) = \frac{1}{n}(\frac{1}{n} - 1) y^{1/n - 2} < 0$).

By concavity (or Taylor with remainder): $f(1 + x) < f(1) + f'(1) x = 1 + x/n$. $\blacksquare$

---

### Problem G3
Suppose $f$ is $C^1$ on $[a, b]$ with $f'(x) > 0$. Show $f$ is strictly increasing and its inverse is $C^1$.

**Solution.** By Theorem 23.5, $f' > 0 \Rightarrow f$ strictly increasing. Inverse $g = f^{-1}$ exists on $[f(a), f(b)]$ and is continuous. Moreover, by the inverse function theorem (special 1D case): $g'(y) = 1/f'(g(y))$, continuous in $y$. So $g$ is $C^1$. $\blacksquare$

([[23-mean-value-theorems]])

---

### Problem G4
Let $f \in C^2$ with $f''(x) > 0$ for all $x$ (strictly convex). Show that $f$ has at most one critical point, and if it exists, it is a global minimum.

**Solution.** Suppose $f'(a) = f'(b) = 0$ with $a < b$. By Rolle applied to $f'$, some $c \in (a, b)$ with $f''(c) = 0$. Contradicts $f'' > 0$. So at most one critical point.

If $f'(x_0) = 0$: by Taylor at $x_0$, $f(x) = f(x_0) + (f''(\xi)/2)(x - x_0)^2$ for some $\xi$. Since $f'' > 0$: $f(x) \geq f(x_0)$. Global min. $\blacksquare$

---

### Problem G5
Prove that $e^x$ is strictly convex on $\mathbb{R}$: for any $\lambda \in (0, 1)$ and $x \neq y$,
$$e^{\lambda x + (1 - \lambda) y} < \lambda e^x + (1 - \lambda) e^y.$$

**Solution.** $f(x) = e^x$, $f''(x) = e^x > 0$, so strictly convex. The inequality is the definition of convexity (strict form). $\blacksquare$

---

## Summary

| Problem Topic | Key lesson | Core technique |
|---|---|---|
| A1-A4 | [[22-differentiation]] | Definition, algebraic manipulation |
| B1-B4 | [[22-differentiation]] | Chain rule, log differentiation |
| C1-C4 | [[23-mean-value-theorems]] | MVT, Rolle applications |
| D1-D4 | [[23-mean-value-theorems]] | Taylor expansion, remainder estimates |
| E1-E5 | [[24-lhopital-vector-derivatives]] | L'Hôpital, indeterminate forms |
| F1-F4 | [[24-lhopital-vector-derivatives]] | Vector-valued derivatives |
| G1-G5 | multiple | Convexity, monotonicity, inverse function |

---

## Related Topics

- [[22-differentiation]] through [[24-lhopital-vector-derivatives]] — CO4 content
- [[25-riemann-stieltjes-integral]] — next unit (CO5) uses differentiability for FTC
