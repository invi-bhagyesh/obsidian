# 17. Types of Discontinuity and Monotonic Functions

A function that is not continuous at a point can fail in several qualitatively different ways. Classifying these failure modes illuminates both the nature of continuity and the structure of pathological functions. Moreover, **monotonic** functions — despite their seemingly restrictive definition — are automatically well-behaved: they can have only simple (jump) discontinuities, and the set of such points is always **countable**.

---

## 17.1 One-Sided Limits Revisited

Recall from [[16-continuity]] the one-sided limits
$$f(a^+) = \lim_{x \to a^+} f(x), \qquad f(a^-) = \lim_{x \to a^-} f(x).$$

$f$ is continuous at $a$ iff both one-sided limits exist and are equal to $f(a)$.

There are three ways this can fail:

1. Both one-sided limits exist and are equal to a common value $L$, but $L \neq f(a)$ (or $f(a)$ is undefined).
2. Both one-sided limits exist but they differ: $f(a^+) \neq f(a^-)$.
3. At least one one-sided limit fails to exist.

This classification gives three standard types of discontinuity.

---

## 17.2 Classification of Discontinuities

> **Definition 17.1 (Removable discontinuity).**
> $f$ has a **removable discontinuity** at $a$ if $\lim_{x \to a} f(x) = L$ exists (so both one-sided limits equal $L$), but either $f(a) \neq L$ or $f(a)$ is undefined.

The discontinuity can be "removed" by redefining $f(a) = L$: the resulting function is continuous at $a$.

**Examples.**
- $f(x) = \frac{\sin x}{x}$ for $x \neq 0$. $\lim_{x \to 0} f(x) = 1$, but $f(0)$ is undefined. Setting $f(0) = 1$ removes the discontinuity.
- $g(x) = \frac{x^2 - 4}{x - 2}$ for $x \neq 2$; redefine $g(2) = 4$ (see Example 16.9.5).

---

> **Definition 17.2 (Jump discontinuity / discontinuity of the first kind).**
> $f$ has a **jump discontinuity** at $a$ if both one-sided limits $f(a^+)$ and $f(a^-)$ exist and are finite, but $f(a^+) \neq f(a^-)$.
>
> The **jump** of $f$ at $a$ is $f(a^+) - f(a^-)$.

**Examples.**
- The sign function $\operatorname{sgn}(x)$ at $a = 0$: $\operatorname{sgn}(0^+) = 1$, $\operatorname{sgn}(0^-) = -1$. Jump $= 2$.
- The floor function $\lfloor x \rfloor$ at any integer $n$: $\lfloor n^+ \rfloor = n$, $\lfloor n^- \rfloor = n - 1$. Jump $= 1$.

> **Definition 17.3 (Discontinuity of the second kind / essential discontinuity).**
> $f$ has an **essential** (or **second-kind**) discontinuity at $a$ if at least one of $f(a^+), f(a^-)$ does not exist (in $\mathbb{R}$).

