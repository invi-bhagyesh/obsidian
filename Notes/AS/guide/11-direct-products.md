---
title: "Direct Products"
type: guide
co: CO2
related: [10-normal-subgroups-and-quotient-groups, 12-subgroup-lattice-and-dihedral-groups, 06-cyclic-groups-and-order]
---

# 11. Direct Products

Given two groups $G$ and $H$, the **direct product** $G \times H$ is the simplest way to combine them into a new group. It is the group-theoretic analogue of the Cartesian product: take the underlying set to be $G \times H = \{(g, h) : g \in G,\ h \in H\}$ and equip it with componentwise operation. Beyond mere construction, the crucial structural questions are:

1. **Synthesis.** Given two groups, what does their product look like? What are its subgroups, element orders, and abelian / cyclic properties?
2. **Analysis (decomposition).** When is a group $G$ isomorphic to a direct product of two (or more) of its subgroups? This lets us break a complicated group into smaller, more tractable pieces whose structure is easier to understand.
3. **Classification.** Via the Fundamental Theorem of Finite Abelian Groups, every finite abelian group is a direct product of cyclic groups of prime-power order, and this decomposition is unique up to reordering. This reduces the entire classification of finite abelian groups to a counting problem (partitions of exponents).

This chapter develops both the external and internal notions of direct product, proves the order formula $|(g, h)| = \operatorname{lcm}(|g|, |h|)$ in detail, establishes the fundamental criterion $\mathbb{Z}_m \times \mathbb{Z}_n \cong \mathbb{Z}_{mn} \iff \gcd(m, n) = 1$ (which is the group-theoretic version of the Chinese Remainder Theorem), and applies these tools to unit groups via the CRT and to abelian classification via FTFAG.

## 11.1 External Direct Product

> **Definition 11.1 (External direct product).** Let $(G, *)$ and $(H, \circ)$ be groups. The **external direct product** $G \times H$ is the set
> $$G \times H = \{(g, h) : g \in G,\ h \in H\}$$
> equipped with componentwise operation
> $$(g_1, h_1) \cdot (g_2, h_2) = (g_1 * g_2,\ h_1 \circ h_2).$$

**Notational remark.** We call this the *external* product to contrast with the *internal* product (§11.5), where we start with subgroups $H, K$ of a single group $G$ and ask when $G \cong H \times K$. The external construction always works; the internal one requires extra hypotheses.

> **Proposition 11.2.** $G \times H$ is a group under this operation.

*Proof.* We verify the four group axioms step by step.

**(1) Closure.** Let $(g_1, h_1), (g_2, h_2) \in G \times H$. By closure of $*$ in $G$, we have $g_1 * g_2 \in G$. By closure of $\circ$ in $H$, we have $h_1 \circ h_2 \in H$. Therefore
$$(g_1, h_1) \cdot (g_2, h_2) = (g_1 * g_2,\ h_1 \circ h_2) \in G \times H. \checkmark$$

**(2) Associativity.** For any $(g_1, h_1), (g_2, h_2), (g_3, h_3) \in G \times H$:
$$\big[(g_1, h_1)(g_2, h_2)\big](g_3, h_3) = (g_1 * g_2,\ h_1 \circ h_2)(g_3, h_3) = \big((g_1 * g_2) * g_3,\ (h_1 \circ h_2) \circ h_3\big).$$
Applying associativity in $G$ and $H$ componentwise,
$$= (g_1 * (g_2 * g_3),\ h_1 \circ (h_2 \circ h_3)) = (g_1, h_1)(g_2 * g_3,\ h_2 \circ h_3) = (g_1, h_1)\big[(g_2, h_2)(g_3, h_3)\big]. \checkmark$$

**(3) Identity.** We claim $(e_G, e_H)$ is the identity. For any $(g, h) \in G \times H$:
$$(e_G, e_H)(g, h) = (e_G * g,\ e_H \circ h) = (g, h),$$
$$(g, h)(e_G, e_H) = (g * e_G,\ h \circ e_H) = (g, h). \checkmark$$

**(4) Inverses.** Given $(g, h) \in G \times H$, let $(g^{-1}, h^{-1})$ denote the pair of inverses. Then
$$(g, h)(g^{-1}, h^{-1}) = (g * g^{-1},\ h \circ h^{-1}) = (e_G, e_H),$$
$$(g^{-1}, h^{-1})(g, h) = (g^{-1} * g,\ h^{-1} \circ h) = (e_G, e_H). \checkmark$$

All four axioms hold, so $(G \times H, \cdot)$ is a group. $\blacksquare$

*Remark (why this works).* The proof is pointwise in every axiom: each coordinate is closed, associative, has an identity, and has inverses because $G$ and $H$ do. No interaction between coordinates is needed — this is the hallmark of the direct product and contrasts with the *semidirect product*, where a nontrivial action of one factor on the other is built in.

> **Proposition 11.3 (Order).** If $G$ and $H$ are finite, then $|G \times H| = |G| \cdot |H|$.

*Proof.* The underlying set is the Cartesian product of $G$ and $H$; by basic set theory, a Cartesian product of finite sets has cardinality equal to the product of the cardinalities. $\blacksquare$

This generalizes by induction to any finite number of factors:
$$|G_1 \times G_2 \times \cdots \times G_k| = |G_1| \cdot |G_2| \cdots |G_k| = \prod_{i=1}^k |G_i|.$$

**Example 1.** Consider $\mathbb{Z}_2 \times \mathbb{Z}_3$, the direct product of the additive groups mod 2 and mod 3.

*Underlying set.*
$$\mathbb{Z}_2 \times \mathbb{Z}_3 = \{(0,0),\ (0,1),\ (0,2),\ (1,0),\ (1,1),\ (1,2)\},$$
a set of $2 \cdot 3 = 6$ elements, confirming Proposition 11.3.

*Element orders.* Compute the order of $(1, 1)$: we need the smallest positive $k$ with $(1, 1)^k = k \cdot (1, 1) = (k \bmod 2,\ k \bmod 3) = (0, 0)$. So we need $k$ divisible by both $2$ and $3$, the smallest of which is $\operatorname{lcm}(2, 3) = 6$. Hence $|(1, 1)| = 6 = |\mathbb{Z}_2 \times \mathbb{Z}_3|$.

*Conclusion.* Since $\mathbb{Z}_2 \times \mathbb{Z}_3$ has an element of order equal to the group's order, it is cyclic: $\mathbb{Z}_2 \times \mathbb{Z}_3 = \langle (1, 1) \rangle \cong \mathbb{Z}_6$. This is a preview of Theorem 11.6. $\blacksquare$

**Example 2.** Consider $\mathbb{Z}_2 \times \mathbb{Z}_2 = \{(0,0), (0,1), (1,0), (1,1)\}$, a group of order $4$.

*Element orders.* Every non-identity element $(a, b)$ satisfies $2 \cdot (a, b) = (2a \bmod 2,\ 2b \bmod 2) = (0, 0)$, so every non-identity element has order $2$. Since no element has order $4$, this group is **not cyclic**. It is the Klein four-group $V_4 \cong \mathbb{Z}_2 \times \mathbb{Z}_2$.

*Contrast with Example 1.* The difference is $\gcd(2, 3) = 1$ in Example 1 versus $\gcd(2, 2) = 2$ here. This is exactly the distinction drawn by Theorem 11.6.

**Example 3.** $\mathbb{Z} \times \mathbb{Z}$ is an infinite abelian group.

*Structure.* Every nonzero element $(a, b)$ has infinite order: $n(a, b) = (na, nb) = (0, 0)$ would require $na = 0$ and $nb = 0$ in $\mathbb{Z}$, which forces $n = 0$ unless $a = b = 0$. This is called the **free abelian group of rank $2$**: it has a $\mathbb{Z}$-basis $\{(1, 0), (0, 1)\}$, and every element is uniquely a $\mathbb{Z}$-linear combination.

## 11.2 Order of an Element in a Direct Product

> **Theorem 11.4 (Order of $(g, h)$).** Let $(g, h) \in G \times H$ with $|g| = m$ and $|h| = n$ both finite. Then
> $$|(g, h)| = \operatorname{lcm}(m, n).$$

