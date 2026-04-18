---
title: "Rings — Definition and Examples"
type: guide
co: CO3
related: [01-operations-and-algebraic-structures, 18-isomorphism-theorems, 21-integral-domains]
---

# 19. Rings — Definition and Examples

A **ring** is a set with two operations — addition and multiplication — related by a distributive law. Rings unify and generalize the arithmetic of integers, polynomials, matrices, and modular arithmetic. This chapter defines rings, classifies the principal variants (commutative, with unity, integral domains, division rings, fields), and catalogs the central examples. We also introduce the basic structural concepts: subrings, units, and zero divisors.

## 19.1 Definition

> **Definition 19.1 (Ring).** A **ring** $(R, +, \cdot)$ is a set $R$ with two binary operations $+$ and $\cdot$ such that:
>
> 1. $(R, +)$ is an **abelian group**.
> 2. $\cdot$ is **associative**: $(ab)c = a(bc)$.
> 3. **Distributivity**: $a(b + c) = ab + ac$ and $(a + b)c = ac + bc$.

**Notation.** The additive identity is $0$. The additive inverse of $a$ is $-a$. Multiplication is written juxtapositionally.

> **Definition 19.2 (Optional properties).**
> - **Commutative ring:** $ab = ba$ for all $a, b \in R$.
> - **Ring with unity:** there exists $1 \in R$ with $1 \cdot a = a \cdot 1 = a$ for all $a$.
> - **Division ring (or skew field):** ring with unity where every nonzero element has a multiplicative inverse.
> - **Field:** commutative division ring.

### Basic properties

> **Proposition 19.3.** In any ring $R$:
> 1. $a \cdot 0 = 0 \cdot a = 0$ for all $a \in R$.
> 2. $a(-b) = (-a)b = -(ab)$.
> 3. $(-a)(-b) = ab$.
> 4. If $R$ has unity and $|R| > 1$, then $1 \neq 0$.

*Proofs.*
1. $a \cdot 0 = a(0 + 0) = a \cdot 0 + a \cdot 0$. Subtract to get $a \cdot 0 = 0$.
2. $a(-b) + ab = a(-b + b) = a \cdot 0 = 0$. So $a(-b) = -(ab)$. Similarly for the other.
3. $(-a)(-b) = -(a(-b)) = -(-(ab)) = ab$.
4. If $1 = 0$, then $a = a \cdot 1 = a \cdot 0 = 0$ for all $a$, so $R = \{0\}$. Contrapositive gives (4). $\blacksquare$

## 19.2 Examples of Rings

### Commutative rings with unity

**Example 1 ($\mathbb{Z}$).** Integers with usual $+, \cdot$. Commutative, unity $1$. Not a field ($2$ has no inverse in $\mathbb{Z}$).

**Example 2 ($\mathbb{Q}, \mathbb{R}, \mathbb{C}$).** Fields.

**Example 3 ($\mathbb{Z}_n$).** Integers modulo $n$, with $+, \cdot$ mod $n$. Commutative, unity $1$. It is a field iff $n$ is prime (Theorem 19.7 below).

**Example 4 ($\mathbb{Z}[x]$).** Polynomials in $x$ with integer coefficients. Commutative, unity the constant 1.

**Example 5 ($\mathbb{R}[x]$, $\mathbb{Q}[x]$, $\mathbb{C}[x]$).** Polynomial rings over fields. Commutative, unity 1.

**Example 6 ($\mathbb{Z}[i]$ — Gaussian integers).** $\mathbb{Z}[i] = \{a + bi : a, b \in \mathbb{Z}\}$ with usual complex $+, \cdot$. Commutative, unity 1.

**Example 7 ($\mathbb{Z}[\sqrt{d}]$).** For $d$ a squarefree integer, $\mathbb{Z}[\sqrt{d}] = \{a + b\sqrt{d} : a, b \in \mathbb{Z}\}$.

### Non-commutative rings with unity

