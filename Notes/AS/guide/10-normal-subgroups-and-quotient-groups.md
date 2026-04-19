# 10. Normal Subgroups and Quotient Groups

> **The construction we've been waiting for.** Given any subgroup $H \leq G$, the cosets partition $G$. But when can we turn the set of cosets into a *group* by defining $(aH)(bH) := (ab)H$? The answer: when $H$ is **normal** — a special class of subgroups that are invariant under conjugation. This chapter defines normal subgroups, constructs the **quotient group** $G/H$, and shows how to use it to "kill" parts of a group we don't care about.
>
> The transition from "subgroup" to "normal subgroup" is one of the central conceptual leaps in group theory. Cosets always *partition* a group, but only when the subgroup is normal does that partition inherit a group structure. Normality is a compatibility condition between the subgroup and the ambient group's multiplication: a subgroup $N$ is normal if and only if left and right cosets coincide, if and only if $N$ is closed under conjugation, if and only if $N$ is the kernel of some homomorphism. These characterizations will reappear throughout the remaining chapters.

---

## 10.1 Normal Subgroups

> **Definition.** A subgroup $N \leq G$ is **normal** (written $N \triangleleft G$) if $gNg^{-1} = N$ for every $g \in G$. Equivalently:
> $$\forall g \in G, \forall n \in N : gng^{-1} \in N.$$

Here $gNg^{-1} := \{gng^{-1} : n \in N\}$ is the **conjugate** of $N$ by $g$. Conjugation $x \mapsto gxg^{-1}$ is always an automorphism of $G$ (an **inner automorphism**), so $gNg^{-1}$ is a subgroup of $G$ of the same order as $N$. Normality asserts that this conjugate equals $N$ itself — not merely another subgroup of the same size, but literally the same set.

**Equivalent conditions.** $N \triangleleft G$ iff (any one of the following holds):
1. $gNg^{-1} \subseteq N$ for all $g \in G$ (one-direction sufficient — we prove this below).
2. $gN = Ng$ for all $g \in G$ (left cosets equal right cosets).
3. $gng^{-1} \in N$ for all $g \in G$ and all $n \in N$ (element-wise formulation of (1)).
4. $N$ is a union of **conjugacy classes** of $G$ (partition formulation).

> **Theorem 10.0 (Normality equivalences).** For a subgroup $N \leq G$, the following are equivalent:
> (a) $gNg^{-1} = N$ for all $g \in G$.
> (b) $gNg^{-1} \subseteq N$ for all $g \in G$.
> (c) $gng^{-1} \in N$ for all $g \in G, n \in N$.
> (d) $gN = Ng$ for all $g \in G$.
> (e) Every left coset of $N$ is also a right coset.

**Proof.** We establish a cycle of implications.

*(a) $\Rightarrow$ (b).* If $gNg^{-1} = N$, then in particular $gNg^{-1} \subseteq N$. Trivial.

*(b) $\Leftrightarrow$ (c).* $gNg^{-1} \subseteq N$ means every element of $gNg^{-1}$ lies in $N$; by definition of $gNg^{-1}$, this is exactly the statement that $gng^{-1} \in N$ for every $n \in N$. Pure restatement.

*(b) $\Rightarrow$ (a).* Assume $gNg^{-1} \subseteq N$ holds for **every** $g \in G$ (this universal quantifier is crucial). We must upgrade to equality $gNg^{-1} = N$.

Apply the hypothesis with $g$ replaced by $g^{-1}$:
$$g^{-1} N (g^{-1})^{-1} \subseteq N, \quad \text{i.e.,} \quad g^{-1} N g \subseteq N.$$
Multiply both sides on the left by $g$ and on the right by $g^{-1}$ (these are set-operations: $gAg^{-1}$ is monotonic in $A$):
$$g (g^{-1} N g) g^{-1} \subseteq gNg^{-1}.$$
The left side simplifies: $g g^{-1} N g g^{-1} = eNe = N$. So
$$N \subseteq gNg^{-1}.$$
Combined with the original inclusion $gNg^{-1} \subseteq N$, we conclude $gNg^{-1} = N$. $\checkmark$

*(a) $\Rightarrow$ (d).* From $gNg^{-1} = N$, multiply both sides on the right by $g$:
$$(gNg^{-1})g = Ng \implies gN(g^{-1}g) = Ng \implies gN \cdot e = Ng \implies gN = Ng. \checkmark$$

*(d) $\Rightarrow$ (a).* From $gN = Ng$, multiply both sides on the right by $g^{-1}$:
$$(gN)g^{-1} = (Ng)g^{-1} \implies gNg^{-1} = N(gg^{-1}) = N \cdot e = N. \checkmark$$

*(d) $\Leftrightarrow$ (e).* If $gN = Ng$, then the left coset $gN$ **is** a right coset (namely $Ng$). Conversely, suppose every left coset $gN$ equals some right coset $Nh$. Since $g = ge \in gN = Nh$, we have $g \in Nh$, so $Nh = Ng$ (right cosets containing the same element coincide). Hence $gN = Ng$. $\checkmark$

All five conditions are equivalent. $\blacksquare$

**Remark (why (b) suffices).** Condition (b) looks strictly weaker than (a) — only one inclusion — but because we quantify over *all* $g \in G$, we can apply it at $g^{-1}$ to get the reverse inclusion. This "dual application" trick recurs throughout algebra (e.g., showing a two-sided ideal from one-sided data).

**Remark (conjugacy-class formulation).** The **conjugacy class** of $x \in G$ is $[x] := \{gxg^{-1} : g \in G\}$. The classes partition $G$. Condition (c) says that whenever $n \in N$, the entire conjugacy class $[n]$ lies in $N$. Hence: $N \triangleleft G$ iff $N$ is a disjoint union of conjugacy classes. This is often the quickest way to enumerate normal subgroups of a finite group with a known class structure (e.g., $S_n$, $A_n$).

### Normality is not transitive

If $K \triangleleft H \triangleleft G$, we **cannot** conclude $K \triangleleft G$.

**Counter-example.** In $S_4$, consider the chain
$$V := \{e,\; (1\,2)(3\,4),\; (1\,3)(2\,4),\; (1\,4)(2\,3)\} \triangleleft A_4 \triangleleft S_4.$$
Why $V \triangleleft A_4$: $V$ is precisely the set of elements of cycle type $1+1+1+1$ or $2+2$ in $S_4$, which is a union of conjugacy classes in $S_4$ (hence in $A_4$). Why $A_4 \triangleleft S_4$: index $2$.

Now take $K = \langle (1\,2)(3\,4)\rangle = \{e, (1\,2)(3\,4)\}$. Since $V$ is abelian (isomorphic to $\mathbb{Z}_2 \times \mathbb{Z}_2$), every subgroup of $V$ is normal in $V$, so $K \triangleleft V$.

**But $K$ is *not* normal in $S_4$.** Conjugate $(1\,2)(3\,4)$ by $(1\,2\,3) \in S_4$:
$$(1\,2\,3)(1\,2)(3\,4)(1\,2\,3)^{-1} = (1\,2\,3)(1\,2)(3\,4)(1\,3\,2).$$
Using the rule that conjugation by $\sigma$ relabels according to $i \mapsto \sigma(i)$: $(1\,2)(3\,4)$ becomes $(\sigma(1)\,\sigma(2))(\sigma(3)\,\sigma(4)) = (2\,3)(1\,4) = (1\,4)(2\,3) \in V \setminus K$.

So $(1\,2\,3)K(1\,2\,3)^{-1} = \{e, (1\,4)(2\,3)\} \neq K$, and $K \not\triangleleft S_4$.

**Moral.** Normality is a *relative* notion: $N \triangleleft H$ depends on which ambient group $H$ we consider. Moving to a larger group can break normality.

**Definition (characteristic subgroup).** A subgroup $N \leq G$ is **characteristic** (written $N \text{ char } G$) if $\varphi(N) = N$ for *every* automorphism $\varphi$ of $G$. Characteristic subgroups *are* transitive in the right sense: $K \text{ char } H \text{ char } G$ implies $K \text{ char } G$, and $K \text{ char } H \triangleleft G$ implies $K \triangleleft G$. So the transitivity failure of normality is really a failure of characteristicness.

