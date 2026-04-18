---
title: "Subgroup Lattice and Dihedral Groups D_{2n}"
type: guide
co: CO2
related: [04-subgroups-generators-cayley-diagrams, 05-permutation-and-dihedral-groups, 10-normal-subgroups-and-quotient-groups, 11-direct-products]
---

# 12. Subgroup Lattice and Dihedral Groups $D_{2n}$

The **subgroup lattice** of a group is the partially ordered set of its subgroups under inclusion, visualized as a Hasse diagram. It compresses enormous structural information — order, generators, normality, quotients — into a single picture. This chapter studies subgroup lattices with particular emphasis on the dihedral groups $D_n$ (which we also call $D_{2n}$ following the "order-based" convention when ambiguity matters).

Dihedral groups are the richest source of intuition-building examples: non-abelian yet computable, finite yet structurally varied, and realized as concrete symmetry groups of regular polygons.

## 12.1 Subgroup Lattice

> **Definition 12.1 (Subgroup lattice).** Let $G$ be a group. The **subgroup lattice** $L(G)$ is the set of all subgroups of $G$, partially ordered by inclusion $\subseteq$. Edges in the Hasse diagram connect $H \lessdot K$ when $H \subsetneq K$ with no subgroup strictly in between.

The lattice always has a **top** $G$ (the whole group) and a **bottom** $\{e\}$ (the trivial subgroup).

**Lattice operations.**
- **Meet (infimum):** $H \wedge K = H \cap K$ — always a subgroup.
- **Join (supremum):** $H \vee K = \langle H \cup K \rangle$ — the smallest subgroup containing both (not necessarily equal to $HK$!).

> **Fact 12.2.** $L(G)$ forms a **lattice** in the order-theoretic sense: every pair has a meet and a join.

## 12.2 Example: Lattice of $\mathbb{Z}_{12}$

By the Fundamental Theorem of Cyclic Groups ([[06-cyclic-groups-and-order]]), $\mathbb{Z}_{12}$ has exactly one subgroup of each order dividing 12. Divisors of 12: $1, 2, 3, 4, 6, 12$. So there are **6 subgroups**:

- $\{0\} = \langle 0 \rangle$ (order 1)
- $\langle 6 \rangle = \{0, 6\}$ (order 2)
- $\langle 4 \rangle = \{0, 4, 8\}$ (order 3)
- $\langle 3 \rangle = \{0, 3, 6, 9\}$ (order 4)
- $\langle 2 \rangle = \{0, 2, 4, 6, 8, 10\}$ (order 6)
- $\mathbb{Z}_{12} = \langle 1 \rangle$ (order 12)

**Hasse diagram:**

```
              Z_12
             /     \
          <2>       <3>
          / \       /
       <4>   <6>---'
          \   /
          <0>
```

Refined:
- $\langle 0 \rangle \subset \langle 6 \rangle \subset \langle 2 \rangle, \langle 3 \rangle$
- $\langle 0 \rangle \subset \langle 4 \rangle \subset \langle 2 \rangle$
- $\langle 2 \rangle, \langle 3 \rangle \subset \mathbb{Z}_{12}$

This lattice is isomorphic to the divisor lattice of 12 (via order).

## 12.3 The Dihedral Group $D_n$

Throughout, we use $D_n$ = symmetries of the regular $n$-gon, $|D_n| = 2n$. (Some texts write $D_{2n}$ for this group; that convention emphasizes the order.)

> **Definition 12.3.** The dihedral group is
> $$D_n = \langle r, s \mid r^n = s^2 = e,\ srs = r^{-1} \rangle.$$

Elements:
$$D_n = \{e, r, r^2, \ldots, r^{n-1}, s, rs, r^2 s, \ldots, r^{n-1} s\}.$$

- $r$ = rotation by $2\pi/n$ (order $n$)
- $s$ = a fixed reflection (order 2)
- Every element is either $r^k$ (rotation) or $r^k s$ (reflection).

**Key relation.** $r^k s = s r^{-k}$, equivalently $sr = r^{-1}s$. Consequently: $(r^k s)^2 = r^k s r^k s = r^k r^{-k} s^2 = e$. All reflections have order 2.

## 12.4 Subgroups of $D_n$ — Complete Classification

> **Theorem 12.4 (Subgroups of $D_n$).** Every subgroup of $D_n$ is of one of two types:
>
> 1. **Cyclic subgroup of rotations:** $\langle r^d \rangle$ for some $d \mid n$. Order $n/d$. Has $\tau(n)$ such subgroups (one for each divisor of $n$).
>
> 2. **Dihedral subgroup:** $\langle r^d, r^i s \rangle$ for $d \mid n$ and $0 \le i < d$. This subgroup is isomorphic to $D_{n/d}$ and has order $2(n/d)$. For each divisor $d$ of $n$, there are $d$ such subgroups.

