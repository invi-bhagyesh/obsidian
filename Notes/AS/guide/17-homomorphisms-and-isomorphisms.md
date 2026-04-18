---
title: "Homomorphisms and Isomorphisms"
type: guide
co: CO3
related: [15-group-actions, 18-isomorphism-theorems, 10-normal-subgroups-and-quotient-groups]
---

# 17. Homomorphisms and Isomorphisms

A **homomorphism** is a structure-preserving map between groups — the notion of "function" that respects the group operation. An **isomorphism** is a homomorphism that is a bijection, establishing that two groups are "essentially the same." This chapter sets up the machinery of homomorphisms, proves basic properties, and develops the kernel-image framework that will lead to the Isomorphism Theorems of [[18-isomorphism-theorems]].

## 17.1 Homomorphisms

> **Definition 17.1 (Homomorphism).** Let $(G, *)$ and $(H, \circ)$ be groups. A **homomorphism** is a function $\varphi: G \to H$ such that
> $$\varphi(a * b) = \varphi(a) \circ \varphi(b) \qquad \text{for all } a, b \in G.$$

Drop the explicit operation symbols: $\varphi(ab) = \varphi(a)\varphi(b)$.

> **Definition 17.2.** A homomorphism $\varphi: G \to H$ is called:
> - **monomorphism** if injective
> - **epimorphism** if surjective
> - **isomorphism** if bijective
> - **endomorphism** if $G = H$
> - **automorphism** if $G = H$ and bijective

When $\varphi: G \to H$ is an isomorphism, we write $G \cong H$.

### Basic properties

> **Proposition 17.3.** Let $\varphi: G \to H$ be a homomorphism. Then:
> 1. $\varphi(e_G) = e_H$.
> 2. $\varphi(a^{-1}) = \varphi(a)^{-1}$ for all $a \in G$.
> 3. $\varphi(a^n) = \varphi(a)^n$ for all $n \in \mathbb{Z}$.

*Proofs.*
1. $\varphi(e_G) = \varphi(e_G \cdot e_G) = \varphi(e_G) \varphi(e_G)$. Cancel $\varphi(e_G)$.
2. $\varphi(a)\varphi(a^{-1}) = \varphi(a a^{-1}) = \varphi(e_G) = e_H$. So $\varphi(a^{-1})$ is the inverse of $\varphi(a)$.
3. Induction on $n$ for $n \ge 0$; use (2) for $n < 0$. $\blacksquare$

> **Proposition 17.4 (Order of image divides order of element).** If $a \in G$ has finite order, then $|\varphi(a)|$ divides $|a|$.

*Proof.* If $|a| = n$, then $\varphi(a)^n = \varphi(a^n) = \varphi(e) = e$, so $|\varphi(a)| \mid n$. $\blacksquare$

### Examples of homomorphisms

**Example 1.** The determinant $\det: GL_n(\mathbb{R}) \to \mathbb{R}^\times$ is a homomorphism: $\det(AB) = \det(A)\det(B)$.

**Example 2.** The sign homomorphism $\operatorname{sgn}: S_n \to \{\pm 1\}$. Kernel = $A_n$.

**Example 3.** $\pi: \mathbb{Z} \to \mathbb{Z}_n$, $\pi(k) = k \bmod n$. Epimorphism. Kernel = $n\mathbb{Z}$.

**Example 4.** $\exp: (\mathbb{R}, +) \to (\mathbb{R}^+, \cdot)$, $\exp(x) = e^x$. Isomorphism: $e^{x+y} = e^x e^y$. Inverse: $\log$.

**Example 5.** $\varphi: \mathbb{Z} \to \mathbb{Z}$, $\varphi(k) = 2k$. Monomorphism, not surjective.

**Example 6 (Inner automorphisms).** For $g \in G$, define $c_g: G \to G$, $c_g(h) = ghg^{-1}$. This is an automorphism: $c_g(h_1 h_2) = gh_1 h_2 g^{-1} = (gh_1 g^{-1})(gh_2 g^{-1}) = c_g(h_1) c_g(h_2)$. Inverse: $c_{g^{-1}}$.

**Example 7 (Trivial homomorphism).** $\varphi: G \to H$, $\varphi(g) = e_H$ for all $g$. Always a homomorphism.

