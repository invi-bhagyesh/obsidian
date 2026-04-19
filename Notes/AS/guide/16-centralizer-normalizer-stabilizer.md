---
title: "Centralizer, Normalizer, Stabilizer, and Class Equation"
type: guide
co: CO3
related: [15-group-actions, 17-homomorphisms-and-isomorphisms, 10-normal-subgroups-and-quotient-groups]
---

# 16. Centralizer, Normalizer, Stabilizer, and the Class Equation

This chapter develops three subgroups associated to elements and subsets of a group — **centralizers**, **normalizers**, and **stabilizers** — and uses them in conjunction with the **class equation** to extract deep structural information about finite groups. The class equation is the workhorse behind Cauchy's theorem, the Sylow theorems (previewed here), and the landmark theorem that $p$-groups have non-trivial center (from which the classification of groups of order $p^2$ falls out immediately).

Most of this material follows directly from [[15-group-actions]] by specializing to the **conjugation action** $g \cdot x = gxg^{-1}$. The three subgroups of this chapter are each a stabilizer for some natural conjugation action:

- $C_G(a)$ is the stabilizer of $a$ under $G$ acting on itself by conjugation.
- $N_G(S)$ is the stabilizer of $S$ under $G$ acting on $\mathcal{P}(G)$ by conjugation.
- $Z(G)$ is the (global) fixed point set — elements fixed by every $g \in G$.

Keeping this viewpoint in mind unifies the chapter: every theorem below is, in some form, an orbit-stabilizer statement applied to conjugation.

## 16.1 Centralizer

> **Definition 16.1 (Centralizer of an element).** For $a \in G$, the **centralizer** of $a$ in $G$ is
> $$C_G(a) = \{g \in G : ga = ag\}.$$

Equivalently, $C_G(a) = \{g \in G : gag^{-1} = a\}$, i.e., the set of group elements that fix $a$ under conjugation.

> **Definition 16.2 (Centralizer of a subset).** For $S \subseteq G$, the **centralizer** of $S$ is
> $$C_G(S) = \{g \in G : gs = sg \text{ for all } s \in S\} = \bigcap_{s \in S} C_G(s).$$

**Remark.** When $S = \{a\}$, $C_G(S) = C_G(a)$. When $S = G$, $C_G(S) = Z(G)$, the center. Centralizers can be thought of as a generalisation of the center to arbitrary subsets.

> **Proposition 16.3.** For every $a \in G$, the centralizer $C_G(a)$ is a subgroup of $G$. More generally, for every $S \subseteq G$, $C_G(S) \le G$.

*Proof.* We verify the subgroup axioms directly. It suffices to prove the element version (Def. 16.1); for the subset version take the intersection $\bigcap_{s \in S} C_G(s)$, which is a subgroup because arbitrary intersections of subgroups are subgroups.

1. **Identity.** $ea = a = ae$ trivially, so $e \in C_G(a)$. In particular $C_G(a) \neq \emptyset$.
2. **Closure.** Let $g, h \in C_G(a)$, so $ga = ag$ and $ha = ah$. Then
   $$(gh)a = g(ha) = g(ah) = (ga)h = (ag)h = a(gh),$$
   so $gh \in C_G(a)$.
3. **Inverses.** Let $g \in C_G(a)$, so $ga = ag$. Multiply on both sides by $g^{-1}$: $g^{-1}(ga)g^{-1} = g^{-1}(ag)g^{-1}$, giving $ag^{-1} = g^{-1}a$. Hence $g^{-1} \in C_G(a)$.

All three axioms hold, so $C_G(a) \le G$. $\blacksquare$

*Alternative proof via group actions.* $G$ acts on itself by conjugation: $g \cdot x = gxg^{-1}$. The stabilizer of $a$ is exactly $\{g : gag^{-1} = a\} = C_G(a)$. Stabilizers are always subgroups ([[15-group-actions]]), so $C_G(a) \le G$ automatically. This is a clean one-line proof once the machinery of group actions is in place.

> **Proposition 16.4 (Orbit-stabilizer for conjugation).** For any $a \in G$,
> $$|\operatorname{cl}(a)| = [G : C_G(a)] = \frac{|G|}{|C_G(a)|},$$
> where $\operatorname{cl}(a) = \{gag^{-1} : g \in G\}$ is the conjugacy class of $a$.

*Proof.* The orbit of $a$ under the conjugation action $G \curvearrowright G$ is exactly the conjugacy class $\operatorname{cl}(a)$. The stabilizer is $C_G(a)$. The orbit-stabilizer theorem gives
$$|\operatorname{cl}(a)| = [G : \operatorname{Stab}_G(a)] = [G : C_G(a)] = \frac{|G|}{|C_G(a)|},$$
where the final equality uses Lagrange's theorem (which requires $|G| < \infty$ if we want numerical cardinalities, though the index formula holds generally). $\blacksquare$

**Remark (Counting consequence).** In particular, $|\operatorname{cl}(a)|$ **divides** $|G|$. This is a strong restriction: conjugacy classes are never of arbitrary size — they always divide the group order.

**Worked Example 1.** Compute $C_{S_3}((1\,2))$.

*Setup.* $S_3 = \{e, (1\,2), (1\,3), (2\,3), (1\,2\,3), (1\,3\,2)\}$, $|S_3| = 6$. We want all $\sigma$ with $\sigma(1\,2) = (1\,2)\sigma$.

*Strategy.* Check each of the $6$ elements directly. Alternatively, use the conjugation formula $\sigma(1\,2)\sigma^{-1} = (\sigma(1)\,\sigma(2))$ and demand this equal $(1\,2)$, i.e., $\{\sigma(1), \sigma(2)\} = \{1, 2\}$ as unordered pairs. This means $\sigma$ either fixes both $1$ and $2$ (and permutes $\{3\}$ trivially), or swaps $1, 2$.

*Computation.*
- $\sigma = e$: $e(1\,2) = (1\,2) = (1\,2)e$. ✓
- $\sigma = (1\,2)$: trivially commutes with itself. ✓
- $\sigma = (1\,3)$: $(1\,3)(1\,2) = (1\,3\,2)$ whereas $(1\,2)(1\,3) = (1\,2\,3)$. Not equal. ✗
- $\sigma = (2\,3)$: $(2\,3)(1\,2) = (1\,2\,3)$ whereas $(1\,2)(2\,3) = (1\,3\,2)$. Not equal. ✗
- $\sigma = (1\,2\,3)$: $(1\,2\,3)(1\,2)$: apply right-to-left. $(1\,2)$ sends $1\to 2, 2\to 1, 3\to 3$; then $(1\,2\,3)$ sends $1\to 2, 2\to 3, 3\to 1$. Composition: $1\to 2\to 3$, $2\to 1\to 2$, $3\to 3\to 1$. So $(1\,2\,3)(1\,2) = (1\,3)$. Meanwhile $(1\,2)(1\,2\,3)$: $(1\,2\,3)$ sends $1\to 2, 2\to 3, 3\to 1$; then $(1\,2)$ swaps $1, 2$. Composition: $1\to 2\to 1$, $2\to 3\to 3$, $3\to 1\to 2$. So $(1\,2)(1\,2\,3) = (2\,3)$. Not equal. ✗
- $\sigma = (1\,3\,2)$: similar to above. ✗

Hence $C_{S_3}((1\,2)) = \{e, (1\,2)\}$, a subgroup of order $2$.

*Verification (Orbit-stabilizer).* $|\operatorname{cl}((1\,2))| = |S_3|/|C_{S_3}((1\,2))| = 6/2 = 3$. Indeed, the conjugates of $(1\,2)$ in $S_3$ are $(1\,2), (1\,3), (2\,3)$ — all transpositions, three in number. ✓

*Interpretation.* $C_{S_3}((1\,2)) = \langle (1\,2)\rangle$. The transposition's centralizer is the cyclic subgroup it generates, and nothing larger. This is typical in $S_n$: for "most" elements, the centralizer is barely larger than the cyclic subgroup generated by the element.

