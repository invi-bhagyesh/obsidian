---
title: "Subgroup Lattice and Dihedral Groups D_{2n}"
type: guide
co: CO2
related: [04-subgroups-generators-cayley-diagrams, 05-permutation-and-dihedral-groups, 10-normal-subgroups-and-quotient-groups, 11-direct-products]
---

# 12. Subgroup Lattice and Dihedral Groups $D_{2n}$

> **The central object.** The **subgroup lattice** of a group is the partially ordered set of its subgroups under inclusion, visualised as a **Hasse diagram**. It compresses enormous structural information — the orders, generators, normal subgroups, quotients, conjugacy patterns — into a single picture. A group and its subgroup lattice determine one another to a surprising (but not perfect) degree: Baer, Ore, and Suzuki's classical results show that many group-theoretic properties are *lattice-invariant*.
>
> This chapter studies subgroup lattices with particular emphasis on the **dihedral groups** $D_n$ (written $D_{2n}$ by some authors who label groups by their order, so take care with conventions). Dihedral groups are the richest source of intuition-building examples in a first course on groups: they are non-abelian yet thoroughly computable, finite yet structurally varied, and realised concretely as symmetry groups of regular polygons. Almost every theorem in elementary group theory — Lagrange, index-2 normality, orbit-stabiliser, class equation, abelianisation, semidirect product structure — is vividly illustrated by some $D_n$.

---

## 12.1 Subgroup Lattice

> **Definition 12.1 (Subgroup lattice).** Let $G$ be a group. The **subgroup lattice** $L(G)$ is the set of all subgroups of $G$, partially ordered by inclusion $\subseteq$. The associated **Hasse diagram** is the directed graph whose vertices are the elements of $L(G)$ and whose edges draw a **covering relation** $H \lessdot K$ (read "$H$ is covered by $K$") whenever $H \subsetneq K$ and there is no subgroup $M$ with $H \subsetneq M \subsetneq K$.

The lattice always has a unique **top element** $G$ itself (every subgroup is contained in $G$) and a unique **bottom element** $\{e\}$ (the trivial subgroup, contained in every subgroup — since every subgroup contains the identity).

**Lattice operations.** For $H, K \in L(G)$:

- **Meet (infimum):** $H \wedge K := H \cap K$. *Why this is a subgroup.* If $x, y \in H \cap K$, then $x, y \in H$ so $xy^{-1} \in H$, and $x, y \in K$ so $xy^{-1} \in K$; hence $xy^{-1} \in H \cap K$. By the one-step subgroup test ([[04-subgroups-generators-cayley-diagrams]]), $H \cap K \le G$.
- **Join (supremum):** $H \vee K := \langle H \cup K \rangle$, the smallest subgroup containing $H \cup K$. *Caution.* In general $H \vee K \neq HK = \{hk : h \in H, k \in K\}$; equality holds iff $HK = KH$ (a normality-type condition). When either $H$ or $K$ is normal in $G$, $HK$ is a subgroup and $HK = H \vee K$.

> **Fact 12.2 (Lattice axioms).** $L(G)$ forms a **lattice** in the order-theoretic sense: every pair of subgroups has a meet and a join. In fact $L(G)$ is a **complete lattice**: every family $\{H_i\}_{i \in I}$ of subgroups has a meet $\bigcap_i H_i$ and a join $\langle \bigcup_i H_i \rangle$.

*Why complete.* For the meet, an arbitrary intersection of subgroups is a subgroup by the same one-step argument. For the join, $\langle \bigcup_i H_i \rangle$ is defined as the intersection of all subgroups containing every $H_i$ — non-empty because $G$ is one such — and is a subgroup by the first point.

**Remarks on the structure of $L(G)$.**

1. $L(G)$ is **modular** when $G$ is abelian, because then every subgroup is normal and $(A \vee B) \cap C = A \vee (B \cap C)$ whenever $A \subseteq C$.
2. $L(G)$ is **distributive** iff $G$ is locally cyclic (e.g.\ $\mathbb{Z}_n$ is distributive; $S_3$ is not — see its pentagon-like sub-lattice).
3. $L(\mathbb{Z}_n)$ is **anti-isomorphic** to the divisor lattice of $n$: $\langle d \rangle \mapsto n/d$ reverses inclusion, so order inclusion $\langle a \rangle \supseteq \langle b \rangle$ mirrors divisibility $a \mid b$.

---

## 12.2 Example: Lattice of $\mathbb{Z}_{12}$

By the **Fundamental Theorem of Cyclic Groups** ([[06-cyclic-groups-and-order]]), $\mathbb{Z}_{12}$ has exactly one subgroup of each order dividing $12$. We proceed in three steps.

**Step 1: Enumerate divisors of $12$.** $12 = 2^2 \cdot 3$, so divisors are $\{1, 2, 3, 4, 6, 12\}$, six in total. Hence there are **6 subgroups** of $\mathbb{Z}_{12}$.

**Step 2: Identify each subgroup by a generator.** For each divisor $d \mid 12$, the unique subgroup of order $d$ is $\langle 12/d \rangle$:

| Order $d$ | Generator $12/d$ | Subgroup (additive notation)                                |
|-----------|-------------------|-------------------------------------------------------------|
| $1$       | $0$               | $\{0\}$                                                     |
| $2$       | $6$               | $\{0, 6\}$                                                  |
| $3$       | $4$               | $\{0, 4, 8\}$                                               |
| $4$       | $3$               | $\{0, 3, 6, 9\}$                                            |
| $6$       | $2$               | $\{0, 2, 4, 6, 8, 10\}$                                     |
| $12$      | $1$               | $\mathbb{Z}_{12}$                                           |

**Step 3: Draw the Hasse diagram.** Inclusion $\langle a \rangle \subseteq \langle b \rangle$ corresponds to $b \mid a$. The covering relations (immediate coverings, no subgroup strictly in between) correspond to *prime* divisibility steps:

```
                    Z_12  = <1>
                   /        \
               <2>            <3>
              /    \            \
          <4>      <6>           |
              \    /  \          |
               \  /    \         |
              <0>*      +--------+
                           ???
```

Let me redraw more carefully. Covering relations in divisor lattice of $12$:

- $1 \lessdot 2$, $1 \lessdot 3$
- $2 \lessdot 4$, $2 \lessdot 6$, $3 \lessdot 6$
- $4 \lessdot 12$, $6 \lessdot 12$

Translating back to subgroups (inclusion-reversed) $\langle 12/d \rangle$:

- $\{0\} \lessdot \langle 6 \rangle, \{0\} \lessdot \langle 4 \rangle$  *(covered subgroups of order 2 and 3)*
- $\langle 6 \rangle \lessdot \langle 3 \rangle, \langle 6 \rangle \lessdot \langle 2 \rangle, \langle 4 \rangle \lessdot \langle 2 \rangle$
- $\langle 3 \rangle \lessdot \mathbb{Z}_{12}, \langle 2 \rangle \lessdot \mathbb{Z}_{12}$

Cleaner diagram:

```
              Z_12
             /    \
           <2>    <3>
          /   \    |
        <4>   <6>--+
           \  /
           <0>
```

**Sanity check.** Each subgroup of $\mathbb{Z}_{12}$ is cyclic (subgroups of cyclic groups are cyclic, [[06-cyclic-groups-and-order]] Theorem). Every one is normal (abelian group). The lattice is **isomorphic to the divisor lattice of $12$** (both contain the same covering relations — a general fact for cyclic groups).

**Interpretation.** The lattice is **distributive** (it is in fact a product of two chains: $\{1 \mid 2 \mid 4\} \times \{1 \mid 3\}$, corresponding to the prime power decomposition $12 = 4 \cdot 3$). This mirrors $\mathbb{Z}_{12} \cong \mathbb{Z}_4 \times \mathbb{Z}_3$.

---

## 12.3 The Dihedral Group $D_n$

Throughout this chapter we use the **geometric convention**: $D_n$ denotes the group of symmetries of the regular $n$-gon, a group of order $|D_n| = 2n$. (Some authors, notably Dummit & Foote, use $D_{2n}$ for this group, making the order explicit; the material is identical.) We assume $n \ge 3$ unless otherwise stated, so that $D_n$ is genuinely non-abelian and contains both non-trivial rotations and reflections.

> **Definition 12.3 (Dihedral group — presentation).** The dihedral group $D_n$ has the presentation
> $$D_n \;=\; \big\langle\, r, s \ \big|\ r^n = s^2 = e,\quad srs = r^{-1} \,\big\rangle.$$

This presentation has two relations beyond $r^n = s^2 = e$: the single **twist relation** $srs = r^{-1}$, equivalently $srs^{-1} = r^{-1}$ (since $s = s^{-1}$), which entirely governs the interaction between rotations and reflections.

**Canonical form of elements.** Every element of $D_n$ can be written uniquely as
$$D_n = \{\, \underbrace{e, r, r^2, \ldots, r^{n-1}}_{n\text{ rotations}},\; \underbrace{s, rs, r^2 s, \ldots, r^{n-1} s}_{n\text{ reflections}} \,\}.$$

- $r$: rotation by angle $2\pi/n$; has order exactly $n$.
- $s$: a fixed chosen reflection; has order exactly $2$.
- Every element is of the form $r^k$ (a rotation) or $r^k s$ (a reflection).

