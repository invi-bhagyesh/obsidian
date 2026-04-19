---
title: "CO4 Practice Problems: Integral Domains, Ideals, Quotient Rings, Homomorphisms, Polynomials"
type: guide
co: CO4
related: [21-integral-domains, 22-ideals-and-quotient-rings, 23-ring-homomorphisms, 24-polynomial-rings]
---

# 25. CO4 Practice Problems

Consolidated practice across chapters 21–24, organized in four parts.

---

## Part A — Integral Domains

**Problem A1.** Determine whether $\mathbb{Z}_6 \times \mathbb{Z}_4$ is an integral domain.

**Problem A2.** Find all zero divisors of $\mathbb{Z}_{20}$.

**Problem A3.** Compute $\operatorname{char}(\mathbb{F}_2[x])$.

**Problem A4.** Show that $\mathbb{Z}[\sqrt{-3}] = \{a + b\sqrt{-3} : a, b \in \mathbb{Z}\}$ is an integral domain.

**Problem A5.** Find $\operatorname{Frac}(\mathbb{Z}[i])$ and prove it's a field.

**Problem A6.** Give an example of an integral domain that is not a field and not $\mathbb{Z}$.

**Problem A7.** Show that every prime ideal in a finite commutative ring with unity is maximal.

### Solutions — Part A

**Solution A1.**
An **integral domain** is a commutative ring with unity having no non-zero zero divisors.

*Test $\mathbb{Z}_6 \times \mathbb{Z}_4$.* Exhibit a pair of non-zero elements whose product is zero:
$$(2, 0) \cdot (0, 2) = (0, 0).$$
Both $(2, 0) \neq (0, 0)$ and $(0, 2) \neq (0, 0)$, so they are non-trivial zero divisors.

**$\mathbb{Z}_6 \times \mathbb{Z}_4$ is not an integral domain.** $\boxed{}$ $\blacksquare$

*General fact.* A product $R \times S$ of non-trivial rings is **never** an integral domain, since $(r, 0) \cdot (0, s) = (0, 0)$ for any $r \in R, s \in S$ (both non-zero).

---

**Solution A2.**
**Zero divisors in $\mathbb{Z}_n$.** An element $a \in \mathbb{Z}_n$ is a zero divisor iff $a \neq 0$ and $\gcd(a, n) > 1$ (equivalently, $a$ is a non-zero non-unit).

*Proof of the criterion.*
- If $\gcd(a, n) = d > 1$, then $a \cdot (n/d) = (a/d) \cdot n \equiv 0 \pmod n$, and $n/d \not\equiv 0$ since $d > 1$. So $a$ is a zero divisor.
- If $\gcd(a, n) = 1$, then $a$ is a unit (by Bézout, $\exists b : ab \equiv 1$), and units are never zero divisors (if $ab = 0$ with $a$ a unit, $b = a^{-1} \cdot 0 = 0$).

*Apply to $n = 20 = 2^2 \cdot 5$.*

The units of $\mathbb{Z}_{20}$ are $\{k : \gcd(k, 20) = 1\} = \{1, 3, 7, 9, 11, 13, 17, 19\}$ — $8$ units (Euler: $\varphi(20) = 8$).

The zero divisors are the non-zero non-units:
$$\mathbb{Z}_{20} \setminus (\{0\} \cup U(20)) = \{2, 4, 5, 6, 8, 10, 12, 14, 15, 16, 18\}.$$

Count: $20 - 1 - 8 = 11$.

$\boxed{\text{11 zero divisors, namely } \{2, 4, 5, 6, 8, 10, 12, 14, 15, 16, 18\}.}$ $\blacksquare$

---

**Solution A3.**
The **characteristic** of a ring $R$ is the smallest positive integer $n$ such that $n \cdot 1_R = 0$, or $0$ if no such $n$ exists.

For $\mathbb{F}_2[x]$:

$\mathbb{F}_2[x]$ is a ring with unity $1_{\mathbb{F}_2[x]} = 1$ (constant polynomial). In $\mathbb{F}_2 = \mathbb{Z}/2\mathbb{Z}$, $2 \cdot 1 = 0$, and $1 \neq 0$. So in $\mathbb{F}_2[x]$,
$$2 \cdot 1 = 0, \qquad 1 \cdot 1 = 1 \neq 0.$$

Hence the smallest positive $n$ with $n \cdot 1 = 0$ is $n = 2$.

$\boxed{\operatorname{char}(\mathbb{F}_2[x]) = 2.}$ $\blacksquare$

*General fact.* If $R$ is a ring with unity, then $\operatorname{char}(R[x]) = \operatorname{char}(R)$. This is because multiplication by integers is defined coefficient-wise, and $n \cdot 1_{R[x]} = 0$ iff $n \cdot 1_R = 0$.

---

**Solution A4.**
$\mathbb{Z}[\sqrt{-3}] = \{a + b\sqrt{-3} : a, b \in \mathbb{Z}\} \subseteq \mathbb{C}$.

**Step 1: $\mathbb{Z}[\sqrt{-3}]$ is a subring of $\mathbb{C}$.**

Non-empty: $0 = 0 + 0\sqrt{-3} \in \mathbb{Z}[\sqrt{-3}]$.

Closed under subtraction:
$$(a + b\sqrt{-3}) - (c + d\sqrt{-3}) = (a - c) + (b - d)\sqrt{-3} \in \mathbb{Z}[\sqrt{-3}].$$

Closed under multiplication:
$$(a + b\sqrt{-3})(c + d\sqrt{-3}) = ac + ad\sqrt{-3} + bc\sqrt{-3} + bd(\sqrt{-3})^2$$
$$= ac - 3bd + (ad + bc)\sqrt{-3} \in \mathbb{Z}[\sqrt{-3}].$$

Contains $1 = 1 + 0\sqrt{-3}$. Hence $\mathbb{Z}[\sqrt{-3}]$ is a subring of $\mathbb{C}$ with unity.

**Step 2: $\mathbb{Z}[\sqrt{-3}]$ is commutative.**

Inherited from $\mathbb{C}$.

**Step 3: $\mathbb{Z}[\sqrt{-3}]$ has no zero divisors.**

$\mathbb{C}$ is a field, hence has no zero divisors. Any subring $\mathbb{Z}[\sqrt{-3}] \subseteq \mathbb{C}$ inherits this property: if $\alpha \beta = 0$ in $\mathbb{Z}[\sqrt{-3}]$ with $\alpha, \beta \in \mathbb{Z}[\sqrt{-3}] \subseteq \mathbb{C}$, then $\alpha = 0$ or $\beta = 0$ in $\mathbb{C}$, hence in $\mathbb{Z}[\sqrt{-3}]$.

$\boxed{\mathbb{Z}[\sqrt{-3}] \text{ is an integral domain.}}$ $\blacksquare$

*Remark.* $\mathbb{Z}[\sqrt{-3}]$ is *not* a UFD: $4 = 2 \cdot 2 = (1 + \sqrt{-3})(1 - \sqrt{-3})$ with $2$ and $1 \pm \sqrt{-3}$ both irreducible. The ring of integers of $\mathbb{Q}(\sqrt{-3})$ is actually the larger ring $\mathbb{Z}[\omega]$ with $\omega = (-1 + \sqrt{-3})/2$, which *is* a UFD.

---

**Solution A5.**
**Field of fractions.** For an integral domain $D$, $\operatorname{Frac}(D)$ is the smallest field containing $D$, constructed as equivalence classes of pairs $(a, b)$ with $b \neq 0$, modulo $(a, b) \sim (a', b') \iff ab' = a'b$.

*$\mathbb{Z}[i] \subseteq \mathbb{C}$ is an integral domain (Solution E4 of CO3).*

**Claim.** $\operatorname{Frac}(\mathbb{Z}[i]) = \mathbb{Q}(i) := \{a + bi : a, b \in \mathbb{Q}\}$.

*Proof.* 

*Step 1: $\mathbb{Q}(i)$ is a field.* It is a subring of $\mathbb{C}$ (check: closed under $+, -, \cdot$ and contains $1$). Every non-zero $a + bi \in \mathbb{Q}(i)$ (with $a, b \in \mathbb{Q}$, not both zero) has inverse
$$\frac{1}{a + bi} = \frac{a - bi}{(a + bi)(a - bi)} = \frac{a - bi}{a^2 + b^2} = \frac{a}{a^2 + b^2} - \frac{b}{a^2 + b^2} i \in \mathbb{Q}(i).$$
(Since $a^2 + b^2 \neq 0$ when $(a, b) \neq (0, 0)$.) So $\mathbb{Q}(i)$ is a field.

