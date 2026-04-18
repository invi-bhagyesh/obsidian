---
title: "Centralizer, Normalizer, Stabilizer, and Class Equation"
type: guide
co: CO3
related: [15-group-actions, 17-homomorphisms-and-isomorphisms, 10-normal-subgroups-and-quotient-groups]
---

# 16. Centralizer, Normalizer, Stabilizer, and the Class Equation

This chapter develops three subgroups associated to elements and subsets of a group — **centralizers**, **normalizers**, and **stabilizers** — and uses them with the **class equation** to extract deep structural information. The class equation is the workhorse behind Cauchy's theorem, the Sylow theorems (partial preview), and the theorem that $p$-groups have non-trivial center.

Most of this material follows directly from [[15-group-actions]] by specializing to the conjugation action.

## 16.1 Centralizer

> **Definition 16.1 (Centralizer of an element).** For $a \in G$, the **centralizer** of $a$ in $G$ is
> $$C_G(a) = \{g \in G : ga = ag\}.$$

> **Definition 16.2 (Centralizer of a subset).** For $S \subseteq G$, the **centralizer** of $S$ is
> $$C_G(S) = \{g \in G : gs = sg \text{ for all } s \in S\} = \bigcap_{s \in S} C_G(s).$$

**Proposition 16.3.** $C_G(a)$ is a subgroup of $G$. (As a stabilizer of the conjugation action on $G$, automatically.)

> **Proposition 16.4 (Orbit-stabilizer for conjugation).** For any $a \in G$,
> $$|\operatorname{cl}(a)| = [G : C_G(a)] = \frac{|G|}{|C_G(a)|}.$$

**Example 1.** In $S_3$, compute $C_{S_3}((1\,2))$.

*Solution.* $C_{S_3}((1\,2)) = \{\sigma : \sigma(1\,2) = (1\,2)\sigma\}$. Elements of $S_3$:
- $e$: ✓ (trivially)
- $(1\,2)$: ✓ ($x$ commutes with itself)
- $(1\,3)$: $(1\,3)(1\,2) = (1\,3\,2)$ vs $(1\,2)(1\,3) = (1\,2\,3)$. Not equal.
- $(2\,3)$: similarly not.
- $(1\,2\,3)$: $(1\,2\,3)(1\,2) = (1\,3)$ vs $(1\,2)(1\,2\,3) = (2\,3)$. Not equal.
- $(1\,3\,2)$: similar.

$C_{S_3}((1\,2)) = \{e, (1\,2)\}$ of order 2. Check: $|\operatorname{cl}((1\,2))| = 6/2 = 3$. Indeed, conjugates of $(1\,2)$ in $S_3$ are $(1\,2), (1\,3), (2\,3)$ — three elements. ✓

**Example 2.** For any $a \in G$, $\langle a \rangle \le C_G(a)$ since $a^k a = a a^k$.

## 16.2 Normalizer

> **Definition 16.5 (Normalizer of a subset).** For $S \subseteq G$, the **normalizer** is
> $$N_G(S) = \{g \in G : gSg^{-1} = S\}.$$

Note: $gSg^{-1} = S$ as sets — elements may be shuffled.

> **Proposition 16.6.** $N_G(S)$ is a subgroup of $G$, and if $S = H$ is a subgroup, $N_G(H)$ is the largest subgroup of $G$ in which $H$ is normal.

*Proof sketch.* $H \trianglelefteq K$ iff $K \le N_G(H)$. $\blacksquare$

> **Corollary 16.7.** $H \trianglelefteq G$ iff $N_G(H) = G$.

**Relationship to conjugation action.** $G$ acts on the set of subgroups of $G$ by conjugation: $g \cdot H = gHg^{-1}$. The stabilizer of $H$ under this action is $N_G(H)$.

> **Proposition 16.8 (Number of conjugates).** The number of distinct conjugates of a subgroup $H$ in $G$ is
> $$|\{gHg^{-1} : g \in G\}| = [G : N_G(H)].$$

**Example 3.** In $S_3$, the subgroup $H = \langle (1\,2) \rangle = \{e, (1\,2)\}$ has conjugates $\{e, (1\,2)\}, \{e, (1\,3)\}, \{e, (2\,3)\}$ — 3 conjugates. So $[S_3 : N_{S_3}(H)] = 3$, giving $|N_{S_3}(H)| = 2 = |H|$. In fact $N_{S_3}(H) = H$.

## 16.3 Relationship: $C_G(a) \le N_G(\langle a \rangle)$

> **Proposition 16.9.** $C_G(a) \le N_G(\langle a \rangle)$.