**Key relations.** From $srs = r^{-1}$, we derive several useful forms:

1. $sr = r^{-1}s$ (move $s$ past $r$ on the left: sign flips).
2. $sr^k = r^{-k}s$ for all $k \in \mathbb{Z}$, by induction on $|k|$: $sr^{k+1} = (sr^k) r = r^{-k}sr = r^{-k}r^{-1}s = r^{-(k+1)}s$.
3. **Reflection-squared.** $(r^k s)^2 = r^k s r^k s = r^k (sr^k) s = r^k \cdot r^{-k} s \cdot s = r^k r^{-k} s^2 = e \cdot e = e$. So *every* reflection $r^k s$ has order exactly $2$.

**Geometric realisation.** Fix a regular $n$-gon centred at the origin with one vertex at $(1, 0)$. Then $r$ acts as the rotation matrix $\begin{pmatrix} \cos(2\pi/n) & -\sin(2\pi/n) \\ \sin(2\pi/n) & \cos(2\pi/n) \end{pmatrix}$ and $s$ as the reflection $\begin{pmatrix} 1 & 0 \\ 0 & -1 \end{pmatrix}$. One checks that $srs = r^{-1}$ by direct matrix multiplication (a nice linear algebra exercise; compare [[02-symmetries-of-the-plane]]).

**Why $srs = r^{-1}$ geometrically.** Conjugating a rotation by a reflection reverses its orientation. Reflecting, then rotating by $2\pi/n$, then reflecting back, runs the rotation "backwards" — hence $r^{-1}$.

---

## 12.4 Subgroups of $D_n$ — Complete Classification

The classification below is the cornerstone of this chapter and one of the most-tested results on qualifying exams.

> **Theorem 12.4 (Subgroups of $D_n$).** Let $n \ge 1$. Every subgroup of $D_n$ belongs to exactly one of the following two families.
>
> **(Type R — Rotation subgroups)** For each divisor $d$ of $n$, the cyclic subgroup
> $$\langle r^d \rangle \;=\; \{e, r^d, r^{2d}, \ldots, r^{n-d}\}$$
> of order $n/d$. There are $\tau(n)$ such subgroups (one per divisor of $n$).
>
> **(Type D — Dihedral subgroups with reflections)** For each divisor $d$ of $n$ and each $i \in \{0, 1, \ldots, d-1\}$, the subgroup
> $$\langle r^d, r^i s \rangle \;=\; \langle r^d \rangle \,\cup\, r^i s \langle r^d \rangle \;=\; \{r^{jd} : 0 \le j < n/d\} \cup \{r^{jd + i} s : 0 \le j < n/d\}$$
> of order $2(n/d)$ and isomorphic to $D_{n/d}$. For each divisor $d$ of $n$ there are exactly $d$ such subgroups, so in total $\sum_{d \mid n} d = \sigma(n)$ subgroups of type D.
>
> **Total count:** $\tau(n) + \sigma(n)$.

**Proof.** Let $H \le D_n$. Define
$$H_0 := H \cap \langle r \rangle = \text{the rotations in } H.$$
This is a subgroup of the cyclic group $\langle r \rangle \cong \mathbb{Z}_n$, so by the subgroup classification of cyclic groups, $H_0 = \langle r^d \rangle$ for a unique divisor $d \mid n$ (with the convention $d = n$ if $H_0 = \{e\}$).

**Case 1: $H$ contains no reflection.** Then $H = H_0 = \langle r^d \rangle$ — a type-R subgroup. There are $\tau(n)$ choices of $d \mid n$, giving $\tau(n)$ subgroups.

**Case 2: $H$ contains at least one reflection.** Pick any reflection $x \in H$. Every reflection has the form $r^i s$ for some $0 \le i < n$, so $x = r^i s$ for some $i$.

*Claim:* $H = H_0 \cup r^i s \cdot H_0$, and this union is disjoint.

*Proof of claim.* Since $r^i s \in H$ and $H_0 \le H$, we have $r^i s H_0 \subseteq H$, so $H_0 \cup r^i s H_0 \subseteq H$. Conversely, take any $h \in H$:

- If $h$ is a rotation, $h \in H_0$.
- If $h$ is a reflection, say $h = r^j s$. Then $h \cdot (r^i s)^{-1} = r^j s \cdot s^{-1} r^{-i} = r^j r^{-i} = r^{j - i}$ is a rotation in $H$, hence in $H_0 = \langle r^d \rangle$. So $r^{j-i} = r^{kd}$ for some integer $k$, giving $h = r^j s = r^{i + kd} s = r^{kd} \cdot r^i s \in H_0 \cdot r^i s = r^i s \cdot H_0$ (the last equality uses $r^i s H_0 = H_0 r^i s$ when $H_0$ is normal in $\langle r^i s, H_0 \rangle$; directly: $r^{kd} r^i s = r^i r^{kd} s = r^i s r^{-kd} = r^i s \cdot r^{-kd}$, and $r^{-kd} \in H_0$ since $H_0$ is a group).

Disjointness: $H_0$ consists of rotations, $r^i s H_0$ consists of reflections. So the union is disjoint. This completes the claim.

Consequently $|H| = 2|H_0| = 2(n/d)$, which also shows $H = \langle r^d, r^i s \rangle$ — the subgroup generated by these two elements contains $H_0 \cup r^i s H_0 = H$ and is contained in $H$ by the generators being in $H$.

*Counting type-D subgroups for fixed $d$.* Two different choices of representative reflection, $r^{i_1} s$ and $r^{i_2} s$, generate the same subgroup (together with $\langle r^d \rangle$) iff $r^{i_2} s \in \langle r^d, r^{i_1} s \rangle$ iff $r^{i_2 - i_1} \in \langle r^d \rangle$ iff $i_2 \equiv i_1 \pmod d$. Hence the distinct type-D subgroups for fixed $d$ are in bijection with residues $i \in \{0, 1, \ldots, d-1\}$ — giving exactly $d$ subgroups.

Summing: $\sum_{d \mid n} d = \sigma(n)$ type-D subgroups.

**Isomorphism type of $\langle r^d, r^i s \rangle$.** Let $R = r^d$ (order $n/d$) and $S = r^i s$ (order $2$). Compute
$$SRS = r^i s \cdot r^d \cdot r^i s = r^i \cdot sr^d \cdot r^i s = r^i \cdot r^{-d} s \cdot r^i s = r^{i-d} \cdot s r^i s = r^{i-d} r^{-i} = r^{-d} = R^{-1}.$$
So $R, S$ satisfy the dihedral relations $R^{n/d} = S^2 = e$, $SRS = R^{-1}$ — an epimorphism from $D_{n/d}$ onto $\langle R, S \rangle$ exists. Since both groups have order $2(n/d)$, the map is an isomorphism: $\langle r^d, r^i s \rangle \cong D_{n/d}$. $\blacksquare$

**Total count.**
$$\#L(D_n) \;=\; \tau(n) + \sigma(n),$$
where $\tau(n)$ counts divisors of $n$ and $\sigma(n)$ sums them.

**Sanity check for small $n$.**
- $n = 3$: $\tau(3) + \sigma(3) = 2 + 4 = 6$. (Will verify below.)
- $n = 4$: $\tau(4) + \sigma(4) = 3 + 7 = 10$. (Section 12.5.)
- $n = 5$: $\tau(5) + \sigma(5) = 2 + 6 = 8$. (Section 12.12.)
- $n = 6$: $\tau(6) + \sigma(6) = 4 + 12 = 16$. (Problem 2.)

---

**Example 1. Subgroups of $D_3$.**

$|D_3| = 6$, divisors of $n = 3$ are $\{1, 3\}$.

**Type R (rotation subgroups):**

- $d = 3$: $\langle r^3 \rangle = \langle e \rangle = \{e\}$, order $1$.
- $d = 1$: $\langle r \rangle = \{e, r, r^2\}$, order $3$.

**Type D (dihedral subgroups):**

- $d = 3$: $\langle r^3, r^i s \rangle = \langle e, r^i s \rangle = \langle r^i s \rangle = \{e, r^i s\}$ for $i \in \{0, 1, 2\}$. Three subgroups: $\{e, s\}, \{e, rs\}, \{e, r^2 s\}$, each of order $2$.
- $d = 1$: $\langle r, r^0 s \rangle = \langle r, s \rangle = D_3$ itself, order $6$.

**Total:** $2 + 3 + 1 = 6 = \tau(3) + \sigma(3) = 2 + 4$. ✓

**Hasse diagram of $L(D_3)$:**

```
                    D_3
                 /   |   \   \
             <s> <rs> <r²s>  <r>
                 \   |   /   /
                  \  |  /  /
                     {e}
```

**Normality and conjugacy analysis.**

- $\langle r \rangle$ has index $2$, hence is normal ([[10-normal-subgroups-and-quotient-groups]]). It is the unique subgroup of order $3$ (Lagrange + Sylow).
- The three order-$2$ reflection subgroups $\langle s \rangle, \langle rs \rangle, \langle r^2 s \rangle$ are **all conjugate** to each other in $D_3$: $r \langle s \rangle r^{-1} = \langle rsr^{-1} \rangle = \langle rs \cdot r^{-1} \rangle = \langle rs \cdot r^{-1}\rangle$; using $sr^{-1} = rs$ we get $rsr^{-1} = r \cdot r s = r^2 s$, so $r\langle s\rangle r^{-1} = \langle r^2 s \rangle$. Similarly $r \langle r^2 s \rangle r^{-1} = \langle rs \rangle$. None is normal.

