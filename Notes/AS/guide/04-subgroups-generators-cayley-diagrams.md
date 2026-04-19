# 4. Subgroups, Generators, and Cayley Diagrams

> **Where we are.** We have defined groups. To understand a group, the single most important tool is to look at its **subgroups** — subsets that are themselves groups. A subgroup "inside" $G$ is like a subspace inside a vector space: it inherits structure while being simpler. The full list of subgroups of $G$ is called the **subgroup lattice**, and it often fully determines the group up to isomorphism.
>
> This chapter gives the three standard subgroup tests (two-step, one-step, finite), catalogs concrete examples, defines the subgroup **generated** by a subset, introduces **presentations** by generators and relations, and visualizes groups via **Cayley diagrams**.

---

## 4.1 Subgroups

> **Definition (Subgroup).** A **subgroup** of a group $G$ is a non-empty subset $H \subseteq G$ that is itself a group under the operation inherited from $G$. We write $H \leq G$ (and $H < G$ if $H$ is a *proper* subgroup, $H \neq G$).

**Immediate remarks.**

1. *The identity of $H$ equals the identity of $G$.* If $e_H$ is an identity for $(H, *)$, then $e_H * e_H = e_H$. Regarded as an equation in $G$, left-cancel by $e_H^{-1}$ (which exists in $G$) to get $e_H = e_G$. So there is only one identity floating around.

2. *The inverse of $a \in H$ computed in $H$ equals the inverse computed in $G$.* By the same argument, if $a'$ is an inverse of $a$ in $H$, then $a a' = e_H = e_G$, so $a' = a^{-1}$ by uniqueness of inverses in $G$ (Theorem 3.1).

3. *Every group $G$ has two "trivial" subgroups:* $\{e\} \leq G$ (the **trivial subgroup**) and $G \leq G$ (the **improper subgroup**). All other subgroups are **proper nontrivial** subgroups.

### The subgroup test

Checking all four group axioms for a candidate subset is wasteful: closure plus inherited associativity plus inverses already force the identity and make the structure a group. The next three theorems are the standard shortcuts.

> **Theorem 4.1 (Two-step subgroup test).** A non-empty subset $H \subseteq G$ is a subgroup of $G$ if and only if:
> 1. **(Closure)** $a, b \in H \;\Longrightarrow\; ab \in H$.
> 2. **(Inverses)** $a \in H \;\Longrightarrow\; a^{-1} \in H$.

**Proof.**

*($\Rightarrow$) If $H \leq G$, then (1) and (2) hold.* By definition of subgroup, $H$ is itself a group under the inherited operation. Closure is part of that definition. For inverses: each $a \in H$ has an inverse $a' \in H$ (because $H$ is a group), and by Remark 2 above, $a' = a^{-1}$. Both conditions hold.

*($\Leftarrow$) If $H$ is non-empty and (1), (2) hold, then $H \leq G$.* We verify each group axiom for $(H, *)$.

- **Closure.** Condition (1) is exactly closure.
- **Associativity.** For $a, b, c \in H$: regarded as elements of $G$, we have $(ab)c = a(bc)$ (associativity in $G$). Since the operation on $H$ is the *same* as the operation on $G$, the identity holds in $H$ too.
- **Identity.** $H$ is non-empty, so pick any $a \in H$. By (2), $a^{-1} \in H$. By (1), $a a^{-1} \in H$. But $a a^{-1} = e$ (computed in $G$), so $e \in H$. It remains to check $e$ acts as an identity in $H$: for $b \in H \subseteq G$, $eb = b = be$ (identity property in $G$, inherited).
- **Inverses.** Condition (2) gives, for each $a \in H$, an element $a^{-1} \in H$ with $a a^{-1} = a^{-1} a = e$ (verified in $G$).

All four axioms satisfied, so $H \leq G$. $\blacksquare$

**Remark (why non-emptiness matters).** Without requiring $H \neq \emptyset$, the empty set $\emptyset$ vacuously satisfies (1) and (2), but $\emptyset$ cannot be a group (a group must contain an identity). The non-emptiness hypothesis is what lets us pick an element and derive $e \in H$.

---

> **Theorem 4.2 (One-step subgroup test).** A non-empty subset $H \subseteq G$ is a subgroup of $G$ if and only if
> $$\forall a, b \in H : ab^{-1} \in H.$$

**Proof.**

*($\Rightarrow$)* Suppose $H \leq G$. Given $a, b \in H$: by Theorem 4.1 part (2), $b^{-1} \in H$, and by Theorem 4.1 part (1), $a b^{-1} \in H$.