**Example 8.** $\varphi: \mathbb{Z}_4 \to \mathbb{Z}_6$ by $\varphi(1) = 3$. Well-defined? Need $4 \cdot 3 \equiv 0 \pmod 6$, i.e., $12 \equiv 0 \pmod 6$ ✓. So $\varphi(k) = 3k \bmod 6$. Kernel = $\{0, 2\}$.

## 17.2 Kernel and Image

> **Definition 17.5.**
> - **Kernel:** $\ker \varphi = \{g \in G : \varphi(g) = e_H\}$
> - **Image:** $\operatorname{Im} \varphi = \varphi(G) = \{\varphi(g) : g \in G\}$

> **Proposition 17.6.**
> 1. $\ker \varphi \trianglelefteq G$ (normal subgroup)
> 2. $\operatorname{Im} \varphi \le H$ (subgroup, not necessarily normal)

*Proof.*

**(1).** Subgroup: $e \in \ker$; if $a, b \in \ker$, $\varphi(ab^{-1}) = \varphi(a)\varphi(b)^{-1} = e$. Normal: for $a \in \ker$, $g \in G$: $\varphi(gag^{-1}) = \varphi(g)\varphi(a)\varphi(g)^{-1} = \varphi(g) \cdot e \cdot \varphi(g)^{-1} = e$.

**(2).** Subgroup: $e_H = \varphi(e_G) \in \operatorname{Im}$; if $\varphi(a), \varphi(b) \in \operatorname{Im}$, $\varphi(a)\varphi(b)^{-1} = \varphi(ab^{-1}) \in \operatorname{Im}$. $\blacksquare$

### Injectivity criterion

> **Theorem 17.7.** $\varphi: G \to H$ is injective iff $\ker \varphi = \{e_G\}$.

*Proof.* ($\Rightarrow$) If injective and $\varphi(a) = e_H = \varphi(e_G)$, then $a = e_G$.

($\Leftarrow$) If $\varphi(a) = \varphi(b)$, then $\varphi(ab^{-1}) = \varphi(a)\varphi(b)^{-1} = e$, so $ab^{-1} \in \ker = \{e\}$, hence $a = b$. $\blacksquare$

This is a major utility: to check injectivity, just compute the kernel.

### Examples

**Example 9.** $\ker \det = SL_n(\mathbb{R})$.

**Example 10.** $\ker \operatorname{sgn} = A_n$ (for $n \ge 2$), $\operatorname{Im} \operatorname{sgn} = \{\pm 1\}$.

**Example 11.** $\ker \pi = n\mathbb{Z}$ for $\pi: \mathbb{Z} \to \mathbb{Z}_n$.

## 17.3 Isomorphisms

> **Definition 17.8.** A **group isomorphism** is a bijective homomorphism $\varphi: G \to H$.

> **Proposition 17.9.** If $\varphi: G \to H$ is an isomorphism, so is $\varphi^{-1}: H \to G$.

*Proof.* For $h_1, h_2 \in H$, apply $\varphi$ to $\varphi^{-1}(h_1 h_2)$ and $\varphi^{-1}(h_1)\varphi^{-1}(h_2)$:
$$\varphi(\varphi^{-1}(h_1 h_2)) = h_1 h_2, \quad \varphi(\varphi^{-1}(h_1)\varphi^{-1}(h_2)) = h_1 h_2.$$
Injectivity of $\varphi$ gives equality of the arguments. $\blacksquare$

### Isomorphism preserves everything group-theoretic

If $G \cong H$ via $\varphi$:
- Element orders: $|\varphi(g)| = |g|$
- Abelianness, cyclicity, simplicity, solvability
- Subgroup lattice structure (with subgroup $K \le G$ corresponding to $\varphi(K) \le H$)
- Number of elements of each order
- Center: $\varphi(Z(G)) = Z(H)$
- Normal subgroups correspond bijectively

These are **invariants** — tools to show groups are **not** isomorphic.

### Distinguishing groups by invariants

**Example 12.** Is $\mathbb{Z}_4 \cong V_4$? No — $\mathbb{Z}_4$ has an element of order 4, $V_4$ doesn't. Different invariants.

**Example 13.** Is $S_3 \cong \mathbb{Z}_6$? No — $S_3$ non-abelian, $\mathbb{Z}_6$ abelian.