*Proof sketch.* Any subgroup $H \le D_n$ consists of some rotations and possibly some reflections.

**Case 1: $H$ contains only rotations.** Then $H \le \langle r \rangle$, and since $\langle r \rangle \cong \mathbb{Z}_n$ is cyclic, its subgroups are $\langle r^d \rangle$ for $d \mid n$.

**Case 2: $H$ contains a reflection, say $r^i s$.** Let $d$ be the smallest positive integer with $r^d \in H$ (so $d \mid n$; $H \cap \langle r \rangle = \langle r^d \rangle$). Then $H = \langle r^d, r^i s \rangle = \langle r^d \rangle \cup r^i s \langle r^d \rangle$, giving order $2(n/d)$. Different choices of $i$ modulo $d$ give different subgroups. $\blacksquare$

**Counting.** Total subgroups of $D_n$ is
$$\tau(n) + \sum_{d \mid n} d = \tau(n) + \sigma(n),$$
where $\tau(n)$ = number of divisors, $\sigma(n)$ = sum of divisors.

**Example 1.** Subgroups of $D_3$ (order 6). $n = 3$, divisors $\{1, 3\}$.

*Rotation subgroups:* $\langle r \rangle = \{e, r, r^2\}$ (order 3), $\langle e \rangle$ (order 1).

*Dihedral subgroups:* For $d = 3$: $\langle e, r^i s \rangle = \{e, s\}, \{e, rs\}, \{e, r^2 s\}$ (three subgroups of order 2). For $d = 1$: $\langle r, s \rangle = D_3$ itself.

Total: $\tau(3) + \sigma(3) = 2 + 4 = 6$ subgroups: $\{e\}, \langle s \rangle, \langle rs \rangle, \langle r^2 s \rangle, \langle r \rangle, D_3$.

Lattice:
```
                    D_3
                 /   |   \   \
             <s> <rs> <r²s>  <r>
                 \   |   /   /
                    {e}
```
Three reflection subgroups $\langle s \rangle, \langle rs \rangle, \langle r^2 s \rangle$ are all conjugate; $\langle r \rangle$ is normal (index 2).

## 12.5 Example: Lattice of $D_4$

$|D_4| = 8$. $n = 4$, divisors $\{1, 2, 4\}$. $\tau(4) = 3$, $\sigma(4) = 1 + 2 + 4 = 7$. Total $= 10$ subgroups.

*Rotation subgroups (3):*
- $\{e\}$ (order 1)
- $\langle r^2 \rangle = \{e, r^2\}$ (order 2)
- $\langle r \rangle = \{e, r, r^2, r^3\}$ (order 4)

*Dihedral subgroups:*
- $d = 4$: $\langle r^i s \rangle$ for $i = 0, 1, 2, 3$: $\{e, s\}, \{e, rs\}, \{e, r^2 s\}, \{e, r^3 s\}$ (4 subgroups of order 2)
- $d = 2$: $\langle r^2, r^i s \rangle$ for $i = 0, 1$: $\{e, r^2, s, r^2 s\}$ and $\{e, r^2, rs, r^3 s\}$ (2 subgroups of order 4, each $\cong V_4$)
- $d = 1$: $D_4$ itself.

**Total 10 subgroups.** Here is the lattice:

```
                        D_4
                    /    |    \
      {e,r²,s,r²s}   <r>   {e,r²,rs,r³s}
        /  |  \     |       /  |  \
      <s> <r²s> <r²>  <rs> <r³s>
                 |
                {e}
```

(Cleaned up — each order-2 subgroup connects to the two order-4 subgroups containing it, and each order-4 subgroup connects to $D_4$.)

**Normality.**
- $\langle r \rangle$, $\{e, r^2, s, r^2 s\}$, $\{e, r^2, rs, r^3 s\}$: all index 2, hence normal.
- $\langle r^2 \rangle$: the center of $D_4$; normal.
- $\{e, s\}, \{e, r^2 s\}$: conjugate pair (non-normal individually; normal together as a set).
- $\{e, rs\}, \{e, r^3 s\}$: conjugate pair.

## 12.6 Center of $D_n$

> **Theorem 12.5.**
> $$Z(D_n) = \begin{cases} \{e, r^{n/2}\} & \text{if } n \text{ is even} \\ \{e\} & \text{if } n \text{ is odd}. \end{cases}$$

