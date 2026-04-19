---
title: "Finite Fields and Extensions"
type: guide
co: CO5
related: [26-fields-and-irreducibility, 21-integral-domains, 24-polynomial-rings]
---

# 27. Finite Fields and Extensions

This chapter develops **field extensions** — the process of enlarging a field $\mathbb{F}$ by adjoining roots of irreducible polynomials. The main results are: the classification of **finite fields** $\mathbb{F}_{p^n}$ (unique up to isomorphism for each prime power), the theory of **algebraic** and **transcendental** elements with their **minimal polynomials**, the **degree tower** $[L : \mathbb{F}] = [L : K][K : \mathbb{F}]$, the cyclicity of $\mathbb{F}_{p^n}^\times$, the Frobenius automorphism and the Galois group of $\mathbb{F}_{p^n}/\mathbb{F}_p$, and geometric applications: the impossibility of doubling the cube, trisecting an angle, and squaring the circle.

The central technical idea is that **polynomial quotients produce fields**: whenever $m(x) \in \mathbb{F}[x]$ is irreducible, $\mathbb{F}[x]/\langle m\rangle$ is a field, and every algebraic extension arises this way. All subsequent results — degree formulas, classifications, impossibilities — follow from this and the Euclidean nature of $\mathbb{F}[x]$.

---

## 27.1 Field Extensions — Definitions

> **Definition 27.1 (Field extension).** A **field extension** $L/\mathbb{F}$ is a pair of fields with $\mathbb{F} \subseteq L$, where $\mathbb{F}$ is a subfield of $L$ (i.e. $\mathbb{F}$ is closed under the operations of $L$ and contains $0_L, 1_L$).

$L$ is naturally an $\mathbb{F}$-**vector space**: scalar multiplication is the restriction of the multiplication in $L$ to $\mathbb{F} \times L \to L$. The vector space axioms are inherited from the field axioms of $L$ (distributivity, associativity, unit).

> **Definition 27.2 (Degree).** The **degree** of the extension $L/\mathbb{F}$, denoted $[L : \mathbb{F}]$, is the dimension of $L$ as an $\mathbb{F}$-vector space:
> $$[L : \mathbb{F}] \;:=\; \dim_{\mathbb{F}} L \;\in\; \{1, 2, 3, \ldots\} \cup \{\infty\}.$$
> The extension is **finite** if $[L : \mathbb{F}] < \infty$ and **infinite** otherwise.

Note $[L : \mathbb{F}] = 1$ iff $L = \mathbb{F}$ (since $\{1\}$ is already a basis).

**Example 1.** $[\mathbb{C} : \mathbb{R}] = 2$. A basis is $\{1, i\}$: every $z \in \mathbb{C}$ is uniquely $a + bi$ with $a, b \in \mathbb{R}$, so $\{1, i\}$ spans $\mathbb{C}$ over $\mathbb{R}$ and is linearly independent (if $a + bi = 0$ with $a, b \in \mathbb{R}$, then $a = b = 0$).

**Example 2.** $[\mathbb{R} : \mathbb{Q}] = \infty$. Proof: if $[\mathbb{R} : \mathbb{Q}] = n < \infty$ were finite, then $|\mathbb{R}| = |\mathbb{Q}^n| = \aleph_0$, contradicting the uncountability of $\mathbb{R}$. (A $\mathbb{Q}$-vector space of finite dimension $n$ is set-theoretically $\mathbb{Q}^n$, countable.)

**Example 3.** $[\mathbb{Q}(\sqrt 2) : \mathbb{Q}] = 2$, with basis $\{1, \sqrt 2\}$. See Theorem 27.6 (Example 11) for the verification.

**Example 4.** $[\mathbb{F}_4 : \mathbb{F}_2] = 2$. The dimension count: $|\mathbb{F}_4| = 4 = 2^2 = |\mathbb{F}_2|^2$, matching an $\mathbb{F}_2$-vector space of dimension $2$. In general, if $\mathbb{F}$ is finite with $q$ elements and $[L:\mathbb{F}] = n$, then $|L| = q^n$.

---

## 27.2 Algebraic and Transcendental Elements

> **Definition 27.3 (Algebraic/transcendental).** Let $L/\mathbb{F}$ be an extension and $\alpha \in L$. Then $\alpha$ is **algebraic over $\mathbb{F}$** if there exists a *nonzero* polynomial $p(x) \in \mathbb{F}[x]$ with $p(\alpha) = 0$. Otherwise, $\alpha$ is **transcendental over $\mathbb{F}$**.

Equivalently (writing the condition in terms of the evaluation homomorphism):

> The evaluation map $\operatorname{ev}_\alpha : \mathbb{F}[x] \to L$, $p(x) \mapsto p(\alpha)$, is an $\mathbb{F}$-algebra homomorphism. $\alpha$ is algebraic iff $\ker \operatorname{ev}_\alpha \neq \{0\}$, i.e. iff $\operatorname{ev}_\alpha$ is *not* injective.

**Example 5.** $\sqrt 2 \in \mathbb{R}$ is algebraic over $\mathbb{Q}$: the polynomial $p(x) = x^2 - 2 \in \mathbb{Q}[x]$ is nonzero and $p(\sqrt 2) = 2 - 2 = 0$.

**Example 6.** $i \in \mathbb{C}$ is algebraic over $\mathbb{R}$: $p(x) = x^2 + 1$ gives $p(i) = -1 + 1 = 0$.

**Example 7.** $e$ and $\pi$ are transcendental over $\mathbb{Q}$ (Hermite 1873; Lindemann 1882). These are deep analytic results — no algebraic proof exists. Consequently $[\mathbb{Q}(\pi) : \mathbb{Q}] = \infty$, since $\mathbb{Q}(\pi)$ is isomorphic to the rational function field $\mathbb{Q}(x)$ (the evaluation map at $\pi$ is injective on $\mathbb{Q}[x]$).

### Minimal polynomial

> **Theorem 27.4 (Minimal polynomial).** Let $L/\mathbb{F}$ be a field extension and $\alpha \in L$ algebraic over $\mathbb{F}$. There exists a *unique* monic irreducible polynomial $m_\alpha(x) \in \mathbb{F}[x]$, called the **minimal polynomial of $\alpha$ over $\mathbb{F}$**, such that:
>
> 1. $m_\alpha(\alpha) = 0$;
> 2. $m_\alpha(x) \mid p(x)$ for every $p(x) \in \mathbb{F}[x]$ with $p(\alpha) = 0$;
> 3. $m_\alpha(x)$ is the unique monic polynomial of minimal degree in $\mathbb{F}[x]$ vanishing at $\alpha$.

**Proof.** Let
$$I \;=\; \ker(\operatorname{ev}_\alpha) \;=\; \{\, p(x) \in \mathbb{F}[x] \,:\, p(\alpha) = 0 \,\}.$$

*Step 1 — $I$ is an ideal.* $I$ is the kernel of the ring homomorphism $\operatorname{ev}_\alpha$, hence automatically an ideal of $\mathbb{F}[x]$.

*Step 2 — $I$ is principal: $I = \langle m \rangle$ for a monic $m$.* The ring $\mathbb{F}[x]$ is a **principal ideal domain** ([[24-polynomial-rings]] Theorem 24.7): every ideal is generated by a single polynomial. So $I = \langle m(x) \rangle$ for some $m(x) \in \mathbb{F}[x]$, and since generators of an ideal in $\mathbb{F}[x]$ are unique up to multiplication by a unit (and units in $\mathbb{F}[x]$ are exactly the nonzero constants), we may — and do — choose $m$ to be **monic**. This fixes $m$ uniquely.

*Step 3 — $m \neq 0$.* Because $\alpha$ is algebraic, there is some nonzero $p \in \mathbb{F}[x]$ with $p(\alpha) = 0$. Then $p \in I$, so $I \neq \{0\}$, hence $m \neq 0$.

*Step 4 — $m$ is irreducible.* Suppose, for contradiction, that $m = f \cdot g$ with $f, g \in \mathbb{F}[x]$, $\deg f \ge 1$, $\deg g \ge 1$. Evaluate at $\alpha$:
$$0 \;=\; m(\alpha) \;=\; f(\alpha) \cdot g(\alpha).$$
Since $L$ is a field (hence an integral domain), $f(\alpha) = 0$ or $g(\alpha) = 0$. WLOG $f(\alpha) = 0$, so $f \in I = \langle m \rangle$, meaning $m \mid f$. But $\deg f < \deg m$ (since $\deg g \ge 1$), contradicting $m \mid f$ (a nonzero polynomial divisible by $m$ has degree $\ge \deg m$). So no such factorization exists — $m$ has no nontrivial factorization, and since $\deg m \ge 1$ (from Step 3 and the fact that $m$ is monic, nonzero, in $I$), $m$ is irreducible.

*Step 5 — Verify (1), (2), (3).*
- **(1)** $m \in I$, so $m(\alpha) = 0$. $\checkmark$
- **(2)** If $p \in \mathbb{F}[x]$ satisfies $p(\alpha) = 0$, then $p \in I = \langle m\rangle$, so $m \mid p$. $\checkmark$
- **(3)** Any monic polynomial $q \in I$ with $\deg q < \deg m$ would force $q = 0$ by minimality of $\deg m$ (since $\langle m \rangle$ contains no nonzero polynomial of smaller degree), contradicting $q$ monic. So $\deg m$ is the *minimal* degree among nonzero elements of $I$. Uniqueness of monic minimal-degree generator: if $m_1, m_2$ are both monic of minimal degree and both lie in $I$, then $m_1 - m_2 \in I$ has degree $< \deg m_1$, forcing $m_1 - m_2 = 0$. $\checkmark$

*Step 6 — Uniqueness of $m_\alpha$ satisfying (1), (2), monic, irreducible.* Suppose $n(x) \in \mathbb{F}[x]$ is monic, irreducible, with $n(\alpha) = 0$. Then $n \in I$, so $m \mid n$. Both are monic, so write $n = m \cdot h$ with $h \in \mathbb{F}[x]$, $h$ monic. Irreducibility of $n$ forces $h$ or $m$ to be a unit; $m$ is non-unit (since $\deg m \ge 1$), so $h$ is a monic unit, hence $h = 1$, hence $n = m$.

We have established uniqueness, and we write $m_\alpha := m$. $\blacksquare$

**Interpretive remark.** The minimal polynomial is simultaneously (i) the monic generator of the evaluation kernel, (ii) the unique monic irreducible factor common to all $p \in \mathbb{F}[x]$ vanishing at $\alpha$, and (iii) the monic polynomial of least degree with root $\alpha$. All three descriptions are equivalent *because $\mathbb{F}[x]$ is a PID* — the nontrivial structural input.

**Example 8.** Minimal polynomial of $\alpha = \sqrt[3] 2 \in \mathbb{R}$ over $\mathbb{Q}$.

*Setup.* $\alpha^3 = 2$, so $\alpha$ satisfies $p(x) = x^3 - 2 \in \mathbb{Q}[x]$.

*Irreducibility.* Eisenstein at $p = 2$: $2 \mid 0, 0, -2$ (non-leading); $2 \nmid 1$ (leading); $4 \nmid 2$ (constant). So $x^3 - 2$ is irreducible over $\mathbb{Q}$.

*Minimality.* Since $x^3 - 2$ is monic, irreducible, with $\alpha$ as root, by the uniqueness clause of Theorem 27.4 it is $m_\alpha$. $\boxed{m_{\sqrt[3] 2}(x) = x^3 - 2}$

