---
title: "Homomorphisms and Isomorphisms"
type: guide
co: CO3
related: [15-group-actions, 18-isomorphism-theorems, 10-normal-subgroups-and-quotient-groups]
---

# 17. Homomorphisms and Isomorphisms

A **homomorphism** is a structure-preserving map between groups — the notion of "function" that respects the group operation. An **isomorphism** is a homomorphism that is also a bijection, and its existence certifies that two groups are "essentially the same": any group-theoretic statement true in one is true in the other. This chapter develops the machinery of homomorphisms, proves their core properties in full detail, and builds the kernel–image framework that leads directly to the Isomorphism Theorems of [[18-isomorphism-theorems]].

The pedagogical arc: (i) define homomorphisms, (ii) prove they preserve identity, inverses, and powers, (iii) introduce kernel and image, (iv) prove the injectivity-via-kernel criterion, (v) establish isomorphism and invariants, (vi) study the automorphism group and its inner subgroup, (vii) learn to count and classify homomorphisms between cyclic groups. Each section proves everything.

---

## 17.1 Homomorphisms

> **Definition 17.1 (Homomorphism).** Let $(G, *)$ and $(H, \circ)$ be groups. A **homomorphism** is a function $\varphi: G \to H$ such that
> $$\varphi(a * b) = \varphi(a) \circ \varphi(b) \qquad \text{for all } a, b \in G.$$

Once it is clear that $\varphi: G \to H$ lives in a group-theoretic context, we drop the operation symbols entirely and write
$$\varphi(ab) = \varphi(a)\varphi(b),$$
with the multiplication on the left taking place in $G$ and on the right in $H$. The equation is a **compatibility condition**: applying $\varphi$ to a product in $G$ gives the product in $H$ of the images.

**Interpretive remark.** A homomorphism is the group-theoretic analogue of a *linear map* in linear algebra or a *continuous map* in topology: it is the correct notion of "morphism" for the category of groups. Structure-preservation is the whole point — without it, functions between groups are just functions between sets.

> **Definition 17.2 (Types of homomorphisms).** A homomorphism $\varphi: G \to H$ is called:
> - a **monomorphism** if $\varphi$ is injective;
> - an **epimorphism** if $\varphi$ is surjective;
> - an **isomorphism** if $\varphi$ is bijective;
> - an **endomorphism** if $G = H$ (same domain and codomain);
> - an **automorphism** if $G = H$ and $\varphi$ is bijective.

When an isomorphism $\varphi: G \to H$ exists, we write $G \cong H$ and say "$G$ is isomorphic to $H$." Isomorphism is an **equivalence relation** on groups (reflexive: identity map; symmetric: inverse of an isomorphism is an isomorphism — see Proposition 17.9; transitive: composition of isomorphisms is an isomorphism).

---

### Basic properties

> **Proposition 17.3 (Homomorphisms preserve identity, inverses, powers).** Let $\varphi: G \to H$ be a homomorphism. Then:
> 1. $\varphi(e_G) = e_H$;
> 2. $\varphi(a^{-1}) = \varphi(a)^{-1}$ for every $a \in G$;
> 3. $\varphi(a^n) = \varphi(a)^n$ for every $n \in \mathbb{Z}$ and every $a \in G$.

**Proof of (1) — identity maps to identity.**

*Step 1.* Using $e_G \cdot e_G = e_G$ (from the identity axiom in $G$), apply $\varphi$:
$$\varphi(e_G) = \varphi(e_G \cdot e_G).$$

*Step 2.* Using the homomorphism property on the right-hand side:
$$\varphi(e_G \cdot e_G) = \varphi(e_G) \cdot \varphi(e_G).$$

*Step 3.* Combining steps 1 and 2:
$$\varphi(e_G) = \varphi(e_G) \cdot \varphi(e_G).$$

*Step 4.* The element $\varphi(e_G)$ lies in $H$, which is a group. Multiply both sides of the equation from step 3 on the left by $\varphi(e_G)^{-1}$:
$$\varphi(e_G)^{-1} \varphi(e_G) = \varphi(e_G)^{-1} \varphi(e_G) \varphi(e_G),$$
which simplifies (using $\varphi(e_G)^{-1} \varphi(e_G) = e_H$) to
$$e_H = e_H \cdot \varphi(e_G) = \varphi(e_G).$$

Therefore $\varphi(e_G) = e_H$, as claimed. $\square$

*Remark on the argument.* We did **not** assume $\varphi(e_G) = e_H$ at the start — that would be circular. Instead, we derived $\varphi(e_G)$ as an *idempotent* (an element satisfying $x = x \cdot x$), and in a group the only idempotent is the identity: from $x = x^2$, left-cancel $x$ to get $e_H = x$.

**Proof of (2) — inverses map to inverses.**

*Goal.* Show $\varphi(a^{-1}) = \varphi(a)^{-1}$, i.e., $\varphi(a^{-1})$ is the two-sided inverse of $\varphi(a)$ in $H$.

*Step 1.* Compute the product $\varphi(a) \cdot \varphi(a^{-1})$:
$$\varphi(a) \cdot \varphi(a^{-1}) = \varphi(a \cdot a^{-1}) \quad \text{(homomorphism)} = \varphi(e_G) \quad \text{(inverse axiom in }G\text{)} = e_H \quad \text{(by part (1))}.$$

*Step 2.* Compute the product in the other order:
$$\varphi(a^{-1}) \cdot \varphi(a) = \varphi(a^{-1} \cdot a) = \varphi(e_G) = e_H.$$

*Step 3.* Both products equal $e_H$, so $\varphi(a^{-1})$ satisfies the defining equation for the inverse of $\varphi(a)$ in $H$. By **uniqueness of inverses** in any group (Theorem 3.1), $\varphi(a^{-1}) = \varphi(a)^{-1}$. $\square$

**Proof of (3) — homomorphisms preserve powers, including negative ones.**

We distinguish three cases on the sign of $n$.

*Case $n = 0$.* Both $a^0 = e_G$ and $\varphi(a)^0 = e_H$, and $\varphi(e_G) = e_H$ by part (1). Equality holds: $\varphi(a^0) = e_H = \varphi(a)^0$. ✓

*Case $n \geq 1$, by induction.* Base case $n = 1$: $\varphi(a^1) = \varphi(a) = \varphi(a)^1$. ✓

Inductive step: suppose $\varphi(a^k) = \varphi(a)^k$. Then
$$\varphi(a^{k+1}) = \varphi(a^k \cdot a) \stackrel{\text{hom}}{=} \varphi(a^k) \cdot \varphi(a) \stackrel{\text{IH}}{=} \varphi(a)^k \cdot \varphi(a) = \varphi(a)^{k+1}.$$
By induction, the result holds for all $n \geq 0$.

*Case $n < 0$, say $n = -m$ with $m \geq 1$.* Then
$$\varphi(a^n) = \varphi(a^{-m}) = \varphi((a^{-1})^m) \stackrel{n \geq 0 \text{ case}}{=} \varphi(a^{-1})^m \stackrel{\text{by (2)}}{=} (\varphi(a)^{-1})^m = \varphi(a)^{-m} = \varphi(a)^n.$$

All three cases together give $\varphi(a^n) = \varphi(a)^n$ for every $n \in \mathbb{Z}$. $\blacksquare$

**Sanity check.** Part (3) with $n = -1$ reproduces part (2): $\varphi(a^{-1}) = \varphi(a)^{-1}$. Part (3) with $n = 0$ reproduces part (1): $\varphi(e_G) = e_H$. So (3) subsumes (1) and (2) as special cases — though (1) and (2) are logically prior because the induction/inductive reduction in (3) depends on them.

---

> **Proposition 17.4 (Order of the image divides order of the element).** Let $\varphi: G \to H$ be a homomorphism, and let $a \in G$ have finite order $|a| = n$. Then $\varphi(a)$ has finite order dividing $n$:
> $$|\varphi(a)| \; \text{divides} \; |a|.$$

**Proof.**

*Setup.* By hypothesis, $|a| = n$ means $n$ is the smallest positive integer with $a^n = e_G$.

*Step 1: $\varphi(a)^n = e_H$.* Using Proposition 17.3(3) with this specific $n$:
$$\varphi(a)^n = \varphi(a^n) = \varphi(e_G) = e_H.$$

