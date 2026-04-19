---
title: "Rings — Definition and Examples"
type: guide
co: CO3
related: [01-operations-and-algebraic-structures, 18-isomorphism-theorems, 21-integral-domains]
---

# 19. Rings — Definition and Examples

> **The central object.** A **ring** is a set with two compatible operations — addition and multiplication — linked by a distributive law. Rings unify and generalise the arithmetic of integers, polynomials, matrices, modular integers, and algebraic number rings.
>
> This chapter states the axioms, derives the basic consequences ($0 \cdot a = 0$, $(-a)b = -(ab)$, uniqueness of unity, units-are-not-zero-divisors), and walks through a zoo of examples: $\mathbb{Z}, \mathbb{Q}, \mathbb{R}, \mathbb{C}, \mathbb{Z}_n, M_n(\mathbb{R}), \mathbb{Z}[i], \mathbb{H}$, polynomial rings, and more. We establish the subring test, define units and zero divisors, and prove the cornerstone result: $\mathbb{Z}_n$ is a field if and only if $n$ is prime.

---

## 19.1 Definition

> **Definition 19.1 (Ring).** A **ring** is a triple $(R, +, \cdot)$ where $R$ is a non-empty set and $+, \cdot$ are binary operations on $R$ satisfying:
>
> **(R1) Additive group.** $(R, +)$ is an abelian group. Explicitly:
> - Closure: $a + b \in R$ for all $a, b \in R$.
> - Associativity: $(a+b)+c = a+(b+c)$.
> - Identity: There exists $0 \in R$ with $0 + a = a + 0 = a$ for all $a$.
> - Inverses: For each $a \in R$ there exists $-a \in R$ with $a + (-a) = (-a) + a = 0$.
> - Commutativity: $a + b = b + a$.
>
> **(R2) Multiplicative associativity.** $(ab)c = a(bc)$ for all $a, b, c \in R$.
>
> **(R3) Distributivity.** For all $a, b, c \in R$,
> $$a(b + c) = ab + ac \qquad \text{(left distributivity)}$$
> $$(a + b)c = ac + bc \qquad \text{(right distributivity)}.$$

**Notation conventions.**
- Additive identity: $0$. Additive inverse of $a$: $-a$. Subtraction: $a - b := a + (-b)$.
- Multiplication is written juxtapositionally ($ab$ instead of $a \cdot b$) whenever unambiguous.
- Repeated sums: $na := a + a + \cdots + a$ ($n$ copies, $n \in \mathbb{Z}_{\geq 0}$); $(-n)a := -(na)$; $0 \cdot a := 0$.
- Repeated products: $a^n := a \cdot a \cdots a$ ($n$ copies, $n \geq 1$); $a^0 := 1$ when $R$ has unity.

**Warning.** In the definition of a ring, multiplication is **not** required to be commutative, and $R$ need not have a multiplicative identity. Some authors (e.g. Bourbaki, some category theorists) require unity as part of the definition — we follow the convention of Gallian/Dummit-Foote that unity is optional.

> **Definition 19.2 (Optional properties).**
> - **Commutative ring.** $ab = ba$ for all $a, b \in R$.
> - **Ring with unity.** There exists $1 \in R$, $1 \neq 0$, with $1 \cdot a = a \cdot 1 = a$ for all $a \in R$.
> - **Division ring (or skew field).** Ring with unity in which every nonzero element $a$ has a multiplicative inverse $a^{-1}$.
> - **Field.** Commutative division ring.

The implications are
$$\text{field} \;\Longrightarrow\; \text{division ring}, \qquad \text{field} \;\Longrightarrow\; \text{commutative ring with unity}.$$

We will later refine these with **integral domain** (commutative ring with unity, no zero divisors) — see [[21-integral-domains]].

### Basic consequences of the axioms

> **Proposition 19.3 (Elementary ring laws).** Let $R$ be a ring and $a, b \in R$. Then:
> 1. $a \cdot 0 = 0 \cdot a = 0$ (absorption of zero).
> 2. $a(-b) = (-a)b = -(ab)$ (signs pull out of either factor).
> 3. $(-a)(-b) = ab$.
> 4. $(a - b)c = ac - bc$ and $a(b - c) = ab - ac$.
> 5. If $R$ has unity $1$ and $R \neq \{0\}$, then $1 \neq 0$ — the unity is distinct from zero.
> 6. If $R$ has unity, the unity is unique.

**Proof.** Each item requires justification; we prove all of them carefully.

**(1) $a \cdot 0 = 0$ and $0 \cdot a = 0$.**

*Step 1.* Use the fact that $0 + 0 = 0$ (additive identity applied to itself):
$$a \cdot 0 = a \cdot (0 + 0).$$

*Step 2.* Apply left distributivity (R3):
$$a \cdot (0 + 0) = a \cdot 0 + a \cdot 0.$$

*Step 3.* So $a \cdot 0 = a \cdot 0 + a \cdot 0$. Add $-(a \cdot 0)$ to both sides (we can — $(R, +)$ is a group):
$$a \cdot 0 + (-(a \cdot 0)) = (a \cdot 0 + a \cdot 0) + (-(a \cdot 0)).$$

*Step 4.* The left side is $0$. For the right, use additive associativity:
$$0 = a \cdot 0 + (a \cdot 0 + (-(a \cdot 0))) = a \cdot 0 + 0 = a \cdot 0.$$

Hence $a \cdot 0 = 0$.

The proof of $0 \cdot a = 0$ is symmetric, using $(0 + 0) \cdot a = 0 \cdot a + 0 \cdot a$ via right distributivity. $\checkmark$

**(2) $a(-b) = -(ab)$ and $(-a)b = -(ab)$.**

*Strategy.* To show $x = -y$, we verify $x + y = 0$.

Compute
$$a(-b) + ab \stackrel{(i)}{=} a((-b) + b) \stackrel{(ii)}{=} a \cdot 0 \stackrel{(iii)}{=} 0,$$
where (i) is left distributivity, (ii) is the additive-inverse property, and (iii) is part (1). Hence $a(-b)$ is an additive inverse of $ab$; by uniqueness of inverses in a group, $a(-b) = -(ab)$.

Symmetrically, $(-a)b + ab = ((-a) + a)b = 0 \cdot b = 0$, so $(-a)b = -(ab)$. $\checkmark$

**(3) $(-a)(-b) = ab$.**

Apply (2) twice:
$$(-a)(-b) = -(a(-b)) = -(-(ab)) = ab,$$
where the last step uses the standard group fact $-(-x) = x$ (the inverse of the inverse is the original element). $\checkmark$

**(4) $(a - b)c = ac - bc$.**

By definition, $a - b = a + (-b)$. Apply right distributivity, then (2):
$$(a - b)c = (a + (-b))c = ac + (-b)c = ac + (-(bc)) = ac - bc.$$
Similarly for $a(b - c) = ab - ac$. $\checkmark$

**(5) $1 \neq 0$ when $R \neq \{0\}$.**

Suppose, toward contradiction, $1 = 0$. Then for every $a \in R$,
$$a = 1 \cdot a = 0 \cdot a = 0$$
(using the unity axiom and (1)). So $R = \{0\}$, contradicting the assumption. By contrapositive, if $R \neq \{0\}$ has unity then $1 \neq 0$. $\checkmark$

**(6) Uniqueness of unity.**

Suppose $1, 1' \in R$ both satisfy $x \cdot a = a \cdot x = a$ for all $a$. Then
$$1 = 1 \cdot 1' = 1',$$
where the first equality uses $1'$ as a right identity (applied to $1$) and the second uses $1$ as a left identity (applied to $1'$). $\blacksquare$

**Interpretive remark.** Items (1)–(4) justify the familiar "sign rules" of high-school algebra in any ring — they are consequences of the axioms, not additional assumptions. In particular, they hold in non-commutative rings like $M_n(\mathbb{R})$. Item (5) is the reason we exclude the **zero ring** $\{0\}$ from "nontrivial" discussions: that ring has $1 = 0$ and is algebraically degenerate.

---

## 19.2 Examples of Rings

We verify each example in detail, so that the ring axioms become completely concrete.

### Commutative rings with unity

**Example 1 ($\mathbb{Z}$).** The integers under usual addition and multiplication.

*Verification.*
- $(\mathbb{Z}, +)$ is an abelian group (elementary).
- Multiplicative associativity: $(ab)c = a(bc)$ by standard properties of integer multiplication.
- Distributivity: $a(b+c) = ab + ac$ and $(a+b)c = ac + bc$ hold in $\mathbb{Z}$.
- Commutativity: $ab = ba$.
- Unity: $1 \cdot a = a$.

**Is $\mathbb{Z}$ a field?** No. For $\mathbb{Z}$ to be a field, every nonzero integer would need a multiplicative inverse in $\mathbb{Z}$. But $2 \cdot x = 1$ has no integer solution (the only candidate $x = 1/2 \notin \mathbb{Z}$). Units: $\mathbb{Z}^\times = \{\pm 1\}$ (see §19.4).

$\boxed{\mathbb{Z} \text{ is a commutative ring with unity but not a field.}}$

---

**Example 2 ($\mathbb{Q}, \mathbb{R}, \mathbb{C}$).** Fields under usual arithmetic.