**Example 9.** Minimal polynomial of $i$ over $\mathbb{R}$ is $m_i(x) = x^2 + 1$.

*Verify:* $x^2 + 1$ is monic; $i^2 + 1 = 0$; irreducible over $\mathbb{R}$ because its discriminant $0^2 - 4 \cdot 1 \cdot 1 = -4 < 0$ means no real roots, and a degree-$2$ polynomial with no root in the base field is irreducible there.

**Example 10.** Minimal polynomial of $\alpha = \sqrt 2 + \sqrt 3$ over $\mathbb{Q}$.

*Setup.* We seek a monic polynomial in $\mathbb{Q}[x]$ vanishing at $\alpha$ and prove it minimal.

*Computation (iterated squaring to eliminate radicals).*
1. $\alpha = \sqrt 2 + \sqrt 3$.
2. Square: $\alpha^2 = 2 + 2\sqrt 6 + 3 = 5 + 2\sqrt 6$.
3. Isolate $\sqrt 6$: $\alpha^2 - 5 = 2\sqrt 6$.
4. Square again to eliminate $\sqrt 6$: $(\alpha^2 - 5)^2 = 4 \cdot 6 = 24$.
5. Expand: $\alpha^4 - 10\alpha^2 + 25 = 24$, so $\alpha^4 - 10\alpha^2 + 1 = 0$.

So $\alpha$ is a root of $p(x) = x^4 - 10x^2 + 1 \in \mathbb{Q}[x]$, monic of degree $4$.

*Irreducibility of $p$ over $\mathbb{Q}$.* We rule out factorizations into lower-degree factors.

- **No rational root.** Rational Root Theorem: any rational root must be $\pm 1$. Check: $p(1) = 1 - 10 + 1 = -8$; $p(-1) = 1 - 10 + 1 = -8$. Neither is $0$. So no linear factor over $\mathbb{Q}$.
- **No factorization into two monic quadratics over $\mathbb{Q}$.** Suppose $p(x) = (x^2 + ax + b)(x^2 + cx + d)$ with $a, b, c, d \in \mathbb{Q}$. Expand:
  $$x^4 + (a+c) x^3 + (b + d + ac) x^2 + (ad + bc) x + bd.$$
  Matching coefficients of $p = x^4 + 0\cdot x^3 - 10 x^2 + 0\cdot x + 1$:
  - (i) $a + c = 0 \Rightarrow c = -a$;
  - (ii) $bd = 1$;
  - (iii) $ad + bc = 0 \Rightarrow ad - ab = a(d - b) = 0$;
  - (iv) $b + d + ac = b + d - a^2 = -10$.
  
  From (iii), either $a = 0$ or $b = d$.
  
  *Subcase $a = 0$:* then $c = 0$; (iv) gives $b + d = -10$ and (ii) gives $bd = 1$. So $b, d$ are roots of $t^2 + 10 t + 1 = 0$, with discriminant $100 - 4 = 96$, which is not a rational square (since $96 = 16 \cdot 6$ and $\sqrt 6 \notin \mathbb{Q}$). No rational solutions. $\times$
  
  *Subcase $b = d$:* then $b^2 = 1$ from (ii), so $b = d = \pm 1$. (iv): $2b - a^2 = -10$, so $a^2 = 2b + 10$.
  - If $b = 1$: $a^2 = 12$, not a rational square. $\times$
  - If $b = -1$: $a^2 = 8$, not a rational square. $\times$

No factorization exists in $\mathbb{Q}[x]$. So $p$ is irreducible over $\mathbb{Q}$.

*Conclusion.* $m_\alpha(x) = x^4 - 10 x^2 + 1$, of degree $4$. $\blacksquare$

*Verification by degree bound.* We show separately $[\mathbb{Q}(\sqrt 2, \sqrt 3) : \mathbb{Q}] = 4$ (Example 14 below), and $\sqrt 2 + \sqrt 3 \in \mathbb{Q}(\sqrt 2, \sqrt 3)$. One checks further that $\mathbb{Q}(\sqrt 2 + \sqrt 3) = \mathbb{Q}(\sqrt 2, \sqrt 3)$ (set $\beta = \sqrt 2 + \sqrt 3$; then $\beta^3 = 11\sqrt 2 + 9\sqrt 3$, so from $\beta$ and $\beta^3$ one solves linearly for $\sqrt 2, \sqrt 3$). Hence $[\mathbb{Q}(\alpha):\mathbb{Q}] = 4$, agreeing with $\deg m_\alpha = 4$.

---

## 27.3 Simple Extensions

> **Definition 27.5.** For $L/\mathbb{F}$ and $\alpha \in L$:
> - $\mathbb{F}[\alpha] := \{\, p(\alpha) : p(x) \in \mathbb{F}[x] \,\}$ is the smallest *subring* of $L$ containing $\mathbb{F}$ and $\alpha$ (equivalently, the image of $\operatorname{ev}_\alpha$);
> - $\mathbb{F}(\alpha)$ is the smallest *subfield* of $L$ containing $\mathbb{F}$ and $\alpha$.
>
> An extension of the form $\mathbb{F}(\alpha)/\mathbb{F}$ is called a **simple extension**.

In general $\mathbb{F}[\alpha] \subseteq \mathbb{F}(\alpha)$; the two are equal iff $\mathbb{F}[\alpha]$ is already a field.

> **Theorem 27.6 (Structure of a simple algebraic extension).** Let $L/\mathbb{F}$ be a field extension and $\alpha \in L$ algebraic over $\mathbb{F}$ with minimal polynomial $m_\alpha(x) \in \mathbb{F}[x]$ of degree $n$. Then:
>
> 1. $\mathbb{F}(\alpha) = \mathbb{F}[\alpha]$, and there is an isomorphism of $\mathbb{F}$-algebras
> $$\mathbb{F}[x] / \langle m_\alpha(x) \rangle \;\xrightarrow{\;\sim\;}\; \mathbb{F}(\alpha), \qquad \overline{p(x)} \mapsto p(\alpha).$$
> 2. The set $\{1, \alpha, \alpha^2, \ldots, \alpha^{n-1}\}$ is an $\mathbb{F}$-basis of $\mathbb{F}(\alpha)$.
> 3. $[\mathbb{F}(\alpha) : \mathbb{F}] = n = \deg m_\alpha$.

**Proof.**

*Step 1 — First Isomorphism Theorem on $\operatorname{ev}_\alpha$.* Consider the evaluation
$$\operatorname{ev}_\alpha \;:\; \mathbb{F}[x] \;\longrightarrow\; L, \qquad p(x) \mapsto p(\alpha).$$
This is an $\mathbb{F}$-algebra homomorphism. Its image is
$$\operatorname{Im}(\operatorname{ev}_\alpha) \;=\; \{p(\alpha) : p \in \mathbb{F}[x]\} \;=\; \mathbb{F}[\alpha],$$
and its kernel is $\langle m_\alpha \rangle$ (Theorem 27.4 identifies the kernel with the ideal generated by the minimal polynomial). By the First Isomorphism Theorem for rings,
$$\mathbb{F}[x]/\langle m_\alpha\rangle \;\cong\; \mathbb{F}[\alpha].$$

*Step 2 — $\mathbb{F}[\alpha]$ is a field, hence equals $\mathbb{F}(\alpha)$.* Since $m_\alpha$ is irreducible and $\mathbb{F}[x]$ is a PID, the principal ideal $\langle m_\alpha \rangle$ is maximal ([[24-polynomial-rings]]: in a PID, $\langle p \rangle$ maximal $\iff p$ irreducible). Hence $\mathbb{F}[x]/\langle m_\alpha \rangle$ is a field, and by Step 1 so is $\mathbb{F}[\alpha]$.

Now any field between $\mathbb{F}$ and $L$ that contains $\alpha$ must contain $\mathbb{F}[\alpha]$ (closure under addition/multiplication with $\mathbb{F}$ and $\alpha$ generates $\mathbb{F}[\alpha]$). Conversely, $\mathbb{F}[\alpha]$ *is* such a field. So $\mathbb{F}(\alpha) = \mathbb{F}[\alpha]$.

*Step 3 — Spanning set for $\mathbb{F}[\alpha]$.* Any element of $\mathbb{F}[\alpha]$ has the form $p(\alpha)$ for some $p \in \mathbb{F}[x]$. By the **division algorithm** in $\mathbb{F}[x]$ (which is Euclidean via the degree function), write
$$p(x) = q(x) \, m_\alpha(x) + r(x), \qquad \deg r < n.$$
Evaluate at $\alpha$: $m_\alpha(\alpha) = 0$ gives $p(\alpha) = r(\alpha)$. Writing $r(x) = c_0 + c_1 x + \cdots + c_{n-1} x^{n-1}$ with $c_i \in \mathbb{F}$,
$$p(\alpha) \;=\; c_0 + c_1 \alpha + \cdots + c_{n-1} \alpha^{n-1}.$$
So $\{1, \alpha, \ldots, \alpha^{n-1}\}$ spans $\mathbb{F}[\alpha] = \mathbb{F}(\alpha)$ over $\mathbb{F}$.

*Step 4 — Linear independence of $\{1, \alpha, \ldots, \alpha^{n-1}\}$.* Suppose there were a nontrivial $\mathbb{F}$-linear relation
$$c_0 + c_1 \alpha + \cdots + c_{n-1}\alpha^{n-1} = 0, \qquad \text{not all } c_i = 0.$$
Then $r(x) = c_0 + c_1 x + \cdots + c_{n-1} x^{n-1}$ is a nonzero polynomial of degree $< n$ with $r(\alpha) = 0$, contradicting Theorem 27.4(3) (the minimality of $\deg m_\alpha = n$). So no such relation exists.

*Step 5 — Degree.* Combining Steps 3, 4, $\{1, \alpha, \ldots, \alpha^{n-1}\}$ is an $\mathbb{F}$-basis of $\mathbb{F}(\alpha)$, so $[\mathbb{F}(\alpha) : \mathbb{F}] = n$. $\blacksquare$

**Interpretive remark.** Theorem 27.6 is the *structural* content of the theory: every simple algebraic extension is *abstractly* determined by the minimal polynomial. The quotient $\mathbb{F}[x]/\langle m\rangle$ is a "recipe" for constructing the extension, and Theorem 27.6 says the recipe produces a faithful model of $\mathbb{F}(\alpha)$. Two algebraic elements $\alpha, \beta$ with the same minimal polynomial $m$ give $\mathbb{F}(\alpha) \cong \mathbb{F}[x]/\langle m \rangle \cong \mathbb{F}(\beta)$ — in particular, **conjugate roots of the same minimal polynomial generate isomorphic extensions**, via an isomorphism sending $\alpha \mapsto \beta$.

### Examples

**Example 11.** $\mathbb{Q}(\sqrt 2)$.

*Setup.* $\alpha = \sqrt 2$, $m_\alpha(x) = x^2 - 2$ (irreducible over $\mathbb{Q}$ by the Rational Root Theorem: candidates $\pm 1, \pm 2$ all give $\pm 1$ or $\pm 2 \neq 0$).

*Apply Theorem 27.6.* $\mathbb{Q}(\sqrt 2) \cong \mathbb{Q}[x]/\langle x^2 - 2\rangle$; basis $\{1, \sqrt 2\}$; degree $2$.

*Explicit form.* $\mathbb{Q}(\sqrt 2) = \{a + b\sqrt 2 : a, b \in \mathbb{Q}\}$, with multiplication $(a + b\sqrt 2)(c + d\sqrt 2) = (ac + 2bd) + (ad + bc)\sqrt 2$ (using $(\sqrt 2)^2 = 2$).

