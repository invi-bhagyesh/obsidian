# 3. Supremum and Infimum

---

## 3.1 Why We Need a New Idea

For a set like $S = \{1, 2, 3\}$, we have $\max(S) = 3$ and $\min(S) = 1$. But what about $T = (0, 1) = \{x : 0 < x < 1\}$? There is no maximum: any candidate $a \in T$ satisfies $a < (a+1)/2 < 1$, so $(a+1)/2$ is larger and still in $T$. Yet intuitively, $1$ is a tight upper bound — no element of $T$ exceeds it, and no number less than $1$ has that property.

The **supremum** replaces "maximum" and the **infimum** replaces "minimum" in exactly the situations where the extremal value is not attained. They always exist for bounded subsets of $\mathbb{R}$ — this is the **Least Upper Bound Property**, the one axiom that makes $\mathbb{R}$ richer than $\mathbb{Q}$.

---

## 3.2 Upper and Lower Bounds

### Definitions

Let $S \subseteq \mathbb{R}$, $S \neq \emptyset$.

> **Upper bound.** $u \in \mathbb{R}$ is an **upper bound** of $S$ if $x \leq u$ for all $x \in S$.

> **Lower bound.** $\ell \in \mathbb{R}$ is a **lower bound** of $S$ if $\ell \leq x$ for all $x \in S$.

> **Bounded above.** $S$ is **bounded above** if it has an upper bound.

> **Bounded below.** $S$ is **bounded below** if it has a lower bound.

> **Bounded.** $S$ is **bounded** if it is both bounded above and bounded below — equivalently, $\exists M > 0$ such that $|x| \leq M$ for all $x \in S$.

### Examples
- $S = (0, 1)$: upper bounds are $[1, \infty)$, lower bounds are $(-\infty, 0]$. Bounded.
- $S = \mathbb{N}$: lower bound is $1$ (or any number $\leq 1$); no upper bound — unbounded above.
- $S = \mathbb{Z}$: no upper or lower bound — unbounded.
- $S = \{1/n : n \in \mathbb{N}\}$: upper bounds $[1, \infty)$, lower bounds $(-\infty, 0]$. Bounded.
- $S = \emptyset$: every real number is both an upper and a lower bound (vacuously).

---

## 3.3 Supremum and Infimum — Definitions

> **Supremum (least upper bound).** Let $S$ be bounded above. A number $M \in \mathbb{R}$ is the **supremum** of $S$, written $M = \sup S$, if:
> 1. $M$ is an upper bound: $x \leq M$ for all $x \in S$.
> 2. $M$ is the least upper bound: if $u$ is any upper bound of $S$, then $M \leq u$.

> **Infimum (greatest lower bound).** Let $S$ be bounded below. A number $m \in \mathbb{R}$ is the **infimum** of $S$, written $m = \inf S$, if:
> 1. $m$ is a lower bound: $m \leq x$ for all $x \in S$.
> 2. $m$ is the greatest lower bound: if $\ell$ is any lower bound of $S$, then $\ell \leq m$.

### Uniqueness

> **Proposition.** If $\sup S$ exists, it is unique. Similarly for $\inf S$.

*Proof.* Suppose $M_1, M_2$ are both suprema. Then $M_1$ is an upper bound, so $M_2 \leq M_1$ (since $M_2$ is the least upper bound). By symmetry $M_1 \leq M_2$. Hence $M_1 = M_2$. $\blacksquare$

### Relationship with max/min

If $\max S$ exists, then $\sup S = \max S$ (and in particular $\sup S \in S$). Conversely, if $\sup S \in S$, it equals $\max S$. When $\sup S$ exists but $\sup S \notin S$, the set has no maximum.

**Examples:**
- $\sup[0, 1] = 1 \in [0,1]$, so $\max[0,1] = 1$.
- $\sup(0, 1) = 1 \notin (0,1)$, so $\max(0,1)$ does not exist.
- $\inf\{1/n : n \in \mathbb{N}\} = 0 \notin \{1/n\}$, so the set has no minimum.

---

## 3.4 The $\varepsilon$-Characterisation

The following is one of the most-used technical reformulations of the supremum.

> **Theorem ($\varepsilon$-characterisation of $\sup$).** $M = \sup S$ if and only if:
> 1. $x \leq M$ for all $x \in S$;
> 2. for every $\varepsilon > 0$, there exists $x \in S$ with $x > M - \varepsilon$.

*Proof.* ($\Rightarrow$) Suppose $M = \sup S$. Clause 1 holds by definition. For (2), given $\varepsilon > 0$, $M - \varepsilon < M$, so $M - \varepsilon$ is *not* an upper bound (else $M$ would not be *least*). Hence some $x \in S$ satisfies $x > M - \varepsilon$.