*Proof.* We prove two containments on the set $\{k \in \mathbb{Z}^+ : (g, h)^k = (e_G, e_H)\}$ and identify the minimum.

**Step 1: Characterize when $(g, h)^k = (e_G, e_H)$.**

By the componentwise operation, $(g, h)^k = (g^k, h^k)$. (Formally this is an easy induction on $k$: $(g, h)^1 = (g, h) = (g^1, h^1)$; assuming $(g, h)^k = (g^k, h^k)$, we get $(g, h)^{k+1} = (g, h)^k (g, h) = (g^k, h^k)(g, h) = (g^k g, h^k h) = (g^{k+1}, h^{k+1})$.)

Hence
$$(g, h)^k = (e_G, e_H) \iff g^k = e_G \text{ and } h^k = e_H. \tag{$\ast$}$$

**Step 2: Translate into divisibility.**

Recall from Chapter 6 that for $g \in G$ with $|g| = m$, we have $g^k = e_G \iff m \mid k$ (i.e., $k$ is a multiple of $m$). Similarly $h^k = e_H \iff n \mid k$.

Substituting into ($\ast$):
$$(g, h)^k = (e_G, e_H) \iff m \mid k \text{ and } n \mid k. \tag{$\ast\ast$}$$

**Step 3: Rewrite using lcm.**

By definition (or by the Fundamental Theorem of Arithmetic), $m \mid k$ and $n \mid k$ simultaneously $\iff \operatorname{lcm}(m, n) \mid k$. Hence
$$(g, h)^k = (e_G, e_H) \iff \operatorname{lcm}(m, n) \mid k.$$

**Step 4: Identify the order.**

The order $|(g, h)|$ is the smallest *positive* integer $k$ satisfying this condition. The smallest positive multiple of $\operatorname{lcm}(m, n)$ is $\operatorname{lcm}(m, n)$ itself. Therefore
$$|(g, h)| = \operatorname{lcm}(m, n). \checkmark$$

**Sanity check.** If $m = n$, we get $|(g, h)| = \operatorname{lcm}(m, m) = m = |g| = |h|$ — as expected, since both components must complete a full cycle simultaneously. If $\gcd(m, n) = 1$, we get $|(g, h)| = mn$. $\blacksquare$

*Remark (intuition).* Think of $(g, h)$ as two independent "clocks" running at periods $m$ and $n$. The clocks simultaneously show $e$ only at times that are multiples of both $m$ and $n$ — i.e., multiples of $\operatorname{lcm}(m, n)$.

*Remark (generalization).* For a product of $k$ groups, $|(g_1, g_2, \ldots, g_k)| = \operatorname{lcm}(|g_1|, |g_2|, \ldots, |g_k|)$, proved by the same argument.

**Example 4.** In $\mathbb{Z}_{12} \times \mathbb{Z}_{18}$, compute the order of $(8, 12)$.

*Setup.* We need $|8|$ in $\mathbb{Z}_{12}$ and $|12|$ in $\mathbb{Z}_{18}$.

*Strategy.* Use the cyclic-group order formula: in $\mathbb{Z}_n$, the element $a$ has order $n / \gcd(n, a)$.

*Computation.*
- $|8|_{\mathbb{Z}_{12}} = \dfrac{12}{\gcd(12, 8)} = \dfrac{12}{4} = 3.$
- $|12|_{\mathbb{Z}_{18}} = \dfrac{18}{\gcd(18, 12)} = \dfrac{18}{6} = 3.$

*Apply Theorem 11.4.*
$$|(8, 12)| = \operatorname{lcm}(3, 3) = 3.$$

*Verification.* Check by direct computation:
- $1 \cdot (8, 12) = (8, 12) \neq (0, 0).$
- $2 \cdot (8, 12) = (16 \bmod 12,\ 24 \bmod 18) = (4, 6) \neq (0, 0).$
- $3 \cdot (8, 12) = (24 \bmod 12,\ 36 \bmod 18) = (0, 0). \checkmark$

Hence $|(8, 12)| = 3$. $\blacksquare$

> **Corollary 11.5 (Abelian product).** $G \times H$ is abelian $\iff$ both $G$ and $H$ are abelian.

*Proof.*

($\Rightarrow$) Suppose $G \times H$ is abelian. Pick any $g_1, g_2 \in G$. Then $(g_1, e_H)(g_2, e_H) = (g_2, e_H)(g_1, e_H)$ gives $(g_1 g_2, e_H) = (g_2 g_1, e_H)$, so $g_1 g_2 = g_2 g_1$. Hence $G$ is abelian. Symmetrically $H$ is abelian.

($\Leftarrow$) Suppose $G$ and $H$ are both abelian. For any $(g_1, h_1), (g_2, h_2) \in G \times H$:
$$(g_1, h_1)(g_2, h_2) = (g_1 g_2,\ h_1 h_2) = (g_2 g_1,\ h_2 h_1) = (g_2, h_2)(g_1, h_1),$$
using commutativity in each coordinate. Hence $G \times H$ is abelian. $\blacksquare$

*Remark.* The same argument shows: $G \times H$ has *any* property that is defined coordinate-wise (being a group of exponent $n$, being torsion, having a specific center, etc.) iff both factors do.

## 11.3 When Is $\mathbb{Z}_m \times \mathbb{Z}_n$ Cyclic?

This is one of the most frequently used theorems in finite group theory — it is the *group-theoretic Chinese Remainder Theorem*.

> **Theorem 11.6 ($\mathbb{Z}_m \times \mathbb{Z}_n$ cyclic iff coprime).** For positive integers $m, n$:
> $$\mathbb{Z}_m \times \mathbb{Z}_n \cong \mathbb{Z}_{mn} \iff \gcd(m, n) = 1.$$

*Proof.* We have $|\mathbb{Z}_m \times \mathbb{Z}_n| = mn$ by Proposition 11.3. Recall that a group of order $N$ is cyclic iff it has an element of order $N$.

**($\Rightarrow$) Suppose $\mathbb{Z}_m \times \mathbb{Z}_n \cong \mathbb{Z}_{mn}$.**

Then $\mathbb{Z}_m \times \mathbb{Z}_n$ is cyclic, so it has an element of order $mn$. But by Theorem 11.4, for any $(a, b) \in \mathbb{Z}_m \times \mathbb{Z}_n$ we have
$$|(a, b)| = \operatorname{lcm}(|a|, |b|) \le \operatorname{lcm}(m, n),$$
since $|a| \mid m$ (by Lagrange in $\mathbb{Z}_m$) and $|b| \mid n$, and the lcm is monotone under divisibility.

So the maximum possible element order in $\mathbb{Z}_m \times \mathbb{Z}_n$ is $\operatorname{lcm}(m, n)$. Hence
$$mn \le \operatorname{lcm}(m, n).$$

But in general $\operatorname{lcm}(m, n) \le mn$ (since $mn$ is a common multiple). So $\operatorname{lcm}(m, n) = mn$.

Now use the identity $\gcd(m, n) \cdot \operatorname{lcm}(m, n) = mn$ (a consequence of the Fundamental Theorem of Arithmetic: if $m = \prod p_i^{a_i}$ and $n = \prod p_i^{b_i}$, then $\gcd = \prod p_i^{\min(a_i, b_i)}$ and $\operatorname{lcm} = \prod p_i^{\max(a_i, b_i)}$, and $\min + \max = a_i + b_i$).

Dividing: $\gcd(m, n) = \dfrac{mn}{\operatorname{lcm}(m, n)} = \dfrac{mn}{mn} = 1$. $\checkmark$

**($\Leftarrow$) Suppose $\gcd(m, n) = 1$.**

Using $\gcd \cdot \operatorname{lcm} = mn$, this gives $\operatorname{lcm}(m, n) = mn$.

Consider the specific element $(1, 1) \in \mathbb{Z}_m \times \mathbb{Z}_n$. Using Theorem 11.4 with $|1|_{\mathbb{Z}_m} = m$ and $|1|_{\mathbb{Z}_n} = n$:
$$|(1, 1)| = \operatorname{lcm}(m, n) = mn.$$

