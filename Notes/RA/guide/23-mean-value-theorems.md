# 23. Mean Value Theorems and Taylor's Theorem

> **The central results.** The **Mean Value Theorem** (MVT) is arguably the most consequential single theorem of one-variable differential calculus. In its cleanest form it asserts that on any interval $[a, b]$, the **average rate of change** $\frac{f(b) - f(a)}{b - a}$ is actually *attained* as an **instantaneous rate of change** $f'(\xi)$ at some interior point $\xi \in (a, b)$.
>
> This is not merely an aesthetic statement. It is the engine behind:
>
> - The classical **monotonicity tests**: $f' > 0 \Rightarrow f$ strictly increasing, $f' \geq 0 \Rightarrow f$ nondecreasing, and their converses on intervals.
> - The **constant-on-interval characterization**: $f' \equiv 0 \Rightarrow f$ constant (the fundamental "uniqueness" result that underpins antiderivatives, the FTC, and existence/uniqueness for ODEs).
> - **Lipschitz control from derivative bounds**: $|f'| \leq L \Rightarrow f$ is $L$-Lipschitz.
> - **Taylor's theorem with remainder** — the cornerstone of polynomial approximation, local analysis, and numerical estimation.
> - **Darboux's theorem** (derivatives have the intermediate value property, even when they are not continuous).
> - **L'Hôpital's rule** (via the Cauchy generalisation).
>
> We proceed in the classical order: **Rolle's theorem** (special case, $f(a) = f(b)$) is proved via the Extreme Value Theorem and Fermat's stationary-point lemma. Then **Lagrange's MVT** is deduced by an affine tilt that reduces it to Rolle. Then **Cauchy's generalised MVT** (two functions) is obtained by a determinant-like auxiliary function. Finally, **Taylor's theorem** with Lagrange, Cauchy, and integral remainders is derived, together with **Darboux's theorem** on the intermediate value property of derivatives.
>
> The whole chapter is a single long engagement with one technique: **construct an auxiliary function, verify its hypotheses, apply Rolle/MVT, unpack.**

---

## 23.1 Rolle's Theorem

The prototype MVT. Rolle says: if a function returns to the same value, it must have been flat at some moment in between.

