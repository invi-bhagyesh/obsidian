# 16. Continuity and Limits of Functions

> **The central object.** With sequences and series now rigorously developed, we turn to **functions** $f : \mathbb{R} \to \mathbb{R}$ (or, more generally, to $f : E \to \mathbb{R}$ for $E \subset \mathbb{R}$). The intuition of continuity — "small change in input gives small change in output", "graph has no jumps" — is made precise by the **$\varepsilon$-$\delta$ definition**, one of the single most important definitions in analysis, due to Weierstrass and Cauchy.
>
> This chapter develops:
>
> - The **limit of a function at a point**, both via $\varepsilon$-$\delta$ (Cauchy/Weierstrass) and via sequences (Heine's criterion).
> - The **algebra of limits**: how limits interact with $+, \cdot, /, |\cdot|$.
> - The **definition of continuity** and its three equivalent formulations ($\varepsilon$-$\delta$, limit-based, sequential).
> - The **topological characterisation** — preimages of open sets are open — which eventually becomes the *definition* of continuity in abstract topology.
> - Continuity of all elementary functions (polynomials, rational, roots, exponential, log, trig).

---

## 16.1 Limits of Functions

> **Definition 16.1 (Limit point / cluster point).**
> Let $E \subset \mathbb{R}$. A point $a \in \mathbb{R}$ is a **limit point** (or **accumulation point**) of $E$ if every neighbourhood $(a - \delta, a + \delta)$ of $a$ contains at least one point of $E$ **other than $a$**.

Equivalently: for every $\delta > 0$, the punctured neighbourhood $(a - \delta, a) \cup (a, a + \delta)$ meets $E$. Note that $a$ need not belong to $E$ itself.

*Examples.*
- For $E = (0, 1)$, every point of $[0, 1]$ is a limit point.
- For $E = \{1/n : n \in \mathbb{N}\}$, the only limit point is $0$ (none of the points $1/n$ is a limit point, since around $1/n$ there is a small interval containing no other point of $E$).
- For $E = \mathbb{Z}$, there are no limit points (each integer is isolated).

> **Definition 16.2 (Limit of a function — $\varepsilon$-$\delta$).**
> Let $f : E \to \mathbb{R}$ and let $a$ be a limit point of $E$. We say
> $$\lim_{x \to a} f(x) = L$$
> if for every $\varepsilon > 0$ there exists $\delta > 0$ such that
> $$x \in E, \ 0 < |x - a| < \delta \ \Longrightarrow\ |f(x) - L| < \varepsilon.$$

> **Important.** The condition $0 < |x - a|$ **excludes $x = a$**. The value $f(a)$ (or whether $f$ is even defined at $a$) plays no role in $\lim_{x \to a} f(x)$. We require $a$ to be a limit point of $E$ precisely so that *some* $x \in E$ with $0 < |x - a| < \delta$ exists, making the statement non-vacuous.

> **Theorem 16.3 (Uniqueness of limit).**
> If $\lim_{x \to a} f(x) = L_1$ and $\lim_{x \to a} f(x) = L_2$, then $L_1 = L_2$.

**Proof.**

*Strategy.* Assume two distinct limits and derive a contradiction from the triangle inequality, exploiting the fact that $f(x)$ cannot be simultaneously close to two different values.

*Step 1: Set up a suitable $\varepsilon$.* Suppose for contradiction $L_1 \neq L_2$. Then $|L_1 - L_2| > 0$, and we may set
$$\varepsilon := \frac{|L_1 - L_2|}{2} > 0.$$

*Step 2: Apply the limit definition for each $L_i$.* By hypothesis, for this $\varepsilon$ there exist $\delta_1, \delta_2 > 0$ such that
$$x \in E,\ 0 < |x - a| < \delta_i \ \Longrightarrow\ |f(x) - L_i| < \varepsilon \qquad (i = 1, 2).$$

*Step 3: Produce a single $x$ satisfying both.* Let $\delta := \min(\delta_1, \delta_2) > 0$. Since $a$ is a limit point of $E$, the punctured $\delta$-ball meets $E$; pick any $x_0 \in E$ with $0 < |x_0 - a| < \delta$. This $x_0$ satisfies both $|f(x_0) - L_1| < \varepsilon$ and $|f(x_0) - L_2| < \varepsilon$.

*Step 4: Triangle inequality.* Now
$$|L_1 - L_2| = |L_1 - f(x_0) + f(x_0) - L_2| \leq |L_1 - f(x_0)| + |f(x_0) - L_2| < \varepsilon + \varepsilon = 2\varepsilon = |L_1 - L_2|.$$

*Step 5: Contradiction.* We obtained $|L_1 - L_2| < |L_1 - L_2|$, absurd. Hence $L_1 = L_2$. $\blacksquare$

*Why limit points matter.* In Step 3 we used that $a$ is a limit point of $E$. Without this, the punctured ball might miss $E$ entirely, the implication would be vacuously true for *any* $L$, and uniqueness would fail.

---

## 16.2 Sequential Characterisation — Heine's Theorem

> **Theorem 16.4 (Heine's sequential criterion).**
> Let $f : E \to \mathbb{R}$ with $a$ a limit point of $E$. Then $\lim_{x \to a} f(x) = L$ if and only if
>
> **for every sequence** $(x_n) \subset E \setminus \{a\}$ with $x_n \to a$, the sequence $f(x_n) \to L$.

**Proof.**

**($\Rightarrow$) Assume the $\varepsilon$-$\delta$ limit.** Let $(x_n) \subset E \setminus \{a\}$ with $x_n \to a$. We show $f(x_n) \to L$.

*Step 1.* Fix $\varepsilon > 0$.

*Step 2.* By Definition 16.2, there exists $\delta > 0$ such that
$$x \in E,\ 0 < |x - a| < \delta \ \Longrightarrow\ |f(x) - L| < \varepsilon. \qquad (\star)$$

*Step 3.* Since $x_n \to a$, there exists $N \in \mathbb{N}$ such that $n \geq N \Rightarrow |x_n - a| < \delta$.

*Step 4.* For $n \geq N$: $x_n \in E$, $x_n \neq a$ (by hypothesis $x_n \in E \setminus \{a\}$), so $0 < |x_n - a| < \delta$. By $(\star)$, $|f(x_n) - L| < \varepsilon$.

*Step 5.* This is the definition of $f(x_n) \to L$.

**($\Leftarrow$) Contrapositive.** Suppose $\lim_{x \to a} f(x) \neq L$. We construct a sequence violating the sequential condition.

*Step 1: Negate the $\varepsilon$-$\delta$ definition.* Negation of "for all $\varepsilon$ there exists $\delta$…" is: there exists $\varepsilon_0 > 0$ such that for every $\delta > 0$, some $x \in E$ with $0 < |x - a| < \delta$ has $|f(x) - L| \geq \varepsilon_0$.

*Step 2: Apply with $\delta = 1/n$.* For each $n \in \mathbb{N}$, take $\delta = 1/n$: there exists $x_n \in E$ with
$$0 < |x_n - a| < \frac{1}{n} \quad \text{and} \quad |f(x_n) - L| \geq \varepsilon_0.$$

*Step 3: Check sequence properties.* The condition $0 < |x_n - a|$ gives $x_n \neq a$, so $x_n \in E \setminus \{a\}$. The condition $|x_n - a| < 1/n$ forces $x_n \to a$ (by the Archimedean property, for any $\eta > 0$ choose $N$ with $1/N < \eta$; then $n \geq N \Rightarrow |x_n - a| < 1/n \leq 1/N < \eta$).

*Step 4: The sequence violates the conclusion.* By construction, $|f(x_n) - L| \geq \varepsilon_0$ for all $n$, so $f(x_n) \not\to L$.

*Step 5.* Contrapositive established: if the sequential condition holds for *every* such $(x_n)$, then the $\varepsilon$-$\delta$ limit must hold. $\blacksquare$

> **Why this matters.** Heine's criterion is a bridge: it lets us import every sequence theorem into the study of functions. For instance:
>
> - **To prove a function has no limit at $a$**: find two sequences $x_n \to a$ and $y_n \to a$ in $E \setminus \{a\}$ with $f(x_n) \to L_1 \neq L_2 \leftarrow f(y_n)$.
> - **Algebra of function limits** (Theorem 16.5 below) follows immediately from algebra of sequence limits.
> - **Monotone/bounded limit theorems** carry over verbatim.

**Example (sequential divergence).** $f(x) = \sin(1/x)$ has **no limit** at $0$.

*Setup.* The domain is $E = \mathbb{R} \setminus \{0\}$, and $0$ is a limit point of $E$.

*Strategy.* Exhibit two sequences $x_n, y_n \to 0$ along which $f$ converges to different values.

*Computation.* Let $x_n = \dfrac{1}{n\pi}$. Then $x_n \to 0$, $x_n \neq 0$, and
$$f(x_n) = \sin(n\pi) = 0 \ \longrightarrow\ 0.$$

Let $y_n = \dfrac{1}{2n\pi + \pi/2}$. Then $y_n \to 0$, $y_n \neq 0$, and
$$f(y_n) = \sin\!\left(2n\pi + \tfrac{\pi}{2}\right) = \sin\!\left(\tfrac{\pi}{2}\right) = 1 \ \longrightarrow\ 1.$$

*Verification.* $0 \neq 1$. By Heine's criterion ($\Leftarrow$ direction, contrapositive), $\lim_{x \to 0} \sin(1/x)$ does not exist.

*Interpretation.* As $x \to 0$, $1/x \to \infty$ and $\sin(1/x)$ oscillates infinitely often between $-1$ and $+1$. The graph has no well-defined "end behaviour" at $0$.

---

## 16.3 Algebra of Limits

> **Theorem 16.5 (Algebraic limit laws for functions).**
> Suppose $\lim_{x \to a} f(x) = L$ and $\lim_{x \to a} g(x) = M$. Then:
>
> (i) $\lim_{x \to a} (f \pm g)(x) = L \pm M$.
>
> (ii) $\lim_{x \to a} (c \cdot f)(x) = cL$ for any constant $c \in \mathbb{R}$.
>
> (iii) $\lim_{x \to a} (f \cdot g)(x) = LM$.
>
> (iv) If $M \neq 0$, $\lim_{x \to a} (f/g)(x) = L/M$.
>
> (v) $\lim_{x \to a} |f(x)| = |L|$.

**Proof.**

*Strategy.* All parts follow at once from the sequential criterion (Theorem 16.4) combined with the corresponding results for sequence limits (proved in [[09-convergence-and-limits]]).

Let $(x_n) \subset E \setminus \{a\}$ with $x_n \to a$ be arbitrary. By Heine's criterion applied to $f$ and $g$:
$$f(x_n) \to L, \qquad g(x_n) \to M.$$

*(i) Sum/difference.* By the sequence sum law,
$$(f \pm g)(x_n) = f(x_n) \pm g(x_n) \longrightarrow L \pm M.$$
Since $(x_n)$ was arbitrary, Heine's criterion ($\Leftarrow$) gives $\lim_{x \to a}(f \pm g)(x) = L \pm M$.

*(ii) Scalar multiple.* $(cf)(x_n) = c \cdot f(x_n) \to cL$ by the sequence scalar law.

*(iii) Product.* $(fg)(x_n) = f(x_n) g(x_n) \to LM$ by the sequence product law.

*(iv) Quotient.* Since $M \neq 0$, the $\varepsilon$-$\delta$ definition gives some $\delta_0 > 0$ such that $0 < |x - a| < \delta_0 \Rightarrow |g(x) - M| < |M|/2$, which by reverse triangle inequality forces $|g(x)| > |M|/2 > 0$. So $g$ is nonzero on a punctured neighbourhood of $a$, and $f/g$ is defined there. Applying Heine, eventually $g(x_n) \neq 0$, so $f(x_n)/g(x_n) \to L/M$ by the sequence quotient law.

*(v) Absolute value.* By reverse triangle inequality $\big||f(x_n)| - |L|\big| \leq |f(x_n) - L| \to 0$, hence $|f(x_n)| \to |L|$.

In each case, the conclusion holds for every $(x_n) \subset E \setminus \{a\}$ with $x_n \to a$, so by Heine the corresponding function limit exists and equals the claimed value. $\blacksquare$

*Remark.* One can also prove each part directly via $\varepsilon$-$\delta$. For example, for (iii), write
$$|f(x)g(x) - LM| \leq |f(x) - L|\,|g(x)| + |L|\,|g(x) - M|,$$
bound $|g(x)|$ by $|M| + 1$ on a suitable neighbourhood, and choose $\delta$ accordingly. Heine's criterion makes this unnecessary.

---

## 16.4 One-Sided Limits

> **Definition 16.6.** The **right-hand limit** $\lim_{x \to a^+} f(x) = L$ means: for every $\varepsilon > 0$, there exists $\delta > 0$ such that
> $$x \in E,\ a < x < a + \delta \ \Longrightarrow\ |f(x) - L| < \varepsilon.$$
> The **left-hand limit** $\lim_{x \to a^-} f(x) = L$ is defined analogously with $a - \delta < x < a$.

*Remark.* For the right-hand limit to be meaningful we require $a$ to be a limit point of $E \cap (a, \infty)$; symmetrically for the left.

> **Theorem 16.7.** $\lim_{x \to a} f(x) = L$ iff $\lim_{x \to a^+} f(x) = L$ and $\lim_{x \to a^-} f(x) = L$.

**Proof.**

*Strategy.* Two-sided convergence splits cleanly into the two one-sided convergences because the condition $0 < |x - a| < \delta$ is the disjoint union of $a - \delta < x < a$ and $a < x < a + \delta$.

*($\Rightarrow$).* Assume the two-sided limit $L$. Given $\varepsilon > 0$, obtain $\delta > 0$ from Def. 16.2: $0 < |x - a| < \delta \Rightarrow |f(x) - L| < \varepsilon$. In particular:
- If $a < x < a + \delta$: then $0 < x - a < \delta$, i.e. $0 < |x - a| < \delta$, so $|f(x) - L| < \varepsilon$. This establishes the right-hand limit.
- If $a - \delta < x < a$: then $0 < a - x < \delta$, i.e. $0 < |x - a| < \delta$, so $|f(x) - L| < \varepsilon$. This establishes the left-hand limit.

*($\Leftarrow$).* Assume both one-sided limits equal $L$. Given $\varepsilon > 0$, obtain $\delta^+, \delta^- > 0$ from the one-sided definitions. Set $\delta = \min(\delta^+, \delta^-) > 0$. If $0 < |x - a| < \delta$, then either $a < x < a + \delta \leq a + \delta^+$ (giving $|f(x) - L| < \varepsilon$) or $a - \delta^- \leq a - \delta < x < a$ (giving $|f(x) - L| < \varepsilon$). Either way, $|f(x) - L| < \varepsilon$. $\blacksquare$

> **Example (sign function).** For
> $$\operatorname{sgn}(x) = \begin{cases} 1 & x > 0 \\ 0 & x = 0 \\ -1 & x < 0 \end{cases},$$
> we have $\lim_{x \to 0^+} \operatorname{sgn}(x) = 1$ (constantly $1$ on $(0, \delta)$) and $\lim_{x \to 0^-} \operatorname{sgn}(x) = -1$ (constantly $-1$ on $(-\delta, 0)$). Since $1 \neq -1$, the two-sided limit $\lim_{x \to 0} \operatorname{sgn}(x)$ does not exist. This is a textbook **jump discontinuity**; see [[17-types-of-discontinuity-monotonic]].

---

## 16.5 Continuity

> **Definition 16.8 ($\varepsilon$-$\delta$ continuity).**
> A function $f : E \to \mathbb{R}$ is **continuous at $a \in E$** if for every $\varepsilon > 0$ there exists $\delta > 0$ such that
> $$x \in E, \ |x - a| < \delta \ \Longrightarrow\ |f(x) - f(a)| < \varepsilon.$$
>
> $f$ is **continuous on $E$** if it is continuous at every point of $E$.

> **Key difference from the limit definition.** The condition is $|x - a| < \delta$, not $0 < |x - a| < \delta$. The point $x = a$ is now included. At $x = a$, the implication becomes $|f(a) - f(a)| = 0 < \varepsilon$, which is automatic and places no constraint.

> **Theorem 16.9 (Characterisations of continuity at a limit point).**
> Suppose $a \in E$ is a limit point of $E$. The following are equivalent:
>
> (i) $f$ is continuous at $a$ ($\varepsilon$-$\delta$).
>
> (ii) $\lim_{x \to a} f(x) = f(a)$.
>
> (iii) **(Sequential / Heine)** For every sequence $(x_n) \subset E$ with $x_n \to a$, $f(x_n) \to f(a)$.

**Proof.**

**(i) $\Leftrightarrow$ (ii).** Both say: $\forall \varepsilon > 0\ \exists \delta > 0$ such that a certain implication holds. The only difference:

- (i): $|x - a| < \delta \Rightarrow |f(x) - f(a)| < \varepsilon$ (for $x \in E$).
- (ii): $0 < |x - a| < \delta \Rightarrow |f(x) - f(a)| < \varepsilon$ (for $x \in E$).

(i) $\Rightarrow$ (ii) is immediate: strengthening the hypothesis by excluding $x = a$ can only *weaken* the implication's requirement. Conversely (ii) $\Rightarrow$ (i): the case $x = a$ requires $|f(a) - f(a)| = 0 < \varepsilon$, which is automatic, so including $x = a$ costs nothing.

**(ii) $\Leftrightarrow$ (iii).** By Heine's theorem (16.4), $\lim_{x \to a} f(x) = L$ is equivalent to: for every $(x_n) \subset E \setminus \{a\}$ with $x_n \to a$, $f(x_n) \to L$.

Setting $L = f(a)$, we ask whether this is equivalent to (iii), which uses sequences $(x_n) \subset E$ (allowing $x_n = a$).

*Heine's condition $\Rightarrow$ (iii).* Given $(x_n) \subset E$ with $x_n \to a$, split into two subsequences: those with $x_n = a$ and those with $x_n \neq a$. For $x_n = a$: $f(x_n) = f(a) \to f(a)$ trivially. For $x_n \neq a$: Heine gives $f(x_n) \to f(a)$. Recombining, $f(x_n) \to f(a)$.

*(iii) $\Rightarrow$ Heine's condition.* Any $(x_n) \subset E \setminus \{a\}$ is in particular $\subset E$, so (iii) applies and gives $f(x_n) \to f(a)$.

Combining, (ii) (equivalently Heine's condition with $L = f(a)$) is equivalent to (iii). $\blacksquare$

> **Isolated points.** If $a \in E$ is **not** a limit point of $E$ (i.e., $a$ is an isolated point of $E$), then $f$ is **automatically continuous at $a$**. Indeed, there is some $\delta_0 > 0$ with $(a - \delta_0, a + \delta_0) \cap E = \{a\}$; then for any $\varepsilon > 0$, take $\delta = \delta_0$, and $|x - a| < \delta$ with $x \in E$ forces $x = a$, giving $|f(x) - f(a)| = 0 < \varepsilon$. **Every function is continuous at every isolated point of its domain** — a quirk of the definition, but a convenient one.

---

## 16.6 Topological Characterisation

> **Theorem 16.10 (Topological continuity).**
> A function $f : \mathbb{R} \to \mathbb{R}$ is continuous on $\mathbb{R}$ iff for every open set $U \subset \mathbb{R}$, the preimage $f^{-1}(U) = \{x \in \mathbb{R} : f(x) \in U\}$ is open.

**Proof.**

**($\Rightarrow$) Assume $f$ continuous.**

*Strategy.* Show $f^{-1}(U)$ is open by exhibiting, around each of its points, an open interval entirely contained in it.

*Step 1.* Let $U \subset \mathbb{R}$ be open. If $f^{-1}(U) = \emptyset$, it is open (vacuously). Otherwise pick any $a \in f^{-1}(U)$, so $f(a) \in U$.

*Step 2.* Since $U$ is open and $f(a) \in U$, there exists $\varepsilon > 0$ with $(f(a) - \varepsilon, f(a) + \varepsilon) \subset U$.

*Step 3.* By continuity of $f$ at $a$, there exists $\delta > 0$ such that
$$|x - a| < \delta \ \Longrightarrow\ |f(x) - f(a)| < \varepsilon \ \Longleftrightarrow\ f(x) \in (f(a) - \varepsilon, f(a) + \varepsilon) \subset U.$$

*Step 4.* Hence $|x - a| < \delta \Rightarrow x \in f^{-1}(U)$, i.e., $(a - \delta, a + \delta) \subset f^{-1}(U)$.

*Step 5.* Every point of $f^{-1}(U)$ has an open-interval neighbourhood inside $f^{-1}(U)$; so $f^{-1}(U)$ is open.

**($\Leftarrow$) Assume preimages of open sets are open.**

*Strategy.* Check continuity at an arbitrary point $a$ by turning the preimage condition back into a $\delta$.

*Step 1.* Fix $a \in \mathbb{R}$ and $\varepsilon > 0$. The set $U := (f(a) - \varepsilon, f(a) + \varepsilon)$ is open.

*Step 2.* By hypothesis, $f^{-1}(U)$ is open. Note $a \in f^{-1}(U)$ since $f(a) \in U$.

*Step 3.* Since $f^{-1}(U)$ is open and contains $a$, there exists $\delta > 0$ with $(a - \delta, a + \delta) \subset f^{-1}(U)$.

*Step 4.* So $|x - a| < \delta \Rightarrow x \in f^{-1}(U) \Rightarrow f(x) \in U \Rightarrow |f(x) - f(a)| < \varepsilon$.

*Step 5.* This is precisely continuity at $a$. Since $a$ was arbitrary, $f$ is continuous on $\mathbb{R}$. $\blacksquare$

> **Equivalent form (closed sets).** $f$ is continuous iff preimages of **closed** sets are closed. This follows immediately from $f^{-1}(A^c) = (f^{-1}(A))^c$ and the fact that complements of open sets are closed.

> **Why this matters.** In a general topological space there is no notion of distance, no $\varepsilon$, no $\delta$. But open sets still exist. The preimage characterisation is the *definition* of continuity in point-set topology and in differential geometry. The point-wise $\varepsilon$-$\delta$ formulation is a feature of metric spaces.

---

## 16.7 Operations Preserving Continuity

> **Theorem 16.11 (Algebra of continuous functions).**
> If $f, g : E \to \mathbb{R}$ are continuous at $a \in E$, then so are
> $$f \pm g, \qquad c f \ (c \in \mathbb{R}), \qquad f \cdot g, \qquad |f|,$$
> and $f/g$ provided $g(a) \neq 0$ (on the subdomain where $g \neq 0$).

**Proof.**

*Case 1: $a$ is a limit point of $E$.* By Theorem 16.9 (ii), continuity at $a$ is equivalent to $\lim_{x \to a} f(x) = f(a)$ and $\lim_{x \to a} g(x) = g(a)$. By the algebra of limits (Theorem 16.5):
- $\lim_{x \to a}(f \pm g)(x) = f(a) \pm g(a) = (f \pm g)(a)$.
- $\lim_{x \to a}(cf)(x) = cf(a) = (cf)(a)$.
- $\lim_{x \to a}(fg)(x) = f(a)g(a) = (fg)(a)$.
- If $g(a) \neq 0$: $\lim_{x \to a}(f/g)(x) = f(a)/g(a) = (f/g)(a)$.
- $\lim_{x \to a} |f(x)| = |f(a)|$.

In each case the combined function's limit at $a$ equals its value at $a$ — which is continuity at $a$.

*Case 2: $a$ is an isolated point of $E$.* Then every function is continuous at $a$ (see comment after Theorem 16.9); in particular the combined functions are. $\blacksquare$

> **Theorem 16.12 (Composition of continuous functions).**
> If $f : E \to \mathbb{R}$ is continuous at $a \in E$, $g : F \to \mathbb{R}$ is continuous at $b = f(a) \in F$, and $f(E) \subset F$, then $g \circ f : E \to \mathbb{R}$ is continuous at $a$.

**Proof.**

*Strategy.* Chain $\varepsilon$-$\delta$s: use $g$'s continuity to produce an intermediate tolerance $\eta$, then use $f$'s continuity with tolerance $\eta$ to produce $\delta$.

*Step 1: Fix $\varepsilon > 0$.* Goal: find $\delta > 0$ with $|x - a| < \delta, x \in E \Rightarrow |g(f(x)) - g(f(a))| < \varepsilon$.

*Step 2: Apply continuity of $g$ at $b = f(a)$.* There exists $\eta > 0$ such that
$$y \in F,\ |y - b| < \eta \ \Longrightarrow\ |g(y) - g(b)| < \varepsilon. \qquad (\star)$$

*Step 3: Apply continuity of $f$ at $a$ with tolerance $\eta$.* There exists $\delta > 0$ such that
$$x \in E,\ |x - a| < \delta \ \Longrightarrow\ |f(x) - f(a)| < \eta. \qquad (\star\star)$$

*Step 4: Chain the implications.* Let $x \in E$ with $|x - a| < \delta$. By $(\star\star)$, $|f(x) - f(a)| < \eta$. Setting $y = f(x)$, we have $y \in f(E) \subset F$ and $|y - b| < \eta$. By $(\star)$, $|g(y) - g(b)| < \varepsilon$, i.e.,
$$|g(f(x)) - g(f(a))| < \varepsilon.$$

*Step 5.* This is continuity of $g \circ f$ at $a$. $\blacksquare$

*Sequential proof (alternative).* Given $x_n \to a$ in $E$, continuity of $f$ gives $f(x_n) \to f(a) = b$, and continuity of $g$ then gives $g(f(x_n)) \to g(b) = (g \circ f)(a)$. By Heine, $g \circ f$ is continuous at $a$.

*Topological proof (yet another).* For any open $U$, $(g \circ f)^{-1}(U) = f^{-1}(g^{-1}(U))$. Since $g$ is continuous, $g^{-1}(U)$ is open; since $f$ is continuous, $f^{-1}$ of an open set is open; so the composition's preimage of $U$ is open.

---

## 16.8 Continuity of Elementary Functions

Using the theorems above, we establish continuity of all the elementary functions. Each argument combines (i) a base case proved directly from $\varepsilon$-$\delta$, and (ii) the algebra/composition theorems.

**Identity and constants.** $f(x) = x$ is continuous on $\mathbb{R}$: given $\varepsilon > 0$, take $\delta = \varepsilon$, then $|x - a| < \delta \Rightarrow |f(x) - f(a)| = |x - a| < \varepsilon$. Constant functions $f(x) = c$ are trivially continuous (any $\delta$ works).

**Polynomials.** By iterating the product rule (Theorem 16.11) on $x \mapsto x$, all monomials $x^k$ are continuous. By linear combinations (sum + scalar multiple), every polynomial
$$p(x) = c_0 + c_1 x + c_2 x^2 + \cdots + c_n x^n$$
is continuous on $\mathbb{R}$.

**Rational functions.** $p(x)/q(x)$, with $p, q$ polynomials, is continuous on $\{x : q(x) \neq 0\}$, by the quotient rule.

**$n$-th roots.** $f(x) = x^{1/n}$ is continuous on $[0, \infty)$ (and on $\mathbb{R}$ for odd $n$). For $n = 2$ we prove this in Practice Problem 4 below; the general case uses either $|x^{1/n} - a^{1/n}| \leq \text{polynomial bound in } |x-a|^{1/n}$ or the inverse-function theorem (continuous, strictly increasing surjection from $[0,\infty)$ to $[0,\infty)$ has a continuous inverse).

**Exponential.** $e^x = \sum_{n=0}^\infty \frac{x^n}{n!}$ is continuous on $\mathbb{R}$. Continuity at $0$ follows from $|e^x - 1| \leq |x| e^{|x|}$ (from the power series); continuity at arbitrary $a$ follows by the identity $e^x - e^a = e^a(e^{x-a} - 1)$. A rigorous treatment via uniform convergence on compact sets appears in [[18-important-limits-infinite-limits]].

**Logarithm.** $\ln x$ is continuous on $(0, \infty)$: it is the inverse of the continuous, strictly increasing bijection $\exp : \mathbb{R} \to (0, \infty)$, and the inverse of such a map is itself continuous.

**Trigonometric functions.** $\sin x$ and $\cos x$ are continuous on $\mathbb{R}$. Proof for $\sin$:

*Setup.* Use the sum-to-product identity
$$\sin x - \sin a = 2 \cos\!\left(\frac{x + a}{2}\right) \sin\!\left(\frac{x - a}{2}\right).$$

*Strategy.* Bound each factor, exploiting $|\cos \theta| \leq 1$ and $|\sin \theta| \leq |\theta|$.

*Computation.*
$$|\sin x - \sin a| = 2\,|\cos\tfrac{x+a}{2}|\,|\sin\tfrac{x-a}{2}| \leq 2 \cdot 1 \cdot \tfrac{|x-a|}{2} = |x - a|.$$

*Verification.* Given $\varepsilon > 0$, take $\delta = \varepsilon$: $|x - a| < \delta \Rightarrow |\sin x - \sin a| \leq |x - a| < \varepsilon$.

*Interpretation.* $\sin$ is **Lipschitz continuous** with constant $1$. The same argument with $\cos x - \cos a = -2 \sin\!\frac{x+a}{2}\sin\!\frac{x-a}{2}$ gives Lipschitz continuity of $\cos$. All other trig functions are built from $\sin, \cos$ by quotients and are continuous where defined.

---

## 16.9 Worked Examples

### Example 1. $\varepsilon$-$\delta$ continuity of $x^2$ at $a = 3$

**Claim.** $f(x) = x^2$ is continuous at $a = 3$.

*Setup.* Given $\varepsilon > 0$, we need $\delta > 0$ such that $|x - 3| < \delta$ implies $|x^2 - 9| < \varepsilon$.

*Strategy.* Factor $x^2 - 9 = (x - 3)(x + 3)$. The factor $|x - 3|$ is under our control (it is less than $\delta$). The factor $|x + 3|$ is *not* directly controlled, so we must **cap $|x + 3|$ using a preliminary restriction on $\delta$**.

*Computation.*

**Step 1: Cap $|x + 3|$.** Restrict $\delta \leq 1$. Then $|x - 3| < 1$ gives $-1 < x - 3 < 1$, so $2 < x < 4$. Adding $3$: $5 < x + 3 < 7$. In particular $|x + 3| < 7$.

**Step 2: Bound $|x^2 - 9|$.** With $|x + 3| < 7$ and $|x - 3| < \delta$:
$$|x^2 - 9| = |x - 3|\,|x + 3| < 7\delta.$$

**Step 3: Choose $\delta$ to make $7\delta \leq \varepsilon$.** Take $\delta := \min\!\left(1,\ \dfrac{\varepsilon}{7}\right)$.

*Verification.* Let $|x - 3| < \delta$. Then $|x - 3| < 1$ ensures $|x + 3| < 7$ (Step 1), and $|x - 3| < \varepsilon/7$ gives
$$|x^2 - 9| = |x - 3|\,|x + 3| < \frac{\varepsilon}{7} \cdot 7 = \varepsilon. \ \checkmark$$

*Interpretation.* The "min" trick is the signature move for polynomials of degree $\geq 2$: a preliminary cap ($|x - a| < 1$) localises to a bounded window where the other factor is automatically bounded, reducing the problem to a linear $\delta$. $\blacksquare$

---

### Example 2. $\lim_{x \to 0} x \sin(1/x) = 0$

**Claim.** $\displaystyle \lim_{x \to 0} x \sin(1/x) = 0$, where the function is defined on $E = \mathbb{R} \setminus \{0\}$.

*Setup.* $0$ is a limit point of $E$. We seek, for each $\varepsilon > 0$, some $\delta > 0$ with $0 < |x| < \delta \Rightarrow |x \sin(1/x) - 0| < \varepsilon$.

*Strategy.* Even though $\sin(1/x)$ has no limit at $0$ (it oscillates wildly), it is **bounded**: $|\sin(1/x)| \leq 1$. Multiplying by $x \to 0$ forces the product to $0$ ("squeeze by a bounded factor").

*Computation.*

**Step 1: Pointwise bound.** For any $x \neq 0$,
$$|x \sin(1/x)| = |x|\,|\sin(1/x)| \leq |x| \cdot 1 = |x|.$$

**Step 2: Choose $\delta$.** Given $\varepsilon > 0$, set $\delta := \varepsilon$.

*Verification.* Let $0 < |x - 0| < \delta$, i.e. $0 < |x| < \varepsilon$. By Step 1,
$$|x \sin(1/x) - 0| \leq |x| < \varepsilon. \ \checkmark$$

*Interpretation.* This is a prototype of the **squeeze principle**: $-|x| \leq x\sin(1/x) \leq |x|$, and both bounds tend to $0$. The function oscillates but with amplitude $|x|$ that shrinks to zero.

> **Note (removable discontinuity).** Extending by $f(0) := 0$ makes $f$ continuous on all of $\mathbb{R}$. This is typical of removable singularities — the hole is patched by the limit value. $\blacksquare$

---

### Example 3 (Dirichlet's function). Nowhere continuous

**Claim.** The function
$$D(x) = \begin{cases} 1, & x \in \mathbb{Q}, \\ 0, & x \notin \mathbb{Q}, \end{cases}$$
is **discontinuous at every point of $\mathbb{R}$**.

*Setup.* Fix an arbitrary $a \in \mathbb{R}$. We will find two sequences $q_n, r_n \to a$ along which $D$ takes different values, violating Heine's criterion.

*Strategy.* Exploit **density** of both $\mathbb{Q}$ and $\mathbb{R} \setminus \mathbb{Q}$ in $\mathbb{R}$.

*Computation.*

**Step 1: Approximate $a$ by rationals.** Density of $\mathbb{Q}$ in $\mathbb{R}$: for each $n$, the interval $(a - 1/n, a + 1/n)$ contains a rational. Pick $q_n \in \mathbb{Q}$ with $|q_n - a| < 1/n$. Then $q_n \to a$.

**Step 2: Approximate $a$ by irrationals.** Density of $\mathbb{R} \setminus \mathbb{Q}$ in $\mathbb{R}$ (e.g., $\sqrt{2} + \mathbb{Q}$ is a dense set of irrationals): pick $r_n \notin \mathbb{Q}$ with $|r_n - a| < 1/n$. Then $r_n \to a$.

**Step 3: Evaluate $D$ along each sequence.**
$$D(q_n) = 1 \quad \forall n, \qquad D(r_n) = 0 \quad \forall n.$$

**Step 4: Limits along each.**
$$D(q_n) \to 1, \qquad D(r_n) \to 0.$$

**Step 5: Heine's obstruction.** If $D$ were continuous at $a$, Theorem 16.9 (iii) applied to both sequences would force $D(q_n) \to D(a)$ and $D(r_n) \to D(a)$, whence $1 = D(a) = 0$ — contradiction.

*Verification.* The contradiction $1 = 0$ is impossible. Hence $D$ is **not** continuous at $a$. Since $a \in \mathbb{R}$ was arbitrary, $D$ is discontinuous everywhere. $\blacksquare$

*Interpretation.* Dirichlet's function is the archetype of a wildly discontinuous function. It is also a standard example where the Riemann integral fails but the Lebesgue integral succeeds: $\int_0^1 D\,dm = 0$ (rationals have measure zero), but no Riemann integral exists.

---

### Example 4 (Thomae's / Popcorn function). Continuous on irrationals only

**Claim.** Let
$$T(x) = \begin{cases} 1/q, & x = p/q \text{ in lowest terms with } q > 0, \\ 0, & x \notin \mathbb{Q}, \\ 1, & x = 0 \ (\text{convention: } 0 = 0/1). \end{cases}$$
Then $T$ is **continuous at every irrational** and **discontinuous at every rational**.

*Setup & strategy.* At rationals, $T$ jumps to a positive value $1/q$ while irrationals nearby give $T = 0$: this fails Heine. At irrationals, $T = 0$, and we must show nearby values of $T$ are small — which requires controlling the denominators of nearby rationals.

*Computation.*

**Part A: Discontinuous at rationals.** Let $a = p/q \in \mathbb{Q}$ in lowest terms with $q > 0$, so $T(a) = 1/q > 0$. By density of irrationals, pick $r_n \notin \mathbb{Q}$ with $r_n \to a$. Then $T(r_n) = 0$ for all $n$, hence $T(r_n) \to 0 \neq 1/q = T(a)$. Heine fails; $T$ is not continuous at $a$.

**Part B: Continuous at irrationals.** Fix an irrational $a$. We show $\lim_{x \to a} T(x) = 0 = T(a)$, which by Theorem 16.9 gives continuity.

**Step 1: Choose $N$ large.** Given $\varepsilon > 0$, by the Archimedean property choose $N \in \mathbb{N}$ with $1/N < \varepsilon$.

**Step 2: Count "dangerous" rationals.** The rationals in $(a - 1, a + 1)$ with denominator $q \leq N$ form a **finite** set. Indeed: for each $q \in \{1, 2, \ldots, N\}$, the rationals $p/q$ lying in $(a - 1, a + 1)$ correspond to integers $p$ with $a - 1 < p/q < a + 1$, i.e., $q(a-1) < p < q(a+1)$, giving at most $\lceil 2q \rceil + 1$ integers. Summing over $q \leq N$: at most $\sum_{q=1}^N (2q + 1) = N^2 + 2N$ rationals. Finite.

**Step 3: Separate $a$ from each dangerous rational.** Since $a$ is irrational, $a \neq p/q$ for every rational $p/q$ in the finite set of Step 2. Let
$$\delta_0 := \min\Big\{\,|a - p/q|\ :\ p/q \in \mathbb{Q} \cap (a-1, a+1),\ 1 \leq q \leq N\,\Big\} > 0.$$
The minimum is over a finite set of strictly positive numbers, so $\delta_0 > 0$.

**Step 4: Choose $\delta := \min(\delta_0, 1) > 0$.**

*Verification.* Let $x \in \mathbb{R}$ with $0 < |x - a| < \delta$.

- **Case (i): $x \notin \mathbb{Q}$.** Then $T(x) = 0$, so $|T(x) - T(a)| = |0 - 0| = 0 < \varepsilon$. ✓

- **Case (ii): $x = p/q \in \mathbb{Q}$ in lowest terms.** Then $x \in (a - 1, a + 1)$ (since $\delta \leq 1$). Since $|x - a| < \delta \leq \delta_0$, by construction of $\delta_0$ we cannot have $q \leq N$ — else $p/q$ would be among the rationals in Step 2, violating $|x - a| < \delta_0$. Hence $q > N$. Therefore
$$T(x) = 1/q < 1/N < \varepsilon,$$
and $|T(x) - T(a)| = 1/q - 0 < \varepsilon$. ✓

Both cases satisfy $|T(x) - T(a)| < \varepsilon$. $\blacksquare$

*Interpretation.* Thomae's function is a beautiful phenomenon: **continuous on the uncountable dense set of irrationals, discontinuous on the countable dense set of rationals**. It illustrates that the set of continuity points of a function can be very intricate — in fact a theorem (the Young–Hausdorff theorem) characterises it as an arbitrary $G_\delta$ set. The "popcorn" name comes from the graph: at each rational $p/q$ there's a "kernel" at height $1/q$, and the kernels shrink as $q$ grows.

---

### Example 5. Removable discontinuity $\frac{x^2 - 4}{x - 2}$

**Claim.** Let $f(x) = \dfrac{x^2 - 4}{x - 2}$ for $x \neq 2$. How should $f(2)$ be defined to make $f$ continuous at $2$?

*Setup.* The function is not defined at $x = 2$ (the denominator vanishes). We seek a value $f(2)$ making the extension continuous.

*Strategy.* Compute $\lim_{x \to 2} f(x)$; by Theorem 16.9, continuity at $2$ requires $f(2) = \lim_{x \to 2} f(x)$.

*Computation.*

**Step 1: Factor the numerator.** $x^2 - 4 = (x - 2)(x + 2)$.

**Step 2: Cancel.** For $x \neq 2$:
$$f(x) = \frac{(x - 2)(x + 2)}{x - 2} = x + 2.$$

**Step 3: Compute the limit.** $g(x) := x + 2$ is a polynomial, hence continuous, so
$$\lim_{x \to 2} f(x) = \lim_{x \to 2} (x + 2) = 4.$$

**Step 4: Extend.** Define $f(2) := 4$.

*Verification.* With this definition, $f(x) = x + 2$ for **all** $x \in \mathbb{R}$ (not just $x \neq 2$), and this is a polynomial, hence continuous everywhere. $\blacksquare$

*Interpretation.* This is the prototypical **removable discontinuity**: the singularity is an artefact of the algebraic form, and the limit fills the hole. Contrast with $\operatorname{sgn}(x)$ at $0$ (jump discontinuity) or $\sin(1/x)$ at $0$ (essential discontinuity) — neither is removable. Classification in [[17-types-of-discontinuity-monotonic]].

---

## 16.10 Practice Problems

1. Prove from $\varepsilon$-$\delta$: $\lim_{x \to 2} (3x + 1) = 7$.

2. Show that if $f : \mathbb{R} \to \mathbb{R}$ is continuous and $f(q) = 0$ for every rational $q$, then $f \equiv 0$.

3. Let $f(x) = \begin{cases} x^2 \sin(1/x) & x \neq 0 \\ 0 & x = 0 \end{cases}$. Is $f$ continuous at $0$?

4. Prove that $f(x) = \sqrt{x}$ is continuous on $[0, \infty)$ using $\varepsilon$-$\delta$.

5. Let $f : \mathbb{R} \to \mathbb{R}$ satisfy $|f(x) - f(y)| \leq |x - y|^{1/2}$ for all $x, y$. Show $f$ is continuous. (Such an $f$ is called **Hölder continuous of exponent $1/2$**.)

### Solutions

---

**Solution 1.** Prove $\displaystyle \lim_{x \to 2}(3x + 1) = 7$ from $\varepsilon$-$\delta$.

*Setup.* Given $\varepsilon > 0$, find $\delta > 0$ with $0 < |x - 2| < \delta \Rightarrow |(3x + 1) - 7| < \varepsilon$.

*Strategy.* Simplify the expression to isolate $|x - 2|$; linear functions yield a **direct** $\delta = \varepsilon/(\text{slope})$ without a preliminary cap.

*Computation.*

**Step 1: Simplify the target.**
$$|(3x + 1) - 7| = |3x - 6| = 3|x - 2|.$$

**Step 2: Choose $\delta$.** To guarantee $3|x - 2| < \varepsilon$, take $\delta := \varepsilon/3 > 0$.

*Verification.* Let $0 < |x - 2| < \delta = \varepsilon/3$. Then
$$|(3x + 1) - 7| = 3|x - 2| < 3 \cdot \frac{\varepsilon}{3} = \varepsilon. \ \checkmark$$

*Interpretation.* For any affine function $f(x) = mx + b$ with $m \neq 0$, the optimal $\delta$ is $\varepsilon/|m|$. This is the "linear $\varepsilon$-$\delta$" baseline. $\blacksquare$

---

**Solution 2.** Continuous $f$ vanishing on $\mathbb{Q}$ is identically zero.

*Setup.* We have $f : \mathbb{R} \to \mathbb{R}$ continuous, with $f(q) = 0$ for every $q \in \mathbb{Q}$. Goal: $f(a) = 0$ for every $a \in \mathbb{R}$.

*Strategy.* Use density of $\mathbb{Q}$ to approximate $a$ by rationals, then continuity (Heine) to transfer the zero value.

*Computation.*

**Step 1: Fix arbitrary $a \in \mathbb{R}$.**

**Step 2: Approximate by rationals.** By density, pick $q_n \in \mathbb{Q}$ with $q_n \to a$ (e.g., $q_n \in (a - 1/n, a + 1/n) \cap \mathbb{Q}$, nonempty by density).

**Step 3: Apply hypothesis.** $f(q_n) = 0$ for all $n$, so $f(q_n) \to 0$.

**Step 4: Apply continuity (Heine, Theorem 16.9 (iii)).** Since $f$ is continuous at $a$ and $q_n \to a$,
$$f(q_n) \to f(a).$$

**Step 5: Conclude.** Limits are unique (Theorem 16.3), so $f(a) = 0$.

*Verification.* Since $a$ was arbitrary, $f \equiv 0$. $\blacksquare$

> **Corollary (rigidity of continuous functions).** Two continuous functions $f, g : \mathbb{R} \to \mathbb{R}$ that agree on a dense subset $D \subset \mathbb{R}$ agree everywhere. (Apply Solution 2 to $f - g$.) This is why continuous functions on $\mathbb{R}$ are determined by their values on $\mathbb{Q}$, a countable set — a crucial fact in functional analysis.

---

**Solution 3.** Continuity of $f(x) = x^2 \sin(1/x)$ (extended by $f(0) = 0$) at $0$.

*Setup.* Check whether $\lim_{x \to 0} f(x) = f(0) = 0$. By Theorem 16.9, this is equivalent to continuity.

*Strategy.* Same bounded-factor squeeze as Example 2, but with an additional factor of $x$ making the bound $x^2$ rather than $|x|$.

*Computation.*

**Step 1: Pointwise bound for $x \neq 0$.**
$$|f(x) - f(0)| = |x^2 \sin(1/x) - 0| = x^2\,|\sin(1/x)| \leq x^2 \cdot 1 = x^2.$$

**Step 2: Extract $\delta$.** To force $x^2 < \varepsilon$, we require $|x| < \sqrt{\varepsilon}$. Set $\delta := \sqrt{\varepsilon}$.

*Verification.* Let $|x - 0| = |x| < \delta = \sqrt{\varepsilon}$.

- If $x \neq 0$: $|f(x) - f(0)| \leq x^2 < \delta^2 = \varepsilon$. ✓
- If $x = 0$: $|f(0) - f(0)| = 0 < \varepsilon$. ✓

Hence $f$ is continuous at $0$. $\blacksquare$

*Interpretation.* The function $x^2 \sin(1/x)$ is even differentiable at $0$ (with derivative $0$), but the derivative is not continuous at $0$ — it is a standard counterexample to "differentiable $\Rightarrow$ $C^1$". Here we only needed continuity.

---

**Solution 4.** $f(x) = \sqrt{x}$ is continuous on $[0, \infty)$.

*Setup.* Two cases: $a > 0$ (interior point) and $a = 0$ (boundary point). Different strategies apply.

*Strategy.*
- For $a > 0$: rationalise $\sqrt{x} - \sqrt{a}$ using conjugates to reduce to a linear $|x - a|$ divided by a positive bound.
- For $a = 0$: direct power-law.

*Computation.*

**Case 1: $a > 0$.**

**Step 1: Rationalise.**
$$\sqrt{x} - \sqrt{a} = \frac{(\sqrt{x} - \sqrt{a})(\sqrt{x} + \sqrt{a})}{\sqrt{x} + \sqrt{a}} = \frac{x - a}{\sqrt{x} + \sqrt{a}}.$$

**Step 2: Lower bound on denominator.** For $x \geq 0$, $\sqrt{x} \geq 0$, so $\sqrt{x} + \sqrt{a} \geq \sqrt{a} > 0$. Hence
$$|\sqrt{x} - \sqrt{a}| = \frac{|x - a|}{\sqrt{x} + \sqrt{a}} \leq \frac{|x - a|}{\sqrt{a}}.$$

**Step 3: Choose $\delta$.** To force $|x - a|/\sqrt{a} < \varepsilon$, take $\delta := \varepsilon \sqrt{a} > 0$.

*Verification (Case 1).* For $x \in [0, \infty)$ with $|x - a| < \delta$:
$$|\sqrt{x} - \sqrt{a}| \leq \frac{|x - a|}{\sqrt{a}} < \frac{\delta}{\sqrt{a}} = \frac{\varepsilon \sqrt{a}}{\sqrt{a}} = \varepsilon. \ \checkmark$$

**Case 2: $a = 0$.**

**Step 1: Direct bound.** For $x \geq 0$, $|\sqrt{x} - \sqrt{0}| = \sqrt{x}$.

**Step 2: Extract $\delta$.** Require $\sqrt{x} < \varepsilon$, i.e. $x < \varepsilon^2$. Set $\delta := \varepsilon^2 > 0$.

*Verification (Case 2).* For $x \in [0, \infty)$ with $|x - 0| = x < \delta = \varepsilon^2$:
$$|\sqrt{x} - \sqrt{0}| = \sqrt{x} < \sqrt{\varepsilon^2} = \varepsilon. \ \checkmark$$

*Interpretation.*
- At $a > 0$: the function is Lipschitz with constant $1/(2\sqrt{a})$ (in fact $\delta = 2\sqrt{a}\,\varepsilon$ works, but our $\delta = \sqrt{a}\,\varepsilon$ suffices). Near $a = 0$, the Lipschitz constant blows up — which is why the linear $\delta$ fails and we need $\delta = \varepsilon^2$ (Hölder-$1/2$ behaviour).
- $\sqrt{\cdot}$ has a vertical tangent at $0$: the function is continuous there but **not uniformly** continuous with a linear modulus. $\blacksquare$

---

**Solution 5.** Hölder-$1/2$ continuity implies continuity (and more).

*Setup.* Hypothesis: $|f(x) - f(y)| \leq |x - y|^{1/2}$ for all $x, y \in \mathbb{R}$. Goal: $f$ is continuous on $\mathbb{R}$.

*Strategy.* Pick $\delta$ so that $|x - y|^{1/2} < \varepsilon$, i.e. $|x - y| < \varepsilon^2$. This $\delta$ does not depend on the centre point — giving uniform continuity for free.

*Computation.*

**Step 1: Fix $\varepsilon > 0$, choose $\delta := \varepsilon^2 > 0$.**

**Step 2: Verify.** Let $a \in \mathbb{R}$ arbitrary and $|x - a| < \delta = \varepsilon^2$. Then
$$|f(x) - f(a)| \leq |x - a|^{1/2} < (\varepsilon^2)^{1/2} = \varepsilon. \ \checkmark$$

*Verification.* Since $a$ was arbitrary and the same $\delta$ worked, $f$ is continuous at every $a \in \mathbb{R}$.

*Interpretation.* A **Hölder continuous** function of exponent $\alpha \in (0, 1]$ satisfies $|f(x) - f(y)| \leq C|x - y|^\alpha$ (we've taken $C = 1, \alpha = 1/2$). Every such function is continuous, and in fact **uniformly continuous** — the same $\delta = (\varepsilon/C)^{1/\alpha}$ works everywhere. When $\alpha = 1$ this reduces to Lipschitz continuity. Hölder classes play a central role in PDE regularity theory (Hölder spaces $C^{k, \alpha}$). See [[20-ivt-and-connectedness]] for uniform continuity. $\blacksquare$

---

## 16.11 Summary

> **Three equivalent views of continuity at $a$ (Theorem 16.9):**
>
> 1. **$\varepsilon$-$\delta$:** $\forall \varepsilon > 0,\ \exists \delta > 0 :\ |x - a| < \delta \Rightarrow |f(x) - f(a)| < \varepsilon$.
> 2. **Limit-based:** $\lim_{x \to a} f(x) = f(a)$.
> 3. **Sequential (Heine):** $x_n \to a \Rightarrow f(x_n) \to f(a)$.

> **Topological reformulation (Theorem 16.10).** $f$ continuous on $\mathbb{R}$ iff $f^{-1}(U)$ is open for every open $U$, iff $f^{-1}(C)$ is closed for every closed $C$.

> **Building continuous functions.** Polynomials, $|x|$, $\sqrt{x}$, $e^x$, $\ln x$, $\sin x$, $\cos x$ are continuous on their natural domains. Sums, differences, scalar multiples, products, quotients (where denominator $\neq 0$), absolute values, and compositions of continuous functions are continuous (Theorems 16.11, 16.12). This gives — without further $\varepsilon$-$\delta$ work — continuity of any function assembled from the elementary ones by these operations.

> **Pathological examples.**
> - **Dirichlet's $D$** (nowhere continuous).
> - **Thomae's $T$** (continuous exactly on the irrationals).
> - **$\sin(1/x)$** (no limit at $0$).
>
> These test our intuitions and illustrate the subtle power of the $\varepsilon$-$\delta$ definition.

The next lessons examine what continuity **preserves** — most notably, **compactness** (images of compact sets are compact — hence Weierstrass's extreme value theorem) and **connectedness** (images of intervals are intervals — hence Bolzano's intermediate value theorem).

---

## Related Topics

- [[09-convergence-and-limits]] — sequence limits, used in Heine's criterion.
- [[17-types-of-discontinuity-monotonic]] — classifying points of discontinuity (removable, jump, essential).
- [[18-important-limits-infinite-limits]] — limits at $\infty$, infinite limits, continuity of $\exp$ via power series.
- [[20-ivt-and-connectedness]] — Intermediate Value Theorem, uniform continuity, Hölder and Lipschitz classes.
- [[07-compact-sets]] — compactness, underlying the Weierstrass extreme value theorem.
- [[05-open-sets-closed-sets]] — topological basis for the preimage characterisation.