*($\Leftarrow$)* Suppose $H$ is non-empty and $ab^{-1} \in H$ for all $a, b \in H$. We derive closure and inverses (Theorem 4.1's hypotheses).

**Step 1: $e \in H$.** $H$ is non-empty, so pick $a \in H$. Take $b = a$ in the hypothesis:
$$a a^{-1} \in H \;\Longrightarrow\; e \in H. \checkmark$$

**Step 2: Inverses.** For any $b \in H$, take $a = e$ (which is in $H$ by Step 1) in the hypothesis:
$$e \cdot b^{-1} = b^{-1} \in H. \checkmark$$

**Step 3: Closure.** For $a, b \in H$: by Step 2, $b^{-1} \in H$. Apply the hypothesis to the pair $(a, b^{-1})$:
$$a \cdot (b^{-1})^{-1} = ab \in H$$
(using $(b^{-1})^{-1} = b$ from Theorem 3.3). $\checkmark$

By Theorem 4.1, $H \leq G$. $\blacksquare$

**Remark (why one step suffices).** The condition $ab^{-1} \in H$ packages "multiply" and "invert" into a single check. It is the preferred tool in practice: for $(\mathbb{R}, +)$, for instance, we check $a - b \in H$ rather than separately verifying $a + b \in H$ and $-a \in H$.

---

> **Theorem 4.3 (Finite subgroup test).** If $G$ is a **finite** group and $H \subseteq G$ is non-empty and closed under the operation of $G$, then $H \leq G$.

**Proof.** By Theorem 4.1, we only need to verify inverses (closure is given, associativity is inherited, and the identity follows once inverses are established).

Fix $a \in H$.

**Step 1: The sequence $a, a^2, a^3, \ldots$ lies in $H$.** By closure (applied inductively), $a^n \in H$ for every $n \geq 1$.

**Step 2: The sequence is not all distinct.** $H \subseteq G$ is a subset of a *finite* set, so the sequence $a, a^2, a^3, \ldots$ — infinitely many terms drawn from a finite set — must repeat. By the pigeonhole principle, there exist $i, j$ with $1 \leq i < j$ and $a^i = a^j$.

**Step 3: Extract a relation $a^k = e$.** Rewrite $a^i = a^j$ in $G$:
$$a^j = a^i \;\Longrightarrow\; a^j a^{-i} = e \;\Longrightarrow\; a^{j - i} = e.$$
Let $k = j - i \geq 1$.

**Step 4: Exhibit $a^{-1}$ in $H$.**

*Case (i): $k = 1$.* Then $a^1 = e$, i.e., $a = e$. So $a^{-1} = e = a \in H$.

*Case (ii): $k \geq 2$.* Then
$$a \cdot a^{k - 1} = a^k = e,$$
and by uniqueness of inverses, $a^{-1} = a^{k-1}$. Since $k - 1 \geq 1$, the power $a^{k-1}$ lies in $H$ by closure (Step 1). So $a^{-1} \in H$.

In either case $a^{-1} \in H$. Since $a \in H$ was arbitrary, all inverses lie in $H$, and $H \leq G$ by Theorem 4.1. $\blacksquare$

**Remark (why finiteness is essential).** On an infinite group, closure alone does *not* force a subgroup. Counterexample: in $(\mathbb{Z}, +)$ the set $\mathbb{N} = \{0, 1, 2, \ldots\}$ is non-empty and closed under addition, but $-1$ is not in $\mathbb{N}$, so $\mathbb{N}$ is not a subgroup. The finite pigeonhole argument cannot be run here: the sequence $1, 2, 3, \ldots$ in $\mathbb{N}$ has no repetitions.

**Remark (connection to order).** The integer $k$ produced in Step 3 is an upper bound on the order of $a$. The minimal such $k$ is $|a|$, the order of the element; see [[06-cyclic-groups-and-order]].

---

## 4.2 Examples of Subgroups

**Example 1 (Nesting number systems).** $(\mathbb{Z}, +) \leq (\mathbb{Q}, +) \leq (\mathbb{R}, +) \leq (\mathbb{C}, +)$.

*Verification.* Each inclusion is a subset. We apply Theorem 4.2 to $\mathbb{Z} \subseteq \mathbb{Q}$: $\mathbb{Z}$ is non-empty ($0 \in \mathbb{Z}$), and for $a, b \in \mathbb{Z}$, $a - b \in \mathbb{Z}$. So $\mathbb{Z} \leq \mathbb{Q}$. The other two inclusions are analogous.

---

**Example 2 (All subgroups of $\mathbb{Z}$).** For each $n \geq 0$,
$$n\mathbb{Z} = \{nk : k \in \mathbb{Z}\} \leq (\mathbb{Z}, +).$$

*Verification via Theorem 4.2.* $0 = n \cdot 0 \in n\mathbb{Z}$, so non-empty. For $a = nk, b = n\ell \in n\mathbb{Z}$:
$$a - b = nk - n\ell = n(k - \ell) \in n\mathbb{Z}. \checkmark$$

**Remarkable converse.** These are *all* the subgroups of $(\mathbb{Z}, +)$ — no others exist. This is **Example 13** below, proved via the division algorithm.

*Special cases.* $0\mathbb{Z} = \{0\}$ (trivial); $1 \mathbb{Z} = \mathbb{Z}$ (improper); $2\mathbb{Z}$ = even integers; etc.

---

**Example 3 (Subgroups of $D_4$).** In the dihedral group $D_4 = \{1, r, r^2, r^3, s, sr, sr^2, sr^3\}$ (symmetries of a square), natural subgroups include:
- $\{1, r^2\}$ — the center (rotation by $\pi$).
- $\{1, r, r^2, r^3\} = \langle r\rangle$ — the rotation subgroup (cyclic of order $4$).
- $\{1, s\}$, $\{1, sr\}$, $\{1, sr^2\}$, $\{1, sr^3\}$ — four reflection subgroups (each of order $2$).
- $\{1, r^2, s, sr^2\}$, $\{1, r^2, sr, sr^3\}$ — two Klein-four subgroups.

The full lattice has $10$ subgroups. See [[12-subgroup-lattice-and-dihedral]].

---

**Example 4 (Special linear group).** $SL_n(\mathbb{R}) = \{A \in GL_n(\mathbb{R}) : \det A = 1\} \leq GL_n(\mathbb{R})$.

*Verification via Theorem 4.2.* $I_n \in SL_n(\mathbb{R})$ (non-empty). For $A, B \in SL_n(\mathbb{R})$:
$$\det(AB^{-1}) = \det A \cdot \det(B^{-1}) = 1 \cdot \frac{1}{\det B} = 1 \cdot \frac{1}{1} = 1. \checkmark$$

So $AB^{-1} \in SL_n(\mathbb{R})$, hence $SL_n(\mathbb{R}) \leq GL_n(\mathbb{R})$. Structurally, $SL_n$ is the kernel of the determinant homomorphism $\det: GL_n \to \mathbb{R}^\times$ (see [[17-homomorphisms-and-isomorphisms]]).

---

**Example 5 (Alternating group).** $A_n \leq S_n$: the set of *even* permutations.

*Verification via Theorem 4.2.* $e = $ identity permutation is even (product of zero transpositions), so $e \in A_n$. For $\sigma, \tau \in A_n$: $\operatorname{sgn}(\sigma \tau^{-1}) = \operatorname{sgn}(\sigma) \cdot \operatorname{sgn}(\tau^{-1}) = \operatorname{sgn}(\sigma) \cdot \operatorname{sgn}(\tau) = (+1)(+1) = +1$, so $\sigma \tau^{-1} \in A_n$.

$A_n$ is the kernel of the sign homomorphism $\operatorname{sgn}: S_n \to \{\pm 1\}$. See [[05-permutation-and-dihedral-groups]].

---

**Example 6 (The center is a subgroup).** The **center** of $G$ is
$$Z(G) = \{a \in G : ag = ga \text{ for all } g \in G\}.$$
Claim: $Z(G) \leq G$.

*Proof via Theorem 4.1.*

**Step 1: Non-empty.** The identity commutes with everything: $eg = g = ge$ for all $g \in G$. So $e \in Z(G)$.

**Step 2: Closure.** Let $a, b \in Z(G)$ and let $g \in G$ be arbitrary. We must show $(ab)g = g(ab)$. Compute:
$$(ab)g = a(bg) \quad \text{(associativity)}$$
$$\phantom{(ab)g} = a(gb) \quad \text{(since } b \in Z(G): bg = gb)$$
$$\phantom{(ab)g} = (ag)b \quad \text{(associativity)}$$
$$\phantom{(ab)g} = (ga)b \quad \text{(since } a \in Z(G): ag = ga)$$
$$\phantom{(ab)g} = g(ab) \quad \text{(associativity)}.$$
So $ab \in Z(G)$.

**Step 3: Inverses.** Let $a \in Z(G)$, so $ag = ga$ for all $g \in G$. We want $a^{-1} g = g a^{-1}$ for all $g$.

Start from $ag = ga$. Multiply on the left by $a^{-1}$:
$$a^{-1}(ag) = a^{-1}(ga) \;\Longrightarrow\; (a^{-1} a) g = a^{-1} g a \;\Longrightarrow\; g = a^{-1} g a.$$
Now multiply on the right by $a^{-1}$:
$$g a^{-1} = (a^{-1} g a) a^{-1} = a^{-1} g (a a^{-1}) = a^{-1} g \cdot e = a^{-1} g.$$
So $g a^{-1} = a^{-1} g$, i.e., $a^{-1} \in Z(G)$.

By Theorem 4.1, $Z(G) \leq G$. $\blacksquare$

**Remark (verifying with Theorem 4.2 directly).** A slicker packaging: for $a, b \in Z(G)$ and $g \in G$,
$$(a b^{-1}) g = a (b^{-1} g) = a (g b^{-1}) \quad (\text{since } b \in Z(G) \Rightarrow b^{-1} \in Z(G), \text{ as shown})$$
$$\phantom{(a b^{-1}) g} = (ag) b^{-1} = (ga) b^{-1} = g(a b^{-1}).$$
So $a b^{-1} \in Z(G)$, and Theorem 4.2 gives $Z(G) \leq G$.

**Remark (when is the center large?).** If $G$ is abelian, $Z(G) = G$. If $G = S_n$ for $n \geq 3$, $Z(G) = \{e\}$. For non-abelian $G$ of order $p^n$ (a $p$-group), the center is always non-trivial — a key fact for Sylow theory. Covered in [[16-centralizer-normalizer-stabilizer]].

---

**Example 7 (Non-example: odd integers).** $H = \{\ldots, -3, -1, 1, 3, \ldots\}$, the odd integers, is **not** a subgroup of $(\mathbb{Z}, +)$.

*Why not, two ways.*

1. *Identity fails.* $0 \notin H$ (zero is even). Any subgroup must contain the identity.

2. *Closure fails.* $1 \in H$ and $1 \in H$, but $1 + 1 = 2 \notin H$.

Either failure is sufficient.

---

## 4.3 Generated Subgroups

> **Definition (Subgroup generated by a set).** Let $S \subseteq G$. The **subgroup generated by $S$**, written $\langle S \rangle$, is the smallest subgroup of $G$ containing $S$ — meaning: $\langle S \rangle$ is a subgroup containing $S$, and if $H \leq G$ contains $S$, then $\langle S \rangle \subseteq H$.

Two concrete descriptions:

*(Internal description.)* $\langle S \rangle$ is the set of all finite products
$$s_1^{\varepsilon_1} s_2^{\varepsilon_2} \cdots s_k^{\varepsilon_k}, \qquad s_i \in S, \; \varepsilon_i \in \{\pm 1\}, \; k \geq 0.$$
The $k = 0$ case (the empty product) is the identity $e$.

*(External description.)* $\langle S \rangle = \bigcap \{H \leq G : S \subseteq H\}$ — the intersection of all subgroups containing $S$. Equivalence with the internal description is Corollary 4.5 below.

**Special cases.**
- $\langle \emptyset \rangle = \{e\}$ (only the empty product).
- $\langle a \rangle = \{a^n : n \in \mathbb{Z}\}$ — the **cyclic subgroup** generated by $a$. See [[06-cyclic-groups-and-order]].
- $\langle a, b \rangle$ = set of all "words" in $a, b, a^{-1}, b^{-1}$: e.g., $e, a, b^{-1}a^2 b, aba^{-1}b^{-1}$, etc.

> **Theorem 4.4 (Intersection of subgroups is a subgroup).** Let $\{H_i\}_{i \in I}$ be a (possibly infinite) collection of subgroups of $G$. Then $H = \bigcap_{i \in I} H_i$ is a subgroup of $G$.

**Proof.** We verify the hypotheses of Theorem 4.2.

**Step 1: $H$ is non-empty.** For each $i \in I$, $e \in H_i$ (every subgroup contains $e$). Hence $e \in \bigcap_i H_i = H$. So $H \neq \emptyset$.

**Step 2: $H$ is closed under $(a, b) \mapsto ab^{-1}$.** Let $a, b \in H = \bigcap_i H_i$. For every index $i \in I$: $a, b \in H_i$, and since $H_i \leq G$, Theorem 4.2 (applied to $H_i$) gives $ab^{-1} \in H_i$. As this holds for every $i$, $ab^{-1} \in \bigcap_i H_i = H$.

By Theorem 4.2, $H \leq G$. $\blacksquare$

**Remark (union vs. intersection).** The intersection is always a subgroup; the *union* almost never is. See the "Union of subgroups" paragraph below and Practice Problem 5.

---

> **Corollary 4.5 (Generated subgroup as intersection).** For any $S \subseteq G$,
> $$\langle S \rangle = \bigcap \{H \leq G : S \subseteq H\}.$$

**Proof.** Let $K = \bigcap \{H \leq G : S \subseteq H\}$.

**Step 1: $K$ is a subgroup containing $S$.** By Theorem 4.4, $K$ is a subgroup (it is an intersection of subgroups). Every $H$ in the intersection contains $S$, so $K \supseteq S$.

**Step 2: $K$ is the *smallest* such subgroup.** Suppose $H_0 \leq G$ contains $S$. Then $H_0$ is one of the sets being intersected, so $K \subseteq H_0$.

**Step 3: Conclude.** By Steps 1 and 2, $K$ is a subgroup containing $S$ and contained in every subgroup containing $S$. By definition, this is $\langle S \rangle$. $\blacksquare$

**Remark (why the intersection is non-empty).** The collection $\{H \leq G : S \subseteq H\}$ is non-empty because $G$ itself belongs to it. So the intersection is over a non-empty family, and makes sense.

---

**Union of subgroups.** For a pair of subgroups $H, K \leq G$, the **union** $H \cup K$ is *rarely* a subgroup.

> **Fact.** $H \cup K \leq G$ if and only if $H \subseteq K$ or $K \subseteq H$.

(Proof: Practice Problem 5.)

Intuition: if neither is contained in the other, pick $h \in H \setminus K$ and $k \in K \setminus H$; then $hk$ cannot lie in $H \cup K$ (arguments in Solution 5 below).

---

## 4.4 Generators and Defining Relations — Presentations

A group can be described by giving **generators** and **relations**. The notation
$$G = \langle g_1, g_2, \ldots, g_n \mid r_1 = 1, r_2 = 1, \ldots, r_m = 1 \rangle$$
means: $G$ is the group generated by $g_1, \ldots, g_n$ subject only to the stated relations $r_i = 1$ (and the relations forced by associativity, inverse, and identity axioms). Formally, $G = F/N$ where $F$ is the free group on $\{g_1, \ldots, g_n\}$ and $N$ is the normal closure of $\{r_1, \ldots, r_m\}$; see [[10-normal-subgroups-and-quotient-groups]] for quotients.

**Example 8 (Cyclic group).**
$$\mathbb{Z}_n = \langle a \mid a^n = 1 \rangle.$$
Elements: $\{1, a, a^2, \ldots, a^{n-1}\}$, multiplication $a^i a^j = a^{(i + j) \bmod n}$.

---

**Example 9 (Dihedral group).**
$$D_n = \langle r, s \mid r^n = 1, \; s^2 = 1, \; srs = r^{-1} \rangle.$$
The relation $srs = r^{-1}$ (equivalently $srs^{-1} = r^{-1}$, since $s^2 = 1$) says "conjugation by $s$ inverts $r$."

Elements: $\{1, r, r^2, \ldots, r^{n-1}, s, sr, sr^2, \ldots, sr^{n-1}\}$ — total $2n$. Every word in $r, s$ can be reduced to the form $s^i r^j$ with $i \in \{0, 1\}$, $j \in \{0, \ldots, n-1\}$ using the three relations.

---

**Example 10 (Klein four-group).**
$$V_4 = \langle a, b \mid a^2 = b^2 = (ab)^2 = 1 \rangle.$$
The relation $(ab)^2 = 1$ expands to $abab = 1$, i.e., $ab = (ab)^{-1} = b^{-1}a^{-1} = ba$ (using $a^2 = b^2 = 1$). So $a, b$ commute.

Elements: $\{1, a, b, ab\}$. $V_4 \cong \mathbb{Z}_2 \times \mathbb{Z}_2$.

---

**Example 11 (Quaternion group).**
$$Q_8 = \langle i, j \mid i^4 = 1, \; i^2 = j^2, \; j i j^{-1} = i^{-1} \rangle.$$
Set $k := ij$ and $-1 := i^2$. The group has $8$ elements: $\{\pm 1, \pm i, \pm j, \pm k\}$. Key relation: $ij = k, jk = i, ki = j$, but $ji = -k, kj = -i, ik = -j$. Non-abelian.

---

**Example 12 (Symmetric group $S_3$ as $D_3$).**
$$S_3 = \langle a, b \mid a^3 = 1, \; b^2 = 1, \; bab = a^{-1} \rangle.$$
This is *the same presentation* as $D_3$. So $S_3 \cong D_3$.

*Explicit isomorphism.* Set
$$a = (1\,2\,3), \qquad b = (1\,2).$$
Then $a$ is a $3$-cycle, so $a^3 = e$. $b$ is a transposition, so $b^2 = e$. And:
$$bab = (1\,2)(1\,2\,3)(1\,2).$$
Computing right-to-left (convention: apply rightmost first), $(1\,2)$ sends $1 \to 2, 2 \to 1, 3 \to 3$. Then $(1\,2\,3)$ sends $1 \to 2, 2 \to 3, 3 \to 1$. Composition so far: $1 \to 2 \to 3, 2 \to 1 \to 2, 3 \to 3 \to 1$, i.e., $1 \to 3, 2 \to 2, 3 \to 1 = (1\,3)$. Then apply outer $(1\,2)$: $1 \to 3 \to 3, 2 \to 2 \to 1, 3 \to 1 \to 2$, giving $1 \to 3, 2 \to 1, 3 \to 2 = (1\,3\,2) = a^{-1}$.

So $bab = a^{-1}$ as required. Since $a, b$ satisfy the defining relations of $D_3$ and generate $S_3$ (any transposition and any $3$-cycle generate $S_3$), we get a surjective homomorphism $D_3 \twoheadrightarrow S_3$. Both have order $6$, so the map is an isomorphism. $\boxed{S_3 \cong D_3.}$

*Geometric interpretation.* An equilateral triangle has $3$ vertices, and its symmetry group $D_3$ permutes them. Every permutation of $3$ vertices is realized by some symmetry, so the action $D_3 \hookrightarrow S_3$ is a bijection — the isomorphism.

---

**Warning (word problem).** Deciding whether two presentations give isomorphic groups is **algorithmically undecidable** in general (Novikov–Boone 1950s). Even deciding whether a given word in the generators equals the identity is undecidable for some finitely presented groups. For small *finite* groups, we can enumerate elements and produce the Cayley table, bypassing the undecidability.

---

## 4.5 Cayley Diagrams

> **Definition (Cayley diagram / Cayley graph).** Let $G$ be a group and $S \subseteq G$ a generating set. The **Cayley diagram** $\Gamma(G, S)$ is the directed, edge-colored graph with:
> - **Vertices:** the elements of $G$.
> - **Edges:** for each generator $s \in S$, a directed edge colored with $s$ from $g$ to $gs$, for every $g \in G$.

**Interpretation.** Multiplying by a generator is "following an arrow of that color." The diagram encodes the group operation pictorially. Paths in the diagram correspond to products of generators.

**Convention (involutions).** If $s^2 = e$ (i.e., $s = s^{-1}$), then the edges $g \to gs$ and $gs \to g s^2 = g$ form a pair in opposite directions between $g$ and $gs$; one usually draws these as a single *undirected* edge.

### Cayley diagram of $\mathbb{Z}_4$

Generator $a$ of order $4$. The diagram is a directed $4$-cycle:
$$
e \xrightarrow{a} a \xrightarrow{a} a^2 \xrightarrow{a} a^3 \xrightarrow{a} e
$$
Reading arrows: $e \cdot a = a$, $a \cdot a = a^2$, etc. Following four arrows returns to $e$ (since $a^4 = e$).

### Cayley diagram of $V_4$

Generators $a, b$, each of order $2$ (both involutions). The diagram is a square:
```
    e ——a—— a
    |       |
    b       b
    |       |
    b ——a—— ab
```
The $a$-edges (horizontal) and $b$-edges (vertical) are undirected because $a^2 = b^2 = e$. Since $V_4$ is abelian ($ab = ba$), the diagram is a true square — going right-then-down equals down-then-right.

### Cayley diagram of $D_3$

Generators $r$ (rotation, order $3$) and $s$ (reflection, order $2$). Two interleaved triangles:

- **Outer triangle** (rotations): $e \xrightarrow{r} r \xrightarrow{r} r^2 \xrightarrow{r} e$ — a directed $3$-cycle.
- **Inner triangle** (reflections): $s \xrightarrow{r} sr \xrightarrow{r} sr^2 \xrightarrow{r} s$ — another directed $3$-cycle.
- **Rungs** (undirected $s$-edges): $e \leftrightarrow s$, $r \leftrightarrow sr$, $r^2 \leftrightarrow sr^2$.

The result is a triangular prism with $6$ vertices and colored edges. Observe that following $r$ on the outer triangle and $r$ on the inner triangle goes in "opposite" directions around the triangles — a visual manifestation of $srs = r^{-1}$.

### Cayley diagram of $Q_8$

Generators $i, j$ (with $|i| = |j| = 4$). The diagram has $8$ vertices. One nice drawing: two interleaved squares (one for powers of $i$ starting at $1$, one for their translates by $j$), with $j$-edges connecting corresponding vertices. The non-commutativity $ij = k = -ji$ appears in the diagram as a "twist" between the squares. Harder to draw cleanly in ASCII; see [[12-subgroup-lattice-and-dihedral]].

---

## 4.6 Worked Examples

**Example 13 (Subgroups of $\mathbb{Z}$).** Prove: every subgroup of $(\mathbb{Z}, +)$ is of the form $n\mathbb{Z}$ for some integer $n \geq 0$.

*Setup.* Let $H \leq \mathbb{Z}$. We want to find a unique $n \geq 0$ with $H = n\mathbb{Z}$.

*Strategy.* If $H = \{0\}$, take $n = 0$. Otherwise, identify the smallest positive element of $H$ (such an element exists by well-ordering), call it $n$, and use the division algorithm to show every element of $H$ is a multiple of $n$.

**Step 1: Handle the trivial case.** If $H = \{0\}$, then $H = 0 \cdot \mathbb{Z} = 0\mathbb{Z}$, and we take $n = 0$.

**Step 2: $H$ contains a positive integer.** Suppose $H \neq \{0\}$. Then there exists $a \in H$ with $a \neq 0$. Since $H$ is a subgroup, $-a \in H$ as well. One of $\{a, -a\}$ is positive. Hence
$$H^+ := \{h \in H : h > 0\}$$
is non-empty.

**Step 3: Define $n$ as the minimum positive element.** $H^+$ is a non-empty subset of $\mathbb{Z}_{>0}$. By the **well-ordering principle** of $\mathbb{Z}_{>0}$, $H^+$ has a minimum. Let
$$n := \min H^+ \in H, \qquad n \geq 1.$$

**Step 4: Show $n\mathbb{Z} \subseteq H$.** $n \in H$, so by Theorem 4.2, $n + n = 2n \in H$, and inductively $kn \in H$ for every $k \geq 1$. Also $-n, -2n, \ldots \in H$ by the inverse property, and $0 \in H$ (identity). So $\{kn : k \in \mathbb{Z}\} = n\mathbb{Z} \subseteq H$.

**Step 5: Show $H \subseteq n\mathbb{Z}$ via the division algorithm.** Let $h \in H$. Apply the division algorithm to $h$ divided by $n$:
$$h = qn + r, \qquad 0 \leq r < n, \qquad q, r \in \mathbb{Z}.$$

Rearrange: $r = h - qn$. Now $h \in H$ and $qn \in n\mathbb{Z} \subseteq H$ (Step 4), so by closure of $H$ under subtraction (Theorem 4.2), $r = h - qn \in H$.

Consider $r$:
- $r \geq 0$ by construction.
- $r < n$ by construction.
- $r \in H$.

If $r > 0$, then $r \in H^+$ with $r < n$, contradicting the minimality of $n = \min H^+$. The only way out is $r = 0$.

So $r = 0$ and $h = qn \in n\mathbb{Z}$.

**Step 6: Uniqueness of $n$.** Suppose $H = n\mathbb{Z} = m\mathbb{Z}$ with $n, m \geq 0$. Then $n \in m\mathbb{Z}$, so $m \mid n$, and $m \in n\mathbb{Z}$, so $n \mid m$. For non-negative integers, $m \mid n$ and $n \mid m$ force $m = n$.

**Conclusion.** Every subgroup of $\mathbb{Z}$ has the form $n\mathbb{Z}$ for a unique $n \geq 0$. $\blacksquare$

**Remark (why this is the group-theoretic basis of Bézout).** If $a, b \in \mathbb{Z}$, then $\langle a, b\rangle$ (the subgroup generated by $a$ and $b$ in $(\mathbb{Z}, +)$) consists of all integer linear combinations $xa + yb$ with $x, y \in \mathbb{Z}$. By the theorem, $\langle a, b\rangle = d\mathbb{Z}$ for some $d \geq 0$. This $d$ is precisely $\gcd(a, b)$:
- $d \mid a$ and $d \mid b$ (since $a, b \in d\mathbb{Z}$), so $d$ is a common divisor.
- $d = xa + yb$ for some $x, y \in \mathbb{Z}$ (since $d \in \langle a, b\rangle$), so every common divisor of $a, b$ divides $d$.

This is **Bézout's identity**: $\gcd(a, b) = xa + yb$ for some $x, y \in \mathbb{Z}$, which is just the statement "the generated subgroup is cyclic."

**Remark (failure in non-cyclic groups).** The analogue fails in $\mathbb{Z}^2$: not every subgroup is of the form $\langle (m, n) \rangle$ for a single element. Subgroups of $\mathbb{Z}^n$ are *free abelian* but may need multiple generators; the structure theorem for f.g. abelian groups (Smith normal form) describes them.

---

**Example 14 (Subgroups of $\mathbb{Z}_{12}$).** Find all subgroups of $(\mathbb{Z}_{12}, +)$.

*Setup and strategy.* $\mathbb{Z}_{12}$ is cyclic of order $12$. By the classification of subgroups of cyclic groups (proved in [[06-cyclic-groups-and-order]]), subgroups of a cyclic group of order $n$ are in bijection with divisors $d \mid n$: for each $d$, there is a unique subgroup of order $d$, namely $\langle n/d \rangle$.

Divisors of $12$: $1, 2, 3, 4, 6, 12$ — six in total.

*The subgroups.* For each divisor $d \mid 12$, compute $\langle 12/d \rangle$:

| Divisor $d$ | Element $12/d$ | Subgroup $\langle 12/d\rangle$ | Order |
|---|---|---|---|
| $1$ | $12 \equiv 0$ | $\{0\}$ | $1$ |
| $2$ | $6$ | $\{0, 6\}$ | $2$ |
| $3$ | $4$ | $\{0, 4, 8\}$ | $3$ |
| $4$ | $3$ | $\{0, 3, 6, 9\}$ | $4$ |
| $6$ | $2$ | $\{0, 2, 4, 6, 8, 10\}$ | $6$ |
| $12$ | $1$ | $\mathbb{Z}_{12}$ | $12$ |

*Verification of one row.* $\langle 4\rangle$: add $4$ to itself modulo $12$. Powers (additively): $0, 4, 8, 12 \equiv 0, \ldots$. So $\langle 4\rangle = \{0, 4, 8\}$, order $3$. The order is $12 / \gcd(4, 12) = 12 / 4 = 3$. $\checkmark$

*Total.* Six subgroups, matching the six divisors of $12$. $\blacksquare$

**Remark (lattice structure).** These six subgroups form a lattice under inclusion, isomorphic to the divisor lattice of $12$:
$$\{0\} \subset \langle 6\rangle \subset \langle 3\rangle, \langle 2\rangle \subset \langle 1\rangle = \mathbb{Z}_{12},$$
with $\langle 4\rangle$ between $\{0\}$ and $\langle 2\rangle$, etc. The lattice of subgroups of a cyclic group of order $n$ is *always* isomorphic to the divisor lattice of $n$.

---

**Example 15 (Intersection of $4\mathbb{Z}$ and $6\mathbb{Z}$).** Compute $4\mathbb{Z} \cap 6\mathbb{Z}$ in $(\mathbb{Z}, +)$.

*Strategy.* An element $n$ lies in $4\mathbb{Z} \cap 6\mathbb{Z}$ iff $n$ is a multiple of both $4$ and $6$, iff $n$ is a common multiple of $4$ and $6$, iff $n$ is a multiple of $\operatorname{lcm}(4, 6)$.

*Compute the lcm.* $\operatorname{lcm}(4, 6) = \frac{4 \cdot 6}{\gcd(4, 6)} = \frac{24}{2} = 12$.

*Conclusion.* $4\mathbb{Z} \cap 6\mathbb{Z} = 12\mathbb{Z}$. $\blacksquare$

**Sanity check.** $12 \in 4\mathbb{Z}$ ($12 = 4 \cdot 3$) and $12 \in 6\mathbb{Z}$ ($12 = 6 \cdot 2$). $\checkmark$ And $12 \mathbb{Z}$ is indeed a subgroup of $\mathbb{Z}$ by Example 2, so Theorem 4.4 is consistent.

**Remark (general principle).** In $(\mathbb{Z}, +)$: $m\mathbb{Z} \cap n\mathbb{Z} = \operatorname{lcm}(m, n) \mathbb{Z}$ and $\langle m, n\rangle = m\mathbb{Z} + n\mathbb{Z} = \gcd(m, n)\mathbb{Z}$. Intersection $\leftrightarrow$ lcm, generated subgroup $\leftrightarrow$ gcd.

---

**Example 16 (Generation in $\mathbb{Z}$).** Compute $\langle 4, 6 \rangle$ in $(\mathbb{Z}, +)$.

*Strategy.* $\langle 4, 6\rangle$ is the smallest subgroup of $\mathbb{Z}$ containing both $4$ and $6$. Since every subgroup of $\mathbb{Z}$ is $n\mathbb{Z}$ for some $n \geq 0$ (Example 13), we seek the smallest $n \geq 0$ with $4, 6 \in n\mathbb{Z}$, i.e., $n \mid 4$ and $n \mid 6$, i.e., $n \mid \gcd(4, 6)$. The *largest* such $n$ gives the *smallest* subgroup $n\mathbb{Z}$ (larger $n$ = smaller subgroup).

Hence $n = \gcd(4, 6) = 2$, and $\langle 4, 6\rangle = 2\mathbb{Z}$.

*Explicit verification.*

**($\supseteq$)** Bézout: $2 = 2 \cdot 4 + (-1) \cdot 6 \in \langle 4, 6\rangle$ (writing $2$ as an integer combination of $4, 6$, then re-expressing via Theorem 4.2 / definition of generation). So $2 \in \langle 4, 6\rangle$, and hence $2\mathbb{Z} \subseteq \langle 4, 6\rangle$.

**($\subseteq$)** $4 = 2 \cdot 2 \in 2\mathbb{Z}$ and $6 = 3 \cdot 2 \in 2\mathbb{Z}$, so $\{4, 6\} \subseteq 2\mathbb{Z}$. Since $2\mathbb{Z}$ is a subgroup and $\langle 4, 6\rangle$ is the smallest subgroup containing $\{4, 6\}$, $\langle 4, 6\rangle \subseteq 2\mathbb{Z}$.

Both containments give $\langle 4, 6\rangle = 2\mathbb{Z}$. $\blacksquare$

---

**Example 17 (Subgroups of $S_3$).** List all subgroups of $S_3$.

*Setup.* $|S_3| = 6$. By Lagrange's theorem (proved in [[09-cosets-and-lagranges-theorem]]), the order of any subgroup divides $6$. Possible orders: $1, 2, 3, 6$.

*Elements of $S_3$.* In cycle notation: $\{e, (1\,2), (1\,3), (2\,3), (1\,2\,3), (1\,3\,2)\}$, with orders $1, 2, 2, 2, 3, 3$.

*Enumerate by order.*

**Order 1.** Only $\{e\}$.

**Order 2.** A subgroup of order $2$ is generated by an element of order $2$. The elements of order $2$ in $S_3$ are the three transpositions, giving three subgroups:
- $\langle (1\,2)\rangle = \{e, (1\,2)\}$
- $\langle (1\,3)\rangle = \{e, (1\,3)\}$
- $\langle (2\,3)\rangle = \{e, (2\,3)\}$

**Order 3.** A subgroup of order $3$ is cyclic (every group of prime order is cyclic, see [[06-cyclic-groups-and-order]]), generated by an element of order $3$. The elements of order $3$ are $(1\,2\,3)$ and $(1\,3\,2)$. But $(1\,3\,2) = (1\,2\,3)^2 = (1\,2\,3)^{-1}$, so they generate the same cyclic subgroup:
$$A_3 = \langle (1\,2\,3)\rangle = \{e, (1\,2\,3), (1\,3\,2)\}.$$
One subgroup of order $3$.

**Order 6.** Only $S_3$ itself.

**Total: $1 + 3 + 1 + 1 = 6$ subgroups.** $\blacksquare$

**Sanity check (Lagrange).** All orders listed ($1, 2, 3, 6$) divide $|S_3| = 6$. $\checkmark$

**Remark (no subgroup of order $4$ or $5$).** Although $4 \nmid 6$ and $5 \nmid 6$ already rule these out by Lagrange, it is useful to observe: the absence of order-$4$ subgroups is one explanation of why $S_3$ does not contain $V_4$ or $\mathbb{Z}_4$.

---

**Example 18 ($\mathbb{Z}[\sqrt{2}]$ is a subgroup of $(\mathbb{R}, +)$).** Show $H = \{a + b\sqrt{2} : a, b \in \mathbb{Z}\}$ is a subgroup of $(\mathbb{R}, +)$.

*Strategy.* Apply Theorem 4.2 (one-step test).

**Step 1: Non-emptiness.** Take $a = b = 0$: then $0 + 0 \cdot \sqrt{2} = 0 \in H$. So $H \neq \emptyset$.

**Step 2: Closure under $x - y$.** Let $x, y \in H$, say $x = a + b\sqrt{2}$ and $y = c + d\sqrt{2}$ with $a, b, c, d \in \mathbb{Z}$. Then
$$x - y = (a + b\sqrt{2}) - (c + d\sqrt{2}) = (a - c) + (b - d)\sqrt{2}.$$

Set $a' := a - c \in \mathbb{Z}$ (since $\mathbb{Z}$ is closed under subtraction) and $b' := b - d \in \mathbb{Z}$ (same reason). Then
$$x - y = a' + b' \sqrt{2}, \qquad a', b' \in \mathbb{Z},$$
so $x - y \in H$. $\checkmark$

**Step 3: Apply Theorem 4.2.** $H$ is non-empty and closed under $(x, y) \mapsto x - y$ (which is $x + (-y)$ in additive notation, i.e., $xy^{-1}$ in multiplicative notation). Hence $H \leq (\mathbb{R}, +)$. $\blacksquare$

**Uniqueness of representation.** Each $h \in H$ has a *unique* expression $a + b\sqrt{2}$ with $a, b \in \mathbb{Z}$. Suppose $a + b\sqrt{2} = c + d\sqrt{2}$. Then $(a - c) = (d - b)\sqrt{2}$. If $d \neq b$, then $\sqrt{2} = (a - c)/(d - b) \in \mathbb{Q}$ — contradiction (irrationality of $\sqrt{2}$). So $b = d$, then $a = c$.

**Remark (ring structure).** $H = \mathbb{Z}[\sqrt{2}]$ is in fact a *ring* (closed under multiplication too): $(a + b\sqrt{2})(c + d\sqrt{2}) = (ac + 2bd) + (ad + bc)\sqrt{2} \in H$. This ring is the **ring of integers of the quadratic number field** $\mathbb{Q}(\sqrt{2})$. See [[21-rings-subrings-ideals]] for the ring axioms.

**Remark (not a subgroup of $(\mathbb{R}, \cdot)$).** Under multiplication, $H$ is not a subgroup of $\mathbb{R}^\times$: $0 \in H$ but $0$ has no multiplicative inverse. Even removing $0$, inverses of generic elements $a + b\sqrt{2}$ land in $\mathbb{Q}(\sqrt{2}) \setminus \mathbb{Z}[\sqrt{2}]$ (e.g., $(3)^{-1} = 1/3 \notin H$). Multiplicatively, the relevant object is the **unit group** of $\mathbb{Z}[\sqrt{2}]$, which is $\{\pm (1 + \sqrt{2})^n : n \in \mathbb{Z}\}$ by Dirichlet's unit theorem.

---

## 4.7 Practice Problems

1. Show that $H = \{n \in \mathbb{Z} : n \text{ is even}\}$ is a subgroup of $(\mathbb{Z}, +)$.
2. Is $H = \{A \in GL_2(\mathbb{R}) : \det A = \pm 1\}$ a subgroup of $GL_2(\mathbb{R})$?
3. Find all subgroups of $V_4$.
4. List all subgroups of $\mathbb{Z}_{20}$.
5. Prove that for subgroups $H, K \leq G$: $H \cup K$ is a subgroup if and only if $H \subseteq K$ or $K \subseteq H$.
6. In $S_4$, find the subgroup generated by $(1\,2)$ and $(1\,2\,3\,4)$. How many elements does it have?
7. Prove: if a group $G$ has only finitely many subgroups, then $G$ is finite.

### Solutions

**Solution 1.** Show $H = \{n \in \mathbb{Z} : n \text{ is even}\} = 2\mathbb{Z}$ is a subgroup of $(\mathbb{Z}, +)$.

*Identify $H$.* An even integer is one of the form $2k$ for $k \in \mathbb{Z}$. So $H = \{2k : k \in \mathbb{Z}\} = 2\mathbb{Z}$.

*Verification via Theorem 4.2.*

**Step 1: Non-empty.** $0 = 2 \cdot 0 \in H$. $\checkmark$

**Step 2: Closed under $(a, b) \mapsto a - b$.** Let $a = 2m$ and $b = 2n$ with $m, n \in \mathbb{Z}$. Then
$$a - b = 2m - 2n = 2(m - n).$$
Since $m - n \in \mathbb{Z}$ (closure of $\mathbb{Z}$ under subtraction), we have $a - b \in 2\mathbb{Z} = H$. $\checkmark$

By Theorem 4.2, $H \leq \mathbb{Z}$. $\blacksquare$

**Remark.** This is a special case of Example 2 with $n = 2$.

---

**Solution 2.** Analyze $H = \{A \in GL_2(\mathbb{R}) : \det A = \pm 1\}$.

*Verification via Theorem 4.2.*

**Step 1: Non-empty.** $I \in GL_2(\mathbb{R})$ and $\det I = 1 = +1$. So $I \in H$, and $H \neq \emptyset$.

**Step 2: Closed under $(A, B) \mapsto AB^{-1}$.** Let $A, B \in H$, so $\det A \in \{\pm 1\}$ and $\det B \in \{\pm 1\}$. Compute
$$\det(AB^{-1}) = \det A \cdot \det(B^{-1}) = \det A \cdot \frac{1}{\det B} = \frac{\det A}{\det B}.$$

Case analysis on numerator and denominator:
- $(\det A, \det B) = (+1, +1)$: ratio $= +1$.
- $(\det A, \det B) = (+1, -1)$: ratio $= -1$.
- $(\det A, \det B) = (-1, +1)$: ratio $= -1$.
- $(\det A, \det B) = (-1, -1)$: ratio $= +1$.

In every case, $\det(AB^{-1}) \in \{\pm 1\}$, so $AB^{-1} \in H$. $\checkmark$

Also, $AB^{-1} \in GL_2(\mathbb{R})$ since its determinant is nonzero.

By Theorem 4.2, $H \leq GL_2(\mathbb{R})$. $\blacksquare$

**Remark.** $H$ is sometimes called the **signed special linear group** $SL_2^{\pm}(\mathbb{R})$. It is the kernel of the absolute-value-of-determinant homomorphism $GL_2(\mathbb{R}) \to \mathbb{R}^\times / \{\pm 1\}$, or equivalently, $H = \{A : |\det A| = 1\}$ intersected with the subset where $\det A$ is an integer (here, $\pm 1$). $SL_2 \leq H$, and $[H : SL_2] = 2$.

---

**Solution 3.** Find all subgroups of $V_4 = \{e, a, b, ab\}$.

*Setup.* $|V_4| = 4$. By Lagrange, subgroup orders divide $4$: possibilities are $1, 2, 4$.

*Observation.* In $V_4$, every non-identity element has order $2$: $a^2 = b^2 = (ab)^2 = e$. (The last: $(ab)^2 = abab = aabb = ee = e$ since $V_4$ is abelian, using $a^2 = b^2 = e$.)

**Order 1.** $\{e\}$.

**Order 2.** A subgroup of order $2$ is cyclic, generated by an element of order $2$. The three elements of order $2$ are $a, b, ab$, giving three subgroups:
- $\langle a\rangle = \{e, a\}$
- $\langle b\rangle = \{e, b\}$
- $\langle ab\rangle = \{e, ab\}$

**Order 4.** $V_4$ itself.

*Why no other subgroups?* A subgroup of order $3$ would be cyclic of order $3$, needing an element of order $3$ — none exist in $V_4$. So no such subgroup.

*Verification of the count.* Total: $1 + 3 + 1 = 5$ subgroups. $\blacksquare$

**Remark (lattice structure).** The lattice of subgroups of $V_4$ is:
```
        V_4
       / | \
     ⟨a⟩⟨b⟩⟨ab⟩
       \ | /
        {e}
```
This is a rank-$2$ Boolean lattice. In contrast, the subgroup lattice of $\mathbb{Z}_4$ is a chain $\{e\} \subset \langle 2\rangle \subset \mathbb{Z}_4$ — very different. The subgroup lattice distinguishes $V_4$ from $\mathbb{Z}_4$, even though both have order $4$.

---

**Solution 4.** List all subgroups of $\mathbb{Z}_{20}$.

*Setup.* $\mathbb{Z}_{20}$ is cyclic of order $20$. Subgroups correspond to divisors of $20$ (Example 14).

*Divisors of $20$.* $1, 2, 4, 5, 10, 20$ — six in total.

*Subgroups.* For each divisor $d \mid 20$, the subgroup of order $d$ is $\langle 20/d\rangle$:

| $d$ | $20/d$ | Subgroup | Elements |
|---|---|---|---|
| $1$ | $20 \equiv 0$ | $\langle 0\rangle$ | $\{0\}$ |
| $2$ | $10$ | $\langle 10\rangle$ | $\{0, 10\}$ |
| $4$ | $5$ | $\langle 5\rangle$ | $\{0, 5, 10, 15\}$ |
| $5$ | $4$ | $\langle 4\rangle$ | $\{0, 4, 8, 12, 16\}$ |
| $10$ | $2$ | $\langle 2\rangle$ | $\{0, 2, 4, 6, 8, 10, 12, 14, 16, 18\}$ |
| $20$ | $1$ | $\langle 1\rangle$ | $\mathbb{Z}_{20}$ |

*Verification of one row.* $\langle 5\rangle$: adding $5$ modulo $20$ gives $5, 10, 15, 20 \equiv 0$, so $\langle 5\rangle = \{0, 5, 10, 15\}$ of order $4$, and $20/\gcd(5, 20) = 20/5 = 4$. $\checkmark$

*Total.* Six subgroups. $\blacksquare$

---

**Solution 5.** Prove: $H \cup K \leq G$ iff $H \subseteq K$ or $K \subseteq H$.

*($\Leftarrow$) Easy direction.* 

Suppose WLOG $H \subseteq K$. Then $H \cup K = K$. Since $K \leq G$ by hypothesis, $H \cup K = K \leq G$. $\checkmark$

The case $K \subseteq H$ is symmetric: $H \cup K = H \leq G$.

*($\Rightarrow$) Harder direction: contrapositive.* 

Suppose neither $H \subseteq K$ nor $K \subseteq H$. We must show $H \cup K$ is not a subgroup.

**Step 1: Extract witnessing elements.** Since $H \not\subseteq K$, there exists $h \in H \setminus K$. Since $K \not\subseteq H$, there exists $k \in K \setminus H$.

**Step 2: Claim $hk \notin H \cup K$.** We show $hk \notin H$ and $hk \notin K$.

*Subclaim A: $hk \notin K$.* Suppose for contradiction that $hk \in K$. Then, since $k \in K$ and $K \leq G$, $k^{-1} \in K$, so
$$h = (hk) k^{-1} \in K \cdot K \subseteq K$$
(by closure of $K$). But $h \notin K$ by choice. Contradiction. So $hk \notin K$.

*Subclaim B: $hk \notin H$.* Suppose for contradiction that $hk \in H$. Then, since $h \in H$ and $H \leq G$, $h^{-1} \in H$, so
$$k = h^{-1} (hk) \in H \cdot H \subseteq H$$
(by closure of $H$). But $k \notin H$ by choice. Contradiction. So $hk \notin H$.

Combining: $hk \notin H$ and $hk \notin K$, hence $hk \notin H \cup K$.

**Step 3: Conclude $H \cup K$ is not closed.** $h \in H \subseteq H \cup K$ and $k \in K \subseteq H \cup K$, so $h, k \in H \cup K$. But $hk \notin H \cup K$ by Step 2. So $H \cup K$ is not closed under the operation, hence not a subgroup.

This establishes the contrapositive, hence the ($\Rightarrow$) direction. $\blacksquare$

**Remark (generalization to multiple subgroups).** The union of *more than two* subgroups can be a subgroup without any two having a containment relation — but only over rings or in very special configurations. In general, one has the cute fact: a group $G$ cannot be the union of two proper subgroups. The analogue for three subgroups fails ($V_4 = \langle a\rangle \cup \langle b\rangle \cup \langle ab\rangle$ is false as stated, but $V_4 \setminus \{e\} = \{a\} \cup \{b\} \cup \{ab\}$ — the *cosets* of the three order-$2$ subgroups union-cover $V_4 \setminus \{e\}$). The general statement is: $G$ is a union of $n$ proper subgroups iff $G$ has a quotient of index $\leq$ some bound depending on $n$.

---

**Solution 6.** In $S_4$, find $H = \langle (1\,2), (1\,2\,3\,4)\rangle$ and its order.

*Strategy.* We claim $H = S_4$, so $|H| = 24$. The proof has two parts:
1. $H$ contains a generating set of $S_4$ (e.g., all adjacent transpositions).
2. Adjacent transpositions generate $S_n$.

Let $\sigma = (1\,2)$ (a transposition) and $\tau = (1\,2\,3\,4)$ (a $4$-cycle). Convention: we apply permutations right-to-left, so $\alpha\beta$ means "first $\beta$, then $\alpha$."

**Step 1: Conjugates of $\sigma$ by powers of $\tau$.**

We use the general conjugation rule for cycles: if $\rho \in S_n$ and $(a_1\,a_2\,\ldots\,a_k)$ is a cycle, then
$$\rho (a_1\,a_2\,\ldots\,a_k) \rho^{-1} = (\rho(a_1)\,\rho(a_2)\,\ldots\,\rho(a_k)).$$
(Standard; proved in [[05-permutation-and-dihedral-groups]].)

Apply with $\rho = \tau = (1\,2\,3\,4)$ and the transposition $(1\,2)$:
$$\tau (1\,2) \tau^{-1} = (\tau(1)\,\tau(2)) = (2\,3).$$

Apply with $\rho = \tau^2 = (1\,3)(2\,4)$:
$$\tau^2 (1\,2) \tau^{-2} = (\tau^2(1)\,\tau^2(2)) = (3\,4).$$

Apply with $\rho = \tau^3 = (1\,4\,3\,2)$:
$$\tau^3 (1\,2) \tau^{-3} = (\tau^3(1)\,\tau^3(2)) = (4\,1) = (1\,4).$$

Since $\tau \in H$ and $\sigma \in H$, $H$ is closed under conjugation by $\tau$ (and powers). So
$$(1\,2), (2\,3), (3\,4), (1\,4) \in H.$$

*Subtlety.* The conjugate $(1\,4)$ is not the "adjacent transposition" in the usual sense, but we already have $(1\,2), (2\,3), (3\,4)$, which is all we need.

**Step 2: Adjacent transpositions generate $S_4$.**

*Claim:* $\langle (1\,2), (2\,3), (3\,4)\rangle = S_4$.

*Proof.* Every transposition $(i\,j)$ with $i < j$ can be written as a product of adjacent ones. Specifically, for $i < j$:
$$(i\,j) = (i\,i+1)(i+1\,i+2)\cdots(j-1\,j)(j-2\,j-1)\cdots(i\,i+1).$$

*Concrete verification in $S_4$*: the $\binom{4}{2} = 6$ transpositions are
$(1\,2), (2\,3), (3\,4)$ — adjacent, given directly.
$(1\,3) = (1\,2)(2\,3)(1\,2)$. Check: right-to-left, $(1\,2)$: $1 \leftrightarrow 2$. Then $(2\,3)$: $2 \leftrightarrow 3$. Then $(1\,2)$: $1 \leftrightarrow 2$. Track $1$: $1 \to 2 \to 3 \to 3$. Track $3$: $3 \to 3 \to 2 \to 1$. Track $2$: $2 \to 1 \to 1 \to 2$. Track $4$: fixed. Result: $1 \leftrightarrow 3$, i.e., $(1\,3)$. $\checkmark$
$(2\,4) = (2\,3)(3\,4)(2\,3)$. Analogous.
$(1\,4) = (1\,2)(2\,3)(3\,4)(2\,3)(1\,2)$, or equivalently $(1\,3)(3\,4)(1\,3)$ (computed via conjugation).

So every transposition is in $\langle (1\,2), (2\,3), (3\,4)\rangle$.

*Any permutation is a product of transpositions.* Standard fact: every $\sigma \in S_n$ can be written as a product of transpositions. This follows from the decomposition of $\sigma$ into disjoint cycles, together with
$$(a_1\,a_2\,\ldots\,a_k) = (a_1\,a_k)(a_1\,a_{k-1})\cdots(a_1\,a_2)$$
for a single cycle. (Proof in [[05-permutation-and-dihedral-groups]]; verify by tracking where each $a_i$ goes.)

Hence every $\sigma \in S_4$ is a product of transpositions, each of which lies in $\langle (1\,2), (2\,3), (3\,4)\rangle$. So $S_4 \subseteq \langle (1\,2), (2\,3), (3\,4)\rangle$, and equality holds.

**Step 3: Conclude.**

$H = \langle (1\,2), \tau\rangle$ contains $(1\,2), (2\,3), (3\,4)$ (Step 1), hence contains $\langle (1\,2), (2\,3), (3\,4)\rangle = S_4$ (Step 2). Since $H \subseteq S_4$, $H = S_4$, and $|H| = |S_4| = 4! = 24$. $\blacksquare$

**Sanity check.** $\tau \in H$ is a $4$-cycle, even parity ($4$-cycles have sign $-1$... wait, let me recompute). $\tau = (1\,2\,3\,4)$ factors as $(1\,2)(2\,3)(3\,4)$? Check: $(3\,4)$: $3 \leftrightarrow 4$. Then $(2\,3)$: $2 \leftrightarrow 3$. Then $(1\,2)$: $1 \leftrightarrow 2$. Track: $1 \to 1 \to 1 \to 2$; $2 \to 2 \to 3 \to 3$; $3 \to 4 \to 4 \to 4$; $4 \to 3 \to 2 \to 1$. Result: $1 \to 2, 2 \to 3, 3 \to 4, 4 \to 1 = (1\,2\,3\,4)$. So $\tau$ is a product of $3$ transpositions, odd parity. So $\tau \notin A_4$, confirming $H$ is not contained in $A_4$. $\checkmark$

**Remark (the general fact).** For every $n \geq 2$, the subgroup $\langle (1\,2), (1\,2\,\ldots\,n)\rangle = S_n$. This is the standard "two generators for $S_n$" result: one adjacent transposition plus one $n$-cycle suffice. Other famous two-generator sets: $\{(1\,2), (2\,3), \ldots, (n-1\,n)\}$ (all adjacent transpositions) and $\{(1\,2), (1\,3), \ldots, (1\,n)\}$. Even more economically: $S_n$ can be generated by just $2$ elements for every $n \geq 2$.

---

**Solution 7.** Prove: if $G$ has only finitely many subgroups, then $G$ is finite.

*Strategy.* Contrapositive: assume $G$ is infinite. We produce infinitely many distinct subgroups. Split into cases based on whether $G$ has an element of infinite order.

**Case 1: $G$ has an element $a$ of infinite order.**

*Claim.* The subgroups $\langle a^0\rangle, \langle a^1\rangle, \langle a^2\rangle, \ldots$ are all subgroups... wait, that's not quite what we want. Let me re-examine.

Consider the subgroups $\langle a^n\rangle$ for $n \geq 1$. Each is cyclic, generated by $a^n$.

*Subclaim.* $\langle a^m\rangle = \langle a^n\rangle$ iff $m = \pm n$.

*Proof of subclaim.* Suppose $\langle a^m\rangle = \langle a^n\rangle$. Then $a^m \in \langle a^n\rangle$, so $a^m = a^{nk}$ for some $k \in \mathbb{Z}$. Since $a$ has infinite order, $a^m = a^{nk}$ forces $m = nk$. Similarly $n = m\ell$ for some $\ell$. Then $m = nk = (m\ell)k = m \ell k$, so $\ell k = 1$ (since $m \neq 0$ — otherwise $a^m = a^0 = e$, and the subgroup is trivial). Over $\mathbb{Z}$, $\ell k = 1$ forces $\ell = k = \pm 1$, hence $m = \pm n$.

Applying the subclaim: the subgroups $\langle a\rangle, \langle a^2\rangle, \langle a^3\rangle, \ldots$ are pairwise distinct (since $m \neq \pm n$ for distinct $m, n \geq 1$). So $G$ has infinitely many distinct subgroups.

*Alternative view.* $\langle a\rangle \cong \mathbb{Z}$, and the subgroups of $\mathbb{Z}$ are $n\mathbb{Z}$ for $n \geq 0$ (Example 13) — infinitely many. Pulling back through the isomorphism gives infinitely many subgroups of $\langle a\rangle \leq G$, which are subgroups of $G$.

**Case 2: Every element of $G$ has finite order (but $G$ is infinite).**

*Strategy.* Build an increasing chain $\{e\} \subsetneq \langle a_1\rangle \subsetneq \langle a_1, a_2\rangle \subsetneq \ldots$ via greedy selection.

Inductively define elements $a_1, a_2, \ldots \in G$:
- $a_1$: any non-identity element of $G$ (exists since $|G| \geq 2$).
- $a_{k+1}$: any element of $G \setminus \langle a_1, \ldots, a_k\rangle$.

*Why does $a_{k+1}$ always exist?* Each $\langle a_1, \ldots, a_k\rangle$ is a finitely generated subgroup of $G$, each of whose generators has finite order. A finitely generated group in which every element has finite order is not automatically finite (e.g., the Grigorchuk group provides infinite counterexamples). So we need more care.

*Refined argument.* Let $H_k = \langle a_1, \ldots, a_k\rangle$. We claim: if $G$ is infinite and every element of $H_k$ has finite order, and if $H_k$ is finite, then $H_k \neq G$, so we can pick $a_{k+1} \in G \setminus H_k$.

So we need: each $H_k$ is finite.

*Justification that $H_k$ is finite.* In our construction we choose the $a_i$ one by one. After choosing $a_1$: $H_1 = \langle a_1\rangle = \{a_1^0, a_1^1, \ldots, a_1^{n_1 - 1}\}$ where $n_1 = |a_1| < \infty$. So $H_1$ is finite.

Inductively, suppose $H_k$ is finite. Choose $a_{k+1} \in G \setminus H_k$ (possible since $G$ infinite $\supsetneq H_k$ finite). Set $a_{k+1}$ has finite order $n_{k+1}$. The subgroup $H_{k+1} = \langle H_k, a_{k+1}\rangle$ consists of all words in elements of $H_k$ and powers of $a_{k+1}$. It is not automatically finite for a general (non-abelian) group!

*Repair for the abelian case first.* If $G$ is abelian, then every element of $H_{k+1}$ can be written as $h \cdot a_{k+1}^i$ for $h \in H_k$ and $0 \leq i < n_{k+1}$ (since $a_{k+1}$ commutes with everything). So $|H_{k+1}| \leq |H_k| \cdot n_{k+1} < \infty$. Induction gives each $H_k$ finite, and the proof concludes: $H_1 \subsetneq H_2 \subsetneq \ldots$ is a strictly increasing chain, giving infinitely many distinct subgroups.

*General case.* For non-abelian $G$ of which every element has finite order (a **torsion group**), $H_{k+1}$ need not be finite (Grigorchuk, Burnside counterexamples). The argument in the problem statement implicitly rests on a more subtle fact.

*A cleaner proof for the general case.* Assume $G$ is infinite. If $G$ has an element of infinite order, Case 1 applies. Otherwise, every element has finite order. Consider the collection of all *cyclic* subgroups $\langle g\rangle$ for $g \in G$. Each $\langle g\rangle$ is finite (order $= |g| < \infty$). Since $G$ is infinite and
$$G = \bigcup_{g \in G} \langle g\rangle,$$
we must have *infinitely many distinct* $\langle g\rangle$'s: if there were only finitely many $\langle g_1\rangle, \ldots, \langle g_N\rangle$, each finite, their union would be finite, contradicting $|G| = \infty$.

So $G$ has infinitely many distinct cyclic subgroups, hence infinitely many subgroups.

**Combining cases:** If $G$ is infinite, then $G$ has infinitely many subgroups (either infinitely many cyclic subgroups of an infinite-order element via Case 1, or infinitely many finite cyclic subgroups via the corrected Case 2 argument). Contrapositive: finitely many subgroups implies $G$ is finite. $\blacksquare$

**Remark (why Case 2 needs care).** The naive chain-building argument works if we can control the size of each $H_k$. In the abelian setting or when generators commute enough, this is fine. In the general torsion case, the cleaner argument uses the cover $G = \bigcup_g \langle g\rangle$ and the contrapositive of "finite union of finite sets is finite." This is the argument one should remember.

**Remark (converse does *not* hold in general).** A finite group always has finitely many subgroups, but certain infinite groups (like the **Prüfer group** $\mathbb{Z}(p^\infty)$) have infinitely many — specifically, one subgroup of each order $p^n$ for $n \geq 0$. So the theorem gives: "finitely many subgroups $\Rightarrow$ finite." The direction "finite $\Rightarrow$ finitely many subgroups" is trivially true (each subgroup is a subset of a finite set, so only finitely many possibilities).

---

## 4.8 Cross-References

**Previous:** [[03-groups-definition-and-examples]]

**Next:**
- [[05-permutation-and-dihedral-groups]] — subgroups of $S_n$, $D_n$
- [[06-cyclic-groups-and-order]] — $\langle a \rangle$ in detail, classification of subgroups of cyclic groups
- [[12-subgroup-lattice-and-dihedral]] — full lattices of $D_n$, $Q_8$, etc.
- [[09-cosets-and-lagranges-theorem]] — cosets of a subgroup, Lagrange's theorem
- [[16-centralizer-normalizer-stabilizer]] — center, centralizer, normalizer
- [[17-homomorphisms-and-isomorphisms]] — kernels as subgroups
