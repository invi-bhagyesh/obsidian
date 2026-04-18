# 10. Normal Subgroups and Quotient Groups

> **The construction we've been waiting for.** Given any subgroup $H \leq G$, the cosets partition $G$. But when can we turn the set of cosets into a *group* by defining $(aH)(bH) := (ab)H$? The answer: when $H$ is **normal** — a special class of subgroups that are invariant under conjugation. This chapter defines normal subgroups, constructs the **quotient group** $G/H$, and shows how to use it to "kill" parts of a group we don't care about.

---

## 10.1 Normal Subgroups

> **Definition.** A subgroup $N \leq G$ is **normal** (written $N \triangleleft G$) if $gNg^{-1} = N$ for every $g \in G$. Equivalently:
> $$\forall g \in G, \forall n \in N : gng^{-1} \in N.$$

**Equivalent conditions.** $N \triangleleft G$ iff:
1. $gNg^{-1} \subseteq N$ for all $g$ (one-direction sufficient by inverse).
2. $gN = Ng$ for all $g$ (left = right cosets).
3. $gng^{-1} \in N$ for all $g, n$.

*Proof of equivalence.* (1) $\Leftrightarrow$ (3) is restatement. (1) $\Rightarrow$ (2): $gN \subseteq (gNg^{-1})g = Ng$; reverse by $g^{-1}$. (2) $\Rightarrow$ (1): $gN = Ng \Rightarrow gNg^{-1} = N$. $\blacksquare$

### Normality is not transitive

If $K \triangleleft H \triangleleft G$, we **cannot** conclude $K \triangleleft G$. Counter-example: in $S_4$, $V = \{e, (1\,2)(3\,4), (1\,3)(2\,4), (1\,4)(2\,3)\} \triangleleft A_4 \triangleleft S_4$; the two-element subgroup $\{e, (1\,2)(3\,4)\}$ is normal in $V$ (since $V$ is abelian) but not normal in $S_4$.

---

## 10.2 Examples of Normal Subgroups

**Example 1 (Trivial cases).** $\{e\}$ and $G$ are always normal in $G$.

**Example 2 (Every subgroup of an abelian group).** If $G$ is abelian, $gNg^{-1} = gg^{-1}N = N$. Every subgroup is normal.

**Example 3 (Center).** $Z(G) \triangleleft G$. In fact every subgroup of $Z(G)$ is normal in $G$.

*Proof.* For $z \in Z(G)$, $g z g^{-1} = g g^{-1} z = z$ (commutativity with $g$). $\blacksquare$

**Example 4 (Kernel of a homomorphism).** If $\varphi : G \to H$ is a homomorphism, $\ker \varphi \triangleleft G$. (Proved in [[17-homomorphisms-and-isomorphisms]].)

**Example 5 (Index 2 subgroups are normal).** Proved in [[09-cosets-and-lagranges-theorem]] Example 5.

**Example 6 (In $S_n$).** $A_n \triangleleft S_n$ (index 2). Conversely, the subgroup $\{e, (1\,2)\}$ is **not** normal in $S_3$: $(1\,3)(1\,2)(1\,3)^{-1} = (2\,3) \notin \{e, (1\,2)\}$.

