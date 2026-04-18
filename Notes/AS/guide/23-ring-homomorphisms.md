---
title: "Ring Homomorphisms"
type: guide
co: CO4
related: [17-homomorphisms-and-isomorphisms, 22-ideals-and-quotient-rings, 18-isomorphism-theorems]
---

# 23. Ring Homomorphisms

A **ring homomorphism** is a map between rings preserving both operations — addition and multiplication. This chapter develops the theory in parallel with [[17-homomorphisms-and-isomorphisms]] and [[18-isomorphism-theorems]]: kernel, image, First/Second/Third Isomorphism Theorems for rings, evaluation homomorphisms, and the Chinese Remainder Theorem.

## 23.1 Definition

> **Definition 23.1 (Ring homomorphism).** Let $R, S$ be rings. A function $\varphi: R \to S$ is a **ring homomorphism** if for all $a, b \in R$:
> 1. $\varphi(a + b) = \varphi(a) + \varphi(b)$
> 2. $\varphi(ab) = \varphi(a)\varphi(b)$

If both $R$ and $S$ have unity, we **also** require $\varphi(1_R) = 1_S$ (unital homomorphism) unless stated otherwise.

### Basic properties

> **Proposition 23.2.** If $\varphi: R \to S$ is a ring homomorphism:
> 1. $\varphi(0) = 0$.
> 2. $\varphi(-a) = -\varphi(a)$.
> 3. If unital: $\varphi(a^n) = \varphi(a)^n$ for $n \ge 0$.
> 4. If $a$ is a unit in $R$, then $\varphi(a)$ is a unit in $S$ with $\varphi(a)^{-1} = \varphi(a^{-1})$.

## 23.2 Examples

**Example 1 (Identity).** $\operatorname{id}: R \to R$.

**Example 2 (Inclusion).** $\mathbb{Z} \hookrightarrow \mathbb{Q} \hookrightarrow \mathbb{R} \hookrightarrow \mathbb{C}$.

**Example 3 (Reduction mod $n$).** $\pi: \mathbb{Z} \to \mathbb{Z}_n$, $\pi(k) = k \bmod n$. Surjective. Kernel = $n\mathbb{Z}$.

**Example 4 (Evaluation).** $\operatorname{ev}_a: \mathbb{F}[x] \to \mathbb{F}$, $p(x) \mapsto p(a)$. Ring homomorphism for any $a \in \mathbb{F}$.

**Example 5 (Complex conjugation).** $c: \mathbb{C} \to \mathbb{C}$, $c(a + bi) = a - bi$. Ring automorphism.

**Example 6 (Projection in direct product).** $\pi_1: R \times S \to R$, $(r, s) \mapsto r$. Kernel = $\{0\} \times S$.

**Example 7 (Frobenius in characteristic $p$).** In a commutative ring $R$ of characteristic $p$ prime, $\phi_p(a) = a^p$ is a ring homomorphism (Theorem 21.7).

### Non-examples

**Example 8.** $f: \mathbb{Z} \to \mathbb{Z}$, $f(n) = 2n$. Preserves $+$ but $f(mn) = 2mn \neq f(m)f(n) = 4mn$. Not a ring homomorphism.

**Example 9.** $g: \mathbb{Z} \to \mathbb{Z}$, $g(n) = n^2$. $g(m + n) = (m+n)^2 \neq m^2 + n^2 = g(m) + g(n)$ in general. Not.

## 23.3 Kernel and Image

> **Definition 23.3.**
> - **Kernel:** $\ker \varphi = \{r \in R : \varphi(r) = 0\}$
> - **Image:** $\operatorname{Im} \varphi = \{\varphi(r) : r \in R\}$

> **Proposition 23.4.**
> 1. $\ker \varphi$ is an **ideal** of $R$ (not just a subring!).
> 2. $\operatorname{Im} \varphi$ is a **subring** of $S$ (not necessarily an ideal).

*Proof.*

**(1).** $\ker \varphi$ is a subgroup under $+$ (standard). Absorption: for $r \in R$ and $a \in \ker \varphi$:
$$\varphi(ra) = \varphi(r)\varphi(a) = \varphi(r) \cdot 0 = 0,$$
so $ra \in \ker \varphi$. Similarly $ar \in \ker \varphi$.

**(2).** $0 = \varphi(0) \in \operatorname{Im}\varphi$. Closed under $+$ and $\cdot$ since $\varphi$ preserves them.

