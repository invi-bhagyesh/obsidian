---
title: "Group Actions"
type: guide
co: CO3
related: [13-burnsides-theorem, 16-centralizer-normalizer-stabilizer, 17-homomorphisms-and-isomorphisms]
---

# 15. Group Actions

A **group action** is how a group "does something" to a set. It formalises the idea that a group is fundamentally a collection of symmetries or transformations acting on some structure. This is one of the most fertile concepts in algebra: it unifies permutation groups, symmetry groups, linear representations, conjugation, and many number-theoretic phenomena into one framework.

This chapter develops the full theory — actions, orbits, stabilisers, the orbit–stabiliser theorem, and Cayley's theorem. We also explore several standard actions (translation, conjugation, on cosets) that recur throughout the rest of CO3.

> **Why actions matter.** A group $G$ in isolation is an abstract algebraic object. An action realises $G$ concretely as symmetries of a set $X$, giving us a geometric/combinatorial handle. Most deep theorems about finite groups — Sylow, Burnside, Cauchy, the class equation — are proved by picking a clever action.

---

## 15.1 Definition and Examples

> **Definition 15.1 (Left action).** A **(left) action** of a group $G$ on a set $X$ is a function
> $$\cdot : G \times X \longrightarrow X, \qquad (g, x) \longmapsto g \cdot x,$$
> satisfying:
>
> 1. **Identity:** $e \cdot x = x$ for all $x \in X$.
> 2. **Compatibility (associativity with the group law):** $(gh) \cdot x = g \cdot (h \cdot x)$ for all $g, h \in G$ and $x \in X$.
>
> When such a function exists we say that $G$ **acts on** $X$ and that $X$ is a **$G$-set**.

**Reading the axioms.** Axiom 1 says the identity element does nothing. Axiom 2 says that applying $h$ then $g$ is the same as applying the single element $gh$. The two axioms together are exactly what it takes for "$g\cdot{-}$" to behave like a *function composition*.

**Right actions.** One can also define right actions $x \cdot g$ with $(x \cdot g)\cdot h = x \cdot (gh)$. Every left action induces a right action via $x \ast g := g^{-1}\cdot x$, so the distinction is a convention; we work with left actions throughout.

### The homomorphism–action correspondence

> **Theorem 15.2 (Actions $\leftrightarrow$ homomorphisms).** Let $G$ be a group and $X$ a set. There is a natural bijection between
>
> $$\{\text{left actions of } G \text{ on } X\} \;\longleftrightarrow\; \{\text{homomorphisms } \varphi : G \to \operatorname{Sym}(X)\}.$$

*Proof.* We construct maps in both directions and show they are mutually inverse.

**Step 1 — From an action to a homomorphism.** Suppose $\cdot : G \times X \to X$ is an action. For each $g \in G$ define
$$\varphi_g : X \longrightarrow X, \qquad \varphi_g(x) = g\cdot x.$$

*(a) Each $\varphi_g$ is a bijection.* We show $\varphi_g$ has a two-sided inverse, namely $\varphi_{g^{-1}}$. For any $x \in X$:
$$(\varphi_{g^{-1}} \circ \varphi_g)(x) = \varphi_{g^{-1}}(g\cdot x) = g^{-1}\cdot(g\cdot x) \stackrel{(*)}{=} (g^{-1}g)\cdot x = e\cdot x = x,$$
where $(*)$ uses axiom 2. Hence $\varphi_{g^{-1}} \circ \varphi_g = \mathrm{id}_X$. Symmetrically $\varphi_g \circ \varphi_{g^{-1}} = \mathrm{id}_X$. Therefore $\varphi_g \in \operatorname{Sym}(X)$ with $\varphi_g^{-1} = \varphi_{g^{-1}}$.

*(b) $\varphi : G \to \operatorname{Sym}(X)$, $g\mapsto \varphi_g$, is a homomorphism.* For $g,h\in G$ and $x \in X$,
$$\varphi_{gh}(x) = (gh)\cdot x \stackrel{\text{ax.\,2}}{=} g\cdot(h\cdot x) = \varphi_g(\varphi_h(x)) = (\varphi_g \circ \varphi_h)(x).$$
As this holds for every $x$, we get $\varphi_{gh} = \varphi_g \circ \varphi_h$, i.e. $\varphi$ respects the group operation (composition is the operation on $\operatorname{Sym}(X)$).

**Step 2 — From a homomorphism to an action.** Suppose $\varphi : G \to \operatorname{Sym}(X)$ is a homomorphism. Define
$$g\cdot x := \varphi(g)(x).$$

*(a) Axiom 1.* $\varphi(e) = \mathrm{id}_X$ because $\varphi$ is a homomorphism and homomorphisms send identity to identity. Hence $e\cdot x = \mathrm{id}_X(x) = x$.

*(b) Axiom 2.* Because $\varphi(gh) = \varphi(g)\circ \varphi(h)$,
$$(gh)\cdot x = \varphi(gh)(x) = \varphi(g)(\varphi(h)(x)) = \varphi(g)(h\cdot x) = g\cdot(h\cdot x).$$

So $\cdot$ is indeed a left action.

**Step 3 — The two constructions are mutually inverse.** Starting from an action, forming $\varphi$, then the induced action $g\cdot'x = \varphi(g)(x) = \varphi_g(x) = g\cdot x$ recovers the original. Conversely, starting from $\varphi$, forming the action $g\cdot x = \varphi(g)(x)$, and then reading off the homomorphism via $g\mapsto\varphi_g$ gives back $\varphi$ itself. $\blacksquare$

**Interpretive remark.** Theorem 15.2 is not merely notational repackaging — it is structural. It says:
$$\text{"$G$ acts on $X$"} \quad\equiv\quad \text{"$G$ is realised (up to a map) as a group of symmetries of $X$."}$$
Consequently, questions about actions translate to questions about subgroups of $\operatorname{Sym}(X)$, and vice versa. This duality is used constantly.

> **Definition 15.3 (Kernel, faithful action).** The **kernel** of the action is
> $$\ker \varphi = \{g \in G : g \cdot x = x \text{ for all } x \in X\}.$$
> An action is **faithful** if $\ker \varphi = \{e\}$; equivalently, the homomorphism $\varphi$ is injective.

*Why this makes sense.* $g \in \ker\varphi$ means $\varphi_g = \mathrm{id}_X$, i.e. $g$ acts trivially on every point. A faithful action loses no information: the group is fully "seen" by its action.