---

## 10.2 Examples of Normal Subgroups

**Example 1 (Trivial cases).** $\{e\}$ and $G$ are always normal in $G$.

*Verification.* For $\{e\}$: $g e g^{-1} = g g^{-1} = e \in \{e\}$. ✓ For $G$: $gGg^{-1} = G$ since conjugation is a bijection $G \to G$. ✓ $\blacksquare$

Groups with *only* these normal subgroups are called **simple** (section 10.6).

**Example 2 (Every subgroup of an abelian group is normal).** If $G$ is abelian and $N \leq G$, then for any $g \in G, n \in N$:
$$gng^{-1} = (gn)g^{-1} = (ng)g^{-1} = n(gg^{-1}) = n \cdot e = n \in N.$$
So $gNg^{-1} = N$. $\blacksquare$

*Consequence.* In $(\mathbb{Z}, +)$, every subgroup $n\mathbb{Z}$ is normal. In $(\mathbb{Z}_n, +)$, every subgroup is normal. In $\mathbb{Z} \times \mathbb{Z}$, every subgroup (i.e., every sublattice) is normal. Quotients of abelian groups are abelian.

**Example 3 (Center).** $Z(G) \triangleleft G$. In fact, every subgroup of $Z(G)$ is normal in $G$.

*Proof.* Recall $Z(G) = \{z \in G : zx = xz \;\forall x \in G\}$. Let $H \leq Z(G)$. For $g \in G, h \in H$:
$$ghg^{-1} = (gh)g^{-1} = (hg)g^{-1} = h(gg^{-1}) = h \in H,$$
using $hg = gh$ (since $h \in Z(G)$ commutes with $g$). Hence $H \triangleleft G$. In particular $Z(G) \triangleleft G$. $\blacksquare$

*Why this matters.* The **class equation** $|G| = |Z(G)| + \sum_i [G : C_G(x_i)]$ exploits $Z(G) \triangleleft G$. For $p$-groups, it forces $|Z(G)| > 1$.

**Example 4 (Kernel of a homomorphism).** If $\varphi : G \to H$ is a group homomorphism, then $\ker \varphi := \{g \in G : \varphi(g) = e_H\}$ is normal in $G$.

*Proof.*
1. **$\ker\varphi$ is a subgroup.** (Proved in [[17-homomorphisms-and-isomorphisms]], but we recall the argument.) $\varphi(e_G) = e_H$, so $e_G \in \ker\varphi$. If $a, b \in \ker\varphi$: $\varphi(ab) = \varphi(a)\varphi(b) = e_H e_H = e_H$ ✓. And $\varphi(a^{-1}) = \varphi(a)^{-1} = e_H^{-1} = e_H$ ✓.
2. **Normality.** For $g \in G, n \in \ker\varphi$:
$$\varphi(gng^{-1}) = \varphi(g)\varphi(n)\varphi(g^{-1}) = \varphi(g) \cdot e_H \cdot \varphi(g)^{-1} = \varphi(g)\varphi(g)^{-1} = e_H.$$
So $gng^{-1} \in \ker\varphi$. By condition (c) of Theorem 10.0, $\ker\varphi \triangleleft G$. $\blacksquare$

**Converse (preview of [[18-isomorphism-theorems]]).** Every normal subgroup $N$ arises as the kernel of some homomorphism — namely the **quotient map** $\pi : G \to G/N$, $g \mapsto gN$. So:
$$\boxed{\text{normal subgroups} = \text{kernels of homomorphisms.}}$$
This equivalence is the content of the First Isomorphism Theorem.

**Example 5 (Index 2 subgroups are normal).**

> **Proposition.** If $H \leq G$ with $[G : H] = 2$, then $H \triangleleft G$.

*Proof.* Since $[G:H] = 2$, there are exactly $2$ left cosets: $H$ itself and one other, which must be $G \setminus H$. Similarly there are exactly $2$ right cosets: $H$ and $G \setminus H$.

Take any $g \in G$. Two cases:
- **$g \in H$:** Then $gH = H$ (since left-multiplication by $g \in H$ permutes $H$) and $Hg = H$. So $gH = Hg$. ✓
- **$g \notin H$:** Then $gH \neq H$, so $gH = G \setminus H$ (the only other left coset). Similarly $Hg \neq H$, so $Hg = G \setminus H$. Hence $gH = Hg$. ✓

In both cases $gH = Hg$, which is condition (d) of Theorem 10.0. So $H \triangleleft G$. $\blacksquare$

*Key insight.* The argument uses only that $H$ and its complement $G \setminus H$ are the only cosets; it works whether we approach cosets from the left or right. The same reasoning shows: any subgroup whose index is the smallest prime dividing $|G|$ is normal (a significant generalization — see [[16-centralizer-normalizer-stabilizer]]).

*Examples.* $A_n \triangleleft S_n$ (index $2$). $SO(n) \triangleleft O(n)$ (index $2$, defined by $\det = 1$). $SL_n(\mathbb{R})$ is *not* index $2$ in $GL_n(\mathbb{R})$ but is still normal (being a kernel).

**Example 6 (In $S_n$).** $A_n \triangleleft S_n$ by Example 5 (index $2$). We can also see this directly: $A_n$ is the kernel of the sign homomorphism $\text{sgn}: S_n \to \{\pm 1\}$, so normal by Example 4.

**Conversely**, the subgroup $H = \{e, (1\,2)\} \leq S_3$ is **not** normal:
$$(1\,3) \cdot (1\,2) \cdot (1\,3)^{-1} = (1\,3)(1\,2)(1\,3).$$
Compute step by step. Apply to $1$: $(1\,3) \to 3$; $(1\,2) \to 3$; $(1\,3) \to 1$. Wait, let me redo more carefully with right-to-left convention: the rightmost $(1\,3)$ acts first. So $1 \xrightarrow{(1\,3)} 3 \xrightarrow{(1\,2)} 3 \xrightarrow{(1\,3)} 1$. Hmm, $1 \to 1$.

Let me use the substitution rule: conjugation by $\sigma$ sends a cycle $(a_1\,a_2\,\ldots\,a_k)$ to $(\sigma(a_1)\,\sigma(a_2)\,\ldots\,\sigma(a_k))$. With $\sigma = (1\,3)$: $\sigma(1) = 3, \sigma(2) = 2$. So $(1\,3)(1\,2)(1\,3)^{-1} = (\sigma(1)\,\sigma(2)) = (3\,2) = (2\,3)$.

So $(1\,3) H (1\,3)^{-1} = \{e, (2\,3)\} \neq H = \{e, (1\,2)\}$. Hence $H \not\triangleleft S_3$.

*Pattern.* The three order-$2$ subgroups $\langle (1\,2)\rangle, \langle (1\,3)\rangle, \langle (2\,3)\rangle$ are all conjugate in $S_3$; none is normal. Only $\{e\}, A_3, S_3$ are normal in $S_3$.

**Example 7 (In $D_4$).** $D_4 = \langle r, s : r^4 = s^2 = e, srs = r^{-1}\rangle$, $|D_4| = 8$.

*Normal subgroups:*
1. $\{e\}$ and $D_4$ (trivial).
2. $\langle r \rangle = \{e, r, r^2, r^3\}$: index $2$, normal by Example 5.
3. $Z(D_4) = \{e, r^2\}$: the center (verified: $r^2$ commutes with everything since $sr^2 = (sr)r = (r^{-1}s)r = r^{-1}(sr) = r^{-1}(r^{-1}s) = r^{-2}s = r^2 s$). Normal by Example 3.
4. $\{e, r^2, s, sr^2\} = \langle s, r^2\rangle$: index $2$, normal.
5. $\{e, r^2, sr, sr^3\} = \langle sr, r^2\rangle$: index $2$, normal.