If $\varphi$ is unital, $1_S = \varphi(1_R) \in \operatorname{Im}\varphi$. $\blacksquare$

### Kernel = $\{0\} \iff$ injective

> **Proposition 23.5.** $\varphi: R \to S$ is injective iff $\ker \varphi = \{0\}$.

Same proof as for groups. $\blacksquare$

## 23.4 First Isomorphism Theorem for Rings

> **Theorem 23.6.** Let $\varphi: R \to S$ be a ring homomorphism. Then
> $$R / \ker \varphi \cong \operatorname{Im} \varphi$$
> as rings, via $a + \ker\varphi \mapsto \varphi(a)$.

*Proof.* Same construction as the group version, plus checking multiplicative compatibility:
$$\bar\varphi((a + \ker\varphi)(b + \ker\varphi)) = \bar\varphi(ab + \ker\varphi) = \varphi(ab) = \varphi(a)\varphi(b) = \bar\varphi(a + \ker\varphi) \bar\varphi(b + \ker\varphi).$$
$\blacksquare$

### Applications

**Example 10.** $\mathbb{Z}/n\mathbb{Z} \cong \mathbb{Z}_n$ (canonical).

**Example 11.** $\mathbb{R}[x]/\langle x^2 + 1 \rangle \cong \mathbb{C}$ via $p(x) \mapsto p(i)$ (Example 15 of [[22-ideals-and-quotient-rings]]).

**Example 12.** $\mathbb{Z}[x]/\langle x - a \rangle \cong \mathbb{Z}$ via $p(x) \mapsto p(a)$, for any $a \in \mathbb{Z}$.

**Example 13.** $\mathbb{R}[x]/\langle x^2 - 2 \rangle \cong \mathbb{R}[\sqrt{2}] = \mathbb{Q}(\sqrt{2})$ (as a field)... wait, $\mathbb{R}[x]/\langle x^2 - 2 \rangle$: is this a field? $x^2 - 2 = (x - \sqrt{2})(x + \sqrt{2})$ in $\mathbb{R}[x]$, so **reducible**. The quotient is **not** an integral domain (has zero divisors). Hmm. Let me redo: $x^2 - 2$ is reducible over $\mathbb{R}$, so $\mathbb{R}[x]/\langle x^2 - 2 \rangle$ is not a field.

What's the structure? By CRT: $\mathbb{R}[x]/\langle x^2 - 2 \rangle \cong \mathbb{R}[x]/\langle x - \sqrt 2 \rangle \times \mathbb{R}[x]/\langle x + \sqrt 2 \rangle \cong \mathbb{R} \times \mathbb{R}$.

Correct example: $\mathbb{Q}[x]/\langle x^2 - 2 \rangle \cong \mathbb{Q}(\sqrt 2)$, since $x^2 - 2$ is irreducible over $\mathbb{Q}$.

## 23.5 Second and Third Isomorphism Theorems for Rings

> **Theorem 23.7 (Second Isomorphism).** Let $R$ be a ring, $S \le R$ a subring, $I \trianglelefteq R$ an ideal. Then:
> 1. $S + I$ is a subring of $R$.
> 2. $S \cap I$ is an ideal of $S$.
> 3. $(S + I)/I \cong S/(S \cap I)$.

> **Theorem 23.8 (Third Isomorphism).** If $I \subseteq J$ are ideals of $R$:
> $$(R/I) / (J/I) \cong R/J.$$

> **Theorem 23.9 (Correspondence).** Let $I \trianglelefteq R$. Ideals of $R/I$ correspond bijectively to ideals of $R$ containing $I$.

Same proofs as for groups (§18.1–18.4), with "subgroup → subring" and "normal subgroup → ideal" adjustments. $\blacksquare$

## 23.6 Evaluation Homomorphisms

> **Theorem 23.10 (Universal property of $R[x]$).** For any commutative ring $R$, any $a \in R$, and any commutative ring $S$ containing $R$ as a subring, there is a unique ring homomorphism
> $$\operatorname{ev}_a: R[x] \to S$$
> extending the inclusion $R \hookrightarrow S$ with $\operatorname{ev}_a(x) = a$.

This is given by evaluation: $\operatorname{ev}_a(p(x)) = p(a)$.

