# 3. Supremum and Infimum

> **The central object.** For a finite set of real numbers, the notions of *maximum* and *minimum* suffice. The moment we allow infinite sets — open intervals, sequences, images of functions — these naive notions collapse: the set $(0,1)$ has no largest element, yet it is clearly bounded above by $1$. The **supremum** (least upper bound) and **infimum** (greatest lower bound) fix this defect.
>
> The fact that every bounded-above non-empty subset of $\mathbb{R}$ *actually has* a supremum is not a theorem we can prove from the ordered-field axioms alone — it is the **completeness axiom** of $\mathbb{R}$, the single structural property that distinguishes the real line from the rationals. This chapter states the axiom, derives its basic equivalent forms, extracts two of its most important corollaries (the Archimedean property and the density of $\mathbb{Q}$), and exhibits the $\varepsilon$-characterisation — the workhorse tool used in virtually every subsequent proof involving suprema.

---

## 3.1 Why We Need a New Idea

For a set like $S = \{1, 2, 3\}$ the situation is benign: $\max(S) = 3$ and $\min(S) = 1$, and both values are elements of $S$. But consider
$$T = (0, 1) = \{x \in \mathbb{R} : 0 < x < 1\}.$$

**Claim.** $T$ has **no maximum**.

*Proof.* Suppose, for contradiction, that $a = \max(T)$ exists. Then $a \in T$, so $0 < a < 1$. Consider the midpoint
$$a' = \frac{a + 1}{2}.$$
We compute:
- $a' - a = \tfrac{a+1}{2} - a = \tfrac{1-a}{2} > 0$, so $a' > a$.
- $a' - 1 = \tfrac{a+1}{2} - 1 = \tfrac{a-1}{2} < 0$, so $a' < 1$.
- Also $a' > a > 0$, so $a' > 0$.

Hence $a' \in T$ and $a' > a$, contradicting the maximality of $a$. $\blacksquare$

**And yet** $1$ is morally the "right" upper value for $T$: every element of $T$ is less than $1$, and no number less than $1$ has this property (any $u < 1$ fails because $\tfrac{u+1}{2} \in T$ and exceeds $u$).

The **supremum** formalises this intuition — it is the tightest upper bound, whether or not attained. Dually, the **infimum** is the tightest lower bound. For bounded subsets of $\mathbb{R}$, these always exist; this is the **Least Upper Bound (LUB) Axiom** or **Completeness Axiom**, the one piece of structure that distinguishes $\mathbb{R}$ from $\mathbb{Q}$.

*Interpretive remark.* A common misconception is that $\sup T$ is "the largest element almost in $T$." It is more honest to say: $\sup T$ is the unique real number that every element of $T$ is at most, and which nothing smaller than it has that property. It may or may not lie in $T$.

---

## 3.2 Upper and Lower Bounds

### Definitions

Let $S \subseteq \mathbb{R}$ be a non-empty set. (The empty set will be treated separately at the end of the chapter.)

> **Upper bound.** A number $u \in \mathbb{R}$ is an **upper bound** of $S$ if $x \leq u$ for every $x \in S$.

> **Lower bound.** A number $\ell \in \mathbb{R}$ is a **lower bound** of $S$ if $\ell \leq x$ for every $x \in S$.

> **Bounded above / below.** The set $S$ is **bounded above** if it has at least one upper bound; it is **bounded below** if it has at least one lower bound.

> **Bounded.** The set $S$ is **bounded** if it is both bounded above and bounded below. Equivalently, there exists $M > 0$ such that $|x| \leq M$ for all $x \in S$.

*Proof of the equivalence.* If $\ell$ is a lower bound and $u$ is an upper bound, set $M = \max(|\ell|, |u|)$; then for any $x \in S$ we have $\ell \leq x \leq u$, hence $-M \leq \ell \leq x \leq u \leq M$, i.e., $|x| \leq M$. Conversely, if $|x| \leq M$ for all $x \in S$, then $-M$ is a lower bound and $M$ is an upper bound. $\blacksquare$

*Remark (non-uniqueness of bounds).* Bounds are emphatically not unique: if $u$ is an upper bound, so is any $u' \geq u$. The supremum, introduced below, is the distinguished *smallest* upper bound.

### Examples

The following catalogue illustrates the taxonomy.

| $S$ | Upper bounds | Lower bounds | Bounded? |
|---|---|---|---|
| $(0, 1)$ | $[1, \infty)$ | $(-\infty, 0]$ | yes |
| $[0, 1]$ | $[1, \infty)$ | $(-\infty, 0]$ | yes |
| $\mathbb{N} = \{1, 2, 3, \ldots\}$ | none | $(-\infty, 1]$ | no (unbounded above) |
| $\mathbb{Z}$ | none | none | no |
| $\{1/n : n \in \mathbb{N}\}$ | $[1, \infty)$ | $(-\infty, 0]$ | yes |
| $\{(-1)^n : n \in \mathbb{N}\}$ | $[1, \infty)$ | $(-\infty, -1]$ | yes |
| $\emptyset$ | all of $\mathbb{R}$ | all of $\mathbb{R}$ | vacuously bounded |

*Sanity check on $\mathbb{N}$.* That $\mathbb{N}$ has no upper bound in $\mathbb{R}$ is the Archimedean property, which we will derive as a **consequence** of the LUB axiom in §3.6. It is not a purely set-theoretic fact — it requires the structure of $\mathbb{R}$.

*Remark on $\emptyset$.* For the empty set, the quantifier "for all $x \in S$" is vacuously true, so **every** real is simultaneously an upper and a lower bound. This will force the conventions $\sup \emptyset = -\infty$, $\inf \emptyset = +\infty$ (§3.7).

---

## 3.3 Supremum and Infimum — Definitions

> **Definition (Supremum).** Let $S \subseteq \mathbb{R}$ be non-empty and bounded above. A number $M \in \mathbb{R}$ is the **supremum** of $S$, written $M = \sup S$, if:
> 1. **(Upper bound.)** $x \leq M$ for every $x \in S$.
> 2. **(Least.)** If $u \in \mathbb{R}$ is any upper bound of $S$, then $M \leq u$.

> **Definition (Infimum).** Let $S \subseteq \mathbb{R}$ be non-empty and bounded below. A number $m \in \mathbb{R}$ is the **infimum** of $S$, written $m = \inf S$, if:
> 1. **(Lower bound.)** $m \leq x$ for every $x \in S$.
> 2. **(Greatest.)** If $\ell \in \mathbb{R}$ is any lower bound of $S$, then $\ell \leq m$.

Other names: $\sup S$ is the **least upper bound (LUB)** or **join**; $\inf S$ is the **greatest lower bound (GLB)** or **meet**.

### Uniqueness

> **Proposition 3.1 (Uniqueness of sup and inf).** If $\sup S$ exists, it is unique. Similarly for $\inf S$.

**Proof.**

*Step 1 (Setup).* Suppose $M_1, M_2 \in \mathbb{R}$ are both suprema of $S$. We show $M_1 = M_2$.