*Step 2: $\mathbb{Z}[i] \subseteq \mathbb{Q}(i)$.* Trivial: $a + bi \in \mathbb{Z}[i]$ has $a, b \in \mathbb{Z} \subseteq \mathbb{Q}$, so lies in $\mathbb{Q}(i)$.

*Step 3: $\mathbb{Q}(i) \subseteq \operatorname{Frac}(\mathbb{Z}[i])$.* Any element of $\mathbb{Q}(i)$ has form $p/q + (r/s) i$ with $p, q, r, s \in \mathbb{Z}, q, s \neq 0$. Multiply numerator and denominator:
$$\frac{p}{q} + \frac{r}{s} i = \frac{ps + qr i}{qs} = \frac{(ps) + (qr) i}{qs}.$$
Both numerator $ps + qri \in \mathbb{Z}[i]$ and denominator $qs \in \mathbb{Z} \subseteq \mathbb{Z}[i]$ (non-zero). So the element is in $\operatorname{Frac}(\mathbb{Z}[i])$.

*Step 4: $\operatorname{Frac}(\mathbb{Z}[i]) \subseteq \mathbb{Q}(i)$.* Any element $\alpha/\beta$ with $\alpha, \beta \in \mathbb{Z}[i], \beta \neq 0$. Rationalize: $\alpha/\beta = \alpha \bar\beta/(\beta \bar\beta) = \alpha \bar\beta/|\beta|^2$. Here $|\beta|^2 \in \mathbb{Z}_{>0}$ and $\alpha \bar\beta \in \mathbb{Z}[i]$, so $\alpha/\beta \in \mathbb{Q}(i)$.

$$\boxed{\operatorname{Frac}(\mathbb{Z}[i]) = \mathbb{Q}(i) = \mathbb{Q} \oplus \mathbb{Q} i, \text{ the Gaussian rationals.}} \qquad \blacksquare$$

---

**Solution A6.**
**Examples of integral domains that are neither fields nor $\mathbb{Z}$:**

*Example 1: Polynomial ring $F[x]$ over a field $F$.*

Say $F = \mathbb{Q}$. Then $\mathbb{Q}[x]$ is an integral domain (polynomial ring over an ID is an ID, [[24-polynomial-rings]]). It is not a field: $x \in \mathbb{Q}[x]$ has no multiplicative inverse (no polynomial $p(x)$ satisfies $x \cdot p(x) = 1$, since $\deg(x \cdot p) = 1 + \deg(p) \neq 0 = \deg(1)$). And $\mathbb{Q}[x] \neq \mathbb{Z}$.

*Example 2: $\mathbb{Z}[i]$, the Gaussian integers.*

Integral domain (Solution E4 of CO3). Not a field: $1 + i$ has no Gaussian-integer inverse (its inverse in $\mathbb{Q}(i)$ is $(1 - i)/2 \notin \mathbb{Z}[i]$). And $\mathbb{Z}[i] \supsetneq \mathbb{Z}$.

*Example 3: $\mathbb{Z}[\sqrt 2]$.*

Integral domain (subring of $\mathbb{R}$). Not a field: $\sqrt 2$ has inverse $\sqrt 2/2 \in \mathbb{Q}(\sqrt 2) \setminus \mathbb{Z}[\sqrt 2]$.

**Any of these suffices.** $\boxed{\mathbb{Z}[\sqrt 2] \text{ or } F[x]}$ $\blacksquare$

---

**Solution A7.**
Let $R$ be a finite commutative ring with unity, and let $P$ be a prime ideal of $R$. We show $P$ is maximal.

**Definitions.**
- $P$ **prime** $\iff R/P$ is an integral domain.
- $P$ **maximal** $\iff R/P$ is a field.

*Proved:* $P$ maximal $\implies P$ prime (every field is an ID).

We need the converse in the finite case.

**Lemma** ([[21-integral-domains]] Theorem 21.4). **A finite integral domain is a field.**

*Proof.* Let $D$ be a finite integral domain, $a \in D$, $a \neq 0$. The multiplication-by-$a$ map $m_a: D \to D$, $x \mapsto ax$, is injective: $ax = ay$ implies $a(x - y) = 0$, and since $a \neq 0$ in an ID, $x = y$. An injective map from a finite set to itself is surjective. So some $b \in D$ satisfies $ab = 1$, i.e., $a$ has an inverse. Every non-zero element of $D$ is invertible, so $D$ is a field.

**Apply.** $R/P$ is a commutative ring with unity (since $R$ is). Since $R$ is finite, $R/P$ is finite (fewer elements than $R$). Since $P$ is prime, $R/P$ is an integral domain.

A finite integral domain is a field (Lemma), so $R/P$ is a field, i.e., $P$ is maximal.

$\boxed{\text{Prime + Finite } \implies \text{ Maximal.}}$ $\blacksquare$

---

## Part B — Ideals and Quotient Rings

**Problem B1.** List all ideals of $\mathbb{Z}_{36}$.

**Problem B2.** Show that the set of polynomials in $\mathbb{R}[x]$ with $p(0) = p(1) = 0$ is an ideal.

**Problem B3.** Is $\langle x^2 + 1 \rangle$ a maximal ideal of $\mathbb{R}[x]$?

**Problem B4.** Compute $\mathbb{Z}[x]/\langle 3, x^2 + 1 \rangle$.

**Problem B5.** Determine whether $\langle x^2 - 1 \rangle$ is prime in $\mathbb{R}[x]$.

**Problem B6.** Let $R$ be a commutative ring and $I, J$ ideals. Show $I \cap J$ and $I + J$ are ideals.

**Problem B7.** Show that $\mathbb{R}[x]/\langle x^2 - 2x + 1 \rangle$ is not an integral domain.

### Solutions — Part B

**Solution B1.**
**Fact.** Ideals of $\mathbb{Z}_n$ correspond bijectively to divisors of $n$.

*Proof sketch.* $\mathbb{Z}_n = \mathbb{Z}/n\mathbb{Z}$. By the **correspondence theorem** (ring version), ideals of $\mathbb{Z}/n\mathbb{Z}$ correspond to ideals of $\mathbb{Z}$ containing $n\mathbb{Z}$, i.e., to $d\mathbb{Z}$ with $n\mathbb{Z} \subseteq d\mathbb{Z}$, i.e., $d \mid n$.

Correspondence: divisor $d$ $\leftrightarrow$ ideal $(d)\mathbb{Z}_n = d\mathbb{Z}/n\mathbb{Z} = \{0, d, 2d, \ldots, (n/d - 1)d\}$ of order $n/d$.

*Apply to $n = 36 = 2^2 \cdot 3^2$.*

Positive divisors of $36$: $\{1, 2, 3, 4, 6, 9, 12, 18, 36\}$ — 9 divisors.

Correspondingly, **9 ideals** of $\mathbb{Z}_{36}$:

| Divisor $d$ | Ideal | Size |
|---|---|---|
| $1$ | $(1) = \mathbb{Z}_{36}$ | $36$ |
| $2$ | $(2) = \{0, 2, 4, \ldots, 34\}$ | $18$ |
| $3$ | $(3) = \{0, 3, 6, \ldots, 33\}$ | $12$ |
| $4$ | $(4) = \{0, 4, 8, \ldots, 32\}$ | $9$ |
| $6$ | $(6) = \{0, 6, 12, 18, 24, 30\}$ | $6$ |
| $9$ | $(9) = \{0, 9, 18, 27\}$ | $4$ |
| $12$ | $(12) = \{0, 12, 24\}$ | $3$ |
| $18$ | $(18) = \{0, 18\}$ | $2$ |
| $36$ | $(36) = \{0\}$ | $1$ |

$\boxed{9 \text{ ideals.}}$ $\blacksquare$

---

**Solution B2.**
Let $I = \{p(x) \in \mathbb{R}[x] : p(0) = 0 \text{ and } p(1) = 0\}$.

**Claim.** $I$ is an ideal of $\mathbb{R}[x]$.

We verify the ideal axioms.

*Non-empty.* The zero polynomial is in $I$: $0(0) = 0(1) = 0$. ✓