**Example 14.** $\operatorname{ev}_{\sqrt{2}}: \mathbb{Q}[x] \to \mathbb{R}$, $p(x) \mapsto p(\sqrt{2})$. Image = $\mathbb{Q}(\sqrt{2}) = \{a + b\sqrt{2} : a, b \in \mathbb{Q}\}$. Kernel = $\langle x^2 - 2 \rangle$ (minimal polynomial of $\sqrt 2$).

First Iso: $\mathbb{Q}[x]/\langle x^2 - 2 \rangle \cong \mathbb{Q}(\sqrt{2})$.

**Example 15.** $\operatorname{ev}_i: \mathbb{R}[x] \to \mathbb{C}$, $p(x) \mapsto p(i)$. Image $= \mathbb{C}$. Kernel $= \langle x^2 + 1 \rangle$. First Iso: $\mathbb{R}[x]/\langle x^2 + 1\rangle \cong \mathbb{C}$.

## 23.7 Chinese Remainder Theorem for Rings

> **Theorem 23.11 (CRT).** Let $R$ be a commutative ring with unity, and $I_1, I_2, \ldots, I_k$ pairwise **coprime** ideals (i.e., $I_i + I_j = R$ for $i \neq j$). Then
> $$R/(I_1 \cap I_2 \cap \cdots \cap I_k) \cong R/I_1 \times R/I_2 \times \cdots \times R/I_k.$$
> Moreover, $I_1 \cap \cdots \cap I_k = I_1 I_2 \cdots I_k$ under coprimality.

*Proof (k=2).* Define $\varphi: R \to R/I_1 \times R/I_2$, $\varphi(r) = (r + I_1, r + I_2)$. Homomorphism. Kernel: $r \in I_1 \cap I_2$.

Surjective: need to show every $(r_1 + I_1, r_2 + I_2)$ in the product is hit. Since $I_1 + I_2 = R$, write $1 = a_1 + a_2$ with $a_i \in I_i$. Then
$$r = r_1 a_2 + r_2 a_1$$
satisfies $r - r_1 = r_1(a_2 - 1) + r_2 a_1 = -r_1 a_1 + r_2 a_1 = a_1(r_2 - r_1) \in I_1$. Similarly $r - r_2 \in I_2$. ✓

First Iso: $R/(I_1 \cap I_2) \cong R/I_1 \times R/I_2$. $\blacksquare$

### Classical CRT

**Example 16.** In $\mathbb{Z}$: $\langle m \rangle$ and $\langle n \rangle$ are coprime iff $\gcd(m, n) = 1$ (Bézout). Then:
$$\mathbb{Z}/\langle mn \rangle \cong \mathbb{Z}/\langle m \rangle \times \mathbb{Z}/\langle n \rangle,$$
i.e., $\mathbb{Z}_{mn} \cong \mathbb{Z}_m \times \mathbb{Z}_n$ as rings (when $\gcd = 1$).

**Example 17.** $\mathbb{Z}_{12} \cong \mathbb{Z}_3 \times \mathbb{Z}_4$ as rings. Verify: $(2, 3) \in \mathbb{Z}_3 \times \mathbb{Z}_4$ corresponds to $r \in \mathbb{Z}_{12}$ with $r \equiv 2 \pmod 3$ and $r \equiv 3 \pmod 4$. Solution: $r = 11$. Product check: $11^2 = 121 \equiv 1 \pmod{12}$, and $(2, 3)^2 = (4, 9) \equiv (1, 1) \pmod{(3, 4)} \equiv 1$. ✓

## 23.8 Automorphisms of Rings

> **Definition 23.12.** $\operatorname{Aut}(R) = \{\varphi : R \to R \text{ is a ring isomorphism}\}$.

**Example 18.** $\operatorname{Aut}(\mathbb{Z}) = \{\operatorname{id}\}$: any ring automorphism fixes 1, hence all of $\mathbb{Z}$.

**Example 19.** $\operatorname{Aut}(\mathbb{Q}) = \{\operatorname{id}\}$: fixes $\mathbb{Z}$, hence all of $\mathbb{Q}$.

**Example 20.** $\operatorname{Aut}(\mathbb{C}/\mathbb{R}) = \{\operatorname{id}, \text{conjugation}\} \cong \mathbb{Z}_2$ (continuous automorphisms over $\mathbb{R}$).

**Example 21.** $\operatorname{Aut}(\mathbb{Q}(\sqrt{2})/\mathbb{Q}) \cong \mathbb{Z}_2$ — identity and $\sqrt{2} \mapsto -\sqrt{2}$.

These are the **Galois groups** of field extensions, which we'll briefly touch on in [[27-finite-fields-and-extensions]].