**Example 2.** For any $a \in G$, $\langle a\rangle \le C_G(a)$.

*Proof.* Powers of $a$ commute with $a$: for any $k \in \mathbb{Z}$, $a^k \cdot a = a^{k+1} = a \cdot a^k$. Hence every element of $\langle a\rangle = \{a^k : k \in \mathbb{Z}\}$ lies in $C_G(a)$. $\blacksquare$

*Remark.* This is why the centralizer is always **at least as big** as $|a|$: $|C_G(a)| \ge |\langle a\rangle| = |a|$. In particular, $|\operatorname{cl}(a)| = |G|/|C_G(a)| \le |G|/|a|$.

## 16.2 Normalizer

> **Definition 16.5 (Normalizer of a subset).** For $S \subseteq G$, the **normalizer** is
> $$N_G(S) = \{g \in G : gSg^{-1} = S\}.$$

**Caution.** The equality $gSg^{-1} = S$ is of **sets**. The elements of $S$ may be permuted among themselves by the conjugation $x \mapsto gxg^{-1}$; we do not require elementwise fixing. In particular, $N_G(S) \supseteq C_G(S)$ (any $g$ that fixes every $s$ certainly preserves $S$), and this containment is often strict.

*Example distinguishing $C$ and $N$.* Let $G = S_3, S = \{(1\,2)\}$. Then $C_G(S) = C_G((1\,2)) = \{e, (1\,2)\}$ (computed above). And $N_G(S) = \{g : g\{(1\,2)\}g^{-1} = \{(1\,2)\}\} = \{g : g(1\,2)g^{-1} = (1\,2)\} = C_G((1\,2))$. Here the two coincide because $S$ has only one element. But for $S = \langle (1\,2)\rangle = \{e, (1\,2)\}$, $g$ can send $e \mapsto e$ (forced) and $(1\,2) \mapsto (1\,2)$, which still gives the same set; so $N_G(\langle (1\,2)\rangle) = \{g : g(1\,2)g^{-1} \in \{e, (1\,2)\}\}$ = $\{g : g(1\,2)g^{-1} = (1\,2)\} = C_G((1\,2))$, same thing. (For this small example $C = N$; larger examples will differ.)

> **Proposition 16.6.** $N_G(S)$ is a subgroup of $G$. Moreover, if $S = H$ is itself a subgroup of $G$, then $N_G(H)$ is the **largest** subgroup of $G$ in which $H$ is normal.

*Proof.*

**(Step 1) $N_G(S) \le G$.**

1. *Identity:* $eSe^{-1} = S$, so $e \in N_G(S)$.
2. *Closure:* If $g, h \in N_G(S)$, then $gSg^{-1} = S$ and $hSh^{-1} = S$. So $(gh)S(gh)^{-1} = g(hSh^{-1})g^{-1} = gSg^{-1} = S$. Hence $gh \in N_G(S)$.
3. *Inverses:* If $g \in N_G(S)$, then $gSg^{-1} = S$. Multiplying both sides by $g^{-1}$ on the left and $g$ on the right: $S = g^{-1}Sg = g^{-1}S(g^{-1})^{-1}$. So $g^{-1} \in N_G(S)$.

**(Step 2) $H \trianglelefteq K$ iff $K \le N_G(H)$ (assuming $H \le K \le G$).** By definition of normality, $H \trianglelefteq K$ means $kHk^{-1} = H$ for all $k \in K$, i.e., $K \subseteq N_G(H)$, i.e., $K \le N_G(H)$ (since $K$ is already a subgroup).

**(Step 3) Largest property.** Taking $K = N_G(H)$ itself in Step 2: we have $H \le N_G(H)$ (because $H \le N_G(H)$: every $h \in H$ conjugates $H$ to itself since $hHh^{-1} = H$ by closure), and $H \trianglelefteq N_G(H)$. So $N_G(H)$ contains $H$ as a normal subgroup. Any larger subgroup $K > N_G(H)$ contains an element $k \notin N_G(H)$, for which $kHk^{-1} \neq H$ — so $H$ is not normal in $K$. Hence $N_G(H)$ is the maximal such subgroup. $\blacksquare$

> **Corollary 16.7.** $H \trianglelefteq G$ iff $N_G(H) = G$.

*Proof.* "$H \trianglelefteq G$" means $gHg^{-1} = H$ for all $g \in G$, i.e., $G \subseteq N_G(H)$. Since always $N_G(H) \subseteq G$, this is equivalent to $N_G(H) = G$. $\blacksquare$

**Relationship to the conjugation action on subgroups.** $G$ acts on the set $\mathcal{S}$ of all subgroups of $G$ by conjugation: $g \cdot H = gHg^{-1}$. The stabilizer of $H$ under this action is exactly
$$\operatorname{Stab}_G(H) = \{g : gHg^{-1} = H\} = N_G(H).$$
Orbit-stabilizer applied to this action yields the next proposition.

> **Proposition 16.8 (Number of conjugates of a subgroup).** The number of distinct conjugates of a subgroup $H$ in $G$ is
> $$|\{gHg^{-1} : g \in G\}| = [G : N_G(H)].$$

*Proof.* The orbit of $H$ under the conjugation action on subgroups is $\{gHg^{-1} : g \in G\}$; its stabilizer is $N_G(H)$. By orbit-stabilizer, the orbit has size $[G : N_G(H)]$. $\blacksquare$

**Worked Example 3.** In $S_3$, compute $N_{S_3}(\langle (1\,2)\rangle)$.

*Setup.* $H = \langle (1\,2)\rangle = \{e, (1\,2)\}$. We want $N_{S_3}(H) = \{\sigma : \sigma H \sigma^{-1} = H\}$.

*Strategy.* Compute the number of conjugates of $H$, then apply $|\text{orbit}| \cdot |\text{stab}| = |G|$.

*Computation.* Conjugates of $H$ by elements of $S_3$: $gHg^{-1} = \{e, g(1\,2)g^{-1}\}$. By the conjugation formula, $g(1\,2)g^{-1} = (g(1)\,g(2))$, a transposition. Which transpositions appear?

- $g = e$: $(1\,2)$.
- $g = (1\,2)$: $(1\,2)$.
- $g = (1\,3)$: $((1\,3)(1), (1\,3)(2)) = (3, 2) = (2\,3)$.
- $g = (2\,3)$: $((2\,3)(1), (2\,3)(2)) = (1, 3) = (1\,3)$.
- $g = (1\,2\,3)$: $((1\,2\,3)(1), (1\,2\,3)(2)) = (2, 3) = (2\,3)$.
- $g = (1\,3\,2)$: $((1\,3\,2)(1), (1\,3\,2)(2)) = (3, 1) = (1\,3)$.

So the conjugates of $H$ are $\{\langle (1\,2)\rangle, \langle (1\,3)\rangle, \langle (2\,3)\rangle\}$ — **three** distinct conjugates.

*Applying Proposition 16.8.* $[S_3 : N_{S_3}(H)] = 3$, so $|N_{S_3}(H)| = 6/3 = 2$. Since $H \le N_{S_3}(H)$ and $|H| = 2 = |N_{S_3}(H)|$, we conclude $N_{S_3}(H) = H = \{e, (1\,2)\}$.

*Interpretation.* The subgroup $\langle (1\,2)\rangle$ is "self-normalizing" in $S_3$: no element outside $H$ stabilizes $H$ under conjugation. Equivalently, $H$ has $[S_3 : H] = 3$ conjugates, which is the maximum possible. Contrast this with a normal subgroup, which has only one conjugate (itself).

## 16.3 Relationship: $C_G(a) \le N_G(\langle a\rangle)$

> **Proposition 16.9.** For every $a \in G$, $C_G(a) \le N_G(\langle a\rangle)$.

