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

*Solution:* By the **Rational Root Theorem**, any rational root must be in $\{\pm 1\}$. Compute
$$f(1) = 1 - 3 - 1 = -3 \neq 0, \quad f(-1) = -1 + 3 - 1 = 1 \neq 0.$$
Since $f$ is a cubic with no rational root, and any nontrivial factorization of a cubic over $\mathbb{Q}$ must include a linear factor, $f$ is irreducible. $\blacksquare$

> **Problem A2.** Is $g(x) = x^4 + 2x^3 - x - 2$ irreducible over $\mathbb{Q}$? If not, factor it.

*Solution:* Rational root candidates: $\pm 1, \pm 2$.
$$g(1) = 1 + 2 - 1 - 2 = 0.$$
So $(x - 1) \mid g(x)$. Divide:
$$g(x) = (x-1)(x^3 + 3x^2 + 3x + 2).$$
For $h(x) = x^3 + 3x^2 + 3x + 2$: rational root candidates $\pm 1, \pm 2$. $h(-2) = -8 + 12 - 6 + 2 = 0$. So
$$h(x) = (x+2)(x^2 + x + 1).$$
The quadratic $x^2 + x + 1$ has discriminant $1 - 4 = -3 < 0$, so it's irreducible over $\mathbb{R}$, hence over $\mathbb{Q}$. Final factorization:
$$\boxed{g(x) = (x - 1)(x + 2)(x^2 + x + 1).} \quad \blacksquare$$

> **Problem A3.** Show that $f(x) = x^5 - 6x^3 + 2x^2 - 4x + 2$ is irreducible over $\mathbb{Q}$.

*Solution:* Apply **Eisenstein's criterion** with prime $p = 2$:
- $2 \mid -6, \; 2 \mid 2, \; 2 \mid -4, \; 2 \mid 2$ ✓ (all non-leading coefficients)
- $2 \nmid 1$ (leading coefficient) ✓
- $4 \nmid 2$ (constant term) ✓

All three Eisenstein conditions hold, so $f$ is irreducible over $\mathbb{Q}$. $\blacksquare$

> **Problem A4.** Prove that the **cyclotomic polynomial** $\Phi_7(x) = x^6 + x^5 + x^4 + x^3 + x^2 + x + 1$ is irreducible over $\mathbb{Q}$.

*Solution:* Use the substitution trick. Let $y = x + 1$, i.e., $x = y - 1$. Since
$$\Phi_7(x) = \frac{x^7 - 1}{x - 1},$$
we have
$$\Phi_7(y-1) = \frac{(y-1)^7 - 1}{(y-1) - 1} \cdot (-1) \cdot (-1) = \frac{(y-1)^7 - 1}{y - 2}? $$
Let's compute directly. $\Phi_7(y - 1) = \frac{(y-1)^7 - 1}{y - 2}$. Instead, the cleaner method: use
$$\Phi_p(y + 1) = \frac{(y+1)^p - 1}{y} = y^{p-1} + \binom{p}{1}y^{p-2} + \cdots + \binom{p}{p-1}.$$
For $p = 7$:
$$\Phi_7(y + 1) = y^6 + 7y^5 + 21y^4 + 35y^3 + 35y^2 + 21y + 7.$$
All middle coefficients are divisible by $7$, the leading coefficient is $1$ (not divisible by $7$), and the constant term is $7$, which is not divisible by $49$. By **Eisenstein at $p = 7$**, $\Phi_7(y + 1)$ is irreducible in $\mathbb{Q}[y]$. Irreducibility is preserved by the substitution $x \mapsto x - 1$ (which is a $\mathbb{Q}$-algebra automorphism of $\mathbb{Q}[x]$), so $\Phi_7(x)$ is irreducible over $\mathbb{Q}$. $\blacksquare$

> **Problem A5.** Use **reduction mod $p$** to show $f(x) = x^4 + x + 1$ is irreducible over $\mathbb{Q}$.