*Step 2: Deduce divisibility.* The order $|\varphi(a)|$ is, by definition, the smallest positive integer $k$ such that $\varphi(a)^k = e_H$ (or $+\infty$ if no such $k$ exists). From Step 1, at least one positive integer — namely $n$ — satisfies $\varphi(a)^k = e_H$, so $|\varphi(a)|$ is finite. Moreover, the set of exponents $\{k \in \mathbb{Z} : \varphi(a)^k = e_H\}$ is the subgroup of $\mathbb{Z}$ generated by $|\varphi(a)|$; since $n$ lies in this set, $|\varphi(a)| \mid n$. $\blacksquare$

**Three important corollaries and their interpretations.**

*Corollary A (Isomorphisms preserve order exactly).* If $\varphi$ is an isomorphism, then $|\varphi(a)| = |a|$ for every $a \in G$.

*Proof.* Apply Proposition 17.4 to $\varphi$ to get $|\varphi(a)| \mid |a|$. Apply Proposition 17.4 to $\varphi^{-1}$ (which is also a homomorphism — Proposition 17.9) on the element $\varphi(a) \in H$ to get $|\varphi^{-1}(\varphi(a))| \mid |\varphi(a)|$, i.e., $|a| \mid |\varphi(a)|$. Two positive integers dividing each other are equal. $\blacksquare$

*Corollary B (Orders divide $|H|$).* If $G, H$ are finite, then $|\varphi(a)|$ divides $\gcd(|a|, |H|)$.

*Proof.* Divides $|a|$ by Proposition 17.4; divides $|H|$ by Lagrange applied to the cyclic subgroup $\langle \varphi(a)\rangle \leq H$. $\blacksquare$

*Corollary C.* If $\gcd(|G|, |H|) = 1$, the only homomorphism $\varphi: G \to H$ is trivial.

*Proof.* For any $a \in G$, $|a|$ divides $|G|$ (Lagrange), so by Corollary B, $|\varphi(a)|$ divides $\gcd(|G|, |H|) = 1$, forcing $\varphi(a) = e_H$. $\blacksquare$

This last corollary is what powers Problem 6 below.

---

### Examples of homomorphisms

**Example 1 (Determinant).** $\det: GL_n(\mathbb{R}) \to (\mathbb{R}^\times, \cdot)$ is a homomorphism because $\det(AB) = \det(A)\det(B)$ by the multiplicative property of the determinant. It is surjective onto $\mathbb{R}^\times$ (for any $\lambda \neq 0$, the diagonal matrix with entries $(\lambda, 1, \ldots, 1)$ has determinant $\lambda$). So $\det$ is an epimorphism but not a monomorphism (many matrices share the same determinant).

**Example 2 (Sign homomorphism).** $\operatorname{sgn}: S_n \to \{\pm 1\}$, sending each permutation to its sign ($+1$ for even, $-1$ for odd). Homomorphism property: $\operatorname{sgn}(\sigma\tau) = \operatorname{sgn}(\sigma)\operatorname{sgn}(\tau)$, provable by counting transpositions in a decomposition. Kernel: $A_n$, the alternating group. Image (for $n \geq 2$): $\{\pm 1\}$.

**Example 3 (Reduction mod $n$).** $\pi: \mathbb{Z} \to \mathbb{Z}_n$, $\pi(k) = k \bmod n$. Check: $\pi(k + \ell) = (k + \ell) \bmod n = (k \bmod n) + (\ell \bmod n) = \pi(k) + \pi(\ell)$ in $\mathbb{Z}_n$. Surjective. Kernel: $\ker \pi = \{k \in \mathbb{Z} : n \mid k\} = n\mathbb{Z}$.

**Example 4 (Exponential).** $\exp: (\mathbb{R}, +) \to (\mathbb{R}^+, \cdot)$, $\exp(x) = e^x$. Homomorphism: $e^{x + y} = e^x e^y$. Bijective with inverse $\log$. Hence an isomorphism: $(\mathbb{R}, +) \cong (\mathbb{R}^+, \cdot)$. Elegant fact: addition on $\mathbb{R}$ and multiplication on $\mathbb{R}^+$ are the "same" group in two different dresses.

**Example 5 (Doubling).** $\varphi: (\mathbb{Z}, +) \to (\mathbb{Z}, +)$, $\varphi(k) = 2k$. Homomorphism: $\varphi(k + \ell) = 2(k + \ell) = 2k + 2\ell$. Injective (from $2k = 2\ell$ deduce $k = \ell$). Not surjective: the image is $2\mathbb{Z}$, missing odd integers. A monomorphism that is not an isomorphism — only possible because $\mathbb{Z}$ is infinite.

**Example 6 (Inner automorphisms).** For $g \in G$, define $c_g: G \to G$ by $c_g(h) = ghg^{-1}$ (conjugation by $g$).

*Homomorphism:* for $h_1, h_2 \in G$,
$$c_g(h_1 h_2) = g(h_1 h_2) g^{-1} = g h_1 (g^{-1} g) h_2 g^{-1} = (g h_1 g^{-1})(g h_2 g^{-1}) = c_g(h_1) c_g(h_2). \checkmark$$

*Bijective:* the map $c_{g^{-1}}: G \to G$ is the inverse, since $c_{g^{-1}}(c_g(h)) = g^{-1}(ghg^{-1})g = h$ and similarly $c_g \circ c_{g^{-1}} = \operatorname{id}$. Hence $c_g \in \operatorname{Aut}(G)$. These are the **inner automorphisms**, studied in §17.4.

**Example 7 (Trivial homomorphism).** $\varphi: G \to H$ defined by $\varphi(g) = e_H$ for every $g \in G$. Homomorphism: $\varphi(ab) = e_H = e_H \cdot e_H = \varphi(a)\varphi(b)$. Always available between any two groups.

**Example 8 (A non-trivial homomorphism between cyclic groups).** Define $\varphi: \mathbb{Z}_4 \to \mathbb{Z}_6$ by specifying $\varphi(1) = 3$, and extending by the homomorphism property: $\varphi(k) = 3k \bmod 6$.

*Well-definedness.* Since $\mathbb{Z}_4$ is cyclic of order $4$, we need $\varphi(4 \cdot 1) = \varphi(0) = 0$, i.e., $4 \cdot 3 \equiv 0 \pmod 6$. Compute: $4 \cdot 3 = 12 \equiv 0 \pmod 6$ ✓. So $\varphi$ is well-defined.

*Kernel.* $\ker \varphi = \{k \in \mathbb{Z}_4 : 3k \equiv 0 \pmod 6\} = \{0, 2\}$ (since $3 \cdot 0 = 0, 3 \cdot 1 = 3, 3 \cdot 2 = 6 \equiv 0, 3 \cdot 3 = 9 \equiv 3$).

*Image.* $\operatorname{Im} \varphi = \{0, 3\}$, the unique subgroup of order $2$ in $\mathbb{Z}_6$.

---

## 17.2 Kernel and Image

> **Definition 17.5.** Let $\varphi: G \to H$ be a homomorphism.
> - The **kernel** of $\varphi$ is $\ker \varphi = \{g \in G : \varphi(g) = e_H\}$.
> - The **image** of $\varphi$ is $\operatorname{Im} \varphi = \varphi(G) = \{\varphi(g) : g \in G\} \subseteq H$.

The kernel measures how far $\varphi$ is from injective (small kernel = more injective); the image measures how much of $H$ is hit (large image = more surjective).

> **Proposition 17.6 (Structural properties of kernel and image).** Let $\varphi: G \to H$ be a homomorphism.
> 1. $\ker \varphi \trianglelefteq G$ — the kernel is a **normal** subgroup of $G$.
> 2. $\operatorname{Im} \varphi \leq H$ — the image is a subgroup of $H$ (not necessarily normal).

**Proof of (1): $\ker \varphi$ is a normal subgroup of $G$.**

*Step 1: $\ker \varphi$ is non-empty.* By Proposition 17.3(1), $\varphi(e_G) = e_H$, so $e_G \in \ker \varphi$.

*Step 2: $\ker \varphi$ is closed under the product-with-inverse operation (one-step subgroup test).* Let $a, b \in \ker \varphi$, so $\varphi(a) = \varphi(b) = e_H$. Compute:
$$\varphi(a b^{-1}) = \varphi(a) \varphi(b^{-1}) \quad [\text{homomorphism}] = \varphi(a) \varphi(b)^{-1} \quad [\text{Prop 17.3(2)}] = e_H \cdot e_H^{-1} = e_H.$$
Hence $ab^{-1} \in \ker \varphi$. By the one-step subgroup test, $\ker \varphi \leq G$.

