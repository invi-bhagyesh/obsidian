# 24. L'Hôpital's Rule and Vector-Valued Derivatives

> **Central theme.** This lesson ties two apparently distinct strands of differential calculus under a single conceptual umbrella — that of **comparing infinitesimal rates**.
>
> 1. **L'Hôpital's rule** — a systematic instrument for resolving limits of the indeterminate forms $0/0$, $\infty/\infty$, and their derived cousins $0 \cdot \infty$, $\infty - \infty$, $0^0$, $\infty^0$, $1^\infty$, by reducing them to a comparison of derivatives. Its logical engine is the **Cauchy Mean Value Theorem**.
> 2. **Vector-valued derivatives** $f : [a,b] \to \mathbb{R}^n$ — the first step out of the one-dimensional world, preparing the technical machinery for curves, tangents, arc length, the directional derivative, the gradient, and the total (Fréchet) derivative of multivariable maps.
>
> Both topics rest on the Mean Value apparatus assembled in [[23-mean-value-theorems]]. The scalar MVT yields L'Hôpital; the *failure* of a vectorial MVT motivates the inequality form $\|f(b) - f(a)\| \le (b-a)\sup \|f'\|$, which is the workhorse for almost every subsequent estimate in real and functional analysis.

---

## 24.1 L'Hôpital's Rule ($0/0$ Form)