*Solution:* The polynomial is monic with integer coefficients. Reduce modulo $p = 2$:
$$\bar f(x) = x^4 + x + 1 \in \mathbb{F}_2[x].$$
Check for roots: $\bar f(0) = 1, \bar f(1) = 1 + 1 + 1 = 1$. No roots, so no linear factors. If reducible, $\bar f$ must factor as two irreducible quadratics. The only irreducible quadratic over $\mathbb{F}_2$ is $x^2 + x + 1$. Test:
$$(x^2 + x + 1)^2 = x^4 + x^2 + 1 \neq x^4 + x + 1.$$
So $\bar f$ is irreducible in $\mathbb{F}_2[x]$. By the reduction-mod-$p$ theorem, $f$ is irreducible in $\mathbb{Q}[x]$. $\blacksquare$

> **Problem A6.** Let $f(x) = 2x^5 + 6x^2 - 12$. Show $f$ is irreducible over $\mathbb{Q}$.

*Solution:* $f$ is not monic, but over $\mathbb{Q}$ we may clear the GCD of coefficients (here already primitive in $\mathbb{Z}[x]$: $\gcd(2, 6, -12) = 2$; dividing by $2$ is allowed over $\mathbb{Q}$, giving $x^5 + 3x^2 - 6$ with the same roots). Apply Eisenstein to $x^5 + 3x^2 - 6$ at $p = 3$:
- $3 \mid 3, \; 3 \mid -6$ ✓
- $3 \nmid 1$ ✓
- $9 \nmid -6$ ✓

So $x^5 + 3x^2 - 6$ is irreducible, hence so is $f(x) = 2(x^5 + 3x^2 - 6)$. $\blacksquare$

> **Problem A7.** Determine whether $f(x) = x^4 + 1$ is irreducible over $\mathbb{Q}$.

*Solution:* Try reduction mod $2$: $x^4 + 1 = (x+1)^4$ in $\mathbb{F}_2[x]$, reducible, so the mod-$2$ test is inconclusive. Try $p = 3$:
$$\bar f(0)=1, \bar f(1)=2, \bar f(2)=16+1=17\equiv 2 \pmod 3.$$
No roots. But $\bar f$ could still factor as two quadratics. Test $x^2 + ax + b$ with $a, b \in \mathbb{F}_3$: matching coefficients of $(x^2 + ax + b)(x^2 + cx + d) = x^4 + 1$ gives $a + c = 0, b + d + ac = 0, ad + bc = 0, bd = 1$. From $c = -a, bd = 1$ and $ad + bc = a(d - b) = 0$. Either $a = 0$ or $d = b$. If $a = 0$: $b + d = 0, bd = 1$, so $d = -b, -b^2 = 1, b^2 = -1 = 2$ in $\mathbb{F}_3$; $b^2 \in \{0, 1\}$, no solution. If $d = b$: $b^2 = 1$, so $b = \pm 1$; $2b + a \cdot (-a) = 0$ gives $2b = a^2$; for $b = 1$: $a^2 = 2$ has no solution in $\mathbb{F}_3$; for $b = -1$: $a^2 = -2 = 1$, so $a = \pm 1$. Check $(x^2 + x - 1)(x^2 - x - 1) = x^4 - 2x^2 - x^2 + 1 = x^4 - 3x^2 + 1 = x^4 + 1$ in $\mathbb{F}_3$ ✓. So $\bar f$ is **reducible** in $\mathbb{F}_3[x]$.

However, $x^4 + 1$ **is** irreducible in $\mathbb{Q}[x]$. The cleanest proof: use Eisenstein on $f(x + 1)$:
$$f(x + 1) = (x + 1)^4 + 1 = x^4 + 4x^3 + 6x^2 + 4x + 2.$$
Eisenstein at $p = 2$: $2 \mid 4, 6, 4, 2$ ✓; $2 \nmid 1$ ✓; $4 \nmid 2$ ✓. So $f(x + 1)$ is irreducible over $\mathbb{Q}$, hence so is $f(x)$. $\blacksquare$

**Remark:** This shows the **converse** of reduction-mod-$p$ fails: $f$ is irreducible over $\mathbb{Q}$ but $\bar f$ factors over $\mathbb{F}_3$. Also over $\mathbb{F}_2$.