This lattice exemplifies the **three-reflection picture** fundamental to $S_3 = D_3$.

---

## 12.5 Example: Lattice of $D_4$

$|D_4| = 8$, divisors of $n = 4$ are $\{1, 2, 4\}$. By Theorem 12.4, $\tau(4) + \sigma(4) = 3 + (1 + 2 + 4) = 3 + 7 = 10$ subgroups.

**Type R (3 subgroups):**

- $d = 4$: $\{e\}$, order $1$.
- $d = 2$: $\langle r^2 \rangle = \{e, r^2\}$, order $2$. *(The centre of $D_4$; see §12.6.)*
- $d = 1$: $\langle r \rangle = \{e, r, r^2, r^3\}$, order $4$. Cyclic of order $4$.

**Type D (7 subgroups):**

- $d = 4$ (four subgroups, each of order $2$, each isomorphic to $D_1 \cong \mathbb{Z}_2$):
  - $i = 0$: $\langle s \rangle = \{e, s\}$
  - $i = 1$: $\langle rs \rangle = \{e, rs\}$
  - $i = 2$: $\langle r^2 s \rangle = \{e, r^2 s\}$
  - $i = 3$: $\langle r^3 s \rangle = \{e, r^3 s\}$

- $d = 2$ (two subgroups, each of order $4$, each isomorphic to $D_2 = V_4$):
  - $i = 0$: $V_1 := \langle r^2, s \rangle = \{e, r^2, s, r^2 s\}$
  - $i = 1$: $V_2 := \langle r^2, rs \rangle = \{e, r^2, rs, r^3 s\}$

- $d = 1$: $\langle r, s \rangle = D_4$ itself.

**Total:** $3 + 4 + 2 + 1 = 10$. ✓

**Hasse diagram of $L(D_4)$:**

Order-by-order: $1 < 2 < 4 < 8$. We have the $\{e\}$ at bottom; five order-$2$ subgroups $\langle r^2 \rangle, \langle s\rangle, \langle rs\rangle, \langle r^2 s\rangle, \langle r^3 s\rangle$ in the middle-lower layer; three order-$4$ subgroups $\langle r\rangle, V_1, V_2$ in the middle-upper layer; $D_4$ at top.

Covering relations:

- $\{e\} \lessdot$ every order-$2$ subgroup ($5$ edges).
- $\langle r^2 \rangle \lessdot \langle r \rangle, V_1, V_2$ (since $r^2$ lies in each of these).
- $\langle s\rangle \lessdot V_1$ (since $s \in V_1$); $\langle s\rangle \not\subseteq V_2, \langle r \rangle$.
- $\langle r^2 s\rangle \lessdot V_1$; $\langle r^2 s\rangle \not\subseteq V_2, \langle r \rangle$.
- $\langle rs\rangle \lessdot V_2$; $\langle rs\rangle \not\subseteq V_1, \langle r \rangle$.
- $\langle r^3 s\rangle \lessdot V_2$; $\langle r^3 s\rangle \not\subseteq V_1, \langle r \rangle$.
- $\langle r \rangle, V_1, V_2 \lessdot D_4$ ($3$ edges, all index $2$).

```
                            D_4
                        /    |    \
                      V_1   <r>    V_2
                     / | \   |    / | \
                 <s> <r²s> \ |  / <rs> <r³s>
                           <r²>
                            |
                           {e}
```

(Read: each order-$4$ subgroup has three order-$2$ subgroups beneath it; exactly $\langle r^2\rangle$ is shared by all three order-$4$ subgroups.)

**Normality analysis.**

1. $\{e\}$ and $D_4$: trivially normal.
2. $\langle r \rangle, V_1, V_2$: all index $2$, hence **normal** ([[10-normal-subgroups-and-quotient-groups]] Theorem: every subgroup of index $2$ is normal).
3. $\langle r^2 \rangle$: this is the **centre** $Z(D_4)$ (Theorem 12.5 below), hence normal.
4. $\langle s \rangle$ and $\langle r^2 s\rangle$: conjugate pair. Compute $r \langle s\rangle r^{-1} = \langle rsr^{-1}\rangle$. Using $sr^{-1} = rs$: $rsr^{-1} = r \cdot rs = r^2 s$. So $r \langle s\rangle r^{-1} = \langle r^2 s\rangle$. Neither is normal individually, but together $\{\langle s\rangle, \langle r^2 s\rangle\}$ is closed under conjugation.
5. $\langle rs\rangle$ and $\langle r^3 s\rangle$: similarly conjugate, $r\langle rs\rangle r^{-1} = \langle r^3 s\rangle$.

**Summary of normal subgroups of $D_4$:** $\{e\}, \langle r^2\rangle, \langle r\rangle, V_1, V_2, D_4$ — six in total, out of ten subgroups.

**Verification via lattice shape.** $L(D_4)$ is famously non-modular: it contains the "pentagon-like" sub-lattice $\{\{e\}, \langle s\rangle, \langle r^2\rangle, V_1, D_4\}$ — but is actually modular here because the non-normal subgroups $\langle s\rangle, \langle r^2 s\rangle, \langle rs\rangle, \langle r^3 s\rangle$ sit in a specific way. More careful check: $L(D_4)$ is non-distributive but modular (see [[04-subgroups-generators-cayley-diagrams]] for the distinction).

---

## 12.6 Centre of $D_n$

> **Theorem 12.5 (Centre of $D_n$).**
> $$Z(D_n) \;=\; \begin{cases} \{e, r^{n/2}\} & \text{if } n \text{ is even,} \\ \{e\} & \text{if } n \text{ is odd.} \end{cases}$$

**Proof.** Recall $Z(D_n) = \{g \in D_n : gh = hg \text{ for all } h \in D_n\}$. It suffices to check commutation with the two generators $r, s$.

**Which rotations $r^k$ are central?** $r^k \in Z(D_n)$ iff $r^k$ commutes with $s$:
$$r^k s \;=\; s r^k \quad \Longleftrightarrow\quad r^k s = r^{-k} s \quad\text{(using } sr^k = r^{-k}s\text{)} \quad\Longleftrightarrow\quad r^k = r^{-k} \quad\Longleftrightarrow\quad r^{2k} = e \quad\Longleftrightarrow\quad n \mid 2k.$$
Within $\{0, 1, \ldots, n-1\}$:
- If $n$ odd: $n \mid 2k$ and $\gcd(n, 2) = 1$ imply $n \mid k$, forcing $k = 0$. Only the identity.
- If $n$ even: $n \mid 2k$ iff $k \equiv 0 \pmod{n/2}$, giving $k \in \{0, n/2\}$. Two central rotations.

**Which reflections $r^i s$ are central?** $r^i s \in Z(D_n)$ iff $r^i s$ commutes with $r$:
$$(r^i s) r \;=\; r(r^i s) \quad\Longleftrightarrow\quad r^i (sr) = r^{i+1} s \quad\Longleftrightarrow\quad r^i r^{-1} s = r^{i+1} s \quad\Longleftrightarrow\quad r^{i-1} = r^{i+1} \quad\Longleftrightarrow\quad r^2 = e \quad\Longleftrightarrow\quad n \mid 2.$$
For $n \ge 3$, this fails, so no reflection is central. (For $n = 1, 2$ the group is abelian and everything is central — degenerate cases.)

Combining: $Z(D_n) = \{e\}$ if $n$ odd and $Z(D_n) = \{e, r^{n/2}\} = \langle r^{n/2}\rangle \cong \mathbb{Z}_2$ if $n$ even. $\blacksquare$

**Verification checks.**

1. **$n$ even case.** $r^{n/2}$ has order $2$ (since $(r^{n/2})^2 = r^n = e$ and $r^{n/2} \ne e$ for $n \ge 2$). So $|Z(D_n)| = 2$, dividing $|D_n| = 2n$. ✓
2. **Quotient check.** $D_n / Z(D_n)$ has order $n$ (even case) or $2n$ (odd case). For $n$ even: $D_n/Z(D_n) \cong D_{n/2}$ — a useful fact tying the centre to a canonical quotient.
3. **Sanity: $D_3$.** $Z(D_3) = \{e\}$ — and indeed $D_3 = S_3$ has trivial centre, a classical fact.
4. **Sanity: $D_4$.** $Z(D_4) = \{e, r^2\}$ — the unique non-identity central element is the $180°$ rotation, which geometrically fixes the square's centre and commutes with every symmetry.

**Remark (geometric meaning).** For $n$ even, the rotation $r^{n/2}$ is the **central inversion** of the $n$-gon — the point-reflection through the origin. It commutes with everything because every other symmetry preserves the origin. For $n$ odd, the $n$-gon has no central inversion (the reflection through the origin is not among its symmetries; a regular triangle has no $180°$ rotational symmetry), hence no non-trivial centre.

---

## 12.7 Conjugacy Classes of $D_n$