*Step 2 ($M_2 \leq M_1$).* By Definition clause 1 applied to $M_1$, $M_1$ is an upper bound of $S$. By Definition clause 2 applied to $M_2$ (with $u = M_1$), since $M_2$ is *least* among upper bounds, $M_2 \leq M_1$.

*Step 3 ($M_1 \leq M_2$).* By the same argument with the roles of $M_1$ and $M_2$ swapped: $M_1$ is least among upper bounds, so $M_1 \leq M_2$.

*Step 4 (Conclusion).* From Steps 2 and 3, $M_1 \leq M_2 \leq M_1$, so by the antisymmetry of $\leq$, $M_1 = M_2$. The proof for $\inf$ is identical with inequalities reversed. $\blacksquare$

*Remark.* Uniqueness justifies the definite-article phrasing "*the* supremum" and the functional notation $\sup S$.

### Relationship with max and min

> **Proposition 3.2.** Let $S \subseteq \mathbb{R}$ be non-empty and bounded above. Then
> $$\max S \text{ exists} \iff \sup S \in S,$$
> and when either holds, $\max S = \sup S$.

**Proof.**

*($\Rightarrow$).* Suppose $\max S$ exists; call it $M$. Then $M \in S$ and $x \leq M$ for all $x \in S$, so $M$ is an upper bound of $S$. For any other upper bound $u$, since $M \in S$, $M \leq u$. Thus $M$ satisfies both clauses of the supremum definition, so $M = \sup S \in S$.

*($\Leftarrow$).* Suppose $M := \sup S \in S$. Then $M$ is an upper bound, so $x \leq M$ for all $x \in S$, and $M \in S$ itself — this is precisely the definition of $\max S$. Thus $\max S = M = \sup S$. $\blacksquare$

*Interpretive remark.* The supremum *upgrades* to a maximum iff it is attained. This is the whole point of the distinction: for sets like $(0,1)$ or $\{1 - 1/n : n \in \mathbb{N}\}$, the supremum exists but no maximum does.

**Examples.**
- $\sup[0, 1] = 1 \in [0,1]$, so $\max[0,1] = 1$ exists.
- $\sup(0, 1) = 1 \notin (0,1)$, so $(0,1)$ has no maximum.
- $\inf\{1/n : n \in \mathbb{N}\} = 0$, but $0 \notin \{1/n : n \in \mathbb{N}\}$, so no minimum.
- $\max\{1, 1/2, 1/3, \ldots\} = 1$ and $\sup = 1$, consistent.

---

## 3.4 The $\varepsilon$-Characterisation

The supremum definition involves a universal quantifier over all upper bounds, which can be cumbersome in proofs. The following reformulation is the workhorse tool in real analysis: it replaces the "least among upper bounds" condition with an existential "arbitrarily close elements" condition.

> **Theorem 3.3 ($\varepsilon$-characterisation of $\sup$).** Let $S \subseteq \mathbb{R}$ be non-empty. Then $M = \sup S$ if and only if:
> 1. $x \leq M$ for every $x \in S$ *(upper bound)*;
> 2. for every $\varepsilon > 0$, there exists $x \in S$ with $x > M - \varepsilon$ *(approximation)*.

**Proof.**

*($\Rightarrow$) Assume $M = \sup S$.* 

*Step 1.* Clause 1 is immediate from the definition of supremum.

*Step 2.* For clause 2, let $\varepsilon > 0$ be arbitrary. Consider $M - \varepsilon$. Since $\varepsilon > 0$, $M - \varepsilon < M$.

*Step 3.* Suppose, for contradiction, that no $x \in S$ satisfies $x > M - \varepsilon$. Then $x \leq M - \varepsilon$ for every $x \in S$, which makes $M - \varepsilon$ an upper bound of $S$.

*Step 4.* Since $M$ is the *least* upper bound, $M \leq M - \varepsilon$, i.e., $\varepsilon \leq 0$. This contradicts $\varepsilon > 0$.

*Step 5.* Hence some $x \in S$ satisfies $x > M - \varepsilon$, establishing clause 2.

*($\Leftarrow$) Assume clauses 1 and 2 hold.*

*Step 1.* Clause 1 says $M$ is an upper bound of $S$.

*Step 2.* We show $M$ is the *least* upper bound. Suppose $u$ is any upper bound of $S$ with $u < M$.

*Step 3.* Set $\varepsilon = M - u$. Since $u < M$, we have $\varepsilon > 0$.

*Step 4.* By clause 2, there exists $x \in S$ with $x > M - \varepsilon = M - (M - u) = u$.

*Step 5.* But $u$ is an upper bound of $S$, so $x \leq u$. Combined with $x > u$, this is a contradiction.

*Step 6.* Hence no upper bound $u < M$ exists, so every upper bound $u$ satisfies $u \geq M$, proving $M$ is the least upper bound. Thus $M = \sup S$. $\blacksquare$

**Verification / sanity check.** Apply the theorem to $S = (0, 1)$ with $M = 1$:
- Clause 1: every $x \in (0,1)$ satisfies $x < 1 \leq 1$. ✓
- Clause 2: given $\varepsilon > 0$, pick $x = \max(1/2, 1 - \varepsilon/2) \in (0,1)$. Then $x \geq 1 - \varepsilon/2 > 1 - \varepsilon$. ✓

So $\sup(0,1) = 1$, as expected.

> **Theorem 3.4 ($\varepsilon$-characterisation of $\inf$).** Let $S \subseteq \mathbb{R}$ be non-empty. Then $m = \inf S$ if and only if:
> 1. $m \leq x$ for every $x \in S$ *(lower bound)*;
> 2. for every $\varepsilon > 0$, there exists $x \in S$ with $x < m + \varepsilon$ *(approximation)*.

*Proof.* Mirror the proof of Theorem 3.3 with inequalities reversed — or apply it to the set $-S := \{-x : x \in S\}$ after noting $\inf S = -\sup(-S)$ (Proposition 3.5 below). $\blacksquare$

*Interpretive remark.* The $\varepsilon$-form is how we *use* the supremum in proofs. Whenever we need "an element of $S$ close to $\sup S$ from below," we set $\varepsilon$, invoke clause 2, and obtain such an element. This pattern occurs throughout the development — in the proofs of the Archimedean property, additivity of suprema, density arguments, and countless others.

---

## 3.5 The Least Upper Bound Property (Completeness Axiom)

> **Axiom (LUB Property / Completeness Axiom).** Every non-empty subset of $\mathbb{R}$ that is bounded above has a supremum in $\mathbb{R}$.

This is the structural axiom distinguishing $\mathbb{R}$ from the rationals; all of the subsequent theorems of classical analysis — the intermediate value theorem, the extreme value theorem, monotone convergence, Cauchy completeness — ultimately trace back to it.

### The GLB property is equivalent

> **Proposition 3.5 (GLB Property).** Every non-empty subset $S \subseteq \mathbb{R}$ that is bounded below has an infimum in $\mathbb{R}$, and
> $$\inf S = -\sup(-S),$$
> where $-S = \{-x : x \in S\}$.