> **Problem A8.** Let $f(x) = x^4 + 3x^3 + 3x^2 + 3x + 3 \in \mathbb{Z}[x]$. Is $f$ irreducible over $\mathbb{Q}$?

*Solution:* Apply Eisenstein at $p = 3$:
- $3 \mid 3, \; 3 \mid 3, \; 3 \mid 3, \; 3 \mid 3$ ✓
- $3 \nmid 1$ ✓
- $9 \nmid 3$ ✓

All Eisenstein conditions satisfied, so $f$ is irreducible over $\mathbb{Q}$. $\blacksquare$

---

## Part B: Fields from Quotients $F[x]/\langle p(x)\rangle$

> **Problem B1.** Show that $\mathbb{Q}[x]/\langle x^2 - 2\rangle \cong \mathbb{Q}(\sqrt 2)$.

*Solution:* Define $\varphi: \mathbb{Q}[x] \to \mathbb{Q}(\sqrt 2)$ by $\varphi(f) = f(\sqrt 2)$. This is a ring homomorphism (evaluation). It is surjective: $\varphi(a + bx) = a + b\sqrt 2$ hits every element of $\mathbb{Q}(\sqrt 2)$. The kernel contains $x^2 - 2$; since $x^2 - 2$ is irreducible over $\mathbb{Q}$ (no rational root by RRT, and any factorization of a quadratic with no root is a product of linears), $\langle x^2 - 2\rangle$ is maximal (Theorem 22.14 + Theorem 26.10). Since any strictly larger ideal equals $\mathbb{Q}[x]$, and $\ker\varphi \neq \mathbb{Q}[x]$ (else image would be $\{0\}$), we conclude $\ker\varphi = \langle x^2 - 2\rangle$. By the First Isomorphism Theorem:
$$\mathbb{Q}[x]/\langle x^2 - 2\rangle \cong \mathrm{Im}(\varphi) = \mathbb{Q}(\sqrt 2). \quad \blacksquare$$

> **Problem B2.** Construct a field of order $9$ explicitly.

*Solution:* We need $\mathbb{F}_{3^2}$. Take any monic irreducible quadratic $p(x) \in \mathbb{F}_3[x]$, say $p(x) = x^2 + 1$.

Check irreducibility: $p(0) = 1, p(1) = 2, p(2) = 5 = 2$. No roots, so $p$ is irreducible (quadratic with no root).

Then $\mathbb{F}_9 = \mathbb{F}_3[x]/\langle x^2 + 1\rangle$. Let $\alpha = [x]$, so $\alpha^2 = -1 = 2$. The elements are
$$\{a + b\alpha : a, b \in \mathbb{F}_3\} = \{0, 1, 2, \alpha, 1+\alpha, 2+\alpha, 2\alpha, 1+2\alpha, 2+2\alpha\}.$$
Multiplication example: $(1 + \alpha)(1 + \alpha) = 1 + 2\alpha + \alpha^2 = 1 + 2\alpha + 2 = 2\alpha$.

Sample inverse: $\alpha \cdot 2\alpha = 2\alpha^2 = 2 \cdot 2 = 4 = 1$, so $\alpha^{-1} = 2\alpha$. $\blacksquare$

> **Problem B3.** Let $K = \mathbb{Q}[x]/\langle x^3 - 2\rangle$. Find the inverse of $\alpha + 1$ in $K$, where $\alpha = [x]$.

*Solution:* Since $x^3 - 2$ is Eisenstein at $2$, it's irreducible, so $K$ is a field. Use the extended Euclidean algorithm on $x^3 - 2$ and $x + 1$ in $\mathbb{Q}[x]$:
$$x^3 - 2 = (x + 1)(x^2 - x + 1) - 3.$$
Thus $-3 = (x^3 - 2) - (x+1)(x^2 - x + 1)$, i.e.,
$$(x+1)(x^2 - x + 1) \equiv 3 \pmod{x^3 - 2}.$$
So $(x+1) \cdot \tfrac{1}{3}(x^2 - x + 1) \equiv 1 \pmod{x^3 - 2}$. Therefore
$$\boxed{(\alpha + 1)^{-1} = \tfrac{1}{3}(\alpha^2 - \alpha + 1).}$$
Verification: $(\alpha+1)(\alpha^2 - \alpha + 1) = \alpha^3 + 1 = 2 + 1 = 3$. ✓ $\blacksquare$

