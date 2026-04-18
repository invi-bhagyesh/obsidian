---
title: "Polynomial Rings"
type: guide
co: CO4
related: [19-rings-definition-and-examples, 21-integral-domains, 22-ideals-and-quotient-rings, 26-fields-and-irreducibility]
---

# 24. Polynomial Rings

**Polynomial rings** $R[x]$ are the fundamental construction that extends a base ring with a new indeterminate, producing a new ring with rich structure. When the base is a field $\mathbb{F}$, the resulting $\mathbb{F}[x]$ is **Euclidean** — equipped with a division algorithm — which makes it a principal ideal domain (PID) and a unique factorization domain (UFD). This chapter develops $R[x]$, proves the division algorithm for $\mathbb{F}[x]$, establishes the root-factor correspondence, and counts roots.

## 24.1 Definition and Basic Structure

> **Definition 24.1.** Let $R$ be a ring. The **polynomial ring in one variable** over $R$ is
> $$R[x] = \left\{ a_0 + a_1 x + a_2 x^2 + \cdots + a_n x^n : n \ge 0,\ a_i \in R \right\},$$
> where two polynomials are equal iff their coefficients match, and operations are:
> $$\left(\sum a_i x^i\right) + \left(\sum b_i x^i\right) = \sum (a_i + b_i) x^i$$
> $$\left(\sum a_i x^i\right) \cdot \left(\sum b_j x^j\right) = \sum_k \left( \sum_{i + j = k} a_i b_j \right) x^k.$$

> **Definition 24.2.** The **degree** of $p(x) = a_0 + a_1 x + \cdots + a_n x^n$ with $a_n \neq 0$ is $\deg p = n$. Convention: $\deg 0 = -\infty$. The **leading coefficient** is $a_n$. A polynomial is **monic** if its leading coefficient is 1.

### Basic properties

> **Proposition 24.3.** For $p, q \in R[x]$:
> 1. $\deg(p + q) \le \max(\deg p, \deg q)$.
> 2. $\deg(pq) \le \deg p + \deg q$, with equality if $R$ is an integral domain.

*Proof of (2).* Leading coefficient of $pq$ = product of leading coefficients $a_n b_m$. If $R$ has no zero divisors, this is nonzero, so $\deg(pq) = n + m$. Otherwise could cancel. $\blacksquare$

## 24.2 Integral Domain Property

> **Theorem 24.4.** If $R$ is an integral domain, so is $R[x]$.

*Proof.* Suppose $p(x) q(x) = 0$ in $R[x]$ with $p, q \neq 0$. Leading coefficient of $pq$ = (leading of $p$)(leading of $q$) $\neq 0$ by integral domain. So $pq \neq 0$. Contradiction. $\blacksquare$

### Units in $R[x]$

> **Theorem 24.5.** If $R$ is an integral domain, $R[x]^\times = R^\times$ (the units are the constant polynomials that are units in $R$).

*Proof.* If $p(x)q(x) = 1$, then $\deg p + \deg q = 0$, so $\deg p = \deg q = 0$. Hence $p, q$ are constants in $R$, and they multiply to 1 in $R$, so both are units in $R$. $\blacksquare$

**Example 1.** $\mathbb{Z}[x]^\times = \{\pm 1\}$. $\mathbb{Q}[x]^\times = \mathbb{Q}^\times$.

**Warning.** In rings with zero divisors, $R[x]$ may have more units. E.g., in $\mathbb{Z}_4[x]$: $(1 + 2x)(1 + 2x) = 1 + 4x + 4x^2 = 1$. So $1 + 2x$ is a unit.

## 24.3 Division Algorithm

> **Theorem 24.6 (Division Algorithm for $\mathbb{F}[x]$).** Let $\mathbb{F}$ be a field. For any $f(x), g(x) \in \mathbb{F}[x]$ with $g(x) \neq 0$, there exist unique $q(x), r(x) \in \mathbb{F}[x]$ such that
> $$f(x) = q(x) g(x) + r(x), \qquad r(x) = 0 \text{ or } \deg r < \deg g.$$

*Proof.*

**Existence.** Induction on $\deg f$. If $\deg f < \deg g$, take $q = 0, r = f$.