### Examples

**Example 1 (Trivial action).** Define $g\cdot x = x$ for all $g, x$.

*Verification.* Axiom 1: $e\cdot x = x$ ✓. Axiom 2: $(gh)\cdot x = x = g\cdot(h\cdot x)$ ✓.

The corresponding homomorphism is $\varphi(g) = \mathrm{id}_X$ for all $g$, so $\ker\varphi = G$. The action is faithful iff $G = \{e\}$.

**Example 2 (Regular action / left translation).** $G$ acts on itself by $g\cdot h := gh$.

*Verification.* Axiom 1: $e\cdot h = eh = h$ ✓. Axiom 2: $(gg')\cdot h = (gg')h \stackrel{\text{assoc.}}{=} g(g'h) = g\cdot(g'\cdot h)$ ✓.

*Faithfulness.* If $g\cdot h = h$ for all $h$, take $h = e$: $g = ge = e$. So $\ker = \{e\}$ and the action is faithful. (This is the content of the proof of Cayley's theorem below.)

**Example 3 (Conjugation).** $G$ acts on itself by $g\cdot h := ghg^{-1}$.

*Verification.*
- **Axiom 1:** $e\cdot h = e h e^{-1} = h$ ✓.
- **Axiom 2:** We expand $(g_1 g_2)\cdot h$:
$$(g_1 g_2)\cdot h = (g_1 g_2)\, h\, (g_1 g_2)^{-1} = g_1 g_2 h\, g_2^{-1} g_1^{-1}$$
(using $(g_1 g_2)^{-1} = g_2^{-1} g_1^{-1}$ — the socks-shoes rule). Now rebracket using associativity:
$$= g_1\,(g_2 h g_2^{-1})\, g_1^{-1} = g_1 \cdot (g_2 \cdot h). \checkmark$$

*Remark.* Note that we needed the inverses — left translation "$g\cdot h = gh$" and the putative "$g\cdot h = ghg$" would fail axiom 2 in general.

**Example 4 (Action on cosets).** Let $H \le G$ and let $G/H = \{aH : a \in G\}$ be the set of left cosets. Define
$$g\cdot (aH) := (ga)H.$$

*Well-defined?* If $aH = a'H$ then $a' = ah$ for some $h \in H$, whence $(ga')H = (gah)H = (ga)(hH) = (ga)H$ (since $hH = H$). ✓

*Axiom 1:* $e\cdot(aH) = (ea)H = aH$ ✓.

*Axiom 2:* $(g_1 g_2)\cdot (aH) = (g_1 g_2 a)H \stackrel{\text{assoc.}}{=} g_1\cdot((g_2 a)H) = g_1 \cdot (g_2 \cdot (aH))$ ✓.

**Example 5 ($S_n$ on $\{1,\ldots,n\}$).** The natural action: $\sigma\cdot i := \sigma(i)$.

*Verification.* Axiom 1: $\mathrm{id}(i) = i$ ✓. Axiom 2: $(\sigma\tau)(i) = \sigma(\tau(i)) = \sigma\cdot(\tau\cdot i)$ — this is the definition of composition of functions ✓.

*Faithfulness.* If $\sigma(i) = i$ for all $i\in\{1,\ldots,n\}$ then $\sigma = \mathrm{id}$; so faithful.

**Example 6 ($D_n$ on the vertices of a regular $n$-gon).** The group $D_n$ (order $2n$) consists of rotations $r^k$ (by $2\pi k/n$) and reflections $sr^k$. Each such isometry permutes the $n$ vertices.

*Verification.* The action is by the natural inclusion $D_n \hookrightarrow S_n$. Faithful, since an isometry of the plane that fixes three non-collinear points is the identity — and $n\ge 3$ vertices are non-collinear.

**Example 7 ($GL_n(\mathbb{R})$ on $\mathbb{R}^n$).** $A\cdot v := Av$ (matrix–vector product).

*Verification.* Axiom 1: $I v = v$ ✓. Axiom 2: $(AB)v = A(Bv)$ (associativity of matrix multiplication) ✓.

*Faithfulness.* If $Av = v$ for all $v\in\mathbb{R}^n$ then $A = I$ (apply to the standard basis). So faithful.

---

## 15.2 Orbits and Stabilisers

> **Definition 15.4 (Orbit).** For $x \in X$, the **orbit** of $x$ is
> $$G \cdot x := \{g \cdot x : g \in G\} \subseteq X.$$
> Sometimes written $\mathrm{Orb}_G(x)$ or $Gx$.

The orbit is "everywhere $x$ can be moved to" under the action.

> **Definition 15.5 (Stabiliser).** The **stabiliser** of $x$ is
> $$G_x = \operatorname{Stab}_G(x) := \{g \in G : g \cdot x = x\} \subseteq G.$$

The stabiliser is "the set of elements that leave $x$ alone."

**Proposition 15.6.** $G_x$ is a subgroup of $G$.

*Proof.* We verify the three subgroup criteria.

1. **Identity.** $e\cdot x = x$ by axiom 1, so $e \in G_x$.
2. **Closure.** Let $g, h \in G_x$, so $g\cdot x = x$ and $h\cdot x = x$. Then
$$(gh)\cdot x \stackrel{\text{ax.\,2}}{=} g\cdot (h\cdot x) = g\cdot x = x.$$
Hence $gh \in G_x$.
3. **Inverses.** If $g\in G_x$ then $g\cdot x = x$. Apply $g^{-1}$:
$$x = e\cdot x = (g^{-1}g)\cdot x = g^{-1}\cdot (g\cdot x) = g^{-1}\cdot x.$$
So $g^{-1}\cdot x = x$, i.e. $g^{-1}\in G_x$. $\blacksquare$

*Sanity check.* Since $G_x$ contains $e$ it is non-empty, and the closure and inverse properties mean it is a subgroup — no separate check of associativity is required (inherited from $G$).

> **Proposition 15.7 (Orbits partition $X$).** The relation on $X$ defined by
> $$x \sim y \iff y \in G\cdot x \iff \exists g \in G : y = g\cdot x$$
> is an equivalence relation. Hence distinct orbits partition $X$.

*Proof.* We verify the three properties.

1. **Reflexive.** $x = e\cdot x$, so $x \in G\cdot x$, i.e. $x \sim x$.
2. **Symmetric.** Suppose $x \sim y$, so $y = g\cdot x$ for some $g \in G$. Apply $g^{-1}$:
$$g^{-1}\cdot y = g^{-1}\cdot(g\cdot x) = (g^{-1}g)\cdot x = e\cdot x = x.$$
So $x = g^{-1}\cdot y \in G\cdot y$, i.e. $y \sim x$.
3. **Transitive.** If $y = g\cdot x$ and $z = h\cdot y$, then
$$z = h\cdot y = h\cdot(g\cdot x) = (hg)\cdot x \in G\cdot x.$$

Any equivalence relation partitions its underlying set into equivalence classes; the classes here are precisely the orbits. $\blacksquare$

**Corollary.** For any two orbits, either they are equal or disjoint. See Practice Problem 1 below for a self-contained proof not using the equivalence relation.

### Examples

**Example 8 ($\mathbb{Z}$ translating itself).** $n\cdot m = n + m$.

*Orbits.* Given any $m \in \mathbb{Z}$, for any $k\in\mathbb{Z}$ we have $k = (k-m)+m \in \mathbb{Z}\cdot m$. So $\mathbb{Z}\cdot m = \mathbb{Z}$, and there is a single orbit. The action is **transitive**.

*Stabilisers.* $n\cdot m = m \iff n + m = m \iff n = 0$. So every stabiliser is trivial. The action is **regular** (to be defined below).

**Example 9 ($\mathbb{Z}/6\mathbb{Z}$ on $\{1,2,3,4,5,6\}$ by a 6-cycle).** Let $\sigma = (1\,2\,3\,4\,5\,6)$ and let $k\cdot i = \sigma^k(i)$.

*Axioms.* $0\cdot i = \sigma^0(i) = i$ ✓. $(j+k)\cdot i = \sigma^{j+k}(i) = \sigma^j(\sigma^k(i)) = j\cdot(k\cdot i)$ ✓ (powers of a single element commute, so the ambiguity between additive and cyclic indices disappears).

*Orbits.* Starting from $1$: $1\to 2\to 3\to 4\to 5\to 6\to 1$. So $\mathbb{Z}/6\cdot 1 = \{1,\ldots,6\}$, the whole set.

*Stabilisers.* $k\cdot i = i \iff \sigma^k(i) = i$. Since $\sigma$ is a 6-cycle it has no fixed points for $k \not\equiv 0\pmod 6$. So every stabiliser is $\{0\}$, trivial.

**Example 10 ($\mathbb{Z}_3 = \langle \sigma\rangle$ with $\sigma = (1\,2\,3)$, acting on $\{1,\ldots,6\}$).**

*Orbits.*
- $\{1,2,3\}$ is one orbit: $1\to 2\to 3\to 1$.
- $\{4\}$ is its own orbit (fixed by all of $\mathbb{Z}_3$).
- $\{5\}$ and $\{6\}$ likewise.

Four orbits total; orbit sizes $3, 1, 1, 1$.

*Stabilisers.* For $i \in \{1,2,3\}$, $\operatorname{Stab}(i) = \{e\}$ (trivial, orbit has size 3). For $i\in\{4,5,6\}$, $\operatorname{Stab}(i) = \mathbb{Z}_3$ (the full group, orbit has size 1). Orbit-stabiliser: $|\mathbb{Z}_3|/|\operatorname{Stab}(i)| = 3/1 = 3$ or $3/3 = 1$ — matches ✓.

---

## 15.3 The Orbit–Stabiliser Theorem

This is the single most important computational tool in the theory.

> **Theorem 15.8 (Orbit–Stabiliser).** Let $G$ act on $X$ and let $x \in X$. There is a bijection
> $$f : G/G_x \longrightarrow G \cdot x, \qquad f(gG_x) = g\cdot x$$
> between left cosets of the stabiliser and points of the orbit. In particular, if $G$ is finite then
> $$|G\cdot x| = [G : G_x] = \frac{|G|}{|G_x|}.$$

*Proof.* We must check that $f$ is a well-defined bijection; from there, counting gives the formula.

**Step 1 — $f$ is well-defined.** Suppose $gG_x = g'G_x$. Then $g^{-1}g' \in G_x$, so
$$(g^{-1}g')\cdot x = x.$$
Applying $g$ on the left:
$$g'\cdot x = g\cdot((g^{-1}g')\cdot x) = g\cdot x.$$
So $f$ assigns the same value no matter which coset representative we choose. ✓

**Step 2 — $f$ is injective.** Suppose $f(gG_x) = f(g'G_x)$, i.e. $g\cdot x = g'\cdot x$. Then
$$(g^{-1}g')\cdot x = g^{-1}\cdot(g'\cdot x) = g^{-1}\cdot(g\cdot x) = (g^{-1}g)\cdot x = x.$$
So $g^{-1}g' \in G_x$, hence $gG_x = g'G_x$.

**Step 3 — $f$ is surjective.** Any element of $G\cdot x$ is, by definition, of the form $g\cdot x$ for some $g\in G$. But $g\cdot x = f(gG_x)$, so that element is in the image.

**Step 4 — Counting.** If $G$ is finite, a bijection of finite sets gives $|G\cdot x| = |G/G_x| = [G:G_x] = |G|/|G_x|$. $\blacksquare$

**Verification on Example 10.** $|\mathbb{Z}_3| = 3$. For $i = 1$: $|\operatorname{Stab}(1)| = 1$, so orbit size $= 3/1 = 3$ ✓. For $i = 4$: $|\operatorname{Stab}(4)| = 3$, so orbit size $= 3/3 = 1$ ✓.

**Interpretive remark.** The bijection itself is more informative than the count: it gives a *canonical* way to parametrise the orbit of $x$ by cosets of its stabiliser. This is the start of the representation-theoretic identification "$G/H$ carries a transitive $G$-action, and every transitive $G$-set arises this way."

### Immediate consequences

> **Corollary 15.9 (Lagrange-like counting).** If $G$ is finite and acts on $X$:
> 1. $|G\cdot x|$ divides $|G|$ for every $x \in X$.
> 2. $|X| = \sum_i |G\cdot x_i|$ where $x_1, x_2, \ldots$ are representatives of the distinct orbits.

*Proof.* (1) is immediate from Theorem 15.8. (2) follows because orbits partition $X$ (Proposition 15.7). $\blacksquare$

### Worked examples

**Example 11 ($D_4$ on vertices of a square).**

*Setup.* $D_4 = \langle r, s \mid r^4 = s^2 = e,\; srs = r^{-1}\rangle$ of order $8$ acts on the 4 vertices of the square.

*Strategy.* Compute the orbit of a single vertex and use orbit–stabiliser.

*Computation.* The rotation $r$ cycles all four vertices, so the orbit of any vertex is all of $\{v_1, v_2, v_3, v_4\}$: one orbit of size $4$. By Theorem 15.8,
$$|\operatorname{Stab}(v)| = |D_4|/|D_4\cdot v| = 8/4 = 2.$$

*Verification.* What are the two symmetries of the square fixing (say) $v_1$? The identity, and the reflection through the diagonal through $v_1$. So $\operatorname{Stab}(v_1) = \{e, \text{diagonal reflection through }v_1\}$, order $2$ ✓.

*Interpretation.* Because $D_4$ is generated by $r$ (of order 4, cycling vertices) and $s$ (of order 2, fixing $v_1$), the semidirect structure matches the orbit–stabiliser factorisation.

**Example 12 ($S_4$ on unordered pairs).**

*Setup.* $S_4$ acts on $X = \binom{\{1,2,3,4\}}{2}$, the set of unordered pairs. $|X| = \binom{4}{2} = 6$.

*Strategy.* The natural action on $\{1,2,3,4\}$ makes $S_4$ permute any combinatorial structure built from it, including pairs.

*Computation.* The action is transitive: given pairs $\{a,b\}$ and $\{c,d\}$, a suitable permutation sends one to the other (either the identity, a transposition, or a double transposition — see below). So there is a single orbit of size $6$, and by Theorem 15.8:
$$|\operatorname{Stab}(\{1,2\})| = |S_4|/6 = 24/6 = 4.$$

*Explicit stabiliser.* $\sigma \in \operatorname{Stab}(\{1,2\}) \iff \sigma(\{1,2\}) = \{1,2\}$ (as sets, not tuples). The permutations of $\{1,2,3,4\}$ fixing $\{1,2\}$ setwise are:
- $e$ (does nothing);
- $(1\,2)$ (swaps 1 and 2, preserves the pair);
- $(3\,4)$ (fixes 1 and 2, swaps 3 and 4);
- $(1\,2)(3\,4)$ (both).

Four elements ✓. As a group this is $\mathbb{Z}/2 \times \mathbb{Z}/2$, the Klein four-group.

*Sanity check.* Total size: $6 \times 4 = 24 = |S_4|$ ✓ (this is orbit–stabiliser in action).

---

## 15.4 Cayley's Theorem

> **Theorem 15.10 (Cayley, 1854).** Every group $G$ is isomorphic to a subgroup of the symmetric group $\operatorname{Sym}(G)$. In particular, every finite group of order $n$ embeds into $S_n$.

*Proof.* We use the regular action (Example 2): $G$ acts on the set $G$ (itself, as a set) by left translation, $g\cdot h = gh$. Translate this into a homomorphism via Theorem 15.2.

**Step 1 — Define the homomorphism.** Let $\lambda : G \to \operatorname{Sym}(G)$ send $g$ to the bijection $\lambda_g : G \to G$ given by $\lambda_g(h) = gh$. ($\lambda_g$ is indeed a bijection: its inverse is $\lambda_{g^{-1}}$, since $\lambda_{g^{-1}}(\lambda_g(h)) = g^{-1}(gh) = h$.)

**Step 2 — $\lambda$ is a homomorphism.** For $g, g' \in G$ and $h \in G$,
$$\lambda_{gg'}(h) = (gg')h \stackrel{\text{assoc.}}{=} g(g'h) = \lambda_g(g'h) = \lambda_g(\lambda_{g'}(h)) = (\lambda_g \circ \lambda_{g'})(h).$$
Since this holds for all $h$, $\lambda_{gg'} = \lambda_g \circ \lambda_{g'}$, i.e. $\lambda(gg') = \lambda(g)\lambda(g')$ in $\operatorname{Sym}(G)$.

**Step 3 — $\lambda$ is injective.** Suppose $\lambda_g = \mathrm{id}_G$, i.e. $\lambda_g(h) = h$ for all $h \in G$. Take $h = e$: $g = ge = \lambda_g(e) = e$. Hence $g = e$, so $\ker\lambda = \{e\}$ and $\lambda$ is injective.

*Equivalently, the regular action is faithful.* Any $g\ne e$ moves some point (specifically, $g$ moves $e$ to $g\ne e$).

**Step 4 — Conclude.** The injective homomorphism $\lambda : G \hookrightarrow \operatorname{Sym}(G)$ gives an isomorphism $G \cong \operatorname{Image}(\lambda) \le \operatorname{Sym}(G)$ (this is the First Isomorphism Theorem with trivial kernel, cf. [[18-isomorphism-theorems]]). If $|G| = n$ then $\operatorname{Sym}(G) \cong S_n$ by labelling elements of $G$ with $1,\ldots,n$. $\blacksquare$

### Why the regular action is faithful — spelled out

The argument in Step 3 merits amplification. If $\lambda_g(h) = h$ for *all* $h\in G$, then in particular $\lambda_g(e) = e$, i.e. $g\cdot e = e$, i.e. $ge = e$, i.e. $g = e$. This works because $G$ contains its identity and because left multiplication by $g$ "reads off" $g$ when applied to $e$: left multiplication by different elements gives different permutations. This "read off by applying to $e$" trick is a recurring technique in group theory.

**Historical and practical significance.** Cayley's theorem demonstrates that permutation groups are **universal**: every group is a permutation group. However, the embedding into $S_n$ is extremely wasteful ($|S_n| = n!$ versus $|G| = n$), and the image typically lies in a much smaller subgroup. For structural computation one usually uses tailored actions (on cosets, on conjugacy classes, etc.) rather than the regular action. Cayley's theorem should be viewed as a *conceptual* result: it justifies defining groups abstractly by axioms, knowing that any abstract group is "the same as" a concrete group of symmetries.

**Example 13 ($\mathbb{Z}_3$ via Cayley).** $\mathbb{Z}_3 = \{0,1,2\}$ under addition $\pmod 3$.

*Computation.* The regular action: $k\cdot h = k + h \pmod 3$.

- $\lambda_0$: $0\mapsto 0$, $1\mapsto 1$, $2\mapsto 2$. This is $e \in S_3$.
- $\lambda_1$: $0\mapsto 1$, $1\mapsto 2$, $2\mapsto 0$. Cycle notation: $(0\,1\,2)$.
- $\lambda_2$: $0\mapsto 2$, $1\mapsto 0$, $2\mapsto 1$. Cycle notation: $(0\,2\,1)$.

*Image.* $\{e, (0\,1\,2), (0\,2\,1)\}$, which (relabelling $0,1,2 \mapsto 1,2,3$) is $A_3 \le S_3$, the cyclic subgroup of order 3.

*Verification of homomorphism property.* $\lambda_1\circ\lambda_1 = (0\,1\,2)(0\,1\,2) = (0\,2\,1) = \lambda_2$, and indeed $1 + 1 = 2$ in $\mathbb{Z}_3$ ✓.

---

## 15.5 The Conjugation Action

Let $G$ act on itself by **conjugation**: $g\cdot h := ghg^{-1}$ (we verified this is an action in Example 3). This action has a rich structure and motivates central group-theoretic invariants.

> **Definition 15.11 (Conjugacy class).** The orbit of $h \in G$ under conjugation is the **conjugacy class** of $h$:
> $$\operatorname{cl}(h) = \{ghg^{-1} : g \in G\}.$$

> **Definition 15.12 (Centraliser).** The stabiliser of $h \in G$ under conjugation is the **centraliser** of $h$:
> $$C_G(h) = \{g \in G : ghg^{-1} = h\} = \{g \in G : gh = hg\}.$$

The second equality holds because $ghg^{-1} = h \iff gh = hg$ (multiply on the right by $g$).

**Reading this.** The centraliser is the set of elements that commute with $h$. The conjugacy class is the set of elements "similar to" $h$ (in the linear-algebra analogy: similar matrices have the same Jordan form, and under the conjugation action of $GL_n$, conjugacy classes are exactly similarity classes).

**Applying orbit–stabiliser.** By Theorem 15.8,
$$|\operatorname{cl}(h)| = [G : C_G(h)] = \frac{|G|}{|C_G(h)|}$$
for $G$ finite. In particular, the size of every conjugacy class divides $|G|$.

### The class equation

Every element has a conjugacy class, and conjugacy classes partition $G$ (since orbits partition $X$). Observe:
$$h \in Z(G) \iff ghg^{-1} = h\text{ for all }g \iff |\operatorname{cl}(h)| = 1.$$
So elements of the **centre** $Z(G)$ are exactly the elements whose conjugacy class is a singleton.

> **Corollary 15.13 (Class Equation).** For a finite group $G$,
> $$|G| = |Z(G)| + \sum_{i} [G : C_G(h_i)],$$
> where the sum is over a set of representatives $h_i$ of the **non-central** conjugacy classes.

*Proof.* Partition $G$ into conjugacy classes. The classes of size 1 are precisely singletons $\{h\}$ with $h \in Z(G)$; these contribute $|Z(G)|$ in total. Each remaining class has size $[G:C_G(h_i)] > 1$ by orbit–stabiliser. Summing: $|G| = |Z(G)| + \sum_i [G:C_G(h_i)]$. $\blacksquare$

**Power of the class equation.** Because each $[G:C_G(h_i)]$ divides $|G|$ and is $> 1$, the class equation is a strong numerical constraint. For $p$-groups, every non-central class has size a power of $p$ greater than 1, forcing $p \mid |Z(G)|$ — the key step in proving every $p$-group has a non-trivial centre. See [[16-centralizer-normalizer-stabilizer]] for these applications.

---

## 15.6 Action on Cosets

Let $H \le G$ (not necessarily normal). Define $G\cdot (aH) := (ga)H$ on $G/H$ (Example 4). Translate into a homomorphism via Theorem 15.2:
$$\varphi : G \longrightarrow \operatorname{Sym}(G/H).$$
If $[G:H] = n$, we may identify $\operatorname{Sym}(G/H) \cong S_n$.

> **Theorem 15.14.** The kernel of $\varphi$ is
> $$\ker\varphi = \bigcap_{a \in G} aHa^{-1},$$
> which is the largest normal subgroup of $G$ contained in $H$. It is called the **normal core** of $H$ in $G$, written $\mathrm{Core}_G(H)$.

*Proof.* We unpack the condition "$g \in \ker\varphi$" step by step.
\begin{align*}
 g \in \ker\varphi
 &\iff \varphi(g) = \mathrm{id}_{G/H}\\
 &\iff g\cdot(aH) = aH \quad \text{for all } a \in G\\
 &\iff (ga)H = aH \quad \text{for all } a\\
 &\iff a^{-1}(ga)H = H \quad \text{for all } a \text{ (left-multiply by } a^{-1})\\
 &\iff a^{-1}ga \in H \quad \text{for all } a\\
 &\iff g \in aHa^{-1} \quad \text{for all } a\\
 &\iff g \in \textstyle\bigcap_{a\in G} aHa^{-1}.
\end{align*}

*Normality of the intersection.* Let $N = \bigcap_a aHa^{-1}$. For any $b \in G$:
$$bNb^{-1} = b\left(\bigcap_a aHa^{-1}\right)b^{-1} = \bigcap_a (ba)H(ba)^{-1} = \bigcap_{a'} a'Ha'^{-1} = N,$$
where $a' = ba$ reparametrises the intersection. So $N$ is normal. $N \subseteq H$ (take $a = e$).

*Maximality.* If $K \trianglelefteq G$ with $K \le H$, then $aKa^{-1} = K \le H$ for all $a$, so $K \le aHa^{-1}$ for all $a$, hence $K \le N$. $\blacksquare$

> **Corollary 15.15 (Index theorem).** If $H \le G$ with $[G:H] = n$, then $G$ has a normal subgroup $N$ with $N \le H$ and $[G:N]$ dividing $n!$.

*Proof.* With $\varphi$ as above, the First Isomorphism Theorem gives $G/\ker\varphi \cong \operatorname{Image}(\varphi) \le \operatorname{Sym}(G/H) \cong S_n$. Setting $N = \ker\varphi$: $N \trianglelefteq G$, $N \le H$ (Theorem 15.14), and $|G/N| = |\operatorname{Image}(\varphi)| \mid |S_n| = n!$. $\blacksquare$

**Application (structural).** If $G$ is a group of order $< 60$ and $H$ has small index, the index theorem severely limits the possibilities. For example, if $|G| = 36$ and $H$ has index 4, then $G/N \hookrightarrow S_4$ (order 24). But $|G/N|$ divides both $|G| = 36$ and $|S_4| = 24$; the common divisors of 36 and 24 are $1,2,3,4,6,12$. Combined with $N \le H$, this forces a very constrained structure. Exploited heavily in [[16-centralizer-normalizer-stabilizer]] and the Sylow theorems.

---

## 15.7 Transitive and Regular Actions

> **Definition 15.16 (Transitive).** An action of $G$ on $X$ is **transitive** if there is a single orbit, i.e. for all $x, y \in X$ there exists $g \in G$ with $g\cdot x = y$.

> **Definition 15.17 (Regular, simply transitive).** An action is **regular** if it is transitive **and** every stabiliser is trivial, i.e. $g\cdot x = x \Rightarrow g = e$ (equivalently: the stabiliser of every point is $\{e\}$).

> **Proposition 15.18.** For a transitive action of a finite group $G$ on $X$, the following are equivalent:
> 1. The action is regular.
> 2. $|X| = |G|$.
> 3. Some stabiliser is trivial.
> 4. Every stabiliser is trivial.
> 5. The action is isomorphic (as a $G$-set) to the regular action of $G$ on itself by left translation.

*Proof sketch.*
- (1) $\Leftrightarrow$ (4): definition.
- (4) $\Rightarrow$ (3): trivial.
- (3) $\Rightarrow$ (2): pick an $x$ with $|G_x| = 1$; then $|X| = |G\cdot x| = |G|/|G_x| = |G|$ by orbit–stabiliser (and transitivity gives $G\cdot x = X$).
- (2) $\Rightarrow$ (4): by orbit–stabiliser, $|G_x| = |G|/|G\cdot x| = |G|/|X| = 1$ for every $x$.
- (4) $\Leftrightarrow$ (5): a transitive action with trivial stabilisers is isomorphic, via the map $g \mapsto g\cdot x_0$, to left translation. $\blacksquare$

**Example 14 (Regular action).** $G$ on itself by $g\cdot h = gh$: regular (transitive and faithful with trivial stabilisers, verified in Cayley's theorem).

**Example 15 (Natural action of $S_n$).** $S_n$ on $\{1,\ldots,n\}$: transitive ($S_n$ can send any $i$ to any $j$) but **not** regular for $n \ge 2$. The stabiliser of $i$ is isomorphic to $S_{n-1}$ (permutations fixing $i$), which has order $(n-1)! > 1$ for $n \ge 2$.

---

## 15.8 Counting with Orbit–Stabiliser

Several classical enumerations become one-line applications of orbit–stabiliser.

> **Proposition 15.19.** The number of distinct ways to seat $n$ distinguishable people at a round table (seatings regarded as equivalent if one is a cyclic rotation of the other) is $(n-1)!$.

*Proof.* Let $X$ be the set of linear arrangements of the $n$ people, so $|X| = n!$. Let $\mathbb{Z}/n\mathbb{Z} = \langle c\rangle$ with $c$ the cyclic shift $(1\,2\,\ldots\,n)$ act on $X$: $c\cdot(a_1,\ldots,a_n) = (a_n, a_1, \ldots, a_{n-1})$.

*Stabiliser.* A non-trivial cyclic shift moves someone to a new position; since the people are distinguishable, no rotation fixes any seating except $c^0 = e$. Hence every stabiliser is trivial.

*Orbit size.* By orbit–stabiliser, every orbit has size $|\mathbb{Z}/n|/1 = n$.

*Number of orbits (= number of distinct round seatings).* Orbits partition $X$, so
$$\text{\# orbits} = \frac{|X|}{\text{orbit size}} = \frac{n!}{n} = (n-1)!. \;\blacksquare$$

> **Proposition 15.20.** The number of distinct necklaces with $n$ distinguishable beads (necklaces equivalent under rotation **and** reflection) is $\dfrac{(n-1)!}{2}$ for $n \ge 3$.

*Proof.* Let $X$ be the $n!$ linear orderings. Let $D_n$ (order $2n$) act on $X$ by rotations and reflections.

*Stabilisers.* Because the $n$ beads are distinguishable, no non-identity symmetry of the cyclic arrangement can fix it (a rotation would map bead $1$ to a different bead, a reflection would move beads across the axis). So every stabiliser is trivial.

*Orbit size.* Each orbit has size $|D_n|/1 = 2n$.

*Number of necklaces.*
$$\text{\# orbits} = \frac{n!}{2n} = \frac{(n-1)!}{2}.\;\blacksquare$$

*Why $n \ge 3$?* For $n = 2$ the formula gives $\tfrac{1}{2}$, nonsensical; this is because the argument breaks down — $D_2$ has elements fixing the two-bead "necklace" (the reflection swapping them is the same as a rotation, so $D_2$ does not act faithfully on $\{1,2\}$).

---

## 15.9 Practice Problems

**Problem 1.** Show that for any action of $G$ on $X$, orbits are either equal or disjoint.

**Problem 2.** Let $G$ act on $X$ with a fixed point $x$ (i.e. $G_x = G$). Show that $X = \{x\} \sqcup Y$ for some $G$-invariant subset $Y$.

**Problem 3.** $G = \mathbb{Z}/6\mathbb{Z}$ acts on $X = \{1,2,3,4,5,6\}$ by $k\cdot i \equiv i + k\pmod 6$ (results taken in $\{1,\ldots,6\}$, identifying $0$ with $6$). Find all orbits, stabilisers, and verify orbit–stabiliser.

**Problem 4.** Find the stabiliser of the pair $\{1,2\}$ under $S_4$'s natural action on unordered pairs of $\{1,2,3,4\}$. Compute the orbit size.

**Problem 5.** $GL_2(\mathbb{R})$ acts on $\mathbb{R}^2 \setminus \{0\}$ by matrix–vector multiplication. Is this action transitive? What is the stabiliser of $(1,0)^\top$?

**Problem 6.** Show that if $G$ acts on $X$ and $H \le G$, then $H$ also acts on $X$ by restriction. How do the $H$-orbits compare with the $G$-orbits?

**Problem 7.** Let $G$ be a group of order 15 acting on a set of 7 elements. Show that the action has a fixed point.

### Solutions

**Solution 1 (Orbits equal or disjoint).**

*Setup.* Suppose $G\cdot x$ and $G\cdot y$ are two orbits with $G\cdot x \cap G\cdot y \ne \emptyset$. We will show $G\cdot x = G\cdot y$.

*Strategy.* Pick an element in the intersection, then show every element of one orbit belongs to the other.

*Computation.* Choose $z \in G\cdot x \cap G\cdot y$. Then
$$z = g\cdot x = h\cdot y \qquad \text{for some } g, h \in G.$$
Solve for $x$ in terms of $y$:
$$x = e\cdot x = (g^{-1}g)\cdot x = g^{-1}\cdot(g\cdot x) = g^{-1}\cdot z = g^{-1}\cdot(h\cdot y) = (g^{-1}h)\cdot y.$$
So $x \in G\cdot y$, hence $G\cdot x \subseteq G\cdot y$ (because any $k\cdot x = k\cdot(g^{-1}h)\cdot y = (kg^{-1}h)\cdot y \in G\cdot y$).

*Symmetry.* The argument is symmetric in $x$ and $y$, giving $G\cdot y \subseteq G\cdot x$.

*Conclusion.* $G\cdot x = G\cdot y$. Contrapositively, if $G\cdot x \ne G\cdot y$ then $G\cdot x \cap G\cdot y = \emptyset$. $\blacksquare$

*Remark.* This is precisely the standard argument for why an equivalence relation partitions a set; here the equivalence relation is "$x \sim y \iff y\in G\cdot x$" of Proposition 15.7.

---

**Solution 2 (Fixed point gives $G$-invariant decomposition).**

*Setup.* Suppose $G_x = G$, i.e. $g\cdot x = x$ for all $g \in G$. The orbit $G\cdot x = \{x\}$ is a singleton.

*Strategy.* Let $Y := X\setminus\{x\}$. Show $Y$ is $G$-invariant, meaning $G\cdot Y \subseteq Y$.

*Computation.* Suppose for contradiction that some $g\cdot y \in X\setminus Y$ for $y \in Y$. Since $X\setminus Y = \{x\}$, that means $g\cdot y = x$. But then $y = g^{-1}\cdot x = x$ (using $x \in G_x$ trivially — wait, better: $y = g^{-1}\cdot (g\cdot y) = g^{-1}\cdot x = x$ because $g^{-1}$ also fixes $x$). So $y = x$, contradicting $y \in Y = X\setminus\{x\}$.

*Conclusion.* $g\cdot y \in Y$ for every $g \in G$ and $y \in Y$, so $Y$ is $G$-invariant. Hence $X = \{x\} \sqcup Y$ as $G$-sets. $\blacksquare$

*Remark.* This shows that studying general actions reduces (somewhat) to studying actions with no fixed points: the fixed points "split off" as trivial sub-actions. This decomposition is systematically exploited in the proof of Burnside's lemma [[13-burnsides-theorem]].

---

**Solution 3 ($\mathbb{Z}/6$ on $\{1,\ldots,6\}$).**

*Setup.* $G = \mathbb{Z}/6\mathbb{Z}$, $X = \{1,2,3,4,5,6\}$, $k\cdot i = ((i-1+k)\bmod 6) + 1$ (i.e. cyclic shift on the six symbols, with $0$ identified with $6$ after the shift).

*Axioms (quick check).* $0\cdot i = i$ ✓. $(k + l)\cdot i \equiv i + k + l \equiv l\cdot(k\cdot i) \pmod 6$ ✓.

*Orbits.* Starting from $i = 1$: $1 \to 2 \to 3 \to 4 \to 5 \to 6 \to 1$. So every element of $\{1,\ldots,6\}$ is reached from $1$, and $G\cdot 1 = X$. There is a **single orbit**, so the action is transitive.

*Stabilisers.* $k\cdot i = i \iff i + k \equiv i \pmod 6 \iff k \equiv 0 \pmod 6 \iff k = 0$ in $\mathbb{Z}/6$. So $\operatorname{Stab}(i) = \{0\}$ for every $i$ — all stabilisers trivial. The action is **regular**.

*Orbit–stabiliser verification.*
$$|G\cdot i| = \frac{|G|}{|\operatorname{Stab}(i)|} = \frac{6}{1} = 6 = |X|.\;\checkmark$$

$\boxed{\text{One orbit } \{1,\ldots,6\}\text{; trivial stabilisers; regular action.}}$ $\blacksquare$

---

**Solution 4 ($S_4$ on unordered pairs — stabiliser of $\{1,2\}$).**

*Setup.* $S_4$ acts on $X = \binom{\{1,2,3,4\}}{2}$. Fix the target pair $P = \{1,2\}$.

*Strategy.* A permutation $\sigma$ stabilises $P$ as a *set* iff $\sigma(\{1,2\}) = \{1,2\}$, meaning $\sigma$ permutes $\{1,2\}$ within itself (and hence also permutes $\{3,4\}$ within itself, since $\sigma$ is a bijection of $\{1,2,3,4\}$).

*Computation.* The possible actions on $\{1,2\}$: identity or the transposition $(1\,2)$. The possible actions on $\{3,4\}$: identity or the transposition $(3\,4)$. Every combination gives a valid stabiliser element:
$$\operatorname{Stab}(P) = \{e,\; (1\,2),\; (3\,4),\; (1\,2)(3\,4)\}.$$
Four elements; as a group, isomorphic to $\mathbb{Z}/2 \times \mathbb{Z}/2$ (Klein four).

*Orbit size (via orbit–stabiliser).*
$$|S_4\cdot P| = \frac{|S_4|}{|\operatorname{Stab}(P)|} = \frac{24}{4} = 6.$$

*Verification against direct count.* The total number of unordered pairs is $\binom{4}{2} = 6$, and the action of $S_4$ is transitive on pairs (given any two pairs, a suitable permutation maps one to the other). So the single orbit has size 6, matching ✓.

$\boxed{|\operatorname{Stab}(\{1,2\})| = 4,\; |S_4\cdot \{1,2\}| = 6.}$ $\blacksquare$

---

**Solution 5 ($GL_2(\mathbb{R})$ on $\mathbb{R}^2\setminus\{0\}$).**

*Setup.* $A\cdot v = Av$ for $A \in GL_2(\mathbb{R})$, $v \in \mathbb{R}^2 \setminus\{0\}$.

*Transitivity.* Given any two non-zero $v, w \in \mathbb{R}^2$, we must find $A \in GL_2$ with $Av = w$.

*Strategy.* Extend $\{v\}$ to an ordered basis $(v, v')$ of $\mathbb{R}^2$ and $\{w\}$ to an ordered basis $(w, w')$. Let $A$ be the unique linear map with $Av = w$, $Av' = w'$. Then $A$ is a bijection of $\mathbb{R}^2$ (it sends a basis to a basis), hence $A \in GL_2$.

*Conclusion.* The action is transitive: there is a single orbit, $\mathbb{R}^2\setminus\{0\}$.

**Stabiliser of $e_1 = (1, 0)^\top$.**

A matrix $A = \begin{pmatrix}a & b \\ c & d\end{pmatrix}$ stabilises $e_1$ iff
$$A e_1 = \begin{pmatrix}a \\ c\end{pmatrix} = \begin{pmatrix}1 \\ 0\end{pmatrix}.$$
So $a = 1$, $c = 0$. Invertibility requires $\det A = ad - bc = 1\cdot d - b\cdot 0 = d \ne 0$.

*Explicit stabiliser.*
$$\operatorname{Stab}(e_1) = \left\{ \begin{pmatrix}1 & b \\ 0 & d\end{pmatrix} : b \in \mathbb{R},\; d \in \mathbb{R}^\times\right\}.$$
This is the **affine group of the line** in disguise: given such $A$, the map $x \mapsto dx + b$ is an affine bijection of $\mathbb{R}$, and the composition law matches. As an abstract group,
$$\operatorname{Stab}(e_1) \cong \mathbb{R} \rtimes \mathbb{R}^\times,$$
a semidirect product (the $\mathbb{R}^\times$-action on $\mathbb{R}$ is scalar multiplication).

*Sanity check (dimensions).* $\dim GL_2 = 4$, $\dim \operatorname{Stab}(e_1) = 2$ (parameters $b, d$), $\dim \mathbb{R}^2\setminus\{0\} = 2$. These satisfy $\dim(\text{group}) = \dim(\text{stabiliser}) + \dim(\text{orbit})$, the Lie-group analogue of orbit–stabiliser ✓.

$\boxed{\text{Transitive; }\operatorname{Stab}(e_1) \cong \mathbb{R} \rtimes \mathbb{R}^\times.}$ $\blacksquare$

---

**Solution 6 (Restriction of actions).**

*Setup.* $G$ acts on $X$ via $\cdot$, and $H \le G$.

*Restriction is an action.* Define the action of $H$ on $X$ by the same formula $h\cdot x$, just restricted to $h\in H$. The axioms follow directly: $e\in H$ since $H$ is a subgroup and $e\cdot x = x$; for $h_1, h_2 \in H$, $h_1 h_2 \in H$ (closure) and $(h_1 h_2)\cdot x = h_1\cdot (h_2\cdot x)$ (from the $G$-action).

*Homomorphism perspective.* If $\varphi : G \to \operatorname{Sym}(X)$ is the homomorphism of the $G$-action, then the restriction $\varphi|_H : H \to \operatorname{Sym}(X)$ is the corresponding homomorphism of the $H$-action.

**Comparing orbits.** Let $x \in X$. The $H$-orbit is
$$H\cdot x = \{h\cdot x : h\in H\}.$$
Since $H \subseteq G$, clearly $H\cdot x \subseteq G\cdot x$. More strongly:

*Claim.* Each $G$-orbit is a disjoint union of $H$-orbits.

*Proof.* The $G$-orbit $G\cdot x$ is a $G$-invariant subset of $X$, hence a *fortiori* an $H$-invariant subset. Inside $G\cdot x$, the $H$-action partitions into $H$-orbits, and these $H$-orbits are exactly the $H$-orbits of the elements of $G\cdot x$. $\blacksquare$

*Refinement and size constraint.* By orbit–stabiliser, each $H$-orbit has size $[H : H_x]$, which divides $|H|$. Each $G$-orbit has size $[G : G_x]$ dividing $|G|$. So the $H$-orbits **refine** the $G$-orbits.

*Example.* $S_4$ on $\{1,2,3,4\}$: single orbit of size 4. Restrict to $H = \langle (1\,2)\rangle \cong \mathbb{Z}/2$: orbits are $\{1,2\}$ and $\{3\}$, $\{4\}$. The $S_4$-orbit is refined into three $H$-orbits.

---

**Solution 7 (Group of order 15 on a 7-set has a fixed point).**

*Setup.* $G$ has $|G| = 15$, and $G$ acts on $X$ with $|X| = 7$.

*Strategy.* Show every orbit has size 1 (a fixed point) or size divisible by 3 or 5, then check which orbit sizes can sum to 7.

*Step 1 — Possible orbit sizes.* By orbit–stabiliser, every orbit size divides $|G| = 15$. The divisors of 15 are $1, 3, 5, 15$.

*Step 2 — Size $> 7$ is impossible.* Since each orbit is a subset of $X$ and $|X| = 7$, no orbit can have size $> 7$. So orbit sizes are in $\{1, 3, 5\}$.

*Step 3 — Partition constraint.* The orbits partition $X$, so the orbit sizes must sum to 7:
$$a\cdot 1 + b\cdot 3 + c\cdot 5 = 7, \qquad a, b, c \ge 0.$$

*Step 4 — Solve for non-negative integers.* Consider cases on $c$:
- $c = 0$: $a + 3b = 7$. Solutions: $(a, b) = (7, 0), (4, 1), (1, 2)$. All have $a \ge 1$.
- $c = 1$: $a + 3b = 2$. Solutions: $(a, b) = (2, 0)$. Has $a \ge 1$.
- $c \ge 2$: $5c \ge 10 > 7$, impossible.

In every feasible solution, $a \ge 1$: **there is at least one orbit of size 1**, i.e. a fixed point.

*Conclusion.* Every action of a group of order 15 on a set of 7 elements has a fixed point. $\blacksquare$

*Interpretation.* This is a mini-example of the kind of numerical argument that dominates Sylow theory and $p$-group theory: orbits divide $|G|$, the partition constraint restricts possibilities, and singleton orbits (= fixed points) appear forced. For $p$-groups acting on sets with $|X|$ not divisible by $p$, the same argument shows that a fixed point must exist — this is the key lemma for Sylow's theorem.

---

## Related Concepts

- [[13-burnsides-theorem]] — counting orbits via fixed points (Cauchy–Frobenius lemma).
- [[16-centralizer-normalizer-stabilizer]] — conjugation action in detail, class equation, centraliser/normaliser duality.
- [[17-homomorphisms-and-isomorphisms]] — Cayley's theorem uses homomorphism basics.
- [[18-isomorphism-theorems]] — quotient constructions from action kernels, First Iso Thm in Cayley.

---

*Last updated: 2026-04-19*