*Proof.* Let $g \in C_G(a)$. Then $ga = ag$, equivalently $gag^{-1} = a$. We must show $g\langle a\rangle g^{-1} = \langle a\rangle$ as sets. Compute:
$$g\langle a\rangle g^{-1} = \{ga^k g^{-1} : k \in \mathbb{Z}\}.$$
Now $ga^k g^{-1} = (gag^{-1})^k = a^k$ (using $gag^{-1} = a$ and induction on $k$). So $g\langle a\rangle g^{-1} = \{a^k : k \in \mathbb{Z}\} = \langle a\rangle$. Hence $g \in N_G(\langle a\rangle)$. $\blacksquare$

**Strict containment example.** The inclusion $C_G(a) \subsetneq N_G(\langle a\rangle)$ can be strict: $g$ may permute the powers of $a$ (sending $a \mapsto a^{-1}$, say) without fixing $a$.

*Concrete example.* Let $G = D_4 = \langle r, s \mid r^4 = s^2 = e, srs = r^{-1}\rangle$, $a = r$. Then:
- $C_{D_4}(r) = ?$ Rotations commute with $r$: $\{e, r, r^2, r^3\}$. Reflections: $sr \cdot r = sr^2$ vs $r \cdot sr = rsr = sr^{-1}r = s \neq sr^2$ in general. So reflections do not commute with $r$. Hence $C_{D_4}(r) = \langle r\rangle$.
- $N_{D_4}(\langle r\rangle) = D_4$ (since $\langle r\rangle$ is an index-$2$ subgroup, hence normal, hence its normalizer is everything).
- Strict containment: $\langle r\rangle \subsetneq D_4$.

Geometrically: reflections send the rotation subgroup to itself (flipping rotations to their inverses), hence normalize it, but do not commute with individual rotations.

**Abelian case.** In abelian $G$, every element is central: $C_G(a) = G$ and $N_G(\langle a\rangle) = G$, so trivially $C_G(a) = N_G(\langle a\rangle) = G$.

## 16.4 Center $Z(G)$ Revisited

> **Definition 16.10.** $Z(G) = \{g \in G : gh = hg \text{ for all } h \in G\} = C_G(G)$.

**Equivalent characterizations.**
- $Z(G) = \bigcap_{h \in G} C_G(h)$ (centralizers of all elements).
- $Z(G) = \{g \in G : \operatorname{cl}(g) = \{g\}\}$ (elements with singleton conjugacy class). Indeed, $|\operatorname{cl}(g)| = 1$ iff $hgh^{-1} = g$ for all $h$ iff $hg = gh$ for all $h$ iff $g \in Z(G)$.
- $Z(G) = \operatorname{Fix}(G \curvearrowright G)$ under conjugation — the set of global fixed points.

> **Proposition 16.11.** $Z(G) \trianglelefteq G$.

*Proof.* $Z(G)$ is a subgroup by Prop. 16.3 ($C_G$ of any set is a subgroup). For normality: if $z \in Z(G)$ and $g \in G$, then $gzg^{-1} = zgg^{-1} = z \in Z(G)$ (using $gz = zg$). Hence $gZ(G)g^{-1} \subseteq Z(G)$; since this holds for all $g$ (including $g^{-1}$), $gZ(G)g^{-1} = Z(G)$. $\blacksquare$

*Remark.* $Z(G)$ is in fact a **characteristic subgroup**: it is preserved by every automorphism of $G$. This is a strictly stronger property than normality.

## 16.5 The Class Equation

> **Theorem 16.12 (Class Equation).** Let $G$ be a finite group. Then
> $$|G| = |Z(G)| + \sum_{i=1}^k [G : C_G(a_i)],$$
> where $a_1, \ldots, a_k$ are representatives of the distinct non-singleton (equivalently, non-central) conjugacy classes of $G$.

*Proof.* The conjugation action $G \curvearrowright G$ partitions $G$ into disjoint orbits (conjugacy classes). Hence
$$|G| = \sum_{\text{classes } C} |C|.$$

Split this sum according to whether $|C| = 1$ or $|C| > 1$:

**Singleton classes.** $|C| = 1$ means $C = \{a\}$ with $gag^{-1} = a$ for all $g$, i.e., $a \in Z(G)$. Conversely every $a \in Z(G)$ satisfies $\operatorname{cl}(a) = \{a\}$. So singleton classes are exactly $\{\{z\} : z \in Z(G)\}$, contributing $\sum_{z \in Z(G)} 1 = |Z(G)|$.

**Non-singleton classes.** Pick representatives $a_1, \ldots, a_k$. By orbit-stabilizer (Prop. 16.4), $|\operatorname{cl}(a_i)| = [G : C_G(a_i)]$. Their contribution is $\sum_i [G : C_G(a_i)]$.

Adding:
$$|G| = |Z(G)| + \sum_{i=1}^k [G : C_G(a_i)]. \qquad \blacksquare$$

**Important arithmetic features.**
1. Each summand $[G : C_G(a_i)]$ **divides** $|G|$ (Lagrange).
2. Each summand $[G : C_G(a_i)] > 1$ (because $a_i$ is non-central, so $C_G(a_i) \neq G$).
3. Therefore, the non-trivial part of the class equation is a sum of proper divisors of $|G|$, all exceeding $1$.

**Worked Example 4 (Class equation of $S_3$).**

*Setup.* $|S_3| = 6$. Enumerate conjugacy classes by cycle type.

*Computation.*
- Cycle type $1+1+1$ (identity): $\{e\}$, size $1$. Central.
- Cycle type $2+1$ (transpositions): $(1\,2), (1\,3), (2\,3)$, size $3$. Non-central; representative $(1\,2)$.
- Cycle type $3$ (3-cycles): $(1\,2\,3), (1\,3\,2)$, size $2$. Non-central; representative $(1\,2\,3)$.

*Centralizers.* $|C_{S_3}((1\,2))| = 6/3 = 2$ ✓ (matches Example 1). $|C_{S_3}((1\,2\,3))| = 6/2 = 3$; indeed $C_{S_3}((1\,2\,3)) = \langle (1\,2\,3)\rangle = \{e, (1\,2\,3), (1\,3\,2)\}$.

*Center.* $Z(S_3) = \{e\}$ (only the identity has a singleton class).

*Class equation.* $|S_3| = 6 = \underbrace{1}_{|Z|} + \underbrace{3}_{\operatorname{cl}((1\,2))} + \underbrace{2}_{\operatorname{cl}((1\,2\,3))}$. ✓

*Interpretation.* Every non-identity element of $S_3$ has a non-singleton conjugacy class, consistent with $Z(S_3) = \{e\}$.

**Worked Example 5 (Class equation of $D_4$).**

*Setup.* $D_4 = \langle r, s \mid r^4 = s^2 = e, srs = r^{-1}\rangle$, $|D_4| = 8$. Elements: $\{e, r, r^2, r^3, s, rs, r^2 s, r^3 s\}$.

*Computation of conjugacy classes.* Use the dihedral identity $srs^{-1} = r^{-1}$ and its consequences.

- $\{e\}$: singleton, central.
- $r^2$: $sr^2 s^{-1} = (srs^{-1})^2 = r^{-2} = r^2$ (since $r^4 = e$); also $rr^2 r^{-1} = r^2$. So $r^2$ commutes with both $r$ and $s$, hence with all of $D_4$. Singleton class $\{r^2\}$, central.
- $r, r^3$: conjugating $r$ by $s$ gives $r^{-1} = r^3$. So $\operatorname{cl}(r) = \{r, r^3\}$, size $2$.
- $s, r^2 s$: conjugate $s$ by $r$: $rsr^{-1} = (rs)r^{-1} = s r^{-1} r^{-1} = sr^{-2} = r^2 s$ (using $sr^{-1} = rs$, so $rs \cdot r^{-1} = r \cdot (sr^{-1}) = r \cdot rs = r^2 s$). So $\operatorname{cl}(s) = \{s, r^2 s\}$, size $2$.
- $rs, r^3 s$: conjugate $rs$ by $r$: $r(rs)r^{-1} = r^2 s r^{-1} = r^2 \cdot r s = r^3 s$ (same method). So $\operatorname{cl}(rs) = \{rs, r^3 s\}$, size $2$.

