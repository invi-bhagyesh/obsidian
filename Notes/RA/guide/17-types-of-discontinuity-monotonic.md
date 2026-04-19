# 17. Types of Discontinuity and Monotonic Functions

> **The central theme.** A function that is not continuous at a point can fail in several qualitatively different ways. Classifying these failure modes illuminates both the nature of continuity and the structure of pathological functions. Moreover, **monotonic** functions — despite their seemingly restrictive definition — are automatically well-behaved: they can have only simple (jump) discontinuities, and the set of such points is always **countable**.
>
> This chapter presents the three-fold classification (removable, jump, essential), proves that monotone functions have only jump discontinuities and countably many of them, establishes the continuity-through-image-interval criterion, and shows that continuous strictly monotone functions have continuous inverses. These results are among the most frequently tested topics on graduate qualifying exams in real analysis.

---

## 17.1 One-Sided Limits Revisited

Recall from [[16-continuity]] the one-sided limits
$$f(a^+) = \lim_{x \to a^+} f(x), \qquad f(a^-) = \lim_{x \to a^-} f(x).$$

Formally, $f(a^+) = L$ means: for every $\varepsilon > 0$, there exists $\delta > 0$ such that
$$a < x < a + \delta \implies |f(x) - L| < \varepsilon.$$
The one-sided limit $f(a^-)$ is defined analogously with $a - \delta < x < a$. These are well-defined provided $f$ is defined on a punctured right (resp. left) neighbourhood of $a$.

> **Lemma 17.0 (Continuity via one-sided limits).** $f$ is continuous at $a$ if and only if both one-sided limits $f(a^+)$ and $f(a^-)$ exist (as finite real numbers) and equal $f(a)$.

**Proof.** $(\Rightarrow)$ If $\lim_{x \to a} f(x) = f(a)$, then every one-sided approach must also converge to $f(a)$, since it is a restriction of the two-sided limit.

$(\Leftarrow)$ Given $\varepsilon > 0$, choose $\delta_+$ so that $a < x < a + \delta_+ \Rightarrow |f(x) - f(a)| < \varepsilon$, and similarly $\delta_-$ for the left limit. Set $\delta = \min(\delta_+, \delta_-) > 0$. Then for $0 < |x - a| < \delta$, whichever side $x$ lies on, $|f(x) - f(a)| < \varepsilon$. Also $|f(a) - f(a)| = 0 < \varepsilon$. So $\lim_{x \to a} f(x) = f(a)$. $\blacksquare$

Continuity at $a$ can thus fail in exactly three ways:

1. **(Removable mode)** Both one-sided limits exist and are equal to a common value $L$, but $L \neq f(a)$ (or $f(a)$ is undefined).
2. **(Jump mode)** Both one-sided limits exist and are finite, but they differ: $f(a^+) \neq f(a^-)$.
3. **(Essential mode)** At least one one-sided limit fails to exist (as a finite real number).

This trichotomy is exhaustive and gives rise to the three standard types of discontinuity.

---

## 17.2 Classification of Discontinuities

> **Definition 17.1 (Removable discontinuity).**
> $f$ has a **removable discontinuity** at $a$ if $\lim_{x \to a} f(x) = L$ exists as a finite real number (so both one-sided limits exist and equal $L$), but either $f(a) \neq L$ or $f(a)$ is undefined.

The discontinuity can be "removed" by redefining $f(a) = L$: the resulting function $\tilde{f}$ with $\tilde{f}(x) = f(x)$ for $x \neq a$ and $\tilde{f}(a) = L$ is continuous at $a$.

**Examples.**
- $f(x) = \dfrac{\sin x}{x}$ for $x \neq 0$. Using the standard limit $\lim_{x \to 0} \frac{\sin x}{x} = 1$, we get $f(0^+) = f(0^-) = 1$, but $f(0)$ is undefined. Setting $f(0) = 1$ removes the discontinuity — this extended function is analytic on $\mathbb{R}$.
- $g(x) = \dfrac{x^2 - 4}{x - 2}$ for $x \neq 2$. Factoring: $g(x) = (x + 2)$ for $x \neq 2$, so $\lim_{x \to 2} g(x) = 4$. Defining $g(2) = 4$ gives a polynomial.
- $h(x) = x \sin(1/x)$ for $x \neq 0$. By the squeeze theorem $|h(x)| \leq |x|$, so $\lim_{x \to 0} h(x) = 0$. If we originally left $h(0)$ undefined, it is removably discontinuous; setting $h(0) = 0$ makes it continuous.

> **Interpretive remark.** The name "removable" is not a statement about ease — it is a statement that the discontinuity arises purely from a mismatched value assignment at a single point, while the underlying limiting behaviour is perfectly well-behaved. Nothing needs to be altered about the function away from $a$.

---

> **Definition 17.2 (Jump discontinuity / discontinuity of the first kind).**
> $f$ has a **jump discontinuity** at $a$ if both one-sided limits $f(a^+)$ and $f(a^-)$ exist and are finite, but $f(a^+) \neq f(a^-)$.
>
> The **jump** of $f$ at $a$ is defined as
> $$J_f(a) = f(a^+) - f(a^-).$$

**Examples.**
- The sign function
$$\operatorname{sgn}(x) = \begin{cases} 1 & x > 0 \\ 0 & x = 0 \\ -1 & x < 0 \end{cases}$$
at $a = 0$: $\operatorname{sgn}(0^+) = 1$, $\operatorname{sgn}(0^-) = -1$. Jump $= 1 - (-1) = 2$.
- The floor function $\lfloor x \rfloor$ at any integer $n$: $\lfloor n^+ \rfloor = n$ (for $x$ slightly greater than $n$, the floor is $n$), $\lfloor n^- \rfloor = n - 1$. Jump $= 1$.
- The Heaviside step $H(x) = 0$ for $x < 0$, $H(x) = 1$ for $x \geq 0$. At $a = 0$: $H(0^+) = 1$, $H(0^-) = 0$, $H(0) = 1$. Jump $= 1$.

> **Interpretive remark.** Jump discontinuities are often called "first kind" because they are the mildest genuine failure of continuity: the function has well-defined left and right behaviour and simply disagrees about which value to take. Such functions remain integrable, differentiable away from the jumps, and amenable to almost all classical constructions.

---

> **Definition 17.3 (Discontinuity of the second kind / essential discontinuity).**
> $f$ has an **essential** (or **second-kind**) discontinuity at $a$ if at least one of $f(a^+), f(a^-)$ does not exist as a finite real number. This includes both infinite "limits" and genuinely oscillatory non-existence.

**Examples.**
- $f(x) = \sin(1/x)$ at $a = 0$: Neither one-sided limit exists due to infinite oscillation. Along $x_n = 1/(n\pi) \to 0^+$, $f(x_n) = \sin(n\pi) = 0$; along $y_n = 2/((4n+1)\pi) \to 0^+$, $f(y_n) = \sin((4n+1)\pi/2) = 1$. Two different sequential limits prove non-existence.
- $g(x) = 1/x$ at $a = 0$: $g(0^+) = +\infty$, $g(0^-) = -\infty$ (neither is a finite real number).
- **Dirichlet function**
$$D(x) = \begin{cases} 1 & x \in \mathbb{Q} \\ 0 & x \notin \mathbb{Q} \end{cases}$$
is discontinuous at every $a \in \mathbb{R}$. Given any $a$, rationals and irrationals both cluster at $a$, so along rational sequences $D \to 1$ and along irrational sequences $D \to 0$. Neither $D(a^+)$ nor $D(a^-)$ exists; hence $D$ has an essential discontinuity at every point.
- **Thomae's function**
$$T(x) = \begin{cases} 1/q & x = p/q \text{ in lowest terms}, x \in \mathbb{Q} \\ 0 & x \notin \mathbb{Q}, \text{ or } x = 0 \end{cases}$$
has an essential-type failure at rationals (the one-sided limits are $0$, but $T(p/q) = 1/q \neq 0$, so actually *removable* at each rational). $T$ is in fact continuous at every irrational — a striking example of a function continuous on an uncountable dense set and discontinuous on a countable dense set.

