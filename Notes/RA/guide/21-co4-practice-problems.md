---
title: "CO4 Practice Problems — IVT, Connectedness, Differentiation, MVT, Taylor, L'Hôpital, Vector Derivatives"
type: guide
co: CO4
related: [20-ivt-and-connectedness, 22-differentiation, 23-mean-value-theorems, 24-lhopital-vector-derivatives]
---

# 21. CO4 Practice Problems — IVT, Connectedness, Differentiation, MVT, Taylor, L'Hôpital

These problems cover the full span of CO4 (Lessons 20, 22–32), with emphasis on rigorous topological arguments:

- **Global theorems:** IVT, EVT, connectedness, uniform continuity (Heine-Cantor), Lipschitz/Hölder
- **Derivatives:** definition, algebraic/chain rules (Carathéodory), Darboux theorem
- **Mean Value Theorems:** Rolle, Lagrange, Cauchy
- **Taylor's theorem** with Lagrange and integral remainders
- **L'Hôpital's rule** and indeterminate forms
- **Vector-valued derivatives** and the failure of the equality form of MVT

Throughout, solutions are written at **graduate qualifying-exam** level: every step is justified, every $\varepsilon$-$\delta$ manipulation shown explicitly, every verification performed, and interpretive remarks provided.

---

## Part Z: IVT, Connectedness, and Uniform Continuity

These problems develop the topological backbone of CO4. The three pillar theorems are:

- **EVT (Weierstrass):** continuous image of compact is compact, hence attains extrema;
- **IVT (Bolzano):** continuous image of connected is connected, hence continuous images of intervals are intervals;
- **Heine-Cantor:** continuity on a compact set upgrades automatically to uniform continuity.

### Problem Z1
Let $f : [a,b] \to \mathbb{R}$ be continuous. Prove that $|f|$ is continuous on $[a,b]$ and attains its maximum.

**Solution.**

*Setup.* We must (i) prove continuity of $|f|$ by an $\varepsilon$-$\delta$ argument, and (ii) apply the Extreme Value Theorem.

*Strategy.* Use the **reverse triangle inequality** $\bigl||u| - |v|\bigr| \le |u - v|$ to transfer a continuity estimate from $f$ to $|f|$, then invoke EVT on the compact domain $[a,b]$.

*Step 1. Reverse triangle inequality.* For any $u, v \in \mathbb{R}$,
$$|u| = |u - v + v| \le |u - v| + |v| \implies |u| - |v| \le |u - v|.$$
By symmetry $|v| - |u| \le |v - u| = |u - v|$, so
$$\bigl| |u| - |v| \bigr| \le |u - v|. \qquad (\star)$$

*Step 2. Continuity of $|f|$ at an arbitrary $x_0 \in [a,b]$.* Fix $\varepsilon > 0$. By continuity of $f$ at $x_0$, there exists $\delta > 0$ such that for all $x \in [a,b]$,
$$|x - x_0| < \delta \implies |f(x) - f(x_0)| < \varepsilon.$$
Applying $(\star)$ with $u = f(x)$, $v = f(x_0)$:
$$\bigl| |f|(x) - |f|(x_0) \bigr| = \bigl| |f(x)| - |f(x_0)| \bigr| \le |f(x) - f(x_0)| < \varepsilon.$$
Thus $|f|$ is continuous at $x_0$. Since $x_0$ was arbitrary, $|f| \in C([a,b])$.

*Step 3. EVT applied to $|f|$.* The interval $[a,b]$ is compact (Heine–Borel: closed and bounded in $\mathbb{R}$). By Corollary 20.2 (EVT), the continuous function $|f|: [a,b] \to \mathbb{R}$ attains its maximum: there exists $x^* \in [a,b]$ with
$$|f|(x^*) = \sup_{x \in [a,b]} |f|(x).$$

*Sanity check.* The argument does not require $f \ge 0$; it works for arbitrary real-valued continuous $f$. Moreover $|f|$ attains its minimum too — the minimum of $|f|$ measures how close $f$ gets to $0$.

*Interpretive remark.* This problem is a template for "continuity is preserved under pointwise composition with Lipschitz operations." In general, if $g : \mathbb{R} \to \mathbb{R}$ is Lipschitz with constant $L$, then $|g \circ f(x) - g \circ f(y)| \le L|f(x) - f(y)|$, so $g \circ f$ inherits continuity from $f$. Here $g(t) = |t|$ is $1$-Lipschitz. $\blacksquare$

([[20-ivt-and-connectedness]])

---

### Problem Z2
Use IVT to prove that $x - \cos x = 0$ has a solution in $(0, \pi/2)$.

**Solution.**

*Setup.* Define $g(x) = x - \cos x$. We locate a sign change of $g$ on $[0, \pi/2]$ and apply IVT.

*Step 1. Continuity of $g$.* The identity $x \mapsto x$ and the trigonometric function $\cos$ are continuous on $\mathbb{R}$. Differences of continuous functions are continuous, so $g \in C([0, \pi/2])$.

*Step 2. Sign evaluation at endpoints.*
- At $x = 0$: $g(0) = 0 - \cos 0 = 0 - 1 = -1 < 0$.
- At $x = \pi/2$: $g(\pi/2) = \pi/2 - \cos(\pi/2) = \pi/2 - 0 = \pi/2 > 0$.

*Step 3. Apply IVT.* The target value $\gamma = 0$ lies strictly between $g(0) = -1$ and $g(\pi/2) = \pi/2$. By Corollary 20.6 (IVT), there exists $c \in (0, \pi/2)$ with $g(c) = 0$, i.e., $c = \cos c$.

*Verification of uniqueness (bonus).* $g'(x) = 1 + \sin x \ge 1 > 0$ on $(0, \pi/2)$, so $g$ is strictly increasing; the root is unique. Numerically $c \approx 0.7390851\ldots$, the **Dottie number**, a well-known fixed point of $\cos$.

*Interpretive remark.* This is the classical fixed-point root of $\cos$: iterating $x_{n+1} = \cos(x_n)$ from any initial value converges to $c$ (a contraction on $[0, 1]$). $\blacksquare$

([[20-ivt-and-connectedness]])

---

### Problem Z3
Show that $f(x) = x^2$ is uniformly continuous on every bounded interval but not on $\mathbb{R}$.

**Solution.**

*Part (a): uniform continuity on $[-M, M]$, $M > 0$.*

For $x, y \in [-M, M]$,
$$|x^2 - y^2| = |x - y| \cdot |x + y| \le |x - y| \cdot (|x| + |y|) \le 2M |x - y|. \qquad (\dagger)$$

Given $\varepsilon > 0$, set $\delta = \varepsilon / (2M)$ (independent of $x, y$). Then
$$|x - y| < \delta \implies |x^2 - y^2| \le 2M \cdot \delta = \varepsilon.$$
This is uniform continuity by definition. Inequality $(\dagger)$ in fact shows $f$ is **Lipschitz** on $[-M, M]$ with constant $2M$.

*Part (b): failure on $\mathbb{R}$ — sequential argument.*

Assume for contradiction that $f$ is uniformly continuous on $\mathbb{R}$. Pick $\varepsilon_0 = 1$. There would exist $\delta > 0$ such that
$$|x - y| < \delta \implies |x^2 - y^2| < 1 \quad \text{for all } x, y \in \mathbb{R}.$$

Now choose the sequences
$$x_n = n, \qquad y_n = n + \tfrac{1}{n}.$$
Then $|x_n - y_n| = 1/n \to 0$, so for all large $n$, $|x_n - y_n| < \delta$. However,
$$|x_n^2 - y_n^2| = \left| n^2 - \bigl(n + \tfrac{1}{n}\bigr)^2 \right| = \left| -2 - \tfrac{1}{n^2} \right| = 2 + \tfrac{1}{n^2} \ge 2 > 1.$$

This contradicts the supposed uniform continuity. $\Rightarrow\Leftarrow$.

*Sanity check.* The counterexample uses points going to infinity. This is the geometric essence: the slope of $x^2$ grows linearly, so no fixed horizontal window $\delta$ can control the vertical spread.

*Interpretive remark.* A differentiable function on an interval is uniformly continuous iff its derivative is bounded (a sufficient condition is obvious by the MVT; the converse has qualifications). Here $f'(x) = 2x$ is unbounded on $\mathbb{R}$ but bounded by $2M$ on $[-M, M]$ — consistent with our findings. $\blacksquare$

([[20-ivt-and-connectedness]])

---

### Problem Z4
Let $f : \mathbb{R} \to \mathbb{R}$ be continuous with $\lim_{x \to \pm\infty} f(x) = 0$. Show that $f$ attains either a maximum or a minimum on $\mathbb{R}$ (possibly both).

**Solution.**

*Setup.* If $f \equiv 0$, both max and min are $0$, attained everywhere; done. Otherwise, some $x_0 \in \mathbb{R}$ has $f(x_0) \ne 0$. WLOG $f(x_0) > 0$ (else apply the argument below to $-f$, getting the minimum of $f$).

*Step 1. Concentrate the "relevant mass" on a compact set.* Let $\alpha = f(x_0)/2 > 0$. Since $f(x) \to 0$ as $|x| \to \infty$, there exists $M > 0$ (with $M > |x_0|$) such that
$$|x| > M \implies |f(x)| < \alpha = f(x_0)/2. \qquad (\ast)$$

*Step 2. Apply EVT on $[-M, M]$.* $f$ is continuous on the compact set $[-M, M]$ (which contains $x_0$). By EVT (Corollary 20.2), $f$ attains its max there: there exists $x^* \in [-M, M]$ with
$$f(x^*) = \max_{x \in [-M, M]} f(x) \ge f(x_0) > 0.$$

*Step 3. $f(x^*)$ is the global max.* For $|x| \le M$, $f(x) \le f(x^*)$ by definition. For $|x| > M$, by $(\ast)$, $f(x) < f(x_0)/2 \le f(x^*)/2 < f(x^*)$. Hence $f(x^*) \ge f(x)$ for all $x \in \mathbb{R}$.

*Sanity check on signs.* We used $f(x^*) \ge f(x_0) > 0$ so that $f(x^*)/2 < f(x^*)$; this inequality is strict and required $f(x_0) > 0$. If instead $f(x_0) < 0$, the argument runs with $-f$, producing a global min.

*Interpretive remark.* This is a "vanishing-at-infinity $\Rightarrow$ compactly attained extremum" principle. It generalizes: if $f : \mathbb{R}^n \to \mathbb{R}$ is continuous and tends to $0$ at infinity, then $f$ attains global extrema. It also generalizes to the space $C_0(\mathbb{R}^n)$ of continuous functions vanishing at infinity — the natural function space for scattering theory. $\blacksquare$

([[20-ivt-and-connectedness]])

---

### Problem Z5
Let $f : [0, \infty) \to \mathbb{R}$ be continuous with $\lim_{x \to \infty} f(x) = L$. Show $f$ is uniformly continuous on $[0, \infty)$.

**Solution.**

*Setup.* We must produce, for any $\varepsilon > 0$, a single $\delta > 0$ controlling $|f(x) - f(y)|$ over all of $[0, \infty)$. The proof combines **Heine-Cantor on a large compact interval** with the **Cauchy-at-infinity** estimate from the limit $L$.

*Step 1. Tail control via the limit.* Fix $\varepsilon > 0$. By the definition of $\lim_{x \to \infty} f(x) = L$, there exists $N > 0$ such that
$$x \ge N \implies |f(x) - L| < \varepsilon/2.$$
Consequently, for any $x, y \ge N$,
$$|f(x) - f(y)| \le |f(x) - L| + |L - f(y)| < \varepsilon/2 + \varepsilon/2 = \varepsilon. \qquad (\mathrm{T})$$
**Any** $\delta > 0$ works on the tail $[N, \infty)$ — no continuity modulus needed.

