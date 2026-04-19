---
title: "Ring Homomorphisms"
type: guide
co: CO4
related: [17-homomorphisms-and-isomorphisms, 22-ideals-and-quotient-rings, 18-isomorphism-theorems]
---

# 23. Ring Homomorphisms

A **ring homomorphism** is a map between rings preserving both operations — addition and multiplication. This chapter develops the theory in parallel with [[17-homomorphisms-and-isomorphisms]] and [[18-isomorphism-theorems]]: kernel, image, First/Second/Third Isomorphism Theorems for rings, the Correspondence Theorem, evaluation homomorphisms and the universal property of $R[x]$, and the Chinese Remainder Theorem for rings.

Throughout this chapter, "ring" means **ring with unity** unless stated otherwise, and we consider **unital** homomorphisms ($\varphi(1_R) = 1_S$) unless the contrary is specified. All ideals are two-sided.

---

## 23.1 Definition

> **Definition 23.1 (Ring homomorphism).** Let $R$ and $S$ be rings. A function $\varphi: R \to S$ is a **ring homomorphism** if for all $a, b \in R$:
>
> 1. $\varphi(a + b) = \varphi(a) + \varphi(b)$ (additivity).
> 2. $\varphi(ab) = \varphi(a)\varphi(b)$ (multiplicativity).
>
> If both $R$ and $S$ have unity, we also require
>
> 3. $\varphi(1_R) = 1_S$ (unital).
>
> We call $\varphi$ a **ring isomorphism** if $\varphi$ is a bijective ring homomorphism, and in that case write $R \cong S$. A ring homomorphism $\varphi: R \to R$ is an **endomorphism**; a ring isomorphism $\varphi: R \to R$ is an **automorphism**.

**Remark 23.1.1 (Why require $\varphi(1_R) = 1_S$?).** Condition (3) is **not** automatic from (1)–(2). For example, the zero map $\varphi: \mathbb{Z} \to \mathbb{Z}$, $\varphi(n) = 0$, satisfies (1) and (2) but not (3). Worse, the projection $\varphi: \mathbb{Z} \to \mathbb{Z} \times \mathbb{Z}$, $n \mapsto (n, 0)$, satisfies (1)–(2) but maps $1 \mapsto (1, 0) \neq (1, 1) = 1_{\mathbb{Z} \times \mathbb{Z}}$. In group theory this pathology does not arise — the identity is automatically preserved — because groups have only one operation and $\varphi(e)$ is forced by cancellation. In ring theory we need (3) as a separate axiom to rule out such degenerate maps.

**Remark 23.1.2 (Relation to group homomorphisms).** Condition (1) says $\varphi: (R, +) \to (S, +)$ is a group homomorphism of additive groups. Condition (2) adds multiplicative compatibility. So ring homomorphisms = additive-group homomorphisms that also respect multiplication, plus (in the unital case) a normalization.

### Basic properties

> **Proposition 23.2.** Let $\varphi: R \to S$ be a ring homomorphism. Then:
>
> 1. $\varphi(0_R) = 0_S$.
> 2. $\varphi(-a) = -\varphi(a)$ for all $a \in R$.
> 3. If $\varphi$ is unital, $\varphi(a^n) = \varphi(a)^n$ for all $n \ge 0$ and $a \in R$.
> 4. If $\varphi$ is unital and $a \in R^\times$ (i.e., $a$ is a unit), then $\varphi(a) \in S^\times$ and $\varphi(a)^{-1} = \varphi(a^{-1})$.

**Proof.**

**(1).** From additivity applied to $0 + 0 = 0$:
$$\varphi(0) = \varphi(0 + 0) = \varphi(0) + \varphi(0).$$
Subtracting $\varphi(0)$ from both sides (using that $(S, +)$ is a group, hence cancellative):
$$0_S = \varphi(0).$$

**(2).** From $a + (-a) = 0$ and (1):
$$0_S = \varphi(0) = \varphi(a + (-a)) = \varphi(a) + \varphi(-a),$$
so $\varphi(-a) = -\varphi(a)$ by uniqueness of additive inverses in $(S, +)$.

**(3).** Induction on $n$. Base case $n = 0$: $\varphi(a^0) = \varphi(1_R) = 1_S = \varphi(a)^0$ (using unital). Inductive step, assuming $\varphi(a^n) = \varphi(a)^n$:
$$\varphi(a^{n+1}) = \varphi(a^n \cdot a) = \varphi(a^n)\varphi(a) = \varphi(a)^n \varphi(a) = \varphi(a)^{n+1}. \quad \checkmark$$

**(4).** Suppose $a \cdot a^{-1} = a^{-1} \cdot a = 1_R$. Apply $\varphi$:
$$\varphi(a) \varphi(a^{-1}) = \varphi(a \cdot a^{-1}) = \varphi(1_R) = 1_S,$$
$$\varphi(a^{-1}) \varphi(a) = \varphi(a^{-1} \cdot a) = \varphi(1_R) = 1_S.$$
So $\varphi(a)$ is a two-sided inverse of $\varphi(a^{-1})$ in $S$, i.e., $\varphi(a) \in S^\times$ with $\varphi(a)^{-1} = \varphi(a^{-1})$. $\blacksquare$

**Corollary 23.2.1 (Units homomorphism).** A unital ring homomorphism $\varphi: R \to S$ restricts to a group homomorphism $\varphi^\times: R^\times \to S^\times$ on unit groups.

*Proof.* Part (4) gives the map; multiplicativity is inherited from $\varphi$. $\blacksquare$

---

## 23.2 Examples

**Example 1 (Identity).** The identity map $\operatorname{id}_R: R \to R$, $r \mapsto r$, is a ring automorphism. Trivially satisfies all three axioms.

**Example 2 (Inclusion of subrings).** For the inclusion chain $\mathbb{Z} \hookrightarrow \mathbb{Q} \hookrightarrow \mathbb{R} \hookrightarrow \mathbb{C}$, each inclusion is a (unital, injective) ring homomorphism. More generally, if $R \subseteq S$ is a subring containing $1_S$, the inclusion $\iota: R \hookrightarrow S$ is a unital ring homomorphism.

**Example 3 (Reduction mod $n$).** The projection $\pi: \mathbb{Z} \to \mathbb{Z}_n$, $\pi(k) = k \bmod n$, is a surjective unital ring homomorphism with $\ker \pi = n\mathbb{Z}$.

*Verification.* Additivity and multiplicativity of mod-$n$ arithmetic are standard; $\pi(1) = 1$.

**Example 4 (Evaluation).** For a commutative ring $R$, $a \in R$, and an inclusion $R \subseteq S$, the **evaluation map** $\operatorname{ev}_a: R[x] \to S$, $p(x) \mapsto p(a)$, is a ring homomorphism. We prove this as a theorem in §23.6.

**Example 5 (Complex conjugation).** The map $c: \mathbb{C} \to \mathbb{C}$, $c(a + bi) = a - bi$, is a ring automorphism.

*Verification.*
- $c((a + bi) + (c + di)) = c((a + c) + (b + d)i) = (a + c) - (b + d)i = (a - bi) + (c - di) = c(a + bi) + c(c + di)$. $\checkmark$
- $c((a + bi)(c + di)) = c((ac - bd) + (ad + bc)i) = (ac - bd) - (ad + bc)i$, while $c(a + bi) \cdot c(c + di) = (a - bi)(c - di) = (ac - bd) - (ad + bc)i$. Equal. $\checkmark$
- $c(1) = 1$. $\checkmark$
- $c$ is its own inverse: $c(c(z)) = \overline{\overline{z}} = z$. So $c$ is a bijection, hence an automorphism.

**Example 6 (Projection in direct product).** $\pi_1: R \times S \to R$, $(r, s) \mapsto r$. Unital ring homomorphism (check: addition, multiplication, and unit are componentwise). $\ker \pi_1 = \{0\} \times S$.

**Example 7 (Frobenius in characteristic $p$).** Let $R$ be a commutative ring with $\operatorname{char}(R) = p$, $p$ prime. The **Frobenius endomorphism** $\phi_p: R \to R$, $\phi_p(a) = a^p$, is a ring homomorphism.

*Verification.*
- Multiplicativity: $\phi_p(ab) = (ab)^p = a^p b^p$ (using commutativity) $= \phi_p(a)\phi_p(b)$. $\checkmark$
- Additivity: $\phi_p(a + b) = (a + b)^p = \sum_{k=0}^{p} \binom{p}{k} a^k b^{p-k}$. For $0 < k < p$, $\binom{p}{k} = \frac{p!}{k!(p-k)!}$ is divisible by $p$ (since $p$ appears in the numerator but not denominator); hence $\binom{p}{k} \cdot 1_R = 0$ in $R$ by $\operatorname{char}(R) = p$. All middle terms vanish, leaving $\phi_p(a + b) = a^p + b^p = \phi_p(a) + \phi_p(b)$. $\checkmark$
- Unital: $\phi_p(1) = 1^p = 1$. $\checkmark$

This "dream-of-the-freshman" identity $(a + b)^p = a^p + b^p$ in characteristic $p$ is one of the most beautiful consequences of the binomial theorem.

### Non-examples

**Example 8.** $f: \mathbb{Z} \to \mathbb{Z}$, $f(n) = 2n$.

*Check.* Additivity holds: $f(m + n) = 2(m + n) = 2m + 2n = f(m) + f(n)$. But
$$f(mn) = 2mn, \qquad f(m)f(n) = (2m)(2n) = 4mn.$$
These disagree unless $mn = 0$. So $f$ fails multiplicativity. It is additively a group homomorphism but **not** a ring homomorphism.

**Example 9.** $g: \mathbb{Z} \to \mathbb{Z}$, $g(n) = n^2$.

*Check.* Multiplicativity holds: $g(mn) = (mn)^2 = m^2 n^2 = g(m)g(n)$. But
$$g(m + n) = (m + n)^2 = m^2 + 2mn + n^2, \qquad g(m) + g(n) = m^2 + n^2.$$
These differ by $2mn$, which is non-zero in general. So $g$ fails additivity. It is multiplicatively a monoid homomorphism but **not** a ring homomorphism.

**Example 9.5 (Non-example from non-commutativity).** In a non-commutative ring $R$, squaring $r \mapsto r^2$ fails even multiplicativity: $(rs)^2 = rsrs \neq r^2 s^2$ in general. Frobenius requires commutativity for the same reason.

---

## 23.3 Kernel and Image

> **Definition 23.3.** Let $\varphi: R \to S$ be a ring homomorphism.
>
> - **Kernel:** $\ker \varphi = \{r \in R : \varphi(r) = 0_S\} = \varphi^{-1}(0_S)$.
> - **Image:** $\operatorname{Im} \varphi = \{\varphi(r) : r \in R\} = \varphi(R)$.