*Center.* Singleton classes give $Z(D_4) = \{e, r^2\}$, order $2$.

*Class equation.* $|D_4| = 8 = \underbrace{2}_{|Z|} + \underbrace{2}_{\operatorname{cl}(r)} + \underbrace{2}_{\operatorname{cl}(s)} + \underbrace{2}_{\operatorname{cl}(rs)}$. ✓

*Centralizers.* Each of $r, s, rs$ has $|\operatorname{cl}| = 2$, so $|C_{D_4}| = 8/2 = 4$ for each.
- $C_{D_4}(r) = \langle r\rangle = \{e, r, r^2, r^3\}$ (the rotation subgroup).
- $C_{D_4}(s) = \{e, r^2, s, r^2 s\}$ (the Klein four-group; verify: all four commute pairwise with $s$).
- $C_{D_4}(rs) = \{e, r^2, rs, r^3 s\}$ (another Klein four-group).

*Interpretation.* $D_4$ has three "types" of non-central elements (rotations $r, r^3$; reflections through vertices $s, r^2 s$; reflections through edge midpoints $rs, r^3 s$), each contributing a class of size $2$. The center is $\{e, r^2\}$: $r^2$ is the unique "half-turn" which commutes with every symmetry.

## 16.6 Consequences of the Class Equation

### Theorem 16.13 ($p$-groups have non-trivial center)

> **Theorem 16.13.** If $|G| = p^n$ for some prime $p$ and integer $n \ge 1$, then $Z(G) \neq \{e\}$. In fact, $p \mid |Z(G)|$, so $|Z(G)| \ge p$.

*Proof.* We apply the class equation
$$|G| = |Z(G)| + \sum_{i=1}^k [G : C_G(a_i)],$$
and analyze divisibility by $p$.

**(Step 1) Each term $[G : C_G(a_i)]$ is divisible by $p$.**

Since $a_i$ is non-central, $C_G(a_i) \subsetneq G$, so $[G : C_G(a_i)] > 1$. By Lagrange, $[G : C_G(a_i)]$ divides $|G| = p^n$. The divisors of $p^n$ exceeding $1$ are $p, p^2, \ldots, p^n$, each divisible by $p$.

**(Step 2) Reduce the class equation mod $p$.**

$|G| = p^n$ is divisible by $p$ (since $n \ge 1$). Each $[G : C_G(a_i)]$ is divisible by $p$ (Step 1). Reducing the class equation modulo $p$:
$$0 \equiv |Z(G)| + 0 + 0 + \cdots \pmod p,$$
i.e., $|Z(G)| \equiv 0 \pmod p$, so $p \mid |Z(G)|$.

**(Step 3) Conclude $|Z(G)| \ge p$.**

$|Z(G)| \ge 1$ (contains $e$). Since $p \mid |Z(G)|$, $|Z(G)|$ is a positive multiple of $p$, so $|Z(G)| \ge p > 1$.

Hence $Z(G) \ne \{e\}$. $\blacksquare$

**Remark.** This is a surprising result: having order a prime power *forces* the existence of non-trivial central elements. Contrast with, say, $|G| = 6 = 2 \cdot 3$ where $S_3$ has trivial center.

**Remark (stronger versions).** The same argument shows that $p$-groups are solvable and nilpotent (standard consequences). In fact, for each $n \ge 1$ there are examples of $p$-groups with $|Z(G)|$ as small as $p$ (e.g., $D_4$ has $|Z| = 2$).

> **Corollary 16.14.** Every group of order $p^2$ is abelian. Moreover, up to isomorphism, the only such groups are $\mathbb{Z}_{p^2}$ and $\mathbb{Z}_p \times \mathbb{Z}_p$.

*Proof.* Let $|G| = p^2$.

**(Step 1) $|Z(G)| \in \{p, p^2\}$.**

By Lagrange, $|Z(G)| \mid |G| = p^2$, so $|Z(G)| \in \{1, p, p^2\}$. By Theorem 16.13, $|Z(G)| \ge p$, so $|Z(G)| \in \{p, p^2\}$.

**(Step 2) The case $|Z(G)| = p$ leads to a contradiction.**

Suppose $|Z(G)| = p$. Then $|G/Z(G)| = p^2/p = p$. A group of prime order is cyclic (generated by any non-identity element). Hence $G/Z(G)$ is cyclic.

*Sublemma ($G/Z(G)$ cyclic $\Rightarrow G$ abelian).* Let $Z = Z(G)$ and suppose $G/Z = \langle gZ\rangle$ for some $g \in G$. Every element of $G$ can be written as $g^k z$ for some $k \in \mathbb{Z}, z \in Z$ (choose a representative $g^k$ for the coset $g^k Z$, then write the element as $g^k \cdot z$). For $a = g^{k_1} z_1, b = g^{k_2} z_2$ in $G$:
$$ab = g^{k_1} z_1 g^{k_2} z_2 \stackrel{(i)}{=} g^{k_1} g^{k_2} z_1 z_2 \stackrel{(ii)}{=} g^{k_1 + k_2} z_1 z_2,$$
where (i) uses $z_1 \in Z$ commuting with $g^{k_2}$, and (ii) uses power laws in $G$. Similarly $ba = g^{k_2 + k_1} z_2 z_1 = g^{k_1 + k_2} z_1 z_2$ (using $z_1 z_2 = z_2 z_1$ in $Z$, which is abelian). Hence $ab = ba$, so $G$ is abelian.

Applying the sublemma: if $|Z(G)| = p$, then $G/Z(G)$ cyclic forces $G$ abelian, so $Z(G) = G$, contradicting $|Z(G)| = p < p^2$.

**(Step 3) Conclude $|Z(G)| = p^2$.**

The only remaining option is $|Z(G)| = p^2 = |G|$, so $Z(G) = G$, i.e., $G$ is abelian.

**(Step 4) Classification.**

$G$ abelian of order $p^2$. If $G$ contains an element of order $p^2$, $G$ is cyclic: $G \cong \mathbb{Z}_{p^2}$. Otherwise every non-identity element has order $p$ (orders divide $p^2$ and are not $p^2$). Pick $a \ne e$, and $b \notin \langle a\rangle$ (possible since $|\langle a\rangle| = p < p^2$). Both $a, b$ have order $p$, and $\langle a\rangle \cap \langle b\rangle = \{e\}$ (the intersection is a subgroup of $\langle a\rangle$ of order $< p$, hence trivial). Then $\langle a\rangle \langle b\rangle$ has order $p \cdot p = p^2 = |G|$, so $G = \langle a\rangle \times \langle b\rangle \cong \mathbb{Z}_p \times \mathbb{Z}_p$.

Hence $G \cong \mathbb{Z}_{p^2}$ or $\mathbb{Z}_p \times \mathbb{Z}_p$. $\blacksquare$

**Remark.** These two groups are non-isomorphic: $\mathbb{Z}_{p^2}$ has an element of order $p^2$; $\mathbb{Z}_p \times \mathbb{Z}_p$ does not. (All elements in the latter have order dividing $p$.)

### Theorem 16.15 (Cauchy's theorem — abelian case)

> **Theorem 16.15 (Cauchy, abelian case).** Let $G$ be a finite abelian group and $p$ a prime dividing $|G|$. Then $G$ has an element of order $p$.

*Proof by strong induction on $|G|$.*

**Base case: $|G| = p$.** $G$ is cyclic of order $p$ (every group of prime order is cyclic). Any generator has order $p$.

**Inductive step.** Assume the result for all abelian groups of order $< |G|$. Let $G$ be abelian with $p \mid |G|$, $|G| > p$.

**Case 1:** $G$ has an element $a \ne e$ with $p \mid |a|$. Write $|a| = pm$. Then $a^m$ has order $pm/\gcd(pm, m) = p$ (since $\gcd(pm, m) = m$). Done.

More carefully: $|a^m| = |a|/\gcd(|a|, m) = pm/m = p$. ✓