> **Problem B4.** Prove: $\mathbb{R}[x]/\langle x^2 + x + 1\rangle \cong \mathbb{C}$.

*Solution:* $x^2 + x + 1$ is irreducible over $\mathbb{R}$ (discriminant $1 - 4 = -3 < 0$), so the quotient is a field. Its dimension over $\mathbb{R}$ is $2$. Every $2$-dimensional field extension of $\mathbb{R}$ contains an element whose square is negative, and any such field is isomorphic to $\mathbb{C}$ (send $\alpha \mapsto \beta$ where $\beta$ satisfies the same minimal polynomial; explicitly, $\alpha = \omega = e^{2\pi i/3}$ works). More concretely:
$$\alpha = [x], \quad \alpha^2 = -\alpha - 1, \quad (2\alpha + 1)^2 = 4\alpha^2 + 4\alpha + 1 = 4(-\alpha - 1) + 4\alpha + 1 = -3.$$
So $\beta := \frac{2\alpha + 1}{\sqrt{3}}$ satisfies $\beta^2 = -1$, and $\mathbb{R}[\beta] \cong \mathbb{C}$. $\blacksquare$

> **Problem B5.** Count the units of $\mathbb{F}_2[x]/\langle x^2 + x + 1\rangle$.

*Solution:* $x^2 + x + 1$ is irreducible over $\mathbb{F}_2$ (check $p(0) = 1, p(1) = 1$, no roots), so the quotient is a field of order $4$. Every nonzero element is a unit, so there are $\boxed{3}$ units. $\blacksquare$

> **Problem B6.** Is $\mathbb{Q}[x]/\langle x^3 - x\rangle$ a field? If not, describe its structure.

*Solution:* $x^3 - x = x(x - 1)(x + 1)$ is reducible, so the quotient is **not a field**. By the Chinese Remainder Theorem for rings (since the three factors are pairwise coprime):
$$\mathbb{Q}[x]/\langle x(x-1)(x+1)\rangle \cong \mathbb{Q}[x]/\langle x\rangle \times \mathbb{Q}[x]/\langle x - 1\rangle \times \mathbb{Q}[x]/\langle x + 1\rangle \cong \mathbb{Q}^3.$$
This is a ring with exactly $8$ idempotents and $8 \cdot \infty$ units. $\blacksquare$

---

## Part C: Field Extensions, Minimal Polynomials, Tower Law

> **Problem C1.** Find the minimal polynomial of $\sqrt{2} + \sqrt{3}$ over $\mathbb{Q}$, and its degree.

*Solution:* Let $\alpha = \sqrt 2 + \sqrt 3$. Then
$$\alpha^2 = 2 + 2\sqrt 6 + 3 = 5 + 2\sqrt 6 \implies \alpha^2 - 5 = 2\sqrt 6 \implies (\alpha^2 - 5)^2 = 24.$$
So $\alpha^4 - 10\alpha^2 + 25 = 24$, giving
$$\boxed{f(x) = x^4 - 10x^2 + 1.}$$
**Irreducibility:** $f$ has no rational root (check $\pm 1$: $1 - 10 + 1 = -8, 1 - 10 + 1 = -8$), so no linear factors over $\mathbb{Q}$. If $f$ factors as two quadratics $f = (x^2 + ax + b)(x^2 + cx + d)$ with $a, b, c, d \in \mathbb{Z}$ (by Gauss), matching coefficients: $a + c = 0$, $ac + b + d = -10$, $ad + bc = 0$, $bd = 1$. From $c = -a$ and $bd = 1$: $(b, d) = (1, 1)$ or $(-1, -1)$. If $b = d = 1$: $-a^2 + 2 = -10 \Rightarrow a^2 = 12$, no integer solution. If $b = d = -1$: $-a^2 - 2 = -10 \Rightarrow a^2 = 8$, no integer solution. So $f$ is irreducible, and $[\mathbb{Q}(\alpha) : \mathbb{Q}] = \boxed{4}$. $\blacksquare$