*Verification for $\mathbb{Q}$.* The ring axioms are inherited from $\mathbb{R}$ (verified below). For the field property: if $a = p/q \in \mathbb{Q}$ is nonzero ($p, q \in \mathbb{Z}$, $p \neq 0$), then $a^{-1} = q/p \in \mathbb{Q}$ and $a \cdot a^{-1} = 1$. $\checkmark$

*Verification for $\mathbb{R}$.* The real field axioms are foundational; we treat them as given. Commutative ring with unity ✓; every nonzero real has a reciprocal ✓.

*Verification for $\mathbb{C}$.* Ring axioms: inherited from components. For the field property: $(a + bi)^{-1} = \frac{a - bi}{a^2 + b^2}$ whenever $a + bi \neq 0$ (so $a^2 + b^2 > 0$). Check: $(a + bi)(a - bi)/(a^2 + b^2) = (a^2 + b^2)/(a^2 + b^2) = 1$. ✓

$\boxed{\mathbb{Q}, \mathbb{R}, \mathbb{C} \text{ are fields.}}$

---

**Example 3 ($\mathbb{Z}_n$).** Integers modulo $n$: $\mathbb{Z}_n = \{0, 1, 2, \ldots, n-1\}$ under addition and multiplication mod $n$.

*Setup.* For $a, b \in \{0, \ldots, n-1\}$, define $a +_n b := (a + b) \bmod n$ and $a \cdot_n b := (ab) \bmod n$.

*Verification.*

**Closure.** Both $(a + b) \bmod n$ and $(ab) \bmod n$ lie in $\{0, 1, \ldots, n-1\}$ by definition. ✓

**$(\mathbb{Z}_n, +_n)$ is an abelian group.** This is Example 5 from [[03-groups-definition-and-examples]]: identity $0$, inverse $-a = n - a$ (for $a \neq 0$), commutative.

**Multiplicative associativity.** We must show
$$(a \cdot_n b) \cdot_n c = a \cdot_n (b \cdot_n c).$$
Compute the integer $((a b) \bmod n) \cdot c \bmod n$. Using the key modular-arithmetic identity $(xy) \bmod n \equiv x y \pmod n$, we have
$$((ab) \bmod n) \cdot c \equiv (ab)c \pmod n \equiv a(bc) \pmod n \equiv a \cdot ((bc) \bmod n) \pmod n.$$
Reducing mod $n$, both sides equal $(abc) \bmod n$. Hence associativity in $\mathbb{Z}_n$ inherits from associativity in $\mathbb{Z}$. ✓

**Distributivity.** Similarly,
$$a \cdot_n (b +_n c) = a \cdot_n ((b+c) \bmod n) = (a(b+c)) \bmod n = (ab + ac) \bmod n = (ab \bmod n) +_n (ac \bmod n) = (a \cdot_n b) +_n (a \cdot_n c). \checkmark$$

**Commutativity.** $(ab) \bmod n = (ba) \bmod n$, so $a \cdot_n b = b \cdot_n a$. ✓

**Unity.** $1 \cdot_n a = a \bmod n = a$ (since $a \in \{0, \ldots, n-1\}$). ✓

$\boxed{\mathbb{Z}_n \text{ is a commutative ring with unity. Field iff } n \text{ prime (Theorem 19.7)}.}$

**Remark.** The "inherited from $\mathbb{Z}$" pattern is a preview of **quotient rings**: $\mathbb{Z}_n$ is the quotient ring $\mathbb{Z}/n\mathbb{Z}$ (see [[22-ideals-and-quotient-rings]]).

---

**Example 4 ($\mathbb{Z}[x]$).** Polynomials in $x$ with integer coefficients.

Elements: formal finite sums $\sum_{i=0}^n a_i x^i$ with $a_i \in \mathbb{Z}$.

Addition: coefficient-wise — $(\sum a_i x^i) + (\sum b_i x^i) = \sum (a_i + b_i) x^i$.
Multiplication: convolution — $(\sum a_i x^i)(\sum b_j x^j) = \sum_k \left(\sum_{i + j = k} a_i b_j\right) x^k$.

*Verification.* Ring axioms reduce to $\mathbb{Z}$-axioms applied coefficient-wise. Commutative (by $\mathbb{Z}$-commutativity of products of coefficients and symmetry of the convolution sum). Unity: the constant polynomial $1$.

**Not a field.** The polynomial $x$ has no polynomial inverse: if $x \cdot p(x) = 1$, comparing degrees gives $1 + \deg p = 0$, impossible.

---

**Example 5 ($\mathbb{R}[x], \mathbb{Q}[x], \mathbb{C}[x]$).** Polynomial rings over the respective fields. Commutative rings with unity by the same verification as Example 4. None is a field (degree argument again).

**Key fact (foreshadowing).** $F[x]$ for $F$ a field is a **PID** (principal ideal domain) and a **UFD** (unique factorisation domain) — see [[24-polynomial-rings]].

---

**Example 6 (Gaussian integers $\mathbb{Z}[i]$).** $\mathbb{Z}[i] = \{a + bi : a, b \in \mathbb{Z}\} \subset \mathbb{C}$ with complex addition and multiplication.

*Verification as a ring.*

**Closure under $+$.** $(a + bi) + (c + di) = (a + c) + (b + d)i$. Since $a + c, b + d \in \mathbb{Z}$, the sum is in $\mathbb{Z}[i]$. ✓

**Closure under $\cdot$.** Compute
$$(a + bi)(c + di) = ac + adi + bci + bdi^2 = (ac - bd) + (ad + bc)i.$$
Since $ac - bd, ad + bc \in \mathbb{Z}$, the product is in $\mathbb{Z}[i]$. ✓

**Abelian additive group.** Inherited from $(\mathbb{C}, +)$; the subset $\mathbb{Z}[i]$ is closed under $+$ and contains $0 = 0 + 0i$ and inverses $-(a+bi) = (-a) + (-b)i$.

**Associativity, distributivity, commutativity.** All inherited from $\mathbb{C}$.

**Unity.** $1 = 1 + 0i \in \mathbb{Z}[i]$.

$\boxed{\mathbb{Z}[i] \text{ is a commutative ring with unity.}}$

**Is $\mathbb{Z}[i]$ a field?** No. The element $1 + i$ has complex inverse $(1-i)/2 \notin \mathbb{Z}[i]$. Units: $\mathbb{Z}[i]^\times = \{\pm 1, \pm i\}$ (Example 21 below).

**Geometric interpretation.** $\mathbb{Z}[i]$ is the lattice of integer points in $\mathbb{C}$. The **norm** $N(a + bi) = a^2 + b^2$ is multiplicative and takes values in $\mathbb{Z}_{\geq 0}$, making $\mathbb{Z}[i]$ a **Euclidean domain** (not covered here but see [[21-integral-domains]]).

---

**Example 7 ($\mathbb{Z}[\sqrt{d}]$).** For $d \in \mathbb{Z}$ squarefree (and $d \neq 0, 1$), $\mathbb{Z}[\sqrt{d}] = \{a + b\sqrt{d} : a, b \in \mathbb{Z}\}$.

*Verification (general form).*

Closure under $+$: $(a + b\sqrt d) + (c + d'\sqrt d) = (a + c) + (b + d')\sqrt d$. ✓

Closure under $\cdot$:
$$(a + b\sqrt d)(c + e\sqrt d) = ac + ae\sqrt d + bc\sqrt d + be d = (ac + bed) + (ae + bc)\sqrt d.$$
Both $(ac + bed)$ and $(ae + bc)$ are integers. ✓

The remaining ring axioms are inherited from $\mathbb{R}$ (when $d > 0$) or $\mathbb{C}$ (when $d < 0$; write $\sqrt d = i\sqrt{|d|}$).

**Special cases.** $\mathbb{Z}[\sqrt{-1}] = \mathbb{Z}[i]$ (Gaussian integers). $\mathbb{Z}[\sqrt{2}]$, $\mathbb{Z}[\sqrt{-2}]$, etc. are rings of quadratic integers, central to number theory.

---

### Non-commutative rings with unity

**Example 8 ($M_n(\mathbb{R})$).** $n \times n$ real matrices under matrix addition and multiplication.

*Verification for $n = 2$ (generalises).*

**Closure under $+$.** Entrywise sum. ✓

**$(M_n(\mathbb{R}), +)$ abelian group.** Zero matrix is identity; negatives are entrywise negatives.

**Associativity of $\cdot$.** For $A, B, C \in M_n(\mathbb{R})$, the $(i,j)$-entry of $(AB)C$ is
$$((AB)C)_{ij} = \sum_k (AB)_{ik} C_{kj} = \sum_k \sum_\ell A_{i\ell} B_{\ell k} C_{kj}.$$
The $(i,j)$-entry of $A(BC)$ is
$$(A(BC))_{ij} = \sum_\ell A_{i\ell} (BC)_{\ell j} = \sum_\ell A_{i\ell} \sum_k B_{\ell k} C_{kj}.$$
Both equal the double sum $\sum_{k,\ell} A_{i\ell} B_{\ell k} C_{kj}$ (sums over finite index sets can be reordered). ✓

**Distributivity.** $(A(B + C))_{ij} = \sum_k A_{ik}(B+C)_{kj} = \sum_k (A_{ik}B_{kj} + A_{ik}C_{kj}) = (AB)_{ij} + (AC)_{ij}$, so $A(B+C) = AB + AC$. Similarly $(A+B)C = AC + BC$. ✓

**Unity.** $I_n$ (the identity matrix).