*Step 2. Compact-set control via Heine-Cantor.* Consider $K := [0, N+1]$. This is closed and bounded, hence compact. $f|_K$ is continuous, so by Heine-Cantor (Theorem 20.8) there exists $\delta_1 > 0$ such that
$$x, y \in K, \ |x - y| < \delta_1 \implies |f(x) - f(y)| < \varepsilon. \qquad (\mathrm{C})$$

*Step 3. Combine.* Set $\delta := \min\{\delta_1, \ 1\}$. Suppose $x, y \in [0, \infty)$ with $|x - y| < \delta$.
- **Case A: both $x, y \le N + 1$.** Then $x, y \in K$ and $|x - y| < \delta \le \delta_1$; by (C), $|f(x) - f(y)| < \varepsilon$. ✓
- **Case B: both $x, y \ge N$.** By (T), $|f(x) - f(y)| < \varepsilon$. ✓
- **Case C: one $< N$ and the other $> N + 1$.** Then $|x - y| > 1 \ge \delta$ — impossible given the hypothesis. So this case does not arise.

Since Cases A and B together cover every possibility (note: if one point lies in $[N, N+1]$ and the other in $[0, N+1]$, both are in $K$, Case A; if one lies in $[N, N+1]$ and the other in $[N, \infty)$, both are in $[N, \infty)$, Case B), we have $|f(x) - f(y)| < \varepsilon$ in all cases.

*Interpretive remark.* This pattern — compact interior + asymptotic regularity $\Rightarrow$ uniform continuity — is ubiquitous. It explains, for example, why probability densities that vanish at infinity and are continuous on the support are uniformly continuous, ensuring that Riemann sums converge to integrals uniformly in the partition mesh on the whole line. $\blacksquare$

([[20-ivt-and-connectedness]])

---

### Problem Z6
Every odd-degree real polynomial has a real root.

**Solution.**

*Setup.* Let $p(x) = a_n x^n + a_{n-1} x^{n-1} + \cdots + a_0 \in \mathbb{R}[x]$ with $a_n \ne 0$, $n$ odd. WLOG $a_n > 0$ (else consider $-p$, whose roots are the same).

*Step 1. Asymptotic behaviour.* Write
$$p(x) = a_n x^n \left(1 + \frac{a_{n-1}}{a_n x} + \cdots + \frac{a_0}{a_n x^n}\right).$$
As $|x| \to \infty$, the bracketed factor $\to 1$. Concretely, pick $R > 0$ so large that
$$|x| \ge R \implies \left| \frac{a_{n-1}}{a_n x} + \cdots + \frac{a_0}{a_n x^n} \right| < \tfrac{1}{2},$$
so the bracket lies in $(1/2, 3/2)$.

*Step 2. Sign at $\pm R$.* Because $n$ is odd:
- $x = +R$: $p(R) \ge a_n R^n \cdot (1/2) > 0$ (since $a_n, R > 0$ and $R^n > 0$).
- $x = -R$: $p(-R) \le a_n (-R)^n \cdot (1/2) = -a_n R^n / 2 < 0$ (since $(-R)^n = -R^n$ for odd $n$).

*Step 3. Apply IVT.* $p$ is continuous on $[-R, R]$ (polynomials are continuous on $\mathbb{R}$). With $p(-R) < 0 < p(R)$, IVT (Corollary 20.6) yields $c \in (-R, R)$ with $p(c) = 0$.

*Verification.* Does the method need $n$ odd? Crucially, yes: for even $n$, $(-R)^n = R^n$ and the two endpoint signs agree, blocking IVT. This is consistent with $x^2 + 1$ having no real root.

*Interpretive remark.* This is the most elementary instance of the **fundamental theorem of algebra** restricted to real coefficients: every real polynomial factors over $\mathbb{R}$ into linear and irreducible quadratic factors; counting dimensions, every odd-degree polynomial must have at least one linear factor. The IVT proof is purely analytic; algebraic proofs exist too (via the intermediate value theorem applied to the discriminant). $\blacksquare$

([[20-ivt-and-connectedness]])

---

### Problem Z7
Prove that $f(x) = \sqrt{x}$ is uniformly continuous on $[0, \infty)$ but not Lipschitz.

**Solution.**

*Part (a): uniform continuity.*

*Key inequality.* For $x \ge y \ge 0$,
$$\sqrt{x} - \sqrt{y} \le \sqrt{x - y}. \qquad (\sharp)$$

*Proof of $(\sharp)$.* Both sides are non-negative. Square:
$$(\sqrt{x} - \sqrt{y})^2 = x - 2\sqrt{xy} + y \le x - y \iff 2y \le 2\sqrt{xy} \iff y \le \sqrt{xy} \iff y^2 \le xy \iff y \le x,$$
which holds by assumption. Hence $(\sharp)$ follows (both sides non-negative, squares ordered).

By symmetry, for all $x, y \ge 0$: $|\sqrt{x} - \sqrt{y}| \le \sqrt{|x - y|}$. Given $\varepsilon > 0$, set $\delta := \varepsilon^2$. Then
$$|x - y| < \delta \implies |\sqrt{x} - \sqrt{y}| < \sqrt{\delta} = \varepsilon.$$
So $f$ is uniformly continuous (in fact, Hölder continuous of exponent $1/2$).

*Part (b): failure of Lipschitz.*

If $f$ were Lipschitz with constant $L$, then for every $x > 0$:
$$|f(x) - f(0)| = \sqrt{x} \le L \cdot x \implies \frac{1}{\sqrt{x}} \le L.$$
But $1/\sqrt{x} \to \infty$ as $x \to 0^+$, a contradiction. Hence $f$ is not Lipschitz on $[0, \infty)$.

*Sanity check.* Geometrically, $f'(x) = 1/(2\sqrt{x})$ blows up at $0$, so the tangent slope is unbounded — consistent with $f$ not being Lipschitz.

*Interpretive remark.* $\sqrt{x}$ is the prototype **Hölder-but-not-Lipschitz** function. Such functions are central in PDE theory (Hölder–Zygmund spaces $C^{0,\alpha}$) and stochastic analysis (Brownian motion sample paths are almost-surely $\alpha$-Hölder for every $\alpha < 1/2$, but not for $\alpha = 1/2$, and never Lipschitz). $\blacksquare$

([[20-ivt-and-connectedness]])

---

### Problem Z8
Let $f: (0, 1] \to \mathbb{R}$ be continuous. Show that $f$ extends continuously to $[0,1]$ if and only if $f$ is uniformly continuous on $(0, 1]$.

**Solution.**

*(\(\Rightarrow\)).* Assume $\tilde{f}: [0,1] \to \mathbb{R}$ is a continuous extension. Then $\tilde{f}$ is continuous on the compact $[0,1]$, hence uniformly continuous by Heine-Cantor. Restricting the modulus $\delta(\varepsilon)$ to $(0,1]$ gives uniform continuity of $f$.

*(\(\Leftarrow\)).* Assume $f$ is uniformly continuous on $(0,1]$. We construct the extension at $0$ by defining $f(0) := \lim_{x \to 0^+} f(x)$, after showing the limit exists.

*Step 1. Cauchy sequences go to Cauchy sequences.* Fix $\varepsilon > 0$. By uniform continuity, $\exists \delta > 0$ such that $x, y \in (0,1]$, $|x-y| < \delta \Rightarrow |f(x) - f(y)| < \varepsilon$. If $(x_n) \subset (0,1]$ is Cauchy, then for $n, m$ large $|x_n - x_m| < \delta$, hence $|f(x_n) - f(x_m)| < \varepsilon$. Thus $(f(x_n))$ is Cauchy in $\mathbb{R}$, and by completeness converges.

*Step 2. Independence of sequence.* Let $x_n \to 0^+$ and $y_n \to 0^+$. Consider the interleaved sequence $z_1 = x_1, z_2 = y_1, z_3 = x_2, z_4 = y_2, \ldots$ which also tends to $0$ (hence is Cauchy), so $f(z_n)$ converges. Its subsequences $f(x_n)$ and $f(y_n)$ must converge to the same limit.

*Step 3. Define $L := \lim_{x \to 0^+} f(x)$.* This is well-defined by Steps 1–2. Set $\tilde{f}(0) = L$ and $\tilde{f}(x) = f(x)$ for $x \in (0,1]$.

*Step 4. Continuity of $\tilde{f}$ at $0$.* Given $\varepsilon > 0$, by the uniform-continuity modulus there exists $\delta > 0$ with $x, y \in (0,1]$, $|x - y| < \delta \Rightarrow |f(x) - f(y)| < \varepsilon/2$. Pick any $y \in (0, \delta)$ with $|f(y) - L| < \varepsilon/2$ (possible since $f(y) \to L$). For $0 < x < \delta/2$, also $|x - y| < \delta$ (taking $y$ small enough), so $|f(x) - L| \le |f(x) - f(y)| + |f(y) - L| < \varepsilon$. Hence $\lim_{x \to 0^+} \tilde{f}(x) = L = \tilde{f}(0)$, so $\tilde{f}$ is continuous at $0$. Continuity on $(0,1]$ is inherited from $f$.

*Interpretive remark.* This is the fundamental fact behind the **completion** construction: uniformly continuous functions on a dense subset of a metric space extend uniquely and continuously to the whole space. Here $(0,1]$ is dense in $[0,1]$; the uniform modulus is the precise tool carrying the extension across the boundary point. $\blacksquare$

([[20-ivt-and-connectedness]])

---

## Part A: Derivatives from Definition

### Problem A1
Use the definition of the derivative to show $\dfrac{d}{dx}(x^n) = n x^{n-1}$ for every $n \in \mathbb{N}$.

**Solution.**

*Setup.* We compute
$$\lim_{h \to 0} \frac{(x+h)^n - x^n}{h}$$
directly using the binomial theorem and extract the linear coefficient.

*Step 1. Binomial expansion.* For each $n \in \mathbb{N}$ and $h \ne 0$:
$$(x + h)^n = \sum_{k=0}^n \binom{n}{k} x^{n-k} h^k = x^n + \binom{n}{1} x^{n-1} h + \sum_{k=2}^n \binom{n}{k} x^{n-k} h^k.$$
The $k=0$ term is $x^n$, which cancels in the numerator.

*Step 2. Form the difference quotient.*
$$\frac{(x+h)^n - x^n}{h} = \frac{1}{h} \left[ \binom{n}{1} x^{n-1} h + \sum_{k=2}^n \binom{n}{k} x^{n-k} h^k \right] = n x^{n-1} + \sum_{k=2}^n \binom{n}{k} x^{n-k} h^{k-1}. \qquad (\ast)$$
Here $\binom{n}{1} = n$. Every term in the residual sum has a factor $h^{k-1}$ with $k - 1 \ge 1$, so tends to $0$ with $h$.

*Step 3. Take the limit.* The residual sum is a polynomial in $h$ with constant term $0$, hence continuous with value $0$ at $h = 0$. Taking $\lim_{h \to 0}$ in $(\ast)$:
$$\lim_{h \to 0} \frac{(x+h)^n - x^n}{h} = n x^{n-1} + 0 = n x^{n-1}.$$

*Verification by special cases.*
- $n = 1$: $\frac{(x+h) - x}{h} = 1 = 1 \cdot x^0$. ✓
- $n = 2$: $\frac{(x+h)^2 - x^2}{h} = \frac{2xh + h^2}{h} = 2x + h \to 2x$. ✓
- $n = 3$: $\frac{(x+h)^3 - x^3}{h} = 3x^2 + 3xh + h^2 \to 3x^2$. ✓