> **Theorem 12.6 (Conjugacy classes of $D_n$).**
>
> **Case $n$ odd (say $n = 2m + 1$).** The conjugacy classes are:
> - $\{e\}$ — size $1$.
> - $\{r^k, r^{-k}\}$ for $k = 1, 2, \ldots, m$ — $m$ classes, each of size $2$.
> - $\{s, rs, r^2 s, \ldots, r^{n-1} s\}$ — the single class of all reflections, size $n$.
>
> *Total:* $1 + m + 1 = (n+3)/2$ conjugacy classes, with size check $1 + 2m + n = 1 + (n-1) + n = 2n$. ✓
>
> **Case $n$ even (say $n = 2m$).** The conjugacy classes are:
> - $\{e\}$ — size $1$.
> - $\{r^m\} = \{r^{n/2}\}$ — size $1$ (central rotation).
> - $\{r^k, r^{-k}\}$ for $k = 1, 2, \ldots, m - 1$ — $m - 1$ classes of size $2$.
> - $\{s, r^2 s, r^4 s, \ldots, r^{n-2}s\}$ — "even reflections", size $m = n/2$.
> - $\{rs, r^3 s, r^5 s, \ldots, r^{n-1}s\}$ — "odd reflections", size $m = n/2$.
>
> *Total:* $1 + 1 + (m-1) + 1 + 1 = m + 3$ conjugacy classes, with size check $1 + 1 + 2(m-1) + m + m = 2 + 2m - 2 + 2m = 4m = 2n$. ✓

**Proof sketch with computations.**

*Rotations.* We compute $g r^k g^{-1}$ for $g \in D_n$.
- If $g = r^j$: $r^j r^k r^{-j} = r^k$. Rotations commute with each other.
- If $g = r^j s$: $(r^j s) r^k (r^j s)^{-1} = r^j s r^k s^{-1} r^{-j} = r^j (s r^k s) r^{-j} = r^j r^{-k} r^{-j} = r^{-k}$.

Hence the conjugacy class of $r^k$ is $\{r^k, r^{-k}\}$. This has size $2$ unless $r^k = r^{-k}$, i.e.\ $r^{2k} = e$, i.e.\ $n \mid 2k$. For $k \in \{1, \ldots, n-1\}$:
- If $n$ odd: $n \mid 2k$ forces $n \mid k$, impossible. So all non-identity rotation classes have size $2$, and there are $(n-1)/2$ such pairs $\{r^k, r^{-k}\}$ for $k \in \{1, \ldots, (n-1)/2\}$.
- If $n$ even: $n \mid 2k$ iff $k = n/2$. So $\{r^{n/2}\}$ is a singleton class (central), and the other non-identity rotations pair up into $(n/2) - 1$ size-$2$ classes.

*Reflections.* Compute $g r^i s g^{-1}$ for $g \in D_n$.
- $g = r^j$: $r^j r^i s r^{-j} = r^{j+i} s r^{-j} = r^{j+i} \cdot r^j s = r^{i + 2j} s$. So rotation by $r^j$ sends the reflection $r^i s$ to $r^{i+2j} s$.
- $g = r^j s$: $r^j s r^i s s r^{-j} = r^j s r^i r^{-j} = r^j r^{-i} s r^{-j} = r^{j-i} \cdot r^j s = r^{2j - i} s$.

Combining: conjugates of $r^i s$ are $\{r^{i + 2j} s : j \in \mathbb{Z}\} \cup \{r^{2j - i} s : j \in \mathbb{Z}\} = \{r^\ell s : \ell \equiv \pm i \pmod{\gcd(n, 2)}\}$.

Careful: let $d = \gcd(n, 2)$. The set $\{i + 2j \bmod n : j \in \mathbb{Z}\}$ is the coset $i + 2\mathbb{Z} \bmod n$:

- If $n$ odd, $\gcd(2, n) = 1$, so $2\mathbb{Z} \bmod n = \mathbb{Z}_n$ and all reflections $r^\ell s$ are conjugate. Single class of all $n$ reflections.
- If $n$ even, $2\mathbb{Z} \bmod n = \{0, 2, 4, \ldots, n - 2\}$, so $\{r^{i+2j}s\} = \{r^\ell s : \ell \equiv i \pmod 2\}$ and $\{r^{2j - i}s\} = \{r^\ell s : \ell \equiv -i \equiv i \pmod 2\}$. Reflections with $\ell \equiv 0 \pmod 2$ form one class; with $\ell \equiv 1 \pmod 2$ form another. Two classes, each of size $n/2$. $\blacksquare$

**Example 2. Conjugacy classes of $D_4$.**

$n = 4$ is even, $m = 2$. Classes:

- $\{e\}$: size $1$.
- $\{r^2\}$: size $1$.
- $\{r, r^3\}$: size $2$ (the only non-central-non-identity rotation pair, $k = 1$).
- $\{s, r^2 s\}$: size $2$ (even reflections, $\ell \in \{0, 2\}$).
- $\{rs, r^3 s\}$: size $2$ (odd reflections, $\ell \in \{1, 3\}$).

Check: $1 + 1 + 2 + 2 + 2 = 8 = |D_4|$. ✓ Number of classes: $5 = m + 3 = 2 + 3$. ✓

**Sanity: class equation.** The class equation of $D_4$ is
$$|D_4| = |Z(D_4)| + \sum_{\text{non-central classes}} [D_4 : C_{D_4}(g)] \;=\; 2 + 2 + 2 + 2 = 8.$$
Each non-central class has size $2$, corresponding to centralisers of index $2$, i.e.\ order $4$ — correctly, since each of $r, s, rs$ has centraliser $\langle r\rangle$ (for $r$) or one of $V_1, V_2$ (for $s, rs$).

**Remark (connection to character theory).** The number of conjugacy classes equals the number of irreducible complex representations of $D_n$. For $D_4$, five classes $\Leftrightarrow$ five irreducibles: four $1$-dimensional (from $D_4 / [D_4, D_4] = V_4$) and one $2$-dimensional (the faithful rotation-reflection rep). Sum of squares: $1^2 + 1^2 + 1^2 + 1^2 + 2^2 = 8$. ✓

---

## 12.8 Normal Subgroups of $D_n$

> **Theorem 12.7 (Normal subgroups of $D_n$, $n \ge 3$).** A subgroup $H \le D_n$ is normal iff it falls into one of:
>
> 1. A **rotation subgroup** $\langle r^d \rangle$ for some $d \mid n$.
> 2. If $n$ is **even**, the two **index-$2$ "sub-dihedral" subgroups** $V_1 := \langle r^2, s\rangle$ and $V_2 := \langle r^2, rs\rangle$, each of order $n$.
> 3. $D_n$ itself (trivially).
>
> In particular, if $n$ is **odd**, the normal subgroups are exactly the rotation subgroups $\langle r^d\rangle$ for $d \mid n$, giving $\tau(n)$ normal subgroups.

**Proof.**

*(1) Rotation subgroups are normal.* Take $H = \langle r^d \rangle$. It suffices to verify $gHg^{-1} = H$ for generators $g \in \{r, s\}$.

- $g = r$: $r H r^{-1} = H$ since $H$ is abelian and contains $r^d$.
- $g = s$: $s r^{kd} s = r^{-kd} \in H$. Hence $sHs = H$.

So $H$ is normal. $\checkmark$

*(2) The two index-$2$ dihedral subgroups ($n$ even) are normal.* Any subgroup of index $2$ is normal ([[10-normal-subgroups-and-quotient-groups]]). $V_1$ and $V_2$ have order $n$ in a group of order $2n$, index $2$. $\checkmark$

*(3) No other type-D subgroup is normal.* Suppose $H = \langle r^d, r^i s\rangle$ is type-D with $d > 2$ (so $|H| = 2(n/d) < n$, index $> 2$), and examine whether $H \trianglelefteq D_n$.

Consider $r H r^{-1}$. We have $r r^d r^{-1} = r^d \in H$. And $r (r^i s) r^{-1} = r^{i+1} s r^{-1} = r^{i+1} \cdot r s = r^{i+2} s$. So if $r^{i+2} s \in H$, then $r^{i+2} s = r^{kd} \cdot r^i s$ for some $k$, giving $r^{i+2} = r^{i + kd}$, i.e.\ $2 \equiv kd \pmod n$, i.e.\ $d \mid 2$ (in $\mathbb{Z}_n$). So $d = 1$ or $d = 2$. Thus only $d \in \{1, 2\}$ yields normal type-D subgroups. For $d = 1$ we get $D_n$ itself. For $d = 2$, which requires $n$ even, we get $V_1$ and $V_2$. No others. $\checkmark$

**Consequence.** The lattice of normal subgroups $N(D_n)$ is much smaller than $L(D_n)$:

- $n$ odd: $|N(D_n)| = \tau(n) + 1$ (rotation subgroups plus $D_n$).

  Wait — $D_n$ itself is the rotation subgroup $\langle r^1\rangle \cup s\langle r^1\rangle$, which is not a rotation subgroup. Let me recount. Rotation subgroups: one per divisor $d \mid n$, including $d = 1$ giving $\langle r\rangle$ (order $n$) and $d = n$ giving $\{e\}$. So $\tau(n)$ rotation subgroups total. Plus $D_n$ itself. So $|N(D_n)| = \tau(n) + 1$ for $n$ odd.

- $n$ even: $|N(D_n)| = \tau(n) + 1 + 2 = \tau(n) + 3$ (rotation subgroups, plus $D_n$, plus $V_1, V_2$).