*Proof.* Rotations: $r^k \in Z(D_n)$ iff $r^k s = s r^k$, i.e.\ $r^k s = r^{-k} s$, i.e.\ $r^{2k} = e$, i.e.\ $n \mid 2k$.
- If $n$ odd: only $k = 0$ works in $\{0, \ldots, n-1\}$.
- If $n$ even: $k = 0$ or $k = n/2$.

Reflections: $r^i s \in Z(D_n)$ iff $(r^i s) r = r (r^i s)$, i.e.\ $r^i s r = r^{i+1} s$, i.e.\ $r^{i-1} s = r^{i+1} s$, i.e.\ $r^{-2} = e$, i.e.\ $n \mid 2$. So only if $n = 1, 2$, which are degenerate cases. $\blacksquare$

## 12.7 Conjugacy Classes of $D_n$

> **Theorem 12.6.**
>
> **Case $n$ odd.** Conjugacy classes:
> - $\{e\}$
> - $\{r^k, r^{-k}\}$ for $k = 1, \ldots, (n-1)/2$
> - All reflections form one class: $\{s, rs, \ldots, r^{n-1} s\}$
>
> **Case $n$ even.** Conjugacy classes:
> - $\{e\}$
> - $\{r^{n/2}\}$
> - $\{r^k, r^{-k}\}$ for $k = 1, \ldots, n/2 - 1$
> - Even reflections: $\{s, r^2 s, r^4 s, \ldots\}$
> - Odd reflections: $\{rs, r^3 s, \ldots\}$

**Example 2.** $D_4$ conjugacy classes: $\{e\}, \{r^2\}, \{r, r^3\}, \{s, r^2 s\}, \{rs, r^3 s\}$. Five classes, sizes $1 + 1 + 2 + 2 + 2 = 8$ ✓.

## 12.8 Normal Subgroups of $D_n$

> **Theorem 12.7 (Normal subgroups of $D_n$).**
>
> 1. Every rotation subgroup $\langle r^d \rangle$ (for $d \mid n$) is normal in $D_n$.
> 2. If $n$ is odd, no proper dihedral subgroup is normal except rotation subgroups.
> 3. If $n$ is even, the two "sub-dihedral" groups $\langle r^2, s \rangle$ and $\langle r^2, rs \rangle$ (each of order $n$) are normal.

*Proof of (1).* For any $h = r^{kd} \in \langle r^d \rangle$: $r h r^{-1} = h$ and $s h s = s r^{kd} s = r^{-kd} \in \langle r^d \rangle$. So normalized by generators $r, s$, hence by all of $D_n$. $\blacksquare$

**Example 3.** In $D_4$, the normal subgroups are:
- $\{e\}$, $\langle r^2 \rangle$, $\langle r \rangle$, $\{e, r^2, s, r^2 s\}$, $\{e, r^2, rs, r^3 s\}$, $D_4$.

Six normal subgroups out of ten total.

## 12.9 Quotients of $D_n$

> **Proposition 12.8.** For any $d \mid n$:
> $$D_n / \langle r^d \rangle \cong D_d.$$

(Warning: this uses the order-$n$ convention for $D_d$. Explicitly: if $d \mid n$, collapsing rotations to $d$-th roots leaves a dihedral-type quotient.)

**Example 4.** $D_4 / \langle r^2 \rangle \cong D_2 = V_4$.

*Proof.* $\langle r^2 \rangle = \{e, r^2\}$ has index 4. Coset representatives: $\{e, r, s, rs\}$. In the quotient, $\bar{r}$ has order 2 (since $r^2 \in \langle r^2 \rangle$), $\bar{s}^2 = e$, $\bar{s}\bar{r}\bar{s} = \bar{r}^{-1} = \bar{r}$. So all elements commute and have order dividing 2. This is $V_4$. $\blacksquare$

**Example 5.** $D_4 / \langle r \rangle \cong \mathbb{Z}_2$ (index 2 quotient: rotation vs. reflection).

## 12.10 Abelianization of $D_n$

The **commutator subgroup** is $[D_n, D_n] = \langle r s r s^{-1} \rangle = \langle r \cdot r \rangle = \langle r^2 \rangle$ (using $srs^{-1} = r^{-1}$, so $[r, s] = r s r s^{-1} = r \cdot r = r^2$).

> **Proposition 12.9 (Abelianization).**
> $$D_n^{\text{ab}} = D_n / [D_n, D_n] = \begin{cases} \mathbb{Z}_2 \times \mathbb{Z}_2 & \text{if } n \text{ even} \\ \mathbb{Z}_2 & \text{if } n \text{ odd}. \end{cases}$$