**Proof.**

*Step 1 (Translate the hypothesis).* Let $S \subseteq \mathbb{R}$ be non-empty and bounded below, with $\ell$ a lower bound.

*Step 2 ($-S$ is bounded above).* For any $y \in -S$, we can write $y = -x$ with $x \in S$. Then $x \geq \ell$, so $y = -x \leq -\ell$. Thus $-\ell$ is an upper bound of $-S$, and since $S \neq \emptyset$ implies $-S \neq \emptyset$, the LUB axiom applies.

*Step 3 (Define $M$).* By the LUB axiom, $M := \sup(-S)$ exists in $\mathbb{R}$.

*Step 4 ($-M$ is a lower bound of $S$).* For any $x \in S$, $-x \in -S$, so $-x \leq M$, giving $x \geq -M$.

*Step 5 ($-M$ is the greatest lower bound).* Let $\ell'$ be any lower bound of $S$. By the mirror of Step 2, $-\ell'$ is an upper bound of $-S$. Since $M = \sup(-S)$ is the least upper bound of $-S$, $M \leq -\ell'$, i.e., $\ell' \leq -M$.

*Step 6 (Conclusion).* Thus $-M$ is a lower bound and every lower bound is $\leq -M$, so $-M = \inf S$, i.e., $\inf S = -\sup(-S)$. $\blacksquare$

*Interpretive remark.* This tells us we do **not** need a separate GLB axiom: the LUB axiom is enough. The rationale is that reflection through $0$ turns suprema into infima.

### Why this makes $\mathbb{R}$ special

$\mathbb{Q}$ does **not** have the LUB property. Consider
$$S = \{q \in \mathbb{Q} : q > 0 \text{ and } q^2 < 2\} \subseteq \mathbb{Q}.$$
This set is:
- **Non-empty:** $1 \in S$ (since $1 > 0$ and $1^2 = 1 < 2$).
- **Bounded above in $\mathbb{Q}$:** $2$ is an upper bound (if $q > 2$, then $q^2 > 4 > 2$, so $q \notin S$).

Yet it has **no supremum in $\mathbb{Q}$**. Roughly: the natural candidate for $\sup S$ is $\sqrt{2}$, which is irrational (see [[01-real-number-system]] §1.4 for the classical proof). One can show: given any positive rational $q$ with $q^2 < 2$, we can find $q' \in \mathbb{Q}$ with $q' > q$ and $q'^2 < 2$ (push $q$ closer to $\sqrt{2}$); and given any positive rational $u$ with $u^2 > 2$, we can find $u' \in \mathbb{Q}$ with $u' < u$ and $u'^2 > 2$. Hence neither $\sup$ nor $\inf$ of upper bounds is attained in $\mathbb{Q}$.

*Inside $\mathbb{R}$,* by LUB, $\sup S$ exists, and it turns out $\sup S = \sqrt{2}$. The LUB axiom is precisely what **forces** $\sqrt{2}$ to exist as a real number (see the $n$-th root theorem below).

---

## 3.6 Consequences of the LUB Property

### Archimedean Property

Intuitively, the Archimedean property says "no real number is larger than all integers." Though obvious-seeming, it is a genuine consequence of completeness — it fails in some non-standard ordered fields.

> **Theorem 3.6 (Archimedean Property).** For every $x \in \mathbb{R}$, there exists $n \in \mathbb{N}$ with $n > x$.

**Proof.**

*Step 1 (Setup, contrapositive).* Suppose, for contradiction, that some $x \in \mathbb{R}$ satisfies $n \leq x$ for every $n \in \mathbb{N}$. Then $\mathbb{N}$ is bounded above in $\mathbb{R}$, with $x$ an upper bound.

*Step 2 (Apply LUB).* Since $\mathbb{N} \neq \emptyset$ and is bounded above, by the LUB axiom $\alpha := \sup \mathbb{N}$ exists in $\mathbb{R}$.

*Step 3 ($\varepsilon$-characterisation).* Apply Theorem 3.3 with $\varepsilon = 1 > 0$: there exists $n_0 \in \mathbb{N}$ with $n_0 > \alpha - 1$.

*Step 4 (Produce a contradiction).* Then $n_0 + 1 > \alpha$. But $n_0 + 1 \in \mathbb{N}$ (the naturals are closed under $+1$), and $\alpha = \sup \mathbb{N}$ is an upper bound, so $n_0 + 1 \leq \alpha$.

*Step 5.* We have both $n_0 + 1 > \alpha$ and $n_0 + 1 \leq \alpha$, a contradiction. Thus no $x \in \mathbb{R}$ can be an upper bound for $\mathbb{N}$; for every $x$, some $n \in \mathbb{N}$ exceeds it. $\blacksquare$

*Interpretive remark.* The heart of the proof is the **inductive step** $n \mapsto n+1$: once $\mathbb{N}$ is bounded above, we can always find "one more" natural, contradicting the supposed boundedness. The LUB axiom supplies the $\alpha$ that makes the contradiction sharp.

> **Corollary 3.7 (Reciprocal form).** For every $\varepsilon > 0$, there exists $n \in \mathbb{N}$ with $1/n < \varepsilon$.

**Proof.**

*Step 1.* Given $\varepsilon > 0$, apply Theorem 3.6 with $x = 1/\varepsilon$: there exists $n \in \mathbb{N}$ with $n > 1/\varepsilon$.

*Step 2.* Since $n, \varepsilon > 0$, multiplying $n > 1/\varepsilon$ by $\varepsilon/n > 0$ (or simply inverting, noting order reverses for positive quantities): $1/n < \varepsilon$. $\blacksquare$

> **Corollary 3.8.** $\inf\{1/n : n \in \mathbb{N}\} = 0$.

**Proof.**

*Step 1 (Lower bound).* For every $n \in \mathbb{N}$, $1/n > 0$, so $0$ is a lower bound.

*Step 2 ($\varepsilon$-characterisation of inf).* Given $\varepsilon > 0$, by Corollary 3.7 there is $n \in \mathbb{N}$ with $1/n < \varepsilon = 0 + \varepsilon$. So the approximation clause holds.

*Step 3.* By Theorem 3.4, $\inf = 0$. $\blacksquare$

*Sanity check.* $0 \notin \{1/n\}$, so the infimum is not attained; the set has no minimum.

### Density of $\mathbb{Q}$ in $\mathbb{R}$

> **Theorem 3.9 (Density of rationals).** For all $a, b \in \mathbb{R}$ with $a < b$, there exists $q \in \mathbb{Q}$ with $a < q < b$.

**Proof.**

*Step 1 (Amplify the gap).* Since $b - a > 0$, by Corollary 3.7 there exists $n \in \mathbb{N}$ with
$$\frac{1}{n} < b - a, \quad \text{equivalently} \quad nb - na > 1.$$

*Step 2 (Locate an integer in $(na, nb)$).* Since $nb - na > 1$, the open interval $(na, nb)$ has length $> 1$, hence must contain at least one integer. We make this rigorous.