*Inverses.* $(a + b\sqrt 2)^{-1} = \dfrac{a - b\sqrt 2}{a^2 - 2b^2}$ whenever $a + b\sqrt 2 \ne 0$. Note $a^2 - 2b^2 = 0$ with $a, b \in \mathbb{Q}$ forces $a = b = 0$ (else $\sqrt 2 = a/b \in \mathbb{Q}$, false).

**Example 12.** $\mathbb{Q}(\sqrt[3] 2)$.

*Setup.* $\alpha = \sqrt[3] 2$, $m_\alpha(x) = x^3 - 2$ (Eisenstein at $2$, Example 8).

*Basis.* $\{1, \alpha, \alpha^2\} = \{1, \sqrt[3] 2, \sqrt[3] 4\}$, degree $3$.

*Elements.* $\mathbb{Q}(\sqrt[3] 2) = \{a + b\sqrt[3] 2 + c\sqrt[3] 4 : a, b, c \in \mathbb{Q}\}$.

*Multiplication table (powers of $\alpha$):* $\alpha^3 = 2$, $\alpha^4 = 2\alpha$, $\alpha^5 = 2\alpha^2$. So any product of two elements reduces to a $\mathbb{Q}$-linear combination of $\{1, \alpha, \alpha^2\}$. For example:
$$(1 + \alpha)(1 + \alpha^2) = 1 + \alpha^2 + \alpha + \alpha^3 = 1 + \alpha^2 + \alpha + 2 = 3 + \alpha + \alpha^2.$$

**Example 13.** $\mathbb{R}(i) = \mathbb{C}$, of degree $[\mathbb{C} : \mathbb{R}] = 2$, with minimal polynomial $m_i(x) = x^2 + 1$ over $\mathbb{R}$. Theorem 27.6 gives the explicit isomorphism $\mathbb{R}[x]/\langle x^2 + 1\rangle \cong \mathbb{C}$, sending $\bar x \mapsto i$.

---

## 27.4 Degree Tower

> **Theorem 27.7 (Tower law).** Let $\mathbb{F} \subseteq K \subseteq L$ be a tower of fields. Then
> $$[L : \mathbb{F}] \;=\; [L : K] \cdot [K : \mathbb{F}].$$
> Moreover, if $\{u_1, \ldots, u_m\}$ is a $K$-basis of $L$ and $\{v_1, \ldots, v_n\}$ is an $\mathbb{F}$-basis of $K$, then $\{\,u_i v_j\,\}_{1 \le i \le m,\,1 \le j \le n}$ is an $\mathbb{F}$-basis of $L$.
>
> In particular, $L/\mathbb{F}$ is finite iff both $L/K$ and $K/\mathbb{F}$ are finite; and the equation is valid as an identity of cardinal numbers allowing $\infty$ (with $\infty \cdot k = \infty$ and $k \cdot \infty = \infty$ for $k \ge 1$).

**Proof.** We construct the basis $\{u_i v_j\}$ of $L/\mathbb{F}$ explicitly, then count.

*Step 1 — Spanning.* Let $\ell \in L$. Because $\{u_1, \ldots, u_m\}$ is a $K$-basis of $L$, there exist unique $a_1, \ldots, a_m \in K$ with
$$\ell \;=\; \sum_{i=1}^m a_i \, u_i. \tag{$\ast$}$$
Because $\{v_1, \ldots, v_n\}$ is an $\mathbb{F}$-basis of $K$, for each $i$ there exist unique $b_{i1}, \ldots, b_{in} \in \mathbb{F}$ with
$$a_i \;=\; \sum_{j=1}^n b_{ij} \, v_j. \tag{$\ast\ast$}$$
Substitute ($\ast\ast$) into ($\ast$):
$$\ell \;=\; \sum_{i=1}^m \left(\sum_{j=1}^n b_{ij} v_j\right) u_i \;=\; \sum_{i=1}^m \sum_{j=1}^n b_{ij} \, (u_i v_j).$$
So $\{u_i v_j\}_{i,j}$ spans $L$ over $\mathbb{F}$.

*Step 2 — Linear independence.* Suppose
$$\sum_{i,j} b_{ij} \, (u_i v_j) \;=\; 0 \qquad \text{with } b_{ij} \in \mathbb{F}. \tag{\dag}$$
Group the sum by $i$:
$$\sum_{i=1}^m \left(\sum_{j=1}^n b_{ij} v_j\right) u_i \;=\; 0.$$
The inner sum $\sum_j b_{ij} v_j$ is an element of $K$ (since $b_{ij} \in \mathbb{F} \subseteq K$ and $v_j \in K$). Since $\{u_1, \ldots, u_m\}$ is **$K$-linearly independent**, the coefficient of each $u_i$ vanishes:
$$\sum_{j=1}^n b_{ij} v_j \;=\; 0 \qquad (i = 1, \ldots, m).$$
Now $\{v_1, \ldots, v_n\}$ is **$\mathbb{F}$-linearly independent**, and the $b_{ij}$ are in $\mathbb{F}$. So for each $i$, $b_{ij} = 0$ for all $j$. Hence *all* $b_{ij} = 0$, proving linear independence.

*Step 3 — Count.* Steps 1 and 2 show $\{u_i v_j\}$ is an $\mathbb{F}$-basis of $L$, with $|\{u_i v_j\}| = m \cdot n$ (all pairs distinct since any relation $u_i v_j = u_{i'} v_{j'}$ with $(i,j) \neq (i', j')$ gives a nontrivial $\mathbb{F}$-dependence among basis elements, contradicting Step 2). So $[L : \mathbb{F}] = mn = [L:K] \cdot [K:\mathbb{F}]$.

*Step 4 — Infinite case.* If $[L : K] = \infty$ or $[K : \mathbb{F}] = \infty$, a similar argument with infinite index sets shows $[L:\mathbb{F}] = \infty$. Conversely, if both are finite, so is $[L : \mathbb{F}]$ by Step 3. $\blacksquare$

**Interpretive remark.** The tower law is the field-theoretic analogue of the multiplicative formula for indices of subgroups ($[G : K] = [G : H][H : K]$ for $K \le H \le G$). Both come down to a *bijective product* between two indexed families — cosets here, basis vectors there. The basis construction $\{u_i v_j\}$ is a concrete *tensor-product basis* realizing $L \cong K \otimes_{\mathbb{F}} (L/K)$-as-$\mathbb{F}$-vector-space.

### Applications

**Example 14.** $[\mathbb{Q}(\sqrt 2, \sqrt 3) : \mathbb{Q}] = 4$ with basis $\{1, \sqrt 2, \sqrt 3, \sqrt 6\}$.

*Setup.* Tower $\mathbb{Q} \subseteq \mathbb{Q}(\sqrt 2) \subseteq \mathbb{Q}(\sqrt 2, \sqrt 3)$.

*Step 1 — First rung: $[\mathbb{Q}(\sqrt 2) : \mathbb{Q}] = 2$.* Example 11.

*Step 2 — Second rung: $[\mathbb{Q}(\sqrt 2, \sqrt 3) : \mathbb{Q}(\sqrt 2)] = 2$.*

We claim $\sqrt 3 \notin \mathbb{Q}(\sqrt 2)$, hence $x^2 - 3$ remains the minimal polynomial of $\sqrt 3$ over $\mathbb{Q}(\sqrt 2)$.

*Proof of claim.* Suppose for contradiction $\sqrt 3 = a + b\sqrt 2$ with $a, b \in \mathbb{Q}$. Squaring:
$$3 \;=\; a^2 + 2ab \sqrt 2 + 2 b^2 \;=\; (a^2 + 2b^2) + 2ab \sqrt 2.$$
Since $1, \sqrt 2$ are $\mathbb{Q}$-linearly independent, we match coefficients:
- Coefficient of $\sqrt 2$: $2ab = 0$, so $a = 0$ or $b = 0$.
- Constant: $a^2 + 2b^2 = 3$.

*Subcase $a = 0$:* $2b^2 = 3$, $b^2 = 3/2$. No rational solution.

*Subcase $b = 0$:* $a^2 = 3$. No rational solution (since $\sqrt 3$ is irrational — by a Gauss Lemma / unique factorization argument, or the standard $p, q$-relatively-prime argument).

Contradiction, so $\sqrt 3 \notin \mathbb{Q}(\sqrt 2)$. Hence $x^2 - 3$ has no root in $\mathbb{Q}(\sqrt 2)$, so being degree $2$ it is irreducible there, and is the minimal polynomial of $\sqrt 3$ over $\mathbb{Q}(\sqrt 2)$. By Theorem 27.6, $[\mathbb{Q}(\sqrt 2)(\sqrt 3) : \mathbb{Q}(\sqrt 2)] = 2$.

*Step 3 — Combine via Tower Law.* $[\mathbb{Q}(\sqrt 2, \sqrt 3) : \mathbb{Q}] = 2 \cdot 2 = 4$.

*Step 4 — Basis.* Combine the $\mathbb{Q}$-basis $\{1, \sqrt 2\}$ of $\mathbb{Q}(\sqrt 2)$ with the $\mathbb{Q}(\sqrt 2)$-basis $\{1, \sqrt 3\}$ of $\mathbb{Q}(\sqrt 2, \sqrt 3)$:
$$\{1 \cdot 1,\; \sqrt 2 \cdot 1,\; 1 \cdot \sqrt 3,\; \sqrt 2 \cdot \sqrt 3\} \;=\; \{1,\; \sqrt 2,\; \sqrt 3,\; \sqrt 6\}.$$

*Verification.* Consistency: any element of $\mathbb{Q}(\sqrt 2, \sqrt 3)$ has the form $a + b\sqrt 2 + c\sqrt 3 + d\sqrt 6$ with unique $a, b, c, d \in \mathbb{Q}$. $\blacksquare$

**Example 15.** $[\mathbb{Q}(\sqrt[3] 2, \omega) : \mathbb{Q}] = 6$, where $\omega = e^{2\pi i/3} = -\tfrac 12 + \tfrac{\sqrt 3}{2} i$.

*Setup.* Tower $\mathbb{Q} \subseteq \mathbb{Q}(\sqrt[3] 2) \subseteq \mathbb{Q}(\sqrt[3] 2, \omega)$.

*Step 1 — First rung.* By Example 12, $[\mathbb{Q}(\sqrt[3] 2) : \mathbb{Q}] = 3$.

*Step 2 — Second rung.* $\omega$ satisfies $x^3 - 1 = (x - 1)(x^2 + x + 1) = 0$ with $\omega \ne 1$, so $\omega$ is a root of $x^2 + x + 1 \in \mathbb{Q}[x]$, which is irreducible over $\mathbb{Q}$ (discriminant $1 - 4 = -3 < 0$).

*Claim: $x^2 + x + 1$ remains irreducible over $\mathbb{Q}(\sqrt[3] 2)$.* Since $\mathbb{Q}(\sqrt[3] 2) \subseteq \mathbb{R}$ (all three basis elements $1, \sqrt[3] 2, \sqrt[3] 4$ are real), $\mathbb{Q}(\sqrt[3] 2)$ contains no non-real numbers. But the roots of $x^2 + x + 1$ are $\omega, \bar\omega \in \mathbb{C} \setminus \mathbb{R}$. Hence $x^2 + x + 1$ has no root in $\mathbb{Q}(\sqrt[3] 2)$, so being degree $2$ is irreducible there.