*Step 3: $\ker \varphi$ is normal.* Let $a \in \ker \varphi$ and $g \in G$. We must show $g a g^{-1} \in \ker \varphi$. Compute:
$$\varphi(gag^{-1}) = \varphi(g) \varphi(a) \varphi(g^{-1}) = \varphi(g) \cdot e_H \cdot \varphi(g)^{-1} = \varphi(g) \varphi(g)^{-1} = e_H.$$
So $gag^{-1} \in \ker \varphi$. Since $a \in \ker \varphi$ and $g \in G$ were arbitrary, $g (\ker \varphi) g^{-1} \subseteq \ker \varphi$ for every $g$, which is the conjugation-invariance definition of normality. $\square$

**Interpretive remark.** The kernel being normal is *structural*: every normal subgroup is the kernel of some homomorphism (the quotient map $G \to G/N$), and conversely every kernel is normal. This is the reason normal subgroups are exactly the "right" notion for quotient constructions.

**Proof of (2): $\operatorname{Im} \varphi$ is a subgroup of $H$.**

*Step 1: $\operatorname{Im} \varphi$ is non-empty.* $e_H = \varphi(e_G) \in \operatorname{Im} \varphi$.

*Step 2: Closed under product-with-inverse.* Let $y_1, y_2 \in \operatorname{Im} \varphi$, say $y_i = \varphi(x_i)$ for some $x_i \in G$. Then
$$y_1 y_2^{-1} = \varphi(x_1) \varphi(x_2)^{-1} = \varphi(x_1) \varphi(x_2^{-1}) = \varphi(x_1 x_2^{-1}) \in \operatorname{Im} \varphi,$$
so $\operatorname{Im} \varphi \leq H$. $\square$

**Why $\operatorname{Im}\varphi$ need not be normal in $H$:** Example: the inclusion $\iota: H \hookrightarrow G$ of a non-normal subgroup is a (injective) homomorphism with image $H$, which is not normal in $G$ by assumption. Concrete instance: $\iota: \langle (1\,2)\rangle \hookrightarrow S_3$, with image $\{e, (1\,2)\}$, not normal in $S_3$. $\blacksquare$

---

### Injectivity criterion

> **Theorem 17.7 (Injectivity via the kernel).** A homomorphism $\varphi: G \to H$ is injective if and only if $\ker \varphi = \{e_G\}$.

**Proof.**

*($\Rightarrow$) Assume $\varphi$ is injective.* We show $\ker \varphi = \{e_G\}$.

- One inclusion is trivial: $e_G \in \ker \varphi$ by Proposition 17.3(1), so $\{e_G\} \subseteq \ker \varphi$.
- Conversely, suppose $a \in \ker \varphi$, i.e., $\varphi(a) = e_H$. By Proposition 17.3(1), $\varphi(e_G) = e_H$ as well. Thus $\varphi(a) = \varphi(e_G)$. Injectivity forces $a = e_G$. Hence $\ker \varphi \subseteq \{e_G\}$.

Both inclusions yield $\ker \varphi = \{e_G\}$.

*($\Leftarrow$) Assume $\ker \varphi = \{e_G\}$.* We show $\varphi$ is injective.

Suppose $\varphi(a) = \varphi(b)$ for some $a, b \in G$. Right-multiply both sides by $\varphi(b)^{-1}$:
$$\varphi(a) \varphi(b)^{-1} = e_H.$$
By Prop 17.3(2) and the homomorphism property,
$$\varphi(a) \varphi(b)^{-1} = \varphi(a) \varphi(b^{-1}) = \varphi(a b^{-1}).$$
So $\varphi(ab^{-1}) = e_H$, hence $ab^{-1} \in \ker \varphi = \{e_G\}$, i.e., $ab^{-1} = e_G$. Right-multiply by $b$: $a = b$.

Therefore $\varphi$ is injective. $\blacksquare$

**Practical remark.** This theorem is one of the most-used facts in group theory: to check that a homomorphism is injective, one need only verify that the kernel is trivial — a single computation. The corresponding statement for arbitrary functions (without the homomorphism hypothesis) is *false*: there is no "kernel" for general functions, and injectivity must be checked pairwise.

---

### Examples

**Example 9.** For $\det: GL_n(\mathbb{R}) \to \mathbb{R}^\times$: $\ker \det = \{A : \det A = 1\} = SL_n(\mathbb{R})$, the special linear group. Image: all of $\mathbb{R}^\times$.

**Example 10.** For $\operatorname{sgn}: S_n \to \{\pm 1\}$, $n \geq 2$: $\ker \operatorname{sgn} = A_n$ (the alternating group of even permutations). Image: $\{\pm 1\}$. For $n = 1$: $S_1 = \{e\}$, trivially mapping to $\{+1\}$; $\operatorname{sgn}$ is the trivial homomorphism.

**Example 11.** For $\pi: \mathbb{Z} \to \mathbb{Z}_n$: $\ker \pi = n\mathbb{Z}$, image $\mathbb{Z}_n$.

---

## 17.3 Isomorphisms

> **Definition 17.8.** A **group isomorphism** $\varphi: G \to H$ is a bijective homomorphism. When one exists, we say $G$ and $H$ are **isomorphic**, written $G \cong H$.

Isomorphic groups are "the same" as abstract groups: any group-theoretic property (abelianness, order of elements, subgroup structure, etc.) that holds in one holds in the other via $\varphi$.

> **Proposition 17.9 (The inverse of an isomorphism is an isomorphism).** If $\varphi: G \to H$ is an isomorphism, then $\varphi^{-1}: H \to G$ is also an isomorphism.

**Proof.**

$\varphi^{-1}$ is a bijection (set-theoretic fact about bijections). It remains to show $\varphi^{-1}$ is a homomorphism.

*Strategy.* Let $h_1, h_2 \in H$. Goal: $\varphi^{-1}(h_1 h_2) = \varphi^{-1}(h_1) \varphi^{-1}(h_2)$.

*Step 1.* Apply $\varphi$ to both proposed sides:
$$\varphi\bigl(\varphi^{-1}(h_1 h_2)\bigr) = h_1 h_2 \qquad \text{(since } \varphi \circ \varphi^{-1} = \operatorname{id}_H\text{)}.$$

*Step 2.* For the other side:
$$\varphi\bigl(\varphi^{-1}(h_1) \varphi^{-1}(h_2)\bigr) \stackrel{\text{hom.}}{=} \varphi(\varphi^{-1}(h_1)) \cdot \varphi(\varphi^{-1}(h_2)) = h_1 \cdot h_2.$$

*Step 3.* Both $\varphi^{-1}(h_1 h_2)$ and $\varphi^{-1}(h_1) \varphi^{-1}(h_2)$ map under $\varphi$ to the same element $h_1 h_2$. Since $\varphi$ is injective, the preimages are equal:
$$\varphi^{-1}(h_1 h_2) = \varphi^{-1}(h_1) \varphi^{-1}(h_2). \qquad \checkmark$$

Thus $\varphi^{-1}$ is a homomorphism, and being bijective it is an isomorphism. $\blacksquare$

**Corollary (Isomorphism is an equivalence relation on groups).** Symmetry follows from Prop 17.9. Reflexivity: $\operatorname{id}: G \to G$ is an isomorphism. Transitivity: the composition $\psi \circ \varphi$ of isomorphisms $\varphi: G \to H$, $\psi: H \to K$ is an isomorphism (composition of bijections is a bijection; composition of homomorphisms is a homomorphism: $(\psi\varphi)(ab) = \psi(\varphi(a)\varphi(b)) = \psi(\varphi(a))\psi(\varphi(b))$).

---

### Isomorphism preserves all group-theoretic structure

If $\varphi: G \xrightarrow{\sim} H$ is an isomorphism, then the following are preserved (proofs sketched below):