*Step 3 (Existence of least integer exceeding $na$).* By the Archimedean property (Theorem 3.6), there exists $k \in \mathbb{N}$ with $k > na$. By the **well-ordering principle** applied to $\{k' \in \mathbb{Z} : k' > na\}$ (non-empty since $k$ is in it, and bounded below by any integer $\leq na$, which exists by Archimedean applied to $-na$), there is a least such integer $m \in \mathbb{Z}$ with $m > na$.

*Step 4 ($m - 1 \leq na$).* By minimality of $m$, $m - 1 \not> na$, i.e., $m - 1 \leq na$. Hence
$$m \leq na + 1 < na + (nb - na) = nb,$$
using Step 1 in the middle.

*Step 5 (Assemble).* We have $na < m < nb$. Dividing by $n > 0$:
$$a < \frac{m}{n} < b.$$
Set $q = m/n \in \mathbb{Q}$. $\blacksquare$

*Interpretive remark.* The density theorem says $\mathbb{Q}$ is "thick" in $\mathbb{R}$: between *any* two reals, however close, there is a rational. This is a strong statement — it implies $\mathbb{Q}$ is topologically dense in $\mathbb{R}$, though $\mathbb{Q}$ is only countable and $\mathbb{R}$ is uncountable (see [[04-sets-finite-countable-uncountable]]).

> **Corollary 3.10 (Density of irrationals).** For all $a, b \in \mathbb{R}$ with $a < b$, there exists an irrational $r$ with $a < r < b$.

**Proof.**

*Step 1 (Shift the problem).* Consider $a/\sqrt{2}$ and $b/\sqrt{2}$. Since $\sqrt{2} > 0$ and $a < b$, $a/\sqrt{2} < b/\sqrt{2}$.

*Step 2 (Apply Theorem 3.9).* By density of $\mathbb{Q}$, there exists $q \in \mathbb{Q}$ with
$$\frac{a}{\sqrt{2}} < q < \frac{b}{\sqrt{2}}.$$

*Step 3 (Handle $q = 0$).* If $q = 0$, then $a < 0 < b$, and we may instead pick a different rational in the interval $(a/\sqrt{2}, b/\sqrt{2}) \setminus \{0\}$, which is still non-empty by Theorem 3.9 applied to $(a/\sqrt 2, 0)$ if $b/\sqrt 2 > 0$, or to $(0, b/\sqrt 2)$ otherwise. (Either sub-interval has positive length.)

*Step 4 (Scale back).* Set $r = q\sqrt{2}$. Multiplying Step 2's inequality by $\sqrt{2} > 0$:
$$a < q\sqrt{2} < b.$$

*Step 5 ($r$ is irrational).* If $r = q\sqrt{2}$ were rational, then $\sqrt{2} = r/q$ would be rational (since $q \neq 0$) — but $\sqrt{2}$ is irrational. Contradiction, so $r \notin \mathbb{Q}$. $\blacksquare$

*Remark.* Thus the irrationals are also dense: $\mathbb{R}$ is threaded by two interlocking dense subsets, the rationals (countable) and the irrationals (uncountable).

### Existence of $n$-th roots

The LUB axiom manufactures the $n$-th roots that $\mathbb{Q}$ lacks.

> **Theorem 3.11 ($n$-th root).** For every $x > 0$ and every $n \in \mathbb{N}$, there is a unique $y > 0$ with $y^n = x$.

**Proof sketch (existence; uniqueness from monotonicity).**

*Step 1 (Define candidate set).* Let $S = \{t > 0 : t^n < x\}$.

*Step 2 ($S$ non-empty).* If $x \geq 1$, then $t = x/2 > 0$ and $t^n = (x/2)^n \leq (x/2) < x$ (using $n \geq 1$ and $x/2 \leq x - 1/2 < x$... actually simpler: take $t = \min(x, 1)/2$; then $t \leq 1/2$ so $t^n \leq t < x$). If $0 < x < 1$, take $t = x/2$; then $t^n < t = x/2 < x$. Either way, $S \neq \emptyset$.