**Examples.**
- $f(x) = \sin(1/x)$ at $a = 0$: neither one-sided limit exists (oscillation).
- $g(x) = 1/x$ at $a = 0$: $g(0^+) = +\infty$, $g(0^-) = -\infty$ (limits don't exist as finite real numbers).
- Dirichlet function $D(x)$ at every point: neither one-sided limit exists due to rationals and irrationals both clustering everywhere.

> **Summary table.**
>
> | Type | $f(a^+)$ | $f(a^-)$ | Relationship to $f(a)$ |
> |------|----------|----------|----------|
> | Continuous | exists | exists | both $= f(a)$ |
> | Removable | exists | exists | $f(a^+) = f(a^-) \neq f(a)$ (or undefined) |
> | Jump (1st kind) | exists | exists | $f(a^+) \neq f(a^-)$ |
> | Essential (2nd kind) | at least one fails | — |

---

## 17.3 Monotonic Functions

> **Definition 17.4 (Monotonic function).**
> $f : E \to \mathbb{R}$ is **monotonically increasing** (or just **increasing**) if $x < y \Rightarrow f(x) \leq f(y)$. It is **strictly increasing** if $x < y \Rightarrow f(x) < f(y)$. Decreasing / strictly decreasing are defined analogously. A function that is increasing or decreasing is called **monotonic**.

Monotonic functions have remarkable regularity properties, as the next results show.

---

## 17.4 One-Sided Limits Always Exist for Monotonic Functions

> **Theorem 17.5 (One-sided limits for monotonic functions).**
> Let $f : (a, b) \to \mathbb{R}$ be increasing. For every $c \in (a, b)$:
>
> (i) $f(c^-) = \sup \{f(x) : a < x < c\}$ exists (finite or $-\infty$).
>
> (ii) $f(c^+) = \inf \{f(x) : c < x < b\}$ exists (finite or $+\infty$).
>
> (iii) $f(c^-) \leq f(c) \leq f(c^+)$.

*Proof.*

**(i):** Let $A = \{f(x) : a < x < c\}$. Since $f(x) \leq f(c)$ for $x < c$, $A$ is bounded above by $f(c)$. So $s = \sup A$ exists and $s \leq f(c)$.

Claim: $\lim_{x \to c^-} f(x) = s$. Given $\varepsilon > 0$, by definition of supremum there is $x_0 < c$ with $f(x_0) > s - \varepsilon$. Since $f$ is increasing, for $x_0 < x < c$, $f(x) \geq f(x_0) > s - \varepsilon$, and $f(x) \leq s$. So $s - \varepsilon < f(x) \leq s$, hence $|f(x) - s| < \varepsilon$. So $f(c^-) = s$.

**(ii):** Analogous, with $B = \{f(x) : c < x < b\}$ bounded below by $f(c)$.

**(iii):** $f(c^-) = s \leq f(c)$; $f(c) \leq \inf B = f(c^+)$. $\blacksquare$

> **Corollary 17.6.** A monotonic function on an interval has **no essential discontinuities** — every discontinuity is a jump discontinuity, with $f(c^-) < f(c^+)$.

Combined: if $f$ is monotonic and discontinuous at $c$, then it must be a jump with $f(c^-) < f(c) \leq f(c^+)$ (or $\geq$ for decreasing).

---

## 17.5 Discontinuities of Monotonic Functions are Countable

> **Theorem 17.7.** A monotonic function $f : (a, b) \to \mathbb{R}$ has at most **countably many** discontinuities.

*Proof.* Assume $f$ is increasing. Let $D \subset (a, b)$ be the set of discontinuities. By Corollary 17.6, each $c \in D$ gives a jump $f(c^-) < f(c^+)$, i.e., an open interval $(f(c^-), f(c^+))$ of positive length.

**Key claim.** The intervals $(f(c^-), f(c^+))$ for different $c \in D$ are **pairwise disjoint**.

If $c_1 < c_2$ in $D$, pick any $c_1 < x < c_2$. Then $f(c_1^+) \leq f(x) \leq f(c_2^-)$. So $f(c_1^+) \leq f(c_2^-)$, which means $(f(c_1^-), f(c_1^+))$ lies entirely to the left of (and does not meet) $(f(c_2^-), f(c_2^+))$. ✓

From each such open interval, pick a rational number $r_c$. This gives an injection $D \hookrightarrow \mathbb{Q}$, $c \mapsto r_c$ (different $c$'s give disjoint intervals, hence different rationals). Since $\mathbb{Q}$ is countable (see [[04-sets-finite-countable-uncountable]]), $D$ is countable. $\blacksquare$

> **Remark.** This is a striking result: **no monotonic function can have uncountably many discontinuities**. In particular, a monotonic function on an interval must be continuous at "most" points (all but countably many), without any additional smoothness hypothesis.

---

## 17.6 Monotonic Functions: Continuity Equivalents

> **Theorem 17.8 (Continuity characterisation for monotonic functions).**
> Let $f : [a, b] \to \mathbb{R}$ be increasing. Then $f$ is continuous on $[a, b]$ iff the image $f([a, b])$ is the interval $[f(a), f(b)]$.

*Proof.*

**(⇒)** $f$ continuous on $[a, b]$ compact, so $f([a, b])$ is compact (image of compact under continuous). By the Intermediate Value Theorem (see [[20-ivt-and-connectedness]]), $f([a,b])$ is also an interval. Combined with $f(a) \leq f(x) \leq f(b)$, the image is exactly $[f(a), f(b)]$.

**(⇐)** Suppose $f$ is discontinuous at some $c \in [a, b]$, a jump: $f(c^-) < f(c^+)$. Then the interval $(f(c^-), f(c^+))$ has at most one value of $f$ (namely $f(c)$), so it contains a real number not in $f([a, b])$ — contradicting $f([a, b]) = [f(a), f(b)]$. $\blacksquare$

> **Key insight.** For monotonic functions, continuity is equivalent to "no gaps in the image" — i.e., hitting every intermediate value.

---

## 17.7 Monotonic Functions and Inverses

> **Theorem 17.9 (Continuity of inverse).**
> If $f : [a, b] \to \mathbb{R}$ is **strictly monotonic** and continuous, then $f$ is a bijection onto $[f(a), f(b)]$ (or $[f(b), f(a)]$ for decreasing), and the inverse $f^{-1}$ is also continuous and strictly monotonic.

*Proof sketch.* 

Injectivity follows from strict monotonicity. Surjectivity onto the interval $[f(a), f(b)]$ follows from IVT. For continuity of the inverse: let $g = f^{-1}$. $g$ is strictly monotonic (same direction as $f$). Suppose $g$ has a jump at some $y_0 \in (f(a), f(b))$: $g(y_0^-) < g(y_0^+)$. Then on the interval $(g(y_0^-), g(y_0^+))$ — excluding $g(y_0)$ — $f$ takes no value in a neighbourhood of $y_0$, contradicting continuity of $f$. So $g$ has no jumps, hence (by Corollary 17.6 for $g$) is continuous. $\blacksquare$

> **Example.** $f(x) = x^3$ is strictly increasing and continuous on $\mathbb{R}$. Its inverse $f^{-1}(x) = x^{1/3}$ is therefore also continuous on $\mathbb{R}$.

---

## 17.8 Worked Examples

**Example 1.** Classify the discontinuity of
$$f(x) = \begin{cases} \frac{\sin x}{x} & x \neq 0 \\ 2 & x = 0 \end{cases}$$
at $x = 0$.

*Solution:* $\lim_{x \to 0} \frac{\sin x}{x} = 1$. So $f(0^+) = f(0^-) = 1$, but $f(0) = 2 \neq 1$. This is a **removable discontinuity** — redefining $f(0) = 1$ would make $f$ continuous.

---

**Example 2.** Classify the discontinuity of $f(x) = \lfloor x \rfloor$ at $x = 3$.

*Solution:*
- $f(3) = 3$ (since $\lfloor 3 \rfloor = 3$).
- $f(3^-) = \lim_{x \to 3^-} \lfloor x \rfloor = 2$ (for $x$ slightly less than 3, $\lfloor x \rfloor = 2$).
- $f(3^+) = \lim_{x \to 3^+} \lfloor x \rfloor = 3$.

Both one-sided limits exist but differ ($2 \neq 3$). **Jump discontinuity** of magnitude 1.

---

**Example 3.** Classify the discontinuity of $f(x) = \sin(1/x)$ at $x = 0$.

*Solution:* Consider $x_n = 1/(n\pi) \to 0^+$: $f(x_n) = \sin(n\pi) = 0$. Consider $y_n = 1/(2n\pi + \pi/2) \to 0^+$: $f(y_n) = \sin(2n\pi + \pi/2) = 1$. Different limits along different sequences, so $f(0^+)$ does not exist. Similarly $f(0^-)$ does not exist. **Essential discontinuity (of the second kind)**.

---

**Example 4 (Monotonic function with countable discontinuities).** Let $\{q_n\}$ be an enumeration of $\mathbb{Q} \cap (0, 1)$. Define
$$f(x) = \sum_{q_n \leq x} \frac{1}{2^n}, \qquad x \in [0, 1].$$

Show $f$ is monotonically increasing on $[0,1]$ with a jump discontinuity exactly at each rational $q_n$.

*Solution:*

**Monotonicity.** If $x \leq y$, then $\{n : q_n \leq x\} \subset \{n : q_n \leq y\}$, so $f(x) \leq f(y)$.

**Boundedness.** $f(x) \leq \sum_{n=1}^{\infty} 1/2^n = 1$.

**Jump at $q_N$.** For $x < q_N$, $f(x)$ does not include the term $1/2^N$. For $x \geq q_N$, it does. So
$$f(q_N^+) - f(q_N^-) = \frac{1}{2^N} > 0,$$
a jump.

**Continuity at irrationals $a \in (0,1)$.** Given $\varepsilon > 0$, find $N$ with $\sum_{n > N} 1/2^n < \varepsilon$. Consider the finite set $\{q_1, \ldots, q_N\}$; none equals $a$ (irrational). Let $\delta = \min |a - q_n|/2$ over $n \leq N$. For $|x - a| < \delta$, the set $\{n \leq N : q_n \leq x\}$ agrees with $\{n \leq N : q_n \leq a\}$ (since we haven't crossed any of these rationals). So
$$|f(x) - f(a)| \leq \sum_{n > N} \frac{1}{2^n} < \varepsilon. \ \blacksquare$$

> **Moral.** We can explicitly construct a monotonic function discontinuous on any prescribed countable set.

---

**Example 5.** Let $f$ be increasing on $[0, 1]$ with $f(0) = 0$ and $f(1) = 1$. Show that if $f$ is continuous, then $f([0, 1]) = [0, 1]$.

*Solution:* Continuous image of $[0, 1]$ is compact, hence closed and bounded. By IVT, the image is an interval. So $f([0, 1])$ is a closed bounded interval. Containing $f(0) = 0$ and $f(1) = 1$, and contained in $[\min f, \max f] \supseteq [0, 1]$, it must be $[0, 1]$ exactly. $\blacksquare$

This is a special case of Theorem 17.8.

---

## 17.9 Practice Problems

1. Classify the discontinuity at $x = 0$ for each function:
   (a) $f(x) = \frac{|x|}{x}$ for $x \neq 0$, $f(0) = 0$.
   (b) $g(x) = \frac{1}{x^2}$ for $x \neq 0$, $g(0) = 0$.
   (c) $h(x) = \frac{x^2 - x}{x}$ for $x \neq 0$, $h(0) = -1$.

2. Let $f(x) = \lfloor x \rfloor + \{x\}^2$, where $\{x\} = x - \lfloor x \rfloor$. Find all discontinuities and classify them.

3. Let $D$ be a countable subset of $\mathbb{R}$. Construct an increasing function $\mathbb{R} \to \mathbb{R}$ whose set of discontinuities is exactly $D$.

4. Let $f : [a, b] \to \mathbb{R}$ be increasing. Suppose $f$ takes every value between $f(a)$ and $f(b)$. Prove $f$ is continuous.

5. Can a monotonic function on $[0, 1]$ be discontinuous at every rational in $[0, 1]$ while being continuous at every irrational? Explain.

### Solutions

**1.**

(a) $f(0^+) = 1$, $f(0^-) = -1$, $f(0) = 0$. Both one-sided limits exist and are finite but differ. **Jump discontinuity** of magnitude 2.

(b) $g(0^+) = +\infty$, $g(0^-) = +\infty$. Neither one-sided limit is finite. **Essential discontinuity** (2nd kind). (One could also distinguish this as "infinite limits" but in the classification above, any failure of finiteness of either one-sided limit is 2nd kind.)

(c) $h(x) = x - 1$ for $x \neq 0$. $\lim_{x \to 0} h(x) = -1 = h(0)$. So $h$ is **continuous** at 0, not discontinuous.

---

**2.** Write $f(x) = \lfloor x \rfloor + (x - \lfloor x \rfloor)^2$.

For $x$ not an integer, $\lfloor x \rfloor$ is locally constant and $\{x\}$ is continuous, so $f$ is continuous.

At an integer $n$:
- $f(n^-) = \lim_{x \to n^-} (\lfloor x \rfloor + \{x\}^2) = (n-1) + 1^2 = n$.
- $f(n^+) = \lim_{x \to n^+} (\lfloor x \rfloor + \{x\}^2) = n + 0 = n$.
- $f(n) = n + 0 = n$.

All three equal, so $f$ is continuous at every integer too. Therefore $f$ is **continuous everywhere**.

---

**3.** Enumerate $D = \{d_1, d_2, \ldots\}$. Define
$$f(x) = \sum_{d_n \leq x} \frac{1}{2^n}.$$
(Same construction as Example 4.) This sum is convergent because the full series $\sum 1/2^n = 1$ dominates it.

- Monotonically increasing: as $x$ grows, more terms are included.
- Discontinuous exactly at each $d_n$: jump of size $1/2^n$ at $d_n$ (argument as before).
- Continuous elsewhere: if $a \notin D$, then for any $\varepsilon > 0$ choose $N$ with $\sum_{n > N} 2^{-n} < \varepsilon$; let $\delta$ be the distance from $a$ to the finite set $\{d_1, \ldots, d_N\}$; then $|f(x) - f(a)| < \varepsilon$ for $|x - a| < \delta$. $\blacksquare$

---

**4.** We prove the contrapositive: if $f$ is discontinuous, then it misses some value between $f(a)$ and $f(b)$.

Suppose $f$ has a discontinuity at $c \in [a, b]$. By Corollary 17.6, this must be a jump: $f(c^-) < f(c^+)$ (with, say, $f$ increasing). Pick any $y_0 \in (f(c^-), f(c^+))$ with $y_0 \neq f(c)$.

**Claim:** $y_0 \notin f([a, b])$.
- For $x < c$: $f(x) \leq f(c^-) < y_0$.
- For $x > c$: $f(x) \geq f(c^+) > y_0$.
- For $x = c$: $f(c) \neq y_0$ by choice.

So no $x \in [a, b]$ satisfies $f(x) = y_0$. Contradiction with the hypothesis that $f$ takes every value in $[f(a), f(b)]$. $\blacksquare$

---

**5.** **Yes.** Take $\{q_n\}$ an enumeration of $\mathbb{Q} \cap [0, 1]$ and use the construction of Problem 3 / Example 4:
$$f(x) = \sum_{q_n \leq x} \frac{1}{2^n}.$$
This function is increasing, has jump discontinuities exactly at each rational, and is continuous at every irrational. $\blacksquare$

> **Remark.** Contrast Example 4 (Thomae's function) which is continuous at irrationals and discontinuous at rationals but **not** monotonic. The monotonic version here uses a different, explicit construction.

---

## 17.10 Summary

> **Classification of discontinuities at $a$.**
>
> - **Removable:** $\lim_{x \to a} f(x)$ exists but $\neq f(a)$ (or $f(a)$ undefined).
> - **Jump (1st kind):** $f(a^+), f(a^-)$ both finite but different.
> - **Essential (2nd kind):** at least one one-sided limit does not exist (as a finite number).

> **Monotonic functions are special:**
>
> 1. Every discontinuity is a jump (no essential discontinuities).
> 2. The set of discontinuities is **at most countable**.
> 3. Continuity ⇔ image is an interval.
> 4. Strictly monotonic continuous functions have continuous inverses.

> **Philosophical takeaway.** Monotonicity is a weak-looking hypothesis but buys enormous regularity. This is a recurring theme: simple order-theoretic properties force analytic good behaviour, even without any explicit smoothness.

> **Looking ahead.** Monotonic functions are the model for **functions of bounded variation** (every BV function is a difference of two monotonic), which play a central role in the Riemann-Stieltjes integral ([[25-riemann-stieltjes-integral]]).

---

## Related Topics

- [[16-continuity]] — $\varepsilon$-$\delta$ and sequential definitions
- [[18-important-limits-infinite-limits]] — limits at infinity, infinite limits
- [[20-ivt-and-connectedness]] — IVT used in continuity ⇔ interval image
- [[25-riemann-stieltjes-integral]] — bounded variation, monotonic integrators
- [[04-sets-finite-countable-uncountable]] — countability used for discontinuity set