1. **Element orders exactly:** $|\varphi(g)| = |g|$ for every $g \in G$ (Corollary A of Proposition 17.4).
2. **Abelianness:** $G$ abelian $\Leftrightarrow$ $H$ abelian. (*Proof:* $\varphi(g_1 g_2) = \varphi(g_1) \varphi(g_2)$; if $H$ is abelian, $\varphi(g_1)\varphi(g_2) = \varphi(g_2)\varphi(g_1) = \varphi(g_2 g_1)$, so injectivity gives $g_1 g_2 = g_2 g_1$. Converse similar.)
3. **Cyclicity:** $G$ cyclic $\Leftrightarrow$ $H$ cyclic. (*Proof:* If $G = \langle g\rangle$, then $H = \varphi(G) = \langle \varphi(g)\rangle$.)
4. **Order of the group:** $|G| = |H|$ (bijection).
5. **Simplicity, solvability, nilpotency** — each is a property expressible in terms of (normal) subgroups and quotients, all of which are preserved.
6. **Subgroup lattice:** For any subgroup $K \leq G$, $\varphi(K) \leq H$ is a subgroup, and $K \mapsto \varphi(K)$ is a bijection between subgroups of $G$ and subgroups of $H$, preserving inclusion, intersection, and product.
7. **Number of elements of each order:** For any $n$, $|\{g \in G : |g| = n\}| = |\{h \in H : |h| = n\}|$ (since $\varphi$ bijects these sets by (1)).
8. **Center:** $\varphi(Z(G)) = Z(H)$. (*Proof:* $g \in Z(G) \Leftrightarrow gx = xg \forall x \Leftrightarrow \varphi(g)\varphi(x) = \varphi(x)\varphi(g) \forall x \Leftrightarrow \varphi(g) \in Z(H)$, using surjectivity to range over all elements of $H$.)
9. **Normal subgroups:** $K \trianglelefteq G \Leftrightarrow \varphi(K) \trianglelefteq H$.

These are called **isomorphism invariants**. Any invariant distinguishing two groups proves them non-isomorphic.

---

### Distinguishing groups via invariants

**Example 12.** $\mathbb{Z}_4 \stackrel{?}{\cong} V_4$?

*Analysis.* Both groups have order $4$. In $\mathbb{Z}_4$, the element $1$ has order $4$ ($1 + 1 + 1 + 1 \equiv 0 \pmod 4$ and no smaller positive multiple vanishes). In $V_4 = \{e, a, b, c\}$, every non-identity element has order $2$ (since $a^2 = b^2 = c^2 = e$).

Invariant comparison:
- Number of elements of order $4$ in $\mathbb{Z}_4$: $|\{1, 3\}| = 2$.
- Number of elements of order $4$ in $V_4$: $0$.

By invariant (7), they are non-isomorphic. $\mathbb{Z}_4 \not\cong V_4$.

**Example 13.** $S_3 \stackrel{?}{\cong} \mathbb{Z}_6$?

*Analysis.* Both have order $6$.
- $S_3$ is non-abelian: e.g., $(1\,2)(1\,3) = (1\,3\,2) \neq (1\,2\,3) = (1\,3)(1\,2)$.
- $\mathbb{Z}_6$ is abelian: integer addition mod $6$ is commutative.

By invariant (2), they are non-isomorphic. $S_3 \not\cong \mathbb{Z}_6$.

**Example 14.** $S_3 \stackrel{?}{\cong} D_3$?

*Answer.* **Yes.** Both are non-abelian of order $6$. A classification result (Problem 6 of [[14-co2-practice-problems]]) says there is exactly one non-abelian group of order $6$ up to isomorphism, so $S_3 \cong D_3$.

*Explicit isomorphism.* Recall $D_3 = \langle r, s \mid r^3 = s^2 = e, srs = r^{-1}\rangle$, with $6$ elements $\{e, r, r^2, s, rs, r^2 s\}$. Define $\varphi: D_3 \to S_3$ by its values on generators:
$$\varphi(r) = (1\,2\,3), \qquad \varphi(s) = (1\,2).$$
Extend by the homomorphism property. To check well-definedness, verify that the generators' relations are respected by the images:
- $\varphi(r)^3 = (1\,2\,3)^3 = e$. ✓
- $\varphi(s)^2 = (1\,2)^2 = e$. ✓
- $\varphi(s)\varphi(r)\varphi(s) = (1\,2)(1\,2\,3)(1\,2) = (1\,3\,2) = \varphi(r)^{-1}$. ✓

Then $\varphi$ is a well-defined homomorphism mapping six elements of $D_3$ to six elements of $S_3$, and each image is distinct (map out the list: $e, r \mapsto (1\,2\,3), r^2 \mapsto (1\,3\,2), s \mapsto (1\,2), rs \mapsto (1\,3), r^2 s \mapsto (2\,3)$). So $\varphi$ is a bijection, hence an isomorphism.

---

## 17.4 Automorphism Group

> **Definition 17.10.** $\operatorname{Aut}(G) = \{\varphi: G \to G : \varphi \text{ is an isomorphism}\}$, the set of automorphisms of $G$. It is a group under composition.

*Verification that $(\operatorname{Aut}(G), \circ)$ is a group:*
- Closure: composition of isomorphisms is an isomorphism (Corollary after Proposition 17.9).
- Associativity: function composition is always associative.
- Identity: $\operatorname{id}_G: G \to G$ is trivially an automorphism.
- Inverses: by Proposition 17.9.

So $\operatorname{Aut}(G) \leq \operatorname{Sym}(G)$, a subgroup of the symmetric group on the underlying set of $G$.

> **Definition 17.11 (Inner automorphism group).** The **inner automorphism group** of $G$ is
> $$\operatorname{Inn}(G) = \{c_g : g \in G\} \leq \operatorname{Aut}(G),$$
> where $c_g: G \to G$ is conjugation $h \mapsto ghg^{-1}$ (Example 6).

> **Proposition 17.12 ($\operatorname{Inn}(G) \cong G/Z(G)$).** The map $c: G \to \operatorname{Aut}(G)$, $g \mapsto c_g$, is a homomorphism with image $\operatorname{Inn}(G)$ and kernel $Z(G)$. Consequently,
> $$\operatorname{Inn}(G) \cong G/Z(G).$$

**Proof.**

*Step 1: $c$ is a homomorphism from $(G, \cdot)$ to $(\operatorname{Aut}(G), \circ)$.*

Fix $g, h \in G$. We must check $c_{gh} = c_g \circ c_h$ as functions $G \to G$. For any $x \in G$,
$$c_{gh}(x) = (gh) x (gh)^{-1} = (gh) x (h^{-1} g^{-1}) = g(hxh^{-1})g^{-1} = c_g(h x h^{-1}) = c_g(c_h(x)) = (c_g \circ c_h)(x).$$
Since this holds for every $x$, $c_{gh} = c_g \circ c_h$. $\checkmark$

*Step 2: Identify $\operatorname{Im} c$.* By definition, $\operatorname{Im} c = \{c_g : g \in G\} = \operatorname{Inn}(G)$. $\checkmark$

*Step 3: Compute $\ker c$.*

$g \in \ker c \iff c_g = \operatorname{id}_G \iff gxg^{-1} = x \text{ for all } x \in G \iff gx = xg \text{ for all } x \in G \iff g \in Z(G).$

So $\ker c = Z(G)$. $\checkmark$

*Step 4: Apply the First Isomorphism Theorem.* Since $c: G \to \operatorname{Aut}(G)$ is a homomorphism with kernel $Z(G)$ and image $\operatorname{Inn}(G)$, the First Isomorphism Theorem (to be proved in [[18-isomorphism-theorems]]) yields
$$G/Z(G) = G/\ker c \;\cong\; \operatorname{Im} c = \operatorname{Inn}(G). \qquad \blacksquare$$

**Interpretive consequences.**

- $\operatorname{Inn}(G)$ measures the "non-abelianness" of $G$: if $G$ is abelian, every $c_g = \operatorname{id}$, so $\operatorname{Inn}(G) = \{e\}$ (and $G = Z(G)$).
- $\operatorname{Inn}(G)$ is a normal subgroup of $\operatorname{Aut}(G)$: given $\varphi \in \operatorname{Aut}(G)$ and $c_g \in \operatorname{Inn}(G)$, we have $\varphi c_g \varphi^{-1} = c_{\varphi(g)}$ (check: $\varphi c_g \varphi^{-1}(x) = \varphi(g \varphi^{-1}(x) g^{-1}) = \varphi(g)\varphi(\varphi^{-1}(x))\varphi(g)^{-1} = \varphi(g) x \varphi(g)^{-1} = c_{\varphi(g)}(x)$).
- The quotient $\operatorname{Out}(G) := \operatorname{Aut}(G)/\operatorname{Inn}(G)$ is the **outer automorphism group**, the "externally induced" symmetries of $G$ not coming from conjugation.

---

### Automorphisms of cyclic groups

**Example 15 ($\operatorname{Aut}(\mathbb{Z}_n) \cong U(n)$).**

*Setup.* $\mathbb{Z}_n$ is cyclic of order $n$, generated by $1 \in \mathbb{Z}_n$. A homomorphism $\varphi: \mathbb{Z}_n \to \mathbb{Z}_n$ is entirely determined by its value on the generator $\varphi(1) \in \mathbb{Z}_n$ (see Technique 1 below).

