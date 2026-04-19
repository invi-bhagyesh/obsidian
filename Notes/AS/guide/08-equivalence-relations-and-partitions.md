# 8. Equivalence Relations and Partitions

> **Bridge chapter.** Before cosets (next chapter), we need the tool that turns "having a common property" into "being in the same set": **equivalence relations** and the matching **partitions** they induce. This duality — "relation ↔ partition" — appears throughout algebra. Cosets partition a group. Conjugacy classes partition a group. Orbits partition a set under group action. The ring $\mathbb{Z}_n$ *is* a partition of $\mathbb{Z}$ into congruence classes. Get the bijection down once, here, and the rest of CO2–CO3 becomes painless.
>
> **Philosophical remark.** One of the most pervasive techniques in mathematics is to declare "two objects are the same if they differ by something we do not care about." Fractions $2/4$ and $1/2$ are "the same" if we do not care about the particular representation. Integers $7$ and $12$ are "the same mod $5$" if we do not care about multiples of $5$. Two matrices are "similar" if we do not care about the choice of basis. In every instance, the formal mechanism by which we make this identification precise is the equivalence relation, and the resulting set of "sames" is the partition. This chapter makes that mechanism precise.

---

## 8.1 Equivalence Relations

> **Definition (Binary relation).** A **binary relation** on a set $X$ is a subset $R \subseteq X \times X$. Write $a \sim b$ for $(a, b) \in R$.

**Remark on the definition.** A relation is, at its most abstract, *just a set of ordered pairs*. The notation $a \sim b$ is shorthand for $(a, b) \in R$. This foundational reduction — "properties are sets" — is a hallmark of set-theoretic mathematics. Notice that the order matters: $(a, b) \in R$ does not imply $(b, a) \in R$. The additional axioms below will enforce properties that mend this asymmetry.

> **Definition (Equivalence relation).** A relation $\sim$ on $X$ is an **equivalence relation** if:
> 1. **(Reflexive)** $\forall a \in X : a \sim a$.
> 2. **(Symmetric)** $a \sim b \Rightarrow b \sim a$.
> 3. **(Transitive)** $a \sim b \wedge b \sim c \Rightarrow a \sim c$.

**Expanded commentary on the axioms.**

- *Reflexivity* says every element is related to itself. Without this, a trivially empty relation (containing no pairs) would be vacuously symmetric and transitive but fail reflexivity. We need reflexivity to guarantee every element lives in *some* equivalence class.
- *Symmetry* eliminates directionality: "$a$ is related to $b$" and "$b$ is related to $a$" become the same statement. This is what distinguishes equivalence from partial order (which requires antisymmetry: $a \leq b$ and $b \leq a$ imply $a = b$).
- *Transitivity* is the "chaining" axiom. It ensures that being related is coherent along arbitrary paths: if $a_1 \sim a_2 \sim \cdots \sim a_n$, then $a_1 \sim a_n$. Without transitivity, "sameness" would not be a well-defined property but rather a local one.

Equivalence relations capture "sameness in some respect": same color, same parity, same residue mod $n$, same coset, same conjugacy class.

**A uniform construction.** The simplest (and in a sense universal) source of equivalence relations is: given a function $f: X \to Y$, define $a \sim b \iff f(a) = f(b)$. Every property of the form "$a$ and $b$ agree when we forget some structure" arises this way (Example 9 below). Conversely, every equivalence relation $\sim$ on $X$ is of this form, with $Y = X/{\sim}$ and $f$ the quotient map $a \mapsto [a]$.

---

## 8.2 Examples and Non-examples

**Example 1 (Equality).** $a = b$ on any set $X$. The trivial equivalence relation.

*Full verification.*
- **Reflexive:** For any $a \in X$, we have $a = a$ by the reflexivity of equality itself. $\checkmark$
- **Symmetric:** If $a = b$, then by the symmetry property of equality (a primitive feature of the equality predicate), $b = a$. $\checkmark$
- **Transitive:** If $a = b$ and $b = c$, then $a = c$ by substitution/transitivity of equality. $\checkmark$

*Classes.* $[a] = \{a\}$ is a singleton. The quotient $X/{=}$ is in bijection with $X$ itself via $a \leftrightarrow \{a\}$. This is why equality is called the *finest* equivalence relation — it distinguishes all elements. Every other equivalence relation is a coarsening (has larger classes).

**Example 2 (Congruence mod $n$).** Fix a positive integer $n \geq 1$. Define $a \sim b \iff n \mid (a - b)$, on $\mathbb{Z}$.

*Full verification with explicit algebra.*

- **Reflexive:** For any $a \in \mathbb{Z}$, compute $a - a = 0$. Since $n \cdot 0 = 0$, we have $n \mid 0$, hence $n \mid (a - a)$. Therefore $a \sim a$. $\checkmark$
- **Symmetric:** Suppose $a \sim b$, meaning $n \mid (a - b)$. Then there exists $k \in \mathbb{Z}$ with $a - b = nk$. Multiplying by $-1$:
$$b - a = -(a - b) = -nk = n(-k).$$
Since $-k \in \mathbb{Z}$, this shows $n \mid (b - a)$, i.e., $b \sim a$. $\checkmark$
- **Transitive:** Suppose $a \sim b$ and $b \sim c$. Then $n \mid (a - b)$ and $n \mid (b - c)$, so there exist integers $k, \ell$ with $a - b = nk$ and $b - c = n\ell$. Adding these equations:
$$(a - b) + (b - c) = nk + n\ell \implies a - c = n(k + \ell).$$
Since $k + \ell \in \mathbb{Z}$, we conclude $n \mid (a - c)$, i.e., $a \sim c$. $\checkmark$

**Why this works.** All three proofs hinge on the fact that $n\mathbb{Z}$ (the multiples of $n$) is *closed under negation and addition* — it is an additive subgroup of $\mathbb{Z}$. This is the prototype of the general fact that every subgroup $H \leq G$ induces an equivalence relation on $G$ (the coset relation), a connection we make precise in [[09-cosets-and-lagranges-theorem]].

**Example 3 (Parallel lines).** Two lines in the plane are parallel iff they have the same slope (or both vertical). Equivalence relation.

*Full verification.* Let $\ell_1, \ell_2, \ell_3$ be lines in the plane. Define $\ell_1 \sim \ell_2$ iff $\ell_1$ and $\ell_2$ have the same slope (where we assign the "slope" $\infty$ to vertical lines).

- **Reflexive:** Any line has the same slope as itself. $\checkmark$
- **Symmetric:** If $\ell_1$ and $\ell_2$ have the same slope, then trivially $\ell_2$ and $\ell_1$ have the same slope. $\checkmark$
- **Transitive:** If $\text{slope}(\ell_1) = \text{slope}(\ell_2)$ and $\text{slope}(\ell_2) = \text{slope}(\ell_3)$, then $\text{slope}(\ell_1) = \text{slope}(\ell_3)$ by transitivity of equality. $\checkmark$

**Remark.** This is a special case of the general construction "$a \sim b$ iff $f(a) = f(b)$," where $f$ assigns to each line its slope in $\mathbb{R} \cup \{\infty\} \cong \mathbb{R}\mathbb{P}^1$.

*Geometric interpretation of classes.* The equivalence class of a line $\ell$ is the *pencil of parallels through $\ell$* — all lines with the same direction. The quotient set is the **projective line** $\mathbb{R}\mathbb{P}^1$, which can be identified with directions in the plane.

**Example 4 (Conjugacy in $S_n$).** $\sigma \sim \tau \iff \exists \rho : \tau = \rho \sigma \rho^{-1}$.

*Full verification.*