*Interpretive remark.* The binomial theorem reduces a differentiation problem to arithmetic, because polynomials are "analytic" in the strongest sense: the derivative at any point depends polynomially on $x$ and on $h$, and taking $h \to 0$ is a bookkeeping operation. The same mechanism underlies the **formal derivative** in algebra, definable in any ring without a limit concept. $\blacksquare$

([[22-differentiation]])

---

### Problem A2
Show that $f(x) = x|x|$ is differentiable at $0$ and compute $f'(0)$.

**Solution.**

*Setup.* The function is piecewise:
$$f(x) = \begin{cases} x \cdot x = x^2, & x \ge 0, \\ x \cdot (-x) = -x^2, & x < 0. \end{cases}$$
We use the definition of derivative at $0$ directly.

*Step 1. Difference quotient at $0$.* For $h \ne 0$,
$$\frac{f(h) - f(0)}{h} = \frac{h |h| - 0}{h} = |h|.$$
(We used $f(0) = 0 \cdot 0 = 0$.)

*Step 2. Take the limit.* $\lim_{h \to 0} |h| = 0$. Hence the two-sided limit exists and
$$f'(0) = 0.$$

*Step 3. Compute $f'$ elsewhere and examine regularity.*
- For $x > 0$: $f(x) = x^2$, $f'(x) = 2x$.
- For $x < 0$: $f(x) = -x^2$, $f'(x) = -2x$.

Combining with $f'(0) = 0$: $f'(x) = 2|x|$ for all $x \in \mathbb{R}$.

*Verification of $C^1$.* $|x|$ is continuous on $\mathbb{R}$, so $f' = 2|x|$ is continuous. Hence $f \in C^1(\mathbb{R})$.

*Does $f \in C^2(\mathbb{R})$?* $f''(x) = 2 \cdot \operatorname{sgn}(x)$ for $x \ne 0$, which has a jump discontinuity at $0$: $f''(0^+) = 2$, $f''(0^-) = -2$. So $f'$ is not differentiable at $0$, and $f \notin C^2$.

*Interpretive remark.* This is the cleanest example of a function in $C^1 \setminus C^2$: it is algebraic, elementary, and the non-smoothness is concentrated at a single point. It is the building block for constructing counterexamples throughout single-variable analysis (e.g., Darboux-discontinuous second derivatives). $\blacksquare$

([[22-differentiation]])

---

### Problem A3
Is $f(x) = |x|$ differentiable at $0$? Justify.

**Solution.**

*Setup.* Compute the one-sided limits of the difference quotient at $0$.

*Step 1. Right-hand derivative.*
$$f'_+(0) = \lim_{h \to 0^+} \frac{|h| - 0}{h} = \lim_{h \to 0^+} \frac{h}{h} = 1.$$

*Step 2. Left-hand derivative.*
$$f'_-(0) = \lim_{h \to 0^-} \frac{|h| - 0}{h} = \lim_{h \to 0^-} \frac{-h}{h} = -1.$$

*Step 3. Conclusion.* Since $f'_+(0) = 1 \ne -1 = f'_-(0)$, the two-sided limit $\lim_{h \to 0} (|h| - 0)/h$ does not exist. Hence $f$ is **not differentiable at $0$**.

*Sanity check.* A function is differentiable iff its one-sided derivatives exist and are equal. Geometrically, $y = |x|$ has a corner (a "kink") at $0$, so no single tangent line.

*Interpretive remark.* This is the most basic example of a function that is continuous (in fact Lipschitz with constant $1$) but not differentiable at a point. Weierstrass's construction of a nowhere-differentiable continuous function $\sum 2^{-n}\cos(3^n \pi x)$ is, in a sense, "infinitely many kinks at every scale." $\blacksquare$

([[22-differentiation]])

---

### Problem A4
Let $f(x) = x^2 \sin(1/x)$ for $x \ne 0$ and $f(0) = 0$. Is $f$ differentiable at $0$?

**Solution.**

*Setup.* Apply the definition directly, using boundedness of $\sin$.

*Step 1. Difference quotient.*
$$\frac{f(h) - f(0)}{h} = \frac{h^2 \sin(1/h)}{h} = h \sin(1/h) \quad (h \ne 0).$$

*Step 2. Squeeze.* For $h \ne 0$, $|\sin(1/h)| \le 1$, so
$$0 \le |h \sin(1/h)| \le |h|.$$
As $h \to 0$, $|h| \to 0$, hence by the squeeze theorem, $h \sin(1/h) \to 0$.

*Step 3. Conclusion.* $f'(0) = 0$.

*Step 4. Examine regularity.* For $x \ne 0$, by the product and chain rules:
$$f'(x) = 2x \sin(1/x) + x^2 \cos(1/x) \cdot (-1/x^2) = 2x \sin(1/x) - \cos(1/x).$$

As $x \to 0$: $2x \sin(1/x) \to 0$ (squeezed by $2|x|$), but $\cos(1/x)$ oscillates between $-1$ and $1$ without limit. Hence $\lim_{x \to 0} f'(x)$ does not exist, so $f'$ is **discontinuous at $0$**.

*Sanity check.* $f$ is differentiable everywhere (including at $0$), but $f \notin C^1$ because $f'$ has an essential (oscillatory) discontinuity at $0$. This shows existence of $f'(0)$ does not imply continuity of $f'$ there.

*Interpretive remark.* This is the canonical example of a differentiable function whose derivative is not continuous. It is precisely the counterexample showing that $C^1$ is strictly smaller than the class of differentiable-everywhere functions. Moreover, by **Darboux's theorem** (Theorem 22.X), $f'$ still satisfies the intermediate-value property — its discontinuities must be oscillatory, never jump-type. $\blacksquare$

([[22-differentiation]])

---

## Part B: Algebraic Rules and Chain Rule

### Problem B1
Compute $\dfrac{d}{dx}\left[\sin(e^{x^2})\right]$.

**Solution.**

*Setup.* This is a triple composition $f(g(h(x)))$ with $h(x) = x^2$, $g(u) = e^u$, $f(v) = \sin v$. Apply the chain rule layer by layer.

*Step 1. Layerwise derivatives.*
- $h'(x) = 2x$.
- $g'(u) = e^u$; at $u = h(x) = x^2$: $g'(h(x)) = e^{x^2}$.
- $f'(v) = \cos v$; at $v = g(h(x)) = e^{x^2}$: $f'(g(h(x))) = \cos(e^{x^2})$.

*Step 2. Chain rule.*
$$\frac{d}{dx}\sin(e^{x^2}) = f'(g(h(x))) \cdot g'(h(x)) \cdot h'(x) = \cos(e^{x^2}) \cdot e^{x^2} \cdot 2x = 2x\, e^{x^2} \cos(e^{x^2}).$$

*Verification (sanity).* At $x = 0$: derivative $= 0 \cdot 1 \cdot 1 = 0$. From the definition: $\sin(e^{x^2}) - \sin(1) \approx \sin'(1) \cdot (e^{x^2} - 1) \approx \cos(1) \cdot x^2$, so the derivative at $0$ should be $0$. ✓

*Interpretive remark.* The chain rule for multi-layer composition corresponds to the **Jacobian product** in higher dimensions: $D(f \circ g \circ h) = Df \cdot Dg \cdot Dh$, a row-vector–matrix–matrix product. Carathéodory's form of the chain rule ([[22-differentiation]]) makes the algebraic content (factorising through removable singularities at the composition points) transparent. $\blacksquare$

([[22-differentiation]])

---

### Problem B2
Let $f(x) = \ln(1 + x^2)$. Find $f'(x)$ and evaluate at $x = 1$.

**Solution.**

*Setup.* Composition $f = \ln \circ u$ with $u(x) = 1 + x^2$.

*Step 1. Chain rule.* $f'(x) = \dfrac{1}{u(x)} \cdot u'(x) = \dfrac{1}{1 + x^2} \cdot 2x = \dfrac{2x}{1 + x^2}$.

*Step 2. Evaluate at $x = 1$.* $f'(1) = \dfrac{2 \cdot 1}{1 + 1^2} = \dfrac{2}{2} = 1$.

*Verification.* From the Taylor series $\ln(1 + u) = u - u^2/2 + O(u^3)$ near $u = 0$: near $x = 0$, $f(x) = x^2 - x^4/2 + O(x^6)$, so $f'(x) = 2x - 2x^3 + O(x^5)$, which matches $2x/(1 + x^2) = 2x(1 - x^2 + x^4 - \cdots) = 2x - 2x^3 + 2x^5 - \cdots$. ✓

*Interpretive remark.* $f(x) = \ln(1 + x^2)$ is even, $f' = 2x/(1+x^2)$ is odd, $f'' = 2(1-x^2)/(1+x^2)^2$ vanishes at $\pm 1$ — those are the inflection points. The function is the potential of $\tanh$-like behaviour; it's $C^\infty$ globally. $\blacksquare$

([[22-differentiation]])

---

### Problem B3
Compute $\dfrac{d}{dx}x^x$ for $x > 0$.

**Solution.**

*Setup.* Use the identity $x^x = e^{x \ln x}$ and apply the chain rule. (One cannot use the power rule directly because both base and exponent vary with $x$.)

*Step 1. Rewrite.*
$$x^x = e^{x \ln x}.$$
For $x > 0$, $\ln x$ is well-defined and differentiable, so $x \ln x$ is differentiable with
$$\frac{d}{dx}(x \ln x) = 1 \cdot \ln x + x \cdot \frac{1}{x} = \ln x + 1.$$

*Step 2. Chain rule through exp.*
$$\frac{d}{dx}e^{x \ln x} = e^{x \ln x} \cdot (\ln x + 1) = x^x (\ln x + 1).$$

*Verification at $x = 1$.* $\frac{d}{dx}x^x \big|_{x=1} = 1^1 \cdot (\ln 1 + 1) = 1 \cdot 1 = 1$. From first principles: $f(x) = x^x \approx 1 + (\ln 1 + 1)(x-1) + O((x-1)^2)$ near $x = 1$. ✓

*Logarithmic differentiation alternative.* Starting from $\ln f = x \ln x$, differentiate implicitly: $f'/f = \ln x + 1$, hence $f' = f (\ln x + 1) = x^x(\ln x + 1)$. Same answer.

*Interpretive remark.* The function $x^x$ achieves its minimum on $(0, \infty)$ at $x = 1/e$ (where $\ln x + 1 = 0$), with value $(1/e)^{1/e} \approx 0.6922$. $\blacksquare$

([[22-differentiation]])

---

### Problem B4
Let $y = \arctan(\tan x)$. Find $dy/dx$ on $(-\pi/2, \pi/2)$.

**Solution.**

*Setup.* On $(-\pi/2, \pi/2)$, $\tan$ is a bijection onto $\mathbb{R}$, and $\arctan$ is its left-inverse; so $\arctan(\tan x) = x$ identically there. We verify this in two independent ways.

*Method 1: Direct identification.* On $(-\pi/2, \pi/2)$, $\arctan \circ \tan = \operatorname{id}$, so $y = x$, and $dy/dx = 1$.

*Method 2: Chain rule computation.* Using $(\arctan u)' = 1/(1 + u^2)$ and $(\tan x)' = \sec^2 x$,
$$\frac{dy}{dx} = \frac{1}{1 + \tan^2 x} \cdot \sec^2 x = \frac{1}{\sec^2 x} \cdot \sec^2 x = 1.$$
(Using the Pythagorean identity $1 + \tan^2 x = \sec^2 x$.)

Both methods agree: $dy/dx = 1$. ✓

*Outside $(-\pi/2, \pi/2)$, the answer differs.* For example, on $(\pi/2, 3\pi/2)$, $\arctan(\tan x) = x - \pi$, and the derivative is still $1$ on that interval, but as a map $\mathbb{R} \to \mathbb{R}$ with the "principal branch" convention, $\arctan(\tan x)$ is a sawtooth, discontinuous at $x = (k + 1/2)\pi$.