> **Summary table.**
>
> | Type | $f(a^+)$ | $f(a^-)$ | Relationship to $f(a)$ |
> |------|----------|----------|----------|
> | Continuous | finite, exists | finite, exists | both $= f(a)$ |
> | Removable | finite, exists | finite, exists | $f(a^+) = f(a^-) \neq f(a)$ (or $f(a)$ undefined) |
> | Jump (1st kind) | finite, exists | finite, exists | $f(a^+) \neq f(a^-)$ |
> | Essential (2nd kind) | at least one fails to exist finitely | — |

> **Interpretive remark.** Removable and jump discontinuities are collectively called **simple** or **first-kind** discontinuities. Only essential discontinuities defeat the naive approach of "patching up" the function by modification at the bad point.

---

## 17.3 Monotonic Functions

> **Definition 17.4 (Monotonic function).**
> Let $E \subseteq \mathbb{R}$ and $f : E \to \mathbb{R}$.
> - $f$ is **monotonically increasing** (or just **increasing**, or **non-decreasing**) if $x < y \Rightarrow f(x) \leq f(y)$ for all $x, y \in E$.
> - $f$ is **strictly increasing** if $x < y \Rightarrow f(x) < f(y)$.
> - **Decreasing** and **strictly decreasing** are defined by reversing inequalities.
> - $f$ is **monotonic** if it is increasing or decreasing. It is **strictly monotonic** if it is strictly increasing or strictly decreasing.

**Examples.**
- $f(x) = x^3$ is strictly increasing on $\mathbb{R}$.
- $f(x) = e^x$ is strictly increasing on $\mathbb{R}$.
- $f(x) = \lfloor x \rfloor$ is (weakly) increasing but not strict.
- $f(x) = -1/x$ on $(0, \infty)$ is strictly increasing.
- $f(x) = \arctan x$ is strictly increasing, bounded on $\mathbb{R}$.

> **Remark.** In the classical French / Rudin convention, "monotone" without further qualification typically means weakly monotone (allowing equality in the defining inequality). Throughout this chapter, "monotonic/monotone increasing" means weakly increasing unless explicitly "strict".

Monotonic functions have remarkable regularity properties, as the next results show. Much of this chapter is devoted to showing that this seemingly weak hypothesis buys considerable analytic structure.

---

## 17.4 One-Sided Limits Always Exist for Monotonic Functions

> **Theorem 17.5 (One-sided limits for monotonic functions).**
> Let $f : (a, b) \to \mathbb{R}$ be increasing. For every $c \in (a, b)$:
>
> (i) $f(c^-) = \sup \{f(x) : a < x < c\}$ exists (as a finite real number or $-\infty$ if the set is empty of upper-unbounded — actually finite here since bounded above by $f(c)$).
>
> (ii) $f(c^+) = \inf \{f(x) : c < x < b\}$ exists (finite, since bounded below by $f(c)$).
>
> (iii) $f(c^-) \leq f(c) \leq f(c^+)$.
>
> (iv) If $a < c_1 < c_2 < b$, then $f(c_1^+) \leq f(c_2^-)$.

**Proof.**

**(i) Existence and identification of $f(c^-)$.**

*Step 1 (set up).* Let $A = \{f(x) : a < x < c\}$. The set $A$ is non-empty (since $a < c$, pick any $x_0 \in (a, c)$; then $f(x_0) \in A$). For every $x \in (a, c)$, by the increasing property $x < c \Rightarrow f(x) \leq f(c)$, so $A$ is bounded above by $f(c)$.

*Step 2 (supremum exists).* By the least upper bound property of $\mathbb{R}$, $s := \sup A$ exists as a finite real number, and $s \leq f(c)$.

*Step 3 (claim: $\lim_{x \to c^-} f(x) = s$).* Let $\varepsilon > 0$ be given. By the definition of supremum (specifically, the approximation property), $s - \varepsilon$ is not an upper bound for $A$, so there exists $x_0 \in (a, c)$ with $f(x_0) > s - \varepsilon$.

Set $\delta := c - x_0 > 0$. For any $x$ satisfying $c - \delta < x < c$ (i.e., $x_0 < x < c$):
- By monotonicity, $f(x) \geq f(x_0) > s - \varepsilon$.
- Also $x < c$, so $f(x) \in A$, hence $f(x) \leq s$.

Therefore $s - \varepsilon < f(x) \leq s$, which gives $|f(x) - s| < \varepsilon$. This verifies the $\varepsilon$-$\delta$ definition of $\lim_{x \to c^-} f(x) = s$.

Thus $f(c^-) = s = \sup \{f(x) : a < x < c\}$. ✓

**(ii) Analogous argument for $f(c^+)$.**

Let $B = \{f(x) : c < x < b\}$. Non-empty (pick any $x_1 \in (c, b)$), and bounded below by $f(c)$ (since $x > c \Rightarrow f(x) \geq f(c)$). Let $t := \inf B$, so $t \geq f(c)$.

For any $\varepsilon > 0$, by the infimum approximation property, there exists $x_1 \in (c, b)$ with $f(x_1) < t + \varepsilon$. Set $\delta := x_1 - c > 0$. For $c < x < c + \delta$ (i.e., $c < x < x_1$): monotonicity gives $f(x) \leq f(x_1) < t + \varepsilon$, and $f(x) \in B$ gives $f(x) \geq t$. Hence $t \leq f(x) < t + \varepsilon$, so $|f(x) - t| < \varepsilon$.

Therefore $f(c^+) = t = \inf\{f(x) : c < x < b\}$. ✓

**(iii) Sandwich.**

From (i): $f(c^-) = \sup A \leq f(c)$ (since $f(c)$ is an upper bound for $A$).

From (ii): $f(c^+) = \inf B \geq f(c)$ (since $f(c)$ is a lower bound for $B$).

Together: $f(c^-) \leq f(c) \leq f(c^+)$. ✓

**(iv) Inequality between successive one-sided limits.**

Let $a < c_1 < c_2 < b$. Pick any $y \in (c_1, c_2)$.

Since $y > c_1$: $y \in \{x : c_1 < x < b\}$, so $f(y) \in B_{c_1}$, hence $f(y) \geq \inf B_{c_1} = f(c_1^+)$.

Since $y < c_2$: $y \in \{x : a < x < c_2\}$, so $f(y) \in A_{c_2}$, hence $f(y) \leq \sup A_{c_2} = f(c_2^-)$.

Combining: $f(c_1^+) \leq f(y) \leq f(c_2^-)$, i.e., $f(c_1^+) \leq f(c_2^-)$. $\blacksquare$

> **Corollary 17.6.** A monotonic function on an interval has **no essential discontinuities** — every discontinuity is a jump discontinuity, with $f(c^-) \leq f(c) \leq f(c^+)$ and $f(c^-) < f(c^+)$.

**Proof of Corollary 17.6.** By Theorem 17.5(i)-(ii), both one-sided limits always exist as finite real numbers. So no essential discontinuity (2nd kind) can occur. By (iii), $f(c^-) \leq f(c) \leq f(c^+)$.

$f$ is continuous at $c$ iff $f(c^-) = f(c) = f(c^+)$. Failing this, since $f(c^-) \leq f(c) \leq f(c^+)$, we have $f(c^-) < f(c^+)$ (strict inequality somewhere). This is precisely a jump. Removable would require $f(c^-) = f(c^+) \neq f(c)$, but the sandwich $f(c^-) \leq f(c) \leq f(c^+)$ forces $f(c) = f(c^-) = f(c^+)$ in that case, a contradiction. So any discontinuity is a genuine jump. $\blacksquare$

