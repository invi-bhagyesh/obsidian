---
title: "Fields and Irreducibility"
type: guide
co: CO5
related: [24-polynomial-rings, 22-ideals-and-quotient-rings, 27-finite-fields-and-extensions]
---

# 26. Fields and Irreducibility

This chapter develops the central **irreducibility tests** for polynomials in $\mathbb{Z}[x]$ and $\mathbb{Q}[x]$: the **rational root theorem**, **Gauss's lemma**, **Eisenstein's criterion**, and **reduction mod $p$**. Irreducibility is the ring-theoretic version of primality, and it is the key property that allows us to construct **field extensions** — the subject of [[27-finite-fields-and-extensions]]. We also revisit the field structure of $\mathbb{F}[x]/\langle p(x) \rangle$ when $p$ is irreducible.

## 26.1 Irreducibility Definitions

> **Definition 26.1 (Irreducibility in a ring).** Let $R$ be an integral domain. An element $p \in R$ is **irreducible** if $p$ is nonzero, non-unit, and whenever $p = ab$, either $a$ or $b$ is a unit.

For polynomials, this specializes:

> **Definition 26.2.** A polynomial $p(x) \in \mathbb{F}[x]$ over a field $\mathbb{F}$ is **irreducible** if $\deg p \ge 1$ and $p$ cannot be factored as $p = gh$ with $\deg g, \deg h \ge 1$.

Over $\mathbb{Z}[x]$, irreducibility is trickier — we require $p$ to be non-unit, non-constant, and not factorable as a product of two polynomials of positive degree.

## 26.2 Rational Root Theorem

> **Theorem 26.3 (Rational Root Theorem).** Let $p(x) = a_n x^n + \cdots + a_1 x + a_0 \in \mathbb{Z}[x]$ with $a_n, a_0 \neq 0$. If $p(r/s) = 0$ with $r/s$ in lowest terms (so $\gcd(r, s) = 1$), then $r \mid a_0$ and $s \mid a_n$.

*Proof.* Substitute and clear denominators:
$$a_n (r/s)^n + \cdots + a_1 (r/s) + a_0 = 0$$
$$a_n r^n + a_{n-1} r^{n-1} s + \cdots + a_1 r s^{n-1} + a_0 s^n = 0.$$

Rearrange: $a_0 s^n = -r(a_n r^{n-1} + \cdots + a_1 s^{n-1})$, so $r \mid a_0 s^n$. Since $\gcd(r, s) = 1$, $r \mid a_0$.

Similarly, $a_n r^n = -s(\cdots)$, so $s \mid a_n r^n$, and $\gcd(r, s) = 1$ gives $s \mid a_n$. $\blacksquare$

### Application

**Example 1.** Find rational roots of $p(x) = 2x^3 - 5x^2 + 4x - 3$.

*Solution.* Rational roots $r/s$ with $r \mid 3$, $s \mid 2$: $r/s \in \{\pm 1, \pm 3, \pm 1/2, \pm 3/2\}$.

Test:
- $p(1) = 2 - 5 + 4 - 3 = -2$. No.
- $p(3/2) = 2 \cdot 27/8 - 5 \cdot 9/4 + 4 \cdot 3/2 - 3 = 27/4 - 45/4 + 6 - 3 = -18/4 + 3 = -9/2 + 3 = -3/2$. No.
- $p(3) = 54 - 45 + 12 - 3 = 18$. No.
- $p(1/2) = 1/4 - 5/4 + 2 - 3 = -1 - 1 = -2$. No.
- (Skip rest — likely no rational roots.)

Conclusion: **no rational roots**. So $p$ has no linear factor over $\mathbb{Q}$.

### Irreducibility implication

> **Corollary 26.4.** A cubic polynomial in $\mathbb{Q}[x]$ is reducible iff it has a rational root.