**Example 14.** Is $S_3 \cong D_3$? **Yes** — both are non-abelian of order 6, and there's only one non-abelian group of order 6 (Problem 6 of [[14-co2-practice-problems]]). The isomorphism maps the rotation $r \to (1\,2\,3)$ and reflection $s \to (1\,2)$.

## 17.4 Automorphism Group

> **Definition 17.10.** $\operatorname{Aut}(G) = \{\varphi: G \to G : \varphi \text{ is an isomorphism}\}$, a group under composition.

> **Definition 17.11.** The **inner automorphism group** $\operatorname{Inn}(G) = \{c_g : g \in G\} \le \operatorname{Aut}(G)$.

> **Proposition 17.12.** $\operatorname{Inn}(G) \cong G / Z(G)$.

*Proof.* Map $c: G \to \operatorname{Aut}(G)$, $g \mapsto c_g$. Homomorphism because $c_{gh}(x) = ghx(gh)^{-1} = g(hxh^{-1})g^{-1} = c_g(c_h(x))$. Kernel: $c_g = \operatorname{id}$ iff $gxg^{-1} = x$ for all $x$ iff $g \in Z(G)$. Image: $\operatorname{Inn}(G)$. By First Isomorphism Theorem (next chapter), $\operatorname{Inn}(G) \cong G/Z(G)$. $\blacksquare$

**Example 15.** $\operatorname{Aut}(\mathbb{Z}_n) \cong U(n)$. Specifically, automorphisms of $\mathbb{Z}_n$ are of the form $\varphi_k(x) = kx$ for $k \in U(n)$.

**Example 16.** $\operatorname{Aut}(\mathbb{Z}_2 \times \mathbb{Z}_2) \cong S_3$. (Three non-identity elements, any permutation is an automorphism.)

**Example 17.** $\operatorname{Aut}(\mathbb{Z}) \cong \mathbb{Z}_2$ (only identity and negation).

## 17.5 Useful Techniques for Homomorphism Problems

### Technique 1: Define $\varphi$ on generators

If $G = \langle S \rangle$, a homomorphism $\varphi: G \to H$ is determined by $\varphi|_S$ (provided relations are satisfied). Example: defining $\varphi: \mathbb{Z}_n \to H$ is the same as picking an element $h \in H$ with $h^n = e$.

### Technique 2: Count homomorphisms

The number of homomorphisms $\varphi: \mathbb{Z}_n \to G$ equals the number of elements $h \in G$ with $h^n = e$.

**Example 18.** Count homomorphisms $\mathbb{Z}_4 \to \mathbb{Z}_6$.

*Solution.* Need elements $h \in \mathbb{Z}_6$ with $4h \equiv 0 \pmod 6$, i.e., $|h| \mid 4$. Orders of elements in $\mathbb{Z}_6$: $1, 2, 3, 6$. Those with $|h| \mid 4$: orders 1 and 2. Count: $\varphi(1) + \varphi(2) = 1 + 1 = 2$ elements: $0$ and $3$. So **2 homomorphisms**. $\boxed{2}$

### Technique 3: Factor through the kernel (First Isomorphism)

Any homomorphism factors as $G \twoheadrightarrow G/\ker \varphi \xrightarrow{\sim} \operatorname{Im} \varphi$. Saving for [[18-isomorphism-theorems]].

## 17.6 Classifying Finite Cyclic Groups up to Isomorphism

We already noted in [[06-cyclic-groups-and-order]]:

> **Theorem 17.13.** Every cyclic group is isomorphic to either $\mathbb{Z}$ (infinite) or $\mathbb{Z}_n$ (finite). Two cyclic groups are isomorphic iff they have the same order.

The proof uses the map $\mathbb{Z} \to G$, $k \mapsto a^k$, where $a$ generates $G$. Kernel is $|a|\mathbb{Z}$. First Isomorphism Theorem gives $\mathbb{Z}/|a|\mathbb{Z} \cong G$.

## 17.7 Practice Problems

**Problem 1.** Show that $\varphi: \mathbb{Z} \to \mathbb{Z}$, $\varphi(k) = 3k$, is a homomorphism. Find kernel and image.