*Closed under subtraction.* If $p, q \in I$, then
$$(p - q)(0) = p(0) - q(0) = 0 - 0 = 0, \quad (p - q)(1) = p(1) - q(1) = 0 - 0 = 0.$$
So $p - q \in I$. ✓

*Absorption.* For $p \in I$ and arbitrary $r(x) \in \mathbb{R}[x]$:
$$(rp)(0) = r(0) p(0) = r(0) \cdot 0 = 0, \quad (rp)(1) = r(1) p(1) = r(1) \cdot 0 = 0.$$
So $rp \in I$. ✓

Hence $I \trianglelefteq \mathbb{R}[x]$. $\blacksquare$

*Explicit description.* By the factor theorem, $p(0) = 0 \iff x \mid p(x)$, and $p(1) = 0 \iff (x - 1) \mid p(x)$. Since $\gcd(x, x - 1) = 1$ in $\mathbb{R}[x]$, we have
$$I = \langle x(x - 1)\rangle = \langle x^2 - x\rangle,$$
a principal ideal (consistent with $\mathbb{R}[x]$ being a PID).

---

**Solution B3.**
**Criterion** ([[22-ideals-and-quotient-rings]]). For a commutative ring $R$ with unity, an ideal $I$ is maximal iff $R/I$ is a field.

*Compute $\mathbb{R}[x]/\langle x^2 + 1\rangle$.*

