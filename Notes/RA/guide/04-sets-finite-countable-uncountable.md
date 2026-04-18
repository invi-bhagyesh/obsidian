# 4. Finite, Countable, and Uncountable Sets

---

## 4.1 Why Counting Infinity Matters

When we pass from finite sets to infinite ones, "size" stops being a natural number. Yet some infinite sets feel "bigger" than others: $\mathbb{N} \subset \mathbb{Z} \subset \mathbb{Q} \subset \mathbb{R}$, but while the first three can be listed out, $\mathbb{R}$ cannot. Cantor's 1874 insight — that $\mathbb{R}$ is strictly larger than $\mathbb{N}$ — underpins why real analysis is genuinely about a *continuum* and not just a long list.

This chapter formalises three sizes: finite, countably infinite (the size of $\mathbb{N}$), and uncountable.

---

## 4.2 Functions, Bijections, and Equivalence

### Definitions

> Let $f : A \to B$ be a function.
> - $f$ is **injective** (one-to-one) if $f(a_1) = f(a_2) \Rightarrow a_1 = a_2$.
> - $f$ is **surjective** (onto) if for every $b \in B$, some $a \in A$ has $f(a) = b$.
> - $f$ is **bijective** if it is both injective and surjective.

A bijection $f: A \to B$ has an inverse $f^{-1}: B \to A$.

### Equivalent sets

> **Definition.** Two sets $A, B$ are **equivalent** (or equinumerous), written $A \sim B$, if there exists a bijection $f: A \to B$.

Equivalence is:
- **Reflexive:** $A \sim A$ (identity)
- **Symmetric:** $A \sim B \Rightarrow B \sim A$ (inverse)
- **Transitive:** $A \sim B, B \sim C \Rightarrow A \sim C$ (composition)

so $\sim$ is a genuine equivalence relation. Cardinality is the invariant.

---

## 4.3 Finite and Infinite Sets

> **Definition.** A set $A$ is **finite** if $A = \emptyset$ or $A \sim \{1, 2, \ldots, n\}$ for some $n \in \mathbb{N}$. We write $|A| = n$.

> **Definition.** $A$ is **infinite** if it is not finite.

### Key fact (Dedekind-infinite characterisation)

> **Theorem.** $A$ is infinite $\iff$ $A$ is equivalent to a proper subset of itself.

**Example:** $\mathbb{N} \sim 2\mathbb{N} = \{2, 4, 6, \ldots\}$ via $n \mapsto 2n$. So $\mathbb{N}$ is equivalent to its proper subset $2\mathbb{N}$, confirming infinity.

This is a hallmark of infinite sets: they have "as many" elements as some of their strict parts. Finite sets cannot be equivalent to a proper subset.

---

## 4.4 Countable Sets

> **Definition.** A set $A$ is **countably infinite** (or **denumerable**) if $A \sim \mathbb{N}$. We write $|A| = \aleph_0$.

> **Definition.** $A$ is **countable** if it is finite or countably infinite.

> **Definition.** $A$ is **uncountable** if it is infinite but not countable.

A countably infinite set can be **enumerated** as a sequence: $A = \{a_1, a_2, a_3, \ldots\}$, with each element listed exactly once. The bijection $\mathbb{N} \to A$, $n \mapsto a_n$, is the enumeration.

### Basic countable examples

**Example:** $\mathbb{Z}$ is countable.

*Construction:* List $\mathbb{Z}$ as $0, 1, -1, 2, -2, 3, -3, \ldots$ by alternating. Explicit bijection $f: \mathbb{N} \to \mathbb{Z}$:
$$f(n) = \begin{cases} n/2 & \text{if } n \text{ even} \\ -(n-1)/2 & \text{if } n \text{ odd} \end{cases}$$

**Example:** The even natural numbers $2\mathbb{N}$ are countable (bijection $n \leftrightarrow 2n$).

---

## 4.5 Basic Theorems on Countability

> **Theorem.** Every subset of a countable set is countable.