> **Combined statement.** If $f$ is monotonic and discontinuous at $c$, then it must be a jump with $f(c^-) < f(c^+)$, and $f(c)$ lies in the closed interval $[f(c^-), f(c^+)]$.

---

## 17.5 Discontinuities of Monotonic Functions are Countable

> **Theorem 17.7 (Froda's theorem / Countability of monotonic discontinuities).** A monotonic function $f : (a, b) \to \mathbb{R}$ has at most **countably many** discontinuities.

**Proof.** Without loss of generality assume $f$ is increasing (if decreasing, apply to $-f$). Let
$$D := \{c \in (a, b) : f \text{ is discontinuous at } c\}.$$

**Step 1 (each discontinuity gives an open interval in the range).**

By Corollary 17.6, for each $c \in D$, we have $f(c^-) < f(c^+)$. Define
$$I_c := \bigl(f(c^-), f(c^+)\bigr) \subset \mathbb{R}.$$
This is a non-empty open interval (positive length $= f(c^+) - f(c^-) > 0$, the jump size).

**Step 2 (key claim: the intervals $\{I_c\}_{c \in D}$ are pairwise disjoint).**

Let $c_1, c_2 \in D$ with $c_1 \neq c_2$. Without loss of generality, $c_1 < c_2$. By Theorem 17.5(iv),
$$f(c_1^+) \leq f(c_2^-).$$
This says the right-endpoint of $I_{c_1}$ is less than or equal to the left-endpoint of $I_{c_2}$. Hence
$$I_{c_1} = (f(c_1^-), f(c_1^+)) \quad \text{and} \quad I_{c_2} = (f(c_2^-), f(c_2^+))$$
are disjoint: any element of $I_{c_1}$ is $< f(c_1^+) \leq f(c_2^-) <$ any element of $I_{c_2}$. ✓

**Step 3 (injection into $\mathbb{Q}$).**

Since $\mathbb{Q}$ is dense in $\mathbb{R}$, for each $c \in D$ pick a rational $r_c \in I_c \cap \mathbb{Q}$ (using the Axiom of Choice, or constructively: enumerate $\mathbb{Q}$ and choose the first rational lying in $I_c$).

Define $\varphi : D \to \mathbb{Q}$ by $\varphi(c) = r_c$.

*Injectivity.* If $c_1 \neq c_2$, then $I_{c_1} \cap I_{c_2} = \emptyset$ (Step 2), so $r_{c_1} \in I_{c_1}$ and $r_{c_2} \in I_{c_2}$ give $r_{c_1} \neq r_{c_2}$. Thus $\varphi$ is injective.

**Step 4 (conclusion).**

Since $\mathbb{Q}$ is countable (see [[04-sets-finite-countable-uncountable]]), and $\varphi : D \hookrightarrow \mathbb{Q}$ is an injection, $D$ is countable (finite or countably infinite). $\blacksquare$

> **Remark (striking strength).** This is an unconditional structural theorem: **no monotonic function can have uncountably many discontinuities**. A monotonic function on an interval is continuous at "most" points (all but countably many), without any additional smoothness, integrability, or topological hypothesis. Contrast this with the Dirichlet function, which is discontinuous everywhere — it is necessarily non-monotonic.

> **Remark (sharpness).** The bound "countable" is sharp: we construct in Example 4 below an increasing function that is discontinuous on an arbitrary prescribed countable set. So the constraint "at most countable" is best possible.

> **Remark (measure-theoretic consequence).** Since the set of discontinuities of a monotonic function is countable (hence has Lebesgue measure zero), every bounded monotonic function is Riemann integrable on closed intervals (see [[22-riemann-integrability]]). This is a crucial input to the theory of Riemann-Stieltjes integration.

---

## 17.6 Monotonic Functions: Continuity Equivalents

> **Theorem 17.8 (Continuity characterisation for monotonic functions).**
> Let $f : [a, b] \to \mathbb{R}$ be increasing. Then the following are equivalent:
>
> (a) $f$ is continuous on $[a, b]$.
>
> (b) $f([a, b])$ is the closed interval $[f(a), f(b)]$.
>
> (c) $f$ satisfies the intermediate value property: for every $y$ with $f(a) \leq y \leq f(b)$, there exists $x \in [a, b]$ with $f(x) = y$.

**Proof.** We establish (a) $\Rightarrow$ (b) $\Rightarrow$ (c) $\Rightarrow$ (a).

**(a) $\Rightarrow$ (b).**

Assume $f$ is continuous on $[a, b]$.

*Step 1.* By the extreme value theorem ([[19-continuous-functions-on-compact-sets]]), $f([a, b])$ is a compact subset of $\mathbb{R}$ — hence closed and bounded.

*Step 2.* By the Intermediate Value Theorem (see [[20-ivt-and-connectedness]]), the continuous image of the connected set $[a, b]$ is connected, hence an interval.

*Step 3.* Since $f$ is increasing, $f(a) \leq f(x) \leq f(b)$ for all $x \in [a, b]$, so $f([a, b]) \subseteq [f(a), f(b)]$. Conversely, $f(a), f(b) \in f([a, b])$, and since $f([a, b])$ is an interval containing both endpoints, $[f(a), f(b)] \subseteq f([a, b])$.

Hence $f([a, b]) = [f(a), f(b)]$ exactly.

**(b) $\Rightarrow$ (c).** Trivial: if the image equals $[f(a), f(b)]$, then every $y$ in that interval is attained.

**(c) $\Rightarrow$ (a).**

We argue by contrapositive: assume $f$ is discontinuous somewhere, and derive a failure of the intermediate value property.

*Step 1.* Let $c \in [a, b]$ be a point of discontinuity. By Corollary 17.6, this is a jump: $f(c^-) < f(c^+)$, with $f(c^-) \leq f(c) \leq f(c^+)$.

(*Edge-case handling:* If $c = a$, then $f(a^-)$ is not defined; we have only $f(a) \leq f(a^+)$ with possible strict inequality. If $c = b$, only $f(b^-) \leq f(b)$. The argument adapts with minor notational changes; we present the interior case.)

*Step 2.* Pick any $y_0 \in (f(c^-), f(c^+))$ with $y_0 \neq f(c)$. Such $y_0$ exists because $(f(c^-), f(c^+))$ is a non-empty open interval and we exclude at most one point.

*Step 3 (claim: $y_0 \notin f([a, b])$).* Suppose $f(x_0) = y_0$ for some $x_0 \in [a, b]$. Three cases:

- **Case $x_0 < c$:** Then $x_0 \in (a, c)$ (or $x_0 = a$), and by Theorem 17.5(i), $f(x_0) \leq \sup_{x < c} f(x) = f(c^-) < y_0$. Contradiction.
- **Case $x_0 > c$:** Then $x_0 \in (c, b]$, and by Theorem 17.5(ii), $f(x_0) \geq \inf_{x > c} f(x) = f(c^+) > y_0$. Contradiction.
- **Case $x_0 = c$:** Then $f(x_0) = f(c) \neq y_0$ by construction. Contradiction.

All cases contradictory. So $y_0 \notin f([a, b])$.

*Step 4.* But $f(a) \leq f(c^-) < y_0 < f(c^+) \leq f(b)$, so $y_0 \in (f(a), f(b)) \subset [f(a), f(b)]$. Thus (c) fails: not every value in $[f(a), f(b)]$ is attained.

By contrapositive, (c) implies (a). $\blacksquare$

> **Key insight.** For monotonic functions, continuity is equivalent to "no gaps in the image" — i.e., hitting every intermediate value. This is a special and powerful consequence of monotonicity: for a general function, IVP does *not* imply continuity (e.g., Conway's base-13 function has the IVP but is nowhere continuous).

---

## 17.7 Monotonic Functions and Inverses

> **Theorem 17.9 (Continuity of the inverse).**
> If $f : [a, b] \to \mathbb{R}$ is **strictly monotonic** and continuous, then:
>
> (i) $f$ is a bijection onto $[f(a), f(b)]$ (or $[f(b), f(a)]$ if decreasing).
>
> (ii) The inverse $f^{-1} : f([a, b]) \to [a, b]$ is strictly monotonic (same direction).
>
> (iii) $f^{-1}$ is continuous.

**Proof.** Without loss of generality assume $f$ is strictly increasing (else apply to $-f$).

**(i) Bijection onto $[f(a), f(b)]$.**

*Injectivity.* If $x_1 < x_2$, strict monotonicity gives $f(x_1) < f(x_2)$, so $f(x_1) \neq f(x_2)$. Hence $f$ is injective.

*Surjectivity onto $[f(a), f(b)]$.* By Theorem 17.8 (continuity $\Rightarrow$ image is $[f(a), f(b)]$), every $y \in [f(a), f(b)]$ is attained. ✓

**(ii) $f^{-1}$ is strictly increasing.**

Let $g := f^{-1}$, $y_1 < y_2$ in $[f(a), f(b)]$. Set $x_1 := g(y_1), x_2 := g(y_2)$, so $f(x_1) = y_1, f(x_2) = y_2$.

If $x_1 \geq x_2$: strict monotonicity (increasing) gives $f(x_1) \geq f(x_2)$, i.e., $y_1 \geq y_2$. Contradicts $y_1 < y_2$.

Hence $x_1 < x_2$, i.e., $g(y_1) < g(y_2)$. So $g$ is strictly increasing. ✓

**(iii) $f^{-1}$ is continuous.**

Since $g = f^{-1}$ is monotonic on the interval $[f(a), f(b)]$, by Corollary 17.6 any discontinuity of $g$ must be a jump.

Suppose for contradiction $g$ has a jump at some $y_0 \in (f(a), f(b))$: $g(y_0^-) < g(y_0^+)$.

By Theorem 17.8 applied to $g$: $g([f(a), f(b)]) = [g(f(a)), g(f(b))] = [a, b]$ (since $g(f(a)) = a, g(f(b)) = b$).

But wait — this argument requires us to know $g$ is continuous first. Instead, we argue directly.

*Direct argument.* At a jump $y_0$ of $g$ with $g(y_0^-) < g(y_0^+)$ and $g(y_0) \in [g(y_0^-), g(y_0^+)]$: pick $x_0 \in (g(y_0^-), g(y_0^+))$ with $x_0 \neq g(y_0)$. Now $x_0 \in (a, b)$.

Consider $f(x_0)$. By the strict monotonicity of $g$ and the construction of one-sided limits:
- $x_0 < g(y_0^+) = \inf_{y > y_0} g(y)$, so for every $y > y_0$, $g(y) > x_0$, hence $y > f(x_0)$ (apply $f$, using strict increasingness: $g(y) > x_0 \Rightarrow y = f(g(y)) > f(x_0)$). So $f(x_0) \leq y_0$.
- $x_0 > g(y_0^-) = \sup_{y < y_0} g(y)$, so for every $y < y_0$, $g(y) < x_0$, hence $y < f(x_0)$. So $f(x_0) \geq y_0$.

Combined: $f(x_0) = y_0$. But then $g(y_0) = x_0$ (unique preimage by injectivity), contradicting $x_0 \neq g(y_0)$.

Hence $g$ has no jumps in $(f(a), f(b))$. At the endpoints $f(a), f(b)$, one-sided continuity is verified similarly. So $g$ is continuous throughout. $\blacksquare$

> **Example (cube root).** $f(x) = x^3$ is strictly increasing and continuous on $\mathbb{R}$. Its inverse $f^{-1}(x) = x^{1/3}$ is therefore also continuous on $\mathbb{R}$. This gives a clean non-$\varepsilon$-$\delta$ proof of continuity of the cube root.

> **Example (exponential and logarithm).** $\exp : \mathbb{R} \to (0, \infty)$ is strictly increasing and continuous, bijective onto $(0, \infty)$. By Theorem 17.9, $\log : (0, \infty) \to \mathbb{R}$ is continuous. This is the standard route to establishing continuity of $\log$ without resorting to power-series arguments.

> **Non-example (reason for strictness).** Without strict monotonicity, the inverse is not well-defined. E.g., $f(x) = \lfloor x \rfloor$ on $[0, 2]$ is (weakly) increasing but not strictly, and has no inverse.

---

## 17.8 Worked Examples

### Example 1 (Removable)

Classify the discontinuity of
$$f(x) = \begin{cases} \dfrac{\sin x}{x} & x \neq 0 \\ 2 & x = 0 \end{cases}$$
at $x = 0$.

**Setup.** We have a piecewise-defined function with a special value assigned at $x = 0$. We need to compute both one-sided limits and compare to $f(0)$.

**Strategy.** Apply the standard limit $\lim_{x \to 0} \frac{\sin x}{x} = 1$, evaluate $f(0)$, and classify according to Definitions 17.1-17.3.

**Computation.**

*Step 1.* For $x \neq 0$, we know $\frac{\sin x}{x} \to 1$ as $x \to 0$, from either side (this is the fundamental trigonometric limit, provable via squeeze: $\cos x \leq \frac{\sin x}{x} \leq 1$ for $x \in (0, \pi/2)$, and $\cos x \to 1$).

Thus $f(0^+) = f(0^-) = 1$.

*Step 2.* $f(0) = 2$ (by the piecewise definition).

*Step 3.* The two-sided limit exists and equals $1$, but differs from $f(0) = 2$.

**Verification.** Both one-sided limits are equal ($= 1$, finite), but $f(0) = 2 \neq 1$. By Definition 17.1, this is a **removable discontinuity**.

**Interpretation.** Redefining $\tilde{f}(0) := 1$ produces a function continuous at $0$. The "defect" lives entirely in the single-value assignment at $0$ — the function's analytic behaviour near $0$ is perfectly regular. In practice, one would never work with the original $f$; one would always use the sinc function $\tilde{f}$ defined with $\tilde{f}(0) = 1$.

---

### Example 2 (Jump)

Classify the discontinuity of $f(x) = \lfloor x \rfloor$ at $x = 3$.

**Setup.** The floor function is discontinuous at every integer. We want to confirm and classify at $x = 3$.

**Strategy.** Compute $f(3)$, $f(3^+)$, $f(3^-)$ directly from the definition.

**Computation.**

*Step 1.* $f(3) = \lfloor 3 \rfloor = 3$.

*Step 2 (right limit).* For $x$ slightly greater than $3$, say $x \in (3, 4)$, $\lfloor x \rfloor = 3$. Formally: given $\varepsilon > 0$, choose $\delta = 1$. For $3 < x < 3 + \delta$ with $\delta \leq 1$, we have $3 < x < 4$ so $\lfloor x \rfloor = 3$, giving $|\lfloor x \rfloor - 3| = 0 < \varepsilon$. So $f(3^+) = 3$.

*Step 3 (left limit).* For $x$ slightly less than $3$, say $x \in [2, 3)$, $\lfloor x \rfloor = 2$. Formally: given $\varepsilon > 0$, choose $\delta = 1$. For $3 - \delta < x < 3$ with $\delta \leq 1$, we have $2 \leq x < 3$ so $\lfloor x \rfloor = 2$, giving $|\lfloor x \rfloor - 2| = 0 < \varepsilon$. So $f(3^-) = 2$.

**Verification.** Both one-sided limits exist and are finite ($f(3^+) = 3, f(3^-) = 2$), but they differ ($3 \neq 2$). By Definition 17.2, this is a **jump discontinuity**.

Jump magnitude: $J_f(3) = f(3^+) - f(3^-) = 3 - 2 = 1$.

**Interpretation.** The floor function is the prototypical monotonic-with-jumps example. It is weakly increasing (since $\lfloor \cdot \rfloor$ is non-decreasing), and by Theorem 17.7, its set of discontinuities is countable — indeed, it is exactly $\mathbb{Z}$, which is countable. The total "mass" of jumps on any bounded interval is finite.

---

### Example 3 (Essential)

Classify the discontinuity of $f(x) = \sin(1/x)$ at $x = 0$.

**Setup.** $f$ is defined for $x \neq 0$. We investigate whether $f(0^+)$ and $f(0^-)$ exist as finite real numbers.

**Strategy.** Show that along two different sequences $x_n \to 0^+$, the sequences $f(x_n)$ converge to different limits. By the sequential criterion, this proves non-existence of $f(0^+)$.

**Computation.**

*Step 1 (construct two sequences tending to $0^+$).*

Let $x_n = \dfrac{1}{n\pi}$, so $x_n > 0$ for $n \geq 1$, and $x_n \to 0^+$ as $n \to \infty$. Compute:
$$f(x_n) = \sin(1/x_n) = \sin(n\pi) = 0 \quad \text{for all } n.$$
Hence $\lim_{n \to \infty} f(x_n) = 0$.

Let $y_n = \dfrac{1}{2n\pi + \pi/2} = \dfrac{2}{(4n+1)\pi}$, so $y_n > 0$ and $y_n \to 0^+$. Compute:
$$f(y_n) = \sin(1/y_n) = \sin(2n\pi + \pi/2) = \sin(\pi/2) = 1 \quad \text{for all } n.$$
Hence $\lim_{n \to \infty} f(y_n) = 1$.

*Step 2 (apply sequential criterion).*

If $f(0^+)$ existed as a finite real number $L$, then for every sequence $z_n \to 0^+$, $f(z_n) \to L$. Here $f(x_n) \to 0$ and $f(y_n) \to 1$, giving $0 = L = 1$ — contradiction. So $f(0^+)$ does not exist.

*Step 3 (left limit).*

By analogous sequences $x_n' = -1/(n\pi) \to 0^-$, $f(x_n') = \sin(-n\pi) = 0 \to 0$; and $y_n' = -2/((4n+1)\pi) \to 0^-$, $f(y_n') = \sin(-2n\pi - \pi/2) = -1 \to -1$. So $f(0^-)$ does not exist.

