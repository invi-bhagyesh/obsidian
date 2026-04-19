---
title: "Isomorphism Theorems"
type: guide
co: CO3
related: [17-homomorphisms-and-isomorphisms, 10-normal-subgroups-and-quotient-groups, 11-direct-products]
---

# 18. Isomorphism Theorems

The **Isomorphism Theorems** are three structural identities relating subgroups, normal subgroups, and quotients. They are the backbone of group theory — virtually every non-trivial theorem about quotients eventually reduces to one of these three. This chapter proves all three in full detail with worked examples, then applies them to compute quotients in concrete cases.

The theorems answer three distinct but closely related questions:

1. **(First)** Given a homomorphism $\varphi: G \to H$, what is $G/\ker\varphi$?
2. **(Second)** Given a subgroup $H$ and normal subgroup $N$, how do $HN/N$ and $H/(H \cap N)$ compare?
3. **(Third)** If $K \trianglelefteq N \trianglelefteq G$ (with $K \trianglelefteq G$ too), can we "cancel" $K$ in an iterated quotient?

A fourth result, the **Correspondence Theorem**, is sometimes called the Fourth Isomorphism Theorem; it classifies subgroups of a quotient $G/N$.

---

## 18.1 The First Isomorphism Theorem

> **Theorem 18.1 (First Isomorphism Theorem).** Let $\varphi: G \to H$ be a group homomorphism. Then $\ker \varphi \trianglelefteq G$, $\operatorname{Im} \varphi \le H$, and
> $$G / \ker \varphi \cong \operatorname{Im} \varphi$$
> via the map $\bar{\varphi}: g \ker \varphi \mapsto \varphi(g)$.

**Proof.** Let $N = \ker \varphi$. We already established $N \trianglelefteq G$ and $\operatorname{Im} \varphi \le H$ in [[17-homomorphisms-and-isomorphisms]]; we recall the arguments briefly, then construct the isomorphism.

*Recall: $N \trianglelefteq G$.* For $g \in G$ and $n \in N$,
$$\varphi(g n g^{-1}) = \varphi(g)\varphi(n)\varphi(g^{-1}) = \varphi(g) \cdot e_H \cdot \varphi(g)^{-1} = e_H,$$
so $g n g^{-1} \in N$. Hence $g N g^{-1} \subseteq N$ for all $g$, which is the normality condition.

*Recall: $\operatorname{Im}\varphi \le H$.* Clearly $e_H = \varphi(e_G) \in \operatorname{Im}\varphi$. For $h_1 = \varphi(g_1), h_2 = \varphi(g_2) \in \operatorname{Im}\varphi$, $h_1 h_2 = \varphi(g_1)\varphi(g_2) = \varphi(g_1 g_2) \in \operatorname{Im}\varphi$, and $h_1^{-1} = \varphi(g_1)^{-1} = \varphi(g_1^{-1}) \in \operatorname{Im}\varphi$. So $\operatorname{Im}\varphi$ is closed under product and inverse, hence a subgroup of $H$.

Now **define** $\bar{\varphi}: G/N \to \operatorname{Im} \varphi$ by
$$\bar{\varphi}(gN) = \varphi(g).$$

We verify that $\bar\varphi$ is a well-defined bijective homomorphism; that is, we check (1) well-definedness, (2) homomorphism property, (3) injectivity, and (4) surjectivity. The name "well-defined" is crucial because the input $gN$ is a coset, not a single element; we must ensure the output does not depend on the chosen representative.

**(1) Well-defined.** Suppose $gN = g'N$. We must show $\varphi(g) = \varphi(g')$.