*Step 1: Which $k$ give a well-defined homomorphism?* For $\varphi_k(x) = kx \bmod n$, we need $\varphi_k(n) = kn \equiv 0 \pmod n$, which is automatic. So every $k \in \mathbb{Z}_n$ gives a well-defined homomorphism $\varphi_k$.

*Step 2: Which $k$ give an automorphism?* $\varphi_k$ is an automorphism iff it is bijective. In a finite group, a function to itself is bijective iff injective iff surjective. Injectivity: $\ker \varphi_k = \{x : kx \equiv 0 \pmod n\}$. This is $\{0\}$ iff $\gcd(k, n) = 1$ (standard fact: $kx \equiv 0 \pmod n$ has only $x \equiv 0$ iff $k$ is coprime to $n$).

So $\varphi_k \in \operatorname{Aut}(\mathbb{Z}_n) \iff \gcd(k, n) = 1 \iff k \in U(n)$.

*Step 3: Structure of the group operation.* For $k, \ell \in U(n)$:
$$(\varphi_k \circ \varphi_\ell)(x) = \varphi_k(\ell x) = k(\ell x) = (k\ell) x = \varphi_{k\ell}(x).$$
So composition of $\varphi_k, \varphi_\ell$ corresponds to multiplication $k \cdot \ell$ in $U(n)$.

*Step 4: The isomorphism.* The map $\Phi: U(n) \to \operatorname{Aut}(\mathbb{Z}_n)$, $k \mapsto \varphi_k$, is:
- a homomorphism (by Step 3),
- injective (distinct $k \neq \ell$ give $\varphi_k(1) = k \neq \ell = \varphi_\ell(1)$, so $\varphi_k \neq \varphi_\ell$),
- surjective (every automorphism is of the form $\varphi_k$ for some $k \in U(n)$, by Steps 1–2).

Hence $\operatorname{Aut}(\mathbb{Z}_n) \cong U(n)$. $\blacksquare$

**Example 16 ($\operatorname{Aut}(\mathbb{Z}_2 \times \mathbb{Z}_2) \cong S_3$).**

*Setup.* Let $V = \mathbb{Z}_2 \times \mathbb{Z}_2 = \{(0,0), (1,0), (0,1), (1,1)\}$, the Klein four-group, of order $4$. It has three non-identity elements, each of order $2$.

*Step 1.* Any automorphism $\varphi \in \operatorname{Aut}(V)$ fixes the identity $(0,0)$ and permutes the three non-identity elements among themselves (since order is preserved: non-identity elements have order $2$ and map to elements of order $2$, which are the non-identity elements of $V$).

*Step 2.* So $\operatorname{Aut}(V)$ embeds into $\operatorname{Sym}(\{(1,0), (0,1), (1,1)\}) \cong S_3$ via restriction.

*Step 3.* Conversely, every permutation of the three non-identity elements extends to an automorphism: the two-dimensional $\mathbb{F}_2$-vector space structure on $V$ means that any bijective permutation of a basis extends to a linear (and hence group) automorphism. More concretely, any permutation of $\{a, b, c\} = V \setminus \{0\}$ extends: since $a + b + c = 0$ in $V$ (the unique non-trivial linear relation), any bijection of $\{a, b, c\}$ preserves this, and group-theoretic calculations confirm it is an automorphism.

*Conclusion.* $\operatorname{Aut}(V) \cong S_3$, with $|\operatorname{Aut}(V)| = 6$. $\blacksquare$

**Example 17 ($\operatorname{Aut}(\mathbb{Z}) \cong \mathbb{Z}_2$).**

*Setup.* $\mathbb{Z}$ is cyclic (infinite) with generators $\pm 1$.

*Step 1.* Any automorphism $\varphi: \mathbb{Z} \to \mathbb{Z}$ is determined by $\varphi(1)$. For $\varphi$ to be a homomorphism, $\varphi(k) = k \cdot \varphi(1)$ for all $k \in \mathbb{Z}$. For $\varphi$ to be an automorphism (in particular surjective), we need $\varphi(1) \in \mathbb{Z}$ to have $\mathbb{Z}$ as the image. $\operatorname{Im} \varphi = \varphi(1) \cdot \mathbb{Z}$, which equals $\mathbb{Z}$ iff $\varphi(1) = \pm 1$.

*Step 2.* So $\operatorname{Aut}(\mathbb{Z}) = \{\operatorname{id}, -\operatorname{id}\}$, where $\operatorname{id}$ maps $k \mapsto k$ and $-\operatorname{id}$ maps $k \mapsto -k$. As a group (under composition), this is cyclic of order $2$, so $\operatorname{Aut}(\mathbb{Z}) \cong \mathbb{Z}_2$. $\blacksquare$

---

## 17.5 Useful Techniques for Homomorphism Problems

### Technique 1: Define $\varphi$ on generators

If $G = \langle S \rangle$ (generated by a set $S \subseteq G$), then a homomorphism $\varphi: G \to H$ is completely determined by its values $\varphi|_S$ — provided those values satisfy all the defining relations of $G$.

*Cyclic case.* If $G = \langle a \rangle$ (cyclic, generated by a single element $a$), then $\varphi: G \to H$ is determined by a single value $\varphi(a) = h \in H$, and $\varphi$ is well-defined iff $h$ satisfies the relations $a$ satisfies in $G$.

- If $G = \mathbb{Z}$ (infinite cyclic), there are no relations on $a = 1$, so any $h \in H$ works. Thus the homomorphisms $\mathbb{Z} \to H$ are in bijection with elements of $H$.
- If $G = \mathbb{Z}_n$ (cyclic of order $n$), the generator $a = 1$ satisfies $a^n = e_G$. For well-definedness we need $h^n = e_H$, i.e., $|h|$ divides $n$.

### Technique 2: Count homomorphisms between cyclic groups

> **Theorem (Counting homomorphisms from $\mathbb{Z}_n$).** Let $H$ be any group. Then
> $$|\operatorname{Hom}(\mathbb{Z}_n, H)| = |\{h \in H : h^n = e_H\}|.$$
> If $H$ is finite and cyclic of order $m$, this count equals $\gcd(n, m)$.

**Proof of the general statement.** By Technique 1, a homomorphism $\varphi: \mathbb{Z}_n \to H$ is determined by $\varphi(1) \in H$, subject to the relation $\varphi(1)^n = e_H$. So homomorphisms correspond bijectively to elements $h \in H$ with $h^n = e$. $\square$

**Proof that if $H = \mathbb{Z}_m$ then the count is $\gcd(n, m)$.** Elements $h \in \mathbb{Z}_m$ with $nh \equiv 0 \pmod m$ are those with $|h|$ dividing $n$ in $(\mathbb{Z}_m, +)$. Also $|h|$ divides $m$ by Lagrange. So $|h|$ divides $\gcd(n, m) = d$. Elements of order dividing $d$ in $\mathbb{Z}_m$ form the unique subgroup of order $d$, contributing exactly $d = \gcd(n, m)$ elements. $\square$

**Example 18.** Count homomorphisms $\mathbb{Z}_4 \to \mathbb{Z}_6$.

*Solution.*

*Strategy.* Apply Technique 2. A homomorphism $\varphi: \mathbb{Z}_4 \to \mathbb{Z}_6$ corresponds to an element $h \in \mathbb{Z}_6$ with $4h \equiv 0 \pmod 6$.

*Computation.* We need $h \in \mathbb{Z}_6$ with order (in $\mathbb{Z}_6$) dividing $4$. By Lagrange, the order also divides $6$. So the order must divide $\gcd(4, 6) = 2$.

*Elements with order dividing $2$ in $\mathbb{Z}_6$:* these are elements $h$ satisfying $2h \equiv 0 \pmod 6$, i.e., $h \equiv 0 \pmod 3$, which is $h \in \{0, 3\}$.

*Count:* exactly $\gcd(4, 6) = 2$ elements, hence $2$ homomorphisms.

*Verification.* The two homomorphisms are:
- $\varphi_0$: trivial ($\varphi_0(k) = 0$ for all $k$).
- $\varphi_3$: $\varphi_3(k) = 3k \bmod 6$, giving $\varphi_3(0) = 0, \varphi_3(1) = 3, \varphi_3(2) = 0, \varphi_3(3) = 3$.

Check $\varphi_3$ is well-defined: $\varphi_3(4) = 12 \equiv 0 = \varphi_3(0)$ ✓.

$\boxed{2 \text{ homomorphisms}}$ $\blacksquare$

### Technique 3: Factor through the kernel (First Isomorphism Theorem preview)