*Proof.* If $g \in C_G(a)$, then $ga = ag$, so $gag^{-1} = a$, hence $g\langle a \rangle g^{-1} = \langle gag^{-1} \rangle = \langle a \rangle$. $\blacksquare$

Equality fails in general. **Example.** In $\mathbb{Z}_4 = \langle a \rangle$, $\mathbb{Z}_4$ is abelian so $C_{\mathbb{Z}_4}(a) = N_{\mathbb{Z}_4}(\langle a \rangle) = \mathbb{Z}_4$ — equality. But in larger groups this may differ.

## 16.4 Center $Z(G)$ Revisited

> **Definition 16.10.** $Z(G) = \{g \in G : gh = hg \text{ for all } h \in G\} = C_G(G)$.

Equivalent characterizations:
- $Z(G) = \bigcap_{h \in G} C_G(h)$
- $Z(G) = \{g \in G : \operatorname{cl}(g) = \{g\}\}$ (elements with singleton conjugacy class)

> **Proposition 16.11.** $Z(G) \trianglelefteq G$. (Normal because abelian-within-$G$; formally: $g Z(G) g^{-1} = Z(G)$ trivially.)

## 16.5 The Class Equation

> **Theorem 16.12 (Class Equation).** Let $G$ be a finite group. Then
> $$|G| = |Z(G)| + \sum_{i=1}^k [G : C_G(a_i)],$$
> where $a_1, \ldots, a_k$ are representatives of the non-singleton conjugacy classes of $G$.

*Proof.* $G$ is partitioned by conjugacy classes. Singleton classes are exactly elements of $Z(G)$ (contributing $|Z(G)|$ to the count). Non-singleton classes have size $[G : C_G(a_i)]$ by orbit-stabilizer. Summing gives $|G|$. $\blacksquare$

**Example 4 (Class equation of $S_3$).**
- $\{e\}$ (size 1): contributes 1.
- $(1\,2), (1\,3), (2\,3)$ (size 3): contributes 3.
- $(1\,2\,3), (1\,3\,2)$ (size 2): contributes 2.

$Z(S_3) = \{e\}$, so class equation is $|S_3| = 6 = 1 + 3 + 2$. ✓

**Example 5 (Class equation of $D_4$).**
- $\{e\}, \{r^2\}$ (central singletons): contribute 2.
- $\{r, r^3\}$ (size 2): contribute 2.
- $\{s, r^2 s\}$ (size 2): contribute 2.
- $\{rs, r^3 s\}$ (size 2): contribute 2.

$|D_4| = 8 = 2 + 2 + 2 + 2$. $Z(D_4) = \{e, r^2\}$. ✓

## 16.6 Consequences of the Class Equation

### Theorem 16.13 ($p$-groups have non-trivial center)

> **Theorem 16.13.** If $|G| = p^n$ for some prime $p$ and $n \ge 1$, then $Z(G) \neq \{e\}$.

*Proof.* In the class equation, each term $[G : C_G(a_i)]$ divides $|G| = p^n$ and is $> 1$ (since $a_i$ is non-central). So each term is a positive power of $p$. Reducing mod $p$:
$$|G| \equiv |Z(G)| + 0 + 0 + \cdots \pmod p,$$
i.e., $|Z(G)| \equiv 0 \pmod p$. Since $|Z(G)| \ge 1$ (contains $e$) and is divisible by $p$, $|Z(G)| \ge p > 1$. $\blacksquare$

> **Corollary 16.14.** Every group of order $p^2$ is abelian.

*Proof.* $|G| = p^2$. By Theorem 16.13, $|Z(G)| \in \{p, p^2\}$. If $|Z(G)| = p^2$, done. Otherwise $|Z(G)| = p$, so $|G/Z(G)| = p$, which is cyclic. But **$G/Z(G)$ cyclic $\Rightarrow G$ abelian** (Problem 7 of [[10-normal-subgroups-and-quotient-groups]]). So $G$ abelian, hence $Z(G) = G$, contradicting $|Z(G)| = p$. $\blacksquare$

### Theorem 16.15 (Cauchy's theorem — abelian case)

> **Theorem 16.15 (Cauchy, abelian case).** Let $G$ be a finite abelian group and $p$ a prime dividing $|G|$. Then $G$ has an element of order $p$.

*Proof.* Induction on $|G|$. Base: $|G| = p$ cyclic, trivial.

Inductive step. Take $a \in G$ of order $m > 1$. If $p \mid m$, then $a^{m/p}$ has order $p$.