**Verification.** Neither one-sided limit exists. By Definition 17.3, this is an **essential discontinuity (second kind)**.

**Interpretation.** $\sin(1/x)$ oscillates infinitely often between $-1$ and $+1$ in every neighbourhood of $0$: as $x \to 0$, $1/x$ races through arbitrarily large values, and $\sin$ completes infinitely many full cycles. There is no way to redefine $f(0)$ or "patch" the behaviour — the pathology is structural, not cosmetic. Note: this is the simplest prototype of an essential discontinuity that is neither "$\pm\infty$" nor "oscillating between two values" — it is a genuine limit-set phenomenon.

---

### Example 4 (Monotonic function with countable discontinuities)

Let $\{q_n\}_{n=1}^\infty$ be an enumeration of $\mathbb{Q} \cap (0, 1)$. Define
$$f(x) = \sum_{\substack{n : q_n \leq x}} \frac{1}{2^n}, \qquad x \in [0, 1].$$

Show:
(a) $f$ is monotonically increasing on $[0,1]$.
(b) $f$ has a jump discontinuity of size $2^{-n}$ at each $q_n$.
(c) $f$ is continuous at every irrational in $(0, 1)$.

**Setup.** This is an atomic (purely-jump) measure associated with the counting measure weighted by $2^{-n}$ on the rationals. Each rational $q_n$ contributes a "point mass" of $2^{-n}$, and $f$ is the cumulative distribution function.