Therefore $[\mathbb{Q}(\sqrt[3] 2, \omega) : \mathbb{Q}(\sqrt[3] 2)] = 2$.

*Step 3 — Combine.* $[\mathbb{Q}(\sqrt[3] 2, \omega) : \mathbb{Q}] = 3 \cdot 2 = 6$.

*Interpretive remark.* $\mathbb{Q}(\sqrt[3] 2, \omega)$ is the **splitting field** of $x^3 - 2$ over $\mathbb{Q}$: it contains all three cube roots of $2$, namely $\sqrt[3] 2,\; \omega\sqrt[3] 2,\; \omega^2 \sqrt[3] 2$. Its degree $6$ over $\mathbb{Q}$ matches the order of $S_3$, the Galois group of $x^3 - 2$ over $\mathbb{Q}$.

---

## 27.5 Algebraic Extensions

> **Definition 27.8.** $L/\mathbb{F}$ is **algebraic** if every $\alpha \in L$ is algebraic over $\mathbb{F}$. Otherwise $L/\mathbb{F}$ is **transcendental** (some element is transcendental).

> **Theorem 27.9.** Every *finite* extension $L/\mathbb{F}$ is algebraic.

**Proof.** Let $n = [L : \mathbb{F}] < \infty$. Fix $\alpha \in L$ arbitrary.

*Step 1 — The $n+1$ powers $\{1, \alpha, \alpha^2, \ldots, \alpha^n\}$ lie in $L$.*

*Step 2 — Dimension count.* $\dim_{\mathbb{F}} L = n$, but we have listed $n + 1$ vectors. Any $n + 1$ vectors in an $n$-dimensional vector space are linearly dependent (standard linear algebra). So there exist $c_0, c_1, \ldots, c_n \in \mathbb{F}$, not all zero, with
$$c_0 \cdot 1 + c_1 \alpha + c_2 \alpha^2 + \cdots + c_n \alpha^n \;=\; 0.$$

*Step 3 — Produce the vanishing polynomial.* Let $p(x) = c_0 + c_1 x + \cdots + c_n x^n \in \mathbb{F}[x]$. Then $p$ is nonzero (not all $c_i$ are $0$) and $p(\alpha) = 0$. So $\alpha$ is algebraic over $\mathbb{F}$.

Since $\alpha \in L$ was arbitrary, $L/\mathbb{F}$ is algebraic. $\blacksquare$

**Warning (converse fails).** The converse of Theorem 27.9 is *false*: algebraic extensions need not be finite. The prototypical counterexample is $\overline{\mathbb{Q}}/\mathbb{Q}$, the field of algebraic numbers over $\mathbb{Q}$. Every element of $\overline{\mathbb{Q}}$ is algebraic over $\mathbb{Q}$ by construction, but $[\overline{\mathbb{Q}} : \mathbb{Q}] = \infty$ because $\overline{\mathbb{Q}}$ contains $\mathbb{Q}(\sqrt[n] 2)$ of degree $n$ for every $n \ge 1$, and $[\overline{\mathbb{Q}}:\mathbb{Q}] \ge n$ for every $n$.

**Corollary 27.9$^\prime$.** For $\alpha$ algebraic over $\mathbb{F}$, $\mathbb{F}(\alpha)/\mathbb{F}$ is finite (by Theorem 27.6) hence algebraic. More generally, the compositum $\mathbb{F}(\alpha_1, \ldots, \alpha_k)$ of finitely many algebraic elements is finite over $\mathbb{F}$ (by repeated application of the Tower Law), hence algebraic.

---

## 27.6 Finite Fields — Classification

> **Theorem 27.10 (Existence and uniqueness of finite fields).** For every prime $p$ and every integer $n \ge 1$, there exists a field $\mathbb{F}_{p^n}$ (also denoted $GF(p^n)$, the *Galois field*) of order $p^n$, unique up to isomorphism. Moreover, every finite field has prime-power order $p^n$ for some prime $p$ and $n \ge 1$.

**Proof.** We prove four claims: (a) every finite field has prime-power order; (b) existence of a field of order $p^n$; (c) any field of order $p^n$ is a splitting field of $x^{p^n} - x$ over $\mathbb{F}_p$; (d) uniqueness up to isomorphism.

*Claim (a) — prime-power order.*

Let $F$ be a finite field. The characteristic $\operatorname{char}(F)$ is prime — for if $\operatorname{char}(F) = mn$ with $m, n > 1$, then $(m \cdot 1_F)(n \cdot 1_F) = 0$ in an integral domain gives $m \cdot 1_F = 0$ or $n \cdot 1_F = 0$, contradicting minimality; so $\operatorname{char}(F)$ is $0$ or prime, and finiteness rules out $0$ (a field of characteristic $0$ contains $\mathbb{Q}$, hence is infinite).

Let $p = \operatorname{char}(F)$. The prime subfield is $\mathbb{F}_p = \{0, 1, 2\cdot 1, \ldots, (p-1)\cdot 1\}$. Viewing $F$ as an $\mathbb{F}_p$-vector space of some (necessarily finite) dimension $n$, $|F| = |\mathbb{F}_p|^n = p^n$.

*Claim (b) — existence of a field of order $p^n$.*

**Construction.** Let $q = p^n$ and consider $f(x) = x^q - x \in \mathbb{F}_p[x]$. Let $K$ be a **splitting field** of $f$ over $\mathbb{F}_p$: $K \supseteq \mathbb{F}_p$ is a field in which $f$ splits as a product of linear factors, and is generated over $\mathbb{F}_p$ by the roots of $f$. (Splitting fields exist by the standard iterated quotient construction in $\mathbb{F}_p[x]$.)

Let $R = \{\alpha \in K : \alpha^q = \alpha\}$ be the set of roots of $f$ in $K$.

**$R$ is a subfield of $K$.**
- $0, 1 \in R$: $0^q = 0$, $1^q = 1$. $\checkmark$
- Closed under addition: if $\alpha, \beta \in R$, then $(\alpha + \beta)^q \stackrel{\text{Frob.}^n}{=} \alpha^q + \beta^q = \alpha + \beta$, using the freshman's dream $(a + b)^p = a^p + b^p$ in characteristic $p$ (iterated $n$ times to get $(a + b)^{p^n} = a^{p^n} + b^{p^n}$).
- Closed under multiplication: $(\alpha\beta)^q = \alpha^q \beta^q = \alpha\beta$. $\checkmark$
- Closed under additive inverses: $(-\alpha)^q = (-1)^q \alpha^q = (-1)^q \alpha$. If $p$ is odd, $(-1)^q = -1$; if $p = 2$, $-1 = 1$ so $-\alpha = \alpha$ and $(-\alpha)^q = \alpha^q = \alpha = -\alpha$. Either way, $(-\alpha)^q = -\alpha$, so $-\alpha \in R$. $\checkmark$
- Closed under multiplicative inverses: for $\alpha \in R^\times = R \setminus \{0\}$, $(\alpha^{-1})^q = (\alpha^q)^{-1} = \alpha^{-1}$. $\checkmark$