*Interpretive remark.* This problem tests whether one recognizes that $\arctan(\tan x) \ne x$ globally — a common pitfall. The chain rule correctly yields derivative $1$ locally on intervals where $\tan$ is a bijection onto $\mathbb{R}$, but the function identification $\arctan \circ \tan = \operatorname{id}$ is local, not global. $\blacksquare$

([[22-differentiation]])

---

## Part C: MVT and Applications

### Problem C1
Use the MVT to prove $\sin x < x$ for all $x > 0$.

**Solution.**

*Setup.* Define $g(x) = x - \sin x$. We show $g(x) > 0$ for $x > 0$ via monotonicity.

*Step 1. Compute $g(0)$ and $g'$.*
$$g(0) = 0 - \sin 0 = 0, \qquad g'(x) = 1 - \cos x.$$

*Step 2. Sign of $g'$.* Since $\cos x \le 1$ with equality only at $x = 2\pi k$, $g'(x) \ge 0$ on $\mathbb{R}$, with $g'(x) = 0$ only on the discrete set $\{2\pi k : k \in \mathbb{Z}\}$.

*Step 3. Monotonicity via MVT.* Let $x > 0$. Apply the MVT (Lagrange form) to $g$ on $[0, x]$: there exists $\xi \in (0, x)$ with
$$g(x) - g(0) = g'(\xi) \cdot (x - 0) = (1 - \cos \xi) \cdot x.$$
Hence $g(x) = (1 - \cos \xi) \cdot x \ge 0$, with equality iff $\cos \xi = 1$, i.e., $\xi = 2\pi k$ for some $k \in \mathbb{Z}$ with $\xi \in (0, x)$.

