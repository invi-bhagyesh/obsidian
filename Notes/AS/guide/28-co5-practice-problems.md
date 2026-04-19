---
title: CO5 Practice Problems — Irreducibility, Fields, Extensions, Finite Fields
topic: Algebraic Structures
course_outcome: CO5
chapter: 28
prev: "[[27-finite-fields-and-extensions]]"
next: "[[maths/Notes/AS/guide/00-index]]"
tags:
  - practice
  - irreducibility
  - fields
  - extensions
  - finite-fields
  - constructibility
---

# 28. CO5 Practice Problems

This chapter compiles a comprehensive set of practice problems covering **Course Outcome 5**: irreducibility criteria in polynomial rings, fields and field constructions via quotients, algebraic field extensions and the tower law, the classification and structure of finite fields $\mathbb{F}_{p^n}$, the Frobenius automorphism, and the classical impossibility results on geometric constructibility.

**Prerequisites covered:** [[26-fields-and-irreducibility]], [[27-finite-fields-and-extensions]].

The problems are organized into four parts:
- **Part A** — Irreducibility tests (rational root, Gauss's lemma, Eisenstein, reduction mod $p$)
- **Part B** — Fields from quotients: $F[x]/\langle p(x)\rangle$
- **Part C** — Field extensions, minimal polynomials, tower law
- **Part D** — Finite fields and geometric constructibility

---

## Part A: Irreducibility Tests

> **Problem A1.** Prove that $f(x) = x^3 - 3x - 1 \in \mathbb{Q}[x]$ is irreducible over $\mathbb{Q}$.

**Solution A1.**

*Setup.* $f$ is monic of degree $3$ with integer coefficients. We use the following fact:

**Lemma.** A polynomial of degree $2$ or $3$ over a field $F$ is irreducible iff it has no root in $F$.

*Proof of lemma.* If $f$ is reducible with $\deg f \in \{2, 3\}$, write $f = gh$ non-trivially. Then $\deg g + \deg h = 2$ or $3$, with $\deg g, \deg h \geq 1$. So one of them has degree $1$, say $g(x) = ax + b$ with $a \neq 0$, giving a root $x = -b/a \in F$. Conversely, if $f$ has a root, it has a linear factor, hence is reducible.

*Apply to $f$.* By the **Rational Root Theorem**, any rational root $r/s$ of $f$ (written in lowest terms) satisfies $r \mid (-1)$ and $s \mid 1$, so $r/s \in \{\pm 1\}$.

Check:
$$f(1) = 1 - 3 - 1 = -3 \neq 0.$$
$$f(-1) = -1 + 3 - 1 = 1 \neq 0.$$

No rational roots, and $f$ has degree $3$, so **$f$ is irreducible over $\mathbb{Q}$**. $\blacksquare$

---

> **Problem A2.** Is $g(x) = x^4 + 2x^3 - x - 2$ irreducible over $\mathbb{Q}$? If not, factor it.

**Solution A2.**

*Rational root candidates.* $a_0 = -2, a_n = 1$. So candidates are $r/s$ with $r \mid 2, s \mid 1$: $\{\pm 1, \pm 2\}$.

*Test each:*
- $g(1) = 1 + 2 - 1 - 2 = 0$. ✓
- $g(-1) = 1 - 2 + 1 - 2 = -2$. ✗
- $g(2) = 16 + 16 - 2 - 2 = 28$. ✗
- $g(-2) = 16 - 16 + 2 - 2 = 0$. ✓

Two rational roots: $x = 1$ and $x = -2$. So $(x - 1)(x + 2) = x^2 + x - 2$ divides $g$.

*Divide $g$ by $x^2 + x - 2$.*
- $x^4/x^2 = x^2$. $x^2 \cdot (x^2 + x - 2) = x^4 + x^3 - 2x^2$. Subtract: $(x^4 + 2x^3 + 0 x^2 - x - 2) - (x^4 + x^3 - 2x^2) = x^3 + 2x^2 - x - 2$.
- $x^3/x^2 = x$. $x \cdot (x^2 + x - 2) = x^3 + x^2 - 2x$. Subtract: $(x^3 + 2x^2 - x - 2) - (x^3 + x^2 - 2x) = x^2 + x - 2$.
- $x^2/x^2 = 1$. $1 \cdot (x^2 + x - 2) = x^2 + x - 2$. Subtract: $0$.

So $g(x) = (x^2 + x - 2)(x^2 + x + 1) = (x - 1)(x + 2)(x^2 + x + 1)$.

*Irreducibility of $x^2 + x + 1$ over $\mathbb{Q}$.* Discriminant: $1 - 4 = -3 < 0$. So no real roots, hence no rational roots. Being degree $2$ with no rational root, $x^2 + x + 1$ is irreducible over $\mathbb{Q}$.

**Final factorization:**
$$\boxed{g(x) = (x - 1)(x + 2)(x^2 + x + 1),}$$
where the first two factors are linear and the third is an irreducible quadratic. $\blacksquare$

---

> **Problem A3.** Show that $f(x) = x^5 - 6x^3 + 2x^2 - 4x + 2$ is irreducible over $\mathbb{Q}$.

**Solution A3.**

**Eisenstein's Criterion.** Let $f(x) = a_n x^n + a_{n-1} x^{n-1} + \cdots + a_1 x + a_0 \in \mathbb{Z}[x]$. If there exists a prime $p$ such that:
1. $p \mid a_i$ for all $0 \leq i < n$,
2. $p \nmid a_n$,
3. $p^2 \nmid a_0$,

then $f$ is irreducible over $\mathbb{Q}$.

*Apply to $f(x) = x^5 - 6x^3 + 2x^2 - 4x + 2$ with $p = 2$.*

Coefficients: $a_5 = 1, a_4 = 0, a_3 = -6, a_2 = 2, a_1 = -4, a_0 = 2$.

- (1) $p = 2$ divides $a_4 = 0$ ✓, $a_3 = -6$ ✓, $a_2 = 2$ ✓, $a_1 = -4$ ✓, $a_0 = 2$ ✓.
- (2) $p = 2 \nmid a_5 = 1$ ✓.
- (3) $p^2 = 4 \nmid a_0 = 2$ ✓ (since $2/4$ is not an integer).

All three conditions hold. By **Eisenstein's Criterion**, $f$ is irreducible over $\mathbb{Q}$. $\blacksquare$

*Proof sketch of Eisenstein.* Suppose $f = gh$ non-trivially in $\mathbb{Z}[x]$ (by Gauss's lemma, WLOG $g, h \in \mathbb{Z}[x]$). Reduce mod $p$: $\bar f = x^n$ in $\mathbb{F}_p[x]$ (all non-leading coefficients vanish). Since $\mathbb{F}_p[x]$ is a UFD and the only irreducible factor of $x^n$ is $x$, $\bar g = c_1 x^a$ and $\bar h = c_2 x^b$ with $a + b = n, a, b \geq 1$. So $g(0) \equiv 0, h(0) \equiv 0 \pmod p$, giving $p^2 \mid g(0) h(0) = a_0$, contradicting (3). $\blacksquare$

---

> **Problem A4.** Prove that the **cyclotomic polynomial** $\Phi_7(x) = x^6 + x^5 + x^4 + x^3 + x^2 + x + 1$ is irreducible over $\mathbb{Q}$.

**Solution A4.**

**Strategy.** Substitute $y = x + 1$ (i.e., $x = y - 1$) and apply Eisenstein.

**Recall.** For $p$ prime, $\Phi_p(x) = \frac{x^p - 1}{x - 1} = x^{p-1} + x^{p-2} + \cdots + x + 1$.

**Compute $\Phi_7(y + 1)$.** Using the identity above,
$$\Phi_7(y + 1) = \frac{(y + 1)^7 - 1}{(y + 1) - 1} = \frac{(y + 1)^7 - 1}{y}.$$

Expand $(y + 1)^7$ by the binomial theorem:
$$(y + 1)^7 = \sum_{k = 0}^7 \binom{7}{k} y^k = 1 + 7y + 21 y^2 + 35 y^3 + 35 y^4 + 21 y^5 + 7 y^6 + y^7.$$

So $(y + 1)^7 - 1 = 7y + 21 y^2 + 35 y^3 + 35 y^4 + 21 y^5 + 7 y^6 + y^7$, and dividing by $y$:
$$\Phi_7(y + 1) = y^6 + 7 y^5 + 21 y^4 + 35 y^3 + 35 y^2 + 21 y + 7.$$

**Check Eisenstein at $p = 7$.**

Coefficients: $1, 7, 21, 35, 35, 21, 7$.

- (1) $7 \mid 7, 21, 35, 35, 21, 7$ (all non-leading coefficients): $7, 21 = 3 \cdot 7, 35 = 5 \cdot 7$. All divisible by $7$ ✓.
- (2) $7 \nmid 1$ (leading coefficient) ✓.
- (3) $49 \nmid 7$ (constant term) ✓.

All Eisenstein conditions hold, so $\Phi_7(y + 1)$ is irreducible over $\mathbb{Q}$.

**Transfer back to $\Phi_7(x)$.** The substitution $x \mapsto y - 1$ (i.e., $y \mapsto x + 1$) is a $\mathbb{Q}$-algebra automorphism of $\mathbb{Q}[x] \to \mathbb{Q}[y]$. Automorphisms preserve irreducibility: if $\Phi_7(x)$ factored as $a(x) b(x)$ non-trivially over $\mathbb{Q}[x]$, then $\Phi_7(y + 1)$ would factor as $a(y + 1) b(y + 1)$ non-trivially over $\mathbb{Q}[y]$, contradicting the Eisenstein conclusion.

Hence $\Phi_7(x)$ is irreducible over $\mathbb{Q}$. $\blacksquare$

*Generalization.* For any prime $p$, $\Phi_p(x) = x^{p-1} + \cdots + 1$ is irreducible over $\mathbb{Q}$, by the same shifted-Eisenstein argument. For composite $n$, $\Phi_n(x)$ is also irreducible, but the proof requires more work (Dedekind's theorem, or counting primitive $n$-th roots of unity).

---

> **Problem A5.** Use **reduction mod $p$** to show $f(x) = x^4 + x + 1$ is irreducible over $\mathbb{Q}$.

**Solution A5.**

**Reduction mod $p$ theorem.** Let $f(x) \in \mathbb{Z}[x]$ be monic. If $\bar f(x) \in \mathbb{F}_p[x]$ (the reduction of $f$ mod $p$) is irreducible in $\mathbb{F}_p[x]$, then $f$ is irreducible in $\mathbb{Q}[x]$.

*(The converse is false — see Problem A7.)*

**Apply with $p = 2$.** $\bar f(x) = x^4 + x + 1 \in \mathbb{F}_2[x]$.

**Check $\bar f$ has no roots in $\mathbb{F}_2$:**
$$\bar f(0) = 0 + 0 + 1 = 1 \neq 0, \quad \bar f(1) = 1 + 1 + 1 = 1 \neq 0 \pmod 2.$$

No linear factors.

**Could $\bar f$ factor as a product of two irreducible quadratics?**

The irreducible monic quadratics in $\mathbb{F}_2[x]$ are those with no root in $\mathbb{F}_2$. Monic quadratics in $\mathbb{F}_2[x]$: $x^2, x^2 + 1, x^2 + x, x^2 + x + 1$. Roots:
- $x^2$: root $0$. Reducible.
- $x^2 + 1$: $0 \mapsto 1, 1 \mapsto 0$. Root $1$. Reducible: $x^2 + 1 = (x + 1)^2$ in $\mathbb{F}_2$.
- $x^2 + x$: $= x(x + 1)$. Reducible.
- $x^2 + x + 1$: $0 \mapsto 1, 1 \mapsto 1$. No root, irreducible.

So the only irreducible monic quadratic in $\mathbb{F}_2[x]$ is $x^2 + x + 1$. A factorization of $\bar f$ into two irreducible quadratics must be
$$(x^2 + x + 1)(x^2 + x + 1) = (x^2 + x + 1)^2.$$

Compute: $(x^2 + x + 1)^2 = x^4 + 2x^3 + 3x^2 + 2x + 1 \equiv x^4 + x^2 + 1 \pmod 2$.

Compare: $x^4 + x + 1 \neq x^4 + x^2 + 1$ (the $x^2$ and $x$ terms differ).

So $\bar f$ cannot be a product of two irreducible quadratics. Combined with having no linear factor, $\bar f$ is **irreducible** in $\mathbb{F}_2[x]$.

**Conclusion.** By the reduction-mod-$p$ theorem, $f(x) = x^4 + x + 1$ is irreducible over $\mathbb{Q}$. $\blacksquare$

---

> **Problem A6.** Let $f(x) = 2x^5 + 6x^2 - 12$. Show $f$ is irreducible over $\mathbb{Q}$.

**Solution A6.**

**Reduction.** $f$ is not monic, but $f(x) = 2(x^5 + 3x^2 - 6)$. Over $\mathbb{Q}$, $2$ is a unit, so $f$ is irreducible in $\mathbb{Q}[x]$ iff $x^5 + 3x^2 - 6$ is.

**Apply Eisenstein** to $g(x) = x^5 + 3x^2 - 6$ with $p = 3$:

Coefficients: $a_5 = 1, a_4 = 0, a_3 = 0, a_2 = 3, a_1 = 0, a_0 = -6$.

- (1) $3 \mid 0, 0, 3, 0, -6$ (all non-leading): $0, 0, 3, 0, -6$. Each is divisible by $3$. ✓
- (2) $3 \nmid 1$ ✓.
- (3) $9 \nmid -6$ (since $-6/9$ is not an integer) ✓.

Eisenstein applies, so $g(x) = x^5 + 3x^2 - 6$ is irreducible over $\mathbb{Q}$.

Since $f = 2g$ differs from $g$ by a unit in $\mathbb{Q}[x]$, $f$ is also irreducible over $\mathbb{Q}$.

$\boxed{f(x) = 2x^5 + 6x^2 - 12 \text{ is irreducible over } \mathbb{Q}.}$ $\blacksquare$

*Remark.* Over $\mathbb{Z}[x]$, $f = 2g$ shows $f$ is reducible in $\mathbb{Z}[x]$ (with factors $2$ and $g$, both non-units in $\mathbb{Z}[x]$). But in $\mathbb{Q}[x]$, $2$ is a unit, so this factorization is trivial. The distinction between "irreducible over $\mathbb{Z}$" and "irreducible over $\mathbb{Q}$" is resolved by **Gauss's Lemma**: a primitive polynomial is irreducible over $\mathbb{Z}$ iff irreducible over $\mathbb{Q}$.

---

> **Problem A7.** Determine whether $f(x) = x^4 + 1$ is irreducible over $\mathbb{Q}$.

**Solution A7.**

**Direct Eisenstein on $f$:** no useful prime.

**Reduction mod $p$ tests.**

*Mod $2$:* $x^4 + 1 = (x + 1)^4 \pmod 2$ (since $(x + 1)^4 = x^4 + 4x^3 + 6x^2 + 4x + 1 \equiv x^4 + 1 \pmod 2$). Reducible. Test inconclusive.

*Mod $3$:* Test for roots: $\bar f(0) = 1, \bar f(1) = 2, \bar f(2) = 16 + 1 = 17 \equiv 2 \pmod 3$. No roots, no linear factors. Could factor as two quadratics. We compute: suppose $\bar f = (x^2 + ax + b)(x^2 + cx + d)$ in $\mathbb{F}_3[x]$. Matching coefficients of $x^4 + 0 x^3 + 0 x^2 + 0 x + 1$:
- $a + c = 0$
- $ac + b + d = 0$
- $ad + bc = 0$
- $bd = 1$

From $a + c = 0$: $c = -a$. From $bd = 1$ in $\mathbb{F}_3$: $(b, d) \in \{(1, 1), (2, 2)\}$ (inverses).

*Case $(b, d) = (1, 1)$:* $ac + b + d = -a^2 + 2 = 0$, so $a^2 = 2$ in $\mathbb{F}_3$. Since $0^2 = 0, 1^2 = 1, 2^2 = 4 \equiv 1$, no solution.

*Case $(b, d) = (2, 2)$:* $-a^2 + 4 = 0$, so $a^2 = 4 \equiv 1$, giving $a \in \{1, 2\} = \{\pm 1\}$. Check the remaining equation: $ad + bc = a \cdot 2 + 2 \cdot (-a) = 0$ ✓ for any $a$.

So factorizations exist: $(x^2 + x + 2)(x^2 - x + 2) = (x^2 + x + 2)(x^2 + 2x + 2)$ in $\mathbb{F}_3$.

*Verify:* $(x^2 + x + 2)(x^2 + 2x + 2) = x^4 + 2x^3 + 2x^2 + x^3 + 2x^2 + 2x + 2x^2 + 4x + 4$
$= x^4 + 3x^3 + 6x^2 + 6x + 4 \equiv x^4 + 0 + 0 + 0 + 1 = x^4 + 1 \pmod 3$ ✓.

So $\bar f$ is **reducible** in $\mathbb{F}_3[x]$. Test inconclusive (reduction mod $p$ irreducibility is only a one-way implication).

**Use shifted Eisenstein.** Compute $f(x + 1)$:
$$f(x + 1) = (x + 1)^4 + 1.$$
Expand: $(x + 1)^4 = x^4 + 4x^3 + 6x^2 + 4x + 1$. So
$$f(x + 1) = x^4 + 4x^3 + 6x^2 + 4x + 2.$$

**Apply Eisenstein at $p = 2$.**

- (1) $2 \mid 4, 6, 4, 2$ ✓.
- (2) $2 \nmid 1$ (leading) ✓.
- (3) $4 \nmid 2$ (constant) ✓.

Eisenstein applies, so $f(x + 1)$ is irreducible over $\mathbb{Q}$. Hence $f(x) = x^4 + 1$ is also irreducible over $\mathbb{Q}$ (since substitution $x \mapsto x - 1$ preserves irreducibility).

$\boxed{x^4 + 1 \text{ is irreducible over } \mathbb{Q}.}$ $\blacksquare$

**Remark.** This shows the **converse of the reduction-mod-$p$ theorem fails**: $f$ is irreducible over $\mathbb{Q}$ but $\bar f$ is reducible modulo $2$ (and $3$, and in fact modulo every prime). More generally, $x^4 + 1$ is the $8$-th cyclotomic polynomial $\Phi_8$ and is always reducible modulo $p$ for every prime $p$ (a consequence of the splitting behavior of cyclotomic polynomials in $\mathbb{F}_p$).

---

> **Problem A8.** Let $f(x) = x^4 + 3x^3 + 3x^2 + 3x + 3 \in \mathbb{Z}[x]$. Is $f$ irreducible over $\mathbb{Q}$?

**Solution A8.**

**Apply Eisenstein at $p = 3$.**

Coefficients: $a_4 = 1, a_3 = 3, a_2 = 3, a_1 = 3, a_0 = 3$.

- (1) $3 \mid 3, 3, 3, 3$ ✓.
- (2) $3 \nmid 1$ ✓.
- (3) $9 \nmid 3$ (since $3/9$ is not an integer) ✓.

All Eisenstein conditions hold at $p = 3$, so $f$ is irreducible over $\mathbb{Q}$.

$\boxed{\text{Yes, } f \text{ is irreducible over } \mathbb{Q}.}$ $\blacksquare$

---

## Part B: Fields from Quotients $F[x]/\langle p(x)\rangle$

> **Problem B1.** Show that $\mathbb{Q}[x]/\langle x^2 - 2\rangle \cong \mathbb{Q}(\sqrt 2)$.

**Solution B1.**

**Construction.** Define the evaluation map
$$\varphi: \mathbb{Q}[x] \to \mathbb{Q}(\sqrt 2), \qquad \varphi(f) = f(\sqrt 2).$$

**$\varphi$ is a ring homomorphism.** Standard for evaluation: $\varphi(f + g) = (f + g)(\sqrt 2) = f(\sqrt 2) + g(\sqrt 2) = \varphi(f) + \varphi(g)$; similarly multiplicative; $\varphi(1) = 1$.

**$\varphi$ is surjective.** For $a, b \in \mathbb{Q}$, $\varphi(a + bx) = a + b\sqrt 2$. Every element of $\mathbb{Q}(\sqrt 2) = \{a + b\sqrt 2 : a, b \in \mathbb{Q}\}$ is hit.

**Compute $\ker\varphi$.** $f \in \ker\varphi \iff f(\sqrt 2) = 0$.

*Claim: $\ker\varphi = \langle x^2 - 2\rangle$.*

$\supseteq$: $(x^2 - 2)(\sqrt 2) = 2 - 2 = 0$. So $x^2 - 2 \in \ker\varphi$, hence $\langle x^2 - 2\rangle \subseteq \ker\varphi$.

$\subseteq$: Use the **division algorithm** in $\mathbb{Q}[x]$. Given $f \in \ker\varphi$, write
$$f(x) = (x^2 - 2) q(x) + r(x), \quad \deg r < 2.$$
So $r(x) = ax + b$ for some $a, b \in \mathbb{Q}$. Evaluate at $\sqrt 2$:
$$0 = f(\sqrt 2) = (2 - 2) q(\sqrt 2) + (a\sqrt 2 + b) = a\sqrt 2 + b.$$
Since $1, \sqrt 2$ are $\mathbb{Q}$-linearly independent (as $\sqrt 2 \notin \mathbb{Q}$), $a = b = 0$. So $r = 0$ and $f = (x^2 - 2) q \in \langle x^2 - 2\rangle$.

Hence $\ker\varphi = \langle x^2 - 2\rangle$.

**First Isomorphism Theorem.**
$$\mathbb{Q}[x]/\langle x^2 - 2\rangle = \mathbb{Q}[x]/\ker\varphi \cong \operatorname{Im}\varphi = \mathbb{Q}(\sqrt 2).$$

$\boxed{\mathbb{Q}[x]/\langle x^2 - 2\rangle \cong \mathbb{Q}(\sqrt 2).} \qquad \blacksquare$

*Alternative framing:* since $x^2 - 2$ is irreducible over $\mathbb{Q}$ (no rational root by RRT, degree $2$), the ideal $\langle x^2 - 2\rangle$ is maximal, so the quotient is a field. The quotient has degree $2$ over $\mathbb{Q}$ (basis $\{1, \bar x\}$) with $\bar x^2 = 2$, matching $\mathbb{Q}(\sqrt 2)$.

---

> **Problem B2.** Construct a field of order $9$ explicitly.

**Solution B2.**

**Goal: construct $\mathbb{F}_9 = \mathbb{F}_{3^2}$.**

**Strategy.** $\mathbb{F}_9$ exists as $\mathbb{F}_3[x]/\langle p(x)\rangle$ for any irreducible monic quadratic $p(x) \in \mathbb{F}_3[x]$ ([[27-finite-fields-and-extensions]]).

**Choose $p(x) = x^2 + 1$.**

*Verify $p$ is irreducible over $\mathbb{F}_3$.* Check for roots in $\mathbb{F}_3 = \{0, 1, 2\}$:
$$p(0) = 1, \quad p(1) = 2, \quad p(2) = 4 + 1 = 5 \equiv 2 \pmod 3.$$
No roots ⟹ degree-$2$ poly ⟹ irreducible. ✓

**Construct the quotient.** Set $\mathbb{F}_9 = \mathbb{F}_3[x]/\langle x^2 + 1\rangle$, and denote $\alpha = \bar x$ (the class of $x$). Then $\alpha^2 = -1 = 2$ in $\mathbb{F}_3$.

**Elements of $\mathbb{F}_9$.** Every element is uniquely $a + b\alpha$ for $a, b \in \mathbb{F}_3$ (since every polynomial modulo $x^2 + 1$ reduces to degree $< 2$). There are $3 \cdot 3 = 9$ elements:
$$\mathbb{F}_9 = \{0, 1, 2, \alpha, 1 + \alpha, 2 + \alpha, 2\alpha, 1 + 2\alpha, 2 + 2\alpha\}.$$

**Arithmetic examples.**

*Addition:* coordinate-wise. $(1 + \alpha) + (2 + 2\alpha) = 3 + 3\alpha = 0$. So $1 + \alpha = -(2 + 2\alpha) = (2 + 2\alpha)^{-1}$ under addition; i.e., $-(1 + \alpha) = 2 + 2\alpha$.

*Multiplication:* use $\alpha^2 = 2$. $(1 + \alpha)^2 = 1 + 2\alpha + \alpha^2 = 1 + 2\alpha + 2 = 3 + 2\alpha = 2\alpha$.

*Inverses (examples).*
- $\alpha \cdot 2\alpha = 2\alpha^2 = 2 \cdot 2 = 4 \equiv 1$. So $\alpha^{-1} = 2\alpha$.
- $(1 + \alpha)(1 + 2\alpha) = 1 + 2\alpha + \alpha + 2\alpha^2 = 1 + 3\alpha + 4 = 5 \equiv 2$. So $(1 + \alpha)(1 + 2\alpha) = 2$, meaning $(1 + \alpha)^{-1} = (1 + 2\alpha)/2 = 2 \cdot (1 + 2\alpha) = 2 + 4\alpha = 2 + \alpha$.

*Verify:* $(1 + \alpha)(2 + \alpha) = 2 + \alpha + 2\alpha + \alpha^2 = 2 + 3\alpha + 2 = 4 = 1$. ✓

**Structure of $\mathbb{F}_9^\times$.** $\mathbb{F}_9^\times$ has order $8$. As a finite field's multiplicative group, it is cyclic: $\mathbb{F}_9^\times \cong \mathbb{Z}/8\mathbb{Z}$. A primitive element (generator) is, for instance, $\alpha + 1$:
- $(\alpha + 1)^2 = \alpha^2 + 2\alpha + 1 = 2 + 2\alpha + 1 = 3 + 2\alpha = 2\alpha$.
- $(\alpha + 1)^4 = (2\alpha)^2 = 4\alpha^2 = 4 \cdot 2 = 8 \equiv 2$.
- $(\alpha + 1)^8 = 2^2 = 4 \equiv 1$. ✓
- Order of $\alpha + 1$ divides $8$; it's not $1, 2, 4$: $(\alpha + 1)^2 = 2\alpha \neq 1$; $(\alpha + 1)^4 = 2 \neq 1$. So order $= 8$.

$\boxed{\mathbb{F}_9 = \mathbb{F}_3[x]/\langle x^2 + 1\rangle = \{a + b\alpha : a, b \in \mathbb{F}_3, \alpha^2 = 2\}.}$ $\blacksquare$

---

> **Problem B3.** Let $K = \mathbb{Q}[x]/\langle x^3 - 2\rangle$. Find the inverse of $\alpha + 1$ in $K$, where $\alpha = [x]$.

**Solution B3.**

**Setup.** $x^3 - 2$ is irreducible over $\mathbb{Q}$ (Eisenstein at $p = 2$: $2 \nmid 1$; $2 \mid 0, 0, -2$; $4 \nmid -2$). So $K$ is a field with $\alpha^3 = 2$.

**Goal: find $\beta \in K$ with $(\alpha + 1)\beta = 1$.**

**Method: Extended Euclidean Algorithm** applied to $f(x) = x^3 - 2$ and $g(x) = x + 1$ in $\mathbb{Q}[x]$.

*Euclidean step 1:* divide $f$ by $g$.
$$x^3 - 2 = (x + 1) q(x) + r, \quad \deg r < 1.$$
Compute: $x^3 = x^2 \cdot x$. $x^2 \cdot (x + 1) = x^3 + x^2$. Subtract: $x^3 - 2 - (x^3 + x^2) = -x^2 - 2$.
Next: $-x^2 = -x \cdot x$. $-x \cdot (x + 1) = -x^2 - x$. Subtract: $(-x^2 - 2) - (-x^2 - x) = x - 2$.
Next: $x = 1 \cdot x$. $1 \cdot (x + 1) = x + 1$. Subtract: $(x - 2) - (x + 1) = -3$.

So $x^3 - 2 = (x + 1)(x^2 - x + 1) + (-3)$, i.e.,
$$-3 = (x^3 - 2) - (x + 1)(x^2 - x + 1).$$

**Reduce to Bézout in $K$.** The equation $(x + 1)(x^2 - x + 1) \equiv 3 \pmod{x^3 - 2}$ means, in $K$,
$$(\alpha + 1)(\alpha^2 - \alpha + 1) = 3.$$

Dividing by $3$:
$$(\alpha + 1) \cdot \frac{1}{3}(\alpha^2 - \alpha + 1) = 1.$$

**Conclusion.**
$$\boxed{(\alpha + 1)^{-1} = \tfrac{1}{3}(\alpha^2 - \alpha + 1).}$$

**Verification.**
$$(\alpha + 1)(\alpha^2 - \alpha + 1) = \alpha^3 - \alpha^2 + \alpha + \alpha^2 - \alpha + 1 = \alpha^3 + 1 = 2 + 1 = 3. \checkmark$$

So $(\alpha + 1) \cdot \tfrac{1}{3}(\alpha^2 - \alpha + 1) = 1$ as required. $\blacksquare$

---

> **Problem B4.** Prove: $\mathbb{R}[x]/\langle x^2 + x + 1\rangle \cong \mathbb{C}$.

**Solution B4.**

**Step 1: $x^2 + x + 1$ is irreducible over $\mathbb{R}$.**

Discriminant: $1^2 - 4 \cdot 1 \cdot 1 = -3 < 0$. So no real roots; being degree $2$ with no real roots, $x^2 + x + 1$ is irreducible over $\mathbb{R}$.

Hence $\mathbb{R}[x]/\langle x^2 + x + 1\rangle$ is a field.

**Step 2: Identify the quotient with $\mathbb{C}$.**

Define $\varphi: \mathbb{R}[x] \to \mathbb{C}$ by evaluation at $\omega = e^{2\pi i/3} = -\tfrac{1}{2} + \tfrac{\sqrt 3}{2} i$:
$$\varphi(p(x)) = p(\omega).$$

*$\omega$ satisfies $x^2 + x + 1 = 0$:* $\omega^2 + \omega + 1 = (\omega^3 - 1)/(\omega - 1) = 0$ since $\omega^3 = 1$ and $\omega \neq 1$. ✓

**Check $\varphi$ is surjective.** The image contains $\varphi(1) = 1$ and $\varphi(x) = \omega$, hence the $\mathbb{R}$-span of $\{1, \omega\}$. Now $\omega = -\tfrac 1 2 + \tfrac{\sqrt 3}{2} i$, so $\{1, \omega\}$ is $\mathbb{R}$-linearly equivalent to $\{1, i\}$ (since $\omega = -\tfrac 1 2 \cdot 1 + \tfrac{\sqrt 3}{2} \cdot i$ is an $\mathbb{R}$-linear combination of $1, i$, invertibly). So $\operatorname{Im}\varphi \supseteq \mathbb{R}[\omega] = \mathbb{R}[i] = \mathbb{C}$.

**Compute $\ker\varphi$.** $p \in \ker\varphi \iff p(\omega) = 0$. Since $p$ has real coefficients, $p(\bar\omega) = \overline{p(\omega)} = 0$, with $\bar\omega = \omega^2$ the other root of $x^2 + x + 1$. So $p$ is divisible by $(x - \omega)(x - \bar\omega) = x^2 + x + 1$. Hence $\ker\varphi \supseteq \langle x^2 + x + 1\rangle$.

Conversely, the division-algorithm argument (as in B1) shows $\ker\varphi \subseteq \langle x^2 + x + 1\rangle$.

So $\ker\varphi = \langle x^2 + x + 1\rangle$.

**First Iso:**
$$\mathbb{R}[x]/\langle x^2 + x + 1\rangle \cong \operatorname{Im}\varphi = \mathbb{C}. \qquad \boxed{\cong \mathbb{C}.} \qquad \blacksquare$$

**Alternative argument.** Any irreducible quadratic over $\mathbb{R}$ gives a quotient that is a $2$-dimensional real algebra with a subfield $\mathbb{R}$ and an element whose square is negative (or rather, whose minimal polynomial has negative discriminant). Up to isomorphism, the unique such field is $\mathbb{C}$ (by classification of finite-dimensional real division algebras: $\mathbb{R}, \mathbb{C}, \mathbb{H}$, and in dimension $2$ only $\mathbb{C}$).

*Explicit computation of "$i$" inside the quotient.* In $\mathbb{R}[x]/\langle x^2 + x + 1\rangle$, $\alpha = \bar x$ satisfies $\alpha^2 = -\alpha - 1$. Compute $(2\alpha + 1)^2 = 4\alpha^2 + 4\alpha + 1 = -4\alpha - 4 + 4\alpha + 1 = -3$. So $\beta = (2\alpha + 1)/\sqrt 3$ satisfies $\beta^2 = -1$, playing the role of $i$.

---

> **Problem B5.** Count the units of $\mathbb{F}_2[x]/\langle x^2 + x + 1\rangle$.

**Solution B5.**

**Step 1: Irreducibility.** $x^2 + x + 1 \in \mathbb{F}_2[x]$ has no root ($p(0) = 1, p(1) = 1$), so irreducible.

**Step 2: Field structure.** $\mathbb{F}_2[x]/\langle x^2 + x + 1\rangle$ is a field.

**Step 3: Size.** As an $\mathbb{F}_2$-vector space of dimension $2$ (basis $\{1, \bar x\}$), the quotient has $2^2 = 4$ elements: this is $\mathbb{F}_4$.

**Step 4: Count units.** In a field, every non-zero element is a unit. So
$$|\text{units}| = |\mathbb{F}_4| - 1 = 4 - 1 = \boxed{3}.$$

**Explicit units.** Writing $\alpha = \bar x$:
$$\mathbb{F}_4 = \{0, 1, \alpha, 1 + \alpha\}, \quad \mathbb{F}_4^\times = \{1, \alpha, 1 + \alpha\}.$$

Verify: $\alpha(1 + \alpha) = \alpha + \alpha^2$. Since $\alpha^2 + \alpha + 1 = 0$, $\alpha^2 = \alpha + 1$ (in char 2, $-1 = 1$). So $\alpha + \alpha^2 = \alpha + \alpha + 1 = 1$. Hence $\alpha^{-1} = 1 + \alpha$. ✓

$\mathbb{F}_4^\times = \langle \alpha\rangle \cong \mathbb{Z}/3\mathbb{Z}$ (cyclic of order $3$).

$\blacksquare$

---

> **Problem B6.** Is $\mathbb{Q}[x]/\langle x^3 - x\rangle$ a field? If not, describe its structure.

**Solution B6.**

**Factor.** $x^3 - x = x(x^2 - 1) = x(x - 1)(x + 1)$.

Reducible! So $\langle x^3 - x\rangle$ is **not maximal**, hence $\mathbb{Q}[x]/\langle x^3 - x\rangle$ is **not a field**.

**Structure via CRT.** The factors $x, x - 1, x + 1$ are pairwise coprime (no common root), so by the **Chinese Remainder Theorem for rings**:
$$\mathbb{Q}[x]/\langle x(x - 1)(x + 1)\rangle \cong \frac{\mathbb{Q}[x]}{\langle x\rangle} \times \frac{\mathbb{Q}[x]}{\langle x - 1\rangle} \times \frac{\mathbb{Q}[x]}{\langle x + 1\rangle}.$$

Each factor $\mathbb{Q}[x]/\langle x - c\rangle \cong \mathbb{Q}$ via the evaluation map $p \mapsto p(c)$ (surjective onto $\mathbb{Q}$, kernel $\langle x - c\rangle$).

**Conclusion.**
$$\boxed{\mathbb{Q}[x]/\langle x^3 - x\rangle \cong \mathbb{Q} \times \mathbb{Q} \times \mathbb{Q} = \mathbb{Q}^3,}$$
the product of three copies of $\mathbb{Q}$.

**Properties of $\mathbb{Q}^3$.**
- It is a commutative ring with unity $(1, 1, 1)$, $3$-dimensional over $\mathbb{Q}$.
- It is **not** an integral domain: $(1, 0, 0) \cdot (0, 1, 0) = (0, 0, 0)$.
- Idempotents: $2^3 = 8$ of them (one for each subset of the three coordinates).
- Units: $(a, b, c)$ with $a, b, c \in \mathbb{Q}^\times$. $\blacksquare$

---

## Part C: Field Extensions, Minimal Polynomials, Tower Law

> **Problem C1.** Find the minimal polynomial of $\sqrt{2} + \sqrt{3}$ over $\mathbb{Q}$, and its degree.

**Solution C1.**

Let $\alpha = \sqrt 2 + \sqrt 3$.

**Step 1: Find a polynomial annihilating $\alpha$.**

$$\alpha^2 = (\sqrt 2 + \sqrt 3)^2 = 2 + 2\sqrt 2 \sqrt 3 + 3 = 5 + 2\sqrt 6.$$
$$\alpha^2 - 5 = 2\sqrt 6.$$
Square again:
$$(\alpha^2 - 5)^2 = (2\sqrt 6)^2 = 24.$$
$$\alpha^4 - 10\alpha^2 + 25 = 24.$$
$$\alpha^4 - 10\alpha^2 + 1 = 0.$$

Hence $\alpha$ is a root of $f(x) = x^4 - 10x^2 + 1$.

**Step 2: Prove $f$ is irreducible over $\mathbb{Q}$.**

*No rational roots.* By RRT, rational roots are $\pm 1$. $f(1) = 1 - 10 + 1 = -8, f(-1) = -8$. ✗

So $f$ has no linear factors over $\mathbb{Q}$. If $f$ factors, it must be as two quadratics.

*Attempt quadratic factorization.* By Gauss's lemma, if $f \in \mathbb{Z}[x]$ factors over $\mathbb{Q}$, it factors over $\mathbb{Z}$. Write
$$f(x) = (x^2 + ax + b)(x^2 + cx + d), \quad a, b, c, d \in \mathbb{Z}.$$

Expanding:
$$f(x) = x^4 + (a + c) x^3 + (ac + b + d) x^2 + (ad + bc) x + bd.$$

Match coefficients with $x^4 + 0 x^3 - 10 x^2 + 0 x + 1$:
- $a + c = 0 \implies c = -a$.
- $ac + b + d = -a^2 + b + d = -10$.
- $ad + bc = ad - ab = a(d - b) = 0$.
- $bd = 1$.

From $bd = 1$ in $\mathbb{Z}$: $(b, d) \in \{(1, 1), (-1, -1)\}$.

*Case $(b, d) = (1, 1)$:* $-a^2 + 2 = -10 \implies a^2 = 12$, no integer solution.

*Case $(b, d) = (-1, -1)$:* $-a^2 - 2 = -10 \implies a^2 = 8$, no integer solution.

*Third equation* $a(d - b) = 0$ is satisfied in both cases (since $b = d$ in both).

No integer factorization exists, so $f$ is irreducible in $\mathbb{Z}[x]$, hence in $\mathbb{Q}[x]$.

**Step 3: Minimal polynomial and degree.**

Since $f$ is monic, irreducible, and $f(\alpha) = 0$, $f$ is the **minimal polynomial** $m_\alpha(x)$ of $\alpha$ over $\mathbb{Q}$.

$$\boxed{m_\alpha(x) = x^4 - 10 x^2 + 1, \quad [\mathbb{Q}(\alpha) : \mathbb{Q}] = \deg m_\alpha = 4.} \qquad \blacksquare$$

*Consistency check.* $[\mathbb{Q}(\sqrt 2, \sqrt 3) : \mathbb{Q}] = 4$ (see C2). Since $\alpha = \sqrt 2 + \sqrt 3 \in \mathbb{Q}(\sqrt 2, \sqrt 3)$, $\mathbb{Q}(\alpha) \subseteq \mathbb{Q}(\sqrt 2, \sqrt 3)$. We've shown $[\mathbb{Q}(\alpha):\mathbb{Q}] = 4 = [\mathbb{Q}(\sqrt 2, \sqrt 3):\mathbb{Q}]$, so $\mathbb{Q}(\alpha) = \mathbb{Q}(\sqrt 2, \sqrt 3)$. ✓

---

> **Problem C2.** Compute $[\mathbb{Q}(\sqrt 2, \sqrt 3) : \mathbb{Q}]$.

**Solution C2.**

**Tower Law.** For a tower $F \subseteq K \subseteq L$ of fields: $[L : F] = [L : K] \cdot [K : F]$.

**Tower:** $\mathbb{Q} \subseteq \mathbb{Q}(\sqrt 2) \subseteq \mathbb{Q}(\sqrt 2, \sqrt 3)$.

**Compute $[\mathbb{Q}(\sqrt 2) : \mathbb{Q}]$.** The minimal polynomial of $\sqrt 2$ over $\mathbb{Q}$ is $x^2 - 2$ (monic, irreducible since $\sqrt 2 \notin \mathbb{Q}$, degree $2$). So $[\mathbb{Q}(\sqrt 2) : \mathbb{Q}] = 2$.

**Compute $[\mathbb{Q}(\sqrt 2, \sqrt 3) : \mathbb{Q}(\sqrt 2)]$.** Since $\sqrt 3$ satisfies $x^2 - 3 = 0$ over $\mathbb{Q}$, hence over $\mathbb{Q}(\sqrt 2)$, we have $[\mathbb{Q}(\sqrt 2, \sqrt 3) : \mathbb{Q}(\sqrt 2)] \leq 2$. It equals $1$ iff $\sqrt 3 \in \mathbb{Q}(\sqrt 2)$; equals $2$ otherwise.

*Claim: $\sqrt 3 \notin \mathbb{Q}(\sqrt 2)$.*

Suppose for contradiction $\sqrt 3 = a + b\sqrt 2$ with $a, b \in \mathbb{Q}$. Square:
$$3 = a^2 + 2b^2 + 2ab\sqrt 2.$$

Since $\sqrt 2 \notin \mathbb{Q}$, the coefficient of $\sqrt 2$ must be zero: $2ab = 0$, i.e., $a = 0$ or $b = 0$.

- If $b = 0$: $\sqrt 3 = a \in \mathbb{Q}$, contradiction ($\sqrt 3$ is irrational).
- If $a = 0$: $\sqrt 3 = b\sqrt 2$, so $3 = 2 b^2$, so $b^2 = 3/2$. No rational solution.

Both cases fail, so $\sqrt 3 \notin \mathbb{Q}(\sqrt 2)$.

Hence $x^2 - 3$ is irreducible over $\mathbb{Q}(\sqrt 2)$, and $[\mathbb{Q}(\sqrt 2, \sqrt 3) : \mathbb{Q}(\sqrt 2)] = 2$.

**Apply Tower Law.**
$$[\mathbb{Q}(\sqrt 2, \sqrt 3) : \mathbb{Q}] = [\mathbb{Q}(\sqrt 2, \sqrt 3) : \mathbb{Q}(\sqrt 2)] \cdot [\mathbb{Q}(\sqrt 2) : \mathbb{Q}] = 2 \cdot 2 = \boxed{4}.$$

**A $\mathbb{Q}$-basis.** Each step gives a basis: $\{1, \sqrt 2\}$ for $\mathbb{Q}(\sqrt 2)/\mathbb{Q}$, and $\{1, \sqrt 3\}$ for $\mathbb{Q}(\sqrt 2, \sqrt 3)/\mathbb{Q}(\sqrt 2)$. Products give a basis over $\mathbb{Q}$:
$$\{1, \sqrt 2, \sqrt 3, \sqrt 2 \sqrt 3\} = \{1, \sqrt 2, \sqrt 3, \sqrt 6\}. \qquad \blacksquare$$

---

> **Problem C3.** Let $\omega = e^{2\pi i/3}$. Compute $[\mathbb{Q}(\sqrt[3]{2}, \omega) : \mathbb{Q}]$.

**Solution C3.**

**Setup.** $\omega$ is a primitive $3$rd root of unity: $\omega^3 = 1, \omega \neq 1$. So $\omega$ is a root of $\Phi_3(x) = x^2 + x + 1$, which is irreducible over $\mathbb{Q}$ (discriminant $-3 < 0$).

$\sqrt[3]{2}$ has minimal polynomial $x^3 - 2$ over $\mathbb{Q}$ (irreducible by Eisenstein at $2$).

**Degrees.**
$$[\mathbb{Q}(\sqrt[3]{2}) : \mathbb{Q}] = 3, \quad [\mathbb{Q}(\omega) : \mathbb{Q}] = 2.$$

**Compose.** We want $[\mathbb{Q}(\sqrt[3]{2}, \omega) : \mathbb{Q}]$.

**Lower bound via Tower Law.** $[\mathbb{Q}(\sqrt[3]{2}, \omega) : \mathbb{Q}]$ is divisible by both $[\mathbb{Q}(\sqrt[3]{2}) : \mathbb{Q}] = 3$ and $[\mathbb{Q}(\omega) : \mathbb{Q}] = 2$ (since both are intermediate fields). So it is divisible by $\operatorname{lcm}(3, 2) = 6$.

**Upper bound.**
$$[\mathbb{Q}(\sqrt[3]{2}, \omega) : \mathbb{Q}] = [\mathbb{Q}(\sqrt[3]{2}, \omega) : \mathbb{Q}(\sqrt[3]{2})] \cdot [\mathbb{Q}(\sqrt[3]{2}) : \mathbb{Q}].$$

Over $\mathbb{Q}(\sqrt[3]{2})$, $\omega$ still satisfies $x^2 + x + 1$, so $[\mathbb{Q}(\sqrt[3]{2}, \omega) : \mathbb{Q}(\sqrt[3]{2})] \leq 2$. Thus $[\mathbb{Q}(\sqrt[3]{2}, \omega) : \mathbb{Q}] \leq 3 \cdot 2 = 6$.

**Equality.** Combining: $6 \leq [\mathbb{Q}(\sqrt[3]{2}, \omega) : \mathbb{Q}] \leq 6$, so $[\mathbb{Q}(\sqrt[3]{2}, \omega) : \mathbb{Q}] = 6$.

*Sharp check of the upper step:* Is $\omega \in \mathbb{Q}(\sqrt[3]{2})$? $\mathbb{Q}(\sqrt[3]{2}) \subseteq \mathbb{R}$ (since $\sqrt[3]{2} \in \mathbb{R}$), while $\omega = -\tfrac 1 2 + \tfrac{\sqrt 3}{2} i \notin \mathbb{R}$. So $\omega \notin \mathbb{Q}(\sqrt[3]{2})$, and $x^2 + x + 1$ is irreducible over $\mathbb{Q}(\sqrt[3]{2})$, giving degree $= 2$ for the upper step.

$$\boxed{[\mathbb{Q}(\sqrt[3]{2}, \omega) : \mathbb{Q}] = 6.} \qquad \blacksquare$$

*Remark.* $\mathbb{Q}(\sqrt[3]{2}, \omega)$ is the **splitting field** of $x^3 - 2$ over $\mathbb{Q}$: its three roots are $\sqrt[3]{2}, \omega \sqrt[3]{2}, \omega^2 \sqrt[3]{2}$.

---

> **Problem C4.** Prove that $\sqrt 2 + \sqrt[3]{3}$ is algebraic over $\mathbb{Q}$ and give a bound on the degree of its minimal polynomial.

**Solution C4.**

**Step 1: Algebraic.**

$\sqrt 2$ satisfies $x^2 - 2 = 0$ — algebraic over $\mathbb{Q}$, degree $2$.
$\sqrt[3]{3}$ satisfies $x^3 - 3 = 0$ — algebraic over $\mathbb{Q}$, degree $3$ (Eisenstein at $3$).

**Sum/product of algebraic numbers is algebraic.** Indeed, $\sqrt 2 + \sqrt[3]{3} \in \mathbb{Q}(\sqrt 2, \sqrt[3]{3})$, which is a finite extension of $\mathbb{Q}$.

**Step 2: Bound the degree of $\mathbb{Q}(\sqrt 2, \sqrt[3]{3})$ over $\mathbb{Q}$.**

$$[\mathbb{Q}(\sqrt 2, \sqrt[3]{3}) : \mathbb{Q}] \leq [\mathbb{Q}(\sqrt 2) : \mathbb{Q}] \cdot [\mathbb{Q}(\sqrt[3]{3}) : \mathbb{Q}] = 2 \cdot 3 = 6.$$

**Step 3: Compute exactly.**

By tower law, $[\mathbb{Q}(\sqrt 2, \sqrt[3]{3}) : \mathbb{Q}]$ is divisible by both $2$ and $3$, hence by $\operatorname{lcm}(2, 3) = 6$. Combined with the upper bound, $[\mathbb{Q}(\sqrt 2, \sqrt[3]{3}) : \mathbb{Q}] = 6$.

**Step 4: Degree of $\sqrt 2 + \sqrt[3]{3}$.**

Let $\alpha = \sqrt 2 + \sqrt[3]{3}$. Then $\mathbb{Q}(\alpha) \subseteq \mathbb{Q}(\sqrt 2, \sqrt[3]{3})$, so by the tower law, $[\mathbb{Q}(\alpha) : \mathbb{Q}]$ divides $[\mathbb{Q}(\sqrt 2, \sqrt[3]{3}) : \mathbb{Q}] = 6$.

Hence the minimal polynomial of $\alpha$ has degree dividing $6$: it is in $\{1, 2, 3, 6\}$.

Rule out $1$: $\alpha = \sqrt 2 + \sqrt[3]{3} \notin \mathbb{Q}$ (since if it were rational, then $\sqrt[3]{3} = \alpha - \sqrt 2$, giving $\mathbb{Q}(\sqrt[3]{3}) \subseteq \mathbb{Q}(\sqrt 2)$, but degrees don't match: $3 \nmid 2$).

Rule out $2$: if $[\mathbb{Q}(\alpha):\mathbb{Q}] = 2$, then $\alpha \in \mathbb{Q}(\sqrt d)$ for some square-free $d$. But $\mathbb{Q}(\alpha) \supseteq$ a subfield of $\mathbb{Q}(\sqrt 2, \sqrt[3]{3})$, and any degree-$2$ subfield would correspond to a subfield of degree $2$, namely $\mathbb{Q}(\sqrt 2)$ (the unique one from the tower). So $\mathbb{Q}(\alpha) = \mathbb{Q}(\sqrt 2)$, giving $\sqrt[3]{3} = \alpha - \sqrt 2 \in \mathbb{Q}(\sqrt 2)$, so $\mathbb{Q}(\sqrt[3]{3}) \subseteq \mathbb{Q}(\sqrt 2)$, contradiction ($3 \nmid 2$).

Rule out $3$: similarly, $\mathbb{Q}(\alpha) = \mathbb{Q}(\sqrt[3]{3})$ would force $\sqrt 2 \in \mathbb{Q}(\sqrt[3]{3})$, contradicting $2 \nmid 3$.

So the minimal polynomial has degree exactly $6$.

$$\boxed{[\mathbb{Q}(\alpha) : \mathbb{Q}] = 6 \text{ (which is the bound).}} \qquad \blacksquare$$

---

> **Problem C5.** Let $L = \mathbb{Q}(\sqrt[4]{2})$. Find all intermediate fields $\mathbb{Q} \subseteq K \subseteq L$.

**Solution C5.**

**Step 1: $[L : \mathbb{Q}] = 4$.**

$\sqrt[4]{2}$ satisfies $x^4 - 2 = 0$. Eisenstein at $p = 2$: $2 \mid -2$; $2 \nmid 1$; $4 \nmid -2$. ✓ So $x^4 - 2$ is irreducible over $\mathbb{Q}$; hence it is the minimal polynomial, and $[L : \mathbb{Q}] = 4$.

**Step 2: Degrees of intermediate fields.**

By Tower Law, if $\mathbb{Q} \subseteq K \subseteq L$, then $[K : \mathbb{Q}] \mid [L : \mathbb{Q}] = 4$. So $[K : \mathbb{Q}] \in \{1, 2, 4\}$.

- $[K : \mathbb{Q}] = 1$: $K = \mathbb{Q}$.
- $[K : \mathbb{Q}] = 4$: $K = L$.
- $[K : \mathbb{Q}] = 2$: strict intermediate field.

**Step 3: Find degree-$2$ subfields.**

A degree-$2$ subfield $K$ of $L$ must be generated by an element of degree $2$ over $\mathbb{Q}$.

*Candidate: $\sqrt 2 = (\sqrt[4]{2})^2 \in L$.* $\sqrt 2$ satisfies $x^2 - 2$, irreducible over $\mathbb{Q}$. So $\mathbb{Q}(\sqrt 2) \subseteq L$ is a degree-$2$ subfield.

**Step 4: Uniqueness of degree-$2$ subfield.**

Suppose $K \subseteq L$ has $[K : \mathbb{Q}] = 2$. Then $K = \mathbb{Q}(\beta)$ for some $\beta \in L$ with $[\mathbb{Q}(\beta) : \mathbb{Q}] = 2$. $\beta \in L = \mathbb{Q}(\sqrt[4]{2})$, so $\beta = a_0 + a_1 \sqrt[4]{2} + a_2 (\sqrt[4]{2})^2 + a_3 (\sqrt[4]{2})^3$ for $a_i \in \mathbb{Q}$ (basis).

*Use Galois-type argument.* The extension $L/\mathbb{Q}$ has automorphism group (over $\mathbb{Q}$) a subgroup of the symmetries of the roots of $x^4 - 2$. Actually, since $\mathbb{Q}(\sqrt[4]{2}) \subseteq \mathbb{R}$ and the roots of $x^4 - 2$ are $\{\pm \sqrt[4]{2}, \pm i\sqrt[4]{2}\}$, only two are real. $\operatorname{Aut}(L/\mathbb{Q}) = \{\operatorname{id}, \sigma\}$ where $\sigma(\sqrt[4]{2}) = -\sqrt[4]{2}$ (complex roots are not in $L$).

The fixed field of $\sigma$ is $\{\beta \in L : \sigma(\beta) = \beta\}$. Applied to $\beta = a_0 + a_1 \sqrt[4]{2} + a_2 \sqrt 2 + a_3 (\sqrt[4]{2})^3$: $\sigma(\beta) = a_0 - a_1 \sqrt[4]{2} + a_2 \sqrt 2 - a_3 (\sqrt[4]{2})^3$. Fixed iff $a_1 = a_3 = 0$, so $\beta = a_0 + a_2 \sqrt 2 \in \mathbb{Q}(\sqrt 2)$. Hence the fixed field is $\mathbb{Q}(\sqrt 2)$.

By Galois correspondence (or direct check), the only intermediate field of degree $2$ is $\mathbb{Q}(\sqrt 2)$.

**Conclusion.**
$$\boxed{\text{Intermediate fields: } \mathbb{Q}, \; \mathbb{Q}(\sqrt 2), \; L = \mathbb{Q}(\sqrt[4]{2}).} \qquad \blacksquare$$

*Remark.* $L/\mathbb{Q}$ is not Galois (the extension is not normal: $L$ contains $\sqrt[4]{2}$ but not $i\sqrt[4]{2}$). Nonetheless, the subfield-finding remains valid.

---

> **Problem C6.** Prove: if $[L:F] = p$ is prime, then there are no intermediate fields strictly between $F$ and $L$.

**Solution C6.**

Let $F \subseteq K \subseteq L$ be a tower, with $[L : F] = p$ prime.

**Tower Law:**
$$[L : F] = [L : K] \cdot [K : F].$$

So $p = [L : K] \cdot [K : F]$.

Since $p$ is prime and $[L : K], [K : F]$ are positive integers, one of them equals $1$ and the other equals $p$:
- $[K : F] = 1, [L : K] = p$: then $K = F$ (an extension of degree $1$ is trivial).
- $[K : F] = p, [L : K] = 1$: then $K = L$.

Either way, $K = F$ or $K = L$. No strict intermediate subfield exists. $\blacksquare$

*Remark.* The analogue for groups: a simple group has no non-trivial normal subgroups. Prime-degree extensions are "simple" in this field-theoretic sense.

---

> **Problem C7.** Let $\alpha = \sqrt{2 + \sqrt 2}$. Find $[\mathbb{Q}(\alpha) : \mathbb{Q}]$.

**Solution C7.**

Let $\alpha = \sqrt{2 + \sqrt 2}$.

**Step 1: Find a polynomial annihilating $\alpha$.**

$$\alpha^2 = 2 + \sqrt 2 \implies \alpha^2 - 2 = \sqrt 2.$$

Square again:
$$(\alpha^2 - 2)^2 = 2 \implies \alpha^4 - 4\alpha^2 + 4 = 2 \implies \alpha^4 - 4\alpha^2 + 2 = 0.$$

So $\alpha$ satisfies $f(x) = x^4 - 4x^2 + 2$.

**Step 2: $f$ is irreducible over $\mathbb{Q}$.**

Apply Eisenstein at $p = 2$:
- $2 \mid -4, 0, 2$ (wait, coefficients are $a_4 = 1, a_3 = 0, a_2 = -4, a_1 = 0, a_0 = 2$).
- (1) $2 \mid 0, -4, 0, 2$ (all non-leading) ✓.
- (2) $2 \nmid 1$ ✓.
- (3) $4 \nmid 2$ ✓.

Eisenstein applies, so $f$ is irreducible over $\mathbb{Q}$.

**Step 3: Degree.**

$f$ is monic, irreducible, and $f(\alpha) = 0$, so $m_\alpha = f$ and
$$[\mathbb{Q}(\alpha) : \mathbb{Q}] = \deg f = \boxed{4}. \qquad \blacksquare$$

*Remark.* $\mathbb{Q}(\alpha)$ contains $\sqrt 2 = \alpha^2 - 2$, so $\mathbb{Q}(\sqrt 2) \subseteq \mathbb{Q}(\alpha)$. The tower $\mathbb{Q} \subseteq \mathbb{Q}(\sqrt 2) \subseteq \mathbb{Q}(\alpha)$ has degrees $2, 2$, totaling $4$. ✓

---

## Part D: Finite Fields and Geometric Constructibility

> **Problem D1.** List the elements of $\mathbb{F}_8$ explicitly and find a generator of $\mathbb{F}_8^\times$.

**Solution D1.**

**Construction.** $\mathbb{F}_8 = \mathbb{F}_{2^3} = \mathbb{F}_2[x]/\langle p(x)\rangle$ for any irreducible cubic $p \in \mathbb{F}_2[x]$.

*Choose $p(x) = x^3 + x + 1$.*

*Irreducibility:* Check roots in $\mathbb{F}_2 = \{0, 1\}$: $p(0) = 1, p(1) = 1 + 1 + 1 = 1$. No roots; degree $3$, so irreducible.

**Let $\alpha = \bar x$, so $\alpha^3 + \alpha + 1 = 0$, i.e., $\alpha^3 = \alpha + 1$ (in char $2$).**

**Elements of $\mathbb{F}_8$.** Basis over $\mathbb{F}_2$: $\{1, \alpha, \alpha^2\}$. So $|\mathbb{F}_8| = 2^3 = 8$:
$$\mathbb{F}_8 = \{0, 1, \alpha, \alpha + 1, \alpha^2, \alpha^2 + 1, \alpha^2 + \alpha, \alpha^2 + \alpha + 1\}.$$

**Claim: $\alpha$ generates $\mathbb{F}_8^\times$.**

$|\mathbb{F}_8^\times| = 7$, a prime, so any non-identity element has order $7$. Since $\alpha \neq 1$ (as $\alpha \notin \mathbb{F}_2$), $|\alpha| = 7$, hence $\alpha$ generates $\mathbb{F}_8^\times$.

**Explicit computation of powers of $\alpha$:**

$\alpha^1 = \alpha$.
$\alpha^2 = \alpha^2$.
$\alpha^3 = \alpha + 1$ (from the defining relation).
$\alpha^4 = \alpha \cdot \alpha^3 = \alpha(\alpha + 1) = \alpha^2 + \alpha$.
$\alpha^5 = \alpha \cdot \alpha^4 = \alpha(\alpha^2 + \alpha) = \alpha^3 + \alpha^2 = (\alpha + 1) + \alpha^2 = \alpha^2 + \alpha + 1$.
$\alpha^6 = \alpha \cdot \alpha^5 = \alpha(\alpha^2 + \alpha + 1) = \alpha^3 + \alpha^2 + \alpha = (\alpha + 1) + \alpha^2 + \alpha = \alpha^2 + 1$.
$\alpha^7 = \alpha \cdot \alpha^6 = \alpha(\alpha^2 + 1) = \alpha^3 + \alpha = (\alpha + 1) + \alpha = 1$.

Check: $\alpha^7 = 1$ ✓, $|\alpha| = 7 = |\mathbb{F}_8^\times|$.

**Discrete log table.** 

| Power | Element |
|---|---|
| $\alpha^0 = 1$ | $1$ |
| $\alpha^1$ | $\alpha$ |
| $\alpha^2$ | $\alpha^2$ |
| $\alpha^3$ | $\alpha + 1$ |
| $\alpha^4$ | $\alpha^2 + \alpha$ |
| $\alpha^5$ | $\alpha^2 + \alpha + 1$ |
| $\alpha^6$ | $\alpha^2 + 1$ |

$\boxed{\alpha \text{ generates } \mathbb{F}_8^\times.}$ $\blacksquare$

---

> **Problem D2.** Show that $\mathbb{F}_4 \nsubseteq \mathbb{F}_8$.

**Solution D2.**

**Subfield containment theorem** ([[27-finite-fields-and-extensions]]). For primes $p$ and positive integers $m, n$:
$$\mathbb{F}_{p^m} \subseteq \mathbb{F}_{p^n} \iff m \mid n.$$

*Apply with $p = 2, m = 2, n = 3$:* $2 \mid 3$? No, $3 = 1 \cdot 2 + 1$, so $2 \nmid 3$.

Hence $\mathbb{F}_4 = \mathbb{F}_{2^2} \nsubseteq \mathbb{F}_{2^3} = \mathbb{F}_8$. $\blacksquare$

*Alternative argument via degrees.* If $\mathbb{F}_4 \subseteq \mathbb{F}_8$, the tower law gives $[\mathbb{F}_8 : \mathbb{F}_2] = [\mathbb{F}_8 : \mathbb{F}_4] [\mathbb{F}_4 : \mathbb{F}_2]$, i.e., $3 = [\mathbb{F}_8 : \mathbb{F}_4] \cdot 2$. But $2 \nmid 3$ — contradiction.

$\boxed{\mathbb{F}_4 \nsubseteq \mathbb{F}_8.}$

---

> **Problem D3.** Determine all subfields of $\mathbb{F}_{64}$.

**Solution D3.**

$64 = 2^6$.

By the **subfield containment theorem**, the subfields of $\mathbb{F}_{2^n}$ are precisely $\mathbb{F}_{2^d}$ for each divisor $d$ of $n$.

*Divisors of $6$:* $\{1, 2, 3, 6\}$.

**Subfields of $\mathbb{F}_{64}$:**
$$\boxed{\mathbb{F}_2 \subseteq \mathbb{F}_4 \subseteq \mathbb{F}_{64}, \qquad \mathbb{F}_2 \subseteq \mathbb{F}_8 \subseteq \mathbb{F}_{64}.}$$

Total: $\mathbb{F}_2, \mathbb{F}_4, \mathbb{F}_8, \mathbb{F}_{64}$ — **4 subfields**.

*Subfield lattice.*
```
          F_64
         /    \
       F_4    F_8
         \    /
          F_2
```
Note $\mathbb{F}_4 \nsubseteq \mathbb{F}_8$ and $\mathbb{F}_8 \nsubseteq \mathbb{F}_4$ (Problem D2 type argument: $2 \nmid 3$ and $3 \nmid 2$). $\blacksquare$

---

> **Problem D4.** Count the number of monic irreducible polynomials of degree $3$ in $\mathbb{F}_2[x]$.

**Solution D4.**

**Strategy.** Elements of $\mathbb{F}_8$ that generate $\mathbb{F}_8$ over $\mathbb{F}_2$ (i.e., have minimal polynomial of degree exactly $3$) are precisely those in $\mathbb{F}_8 \setminus \mathbb{F}_2$ (since subfields of $\mathbb{F}_8$ are $\mathbb{F}_2$ and $\mathbb{F}_8$).

Count: $|\mathbb{F}_8 \setminus \mathbb{F}_2| = 8 - 2 = 6$ elements.

Each monic irreducible polynomial of degree $3$ over $\mathbb{F}_2$ has exactly $3$ roots in $\mathbb{F}_8$ (its roots, which are the conjugates under Frobenius $x \mapsto x^2$).

So the number of monic irreducible cubics is
$$\frac{6}{3} = \boxed{2}.$$

**Explicit listing.** The two monic irreducible cubics over $\mathbb{F}_2$ are
$$x^3 + x + 1 \quad \text{and} \quad x^3 + x^2 + 1.$$

*Check irreducibility:* neither has a root in $\mathbb{F}_2$:
- $x^3 + x + 1$: $p(0) = 1, p(1) = 1$ ✓.
- $x^3 + x^2 + 1$: $p(0) = 1, p(1) = 1 + 1 + 1 = 1$ ✓.

*Check these are the only ones.* There are $2^3 = 8$ monic cubics over $\mathbb{F}_2$: $x^3 + ax^2 + bx + c$ with $a, b, c \in \{0, 1\}$. We rule out those with a root:
- Root at $0$ means $c = 0$: $4$ polynomials.
- Root at $1$ means $1 + a + b + c = 0 \bmod 2$, i.e., $a + b + c = 1$: $4$ polynomials ($(a, b, c) \in \{(1, 0, 0), (0, 1, 0), (0, 0, 1), (1, 1, 1)\}$).
- Intersection (roots at both $0$ and $1$): $c = 0$ and $a + b = 1$: $(a, b, c) \in \{(1, 0, 0), (0, 1, 0)\}$, $2$ polynomials.

By inclusion-exclusion, polynomials with at least one root: $4 + 4 - 2 = 6$. Polynomials without roots: $8 - 6 = 2$, matching the count. The irreducibles are the two remaining:
- $x^3 + bx + c$ with $b = 1, c = 1$: $x^3 + x + 1$.
- $x^3 + x^2 + bx + c$ with... $a = 1$; requires $c \neq 0$ so $c = 1$; requires $a + b + c \neq 1 \bmod 2$, i.e., $1 + b + 1 = b \neq 1$, so $b = 0$. $x^3 + x^2 + 1$.

$\boxed{2 \text{ monic irreducible cubics: } x^3 + x + 1 \text{ and } x^3 + x^2 + 1.}$ $\blacksquare$

*General formula (Möbius inversion).* The number of monic irreducible polynomials of degree $n$ over $\mathbb{F}_q$ is
$$N_n(q) = \frac{1}{n} \sum_{d \mid n} \mu(n/d) q^d,$$
where $\mu$ is the Möbius function. For $q = 2, n = 3$: $N_3(2) = \tfrac{1}{3}(\mu(1) \cdot 2^3 + \mu(3) \cdot 2^1) = \tfrac{1}{3}(8 - 2) = 2$. ✓

---

> **Problem D5.** Prove: the **Frobenius** $\varphi_p: \mathbb{F}_{p^n} \to \mathbb{F}_{p^n}$, $\varphi_p(a) = a^p$, is a field automorphism.

**Solution D5.**

**Verify the four axioms of a field automorphism.**

*(a) Multiplicativity.*
$$\varphi_p(ab) = (ab)^p = a^p b^p = \varphi_p(a) \varphi_p(b). \checkmark$$
(Valid since $\mathbb{F}_{p^n}$ is commutative.)

*(b) Additivity (Freshman's Dream).*

We need $(a + b)^p = a^p + b^p$ in characteristic $p$.

Expand by the binomial theorem:
$$(a + b)^p = \sum_{k = 0}^p \binom{p}{k} a^k b^{p - k} = a^p + b^p + \sum_{k = 1}^{p - 1} \binom{p}{k} a^k b^{p - k}.$$

*Claim: $p \mid \binom{p}{k}$ for $1 \leq k \leq p - 1$.*

$\binom{p}{k} = \frac{p!}{k!(p - k)!}$. The numerator has $p$ as a factor; the denominator $k!(p - k)!$ with $1 \leq k \leq p - 1$ has each factor $< p$ (since both $k$ and $p - k$ are in $\{1, \ldots, p - 1\}$), so $p$ does not divide the denominator. Hence the prime $p$ appears in the numerator but not the denominator, so $p \mid \binom{p}{k}$.

In a field of characteristic $p$, multiplication by $p$ annihilates: $p \cdot x = 0$ for all $x$. So each middle term vanishes:
$$\binom{p}{k} a^k b^{p-k} = p \cdot \frac{\binom{p}{k}}{p} \cdot a^k b^{p-k} = 0.$$

Therefore
$$(a + b)^p = a^p + b^p. \quad \text{i.e.,} \quad \varphi_p(a + b) = \varphi_p(a) + \varphi_p(b). \checkmark$$

*(c) Preserves $1$.*
$$\varphi_p(1) = 1^p = 1. \checkmark$$

*(d) Bijective.*

*Injective:* $\varphi_p(a) = \varphi_p(b) \iff a^p = b^p \iff (a - b)^p = 0$ (by additivity) $\iff a - b = 0$ (since $\mathbb{F}_{p^n}$ has no non-zero nilpotents, being a field). So $a = b$.

*Surjective:* $\mathbb{F}_{p^n}$ is finite, and an injective map from a finite set to itself is surjective.

Hence $\varphi_p$ is a bijection, i.e., a field automorphism.

$$\boxed{\varphi_p \in \operatorname{Aut}(\mathbb{F}_{p^n}).} \qquad \blacksquare$$

*Refinement (fixed field).* The fixed field of $\varphi_p$ is $\{a \in \mathbb{F}_{p^n} : a^p = a\} = $ roots of $x^p - x$ in $\mathbb{F}_{p^n}$. By Fermat, $\mathbb{F}_p \subseteq $ this fixed set; by degree, the set has exactly $p$ elements, so equals $\mathbb{F}_p$. Hence $\operatorname{Fix}(\varphi_p) = \mathbb{F}_p$.

*Order of $\varphi_p$.* $(\varphi_p)^n(a) = a^{p^n} = a$ for all $a \in \mathbb{F}_{p^n}$ (since $\mathbb{F}_{p^n}^\times$ has order $p^n - 1$). For $m < n$, $\varphi_p^m \neq \operatorname{id}$ (else the fixed field would be $\mathbb{F}_{p^n}$, but it has size $p^m < p^n$). So $|\varphi_p| = n$. Hence $\operatorname{Aut}(\mathbb{F}_{p^n}/\mathbb{F}_p) = \langle\varphi_p\rangle \cong \mathbb{Z}/n\mathbb{Z}$.

---

> **Problem D6.** Prove that **doubling the cube is impossible** with straightedge and compass.

**Solution D6.**

**Setup.** To "double the cube" means: given a cube of volume $V$, construct a cube of volume $2V$ using only straightedge and compass. Equivalently, starting from a unit segment, construct a segment of length $\sqrt[3]{2}$.

**Key Theorem (Constructibility).** A real number $\alpha$ is constructible if and only if $\alpha$ lies in a field obtained from $\mathbb{Q}$ by a finite sequence of quadratic extensions. In particular, if $\alpha$ is constructible, then $[\mathbb{Q}(\alpha) : \mathbb{Q}]$ is a power of $2$.

*Proof sketch.* The constructible real numbers form a field closed under square roots. Starting from $\mathbb{Q}$ and iteratively adjoining square roots doubles the degree at each step, so the degree is always $2^k$ for some $k \geq 0$.

**Apply to $\sqrt[3]{2}$.**

$\sqrt[3]{2}$ satisfies $x^3 - 2 = 0$. This polynomial is irreducible over $\mathbb{Q}$ (Eisenstein at $2$). So the minimal polynomial is $m_{\sqrt[3]{2}}(x) = x^3 - 2$, and
$$[\mathbb{Q}(\sqrt[3]{2}) : \mathbb{Q}] = 3.$$

**But $3$ is not a power of $2$.**

Hence $\sqrt[3]{2}$ is **not constructible**, i.e., doubling the cube is impossible with straightedge and compass. $\blacksquare$

*Historical remark.* This was one of the three classical Delian problems, finally resolved by Pierre Wantzel in $1837$ using exactly this field-theoretic argument — centuries after the Greeks first posed it.

---

> **Problem D7.** Prove that the angle $60°$ cannot be trisected with straightedge and compass.

**Solution D7.**

**Setup.** Trisecting $60°$ means constructing an angle of $20°$, which is equivalent (via the cosine) to constructing $\cos 20°$.

**Derive a polynomial equation for $\cos 20°$.**

Use the triple-angle identity:
$$\cos 3\theta = 4 \cos^3 \theta - 3 \cos\theta.$$

With $\theta = 20°$, $3\theta = 60°$, and $\cos 60° = \tfrac 1 2$:
$$\tfrac 1 2 = 4 \cos^3 20° - 3 \cos 20°.$$

Let $\alpha = 2 \cos 20°$. Then $\cos 20° = \alpha/2$, and substituting:
$$\tfrac 1 2 = 4 \cdot \frac{\alpha^3}{8} - 3 \cdot \frac{\alpha}{2} = \frac{\alpha^3}{2} - \frac{3\alpha}{2}.$$

Multiply by $2$: $1 = \alpha^3 - 3\alpha$, i.e.,
$$\alpha^3 - 3\alpha - 1 = 0.$$

**Use Problem A1.** We showed $f(x) = x^3 - 3x - 1$ is irreducible over $\mathbb{Q}$.

Hence the minimal polynomial of $\alpha$ is $f$, and
$$[\mathbb{Q}(\alpha) : \mathbb{Q}] = 3.$$

**Apply constructibility.** $3$ is not a power of $2$, so $\alpha = 2 \cos 20°$ is not constructible. Since $\cos 20° = \alpha / 2$ and $2 \in \mathbb{Q}$ is constructible, constructibility of $\cos 20°$ would force constructibility of $\alpha$, a contradiction.

Therefore **$\cos 20°$ is not constructible**, and $60°$ cannot be trisected with straightedge and compass. $\blacksquare$

---

> **Problem D8.** Explain why **squaring the circle** is impossible.

**Solution D8.**

**Setup.** "Squaring the circle" means: given a circle of radius $1$ (area $\pi$), construct a square of the same area, i.e., a square of side length $\sqrt\pi$.

**Key Fact (Lindemann, 1882).** $\pi$ is **transcendental** over $\mathbb{Q}$ — it satisfies no non-zero polynomial equation with rational coefficients. In particular, $\pi$ is not algebraic.

**Constructible numbers are algebraic.**

*Proof.* A constructible number lies in some tower $\mathbb{Q} = K_0 \subseteq K_1 \subseteq \cdots \subseteq K_n$, with each step a quadratic extension. Hence $[K_n : \mathbb{Q}]$ is a finite power of $2$, and any element of $K_n$ satisfies a polynomial of degree $\leq [K_n : \mathbb{Q}]$ over $\mathbb{Q}$.

**Argue about $\sqrt\pi$.**

If $\sqrt\pi$ were algebraic over $\mathbb{Q}$, then $\pi = (\sqrt\pi)^2$ would be algebraic too (algebraic numbers form a field). This contradicts Lindemann's theorem.

Hence $\sqrt\pi$ is transcendental, and in particular not algebraic, and in particular not constructible.

**Conclusion.** Squaring the circle is impossible. $\blacksquare$

*Remark.* This problem is arguably the "hardest" of the three classical impossibilities. Unlike doubling the cube and trisecting the angle (resolved using degree arguments over $\mathbb{Q}$, established by Wantzel in 1837), squaring the circle requires the transcendence of $\pi$, a deep $19$th-century result whose proof uses techniques from complex analysis (Hermite's method of integral representations, extended by Lindemann and Weierstrass).

---

> **Problem D9.** Show $\mathbb{F}_{16}^\times$ is cyclic and find the order of each element's generator subgroup.

**Solution D9.**

**Cyclicity.**

**Theorem.** For any finite field $F$, the multiplicative group $F^\times$ is cyclic.

*Proof sketch.* Let $|F^\times| = n$. For each divisor $d$ of $n$, the equation $x^d = 1$ has at most $d$ roots in $F$ (polynomial of degree $d$ over an ID), so there are at most $d$ elements of order dividing $d$. Combined with the fact that $\sum_{d \mid n} \varphi(d) = n$ (Gauss's identity), one shows the number of elements of order exactly $d$ is exactly $\varphi(d)$. In particular, for $d = n$, there are $\varphi(n) > 0$ elements of order $n$, so $F^\times$ has a generator.

*Apply to $F = \mathbb{F}_{16}$.* $|\mathbb{F}_{16}^\times| = 15$, and $\mathbb{F}_{16}^\times$ is cyclic.

**Element orders.**

Since $\mathbb{F}_{16}^\times \cong \mathbb{Z}/15\mathbb{Z}$ (cyclic of order $15$), the order of any element divides $15$. Divisors of $15$: $\{1, 3, 5, 15\}$.

Number of elements of each order (by Gauss's formula, for a cyclic group of order $n$):
- Order $1$: $\varphi(1) = 1$ element — namely $1$.
- Order $3$: $\varphi(3) = 2$ elements.
- Order $5$: $\varphi(5) = 4$ elements.
- Order $15$: $\varphi(15) = \varphi(3) \varphi(5) = 2 \cdot 4 = 8$ elements — these are the generators.

*Consistency:* $1 + 2 + 4 + 8 = 15 = |\mathbb{F}_{16}^\times|$. ✓

**Summary.**

| Order | Count |
|---|---|
| $1$ | $1$ |
| $3$ | $2$ |
| $5$ | $4$ |
| $15$ | $8$ |

$\boxed{\mathbb{F}_{16}^\times \cong \mathbb{Z}/15\mathbb{Z}, \text{ with } 8 \text{ generators.}} \; \blacksquare$

*Structural interpretation.* The elements of order $3$ are the primitive $3$rd roots of unity (they generate the subgroup $\mathbb{F}_4^\times \subset \mathbb{F}_{16}^\times$). The elements of order $5$ are the primitive $5$th roots of unity. (Note that $5 \nmid 16 - 1 = 15$? Wait, $5 \mid 15$ so these do exist.)

---

> **Problem D10.** Prove: a regular heptagon (7-gon) is not constructible.

**Solution D10.**

**Setup.** A regular $7$-gon is constructible iff $\cos(2\pi/7)$ is a constructible real number.

**Reduction.** Let $\zeta_7 = e^{2\pi i/7}$ be a primitive $7$th root of unity. The real subfield $\mathbb{Q}(\zeta_7 + \zeta_7^{-1}) = \mathbb{Q}(\cos(2\pi/7))$ is a subfield of $\mathbb{Q}(\zeta_7)$.

**Compute $[\mathbb{Q}(\zeta_7) : \mathbb{Q}]$.**

$\zeta_7$ is a root of the $7$th cyclotomic polynomial $\Phi_7(x) = x^6 + x^5 + \cdots + x + 1$, which is irreducible over $\mathbb{Q}$ (Problem A4).

So the minimal polynomial of $\zeta_7$ has degree $6$, and
$$[\mathbb{Q}(\zeta_7) : \mathbb{Q}] = 6.$$

**Compute $[\mathbb{Q}(\cos(2\pi/7)) : \mathbb{Q}]$.**

Inside $\mathbb{Q}(\zeta_7)$, complex conjugation $\zeta_7 \mapsto \bar\zeta_7 = \zeta_7^{-1}$ is a $\mathbb{Q}$-automorphism of order $2$. Its fixed subfield is $\mathbb{Q}(\zeta_7 + \zeta_7^{-1}) = \mathbb{Q}(\cos(2\pi/7))$ (real part).

By the Galois correspondence (or direct calculation):
$$[\mathbb{Q}(\zeta_7) : \mathbb{Q}(\cos(2\pi/7))] = 2.$$

Tower law:
$$[\mathbb{Q}(\cos(2\pi/7)) : \mathbb{Q}] = \frac{[\mathbb{Q}(\zeta_7) : \mathbb{Q}]}{[\mathbb{Q}(\zeta_7) : \mathbb{Q}(\cos(2\pi/7))]} = \frac{6}{2} = 3.$$

**Apply constructibility.**

$3$ is not a power of $2$. So $\cos(2\pi/7)$ is not constructible, and the regular heptagon is not constructible with straightedge and compass. $\blacksquare$

*Remark.* **Gauss's criterion** (1796): a regular $n$-gon is constructible iff $n = 2^k \cdot p_1 \cdots p_m$, where the $p_i$ are distinct Fermat primes (primes of the form $2^{2^j} + 1$). The known Fermat primes are $3, 5, 17, 257, 65537$. $n = 7$ is not of this form, hence not constructible. Famously, Gauss proved the $17$-gon *is* constructible at age $19$.

---

### Solutions Overview

All problems above include complete solutions. Key techniques recap:

| Technique | Where applied |
|---|---|
| Rational Root Theorem | A1, A2 |
| Gauss's Lemma + Integer factorization attempt | C1 |
| Eisenstein's Criterion | A3, A4 (substitution), A6, A7 (substitution), A8, C7 |
| Reduction mod $p$ | A5 |
| First Isomorphism Theorem + Maximality | B1 |
| Extended Euclidean Algorithm | B3 |
| CRT for rings | B6 |
| Tower Law | C2, C3, C6 |
| Minimal polynomial construction | C1, C7 |
| Frobenius $a \mapsto a^p$ | D5 |
| Subfield lattice of finite fields | D2, D3 |
| Möbius-counted irreducibles | D4 |
| Constructibility $\Rightarrow$ degree is power of $2$ | D6, D7, D10 |
| Transcendence argument | D8 |

---

## Related Concepts
- [[26-fields-and-irreducibility]] — irreducibility toolkit used in Parts A and B
- [[27-finite-fields-and-extensions]] — classification theorems used in Parts C and D
- [[24-polynomial-rings]] — the division algorithm and Euclidean structure underlying Part B
- [[22-ideals-and-quotient-rings]] — maximal ideals ↔ fields (used throughout Part B)
- [[maths/Notes/AS/guide/00-index]] — master roadmap

---

**End of CO5 Practice Problems.** This chapter completes the problem sets. Next: [[maths/Notes/AS/guide/00-index]] — the master index.