So $(1, 1)$ generates a cyclic subgroup of order $mn$. Since $|\mathbb{Z}_m \times \mathbb{Z}_n| = mn$, the subgroup $\langle (1, 1) \rangle$ equals the whole group. Therefore $\mathbb{Z}_m \times \mathbb{Z}_n = \langle (1, 1) \rangle$ is cyclic of order $mn$.

Any two cyclic groups of the same order are isomorphic (via $(1, 1)^k \leftrightarrow k \bmod mn$ in the case at hand), so
$$\mathbb{Z}_m \times \mathbb{Z}_n \cong \mathbb{Z}_{mn}. \checkmark$$

This completes both directions. $\blacksquare$

*Remark (the explicit isomorphism).* When $\gcd(m, n) = 1$, an explicit isomorphism $\mathbb{Z}_{mn} \to \mathbb{Z}_m \times \mathbb{Z}_n$ is given by $k \bmod mn \mapsto (k \bmod m,\ k \bmod n)$. This is the classical Chinese Remainder Theorem: given congruences $x \equiv a \pmod m$ and $x \equiv b \pmod n$ with $\gcd(m, n) = 1$, there is a unique $x$ mod $mn$ solving both.

*Remark (why coprimality matters).* If $d = \gcd(m, n) > 1$, then $\operatorname{lcm}(m, n) = mn/d < mn$, so no element can reach order $mn$; the group splits into "twisted" cycles and fails to be cyclic.

> **Corollary 11.7 (Generalization to $k$ factors).**
> $$\mathbb{Z}_{n_1} \times \mathbb{Z}_{n_2} \times \cdots \times \mathbb{Z}_{n_k} \cong \mathbb{Z}_{n_1 n_2 \cdots n_k} \iff n_1, n_2, \ldots, n_k \text{ are pairwise coprime}.$$

*Proof sketch.* By induction on $k$, using Theorem 11.6 as the base case and the fact that $\gcd(n_1, n_2 \cdots n_k) = 1 \iff \gcd(n_1, n_i) = 1$ for each $i$. The generalization of Theorem 11.4 gives $|(1, 1, \ldots, 1)| = \operatorname{lcm}(n_1, \ldots, n_k)$, and $\operatorname{lcm}(n_1, \ldots, n_k) = n_1 \cdots n_k$ iff the $n_i$ are pairwise coprime. $\blacksquare$

**Example 5.** Is $\mathbb{Z}_4 \times \mathbb{Z}_6 \cong \mathbb{Z}_{24}$?

*Answer.* No. Since $\gcd(4, 6) = 2 \neq 1$, by Theorem 11.6 the product is *not* cyclic.

*Verification.* The maximum element order is $\operatorname{lcm}(4, 6) = 12$, not $24$. Explicitly, $(1, 1)$ has order $12$, so $\langle (1, 1) \rangle$ is a proper subgroup of order $12$ in a group of order $24$.

*Structural remark.* So what *is* $\mathbb{Z}_4 \times \mathbb{Z}_6$? We can refine using Theorem 11.6 again: $\mathbb{Z}_6 \cong \mathbb{Z}_2 \times \mathbb{Z}_3$ (since $\gcd(2,3) = 1$), so
$$\mathbb{Z}_4 \times \mathbb{Z}_6 \cong \mathbb{Z}_4 \times \mathbb{Z}_2 \times \mathbb{Z}_3 \cong \mathbb{Z}_{12} \times \mathbb{Z}_2 \cong \mathbb{Z}_4 \times \mathbb{Z}_6.$$
The "invariant factor form" is $\mathbb{Z}_{12} \times \mathbb{Z}_2$ (each successive invariant factor divides the next, here $2 \mid 12$) and the "elementary divisor form" is $\mathbb{Z}_4 \times \mathbb{Z}_2 \times \mathbb{Z}_3$.

**Example 6.** Is $\mathbb{Z}_3 \times \mathbb{Z}_5 \times \mathbb{Z}_8 \cong \mathbb{Z}_{120}$?

*Answer.* Yes. Check pairwise coprimality:
- $\gcd(3, 5) = 1$. $\checkmark$
- $\gcd(3, 8) = 1$. $\checkmark$
- $\gcd(5, 8) = 1$. $\checkmark$

By Corollary 11.7, the product is cyclic of order $3 \cdot 5 \cdot 8 = 120$, generated by $(1, 1, 1)$.

*Verification.* $|(1, 1, 1)| = \operatorname{lcm}(3, 5, 8) = 120$. $\checkmark$

## 11.4 Unit Groups and the Chinese Remainder Theorem

The direct-product structure of $\mathbb{Z}_{mn}$ transfers to the group of units $U(mn)$, giving a powerful decomposition tool.

> **Theorem 11.8 (CRT for unit groups).** If $\gcd(m, n) = 1$, then
> $$U(mn) \cong U(m) \times U(n).$$

*Proof.*

**Step 1: Ring isomorphism.** The Chinese Remainder Theorem (in ring form) states that when $\gcd(m, n) = 1$,
$$\varphi: \mathbb{Z}/mn\mathbb{Z} \to \mathbb{Z}/m\mathbb{Z} \times \mathbb{Z}/n\mathbb{Z}, \quad \varphi(k \bmod mn) = (k \bmod m,\ k \bmod n)$$
is an *isomorphism of rings*. (For additive structure, this is Theorem 11.6. Multiplicativity: $\varphi(kl) = (kl \bmod m, kl \bmod n) = ((k \bmod m)(l \bmod m), (k \bmod n)(l \bmod n)) = \varphi(k)\varphi(l)$.) Well-definedness uses $\gcd(m,n) = 1$; bijectivity is the classical CRT.

**Step 2: Units correspond.** In any ring isomorphism $\varphi: R \to S$, an element $r \in R$ is a unit iff $\varphi(r)$ is a unit in $S$, because $\varphi(r) \varphi(r^{-1}) = \varphi(r r^{-1}) = \varphi(1) = 1_S$ (and vice versa). So $\varphi$ restricts to a bijection of unit groups:
$$\varphi|_{U(mn)}: U(mn) \to U(\mathbb{Z}/m \times \mathbb{Z}/n).$$

**Step 3: Units of a product ring.** An element $(a, b)$ of the product ring $\mathbb{Z}/m \times \mathbb{Z}/n$ is a unit iff *both* $a$ and $b$ are units in their respective rings. (Proof: if $(a, b)(c, d) = (1, 1)$ then $ac = 1$ and $bd = 1$, so $a, b$ are units; conversely, $(a^{-1}, b^{-1})$ is the inverse.) Hence
$$U(\mathbb{Z}/m \times \mathbb{Z}/n) = U(\mathbb{Z}/m) \times U(\mathbb{Z}/n) = U(m) \times U(n).$$

**Combining** Steps 2 and 3:
$$U(mn) \cong U(m) \times U(n). \blacksquare$$

> **Corollary 11.9 (Prime-power decomposition of $U(n)$).** If $n = p_1^{a_1} p_2^{a_2} \cdots p_k^{a_k}$ is the prime factorization of $n$, then
> $$U(n) \cong U(p_1^{a_1}) \times U(p_2^{a_2}) \times \cdots \times U(p_k^{a_k}).$$

*Proof.* Iterate Theorem 11.8: the prime powers $p_i^{a_i}$ are pairwise coprime, so apply CRT $k - 1$ times. $\blacksquare$

**Consequence.** Classifying $U(n)$ reduces to classifying $U(p^a)$ for prime powers. The complete answer (which we cite without proof) is:

> **Theorem 11.10 (Structure of $U(p^a)$).**
> - $U(p^a) \cong \mathbb{Z}_{p^{a-1}(p-1)}$ is *cyclic* for odd primes $p$ and all $a \ge 1$.
> - $U(2) \cong \{1\}$ (trivial).
> - $U(4) \cong \mathbb{Z}_2$.
> - $U(2^a) \cong \mathbb{Z}_2 \times \mathbb{Z}_{2^{a-2}}$ for $a \ge 3$ (*not* cyclic).

**Example 7.** Determine the structure of $U(12)$.

*Setup.* $12 = 4 \cdot 3$, with $\gcd(4, 3) = 1$. Apply CRT:
$$U(12) \cong U(4) \times U(3).$$

