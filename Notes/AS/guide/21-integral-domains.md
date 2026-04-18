---
title: "Integral Domains"
type: guide
co: CO4
related: [19-rings-definition-and-examples, 22-ideals-and-quotient-rings, 24-polynomial-rings, 26-fields-and-irreducibility]
---

# 21. Integral Domains

An **integral domain** is a commutative ring with unity in which the product of two nonzero elements is nonzero — equivalently, a ring with **no zero divisors**. Integral domains are the cleanest commutative rings: they inherit the cancellation law and divisibility theory from $\mathbb{Z}$. This chapter develops their theory, introduces the **characteristic**, and builds toward the **field of fractions** construction that extends any integral domain to a field.

## 21.1 Definition

> **Definition 21.1 (Integral domain).** A **commutative ring with unity** $R$ (with $1 \neq 0$) is an **integral domain** if it has no zero divisors, i.e., for all $a, b \in R$:
> $$ab = 0 \implies a = 0 \text{ or } b = 0.$$

### Examples and non-examples

**Example 1 ($\mathbb{Z}$).** Integral domain.

**Example 2 ($\mathbb{Z}_n$).** Integral domain iff $n$ is prime.

**Example 3 (Fields).** Every field is an integral domain (Corollary 19.11).

**Example 4 ($\mathbb{Z}[i]$).** Gaussian integers are an integral domain (subring of $\mathbb{C}$, which has no zero divisors).

**Example 5 ($\mathbb{R}[x]$, $\mathbb{F}[x]$ for any field $\mathbb{F}$).** Polynomial rings over fields are integral domains (Theorem 24.5 of [[24-polynomial-rings]]).

**Example 6 ($\mathbb{Z} \times \mathbb{Z}$).** Not an integral domain — contains zero divisors $(1, 0)(0, 1) = (0, 0)$.

**Example 7 ($M_n(\mathbb{R})$, $n \ge 2$).** Not an integral domain (not commutative, and has zero divisors).

## 21.2 Cancellation Law

> **Theorem 21.2 (Cancellation Law in Integral Domains).** Let $R$ be an integral domain. For $a, b, c \in R$ with $c \neq 0$:
> $$ac = bc \implies a = b.$$

*Proof.* $ac - bc = (a - b)c = 0$. Since $c \neq 0$ and $R$ has no zero divisors, $a - b = 0$, so $a = b$. $\blacksquare$

**Remark.** The cancellation law fails in rings with zero divisors. In $\mathbb{Z}_6$: $2 \cdot 3 = 0 = 5 \cdot 0$, but we cannot cancel the 0.

### A useful criterion

> **Proposition 21.3.** A commutative ring with unity $R$ is an integral domain iff the cancellation law holds for nonzero elements.

*Proof.* ($\Rightarrow$) Theorem 21.2.

($\Leftarrow$) Suppose $ab = 0$ with $a \neq 0$. Then $ab = a \cdot 0$, so by cancellation, $b = 0$. $\blacksquare$

## 21.3 Finite Integral Domains are Fields

> **Theorem 21.4.** Every finite integral domain is a field.

*Proof.* Let $R$ be a finite integral domain. We show every nonzero $a \in R$ has a multiplicative inverse.

Consider the map $L_a: R \to R$, $L_a(x) = ax$. If $L_a(x) = L_a(y)$, then $ax = ay$, so $x = y$ by cancellation. Hence $L_a$ is injective.

Since $R$ is finite and $L_a$ is an injection from $R$ to itself, $L_a$ is surjective. In particular, $L_a(x) = 1$ for some $x \in R$, giving $ax = 1$. Thus $a$ has an inverse.

Since $R$ is commutative, $R$ is a field. $\blacksquare$

**Consequence.** $\mathbb{Z}_p$ for $p$ prime is a field (the **finite field $\mathbb{F}_p$**) — proven here more cleanly than in [[19-rings-definition-and-examples]].

## 21.4 Characteristic of a Ring

> **Definition 21.5 (Characteristic).** For a ring $R$ with unity, the **characteristic** $\operatorname{char}(R)$ is the smallest positive integer $n$ such that
> $$n \cdot 1 = \underbrace{1 + 1 + \cdots + 1}_{n \text{ times}} = 0.$$
> If no such $n$ exists, $\operatorname{char}(R) = 0$.

Equivalently, $\operatorname{char}(R)$ is the order of 1 in the additive group $(R, +)$.

### Examples