*Proof.* Let $A$ be countable and $B \subseteq A$. If $A$ is finite, so is $B$. If $A = \{a_1, a_2, \ldots\}$, define $g: \mathbb{N} \to B$ by listing the subsequence of $(a_n)$ that lies in $B$ (if $B$ is infinite, this produces an enumeration; if $B$ is finite, we've already handled it). $\blacksquare$

> **Theorem.** $A$ is countable $\iff$ there exists a surjection $\mathbb{N} \to A$ (equivalently: there exists an injection $A \to \mathbb{N}$).

This gives a useful "surjective cover" criterion: to show $A$ is countable, it suffices to enumerate possibly with repetitions.

> **Theorem.** A countable union of countable sets is countable.

*Proof.* Let $A_n$ be countable, $A_n = \{a_{n,1}, a_{n,2}, a_{n,3}, \ldots\}$ (pad with repeats if finite). Arrange in a grid:
$$\begin{array}{cccccc} a_{1,1} & a_{1,2} & a_{1,3} & a_{1,4} & \cdots \\ a_{2,1} & a_{2,2} & a_{2,3} & a_{2,4} & \cdots \\ a_{3,1} & a_{3,2} & a_{3,3} & \cdots & & \\ \vdots & & & & \end{array}$$
Enumerate by **diagonals** $(a_{1,1}), (a_{2,1}, a_{1,2}), (a_{3,1}, a_{2,2}, a_{1,3}), \ldots$ giving a surjection $\mathbb{N} \to \bigcup A_n$. Remove duplicates. $\blacksquare$

> **Corollary.** $\mathbb{N} \times \mathbb{N}$ is countable.

*Proof.* $\mathbb{N} \times \mathbb{N} = \bigcup_{n \in \mathbb{N}} \{n\} \times \mathbb{N}$, a countable union of countable sets.

An explicit bijection is $(m, n) \mapsto \frac{(m+n-1)(m+n-2)}{2} + m$, the **Cantor pairing function**.

> **Theorem.** $\mathbb{Q}$ is countable.

*Proof.* Every $q \in \mathbb{Q}$ is $p/r$ with $p \in \mathbb{Z}, r \in \mathbb{N}$. The map $\mathbb{Z} \times \mathbb{N} \to \mathbb{Q}$, $(p, r) \mapsto p/r$ is surjective. Since $\mathbb{Z} \times \mathbb{N}$ is countable (product of countable sets), and surjective image of countable is countable, $\mathbb{Q}$ is countable. $\blacksquare$

> **Theorem.** Finite product of countable sets is countable.

*Proof.* By induction from the $n=2$ case (grid argument above). $\blacksquare$

> **Corollary.** The set of rational points $\mathbb{Q}^n$ is countable for every $n \in \mathbb{N}$.

---

## 4.6 Uncountable Sets — Cantor's Theorem

> **Theorem (Cantor, 1874/1891).** The interval $[0, 1] \subseteq \mathbb{R}$ is uncountable. Hence $\mathbb{R}$ is uncountable.

### Proof by the diagonal argument

Suppose for contradiction that $[0, 1]$ is countable. Enumerate its elements using decimal expansions (using non-terminating expansions to avoid ambiguity, e.g., write $0.5 = 0.4999\ldots$ if needed):
$$\begin{aligned} x_1 &= 0.a_{11}a_{12}a_{13}a_{14}\ldots \\ x_2 &= 0.a_{21}a_{22}a_{23}a_{24}\ldots \\ x_3 &= 0.a_{31}a_{32}a_{33}a_{34}\ldots \\ &\ \ \vdots \end{aligned}$$

Construct $y = 0.b_1 b_2 b_3 \ldots$ where
$$b_n = \begin{cases} 5 & \text{if } a_{nn} \neq 5 \\ 6 & \text{if } a_{nn} = 5 \end{cases}$$
(we avoid $0$ and $9$ to dodge the $0.\overline{9} = 1$ ambiguity.)

Then $y \in [0, 1]$, but $y \neq x_n$ for any $n$ because the $n$-th digit of $y$ differs from the $n$-th digit of $x_n$. So the enumeration is incomplete — contradiction. $\blacksquare$

### Consequence: irrationals are uncountable

$\mathbb{R} = \mathbb{Q} \cup (\mathbb{R} \setminus \mathbb{Q})$. If $\mathbb{R} \setminus \mathbb{Q}$ were countable, $\mathbb{R}$ would be the union of two countable sets, hence countable — contradiction. So **the irrationals form an uncountable set**.

In a precise sense, there are "far more" irrationals than rationals.

### Cardinality summary

| Set                                                                                                                             | Cardinality                             |
| ------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| $\emptyset$                                                                                                                     | $0$                                     |
| $\{1, \ldots, n\}$                                                                                                              | $n$                                     |
| $\mathbb{N}, \mathbb{Z}, \mathbb{Q}$, any non-empty open interval $\cap \mathbb{Q}$                                             | $\aleph_0$ (countably infinite)         |
| $\mathbb{R}$, any non-empty open interval, $\mathbb{R} \setminus \mathbb{Q}$, $\{0,1\}^{\mathbb{N}}$, $\mathcal{P}(\mathbb{N})$ | $\mathfrak{c}$ (continuum, uncountable) |

---

## 4.7 Cantor's Power Set Theorem

> **Theorem (Cantor).** For any set $A$, there is no surjection $A \to \mathcal{P}(A)$.

In particular $A \not\sim \mathcal{P}(A)$, so $|\mathcal{P}(A)| > |A|$: there is no largest infinity.

*Proof.* Suppose $f: A \to \mathcal{P}(A)$ is a surjection. Define
$$D = \{a \in A : a \notin f(a)\} \subseteq A.$$
Then $D \in \mathcal{P}(A)$, so surjectivity forces some $a_0 \in A$ with $f(a_0) = D$. Ask: is $a_0 \in D$?
- If $a_0 \in D$, then by definition $a_0 \notin f(a_0) = D$. Contradiction.
- If $a_0 \notin D$, then $a_0 \in f(a_0) = D$. Contradiction.

Either way, contradiction. So no surjection $A \to \mathcal{P}(A)$ exists. $\blacksquare$

---

## 4.8 The Cantor-Bernstein Theorem

> **Theorem (Schröder-Bernstein / Cantor-Bernstein).** If there exist injections $f: A \to B$ and $g: B \to A$, then $A \sim B$.

This is the main tool for proving equinumerosity without building an explicit bijection. The proof is intricate (using a "back-and-forth" construction) and typically omitted in an introductory course. We state the result and illustrate its use.

### Application

> **Theorem.** $[0, 1] \sim (0, 1) \sim \mathbb{R}$.

*Proof sketch.*
- $(0, 1) \hookrightarrow [0, 1]$ is obvious.
- $[0,1] \hookrightarrow (0, 1)$ via $x \mapsto (x+1)/3$, landing in $(1/3, 2/3)$.
- By Cantor-Bernstein, $[0,1] \sim (0,1)$.
- $(0, 1) \sim \mathbb{R}$ via $x \mapsto \tan(\pi(x - 1/2))$.

Chaining: $[0,1] \sim \mathbb{R}$. $\blacksquare$

---

## Worked Examples

**Example 1:** Show that the set $A = \{2^n : n \in \mathbb{N}\}$ is countable.

*Solution:* The map $\mathbb{N} \to A$, $n \mapsto 2^n$, is bijective (strictly increasing, hence injective; surjective onto $A$ by definition). $A$ is countably infinite. $\blacksquare$

---

**Example 2:** Prove the set of algebraic numbers (roots of polynomials with integer coefficients) is countable.

*Solution:* Let $P_n$ = polynomials of degree $n$ with integer coefficients. Coefficients form an element of $\mathbb{Z}^{n+1}$, so $|P_n| = |\mathbb{Z}^{n+1}| = \aleph_0$. Each polynomial in $P_n$ has at most $n$ roots. So the set of roots of polynomials in $P_n$ is a countable union (over polynomials) of finite sets, hence countable. Taking union over $n \in \mathbb{N}$: algebraic numbers = countable union of countable sets = countable. $\blacksquare$

**Corollary** (Cantor-Liouville): transcendental numbers exist and in fact form an uncountable set (since $\mathbb{R}$ is uncountable).

---

**Example 3:** Prove that the set of all finite subsets of $\mathbb{N}$ is countable.

*Solution:* Let $F_n$ = subsets of $\mathbb{N}$ of size exactly $n$. Each is a subset of $\mathbb{N}^n$ (after ordering), so $|F_n| \leq |\mathbb{N}^n| = \aleph_0$. The set of all finite subsets is $\bigcup_{n=0}^\infty F_n$, a countable union of countable sets, hence countable. $\blacksquare$

---

**Example 4:** Show that $\{0, 1\}^{\mathbb{N}}$ (the set of all infinite 0-1 sequences) is uncountable.

*Solution:* Suppose $\{0,1\}^{\mathbb{N}} = \{s_1, s_2, \ldots\}$ is an enumeration; each $s_n = (s_{n,1}, s_{n,2}, \ldots)$. Define $t = (t_1, t_2, \ldots)$ with $t_n = 1 - s_{n,n}$. Then $t$ differs from $s_n$ in the $n$-th position for every $n$, so $t \notin \{s_1, s_2, \ldots\}$ — contradiction. $\blacksquare$

This is the cleanest form of the diagonal argument.

---

**Example 5:** Show $\mathbb{R} \sim \mathbb{R} \times \mathbb{R}$.

*Solution sketch.* Injectively interleave decimal expansions: if $x = 0.a_1 a_2 a_3 \ldots$ and $y = 0.b_1 b_2 b_3 \ldots$, send $(x, y) \mapsto 0.a_1 b_1 a_2 b_2 a_3 b_3 \ldots$. This gives an injection $\mathbb{R} \times \mathbb{R} \to \mathbb{R}$ (after a bit of care with non-unique expansions). The reverse injection $\mathbb{R} \to \mathbb{R} \times \mathbb{R}$, $x \mapsto (x, 0)$, is trivial. Cantor-Bernstein finishes it. $\blacksquare$

So the plane and the line have the same cardinality, despite dimension disagreeing — cardinality is a crude measure.

---

## Practice Problems

1. Prove that the set $\mathbb{N} \times \mathbb{N} \times \mathbb{N}$ is countable.

2. Show that any set of pairwise disjoint open intervals in $\mathbb{R}$ is countable.

3. Prove that the set of continuous functions $\mathbb{R} \to \mathbb{R}$ has cardinality $\mathfrak{c}$ (same as $\mathbb{R}$). *Hint:* a continuous function is determined by its values on $\mathbb{Q}$.

4. Show that the power set $\mathcal{P}(\mathbb{N})$ is uncountable.

5. Let $A$ be countably infinite. Show that the set of all finite sequences from $A$ is countable.

### Solutions

**1.** $\mathbb{N}^3 = \mathbb{N} \times \mathbb{N} \times \mathbb{N}$ is a finite product of countable sets, hence countable. $\blacksquare$

**2.** For each disjoint open interval $I$, choose a rational $q_I \in I$ (possible by density of $\mathbb{Q}$). Distinct intervals give distinct rationals (disjointness). So we have an injection from the family of intervals into $\mathbb{Q}$, which is countable. $\blacksquare$

**3.** A continuous $f : \mathbb{R} \to \mathbb{R}$ is determined by $f|_{\mathbb{Q}}$ (by continuity and density). So the map $f \mapsto f|_{\mathbb{Q}}$ from $C(\mathbb{R})$ into $\mathbb{R}^{\mathbb{Q}}$ is injective. $|\mathbb{R}^{\mathbb{Q}}| = \mathfrak{c}^{\aleph_0} = \mathfrak{c}$. Conversely constants give $\mathbb{R} \hookrightarrow C(\mathbb{R})$. Cantor-Bernstein: $|C(\mathbb{R})| = \mathfrak{c}$. $\blacksquare$

**4.** Construct a bijection $\mathcal{P}(\mathbb{N}) \to \{0, 1\}^{\mathbb{N}}$ by $S \mapsto \mathbf{1}_S$ (indicator). By Example 4, $\{0,1\}^{\mathbb{N}}$ is uncountable, so $\mathcal{P}(\mathbb{N})$ is too. (This is a special case of Cantor's Power Set Theorem.) $\blacksquare$

**5.** Finite sequences = $\bigcup_{n=0}^{\infty} A^n$. Each $A^n$ is a finite product of countable sets, hence countable. Countable union of countable sets is countable. $\blacksquare$

---

## Related Topics
- [[01-real-number-system]] — $\mathbb{Q} \subsetneq \mathbb{R}$: irrationals exist
- [[03-supremum-and-infimum]] — density of $\mathbb{Q}$ used above
- [[05-open-sets-closed-sets]] — disjoint open intervals form a countable family
- [[08-sequences-introduction]] — countable sets match naturally with sequences
