---
title: "Group Actions"
type: guide
co: CO3
related: [13-burnsides-theorem, 16-centralizer-normalizer-stabilizer, 17-homomorphisms-and-isomorphisms]
---

# 15. Group Actions

A **group action** is how a group "does something" to a set. It formalizes the idea that a group is fundamentally a collection of symmetries or transformations acting on some structure. This is one of the most fertile concepts in algebra: it unifies permutation groups, symmetry groups, linear representations, conjugation, and many number-theoretic phenomena into one framework.

This chapter develops the full theory — actions, orbits, stabilizers, orbit-stabilizer theorem, and Cayley's theorem. We also explore several standard actions (translation, conjugation, on cosets) that recur throughout the rest of CO3.

## 15.1 Definition and Examples

> **Definition 15.1.** A **(left) action** of a group $G$ on a set $X$ is a function $\cdot: G \times X \to X$, written $(g, x) \mapsto g \cdot x$, satisfying:
>
> 1. **Identity:** $e \cdot x = x$ for all $x \in X$.
> 2. **Compatibility:** $(gh) \cdot x = g \cdot (h \cdot x)$ for all $g, h \in G$, $x \in X$.

**Equivalent formulation.** An action corresponds to a homomorphism $\varphi: G \to \operatorname{Sym}(X)$:
$$g \mapsto \varphi(g): X \to X,\quad \varphi(g)(x) = g \cdot x.$$
Each $\varphi(g)$ is a bijection (its inverse is $\varphi(g^{-1})$).

> **Definition 15.2.** The **kernel** of the action is $\ker \varphi = \{g \in G : g \cdot x = x \text{ for all } x \in X\}$. An action is **faithful** if $\ker \varphi = \{e\}$ (the homomorphism is injective).

### Examples

**Example 1 (Trivial action).** $g \cdot x = x$ for all $g, x$. The homomorphism is trivial. Kernel = $G$.

**Example 2 (Regular action).** $G$ acts on itself by left translation: $g \cdot h = gh$. This is faithful because $g \cdot e = g$, so distinct $g$ give distinct actions.

**Example 3 (Conjugation).** $G$ acts on itself by $g \cdot h = ghg^{-1}$. Verify: $e \cdot h = h$ and $(g_1 g_2) \cdot h = g_1 g_2 h (g_1 g_2)^{-1} = g_1 (g_2 h g_2^{-1}) g_1^{-1} = g_1 \cdot (g_2 \cdot h)$. ✓

**Example 4 (Action on cosets).** Let $H \le G$. $G$ acts on $G/H$ (left cosets) by $g \cdot (aH) = (ga)H$. Verify similar to above.

**Example 5 ($S_n$ on $\{1, \ldots, n\}$).** The natural action: $\sigma \cdot i = \sigma(i)$.

**Example 6 ($D_n$ on vertices of $n$-gon).** Rotations and reflections permute vertices.

**Example 7 ($GL_n(\mathbb{R})$ on $\mathbb{R}^n$).** Invertible matrices act on vectors by multiplication: $A \cdot v = Av$.

## 15.2 Orbits and Stabilizers

> **Definition 15.3 (Orbit).** For $x \in X$, the **orbit** of $x$ is
> $$G \cdot x = \{g \cdot x : g \in G\} \subseteq X.$$

> **Definition 15.4 (Stabilizer).** The **stabilizer** of $x$ is
> $$G_x = \operatorname{Stab}_G(x) = \{g \in G : g \cdot x = x\} \le G.$$

**Proposition 15.5.** $G_x$ is a subgroup of $G$.

*Proof.* $e \in G_x$ trivially. Closure: if $g, h \in G_x$, then $(gh) \cdot x = g \cdot (h \cdot x) = g \cdot x = x$. Inverses: if $g \cdot x = x$, then $x = e \cdot x = (g^{-1}g) \cdot x = g^{-1} \cdot x$. $\blacksquare$

> **Proposition 15.6 (Orbits partition $X$).** The relation $x \sim y \iff y \in G \cdot x$ is an equivalence relation on $X$. Hence distinct orbits partition $X$.

*Proof.*
- Reflexive: $x = e \cdot x$, so $x \in G \cdot x$.
- Symmetric: if $y = g \cdot x$, then $x = g^{-1} \cdot y$.
- Transitive: if $y = g \cdot x$ and $z = h \cdot y$, then $z = h \cdot (g \cdot x) = (hg) \cdot x$. $\blacksquare$