> **Problem C2.** Compute $[\mathbb{Q}(\sqrt 2, \sqrt 3) : \mathbb{Q}]$.

*Solution:* The tower $\mathbb{Q} \subseteq \mathbb{Q}(\sqrt 2) \subseteq \mathbb{Q}(\sqrt 2, \sqrt 3)$. The first degree is $[\mathbb{Q}(\sqrt 2):\mathbb{Q}] = 2$. For the second, $\sqrt 3$ has minimal polynomial $x^2 - 3$ over $\mathbb{Q}$; we need to check this remains irreducible over $\mathbb{Q}(\sqrt 2)$. If $\sqrt 3 = a + b\sqrt 2$ with $a, b \in \mathbb{Q}$, then $3 = a^2 + 2b^2 + 2ab\sqrt 2$. Since $\sqrt 2 \notin \mathbb{Q}$, either $a = 0$ or $b = 0$. If $b = 0$: $\sqrt 3 = a$, impossible. If $a = 0$: $3 = 2b^2$, so $b^2 = 3/2$, impossible in $\mathbb{Q}$. So $\sqrt 3 \notin \mathbb{Q}(\sqrt 2)$, and $x^2 - 3$ remains irreducible. Thus $[\mathbb{Q}(\sqrt 2, \sqrt 3) : \mathbb{Q}(\sqrt 2)] = 2$, and by the tower law:
$$[\mathbb{Q}(\sqrt 2, \sqrt 3):\mathbb{Q}] = 2 \cdot 2 = \boxed{4}.$$
A $\mathbb{Q}$-basis: $\{1, \sqrt 2, \sqrt 3, \sqrt 6\}$. $\blacksquare$

> **Problem C3.** Let $\omega = e^{2\pi i/3}$. Compute $[\mathbb{Q}(\sqrt[3]{2}, \omega) : \mathbb{Q}]$.

*Solution:* We have $\omega$ is a root of $x^2 + x + 1$ (irreducible over $\mathbb{Q}$ since discriminant $-3 < 0$). So $[\mathbb{Q}(\omega) : \mathbb{Q}] = 2$. Also $\sqrt[3]{2}$ has minimal polynomial $x^3 - 2$ (Eisenstein), so $[\mathbb{Q}(\sqrt[3]{2}) : \mathbb{Q}] = 3$.

**Claim:** $[\mathbb{Q}(\sqrt[3]{2}, \omega) : \mathbb{Q}] = 6$.

By tower law, $[\mathbb{Q}(\sqrt[3]{2}, \omega):\mathbb{Q}]$ is divisible by both $3$ and $2$, hence $\geq 6$. Upper bound: $\omega$ satisfies $x^2 + x + 1$ over $\mathbb{Q}(\sqrt[3]{2})$, so $[\mathbb{Q}(\sqrt[3]{2}, \omega) : \mathbb{Q}(\sqrt[3]{2})] \leq 2$, giving $[\mathbb{Q}(\sqrt[3]{2}, \omega):\mathbb{Q}] \leq 3 \cdot 2 = 6$. Since $\mathbb{Q}(\sqrt[3]{2}) \subseteq \mathbb{R}$ and $\omega \notin \mathbb{R}$, actually $\omega \notin \mathbb{Q}(\sqrt[3]{2})$, so the upper bound $2$ is attained. Thus $[\mathbb{Q}(\sqrt[3]{2}, \omega) : \mathbb{Q}] = \boxed{6}$. $\blacksquare$

> **Problem C4.** Prove that $\sqrt 2 + \sqrt[3]{3}$ is algebraic over $\mathbb{Q}$ and give a bound on the degree of its minimal polynomial.

*Solution:* Both $\sqrt 2$ (degree $2$) and $\sqrt[3]{3}$ (degree $3$, by Eisenstein at $p = 3$) are algebraic over $\mathbb{Q}$. Thus $\mathbb{Q}(\sqrt 2, \sqrt[3]{3})$ is a finite extension of $\mathbb{Q}$ of degree at most $2 \cdot 3 = 6$. By the tower law, the degree is also divisible by $2$ and by $3$, hence equals $6$. Since $\sqrt 2 + \sqrt[3]{3} \in \mathbb{Q}(\sqrt 2, \sqrt[3]{3})$, it lies in a degree-$6$ extension of $\mathbb{Q}$. So its minimal polynomial has degree dividing $6$. In fact, one can show the minimal polynomial has degree exactly $6$, but the upper bound $\boxed{6}$ suffices here. $\blacksquare$