**Case 2:** No element has order divisible by $p$. Pick any $a \ne e$; let $m = |a|$, so $p \nmid m$. Consider the quotient $G/\langle a\rangle$ (which exists since $G$ is abelian, so every subgroup is normal).

$|G/\langle a\rangle| = |G|/m$. Since $p \mid |G|$ and $p \nmid m$, we have $p \mid |G|/m$. Also $|G/\langle a\rangle| = |G|/m < |G|$ (since $m > 1$).

By induction hypothesis, $G/\langle a\rangle$ has an element $\bar b$ of order $p$. Lift to some $b \in G$.

Let $k = |b|$. Since $\bar b$ has order $p$ in the quotient, $\bar b^k = \bar e$ iff $p \mid k$... wait: we have $\bar b^p = \overline{b^p} = \bar e$, which means $b^p \in \langle a\rangle$. And since $|\bar b| = p$, $\bar b^j \ne \bar e$ for $0 < j < p$, i.e., $b^j \notin \langle a\rangle$ for $0 < j < p$. In particular $b \notin \langle a\rangle$, so $b \ne e$.

Now $|b|$ must be such that $b^{|b|} = e$, so in particular $\bar b^{|b|} = \bar e$, which requires $p \mid |b|$ (since $|\bar b| = p$). Write $|b| = pk$. Then $b^k$ has order $p$ (same argument as Case 1).

Hence $G$ contains an element of order $p$. $\blacksquare$

*Remark.* The induction here crucially uses that in an abelian group, $\langle a\rangle \trianglelefteq G$ automatically, so $G/\langle a\rangle$ is a group. Extending this proof to non-abelian groups requires an entirely different approach.

### Theorem 16.16 (Cauchy's theorem — general; McKay's proof)

> **Theorem 16.16 (Cauchy).** Let $G$ be a finite group and $p$ a prime dividing $|G|$. Then $G$ has an element of order $p$.

*Proof (McKay, 1959).* We apply a $\mathbb{Z}/p\mathbb{Z}$-action to a cleverly chosen set.

**(Step 1) Set up the auxiliary set $X$.**

Let
$$X = \{(g_1, g_2, \ldots, g_p) \in G^p : g_1 g_2 \cdots g_p = e\}.$$

*Cardinality.* Choose $g_1, g_2, \ldots, g_{p-1}$ arbitrarily from $G$ ($|G|^{p-1}$ ways). Then $g_p$ is **forced** to be $g_p = (g_1 g_2 \cdots g_{p-1})^{-1}$ to ensure the product is $e$. So
$$|X| = |G|^{p-1}.$$

**(Step 2) Define a $\mathbb{Z}/p\mathbb{Z}$-action on $X$.**

Let $\sigma: X \to X$ be cyclic left shift:
$$\sigma(g_1, g_2, \ldots, g_p) = (g_2, g_3, \ldots, g_p, g_1).$$

*Well-defined (lands in $X$).* If $g_1 g_2 \cdots g_p = e$, then $g_2 g_3 \cdots g_p g_1 = g_1^{-1}(g_1 g_2 \cdots g_p) g_1 = g_1^{-1} \cdot e \cdot g_1 = e$. Alternatively: if $AB = e$ where $A = g_1, B = g_2\cdots g_p$, then $BA = e$ too (since $BA = g_1^{-1}(AB)g_1 = e$, or directly: $B = A^{-1}$, so $BA = A^{-1}A = e$). Hence $(g_2, \ldots, g_p, g_1) \in X$.

*$\mathbb{Z}/p\mathbb{Z}$-action.* $\sigma^p = \operatorname{id}$ (shifting by $p$ positions returns the tuple). So $\langle \sigma\rangle \cong \mathbb{Z}/p\mathbb{Z}$ acts on $X$ via $k \cdot x = \sigma^k(x)$.

**(Step 3) Analyze orbit sizes.**

By orbit-stabilizer, the orbit of $x \in X$ has size dividing $|\mathbb{Z}/p\mathbb{Z}| = p$, so orbit sizes are in $\{1, p\}$ (since $p$ is prime).

*Size-1 orbits (fixed points).* $\sigma(x) = x$ means
$$(g_2, g_3, \ldots, g_p, g_1) = (g_1, g_2, \ldots, g_p),$$
i.e., $g_1 = g_2 = \cdots = g_p$. Call this common value $g$. The condition $g_1 g_2 \cdots g_p = e$ becomes $g^p = e$. So
$$\operatorname{Fix}(\sigma) = \{(g, g, \ldots, g) : g^p = e\}, \qquad |\operatorname{Fix}(\sigma)| = |\{g \in G : g^p = e\}|.$$

**(Step 4) Counting via orbits.**

$X$ is partitioned into orbits. Let $F = |\operatorname{Fix}(\sigma)|$ (number of size-1 orbits) and $N$ = number of size-$p$ orbits. Then
$$|X| = F \cdot 1 + N \cdot p = F + Np,$$
so $|X| \equiv F \pmod p$.

**(Step 5) Reduce mod $p$.**

$|X| = |G|^{p-1}$. Since $p \mid |G|$, we have $|G|^{p-1} \equiv 0 \pmod p$. So $F \equiv 0 \pmod p$.

**(Step 6) Conclude.**

$F = |\{g \in G : g^p = e\}|$ contains $g = e$ as one element. So $F \ge 1$. Since $p \mid F$ and $F \ge 1$, we have $F \ge p$.

Hence there are at least $p - 1 \ge 1$ non-identity elements $g$ with $g^p = e$. Any such $g$ has $|g| \mid p$ and $|g| \ne 1$, so $|g| = p$.

So $G$ has an element of order $p$. $\blacksquare$

**Remarks on McKay's proof.**
- The trick is choosing the set $X$ with $|X|$ visibly divisible by $p$.
- The $\mathbb{Z}/p\mathbb{Z}$-action is a version of "turning the tuple into a necklace" — size-1 orbits correspond to constant necklaces, which are exactly what we want ($g^p = e$).
- Counts $F \ge p$ is a **stronger** conclusion than just "some $g$ has $g^p = e$": it gives $p$-many, a preview of Frobenius's theorem (the number of solutions to $x^n = e$ in a finite group is divisible by $\gcd(n, |G|)$).
- This proof is vastly cleaner than the original (Cauchy, 1845) and bypasses induction entirely.

## 16.7 Sylow's Theorems (Preview, No Proof)

Building on Cauchy, Sylow gives a spectacular refinement that forms the foundation of finite group theory:

> **Theorem 16.17 (Sylow, statement).** Let $G$ be a finite group with $|G| = p^k m$ where $p$ is prime and $\gcd(p, m) = 1$.
>
> 1. **Existence.** $G$ has a subgroup of order $p^k$, called a **Sylow $p$-subgroup**.
> 2. **Conjugacy.** Any two Sylow $p$-subgroups are conjugate in $G$.
> 3. **Number.** The number $n_p$ of Sylow $p$-subgroups satisfies $n_p \mid m$ and $n_p \equiv 1 \pmod p$.

**Cauchy as a corollary.** Sylow Theorem (1) for $k = 1$ (i.e., $p \| |G|$, meaning $p \mid |G|$ but $p^2 \nmid |G|$) immediately gives a subgroup of order $p$, necessarily cyclic, hence an element of order $p$. For $k > 1$, a Sylow $p$-subgroup $P$ has order $p^k$; by Theorem 16.13, $Z(P) \ne \{e\}$, so $Z(P)$ has an element of order $p$ (by the abelian Cauchy, Theorem 16.15). Hence any group whose order is divisible by $p$ has an element of order $p$ — Cauchy's theorem.

The Sylow theorems are one of the most powerful tools for classifying finite groups of small order. They are standard advanced undergraduate material and lie just beyond the scope of this course; the careful student should keep them in mind as the natural continuation of Cauchy.

## 16.8 Practice Problems

**Problem 1.** Find $C_G(a)$ in $G = S_4$ for $a = (1\,2\,3)$.