*Step 3 ($S$ bounded above).* Claim: $1 + x$ is an upper bound. If $t \geq 1 + x$, then $t^n \geq (1 + x)^n \geq 1 + nx > x$ (Bernoulli's inequality for $n \geq 1$), so $t \notin S$.

*Step 4 (Define $y$).* By the LUB axiom, $y := \sup S$ exists. Since some $t_0 \in S$ has $t_0 > 0$, $y \geq t_0 > 0$.

*Step 5 (Rule out $y^n < x$).* Suppose $y^n < x$. Let $\delta = x - y^n > 0$. For small $h > 0$, $(y + h)^n = y^n + \sum_{k=1}^n \binom{n}{k} y^{n-k} h^k$. Choose $h$ small enough that the sum is $< \delta$ (possible since the sum is a polynomial in $h$ vanishing at $h=0$). Then $(y + h)^n < x$, so $y + h \in S$, contradicting $y = \sup S$.

*Step 6 (Rule out $y^n > x$).* Suppose $y^n > x$. Let $\delta = y^n - x > 0$. For small $h > 0$, $(y - h)^n = y^n - \sum_{k=1}^n \binom{n}{k} y^{n-k} (-h)^k$... by similar estimation, $(y - h)^n > x$, so $y - h$ is an upper bound of $S$, contradicting $y = \sup S$ least.

*Step 7 (Conclude).* The only remaining possibility is $y^n = x$.

*Step 8 (Uniqueness).* The map $t \mapsto t^n$ is strictly increasing on $(0, \infty)$ (by induction on $n$: $t_1 < t_2$ implies $t_1^n < t_2^n$). So at most one $y > 0$ satisfies $y^n = x$. $\blacksquare$

*Interpretive remark.* This theorem is the concrete way the LUB axiom "creates" new irrationals: $\sqrt{2}, \sqrt[3]{5}, \sqrt[n]{\pi}$ all exist because the supremum of a carefully chosen set of positive reals exists.

---

## 3.7 Useful Algebraic Properties

For non-empty sets $A, B \subseteq \mathbb{R}$, define
$$A + B := \{a + b : a \in A, b \in B\}, \qquad cA := \{ca : a \in A\} \ (c \in \mathbb{R}).$$

> **Proposition 3.12 (Algebraic properties of sup and inf).** Let $A, B \subseteq \mathbb{R}$ be non-empty sets bounded above (and below, as needed).
> 1. $\sup(A + B) = \sup A + \sup B$.
> 2. $\sup(cA) = \begin{cases} c \sup A, & c \geq 0 \\ c \inf A, & c < 0 \end{cases}$.
> 3. $A \subseteq B \implies \sup A \leq \sup B$ and $\inf A \geq \inf B$.
> 4. $\sup(-A) = -\inf A$ and $\inf(-A) = -\sup A$.

**Proof of (1).** Let $\alpha = \sup A$ and $\beta = \sup B$.

*Step 1 (Upper bound direction, $\sup(A+B) \leq \alpha + \beta$).* For any $a \in A$ and $b \in B$, $a \leq \alpha$ and $b \leq \beta$, so $a + b \leq \alpha + \beta$. Thus $\alpha + \beta$ is an upper bound of $A + B$, and since $\sup(A+B)$ is the *least* upper bound, $\sup(A+B) \leq \alpha + \beta$.

*Step 2 (Lower bound direction, $\sup(A+B) \geq \alpha + \beta$).* Fix $\varepsilon > 0$. By the $\varepsilon$-characterisation (Theorem 3.3) applied to $A$ with $\varepsilon/2$:
$$\exists\, a \in A \text{ with } a > \alpha - \varepsilon/2.$$
Similarly for $B$:
$$\exists\, b \in B \text{ with } b > \beta - \varepsilon/2.$$

*Step 3.* Adding:
$$a + b > (\alpha - \varepsilon/2) + (\beta - \varepsilon/2) = \alpha + \beta - \varepsilon.$$
Since $a + b \in A + B$, this shows $A + B$ has elements exceeding $\alpha + \beta - \varepsilon$. Hence $\sup(A+B) \geq \alpha + \beta - \varepsilon$ (if $\sup(A+B) < \alpha + \beta - \varepsilon$, this element would not be $\leq$ the sup — contradiction).

*Step 4.* Since this holds for every $\varepsilon > 0$: $\sup(A+B) \geq \alpha + \beta$.

*Step 5 (Combine).* From Steps 1 and 4: $\sup(A + B) = \alpha + \beta = \sup A + \sup B$. $\blacksquare$

**Proof of (2).** Take $c \geq 0$ first.

*Case $c = 0$.* Then $cA = \{0\}$, so $\sup(cA) = 0 = 0 \cdot \sup A$. ✓

*Case $c > 0$.* Let $\alpha = \sup A$. For $a \in A$, $a \leq \alpha$ gives $ca \leq c\alpha$ (preserving inequality since $c > 0$), so $c\alpha$ is an upper bound of $cA$. Given $\varepsilon > 0$, by Theorem 3.3 there is $a \in A$ with $a > \alpha - \varepsilon/c$; then $ca > c\alpha - \varepsilon$. By Theorem 3.3 in reverse, $c\alpha = \sup(cA)$.

*Case $c < 0$.* Let $m = \inf A$ (exists by hypothesis or adjustment). For $a \in A$, $a \geq m$ gives $ca \leq cm$ (inequality reverses). So $cm$ is an upper bound of $cA$. Given $\varepsilon > 0$, by Theorem 3.4 applied to $A$ with $\varepsilon/|c|$: $\exists a \in A$ with $a < m + \varepsilon/|c|$. Multiplying by $c < 0$: $ca > cm + c \cdot \varepsilon/|c| = cm - \varepsilon$. By Theorem 3.3, $\sup(cA) = cm = c \inf A$. $\blacksquare$

**Proof of (3).** Let $A \subseteq B$, both non-empty and bounded above.

*Step 1.* $\sup B$ is an upper bound of $B$, hence of $A$ (since $A \subseteq B$).

*Step 2.* $\sup A$ is the *least* upper bound of $A$, so $\sup A \leq \sup B$.

The proof for $\inf$ is analogous. $\blacksquare$

**Proof of (4).** This is Proposition 3.5 restated, whose proof appears there. $\blacksquare$

### Convention for unbounded and empty sets

It is convenient to extend the definition to cover sets that are not bounded, and the empty set:

- If $S$ is not bounded above, write $\sup S = +\infty$.
- If $S$ is not bounded below, write $\inf S = -\infty$.
- Conventionally, $\sup \emptyset = -\infty$ and $\inf \emptyset = +\infty$.

*Justification for the empty-set convention.* Every real is vacuously an upper bound of $\emptyset$; the "smallest" upper bound, taken over $\mathbb{R} \cup \{\pm\infty\}$, is $-\infty$. Dually for the infimum. The convention makes identities like $\sup(A \cup B) = \max(\sup A, \sup B)$ work uniformly.

*Sanity check.* $\sup \emptyset < \inf \emptyset$ — the only case where this "backwards" ordering happens, flagging that $\emptyset$ is degenerate.

---

## Worked Examples

### Example 1: A telescoping sequence set

**Problem.** Find $\sup S$ and $\inf S$ for $S = \{1 - 1/n : n \in \mathbb{N}\}$.

**Setup / Strategy.** Enumerate the first few elements to form intuition; identify lower bound by monotonicity and upper bound via $\varepsilon$-argument; check attainment.

**Computation.**

*Enumeration.* $n = 1, 2, 3, 4, \ldots$ give elements $0, 1/2, 2/3, 3/4, \ldots$, monotonically increasing, all strictly below $1$.

*Lower bound.* For every $n \in \mathbb{N}$, $1/n \leq 1$, so $1 - 1/n \geq 0$. Equality at $n = 1$: $1 - 1 = 0 \in S$. Thus $0$ is a lower bound and is attained, so
$$\inf S = \min S = 0.$$

*Upper bound.* For every $n \in \mathbb{N}$, $1/n > 0$, so $1 - 1/n < 1$. Thus $1$ is an upper bound. We must show no smaller upper bound exists, i.e., apply Theorem 3.3 with $M = 1$:

*Approximation clause.* Given $\varepsilon > 0$, we must find $n \in \mathbb{N}$ with
$$1 - \frac{1}{n} > 1 - \varepsilon, \quad \text{i.e.,} \quad \frac{1}{n} < \varepsilon.$$
By Corollary 3.7 (reciprocal Archimedean), such $n$ exists.

Hence, by Theorem 3.3, $\sup S = 1$.

**Verification.** $1 \notin S$: if $1 = 1 - 1/n$, then $1/n = 0$, impossible for $n \in \mathbb{N}$. So $S$ has no maximum.

**Interpretation.** $\sup S = 1$, $\inf S = 0 = \min S$. The set accumulates at $1$ without reaching it; dually, it attains its minimum at the "boundary" $n = 1$.

---

### Example 2: A rational subset whose sup is irrational

**Problem.** Find $\sup S$ and $\inf S$ for $S = \{x \in \mathbb{Q} : x^2 < 3\}$ (computed in $\mathbb{R}$).

**Setup / Strategy.** Identify $S$ as a rational analogue of the interval $(-\sqrt{3}, \sqrt{3})$, then use density of $\mathbb{Q}$ in $\mathbb{R}$ to pin down the supremum.

**Computation.**

*Characterise $S$.* $x \in S \iff x \in \mathbb{Q}$ and $-\sqrt{3} < x < \sqrt{3}$. Thus
$$S = \mathbb{Q} \cap (-\sqrt{3}, \sqrt{3}).$$

*Upper bound.* $\sqrt{3}$ is an upper bound of $S$ (every element of $S$ is $< \sqrt{3}$).

*Approximation.* Given $\varepsilon > 0$, apply Theorem 3.9 (density) to the interval $(\sqrt{3} - \varepsilon, \sqrt{3})$ (of length $\varepsilon > 0$): there exists $q \in \mathbb{Q}$ with $\sqrt{3} - \varepsilon < q < \sqrt{3}$. Such $q$ satisfies $q^2 < 3$ (since $0 < q < \sqrt{3}$ implies $q^2 < 3$, assuming $\varepsilon < \sqrt{3}$; for $\varepsilon \geq \sqrt{3}$, any $q \in (0, 1)$ works). Hence $q \in S$ and $q > \sqrt{3} - \varepsilon$.

*Conclusion.* By Theorem 3.3, $\sup S = \sqrt{3}$. By symmetry ($S = -S$), $\inf S = -\sqrt{3}$.

**Verification.** $\sqrt{3} \notin S$: because $\sqrt{3}$ is irrational, $\sqrt{3} \notin \mathbb{Q}$, hence $\sqrt{3} \notin S$. So the supremum is not attained in $S$.

**Interpretation.** Inside $\mathbb{Q}$ alone, this set has neither sup nor inf — a concrete manifestation of $\mathbb{Q}$ failing LUB. The passage to $\mathbb{R}$ is what supplies $\pm\sqrt{3}$ as bounds.

---

### Example 3: Suprema of set-theoretic combinations

**Problem.** Let $A = (0, 2)$ and $B = [1, 3]$. Find $\sup(A \cap B)$, $\inf(A \cap B)$, $\sup(A \cup B)$, $\inf(A \cup B)$, and $\sup(A + B)$.

**Setup / Strategy.** Compute each set explicitly, then read off the extremes. Verify $A + B$ by applying Proposition 3.12(1).

**Computation.**

*$A \cap B$.* $x \in A \cap B \iff 0 < x < 2$ and $1 \leq x \leq 3$, i.e., $1 \leq x < 2$. So
$$A \cap B = [1, 2).$$
Hence $\inf = 1 = \min$ (attained), $\sup = 2$ (not attained).

*$A \cup B$.* $x \in A \cup B \iff 0 < x < 2$ or $1 \leq x \leq 3$, i.e., $0 < x \leq 3$. So
$$A \cup B = (0, 3].$$
Hence $\inf = 0$ (not attained), $\sup = 3 = \max$ (attained).

*$A + B$.* By definition,
$$A + B = \{a + b : 0 < a < 2,\ 1 \leq b \leq 3\}.$$
The minimum value of $a + b$ approaches $0 + 1 = 1$ (not attained since $a > 0$); the maximum approaches $2 + 3 = 5$ (not attained since $a < 2$). By openness/closedness analysis:
$$A + B = (1, 5).$$
Hence $\inf = 1$, $\sup = 5$, neither attained.

**Verification via Proposition 3.12(1).** $\sup(A + B) = \sup A + \sup B = 2 + 3 = 5$ ✓ and $\inf(A+B) = \inf A + \inf B = 0 + 1 = 1$ ✓ (using the analogue for infima).

**Interpretation.** The sup and inf of $A + B$ are obtained by adding the endpoints, but the *attainment* status depends on both factors: if *either* endpoint is not attained in its set, the sum's endpoint is not attained either.

---

### Example 4: Image of a bounded function

**Problem.** Show that $\sup\{\sin x : x \in \mathbb{R}\} = 1$ and $\inf = -1$, with both attained.

**Setup / Strategy.** Use the global bound $|\sin x| \leq 1$ and find explicit witnesses where the bounds are attained.

**Computation.**

*Upper bound.* For every $x \in \mathbb{R}$, $|\sin x| \leq 1$, so $\sin x \leq 1$. Thus $1$ is an upper bound.

*Attainment of upper bound.* $\sin(\pi/2) = 1$, and $\pi/2 \in \mathbb{R}$, so $1 \in \{\sin x : x \in \mathbb{R}\}$.

*Lower bound / attainment.* Similarly, $\sin x \geq -1$, and $\sin(3\pi/2) = -1$, so $-1$ is the attained infimum.

**Verification.** By Proposition 3.2 (max = sup when the sup is in $S$), both are maxima/minima: $\max = 1$, $\min = -1$.

**Interpretation.** When the bound is attained, the distinction between $\sup/\max$ (or $\inf/\min$) collapses. This is the "easy" regime — no $\varepsilon$-argument required.

---

### Example 5: A structural lemma

**Problem.** Prove: if $\sup A < \sup B$, there exists $b \in B$ with $b > a$ for all $a \in A$.

**Setup / Strategy.** Use the $\varepsilon$-characterisation of $\sup B$ with $\varepsilon = \sup B - \sup A$ to force $b$ above every $a \in A$.

**Proof.**

*Step 1 (Define $\varepsilon$).* Let $\alpha = \sup A$ and $\beta = \sup B$. The hypothesis is $\alpha < \beta$, so
$$\varepsilon := \beta - \alpha > 0.$$

*Step 2 (Extract $b$).* By Theorem 3.3 (applied to $B$), there exists $b \in B$ with
$$b > \beta - \varepsilon = \beta - (\beta - \alpha) = \alpha.$$

*Step 3 (Compare $b$ with all of $A$).* Since $\alpha = \sup A$ is an upper bound of $A$, every $a \in A$ satisfies $a \leq \alpha$. Combining with Step 2:
$$a \leq \alpha < b, \quad \text{i.e.,} \quad b > a.$$

*Step 4.* Hence $b > a$ for every $a \in A$, as required. $\blacksquare$

**Verification.** $b \in B$ and $b > \sup A$; a fortiori $b > a$ for all $a \in A$. ✓

**Interpretation.** The $\varepsilon$-characterisation turns the strict inequality $\sup A < \sup B$ into a concrete element of $B$ that dominates all of $A$. This lemma is a typical reason one prefers the $\varepsilon$-form over the raw "least upper bound" definition in proof writing.

---

## Practice Problems

1. Find $\sup S$ and $\inf S$:
   - (a) $S = \{(-1)^n + 1/n : n \in \mathbb{N}\}$
   - (b) $S = \{m/(m+n) : m, n \in \mathbb{N}\}$
   - (c) $S = \{x \in \mathbb{R} : x^2 - x - 2 < 0\}$

2. Prove that if $A, B \subseteq \mathbb{R}$ are non-empty and bounded, and $a \leq b$ for all $a \in A, b \in B$, then $\sup A \leq \inf B$.

3. Let $f, g : X \to \mathbb{R}$ be bounded. Prove $\sup_{x \in X}(f(x) + g(x)) \leq \sup_{x} f + \sup_{x} g$, and give an example where the inequality is strict.

4. Let $S \subseteq \mathbb{R}$ be non-empty and bounded. Show $\sup S - \inf S = \sup\{x - y : x, y \in S\}$.

5. Prove the Archimedean property directly from the LUB axiom.

---

### Solutions

**Solution 1(a).** $S = \{(-1)^n + 1/n : n \in \mathbb{N}\}$.

*Setup.* Split by parity.

*Computation.*

Let $S^{\text{odd}} = \{-1 + 1/n : n \text{ odd}\}$ and $S^{\text{even}} = \{1 + 1/n : n \text{ even}\}$. Then $S = S^{\text{odd}} \cup S^{\text{even}}$.

*Enumeration.*
- Odd $n = 1, 3, 5, \ldots$: $-1 + 1, -1 + 1/3, -1 + 1/5, \ldots = 0, -2/3, -4/5, \ldots$
- Even $n = 2, 4, 6, \ldots$: $1 + 1/2, 1 + 1/4, 1 + 1/6, \ldots = 3/2, 5/4, 7/6, \ldots$

*Supremum.* Every element of $S^{\text{odd}}$ is $\leq 0 < 1 \leq$ every element of $S^{\text{even}}$, so $\sup S = \sup S^{\text{even}}$.

On $S^{\text{even}}$, $1 + 1/n$ decreases as $n$ increases (over even $n$), so the largest element is at $n = 2$:
$$\sup S = 1 + 1/2 = 3/2, \quad \text{attained at } n = 2, \text{ so } \max S = 3/2.$$

*Infimum.* On $S^{\text{odd}}$, $-1 + 1/n$ is increasing as $n$ increases (over odd $n$) — values $0, -2/3, -4/5, -6/7, \ldots$ are increasing toward $-1$ from above... wait, let me redo: $-1 + 1/1 = 0$, $-1 + 1/3 \approx -0.667$, $-1 + 1/5 = -0.8$, $-1 + 1/7 \approx -0.857$. These decrease toward $-1$, not increase. So $-1 + 1/n \to -1^+$ monotonically decreasing in $n$ along odd integers.

For any $\varepsilon > 0$, by Corollary 3.7 there is an odd $n$ with $1/n < \varepsilon$, so $-1 + 1/n < -1 + \varepsilon$. Hence the $\varepsilon$-characterisation of $\inf$ (Theorem 3.4) gives $\inf S = -1$.

*Lower bound verification.* Every odd-$n$ element is $> -1$ (since $1/n > 0$), and every even-$n$ element is $> 1 > -1$. So $-1$ is a lower bound. ✓

*Attainment.* $-1 \in S$ would require $(-1)^n + 1/n = -1$, i.e., $n$ odd and $1/n = 0$ — impossible. So $-1 \notin S$; no minimum.

**Answer.** $\sup S = \max S = 3/2$; $\inf S = -1$, not attained. $\blacksquare$

---

**Solution 1(b).** $S = \{m/(m+n) : m, n \in \mathbb{N}\}$.

*Setup.* Write $r = m/(m+n) = 1/(1 + n/m)$. Then $r$ depends on the ratio $n/m > 0$.

*Computation.*

Since $m, n \geq 1$, the ratio $n/m$ ranges over all positive rationals — but importantly, $n/m > 0$ strictly, so $r = 1/(1 + n/m) < 1$ strictly. Also, $r > 0$ since $m, n > 0$.

*Upper bound.* Every $r \in S$ satisfies $r < 1$, so $1$ is an upper bound.

*Approximation clause for $\sup$.* Given $\varepsilon > 0$, choose $m$ large with $n = 1$: $r = m/(m + 1)$. Then
$$1 - r = 1 - \frac{m}{m+1} = \frac{1}{m+1}.$$
Choosing $m$ so that $1/(m+1) < \varepsilon$ (possible by Corollary 3.7) gives $r > 1 - \varepsilon$. So by Theorem 3.3, $\sup S = 1$, not attained.

*Lower bound.* Every $r \in S$ satisfies $r > 0$, so $0$ is a lower bound.

*Approximation for $\inf$.* Given $\varepsilon > 0$, choose $n$ large with $m = 1$: $r = 1/(1 + n)$. Then $r < \varepsilon$ iff $1 + n > 1/\varepsilon$, satisfied for large $n$. So $\inf S = 0$, not attained.

**Answer.** $\sup S = 1$, $\inf S = 0$, neither attained. $\blacksquare$

*Sanity check.* $r = m/(m+n)$ at $m = n$: $r = 1/2$. So $1/2 \in S$, consistent with $0 < \sup = 1$.

---

**Solution 1(c).** $S = \{x \in \mathbb{R} : x^2 - x - 2 < 0\}$.

*Setup / Strategy.* Factor and solve the quadratic inequality.

*Computation.*

Factor: $x^2 - x - 2 = (x - 2)(x + 1)$. The product is negative iff the factors have opposite signs:
$$(x - 2)(x + 1) < 0 \iff x + 1 > 0 \text{ and } x - 2 < 0 \iff -1 < x < 2.$$
(The alternative $x + 1 < 0$ and $x - 2 > 0$ gives $x < -1$ and $x > 2$, which is empty.)

So $S = (-1, 2)$.

*Supremum.* Every $x \in S$ has $x < 2$, so $2$ is an upper bound. Given $\varepsilon > 0$, pick $x = 2 - \min(\varepsilon, 1)/2 \in (1, 2) \subseteq S$; then $x > 2 - \varepsilon$. By Theorem 3.3, $\sup S = 2$.

*Infimum.* Every $x \in S$ has $x > -1$, so $-1$ is a lower bound. Similarly $\inf S = -1$.

**Answer.** $\inf S = -1$, $\sup S = 2$, neither attained. $\blacksquare$

---

**Solution 2.** If $A, B \subseteq \mathbb{R}$ are non-empty and bounded with $a \leq b$ for all $a \in A$, $b \in B$, then $\sup A \leq \inf B$.

*Setup / Strategy.* Show every $b \in B$ is an upper bound of $A$, then every element of $B$ is $\geq \sup A$, so $\sup A$ is a lower bound of $B$, hence $\leq \inf B$.

*Proof.*

*Step 1 (Fix $b \in B$).* For every $a \in A$, by hypothesis, $a \leq b$. Hence $b$ is an upper bound of $A$.

*Step 2.* Since $\sup A$ is the *least* upper bound of $A$, $\sup A \leq b$.

*Step 3 (Vary $b$).* Step 2 holds for every $b \in B$. Therefore $\sup A \leq b$ for all $b \in B$, i.e., $\sup A$ is a lower bound of $B$.

*Step 4.* Since $\inf B$ is the *greatest* lower bound of $B$, $\sup A \leq \inf B$. $\blacksquare$

*Interpretive remark.* The proof swaps quantifiers twice, one per step: "for all $a$ fixed $b$" then "for all $b$." The claim is the cleanest possible reformulation of the separation principle for two disjoint totally-ordered sets.

*Edge case.* The inequality may be strict or equal. Example (equal): $A = (0, 1)$, $B = [1, 2)$. Then $a < b$ is not required, only $a \leq b$; in this case $\sup A = 1 = \inf B$. So strictness of the hypothesis does not imply strictness of the conclusion.

---

**Solution 3.** $\sup_x (f + g) \leq \sup f + \sup g$, with example of strict inequality.

*Setup / Strategy.* Apply the pointwise inequality $f(x) + g(x) \leq \sup f + \sup g$ to deduce a bound on $\sup(f + g)$; for strictness, pick $f, g$ whose maxima occur at different points.

*Proof of inequality.*

*Step 1 (Pointwise bound).* For every $x \in X$:
$$f(x) \leq \sup_{y \in X} f(y), \qquad g(x) \leq \sup_{y \in X} g(y).$$

*Step 2.* Adding:
$$f(x) + g(x) \leq \sup f + \sup g.$$

*Step 3.* Thus $\sup f + \sup g$ is an upper bound of $\{f(x) + g(x) : x \in X\}$. Since $\sup_x(f(x) + g(x))$ is the *least* upper bound,
$$\sup_x(f(x) + g(x)) \leq \sup f + \sup g. \quad \blacksquare$$

*Example of strict inequality.* Let $X = \{1, 2\}$. Define
$$f(1) = 1, \quad f(2) = 0; \quad g(1) = 0, \quad g(2) = 1.$$

*Computations.*
- $\sup f = \max(1, 0) = 1$. ✓
- $\sup g = \max(0, 1) = 1$. ✓
- $(f + g)(1) = 1 + 0 = 1$, $(f + g)(2) = 0 + 1 = 1$. So $\sup(f+g) = 1$.

*Verdict.* $\sup(f+g) = 1 < 2 = \sup f + \sup g$. Strict. $\blacksquare$

*Interpretive remark.* Equality in $\sup(f+g) \leq \sup f + \sup g$ requires that $f$ and $g$ simultaneously attain (or approach) their suprema at the same point. When the suprema are attained at different points, the bound is strict — a recurring theme in functional analysis (e.g., the dual pairing norm).

---

**Solution 4.** $\sup S - \inf S = \sup\{x - y : x, y \in S\}$.

*Setup / Strategy.* Let $T = \{x - y : x, y \in S\}$ and express $T = S + (-S)$ (as a Minkowski difference), then apply Proposition 3.12.

*Proof.*

*Step 1 (Identify $T$).* We claim $T = S + (-S)$:
$$T = \{x - y : x, y \in S\} = \{x + (-y) : x \in S, y \in S\} = \{a + b : a \in S, b \in -S\} = S + (-S).$$

*Step 2 (Bound $T$ above).* $S$ is non-empty and bounded above (say $\sup S = \alpha$), so $-S$ is non-empty and bounded above (by $-\inf S = -\mu$ where $\mu = \inf S$). Hence $T = S + (-S)$ is non-empty and bounded above.

*Step 3 (Apply Proposition 3.12(1)).*
$$\sup T = \sup(S + (-S)) = \sup S + \sup(-S).$$

*Step 4 (Apply Proposition 3.12(4)).*
$$\sup(-S) = -\inf S.$$

*Step 5 (Combine).*
$$\sup T = \sup S + (-\inf S) = \sup S - \inf S. \quad \blacksquare$$

*Interpretive remark.* The quantity $\sup S - \inf S$ is the **diameter** (or oscillation) of $S$: the largest possible gap between two elements of $S$. The result says this coincides with the supremum of all actual pairwise differences — the definitions match.

*Sanity check.* $S = [0, 1]$: $\sup S - \inf S = 1 - 0 = 1$. Also $\{x - y : x, y \in [0,1]\} = [-1, 1]$, with $\sup = 1$. ✓

---

**Solution 5.** Prove the Archimedean property directly from the LUB axiom.

(This recapitulates Theorem 3.6 but is important enough to re-derive step-by-step.)

*Goal.* For every $x \in \mathbb{R}$, there exists $n \in \mathbb{N}$ with $n > x$.

*Setup / Strategy.* Contradiction. If $\mathbb{N}$ were bounded above in $\mathbb{R}$, LUB forces $\sup \mathbb{N}$ to exist, and the $\varepsilon$-characterisation produces an integer that exceeds it.

*Proof.*

*Step 1 (Negation).* Suppose the Archimedean property fails. Then for some $x_0 \in \mathbb{R}$, every $n \in \mathbb{N}$ satisfies $n \leq x_0$.

*Step 2 ($\mathbb{N}$ bounded above).* The statement in Step 1 is "$x_0$ is an upper bound of $\mathbb{N}$." So $\mathbb{N}$ is bounded above, and $\mathbb{N} \neq \emptyset$ (e.g., $1 \in \mathbb{N}$).

*Step 3 (LUB supplies $\alpha$).* By the LUB axiom, $\alpha := \sup \mathbb{N}$ exists as a real number.

*Step 4 ($\varepsilon$-characterisation with $\varepsilon = 1$).* By Theorem 3.3, there exists $n_0 \in \mathbb{N}$ with
$$n_0 > \alpha - 1.$$

*Step 5 (Produce a larger natural).* Add $1$:
$$n_0 + 1 > \alpha.$$
Since $\mathbb{N}$ is closed under $+1$ (i.e., $n \in \mathbb{N} \Rightarrow n + 1 \in \mathbb{N}$), $n_0 + 1 \in \mathbb{N}$.

*Step 6 (Contradict sup).* Then $n_0 + 1 \in \mathbb{N}$ but $n_0 + 1 > \alpha = \sup \mathbb{N}$. Yet $\sup \mathbb{N}$ is an upper bound: every $n \in \mathbb{N}$ satisfies $n \leq \alpha$. In particular, $n_0 + 1 \leq \alpha$. Combined with Step 5:
$$n_0 + 1 > \alpha \text{ and } n_0 + 1 \leq \alpha,$$
contradicting the antisymmetry of $\leq$.

*Step 7 (Conclude).* The negation in Step 1 is false: for every $x \in \mathbb{R}$, there exists $n \in \mathbb{N}$ with $n > x$. $\blacksquare$

*Qualifying-exam remark.* Any step that invokes "the LUB axiom" should be flagged explicitly — this is the single place where completeness is used. The rest of the argument is pure ordered-field manipulation. In a graduate exam, the grader is scanning for this structure.

*Where completeness is indispensable.* Without LUB, one cannot rule out a model of the ordered-field axioms in which $\mathbb{N}$ is bounded above — this happens in the hyperreal field $^*\mathbb{R}$ and in other non-Archimedean ordered fields. The ability to prove Archimedean *is equivalent* to having suprema of bounded natural sets, which is itself almost the full LUB axiom.

---

## Related Topics

- [[01-real-number-system]] — the LUB property is the completeness axiom that distinguishes $\mathbb{R}$ from $\mathbb{Q}$.
- [[02-inequalities-and-absolute-value]] — manipulation of inequalities underlies every $\varepsilon$-argument in this chapter.
- [[04-sets-finite-countable-uncountable]] — density of $\mathbb{Q}$ combined with uncountability of $\mathbb{R}$: two dense subsets of vastly different cardinalities.
- [[08-sequences-introduction]] — monotone bounded sequences converge to their sup/inf (Monotone Convergence Theorem).
- [[10-cauchy-sequences-completeness]] — LUB axiom is equivalent to Cauchy completeness, nested-interval property, and Bolzano–Weierstrass.