**Non-commutative for $n \geq 2$.** Take
$$A = \begin{pmatrix} 0 & 1 \\ 0 & 0 \end{pmatrix}, \qquad B = \begin{pmatrix} 0 & 0 \\ 1 & 0 \end{pmatrix}.$$
Then
$$AB = \begin{pmatrix} 1 & 0 \\ 0 & 0 \end{pmatrix}, \qquad BA = \begin{pmatrix} 0 & 0 \\ 0 & 1 \end{pmatrix}.$$
Different. ✓

$\boxed{M_n(\mathbb{R}) \text{ is a non-commutative ring with unity, } n \geq 2.}$

**Zero divisors in $M_n(\mathbb{R})$.** With the same $A, B$ above, $A \neq 0, B \neq 0$, but any singular matrix $A$ has some $B \neq 0$ with $AB = 0$ (take $B$ with columns in $\ker A$). So $M_n(\mathbb{R})$ has lots of zero divisors — unlike $\mathbb{Z}$ or fields.

---

**Example 9 (Quaternions $\mathbb{H}$).** $\mathbb{H} = \{a + bi + cj + dk : a, b, c, d \in \mathbb{R}\}$ with the Hamilton relations
$$i^2 = j^2 = k^2 = ijk = -1.$$
These relations imply $ij = k, jk = i, ki = j$ and $ji = -k, kj = -i, ik = -j$.

*Verification.*

**Additive group.** Componentwise — isomorphic as additive group to $\mathbb{R}^4$.

**Multiplication well-defined, associative, distributive.** Extend the Hamilton relations linearly. Associativity is routine (but tedious) to check on basis elements $\{1, i, j, k\}$.

**Unity.** $1$.

**Non-commutative.** $ij = k$ but $ji = -k$.

**Division ring.** For $q = a + bi + cj + dk$, define the **conjugate** $\bar q = a - bi - cj - dk$ and **norm** $N(q) = q \bar q = a^2 + b^2 + c^2 + d^2$. One checks $N(q) \in \mathbb{R}_{\geq 0}$ and $N(q) = 0 \iff q = 0$. For $q \neq 0$,
$$q^{-1} = \frac{\bar q}{N(q)} \in \mathbb{H}.$$
Verification: $q \cdot \frac{\bar q}{N(q)} = \frac{q \bar q}{N(q)} = \frac{N(q)}{N(q)} = 1$. ✓