**Problem 2.** Find the center of $S_4$.

**Problem 3.** State and verify the class equation for $S_4$.

**Problem 4.** In $D_6$, compute $C_G(r)$ and $C_G(s)$.

**Problem 5.** Let $p$ be an odd prime. Show that if $G$ is a non-abelian group of order $2p$, then $|Z(G)| = 1$.

**Problem 6.** Use the class equation to show that a group of order $p^3$ has $|Z(G)| \in \{p, p^3\}$.

**Problem 7.** Let $G$ be a non-abelian group of order $p^3$ ($p$ prime). Show that $G/Z(G) \cong \mathbb{Z}_p \times \mathbb{Z}_p$.

**Problem 8.** Compute $C_{Q_8}(i)$ and find all conjugacy classes of $Q_8$.

### Solutions

---

**Solution 1.** Find $C_{S_4}((1\,2\,3))$.

*Setup.* $\sigma = (1\,2\,3)$ has cycle type $3 + 1$ (a 3-cycle fixing $4$). $|S_4| = 24$.

*Strategy.* Use orbit-stabilizer: $|C_{S_4}(\sigma)| = |S_4|/|\operatorname{cl}(\sigma)|$. Count 3-cycles in $S_4$.

*Step 1: Count the conjugacy class.* Conjugation in $S_n$ preserves cycle type. Every 3-cycle in $S_4$ has cycle type $3 + 1$. Number of 3-cycles:
$$\#\{(a, b, c) : \text{ordered}\}/3 \cdot (\text{fixing the unused letter}) = \frac{4 \cdot 3 \cdot 2}{3} = 8.$$
(More cleanly: $\binom{4}{3}$ choices of support, times $(3-1)!/1 = 2$ cyclic orderings, gives $4 \cdot 2 = 8$.)

So $|\operatorname{cl}((1\,2\,3))| = 8$.

*Step 2: Apply orbit-stabilizer.*
$$|C_{S_4}((1\,2\,3))| = \frac{24}{8} = 3.$$

*Step 3: Identify the centralizer explicitly.* We know $\langle (1\,2\,3)\rangle = \{e, (1\,2\,3), (1\,3\,2)\}$ has order $3$ and each element commutes with $(1\,2\,3)$. Since $|C_{S_4}((1\,2\,3))| = 3 = |\langle (1\,2\,3)\rangle|$, these subgroups coincide:
$$C_{S_4}((1\,2\,3)) = \{e, (1\,2\,3), (1\,3\,2)\}.$$

*Verification.* Does, e.g., $(1\,4)$ commute with $(1\,2\,3)$? $(1\,4)(1\,2\,3) = (1\,2\,3\,4)$ and $(1\,2\,3)(1\,4) = (1\,4\,2\,3)$. Not equal. ✓ (So $(1\,4)$ is not in the centralizer, consistent.)

*Interpretation.* In $S_4$, the 3-cycle $(1\,2\,3)$ "sees" the element $4$ as invisible (it fixes $4$), but any transposition involving $4$ and one of $\{1, 2, 3\}$ disrupts the cyclic symmetry and fails to commute. The centralizer is just the cyclic group generated by the 3-cycle. $\boxed{|C_{S_4}((1\,2\,3))| = 3}$ $\blacksquare$

---

**Solution 2.** $Z(S_4) = \{e\}$.

*Setup.* We claim $Z(S_n) = \{e\}$ for all $n \ge 3$, specializing to $n = 4$.

*Strategy.* Suppose $\sigma \in Z(S_n)$ with $\sigma \ne e$. Derive a contradiction by finding a transposition that $\sigma$ fails to commute with.

*Proof.*

**(Step 1) Pick a moved element.** Since $\sigma \ne e$, there exists $i$ with $\sigma(i) = j \ne i$.

**(Step 2) Pick a third element.** Since $n \ge 3$, there exists $k \in \{1, \ldots, n\}$ with $k \ne i, k \ne j$.

**(Step 3) Apply commutation with $(j\,k)$.** Since $\sigma \in Z(S_n)$, $\sigma$ commutes with the transposition $\tau = (j\,k)$:
$$\sigma \tau \sigma^{-1} = \tau.$$

**(Step 4) Use the conjugation formula.** $\sigma(j\,k)\sigma^{-1} = (\sigma(j)\,\sigma(k))$.

**(Step 5) Compare as unordered pairs.** We need $\{\sigma(j), \sigma(k)\} = \{j, k\}$.

**(Step 6) Derive contradiction.** We have $\sigma(i) = j$. Since $\sigma$ is a bijection, $\sigma^{-1}(j) = i$, so $\sigma(j) \ne j$ would be fine... wait, we need more care.

Let me redo this. From Step 5, $\{\sigma(j), \sigma(k)\} = \{j, k\}$. Also, $\sigma(i) = j \in \{j, k\}$. But $i \notin \{j, k\}$. So $i$ and one of $j, k$ both map into $\{j, k\}$ under $\sigma$ — which is fine ($\sigma$ is a bijection and we have $\sigma(i) = j$).

Let's try again with a cleaner transposition. Take $\tau = (i\,k)$ instead.

**(Step 3′)** $\sigma\tau\sigma^{-1} = \tau$ becomes $(\sigma(i)\,\sigma(k)) = (i\,k)$, so $\{\sigma(i), \sigma(k)\} = \{i, k\}$.

**(Step 6′)** $\sigma(i) = j \notin \{i, k\}$ (since $j \ne i$ and $j \ne k$). Contradiction: $j \in \{\sigma(i), \sigma(k)\} = \{i, k\}$, yet $j \notin \{i, k\}$. $\lightning$

Therefore no such $\sigma \ne e$ exists, and $Z(S_n) = \{e\}$ for $n \ge 3$. In particular, $Z(S_4) = \{e\}$. $\boxed{Z(S_4) = \{e\}}$ $\blacksquare$

*Remark.* For $n = 2$: $S_2 \cong \mathbb{Z}/2\mathbb{Z}$ is abelian, so $Z(S_2) = S_2$. The threshold $n \ge 3$ is sharp.

---

**Solution 3.** Class equation of $S_4$.

*Setup.* $|S_4| = 24$. Conjugacy classes correspond to cycle types (partitions of $4$).

*Enumeration of cycle types and class sizes.* The partitions of $4$ are $4, 3+1, 2+2, 2+1+1, 1+1+1+1$.

**Formula for class size.** The number of permutations in $S_n$ with cycle type $n_1^{m_1} n_2^{m_2} \cdots$ (where $m_j$ is the number of cycles of length $n_j$) is
$$\frac{n!}{\prod_j (n_j^{m_j} \cdot m_j!)}.$$

*Apply to $S_4$.*

- **Cycle type $1+1+1+1$** (identity): count $= 4!/(1^4 \cdot 4!) = 1$. Representative: $e$.
- **Cycle type $2+1+1$** (transpositions): count $= 4!/(2^1 \cdot 1! \cdot 1^2 \cdot 2!) = 24/4 = 6$. Representative: $(1\,2)$.
- **Cycle type $2+2$** (double transpositions): count $= 4!/(2^2 \cdot 2! \cdot 1^0 \cdot 0!) = 24/(4 \cdot 2) = 3$. Representative: $(1\,2)(3\,4)$.
- **Cycle type $3+1$** (3-cycles): count $= 4!/(3^1 \cdot 1! \cdot 1^1 \cdot 1!) = 24/3 = 8$. Representative: $(1\,2\,3)$.
- **Cycle type $4$** (4-cycles): count $= 4!/(4^1 \cdot 1!) = 24/4 = 6$. Representative: $(1\,2\,3\,4)$.

*Sanity check.* $1 + 6 + 3 + 8 + 6 = 24 = |S_4|$. ✓

