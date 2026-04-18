---
title: "Direct Products"
type: guide
co: CO2
related: [10-normal-subgroups-and-quotient-groups, 12-subgroup-lattice-and-dihedral-groups, 06-cyclic-groups-and-order]
---

# 11. Direct Products

Given two groups $G$ and $H$, the **direct product** $G \times H$ is the simplest way to combine them into a new group. It is the group-theoretic analogue of the Cartesian product. Beyond construction, the crucial questions are: when is a group isomorphic to a direct product of its subgroups? And when can one group be decomposed into smaller pieces whose structure is easier to analyze?

This chapter develops both the external and internal notions of direct product, computes orders of elements, proves the fundamental criterion $\mathbb{Z}_m \times \mathbb{Z}_n \cong \mathbb{Z}_{mn} \iff \gcd(m, n) = 1$, and applies these tools to unit groups via the Chinese Remainder Theorem.

## 11.1 External Direct Product

> **Definition 11.1 (External direct product).** Let $(G, *)$ and $(H, \circ)$ be groups. The **external direct product** $G \times H$ is the set
> $$G \times H = \{(g, h) : g \in G,\ h \in H\}$$
> equipped with componentwise operation
> $$(g_1, h_1) \cdot (g_2, h_2) = (g_1 * g_2,\ h_1 \circ h_2).$$

> **Proposition 11.2.** $G \times H$ is a group under this operation.

*Proof.*
- **Closure.** If $g_1, g_2 \in G$ and $h_1, h_2 \in H$, then $g_1 * g_2 \in G$ and $h_1 \circ h_2 \in H$, so $(g_1 * g_2, h_1 \circ h_2) \in G \times H$.
- **Associativity.** Follows componentwise from associativity in $G$ and $H$.
- **Identity.** The pair $(e_G, e_H)$ satisfies $(e_G, e_H)(g, h) = (e_G g, e_H h) = (g, h)$.
- **Inverses.** $(g, h)^{-1} = (g^{-1}, h^{-1})$.
$\blacksquare$

> **Proposition 11.3 (Order).** If $G$ and $H$ are finite, then $|G \times H| = |G| \cdot |H|$.

This generalizes to any finite number of factors: $|G_1 \times G_2 \times \cdots \times G_k| = \prod |G_i|$.

**Example 1.** $\mathbb{Z}_2 \times \mathbb{Z}_3 = \{(0,0), (0,1), (0,2), (1,0), (1,1), (1,2)\}$, a group of order 6. The element $(1, 1)$ has order equal to $\operatorname{lcm}(2, 3) = 6$, so $(1,1)$ generates the whole group — which means $\mathbb{Z}_2 \times \mathbb{Z}_3$ is cyclic of order 6, i.e.\ $\mathbb{Z}_2 \times \mathbb{Z}_3 \cong \mathbb{Z}_6$.

**Example 2.** $\mathbb{Z}_2 \times \mathbb{Z}_2 = \{(0,0), (0,1), (1,0), (1,1)\}$. Every non-identity element has order 2, so this group is **not cyclic** — it is the Klein four-group $V_4$.

**Example 3.** $\mathbb{Z} \times \mathbb{Z}$ is an infinite abelian group. Elements have infinite order except $(0,0)$. It is free abelian of rank 2.

## 11.2 Order of an Element in a Direct Product

> **Theorem 11.4.** Let $(g, h) \in G \times H$ with $|g| = m$ and $|h| = n$ finite. Then
> $$|(g, h)| = \operatorname{lcm}(m, n).$$

*Proof.* We compute $(g, h)^k = (g^k, h^k) = (e_G, e_H)$ iff $g^k = e_G$ and $h^k = e_H$ iff $m \mid k$ and $n \mid k$ iff $\operatorname{lcm}(m, n) \mid k$.

Hence the smallest such positive $k$ is $\operatorname{lcm}(m, n)$. $\blacksquare$

**Example 4.** In $\mathbb{Z}_{12} \times \mathbb{Z}_{18}$, what is the order of $(8, 12)$?

*Solution.* $|8| = 12/\gcd(12,8) = 12/4 = 3$ in $\mathbb{Z}_{12}$. $|12| = 18/\gcd(18,12) = 18/6 = 3$ in $\mathbb{Z}_{18}$. So $|(8, 12)| = \operatorname{lcm}(3, 3) = 3$. $\blacksquare$