**Example 8 ($M_n(\mathbb{R})$).** $n \times n$ real matrices under matrix addition and multiplication. Unity is $I_n$. Non-commutative for $n \ge 2$.

**Example 9 (Quaternions $\mathbb{H}$).** $\mathbb{H} = \{a + bi + cj + dk : a, b, c, d \in \mathbb{R}\}$ with relations $i^2 = j^2 = k^2 = ijk = -1$. Division ring, not commutative.

### Commutative rings without unity

**Example 10 ($2\mathbb{Z}$).** Even integers, a subring of $\mathbb{Z}$ without unity. ($1 \notin 2\mathbb{Z}$.)

**Example 11 ($C_c(\mathbb{R})$).** Continuous functions with compact support on $\mathbb{R}$ (real-valued), under pointwise $+, \cdot$. The constant function 1 doesn't have compact support, so no unity.

### Zero ring

**Example 12.** $\{0\}$ is a ring (the **zero ring** or **trivial ring**). Often excluded by requiring $1 \neq 0$.

## 19.3 Subrings

> **Definition 19.4.** A subset $S \subseteq R$ is a **subring** if $S$ is itself a ring under the operations inherited from $R$. Equivalently (subring test):
> 1. $0 \in S$
> 2. $a, b \in S \Rightarrow a - b \in S$ (additive closure)
> 3. $a, b \in S \Rightarrow ab \in S$ (multiplicative closure)

(Some conventions require $1 \in S$ if $R$ has unity.)

**Example 13.** $\mathbb{Z} \subset \mathbb{Q} \subset \mathbb{R} \subset \mathbb{C}$. Chain of subrings.

**Example 14.** $n\mathbb{Z}$ is a subring of $\mathbb{Z}$.

**Example 15.** $\mathbb{Z}[i] \subset \mathbb{C}$ is a subring.

**Example 16.** The upper triangular matrices form a subring of $M_n(\mathbb{R})$.

## 19.4 Units

> **Definition 19.5.** In a ring $R$ with unity, an element $a \in R$ is a **unit** if there exists $b \in R$ with $ab = ba = 1$. The set of units is denoted $R^\times$ or $U(R)$.

> **Proposition 19.6.** $R^\times$ is a group under multiplication (the **group of units**).

*Proof.* Closure: $(ab)(b^{-1}a^{-1}) = 1$. Identity: $1$. Inverses: $a \in R^\times$ means $a^{-1}$ exists. $\blacksquare$

**Example 17.** $\mathbb{Z}^\times = \{\pm 1\}$.

**Example 18.** $\mathbb{Q}^\times = \mathbb{Q} \setminus \{0\}$ (field). Similarly $\mathbb{R}^\times, \mathbb{C}^\times$.

**Example 19.** $\mathbb{Z}_n^\times = \{k : \gcd(k, n) = 1\} = U(n)$ from [[03-groups-definition-and-examples]].

**Example 20.** $M_n(\mathbb{R})^\times = GL_n(\mathbb{R})$.

**Example 21.** $\mathbb{Z}[i]^\times = \{1, -1, i, -i\}$. The units of Gaussian integers are the 4th roots of unity.

**Example 22.** $\mathbb{Z}[x]^\times = \{\pm 1\}$. Polynomials with integer coefficients: only constants $\pm 1$ are units.

## 19.5 Fields

> **Theorem 19.7.** $\mathbb{Z}_n$ is a field $\iff$ $n$ is prime.

*Proof.*

($\Leftarrow$) Suppose $n = p$ prime. For $a \in \mathbb{Z}_p \setminus \{0\}$, $\gcd(a, p) = 1$, so Bézout gives $ax + py = 1$ for some integers $x, y$. Mod $p$: $ax \equiv 1$, so $a$ is a unit.

($\Rightarrow$) Suppose $\mathbb{Z}_n$ is a field and $n$ is composite, say $n = ab$ with $1 < a, b < n$. Then $a, b \neq 0$ in $\mathbb{Z}_n$ but $ab = n \equiv 0$. This contradicts $\mathbb{Z}_n$ being a field (see Zero Divisors below). $\blacksquare$