Otherwise $p \nmid m$. Consider $G/\langle a \rangle$, of order $|G|/m$ which $p$ still divides. By induction, $G/\langle a \rangle$ has an element $\bar{b}$ of order $p$. Let $k = |b|$. Then $p \mid k$ (since $\bar{b}^k = \bar{e}$ requires $p \mid k$). So $b^{k/p}$ has order $p$. $\blacksquare$

**Generalization.** Cauchy's theorem holds in all finite groups, not just abelian. The general proof is more subtle (due to McKay, 1959), using the class equation with the action of $\mathbb{Z}_p$ on $p$-tuples.

### Theorem 16.16 (Cauchy's theorem — general)

> **Theorem 16.16 (Cauchy).** Let $G$ be a finite group and $p$ a prime dividing $|G|$. Then $G$ has an element of order $p$.

*Proof (McKay).* Let $X = \{(g_1, g_2, \ldots, g_p) \in G^p : g_1 g_2 \cdots g_p = e\}$. $|X| = |G|^{p-1}$ (choose the first $p-1$ freely; the last is determined).

Define a $\mathbb{Z}_p$-action on $X$: cyclic rotation $(g_1, \ldots, g_p) \to (g_2, \ldots, g_p, g_1)$. This preserves $X$ because $g_1(g_2 \cdots g_p) = e \iff (g_2 \cdots g_p)g_1 = e$ (conjugating by $g_1$ preserves $e$).

By orbit-stabilizer, orbits have size 1 or $p$.

Size-1 orbits: $(g, g, \ldots, g)$ with $g^p = e$. These are elements of order dividing $p$, i.e.\ order 1 or $p$.

$|X| \equiv |\text{fixed points}| \pmod p$, so $|G|^{p-1} \equiv |\{g : g^p = e\}| \pmod p$. LHS $\equiv 0$ (since $p \mid |G|$). So RHS $\equiv 0 \pmod p$, meaning $|\{g : g^p = e\}|$ is divisible by $p$. It includes $e$ (as one element) and must be at least $p$, so there's at least one $g \neq e$ with $g^p = e$, i.e., order $p$. $\blacksquare$

## 16.7 Sylow's Theorems (Preview, No Proof)

Building on Cauchy, Sylow gives a spectacular refinement:

> **Theorem 16.17 (Sylow, statement).** Let $|G| = p^k m$ with $\gcd(p, m) = 1$.
>
> 1. **Existence.** $G$ has a subgroup of order $p^k$, called a **Sylow $p$-subgroup**.
> 2. **Conjugacy.** Any two Sylow $p$-subgroups are conjugate.
> 3. **Number.** The number $n_p$ of Sylow $p$-subgroups divides $m$ and is $\equiv 1 \pmod p$.

The Sylow theorems are one of the most powerful tools for classifying finite groups of small order. They are standard advanced undergraduate material and lie just beyond the scope of this course; the careful student should keep them in mind.

## 16.8 Practice Problems

**Problem 1.** Find $C_G(a)$ in $G = S_4$ for $a = (1\,2\,3)$.

**Problem 2.** Find the center of $S_4$.

**Problem 3.** State and verify the class equation for $S_4$.

**Problem 4.** In $D_6$, compute $C_G(r)$ and $C_G(s)$.

**Problem 5.** Let $p$ be prime. Show that if $|G| = 2p$ with $p$ odd, then $|Z(G)| = 1$ (if $G$ is non-abelian).

**Problem 6.** Use the class equation to show that no group of order $pq$ (distinct primes, $p < q$) has trivial center... wait, actually groups of order $pq$ can have trivial center (like $S_3 = Z_2 \cdot Z_3$). Re-word: Use the class equation to show that a group of order $p^3$ has $|Z(G)| \in \{p, p^3\}$.

**Problem 7.** Let $G$ be a non-abelian group of order $p^3$ ($p$ prime). Show that $G/Z(G) \cong \mathbb{Z}_p \times \mathbb{Z}_p$.

### Solutions

**1.** $(1\,2\,3)$ has cycle type $3 + 1$ in $S_4$. Conjugacy class is all 3-cycles in $S_4$: there are $2 \binom{4}{3} = 8$ of them. So $|C_{S_4}((1\,2\,3))| = 24/8 = 3$. Explicitly: $C_{S_4}((1\,2\,3)) = \{e, (1\,2\,3), (1\,3\,2)\}$. $\boxed{\text{Order 3}}$