So $R$ is a subfield of $K$, and contains $\mathbb{F}_p$ (since every $\alpha \in \mathbb{F}_p$ satisfies $\alpha^p = \alpha$ by Fermat's little theorem, so $\alpha^q = \alpha^{p^n} = \alpha$ by iteration).

**$|R| = q$.** Every root of $f$ lies in $R$ by definition, and $R$ consists exactly of roots. It remains to show $f$ has $q$ *distinct* roots in $K$. Compute the formal derivative
$$f'(x) \;=\; q x^{q-1} - 1 \;=\; -1 \pmod p,$$
since $q = p^n \equiv 0 \pmod p$. So $\gcd(f, f') = \gcd(x^q - x, -1) = 1$, meaning $f$ is separable (no repeated roots). Hence $f$ has exactly $\deg f = q$ distinct roots in its splitting field, all in $R$. So $|R| = q$.

Since $R \supseteq \mathbb{F}_p$ and $R$ is generated by roots of $f$ (it *is* the set of roots), $R = K$. We have produced a field of order $q = p^n$.

*Claim (c) — characterization.* Any field $F$ of order $p^n$ has $F^\times$ of order $p^n - 1$; by Lagrange's theorem (in the group $F^\times$), every $\alpha \in F^\times$ satisfies $\alpha^{p^n - 1} = 1$, so $\alpha^{p^n} = \alpha$. Including $\alpha = 0$ (which trivially satisfies $0^{p^n} = 0$), every element of $F$ is a root of $f(x) = x^{p^n} - x$. Since $|F| = p^n = \deg f$, $f$ splits completely over $F$ with roots being all of $F$. So $F$ is a splitting field of $f$ over $\mathbb{F}_p$.

*Claim (d) — uniqueness.* Any two splitting fields of the same polynomial over $\mathbb{F}_p$ are isomorphic (standard result: splitting fields are unique up to $\mathbb{F}_p$-isomorphism — the isomorphism extends the identity on $\mathbb{F}_p$). Hence any two fields of order $p^n$ are isomorphic. $\blacksquare$

**Interpretive remark.** The proof uses three key ingredients:
- the **Frobenius endomorphism** $a \mapsto a^p$ (Step: "closed under addition") to make $R$ a subring;
- **separability** ($f' = -1$, a unit) to count roots;
- **uniqueness of splitting fields** to get isomorphism.

### Structure of $\mathbb{F}_{p^n}$

Summary of key structural facts (each proved below):

- $|\mathbb{F}_{p^n}| = p^n$ (by definition);
- $\operatorname{char}(\mathbb{F}_{p^n}) = p$ (since $\mathbb{F}_p \subseteq \mathbb{F}_{p^n}$);
- $\mathbb{F}_{p^n}$ contains $\mathbb{F}_p$ as its prime subfield;
- $\mathbb{F}_{p^n}^\times$ is **cyclic** of order $p^n - 1$ (Theorem 27.10$^\prime$ below);
- $\mathbb{F}_{p^m} \subseteq \mathbb{F}_{p^n}$ iff $m \mid n$ (Theorem 27.10$^{\prime\prime}$ below).

> **Theorem 27.10$^\prime$ (Multiplicative group is cyclic).** For any finite field $F$, the multiplicative group $F^\times$ is cyclic.

**Proof.** Let $|F^\times| = N$. We will show $F^\times$ has an element of order $N$, hence is cyclic.

*Step 1 — Use the structure of finite abelian groups.* $F^\times$ is a finite abelian group. By the **structure theorem** (or primary decomposition), $F^\times$ is cyclic iff for every divisor $d \mid N$ there are at most $d$ elements $\alpha \in F^\times$ with $\alpha^d = 1$.

Why this criterion works: in a non-cyclic finite abelian group, there are at least two independent elements of prime order $p$ for some prime $p$, generating a subgroup of order $p^2$ containing $p^2 > p$ solutions of $x^p = 1$, contradicting the "at most $d$" criterion with $d = p$.

*Step 2 — Bound number of roots in a field.* For any $d \mid N$, consider the polynomial $x^d - 1 \in F[x]$. Over the *field* $F$, this polynomial has at most $\deg = d$ roots in $F$ (a polynomial over an integral domain has at most $\deg$ roots). So at most $d$ solutions $\alpha \in F^\times$ with $\alpha^d = 1$.

*Step 3 — Conclude.* By Step 1's criterion, $F^\times$ is cyclic. $\blacksquare$

**Interpretive remark.** The key fact powering this proof is that $F$ is a **field**, hence an integral domain — the polynomial $x^d - 1$ cannot have more than $d$ roots. In a non-integral-domain ring like $\mathbb{Z}/8\mathbb{Z}$, $x^2 - 1$ can have $4$ roots ($\pm 1, \pm 3$). The cyclicity of $F^\times$ is therefore a *field-theoretic* fact, not a general fact about commutative ring units.

> **Theorem 27.10$^{\prime\prime}$ (Subfield structure).** $\mathbb{F}_{p^m}$ is a subfield of $\mathbb{F}_{p^n}$ iff $m \mid n$.

**Proof.**

*Direction 1: $\mathbb{F}_{p^m} \subseteq \mathbb{F}_{p^n} \Longrightarrow m \mid n$.*

If $\mathbb{F}_{p^m} \subseteq \mathbb{F}_{p^n}$, apply the Tower Law to $\mathbb{F}_p \subseteq \mathbb{F}_{p^m} \subseteq \mathbb{F}_{p^n}$:
$$n \;=\; [\mathbb{F}_{p^n} : \mathbb{F}_p] \;=\; [\mathbb{F}_{p^n} : \mathbb{F}_{p^m}] \cdot [\mathbb{F}_{p^m} : \mathbb{F}_p] \;=\; [\mathbb{F}_{p^n} : \mathbb{F}_{p^m}] \cdot m.$$
So $m \mid n$.

*Direction 2: $m \mid n \Longrightarrow \mathbb{F}_{p^m} \subseteq \mathbb{F}_{p^n}$.*

Suppose $m \mid n$, say $n = mk$. We show $\mathbb{F}_{p^n}$ contains a copy of $\mathbb{F}_{p^m}$.

*Step 1 — Arithmetic lemma.* In the ring $\mathbb{Z}$, $m \mid n$ implies $(p^m - 1) \mid (p^n - 1)$. Proof: using $n = mk$,
$$p^n - 1 \;=\; (p^m)^k - 1 \;=\; (p^m - 1)\bigl((p^m)^{k-1} + (p^m)^{k-2} + \cdots + p^m + 1\bigr),$$
so $(p^m - 1) \mid (p^n - 1)$.

*Step 2 — Consequently $(x^{p^m} - x) \mid (x^{p^n} - x)$ in $\mathbb{F}_p[x]$.* Write $d = p^m - 1$ and $D = p^n - 1$; we've shown $d \mid D$, say $D = d \cdot e$. Then
$$x^{p^n} - x \;=\; x(x^{D} - 1) \;=\; x(x^{de} - 1),$$
and $x^{de} - 1 = (x^d)^e - 1$ is divisible by $x^d - 1$ (via the same factorization as Step 1 with $a = x^d$: $a^e - 1 = (a-1)(a^{e-1} + \cdots + 1)$). So
$$x^{p^n} - x \;=\; x(x^d - 1) \cdot (\text{polynomial}) \;=\; (x^{p^m} - x) \cdot (\text{polynomial}).$$

*Step 3 — Subfield existence.* Let $\mathbb{F}_{p^n}$ be our fixed field of order $p^n$. The set
$$S \;=\; \{\alpha \in \mathbb{F}_{p^n} : \alpha^{p^m} = \alpha\}$$
is a subfield of $\mathbb{F}_{p^n}$ by the same argument as in Claim (b) of Theorem 27.10 (closure under $+, \cdot, -, {}^{-1}$ using the freshman's dream).

*Step 4 — $|S| = p^m$.* $S$ consists of the roots in $\mathbb{F}_{p^n}$ of $x^{p^m} - x$. Since $x^{p^m} - x$ divides $x^{p^n} - x$ (Step 2) and $x^{p^n} - x$ splits completely in $\mathbb{F}_{p^n}$ (by Theorem 27.10(c)), $x^{p^m} - x$ splits completely in $\mathbb{F}_{p^n}$ with all $p^m$ roots distinct (separability: its derivative is $-1$, a unit). So $|S| = p^m$.

*Step 5 — $S$ is a field of order $p^m$, hence isomorphic to $\mathbb{F}_{p^m}$.* By Theorem 27.10(d), $S \cong \mathbb{F}_{p^m}$.

So $\mathbb{F}_{p^n}$ contains a (unique) copy of $\mathbb{F}_{p^m}$. $\blacksquare$

**Interpretive remark.** The subfield lattice of $\mathbb{F}_{p^n}$ is isomorphic to the divisor lattice of $n$:
$$\text{Subfields of } \mathbb{F}_{p^n} \;\longleftrightarrow\; \text{Divisors of } n, \qquad \mathbb{F}_{p^m} \leftrightarrow m.$$
E.g., $\mathbb{F}_{2^{12}}$ has $6$ subfields, one for each divisor of $12 = 2^2 \cdot 3$: $\mathbb{F}_2, \mathbb{F}_4, \mathbb{F}_8, \mathbb{F}_{16}, \mathbb{F}_{64}, \mathbb{F}_{4096}$.

### Examples

**Example 16.** $\mathbb{F}_4 = \mathbb{F}_2[x]/\langle x^2 + x + 1\rangle$.

*Setup.* $x^2 + x + 1 \in \mathbb{F}_2[x]$: check for roots in $\mathbb{F}_2 = \{0, 1\}$. $0^2 + 0 + 1 = 1 \ne 0$; $1^2 + 1 + 1 = 3 \equiv 1 \ne 0$. No roots, degree $2$, so irreducible.

*Construction.* $\mathbb{F}_4 = \mathbb{F}_2[x]/\langle x^2 + x + 1\rangle = \{0, 1, \bar x, 1 + \bar x\}$, writing $\alpha = \bar x$. Basis: $\{1, \alpha\}$.

*Multiplication.* $\alpha^2 + \alpha + 1 = 0$ in $\mathbb{F}_4$, so $\alpha^2 = -\alpha - 1 = \alpha + 1$ (since $-1 = 1$ in characteristic $2$). Hence:
- $\alpha \cdot \alpha = \alpha + 1$;
- $\alpha \cdot (\alpha + 1) = \alpha^2 + \alpha = (\alpha + 1) + \alpha = 2\alpha + 1 = 1$; so $\alpha^{-1} = \alpha + 1$;
- $(\alpha + 1)^2 = \alpha^2 + 2\alpha + 1 = \alpha^2 + 1 = (\alpha + 1) + 1 = \alpha$.

*Multiplicative group.* $\mathbb{F}_4^\times = \{1, \alpha, \alpha + 1\}$ of order $3$, cyclic (automatic from Theorem 27.10$^\prime$). Powers of $\alpha$: $\alpha^1 = \alpha$, $\alpha^2 = \alpha + 1$, $\alpha^3 = \alpha \cdot \alpha^2 = \alpha(\alpha + 1) = 1$. So $\alpha$ is a generator (primitive element).

**Example 17.** $\mathbb{F}_8 = \mathbb{F}_2[x]/\langle x^3 + x + 1\rangle$.

*Setup.* Irreducibility of $x^3 + x + 1$ over $\mathbb{F}_2$: check $0^3 + 0 + 1 = 1 \ne 0$, $1^3 + 1 + 1 = 1 \ne 0$. No linear factors; degree $3$; irreducible.

*Construction.* $\mathbb{F}_8 = \mathbb{F}_2[\alpha]$ where $\alpha^3 = \alpha + 1$, with basis $\{1, \alpha, \alpha^2\}$. Eight elements:
$$\mathbb{F}_8 \;=\; \{a + b\alpha + c\alpha^2 : a, b, c \in \{0, 1\}\}.$$

*Subfield structure.* By Theorem 27.10$^{\prime\prime}$, subfields $\mathbb{F}_{2^d}$ for $d \mid 3$, i.e. $d \in \{1, 3\}$: only $\mathbb{F}_2$ and $\mathbb{F}_8$. So **$\mathbb{F}_4 \not\subseteq \mathbb{F}_8$** (since $2 \nmid 3$), a common student error to avoid.

**Example 18.** $\mathbb{F}_9 = \mathbb{F}_3[x]/\langle x^2 + 1\rangle$.

*Setup.* Check $x^2 + 1$ over $\mathbb{F}_3$: $0^2 + 1 = 1 \ne 0$, $1^2 + 1 = 2 \ne 0$, $2^2 + 1 = 5 \equiv 2 \ne 0$. Irreducible.

*Construction.* $\mathbb{F}_9 = \mathbb{F}_3[\alpha]$ with $\alpha^2 = -1 = 2$, basis $\{1, \alpha\}$. Nine elements:
$$\mathbb{F}_9 \;=\; \{a + b\alpha : a, b \in \mathbb{F}_3\}.$$

*Multiplicative group order.* $|\mathbb{F}_9^\times| = 8$; cyclic; generator: $\alpha + 1$ has order $8$ (compute: $(\alpha+1)^2 = 2\alpha$, $(\alpha+1)^4 = 4\alpha^2 = 8 \equiv 2$, $(\alpha+1)^8 = 4 \equiv 1$).

*Subfields.* Divisors of $2$: $\{1, 2\}$, giving $\mathbb{F}_3, \mathbb{F}_9$. No intermediate.

---

## 27.7 Frobenius Automorphism

> **Theorem 27.11 (Frobenius generates Galois group).** Let $F = \mathbb{F}_{p^n}$. The map
> $$\phi_p \;:\; F \to F, \qquad \phi_p(a) = a^p$$
> is a field automorphism of $F$ fixing $\mathbb{F}_p$ pointwise, and $\operatorname{Gal}(F/\mathbb{F}_p) := \operatorname{Aut}_{\mathbb{F}_p}(F)$ is **cyclic of order $n$**, generated by $\phi_p$:
> $$\operatorname{Gal}(\mathbb{F}_{p^n}/\mathbb{F}_p) \;=\; \langle \phi_p\rangle \;\cong\; \mathbb{Z}/n\mathbb{Z}.$$

**Proof.** We establish four claims: (i) $\phi_p$ is a ring homomorphism; (ii) $\phi_p$ is bijective; (iii) $\phi_p$ fixes $\mathbb{F}_p$; (iv) the order of $\phi_p$ in $\operatorname{Aut}(F)$ is exactly $n$, and it generates the whole $\mathbb{F}_p$-automorphism group.

*(i) $\phi_p$ is a ring homomorphism.*

- **Multiplicativity:** $\phi_p(ab) = (ab)^p = a^p b^p = \phi_p(a)\phi_p(b)$.
- **Additivity (freshman's dream).** In characteristic $p$,
$$(a + b)^p \;=\; \sum_{k=0}^p \binom{p}{k} a^k b^{p-k}.$$
For $1 \le k \le p - 1$, $\binom{p}{k} = \frac{p!}{k!(p-k)!}$ has $p$ in the numerator and nothing cancelling it from the denominator (since $1 \le k \le p-1$ means $k!$ and $(p-k)!$ are products of integers $< p$, hence coprime to $p$). So $p \mid \binom{p}{k}$ and in $F$ (of characteristic $p$), $\binom{p}{k} = 0$. Only the $k = 0$ and $k = p$ terms survive: $(a + b)^p = a^p + b^p$. $\checkmark$
- **Unit preserved:** $\phi_p(1) = 1^p = 1$. $\checkmark$

*(ii) $\phi_p$ is bijective.* $\phi_p$ is a ring homomorphism from a field to itself. Its kernel is an ideal of $F$, hence $\{0\}$ or $F$; since $\phi_p(1) = 1 \ne 0$, the kernel is $\{0\}$, so $\phi_p$ is **injective**. Since $F$ is finite, an injective self-map is also **surjective**. So $\phi_p$ is a bijection, hence an automorphism.

*(iii) $\phi_p$ fixes $\mathbb{F}_p$.* By Fermat's Little Theorem, $a^p = a$ for all $a \in \mathbb{F}_p$. So $\phi_p(a) = a$ for $a \in \mathbb{F}_p$, showing $\phi_p \in \operatorname{Aut}_{\mathbb{F}_p}(F)$.

*(iv) Order of $\phi_p$ and generation of the Galois group.*

**Upper bound on order.** $\phi_p^n(a) = a^{p^n} = a$ for all $a \in F$ (by Claim (c) of Theorem 27.10: every $a \in \mathbb{F}_{p^n}$ satisfies $a^{p^n} = a$). So $\phi_p^n = \operatorname{id}_F$, and the order of $\phi_p$ divides $n$.

**Lower bound on order.** Suppose $\phi_p^d = \operatorname{id}_F$ for some $1 \le d < n$. Then every $a \in F$ satisfies $a^{p^d} = a$, meaning every element is a root of $x^{p^d} - x$. But this polynomial has at most $p^d < p^n = |F|$ roots in $F$ (a polynomial over a field has at most $\deg$ roots). So not every $a \in F$ can satisfy this, contradiction.

Hence the order of $\phi_p$ is exactly $n$.

**Galois group order.** We invoke the *Galois correspondence for finite fields* (proved independently in any Galois theory text): $|\operatorname{Gal}(\mathbb{F}_{p^n}/\mathbb{F}_p)| = [\mathbb{F}_{p^n}:\mathbb{F}_p] = n$. Alternatively, one can prove this directly: an $\mathbb{F}_p$-automorphism $\sigma$ of $\mathbb{F}_{p^n}$ is determined by $\sigma(\gamma)$ for a primitive element $\gamma$, and $\sigma(\gamma)$ must be a root of $\gamma$'s minimal polynomial over $\mathbb{F}_p$, which has at most $n$ roots in $\mathbb{F}_{p^n}$. So $|\operatorname{Aut}_{\mathbb{F}_p}(\mathbb{F}_{p^n})| \le n$.

**Conclusion.** $\langle\phi_p\rangle \le \operatorname{Gal}(\mathbb{F}_{p^n}/\mathbb{F}_p)$ has order $n$ (by order of $\phi_p$) $= |\operatorname{Gal}(\mathbb{F}_{p^n}/\mathbb{F}_p)|$. So $\langle\phi_p\rangle = \operatorname{Gal}(\mathbb{F}_{p^n}/\mathbb{F}_p)$, and the Galois group is cyclic of order $n$. $\blacksquare$

**Interpretive remark.** The Frobenius is the *canonical* symmetry of $\mathbb{F}_{p^n}$: it is the unique generator of the Galois group up to inversion, and its powers realize *all* field automorphisms of $\mathbb{F}_{p^n}$ fixing $\mathbb{F}_p$. The fixed field of $\phi_p^d$ (for $d \mid n$) is exactly $\mathbb{F}_{p^d}$, giving the Galois-correspondence dictionary:
$$\{\text{subgroups of } \langle\phi_p\rangle\} \;\stackrel{1{:}1}{\longleftrightarrow}\; \{\text{intermediate fields } \mathbb{F}_p \subseteq K \subseteq \mathbb{F}_{p^n}\},$$
which under $d \mapsto \langle \phi_p^{n/d}\rangle$ matches divisors of $n$ with subfields $\mathbb{F}_{p^d}$.

---

## 27.8 Geometric Constructibility

**Compass-and-straightedge constructions** build new points from a starting set (usually $\{(0, 0), (1, 0)\}$) using two operations: *draw a line through two constructed points*, and *draw a circle centered at a constructed point with radius equal to a constructed distance*. A real number $\alpha$ is **constructible** if, starting from $\{0, 1\} \subseteq \mathbb{R}$, one can produce the point $(\alpha, 0)$ in finitely many operations.

> **Theorem 27.12 (Algebraic characterization of constructibility).** A real number $\alpha$ is constructible iff $\alpha$ lies in a field $\mathbb{F}_k$ at the top of a tower
> $$\mathbb{Q} \;=\; \mathbb{F}_0 \subseteq \mathbb{F}_1 \subseteq \cdots \subseteq \mathbb{F}_k \subseteq \mathbb{R}$$
> with each step of degree $2$: $[\mathbb{F}_i : \mathbb{F}_{i-1}] = 2$ for $i = 1, \ldots, k$.
>
> In particular, if $\alpha$ is constructible then $[\mathbb{Q}(\alpha) : \mathbb{Q}]$ is a power of $2$.

**Sketch of proof.**

*Direction ($\Rightarrow$).* Each compass-and-straightedge step produces new coordinates that are rational functions (of existing coordinates) possibly involving a single square root (from intersection of a line and a circle, or two circles, which boil down to solving a quadratic). So each step extends the current coordinate field by a degree-$2$ extension.

*Direction ($\Leftarrow$).* A degree-$2$ extension over a field $F \subseteq \mathbb{R}$ is of the form $F(\sqrt d)$ for some $d \in F$ with $d > 0$; the square root $\sqrt d$ is constructible from $d$ (classical construction: erect a semicircle on a diameter of length $1 + d$ and drop a perpendicular at the junction point, of length $\sqrt d$). Iterate.

*Degree consequence.* Under the tower, $[\mathbb{F}_k : \mathbb{Q}] = 2^k$. For $\alpha \in \mathbb{F}_k$, $\mathbb{Q}(\alpha) \subseteq \mathbb{F}_k$, so $[\mathbb{Q}(\alpha) : \mathbb{Q}] \mid 2^k$ (by the Tower Law), hence a power of $2$. $\blacksquare$

### Classical impossibilities

**Impossibility 1 (Doubling the cube — Delian problem).** It is impossible to construct, with compass and straightedge, a cube with volume exactly twice that of a given unit cube.

*Setup.* Equivalent to constructing the real number $\sqrt[3] 2$ (so that a side of length $\sqrt[3] 2$ gives a cube of volume $2$).

*Apply Theorem 27.12.* $[\mathbb{Q}(\sqrt[3] 2) : \mathbb{Q}] = 3$ (Example 8). But $3$ is *not* a power of $2$. So $\sqrt[3] 2$ is not constructible, hence doubling the cube is impossible. $\blacksquare$

**Impossibility 2 (Trisecting a $60°$ angle).** It is impossible to construct, with compass and straightedge, an angle of $20°$ from an angle of $60°$.

*Setup.* A $60°$ angle is constructible (via the equilateral triangle construction, as $\cos 60° = 1/2 \in \mathbb{Q}$ and $\sin 60° = \sqrt 3/2 \in \mathbb{Q}(\sqrt 3)$ are both constructible). Trisecting it is equivalent to constructing $\cos 20°$ (since a $20°$ angle corresponds to a point $(\cos 20°, \sin 20°)$ on the unit circle, whose $x$-coordinate gives $\cos 20°$, and vice versa).

*Derive a cubic for $\cos 20°$.* The triple-angle formula:
$$\cos(3\theta) \;=\; 4\cos^3\theta - 3\cos\theta.$$
Plug in $\theta = 20°$: $\cos 60° = 1/2$, so
$$\tfrac 12 \;=\; 4 \cos^3 20° - 3 \cos 20°.$$
Let $\alpha = \cos 20°$. Then $4\alpha^3 - 3\alpha - \tfrac 12 = 0$, i.e.
$$8\alpha^3 - 6\alpha - 1 \;=\; 0.$$

*Irreducibility of $p(x) = 8 x^3 - 6 x - 1$ over $\mathbb{Q}$.* We show $p$ has no rational root, hence (being degree $3$) is irreducible.

By the Rational Root Theorem, any rational root $r/s$ of $p$ (in lowest terms) satisfies $r \mid 1$ and $s \mid 8$. So $r/s \in \{\pm 1, \pm \tfrac12, \pm\tfrac 14, \pm\tfrac 18\}$. Check each:
- $p(1) = 8 - 6 - 1 = 1 \ne 0$;
- $p(-1) = -8 + 6 - 1 = -3 \ne 0$;
- $p(1/2) = 8 \cdot \tfrac 18 - 6 \cdot \tfrac 12 - 1 = 1 - 3 - 1 = -3 \ne 0$;
- $p(-1/2) = -1 + 3 - 1 = 1 \ne 0$;
- $p(1/4) = 8 \cdot \tfrac 1{64} - 6 \cdot \tfrac 14 - 1 = \tfrac 18 - \tfrac 32 - 1 \ne 0$;
- $p(-1/4) = -\tfrac 18 + \tfrac 32 - 1 = \tfrac 38 \ne 0$;
- $p(1/8) = 8 \cdot \tfrac 1{512} - \tfrac 68 - 1 = \tfrac 1{64} - \tfrac 34 - 1 \ne 0$;
- $p(-1/8) = -\tfrac 1{64} + \tfrac 34 - 1 \ne 0$.

No rational roots; degree $3$; hence irreducible. So $m_\alpha(x) = \tfrac 18 (8 x^3 - 6 x - 1)$ is the monic minimal polynomial of $\alpha = \cos 20°$ over $\mathbb{Q}$ (after dividing by the leading coefficient $8$ to monicize, noting division by $8 \in \mathbb{Q}^\times$ preserves irreducibility). Concretely, $m_\alpha(x) = x^3 - \tfrac 34 x - \tfrac 18$.

*Apply Theorem 27.12.* $[\mathbb{Q}(\cos 20°) : \mathbb{Q}] = 3$, which is not a power of $2$. So $\cos 20°$ is not constructible. Hence trisecting $60°$ is impossible. $\blacksquare$

**Impossibility 3 (Squaring the circle).** It is impossible to construct, with compass and straightedge, a square with area equal to that of a given unit circle.

*Setup.* Equivalent to constructing $\sqrt\pi$ (a square of side $\sqrt\pi$ has area $\pi$, matching a unit circle's area).

*Apply Theorem 27.12.* If $\sqrt\pi$ were constructible, $[\mathbb{Q}(\sqrt\pi) : \mathbb{Q}]$ would be finite (a power of $2$), so $\sqrt\pi$ would be algebraic over $\mathbb{Q}$. Then $\pi = (\sqrt\pi)^2 \in \mathbb{Q}(\sqrt\pi)$ would also be algebraic over $\mathbb{Q}$ (a subfield of algebraic numbers). But $\pi$ is **transcendental** over $\mathbb{Q}$ (Lindemann, 1882). Contradiction.

Hence $\sqrt\pi$ is not constructible, and squaring the circle is impossible. $\blacksquare$

*Remark.* These three impossibility results were among the most famous unsolved problems of antiquity (Greek geometry, 5th century BCE onwards). All three were resolved in the 19th century by the development of Galois theory and transcendence theory. The first two (doubling, trisection) were settled by **Pierre Wantzel (1837)** using essentially the argument above. The third (squaring) required **Lindemann's transcendence theorem (1882)**.

---

## 27.9 Practice Problems

> **Problem 1.** Find $[\mathbb{Q}(\sqrt 5, \sqrt 7) : \mathbb{Q}]$ and exhibit a basis.

> **Problem 2.** Find the minimal polynomial of $\sqrt 2 + 1$ over $\mathbb{Q}$.

> **Problem 3.** Determine whether $\mathbb{F}_{25}$ contains $\mathbb{F}_5$ as a subfield, and whether it contains $\mathbb{F}_{125}$.

> **Problem 4.** Compute $[\mathbb{Q}(\sqrt[4] 2) : \mathbb{Q}]$.

> **Problem 5.** Show that the set of algebraic numbers $\overline{\mathbb{Q}}$ is a subfield of $\mathbb{C}$.

> **Problem 6.** List all subfields of $\mathbb{F}_{64}$.

> **Problem 7.** Show that the regular pentagon is constructible — i.e. that $\cos(2\pi/5)$ is constructible.

---

### Solutions

**Solution 1.**

*Setup.* We want $[\mathbb{Q}(\sqrt 5, \sqrt 7):\mathbb{Q}]$, via a tower.

*Strategy.* Apply the Tower Law to $\mathbb{Q} \subseteq \mathbb{Q}(\sqrt 5) \subseteq \mathbb{Q}(\sqrt 5, \sqrt 7)$.

*Step 1 — First rung.* $x^2 - 5$ is irreducible over $\mathbb{Q}$: any rational root $r/s$ (in lowest terms) satisfies $r^2 = 5 s^2$, forcing $5 \mid r$, then $5 \mid s$, contradicting lowest terms. Hence $\sqrt 5$ is a root of the irreducible $x^2 - 5$, and $[\mathbb{Q}(\sqrt 5):\mathbb{Q}] = 2$ with basis $\{1, \sqrt 5\}$.

*Step 2 — Second rung.* We show $\sqrt 7 \notin \mathbb{Q}(\sqrt 5)$, hence $x^2 - 7$ is the minimal polynomial of $\sqrt 7$ over $\mathbb{Q}(\sqrt 5)$ (it's monic, irreducible because degree $2$ with no root in $\mathbb{Q}(\sqrt 5)$, with $\sqrt 7$ as root).

*Proof that $\sqrt 7 \notin \mathbb{Q}(\sqrt 5)$.* Suppose for contradiction $\sqrt 7 = a + b\sqrt 5$ with $a, b \in \mathbb{Q}$. Square both sides:
$$7 \;=\; a^2 + 2ab\sqrt 5 + 5b^2 \;=\; (a^2 + 5b^2) + 2ab\sqrt 5.$$
Use $\mathbb{Q}$-linear independence of $\{1, \sqrt 5\}$:
- $\sqrt 5$-coeff: $2ab = 0 \Rightarrow a = 0$ or $b = 0$.
- Constant: $a^2 + 5b^2 = 7$.

*Subcase $a = 0$:* $5 b^2 = 7$, so $b^2 = 7/5$. No rational $b$ (since $b = p/q$ in lowest terms gives $5 p^2 = 7 q^2$, forcing $5 \mid q^2$, so $5 \mid q$, and then $5 \mid p$, contradiction).

*Subcase $b = 0$:* $a^2 = 7$, no rational $a$.

Contradiction. So $\sqrt 7 \notin \mathbb{Q}(\sqrt 5)$.

*Hence $[\mathbb{Q}(\sqrt 5, \sqrt 7) : \mathbb{Q}(\sqrt 5)] = 2$, with basis $\{1, \sqrt 7\}$.*

*Step 3 — Apply Tower Law.*
$$[\mathbb{Q}(\sqrt 5, \sqrt 7):\mathbb{Q}] \;=\; [\mathbb{Q}(\sqrt 5, \sqrt 7):\mathbb{Q}(\sqrt 5)] \cdot [\mathbb{Q}(\sqrt 5):\mathbb{Q}] \;=\; 2 \cdot 2 \;=\; 4.$$

*Step 4 — Basis (Theorem 27.7).*
$$\{1, \sqrt 5\} \times \{1, \sqrt 7\} \;=\; \{1, \sqrt 5, \sqrt 7, \sqrt{35}\}.$$

*Verification.* Every element of $\mathbb{Q}(\sqrt 5, \sqrt 7)$ is uniquely $a + b\sqrt 5 + c\sqrt 7 + d\sqrt{35}$ with $a, b, c, d \in \mathbb{Q}$.

$$\boxed{[\mathbb{Q}(\sqrt 5, \sqrt 7):\mathbb{Q}] = 4, \qquad \text{basis } \{1, \sqrt 5, \sqrt 7, \sqrt{35}\}.}$$

$\blacksquare$

---

**Solution 2.**

*Setup.* Let $\alpha = \sqrt 2 + 1$. We seek the monic polynomial of least degree in $\mathbb{Q}[x]$ with $\alpha$ as root.

*Strategy.* Manipulate to isolate the radical and square.

*Step 1.* $\alpha - 1 = \sqrt 2$.
*Step 2.* Square: $(\alpha - 1)^2 = 2$, i.e. $\alpha^2 - 2\alpha + 1 = 2$.
*Step 3.* Rearrange: $\alpha^2 - 2\alpha - 1 = 0$.

So $\alpha$ satisfies $p(x) = x^2 - 2x - 1 \in \mathbb{Q}[x]$.

*Step 4 — Verify $p$ is the minimal polynomial.*

- $p$ is monic ($x^2$ coefficient is $1$). $\checkmark$
- $\alpha$ is a root: $\alpha^2 - 2\alpha - 1 = (1 + \sqrt 2)^2 - 2(1 + \sqrt 2) - 1 = 1 + 2\sqrt 2 + 2 - 2 - 2\sqrt 2 - 1 = 0$. $\checkmark$
- $p$ is irreducible over $\mathbb{Q}$. By the Rational Root Theorem, rational roots must be $\pm 1$: $p(1) = 1 - 2 - 1 = -2$; $p(-1) = 1 + 2 - 1 = 2$. Neither zero. So $p$ has no linear factor; being degree $2$, $p$ is irreducible.

So by uniqueness (Theorem 27.4, Step 6), $p = m_\alpha$.

*Alternative verification via discriminant.* The roots of $p$ are $\alpha = \frac{2 \pm \sqrt{4 + 4}}{2} = 1 \pm \sqrt 2$, matching $1 + \sqrt 2 = \alpha$ and its $\mathbb{Q}$-conjugate $1 - \sqrt 2$.

$$\boxed{m_{\sqrt 2 + 1}(x) = x^2 - 2x - 1.}$$

*Remark.* This problem illustrates the principle that **$\mathbb{Q}(\alpha) = \mathbb{Q}(\beta)$ iff $\alpha, \beta$ differ by an element of $\mathbb{Q}$** (more generally, by an algebraic operation over the base field). Here $\alpha = 1 + \sqrt 2$ generates the same field as $\sqrt 2$, and has the same degree ($2$) over $\mathbb{Q}$, since shifting by a rational doesn't change the minimal-polynomial degree.

$\blacksquare$

---

**Solution 3.**

*Setup.* $\mathbb{F}_{25} = \mathbb{F}_{5^2}$, so by Theorem 27.10$^{\prime\prime}$, its subfields are exactly $\mathbb{F}_{5^d}$ for $d$ dividing $2$, i.e. $d \in \{1, 2\}$.

*Does $\mathbb{F}_5 \subseteq \mathbb{F}_{25}$?* Here $5^1 = \mathbb{F}_5$, $d = 1$, $1 \mid 2$. **Yes**, $\mathbb{F}_5 \subseteq \mathbb{F}_{25}$.

*Does $\mathbb{F}_{125} \subseteq \mathbb{F}_{25}$?* $\mathbb{F}_{125} = \mathbb{F}_{5^3}$, so we need $3 \mid 2$. False. **No**, $\mathbb{F}_{125} \not\subseteq \mathbb{F}_{25}$.

*Sanity check.* $|\mathbb{F}_{125}| = 125 > 25 = |\mathbb{F}_{25}|$, so $\mathbb{F}_{125} \not\subseteq \mathbb{F}_{25}$ is a priori clear on cardinality grounds alone.

*Interpretive remark.* The relation "$\subseteq$" on the lattice of subfields of $\mathbb{F}_{p^n}$ corresponds bijectively (under $\mathbb{F}_{p^m} \leftrightarrow m$) with the divisor lattice of $n$. For $n = 2$, divisors are $\{1, 2\}$, matching subfields $\{\mathbb{F}_5, \mathbb{F}_{25}\}$.

$$\boxed{\mathbb{F}_5 \subseteq \mathbb{F}_{25}; \qquad \mathbb{F}_{125} \not\subseteq \mathbb{F}_{25}.}$$

$\blacksquare$

---

**Solution 4.**

*Setup.* Let $\alpha = \sqrt[4] 2 \in \mathbb{R}$, the unique positive real fourth root of $2$.

*Strategy.* Find the minimal polynomial of $\alpha$ over $\mathbb{Q}$ (then $[\mathbb{Q}(\alpha) : \mathbb{Q}] = \deg m_\alpha$ by Theorem 27.6).

*Step 1 — Candidate.* $\alpha^4 = 2$, so $\alpha$ is a root of $p(x) = x^4 - 2 \in \mathbb{Q}[x]$. This is monic.

*Step 2 — Irreducibility of $p$ over $\mathbb{Q}$.*

**Eisenstein at $p = 2$:**
- $2 \nmid 1$ (leading coefficient of $x^4 - 2$). $\checkmark$
- $2 \mid 0, 0, 0, -2$ (all non-leading coefficients). $\checkmark$
- $4 \nmid -2$ (constant term). $\checkmark$

Eisenstein applies, so $x^4 - 2$ is irreducible over $\mathbb{Q}$.

*Step 3 — Conclude.* By Theorem 27.6, $m_\alpha = x^4 - 2$ and $[\mathbb{Q}(\sqrt[4] 2) : \mathbb{Q}] = \deg m_\alpha = 4$.

*Basis.* $\{1, \alpha, \alpha^2, \alpha^3\} = \{1, \sqrt[4] 2, \sqrt 2, 2^{3/4}\}$.

*Sanity check via tower.* $\mathbb{Q} \subseteq \mathbb{Q}(\sqrt 2) \subseteq \mathbb{Q}(\sqrt[4] 2)$:
- First rung: degree $2$.
- Second rung: $\sqrt[4] 2$ satisfies $x^2 - \sqrt 2$ over $\mathbb{Q}(\sqrt 2)$, which is irreducible there (no root: $\sqrt[4] 2 \notin \mathbb{Q}(\sqrt 2) = \{a + b\sqrt 2 : a, b \in \mathbb{Q}\}$; if $\sqrt[4] 2 = a + b\sqrt 2$, squaring gives $\sqrt 2 = a^2 + 2b^2 + 2ab\sqrt 2$, so $2ab = 1$ and $a^2 + 2b^2 = 0$, the latter forcing $a = b = 0$, contradicting $2ab = 1$). So degree $2$.

Total: $2 \cdot 2 = 4$. $\checkmark$

$$\boxed{[\mathbb{Q}(\sqrt[4] 2) : \mathbb{Q}] = 4.}$$

$\blacksquare$

---

**Solution 5.**

**Statement.** The set $\overline{\mathbb{Q}} := \{\alpha \in \mathbb{C} : \alpha \text{ is algebraic over } \mathbb{Q}\}$ is a subfield of $\mathbb{C}$.

*Setup.* We must verify four closure conditions (characterizing a subfield): for $\alpha, \beta \in \overline{\mathbb{Q}}$ with $\beta \ne 0$,
1. $\alpha + \beta \in \overline{\mathbb{Q}}$;
2. $\alpha - \beta \in \overline{\mathbb{Q}}$;
3. $\alpha \beta \in \overline{\mathbb{Q}}$;
4. $\alpha/\beta \in \overline{\mathbb{Q}}$.

And of course $0, 1 \in \overline{\mathbb{Q}}$ (both roots of $x$, $x - 1$ respectively).

*Strategy.* The key is:

> **Lemma.** If $\alpha, \beta$ are both algebraic over $\mathbb{Q}$, then the field $\mathbb{Q}(\alpha, \beta)$ is a *finite* extension of $\mathbb{Q}$.

*Proof of Lemma.* Let $\alpha$ have minimal polynomial of degree $m$ and $\beta$ of degree $n$ over $\mathbb{Q}$. Apply the Tower Law:
$$[\mathbb{Q}(\alpha, \beta) : \mathbb{Q}] \;=\; [\mathbb{Q}(\alpha, \beta) : \mathbb{Q}(\alpha)] \cdot [\mathbb{Q}(\alpha) : \mathbb{Q}].$$
The second factor is $m$. For the first, $\beta$ is algebraic over $\mathbb{Q}$, hence over the larger field $\mathbb{Q}(\alpha)$ (its minimal polynomial over $\mathbb{Q}(\alpha)$ divides $m_\beta$ over $\mathbb{Q}$, so has degree $\le n$). So the first factor is $\le n$. Hence $[\mathbb{Q}(\alpha, \beta):\mathbb{Q}] \le mn < \infty$. $\blacksquare_{\text{Lemma}}$

*Apply lemma.* Let $\alpha, \beta \in \overline{\mathbb{Q}}$. Then $\mathbb{Q}(\alpha, \beta)/\mathbb{Q}$ is finite.

By Theorem 27.9, **every element of $\mathbb{Q}(\alpha, \beta)$ is algebraic over $\mathbb{Q}$**, i.e. lies in $\overline{\mathbb{Q}}$.

In particular, $\alpha + \beta,\; \alpha - \beta,\; \alpha\beta \in \mathbb{Q}(\alpha, \beta) \subseteq \overline{\mathbb{Q}}$, and for $\beta \ne 0$, $\alpha/\beta \in \mathbb{Q}(\alpha, \beta) \subseteq \overline{\mathbb{Q}}$.

So $\overline{\mathbb{Q}}$ is closed under $+, -, \cdot, \div$ (on nonzero denominators), hence a subfield of $\mathbb{C}$. $\blacksquare$

**Interpretive remarks.**

1. $\overline{\mathbb{Q}}$ is a **countable** field (there are countably many polynomials in $\mathbb{Q}[x]$, each with finitely many roots), which gives a non-trivial proof that $\mathbb{R}$ and $\mathbb{C}$ contain transcendentals ($\mathbb{R}$ is uncountable, so $\mathbb{R} \not\subseteq \overline{\mathbb{Q}}$, which means there exist real transcendentals — Cantor's argument).

2. $[\overline{\mathbb{Q}} : \mathbb{Q}] = \infty$, since $\overline{\mathbb{Q}} \supseteq \mathbb{Q}(\sqrt[n] 2)$ for every $n$, with $[\mathbb{Q}(\sqrt[n] 2):\mathbb{Q}] = n$.

3. Despite being infinite-dimensional, $\overline{\mathbb{Q}}$ is *algebraic* over $\mathbb{Q}$ by definition — this is the canonical example of an algebraic extension that is not finite.

---

**Solution 6.**

*Setup.* $\mathbb{F}_{64} = \mathbb{F}_{2^6}$. Apply Theorem 27.10$^{\prime\prime}$: the subfields of $\mathbb{F}_{2^n}$ are exactly $\mathbb{F}_{2^d}$ for $d \mid n$.

*Step 1 — Divisors of $6$.* $6 = 2 \cdot 3$; divisors are $\{1, 2, 3, 6\}$.

*Step 2 — List subfields.*
- $d = 1$: $\mathbb{F}_2$ (the prime subfield, $|\mathbb{F}_2| = 2$).
- $d = 2$: $\mathbb{F}_4$ ($|\mathbb{F}_4| = 4$).
- $d = 3$: $\mathbb{F}_8$ ($|\mathbb{F}_8| = 8$).
- $d = 6$: $\mathbb{F}_{64}$ ($|\mathbb{F}_{64}| = 64$), the whole field.

So **$\mathbb{F}_{64}$ has exactly $4$ subfields**: $\mathbb{F}_2, \mathbb{F}_4, \mathbb{F}_8, \mathbb{F}_{64}$.

*Step 3 — Subfield lattice (Hasse diagram).* Inclusion matches divisibility:
```
              F_64
             /    \
           F_8    F_4
             \    /
              F_2
```
Specifically: $\mathbb{F}_8 \not\subseteq \mathbb{F}_4$ (since $3 \nmid 2$), $\mathbb{F}_4 \not\subseteq \mathbb{F}_8$ (since $2 \nmid 3$); both contain $\mathbb{F}_2$, both are contained in $\mathbb{F}_{64}$.

*Sanity check.* This matches the divisor lattice of $6$:
```
              6
             / \
            3   2
             \ /
              1
```

$$\boxed{\text{Subfields of } \mathbb{F}_{64}:\; \mathbb{F}_2 \subset \mathbb{F}_4 \subset \mathbb{F}_{64},\ \ \mathbb{F}_2 \subset \mathbb{F}_8 \subset \mathbb{F}_{64};\ \ 4\text{ total}.}$$

*Remark.* The Galois group $\operatorname{Gal}(\mathbb{F}_{64}/\mathbb{F}_2) = \langle\phi_2\rangle \cong \mathbb{Z}/6\mathbb{Z}$ has subgroups in bijection with divisors of $6$, confirming the subfield count via the Galois correspondence:
- $\{e\} \leftrightarrow \mathbb{F}_{64}$;
- $\langle\phi_2^3\rangle$ (order $2$) $\leftrightarrow \mathbb{F}_8$;
- $\langle\phi_2^2\rangle$ (order $3$) $\leftrightarrow \mathbb{F}_4$;
- $\langle\phi_2\rangle$ (order $6$) $\leftrightarrow \mathbb{F}_2$.

$\blacksquare$

---

**Solution 7.**

*Setup.* We want to show $\cos(2\pi/5)$ is constructible — equivalently, $[\mathbb{Q}(\cos(2\pi/5)) : \mathbb{Q}]$ is a power of $2$ *and* we can exhibit a tower of quadratic extensions reaching it (Theorem 27.12).

*Strategy.* Compute $\cos(2\pi/5)$ explicitly using the $5$-th roots of unity and verify it lies in $\mathbb{Q}(\sqrt 5)$ — a single quadratic extension of $\mathbb{Q}$.

*Step 1 — Derive an equation for $\zeta + \zeta^{-1}$, where $\zeta = e^{2\pi i/5}$.*

Note $\zeta^5 = 1$ and $\zeta \neq 1$, so $\zeta$ is a root of
$$\frac{x^5 - 1}{x - 1} \;=\; x^4 + x^3 + x^2 + x + 1 \;=\; 0.$$
Divide this by $x^2$ (valid since $\zeta \neq 0$):
$$x^2 + x + 1 + x^{-1} + x^{-2} \;=\; 0, \quad \text{i.e.}\quad (x^2 + x^{-2}) + (x + x^{-1}) + 1 \;=\; 0.$$

Set $y = x + x^{-1}$. Then $y^2 = x^2 + 2 + x^{-2}$, so $x^2 + x^{-2} = y^2 - 2$. Substitute:
$$(y^2 - 2) + y + 1 \;=\; 0, \qquad \text{i.e.}\qquad y^2 + y - 1 \;=\; 0.$$

*Step 2 — Identify $\cos(2\pi/5)$.* $\zeta = \cos(2\pi/5) + i\sin(2\pi/5)$ and $\zeta^{-1} = \cos(2\pi/5) - i\sin(2\pi/5)$ (since $|\zeta| = 1$). So
$$y \;=\; \zeta + \zeta^{-1} \;=\; 2\cos(2\pi/5).$$

*Step 3 — Solve the quadratic.* $y^2 + y - 1 = 0$ gives $y = \frac{-1 \pm \sqrt 5}{2}$. Since $2\pi/5 = 72°$ is in the first quadrant, $\cos(2\pi/5) > 0$, hence $y = 2\cos(2\pi/5) > 0$, so we take the $+$ branch:
$$y \;=\; \frac{-1 + \sqrt 5}{2}, \qquad \cos(2\pi/5) \;=\; \frac{-1 + \sqrt 5}{4} \;=\; \frac{\sqrt 5 - 1}{4}.$$

*Step 4 — Verify constructibility via a quadratic tower.*

$\cos(2\pi/5) = \tfrac 14(\sqrt 5 - 1) \in \mathbb{Q}(\sqrt 5)$, and the tower
$$\mathbb{Q} \;\subseteq\; \mathbb{Q}(\sqrt 5)$$
is a single degree-$2$ extension (since $x^2 - 5$ is irreducible over $\mathbb{Q}$: its only possible rational roots are $\pm 1, \pm 5$, none are roots). So $\cos(2\pi/5)$ lies in a tower of quadratic extensions of length $1$.

By Theorem 27.12, **$\cos(2\pi/5)$ is constructible**. Hence $\sin(2\pi/5) = \sqrt{1 - \cos^2(2\pi/5)}$ is also constructible (square-root of a constructible nonnegative), and so the point $(\cos(2\pi/5), \sin(2\pi/5))$ — a vertex of the regular pentagon — is constructible.

*Verification.* $\cos(2\pi/5) = \tfrac{\sqrt 5 - 1}{4} \approx \tfrac{2.236 - 1}{4} \approx 0.309$, matching the numerical value $\cos 72° \approx 0.309$. $\checkmark$

*Step 5 — Conclude pentagon constructibility.* Starting from the center $(0,0)$ and one vertex $(1, 0)$, iteratively reflect/rotate via the constructible angle $2\pi/5$ to locate all five vertices; connect them for the pentagon. (Explicit Euclidean construction by Euclid, Book IV, Proposition 11.)

$$\boxed{\cos(2\pi/5) = \tfrac{\sqrt 5 - 1}{4} \in \mathbb{Q}(\sqrt 5), \text{ hence constructible; the regular pentagon is constructible.}}$$

**Interpretive remark (Gauss).** More generally, Gauss proved (1796) that the regular $n$-gon is constructible iff $n = 2^k \prod p_i$ where each $p_i$ is a distinct **Fermat prime** ($p_i = 2^{2^{m_i}} + 1$). The Fermat primes known are $3, 5, 17, 257, 65537$. So the regular $17$-gon, $257$-gon, and $65537$-gon are constructible (first proven by Gauss at age 19); the regular $7$-gon, $9$-gon, $11$-gon, $13$-gon are not.

$\blacksquare$

---

## Related Concepts

- [[26-fields-and-irreducibility]] — irreducibility criteria for the polynomial $m_\alpha$ (Eisenstein, reduction mod $p$, rational-root theorem) that generate extensions.
- [[24-polynomial-rings]] — $\mathbb{F}[x]$ as a PID; the construction $\mathbb{F}[x]/\langle m\rangle$ as the basic building block of field extensions.
- [[21-integral-domains]] — characteristic of a field and the freshman's dream $(a+b)^p = a^p + b^p$ underlying the Frobenius and the existence of $\mathbb{F}_{p^n}$.
- [[18-isomorphism-theorems]] — First Isomorphism Theorem, used to produce the isomorphism $\mathbb{F}[x]/\langle m_\alpha\rangle \cong \mathbb{F}(\alpha)$.
- [[28-co5-practice-problems]] — extensive practice problems covering irreducibility, quotients, extensions, finite fields, and constructibility.

---

*Last updated: 2026-04-19*