**Strategy.** Verify each property from first principles: monotonicity by set inclusion, jumps by splitting the sum, continuity at irrationals by an $\varepsilon$-$\delta$ argument exploiting that the remainder tail is small.

**Computation.**

**(a) Monotonicity.**

Let $x \leq y$ in $[0, 1]$. We claim the index set $S(x) := \{n : q_n \leq x\}$ satisfies $S(x) \subseteq S(y)$:
- If $n \in S(x)$, then $q_n \leq x \leq y$, so $n \in S(y)$.

Since all summands $2^{-n}$ are positive, $\sum_{n \in S(x)} 2^{-n} \leq \sum_{n \in S(y)} 2^{-n}$, i.e., $f(x) \leq f(y)$. ✓

**Boundedness (aside).** $f(x) \leq \sum_{n=1}^\infty 2^{-n} = 1$, so $f$ is bounded. Combined with monotonicity, $f$ is well-defined (partial sums converge absolutely) and bounded on $[0, 1]$.

**(b) Jump at $q_N$.**

Fix $N$ and consider $c = q_N$.

*Right limit.* For $x > c$, $q_N \leq x$, so $N \in S(x)$. Explicitly:
$$f(x) = \frac{1}{2^N} + \sum_{\substack{n \neq N \\ q_n \leq x}} \frac{1}{2^n}.$$
As $x \to c^+$, we claim $\sum_{n \neq N, q_n \leq x} 2^{-n} \to \sum_{n \neq N, q_n \leq c} 2^{-n} = \sum_{n \neq N, q_n < c} 2^{-n}$ (if $q_n \leq c$ and $n \neq N$, then $q_n \neq q_N = c$, so $q_n < c$).

More rigorously: for any $\varepsilon > 0$, choose $M$ with $\sum_{n > M} 2^{-n} < \varepsilon/2$. The finite set $\{q_n : n \leq M, n \neq N\}$ has finitely many elements $q_n > c$; let $\delta$ be the minimum distance from $c$ to any such $q_n$ (or $\delta = 1$ if no such $q_n$ exists). Then for $c < x < c + \delta$:
- For $n \leq M, n \neq N$: $q_n \leq x \iff q_n \leq c$ (no $q_n$ in $(c, x]$).
- For $n > M$: contribution $\leq \sum_{n > M} 2^{-n} < \varepsilon/2$.

So $|f(x) - f(c) - \text{(terms for } n > M\text{)}| < \varepsilon/2$ — details as in the argument for (c).

Cleanly: $f(c^+) = 2^{-N} + \sum_{\substack{n \neq N \\ q_n < c}} 2^{-n}$.

*Left limit.* For $x < c$, $q_N = c > x$, so $N \notin S(x)$:
$$f(x) = \sum_{\substack{n \\ q_n \leq x}} \frac{1}{2^n}, \quad N \text{ not in the sum}.$$
As $x \to c^-$: $f(c^-) = \sum_{\substack{n \neq N \\ q_n < c}} 2^{-n}$ (same set as above, but missing the $2^{-N}$ term).

*Jump.*
$$f(c^+) - f(c^-) = 2^{-N}.$$

Since $2^{-N} > 0$, $f$ has a jump of size $2^{-N}$ at $q_N$, i.e., a **jump discontinuity** of size $2^{-N}$.

**(c) Continuity at irrationals.**

Let $a \in (0, 1)$ be irrational. We prove $f$ is continuous at $a$.

*Given* $\varepsilon > 0$.

*Step 1 (choose truncation).* Since $\sum_{n=1}^\infty 2^{-n} = 1$ converges, choose $N$ with $\sum_{n > N} 2^{-n} < \varepsilon$. (Explicitly, $\sum_{n > N} 2^{-n} = 2^{-N}$, so take $N = \lceil \log_2(1/\varepsilon) \rceil$.)

*Step 2 (finite exceptional set).* The finite set $E := \{q_1, q_2, \ldots, q_N\}$ consists of $N$ rationals. Since $a$ is irrational, $a \neq q_n$ for all $n \leq N$.

Define $\delta := \dfrac{1}{2} \min_{1 \leq n \leq N} |a - q_n| > 0$ (positive since $a \notin E$ and $E$ finite).

*Step 3 (behaviour on $(a - \delta, a + \delta)$).* For any $x \in (a - \delta, a + \delta) \cap [0, 1]$, we compare $f(x)$ with $f(a)$.