> **Corollary 11.5.** $G \times H$ is abelian $\iff$ both $G$ and $H$ are abelian.

*Proof.* Componentwise commutativity holds iff each component commutes. $\blacksquare$

## 11.3 When Is $\mathbb{Z}_m \times \mathbb{Z}_n$ Cyclic?

This is one of the most frequently used theorems in finite group theory.

> **Theorem 11.6 ($\mathbb{Z}_m \times \mathbb{Z}_n$ cyclic iff coprime).**
> $$\mathbb{Z}_m \times \mathbb{Z}_n \cong \mathbb{Z}_{mn} \iff \gcd(m, n) = 1.$$

*Proof.*

**($\Rightarrow$)** Suppose $\mathbb{Z}_m \times \mathbb{Z}_n$ is cyclic. Then it contains an element of order $mn$. But by Theorem 11.4, the maximum order of any element is $\operatorname{lcm}(m, n)$. So $\operatorname{lcm}(m, n) = mn$, which forces $\gcd(m, n) = 1$.

**($\Leftarrow$)** Suppose $\gcd(m, n) = 1$. The element $(1, 1) \in \mathbb{Z}_m \times \mathbb{Z}_n$ has order $\operatorname{lcm}(m, n) = mn$. Since $|\mathbb{Z}_m \times \mathbb{Z}_n| = mn$, the cyclic subgroup $\langle (1,1) \rangle$ equals the whole group. Hence $\mathbb{Z}_m \times \mathbb{Z}_n$ is cyclic, and therefore $\cong \mathbb{Z}_{mn}$. $\blacksquare$

> **Corollary 11.7 (Generalization).**
> $$\mathbb{Z}_{n_1} \times \mathbb{Z}_{n_2} \times \cdots \times \mathbb{Z}_{n_k} \cong \mathbb{Z}_{n_1 n_2 \cdots n_k} \iff n_1, n_2, \ldots, n_k \text{ are pairwise coprime}.$$

**Example 5.** Is $\mathbb{Z}_4 \times \mathbb{Z}_6 \cong \mathbb{Z}_{24}$? No — $\gcd(4, 6) = 2 \neq 1$. The maximum element order is $\operatorname{lcm}(4, 6) = 12$, not 24.

**Example 6.** Is $\mathbb{Z}_3 \times \mathbb{Z}_5 \times \mathbb{Z}_8 \cong \mathbb{Z}_{120}$? Yes — $3, 5, 8$ are pairwise coprime, so the product is cyclic of order 120.

## 11.4 Unit Groups and the Chinese Remainder Theorem

> **Theorem 11.8 (CRT for unit groups).** If $\gcd(m, n) = 1$, then
> $$U(mn) \cong U(m) \times U(n).$$

*Proof sketch.* The Chinese Remainder Theorem gives a ring isomorphism $\mathbb{Z}/mn \cong \mathbb{Z}/m \times \mathbb{Z}/n$. An element is a unit in a product ring iff each component is a unit. Hence restricting to units gives $U(mn) \cong U(m) \times U(n)$. $\blacksquare$

> **Corollary 11.9.** If $n = p_1^{a_1} p_2^{a_2} \cdots p_k^{a_k}$ is the prime factorization, then
> $$U(n) \cong U(p_1^{a_1}) \times U(p_2^{a_2}) \times \cdots \times U(p_k^{a_k}).$$

This decomposition reduces the study of $U(n)$ to studying $U(p^a)$ for prime powers.

**Example 7.** $U(12) \cong U(4) \times U(3)$.
- $U(4) = \{1, 3\} \cong \mathbb{Z}_2$
- $U(3) = \{1, 2\} \cong \mathbb{Z}_2$

So $U(12) \cong \mathbb{Z}_2 \times \mathbb{Z}_2 = V_4$. Indeed $U(12) = \{1, 5, 7, 11\}$ and every non-identity element squares to 1.

**Example 8.** $U(15) \cong U(3) \times U(5) \cong \mathbb{Z}_2 \times \mathbb{Z}_4 \cong \mathbb{Z}_2 \times \mathbb{Z}_4$.

Since $\gcd(2, 4) = 2$, this is **not** cyclic — it is $\mathbb{Z}_2 \times \mathbb{Z}_4$, not $\mathbb{Z}_8$. The maximum element order is $\operatorname{lcm}(2, 4) = 4$.