*Proof.* Reducible cubic $p = gh$ with $\deg g + \deg h = 3$, so one of them is linear. Linear factor gives rational root. Conversely, rational root gives factor. $\blacksquare$

Extends to: **cubic/quartic polynomial in $\mathbb{Q}[x]$ is irreducible iff it has no rational roots (and for quartic, also has no quadratic factor).**

## 26.3 Gauss's Lemma
	
> **Definition 26.5 (Primitive polynomial).** A polynomial $p(x) \in \mathbb{Z}[x]$ is **primitive** if the gcd of its coefficients is 1.

Equivalently, $p$ is not divisible by any prime in $\mathbb{Z}$.

> **Theorem 26.6 (Gauss's Lemma).** The product of two primitive polynomials in $\mathbb{Z}[x]$ is primitive.

*Proof.* Let $p, q \in \mathbb{Z}[x]$ be primitive. Suppose $pq$ is not primitive, so some prime $\ell$ divides all coefficients of $pq$.

Reduce mod $\ell$: $\bar{pq} = 0$ in $\mathbb{F}_\ell[x]$. But $\mathbb{F}_\ell[x]$ is an integral domain, so $\bar{p} = 0$ or $\bar{q} = 0$. This means $\ell$ divides all coefficients of $p$ or all coefficients of $q$, contradicting primitivity. $\blacksquare$

> **Corollary 26.7 (Gauss).** A polynomial $p(x) \in \mathbb{Z}[x]$ is irreducible over $\mathbb{Z}$ iff it is irreducible over $\mathbb{Q}$ and primitive.

*Sketch.* ($\Leftarrow$) Suppose primitive and irreducible over $\mathbb{Q}$. Factorization over $\mathbb{Z}$ gives factorization over $\mathbb{Q}$, forcing one factor to be a unit in $\mathbb{Q}$, i.e., a rational constant. By primitivity, it's $\pm 1$ — a unit in $\mathbb{Z}$.

($\Rightarrow$) If reducible over $\mathbb{Q}$, we can scale to get a factorization in $\mathbb{Z}[x]$ (using Gauss's lemma). $\blacksquare$

**Consequence.** To check irreducibility in $\mathbb{Q}[x]$, it suffices to check irreducibility in $\mathbb{Z}[x]$.

## 26.4 Eisenstein's Criterion

> **Theorem 26.8 (Eisenstein).** Let $p(x) = a_n x^n + \cdots + a_1 x + a_0 \in \mathbb{Z}[x]$. Suppose there exists a prime $\ell$ such that:
> 1. $\ell \nmid a_n$
> 2. $\ell \mid a_i$ for all $0 \le i < n$
> 3. $\ell^2 \nmid a_0$
>
> Then $p(x)$ is **irreducible** over $\mathbb{Q}$.

*Proof.* Suppose $p = fg$ in $\mathbb{Z}[x]$ with $\deg f, \deg g \ge 1$. Write $f = b_m x^m + \cdots + b_0$, $g = c_k x^k + \cdots + c_0$ with $m + k = n$.

Reduce mod $\ell$: $\bar{p} = \bar{a}_n x^n$ (by conditions 1, 2). So $\bar{f}\bar{g} = \bar{a}_n x^n$ in $\mathbb{F}_\ell[x]$.

Since $\mathbb{F}_\ell[x]$ is a UFD, $\bar{f} = c_1 x^m$ and $\bar{g} = c_2 x^k$ for some constants. In particular, $\bar{b_0} = \bar{c_0} = 0$, so $\ell \mid b_0$ and $\ell \mid c_0$. Hence $\ell^2 \mid b_0 c_0 = a_0$, contradicting condition 3. $\blacksquare$

### Examples

**Example 2.** $x^n - p$ is irreducible over $\mathbb{Q}$ for any prime $p$ (apply Eisenstein with prime $p$).

**Example 3.** $x^3 - 2$ is irreducible over $\mathbb{Q}$ (Eisenstein with $\ell = 2$). Hence $\sqrt[3]{2}$ is not a root of any quadratic with rational coefficients.

**Example 4.** $x^5 - 6x^3 + 12x - 6$: Eisenstein with $\ell = 2$? Coefficients: $1, 0, -6, 0, 12, -6$. $\ell = 2$: $2 \mid 0, -6, 0, 12, -6$ (all lower coefficients) ✓; $2 \nmid 1$ (leading) ✓; $4 \nmid -6$ ✓. Irreducible.

Try $\ell = 3$: $3 \mid 0, -6, 0, 12, -6$ ✓; $3 \nmid 1$ ✓; $9 \nmid 6$ ✓. Also irreducible.

### Substitution trick (Eisenstein with shift)

Some polynomials don't satisfy Eisenstein directly but do after a substitution $x \to x + c$.

**Example 5 ($p$-th cyclotomic polynomial).** Let $p$ be prime. Consider
$$\Phi_p(x) = \frac{x^p - 1}{x - 1} = x^{p-1} + x^{p-2} + \cdots + x + 1.$$
Claim: $\Phi_p(x)$ is irreducible over $\mathbb{Q}$.

Substitute $x = y + 1$:
$$\Phi_p(y + 1) = \frac{(y+1)^p - 1}{y} = \sum_{k=1}^p \binom{p}{k} y^{k-1} = y^{p-1} + \binom{p}{p-1} y^{p-2} + \cdots + \binom{p}{1}.$$

Coefficients: leading 1; the rest are $\binom{p}{k}$ for $1 \le k \le p - 1$, all divisible by $p$; constant term is $\binom{p}{1} = p$, not divisible by $p^2$.

Eisenstein with $\ell = p$ gives $\Phi_p(y + 1)$ irreducible in $\mathbb{Q}[y]$, hence $\Phi_p(x)$ irreducible in $\mathbb{Q}[x]$. $\blacksquare$

## 26.5 Reduction Modulo $p$

> **Theorem 26.9 (Reduction mod $p$).** Let $p(x) \in \mathbb{Z}[x]$ be a **monic** polynomial (leading coefficient 1). If $\bar{p}(x) \in \mathbb{F}_\ell[x]$ is irreducible for some prime $\ell$, then $p(x)$ is irreducible in $\mathbb{Q}[x]$.

*Proof.* Suppose $p = fg$ over $\mathbb{Q}[x]$ with $\deg f, \deg g \ge 1$. By Gauss's lemma, scale to $p = f'g'$ over $\mathbb{Z}[x]$ with $f', g'$ of same degrees. Monic + primitivity considerations: $f', g'$ can be taken monic (leading coefficients multiply to 1). Reduce mod $\ell$: $\bar{p} = \bar{f'}\bar{g'}$ with $\deg \bar{f'} = \deg f \ge 1$ and $\deg \bar{g'} = \deg g \ge 1$. Contradicts irreducibility of $\bar{p}$. $\blacksquare$

**Warning.** The converse fails: $p$ can be irreducible in $\mathbb{Q}[x]$ while $\bar{p}$ is reducible in $\mathbb{F}_\ell[x]$ for every prime $\ell$. Example: $x^4 + 1$ is irreducible over $\mathbb{Q}$ but reducible over every $\mathbb{F}_\ell$.

### Using reduction mod $p$

**Example 6.** Show $x^4 + x^3 + x^2 + x + 1$ is irreducible in $\mathbb{Q}[x]$.

*Solution.* This is $\Phi_5(x)$, already proven by Eisenstein trick. Alternative: reduce mod 2. $x^4 + x^3 + x^2 + x + 1$ in $\mathbb{F}_2[x]$: check reducibility. Test for roots: $x = 0$ gives 1; $x = 1$ gives $1 + 1 + 1 + 1 + 1 = 1$. No linear factors.

Check for irreducible quadratic factor. Irreducible quadratics over $\mathbb{F}_2$: $x^2 + x + 1$ is the only one. Does it divide our polynomial?

Divide $x^4 + x^3 + x^2 + x + 1$ by $x^2 + x + 1$:
$x^4 / x^2 = x^2$. $(x^2 + x + 1) x^2 = x^4 + x^3 + x^2$. Subtract: $x + 1$. Not zero. So $x^2 + x + 1$ does not divide.

Hence $x^4 + x^3 + x^2 + x + 1$ has no quadratic factor and no linear factor, so irreducible over $\mathbb{F}_2$. By reduction, irreducible over $\mathbb{Q}$. $\blacksquare$

## 26.6 Quotient Ring as a Field

> **Theorem 26.10.** Let $\mathbb{F}$ be a field and $p(x) \in \mathbb{F}[x]$ a non-constant polynomial. Then $\mathbb{F}[x]/\langle p(x) \rangle$ is a field iff $p(x)$ is irreducible over $\mathbb{F}$.

*Proof.* $\mathbb{F}[x]$ is a PID. An ideal $\langle p \rangle$ is maximal iff $p$ is irreducible (standard fact in PIDs: irreducible = prime, and prime ideals in PIDs are maximal for nonzero $p$).

Then $\mathbb{F}[x]/\langle p \rangle$ is a field iff $\langle p \rangle$ is maximal iff $p$ is irreducible. $\blacksquare$

### Example

**Example 7.** $\mathbb{Q}[x]/\langle x^2 - 2 \rangle \cong \mathbb{Q}(\sqrt 2)$ is a field because $x^2 - 2$ is irreducible over $\mathbb{Q}$.

**Example 8.** $\mathbb{F}_2[x]/\langle x^2 + x + 1 \rangle = \mathbb{F}_4$ is a field of 4 elements.

**Example 9.** $\mathbb{F}_3[x]/\langle x^2 + 1 \rangle = \mathbb{F}_9$ (9 elements) — since $x^2 + 1$ has no roots in $\mathbb{F}_3$ (check: $0 + 1 = 1, 1 + 1 = 2, 4 + 1 = 5 \equiv 2$), hence irreducible.

## 26.7 Irreducibility over $\mathbb{R}$ and $\mathbb{C}$

> **Theorem 26.11 (Fundamental Theorem of Algebra).** Every non-constant polynomial in $\mathbb{C}[x]$ has a root in $\mathbb{C}$. Hence $\mathbb{C}$ is **algebraically closed**, and irreducible polynomials in $\mathbb{C}[x]$ are exactly linear polynomials.

> **Corollary 26.12.** Over $\mathbb{R}[x]$, irreducible polynomials are either linear or quadratic with negative discriminant. Every polynomial in $\mathbb{R}[x]$ factors uniquely as a product of linear and irreducible quadratic factors.

*Proof.* Real roots give linear factors. Complex roots come in conjugate pairs $\alpha, \bar\alpha$, giving $(x - \alpha)(x - \bar\alpha) = x^2 - 2\operatorname{Re}(\alpha) x + |\alpha|^2 \in \mathbb{R}[x]$, quadratic with negative discriminant (iff $\alpha \notin \mathbb{R}$). $\blacksquare$

## 26.8 Summary Table of Irreducibility Tests

| Test | Where | Requirements | Conclusion |
|------|-------|-------------|------------|
| **Rational root** | $\mathbb{Q}[x]$ | Rational root candidates fail | No linear factor |
| **Gauss** | $\mathbb{Z}[x]$ | $p$ primitive | $\mathbb{Q}$-reducible ⟺ $\mathbb{Z}$-reducible |
| **Eisenstein** | $\mathbb{Z}[x]$ | Prime $\ell$ divides all lower, $\ell^2 \nmid a_0$, $\ell \nmid a_n$ | Irreducible over $\mathbb{Q}$ |
| **Reduction mod $p$** | $\mathbb{Z}[x]$ monic | $\bar p$ irreducible in $\mathbb{F}_p[x]$ | Irreducible over $\mathbb{Q}$ |
| **Factor Theorem** | $\mathbb{F}[x]$ | $p(a) = 0$ iff $(x - a) \mid p$ | Linear factor exists |
| **Degree $\le 3$** | $\mathbb{F}[x]$ | No root in $\mathbb{F}$ | Irreducible (for degree 2, 3) |

## 26.9 Practice Problems

**Problem 1.** Determine whether $x^3 - 3x + 1$ is irreducible over $\mathbb{Q}$.

**Problem 2.** Show that $x^4 + 1$ is irreducible over $\mathbb{Q}$. (Hint: substitute $x \to x + 1$.)

**Problem 3.** Show that $x^3 + x + 1$ is irreducible over $\mathbb{F}_2$, and hence $\mathbb{F}_2[x]/\langle x^3 + x + 1 \rangle$ is a field of order 8.

**Problem 4.** Is $x^4 + x + 1$ irreducible over $\mathbb{Q}$?

**Problem 5.** Show that $2x^5 - 6x + 6$ is irreducible over $\mathbb{Q}$.

**Problem 6.** Decompose $x^4 - 4$ into irreducibles over $\mathbb{Q}$, $\mathbb{R}$, $\mathbb{C}$.

**Problem 7.** Determine all irreducible polynomials of degree $\le 3$ over $\mathbb{F}_2$.

**Problem 8.** Show $\Phi_7(x) = x^6 + x^5 + x^4 + x^3 + x^2 + x + 1$ is irreducible over $\mathbb{Q}$.

### Solutions

**1.** Rational root candidates $\pm 1$. $p(1) = 1 - 3 + 1 = -1 \neq 0$; $p(-1) = -1 + 3 + 1 = 3 \neq 0$. No rational roots. Cubic, so **irreducible**. $\blacksquare$

**2.** $(x+1)^4 + 1 = x^4 + 4x^3 + 6x^2 + 4x + 1 + 1 = x^4 + 4x^3 + 6x^2 + 4x + 2$. Eisenstein with $\ell = 2$: $2 \nmid 1$ ✓; $2 \mid 4, 6, 4, 2$ ✓; $4 \nmid 2$ ✓. Irreducible. $\blacksquare$

**3.** Roots in $\mathbb{F}_2$: $p(0) = 1, p(1) = 1 + 1 + 1 = 1$. No roots. Cubic, so **irreducible**. Hence $\mathbb{F}_2[x]/\langle x^3 + x + 1 \rangle$ is a field of $2^3 = 8$ elements. $\boxed{\mathbb{F}_8}$

**4.** Reduce mod 2: $x^4 + x + 1$ in $\mathbb{F}_2[x]$. Roots: $0 \to 1, 1 \to 1$. No linear factors. Quadratic factor? Irreducible quadratic over $\mathbb{F}_2$: only $x^2 + x + 1$. Divide: $x^4 + x + 1 = (x^2 + x + 1)(x^2 + x + 1) + 0 $? Compute: $(x^2 + x + 1)^2 = x^4 + 2x^3 + 3x^2 + 2x + 1 = x^4 + x^2 + 1$ (mod 2). Not $x^4 + x + 1$. So no, quadratic doesn't divide. Hence $x^4 + x + 1$ is irreducible over $\mathbb{F}_2$, so **irreducible over $\mathbb{Q}$** by reduction mod 2. $\blacksquare$

**5.** Make primitive: $\gcd(2, 6, 6) = 2$, so $2x^5 - 6x + 6 = 2(x^5 - 3x + 3)$. The primitive part $x^5 - 3x + 3$: Eisenstein with $\ell = 3$? $3 \nmid 1$ ✓; $3 \mid -3, 3$ (lower coefs $-3x$ and constant 3); intermediate coefs (0) trivially divisible; $9 \nmid 3$ ✓. Irreducible. So $2x^5 - 6x + 6$ is $2$ times an irreducible, hence irreducible up to the unit 2 (in $\mathbb{Q}[x]$, 2 is a unit). **Irreducible over $\mathbb{Q}$.** $\blacksquare$

**6.** $x^4 - 4 = (x^2 - 2)(x^2 + 2)$. Over $\mathbb{Q}$: both factors irreducible (no rational roots for $x^2 - 2$; $x^2 + 2$ has no real roots, and hence no rational). So $x^4 - 4 = (x^2 - 2)(x^2 + 2)$ in $\mathbb{Q}[x]$.

Over $\mathbb{R}$: $x^2 - 2 = (x - \sqrt 2)(x + \sqrt 2)$. $x^2 + 2$ still irreducible. So $x^4 - 4 = (x - \sqrt 2)(x + \sqrt 2)(x^2 + 2)$.

Over $\mathbb{C}$: $x^2 + 2 = (x - i\sqrt 2)(x + i\sqrt 2)$. Fully factored: $(x - \sqrt 2)(x + \sqrt 2)(x - i\sqrt 2)(x + i\sqrt 2)$. $\boxed{}$

**7.** Degree 1: $x, x + 1$. (2 polynomials.)

Degree 2: $ax^2 + bx + c$ with $a = 1$. Irreducible iff no roots. Try all $c \in \{0, 1\}, b \in \{0, 1\}$: $x^2, x^2 + 1 = (x + 1)^2, x^2 + x = x(x+1), x^2 + x + 1$. Only $x^2 + x + 1$ has no roots. (1 polynomial.)

Degree 3: $x^3 + ax^2 + bx + c$. Must have no roots, so $c = 1$ (else $x = 0$ is root) and $1 + a + b + c \neq 0$, i.e., $a + b$ = even, i.e., $a = b$. Candidates: $x^3 + 1 (= (x+1)(x^2 + x + 1))$ — wait this reducible; let me check: $x^3 + 0 x^2 + 0 x + 1$, $1 + 0 + 0 + 1 = 0$ in $\mathbb{F}_2$, so $x = 1$ is a root. Reducible.

$a + b = 0 \pmod 2$ with $c = 1$: options $(a, b) \in \{(0, 0), (1, 1)\}$. (0,0): $x^3 + 1$ — reducible (as above). (1,1): $x^3 + x^2 + x + 1 = (x + 1)(x^2 + 1) = (x+1)(x+1)^2 = (x+1)^3$. Reducible.

Try $a + b = 1$: $p(1) = 1 + a + b + 1 = a + b \equiv 1 \neq 0$ ✓ (no root at 1). So options $(a, b) \in \{(0, 1), (1, 0)\}$: $x^3 + x + 1$ and $x^3 + x^2 + 1$. Check roots:
- $x^3 + x + 1$ at 0: 1; at 1: 1 + 1 + 1 = 1. No roots. Irreducible.
- $x^3 + x^2 + 1$ at 0: 1; at 1: 1 + 1 + 1 = 1. No roots. Irreducible.

So degree-3 irreducibles over $\mathbb{F}_2$: **$x^3 + x + 1, x^3 + x^2 + 1$**. (2 polynomials.)

Total irreducibles of degree $\le 3$: $2 + 1 + 2 = 5$. $\boxed{}$

**8.** Same as Example 5 for cyclotomic $\Phi_p$ with $p = 7$. Substitution $x = y + 1$ gives Eisenstein with $\ell = 7$. Irreducible. $\blacksquare$

## Related Concepts

- [[24-polynomial-rings]] — Division algorithm, factor theorem, PID structure
- [[22-ideals-and-quotient-rings]] — Maximal ideals and quotient fields
- [[27-finite-fields-and-extensions]] — Constructing finite fields via irreducible polynomials

---

*Last updated: 2026-04-18*