*Split the sum:*
$$f(x) - f(a) = \left(\sum_{\substack{n \leq N \\ q_n \leq x}} 2^{-n} - \sum_{\substack{n \leq N \\ q_n \leq a}} 2^{-n}\right) + \left(\sum_{\substack{n > N \\ q_n \leq x}} 2^{-n} - \sum_{\substack{n > N \\ q_n \leq a}} 2^{-n}\right).$$

*First bracket (small-index contribution).* For $n \leq N$, we check whether the condition $q_n \leq x$ agrees with $q_n \leq a$. By choice of $\delta$, no $q_n$ (with $n \leq N$) lies in $(a - \delta, a + \delta)$. So the interval $[\min(x, a), \max(x, a)] \subset (a - \delta, a + \delta)$ contains no $q_n$ with $n \leq N$. Consequently, for $n \leq N$, $q_n \leq x \iff q_n \leq a$.

So the first bracket is $0$.

*Second bracket (tail contribution).* Each of the two tail sums is at most $\sum_{n > N} 2^{-n} = 2^{-N} < \varepsilon$. Hence
$$\left|\sum_{\substack{n > N \\ q_n \leq x}} 2^{-n} - \sum_{\substack{n > N \\ q_n \leq a}} 2^{-n}\right| \leq \sum_{n > N} 2^{-n} < \varepsilon.$$

*Combining:*
$$|f(x) - f(a)| \leq 0 + \varepsilon = \varepsilon.$$

*Step 4 (conclusion).* For every $\varepsilon > 0$ there is $\delta > 0$ with $|x - a| < \delta \Rightarrow |f(x) - f(a)| < \varepsilon$. So $f$ is continuous at $a$. $\blacksquare$

**Verification.** The set of discontinuities of $f$ is exactly $\{q_n : n \geq 1\} = \mathbb{Q} \cap (0, 1)$ — a countable dense set. $f$ is monotonically increasing, illustrating Theorem 17.7 is sharp.

**Interpretation.** This construction, due essentially to Dirichlet, gives an explicit increasing function discontinuous at every rational in $(0, 1)$. It shows that Theorem 17.7 is sharp: any countable set can be the discontinuity set of a monotone function. This is the prototypical example of a "singular" (or "pure jump") function in the theory of bounded variation.

> **Moral.** We can explicitly construct a monotonic function discontinuous on any prescribed countable set, and the construction generalises immediately to any countable subset $D \subset \mathbb{R}$.

---

### Example 5 (Continuity and image interval)

Let $f$ be increasing on $[0, 1]$ with $f(0) = 0$ and $f(1) = 1$. Show that if $f$ is continuous, then $f([0, 1]) = [0, 1]$.

**Setup.** This is a special case of Theorem 17.8. We give a direct proof.

**Strategy.** Apply three tools to $f([0, 1])$: compactness (via continuous image), connectedness/IVT (via IVT for continuous functions on intervals), and endpoint values (via monotonicity).

**Computation.**

*Step 1 (compactness).* $[0, 1]$ is compact. By continuity of $f$ and the image-of-compact-under-continuous theorem ([[19-continuous-functions-on-compact-sets]]), $f([0, 1])$ is compact in $\mathbb{R}$, hence closed and bounded.

*Step 2 (interval property).* By the Intermediate Value Theorem (see [[20-ivt-and-connectedness]]), since $[0, 1]$ is connected and $f$ continuous, $f([0, 1])$ is connected. Connected subsets of $\mathbb{R}$ are intervals. So $f([0, 1])$ is a (closed, bounded) interval.

*Step 3 (endpoints).* $f(0) = 0$ and $f(1) = 1$ are in $f([0, 1])$. By monotonicity, $0 = f(0) \leq f(x) \leq f(1) = 1$ for all $x \in [0, 1]$, so $f([0, 1]) \subseteq [0, 1]$.

*Step 4 (conclusion).* $f([0, 1])$ is a closed interval with $\min = 0$ and $\max = 1$, hence $f([0, 1]) = [0, 1]$ exactly. $\blacksquare$

**Verification.** Every $y \in [0, 1]$ is attained by $f$: by IVT applied to $y \in [f(0), f(1)] = [0, 1]$, there is $x \in [0, 1]$ with $f(x) = y$.

**Interpretation.** This is a scaled form of Theorem 17.8. The result generalises to any interval $[a, b]$ and any values $f(a), f(b)$; the proof is identical modulo notation.

---

## 17.9 Practice Problems

1. Classify the discontinuity at $x = 0$ for each function:
   - (a) $f(x) = \dfrac{|x|}{x}$ for $x \neq 0$, $f(0) = 0$.
   - (b) $g(x) = \dfrac{1}{x^2}$ for $x \neq 0$, $g(0) = 0$.
   - (c) $h(x) = \dfrac{x^2 - x}{x}$ for $x \neq 0$, $h(0) = -1$.

2. Let $f(x) = \lfloor x \rfloor + \{x\}^2$, where $\{x\} = x - \lfloor x \rfloor$. Find all discontinuities and classify them.

3. Let $D$ be a countable subset of $\mathbb{R}$. Construct an increasing function $\mathbb{R} \to \mathbb{R}$ whose set of discontinuities is exactly $D$.

4. Let $f : [a, b] \to \mathbb{R}$ be increasing. Suppose $f$ takes every value between $f(a)$ and $f(b)$. Prove $f$ is continuous.

5. Can a monotonic function on $[0, 1]$ be discontinuous at every rational in $[0, 1]$ while being continuous at every irrational? Explain.

### Solutions

---

**Solution 1.**

**(a) $f(x) = |x|/x$ for $x \neq 0$, $f(0) = 0$.**

*Setup.* Note that $|x|/x = 1$ for $x > 0$ and $|x|/x = -1$ for $x < 0$. So $f$ is the sign function on $\mathbb{R} \setminus \{0\}$, with $f(0) := 0$.

*Strategy.* Compute one-sided limits and compare to $f(0)$.

*Computation.*

Step 1: For $x > 0$, $f(x) = x/x = 1$. So $f(0^+) = \lim_{x \to 0^+} 1 = 1$.

Step 2: For $x < 0$, $f(x) = (-x)/x = -1$. So $f(0^-) = \lim_{x \to 0^-} (-1) = -1$.

Step 3: $f(0) = 0$.

*Verification.* Both one-sided limits exist and are finite: $f(0^+) = 1, f(0^-) = -1$. They differ: $1 \neq -1$.

*Classification.* **Jump discontinuity** of magnitude $|1 - (-1)| = 2$ (by Definition 17.2). The value $f(0) = 0$ does not affect the classification; redefining $f(0)$ to either $1$ or $-1$ would only make $f$ right-continuous or left-continuous, not continuous.

*Interpretation.* This is essentially the sign function (up to value at $0$). It is a simple jump. The fact that $f(0) = 0$ sits between $f(0^-)$ and $f(0^+)$ is a coincidence — the jump-type is unaffected.

---

**(b) $g(x) = 1/x^2$ for $x \neq 0$, $g(0) = 0$.**

*Setup.* The function $1/x^2$ tends to $+\infty$ as $x \to 0$ from either side.

*Strategy.* Show neither one-sided limit is finite.

*Computation.*

Step 1: For $x > 0$, $g(x) = 1/x^2 \to +\infty$ as $x \to 0^+$. Formally, given any $M > 0$, choose $\delta = 1/\sqrt{M}$; for $0 < x < \delta$, $g(x) = 1/x^2 > 1/\delta^2 = M$. This proves $g(0^+) = +\infty$, not a finite real number.

Step 2: Similarly, $g(0^-) = +\infty$, not finite.

*Verification.* Neither $g(0^+)$ nor $g(0^-)$ exists as a finite real number.

*Classification.* **Essential discontinuity (second kind)** by Definition 17.3. (Some texts sub-classify this as an "infinite discontinuity" — a subtype of essential where the behaviour is $\pm\infty$ rather than oscillatory. But in the 3-class scheme here, any failure of a finite one-sided limit is essential/2nd kind.)