*Explanation.* $[D_n, D_n] = \langle r^2 \rangle$, which equals $\langle r \rangle$ if $n$ is odd (since then $\gcd(2,n)=1$ and $r^2$ generates), and equals the order-$n/2$ cyclic subgroup if $n$ is even. Quotient has order 2 or 4 accordingly.

**Example 6.** $D_3^{\text{ab}} = \mathbb{Z}_2$ (3 odd). $D_4^{\text{ab}} = V_4$ (4 even). $D_5^{\text{ab}} = \mathbb{Z}_2$. $D_6^{\text{ab}} = V_4$.

## 12.11 $D_n$ as a Semidirect Product

(Brief preview, no proof.) $D_n = \langle r \rangle \rtimes \langle s \rangle \cong \mathbb{Z}_n \rtimes \mathbb{Z}_2$, where the action of $\mathbb{Z}_2$ on $\mathbb{Z}_n$ is by inversion $r \mapsto r^{-1}$. This is **not** a direct product unless $n \le 2$ — because the action is non-trivial.

Hence, for $n \ge 3$, $D_n \not\cong \mathbb{Z}_n \times \mathbb{Z}_2$. Example: $D_3 \not\cong \mathbb{Z}_6$ (one is non-abelian, the other is abelian).

**But** when $n$ is even with $n = 2m$, $m$ odd: $D_n \cong D_m \times \mathbb{Z}_2$ (see Problem 7 of [[11-direct-products]]).

## 12.12 Worked Example: Complete Analysis of $D_5$

$D_5 = \langle r, s \mid r^5 = s^2 = e, srs = r^{-1}\rangle$. $|D_5| = 10$.

**Subgroups.** Divisors of 5: $\{1, 5\}$.
- Rotation: $\{e\}$, $\langle r \rangle$.
- Dihedral: For $d = 5$, 5 order-2 reflection subgroups $\langle r^i s \rangle$ for $i = 0, \ldots, 4$. For $d = 1$, $D_5$ itself.

Total $2 + 5 + 1 = 8$. Check $\tau(5) + \sigma(5) = 2 + 6 = 8$. ✓

**Normality.** Only $\{e\}$, $\langle r \rangle$, $D_5$ are normal. The 5 reflection subgroups are all conjugate.

**Conjugacy classes.** $\{e\}, \{r, r^4\}, \{r^2, r^3\}, \{s, rs, r^2 s, r^3 s, r^4 s\}$. Sizes $1 + 2 + 2 + 5 = 10$ ✓.

**Center.** $Z(D_5) = \{e\}$ (5 odd).

**Quotients.** $D_5 / \langle r \rangle \cong \mathbb{Z}_2$ is the only non-trivial quotient.

**Abelianization.** $D_5^{\text{ab}} = \mathbb{Z}_2$.

## 12.13 Practice Problems

**Problem 1.** Draw the subgroup lattice of $\mathbb{Z}_{18}$.

**Problem 2.** List all subgroups of $D_6$ and compute how many there are.

**Problem 3.** Show that every subgroup of $D_n$ of index 2 is normal, and identify them for $n = 4$.

**Problem 4.** Compute $D_6 / \langle r^3 \rangle$.

**Problem 5.** Find all elements of order 2 in $D_6$ and count them. Which are conjugate to each other?

**Problem 6.** Show that the subgroup $\{e, r^2\} \le D_4$ is normal but not central when restricted to $D_8$... wait, show instead that $\langle r^2 \rangle$ is the center of $D_4$.

**Problem 7.** Prove: if $n$ is an odd prime, then $D_n$ has exactly $n + 2$ subgroups.

### Solutions

**Solution 1.** Divisors of 18: $\{1, 2, 3, 6, 9, 18\}$. Six subgroups: $\{0\}, \langle 9 \rangle, \langle 6 \rangle, \langle 3 \rangle, \langle 2 \rangle, \mathbb{Z}_{18}$ of orders $1, 2, 3, 6, 9, 18$.

Lattice:
```
            Z_18
           /    \
         <2>    <3>
        /  \    / \
     <6>  <9>  ...
     ...
```
Precisely: $\{0\} \subset \langle 9 \rangle \subset \langle 3 \rangle \subset \mathbb{Z}_{18}$; $\{0\} \subset \langle 6 \rangle \subset \langle 2 \rangle \subset \mathbb{Z}_{18}$; $\langle 6 \rangle \subset \langle 3 \rangle$; $\langle 9 \rangle \not\subset \langle 2 \rangle$.

