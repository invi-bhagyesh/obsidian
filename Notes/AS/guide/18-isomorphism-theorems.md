---
title: "Isomorphism Theorems"
type: guide
co: CO3
related: [17-homomorphisms-and-isomorphisms, 10-normal-subgroups-and-quotient-groups, 11-direct-products]
---

# 18. Isomorphism Theorems

The **Isomorphism Theorems** are three structural identities relating subgroups, normal subgroups, and quotients. They are the backbone of group theory — virtually every non-trivial theorem about quotients eventually reduces to one of these three. This chapter proves all three in detail with worked examples, then applies them to compute quotients in concrete cases.

## 18.1 The First Isomorphism Theorem

> **Theorem 18.1 (First Isomorphism Theorem).** Let $\varphi: G \to H$ be a group homomorphism. Then $\ker \varphi \trianglelefteq G$, $\operatorname{Im} \varphi \le H$, and
> $$G / \ker \varphi \cong \operatorname{Im} \varphi$$
> via the map $\bar{\varphi}: g \ker \varphi \mapsto \varphi(g)$.

*Proof.* Let $N = \ker \varphi$. We already showed $N \trianglelefteq G$ and $\operatorname{Im} \varphi \le H$ in [[17-homomorphisms-and-isomorphisms]].

Define $\bar{\varphi}: G/N \to \operatorname{Im} \varphi$ by $\bar{\varphi}(gN) = \varphi(g)$.

**Well-defined.** If $gN = g'N$, then $g^{-1}g' \in N$, so $\varphi(g^{-1}g') = e$, giving $\varphi(g) = \varphi(g')$. ✓