*Interpretation.* Even though $g(0) = 0$ is well-defined, the behaviour of $g$ near $0$ is uncontrollable: $g$ blows up. No redefinition of $g(0)$ can make $g$ continuous.

---

**(c) $h(x) = (x^2 - x)/x$ for $x \neq 0$, $h(0) = -1$.**

*Setup.* Simplify the formula for $x \neq 0$: $h(x) = \frac{x(x-1)}{x} = x - 1$.

*Strategy.* Check whether the simplified form matches $h(0)$.

*Computation.*

Step 1: $\lim_{x \to 0} h(x) = \lim_{x \to 0} (x - 1) = -1$.

Step 2: $h(0) = -1$.

*Verification.* $h(0^+) = h(0^-) = \lim_{x \to 0} h(x) = -1 = h(0)$.

*Classification.* $h$ is **continuous at $0$** — not discontinuous at all. No classification needed.

*Interpretation.* The expression $(x^2 - x)/x$ has a "hole" at $x = 0$ (indeterminate form $0/0$) when read naively, but cancellation removes it. The function is defined at $0$ with value matching the limit, so the hole is filled — no discontinuity exists. This is a useful reminder that "suspicious-looking" formulas can define continuous functions when carefully interpreted.

---

**Solution 2.** $f(x) = \lfloor x \rfloor + \{x\}^2$ on $\mathbb{R}$.

*Setup.* Write $\{x\} = x - \lfloor x \rfloor \in [0, 1)$. So $f(x) = \lfloor x \rfloor + (x - \lfloor x \rfloor)^2$.

*Strategy.* At non-integer points, $\lfloor x \rfloor$ is locally constant, so $f$ is locally a polynomial in $x$ — continuous. At integers, check the match between left and right behaviour.

*Computation.*

**Non-integer case.** If $x_0 \in \mathbb{R} \setminus \mathbb{Z}$, let $n := \lfloor x_0 \rfloor$. There is $\delta > 0$ with $n < x_0 - \delta < x_0 + \delta < n + 1$ (e.g., $\delta = \min(x_0 - n, n + 1 - x_0)/2$).

For $x \in (x_0 - \delta, x_0 + \delta)$: $\lfloor x \rfloor = n$ (locally constant), and $\{x\} = x - n$. So
$$f(x) = n + (x - n)^2.$$
This is a polynomial in $x$, hence continuous at $x_0$. ✓

**Integer case.** Let $x_0 = n \in \mathbb{Z}$. Compute the three quantities:

*Step 1 (function value).* $\lfloor n \rfloor = n, \{n\} = 0$, so $f(n) = n + 0 = n$.

*Step 2 (right limit).* For $n < x < n + 1$: $\lfloor x \rfloor = n$, $\{x\} = x - n \in (0, 1)$. As $x \to n^+$, $\{x\} \to 0^+$, so $\{x\}^2 \to 0$. Hence $f(n^+) = n + 0 = n$.

*Step 3 (left limit).* For $n - 1 < x < n$: $\lfloor x \rfloor = n - 1$, $\{x\} = x - (n - 1) \in (0, 1)$. As $x \to n^-$, $\{x\} = x - n + 1 \to 1^-$, so $\{x\}^2 \to 1$. Hence
$$f(n^-) = (n - 1) + 1 = n.$$

*Step 4 (compare).* $f(n^+) = f(n^-) = f(n) = n$. All three match.

*Verification.* $f$ is continuous at every integer $n$. Combined with continuity at non-integers, $f$ is **continuous everywhere** on $\mathbb{R}$.

*Interpretation.* Although both $\lfloor x \rfloor$ (with jump $+1$ at each integer) and $\{x\}^2$ (with jump $-1$ at each integer: $\{x\}^2 \to 1$ as $x \to n^-$, $\{x\}^2 \to 0$ as $x \to n^+$) are individually discontinuous at each integer, the jumps cancel exactly:
$$\text{jump of } f \text{ at } n = J_{\lfloor \cdot \rfloor}(n) + J_{\{\cdot\}^2}(n) = 1 + (-1) = 0.$$
This is a nice example of a continuous function built from discontinuous pieces — useful in applications such as shifted cumulative distributions and interpolation.

---

**Solution 3.** Construct an increasing function $\mathbb{R} \to \mathbb{R}$ discontinuous exactly on a given countable set $D$.

*Setup.* Generalise the construction of Example 4.

*Strategy.* Enumerate $D$, assign to each point a positive "jump weight" summing to a finite amount, and define $f$ as the cumulative sum.

*Computation.*

Step 1 (Enumerate): Write $D = \{d_1, d_2, d_3, \ldots\}$ (finite or countably infinite; if finite just use finitely many indices).

Step 2 (Assign weights): To each $d_n$ assign weight $w_n := 2^{-n} > 0$. Then $\sum_{n=1}^\infty w_n = 1 < \infty$.

Step 3 (Define):
$$f(x) := \sum_{\substack{n \geq 1 \\ d_n \leq x}} 2^{-n}, \qquad x \in \mathbb{R}.$$
Convergence: the partial sums are bounded by $\sum_{n=1}^\infty 2^{-n} = 1$, and terms are positive, so the sum is absolutely convergent.

*Step 4 (Verify properties).*

**Monotonicity.** If $x \leq y$, then $\{n : d_n \leq x\} \subseteq \{n : d_n \leq y\}$, so $f(x) \leq f(y)$.

**Discontinuity at each $d_N$, jump size $2^{-N}$.** Fix $N$ and set $c := d_N$.

- For $x > c$: $d_N \leq x$, so the term $2^{-N}$ is in the sum for $f(x)$.
- For $x < c$: $d_N > x$, so $2^{-N}$ is not in the sum for $f(x)$.

This yields (by the argument of Example 4(b)):
$$f(c^+) - f(c^-) = 2^{-N} > 0.$$
Hence $f$ has a jump discontinuity at $d_N$.

**Continuity at every $a \notin D$.** Follows the same argument as Example 4(c), with $D$ replacing $\mathbb{Q} \cap (0,1)$:

Given $\varepsilon > 0$, choose $N$ with $2^{-N} < \varepsilon$. The finite set $\{d_1, \ldots, d_N\}$ contains no point $= a$ (since $a \notin D$). Let $\delta := \tfrac12 \min_{n \leq N} |a - d_n| > 0$.

For $|x - a| < \delta$: the interval between $a$ and $x$ contains no $d_n$ with $n \leq N$, so the contributions from $n \leq N$ match:
$$\sum_{n \leq N, d_n \leq x} 2^{-n} = \sum_{n \leq N, d_n \leq a} 2^{-n}.$$
The difference in the two tail sums (over $n > N$) is at most $\sum_{n > N} 2^{-n} = 2^{-N} < \varepsilon$. Therefore
$$|f(x) - f(a)| < \varepsilon.$$
Hence $f$ is continuous at $a$. $\blacksquare$

*Verification.* Discontinuity set of $f$ is exactly $D$, and $f$ is increasing.

*Interpretation.* This shows the sharpness of Theorem 17.7: any countable set (however weird — rationals, a Cantor-like countable subset, irrationals of bounded height, any computable enumeration) can be the discontinuity set of an increasing function. Combined with Theorem 17.7, the precise statement is: **the set of discontinuities of a monotonic function is countable, and every countable subset of $\mathbb{R}$ occurs as the discontinuity set of some monotonic function.**

---

**Solution 4.** Let $f : [a, b] \to \mathbb{R}$ be increasing, and suppose $f$ takes every value in $[f(a), f(b)]$. Prove $f$ is continuous.

*Setup.* We want to deduce continuity from the IVP-style hypothesis.

*Strategy.* Contrapositive. Assume $f$ is discontinuous at some $c \in [a, b]$; deduce $f$ misses a value.

*Computation.*