From $gN = g'N$ and the coset-equality criterion ([[09-cosets-and-lagranges-theorem]]): $g^{-1}g' \in N$. By definition of $N = \ker\varphi$,
$$\varphi(g^{-1} g') = e_H.$$
Expanding the left side using the homomorphism property,
$$\varphi(g^{-1})\varphi(g') = e_H \implies \varphi(g)^{-1}\varphi(g') = e_H \implies \varphi(g') = \varphi(g).$$
Hence $\bar\varphi(gN) = \varphi(g) = \varphi(g') = \bar\varphi(g'N)$. The map is well-defined. $\checkmark$

**(2) Homomorphism.** For $gN, g'N \in G/N$, recall that the quotient operation is $(gN)(g'N) = (gg')N$. Compute:
$$\bar{\varphi}\bigl((gN)(g'N)\bigr) = \bar{\varphi}(gg' N) = \varphi(gg') = \varphi(g)\varphi(g') = \bar{\varphi}(gN)\,\bar{\varphi}(g'N).$$
The first equality uses the definition of quotient multiplication, the second the definition of $\bar\varphi$, the third is $\varphi$ being a homomorphism, and the fourth reverses the definition of $\bar\varphi$. $\checkmark$

**(3) Injective.** Show $\ker\bar\varphi$ is trivial. Suppose $\bar{\varphi}(gN) = e_H$ (the identity of $\operatorname{Im}\varphi$, which is the same as the identity of $H$). Then $\varphi(g) = e_H$, so $g \in \ker\varphi = N$, hence $gN = N$, the identity coset of $G/N$. So $\ker\bar\varphi = \{N\}$, the trivial subgroup. A homomorphism with trivial kernel is injective (standard fact: $\bar\varphi(aN) = \bar\varphi(bN) \implies \bar\varphi(aN)\bar\varphi(bN)^{-1} = e \implies \bar\varphi(ab^{-1}N) = e \implies ab^{-1}N = N \implies aN = bN$). $\checkmark$

**(4) Surjective.** Every element of $\operatorname{Im}\varphi$ has the form $\varphi(g)$ for some $g \in G$, and $\varphi(g) = \bar\varphi(gN)$. So every element of $\operatorname{Im}\varphi$ is in the image of $\bar\varphi$. $\checkmark$

Having verified all four conditions, $\bar\varphi$ is an isomorphism $G/N \xrightarrow{\sim} \operatorname{Im}\varphi$. $\blacksquare$

**Remark (why uniqueness of $\bar\varphi$).** The map $\bar\varphi$ is not just *an* isomorphism; it is the **unique** isomorphism making the diagram
$$G \xrightarrow{\pi} G/N \xrightarrow{\bar{\varphi}} H$$
commute with $\bar\varphi \circ \pi = \varphi$. This universal property characterizes $G/N$ up to unique isomorphism among all groups equipped with a homomorphism from $G$ killing $N$. (See remark on universal property below.)

### Universal property interpretation

Every homomorphism $\varphi: G \to H$ factors canonically through its kernel:
$$G \xrightarrow{\pi} G/N \xrightarrow{\bar{\varphi}} \operatorname{Im} \varphi \hookrightarrow H$$
where:
- $\pi: G \twoheadrightarrow G/N$ is the canonical **surjection** (a surjective homomorphism),
- $\bar{\varphi}: G/N \xrightarrow{\sim} \operatorname{Im}\varphi$ is the induced **isomorphism** (from Theorem 18.1),
- $\operatorname{Im}\varphi \hookrightarrow H$ is the **inclusion** (an injective homomorphism).

In categorical language, every homomorphism has a canonical (surjection $\circ$ iso $\circ$ inclusion) factorization. This is often called the **First Isomorphism Theorem in diagrammatic form**.

### Worked examples

**Example 1 (Defining $\mathbb{Z}_n$).**

*Setup.* Reduction mod $n$: $\varphi: \mathbb{Z} \to \mathbb{Z}_n$, $\varphi(k) = k \bmod n$, where $\mathbb{Z}_n = \{0, 1, \ldots, n-1\}$ under addition mod $n$.

*Strategy.* Apply Theorem 18.1 directly.

*Computation.*
- **Homomorphism:** $(k + \ell) \bmod n = (k \bmod n) + (\ell \bmod n) \pmod n$. $\checkmark$
- **Kernel:** $\varphi(k) = 0 \iff n \mid k \iff k \in n\mathbb{Z}$. So $\ker\varphi = n\mathbb{Z}$.
- **Image:** $\varphi$ surjects onto $\mathbb{Z}_n$ (every residue class is $\varphi$ of its least non-negative representative).

First Isomorphism: $\mathbb{Z}/n\mathbb{Z} \cong \mathbb{Z}_n$.

*Interpretation.* This is literally the **definition** of $\mathbb{Z}_n$ as a quotient: the set of cosets $\{k + n\mathbb{Z} : k \in \mathbb{Z}\}$ with coset-addition. The First Isomorphism Theorem reconciles the two constructions — residues $\{0, 1, \ldots, n-1\}$ on the one hand, and cosets on the other.

---

**Example 2 ($GL_n$ modulo $SL_n$).**

*Setup.* Determinant: $\det: GL_n(\mathbb{R}) \to \mathbb{R}^\times$, $A \mapsto \det A$.

*Strategy.* Apply Theorem 18.1.

*Computation.*
- **Homomorphism:** $\det(AB) = \det A \cdot \det B$ (multiplicativity of determinant). $\checkmark$
- **Kernel:** $\det A = 1 \iff A \in SL_n(\mathbb{R})$. So $\ker = SL_n(\mathbb{R})$.
- **Image:** For any $\lambda \in \mathbb{R}^\times$, the diagonal matrix $\operatorname{diag}(\lambda, 1, 1, \ldots, 1)$ has determinant $\lambda$, so $\det$ is surjective.

First Isomorphism: $GL_n(\mathbb{R})/SL_n(\mathbb{R}) \cong \mathbb{R}^\times$.

*Verification.* The index $[GL_n : SL_n]$ must equal $|\mathbb{R}^\times|$. Both are uncountable, consistent with the isomorphism. (For a finite-group analogue, consider $GL_n(\mathbb{F}_q) / SL_n(\mathbb{F}_q) \cong \mathbb{F}_q^\times$, both of order $q - 1$.)

*Interpretation.* The "size" of $GL_n$ modulo "volume-preserving" transformations is exactly the scalar stretching factor $\mathbb{R}^\times$ — an algebraic version of "every linear transformation is a volume-preserving map times a scaling." $\blacksquare$

---

**Example 3 (Sign of a permutation).**

*Setup.* $\operatorname{sgn}: S_n \to \{\pm 1\}$, the sign homomorphism assigning $+1$ to even permutations and $-1$ to odd permutations.

*Computation.*
- **Homomorphism:** Standard result on parity of permutations ([[05-permutation-and-dihedral-groups]]): $\operatorname{sgn}(\sigma\tau) = \operatorname{sgn}(\sigma)\operatorname{sgn}(\tau)$.
- **Kernel:** $\ker = A_n$, the alternating group (even permutations).
- **Image:** For $n \ge 2$, $(1\,2)$ is odd, so $\operatorname{sgn}$ surjects onto $\{\pm 1\}$.

First Isomorphism: $S_n/A_n \cong \{\pm 1\} \cong \mathbb{Z}_2$.

*Verification.* $|S_n/A_n| = n!/(n!/2) = 2 = |\mathbb{Z}_2|$. $\checkmark$

---

**Example 4 (Circle as quotient).**

*Setup.* $\varphi: \mathbb{R} \to S^1$, $\varphi(t) = e^{2\pi i t}$, where $S^1 = \{z \in \mathbb{C} : |z| = 1\}$ is the unit circle (under multiplication). Here $\mathbb{R}$ is an additive group, $S^1$ is multiplicative.

*Computation.*
- **Homomorphism:** $\varphi(s + t) = e^{2\pi i(s+t)} = e^{2\pi i s} \cdot e^{2\pi i t} = \varphi(s)\varphi(t)$. $\checkmark$
- **Kernel:** $e^{2\pi i t} = 1 \iff 2\pi t \in 2\pi\mathbb{Z} \iff t \in \mathbb{Z}$. So $\ker\varphi = \mathbb{Z}$.
- **Image:** Any $z \in S^1$ can be written $z = e^{i\theta}$ for $\theta \in \mathbb{R}$; take $t = \theta/(2\pi)$, then $\varphi(t) = z$. Surjective.

First Isomorphism: $\mathbb{R}/\mathbb{Z} \cong S^1$.

*Interpretation (topological-geometric).* The real line $\mathbb{R}$ "wraps around" to form a circle when we identify points differing by an integer — that is, glue $t \sim t + 1$. The map $\varphi$ realizes this geometric wrapping algebraically. $\blacksquare$

---

**Example 5 (Inner automorphisms and the center).**

*Setup.* For a group $G$, define $c: G \to \operatorname{Aut}(G)$ by $c(g) = c_g$, where $c_g: G \to G$ is the conjugation map $c_g(x) = gxg^{-1}$.

*Strategy.* Show $c$ is a homomorphism, identify $\ker c$ as $Z(G)$ (the center), and identify $\operatorname{Im} c$ as $\operatorname{Inn}(G)$ (the inner automorphisms). Then apply Theorem 18.1.

*Computation.*
- **$c_g$ is an automorphism:** $c_g(xy) = g(xy)g^{-1} = (gxg^{-1})(gyg^{-1}) = c_g(x)c_g(y)$, and $c_g$ has inverse $c_{g^{-1}}$.
- **$c$ is a homomorphism:** $c_{g_1 g_2}(x) = (g_1 g_2) x (g_1 g_2)^{-1} = g_1 (g_2 x g_2^{-1}) g_1^{-1} = c_{g_1}(c_{g_2}(x)) = (c_{g_1} \circ c_{g_2})(x)$. Hence $c(g_1 g_2) = c_{g_1} \circ c_{g_2}$.
- **Kernel:** $c_g = \operatorname{id}_G$ iff $gxg^{-1} = x$ for all $x$, iff $gx = xg$ for all $x$, iff $g \in Z(G)$.
- **Image:** By definition $\operatorname{Inn}(G) = \{c_g : g \in G\} = \operatorname{Im} c$.

First Isomorphism: $G/Z(G) \cong \operatorname{Inn}(G)$.

*Consequence.* If $Z(G) = \{e\}$ (e.g., $G = S_n$ for $n \ge 3$), then $G \cong \operatorname{Inn}(G) \le \operatorname{Aut}(G)$ — the group embeds into its own automorphism group.

*Consequence (the "$G/Z(G)$ cyclic $\Rightarrow G$ abelian" lemma).* If $G/Z(G)$ is cyclic, then $\operatorname{Inn}(G)$ is cyclic, so all conjugations are powers of one, which (via a short argument) forces $G$ to be abelian. $\blacksquare$

---

### Recognizing quotients via the First Isomorphism Theorem

The First Isomorphism Theorem is the primary tool for identifying an unknown quotient:

> **Strategy.** To prove $G/N \cong K$, it suffices to construct a **surjective** homomorphism $\varphi: G \twoheadrightarrow K$ with $\ker\varphi = N$. The First Isomorphism Theorem then yields $G/N \cong K$ automatically.

This converts the (often annoying) task of "describing $G/N$ explicitly by listing cosets and their products" into the much easier task of "finding a surjection with the right kernel."

**Example 6.** Show $\mathbb{R}^\times / \{\pm 1\} \cong \mathbb{R}^+$ (where $\mathbb{R}^+ = \mathbb{R}_{>0}$ under multiplication).

*Setup.* We seek a surjection $\mathbb{R}^\times \twoheadrightarrow \mathbb{R}^+$ with kernel $\{\pm 1\}$.

*Strategy.* The absolute value $|\cdot|: \mathbb{R}^\times \to \mathbb{R}^+$ is the natural candidate.

*Computation.* Let $\varphi(x) = |x|$.
- **Homomorphism:** $|xy| = |x||y|$ for real $x, y$. $\checkmark$
- **Surjective:** For any $y > 0$, $\varphi(y) = |y| = y$. $\checkmark$
- **Kernel:** $|x| = 1 \iff x = \pm 1$. So $\ker\varphi = \{\pm 1\}$. $\checkmark$

*Verification.* $\{\pm 1\} \trianglelefteq \mathbb{R}^\times$ automatically (abelian), so the quotient makes sense.

By the First Isomorphism Theorem, $\mathbb{R}^\times/\{\pm 1\} \cong \mathbb{R}^+$.

*Interpretation.* Every non-zero real equals $\pm 1$ times its absolute value; the quotient forgets the sign and remembers only the positive magnitude. $\blacksquare$

---

**Example 7.** Show $(\mathbb{Z} \times \mathbb{Z})/\langle (1, 1)\rangle \cong \mathbb{Z}$.

*Setup.* The subgroup $\langle (1,1)\rangle = \{(n, n) : n \in \mathbb{Z}\}$ is the "diagonal" copy of $\mathbb{Z}$ inside $\mathbb{Z} \times \mathbb{Z}$.

*Strategy.* Find a surjection $\mathbb{Z} \times \mathbb{Z} \twoheadrightarrow \mathbb{Z}$ with kernel exactly the diagonal.

*Computation.* Let $\varphi(a, b) = a - b$.
- **Homomorphism:** $\varphi((a, b) + (c, d)) = \varphi(a + c, b + d) = (a + c) - (b + d) = (a - b) + (c - d) = \varphi(a, b) + \varphi(c, d)$. $\checkmark$
- **Surjective:** For any $n \in \mathbb{Z}$, $\varphi(n, 0) = n$. $\checkmark$
- **Kernel:** $a - b = 0 \iff a = b \iff (a, b) = (a, a) = a \cdot (1, 1) \in \langle(1,1)\rangle$. $\checkmark$

By Theorem 18.1, $(\mathbb{Z} \times \mathbb{Z})/\langle(1, 1)\rangle \cong \mathbb{Z}$.

*Verification (geometric).* The cosets of $\langle(1,1)\rangle$ in $\mathbb{Z}^2$ are "anti-diagonals" $\{(a, b) : a - b = n\}$ for $n \in \mathbb{Z}$. These are in bijection with $\mathbb{Z}$ via $n$. $\blacksquare$

*Remark.* One could also use $\varphi(a, b) = a + b$ to get $(\mathbb{Z}^2)/\langle(1, -1)\rangle \cong \mathbb{Z}$ — same idea, different subgroup.

---

## 18.2 The Second Isomorphism Theorem

> **Theorem 18.2 (Second Isomorphism / "Diamond" Theorem).** Let $G$ be a group, $H \le G$ a subgroup, and $N \trianglelefteq G$ a normal subgroup. Then:
>
> 1. $HN \le G$ is a subgroup.
> 2. $H \cap N \trianglelefteq H$.
> 3. $N \trianglelefteq HN$.
> 4. $(HN)/N \cong H/(H \cap N)$.

**Proof.** We prove each claim in turn.

---

**(1) $HN$ is a subgroup of $G$.**

Here $HN = \{hn : h \in H, n \in N\}$. We check non-emptiness, closure, and inverses.

*Non-empty:* $e = e \cdot e \in HN$. $\checkmark$

*Closure:* Take $h_1 n_1, h_2 n_2 \in HN$. Compute
$$(h_1 n_1)(h_2 n_2) = h_1 (n_1 h_2) n_2.$$

We need to rewrite $n_1 h_2$ as (element of $H$) $\cdot$ (element of $N$). Insert $h_2 h_2^{-1} = e$:
$$n_1 h_2 = h_2 (h_2^{-1} n_1 h_2).$$

Now $h_2^{-1} n_1 h_2 \in N$ because $N \trianglelefteq G$ (conjugation by $h_2 \in G$ preserves $N$). Call this element $n_1' := h_2^{-1} n_1 h_2 \in N$.

Hence
$$(h_1 n_1)(h_2 n_2) = h_1 \cdot h_2 n_1' \cdot n_2 = (h_1 h_2)(n_1' n_2) \in HN,$$
since $h_1 h_2 \in H$ (subgroup) and $n_1' n_2 \in N$ (subgroup). $\checkmark$

*Inverses:* For $hn \in HN$,
$$(hn)^{-1} = n^{-1} h^{-1} = h^{-1}(h n^{-1} h^{-1}) \in HN,$$
using the same trick: $h^{-1} \in H$, and $h n^{-1} h^{-1} \in N$ by normality of $N$. Alternatively, $(hn)^{-1} = n^{-1} h^{-1}$; set $h' = h^{-1}, n' = h (h^{-1})^{-1} n^{-1} h^{-1} = h^{-1} \cdot h n^{-1} h^{-1}$... Let's do it cleanly: write $(hn)^{-1} = n^{-1} h^{-1}$. This is in $NH$, and we need $NH = HN$.

*Key fact: $NH = HN$ whenever $N \trianglelefteq G$.* Proof: $nh = h (h^{-1} n h) = h n''$ with $n'' = h^{-1} n h \in N$. So $nh \in HN$, hence $NH \subseteq HN$. Reverse: $hn = (hnh^{-1})h = n''' h$ with $n''' = hnh^{-1} \in N$, so $HN \subseteq NH$. Equality. $\checkmark$

Therefore $(hn)^{-1} \in NH = HN$. $\checkmark$

So $HN$ is a subgroup. $\blacksquare_{(1)}$

---

**(2) $H \cap N \trianglelefteq H$.**

First, $H \cap N \le H$: intersection of two subgroups is a subgroup, and $H \cap N \subseteq H$.

Normality in $H$: for $h \in H$ and $x \in H \cap N$, we show $hxh^{-1} \in H \cap N$.
- $hxh^{-1} \in H$: because $h, x \in H$ (using $x \in H \cap N \subseteq H$) and $H$ is closed under conjugation by its own elements.
- $hxh^{-1} \in N$: because $h \in G$ (since $H \le G$), $x \in N$, and $N \trianglelefteq G$ so conjugation by $h$ preserves $N$.

Hence $hxh^{-1} \in H \cap N$, establishing $h(H \cap N)h^{-1} \subseteq H \cap N$ for all $h \in H$. So $H \cap N \trianglelefteq H$. $\blacksquare_{(2)}$

*Remark.* Note that $H \cap N$ need **not** be normal in $G$ in general — only in $H$. But if $H \trianglelefteq G$ and $N \trianglelefteq G$, then $H \cap N \trianglelefteq G$ as well.

---

**(3) $N \trianglelefteq HN$.**

$N \trianglelefteq G$ and $HN \le G$. So for any $g \in HN \subseteq G$, $gNg^{-1} \subseteq N$ (normality of $N$ in the larger group $G$). Hence $N \trianglelefteq HN$. $\blacksquare_{(3)}$

*Remark.* This step is essentially free from (1) plus the assumption $N \trianglelefteq G$.

---

**(4) $(HN)/N \cong H/(H \cap N)$ — the main isomorphism.**

*Setup.* Define $\varphi: H \to (HN)/N$ by
$$\varphi(h) = hN.$$

We verify $\varphi$ is a surjective homomorphism with kernel $H \cap N$, then invoke the First Isomorphism Theorem.

**Homomorphism.** For $h_1, h_2 \in H$:
$$\varphi(h_1 h_2) = (h_1 h_2) N = (h_1 N)(h_2 N) = \varphi(h_1) \varphi(h_2),$$
using $N \trianglelefteq HN$ so coset multiplication is well-defined. $\checkmark$

**Surjective.** Any element of $(HN)/N$ has the form $(hn)N$ for some $h \in H, n \in N$. But $(hn)N = h \cdot (nN) = h \cdot N = hN = \varphi(h)$, since $nN = N$ (element $n$ lies in $N$, so its coset is the identity coset). So every coset in $(HN)/N$ is in the image of $\varphi$. $\checkmark$

**Kernel.** $\varphi(h) = N$ (identity coset in $(HN)/N$) iff $hN = N$ iff $h \in N$. Combined with $h \in H$: $h \in H \cap N$. So $\ker\varphi = H \cap N$. $\checkmark$

**Apply Theorem 18.1.** $\varphi$ is a surjective homomorphism $H \to (HN)/N$ with kernel $H \cap N$. Hence
$$H/(H \cap N) \cong (HN)/N. \qquad \blacksquare_{(4)} \blacksquare$$

*Consequence (index formula).* If everything is finite:
$$\frac{|HN|}{|N|} = \frac{|H|}{|H \cap N|} \quad \implies \quad |HN| = \frac{|H| \cdot |N|}{|H \cap N|}.$$
This is the classical **product formula for subgroup orders** — often useful on its own.

---

### Mnemonic: The Diamond

Picture a diamond-shaped portion of the subgroup lattice of $G$:

```
            HN
           /  \
          H    N
           \  /
           H ∩ N
```

Going **up** from $H$ to $HN$ is "the same" (as a quotient) as going **up** from $H \cap N$ to $H$. Formally:
$$\underbrace{\frac{HN}{N}}_{\text{top/right side}} \;\cong\; \underbrace{\frac{H}{H \cap N}}_{\text{left/bottom side}}.$$

Conceptually: you can measure the "distance" from $H \cap N$ to $H$ either by going around the left side or by going up the right side — both yield the same quotient group.

---

### Worked examples

**Example 8.** In $G = \mathbb{Z}$, let $H = 4\mathbb{Z}$ and $N = 6\mathbb{Z}$.

*Setup.* Both $H, N$ are normal (since $G$ is abelian). Verify the Second Isomorphism Theorem.

*Strategy.* Compute $H \cap N$ and $HN$ using the standard formulas for intersections and sums of subgroups of $\mathbb{Z}$.

*Computation.*

**$H \cap N$:** $a \in 4\mathbb{Z} \cap 6\mathbb{Z} \iff 4 \mid a$ and $6 \mid a \iff \operatorname{lcm}(4, 6) \mid a \iff 12 \mid a$. So $H \cap N = 12\mathbb{Z}$.

**$HN = H + N$:** Since $G = \mathbb{Z}$ is written additively, $HN = H + N = 4\mathbb{Z} + 6\mathbb{Z}$. By Bézout (see Solution D3 below), $4\mathbb{Z} + 6\mathbb{Z} = \gcd(4, 6)\mathbb{Z} = 2\mathbb{Z}$.

Second Isomorphism Theorem: $(2\mathbb{Z})/(6\mathbb{Z}) \cong (4\mathbb{Z})/(12\mathbb{Z})$.

**Verification.**

*LHS $2\mathbb{Z}/6\mathbb{Z}$:* The cosets are $\{0 + 6\mathbb{Z}, 2 + 6\mathbb{Z}, 4 + 6\mathbb{Z}\}$ — three cosets. Adding $2$ cycles through: $0 \to 2 \to 4 \to 0$. Cyclic of order $3$. So $2\mathbb{Z}/6\mathbb{Z} \cong \mathbb{Z}_3$.

*RHS $4\mathbb{Z}/12\mathbb{Z}$:* Cosets $\{0 + 12\mathbb{Z}, 4 + 12\mathbb{Z}, 8 + 12\mathbb{Z}\}$ — three cosets. Adding $4$ cycles $0 \to 4 \to 8 \to 0$. Cyclic of order $3$. So $4\mathbb{Z}/12\mathbb{Z} \cong \mathbb{Z}_3$.

Both sides $\cong \mathbb{Z}_3$. $\checkmark$

*Order check.* $|H|/|H \cap N| = [H : H \cap N] = \operatorname{lcm}(4,6)/4 = 12/4 = 3$, and $|HN|/|N| = [HN : N] = 6/2 = 3$. Both $3$. $\checkmark$

*Interpretation.* The Second Isomorphism Theorem for cyclic subgroups of $\mathbb{Z}$ becomes the well-known identity
$$\operatorname{lcm}(m, n) \cdot \gcd(m, n) = mn,$$
since $[mn : \operatorname{lcm}(m,n)\mathbb{Z}]$ can be computed either as $\operatorname{lcm}(m,n)/m = n/\gcd(m,n)$ or as $n/\gcd(m,n)$. $\blacksquare$

---

**Example 9 ($S_4/V_4 \cong S_3$).**

*Setup.* $G = S_4$, $H = S_3 \le S_4$ (permutations fixing $4$, so $S_3$ acts on $\{1, 2, 3\}$), and $N = V_4 \trianglelefteq S_4$ where
$$V_4 = \{e, (1\,2)(3\,4), (1\,3)(2\,4), (1\,4)(2\,3)\}.$$

*Strategy.* Apply Theorem 18.2 after verifying hypotheses.

*Verify hypotheses.*
- $H = S_3 \le S_4$: clear (it's the stabilizer of $\{4\}$).
- $N = V_4 \trianglelefteq S_4$: the three non-identity elements of $V_4$ are the three permutations of cycle type $(2, 2)$, and cycle type is a conjugacy invariant, so conjugation by any $\sigma \in S_4$ sends $V_4 \to V_4$. Normal.

*Compute $H \cap N$.* An element of $V_4 \setminus \{e\}$ is a product of two $2$-cycles, none of which fixes $4$ (e.g., $(1\,2)(3\,4)$ moves $4 \to 3$). So the non-identity elements of $V_4$ all move $4$, hence none lies in $S_3$ (which fixes $4$). Therefore
$$H \cap N = \{e\}.$$

*Compute $HN$.* By the order formula,
$$|HN| = \frac{|H| \cdot |N|}{|H \cap N|} = \frac{6 \cdot 4}{1} = 24 = |S_4|.$$
Since $HN \le S_4$ and $|HN| = |S_4|$, we conclude $HN = S_4$.

**Second Isomorphism Theorem:**
$$\frac{S_4}{V_4} = \frac{HN}{N} \cong \frac{H}{H \cap N} = \frac{S_3}{\{e\}} \cong S_3.$$

$$\boxed{S_4/V_4 \cong S_3.}$$

*Interpretation.* Quotienting $S_4$ by $V_4$ collapses the four cosets to the action of $S_4$ on the three pairs $\{\{1,2\}, \{3,4\}\}, \{\{1,3\}, \{2,4\}\}, \{\{1,4\}, \{2,3\}\}$ — a faithful action of $S_4/V_4$ on three objects, realized as $S_3$. This is the classical "resolvent cubic" map underlying the solvability of quartic polynomials. $\blacksquare$

---

## 18.3 The Third Isomorphism Theorem

> **Theorem 18.3 (Third Isomorphism / "Cancellation" Theorem).** Let $G$ be a group, $N \trianglelefteq G$, $K \trianglelefteq G$, with $K \subseteq N$. Then $N/K \trianglelefteq G/K$, and
> $$(G/K) / (N/K) \cong G/N.$$

**Proof.**

*Preliminary: $K \trianglelefteq N$.* Since $K \trianglelefteq G$ and $N \le G$ with $K \subseteq N$, for any $n \in N \subseteq G$, $nKn^{-1} \subseteq K$. So $K \trianglelefteq N$, which justifies the formation of $N/K$ as a quotient group.

*Preliminary: $N/K \trianglelefteq G/K$.* Let $\pi: G \to G/K$ be the canonical surjection. Then $N/K = \pi(N) = \{nK : n \in N\}$. For any $gK \in G/K$:
$$(gK)(nK)(gK)^{-1} = (gng^{-1})K,$$
and $gng^{-1} \in N$ because $N \trianglelefteq G$. So $(gK)(nK)(gK)^{-1} \in N/K$, establishing $N/K \trianglelefteq G/K$. Hence the "outer" quotient $(G/K)/(N/K)$ makes sense.

Now the **main construction**. Define $\varphi: G/K \to G/N$ by
$$\varphi(gK) = gN.$$

We verify well-definedness, homomorphism, surjectivity, and identify the kernel.

**Well-defined.** Suppose $gK = g'K$. Then $g^{-1}g' \in K$. Since $K \subseteq N$, $g^{-1}g' \in N$, so $gN = g'N$. Hence $\varphi(gK) = gN = g'N = \varphi(g'K)$. $\checkmark$

This is the crucial step: the containment $K \subseteq N$ is precisely what makes $\varphi$ descend from $G/K$ to $G/N$. Geometrically, we're projecting from "finer" cosets to "coarser" cosets.

**Homomorphism.**
$$\varphi((gK)(g'K)) = \varphi((gg')K) = (gg')N = (gN)(g'N) = \varphi(gK)\varphi(g'K). \checkmark$$

**Surjective.** Any $gN \in G/N$ is the image $\varphi(gK)$ of $gK \in G/K$ — using the *same* $g$. $\checkmark$

**Kernel.** $\varphi(gK) = N$ (identity of $G/N$) $\iff gN = N \iff g \in N \iff gK \in N/K$ (using that $N/K = \{nK : n \in N\}$). So $\ker\varphi = N/K$. $\checkmark$

**Apply First Isomorphism Theorem.** $\varphi: G/K \twoheadrightarrow G/N$ is surjective with kernel $N/K$. Hence
$$(G/K)/(N/K) \cong G/N. \qquad \blacksquare$$

*Consequence.* "Taking quotients is associative": quotienting $G$ by $K$ and then by $N/K$ gives the same result as quotienting $G$ by $N$ directly.

*Formal interpretation.* Think of elements $g \in G$, cosets $gK \in G/K$, and double cosets $gN = (gK)(N/K) \in (G/K)/(N/K) \cong G/N$. Each layer refines the previous.

---

### Mnemonic: Cancellation

$$\frac{G/K}{N/K} = \frac{G}{N}.$$

The $K$'s "cancel" as if they were common factors in a fraction. This is a purely formal mnemonic — nothing literally cancels — but it captures the result.

---

### Worked examples

**Example 10.** $G = \mathbb{Z}$, $N = 6\mathbb{Z}$, $K = 12\mathbb{Z}$. Note $K \subseteq N$ ($12$ is a multiple of $6$).

*Setup.* Both $K$ and $N$ are normal (abelian group). Verify Theorem 18.3.

*Computation.*

$G/K = \mathbb{Z}/12\mathbb{Z} = \mathbb{Z}_{12}$ (cyclic of order $12$, elements $\{0, 1, \ldots, 11\}$).

$N/K = 6\mathbb{Z}/12\mathbb{Z}$. Inside $\mathbb{Z}_{12}$, the image of $6\mathbb{Z}$ under the projection $\mathbb{Z} \to \mathbb{Z}_{12}$ is $\{6\mathbb{Z} \bmod 12\} = \{0, 6\}$. So $N/K = \{0, 6\} \cong \mathbb{Z}_2$ as a subgroup of $\mathbb{Z}_{12}$.

$G/N = \mathbb{Z}/6\mathbb{Z} = \mathbb{Z}_6$ (cyclic of order $6$).

**Third Isomorphism Theorem:** $\mathbb{Z}_{12}/\{0, 6\} \cong \mathbb{Z}_6$.

*Verification.* Quotienting $\mathbb{Z}_{12}$ by $\{0, 6\}$ identifies $k \sim k + 6$ for $k \in \mathbb{Z}_{12}$. This produces six equivalence classes: $\{0, 6\}, \{1, 7\}, \{2, 8\}, \{3, 9\}, \{4, 10\}, \{5, 11\}$ — six cosets, forming a cyclic group of order $6$ (the coset of $1$ is a generator since $k \cdot 1 = k$ runs through all classes for $k = 0, \ldots, 5$ before repeating). So $\mathbb{Z}_{12}/\{0, 6\} \cong \mathbb{Z}_6$. $\checkmark$

*Alternative (direct).* Forget the intermediate. $\mathbb{Z}/6\mathbb{Z} = \mathbb{Z}_6$, so $G/N = \mathbb{Z}_6$. The RHS and LHS both equal $\mathbb{Z}_6$. Consistent. $\blacksquare$

---

**Example 11.** $G = D_4$, $K = Z(D_4) = \langle r^2\rangle$, $N = \langle r\rangle$. Both normal (see [[12-subgroup-lattice-and-dihedral-groups]]), and $K = \langle r^2\rangle \subseteq \langle r\rangle = N$.

*Setup.* Verify Theorem 18.3 and identify all the groups involved.

*Computation.*

$G/K = D_4/\langle r^2\rangle \cong V_4$ (Klein four-group) — see worked example in [[12-subgroup-lattice-and-dihedral-groups]], also Solution D2 below.

$N/K = \langle r\rangle/\langle r^2\rangle$: $\langle r\rangle = \{e, r, r^2, r^3\}$ has order $4$, $\langle r^2\rangle = \{e, r^2\}$ has order $2$. The quotient has order $4/2 = 2$, cyclic (quotient of a cyclic group is cyclic), so $N/K \cong \mathbb{Z}_2$.

$G/N = D_4/\langle r\rangle$: $\langle r\rangle$ has index $2$ in $D_4$, so the quotient has order $2$, isomorphic to $\mathbb{Z}_2$.

**Third Isomorphism Theorem:** $V_4/\mathbb{Z}_2 \cong D_4/\langle r\rangle \cong \mathbb{Z}_2$.

*Verification.* $V_4$ has three subgroups of order $2$. Quotienting $V_4$ by any of them gives $V_4/\mathbb{Z}_2$ of order $4/2 = 2$, hence $\cong \mathbb{Z}_2$. The specific subgroup used is the image of $\langle r\rangle$ in $V_4 = D_4/\langle r^2\rangle$. $\checkmark$

*Interpretation.* Two successive "halvings" of $D_4$ (first by the center $\langle r^2\rangle$ of order $2$, then by the image of $\langle r\rangle$ of order $2$) yield the same final quotient as a direct halving by $\langle r\rangle$ of order $4$. $\blacksquare$

---

## 18.4 The Correspondence Theorem

> **Theorem 18.4 (Correspondence / Lattice Theorem).** Let $G$ be a group, $N \trianglelefteq G$, and $\pi: G \to G/N$ the canonical projection. There is an inclusion-preserving bijection
> $$\Phi: \{H : N \le H \le G\} \xrightarrow{\sim} \{\overline K : \overline K \le G/N\}$$
> given by $H \mapsto H/N$ (equivalently $H \mapsto \pi(H)$). The inverse is $\overline K \mapsto \pi^{-1}(\overline K)$.
>
> This bijection preserves:
> - inclusion: $H_1 \le H_2 \iff H_1/N \le H_2/N$,
> - normality: $H \trianglelefteq G \iff H/N \trianglelefteq G/N$,
> - indices: $[H_2 : H_1] = [H_2/N : H_1/N]$ whenever $H_1 \le H_2$,
> - quotients (via Theorem 18.3 when $H_1 \trianglelefteq H_2$): $H_2/H_1 \cong (H_2/N)/(H_1/N)$.

**Proof.**

*Define the two maps.*
- Forward: $\Phi(H) = H/N = \pi(H) = \{hN : h \in H\}$ for $N \le H \le G$.
- Backward: $\Psi(\overline K) = \pi^{-1}(\overline K) = \{g \in G : gN \in \overline K\}$ for $\overline K \le G/N$.

**Step 1: $\Phi(H)$ is a subgroup of $G/N$.**

$\Phi(H) = \pi(H)$: the image of a subgroup under a homomorphism is a subgroup. $\checkmark$

**Step 2: $\Psi(\overline K)$ is a subgroup of $G$ containing $N$.**

$\Psi(\overline K) = \pi^{-1}(\overline K)$: the preimage of a subgroup under a homomorphism is a subgroup. $\checkmark$ Furthermore, every $n \in N$ has $\pi(n) = N = e_{G/N} \in \overline K$ (since $\overline K$ is a subgroup and contains the identity), so $n \in \Psi(\overline K)$. Hence $N \subseteq \Psi(\overline K)$. $\checkmark$

**Step 3: $\Phi$ and $\Psi$ are mutually inverse.**

*$\Psi(\Phi(H)) = H$ for $H$ containing $N$.* Take $g \in \Psi(\Phi(H)) = \pi^{-1}(H/N)$. This means $gN \in H/N$, i.e., $gN = hN$ for some $h \in H$. So $g^{-1}h \in N \subseteq H$, hence $g = h(h^{-1}g) \in H$ (since $h \in H$ and $h^{-1}g \in N \subseteq H$). So $\Psi(\Phi(H)) \subseteq H$.

Conversely, for $h \in H$: $\pi(h) = hN \in H/N = \Phi(H)$, so $h \in \pi^{-1}(\Phi(H)) = \Psi(\Phi(H))$. Hence $H \subseteq \Psi(\Phi(H))$.

Equality. $\checkmark$

*$\Phi(\Psi(\overline K)) = \overline K$ for $\overline K \le G/N$.* $\Phi(\Psi(\overline K)) = \pi(\pi^{-1}(\overline K)) = \overline K$ because $\pi$ is surjective (image of preimage of a surjection is the original set). $\checkmark$

**Step 4: Inclusion preservation.**

$H_1 \le H_2 \implies \pi(H_1) \subseteq \pi(H_2)$, so $\Phi(H_1) \le \Phi(H_2)$.
Conversely, if $\Phi(H_1) \le \Phi(H_2)$, then $\Psi$ (inclusion-preserving by the same argument) gives $H_1 = \Psi(\Phi(H_1)) \le \Psi(\Phi(H_2)) = H_2$. $\checkmark$

**Step 5: Normality preservation.**

If $H \trianglelefteq G$, then for any $gN \in G/N$ and $hN \in H/N$:
$$(gN)(hN)(gN)^{-1} = (ghg^{-1})N \in H/N,$$
since $ghg^{-1} \in H$. So $H/N \trianglelefteq G/N$. Conversely, if $H/N \trianglelefteq G/N$, reverse the argument using $\Psi$.

**Step 6: Index preservation.** For $N \le H_1 \le H_2 \le G$, the cosets of $H_1$ in $H_2$ are in bijection with the cosets of $H_1/N$ in $H_2/N$ via $h H_1 \mapsto (hN)(H_1/N)$. So $[H_2 : H_1] = [H_2/N : H_1/N]$.

**Step 7: Quotient preservation.** If additionally $H_1 \trianglelefteq H_2$, then by the Third Isomorphism Theorem applied to $H_2 \supseteq H_1 \supseteq N$:
$$H_2/H_1 \cong (H_2/N)/(H_1/N).$$

$\blacksquare$

*Consequence.* The subgroup lattice of $G/N$ is **isomorphic as a poset** to the sub-lattice of $G$ consisting of subgroups containing $N$. This is why the Correspondence Theorem is also called the **Lattice Theorem**.

---

### Applications

**Example 12 (Subgroups of $\mathbb{Z}_{12}$).**

*Setup.* Apply the Correspondence Theorem to $G = \mathbb{Z}$ and $N = 12\mathbb{Z}$.

*Computation.* Subgroups of $\mathbb{Z}_{12} = \mathbb{Z}/12\mathbb{Z}$ correspond bijectively to subgroups of $\mathbb{Z}$ containing $12\mathbb{Z}$.

Subgroups of $\mathbb{Z}$ containing $12\mathbb{Z}$: these are $d\mathbb{Z}$ for $d \mid 12$ (since $d\mathbb{Z} \supseteq 12\mathbb{Z} \iff d \mid 12$). Divisors of $12$: $1, 2, 3, 4, 6, 12$.

So subgroups of $\mathbb{Z}_{12}$ are in bijection with $\{1, 2, 3, 4, 6, 12\}$ — **six** subgroups.

*Verification.* Concretely, the subgroups of $\mathbb{Z}_{12}$ are:
- $d = 1$: $\langle 1\rangle = \mathbb{Z}_{12}$, order $12$.
- $d = 2$: $\langle 2\rangle = \{0, 2, 4, 6, 8, 10\}$, order $6$.
- $d = 3$: $\langle 3\rangle = \{0, 3, 6, 9\}$, order $4$.
- $d = 4$: $\langle 4\rangle = \{0, 4, 8\}$, order $3$.
- $d = 6$: $\langle 6\rangle = \{0, 6\}$, order $2$.
- $d = 12$: $\langle 0\rangle = \{0\}$, order $1$.

Six subgroups, matching the count. Note that the order of $\langle d\rangle$ in $\mathbb{Z}_{12}$ is $12/d$. $\checkmark$

This result was already known from [[06-cyclic-groups-and-order]] ("subgroups of a cyclic group of order $n$ are in bijection with divisors of $n$"); the Correspondence Theorem recovers it effortlessly. $\blacksquare$

---

**Example 13 (Subgroups of a quotient).**

*Setup.* Find the subgroups of $\mathbb{Z}_{12}/\langle 4\rangle$.

*Strategy.* By the Correspondence Theorem, these correspond to subgroups of $\mathbb{Z}_{12}$ containing $\langle 4\rangle$.

*Computation.*

$\langle 4\rangle = \{0, 4, 8\}$ in $\mathbb{Z}_{12}$, order $3$.

Subgroups of $\mathbb{Z}_{12}$ containing $\{0, 4, 8\}$: these are cyclic $\langle d\rangle$ where $\langle d\rangle \supseteq \{0, 4, 8\}$, equivalently $d \mid 4$, equivalently $d \in \{1, 2, 4\}$. So:
- $\langle 1\rangle = \mathbb{Z}_{12}$,
- $\langle 2\rangle = \{0, 2, 4, 6, 8, 10\}$,
- $\langle 4\rangle = \{0, 4, 8\}$.

Three subgroups of $\mathbb{Z}_{12}$ containing $\langle 4\rangle$.

*Verification.* $\mathbb{Z}_{12}/\langle 4\rangle$ has order $12/3 = 4$. By Theorem 18.3, $\mathbb{Z}_{12}/\langle 4\rangle \cong \mathbb{Z}/4\mathbb{Z} = \mathbb{Z}_4$. And $\mathbb{Z}_4$ has exactly $3$ subgroups (trivial, the order-$2$ one, and itself). Bijection confirmed. $\checkmark$ $\blacksquare$

---

## 18.5 Combined Applications

**Example 14 (Normal subgroups of $S_4$).**

*Setup.* Find all normal subgroups of $S_4$.

*Strategy.* Use the Correspondence Theorem: normal subgroups of $S_4$ containing $V_4$ correspond to normal subgroups of $S_4/V_4 \cong S_3$ (Example 9). For normal subgroups not containing $V_4$, argue by direct inspection.

*Step 1: Normal subgroups of $S_3$.*

$S_3 = \{e, (1\,2), (1\,3), (2\,3), (1\,2\,3), (1\,3\,2)\}$, order $6$. Its subgroups (all) are:
- $\{e\}$, trivial.
- Three order-$2$ subgroups $\langle(1\,2)\rangle, \langle(1\,3)\rangle, \langle(2\,3)\rangle$ — none normal (they're conjugate to each other: $(1\,2)(1\,3)(1\,2) = (2\,3)$).
- $A_3 = \langle(1\,2\,3)\rangle$, order $3$. Normal (index $2$).
- $S_3$ itself. Normal.

So normal subgroups of $S_3$: $\{e\}, A_3, S_3$.

*Step 2: Normal subgroups of $S_4$ containing $V_4$.*

By correspondence, these are pullbacks of $\{e\}, A_3, S_3$ through $S_4 \twoheadrightarrow S_4/V_4 \cong S_3$:
- $\{e\} \leftrightarrow V_4$.
- $A_3 \leftrightarrow $ preimage of $A_3$, a subgroup of $S_4$ of order $4 \cdot 3 = 12$, which is $A_4$ (the preimage of even permutations under $S_4/V_4 \to \mathbb{Z}_2$ composition; more directly, $A_4 \supseteq V_4$ and $A_4/V_4 \cong \mathbb{Z}_3 = A_3$).
- $S_3 \leftrightarrow S_4$.

So normal subgroups of $S_4$ containing $V_4$: $V_4, A_4, S_4$.

*Step 3: Normal subgroups of $S_4$ not containing $V_4$.*

A normal subgroup $N \trianglelefteq S_4$ is a union of conjugacy classes. The conjugacy classes of $S_4$ (by cycle type):
- $\{e\}$: $1$ element.
- $2$-cycles: $\binom{4}{2} = 6$ elements.
- $3$-cycles: $8$ elements.
- $4$-cycles: $6$ elements.
- $(2,2)$-cycles: $3$ elements.

Normal subgroups are unions of some of these classes, including $\{e\}$, whose total order divides $|S_4| = 24$.

Systematic check of possible unions (with $e$ included):
- $\{e\}$: order $1$. ✓
- $\{e\} \cup \{(2,2)\}$: $1 + 3 = 4$. This is $V_4$. ✓
- $\{e\} \cup \{3\text{-cycles}\} \cup \{(2,2)\}$: $1 + 8 + 3 = 12$. This is $A_4$. ✓
- $\{e\} \cup \{2\text{-cycles}\} \cup \ldots$: $1 + 6 = 7$, not a divisor of $24$. ✗
- $\{e\} \cup \{4\text{-cycles}\} \cup \ldots$: $1 + 6 = 7$, not a divisor. ✗
- $\{e\} \cup$ everything $= S_4$: order $24$. ✓

Other unions either don't close (e.g., the product of two $2$-cycles is a $(2,2)$ or $3$-cycle, so including $2$-cycles forces including more), or don't have order dividing $24$.

**Full list:** $\{e\}, V_4, A_4, S_4$ — four normal subgroups of $S_4$.

*Verification.* This matches the well-known result (see any graduate algebra text): $S_4$ has precisely these four normal subgroups, a finite list reflecting its "nearly simple" structure. $\blacksquare$

---

## 18.6 Summary Table of Isomorphism Theorems

| Theorem | Hypothesis | Conclusion |
|---|---|---|
| **First** | $\varphi: G \to H$ homomorphism | $G/\ker\varphi \cong \operatorname{Im}\varphi$ |
| **Second** | $H \le G$, $N \trianglelefteq G$ | $HN/N \cong H/(H \cap N)$ |
| **Third** | $K \trianglelefteq G$, $N \trianglelefteq G$, $K \subseteq N$ | $(G/K)/(N/K) \cong G/N$ |
| **Correspondence** | $N \trianglelefteq G$ | Subgroups of $G/N$ ↔ subgroups of $G$ containing $N$ |

**Strategic summary.**
- The **First** Theorem is the most frequently invoked: it converts "compute a quotient" into "find a surjection with the right kernel."
- The **Second** Theorem computes $HN/N$ when both $H$ and $N$ are known; the formula $|HN| = |H||N|/|H \cap N|$ is a useful corollary.
- The **Third** Theorem is a simplification tool: it lets you reduce nested quotients.
- The **Correspondence** Theorem is the organizational tool: it reduces subgroup-theoretic questions about $G/N$ to questions about $G$.

---

## 18.7 Practice Problems

**Problem 1.** Use the First Isomorphism Theorem to show $\mathbb{C}^\times / \mathbb{R}^+ \cong S^1$.

**Problem 2.** Show $GL_n(\mathbb{R})/SL_n(\mathbb{R}) \cong \mathbb{R}^\times$.

**Problem 3.** In $G = \mathbb{Z}$, let $H = 15\mathbb{Z}$ and $N = 10\mathbb{Z}$. Verify the Second Isomorphism Theorem.

**Problem 4.** Use the Third Isomorphism Theorem to compute $(\mathbb{Z}/24\mathbb{Z})/(8\mathbb{Z}/24\mathbb{Z})$.

**Problem 5.** Let $G = \mathbb{Z}_6 \times \mathbb{Z}_4$ and $N = \mathbb{Z}_6 \times \{0\}$. Compute $G/N$.

**Problem 6.** Find all subgroups of $D_4/Z(D_4)$.

**Problem 7.** Show that $S_4/A_4 \cong \mathbb{Z}_2$ using the First Isomorphism Theorem.

---

### Solutions

**Solution 1.** Show $\mathbb{C}^\times/\mathbb{R}^+ \cong S^1$.

*Setup.* $\mathbb{C}^\times = \mathbb{C} \setminus \{0\}$ under multiplication, $\mathbb{R}^+ = \mathbb{R}_{>0}$ under multiplication, $S^1 = \{z \in \mathbb{C} : |z| = 1\}$ under multiplication.

*Strategy.* Construct a surjection $\varphi: \mathbb{C}^\times \to S^1$ with kernel $\mathbb{R}^+$.

*Construction.* Define
$$\varphi: \mathbb{C}^\times \to S^1, \qquad \varphi(z) = \frac{z}{|z|}.$$
For $z \neq 0$, $|z| > 0$ so $z/|z|$ is well-defined, and $|z/|z|| = |z|/|z| = 1$, so $z/|z| \in S^1$.

*Verify homomorphism.* For $z_1, z_2 \in \mathbb{C}^\times$:
$$\varphi(z_1 z_2) = \frac{z_1 z_2}{|z_1 z_2|} = \frac{z_1 z_2}{|z_1||z_2|} = \frac{z_1}{|z_1|} \cdot \frac{z_2}{|z_2|} = \varphi(z_1)\varphi(z_2). \checkmark$$
(Using multiplicativity of absolute value.)

*Verify surjective.* For $w \in S^1$, write $w = e^{i\theta}$. Then $\varphi(w) = w/|w| = w/1 = w$. So $\varphi$ is surjective (indeed, it's the identity on $S^1$). $\checkmark$

*Compute kernel.* $\varphi(z) = 1 \iff z/|z| = 1 \iff z = |z| \iff z$ is positive real $\iff z \in \mathbb{R}^+$. So $\ker\varphi = \mathbb{R}^+$. $\checkmark$

*Apply Theorem 18.1.*
$$\mathbb{C}^\times/\mathbb{R}^+ \cong S^1. \qquad \checkmark$$

*Interpretation.* Every non-zero complex number has a unique polar decomposition $z = r e^{i\theta}$ with $r > 0$ and $e^{i\theta} \in S^1$. Quotienting $\mathbb{C}^\times$ by $\mathbb{R}^+$ forgets the "radius" $r$ and remembers only the "direction" $e^{i\theta}$, giving $S^1$.

$\boxed{\mathbb{C}^\times/\mathbb{R}^+ \cong S^1.} \qquad \blacksquare$

---

**Solution 2.** Show $GL_n(\mathbb{R})/SL_n(\mathbb{R}) \cong \mathbb{R}^\times$.

*Setup.* $GL_n(\mathbb{R}) = \{A \in M_n(\mathbb{R}) : \det A \ne 0\}$, $SL_n(\mathbb{R}) = \{A \in GL_n : \det A = 1\}$, $\mathbb{R}^\times = \mathbb{R} \setminus \{0\}$ under multiplication.

*Strategy.* Apply Theorem 18.1 to the determinant map.

*Construction.* Define
$$\det: GL_n(\mathbb{R}) \to \mathbb{R}^\times, \qquad A \mapsto \det A.$$
Since $A \in GL_n$ means $\det A \ne 0$, the codomain $\mathbb{R}^\times$ is correct.

*Verify homomorphism.* For $A, B \in GL_n$:
$$\det(AB) = \det A \cdot \det B. \checkmark$$
(Multiplicativity of the determinant is the standard theorem from linear algebra.)

*Verify surjective.* For any $\lambda \in \mathbb{R}^\times$, the matrix
$$D_\lambda = \operatorname{diag}(\lambda, 1, 1, \ldots, 1) = \begin{pmatrix} \lambda & & \\ & 1 & \\ & & \ddots \\ & & & 1\end{pmatrix} \in GL_n$$
satisfies $\det D_\lambda = \lambda$. So $\det$ is surjective onto $\mathbb{R}^\times$. $\checkmark$

*Compute kernel.* $\det A = 1 \iff A \in SL_n(\mathbb{R})$ by definition. So $\ker \det = SL_n(\mathbb{R})$. $\checkmark$

*Apply Theorem 18.1.*
$$GL_n(\mathbb{R})/SL_n(\mathbb{R}) \cong \mathbb{R}^\times. \qquad \checkmark$$

*Interpretation.* "Invertible matrices modulo unit-determinant matrices" equals "the scalar part of invertibility" — which is precisely $\mathbb{R}^\times$. Geometrically, every invertible linear map is a volume-preserving map (element of $SL_n$) scaled by a non-zero factor $\lambda$; quotienting by $SL_n$ forgets the volume-preserving part and remembers only the scaling factor $\lambda \in \mathbb{R}^\times$.

$\boxed{GL_n(\mathbb{R})/SL_n(\mathbb{R}) \cong \mathbb{R}^\times.} \qquad \blacksquare$

---

**Solution 3.** In $G = \mathbb{Z}$, let $H = 15\mathbb{Z}$ and $N = 10\mathbb{Z}$. Verify the Second Isomorphism Theorem.

*Setup.* $G = \mathbb{Z}$ abelian, so all subgroups are normal. The Second Isomorphism Theorem states $HN/N \cong H/(H \cap N)$.

*Step 1: Compute $H \cap N$.*

$a \in 15\mathbb{Z} \cap 10\mathbb{Z} \iff 15 \mid a$ and $10 \mid a \iff \operatorname{lcm}(15, 10) \mid a$. Since $15 = 3 \cdot 5$ and $10 = 2 \cdot 5$, $\operatorname{lcm}(15, 10) = 2 \cdot 3 \cdot 5 = 30$.

Therefore $H \cap N = 30\mathbb{Z}$.

*Step 2: Compute $HN = H + N$ (additive notation).*

$H + N = \{h + n : h \in 15\mathbb{Z}, n \in 10\mathbb{Z}\} = 15\mathbb{Z} + 10\mathbb{Z}$. By Bézout, $15\mathbb{Z} + 10\mathbb{Z} = \gcd(15, 10)\mathbb{Z} = 5\mathbb{Z}$ (since $\gcd(15, 10) = 5$).

*Step 3: State and verify the isomorphism.*

Second Isomorphism Theorem: $5\mathbb{Z}/10\mathbb{Z} \cong 15\mathbb{Z}/30\mathbb{Z}$.

*Identify LHS.* $5\mathbb{Z}/10\mathbb{Z}$ has cosets $\{0 + 10\mathbb{Z}, 5 + 10\mathbb{Z}\}$ — two cosets. Cyclic of order $2$, so $\cong \mathbb{Z}_2$.

*Identify RHS.* $15\mathbb{Z}/30\mathbb{Z}$ has cosets $\{0 + 30\mathbb{Z}, 15 + 30\mathbb{Z}\}$ — two cosets. Cyclic of order $2$, so $\cong \mathbb{Z}_2$.

Both sides $\cong \mathbb{Z}_2$. $\checkmark$

*Order-formula verification.*
$$\frac{|H|}{|H \cap N|} = \frac{[H : H \cap N]}{} = \frac{30}{15} = 2,$$
$$\frac{|HN|}{|N|} = [HN : N] = \frac{10}{5} = 2.$$
Both indices equal $2$. $\checkmark$

*Interpretation.* The Second Isomorphism Theorem in $\mathbb{Z}$ encodes the identity $\operatorname{lcm}(m, n) \gcd(m, n) = mn$: here $\operatorname{lcm}(15, 10) \cdot \gcd(15, 10) = 30 \cdot 5 = 150 = 15 \cdot 10$. $\checkmark$

$\boxed{5\mathbb{Z}/10\mathbb{Z} \cong 15\mathbb{Z}/30\mathbb{Z} \cong \mathbb{Z}_2.} \qquad \blacksquare$

---

**Solution 4.** Use the Third Isomorphism Theorem to compute $(\mathbb{Z}/24\mathbb{Z})/(8\mathbb{Z}/24\mathbb{Z})$.

*Setup.* Identify the ambient group, normal subgroup, and nested normal subgroup, then apply Theorem 18.3.

*Interpretation of the notation.*
- $G = \mathbb{Z}$, $K = 24\mathbb{Z}$, $N = 8\mathbb{Z}$. Both $K, N$ normal (abelian), and $K = 24\mathbb{Z} \subseteq 8\mathbb{Z} = N$ (since $24$ is a multiple of $8$). $\checkmark$
- $G/K = \mathbb{Z}/24\mathbb{Z} = \mathbb{Z}_{24}$.
- $N/K = 8\mathbb{Z}/24\mathbb{Z}$, which sits inside $\mathbb{Z}_{24}$ as $\{0, 8, 16\}$.
- $(G/K)/(N/K) = \mathbb{Z}_{24}/\{0, 8, 16\}$.

*Apply Theorem 18.3.*
$$(G/K)/(N/K) \cong G/N, \qquad \text{i.e.,} \qquad \mathbb{Z}_{24}/(8\mathbb{Z}/24\mathbb{Z}) \cong \mathbb{Z}/8\mathbb{Z} = \mathbb{Z}_8.$$

*Verification.* $\mathbb{Z}_{24}$ has $24$ elements; quotienting by $\{0, 8, 16\}$ (order $3$) gives $24/3 = 8$ elements, consistent with $\mathbb{Z}_8$. The quotient is cyclic because $\mathbb{Z}_{24}$ is. $\checkmark$

$\boxed{(\mathbb{Z}/24\mathbb{Z})/(8\mathbb{Z}/24\mathbb{Z}) \cong \mathbb{Z}_8.} \qquad \blacksquare$

*Mnemonic.* $(\mathbb{Z}/24\mathbb{Z})/(8\mathbb{Z}/24\mathbb{Z}) = \mathbb{Z}/8\mathbb{Z}$: the $24\mathbb{Z}$'s cancel.

---

**Solution 5.** Let $G = \mathbb{Z}_6 \times \mathbb{Z}_4$ and $N = \mathbb{Z}_6 \times \{0\}$. Compute $G/N$.

*Setup.* $G$ has order $6 \cdot 4 = 24$. $N$ has order $6 \cdot 1 = 6$, normal (subgroup of abelian group). So $G/N$ has order $24/6 = 4$.

*Strategy.* Use the First Isomorphism Theorem: find a surjection $G \twoheadrightarrow K$ with kernel $N$ where $K$ is a known group of order $4$.

*Construction.* Define
$$\pi_2: G = \mathbb{Z}_6 \times \mathbb{Z}_4 \to \mathbb{Z}_4, \qquad \pi_2(a, b) = b.$$
This is the projection onto the second factor.

*Verify homomorphism.* $\pi_2((a_1, b_1) + (a_2, b_2)) = \pi_2(a_1 + a_2, b_1 + b_2) = b_1 + b_2 = \pi_2(a_1, b_1) + \pi_2(a_2, b_2)$. $\checkmark$

*Verify surjective.* For any $b \in \mathbb{Z}_4$, $\pi_2(0, b) = b$. $\checkmark$

*Compute kernel.* $\pi_2(a, b) = 0 \iff b = 0 \iff (a, b) \in \mathbb{Z}_6 \times \{0\} = N$. So $\ker\pi_2 = N$. $\checkmark$

*Apply Theorem 18.1.*
$$G/N = (\mathbb{Z}_6 \times \mathbb{Z}_4)/(\mathbb{Z}_6 \times \{0\}) \cong \mathbb{Z}_4. \checkmark$$

*Verification.* Order of quotient: $24/6 = 4 = |\mathbb{Z}_4|$. $\checkmark$ The isomorphism type is correct (cyclic of order $4$) because the generator $(0, 1) \in G$ has image $1 \in \mathbb{Z}_4$ of order $4$.

*Interpretation.* For a direct product $A \times B$, quotienting by $A \times \{0\}$ leaves just $B$ — i.e., the quotient "kills" the first factor.

$\boxed{G/N \cong \mathbb{Z}_4.} \qquad \blacksquare$

---

**Solution 6.** Find all subgroups of $D_4/Z(D_4)$.

*Setup.* $D_4 = \{e, r, r^2, r^3, s, rs, r^2 s, r^3 s\}$, order $8$. Its center is $Z(D_4) = \{e, r^2\} = \langle r^2\rangle$, order $2$ (see [[12-subgroup-lattice-and-dihedral-groups]]).

*Step 1: Identify $D_4/Z(D_4)$.*

$|D_4/Z(D_4)| = 8/2 = 4$. A group of order $4$ is either $\mathbb{Z}_4$ or $V_4$ (Klein four-group), by Solution C4 of [[20-co3-practice-problems]].

*Which is it?* The canonical projection $\pi: D_4 \to D_4/\langle r^2\rangle$ sends:
- $e, r^2 \mapsto \overline e$.
- $r, r^3 \mapsto \overline r$ (since $r^3 = r^2 \cdot r$ and $r^2 \in \ker\pi$).
- $s, r^2 s \mapsto \overline s$.
- $rs, r^3 s \mapsto \overline{rs}$.

So $D_4/\langle r^2\rangle = \{\overline e, \overline r, \overline s, \overline{rs}\}$, four elements.

Check orders:
- $\overline r^2 = \overline{r^2} = \overline e$, so $|\overline r| = 2$.
- $\overline s^2 = \overline{s^2} = \overline e$, so $|\overline s| = 2$.
- $\overline{rs}^2 = \overline{(rs)^2} = \overline e$ (reflection squared), so $|\overline{rs}| = 2$.

Every non-identity element has order $2$. Hence $D_4/Z(D_4) \cong V_4$ (not $\mathbb{Z}_4$, which has an element of order $4$).

*Step 2: Subgroups of $V_4$.*

$V_4 = \{e, a, b, c\}$ has subgroups:
- $\{e\}$ (trivial).
- $\langle a\rangle = \{e, a\}$, $\langle b\rangle = \{e, b\}$, $\langle c\rangle = \{e, c\}$ — three order-$2$ subgroups.
- $V_4$ itself.

Total: **$5$ subgroups**.

*Step 3: Correspondence Theorem check.*

By the Correspondence Theorem, the subgroups of $D_4/\langle r^2\rangle$ correspond to subgroups of $D_4$ containing $\langle r^2\rangle$. From the subgroup lattice of $D_4$ ([[12-subgroup-lattice-and-dihedral-groups]]), the subgroups containing $\langle r^2\rangle$ are:
- $\langle r^2\rangle$ itself (order $2$).
- $\langle r\rangle$ (order $4$, contains $\langle r^2\rangle$).
- $\langle s, r^2\rangle = \{e, s, r^2, r^2 s\}$ (order $4$, Klein four inside $D_4$).
- $\langle rs, r^2\rangle = \{e, rs, r^2, r^3 s\}$ (order $4$, the other Klein four).
- $D_4$ (order $8$).

Five subgroups containing $\langle r^2\rangle$, matching the count. $\checkmark$

$\boxed{D_4/Z(D_4) \text{ has } 5 \text{ subgroups (as it is isomorphic to } V_4\text{)}.} \qquad \blacksquare$

*Remark.* The count of $5$ subgroups is an instance of the general fact: $V_4 = (\mathbb{Z}/2)^2$ has $2^{\binom 2 0} + 2^{\binom 2 1} + 2^{\binom 2 2}/\ldots$ — actually, the subgroup count of $(\mathbb{Z}/p)^n$ is $\sum_k \binom n k_p$ (Gaussian binomial coefficient). For $n = 2, p = 2$: $1 + 3 + 1 = 5$. $\checkmark$

---

**Solution 7.** Show that $S_4/A_4 \cong \mathbb{Z}_2$ using the First Isomorphism Theorem.

*Setup.* $|S_4| = 24$, $|A_4| = 12$, so $|S_4/A_4| = 24/12 = 2$, and the quotient (being of order $2$) must be $\cong \mathbb{Z}_2$. We give an explicit First-Isomorphism-Theorem proof.

*Construction.* Define
$$\operatorname{sgn}: S_4 \to \{\pm 1\}, \qquad \operatorname{sgn}(\sigma) = \begin{cases} +1 & \text{if } \sigma \text{ is even} \\ -1 & \text{if } \sigma \text{ is odd}\end{cases}.$$

Identify $\{\pm 1\} \cong \mathbb{Z}_2$ via $+1 \leftrightarrow 0, -1 \leftrightarrow 1$.

*Verify homomorphism.* The product of two even permutations is even, even · odd = odd, odd · odd = even. These rules are precisely those of $\mathbb{Z}_2$ addition. Formally, $\operatorname{sgn}(\sigma\tau) = \operatorname{sgn}(\sigma)\operatorname{sgn}(\tau)$ — a classical theorem ([[05-permutation-and-dihedral-groups]]). $\checkmark$

*Verify surjective.* $\operatorname{sgn}(e) = +1$, $\operatorname{sgn}((1\,2)) = -1$. Both values attained. $\checkmark$

*Compute kernel.* $\operatorname{sgn}(\sigma) = +1 \iff \sigma$ is even $\iff \sigma \in A_4$. So $\ker(\operatorname{sgn}) = A_4$. $\checkmark$

*Apply Theorem 18.1.*
$$S_4/A_4 \cong \{\pm 1\} \cong \mathbb{Z}_2. \qquad \checkmark$$

*Verification.* $|S_4/A_4| = [S_4 : A_4] = 2$, and the only group of order $2$ is $\mathbb{Z}_2$. $\checkmark$

*Remark.* The argument generalizes: for any $n \ge 2$, the sign homomorphism gives $S_n/A_n \cong \mathbb{Z}_2$. This is perhaps the most celebrated application of the First Isomorphism Theorem.

$\boxed{S_4/A_4 \cong \mathbb{Z}_2.} \qquad \blacksquare$

---

## Related Concepts

- [[17-homomorphisms-and-isomorphisms]] — foundational machinery: homomorphisms, isomorphisms, kernels, images.
- [[10-normal-subgroups-and-quotient-groups]] — construction of quotient groups; normal subgroups are exactly the kernels.
- [[11-direct-products]] — direct product decompositions appear as special quotients (e.g., $(\mathbb{Z}_m \times \mathbb{Z}_n)/(\mathbb{Z}_m \times \{0\}) \cong \mathbb{Z}_n$).
- [[19-rings-definition-and-examples]] — analogous theorems hold for rings (First, Second, Third, Correspondence), with "normal subgroup" replaced by "ideal."
- [[20-co3-practice-problems]] — consolidated problems covering this chapter.

---

*Last updated: 2026-04-19*