**Problem 2.** Prove: $\varphi: \mathbb{R} \to \mathbb{C}^*$ by $\varphi(t) = e^{2\pi i t}$ is a homomorphism. Find kernel and image.

**Problem 3.** How many homomorphisms are there from $\mathbb{Z}_{12}$ to $\mathbb{Z}_8$?

**Problem 4.** Show that $S_3$ and $D_3$ are isomorphic by giving an explicit isomorphism.

**Problem 5.** Show that $\mathbb{Z}_4 \not\cong \mathbb{Z}_2 \times \mathbb{Z}_2$.

**Problem 6.** Let $\varphi: G \to H$ be a homomorphism. Show that if $|G| = 10$ and $|H| = 21$, then $\varphi$ must be trivial.

**Problem 7.** Determine $\operatorname{Aut}(\mathbb{Z}_8)$ and its order.

**Problem 8.** Find all homomorphisms $\mathbb{Z} \to \mathbb{Z}_5$.

### Solutions

**1.** $\varphi(k + l) = 3(k+l) = 3k + 3l = \varphi(k) + \varphi(l)$. ✓ $\ker = \{0\}$. $\operatorname{Im} = 3\mathbb{Z}$. $\boxed{}$

**2.** $\varphi(s + t) = e^{2\pi i (s+t)} = e^{2\pi is} e^{2\pi it} = \varphi(s)\varphi(t)$. $\ker = \mathbb{Z}$. $\operatorname{Im} = S^1$ (unit circle). $\boxed{}$

**3.** Need $h \in \mathbb{Z}_8$ with $12 h \equiv 0 \pmod 8$, i.e., $|h| \mid 12$. Element orders in $\mathbb{Z}_8$: $1, 2, 4, 8$. Those dividing 12: $\{1, 2, 4\}$. Count: $\varphi(1) + \varphi(2) + \varphi(4) = 1 + 1 + 2 = 4$. $\boxed{4\text{ homomorphisms}}$

**4.** Map $\varphi: D_3 \to S_3$: $e \to e$, $r \to (1\,2\,3)$, $r^2 \to (1\,3\,2)$, $s \to (1\,2)$, $rs \to (1\,3)$, $r^2 s \to (2\,3)$. Check $\varphi$ respects relations: $\varphi(r)^3 = (1\,2\,3)^3 = e$ ✓, $\varphi(s)^2 = e$ ✓, $\varphi(s)\varphi(r)\varphi(s) = (1\,2)(1\,2\,3)(1\,2) = (1\,3\,2) = \varphi(r)^{-1}$ ✓. Bijective, so isomorphism. $\blacksquare$

**5.** $\mathbb{Z}_4$ has an element of order 4. Every non-identity element of $V_4$ has order 2. So invariants differ. $\blacksquare$

**6.** $\gcd(|G|, |H|) = \gcd(10, 21) = 1$. For any $g \in G$, $|\varphi(g)|$ divides $|g|$ (hence $|G| = 10$) and $|H| = 21$ (Lagrange). So $|\varphi(g)| \mid \gcd(10, 21) = 1$, meaning $\varphi(g) = e_H$. $\blacksquare$

**7.** $\operatorname{Aut}(\mathbb{Z}_8) \cong U(8) = \{1, 3, 5, 7\}$. $|U(8)| = 4$. Check structure: $3^2 = 9 \equiv 1$, $5^2 = 25 \equiv 1$, $7^2 = 49 \equiv 1$. So $U(8) \cong \mathbb{Z}_2 \times \mathbb{Z}_2 = V_4$. $\boxed{|\operatorname{Aut}(\mathbb{Z}_8)| = 4,\ \cong V_4}$

**8.** A homomorphism $\mathbb{Z} \to \mathbb{Z}_5$ is determined by $\varphi(1) = h$ where $h \in \mathbb{Z}_5$. Any choice works since $\mathbb{Z}$ has no relations. So **5 homomorphisms**, corresponding to $h = 0, 1, 2, 3, 4$. $\boxed{5}$

## Related Concepts

- [[15-group-actions]] — actions are homomorphisms $G \to \operatorname{Sym}(X)$
- [[18-isomorphism-theorems]] — the three main isomorphism theorems
- [[10-normal-subgroups-and-quotient-groups]] — quotient group of kernel

---

*Last updated: 2026-04-18*