*Not normal:*
- $\{e, s\}$. Compute $r \{e, s\} r^{-1}$. We have $rsr^{-1}$: using $sr = r^{-1}s$, i.e., $rs = sr^{-1}$, so $rs = sr^3$. Then $rsr^{-1} = (rs)r^{-1} = sr^3 \cdot r^{-1} = sr^2$. So $r\{e, s\}r^{-1} = \{e, sr^2\} \neq \{e, s\}$. Not normal.
- Similarly $\{e, sr\}, \{e, sr^2\}, \{e, sr^3\}$ are not normal (conjugate to $\{e, s\}$ or $\{e, sr^2\}$ cyclically).

*Summary.* $D_4$ has exactly $6$ normal subgroups: $\{e\}, \{e, r^2\}, \langle r\rangle, \langle s, r^2\rangle, \langle sr, r^2\rangle, D_4$. Three of these have index $2$.

**Example 8 (Quaternion group $Q_8$).** Remarkably, **every** subgroup of $Q_8$ is normal, even though $Q_8$ is non-abelian. Such groups are called **Hamiltonian**. The subgroups are $\{1\}, \{\pm 1\}, \langle i\rangle, \langle j\rangle, \langle k\rangle, Q_8$, all of which are normal.

---

## 10.3 The Quotient Group $G/N$

> **Theorem 10.1 (Construction of quotient group).** Let $N \triangleleft G$. The set of (left) cosets
> $$G/N := \{gN : g \in G\}$$
> is a group under the operation
> $$(aN)(bN) := (ab)N.$$

This is the single most important construction in group theory. The condition $N \triangleleft G$ is precisely what makes the operation well-defined.

**Proof.**