*Centralizers (from $|C| = |G|/|\operatorname{cl}|$):*
- $|C_{S_4}(e)| = 24$.
- $|C_{S_4}((1\,2))| = 24/6 = 4$. (Explicitly $\{e, (1\,2), (3\,4), (1\,2)(3\,4)\}$.)
- $|C_{S_4}((1\,2)(3\,4))| = 24/3 = 8$. (The "dihedral $D_4$ subgroup" preserving the partition $\{\{1, 2\}, \{3, 4\}\}$ — see CO3 practice Solution B1.)
- $|C_{S_4}((1\,2\,3))| = 24/8 = 3$.
- $|C_{S_4}((1\,2\,3\,4))| = 24/6 = 4$. (Explicitly $\{e, (1\,2\,3\,4), (1\,3)(2\,4), (1\,4\,3\,2)\} = \langle (1\,2\,3\,4)\rangle$.)

*Center.* $Z(S_4) = \{e\}$ (Solution 2). Only one singleton class.

*Class equation.*
$$|S_4| = 24 = \underbrace{1}_{|Z(S_4)|} + \underbrace{6}_{(1\,2)} + \underbrace{3}_{(1\,2)(3\,4)} + \underbrace{8}_{(1\,2\,3)} + \underbrace{6}_{(1\,2\,3\,4)}. \qquad\checkmark$$

$\boxed{24 = 1 + 6 + 3 + 8 + 6}$ $\blacksquare$

*Remark.* The class equation encodes a huge amount of structural data: $S_4$ has exactly $5$ conjugacy classes (equal to the number of irreducible complex representations), and each class size divides $24$.

---

**Solution 4.** Compute $C_{D_6}(r)$ and $C_{D_6}(s)$.

*Setup.* $D_6 = \langle r, s \mid r^6 = s^2 = e, srs = r^{-1}\rangle$, $|D_6| = 12$. Elements: $\{e, r, r^2, r^3, r^4, r^5, s, rs, r^2 s, r^3 s, r^4 s, r^5 s\}$.

*Dihedral identities.* $srs^{-1} = r^{-1}$, so $sr^k s^{-1} = r^{-k}$, equivalently $sr^k = r^{-k}s$, i.e., $r^k s = sr^{-k}$.

**(A) Compute $C_{D_6}(r)$.**

*Rotations.* $r^k r = r^{k+1} = rr^k$. All rotations commute with $r$. So $\langle r\rangle \subseteq C_{D_6}(r)$.

*Reflections.* Does $r^k s$ commute with $r$?
$$(r^k s) \cdot r = r^k (sr) = r^k \cdot r^{-1} s = r^{k-1} s,$$
$$r \cdot (r^k s) = r^{k+1} s.$$
Equal iff $r^{k-1} = r^{k+1}$ iff $r^2 = e$ iff $|r| \mid 2$. But $|r| = 6$, so $r^2 \ne e$. Hence no reflection commutes with $r$.

*Conclusion.*
$$C_{D_6}(r) = \langle r\rangle = \{e, r, r^2, r^3, r^4, r^5\}, \qquad |C_{D_6}(r)| = 6.$$

*Verification.* $|\operatorname{cl}(r)| = 12/6 = 2$. Indeed, $\operatorname{cl}(r) = \{r, r^{-1}\} = \{r, r^5\}$: two elements, matching. ✓

**(B) Compute $C_{D_6}(s)$.**

*Rotations commuting with $s$.* $r^k s = s r^k \Leftrightarrow r^k s = s r^k$. Using $sr^k = r^{-k}s$: $r^k s = r^{-k} s$, i.e., $r^{2k} = e$, i.e., $6 \mid 2k$, i.e., $k \in \{0, 3\}$ (mod $6$).

So rotations in $C_{D_6}(s)$: $\{e, r^3\}$.

*Reflections commuting with $s$.* Does $r^k s$ commute with $s$?
$$(r^k s) \cdot s = r^k s^2 = r^k,$$
$$s \cdot (r^k s) = (sr^k)s = r^{-k}s \cdot s = r^{-k}.$$
Equal iff $r^k = r^{-k}$ iff $r^{2k} = e$ iff $k \in \{0, 3\}$.

So reflections in $C_{D_6}(s)$: $\{s, r^3 s\}$.

*Conclusion.*
$$C_{D_6}(s) = \{e, r^3, s, r^3 s\}, \qquad |C_{D_6}(s)| = 4.$$

*Structure.* All four non-identity elements of $C_{D_6}(s)$ have order $2$:
- $|r^3| = 2$ ($r^6 = e$, $r^3 \ne e$).
- $|s| = 2$.
- $|r^3 s| = 2$: $(r^3 s)^2 = r^3 s r^3 s = r^3 (sr^3) s = r^3 \cdot r^{-3} s \cdot s = s^2 = e$.

So $C_{D_6}(s) \cong V_4$ (Klein four-group).

*Verification.* $|\operatorname{cl}(s)| = 12/4 = 3$. Let's check: $\operatorname{cl}(s) = \{g s g^{-1} : g \in D_6\}$. Conjugating $s$ by $r^k$: $r^k s r^{-k} = r^k \cdot r^k s = r^{2k} s$ (using $sr^{-k} = r^k s$). As $k$ varies, $r^{2k}$ hits $\{e, r^2, r^4\}$ (even powers). So $\operatorname{cl}(s) = \{s, r^2 s, r^4 s\}$: three elements. ✓

Note: $\{rs, r^3 s, r^5 s\}$ is a separate class in $D_6$ (for $n$ even, reflections split into two classes).

$\boxed{|C_{D_6}(r)| = 6, \quad |C_{D_6}(s)| = 4}$ $\blacksquare$

*Remark.* For general $D_n$: $C_{D_n}(s) = \{e, s\}$ if $n$ is odd (no $r^{n/2}$ exists), and $C_{D_n}(s) = \{e, r^{n/2}, s, r^{n/2}s\}$ if $n$ is even. The dichotomy $n$-odd vs $n$-even pervades dihedral group theory.

---

**Solution 5.** $G$ non-abelian of order $2p$ ($p$ odd prime) $\Rightarrow |Z(G)| = 1$.

*Setup.* $|G| = 2p$, $G$ non-abelian. Want: $|Z(G)| = 1$.

*Strategy.* $|Z(G)|$ divides $|G| = 2p$, so $|Z(G)| \in \{1, 2, p, 2p\}$. Rule out $\{2, p, 2p\}$ one at a time using the lemma "$G/Z(G)$ cyclic $\Rightarrow G$ abelian" (Solution to Corollary 16.14, Step 2).

*Proof.*

**Case $|Z(G)| = 2p$:** Then $Z(G) = G$, so $G$ is abelian. Contradicts non-abelian hypothesis. $\lightning$

**Case $|Z(G)| = p$:** Then $|G/Z(G)| = 2p/p = 2$, which is prime, hence cyclic. By the lemma, $G$ is abelian. Contradiction. $\lightning$

**Case $|Z(G)| = 2$:** Then $|G/Z(G)| = 2p/2 = p$, which is prime, hence cyclic. By the lemma, $G$ is abelian. Contradiction. $\lightning$

**Only remaining case:** $|Z(G)| = 1$.

Hence $|Z(G)| = 1$, i.e., $Z(G) = \{e\}$. $\blacksquare$

*Remark.* The non-abelian group of order $2p$ is $D_p$ (dihedral), and one can directly verify $Z(D_p) = \{e\}$ when $p$ is odd (since $r^k$ and $r^{-k}$ are distinct for $k \ne 0$). Our proof shows this a priori from the class-equation lemma, without identifying $G$ as $D_p$.

---

**Solution 6.** $|G| = p^3 \Rightarrow |Z(G)| \in \{p, p^3\}$.

*Setup.* $|G| = p^3$. By Lagrange, $|Z(G)| \in \{1, p, p^2, p^3\}$.

*Strategy.* Rule out $|Z(G)| \in \{1, p^2\}$.

*Proof.*

**(Step 1) $|Z(G)| \ne 1$ by Theorem 16.13.** Since $|G| = p^3$ is a $p$-group, $p \mid |Z(G)|$, so $|Z(G)| \ge p > 1$.