## 11.5 Internal Direct Product

Sometimes a group $G$ naturally "decomposes" into subgroups whose direct product is $G$. We make this precise.

> **Definition 11.10 (Internal direct product).** Let $G$ be a group with subgroups $H, K \le G$. We say $G$ is the **internal direct product** of $H$ and $K$, written $G = H \times K$, if:
>
> 1. $G = HK = \{hk : h \in H, k \in K\}$
> 2. $H \cap K = \{e\}$
> 3. $H, K \trianglelefteq G$ (both normal in $G$)

> **Theorem 11.11 (Internal $\Leftrightarrow$ external).** If $G = H \times K$ internally, then $G \cong H \times K$ externally via $\varphi: H \times K \to G$, $\varphi(h, k) = hk$.

*Proof.*

**Well-defined:** $hk \in G$ trivially.

**Homomorphism.** We need $(h_1 k_1)(h_2 k_2) = h_1 h_2 k_1 k_2$, i.e.\ elements of $H$ commute with elements of $K$. For $h \in H, k \in K$, the commutator $[h, k] = hkh^{-1}k^{-1}$. Since $K \trianglelefteq G$, $hkh^{-1} \in K$, so $[h, k] \in K$. Since $H \trianglelefteq G$, $kh^{-1}k^{-1} \in H$, so $[h, k] = h(kh^{-1}k^{-1}) \in H$. Hence $[h, k] \in H \cap K = \{e\}$, giving $hk = kh$.

**Injective.** If $\varphi(h, k) = e$, then $hk = e$, so $h = k^{-1} \in H \cap K = \{e\}$. Thus $h = e$ and $k = e$.

**Surjective.** Given by condition 1, $G = HK$. $\blacksquare$

**Example 9.** $V_4 = \{e, a, b, ab\} = \langle a \rangle \times \langle b \rangle$ where $|a| = |b| = 2$. Verify:
- $\langle a \rangle = \{e, a\}$, $\langle b \rangle = \{e, b\}$
- $\langle a \rangle \cdot \langle b \rangle = \{e, a, b, ab\} = V_4$ ✓
- $\langle a \rangle \cap \langle b \rangle = \{e\}$ ✓
- $V_4$ is abelian, so every subgroup is normal ✓

**Example 10.** $S_3 \neq A_3 \times \langle (1,2) \rangle$. Let's check.
- $A_3 = \{e, (1,2,3), (1,3,2)\}$, $\langle (1,2) \rangle = \{e, (1,2)\}$
- $A_3 \cdot \langle (1,2) \rangle = S_3$ ✓
- $A_3 \cap \langle (1,2) \rangle = \{e\}$ ✓
- But $\langle (1,2) \rangle$ is **not normal** in $S_3$ (conjugating $(1,2)$ by $(1,2,3)$ gives $(2,3)$).

Condition 3 fails. So $S_3$ is **not** a direct product of these two subgroups. (It is a **semidirect product**, a generalization beyond our current scope.)

**Example 11.** $\mathbb{Z}_6 = \langle 2 \rangle \times \langle 3 \rangle$.
- $\langle 2 \rangle = \{0, 2, 4\} \cong \mathbb{Z}_3$
- $\langle 3 \rangle = \{0, 3\} \cong \mathbb{Z}_2$
- $\langle 2 \rangle + \langle 3 \rangle = \mathbb{Z}_6$ (since $\gcd(2,3) = 1$) ✓
- $\langle 2 \rangle \cap \langle 3 \rangle = \{0\}$ ✓
- Both normal in abelian $\mathbb{Z}_6$ ✓

So $\mathbb{Z}_6 \cong \mathbb{Z}_3 \times \mathbb{Z}_2$.

## 11.6 Fundamental Theorem of Finite Abelian Groups (Preview)

This is one of the crown jewels of finite group theory. We state it without proof; the proof belongs to a more advanced algebra course.

> **Theorem 11.12 (FTFAG).** Every finite abelian group $G$ is isomorphic to a direct product of cyclic groups of prime-power order:
> $$G \cong \mathbb{Z}_{p_1^{a_1}} \times \mathbb{Z}_{p_2^{a_2}} \times \cdots \times \mathbb{Z}_{p_k^{a_k}}$$
> where the $p_i$ are (not necessarily distinct) primes. This decomposition is unique up to reordering.