**2.** $Z(S_4) = \{e\}$. Proof: any $\sigma \in Z(S_4)$ must commute with all transpositions. If $\sigma \neq e$, pick $i$ with $\sigma(i) = j \neq i$. Then $\sigma(j\,k)\sigma^{-1} = (\sigma(j)\,\sigma(k))$ for $k \neq i, j$. For commutation, need $\sigma(j\,k)\sigma^{-1} = (j\,k)$, i.e., $\{\sigma(j), \sigma(k)\} = \{j, k\}$. But $\sigma(j)$ can vary as $k$ varies — contradiction. So $\sigma = e$. $\blacksquare$

**3.** $S_4$ conjugacy classes by cycle type:
- $e$ (size 1)
- transpositions $(a\,b)$: $\binom{4}{2} = 6$
- 3-cycles $(a\,b\,c)$: $\binom{4}{3} \cdot 2 = 8$
- 4-cycles $(a\,b\,c\,d)$: $3! = 6$
- double transpositions $(a\,b)(c\,d)$: $\frac{1}{2}\binom{4}{2} = 3$

Sum: $1 + 6 + 8 + 6 + 3 = 24$ ✓.

Class equation: $|S_4| = 1 + 6 + 8 + 6 + 3$. $Z(S_4) = \{e\}$ (one singleton). Non-singleton contributions: $6 + 8 + 6 + 3$.

Hence $|S_4| = |Z(S_4)| + 6 + 8 + 6 + 3 = 1 + 23 = 24$ ✓. $\boxed{}$

**4.** $D_6 = \langle r, s \mid r^6 = s^2 = e, srs = r^{-1} \rangle$.

$C_{D_6}(r) = \langle r \rangle$ — rotations commute with $r$, but $r^i s \cdot r = r^i s r$ and $r \cdot r^i s = r^{i+1} s$, equal iff $s r = r s$, i.e., $r = r^{-1}$, i.e., $r^2 = e$. Not true. So reflections don't commute with $r$. $|C_{D_6}(r)| = 6$.

$C_{D_6}(s) = \{g : gs = sg\}$: $r^k s = s r^k$ iff $r^k = r^{-k}$ iff $r^{2k} = e$ iff $k \in \{0, 3\}$. So rotations commuting with $s$: $\{e, r^3\}$. Reflections commuting with $s$: $r^k s \cdot s = r^k$, $s \cdot r^k s = s r^k s = r^{-k}$. Equal iff $k = -k \pmod 6$, i.e., $k \in \{0, 3\}$. So reflections: $\{s, r^3 s\}$. Total $C_{D_6}(s) = \{e, r^3, s, r^3 s\}$ of order 4. $\boxed{|C(r)| = 6,\ |C(s)| = 4}$

**5.** $|G| = 2p$, $p$ odd prime, $G$ non-abelian. Class equation: $|Z(G)|$ divides $2p$, so $|Z(G)| \in \{1, 2, p, 2p\}$. If $|Z(G)| = 2p$, $G$ abelian (contradiction). If $|Z(G)| = p$, then $|G/Z(G)| = 2$ cyclic $\Rightarrow G$ abelian (contradiction). If $|Z(G)| = 2$, then $|G/Z(G)| = p$ cyclic $\Rightarrow G$ abelian (contradiction). So $|Z(G)| = 1$. $\blacksquare$

**6.** $|G| = p^3$. By Theorem 16.13, $|Z(G)| > 1$, so $|Z(G)| \in \{p, p^2, p^3\}$. If $|Z(G)| = p^2$, then $|G/Z(G)| = p$ cyclic $\Rightarrow G$ abelian $\Rightarrow Z(G) = G$, contradiction. So $|Z(G)| \in \{p, p^3\}$. $\blacksquare$

**7.** $G$ non-abelian, $|G| = p^3$. By Problem 6, $|Z(G)| = p$. So $|G/Z(G)| = p^2$. By Corollary 16.14, $G/Z(G)$ is abelian of order $p^2$: either $\mathbb{Z}_{p^2}$ (cyclic) or $\mathbb{Z}_p \times \mathbb{Z}_p$.

If $G/Z(G) \cong \mathbb{Z}_{p^2}$ cyclic, $G$ abelian (contradiction). So $G/Z(G) \cong \mathbb{Z}_p \times \mathbb{Z}_p$. $\blacksquare$

## Related Concepts

- [[15-group-actions]] — foundational framework for orbits/stabilizers
- [[17-homomorphisms-and-isomorphisms]] — kernel/image interplay with centralizers
- [[10-normal-subgroups-and-quotient-groups]] — quotients like $G/Z(G)$

---

*Last updated: 2026-04-18*