($\Leftarrow$) Suppose (1) and (2) hold. Then $M$ is an upper bound. Suppose $u < M$ is also an upper bound; set $\varepsilon = M - u > 0$. By (2), some $x \in S$ has $x > M - \varepsilon = u$, contradicting that $u$ is an upper bound. So no $u < M$ is an upper bound: $M$ is the least. $\blacksquare$

> **Theorem ($\varepsilon$-characterisation of $\inf$).** $m = \inf S$ iff:
> 1. $m \leq x$ for all $x \in S$;
> 2. for every $\varepsilon > 0$, there exists $x \in S$ with $x < m + \varepsilon$.

The $\varepsilon$-form is how we *use* the supremum in proofs — whenever we need "an element of $S$ close to $\sup S$."

---

## 3.5 The Least Upper Bound Property (Completeness Axiom)

> **Axiom (LUB Property).** Every non-empty subset of $\mathbb{R}$ that is bounded above has a supremum in $\mathbb{R}$.

Equivalently (and derived immediately by negation): every non-empty subset of $\mathbb{R}$ bounded below has an infimum.

> **Proposition (GLB Property).** Every non-empty $S \subseteq \mathbb{R}$ bounded below has an infimum.

*Proof.* Let $-S = \{-x : x \in S\}$. $-S$ is bounded above (if $\ell$ is a lower bound of $S$, then $-\ell$ is an upper bound of $-S$). By LUB, $\sup(-S)$ exists. Then $\inf S = -\sup(-S)$, because $-x \leq \sup(-S) \iff x \geq -\sup(-S)$. $\blacksquare$

### Why this makes $\mathbb{R}$ special
$\mathbb{Q}$ does **not** have the LUB property. The set $S = \{q \in \mathbb{Q} : q^2 < 2\}$ is bounded above in $\mathbb{Q}$ (by $2$, say) but has no rational supremum: the natural candidate is $\sqrt{2}$, which is not rational (see [[01-real-number-system]] §1.4).

In $\mathbb{R}$, $\sup S = \sqrt{2}$ — the LUB axiom *forces* $\sqrt{2}$ to exist.

---

## 3.6 Consequences of the LUB Property

### Archimedean Property

> **Theorem (Archimedean Property).** For every $x \in \mathbb{R}$, there exists $n \in \mathbb{N}$ with $n > x$.

*Proof.* Suppose not: some $x \in \mathbb{R}$ satisfies $n \leq x$ for all $n \in \mathbb{N}$. Then $\mathbb{N}$ is bounded above in $\mathbb{R}$. By LUB, $\alpha = \sup \mathbb{N}$ exists. By the $\varepsilon$-characterisation with $\varepsilon = 1$: some $n \in \mathbb{N}$ satisfies $n > \alpha - 1$. But then $n + 1 > \alpha$, and $n+1 \in \mathbb{N}$, contradicting $\alpha = \sup \mathbb{N}$. $\blacksquare$

> **Corollary.** For every $\varepsilon > 0$, there exists $n \in \mathbb{N}$ with $1/n < \varepsilon$.

*Proof.* Apply Archimedean with $x = 1/\varepsilon$. $\blacksquare$

> **Corollary.** $\inf\{1/n : n \in \mathbb{N}\} = 0$.

### Density of $\mathbb{Q}$ in $\mathbb{R}$

> **Theorem (Density of rationals).** For all $a, b \in \mathbb{R}$ with $a < b$, there exists $q \in \mathbb{Q}$ with $a < q < b$.

*Proof.* Since $b - a > 0$, by Archimedean there is $n \in \mathbb{N}$ with $n > 1/(b-a)$, i.e., $nb - na > 1$. Consider $m = \lceil na \rceil + 1$, or more carefully: since $nb - na > 1$, there is an integer $m$ with $na < m < nb$. (Between any two reals differing by more than $1$ lies an integer — formalise by taking $m$ as the least integer $> na$.) Then $q = m/n \in \mathbb{Q}$ and $a < q < b$. $\blacksquare$

> **Theorem (Density of irrationals).** For all $a, b \in \mathbb{R}$ with $a < b$, there exists an irrational $r$ with $a < r < b$.

*Proof.* By density of $\mathbb{Q}$, there exists $q \in \mathbb{Q}$ with $a/\sqrt{2} < q < b/\sqrt{2}$ (and $q \neq 0$). Then $r = q\sqrt{2}$ is irrational (rational times irrational) and $a < r < b$. $\blacksquare$

### Existence of $n$-th roots