**Example 12.** Abelian groups of order 8 (up to isomorphism):
$$\mathbb{Z}_8,\quad \mathbb{Z}_4 \times \mathbb{Z}_2,\quad \mathbb{Z}_2 \times \mathbb{Z}_2 \times \mathbb{Z}_2.$$

These are the only three. Any abelian group of order 8 is isomorphic to exactly one of them.

**Example 13.** Abelian groups of order 12:
- $12 = 2^2 \cdot 3$, so prime-power decompositions are $(4, 3)$ or $(2, 2, 3)$.
- $\mathbb{Z}_4 \times \mathbb{Z}_3 \cong \mathbb{Z}_{12}$ (since $\gcd(4,3) = 1$)
- $\mathbb{Z}_2 \times \mathbb{Z}_2 \times \mathbb{Z}_3 \cong \mathbb{Z}_2 \times \mathbb{Z}_6$

Only two abelian groups of order 12 up to isomorphism. (The non-abelian ones of order 12 are $A_4$, $D_6$, and $\operatorname{Dic}_3$.)

## 11.7 Direct Product and Element Counting

> **Proposition 11.13.** The number of elements of order $d$ in $\mathbb{Z}_m \times \mathbb{Z}_n$ is
> $$\#\{(a, b) : \operatorname{lcm}(|a|, |b|) = d\}$$
> summed over all divisor pairs $(d_1, d_2)$ with $\operatorname{lcm}(d_1, d_2) = d$, $d_1 \mid m$, $d_2 \mid n$.

**Example 14.** Count elements of order 2 in $\mathbb{Z}_4 \times \mathbb{Z}_4$.

*Solution.* Need $\operatorname{lcm}(|a|, |b|) = 2$ with $|a| \mid 4, |b| \mid 4$. Options for $(|a|, |b|)$: $(1, 2), (2, 1), (2, 2)$.
- $\mathbb{Z}_4$ has $\varphi(1) = 1$ element of order 1, $\varphi(2) = 1$ element of order 2 (namely 2).
- So count = $1 \cdot 1 + 1 \cdot 1 + 1 \cdot 1 = 3$.

Elements are $(0, 2), (2, 0), (2, 2)$. Indeed 3 elements of order 2. $\blacksquare$

## 11.8 Practice Problems

**Problem 1.** Find the order of $(3, 5)$ in $\mathbb{Z}_6 \times \mathbb{Z}_{10}$.

**Problem 2.** Determine whether $\mathbb{Z}_{20} \times \mathbb{Z}_{21}$ is cyclic. If so, write down a generator.

**Problem 3.** Compute $U(24) \cong U(8) \times U(3)$. What is the structure? Is it cyclic?

**Problem 4.** List all abelian groups of order 16 up to isomorphism.

**Problem 5.** Show that $\mathbb{Z}_{mn} \cong \mathbb{Z}_m \times \mathbb{Z}_n$ implies $\gcd(m, n) = 1$, by analyzing maximum element orders.

**Problem 6.** Find the number of elements of order 6 in $\mathbb{Z}_6 \times \mathbb{Z}_6$.

**Problem 7.** Show that $D_6 \cong D_3 \times \mathbb{Z}_2$.

### Solutions

**Solution 1.** $|3| = 6/\gcd(6,3) = 2$ in $\mathbb{Z}_6$. $|5| = 10/\gcd(10,5) = 2$ in $\mathbb{Z}_{10}$. $|(3, 5)| = \operatorname{lcm}(2, 2) = 2$. $\boxed{2}$

**Solution 2.** $\gcd(20, 21) = 1$, so $\mathbb{Z}_{20} \times \mathbb{Z}_{21} \cong \mathbb{Z}_{420}$. Generator: $(1, 1)$ (has order $\operatorname{lcm}(20, 21) = 420$). $\boxed{\text{Cyclic, generated by }(1,1)}$

**Solution 3.** $U(8) = \{1, 3, 5, 7\}$ with $3^2 = 9 \equiv 1$, $5^2 = 25 \equiv 1$, $7^2 = 49 \equiv 1$, so $U(8) \cong \mathbb{Z}_2 \times \mathbb{Z}_2$.
$U(3) = \{1, 2\} \cong \mathbb{Z}_2$.
Thus $U(24) \cong \mathbb{Z}_2 \times \mathbb{Z}_2 \times \mathbb{Z}_2$. Every non-identity element has order 2, so **not cyclic**. $\boxed{\mathbb{Z}_2^3}$