**Example 8.** For $\mathbb{Z}$ acting on itself by $n \cdot m = n + m$ (translation): every orbit is all of $\mathbb{Z}$. One orbit.

**Example 9.** For $\mathbb{Z}/6\mathbb{Z}$ acting on $\{1, 2, 3, 4, 5, 6\}$ by the cyclic permutation $\sigma = (1\,2\,3\,4\,5\,6)$ (so $1 \cdot i = \sigma(i)$): one orbit, namely the full set.

**Example 10.** For $\mathbb{Z}_3 = \langle \sigma \rangle$ with $\sigma = (1\,2\,3) \in S_6$ acting on $\{1, 2, 3, 4, 5, 6\}$: orbits are $\{1, 2, 3\}$ and $\{4\}, \{5\}, \{6\}$. Four orbits.

## 15.3 Orbit-Stabilizer Theorem

This is the most important tool in the theory.

> **Theorem 15.7 (Orbit-Stabilizer).** Let $G$ act on $X$, $x \in X$, $G$ finite. Then
> $$|G \cdot x| = [G : G_x] = \frac{|G|}{|G_x|}.$$
>
> More precisely, there is a bijection $G/G_x \leftrightarrow G \cdot x$ given by $gG_x \mapsto g \cdot x$.

*Proof.* Define $f: G/G_x \to G \cdot x$ by $f(gG_x) = g \cdot x$.

**Well-defined.** If $gG_x = g'G_x$, then $g^{-1}g' \in G_x$, so $(g^{-1}g') \cdot x = x$, hence $g' \cdot x = g \cdot x$.

**Injective.** If $g \cdot x = g' \cdot x$, then $(g^{-1}g') \cdot x = x$, so $g^{-1}g' \in G_x$, i.e., $gG_x = g'G_x$.

**Surjective.** Every element of $G \cdot x$ is of the form $g \cdot x = f(gG_x)$.

Hence $|G \cdot x| = |G/G_x| = |G|/|G_x|$ (for finite $G$). $\blacksquare$

### Immediate consequence — Lagrange-like counting

> **Corollary 15.8.** For $G$ finite acting on $X$:
> - $|G \cdot x|$ divides $|G|$.
> - $|X| = \sum_{\text{orbits}} |G \cdot x_i|$ where $x_i$ is a representative of each orbit.

**Example 11.** $D_4$ acts on the 4 vertices of a square. The action is transitive (one orbit), so $|D_4 \cdot v| = 4$, and $|\operatorname{Stab}(v)| = 8/4 = 2$. Indeed, the stabilizer of a vertex is $\{e, \text{reflection through that vertex}\}$.

**Example 12.** $S_4$ acts on unordered pairs of elements of $\{1, 2, 3, 4\}$. There are $\binom{4}{2} = 6$ pairs, and the action is transitive. So $|S_4|/|\operatorname{Stab}(\{1,2\})| = 6$, i.e., stabilizer order $= 24/6 = 4$. Indeed, $\operatorname{Stab}(\{1,2\}) = \{e, (1\,2), (3\,4), (1\,2)(3\,4)\}$ of order 4.

## 15.4 Cayley's Theorem

> **Theorem 15.9 (Cayley).** Every group $G$ is isomorphic to a subgroup of a permutation group (specifically, of $\operatorname{Sym}(G)$). In particular, every finite group of order $n$ embeds into $S_n$.

*Proof.* Consider the regular action of $G$ on itself: $\varphi: G \to \operatorname{Sym}(G)$ by $\varphi(g)(h) = gh$.