> **Theorem.** For every $x > 0$ and every $n \in \mathbb{N}$, there is a unique $y > 0$ with $y^n = x$.

*Proof sketch.* Let $S = \{t > 0 : t^n < x\}$. Show $S$ is non-empty and bounded, let $y = \sup S$. Then use the order axioms to rule out $y^n < x$ (can find larger element of $S$) and $y^n > x$ (can find smaller upper bound), so $y^n = x$. Uniqueness from strict monotonicity of $t \mapsto t^n$ on $(0, \infty)$. $\blacksquare$

This is why $\sqrt{2}, \sqrt[3]{5}, \sqrt[n]{\pi}$ all exist: the LUB axiom manufactures them.

---

## 3.7 Useful Algebraic Properties

For non-empty sets $A, B \subseteq \mathbb{R}$, let $A + B = \{a + b : a \in A, b \in B\}$ and $cA = \{ca : a \in A\}$.

> **Proposition.** Assuming the relevant sets are bounded above:
> 1. $\sup(A + B) = \sup A + \sup B$.
> 2. $\sup(cA) = c \sup A$ if $c \geq 0$; $\sup(cA) = c \inf A$ if $c < 0$.
> 3. If $A \subseteq B$, then $\sup A \leq \sup B$ and $\inf A \geq \inf B$.
> 4. $\inf(-A) = -\sup A$, $\sup(-A) = -\inf A$.

*Proof of (1).* Let $\alpha = \sup A$, $\beta = \sup B$. For any $a \in A, b \in B$: $a+b \leq \alpha + \beta$, so $\alpha+\beta$ is an upper bound of $A+B$, giving $\sup(A+B) \leq \alpha+\beta$.

For the reverse: fix $\varepsilon > 0$. By $\varepsilon$-characterisation, $\exists a \in A$ with $a > \alpha - \varepsilon/2$ and $\exists b \in B$ with $b > \beta - \varepsilon/2$. Then $a + b > \alpha + \beta - \varepsilon$. So $\sup(A+B) \geq \alpha + \beta - \varepsilon$ for every $\varepsilon > 0$, giving $\sup(A+B) \geq \alpha + \beta$. $\blacksquare$

### Convention for unbounded and empty sets
- If $S$ is not bounded above, we write $\sup S = +\infty$.
- If $S$ is not bounded below, we write $\inf S = -\infty$.
- By convention, $\sup \emptyset = -\infty$ and $\inf \emptyset = +\infty$.

---

## Worked Examples

**Example 1:** Find $\sup S$ and $\inf S$ for $S = \{1 - 1/n : n \in \mathbb{N}\}$.

*Solution:* Elements are $0, 1/2, 2/3, 3/4, \ldots$

- **Lower bound:** $1 - 1/n \geq 0$ for all $n \geq 1$, with equality at $n = 1$. So $\inf S = 0 = \min S$.
- **Upper bound:** $1 - 1/n < 1$ always, and for every $\varepsilon > 0$, choose $n > 1/\varepsilon$ so $1 - 1/n > 1 - \varepsilon$. Hence $\sup S = 1$. But $1 \notin S$: no max.

$\inf S = 0, \sup S = 1$.

---

**Example 2:** Find $\sup\{x \in \mathbb{Q} : x^2 < 3\}$ and $\inf\{x \in \mathbb{Q} : x^2 < 3\}$.

*Solution:* The set equals $\mathbb{Q} \cap (-\sqrt{3}, \sqrt{3})$. By density of $\mathbb{Q}$ in $\mathbb{R}$, rationals get arbitrarily close to $\pm\sqrt{3}$.

$\sup = \sqrt{3}, \inf = -\sqrt{3}$.

Neither is rational, so inside $\mathbb{Q}$ this set has no sup or inf — one reason why $\mathbb{Q}$ fails LUB.

---

**Example 3:** Let $A = (0, 2)$ and $B = [1, 3]$. Find $\sup(A \cap B)$, $\inf(A \cap B)$, $\sup(A \cup B)$, $\inf(A \cup B)$, $\sup(A + B)$.

*Solution:*
- $A \cap B = [1, 2)$: $\inf = 1$, $\sup = 2$.
- $A \cup B = (0, 3]$: $\inf = 0$, $\sup = 3$.
- $A + B = \{a + b : a \in (0,2), b \in [1,3]\} = (1, 5)$: $\sup = 5$, $\inf = 1$.

(Use the formula $\sup(A+B) = \sup A + \sup B = 2 + 3 = 5$ as a check.)

---

**Example 4:** Show that $\sup\{\sin x : x \in \mathbb{R}\} = 1$ and $\inf = -1$.

