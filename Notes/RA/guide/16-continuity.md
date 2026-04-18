# 16. Continuity and Limits of Functions

With sequences and series now rigorously developed, we turn to **functions** $f : \mathbb{R} \to \mathbb{R}$ (or more generally on subsets of $\mathbb{R}$). The intuition of continuity — "small change in input gives small change in output", "graph has no jumps" — is made precise by the **$\varepsilon$-$\delta$ definition**, one of the most important definitions in analysis.

This lesson develops:
- The **limit of a function at a point**, both via $\varepsilon$-$\delta$ and via sequences (Heine's criterion).
- The **algebra of limits**: how limits interact with $+, \cdot, /$.
- The **definition of continuity** and its three equivalent formulations.
- Continuity of elementary functions (polynomials, rational, roots, exponential, trig).

---

## 16.1 Limits of Functions

> **Definition 16.1 (Limit point / cluster point).**
> Let $E \subset \mathbb{R}$. A point $a \in \mathbb{R}$ is a **limit point** (or **accumulation point**) of $E$ if every neighbourhood $(a - \delta, a + \delta)$ of $a$ contains at least one point of $E$ **other than $a$**.

> **Definition 16.2 (Limit of a function — $\varepsilon$-$\delta$).**
> Let $f : E \to \mathbb{R}$ and let $a$ be a limit point of $E$. We say
> $\lim_{x \to a} f(x) = L$
> if for every $\varepsilon > 0$ there exists $\delta > 0$ such that
> $x \in E, \ 0 < |x - a| < \delta \ \Longrightarrow\ |f(x) - L| < \varepsilon.$

> **Important.** The condition $0 < |x - a|$ **excludes $x = a$**. The value of $f(a)$ (or whether $f$ is even defined at $a$) plays no role in $\lim_{x \to a} f(x)$.

> **Theorem 16.3 (Uniqueness of limit).**
> If $\lim_{x \to a} f(x) = L_1$ and $\lim_{x \to a} f(x) = L_2$, then $L_1 = L_2$.

*Proof.* Suppose $L_1 \neq L_2$. Let $\varepsilon = |L_1 - L_2|/2 > 0$. There exist $\delta_1, \delta_2 > 0$ with
$$0 < |x-a| < \delta_i \Rightarrow |f(x) - L_i| < \varepsilon \quad (i=1,2).$$
Pick any $x$ with $0 < |x-a| < \min(\delta_1, \delta_2)$ (possible since $a$ is a limit point). Then
$$|L_1 - L_2| \leq |L_1 - f(x)| + |f(x) - L_2| < 2\varepsilon = |L_1 - L_2|,$$
contradiction. $\blacksquare$

---

## 16.2 Sequential Characterisation — Heine's Theorem

> **Theorem 16.4 (Heine's sequential criterion).**
> Let $f : E \to \mathbb{R}$ with $a$ a limit point of $E$. Then $\lim_{x \to a} f(x) = L$ if and only if
>
> **for every sequence** $(x_n) \subset E \setminus \{a\}$ with $x_n \to a$, the sequence $f(x_n) \to L$.

*Proof.*

**(⇒)** Assume $\lim_{x \to a} f = L$. Let $x_n \to a$ with $x_n \in E \setminus \{a\}$. For $\varepsilon > 0$ find $\delta$ as in Def. 16.2. Since $x_n \to a$ and $x_n \neq a$, eventually $0 < |x_n - a| < \delta$, so $|f(x_n) - L| < \varepsilon$. Thus $f(x_n) \to L$.

**(⇐)** Contrapositive. Suppose $\lim_{x \to a} f(x) \neq L$. Then there exists $\varepsilon_0 > 0$ such that for every $\delta > 0$, some $x \in E$ with $0 < |x - a| < \delta$ satisfies $|f(x) - L| \geq \varepsilon_0$. Take $\delta_n = 1/n$: pick $x_n \in E$ with $0 < |x_n - a| < 1/n$ and $|f(x_n) - L| \geq \varepsilon_0$. Then $x_n \to a$, $x_n \neq a$, but $f(x_n) \not\to L$. $\blacksquare$

> **Why this matters.** Heine's criterion lets us import sequence theorems into the study of functions. For instance, proving a function does **not** have a limit at $a$ is easy: find two sequences $x_n \to a$ and $y_n \to a$ with $f(x_n) \to L_1 \neq L_2 \leftarrow f(y_n)$.

**Example.** $f(x) = \sin(1/x)$ has no limit at $0$. Take $x_n = 1/(n\pi) \to 0$: $f(x_n) = \sin(n\pi) = 0$. Take $y_n = 1/(2n\pi + \pi/2) \to 0$: $f(y_n) = 1$. Different limits, so no limit exists.

---

## 16.3 Algebra of Limits

> **Theorem 16.5 (Algebraic limit laws for functions).**
> Suppose $\lim_{x \to a} f(x) = L$ and $\lim_{x \to a} g(x) = M$. Then:
> (i) $\lim (f \pm g) = L \pm M$.
>
> (ii) $\lim (c \cdot f) = c L$ for any constant $c$.
>
> (iii) $\lim (f \cdot g) = LM$.
>
> (iv) If $M \neq 0$, $\lim (f/g) = L/M$.
>
> (v) $\lim |f(x)| = |L|$.

*Proof idea.* All follow from the sequential criterion (Theorem 16.4) and the corresponding results for sequence limits (see [[09-convergence-and-limits]]). For any $x_n \to a$ with $x_n \neq a$, $f(x_n) \to L$ and $g(x_n) \to M$, so $f(x_n) + g(x_n) \to L + M$ (sequence sum law), establishing (i). Similarly for others. $\blacksquare$

---

## 16.4 One-Sided Limits

> **Definition 16.6.** The **right-hand limit** $\lim_{x \to a^+} f(x) = L$ means: for all $\varepsilon > 0$, there exists $\delta > 0$ such that $a < x < a + \delta$ implies $|f(x) - L| < \varepsilon$. The **left-hand limit** $\lim_{x \to a^-} f(x)$ is defined analogously.

> **Theorem 16.7.** $\lim_{x \to a} f(x) = L$ iff $\lim_{x \to a^+} f(x) = L$ and $\lim_{x \to a^-} f(x) = L$.

*Proof.* Follows directly from the $\varepsilon$-$\delta$ definition: two-sided convergence is equivalent to both one-sided being the same value. $\blacksquare$

> **Example.** For $\operatorname{sgn}(x)$ (sign function): $\lim_{x \to 0^+} \operatorname{sgn}(x) = 1$, $\lim_{x \to 0^-} \operatorname{sgn}(x) = -1$. Since these differ, $\lim_{x \to 0} \operatorname{sgn}(x)$ does not exist.

---

## 16.5 Continuity

> **Definition 16.8 ($\varepsilon$-$\delta$ continuity).**
> A function $f : E \to \mathbb{R}$ is **continuous at $a \in E$** if for every $\varepsilon > 0$ there exists $\delta > 0$ such that
> $x \in E, \ |x - a| < \delta \ \Longrightarrow\ |f(x) - f(a)| < \varepsilon.$
> 
> $f$ is **continuous on $E$** if it is continuous at every point of $E$.

> **Key difference from limit definition.** The condition is $|x - a| < \delta$, not $0 < |x - a| < \delta$. The point $x = a$ is now included.

> **Theorem 16.9 (Characterisations of continuity at a limit point).**
> If $a$ is a limit point of $E$ and $a \in E$, the following are equivalent:
>
> (i) $f$ is continuous at $a$ ($\varepsilon$-$\delta$).
>
> (ii) $\lim_{x \to a} f(x) = f(a)$.
>
> (iii) **(Sequential / Heine)** For every sequence $(x_n) \subset E$ with $x_n \to a$, $f(x_n) \to f(a)$.

*Proof.*

(i) ⇔ (ii): $\varepsilon$-$\delta$ continuity says $|f(x) - f(a)| < \varepsilon$ whenever $|x - a| < \delta$; the limit definition says the same whenever $0 < |x - a| < \delta$. The $x = a$ case adds $|f(a) - f(a)| = 0 < \varepsilon$, which is automatic. So they are equivalent.

(ii) ⇔ (iii): By Heine's theorem (16.4), $\lim_{x \to a} f(x) = L$ iff $x_n \to a,\ x_n \neq a \Rightarrow f(x_n) \to L$. Taking $L = f(a)$ and noting that allowing $x_n = a$ adds only $f(x_n) = f(a) \to f(a)$ (always true), the conditions match. $\blacksquare$

> **Isolated points.** If $a \in E$ is **not** a limit point of $E$ (i.e., it is an isolated point), then $f$ is automatically continuous at $a$: there is a $\delta$-ball containing no points of $E$ except $a$ itself, and $|f(a) - f(a)| = 0 < \varepsilon$. Every function is continuous at every isolated point of its domain.

---

## 16.6 Topological Characterisation

> **Theorem 16.10 (Topological continuity).**
> A function $f : \mathbb{R} \to \mathbb{R}$ is continuous on $\mathbb{R}$ iff for every open set $U \subset \mathbb{R}$, the preimage $f^{-1}(U)$ is open.

*Proof.*

**(⇒)** Assume $f$ continuous on $\mathbb{R}$. Let $U$ open. Take $a \in f^{-1}(U)$, so $f(a) \in U$. Since $U$ is open, $(f(a) - \varepsilon, f(a) + \varepsilon) \subset U$ for some $\varepsilon > 0$. By continuity at $a$, there is $\delta > 0$ with $|x - a| < \delta \Rightarrow |f(x) - f(a)| < \varepsilon \Rightarrow f(x) \in U \Rightarrow x \in f^{-1}(U)$. So $(a - \delta, a+\delta) \subset f^{-1}(U)$, i.e., $f^{-1}(U)$ is open.

**(⇐)** Conversely, assume preimages of open sets are open. Fix $a$ and $\varepsilon > 0$. The set $U = (f(a)-\varepsilon, f(a)+\varepsilon)$ is open, so $f^{-1}(U)$ is open and contains $a$. Thus $(a-\delta, a+\delta) \subset f^{-1}(U)$ for some $\delta > 0$, which means $|x-a| < \delta \Rightarrow f(x) \in U \Rightarrow |f(x) - f(a)| < \varepsilon$. So $f$ is continuous at $a$. $\blacksquare$

> **Equivalent form.** $f$ continuous iff preimages of **closed** sets are closed (take complements). This topological view is crucial in advanced analysis; it's the definition used in general topological spaces.

---

## 16.7 Operations Preserving Continuity

> **Theorem 16.11 (Algebra of continuous functions).**
> If $f, g$ are continuous at $a$, then so are
> $f \pm g, \qquad c f, \qquad f \cdot g, \qquad f / g \ (\text{if } g(a) \neq 0), \qquad |f|.$

*Proof.* Immediate from the algebraic limit laws (Theorem 16.5) and the characterisation $\lim_{x \to a} f(x) = f(a)$. $\blacksquare$

> **Theorem 16.12 (Composition of continuous functions).**
> If $f : E \to \mathbb{R}$ is continuous at $a$, $g : F \to \mathbb{R}$ is continuous at $b = f(a)$, and $f(E) \subset F$, then $g \circ f$ is continuous at $a$.

*Proof.* Fix $\varepsilon > 0$. By continuity of $g$ at $b$, there is $\eta > 0$ with $|y - b| < \eta \Rightarrow |g(y) - g(b)| < \varepsilon$. By continuity of $f$ at $a$, there is $\delta > 0$ with $|x - a| < \delta \Rightarrow |f(x) - f(a)| < \eta$, i.e., $|f(x) - b| < \eta$, hence $|g(f(x)) - g(b)| < \varepsilon$. So $(g \circ f)$ is continuous at $a$. $\blacksquare$

---

## 16.8 Continuity of Elementary Functions

Using the above, we can establish continuity of all the elementary functions.

**Polynomials.** $f(x) = x$ is continuous (take $\delta = \varepsilon$). Constants are trivially continuous. By products and sums, every polynomial $p(x) = c_0 + c_1 x + \cdots + c_n x^n$ is continuous on $\mathbb{R}$.

**Rational functions.** $p(x)/q(x)$ is continuous wherever $q(x) \neq 0$.

**$n$-th roots.** $f(x) = x^{1/n}$ is continuous on $[0, \infty)$ (and on $\mathbb{R}$ for $n$ odd).

**Exponential.** $e^x = \sum x^n/n!$ is continuous on $\mathbb{R}$. (Continuity follows from the power-series form and uniform convergence on compact sets — a topic for [[18-important-limits-infinite-limits]].)

**Logarithm.** $\ln x$ is continuous on $(0, \infty)$, as the inverse of the continuous, strictly increasing exponential.

**Trigonometric functions.** $\sin x, \cos x$ are continuous on $\mathbb{R}$. The standard proof uses $|\sin x| \leq |x|$ and the identity $\sin x - \sin a = 2 \cos\left(\frac{x+a}{2}\right) \sin\left(\frac{x-a}{2}\right)$:
$$|\sin x - \sin a| = 2 \left|\cos\tfrac{x+a}{2}\right| \left|\sin\tfrac{x-a}{2}\right| \leq 2 \cdot 1 \cdot \tfrac{|x-a|}{2} = |x - a|.$$
So take $\delta = \varepsilon$.

---

## 16.9 Worked Examples

**Example 1.** Prove from $\varepsilon$-$\delta$ that $f(x) = x^2$ is continuous at $a = 3$.

*Solution:* Given $\varepsilon > 0$, we need $\delta$ such that $|x - 3| < \delta \Rightarrow |x^2 - 9| < \varepsilon$.

Compute $|x^2 - 9| = |x - 3||x + 3|$. To bound $|x + 3|$, assume first $|x - 3| < 1$ so $2 < x < 4$ and $|x + 3| < 7$. Then
$$|x^2 - 9| < 7 |x - 3|.$$
So we want $7|x - 3| < \varepsilon$, i.e., $|x-3| < \varepsilon/7$.

Choose $\delta = \min(1, \varepsilon/7)$. Then $|x - 3| < \delta \Rightarrow |x^2 - 9| < 7|x - 3| < 7 \cdot \varepsilon/7 = \varepsilon$. $\blacksquare$

---

**Example 2.** Show $\lim_{x \to 0} x \sin(1/x) = 0$.

*Solution:* For $x \neq 0$, $|\sin(1/x)| \leq 1$, so
$$|x \sin(1/x) - 0| = |x| |\sin(1/x)| \leq |x|.$$

Given $\varepsilon > 0$, take $\delta = \varepsilon$: $0 < |x - 0| < \delta \Rightarrow |x \sin(1/x)| \leq |x| < \varepsilon$. $\blacksquare$

> **Note.** The function $f(x) = x \sin(1/x)$ is defined for $x \neq 0$; extending by $f(0) = 0$ makes $f$ continuous on all of ℝ.

---

**Example 3 (Dirichlet's function).** Let
$$D(x) = \begin{cases} 1 & \text{if } x \in \mathbb{Q}, \\ 0 & \text{if } x \notin \mathbb{Q}. \end{cases}$$

Show $D$ is **nowhere continuous**.

*Solution:* Fix any $a \in \mathbb{R}$. By density of rationals (and irrationals) in $\mathbb{R}$, every neighbourhood of $a$ contains both rationals and irrationals. Pick sequences $q_n \to a$ with $q_n \in \mathbb{Q}$, and $r_n \to a$ with $r_n \notin \mathbb{Q}$. Then $D(q_n) = 1$ and $D(r_n) = 0$. If $D$ were continuous at $a$, Heine would give $D(q_n) \to D(a)$ and $D(r_n) \to D(a)$, forcing $D(a) = 1 = 0$, contradiction. $\blacksquare$

---

**Example 4 (Thomae's / Popcorn function).** Let
$$T(x) = \begin{cases} 1/q & \text{if } x = p/q \text{ in lowest terms}, q > 0, \\ 0 & \text{if } x \notin \mathbb{Q}, \\ 1 & \text{if } x = 0. \end{cases}$$

Show $T$ is **continuous at every irrational** and **discontinuous at every rational**.

*Solution:*

**Discontinuous at rationals.** If $a = p/q \in \mathbb{Q}$, $T(a) = 1/q > 0$. Take irrationals $r_n \to a$; then $T(r_n) = 0 \not\to 1/q$. Fails Heine.

**Continuous at irrationals.** Fix an irrational $a$. Given $\varepsilon > 0$, choose $N$ with $1/N < \varepsilon$. Consider rationals $p/q$ with $q \leq N$ in the neighbourhood $(a - 1, a + 1)$: there are only finitely many (for each $q \leq N$, finitely many $p$ with $p/q \in (a-1, a+1)$). None equals $a$ (since $a$ is irrational). So the minimum distance $\delta_0 = \min |a - p/q|$ over these finitely many rationals is positive.

Let $\delta = \min(\delta_0, 1)$. For $|x - a| < \delta$:
- If $x$ is irrational: $T(x) = 0$, so $|T(x) - T(a)| = |0 - 0| = 0 < \varepsilon$.
- If $x = p/q$ in lowest terms: $|x - a| < \delta_0$ forces $q > N$, so $T(x) = 1/q < 1/N < \varepsilon$, and $|T(x) - T(a)| = 1/q < \varepsilon$.

So $T$ is continuous at $a$. $\blacksquare$

> **Remark.** Thomae's function is a beautiful example: continuous on the uncountable set of irrationals and discontinuous on the countable set of rationals. It illustrates that continuity sets can be quite intricate.

---

**Example 5.** Let $f(x) = \dfrac{x^2 - 4}{x - 2}$ for $x \neq 2$. How should $f(2)$ be defined to make $f$ continuous?

*Solution:* For $x \neq 2$:
$$f(x) = \frac{(x-2)(x+2)}{x-2} = x + 2.$$

So $\lim_{x \to 2} f(x) = 4$. Define $f(2) = 4$. Then $f(x) = x + 2$ for all $x \in \mathbb{R}$ (in the extended definition), which is a polynomial, hence continuous. $\blacksquare$

This is an example of a **removable discontinuity**.

---

## 16.10 Practice Problems

1. Prove from $\varepsilon$-$\delta$: $\lim_{x \to 2} (3x + 1) = 7$.

2. Show that if $f : \mathbb{R} \to \mathbb{R}$ is continuous and $f(q) = 0$ for every rational $q$, then $f \equiv 0$.

3. Let $f(x) = \begin{cases} x^2 \sin(1/x) & x \neq 0 \\ 0 & x = 0 \end{cases}$. Is $f$ continuous at $0$?

4. Prove that $f(x) = \sqrt{x}$ is continuous on $[0, \infty)$ using $\varepsilon$-$\delta$.

5. Let $f : \mathbb{R} \to \mathbb{R}$ satisfy $|f(x) - f(y)| \leq |x - y|^{1/2}$ for all $x, y$. Show $f$ is continuous. (Such an $f$ is called **Hölder continuous of exponent 1/2**.)

### Solutions

**1.** Given $\varepsilon > 0$, want $|(3x+1) - 7| < \varepsilon$, i.e., $3|x-2| < \varepsilon$. Take $\delta = \varepsilon/3$:
$$|x-2| < \delta \Rightarrow |(3x+1)-7| = 3|x-2| < 3\delta = \varepsilon. \ \blacksquare$$

---

**2.** Fix any $a \in \mathbb{R}$. By density of $\mathbb{Q}$, pick rationals $q_n \to a$. By continuity of $f$ and Heine, $f(q_n) \to f(a)$. But $f(q_n) = 0$ for all $n$, so $f(a) = 0$. Since $a$ was arbitrary, $f \equiv 0$. $\blacksquare$

> **Corollary.** Continuous functions are determined by their values on a dense subset. Two continuous functions that agree on $\mathbb{Q}$ agree everywhere.

---

**3.** For $x \neq 0$, $|f(x)| = x^2 |\sin(1/x)| \leq x^2$. So $|f(x) - f(0)| = |f(x)| \leq x^2$.

Given $\varepsilon > 0$, take $\delta = \sqrt{\varepsilon}$. Then $|x - 0| < \delta \Rightarrow |f(x) - f(0)| \leq x^2 < \delta^2 = \varepsilon$. So $f$ is continuous at $0$. $\blacksquare$

---

**4.** For $a > 0$: given $\varepsilon > 0$, want $|\sqrt{x} - \sqrt{a}| < \varepsilon$. Rationalise:
$$|\sqrt{x} - \sqrt{a}| = \frac{|x - a|}{\sqrt{x} + \sqrt{a}} \leq \frac{|x-a|}{\sqrt{a}}.$$

Take $\delta = \varepsilon \sqrt{a}$. Then $|x - a| < \delta \Rightarrow |\sqrt{x} - \sqrt{a}| \leq |x-a|/\sqrt{a} < \varepsilon$.

For $a = 0$: $|\sqrt{x} - \sqrt{0}| = \sqrt{x}$. Want $\sqrt{x} < \varepsilon$, i.e., $x < \varepsilon^2$. Take $\delta = \varepsilon^2$. $\blacksquare$

---

**5.** Given $\varepsilon > 0$, take $\delta = \varepsilon^2$. Then for $|x - y| < \delta$:
$$|f(x) - f(y)| \leq |x - y|^{1/2} < \delta^{1/2} = \varepsilon.$$

The same $\delta$ works at every point $a$ (and in fact at every pair), so $f$ is not just continuous but **uniformly continuous** (see [[20-ivt-and-connectedness]]). $\blacksquare$

---

## 16.11 Summary

> **Three equivalent views of continuity at $a$:**
>
> 1. **$\varepsilon$-$\delta$:** $\forall \varepsilon > 0, \exists \delta > 0 : |x - a| < \delta \Rightarrow |f(x) - f(a)| < \varepsilon$.
> 2. **Limit-based:** $\lim_{x \to a} f(x) = f(a)$.
> 3. **Sequential (Heine):** $x_n \to a \Rightarrow f(x_n) \to f(a)$.

> **Building continuous functions.** Polynomials, $|x|$, $\sqrt{x}$, $e^x$, $\ln x$, $\sin x$, $\cos x$ are continuous on their natural domains. Sums, products, quotients (where denominator $\neq 0$), and compositions of continuous functions are continuous.

> **Pathological examples.** Dirichlet's function (nowhere continuous), Thomae's function (continuous exactly on the irrationals), $\sin(1/x)$ (no limit at 0). These test our intuitions and show the richness of the definition.

The next lessons examine what continuity preserves — most notably, compactness and connectedness — and lead to the great theorems of Weierstrass and Bolzano.

---

## Related Topics

- [[09-convergence-and-limits]] — sequence limits, used in Heine's criterion
- [[17-types-of-discontinuity-monotonic]] — classifying points of discontinuity
- [[18-important-limits-infinite-limits]] — limits at $\infty$, infinite limits
- [[20-ivt-and-connectedness]] — Intermediate Value Theorem, uniform continuity
- [[07-compact-sets]] — compactness, underlying Weierstrass extreme value theorem
- [[05-open-sets-closed-sets]] — topological basis for preimage characterisation