> **Theorem 24.1 (L'Hôpital, $0/0$ form).**
> Let $-\infty \le a < b \le +\infty$, and let $f, g : (a,b) \to \mathbb{R}$ be differentiable with $g'(x) \neq 0$ on $(a,b)$. Suppose
> $$\lim_{x \to a^+} f(x) = 0 = \lim_{x \to a^+} g(x),\qquad \lim_{x \to a^+} \frac{f'(x)}{g'(x)} = L \in \mathbb{R} \cup \{\pm\infty\}.$$
> Then $g(x) \neq 0$ for $x$ near $a^+$, and
> $$\lim_{x \to a^+} \frac{f(x)}{g(x)} = L.$$

**Proof (finite $L$).** We divide the argument into five numbered steps. Writing $a$ as a genuine real number; the case $a = -\infty$ is reduced by substitution $t = 1/(x - a_0)$, which we treat in Corollary 24.1.2.

**Step 1: Extending $f, g$ continuously to $a$.** Define $\tilde f, \tilde g : [a, b) \to \mathbb{R}$ by
$$\tilde f(x) = \begin{cases} f(x), & x \in (a, b), \\ 0, & x = a,\end{cases} \qquad \tilde g(x) = \begin{cases} g(x), & x \in (a, b), \\ 0, & x = a.\end{cases}$$
The hypotheses $\lim_{x \to a^+} f(x) = 0 = \lim_{x \to a^+} g(x)$ give exactly $\tilde f, \tilde g$ continuous at $a$ (and trivially elsewhere). Neither $\tilde f$ nor $\tilde g$ need be differentiable at $a$, but that is irrelevant: Cauchy's MVT is applied on $[a, x]$ where differentiability on $(a, x)$ is all that is required.

**Step 2: Non-vanishing of $g$ on a right-neighborhood of $a$.** We claim $g(x) \neq 0$ for all $x \in (a, b)$ sufficiently close to $a$. Indeed, Rolle's theorem applied to $\tilde g$ on $[a, x]$ would produce a zero of $g'$ inside $(a, x)$ if $\tilde g(a) = \tilde g(x) = 0$ with $x > a$. Since $g' \neq 0$ by hypothesis, the only zero of $\tilde g$ on $[a, b)$ is at $a$ itself. In particular $g(x) \neq 0$ for all $x \in (a, b)$.

**Step 3: Cauchy's MVT on $[a, x]$.** Fix $x \in (a, b)$. The pair $(\tilde f, \tilde g)$ is continuous on $[a, x]$ and differentiable on $(a, x)$, with $\tilde g' = g' \neq 0$ there. By **Cauchy's MVT** (Theorem 23.7) there exists $\xi_x \in (a, x)$ with
$$\frac{\tilde f(x) - \tilde f(a)}{\tilde g(x) - \tilde g(a)} = \frac{f'(\xi_x)}{g'(\xi_x)}.$$
Using $\tilde f(a) = \tilde g(a) = 0$ and $\tilde f(x) = f(x)$, $\tilde g(x) = g(x)$,
$$\frac{f(x)}{g(x)} = \frac{f'(\xi_x)}{g'(\xi_x)}. \tag{$\ast$}$$

**Step 4: Squeezing $\xi_x \to a^+$.** Since $\xi_x \in (a, x)$, $a < \xi_x < x$. As $x \to a^+$, $x \to a$, so by squeeze $\xi_x \to a^+$.

**Step 5: Passage to the limit.** By the hypothesis $\lim_{t \to a^+} f'(t)/g'(t) = L$, given $\varepsilon > 0$ choose $\delta > 0$ with $|f'(t)/g'(t) - L| < \varepsilon$ for all $t \in (a, a + \delta)$. For $x \in (a, a + \delta)$, $\xi_x \in (a, a + \delta)$ too, so by $(\ast)$
$$\left|\frac{f(x)}{g(x)} - L\right| = \left|\frac{f'(\xi_x)}{g'(\xi_x)} - L\right| < \varepsilon.$$
This is exactly $\lim_{x \to a^+} f(x)/g(x) = L$. $\blacksquare$

**The case $L = +\infty$.** Replace $\varepsilon$-control by the equivalent statement "for every $M > 0$ there is $\delta > 0$ with $f'(t)/g'(t) > M$ on $(a, a+\delta)$". The argument is identical, substituting "$> M$" for "$\in (L-\varepsilon, L+\varepsilon)$". Same for $L = -\infty$.

> **Remark 24.1.1 (Why the hypothesis $g' \neq 0$).** Not only does it ensure Cauchy's MVT is applicable — which requires $g(x) \neq g(a)$ — but it underwrites Step 2, i.e., that $g$ itself is nonzero on a deleted neighborhood of $a$. Without $g' \neq 0$ there is no guarantee $f(x)/g(x)$ is even defined near $a^+$.

> **Corollary 24.1.2 (L'Hôpital at $\infty$).** Suppose $f, g$ are differentiable on $(M, \infty)$ for some $M$, with $g' \neq 0$, and $\lim_{x \to \infty} f(x) = \lim_{x \to \infty} g(x) = 0$, and $\lim_{x \to \infty} f'(x)/g'(x) = L$. Then $\lim_{x \to \infty} f(x)/g(x) = L$.

*Proof.* Substitute $x = 1/t$ for $t \in (0, 1/M)$. Let $F(t) = f(1/t)$, $G(t) = g(1/t)$. Chain rule: $F'(t) = -f'(1/t)/t^2$ and $G'(t) = -g'(1/t)/t^2$, so $F'(t)/G'(t) = f'(1/t)/g'(1/t)$. As $t \to 0^+$, $1/t \to \infty$, so $F'/G' \to L$, $F, G \to 0$. Apply Theorem 24.1 to $F, G$ at $t = 0^+$: $F(t)/G(t) = f(1/t)/g(1/t) \to L$, equivalently $f(x)/g(x) \to L$ as $x \to \infty$. $\blacksquare$

> **Analogous versions.**
> - **Two-sided limit $x \to a$**: combine the left- and right-sided statements; $\lim f(x)/g(x) = L$ iff both one-sided limits equal $L$.
> - **Interior point**: if $f, g$ are differentiable on a punctured neighborhood of an interior $a$ with $f, g \to 0$ at $a$, apply the theorem from both sides.
> - **$x \to -\infty$**: analogous to Corollary 24.1.2 via $x = -1/t$.

---

## 24.2 L'Hôpital's Rule ($\infty/\infty$ Form)

> **Theorem 24.2 (L'Hôpital, $\infty/\infty$ form).**
> Let $f, g : (a, b) \to \mathbb{R}$ be differentiable with $g'(x) \neq 0$ on $(a, b)$. Suppose
> $$\lim_{x \to a^+} |g(x)| = \infty,\qquad \lim_{x \to a^+} \frac{f'(x)}{g'(x)} = L \in \mathbb{R}.$$
> Then $\lim_{x \to a^+} f(x)/g(x) = L$. (Same for $L = \pm\infty$, under minor adjustment.)

> **Note (surprising hypothesis).** Nothing is assumed about $f$ itself. In particular $f$ can remain bounded, or even converge to a finite value; the only hypothesis is $|g| \to \infty$. The intuition is that $g$ grows so fast that anything $f$ does is invisible at infinity.

**Proof (finite $L$, one-sided at $a^+$).** We carry out the full $\varepsilon$-$\delta$ argument in six steps.

**Step 1: Fixing the accuracy.** Fix $\varepsilon > 0$. By hypothesis on $f'/g'$, choose $c \in (a, b)$ so that
$$\left|\frac{f'(t)}{g'(t)} - L\right| < \varepsilon \qquad \text{for all } t \in (a, c). \tag{1}$$

**Step 2: Applying Cauchy's MVT on $[x, c]$.** Fix $x \in (a, c)$. Since $f, g$ are differentiable (hence continuous) on $(a, b)$ and $g' \neq 0$ on $[x, c] \subset (a, b)$, Cauchy's MVT gives $\xi = \xi(x) \in (x, c)$ with
$$\frac{f(c) - f(x)}{g(c) - g(x)} = \frac{f'(\xi)}{g'(\xi)}.$$
Since $\xi \in (x, c) \subset (a, c)$, combining with (1),
$$\left|\frac{f(c) - f(x)}{g(c) - g(x)} - L\right| < \varepsilon. \tag{2}$$

**Step 3: Algebraic rearrangement.** We want to compare $f(x)/g(x)$ with $L$. Write
$$\frac{f(x)}{g(x)} = \frac{f(c) - f(x)}{g(c) - g(x)} \cdot \underbrace{\frac{g(c) - g(x)}{g(x)}}_{=: A(x)} + \underbrace{\frac{f(x) - f(c) + f(c)}{g(x)}}_{\text{trivial}} + \text{correction}.$$
Rather than this messy path, we use the cleaner identity
$$\frac{f(x)}{g(x)} - L = \underbrace{\left(\frac{f(c) - f(x)}{g(c) - g(x)} - L\right)}_{\text{small by (2)}} \cdot \underbrace{\frac{g(c) - g(x)}{g(x)}}_{\to -1 \text{ as } x \to a^+} + \underbrace{\frac{f(x) - \frac{g(x)}{g(c)-g(x)}\bigl(f(c) - L(g(c)-g(x))\bigr)}{g(x)}}_{\text{corrective}}.$$
A more transparent way is: rearrange (2) as
$$\frac{f(c) - f(x)}{g(c) - g(x)} = L + r(x), \qquad |r(x)| < \varepsilon. \tag{3}$$
Solve for $f(x)$:
$$f(x) = f(c) - (L + r(x))(g(c) - g(x)) = f(c) - (L + r(x))g(c) + (L + r(x))g(x).$$
Divide by $g(x)$ (valid since $|g| \to \infty$, so $g \neq 0$ for $x$ near $a^+$):
$$\frac{f(x)}{g(x)} = \frac{f(c) - (L + r(x)) g(c)}{g(x)} + L + r(x). \tag{4}$$

**Step 4: The first term vanishes as $x \to a^+$.** Both $f(c)$ and $g(c)$ are fixed real numbers; $L$ is fixed; $|r(x)| < \varepsilon$ is bounded. Since $|g(x)| \to \infty$, the numerator in the first fraction is bounded (by $|f(c)| + (|L| + \varepsilon)|g(c)|$) while $|g(x)| \to \infty$, so
$$\frac{f(c) - (L + r(x))g(c)}{g(x)} \to 0 \quad \text{as } x \to a^+. \tag{5}$$
Concretely, choose $\delta_1 \in (0, c - a)$ so that $x \in (a, a + \delta_1)$ implies
$$\left|\frac{f(c) - (L + r(x))g(c)}{g(x)}\right| < \varepsilon. \tag{6}$$
This is possible because $|g(x)| \to \infty$ and the numerator is bounded by a fixed constant.

**Step 5: Assembling the estimate.** For $x \in (a, a + \delta_1)$, combine (4), (6), and $|r(x)| < \varepsilon$:
$$\left|\frac{f(x)}{g(x)} - L\right| = \left|\frac{f(c) - (L + r(x))g(c)}{g(x)} + r(x)\right| \le \varepsilon + \varepsilon = 2\varepsilon.$$

**Step 6: Conclusion.** Since $\varepsilon > 0$ was arbitrary, for every $\eta > 0$ (take $\varepsilon = \eta/2$) there is $\delta > 0$ with $|f(x)/g(x) - L| < \eta$ for $x \in (a, a+\delta)$. Hence $\lim_{x \to a^+} f(x)/g(x) = L$. $\blacksquare$

> **Remark 24.2.1 (Role of $|g| \to \infty$).** The essential analytic leverage comes in Step 4, where $|g(x)| \to \infty$ dominates the fixed quantities $f(c), g(c)$. Absent this, the first term in (4) could not be shown to vanish. This is precisely why no hypothesis on $f$ is needed — $g$ dominating at $a^+$ is enough.

> **Corollary 24.2.2.** If $f, g$ are differentiable on $(M, \infty)$, $g' \neq 0$, $|g(x)| \to \infty$ as $x \to \infty$, and $f'/g' \to L$, then $f/g \to L$ as $x \to \infty$. (Proof: substitute $x = 1/t$ as before.)

---

## 24.3 Other Indeterminate Forms

L'Hôpital handles $0/0$ and $\infty/\infty$ directly. Other forms must first be algebraically converted. Here is the complete catalogue:

| Form | Converted by... | Resulting form |
|------|-----------------|----------------|
| $0 \cdot \infty$ | $f \cdot g = \dfrac{f}{1/g}$ or $\dfrac{g}{1/f}$ | $0/0$ or $\infty/\infty$ |
| $\infty - \infty$ | Combine via common denominator or factor | $0/0$ or $\infty/\infty$ |
| $0^0,\ \infty^0,\ 1^\infty$ | Take logarithm: $\ln(f^g) = g \ln f$ | $0 \cdot \infty$, then $0/0$ or $\infty/\infty$ |

We illustrate each conversion meticulously.

### Example 24.3.1 ($0 \cdot \infty$): $\lim_{x \to 0^+} x \ln x$

**Setup.** As $x \to 0^+$, $x \to 0$ and $\ln x \to -\infty$. Product is $0 \cdot (-\infty)$, indeterminate.

**Strategy.** Convert to $\infty/\infty$ by placing the "$\infty$" factor in the numerator: write $x \ln x = \dfrac{\ln x}{1/x}$. As $x \to 0^+$: $\ln x \to -\infty$ and $1/x \to +\infty$, giving $-\infty/+\infty$.

**Computation.** Both functions are differentiable on $(0, \infty)$ with $(1/x)' = -1/x^2 \neq 0$. Apply Theorem 24.2:
$$\lim_{x \to 0^+} \frac{\ln x}{1/x} = \lim_{x \to 0^+} \frac{d/dx[\ln x]}{d/dx[1/x]} = \lim_{x \to 0^+} \frac{1/x}{-1/x^2} = \lim_{x \to 0^+} (-x) = 0.$$

**Verification.** Directly: for $x = e^{-n}$, $x \ln x = -n e^{-n} \to 0$ as $n \to \infty$. Consistent.

**Interpretation.** Polynomial decay to $0$ defeats logarithmic blow-up. This matches the general principle "polynomials dominate logs".

### Example 24.3.2 ($\infty - \infty$): $\lim_{x \to 0}\left(\frac{1}{\sin x} - \frac{1}{x}\right)$

**Setup.** Both $1/\sin x$ and $1/x$ diverge (to the same sign near $0$), so we have $\infty - \infty$.

**Strategy.** Combine into a single fraction:
$$\frac{1}{\sin x} - \frac{1}{x} = \frac{x - \sin x}{x \sin x}.$$
As $x \to 0$: numerator $x - \sin x \to 0$ (since $\sin x \to x$); denominator $x \sin x \to 0$. This is $0/0$ — L'Hôpital applies.

**Computation.** Differentiate numerator and denominator:
$$\lim_{x \to 0} \frac{1 - \cos x}{\sin x + x \cos x}.$$
Still $0/0$ at $x = 0$. Apply L'Hôpital again:
$$\lim_{x \to 0} \frac{\sin x}{\cos x + \cos x - x\sin x} = \lim_{x \to 0} \frac{\sin x}{2\cos x - x \sin x} = \frac{0}{2 - 0} = 0.$$

**Verification (Taylor).** $\sin x = x - x^3/6 + O(x^5)$, so $x - \sin x = x^3/6 + O(x^5)$ and $x \sin x = x^2 + O(x^4)$. Thus $(x - \sin x)/(x\sin x) = (x^3/6)/x^2 + O(x) = x/6 + O(x) \to 0$. Agreed.

### Example 24.3.3 ($1^\infty$): $\lim_{x \to 0} (1 + x)^{1/x}$

**Setup.** Base $1 + x \to 1$; exponent $1/x \to \pm\infty$. Form $1^\infty$, indeterminate.

**Strategy.** Take logarithms. Set $y = (1 + x)^{1/x}$, so $\ln y = \dfrac{\ln(1 + x)}{x}$. As $x \to 0$: $\ln(1 + x) \to 0$, $x \to 0$; form $0/0$.

**Computation.** L'Hôpital:
$$\lim_{x \to 0} \frac{\ln(1 + x)}{x} = \lim_{x \to 0} \frac{1/(1 + x)}{1} = 1.$$
Hence $\ln y \to 1$, so $y \to e^1 = e$.

**Verification.** This is one characterization of Euler's constant. Famously, $\lim_{n \to \infty} (1 + 1/n)^n = e$, which is the discrete version.

**Interpretation.** $1^\infty$ is not $1$ — both factors contribute; "how fast base approaches $1$" is balanced against "how fast exponent blows up".

---

## 24.4 When L'Hôpital Fails

> **Warning 24.4.1.** L'Hôpital asserts: *if* $\lim f'/g'$ exists (possibly $\pm\infty$), *then* $\lim f/g$ exists and equals it. The **converse** is false. The existence of $\lim f/g$ does **not** imply $\lim f'/g'$ exists. If $f'/g'$ has no limit, L'Hôpital yields no information about $f/g$.

**Example 24.4.2 (L'Hôpital is inconclusive).** Compute $\displaystyle \lim_{x \to \infty} \frac{x + \sin x}{x}$.

**Direct computation.**
$$\frac{x + \sin x}{x} = 1 + \frac{\sin x}{x}.$$
Since $|\sin x/x| \le 1/x \to 0$, the limit is $1$.

**L'Hôpital attempt.** Differentiating numerator and denominator,
$$\frac{(x + \sin x)'}{x'} = \frac{1 + \cos x}{1} = 1 + \cos x,$$
which oscillates between $0$ and $2$ — no limit exists. L'Hôpital's hypothesis ($\lim f'/g'$ exists) **fails**, so the theorem is silent. But the original limit exists and equals $1$.

> **Best practice.**
> 1. **Always verify indeterminacy first.** If the limit is not $0/0$ or $\infty/\infty$, L'Hôpital does not apply (and blindly differentiating will give wrong answers).
> 2. **Check that $\lim f'/g'$ is actually computable.** If it diverges oscillatorily (does not exist), abandon L'Hôpital.
> 3. **Consider alternatives:** Taylor series, direct comparison, algebraic manipulation, squeeze theorem.
> 4. **Iteration terminates.** If repeated L'Hôpital applications continue to yield indeterminate forms, sometimes symbolic expansion (Taylor) is far more efficient — as in Example 24.10.1.

---

## 24.5 Vector-Valued Functions: Setup

We now leave the world of scalar analysis and introduce maps $[a, b] \to \mathbb{R}^n$. The central insight is: **everything reduces to coordinates**, but the coordinate-free geometric picture (tangent, speed, direction) is richer.

> **Definition 24.3 (Vector-valued function).** A **vector-valued function** on $[a, b]$ is a map
> $$f : [a, b] \to \mathbb{R}^n, \qquad f(t) = (f_1(t), f_2(t), \ldots, f_n(t)),$$
> where each $f_i : [a, b] \to \mathbb{R}$ is called a **coordinate function** (or **component function**) of $f$.

> **Definition 24.4 (Euclidean norm).** For $x = (x_1, \ldots, x_n) \in \mathbb{R}^n$, the **Euclidean norm** is
> $$\|x\| = \sqrt{x_1^2 + \cdots + x_n^2} = \sqrt{x \cdot x},$$
> where $x \cdot y = \sum_i x_i y_i$ is the standard inner product.

**Basic inequalities.** Three norm inequalities will be used repeatedly.
1. **Coordinate bound.** $|x_i| \le \|x\| \le \sum_j |x_j|$. (Each $|x_i|^2 \le \sum_j x_j^2$; for the upper, expand $(\sum_j |x_j|)^2 = \sum x_j^2 + 2\sum_{j<k} |x_j||x_k| \ge \sum x_j^2$.)
2. **Triangle inequality.** $\|x + y\| \le \|x\| + \|y\|$.
3. **Cauchy-Schwarz.** $|x \cdot y| \le \|x\| \|y\|$, with equality iff $x, y$ are parallel.

> **Definition 24.5 (Limit of vector-valued function).** Let $f : (a, b) \to \mathbb{R}^n$ and $L \in \mathbb{R}^n$. Write $\lim_{t \to t_0} f(t) = L$ if
> $$\forall \varepsilon > 0 \ \exists \delta > 0 : \ 0 < |t - t_0| < \delta \implies \|f(t) - L\| < \varepsilon.$$

> **Proposition 24.5.1 (Coordinate convergence).** $\lim_{t \to t_0} f(t) = L$ if and only if $\lim_{t \to t_0} f_i(t) = L_i$ for each $i = 1, \ldots, n$.

**Proof.** Use the coordinate bound.
- ($\Rightarrow$) $|f_i(t) - L_i| \le \|f(t) - L\|$. If the right side $\to 0$, so does the left.
- ($\Leftarrow$) $\|f(t) - L\| \le \sum_i |f_i(t) - L_i|$. If each summand $\to 0$ (finitely many), the sum $\to 0$.
$\blacksquare$

> **Definition 24.6 (Continuity).** $f : [a, b] \to \mathbb{R}^n$ is **continuous at** $t_0 \in [a, b]$ if $\lim_{t \to t_0} f(t) = f(t_0)$. By Proposition 24.5.1, this happens iff each coordinate $f_i$ is continuous at $t_0$.

> **Remark 24.5.2.** Since each $f_i$ inherits scalar theorems, vector-valued functions inherit a huge amount of structure coordinatewise: extreme value theorem ($\|f\|$ continuous, so bounded on compact), intermediate value applied coordinatewise where meaningful, uniform continuity on compact intervals, etc.

---

## 24.6 Derivatives of Vector-Valued Functions

> **Definition 24.7 (Derivative).** $f : [a, b] \to \mathbb{R}^n$ is **differentiable at** $t \in (a, b)$ if the limit
> $$f'(t) := \lim_{h \to 0} \frac{f(t + h) - f(t)}{h}$$
> exists in $\mathbb{R}^n$. Equivalently, there exists a vector $v \in \mathbb{R}^n$ such that
> $$\lim_{h \to 0} \frac{\|f(t + h) - f(t) - h v\|}{|h|} = 0,$$
> in which case $v = f'(t)$.

The second formulation rephrases differentiability as *linear approximability*: $f(t + h) = f(t) + h f'(t) + o(h)$ as $h \to 0$, where $o(h)$ is a vector with $\|o(h)\|/|h| \to 0$. This is the germ of the **Fréchet** derivative extended to higher dimensions.

> **Theorem 24.8 (Coordinate characterization of differentiability).** $f$ is differentiable at $t$ if and only if each coordinate $f_i$ is differentiable at $t$, in which case
> $$f'(t) = (f_1'(t), f_2'(t), \ldots, f_n'(t)).$$

**Proof.** The vector difference quotient has $i$th coordinate equal to the scalar difference quotient of $f_i$:
$$\left(\frac{f(t + h) - f(t)}{h}\right)_i = \frac{f_i(t + h) - f_i(t)}{h}.$$
By Proposition 24.5.1 applied to the $\mathbb{R}^n$-valued function $h \mapsto \frac{f(t+h)-f(t)}{h}$, its limit as $h \to 0$ exists iff each coordinate limit exists, and the limit is coordinatewise. The coordinate limit $\lim_{h \to 0} [f_i(t+h) - f_i(t)]/h$ is by definition $f_i'(t)$. $\blacksquare$

> **Geometric interpretation.**
> - Thinking of $f : [a, b] \to \mathbb{R}^n$ as a parametrized curve, $f'(t)$ is the **tangent vector** at $f(t)$.
> - $\|f'(t)\|$ is the **speed** at time $t$ — infinitesimal distance per unit parameter.
> - $f'(t)/\|f'(t)\|$ (when nonzero) is the **unit tangent** vector, a purely direction-encoding unit vector.
> - $f(t + h) \approx f(t) + h f'(t)$ is the *tangent line approximation*: the curve is locally a straight line in the direction $f'(t)$, traversed at speed $\|f'(t)\|$.

> **Remark 24.6.1 (Reparametrization freedom).** Two different parametrizations $f$ and $g = f \circ \varphi$ of the same curve (with $\varphi$ a $C^1$ diffeomorphism) have **different** tangent-vector-*magnitudes* ($g' = \varphi' \cdot (f' \circ \varphi)$), but their **directions** agree up to sign. This is why speed is parametrization-dependent, direction is not, and **arc-length parametrization** (speed $\equiv 1$) is canonical.

---

## 24.7 Algebraic Rules

> **Theorem 24.9 (Algebra of vector derivatives).** Let $f, g : [a, b] \to \mathbb{R}^n$ and $\phi : [a, b] \to \mathbb{R}$ be differentiable at $t$. Then:
>
> **(i) Sum:** $(f + g)'(t) = f'(t) + g'(t)$.
>
> **(ii) Scalar-vector product:** $(\phi \cdot f)'(t) = \phi'(t) f(t) + \phi(t) f'(t)$.
>
> **(iii) Inner product:** $(f \cdot g)'(t) = f'(t) \cdot g(t) + f(t) \cdot g'(t)$.
>
> **(iv) Cross product (in $\mathbb{R}^3$):** $(f \times g)'(t) = f'(t) \times g(t) + f(t) \times g'(t)$.
>
> **(v) Chain rule (scalar reparametrization):** if $\varphi : I \to [a, b]$ is differentiable at $t_0$ and $f$ is differentiable at $\varphi(t_0)$, then $f \circ \varphi$ is differentiable at $t_0$ with
> $$(f \circ \varphi)'(t_0) = \varphi'(t_0) \cdot f'(\varphi(t_0)).$$

**Proofs.** We prove each in turn, reducing to coordinates where convenient.

**(i) Sum rule.** $(f + g)_i = f_i + g_i$; each scalar sum rule gives $(f_i + g_i)' = f_i' + g_i'$. Coordinate-assemble: $(f+g)' = (f_i' + g_i')_i = f' + g'$. $\checkmark$

**(ii) Scalar-vector.** $(\phi f)_i = \phi f_i$; scalar product rule $(\phi f_i)' = \phi' f_i + \phi f_i'$. Assemble: $(\phi f)' = (\phi' f_i + \phi f_i')_i = \phi' f + \phi f'$. $\checkmark$

**(iii) Inner product.** $f \cdot g = \sum_{i=1}^n f_i g_i$, a **scalar** function of $t$. By the scalar sum rule and product rule,
$$(f \cdot g)'(t) = \sum_{i=1}^n (f_i g_i)'(t) = \sum_{i=1}^n [f_i'(t) g_i(t) + f_i(t) g_i'(t)] = f'(t) \cdot g(t) + f(t) \cdot g'(t). \ \checkmark$$

**(iv) Cross product ($n = 3$).** Write $f \times g = \bigl(f_2 g_3 - f_3 g_2,\ f_3 g_1 - f_1 g_3,\ f_1 g_2 - f_2 g_1\bigr)$. Each coordinate is a sum of products; scalar product rule applies. Collecting terms yields precisely $f' \times g + f \times g'$. We verify the first coordinate:
$$(f_2 g_3 - f_3 g_2)' = f_2' g_3 + f_2 g_3' - f_3' g_2 - f_3 g_2' = (f_2' g_3 - f_3' g_2) + (f_2 g_3' - f_3 g_2'),$$
which is the first coordinate of $f' \times g + f \times g'$. The other two follow similarly. **Note:** order matters — $f \times g$ is anti-symmetric, so one must not reverse factors. $\checkmark$

**(v) Chain rule.** Write $F = f \circ \varphi$, so $F_i = f_i \circ \varphi$. By the scalar chain rule, $F_i'(t_0) = \varphi'(t_0) \cdot f_i'(\varphi(t_0))$. Assemble coordinates: $F'(t_0) = \varphi'(t_0) \cdot f'(\varphi(t_0))$. $\checkmark$ $\blacksquare$

> **Corollary 24.10 (Constant-norm $\Rightarrow$ perpendicular derivative).** If $\|f(t)\|$ is constant on an interval, then $f(t) \cdot f'(t) = 0$ for every $t$ where $f$ is differentiable.

**Proof.** By (iii), differentiate $\|f\|^2 = f \cdot f$:
$$\frac{d}{dt} (f \cdot f) = f' \cdot f + f \cdot f' = 2 f \cdot f'.$$
If $\|f\|^2$ is constant, its derivative is $0$, so $2 f \cdot f' = 0$, i.e., $f \cdot f' = 0$. $\blacksquare$

> **Geometric corollary.** Motion along a **sphere** (constant distance from origin, including circular motion) has velocity perpendicular to the position vector from the center. In particular, uniform circular motion has centripetal acceleration.

---

## 24.8 Failure of the Classical MVT in Vector Form

> **Warning 24.11.** Lagrange's Mean Value Theorem does **NOT** extend to $\mathbb{R}^n$-valued functions. That is, given a differentiable $f : [a, b] \to \mathbb{R}^n$, there need not exist $\xi \in (a, b)$ with
> $$f(b) - f(a) = f'(\xi)(b - a).$$

The reason: such an equality would force a specific *direction* to be hit exactly by some $f'(\xi)$, and in $\mathbb{R}^n$ there is no forcing mechanism — velocities can point many ways.

**Counterexample 24.11.1 (Closed loop).** Let $f : [0, 2\pi] \to \mathbb{R}^2$ by $f(t) = (\cos t, \sin t)$, the unit circle parametrized counterclockwise.

**Left-hand side.** $f(2\pi) - f(0) = (1 - 1, 0 - 0) = (0, 0)$.

**Right-hand side.** For MVT to hold we would need $\xi \in (0, 2\pi)$ with $f'(\xi) \cdot 2\pi = (0, 0)$, i.e., $f'(\xi) = (0, 0)$. But
$$f'(t) = (-\sin t, \cos t), \qquad \|f'(t)\|^2 = \sin^2 t + \cos^2 t = 1,$$
so $\|f'(t)\| \equiv 1$, and $f'(t) \neq 0$ for every $t$. No valid $\xi$ exists. $\blacksquare$

**Geometric reason.** The endpoints coincide (closed loop), so the chord is the zero vector. But the velocity never vanishes on the circle — the point always moves with unit speed. Equality is impossible.

**Counterexample 24.11.2 (Helix).** Similarly, $f(t) = (\cos t, \sin t, t)$ on $[0, 2\pi]$: $f(2\pi) - f(0) = (0, 0, 2\pi)$, so we would need $f'(\xi) \cdot 2\pi = (0, 0, 2\pi)$, i.e., $f'(\xi) = (0, 0, 1)$. But $f'(t) = (-\sin t, \cos t, 1)$, whose first two coordinates are never both $0$ simultaneously. No valid $\xi$.

---

## 24.9 MVT Inequality Version (Vector-Valued)

The equality MVT fails, but an **inequality** holds and turns out to be more useful in practice.

> **Theorem 24.12 (Vector-valued MVT inequality).** Let $f : [a, b] \to \mathbb{R}^n$ be continuous on $[a, b]$ and differentiable on $(a, b)$. Then there exists $\xi \in (a, b)$ such that
> $$\|f(b) - f(a)\| \le \|f'(\xi)\| \cdot (b - a).$$
> In particular (taking supremum),
> $$\|f(b) - f(a)\| \le (b - a) \sup_{t \in (a, b)} \|f'(t)\|.$$

**Proof.** We present the argument in six steps.

**Step 1: Trivial case.** If $f(b) = f(a)$, the left side is $0$, and the inequality holds trivially (any $\xi$ works). Assume henceforth $f(b) \neq f(a)$.

**Step 2: Auxiliary scalar function.** Define $\phi : [a, b] \to \mathbb{R}$ by
$$\phi(t) = (f(b) - f(a)) \cdot f(t).$$
The vector $v := f(b) - f(a)$ is a fixed element of $\mathbb{R}^n$; $\phi(t) = v \cdot f(t)$ is a **scalar** function of $t$. Inner product with a fixed vector is continuous (on $[a, b]$) and differentiable (on $(a, b)$) since $f$ is, by (iii) of Theorem 24.9 applied to $f$ and the constant function $v$:
$$\phi'(t) = v \cdot f'(t) = (f(b) - f(a)) \cdot f'(t).$$

**Step 3: Scalar MVT on $\phi$.** Apply Lagrange's MVT (Theorem 23.3) to $\phi$ on $[a, b]$: there exists $\xi \in (a, b)$ with
$$\phi(b) - \phi(a) = \phi'(\xi) (b - a). \tag{$\star$}$$

**Step 4: Evaluate LHS of $(\star)$.**
$$\phi(b) - \phi(a) = v \cdot f(b) - v \cdot f(a) = v \cdot (f(b) - f(a)) = v \cdot v = \|v\|^2 = \|f(b) - f(a)\|^2.$$

**Step 5: Bound RHS of $(\star)$ by Cauchy-Schwarz.**
$$|\phi'(\xi)| = |v \cdot f'(\xi)| \le \|v\| \|f'(\xi)\| \ \ (\text{Cauchy-Schwarz}).$$
Thus
$$\phi'(\xi)(b-a) \le \|v\| \|f'(\xi)\| (b - a).$$

**Step 6: Combine.** From $(\star)$ with Steps 4 and 5,
$$\|v\|^2 = \phi'(\xi)(b - a) \le \|v\| \|f'(\xi)\|(b - a).$$
Divide by $\|v\| > 0$ (justified since $v \neq 0$ by Step 1):
$$\|v\| = \|f(b) - f(a)\| \le \|f'(\xi)\| (b - a). \ \blacksquare$$

> **Remark 24.9.1 (Why the inequality is "the right" generalization).** It captures the only robust content of the scalar MVT: that the *magnitude* of displacement is bounded by the *worst-case* magnitude of velocity, times the time elapsed. Directional information in the scalar MVT is a coincidence of one-dimensionality, not a deep fact.

> **Corollary 24.12.1 (Bounded derivative $\Rightarrow$ Lipschitz).** If $\|f'(t)\| \le M$ on $(a, b)$, then
> $$\|f(s) - f(t)\| \le M |s - t| \quad \text{for all } s, t \in [a, b].$$

**Proof.** Apply Theorem 24.12 on $[\min(s, t), \max(s, t)]$. $\blacksquare$

> **Corollary 24.12.2 (Zero derivative $\Rightarrow$ constant).** If $f'(t) = 0$ for all $t \in (a, b)$, then $f$ is constant on $[a, b]$.

**Proof.** Take $M = 0$ in Corollary 24.12.1: $\|f(s) - f(t)\| \le 0$, so $f(s) = f(t)$ for all $s, t$. $\blacksquare$

---

## 24.10 Directional Derivatives, Partial Derivatives, Gradient, Total Derivative

We now take the first step *beyond* vector-valued functions of a scalar variable, and toward real multivariable calculus. Here the domain becomes $\mathbb{R}^m$ (or an open subset). For graduate preparation, it is important to see these concepts in proper logical order.

### 24.10.1 Partial Derivatives

> **Definition 24.13 (Partial derivative).** Let $U \subset \mathbb{R}^m$ be open and $f : U \to \mathbb{R}$. The **$j$th partial derivative** of $f$ at $x_0 \in U$ is
> $$\frac{\partial f}{\partial x_j}(x_0) := \lim_{h \to 0} \frac{f(x_0 + h e_j) - f(x_0)}{h},$$
> where $e_j$ is the $j$th standard basis vector, provided the limit exists.

**Interpretation.** Freeze all coordinates except the $j$th; partial-differentiate the resulting scalar function.

### 24.10.2 Directional Derivatives

> **Definition 24.14 (Directional derivative).** For $v \in \mathbb{R}^m$ (not necessarily of unit norm) and $f : U \to \mathbb{R}$, the **directional derivative of $f$ at $x_0$ in direction $v$** is
> $$D_v f(x_0) := \lim_{h \to 0} \frac{f(x_0 + h v) - f(x_0)}{h},$$
> when this limit exists.

Observe $D_{e_j} f(x_0) = \partial f / \partial x_j(x_0)$: partial derivatives are directional derivatives along coordinate axes.

**Warning 24.14.1.** Existence of *all* directional derivatives at $x_0$ does **not** imply differentiability (see 24.10.5 below, and the counterexample $f(x, y) = x^2 y / (x^4 + y^2)$).

### 24.10.3 Gradient

> **Definition 24.15 (Gradient).** If all partials of $f : U \to \mathbb{R}$ exist at $x_0$, the **gradient** of $f$ at $x_0$ is the vector
> $$\nabla f(x_0) := \left(\frac{\partial f}{\partial x_1}(x_0), \ldots, \frac{\partial f}{\partial x_m}(x_0)\right) \in \mathbb{R}^m.$$

### 24.10.4 Total Derivative

> **Definition 24.16 (Total derivative, Fréchet).** $f : U \to \mathbb{R}$ is **(totally) differentiable at** $x_0$ if there exists a linear map $L : \mathbb{R}^m \to \mathbb{R}$ (equivalently, a vector $\nabla f(x_0)$) such that
> $$\lim_{h \to 0} \frac{f(x_0 + h) - f(x_0) - L(h)}{\|h\|} = 0.$$

Here $h \in \mathbb{R}^m$, not a scalar. When this holds, $L(h) = \nabla f(x_0) \cdot h$ — the **total derivative** is represented by the gradient via the inner product.

> **Theorem 24.17 (Differentiability $\Rightarrow$ directional derivatives).** If $f$ is (totally) differentiable at $x_0$, then for every $v \in \mathbb{R}^m$,
> $$D_v f(x_0) = \nabla f(x_0) \cdot v.$$

**Proof.** By definition of total differentiability with $h = tv$ (for $t \to 0^+$):
$$\frac{f(x_0 + tv) - f(x_0) - t \nabla f(x_0) \cdot v}{\|tv\|} = \frac{f(x_0 + tv) - f(x_0) - t \nabla f(x_0) \cdot v}{|t| \|v\|}.$$
By hypothesis the LHS $\to 0$ as $t \to 0$. Rearranging,
$$\frac{f(x_0 + tv) - f(x_0)}{t} \to \nabla f(x_0) \cdot v. \ \blacksquare$$

### 24.10.5 Counterexamples and Fine Structure

**Example 24.10.5.1 (All partials exist, but not differentiable).** Let
$$f(x, y) = \begin{cases} \dfrac{xy}{x^2 + y^2}, & (x, y) \neq (0, 0), \\ 0, & (x, y) = (0, 0). \end{cases}$$
- $\partial f / \partial x(0,0) = \lim_{h \to 0} [f(h, 0) - 0]/h = \lim 0/h = 0$. Similarly $\partial f / \partial y(0,0) = 0$.
- **Not continuous at origin**: along $y = x$, $f(x, x) = x^2 / (2x^2) = 1/2 \not\to 0$. A non-continuous function cannot be (totally) differentiable.
- Hence $f$ has both partials but is not differentiable.

**Example 24.10.5.2 (All directional derivatives exist, not differentiable).** Let
$$f(x, y) = \begin{cases} \dfrac{x^2 y}{x^4 + y^2}, & (x, y) \neq (0, 0), \\ 0, & (0, 0). \end{cases}$$
- Along any line $(tu, tv)$ (with $(u, v) \neq (0, 0)$): for $v \neq 0$, $f(tu, tv) = t^3 u^2 v/(t^4 u^4 + t^2 v^2) = tu^2 v/(t^2 u^4 + v^2) \to 0/v^2 = 0$ as $t \to 0$. So $D_{(u,v)} f(0, 0) = 0$ for all directions.
- But along the **curve** $y = x^2$: $f(x, x^2) = x^4/(x^4 + x^4) = 1/2$, so $f$ is not continuous at origin.
- Not differentiable, despite all directional derivatives existing.

> **Theorem 24.18 (Sufficient condition for differentiability).** If all partials $\partial f / \partial x_j$ exist in a neighborhood of $x_0$ and are **continuous at** $x_0$, then $f$ is (totally) differentiable at $x_0$.

*Proof sketch.* Write $f(x_0 + h) - f(x_0)$ as a telescoping sum
$$\sum_{j=1}^m [f(x_0 + h_1 e_1 + \cdots + h_j e_j) - f(x_0 + h_1 e_1 + \cdots + h_{j-1} e_{j-1})],$$
apply the scalar MVT to each difference to get $h_j \partial f / \partial x_j(\xi^{(j)})$ for some $\xi^{(j)}$, then use continuity of the partials to pass to $\nabla f(x_0) \cdot h + o(\|h\|)$.

Such $f$ is called **$C^1$ at $x_0$**, and $C^1$ is (in practice) the most common route to differentiability.

### 24.10.6 Geometric Meaning of the Gradient

If $f$ is differentiable at $x_0$ with $\nabla f(x_0) \neq 0$, by Theorem 24.17 and Cauchy-Schwarz,
$$D_v f(x_0) = \nabla f(x_0) \cdot v \le \|\nabla f(x_0)\| \|v\|,$$
with equality iff $v$ is parallel to $\nabla f(x_0)$. For unit $v$ ($\|v\| = 1$):
- **Max directional derivative** $= \|\nabla f(x_0)\|$, achieved in direction $\nabla f(x_0)/\|\nabla f(x_0)\|$. This is the **direction of steepest ascent**.
- **Min directional derivative** $= -\|\nabla f(x_0)\|$, achieved in direction $-\nabla f(x_0)/\|\nabla f(x_0)\|$: **steepest descent**.
- $D_v f(x_0) = 0$ iff $v \perp \nabla f(x_0)$: **level-set tangent directions**.

This fundamental trichotomy underpins gradient descent, level-set geometry, and Lagrange multipliers.

---

## 24.11 Worked Examples

### Example 24.11.1. $\displaystyle \lim_{x \to 0} \frac{\tan x - x}{x^3}$

**Setup.** As $x \to 0$: $\tan x \to 0$ and $x \to 0$, so numerator $\to 0$; denominator $\to 0$. Form $0/0$, indeterminate.

**Strategy.** Iterated L'Hôpital — we expect three applications since numerator/denominator both vanish to order $\ge 3$. (Alternatively, Taylor expansion.)

**Computation (L'Hôpital).**

*First application.* $\tfrac{d}{dx}(\tan x - x) = \sec^2 x - 1$; $\tfrac{d}{dx}(x^3) = 3x^2$. Both $\to 0$ at $x = 0$ (since $\sec^2 0 = 1$).
$$\lim_{x \to 0} \frac{\sec^2 x - 1}{3 x^2}, \quad \text{form } 0/0.$$

*Second application.* $\tfrac{d}{dx}(\sec^2 x - 1) = 2 \sec x \cdot (\sec x \tan x) = 2 \sec^2 x \tan x$; $\tfrac{d}{dx}(3x^2) = 6x$. At $x = 0$: numerator $= 0$ (factor $\tan 0 = 0$); denominator $= 0$. Still $0/0$.
$$\lim_{x \to 0} \frac{2 \sec^2 x \tan x}{6 x} = \lim_{x \to 0} \frac{\sec^2 x \tan x}{3 x}.$$

*Third application.* Differentiate the simpler version:
$$\tfrac{d}{dx}[\sec^2 x \tan x] = 2 \sec^2 x \tan x \cdot \tan x + \sec^2 x \cdot \sec^2 x = 2 \sec^2 x \tan^2 x + \sec^4 x,$$
and $\tfrac{d}{dx}(3x) = 3$. At $x = 0$: $\tan 0 = 0$, $\sec 0 = 1$, so numerator $= 2 \cdot 1 \cdot 0 + 1 = 1$; denominator $= 3$.
$$\lim_{x \to 0} \frac{2 \sec^2 x \tan^2 x + \sec^4 x}{3} = \frac{1}{3}.$$

**Computation (Taylor, verification).** Use $\tan x = x + x^3/3 + 2x^5/15 + O(x^7)$:
$$\tan x - x = \frac{x^3}{3} + \frac{2x^5}{15} + O(x^7).$$
Divide by $x^3$:
$$\frac{\tan x - x}{x^3} = \frac{1}{3} + \frac{2x^2}{15} + O(x^4) \to \frac{1}{3}.$$
Both methods agree.

**Answer.** $\boxed{1/3}$.

**Interpretation.** Taylor is usually the fastest route when coefficients are known; L'Hôpital is mechanical but clumsier. Both are indispensable.

---

### Example 24.11.2. $\displaystyle \lim_{x \to \infty} x^{1/x}$

**Setup.** Base $x \to \infty$, exponent $1/x \to 0$. Form $\infty^0$, indeterminate.

**Strategy.** Take logarithms, reduce to $\infty/\infty$.

**Computation.** Let $y = x^{1/x}$. Then $\ln y = \tfrac{\ln x}{x}$. As $x \to \infty$: $\ln x \to \infty$, $x \to \infty$; form $\infty/\infty$. Apply Theorem 24.2:
$$\lim_{x \to \infty} \frac{\ln x}{x} = \lim_{x \to \infty} \frac{1/x}{1} = 0.$$
So $\ln y \to 0$, hence $y \to e^0 = 1$.

**Verification.** For $x = e^n$, $x^{1/x} = e^{n/e^n}$. As $n \to \infty$, $n/e^n \to 0$ (exponential dominates polynomial), so $x^{1/x} \to e^0 = 1$. Consistent.

**Answer.** $\boxed{1}$.

**Interpretation.** "Logs grow slower than polynomials" expressed multiplicatively: $x^{1/x} = e^{\ln x/x} \to e^0 = 1$.

---

### Example 24.11.3. Helix $f(t) = (\cos t, \sin t, t)$

**Setup.** Classic unit-speed-in-$xy$-plus-linear-in-$z$ parametrization. Compute $f'(t)$ and $\|f'(t)\|$.

**Strategy.** Differentiate coordinatewise (Theorem 24.8); compute norm.

**Computation.**
- $f_1(t) = \cos t \Rightarrow f_1'(t) = -\sin t$.
- $f_2(t) = \sin t \Rightarrow f_2'(t) = \cos t$.
- $f_3(t) = t \Rightarrow f_3'(t) = 1$.
Hence $f'(t) = (-\sin t, \cos t, 1)$.

Norm:
$$\|f'(t)\|^2 = \sin^2 t + \cos^2 t + 1 = 2 \Rightarrow \|f'(t)\| = \sqrt{2}.$$

**Verification.** Constant norm means the curve is traversed at constant speed — consistent with being the screw-motion trajectory.

**Interpretation.** The helix has **unit angular speed** ($\omega = 1$) and **unit vertical speed**; combined Euclidean speed is $\sqrt{1^2 + 1^2} = \sqrt{2}$. Tangent direction is always $\sqrt{2}^{-1}(-\sin t, \cos t, 1)$, a unit vector inclined $45°$ to the $xy$-plane.

---

### Example 24.11.4. Bound via MVT inequality

**Setup.** Let $f : [0, 1] \to \mathbb{R}^2$ be differentiable with $f(0) = (0, 0)$ and $\|f'(t)\| \le 1$ for all $t \in (0, 1)$. Show $\|f(1)\| \le 1$.

**Strategy.** Direct application of Theorem 24.12.

**Computation.**
$$\|f(1) - f(0)\| \le (1 - 0) \sup_{t \in (0, 1)} \|f'(t)\| \le 1 \cdot 1 = 1.$$
Since $f(0) = (0, 0)$,
$$\|f(1) - (0,0)\| = \|f(1)\| \le 1. \ \blacksquare$$

**Interpretation.** This is the Lipschitz characterization: a path with velocity bounded by $1$ cannot travel more than unit distance in unit time. Generalizes the scalar statement $|f(b) - f(a)| \le M(b - a)$ of Corollary 23.4.

---

### Example 24.11.5. Zero derivative $\Rightarrow$ constant

**Setup.** $f : [a, b] \to \mathbb{R}^n$ differentiable, $f'(t) = 0$ for all $t \in (a, b)$. Show $f$ is constant.

**Strategy.** Apply Theorem 24.12 to arbitrary $x \in [a, b]$.

**Computation.**
$$\|f(x) - f(a)\| \le (x - a) \sup_{t \in (a, x)} \|f'(t)\| = (x - a) \cdot 0 = 0.$$
So $f(x) = f(a)$ for every $x \in [a, b]$. $\blacksquare$

**Interpretation.** The scalar "zero derivative $\Rightarrow$ constant" (Corollary 23.3) extends verbatim to vector-valued functions via the MVT inequality. This underlies the "primitive is unique up to additive constant" statement in the multivariable fundamental theorem.

---

### Example 24.11.6. Gradient of $f(x, y) = x^2 y + \sin(xy)$

**Setup.** Compute $\nabla f$ at $(1, 0)$, the max directional derivative, and its direction.

**Strategy.** Partial derivatives, then apply the gradient geometry.

**Computation.**
- $\partial f/\partial x = 2xy + y \cos(xy)$; at $(1, 0)$: $0 + 0 = 0$.
- $\partial f/\partial y = x^2 + x \cos(xy)$; at $(1, 0)$: $1 + 1 = 2$.

So $\nabla f(1, 0) = (0, 2)$.

**Max directional derivative** is $\|\nabla f(1, 0)\| = 2$, achieved in the direction of $\nabla f(1, 0)/\|\nabla f(1, 0)\| = (0, 1)$.

**Verification.** Check with a direct computation: along the $y$-axis through $(1, 0)$, $f(1, t) = t + \sin t$, $\tfrac{d}{dt} f(1, t)|_{t=0} = 1 + \cos 0 = 2$. Agreed.

**Interpretation.** At $(1, 0)$, $f$ grows most steeply in the $+y$ direction, at rate $2$; level-set tangents are in the $\pm x$ direction (perpendicular to $(0, 2)$).

---

## 24.12 Practice Problems

1. Compute $\displaystyle \lim_{x \to 0} \frac{e^x - 1 - x}{x^2}$.

2. Compute $\displaystyle \lim_{x \to 0^+} (\sin x)^x$.

3. Compute $\displaystyle \lim_{x \to \infty} \left(\frac{x + 2}{x - 1}\right)^x$.

4. For $f(t) = (t^2, t^3, e^t)$, compute $f'(1)$.

5. Suppose $f : [a, b] \to \mathbb{R}^n$ is differentiable and $\|f'(t)\| = 1$ for all $t$. Prove the length of the curve is $b - a$.

6. For $f(x, y) = e^{xy}$, compute all partials and $\nabla f(1, 0)$. Find the direction of steepest ascent at $(1, 0)$.

### Solutions

---

**Solution 1.** $\displaystyle \lim_{x \to 0} \frac{e^x - 1 - x}{x^2}$.

**Setup.** $e^x - 1 - x \to 0$, $x^2 \to 0$. Form $0/0$.

**Strategy.** L'Hôpital twice, or Taylor.

**Computation (L'Hôpital).**

*First application.* $(e^x - 1 - x)' = e^x - 1$; $(x^2)' = 2x$. Both $\to 0$.
$$\lim_{x \to 0} \frac{e^x - 1}{2x}, \quad \text{form } 0/0.$$

*Second application.* $(e^x - 1)' = e^x$; $(2x)' = 2$. Numerator $\to 1$; denominator $= 2$.
$$\lim_{x \to 0} \frac{e^x}{2} = \frac{1}{2}.$$

**Verification (Taylor).** $e^x = 1 + x + x^2/2 + O(x^3)$, so $e^x - 1 - x = x^2/2 + O(x^3)$, and $(e^x - 1 - x)/x^2 = 1/2 + O(x) \to 1/2$. Agreed.

**Answer.** $\boxed{1/2}$. $\blacksquare$

---

**Solution 2.** $\displaystyle \lim_{x \to 0^+} (\sin x)^x$.

**Setup.** Base $\sin x \to 0^+$; exponent $x \to 0^+$. Form $0^0$, indeterminate.

**Strategy.** Take log, reduce to $0 \cdot (-\infty)$, then to an $\infty/\infty$ quotient.

**Computation.** Set $y = (\sin x)^x$. Then $\ln y = x \ln(\sin x)$. As $x \to 0^+$: $\ln(\sin x) \to -\infty$, $x \to 0^+$; form $0 \cdot (-\infty)$.

Convert:
$$x \ln(\sin x) = \frac{\ln(\sin x)}{1/x}, \quad \text{form } \frac{-\infty}{+\infty}.$$

Apply Theorem 24.2:
$$\lim_{x \to 0^+} \frac{\ln(\sin x)}{1/x} = \lim_{x \to 0^+} \frac{(\ln(\sin x))'}{(1/x)'} = \lim_{x \to 0^+} \frac{\cos x/\sin x}{-1/x^2} = \lim_{x \to 0^+} -\frac{x^2 \cos x}{\sin x}.$$

Rewrite as $-\,x \cos x \cdot \dfrac{x}{\sin x}$. As $x \to 0^+$:
- $x \cos x \to 0 \cdot 1 = 0$.
- $x/\sin x \to 1$ (standard limit).

Product $\to 0 \cdot 1 = 0$. So $\ln y \to 0$, hence $y \to e^0 = 1$.

**Verification.** Numerically for $x = 0.01$: $\sin(0.01) \approx 0.01$, $(0.01)^{0.01} = e^{0.01 \ln 0.01} = e^{-0.046} \approx 0.955$; closer to $1$ as $x$ shrinks.

**Answer.** $\boxed{1}$. $\blacksquare$

---

**Solution 3.** $\displaystyle \lim_{x \to \infty} \left(\frac{x + 2}{x - 1}\right)^x$.

**Setup.** Base $(x+2)/(x-1) \to 1$; exponent $x \to \infty$. Form $1^\infty$.

**Strategy.** Logarithm, then use $\ln(1 + u) \sim u$ for small $u$.

**Computation.** Set $y = ((x+2)/(x-1))^x$.
$$\ln y = x \ln\frac{x+2}{x-1} = x \ln\left(1 + \frac{3}{x - 1}\right).$$

Let $u = 3/(x - 1)$; as $x \to \infty$, $u \to 0$. Rewrite:
$$\ln y = x \cdot u \cdot \frac{\ln(1 + u)}{u} = \frac{3x}{x - 1} \cdot \frac{\ln(1 + u)}{u}.$$

Limits:
- $\dfrac{3x}{x-1} = \dfrac{3}{1 - 1/x} \to 3$.
- $\dfrac{\ln(1 + u)}{u} \to 1$ (standard limit).

So $\ln y \to 3 \cdot 1 = 3$, and $y \to e^3$.

**Verification (L'Hôpital on $\ln y$).** Alternatively, compute $\lim_{x \to \infty} x \ln((x+2)/(x-1))$ directly. Note
$$\ln\frac{x+2}{x-1} = \ln(x + 2) - \ln(x - 1).$$
As $x \to \infty$, $\ln(x+2)/\ln(x-1) \to 1$; use $\ln(x+2) - \ln(x-1) = \ln(1 + 3/(x-1)) \approx 3/(x-1)$. Then $x \cdot 3/(x-1) \to 3$. Agreed.

**Answer.** $\boxed{e^3}$. $\blacksquare$

---

**Solution 4.** $f(t) = (t^2, t^3, e^t)$, $f'(1) = ?$

**Setup.** Differentiate coordinatewise (Theorem 24.8).

**Computation.**
- $f_1'(t) = 2t \Rightarrow f_1'(1) = 2$.
- $f_2'(t) = 3t^2 \Rightarrow f_2'(1) = 3$.
- $f_3'(t) = e^t \Rightarrow f_3'(1) = e$.

$\boxed{f'(1) = (2, 3, e)}$. $\blacksquare$

**Interpretation.** The tangent vector to the curve at $f(1) = (1, 1, e)$ points in direction $(2, 3, e)$; speed is $\|f'(1)\| = \sqrt{4 + 9 + e^2} = \sqrt{13 + e^2}$.

---

**Solution 5.** $\|f'(t)\| \equiv 1 \Rightarrow$ length $= b - a$.

**Setup.** The arc length of a $C^1$ curve $f : [a, b] \to \mathbb{R}^n$ is
$$L = \int_a^b \|f'(t)\|\, dt.$$
(This is a **definition** motivated by Riemannian sum approximations and justified via the Riemann integral; see [[25-riemann-stieltjes-integral]] for the full construction.)

**Strategy.** Substitute the assumption.

**Computation.**
$$L = \int_a^b 1\, dt = b - a. \ \blacksquare$$

**Interpretation.** A curve with **constant unit speed** is said to be **arc-length parametrized** (or **unit-speed parametrized**). The parameter *is* the arc length. Canonically, every regular $C^1$ curve (with $f' \neq 0$) admits a unit-speed reparametrization, obtained by inverting $s(t) = \int_a^t \|f'(\tau)\|\, d\tau$.

---

**Solution 6.** $f(x, y) = e^{xy}$, partials and gradient.

**Setup.** Compute $\partial f/\partial x$, $\partial f/\partial y$, then evaluate at $(1, 0)$.

**Computation.**
- $\partial f/\partial x = y e^{xy}$; at $(1, 0)$: $0 \cdot e^0 = 0$.
- $\partial f/\partial y = x e^{xy}$; at $(1, 0)$: $1 \cdot e^0 = 1$.

$\nabla f(1, 0) = (0, 1)$. Magnitude $1$, direction $(0, 1)$ (the positive $y$-axis).

**Direction of steepest ascent.** Unit vector along $\nabla f = (0, 1)$. Max directional derivative is $\|\nabla f(1,0)\| = 1$.

**Verification.** Along $(1, t)$, $f(1, t) = e^t$; $\tfrac{d}{dt} e^t |_{t=0} = 1$. This matches $D_{(0,1)} f(1, 0) = \nabla f \cdot (0, 1) = 1$.

**Answer.** $\nabla f(1, 0) = (0, 1)$, steepest ascent in $+y$ direction at rate $1$. $\blacksquare$

---

## 24.13 Summary

> **L'Hôpital — workflow**
>
> 1. **Identify** indeterminacy: $0/0$ or $\infty/\infty$ (or convert from $0 \cdot \infty$, $\infty - \infty$, $0^0$, $\infty^0$, $1^\infty$).
> 2. **Differentiate** numerator and denominator **separately** — not the quotient as a whole.
> 3. **Compute** $\lim f'/g'$. If it exists (possibly $\pm\infty$), it equals the original.
> 4. **Iterate** if still indeterminate.
> 5. **Abandon** if $f'/g'$ has no limit (oscillatory); try Taylor, squeezing, or algebraic manipulation.

> **Vector-valued functions — key facts**
>
> - **Coordinate-wise differentiation:** $f'(t) = (f_1'(t), \ldots, f_n'(t))$.
> - **Algebra rules:** sum, scalar-vector product, inner product, cross product all mirror scalar product rule.
> - **Orthogonality from constant norm:** $\|f\|$ constant $\Rightarrow f \cdot f' = 0$.
> - **Failure of equality MVT:** classical Lagrange MVT does **not** extend as equality in the vector case.
> - **Inequality MVT survives:** $\|f(b) - f(a)\| \le (b-a) \sup_t \|f'(t)\|$ — the workhorse estimate.
> - **Zero derivative $\Rightarrow$ constant** (via the inequality MVT).

> **Partial, directional, total derivatives — hierarchy**
>
> - **Partial $\subset$ Directional.** $\partial f/\partial x_j = D_{e_j} f$.
> - **Total differentiability $\Rightarrow$ existence of all directional derivatives**, with $D_v f = \nabla f \cdot v$.
> - **Converse fails:** all directional derivatives (even all partials) can exist without total differentiability or even continuity.
> - **Sufficient condition:** $C^1$ ($\nabla f$ exists and is continuous) $\Rightarrow$ totally differentiable.
> - **Gradient geometry:** $\nabla f$ points in direction of steepest ascent; magnitude is max rate of change; level sets are perpendicular to gradient.

> **Conceptual synthesis.** Scalar derivatives encode **rates of change**; vector derivatives additionally encode **direction**. Most scalar results carry over in coordinate form. The exceptions live at the boundary: the classical MVT weakens to an inequality in the vector case, and partial/directional derivatives do *not* collectively capture total differentiability — a failure warning that preludes the finer analysis of Fréchet differentiability in multivariable calculus.

---

## Related Topics

- [[22-differentiation]] — scalar derivatives, foundation
- [[23-mean-value-theorems]] — Cauchy MVT powers L'Hôpital; Lagrange MVT powers the vector inequality MVT
- [[18-important-limits-infinite-limits]] — catalogue of indeterminate forms
- [[25-riemann-stieltjes-integral]] — arc length, integration of vector-valued functions, fundamental theorem
- [[VACV/guide/02-vector-calculus]] — further multivariable calculus: divergence, curl, integration on manifolds
- [[12-infinite-series-introduction]] — Taylor expansions, often the fastest alternative to L'Hôpital