*Computing the factors.*
- $U(4) = \{1, 3\}$, with $3^2 = 9 \equiv 1 \pmod 4$. So $|3| = 2$ and $U(4) \cong \mathbb{Z}_2$.
- $U(3) = \{1, 2\}$, with $2^2 = 4 \equiv 1 \pmod 3$. So $|2| = 2$ and $U(3) \cong \mathbb{Z}_2$.

*Putting it together.* $U(12) \cong \mathbb{Z}_2 \times \mathbb{Z}_2 = V_4$, the Klein four-group.

*Direct verification.* $U(12) = \{1, 5, 7, 11\}$ (units mod 12 are coprime to 12). Check orders:
- $5^2 = 25 \equiv 1 \pmod{12}$.
- $7^2 = 49 = 48 + 1 \equiv 1 \pmod{12}$.
- $11^2 = 121 = 120 + 1 \equiv 1 \pmod{12}$.

Every non-identity element squares to the identity, confirming $U(12) \cong V_4 \cong \mathbb{Z}_2 \times \mathbb{Z}_2$. $\blacksquare$

**Example 8.** Determine the structure of $U(15)$.

*Setup.* $15 = 3 \cdot 5$, with $\gcd(3, 5) = 1$. Apply CRT:
$$U(15) \cong U(3) \times U(5).$$

*Computing the factors.*
- $U(3) \cong \mathbb{Z}_2$ (from Example 7).
- $U(5) = \{1, 2, 3, 4\}$. Check $|2|$: $2^2 = 4$, $2^3 = 8 \equiv 3$, $2^4 = 16 \equiv 1$. So $|2| = 4$ and $U(5) = \langle 2 \rangle \cong \mathbb{Z}_4$.

*Product.* $U(15) \cong \mathbb{Z}_2 \times \mathbb{Z}_4$.

*Is this cyclic?* Apply Theorem 11.6: $\gcd(2, 4) = 2 \neq 1$, so $\mathbb{Z}_2 \times \mathbb{Z}_4 \not\cong \mathbb{Z}_8$. The maximum element order is $\operatorname{lcm}(2, 4) = 4$, not $8$.

*Direct verification.* $U(15) = \{1, 2, 4, 7, 8, 11, 13, 14\}$. Compute $|2|$ in $U(15)$: $2^2 = 4$, $2^3 = 8$, $2^4 = 16 \equiv 1 \pmod{15}$. So $|2| = 4 < 8$; confirms non-cyclic. $\blacksquare$

## 11.5 Internal Direct Product

In §11.1 we built a new group $G \times H$ from two given groups. Now we go in reverse: given a group $G$ and subgroups $H, K$, when does $G$ "look like" $H \times K$?

> **Definition 11.10 (Internal direct product).** Let $G$ be a group with subgroups $H, K \le G$. We say $G$ is the **internal direct product** of $H$ and $K$, written $G = H \times K$, if:
>
> 1. $G = HK = \{hk : h \in H,\ k \in K\}$,
> 2. $H \cap K = \{e\}$,
> 3. $H \trianglelefteq G$ and $K \trianglelefteq G$ (both normal in $G$).

*Why each condition?* Condition (1) ensures every element decomposes as $hk$; (2) ensures the decomposition is unique; (3) ensures $h$ and $k$ commute, so that composition matches the direct-product rule $(h_1, k_1)(h_2, k_2) = (h_1 h_2, k_1 k_2)$. We prove these claims precisely in Theorem 11.11.

> **Theorem 11.11 (Internal $\iff$ external).** If $G$ is the internal direct product of $H$ and $K$, then the map
> $$\varphi: H \times K \to G, \quad \varphi(h, k) = hk$$
> is an isomorphism of groups. Consequently $G \cong H \times K$ externally.

*Proof.* We verify each property of $\varphi$: well-definedness, homomorphism, injectivity, surjectivity.

**Step 1: Well-defined.**

Given $(h, k) \in H \times K$, the product $hk$ is well-defined in $G$ since $h, k \in G$ and $G$ is a group. So $\varphi$ maps into $G$. $\checkmark$

**Step 2: Elements of $H$ commute with elements of $K$.**

This is the key lemma. Take any $h \in H$, $k \in K$, and consider the *commutator*
$$[h, k] := h k h^{-1} k^{-1}.$$
We claim $[h, k] = e$.

*Sub-claim: $[h, k] \in H$.*
Write $[h, k] = h \cdot (k h^{-1} k^{-1})$. Since $H \trianglelefteq G$, conjugation by $k$ preserves $H$: $k h^{-1} k^{-1} \in H$. Hence $[h, k] = h \cdot (\text{element of } H) \in H$.

*Sub-claim: $[h, k] \in K$.*
Write $[h, k] = (h k h^{-1}) \cdot k^{-1}$. Since $K \trianglelefteq G$, conjugation by $h$ preserves $K$: $h k h^{-1} \in K$. Hence $[h, k] = (\text{element of } K) \cdot k^{-1} \in K$.

*Combining:* $[h, k] \in H \cap K = \{e\}$ by Condition 2. So $[h, k] = e$, i.e., $hkh^{-1}k^{-1} = e$, which rearranges to $hk = kh$. $\checkmark$

**Step 3: $\varphi$ is a homomorphism.**

For $(h_1, k_1), (h_2, k_2) \in H \times K$:
$$\varphi((h_1, k_1)(h_2, k_2)) = \varphi(h_1 h_2, k_1 k_2) = h_1 h_2 k_1 k_2.$$
On the other hand,
$$\varphi(h_1, k_1) \varphi(h_2, k_2) = (h_1 k_1)(h_2 k_2) = h_1 k_1 h_2 k_2.$$
We need $h_1 h_2 k_1 k_2 = h_1 k_1 h_2 k_2$, i.e., $h_2 k_1 = k_1 h_2$. This is exactly Step 2 applied to $h_2 \in H$ and $k_1 \in K$. $\checkmark$

**Step 4: Injectivity.**

It suffices to show $\ker \varphi = \{(e, e)\}$. Suppose $\varphi(h, k) = hk = e$. Then $h = k^{-1}$, and since $k^{-1} \in K$, we have $h \in K$. But $h \in H$ by hypothesis, so $h \in H \cap K = \{e\}$. Hence $h = e$ and $k = h^{-1} = e$. $\checkmark$

**Step 5: Surjectivity.**

By Condition 1, $G = HK$, so every $g \in G$ can be written as $g = hk$ for some $h \in H, k \in K$. Then $\varphi(h, k) = hk = g$. $\checkmark$

All four properties hold, so $\varphi: H \times K \to G$ is an isomorphism. $\blacksquare$

*Remark (uniqueness of decomposition).* Injectivity gives: if $h_1 k_1 = h_2 k_2$ with $h_i \in H, k_i \in K$, then $(h_1, k_1) = (h_2, k_2)$, i.e., the expression $g = hk$ is *unique*. This is sometimes stated as a condition equivalent to (2) + a weaker form of (3).

*Remark (alternative criteria).* The three conditions can be weakened: if $HK = G$ and $H \cap K = \{e\}$ and $hk = kh$ for all $h \in H, k \in K$, then $G = H \times K$ internally. Normality is used only to get the commutation.

**Example 9.** The Klein four-group as an internal direct product.

Write $V_4 = \{e, a, b, ab\}$ with $a^2 = b^2 = (ab)^2 = e$ and $ab = ba$. Let $H = \langle a \rangle = \{e, a\}$ and $K = \langle b \rangle = \{e, b\}$.

*Verify Condition 1 ($G = HK$).*
$$HK = \{e \cdot e,\ e \cdot b,\ a \cdot e,\ a \cdot b\} = \{e, b, a, ab\} = V_4. \checkmark$$

*Verify Condition 2 ($H \cap K = \{e\}$).*
$$H \cap K = \{e, a\} \cap \{e, b\} = \{e\} \text{ (since } a \neq b). \checkmark$$

*Verify Condition 3 (normality).*
$V_4$ is abelian, so every subgroup is normal. $\checkmark$

By Theorem 11.11, $V_4 \cong \langle a \rangle \times \langle b \rangle \cong \mathbb{Z}_2 \times \mathbb{Z}_2$. $\blacksquare$