Any homomorphism $\varphi: G \to H$ factors through its kernel as a composition
$$G \twoheadrightarrow G/\ker\varphi \xrightarrow{\sim} \operatorname{Im} \varphi \hookrightarrow H.$$

This factorization — the *canonical decomposition of a homomorphism* — is the content of the First Isomorphism Theorem, saved for [[18-isomorphism-theorems]]. It reduces questions about arbitrary homomorphisms to questions about surjections (to $\operatorname{Im}\varphi$) and injections (inclusion of $\operatorname{Im}\varphi$).

---

## 17.6 Classifying Finite Cyclic Groups up to Isomorphism

We noted in [[06-cyclic-groups-and-order]]:

> **Theorem 17.13 (Classification of cyclic groups).** Every cyclic group is isomorphic to exactly one of the following:
> - $(\mathbb{Z}, +)$, if the group is infinite cyclic;
> - $\mathbb{Z}_n$, if the group is finite cyclic of order $n$.
>
> Two cyclic groups are isomorphic iff they have the same order.

**Proof.** Let $G = \langle a\rangle$ be cyclic.

*Define a homomorphism.* Consider $\psi: \mathbb{Z} \to G$ by $\psi(k) = a^k$.

*Homomorphism:* $\psi(k + \ell) = a^{k + \ell} = a^k a^\ell = \psi(k) \psi(\ell)$.

*Surjective:* Since $G = \langle a\rangle$, every element of $G$ is of the form $a^k$ for some $k \in \mathbb{Z}$, hence in $\operatorname{Im} \psi$.

*Kernel.* $\ker \psi = \{k \in \mathbb{Z} : a^k = e\}$. Two cases:

- If $|a| = \infty$ (infinite cyclic), then $a^k = e$ only for $k = 0$, so $\ker \psi = \{0\}$. Then $\psi$ is an injective surjection, hence an isomorphism $\mathbb{Z} \cong G$.
- If $|a| = n$ finite, then $\{k \in \mathbb{Z} : a^k = e\} = n\mathbb{Z}$ (standard fact: the exponents yielding the identity form a subgroup of $\mathbb{Z}$, generated by the order). By the First Isomorphism Theorem, $\mathbb{Z}/n\mathbb{Z} \cong G$, i.e., $\mathbb{Z}_n \cong G$.

*Uniqueness.* $\mathbb{Z}$ and $\mathbb{Z}_n$ have different cardinalities, and different $\mathbb{Z}_n$'s have different orders, so the isomorphism class is determined by $|G|$. $\blacksquare$

---

## 17.7 Practice Problems

**Problem 1.** Show that $\varphi: \mathbb{Z} \to \mathbb{Z}$ defined by $\varphi(k) = 3k$ is a homomorphism. Find its kernel and image.

**Problem 2.** Prove that $\varphi: \mathbb{R} \to \mathbb{C}^*$ defined by $\varphi(t) = e^{2\pi i t}$ is a homomorphism. Find its kernel and image.

**Problem 3.** How many homomorphisms are there from $\mathbb{Z}_{12}$ to $\mathbb{Z}_8$?

**Problem 4.** Show that $S_3$ and $D_3$ are isomorphic by giving an explicit isomorphism.

**Problem 5.** Show that $\mathbb{Z}_4 \not\cong \mathbb{Z}_2 \times \mathbb{Z}_2$.

**Problem 6.** Let $\varphi: G \to H$ be a homomorphism. Show that if $|G| = 10$ and $|H| = 21$, then $\varphi$ must be trivial.

**Problem 7.** Determine $\operatorname{Aut}(\mathbb{Z}_8)$ and its order.

**Problem 8.** Find all homomorphisms $\mathbb{Z} \to \mathbb{Z}_5$.

---

### Solutions

**Solution 1.**

*Setup.* Let $\varphi: \mathbb{Z} \to \mathbb{Z}$ be defined by $\varphi(k) = 3k$.

*Strategy.* Verify the homomorphism property directly on the definition, then compute kernel and image.

*Computation — Homomorphism property.* For any $k, \ell \in \mathbb{Z}$:
$$\varphi(k + \ell) = 3(k + \ell) = 3k + 3\ell = \varphi(k) + \varphi(\ell). \qquad \checkmark$$

So $\varphi$ is a homomorphism.

*Computation — Kernel.* $\ker \varphi = \{k \in \mathbb{Z} : 3k = 0\}$. Since $\mathbb{Z}$ is an integral domain (no zero divisors), $3k = 0$ forces $k = 0$. Thus $\ker \varphi = \{0\}$.

*Computation — Image.* $\operatorname{Im} \varphi = \{3k : k \in \mathbb{Z}\} = 3\mathbb{Z}$, the subgroup of integer multiples of $3$.

*Verification.* Since $\ker \varphi = \{0\}$, by Theorem 17.7, $\varphi$ is injective. It is not surjective (e.g., $1 \notin 3\mathbb{Z}$). So $\varphi$ is a monomorphism that is not an isomorphism — consistent with being a multiplication-by-$3$ map on the infinite group $\mathbb{Z}$.

*Interpretation.* This example illustrates the phenomenon that in infinite groups, injective endomorphisms need not be surjective (contrast: in a finite group, injective endomorphisms are automatically surjective, by pigeonhole).

$\boxed{\ker \varphi = \{0\}, \quad \operatorname{Im} \varphi = 3\mathbb{Z}.}$ $\blacksquare$

---

**Solution 2.**

*Setup.* Let $\varphi: (\mathbb{R}, +) \to (\mathbb{C}^*, \cdot)$ be defined by $\varphi(t) = e^{2\pi i t}$.

*Strategy.* Verify the homomorphism property using the exponent identity $e^{x+y} = e^x e^y$; then compute kernel and image.

*Computation — Homomorphism property.* For any $s, t \in \mathbb{R}$:
$$\varphi(s + t) = e^{2\pi i (s + t)} = e^{2\pi i s + 2\pi i t} = e^{2\pi i s} \cdot e^{2\pi i t} = \varphi(s) \cdot \varphi(t). \qquad \checkmark$$

(Using the property $e^{z+w} = e^z e^w$ for complex exponentials, inherited from the real case via analytic continuation or directly from the series definition.)

*Computation — Kernel.*
$$\ker \varphi = \{t \in \mathbb{R} : e^{2\pi i t} = 1\} = \{t : 2\pi i t = 2\pi i k \text{ for some } k \in \mathbb{Z}\} = \{t : t \in \mathbb{Z}\} = \mathbb{Z}.$$

Here we used: $e^{i\theta} = 1 \iff \theta = 2\pi k$ for some integer $k$, a standard property of the exponential function on $i\mathbb{R}$. Dividing by $2\pi$ gives $t = k \in \mathbb{Z}$.

*Computation — Image.* The image is
$$\operatorname{Im} \varphi = \{e^{2\pi i t} : t \in \mathbb{R}\}.$$

For any $z \in \mathbb{C}$ with $|z| = 1$, write $z = e^{i\theta}$ (polar form); then $z = \varphi(\theta/(2\pi))$, showing $z \in \operatorname{Im}\varphi$. Conversely, $|\varphi(t)| = |e^{2\pi i t}| = 1$ for all $t$, so $\operatorname{Im}\varphi$ is contained in the unit circle.

Hence $\operatorname{Im} \varphi = S^1 = \{z \in \mathbb{C} : |z| = 1\}$, the **unit circle group** under multiplication.

*Verification via orbit-stabilizer heuristic.* The kernel $\mathbb{Z}$ is an infinite cyclic subgroup of $\mathbb{R}$; the image $S^1$ is the circle. Intuitively, $\varphi$ wraps the real line onto the circle with period $1$, and indeed by the First Isomorphism Theorem, $\mathbb{R}/\mathbb{Z} \cong S^1$ (Problem D1 of [[20-co3-practice-problems]]).

$\boxed{\ker \varphi = \mathbb{Z}, \quad \operatorname{Im} \varphi = S^1.}$ $\blacksquare$

---

**Solution 3.**

*Setup.* Count homomorphisms $\varphi: \mathbb{Z}_{12} \to \mathbb{Z}_8$.

*Strategy.* By Technique 2, such a homomorphism corresponds to an element $h \in \mathbb{Z}_8$ satisfying $12 h \equiv 0 \pmod 8$, equivalently $|h|$ (in $\mathbb{Z}_8$) divides $12$.

*Computation.* The element orders in $\mathbb{Z}_8$ are divisors of $8$: possible orders are $1, 2, 4, 8$.