**Homomorphism.** $\varphi(gg')(h) = (gg')h = g(g'h) = \varphi(g)(\varphi(g')(h)) = (\varphi(g) \circ \varphi(g'))(h)$.

**Injective.** If $\varphi(g) = \operatorname{id}$, then $gh = h$ for all $h$, so $g = e$. Hence $\ker \varphi = \{e\}$.

By First Isomorphism Theorem (cf.\ [[18-isomorphism-theorems]]), $G \cong \operatorname{Image}(\varphi) \le \operatorname{Sym}(G) \cong S_{|G|}$. $\blacksquare$

**Historical significance.** Cayley's theorem shows that permutation groups are "universal" — any group is a permutation group. But in practice, $S_n$ is enormous (order $n!$) and the embedding is wasteful — we rarely use the regular action for structural computations. Rather, Cayley's theorem unifies the definition of groups as symmetry groups.

**Example 13.** $\mathbb{Z}_3 = \{0, 1, 2\}$. The regular action: $g \cdot h = g + h \pmod 3$. Embedding into $S_3$:
- $0 \mapsto e$
- $1 \mapsto (0\,1\,2)$
- $2 \mapsto (0\,2\,1)$

Image is $A_3 \le S_3$, a cyclic subgroup of order 3.

## 15.5 Conjugation Action

Let $G$ act on itself by conjugation: $g \cdot h = ghg^{-1}$.

> **Definition 15.10.** The **orbit of $h$** under conjugation is the **conjugacy class** of $h$:
> $$\operatorname{cl}(h) = \{ghg^{-1} : g \in G\}.$$

> **Definition 15.11.** The **stabilizer of $h$** under conjugation is the **centralizer**:
> $$C_G(h) = \{g \in G : gh = hg\}.$$

> **Corollary 15.12 (Class equation).** For a finite group $G$:
> $$|G| = |Z(G)| + \sum_i [G : C_G(h_i)],$$
> where the sum is over non-central conjugacy class representatives $h_i$.

(Elements in $Z(G)$ have singleton orbits; others have $|\operatorname{cl}(h_i)| = [G : C_G(h_i)]$ by orbit-stabilizer.)

The class equation is a powerful tool — see [[16-centralizer-normalizer-stabilizer]].

## 15.6 Action on Cosets

Let $H \le G$. $G$ acts on the left cosets $G/H$ by $g \cdot (aH) = (ga)H$. This gives a homomorphism
$$\varphi: G \to \operatorname{Sym}(G/H).$$

> **Theorem 15.13.** $\ker \varphi = \bigcap_{g \in G} gHg^{-1}$, the largest normal subgroup of $G$ contained in $H$ (the **normal core** of $H$).

*Proof.* $g \in \ker \varphi$ iff $gaH = aH$ for all $a \in G$ iff $a^{-1}ga \in H$ for all $a$ iff $g \in aHa^{-1}$ for all $a$ iff $g \in \bigcap_a aHa^{-1}$. $\blacksquare$

> **Corollary 15.14 (Index theorem).** If $H \le G$ with $[G : H] = n$, then $G$ has a normal subgroup $N$ with $N \le H$ and $[G : N]$ dividing $n!$.

*Proof.* The homomorphism $\varphi: G \to S_n$ has kernel $N = \ker \varphi \le H$, and $|G/N|$ divides $|S_n| = n!$. $\blacksquare$

**Application.** If $G$ is a group of order $< 60$ and $H$ has small index, this bounds possible $G$ strongly.

## 15.7 Transitive and Regular Actions

> **Definition 15.15.** An action is **transitive** if there is a single orbit, i.e., for all $x, y \in X$, there exists $g \in G$ with $g \cdot x = y$.

> **Definition 15.16.** An action is **regular** (or **simply transitive**) if it is transitive and every stabilizer is trivial, i.e., $g \cdot x = x \Rightarrow g = e$.

> **Proposition 15.17.** For a transitive action, the following are equivalent:
> 1. The action is regular.
> 2. $|X| = |G|$.
> 3. Some stabilizer is trivial.
> 4. The action is isomorphic to the regular action $G$ on itself by translation.

(Equivalence 2↔3 uses orbit-stabilizer.)

**Example 14.** $G$ on itself by translation: regular.

**Example 15.** $S_n$ on $\{1, \ldots, n\}$: transitive but not regular (stabilizer of $i$ is $S_{n-1}$).

## 15.8 Counting with Orbit-Stabilizer

Several classical counts become one-liners.

> **Proposition 15.18.** The number of ways to arrange $n$ people at a round table (cyclic permutations equivalent) is $(n-1)!$.

*Proof.* $S_n$ acts on the $n!$ linear arrangements, but equivalences under cyclic rotation cut down by a factor of $n$. Specifically, $\mathbb{Z}_n$ acts on arrangements; each orbit has size $n$ (trivial stabilizer), so orbit count = $n!/n = (n-1)!$. $\blacksquare$

> **Proposition 15.19.** The number of necklaces with $n$ distinct beads (arrangement up to rotation and reflection) is $(n-1)!/2$ for $n \ge 3$.

*Proof.* $D_n$ acts on $n!$ linear arrangements. Stabilizers are trivial for distinct beads, so orbit count = $n!/(2n) = (n-1)!/2$. $\blacksquare$

## 15.9 Practice Problems

**Problem 1.** Show that for any action of $G$ on $X$, orbits are either equal or disjoint.

**Problem 2.** Let $G$ act on $X$ with a fixed point $x$ (i.e., $G_x = G$). Show that $X = \{x\} \cup Y$ for some $G$-invariant subset $Y$.

**Problem 3.** $G = \mathbb{Z}_6$ acts on $X = \{1, 2, 3, 4, 5, 6\}$ by $k \cdot i \equiv i + k \pmod 6$ (with results in $\{1, \ldots, 6\}$). Find orbits, stabilizers, and verify orbit-stabilizer.

**Problem 4.** Find the stabilizer of the pair $\{1, 2\}$ under $S_4$'s natural action on pairs. Compute the orbit size.

**Problem 5.** $GL_2(\mathbb{R})$ acts on $\mathbb{R}^2 \setminus \{0\}$ by matrix-vector multiplication. Is this action transitive? What is the stabilizer of $(1, 0)$?

**Problem 6.** Show that if $G$ acts on $X$ and $H \le G$, then $H$ also acts on $X$ by restriction. How do the orbits compare?

**Problem 7.** Let $G$ be a group of order 15 acting on a set of 7 elements. Show that the action has a fixed point.

### Solutions

**1.** If $G \cdot x \cap G \cdot y \neq \emptyset$, pick $z = g \cdot x = h \cdot y$. Then $x = g^{-1}h \cdot y \in G \cdot y$, so $G \cdot x \subseteq G \cdot y$. Symmetrically, $G \cdot y \subseteq G \cdot x$. $\blacksquare$

**2.** $\{x\}$ is an orbit (since $G_x = G$, the orbit is $\{g \cdot x = x\}$). The other orbits form $Y$, which is $G$-invariant. $\blacksquare$

**3.** $\mathbb{Z}_6$ acts transitively on $\{1, \ldots, 6\}$: one orbit. Stabilizer of each $i$ is trivial (only $k = 0$ fixes $i$). Orbit-stabilizer: $|\mathbb{Z}_6|/|\operatorname{Stab}(i)| = 6/1 = 6$ = orbit size ✓. $\blacksquare$

**4.** $\operatorname{Stab}(\{1,2\}) = \{\sigma \in S_4 : \sigma(\{1,2\}) = \{1,2\}\} = \{e, (1\,2), (3\,4), (1\,2)(3\,4)\}$ of order 4. Orbit size = $24/4 = 6$, matching $\binom{4}{2} = 6$ pairs. $\boxed{\text{Orbit size 6, stabilizer order 4}}$

**5.** Transitive: given $v, w$ nonzero, pick a matrix sending $v$ to $w$ (extend to basis). $\operatorname{Stab}((1,0))$: matrices $\begin{pmatrix} 1 & a \\ 0 & d \end{pmatrix}$ with $d \neq 0$. This is the upper triangular group stabilizing the first basis vector, isomorphic to $\mathbb{R} \rtimes \mathbb{R}^\times$. $\blacksquare$

**6.** Restriction is trivially an action (just restrict the action map). $H$-orbits are contained in $G$-orbits and refine them: each $G$-orbit partitions into one or more $H$-orbits.

**7.** If no fixed point, every orbit has size $> 1$. Orbit sizes divide $|G| = 15$, so each orbit has size 1, 3, 5, or 15. Orbits of size 15 can't fit in a 7-element set. So orbits have size 3 or 5. But $3 + 5 = 8 > 7$ and neither 3 nor 5 alone divides 7. Actually: the total must sum to 7. Possible partitions: $3 + \ldots$ or $5 + \ldots$. Neither $3k = 7$ nor $5k = 7$ works, and $3a + 5b = 7$ with $a, b \ge 1$ has no solution. So some orbit must have size 1, i.e., a fixed point exists. $\blacksquare$

## Related Concepts

- [[13-burnsides-theorem]] — counting orbits via fixed points
- [[16-centralizer-normalizer-stabilizer]] — conjugation action in detail, class equation
- [[17-homomorphisms-and-isomorphisms]] — Cayley's theorem uses homomorphism basics
- [[18-isomorphism-theorems]] — quotient constructions from action kernels

---

*Last updated: 2026-04-18*