> **Theorem 23.1 (Rolle's theorem).**
> Let $f : [a, b] \to \mathbb{R}$ satisfy the three hypotheses:
>
> (i) $f$ is **continuous on** $[a, b]$ (including the endpoints),
>
> (ii) $f$ is **differentiable on** $(a, b)$ (need not be differentiable at the endpoints),
>
> (iii) $f(a) = f(b)$.
>
> Then there exists $\xi \in (a, b)$ with $f'(\xi) = 0$.

**Proof.** We consider two cases.

*Step 1: Reduce to the non-constant case.* If $f$ is **constant** on $[a, b]$, then $f'(x) = 0$ for every $x \in (a, b)$, and any $\xi \in (a, b)$ satisfies the conclusion. So assume henceforth that $f$ is **not** constant on $[a, b]$.

*Step 2: Apply the Extreme Value Theorem.* Since $f$ is continuous on the **compact** interval $[a, b]$, the Extreme Value Theorem (EVT, Theorem 20.2) guarantees that $f$ attains its supremum $M = \sup_{[a,b]} f$ and infimum $m = \inf_{[a,b]} f$ on $[a, b]$. That is, there exist $x_M, x_m \in [a, b]$ with
$$f(x_M) = M, \qquad f(x_m) = m, \qquad m \leq f(x) \leq M \text{ for all } x \in [a, b].$$

*Step 3: At least one extremum is strictly interior.* Because $f$ is not constant, $M > m$. The common endpoint value is $f(a) = f(b)$. We claim at least one of $M, m$ differs from $f(a) = f(b)$. For if $M = f(a) = f(b)$ and $m = f(a) = f(b)$, then $M = m$, contradicting $M > m$.

Without loss of generality, suppose $M \neq f(a)$ (the other case is symmetric, replacing $M$ by $m$ and "maximum" by "minimum" throughout). Since $f(x_M) = M \neq f(a) = f(b)$, the point $x_M$ cannot be an endpoint. Therefore
$$x_M \in (a, b) \quad \text{(strictly interior)}.$$

*Step 4: Apply Fermat's stationary-point theorem.* At the interior maximum $x_M$, the hypothesis (ii) gives that $f$ is differentiable at $x_M \in (a, b)$. Fermat's theorem (Theorem 22.6) asserts: **if $f$ attains a local extremum at an interior point of differentiability, then $f'$ vanishes there.** In our case, $f(x_M) = M$ is even a *global* maximum on $[a, b]$, hence a fortiori a local maximum. Therefore
$$f'(x_M) = 0.$$

Set $\xi := x_M \in (a, b)$ and we are done. $\blacksquare$

> **Geometric interpretation.** If a smooth curve leaves a height $h$ and returns to that same height $h$, somewhere in between the curve must have had a **horizontal tangent**. Picturing the graph, this is intuitively obvious: to return to where you started, you must at some instant stop going up and start going down (or vice versa), and at that instant the slope is zero.

> **Why all three hypotheses are needed — canonical counterexamples.**
>
> - **Dropping (iii) (equal endpoint values):** $f(x) = x$ on $[0, 1]$ satisfies (i), (ii) but not (iii) ($f(0) = 0 \neq 1 = f(1)$). Conclusion fails: $f'(x) = 1$ everywhere, never zero.
> - **Dropping (ii) (differentiability on $(a, b)$):** $f(x) = |x|$ on $[-1, 1]$ satisfies (i), (iii) ($f(-1) = f(1) = 1$) but fails (ii) at $x = 0$. Conclusion fails: $f'(x) = -1$ for $x < 0$ and $f'(x) = 1$ for $x > 0$, never zero.
> - **Dropping (i) (continuity on $[a, b]$):** Let $f(x) = x$ on $[0, 1)$ and redefine $f(1) = 0$. Then $f(0) = f(1) = 0$, so (iii) holds, and $f$ is differentiable on $(0, 1)$ with $f'(x) = 1$, so (ii) holds. But $f$ is discontinuous at $x = 1$, so (i) fails. Conclusion fails: $f'(x) \equiv 1$ on $(0, 1)$, never zero.
>
> Each hypothesis is **independently essential**: all three are needed, and the proof uses each (continuity in EVT, differentiability in Fermat, equal endpoints in identifying an interior extremum).

> **Remark (role of compactness).** The heart of the proof is the EVT, which requires **compactness** of $[a, b]$. On an open or unbounded interval, extrema need not be attained, and the argument breaks. E.g., $f(x) = \arctan x$ on $\mathbb{R}$ satisfies $\lim_{\pm\infty} f = \pm\pi/2$ but does not attain $\pm\pi/2$.

---

## 23.2 Lagrange's Mean Value Theorem

Rolle becomes the MVT after a tilting trick: replace $f$ with $f$ minus the chord line, which now has equal endpoints.

> **Theorem 23.2 (Lagrange's Mean Value Theorem).**
> Let $f : [a, b] \to \mathbb{R}$ be continuous on $[a, b]$ and differentiable on $(a, b)$. Then there exists $\xi \in (a, b)$ with
> $$f'(\xi) \;=\; \frac{f(b) - f(a)}{b - a}.$$

**Proof.** The strategy: subtract the **chord line** from $f$ to force equal endpoint values, then apply Rolle.

*Step 1: Define the auxiliary function.* Let
$$g(x) \;:=\; f(x) \;-\; \frac{f(b) - f(a)}{b - a}\,(x - a), \qquad x \in [a, b].$$
Geometrically, $g(x)$ is the signed vertical distance from $(x, f(x))$ to the chord line through $(a, f(a))$ and $(b, f(b))$ — more precisely, to the line $y = f(a) + \frac{f(b)-f(a)}{b-a}(x - a)$, which passes through both endpoints of the graph.

*Step 2: Verify Rolle's hypotheses for $g$.*
- **(Continuity on $[a, b]$.)** $g$ is the difference of $f$ (continuous by hypothesis) and a linear function (continuous on $\mathbb{R}$). Hence $g$ is continuous on $[a, b]$.
- **(Differentiability on $(a, b)$.)** $f$ is differentiable on $(a, b)$, and the linear function is differentiable on $\mathbb{R}$. Hence $g$ is differentiable on $(a, b)$, with
  $$g'(x) \;=\; f'(x) \;-\; \frac{f(b) - f(a)}{b - a}.$$
- **(Equal endpoint values.)** Compute:
  $$g(a) \;=\; f(a) - \frac{f(b) - f(a)}{b - a}(a - a) \;=\; f(a) - 0 \;=\; f(a).$$
  $$g(b) \;=\; f(b) - \frac{f(b) - f(a)}{b - a}(b - a) \;=\; f(b) - (f(b) - f(a)) \;=\; f(a).$$
  So $g(a) = g(b) = f(a)$.

*Step 3: Apply Rolle.* By Theorem 23.1, there exists $\xi \in (a, b)$ with $g'(\xi) = 0$. Substituting the formula for $g'$:
$$0 \;=\; g'(\xi) \;=\; f'(\xi) - \frac{f(b) - f(a)}{b - a},$$
hence
$$f'(\xi) \;=\; \frac{f(b) - f(a)}{b - a}. \qquad \blacksquare$$

> **Geometric interpretation.** On any smooth curve, there is some interior point where the **tangent line is parallel to the chord** joining the two endpoints. Pictorially, shift the chord without rotating; the last place the shifted chord touches the graph before leaving is a point where the graph's tangent equals the chord's slope.

> **Equivalent "Lagrange form" (increment form).** For every $x \in [a, b]$, applying the MVT on the subinterval $[a, x]$ (or $[x, a]$ if $x < a$, though here $x \geq a$) yields
> $$f(x) \;=\; f(a) \;+\; f'(\xi)(x - a)$$
> for some $\xi$ strictly between $a$ and $x$. This is called the **MVT remainder form** of first order; it is the base case ($n = 0$) of Taylor's theorem.

> **Interpretive remark: differential vs. integral information.** The MVT is the **bridge** between pointwise (differential) data — the value of $f'$ at a single point — and interval (integral) data — the change $f(b) - f(a)$ of $f$ over a whole interval. This bridge is the mechanism underlying every monotonicity and approximation theorem in the subject. It is, in a precise sense, the "first fundamental theorem of calculus" that precedes integration.

---

## 23.3 Consequences of the MVT

The following corollaries are short, but they constitute the practical toolkit that the MVT delivers. Each is proved by applying the MVT on a suitable subinterval and exploiting the sign or bound on $f'$.

> **Theorem 23.3 (Constant function characterization).**
> If $f : [a, b] \to \mathbb{R}$ is continuous on $[a, b]$, differentiable on $(a, b)$, and satisfies $f'(x) = 0$ for all $x \in (a, b)$, then $f$ is constant on $[a, b]$.

**Proof.**
*Step 1: Fix an arbitrary reference point.* We show $f(x) = f(a)$ for every $x \in [a, b]$.

*Step 2: Trivial case.* If $x = a$, the conclusion is immediate.

*Step 3: Apply MVT on $[a, x]$.* For $x \in (a, b]$, apply the MVT to $f$ on the subinterval $[a, x]$. (Hypotheses: $f$ is continuous on $[a, x]$ since $[a, x] \subseteq [a, b]$; differentiable on $(a, x) \subseteq (a, b)$.) There exists $\xi_x \in (a, x)$ with
$$f(x) - f(a) \;=\; f'(\xi_x)(x - a).$$

*Step 4: Use the vanishing derivative hypothesis.* By hypothesis, $f'(\xi_x) = 0$ for every $\xi_x \in (a, b)$. Hence
$$f(x) - f(a) \;=\; 0 \cdot (x - a) \;=\; 0,$$
so $f(x) = f(a)$. This holds for all $x \in [a, b]$, establishing $f \equiv f(a)$. $\blacksquare$

> **Corollary 23.4 (Uniqueness of antiderivatives).** If $f$ and $g$ are continuous on $[a, b]$, differentiable on $(a, b)$, and $f'(x) = g'(x)$ for every $x \in (a, b)$, then $f - g$ is constant on $[a, b]$.

**Proof.** Apply Theorem 23.3 to the difference $h := f - g$: $h$ is continuous and differentiable with $h' = f' - g' \equiv 0$, hence $h$ is constant. $\blacksquare$

> **Remark (why an interval matters).** Theorem 23.3 can **fail** if the domain is not connected. Example: let $f(x) = 0$ on $(-\infty, 0)$ and $f(x) = 1$ on $(0, \infty)$. Then $f'(x) = 0$ on both open intervals, but $f$ is not constant on $(-\infty, 0) \cup (0, \infty)$. The MVT requires an interval to apply.

---

> **Theorem 23.5 (Monotonicity tests).**
> Let $f$ be continuous on $[a, b]$ and differentiable on $(a, b)$.
>
> **(a)** If $f'(x) \geq 0$ for all $x \in (a, b)$, then $f$ is **nondecreasing** on $[a, b]$: $x < y \Rightarrow f(x) \leq f(y)$.
>
> **(b)** If $f'(x) > 0$ for all $x \in (a, b)$, then $f$ is **strictly increasing** on $[a, b]$: $x < y \Rightarrow f(x) < f(y)$.
>
> **(c)** If $f'(x) \leq 0$ for all $x \in (a, b)$, then $f$ is **nonincreasing**; if $f'(x) < 0$, **strictly decreasing**.

**Proof.** We prove (a) and (b); parts (c) follow by applying (a), (b) to $-f$.

*Step 1.* Fix $x, y \in [a, b]$ with $x < y$. Apply the MVT to $f$ on the subinterval $[x, y] \subseteq [a, b]$: $f$ is continuous on $[x, y]$ and differentiable on $(x, y)$, so there exists $\xi \in (x, y)$ with
$$f(y) - f(x) \;=\; f'(\xi)(y - x).$$

*Step 2: Apply the hypothesis on $f'$.*
- **(a)** If $f'(\xi) \geq 0$: since $y - x > 0$, the product $f'(\xi)(y - x) \geq 0$, so $f(y) - f(x) \geq 0$, i.e., $f(y) \geq f(x)$.
- **(b)** If $f'(\xi) > 0$: $f'(\xi)(y - x) > 0$, so $f(y) > f(x)$.

*Step 3:* Since $x < y$ was arbitrary, the corresponding monotonicity holds on $[a, b]$. $\blacksquare$

> **Remark (partial converse).** The converse of (b) is **false**: $f$ can be strictly increasing while $f'$ vanishes at isolated points. Canonical example: $f(x) = x^3$ on $\mathbb{R}$ is strictly increasing (because $x < y \Rightarrow x^3 < y^3$, a purely algebraic fact), yet $f'(0) = 0$. However, the **partial converse $f$ nondecreasing $\Rightarrow f' \geq 0$** is true almost everywhere (and everywhere, in the pointwise-limit sense $f'(x) = \lim_{h \to 0^+}(f(x+h) - f(x))/h$, the numerator is $\geq 0$ and the denominator is $> 0$).

> **Sharper strict-increase test.** $f$ is strictly increasing on $[a, b]$ if and only if
>
> 1. $f'(x) \geq 0$ on $(a, b)$, and
> 2. $f'$ is not identically zero on any subinterval of $(a, b)$.
>
> (See Practice Problem 3 for the proof.)

---

> **Theorem 23.6 (Lipschitz bound from bounded derivative).**
> If $f$ is differentiable on an interval $I$ and $|f'(x)| \leq L$ for all $x \in I$, then
> $$|f(x) - f(y)| \;\leq\; L\,|x - y| \qquad \text{for all } x, y \in I.$$
> That is, $f$ is **$L$-Lipschitz** on $I$.

**Proof.**
*Step 1.* Fix $x, y \in I$. If $x = y$, the inequality is $0 \leq 0$, trivially true. Otherwise, WLOG assume $x < y$ (else swap them).

*Step 2: Apply MVT.* Since $f$ is differentiable on $I$, it is in particular continuous on $[x, y]$ and differentiable on $(x, y)$. By the MVT, there exists $\xi \in (x, y) \subseteq I$ with
$$f(y) - f(x) \;=\; f'(\xi)(y - x).$$

*Step 3: Bound by absolute value.* Take absolute values and apply the derivative bound $|f'(\xi)| \leq L$:
$$|f(y) - f(x)| \;=\; |f'(\xi)| \cdot |y - x| \;\leq\; L\,|y - x|. \qquad \blacksquare$$

> **Corollary.** Every differentiable function with bounded derivative on $I$ is **uniformly continuous** on $I$: given $\varepsilon > 0$, the choice $\delta := \varepsilon / L$ (or $\delta = \infty$ if $L = 0$) gives $|x - y| < \delta \Rightarrow |f(x) - f(y)| < \varepsilon$.

---

## 23.4 Darboux's Theorem (Derivatives have the IVP)

A striking application of Rolle. Even though derivatives need not be continuous (e.g., $f(x) = x^2 \sin(1/x)$ extended by $0$ has a discontinuous derivative at $0$), they always satisfy the **intermediate value property**.

> **Theorem 23.7 (Darboux's theorem).**
> Let $f : [a, b] \to \mathbb{R}$ be differentiable on $[a, b]$ (one-sided derivatives at the endpoints). If $\lambda$ is any value strictly between $f'(a)$ and $f'(b)$, then there exists $c \in (a, b)$ with $f'(c) = \lambda$.
>
> **Consequence: derivatives cannot have simple jump discontinuities.** If $f$ is differentiable on an interval, $f'$ has no isolated jumps.

**Proof.** WLOG assume $f'(a) < \lambda < f'(b)$ (the other case is symmetric).

*Step 1: Reduce to finding a stationary point.* Define
$$g(x) \;:=\; f(x) - \lambda\,x, \qquad x \in [a, b].$$
Then $g$ is differentiable on $[a, b]$ with $g'(x) = f'(x) - \lambda$. Our goal $f'(c) = \lambda$ becomes $g'(c) = 0$. Note:
$$g'(a) \;=\; f'(a) - \lambda \;<\; 0, \qquad g'(b) \;=\; f'(b) - \lambda \;>\; 0.$$

*Step 2: Apply the EVT to $g$.* $g$ is differentiable on $[a, b]$, hence continuous. By the Extreme Value Theorem, $g$ attains a minimum at some $c \in [a, b]$.

*Step 3: Show the minimum is strictly interior.* We rule out $c = a$ and $c = b$.

- **Ruling out $c = a$.** If the minimum is at $a$, then $g(x) \geq g(a)$ for all $x \in [a, b]$, so for $x > a$:
  $$\frac{g(x) - g(a)}{x - a} \;\geq\; 0.$$
  Letting $x \to a^+$, the right-hand derivative $g'(a) \geq 0$. But we have $g'(a) < 0$, contradiction.

- **Ruling out $c = b$.** Similarly, if the minimum is at $b$, then for $x < b$:
  $$\frac{g(x) - g(b)}{x - b} \;\leq\; 0 \quad (\text{numerator} \geq 0, \text{denominator} < 0),$$
  and letting $x \to b^-$, $g'(b) \leq 0$, contradicting $g'(b) > 0$.

Hence $c \in (a, b)$.

*Step 4: Apply Fermat.* Since $g$ has an interior minimum at $c$ and is differentiable at $c$, Fermat's theorem gives $g'(c) = 0$, i.e., $f'(c) = \lambda$. $\blacksquare$

> **Consequence.** If $f$ is differentiable on an interval $I$, then $f'(I)$ is an **interval** (possibly degenerate). In particular, $f'$ cannot take only the values $\{0, 1\}$ and nothing in between.
>
> Example: the function $f(x) = 0$ for $x \leq 0$, $f(x) = x$ for $x > 0$ has $f'(x) = 0$ for $x < 0$ and $f'(x) = 1$ for $x > 0$, but $f$ is **not differentiable at $0$** (left and right derivatives disagree: $0$ vs $1$). Darboux's theorem forbids a globally defined derivative $f'$ that takes both $0$ and $1$ but skips intermediate values.

> **Remark (relation to continuity).** Darboux does **not** imply $f'$ is continuous. A classical example: $F(x) = x^2 \sin(1/x)$ for $x \neq 0$ and $F(0) = 0$. Direct computation gives
> $$F'(x) = 2x \sin(1/x) - \cos(1/x) \quad (x \neq 0), \qquad F'(0) = 0.$$
> Then $F'$ oscillates wildly near $0$: $\limsup_{x \to 0} F'(x) = 1$ and $\liminf = -1$, so $F'$ is discontinuous at $0$. Yet Darboux guarantees $F'$ has no "jump" — it attains every intermediate value near $0$.

---

## 23.5 Cauchy's Generalised MVT

A two-function version. The proof is the Rolle trick applied to a cleverly-chosen linear combination.

> **Theorem 23.8 (Cauchy's generalised MVT).**
> Let $f, g : [a, b] \to \mathbb{R}$ be continuous on $[a, b]$ and differentiable on $(a, b)$. Then there exists $\xi \in (a, b)$ with
> $$\bigl(f(b) - f(a)\bigr)\,g'(\xi) \;=\; \bigl(g(b) - g(a)\bigr)\,f'(\xi).$$
>
> **Ratio form.** If additionally $g(a) \neq g(b)$ and $g'(\xi) \neq 0$, this can be written
> $$\frac{f(b) - f(a)}{g(b) - g(a)} \;=\; \frac{f'(\xi)}{g'(\xi)}.$$

**Proof.** We construct an auxiliary function $h$ on $[a, b]$ that satisfies Rolle's hypotheses and whose zero gives the desired identity.

*Step 1: Construct $h$.* Define
$$h(x) \;:=\; \bigl(f(b) - f(a)\bigr)\,g(x) \;-\; \bigl(g(b) - g(a)\bigr)\,f(x), \qquad x \in [a, b].$$
This is a linear combination of $f$ and $g$ with fixed coefficients, designed to vanish at both endpoints.

*Step 2: Continuity and differentiability of $h$.*
- $h$ is a linear combination of $f$ and $g$, each continuous on $[a, b]$, hence $h$ is continuous on $[a, b]$.
- Similarly $h$ is differentiable on $(a, b)$, with
  $$h'(x) \;=\; \bigl(f(b) - f(a)\bigr)\,g'(x) \;-\; \bigl(g(b) - g(a)\bigr)\,f'(x).$$

*Step 3: Equal endpoint values.* Compute at $x = a$:
\begin{align*}
h(a) &= \bigl(f(b) - f(a)\bigr)\,g(a) - \bigl(g(b) - g(a)\bigr)\,f(a) \\
&= f(b)\,g(a) - f(a)\,g(a) - g(b)\,f(a) + g(a)\,f(a) \\
&= f(b)\,g(a) - f(a)\,g(b).
\end{align*}
At $x = b$:
\begin{align*}
h(b) &= \bigl(f(b) - f(a)\bigr)\,g(b) - \bigl(g(b) - g(a)\bigr)\,f(b) \\
&= f(b)\,g(b) - f(a)\,g(b) - g(b)\,f(b) + g(a)\,f(b) \\
&= g(a)\,f(b) - f(a)\,g(b) \\
&= f(b)\,g(a) - f(a)\,g(b).
\end{align*}
Hence $h(a) = h(b)$.

*Step 4: Apply Rolle to $h$.* Since $h$ satisfies all three hypotheses of Rolle's theorem on $[a, b]$, there exists $\xi \in (a, b)$ with $h'(\xi) = 0$:
$$\bigl(f(b) - f(a)\bigr)\,g'(\xi) - \bigl(g(b) - g(a)\bigr)\,f'(\xi) \;=\; 0,$$
which rearranges to the statement. $\blacksquare$

> **Special case: $g(x) = x$ recovers Lagrange's MVT.** With $g(x) = x$: $g(b) - g(a) = b - a$ and $g'(\xi) = 1$, so the identity becomes
> $$(f(b) - f(a)) \cdot 1 = (b - a) f'(\xi) \iff f'(\xi) = \frac{f(b) - f(a)}{b - a}.$$
> So Cauchy strictly generalises Lagrange.

> **Interpretive remark.** The Cauchy MVT compares the rates of change of two functions over the same interval. Viewed parametrically, if $(g(t), f(t))$ traces a curve in the plane as $t \in [a, b]$, then the chord joining $(g(a), f(a))$ to $(g(b), f(b))$ has slope
> $$\frac{f(b) - f(a)}{g(b) - g(a)},$$
> while the tangent to the curve at parameter $\xi$ has slope $f'(\xi)/g'(\xi)$. Cauchy's MVT asserts: somewhere on the curve, the tangent is parallel to the chord — exactly the geometric content of Lagrange's MVT, now applied to parametric curves.

> **Purpose of Cauchy MVT — two applications:**
>
> 1. **L'Hôpital's rule** ([[24-lhopital-vector-derivatives]]): reducing $\lim f/g$ to $\lim f'/g'$ relies on Cauchy MVT to match values of the two functions over shrinking intervals.
> 2. **Cauchy form of the remainder** in Taylor's theorem (§23.7 below).

---

## 23.6 Taylor's Theorem with Lagrange Remainder

The central approximation theorem. The $n$-th Taylor polynomial of $f$ at $a$ is the unique degree-$\leq n$ polynomial matching $f$ and its first $n$ derivatives at $a$; Taylor's theorem quantifies how well it approximates $f$ nearby.

> **Theorem 23.9 (Taylor's theorem with Lagrange remainder).**
> Let $f : [a, b] \to \mathbb{R}$ satisfy:
>
> - $f, f', f'', \ldots, f^{(n)}$ are all **continuous on** $[a, b]$;
> - $f^{(n+1)}$ **exists** on $(a, b)$.
>
> For each $x \in (a, b]$, there exists $\xi \in (a, x)$ such that
> $$f(x) \;=\; \underbrace{\sum_{k=0}^{n} \frac{f^{(k)}(a)}{k!}\,(x - a)^k}_{T_n(x;\,a)} \;+\; \underbrace{\frac{f^{(n+1)}(\xi)}{(n+1)!}\,(x - a)^{n+1}}_{R_n(x;\,a)}.$$
>
> The polynomial $T_n(x; a)$ is the **$n$-th Taylor polynomial** of $f$ centred at $a$. The term $R_n(x; a)$ is the **Lagrange form of the remainder**.

**Proof.** Fix $x \in (a, b]$. Since $x$ is fixed, we'll suppress it from notation and treat $a$ as the variable in an auxiliary function. The strategy is the same as before: define an auxiliary function vanishing at two points, apply Rolle, and unpack.

*Step 1: Define $M$.* There is a unique real number $M$ such that
$$f(x) \;=\; \sum_{k=0}^{n} \frac{f^{(k)}(a)}{k!}\,(x - a)^k \;+\; M\,(x - a)^{n+1},$$
namely
$$M \;:=\; \frac{f(x) - \sum_{k=0}^{n} \frac{f^{(k)}(a)}{k!}\,(x - a)^k}{(x - a)^{n+1}}.$$
(Note $x \neq a$, so the denominator is nonzero.) Our goal is to show $M = f^{(n+1)}(\xi)/(n+1)!$ for some $\xi \in (a, x)$.

*Step 2: Define the auxiliary function $g$.* Define $g : [a, x] \to \mathbb{R}$ by replacing $a$ by a variable $t$ in the defining identity, and subtracting:
$$g(t) \;:=\; f(x) \;-\; \sum_{k=0}^{n} \frac{f^{(k)}(t)}{k!}\,(x - t)^k \;-\; M\,(x - t)^{n+1}.$$
The function $g$ is the "error" when we use the $n$-th Taylor expansion centred at $t$ (instead of $a$) to approximate $f(x)$, with $M$ absorbed into the leading coefficient.

*Step 3: Continuity and differentiability.* Since each $f^{(k)}$ for $k = 0, 1, \ldots, n$ is continuous on $[a, b] \supseteq [a, x]$, and polynomial functions of $t$ are smooth, $g$ is continuous on $[a, x]$. Since $f^{(n+1)}$ exists on $(a, b) \supseteq (a, x)$, computing $g'(t)$ requires differentiating $f^{(k)}(t)$ for $k \leq n$, which yields $f^{(k+1)}(t)$ — all exist on $(a, x)$. So $g$ is differentiable on $(a, x)$.

*Step 4: Endpoint values.*
- **At $t = a$:**
  $$g(a) \;=\; f(x) - \sum_{k=0}^{n} \frac{f^{(k)}(a)}{k!}(x - a)^k - M(x - a)^{n+1} \;=\; 0$$
  by the definition of $M$ (Step 1).
- **At $t = x$:** Every term $(x - t)^k$ with $k \geq 1$ vanishes. Only the $k = 0$ term in the sum survives: $\frac{f^{(0)}(x)}{0!}(x - x)^0 = f(x)$. And $(x - x)^{n+1} = 0$. Hence
  $$g(x) \;=\; f(x) - f(x) - 0 \;=\; 0.$$
So $g(a) = g(x) = 0$.

*Step 5: Apply Rolle.* By Rolle's theorem (Theorem 23.1), there exists $\xi \in (a, x)$ with $g'(\xi) = 0$.

*Step 6: Compute $g'(t)$ — the telescoping miracle.* Differentiate $g$ term by term. The derivative of the $k$-th summand in the sum (for $k = 0, 1, \ldots, n$) is, by the product rule:
$$\frac{d}{dt}\!\left[\frac{f^{(k)}(t)}{k!}(x - t)^k\right] \;=\; \frac{f^{(k+1)}(t)}{k!}(x - t)^k \;-\; \frac{f^{(k)}(t)}{k!}\,k\,(x - t)^{k-1}.$$
For $k = 0$: $(x - t)^{-1}$ does not appear; the second piece vanishes (factor of $k = 0$). So the $k = 0$ term gives $f'(t)$.

For $k \geq 1$: simplify the second piece. $\frac{k}{k!} = \frac{1}{(k-1)!}$, so the second piece is $-\frac{f^{(k)}(t)}{(k-1)!}(x - t)^{k-1}$.

Summing over $k = 0, \ldots, n$:
\begin{align*}
\frac{d}{dt}\!\left[\sum_{k=0}^{n} \frac{f^{(k)}(t)}{k!}(x - t)^k\right]
&= \sum_{k=0}^{n} \frac{f^{(k+1)}(t)}{k!}(x - t)^k \;-\; \sum_{k=1}^{n}\frac{f^{(k)}(t)}{(k-1)!}(x - t)^{k-1} \\
&= \sum_{k=0}^{n} \frac{f^{(k+1)}(t)}{k!}(x - t)^k \;-\; \sum_{j=0}^{n-1}\frac{f^{(j+1)}(t)}{j!}(x - t)^{j}
\end{align*}
(re-indexing the second sum with $j = k - 1$).

The two sums **telescope**: all terms with index $\leq n - 1$ cancel, leaving only the $k = n$ term from the first sum:
$$\frac{d}{dt}\!\left[\sum_{k=0}^{n} \frac{f^{(k)}(t)}{k!}(x - t)^k\right] \;=\; \frac{f^{(n+1)}(t)}{n!}(x - t)^n.$$

Also, $\frac{d}{dt}\!\left[M(x - t)^{n+1}\right] = -M(n+1)(x - t)^n$.

Putting $g'(t)$ together (note the sign: $g = f(x) - [\text{sum}] - M(x - t)^{n+1}$):
$$g'(t) \;=\; 0 \;-\; \frac{f^{(n+1)}(t)}{n!}(x - t)^n \;-\; \bigl(-M(n+1)(x - t)^n\bigr) \;=\; -\frac{f^{(n+1)}(t)}{n!}(x - t)^n + M(n+1)(x - t)^n.$$

*Step 7: Solve $g'(\xi) = 0$.* Setting $g'(\xi) = 0$:
$$M(n+1)(x - \xi)^n \;=\; \frac{f^{(n+1)}(\xi)}{n!}(x - \xi)^n.$$
Since $\xi \in (a, x)$, we have $(x - \xi)^n > 0$ (for $n \geq 0$; if $n = 0$, both sides have $(x - \xi)^0 = 1$), and we can divide:
$$M(n+1) \;=\; \frac{f^{(n+1)}(\xi)}{n!},$$
hence
$$M \;=\; \frac{f^{(n+1)}(\xi)}{(n+1)!}.$$

Substituting back into the defining equation for $M$:
$$f(x) \;=\; \sum_{k=0}^{n} \frac{f^{(k)}(a)}{k!}(x - a)^k \;+\; \frac{f^{(n+1)}(\xi)}{(n+1)!}(x - a)^{n+1}. \qquad \blacksquare$$

> **Special case $n = 0$.** The statement becomes $f(x) = f(a) + f'(\xi)(x - a)$, which is exactly Lagrange's MVT (Theorem 23.2). So Taylor's theorem strictly generalises the MVT.

> **Taylor polynomial defined by matching data.** The polynomial $T_n(x; a) = \sum_{k=0}^{n} \frac{f^{(k)}(a)}{k!}(x - a)^k$ is characterised by the matching conditions
> $$T_n^{(k)}(a) \;=\; f^{(k)}(a) \quad \text{for } k = 0, 1, \ldots, n.$$
> It is the unique polynomial of degree $\leq n$ with this property. The remainder $R_n(x; a) = f(x) - T_n(x; a)$ measures how much the data at $a$ fails to determine $f$ away from $a$.

> **Standard Maclaurin series (centre $a = 0$).** By computing derivatives at $0$ and verifying the Lagrange remainder tends to $0$:
>
> - $e^x = \sum_{k=0}^\infty \frac{x^k}{k!}$ (converges for all $x \in \mathbb{R}$).
> - $\sin x = \sum_{k=0}^\infty \frac{(-1)^k x^{2k+1}}{(2k+1)!}$ (converges for all $x$).
> - $\cos x = \sum_{k=0}^\infty \frac{(-1)^k x^{2k}}{(2k)!}$ (converges for all $x$).
> - $\ln(1+x) = \sum_{k=1}^\infty \frac{(-1)^{k+1} x^k}{k}$ (converges for $-1 < x \leq 1$; diverges for $x > 1$ and $x \leq -1$).
> - $(1+x)^\alpha = \sum_{k=0}^\infty \binom{\alpha}{k} x^k$ (the **binomial series**; converges for $|x| < 1$; behaviour at $x = \pm 1$ depends on $\alpha$).
>
> In each case, convergence is proved by showing the Lagrange remainder $R_n(x) \to 0$ as $n \to \infty$ — typically via the bound $|R_n| \leq \sup_\xi |f^{(n+1)}(\xi)|\,|x|^{n+1}/(n+1)!$.

---

## 23.7 Alternative Forms of the Remainder

The Lagrange form is often the easiest to state but not always the easiest to bound. Two alternatives:

> **Cauchy form of the remainder.**
> $$R_n(x; a) \;=\; \frac{f^{(n+1)}(\xi)}{n!}\,(x - \xi)^n\,(x - a) \qquad \text{for some } \xi \in (a, x).$$
>
> **Derivation (sketch).** Apply **Cauchy's** MVT, not Rolle, to the pair $(g(t), \varphi(t))$ where $g$ is as in the Lagrange proof and $\varphi(t) = x - t$. The ratio $g(a)/\varphi(a)$ equals the derivative ratio $g'(\xi)/\varphi'(\xi)$, which unpacks to the Cauchy remainder. The advantage: the factor $(x - \xi)^n$ is **smaller** than $(x - a)^n$ when $\xi$ is near $x$, giving tighter bounds in certain convergence arguments (e.g., for $\ln(1+x)$ near $x = 1$).

> **Integral form of the remainder (assumes $f^{(n+1)}$ continuous on $[a, b]$).**
> $$R_n(x; a) \;=\; \int_a^x \frac{f^{(n+1)}(t)}{n!}\,(x - t)^n\, dt.$$
>
> **Derivation.** Repeated integration by parts, starting from the FTC:
> $$f(x) - f(a) \;=\; \int_a^x f'(t)\,dt.$$
> Integrate by parts with $u = f'(t), dv = dt$ and the antiderivative chosen as $v = t - x$ (not $v = t$):
> $$\int_a^x f'(t)\,dt \;=\; \Bigl[f'(t)(t - x)\Bigr]_a^x - \int_a^x f''(t)(t - x)\,dt \;=\; f'(a)(x - a) + \int_a^x f''(t)(x - t)\,dt.$$
> Iterate: at each step, one more Taylor-polynomial term is peeled off, and the integral remainder picks up another factor of $(x - t)/k$. After $n$ iterations:
> $$f(x) = \sum_{k=0}^{n} \frac{f^{(k)}(a)}{k!}(x - a)^k + \int_a^x \frac{f^{(n+1)}(t)}{n!}(x - t)^n\, dt.$$
>
> **Advantage of the integral form.** It is explicit (no mysterious $\xi$), it integrates rather than samples $f^{(n+1)}$, and it is easier to bound quantitatively via triangle-inequality estimates like
> $$|R_n(x)| \leq \frac{\|f^{(n+1)}\|_{\infty,[a,x]}}{(n+1)!}|x - a|^{n+1}.$$
> This is the form favoured in numerical analysis and functional-analytic settings.

> **Relationship among the three forms.** All three forms arise from the same identity
> $$f(x) - T_n(x; a) \;=\; \int_a^x \frac{f^{(n+1)}(t)}{n!}(x - t)^n\, dt.$$
> Applying the **integral MVT** (a consequence of the IVT and continuity, or the generalised MVT for integrals) to the right side, with $(x - t)^n$ as the weight, yields the Lagrange form. Applying Cauchy's MVT to the unintegrated identity yields the Cauchy form. Thus:
> - **Integral form** — the strongest, quantitative, requires continuity of $f^{(n+1)}$.
> - **Lagrange form** — requires only existence of $f^{(n+1)}$ on the open interval; the "nicest" to state.
> - **Cauchy form** — technical, useful for tight bounds near one endpoint.

---

## 23.8 Young's Form (Peano Remainder)

For applications to **local** behaviour (limits, Taylor expansions for L'Hôpital, etc.), only a qualitative "small-$o$" bound on the remainder is needed.

> **Theorem 23.10 (Taylor with Peano / little-$o$ remainder).**
> If $f$ is $n$ times differentiable **at the single point** $a$ (pointwise, no hypothesis on $f^{(n)}$ away from $a$), then
> $$f(x) \;=\; T_n(x; a) \;+\; o\bigl((x - a)^n\bigr) \qquad \text{as } x \to a.$$
> That is,
> $$\lim_{x \to a} \frac{f(x) - T_n(x; a)}{(x - a)^n} \;=\; 0.$$

**Proof sketch.** Apply L'Hôpital's rule (Cauchy MVT, [[24-lhopital-vector-derivatives]]) $n$ times, reducing the limit to $\lim_{x \to a} \frac{f^{(n)}(x) - f^{(n)}(a)}{n!}$, which is $0$ by the defining property $f^{(n)}(a) = \lim_{x \to a} \frac{f^{(n-1)}(x) - f^{(n-1)}(a)}{x - a}$ at the final differentiation.

*Interpretive remark.* This form is **weaker** than the Lagrange form (no control on $R_n$ away from $a$) but requires **weaker hypotheses** (only pointwise $n$-th differentiability, not $C^n$ smoothness). It's the "right" form for deriving local expansions and limits.

---

## 23.9 Worked Examples

---

**Example 1.** Use the MVT to prove: for $0 < a < b$,
$$\frac{b - a}{b} \;<\; \ln(b/a) \;<\; \frac{b - a}{a}.$$

**Setup.** We wish to sandwich $\ln(b/a) = \ln b - \ln a$ between two expressions involving $a, b$. The MVT applied to $\ln$ on $[a, b]$ produces exactly such an expression: $\ln b - \ln a = \frac{1}{\xi}(b - a)$ for some $\xi \in (a, b)$.

**Strategy.** Apply the MVT to $f(x) = \ln x$ on $[a, b]$. Then sandwich $1/\xi$ using $a < \xi < b$.

**Computation.**

*Step 1: MVT hypotheses.* $f(x) = \ln x$ is continuous on $[a, b] \subset (0, \infty)$ and differentiable on $(a, b)$, with $f'(x) = 1/x$.

*Step 2: Apply MVT.* There exists $\xi \in (a, b)$ with
$$\ln b - \ln a \;=\; f'(\xi)(b - a) \;=\; \frac{b - a}{\xi}.$$

*Step 3: Sandwich $1/\xi$.* Since $0 < a < \xi < b$, taking reciprocals reverses inequalities:
$$\frac{1}{b} \;<\; \frac{1}{\xi} \;<\; \frac{1}{a}.$$

*Step 4: Multiply by $(b - a) > 0$* (this preserves the direction):
$$\frac{b - a}{b} \;<\; \frac{b - a}{\xi} \;<\; \frac{b - a}{a}.$$
Substituting the MVT identity from Step 2 into the middle:
$$\frac{b - a}{b} \;<\; \ln(b/a) \;<\; \frac{b - a}{a}. \qquad\blacksquare$$

**Verification.** Test with $a = 1, b = e$: the bounds are $(e - 1)/e \approx 0.632$ and $(e - 1)/1 \approx 1.718$. The middle is $\ln(e/1) = 1$. Indeed $0.632 < 1 < 1.718$. ✓

**Interpretation.** The inequality says: the logarithm's growth over an interval is controlled above by $1/a$ (the derivative at the left endpoint) times the length and below by $1/b$ (the derivative at the right endpoint). This is the generic pattern for **concave** (decreasing-derivative) functions; for convex functions the direction reverses.

---

**Example 2.** Prove: $|\sin x - \sin y| \leq |x - y|$ for all $x, y \in \mathbb{R}$.

**Setup.** The claim is that $\sin$ is **$1$-Lipschitz**. We apply Theorem 23.6 with $L = 1$.

**Strategy.** Verify $|\sin'(x)| = |\cos x| \leq 1$ everywhere; then conclude via Theorem 23.6.

**Computation.**

*Step 1:* $f(x) = \sin x$ is differentiable on $\mathbb{R}$ with $f'(x) = \cos x$.

*Step 2:* $|\cos x| \leq 1$ for all $x$ (trigonometric identity or derivative of $\sin^2 + \cos^2 = 1$).

*Step 3: Apply Theorem 23.6 with $L = 1$:*
$$|\sin x - \sin y| \;\leq\; 1 \cdot |x - y| \;=\; |x - y|. \qquad \blacksquare$$

**Verification.** At $x = \pi, y = 0$: LHS $= |0 - 0| = 0$, RHS $= \pi$. $0 \leq \pi$. ✓ At $x = \pi/2, y = 0$: LHS $= |1 - 0| = 1$, RHS $= \pi/2 \approx 1.571$. $1 \leq 1.571$. ✓ Notice equality is not achieved except trivially (at $x = y$), because $|\cos|$ is not identically $1$.

**Interpretation.** This is a standard "Lipschitz from bounded derivative" bound. Consequences: $\sin$ is uniformly continuous on $\mathbb{R}$, and any contracting iteration built from $\sin$ is numerically stable. The same argument shows $\cos$ is $1$-Lipschitz.

---

**Example 3.** Use Taylor's theorem to estimate $\sqrt{1.1}$ and bound the error.

**Setup.** We want a polynomial approximation to $f(x) = \sqrt{1 + x}$ near $x = 0$, together with a rigorous error bound.

**Strategy.** Expand $f$ to degree $n = 2$ about $a = 0$, evaluate at $x = 0.1$, and bound $|R_2(0.1)|$ using the Lagrange remainder.

**Computation.**

*Step 1: Derivatives of $f(x) = (1+x)^{1/2}$ and their values at $a = 0$.*
- $f(x) = (1 + x)^{1/2}$, $f(0) = 1$.
- $f'(x) = \tfrac{1}{2}(1 + x)^{-1/2}$, $f'(0) = \tfrac{1}{2}$.
- $f''(x) = -\tfrac{1}{4}(1 + x)^{-3/2}$, $f''(0) = -\tfrac{1}{4}$.
- $f'''(x) = \tfrac{3}{8}(1 + x)^{-5/2}$.

*Step 2: Taylor polynomial $T_2$ at $a = 0$.*
$$T_2(x) = 1 + \tfrac{1}{2}\,x + \frac{-1/4}{2!}\,x^2 = 1 + \tfrac{1}{2}\,x - \tfrac{1}{8}\,x^2.$$

*Step 3: Evaluate at $x = 0.1$.*
$$T_2(0.1) \;=\; 1 + 0.05 - \frac{1}{8}(0.01) \;=\; 1 + 0.05 - 0.00125 \;=\; 1.04875.$$

*Step 4: Bound the Lagrange remainder.* With $n = 2$:
$$R_2(0.1) \;=\; \frac{f'''(\xi)}{3!}(0.1)^3 \;=\; \frac{1}{6} \cdot \tfrac{3}{8}(1 + \xi)^{-5/2} \cdot 0.001 \;=\; \frac{0.001}{16(1 + \xi)^{5/2}}$$
for some $\xi \in (0, 0.1)$. Since $\xi > 0$, $(1 + \xi)^{5/2} > 1$, so
$$|R_2(0.1)| \;\leq\; \frac{0.001}{16} \;=\; 6.25 \times 10^{-5}.$$

*Step 5: Conclude.* $\sqrt{1.1} \approx 1.04875$ with error at most $6.25 \times 10^{-5}$.

**Verification.** True value: $\sqrt{1.1} = 1.048808848\ldots$, so actual error is $1.048808848 - 1.04875 \approx 5.88 \times 10^{-5}$, within our bound $6.25 \times 10^{-5}$. ✓

**Interpretation.** Three data points ($f(0), f'(0), f''(0)$) gave four-digit accuracy at a point $10\%$ away. More generally, Taylor polynomials of degree $n$ give errors of order $|x|^{n+1}$ — exponential convergence for bounded higher derivatives.

---

**Example 4.** Prove: if $f : \mathbb{R} \to \mathbb{R}$ is differentiable with $f'$ bounded, then $f$ is **uniformly continuous** on $\mathbb{R}$.

**Setup.** Uniform continuity on $\mathbb{R}$ requires: $\forall \varepsilon > 0, \exists \delta > 0$ such that $|x - y| < \delta \Rightarrow |f(x) - f(y)| < \varepsilon$ for all $x, y \in \mathbb{R}$. The challenge on $\mathbb{R}$ is that $\delta$ must be **independent of location** (not just of one variable given the other).

**Strategy.** The hypothesis $|f'| \leq L$ globally, via Theorem 23.6, gives global $L$-Lipschitz, which is stronger than uniform continuity.

**Computation.**

*Step 1:* Let $L$ be such that $|f'(x)| \leq L$ for all $x \in \mathbb{R}$.

*Step 2: Apply Theorem 23.6 with $I = \mathbb{R}$:*
$$|f(x) - f(y)| \;\leq\; L\,|x - y| \quad \text{for all } x, y \in \mathbb{R}.$$

*Step 3: Choose $\delta$.* Given $\varepsilon > 0$, set $\delta := \varepsilon / L$ if $L > 0$ (or any positive $\delta$ if $L = 0$, since then $f$ is constant).

*Step 4: Conclude.* If $|x - y| < \delta = \varepsilon/L$, then
$$|f(x) - f(y)| \;\leq\; L \cdot |x - y| \;<\; L \cdot (\varepsilon/L) \;=\; \varepsilon.$$
So $f$ is uniformly continuous. $\blacksquare$

**Verification.** Test with $f(x) = \sin x$: $|f'| = |\cos| \leq 1$, so $L = 1, \delta = \varepsilon$. Indeed, $|\sin x - \sin y| \leq |x - y|$ from Example 2. Uniform continuity confirmed.

**Interpretation.** Bounded-derivative $\Rightarrow$ Lipschitz $\Rightarrow$ uniformly continuous $\Rightarrow$ continuous. The implications are **strict** in each direction: e.g., $\sqrt{x}$ on $[0, 1]$ is uniformly continuous but not Lipschitz (derivative unbounded near $0$), and $x \sin(1/x)$ extended by $0$ on $[0, 1]$ is continuous but not uniformly continuous... wait, actually it is on $[0, 1]$ (compact). A correct example of continuous-not-uniformly-continuous: $f(x) = x^2$ on $\mathbb{R}$ is continuous but not uniformly continuous (derivative unbounded).

---

**Example 5.** Prove: $f(x) = x^2$ is **strictly convex** on $\mathbb{R}$ using Taylor's theorem.

**Setup.** Strict convexity means
$$f\!\left(\frac{a + b}{2}\right) \;<\; \frac{f(a) + f(b)}{2} \quad \text{for all } a \neq b.$$

**Strategy.** Expand $f(a)$ and $f(b)$ in Taylor series about the midpoint $c = (a + b)/2$. Add the two expansions; the linear terms cancel because $(a - c) + (b - c) = 0$, and the remaining quadratic terms give the convexity inequality.

**Computation.**

*Step 1: Set $c = (a + b)/2$.* For $f(x) = x^2$: $f'(x) = 2x$, $f''(x) = 2$ (constant).

*Step 2: Taylor expansion at $c$ with $n = 1$.* For some $\xi_1$ between $a, c$ and some $\xi_2$ between $c, b$:
$$f(a) = f(c) + f'(c)(a - c) + \frac{f''(\xi_1)}{2}(a - c)^2,$$
$$f(b) = f(c) + f'(c)(b - c) + \frac{f''(\xi_2)}{2}(b - c)^2.$$

*Step 3: Use $f'' \equiv 2$ (constant).* Both $f''(\xi_1) = f''(\xi_2) = 2$.

*Step 4: Add.*
\begin{align*}
f(a) + f(b) &= 2f(c) + f'(c)\bigl[(a - c) + (b - c)\bigr] + \frac{2}{2}(a - c)^2 + \frac{2}{2}(b - c)^2 \\
&= 2f(c) + f'(c) \cdot 0 + (a - c)^2 + (b - c)^2 \\
&= 2f(c) + (a - c)^2 + (b - c)^2.
\end{align*}
(We used $(a - c) + (b - c) = (a + b) - 2c = 0$.)

*Step 5: Analyse the correction term.* For $a \neq b$: $a - c \neq 0$ and $b - c \neq 0$, so
$$(a - c)^2 + (b - c)^2 \;>\; 0.$$
Hence
$$f(a) + f(b) \;>\; 2 f(c),$$
which rearranges to
$$\frac{f(a) + f(b)}{2} \;>\; f(c) \;=\; f\!\left(\frac{a+b}{2}\right). \qquad \blacksquare$$

**Verification.** Test with $a = 0, b = 2$: LHS $= (0 + 4)/2 = 2$, RHS $= f(1) = 1$. $2 > 1$. ✓ Test with $a = -1, b = 1$: LHS $= (1 + 1)/2 = 1$, RHS $= f(0) = 0$. $1 > 0$. ✓

**Interpretation.** The argument generalises: if $f'' > 0$ on an interval, then $f$ is strictly convex. This is the standard **second-derivative test for convexity**. For $f'' \geq 0$ we get (non-strict) convexity. The symmetry trick $(a - c) + (b - c) = 0$ converts the Taylor remainder into a nonnegative quantity precisely because of the convexity sign of $f''$.

---

## 23.10 Practice Problems

---

**1.** Use the MVT to prove: $\dfrac{x}{1+x} < \ln(1 + x) < x$ for $x > 0$.

**2.** Let $f : [0, \infty) \to \mathbb{R}$ be differentiable with $\lim_{x \to \infty} f'(x) = L$. Prove $\lim_{x \to \infty} f(x)/x = L$.

**3.** Prove: if $f'(x) \geq 0$ for all $x \in (a, b)$ and $f'$ is not identically zero on any subinterval of $(a, b)$, then $f$ is strictly increasing on $[a, b]$.

**4.** Use Taylor's theorem to show $\bigl|\cos x - (1 - x^2/2)\bigr| \leq |x|^3/6$ for all $x \in \mathbb{R}$.

**5.** Let $f : [0, 1] \to \mathbb{R}$ be $C^2$ with $f(0) = f(1) = 0$ and $|f''(x)| \leq M$ for all $x \in [0, 1]$. Show $|f(x)| \leq M/8$ for all $x \in [0, 1]$.

---

### Solutions

---

**Solution 1.** $\dfrac{x}{1+x} < \ln(1 + x) < x$ for $x > 0$.

**Setup.** Same pattern as Worked Example 1 — apply the MVT to $\ln(1 + t)$ on $[0, x]$ and sandwich.

**Strategy.** Let $f(t) = \ln(1 + t)$. Apply MVT on $[0, x]$.

**Computation.**

*Step 1:* $f$ is continuous on $[0, x]$ and differentiable on $(0, x)$, with $f'(t) = 1/(1 + t)$.

*Step 2: MVT.* There exists $\xi \in (0, x)$ with
$$\ln(1 + x) - \ln 1 \;=\; f'(\xi)(x - 0) \;=\; \frac{x}{1 + \xi}.$$
Since $\ln 1 = 0$:
$$\ln(1 + x) \;=\; \frac{x}{1 + \xi}.$$

*Step 3: Sandwich.* For $\xi \in (0, x)$: $1 < 1 + \xi < 1 + x$. Taking reciprocals (all positive):
$$\frac{1}{1 + x} \;<\; \frac{1}{1 + \xi} \;<\; 1.$$
Multiplying by $x > 0$:
$$\frac{x}{1 + x} \;<\; \frac{x}{1 + \xi} \;<\; x.$$

*Step 4:* Substitute $\ln(1 + x) = x/(1 + \xi)$:
$$\frac{x}{1 + x} \;<\; \ln(1 + x) \;<\; x. \qquad\blacksquare$$

**Verification.** Test $x = 1$: bounds $1/2 \approx 0.5$ and $1$. $\ln 2 \approx 0.693$. Indeed $0.5 < 0.693 < 1$. ✓

**Interpretation.** This is the prototype inequality for logarithms; the lower bound $x/(1+x)$ is used in proofs of AM-GM, and the upper bound $\ln(1 + x) \leq x$ is used in probability (moment generating function bounds), in information theory (Gibbs' inequality), and in analytic number theory (Stirling-type estimates).

---

**Solution 2.** $\lim_{x \to \infty} f(x)/x = L$ given $\lim_{x \to \infty} f'(x) = L$.

**Setup.** Given an $\varepsilon$-neighbourhood of $L$ for $f'$, deduce an $\varepsilon$-neighbourhood of $L$ for $f(x)/x$ at large $x$.

**Strategy.** Apply MVT on $[N, x]$ for a well-chosen threshold $N$ and let $x \to \infty$.

**Computation.**

*Step 1: Fix $\varepsilon > 0$ and find $N$.* By the hypothesis $f'(t) \to L$, there exists $N > 0$ such that
$$|f'(t) - L| \;<\; \varepsilon \quad \text{for all } t > N.$$

*Step 2: Apply MVT on $[N, x]$ for $x > N$.* Since $f$ is differentiable on $(0, \infty)$ hence on $(N, x)$, and continuous on $[N, x]$, the MVT gives $\xi \in (N, x)$ with
$$f(x) - f(N) \;=\; f'(\xi)(x - N).$$

*Step 3: Divide by $x$ and rearrange.*
$$\frac{f(x)}{x} \;=\; \frac{f(N)}{x} \;+\; \frac{f'(\xi)(x - N)}{x} \;=\; \frac{f(N)}{x} \;+\; f'(\xi)\!\left(1 - \frac{N}{x}\right).$$

*Step 4: Bound the error from $L$.*
\begin{align*}
\left|\frac{f(x)}{x} - L\right| &= \left|\frac{f(N)}{x} + f'(\xi)\!\left(1 - \frac{N}{x}\right) - L\right| \\
&\leq \left|\frac{f(N)}{x}\right| + \left|f'(\xi)\!\left(1 - \frac{N}{x}\right) - L\right| \\
&\leq \left|\frac{f(N)}{x}\right| + \left|f'(\xi) - L\right|\!\left(1 - \frac{N}{x}\right) + |L|\!\left|\left(1 - \frac{N}{x}\right) - 1\right| \\
&= \left|\frac{f(N)}{x}\right| + \left|f'(\xi) - L\right|\!\left(1 - \frac{N}{x}\right) + |L| \cdot \frac{N}{x}.
\end{align*}

*Step 5: Take $x \to \infty$.* As $x \to \infty$:
- $|f(N)/x| \to 0$ (since $f(N)$ is fixed and $x \to \infty$).
- $|L| \cdot N/x \to 0$.
- $(1 - N/x) \to 1$, and $|f'(\xi) - L| < \varepsilon$ (since $\xi > N$).

Therefore
$$\limsup_{x \to \infty}\left|\frac{f(x)}{x} - L\right| \;\leq\; 0 + \varepsilon \cdot 1 + 0 \;=\; \varepsilon.$$

*Step 6: Conclude.* Since $\varepsilon > 0$ was arbitrary, $\limsup = 0$, i.e., $f(x)/x \to L$. $\blacksquare$

**Verification.** Test with $f(x) = x + \sin x$: $f'(x) = 1 + \cos x$, which does **not** converge as $x \to \infty$ — so the hypothesis fails and we cannot apply the theorem (and indeed $f(x)/x = 1 + \sin(x)/x \to 1$, which happens to be $\lim \inf f'$). Test with $f(x) = x + \sqrt{x}$: $f'(x) = 1 + 1/(2\sqrt{x}) \to 1$, so $L = 1$. And $f(x)/x = 1 + 1/\sqrt{x} \to 1$. ✓

**Interpretation.** This is a discrete analogue of "average = derivative at infinity." It is used in **Cesàro-type averaging arguments** and in the theory of **regularly varying functions**. The converse (from $f(x)/x \to L$ deduce $f'(x) \to L$) is **false** (e.g., $f(x) = x + x\sin(\ln x)$).

---

**Solution 3.** If $f' \geq 0$ on $(a, b)$ and $f'$ is not identically zero on any subinterval, then $f$ is strictly increasing on $[a, b]$.

**Setup.** Non-strict monotonicity (Theorem 23.5(a)) is given. We upgrade to strict by contradiction.

**Strategy.** Suppose $f(x_1) = f(x_2)$ for some $x_1 < x_2$; deduce $f' \equiv 0$ on $(x_1, x_2)$, contradicting the hypothesis.

**Computation.**

*Step 1: Assume for contradiction.* Suppose $f$ is not strictly increasing. Then there exist $x_1, x_2 \in [a, b]$ with $x_1 < x_2$ and $f(x_1) \geq f(x_2)$.

*Step 2: Rule out strict decrease.* By Theorem 23.5(a), $f' \geq 0 \Rightarrow f$ is nondecreasing, so $f(x_1) \leq f(x_2)$. Combined with Step 1, $f(x_1) = f(x_2)$.

*Step 3: $f$ is constant on $[x_1, x_2]$.* For any $y \in [x_1, x_2]$, nondecreasingness gives
$$f(x_1) \;\leq\; f(y) \;\leq\; f(x_2) \;=\; f(x_1),$$
so $f(y) = f(x_1)$ throughout. Hence $f$ is constant on $[x_1, x_2]$.

*Step 4: Derivative vanishes on $(x_1, x_2)$.* Since $f \equiv \text{const}$ on $[x_1, x_2]$, for any $y \in (x_1, x_2)$:
$$f'(y) \;=\; \lim_{h \to 0}\frac{f(y + h) - f(y)}{h} \;=\; \lim_{h \to 0} \frac{0}{h} \;=\; 0.$$
So $f'(y) = 0$ for all $y \in (x_1, x_2)$, i.e., $f' \equiv 0$ on $(x_1, x_2)$.

*Step 5: Contradiction.* $(x_1, x_2)$ is a subinterval of $(a, b)$ on which $f' \equiv 0$, contradicting the hypothesis. $\blacksquare$

**Verification.** Test with $f(x) = x^3$ on $[-1, 1]$: $f'(x) = 3x^2 \geq 0$, with $f'(0) = 0$ but $f'$ nonzero elsewhere. $f'$ is not zero on any subinterval. $f$ is indeed strictly increasing: $-1 < 0 < 1 \Rightarrow -1 < 0 < 1$ in values. ✓

**Interpretation.** The full criterion for strict monotonicity is: $f' \geq 0$ **plus** $f'$ nonzero on every subinterval. This rules out plateau regions without requiring $f' > 0$ everywhere.

---

**Solution 4.** $\bigl|\cos x - (1 - x^2/2)\bigr| \leq |x|^3/6$ for all $x \in \mathbb{R}$.

**Setup.** Recognise $1 - x^2/2$ as the Taylor polynomial $T_2(x; 0)$ for $\cos x$. The remainder $R_2$ is the difference.

**Strategy.** Write $\cos x = T_2 + R_2$ with $R_2$ in Lagrange form; bound $|R_2|$.

**Computation.**

*Step 1: Derivatives of $f(x) = \cos x$ at $0$.*
- $f(x) = \cos x, f(0) = 1$.
- $f'(x) = -\sin x, f'(0) = 0$.
- $f''(x) = -\cos x, f''(0) = -1$.
- $f'''(x) = \sin x$ (not evaluated at $0$; needed at $\xi$).

*Step 2: Taylor polynomial and remainder.*
$$T_2(x; 0) \;=\; 1 + 0 \cdot x + \frac{-1}{2!}\,x^2 \;=\; 1 - \frac{x^2}{2}.$$
By Theorem 23.9 (Lagrange remainder with $n = 2$), for every $x \neq 0$ there exists $\xi$ between $0$ and $x$ such that
$$\cos x \;=\; T_2(x; 0) \;+\; \frac{f'''(\xi)}{3!}\,x^3 \;=\; 1 - \frac{x^2}{2} + \frac{\sin \xi}{6}\,x^3.$$
For $x = 0$, both sides are $1$, and the inequality is $0 \leq 0$, trivially true.

*Step 3: Bound the remainder.*
$$\left|\cos x - \!\left(1 - \frac{x^2}{2}\right)\!\right| \;=\; \left|\frac{\sin \xi}{6}\,x^3\right| \;=\; \frac{|\sin \xi|}{6}\,|x|^3 \;\leq\; \frac{1}{6}\,|x|^3,$$
using $|\sin \xi| \leq 1$. $\blacksquare$

**Verification.** At $x = 1$: LHS $= |\cos 1 - 0.5| \approx |0.5403 - 0.5| = 0.0403$. RHS $= 1/6 \approx 0.1667$. $0.0403 \leq 0.1667$. ✓ At $x = 0.1$: LHS $\approx |0.9950 - 0.9950| \approx 1.67 \times 10^{-6}$. RHS $= 10^{-3}/6 \approx 1.67 \times 10^{-4}$. ✓ (Bound is not tight but correct.)

**Interpretation.** A Taylor polynomial of degree $2$ approximates $\cos$ with error $O(|x|^3)$ near $0$. The same argument with higher-degree polynomials gives tighter bounds: $|\cos x - (1 - x^2/2 + x^4/24)| \leq |x|^6/720$, etc. The **uniform boundedness** of all derivatives of $\cos$ (by $1$) is what makes the Taylor series converge globally.

---

**Solution 5.** $f : [0, 1] \to \mathbb{R}$ is $C^2$, $f(0) = f(1) = 0$, $|f''| \leq M$. Show $|f(x)| \leq M/8$ for all $x \in [0, 1]$.

**Setup.** Expand $f(0)$ and $f(1)$ in Taylor series about an arbitrary point $c \in [0, 1]$ — this gives two equations relating $f(c), f'(c)$, and the unknown remainder values. Eliminate $f'(c)$ to solve for $f(c)$.

**Strategy.** Use Taylor's theorem with $n = 1$ centred at $c$, once for $x = 0$ and once for $x = 1$. Form a linear combination that eliminates the $f'(c)$ term.

**Computation.**

*Step 1: Taylor expansions at $c$ with $n = 1$.* For some $\xi_1 \in (0, c)$ (or $(c, 0)$ if $c > 0$, but $c \geq 0$, and we assume WLOG $c > 0$ for the expansion at $0$; the edge case $c = 0$ is trivial because $f(0) = 0$):
$$f(0) = f(c) + f'(c)(0 - c) + \frac{f''(\xi_1)}{2}(0 - c)^2 = f(c) - c\,f'(c) + \frac{c^2}{2}f''(\xi_1).$$
For some $\xi_2 \in (c, 1)$:
$$f(1) = f(c) + f'(c)(1 - c) + \frac{f''(\xi_2)}{2}(1 - c)^2.$$

*Step 2: Use $f(0) = f(1) = 0$.*
$$0 = f(c) - c\,f'(c) + \frac{c^2}{2}f''(\xi_1), \tag{A}$$
$$0 = f(c) + (1 - c)f'(c) + \frac{(1-c)^2}{2}f''(\xi_2). \tag{B}$$

*Step 3: Eliminate $f'(c)$.* Multiply (A) by $(1 - c)$ and (B) by $c$, then add:
\begin{align*}
0 &= (1-c)\!\left[f(c) - c\,f'(c) + \frac{c^2}{2}f''(\xi_1)\right] + c\!\left[f(c) + (1-c)f'(c) + \frac{(1-c)^2}{2}f''(\xi_2)\right] \\
&= (1-c)f(c) + c\,f(c) + f'(c)[-c(1-c) + c(1-c)] + \frac{(1-c)c^2}{2}f''(\xi_1) + \frac{c(1-c)^2}{2}f''(\xi_2) \\
&= f(c) + \frac{(1-c)c^2}{2}f''(\xi_1) + \frac{c(1-c)^2}{2}f''(\xi_2).
\end{align*}
(The $f'(c)$ terms cancel. The sum $(1-c) + c = 1$ multiplies $f(c)$.)

*Step 4: Solve for $f(c)$.*
$$f(c) \;=\; -\frac{(1-c)c^2}{2}f''(\xi_1) \;-\; \frac{c(1-c)^2}{2}f''(\xi_2) \;=\; -\frac{c(1-c)}{2}\bigl[c\,f''(\xi_1) + (1-c)f''(\xi_2)\bigr].$$

*Step 5: Bound.* Take absolute values, use $|f''| \leq M$:
$$|f(c)| \;\leq\; \frac{c(1-c)}{2}\bigl[c \cdot M + (1-c)\cdot M\bigr] \;=\; \frac{c(1-c)}{2} \cdot M \cdot [c + (1-c)] \;=\; \frac{M\,c(1-c)}{2}.$$

*Step 6: Maximise $c(1-c)$.* The function $c(1-c) = c - c^2$ has derivative $1 - 2c$, vanishing at $c = 1/2$. Second derivative $-2 < 0$, so $c = 1/2$ is the maximum. Maximum value: $(1/2)(1/2) = 1/4$. Hence
$$|f(c)| \;\leq\; \frac{M}{2} \cdot \frac{1}{4} \;=\; \frac{M}{8} \qquad \text{for all } c \in [0, 1]. \qquad \blacksquare$$

**Verification.** Take $f(x) = x(1 - x)$ (times a scale factor). Then $f(0) = f(1) = 0$, $f''(x) = -2$, so $M = 2$. Maximum of $|f|$ is at $x = 1/2$: $|f(1/2)| = 1/4$. The bound gives $M/8 = 2/8 = 1/4$. **Equality achieved.** ✓ This shows the bound $M/8$ is **sharp** — the extremal function is (up to sign) $f(x) = M x(1 - x)/2$, wait let me recheck: for $f = x(1-x)$ we have $f'' = -2$, $|f''| = 2 = M$, and $f(1/2) = 1/4 = M/8$. ✓

**Interpretation.** This is an **a priori bound** of the sort central to PDE theory: the maximum value of a function with controlled second derivative and prescribed boundary values (here, zero). It is a one-dimensional Green's function estimate, related to the maximum principle.

---

## 23.11 Summary

> **Mean Value Theorem hierarchy:**
>
> | Theorem | Hypothesis | Conclusion |
> |---------|-----------|------------|
> | **Rolle** | $f$ cts on $[a,b]$, diff on $(a,b)$, $f(a)=f(b)$ | $\exists \xi \in (a,b) : f'(\xi) = 0$ |
> | **Lagrange** | $f$ cts on $[a,b]$, diff on $(a,b)$ | $\exists \xi : f'(\xi) = (f(b)-f(a))/(b-a)$ |
> | **Cauchy** | Two functions $f,g$ cts + diff | $\exists \xi : (f(b)-f(a))g'(\xi) = (g(b)-g(a))f'(\xi)$ |
> | **Darboux** | $f$ differentiable on $[a,b]$ | $f'$ has the intermediate value property |
> | **Taylor** | $f$ is $C^n$ with $f^{(n+1)}$ existing | $R_n(x) = f^{(n+1)}(\xi)\,(x-a)^{n+1}/(n+1)!$ |

> **The corollary toolkit (MVT applied practically):**
>
> | Result | Hypothesis | Conclusion |
> |--------|-----------|------------|
> | Constant test | $f' \equiv 0$ on interval | $f$ constant |
> | Uniqueness | $f' = g'$ on interval | $f - g$ constant |
> | Non-strict monotonicity | $f' \geq 0$ | $f$ nondecreasing |
> | Strict monotonicity | $f' > 0$ | $f$ strictly increasing |
> | Sharp strict monotonicity | $f' \geq 0$ + nonzero on each subinterval | $f$ strictly increasing |
> | Lipschitz | $|f'| \leq L$ | $f$ is $L$-Lipschitz |
> | Uniform continuity | $f'$ bounded | $f$ uniformly continuous |

> **Three forms of the Taylor remainder, summarised:**
>
> Setting $h = x - a$ and assuming hypotheses apply:
>
> - **Lagrange:** $R_n = \dfrac{f^{(n+1)}(\xi)}{(n+1)!}\,h^{n+1}$, for some $\xi \in (a, x)$. Easiest to state, requires only pointwise $(n+1)$-th differentiability.
> - **Cauchy:** $R_n = \dfrac{f^{(n+1)}(\xi)}{n!}\,(x - \xi)^n\,h$, for some $\xi$. Useful near one endpoint.
> - **Integral:** $R_n = \int_a^x \dfrac{f^{(n+1)}(t)}{n!}\,(x - t)^n\,dt$. Most quantitative; requires $f^{(n+1)}$ continuous.

> **Conceptual picture.** The MVT — and its higher-order cousin Taylor's theorem — is the **bridge between pointwise data and global/interval data.** Knowing the derivative at every point ($f'$) gives knowledge of how $f$ changes over any interval: how fast, how much, in which direction. This is the **one-dimensional precursor to the Fundamental Theorem of Calculus**, and the conceptual seed of every theorem in the subject that relates local behaviour to global consequences (maximum principle, Picard iteration, convergence of Taylor series, Morse theory, etc.).

---

## Related Topics

- [[22-differentiation]] — derivative definition, algebraic rules, Fermat's stationary point theorem.
- [[24-lhopital-vector-derivatives]] — L'Hôpital's rule proved via Cauchy MVT; extension to vector-valued derivatives.
- [[20-ivt-and-connectedness]] — Extreme Value Theorem used in the proof of Rolle.
- [[25-riemann-stieltjes-integral]] — Mean Value Theorem for integrals, and the Fundamental Theorem of Calculus.
- [[12-infinite-series-introduction]] — Taylor series as the limit $n \to \infty$ of Taylor polynomials.
- [[14-alternating-and-absolute-convergence]] — convergence of Taylor series via remainder estimates.