$\boxed{\mathbb{H} \text{ is a division ring, non-commutative — the only non-commutative division algebra over } \mathbb{R} \text{ that is finite-dimensional (Frobenius's theorem).}}$

---

### Commutative rings without unity

**Example 10 ($2\mathbb{Z}$).** Even integers $\{\ldots, -4, -2, 0, 2, 4, \ldots\}$ under usual $+, \cdot$.

*Verification.*

Closure under $+$: $(2m) + (2n) = 2(m + n) \in 2\mathbb{Z}$. ✓
Closure under $\cdot$: $(2m)(2n) = 4mn = 2(2mn) \in 2\mathbb{Z}$. ✓
Abelian additive group: $0 \in 2\mathbb{Z}$; $-(2n) = 2(-n) \in 2\mathbb{Z}$.
Associativity, distributivity, commutativity: inherited from $\mathbb{Z}$.

**No unity.** A unity $u$ would satisfy $u \cdot 2 = 2$, i.e., $u = 1$. But $1 \notin 2\mathbb{Z}$. So $2\mathbb{Z}$ has no multiplicative identity.

$\boxed{2\mathbb{Z} \text{ is a commutative ring without unity.}}$

---

**Example 11 ($C_c(\mathbb{R})$).** Real continuous functions on $\mathbb{R}$ with compact support, under pointwise $+$ and $\cdot$.

$f$ has compact support means $\{x : f(x) \neq 0\}$ has compact closure.

Ring axioms: routine pointwise verification. **No unity:** the constant function $1$ doesn't have compact support (since $\{x : 1 \neq 0\} = \mathbb{R}$ is not compact).

---

### Zero ring

**Example 12 (Zero ring).** $R = \{0\}$ with $0 + 0 = 0, 0 \cdot 0 = 0$.

Ring axioms trivially satisfied. Here $0$ is both the additive and the multiplicative identity — the only ring in which $1 = 0$. Often excluded from "rings with unity" by requiring $1 \neq 0$.

---

## 19.3 Subrings

> **Definition 19.4.** A subset $S \subseteq R$ is a **subring** if $S$ is itself a ring under the operations inherited from $R$.

Explicitly, $S$ is a subring means: $S$ is closed under $+, -, \cdot$ and contains $0$. The multiplication and addition from $R$, restricted to $S$, still satisfy all the ring axioms — but associativity, distributivity, and commutativity (if $R$ is commutative) come for free from $R$, so we only need to check closure.

> **Theorem (Subring test).** Let $R$ be a ring and $S \subseteq R$, $S \neq \emptyset$. Then $S$ is a subring of $R$ if and only if:
> 1. $a - b \in S$ for all $a, b \in S$ (closure under subtraction).
> 2. $ab \in S$ for all $a, b \in S$ (closure under multiplication).

**Proof of Subring Test.**

($\Rightarrow$) If $S$ is a subring, it is closed under $+, \cdot$ and contains additive inverses. Thus $a, b \in S \Rightarrow a + (-b) = a - b \in S$ and $ab \in S$.

($\Leftarrow$) Assume (1) and (2). We verify $S$ is a ring.

*Step 1: $0 \in S$.* Pick any $a \in S$ (non-empty). Then $a - a = 0 \in S$ by (1).

*Step 2: $-a \in S$ for all $a \in S$.* With $b = a, a$ from step 1, $0 - a = -a \in S$ by (1).

*Step 3: Closure under $+$.* For $a, b \in S$: $-b \in S$ (step 2), so $a - (-b) = a + b \in S$ by (1).

*Step 4: Abelian group structure.* Associativity and commutativity of $+$ in $S$ inherit from $R$. Combined with steps 1–3, $(S, +)$ is an abelian group.

*Step 5: Multiplicative structure.* Closure holds by (2). Associativity and distributivity inherit from $R$.

Hence $S$ is a ring. $\blacksquare$

**Remark on unity.** The Subring Test does *not* require $1 \in S$, even if $R$ has unity. Indeed, $2\mathbb{Z}$ is a subring of $\mathbb{Z}$ by this test but lacks unity. Some authors (Dummit-Foote for unital rings) require $1 \in S$ in the subring definition, so caution with conventions.

**Example 13 (Chain of fields).** $\mathbb{Z} \subset \mathbb{Q} \subset \mathbb{R} \subset \mathbb{C}$. Each inclusion is a subring inclusion. Verify via subring test: sums, differences, products of integers stay in $\mathbb{Z}$ (etc.). $\checkmark$

**Example 14 ($n\mathbb{Z}$).** For $n \geq 0$, $n\mathbb{Z} = \{nk : k \in \mathbb{Z}\}$ is a subring of $\mathbb{Z}$.

*Verify.* $nk - n\ell = n(k - \ell) \in n\mathbb{Z}$; $(nk)(n\ell) = n(nk\ell) \in n\mathbb{Z}$. Both checks pass. ✓

Note: $n\mathbb{Z}$ has unity iff $n = 1$ (i.e., $n\mathbb{Z} = \mathbb{Z}$).

**Example 15 ($\mathbb{Z}[i] \subset \mathbb{C}$).** Subring by Example 6 verification.

**Example 16 (Upper triangular matrices).** $T_n(\mathbb{R}) = \{A \in M_n(\mathbb{R}) : A_{ij} = 0 \text{ for } i > j\}$.

*Verify.*
Difference: upper-triangular minus upper-triangular is upper-triangular (entrywise). ✓
Product: $(AB)_{ij} = \sum_k A_{ik}B_{kj}$; for $i > j$, $A_{ik} = 0$ whenever $k < i$, and $B_{kj} = 0$ whenever $k > j$. So every term has either $A_{ik} = 0$ (if $k < i$) or $B_{kj} = 0$ (if $k > j \geq i - 1$, i.e., $k \geq i$). Hence $(AB)_{ij} = 0$ for $i > j$. ✓

Contains $I_n$ (unity). Non-commutative for $n \geq 2$.

---

## 19.4 Units

> **Definition 19.5 (Unit).** Let $R$ be a ring with unity $1$. An element $a \in R$ is a **unit** if there exists $b \in R$ with $ab = ba = 1$. Such $b$ is the **multiplicative inverse** of $a$, written $a^{-1}$.

The set of units is denoted $R^\times$ (or $U(R)$, or $R^\ast$).

> **Proposition 19.6.** $(R^\times, \cdot)$ is a group — the **group of units** of $R$.

**Proof.**

*Step 1: Closure.* If $a, b \in R^\times$ with inverses $a^{-1}, b^{-1}$, then $ab$ has inverse $b^{-1}a^{-1}$:
$$(ab)(b^{-1}a^{-1}) = a(bb^{-1})a^{-1} = a \cdot 1 \cdot a^{-1} = aa^{-1} = 1,$$
$$(b^{-1}a^{-1})(ab) = b^{-1}(a^{-1}a)b = b^{-1} \cdot 1 \cdot b = 1.$$
So $ab \in R^\times$. ✓

*Step 2: Associativity.* Inherited from $R$. ✓

*Step 3: Identity.* $1 \in R^\times$ since $1 \cdot 1 = 1$. ✓

*Step 4: Inverses.* If $a \in R^\times$ with $a^{-1}$, then $a^{-1} \in R^\times$ (its inverse is $a$). ✓

$\blacksquare$

**Uniqueness of $a^{-1}$.** If $ab = ba = 1 = ac = ca$, then
$$b = b \cdot 1 = b(ac) = (ba)c = 1 \cdot c = c.$$
So inverses are unique — the notation $a^{-1}$ is well-defined.

### Worked examples of units

**Example 17 ($\mathbb{Z}^\times = \{\pm 1\}$).**

*Claim.* The only units in $\mathbb{Z}$ are $\pm 1$.

*Proof.* $1 \cdot 1 = 1$ and $(-1)(-1) = 1$, so $\pm 1 \in \mathbb{Z}^\times$. Conversely, if $a \in \mathbb{Z}^\times$ with $ab = 1$, then $|a| \cdot |b| = |ab| = 1$. Since $|a|, |b|$ are non-negative integers with product $1$, both must equal $1$. So $|a| = 1$, i.e., $a = \pm 1$. $\blacksquare$

**Example 18 (Field units).** If $F$ is a field, $F^\times = F \setminus \{0\}$.

*Proof.* By definition, every nonzero element of a field has an inverse. Conversely, $0$ is never a unit: if $0 \cdot b = 1$, the left side is $0$ by Proposition 19.3(1), but the right is $1 \neq 0$ (since $F \neq \{0\}$). $\blacksquare$

In particular, $\mathbb{Q}^\times = \mathbb{Q} \setminus \{0\}$, $\mathbb{R}^\times = \mathbb{R} \setminus \{0\}$, $\mathbb{C}^\times = \mathbb{C} \setminus \{0\}$.

**Example 19 ($\mathbb{Z}_n^\times = U(n)$).**

*Claim.* $a \in \mathbb{Z}_n$ is a unit iff $\gcd(a, n) = 1$.

*Proof.*

($\Rightarrow$) If $ab \equiv 1 \pmod n$, then $ab - 1 = kn$ for some $k \in \mathbb{Z}$, i.e., $ab - kn = 1$. Any common divisor $d$ of $a, n$ divides $ab - kn = 1$, so $d = 1$. Hence $\gcd(a, n) = 1$.

($\Leftarrow$) If $\gcd(a, n) = 1$, by Bézout's lemma there exist $x, y \in \mathbb{Z}$ with $ax + ny = 1$. Reducing mod $n$: $ax \equiv 1 \pmod n$. So $a$ has inverse $x \bmod n$ in $\mathbb{Z}_n$. $\blacksquare$

In $\mathbb{Z}_n^\times$-notation, this recovers $U(n)$ from [[03-groups-definition-and-examples]]. $|\mathbb{Z}_n^\times| = \varphi(n)$ (Euler's totient).

**Example 20 ($M_n(\mathbb{R})^\times = GL_n(\mathbb{R})$).**

A matrix $A \in M_n(\mathbb{R})$ has a multiplicative inverse iff $\det A \neq 0$. So $M_n(\mathbb{R})^\times = GL_n(\mathbb{R})$, the general linear group.

**Example 21 ($\mathbb{Z}[i]^\times = \{\pm 1, \pm i\}$).**

*Claim.* The units in $\mathbb{Z}[i]$ are exactly $\{1, -1, i, -i\}$ — the four fourth roots of unity.

*Proof.* We use the norm $N(a + bi) = a^2 + b^2$.

**Lemma.** $N(\alpha \beta) = N(\alpha) N(\beta)$ for $\alpha, \beta \in \mathbb{Z}[i]$.

*Proof of lemma.* $N(\alpha) = \alpha \bar\alpha$ where $\bar\alpha$ is complex conjugation. Then $N(\alpha\beta) = (\alpha\beta)\overline{(\alpha\beta)} = \alpha\beta\bar\alpha\bar\beta = (\alpha\bar\alpha)(\beta\bar\beta) = N(\alpha) N(\beta)$ (using commutativity of $\mathbb{C}$). ✓

**Using the lemma.** Suppose $\alpha \in \mathbb{Z}[i]^\times$ with inverse $\beta$. Then $\alpha \beta = 1$, so
$$N(\alpha) N(\beta) = N(1) = 1.$$
Both $N(\alpha), N(\beta)$ are non-negative integers with product $1$. So $N(\alpha) = 1$.

$N(a + bi) = a^2 + b^2 = 1$ with $a, b \in \mathbb{Z}$ forces $(a, b) \in \{(1, 0), (-1, 0), (0, 1), (0, -1)\}$, giving $\alpha \in \{1, -1, i, -i\}$. ✓

Conversely, each of these is indeed a unit: $1 \cdot 1 = 1$, $(-1)(-1) = 1$, $i \cdot (-i) = -i^2 = 1$, $(-i) \cdot i = 1$. $\blacksquare$

**Group-theoretic identification.** $\mathbb{Z}[i]^\times \cong \mathbb{Z}_4$: cyclic of order $4$, generated by $i$ (since $i^1 = i, i^2 = -1, i^3 = -i, i^4 = 1$).

**Example 22 ($\mathbb{Z}[x]^\times = \{\pm 1\}$).**

*Claim.* The only units in $\mathbb{Z}[x]$ are the constant polynomials $\pm 1$.

*Proof.* Suppose $p(x) q(x) = 1$ with $p, q \in \mathbb{Z}[x]$. Take degrees: $\deg(pq) = \deg p + \deg q$ (since $\mathbb{Z}$ has no zero divisors — leading coefficients don't cancel). So $\deg p + \deg q = \deg 1 = 0$, forcing $\deg p = \deg q = 0$. Both are nonzero constants $p = a, q = b$ with $ab = 1$. By Example 17, $a = \pm 1$. $\blacksquare$

---

### Units versus zero divisors

> **Proposition 19.10 (Units are not zero divisors).** In a ring $R$ with unity, a unit $a$ is not a zero divisor.

This is a crucial compatibility result, foreshadowing that fields (where every nonzero element is a unit) have no zero divisors (Corollary 19.11).

**Proof.** Suppose $a \in R^\times$ with inverse $a^{-1}$. We must show: if $ab = 0$ or $ba = 0$ for some $b \in R$, then $b = 0$.

*Case 1: $ab = 0$.* Left-multiply by $a^{-1}$:
$$a^{-1}(ab) = a^{-1} \cdot 0 = 0$$
(last step by Proposition 19.3(1)). The left side is
$$a^{-1}(ab) = (a^{-1}a)b = 1 \cdot b = b.$$
So $b = 0$. ✓

*Case 2: $ba = 0$.* Right-multiply by $a^{-1}$: $ba \cdot a^{-1} = 0$, so $b(aa^{-1}) = b \cdot 1 = b = 0$. ✓

In either case $b = 0$, so $a$ is not a zero divisor. $\blacksquare$

**Contrapositive form.** *A zero divisor cannot be a unit.* In $\mathbb{Z}_6$, the element $2$ is a zero divisor ($2 \cdot 3 = 0$); correspondingly $2$ is not a unit ($\gcd(2, 6) = 2 \neq 1$).

---

## 19.5 Fields

> **Theorem 19.7 ($\mathbb{Z}_n$ is a field iff $n$ is prime).**

This is one of the most-used facts in undergraduate algebra: it is the reason $\mathbb{F}_p = \mathbb{Z}_p$ is a field for prime $p$.

**Proof.**

**($\Leftarrow$) $n = p$ prime $\Rightarrow \mathbb{Z}_p$ is a field.**

*Setup.* We must show every nonzero $a \in \mathbb{Z}_p$ has a multiplicative inverse.

*Step 1.* $\mathbb{Z}_p$ is a commutative ring with unity (Example 3). So we need only verify: every $a \in \{1, 2, \ldots, p-1\}$ has an inverse in $\mathbb{Z}_p$.

*Step 2.* Since $1 \leq a \leq p - 1$ and $p$ is prime, $\gcd(a, p) = 1$. (Proof: $\gcd(a, p) \in \{1, p\}$ because $p$ is prime; but $p \nmid a$ since $1 \leq a < p$. So $\gcd(a, p) = 1$.)

*Step 3.* By Bézout's lemma, there exist $x, y \in \mathbb{Z}$ with $ax + py = 1$.

*Step 4.* Reduce mod $p$: $ax \equiv 1 \pmod p$, i.e., $a \cdot (x \bmod p) \equiv 1 \pmod p$. So $a^{-1} = x \bmod p$ in $\mathbb{Z}_p$. ✓

Hence $\mathbb{Z}_p^\times = \mathbb{Z}_p \setminus \{0\}$, i.e., $\mathbb{Z}_p$ is a field.

**($\Rightarrow$) $\mathbb{Z}_n$ is a field $\Rightarrow$ $n$ is prime.**

*Contrapositive form:* we show: if $n$ is composite, then $\mathbb{Z}_n$ is not a field.

*Setup.* Assume $n$ is composite, say $n = ab$ with $1 < a, b < n$.

*Step 1.* Consider $a, b \in \mathbb{Z}_n$. Both are nonzero: $1 < a < n$ implies $a \not\equiv 0 \pmod n$, similarly $b$.

*Step 2.* Compute the product in $\mathbb{Z}_n$:
$$a \cdot b = ab \bmod n = n \bmod n = 0.$$

*Step 3.* So $a \cdot b = 0$ with $a, b \neq 0$ — both are zero divisors.

*Step 4.* By Proposition 19.10 (and its contrapositive), $a$ is not a unit in $\mathbb{Z}_n$. In particular, $\mathbb{Z}_n$ has a nonzero non-unit, so it is not a field.

$\blacksquare$

**Sanity check ($n = 6$).** $6 = 2 \cdot 3$, composite. In $\mathbb{Z}_6$: $2 \cdot 3 = 6 \equiv 0$. So $2, 3$ are zero divisors; $\mathbb{Z}_6$ is not a field.

**Sanity check ($n = 7$).** Prime. Inverses: $1^{-1} = 1$, $2^{-1} = 4$ (since $2 \cdot 4 = 8 \equiv 1$), $3^{-1} = 5$ (since $3 \cdot 5 = 15 \equiv 1$), $4^{-1} = 2$, $5^{-1} = 3$, $6^{-1} = 6$ (since $6 \cdot 6 = 36 \equiv 1$). All of $\mathbb{Z}_7 \setminus \{0\}$ has inverses, so $\mathbb{Z}_7$ is a field. ✓

> **Definition 19.8.** For $p$ prime, $\mathbb{F}_p := \mathbb{Z}_p$ is the **finite field with $p$ elements**.

More generally, for every prime power $q = p^n$ there exists a unique (up to isomorphism) field $\mathbb{F}_q$ with $q$ elements — but $\mathbb{F}_{p^n} \not\cong \mathbb{Z}_{p^n}$ for $n \geq 2$ (the latter isn't a field). The construction of $\mathbb{F}_{p^n}$ uses quotient rings $\mathbb{F}_p[x]/(f(x))$ for irreducible $f$ — a topic for [[24-polynomial-rings]] or a later course.

---

## 19.6 Zero Divisors

> **Definition 19.9 (Zero divisor).** A nonzero element $a \in R$ is a **zero divisor** if there exists a nonzero $b \in R$ with $ab = 0$ or $ba = 0$.

Some authors distinguish left and right zero divisors; in a commutative ring this is unnecessary.

**Important.** By convention, $0$ is not called a zero divisor (even though $0 \cdot b = 0$ trivially). The terminology targets *nonzero* obstructions to cancellation.

**Example 23 ($\mathbb{Z}_6$).** $2 \cdot 3 = 6 \equiv 0 \pmod 6$, so both $2$ and $3$ are zero divisors in $\mathbb{Z}_6$. Likewise $4$: $4 \cdot 3 = 12 \equiv 0$, so $4$ is a zero divisor (paired with $3$).

Full zero-divisor set in $\mathbb{Z}_6$: $\{2, 3, 4\}$. Units: $\{1, 5\}$. Note $\{0, 1, 2, 3, 4, 5\} = \{0\} \sqcup \{\text{zero divisors}\} \sqcup \{\text{units}\}$ — a general pattern for finite $\mathbb{Z}_n$.

**Example 24 ($M_2(\mathbb{R})$).** Let
$$A = \begin{pmatrix} 1 & 0 \\ 0 & 0 \end{pmatrix}, \quad B = \begin{pmatrix} 0 & 0 \\ 0 & 1 \end{pmatrix}.$$
Both are nonzero, yet
$$AB = \begin{pmatrix} 1 \cdot 0 + 0 \cdot 0 & 1 \cdot 0 + 0 \cdot 1 \\ 0 \cdot 0 + 0 \cdot 0 & 0 \cdot 0 + 0 \cdot 1 \end{pmatrix} = \begin{pmatrix} 0 & 0 \\ 0 & 0 \end{pmatrix}.$$
So $A, B$ are zero divisors. Indeed every singular (non-invertible) nonzero matrix in $M_n(\mathbb{R})$ is a zero divisor.

**Example 25 ($\mathbb{Z}$ has no zero divisors).** If $a, b \in \mathbb{Z}$ with $ab = 0$, then $|a||b| = 0$. As non-negative integers, one of $|a|, |b|$ must be $0$, i.e., $a = 0$ or $b = 0$. So there are no *nonzero* $a, b$ with $ab = 0$. $\mathbb{Z}$ is an **integral domain** ([[21-integral-domains]]).

---

> **Proposition 19.10 (Units are never zero divisors).** *(Already proved in §19.4.)*

> **Corollary 19.11.** In a field, there are no zero divisors.

**Proof.** Let $F$ be a field. If $a \in F$ is nonzero, then $a$ is a unit (fields have $F^\times = F \setminus \{0\}$). By Proposition 19.10, $a$ is not a zero divisor. So no nonzero element is a zero divisor. $\blacksquare$

**Bridge to the next chapter.** The contrapositive of Corollary 19.11 justifies the part ($\Rightarrow$) of Theorem 19.7 we used implicitly: if $\mathbb{Z}_n$ is a field, no zero divisors, so a composite $n$ leading to zero divisors $a, b$ is a contradiction. This also motivates the definition of **integral domain** in [[21-integral-domains]] — a commutative ring with unity and no zero divisors, intermediate between "ring" and "field."

---

## 19.7 Ring Operations Tables

### Addition and multiplication in $\mathbb{Z}_4$

**Addition $+$:**

| + | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| **0** | 0 | 1 | 2 | 3 |
| **1** | 1 | 2 | 3 | 0 |
| **2** | 2 | 3 | 0 | 1 |
| **3** | 3 | 0 | 1 | 2 |

**Multiplication $\cdot$:**

| × | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| **0** | 0 | 0 | 0 | 0 |
| **1** | 0 | 1 | 2 | 3 |
| **2** | 0 | 2 | 0 | 2 |
| **3** | 0 | 3 | 2 | 1 |

**Reading the tables.**
- **Zero divisor.** $2 \cdot 2 = 4 \equiv 0$, so $2$ is a zero divisor — it multiplies with itself to zero.
- **Units.** Look for $1$ in the multiplication table (off the $0$ row and column). $1 \cdot 1 = 1$, $3 \cdot 3 = 9 \equiv 1$. So $\mathbb{Z}_4^\times = \{1, 3\}$.
- **Not a field.** $2$ is nonzero but not a unit (no $1$ appears in the row "$2$"). Equivalently, $\gcd(2, 4) = 2 \neq 1$, so by Example 19, $2$ is not a unit.

$\mathbb{Z}_4$ is a commutative ring with unity but not a field — consistent with Theorem 19.7 since $4$ is not prime.

---

## 19.8 Characteristic

> **Definition 19.12 (Characteristic).** Let $R$ be a ring with unity. The **characteristic** of $R$, denoted $\operatorname{char}(R)$, is the smallest positive integer $n$ such that
> $$n \cdot 1 := \underbrace{1 + 1 + \cdots + 1}_{n \text{ terms}} = 0.$$
> If no such $n$ exists, $\operatorname{char}(R) = 0$.

**Interpretation.** $\operatorname{char}(R)$ is the **additive order** of $1$ in the group $(R, +)$, with the convention that infinite order is written $0$ (not $\infty$). This convention is chosen because "characteristic $0$" plays well algebraically — e.g., a field of characteristic $0$ contains a copy of $\mathbb{Q}$.

**Extension to all elements.** If $\operatorname{char}(R) = n > 0$, then $n \cdot a = 0$ for *every* $a \in R$:
$$n \cdot a = (n \cdot 1) \cdot a = 0 \cdot a = 0.$$
The characteristic "kills" every element additively when applied $n$ times.

### Examples

**Example ($\operatorname{char}(\mathbb{Z}) = 0$).** In $\mathbb{Z}$, $n \cdot 1 = n \neq 0$ for any $n \geq 1$. So characteristic is $0$.

**Example ($\operatorname{char}(\mathbb{Q}) = \operatorname{char}(\mathbb{R}) = \operatorname{char}(\mathbb{C}) = 0$).** Same argument: $n \cdot 1 = n$ (a nonzero rational/real/complex) for $n \geq 1$.

**Example ($\operatorname{char}(\mathbb{Z}_n) = n$).** In $\mathbb{Z}_n$, $n \cdot 1 = n \equiv 0 \pmod n$, and no smaller positive integer $k$ satisfies $k \cdot 1 \equiv 0$ (since $k < n$ means $k \not\equiv 0$). So characteristic is $n$.

**Example ($\operatorname{char}(\mathbb{F}_p) = p$).** Special case of the previous.

**Example ($\operatorname{char}(\mathbb{Z}_2 \times \mathbb{Z}_3) = 6$).** The unity is $(1, 1)$. Repeated sums:
$$k \cdot (1, 1) = (k \bmod 2, \; k \bmod 3).$$
This is $(0, 0)$ iff $2 \mid k$ and $3 \mid k$, i.e., $6 \mid k$. Smallest $k = 6$.

Note: $\mathbb{Z}_2 \times \mathbb{Z}_3 \cong \mathbb{Z}_6$ as rings (CRT — see §19.9, Example 27), consistent with $\operatorname{char}(\mathbb{Z}_6) = 6$.

> **Theorem 19.13 (Characteristic of an integral domain).** The characteristic of an integral domain is either $0$ or a prime. (Proof in [[21-integral-domains]].)

**Intuition.** If $\operatorname{char}(R) = mn$ with $m, n > 1$, then $(m \cdot 1)(n \cdot 1) = (mn) \cdot 1 = 0$. In an integral domain (no zero divisors), one factor must be $0$: $m \cdot 1 = 0$ or $n \cdot 1 = 0$ — contradicting the minimality of $mn$.

---

## 19.9 Direct Products of Rings

> **Definition 19.14 (Direct product).** For rings $R, S$, the **direct product** $R \times S$ has underlying set $R \times S = \{(r, s) : r \in R, s \in S\}$ with componentwise operations:
> $$(r_1, s_1) + (r_2, s_2) = (r_1 + r_2, \; s_1 + s_2),$$
> $$(r_1, s_1) \cdot (r_2, s_2) = (r_1 r_2, \; s_1 s_2).$$

**Verification that $R \times S$ is a ring.** Each ring axiom holds componentwise. For example, left distributivity:
$$(r_1, s_1) \cdot ((r_2, s_2) + (r_3, s_3)) = (r_1, s_1) \cdot (r_2 + r_3, s_2 + s_3) = (r_1(r_2 + r_3), s_1(s_2 + s_3))$$
$$= (r_1 r_2 + r_1 r_3, s_1 s_2 + s_1 s_3) = (r_1, s_1)(r_2, s_2) + (r_1, s_1)(r_3, s_3). \checkmark$$

**Unity.** If $R, S$ both have unity ($1_R, 1_S$), then $R \times S$ has unity $(1_R, 1_S)$.

**Commutative.** If both $R, S$ are commutative, so is $R \times S$.

### Zero divisors in direct products

**Example 26 ($\mathbb{Z} \times \mathbb{Z}$).** Compute $(1, 0)(0, 1)$:
$$(1, 0)(0, 1) = (1 \cdot 0, 0 \cdot 1) = (0, 0).$$
Both factors are nonzero, yet their product is zero. So $(1, 0)$ and $(0, 1)$ are zero divisors.

**Conclusion.** Even if $R, S$ are integral domains, $R \times S$ typically is not — direct products introduce zero divisors via the "idempotent decomposition" $(1_R, 0)$ and $(0, 1_S)$.

### Chinese Remainder Theorem (ring version)

**Example 27 (CRT).** If $\gcd(m, n) = 1$, then
$$\mathbb{Z}_{mn} \cong \mathbb{Z}_m \times \mathbb{Z}_n \qquad \text{(as rings)}.$$

*Sketch of proof.* Define $\varphi: \mathbb{Z}_{mn} \to \mathbb{Z}_m \times \mathbb{Z}_n$ by $\varphi(a) = (a \bmod m, a \bmod n)$.

- **Well-defined.** If $a \equiv a' \pmod{mn}$, then $a \equiv a' \pmod m$ and $a \equiv a' \pmod n$.
- **Ring homomorphism.** $\varphi(a + b) = ((a+b) \bmod m, (a+b) \bmod n) = \varphi(a) + \varphi(b)$; similarly for multiplication.
- **Injective.** If $\varphi(a) = (0, 0)$, then $m \mid a$ and $n \mid a$. Since $\gcd(m, n) = 1$, $\operatorname{lcm}(m, n) = mn$, so $mn \mid a$, i.e., $a = 0$ in $\mathbb{Z}_{mn}$.
- **Surjective.** $|\mathbb{Z}_{mn}| = mn = |\mathbb{Z}_m \times \mathbb{Z}_n|$, so injective plus finite equals bijective.

Hence $\varphi$ is an isomorphism. $\blacksquare$

**Remark.** This is stronger than the group-theoretic CRT, which only says $\mathbb{Z}_{mn} \cong \mathbb{Z}_m \times \mathbb{Z}_n$ as additive groups. The ring statement also captures multiplicative structure.

**Sanity check ($m = 2, n = 3$).** $\mathbb{Z}_6 \cong \mathbb{Z}_2 \times \mathbb{Z}_3$. Under $\varphi$, the element $5 \in \mathbb{Z}_6$ maps to $(5 \bmod 2, 5 \bmod 3) = (1, 2)$. Check:
$$5 + 5 = 10 \equiv 4 \pmod 6; \quad \varphi(5) + \varphi(5) = (1, 2) + (1, 2) = (0, 1); \quad \varphi(4) = (0, 1). \checkmark$$

---

## 19.10 Practice Problems

**Problem 1.** Show that $2\mathbb{Z}$ is a commutative ring without unity. Describe its zero divisors.

**Problem 2.** List all units of $\mathbb{Z}_{12}$ and their inverses.

**Problem 3.** Show that the set of diagonal $n \times n$ real matrices is a subring of $M_n(\mathbb{R})$. Is it commutative? Determine its units and zero divisors.

**Problem 4.** Prove: in any ring $R$, $(a + b)^2 = a^2 + ab + ba + b^2$. Under what additional hypothesis does $(a + b)^2 = a^2 + 2ab + b^2$?

**Problem 5.** Find all zero divisors of $\mathbb{Z}_{12}$.

**Problem 6.** Show that $\mathbb{Z}[\sqrt{2}] = \{a + b\sqrt{2} : a, b \in \mathbb{Z}\}$ is a subring of $\mathbb{R}$. Is it a field?

**Problem 7.** Show that if $R$ is a finite ring with unity and no zero divisors, then $R$ is a division ring. (Equivalently: every finite integral domain is a field.)

**Problem 8 (Binomial expansion in characteristic $p$).** Let $R$ be a commutative ring with $\operatorname{char}(R) = p$ prime. Show $(a + b)^p = a^p + b^p$ for all $a, b \in R$ (the "Freshman's Dream").

---

### Solutions

---

**Solution 1 ($2\mathbb{Z}$ as a ring).**

**Setup.** $2\mathbb{Z} = \{\ldots, -4, -2, 0, 2, 4, \ldots\}$ under usual integer $+, \cdot$.

**Strategy.** Apply the subring test against $\mathbb{Z}$, then verify absence of unity and examine zero divisors.

**Computation (subring verification).**

*Non-empty.* $0 = 2 \cdot 0 \in 2\mathbb{Z}$. ✓

*Closure under $-$.* For $2m, 2n \in 2\mathbb{Z}$: $(2m) - (2n) = 2(m - n) \in 2\mathbb{Z}$. ✓

*Closure under $\cdot$.* $(2m)(2n) = 4mn = 2(2mn) \in 2\mathbb{Z}$. ✓

By the Subring Test, $2\mathbb{Z}$ is a subring of $\mathbb{Z}$, hence a ring in its own right. Commutativity is inherited from $\mathbb{Z}$.

**No unity.** Suppose $u \in 2\mathbb{Z}$ is a multiplicative identity. Then $u \cdot 2 = 2$, i.e., $u = 1$ (in $\mathbb{Z}$, using cancellation). But $1 \notin 2\mathbb{Z}$. Contradiction. So $2\mathbb{Z}$ has no unity.

**Zero divisors.** Suppose $2m, 2n \in 2\mathbb{Z}$ are nonzero with $(2m)(2n) = 0$. Then $4mn = 0$ in $\mathbb{Z}$, so $mn = 0$, forcing $m = 0$ or $n = 0$ (no zero divisors in $\mathbb{Z}$). But both $2m, 2n \neq 0$ forces $m, n \neq 0$. Contradiction.

So $2\mathbb{Z}$ has no zero divisors.

**Verification.** The classification by ring type:
- Commutative: ✓ (inherited)
- Unity: ✗
- Zero divisors: ✗

$\boxed{2\mathbb{Z} \text{ is a commutative ring without unity and without zero divisors.}}$

**Interpretation.** This example shows "no zero divisors" can hold in a ring without unity. The notion of integral domain typically assumes unity, so $2\mathbb{Z}$ illustrates a related but weaker structure.

---

**Solution 2 (Units of $\mathbb{Z}_{12}$).**

**Setup.** By Example 19, $\mathbb{Z}_{12}^\times = \{a \in \{0, 1, \ldots, 11\} : \gcd(a, 12) = 1\}$.

**Strategy.** Compute $\gcd(a, 12)$ for $a = 1, 2, \ldots, 11$ and keep those with $\gcd = 1$. Then find each unit's inverse by solving $ab \equiv 1 \pmod{12}$.

**Computation.**

$12 = 2^2 \cdot 3$, so $\gcd(a, 12) = 1 \iff a$ is coprime to both $2$ and $3 \iff a$ is neither even nor a multiple of $3$.

| $a$ | $\gcd(a, 12)$ | Unit? |
|---|---|---|
| 1 | 1 | ✓ |
| 2 | 2 | ✗ |
| 3 | 3 | ✗ |
| 4 | 4 | ✗ |
| 5 | 1 | ✓ |
| 6 | 6 | ✗ |
| 7 | 1 | ✓ |
| 8 | 4 | ✗ |
| 9 | 3 | ✗ |
| 10 | 2 | ✗ |
| 11 | 1 | ✓ |

Units: $\mathbb{Z}_{12}^\times = \{1, 5, 7, 11\}$, so $|\mathbb{Z}_{12}^\times| = \varphi(12) = 4$.

**Finding inverses.**

- $1 \cdot 1 = 1$. So $1^{-1} = 1$.
- $5 \cdot 5 = 25 = 24 + 1 \equiv 1 \pmod{12}$. So $5^{-1} = 5$.
- $7 \cdot 7 = 49 = 48 + 1 \equiv 1 \pmod{12}$. So $7^{-1} = 7$.
- $11 \cdot 11 = 121 = 120 + 1 \equiv 1 \pmod{12}$. So $11^{-1} = 11$.

**Verification.** Every unit is its own inverse — so $\mathbb{Z}_{12}^\times$ is an elementary abelian $2$-group, isomorphic to $\mathbb{Z}_2 \times \mathbb{Z}_2 = V_4$ (Klein four-group).

Indeed, all non-identity elements have order $2$, and by the classification of groups of order $4$ (Example 16 in [[03-groups-definition-and-examples]]), this forces $V_4$.

$\boxed{\mathbb{Z}_{12}^\times = \{1, 5, 7, 11\} \cong V_4, \text{ each element self-inverse}.}$

---

**Solution 3 (Diagonal matrices).**

**Setup.** Let $D_n = \{A \in M_n(\mathbb{R}) : A_{ij} = 0 \text{ if } i \neq j\}$. So $A = \operatorname{diag}(a_1, \ldots, a_n)$ with entries $a_i \in \mathbb{R}$.

**Strategy.** Apply the subring test against $M_n(\mathbb{R})$; check commutativity and identify units/zero divisors.

**Subring verification.**

*Non-empty.* $0_{n \times n} = \operatorname{diag}(0, \ldots, 0) \in D_n$. ✓

*Closure under $-$.* $\operatorname{diag}(a_1, \ldots, a_n) - \operatorname{diag}(b_1, \ldots, b_n) = \operatorname{diag}(a_1 - b_1, \ldots, a_n - b_n) \in D_n$. ✓

*Closure under $\cdot$.* For $A = \operatorname{diag}(a_i)$, $B = \operatorname{diag}(b_i)$:
$$(AB)_{ij} = \sum_k A_{ik} B_{kj}.$$
Since $A_{ik} = 0$ unless $i = k$, the sum collapses to the $k = i$ term: $(AB)_{ij} = A_{ii}B_{ij} = a_i B_{ij}$. Since $B_{ij} = 0$ unless $i = j$, $(AB)_{ij} = 0$ unless $i = j$. For $i = j$: $(AB)_{ii} = a_i b_i$.

So $AB = \operatorname{diag}(a_1 b_1, \ldots, a_n b_n) \in D_n$. ✓

By the Subring Test, $D_n$ is a subring of $M_n(\mathbb{R})$.

**Commutative?** From the product formula,
$$AB = \operatorname{diag}(a_1 b_1, \ldots, a_n b_n) = \operatorname{diag}(b_1 a_1, \ldots, b_n a_n) = BA. \checkmark$$
So $D_n$ is commutative (even though the ambient $M_n(\mathbb{R})$ is not, for $n \geq 2$).

**Units.** $\operatorname{diag}(a_1, \ldots, a_n)$ is invertible (in $D_n$) iff each $a_i$ is invertible in $\mathbb{R}$, iff each $a_i \neq 0$. Then
$$\operatorname{diag}(a_1, \ldots, a_n)^{-1} = \operatorname{diag}(1/a_1, \ldots, 1/a_n).$$
So $D_n^\times = \{\operatorname{diag}(a_1, \ldots, a_n) : a_i \neq 0 \; \forall i\} \cong (\mathbb{R}^\times)^n$.

**Zero divisors.** For $n \geq 2$: $\operatorname{diag}(1, 0, \ldots, 0) \cdot \operatorname{diag}(0, 1, \ldots, 0) = \operatorname{diag}(0, \ldots, 0) = 0$. Both factors nonzero. So $D_n$ has zero divisors for $n \geq 2$.

(For $n = 1$, $D_1 \cong \mathbb{R}$ — a field with no zero divisors.)

**Interpretation.** $D_n \cong \mathbb{R}^n$ as rings (via $A \mapsto (a_1, \ldots, a_n)$) — the $n$-fold direct product of $\mathbb{R}$.

$\boxed{D_n \text{ is a commutative subring of } M_n(\mathbb{R}); D_n \cong \mathbb{R}^n; \text{ has zero divisors for } n \geq 2.}$

---

**Solution 4 ($(a+b)^2$ expansion).**

**Setup.** $R$ is a ring; $a, b \in R$.

**Strategy.** Apply distributivity carefully, respecting non-commutativity.

**Computation.**

$$(a + b)^2 = (a + b)(a + b).$$

Apply left distributivity to the right factor:
$$= (a + b) \cdot a + (a + b) \cdot b.$$

Apply right distributivity to each piece:
$$= (a \cdot a + b \cdot a) + (a \cdot b + b \cdot b).$$

Simplify and regroup (additive associativity):
$$= a^2 + ba + ab + b^2.$$

By convention this is usually written $a^2 + ab + ba + b^2$ (collecting the mixed terms):
$$\boxed{(a + b)^2 = a^2 + ab + ba + b^2.}$$

**When does $(a+b)^2 = a^2 + 2ab + b^2$?**

This requires $ab + ba = 2ab$, i.e., $ba = ab$. So the "binomial formula" $(a+b)^2 = a^2 + 2ab + b^2$ holds **iff $a$ and $b$ commute**.

In a commutative ring, the formula always holds. In a non-commutative ring (like $M_n(\mathbb{R})$), it holds only for commuting pairs.

**Verification with a concrete non-commuting example.** In $M_2(\mathbb{R})$, take
$$a = \begin{pmatrix} 0 & 1 \\ 0 & 0 \end{pmatrix}, \quad b = \begin{pmatrix} 0 & 0 \\ 1 & 0 \end{pmatrix}.$$

Compute $a + b = \begin{pmatrix} 0 & 1 \\ 1 & 0 \end{pmatrix}$, so $(a+b)^2 = \begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix} = I$.

Now $a^2 = \begin{pmatrix} 0 & 0 \\ 0 & 0 \end{pmatrix}$, $b^2 = \begin{pmatrix} 0 & 0 \\ 0 & 0 \end{pmatrix}$, $ab = \begin{pmatrix} 1 & 0 \\ 0 & 0 \end{pmatrix}$, $ba = \begin{pmatrix} 0 & 0 \\ 0 & 1 \end{pmatrix}$.

$a^2 + ab + ba + b^2 = 0 + \begin{pmatrix} 1 & 0 \\ 0 & 0 \end{pmatrix} + \begin{pmatrix} 0 & 0 \\ 0 & 1 \end{pmatrix} + 0 = I$. ✓ (Matches $(a+b)^2$.)

But $a^2 + 2ab + b^2 = 0 + 2 \begin{pmatrix} 1 & 0 \\ 0 & 0 \end{pmatrix} + 0 = \begin{pmatrix} 2 & 0 \\ 0 & 0 \end{pmatrix} \neq I$.

So the "binomial" form fails because $a, b$ don't commute.

$\blacksquare$

---

**Solution 5 (Zero divisors of $\mathbb{Z}_{12}$).**

**Setup.** $\mathbb{Z}_{12} = \{0, 1, 2, \ldots, 11\}$. We want all nonzero $a \in \mathbb{Z}_{12}$ such that $a \cdot b = 0$ for some nonzero $b$.

**Strategy.** From Proposition 19.10 (contrapositive), every zero divisor is a non-unit. So the candidate set of zero divisors is $\{a \in \mathbb{Z}_{12} \setminus \{0\} : a \notin \mathbb{Z}_{12}^\times\}$.

From Solution 2, $\mathbb{Z}_{12}^\times = \{1, 5, 7, 11\}$. So candidates for zero divisors are
$$\mathbb{Z}_{12} \setminus (\{0\} \cup \mathbb{Z}_{12}^\times) = \{2, 3, 4, 6, 8, 9, 10\}.$$

**Verification that each is indeed a zero divisor.**

For each candidate $a$, we find a nonzero $b$ with $ab \equiv 0 \pmod{12}$.

| $a$ | $b$ | $ab \bmod 12$ |
|---|---|---|
| 2 | 6 | $12 \equiv 0$ |
| 3 | 4 | $12 \equiv 0$ |
| 4 | 3 | $12 \equiv 0$ |
| 4 | 6 | $24 \equiv 0$ |
| 6 | 2 | $12 \equiv 0$ |
| 6 | 4 | $24 \equiv 0$ |
| 6 | 6 | $36 \equiv 0$ |
| 6 | 8 | $48 \equiv 0$ |
| 6 | 10 | $60 \equiv 0$ |
| 8 | 3 | $24 \equiv 0$ |
| 8 | 6 | $48 \equiv 0$ |
| 8 | 9 | $72 \equiv 0$ |
| 9 | 4 | $36 \equiv 0$ |
| 9 | 8 | $72 \equiv 0$ |
| 10 | 6 | $60 \equiv 0$ |

Each candidate works. So all seven elements are zero divisors.

**General principle.** In $\mathbb{Z}_n$ for $n$ composite:
$$\mathbb{Z}_n = \{0\} \sqcup \{\text{zero divisors}\} \sqcup \mathbb{Z}_n^\times.$$

So zero divisors = non-units = $\{a : 1 \leq a \leq n-1, \gcd(a, n) > 1\}$.

For $n = 12$: $\gcd(a, 12) > 1 \iff a$ is divisible by $2$ or $3$. These are exactly $\{2, 3, 4, 6, 8, 9, 10\}$.

$\boxed{\text{Zero divisors of } \mathbb{Z}_{12}: \{2, 3, 4, 6, 8, 9, 10\}.}$

**Sanity check on cardinalities.** $|\mathbb{Z}_{12}| = 12 = 1 + 7 + 4 = |\{0\}| + |\text{zero divisors}| + |\text{units}|$. ✓

---

**Solution 6 ($\mathbb{Z}[\sqrt{2}]$).**

**Setup.** $\mathbb{Z}[\sqrt 2] = \{a + b\sqrt 2 : a, b \in \mathbb{Z}\} \subset \mathbb{R}$.

**Strategy.** Subring test against $\mathbb{R}$.

**Subring verification.**

*Non-empty.* $0 = 0 + 0\sqrt 2 \in \mathbb{Z}[\sqrt 2]$. ✓

*Closure under $-$.*
$$(a + b\sqrt 2) - (c + d\sqrt 2) = (a - c) + (b - d)\sqrt 2 \in \mathbb{Z}[\sqrt 2]. \checkmark$$

*Closure under $\cdot$.*
$$(a + b\sqrt 2)(c + d\sqrt 2) = ac + ad\sqrt 2 + bc\sqrt 2 + bd \cdot 2 = (ac + 2bd) + (ad + bc)\sqrt 2 \in \mathbb{Z}[\sqrt 2]. \checkmark$$

Each of $ac + 2bd$ and $ad + bc$ is an integer since $a, b, c, d \in \mathbb{Z}$.

By Subring Test, $\mathbb{Z}[\sqrt 2]$ is a subring of $\mathbb{R}$. It inherits commutativity. Contains unity $1 = 1 + 0\sqrt 2$.

**Is it a field?**

For $\mathbb{Z}[\sqrt 2]$ to be a field, every nonzero element would need an inverse in $\mathbb{Z}[\sqrt 2]$. But $2 = 2 + 0\sqrt 2$ has inverse $1/2 \notin \mathbb{Z}[\sqrt 2]$ (since $1/2 = a + b\sqrt 2$ would force $b = 0$ and $a = 1/2 \notin \mathbb{Z}$).

**So $\mathbb{Z}[\sqrt 2]$ is not a field.** It is, however, an integral domain — a subring of $\mathbb{R}$, which has no zero divisors. Enlarging to $\mathbb{Q}(\sqrt 2) = \{a + b\sqrt 2 : a, b \in \mathbb{Q}\}$ yields a field (the rational "field extension" of $\mathbb{Q}$).

**Units of $\mathbb{Z}[\sqrt 2]$ (bonus).** Define the **norm** $N(a + b\sqrt 2) = (a + b\sqrt 2)(a - b\sqrt 2) = a^2 - 2b^2 \in \mathbb{Z}$. It is multiplicative. $u \in \mathbb{Z}[\sqrt 2]^\times \iff N(u) = \pm 1$.

E.g., $1 + \sqrt 2$: $N(1 + \sqrt 2) = 1 - 2 = -1$, so it's a unit with inverse $-(1 - \sqrt 2) = -1 + \sqrt 2$.

Hence $\mathbb{Z}[\sqrt 2]^\times$ is infinite (powers of $1 + \sqrt 2$ are all distinct units) — unlike $\mathbb{Z}[i]^\times = \{\pm 1, \pm i\}$.

$\boxed{\mathbb{Z}[\sqrt 2] \text{ is a commutative subring with unity, integral domain, not a field.}}$

$\blacksquare$

---

**Solution 7 (Finite integral domain is a field).**

**Setup.** Let $R$ be a finite ring with unity $1$ and no zero divisors. Goal: show every nonzero $a \in R$ has a multiplicative inverse.

**Strategy.** Use the pigeonhole principle via left-multiplication maps.

**Proof.**

*Step 1: Define $L_a$.* For $a \in R$, $a \neq 0$, define
$$L_a : R \to R, \qquad L_a(x) = ax.$$

*Step 2: $L_a$ is injective.* Suppose $L_a(x) = L_a(y)$, i.e., $ax = ay$. Then
$$ax - ay = 0 \implies a(x - y) = 0$$
(using the distributivity derivation in Proposition 19.3(4)). Since $a \neq 0$ and $R$ has no zero divisors, $x - y = 0$, i.e., $x = y$. So $L_a$ is injective.

*Step 3: $L_a$ is surjective.* Since $R$ is finite and $L_a : R \to R$ is injective, $L_a$ is also surjective (pigeonhole: injective map on a finite set of cardinality $|R|$ to itself hits every element).

*Step 4: Right inverse.* By surjectivity of $L_a$, there exists $b \in R$ with $L_a(b) = 1$, i.e., $ab = 1$.

*Step 5: Left inverse (symmetric argument).* Define $R_a(x) = xa$; same argument shows $R_a$ is bijective. So there exists $c \in R$ with $ca = 1$.

*Step 6: $b = c$ (two-sided inverse).*
$$c = c \cdot 1 = c(ab) = (ca)b = 1 \cdot b = b.$$

*Step 7: Conclude.* Set $a^{-1} := b = c$. Then $aa^{-1} = a^{-1}a = 1$. So $a$ is a unit. Since $a \neq 0$ was arbitrary, $R^\times = R \setminus \{0\}$, so $R$ is a division ring.

If $R$ is additionally commutative, $R$ is a field.

$\blacksquare$

**Interpretation.** This is **Wedderburn's theorem for the finite commutative case**: every finite integral domain is a field. (The full Wedderburn theorem says every finite division ring is a field — commutativity is automatic for finite division rings, a much deeper result.)

**Why finiteness matters.** $\mathbb{Z}$ is an integral domain, infinite, not a field. $L_2: \mathbb{Z} \to \mathbb{Z}$, $L_2(x) = 2x$ is injective but not surjective (image is $2\mathbb{Z}$), so the pigeonhole step fails. Finiteness is essential.

---

**Solution 8 (Freshman's Dream in characteristic $p$).**

**Setup.** $R$ commutative, $\operatorname{char}(R) = p$ prime. Goal: $(a + b)^p = a^p + b^p$.

**Strategy.** Expand via the binomial theorem (valid in commutative rings, by induction), then use divisibility of binomial coefficients by $p$.

**Step 1: Binomial theorem in a commutative ring.**

By induction on $n$:
$$(a + b)^n = \sum_{k=0}^n \binom{n}{k} a^k b^{n-k}.$$

Here $\binom{n}{k}$ is the integer binomial coefficient, acting on a ring element by $m \cdot r = r + r + \cdots + r$ ($m$ times). The induction step uses commutativity ($ab = ba$) to rearrange.

**Step 2: Binomial coefficient divisibility.**

**Lemma.** For $p$ prime and $1 \leq k \leq p - 1$: $p \mid \binom{p}{k}$.

*Proof of lemma.* $\binom{p}{k} = \frac{p!}{k!(p-k)!}$. The numerator has a factor of $p$; the denominator $k!(p-k)!$ has no factor of $p$ (since $1 \leq k \leq p - 1$ means both $k < p$ and $p - k < p$, so no factorial contains $p$). Hence $p$ divides the numerator but not the denominator, and $\binom{p}{k}$ is an integer, so $p \mid \binom{p}{k}$. ✓

**Step 3: Apply characteristic.**

Since $\operatorname{char}(R) = p$, we have $p \cdot r = 0$ for every $r \in R$.

So for $1 \leq k \leq p - 1$, write $\binom{p}{k} = p \cdot m_k$ for some integer $m_k$. Then in $R$,
$$\binom{p}{k} \cdot (a^k b^{p-k}) = (p m_k) \cdot (a^k b^{p-k}) = m_k \cdot (p \cdot a^k b^{p-k}) = m_k \cdot 0 = 0.$$

**Step 4: Compute $(a + b)^p$.**

$$(a + b)^p = \sum_{k=0}^p \binom{p}{k} a^k b^{p-k} = \binom{p}{0}a^0 b^p + \sum_{k=1}^{p-1} \binom{p}{k} a^k b^{p-k} + \binom{p}{p} a^p b^0.$$

The middle sum vanishes by Step 3. The boundary terms: $\binom{p}{0} = \binom{p}{p} = 1$, so
$$(a + b)^p = 1 \cdot b^p + 0 + 1 \cdot a^p = a^p + b^p. \checkmark$$

$\blacksquare$

**Iteration.** By induction, $(a + b)^{p^n} = a^{p^n} + b^{p^n}$ for all $n \geq 0$.

**The Frobenius endomorphism.** The map $\Phi : R \to R$, $\Phi(a) = a^p$, satisfies
$$\Phi(a + b) = (a + b)^p = a^p + b^p = \Phi(a) + \Phi(b), \qquad \Phi(ab) = (ab)^p = a^p b^p = \Phi(a)\Phi(b).$$
So $\Phi$ is a ring homomorphism — the **Frobenius endomorphism**. Over finite fields $\mathbb{F}_{p^n}$, it generates $\operatorname{Gal}(\mathbb{F}_{p^n}/\mathbb{F}_p)$, a central object in Galois theory.

---

## Related Concepts

- [[01-operations-and-algebraic-structures]] — semigroup/monoid/group/ring hierarchy
- [[03-groups-definition-and-examples]] — ring's additive part is an abelian group
- [[18-isomorphism-theorems]] — analog theorems for rings (first/second/third iso)
- [[21-integral-domains]] — zero-divisor-free rings; proves characteristic of integral domain is $0$ or prime
- [[22-ideals-and-quotient-rings]] — the ring analogue of normal subgroups; quotient ring construction
- [[23-ring-homomorphisms]] — structure-preserving maps, kernels, images
- [[24-polynomial-rings]] — $R[x]$ constructions, Euclidean/PID/UFD hierarchies

---

*Last updated: 2026-04-19*