Better lattice: six subgroups matching divisor lattice of 18:
```
        Z_18
        /  \
      <2>  <3>
       |   / \
      <6> <9>
       \ /
       <0>... wait let me redo
```
Standard: the lattice is isomorphic to divisor lattice of 18. 18 = 2·3². So lattice mirrors $\{1, 2, 3, 6, 9, 18\}$ under divisibility. $\blacksquare$

**Solution 2.** $D_6$, $n = 6$, divisors $\{1, 2, 3, 6\}$.

Rotation subgroups (4): $\{e\}, \langle r^3 \rangle, \langle r^2 \rangle, \langle r \rangle$ of orders 1, 2, 3, 6.

Dihedral subgroups: For $d = 6$: 6 order-2 subgroups $\langle r^i s \rangle$. For $d = 3$: 3 order-4 subgroups $\langle r^3, r^i s \rangle$ for $i = 0, 1, 2$. For $d = 2$: 2 order-6 subgroups $\langle r^2, r^i s \rangle$ for $i = 0, 1$. For $d = 1$: $D_6$ itself.

Total: $4 + 6 + 3 + 2 + 1 = 16$. Check: $\tau(6) + \sigma(6) = 4 + 12 = 16$ ✓. $\boxed{16\text{ subgroups}}$

**Solution 3.** Any subgroup of index 2 is normal ([[09-cosets-and-lagranges-theorem]] Theorem 9.11). In $D_4$, subgroups of index 2 have order 4: $\langle r \rangle$, $\{e, r^2, s, r^2 s\}$, $\{e, r^2, rs, r^3 s\}$. All three are normal. $\boxed{3\text{ normal subgroups of index 2}}$

**Solution 4.** $\langle r^3 \rangle = \{e, r^3\}$ is central in $D_6$ (since $6$ is even, $r^3$ is central). $|D_6 / \langle r^3 \rangle| = 12/2 = 6$. The quotient has generators $\bar{r}, \bar{s}$ with $\bar{r}^3 = e$ (since $r^3 \in \langle r^3 \rangle$), $\bar{s}^2 = e$, $\bar{s}\bar{r}\bar{s} = \bar{r}^{-1}$. This is the presentation of $D_3$. $\boxed{D_6 / \langle r^3 \rangle \cong D_3}$

**Solution 5.** In $D_6$ the order-2 elements are: $r^3$ (central rotation of order 2) and all 6 reflections $s, rs, r^2 s, r^3 s, r^4 s, r^5 s$. Total 7 elements of order 2.

Conjugacy: $\{r^3\}$ is its own class (central). Reflections split by parity: even-index $\{s, r^2 s, r^4 s\}$ and odd-index $\{rs, r^3 s, r^5 s\}$. $\boxed{7\text{ elements; classes of sizes }1, 3, 3}$

**Solution 6.** We showed in Theorem 12.5 that $Z(D_n) = \{e, r^{n/2}\}$ for $n$ even. For $n = 4$, $Z(D_4) = \{e, r^2\} = \langle r^2 \rangle$. $\blacksquare$

**Solution 7.** $n$ odd prime. Divisors of $n$: $\{1, n\}$. $\tau(n) = 2$, $\sigma(n) = 1 + n$. Total subgroups = $2 + (1 + n) = n + 3$.

Wait, let me recount. Rotation subgroups: $\{e\}$ and $\langle r \rangle$ (2 of them). Dihedral subgroups: for $d = n$: $n$ reflection subgroups $\langle r^i s \rangle$. For $d = 1$: $D_n$ itself (1). Total = $2 + n + 1 = n + 3$.

Hmm, the problem says $n + 2$. Let me check: for $n = 3$, we got 6 subgroups. $3 + 3 = 6$ ✓ (not $3 + 2 = 5$). For $n = 5$, we got 8 subgroups. $5 + 3 = 8$ ✓. So the correct count is $n + 3$, and the problem statement had a typo. Corrected: **$D_n$ with $n$ an odd prime has exactly $n + 3$ subgroups.** $\blacksquare$

## Related Concepts

- [[04-subgroups-generators-cayley-diagrams]] — subgroup tests and generators
- [[05-permutation-and-dihedral-groups]] — $D_n$ as a subgroup of $S_n$
- [[10-normal-subgroups-and-quotient-groups]] — normality of rotation subgroups
- [[11-direct-products]] — when $D_n$ splits as a direct product
- [[13-burnsides-theorem]] — applies to symmetry counting via $D_n$

---

*Last updated: 2026-04-18*