**Homomorphism.** $\bar{\varphi}(gN \cdot g'N) = \bar{\varphi}(gg' N) = \varphi(gg') = \varphi(g)\varphi(g') = \bar{\varphi}(gN) \bar{\varphi}(g'N)$.

**Injective.** If $\bar{\varphi}(gN) = e$, then $\varphi(g) = e$, so $g \in N$, i.e., $gN = N$ = identity in $G/N$.

**Surjective.** Every element of $\operatorname{Im} \varphi$ is $\varphi(g) = \bar{\varphi}(gN)$ for some $g$. $\blacksquare$

### Universal property interpretation

Every homomorphism $\varphi: G \to H$ factors uniquely:
$$G \xrightarrow{\pi} G/N \xrightarrow{\bar{\varphi}} \operatorname{Im} \varphi \hookrightarrow H$$
where $\pi$ is the canonical surjection, $\bar{\varphi}$ is the induced isomorphism, and the last arrow is inclusion.

### Worked examples

**Example 1.** $\varphi: \mathbb{Z} \to \mathbb{Z}_n$, $\varphi(k) = k \bmod n$. Kernel = $n\mathbb{Z}$. Image = $\mathbb{Z}_n$. First Isomorphism: $\mathbb{Z}/n\mathbb{Z} \cong \mathbb{Z}_n$. (This is **the definition** of $\mathbb{Z}_n$.)

**Example 2.** $\det: GL_n(\mathbb{R}) \to \mathbb{R}^\times$. Kernel = $SL_n(\mathbb{R})$. Image = $\mathbb{R}^\times$. So $GL_n(\mathbb{R})/SL_n(\mathbb{R}) \cong \mathbb{R}^\times$.

**Example 3.** $\operatorname{sgn}: S_n \to \{\pm 1\}$. $S_n/A_n \cong \{\pm 1\} \cong \mathbb{Z}_2$.

**Example 4.** $\varphi: \mathbb{R} \to S^1$, $\varphi(t) = e^{2\pi i t}$. Kernel = $\mathbb{Z}$. Image = $S^1$. $\mathbb{R}/\mathbb{Z} \cong S^1$ — the circle is the real line modulo integers.

**Example 5 ($\operatorname{Inn}(G)$).** The map $c: G \to \operatorname{Aut}(G)$, $g \mapsto c_g$, has kernel $Z(G)$ and image $\operatorname{Inn}(G)$. So $G/Z(G) \cong \operatorname{Inn}(G)$.

### Recognizing quotients via the First Isomorphism Theorem

The First Isomorphism Theorem is the most common technique for identifying an unknown quotient:

> Strategy: to show $G/N \cong K$, construct a surjective homomorphism $\varphi: G \twoheadrightarrow K$ with $\ker \varphi = N$.

**Example 6.** Show $\mathbb{R}^\times / \{\pm 1\} \cong \mathbb{R}^+$.

*Proof.* Define $\varphi: \mathbb{R}^\times \to \mathbb{R}^+$ by $\varphi(x) = |x|$. Homomorphism: $|xy| = |x||y|$. Surjective: any $y > 0$ has $y = |y|$. Kernel: $|x| = 1$ iff $x = \pm 1$, so $\ker = \{\pm 1\}$. By First Isomorphism, $\mathbb{R}^\times / \{\pm 1\} \cong \mathbb{R}^+$. $\blacksquare$

**Example 7.** Show $(\mathbb{Z} \times \mathbb{Z}) / \langle (1, 1) \rangle \cong \mathbb{Z}$.

*Proof.* Define $\varphi: \mathbb{Z} \times \mathbb{Z} \to \mathbb{Z}$ by $\varphi(a, b) = a - b$. Homomorphism. Surjective ($\varphi(n, 0) = n$). Kernel: $a = b$, i.e., $(a, a) = a(1, 1)$, so $\ker = \langle (1, 1) \rangle$. $\blacksquare$

## 18.2 The Second Isomorphism Theorem

> **Theorem 18.2 (Second Isomorphism / "Diamond" Theorem).** Let $G$ be a group, $H \le G$, $N \trianglelefteq G$. Then:
>
> 1. $HN \le G$ is a subgroup.
> 2. $H \cap N \trianglelefteq H$.
> 3. $N \trianglelefteq HN$.
> 4. $(HN)/N \cong H / (H \cap N)$.

*Proof.*

**(1).** For $h_1 n_1, h_2 n_2 \in HN$: $(h_1 n_1)(h_2 n_2) = h_1 (n_1 h_2) n_2 = h_1 h_2 (h_2^{-1} n_1 h_2) n_2 = h_1 h_2 n_1' n_2 \in HN$ (using $N \trianglelefteq G$ so $h_2^{-1} n_1 h_2 \in N$). Closure ✓. Identity and inverses similarly.

**(2).** Clearly $H \cap N \le H$. Normality: for $h \in H$ and $x \in H \cap N$, $hxh^{-1} \in H$ (since $H$ subgroup) and $hxh^{-1} \in N$ (since $N \trianglelefteq G$). So $hxh^{-1} \in H \cap N$.

**(3).** $N \trianglelefteq G$ and $HN \le G$ imply $N \trianglelefteq HN$.

**(4).** Define $\varphi: H \to (HN)/N$ by $\varphi(h) = hN$. Homomorphism (obvious). Surjective: $(hn)N = hN = \varphi(h)$ for any $hn \in HN$. Kernel: $hN = N$ iff $h \in N$, iff $h \in H \cap N$. First Isomorphism gives $H/(H \cap N) \cong (HN)/N$. $\blacksquare$

### Mnemonic: The Diamond

Picture a diamond-shaped lattice:

```
        HN
       /  \
      H    N
       \  /
       H ∩ N
```

The "top" quotient $(HN)/N$ equals the "side" quotient $H/(H \cap N)$.

### Worked examples

**Example 8.** In $G = \mathbb{Z}$, let $H = 4\mathbb{Z}$ and $N = 6\mathbb{Z}$. Both normal (abelian). Compute:
- $H \cap N = \operatorname{lcm}(4, 6)\mathbb{Z} = 12\mathbb{Z}$.
- $HN = H + N = \gcd(4, 6)\mathbb{Z} = 2\mathbb{Z}$.

Second Isomorphism: $(2\mathbb{Z})/(6\mathbb{Z}) \cong (4\mathbb{Z})/(12\mathbb{Z})$.

LHS: $2\mathbb{Z}/6\mathbb{Z}$ has 3 cosets: $\{0, 2, 4, \ldots\}, \{2\}, \{4\}$ modulo $6\mathbb{Z}$. It's $\cong \mathbb{Z}_3$.
RHS: $4\mathbb{Z}/12\mathbb{Z}$ has 3 cosets. Also $\cong \mathbb{Z}_3$. ✓

**Example 9.** $G = S_4$, $H = S_3 \le S_4$ (permutations fixing 4), $N = V_4 \trianglelefteq S_4$ (Klein four in $S_4$: $\{e, (1\,2)(3\,4), (1\,3)(2\,4), (1\,4)(2\,3)\}$).

$H \cap V_4 = \{e\}$ (non-identity elements of $V_4$ move 4, not in $S_3$).
$HN = S_3 \cdot V_4$: $|HN| = |H| \cdot |N| / |H \cap N| = 6 \cdot 4 / 1 = 24 = |S_4|$, so $HN = S_4$.

Second Isomorphism: $S_4/V_4 \cong S_3/\{e\} = S_3$. $\boxed{S_4/V_4 \cong S_3}$

## 18.3 The Third Isomorphism Theorem

> **Theorem 18.3 (Third Isomorphism / "Cancellation" Theorem).** Let $G$ be a group, $N \trianglelefteq G$, $K \trianglelefteq G$, with $K \le N$. Then $N/K \trianglelefteq G/K$, and
> $$(G/K) / (N/K) \cong G/N.$$

*Proof.* $K \trianglelefteq G$ and $K \le N$ imply $K \trianglelefteq N$, so $N/K$ makes sense.

Define $\varphi: G/K \to G/N$ by $\varphi(gK) = gN$. Well-defined: if $gK = g'K$, then $g^{-1}g' \in K \le N$, so $gN = g'N$. Homomorphism obvious. Surjective: any $gN = \varphi(gK)$.

Kernel: $\varphi(gK) = N$ iff $g \in N$ iff $gK \in N/K$. So $\ker \varphi = N/K$.

First Isomorphism: $(G/K)/(N/K) \cong G/N$. $\blacksquare$

### Mnemonic: Cancellation

$$\frac{G/K}{N/K} = \frac{G}{N}.$$

As if the $K$'s "cancel."

### Worked examples

**Example 10.** $G = \mathbb{Z}$, $N = 6\mathbb{Z}$, $K = 12\mathbb{Z}$. $K \le N$.

$G/K = \mathbb{Z}/12\mathbb{Z} = \mathbb{Z}_{12}$. $N/K = 6\mathbb{Z}/12\mathbb{Z}$, which inside $\mathbb{Z}_{12}$ is $\{0, 6\} \cong \mathbb{Z}_2$.

Third Isomorphism: $\mathbb{Z}_{12} / \{0, 6\} \cong \mathbb{Z}/6\mathbb{Z} = \mathbb{Z}_6$.

Check: $\mathbb{Z}_{12}$ modulo $\{0, 6\}$ has 6 cosets, isomorphic to $\mathbb{Z}_6$. ✓

**Example 11.** $G = D_4$, $K = Z(D_4) = \langle r^2 \rangle$, $N = \langle r \rangle$. Both normal, $K \le N$.

$D_4 / K \cong V_4$ (Example 4 of [[12-subgroup-lattice-and-dihedral-groups]]).
$N / K = \langle r \rangle / \langle r^2 \rangle \cong \mathbb{Z}_2$.
Third Isomorphism: $V_4 / \mathbb{Z}_2 \cong D_4/\langle r \rangle \cong \mathbb{Z}_2$. ✓

## 18.4 The Correspondence Theorem

Not always stated as "fourth isomorphism theorem" but equally important:

> **Theorem 18.4 (Correspondence / Lattice Theorem).** Let $G$ be a group, $N \trianglelefteq G$. There is a bijection between:
> - Subgroups $H$ of $G$ with $N \le H \le G$
> - Subgroups of $G/N$
>
> given by $H \mapsto H/N$. This bijection preserves inclusion, normality, indices, and quotients.

*Proof sketch.* Inverse: for $\overline{K} \le G/N$, pull back via $\pi: G \to G/N$ to get $\pi^{-1}(\overline{K}) = \{g \in G : gN \in \overline{K}\}$, which contains $N$ and is a subgroup. These two maps are inverses. $\blacksquare$

### Applications

**Example 12.** Subgroups of $\mathbb{Z}_{12} = \mathbb{Z}/12\mathbb{Z}$ correspond to subgroups of $\mathbb{Z}$ containing $12\mathbb{Z}$, i.e., $d\mathbb{Z}$ for $d \mid 12$. Thus subgroups of $\mathbb{Z}_{12}$ are in bijection with divisors of 12. ✓ (This was already known from [[06-cyclic-groups-and-order]].)

**Example 13.** To find subgroups of $\mathbb{Z}_{12}/\langle 4 \rangle$: $\langle 4 \rangle = \{0, 4, 8\}$ and the quotient has order 4. Subgroups of the quotient correspond to subgroups of $\mathbb{Z}_{12}$ containing $\langle 4 \rangle = \{0, 4, 8\}$. These are $\langle 4 \rangle, \langle 2 \rangle, \mathbb{Z}_{12}$ — three subgroups. The quotient $\mathbb{Z}_{12}/\langle 4 \rangle \cong \mathbb{Z}_4$ has 3 subgroups. ✓

## 18.5 Combined Applications

**Example 14.** Find all normal subgroups of $S_4$.

*Strategy.* Use the correspondence: normal subgroups of $S_4$ containing $V_4$ are in bijection with normal subgroups of $S_4/V_4 \cong S_3$. Normal subgroups of $S_3$: $\{e\}, A_3, S_3$. So normal subgroups of $S_4$ containing $V_4$ are $V_4$, $A_4$, $S_4$.

Also: $\{e\}$ is normal trivially.

Normal subgroups not containing $V_4$: must be contained in a proper normal structure; one can check $A_4$ is the only non-trivial proper normal subgroup besides those listed.

**Full list.** $\{e\}, V_4, A_4, S_4$.

## 18.6 Summary Table of Isomorphism Theorems

| Theorem | Hypothesis | Conclusion |
|---|---|---|
| **First** | $\varphi: G \to H$ homomorphism | $G/\ker\varphi \cong \operatorname{Im}\varphi$ |
| **Second** | $H \le G$, $N \trianglelefteq G$ | $HN/N \cong H/(H \cap N)$ |
| **Third** | $K \le N \trianglelefteq G$, $K \trianglelefteq G$ | $(G/K)/(N/K) \cong G/N$ |
| **Correspondence** | $N \trianglelefteq G$ | Subgroups of $G/N$ ↔ subgroups of $G$ containing $N$ |

## 18.7 Practice Problems

**Problem 1.** Use the First Isomorphism Theorem to show $\mathbb{C}^\times / \mathbb{R}^+ \cong S^1$.

**Problem 2.** Show $GL_n(\mathbb{R})/SL_n(\mathbb{R}) \cong \mathbb{R}^\times$.

**Problem 3.** In $G = \mathbb{Z}$, let $H = 15\mathbb{Z}$ and $N = 10\mathbb{Z}$. Verify the Second Isomorphism Theorem.

**Problem 4.** Use the Third Isomorphism Theorem to compute $(\mathbb{Z}/24\mathbb{Z})/(8\mathbb{Z}/24\mathbb{Z})$.

**Problem 5.** Let $G = \mathbb{Z}_6 \times \mathbb{Z}_4$ and $N = \mathbb{Z}_6 \times \{0\}$. Compute $G/N$.

**Problem 6.** Find all subgroups of $D_4 / Z(D_4)$.

**Problem 7.** Show that $S_4 / A_4 \cong \mathbb{Z}_2$ using the First Isomorphism Theorem.

### Solutions

**1.** Define $\varphi: \mathbb{C}^\times \to S^1$, $\varphi(z) = z/|z|$. Homomorphism: $(z_1 z_2)/|z_1 z_2| = (z_1/|z_1|)(z_2/|z_2|)$ ✓. Surjective: $\varphi(e^{i\theta}) = e^{i\theta}$. Kernel: $z/|z| = 1$ iff $z = |z| > 0$, so $\ker = \mathbb{R}^+$. First Iso: $\mathbb{C}^\times/\mathbb{R}^+ \cong S^1$. $\blacksquare$

**2.** Use $\det$. Kernel = $SL_n(\mathbb{R})$, image = $\mathbb{R}^\times$. $\blacksquare$

**3.** $H \cap N = \operatorname{lcm}(15, 10)\mathbb{Z} = 30\mathbb{Z}$. $HN = H + N = \gcd(15, 10)\mathbb{Z} = 5\mathbb{Z}$. Second Iso: $5\mathbb{Z}/10\mathbb{Z} \cong 15\mathbb{Z}/30\mathbb{Z}$. Both are $\cong \mathbb{Z}_2$. ✓

**4.** $(\mathbb{Z}/24\mathbb{Z})/(8\mathbb{Z}/24\mathbb{Z}) \cong \mathbb{Z}/8\mathbb{Z} = \mathbb{Z}_8$. $\boxed{\mathbb{Z}_8}$

**5.** $G/N = (\mathbb{Z}_6 \times \mathbb{Z}_4)/(\mathbb{Z}_6 \times \{0\}) \cong \mathbb{Z}_4$. (Projection onto second factor is surjective with kernel $N$.) $\boxed{\mathbb{Z}_4}$

**6.** $Z(D_4) = \langle r^2 \rangle$. $D_4/Z(D_4) \cong V_4$. Subgroups of $V_4$: 5 total ($\{e\}$, three copies of $\mathbb{Z}_2$, $V_4$). By correspondence, there are 5 subgroups of $D_4$ containing $\langle r^2 \rangle$. $\boxed{5\text{ subgroups}}$

**7.** $\operatorname{sgn}: S_4 \to \{\pm 1\} \cong \mathbb{Z}_2$ is a homomorphism with kernel $A_4$ and image $\mathbb{Z}_2$. First Iso: $S_4/A_4 \cong \mathbb{Z}_2$. $\blacksquare$

## Related Concepts

- [[17-homomorphisms-and-isomorphisms]] — foundational machinery
- [[10-normal-subgroups-and-quotient-groups]] — quotient group construction
- [[11-direct-products]] — direct product decompositions as special quotients
- [[19-rings-definition-and-examples]] — analogous theorems for rings

---

*Last updated: 2026-04-18*