Of these, the ones dividing $12$ are $\{1, 2, 4\}$ (since $8 \nmid 12$).

*Count elements of each order in $\mathbb{Z}_8$ using Euler's totient:*

| Order $d$ | Number of elements of order $d$ in $\mathbb{Z}_8$ |
|---|---|
| $1$ | $\varphi(1) = 1$ (just $h = 0$) |
| $2$ | $\varphi(2) = 1$ (just $h = 4$) |
| $4$ | $\varphi(4) = 2$ ($h \in \{2, 6\}$) |
| $8$ | $\varphi(8) = 4$ ($h \in \{1, 3, 5, 7\}$) |

*Total count of valid $h$:* Sum over orders dividing $\gcd(12, 8) = 4$: $\varphi(1) + \varphi(2) + \varphi(4) = 1 + 1 + 2 = 4$.

*Verification.* Formula: $|\operatorname{Hom}(\mathbb{Z}_n, \mathbb{Z}_m)| = \gcd(n, m)$. Here $\gcd(12, 8) = 4$. ✓

*Explicit list of homomorphisms.* For each $h \in \{0, 2, 4, 6\}$, the homomorphism $\varphi_h(k) = hk \bmod 8$. Verify each $h$:

- $h = 0$: trivial.
- $h = 2$: Check $\varphi_2(12) = 24 = 0 \pmod 8$ ✓. Good.
- $h = 4$: Check $\varphi_4(12) = 48 = 0 \pmod 8$ ✓.
- $h = 6$: Check $\varphi_6(12) = 72 = 0 \pmod 8$ ✓.

And $h = 1, 3, 5, 7$ don't work: e.g. $\varphi_1(12) = 12 = 4 \pmod 8 \neq 0$, so $\varphi_1$ is not a well-defined homomorphism from $\mathbb{Z}_{12}$.

$\boxed{4 \text{ homomorphisms}}$ $\blacksquare$

---

**Solution 4.**

*Setup.* $S_3$ is the symmetric group on $\{1, 2, 3\}$; $D_3$ is the dihedral group of the equilateral triangle, with presentation $D_3 = \langle r, s \mid r^3 = e, s^2 = e, srs = r^{-1}\rangle$.

Both have order $6$.

*Strategy.* Define $\varphi: D_3 \to S_3$ on generators, verify well-definedness via the relations, then check bijectivity.

*Define the map.* Set
$$\varphi(e) = e_{S_3}, \quad \varphi(r) = (1\,2\,3), \quad \varphi(s) = (1\,2).$$
Extend to all of $D_3$ by the homomorphism property:
$$\varphi(r^2) = (1\,2\,3)^2 = (1\,3\,2), \quad \varphi(rs) = (1\,2\,3)(1\,2) = (1\,3), \quad \varphi(r^2 s) = (1\,3\,2)(1\,2) = (2\,3).$$

*Verification of the relations.*

(i) $\varphi(r)^3 = (1\,2\,3)^3$. Compute: $(1\,2\,3)^2 = (1\,3\,2)$, so $(1\,2\,3)^3 = (1\,2\,3)(1\,3\,2) = e$. ✓

(ii) $\varphi(s)^2 = (1\,2)^2 = e$. ✓

(iii) $\varphi(s)\varphi(r)\varphi(s) = (1\,2)(1\,2\,3)(1\,2)$.

Compute left-to-right. First, $(1\,2\,3)(1\,2)$: to find the image of each $i$ under the composition (right-to-left convention: apply $(1\,2)$ first, then $(1\,2\,3)$),
- $1 \mapsto 2 \mapsto 3$,
- $2 \mapsto 1 \mapsto 2$,
- $3 \mapsto 3 \mapsto 1$.

So $(1\,2\,3)(1\,2) = (1\,3)$. (Check: $(1\,3)$ swaps $1 \leftrightarrow 3$ and fixes $2$ ✓.)

Now apply $(1\,2)$ on the left: $(1\,2)(1\,3)$:
- $1 \mapsto 3 \mapsto 3$,
- $2 \mapsto 2 \mapsto 1$,
- $3 \mapsto 1 \mapsto 2$.

So $(1\,2)(1\,3) = (1\,3\,2)$.

Hence $\varphi(s)\varphi(r)\varphi(s) = (1\,3\,2) = \varphi(r)^{-1} = \varphi(r^{-1})$, confirming the dihedral relation. ✓

*Bijectivity.* $\varphi$ sends the $6$ elements of $D_3$ to $6$ distinct elements of $S_3$:
$$\{e, r, r^2, s, rs, r^2 s\} \to \{e, (1\,2\,3), (1\,3\,2), (1\,2), (1\,3), (2\,3)\}.$$
The image is all of $S_3$ (which has exactly these $6$ elements). So $\varphi$ is a bijection. Combined with the homomorphism property (which follows from the relations being satisfied), $\varphi$ is an isomorphism.

*Interpretation.* The isomorphism realizes $D_3$ as "symmetries of a triangle = permutations of its vertices." Concretely, a rigid motion of the equilateral triangle permutes the three vertices, and this vertex-permutation determines the motion uniquely.

$\boxed{D_3 \cong S_3 \text{ via the above } \varphi.}$ $\blacksquare$

---

**Solution 5.**

*Setup.* Show $\mathbb{Z}_4 \not\cong \mathbb{Z}_2 \times \mathbb{Z}_2 = V_4$.

*Strategy.* Both groups have order $4$. To prove non-isomorphic, find a group-theoretic invariant that differs.

*Candidate invariant.* Number of elements of each order (invariant (7) from §17.3).

*Computation — $\mathbb{Z}_4$.* Elements are $\{0, 1, 2, 3\}$ under addition mod $4$. Compute orders:
- $|0| = 1$ (identity).
- $|1|$: smallest $k > 0$ with $k \cdot 1 \equiv 0 \pmod 4$. $k = 1: 1 \neq 0$; $k = 2: 2 \neq 0$; $k = 3: 3 \neq 0$; $k = 4: 4 \equiv 0$. So $|1| = 4$.
- $|2|$: $k = 1: 2; k = 2: 4 \equiv 0$. So $|2| = 2$.
- $|3|$: $k = 1: 3; k = 2: 6 \equiv 2; k = 3: 9 \equiv 1; k = 4: 12 \equiv 0$. So $|3| = 4$.

Order distribution: $(|e|, |1|, |2|, |3|) = (1, 4, 2, 4)$.

Count: one element of order $1$, one element of order $2$, two elements of order $4$.

*Computation — $V_4 = \{e, a, b, c\}$ with $a^2 = b^2 = c^2 = e$.* Orders:
- $|e| = 1$.
- $|a| = 2$ (by defining relation).
- $|b| = 2$.
- $|c| = 2$.

Count: one element of order $1$, three elements of order $2$, zero elements of order $4$.

*Comparison.* Elements of order $4$: $\mathbb{Z}_4$ has $2$, $V_4$ has $0$. Different. Any isomorphism $\varphi: \mathbb{Z}_4 \to V_4$ would send elements of order $4$ to elements of order $4$ (by Corollary A of Proposition 17.4), but $V_4$ has none to receive them — contradiction.

$\boxed{\mathbb{Z}_4 \not\cong V_4.}$ $\blacksquare$

*Remark.* $\mathbb{Z}_4$ is cyclic while $V_4$ is not (cyclicity is invariant (3) from §17.3), which gives the same conclusion via a different invariant. Both arguments are valid; the element-order invariant is usually the most direct.

---

**Solution 6.**

*Setup.* Given a homomorphism $\varphi: G \to H$ with $|G| = 10$ and $|H| = 21$, show $\varphi$ is trivial (i.e., $\varphi(g) = e_H$ for all $g \in G$).

*Strategy.* Use Corollary C of Proposition 17.4: if $\gcd(|G|, |H|) = 1$, then $\varphi$ is trivial. We verify the hypothesis.

*Computation.*
$$\gcd(10, 21) = \gcd(10, 21).$$
$21 = 2 \cdot 10 + 1$, so $\gcd(10, 21) = \gcd(10, 1) = 1$. ✓

*Detailed argument (unpacking the corollary).*

*Step 1.* Fix $g \in G$. By Lagrange's theorem, $|g|$ divides $|G| = 10$.

*Step 2.* By Proposition 17.4, $|\varphi(g)|$ divides $|g|$, hence divides $10$.

*Step 3.* $\varphi(g) \in H$, so $\langle \varphi(g)\rangle$ is a subgroup of $H$ of order $|\varphi(g)|$. By Lagrange, $|\varphi(g)|$ divides $|H| = 21$.