- **Reflexive:** Take $\rho = e$ (the identity permutation). Then $e \sigma e^{-1} = e \sigma e = \sigma$. So $\sigma \sim \sigma$. $\checkmark$
- **Symmetric:** Suppose $\sigma \sim \tau$, so $\tau = \rho \sigma \rho^{-1}$ for some $\rho$. Multiply both sides on the left by $\rho^{-1}$ and on the right by $\rho$:
$$\rho^{-1} \tau \rho = \rho^{-1}(\rho \sigma \rho^{-1})\rho = (\rho^{-1}\rho)\sigma(\rho^{-1}\rho) = e \sigma e = \sigma.$$
Letting $\rho' = \rho^{-1}$, we have $\sigma = \rho' \tau (\rho')^{-1}$ (using $(\rho^{-1})^{-1} = \rho$), so $\tau \sim \sigma$. $\checkmark$
- **Transitive:** Suppose $\sigma \sim \tau$ and $\tau \sim \pi$. Then $\tau = \rho_1 \sigma \rho_1^{-1}$ and $\pi = \rho_2 \tau \rho_2^{-1}$ for some $\rho_1, \rho_2$. Substituting:
$$\pi = \rho_2(\rho_1 \sigma \rho_1^{-1})\rho_2^{-1} = (\rho_2 \rho_1)\sigma(\rho_1^{-1}\rho_2^{-1}) = (\rho_2 \rho_1)\sigma(\rho_2 \rho_1)^{-1},$$
where we used the socks-shoes rule $\rho_1^{-1}\rho_2^{-1} = (\rho_2\rho_1)^{-1}$. Letting $\rho = \rho_2 \rho_1$, we have $\pi = \rho \sigma \rho^{-1}$, so $\sigma \sim \pi$. $\checkmark$

**Why this works.** The three axioms track three closure properties of the group: identity (for reflexivity), inverses (for symmetry), and composition (for transitivity). This generalizes: for any group $G$ acting on a set $X$, the orbit relation is an equivalence for the same reasons (see [[15-group-actions]]).

**Example 5 (Same cycle type).** In $S_n$, $\sigma \sim \tau$ iff same cycle type.

*Full verification.* The cycle type of a permutation $\sigma \in S_n$ is the partition of $n$ recording the lengths of its disjoint cycles (e.g., the permutation $(1\,2)(3\,4\,5) \in S_5$ has cycle type $2+3$, written $(3,2)$ or $3\,2\,1^0$). Let $\text{type}(\sigma)$ denote this partition.

- **Reflexive:** $\text{type}(\sigma) = \text{type}(\sigma)$. $\checkmark$
- **Symmetric:** $\text{type}(\sigma) = \text{type}(\tau) \Rightarrow \text{type}(\tau) = \text{type}(\sigma)$. $\checkmark$
- **Transitive:** $\text{type}(\sigma) = \text{type}(\tau)$ and $\text{type}(\tau) = \text{type}(\pi)$ imply $\text{type}(\sigma) = \text{type}(\pi)$ by transitivity of equality of partitions. $\checkmark$

**Connection to Example 4.** By Corollary 5.6 of [[05-permutation-and-dihedral-groups]], $\sigma$ and $\tau$ are conjugate in $S_n$ iff they have the same cycle type. So Examples 4 and 5 induce the *same* partition of $S_n$, even though their definitions look different. This is typical: two equivalence relations that are *a priori* distinct may turn out to be equal.

**Non-example 1.** $a \leq b$ on $\mathbb{Z}$.

*Analysis.*
- **Reflexive:** $a \leq a$ holds for every $a$. $\checkmark$
- **Symmetric:** **FAILS.** Counterexample: $2 \leq 3$ but $3 \not\leq 2$. So this axiom is not satisfied.
- **Transitive:** $a \leq b$ and $b \leq c$ imply $a \leq c$. $\checkmark$

Thus $\leq$ satisfies reflexivity and transitivity but not symmetry. The correct name for this is **partial order** (or total order, since $\leq$ is also total on $\mathbb{Z}$). The failure of symmetry allows $\leq$ to encode direction — crucial for ordering but antithetical to equivalence.

**Non-example 2.** $a \sim b \iff |a - b| < 1$ on $\mathbb{R}$.

*Analysis.*
- **Reflexive:** $|a - a| = 0 < 1$, so $a \sim a$. $\checkmark$
- **Symmetric:** $|a - b| = |b - a|$, so $|a - b| < 1 \iff |b - a| < 1$. Hence $a \sim b \iff b \sim a$. $\checkmark$
- **Transitive:** **FAILS.** Take $a = 0, b = 0.7, c = 1.3$. Then $|a - b| = 0.7 < 1$ and $|b - c| = 0.6 < 1$, so $a \sim b$ and $b \sim c$. But $|a - c| = 1.3 \not< 1$, so $a \not\sim c$.

**Remark.** This kind of "closeness" relation is called a **tolerance relation** in some contexts. Tolerance relations are important in fuzzy set theory and perceptual psychology (two colors look "the same" if they differ by less than some threshold, but the relation is non-transitive because small differences can accumulate). To get an equivalence relation, one must quotient out the transitive closure.

**Non-example 3.** $a \sim b \iff a \neq b$.

*Analysis.*
- **Reflexive:** **FAILS.** $a \neq a$ is false for all $a$. So $a \sim a$ fails, violating reflexivity.
- **Symmetric:** $a \neq b \iff b \neq a$ by symmetry of equality. $\checkmark$
- **Transitive:** **FAILS** (when $|X| \geq 2$). Take any $a, b$ with $a \neq b$. Then $a \sim b$ and $b \sim a$. Transitivity would require $a \sim a$, i.e., $a \neq a$, which is false. (On a set with $|X| \leq 1$, transitivity holds vacuously.)

**Lesson.** This non-example is subtle: symmetry holds, but reflexivity and transitivity fail. It illustrates that the three axioms are genuinely independent — there exist relations satisfying any two but not the third.

---

## 8.3 Equivalence Classes

> **Definition.** Given an equivalence relation $\sim$ on $X$, the **equivalence class** of $a \in X$ is
> $$[a] = \{x \in X : x \sim a\}.$$
> The **quotient set** $X/\sim$ is the collection of all equivalence classes.

**Notational conventions and remarks.**
- Some texts write $[a]_\sim$ or $\bar a$ instead of $[a]$; we use $[a]$ unless ambiguity is possible.
- The element $a$ is called a **representative** of the class $[a]$. Different representatives can give the same class: $[a] = [b]$ whenever $a \sim b$ (Theorem 8.1(2)).
- The quotient set $X/\sim$ is a set whose *elements are subsets of $X$* — specifically, the equivalence classes. This apparent abstraction is what makes quotient constructions work: we "collapse" each class to a single point.

> **Theorem 8.1 (Fundamental properties).** Let $\sim$ be an equivalence relation on $X$.
> 1. $a \in [a]$ for all $a$ (classes are non-empty).
> 2. $[a] = [b] \iff a \sim b$.
> 3. Either $[a] = [b]$ or $[a] \cap [b] = \emptyset$ (classes are either equal or disjoint).
> 4. $X = \bigcup_{a \in X} [a]$ (classes cover $X$).

**Proof.**

*(1) $a \in [a]$.*

By reflexivity, $a \sim a$. By definition of equivalence class, $[a] = \{x \in X : x \sim a\}$. Since $a$ satisfies $a \sim a$, we have $a \in [a]$. In particular, $[a]$ is non-empty.

**Why it matters.** This immediately gives us the "cover" property: every element is in some class (its own class). Without reflexivity, an element could be "lost" — not related to anything, not even itself — and the decomposition would miss it.

*(2) $[a] = [b] \iff a \sim b$.*

We prove both implications carefully.

**Step 2a ($\Leftarrow$):** Assume $a \sim b$. We show $[a] \subseteq [b]$ and $[b] \subseteq [a]$.

*Inclusion $[a] \subseteq [b]$.* Take an arbitrary $x \in [a]$, meaning $x \sim a$. Combined with the hypothesis $a \sim b$, transitivity gives $x \sim b$. Hence $x \in [b]$. Since $x \in [a]$ was arbitrary, $[a] \subseteq [b]$.

*Inclusion $[b] \subseteq [a]$.* By symmetry applied to the hypothesis, $b \sim a$. Now take arbitrary $y \in [b]$, meaning $y \sim b$. By transitivity with $b \sim a$, we get $y \sim a$, so $y \in [a]$. Hence $[b] \subseteq [a]$.

Combining the two inclusions: $[a] = [b]$.

**Step 2b ($\Rightarrow$):** Assume $[a] = [b]$. By part (1), $a \in [a]$. Substituting equality: $a \in [b]$, which by definition means $a \sim b$.

This completes the proof of (2).

**Remark on technique.** The proof of (2) uses *all three* equivalence axioms, each exactly once: reflexivity in the "$\Rightarrow$" direction (to know $a \in [a]$), symmetry to convert $a \sim b$ to $b \sim a$, and transitivity to chain relations. If any one axiom were missing, the statement would fail.

*(3) Either $[a] = [b]$ or $[a] \cap [b] = \emptyset$.*

We argue by contrapositive: if $[a] \cap [b] \neq \emptyset$, then $[a] = [b]$.

Suppose there exists $c \in [a] \cap [b]$. Then:
- $c \in [a]$ means $c \sim a$.
- $c \in [b]$ means $c \sim b$.

By symmetry, $c \sim a$ becomes $a \sim c$. Combined with $c \sim b$, transitivity gives $a \sim b$. By part (2) just proved, $[a] = [b]$. $\checkmark$

**Intuition.** Two equivalence classes "touch" (share a point) *only* if they coincide entirely. This is the dichotomy that turns classes into a partition.

*(4) $X = \bigcup_{a \in X} [a]$.*

The inclusion $\bigcup_{a \in X}[a] \subseteq X$ is immediate because each $[a]$ is a subset of $X$.

For the reverse inclusion, take any $x \in X$. By part (1), $x \in [x]$. Hence $x$ belongs to at least one class in the union, namely $[x]$. So $x \in \bigcup_{a \in X}[a]$.

Combining: $X = \bigcup_{a \in X} [a]$. $\blacksquare$

**Synthesis.** Points (3) and (4) together say: **the equivalence classes partition $X$.** They are pairwise disjoint (3) and cover $X$ (4), and by (1) they are non-empty — exactly the three conditions defining a partition (Section 8.4).

**Sanity check on point 2.** If we take $X = \mathbb{Z}$ with $\sim$ = congruence mod $5$: the class $[2]$ is $\{\ldots, -8, -3, 2, 7, 12, \ldots\}$, which equals $[7]$ because $2 \sim 7$ (difference is $5$, divisible by $5$). Representatives $2$ and $7$ label the same class. $\checkmark$

---

## 8.4 Partitions

> **Definition (Partition).** A **partition** of a set $X$ is a collection $\mathcal{P} = \{X_\alpha\}_{\alpha \in A}$ of non-empty subsets of $X$ such that:
> 1. $\bigcup_\alpha X_\alpha = X$ (**covers $X$**).
> 2. $X_\alpha \neq X_\beta \Rightarrow X_\alpha \cap X_\beta = \emptyset$ (**disjoint blocks**).

**Explanatory remarks.**
- The subsets $X_\alpha$ are called **blocks** or **cells** or **parts** of the partition.
- Equivalently, condition (2) says: distinct blocks are disjoint, or equivalently, every element of $X$ lies in *exactly one* block.
- The indexing set $A$ can be finite or infinite; there is no cardinality restriction.
- A partition is sometimes denoted by a shorthand like $\{X_1 \mid X_2 \mid X_3\}$, using vertical bars to separate blocks.

Two views of the same structure: either give equivalence classes, or give disjoint blocks that cover $X$. The equivalence is made precise in the next theorem.

> **Theorem 8.2 (Relation-partition bijection).** For any set $X$, there is a natural bijection:
> $$\{\text{equivalence relations on } X\} \longleftrightarrow \{\text{partitions of } X\}.$$
>
> - **Forward map $\Phi$ (relation → partition):** Given $\sim$, define $\Phi(\sim) = \{[a] : a \in X\}$.
> - **Backward map $\Psi$ (partition → relation):** Given $\mathcal{P} = \{X_\alpha\}$, define $a \sim_\mathcal{P} b \iff \exists \alpha : a, b \in X_\alpha$.
> These maps are mutually inverse.

**Proof.** We prove this in four major steps.

**Step 1: $\Phi(\sim)$ is a partition.**

This is essentially Theorem 8.1 restated. Let $\sim$ be an equivalence relation.
- *Blocks are non-empty:* By Theorem 8.1(1), each $[a]$ contains $a$, hence $[a] \neq \emptyset$.
- *Cover:* By Theorem 8.1(4), $\bigcup_{a \in X}[a] = X$.
- *Disjointness:* By Theorem 8.1(3), either $[a] = [b]$ or $[a] \cap [b] = \emptyset$. In particular, distinct classes are disjoint.

Thus $\Phi(\sim)$ is a partition of $X$.

**Step 2: $\Psi(\mathcal{P})$ is an equivalence relation.**

Let $\mathcal{P} = \{X_\alpha\}_{\alpha \in A}$ be a partition of $X$. Define $a \sim_\mathcal{P} b \iff \exists \alpha : a, b \in X_\alpha$.

*Reflexivity.* Since $\mathcal{P}$ covers $X$, every $a \in X$ lies in some block $X_\alpha$. Then $a, a \in X_\alpha$, so $a \sim_\mathcal{P} a$. $\checkmark$

*Symmetry.* Suppose $a \sim_\mathcal{P} b$. Then there exists $\alpha$ with $a, b \in X_\alpha$. The statement "$a$ and $b$ are both in $X_\alpha$" is symmetric in $a$ and $b$, so we also have $b, a \in X_\alpha$, hence $b \sim_\mathcal{P} a$. $\checkmark$

*Transitivity.* Suppose $a \sim_\mathcal{P} b$ and $b \sim_\mathcal{P} c$. Then there exist $\alpha, \beta$ with $a, b \in X_\alpha$ and $b, c \in X_\beta$. Now $b \in X_\alpha \cap X_\beta$, so $X_\alpha \cap X_\beta \neq \emptyset$. By the contrapositive of partition condition (2), $X_\alpha = X_\beta$. Therefore $a, c \in X_\alpha$, so $a \sim_\mathcal{P} c$. $\checkmark$

**Step 3: $\Psi(\Phi(\sim)) = \sim$.**

Let $\sim$ be an equivalence relation, $\Phi(\sim) = \{[a] : a \in X\}$, and $\Psi(\Phi(\sim)) = \sim'$.

By definition: $a \sim' b \iff \exists$ class $[c]$ with $a, b \in [c]$.

*Claim:* $a \sim' b \iff a \sim b$.

$(\Rightarrow)$ If $a, b \in [c]$ for some $c$, then $a \sim c$ and $b \sim c$. By symmetry $c \sim b$, and by transitivity $a \sim b$.

$(\Leftarrow)$ If $a \sim b$, then $a \in [b]$ (and $b \in [b]$). So both lie in the class $[b]$, witnessing $a \sim' b$.

Thus $\sim' = \sim$.

**Step 4: $\Phi(\Psi(\mathcal{P})) = \mathcal{P}$.**

Let $\mathcal{P} = \{X_\alpha\}$, $\Psi(\mathcal{P}) = \sim_\mathcal{P}$, and $\Phi(\Psi(\mathcal{P})) = \mathcal{P}' = \{[a]_{\sim_\mathcal{P}} : a \in X\}$.

*Claim:* For any $a \in X$, if $a \in X_\alpha$, then $[a]_{\sim_\mathcal{P}} = X_\alpha$.

$([a]_{\sim_\mathcal{P}} \subseteq X_\alpha)$: Take $x \in [a]_{\sim_\mathcal{P}}$, so $x \sim_\mathcal{P} a$, i.e., $x$ and $a$ lie in a common block. Since $a \in X_\alpha$ and blocks containing $a$ are unique (blocks are disjoint and cover $X$, so each element lies in exactly one block), the common block must be $X_\alpha$. Hence $x \in X_\alpha$.

$(X_\alpha \subseteq [a]_{\sim_\mathcal{P}})$: Take $y \in X_\alpha$. Since $a \in X_\alpha$ as well, $y$ and $a$ both lie in $X_\alpha$, so $y \sim_\mathcal{P} a$, i.e., $y \in [a]_{\sim_\mathcal{P}}$.

Thus every class in $\mathcal{P}'$ equals some block $X_\alpha$ of $\mathcal{P}$, and every block $X_\alpha$ is the class of any of its elements. Hence $\mathcal{P}' = \mathcal{P}$.

**Conclusion.** $\Phi$ and $\Psi$ are mutually inverse bijections. $\blacksquare$

**Why this theorem matters.** It establishes that two apparently different concepts — a relation on $X$ satisfying three properties, and a way of cutting $X$ into disjoint pieces — encode exactly the same information. This "relation ↔ partition" duality pervades algebra:
- **Cosets** (Ch. 9): subgroup $H \leq G$ induces a relation $a \sim b \iff a^{-1}b \in H$; classes are cosets.
- **Normal subgroups** (Ch. 10): a normal subgroup further gives the quotient a group structure.
- **Group actions** (Ch. 15): $G$-orbits partition the set.
- **Conjugacy classes** (Ch. 16): the class equation.
- **Similar matrices**: partition matrices by similarity class; invariants (eigenvalues) label classes.
- **Galois theory**: subfields partition into conjugate classes under a Galois group action.

In each, the strategy is: *find the right relation, then reap the partition.*

---

## 8.5 Modular Arithmetic via Equivalence Classes

Congruence mod $n$ partitions $\mathbb{Z}$ into $n$ classes. Explicitly:
$$[0] = \{\ldots, -2n, -n, 0, n, 2n, \ldots\} = n\mathbb{Z},$$
$$[1] = \{\ldots, 1 - 2n, 1 - n, 1, 1 + n, 1 + 2n, \ldots\} = 1 + n\mathbb{Z},$$
$$\vdots$$
$$[n - 1] = \{\ldots, -1 - n, -1, n - 1, 2n - 1, \ldots\} = (n - 1) + n\mathbb{Z}.$$

**Why exactly $n$ classes?** By the division algorithm, every integer $a$ can be uniquely written as $a = qn + r$ with $0 \leq r < n$. So $a - r = qn$ is divisible by $n$, hence $a \sim r$. Therefore $[a] = [r]$ for some $r \in \{0, 1, \ldots, n - 1\}$. Furthermore, the classes $[0], [1], \ldots, [n - 1]$ are pairwise distinct: if $[r] = [r']$ with $0 \leq r, r' < n$, then $n \mid (r - r')$. Since $|r - r'| < n$, this forces $r - r' = 0$, so $r = r'$. Hence exactly $n$ classes.

The quotient set $\mathbb{Z}/n\mathbb{Z} = \{[0], [1], \ldots, [n - 1]\}$ is the set $\mathbb{Z}_n$.

**Well-definedness of operations.** Addition and multiplication descend to $\mathbb{Z}_n$: if $a \sim a'$ and $b \sim b'$, then $a + b \sim a' + b'$ and $ab \sim a'b'$.

*Proof with explicit algebra.*

Suppose $a \sim a'$ and $b \sim b'$. Then $n \mid (a - a')$ and $n \mid (b - b')$, so there exist integers $i, j$ with $a - a' = ni$ and $b - b' = nj$.

**Addition.** Compute:
$$(a + b) - (a' + b') = (a - a') + (b - b') = ni + nj = n(i + j).$$
Since $i + j \in \mathbb{Z}$, we have $n \mid ((a + b) - (a' + b'))$, i.e., $a + b \sim a' + b'$. $\checkmark$

**Multiplication.** This requires a clever rearrangement:
$$ab - a'b' = ab - a'b + a'b - a'b' = (a - a')b + a'(b - b') = (ni)b + a'(nj) = n(ib + a'j).$$
The insertion-subtraction trick "$- a'b + a'b = 0$" is the standard technique for comparing two products. Since $ib + a'j \in \mathbb{Z}$, we have $n \mid (ab - a'b')$, i.e., $ab \sim a'b'$. $\checkmark$

**Why this matters.** The well-definedness of operations on $\mathbb{Z}_n$ is what makes it a **ring**. We can now define
$$[a] + [b] := [a + b], \quad [a] \cdot [b] := [ab],$$
and these definitions are independent of the choice of representatives $a, b$. This is the *prototype* for why quotient groups $G/N$ (by a normal subgroup $N$) and quotient rings $R/I$ (by an ideal $I$) "make sense": the relevant operations are compatible with the equivalence classes.

**Warning.** Not every binary operation on $\mathbb{Z}$ descends to $\mathbb{Z}_n$. For example, *exponentiation* does not: if $a \equiv a' \pmod n$ and $b \equiv b' \pmod n$, it is not generally true that $a^b \equiv a'^{b'} \pmod n$. For instance, mod $5$: $2 \equiv 7 \pmod 5$ and $3 \equiv 3 \pmod 5$, but $2^3 = 8 \equiv 3$ while $7^3 = 343 \equiv 3 \pmod 5$ (here it does work, so try harder: $1 \equiv 6 \pmod 5$ and $2 \equiv 2 \pmod 5$ but $1^2 = 1$ and $6^2 = 36 \equiv 1$... OK, the issue is subtler). The correct statement uses Euler's theorem: $a^b \equiv a^{b \bmod \varphi(n)} \pmod n$ when $\gcd(a, n) = 1$. The exponent lives in a different quotient.

---

## 8.6 Conjugacy Relation in a Group

> **Definition.** In a group $G$, elements $a, b \in G$ are **conjugate** (written $a \sim b$) if there exists $g \in G$ with $b = gag^{-1}$. The element $g$ is called a **conjugating element**.

**Interpretation.** Conjugation by $g$ is the map $x \mapsto gxg^{-1}$. This is an automorphism of $G$ (an **inner automorphism**). Two elements are conjugate iff some inner automorphism sends one to the other. Heuristically, conjugate elements "play the same role" in $G$ — they have the same order, same cycle structure (in $S_n$), same trace (for matrix groups), etc. These common properties are called **class functions** or **conjugation invariants**.

> **Theorem 8.3.** Conjugacy is an equivalence relation on $G$. The equivalence classes are called **conjugacy classes**.

**Proof.** We verify the three axioms, paying close attention to where each group axiom is used.

*Reflexivity.* For any $a \in G$, take $g = e$ (the identity). Then
$$eae^{-1} = ea \cdot e = a \cdot e = a,$$
using the identity property and $e^{-1} = e$ (Theorem 3.3 of [[03-groups-definition-and-examples]]). So $a \sim a$. $\checkmark$

*Symmetry.* Suppose $a \sim b$, so $b = gag^{-1}$ for some $g \in G$. We solve for $a$. Multiply both sides on the left by $g^{-1}$ and on the right by $g$:
$$g^{-1}bg = g^{-1}(gag^{-1})g = (g^{-1}g)a(g^{-1}g) = e \cdot a \cdot e = a,$$
where we used associativity to regroup. Letting $h = g^{-1}$, we have $h b h^{-1} = g^{-1} b (g^{-1})^{-1} = g^{-1} b g = a$ (using $(g^{-1})^{-1} = g$ from Theorem 3.3 of [[03-groups-definition-and-examples]]). Hence $a = h b h^{-1}$ witnesses $b \sim a$. $\checkmark$

*Transitivity.* Suppose $a \sim b$ and $b \sim c$, so there exist $g, h \in G$ with
$$b = gag^{-1}, \qquad c = hbh^{-1}.$$
Substitute the first into the second:
$$c = h(gag^{-1})h^{-1} = (hg)a(g^{-1}h^{-1}) = (hg)a(hg)^{-1},$$
using associativity and the socks-shoes rule $g^{-1}h^{-1} = (hg)^{-1}$ (Theorem 3.3). Let $k = hg$. Then $c = kak^{-1}$, so $a \sim c$. $\checkmark$ $\blacksquare$

**Axiom-to-property correspondence.**
| Equivalence axiom | Group property used |
|---|---|
| Reflexivity | Identity $e$ |
| Symmetry | Inverses $g^{-1}$ |
| Transitivity | Closure (composition $hg$) |

This correspondence is not a coincidence: it reflects the fact that $G$ acts on itself by conjugation (a group action, see [[15-group-actions]]), and for *any* group action, the orbit relation is an equivalence for exactly these reasons.

**Example 6 ($S_3$ conjugacy classes).** $S_3$ partitions into:
- $\{e\}$ — size 1
- $\{(1\,2), (1\,3), (2\,3)\}$ — size 3 (transpositions)
- $\{(1\,2\,3), (1\,3\,2)\}$ — size 2 (3-cycles)

*Detailed verification.*

We use the fact that conjugate permutations have the same cycle type. Let me verify one conjugation explicitly.

*Check: $(1\,2)$ and $(1\,3)$ are conjugate.* We need $\rho \in S_3$ with $\rho(1\,2)\rho^{-1} = (1\,3)$. Using the rule "conjugating a cycle by $\rho$ replaces each entry $i$ with $\rho(i)$": if $\rho = (2\,3)$, then $\rho(1\,2)\rho^{-1} = (\rho(1)\,\rho(2)) = (1\,3)$. $\checkmark$

*Check: $(1\,2\,3)$ and $(1\,3\,2)$ are conjugate.* Take $\rho = (2\,3)$. Then $\rho(1\,2\,3)\rho^{-1} = (\rho(1)\,\rho(2)\,\rho(3)) = (1\,3\,2)$. $\checkmark$

*Check: $(1\,2)$ and $(1\,2\,3)$ are NOT conjugate.* Different cycle types ($1 + 2$ vs $3$), so not conjugate.

**Class equation sanity check.** Total: $1 + 3 + 2 = 6 = |S_3|$. $\checkmark$

Class sizes divide $|S_3|$: $1 \mid 6$, $3 \mid 6$, $2 \mid 6$. $\checkmark$ This is the **class equation** (see [[16-centralizer-normalizer-stabilizer]]). Each class size is of the form $|G|/|C_G(a)|$ where $C_G(a)$ is the centralizer.

**Remark.** For $S_n$ in general, conjugacy classes are in bijection with partitions of $n$ (integer partitions). The number of conjugacy classes of $S_n$ equals $p(n)$, the partition function. For $n = 3$: $p(3) = 3$, matching our $\{1, 3, 2\}$ counts.

---

## 8.7 Worked Examples

**Example 7 (Classes of fractions).** Define on $\mathbb{Z} \times \mathbb{Z}^*$ (with $\mathbb{Z}^* = \mathbb{Z} \setminus \{0\}$): $(a, b) \sim (c, d) \iff ad = bc$. Show this is an equivalence relation; identify the classes.

*Solution.*

**Setup.** We have a relation on ordered pairs $(a, b)$ where $b \neq 0$. The relation is "cross-multiplication equality" — intended to capture the notion of equal fractions $\frac{a}{b} = \frac{c}{d}$ without yet having the notion of division. The restriction $b, d \in \mathbb{Z}^*$ prevents division by zero.

**Strategy.** Verify each axiom explicitly. Pay attention to transitivity, which requires a cancellation argument in $\mathbb{Z}$ (an integral domain).

**Verification.**

*Reflexive.* For any $(a, b) \in \mathbb{Z} \times \mathbb{Z}^*$, we check $(a, b) \sim (a, b)$: the condition is $ab = ba$, which holds by commutativity of multiplication in $\mathbb{Z}$. $\checkmark$

*Symmetric.* Suppose $(a, b) \sim (c, d)$, i.e., $ad = bc$. We want $(c, d) \sim (a, b)$, i.e., $cb = da$. Swapping sides: $cb = bc = ad = da$, using commutativity and the hypothesis. $\checkmark$

*Transitive.* Suppose $(a, b) \sim (c, d)$ and $(c, d) \sim (e, f)$. By definition,
$$ad = bc \quad \text{and} \quad cf = de.$$
We want to show $(a, b) \sim (e, f)$, i.e., $af = be$.

**Step 1:** Multiply the first equation by $f$:
$$adf = bcf.$$
**Step 2:** Use the second equation $cf = de$ to rewrite the right side:
$$bcf = b(cf) = b(de) = bde.$$
So $adf = bde$, hence
$$d(af) = d(be).$$
**Step 3:** Cancel $d$. Since $d \in \mathbb{Z}^*$, $d \neq 0$, and $\mathbb{Z}$ is an integral domain, we may cancel: $af = be$.

Therefore $(a, b) \sim (e, f)$. $\checkmark$

**Why cancellation works.** The key property is that $\mathbb{Z}$ has *no zero divisors*: $dx = dy$ with $d \neq 0$ implies $x = y$. This is exactly the statement that $\mathbb{Z}$ is an integral domain. If we tried this construction in a ring with zero divisors, transitivity could fail.

**Identification of classes.** The class $[(a, b)]$ consists of all pairs $(c, d)$ with $ad = bc$, i.e., $c/d = a/b$ as fractions. Thus $[(a, b)]$ is exactly the set of representations of the fraction $a/b$.

The quotient set $(\mathbb{Z} \times \mathbb{Z}^*)/{\sim}$ is, by definition, the set $\mathbb{Q}$ of rational numbers! This is actually *the* definition of $\mathbb{Q}$ in rigorous foundations: $\mathbb{Q}$ is a quotient set of pairs of integers modulo cross-multiplication equivalence.

**Interpretation.** We have just built $\mathbb{Q}$ from $\mathbb{Z}$ via an equivalence relation. This is the prototype of the **field of fractions** construction: given any integral domain $R$, one constructs its field of fractions $\text{Frac}(R)$ as $(R \times R^*)/{\sim}$ with the same cross-multiplication relation. $\blacksquare$

**Example 8 (Diagonal of $\mathbb{R}^2$).** Define $(x_1, y_1) \sim (x_2, y_2) \iff x_1 + y_1 = x_2 + y_2$. Describe the classes geometrically.

*Solution.*

**Setup.** The relation compares coordinate sums. Abstractly: $(p, q) \sim (p', q')$ iff $f(p, q) = f(p', q')$, where $f: \mathbb{R}^2 \to \mathbb{R}$, $f(x, y) = x + y$. So this is the "same-fiber" relation for $f$, automatically an equivalence.

**Verification.**

*Reflexive.* $x_1 + y_1 = x_1 + y_1$. $\checkmark$

*Symmetric.* If $x_1 + y_1 = x_2 + y_2$, then trivially $x_2 + y_2 = x_1 + y_1$. $\checkmark$

*Transitive.* If $x_1 + y_1 = x_2 + y_2$ and $x_2 + y_2 = x_3 + y_3$, then $x_1 + y_1 = x_3 + y_3$ by transitivity of equality. $\checkmark$

**Classes geometrically.** The class $[(x, y)]$ is
$$[(x, y)] = \{(X, Y) \in \mathbb{R}^2 : X + Y = x + y\}.$$
Letting $c = x + y$, this is the line $X + Y = c$, i.e., the line with slope $-1$ and $y$-intercept $c$. These are the "anti-diagonal" lines.

**Quotient set.** Each class is labeled by the value $c = x + y \in \mathbb{R}$. Different $c$ values give different classes. So the quotient $\mathbb{R}^2/{\sim}$ is in bijection with $\mathbb{R}$, via the map $[(x, y)] \mapsto x + y$.

**Visual summary.** Imagine $\mathbb{R}^2$ as a plane; the partition consists of a continuous family of parallel lines of slope $-1$. Each line is one class. Quotienting "collapses" each line to a point, yielding a real line $\mathbb{R}$.

**Interpretation.** This is an example of *quotient by a subspace*. The kernel of $f(x,y) = x + y$ is the line $\{(x, -x)\}$, and $\mathbb{R}^2$ modulo this kernel (via $f$) is $\mathbb{R}$. This is the first isomorphism theorem for vector spaces: $\mathbb{R}^2 / \ker(f) \cong \text{image}(f) = \mathbb{R}$. $\blacksquare$

**Example 9 (Same fiber).** Given a function $f : X \to Y$, define $x_1 \sim x_2 \iff f(x_1) = f(x_2)$. Verify equivalence relation; describe classes.

*Solution.*

**Setup.** This is perhaps *the* most important example of an equivalence relation, as it is the universal source: every equivalence relation arises this way.

**Verification.**

*Reflexive.* $f(x) = f(x)$ by reflexivity of equality. $\checkmark$

*Symmetric.* $f(x_1) = f(x_2)$ implies $f(x_2) = f(x_1)$ by symmetry of equality. $\checkmark$

*Transitive.* $f(x_1) = f(x_2)$ and $f(x_2) = f(x_3)$ imply $f(x_1) = f(x_3)$ by transitivity of equality. $\checkmark$

All three axioms are inherited from the equivalence axioms of $=$ on $Y$ via pullback through $f$. This inheritance pattern is very common.

**Classes.** The class of $x$ is
$$[x] = \{x' \in X : f(x') = f(x)\} = f^{-1}(\{f(x)\}) = f^{-1}(f(x)),$$
the **fiber** of $f$ over the point $f(x) \in Y$. So classes are fibers.

**Quotient.** The quotient $X/{\sim}$ is in bijection with the image $f(X) \subseteq Y$ via the map
$$\bar f : X/{\sim} \to f(X), \quad [x] \mapsto f(x).$$
*Well-definedness:* if $[x] = [x']$, then $x \sim x'$, i.e., $f(x) = f(x')$, so the map does not depend on the representative. $\checkmark$

*Injectivity:* if $\bar f([x]) = \bar f([x'])$, then $f(x) = f(x')$, so $x \sim x'$, so $[x] = [x']$. $\checkmark$

*Surjectivity:* any $y \in f(X)$ has the form $y = f(x)$ for some $x \in X$, so $\bar f([x]) = y$. $\checkmark$

**Name.** This result is the *set-theoretic first isomorphism theorem*:
$$X/{\sim} \cong f(X).$$

**Significance.** This factorization decomposes any function $f: X \to Y$ into three canonical pieces:
$$X \xrightarrow{\text{quotient}} X/{\sim} \xrightarrow{\bar f} f(X) \hookrightarrow Y,$$
a surjection, a bijection, and an injection. This is the *epi-iso-mono factorization* of set-functions. It is the prototype for the first isomorphism theorem in groups, rings, modules, and categories: any homomorphism factors through its image via a canonical isomorphism from the quotient by the kernel. $\blacksquare$

**Example 10 (Counting partitions).** How many partitions of a 3-element set $\{a, b, c\}$?

*Solution.*

**Strategy.** Enumerate by the number of blocks. With $|X| = 3$, the number of blocks is between $1$ (everything in one block) and $3$ (every element in its own block).

**Block count 1** (one block of size 3):
- $\{\{a, b, c\}\}$ — just one such partition.

**Block count 2** (two blocks, sizes $1 + 2$):
- $\{\{a\}, \{b, c\}\}$
- $\{\{b\}, \{a, c\}\}$
- $\{\{c\}, \{a, b\}\}$

Counting: we choose which element is the singleton ($3$ choices), and the remaining pair is determined. $\binom{3}{1} = 3$ partitions.

**Block count 3** (three singleton blocks):
- $\{\{a\}, \{b\}, \{c\}\}$ — only one partition (the discrete partition).

**Total.** $1 + 3 + 1 = 5$.

**Verification via Bell number.** The **Bell number** $B_n$ counts the number of partitions of an $n$-element set. Standard values: $B_0 = 1$, $B_1 = 1$, $B_2 = 2$, $B_3 = 5$, $B_4 = 15$, $B_5 = 52$, $B_6 = 203$, etc. Our count $5$ matches $B_3 = 5$. $\checkmark$

**Recursive formula.** Bell numbers satisfy the recurrence
$$B_{n+1} = \sum_{k=0}^n \binom{n}{k} B_k.$$
*Reasoning:* in a partition of $\{1, \ldots, n+1\}$, the block containing element $n+1$ has size $n+1-k$ for some $k \in \{0, 1, \ldots, n\}$ (where $k$ is the number of elements *not* in this block). Choose the $k$ elements in other blocks ($\binom{n}{k}$ ways) and partition them ($B_k$ ways).

For $n = 3$: $B_4 = \binom{3}{0}B_0 + \binom{3}{1}B_1 + \binom{3}{2}B_2 + \binom{3}{3}B_3 = 1 + 3 + 6 + 5 = 15$. $\checkmark$ $\blacksquare$

**Example 11 ($\mathbb{R}/\mathbb{Q}$).** On $\mathbb{R}$, define $a \sim b \iff a - b \in \mathbb{Q}$. Equivalence? Describe classes.

*Solution.*

**Verification.**

*Reflexive.* For any $a \in \mathbb{R}$, $a - a = 0 \in \mathbb{Q}$ (since $0$ is rational). Hence $a \sim a$. $\checkmark$

*Symmetric.* Suppose $a \sim b$, so $a - b \in \mathbb{Q}$. Then $b - a = -(a - b)$. Since $\mathbb{Q}$ is closed under negation (rational numbers form a group under addition), $b - a \in \mathbb{Q}$. Hence $b \sim a$. $\checkmark$

*Transitive.* Suppose $a \sim b$ and $b \sim c$, so $a - b \in \mathbb{Q}$ and $b - c \in \mathbb{Q}$. Then
$$a - c = (a - b) + (b - c) \in \mathbb{Q},$$
using closure of $\mathbb{Q}$ under addition. Hence $a \sim c$. $\checkmark$

**Classes.** The class of $a \in \mathbb{R}$ is
$$[a] = \{b \in \mathbb{R} : b - a \in \mathbb{Q}\} = a + \mathbb{Q} = \{a + q : q \in \mathbb{Q}\}.$$
This is a coset of $\mathbb{Q}$ in the additive group $\mathbb{R}$ (see [[09-cosets-and-lagranges-theorem]]).

**Structure of the quotient.** The quotient set is $\mathbb{R}/\mathbb{Q}$, "reals modulo rationals." Each class is countable (since $\mathbb{Q}$ is countable), and $|\mathbb{R}| = \mathfrak{c}$ (continuum) is uncountable, so the quotient is uncountable (specifically of cardinality $\mathfrak{c}$).

**Application: Vitali sets.** Choose (via the axiom of choice) one representative from each equivalence class. The resulting subset $V \subseteq \mathbb{R}$ is a **Vitali set**. Vitali showed that $V$ cannot be Lebesgue measurable: if $V$ were measurable with measure $\mu(V)$, translating $V$ by rationals gives a countable, pairwise disjoint collection of sets whose union is $\mathbb{R}$, and all have measure $\mu(V)$; by countable additivity, $\sum \mu(V) = \infty$, forcing $\mu(V) > 0$, but then translates of $V$ within $[0, 1]$ give a disjoint family of sets in $[0, 2]$ with total measure $\infty$, contradicting $\mu([0, 2]) = 2$.

This is the first (and simplest) example of a non-measurable set, and it fundamentally uses the axiom of choice. $\blacksquare$

---

## 8.8 Practice Problems

1. On $\mathbb{Z}$, define $a \sim b$ iff $a + b$ is even. Equivalence? How many classes?
2. On $\mathbb{R}^2$, $p \sim q$ iff $\|p\| = \|q\|$. Equivalence? Geometric description of classes?
3. Count the partitions of a 4-element set (find $B_4$).
4. In $S_4$, list the conjugacy classes with their sizes; verify they sum to 24.
5. On $\mathbb{Z}$, $a \sim b$ iff $a b > 0$. Is this an equivalence?
6. Find the number of equivalence relations on $\{1, 2, 3\}$.
7. Show that $\{a \in \mathbb{Z} : a \equiv 3 \pmod 7\}$ is infinite.

### Solutions

**Solution 1.** On $\mathbb{Z}$, $a \sim b \iff a + b$ is even.

*Claim.* This is an equivalence relation with 2 classes: the evens and the odds.

**Preliminary observation.** $a + b$ is even $\iff$ $a$ and $b$ have the same parity (both even or both odd). Proof:
- If $a$ and $b$ are both even, $a = 2k, b = 2\ell$, then $a + b = 2(k + \ell)$ is even.
- If $a$ and $b$ are both odd, $a = 2k + 1, b = 2\ell + 1$, then $a + b = 2(k + \ell + 1)$ is even.
- If one is even and the other odd, $a + b = 2k + (2\ell + 1) = 2(k + \ell) + 1$ is odd.

So $a \sim b \iff a \equiv b \pmod 2$. This is just congruence mod $2$.

**Axiom verification.**

*Reflexive.* $a + a = 2a$ is even for any $a$. $\checkmark$

*Symmetric.* $a + b = b + a$, so if $a + b$ is even, so is $b + a$. $\checkmark$

*Transitive.* Suppose $a + b$ is even and $b + c$ is even. Then $a, b$ have the same parity, and $b, c$ have the same parity. By transitivity of "same parity," $a, c$ have the same parity, so $a + c$ is even. Alternatively, explicitly: $(a + c) = (a + b) + (b + c) - 2b$ is even (sum and difference of evens). $\checkmark$

**Number of classes.** Every integer has parity even or odd, giving two classes:
- $[0] = \{\ldots, -4, -2, 0, 2, 4, \ldots\} = 2\mathbb{Z}$
- $[1] = \{\ldots, -3, -1, 1, 3, \ldots\} = 1 + 2\mathbb{Z}$

Total: **2 classes**. $\blacksquare$

---

**Solution 2.** On $\mathbb{R}^2$, $p \sim q \iff \|p\| = \|q\|$.

*Claim.* Equivalence relation. Classes are concentric circles (plus the origin).

**Setup.** $\|p\|$ denotes the Euclidean norm, $\|(x, y)\| = \sqrt{x^2 + y^2}$. This is a function $\mathbb{R}^2 \to [0, \infty)$. The relation "same value under $\| \cdot \|$" is a same-fiber relation for the norm map.

**Axiom verification.** By Example 9 (same-fiber relation), automatically an equivalence. Let's verify directly to solidify technique.

*Reflexive.* $\|p\| = \|p\|$. $\checkmark$

*Symmetric.* $\|p\| = \|q\|$ implies $\|q\| = \|p\|$. $\checkmark$

*Transitive.* $\|p\| = \|q\|$ and $\|q\| = \|r\|$ imply $\|p\| = \|r\|$. $\checkmark$

**Geometric description of classes.** Fix $p \in \mathbb{R}^2$ with $\|p\| = r \geq 0$. The class of $p$ is
$$[p] = \{q \in \mathbb{R}^2 : \|q\| = r\} = \{(x, y) : x^2 + y^2 = r^2\}.$$

- If $r = 0$: the only point with norm $0$ is the origin, so $[p] = \{(0, 0)\}$ is a single point.
- If $r > 0$: $[p]$ is the circle of radius $r$ centered at the origin.

**Quotient set.** Classes are parametrized by $r \in [0, \infty)$, so $\mathbb{R}^2/{\sim}$ is in bijection with $[0, \infty)$ via $[p] \mapsto \|p\|$.

**Picture.** $\mathbb{R}^2$ foliates into concentric circles, with the origin as a degenerate "circle of radius zero." Quotienting collapses each circle to a point, yielding the non-negative reals.

**Remark.** This is the *radial coordinate* of polar coordinates $(r, \theta)$: the relation forgets $\theta$ and remembers only $r$. It is the quotient of $\mathbb{R}^2$ by the rotation group $SO(2)$, an early example of an orbit space (see [[15-group-actions]]). $\blacksquare$

---

**Solution 3.** Count partitions of $\{1, 2, 3, 4\}$, i.e., find $B_4$.

*Strategy.* Enumerate by cycle type (= block-size partition).

**Step 1: Enumerate partitions of the integer 4.** These are:
- $4$ (one block of size 4)
- $3 + 1$
- $2 + 2$
- $2 + 1 + 1$
- $1 + 1 + 1 + 1$

**Step 2: Count set-partitions for each integer partition.**

*Type $4$* (one block $\{1, 2, 3, 4\}$): **1 partition.**

*Type $3 + 1$* (a 3-block and a 1-block):
- Choose the singleton: $\binom{4}{1} = 4$ ways.
- The other three elements form the 3-block (determined).
- Total: **4 partitions.**

*Type $2 + 2$* (two blocks of size 2):
- Choose the 2 elements in the first block: $\binom{4}{2} = 6$ ways.
- The other two form the second block automatically.
- But each partition is counted twice (swapping the two blocks), so divide by $2!$: $6/2 = 3$ partitions.
- Explicitly: $\{\{1,2\},\{3,4\}\}, \{\{1,3\},\{2,4\}\}, \{\{1,4\},\{2,3\}\}$. **3 partitions.**

*Type $2 + 1 + 1$* (a pair and two singletons):
- Choose the pair: $\binom{4}{2} = 6$ ways.
- The other two are singletons (the "block of singletons" is unordered, so no further multinomial).
- **6 partitions.**

*Type $1 + 1 + 1 + 1$* (all singletons): **1 partition** (the discrete).

**Step 3: Sum.**
$$B_4 = 1 + 4 + 3 + 6 + 1 = 15.$$

**Cross-check via recurrence.** $B_4 = \binom{3}{0}B_0 + \binom{3}{1}B_1 + \binom{3}{2}B_2 + \binom{3}{3}B_3 = 1 \cdot 1 + 3 \cdot 1 + 3 \cdot 2 + 1 \cdot 5 = 1 + 3 + 6 + 5 = 15$. $\checkmark$

**Stirling numbers perspective.** The Stirling numbers of the second kind $S(n, k)$ count partitions of $n$ into $k$ (non-empty, unordered) blocks. We have $S(4, 1) = 1, S(4, 2) = 7, S(4, 3) = 6, S(4, 4) = 1$. So $B_4 = \sum_{k=1}^4 S(4, k) = 1 + 7 + 6 + 1 = 15$. $\checkmark$

*Where does $S(4, 2) = 7$ come from?* Partitions of $\{1,2,3,4\}$ into 2 blocks = partitions of type $3+1$ or $2+2$ = $4 + 3 = 7$. Matches our count. $\checkmark$

$\boxed{B_4 = 15.}$ $\blacksquare$

---

**Solution 4.** Conjugacy classes of $S_4$.

*Claim.* There are $5$ conjugacy classes, one for each cycle type = partition of $4$. Sizes: $1, 6, 3, 8, 6$.

**Theoretical basis.** In $S_n$, two permutations are conjugate iff they have the same cycle type (by Corollary 5.6 of [[05-permutation-and-dihedral-groups]]). So conjugacy classes biject with partitions of $n$.

**Counting each class.** For a cycle type $1^{a_1} 2^{a_2} \cdots n^{a_n}$ (where $a_k$ is the number of $k$-cycles), the number of permutations with this cycle type is
$$\frac{n!}{\prod_k k^{a_k} a_k!}.$$
This is a classical formula: we choose which elements go into which cycles (giving $n!$), but each $k$-cycle can be written $k$ ways ($k^{a_k}$), and the $a_k$ cycles of length $k$ can be permuted among themselves ($a_k!$).

Let me verify each cycle type for $n = 4$.

*Type $1^4$ (all fixed points, i.e., identity):* $a_1 = 4$. Count: $\frac{4!}{1^4 \cdot 4!} = \frac{24}{24} = 1$. Class: $\{e\}$. **Size 1.**

*Type $2\,1^2$ (one 2-cycle, two 1-cycles, i.e., transpositions):* $a_1 = 2, a_2 = 1$. Count: $\frac{4!}{1^2 \cdot 2! \cdot 2^1 \cdot 1!} = \frac{24}{2 \cdot 2} = 6$. Alternatively, transpositions = pairs $\{i, j\}$: $\binom{4}{2} = 6$. **Size 6.**

Explicitly: $(1\,2), (1\,3), (1\,4), (2\,3), (2\,4), (3\,4)$.

*Type $2^2$ (two disjoint 2-cycles):* $a_2 = 2$. Count: $\frac{4!}{2^2 \cdot 2!} = \frac{24}{4 \cdot 2} = 3$. **Size 3.**

Explicitly: $(1\,2)(3\,4), (1\,3)(2\,4), (1\,4)(2\,3)$.

*Type $3\,1$ (one 3-cycle, one fixed point):* $a_1 = 1, a_3 = 1$. Count: $\frac{4!}{1 \cdot 1! \cdot 3 \cdot 1!} = \frac{24}{3} = 8$. Alternatively: choose 3 elements for the cycle ($\binom{4}{3} = 4$), arrange them as a cycle ($(3-1)! = 2$ orientations), total $4 \cdot 2 = 8$. **Size 8.**

Explicitly: $(1\,2\,3), (1\,3\,2), (1\,2\,4), (1\,4\,2), (1\,3\,4), (1\,4\,3), (2\,3\,4), (2\,4\,3)$.

*Type $4$ (one 4-cycle):* $a_4 = 1$. Count: $\frac{4!}{4 \cdot 1!} = \frac{24}{4} = 6$. Alternatively: $n!/n = (n-1)! = 3! = 6$ ways to arrange $n$ elements in a cyclic order. **Size 6.**

Explicitly: $(1\,2\,3\,4), (1\,2\,4\,3), (1\,3\,2\,4), (1\,3\,4\,2), (1\,4\,2\,3), (1\,4\,3\,2)$.

**Summary table.**

| Cycle type | Class | Size | Parity |
|---|---|---|---|
| $1^4$ | $\{e\}$ | 1 | even |
| $2\,1^2$ | transpositions | 6 | odd |
| $2^2$ | double transpositions | 3 | even |
| $3\,1$ | 3-cycles | 8 | even |
| $4$ | 4-cycles | 6 | odd |

**Verification.**
$$1 + 6 + 3 + 8 + 6 = 24 = 4! = |S_4|. \checkmark$$

**Additional check: sum of even-parity classes.** Even cycle type = cycles of odd length only (or cycle type with an even number of even-length cycles). Here: $1^4, 2^2, 3\,1$ have sizes $1, 3, 8$, summing to $12 = |A_4|$. $\checkmark$

**Class sizes divide $|G| = 24$.** $1 \mid 24, 6 \mid 24, 3 \mid 24, 8 \mid 24, 6 \mid 24$. $\checkmark$ (Orbit-stabilizer theorem.)

$\blacksquare$

---

**Solution 5.** On $\mathbb{Z}$, $a \sim b \iff ab > 0$.

*Claim.* This is **not** an equivalence relation.

**Reflexivity check.** For $a \sim a$ to hold, we need $a \cdot a = a^2 > 0$. But $a^2 = 0$ when $a = 0$, so $0 \not\sim 0$. **Reflexivity fails at $a = 0$.**

Therefore $\sim$ is not an equivalence relation.

**Secondary checks** (for understanding, even though reflexivity already kills it).

*Symmetry.* $ab = ba$, so $ab > 0 \iff ba > 0$. Symmetric. $\checkmark$

*Transitivity.* Suppose $ab > 0$ and $bc > 0$. Since $b \neq 0$ (else $ab = 0$), $b$ has a fixed sign. From $ab > 0$: $a$ has the same sign as $b$. From $bc > 0$: $c$ has the same sign as $b$. So $a$ and $c$ have the same sign, both nonzero, so $ac > 0$. Transitive. $\checkmark$ (Subject to $b \neq 0$, which the hypothesis guarantees.)

**Fixing the relation.** If we restrict to $\mathbb{Z}^* = \mathbb{Z} \setminus \{0\}$, then $a^2 > 0$ for all $a \in \mathbb{Z}^*$, and $\sim$ becomes "same sign," which *is* an equivalence relation with two classes ($\mathbb{Z}_{>0}$ and $\mathbb{Z}_{<0}$).

**Takeaway.** Reflexivity is the most commonly violated axiom when one attempts to define equivalences via inequalities or products. Always check reflexivity by plugging in boundary cases (especially $0$). $\blacksquare$

---

**Solution 6.** Number of equivalence relations on $\{1, 2, 3\}$.

*Claim.* There are $5$ equivalence relations, matching $B_3 = 5$.

**Justification.** By Theorem 8.2 (relation-partition bijection), the number of equivalence relations on a set $X$ equals the number of partitions of $X$. For $X = \{1, 2, 3\}$, Example 10 gives $B_3 = 5$ partitions. Hence $5$ equivalence relations.

**Explicit listing.** For completeness, here are the 5 partitions paired with their relations (I write $a \sim b$ only for $a \neq b$, since $a \sim a$ always):

1. **Partition $\{\{1\},\{2\},\{3\}\}$** — the discrete: relation is equality, $a \sim b \iff a = b$. No off-diagonal pairs.

2. **Partition $\{\{1,2\},\{3\}\}$**: $1 \sim 2$ (and $2 \sim 1$), nothing else off-diagonal.

3. **Partition $\{\{1,3\},\{2\}\}$**: $1 \sim 3$ and $3 \sim 1$.

4. **Partition $\{\{2,3\},\{1\}\}$**: $2 \sim 3$ and $3 \sim 2$.

5. **Partition $\{\{1,2,3\}\}$** — the trivial: $a \sim b$ for all $a, b$. All pairs.

**Sanity check.** Each partition uniquely determines an equivalence relation and vice versa (Theorem 8.2). Count matches.

**Alternative counting** (as sanity). An equivalence relation on $\{1, 2, 3\}$ is a symmetric reflexive transitive subset of $\{1,2,3\} \times \{1,2,3\}$ (a $9$-element set). Reflexivity forces $(1,1), (2,2), (3,3)$ in. So we're choosing extra off-diagonal pairs, symmetrically. The possible "off-diagonal chunks":
- None.
- $\{(1,2), (2,1)\}$ (with $1 \sim 2$).
- $\{(1,3), (3,1)\}$.
- $\{(2,3), (3,2)\}$.
- All six off-diagonal pairs (transitive closure needed, check).

Five cases — but we must check each is transitive. First four trivially. Last: all pairs $\Rightarrow$ transitive. $\checkmark$ Five total. $\checkmark$

$\boxed{5 \text{ equivalence relations.}}$ $\blacksquare$

---

**Solution 7.** Show that $\{a \in \mathbb{Z} : a \equiv 3 \pmod 7\}$ is infinite.

*Claim.* The given set equals $[3] = 3 + 7\mathbb{Z} = \{\ldots, -11, -4, 3, 10, 17, \ldots\}$, which is infinite.

**Step 1: Identify the set.** By definition, $a \equiv 3 \pmod 7$ means $7 \mid (a - 3)$, i.e., $a - 3 = 7k$ for some $k \in \mathbb{Z}$, i.e., $a = 3 + 7k$. So
$$[3] = \{3 + 7k : k \in \mathbb{Z}\}.$$

**Step 2: Show infinite.** Define a map $f : \mathbb{Z} \to [3]$ by $f(k) = 3 + 7k$.

*Injectivity.* Suppose $f(k) = f(\ell)$, so $3 + 7k = 3 + 7\ell$. Subtract $3$ and divide by $7$: $k = \ell$. So $f$ is injective.

*Surjectivity.* Any element of $[3]$ has the form $3 + 7k$ by Step 1, so $f$ is surjective.

Hence $f : \mathbb{Z} \to [3]$ is a bijection. Since $\mathbb{Z}$ is infinite (countably infinite), so is $[3]$.

**Step 3: Explicit enumeration** (to ground the argument).

- $k = 0 \Rightarrow a = 3$.
- $k = 1 \Rightarrow a = 10$.
- $k = 2 \Rightarrow a = 17$.
- $k = -1 \Rightarrow a = -4$.
- $k = -2 \Rightarrow a = -11$.
- $\ldots$

An unbounded sequence of distinct integers. $\checkmark$

**Generalization.** For any $n \geq 1$ and any $r \in \mathbb{Z}$, the class $[r] = r + n\mathbb{Z}$ is countably infinite. The quotient $\mathbb{Z}/n\mathbb{Z}$ has exactly $n$ classes (by the division algorithm, Section 8.5), each of which is itself an infinite set. So we have: $n$ infinite classes tiling an infinite set. $\blacksquare$

---

## 8.9 Cross-References

**Previous:** [[07-co1-practice-problems]]

**Next:**
- [[09-cosets-and-lagranges-theorem]] — cosets define a very important equivalence relation on $G$
- [[15-group-actions]] — orbits are equivalence classes of "same orbit under the group"
- [[16-centralizer-normalizer-stabilizer]] — conjugacy classes and the class equation

**Takeaway.** Every equivalence relation corresponds to a partition, and vice versa. In group theory, we'll pick up more special relations (congruence mod a subgroup, conjugacy, orbit-equivalence), and each gives a quotient structure. Mastering the abstract theory once here saves time later.

**Looking ahead: why this is a pivot chapter.** The next few chapters all use the equivalence-partition mechanism:
- Chapter 9: subgroup $H \leq G$ gives left cosets $aH$ = classes of $a \sim b \iff a^{-1}b \in H$. $G/H$ = quotient set.
- Chapter 10: if $H$ is *normal*, $G/H$ becomes a group.
- Chapter 11: kernels of homomorphisms are normal subgroups; images are quotients.
- Chapter 15: group $G$ acting on $X$ gives orbits = classes of $x \sim y \iff \exists g: y = gx$. Orbit space = quotient.
- Chapter 16: conjugacy classes, centralizers, class equation.

In each, the pattern is identical: *find the relation, identify the classes, assemble the quotient*. Master the pattern once, and all instances become routine.
