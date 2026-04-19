---
title: "Fields and Irreducibility"
type: guide
co: CO5
related: [24-polynomial-rings, 22-ideals-and-quotient-rings, 27-finite-fields-and-extensions]
---

# 26. Fields and Irreducibility

This chapter develops the central **irreducibility tests** for polynomials in $\mathbb{Z}[x]$ and $\mathbb{Q}[x]$: the **rational root theorem**, **Gauss's lemma**, **Eisenstein's criterion**, and **reduction modulo $p$**. Irreducibility is the ring-theoretic analogue of primality: just as a prime $p \in \mathbb{Z}$ cannot be nontrivially factored, an irreducible polynomial $p(x) \in \mathbb{F}[x]$ cannot be split into factors of smaller positive degree. In a principal ideal domain (and $\mathbb{F}[x]$ is one whenever $\mathbb{F}$ is a field), irreducibility is precisely the property that makes $\langle p(x) \rangle$ a **maximal ideal**, hence the quotient ring $\mathbb{F}[x]/\langle p(x) \rangle$ a **field**. This is the gateway into [[27-finite-fields-and-extensions]]: every finite field arises as such a quotient, and every simple algebraic extension of $\mathbb{Q}$ is built the same way. We close with the classification of irreducibles over $\mathbb{R}[x]$ via the Fundamental Theorem of Algebra.

---

## 26.1 Irreducibility: Definitions

> **Definition 26.1 (Irreducibility in a domain).** Let $R$ be an integral domain. A nonzero non-unit $p \in R$ is **irreducible** if whenever $p = ab$ with $a, b \in R$, either $a$ or $b$ is a unit of $R$.

An element that is *not* irreducible and not a unit or zero is called **reducible**. Equivalently, $p$ is reducible when it admits a factorization $p = ab$ with neither $a$ nor $b$ a unit — a "proper" factorization.

> **Definition 26.2 (Irreducibility in $\mathbb{F}[x]$).** Let $\mathbb{F}$ be a field and $p(x) \in \mathbb{F}[x]$. We say $p$ is **irreducible over $\mathbb{F}$** if $\deg p \ge 1$ and there is no factorization $p(x) = g(x)h(x)$ with $\deg g, \deg h \ge 1$.

**Remark (why this matches Definition 26.1).** In $\mathbb{F}[x]$ with $\mathbb{F}$ a field, the units are exactly the nonzero constants ($\mathbb{F}[x]^\times = \mathbb{F}^\times$). A proper factorization $p = gh$ therefore means neither factor has degree $0$, which translates to "$\deg g, \deg h \ge 1$." Degree is additive ($\deg(gh) = \deg g + \deg h$ in a domain), so the two degree conditions fit.