> **Problem C5.** Let $L = \mathbb{Q}(\sqrt[4]{2})$. Find all intermediate fields $\mathbb{Q} \subseteq K \subseteq L$.

*Solution:* The minimal polynomial of $\sqrt[4]{2}$ is $x^4 - 2$ (Eisenstein at $2$), so $[L:\mathbb{Q}] = 4$. By the tower law, $[K:\mathbb{Q}] \in \{1, 2, 4\}$. The three candidates are $K = \mathbb{Q}$, $K = L$, and some degree-$2$ extension. The element $(\sqrt[4]{2})^2 = \sqrt 2$ generates a degree-$2$ subfield $\mathbb{Q}(\sqrt 2) \subseteq L$. By the Galois correspondence (or direct check: subfields of a simple extension correspond to divisors of the minimal polynomial), this is the **only** intermediate proper subfield. So the intermediate fields are
$$\boxed{\mathbb{Q}, \; \mathbb{Q}(\sqrt 2), \; \mathbb{Q}(\sqrt[4]{2}) = L.} \quad \blacksquare$$

> **Problem C6.** Prove: if $[L:F] = p$ is prime, then there are no intermediate fields strictly between $F$ and $L$.

*Solution:* Suppose $F \subseteq K \subseteq L$. By the tower law, $[L:F] = [L:K][K:F]$, so $p = [L:K][K:F]$. Since $p$ is prime, either $[K:F] = 1$ (so $K = F$) or $[K:F] = p$ (so $[L:K] = 1$, hence $K = L$). So no strict intermediate subfield exists. $\blacksquare$

> **Problem C7.** Let $\alpha = \sqrt{2 + \sqrt 2}$. Find $[\mathbb{Q}(\alpha) : \mathbb{Q}]$.

*Solution:* $\alpha^2 = 2 + \sqrt 2$, so $(\alpha^2 - 2)^2 = 2$, giving $\alpha^4 - 4\alpha^2 + 4 = 2$, i.e.,
$$f(x) = x^4 - 4x^2 + 2.$$
Eisenstein at $p = 2$: $2 \mid -4, 2 \mid 2$; $2 \nmid 1$; $4 \nmid 2$. So $f$ is irreducible over $\mathbb{Q}$, and $[\mathbb{Q}(\alpha) : \mathbb{Q}] = \boxed{4}$. $\blacksquare$

---

## Part D: Finite Fields and Geometric Constructibility

> **Problem D1.** List the elements of $\mathbb{F}_8$ explicitly and find a generator of $\mathbb{F}_8^\times$.

*Solution:* Take $\mathbb{F}_8 = \mathbb{F}_2[x]/\langle x^3 + x + 1\rangle$. Check that $x^3 + x + 1$ is irreducible over $\mathbb{F}_2$: $p(0) = 1, p(1) = 1$, no roots, so irreducible (for degree $\leq 3$, no roots implies irreducible).

Let $\alpha = [x]$, so $\alpha^3 = \alpha + 1$. Elements of $\mathbb{F}_8$:
$$\{0, 1, \alpha, \alpha + 1, \alpha^2, \alpha^2 + 1, \alpha^2 + \alpha, \alpha^2 + \alpha + 1\}.$$

Compute powers of $\alpha$:
- $\alpha^1 = \alpha$
- $\alpha^2 = \alpha^2$
- $\alpha^3 = \alpha + 1$
- $\alpha^4 = \alpha \cdot \alpha^3 = \alpha^2 + \alpha$
- $\alpha^5 = \alpha \cdot \alpha^4 = \alpha^3 + \alpha^2 = \alpha^2 + \alpha + 1$
- $\alpha^6 = \alpha \cdot \alpha^5 = \alpha^3 + \alpha^2 + \alpha = \alpha^2 + 1$
- $\alpha^7 = \alpha \cdot \alpha^6 = \alpha^3 + \alpha = (\alpha + 1) + \alpha = 1$