- $\operatorname{char}(\mathbb{Z}) = \operatorname{char}(\mathbb{Q}) = \operatorname{char}(\mathbb{R}) = \operatorname{char}(\mathbb{C}) = 0$
- $\operatorname{char}(\mathbb{Z}_n) = n$
- $\operatorname{char}(\mathbb{F}_p) = p$
- $\operatorname{char}(\mathbb{F}_p[x]) = p$

> **Theorem 21.6.** The characteristic of an integral domain is either 0 or a prime.

*Proof.* Let $D$ be an integral domain with $\operatorname{char}(D) = n > 0$. Suppose for contradiction that $n = ab$ with $1 < a, b < n$. Then
$$0 = n \cdot 1 = (ab) \cdot 1 = (a \cdot 1)(b \cdot 1).$$
Since $D$ is an integral domain, $a \cdot 1 = 0$ or $b \cdot 1 = 0$. But $a < n$ and $b < n$ contradict minimality of $n$. Hence $n$ is prime. $\blacksquare$

### Frobenius endomorphism

> **Theorem 21.7 (Frobenius).** Let $R$ be a commutative ring of characteristic $p$ prime. Then the map $\phi_p: R \to R$, $\phi_p(a) = a^p$, is a ring homomorphism.

*Proof.* $\phi_p(ab) = (ab)^p = a^p b^p = \phi_p(a)\phi_p(b)$ (using commutativity).