> **Proposition 23.4.**
>
> 1. $\ker \varphi$ is a **two-sided ideal** of $R$ (not merely a subring).
> 2. $\operatorname{Im} \varphi$ is a **subring** of $S$ (in general not an ideal of $S$).

**Proof.**

**(1) $\ker \varphi$ is an ideal of $R$.**

*Subgroup under $+$.* Since $\varphi: (R, +) \to (S, +)$ is a group homomorphism, $\ker \varphi$ is a subgroup of $(R, +)$ (standard fact): non-empty ($0 \in \ker\varphi$), closed under $+$ (if $\varphi(a) = \varphi(b) = 0$, then $\varphi(a + b) = 0 + 0 = 0$), closed under negation (if $\varphi(a) = 0$, then $\varphi(-a) = -0 = 0$).

*Absorption (two-sided).* Let $r \in R$ and $a \in \ker\varphi$. Then
$$\varphi(ra) = \varphi(r)\varphi(a) = \varphi(r) \cdot 0_S = 0_S,$$
so $ra \in \ker\varphi$. Similarly,
$$\varphi(ar) = \varphi(a)\varphi(r) = 0_S \cdot \varphi(r) = 0_S,$$
so $ar \in \ker\varphi$. Hence $R \cdot \ker\varphi \subseteq \ker\varphi$ and $\ker\varphi \cdot R \subseteq \ker\varphi$.

Therefore $\ker\varphi$ is a two-sided ideal. $\blacksquare_{(1)}$

**(2) $\operatorname{Im}\varphi$ is a subring of $S$.**

*Contains $0$ and $1$.* $0_S = \varphi(0_R) \in \operatorname{Im}\varphi$. If $\varphi$ is unital, $1_S = \varphi(1_R) \in \operatorname{Im}\varphi$.

*Closed under $+, -, \cdot$.* For $\varphi(a), \varphi(b) \in \operatorname{Im}\varphi$:
$$\varphi(a) + \varphi(b) = \varphi(a + b) \in \operatorname{Im}\varphi,$$
$$\varphi(a) - \varphi(b) = \varphi(a - b) \in \operatorname{Im}\varphi,$$
$$\varphi(a) \cdot \varphi(b) = \varphi(ab) \in \operatorname{Im}\varphi.$$

So $\operatorname{Im}\varphi$ is a subring of $S$. $\blacksquare_{(2)}$

**Remark 23.4.1 (Image is not an ideal in general).** Consider the inclusion $\iota: \mathbb{Z} \hookrightarrow \mathbb{Q}$. The image $\mathbb{Z}$ is a subring of $\mathbb{Q}$ but **not** an ideal: $\frac{1}{2} \cdot 1 = \frac{1}{2} \notin \mathbb{Z}$ even though $1 \in \mathbb{Z}$ and $\frac{1}{2} \in \mathbb{Q}$. So absorption fails.

The image is an ideal only in special circumstances (e.g., when $\varphi$ is surjective, in which case $\operatorname{Im}\varphi = S$, trivially an ideal).

### Kernel $= \{0\}$ iff injective

> **Proposition 23.5.** A ring homomorphism $\varphi: R \to S$ is injective iff $\ker \varphi = \{0\}$.

**Proof.** Since $\varphi$ is in particular an additive group homomorphism, this is the group-theoretic statement applied to $(R, +) \to (S, +)$. We recall the argument:

$(\Rightarrow)$ If $\varphi$ is injective, then $\varphi(r) = 0 = \varphi(0)$ forces $r = 0$, so $\ker\varphi = \{0\}$.

$(\Leftarrow)$ Suppose $\ker\varphi = \{0\}$. If $\varphi(a) = \varphi(b)$, then
$$\varphi(a - b) = \varphi(a) - \varphi(b) = 0,$$
so $a - b \in \ker\varphi = \{0\}$, i.e., $a = b$. $\blacksquare$

---

## 23.4 First Isomorphism Theorem for Rings

> **Theorem 23.6 (First Isomorphism Theorem for rings).** Let $\varphi: R \to S$ be a ring homomorphism. Then:
>
> 1. $\ker \varphi$ is an ideal of $R$.
> 2. $\operatorname{Im} \varphi$ is a subring of $S$.
> 3. The induced map
> $$\bar\varphi: R/\ker\varphi \longrightarrow \operatorname{Im}\varphi, \qquad a + \ker\varphi \mapsto \varphi(a)$$
> is a ring isomorphism.

**Proof.** Let $I = \ker\varphi$. Part (1) is Proposition 23.4(1); part (2) is Proposition 23.4(2). We focus on (3): constructing $\bar\varphi$ and checking it is a well-defined bijective ring homomorphism.

Define $\bar\varphi: R/I \to \operatorname{Im}\varphi$ by $\bar\varphi(a + I) = \varphi(a)$.