Step 1 (identify discontinuity type): Since $f$ is increasing, by Corollary 17.6 any discontinuity is a jump:
$$f(c^-) < f(c^+), \quad f(c^-) \leq f(c) \leq f(c^+).$$
(For boundary cases $c = a$ or $c = b$, only one-sided limit exists; handle analogously with minor adjustment.)

Step 2 (choose missed value): The open interval $(f(c^-), f(c^+))$ is non-empty. Pick $y_0 \in (f(c^-), f(c^+))$ with $y_0 \neq f(c)$ — possible since we exclude at most one point from a non-degenerate open interval.

Step 3 (show $y_0 \notin f([a, b])$):
- **For $x \in [a, c)$:** By Theorem 17.5(i), $f(x) \leq f(c^-) < y_0$.
- **For $x = c$:** $f(c) \neq y_0$ by choice of $y_0$.
- **For $x \in (c, b]$:** By Theorem 17.5(ii), $f(x) \geq f(c^+) > y_0$.

In all cases, $f(x) \neq y_0$. So $y_0 \notin f([a, b])$.

Step 4 (contradiction): But $y_0 \in (f(c^-), f(c^+)) \subseteq [f(a), f(b)]$ (by $f(a) \leq f(c^-) < y_0 < f(c^+) \leq f(b)$). So $y_0$ is a value in $[f(a), f(b)]$ that $f$ does not take, contradicting the hypothesis that $f$ takes every value in $[f(a), f(b)]$.

*Verification.* Contradiction. So $f$ cannot be discontinuous anywhere. Hence $f$ is continuous. $\blacksquare$

*Interpretation.* This is the converse direction of Theorem 17.8: for monotonic functions, IVP alone implies continuity. Notice that for non-monotonic functions this is false: e.g., Conway's base-13 function has IVP but is nowhere continuous. The result here is genuinely special to monotonic functions.

---

**Solution 5.** Can a monotonic function on $[0, 1]$ be discontinuous exactly on $\mathbb{Q} \cap [0, 1]$?

*Setup.* We ask: is there an increasing (or decreasing) function on $[0, 1]$ whose discontinuity set is exactly $\mathbb{Q} \cap [0, 1]$?

*Strategy.* Recall $\mathbb{Q} \cap [0, 1]$ is countable; by Theorem 17.7, the discontinuity set of any monotonic function is at most countable. So the question is whether countable is achievable, which is exactly Problem 3.

*Answer.* **Yes.** Apply the construction of Problem 3 / Example 4 with $D := \mathbb{Q} \cap [0, 1]$:

Enumerate $\mathbb{Q} \cap [0, 1] = \{q_1, q_2, \ldots\}$. Define
$$f(x) := \sum_{\substack{n \geq 1 \\ q_n \leq x}} 2^{-n}, \qquad x \in [0, 1].$$

Properties:
- $f$ is increasing (by the monotonicity argument).
- $f$ has jump discontinuities at each $q_n$ of size $2^{-n}$.
- $f$ is continuous at every irrational in $(0, 1)$.

Hence $f$ is discontinuous exactly on the rationals in $[0, 1]$ and continuous exactly on the irrationals in $[0, 1]$. $\blacksquare$

*Interpretation.* This is a dramatic example: a monotonic function that is "mostly continuous" (continuous on an uncountable dense set of irrationals) and "sparsely discontinuous" (discontinuous on a countable dense set of rationals). Both sets are dense — so at every point, $f$ has both continuous and discontinuous points arbitrarily close.

> **Remark (contrast with Thomae).** The classical Thomae function $T(x)$ (Section 17.2) is also continuous on irrationals and discontinuous on rationals, but $T$ is **not monotonic** — indeed, $T$ oscillates densely. The monotonic version constructed here uses the weighted-atom construction and is a different, explicit example. Both illustrate that "discontinuous on rationals, continuous on irrationals" is a feasible discontinuity pattern, but via very different function types.

---

## 17.10 Summary

> **Classification of discontinuities at $a$.**
>
> - **Removable:** $\lim_{x \to a} f(x)$ exists (finite) but $\neq f(a)$ (or $f(a)$ undefined).
> - **Jump (1st kind):** $f(a^+), f(a^-)$ both exist and finite, but different. Jump $= f(a^+) - f(a^-)$.
> - **Essential (2nd kind):** at least one one-sided limit does not exist (as a finite real number) — whether via oscillation, $\pm\infty$, or otherwise.

> **Monotonic functions are special:**
>
> 1. **One-sided limits always exist** (Theorem 17.5): $f(c^-) = \sup_{x < c} f(x)$, $f(c^+) = \inf_{x > c} f(x)$.
> 2. **Every discontinuity is a jump** (Corollary 17.6). No essential discontinuities possible.
> 3. **The set of discontinuities is at most countable** (Theorem 17.7) — and any countable set can occur.
> 4. **Continuity $\Leftrightarrow$ image is interval** (Theorem 17.8).
> 5. **Continuous strictly monotonic functions have continuous inverses** (Theorem 17.9).

> **Philosophical takeaway.** Monotonicity is a weak-looking hypothesis but buys enormous regularity: automatic existence of one-sided limits, countability of discontinuities, integrability, continuous inverses under strictness. This is a recurring theme in real analysis: simple order-theoretic properties force analytic good behaviour, even without any explicit smoothness. Compare with **functions of bounded variation** (next topic), which inherit all these properties via the decomposition theorem.

> **Looking ahead.** Monotonic functions are the model for **functions of bounded variation** (every BV function is a difference of two monotonic functions — Jordan decomposition), which play a central role in:
> - The Riemann-Stieltjes integral ([[25-riemann-stieltjes-integral]]).
> - The Lebesgue differentiation theorem.
> - The theory of distributions (BV = measures with $\sigma$-finite total variation).

---

## 17.11 Appendix: Additional Results (For Exam Preparation)

This appendix collects a few qualifying-exam-style results that follow from the theorems above. Solutions sketched.

### A.1 A monotonic function is Riemann integrable

*Statement.* Every bounded monotonic $f : [a, b] \to \mathbb{R}$ is Riemann integrable.

*Sketch.* The set of discontinuities is countable (Theorem 17.7), hence has Lebesgue measure zero. Bounded + measure-zero-discontinuity set $\Rightarrow$ Riemann integrable (Lebesgue's criterion; see [[22-riemann-integrability]]). Alternatively: direct proof via refining partitions with mesh $\to 0$ and using monotonicity to bound $U(f, P) - L(f, P) \leq (f(b) - f(a)) \cdot \text{mesh}(P)$.

### A.2 Darboux's theorem (for derivatives)

*Statement.* If $F : [a, b] \to \mathbb{R}$ is differentiable, then $F'$ has the IVP even if not continuous.

*Implication.* $F'$ cannot have jump discontinuities (by a monotonicity-free argument similar in spirit to Theorem 17.8). So derivatives are "more like continuous functions" than their potential non-continuity would suggest.

### A.3 Every monotonic function is differentiable almost everywhere (Lebesgue)

*Statement.* A monotonic function on a closed interval is differentiable at almost every point (in the Lebesgue measure sense).

*Remark.* Proved in measure theory. Beyond the scope of first-semester real analysis, but a beautiful capstone: monotonicity forces not just countable discontinuities but also almost-everywhere differentiability. See Royden or Folland.

---

## Related Topics

- [[16-continuity]] — $\varepsilon$-$\delta$ and sequential definitions of continuity
- [[18-important-limits-infinite-limits]] — limits at infinity, infinite limits
- [[19-continuous-functions-on-compact-sets]] — continuous image of compact is compact (used in 17.6, 17.8)
- [[20-ivt-and-connectedness]] — IVT used in continuity $\Leftrightarrow$ interval image
- [[22-riemann-integrability]] — monotonic $\Rightarrow$ integrable
- [[25-riemann-stieltjes-integral]] — bounded variation, monotonic integrators
- [[04-sets-finite-countable-uncountable]] — countability used for discontinuity set