**Example 7 (In $D_4$).** The rotations $\langle r \rangle = \{1, r, r^2, r^3\}$ are normal (index 2). $\{1, r^2\}$ is normal (it's the center $Z(D_4)$). But $\{1, s\}$ is **not** normal: $r s r^{-1} = s r^{-2} \cdot \ldots$ wait, compute: $rsr^{-1} = rs \cdot r^{-1} = r \cdot r^{-1} s \cdot r^{-2} = ?$. Use $sr^{-1} = rs$: $rsr^{-1} = r(sr^{-1}) \cdot \ldots$. Alternative: $rsr^{-1} = r \cdot s r^3 = r \cdot r^{-3} s = r \cdot r s = r^2 s$. So $r\{1, s\}r^{-1} = \{1, r^2 s\} \neq \{1, s\}$. Not normal. (Only $\{1, r^2\}$ and $\langle r \rangle$ and $\{1, r^2, s, sr^2\}$, $\{1, r^2, sr, sr^3\}$, plus $D_4$ itself are normal in $D_4$.)

---

## 10.3 The Quotient Group $G/N$

> **Theorem 10.1 (Construction of quotient group).** Let $N \triangleleft G$. The set of cosets
> $$G/N := \{gN : g \in G\}$$
> is a group under the operation
> $$(aN)(bN) := (ab)N.$$

*Proof.*
1. **Well-defined:** if $aN = a'N$ and $bN = b'N$, we need $(ab)N = (a'b')N$, i.e., $(ab)^{-1}(a'b') \in N$, i.e., $b^{-1}a^{-1}a'b' \in N$. Now $a^{-1}a' \in N$ (since $aN = a'N$), and normality gives $b^{-1}(a^{-1}a')b \in N$; also $b^{-1}b' \in N$. Product: $(b^{-1}a^{-1}a'b)(b^{-1}b') \cdot$ wait, let me redo: $b^{-1}a^{-1}a'b' = (b^{-1}a^{-1}a'b) \cdot (b^{-1}b')$, and both factors are in $N$. ✓
2. **Associativity:** $((aN)(bN))(cN) = (abN)(cN) = (abc)N = (aN)((bc)N) = (aN)((bN)(cN))$.
3. **Identity:** $eN = N$. $(aN)(eN) = aN$. ✓
4. **Inverse:** $(aN)(a^{-1}N) = (aa^{-1})N = eN$. ✓

So $G/N$ is a group. $\blacksquare$

### Order of $G/N$

$|G/N| = [G : N] = |G| / |N|$ (by Lagrange, when $G$ is finite).

**Example 8.** $|\mathbb{Z}/5\mathbb{Z}| = 5$. $|\mathbb{Z}_{12} / \langle 3 \rangle| = 12/4 = 3$. $|S_3/A_3| = 6/3 = 2 = |\mathbb{Z}_2|$.

---

## 10.4 Why "$N$ normal" is essential for well-definedness

Consider $G = S_3$ and $H = \{e, (1\,2)\}$ (not normal). Try to define $(aH)(bH) = (ab)H$. Take $a = (1\,3)$, $b = (2\,3)$. Then
- $aH = \{(1\,3), (1\,3)(1\,2)\} = \{(1\,3), (1\,3\,2)\}$.
- $bH = \{(2\,3), (2\,3)(1\,2)\} = \{(2\,3), (1\,2\,3)\}$.
- $(ab)H = ((1\,3)(2\,3))H = (1\,2\,3)H = \{(1\,2\,3), (1\,3)\}$... 

But pick a different representative: $a = (1\,3\,2)$ (same coset as $(1\,3)$ since $(1\,3)^{-1}(1\,3\,2) = (1\,2) \in H$); $b = (1\,2\,3)$ (same coset as $(2\,3)$). Then
- $(ab)H = ((1\,3\,2)(1\,2\,3))H = (e)H = H$.

**Different answer!** $(1\,2\,3)H \neq H$. So the operation is **not well-defined** on $S_3 / H$. That's why normality is required.

---

## 10.5 Example: $\mathbb{Z}_n$ as a Quotient

$\mathbb{Z}/n\mathbb{Z} = \{0 + n\mathbb{Z}, 1 + n\mathbb{Z}, \ldots, (n-1) + n\mathbb{Z}\}$. Since $\mathbb{Z}$ is abelian, $n\mathbb{Z}$ is automatically normal. The group operation on cosets:
$$(a + n\mathbb{Z}) + (b + n\mathbb{Z}) = (a+b) + n\mathbb{Z}.$$

This is exactly addition mod $n$. So $\mathbb{Z}/n\mathbb{Z} \cong \mathbb{Z}_n$ as groups.

---

## 10.6 Simple Groups

> **Definition.** A group $G \neq \{e\}$ is **simple** if its only normal subgroups are $\{e\}$ and $G$.

Simple groups are the "atoms" of finite group theory — they cannot be further decomposed via quotients.

**Examples:**
- $\mathbb{Z}_p$ for $p$ prime (only subgroups are $\{0\}$ and $\mathbb{Z}_p$, both normal).
- $A_n$ for $n \geq 5$ (classical; proof is combinatorial).
- $\text{PSL}_n(\mathbb{F}_q)$ for most $n, q$ (projective special linear groups over finite fields).

**Non-example:** $A_4$ is not simple — $V_4 \triangleleft A_4$.

**Classification of finite simple groups** (CFSG, 1983, ~10000 pages): the finite simple groups are
- $\mathbb{Z}_p$ (cyclic of prime order)
- $A_n$ for $n \geq 5$
- 16 infinite families of "Lie type"
- 26 sporadic groups (including the Monster).

A monumental theorem.

---

## 10.7 Worked Examples

**Example 9 (Quotient $\mathbb{Z}/6\mathbb{Z}$).** Describe.

*Solution.* $\mathbb{Z}/6\mathbb{Z} = \{0+6\mathbb{Z}, 1+6\mathbb{Z}, 2+6\mathbb{Z}, 3+6\mathbb{Z}, 4+6\mathbb{Z}, 5+6\mathbb{Z}\}$. Six cosets. Isomorphic to $\mathbb{Z}_6$. $\blacksquare$

**Example 10 (Quotient $D_4 / \{1, r^2\}$).** Compute.

*Solution.* Index 4 subgroup. Four cosets: $\{1, r^2\}, \{r, r^3\}, \{s, sr^2\}, \{sr, sr^3\}$. Name them $e', a, b, c$. Check $a^2 = r^2 \cdot \{1, r^2\} = \{r^2, 1\} = e'$. Similarly $b^2 = s^2 \{1, r^2\} = \{1, r^2\} = e'$. $c^2 = ?$ $(sr)^2 = srsr = s \cdot r^{-1}s \cdot r = s s r^{-1} r = 1$. So $c^2 = e'$. And $ab = rs \{1, r^2\} = \{rs, rs \cdot r^2\} = \{rs, r \cdot r^{-2} s\} = \{rs, r^{-1} s\} = \{r^3 s, r s\}$... hmm, in $D_4$ we have $rs = sr^{-1} = sr^3$. So $ab$-coset = $\{sr^3, sr\} = c$. So $ab = c$. Structure: $V_4$. $\boxed{D_4 / \{1, r^2\} \cong V_4}$. $\blacksquare$

**Example 11 (Abelianization).** The quotient $D_n / [D_n, D_n]$ kills all commutators. For $D_4$: commutator $[r, s] = rsr^{-1}s^{-1} = r \cdot sr^{-1}s^{-1} = r \cdot (sr^{-1})s^{-1}$. Using $sr = r^{-1}s$: $sr^{-1} = rs$. So $[r,s] = r \cdot rs \cdot s^{-1} = r^2$. So $[D_4, D_4] = \langle r^2 \rangle$. Abelianization: $D_4/\langle r^2\rangle \cong V_4$. $\blacksquare$

**Example 12 (Quotient of $\mathbb{Z} \times \mathbb{Z}$).** $(\mathbb{Z} \times \mathbb{Z})/\langle (2, 3) \rangle$: what is this quotient?

*Solution.* $\langle (2, 3) \rangle = \{(2k, 3k) : k \in \mathbb{Z}\}$ — one-dimensional sublattice. Quotient is a rank-1 group; in fact $\cong \mathbb{Z}$ (since $\gcd(2, 3) = 1$, use Smith normal form). $\blacksquare$

---

## 10.8 Practice Problems

1. List all normal subgroups of $S_3$.
2. Show that the intersection of two normal subgroups is normal.
3. Is $\mathbb{Z}_6 / \langle 2 \rangle$ cyclic? What order?
4. Prove: if $G/Z(G)$ is cyclic, then $G$ is abelian.
5. Show: $A_n \triangleleft S_n$ for all $n$.
6. In $D_6$, find all normal subgroups.
7. Compute $\mathbb{Z}/12\mathbb{Z}$ modulo $\langle 4 + 12\mathbb{Z} \rangle$.

### Solutions

**Solution 1.** Subgroups of $S_3$: $\{e\}, \{e, (1\,2)\}, \{e, (1\,3)\}, \{e, (2\,3)\}, A_3, S_3$. Normal: $\{e\}, A_3, S_3$. The 2-element subgroups are **not** normal (conjugate to each other). $\blacksquare$

**Solution 2.** $N_1, N_2 \triangleleft G$. For $g \in G, n \in N_1 \cap N_2$: $gng^{-1} \in N_1$ (by normality of $N_1$) and $\in N_2$. So $\in N_1 \cap N_2$. $\blacksquare$

**Solution 3.** $\langle 2 \rangle = \{0, 2, 4\}$. $|\mathbb{Z}_6/\langle 2\rangle| = 2$. Cyclic, $\cong \mathbb{Z}_2$. $\blacksquare$

**Solution 4.** Let $G/Z(G) = \langle g Z(G)\rangle$. Every coset is $g^k Z(G)$ for some $k \in \mathbb{Z}$. So every $x \in G$ is $x = g^k z$ for some $z \in Z(G)$. Take $x, y \in G$: $x = g^k z$, $y = g^m w$. Then $xy = g^k z g^m w = g^{k+m} z w$ (using $z, w \in Z(G)$ commute with $g$). Similarly $yx = g^{k+m} w z = g^{k+m} z w$. Equal. $\blacksquare$

**Solution 5.** $A_n$ has index 2 in $S_n$. Index-2 subgroups are normal. $\blacksquare$

**Solution 6.** $D_6 = \langle r, s : r^6 = s^2 = 1, srs = r^{-1}\rangle$, $|D_6| = 12$. Normal subgroups:
- $\{1\}$
- $Z(D_6) = \{1, r^3\}$
- $\langle r^2\rangle = \{1, r^2, r^4\}$, order 3 (also $\langle r^3 \rangle$ noted).
- $\langle r \rangle = \{1, r, \ldots, r^5\}$, order 6 (index 2)
- $\{1, r^2, r^4, s, sr^2, sr^4\}$ (order 6, index 2, $\cong D_3$)
- $\{1, r^2, r^4, sr, sr^3, sr^5\}$ (order 6, index 2, $\cong D_3$)
- $D_6$

All index-2 subgroups are normal. Beyond those: $\langle r^3\rangle, \langle r^2 \rangle, \langle r \rangle$ (rotation subgroups are normal). $\blacksquare$

**Solution 7.** $\mathbb{Z}_{12}/\langle 4\rangle$: $\langle 4 \rangle = \{0, 4, 8\}$. Quotient has $12/3 = 4$ elements; cyclic of order 4: $\cong \mathbb{Z}_4$. $\blacksquare$

---

## 10.9 Cross-References

**Previous:** [[09-cosets-and-lagranges-theorem]]

**Next:**
- [[11-direct-products]] — direct products give us ways to build groups from smaller pieces
- [[12-subgroup-lattice-and-dihedral]] — normal subgroups in specific groups
- [[17-homomorphisms-and-isomorphisms]] — kernels are normal
- [[18-isomorphism-theorems]] — FTH: $G/\ker \varphi \cong \text{image}(\varphi)$

**Takeaway.** Normal subgroups are exactly those for which the quotient $G/N$ makes sense as a group. They are the kernels of homomorphisms. The operation of taking quotients is how we "simplify" a group by collapsing an invariant subgroup to zero.