Otherwise, let $\deg f = n, \deg g = m$, with leading coefficients $a_n, b_m$. Set
$$f_1(x) = f(x) - \frac{a_n}{b_m} x^{n - m} g(x).$$
$\deg f_1 < n$ (the leading terms cancel). By induction, $f_1 = q_1 g + r$ with $r = 0$ or $\deg r < m$. Then
$$f = \frac{a_n}{b_m} x^{n-m} g + f_1 = \left(\frac{a_n}{b_m} x^{n-m} + q_1\right) g + r.$$

**Uniqueness.** Suppose $f = q g + r = q' g + r'$ with both remainders of degree $< m$. Then $(q - q') g = r' - r$. LHS has degree $\ge m$ (if nonzero) since $g \neq 0$, but RHS has degree $< m$. So both are 0: $q = q', r = r'$. $\blacksquare$

**Crucial requirement.** The algorithm uses division by $b_m$, which needs $b_m$ to be a unit. Hence $\mathbb{F}$ must be a **field** for this to work over arbitrary leading coefficients. In $\mathbb{Z}[x]$, the algorithm only works if we divide by monic $g$.

### Euclidean Algorithm

The division algorithm gives $\gcd$ in $\mathbb{F}[x]$:
- Apply division: $f = q g + r$
- If $r = 0$: $\gcd(f, g) = g$
- Else: $\gcd(f, g) = \gcd(g, r)$

Terminates because degrees strictly decrease.

## 24.4 $\mathbb{F}[x]$ is a PID

> **Theorem 24.7.** If $\mathbb{F}$ is a field, then $\mathbb{F}[x]$ is a principal ideal domain (PID).

*Proof.* Let $I \subseteq \mathbb{F}[x]$ be an ideal. If $I = \{0\}$, $I = \langle 0 \rangle$.

Else, let $g(x) \in I$ be a polynomial of minimal degree (exists by well-ordering on $\mathbb{Z}_{\ge 0}$). We claim $I = \langle g \rangle$.

$\langle g \rangle \subseteq I$: by absorption.

$I \subseteq \langle g \rangle$: for $f \in I$, divide: $f = q g + r$ with $r = 0$ or $\deg r < \deg g$. Then $r = f - qg \in I$ (both in $I$). By minimality of $\deg g$, $r = 0$. So $f = qg \in \langle g \rangle$. $\blacksquare$

## 24.5 Roots and Factor Theorem

> **Theorem 24.8 (Factor Theorem).** Let $\mathbb{F}$ be a field, $p(x) \in \mathbb{F}[x]$, $a \in \mathbb{F}$. Then $(x - a) \mid p(x)$ iff $p(a) = 0$.

*Proof.* Division algorithm: $p(x) = (x - a) q(x) + r$, with $\deg r < 1$ or $r = 0$, i.e., $r \in \mathbb{F}$. Evaluate at $a$: $p(a) = 0 \cdot q(a) + r = r$. So $r = p(a)$.

Hence $(x - a) \mid p(x)$ iff $r = 0$ iff $p(a) = 0$. $\blacksquare$

### Number of roots

> **Corollary 24.9.** Over an integral domain $D$, a polynomial of degree $n$ has at most $n$ roots.

*Proof.* Induction. Degree 0: constant $p(x) = c$. If $c = 0$, every element is a root; otherwise no roots. But a nonzero constant has 0 roots ≤ 0. ✓

Degree $n \ge 1$: if $p$ has a root $a$, write $p(x) = (x - a) q(x)$. Then $\deg q = n - 1$, and $b$ is a root of $p$ iff $b = a$ or $b$ is a root of $q$ (using $D$ has no zero divisors: $p(b) = (b - a) q(b) = 0$ implies one factor is 0). By induction, $q$ has at most $n - 1$ roots, so $p$ has at most $n$ roots. $\blacksquare$

**Failure over non-integral domains.** In $\mathbb{Z}_8$: $p(x) = x^2 - 1$ has roots $\pm 1, \pm 3$ (since $3^2 = 9 \equiv 1$). 4 roots for a degree-2 polynomial!

## 24.6 Evaluation and the Substitution Principle

For any $a \in R$ commutative, $\operatorname{ev}_a: R[x] \to R$, $p(x) \mapsto p(a)$, is a ring homomorphism (Example 4 of [[23-ring-homomorphisms]]).

Kernel: $\langle x - a \rangle$ (all polynomials divisible by $x - a$).

First Iso: $R[x]/\langle x - a \rangle \cong R$.

## 24.7 Polynomial Rings in Several Variables

> **Definition 24.10.** $R[x_1, x_2, \ldots, x_n]$ is the iterated construction: $(R[x_1, \ldots, x_{n-1}])[x_n]$. Elements are polynomials in $n$ commuting variables.

**Example 2.** $\mathbb{R}[x, y]$ contains $p(x, y) = x^2 + 3xy - y^2$.

If $R$ is an integral domain, so is $R[x_1, \ldots, x_n]$. If $\mathbb{F}$ is a field, $\mathbb{F}[x_1, \ldots, x_n]$ is a UFD but **not** a PID for $n \ge 2$.

**Example 3.** In $\mathbb{F}[x, y]$, the ideal $\langle x, y \rangle$ is not principal: any single generator $f$ would have to divide both $x$ and $y$, so $f$ has degree 0. But units in $\mathbb{F}[x, y]$ are $\mathbb{F}^\times$, constants — so $\langle f \rangle = \mathbb{F}[x, y]$, but $\langle x, y \rangle \ne \mathbb{F}[x, y]$ (e.g., 1 is not in it). Contradiction.

## 24.8 Monic Polynomials and Leading-Coefficient Arithmetic

Monic polynomials have nice closure properties:
- Product of monic polynomials is monic.
- Division algorithm with monic divisor has coefficients in the same ring (no need for $R$ to be a field).

**Example 4.** In $\mathbb{Z}[x]$: dividing $x^3 + 2x^2 + x + 1$ by $x - 2$ (monic):
$$x^3 + 2x^2 + x + 1 = (x - 2)(x^2 + 4x + 9) + 19.$$
Coefficients in $\mathbb{Z}$ throughout. Remainder 19 at $x = 2$: $8 + 8 + 2 + 1 = 19$ ✓.

## 24.9 Derivatives (Formal)

> **Definition 24.11.** For $p(x) = \sum a_i x^i$, the **formal derivative** is $p'(x) = \sum i a_i x^{i-1}$.

Standard rules hold: $(p + q)' = p' + q'$, $(pq)' = p'q + pq'$.

> **Theorem 24.12.** Over a field $\mathbb{F}$, a polynomial $p(x) \in \mathbb{F}[x]$ has a multiple root $\iff \gcd(p, p') \neq 1$.

Useful for testing whether a polynomial is separable (no repeated roots over the algebraic closure).

## 24.10 Irreducibility — Preview

A polynomial $p(x) \in \mathbb{F}[x]$ is **irreducible** if $\deg p \ge 1$ and $p$ cannot be written as a product of two polynomials of strictly smaller positive degree.

- Over $\mathbb{C}$: only linear polynomials are irreducible (Fundamental Theorem of Algebra).
- Over $\mathbb{R}$: linear and irreducible quadratics ($ax^2 + bx + c$ with negative discriminant).
- Over $\mathbb{Q}$: much richer, treated in [[26-fields-and-irreducibility]].

## 24.11 Practice Problems

**Problem 1.** Compute the quotient and remainder of $x^4 - 2x^2 + 1$ divided by $x^2 + 1$ in $\mathbb{Q}[x]$.

**Problem 2.** Show that $x^2 + 1$ is irreducible in $\mathbb{R}[x]$ but reducible in $\mathbb{C}[x]$.

**Problem 3.** Find all roots of $x^2 - 1$ in $\mathbb{Z}_8$.

**Problem 4.** Compute $\gcd(x^4 - 1, x^2 + x)$ in $\mathbb{Q}[x]$.

**Problem 5.** Show that $\mathbb{Z}[x]$ is not a PID by exhibiting a non-principal ideal.

**Problem 6.** Let $p \in \mathbb{F}[x]$ with $\deg p = 3$. Show $p$ is reducible iff $p$ has a root in $\mathbb{F}$.

**Problem 7.** Show that $x^3 - 2$ is irreducible in $\mathbb{Q}[x]$.

### Solutions

**1.** $x^4 - 2x^2 + 1 = (x^2 + 1)(x^2 - 3) + 4$. Wait, $(x^2 + 1)(x^2 - 3) = x^4 - 3x^2 + x^2 - 3 = x^4 - 2x^2 - 3$. So $x^4 - 2x^2 + 1 = (x^2 + 1)(x^2 - 3) + 4$. Check: RHS = $x^4 - 2x^2 - 3 + 4 = x^4 - 2x^2 + 1$ ✓. $\boxed{q = x^2 - 3, r = 4}$

**2.** Over $\mathbb{R}$: if $x^2 + 1 = (x - a)(x - b)$ with $a, b \in \mathbb{R}$, then $a + b = 0, ab = 1$. So $b = -a, a \cdot (-a) = -a^2 = 1$, no real solution. Irreducible.

Over $\mathbb{C}$: $x^2 + 1 = (x - i)(x + i)$. Reducible. $\blacksquare$

**3.** $x^2 \equiv 1 \pmod 8$: check $0, 1, \ldots, 7$. $1^2 = 1$, $3^2 = 9 \equiv 1$, $5^2 = 25 \equiv 1$, $7^2 = 49 \equiv 1$. So roots: $\{1, 3, 5, 7\}$. $\boxed{4\text{ roots}}$

**4.** Euclidean algorithm: $x^4 - 1 = (x^2 + x)(x^2 - x + 1) + (-x - 1)$. Check: $(x^2 + x)(x^2 - x + 1) = x^4 - x^3 + x^2 + x^3 - x^2 + x = x^4 + x$. So $x^4 - 1 - (x^4 + x) = -x - 1$. ✓

Next: $\gcd(x^2 + x, -x - 1) = \gcd(x^2 + x, x + 1)$ (up to units).
$x^2 + x = x(x + 1) + 0$. So $\gcd = x + 1$. $\boxed{x + 1}$

**5.** $\langle 2, x \rangle \subseteq \mathbb{Z}[x]$. Suppose principal: $\langle 2, x \rangle = \langle f \rangle$ for some $f$. Then $f \mid 2$ and $f \mid x$. $f \mid 2$ in $\mathbb{Z}[x]$: $f$ constant in $\{\pm 1, \pm 2\}$. $f \mid x$: $f$ must be of form $cx^a$ with $a \le 1$, so $f \in \{\pm 1\}$. But $\pm 1 \in \mathbb{Z}[x]^\times$, so $\langle \pm 1 \rangle = \mathbb{Z}[x]$. However $1 \notin \langle 2, x \rangle$ (elements have even constant term). Contradiction. $\blacksquare$

**6.** If $p$ reducible, $p = gh$ with $0 < \deg g, \deg h < 3$. Sum of degrees is 3, so one of $g, h$ has degree 1. Degree-1 factor contributes a root of $p$ in $\mathbb{F}$. Conversely, a root $a$ gives factor $x - a$, so reducible. $\blacksquare$

**7.** By Problem 6 (adapted), $x^3 - 2$ is irreducible over $\mathbb{Q}$ iff no rational root. Rational root theorem: any rational root $r/s$ (lowest terms) has $r \mid 2$ and $s \mid 1$, so $r/s \in \{\pm 1, \pm 2\}$. Check: $1^3 - 2 = -1 \neq 0$; $2^3 - 2 = 6 \neq 0$; $(-1)^3 - 2 = -3 \neq 0$; $(-2)^3 - 2 = -10 \neq 0$. No rational root, so irreducible. $\blacksquare$

## Related Concepts

- [[19-rings-definition-and-examples]] — $R[x]$ is a fundamental example of a ring
- [[21-integral-domains]] — $D[x]$ is an integral domain when $D$ is
- [[22-ideals-and-quotient-rings]] — principal ideals in $\mathbb{F}[x]$ correspond to polynomials
- [[23-ring-homomorphisms]] — evaluation homomorphisms
- [[26-fields-and-irreducibility]] — full treatment of irreducibility

---

*Last updated: 2026-04-18*