*Step 4.* $|\varphi(g)|$ is a common divisor of $10$ and $21$, hence divides $\gcd(10, 21) = 1$. So $|\varphi(g)| = 1$.

*Step 5.* $|\varphi(g)| = 1$ means $\varphi(g) = e_H$.

Since $g \in G$ was arbitrary, $\varphi(g) = e_H$ for every $g$, so $\varphi$ is the trivial homomorphism. $\blacksquare$

*Interpretation.* When $|G|$ and $|H|$ are coprime, no element of $G$ can map to a non-trivial element of $H$: the "order constraints" are incompatible. This is a powerful divisibility-based obstruction theorem.

*Remark.* The proof did not use that $|H| = 21$ in any particular way — any $|H|$ coprime to $10$ would force triviality. Conversely, if $\gcd(|G|, |H|) > 1$, non-trivial homomorphisms *can* exist (e.g., $\mathbb{Z}_4 \to \mathbb{Z}_6$ has the non-trivial homomorphism of Example 8).

---

**Solution 7.**

*Setup.* Determine $\operatorname{Aut}(\mathbb{Z}_8)$ and its order.

*Strategy.* Apply Example 15: $\operatorname{Aut}(\mathbb{Z}_n) \cong U(n)$. Compute $U(8)$ and determine its structure.

*Step 1: Compute $U(8)$.* By definition,
$$U(8) = \{k \in \mathbb{Z}_8 : \gcd(k, 8) = 1\} = \{1, 3, 5, 7\}.$$
Check: $\gcd(1, 8) = 1$ ✓; $\gcd(2, 8) = 2$ ✗; $\gcd(3, 8) = 1$ ✓; $\gcd(4, 8) = 4$ ✗; $\gcd(5, 8) = 1$ ✓; $\gcd(6, 8) = 2$ ✗; $\gcd(7, 8) = 1$ ✓.

So $|U(8)| = 4$.

*Step 2: Determine the structure of $U(8)$.* Compute the order of each element (under multiplication mod $8$):

- $|1| = 1$ (identity).
- $|3|$: $3^1 = 3, 3^2 = 9 \equiv 1$. So $|3| = 2$.
- $|5|$: $5^1 = 5, 5^2 = 25 \equiv 1$. So $|5| = 2$.
- $|7|$: $7^1 = 7, 7^2 = 49 \equiv 1$. So $|7| = 2$.

Every non-identity element has order $2$. This matches the structure of $V_4 = \mathbb{Z}_2 \times \mathbb{Z}_2$ (see Example 12), not $\mathbb{Z}_4$ (which has elements of order $4$).

*Verify isomorphism $U(8) \cong V_4$ explicitly.* Map $\Psi: V_4 \to U(8)$ by $\Psi(e) = 1, \Psi(a) = 3, \Psi(b) = 5, \Psi(c) = 7$. Check products: $3 \cdot 5 = 15 \equiv 7 = \Psi(c) = \Psi(ab)$ ✓; similarly $3 \cdot 7 = 21 \equiv 5 = \Psi(b) = \Psi(ac)$ ✓; $5 \cdot 7 = 35 \equiv 3 = \Psi(a) = \Psi(bc)$ ✓. Bijective, homomorphism. ✓

*Step 3: Conclude.* $\operatorname{Aut}(\mathbb{Z}_8) \cong U(8) \cong V_4 = \mathbb{Z}_2 \times \mathbb{Z}_2$, of order $4$.

*Explicit automorphisms of $\mathbb{Z}_8$:* Four automorphisms $\varphi_k(x) = kx$ for $k \in \{1, 3, 5, 7\}$:
- $\varphi_1 = \operatorname{id}$.
- $\varphi_3(x) = 3x \bmod 8$: $\varphi_3(1) = 3, \varphi_3(2) = 6, \ldots$
- $\varphi_5(x) = 5x \bmod 8$: $\varphi_5(1) = 5, \ldots$
- $\varphi_7(x) = 7x \bmod 8 \equiv -x \pmod 8$: the negation automorphism.

Each non-identity automorphism has order $2$ as a function (e.g., $\varphi_3 \circ \varphi_3 = \varphi_{9} = \varphi_1 = \operatorname{id}$), confirming $V_4$ structure.

$\boxed{|\operatorname{Aut}(\mathbb{Z}_8)| = 4; \; \operatorname{Aut}(\mathbb{Z}_8) \cong V_4.}$ $\blacksquare$

*Comparison.* Note $\operatorname{Aut}(\mathbb{Z}_5) \cong U(5) = \{1, 2, 3, 4\} \cong \mathbb{Z}_4$ (cyclic of order $4$), since $5$ is prime and $U(p)$ is cyclic of order $p - 1$ for odd primes. So $\operatorname{Aut}(\mathbb{Z}_n)$ depends on $n$ in a subtle number-theoretic way.

---

**Solution 8.**

*Setup.* Find all homomorphisms $\varphi: \mathbb{Z} \to \mathbb{Z}_5$.

*Strategy.* Use Technique 1: $\mathbb{Z}$ is cyclic with generator $1$, and since $\mathbb{Z}$ is infinite (no relations on $1$), the value $\varphi(1) \in \mathbb{Z}_5$ can be chosen freely; every choice extends to a homomorphism.

*Computation.*

For each $h \in \mathbb{Z}_5 = \{0, 1, 2, 3, 4\}$, define $\varphi_h: \mathbb{Z} \to \mathbb{Z}_5$ by
$$\varphi_h(k) = kh \bmod 5.$$

*Well-definedness.* Since $\mathbb{Z}$ has no relations beyond the group axioms, $\varphi_h$ is automatically a well-defined homomorphism: $\varphi_h(k + \ell) = (k + \ell)h = kh + \ell h = \varphi_h(k) + \varphi_h(\ell)$ (all mod $5$). ✓

*Distinct homomorphisms for distinct $h$.* If $h \neq h'$, then $\varphi_h(1) = h \neq h' = \varphi_{h'}(1)$, so $\varphi_h \neq \varphi_{h'}$.

*Count.* $5$ choices of $h$, giving $5$ distinct homomorphisms.

*Explicit list.*
- $\varphi_0$: trivial homomorphism, image $\{0\}$.
- $\varphi_1$: $k \mapsto k \bmod 5$, image $\mathbb{Z}_5$. Surjective; kernel $5\mathbb{Z}$.
- $\varphi_2$: $k \mapsto 2k \bmod 5$, image $\mathbb{Z}_5$ (since $\gcd(2, 5) = 1$, multiplication by $2$ is bijective mod $5$). Surjective; kernel $5\mathbb{Z}$.
- $\varphi_3$: $k \mapsto 3k \bmod 5$, similarly surjective, kernel $5\mathbb{Z}$.
- $\varphi_4$: $k \mapsto 4k \bmod 5 \equiv -k$, surjective, kernel $5\mathbb{Z}$.

*Verification for $\varphi_2$.* $\varphi_2(0) = 0, \varphi_2(1) = 2, \varphi_2(2) = 4, \varphi_2(3) = 6 \equiv 1, \varphi_2(4) = 8 \equiv 3, \varphi_2(5) = 10 \equiv 0$ ✓. Image: $\{0, 2, 4, 1, 3\} = \mathbb{Z}_5$. Kernel: integers $k$ with $2k \equiv 0 \pmod 5$, i.e., $k \in 5\mathbb{Z}$ (since $\gcd(2, 5) = 1$, $2k \equiv 0 \iff k \equiv 0$). ✓

*Sanity check via the formula.* Number of homomorphisms $\mathbb{Z} \to H$ = $|H|$ for any group $H$ (Technique 2 for $\mathbb{Z}$, which has no relations). Here $|H| = |\mathbb{Z}_5| = 5$. ✓

$\boxed{5 \text{ homomorphisms: } \varphi_h(k) = hk \bmod 5 \text{ for } h = 0, 1, 2, 3, 4.}$ $\blacksquare$

---

## Related Concepts

- [[15-group-actions]] — a group action of $G$ on a set $X$ is precisely a homomorphism $G \to \operatorname{Sym}(X)$.
- [[18-isomorphism-theorems]] — the First, Second, and Third Isomorphism Theorems, which formalize the kernel-quotient machinery introduced here.
- [[10-normal-subgroups-and-quotient-groups]] — every kernel is normal, and every normal subgroup is a kernel (namely of the quotient map).
- [[06-cyclic-groups-and-order]] — the classification of cyclic groups (Theorem 17.13) is where isomorphism theory begins.

---

*Last updated: 2026-04-19*