Order of $\alpha$ is $7$, which is the order of $\mathbb{F}_8^\times$. So $\boxed{\alpha \text{ generates } \mathbb{F}_8^\times}$. $\blacksquare$

> **Problem D2.** Show that $\mathbb{F}_4 \nsubseteq \mathbb{F}_8$.

*Solution:* By the subfield containment theorem, $\mathbb{F}_{p^m} \subseteq \mathbb{F}_{p^n} \iff m \mid n$. Here $p = 2, m = 2, n = 3$; $2 \nmid 3$, so $\mathbb{F}_4 \nsubseteq \mathbb{F}_8$. $\blacksquare$

> **Problem D3.** Determine all subfields of $\mathbb{F}_{64}$.

*Solution:* $64 = 2^6$. Subfields of $\mathbb{F}_{2^6}$ are $\mathbb{F}_{2^d}$ for each $d \mid 6$. Divisors of $6$: $\{1, 2, 3, 6\}$. So the subfields are
$$\boxed{\mathbb{F}_2, \; \mathbb{F}_4, \; \mathbb{F}_8, \; \mathbb{F}_{64}.} \quad \blacksquare$$

> **Problem D4.** Count the number of monic irreducible polynomials of degree $3$ in $\mathbb{F}_2[x]$.

*Solution:* The elements of $\mathbb{F}_8$ that are **not** in a proper subfield are the elements with minimal polynomial of degree $3$ over $\mathbb{F}_2$. The only proper subfield is $\mathbb{F}_2$ (from D3 logic: divisors of $3$ are $1, 3$). So the set of degree-$3$ elements of $\mathbb{F}_8$ has size $|\mathbb{F}_8| - |\mathbb{F}_2| = 8 - 2 = 6$. Each monic irreducible polynomial of degree $3$ has exactly $3$ roots in $\mathbb{F}_8$, so the number of such polynomials is
$$\frac{6}{3} = \boxed{2}.$$
(These two polynomials are $x^3 + x + 1$ and $x^3 + x^2 + 1$.) $\blacksquare$

> **Problem D5.** Prove: the **Frobenius** $\varphi_p: \mathbb{F}_{p^n} \to \mathbb{F}_{p^n}$, $\varphi_p(a) = a^p$, is a field automorphism.

*Solution:*
- **Multiplicativity:** $\varphi_p(ab) = (ab)^p = a^p b^p = \varphi_p(a)\varphi_p(b)$.
- **Additivity:** $(a + b)^p = \sum_{k=0}^p \binom{p}{k} a^k b^{p-k}$. Since $p$ is prime, $p \mid \binom{p}{k}$ for $1 \leq k \leq p - 1$, so these terms vanish in characteristic $p$. Thus $(a+b)^p = a^p + b^p$, i.e., $\varphi_p(a+b) = \varphi_p(a) + \varphi_p(b)$.
- **$\varphi_p(1) = 1$** ✓.
- **Injective:** $\mathbb{F}_{p^n}$ is a field, so the kernel of $\varphi_p$ is $\{0\}$ (a nonzero $a$ with $a^p = 0$ would mean $a = 0$).
- **Surjective:** $\mathbb{F}_{p^n}$ is finite, so injective $\Rightarrow$ surjective.

So $\varphi_p \in \operatorname{Aut}(\mathbb{F}_{p^n})$. $\blacksquare$

> **Problem D6.** Prove that **doubling the cube is impossible** with straightedge and compass.

*Solution:* Doubling the cube means constructing a cube of volume twice that of a unit cube — i.e., constructing a segment of length $\sqrt[3]{2}$.

A real number $\alpha$ is **constructible** only if $[\mathbb{Q}(\alpha) : \mathbb{Q}]$ is a power of $2$ (key constructibility theorem: iterated quadratic extensions produce only $2$-power degrees).