> **Definition 19.8.** $\mathbb{F}_p = \mathbb{Z}_p$ for $p$ prime — the **finite field of $p$ elements**.

## 19.6 Zero Divisors

> **Definition 19.9.** A nonzero element $a \in R$ is a **zero divisor** if there exists a nonzero $b \in R$ with $ab = 0$ or $ba = 0$.

**Example 23.** In $\mathbb{Z}_6$: $2 \cdot 3 = 6 \equiv 0$, so 2 and 3 are zero divisors.

**Example 24.** In $M_2(\mathbb{R})$: $\begin{pmatrix}1&0\\0&0\end{pmatrix} \cdot \begin{pmatrix}0&0\\0&1\end{pmatrix} = \begin{pmatrix}0&0\\0&0\end{pmatrix}$. Both matrices are zero divisors.

**Example 25.** $\mathbb{Z}$ has no zero divisors: if $ab = 0$ with $a, b \in \mathbb{Z}$ both nonzero, product is nonzero.

> **Proposition 19.10.** In a ring with unity, a unit cannot be a zero divisor.

*Proof.* If $a$ is a unit and $ab = 0$, multiply by $a^{-1}$: $b = 0$. So $a$ doesn't satisfy the zero-divisor condition. $\blacksquare$

> **Corollary 19.11.** In a field, there are no zero divisors.

This motivates the next chapter, [[21-integral-domains]].

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

Note: $2 \cdot 2 = 0$, so 2 is a zero divisor. Units: $\{1, 3\}$. $\mathbb{Z}_4$ is a commutative ring with unity but not a field.

## 19.8 Characteristic (Preview)

> **Definition 19.12.** The **characteristic** of a ring $R$ with unity, denoted $\operatorname{char}(R)$, is the smallest positive integer $n$ with $n \cdot 1 = 0$ (i.e., $1 + 1 + \cdots + 1 = 0$). If no such $n$ exists, $\operatorname{char}(R) = 0$.

**Examples.**
- $\operatorname{char}(\mathbb{Z}) = 0$, $\operatorname{char}(\mathbb{Q}) = \operatorname{char}(\mathbb{R}) = \operatorname{char}(\mathbb{C}) = 0$.
- $\operatorname{char}(\mathbb{Z}_n) = n$.
- $\operatorname{char}(\mathbb{Z}_p) = p$ for $p$ prime.

> **Theorem 19.13.** The characteristic of an integral domain is either 0 or a prime. (Proof in [[21-integral-domains]].)

## 19.9 Direct Products of Rings

> **Definition 19.14.** The **direct product** $R \times S$ of rings $R, S$ has underlying set $R \times S$ with componentwise operations:
> $$(r_1, s_1) + (r_2, s_2) = (r_1 + r_2, s_1 + s_2),\quad (r_1, s_1)(r_2, s_2) = (r_1 r_2, s_1 s_2).$$

If $R, S$ have unity, so does $R \times S$ (with $(1_R, 1_S)$).

**Example 26.** $\mathbb{Z} \times \mathbb{Z}$ is a commutative ring with unity. It has zero divisors: $(1, 0)(0, 1) = (0, 0)$.

**Example 27 (CRT).** For $\gcd(m, n) = 1$: $\mathbb{Z}_{mn} \cong \mathbb{Z}_m \times \mathbb{Z}_n$ as **rings** (not just as groups). This is the ring-theoretic Chinese Remainder Theorem.

## 19.10 Practice Problems

**Problem 1.** Show $2\mathbb{Z}$ is a ring without unity. Describe its zero divisors.

**Problem 2.** List all units of $\mathbb{Z}_{12}$.

**Problem 3.** Show that the set of diagonal $n \times n$ matrices is a subring of $M_n(\mathbb{R})$. Is it commutative?

**Problem 4.** Prove: in any ring $R$, $(a + b)^2 = a^2 + ab + ba + b^2$.