**Example 10 (failure of internal direct product).** Is $S_3$ an internal direct product of $A_3$ and $\langle (1\,2) \rangle$?

*Setup.* $A_3 = \{e, (1\,2\,3), (1\,3\,2)\}$ (order 3) and $\langle (1\,2) \rangle = \{e, (1\,2)\}$ (order 2).

*Check Condition 1.* $|A_3 \cdot \langle (1\,2) \rangle| = |A_3| |\langle (1\,2) \rangle| / |A_3 \cap \langle (1\,2) \rangle| = 3 \cdot 2 / 1 = 6 = |S_3|$, so $A_3 \cdot \langle (1\,2) \rangle = S_3$. $\checkmark$

*Check Condition 2.* $A_3 \cap \langle (1\,2) \rangle$: the only common element is $e$ (since $(1\,2) \notin A_3$, as it's a transposition of odd parity). $\checkmark$

*Check Condition 3.* Is $\langle (1\,2) \rangle$ normal in $S_3$? Conjugate $(1\,2)$ by $(1\,2\,3)$:
$$(1\,2\,3)(1\,2)(1\,2\,3)^{-1} = (1\,2\,3)(1\,2)(1\,3\,2).$$
Compute: $(1\,2\,3)(1\,2) = (1\,3)$ (since $(1\,2\,3)(1\,2): 1 \to 2 \to 3$, so $1 \to 3$; $2 \to 1 \to 1$, so $2 \to 1$... wait, let me redo this carefully).

*Careful recomputation.* Using the convention of right-to-left composition: $(1\,2\,3)(1\,2)$ applied to $1$: first $(1\,2)$ sends $1 \to 2$, then $(1\,2\,3)$ sends $2 \to 3$. So $1 \to 3$. Apply to $2$: $(1\,2)$ sends $2 \to 1$, then $(1\,2\,3)$ sends $1 \to 2$. So $2 \to 2$. Apply to $3$: $(1\,2)$ fixes $3$, then $(1\,2\,3)$ sends $3 \to 1$. So $3 \to 1$. The result is the cycle $(1\,3)$, swapping $1$ and $3$.

Now compose with $(1\,3\,2) = (1\,2\,3)^{-1}$: apply to $1$: $(1\,3\,2)$ sends $1 \to 3$, then $(1\,3)$ swaps $1, 3$... actually we need to compute $(1\,2\,3) \cdot (1\,2) \cdot (1\,3\,2)$ applied to each element.

Easier: use the rule that conjugation of a cycle $(a\,b)$ by $\sigma$ gives $(\sigma(a)\ \sigma(b))$. With $\sigma = (1\,2\,3)$: $\sigma(1) = 2$, $\sigma(2) = 3$, so $\sigma (1\,2) \sigma^{-1} = (2\,3)$.

Hence the conjugate of $(1\,2)$ by $(1\,2\,3)$ is $(2\,3) \notin \langle (1\,2) \rangle$. So $\langle (1\,2) \rangle$ is *not* normal in $S_3$. ✗

*Conclusion.* Condition 3 fails. $S_3$ is **not** an internal direct product of $A_3$ and $\langle (1\,2) \rangle$, even though conditions 1 and 2 are satisfied.

*Remark.* $S_3$ is in fact a **semidirect product** $A_3 \rtimes \langle (1\,2) \rangle$, where $\langle (1\,2) \rangle$ acts nontrivially on $A_3$ by conjugation (sending the 3-cycle $(1\,2\,3)$ to its inverse). Semidirect products generalize direct products by allowing a nontrivial twist; this is beyond the current scope but is the "right" decomposition. $\blacksquare$

**Example 11.** Show $\mathbb{Z}_6$ is the internal direct product of its subgroups of orders 2 and 3.

*Subgroups.* Let $H = \langle 3 \rangle = \{0, 3\}$ (order 2) and $K = \langle 2 \rangle = \{0, 2, 4\}$ (order 3). (Using additive notation.)

*Check Condition 1.* $H + K = \{0, 3\} + \{0, 2, 4\} = \{0 + 0, 0 + 2, 0 + 4, 3 + 0, 3 + 2, 3 + 4\} = \{0, 2, 4, 3, 5, 7 \equiv 1\} = \{0, 1, 2, 3, 4, 5\} = \mathbb{Z}_6$. $\checkmark$

*Check Condition 2.* $H \cap K = \{0, 3\} \cap \{0, 2, 4\} = \{0\}$. $\checkmark$

*Check Condition 3.* $\mathbb{Z}_6$ is abelian, so all subgroups are normal. $\checkmark$

By Theorem 11.11, $\mathbb{Z}_6 \cong H \times K \cong \mathbb{Z}_2 \times \mathbb{Z}_3$.

*Remark.* This is a special case of the general fact (from Theorem 11.6) that $\mathbb{Z}_{mn} \cong \mathbb{Z}_m \times \mathbb{Z}_n$ when $\gcd(m, n) = 1$. Here $m = 2, n = 3$. The subgroups $H$ and $K$ are exactly $m\mathbb{Z}_{mn}$ and $n\mathbb{Z}_{mn}$. $\blacksquare$

## 11.6 Fundamental Theorem of Finite Abelian Groups

This is one of the crown jewels of finite group theory: it completely classifies all finite abelian groups. We state it (the proof requires more machinery — see advanced algebra).

> **Theorem 11.12 (Fundamental Theorem of Finite Abelian Groups — FTFAG).** Every finite abelian group $G$ is isomorphic to a direct product of cyclic groups of prime-power order:
> $$G \cong \mathbb{Z}_{p_1^{a_1}} \times \mathbb{Z}_{p_2^{a_2}} \times \cdots \times \mathbb{Z}_{p_k^{a_k}}$$
> where the $p_i$ are (not necessarily distinct) primes. This decomposition, called the **elementary divisor form**, is unique up to reordering.

**Consequences.**

**(a) Enumeration via partitions.** For $|G| = p_1^{e_1} \cdots p_r^{e_r}$, the number of abelian groups of order $|G|$ is
$$\prod_{i=1}^r P(e_i),$$
where $P(e)$ is the number of integer partitions of $e$. The point: the $p$-primary part of $G$ is determined by a partition of $e_i$.

**(b) Invariant factor form.** Alternatively, every finite abelian group is
$$G \cong \mathbb{Z}_{d_1} \times \mathbb{Z}_{d_2} \times \cdots \times \mathbb{Z}_{d_s}, \quad d_1 \mid d_2 \mid \cdots \mid d_s,$$
where the $d_i$ are the **invariant factors**. This form is also unique. (Conversion: combine prime-power cyclic factors with coprime orders into one larger cyclic factor using Theorem 11.6.)

**(c) Coprime orders merge.** If $\gcd(a, b) = 1$, then $\mathbb{Z}_a \times \mathbb{Z}_b \cong \mathbb{Z}_{ab}$ (Theorem 11.6). This lets us freely convert between forms.

**Example 12 (Abelian groups of order 8).** Find all abelian groups of order 8 up to isomorphism.

*Setup.* $8 = 2^3$. By FTFAG, each abelian group of order 8 corresponds to a partition of $3$ (the exponent of 2).

*Partitions of 3.*
1. $3 = 3$.
2. $3 = 2 + 1$.
3. $3 = 1 + 1 + 1$.

*Corresponding groups.*
1. $\mathbb{Z}_{2^3} = \mathbb{Z}_8$.
2. $\mathbb{Z}_{2^2} \times \mathbb{Z}_{2^1} = \mathbb{Z}_4 \times \mathbb{Z}_2$.
3. $\mathbb{Z}_2 \times \mathbb{Z}_2 \times \mathbb{Z}_2$.

Exactly three abelian groups of order 8.

*Distinguishing them.* The maximum element order distinguishes all three:
- $\mathbb{Z}_8$: max order $8$.
- $\mathbb{Z}_4 \times \mathbb{Z}_2$: max order $\operatorname{lcm}(4, 2) = 4$.
- $\mathbb{Z}_2^3$: max order $2$.

*Non-abelian groups of order 8.* There are two more: $D_4$ (dihedral) and $Q_8$ (quaternion). Total groups of order 8: five. $\blacksquare$

**Example 13 (Abelian groups of order 12).** Find all abelian groups of order 12.

*Setup.* $12 = 2^2 \cdot 3$. Partitions of exponents: partitions of $2$ for the 2-part (there are $2$: namely $2$ and $1 + 1$), partitions of $1$ for the 3-part (there is $1$). Total $2 \cdot 1 = 2$ abelian groups.

*Listing.*
1. 2-part: $\mathbb{Z}_4$; 3-part: $\mathbb{Z}_3$. Product: $\mathbb{Z}_4 \times \mathbb{Z}_3 \cong \mathbb{Z}_{12}$ (cyclic, by Theorem 11.6 since $\gcd(4,3) = 1$).
2. 2-part: $\mathbb{Z}_2 \times \mathbb{Z}_2$; 3-part: $\mathbb{Z}_3$. Product: $\mathbb{Z}_2 \times \mathbb{Z}_2 \times \mathbb{Z}_3 \cong \mathbb{Z}_6 \times \mathbb{Z}_2$ (using $\mathbb{Z}_2 \times \mathbb{Z}_3 \cong \mathbb{Z}_6$).

*Invariant factor forms.*
1. $\mathbb{Z}_{12}$ (trivial: one factor).
2. $\mathbb{Z}_2 \times \mathbb{Z}_6$ (note $2 \mid 6$).

So exactly *two* abelian groups of order 12. The three non-abelian groups are $A_4$, $D_6$, and the dicyclic group $\operatorname{Dic}_3$ — total of **five** groups of order 12.

*Remark.* The non-cyclic abelian group of order 12 is often written both as $\mathbb{Z}_2 \times \mathbb{Z}_6$ (invariant factor form) and as $\mathbb{Z}_2 \times \mathbb{Z}_2 \times \mathbb{Z}_3$ (elementary divisor form) — same group, two presentations.

## 11.7 Direct Product and Element Counting

FTFAG reduces most structural questions about finite abelian groups to counting elements with specific properties. The direct product helps here too.

> **Proposition 11.13 (Counting elements of a given order).** The number of elements of order $d$ in $\mathbb{Z}_m \times \mathbb{Z}_n$ equals
> $$\sum_{\substack{d_1 \mid m,\ d_2 \mid n \\ \operatorname{lcm}(d_1, d_2) = d}} \varphi(d_1) \varphi(d_2),$$
> where $\varphi$ is Euler's totient. The generalization to $k$ factors is the evident sum over tuples $(d_1, \ldots, d_k)$ with $d_i \mid n_i$ and $\operatorname{lcm}(d_1, \ldots, d_k) = d$.

*Proof sketch.* By Theorem 11.4, $|(a, b)| = d \iff \operatorname{lcm}(|a|, |b|) = d$. In the cyclic group $\mathbb{Z}_n$, the number of elements of order $d_i$ (for $d_i \mid n$) is $\varphi(d_i)$ — a standard fact about cyclic groups (see [[06-cyclic-groups-and-order]]). Sum over compatible pairs. $\blacksquare$

**Example 14.** Count elements of order 2 in $\mathbb{Z}_4 \times \mathbb{Z}_4$.

*Setup.* We need pairs $(d_1, d_2)$ with $d_1, d_2 \mid 4$ (so $d_i \in \{1, 2, 4\}$) and $\operatorname{lcm}(d_1, d_2) = 2$.

*Enumerating valid pairs.*
- $(1, 2)$: $\operatorname{lcm}(1, 2) = 2$. $\checkmark$
- $(2, 1)$: $\operatorname{lcm}(2, 1) = 2$. $\checkmark$
- $(2, 2)$: $\operatorname{lcm}(2, 2) = 2$. $\checkmark$
- $(1, 4), (4, 1), (4, 4), (2, 4), (4, 2)$: lcm is $4$, not $2$. ✗
- $(1, 1)$: lcm is $1$, not $2$. ✗

*Counting elements of each order in $\mathbb{Z}_4$.* By Euler's totient:
- $\varphi(1) = 1$ (just the identity).
- $\varphi(2) = 1$ (the element $2$).
- $\varphi(4) = 2$ (the elements $1$ and $3$).

*Total count.*
$$\varphi(1)\varphi(2) + \varphi(2)\varphi(1) + \varphi(2)\varphi(2) = 1 \cdot 1 + 1 \cdot 1 + 1 \cdot 1 = 3.$$

*Verification.* List all elements $(a, b)$ with $2(a, b) = (2a, 2b) = (0, 0)$ but $(a, b) \neq (0, 0)$: need $2a \equiv 0 \pmod 4$ and $2b \equiv 0 \pmod 4$, i.e., $a, b \in \{0, 2\}$. The non-identity choices are $(0, 2), (2, 0), (2, 2)$ — exactly $3$ elements. $\checkmark$ $\blacksquare$

## 11.8 Practice Problems

**Problem 1.** Find the order of $(3, 5)$ in $\mathbb{Z}_6 \times \mathbb{Z}_{10}$.

**Problem 2.** Determine whether $\mathbb{Z}_{20} \times \mathbb{Z}_{21}$ is cyclic. If so, write down a generator and prove your answer.

**Problem 3.** Compute the structure of $U(24)$ via CRT. Is it cyclic?

**Problem 4.** List all abelian groups of order 16 up to isomorphism.

**Problem 5.** Show that $\mathbb{Z}_{mn} \cong \mathbb{Z}_m \times \mathbb{Z}_n$ implies $\gcd(m, n) = 1$, by analyzing maximum element orders.

**Problem 6.** Find the number of elements of order 6 in $\mathbb{Z}_6 \times \mathbb{Z}_6$.

**Problem 7.** Show that $D_6 \cong D_3 \times \mathbb{Z}_2$ by exhibiting a suitable internal direct product.

### Solutions

**Solution 1.** Find $|(3, 5)|$ in $\mathbb{Z}_6 \times \mathbb{Z}_{10}$.

*Strategy.* Apply Theorem 11.4: $|(3, 5)| = \operatorname{lcm}(|3|_{\mathbb{Z}_6}, |5|_{\mathbb{Z}_{10}})$.

*Computing $|3|$ in $\mathbb{Z}_6$.* Using the cyclic formula $|a| = n / \gcd(n, a)$:
$$|3|_{\mathbb{Z}_6} = \frac{6}{\gcd(6, 3)} = \frac{6}{3} = 2.$$
Verification: $1 \cdot 3 = 3 \neq 0$; $2 \cdot 3 = 6 \equiv 0 \pmod 6$. $\checkmark$

*Computing $|5|$ in $\mathbb{Z}_{10}$.*
$$|5|_{\mathbb{Z}_{10}} = \frac{10}{\gcd(10, 5)} = \frac{10}{5} = 2.$$
Verification: $1 \cdot 5 = 5 \neq 0$; $2 \cdot 5 = 10 \equiv 0 \pmod{10}$. $\checkmark$

*Combining.*
$$|(3, 5)| = \operatorname{lcm}(2, 2) = 2.$$

*Direct check.* $2(3, 5) = (6 \bmod 6, 10 \bmod 10) = (0, 0)$, and $(3, 5) \neq (0, 0)$, confirming order $2$.

$$\boxed{|(3, 5)| = 2.}$$

**Solution 2.** Is $\mathbb{Z}_{20} \times \mathbb{Z}_{21}$ cyclic?

*Apply Theorem 11.6.* We need $\gcd(20, 21) = 1$.

*Computing the gcd.* $21 - 20 = 1$, so $\gcd(20, 21) = \gcd(20, 1) = 1$. $\checkmark$

*Conclusion.* Yes, $\mathbb{Z}_{20} \times \mathbb{Z}_{21}$ is cyclic of order $20 \cdot 21 = 420$, and $\mathbb{Z}_{20} \times \mathbb{Z}_{21} \cong \mathbb{Z}_{420}$.

*Finding a generator.* The element $(1, 1)$ has order $\operatorname{lcm}(20, 21) = 20 \cdot 21 / 1 = 420$. Since $|(1, 1)| = 420 = |\mathbb{Z}_{20} \times \mathbb{Z}_{21}|$, the cyclic subgroup $\langle (1, 1) \rangle$ fills the whole group. Hence $(1, 1)$ is a generator.

*Other generators.* By the formula for generators of $\mathbb{Z}_N$, the total number of generators is $\varphi(420)$. These correspond to $(a, b)$ with $|a| = 20$ and $|b| = 21$, i.e., $\gcd(a, 20) = 1$ and $\gcd(b, 21) = 1$. (Note: one must be careful. Actually $(a, b)$ is a generator iff $\operatorname{lcm}(|a|, |b|) = 420$, which requires $|a| = 20$ and $|b| = 21$ or some multiple relation; since $\gcd(20, 21) = 1$, this simplifies to $|a| = 20$ and $|b| = 21$.)

$$\boxed{\mathbb{Z}_{20} \times \mathbb{Z}_{21} \cong \mathbb{Z}_{420}, \text{ generated by } (1, 1).}$$

**Solution 3.** Compute $U(24)$.

*Apply CRT (Theorem 11.8).* Factor $24 = 2^3 \cdot 3 = 8 \cdot 3$. Since $\gcd(8, 3) = 1$:
$$U(24) \cong U(8) \times U(3).$$

*Computing $U(8)$.* $U(8) = \{a \in \{1, \ldots, 7\} : \gcd(a, 8) = 1\} = \{1, 3, 5, 7\}$ (odd numbers). Check orders:
- $3^2 = 9 \equiv 1 \pmod 8$, so $|3| = 2$.
- $5^2 = 25 \equiv 1 \pmod 8$, so $|5| = 2$.
- $7^2 = 49 \equiv 1 \pmod 8$, so $|7| = 2$.

Every non-identity element has order $2$. Hence $U(8) \cong \mathbb{Z}_2 \times \mathbb{Z}_2$ (the Klein four-group). This matches Theorem 11.10, Case $2^a$ with $a = 3$: $U(2^3) \cong \mathbb{Z}_2 \times \mathbb{Z}_{2^{3-2}} = \mathbb{Z}_2 \times \mathbb{Z}_2$. $\checkmark$

*Computing $U(3)$.* $U(3) = \{1, 2\}$ with $2^2 = 4 \equiv 1$. So $U(3) \cong \mathbb{Z}_2$.

*Assembly.*
$$U(24) \cong \mathbb{Z}_2 \times \mathbb{Z}_2 \times \mathbb{Z}_2 = \mathbb{Z}_2^3.$$

*Is $U(24)$ cyclic?* No. The maximum element order is $\operatorname{lcm}(2, 2, 2) = 2$, but $|U(24)| = \varphi(24) = 8$. Since no element reaches order $8$, $U(24)$ is not cyclic.

*Verification.* $U(24) = \{1, 5, 7, 11, 13, 17, 19, 23\}$ (order 8). Every non-identity element should square to $1$:
- $5^2 = 25 \equiv 1 \pmod{24}$. $\checkmark$
- $7^2 = 49 = 48 + 1 \equiv 1$. $\checkmark$
- $11^2 = 121 = 5 \cdot 24 + 1 \equiv 1$. $\checkmark$
- $13^2 = 169 = 7 \cdot 24 + 1 \equiv 1$. $\checkmark$
- $17^2 = 289 = 12 \cdot 24 + 1 \equiv 1$. $\checkmark$
- $19^2 = 361 = 15 \cdot 24 + 1 \equiv 1$. $\checkmark$
- $23^2 = 529 = 22 \cdot 24 + 1 \equiv 1$. $\checkmark$

All square to $1$; every element has order $\le 2$. Confirms $U(24) \cong \mathbb{Z}_2^3$, not cyclic.

$$\boxed{U(24) \cong \mathbb{Z}_2 \times \mathbb{Z}_2 \times \mathbb{Z}_2 \text{ (not cyclic).}}$$

**Solution 4.** All abelian groups of order 16.

*Setup.* $16 = 2^4$, so by FTFAG each abelian group of order 16 corresponds to a partition of $4$.

*Partitions of 4.*
1. $4 = 4$.
2. $4 = 3 + 1$.
3. $4 = 2 + 2$.
4. $4 = 2 + 1 + 1$.
5. $4 = 1 + 1 + 1 + 1$.

Exactly five partitions, hence five abelian groups.

*Listing.*
1. $\mathbb{Z}_{16}$ (cyclic of order 16).
2. $\mathbb{Z}_8 \times \mathbb{Z}_2$.
3. $\mathbb{Z}_4 \times \mathbb{Z}_4$.
4. $\mathbb{Z}_4 \times \mathbb{Z}_2 \times \mathbb{Z}_2$.
5. $\mathbb{Z}_2 \times \mathbb{Z}_2 \times \mathbb{Z}_2 \times \mathbb{Z}_2 = \mathbb{Z}_2^4$.

*Distinguishing by invariants.* Each is distinguished by the multiset of element orders, or equivalently by the maximum element order and the number of elements of order 2:
- $\mathbb{Z}_{16}$: max order $16$, one element of order $2$.
- $\mathbb{Z}_8 \times \mathbb{Z}_2$: max order $8$, three elements of order 2 ($\varphi(2) + \varphi(2) + \varphi(2)\varphi(2) = 1 + 1 + 1 = 3$; or just list $(4, 0), (0, 1), (4, 1)$).
- $\mathbb{Z}_4 \times \mathbb{Z}_4$: max order $4$, three elements of order 2 (from Example 14).
- $\mathbb{Z}_4 \times \mathbb{Z}_2 \times \mathbb{Z}_2$: max order $4$, seven elements of order 2.
- $\mathbb{Z}_2^4$: max order $2$, fifteen elements of order 2.

(Groups 2 and 3 both have three elements of order 2 but are distinguished by the max order.)

$$\boxed{5 \text{ abelian groups of order } 16.}$$

**Solution 5.** Prove: $\mathbb{Z}_{mn} \cong \mathbb{Z}_m \times \mathbb{Z}_n \Rightarrow \gcd(m, n) = 1$.

*Proof.* Suppose $\mathbb{Z}_{mn} \cong \mathbb{Z}_m \times \mathbb{Z}_n$ as abstract groups. We extract information about element orders.

**Step 1.** $\mathbb{Z}_{mn}$ is cyclic of order $mn$, so it contains an element of order $mn$ (any generator). Isomorphism preserves element orders (since $|g| = |\varphi(g)|$ when $\varphi$ is an isomorphism). Hence $\mathbb{Z}_m \times \mathbb{Z}_n$ also contains an element of order $mn$.

**Step 2.** By Theorem 11.4, every element $(a, b) \in \mathbb{Z}_m \times \mathbb{Z}_n$ satisfies
$$|(a, b)| = \operatorname{lcm}(|a|_m, |b|_n) \le \operatorname{lcm}(m, n),$$
since $|a|_m \mid m$ (Lagrange in $\mathbb{Z}_m$) and $|b|_n \mid n$.

**Step 3.** Combining: $mn \le \operatorname{lcm}(m, n)$. But $\operatorname{lcm}(m, n) \le mn$ always (since $mn$ is a common multiple of $m$ and $n$). Hence $\operatorname{lcm}(m, n) = mn$.

**Step 4.** Using the identity $\gcd(m, n) \cdot \operatorname{lcm}(m, n) = mn$:
$$\gcd(m, n) = \frac{mn}{\operatorname{lcm}(m, n)} = \frac{mn}{mn} = 1. \checkmark$$

Hence $\gcd(m, n) = 1$, as claimed. $\blacksquare$

*Remark.* This is the converse of the $(\Leftarrow)$ direction of Theorem 11.6, which we proved differently. Together they give the biconditional.

**Solution 6.** Find the number of elements of order 6 in $\mathbb{Z}_6 \times \mathbb{Z}_6$.

*Strategy.* Use Proposition 11.13. We need pairs $(d_1, d_2)$ with $d_1, d_2 \mid 6$ (so $d_i \in \{1, 2, 3, 6\}$) and $\operatorname{lcm}(d_1, d_2) = 6$.

*Euler totients for $\mathbb{Z}_6$ factors.*
- $\varphi(1) = 1$, $\varphi(2) = 1$, $\varphi(3) = 2$, $\varphi(6) = 2$.

Check: $1 + 1 + 2 + 2 = 6 = |\mathbb{Z}_6|$. $\checkmark$

*Enumerating pairs with $\operatorname{lcm}(d_1, d_2) = 6$.*

For $\operatorname{lcm}(d_1, d_2) = 6 = 2 \cdot 3$: we need $2$ to divide at least one of $d_1, d_2$ and $3$ to divide at least one.

Systematic listing:
| $d_1$ | $d_2$ | $\operatorname{lcm}$ | Contribution $\varphi(d_1)\varphi(d_2)$ |
|:---:|:---:|:---:|:---:|
| 1 | 6 | 6 | $1 \cdot 2 = 2$ |
| 2 | 3 | 6 | $1 \cdot 2 = 2$ |
| 2 | 6 | 6 | $1 \cdot 2 = 2$ |
| 3 | 2 | 6 | $2 \cdot 1 = 2$ |
| 3 | 6 | 6 | $2 \cdot 2 = 4$ |
| 6 | 1 | 6 | $2 \cdot 1 = 2$ |
| 6 | 2 | 6 | $2 \cdot 1 = 2$ |
| 6 | 3 | 6 | $2 \cdot 2 = 4$ |
| 6 | 6 | 6 | $2 \cdot 2 = 4$ |

(Pairs like $(1, 1)$ give lcm $1$; $(1, 2)$ gives lcm $2$; $(1, 3)$ gives lcm $3$; $(2, 2)$ gives lcm $2$; $(3, 3)$ gives lcm $3$; $(2, 4)$ and $(4, *)$ not applicable since $4 \nmid 6$. None of these give lcm 6.)

*Total.*
$$2 + 2 + 2 + 2 + 4 + 2 + 2 + 4 + 4 = 24.$$

*Sanity check.* Total elements in $\mathbb{Z}_6 \times \mathbb{Z}_6$: $36$. Elements by order:
- Order 1: just $(0,0)$, count $1$.
- Order 2: $\operatorname{lcm}(d_1, d_2) = 2$; pairs $(1,2), (2,1), (2,2)$; contributions $1, 1, 1$; total $3$.
- Order 3: $\operatorname{lcm}(d_1, d_2) = 3$; pairs $(1,3), (3,1), (3,3)$; contributions $2, 2, 4$; total $8$.
- Order 6: $24$ (computed above).

Check: $1 + 3 + 8 + 24 = 36$. $\checkmark$

$$\boxed{24 \text{ elements of order } 6.}$$

**Solution 7.** Show $D_6 \cong D_3 \times \mathbb{Z}_2$.

*Setup.* $D_6 = \langle r, s \mid r^6 = s^2 = e,\ srs = r^{-1} \rangle$ is the dihedral group of order $12$ (symmetries of a regular hexagon).

*Strategy.* Find two subgroups $Z, K$ of $D_6$ with:
- $Z \cong \mathbb{Z}_2$ and $K \cong D_3$,
- $Z \cap K = \{e\}$,
- $Z \trianglelefteq D_6$ and $K \trianglelefteq D_6$,
- $ZK = D_6$.

Then by Theorem 11.11, $D_6 \cong Z \times K \cong \mathbb{Z}_2 \times D_3$.

*Step 1: Identify $Z$, the center-like factor.*

Consider $Z = \langle r^3 \rangle = \{e, r^3\}$. Then $|Z| = 2$, and we claim $r^3 \in Z(D_6)$.

*Check $r^3$ is central.* Clearly $r^3$ commutes with all powers of $r$. For $s$:
$$s r^3 = s r \cdot r^2 = r^{-1} s \cdot r^2 = r^{-1} (s r^2) = r^{-1}(sr \cdot r) = r^{-1}(r^{-1} s \cdot r) = r^{-2} s r = r^{-2} (sr) = r^{-2} r^{-1} s = r^{-3} s = r^3 s,$$
using $r^6 = e$ so $r^{-3} = r^3$. Hence $sr^3 = r^3 s$, and $r^3$ commutes with every element of $D_6$ (since every element is a word in $r$ and $s$).

So $Z \le Z(D_6)$. In particular, $Z$ is normal in $D_6$ (any central subgroup is normal).

$Z \cong \mathbb{Z}_2$. $\checkmark$

*Step 2: Identify $K$, the dihedral factor.*

Consider $K = \langle r^2, s \rangle$. We compute $K$'s order and structure.

*Element $r^2$ has order $3$.* $r^2, r^4, r^6 = e$ — so $(r^2)^3 = e$ and $|r^2| = 3$.

*Elements of $K$.* $K$ contains $e, r^2, r^4, s, r^2 s, r^4 s$ — six elements. We verify closure: $s r^2 s = s \cdot r^2 \cdot s$. Using $s r^2 = r^{-2} s$: $s r^2 s = r^{-2} s \cdot s = r^{-2} = r^4$. So $K$ is closed under this conjugation, confirming $K = \{e, r^2, r^4, s, r^2 s, r^4 s\}$ of order $6$.

*$K \cong D_3$.* $K$ has generators $r^2$ of order 3 and $s$ of order 2, with $s r^2 s = r^{-2}$. This is exactly the dihedral presentation $\langle a, b \mid a^3 = b^2 = e, bab^{-1} = a^{-1}\rangle = D_3$.

$K \cong D_3$. $\checkmark$

*Normality of $K$.* $K$ has index $|D_6|/|K| = 12/6 = 2$ in $D_6$. Any subgroup of index 2 is normal (see [[10-normal-subgroups-and-quotient-groups]]). $\checkmark$

*Step 3: Verify the three conditions.*

*Intersection $Z \cap K$.* $Z = \{e, r^3\}$; $K = \{e, r^2, r^4, s, r^2 s, r^4 s\}$. Is $r^3 \in K$? The powers of $r$ in $K$ are $\{e, r^2, r^4\}$ (the elements of $\langle r^2 \rangle$). $r^3$ is not among these. So $Z \cap K = \{e\}$. $\checkmark$

*Product $ZK$.* Using the formula $|ZK| = \dfrac{|Z| \cdot |K|}{|Z \cap K|} = \dfrac{2 \cdot 6}{1} = 12 = |D_6|$. Hence $ZK = D_6$. $\checkmark$

*Normality.* $Z \trianglelefteq D_6$ (central) and $K \trianglelefteq D_6$ (index 2). $\checkmark$

*Step 4: Apply Theorem 11.11.*

By Theorem 11.11,
$$D_6 \cong Z \times K \cong \mathbb{Z}_2 \times D_3. \blacksquare$$

*Verification.* Both groups have order 12 and identical element-order profiles:
- $D_6$: 1 element of order 1, $|r|$-type orders; 1 element of order 6 ($r$), etc.
- $\mathbb{Z}_2 \times D_3$: element orders are $\operatorname{lcm}(|z|, |k|)$ for $z \in \mathbb{Z}_2, k \in D_3$.

In particular, both have 1 element of order 6, 2 of order 3, 7 of order 2, 1 of order 1 (sanity check: $1 + 7 + 2 + 1 + 1 = 12$ counting order-6 too; recount: $D_6$ has center $\{e, r^3\}$ of size 2, so 2 elements of order ≤ 2 in center; the 6 reflections each have order 2; plus $r^3$ has order 2 so 7 elements of order 2; elements $r, r^5$ have order 6; elements $r^2, r^4$ have order 3; giving $1 + 2 + 2 + 7 = 12$). The profiles match.

*Remark.* This decomposition fails for $D_n$ with $n$ odd: in that case $D_n$ has trivial center (so no $\mathbb{Z}_2$ factor to peel off), and $D_n$ is indecomposable. More generally, $D_{2k} \cong D_k \times \mathbb{Z}_2$ iff $k$ is odd — a classical result.

## Related Concepts

- [[10-normal-subgroups-and-quotient-groups]] — normality is required for internal direct product
- [[12-subgroup-lattice-and-dihedral-groups]] — visualizes how direct products decompose
- [[06-cyclic-groups-and-order]] — cyclic groups are building blocks in FTFAG
- [[17-homomorphisms-and-isomorphisms]] — establishes the isomorphism $\mathbb{Z}_m \times \mathbb{Z}_n \cong \mathbb{Z}_{mn}$

---

*Last updated: 2026-04-19*