**Example 3. Normal subgroups of $D_4$.**

$n = 4$, $\tau(4) = 3$. Rotation subgroups: $\{e\}, \langle r^2\rangle, \langle r\rangle$. Plus $D_4$, plus $V_1, V_2$. Total: $3 + 1 + 2 = 6$ normal subgroups out of $10$ total. ✓ (Matches §12.5 analysis.)

---

## 12.9 Quotients of $D_n$

> **Proposition 12.8 (Dihedral quotients).** For any divisor $d \mid n$:
> $$D_n \,/\, \langle r^d \rangle \;\cong\; D_d.$$
> (Here $D_1 = \mathbb{Z}_2$ and $D_2 = V_4$.)

**Proof.** Let $K = \langle r^d \rangle$; $|K| = n/d$, $[D_n : K] = 2d$. We showed $K \trianglelefteq D_n$ (Theorem 12.7(1)). So the quotient $Q := D_n/K$ makes sense and has order $2d$.

*Presentation of $Q$.* Let $\bar r, \bar s$ denote the images of $r, s$ in $Q$. Relations:

- $\bar r^d = \overline{r^d} = \bar e$ (since $r^d \in K$).
- $\bar s^2 = \overline{s^2} = \overline{e} = \bar e$.
- $\bar s \bar r \bar s = \overline{srs} = \overline{r^{-1}} = \bar r^{-1}$.

So $\bar r, \bar s$ satisfy the dihedral relations for $D_d$. Hence there is a surjection $D_d \twoheadrightarrow Q$. Since both groups have order $2d$, the surjection is an isomorphism. $\blacksquare$