**Caveat for $\mathbb{Z}[x]$.** Over $\mathbb{Z}[x]$, the units are only $\{\pm 1\}$. Here irreducibility means non-unit, nonzero, and not factorable into two **non-unit** factors. For example, $2x + 4 = 2 \cdot (x + 2)$ is reducible in $\mathbb{Z}[x]$ (neither $2$ nor $x+2$ is a unit), even though $2x + 4 = 2(x + 2)$ trivially factors over $\mathbb{Q}[x]$ with $2 \in \mathbb{Q}^\times$. This distinction is resolved by [[#26-3-gauss-s-lemma | Gauss's lemma]].

**Sanity check for small degrees.**
- Degree $1$: $ax + b$ (with $a \ne 0$) is *always* irreducible, since any factorization $ax + b = g \cdot h$ forces one of $\deg g, \deg h$ to be $0$.
- Degree $2, 3$: reducible iff has a root in $\mathbb{F}$ (see Corollary 26.4).
- Degree $\ge 4$: "no root" does **not** imply "irreducible" — a quartic can factor as a product of two irreducible quadratics, e.g. $(x^2 + 1)(x^2 + 2) = x^4 + 3x^2 + 2$ over $\mathbb{Q}$.

---

## 26.2 Rational Root Theorem

> **Theorem 26.3 (Rational Root Theorem, RRT).** Let
> $$p(x) = a_n x^n + a_{n-1} x^{n-1} + \cdots + a_1 x + a_0 \in \mathbb{Z}[x], \quad a_n \ne 0, \quad a_0 \ne 0.$$
> If $r/s \in \mathbb{Q}$ is a root of $p$ written in **lowest terms** (i.e. $\gcd(r, s) = 1$, $s > 0$), then
> $$r \mid a_0 \quad \text{and} \quad s \mid a_n.$$

**Proof.**

*Step 1 — substitute and clear denominators.* Plug $x = r/s$ into $p$:
$$p(r/s) = a_n \frac{r^n}{s^n} + a_{n-1} \frac{r^{n-1}}{s^{n-1}} + \cdots + a_1 \frac{r}{s} + a_0 = 0.$$
Multiply through by $s^n$:
$$a_n r^n + a_{n-1} r^{n-1} s + a_{n-2} r^{n-2} s^2 + \cdots + a_1 r s^{n-1} + a_0 s^n = 0. \tag{$\ast$}$$
Every term in $(\ast)$ is an integer; the equation is an identity in $\mathbb{Z}$.

*Step 2 — deduce $r \mid a_0$.* Isolate the last term in $(\ast)$:
$$a_0 s^n = -\bigl( a_n r^n + a_{n-1} r^{n-1} s + \cdots + a_1 r s^{n-1} \bigr) = -r \cdot \underbrace{\bigl( a_n r^{n-1} + a_{n-1} r^{n-2} s + \cdots + a_1 s^{n-1} \bigr)}_{\in \mathbb{Z}}.$$
Thus $r$ divides $a_0 s^n$. Because $\gcd(r, s) = 1$, repeatedly applying Euclid's lemma gives $\gcd(r, s^n) = 1$, hence $r \mid a_0$.

*Step 3 — deduce $s \mid a_n$.* Now isolate the leading term in $(\ast)$:
$$a_n r^n = -\bigl( a_{n-1} r^{n-1} s + \cdots + a_1 r s^{n-1} + a_0 s^n \bigr) = -s \cdot \underbrace{\bigl( a_{n-1} r^{n-1} + \cdots + a_1 r s^{n-2} + a_0 s^{n-1} \bigr)}_{\in \mathbb{Z}}.$$
Hence $s \mid a_n r^n$, and since $\gcd(s, r^n) = 1$, we conclude $s \mid a_n$. $\blacksquare$

**Interpretive remark (why coprimality matters).** Without $\gcd(r, s) = 1$, we could cancel common factors of $r$ and $s$ inside the expressions $r \cdot (\cdots)$ and $s \cdot (\cdots)$ and lose the divisibility conclusions. The RRT is an arithmetic constraint on the *reduced* numerator and denominator of any rational root.

**Corollary (monic case).** If $p$ is monic ($a_n = 1$), then $s \mid 1$, so $s = 1$: every rational root is an **integer** dividing $a_0$. In particular, a monic integer polynomial has no rational roots other than divisors of the constant term.

### Application — Example 1

**Example 1.** Find all rational roots of $p(x) = 2x^3 - 5x^2 + 4x - 3$, and conclude about irreducibility over $\mathbb{Q}$.

*Setup.* Leading coefficient $a_3 = 2$, constant $a_0 = -3$. Rational root candidates $r/s$ satisfy $r \mid 3$ and $s \mid 2$, so
$$r \in \{\pm 1, \pm 3\}, \quad s \in \{1, 2\} \implies r/s \in \Bigl\{\pm 1,\ \pm 3,\ \pm \tfrac{1}{2},\ \pm \tfrac{3}{2}\Bigr\}.$$
Eight candidates.

*Strategy.* Evaluate $p$ at each candidate; a zero would reveal a linear factor.

*Computation.* Use Horner-style evaluation for efficiency, but we write out each step:
1. $p(1) = 2 - 5 + 4 - 3 = -2$. Nonzero.
2. $p(-1) = -2 - 5 - 4 - 3 = -14$. Nonzero.
3. $p(3) = 2(27) - 5(9) + 4(3) - 3 = 54 - 45 + 12 - 3 = 18$. Nonzero.
4. $p(-3) = 2(-27) - 5(9) + 4(-3) - 3 = -54 - 45 - 12 - 3 = -114$. Nonzero.
5. $p(1/2) = 2 \cdot \tfrac{1}{8} - 5 \cdot \tfrac{1}{4} + 4 \cdot \tfrac{1}{2} - 3 = \tfrac{1}{4} - \tfrac{5}{4} + 2 - 3 = -1 - 1 = -2$. Nonzero.
6. $p(-1/2) = 2 \cdot (-\tfrac{1}{8}) - 5 \cdot \tfrac{1}{4} + 4 \cdot (-\tfrac{1}{2}) - 3 = -\tfrac{1}{4} - \tfrac{5}{4} - 2 - 3 = -\tfrac{6}{4} - 5 = -\tfrac{13}{2}$. Nonzero.
7. $p(3/2) = 2 \cdot \tfrac{27}{8} - 5 \cdot \tfrac{9}{4} + 4 \cdot \tfrac{3}{2} - 3 = \tfrac{27}{4} - \tfrac{45}{4} + 6 - 3 = -\tfrac{18}{4} + 3 = -\tfrac{9}{2} + 3 = -\tfrac{3}{2}$. Nonzero.
8. $p(-3/2) = -\tfrac{27}{4} - \tfrac{45}{4} - 6 - 3 = -18 - 9 = -27$. Nonzero.

All eight candidates fail. **$p$ has no rational root.**

*Verification / sanity.* A cubic either has a real root, so the absence of rational roots means the real root is irrational. Numerical check: $p(2) = 16 - 20 + 8 - 3 = 1 > 0$ while $p(1) = -2 < 0$, so by IVT there is a real root in $(1, 2)$; since no rational $r/s$ in $[1, 2]$ with denominator dividing $2$ works, the root is irrational — consistent.

*Interpretation.* Because $p$ is cubic and has no rational root, and cubics can only reduce by splitting off a linear factor (Corollary 26.4 below), **$p$ is irreducible over $\mathbb{Q}$**. $\blacksquare$

### Cubic / Quartic corollary

> **Corollary 26.4 (Low-degree irreducibility test).** Let $\mathbb{F}$ be a field and $p(x) \in \mathbb{F}[x]$.
>
> (a) If $\deg p \in \{2, 3\}$, then $p$ is irreducible iff $p$ has no root in $\mathbb{F}$.
>
> (b) If $\deg p = 4$, then $p$ is irreducible iff $p$ has no root in $\mathbb{F}$ **and** $p$ is not a product of two irreducible quadratics over $\mathbb{F}$.

**Proof.**

(a) If $p$ is reducible of degree $2$ or $3$, then $p = gh$ with $1 \le \deg g, \deg h$ and $\deg g + \deg h \in \{2,3\}$. One of $g, h$ must have degree $1$, say $g(x) = ax + b$ with $a \ne 0$. Then $x = -b/a \in \mathbb{F}$ is a root of $g$, hence of $p = gh$. Conversely, if $p$ has a root $\alpha \in \mathbb{F}$, the Factor Theorem (from [[24-polynomial-rings]]) gives $(x - \alpha) \mid p$, so $p$ factors nontrivially.

(b) A proper factorization of a quartic has degree-signature $(1, 3)$, $(2, 2)$, $(1, 1, 2)$, or $(1,1,1,1)$. The $(1, \cdot)$-cases all produce a root. The *only* factorization that escapes having a root is the genuine $(2, 2)$ decomposition into two irreducible quadratics. Hence (b). $\blacksquare$

**Warning.** This shortcut breaks at degree $\ge 4$: $p(x) = x^4 + 4$ has no rational root yet factors as $(x^2 - 2x + 2)(x^2 + 2x + 2)$ over $\mathbb{Q}$. The lesson: for degrees $\ge 4$, "no root" is necessary but not sufficient for irreducibility.

---

## 26.3 Gauss's Lemma

### Primitive polynomials

> **Definition 26.5 (Content and primitive polynomial).** For $p(x) = a_n x^n + \cdots + a_1 x + a_0 \in \mathbb{Z}[x]$, the **content** is
> $$\operatorname{cont}(p) := \gcd(a_0, a_1, \ldots, a_n) \ge 0.$$
> We call $p$ **primitive** if $\operatorname{cont}(p) = 1$.

Equivalently, $p$ is primitive iff no prime $\ell \in \mathbb{Z}$ divides **every** coefficient of $p$. Every nonzero $p \in \mathbb{Z}[x]$ factors uniquely (up to sign) as $p = \operatorname{cont}(p) \cdot p^*$ with $p^*$ primitive; we call $p^*$ the **primitive part** of $p$.

### The Lemma and its proof

> **Theorem 26.6 (Gauss's Lemma).** The product of two primitive polynomials in $\mathbb{Z}[x]$ is primitive.

**Proof.** Let $p, q \in \mathbb{Z}[x]$ be primitive, and assume for contradiction that $pq$ is **not** primitive.

*Step 1.* Since $pq$ is not primitive, there exists a prime $\ell$ dividing every coefficient of $pq$.

*Step 2 — reduce mod $\ell$.* Consider the reduction homomorphism
$$\pi_\ell : \mathbb{Z}[x] \to \mathbb{F}_\ell[x], \qquad \pi_\ell\Bigl(\sum a_i x^i\Bigr) = \sum (\bar a_i) x^i,$$
where $\bar a_i = a_i \bmod \ell$. (This is a ring homomorphism — it preserves addition and multiplication coefficient-wise.) By Step 1, $\pi_\ell(pq) = 0$ in $\mathbb{F}_\ell[x]$.

*Step 3 — apply that $\mathbb{F}_\ell[x]$ is a domain.* $\mathbb{F}_\ell$ is a field (since $\ell$ is prime), so $\mathbb{F}_\ell[x]$ is an integral domain (polynomial rings over a field are domains — the product of nonzero polynomials has degree equal to the sum, hence is nonzero). Since $\pi_\ell$ is a ring hom,
$$\pi_\ell(p) \cdot \pi_\ell(q) = \pi_\ell(pq) = 0 \implies \pi_\ell(p) = 0 \text{ or } \pi_\ell(q) = 0.$$

*Step 4 — contradiction.* $\pi_\ell(p) = 0$ means $\ell$ divides every coefficient of $p$, contradicting the primitivity of $p$. Symmetrically, $\pi_\ell(q) = 0$ contradicts primitivity of $q$. Hence our assumption "$pq$ not primitive" is false, and $pq$ is primitive. $\blacksquare$

**Remark (why the domain property is essential).** Over a non-domain like $\mathbb{Z}/6\mathbb{Z}$, we'd have $2 \cdot 3 = 0$ without either factor being zero; Step 3 would fail. It is the **primeness** of $\ell$ that makes $\mathbb{F}_\ell$ a field and saves the argument.

### Gauss's Corollary: irreducibility over $\mathbb{Z}$ vs. $\mathbb{Q}$

> **Corollary 26.7 (Gauss).** Let $p(x) \in \mathbb{Z}[x]$ be primitive. Then
> $$p \text{ irreducible in } \mathbb{Z}[x] \iff p \text{ irreducible in } \mathbb{Q}[x].$$
> More precisely: every factorization of $p$ in $\mathbb{Q}[x]$ can be scaled to a factorization in $\mathbb{Z}[x]$ with primitive factors.

**Proof of the key direction ($\mathbb{Q}$-reducible $\Rightarrow \mathbb{Z}$-reducible, for primitive $p$).**

Suppose $p$ is primitive and $p = fg$ with $f, g \in \mathbb{Q}[x]$, $\deg f, \deg g \ge 1$.

*Step 1 — clear denominators.* Let $a, b \in \mathbb{Z}_{>0}$ be least common denominators such that $af, bg \in \mathbb{Z}[x]$. Further factor out the content: $af = a' f^*$ and $bg = b' g^*$, where $f^*, g^* \in \mathbb{Z}[x]$ are primitive and $a', b' \in \mathbb{Z}$. (Here we've absorbed content and sign into the integer factor.) Then
$$ab \cdot p = ab \cdot fg = (af)(bg) = a' b' \cdot f^* g^*.$$

*Step 2 — apply Gauss's Lemma.* $f^* g^*$ is primitive (Theorem 26.6), so $\operatorname{cont}(a'b' f^* g^*) = |a'b'|$. On the left, $\operatorname{cont}(ab \cdot p) = ab \cdot \operatorname{cont}(p) = ab \cdot 1 = ab$. Equating contents (up to sign):
$$ab = \pm a' b'.$$

*Step 3 — cancel.* Dividing $ab \cdot p = a'b' f^* g^*$ by $ab$ gives
$$p = \pm f^* g^*,$$
a factorization in $\mathbb{Z}[x]$ with $\deg f^* = \deg f \ge 1$ and $\deg g^* = \deg g \ge 1$. Hence $p$ is reducible in $\mathbb{Z}[x]$.

**Proof of the reverse direction ($\mathbb{Z}$-reducible $\Rightarrow \mathbb{Q}$-reducible, for primitive $p$).**

If $p = fg$ in $\mathbb{Z}[x]$ with $f, g$ non-units and $p$ primitive, then $f, g$ can't both be integer constants (their product $p$ is non-constant and primitive, so at most one of $f, g$ is constant; if one were a non-unit integer $c$, it would divide every coefficient, violating primitivity). Hence at least one of $f, g$ has degree $\ge 1$. A careful check (the other factor cannot be constant either, else we contradict primitivity again) shows both have degree $\ge 1$. So $p = fg$ is a nontrivial $\mathbb{Q}[x]$-factorization. $\blacksquare$

**Consequence (working rule).** *To check irreducibility in $\mathbb{Q}[x]$, it suffices to clear denominators to a primitive polynomial in $\mathbb{Z}[x]$ and test irreducibility there.* This is why Eisenstein and reduction mod $p$ — both integer-coefficient tests — suffice for $\mathbb{Q}$-irreducibility.

**Interpretive remark.** Gauss's Lemma says the content map $\operatorname{cont}: (\mathbb{Z}[x] \setminus \{0\}, \cdot) \to (\mathbb{Z}_{>0}, \cdot)$ is **multiplicative** (on primitive parts): $\operatorname{cont}(pq) = \operatorname{cont}(p) \operatorname{cont}(q)$. This is the polynomial analogue of "primes stay prime." It also proves $\mathbb{Z}[x]$ is a **UFD** (unique factorization domain), though not a PID — for example $\langle 2, x \rangle$ is not principal in $\mathbb{Z}[x]$.

---

## 26.4 Eisenstein's Criterion

### Statement

> **Theorem 26.8 (Eisenstein's Criterion).** Let $p(x) = a_n x^n + a_{n-1} x^{n-1} + \cdots + a_1 x + a_0 \in \mathbb{Z}[x]$ with $n \ge 1$. Suppose there exists a prime $\ell$ such that:
> 1. $\ell \nmid a_n$ (prime does not divide the **leading** coefficient),
> 2. $\ell \mid a_i$ for all $0 \le i \le n - 1$ (prime divides **every** lower coefficient),
> 3. $\ell^2 \nmid a_0$ (prime squared does not divide the **constant** term).
>
> Then $p(x)$ is **irreducible** in $\mathbb{Q}[x]$. If in addition $p$ is primitive, then $p$ is irreducible in $\mathbb{Z}[x]$.

### Full proof via reduction mod $\ell$

**Proof.** By Gauss (Corollary 26.7), it suffices to prove $p$ cannot factor as $p = fg$ in $\mathbb{Z}[x]$ with $\deg f, \deg g \ge 1$. (Any $\mathbb{Q}$-factorization would give a $\mathbb{Z}$-factorization after clearing denominators and contents, possibly after multiplying $p$ by its own content which equals $1$ in the primitive case.)

*Step 1 — suppose a factorization exists.* Assume for contradiction
$$p(x) = f(x) g(x), \qquad f(x) = b_m x^m + \cdots + b_1 x + b_0, \quad g(x) = c_k x^k + \cdots + c_1 x + c_0,$$
with $b_i, c_j \in \mathbb{Z}$, $m = \deg f \ge 1$, $k = \deg g \ge 1$, and $m + k = n$.

*Step 2 — reduce mod $\ell$.* Apply the ring homomorphism $\pi_\ell: \mathbb{Z}[x] \to \mathbb{F}_\ell[x]$. By hypothesis (1), $\bar a_n \ne 0$; by (2), $\bar a_i = 0$ for $i < n$. Hence
$$\bar p(x) = \bar a_n x^n \in \mathbb{F}_\ell[x].$$
So $\bar f(x) \bar g(x) = \bar a_n x^n$.

*Step 3 — unique factorization in $\mathbb{F}_\ell[x]$.* $\mathbb{F}_\ell[x]$ is a UFD (any PID is), and $x \in \mathbb{F}_\ell[x]$ is irreducible (degree $1$). Therefore the only monic irreducible factor of $\bar a_n x^n$ (up to units $\mathbb{F}_\ell^\times$) is $x$, and
$$\bar f(x) = \beta x^m, \qquad \bar g(x) = \gamma x^k, \qquad \beta \gamma = \bar a_n, \quad \beta, \gamma \in \mathbb{F}_\ell^\times.$$

*Step 4 — extract information about $b_0, c_0$.* From $\bar f(x) = \beta x^m$, the constant term of $\bar f$ is $0$, i.e. $\bar b_0 = 0$. So $\ell \mid b_0$. Similarly, $\ell \mid c_0$.

*Step 5 — contradict condition (3).* The constant term of the product is the product of the constant terms:
$$a_0 = b_0 c_0.$$
Since $\ell \mid b_0$ and $\ell \mid c_0$, we get $\ell^2 \mid b_0 c_0 = a_0$. This contradicts hypothesis (3), $\ell^2 \nmid a_0$.

Hence no such factorization $f, g$ exists, and $p$ is irreducible in $\mathbb{Z}[x]$. By Gauss, it is irreducible in $\mathbb{Q}[x]$. $\blacksquare$

**Interpretive remarks.**

1. **Why "mod $\ell$" works.** Eisenstein pins down *exactly* how the prime $\ell$ interacts with each coefficient: it hits every non-leading one, misses the leader, and enters the constant exactly once. Reducing mod $\ell$ collapses the polynomial to a pure power of $x$, and the unique factorization structure of $\mathbb{F}_\ell[x]$ forces both would-be factors to have a positive power of $x$ — which forces both constant terms $b_0, c_0$ to be multiples of $\ell$, doubling up in $a_0$. The hypothesis "$\ell^2 \nmid a_0$" is precisely calibrated to defeat this.

2. **Necessity of each hypothesis.**
   - If we drop (1), $p(x) = \ell x^n$ is reducible for $n \ge 2$.
   - If we drop (2), e.g. $p(x) = x^2 + x - \ell$, Eisenstein does not apply and $p$ can be reducible.
   - If we drop (3) (i.e. $\ell^2 \mid a_0$), e.g. $p(x) = x^2 - \ell^2 = (x - \ell)(x + \ell)$, $p$ is reducible.

3. **"Shifted Eisenstein."** If $p$ fails Eisenstein directly but $p(x + c)$ passes for some $c \in \mathbb{Z}$, then $p$ is still irreducible: the map $x \mapsto x + c$ is a $\mathbb{Q}$-algebra automorphism of $\mathbb{Q}[x]$, so it preserves irreducibility. See Example 5 below.

### Examples

**Example 2 ($x^n - p$ for prime $p$).** Let $p$ be any prime, $n \ge 1$. The polynomial $x^n - p \in \mathbb{Z}[x]$ has coefficients $a_n = 1$, $a_{n-1} = \cdots = a_1 = 0$, $a_0 = -p$. Check Eisenstein with $\ell = p$:

1. $p \nmid 1 = a_n$. $\checkmark$
2. $p \mid 0$ trivially for all intermediate coefficients, and $p \mid -p = a_0$. $\checkmark$
3. $p^2 \nmid -p$ (since $p \ne 0$ and $p/p = 1$ is not divisible by $p$). $\checkmark$

By Eisenstein, $x^n - p$ is irreducible over $\mathbb{Q}$ for every prime $p$ and every $n \ge 1$. In particular, the $n$-th root of a prime is never expressible as a root of a polynomial of smaller degree over $\mathbb{Q}$. $\square$

---

**Example 3 (Classic: $x^3 - 2$).**

*Setup.* $p(x) = x^3 - 2 \in \mathbb{Z}[x]$, $\ell = 2$.

*Computation.* Coefficients: $a_3 = 1, a_2 = 0, a_1 = 0, a_0 = -2$.
1. $2 \nmid 1$. $\checkmark$
2. $2 \mid 0, 0, -2$. $\checkmark$
3. $4 \nmid -2$. $\checkmark$

*Conclusion.* $x^3 - 2$ is irreducible over $\mathbb{Q}$.

*Interpretation.* Hence $\sqrt[3]{2} \notin \mathbb{Q}$, and more strongly, $\sqrt[3]{2}$ satisfies no quadratic with rational coefficients. The minimal polynomial of $\sqrt[3]{2}$ over $\mathbb{Q}$ is exactly $x^3 - 2$, and $[\mathbb{Q}(\sqrt[3]{2}) : \mathbb{Q}] = 3$. This is the starting point for showing $\sqrt[3]{2}$ is not **constructible** (constructibility requires degree a power of $2$). $\square$

---

**Example 4 (Multiple primes work).** Let $p(x) = x^5 - 6x^3 + 12x - 6$. Coefficients: $1, 0, -6, 0, 12, -6$.

*Try $\ell = 2$.* (1) $2 \nmid 1$. $\checkmark$ (2) $2 \mid 0, -6, 0, 12, -6$. $\checkmark$ (3) $4 \nmid -6$. $\checkmark$ Irreducible.

*Try $\ell = 3$.* (1) $3 \nmid 1$. $\checkmark$ (2) $3 \mid 0, -6, 0, 12, -6$. $\checkmark$ (3) $9 \nmid -6$. $\checkmark$ Irreducible (same conclusion, different witness prime). $\square$

### Substitution trick: shifted Eisenstein

Some polynomials have no prime witnessing Eisenstein directly but become Eisenstein after $x \mapsto x + c$.

**Example 5 (The $p$-th cyclotomic polynomial).** Let $p$ be a prime. Define
$$\Phi_p(x) = \frac{x^p - 1}{x - 1} = x^{p-1} + x^{p-2} + \cdots + x + 1.$$
(This is the monic minimal polynomial of a primitive $p$-th root of unity $\zeta_p = e^{2\pi i / p}$.)

*Claim.* $\Phi_p(x)$ is irreducible over $\mathbb{Q}$.

*Setup.* Eisenstein at prime $p$ fails directly: the coefficients of $\Phi_p$ are all $1$, so condition (2) ($p \mid a_i$ for $i < p-1$) fails. We try the shift $x = y + 1$.

*Strategy.* Compute $\Phi_p(y + 1)$ and hope Eisenstein applies at $\ell = p$.

*Computation.*
$$\Phi_p(y + 1) = \frac{(y + 1)^p - 1}{(y + 1) - 1} = \frac{(y + 1)^p - 1}{y}.$$
Expand by the binomial theorem:
$$(y + 1)^p = \sum_{k=0}^p \binom{p}{k} y^k = 1 + \binom{p}{1} y + \binom{p}{2} y^2 + \cdots + \binom{p}{p-1} y^{p-1} + y^p.$$
Subtract $1$ and divide by $y$:
$$\Phi_p(y + 1) = \frac{1}{y} \sum_{k=1}^p \binom{p}{k} y^k = \sum_{k=1}^p \binom{p}{k} y^{k-1} = y^{p-1} + \binom{p}{p-1} y^{p-2} + \cdots + \binom{p}{2} y + \binom{p}{1}.$$

Rewrite with standard indexing of coefficients $a_0, a_1, \ldots, a_{p-1}$:
- Leading: $a_{p-1} = 1$.
- Middle: $a_{k-1} = \binom{p}{k}$ for $k = 1, \ldots, p-1$.
- Constant: $a_0 = \binom{p}{1} = p$.

*Check Eisenstein at $\ell = p$.*
1. $p \nmid 1 = a_{p-1}$. $\checkmark$
2. For $1 \le k \le p - 1$, $p \mid \binom{p}{k}$. This is the classical fact that $\binom{p}{k} = \frac{p!}{k! (p-k)!}$ and the numerator has $p$ as a factor but the denominator does not (since $k, p-k < p$ are both coprime to $p$). $\checkmark$
3. $p^2 \nmid p = a_0$. (Obvious: $p/p^2 = 1/p \notin \mathbb{Z}$.) $\checkmark$

Eisenstein gives $\Phi_p(y + 1)$ irreducible in $\mathbb{Q}[y]$. The substitution $x \mapsto x - 1$ (equivalently $y \mapsto y + 1$) is a $\mathbb{Q}$-algebra automorphism of $\mathbb{Q}[y]$ onto $\mathbb{Q}[x]$, and automorphisms preserve irreducibility: if $\Phi_p(x) = a(x) b(x)$ were a nontrivial factorization, then $\Phi_p(y + 1) = a(y+1) b(y+1)$ would be one too — contradiction.

Hence $\Phi_p(x)$ is irreducible over $\mathbb{Q}$. $\blacksquare$

*Verification for small $p$.*
- $p = 2$: $\Phi_2(x) = x + 1$, trivially irreducible (degree $1$).
- $p = 3$: $\Phi_3(x) = x^2 + x + 1$, discriminant $-3 < 0$, no real (hence no rational) roots — irreducible.
- $p = 5$: $\Phi_5(y + 1) = y^4 + 5y^3 + 10y^2 + 10y + 5$; coefficients $1, 5, 10, 10, 5$. Eisenstein at $5$ checks out.

*Interpretation.* The shift $x = y + 1$ sends the special point $x = 1$ (where $\Phi_p$ has a "gap") to $y = 0$, exposing the $p$-divisibility structure of the coefficients of $(y+1)^p - 1$. This is characteristic of the "Artin–Schreier" / "local" flavor of cyclotomic polynomials at $p$.

---

## 26.5 Reduction Modulo $p$

### Statement

> **Theorem 26.9 (Reduction-mod-$p$ theorem).** Let $p(x) \in \mathbb{Z}[x]$ be **monic** (leading coefficient $1$) of degree $n \ge 1$. Let $\ell$ be a prime and $\bar p(x) \in \mathbb{F}_\ell[x]$ the reduction of $p$ modulo $\ell$. If $\bar p$ is irreducible in $\mathbb{F}_\ell[x]$, then $p$ is irreducible in $\mathbb{Q}[x]$.

### Full proof

**Proof.** We prove the contrapositive: if $p$ is reducible in $\mathbb{Q}[x]$, then $\bar p$ is reducible in $\mathbb{F}_\ell[x]$.

*Step 1 — $\mathbb{Q}$-reducibility implies $\mathbb{Z}$-reducibility for monic $p$.* Suppose $p = fg$ in $\mathbb{Q}[x]$ with $\deg f, \deg g \ge 1$. By Gauss's Lemma (Corollary 26.7), after clearing denominators and contents we may write $p = f^* g^*$ in $\mathbb{Z}[x]$ with $f^*, g^*$ primitive and having the same degrees as $f, g$ respectively.

*Step 2 — monic normalization.* Because $p$ is monic, the leading coefficient satisfies
$$1 = a_n = (\text{leading of } f^*) \cdot (\text{leading of } g^*).$$
In $\mathbb{Z}$, the only way two integers multiply to $1$ is $1 \cdot 1$ or $(-1) \cdot (-1)$. By absorbing the sign (multiplying both $f^*$ and $g^*$ by $-1$ if necessary), we may assume both $f^*$ and $g^*$ are monic. Call these monic integer polynomials $\tilde f$ and $\tilde g$: $p = \tilde f \tilde g$ in $\mathbb{Z}[x]$ with $\tilde f, \tilde g$ monic of degrees $\deg f \ge 1$ and $\deg g \ge 1$.

*Step 3 — reduce mod $\ell$.* The reduction hom $\pi_\ell : \mathbb{Z}[x] \to \mathbb{F}_\ell[x]$ preserves multiplication and leading coefficients of monic polynomials (since $\ell \nmid 1$). Thus $\bar p = \bar{\tilde f} \cdot \bar{\tilde g}$, and because $\tilde f, \tilde g$ are monic, $\bar{\tilde f}, \bar{\tilde g}$ are monic of the same degrees — in particular
$$\deg \bar{\tilde f} = \deg \tilde f \ge 1, \qquad \deg \bar{\tilde g} = \deg \tilde g \ge 1.$$

*Step 4 — conclude.* We have exhibited a nontrivial factorization of $\bar p$ in $\mathbb{F}_\ell[x]$. Hence $\bar p$ is reducible. $\blacksquare$

**Contrapositively stated.** $\bar p$ irreducible in $\mathbb{F}_\ell[x]$ $\implies$ $p$ irreducible in $\mathbb{Q}[x]$.

### Why "monic" is essential

If $p$ is not monic, say $p(x) = 2x^2 + 1$, reduction mod $2$ gives $\bar p(x) = 1$, a degree-$0$ polynomial — we've lost the leading coefficient entirely. The degrees of $\bar f, \bar g$ no longer match those of $f, g$, and the argument collapses. In practice, we scale to monic (possible only if the leading coefficient is $\pm 1$, otherwise we work with the primitive part and track content).

### One-way implication: a warning

**The converse fails.** A $\mathbb{Q}$-irreducible monic polynomial can be reducible mod *every* prime. This is not a pathology; it is the generic behavior for cyclotomic-type polynomials.

**Example (preview).** $x^4 + 1$ is irreducible over $\mathbb{Q}$ (via shifted Eisenstein — see Example A7 in [[28-co5-practice-problems]]) yet is reducible in $\mathbb{F}_\ell[x]$ for **every** prime $\ell$. Sketch: over $\mathbb{F}_2$, $x^4 + 1 = (x + 1)^4$; over $\mathbb{F}_\ell$ for odd $\ell$, one of $-1, 2, -2$ is a square (a consequence of quadratic reciprocity), which allows $x^4 + 1$ to factor either as a product of two irreducible quadratics or four linears. Hence reduction mod $p$ *cannot* prove irreducibility of $x^4 + 1$ — we *must* use shifted Eisenstein.

### Using reduction mod $p$

**Example 6.** Show that $p(x) = x^4 + x^3 + x^2 + x + 1$ is irreducible over $\mathbb{Q}$.

*Setup.* $p$ is monic of degree $4$ (this is $\Phi_5(x)$, already handled by Example 5 via shifted Eisenstein at $\ell = 5$). We give an alternative argument via reduction mod $2$.

*Strategy.* Reduce mod $2$ to $\bar p(x) = x^4 + x^3 + x^2 + x + 1 \in \mathbb{F}_2[x]$, and show this is irreducible in $\mathbb{F}_2[x]$.

*Step 1 — rule out linear factors.* Test for roots in $\mathbb{F}_2 = \{0, 1\}$:
- $\bar p(0) = 0 + 0 + 0 + 0 + 1 = 1 \ne 0$.
- $\bar p(1) = 1 + 1 + 1 + 1 + 1 = 5 \equiv 1 \pmod 2 \ne 0$.

No roots, hence no linear factors.

*Step 2 — rule out a product of two irreducible quadratics.* The only irreducible monic quadratic in $\mathbb{F}_2[x]$ is $x^2 + x + 1$ (we verify: the monic quadratics are $x^2, x^2 + 1, x^2 + x, x^2 + x + 1$; the first three have root $0, 1, 0$ respectively, while $x^2 + x + 1$ evaluated at $0$ gives $1$ and at $1$ gives $1$, so no roots in $\mathbb{F}_2$ and by Corollary 26.4(a) it is irreducible). Therefore, if $\bar p$ factors as two irreducible quadratics, it must be $(x^2 + x + 1)^2$.

Compute $(x^2 + x + 1)^2$ in $\mathbb{F}_2[x]$ by expanding then reducing mod $2$:
$$(x^2 + x + 1)(x^2 + x + 1) = x^4 + x^3 + x^2 + x^3 + x^2 + x + x^2 + x + 1 = x^4 + 2x^3 + 3x^2 + 2x + 1.$$
Reduce mod $2$: $(x^2 + x + 1)^2 \equiv x^4 + x^2 + 1 \pmod 2$.

Compare with $\bar p(x) = x^4 + x^3 + x^2 + x + 1$: the coefficients of $x^3$ and $x$ differ (ours has them, the square doesn't). So $(x^2 + x + 1)^2 \ne \bar p$, and $\bar p$ does not factor as two irreducible quadratics.

*Step 3 — conclude.* $\bar p$ has no linear factor and is not a product of two irreducible quadratics. Since $\deg \bar p = 4$, by Corollary 26.4(b) $\bar p$ is irreducible in $\mathbb{F}_2[x]$.

By the reduction-mod-$p$ theorem, $p$ is irreducible in $\mathbb{Q}[x]$.

*Verification / cross-check.* We can also argue via shifted Eisenstein at $\ell = 5$ (Example 5) — both methods confirm $\Phi_5$ is $\mathbb{Q}$-irreducible. $\blacksquare$

---

## 26.6 Quotient Ring $\mathbb{F}[x]/\langle p(x) \rangle$ as a Field

### Main theorem and full proof

> **Theorem 26.10.** Let $\mathbb{F}$ be a field and $p(x) \in \mathbb{F}[x]$ a non-constant polynomial. Then
> $$\mathbb{F}[x] / \langle p(x) \rangle \text{ is a field} \iff p(x) \text{ is irreducible in } \mathbb{F}[x].$$

**Proof.** We use three structural facts recalled from [[24-polynomial-rings]] and [[22-ideals-and-quotient-rings]]:

**Fact A.** $\mathbb{F}[x]$ is a **principal ideal domain (PID)**: every ideal is generated by a single element. The proof uses the division algorithm: given an ideal $I \ne 0$, pick $p \in I$ of minimum degree; then $I = \langle p \rangle$ (any $f \in I$ is written $f = qp + r$ with $\deg r < \deg p$, forcing $r = 0$).

**Fact B.** In a PID, an element $p$ is **prime** iff it is **irreducible**. (Sketch: irreducible $\Rightarrow$ prime uses that the ideal $\langle p \rangle$ is maximal — see Fact C — hence prime; prime $\Rightarrow$ irreducible is easier and holds in any domain.)

**Fact C.** In a PID, every nonzero prime ideal is **maximal**. Proof: let $\langle p \rangle \subsetneq \langle q \rangle$ be ideals with $p$ prime. Then $q \mid p$, so $p = qr$ for some $r$. Primeness of $p$ gives $p \mid q$ or $p \mid r$; the former is $\langle p \rangle = \langle q \rangle$ (contradiction to $\subsetneq$), the latter gives $r = ps$, so $p = qr = qps$, hence $qs = 1$, so $q$ is a unit, hence $\langle q \rangle = R$. So no ideal strictly between $\langle p \rangle$ and $R$ exists — $\langle p \rangle$ is maximal.

**Fact D (from [[22-ideals-and-quotient-rings]]).** For a commutative ring $R$ with $1$ and a proper ideal $I$:
- $R/I$ is an **integral domain** iff $I$ is **prime**.
- $R/I$ is a **field** iff $I$ is **maximal**.

**Now assemble the equivalence.**

*($\Leftarrow$ direction).* Suppose $p(x)$ is irreducible. By Fact B, $p$ is prime in the PID $\mathbb{F}[x]$. By Fact C, $\langle p \rangle$ is maximal. By Fact D, $\mathbb{F}[x]/\langle p \rangle$ is a field.

*($\Rightarrow$ direction).* Suppose $\mathbb{F}[x]/\langle p \rangle$ is a field. By Fact D, $\langle p \rangle$ is maximal, in particular prime. By Fact B, $p$ is irreducible. $\blacksquare$

**Interpretive remarks.**

1. **Why the PID structure is essential.** In a general UFD that is not a PID (e.g., $\mathbb{Z}[x]$), irreducible elements do generate prime ideals, but those ideals need not be maximal. For instance, $\langle x \rangle \subsetneq \langle 2, x \rangle \subsetneq \mathbb{Z}[x]$, so $\mathbb{Z}[x]/\langle x \rangle \cong \mathbb{Z}$ is a domain but not a field. The PID property is what collapses "prime" and "maximal" for nonzero elements.

2. **Explicit field structure.** Let $p(x) \in \mathbb{F}[x]$ be irreducible of degree $n$. Every element of $\mathbb{F}[x]/\langle p \rangle$ has a unique representative of degree $< n$ (division algorithm):
$$\mathbb{F}[x]/\langle p \rangle = \{ a_0 + a_1 \bar x + \cdots + a_{n-1} \bar x^{n-1} : a_i \in \mathbb{F} \}, \quad \bar x = x + \langle p \rangle.$$
Addition is coordinatewise; multiplication is polynomial multiplication reduced mod $p$. This is a vector space of dimension $n$ over $\mathbb{F}$ and a field. If $|\mathbb{F}| = q$, then $|\mathbb{F}[x]/\langle p \rangle| = q^n$ — the starting point of finite field theory ([[27-finite-fields-and-extensions]]).

3. **Constructing roots.** In the quotient, the element $\bar x$ satisfies $p(\bar x) = 0$ (since $p(x) \in \langle p \rangle$). So $\mathbb{F}[x]/\langle p \rangle$ is a field extension of $\mathbb{F}$ in which $p$ has a root. This is **Kronecker's construction** of splitting fields.

### Examples

**Example 7 (Building $\mathbb{Q}(\sqrt 2)$).**

*Setup.* $p(x) = x^2 - 2 \in \mathbb{Q}[x]$. Check irreducibility: rational roots $\pm 1, \pm 2$ give $p(\pm 1) = -1, p(\pm 2) = 2$ — no rational root. Degree $2$, no root, so irreducible by Corollary 26.4(a).

*Compute the quotient.* Elements of $\mathbb{Q}[x]/\langle x^2 - 2\rangle$ have the form $a + b \bar x$ with $a, b \in \mathbb{Q}$ and $\bar x^2 = 2$. Multiplication: $(a + b \bar x)(c + d \bar x) = ac + (ad + bc) \bar x + bd \bar x^2 = (ac + 2bd) + (ad + bc) \bar x$.

*Isomorphism to $\mathbb{Q}(\sqrt 2)$.* Define $\varphi: \mathbb{Q}[x] \to \mathbb{R}$ by $\varphi(f) = f(\sqrt 2)$. Standard check: $\varphi$ is a ring hom, $\ker\varphi = \langle x^2 - 2 \rangle$, $\operatorname{Im}\varphi = \mathbb{Q}(\sqrt 2)$. By the First Isomorphism Theorem for rings, $\mathbb{Q}[x]/\langle x^2 - 2 \rangle \cong \mathbb{Q}(\sqrt 2)$. See Problem B1 in [[28-co5-practice-problems]] for full detail.

*Verification.* Theorem 26.10 says the quotient is a field because $x^2 - 2$ is irreducible — consistent with $\mathbb{Q}(\sqrt 2)$ being a field. $\checkmark$

---

**Example 8 (Finite field of order $4$).**

*Setup.* $\mathbb{F}_2[x]$ and $p(x) = x^2 + x + 1$. Check irreducibility: $p(0) = 1, p(1) = 3 \equiv 1 \pmod 2$. No root in $\mathbb{F}_2$, degree $2$, so irreducible.

*Quotient.* $\mathbb{F}_4 := \mathbb{F}_2[x]/\langle x^2 + x + 1 \rangle$ has elements $\{0, 1, \alpha, 1 + \alpha\}$, where $\alpha := \bar x$ satisfies $\alpha^2 + \alpha + 1 = 0$, i.e. $\alpha^2 = -\alpha - 1 = \alpha + 1$ (char $2$). Multiplication table:

| $\cdot$ | $1$ | $\alpha$ | $\alpha + 1$ |
|---------|-----|----------|--------------|
| $1$     | $1$ | $\alpha$ | $\alpha + 1$ |
| $\alpha$| $\alpha$ | $\alpha + 1$ | $1$ |
| $\alpha + 1$ | $\alpha + 1$ | $1$ | $\alpha$ |

The nonzero elements form the cyclic group of order $3$: $\mathbb{F}_4^\times \cong \mathbb{Z}/3\mathbb{Z}$ generated by $\alpha$.

*Verification.* $|\mathbb{F}_4| = |\mathbb{F}_2|^{\deg p} = 2^2 = 4$. $\checkmark$

---

**Example 9 (Finite field of order $9$).**

*Setup.* $\mathbb{F}_3[x]$ and $p(x) = x^2 + 1$. Roots in $\mathbb{F}_3$: $p(0) = 1, p(1) = 2, p(2) = 4 + 1 = 5 \equiv 2 \pmod 3$. No roots, so $p$ is irreducible.

*Quotient.* $\mathbb{F}_9 := \mathbb{F}_3[x]/\langle x^2 + 1 \rangle$ has nine elements $\{a + bi : a, b \in \mathbb{F}_3\}$ where $i := \bar x$ satisfies $i^2 = -1$. This is the finite-field analogue of the Gaussian rationals.

*Verification.* $|\mathbb{F}_9| = 3^2 = 9$. $\checkmark$ Since $i^2 = -1$ and $-1 = 2$ in $\mathbb{F}_3$, we have $i^2 = 2$, $i^3 = 2i$, $i^4 = 2i^2 = 4 = 1$; so $i$ has multiplicative order $4$ in $\mathbb{F}_9^\times$ (which has order $8$), consistent with Lagrange. $\checkmark$

---

## 26.7 Irreducibility over $\mathbb{R}$ and $\mathbb{C}$

### Fundamental Theorem of Algebra

> **Theorem 26.11 (Fundamental Theorem of Algebra, FTA).** Every non-constant polynomial $p(x) \in \mathbb{C}[x]$ has at least one root in $\mathbb{C}$.
>
> Equivalently, $\mathbb{C}$ is an **algebraically closed** field: every polynomial in $\mathbb{C}[x]$ splits completely into linear factors, and the irreducibles of $\mathbb{C}[x]$ are exactly the degree-$1$ polynomials (up to scalar).

**Remark on the proof.** We *state* FTA without proof; it is not an algebraic theorem in the pure-algebra sense. Standard proofs require analysis:
- **Liouville's theorem** (complex analysis): a bounded entire function is constant; apply to $1/p(z)$.
- **Winding number / topology**: the map $z \mapsto p(z)/|p(z)|$ on large circles has nonzero winding number, forcing a zero inside.
- **Algebraic-analytic hybrid** (Gauss's original): existence of a real root of an odd-degree real polynomial (IVT) plus induction on the $2$-adic valuation of the degree.

Every proof uses at least one non-algebraic input — typically the completeness of $\mathbb{R}$ or $\mathbb{C}$.

**Corollary (factorization over $\mathbb{C}$).** Every $p(x) \in \mathbb{C}[x]$ of degree $n$ factors as
$$p(x) = c \prod_{i=1}^n (x - \alpha_i), \qquad c \in \mathbb{C}^\times, \alpha_i \in \mathbb{C}.$$
The multiset $\{\alpha_1, \ldots, \alpha_n\}$ is unique (up to reordering).

### Classification of irreducibles over $\mathbb{R}[x]$

> **Corollary 26.12 (Classification over $\mathbb{R}[x]$).** An irreducible polynomial in $\mathbb{R}[x]$ is either
> 1. linear $ax + b$ with $a \ne 0$, or
> 2. quadratic $ax^2 + bx + c$ with $a \ne 0$ and **negative discriminant** $b^2 - 4ac < 0$.
>
> Every $p(x) \in \mathbb{R}[x]$ factors uniquely (up to ordering and scalar) as a product of linear and irreducible quadratic factors.

**Proof.** We show (a) the listed polynomials are irreducible, (b) no higher-degree irreducibles exist, and (c) deduce the factorization.

*(a) Linear is always irreducible.* Any factorization $ax + b = gh$ in $\mathbb{R}[x]$ has $\deg g + \deg h = 1$, forcing one to have degree $0$ (a unit). $\checkmark$

*(a') Quadratic with negative discriminant is irreducible over $\mathbb{R}$.* If $ax^2 + bx + c$ factored over $\mathbb{R}$, it would have two real roots (by the quadratic formula), which requires discriminant $\ge 0$ — contradiction.

*(b) No real-irreducibles of degree $\ge 3$.* Let $p(x) \in \mathbb{R}[x]$ have $\deg p \ge 2$. By FTA, $p$ has a complex root $\alpha \in \mathbb{C}$.

*Sub-case (i): $\alpha \in \mathbb{R}$.* Then $(x - \alpha) \mid p$ in $\mathbb{R}[x]$ (Factor Theorem), so $p$ is reducible.

*Sub-case (ii): $\alpha \in \mathbb{C} \setminus \mathbb{R}$.* Complex conjugation $\sigma: \mathbb{C} \to \mathbb{C}$, $z \mapsto \bar z$, is a **field automorphism of $\mathbb{C}$ fixing $\mathbb{R}$**. So if $p \in \mathbb{R}[x]$, applying $\sigma$ to the coefficients leaves $p$ unchanged: $\sigma(p) = p$. Hence
$$0 = \sigma(p(\alpha)) = p(\sigma(\alpha)) = p(\bar\alpha).$$
So $\bar\alpha$ is also a root. Since $\alpha \notin \mathbb{R}$, $\alpha \ne \bar\alpha$, and both are roots.

Compute the product:
$$(x - \alpha)(x - \bar\alpha) = x^2 - (\alpha + \bar\alpha) x + \alpha \bar\alpha = x^2 - 2\operatorname{Re}(\alpha) \cdot x + |\alpha|^2 \in \mathbb{R}[x].$$
This is a real quadratic factor of $p$. Its discriminant is
$$(-2\operatorname{Re}\alpha)^2 - 4 \cdot 1 \cdot |\alpha|^2 = 4\operatorname{Re}(\alpha)^2 - 4(\operatorname{Re}(\alpha)^2 + \operatorname{Im}(\alpha)^2) = -4 \operatorname{Im}(\alpha)^2 < 0,$$
using $\operatorname{Im}(\alpha) \ne 0$. So the factor is one of the listed irreducible quadratics. If $\deg p > 2$, then $p / [(x-\alpha)(x-\bar\alpha)]$ is a polynomial of smaller positive degree, so $p$ is reducible.

In either sub-case, any $p$ of degree $\ge 3$ is reducible. Hence irreducible polynomials of $\mathbb{R}[x]$ have degree $\le 2$.

*(c) Factorization.* Induct on $\deg p$. Degree $\le 2$ is handled by (a). For $\deg p \ge 3$, part (b) gives a linear or quadratic factor in $\mathbb{R}[x]$; dividing yields a lower-degree polynomial to which we apply the inductive hypothesis.

Uniqueness follows from unique factorization in $\mathbb{R}[x]$ (a UFD, being a PID). $\blacksquare$

**Interpretive remark (algebraic content of FTA).** The *only* algebraic fact we used beyond ring-theoretic basics is that complex conjugation is an automorphism of $\mathbb{C}/\mathbb{R}$. FTA itself is the hard input; everything else is bookkeeping. This is why $\mathbb{R}[x]$ has such a clean structure: $\mathbb{C}/\mathbb{R}$ is a degree-$2$ extension, so "one step" of going to the algebraic closure suffices.

**Corollary (odd-degree real polynomials have a real root).** If $\deg p$ is odd, the factorization over $\mathbb{R}[x]$ must include an odd number of linear factors (quadratic factors contribute even parity), so $p$ has at least one real root. (This is also a direct consequence of the Intermediate Value Theorem.)

---

## 26.8 Summary Table of Irreducibility Tests

| Test | Ring | Hypothesis | Conclusion | Where proved |
|------|------|------------|-----------|--------------|
| **Rational Root** (Thm 26.3) | $\mathbb{Q}[x]$ | No $r/s$ (with $r \mid a_0, s \mid a_n$) is a root | $p$ has no linear factor over $\mathbb{Q}$ | §26.2 |
| **Gauss** (Cor 26.7) | $\mathbb{Z}[x]$ primitive | n/a | $\mathbb{Q}$-reducible $\iff$ $\mathbb{Z}$-reducible | §26.3 |
| **Eisenstein** (Thm 26.8) | $\mathbb{Z}[x]$ | Prime $\ell$: $\ell \nmid a_n$, $\ell \mid a_i$ ($i < n$), $\ell^2 \nmid a_0$ | Irreducible over $\mathbb{Q}$ | §26.4 |
| **Reduction mod $p$** (Thm 26.9) | $\mathbb{Z}[x]$ monic | $\bar p$ irreducible in $\mathbb{F}_\ell[x]$ | Irreducible over $\mathbb{Q}$ | §26.5 |
| **Factor theorem** | $\mathbb{F}[x]$ | $p(a) = 0$ | $(x - a) \mid p$ | [[24-polynomial-rings]] |
| **Low degree** (Cor 26.4(a)) | $\mathbb{F}[x]$, $\deg \in \{2,3\}$ | $p$ has no root in $\mathbb{F}$ | Irreducible | §26.2 |
| **Quartic** (Cor 26.4(b)) | $\mathbb{F}[x]$, $\deg = 4$ | No root **and** no factor as product of two irreducible quadratics | Irreducible | §26.2 |

**Strategic guidance.** When testing $p(x) \in \mathbb{Q}[x]$ for irreducibility:

1. **First:** check for rational roots (RRT). If any, $p$ is reducible.
2. **Next:** try Eisenstein directly. Look for a prime dividing all lower coefficients but not the leading, with $\ell^2$ missing from the constant.
3. **If Eisenstein fails directly:** try the shift $x \to x + c$ for $c \in \{1, -1, 2, \ldots\}$ and recheck.
4. **Otherwise:** try reduction mod $p$ for small primes $2, 3, 5$. If $\bar p$ is irreducible in some $\mathbb{F}_\ell[x]$, done.
5. **Last resort:** brute force factorization into monic integer factors via the constraint that their product of constant terms equals $\pm a_0$.

---

## 26.9 Practice Problems

> **Problem 1.** Determine whether $p(x) = x^3 - 3x + 1$ is irreducible over $\mathbb{Q}$.

> **Problem 2.** Show that $p(x) = x^4 + 1$ is irreducible over $\mathbb{Q}$. *(Hint: substitute $x \to x + 1$.)*

> **Problem 3.** Show that $p(x) = x^3 + x + 1 \in \mathbb{F}_2[x]$ is irreducible, and hence that $\mathbb{F}_2[x]/\langle x^3 + x + 1 \rangle$ is a field of order $8$.

> **Problem 4.** Is $p(x) = x^4 + x + 1$ irreducible over $\mathbb{Q}$?

> **Problem 5.** Show that $p(x) = 2x^5 - 6x + 6$ is irreducible over $\mathbb{Q}$.

> **Problem 6.** Decompose $p(x) = x^4 - 4$ into irreducibles over $\mathbb{Q}$, $\mathbb{R}$, and $\mathbb{C}$.

> **Problem 7.** Determine **all** monic irreducible polynomials of degree $\le 3$ over $\mathbb{F}_2$.

> **Problem 8.** Show that the 7-th cyclotomic polynomial $\Phi_7(x) = x^6 + x^5 + x^4 + x^3 + x^2 + x + 1$ is irreducible over $\mathbb{Q}$.

---

### Solutions

**Solution 1.**

*Setup.* $p(x) = x^3 - 3x + 1$ is monic of degree $3$ with integer coefficients: $a_3 = 1, a_2 = 0, a_1 = -3, a_0 = 1$. By Corollary 26.4(a), we need only check that $p$ has no rational root.

*Strategy.* Use the Rational Root Theorem (Theorem 26.3). Since $p$ is monic, any rational root is an integer dividing the constant term $1$.

*Candidates.* $r/s$ with $r \mid 1, s \mid 1$: $r/s \in \{\pm 1\}$.

*Evaluate.*
$$p(1) = 1 - 3 + 1 = -1, \qquad p(-1) = -1 + 3 + 1 = 3.$$
Neither is zero.

*Conclusion.* $p$ has no rational root, and being a cubic, by Corollary 26.4(a) $p$ is **irreducible over $\mathbb{Q}$**.

*Verification.* A cubic real polynomial has either one real root or three. Numerical estimates: $p(-2) = -8 + 6 + 1 = -1$, $p(-1) = 3$, so there is a real root in $(-2, -1)$ (IVT). $p(0) = 1$, $p(1) = -1$, so another real root in $(0, 1)$. $p(1) = -1, p(2) = 3$, so a third in $(1, 2)$. All three real roots irrational. Consistent with irreducibility over $\mathbb{Q}$. $\checkmark$

*Interpretation.* This is a famous polynomial whose roots are $2\cos(2\pi k/9)$ for $k = 1, 2, 4$ (related to construction of the regular nonagon — not classically constructible). $\blacksquare$

---

**Solution 2.**

*Setup.* $p(x) = x^4 + 1$. We saw Eisenstein does not apply directly (no prime divides the only nonzero lower coefficient, the constant $1$). We follow the hint: shift $x \to x + 1$.

*Strategy.* Compute $p(x + 1)$, apply Eisenstein at $\ell = 2$, and conclude by invariance under substitution.

*Computation.* By the binomial theorem,
$$(x + 1)^4 = x^4 + 4 x^3 + 6 x^2 + 4 x + 1.$$
Hence
$$p(x + 1) = (x + 1)^4 + 1 = x^4 + 4 x^3 + 6 x^2 + 4 x + 2.$$

Coefficients: $a_4 = 1, a_3 = 4, a_2 = 6, a_1 = 4, a_0 = 2$.

*Check Eisenstein at $\ell = 2$.*
1. $2 \nmid 1 = a_4$. $\checkmark$
2. $2 \mid 4, 6, 4, 2$. $\checkmark$
3. $4 \nmid 2 = a_0$. $\checkmark$

All three conditions hold. By Eisenstein's criterion, $p(x + 1)$ is irreducible in $\mathbb{Q}[x]$.

*Transfer back.* The ring automorphism $\tau: \mathbb{Q}[x] \to \mathbb{Q}[x]$ defined by $\tau(f(x)) = f(x + 1)$ is a $\mathbb{Q}$-algebra isomorphism (with inverse $f(x) \mapsto f(x - 1)$); it preserves degrees and products. If $p(x) = a(x) b(x)$ were a nontrivial factorization, then $p(x+1) = a(x+1) b(x+1)$ would also be nontrivial, contradicting the Eisenstein conclusion.

Hence $p(x) = x^4 + 1$ is irreducible over $\mathbb{Q}$. $\blacksquare$

*Verification / cross-check.* Over $\mathbb{C}$, $x^4 + 1 = 0$ has roots $\zeta_8^{2k+1} = e^{(2k+1)\pi i/4}$ for $k = 0, 1, 2, 3$, i.e. the primitive $8$-th roots of unity. Indeed $x^4 + 1 = \Phi_8(x)$, the $8$-th cyclotomic polynomial. A general theorem (Dedekind) says $\Phi_n$ is irreducible over $\mathbb{Q}$ for every $n$. $\checkmark$

*Interpretive remark.* Over $\mathbb{F}_2$, $x^4 + 1 = (x + 1)^4$ — completely reducible. Over every odd $\mathbb{F}_\ell$, $x^4 + 1$ also factors (this is a consequence of quadratic reciprocity; one of $-1, 2, -2$ is a square mod $\ell$). So **reduction mod $p$ fails for every $\ell$** — this is *the* textbook example that the converse of Theorem 26.9 is false. Shifted Eisenstein is the right tool. $\square$

---

**Solution 3.**

*Setup.* $p(x) = x^3 + x + 1 \in \mathbb{F}_2[x]$, a monic cubic. We prove irreducibility and then apply Theorem 26.10.

*Strategy.* A cubic over a field $\mathbb{F}$ is irreducible iff it has no root in $\mathbb{F}$ (Corollary 26.4(a)). Test all elements of $\mathbb{F}_2 = \{0, 1\}$.

*Computation.*
$$p(0) = 0 + 0 + 1 = 1 \ne 0, \qquad p(1) = 1 + 1 + 1 = 3 \equiv 1 \pmod 2 \ne 0.$$

No root, so by Corollary 26.4(a), $p$ is irreducible in $\mathbb{F}_2[x]$.

*Apply Theorem 26.10.* $\mathbb{F}_2$ is a field, $p$ is irreducible of positive degree, so
$$\mathbb{F}_2[x]/\langle x^3 + x + 1 \rangle$$
is a field.

*Count elements.* Elements are represented uniquely by polynomials of degree $< 3$: $a_0 + a_1 \bar x + a_2 \bar x^2$ with $a_i \in \mathbb{F}_2 = \{0, 1\}$. That gives $2^3 = 8$ elements. Hence the quotient is a field of order $8$, denoted $\mathbb{F}_8$.

$$\boxed{\mathbb{F}_2[x]/\langle x^3 + x + 1 \rangle \cong \mathbb{F}_8.}$$

*Verification.* Let $\alpha = \bar x$, so $\alpha^3 = \alpha + 1$ in the quotient (using $\alpha^3 + \alpha + 1 = 0$ and characteristic $2$). Then the nonzero elements are $\{1, \alpha, \alpha^2, \alpha^3, \alpha^4, \alpha^5, \alpha^6\}$ — we check this is a full cyclic group of order $7 = |\mathbb{F}_8^\times|$:
- $\alpha^3 = \alpha + 1$
- $\alpha^4 = \alpha \cdot \alpha^3 = \alpha(\alpha + 1) = \alpha^2 + \alpha$
- $\alpha^5 = \alpha \cdot \alpha^4 = \alpha^3 + \alpha^2 = (\alpha + 1) + \alpha^2 = \alpha^2 + \alpha + 1$
- $\alpha^6 = \alpha \cdot \alpha^5 = \alpha^3 + \alpha^2 + \alpha = (\alpha + 1) + \alpha^2 + \alpha = \alpha^2 + 1$
- $\alpha^7 = \alpha \cdot \alpha^6 = \alpha^3 + \alpha = (\alpha + 1) + \alpha = 1$. $\checkmark$

So $\alpha$ has order exactly $7$ — a generator of $\mathbb{F}_8^\times$, confirming $\alpha$ is a **primitive element**. Every nonzero element is a power of $\alpha$. $\blacksquare$

*Interpretation.* This construction realizes $\mathbb{F}_8$ concretely — useful for error-correcting codes, cryptography, and computation in finite fields.

---

**Solution 4.**

*Setup.* $p(x) = x^4 + x + 1 \in \mathbb{Z}[x]$. We test irreducibility over $\mathbb{Q}$ via reduction mod $2$.

*Strategy.* Show $\bar p(x) = x^4 + x + 1 \in \mathbb{F}_2[x]$ is irreducible, then apply Theorem 26.9 (since $p$ is monic).

*Step 1 — Rule out linear factors (roots in $\mathbb{F}_2$).*
$$\bar p(0) = 0 + 0 + 1 = 1 \ne 0, \qquad \bar p(1) = 1 + 1 + 1 = 3 \equiv 1 \pmod 2 \ne 0.$$
No root. So no linear factor.

*Step 2 — Rule out product of two irreducible quadratics.* The unique irreducible monic quadratic in $\mathbb{F}_2[x]$ is $x^2 + x + 1$ (see Example 6 / Problem 7 for the enumeration). The only possible factorization into two irreducible quadratics is $(x^2 + x + 1)^2$.

Compute $(x^2 + x + 1)^2$:
$$(x^2 + x + 1)(x^2 + x + 1) = x^4 + x^3 + x^2 + x^3 + x^2 + x + x^2 + x + 1 = x^4 + 2x^3 + 3 x^2 + 2 x + 1.$$
Reduce mod $2$:
$$(x^2 + x + 1)^2 \equiv x^4 + x^2 + 1 \pmod 2.$$

Compare with $\bar p(x) = x^4 + x + 1$: the $x^2$-coefficient is $0$ in $\bar p$ but $1$ in the square; the $x$-coefficient is $1$ in $\bar p$ but $0$ in the square. So $(x^2 + x + 1)^2 \ne \bar p$, and $\bar p$ is not a product of two irreducible quadratics.

*Step 3 — Conclude irreducibility of $\bar p$.* By Corollary 26.4(b), a degree-$4$ polynomial with no root and no factorization into two irreducible quadratics is irreducible. Hence $\bar p$ is irreducible in $\mathbb{F}_2[x]$.

*Step 4 — Apply Theorem 26.9.* $p$ is monic and $\bar p$ is irreducible in $\mathbb{F}_2[x]$. Therefore $p(x) = x^4 + x + 1$ is **irreducible over $\mathbb{Q}$**. $\blacksquare$

*Sanity check.* Rational root candidates for $p$: $\pm 1$. $p(1) = 3, p(-1) = 1$ — nonzero. So no rational root (consistent with the stronger conclusion). $\checkmark$

*Interpretation.* This polynomial is the minimal polynomial of a primitive element of $\mathbb{F}_{16}$: since it is degree $4$ and irreducible over $\mathbb{F}_2$, the quotient $\mathbb{F}_2[x]/\langle x^4 + x + 1 \rangle \cong \mathbb{F}_{16}$.

---

**Solution 5.**

*Setup.* $p(x) = 2x^5 - 6x + 6 \in \mathbb{Z}[x]$. The content is $\gcd(2, 6, 6) = 2$, so $p$ is not primitive: write
$$p(x) = 2 \cdot q(x), \quad q(x) = x^5 - 3x + 3.$$

*Strategy.* In $\mathbb{Q}[x]$, the constant $2$ is a unit, so $p$ is irreducible iff $q$ is irreducible. Apply Eisenstein to $q$.

*Apply Eisenstein to $q(x) = x^5 - 3x + 3$ at $\ell = 3$.*

Coefficients: $a_5 = 1, a_4 = 0, a_3 = 0, a_2 = 0, a_1 = -3, a_0 = 3$.

1. $3 \nmid 1 = a_5$. $\checkmark$
2. $3 \mid 0 = a_4, 0 = a_3, 0 = a_2, -3 = a_1, 3 = a_0$. $\checkmark$
3. $9 \nmid 3 = a_0$. $\checkmark$

All three hold. By Eisenstein, $q(x)$ is irreducible in $\mathbb{Q}[x]$.

*Conclude for $p$.* Since $p = 2q$ and $2 \in \mathbb{Q}^\times$, $p$ differs from $q$ by a unit, hence has the same ideal and the same irreducibility status: **$p$ is irreducible in $\mathbb{Q}[x]$**. $\blacksquare$

*Remark on $\mathbb{Z}[x]$ vs $\mathbb{Q}[x]$.* In $\mathbb{Z}[x]$, $p = 2 \cdot q$ is a **reducible** factorization (both $2$ and $q$ are non-units in $\mathbb{Z}[x]$). The moral: irreducibility depends on the ring. Gauss's Lemma (Corollary 26.7) reconciles this by saying: "primitive + $\mathbb{Q}$-irreducible" $\iff$ "$\mathbb{Z}$-irreducible". Here $p$ is $\mathbb{Q}$-irreducible but not primitive, so not $\mathbb{Z}$-irreducible.

*Verification.* $q(x) = x^5 - 3x + 3$ should have no rational root. By RRT, candidates are $\pm 1, \pm 3$:
$$q(1) = 1, \quad q(-1) = 5, \quad q(3) = 243 - 9 + 3 = 237, \quad q(-3) = -243 + 9 + 3 = -231.$$
None zero. Consistent with irreducibility. $\checkmark$

---

**Solution 6.**

*Setup.* $p(x) = x^4 - 4$. Factor in successively larger fields $\mathbb{Q} \subset \mathbb{R} \subset \mathbb{C}$.

*Strategy.* First factor as a difference of squares in $\mathbb{Q}$, then analyze each factor over $\mathbb{R}$ and $\mathbb{C}$.

**Over $\mathbb{Q}$:**

Difference of squares: $x^4 - 4 = (x^2)^2 - 2^2 = (x^2 - 2)(x^2 + 2)$.

*Irreducibility of $x^2 - 2$ over $\mathbb{Q}$.* By RRT, rational roots are $\pm 1, \pm 2$; none satisfy $x^2 = 2$. Degree $2$, no rational root $\Rightarrow$ irreducible.

*Irreducibility of $x^2 + 2$ over $\mathbb{Q}$.* $x^2 + 2 = 0$ has no real (hence no rational) solutions since $x^2 \ge 0 > -2$. Degree $2$, no root $\Rightarrow$ irreducible.

$$\boxed{x^4 - 4 = (x^2 - 2)(x^2 + 2) \text{ in } \mathbb{Q}[x].}$$

**Over $\mathbb{R}$:**

- $x^2 - 2 = (x - \sqrt 2)(x + \sqrt 2)$ splits: both roots $\pm \sqrt 2 \in \mathbb{R}$.
- $x^2 + 2$ remains irreducible: no real roots (discriminant $= -8 < 0$).

$$\boxed{x^4 - 4 = (x - \sqrt 2)(x + \sqrt 2)(x^2 + 2) \text{ in } \mathbb{R}[x].}$$

**Over $\mathbb{C}$:**

$x^2 + 2 = 0 \iff x^2 = -2 \iff x = \pm i\sqrt 2$. So $x^2 + 2 = (x - i\sqrt 2)(x + i\sqrt 2)$.

$$\boxed{x^4 - 4 = (x - \sqrt 2)(x + \sqrt 2)(x - i\sqrt 2)(x + i \sqrt 2) \text{ in } \mathbb{C}[x].}$$

*Verification (degree counts).* Over $\mathbb{Q}$: $2 + 2 = 4$. Over $\mathbb{R}$: $1 + 1 + 2 = 4$. Over $\mathbb{C}$: $1 + 1 + 1 + 1 = 4$. $\checkmark$

*Interpretation.* The factorization tells us the splitting field of $x^4 - 4$ over $\mathbb{Q}$ is $\mathbb{Q}(\sqrt 2, i\sqrt 2) = \mathbb{Q}(\sqrt 2, i)$, a degree-$4$ extension of $\mathbb{Q}$. This is a classical **biquadratic** field. $\blacksquare$

---

**Solution 7.**

*Setup.* We enumerate all monic irreducible polynomials in $\mathbb{F}_2[x]$ of degree $1$, $2$, and $3$.

**Degree $1$.** Every monic linear polynomial is irreducible. They are:
$$x, \qquad x + 1.$$
Count: $2$.

**Degree $2$.** Monic quadratics over $\mathbb{F}_2$ have the form $x^2 + a x + b$ with $a, b \in \{0, 1\}$: four candidates.

*Test each for roots:*
- $x^2 = x \cdot x$: has root $0$. Reducible.
- $x^2 + 1$: $0 \mapsto 1, 1 \mapsto 0$. Root $1$ ($\Rightarrow x^2 + 1 = (x + 1)^2$ in $\mathbb{F}_2$). Reducible.
- $x^2 + x = x(x + 1)$: roots $0, 1$. Reducible.
- $x^2 + x + 1$: $0 \mapsto 1, 1 \mapsto 1$. No root. Irreducible (by Corollary 26.4(a)).

Count: $1$. The unique monic irreducible quadratic is $x^2 + x + 1$.

**Degree $3$.** Monic cubics over $\mathbb{F}_2$: $x^3 + a_2 x^2 + a_1 x + a_0$, with $a_i \in \{0, 1\}$ — $2^3 = 8$ candidates.

*First constraint — nonzero constant term (else $0$ is a root).* $a_0 = 1$. Reduces to $4$ candidates.

*Second constraint — $1$ is not a root.* $p(1) = 1 + a_2 + a_1 + 1 = a_2 + a_1 \ne 0$, i.e. $a_2 + a_1 = 1$ in $\mathbb{F}_2$. So exactly one of $a_1, a_2$ equals $1$.

*The two surviving candidates:*
- $(a_2, a_1) = (0, 1)$: $p(x) = x^3 + x + 1$. Check: $p(0) = 1, p(1) = 1 + 1 + 1 = 1$. No root. Irreducible (degree $3$, no root).
- $(a_2, a_1) = (1, 0)$: $p(x) = x^3 + x^2 + 1$. Check: $p(0) = 1, p(1) = 1 + 1 + 1 = 1$. No root. Irreducible.

Count: $2$.

*Eliminated candidates (for the record):*
- $x^3 + 1$: $p(1) = 0$. Reducible: $x^3 + 1 = (x + 1)(x^2 + x + 1)$.
- $x^3 + x^2 + x + 1$: $p(1) = 0$. Reducible: $x^3 + x^2 + x + 1 = (x + 1)(x^2 + 1) = (x + 1)(x + 1)^2 = (x + 1)^3$.

**Summary.**

| Degree | Irreducible monic polynomials over $\mathbb{F}_2$ | Count |
|--------|----------------------------------------------------|-------|
| $1$    | $x$, $x + 1$                                       | $2$   |
| $2$    | $x^2 + x + 1$                                      | $1$   |
| $3$    | $x^3 + x + 1$, $x^3 + x^2 + 1$                     | $2$   |

**Total count of irreducibles of degree $\le 3$: $2 + 1 + 2 = 5$.**

*Verification via Gauss's formula.* The number of monic irreducibles of degree $n$ over $\mathbb{F}_q$ is
$$N_q(n) = \frac{1}{n} \sum_{d \mid n} \mu(d) q^{n/d}.$$
With $q = 2$:
- $N_2(1) = 2$. $\checkmark$
- $N_2(2) = \tfrac{1}{2}(2^2 - 2) = 1$. $\checkmark$
- $N_2(3) = \tfrac{1}{3}(2^3 - 2) = 2$. $\checkmark$

All counts match. $\blacksquare$

*Interpretation.* These irreducibles are the building blocks for constructing $\mathbb{F}_{2^n}$: the degree-$2$ one gives $\mathbb{F}_4$, the degree-$3$ ones give (isomorphic copies of) $\mathbb{F}_8$. Different choices of irreducible give isomorphic but differently-presented fields.

---

**Solution 8.**

*Setup.* $\Phi_7(x) = x^6 + x^5 + x^4 + x^3 + x^2 + x + 1$, the $7$-th cyclotomic polynomial. We follow Example 5 (general cyclotomic trick) with $p = 7$.

*Strategy.* Substitute $x = y + 1$, apply Eisenstein at $\ell = 7$, and transfer back.

*Compute $\Phi_7(y + 1)$.* Using $\Phi_7(x) = \frac{x^7 - 1}{x - 1}$:
$$\Phi_7(y + 1) = \frac{(y + 1)^7 - 1}{(y + 1) - 1} = \frac{(y + 1)^7 - 1}{y}.$$

Expand $(y + 1)^7$ by the binomial theorem:
$$(y + 1)^7 = \sum_{k=0}^7 \binom{7}{k} y^k = 1 + 7y + 21 y^2 + 35 y^3 + 35 y^4 + 21 y^5 + 7 y^6 + y^7.$$

Subtract $1$:
$$(y + 1)^7 - 1 = 7y + 21 y^2 + 35 y^3 + 35 y^4 + 21 y^5 + 7 y^6 + y^7.$$

Divide by $y$:
$$\Phi_7(y + 1) = y^6 + 7 y^5 + 21 y^4 + 35 y^3 + 35 y^2 + 21 y + 7.$$

*Check Eisenstein at $\ell = 7$.*

Coefficients (from leading to constant): $1, 7, 21, 35, 35, 21, 7$.

1. $7 \nmid 1 = a_6$. $\checkmark$
2. $7 \mid 7, 21 = 3 \cdot 7, 35 = 5 \cdot 7, 35, 21, 7$ — every lower coefficient. $\checkmark$
3. $49 \nmid 7 = a_0$. $\checkmark$

All three hold. By Eisenstein, $\Phi_7(y + 1)$ is irreducible in $\mathbb{Q}[y]$.

*Transfer back.* The substitution $x \mapsto y + 1$ is a $\mathbb{Q}$-algebra automorphism of the polynomial ring (with inverse $y \mapsto x - 1$) and therefore preserves irreducibility: a nontrivial factorization of $\Phi_7(x)$ would pull back to one of $\Phi_7(y + 1)$.

Hence $\Phi_7(x)$ is **irreducible over $\mathbb{Q}$**. $\blacksquare$

*Verification.* The general fact "$\Phi_p$ is irreducible for every prime $p$" (Example 5) covers this. We can also verify: the roots of $\Phi_7$ are the six primitive $7$-th roots of unity $e^{2\pi i k/7}$ for $k = 1, 2, 3, 4, 5, 6$; they all have the same minimal polynomial over $\mathbb{Q}$ precisely because $\Phi_7$ is irreducible. $\checkmark$

*Interpretation.* $\mathbb{Q}(\zeta_7)/\mathbb{Q}$ is a degree-$6$ extension, the $7$-th **cyclotomic field**. Its Galois group is $(\mathbb{Z}/7\mathbb{Z})^\times \cong \mathbb{Z}/6\mathbb{Z}$, a cyclic group. This field is the natural home for $7$-th roots of unity and features in analytic number theory, class field theory, and the Kronecker–Weber theorem.

---

## Related Concepts

- [[24-polynomial-rings]] — Division algorithm, factor theorem, PID structure of $\mathbb{F}[x]$
- [[22-ideals-and-quotient-rings]] — Prime/maximal ideals and the Field/Domain criterion
- [[25-prime-and-maximal-ideals]] — The correspondence used in Theorem 26.10
- [[27-finite-fields-and-extensions]] — Constructing $\mathbb{F}_{p^n}$ via irreducible polynomials
- [[28-co5-practice-problems]] — Extensive worked problems in CO5

---

*Last updated: 2026-04-19*