*Step 4. Strict inequality for $x > 0$.* If $x \le 2\pi$, then $(0, x) \subset (0, 2\pi]$ and the only candidate is $\xi = 2\pi$, which requires $x > 2\pi$, a contradiction — so $\xi \ne 2\pi k$ in $(0, x)$ and $g(x) > 0$. If $x > 2\pi$, we argue differently: integrate (really, apply MVT piecewise) — but an easier finish: $g$ is non-decreasing (by $g' \ge 0$) and is strictly increasing wherever $g' > 0$, which holds a.e. Specifically on $[0, \pi]$, $g'(x) = 1 - \cos x \ge 1 - \cos \pi = 2 > 0$ on $(0, \pi)$ — so $g$ is strictly increasing on $[0, \pi]$, giving $g(x) > g(0) = 0$ for $x \in (0, \pi]$. For $x \ge \pi$, $g(x) \ge g(\pi) = \pi > 0$ directly.

*Summary.* $g(x) > 0$ for all $x > 0$, i.e., $\sin x < x$.

*Verification at small $x$.* For $x > 0$ tiny, Taylor: $\sin x = x - x^3/6 + O(x^5)$, so $g(x) = x^3/6 + O(x^5) > 0$. ✓

*Interpretive remark.* This is the archetype of "prove an inequality by reducing to a sign analysis of the derivative." The same technique proves $\cos x > 1 - x^2/2$ (Problem D3), $e^x > 1 + x$ for $x > 0$, $\ln(1 + x) < x$, and countless others. $\blacksquare$

([[23-mean-value-theorems]])

---

### Problem C2
Show that $|e^x - 1 - x| \le \dfrac{x^2}{2} e^{|x|}$ for all $x \in \mathbb{R}$.

**Solution.**

*Setup.* Let $g(x) = e^x - 1 - x$. We estimate $g$ using Taylor's theorem with Lagrange remainder.

*Step 1. Derivatives of $g$.*
$$g(0) = e^0 - 1 - 0 = 0, \qquad g'(x) = e^x - 1, \quad g'(0) = 0, \qquad g''(x) = e^x.$$

*Step 2. Taylor's theorem.* Apply Taylor's theorem centred at $0$ with degree $n = 1$: for every $x \in \mathbb{R}$, there exists $\xi$ strictly between $0$ and $x$ (or $\xi = 0$ if $x = 0$) such that
$$g(x) = g(0) + g'(0) \cdot x + \frac{g''(\xi)}{2!} x^2 = 0 + 0 + \frac{e^\xi}{2} x^2 = \frac{e^\xi}{2} x^2.$$

*Step 3. Bound $e^\xi$.* Since $\xi$ lies between $0$ and $x$: $|\xi| \le |x|$, hence $\xi \le |x|$, hence $e^\xi \le e^{|x|}$ (exp is increasing).

*Step 4. Combine.*
$$|g(x)| = \left| \frac{e^\xi}{2} x^2 \right| = \frac{e^\xi}{2} x^2 \le \frac{e^{|x|}}{2} x^2 = \frac{x^2 \, e^{|x|}}{2}.$$

*Verification at $x = 0$.* LHS $= 0$, RHS $= 0$. ✓
*Verification at small $x$.* $e^x - 1 - x = x^2/2 + x^3/6 + O(x^4)$, so LHS $\approx x^2/2$, RHS $\approx (x^2/2)(1 + |x|) = x^2/2 + x^2 |x|/2$. RHS $\ge$ LHS for small $x$. ✓
*Verification at $x > 0$ large.* LHS $\sim e^x$, RHS $= x^2 e^x / 2 \gg e^x$. ✓

*Interpretive remark.* This is the prototype "second-order Taylor remainder estimate." It is the key step in many convergence rate analyses (Newton's method quadratic convergence, central limit theorem error bounds, moment generating functions). $\blacksquare$

([[23-mean-value-theorems]])

---

### Problem C3
Let $f$ be differentiable on $\mathbb{R}$ with $f(0) = 0$ and $|f'(x)| \le 1$ for all $x$. Show $|f(x)| \le |x|$ for all $x$.

**Solution.**

*Setup.* Apply the MVT (Lagrange) to $f$ on $[0, x]$ (or $[x, 0]$ if $x < 0$).

*Case A: $x > 0$.* MVT on $[0, x]$: there exists $\xi \in (0, x)$ with
$$f(x) - f(0) = f'(\xi)(x - 0), \quad \text{i.e., } f(x) = f'(\xi) \cdot x.$$
Hence $|f(x)| = |f'(\xi)| \cdot |x| \le 1 \cdot |x| = |x|$. ✓

*Case B: $x < 0$.* MVT on $[x, 0]$: there exists $\xi \in (x, 0)$ with
$$f(0) - f(x) = f'(\xi)(0 - x), \quad \text{i.e., } -f(x) = -f'(\xi) \cdot x \implies f(x) = f'(\xi) \cdot x.$$
Hence $|f(x)| = |f'(\xi)| \cdot |x| \le |x|$. ✓

*Case C: $x = 0$.* $|f(0)| = 0 = |0|$. ✓

*Sanity check: sharpness.* The bound is attained by $f(x) = x$ (with $f'(x) = 1$): $|f(x)| = |x|$. So the constant $1$ in "$|f(x)| \le |x|$" cannot be reduced.

*Interpretive remark.* This is the **$1$-Lipschitz characterization**: $f$ is $1$-Lipschitz with $f(0) = 0$ iff $|f(x)| \le |x|$ and $|f(x) - f(y)| \le |x - y|$. The latter follows from the same MVT argument: $f(x) - f(y) = f'(\xi)(x - y)$, $|f(x) - f(y)| \le |x - y|$. This is the starting point for Banach's fixed-point theorem on complete metric spaces. $\blacksquare$

([[23-mean-value-theorems]])

---

### Problem C4
Use Rolle's theorem to show: a real polynomial of degree $n$ has at most $n$ real roots.

**Solution.**

*Setup.* We proceed by **strong induction on $n$**.

*Base case $n = 0$.* A nonzero constant polynomial $p \equiv c \ne 0$ has no real roots. $0 \le 0$. ✓

*Inductive step.* Suppose the claim holds for all polynomials of degree $< n$. Let $p$ be a polynomial of degree $n \ge 1$. We show $p$ has at most $n$ real roots (counted without multiplicity).

*Assume, for contradiction,* $p$ has $n + 1$ (or more) distinct real roots. Let them be
$$r_1 < r_2 < \cdots < r_{n+1}.$$

*Apply Rolle's theorem to each interval $[r_i, r_{i+1}]$.* On each such interval, $p$ is continuous (polynomials are continuous) and differentiable (polynomials are smooth), and $p(r_i) = p(r_{i+1}) = 0$. By Rolle's theorem (Theorem 23.X), there exists $s_i \in (r_i, r_{i+1})$ with $p'(s_i) = 0$, for $i = 1, 2, \ldots, n$.

*Count $s_i$'s.* We get $n$ distinct values $s_1 < s_2 < \cdots < s_n$ (distinct because they lie in disjoint open intervals). So $p'$ has at least $n$ real roots.

*Contradict inductive hypothesis.* $\deg p' = n - 1$. By the inductive hypothesis applied to $p'$ (of degree $n - 1$), $p'$ has at most $n - 1$ real roots. But we found $n$. $\Rightarrow\Leftarrow$

*Conclusion.* $p$ has at most $n$ real roots.

*Sanity check: sharpness.* $p(x) = (x - 1)(x - 2) \cdots (x - n)$ has exactly $n$ real roots. So the bound is attained.

*Interpretive remark.* This is the real-analytic proof; algebraically, one invokes the factor theorem ($p(r) = 0 \iff (x - r) \mid p(x)$) and the multiplicative structure of $\mathbb{R}[x]$ as a UFD. The Rolle approach is notable for its generality: it works for $C^n$ functions with suitable zero patterns, not just polynomials (cf. the **Markov brothers' inequality** and **Chebyshev alternation**). $\blacksquare$

([[23-mean-value-theorems]])

---

## Part D: Taylor's Theorem

### Problem D1
Write the Maclaurin expansion of $\ln(1+x)$ up to degree $4$ with Lagrange remainder.

**Solution.**

*Setup.* Let $f(x) = \ln(1 + x)$, defined for $x > -1$. Compute $f^{(k)}(0)$ for $k = 0, 1, 2, 3, 4$ and the remainder $R_4(x)$.

*Step 1. Compute derivatives.*
$$f(x) = \ln(1+x), \quad f'(x) = (1+x)^{-1}, \quad f''(x) = -(1+x)^{-2}, \quad f'''(x) = 2(1+x)^{-3}, \quad f^{(4)}(x) = -6(1+x)^{-4}, \quad f^{(5)}(x) = 24(1+x)^{-5}.$$

By induction, for $k \ge 1$:
$$f^{(k)}(x) = (-1)^{k-1}(k-1)!(1+x)^{-k}.$$

*Step 2. Evaluate at $0$.*
$$f(0) = 0, \quad f^{(k)}(0) = (-1)^{k-1}(k-1)! \text{ for } k \ge 1.$$

*Step 3. Taylor polynomial of degree $4$.*
$$T_4(x) = \sum_{k=0}^4 \frac{f^{(k)}(0)}{k!} x^k = 0 + \frac{x}{1} - \frac{x^2}{2} + \frac{2 x^3}{3!} - \frac{6 x^4}{4!} = x - \frac{x^2}{2} + \frac{x^3}{3} - \frac{x^4}{4}.$$

Check the signs: $(-1)^{k-1}(k-1)!/k! = (-1)^{k-1}/k$. ✓

*Step 4. Lagrange remainder.*
$$R_4(x) = \frac{f^{(5)}(\xi)}{5!} x^5 = \frac{24 (1+\xi)^{-5}}{120} x^5 = \frac{x^5}{5 (1+\xi)^5},$$
where $\xi$ is strictly between $0$ and $x$ (in particular, $1 + \xi > 0$, so the denominator is positive).

*Full statement.* For every $x > -1$, there exists $\xi$ between $0$ and $x$ such that
$$\ln(1+x) = x - \frac{x^2}{2} + \frac{x^3}{3} - \frac{x^4}{4} + \frac{x^5}{5 (1 + \xi)^5}.$$

*Verification at small $x$.* The expansion is standard ($\ln(1+x) = \sum_{k \ge 1}(-1)^{k-1} x^k/k$ for $|x| < 1$); our $T_4$ matches the first four terms exactly, and the remainder has the correct form.

*Interpretive remark.* The radius of convergence is $1$; the series converges at $x = 1$ (by Leibniz) but diverges at $x = -1$. The remainder formula quantifies how close $T_4(x)$ is to $\ln(1+x)$: for $|x| < 1$, $|R_4(x)| \le |x|^5 / [5(1 - |x|)^5]$, which is useful for numerical estimates. $\blacksquare$

([[23-mean-value-theorems]])

---

### Problem D2
Estimate $\sqrt{2}$ using the Taylor expansion of $(1 + x)^{1/2}$ at $x = 0$, evaluated at $x = 1$.

**Solution.**

*Setup.* The binomial series
$$(1 + x)^\alpha = \sum_{k=0}^\infty \binom{\alpha}{k} x^k, \qquad \binom{\alpha}{k} = \frac{\alpha(\alpha-1) \cdots (\alpha - k + 1)}{k!},$$
converges for $|x| < 1$ and, for $\alpha = 1/2$, converges at $x = 1$ (the series is absolutely convergent since $\binom{1/2}{k} \sim C/k^{3/2}$).

*Step 1. Coefficients.*
$$\binom{1/2}{0} = 1, \quad \binom{1/2}{1} = \frac{1}{2}, \quad \binom{1/2}{2} = \frac{(1/2)(-1/2)}{2} = -\frac{1}{8}, \quad \binom{1/2}{3} = \frac{(1/2)(-1/2)(-3/2)}{6} = \frac{1}{16},$$
$$\binom{1/2}{4} = \frac{(1/2)(-1/2)(-3/2)(-5/2)}{24} = -\frac{5}{128}.$$

*Step 2. Partial sum at $x = 1$.*
$$S_4 = 1 + \frac{1}{2} - \frac{1}{8} + \frac{1}{16} - \frac{5}{128} = \frac{128 + 64 - 16 + 8 - 5}{128} = \frac{179}{128} \approx 1.3984.$$

*Step 3. Compare with $\sqrt{2}$.* True value: $\sqrt{2} = 1.41421356\ldots$ Error: about $0.016$, or $\approx 1.1\%$.

*Step 4. Why convergence is slow.* The binomial series for $\alpha = 1/2$ at $x = 1$ converges by the alternating series test; the $k$th coefficient $\binom{1/2}{k}$ behaves as $(-1)^{k-1}/(k \sqrt{\pi k} \cdot 2^{2k-1})$ asymptotically (using Stirling for the central binomial coefficient), but at $x = 1$ the terms decay only like $1/k^{3/2}$, giving truncation error bounds $\sim n^{-1/2}$.

*Smarter approach.* Centre the expansion at $a = 1$ instead of $0$, and evaluate at $\sqrt{2}^2 - 1 = 1$. Or use the identity $\sqrt{2} = \sqrt{2}$... Or apply Newton's method: $x_{n+1} = x_n/2 + 1/x_n$ starting from $x_0 = 1.4$ gives $x_1 = 1.414285\ldots$, vastly better.

*Verification.* $S_4 = 1.3984$, continuing: add $+\binom{1/2}{5} = +7/256 = 0.02734$: $S_5 \approx 1.4258$ (now overshoots). $S_6$: subtract $\binom{1/2}{6} = 21/1024 \approx 0.0205$: $S_6 \approx 1.4053$. Oscillating convergence to $\sqrt{2}$. ✓

*Interpretive remark.* Taylor series at the edge of convergence behaves poorly; centring at a point closer to the target is always preferable when possible. This problem illustrates the principle: analytical tools have quantitative sharpness that matters for computational practice. $\blacksquare$

---

### Problem D3
Use Taylor's theorem to prove $\cos x \ge 1 - x^2/2$ for all $x \in \mathbb{R}$.

**Solution.**

*Setup.* Let $g(x) := \cos x - (1 - x^2/2) = \cos x - 1 + x^2/2$. We show $g(x) \ge 0$ for all $x$.

*Step 1. First attempt via Taylor at $0$, degree $2$.* Taylor's theorem: there exists $\xi$ between $0$ and $x$ with
$$\cos x = 1 - \frac{x^2}{2} + \frac{\cos^{(3)}(\xi)}{3!} x^3 = 1 - \frac{x^2}{2} + \frac{\sin \xi}{6} x^3.$$
So $g(x) = \frac{\sin \xi}{6} x^3$. For $x > 0$, $\sin \xi$ has variable sign — this does not immediately give $g \ge 0$. **Insufficient.**

*Step 2. Direct monotonicity argument (preferred).* Compute:
$$g(x) = \cos x - 1 + \frac{x^2}{2}, \quad g'(x) = -\sin x + x, \quad g''(x) = -\cos x + 1 \ge 0.$$

Observe:
- $g''(x) = 1 - \cos x \ge 0$ for all $x$, with equality only at $x = 2\pi k$. So $g'$ is non-decreasing on $\mathbb{R}$.
- $g'(0) = -\sin 0 + 0 = 0$.

Therefore $g'(x) \ge g'(0) = 0$ for $x \ge 0$, and $g'(x) \le g'(0) = 0$ for $x \le 0$ (by monotonicity of $g'$).

- For $x \ge 0$: $g'(x) \ge 0$, so $g$ is non-decreasing on $[0, \infty)$; hence $g(x) \ge g(0) = 0$.
- For $x \le 0$: $g'(x) \le 0$, so $g$ is non-increasing on $(-\infty, 0]$; hence $g(x) \ge g(0) = 0$.

In both cases $g(x) \ge 0$, i.e., $\cos x \ge 1 - x^2/2$.

*Step 3. (Alternative) Taylor at degree $3$.* For every $x$, there exists $\xi$ between $0$ and $x$ with
$$\cos x = 1 - \frac{x^2}{2} + 0 \cdot \frac{x^3}{3!} + \frac{\cos^{(4)}(\xi)}{4!} x^4 = 1 - \frac{x^2}{2} + \frac{\cos \xi}{24} x^4.$$
(The $x^3$ coefficient is $\cos^{(3)}(0)/6 = \sin 0 / 6 = 0$.) Now $\cos \xi \in [-1, 1]$, so
$$\cos x \ge 1 - \frac{x^2}{2} - \frac{x^4}{24}.$$
This is a **weaker** lower bound than $1 - x^2/2$ for small $x$. So Taylor cannot give the sharp answer directly; monotonicity is needed.

*Sanity check.* At $x = 0$: both sides equal $1$. ✓
At $x = 1$: LHS $= \cos 1 \approx 0.5403$, RHS $= 0.5$. $0.5403 \ge 0.5$. ✓
At $x = \pi$: LHS $= -1$, RHS $= 1 - \pi^2/2 \approx -3.93$. $-1 \ge -3.93$. ✓

*Interpretive remark.* This bound is the **second-order Taylor lower bound** for $\cos$, central in asymptotic analysis (e.g., stationary phase, steepest descent). The third-order correction fails because $\cos^{(3)}$ has the wrong sign. The moral: Taylor gives an error bound, not always a one-sided bound; for sign information, pair Taylor with direct analysis. $\blacksquare$

([[23-mean-value-theorems]])

---

### Problem D4
Let $f \in C^2([a, b])$ with $f(a) = f(b) = 0$. Show there exists $\xi \in (a, b)$ with $|f''(\xi)| \ge \dfrac{8}{(b-a)^2} \sup_{[a,b]} |f|$.

**Solution.**

*Setup.* Let $M := \sup_{[a,b]} |f|$. If $M = 0$, $f \equiv 0$ and any $\xi$ works (with both sides zero; conventionally the result is vacuous). Assume $M > 0$.

*Step 1. Locate the extremum.* By EVT (Corollary 20.2), $f$ attains its max and min on $[a, b]$. Since $f(a) = f(b) = 0$, the max or min is attained at an **interior** point $c \in (a, b)$, and in fact $|f(c)| = M$. WLOG $f(c) = M > 0$ (else replace $f$ with $-f$).

Since $c \in (a, b)$ is an interior maximum and $f \in C^1$, Fermat's theorem gives $f'(c) = 0$.

*Step 2. Taylor expansion at $c$, degree $1$, with Lagrange remainder.* $f \in C^2$ on $[a, b]$. For any $x \in [a, b]$, there exists $\eta$ between $c$ and $x$ with
$$f(x) = f(c) + f'(c)(x - c) + \frac{f''(\eta)}{2}(x - c)^2 = M + 0 + \frac{f''(\eta)}{2}(x - c)^2.$$

Apply at $x = a$ and $x = b$: there exist $\xi_1 \in (a, c)$ and $\xi_2 \in (c, b)$ with
$$0 = f(a) = M + \frac{f''(\xi_1)}{2}(a - c)^2, \quad 0 = f(b) = M + \frac{f''(\xi_2)}{2}(b - c)^2.$$

Solving:
$$f''(\xi_1) = -\frac{2M}{(c - a)^2}, \qquad f''(\xi_2) = -\frac{2M}{(b - c)^2}.$$

*Step 3. Bound using the min over $c \in (a, b)$.* Since $c - a + b - c = b - a$, we have $\max(c - a, b - c) \ge (b - a)/2$ (the larger of two numbers that sum to $b - a$ is at least half the sum). WLOG (relabelling) $c - a \le (b - a)/2$ (i.e., the extremum is closer to $a$). Then:
$$|f''(\xi_1)| = \frac{2M}{(c - a)^2} \ge \frac{2M}{((b-a)/2)^2} = \frac{8 M}{(b-a)^2}.$$

(If the extremum is closer to $b$, use $\xi_2$ instead.)

*Conclusion.* $\xi = \xi_1$ or $\xi_2$ satisfies
$$|f''(\xi)| \ge \frac{8 M}{(b-a)^2} = \frac{8}{(b - a)^2} \sup_{[a,b]} |f|.$$

*Sharpness.* Equality requires $c - a = b - c = (b - a)/2$ (so $c$ is the midpoint) — this is the worst case. For a quadratic $f(x) = M \left(1 - \bigl(2(x - (a+b)/2)/(b - a)\bigr)^2\right)$ (a parabola with max $M$ at the midpoint and zeros at $a, b$), $f''(x) = -8M/(b-a)^2$ identically, matching the bound.

*Interpretive remark.* This estimate is the one-dimensional version of the **De Giorgi-Moser iteration** in PDE: it quantifies how large the second derivative must be when a function is forced to vanish at two points yet bulge up in between. It is also the key to **finite-element error analysis**: piecewise linear approximations of a $C^2$ function have $L^\infty$ error bounded by $\frac{1}{8}(b-a)^2 \sup |f''|$. $\blacksquare$

---

## Part E: L'Hôpital's Rule

### Problem E1
Compute $\lim_{x \to 0} \dfrac{\ln(1+x)}{x}$.

**Solution.**

*Setup.* As $x \to 0$: $\ln(1+x) \to \ln 1 = 0$ and $x \to 0$. This is a $0/0$ indeterminate form; L'Hôpital applies.

*Step 1. Verify hypotheses of L'Hôpital (Theorem 24.X).*
- Numerator $f(x) = \ln(1+x)$ and denominator $g(x) = x$ are differentiable on $(-1, 0) \cup (0, 1)$.
- $g'(x) = 1 \ne 0$ on a punctured neighbourhood of $0$.
- $f(x), g(x) \to 0$ as $x \to 0$.
- $\lim_{x \to 0} \frac{f'(x)}{g'(x)} = \lim_{x \to 0} \frac{1/(1+x)}{1} = \frac{1}{1+0} = 1$, which exists.

*Step 2. Apply L'Hôpital.*
$$\lim_{x \to 0} \frac{\ln(1+x)}{x} = \lim_{x \to 0} \frac{1/(1+x)}{1} = 1.$$

*Verification by Taylor.* $\ln(1+x) = x - x^2/2 + O(x^3)$, so $\ln(1+x)/x = 1 - x/2 + O(x^2) \to 1$. ✓

*Interpretive remark.* This is a foundational limit, equivalent to the derivative $(\ln)'(1) = 1$. It underpins the definition of $e$ via $e = \lim_{n \to \infty}(1 + 1/n)^n$: taking logs, $\ln e = \lim n \ln(1 + 1/n) = \lim \ln(1 + 1/n)/(1/n) = 1$ by this problem. $\blacksquare$

([[24-lhopital-vector-derivatives]])

---

### Problem E2
Compute $\lim_{x \to \infty} x \cdot e^{-x}$.

**Solution.**

*Setup.* The form is $\infty \cdot 0$, which is not directly amenable to L'Hôpital. Rewrite as a quotient.

*Step 1. Rewrite.* $x e^{-x} = x / e^x$. As $x \to \infty$: numerator $\to \infty$, denominator $\to \infty$. This is $\infty/\infty$, the other L'Hôpital case.

*Step 2. Verify hypotheses.* Both $f(x) = x$ and $g(x) = e^x$ are differentiable on $\mathbb{R}$; $g'(x) = e^x > 0 \ne 0$; both $\to \infty$ as $x \to \infty$.

*Step 3. Apply L'Hôpital.*
$$\lim_{x \to \infty} \frac{x}{e^x} = \lim_{x \to \infty} \frac{1}{e^x} = 0.$$

*Step 4. Conclusion.* $\lim_{x \to \infty} x e^{-x} = 0$.

*Sanity check.* The exponential $e^x$ dominates any polynomial: $x^n / e^x \to 0$ for every $n$. Iterating L'Hôpital $n$ times confirms this; or use $e^x \ge x^{n+1}/(n+1)!$ (Taylor lower bound) to get $x^n/e^x \le (n+1)! / x \to 0$.

*Interpretive remark.* This limit is the analytic heart of many statistical results: the mean of an exponential distribution is finite ($\int_0^\infty x e^{-x}\, dx = 1$), the Laplace transform converges, the Gaussian integral is finite. It is the benchmark "exponential decay beats polynomial growth." $\blacksquare$

([[24-lhopital-vector-derivatives]])

---

### Problem E3
Compute $\lim_{x \to 0} \dfrac{x - \sin x}{x^3}$.

**Solution.**

*Setup.* As $x \to 0$: numerator $x - \sin x \to 0$ (since $\sin 0 = 0$), denominator $x^3 \to 0$. Form $0/0$.

*Method 1: Iterated L'Hôpital.*

- Step 1. $\lim \dfrac{x - \sin x}{x^3} \stackrel{\mathrm{L'H}}{=} \lim \dfrac{1 - \cos x}{3 x^2}$ (still $0/0$, since $1 - \cos 0 = 0$).
- Step 2. $\stackrel{\mathrm{L'H}}{=} \lim \dfrac{\sin x}{6 x}$ (still $0/0$, $\sin 0 = 0$).
- Step 3. $\stackrel{\mathrm{L'H}}{=} \lim \dfrac{\cos x}{6} = \dfrac{1}{6}$.

Each L'Hôpital step's hypotheses are verified: all functions are differentiable, derivatives are defined and the limits transfer.

*Method 2: Taylor series (cleaner).*

$$\sin x = x - \frac{x^3}{6} + \frac{x^5}{120} - \cdots$$
Hence
$$x - \sin x = \frac{x^3}{6} - \frac{x^5}{120} + \cdots$$
and
$$\frac{x - \sin x}{x^3} = \frac{1}{6} - \frac{x^2}{120} + \cdots \to \frac{1}{6}.$$

*Verification.* At $x = 0.1$: $\sin(0.1) \approx 0.09983342$, $(x - \sin x)/x^3 = (0.1 - 0.09983342)/0.001 = 0.1666 \approx 1/6$. ✓

*Interpretive remark.* This limit (value $1/6$) appears in the error analysis of Taylor expansions: $x - \sin x = x^3/6 + O(x^5)$ with constant $1/6$ exactly. The three applications of L'Hôpital correspond to three orders of the Taylor expansion; each "peels off" one factor of $x$. Taylor is generally preferred for higher-order limits because it avoids the derivative-tracking bookkeeping of iterated L'Hôpital. $\blacksquare$

([[24-lhopital-vector-derivatives]])

---

### Problem E4
Compute $\lim_{x \to 0^+} x^{\sin x}$.

**Solution.**

*Setup.* $x \to 0^+$, $\sin x \to 0^+$. This is the indeterminate form $0^0$.

*Step 1. Take logarithm.* Let $y = x^{\sin x}$. For $x \in (0, 1)$, $y > 0$, and
$$\ln y = \sin x \cdot \ln x.$$
The form of $\sin x \cdot \ln x$ as $x \to 0^+$ is $0 \cdot (-\infty)$.

*Step 2. Rewrite as a quotient for L'Hôpital.*
$$\sin x \cdot \ln x = \frac{\ln x}{1/\sin x}.$$

As $x \to 0^+$: numerator $\ln x \to -\infty$; denominator $1/\sin x \to +\infty$. Form $-\infty / +\infty$, amenable to L'Hôpital.

*Step 3. Differentiate.*
- $\frac{d}{dx}\ln x = \frac{1}{x}$.
- $\frac{d}{dx}(1/\sin x) = -\frac{\cos x}{\sin^2 x}$.

By L'Hôpital,
$$\lim_{x \to 0^+} \frac{\ln x}{1/\sin x} = \lim_{x \to 0^+} \frac{1/x}{-\cos x / \sin^2 x} = \lim_{x \to 0^+} \frac{-\sin^2 x}{x \cos x}.$$

*Step 4. Simplify.*
$$\frac{-\sin^2 x}{x \cos x} = -\frac{\sin x}{\cos x} \cdot \frac{\sin x}{x}.$$
As $x \to 0^+$: $\sin x / \cos x = \tan x \to 0$, and $\sin x / x \to 1$. Product: $0 \cdot 1 = 0$. So
$$\lim_{x \to 0^+} \sin x \cdot \ln x = 0, \qquad \text{i.e., } \lim_{x \to 0^+} \ln y = 0.$$

*Step 5. Exponentiate.* $\ln y \to 0 \implies y \to e^0 = 1$.

Conclusion: $\lim_{x \to 0^+} x^{\sin x} = 1$.

*Alternative (cleaner).* $\ln y = \sin x \cdot \ln x = \sin x / x \cdot x \ln x$. As $x \to 0^+$: $\sin x / x \to 1$, and $x \ln x \to 0$ (standard limit). Hence $\ln y \to 0$, so $y \to 1$.

*Standard limit check.* $x \ln x \to 0$ as $x \to 0^+$: let $x = 1/t$, $t \to \infty$: $x \ln x = -\ln t / t \to 0$ (polynomial vs. logarithmic growth, or L'Hôpital). ✓

*Interpretive remark.* $0^0$ is one of the most philosophically contentious indeterminate forms. In general $\lim f^g$ with $f \to 0^+$ and $g \to 0$ can be anything in $[0, \infty]$ depending on the relative rates. Here $\sin x \approx x$ near $0$, so effectively we have $x^x$, whose limit is $1$. $\blacksquare$

([[24-lhopital-vector-derivatives]])

---

### Problem E5
Show that L'Hôpital's rule is **inconclusive** for $\lim_{x \to \infty} \dfrac{x + \cos x}{x}$ but the limit still exists.

**Solution.**

*Setup.* As $x \to \infty$: $x + \cos x \to \infty$, $x \to \infty$. Form $\infty/\infty$.

*Step 1. Direct evaluation.*
$$\frac{x + \cos x}{x} = 1 + \frac{\cos x}{x}.$$
$|\cos x| \le 1$, so $|\cos x / x| \le 1/x \to 0$. Hence $\cos x / x \to 0$ (squeeze theorem), and
$$\lim_{x \to \infty} \frac{x + \cos x}{x} = 1 + 0 = 1. \qquad (\mathrm{ANS})$$

*Step 2. L'Hôpital attempt.* Differentiate:
$$\frac{d}{dx}(x + \cos x) = 1 - \sin x, \qquad \frac{d}{dx}(x) = 1.$$
So the "L'Hôpital ratio" is
$$\frac{1 - \sin x}{1} = 1 - \sin x.$$
As $x \to \infty$, $\sin x$ oscillates in $[-1, 1]$ without limit, so $1 - \sin x$ has no limit.

*Step 3. Interpretation.* L'Hôpital's rule asserts: **if** $\lim f'/g'$ exists, **then** $\lim f/g$ exists and equals it. The converse is false: $\lim f/g$ can exist without $\lim f'/g'$ existing. So when L'Hôpital gives a non-existent quotient, the rule is **inconclusive**, not "disproving" the limit.

In this problem, L'Hôpital produces $1 - \sin x$, which has no limit — but the original limit is $1$, by the direct computation. This demonstrates that L'Hôpital must be applied carefully: always check that the derivative ratio has a limit before concluding.

*Sanity check.* Verify numerically: $x = 100$, $(100 + \cos 100)/100 = 1 + \cos 100 / 100 \approx 1 + 0.00862/100 \approx 1.000086$. Gets closer to $1$ as $x \to \infty$. ✓

*Interpretive remark.* This problem highlights a subtle failure mode of L'Hôpital: the hypotheses (derivative-ratio-limit exists) fail, so the theorem simply does not apply; the truth of the original limit is unaffected. L'Hôpital is a **sufficient** condition, not necessary. Alternative tools (squeeze, Taylor, direct algebraic manipulation) are often required. $\blacksquare$

([[24-lhopital-vector-derivatives]])

---

## Part F: Vector-Valued Derivatives

### Problem F1
For $f(t) = (\cos t, \sin t, t^2)$, compute $f'(t)$ and $\|f'(\pi)\|$.

**Solution.**

*Setup.* The derivative of a vector-valued function $f: \mathbb{R} \to \mathbb{R}^n$ is computed componentwise.

*Step 1. Differentiate componentwise.*
$$f'(t) = \bigl(\tfrac{d}{dt}\cos t, \tfrac{d}{dt}\sin t, \tfrac{d}{dt}t^2\bigr) = (-\sin t, \ \cos t, \ 2t).$$

*Step 2. Evaluate at $t = \pi$.*
$$f'(\pi) = (-\sin \pi, \cos \pi, 2\pi) = (0, -1, 2\pi).$$

*Step 3. Compute the Euclidean norm.*
$$\|f'(\pi)\| = \sqrt{0^2 + (-1)^2 + (2\pi)^2} = \sqrt{0 + 1 + 4\pi^2} = \sqrt{1 + 4\pi^2}.$$

Numerically: $4\pi^2 \approx 39.478$, so $\|f'(\pi)\| \approx \sqrt{40.478} \approx 6.362$.

*Geometric interpretation.* $f$ parametrizes a spiral curve in $\mathbb{R}^3$: the $(x, y)$-projection is the unit circle, and the $z$-coordinate grows quadratically. The derivative $f'(\pi) = (0, -1, 2\pi)$ is the tangent vector: $(0, -1, 0)$ is the tangent to the circle at the "back" point, and the $2\pi$ component represents the vertical climb rate, equal to the $z$-derivative $2t$ at $t = \pi$.

*Verification.* $\|f'(t)\|^2 = \sin^2 t + \cos^2 t + 4 t^2 = 1 + 4t^2$, which is the squared speed. At $t = \pi$: $1 + 4\pi^2$. ✓ The arc length from $0$ to $T$ is $\int_0^T \sqrt{1 + 4t^2}\, dt$ — a tractable integral if needed.

*Interpretive remark.* Vector-valued differentiation is the foundation of **differential geometry**: $f'(t)$ gives the velocity vector at $t$, $\|f'(t)\|$ the speed, and $f''(t)$ the acceleration. The decomposition $f'' = a_T T + a_N N$ (tangential and normal components) uses this framework. $\blacksquare$

([[24-lhopital-vector-derivatives]])

---

### Problem F2
Give an example of a differentiable $f : [0, 1] \to \mathbb{R}^2$ with $f(0) = f(1)$ but $f'(t) \ne 0$ for every $t$.

**Solution.**

*Example.* $f(t) = (\cos 2\pi t, \sin 2\pi t)$ — one full trip around the unit circle.

*Verification of the properties.*
- **Periodicity:** $f(0) = (\cos 0, \sin 0) = (1, 0)$; $f(1) = (\cos 2\pi, \sin 2\pi) = (1, 0)$. ✓
- **Differentiability:** Each component is smooth, hence $f$ is $C^\infty$.
- **Derivative:** $f'(t) = (-2\pi \sin 2\pi t, \ 2\pi \cos 2\pi t)$.
- **Non-vanishing:** $\|f'(t)\|^2 = 4\pi^2 (\sin^2 2\pi t + \cos^2 2\pi t) = 4\pi^2 > 0$; hence $f'(t) \ne 0$ for all $t$.

*Significance.* The scalar MVT asserts: if $g: [a,b] \to \mathbb{R}$ is continuous and $g(a) = g(b)$, then $g'(\xi) = 0$ for some $\xi \in (a,b)$ (Rolle). The vector-valued analogue would claim: $f'(\xi) = 0$ for some $\xi$, which $f$ above **refutes**.

So the **equality form** $f(b) - f(a) = f'(\xi)(b - a)$ fails in the vector case: it would require $f(1) - f(0) = 0$ implies $f'(\xi) = 0$ for some $\xi$, which is false.

*What does survive: the MVT inequality.* For differentiable $f: [a, b] \to \mathbb{R}^n$:
$$\|f(b) - f(a)\| \le (b - a) \sup_{\xi \in [a, b]} \|f'(\xi)\|.$$
In our example: LHS $= 0$, RHS $= 1 \cdot 2\pi = 2\pi$. So $0 \le 2\pi$. ✓ (No contradiction, but no information either.)

*Interpretive remark.* This is the canonical demonstration that vector calculus is not just componentwise calculus: although $f_1(t) = \cos 2\pi t$ has a critical point in $(0, 1)$ (at $t = 1/2$, where $f_1' = 0$), and likewise $f_2$, **these critical points do not coincide** (for $f_2 = \sin 2\pi t$, $f_2'(t) = 0$ at $t = 1/4$ and $3/4$). So $f'(t) \ne 0$ for any $t$. The "simultaneous zero" required by the equality MVT does not exist. The right generalization is the **mean value inequality**. $\blacksquare$

([[24-lhopital-vector-derivatives]])

---

### Problem F3
Let $f : [a,b] \to \mathbb{R}^n$ be differentiable with $f'(t) = 0$ for all $t$. Show that $f$ is constant.

**Solution.**

*Setup.* We apply the vector-valued MVT inequality.

*Step 1. Vector MVT inequality (Theorem 24.X).* For differentiable $f: [a, b] \to \mathbb{R}^n$ and any $x, y \in [a, b]$:
$$\|f(x) - f(y)\| \le |x - y| \cdot \sup_{\xi \in [x, y] \cup [y, x]} \|f'(\xi)\|.$$

*Step 2. Apply with the hypothesis.* $\|f'(\xi)\| = 0$ for every $\xi \in [a, b]$ (since $f'(\xi) = 0 \in \mathbb{R}^n$, which has norm $0$). Hence for every $x, y \in [a, b]$:
$$\|f(x) - f(y)\| \le |x - y| \cdot 0 = 0.$$

*Step 3. Conclude.* $\|f(x) - f(y)\| = 0$ implies $f(x) = f(y)$ in $\mathbb{R}^n$. Since $x, y$ were arbitrary, $f$ is constant.

*Alternative proof (componentwise).* Write $f = (f_1, \ldots, f_n)$. The hypothesis $f'(t) = 0$ means $f_i'(t) = 0$ for each $i$. By the scalar MVT applied to each $f_i$: $f_i$ is constant on $[a, b]$. Hence $f$ is a constant vector.

*Sanity check.* Both methods yield the same conclusion. The vector MVT inequality approach generalizes better to infinite-dimensional targets (e.g., Banach-space-valued curves).

*Interpretive remark.* This is a "rigidity" result: the only curves with zero velocity everywhere are degenerate (points). It underpins the uniqueness theorem for ODEs: if $f_1, f_2$ satisfy the same ODE $f' = F(f)$ with the same initial condition, their difference satisfies $(f_1 - f_2)' = F(f_1) - F(f_2)$, Lipschitz-bounded in $f_1 - f_2$; Grönwall's inequality then forces $f_1 - f_2 \equiv 0$. $\blacksquare$

([[24-lhopital-vector-derivatives]])

---

### Problem F4
For $f(t) = (\cos t, \sin t)$, verify directly that $f(t) \perp f'(t)$.

**Solution.**

*Setup.* We compute the Euclidean inner product $f(t) \cdot f'(t)$ and show it equals $0$.

*Step 1. Compute $f'(t)$.* $f'(t) = (-\sin t, \cos t)$.

*Step 2. Inner product.*
$$f(t) \cdot f'(t) = \cos t \cdot (-\sin t) + \sin t \cdot \cos t = -\sin t \cos t + \sin t \cos t = 0.$$

*Step 3. Geometric interpretation.* $f(t)$ parametrizes the unit circle. At every point, the radius vector (from origin) is perpendicular to the tangent vector — a basic fact of circular motion.

*General principle (Lemma).* If $\|f(t)\|$ is constant (say $\|f(t)\| = c$), then $f \perp f'$ at every $t$ where $f$ is differentiable.

*Proof of lemma.* From $\|f(t)\|^2 = c^2$, differentiate:
$$\frac{d}{dt}\|f(t)\|^2 = \frac{d}{dt}(f(t) \cdot f(t)) = 2 f(t) \cdot f'(t).$$
Since $\|f(t)\|^2 = c^2$ is constant, its derivative is $0$:
$$2 f(t) \cdot f'(t) = 0 \implies f(t) \cdot f'(t) = 0 \implies f \perp f'.$$

*Application to our case.* $\|f(t)\|^2 = \cos^2 t + \sin^2 t = 1$, constant. Hence $f \perp f'$ by the lemma — consistent with the direct computation.

*Interpretive remark.* This lemma is the kinematic heart of **uniform circular motion**: the velocity is tangential, never radial, because the speed (radius) is constant. It also underpins the geometry of rigid rotations: if $R(t)$ is a rotation-valued curve in $\mathrm{SO}(n)$, then $R'(t) = A(t) R(t)$ with $A(t)$ skew-symmetric — the infinitesimal generator is always perpendicular (in an $\mathfrak{so}(n)$ sense) to the state. $\blacksquare$

([[24-lhopital-vector-derivatives]])

---

## Part G: Mixed / Challenging

### Problem G1
If $f, g$ are differentiable with $f' = g'$ and $f(a) = g(a)$ for some $a$, then $f = g$ on the interval.

**Solution.**

*Setup.* Let $h := f - g$. We show $h \equiv 0$.

*Step 1. Properties of $h$.*
- Differentiability: $h = f - g$ is differentiable with $h' = f' - g' = 0$.
- Initial value: $h(a) = f(a) - g(a) = 0$.

*Step 2. Apply MVT to $h$.* For any $x$ in the interval: if $x = a$, $h(x) = 0$. If $x \ne a$, MVT on $[a, x]$ (or $[x, a]$) gives $\xi$ strictly between $a$ and $x$ with
$$h(x) - h(a) = h'(\xi)(x - a) = 0 \cdot (x - a) = 0.$$
Hence $h(x) = h(a) = 0$.

*Step 3. Conclude.* $h \equiv 0$ on the interval, so $f \equiv g$.

*Verification (sanity).* At $x = a$: $f(a) = g(a)$ by hypothesis. $h'(x) = 0$ everywhere ensures no "drift." ✓

*Interpretive remark.* This is the **uniqueness part** of the fundamental theorem of calculus: if $F, G$ are both antiderivatives of $f'$, they differ by a constant, and the constant is fixed by any single value. Equivalently, the set of antiderivatives is an affine space over $\mathbb{R}$. This is the starting point for the theory of linear ODEs: homogeneous solutions form a vector space, particular + homogeneous gives the general solution. $\blacksquare$

([[23-mean-value-theorems]])

---

### Problem G2
Using the MVT (or Taylor), prove $\sqrt[n]{1 + x} < 1 + x/n$ for $x > 0$ and $n \ge 2$.

**Solution.**

*Setup.* Let $f(y) = y^{1/n}$. Equivalently, prove $f(1 + x) < f(1) + f'(1) \cdot x$ for $x > 0$.

*Method 1: Direct via MVT.* Apply MVT to $f$ on $[1, 1 + x]$: there exists $\xi \in (1, 1 + x)$ with
$$f(1 + x) - f(1) = f'(\xi) \cdot x, \quad \text{i.e., } (1 + x)^{1/n} - 1 = \frac{1}{n} \xi^{(1-n)/n} x.$$

Now $\xi > 1$ and $(1-n)/n < 0$ for $n \ge 2$, so $\xi^{(1-n)/n} < 1^{(1-n)/n} = 1$. Hence
$$(1 + x)^{1/n} - 1 < \frac{1}{n} \cdot 1 \cdot x = \frac{x}{n},$$
giving $\sqrt[n]{1 + x} < 1 + x/n$.

*Method 2: Strict concavity + Taylor.* Compute $f'(y) = \frac{1}{n} y^{(1-n)/n}$ and $f''(y) = \frac{1}{n} \cdot \frac{1-n}{n} y^{(1-2n)/n} = \frac{1 - n}{n^2} y^{(1-2n)/n}$.

For $n \ge 2$: $1 - n \le -1 < 0$, $y > 0$ implies $y^{(1-2n)/n} > 0$, so $f''(y) < 0$ on $(0, \infty)$. Hence $f$ is strictly concave there.

Strict concavity gives: for any $y_1 \ne y_2$ in the domain and $\lambda \in (0, 1)$,
$$f(\lambda y_1 + (1 - \lambda) y_2) > \lambda f(y_1) + (1 - \lambda) f(y_2).$$
Equivalently, $f$ lies **below** any of its tangent lines. The tangent at $y = 1$: $T(y) = f(1) + f'(1)(y - 1) = 1 + (y - 1)/n$. Strict concavity gives $f(y) < T(y)$ for $y \ne 1$. Substituting $y = 1 + x$ (with $x \ne 0$, and here $x > 0$):
$$(1 + x)^{1/n} < 1 + x/n.$$

*Verification.* At $x = 1, n = 2$: LHS $= \sqrt{2} \approx 1.414$, RHS $= 1.5$. $1.414 < 1.5$. ✓
At $x = 8, n = 3$: LHS $= 9^{1/3} \approx 2.080$, RHS $= 1 + 8/3 \approx 3.667$. ✓ (Rough but correct direction.)

*Interpretive remark.* This inequality is the AM-GM inequality in disguise: for positive reals $a_1, \ldots, a_n$, $\sqrt[n]{a_1 \cdots a_n} \le \frac{a_1 + \cdots + a_n}{n}$. Take $a_1 = 1 + x$, $a_2 = \cdots = a_n = 1$: LHS $= (1+x)^{1/n}$, RHS $= (1 + x + (n-1))/n = 1 + x/n$. Equality iff all $a_i$ equal, iff $x = 0$. So the inequality is strict for $x > 0$. $\blacksquare$

---

### Problem G3
Suppose $f \in C^1([a, b])$ with $f'(x) > 0$. Show $f$ is strictly increasing and $f^{-1}$ is $C^1$.

**Solution.**

*Setup.* Two claims: (i) strict monotonicity and (ii) $C^1$ regularity of the inverse.

*Step 1. Strict increase via MVT.* For $a \le x < y \le b$: MVT gives $\xi \in (x, y)$ with
$$f(y) - f(x) = f'(\xi)(y - x) > 0 \cdot (y - x) = 0 \quad \text{(since $f'(\xi) > 0$)}.$$
Hence $f(y) > f(x)$. $f$ is strictly increasing.

*Step 2. $f$ is a bijection onto $[f(a), f(b)]$.* $f$ is continuous, hence $f([a, b])$ is an interval by the IVT applied to $f$ (or by preservation of connectedness). Strict monotonicity ensures injectivity. The endpoints of the image interval are $f(a)$ (inf) and $f(b)$ (sup), so $f: [a, b] \to [f(a), f(b)]$ is a bijection.

*Step 3. Continuity of $g := f^{-1}$.* Strictly monotone continuous bijections on intervals have continuous inverses — a classical result (Theorem 17.X for monotone continuous functions). Hence $g \in C^0([f(a), f(b)])$.

*Step 4. Differentiability of $g$: the inverse function theorem (1D).* Fix $y_0 \in [f(a), f(b)]$ and let $x_0 = g(y_0)$. We compute $g'(y_0)$.

For $y$ near $y_0$ with $y \ne y_0$, let $x = g(y) \ne x_0$ (injectivity). Then $y = f(x)$, so $y - y_0 = f(x) - f(x_0)$. The difference quotient for $g$ at $y_0$:
$$\frac{g(y) - g(y_0)}{y - y_0} = \frac{x - x_0}{f(x) - f(x_0)} = \left( \frac{f(x) - f(x_0)}{x - x_0} \right)^{-1}.$$

As $y \to y_0$, by continuity of $g$, $x = g(y) \to g(y_0) = x_0$. By differentiability of $f$ at $x_0$:
$$\frac{f(x) - f(x_0)}{x - x_0} \to f'(x_0) > 0.$$
Hence, by continuity of the reciprocal map at nonzero values,
$$g'(y_0) = \frac{1}{f'(x_0)} = \frac{1}{f'(g(y_0))}.$$

*Step 5. $g' \in C^0$.* The formula $g'(y) = 1/f'(g(y))$ is a composition of continuous maps: $g$ is continuous, $f'$ is continuous ($f \in C^1$), and $1/(\cdot)$ is continuous on $(0, \infty)$ (since $f' > 0$). Hence $g' \in C^0$, so $g \in C^1$.

*Verification (simple case).* $f(x) = x^2$ on $[1, 2]$, $f'(x) = 2x > 0$. Inverse: $g(y) = \sqrt{y}$ on $[1, 4]$. $g'(y) = 1/(2\sqrt{y}) = 1/(2 g(y)) = 1/f'(g(y))$. ✓

*Interpretive remark.* This is the **1D inverse function theorem**. The general case (in $\mathbb{R}^n$) uses the same template but requires the Jacobian matrix to be invertible; the proof uses the contraction mapping principle. For $C^k$ regularity ($k \ge 2$), recursively differentiate $g'(y) = 1/f'(g(y))$ and use chain rule closure. $\blacksquare$

([[23-mean-value-theorems]])

---

### Problem G4
Let $f \in C^2$ with $f''(x) > 0$ for all $x$ (strictly convex). Show $f$ has at most one critical point; if it exists, it is a global minimum.

**Solution.**

*Setup.* Suppose $f'(a) = 0$. Two claims: (i) uniqueness, (ii) global minimum.

*Step 1. Uniqueness of critical point.* Suppose for contradiction $f'(a) = f'(b) = 0$ with $a < b$. Apply Rolle's theorem to $f'$ on $[a, b]$: there exists $c \in (a, b)$ with $(f')'(c) = f''(c) = 0$. This contradicts $f''(c) > 0$. Hence at most one critical point.

*Step 2. Global minimum — via Taylor.* Suppose $f'(a) = 0$ exists. For any $x$, by Taylor's theorem (degree $1$ at $a$ with Lagrange remainder): there exists $\xi$ between $a$ and $x$ with
$$f(x) = f(a) + f'(a)(x - a) + \frac{f''(\xi)}{2}(x - a)^2 = f(a) + 0 + \frac{f''(\xi)}{2}(x - a)^2 \ge f(a).$$
(Using $f''(\xi) > 0$ and $(x - a)^2 \ge 0$.) Equality holds iff $x = a$. So $f(a)$ is the strict global minimum.

*Alternate proof of global min — via monotonicity.* Since $f'' > 0$, $f'$ is strictly increasing. $f'(a) = 0$, so $f'(x) < 0$ for $x < a$ and $f'(x) > 0$ for $x > a$. Hence $f$ is strictly decreasing on $(-\infty, a]$ and strictly increasing on $[a, \infty)$. So $f(a)$ is the global minimum.

*Verification with $f(x) = x^2$.* $f''(x) = 2 > 0$, so $f$ is strictly convex. $f'(x) = 2x$ has unique zero at $x = 0$, with $f(0) = 0$ the global min. ✓

*Remark on necessity.* Strict convexity does NOT guarantee a critical point exists: $f(x) = e^x$ is strictly convex ($f'' = e^x > 0$) but $f'(x) = e^x > 0$ has no zeros. The problem's second claim is conditional: **if** a critical point exists.

*Interpretive remark.* Strict convexity is the cornerstone of **convex optimization**: it ensures a unique minimizer (if one exists), avoiding pathological landscapes. Many classical inequalities (Jensen, Hadamard, $L^p$-norm monotonicity) are strict-convexity statements in disguise. $\blacksquare$

---

### Problem G5
Prove that $e^x$ is strictly convex on $\mathbb{R}$: for any $\lambda \in (0, 1)$ and $x \ne y$,
$$e^{\lambda x + (1 - \lambda) y} < \lambda e^x + (1 - \lambda) e^y.$$

**Solution.**

*Setup.* Two approaches: (A) via the second-derivative criterion, (B) directly.

*Method A: Second derivative.*

$f(t) = e^t$ is $C^\infty$ on $\mathbb{R}$, with $f''(t) = e^t > 0$ everywhere. Hence $f$ is strictly convex (Theorem: $f \in C^2$ with $f'' > 0$ on an interval $\iff f$ is strictly convex there). The inequality is the definition of strict convexity:
$$f(\lambda x + (1-\lambda) y) < \lambda f(x) + (1-\lambda) f(y) \quad \text{for } \lambda \in (0,1), x \ne y.$$

*Method B: Proof of the convexity criterion, applied.*

Fix $x \ne y$. WLOG $x < y$. Set $z = \lambda x + (1-\lambda) y$ with $\lambda \in (0, 1)$; then $x < z < y$.

By Taylor's theorem at $z$ with degree $1$:
$$e^x = e^z + e^z(x - z) + \frac{e^{\xi_1}}{2}(x - z)^2, \quad \xi_1 \in (x, z);$$
$$e^y = e^z + e^z(y - z) + \frac{e^{\xi_2}}{2}(y - z)^2, \quad \xi_2 \in (z, y).$$

Form the convex combination:
$$\lambda e^x + (1 - \lambda) e^y = e^z + e^z[\lambda(x - z) + (1 - \lambda)(y - z)] + \lambda \frac{e^{\xi_1}}{2}(x - z)^2 + (1 - \lambda) \frac{e^{\xi_2}}{2}(y - z)^2.$$

Now $\lambda(x - z) + (1 - \lambda)(y - z) = \lambda x + (1 - \lambda) y - z = z - z = 0$ (definition of $z$). So
$$\lambda e^x + (1 - \lambda) e^y = e^z + \underbrace{\lambda \frac{e^{\xi_1}}{2}(x - z)^2 + (1 - \lambda) \frac{e^{\xi_2}}{2}(y - z)^2}_{> 0 \text{ since } e^{\xi_i} > 0, \text{ and } (x-z)^2, (y-z)^2 > 0}.$$

Hence $\lambda e^x + (1 - \lambda) e^y > e^z = e^{\lambda x + (1 - \lambda) y}$, as claimed. The inequality is strict because the quadratic remainder is positive.

*Verification at a specific instance.* $x = 0, y = 1, \lambda = 1/2$: LHS $= e^{1/2} \approx 1.6487$, RHS $= (1 + e)/2 \approx 1.8591$. $1.6487 < 1.8591$. ✓

*Interpretive remark.* The convexity of $\exp$ is the analytic engine behind **Jensen's inequality** for moment generating functions, the **AM-GM inequality** ($\exp$ of average $\le$ average of $\exp$), and the concavity of $\log$ (since $\log$ is the inverse of a convex increasing function, it is concave). It generalizes to Banach spaces and is foundational in probability (large deviations, information theory). $\blacksquare$

---

## Summary

| Part | Problems | Key lesson | Core techniques |
|------|----------|-----------|-----------------|
| Z1–Z8 | [[20-ivt-and-connectedness]] | EVT, IVT, Heine-Cantor, uniform continuity | Compactness, connectedness, sequential arguments, $\varepsilon$-$\delta$ |
| A1–A4 | [[22-differentiation]] | Derivative from definition | Binomial theorem, squeeze, one-sided limits |
| B1–B4 | [[22-differentiation]] | Algebraic/chain rules | Chain rule, logarithmic differentiation |
| C1–C4 | [[23-mean-value-theorems]] | MVT, Rolle applications | Sign analysis of derivatives, induction |
| D1–D4 | [[23-mean-value-theorems]] | Taylor expansion, remainder | Lagrange remainder, comparison, monotonicity |
| E1–E5 | [[24-lhopital-vector-derivatives]] | L'Hôpital, indeterminate forms | Rewriting forms, log trick, Taylor verification |
| F1–F4 | [[24-lhopital-vector-derivatives]] | Vector-valued derivatives | Componentwise differentiation, MVT failure + inequality, perpendicularity |
| G1–G5 | Multiple lessons | Convexity, monotonicity, inverse functions | Taylor-based convexity proofs, strict convexity, inverse function theorem (1D) |

---

## Qualifying-exam Style Notes

- **Show all $\varepsilon$-$\delta$**. Even in a problem like "prove $f$ continuous," write out the modulus explicitly.
- **Verify theorem hypotheses**. L'Hôpital, MVT, Rolle, Taylor all have specific preconditions; a qualifying exam will penalize unstated assumptions.
- **Always sanity-check** with a special value or limiting case.
- **Give interpretive context** for non-trivial results; exam graders look for understanding, not just correctness.

---

## Related Topics

- [[20-ivt-and-connectedness]] — IVT, EVT, connectedness, uniform continuity (start of CO4)
- [[22-differentiation]] through [[24-lhopital-vector-derivatives]] — differential calculus (CO4 continued)
- [[25-riemann-stieltjes-integral]] — next unit (CO5) uses differentiability for FTC