**Problem 5.** Find all zero divisors of $\mathbb{Z}_{12}$.

**Problem 6.** Show that $\mathbb{Z}[\sqrt{2}] = \{a + b\sqrt{2} : a, b \in \mathbb{Z}\}$ is a subring of $\mathbb{R}$.

**Problem 7.** Show that if $R$ is a finite ring with unity and no zero divisors, then $R$ is a division ring (equivalently, field if commutative).

### Solutions

**1.** $2\mathbb{Z}$: closed under $+$ and $\cdot$. $0 = 2 \cdot 0 \in 2\mathbb{Z}$. Additive inverses: $-(2k) = 2(-k)$. No unity: $1 \notin 2\mathbb{Z}$.

Zero divisors: need $2a, 2b$ with $(2a)(2b) = 0$, but product of nonzero integers is nonzero. So **no zero divisors**. $\boxed{\text{Commutative, no unity, no zero divisors}}$

**2.** Units of $\mathbb{Z}_{12}$: $\{k : \gcd(k, 12) = 1\} = \{1, 5, 7, 11\}$. $\boxed{\{1, 5, 7, 11\}}$

**3.** Diagonal matrices: closed under sum (sum of diagonals is diagonal) and product (diagonal times diagonal is diagonal with products of diagonal entries). Contains 0. So subring. Commutative because diagonal matrices commute pairwise: $\operatorname{diag}(a_1, \ldots, a_n) \operatorname{diag}(b_1, \ldots, b_n) = \operatorname{diag}(a_1 b_1, \ldots, a_n b_n)$. $\boxed{\text{Commutative subring}}$

**4.** $(a + b)^2 = (a + b)(a + b) = a(a + b) + b(a + b) = a^2 + ab + ba + b^2$ by distributivity. $\blacksquare$

**5.** $12 = 4 \cdot 3 = 6 \cdot 2$. Products giving 0 mod 12: $4 \cdot 3$, $2 \cdot 6$, $4 \cdot 6$, $8 \cdot 3$ (since $8 \cdot 3 = 24 \equiv 0$), $8 \cdot 6 = 48 \equiv 0$, $10 \cdot 6 = 60 \equiv 0$, $9 \cdot 4 = 36 \equiv 0$, etc. Zero divisors are the non-units among nonzero: $\{2, 3, 4, 6, 8, 9, 10\}$. Verify: these have $\gcd > 1$ with 12, not units. $\boxed{\{2, 3, 4, 6, 8, 9, 10\}}$

**6.** Closure: $(a + b\sqrt{2}) + (c + d\sqrt{2}) = (a+c) + (b+d)\sqrt{2} \in \mathbb{Z}[\sqrt{2}]$. Product: $(a + b\sqrt{2})(c + d\sqrt{2}) = (ac + 2bd) + (ad + bc)\sqrt{2} \in \mathbb{Z}[\sqrt{2}]$. Contains 0, 1. Subtraction similar. Hence subring. $\blacksquare$

**7.** Let $R$ be finite with unity and no zero divisors. For $a \neq 0$: consider map $L_a: R \to R$, $L_a(x) = ax$. If $L_a(x) = L_a(y)$, then $a(x - y) = 0$, and no zero divisors forces $x = y$. So $L_a$ injective. Since $R$ finite, $L_a$ bijective, hence surjective. So $ax = 1$ for some $x$. Similarly there's $y$ with $ya = 1$. Then $y = y \cdot 1 = y \cdot ax = (ya)x = x$, so $x = y$ is the inverse of $a$. $\blacksquare$

(This proves: every finite integral domain is a field.)

## Related Concepts

- [[01-operations-and-algebraic-structures]] — semigroup/group/ring hierarchy
- [[18-isomorphism-theorems]] — analog theorems for rings hold as well
- [[21-integral-domains]] — zero-divisor-free rings in depth
- [[22-ideals-and-quotient-rings]] — the ring analogue of normal subgroups
- [[23-ring-homomorphisms]] — structure-preserving maps

---

*Last updated: 2026-04-18*