The minimal polynomial of $\sqrt[3]{2}$ over $\mathbb{Q}$ is $x^3 - 2$ (Eisenstein at $2$), so
$$[\mathbb{Q}(\sqrt[3]{2}) : \mathbb{Q}] = 3,$$
which is **not** a power of $2$. Therefore $\sqrt[3]{2}$ is not constructible, and doubling the cube is impossible. $\blacksquare$

> **Problem D7.** Prove that the angle $60°$ cannot be trisected with straightedge and compass.

*Solution:* Trisecting $60°$ means constructing $\cos 20°$. Using the identity $\cos 3\theta = 4\cos^3\theta - 3\cos\theta$ with $\theta = 20°$:
$$\cos 60° = \tfrac{1}{2} = 4\cos^3 20° - 3\cos 20°.$$
Let $\alpha = 2\cos 20°$. Then $\tfrac{1}{2} = \tfrac{1}{2}\alpha^3 - \tfrac{3}{2}\alpha$, i.e.,
$$\alpha^3 - 3\alpha - 1 = 0.$$
By Problem A1, $f(x) = x^3 - 3x - 1$ is irreducible over $\mathbb{Q}$, so
$$[\mathbb{Q}(\alpha) : \mathbb{Q}] = 3.$$
This is not a power of $2$, so $\alpha$ is not constructible. Since $\cos 20° = \alpha/2$ has the same minimal polynomial degree, $\cos 20°$ is not constructible either. Therefore $60°$ cannot be trisected. $\blacksquare$

> **Problem D8.** Explain why **squaring the circle** is impossible.

*Solution:* Squaring a unit circle means constructing a square of area $\pi$, i.e., a segment of length $\sqrt\pi$.

Key fact (Lindemann, 1882): $\pi$ is **transcendental** over $\mathbb{Q}$, i.e., not a root of any nonzero polynomial in $\mathbb{Q}[x]$. In particular, $[\mathbb{Q}(\pi):\mathbb{Q}] = \infty$, and any algebraic operation on $\pi$ (such as taking $\sqrt\pi$) yields another transcendental (since $\mathbb{Q}(\sqrt\pi)/\mathbb{Q}(\pi)$ is degree $\leq 2$, so $[\mathbb{Q}(\sqrt\pi):\mathbb{Q}] = \infty$).

But constructible numbers are always algebraic (their minimal polynomial degrees are powers of $2$, which is finite). Since $\sqrt\pi$ is transcendental, it is not algebraic, hence not constructible. $\blacksquare$

> **Problem D9.** Show $\mathbb{F}_{16}^\times$ is cyclic and find the order of each element's generator subgroup.

*Solution:* By the structure theorem for finite fields, $\mathbb{F}_{p^n}^\times$ is cyclic of order $p^n - 1$. Here $|\mathbb{F}_{16}^\times| = 15$. Element orders divide $15$, so possible orders are $1, 3, 5, 15$. The count of elements of each order is $\varphi(d)$:
- order $1$: $\varphi(1) = 1$ element (namely $1$)
- order $3$: $\varphi(3) = 2$ elements
- order $5$: $\varphi(5) = 4$ elements
- order $15$: $\varphi(15) = 8$ elements (the generators)

Total: $1 + 2 + 4 + 8 = 15$ ✓. $\blacksquare$

> **Problem D10.** Prove: a regular heptagon (7-gon) is not constructible.

*Solution:* Constructing a regular $7$-gon requires constructing $\cos(2\pi/7)$, or equivalently constructing the primitive $7$th root of unity $\zeta_7 = e^{2\pi i/7}$. We have
$$[\mathbb{Q}(\zeta_7):\mathbb{Q}] = \deg \Phi_7 = 6$$
(Problem A4). The element $\cos(2\pi/7) = (\zeta_7 + \zeta_7^{-1})/2$ lies in the real subfield $\mathbb{Q}(\zeta_7 + \zeta_7^{-1})$, which has index $2$ in $\mathbb{Q}(\zeta_7)$. So
$$[\mathbb{Q}(\cos(2\pi/7)):\mathbb{Q}] = 3.$$
Since $3$ is not a power of $2$, $\cos(2\pi/7)$ is not constructible, and hence the regular heptagon is not constructible. $\blacksquare$

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