1. **Well-defined.** The operation $(aN)(bN) = (ab)N$ is defined by picking coset representatives $a, b$. We must show the result doesn't depend on the choice.

   Suppose $aN = a'N$ and $bN = b'N$; we must show $(ab)N = (a'b')N$, equivalently $(ab)^{-1}(a'b') \in N$.

   *From $aN = a'N$:* $a^{-1}a' \in N$. Call this element $n_1 := a^{-1}a' \in N$.

   *From $bN = b'N$:* $b^{-1}b' \in N$. Call this $n_2 := b^{-1}b' \in N$.

   Compute:
   $$(ab)^{-1}(a'b') = b^{-1}a^{-1}a'b' = b^{-1}(n_1)b'.$$
   Now insert $b b^{-1} = e$:
   $$b^{-1} n_1 b' = b^{-1} n_1 (b b^{-1}) b' = (b^{-1} n_1 b)(b^{-1} b') = (b^{-1} n_1 b) n_2.$$

   **Key step (uses normality):** $b^{-1} n_1 b \in N$ because $N$ is normal (condition (c)): conjugation of $n_1 \in N$ by $b^{-1} \in G$ stays in $N$.

   Hence $(ab)^{-1}(a'b') = (b^{-1} n_1 b) \cdot n_2$ is a product of two elements of $N$, so it lies in $N$ (subgroup closure). Therefore $(ab)N = (a'b')N$. ✓

2. **Associativity.** Pick representatives $a, b, c \in G$:
$$((aN)(bN))(cN) = ((ab)N)(cN) = ((ab)c)N = (a(bc))N = (aN)((bc)N) = (aN)((bN)(cN)).$$
The associativity is inherited directly from $G$'s associativity. ✓

3. **Identity.** Claim: $eN = N$ is the identity. For any $aN \in G/N$:
$$(aN)(eN) = (ae)N = aN \checkmark, \qquad (eN)(aN) = (ea)N = aN \checkmark.$$

4. **Inverses.** Claim: $(aN)^{-1} = a^{-1}N$. Check:
$$(aN)(a^{-1}N) = (aa^{-1})N = eN = N, \qquad (a^{-1}N)(aN) = (a^{-1}a)N = eN = N. \checkmark$$

All four group axioms are verified, so $G/N$ is a group. $\blacksquare$

**Remark on well-definedness.** Step (1) is the crux. Without normality, the product of cosets $(aN)(bN)$ — understood as the *set* $\{(an)(bn') : n, n' \in N\}$ — might not equal any single coset. Normality ensures $aN \cdot bN = abN$ as sets (see section 10.4).

### Order of $G/N$

For finite $G$:
$$|G/N| = [G : N] = \frac{|G|}{|N|}$$
by Lagrange's theorem ([[09-cosets-and-lagranges-theorem]]). For infinite $G$, $|G/N|$ is the index $[G:N]$, which may be finite or infinite.

**Example 9.**
- $|\mathbb{Z}/5\mathbb{Z}| = [\mathbb{Z} : 5\mathbb{Z}] = 5$: cosets $0+5\mathbb{Z}, 1+5\mathbb{Z}, \ldots, 4+5\mathbb{Z}$.
- $|\mathbb{Z}_{12}/\langle 3\rangle| = 12/4 = 3$: since $\langle 3\rangle = \{0, 3, 6, 9\}$ has order $4$ in $\mathbb{Z}_{12}$.
- $|S_3/A_3| = 6/3 = 2$: so $S_3/A_3 \cong \mathbb{Z}_2$ (only group of order $2$).
- $|GL_n(\mathbb{R})/SL_n(\mathbb{R})| = \infty$: the quotient is $\mathbb{R}^*$ via the determinant map.

### Visualization

Think of $N$ as "noise" we want to ignore. Elements that differ by something in $N$ become identified in $G/N$. Formally, $a \sim b \iff a^{-1}b \in N \iff aN = bN$; this is an equivalence relation, and $G/N$ is the set of equivalence classes, now equipped with a group structure inherited from $G$.

---

## 10.4 Why "$N$ normal" is essential for well-definedness

Let's see what goes wrong without normality.

Consider $G = S_3$ and $H = \{e, (1\,2)\}$ — not normal (Example 6).

**Attempt.** Define $(aH)(bH) := (ab)H$ and check well-definedness.

*Pick representatives.* Take $a = (1\,3)$ and $b = (2\,3)$.

Compute the cosets:
- $aH = (1\,3)\{e, (1\,2)\} = \{(1\,3), (1\,3)(1\,2)\}$. Compute $(1\,3)(1\,2)$: rightmost first, so $1 \to 2 \to 2$; $2 \to 1 \to 3$; $3 \to 3 \to 1$. This is the permutation $1 \to 2, 2 \to 3, 3 \to 1$, i.e., $(1\,2\,3)$. Wait, let me recheck with the standard rightmost-first convention: $(1\,3)(1\,2)$ means apply $(1\,2)$ then $(1\,3)$. $1 \xrightarrow{(1\,2)} 2 \xrightarrow{(1\,3)} 2$. $2 \xrightarrow{(1\,2)} 1 \xrightarrow{(1\,3)} 3$. $3 \xrightarrow{(1\,2)} 3 \xrightarrow{(1\,3)} 1$. So the result is $1 \to 2, 2 \to 3, 3 \to 1$, i.e., $(1\,2\,3)$. Hmm, but that's a $3$-cycle — let me re-verify by using the formula $(1\,3)(1\,2) = (1\,2\,3)$ (standard identity).

   Actually a cleaner way: $(1\,3)(1\,2) = (1\,2\,3)$. Check: $(1\,2\,3)$ means $1 \to 2, 2 \to 3, 3 \to 1$. ✓

   So $aH = \{(1\,3), (1\,2\,3)\}$. (Note: some textbooks use left-to-right convention, which would flip this. I'll stick with rightmost-first.)

- $bH = (2\,3)\{e, (1\,2)\} = \{(2\,3), (2\,3)(1\,2)\}$. Compute $(2\,3)(1\,2)$: $1 \to 2 \to 3$; $2 \to 1 \to 1$; $3 \to 3 \to 2$. So $1 \to 3, 2 \to 1, 3 \to 2$, i.e., $(1\,3\,2)$. So $bH = \{(2\,3), (1\,3\,2)\}$.

- $(ab)H = ((1\,3)(2\,3))H$. Compute $(1\,3)(2\,3)$: $1 \to 1 \to 3$; $2 \to 3 \to 1$. Wait: $1 \xrightarrow{(2\,3)} 1 \xrightarrow{(1\,3)} 3$. $2 \xrightarrow{(2\,3)} 3 \xrightarrow{(1\,3)} 1$. $3 \xrightarrow{(2\,3)} 2 \xrightarrow{(1\,3)} 2$. So $1 \to 3, 2 \to 1, 3 \to 2$, i.e., $(1\,3\,2)$. So $(ab)H = (1\,3\,2) H = \{(1\,3\,2), (1\,3\,2)(1\,2)\}$. Compute $(1\,3\,2)(1\,2)$: $1 \to 2 \to 1$. Hmm, $1 \xrightarrow{(1\,2)} 2 \xrightarrow{(1\,3\,2)} 1$. $2 \xrightarrow{(1\,2)} 1 \xrightarrow{(1\,3\,2)} 3$. $3 \xrightarrow{(1\,2)} 3 \xrightarrow{(1\,3\,2)} 2$. So $1 \to 1, 2 \to 3, 3 \to 2$, i.e., $(2\,3)$. So $(ab)H = \{(1\,3\,2), (2\,3)\} = bH$.

*Now pick different representatives.* Recall $aH = \{(1\,3), (1\,2\,3)\}$, so $(1\,2\,3) \in aH$. And $bH = \{(2\,3), (1\,3\,2)\}$, so $(1\,3\,2) \in bH$. Let $a' = (1\,2\,3), b' = (1\,3\,2)$. Then $a'H = aH$ and $b'H = bH$. Compute $(a'b')H$:
$$a'b' = (1\,2\,3)(1\,3\,2).$$
$1 \xrightarrow{(1\,3\,2)} 3 \xrightarrow{(1\,2\,3)} 1$. $2 \xrightarrow{(1\,3\,2)} 1 \xrightarrow{(1\,2\,3)} 2$. $3 \xrightarrow{(1\,3\,2)} 2 \xrightarrow{(1\,2\,3)} 3$. So $a'b' = e$, and $(a'b')H = eH = H = \{e, (1\,2)\}$.

**Compare:** $(ab)H = \{(1\,3\,2), (2\,3)\}$ but $(a'b')H = \{e, (1\,2)\}$. These are **different cosets**! So the operation $(aH)(bH) \mapsto (ab)H$ is **not well-defined** when $H \not\triangleleft G$.

**Moral.** Normality is exactly the condition needed for the quotient operation to descend to cosets. Without it, the "same" product can have different cosets depending on which representatives you pick.

**Alternative perspective.** The set-theoretic product of cosets $aH \cdot bH := \{xy : x \in aH, y \in bH\}$ always makes sense. The question is whether this is again a coset. If $H \triangleleft G$: $aHbH = a(Hb)H = a(bH)H = abHH = abH$, a single coset. Without normality, $aHbH$ typically spreads across multiple cosets.

---

## 10.5 Example: $\mathbb{Z}_n$ as a Quotient

The prototypical example of a quotient group — and historically the origin of modular arithmetic.

Let $G = (\mathbb{Z}, +)$ and $N = n\mathbb{Z} = \{\ldots, -2n, -n, 0, n, 2n, \ldots\}$ for some $n \geq 1$. Since $\mathbb{Z}$ is abelian, $n\mathbb{Z}$ is automatically normal (Example 2).

The cosets are
$$k + n\mathbb{Z} = \{k + nm : m \in \mathbb{Z}\} = \{\text{integers congruent to } k \pmod n\}.$$
There are exactly $n$ distinct cosets: $0 + n\mathbb{Z}, 1 + n\mathbb{Z}, \ldots, (n-1) + n\mathbb{Z}$.

The quotient group is
$$\mathbb{Z}/n\mathbb{Z} = \{0 + n\mathbb{Z}, 1 + n\mathbb{Z}, \ldots, (n-1) + n\mathbb{Z}\}$$
with operation
$$(a + n\mathbb{Z}) + (b + n\mathbb{Z}) = (a + b) + n\mathbb{Z}.$$

Well-definedness means: if $a \equiv a' \pmod n$ and $b \equiv b' \pmod n$, then $a + b \equiv a' + b' \pmod n$ — a familiar congruence fact.

**Isomorphism.** Define $\varphi: \mathbb{Z}/n\mathbb{Z} \to \mathbb{Z}_n$, $\varphi(k + n\mathbb{Z}) = k \bmod n$. This is a bijection of sets preserving the group operation. So $\mathbb{Z}/n\mathbb{Z} \cong \mathbb{Z}_n$ as groups. We often write them interchangeably.

**Sanity check.** $|\mathbb{Z}/n\mathbb{Z}| = [\mathbb{Z} : n\mathbb{Z}] = n = |\mathbb{Z}_n|$. ✓

---

## 10.6 Simple Groups

> **Definition.** A group $G \neq \{e\}$ is **simple** if its only normal subgroups are $\{e\}$ and $G$.

Simple groups are the "atoms" of finite group theory — they cannot be further decomposed via quotients. Any non-simple group has a non-trivial normal subgroup $N$, yielding two strictly smaller pieces: $N$ and $G/N$.

**Examples of simple groups.**
- **$\mathbb{Z}_p$ for $p$ prime.** By Lagrange, subgroups have orders dividing $p$, so only $\{0\}$ and $\mathbb{Z}_p$. Both are normal (abelian case). Since the only subgroups are the trivial ones, they're the only normal ones. So $\mathbb{Z}_p$ is simple.
- **$A_n$ for $n \geq 5$.** The classical result, proved in many texts. The proof proceeds by showing that any non-trivial normal subgroup of $A_n$ must contain a $3$-cycle, and hence must be all of $A_n$ (since $A_n$ is generated by $3$-cycles for $n \geq 3$).
- **$\text{PSL}_n(\mathbb{F}_q)$** for most $n, q$ (projective special linear groups over finite fields): infinite families of non-abelian simple groups.

**Non-examples.**
- $\mathbb{Z}_n$ for composite $n$: has proper non-trivial subgroups, all normal.
- $A_4$ is **not** simple — it contains the Klein four-group $V_4 = \{e, (1\,2)(3\,4), (1\,3)(2\,4), (1\,4)(2\,3)\}$ as a normal subgroup of order $4$. This $V_4$ is the unique proper non-trivial normal subgroup of $A_4$.
- $S_n$ for $n \geq 2$: $A_n$ is normal.

**Classification of finite simple groups (CFSG).** A monumental theorem, completed in ~1983 after thousands of pages of proof by dozens of mathematicians:

> The finite simple groups are:
> 1. Cyclic groups $\mathbb{Z}_p$ of prime order.
> 2. Alternating groups $A_n$ for $n \geq 5$.
> 3. 16 infinite families of "Lie type" (e.g., $\text{PSL}_n(\mathbb{F}_q)$).
> 4. 26 sporadic groups — the largest is the **Monster** $M$ with about $8 \times 10^{53}$ elements.

The classification is a breathtaking achievement of 20th-century mathematics. Its analogue for the Lie-type families is the classification of simple Lie algebras (4 infinite families $A, B, C, D$ plus 5 exceptions $E_6, E_7, E_8, F_4, G_2$) — see [[12-subgroup-lattice-and-dihedral]] for connections.

---

## 10.7 Worked Examples

**Example 10 (Quotient $\mathbb{Z}/6\mathbb{Z}$).** Describe.

*Setup.* $G = \mathbb{Z}$, $N = 6\mathbb{Z}$. Abelian, so $N \triangleleft G$.

*Strategy.* List the cosets, identify the group structure.

*Computation.* The cosets are $k + 6\mathbb{Z}$ for $k = 0, 1, 2, 3, 4, 5$:
$$\mathbb{Z}/6\mathbb{Z} = \{\bar 0, \bar 1, \bar 2, \bar 3, \bar 4, \bar 5\}, \quad \bar k := k + 6\mathbb{Z}.$$

The group operation is $\bar a + \bar b = \overline{a + b}$. Sample: $\bar 4 + \bar 5 = \bar 9 = \bar 3$.

*Verification.* Order: $|\mathbb{Z}/6\mathbb{Z}| = 6$. Cyclic: generated by $\bar 1$, since $\bar 1, \bar 2, \bar 3, \bar 4, \bar 5, \bar 0$ exhaust the group. So
$$\mathbb{Z}/6\mathbb{Z} \cong \mathbb{Z}_6.$$

*Interpretation.* Clock arithmetic on a 6-hour clock: $4 + 5 = 9$ hours becomes $3$ o'clock (since $9 = 6 + 3$). $\blacksquare$

---

**Example 11 (Quotient $D_4 / \{e, r^2\}$).** Compute the structure.

*Setup.* $D_4 = \langle r, s : r^4 = s^2 = e, srs = r^{-1}\rangle$, $|D_4| = 8$. Let $Z := Z(D_4) = \{e, r^2\}$, which is normal (center, Example 3).

*Strategy.* Since $|Z| = 2$, the quotient has order $8/2 = 4$. Groups of order $4$ are $\mathbb{Z}_4$ or $V_4$ (Example 16 of Chapter 3). Determine which.

*Computation of cosets.*
- $eZ = \{e, r^2\}$
- $rZ = \{r, r^3\}$
- $sZ = \{s, sr^2\}$
- $(sr)Z = \{sr, sr \cdot r^2\} = \{sr, sr^3\}$

Four cosets, exhausting $D_4$. ✓

*Squaring each coset.* In $G/Z$, compute the square of each element:
- $(eZ)^2 = e^2 Z = eZ$.
- $(rZ)^2 = r^2 Z = eZ$ (since $r^2 \in Z$).
- $(sZ)^2 = s^2 Z = eZ$ (since $s^2 = e$).
- $((sr)Z)^2 = (sr)^2 Z$. Compute $(sr)^2 = srsr = s(rsr)$. From $srs = r^{-1}$ we get $sr = r^{-1}s$, so $srsr = (r^{-1}s)(sr) = r^{-1}(s^2)r = r^{-1} \cdot e \cdot r = e$. Hence $((sr)Z)^2 = eZ$.

So **every non-identity element of $D_4/Z$ has order $2$**. Since a group of order $4$ with every non-identity element of order $2$ is the Klein four-group:
$$\boxed{D_4 / Z(D_4) \cong V_4 \cong \mathbb{Z}_2 \times \mathbb{Z}_2.}$$

*Verification.* Let's check one multiplication: $(rZ)(sZ) = (rs)Z$. Now $rs = sr^{-1} = sr^3$. So $(rs)Z = sr^3 Z = (sr)r^2 Z = (sr)Z$ (since $r^2 \in Z$). Good — the product $rZ \cdot sZ = (sr)Z$ is indeed one of our four cosets.

*Interpretation.* "Modding out by the center" collapses $\{e, r^2\}$ to a single point. The resulting group records only the coarse structure: "rotation or not, reflection or not" — giving $V_4$. Note $D_4/Z(D_4)$ is **not cyclic**, which via Practice Problem 4 confirms $D_4$ is non-abelian (contrapositive of that result). $\blacksquare$

---

**Example 12 (Abelianization of $D_4$).** Compute $D_4 / [D_4, D_4]$, where $[G, G] := \langle [x, y] : x, y \in G\rangle$ is the **commutator subgroup**.

*Setup.* The commutator subgroup is the smallest normal subgroup whose quotient is abelian. So $G/[G,G]$ is the "largest abelian quotient" of $G$, called the **abelianization** $G^{\text{ab}}$.

*Strategy.* Compute $[D_4, D_4]$ by finding commutators, show it equals $\langle r^2\rangle$, then identify $D_4/\langle r^2\rangle$.

*Computation.* Start with the commutator $[r, s] = rsr^{-1}s^{-1}$.

Using $srs = r^{-1}$, i.e., $sr^{-1} = rs^{-1} \cdot s \cdot s^{-1} = \ldots$ let me redo. From $srs^{-1} = r^{-1}$ (since $s = s^{-1}$ as $s^2 = e$): so $srs = r^{-1}$, and $rsr^{-1} = ?$ Multiply $srs = r^{-1}$ on the left by $r$ and right by $r$: $rsrs \cdot r = r \cdot r^{-1} \cdot r = r$, so $(rs)^2 r = r$, giving $(rs)^2 = e$. Interesting but not immediately useful.

Direct: $[r, s] = rsr^{-1}s^{-1} = rsr^{-1}s$ (since $s^{-1} = s$). Use $sr = r^{-1}s$, i.e., $s = r^{-1}sr^{-1} \cdot r$... let me just substitute $rs = sr^{-1} = sr^3$:
$$[r, s] = rsr^{-1}s = (rs)(r^{-1}s) = (sr^3)(r^{-1}s) = sr^2 s.$$
Now $sr^2s = (srs)(srs)^{-1} r^2 \cdot \ldots$ ugh. Simpler: $sr^2 s = s(r^2)s = s(srs \cdot srs)s = \ldots$ still circular.

**Cleaner computation.** Use the formula $srs^{-1} = r^{-1}$ to compute $s r^k s^{-1} = r^{-k}$ for any $k$. Then
$$[r, s] = rsr^{-1}s^{-1} = r \cdot (sr^{-1}s^{-1}) = r \cdot r = r^2.$$
Here $sr^{-1}s^{-1} = (srs^{-1})^{-1} = (r^{-1})^{-1} = r$. So $[r, s] = r^2$. ✓

Hence $\langle r^2\rangle \subseteq [D_4, D_4]$. To show equality, note $[D_4, D_4] \subseteq D_4$ and $D_4/\langle r^2\rangle \cong V_4$ is abelian (Example 11). In an abelian quotient $G/N$, all commutators $[x, y]$ die (image is $e$), so $[D_4, D_4] \subseteq \langle r^2\rangle$. Combined: $[D_4, D_4] = \langle r^2\rangle$.

*Conclusion.*
$$D_4^{\text{ab}} = D_4 / [D_4, D_4] = D_4 / \langle r^2\rangle \cong V_4.$$

*Interpretation.* The abelianization "forces commutativity" by quotienting out anything that witnesses non-commutativity. For $D_4$, the non-commutativity is concentrated in $r^2$ (the square of the rotation), and killing $r^2$ makes the group abelian. $\blacksquare$

*Connection.* This is an instance of a general pattern: $D_n^{\text{ab}} \cong V_4$ if $n$ is even, $\mathbb{Z}_2$ if $n$ is odd.

---

**Example 13 (Quotient of $\mathbb{Z} \times \mathbb{Z}$).** Compute $(\mathbb{Z} \times \mathbb{Z}) / \langle (2, 3)\rangle$.

*Setup.* $G = \mathbb{Z} \times \mathbb{Z}$, abelian, so every subgroup is normal. $N = \langle (2, 3)\rangle = \{(2k, 3k) : k \in \mathbb{Z}\}$ is the cyclic subgroup generated by $(2, 3)$ — a "line" through the origin in the lattice $\mathbb{Z}^2$.

*Strategy.* Use the Smith normal form (or change of basis) to find a nicer set of generators.

*Computation.* We want to find a $\mathbb{Z}$-basis of $\mathbb{Z}^2$ whose first vector is $(2, 3)$. Since $\gcd(2, 3) = 1$, by Bézout there exist integers $u, v$ with $2u + 3v = 1$; e.g., $u = -1, v = 1$ gives $2(-1) + 3(1) = 1$.

Define the matrix
$$M = \begin{pmatrix} 2 & 3 \\ -1 & 1 \end{pmatrix}, \quad \det M = 2 \cdot 1 - 3 \cdot (-1) = 5.$$
Hmm, determinant $5$, not $\pm 1$, so this isn't a change of basis.

Let me redo. We want a matrix with rows giving a basis of $\mathbb{Z}^2$, with first row $(2, 3)$. The determinant must be $\pm 1$. Try $M = \begin{pmatrix} 2 & 3 \\ 1 & 2\end{pmatrix}$: $\det = 4 - 3 = 1$. ✓ So the rows $(2, 3)$ and $(1, 2)$ form a $\mathbb{Z}$-basis of $\mathbb{Z}^2$.

Hence $\mathbb{Z}^2 = \mathbb{Z}(2, 3) \oplus \mathbb{Z}(1, 2)$, and
$$(\mathbb{Z}^2) / \langle (2, 3)\rangle = \frac{\mathbb{Z}(2, 3) \oplus \mathbb{Z}(1, 2)}{\mathbb{Z}(2, 3)} \cong \mathbb{Z}(1, 2) \cong \mathbb{Z}.$$

*Verification.* The quotient should have one "copy of $\mathbb{Z}$" left after killing the direction of $(2, 3)$. The class of $(1, 2)$ generates, and no positive multiple of $(1, 2)$ lies in $\langle (2, 3)\rangle$ (check: $k(1, 2) = (k, 2k) = (2m, 3m)$ would force $k = 2m$ and $2k = 3m$, i.e., $4m = 3m$, i.e., $m = 0$, i.e., $k = 0$).

*Conclusion.*
$$\boxed{(\mathbb{Z} \times \mathbb{Z}) / \langle (2, 3)\rangle \cong \mathbb{Z}.}$$

*General principle.* $(\mathbb{Z}^2)/\langle (a, b)\rangle \cong \mathbb{Z} \oplus \mathbb{Z}_d$ where $d = \gcd(a, b)$. Here $d = \gcd(2, 3) = 1$, so the torsion part is $\mathbb{Z}_1 = 0$ and the quotient is $\mathbb{Z}$. More generally, for a rank-$n$ lattice modulo a sublattice, the **Smith normal form** theorem gives the quotient as a direct sum of finite cyclic groups plus free factors. $\blacksquare$

---

## 10.8 Practice Problems

1. List all normal subgroups of $S_3$.
2. Show that the intersection of two normal subgroups is normal.
3. Is $\mathbb{Z}_6 / \langle 2 \rangle$ cyclic? What order?
4. Prove: if $G/Z(G)$ is cyclic, then $G$ is abelian.
5. Show: $A_n \triangleleft S_n$ for all $n \geq 2$.
6. In $D_6$, find all normal subgroups.
7. Compute $\mathbb{Z}/12\mathbb{Z}$ modulo $\langle 4 + 12\mathbb{Z} \rangle$.

### Solutions

**Solution 1.** All normal subgroups of $S_3$.

*Setup.* $|S_3| = 6$. By Lagrange, subgroup orders divide $6$: possible orders are $1, 2, 3, 6$.

*Enumerate subgroups.*
- Order $1$: $\{e\}$. One subgroup.
- Order $2$: generated by an element of order $2$. Elements of order $2$ in $S_3$: $(1\,2), (1\,3), (2\,3)$. Three subgroups: $\{e, (1\,2)\}, \{e, (1\,3)\}, \{e, (2\,3)\}$.
- Order $3$: generated by an element of order $3$. Elements of order $3$: $(1\,2\,3), (1\,3\,2)$. Both generate the same subgroup $A_3 = \{e, (1\,2\,3), (1\,3\,2)\}$.
- Order $6$: $S_3$ itself. One subgroup.

Total: $\{e\}, \{e, (1\,2)\}, \{e, (1\,3)\}, \{e, (2\,3)\}, A_3, S_3$ — six subgroups.

*Which are normal?*
- $\{e\}$: trivially normal.
- $S_3$: trivially normal.
- $A_3$ (order $3$, index $2$): normal by Example 5 (index-$2$ theorem).
- The three order-$2$ subgroups: **not normal** in $S_3$. They are all conjugate to each other: $(1\,3)(1\,2)(1\,3)^{-1} = (2\,3)$ (using the relabeling rule: $\sigma (a\,b) \sigma^{-1} = (\sigma(a)\,\sigma(b))$). Since conjugation takes $\{e, (1\,2)\}$ to $\{e, (2\,3)\} \neq \{e, (1\,2)\}$, not normal.

*Verification via conjugacy classes.* $S_3$ has $3$ conjugacy classes: $\{e\}$ (order $1$), $\{(1\,2), (1\,3), (2\,3)\}$ (order $3$), $\{(1\,2\,3), (1\,3\,2)\}$ (order $2$). Sizes sum to $6$ ✓. Normal subgroups are unions of classes containing $\{e\}$: possible unions have sizes $1, 1+2 = 3, 1+3 = 4$ (not a divisor), $1+2+3 = 6$. Sizes $1, 3, 6$ correspond to $\{e\}, A_3, S_3$. ✓

*Answer.* The normal subgroups of $S_3$ are exactly $\{e\}, A_3, S_3$. $\blacksquare$

---

**Solution 2.** Show that the intersection of two normal subgroups is normal.

*Claim.* If $N_1, N_2 \triangleleft G$, then $N_1 \cap N_2 \triangleleft G$.

*Proof.*

1. **$N_1 \cap N_2$ is a subgroup.** Standard (intersection of subgroups is a subgroup): contains $e$ (in both), closed under product (both closed), closed under inverse (both closed).

2. **Normality.** Let $g \in G, n \in N_1 \cap N_2$. We show $gng^{-1} \in N_1 \cap N_2$.

   Since $n \in N_1$ and $N_1 \triangleleft G$: $gng^{-1} \in N_1$ (condition (c)).

   Since $n \in N_2$ and $N_2 \triangleleft G$: $gng^{-1} \in N_2$.

   Hence $gng^{-1} \in N_1 \cap N_2$. By condition (c), $N_1 \cap N_2 \triangleleft G$. $\blacksquare$

*Remark.* More generally, the intersection of **any family** (possibly infinite) of normal subgroups is normal — same argument applied pointwise. This allows defining the **normal closure** of a subset $S \subseteq G$ as the intersection of all normal subgroups containing $S$: the smallest normal subgroup containing $S$.

*Corollary.* The set of normal subgroups of $G$ is closed under intersection, so it forms a **complete lattice** (with $\{e\}$ as bottom and $G$ as top; join is the subgroup generated by the union, which is also normal — see Solution to Problem 2 below).

*What about unions?* Union of two normal subgroups is **not** generally a subgroup (let alone normal). E.g., $\langle (1\,2)(3\,4)\rangle \cup \langle (1\,3)(2\,4)\rangle$ in $S_4$ is not a subgroup. The correct notion is the **product** $N_1 N_2 = \{n_1 n_2 : n_i \in N_i\}$, which is the subgroup generated by the union when both are normal.

---

**Solution 3.** Is $\mathbb{Z}_6 / \langle 2\rangle$ cyclic? What order?

*Setup.* $\mathbb{Z}_6 = \{0, 1, 2, 3, 4, 5\}$ under addition mod $6$. Subgroup $\langle 2\rangle$ generated by $2$.

*Computation of $\langle 2\rangle$.* $2, 2+2 = 4, 4+2 = 6 \equiv 0$. So $\langle 2\rangle = \{0, 2, 4\}$, of order $3$.

*Normality.* $\mathbb{Z}_6$ is abelian, so $\langle 2\rangle$ is normal. ✓

*Order of quotient.* $|\mathbb{Z}_6 / \langle 2\rangle| = |\mathbb{Z}_6| / |\langle 2\rangle| = 6/3 = 2$.

*Structure.* The only group of order $2$ is $\mathbb{Z}_2$, which is cyclic. So yes, cyclic, of order $2$.

*Explicit description.* Cosets: $0 + \langle 2\rangle = \{0, 2, 4\}$ (even classes) and $1 + \langle 2\rangle = \{1, 3, 5\}$ (odd classes). Sum: $(1 + \langle 2\rangle) + (1 + \langle 2\rangle) = 2 + \langle 2\rangle = 0 + \langle 2\rangle$. So the quotient records "parity mod 6," which is really just parity — $\mathbb{Z}_2$.

*Interpretation.* The quotient map $\mathbb{Z}_6 \to \mathbb{Z}_2$ is the reduction $\bmod 2$: a homomorphism $\mathbb{Z}_6 \to \mathbb{Z}_2$ with kernel $\langle 2\rangle$. $\blacksquare$

---

**Solution 4.** Prove: if $G/Z(G)$ is cyclic, then $G$ is abelian.

*Setup.* Write $Z = Z(G)$. Assume $G/Z = \langle gZ\rangle$ for some $g \in G$. We must show $G$ is abelian, i.e., $xy = yx$ for all $x, y \in G$.

*Strategy.* Every element of $G$ lies in some coset of $Z$, and that coset is a power of $gZ$. So every $x \in G$ has the form $g^k z$ for some $k \in \mathbb{Z}, z \in Z$. Products of such elements commute because the $Z$-parts commute with everything and the $g$-parts commute with each other.

*Proof.*

1. **Every element has the form $g^k z$.** Since $G/Z = \langle gZ\rangle$, every coset is $(gZ)^k = g^k Z$ for some $k \in \mathbb{Z}$. So given $x \in G$, its coset $xZ = g^k Z$ for some $k$, which means $x = g^k z$ for some $z \in Z$.

2. **Compute products.** Take $x, y \in G$ with $x = g^k z_1$, $y = g^m z_2$, where $z_1, z_2 \in Z$ and $k, m \in \mathbb{Z}$.

   $$xy = (g^k z_1)(g^m z_2).$$

   Since $z_1 \in Z$ commutes with everything, $z_1 g^m = g^m z_1$. So
   $$xy = g^k (z_1 g^m) z_2 = g^k g^m z_1 z_2 = g^{k+m} z_1 z_2.$$

   Similarly,
   $$yx = (g^m z_2)(g^k z_1) = g^m (z_2 g^k) z_1 = g^m g^k z_2 z_1 = g^{k+m} z_2 z_1.$$

3. **$z_1 z_2 = z_2 z_1$.** Both $z_1, z_2$ are in the center $Z$, which is an abelian subgroup (by definition, elements of $Z$ commute with everything, in particular with each other). So $z_1 z_2 = z_2 z_1$.

4. **Conclude.** $xy = g^{k+m} z_1 z_2 = g^{k+m} z_2 z_1 = yx$. Hence $G$ is abelian. $\blacksquare$

*Remark (why this is striking).* The hypothesis is that a single quotient $G/Z$ is cyclic — a relatively weak condition. The conclusion, full abelianness, is much stronger. This theorem has many applications: for instance, it implies groups of order $p^2$ (prime $p$) are abelian (since $|Z| > 1$ by the class equation, and $|G/Z| \in \{1, p\}$, both cyclic).

*Contrapositive.* If $G$ is non-abelian, then $G/Z(G)$ is non-cyclic. Applied to $D_4$: we computed in Example 11 that $D_4/Z(D_4) \cong V_4$, which is not cyclic — consistent with $D_4$ being non-abelian.

*Application (order $p^2$ groups).* If $|G| = p^2$, then the class equation forces $|Z(G)| \in \{p, p^2\}$. If $|Z| = p$, then $|G/Z| = p$, which is cyclic (only group of prime order), so $G$ is abelian by this theorem — but then $Z = G$, so $|Z| = p^2$, contradiction. Hence $|Z| = p^2$, i.e., $Z = G$, i.e., $G$ is abelian. So every group of order $p^2$ is abelian.

---

**Solution 5.** Show: $A_n \triangleleft S_n$ for all $n \geq 2$.

*Setup.* $A_n$ = even permutations in $S_n$. $|A_n| = n!/2$ for $n \geq 2$, so $[S_n : A_n] = 2$.

*Proof 1 (via index).* $A_n$ has index $2$ in $S_n$. Any subgroup of index $2$ is normal (Example 5). Hence $A_n \triangleleft S_n$. $\blacksquare$

*Proof 2 (via kernel).* Define the sign homomorphism
$$\text{sgn}: S_n \to \{\pm 1\}, \qquad \sigma \mapsto \begin{cases} +1 & \sigma \text{ even} \\ -1 & \sigma \text{ odd}\end{cases}$$
This is a homomorphism: $\text{sgn}(\sigma\tau) = \text{sgn}(\sigma)\text{sgn}(\tau)$ (standard fact — see [[05-permutation-and-dihedral-groups]]). By definition, $A_n = \ker(\text{sgn})$. Kernels of homomorphisms are normal (Example 4), so $A_n \triangleleft S_n$. $\blacksquare$

*Proof 3 (direct).* Let $\sigma \in A_n, \tau \in S_n$. Then
$$\text{sgn}(\tau \sigma \tau^{-1}) = \text{sgn}(\tau)\text{sgn}(\sigma)\text{sgn}(\tau^{-1}) = \text{sgn}(\tau) \cdot 1 \cdot \text{sgn}(\tau)^{-1} = 1,$$
so $\tau\sigma\tau^{-1} \in A_n$. By condition (c), $A_n \triangleleft S_n$. $\blacksquare$

*Verification.* All three proofs agree. $A_n$ is simultaneously: index $2$, a kernel, and closed under conjugation. These are the three standard routes to proving normality.

*Remark.* For $n \geq 5$, $A_n$ is additionally **simple** (the only non-trivial normal subgroup of $S_n$ is $A_n$ itself, with only exception $n = 4$ where $V_4 \triangleleft S_4$). So $S_n$ has a very rigid normal structure: $\{e\} \triangleleft A_n \triangleleft S_n$ is a **composition series** for $n \geq 5$.

---

**Solution 6.** Find all normal subgroups of $D_6$.

*Setup.* $D_6 = \langle r, s : r^6 = s^2 = e, srs^{-1} = r^{-1}\rangle$, $|D_6| = 12$.

Elements: $\{e, r, r^2, r^3, r^4, r^5\} \cup \{s, sr, sr^2, sr^3, sr^4, sr^5\}$.

*Strategy.* Use the fact that normal subgroups are unions of conjugacy classes.

*Step 1: Conjugacy classes of $D_6$.*

For an element $r^k$: $s r^k s^{-1} = r^{-k}$. So the class of $r^k$ contains $\{r^k, r^{-k}\}$. Explicitly:
- $[e] = \{e\}$ (size $1$).
- $[r^3] = \{r^3\}$ (since $r^{-3} = r^3$ as $r^6 = e$; size $1$).
- $[r] = \{r, r^{-1}\} = \{r, r^5\}$ (size $2$).
- $[r^2] = \{r^2, r^{-2}\} = \{r^2, r^4\}$ (size $2$).

For an element $sr^k$: $r \cdot sr^k \cdot r^{-1} = rsr^k r^{-1} = (rs)r^{k-1} = sr^{-1}r^{k-1} = sr^{k-2}$. So conjugation by $r$ shifts $sr^k \mapsto sr^{k-2}$. Repeated conjugation visits $sr^k, sr^{k-2}, sr^{k-4}, \ldots$, cycling through the parity-$k$ reflections.
- $[s] = [sr^0] = \{s, sr^{-2}, sr^{-4}\} = \{s, sr^4, sr^2\}$ (size $3$, even-indexed reflections).
- $[sr] = \{sr, sr^{-1}, sr^{-3}\} = \{sr, sr^5, sr^3\}$ (size $3$, odd-indexed reflections).

*Sanity check.* $1 + 1 + 2 + 2 + 3 + 3 = 12 = |D_6|$. ✓ So there are $6$ conjugacy classes.

*Step 2: Normal subgroups as unions of classes.* A normal subgroup must contain $[e] = \{e\}$ and be a union of classes. So we look at unions of classes whose total size divides $12$ (Lagrange).

Let me enumerate subsets. The class sizes are $1, 1, 2, 2, 3, 3$. Including $[e]$ is mandatory. Possible subgroup sizes (divisors of $12$): $1, 2, 3, 4, 6, 12$.

- **Size $1$:** $\{e\}$. ✓ Normal.
- **Size $2$:** Include $[e] = \{e\}$ (size $1$) plus classes of total size $1$. Only option: $\{e, r^3\} = \{e\} \cup [r^3]$. Check subgroup: $r^3 \cdot r^3 = r^6 = e$, closed. ✓ This is $Z(D_6) = \{e, r^3\}$. Normal.
- **Size $3$:** Include classes of total size $2$. Options: $[r]$ (size $2$) or $[r^2]$ (size $2$). 
  - $\{e, r, r^5\}$: check closure: $r \cdot r^5 = e$, $r^2 = ?$ — but $r^2 \notin$ set, so $r \cdot r = r^2 \notin$ set. Not a subgroup. Exclude.
  - $\{e, r^2, r^4\}$: $r^2 \cdot r^2 = r^4$ ✓, $r^2 \cdot r^4 = r^6 = e$ ✓, $r^4 \cdot r^4 = r^8 = r^2$ ✓. Subgroup $= \langle r^2\rangle$. ✓ Normal.
- **Size $4$:** Include classes totaling $3$. Options: $[r^3] + [r]$, $[r^3] + [r^2]$, $[s]$, $[sr]$, or $[e] + $ something of size $3$.
  - $\{e, r^3, r, r^5\}$: check $r \cdot r = r^2 \notin$. Not a subgroup.
  - $\{e, r^3, r^2, r^4\}$: $r^2 \cdot r^3 = r^5 \notin$. Not a subgroup.
  - $\{e, s, sr^2, sr^4\}$: contains $[e]$ and $[s]$. $s \cdot sr^2 = r^2 \notin$. Not a subgroup.
  - $\{e, sr, sr^3, sr^5\}$: $sr \cdot sr^3 = s(rs)r^3 = s(sr^{-1})r^3 = r^{-1} r^3 = r^2 \notin$. Not a subgroup.
  - So no normal subgroups of size $4$.
- **Size $6$ (index $2$, automatically normal).** Candidates: $[e]$ + classes totaling $5$.
  - $\{e, r^3\} \cup [r] \cup [r^2] = \{e, r, r^2, r^3, r^4, r^5\} = \langle r\rangle$ ✓ Subgroup of rotations. Normal.
  - $\{e\} \cup [r^2] \cup [s] = \{e, r^2, r^4, s, sr^2, sr^4\}$: check subgroup. $s \cdot r^2 = sr^2$ ✓. $sr^2 \cdot sr^4 = s(r^2 s)r^4 = s(sr^{-2})r^4 = r^2 \notin$... wait let me recompute. $sr^2 \cdot sr^4 = s r^2 s r^4$. Using $r^2 s = s r^{-2}$ (from $srs^{-1} = r^{-1}$, so $sr^k s^{-1} = r^{-k}$, i.e., $sr^k = r^{-k}s$, so $r^k s = s r^{-k}$ — good): $s r^2 s r^4 = s (r^2 s) r^4 = s(sr^{-2})r^4 = (s^2)r^{-2}r^4 = r^2$. So $sr^2 \cdot sr^4 = r^2$ ✓. Continue verifying: all products of even-indexed reflections land in $\{e, r^2, r^4\}$, products of rotation and reflection land in reflections. Subgroup. ✓ Normal (index $2$). Call this $H_1$; isomorphic to $D_3$.
  - $\{e\} \cup [r^2] \cup [sr] = \{e, r^2, r^4, sr, sr^3, sr^5\}$: similar analysis. Subgroup, normal. Call this $H_2$; isomorphic to $D_3$.
  - Other combinations don't give subgroups (by similar checks).
- **Size $12$:** $D_6$ itself. Normal.

*Complete list of normal subgroups of $D_6$:*
1. $\{e\}$
2. $Z(D_6) = \{e, r^3\}$ (order $2$)
3. $\langle r^2\rangle = \{e, r^2, r^4\}$ (order $3$)
4. $\langle r\rangle = \{e, r, r^2, r^3, r^4, r^5\}$ (order $6$, index $2$)
5. $H_1 = \{e, r^2, r^4, s, sr^2, sr^4\}$ (order $6$, index $2$, $\cong D_3$)
6. $H_2 = \{e, r^2, r^4, sr, sr^3, sr^5\}$ (order $6$, index $2$, $\cong D_3$)
7. $D_6$ itself.

*Total: $7$ normal subgroups.*

*Verification.* The subgroup lattice is rich: $D_6$ is isomorphic to $D_3 \times \mathbb{Z}_2$ (since $\gcd(3, 2) = 1$ and $r^2$ has order $3$, $r^3$ has order $2$, they commute and generate $D_6$). This explains why there are several index-$2$ normal subgroups. $\blacksquare$

---

**Solution 7.** Compute $\mathbb{Z}/12\mathbb{Z}$ modulo $\langle 4 + 12\mathbb{Z}\rangle$.

*Setup.* $\mathbb{Z}/12\mathbb{Z} = \mathbb{Z}_{12}$, abelian of order $12$. Inside, $\overline 4 := 4 + 12\mathbb{Z}$ generates the cyclic subgroup $\langle \overline 4\rangle$.

*Compute $\langle \overline 4\rangle$.*
$$\overline 4, \;\overline 4 + \overline 4 = \overline 8, \; \overline 8 + \overline 4 = \overline{12} = \overline 0.$$
So $\langle \overline 4\rangle = \{\overline 0, \overline 4, \overline 8\}$, of order $3$.

*Normality.* $\mathbb{Z}_{12}$ abelian, so $\langle \overline 4\rangle$ normal. ✓

*Order of quotient.* $|\mathbb{Z}_{12}/\langle \overline 4\rangle| = 12/3 = 4$.

*Cosets.*
- $\overline 0 + \langle \overline 4\rangle = \{\overline 0, \overline 4, \overline 8\}$
- $\overline 1 + \langle \overline 4\rangle = \{\overline 1, \overline 5, \overline 9\}$
- $\overline 2 + \langle \overline 4\rangle = \{\overline 2, \overline 6, \overline{10}\}$
- $\overline 3 + \langle \overline 4\rangle = \{\overline 3, \overline 7, \overline{11}\}$

Four cosets. ✓

*Structure.* The quotient is generated by $\overline 1 + \langle \overline 4\rangle$:
$$(\overline 1 + \langle\overline 4\rangle) \cdot 1 = \overline 1 + \langle\overline 4\rangle, \quad \cdot 2 = \overline 2 + \langle\overline 4\rangle, \quad \cdot 3 = \overline 3 + \langle\overline 4\rangle, \quad \cdot 4 = \overline 4 + \langle\overline 4\rangle = \overline 0 + \langle\overline 4\rangle.$$

So the quotient is cyclic of order $4$:
$$\boxed{\mathbb{Z}_{12} / \langle \overline 4\rangle \cong \mathbb{Z}_4.}$$

*Verification via structure theorem.* $\mathbb{Z}_{12}/\langle 4\rangle$: since $\gcd(4, 12) = 4$, $\langle 4\rangle$ has order $12/4 = 3$. Quotient has order $12/3 = 4$. ✓

*Alternative route via Third Isomorphism Theorem.* $\mathbb{Z}_{12} \cong \mathbb{Z}/12\mathbb{Z}$. The subgroup $\langle \overline 4\rangle \subset \mathbb{Z}/12\mathbb{Z}$ corresponds to $4\mathbb{Z}/12\mathbb{Z} \subset \mathbb{Z}/12\mathbb{Z}$. The third isomorphism theorem (see [[18-isomorphism-theorems]]) gives
$$(\mathbb{Z}/12\mathbb{Z})/(4\mathbb{Z}/12\mathbb{Z}) \cong \mathbb{Z}/4\mathbb{Z} = \mathbb{Z}_4.$$
Matches.

*Interpretation.* Modding $\mathbb{Z}_{12}$ by multiples of $4$ reduces the clock from $12$ positions to $4$. Equivalently, this is $\mathbb{Z}$ reduced mod $4$. $\blacksquare$

---

## 10.9 Cross-References

**Previous:** [[09-cosets-and-lagranges-theorem]]

**Next:**
- [[11-direct-products]] — direct products give us ways to build groups from smaller pieces
- [[12-subgroup-lattice-and-dihedral]] — normal subgroups in specific groups
- [[17-homomorphisms-and-isomorphisms]] — kernels are normal
- [[18-isomorphism-theorems]] — FTH: $G/\ker \varphi \cong \text{image}(\varphi)$

**Takeaway.** Normal subgroups are exactly those for which the quotient $G/N$ makes sense as a group. They are the kernels of homomorphisms. The operation of taking quotients is how we "simplify" a group by collapsing an invariant subgroup to zero. Three equivalent perspectives:

1. **Conjugation-invariance:** $gNg^{-1} = N$ for all $g$.
2. **Coset equality:** $gN = Ng$ for all $g$ (left = right).
3. **Kernel:** $N = \ker\varphi$ for some homomorphism $\varphi : G \to H$.

Master these three, and the entire theory of quotient groups unfolds from them.