**(i) Well-defined.** We must show the value does not depend on the coset representative. Suppose $a + I = a' + I$. Then $a - a' \in I = \ker\varphi$, so $\varphi(a - a') = 0$, hence
$$\varphi(a) - \varphi(a') = \varphi(a - a') = 0 \implies \varphi(a) = \varphi(a').$$
So $\bar\varphi(a + I) = \varphi(a) = \varphi(a') = \bar\varphi(a' + I)$. $\checkmark$

**(ii) Additive homomorphism.** For $a + I, b + I \in R/I$:
$$\bar\varphi((a + I) + (b + I)) = \bar\varphi((a + b) + I) = \varphi(a + b) = \varphi(a) + \varphi(b) = \bar\varphi(a + I) + \bar\varphi(b + I). \checkmark$$

**(iii) Multiplicative homomorphism.** Using that quotient multiplication is $(a + I)(b + I) = ab + I$ (well-defined because $I$ is an ideal, see [[22-ideals-and-quotient-rings]]):
$$\bar\varphi((a + I)(b + I)) = \bar\varphi(ab + I) = \varphi(ab) = \varphi(a)\varphi(b) = \bar\varphi(a + I)\bar\varphi(b + I). \checkmark$$

**(iv) Unital.** If $\varphi$ is unital, $\bar\varphi(1 + I) = \varphi(1) = 1_S$. $\checkmark$

**(v) Injective.** Suppose $\bar\varphi(a + I) = 0_S$. Then $\varphi(a) = 0$, so $a \in \ker\varphi = I$, i.e., $a + I = I$, the zero element of $R/I$. Hence $\ker\bar\varphi = \{I\}$ (the trivial ideal), so $\bar\varphi$ is injective (by Proposition 23.5 applied to $\bar\varphi$). $\checkmark$

**(vi) Surjective.** Every $s \in \operatorname{Im}\varphi$ has the form $s = \varphi(a)$ for some $a \in R$, and $\varphi(a) = \bar\varphi(a + I)$. So every element of the target is hit. $\checkmark$

Having verified (i)–(vi), $\bar\varphi$ is a ring isomorphism $R/\ker\varphi \xrightarrow{\sim} \operatorname{Im}\varphi$. $\blacksquare$

**Remark 23.6.1 (Universal property / canonical factorization).** The First Isomorphism Theorem provides a **canonical factorization**
$$R \xrightarrow{\pi} R/\ker\varphi \xrightarrow{\bar\varphi} \operatorname{Im}\varphi \hookrightarrow S,$$
where:
- $\pi: R \twoheadrightarrow R/\ker\varphi$ is the quotient surjection,
- $\bar\varphi: R/\ker\varphi \xrightarrow{\sim} \operatorname{Im}\varphi$ is the induced isomorphism,
- $\operatorname{Im}\varphi \hookrightarrow S$ is the inclusion.

So every ring homomorphism factors uniquely as (surjection) $\circ$ (iso) $\circ$ (inclusion). This is the analogue of the factorization in group theory ([[18-isomorphism-theorems]]).

**Remark 23.6.2 (Strategy for identifying quotients).** To prove $R/I \cong T$ for a given ideal $I$ of $R$ and ring $T$, it suffices to construct a **surjective ring homomorphism** $\varphi: R \twoheadrightarrow T$ with $\ker\varphi = I$. The First Isomorphism Theorem then gives $R/I \cong T$ automatically — much easier than describing the cosets and their operations explicitly.

### Applications

**Example 10 (Defining $\mathbb{Z}_n$ as a quotient ring).**

*Setup.* Reduction mod $n$: $\pi: \mathbb{Z} \to \mathbb{Z}_n$, $\pi(k) = k \bmod n$.

*Strategy.* Apply Theorem 23.6.

*Computation.*
- $\pi$ is a ring homomorphism (standard).
- $\ker\pi = \{k : n \mid k\} = n\mathbb{Z}$.
- $\pi$ is surjective onto $\{0, 1, \ldots, n - 1\} = \mathbb{Z}_n$.

*Conclusion.* $\mathbb{Z}/n\mathbb{Z} \cong \mathbb{Z}_n$ as rings.

*Interpretation.* This reconciles two constructions: the set of residues $\{0, 1, \ldots, n-1\}$ with mod-$n$ operations, versus the set of cosets $\{k + n\mathbb{Z}\}$ with coset operations. They are isomorphic via the canonical quotient map. $\blacksquare$

---

**Example 11 ($\mathbb{R}[x]/\langle x^2 + 1\rangle \cong \mathbb{C}$).**

*Setup.* Define $\varphi: \mathbb{R}[x] \to \mathbb{C}$ by $\varphi(p(x)) = p(i)$ (evaluation at $i$).

*Strategy.* Apply Theorem 23.6.

*Computation.*

**Homomorphism.** Evaluation is a ring homomorphism (Theorem 23.10 below, or by direct check: $\varphi$ preserves sum, product, and unit).

**Image.** For any $a + bi \in \mathbb{C}$, the polynomial $p(x) = a + bx \in \mathbb{R}[x]$ evaluates to $\varphi(p) = a + bi$. So $\varphi$ is surjective, and $\operatorname{Im}\varphi = \mathbb{C}$.

**Kernel.** We claim $\ker\varphi = \langle x^2 + 1\rangle$.

$(\supseteq)$ $\varphi(x^2 + 1) = i^2 + 1 = -1 + 1 = 0$, and since $\ker\varphi$ is an ideal, $\langle x^2 + 1\rangle \subseteq \ker\varphi$.

$(\subseteq)$ Let $p(x) \in \ker\varphi$. By polynomial long division in $\mathbb{R}[x]$ with the monic divisor $x^2 + 1$:
$$p(x) = (x^2 + 1) q(x) + r(x), \qquad \deg r < 2.$$
Write $r(x) = a + bx$ with $a, b \in \mathbb{R}$. Evaluating at $i$:
$$0 = \varphi(p) = (i^2 + 1) q(i) + r(i) = 0 + a + bi = a + bi.$$
Hence $a = b = 0$, so $r = 0$, so $p(x) = (x^2 + 1) q(x) \in \langle x^2 + 1\rangle$. $\checkmark$

**Conclusion.** By Theorem 23.6, $\mathbb{R}[x]/\langle x^2 + 1\rangle \cong \mathbb{C}$.

*Verification.* Both sides are 2-dimensional over $\mathbb{R}$: the quotient has basis $\{1 + I, x + I\}$ (every polynomial reduces mod $x^2 + 1$ to $a + bx$ with $a, b \in \mathbb{R}$), and $\mathbb{C}$ has basis $\{1, i\}$. The isomorphism sends $x + I \mapsto i$, and the defining relation $(x + I)^2 = -1 + I$ matches $i^2 = -1$. $\checkmark$

*Interpretation.* The field $\mathbb{C}$ is "constructed" by adjoining a square root of $-1$ to $\mathbb{R}$ — formally, by taking the polynomial ring $\mathbb{R}[x]$ and quotienting by the relation $x^2 + 1 = 0$. This is the prototype of **algebraic field extension**. $\blacksquare$

---

**Example 12 ($\mathbb{Z}[x]/\langle x - a\rangle \cong \mathbb{Z}$).**

*Setup.* For $a \in \mathbb{Z}$, define $\varphi: \mathbb{Z}[x] \to \mathbb{Z}$, $\varphi(p(x)) = p(a)$.

*Computation.*
- Homomorphism: evaluation.
- Surjective: $\varphi(n) = n$ for constant $n$.
- Kernel: $p(a) = 0 \iff (x - a) \mid p(x)$ in $\mathbb{Z}[x]$ (by the factor theorem, which works over any commutative ring for a **monic** linear divisor). So $\ker\varphi = \langle x - a\rangle$.

*Conclusion.* $\mathbb{Z}[x]/\langle x - a\rangle \cong \mathbb{Z}$.

*Interpretation.* Setting $x = a$ in $\mathbb{Z}[x]$ is the same as quotienting by the ideal $\langle x - a\rangle$. More generally, for any commutative ring $R$ and $a \in R$, $R[x]/\langle x - a\rangle \cong R$ via $\operatorname{ev}_a$. $\blacksquare$

---

**Example 13 ($\mathbb{R}[x]/\langle x^2 - 2\rangle$ is not a field).**

*Setup.* We might hope $\mathbb{R}[x]/\langle x^2 - 2\rangle \cong \mathbb{R}(\sqrt 2) = \mathbb{R}$, analogous to Example 11. But $\sqrt 2$ already lies in $\mathbb{R}$!

*Observation.* In $\mathbb{R}[x]$, we have the factorization
$$x^2 - 2 = (x - \sqrt 2)(x + \sqrt 2),$$
and both factors lie in $\mathbb{R}[x]$. So $x^2 - 2$ is **reducible** over $\mathbb{R}$.

*Consequence.* $\langle x^2 - 2\rangle$ is **not** a maximal ideal in $\mathbb{R}[x]$ (see [[22-ideals-and-quotient-rings]]: in a PID, $\langle p\rangle$ is maximal iff $p$ is irreducible). Hence $\mathbb{R}[x]/\langle x^2 - 2\rangle$ is not a field; in fact it has zero divisors:
$$(x - \sqrt 2 + I)(x + \sqrt 2 + I) = (x^2 - 2) + I = 0 + I$$
with both factors non-zero.

*Structure via CRT.* Since $x - \sqrt 2$ and $x + \sqrt 2$ are **coprime** in $\mathbb{R}[x]$ (any common divisor of two distinct linear monics is a unit), the Chinese Remainder Theorem (§23.7) gives
$$\mathbb{R}[x]/\langle x^2 - 2\rangle \cong \mathbb{R}[x]/\langle x - \sqrt 2\rangle \times \mathbb{R}[x]/\langle x + \sqrt 2\rangle \cong \mathbb{R} \times \mathbb{R}$$
(each factor is $\mathbb{R}$ by Example 12 with $R = \mathbb{R}$, $a = \pm\sqrt 2$).

*Moral.* The ring $\mathbb{R}[x]/\langle f(x)\rangle$ is a field iff $f(x)$ is irreducible over $\mathbb{R}$. For $f$ reducible, the quotient decomposes via CRT into a product of simpler pieces.

*Correct analogue.* Working over $\mathbb{Q}$ instead: $x^2 - 2$ **is** irreducible over $\mathbb{Q}$ (no rational square root of $2$), so $\mathbb{Q}[x]/\langle x^2 - 2\rangle \cong \mathbb{Q}(\sqrt 2) = \{a + b\sqrt 2 : a, b \in \mathbb{Q}\}$ is a field. $\blacksquare$

---

## 23.5 Second and Third Isomorphism Theorems for Rings

These are exact parallels of the group-theoretic results ([[18-isomorphism-theorems]]), with "subgroup → subring" and "normal subgroup → ideal" translations. We state and prove each.

### The Second Isomorphism Theorem

> **Theorem 23.7 (Second Isomorphism Theorem for rings).** Let $R$ be a ring, $S \subseteq R$ a subring, and $I \trianglelefteq R$ an ideal. Then:
>
> 1. $S + I = \{s + a : s \in S, a \in I\}$ is a subring of $R$.
> 2. $S \cap I$ is an ideal of $S$.
> 3. $I$ is an ideal of $S + I$.
> 4. $(S + I)/I \cong S/(S \cap I)$ as rings.

**Proof.**

**(1) $S + I$ is a subring of $R$.**

*Contains $0$ and $1$ (if $S$ has unity).* $0 = 0 + 0 \in S + I$. If $1_R \in S$, then $1_R = 1_R + 0 \in S + I$.

*Closed under $+, -$.* For $s_1 + a_1, s_2 + a_2 \in S + I$:
$$(s_1 + a_1) \pm (s_2 + a_2) = (s_1 \pm s_2) + (a_1 \pm a_2) \in S + I,$$
since $S$ is closed under $\pm$ and $I$ is closed under $\pm$.

*Closed under multiplication.* Compute
$$(s_1 + a_1)(s_2 + a_2) = s_1 s_2 + s_1 a_2 + a_1 s_2 + a_1 a_2.$$
Breaking this down:
- $s_1 s_2 \in S$ (closure in $S$).
- $s_1 a_2 \in I$ (absorption: $a_2 \in I$, $s_1 \in R$).
- $a_1 s_2 \in I$ (absorption: $a_1 \in I$, $s_2 \in R$).
- $a_1 a_2 \in I$ (ideals are closed under multiplication within themselves; more directly, $a_1 \cdot a_2 \in I$ by absorption with either $a_1 \in R$ or $a_2 \in R$).

So $(s_1 + a_1)(s_2 + a_2) = \underbrace{s_1 s_2}_{\in S} + \underbrace{(s_1 a_2 + a_1 s_2 + a_1 a_2)}_{\in I} \in S + I$. $\checkmark$

Hence $S + I$ is a subring. $\blacksquare_{(1)}$

**(2) $S \cap I$ is an ideal of $S$.**

$S \cap I$ is a subgroup of $(S, +)$: intersection of two subgroups.

*Absorption in $S$.* For $s \in S$ and $a \in S \cap I$:
- $sa \in S$: $s, a \in S$, closure.
- $sa \in I$: $s \in R$, $a \in I$, absorption in $R$.

So $sa \in S \cap I$. Similarly $as \in S \cap I$. Hence $S \cap I \trianglelefteq S$. $\blacksquare_{(2)}$

**(3) $I$ is an ideal of $S + I$.**

Clearly $I \subseteq S + I$ (take $s = 0$). For any $r = s + a \in S + I$ and $b \in I$:
- $rb = (s + a)b = sb + ab \in I$ (first term by absorption in $R$ since $s \in R, b \in I$; second by $a, b \in I$, closed under multiplication within an ideal).
- $br = b(s + a) = bs + ba \in I$ similarly.

Hence $I \trianglelefteq S + I$. $\blacksquare_{(3)}$

**(4) The main isomorphism $(S + I)/I \cong S/(S \cap I)$.**

*Construction.* Define $\varphi: S \to (S + I)/I$ by
$$\varphi(s) = s + I.$$

We verify $\varphi$ is a surjective ring homomorphism with kernel $S \cap I$, then apply the First Isomorphism Theorem.

**Homomorphism.** For $s_1, s_2 \in S$:
$$\varphi(s_1 + s_2) = (s_1 + s_2) + I = (s_1 + I) + (s_2 + I) = \varphi(s_1) + \varphi(s_2). \checkmark$$
$$\varphi(s_1 s_2) = s_1 s_2 + I = (s_1 + I)(s_2 + I) = \varphi(s_1)\varphi(s_2). \checkmark$$
$$\varphi(1_S) = 1_S + I = 1_{(S+I)/I}. \checkmark$$

**Surjective.** An arbitrary element of $(S + I)/I$ has the form $(s + a) + I$ for $s \in S, a \in I$. But
$$(s + a) + I = s + (a + I) = s + I = \varphi(s),$$
using $a \in I$ so $a + I = I$. So every coset in $(S + I)/I$ is $\varphi(s)$ for some $s \in S$. $\checkmark$

**Kernel.** $\varphi(s) = 0$ in $(S + I)/I$ $\iff$ $s + I = I$ $\iff$ $s \in I$. Combined with $s \in S$: $s \in S \cap I$. So $\ker\varphi = S \cap I$. $\checkmark$

**Apply Theorem 23.6.** The First Isomorphism Theorem gives
$$S/(S \cap I) \cong \operatorname{Im}\varphi = (S + I)/I. \qquad \blacksquare_{(4)} \blacksquare$$

**Diamond diagram (mnemonic).**

```
          S + I
         /    \
        S      I
         \    /
         S ∩ I
```

Going "up" from $S$ to $S + I$ (modding out by $I$) equals going "up" from $S \cap I$ to $S$ (modding out by $S \cap I$). The diamond captures the symmetry.

**Example 14 (Second Iso in $\mathbb{Z}$).** Let $R = \mathbb{Z}$, $S = 4\mathbb{Z}$ (a subring — actually an ideal since $\mathbb{Z}$ is commutative; treat as subring here), $I = 6\mathbb{Z}$.

- $S + I = 4\mathbb{Z} + 6\mathbb{Z} = \gcd(4, 6)\mathbb{Z} = 2\mathbb{Z}$ (Bézout).
- $S \cap I = \operatorname{lcm}(4, 6)\mathbb{Z} = 12\mathbb{Z}$.

*Theorem 23.7 gives:*
$$2\mathbb{Z}/6\mathbb{Z} \cong 4\mathbb{Z}/12\mathbb{Z}.$$

*Verification.* Both are cyclic groups of order 3: $2\mathbb{Z}/6\mathbb{Z} = \{0 + 6\mathbb{Z}, 2 + 6\mathbb{Z}, 4 + 6\mathbb{Z}\}$ and $4\mathbb{Z}/12\mathbb{Z} = \{0 + 12\mathbb{Z}, 4 + 12\mathbb{Z}, 8 + 12\mathbb{Z}\}$. But these are *additive* groups — the quotient "rings" here lack unity unless we reinterpret. $\checkmark$ (Note: $n\mathbb{Z}$ for $n > 1$ is a "rng" — ring without unity — so we are working in the non-unital setting for this example.) $\blacksquare$

### The Third Isomorphism Theorem

> **Theorem 23.8 (Third Isomorphism Theorem for rings).** Let $R$ be a ring, and let $I \subseteq J$ be ideals of $R$. Then:
>
> 1. $J/I$ is an ideal of $R/I$.
> 2. $(R/I)/(J/I) \cong R/J$ as rings.

**Proof.**

**(1) $J/I$ is an ideal of $R/I$.**

Since $I \subseteq J$, the set $J/I = \{j + I : j \in J\} \subseteq R/I$ is well-defined as a subset.

*Subgroup of $(R/I, +)$.* Inherited from $J \le (R, +)$ via the projection: if $j_1, j_2 \in J$, then $(j_1 + I) \pm (j_2 + I) = (j_1 \pm j_2) + I \in J/I$.

*Absorption.* For $r + I \in R/I$ and $j + I \in J/I$:
$$(r + I)(j + I) = rj + I,$$
and $rj \in J$ since $J \trianglelefteq R$. So $(r + I)(j + I) \in J/I$. Similarly for left multiplication. $\checkmark$

**(2) The isomorphism.**

*Construction.* Define $\varphi: R/I \to R/J$ by
$$\varphi(r + I) = r + J.$$

**Well-defined.** If $r + I = r' + I$, then $r - r' \in I \subseteq J$, so $r + J = r' + J$. Hence $\varphi(r + I) = \varphi(r' + I)$. $\checkmark$

*(This is the crucial step: the containment $I \subseteq J$ is exactly what is needed for $\varphi$ to descend from $R/I$ to $R/J$.)*

**Ring homomorphism.**
$$\varphi((r + I) + (s + I)) = \varphi((r + s) + I) = (r + s) + J = (r + J) + (s + J). \checkmark$$
$$\varphi((r + I)(s + I)) = \varphi(rs + I) = rs + J = (r + J)(s + J). \checkmark$$
$$\varphi(1 + I) = 1 + J. \checkmark$$

**Surjective.** Every $r + J \in R/J$ equals $\varphi(r + I)$. $\checkmark$

**Kernel.**
$$\varphi(r + I) = 0 + J \iff r + J = J \iff r \in J \iff r + I \in J/I.$$
So $\ker\varphi = J/I$. $\checkmark$

**Apply Theorem 23.6.** $\varphi: R/I \twoheadrightarrow R/J$ is surjective with kernel $J/I$. Hence
$$(R/I)/(J/I) \cong R/J. \qquad \blacksquare$$

**Mnemonic (cancellation).**
$$\frac{R/I}{J/I} \cong \frac{R}{J}.$$
The $I$'s formally "cancel," as in a fraction.

**Example 15 (Third Iso in $\mathbb{Z}$).** $R = \mathbb{Z}$, $I = 12\mathbb{Z}$, $J = 6\mathbb{Z}$. Then $I \subseteq J$ (12 is a multiple of 6).

*Compute each side.*

- $R/I = \mathbb{Z}/12\mathbb{Z} = \mathbb{Z}_{12}$.
- $J/I = 6\mathbb{Z}/12\mathbb{Z} = \{0, 6\} \subseteq \mathbb{Z}_{12}$, an ideal (additively $\cong \mathbb{Z}_2$).
- $R/J = \mathbb{Z}/6\mathbb{Z} = \mathbb{Z}_6$.

*Theorem 23.8:* $\mathbb{Z}_{12}/\{0, 6\} \cong \mathbb{Z}_6$.

*Verification.* The cosets of $\{0, 6\}$ in $\mathbb{Z}_{12}$: $\{0, 6\}, \{1, 7\}, \{2, 8\}, \{3, 9\}, \{4, 10\}, \{5, 11\}$ — six cosets, cyclic under addition, generated by the coset of $1$. So the quotient is $\mathbb{Z}_6$. $\checkmark$ $\blacksquare$

---

### The Correspondence Theorem for rings

> **Theorem 23.9 (Correspondence / Lattice Theorem for rings).** Let $R$ be a ring, $I \trianglelefteq R$ an ideal, and $\pi: R \twoheadrightarrow R/I$ the quotient surjection. Then there is an inclusion-preserving bijection
> $$\Phi: \{J \trianglelefteq R : I \subseteq J\} \xrightarrow{\sim} \{\overline K \trianglelefteq R/I\}, \qquad J \mapsto J/I = \pi(J),$$
> with inverse $\Psi(\overline K) = \pi^{-1}(\overline K)$. This bijection:
>
> 1. Preserves inclusions: $J_1 \subseteq J_2 \iff J_1/I \subseteq J_2/I$.
> 2. Preserves primality: $J$ prime in $R$ $\iff$ $J/I$ prime in $R/I$.
> 3. Preserves maximality: $J$ maximal in $R$ $\iff$ $J/I$ maximal in $R/I$.
> 4. Preserves quotients (Theorem 23.8): $R/J \cong (R/I)/(J/I)$.

**Proof.**

We verify $\Phi$ and $\Psi$ are well-defined maps between the stated sets, then show they are mutually inverse.

**$\Phi$ is well-defined.** Given $J \trianglelefteq R$ with $I \subseteq J$, set $\Phi(J) = J/I = \{j + I : j \in J\} \subseteq R/I$. From the proof of Theorem 23.8(1), $J/I$ is an ideal of $R/I$.

**$\Psi$ is well-defined.** Given $\overline K \trianglelefteq R/I$, set $\Psi(\overline K) = \pi^{-1}(\overline K) = \{r \in R : r + I \in \overline K\}$.

*$\pi^{-1}(\overline K)$ is an ideal of $R$:* The preimage of an ideal under a ring homomorphism is an ideal. Explicitly:
- Subgroup: preimage of a subgroup under $\pi$.
- Absorption: for $r \in R$ and $x \in \pi^{-1}(\overline K)$, $\pi(rx) = \pi(r)\pi(x) \in (R/I) \cdot \overline K \subseteq \overline K$, so $rx \in \pi^{-1}(\overline K)$. Similarly $xr$.

*$\pi^{-1}(\overline K)$ contains $I$:* For $a \in I$, $\pi(a) = 0 \in \overline K$ (any ideal contains 0), so $a \in \pi^{-1}(\overline K)$.

**Mutually inverse.**

*$\Psi \circ \Phi = \operatorname{id}$.* For $J$ with $I \subseteq J$:
$$\Psi(\Phi(J)) = \pi^{-1}(J/I) = \{r \in R : r + I \in J/I\} = \{r : \exists j \in J, r + I = j + I\} = \{r : \exists j \in J, r - j \in I\}.$$
Since $I \subseteq J$, $r - j \in I \subseteq J$, so $r = j + (r - j) \in J$. Hence $\Psi(\Phi(J)) \subseteq J$. Conversely, for $j \in J$, $\pi(j) = j + I \in J/I$, so $j \in \pi^{-1}(J/I) = \Psi(\Phi(J))$. Equality. $\checkmark$

*$\Phi \circ \Psi = \operatorname{id}$.* For $\overline K \trianglelefteq R/I$: $\Phi(\Psi(\overline K)) = \pi(\pi^{-1}(\overline K)) = \overline K$ by surjectivity of $\pi$. $\checkmark$

**(1) Inclusion preservation.** Clear: $J_1 \subseteq J_2 \iff \pi(J_1) \subseteq \pi(J_2) \iff J_1/I \subseteq J_2/I$ (using bijectivity of $\Phi$).

**(2) Primality preservation.** By definition, $J$ is prime iff $R/J$ is an integral domain. By Theorem 23.8, $R/J \cong (R/I)/(J/I)$. So $R/J$ is an integral domain iff $(R/I)/(J/I)$ is, i.e., iff $J/I$ is prime in $R/I$.

**(3) Maximality preservation.** Similarly, $J$ maximal iff $R/J$ is a field iff $(R/I)/(J/I)$ is a field iff $J/I$ is maximal.

**(4) Quotient preservation.** Theorem 23.8. $\blacksquare$

**Consequence.** The ideal lattice of $R/I$ is **isomorphic as a poset** to the sub-lattice of $R$ consisting of ideals containing $I$.

**Example 16 (Ideals of $\mathbb{Z}_n$).** Ideals of $\mathbb{Z}_n = \mathbb{Z}/n\mathbb{Z}$ correspond to ideals of $\mathbb{Z}$ containing $n\mathbb{Z}$, i.e., to $d\mathbb{Z}$ with $d \mid n$. So ideals of $\mathbb{Z}_n$ are in bijection with positive divisors of $n$. The prime/maximal ideals correspond to prime divisors of $n$ (since $\mathbb{Z}_n/d\mathbb{Z}_n \cong \mathbb{Z}_d$, which is an integral domain iff a field iff $d$ is prime — as $\mathbb{Z}_d$ is finite).

For $n = 12$: positive divisors $\{1, 2, 3, 4, 6, 12\}$, so $6$ ideals. Prime/maximal: $\{2, 3\}$, so $2$ prime ideals (namely $\langle 2\rangle = \{0, 2, 4, 6, 8, 10\}$ and $\langle 3\rangle = \{0, 3, 6, 9\}$). $\blacksquare$

---

## 23.6 Evaluation Homomorphisms and the Universal Property of $R[x]$

We now prove that evaluation is a ring homomorphism — and moreover the **universal** such map — giving a precise categorical characterization of the polynomial ring $R[x]$.

> **Theorem 23.10 (Universal property of $R[x]$).** Let $R$ be a commutative ring with unity. Let $S$ be a commutative ring with unity, $\psi: R \to S$ a ring homomorphism, and $a \in S$. Then there exists a **unique** ring homomorphism $\operatorname{ev}_{\psi, a}: R[x] \to S$ extending $\psi$ (i.e., $\operatorname{ev}_{\psi, a}|_R = \psi$) with $\operatorname{ev}_{\psi, a}(x) = a$. Explicitly,
> $$\operatorname{ev}_{\psi, a}\left(\sum_{i=0}^n c_i x^i\right) = \sum_{i=0}^n \psi(c_i) a^i.$$

**Proof.** We prove uniqueness first (which motivates the formula), then existence (by verifying the formula defines a ring homomorphism).

**Uniqueness.** Suppose $\varphi: R[x] \to S$ is any ring homomorphism with $\varphi|_R = \psi$ and $\varphi(x) = a$. For an arbitrary polynomial $p(x) = \sum c_i x^i$:
$$\varphi(p(x)) = \varphi\left(\sum c_i x^i\right) \stackrel{(*)}{=} \sum \varphi(c_i) \varphi(x^i) \stackrel{(**)}{=} \sum \varphi(c_i) \varphi(x)^i = \sum \psi(c_i) a^i,$$
where $(*)$ uses additivity and distributivity of $\varphi$, and $(**)$ uses $\varphi(x^i) = \varphi(x)^i$ from Proposition 23.2(3). Hence $\varphi$ is **determined** by $\psi$ and $a$, and must equal the formula above.

**Existence.** Define $\varphi: R[x] \to S$ by
$$\varphi\left(\sum_{i=0}^n c_i x^i\right) = \sum_{i=0}^n \psi(c_i) a^i.$$

We check this is a well-defined ring homomorphism.

*Well-defined.* A polynomial has a unique representation as $\sum c_i x^i$ (finite sum), so the formula is unambiguous. (We're using the free-module structure of $R[x]$ on the basis $\{1, x, x^2, \ldots\}$.)

*Additivity.* For $p = \sum c_i x^i$ and $q = \sum d_i x^i$ (padding with zeros so sums match):
$$\varphi(p + q) = \varphi\left(\sum (c_i + d_i) x^i\right) = \sum \psi(c_i + d_i) a^i = \sum (\psi(c_i) + \psi(d_i)) a^i = \varphi(p) + \varphi(q). \checkmark$$

*Multiplicativity.* For $p = \sum c_i x^i$ and $q = \sum d_j x^j$, the product is $pq = \sum_k \left(\sum_{i+j=k} c_i d_j\right) x^k$. Then
$$\varphi(pq) = \sum_k \psi\left(\sum_{i+j=k} c_i d_j\right) a^k = \sum_k \left(\sum_{i+j=k} \psi(c_i)\psi(d_j)\right) a^k = \sum_k \sum_{i+j=k} \psi(c_i) a^i \psi(d_j) a^j,$$
where we used additivity of $\psi$, multiplicativity of $\psi$, and commutativity of $S$ (to rearrange $a^k = a^i a^j$ with $\psi(d_j)$). Reorganizing the double sum:
$$\varphi(pq) = \left(\sum_i \psi(c_i) a^i\right)\left(\sum_j \psi(d_j) a^j\right) = \varphi(p) \varphi(q). \checkmark$$

*Unital.* $\varphi(1) = \varphi(1 \cdot x^0) = \psi(1) a^0 = 1_S \cdot 1_S = 1_S$. $\checkmark$

*Extends $\psi$.* For $c \in R$ (constant polynomial), $\varphi(c) = \psi(c) a^0 = \psi(c)$. $\checkmark$

*Sends $x$ to $a$.* $\varphi(x) = \psi(1) a^1 = 1 \cdot a = a$. $\checkmark$

Hence $\varphi = \operatorname{ev}_{\psi, a}$ is the desired unique extension. $\blacksquare$

**Remark 23.10.1 (Categorical content).** The theorem says $R[x]$ is a **free commutative $R$-algebra on one generator** $x$: any map from the generator $\{x\}$ to any commutative $R$-algebra $S$ extends uniquely to an algebra homomorphism $R[x] \to S$. This universal property determines $R[x]$ up to unique isomorphism.

**Corollary 23.10.2 (Evaluation at a point in $R$).** For $R = S$ and $\psi = \operatorname{id}_R$, we get the classical evaluation homomorphism
$$\operatorname{ev}_a: R[x] \to R, \qquad p(x) \mapsto p(a).$$
Its kernel is the ideal of polynomials vanishing at $a$; in a field, this is $\langle x - a\rangle$.

### Applications of evaluation

**Example 17 (Quadratic field extension).** $\operatorname{ev}_{\sqrt 2}: \mathbb{Q}[x] \to \mathbb{R}$, $p(x) \mapsto p(\sqrt 2)$.

*Setup.* Here $R = \mathbb{Q}$, $S = \mathbb{R}$, $\psi$ = inclusion, $a = \sqrt 2$.

*Strategy.* Compute image and kernel, apply First Iso.

*Image.* $\operatorname{Im}\operatorname{ev}_{\sqrt 2} = \{p(\sqrt 2) : p \in \mathbb{Q}[x]\}$. Since $\sqrt 2^2 = 2$, any polynomial evaluated at $\sqrt 2$ reduces (by using $\sqrt 2^2 = 2$) to $a + b\sqrt 2$ with $a, b \in \mathbb{Q}$. So $\operatorname{Im} = \mathbb{Q}(\sqrt 2) = \{a + b\sqrt 2 : a, b \in \mathbb{Q}\}$.

*Kernel.* $p(\sqrt 2) = 0$. The **minimal polynomial** of $\sqrt 2$ over $\mathbb{Q}$ is $x^2 - 2$ (monic, irreducible over $\mathbb{Q}$, annihilates $\sqrt 2$).

*Claim.* $\ker = \langle x^2 - 2\rangle$.

$(\supseteq)$ $\operatorname{ev}_{\sqrt 2}(x^2 - 2) = (\sqrt 2)^2 - 2 = 0$, so $x^2 - 2 \in \ker$, hence $\langle x^2 - 2\rangle \subseteq \ker$.

$(\subseteq)$ Let $p \in \ker$. Divide: $p(x) = (x^2 - 2) q(x) + r(x)$ with $\deg r < 2$, $r(x) = c + dx$. Evaluate at $\sqrt 2$:
$$0 = p(\sqrt 2) = 0 + c + d\sqrt 2.$$
Since $1, \sqrt 2$ are $\mathbb{Q}$-linearly independent (else $\sqrt 2 \in \mathbb{Q}$, absurd), $c = d = 0$. So $r = 0$, $p \in \langle x^2 - 2\rangle$. $\checkmark$

*First Iso.* $\mathbb{Q}[x]/\langle x^2 - 2\rangle \cong \mathbb{Q}(\sqrt 2)$.

*Verification.* Both sides are 2-dimensional $\mathbb{Q}$-vector spaces: LHS has basis $\{1, x\} \pmod{x^2 - 2}$, RHS has basis $\{1, \sqrt 2\}$ over $\mathbb{Q}$. The isomorphism identifies $x + I \leftrightarrow \sqrt 2$, and the relation $x^2 + I = 2 + I$ matches $(\sqrt 2)^2 = 2$. $\checkmark$

*Interpretation.* $\mathbb{Q}(\sqrt 2)$ is a field (since $x^2 - 2$ is irreducible over $\mathbb{Q}$ $\Rightarrow$ $\langle x^2 - 2\rangle$ is maximal in the PID $\mathbb{Q}[x]$ $\Rightarrow$ quotient is a field). Its elements satisfy $\sqrt 2$-arithmetic via the defining relation $x^2 = 2$. $\blacksquare$

---

**Example 18 ($\mathbb{R}[x]/\langle x^2 + 1\rangle \cong \mathbb{C}$, revisited).** $\operatorname{ev}_i: \mathbb{R}[x] \to \mathbb{C}$, $p \mapsto p(i)$. Done in Example 11. Here we simply note that this fits the universal-property framework: $\mathbb{C}$ is the commutative $\mathbb{R}$-algebra generated freely by $i$ subject to $i^2 = -1$.

---

**Example 19 (Evaluation at multiple points, via CRT).** For distinct $a_1, a_2 \in R$ (commutative ring), evaluate $\mathbb{R}[x] \to \mathbb{R} \times \mathbb{R}$, $p \mapsto (p(a_1), p(a_2))$.

This map has kernel $\langle x - a_1\rangle \cap \langle x - a_2\rangle = \langle (x - a_1)(x - a_2)\rangle$ (the ideals are coprime since the generators are distinct monic linears), and by CRT (§23.7):
$$\mathbb{R}[x]/\langle (x - a_1)(x - a_2)\rangle \cong \mathbb{R}[x]/\langle x - a_1\rangle \times \mathbb{R}[x]/\langle x - a_2\rangle \cong \mathbb{R} \times \mathbb{R}.$$

This is the algebraic version of **Lagrange interpolation**: a polynomial of degree $< 2$ is uniquely determined by its values at two points. $\blacksquare$

---

## 23.7 The Chinese Remainder Theorem for Rings

> **Theorem 23.11 (Chinese Remainder Theorem).** Let $R$ be a commutative ring with unity, and let $I_1, I_2, \ldots, I_k$ be pairwise **coprime** ideals, meaning $I_i + I_j = R$ for all $i \neq j$. Then:
>
> 1. The intersection equals the product: $I_1 \cap I_2 \cap \cdots \cap I_k = I_1 I_2 \cdots I_k$.
> 2. The map
> $$\Phi: R \longrightarrow R/I_1 \times R/I_2 \times \cdots \times R/I_k, \qquad r \mapsto (r + I_1, r + I_2, \ldots, r + I_k)$$
> is a surjective ring homomorphism with kernel $\bigcap_{i} I_i$, inducing
> $$R \big/ \bigcap_{i} I_i \;\cong\; R/I_1 \times R/I_2 \times \cdots \times R/I_k.$$

We prove the case $k = 2$ in full, then extend by induction.

**Proof (case $k = 2$).**

Suppose $I_1 + I_2 = R$, i.e., there exist $a_1 \in I_1, a_2 \in I_2$ with $a_1 + a_2 = 1$.

**Step 1: $\Phi$ is a ring homomorphism.** The map $\Phi: R \to R/I_1 \times R/I_2$, $r \mapsto (r + I_1, r + I_2)$, is the product of two quotient maps. Each component is a ring homomorphism (quotient map), and products of homomorphisms are homomorphisms (check componentwise).

**Step 2: $\ker\Phi = I_1 \cap I_2$.**
$$\Phi(r) = (0, 0) \iff r \in I_1 \text{ and } r \in I_2 \iff r \in I_1 \cap I_2.$$

**Step 3: $\Phi$ is surjective.**

Given $(r_1 + I_1, r_2 + I_2) \in R/I_1 \times R/I_2$, we need $r \in R$ with $r \equiv r_1 \pmod{I_1}$ and $r \equiv r_2 \pmod{I_2}$.

*Key construction.* Using $1 = a_1 + a_2$ with $a_i \in I_i$, set
$$r := r_1 a_2 + r_2 a_1.$$

*Check $r \equiv r_1 \pmod{I_1}$.* Compute
$$r - r_1 = r_1 a_2 + r_2 a_1 - r_1 = r_1(a_2 - 1) + r_2 a_1 = r_1(-a_1) + r_2 a_1 = (r_2 - r_1) a_1 \in I_1,$$
using $a_2 - 1 = -a_1$ and $a_1 \in I_1$ (and that $I_1$ absorbs multiplication by $r_2 - r_1 \in R$).

*Check $r \equiv r_2 \pmod{I_2}$.* Symmetrically,
$$r - r_2 = r_1 a_2 + r_2 a_1 - r_2 = r_1 a_2 + r_2(a_1 - 1) = r_1 a_2 - r_2 a_2 = (r_1 - r_2) a_2 \in I_2.$$

So $\Phi(r) = (r_1 + I_1, r_2 + I_2)$, as desired. $\checkmark$

**Step 4: $I_1 \cap I_2 = I_1 I_2$.**

$(\supseteq)$ For $a_1' b_1' \in I_1 I_2$ (product of a generator, finite sum): $a_1' \in I_1, b_1' \in I_2$. Then $a_1' b_1' \in I_1$ (absorption: $a_1' \in I_1$, $b_1' \in R$) and $a_1' b_1' \in I_2$ (absorption: $b_1' \in I_2$, $a_1' \in R$). So $a_1' b_1' \in I_1 \cap I_2$. Extended to finite sums: $I_1 I_2 \subseteq I_1 \cap I_2$ always (no coprimality needed).

$(\subseteq)$ Take $x \in I_1 \cap I_2$. Using $1 = a_1 + a_2$:
$$x = x \cdot 1 = x(a_1 + a_2) = \underbrace{x a_1}_{\in I_2 I_1 \subseteq I_1 I_2} + \underbrace{x a_2}_{\in I_1 I_2}.$$
Here $x a_1$: $x \in I_2$, $a_1 \in I_1$, so $x a_1 \in I_2 I_1 = I_1 I_2$ (the product of ideals is commutative as a set, using $R$ commutative). And $x a_2$: $x \in I_1$, $a_2 \in I_2$, so $x a_2 \in I_1 I_2$. Sum in $I_1 I_2$. $\checkmark$

So $I_1 \cap I_2 = I_1 I_2$ under coprimality.

**Step 5: Apply Theorem 23.6.** Surjective $\Phi$ with kernel $I_1 \cap I_2 = I_1 I_2$ gives:
$$R/(I_1 \cap I_2) = R/(I_1 I_2) \cong R/I_1 \times R/I_2. \qquad \blacksquare_{k = 2}$$

**Proof (general $k$, by induction).**

Assume the theorem for $k - 1$. Let $I_1, \ldots, I_k$ be pairwise coprime.

**Claim.** $I_1$ is coprime to $J := I_2 \cap \cdots \cap I_k = I_2 \cdots I_k$.

*Proof of claim.* For each $j \ge 2$, $I_1 + I_j = R$, so there exist $u_j \in I_1, v_j \in I_j$ with $u_j + v_j = 1$. Multiply:
$$1 = \prod_{j = 2}^k (u_j + v_j) = \left(\text{sum of terms}\right).$$
Each term in the expansion is a product of some $u_j$'s (which lie in $I_1$) and the complementary $v_j$'s (in the various $I_j$'s). Any term containing at least one $u_j$ lies in $I_1$. The single term with no $u_j$'s is $\prod_{j = 2}^k v_j \in I_2 \cdots I_k = J$. Writing
$$1 = \underbrace{\left(\text{terms with some }u_j\right)}_{\in I_1} + \underbrace{\prod_{j=2}^k v_j}_{\in J},$$
we see $1 \in I_1 + J$, so $I_1 + J = R$.

By $k = 2$ case applied to $I_1$ and $J$:
$$R/(I_1 \cap J) \cong R/I_1 \times R/J.$$

By induction hypothesis applied to $I_2, \ldots, I_k$:
$$R/J = R/(I_2 \cap \cdots \cap I_k) \cong R/I_2 \times \cdots \times R/I_k.$$

Combining:
$$R/(I_1 \cap I_2 \cap \cdots \cap I_k) \cong R/I_1 \times R/I_2 \times \cdots \times R/I_k.$$

And $I_1 \cap I_2 \cap \cdots \cap I_k = I_1 \cdots I_k$ by iterating the identity $I \cap J = IJ$ (when coprime). $\blacksquare$

### Classical CRT (rings)

**Example 20 (Classical CRT in $\mathbb{Z}$).** In $\mathbb{Z}$, the ideals $\langle m\rangle = m\mathbb{Z}$ and $\langle n\rangle = n\mathbb{Z}$ are coprime iff $\gcd(m, n) = 1$.

*Proof.* By Bézout, $\gcd(m, n) = 1 \iff \exists s, t \in \mathbb{Z} : sm + tn = 1 \iff 1 \in m\mathbb{Z} + n\mathbb{Z} \iff m\mathbb{Z} + n\mathbb{Z} = \mathbb{Z}$.

Under coprimality, $m\mathbb{Z} \cap n\mathbb{Z} = \operatorname{lcm}(m, n)\mathbb{Z} = mn\mathbb{Z}$ (since $\gcd \cdot \operatorname{lcm} = mn$). Theorem 23.11:
$$\mathbb{Z}/mn\mathbb{Z} \cong \mathbb{Z}/m\mathbb{Z} \times \mathbb{Z}/n\mathbb{Z}, \quad \text{i.e.,} \quad \mathbb{Z}_{mn} \cong \mathbb{Z}_m \times \mathbb{Z}_n \text{ (when }\gcd(m,n) = 1\text{)}.$$
$\blacksquare$

---

**Example 21 ($\mathbb{Z}_{12} \cong \mathbb{Z}_3 \times \mathbb{Z}_4$).**

*Setup.* $12 = 3 \cdot 4$, $\gcd(3, 4) = 1$. Apply CRT.

*Isomorphism.* $\Phi: \mathbb{Z}_{12} \to \mathbb{Z}_3 \times \mathbb{Z}_4$, $[k]_{12} \mapsto ([k]_3, [k]_4)$.

*Table.*

| $k \pmod{12}$ | $([k]_3, [k]_4)$ |
|---|---|
| $0$ | $(0, 0)$ |
| $1$ | $(1, 1)$ |
| $2$ | $(2, 2)$ |
| $3$ | $(0, 3)$ |
| $4$ | $(1, 0)$ |
| $5$ | $(2, 1)$ |
| $6$ | $(0, 2)$ |
| $7$ | $(1, 3)$ |
| $8$ | $(2, 0)$ |
| $9$ | $(0, 1)$ |
| $10$ | $(1, 2)$ |
| $11$ | $(2, 3)$ |

*Verification of surjectivity and injectivity from the table.* All $12$ rows give distinct pairs, and they exhaust $\mathbb{Z}_3 \times \mathbb{Z}_4 = \{(a, b) : a \in \mathbb{Z}_3, b \in \mathbb{Z}_4\}$ ($12$ pairs). $\checkmark$

*Sample verification of ring structure.* Take $(2, 3) \in \mathbb{Z}_3 \times \mathbb{Z}_4$: find $r \in \mathbb{Z}_{12}$ with $r \equiv 2 \pmod 3$ and $r \equiv 3 \pmod 4$. From the table: $r = 11$.

Check product in $\mathbb{Z}_{12}$: $11 \cdot 11 = 121 = 12 \cdot 10 + 1 \equiv 1 \pmod{12}$. And in $\mathbb{Z}_3 \times \mathbb{Z}_4$: $(2, 3) \cdot (2, 3) = (4, 9) \equiv (1, 1) \pmod{(3, 4)}$. The table maps $1 \mapsto (1, 1)$. Consistent. $\checkmark$

*CRT-explicit formula.* Using $1 = 4 \cdot 1 - 3 \cdot 1$ so $a_1 = 4 \in 4\mathbb{Z}, a_2 = -3 \in 3\mathbb{Z}$ (mod 12). Wait — we need $1 = a_1 + a_2$ with $a_1 \in I_1 = 3\mathbb{Z}/12\mathbb{Z}$ and $a_2 \in I_2 = 4\mathbb{Z}/12\mathbb{Z}$. Compute: $1 = -3 + 4$ in $\mathbb{Z}$, so $a_1 = -3 \equiv 9 \pmod{12} \in 3\mathbb{Z}_{12}$, $a_2 = 4 \in 4\mathbb{Z}_{12}$.

For $(r_1, r_2) = (2, 3)$, the CRT formula gives $r = r_1 a_2 + r_2 a_1 = 2 \cdot 4 + 3 \cdot 9 = 8 + 27 = 35 \equiv 11 \pmod{12}$. Matches. $\checkmark$

---

**Example 22 (CRT for polynomials).** In $\mathbb{R}[x]$, the ideals $\langle x - 1\rangle$ and $\langle x + 1\rangle$ are coprime: $\frac{1}{2}(x + 1) - \frac{1}{2}(x - 1) = 1 \in \langle x - 1\rangle + \langle x + 1\rangle$, so the sum is $\mathbb{R}[x]$.

By CRT,
$$\mathbb{R}[x]/\langle x^2 - 1\rangle = \mathbb{R}[x]/\langle (x-1)(x+1)\rangle \cong \mathbb{R}[x]/\langle x - 1\rangle \times \mathbb{R}[x]/\langle x + 1\rangle \cong \mathbb{R} \times \mathbb{R}.$$

*Interpretation.* A polynomial modulo $x^2 - 1$ is determined by its values at $x = 1$ and $x = -1$ (Lagrange interpolation in two points). $\blacksquare$

---

## 23.8 Automorphisms of Rings

> **Definition 23.12.** The set of ring automorphisms of $R$ forms a group under composition, denoted $\operatorname{Aut}(R)$. For a ring extension $R \subseteq S$, the subgroup fixing $R$ pointwise is
> $$\operatorname{Aut}(S/R) = \{\varphi \in \operatorname{Aut}(S) : \varphi|_R = \operatorname{id}_R\}.$$

**Example 23 ($\operatorname{Aut}(\mathbb{Z}) = \{\operatorname{id}\}$).**

*Proof.* Let $\varphi \in \operatorname{Aut}(\mathbb{Z})$. Being unital, $\varphi(1) = 1$. For $n > 0$,
$$\varphi(n) = \varphi(\underbrace{1 + 1 + \cdots + 1}_{n}) = n \cdot \varphi(1) = n.$$
For $n < 0$: $\varphi(n) = -\varphi(-n) = -(-n) = n$. So $\varphi = \operatorname{id}_\mathbb{Z}$. $\blacksquare$

**Example 24 ($\operatorname{Aut}(\mathbb{Q}) = \{\operatorname{id}\}$).**

*Proof.* Let $\varphi \in \operatorname{Aut}(\mathbb{Q})$. By restriction, $\varphi|_\mathbb{Z} \in \operatorname{End}(\mathbb{Z})$ (the set of unital ring endomorphisms of $\mathbb{Z}$), and by Example 23, $\varphi|_\mathbb{Z} = \operatorname{id}_\mathbb{Z}$.

For $p/q \in \mathbb{Q}$ with $q \neq 0$:
$$\varphi(p/q) = \varphi(p) \varphi(q)^{-1} = p \cdot q^{-1} = p/q$$
(using Proposition 23.2(4) for the inverse). So $\varphi = \operatorname{id}_\mathbb{Q}$. $\blacksquare$

**Example 25 ($\operatorname{Aut}(\mathbb{C}/\mathbb{R}) \cong \mathbb{Z}_2$, for $\mathbb{R}$-algebra automorphisms).**

*Setup.* Ring automorphisms of $\mathbb{C}$ fixing $\mathbb{R}$ pointwise.

*Strategy.* Any such $\varphi$ is determined by $\varphi(i)$, which must satisfy $\varphi(i)^2 = \varphi(i^2) = \varphi(-1) = -1$. So $\varphi(i) \in \{\pm i\}$.

*Two choices:*
- $\varphi(i) = i$: $\varphi = \operatorname{id}_\mathbb{C}$.
- $\varphi(i) = -i$: $\varphi(a + bi) = a - bi$, complex conjugation (Example 5).

Both are automorphisms fixing $\mathbb{R}$. So $\operatorname{Aut}(\mathbb{C}/\mathbb{R}) = \{\operatorname{id}, \text{conj}\} \cong \mathbb{Z}_2$. $\blacksquare$

*Remark.* Without the restriction "fixes $\mathbb{R}$" and "continuous," $\operatorname{Aut}(\mathbb{C})$ as an abstract ring is enormous (cardinality $2^{\mathfrak{c}}$, by a Zorn's-lemma argument). But the automorphism group of $\mathbb{C}$ as an $\mathbb{R}$-algebra is just $\mathbb{Z}_2$.

**Example 26 ($\operatorname{Aut}(\mathbb{Q}(\sqrt 2)/\mathbb{Q}) \cong \mathbb{Z}_2$).**

*Setup.* $\varphi \in \operatorname{Aut}(\mathbb{Q}(\sqrt 2))$ fixing $\mathbb{Q}$.

*Strategy.* Determined by $\varphi(\sqrt 2)$, which must satisfy $\varphi(\sqrt 2)^2 = \varphi(2) = 2$. So $\varphi(\sqrt 2) \in \{\pm\sqrt 2\}$ (the two roots of $x^2 - 2$ in $\mathbb{Q}(\sqrt 2)$).

Two automorphisms: identity and $\sqrt 2 \mapsto -\sqrt 2$, extending $\mathbb{Q}$-linearly. $\operatorname{Aut}(\mathbb{Q}(\sqrt 2)/\mathbb{Q}) \cong \mathbb{Z}_2$.

These $\operatorname{Aut}(K/F)$ groups for field extensions $K/F$ are the **Galois groups**; see [[27-finite-fields-and-extensions]] and classical Galois theory.

---

## 23.9 Practice Problems

**Problem 1.** Find all ring homomorphisms $\varphi: \mathbb{Z} \to \mathbb{Z}_n$.

**Problem 2.** Show that there is no unital ring homomorphism $\varphi: \mathbb{Q} \to \mathbb{Z}$.

**Problem 3.** Determine whether $\mathbb{Z}[x]/\langle x^2 + 1\rangle$ and $\mathbb{Z}[i]$ are isomorphic as rings.

**Problem 4.** Let $\varphi: \mathbb{R}[x] \to \mathbb{R}$ be defined by $\varphi(p(x)) = p(2)$. Find the kernel, image, and the quotient.

**Problem 5.** Use CRT to decompose $\mathbb{Z}_{60}$ as a direct product.

**Problem 6.** Show that if $\varphi: R \to S$ is a ring homomorphism with $R$ a field, then $\varphi$ is either the zero map or injective. Deduce that if $\varphi$ is unital, $\varphi$ is automatically injective.

**Problem 7.** Determine $\operatorname{Aut}(\mathbb{F}_p)$ for $p$ prime.

**Problem 8.** Let $I, J$ be coprime ideals of a commutative ring $R$ with unity. Show that $I^m + J^n = R$ for all $m, n \ge 1$.

### Solutions

**Solution 1.**

A ring homomorphism $\varphi: \mathbb{Z} \to \mathbb{Z}_n$ is determined by $\varphi(1)$ (by additivity: $\varphi(k) = k \cdot \varphi(1)$ for all $k \in \mathbb{Z}$).

**Step 1: Find constraints on $\varphi(1)$.**

Let $e = \varphi(1) \in \mathbb{Z}_n$. Then $\varphi$ extends uniquely if it extends at all, as $\varphi(k) = k e$.

- **Additivity:** $\varphi(k + \ell) = (k + \ell)e = ke + \ell e = \varphi(k) + \varphi(\ell)$. Automatic. $\checkmark$
- **Multiplicativity:** $\varphi(k \ell) = (k\ell) e$, and $\varphi(k)\varphi(\ell) = (ke)(\ell e) = k\ell e^2$. Equality requires $k\ell e = k\ell e^2$ for all $k, \ell$, i.e., $e = e^2$ (taking $k = \ell = 1$). So $\varphi(1) = e$ must be an **idempotent** in $\mathbb{Z}_n$.
- **Unital (if required):** $e = 1$, forcing the unique map $\varphi(k) = k \bmod n$ (standard reduction).

**Step 2: Non-unital ring homomorphisms correspond to idempotents.**

Conversely, for any idempotent $e \in \mathbb{Z}_n$ (i.e., $e^2 = e$), the map $\varphi_e(k) = ke$ is a (non-unital) ring homomorphism:
$$\varphi_e(k + \ell) = (k + \ell) e = ke + \ell e = \varphi_e(k) + \varphi_e(\ell),$$
$$\varphi_e(k\ell) = k\ell e = k\ell e^2 = (ke)(\ell e) = \varphi_e(k)\varphi_e(\ell).$$

**Step 3: Count and identify idempotents in $\mathbb{Z}_n$.**

$e^2 = e \pmod n \iff e(e - 1) \equiv 0 \pmod n$.

By CRT, if $n = p_1^{a_1} \cdots p_k^{a_k}$, then $\mathbb{Z}_n \cong \prod \mathbb{Z}_{p_i^{a_i}}$, and idempotents in a product correspond to tuples of idempotents in each factor. In $\mathbb{Z}_{p^a}$ (which has no zero divisors except 0 on residues coprime to $p$; actually has idempotents only $\{0, 1\}$ by the following argument): if $e^2 = e$ in $\mathbb{Z}_{p^a}$, then $e(e - 1) \equiv 0 \pmod{p^a}$. Since $\gcd(e, e - 1) = 1$, $p^a$ must divide one factor entirely: $e \equiv 0$ or $e \equiv 1 \pmod{p^a}$.

Hence $\mathbb{Z}_n$ has exactly $2^k$ idempotents, where $k = \omega(n)$ is the number of distinct prime factors of $n$.

**Conclusion.**

Non-unital ring homomorphisms $\mathbb{Z} \to \mathbb{Z}_n$: **$2^{\omega(n)}$ of them**, one per idempotent.

Unital ring homomorphisms $\mathbb{Z} \to \mathbb{Z}_n$: **exactly one**, the standard reduction mod $n$.

*Special case:* $n = p$ prime, $\omega(n) = 1$: idempotents $\{0, 1\}$, giving the zero map and the reduction. $\boxed{\text{Two non-unital homs, one unital.}}$ $\blacksquare$

---

**Solution 2.**

Let $\varphi: \mathbb{Q} \to \mathbb{Z}$ be a unital ring homomorphism, $\varphi(1) = 1$.

**Step 1: Derive a contradiction from $1/2$.**

$\varphi(1/2) = x$ for some $x \in \mathbb{Z}$. Then
$$1 = \varphi(1) = \varphi(2 \cdot 1/2) = \varphi(2)\varphi(1/2) = 2x.$$
So $2x = 1$ in $\mathbb{Z}$, which has no integer solution.

**Conclusion.** No unital ring homomorphism $\mathbb{Q} \to \mathbb{Z}$ exists.

*Remark (non-unital version).* If we drop unital, the zero map $\varphi(q) = 0$ for all $q$ is a valid ring homomorphism (trivially satisfying (1), (2), but failing (3)). It is the unique non-unital ring homomorphism $\mathbb{Q} \to \mathbb{Z}$.

*Proof of uniqueness (sketch).* Suppose $\varphi \neq 0$. Then $\varphi(1) = e \neq 0$ with $e^2 = e$, so $e(e - 1) = 0$ in $\mathbb{Z}$; but $\mathbb{Z}$ is an integral domain, so $e = 0$ (excluded) or $e = 1$, reducing to the unital case, which we showed is impossible. So $\varphi = 0$. $\blacksquare$

---

**Solution 3.**

**Claim.** $\mathbb{Z}[x]/\langle x^2 + 1\rangle \cong \mathbb{Z}[i]$.

**Construction.** Define $\varphi: \mathbb{Z}[x] \to \mathbb{Z}[i]$ by $\varphi(p(x)) = p(i)$ (evaluation at $i$).

**Step 1: $\varphi$ is a ring homomorphism.** Direct from Theorem 23.10 with $R = \mathbb{Z}$, $S = \mathbb{C}$, $\psi = \text{inclusion}$, $a = i$. The image lies in $\mathbb{Z}[i]$ since for $p(x) = \sum c_k x^k$ with $c_k \in \mathbb{Z}$, $p(i) = \sum c_k i^k \in \mathbb{Z}[i]$.

**Step 2: $\varphi$ is surjective.** For any $a + bi \in \mathbb{Z}[i]$ with $a, b \in \mathbb{Z}$, take $p(x) = a + bx \in \mathbb{Z}[x]$. Then $\varphi(p) = a + bi$.

**Step 3: $\ker\varphi = \langle x^2 + 1\rangle$.**

$(\supseteq)$ $\varphi(x^2 + 1) = i^2 + 1 = 0$, so $x^2 + 1 \in \ker$, hence $\langle x^2 + 1\rangle \subseteq \ker$.

$(\subseteq)$ Let $p(x) \in \ker\varphi$. Since $x^2 + 1$ is **monic**, we can perform polynomial long division in $\mathbb{Z}[x]$ (division by a monic polynomial over any commutative ring produces quotient and remainder in that ring):
$$p(x) = (x^2 + 1) q(x) + r(x), \qquad r(x) = a + bx, \quad a, b \in \mathbb{Z}.$$
Evaluate at $i$:
$$0 = \varphi(p) = 0 \cdot q(i) + (a + bi) = a + bi.$$
Since $\{1, i\}$ are $\mathbb{R}$-linearly independent (in particular $\mathbb{Z}$-linearly independent), $a = b = 0$. So $r = 0$ and $p(x) = (x^2 + 1) q(x) \in \langle x^2 + 1\rangle$. $\checkmark$

**Step 4: First Iso.** By Theorem 23.6,
$$\mathbb{Z}[x]/\langle x^2 + 1\rangle \cong \mathbb{Z}[i].$$

*Verification (dimension count).* Both sides are free $\mathbb{Z}$-modules of rank 2: LHS has $\mathbb{Z}$-basis $\{1 + I, x + I\}$ (every polynomial reduces modulo $x^2 + 1$ to a linear polynomial), RHS has $\mathbb{Z}$-basis $\{1, i\}$. Isomorphism identifies $x + I \leftrightarrow i$, with matching multiplication rule $(x + I)^2 = -1 + I \leftrightarrow i^2 = -1$. $\checkmark$

$\boxed{\text{Isomorphic.}}$ $\blacksquare$

---

**Solution 4.**

$\varphi: \mathbb{R}[x] \to \mathbb{R}$, $\varphi(p) = p(2)$.

**Step 1: $\varphi$ is a ring homomorphism.** Evaluation map (Theorem 23.10).

**Step 2: Image.** $\operatorname{Im}\varphi = \mathbb{R}$: for any $c \in \mathbb{R}$, take constant polynomial $p = c$, then $\varphi(p) = c$. Surjective.

**Step 3: Kernel.**

$\ker\varphi = \{p \in \mathbb{R}[x] : p(2) = 0\}$.

*Claim.* $\ker\varphi = \langle x - 2\rangle$.

By the **factor theorem** over $\mathbb{R}[x]$ (equivalently, polynomial long division by the monic $x - 2$):
$$p(2) = 0 \iff (x - 2) \mid p(x) \text{ in } \mathbb{R}[x].$$

Explicitly, for $p \in \ker$: divide $p(x) = (x - 2) q(x) + r$, where $\deg r < 1$, so $r \in \mathbb{R}$. Evaluate at 2: $0 = p(2) = 0 + r$, so $r = 0$, hence $(x - 2) \mid p$.

Conversely, if $(x - 2) \mid p$, say $p = (x - 2) q$, then $p(2) = 0 \cdot q(2) = 0$. $\checkmark$

**Step 4: First Iso.** $\varphi$ is a surjective ring homomorphism $\mathbb{R}[x] \to \mathbb{R}$ with $\ker\varphi = \langle x - 2\rangle$. By Theorem 23.6,
$$\mathbb{R}[x]/\langle x - 2\rangle \cong \mathbb{R}.$$

*Interpretation.* "Setting $x = 2$" in a polynomial is the same as working modulo $x - 2$. $\blacksquare$

---

**Solution 5.**

$60 = 2^2 \cdot 3 \cdot 5 = 4 \cdot 3 \cdot 5$.

**Step 1: Verify coprimality.** The integers $4, 3, 5$ are pairwise coprime: $\gcd(4, 3) = \gcd(4, 5) = \gcd(3, 5) = 1$.

Correspondingly, the ideals $4\mathbb{Z}, 3\mathbb{Z}, 5\mathbb{Z}$ are pairwise coprime in $\mathbb{Z}$ (Example 20).

**Step 2: Apply CRT (Theorem 23.11).**

$4\mathbb{Z} \cap 3\mathbb{Z} \cap 5\mathbb{Z} = \operatorname{lcm}(4, 3, 5)\mathbb{Z} = 60\mathbb{Z}$.

$$\mathbb{Z}/60\mathbb{Z} \cong \mathbb{Z}/4\mathbb{Z} \times \mathbb{Z}/3\mathbb{Z} \times \mathbb{Z}/5\mathbb{Z}, \quad \text{i.e.,} \quad \mathbb{Z}_{60} \cong \mathbb{Z}_4 \times \mathbb{Z}_3 \times \mathbb{Z}_5.$$

**Verification.**

*Orders.* $|\mathbb{Z}_{60}| = 60$ and $|\mathbb{Z}_4 \times \mathbb{Z}_3 \times \mathbb{Z}_5| = 4 \cdot 3 \cdot 5 = 60$. $\checkmark$

*Unit count.* $|\mathbb{Z}_{60}^\times| = \varphi(60) = \varphi(4)\varphi(3)\varphi(5) = 2 \cdot 2 \cdot 4 = 16$ (Euler's product formula), and $|(\mathbb{Z}_4 \times \mathbb{Z}_3 \times \mathbb{Z}_5)^\times| = |\mathbb{Z}_4^\times| \cdot |\mathbb{Z}_3^\times| \cdot |\mathbb{Z}_5^\times| = 2 \cdot 2 \cdot 4 = 16$. $\checkmark$ (Units in a product are componentwise units.)

$\boxed{\mathbb{Z}_{60} \cong \mathbb{Z}_4 \times \mathbb{Z}_3 \times \mathbb{Z}_5.}$ $\blacksquare$

*Remark.* This also factors further: $\mathbb{Z}_4$ is **not** a product (it's $\mathbb{Z}/4\mathbb{Z}$ with non-trivial $2$-torsion and cannot be $\mathbb{Z}_2 \times \mathbb{Z}_2$, which has different structure — $\mathbb{Z}_2 \times \mathbb{Z}_2$ has 4 idempotents, but $\mathbb{Z}_4$ has only 2). So the CRT decomposition is maximal.

---

**Solution 6.**

Let $\varphi: R \to S$ be a ring homomorphism with $R$ a field.

**Step 1: $\ker\varphi$ is an ideal of $R$.** By Proposition 23.4.

**Step 2: $R$ is a field $\Rightarrow$ only two ideals.** A field has exactly two ideals: $\{0\}$ and $R$ itself. (Any non-zero ideal $I$ contains a non-zero element $a$; since $a$ is a unit in a field, $a \cdot a^{-1} = 1 \in I$, so $I = R$.)

**Step 3: Case analysis on $\ker\varphi$.**

*Case 1:* $\ker\varphi = R$. Then every $r \in R$ satisfies $\varphi(r) = 0$, i.e., $\varphi$ is the zero map.

*Case 2:* $\ker\varphi = \{0\}$. Then $\varphi$ is injective (Proposition 23.5).

So $\varphi$ is either zero or injective. $\blacksquare$

**Corollary (unital case).** If $\varphi$ is unital, $\varphi(1_R) = 1_S \neq 0_S$ (assuming $S$ is a non-zero ring, i.e., $1_S \neq 0_S$), so $\varphi$ is not the zero map. Hence $\varphi$ must be injective.

*Strong conclusion.* **A unital ring homomorphism from a field to a non-zero ring is always injective.** This is the ring-theoretic analogue of "the only normal subgroups of a simple group are trivial and the whole group" — fields are "simple" rings.

---

**Solution 7.**

$\operatorname{Aut}(\mathbb{F}_p)$ = ring automorphisms of the field $\mathbb{F}_p = \mathbb{Z}/p\mathbb{Z}$.

**Step 1: A ring automorphism fixes $\{0, 1\}$.** By $\varphi(0) = 0$ and $\varphi(1) = 1$ (unital).

**Step 2: Induction.** For $n \ge 0$,
$$\varphi(n) = \varphi(\underbrace{1 + 1 + \cdots + 1}_{n}) = n \cdot \varphi(1) = n.$$
For $n < 0$: $\varphi(n) = -\varphi(-n) = n$. So $\varphi(k) = k$ for all $k \in \mathbb{Z}$.

**Step 3: Reduce to $\mathbb{F}_p$.** Since every element of $\mathbb{F}_p$ is the image of some integer under reduction, $\varphi([k]_p) = [k]_p$, so $\varphi = \operatorname{id}$.

**Conclusion.** $\operatorname{Aut}(\mathbb{F}_p) = \{\operatorname{id}\}$, the trivial group.

*Verification.* This is consistent with the Frobenius map $\phi_p(a) = a^p$ being the identity on $\mathbb{F}_p$ by Fermat's Little Theorem ($a^p = a$ for all $a \in \mathbb{F}_p$). More generally, $\operatorname{Aut}(\mathbb{F}_{p^n}) \cong \mathbb{Z}_n$, generated by Frobenius; for $n = 1$ we get $\mathbb{Z}_1 = \{\operatorname{id}\}$. $\checkmark$

$\boxed{\operatorname{Aut}(\mathbb{F}_p) = \{\operatorname{id}\}.}$ $\blacksquare$

---

**Solution 8.**

Let $R$ be a commutative ring with unity, $I, J$ ideals with $I + J = R$. Show $I^m + J^n = R$ for all $m, n \ge 1$.

**Setup.** Write $1 = a + b$ with $a \in I, b \in J$.

**Strategy.** Raise $1 = a + b$ to a sufficiently large power and expand; every term will lie in $I^m$ or $J^n$.

**Step 1: Raise to power $m + n - 1$.**

$$1 = 1^{m + n - 1} = (a + b)^{m + n - 1} = \sum_{k = 0}^{m + n - 1} \binom{m + n - 1}{k} a^k b^{m + n - 1 - k}.$$

**Step 2: Analyze each term.**

For each $k$ in $0, 1, \ldots, m + n - 1$:
- If $k \ge m$: $a^k = a^m \cdot a^{k - m} \in I^m$ (since $a \in I$, so $a^m \in I^m$, and then $a^{k-m} \in R$ times).
- If $k < m$: $k \le m - 1$, so $m + n - 1 - k \ge m + n - 1 - (m - 1) = n$; hence $b^{m + n - 1 - k} = b^n \cdot b^{m - 1 - k} \in J^n$.

Thus every term $\binom{m + n - 1}{k} a^k b^{m + n - 1 - k}$ lies in $I^m$ or $J^n$ (possibly both).

**Step 3: Conclude.**

$$1 = \sum_{k < m} \binom{\cdots}{k} a^k b^{m + n - 1 - k} + \sum_{k \ge m} \binom{\cdots}{k} a^k b^{m + n - 1 - k} \in J^n + I^m = I^m + J^n.$$

Since $1 \in I^m + J^n$ and $I^m + J^n$ is an ideal, $I^m + J^n = R$. $\blacksquare$

*Corollary (applied in CRT inductively).* If $I_1, \ldots, I_k$ are pairwise coprime and $n_1, \ldots, n_k \ge 1$, then $I_1^{n_1}, \ldots, I_k^{n_k}$ are pairwise coprime. (This is what justifies CRT for $\mathbb{Z}/p_1^{a_1} \cdots p_k^{a_k}\mathbb{Z}$ decompositions in arithmetic: $\langle p_i^{a_i}\rangle$ and $\langle p_j^{a_j}\rangle$ remain coprime as long as $p_i \neq p_j$.)

*Example.* In $\mathbb{Z}$, $\langle 2\rangle$ and $\langle 3\rangle$ are coprime, and the solution shows $\langle 4\rangle + \langle 9\rangle = \langle 2^2\rangle + \langle 3^2\rangle = \mathbb{Z}$ (verify: $1 = 9 - 8 = 9 - 2 \cdot 4 \in \langle 4\rangle + \langle 9\rangle$ $\checkmark$).

---

## Related Concepts

- [[17-homomorphisms-and-isomorphisms]] — group-homomorphism version; ring homomorphisms specialize to additive-group homomorphisms.
- [[18-isomorphism-theorems]] — structurally parallel results for groups.
- [[22-ideals-and-quotient-rings]] — kernels are exactly ideals; the material this chapter rests on.
- [[24-polynomial-rings]] — the universal property of $R[x]$ fits into polynomial-ring theory.
- [[26-fields-and-irreducibility]] — evaluation homomorphisms and field extensions.
- [[27-finite-fields-and-extensions]] — Frobenius automorphisms and Galois groups.

---

*Last updated: 2026-04-19*