**(Step 2) $|Z(G)| \ne p^2$.** Suppose for contradiction $|Z(G)| = p^2$. Then $|G/Z(G)| = p^3/p^2 = p$, which is prime hence cyclic. By the lemma, $G$ is abelian, so $Z(G) = G$, giving $|Z(G)| = p^3 \ne p^2$. Contradiction. $\lightning$

**(Step 3) Conclude.** The remaining possibilities are $|Z(G)| \in \{p, p^3\}$.

Hence $|Z(G)| \in \{p, p^3\}$. $\boxed{}$ $\blacksquare$

*Interpretation.* $|Z(G)| = p^3$ iff $G$ is abelian. $|Z(G)| = p$ iff $G$ is non-abelian (the smaller center case). Every group of order $p^3$ falls into one of these two camps; there is no "middle" case $|Z(G)| = p^2$.

*Remark.* For $p = 2$: groups of order $8$ are $\mathbb{Z}_8, \mathbb{Z}_4 \times \mathbb{Z}_2, \mathbb{Z}_2^3$ (abelian, $|Z| = 8$), $D_4, Q_8$ (non-abelian, $|Z| = 2$). This matches the theorem.

---

**Solution 7.** $G$ non-abelian of order $p^3$ $\Rightarrow G/Z(G) \cong \mathbb{Z}_p \times \mathbb{Z}_p$.

*Setup.* $|G| = p^3$, $G$ non-abelian. By Solution 6, $|Z(G)| = p$, so $|G/Z(G)| = p^2$.

*Strategy.* Apply Corollary 16.14 to $G/Z(G)$ (order $p^2$) to conclude it is abelian. Then rule out the cyclic case.

*Proof.*

**(Step 1) $G/Z(G)$ has order $p^2$ and is abelian.**

By Solution 6, $|Z(G)| = p$, so $|G/Z(G)| = p^3/p = p^2$.

By Corollary 16.14, every group of order $p^2$ is abelian. So $G/Z(G)$ is abelian.

**(Step 2) Classification: $G/Z(G) \cong \mathbb{Z}_{p^2}$ or $\mathbb{Z}_p \times \mathbb{Z}_p$.**

By Corollary 16.14, abelian groups of order $p^2$ are classified: $G/Z(G) \cong \mathbb{Z}_{p^2}$ (cyclic) or $G/Z(G) \cong \mathbb{Z}_p \times \mathbb{Z}_p$.

**(Step 3) Rule out the cyclic case.**

Suppose $G/Z(G) \cong \mathbb{Z}_{p^2}$ is cyclic. By the lemma, $G$ is abelian. But $G$ is non-abelian by hypothesis. $\lightning$

**(Step 4) Conclude.**

The only remaining possibility is $G/Z(G) \cong \mathbb{Z}_p \times \mathbb{Z}_p$.

$\boxed{G/Z(G) \cong \mathbb{Z}_p \times \mathbb{Z}_p.}$ $\blacksquare$

*Remark (exponent).* Every element of $G/Z(G) \cong \mathbb{Z}_p \times \mathbb{Z}_p$ has order dividing $p$. So for every $g \in G$, $g^p \in Z(G)$. This is a starting point for further structure theorems on $p$-groups (e.g., the commutator $[G, G] \subseteq Z(G)$, making $G$ a Heisenberg-type nilpotent group of class $2$).

---

**Solution 8.** Compute $C_{Q_8}(i)$ and find all conjugacy classes of $Q_8$.

*Setup.* $Q_8 = \{\pm 1, \pm i, \pm j, \pm k\}$, with relations $i^2 = j^2 = k^2 = -1$, $ij = k, jk = i, ki = j$ (and $ji = -k$, etc.). $|Q_8| = 8$.

*Strategy.*
1. Identify the center $Z(Q_8)$.
2. Compute $C_{Q_8}(i)$ directly.
3. Use orbit-stabilizer to determine conjugacy class sizes, then list classes.

**(Part A) Center of $Q_8$.** $Z(Q_8) = \{g : gh = hg \text{ for all } h\}$. Check each candidate.

- $1$: commutes with all (identity).
- $-1$: commutes with all (scalar).
- $i$: $ij = k$, $ji = -k$. Not equal, so $i \notin Z(Q_8)$.
- Similarly $-i, \pm j, \pm k \notin Z(Q_8)$.

Hence $Z(Q_8) = \{1, -1\}$, order $2$.

**(Part B) $C_{Q_8}(i)$.** $g \in C_{Q_8}(i)$ iff $gi = ig$. Check:

- $\pm 1$: commute with $i$ (central).
- $i$: commutes with itself.
- $-i$: $(-i) \cdot i = -i^2 = 1 = i \cdot (-i)$. Commute.
- $j$: $ji = -k, ij = k$. Not equal.
- $-j, k, -k$: similarly fail.

Hence $C_{Q_8}(i) = \{1, -1, i, -i\} = \langle i\rangle$, order $4$.

*Verification (orbit-stabilizer).* $|\operatorname{cl}(i)| = 8/4 = 2$. So $i$ has $2$ conjugates.

*Computing conjugates of $i$.* $gig^{-1}$ for $g \in Q_8$:
- $1 \cdot i \cdot 1 = i$.
- $(-1)i(-1) = i$.
- $i \cdot i \cdot i^{-1} = i$.
- $j \cdot i \cdot j^{-1} = jij^{-1}$. $j^{-1} = -j$ (since $j^2 = -1$, $j \cdot (-j) = -j^2 = 1$). So $jij^{-1} = ji(-j) = (ji)(-j) = (-k)(-j) = kj = -i$.
- Similarly $k \cdot i \cdot k^{-1} = -i$.

So $\operatorname{cl}(i) = \{i, -i\}$, size $2$. ✓

**(Part C) All conjugacy classes.**

By symmetry among $i, j, k$:
- $\operatorname{cl}(1) = \{1\}$, size $1$.
- $\operatorname{cl}(-1) = \{-1\}$, size $1$.
- $\operatorname{cl}(i) = \{i, -i\}$, size $2$.
- $\operatorname{cl}(j) = \{j, -j\}$, size $2$.
- $\operatorname{cl}(k) = \{k, -k\}$, size $2$.

*Verification (class equation).* $|Q_8| = 8 = \underbrace{1 + 1}_{|Z(Q_8)|} + 2 + 2 + 2 = 2 + 6$. ✓

So the class equation of $Q_8$ is
$$8 = 2 + 2 + 2 + 2.$$

*Comparison with $D_4$.* Both $D_4$ and $Q_8$ have $|Z| = 2$ and class equation $8 = 2 + 2 + 2 + 2$, so the class equation alone does not distinguish them. A finer invariant is needed — e.g., number of elements of order $2$: $D_4$ has $5$, $Q_8$ has $1$ (only $-1$). See [[17-homomorphisms-and-isomorphisms]] for the full argument $D_4 \not\cong Q_8$.

$\boxed{C_{Q_8}(i) = \{\pm 1, \pm i\};\ \text{5 conjugacy classes of sizes } 1, 1, 2, 2, 2.}$ $\blacksquare$

*Interpretation.* In $Q_8$, every subgroup is normal (a famous property of Hamiltonian groups). Consequently $N_{Q_8}(H) = Q_8$ for every $H \le Q_8$. But centralizers are still proper: $C_{Q_8}(i) = \langle i\rangle \ne Q_8$.

---

## Related Concepts

- [[15-group-actions]] — foundational framework for orbits/stabilizers; centralizers, normalizers, and $Z(G)$ are stabilizers for conjugation actions.
- [[17-homomorphisms-and-isomorphisms]] — the kernel/image interplay with centralizers; $Z(G)$ and $G/Z(G)$ appear frequently in isomorphism arguments.
- [[10-normal-subgroups-and-quotient-groups]] — quotients like $G/Z(G)$; the "$G/Z(G)$ cyclic $\Rightarrow G$ abelian" lemma is used repeatedly here.

---

*Last updated: 2026-04-19*