**Alternative derivation (First Isomorphism Theorem).** Define a homomorphism $\varphi: D_n \to D_d$ by $\varphi(r) = \rho$ (a generator of the rotation subgroup of $D_d$, with $\rho^d = e$) and $\varphi(s) = \sigma$ (a reflection in $D_d$). Check that the dihedral relations are preserved. Then $\ker \varphi = \langle r^d\rangle = K$ (the rotations killed by $\varphi$ are exactly those of order dividing $d$ in $D_d$'s rotation subgroup, i.e.\ $r^{kd}$ for $k \in \mathbb{Z}$). By the First Isomorphism Theorem, $D_n/K \cong \operatorname{im}(\varphi) = D_d$.

**Example 4.** $D_4 / \langle r^2 \rangle$.

Here $n = 4$, $d = n/(n/d) = ?$ — let me re-read Prop 12.8. The statement says $D_n/\langle r^d\rangle \cong D_d$. Taking $n = 4, d = 2$: $D_4 / \langle r^2\rangle \cong D_2$. And $D_2 = V_4$ (the Klein four-group). So $D_4/\langle r^2\rangle \cong V_4$.

*Direct verification.* $\langle r^2\rangle = \{e, r^2\}$ has index $4$ in $D_4$. Coset representatives: $\{e, r, s, rs\}$ (the four cosets $\{e, r^2\}, \{r, r^3\}, \{s, r^2 s\}, \{rs, r^3 s\}$). In the quotient:

- $\bar r^2 = \bar e$, so $|\bar r| \in \{1, 2\}$. Since $r \notin \langle r^2\rangle$, $\bar r \ne \bar e$, so $|\bar r| = 2$.
- $\bar s^2 = \bar e$, so $|\bar s| \in \{1, 2\}$, and $s \notin \langle r^2\rangle$ gives $|\bar s| = 2$.
- $\bar s \bar r \bar s = \bar r^{-1} = \bar r$, so $\bar s$ and $\bar r$ commute.
- $\bar r \bar s$ has $(\bar r \bar s)^2 = \bar r \bar s \bar r \bar s = \bar r \bar r \bar s^2 = \bar r^2 = \bar e$ (using commutation).

Hence all three non-identity elements $\bar r, \bar s, \bar r \bar s$ have order $2$ and commute. This is $V_4$. ✓

**Example 5.** $D_4 / \langle r\rangle$.

$\langle r\rangle$ has index $2$ in $D_4$. The quotient has order $2$, hence $D_4 / \langle r\rangle \cong \mathbb{Z}_2$. Conceptually, this is the "rotation vs reflection" dichotomy: each coset is either $\langle r\rangle$ (all rotations) or $s\langle r\rangle$ (all reflections); the quotient records "orientation-preserving vs orientation-reversing".

This quotient is the **sign character** of $D_n$, analogous to the sign map $S_n \to \mathbb{Z}_2$.

**Pattern (dihedral quotient ladder).**

$$D_n \twoheadrightarrow D_n/\langle r^d\rangle \cong D_d \twoheadrightarrow D_d/\langle r^{d'}\rangle \cong D_{d'} \twoheadrightarrow \cdots$$

as $d' \mid d \mid n$. A chain of dihedral quotients parameterised by divisor chains. The final quotient $D_n / \langle r\rangle \cong \mathbb{Z}_2$ is universal: the unique non-trivial quotient of every non-trivial dihedral group onto an abelian group.

---

## 12.10 Abelianisation of $D_n$

> **Proposition 12.9 (Commutator subgroup of $D_n$).** $[D_n, D_n] = \langle r^2 \rangle$. In particular:
> $$[D_n, D_n] \;=\; \begin{cases} \langle r \rangle & \text{if } n \text{ is odd,} \\ \langle r^2 \rangle \text{ of order } n/2 & \text{if } n \text{ is even.} \end{cases}$$

**Proof.**

*Step 1: $r^2 \in [D_n, D_n]$.* Compute the commutator
$$[r, s] \;=\; r s r^{-1} s^{-1} \;=\; rs \cdot r^{-1}s \;=\; rs \cdot sr \;=\; r \cdot s^2 \cdot r \;=\; r \cdot r \;=\; r^2.$$
Wait, let me redo this with care. Using $sr^{-1} = rs$ (from $srs = r^{-1}$):
$$[r, s] \;=\; rsr^{-1}s^{-1} \;=\; r \cdot (sr^{-1}) \cdot s^{-1} \;=\; r \cdot (rs) \cdot s^{-1} \;=\; r \cdot r \cdot (s s^{-1}) \;=\; r^2.$$
So $r^2 \in [D_n, D_n]$, hence $\langle r^2\rangle \le [D_n, D_n]$.

*Step 2: $[D_n, D_n] \le \langle r^2\rangle$.* Equivalently, show $D_n / \langle r^2\rangle$ is abelian — then by universal property of abelianisation, $[D_n, D_n] \le \langle r^2\rangle$.

Case $n$ even: $\langle r^2\rangle$ has index $4$ in $D_n$. In the quotient $D_n/\langle r^2\rangle$, $\bar r^2 = \bar e$ and $\bar s^2 = \bar e$, so $|\bar r|, |\bar s| \mid 2$. Since $\bar s \bar r \bar s = \bar r^{-1} = \bar r$ (because $\bar r$ has order dividing $2$, so $\bar r = \bar r^{-1}$), $\bar r$ and $\bar s$ commute. Hence $D_n/\langle r^2\rangle$ is abelian.

Case $n$ odd: $\langle r^2\rangle = \langle r\rangle$ (since $\gcd(2, n) = 1$, and $r^2$ generates the same cyclic group as $r$). $D_n/\langle r\rangle$ has order $2$, cyclic of order $2$, abelian.

In both cases $D_n/\langle r^2\rangle$ is abelian, so $[D_n, D_n] \le \langle r^2\rangle$. $\checkmark$

Combining Steps 1 and 2: $[D_n, D_n] = \langle r^2\rangle$. $\blacksquare$

> **Corollary 12.10 (Abelianisation).**
> $$D_n^{\mathrm{ab}} \;=\; D_n / [D_n, D_n] \;\cong\; \begin{cases} \mathbb{Z}_2 \times \mathbb{Z}_2 & \text{if } n \text{ is even,} \\ \mathbb{Z}_2 & \text{if } n \text{ is odd.} \end{cases}$$

**Proof.** By Prop 12.9 and $|D_n| = 2n$:

- $n$ odd: $|D_n^{\mathrm{ab}}| = 2n/n = 2$. Only abelian group of order $2$ is $\mathbb{Z}_2$.
- $n$ even: $|D_n^{\mathrm{ab}}| = 2n/(n/2) = 4$. We showed $\bar r^2 = \bar s^2 = (\bar r\bar s)^2 = \bar e$ in the quotient, so every non-identity element has order $2$. This identifies the group as $V_4 = \mathbb{Z}_2 \times \mathbb{Z}_2$ (the unique abelian group of order $4$ with exponent $2$). $\blacksquare$

**Example 6.** Computing abelianisations.

- $D_3^{\mathrm{ab}} = \mathbb{Z}_2$ ($3$ odd). Matches: $D_3 = S_3$ and $S_3^{\mathrm{ab}} = \mathbb{Z}_2$ (the sign).
- $D_4^{\mathrm{ab}} = V_4$ ($4$ even).
- $D_5^{\mathrm{ab}} = \mathbb{Z}_2$ ($5$ odd).
- $D_6^{\mathrm{ab}} = V_4$ ($6$ even).
- $D_{100}^{\mathrm{ab}} = V_4$.

**Interpretation.** The abelianisation captures the "obvious" abelian invariants of $D_n$:
- The sign map $D_n \to \mathbb{Z}_2$ (rotation vs reflection) — present for all $n$.
- For $n$ even, an additional parity map $D_n \to \mathbb{Z}_2$ sending rotations by their parity modulo $2$ (i.e.\ $r^k \mapsto k \bmod 2$) and reflections $r^i s \mapsto i \bmod 2$ — gives the $V_4$ factor.

These two quotient maps jointly classify $1$-dimensional complex characters of $D_n$: there are $|D_n^{\mathrm{ab}}|$ of them.

---

## 12.11 $D_n$ as a Semidirect Product

$D_n$ decomposes as a **semidirect product**:
$$D_n \;\cong\; \langle r\rangle \rtimes \langle s\rangle \;\cong\; \mathbb{Z}_n \rtimes \mathbb{Z}_2,$$
where the action of $\mathbb{Z}_2 = \langle s\rangle$ on $\mathbb{Z}_n = \langle r\rangle$ is by **inversion**: $s \cdot r = r^{-1}$.

**Why semidirect and not direct.** A direct product $\mathbb{Z}_n \times \mathbb{Z}_2$ would require $r$ and $s$ to commute. But in $D_n$, $sr = r^{-1}s \ne rs$ whenever $n \ge 3$ (since $r^{-1} \ne r$ then). So the action of $\mathbb{Z}_2$ on $\mathbb{Z}_n$ is non-trivial for $n \ge 3$, and $D_n \not\cong \mathbb{Z}_n \times \mathbb{Z}_2$.

**Concrete check: $D_3 \not\cong \mathbb{Z}_6$.** $D_3$ is non-abelian, $\mathbb{Z}_6$ is abelian. Different isomorphism types.

**Special case: $D_n$ as a direct product.** When $n$ is even with $n = 2m$ and $m$ is odd, one can show
$$D_n \;\cong\; D_m \times \mathbb{Z}_2.$$
The $\mathbb{Z}_2$ factor is the centre $Z(D_n) = \langle r^{n/2}\rangle$, and the complementary $D_m$ sits inside.

*Proof sketch.* Let $z = r^m$ (the central rotation). Since $m$ is odd, $\gcd(m, 2) = 1$. Consider $H := \langle r^2, s\rangle$, a subgroup of order $n$ isomorphic to $D_m$ (since $r^2$ has order $n/2 = m$ and dihedral relations hold). Then $Z := \langle z\rangle$ has order $2$, $H \cap Z = \{e\}$ (since $z = r^m$ and $r^m \in H$ iff $m \in 2\mathbb{Z}$, false as $m$ is odd), $HZ = D_n$ by order count, and $H, Z$ both normal. Hence $D_n \cong H \times Z \cong D_m \times \mathbb{Z}_2$.

**Example.** $D_6 \cong D_3 \times \mathbb{Z}_2$ (since $6 = 2 \cdot 3$, $3$ odd). $D_{10} \cong D_5 \times \mathbb{Z}_2$.

**Non-example.** $D_4 \not\cong D_2 \times \mathbb{Z}_2$, because $4 = 2 \cdot 2$ with $m = 2$ even. Indeed $D_4$ has an element of order $4$ (namely $r$), while $D_2 \times \mathbb{Z}_2 = V_4 \times \mathbb{Z}_2 = (\mathbb{Z}_2)^3$ has exponent $2$. See [[11-direct-products]] for further discussion.

---

## 12.12 Worked Example: Complete Analysis of $D_5$

We now carry out the full "autopsy" of $D_5$.

**Setup.** $D_5 = \langle r, s \mid r^5 = s^2 = e,\ srs = r^{-1}\rangle$. Order $|D_5| = 10$. $n = 5$ is an odd prime.

**(a) Subgroups.** Divisors of $5$: $\{1, 5\}$.

- *Type R:*
  - $d = 5$: $\{e\}$ (order $1$).
  - $d = 1$: $\langle r\rangle$ (order $5$).
- *Type D:*
  - $d = 5$: five reflection subgroups $\langle r^i s\rangle = \{e, r^i s\}$ for $i = 0, 1, 2, 3, 4$.
  - $d = 1$: $\langle r, s\rangle = D_5$ itself.

**Total:** $2 + 5 + 1 = 8$. Sanity check: $\tau(5) + \sigma(5) = 2 + (1 + 5) = 2 + 6 = 8$. ✓

**Lattice:**

```
                      D_5
                  /   /   |   \   \   \
               <s> <rs> <r²s> <r³s> <r⁴s>   <r>
                  \   \   |   /   /   /
                           {e}
```

(The five reflection subgroups and $\langle r\rangle$ are all incomparable, each covering $\{e\}$ and covered by $D_5$.)

**(b) Normality.**

- $\{e\}$, $D_5$: trivially normal.
- $\langle r\rangle$: index $2$, normal.
- Reflection subgroups: by Theorem 12.7 ($n$ odd case), no proper type-D subgroup is normal. In particular, none of the five $\langle r^i s\rangle$ is normal.

**Verification of non-normality of $\langle s\rangle$.** $r \langle s\rangle r^{-1} = \langle rsr^{-1}\rangle = \langle r \cdot rs\rangle = \langle r^2 s\rangle \neq \langle s\rangle$ (since the two subgroups share only $\{e\}$).

**Total normal subgroups:** $3$ ($\{e\}, \langle r\rangle, D_5$).

**(c) Centre.** By Theorem 12.5 ($n$ odd), $Z(D_5) = \{e\}$.

**(d) Conjugacy classes.** By Theorem 12.6 ($n = 5$ odd, $m = 2$):

- $\{e\}$: size $1$.
- $\{r, r^{-1}\} = \{r, r^4\}$: size $2$.
- $\{r^2, r^{-2}\} = \{r^2, r^3\}$: size $2$.
- $\{s, rs, r^2 s, r^3 s, r^4 s\}$: all five reflections, size $5$.

Check: $1 + 2 + 2 + 5 = 10$ ✓. Number of classes: $4 = (n + 3)/2 = 8/2$. ✓

**Class equation:** $|D_5| = 1 + 2 + 2 + 5 = 10$.

**(e) Centralisers.**

- $C_{D_5}(r) = \langle r\rangle$ (order $5$) — size $2$ class gives centraliser of index $2$.
- $C_{D_5}(r^2) = \langle r\rangle$ (same, order $5$).
- $C_{D_5}(s) = \langle s\rangle$ (order $2$) — size $5$ class gives centraliser of index $5$.

**(f) Normaliser of a reflection subgroup.** $N_{D_5}(\langle s\rangle) = ?$ It contains $\langle s\rangle$. Elements $r^i$ normalising $\langle s\rangle$: need $r^i s r^{-i} \in \langle s\rangle$, i.e.\ $r^{2i} s = s$ or $r^{2i}s = e$ (impossible, left is a reflection). So $r^{2i}s = s$, i.e.\ $r^{2i} = e$, i.e.\ $5 \mid 2i$, i.e.\ $i = 0$. So $N_{D_5}(\langle s\rangle) = \langle s\rangle$. The normaliser index is $|D_5|/|N| = 10/2 = 5$, matching the number of conjugate subgroups (five reflection subgroups, all conjugate).

**(g) Quotients.**
- $D_5 / \{e\} = D_5$.
- $D_5 / \langle r\rangle \cong \mathbb{Z}_2$ (the sign map).
- $D_5 / D_5 = \{e\}$.

Only three quotients (up to isomorphism), corresponding to three normal subgroups.

**(h) Abelianisation.** $D_5^{\mathrm{ab}} = D_5 / [D_5, D_5] = D_5 / \langle r\rangle = \mathbb{Z}_2$.

**(i) Structure.** $D_5 = \mathbb{Z}_5 \rtimes \mathbb{Z}_2$, non-split (i.e.\ not a direct product). Since $5$ is odd prime, this is a specific case of "metacyclic group" with particularly simple structure.

**(j) Representation-theoretic count.** $4$ conjugacy classes $\Rightarrow$ $4$ complex irreducibles: $2$ one-dimensional (from $D_5^{\mathrm{ab}} = \mathbb{Z}_2$) and $2$ two-dimensional (from $\chi(r) = 2\cos(2\pi k/5)$ for $k = 1, 2$). Check: $1^2 + 1^2 + 2^2 + 2^2 = 10$. ✓

---

## 12.13 Practice Problems

**Problem 1.** Draw the subgroup lattice of $\mathbb{Z}_{18}$.

**Problem 2.** List all subgroups of $D_6$ and determine the total count.

**Problem 3.** Show that every subgroup of $D_n$ of index $2$ is normal. For $n = 4$, identify them explicitly.

**Problem 4.** Compute $D_6 / \langle r^3\rangle$ and identify the isomorphism class.

**Problem 5.** Find all elements of order $2$ in $D_6$, count them, and describe their conjugacy classes.

**Problem 6.** Prove that $\langle r^2\rangle$ is the centre of $D_4$, and identify $\langle r^2\rangle$ as a subgroup of $D_4$ using the general theorem on $Z(D_n)$.

**Problem 7.** Prove: if $n$ is an odd prime, then $D_n$ has exactly $n + 3$ subgroups.

---

### Solutions

**Solution 1 (Lattice of $\mathbb{Z}_{18}$).**

*Setup.* $\mathbb{Z}_{18}$ is cyclic of order $18$. By the Fundamental Theorem of Cyclic Groups, subgroups are in one-to-one correspondence with divisors of $18$.

*Step 1: Divisors.* $18 = 2 \cdot 3^2$. Divisors: $\{1, 2, 3, 6, 9, 18\}$, six in total.

*Step 2: Identify subgroups.* For each divisor $d \mid 18$, the unique subgroup of order $d$ is $\langle 18/d\rangle$:

| Order $d$ | Generator $18/d$ | Subgroup                                  |
|-----------|-------------------|-------------------------------------------|
| $1$       | $0$               | $\{0\}$                                   |
| $2$       | $9$               | $\{0, 9\}$                                |
| $3$       | $6$               | $\{0, 6, 12\}$                            |
| $6$       | $3$               | $\{0, 3, 6, 9, 12, 15\}$                  |
| $9$       | $2$               | $\{0, 2, 4, 6, 8, 10, 12, 14, 16\}$        |
| $18$      | $1$               | $\mathbb{Z}_{18}$                         |

*Step 3: Covering relations.* Since $\mathbb{Z}_{18}$'s lattice is isomorphic to the divisor lattice of $18$ (with inclusion of subgroups = divisibility of orders), the covering relations correspond to *prime* divisibility steps in divisor lattice:

- $1 \lessdot 2, 1 \lessdot 3$
- $2 \lessdot 6, 3 \lessdot 6, 3 \lessdot 9$
- $6 \lessdot 18, 9 \lessdot 18$

Translating to subgroups (ordered by inclusion = reverse divisibility of generator):

- $\{0\} \lessdot \langle 9\rangle$ (order $2$), $\{0\} \lessdot \langle 6\rangle$ (order $3$).
- $\langle 9\rangle \lessdot \langle 3\rangle$ (order $6$).
- $\langle 6\rangle \lessdot \langle 3\rangle, \langle 6\rangle \lessdot \langle 2\rangle$ (order $9$).
- $\langle 3\rangle \lessdot \mathbb{Z}_{18}, \langle 2\rangle \lessdot \mathbb{Z}_{18}$.

*Hasse diagram.*

```
                Z_18 = <1>
               /        \
           <2>           <3>
             \          /    \
              <6>------+      <9>
             /              /
          {0} = <0>--------+
```

Refined (cleaner rendering):

```
                   Z_18
                  /    \
               <2>      <3>
                 \     /  \
                  <6>      <9>
                    \     /
                     <0>
```

*Wait, the topology:* $\langle 9\rangle$ (order $2$) sits below $\langle 3\rangle$ (order $6$) because $\{0, 9\} \subset \{0, 3, 6, 9, 12, 15\}$. And $\langle 9\rangle$ is NOT below $\langle 2\rangle$ (order $9$) because $9 \notin \langle 2\rangle = \{0, 2, 4, 6, 8, 10, 12, 14, 16\}$ — the element $9$ is odd. ✓

So $\{0\} \lessdot \langle 9\rangle \lessdot \langle 3\rangle \lessdot \mathbb{Z}_{18}$ and $\{0\} \lessdot \langle 6\rangle \lessdot \langle 2\rangle \lessdot \mathbb{Z}_{18}$, with cross-links $\langle 6\rangle \lessdot \langle 3\rangle$.

```
                         Z_18
                        /    \
                     <2>      <3>
                       \     /  \
                        \   /    \
                        <6>     <9>
                          \     /
                           \   /
                           <0>
```

*Interpretation.* The lattice is the product of two chains: $\{1 \mid 2\} \times \{1 \mid 3 \mid 9\}$ (two factors mirroring $2^1$ and $3^2$). It is a distributive lattice. $\blacksquare$

---

**Solution 2 (Subgroups of $D_6$).**

*Setup.* $n = 6$, $|D_6| = 12$. Divisors of $6$: $\{1, 2, 3, 6\}$.

*By Theorem 12.4:*

**Type R (rotation subgroups, $\tau(6) = 4$):**

- $d = 6$: $\{e\}$, order $1$.
- $d = 3$: $\langle r^3\rangle = \{e, r^3\}$, order $2$.
- $d = 2$: $\langle r^2\rangle = \{e, r^2, r^4\}$, order $3$.
- $d = 1$: $\langle r\rangle = \{e, r, r^2, r^3, r^4, r^5\}$, order $6$.

**Type D (dihedral subgroups, $\sigma(6) = 1 + 2 + 3 + 6 = 12$):**

- $d = 6$ (six subgroups of order $2$, $\cong D_1 \cong \mathbb{Z}_2$):
  - $\langle r^i s\rangle$ for $i = 0, 1, 2, 3, 4, 5$.
- $d = 3$ (three subgroups of order $4$, $\cong D_2 = V_4$):
  - $\langle r^3, s\rangle = \{e, r^3, s, r^3 s\}$
  - $\langle r^3, rs\rangle = \{e, r^3, rs, r^4 s\}$
  - $\langle r^3, r^2 s\rangle = \{e, r^3, r^2 s, r^5 s\}$
- $d = 2$ (two subgroups of order $6$, $\cong D_3 = S_3$):
  - $\langle r^2, s\rangle = \{e, r^2, r^4, s, r^2 s, r^4 s\}$
  - $\langle r^2, rs\rangle = \{e, r^2, r^4, rs, r^3 s, r^5 s\}$
- $d = 1$ (one subgroup): $D_6$ itself.

*Tally.* $4 + 6 + 3 + 2 + 1 = 16$. Sanity check: $\tau(6) + \sigma(6) = 4 + 12 = 16$. ✓

$\boxed{D_6 \text{ has exactly } 16 \text{ subgroups.}}$ $\blacksquare$

*Bonus observation.* Among the type-D subgroups, $\langle r^2, s\rangle$ and $\langle r^2, rs\rangle$ (both of order $6$, index $2$) are normal. $\langle r^3, r^i s\rangle$ ($d = 3$, order $4$) are not index $2$ and not normal in general — though $\langle r^3\rangle$ is contained in each and is normal. Combined with $4$ rotation subgroups (all normal) and $D_6$, there are $4 + 2 + 1 = 7$ normal subgroups total.

---

**Solution 3 (Index-2 subgroups are normal).**

*Theorem (recap).* If $H \le G$ with $[G : H] = 2$, then $H \trianglelefteq G$.

*Proof.* Let $[G : H] = 2$. Then the left cosets of $H$ are $H$ and $gH$ for some $g \notin H$, i.e.\ $G = H \sqcup gH$. Similarly the right cosets are $H$ and $Hg'$ for $g' \notin H$, $G = H \sqcup Hg'$.

Pick any $g \notin H$. Then $gH$ is the unique non-identity left coset, and $Hg$ is the unique non-identity right coset. Since both equal $G \setminus H$, we have $gH = Hg$. And for $h \in H$, $hH = H = Hh$ trivially. So $gH = Hg$ for all $g \in G$, which is the definition of normality.

Equivalently: for $g \notin H$ and any $x \in H$, $gxg^{-1}$ lies in the coset $gxH g^{-1}$. Since $xH = H$ (as $x \in H$), $gxg^{-1} \in gHg^{-1}$. Now $gHg^{-1}$ has the same size as $H$ (conjugation is a bijection), and since conjugation preserves index, $gHg^{-1}$ is a subgroup of order $|G|/2$. There is only one such subgroup: $H$. Hence $gHg^{-1} = H$. $\checkmark$ $\blacksquare$

*Index-$2$ subgroups of $D_4$.* These have order $|D_4|/2 = 4$. By the classification (§12.5), the order-$4$ subgroups are:

- $\langle r\rangle = \{e, r, r^2, r^3\}$ (cyclic, $\cong \mathbb{Z}_4$).
- $V_1 = \langle r^2, s\rangle = \{e, r^2, s, r^2 s\}$ ($\cong V_4$).
- $V_2 = \langle r^2, rs\rangle = \{e, r^2, rs, r^3 s\}$ ($\cong V_4$).

$\boxed{\text{Three normal index-}2\text{ subgroups: } \langle r\rangle, V_1, V_2.}$ $\blacksquare$

*Verification.* The quotient $D_4 / \langle r\rangle \cong \mathbb{Z}_2$ (sign). $D_4/V_1$ and $D_4/V_2$: both have order $2$, so $\cong \mathbb{Z}_2$. These are three surjective homomorphisms $D_4 \twoheadrightarrow \mathbb{Z}_2$, which together with the trivial map give $|\operatorname{Hom}(D_4, \mathbb{Z}_2)| = 4 = |D_4^{\mathrm{ab}}| = |V_4|$. ✓ (Characters of $D_4$ onto $\mathbb{Z}_2$.)

---

**Solution 4 ($D_6 / \langle r^3\rangle$).**

*Setup.* $n = 6$, $\langle r^3\rangle = \{e, r^3\}$. Order $2$, index $[D_6 : \langle r^3\rangle] = 12/2 = 6$.

*Step 1: Normality of $\langle r^3\rangle$.* Two arguments.

- $r^3 = r^{n/2}$ with $n$ even, so $r^3 \in Z(D_6)$ by Theorem 12.5. Any subgroup contained in the centre is normal.
- Alternatively: $\langle r^3\rangle$ is a rotation subgroup, hence normal by Theorem 12.7(1).

*Step 2: Apply Proposition 12.8.* Take $d = 3$ (a divisor of $n = 6$). Then
$$D_6 / \langle r^3\rangle \;\cong\; D_3.$$

*Step 3: Direct verification.* Coset representatives of $\langle r^3\rangle$: $\{e, r, r^2, s, rs, r^2 s\}$ (six cosets). In the quotient, write $\bar x = x \langle r^3\rangle$.

- $\bar r^3 = \overline{r^3} = \overline{e} = \bar e$. So $|\bar r| \mid 3$; and since $r, r^2 \notin \langle r^3\rangle$, $\bar r \ne \bar e \ne \bar r^2$, so $|\bar r| = 3$.
- $\bar s^2 = \bar e$, and $s \notin \langle r^3\rangle$, so $|\bar s| = 2$.
- $\bar s \bar r \bar s = \overline{srs} = \overline{r^{-1}} = \bar r^{-1} = \bar r^2$.

So $\bar r, \bar s$ satisfy $\bar r^3 = \bar s^2 = \bar e$, $\bar s \bar r \bar s = \bar r^{-1}$ — the dihedral relations for $D_3$. Since $|D_6/\langle r^3\rangle| = 6 = |D_3|$, we have $D_6 / \langle r^3\rangle \cong D_3$. $\checkmark$

$\boxed{D_6 / \langle r^3\rangle \cong D_3 = S_3.}$ $\blacksquare$

*Geometric interpretation.* Modding out the central $180°$ rotation of the hexagon identifies opposite vertices. The resulting "triangle with labelled vertices" has symmetry group $D_3 = S_3$.

---

**Solution 5 (Order-2 elements and conjugacy in $D_6$).**

*Setup.* $D_6$, $|D_6| = 12$, $n = 6$.

*Step 1: Identify order-$2$ elements.*

*Rotations of order $2$:* $r^k$ has order $2$ iff $r^{2k} = e$ and $r^k \neq e$, iff $n \mid 2k$ and $n \nmid k$. For $n = 6$: $2k \equiv 0 \pmod 6$ and $k \not\equiv 0 \pmod 6$, so $k = 3$. Single rotation of order $2$: $r^3$.

*Reflections:* Every reflection $r^i s$ has order exactly $2$ (Section 12.3). Six reflections: $s, rs, r^2 s, r^3 s, r^4 s, r^5 s$.

*Total order-$2$ elements:* $1 + 6 = 7$.

$\boxed{\text{Seven elements of order }2.}$

*Step 2: Conjugacy classes (from Theorem 12.6, $n = 6$ even, $m = 3$).*

- $\{e\}$: size $1$, order $1$.
- $\{r^3\}$: size $1$, order $2$. *(Central, lies in $Z(D_6) = \{e, r^3\}$.)*
- $\{r, r^5\}$: size $2$, order $6$.
- $\{r^2, r^4\}$: size $2$, order $3$.
- $\{s, r^2 s, r^4 s\}$: size $3$, order $2$. (Even-index reflections.)
- $\{rs, r^3 s, r^5 s\}$: size $3$, order $2$. (Odd-index reflections.)

Check: $1 + 1 + 2 + 2 + 3 + 3 = 12$. ✓

*Step 3: Order-$2$ conjugacy.* Three classes of order-$2$ elements:

- $\{r^3\}$: size $1$.
- $\{s, r^2 s, r^4 s\}$: size $3$.
- $\{rs, r^3 s, r^5 s\}$: size $3$.

$\boxed{\text{Seven elements of order }2, \text{ partitioned into classes of sizes }1, 3, 3.}$ $\blacksquare$

*Verification.* Each reflection has centraliser of size $|D_6|/|\text{class}| = 12/3 = 4$. The centraliser of $s$ is $\{e, s, r^3, r^3 s\}$ (the unique $V_4$ subgroup containing $s$ and $r^3$; note $r^3$ is central), which has order $4$ ✓. Similarly for others.

*Geometric interpretation.* The three "axis" reflections (through opposite vertex pairs) form one conjugacy class; the three "edge-midpoint" reflections form another. They are not conjugate because a hexagon has two distinct types of reflection axes — a dichotomy absent in the triangle (where all axes are equivalent).

---

**Solution 6 ($Z(D_4) = \langle r^2\rangle$).**

*Approach.* Use Theorem 12.5 plus direct verification.

*Step 1: Apply the theorem.* $n = 4$ is even, $n/2 = 2$. By Theorem 12.5,
$$Z(D_4) = \{e, r^{n/2}\} = \{e, r^2\} = \langle r^2\rangle.$$

*Step 2: Explicit verification that $r^2$ is central.*

- $r \cdot r^2 = r^3 = r^2 \cdot r$. ✓ (Rotations commute.)
- $s \cdot r^2 \cdot s = r^{-2} = r^2$ (since $r^4 = e$, so $r^{-2} = r^2$). Hence $r^2 s = sr^2$. ✓

Both generators commute with $r^2$, hence all of $D_4$ commutes with $r^2$. So $r^2 \in Z(D_4)$.

*Step 3: No other non-identity element is central.*

- $r$: $sr = r^{-1}s = r^3 s \ne rs$. So $r \notin Z(D_4)$.
- $r^3$: similarly $sr^3 = r^{-3}s = rs \ne r^3 s$. So $r^3 \notin Z(D_4)$.
- Any reflection $r^i s$: $r \cdot r^i s \cdot r^{-1} = r^{i+1} s r^{-1} = r^{i+1} \cdot rs = r^{i+2}s$. For this to equal $r^i s$, need $r^2 = e$, false. So no reflection is central.

Combined: $Z(D_4) = \{e, r^2\} = \langle r^2\rangle$. $\blacksquare$

*Structural remark.* $\langle r^2\rangle$ is the unique subgroup of $D_4$ of order $2$ that is normal. (The four reflection-generated order-$2$ subgroups $\langle s\rangle, \langle rs\rangle, \langle r^2 s\rangle, \langle r^3 s\rangle$ are all non-normal, forming two conjugate pairs.) Being the unique normal subgroup of order $2$ gives another way to identify the centre — a general pattern: in any finite $p$-group, the centre is non-trivial, and often it is the smallest non-trivial normal subgroup.

*Geometric interpretation.* $r^2$ is the $180°$ rotation of the square — the central inversion. It commutes with every symmetry because it represents the "point-reflect through centre" operation, which is central in any symmetry group of a centrally symmetric figure.

---

**Solution 7 (Subgroup count for $n$ an odd prime).**

*Claim.* If $n = p$ is an odd prime, then $D_p$ has exactly $p + 3$ subgroups.

*Proof.*

*Step 1: Apply Theorem 12.4 formula.* $\#L(D_p) = \tau(p) + \sigma(p)$.

*Step 2: Compute $\tau(p)$ and $\sigma(p)$.* Since $p$ is prime, its divisors are $\{1, p\}$. Hence:

- $\tau(p) = 2$.
- $\sigma(p) = 1 + p$.

*Step 3: Sum.*
$$\#L(D_p) = 2 + (1 + p) = p + 3.$$

$\boxed{D_p \text{ with }p\text{ odd prime has exactly }p + 3\text{ subgroups.}}$ $\blacksquare$

*Explicit enumeration (for understanding).*

- **Type R (2 subgroups):** $\{e\}$ and $\langle r\rangle$.
- **Type D (p + 1 subgroups):**
  - $d = p$: $p$ reflection subgroups $\langle r^i s\rangle$ for $i = 0, \ldots, p - 1$, each of order $2$.
  - $d = 1$: $D_p$ itself, of order $2p$.

Total: $2 + p + 1 = p + 3$. ✓

*Sanity checks against known cases.*

- $p = 3$: $3 + 3 = 6$ subgroups in $D_3$. Matches Example 1 above. ✓
- $p = 5$: $5 + 3 = 8$ subgroups in $D_5$. Matches §12.12 above. ✓
- $p = 7$: Predict $7 + 3 = 10$ subgroups in $D_7$: namely $\{e\}, \langle r\rangle, D_7$, and seven reflection subgroups. Indeed $10$. ✓

*Further structural fact.* The subgroup lattice $L(D_p)$ for $p$ odd prime has height $3$: bottom $\{e\}$, then $p + 1$ incomparable atoms (seven reflection subgroups plus $\langle r\rangle$), then $D_p$. It is a "fan" lattice — the simplest non-trivial dihedral lattice shape.

---

## Related Concepts

- [[04-subgroups-generators-cayley-diagrams]] — subgroup tests, generation, and Cayley diagram perspective.
- [[05-permutation-and-dihedral-groups]] — $D_n$ realised as a subgroup of $S_n$, with explicit permutations.
- [[06-cyclic-groups-and-order]] — the rotation subgroup $\langle r\rangle \cong \mathbb{Z}_n$ is cyclic; its lattice theory drives type-R subgroup counting.
- [[10-normal-subgroups-and-quotient-groups]] — normality of rotation subgroups and quotient computations.
- [[11-direct-products]] — conditions under which $D_n$ splits as $D_m \times \mathbb{Z}_2$.
- [[13-burnsides-theorem]] — applies to symmetry counting problems where $D_n$ acts on colourings of an $n$-gon.

---

*Last updated: 2026-04-19*