$x^2 + 1 \in \mathbb{R}[x]$ has discriminant $-4 < 0$, so no real roots. Hence $x^2 + 1$ is irreducible over $\mathbb{R}$ (it's degree $2$ and has no root).

**Theorem** ([[26-fields-and-irreducibility]]). For a field $F$, $F[x]/\langle p(x)\rangle$ is a field iff $p(x)$ is irreducible.

Apply with $F = \mathbb{R}$, $p(x) = x^2 + 1$: $\mathbb{R}[x]/\langle x^2 + 1\rangle$ is a field.

Hence $\langle x^2 + 1\rangle$ is maximal in $\mathbb{R}[x]$.

**Explicit identification.** The map $\mathbb{R}[x] \to \mathbb{C}$, $p(x) \mapsto p(i)$, is a surjective ring homomorphism. Its kernel contains $x^2 + 1$ (since $i^2 + 1 = 0$), and equals $\langle x^2 + 1\rangle$ (since $x^2 + 1$ is irreducible, the kernel is a maximal ideal, and the smallest containing $x^2 + 1$). By the First Isomorphism Theorem:
$$\mathbb{R}[x]/\langle x^2 + 1\rangle \cong \mathbb{C}.$$

$\mathbb{C}$ is a field, so $\langle x^2 + 1\rangle$ is **maximal**.

$\boxed{\text{Yes, } \langle x^2 + 1\rangle \text{ is a maximal ideal of } \mathbb{R}[x].}$ $\blacksquare$

---

**Solution B4.**
Compute $\mathbb{Z}[x]/\langle 3, x^2 + 1\rangle$.

**Strategy: quotient in stages.**

*Stage 1: Quotient by $\langle 3\rangle$.*

$\mathbb{Z}[x]/\langle 3\rangle \cong (\mathbb{Z}/3\mathbb{Z})[x] = \mathbb{F}_3[x]$.

*Reason:* The surjective homomorphism $\mathbb{Z}[x] \to \mathbb{F}_3[x]$ (reduce coefficients mod $3$) has kernel $\langle 3\rangle$, so First Iso gives the result.

*Stage 2: Quotient further by the image of $\langle x^2 + 1\rangle$.*

By the **Third Isomorphism Theorem (for rings)**: with $I = \langle 3\rangle \subseteq J = \langle 3, x^2 + 1\rangle$ ideals of $\mathbb{Z}[x]$,
$$\mathbb{Z}[x]/J \cong (\mathbb{Z}[x]/I)/(J/I).$$
Here $J/I$ is the ideal of $\mathbb{Z}[x]/I \cong \mathbb{F}_3[x]$ generated by the image of $x^2 + 1$, namely $\langle x^2 + 1\rangle \subseteq \mathbb{F}_3[x]$.

Hence
$$\mathbb{Z}[x]/\langle 3, x^2 + 1\rangle \;\cong\; \mathbb{F}_3[x]/\langle x^2 + 1\rangle.$$

*Stage 3: Check irreducibility.*

Is $x^2 + 1$ irreducible in $\mathbb{F}_3[x]$? A degree-$2$ polynomial is irreducible iff it has no root in $\mathbb{F}_3$:
$$0^2 + 1 = 1, \quad 1^2 + 1 = 2, \quad 2^2 + 1 = 5 \equiv 2 \pmod 3.$$
No roots ⟹ irreducible.

Hence $\mathbb{F}_3[x]/\langle x^2 + 1\rangle$ is a field.

*Size.* As an $\mathbb{F}_3$-vector space, $\mathbb{F}_3[x]/\langle x^2 + 1\rangle$ has basis $\{1, \bar x\}$ (any polynomial reduces mod $x^2 + 1$ to a linear polynomial). So the quotient has $3^2 = 9$ elements.

**Conclusion.** $\mathbb{Z}[x]/\langle 3, x^2 + 1\rangle \cong \mathbb{F}_9$, the unique finite field of order $9$.

$\boxed{\mathbb{Z}[x]/\langle 3, x^2 + 1\rangle \cong \mathbb{F}_9.}$ $\blacksquare$

---

**Solution B5.**
**Criterion.** $\langle p(x)\rangle$ is prime in $R[x]$ iff $R[x]/\langle p(x)\rangle$ is an integral domain.

*Compute $\mathbb{R}[x]/\langle x^2 - 1\rangle$.*

$x^2 - 1 = (x - 1)(x + 1)$ is reducible in $\mathbb{R}[x]$. Factors are coprime: $\gcd(x - 1, x + 1) = 1$ in $\mathbb{R}[x]$ (their difference is $2$, a unit).

**Chinese Remainder Theorem for rings.** If $I, J$ are coprime ideals ($I + J = R$), then $R/(I \cap J) \cong R/I \times R/J$.

Apply with $R = \mathbb{R}[x], I = \langle x - 1\rangle, J = \langle x + 1\rangle$. Check coprimality: $\langle x - 1\rangle + \langle x + 1\rangle$ contains $(x + 1) - (x - 1) = 2$, a unit, so the sum is $\mathbb{R}[x]$. Intersection: $\langle x - 1\rangle \cap \langle x + 1\rangle = \langle (x - 1)(x + 1)\rangle = \langle x^2 - 1\rangle$ (since the factors are coprime, intersection = product of ideals).

By CRT:
$$\mathbb{R}[x]/\langle x^2 - 1\rangle \cong \mathbb{R}[x]/\langle x - 1\rangle \times \mathbb{R}[x]/\langle x + 1\rangle \cong \mathbb{R} \times \mathbb{R}.$$
(Each factor is $\mathbb{R}$ via $p \mapsto p(1)$ and $p \mapsto p(-1)$ respectively.)

$\mathbb{R} \times \mathbb{R}$ is **not an integral domain**: $(1, 0) \cdot (0, 1) = (0, 0)$ with both factors non-zero.

Hence $\langle x^2 - 1\rangle$ is **not a prime ideal** of $\mathbb{R}[x]$.

$\boxed{\text{Not prime.}}$ $\blacksquare$

*General fact.* In a PID, $\langle p\rangle$ is prime iff $p$ is prime (equivalently irreducible). Here $x^2 - 1$ is reducible, so $\langle x^2 - 1\rangle$ is not prime.

---

**Solution B6.**
Let $R$ be a commutative ring and $I, J \subseteq R$ ideals.

**Claim 1.** $I \cap J$ is an ideal.

*Non-empty.* $0 \in I, 0 \in J$, so $0 \in I \cap J$. ✓

*Closed under subtraction.* If $a, b \in I \cap J$: $a, b \in I$, so $a - b \in I$ (subgroup). Similarly $a - b \in J$. Hence $a - b \in I \cap J$. ✓

*Absorption.* If $a \in I \cap J$ and $r \in R$: $ra \in I$ (since $I$ is an ideal) and $ra \in J$ (same). So $ra \in I \cap J$. ✓

$I \cap J$ is an ideal. $\blacksquare$

**Claim 2.** $I + J := \{a + b : a \in I, b \in J\}$ is an ideal.

*Non-empty.* $0 + 0 = 0 \in I + J$. ✓

*Closed under subtraction.* For $(a_1 + b_1), (a_2 + b_2) \in I + J$:
$$(a_1 + b_1) - (a_2 + b_2) = (a_1 - a_2) + (b_1 - b_2) \in I + J$$
since $a_1 - a_2 \in I$ and $b_1 - b_2 \in J$. ✓

*Absorption.* For $a + b \in I + J$ and $r \in R$:
$$r(a + b) = ra + rb \in I + J$$
since $ra \in I, rb \in J$. ✓

$I + J$ is an ideal. $\blacksquare$

*Remark.* $I + J$ is the smallest ideal containing both $I$ and $J$. $I \cap J$ is the largest ideal contained in both. They coincide with the **join** and **meet** in the lattice of ideals.

---

**Solution B7.**
$\mathbb{R}[x]/\langle x^2 - 2x + 1\rangle$.

**Factor.** $x^2 - 2x + 1 = (x - 1)^2$.

**Quotient analysis.** In the quotient, denote $\bar x = x + \langle (x - 1)^2\rangle$. Let $\alpha = \bar x - 1 = \overline{x - 1}$. Then:
$$\alpha^2 = \overline{(x - 1)^2} = \bar 0.$$

So $\alpha \in \mathbb{R}[x]/\langle (x - 1)^2\rangle$ is a **nilpotent** element (with $\alpha^2 = 0$). Moreover $\alpha \neq 0$, since $x - 1$ is not in $\langle (x - 1)^2\rangle$ (it has degree $1 < 2 = \deg((x - 1)^2)$, so cannot be a multiple of $(x-1)^2$).

**In an integral domain, there are no non-zero nilpotents** (if $\alpha^n = 0$ with $\alpha \neq 0$ in an ID, then $\alpha \cdot \alpha^{n-1} = 0$ forces $\alpha = 0$ or $\alpha^{n-1} = 0$; iterate to get $\alpha = 0$, contradiction).

Hence $\mathbb{R}[x]/\langle x^2 - 2x + 1\rangle$ is **not an integral domain**.

$\boxed{\text{Not an integral domain (has a non-zero nilpotent).}}$ $\blacksquare$

*Equivalently,* $\bar\alpha \cdot \bar\alpha = 0$ gives $\bar\alpha$ as a zero divisor. Structure: $\mathbb{R}[x]/\langle (x-1)^2\rangle \cong \mathbb{R}[\varepsilon]$ where $\varepsilon^2 = 0$ — the ring of dual numbers over $\mathbb{R}$.

---

## Part C — Ring Homomorphisms and Isomorphism Theorems

**Problem C1.** Find all ring homomorphisms $\mathbb{Z}_{12} \to \mathbb{Z}_{20}$.

**Problem C2.** Show $\mathbb{R}[x]/\langle x^2 + 4 \rangle \cong \mathbb{C}$.

**Problem C3.** Use CRT to compute $\mathbb{Z}_{30}$ as a product.

**Problem C4.** Find $\operatorname{Aut}(\mathbb{Q}(\sqrt 3)/\mathbb{Q})$.

**Problem C5.** Compute the kernel of $\varphi: \mathbb{Z}[x] \to \mathbb{C}$, $p(x) \mapsto p(1 + i)$.

**Problem C6.** Show that $\mathbb{Q}[x]/\langle x^2 - 5 \rangle \cong \mathbb{Q}(\sqrt 5)$.

**Problem C7.** Prove: if $\varphi: R \to S$ is a surjective ring homomorphism and $R$ is a PID, is $S$ a PID?

### Solutions — Part C

**Solution C1.**
A ring homomorphism $\varphi: \mathbb{Z}_{12} \to \mathbb{Z}_{20}$ (where we require $\varphi(1) = 1$? Let's consider both conventions).

**Convention: ring homomorphism sends $1 \mapsto 1$.** Then $\varphi$ is determined by $\varphi(1) = 1$, giving at most one $\varphi$. For existence, we need $12 \cdot 1 \equiv 0 \pmod{20}$, i.e., $12 \equiv 0 \pmod{20}$, which is false. So there is no unital ring homomorphism.

**Convention: ring homomorphism need not be unital.** Then $\varphi$ is determined by $\varphi(1) = e$ where $e$ satisfies:
- $e^2 = e$: idempotent (since $\varphi(1) = \varphi(1 \cdot 1) = \varphi(1) \varphi(1) = e^2$).
- $12 e = 0$ in $\mathbb{Z}_{20}$ (since $\varphi(12) = \varphi(0) = 0$ and $\varphi(12) = 12 \varphi(1) = 12 e$).

*Idempotents in $\mathbb{Z}_{20}$.* By CRT, $\mathbb{Z}_{20} \cong \mathbb{Z}_4 \times \mathbb{Z}_5$. Idempotents of $\mathbb{Z}_4$: $\{0, 1\}$ (only these satisfy $x^2 = x \bmod 4$: $0^2 = 0, 1^2 = 1, 2^2 = 0 \neq 2, 3^2 = 1 \neq 3$). Idempotents of $\mathbb{Z}_5$ (a field): $\{0, 1\}$.

So idempotents of $\mathbb{Z}_{20}$ are in bijection with $\{0, 1\}^2 = \{(0,0), (1,0), (0,1), (1,1)\}$, 4 idempotents. Via CRT isomorphism $\mathbb{Z}_{20} \to \mathbb{Z}_4 \times \mathbb{Z}_5$ by $k \mapsto (k \bmod 4, k \bmod 5)$:
- $(0, 0) \leftrightarrow 0$
- $(1, 0) \leftrightarrow$ solution to $k \equiv 1 \pmod 4, k \equiv 0 \pmod 5$. $k = 5$ works (check: $5 \bmod 4 = 1, 5 \bmod 5 = 0$). ✓ So $e = 5$.
- $(0, 1) \leftrightarrow$ $k \equiv 0 \pmod 4, k \equiv 1 \pmod 5$. $k = 16$ (check: $16 \bmod 4 = 0, 16 \bmod 5 = 1$). ✓ So $e = 16$.
- $(1, 1) \leftrightarrow 1$.

So idempotents are $\{0, 1, 5, 16\}$. Verify: $5^2 = 25 \equiv 5 \pmod {20}$ ✓. $16^2 = 256 \equiv 256 - 12 \cdot 20 = 256 - 240 = 16$ ✓.

*Which satisfy $12 e \equiv 0 \pmod {20}$?*
- $e = 0$: $12 \cdot 0 = 0$ ✓.
- $e = 1$: $12 \cdot 1 = 12 \not\equiv 0$. ✗
- $e = 5$: $12 \cdot 5 = 60 = 3 \cdot 20 \equiv 0$ ✓.
- $e = 16$: $12 \cdot 16 = 192 = 9 \cdot 20 + 12 \equiv 12 \not\equiv 0$. ✗

So $e \in \{0, 5\}$, giving $\boxed{2}$ ring homomorphisms (in the non-unital sense):

- $\varphi_0: k \mapsto 0$ (trivial).
- $\varphi_5: k \mapsto 5k \bmod 20$.

Verify $\varphi_5$: additive homo ✓; multiplicative $\varphi_5(k)\varphi_5(\ell) = 25 k\ell \equiv 5 k\ell$ and $\varphi_5(k \ell) = 5 k\ell$ — matches ✓.

$\boxed{2 \text{ homomorphisms (non-unital convention).}}$ $\blacksquare$

---

**Solution C2.**
Show $\mathbb{R}[x]/\langle x^2 + 4\rangle \cong \mathbb{C}$.

**Construction.** Define $\varphi: \mathbb{R}[x] \to \mathbb{C}$ by evaluation at $2i$:
$$\varphi(p(x)) = p(2i).$$
(We pick $2i$ rather than $i$ since we want $x^2 + 4$ in the kernel: $(2i)^2 + 4 = -4 + 4 = 0$ ✓.)

**$\varphi$ is a ring homomorphism.** $\varphi(p + q) = (p + q)(2i) = p(2i) + q(2i) = \varphi(p) + \varphi(q)$; $\varphi(pq) = (pq)(2i) = p(2i) q(2i) = \varphi(p) \varphi(q)$; $\varphi(1) = 1$. ✓

**$\varphi$ is surjective.** Any $c = a + bi \in \mathbb{C}$ equals $\varphi(a + (b/2) x)$: $(a + (b/2) x)|_{x = 2i} = a + (b/2)(2i) = a + bi = c$. ✓

**Compute $\ker\varphi$.**
$\varphi(p) = 0 \iff p(2i) = 0 \iff (x - 2i) \mid p(x)$ in $\mathbb{C}[x]$. 

Since $p \in \mathbb{R}[x]$, $p$ has real coefficients, so non-real roots come in conjugate pairs: $p(2i) = 0 \iff p(\overline{2i}) = p(-2i) = 0 \iff (x + 2i) \mid p$. Combined:
$$p(2i) = 0 \iff (x - 2i)(x + 2i) = x^2 + 4 \text{ divides } p.$$

Hence $\ker\varphi = \langle x^2 + 4\rangle$.

**First Isomorphism Theorem for rings:**
$$\mathbb{R}[x]/\langle x^2 + 4\rangle = \mathbb{R}[x]/\ker\varphi \cong \operatorname{Im}\varphi = \mathbb{C}.$$

$\boxed{\mathbb{R}[x]/\langle x^2 + 4\rangle \cong \mathbb{C}.}$ $\blacksquare$

*Remark.* This works for any irreducible quadratic over $\mathbb{R}$, e.g., $x^2 + a^2$ or $x^2 + bx + c$ with $b^2 - 4c < 0$.

---

**Solution C3.**
**Chinese Remainder Theorem for rings.** If $m = m_1 m_2 \cdots m_k$ with the $m_i$ pairwise coprime, then $\mathbb{Z}_m \cong \mathbb{Z}_{m_1} \times \mathbb{Z}_{m_2} \times \cdots \times \mathbb{Z}_{m_k}$ as rings.

*Apply to $30 = 2 \cdot 3 \cdot 5$.* The factors $2, 3, 5$ are pairwise coprime (they are distinct primes), so
$$\boxed{\mathbb{Z}_{30} \cong \mathbb{Z}_2 \times \mathbb{Z}_3 \times \mathbb{Z}_5.}$$

*Explicit isomorphism.* $k \mapsto (k \bmod 2, k \bmod 3, k \bmod 5)$.

*Verification with a sample element.* $k = 7$: $(1, 1, 2)$. Check that addition and multiplication are preserved: $7 + 8 = 15$ gives $(15 \bmod 2, 15 \bmod 3, 15 \bmod 5) = (1, 0, 0)$, and $(1, 1, 2) + (0, 2, 3) = (1, 0, 0)$. ✓

$\blacksquare$

---

**Solution C4.**
$\operatorname{Aut}(\mathbb{Q}(\sqrt 3)/\mathbb{Q})$ is the group of field automorphisms of $\mathbb{Q}(\sqrt 3)$ that fix $\mathbb{Q}$ pointwise.

**Setup.** $\mathbb{Q}(\sqrt 3) = \{a + b\sqrt 3 : a, b \in \mathbb{Q}\}$, a degree-$2$ extension of $\mathbb{Q}$ with basis $\{1, \sqrt 3\}$.

**Determine automorphisms.** Any $\mathbb{Q}$-automorphism $\sigma$ is determined by $\sigma(\sqrt 3)$, since $\sigma$ is $\mathbb{Q}$-linear:
$$\sigma(a + b\sqrt 3) = a + b \sigma(\sqrt 3).$$

Also, $\sigma(\sqrt 3)$ must be a root of the minimal polynomial of $\sqrt 3$ over $\mathbb{Q}$, which is $x^2 - 3$:
$$(\sigma(\sqrt 3))^2 = \sigma((\sqrt 3)^2) = \sigma(3) = 3.$$
So $\sigma(\sqrt 3) \in \{\sqrt 3, -\sqrt 3\}$.

**Two candidates:**
- $\sigma_1 = \operatorname{id}$: $\sqrt 3 \mapsto \sqrt 3$.
- $\sigma_2$: $\sqrt 3 \mapsto -\sqrt 3$, extended $\mathbb{Q}$-linearly.

**Check $\sigma_2$ is an automorphism.**
- $\mathbb{Q}$-linear (hence additive): ✓.
- Multiplicative: $\sigma_2((a + b\sqrt 3)(c + d\sqrt 3)) = \sigma_2((ac + 3bd) + (ad + bc)\sqrt 3) = (ac + 3bd) - (ad + bc)\sqrt 3$. Check equals $\sigma_2(a + b\sqrt 3) \sigma_2(c + d\sqrt 3) = (a - b\sqrt 3)(c - d\sqrt 3) = ac + 3bd - (ad + bc)\sqrt 3$. ✓
- Bijective: $\sigma_2 \circ \sigma_2 = \operatorname{id}$, so it's its own inverse. ✓

**Structure.** $\operatorname{Aut}(\mathbb{Q}(\sqrt 3)/\mathbb{Q}) = \{\operatorname{id}, \sigma_2\}$ with $\sigma_2^2 = \operatorname{id}$. So it is cyclic of order $2$:
$$\operatorname{Aut}(\mathbb{Q}(\sqrt 3)/\mathbb{Q}) \cong \mathbb{Z}/2\mathbb{Z}.$$

$\boxed{\operatorname{Aut}(\mathbb{Q}(\sqrt 3)/\mathbb{Q}) \cong \mathbb{Z}_2.}$ $\blacksquare$

---

**Solution C5.**
Compute $\ker\varphi$ for $\varphi: \mathbb{Z}[x] \to \mathbb{C}$, $p(x) \mapsto p(1 + i)$.

**Step 1: Find the minimal polynomial of $1 + i$ over $\mathbb{Q}$.**

$\alpha = 1 + i$. Compute powers:
$$\alpha - 1 = i, \quad (\alpha - 1)^2 = i^2 = -1, \quad \alpha^2 - 2\alpha + 1 = -1, \quad \alpha^2 - 2\alpha + 2 = 0.$$

So $\alpha$ satisfies $m(x) = x^2 - 2x + 2$, which has integer coefficients.

**Verify $m$ is irreducible over $\mathbb{Q}$.** Discriminant: $(-2)^2 - 4 \cdot 1 \cdot 2 = 4 - 8 = -4 < 0$. So $m$ has no real roots, hence no rational roots. Being degree $2$ with no rational roots, $m$ is irreducible over $\mathbb{Q}$.

**Step 2: $\ker\varphi \supseteq \langle m(x)\rangle$.**

$\varphi(m(x)) = m(1 + i) = (1 + i)^2 - 2(1 + i) + 2 = 2i - 2 - 2i + 2 = 0$. So $m(x) \in \ker\varphi$, hence $\langle m(x)\rangle \subseteq \ker\varphi$.

**Step 3: $\ker\varphi \subseteq \langle m(x)\rangle$.**

Let $p(x) \in \ker\varphi$, so $p(1 + i) = 0$.

*Use division in $\mathbb{Q}[x]$.* Divide $p$ by $m$ over $\mathbb{Q}[x]$: $p(x) = m(x) q(x) + r(x)$ with $\deg r < 2$, so $r(x) = ax + b$ for some $a, b \in \mathbb{Q}$. Evaluate at $1 + i$:
$$0 = p(1 + i) = m(1 + i) q(1 + i) + r(1 + i) = 0 + a(1 + i) + b = (a + b) + ai.$$

Since $a + b, a \in \mathbb{Q} \subseteq \mathbb{R}$, and the imaginary part must be $0$: $a = 0$. Then $b = 0$. So $r = 0$, i.e., $m \mid p$ in $\mathbb{Q}[x]$.

*Strengthen to $\mathbb{Z}[x]$.* We have $p(x) = m(x) q(x)$ with $q \in \mathbb{Q}[x]$. Since $p \in \mathbb{Z}[x]$ and $m \in \mathbb{Z}[x]$ is **monic**, the division algorithm in $\mathbb{Z}[x]$ (valid for monic divisors, since it avoids fractions from the leading coefficient) yields $q \in \mathbb{Z}[x]$ directly. Hence $p \in m \cdot \mathbb{Z}[x] = \langle m\rangle$ in $\mathbb{Z}[x]$.

**Conclusion.**
$$\boxed{\ker\varphi = \langle x^2 - 2x + 2\rangle.}$$

*Image.* $\operatorname{Im}\varphi = \mathbb{Z}[1 + i] = \{a + b(1+i) : a, b \in \mathbb{Z}\} = \{a' + bi : a', b \in \mathbb{Z}\} = \mathbb{Z}[i]$. By First Iso, $\mathbb{Z}[x]/\langle x^2 - 2x + 2\rangle \cong \mathbb{Z}[i]$. $\blacksquare$

---

**Solution C6.**
Show $\mathbb{Q}[x]/\langle x^2 - 5\rangle \cong \mathbb{Q}(\sqrt 5)$.

**Construction.** Define $\varphi: \mathbb{Q}[x] \to \mathbb{Q}(\sqrt 5)$ by $\varphi(p(x)) = p(\sqrt 5)$.

**$\varphi$ is a ring homomorphism.** Standard for evaluation maps (additive, multiplicative, unital). ✓

**$\varphi$ is surjective.** Any element of $\mathbb{Q}(\sqrt 5)$ has the form $a + b\sqrt 5$ with $a, b \in \mathbb{Q}$. Take $p(x) = a + bx$; then $\varphi(p) = a + b\sqrt 5$. ✓

**Compute $\ker\varphi$.**

$\varphi(p) = 0 \iff p(\sqrt 5) = 0$. Since $\sqrt 5$ has minimal polynomial $x^2 - 5$ over $\mathbb{Q}$ (check irreducibility: $x^2 - 5$ has no rational roots since $5$ is not a rational square, and degree $2$), any polynomial in $\mathbb{Q}[x]$ vanishing at $\sqrt 5$ must be divisible by $x^2 - 5$:

*Division.* Write $p(x) = (x^2 - 5) q(x) + r(x)$, $\deg r < 2$. Then $r(\sqrt 5) = p(\sqrt 5) - (5 - 5) q(\sqrt 5) = 0$. $r(x) = a + bx$ for some $a, b \in \mathbb{Q}$; $r(\sqrt 5) = a + b\sqrt 5 = 0$ forces $a = b = 0$ (since $1, \sqrt 5$ are $\mathbb{Q}$-linearly independent). So $r = 0$, $p = (x^2 - 5) q$, $p \in \langle x^2 - 5\rangle$.

$\ker\varphi = \langle x^2 - 5\rangle$.

**First Isomorphism Theorem.**
$$\mathbb{Q}[x]/\langle x^2 - 5\rangle \cong \operatorname{Im}\varphi.$$

*Compute $\operatorname{Im}\varphi$.* $\operatorname{Im}\varphi = \{p(\sqrt 5) : p \in \mathbb{Q}[x]\} = \{a + b\sqrt 5 : a, b \in \mathbb{Q}\} = \mathbb{Q}(\sqrt 5)$. (Equality: $\mathbb{Q}(\sqrt 5)$ is already closed under polynomial operations in $\sqrt 5$, and the image contains all $a + b\sqrt 5$.)

Also $\mathbb{Q}(\sqrt 5)$ is a field (every non-zero $a + b\sqrt 5$ has inverse $(a - b\sqrt 5)/(a^2 - 5b^2)$ with $a^2 - 5b^2 \neq 0$ since $5$ is not a rational square), consistent with $x^2 - 5$ being irreducible.

$$\boxed{\mathbb{Q}[x]/\langle x^2 - 5\rangle \cong \mathbb{Q}(\sqrt 5).} \qquad \blacksquare$$

---

**Solution C7.**
**Question:** If $\varphi: R \to S$ is surjective and $R$ is a PID, is $S$ a PID?

**Attempt to prove.** Suppose $R$ is a PID and $\varphi: R \twoheadrightarrow S$ surjective. Let $J \subseteq S$ be an ideal.

*Pullback.* $I := \varphi^{-1}(J) = \{r \in R : \varphi(r) \in J\}$ is an ideal of $R$ (check: closed under $\pm$, absorbs $R$-multiplication, since $J$ has these properties and $\varphi$ is a hom).

Since $R$ is a PID, $I = \langle a\rangle$ for some $a \in R$.

*Image.* $J = \varphi(I)$ (since $\varphi$ is surjective, every $s \in J$ has a preimage $r \in R$ with $\varphi(r) = s$; actually we need $r \in I$, which follows: $\varphi(r) = s \in J$ means $r \in \varphi^{-1}(J) = I$).

Claim $J = \langle \varphi(a)\rangle$.

*Proof of claim.* $\varphi(a) \in J$, so $\langle \varphi(a)\rangle \subseteq J$. Conversely, $j \in J$: write $j = \varphi(r)$ with $r \in I = \langle a\rangle$, say $r = a x$ for some $x \in R$. Then $j = \varphi(a x) = \varphi(a) \varphi(x) \in \langle \varphi(a)\rangle$.

So $J = \langle \varphi(a)\rangle$ is principal.

**Conclusion.** Every ideal of $S$ is principal, so $S$ is a **principal ideal ring**.

**But wait** — a PID is typically defined as a principal ideal **integral domain**. We've shown $S$ has all principal ideals; we need $S$ to be an ID.

*$S$ need not be an integral domain.* E.g., $R = \mathbb{Z}$ (PID), $S = \mathbb{Z}/6\mathbb{Z}$ (has zero divisors $2, 3$). All ideals are principal, but $S$ is not an ID.

**So the answer depends on definition.** If "PID" means just "principal ideal ring", the answer is yes. If "PID" requires integral domain, the answer is NO in general.

$\boxed{\text{Principal: yes. Integral domain: no (in general).}}$ $\blacksquare$

*Example where $S$ is also a PID.* $R = \mathbb{Z}, S = \mathbb{Z}$ with $\varphi = \operatorname{id}$. Or $R = \mathbb{Q}[x], S = \mathbb{Q}$ (evaluation at $0$), and $\mathbb{Q}$ is a field (hence a PID).

---

## Part D — Polynomial Rings

**Problem D1.** Divide $x^5 + 2x^3 + 1$ by $x^2 - 1$ in $\mathbb{Q}[x]$.

**Problem D2.** Find all roots of $x^4 - 1$ in $\mathbb{Z}_{15}$.

**Problem D3.** Compute $\gcd(x^3 - 1, x^2 + 2x - 3)$ in $\mathbb{Q}[x]$.

**Problem D4.** Show that $x^2 + x + 1$ is irreducible over $\mathbb{F}_2$ but reducible over $\mathbb{F}_3$.

**Problem D5.** Use the rational root theorem to determine the rational roots of $2x^3 - 3x^2 - 8x - 3$.

**Problem D6.** Let $p(x) = x^3 + 3x^2 + 3x + 2$. Find all roots in $\mathbb{F}_5$.

**Problem D7.** Show that in $\mathbb{Z}_p[x]$ (for $p$ prime), $x^p - x$ factors as $\prod_{a \in \mathbb{F}_p} (x - a)$. (Use Fermat's little theorem.)

### Solutions — Part D

**Solution D1.**
Polynomial long division of $p(x) = x^5 + 2x^3 + 1$ by $d(x) = x^2 - 1$ in $\mathbb{Q}[x]$.

*Step 1.* Leading term: $x^5 / x^2 = x^3$. Multiply: $x^3 \cdot (x^2 - 1) = x^5 - x^3$. Subtract:
$$p(x) - x^3(x^2 - 1) = (x^5 + 2x^3 + 1) - (x^5 - x^3) = 3x^3 + 1.$$

*Step 2.* Leading term: $3x^3 / x^2 = 3x$. Multiply: $3x(x^2 - 1) = 3x^3 - 3x$. Subtract:
$$(3x^3 + 1) - (3x^3 - 3x) = 3x + 1.$$

*Step 3.* $\deg(3x + 1) = 1 < 2 = \deg d$, so stop. Quotient $q(x) = x^3 + 3x$, remainder $r(x) = 3x + 1$.

**Verify:** $q(x) \cdot d(x) + r(x) = (x^3 + 3x)(x^2 - 1) + (3x + 1)$
$= x^5 - x^3 + 3x^3 - 3x + 3x + 1 = x^5 + 2x^3 + 1$. ✓

$$\boxed{x^5 + 2x^3 + 1 = (x^2 - 1)(x^3 + 3x) + (3x + 1).}$$

Quotient: $x^3 + 3x$. Remainder: $3x + 1$. $\blacksquare$

---

**Solution D2.**
Find all $x \in \mathbb{Z}_{15}$ with $x^4 = 1$.

**CRT.** $15 = 3 \cdot 5$, $\gcd(3, 5) = 1$, so $\mathbb{Z}_{15} \cong \mathbb{Z}_3 \times \mathbb{Z}_5$ as rings. A solution $x \in \mathbb{Z}_{15}$ corresponds to a pair $(x_1, x_2) \in \mathbb{Z}_3 \times \mathbb{Z}_5$ with $x_1^4 = 1$ in $\mathbb{Z}_3$ and $x_2^4 = 1$ in $\mathbb{Z}_5$.

**Solve $x^4 = 1$ in $\mathbb{Z}_3$.**
- $x = 0$: $0^4 = 0 \neq 1$. ✗
- $x = 1$: $1^4 = 1$. ✓
- $x = 2$: $2^4 = 16 \equiv 1 \pmod 3$. ✓

So $2$ solutions in $\mathbb{Z}_3$: $\{1, 2\}$.

(*Alternate:* $\mathbb{Z}_3^\times$ has order $2$, so $x^2 = 1$ for all $x \in \mathbb{Z}_3^\times$, hence $x^4 = 1$; $x = 0$ gives $0$.)

**Solve $x^4 = 1$ in $\mathbb{Z}_5$.**
- $x = 0$: $0 \neq 1$. ✗
- $x \in \mathbb{Z}_5^\times = \{1, 2, 3, 4\}$, order $4$. By Fermat, $x^4 = 1$ for all $x \in \mathbb{Z}_5^\times$. ✓

So $4$ solutions in $\mathbb{Z}_5$: $\{1, 2, 3, 4\}$.

**Combine via CRT.** $2 \times 4 = 8$ solutions in $\mathbb{Z}_{15}$.

**Explicitly listing.** For each $(x_1, x_2) \in \{1, 2\} \times \{1, 2, 3, 4\}$, find $x \in \mathbb{Z}_{15}$ with $x \equiv x_1 \pmod 3, x \equiv x_2 \pmod 5$:

| $(x_1, x_2)$ | $x \bmod 15$ |
|---|---|
| $(1, 1)$ | $1$ |
| $(1, 2)$ | $7$ (check: $7 \bmod 3 = 1, 7 \bmod 5 = 2$ ✓) |
| $(1, 3)$ | $13$ |
| $(1, 4)$ | $4$ |
| $(2, 1)$ | $11$ |
| $(2, 2)$ | $2$ |
| $(2, 3)$ | $8$ |
| $(2, 4)$ | $14$ |

**Roots of $x^4 - 1$ in $\mathbb{Z}_{15}$:** $\{1, 2, 4, 7, 8, 11, 13, 14\}$, **8 roots**.

$\boxed{8 \text{ roots: } \{1, 2, 4, 7, 8, 11, 13, 14\}.}$

*Remark.* This exceeds the degree $4$ — because $\mathbb{Z}_{15}$ is *not* an integral domain (it has zero divisors). Over an ID, a polynomial of degree $n$ has at most $n$ roots. $\blacksquare$

---

**Solution D3.**
Compute $\gcd(x^3 - 1, x^2 + 2x - 3)$ in $\mathbb{Q}[x]$.

**Method: Euclidean algorithm.**

*Step 1.* Divide $x^3 - 1$ by $x^2 + 2x - 3$.

Leading: $x^3/x^2 = x$. Multiply: $x(x^2 + 2x - 3) = x^3 + 2x^2 - 3x$. Subtract:
$$(x^3 - 1) - (x^3 + 2x^2 - 3x) = -2x^2 + 3x - 1.$$

Continue: $-2x^2/x^2 = -2$. Multiply: $-2(x^2 + 2x - 3) = -2x^2 - 4x + 6$. Subtract:
$$(-2x^2 + 3x - 1) - (-2x^2 - 4x + 6) = 7x - 7.$$

So $x^3 - 1 = (x^2 + 2x - 3)(x - 2) + (7x - 7)$.

*Step 2.* Divide $x^2 + 2x - 3$ by $7x - 7$.

$7x - 7 = 7(x - 1)$. Simplify: divide by $x - 1$ instead (the $7$ is a unit in $\mathbb{Q}[x]$, doesn't affect gcd).

$x^2 + 2x - 3 = (x - 1)(x + 3)$. (Check: $(x - 1)(x + 3) = x^2 + 3x - x - 3 = x^2 + 2x - 3$ ✓.)

So $x^2 + 2x - 3 = (x - 1)(x + 3) + 0$. Remainder is $0$.

*Step 3.* $\gcd = $ last non-zero remainder, normalized to monic: $x - 1$.

**Alternative via factoring.**
$$x^3 - 1 = (x - 1)(x^2 + x + 1).$$
$$x^2 + 2x - 3 = (x - 1)(x + 3).$$

Common factor: $x - 1$. Quotients $x^2 + x + 1$ (discriminant $1 - 4 = -3 < 0$, irreducible over $\mathbb{Q}$) and $x + 3$ share no common root.

$$\boxed{\gcd(x^3 - 1, x^2 + 2x - 3) = x - 1.} \qquad \blacksquare$$

---

**Solution D4.**
**Part (a): $x^2 + x + 1$ is irreducible over $\mathbb{F}_2$.**

A polynomial of degree $\leq 3$ is irreducible iff it has no roots in the base field.

Check roots in $\mathbb{F}_2 = \{0, 1\}$:
$$p(0) = 0 + 0 + 1 = 1 \neq 0, \quad p(1) = 1 + 1 + 1 = 1 \neq 0 \pmod 2.$$

No roots, so $x^2 + x + 1$ is irreducible over $\mathbb{F}_2$.

**Part (b): $x^2 + x + 1$ is reducible over $\mathbb{F}_3$.**

Check roots in $\mathbb{F}_3 = \{0, 1, 2\}$:
$$p(0) = 1, \quad p(1) = 1 + 1 + 1 = 3 \equiv 0 \pmod 3 \;\;\checkmark$$

So $x = 1$ is a root. Factor using $(x - 1)$:
$$x^2 + x + 1 = (x - 1) q(x).$$

Perform polynomial division in $\mathbb{F}_3$:
$$x^2 + x + 1 \div (x - 1).$$
Leading: $x^2/x = x$. Multiply: $x(x - 1) = x^2 - x$. Subtract: $(x^2 + x + 1) - (x^2 - x) = 2x + 1$.
Leading: $2x/x = 2$. Multiply: $2(x - 1) = 2x - 2$. Subtract: $(2x + 1) - (2x - 2) = 3 \equiv 0 \pmod 3$.

So $x^2 + x + 1 = (x - 1)(x + 2)$ in $\mathbb{F}_3$.

*Check.* $-1 \equiv 2 \pmod 3$, so $x - 1 = x + 2$ in $\mathbb{F}_3[x]$. Hence
$$x^2 + x + 1 = (x - 1)(x + 2) = (x + 2)^2 \pmod 3.$$
*Verify:* $(x + 2)^2 = x^2 + 4x + 4 = x^2 + x + 1 \pmod 3$ ✓.

**So over $\mathbb{F}_3$: $x^2 + x + 1 = (x - 1)^2 = (x + 2)^2$** — a perfect square. Reducible.

$\boxed{\text{Irreducible over } \mathbb{F}_2; \text{ reducible over } \mathbb{F}_3 \text{ as } (x-1)^2.}$ $\blacksquare$

*Remark.* Over $\mathbb{F}_3$, $x^2 + x + 1$ is the third cyclotomic polynomial $\Phi_3(x)$ whose roots are primitive $3$rd roots of unity. In characteristic $3$, the only root of $x^3 = 1$ is $1$ (triple), giving $x^3 - 1 = (x - 1)^3$ and $\Phi_3 = (x^3 - 1)/(x - 1) = (x - 1)^2$ in $\mathbb{F}_3$.

---

**Solution D5.**
Find rational roots of $p(x) = 2x^3 - 3x^2 - 8x - 3$.

**Rational Root Theorem.** If $p/q$ (in lowest terms) is a rational root of $a_n x^n + \cdots + a_0 \in \mathbb{Z}[x]$, then $p \mid a_0$ and $q \mid a_n$.

*For $p(x) = 2x^3 - 3x^2 - 8x - 3$:* $a_0 = -3$, $a_n = 2$. Rational root candidates $r/s$ with $r \mid 3, s \mid 2$:
$$\{\pm 1, \pm 3, \pm 1/2, \pm 3/2\}.$$

*Test each.*

- $p(1) = 2 - 3 - 8 - 3 = -12$. ✗
- $p(-1) = -2 - 3 + 8 - 3 = 0$. ✓
- $p(3) = 54 - 27 - 24 - 3 = 0$. ✓
- $p(-3) = -54 - 27 + 24 - 3 = -60$. ✗
- $p(1/2) = 2(1/8) - 3(1/4) - 8(1/2) - 3 = 1/4 - 3/4 - 4 - 3 = -30/4 = -15/2$. ✗
- $p(-1/2) = 2(-1/8) - 3(1/4) - 8(-1/2) - 3 = -1/4 - 3/4 + 4 - 3 = -1 + 1 = 0$. ✓
- $p(3/2) = 2(27/8) - 3(9/4) - 8(3/2) - 3 = 27/4 - 27/4 - 12 - 3 = -15$. ✗
- $p(-3/2) = -27/4 - 27/4 + 12 - 3 = -54/4 + 9 = -27/2 + 9 = -9/2$. ✗

**Rational roots:** $\{-1, 3, -1/2\}$. Three roots, matching degree $3$.

**Factoring.** Since $2x^3 - 3x^2 - 8x - 3$ has roots $-1, 3, -1/2$:
$$p(x) = 2(x + 1)(x - 3)(x + 1/2) = (x + 1)(x - 3)(2x + 1).$$

*Verify.* 
$(x + 1)(x - 3) = x^2 - 2x - 3$.
$(x^2 - 2x - 3)(2x + 1) = 2x^3 + x^2 - 4x^2 - 2x - 6x - 3 = 2x^3 - 3x^2 - 8x - 3$. ✓

$\boxed{\text{Rational roots: } -1, 3, -\tfrac{1}{2}. \quad p(x) = (x + 1)(x - 3)(2x + 1).}$ $\blacksquare$

---

**Solution D6.**
Find all roots of $p(x) = x^3 + 3x^2 + 3x + 2$ in $\mathbb{F}_5$.

Since $\mathbb{F}_5$ is finite, evaluate at each element:

$p(0) = 0 + 0 + 0 + 2 = 2$. ✗

$p(1) = 1 + 3 + 3 + 2 = 9 \equiv 4 \pmod 5$. ✗

$p(2) = 8 + 12 + 6 + 2 = 28 \equiv 3 \pmod 5$. ✗

$p(3) = 27 + 27 + 9 + 2 = 65 \equiv 0 \pmod 5$. ✓

$p(4) = 64 + 48 + 12 + 2 = 126 = 25 \cdot 5 + 1 \equiv 1 \pmod 5$. ✗

**Only root:** $x = 3$.

*Factoring.* $p(x) = (x - 3) q(x)$ for some quadratic $q \in \mathbb{F}_5[x]$. Divide:
- Leading: $x^3/x = x^2$. Multiply: $x^2(x - 3) = x^3 - 3x^2$. Subtract: $x^3 + 3x^2 + 3x + 2 - (x^3 - 3x^2) = 6x^2 + 3x + 2 \equiv x^2 + 3x + 2 \pmod 5$.
- Leading: $x^2/x = x$. Multiply: $x(x - 3) = x^2 - 3x$. Subtract: $x^2 + 3x + 2 - (x^2 - 3x) = 6x + 2 \equiv x + 2 \pmod 5$.
- Leading: $x/x = 1$. Multiply: $1 \cdot (x - 3) = x - 3$. Subtract: $(x + 2) - (x - 3) = 5 \equiv 0 \pmod 5$.

So $p(x) = (x - 3)(x^2 + x + 1)$ in $\mathbb{F}_5$.

Verify: $(x - 3)(x^2 + x + 1) = x^3 + x^2 + x - 3x^2 - 3x - 3 = x^3 - 2x^2 - 2x - 3 \equiv x^3 + 3x^2 + 3x + 2 \pmod 5$ ✓.

*Is $x^2 + x + 1$ irreducible over $\mathbb{F}_5$?* Check roots in $\mathbb{F}_5$: $x = 0: 1; x = 1: 3; x = 2: 7 \equiv 2; x = 3: 13 \equiv 3; x = 4: 21 \equiv 1$. No roots. Irreducible.

**Only root of $p$ in $\mathbb{F}_5$:** $\boxed{x = 3}$. $\blacksquare$

---

**Solution D7.**
Show $x^p - x = \prod_{a \in \mathbb{F}_p}(x - a)$ in $\mathbb{F}_p[x]$.

**Fermat's Little Theorem.** For $a \in \mathbb{F}_p = \mathbb{Z}/p\mathbb{Z}$:
$$a^p \equiv a \pmod p, \quad \text{i.e.,} \quad a^p - a = 0 \text{ in } \mathbb{F}_p.$$
(Proof: for $a = 0$, trivial. For $a \neq 0$, $a \in \mathbb{F}_p^\times$ has $|a| \mid |\mathbb{F}_p^\times| = p - 1$, so $a^{p-1} = 1$, hence $a^p = a$.)

**So every $a \in \mathbb{F}_p$ is a root of $f(x) = x^p - x$.**

**Step 1: $f$ has at most $p$ roots in $\mathbb{F}_p$.**

$\deg f = p$ and $\mathbb{F}_p$ is an integral domain, so $f$ has at most $p$ roots in $\mathbb{F}_p$ ([[24-polynomial-rings]]).

**Step 2: $f$ has exactly $p$ roots, one for each $a \in \mathbb{F}_p$.**

By Fermat, every $a \in \mathbb{F}_p$ is a root. There are $p$ distinct elements in $\mathbb{F}_p$, giving $p$ distinct roots.

**Step 3: Factorization.**

By the factor theorem, $(x - a) \mid f(x)$ for each $a \in \mathbb{F}_p$. Since the factors are coprime in $\mathbb{F}_p[x]$ (distinct roots give coprime linear factors — more precisely, in a UFD, distinct primes are coprime), their product also divides $f$:
$$\prod_{a \in \mathbb{F}_p}(x - a) \mid f(x).$$

Both sides are monic of degree $p$: LHS has degree $p$ (product of $p$ linear factors), and $f(x) = x^p - x$ has degree $p$ with leading coefficient $1$. So:
$$f(x) = \prod_{a \in \mathbb{F}_p}(x - a).$$

$$\boxed{x^p - x = \prod_{a \in \mathbb{F}_p}(x - a) \text{ in } \mathbb{F}_p[x].} \qquad \blacksquare$$

*Corollary (Wilson's theorem).* Comparing constant terms: constant of $f$ is $0$ (no constant term), but the product is $\prod_a (-a) = (-1)^p \prod_a a$. For $p$ odd, $(-1)^p = -1$, so $-\prod_a a = 0$, i.e., $\prod_a a = 0$ — not useful. Instead consider $f(x)/x = x^{p-1} - 1 = \prod_{a \in \mathbb{F}_p^\times}(x - a)$. Constant term: $-1 = \prod_{a = 1}^{p - 1}(-a) = (-1)^{p-1} (p - 1)!$. For $p$ odd, $(-1)^{p-1} = 1$, so $(p - 1)! \equiv -1 \pmod p$ — **Wilson's theorem**!

---

## Summary of CO4

CO4 treats the ring-level structure in depth:

1. **Integral domains** — no zero divisors, cancellation law, characteristic, Frobenius, field of fractions.
2. **Ideals & quotient rings** — the ring analogue of normal subgroups & quotient groups; ideal-quotient correspondence.
3. **Ring homomorphisms** — First/Second/Third isomorphism theorems for rings; CRT for rings.
4. **Polynomial rings** — integral domain property, division algorithm over $\mathbb{F}$, PID structure of $\mathbb{F}[x]$, factor theorem, root counting.

The stage is now set for the field theory and irreducibility tests of CO5.

## Related Concepts

- [[21-integral-domains]]
- [[22-ideals-and-quotient-rings]]
- [[23-ring-homomorphisms]]
- [[24-polynomial-rings]]
- [[26-fields-and-irreducibility]]
- [[27-finite-fields-and-extensions]]

---

*Last updated: 2026-04-19*