$\phi_p(a + b) = (a + b)^p = \sum_{k=0}^p \binom{p}{k} a^k b^{p-k}$. For $1 \le k \le p-1$, $\binom{p}{k} = \frac{p!}{k!(p-k)!}$ is divisible by $p$ (numerator has $p$, denominator doesn't). In characteristic $p$, such terms vanish. Hence $(a + b)^p = a^p + b^p$. $\blacksquare$

**Consequence.** "Freshman's dream" holds in characteristic $p$: $(a + b)^p = a^p + b^p$.

## 21.5 Divisibility in Integral Domains

> **Definition 21.8 (Divisibility).** In an integral domain $D$, we say $a$ **divides** $b$ (written $a \mid b$) if there exists $c \in D$ with $b = ac$.

> **Definition 21.9 (Associates).** $a$ and $b$ are **associates** if $a = ub$ for some unit $u \in D^\times$.

**Example 8.** In $\mathbb{Z}$, associates of $a$ are $\{a, -a\}$.

**Example 9.** In $\mathbb{Z}[i]$, associates of $a + bi$ are $\{a+bi, -a-bi, -b+ai, b-ai\}$ (multiplied by $1, -1, i, -i$).

> **Definition 21.10 (Irreducible, prime).**
> - $p \in D$ (nonzero, non-unit) is **irreducible** if $p = ab \implies a \in D^\times$ or $b \in D^\times$.
> - $p \in D$ (nonzero, non-unit) is **prime** if $p \mid ab \implies p \mid a$ or $p \mid b$.

> **Proposition 21.11.** In an integral domain, every prime is irreducible.

*Proof.* Suppose $p$ is prime and $p = ab$. Then $p \mid ab$, so $p \mid a$ or $p \mid b$. WLOG $p \mid a$, so $a = pc$. Then $p = pcb$, giving $1 = cb$ (canceling $p \neq 0$). So $b$ is a unit. $\blacksquare$

**Warning.** The converse fails in general! "Irreducible ⟹ prime" holds in **unique factorization domains** (UFDs), but not always.

**Example 10 (Irreducible but not prime).** In $\mathbb{Z}[\sqrt{-5}]$: $6 = 2 \cdot 3 = (1 + \sqrt{-5})(1 - \sqrt{-5})$. Here 2 is irreducible but not prime: $2 \mid (1+\sqrt{-5})(1-\sqrt{-5}) = 6$ but $2 \nmid (1 \pm \sqrt{-5})$.

## 21.6 Field of Fractions

We construct the smallest field containing a given integral domain.

> **Theorem 21.12 (Field of fractions).** Let $D$ be an integral domain. There exists a field $\operatorname{Frac}(D)$ (also denoted $Q(D)$) containing $D$ as a subring, such that every element of $\operatorname{Frac}(D)$ is of the form $ab^{-1}$ for some $a, b \in D$, $b \neq 0$. $\operatorname{Frac}(D)$ is unique up to isomorphism.

*Construction sketch.* On $D \times (D \setminus \{0\})$, define equivalence $(a, b) \sim (c, d) \iff ad = bc$. Equivalence classes form the field with operations
$$[a, b] + [c, d] = [ad + bc, bd], \quad [a, b] \cdot [c, d] = [ac, bd].$$
Check well-definedness, field axioms.

Embed $D \hookrightarrow \operatorname{Frac}(D)$ via $a \mapsto [a, 1]$.

Denote $[a, b] = a/b$. $\blacksquare$

### Examples

**Example 11.** $\operatorname{Frac}(\mathbb{Z}) = \mathbb{Q}$.

**Example 12.** $\operatorname{Frac}(\mathbb{Z}[i]) = \mathbb{Q}(i) = \{a + bi : a, b \in \mathbb{Q}\}$.

**Example 13.** $\operatorname{Frac}(\mathbb{F}[x]) = \mathbb{F}(x) = \{p(x)/q(x) : p, q \in \mathbb{F}[x], q \neq 0\}$, **rational functions** over $\mathbb{F}$.

## 21.7 Universal Property of $\operatorname{Frac}(D)$

> **Theorem 21.13.** Let $D$ be an integral domain, $K = \operatorname{Frac}(D)$, and $\varphi: D \to F$ an injective ring homomorphism into a field $F$. Then there exists a unique ring homomorphism $\tilde\varphi: K \to F$ extending $\varphi$:
> $$\tilde\varphi(a/b) = \varphi(a)\varphi(b)^{-1}.$$

This encodes the fact that $K$ is the **smallest** field containing $D$. $\blacksquare$

## 21.8 Characteristic and Subfields

> **Theorem 21.14 (Prime subfield).** Every field $F$ contains a unique **prime subfield** — the smallest subfield — which is:
> - $\mathbb{Q}$ if $\operatorname{char}(F) = 0$
> - $\mathbb{F}_p$ if $\operatorname{char}(F) = p$

*Proof sketch.* Consider the ring homomorphism $\psi: \mathbb{Z} \to F$, $\psi(n) = n \cdot 1$.

If $\operatorname{char}(F) = 0$: $\psi$ is injective, so $\mathbb{Z} \hookrightarrow F$. Since $F$ is a field, the field of fractions $\operatorname{Frac}(\mathbb{Z}) = \mathbb{Q}$ embeds in $F$.

If $\operatorname{char}(F) = p$: $\psi$ has kernel $p\mathbb{Z}$, so image is $\mathbb{Z}/p\mathbb{Z} = \mathbb{F}_p \le F$. $\blacksquare$

## 21.9 Worked Examples

**Example 14.** Verify that $\mathbb{Z}[x]$ is an integral domain.

*Solution.* $\mathbb{Z}$ is an integral domain. $\mathbb{Z}[x]$ is polynomials in $x$ with $\mathbb{Z}$ coefficients. Suppose $p(x)q(x) = 0$ in $\mathbb{Z}[x]$ with $p, q \neq 0$. Leading coefficient of $pq$ = product of leading coefficients of $p$ and $q$, which is nonzero (since $\mathbb{Z}$ has no zero divisors). Contradicts $pq = 0$. $\blacksquare$

**Example 15.** Find $\operatorname{char}(\mathbb{Z}_4 \times \mathbb{Z}_6)$.

*Solution.* Order of $(1, 1)$ additively: $n(1, 1) = (n, n) = (0, 0)$ iff $4 \mid n$ and $6 \mid n$, iff $12 \mid n$. So $\operatorname{char} = 12$.

(Not an integral domain — has zero divisors.) $\boxed{12}$

**Example 16.** Show $\mathbb{Z}[i]/\langle 1 + i \rangle \cong \mathbb{F}_2$.

*Solution.* Define $\varphi: \mathbb{Z}[i] \to \mathbb{F}_2 = \{0, 1\}$ by $\varphi(a + bi) = (a + b) \bmod 2$.

Homomorphism: $\varphi((a+bi)(c+di)) = \varphi((ac - bd) + (ad+bc)i) = (ac - bd + ad + bc) \bmod 2 = (ac + bd + ad + bc) \bmod 2 = (a+b)(c+d) \bmod 2 = \varphi(a+bi)\varphi(c+di)$. ✓

Surjective: $\varphi(0) = 0, \varphi(1) = 1$.

Kernel: $a + b \equiv 0 \pmod 2$, i.e., $a + b$ even. Note $(1 + i)(a + bi) = (a - b) + (a + b)i$. So $\langle 1 + i \rangle$ contains elements $(a - b) + (a + b)i$ — these have $a + b \equiv 0 \pmod 2$ iff... hmm, let me re-examine.

Alternatively: $(1 + i)(1 - i) = 1 - i^2 = 2$. So $2 \in \langle 1+i \rangle$. Also $1 + i \in \langle 1 + i \rangle$. In the quotient, $\overline{2} = 0$ and $\overline{1 + i} = 0$, i.e., $\overline{i} = \overline{-1} = \overline{1}$. So $\overline{a + bi} = \overline{a + b} = (a + b) \bmod 2$. Hence quotient has 2 elements $\{\overline{0}, \overline{1}\}$, i.e., $\mathbb{F}_2$. $\boxed{\mathbb{Z}[i]/\langle 1+i \rangle \cong \mathbb{F}_2}$

## 21.10 Practice Problems

**Problem 1.** Show $\mathbb{Z}_n$ is an integral domain iff $n$ is prime.

**Problem 2.** Prove that every subring of a field that contains 1 is an integral domain.

**Problem 3.** Find $\operatorname{char}(\mathbb{Z}_6 \times \mathbb{Z}_{15})$.

**Problem 4.** In $\mathbb{Z}[i]$, show that $1 + i$ is irreducible.

**Problem 5.** Show that in an integral domain, if $a^n = 0$ for some $n \ge 1$, then $a = 0$ (integral domains have no nonzero nilpotents).

**Problem 6.** Find $\operatorname{Frac}(\mathbb{Z}[\sqrt{2}])$.

**Problem 7.** Let $D$ be an integral domain. Show that $D[x]$ is also an integral domain, and find $D[x]^\times$ (units of $D[x]$).

### Solutions

**1.** If $n$ is prime, $\mathbb{Z}_n = \mathbb{F}_n$ is a field, hence integral domain. If $n = ab$ with $1 < a, b < n$, then $\bar a \bar b = 0$ in $\mathbb{Z}_n$ with $\bar a, \bar b \neq 0$. $\blacksquare$

**2.** Subring of $\mathbb{F}$ (field) contains 1 and is closed under $+, \cdot, -$. Since $\mathbb{F}$ has no zero divisors, neither does the subring. Commutative (inherited). Hence integral domain. $\blacksquare$

**3.** $\operatorname{char} = \operatorname{lcm}(6, 15) = 30$. $\boxed{30}$

**4.** Suppose $1 + i = (a + bi)(c + di)$ in $\mathbb{Z}[i]$. Take norms: $N(1+i) = 1^2 + 1^2 = 2$. $N((a+bi)(c+di)) = N(a+bi) N(c+di) = (a^2+b^2)(c^2+d^2) = 2$. Since $a^2 + b^2, c^2 + d^2 \in \mathbb{Z}_{\ge 0}$, and their product is 2 prime, one of them equals 1 (unit norm) and the other 2. WLOG $a^2 + b^2 = 1$, giving $a + bi \in \{\pm 1, \pm i\}$ — units. $\blacksquare$

**5.** If $a^n = 0$ and $a \neq 0$: $a^n = a \cdot a^{n-1} = 0$. By no zero divisors, $a = 0$ or $a^{n-1} = 0$. By minimality of $n$, $a^{n-1} \neq 0$ if $n \ge 2$, so $a = 0$. Contradiction unless $n = 1$, which means $a = 0$ directly. $\blacksquare$

**6.** $\operatorname{Frac}(\mathbb{Z}[\sqrt{2}]) = \mathbb{Q}(\sqrt{2}) = \{a + b\sqrt{2} : a, b \in \mathbb{Q}\}$. $\boxed{\mathbb{Q}(\sqrt{2})}$

**7.** Leading coefficient of a product in $D[x]$ is product of leading coefficients; since $D$ is integral domain, no zero divisors in $D[x]$. Units in $D[x]$: if $p(x)q(x) = 1$ with $\deg p = m, \deg q = n$, then $m + n = 0$, so $m = n = 0$ — units are constants that are units in $D$. Hence $D[x]^\times = D^\times$. $\blacksquare$

(For $\mathbb{Z}[x]$: $(\mathbb{Z}[x])^\times = \{\pm 1\}$.)

## Related Concepts

- [[19-rings-definition-and-examples]] — ring basics; zero divisors introduced
- [[22-ideals-and-quotient-rings]] — prime and maximal ideals characterize integral domains via quotients
- [[24-polynomial-rings]] — $D[x]$ is an integral domain when $D$ is
- [[26-fields-and-irreducibility]] — irreducibility tests in polynomial rings

---

*Last updated: 2026-04-18*