**Solution 4.** $16 = 2^4$. Partitions of 4: $4 = 4 = 3+1 = 2+2 = 2+1+1 = 1+1+1+1$. Five abelian groups:
- $\mathbb{Z}_{16}$
- $\mathbb{Z}_8 \times \mathbb{Z}_2$
- $\mathbb{Z}_4 \times \mathbb{Z}_4$
- $\mathbb{Z}_4 \times \mathbb{Z}_2 \times \mathbb{Z}_2$
- $\mathbb{Z}_2 \times \mathbb{Z}_2 \times \mathbb{Z}_2 \times \mathbb{Z}_2$

$\boxed{5\text{ abelian groups}}$

**Solution 5.** If $\mathbb{Z}_{mn}$ is cyclic of order $mn$, it has an element of order $mn$. In $\mathbb{Z}_m \times \mathbb{Z}_n$, max element order is $\operatorname{lcm}(m, n)$. For these to be isomorphic, $\operatorname{lcm}(m, n) = mn$, which means $\gcd(m, n) = 1$ (using $mn = \gcd \cdot \operatorname{lcm}$). $\blacksquare$

**Solution 6.** Need $\operatorname{lcm}(|a|, |b|) = 6$ with $|a|, |b| \mid 6$. Pairs $(|a|, |b|)$: $(6, 1), (6, 2), (6, 3), (6, 6), (1, 6), (2, 6), (3, 6), (2, 3), (3, 2)$.
- $\varphi(1) = 1, \varphi(2) = 1, \varphi(3) = 2, \varphi(6) = 2$ in $\mathbb{Z}_6$.

Count:
- $(6,1): 2 \cdot 1 = 2$
- $(6,2): 2 \cdot 1 = 2$
- $(6,3): 2 \cdot 2 = 4$
- $(6,6): 2 \cdot 2 = 4$
- $(1,6): 1 \cdot 2 = 2$
- $(2,6): 1 \cdot 2 = 2$
- $(3,6): 2 \cdot 2 = 4$
- $(2,3): 1 \cdot 2 = 2$
- $(3,2): 2 \cdot 1 = 2$

Total = $2+2+4+4+2+2+4+2+2 = 24$. $\boxed{24}$

**Solution 7.** In $D_6 = \langle r, s \mid r^6 = s^2 = e, srs = r^{-1} \rangle$. Let $H = \langle r^3, s \rangle$. Note $r^3$ has order 2 and commutes with... wait, $r^3 \cdot s = s \cdot r^{-3} = s r^3$ since $r^3$ is self-inverse. So $r^3$ commutes with $s$. Hence $\langle r^3, s \rangle \cong D_1 \times$... let's reorganize.

Let $K = \langle r^2, s \rangle$ and $Z = \langle r^3 \rangle$. $r^3$ is central (commutes with all since $(r^3)^{-1} = r^3$ and $sr^3 = r^{-3}s = r^3 s$). So $Z \le Z(D_6)$ of order 2. And $K = \langle r^2, s \rangle$ has order 6 with $r^2$ of order 3, $s$ of order 2, $s r^2 s = r^{-2}$, so $K \cong D_3$.

$Z \cap K$: need $r^{3k} \in K$. The elements of $K$ are $\{e, r^2, r^4, s, r^2 s, r^4 s\}$. $r^3 \notin K$. So $Z \cap K = \{e\}$.

$|ZK| = |Z||K|/|Z \cap K| = 2 \cdot 6 / 1 = 12 = |D_6|$, so $ZK = D_6$.

Both $Z$ (central, hence normal) and $K$ (index 2, hence normal) are normal.

By Theorem 11.11, $D_6 \cong Z \times K \cong \mathbb{Z}_2 \times D_3$. $\blacksquare$

## Related Concepts

- [[10-normal-subgroups-and-quotient-groups]] — normality is required for internal direct product
- [[12-subgroup-lattice-and-dihedral-groups]] — visualizes how direct products decompose
- [[06-cyclic-groups-and-order]] — cyclic groups are building blocks in FTFAG
- [[17-homomorphisms-and-isomorphisms]] — establishes the isomorphism $\mathbb{Z}_m \times \mathbb{Z}_n \cong \mathbb{Z}_{mn}$

---

*Last updated: 2026-04-18*