## 23.9 Practice Problems

**Problem 1.** Find all ring homomorphisms $\mathbb{Z} \to \mathbb{Z}_n$.

**Problem 2.** Show that there is no non-trivial ring homomorphism $\mathbb{Q} \to \mathbb{Z}$.

**Problem 3.** Determine whether $\mathbb{Z}[x]/\langle x^2 + 1 \rangle$ and $\mathbb{Z}[i]$ are isomorphic as rings.

**Problem 4.** Let $\varphi: \mathbb{R}[x] \to \mathbb{R}$ by $\varphi(p(x)) = p(2)$. Find kernel, image, and use First Iso to express the quotient.

**Problem 5.** Use CRT to decompose $\mathbb{Z}_{60}$ as a direct product.

**Problem 6.** Show that if $\varphi: R \to S$ is a ring homomorphism and $R$ is a field, then $\varphi$ is either 0 or injective.

**Problem 7.** Find $\operatorname{Aut}(\mathbb{F}_p)$.

### Solutions

**1.** Determined by $\varphi(1)$. Need $\varphi(1)$ idempotent in $\mathbb{Z}_n$: $\varphi(1)^2 = \varphi(1)$. In $\mathbb{Z}_n$, idempotents $e$ satisfy $e^2 = e \pmod n$. For $n = p$ prime, only $0, 1$. General $n$ has more (one per distinct prime factor). $\boxed{}$

**2.** Any ring hom $\mathbb{Q} \to \mathbb{Z}$ with $\varphi(1) = 1$. Then $\varphi(1/2) = x$ with $2x = 1$ in $\mathbb{Z}$, impossible. If $\varphi(1) = 0$: trivial hom. Hence only the zero map (if unital is not required). Under unital requirement: no such hom exists. $\blacksquare$

**3.** Define $\varphi: \mathbb{Z}[x] \to \mathbb{Z}[i]$ by $x \mapsto i$. Surjective (by definition of $\mathbb{Z}[i]$). Kernel contains $x^2 + 1$. Is kernel exactly $\langle x^2 + 1 \rangle$? Yes: divide $p(x) \in \ker$ by $x^2 + 1$ in $\mathbb{Q}[x]$ (works since $x^2 + 1$ is monic), get $p(x) = (x^2 + 1)q(x) + r(x)$ with $r = a + bx$. Need $r(i) = a + bi = 0$, so $a = b = 0$, i.e., $r = 0$. Hence $p \in \langle x^2 + 1 \rangle$. First Iso: $\mathbb{Z}[x]/\langle x^2 + 1 \rangle \cong \mathbb{Z}[i]$. $\boxed{\text{Isomorphic}}$

**4.** $\varphi: \mathbb{R}[x] \to \mathbb{R}$, $p \mapsto p(2)$. Surjective. Kernel: $p(2) = 0$, so $(x - 2) \mid p(x)$ in $\mathbb{R}[x]$. Hence $\ker = \langle x - 2 \rangle$. First Iso: $\mathbb{R}[x]/\langle x - 2 \rangle \cong \mathbb{R}$. $\blacksquare$

**5.** $60 = 4 \cdot 3 \cdot 5$ (pairwise coprime). CRT: $\mathbb{Z}_{60} \cong \mathbb{Z}_4 \times \mathbb{Z}_3 \times \mathbb{Z}_5$. $\boxed{}$

**6.** Ker is an ideal of $R$. But fields have only $\{0\}$ and $R$ as ideals. If $\ker = R$, $\varphi = 0$. If $\ker = \{0\}$, $\varphi$ is injective. $\blacksquare$

**7.** Any ring auto of $\mathbb{F}_p$ fixes 0 and 1, hence all $\{0, 1, 2, \ldots, p-1\}$ (by induction via $\varphi(k+1) = \varphi(k) + 1$). So only the identity. $\operatorname{Aut}(\mathbb{F}_p) = \{\operatorname{id}\}$. $\boxed{\text{Trivial}}$

## Related Concepts

- [[17-homomorphisms-and-isomorphisms]] — group version
- [[18-isomorphism-theorems]] — structurally parallel results
- [[22-ideals-and-quotient-rings]] — kernels are ideals
- [[26-fields-and-irreducibility]] — evaluation homomorphisms in field extensions
- [[27-finite-fields-and-extensions]] — Frobenius automorphisms

---

*Last updated: 2026-04-18*