*Solution:* $|\sin x| \leq 1$, so $-1$ and $1$ are bounds. $\sin(\pi/2) = 1$ and $\sin(3\pi/2) = -1$, so the bounds are attained. Hence $\sup = \max = 1$, $\inf = \min = -1$.

---

**Example 5:** Prove: if $\sup A < \sup B$, there exists $b \in B$ with $b > a$ for all $a \in A$.

*Solution:* Let $\alpha = \sup A$, $\beta = \sup B$, with $\alpha < \beta$. Set $\varepsilon = \beta - \alpha > 0$. By $\varepsilon$-characterisation, $\exists b \in B$ with $b > \beta - \varepsilon = \alpha$. Since $\alpha$ is an upper bound of $A$, $b > \alpha \geq a$ for every $a \in A$. $\blacksquare$

---

## Practice Problems

1. Find $\sup S$ and $\inf S$:
   - (a) $S = \{(-1)^n + 1/n : n \in \mathbb{N}\}$
   - (b) $S = \{m/(m+n) : m, n \in \mathbb{N}\}$
   - (c) $S = \{x \in \mathbb{R} : x^2 - x - 2 < 0\}$

2. Prove that if $A, B \subseteq \mathbb{R}$ are non-empty and bounded, and $a \leq b$ for all $a \in A, b \in B$, then $\sup A \leq \inf B$.

3. Let $f, g : X \to \mathbb{R}$ be bounded. Prove $\sup_{x \in X}(f(x) + g(x)) \leq \sup_{x} f + \sup_{x} g$, and give an example where the inequality is strict.

4. Let $S \subseteq \mathbb{R}$ be non-empty bounded. Show $\sup S - \inf S = \sup\{x - y : x, y \in S\}$.

5. Prove the Archimedean property directly from the LUB axiom.

### Solutions

**1(a).** Elements: $(-1, 1/1), (1, 1/2), (-1, 1/3), (1, 1/4), \ldots = 0, 3/2, -2/3, 5/4, \ldots$. For odd $n$: $-1 + 1/n \to -1^-$ from above but always $> -1$. For even $n$: $1 + 1/n \to 1^+$ from above, with largest value at $n=2$: $3/2$. $\sup S = 3/2$ (attained at $n=2$), $\inf S = -1$ (not attained).

**1(b).** $m/(m+n) \in (0, 1)$ always (both $m, n \geq 1$). As $m \to \infty$, ratio $\to 1$; as $n \to \infty$ ratio $\to 0$. Also $m = n = 1$ gives $1/2$. $\sup = 1$, $\inf = 0$; neither attained.

**1(c).** Factor: $x^2 - x - 2 = (x-2)(x+1) < 0$ iff $x \in (-1, 2)$. $\inf = -1$, $\sup = 2$.

**2.** Fix $b \in B$. Then $a \leq b$ for all $a \in A$, so $b$ is an upper bound of $A$, hence $\sup A \leq b$. Since this holds for every $b \in B$, $\sup A$ is a lower bound of $B$, so $\sup A \leq \inf B$. $\blacksquare$

**3.** For each $x \in X$: $f(x) \leq \sup f$ and $g(x) \leq \sup g$, so $f(x) + g(x) \leq \sup f + \sup g$, making $\sup f + \sup g$ an upper bound of $f + g$. Hence $\sup(f+g) \leq \sup f + \sup g$.

Strict example: $X = \{1, 2\}$, $f(1) = 1, f(2) = 0$, $g(1) = 0, g(2) = 1$. Then $\sup f = \sup g = 1$ but $\sup(f+g) = 1 < 2$. $\blacksquare$

**4.** Let $T = \{x - y : x, y \in S\}$. $T$ equals $S + (-S)$. By §3.7:
$$\sup T = \sup S + \sup(-S) = \sup S - \inf S. \blacksquare$$

**5.** Suppose $\mathbb{N}$ were bounded above in $\mathbb{R}$. By LUB, $\alpha = \sup \mathbb{N} \in \mathbb{R}$ exists. Then $\alpha - 1 < \alpha$ is not an upper bound, so $\exists n \in \mathbb{N}$ with $n > \alpha - 1$, hence $n + 1 > \alpha$. But $n + 1 \in \mathbb{N}$ exceeds $\sup \mathbb{N}$ — contradiction. $\blacksquare$

---

## Related Topics
- [[01-real-number-system]] — the LUB property is the completeness axiom
- [[04-sets-finite-countable-uncountable]] — density of $\mathbb{Q}$ and uncountability of $\mathbb{R}$
- [[08-sequences-introduction]] — monotone sequences converge to sup/inf
- [[10-cauchy-sequences-completeness]] — LUB ↔ Cauchy completeness of $\mathbb{R}$
