---
title: "Integral Domains"
type: guide
co: CO4
related: [19-rings-definition-and-examples, 22-ideals-and-quotient-rings, 24-polynomial-rings, 26-fields-and-irreducibility]
---

# 21. Integral Domains

> **The cleanest commutative rings.** An **integral domain** is a commutative ring with unity in which the product of two nonzero elements is nonzero — equivalently, a ring with **no zero divisors**. Integral domains are the cleanest commutative rings: they inherit the cancellation law and divisibility theory from $\mathbb{Z}$, they admit a canonical field extension (the field of fractions), and they are the natural setting for factorization theory.
>
> This chapter proves the cancellation law, establishes that finite integral domains are fields, introduces the **characteristic** (and shows it is 0 or prime for an integral domain), develops the **Frobenius endomorphism**, builds the **field of fractions** via an explicit equivalence-class construction (with universal property), and begins divisibility theory by comparing **irreducibles and primes**.

---

## 21.1 Definition

> **Definition 21.1 (Integral domain).** A **commutative ring with unity** $R$ (with $1_R \neq 0_R$) is an **integral domain** if it has no zero divisors, i.e., for all $a, b \in R$:
> $$ab = 0 \implies a = 0 \text{ or } b = 0.$$

**Unpacking the definition.** The five clauses bundled into "integral domain" are:

1. $(R, +)$ is an abelian group.
2. $(R, \cdot)$ is associative.
3. Distributivity: $a(b + c) = ab + ac$ and $(a + b)c = ac + bc$.
4. There is a multiplicative identity $1_R$, and $1_R \neq 0_R$ (excluding the trivial zero ring).
5. Commutativity: $ab = ba$.
6. No zero divisors: $ab = 0 \Rightarrow a = 0$ or $b = 0$.

The first four clauses make $R$ a **ring with unity**; adding (5) gives a **commutative ring with unity**; adding (6) gives an **integral domain**. Dropping (5) yields the broader class of "domains" (rings without zero divisors), but in this course and in most of commutative algebra, "integral domain" implies commutativity.

**Contrapositive form.** The no-zero-divisor axiom is often used in the contrapositive:
$$a \neq 0 \text{ and } b \neq 0 \implies ab \neq 0.$$
This is the form we will deploy in proofs where we reason about nonzero elements.

### Examples and non-examples

**Example 1 ($\mathbb{Z}$).** The integers form an integral domain — in fact, the **prototypical** one. Verification: $\mathbb{Z}$ is a commutative ring with unity $1$; given nonzero $a, b \in \mathbb{Z}$ with (say) $a, b > 0$, $ab \geq 1 > 0$; the other sign cases follow by sign rules. Hence $ab = 0$ forces $a = 0$ or $b = 0$. $\checkmark$

**Example 2 ($\mathbb{Z}_n$).** $\mathbb{Z}_n = \mathbb{Z}/n\mathbb{Z}$ is an integral domain iff $n$ is prime. We prove the equivalence carefully in Practice Problem 1, but the intuition is this: if $n = ab$ with $1 < a, b < n$, then $\bar a \bar b = \overline{ab} = \bar n = \bar 0$ in $\mathbb{Z}_n$, with $\bar a, \bar b \neq 0$ — zero divisors. If $n = p$ prime, Euclid's lemma ($p \mid ab \Rightarrow p \mid a$ or $p \mid b$) is exactly the no-zero-divisor property modulo $p$.

**Example 3 (Fields).** Every field is an integral domain. Proof: let $\mathbb{F}$ be a field, and suppose $ab = 0$ with $a \neq 0$. Then $a^{-1}$ exists; multiply both sides by $a^{-1}$: $a^{-1}(ab) = a^{-1} \cdot 0$, i.e., $(a^{-1}a)b = 0$, i.e., $1 \cdot b = 0$, hence $b = 0$. $\checkmark$ (See Corollary 19.11 of [[19-rings-definition-and-examples]].)

**Example 4 ($\mathbb{Z}[i]$).** The Gaussian integers $\mathbb{Z}[i] = \{a + bi : a, b \in \mathbb{Z}\} \subseteq \mathbb{C}$ form an integral domain. Reason: $\mathbb{Z}[i]$ is a subring of $\mathbb{C}$ (closed under $+, -, \cdot$, contains $1$), and $\mathbb{C}$ being a field has no zero divisors, a property inherited by every subring.

**Example 5 ($\mathbb{F}[x]$, $\mathbb{R}[x]$, $\mathbb{Z}[x]$).** Polynomial rings $D[x]$ over an integral domain $D$ are integral domains. The key computation: if $f(x) = a_m x^m + \cdots$ and $g(x) = b_n x^n + \cdots$ have leading terms $a_m x^m$ and $b_n x^n$ with $a_m, b_n \neq 0$, then $fg$ has leading term $a_m b_n x^{m+n}$, and $a_m b_n \neq 0$ because $D$ has no zero divisors. In particular, $\deg(fg) = \deg f + \deg g$ and $fg \neq 0$. See Theorem 24.5 of [[24-polynomial-rings]] and Practice Problem 7 below.

**Example 6 ($\mathbb{Z} \times \mathbb{Z}$).** Not an integral domain. The elements $(1, 0)$ and $(0, 1)$ are nonzero, but
$$(1, 0) \cdot (0, 1) = (1 \cdot 0, 0 \cdot 1) = (0, 0).$$
More generally, for any nontrivial rings $R, S$, the product ring $R \times S$ has zero divisors $(1, 0)(0, 1) = (0, 0)$.

**Example 7 ($M_n(\mathbb{R})$, $n \geq 2$).** Not an integral domain — and indeed not commutative. A concrete zero-divisor pair in $M_2(\mathbb{R})$:
$$\begin{pmatrix} 1 & 0 \\ 0 & 0\end{pmatrix} \cdot \begin{pmatrix} 0 & 0 \\ 0 & 1\end{pmatrix} = \begin{pmatrix} 0 & 0 \\ 0 & 0\end{pmatrix}.$$
Each factor is nonzero.

**Example 8 ($C[0, 1]$, continuous real-valued functions on $[0,1]$).** Not an integral domain. Consider the "tent" $f$ nonzero on $[0, 1/2]$ and zero on $[1/2, 1]$, and a symmetric $g$ zero on $[0, 1/2]$ and nonzero on $[1/2, 1]$. Both are continuous, nonzero, but $fg \equiv 0$.

**Sanity check / mnemonic.** "Integral domain = where you can cancel." The rest of the chapter explains why.

---

## 21.2 Cancellation Law

> **Theorem 21.2 (Cancellation Law in Integral Domains).** Let $R$ be an integral domain, and let $a, b, c \in R$ with $c \neq 0$. Then
> $$ac = bc \implies a = b.$$
> (By commutativity, the same holds for left multiplication: $ca = cb \Rightarrow a = b$.)

**Proof.** We carry out each step explicitly.

1. Start with $ac = bc$.
2. Subtract $bc$ from both sides: $ac - bc = 0$.
3. Factor using the distributive law: $(a - b)c = 0$. *Remark:* the distributive law $(a - b)c = ac - bc$ is valid in any ring — this is why the factorization works.
4. We have $c \neq 0$ by hypothesis. $R$ is an integral domain, so the no-zero-divisor axiom applies to the product $(a - b) \cdot c = 0$: one of the two factors must be zero.
5. Since $c \neq 0$, the only possibility is $a - b = 0$, i.e., $a = b$. $\blacksquare$

**Why does the proof fail for general rings?** In step (4) we invoked the no-zero-divisor axiom. In a ring with zero divisors, the product of two nonzero things can be zero, and $(a - b)c = 0$ does **not** force $a - b = 0$.

**Remark (failure in $\mathbb{Z}_6$).** In $\mathbb{Z}_6$, $2 \cdot 3 = 6 \equiv 0$ and $4 \cdot 3 = 12 \equiv 0$. So
$$2 \cdot 3 = 4 \cdot 3 \quad \text{(both equal 0)},$$
yet $2 \neq 4$. Cancellation fails. The culprit: $3$ is a zero divisor.

**Remark (one-sided noncommutative rings).** In a noncommutative ring $R$ without zero divisors (a "domain" but not commutative), cancellation on each side separately holds, but one must be careful: $ac = bc$ with $c \neq 0$ still implies $a = b$ because $(a - b)c = 0$ and $c \neq 0$ force $a - b = 0$. So cancellation does not actually require commutativity — only the no-zero-divisor property.

### A useful criterion

> **Proposition 21.3 (Cancellation criterion).** A commutative ring with unity $R$ is an integral domain iff cancellation holds for nonzero elements — i.e., $ac = bc$ with $c \neq 0$ implies $a = b$.

**Proof.**

*($\Rightarrow$)* This is Theorem 21.2 — already proven.

*($\Leftarrow$)* Assume cancellation holds; we show $R$ has no zero divisors. Suppose $ab = 0$ with $a \neq 0$. Rewrite:
$$ab = 0 = a \cdot 0.$$
(The second equality uses the universal identity $a \cdot 0 = 0$, valid in any ring.) Now apply cancellation with $c := a$ (nonzero by assumption):
$$ab = a \cdot 0 \quad \text{and} \quad a \neq 0 \implies b = 0.$$
So $a \neq 0 \Rightarrow b = 0$, meaning at least one of $a, b$ must be zero — the no-zero-divisor property. $\blacksquare$

**Interpretive remark.** This criterion says: an integral domain is *precisely* a commutative ring with unity where we can cancel — no more, no less. Cancellation captures the entire essence of "no zero divisors."

---

## 21.3 Finite Integral Domains are Fields

> **Theorem 21.4.** Every **finite** integral domain is a field.

**Strategy.** To show $R$ is a field, we must show every nonzero element has a multiplicative inverse. We use the pigeonhole principle: an injective self-map of a finite set is bijective, hence surjective.

**Proof.** Let $R$ be a finite integral domain. Fix any $a \in R$ with $a \neq 0$. Our goal is to produce $b \in R$ with $ab = 1$.

1. Define the **left-multiplication map**
$$L_a : R \to R, \qquad L_a(x) = ax.$$
This is a map from the finite set $R$ to itself.

2. **$L_a$ is injective.** Suppose $L_a(x) = L_a(y)$, i.e., $ax = ay$. By the cancellation law (Theorem 21.2), since $a \neq 0$, we conclude $x = y$. Hence $L_a$ is injective.

3. **$L_a$ is surjective.** Here we use finiteness: an injective map from a finite set to itself is automatically surjective. (Pigeonhole: the image has $|R|$ distinct elements — one per source element — and sits inside $R$ of size $|R|$; so the image equals $R$.)

4. **Find the inverse.** Since $L_a$ is surjective, every element of $R$ is in its image. In particular, $1 \in R$ is in the image: there exists $b \in R$ with $L_a(b) = 1$, i.e., $ab = 1$.

5. **Two-sided inverse.** By commutativity, $ba = ab = 1$ as well. So $b = a^{-1}$ in $R$.

Every nonzero $a \in R$ has an inverse; together with commutativity and $1 \neq 0$, this says $R$ is a field. $\blacksquare$

**Sanity check.** Why does this fail for $\mathbb{Z}$? $\mathbb{Z}$ is an integral domain, but infinite, so the pigeonhole step is invalid. Indeed $L_2 : \mathbb{Z} \to \mathbb{Z}$, $x \mapsto 2x$, is injective but **not** surjective (e.g., $1 \notin \mathrm{image}(L_2)$), so $2$ has no inverse.

**Interpretive remark.** This theorem is a "free upgrade": any time you have a finite, commutative, zero-divisor-free structure with a $1$, you **automatically** get multiplicative inverses. Finiteness + no zero divisors = field. This is why every finite field is usually introduced via a finite integral domain (e.g., $\mathbb{Z}_p$).

**Corollary (finite fields $\mathbb{F}_p$).** $\mathbb{Z}_p$ is a field for every prime $p$.

*Proof.* $\mathbb{Z}_p$ is commutative with unity. It is an integral domain: if $\bar a \bar b = 0$ in $\mathbb{Z}_p$, then $p \mid ab$, and since $p$ is prime, Euclid's lemma gives $p \mid a$ or $p \mid b$, i.e., $\bar a = 0$ or $\bar b = 0$. It is finite of cardinality $p$. So by Theorem 21.4 it is a field. We denote this field $\mathbb{F}_p$. $\blacksquare$

This proof is cleaner than the direct Bézout construction of inverses in $\mathbb{Z}_p$ (which was used in [[19-rings-definition-and-examples]]): rather than explicitly finding inverses, we extract their existence from finiteness and cancellation.

---

## 21.4 Characteristic of a Ring

> **Definition 21.5 (Characteristic).** Let $R$ be a ring with unity. The **characteristic** of $R$, written $\operatorname{char}(R)$, is defined by:
> $$\operatorname{char}(R) = \begin{cases} \text{smallest positive integer } n \text{ with } n \cdot 1_R = 0 & \text{if such } n \text{ exists}, \\ 0 & \text{otherwise}.\end{cases}$$
> Here $n \cdot 1_R = \underbrace{1_R + 1_R + \cdots + 1_R}_{n \text{ times}}$.

**Equivalent formulation.** $\operatorname{char}(R)$ is the additive order of $1_R$ in the abelian group $(R, +)$, with the convention that infinite order corresponds to characteristic $0$.

**Interpretive remark.** The characteristic measures the "additive rhythm" of $1_R$. In $\mathbb{Z}_5$, adding $1$ to itself five times returns to zero. In $\mathbb{Z}$, you never return. The characteristic is an invariant of the ring structure, and it controls a remarkable amount of behavior (e.g., Frobenius below).

### Examples

| Ring $R$ | $\operatorname{char}(R)$ | Justification |
|---|---|---|
| $\mathbb{Z}, \mathbb{Q}, \mathbb{R}, \mathbb{C}$ | $0$ | $n \cdot 1 = n \neq 0$ for all $n > 0$. |
| $\mathbb{Z}_n$ | $n$ | Additive order of $\bar 1$ in $\mathbb{Z}/n\mathbb{Z}$ is $n$. |
| $\mathbb{F}_p$ | $p$ | Same reasoning, $p$ prime. |
| $\mathbb{F}_p[x]$ | $p$ | $n \cdot 1 = n$ as a constant polynomial; zero iff $p \mid n$; smallest such $n$ is $p$. |
| $\mathbb{Z}_m \times \mathbb{Z}_n$ | $\operatorname{lcm}(m, n)$ | Additive order of $(1, 1)$ is $\operatorname{lcm}(m, n)$. See Example 15. |
| $\mathbb{F}_p \times \mathbb{Q}$ | $0$ | $(1, 1) + \cdots + (1, 1)$ ($n$ times) $= (n \bmod p, n) = (0, 0)$ requires $n = 0$ (second coordinate). |

### Characteristic of an integral domain

> **Theorem 21.6.** The characteristic of an integral domain is either $0$ or a prime.

**Strategy.** Suppose for contradiction $\operatorname{char}(D) = n > 0$ and $n$ is composite. Factor $n$ nontrivially, use the ring homomorphism $\mathbb{Z} \to D$ to obtain zero divisors, contradicting that $D$ is an integral domain.

**Proof.** Let $D$ be an integral domain with $\operatorname{char}(D) = n > 0$. We show $n$ is prime.

1. Clearly $n \geq 2$ (since $n > 0$ and $n \neq 1$, because $1 \cdot 1 = 1 \neq 0$ in $D$).

2. Suppose for contradiction $n$ is **composite**: write $n = ab$ with $1 < a, b < n$ (both $\geq 2$).

3. Compute in $D$:
$$0 = n \cdot 1_D = (ab) \cdot 1_D.$$

4. We claim $(ab) \cdot 1_D = (a \cdot 1_D)(b \cdot 1_D)$. Justification: for any positive integers $a, b$ and any ring element $r$, $(ab) \cdot r = \underbrace{r + \cdots + r}_{ab \text{ times}}$, which by grouping equals $a$ copies of $(b \cdot r)$, i.e., $a \cdot (b \cdot r) = (a \cdot 1_D)(b \cdot r)$ (using $a \cdot r' = (a \cdot 1_D) r'$ for any $r'$, a standard identity; alternatively verify by induction on $a$). Taking $r = 1_D$ and using $b \cdot 1_D = b \cdot 1_D$:
$$(ab) \cdot 1_D = (a \cdot 1_D)(b \cdot 1_D).$$

5. Combining (3) and (4):
$$(a \cdot 1_D)(b \cdot 1_D) = 0_D.$$

6. $D$ is an integral domain: no zero divisors. So either $a \cdot 1_D = 0$ or $b \cdot 1_D = 0$.

7. But $1 < a < n$ contradicts the **minimality** of $n$ (which was defined as the smallest positive integer with $n \cdot 1_D = 0$). Similarly for $b$.

8. This contradiction shows that no nontrivial factorization $n = ab$ is possible, i.e., $n$ is prime. $\blacksquare$

**Sanity check.** $\operatorname{char}(\mathbb{Z}_6) = 6$, which is composite — but $\mathbb{Z}_6$ is **not** an integral domain ($2 \cdot 3 = 0$). Consistent with the theorem.

**Corollary (characteristic of a field).** The characteristic of a field is $0$ or prime. (Every field is an integral domain.)

### Frobenius endomorphism

> **Theorem 21.7 (Frobenius endomorphism).** Let $R$ be a **commutative** ring of characteristic $p$, with $p$ prime. Then the map
> $$\phi_p : R \to R, \qquad \phi_p(a) = a^p,$$
> is a ring homomorphism. It is called the **Frobenius endomorphism**.

**Strategy.** A ring homomorphism must preserve multiplication, addition, and $1$. Multiplication and unity are easy; addition — the "freshman's dream" — is the deep part, and it relies on divisibility of $\binom{p}{k}$ by $p$ for $1 \leq k \leq p - 1$.

**Proof.** We verify each of the three homomorphism axioms.

**(i) Preserves $1$.**
$$\phi_p(1) = 1^p = 1. \checkmark$$

**(ii) Preserves multiplication.** Using commutativity of $R$:
$$\phi_p(ab) = (ab)^p = \underbrace{(ab)(ab) \cdots (ab)}_{p \text{ times}} = \underbrace{a \cdots a}_{p} \cdot \underbrace{b \cdots b}_{p} = a^p b^p = \phi_p(a) \phi_p(b). \checkmark$$
*Commutativity is used* in the step that regroups the $a$s and $b$s.

**(iii) Preserves addition — the freshman's dream.** We show $(a + b)^p = a^p + b^p$.

By the **binomial theorem** (valid in any commutative ring):
$$(a + b)^p = \sum_{k = 0}^{p} \binom{p}{k} a^k b^{p - k}.$$

Consider the middle terms $k \in \{1, 2, \ldots, p - 1\}$.

*Claim:* $p \mid \binom{p}{k}$ for $1 \leq k \leq p - 1$.

*Proof of claim:* Write
$$\binom{p}{k} = \frac{p!}{k!(p - k)!} = \frac{p \cdot (p - 1)!}{k!(p - k)!}.$$
Since $\binom{p}{k}$ is an integer, $k!(p-k)!$ divides $p \cdot (p-1)!$. We have $1 \leq k \leq p - 1$, so both $k$ and $p - k$ are in $\{1, \ldots, p-1\}$. No factor of $k!$ or $(p - k)!$ equals $p$ (since $p$ is prime and all these factors are smaller than $p$). Hence $\gcd(k!(p - k)!, p) = 1$. Therefore $k!(p - k)!$ divides $(p - 1)!$, and
$$\binom{p}{k} = p \cdot \frac{(p - 1)!}{k!(p - k)!},$$
a multiple of $p$. $\checkmark$

*Conclusion:* For $1 \leq k \leq p - 1$, $\binom{p}{k} \equiv 0 \pmod p$. In the ring $R$ of characteristic $p$, $p \cdot r = 0$ for every $r \in R$ (since $p \cdot r = (p \cdot 1_R) r = 0 \cdot r = 0$). Hence each middle term $\binom{p}{k} a^k b^{p - k}$ equals zero in $R$.

Only the endpoint terms ($k = 0$ and $k = p$) survive:
$$(a + b)^p = \binom{p}{0} a^0 b^p + \binom{p}{p} a^p b^0 = b^p + a^p = a^p + b^p.$$

Hence $\phi_p(a + b) = \phi_p(a) + \phi_p(b)$. $\checkmark$

All three axioms verified. $\phi_p$ is a ring homomorphism. $\blacksquare$

**Remark (why the characteristic hypothesis matters).** In a ring of characteristic $0$ (like $\mathbb{Z}$), $(a + b)^p$ contains all the cross terms, which are nonzero — the freshman's dream fails. It is a **characteristic-$p$ phenomenon**.

**Remark (the Frobenius is not always surjective).** In $\mathbb{F}_p$, $\phi_p(a) = a^p = a$ by Fermat's little theorem, so $\phi_p = \operatorname{id}$ — surjective. But in $\mathbb{F}_p(t)$ (rational functions over $\mathbb{F}_p$), $\phi_p$ maps onto the proper subfield $\mathbb{F}_p(t^p)$. Fields where $\phi_p$ is surjective are called **perfect**; finite fields are perfect, but transcendental extensions like $\mathbb{F}_p(t)$ are not.

**Corollary.** $(a + b)^{p^n} = a^{p^n} + b^{p^n}$ for all $n \geq 1$, by iterating Frobenius.

---

## 21.5 Divisibility in Integral Domains

In an integral domain $D$ we develop divisibility theory, generalizing familiar facts from $\mathbb{Z}$.

> **Definition 21.8 (Divisibility).** For $a, b \in D$ (an integral domain), we write $a \mid b$ ("$a$ divides $b$") if there exists $c \in D$ with $b = ac$.

**Immediate properties.** (All in an integral domain $D$, proved using cancellation.)
- *Reflexive:* $a \mid a$ (take $c = 1$).
- *Transitive:* $a \mid b$ and $b \mid c$ imply $a \mid c$ (compose the factorizations).
- $a \mid 0$ for all $a$; $0 \mid a$ iff $a = 0$.
- $a \mid 1$ iff $a$ is a unit.

> **Definition 21.9 (Associates).** $a, b \in D$ are **associates** if $a = ub$ for some unit $u \in D^\times$. Equivalently (in an integral domain): $a \mid b$ and $b \mid a$.

*Proof of equivalence.* If $a = ub$ and $b = va$ with $u, v$ units: both directions of divisibility hold. Conversely, if $a \mid b$ and $b \mid a$: write $b = ac$ and $a = bd$. Substitute: $a = bd = (ac)d = a(cd)$. If $a \neq 0$, cancel $a$ to get $cd = 1$, so $c$ is a unit; hence $a = b c^{-1}$ with $c^{-1}$ a unit, meaning $b$ and $a$ are associates. If $a = 0$: then $b = 0 \cdot c = 0$ too, trivially associates via $1$.

**Example 9 (Associates in $\mathbb{Z}$).** $D^\times = \{\pm 1\}$. Associates of $a$ are $\{a, -a\}$. Two integers are associates iff they have the same absolute value.

**Example 10 (Associates in $\mathbb{Z}[i]$).** $\mathbb{Z}[i]^\times = \{1, -1, i, -i\}$ (the fourth roots of unity). Associates of $a + bi$ are
$$\{(a + bi), -(a + bi), i(a + bi), -i(a + bi)\} = \{a + bi, -a - bi, -b + ai, b - ai\}.$$
Geometrically: the four elements form a square under the rotations of the plane by $\pi/2$.

**Example 11 (Associates in $\mathbb{F}[x]$).** $\mathbb{F}[x]^\times = \mathbb{F}^\times = \mathbb{F} \setminus \{0\}$ (the nonzero constants). Two polynomials $f, g \in \mathbb{F}[x]$ are associates iff $f = cg$ for some $c \in \mathbb{F}^\times$. E.g., $x + 1$ and $2x + 2$ are associates in $\mathbb{Q}[x]$.

### Irreducible and prime elements

> **Definition 21.10 (Irreducible, prime).** Let $p \in D$ be a nonzero non-unit.
> - $p$ is **irreducible** if $p = ab$ implies $a \in D^\times$ or $b \in D^\times$ (i.e., $p$ cannot be factored into two non-units).
> - $p$ is **prime** if $p \mid ab$ implies $p \mid a$ or $p \mid b$.

**Language warning.** In elementary number theory, "prime" means "irreducible" in $\mathbb{Z}$ (these coincide there). In ring theory these are different notions, and the distinction is crucial.

> **Proposition 21.11.** In an integral domain $D$, every prime is irreducible.

**Strategy.** Suppose $p$ is prime and $p = ab$. Since $p \mid ab$, primality gives $p \mid a$ or $p \mid b$. Without loss of generality $p \mid a$. We chase the factorizations to show $b$ is a unit.

**Proof.** Let $p \in D$ be prime, and suppose $p = ab$ for some $a, b \in D$. We must show $a \in D^\times$ or $b \in D^\times$.

1. From $p = ab$, in particular $p \mid ab$ trivially.

2. By primality of $p$: $p \mid a$ or $p \mid b$. WLOG $p \mid a$ (the other case is symmetric).

3. Write $a = pc$ for some $c \in D$.

4. Substitute into $p = ab$:
$$p = (pc) b = p(cb).$$

5. We have $p \neq 0$ (primes are nonzero by definition), and we are in an integral domain, so we can **cancel** $p$ from both sides using Theorem 21.2:
$$1 = cb.$$

6. Hence $b$ has a left (and by commutativity, two-sided) inverse $c$; that is, $b \in D^\times$. $\blacksquare$

**Warning: the converse fails!** Irreducible does **not** always imply prime. The implication "irreducible $\Rightarrow$ prime" does hold in the important class of **unique factorization domains** (UFDs), which includes $\mathbb{Z}$, $\mathbb{F}[x]$, and $\mathbb{Z}[i]$. But in general integral domains it can fail.

**Example 12 (Irreducible but not prime in $\mathbb{Z}[\sqrt{-5}]$).**

Consider $\mathbb{Z}[\sqrt{-5}] = \{a + b\sqrt{-5} : a, b \in \mathbb{Z}\} \subseteq \mathbb{C}$, an integral domain (subring of $\mathbb{C}$).

Define the **norm** $N(a + b\sqrt{-5}) = a^2 + 5b^2 \geq 0$. A direct computation shows $N(\alpha \beta) = N(\alpha) N(\beta)$ (multiplicativity).

Observe:
$$6 = 2 \cdot 3 = (1 + \sqrt{-5})(1 - \sqrt{-5}).$$

Computing norms: $N(2) = 4$, $N(3) = 9$, $N(1 \pm \sqrt{-5}) = 1 + 5 = 6$. (And $N(6) = 36 = 4 \cdot 9 = 6 \cdot 6$, consistent.)

*Claim: $2$ is irreducible in $\mathbb{Z}[\sqrt{-5}]$.*

Suppose $2 = \alpha \beta$. Take norms: $4 = N(\alpha) N(\beta)$. Possibilities: $(N(\alpha), N(\beta)) \in \{(1, 4), (2, 2), (4, 1)\}$.

- $N(\alpha) = 1$: means $a^2 + 5b^2 = 1$, forcing $b = 0$ and $a = \pm 1$, so $\alpha = \pm 1$ is a unit.
- $N(\alpha) = 2$: means $a^2 + 5b^2 = 2$. No integer solutions ($b = 0 \Rightarrow a^2 = 2$ impossible; $b \neq 0 \Rightarrow 5b^2 \geq 5 > 2$).
- $N(\alpha) = 4$: then $N(\beta) = 1$, and $\beta$ is a unit by the first case.

So one of $\alpha, \beta$ is a unit. Hence $2$ is irreducible. $\checkmark$

*Claim: $2$ is NOT prime in $\mathbb{Z}[\sqrt{-5}]$.*

We have $2 \mid 6 = (1 + \sqrt{-5})(1 - \sqrt{-5})$. If $2$ were prime, $2$ would divide one of the factors. Test $2 \mid (1 + \sqrt{-5})$: this would mean $1 + \sqrt{-5} = 2(a + b\sqrt{-5}) = 2a + 2b\sqrt{-5}$, forcing $1 = 2a$ — impossible in $\mathbb{Z}$. Similarly $2 \nmid (1 - \sqrt{-5})$. So $2$ is not prime. $\checkmark$

**Consequence.** $\mathbb{Z}[\sqrt{-5}]$ is an integral domain that is **not** a UFD: the element $6$ has two essentially different factorizations into irreducibles.

**Partial converse: in a PID (or UFD), irreducible $\Leftrightarrow$ prime.** This is a standard result that will be developed in subsequent chapters.

---

## 21.6 Field of Fractions

Given an integral domain $D$, we want to construct the smallest field containing $D$ — mimicking the passage from $\mathbb{Z}$ to $\mathbb{Q}$.

> **Theorem 21.12 (Field of fractions).** Let $D$ be an integral domain. There exists a field $\operatorname{Frac}(D)$ (also written $Q(D)$) and an injective ring homomorphism $\iota : D \hookrightarrow \operatorname{Frac}(D)$ such that:
> - Every element of $\operatorname{Frac}(D)$ has the form $\iota(a) \iota(b)^{-1}$ for some $a, b \in D$, $b \neq 0$.
> - $(\operatorname{Frac}(D), \iota)$ is unique up to unique isomorphism fixing $D$.

**Construction.** We build $\operatorname{Frac}(D)$ as equivalence classes of pairs, mirroring the construction of $\mathbb{Q}$ from $\mathbb{Z}$.

**Step 1: Define the set of pairs.** Let
$$S = D \times (D \setminus \{0\}) = \{(a, b) : a, b \in D, b \neq 0\}.$$
Think of $(a, b)$ as the formal fraction $a/b$.

**Step 2: Define an equivalence relation.** For $(a, b), (c, d) \in S$:
$$(a, b) \sim (c, d) \iff ad = bc.$$

*Verify this is an equivalence relation:*
- **Reflexive.** $(a, b) \sim (a, b)$ iff $ab = ba$ — true by commutativity.
- **Symmetric.** If $(a, b) \sim (c, d)$, i.e., $ad = bc$, then $cb = da$, i.e., $(c, d) \sim (a, b)$.
- **Transitive.** Suppose $(a, b) \sim (c, d)$ and $(c, d) \sim (e, f)$, so $ad = bc$ and $cf = de$. We want $af = be$. Multiply the first equation by $f$: $adf = bcf$. Substitute $cf = de$: $adf = b \cdot de = bde$. Hence $d(af) = d(be)$. Since $d \neq 0$ and we are in an integral domain, cancel $d$ (Theorem 21.2): $af = be$. $\checkmark$
  
  *Note:* transitivity is the step that **requires the integral domain hypothesis** — cancellation.

Denote the equivalence class of $(a, b)$ by $[a, b]$ or $a/b$, and set
$$\operatorname{Frac}(D) = S / \sim = \{[a, b] : a, b \in D, b \neq 0\}.$$

**Step 3: Define addition and multiplication.** Mimicking fraction arithmetic:
$$[a, b] + [c, d] = [ad + bc, bd], \qquad [a, b] \cdot [c, d] = [ac, bd].$$

*Well-definedness (independence of representative).* We verify multiplication; addition is similar. Suppose $[a, b] = [a', b']$ and $[c, d] = [c', d']$, i.e., $ab' = a'b$ and $cd' = c'd$. We want $[ac, bd] = [a'c', b'd']$, i.e., $(ac)(b'd') = (a'c')(bd)$. Compute:
$$(ac)(b'd') = (ab')(cd') = (a'b)(c'd) = (a'c')(bd). \checkmark$$
(Uses commutativity and the hypotheses.)

**Step 4: Verify field axioms.**
- Zero: $[0, 1]$. Then $[a, b] + [0, 1] = [a \cdot 1 + b \cdot 0, b \cdot 1] = [a, b]$. $\checkmark$
- Unity: $[1, 1]$. Then $[a, b] \cdot [1, 1] = [a, b]$. $\checkmark$
- Additive inverses: $-[a, b] = [-a, b]$. Check: $[a, b] + [-a, b] = [ab + b(-a), b^2] = [0, b^2] = [0, 1]$ (since $0 \cdot 1 = b^2 \cdot 0$). $\checkmark$
- Multiplicative inverses: if $[a, b] \neq [0, 1]$, then $a \neq 0$ (since $[a, b] = [0, 1]$ iff $a \cdot 1 = b \cdot 0 = 0$, i.e., $a = 0$). Define $[a, b]^{-1} = [b, a]$. Then $[a, b][b, a] = [ab, ba] = [ab, ab] = [1, 1]$ ✓ (since $ab \cdot 1 = ab \cdot 1$).
- Associativity, commutativity, distributivity: routine verifications from commutativity and associativity in $D$.

**Step 5: Embed $D$.** Define $\iota : D \to \operatorname{Frac}(D)$ by $\iota(a) = [a, 1]$.
- **Injective:** $\iota(a) = \iota(a')$ iff $[a, 1] = [a', 1]$ iff $a \cdot 1 = 1 \cdot a'$ iff $a = a'$. $\checkmark$
- **Ring homomorphism:** $\iota(a + a') = [a + a', 1] = [a \cdot 1 + 1 \cdot a', 1 \cdot 1] = [a, 1] + [a', 1] = \iota(a) + \iota(a')$; similarly for multiplication; $\iota(1) = [1, 1]$ is the unity.

**Step 6: Express every element as $\iota(a) \iota(b)^{-1}$.** Any $[a, b] \in \operatorname{Frac}(D)$:
$$[a, b] = [a, 1] \cdot [1, b] = \iota(a) \cdot [b, 1]^{-1} = \iota(a) \iota(b)^{-1}.$$

**Step 7: Uniqueness.** Given another field $K'$ with embedding $\iota' : D \hookrightarrow K'$ satisfying the same property (every element is $\iota'(a) \iota'(b)^{-1}$), the map $\operatorname{Frac}(D) \to K'$, $[a, b] \mapsto \iota'(a) \iota'(b)^{-1}$, is a ring isomorphism fixing $D$. We prove this in the next section via the universal property. $\blacksquare$

Conventionally we identify $a \in D$ with $\iota(a) = [a, 1] \in \operatorname{Frac}(D)$, so $D \subseteq \operatorname{Frac}(D)$ and $[a, b] = a/b$.

### Examples

**Example 13.** $\operatorname{Frac}(\mathbb{Z}) = \mathbb{Q}$. The construction above literally reproduces the construction of $\mathbb{Q}$ from pairs of integers.

**Example 14.** $\operatorname{Frac}(\mathbb{Z}[i]) = \mathbb{Q}(i) = \{a + bi : a, b \in \mathbb{Q}\}$, the **Gaussian rationals** (see Problem A5 of [[25-co4-practice-problems]] for full proof).

**Example 15.** $\operatorname{Frac}(\mathbb{F}[x]) = \mathbb{F}(x) = \{p(x)/q(x) : p, q \in \mathbb{F}[x], q \neq 0\}$, the field of **rational functions** over $\mathbb{F}$. This is a fundamental object in algebraic geometry and transcendence theory.

**Example 16.** $\operatorname{Frac}(\mathbb{Z}[\sqrt 2]) = \mathbb{Q}(\sqrt 2) = \{a + b\sqrt 2 : a, b \in \mathbb{Q}\}$.

**Sanity check.** $\operatorname{Frac}$ applied to a field $F$ gives $F$ itself (no new elements). Reason: every $a \in F$ with $a \neq 0$ already has an inverse in $F$, so pairs $(a, b)$ reduce to $ab^{-1}$, and all such products lie in $F$.

---

## 21.7 Universal Property of $\operatorname{Frac}(D)$

The field of fractions is characterized by the following universal property, which asserts that $\operatorname{Frac}(D)$ is the **smallest** field containing $D$ in a precise categorical sense.

> **Theorem 21.13 (Universal property).** Let $D$ be an integral domain, $K = \operatorname{Frac}(D)$, $\iota : D \hookrightarrow K$ the canonical embedding. For any field $F$ and any injective ring homomorphism $\varphi : D \to F$, there exists a **unique** ring homomorphism $\tilde \varphi : K \to F$ extending $\varphi$, i.e., making the diagram
> $$\begin{array}{ccc} D & \xrightarrow{\iota} & K \\ & \searrow_\varphi & \downarrow_{\tilde \varphi} \\ & & F \end{array}$$
> commute.

**Proof.**

**Existence.** Define
$$\tilde \varphi : K \to F, \qquad \tilde \varphi([a, b]) = \varphi(a) \varphi(b)^{-1}.$$

*Well-defined.* We must check:

1. $\varphi(b)^{-1}$ makes sense: $b \neq 0$ in $D$, $\varphi$ is injective, so $\varphi(b) \neq 0$ in $F$; since $F$ is a field, $\varphi(b)^{-1} \in F$. $\checkmark$

2. Independence of representative. If $[a, b] = [a', b']$, i.e., $ab' = a'b$, apply $\varphi$: $\varphi(a)\varphi(b') = \varphi(a')\varphi(b)$. Multiply both sides by $\varphi(b)^{-1} \varphi(b')^{-1}$:
$$\varphi(a) \varphi(b)^{-1} = \varphi(a') \varphi(b')^{-1}. \checkmark$$

*Ring homomorphism.*

- Preserves $1$: $\tilde \varphi([1, 1]) = \varphi(1) \varphi(1)^{-1} = 1$. $\checkmark$
- Preserves multiplication: $\tilde \varphi([a, b][c, d]) = \tilde \varphi([ac, bd]) = \varphi(ac) \varphi(bd)^{-1} = \varphi(a)\varphi(c)\varphi(b)^{-1}\varphi(d)^{-1} = \tilde \varphi([a, b]) \tilde \varphi([c, d])$. $\checkmark$
- Preserves addition: $\tilde \varphi([a, b] + [c, d]) = \tilde \varphi([ad + bc, bd]) = \varphi(ad + bc) \varphi(bd)^{-1} = [\varphi(a)\varphi(d) + \varphi(b)\varphi(c)] \varphi(b)^{-1}\varphi(d)^{-1} = \varphi(a)\varphi(b)^{-1} + \varphi(c)\varphi(d)^{-1} = \tilde\varphi([a,b]) + \tilde\varphi([c,d])$. $\checkmark$

*Extends $\varphi$:* $\tilde\varphi(\iota(a)) = \tilde\varphi([a, 1]) = \varphi(a) \varphi(1)^{-1} = \varphi(a)$. $\checkmark$

**Uniqueness.** Suppose $\psi : K \to F$ is any ring homomorphism with $\psi \circ \iota = \varphi$. For any $[a, b] \in K$:
$$[a, b] = [a, 1] \cdot [1, b] = \iota(a) \cdot \iota(b)^{-1}$$
(using that $\iota(b) \cdot [1, b] = [b, 1][1, b] = [b, b] = [1, 1]$, so $[1, b] = \iota(b)^{-1}$).

Applying $\psi$:
$$\psi([a, b]) = \psi(\iota(a)) \cdot \psi(\iota(b))^{-1} = \varphi(a) \varphi(b)^{-1} = \tilde\varphi([a, b]).$$

So $\psi = \tilde \varphi$. $\blacksquare$

**Interpretation.** The universal property says: **anything $D$ can be embedded into, $\operatorname{Frac}(D)$ already is**, and the embedding is forced. This is what it means for $\operatorname{Frac}(D)$ to be "the smallest field containing $D$."

**Corollary (uniqueness of field of fractions).** If $(K, \iota)$ and $(K', \iota')$ both satisfy the universal property, then there is a unique isomorphism $K \cong K'$ commuting with the embeddings. *(Standard "abstract nonsense": apply the universal property of $K$ to the data $(K', \iota')$ and vice versa; compose the two maps; by uniqueness, the compositions are the identities.)*

---

## 21.8 Characteristic and the Prime Subfield

> **Theorem 21.14 (Prime subfield).** Every field $F$ contains a unique smallest subfield, called its **prime subfield**. This subfield is:
> - $\mathbb{Q}$ if $\operatorname{char}(F) = 0$,
> - $\mathbb{F}_p$ if $\operatorname{char}(F) = p$ prime.

**Proof.** Consider the **canonical ring homomorphism**
$$\psi : \mathbb{Z} \to F, \qquad \psi(n) = n \cdot 1_F.$$
This is a ring homomorphism (routine: preserves $0$, $1$, addition, multiplication by the standard multiplication-by-integer rules).

**Case 1: $\operatorname{char}(F) = 0$.**

$\psi(n) = 0$ iff $n = 0$, so $\psi$ is injective, and $\mathbb{Z} \hookrightarrow F$.

Since $F$ is a field, it contains $\psi(\mathbb{Z})$ and all multiplicative inverses of its nonzero elements. In particular, every $\psi(m)\psi(n)^{-1}$ for $n \neq 0$ lies in $F$. By the universal property of $\operatorname{Frac}(\mathbb{Z}) = \mathbb{Q}$ (Theorem 21.13), the embedding $\psi$ extends uniquely to an injective ring homomorphism $\tilde\psi : \mathbb{Q} \hookrightarrow F$.

Hence $\mathbb{Q}$ (as the image of $\tilde\psi$) is a subfield of $F$. It is the smallest subfield: any subfield of $F$ must contain $0, 1$, hence $\psi(\mathbb{Z})$, hence $\tilde\psi(\mathbb{Q})$. $\checkmark$

**Case 2: $\operatorname{char}(F) = p$ prime.**

$\psi(n) = 0$ iff $p \mid n$, so $\ker \psi = p\mathbb{Z}$. By the First Isomorphism Theorem,
$$\mathbb{Z}/p\mathbb{Z} = \mathbb{F}_p \cong \mathrm{image}(\psi) \subseteq F.$$
So $\mathbb{F}_p$ embeds in $F$ as a subfield.

It is the smallest subfield: any subfield must contain $0, 1$, hence $\psi(\mathbb{Z})$, which equals the image $\mathbb{F}_p$. $\checkmark$ $\blacksquare$

**Consequence.** The classification of fields begins with two families, indexed by characteristic: characteristic-$0$ fields (built atop $\mathbb{Q}$) and characteristic-$p$ fields (built atop $\mathbb{F}_p$). This dichotomy is foundational in algebraic number theory and algebraic geometry.

---

## 21.9 Worked Examples

**Example 17.** Verify that $\mathbb{Z}[x]$ is an integral domain.

*Setup.* $\mathbb{Z}[x]$ is the ring of polynomials in the indeterminate $x$ with integer coefficients. An element $p \in \mathbb{Z}[x]$ has the form $p(x) = \sum_{i=0}^m a_i x^i$ with $a_i \in \mathbb{Z}$, and we write $\deg p = m$ if $a_m \neq 0$. By convention $\deg 0 = -\infty$.

*Strategy.* Compute the leading coefficient of a product and use that $\mathbb{Z}$ has no zero divisors.

*Verification that $\mathbb{Z}[x]$ is a commutative ring with unity.* Routine: $(f + g)(x) = f(x) + g(x)$ and multiplication by convolution of coefficients; the constant polynomial $1$ is unity; commutativity from commutativity of $\mathbb{Z}$.

*No zero divisors.* Suppose $p, q \in \mathbb{Z}[x]$ are nonzero, with leading terms $a_m x^m$ and $b_n x^n$ ($a_m, b_n \in \mathbb{Z}$ both nonzero). Compute the product:
$$p(x) q(x) = a_m b_n x^{m + n} + \text{(lower-order terms)}.$$
Since $\mathbb{Z}$ is an integral domain, $a_m b_n \neq 0$. So $pq$ has a nonzero leading term of degree $m + n$, hence $pq \neq 0$.

By contrapositive, if $pq = 0$, either $p = 0$ or $q = 0$.

*Interpretation.* The same argument works over any integral domain $D$ in place of $\mathbb{Z}$: **$D[x]$ is an integral domain whenever $D$ is.** And $\deg(fg) = \deg f + \deg g$ is a "degree additivity" formula that fails without the no-zero-divisor hypothesis.

$\boxed{\mathbb{Z}[x] \text{ is an integral domain.}}$ $\blacksquare$

---

**Example 18.** Find $\operatorname{char}(\mathbb{Z}_4 \times \mathbb{Z}_6)$.

*Setup.* We want the smallest $n \geq 1$ with $n \cdot (1, 1) = (0, 0)$ in $\mathbb{Z}_4 \times \mathbb{Z}_6$.

*Strategy.* Additive order of $(1, 1)$ in a product is the lcm of the orders in each factor.

*Computation.*

1. $n \cdot (1, 1) = (n \bmod 4, n \bmod 6)$ by definition of addition in the product.
2. $(n \bmod 4, n \bmod 6) = (0, 0)$ iff $4 \mid n$ and $6 \mid n$, i.e., $\operatorname{lcm}(4, 6) \mid n$.
3. $\operatorname{lcm}(4, 6) = \frac{4 \cdot 6}{\gcd(4, 6)} = \frac{24}{2} = 12$.
4. Smallest positive $n$ is $12$.

*Verification.* $12 \cdot (1, 1) = (12 \bmod 4, 12 \bmod 6) = (0, 0)$. $\checkmark$ Any smaller $n$ fails: e.g., $6 \cdot (1, 1) = (2, 0) \neq (0, 0)$.

*Interpretation.* $\mathbb{Z}_4 \times \mathbb{Z}_6$ is **not** an integral domain (products of rings never are). Its characteristic is $12$, which is composite — consistent with Theorem 21.6 applying only to integral domains.

$\boxed{\operatorname{char}(\mathbb{Z}_4 \times \mathbb{Z}_6) = 12.}$

---

**Example 19.** Show $\mathbb{Z}[i]/\langle 1 + i \rangle \cong \mathbb{F}_2$.

*Setup.* We want a ring homomorphism $\varphi : \mathbb{Z}[i] \to \mathbb{F}_2 = \{0, 1\}$ surjective with kernel exactly $\langle 1 + i \rangle$, so that by the First Isomorphism Theorem, $\mathbb{Z}[i]/\langle 1 + i \rangle \cong \mathbb{F}_2$.

*Strategy.* Define $\varphi(a + bi) = (a + b) \bmod 2$. Verify it's a homomorphism, compute kernel, apply First Isomorphism Theorem.

*Step 1: $\varphi$ is well-defined.* Every element of $\mathbb{Z}[i]$ has unique representation $a + bi$, so $\varphi(a + bi) = (a + b) \bmod 2 \in \{0, 1\}$ is well-defined.

*Step 2: $\varphi$ is a ring homomorphism.*

Preserves $1$: $\varphi(1) = \varphi(1 + 0i) = 1 \bmod 2 = 1$. $\checkmark$

Preserves addition:
$$\varphi((a + bi) + (c + di)) = \varphi((a + c) + (b + d)i) = (a + c + b + d) \bmod 2 = (a + b) + (c + d) \bmod 2 = \varphi(a+bi) + \varphi(c+di). \checkmark$$

Preserves multiplication. We compute:
$$(a + bi)(c + di) = (ac - bd) + (ad + bc)i.$$
So
$$\varphi((a + bi)(c + di)) = (ac - bd + ad + bc) \bmod 2.$$
On the other hand,
$$\varphi(a + bi) \varphi(c + di) = (a + b)(c + d) \bmod 2 = (ac + ad + bc + bd) \bmod 2.$$
Difference: $(ac - bd + ad + bc) - (ac + ad + bc + bd) = -2bd \equiv 0 \pmod 2$. So the two expressions agree mod $2$. $\checkmark$

*Step 3: $\varphi$ is surjective.* $\varphi(0) = 0$, $\varphi(1) = 1$, covering $\mathbb{F}_2 = \{0, 1\}$. $\checkmark$

*Step 4: Compute the kernel.*

By definition, $\ker \varphi = \{a + bi \in \mathbb{Z}[i] : a + b \text{ even}\}$.

*Claim: $\ker \varphi = \langle 1 + i \rangle$.*

($\supseteq$) First show $\langle 1 + i \rangle \subseteq \ker \varphi$. Every element of $\langle 1 + i\rangle$ has form $(1 + i)(a + bi)$ for some $a + bi \in \mathbb{Z}[i]$:
$$(1 + i)(a + bi) = (a - b) + (a + b)i.$$
Its image under $\varphi$: $(a - b) + (a + b) \bmod 2 = 2a \bmod 2 = 0$. $\checkmark$

($\subseteq$) Conversely, take $a + bi$ with $a + b$ even. We show $a + bi \in \langle 1 + i\rangle$.

Key observation: $(1 + i)(1 - i) = 1 - i^2 = 2$. So $2 \in \langle 1 + i \rangle$. Also $1 + i \in \langle 1 + i\rangle$.

If $a + b$ is even, write $a = b + 2k$ for some $k \in \mathbb{Z}$ (since $a$ and $b$ have the same parity). Then:
$$a + bi = (b + 2k) + bi = b(1 + i) + 2k.$$
Both $b(1 + i) \in \langle 1 + i\rangle$ and $2k = k \cdot 2 \in \langle 1 + i\rangle$. Hence $a + bi \in \langle 1 + i\rangle$. $\checkmark$

*Step 5: Apply First Isomorphism Theorem.* $\varphi$ is a surjective ring homomorphism $\mathbb{Z}[i] \to \mathbb{F}_2$ with kernel $\langle 1 + i\rangle$. Therefore:
$$\mathbb{Z}[i]/\langle 1 + i\rangle \cong \mathrm{image}(\varphi) = \mathbb{F}_2.$$

*Interpretation.* In the quotient, $1 + i \equiv 0$, so $i \equiv -1 \equiv 1$. Hence every $a + bi$ reduces to $a + b \pmod 2$ — a single bit. This gives a two-element field, $\mathbb{F}_2$. Geometrically, $1 + i$ is a prime above $2$ in $\mathbb{Z}[i]$, and $\mathbb{Z}[i]/\langle 1 + i\rangle$ is its residue field.

$\boxed{\mathbb{Z}[i]/\langle 1 + i\rangle \cong \mathbb{F}_2.}$ $\blacksquare$

---

**Example 20 (Freshman's dream computation).** In $\mathbb{F}_5[x]$, expand $(x + 2)^5$.

*Setup.* $\mathbb{F}_5$ has characteristic $5$, so Frobenius applies: $(a + b)^5 = a^5 + b^5$.

*Computation.* $(x + 2)^5 = x^5 + 2^5 = x^5 + 32 = x^5 + 2$ in $\mathbb{F}_5$ (since $32 = 6 \cdot 5 + 2 \equiv 2$, or directly by Fermat: $2^5 \equiv 2 \pmod 5$).

*Verification using the binomial theorem.*
$$(x + 2)^5 = \sum_{k = 0}^5 \binom{5}{k} x^k 2^{5 - k} = x^5 + 5 \cdot 2 x^4 + 10 \cdot 4 x^3 + 10 \cdot 8 x^2 + 5 \cdot 16 x + 32.$$
Reduce coefficients mod $5$: $5 \cdot 2 = 10 \equiv 0$, $10 \cdot 4 = 40 \equiv 0$, $10 \cdot 8 = 80 \equiv 0$, $5 \cdot 16 = 80 \equiv 0$, $32 \equiv 2$. Hence $(x + 2)^5 \equiv x^5 + 2 \pmod 5$. $\checkmark$ 

*Interpretation.* All the "middle" binomial coefficients $\binom{5}{1}, \binom{5}{2}, \binom{5}{3}, \binom{5}{4}$ are divisible by $5$, so they vanish in $\mathbb{F}_5$. Only the endpoint terms survive — this is the essence of Frobenius.

$\boxed{(x + 2)^5 = x^5 + 2 \text{ in } \mathbb{F}_5[x].}$

---

## 21.10 Practice Problems

**Problem 1.** Show $\mathbb{Z}_n$ is an integral domain iff $n$ is prime.

**Problem 2.** Prove that every subring of a field that contains the unity is an integral domain.

**Problem 3.** Find $\operatorname{char}(\mathbb{Z}_6 \times \mathbb{Z}_{15})$.

**Problem 4.** In $\mathbb{Z}[i]$, show that $1 + i$ is irreducible.

**Problem 5.** Show that in an integral domain, if $a^n = 0$ for some $n \geq 1$, then $a = 0$ (integral domains have no nonzero nilpotents).

**Problem 6.** Find $\operatorname{Frac}(\mathbb{Z}[\sqrt{2}])$.

**Problem 7.** Let $D$ be an integral domain. Show that $D[x]$ is also an integral domain, and find the units $D[x]^\times$.

**Problem 8 (Bonus — irreducible vs. prime in $\mathbb{Z}[\sqrt{-5}]$).** Show that $3$ is irreducible but not prime in $\mathbb{Z}[\sqrt{-5}]$.

---

### Solutions

**Solution 1.** $\mathbb{Z}_n$ is an integral domain iff $n$ is prime.

*($\Leftarrow$) $n$ prime $\Rightarrow$ $\mathbb{Z}_n$ is an integral domain.*

Let $p = n$ prime. Suppose $\bar a \cdot \bar b = \bar 0$ in $\mathbb{Z}_p$, i.e., $p \mid ab$. By **Euclid's lemma** (a prime divides a product only if it divides a factor), $p \mid a$ or $p \mid b$, i.e., $\bar a = 0$ or $\bar b = 0$. Hence $\mathbb{Z}_p$ has no zero divisors.

$\mathbb{Z}_p$ is clearly commutative with unity $\bar 1$, and $\bar 1 \neq \bar 0$ (since $p \geq 2$). So $\mathbb{Z}_p$ is an integral domain. $\checkmark$

*($\Rightarrow$) Contrapositive: $n$ composite $\Rightarrow$ $\mathbb{Z}_n$ is not an integral domain.*

Suppose $n = ab$ with $1 < a, b < n$ (nontrivial factorization). Then $\bar a, \bar b \in \mathbb{Z}_n$ satisfy:
- $\bar a \neq \bar 0$: since $0 < a < n$, $a \not\equiv 0 \pmod n$. $\checkmark$
- Similarly $\bar b \neq \bar 0$.
- $\bar a \cdot \bar b = \overline{ab} = \bar n = \bar 0$.

So $\bar a$ and $\bar b$ are zero divisors. $\mathbb{Z}_n$ is not an integral domain. $\checkmark$

(Edge case: $n = 1$ gives the trivial zero ring $\mathbb{Z}_1 = \{0\}$, which fails $1 \neq 0$ and is excluded from the integral-domain definition.) $\blacksquare$

*Alternative for $(\Leftarrow)$ using Theorem 21.4.* $\mathbb{Z}_p$ is finite and has no zero divisors (by Euclid's lemma as above); a finite integral domain is a field, so a fortiori an integral domain.

---

**Solution 2.** Every subring of a field containing the unity is an integral domain.

*Setup.* Let $\mathbb{F}$ be a field and $R \subseteq \mathbb{F}$ a subring with $1_\mathbb{F} \in R$. We show $R$ is an integral domain.

*Step 1: $R$ is a commutative ring with unity.*

- Closed under $+, -, \cdot$ (subring definition).
- Contains $0_\mathbb{F}$ (since $0 = 1 - 1 \in R$) and $1_\mathbb{F}$ by hypothesis.
- $1_R = 1_\mathbb{F}$ is a multiplicative identity in $R$: for any $r \in R \subseteq \mathbb{F}$, $r \cdot 1_\mathbb{F} = r$.
- Commutative: inherited from $\mathbb{F}$.
- $1 \neq 0$ in $R$ since they are distinct in $\mathbb{F}$.

*Step 2: No zero divisors.*

Suppose $ab = 0$ with $a, b \in R$. We have $a, b \in \mathbb{F}$, and in $\mathbb{F}$ (being a field, hence integral domain by Example 3): $ab = 0 \Rightarrow a = 0$ or $b = 0$.

Hence $R$ has no zero divisors.

*Conclusion.* $R$ satisfies all integral-domain axioms. $\blacksquare$

*Remark.* This explains why $\mathbb{Z}$, $\mathbb{Q}$, $\mathbb{Z}[i]$, $\mathbb{Z}[\sqrt 2]$, $\mathbb{Q}(\sqrt 2)$, etc., are all integral domains: they are subrings of $\mathbb{C}$, which is a field. The same argument extends to any subring of any integral domain: integral-domainness is inherited downward.

---

**Solution 3.** $\operatorname{char}(\mathbb{Z}_6 \times \mathbb{Z}_{15}) = ?$.

*Strategy.* As in Example 18, $\operatorname{char}(R \times S) = \operatorname{lcm}(\operatorname{char} R, \operatorname{char} S)$ (when both are finite and nonzero).

*Computation.*
1. $\operatorname{char}(\mathbb{Z}_6) = 6$, $\operatorname{char}(\mathbb{Z}_{15}) = 15$.
2. Need smallest $n \geq 1$ with $n \cdot (\bar 1, \bar 1) = (\bar 0, \bar 0)$ in $\mathbb{Z}_6 \times \mathbb{Z}_{15}$.
3. This is $n = \operatorname{lcm}(6, 15)$.
4. $\gcd(6, 15) = 3$, so $\operatorname{lcm}(6, 15) = 6 \cdot 15 / 3 = 30$.

*Verification.* $30 \cdot (\bar 1, \bar 1) = (30 \bmod 6, 30 \bmod 15) = (0, 0)$. $\checkmark$

*Sanity.* $\mathbb{Z}_6 \times \mathbb{Z}_{15}$ is not an integral domain (product of nontrivial rings), so Theorem 21.6 does not apply, and a composite characteristic $30$ is expected.

$\boxed{\operatorname{char}(\mathbb{Z}_6 \times \mathbb{Z}_{15}) = 30.}$ $\blacksquare$

---

**Solution 4.** $1 + i$ is irreducible in $\mathbb{Z}[i]$.

*Setup.* Define the **norm** $N : \mathbb{Z}[i] \to \mathbb{Z}_{\geq 0}$ by $N(a + bi) = a^2 + b^2 = (a + bi)\overline{(a + bi)}$. Key property: $N$ is **multiplicative**, $N(\alpha \beta) = N(\alpha) N(\beta)$.

*Proof of multiplicativity.* $N(\alpha\beta) = \alpha\beta \overline{\alpha\beta} = \alpha\beta \bar\alpha\bar\beta = (\alpha\bar\alpha)(\beta\bar\beta) = N(\alpha)N(\beta)$. $\checkmark$

*Units.* $N(\alpha) = 1$ iff $\alpha \in \{1, -1, i, -i\} = \mathbb{Z}[i]^\times$. (Reason: $a^2 + b^2 = 1$ in integers forces $(a, b) \in \{(\pm 1, 0), (0, \pm 1)\}$.)

*Strategy.* Suppose $1 + i = \alpha \beta$ with $\alpha, \beta \in \mathbb{Z}[i]$. Take norms. The prime $N(1 + i) = 2$ forces one factor to be a unit.

*Computation.*

1. $N(1 + i) = 1^2 + 1^2 = 2$.

2. Suppose $1 + i = \alpha \beta$. Then $N(\alpha) N(\beta) = N(1 + i) = 2$.

3. $N(\alpha), N(\beta) \in \mathbb{Z}_{\geq 0}$ and their product is $2$. Since $2$ is prime, $(N(\alpha), N(\beta)) \in \{(1, 2), (2, 1)\}$.

4. WLOG $N(\alpha) = 1$, i.e., $\alpha \in \mathbb{Z}[i]^\times$ — $\alpha$ is a unit.

*Conclusion.* Every factorization of $1 + i$ has a unit factor, so $1 + i$ is irreducible.

*Interpretation.* $1 + i$ is the **Gaussian prime above $2$**: it generates the prime ideal of $\mathbb{Z}[i]$ containing $2 = -i(1 + i)^2$. In the Gaussian integers, the rational prime $2$ "ramifies" as the square of an associate of $1 + i$.

$\boxed{1 + i \text{ is irreducible in } \mathbb{Z}[i].}$ $\blacksquare$

---

**Solution 5.** In an integral domain $D$, $a^n = 0$ for some $n \geq 1$ implies $a = 0$.

*Setup.* An element $a$ with $a^n = 0$ for some $n \geq 1$ is called **nilpotent**. The claim is: integral domains have no nonzero nilpotents.

*Strategy.* Induction on $n$ (or direct: by the no-zero-divisor property, factor $a^n = a \cdot a^{n-1}$, one factor must be zero).

*Proof by strong induction on $n$.*

**Base case ($n = 1$).** $a^1 = a = 0$. So $a = 0$. $\checkmark$

**Inductive step.** Assume the claim holds for all $k < n$ (where $n \geq 2$): $a^k = 0 \Rightarrow a = 0$. We prove it for $n$.

Suppose $a^n = 0$. Write $a^n = a \cdot a^{n - 1}$. We have a product equal to zero in an integral domain: either $a = 0$ (done), or $a^{n - 1} = 0$. In the latter case, $n - 1 \geq 1$, so the inductive hypothesis gives $a = 0$. Either way, $a = 0$. $\checkmark$

*Conclusion.* $a^n = 0$ implies $a = 0$ for all $n \geq 1$. $\blacksquare$

*Alternative proof (without induction).* Take the minimal $n \geq 1$ with $a^n = 0$ (exists by well-ordering if some $a^n = 0$). If $n = 1$, done. If $n \geq 2$, write $a \cdot a^{n - 1} = 0$ with $a^{n-1} \neq 0$ (by minimality of $n$); the no-zero-divisor property forces $a = 0$, and then $a^n = 0^n = 0$ for any $n$ — but this contradicts $a^{n-1} \neq 0$ if $n \geq 2$. So $n = 1$ and $a = 0$.

*Remark.* The set of nilpotent elements of a commutative ring $R$ is an ideal, called the **nilradical** $\mathrm{Nil}(R)$. This problem shows $\mathrm{Nil}(D) = (0)$ for any integral domain $D$ — a useful characterization.

---

**Solution 6.** $\operatorname{Frac}(\mathbb{Z}[\sqrt 2]) = ?$.

*Setup.* $\mathbb{Z}[\sqrt 2] = \{a + b\sqrt 2 : a, b \in \mathbb{Z}\} \subseteq \mathbb{R}$, an integral domain (subring of $\mathbb{R}$).

*Claim.* $\operatorname{Frac}(\mathbb{Z}[\sqrt 2]) = \mathbb{Q}(\sqrt 2) := \{p + q\sqrt 2 : p, q \in \mathbb{Q}\}$.

*Strategy.* Same pattern as Example 14 for $\mathbb{Z}[i]/\mathbb{Q}(i)$:
1. $\mathbb{Q}(\sqrt 2)$ is a field containing $\mathbb{Z}[\sqrt 2]$.
2. Every element of $\mathbb{Q}(\sqrt 2)$ is a quotient of elements of $\mathbb{Z}[\sqrt 2]$.
3. Conversely, every quotient $\alpha/\beta$ with $\alpha, \beta \in \mathbb{Z}[\sqrt 2]$, $\beta \neq 0$, lies in $\mathbb{Q}(\sqrt 2)$.

*Step 1: $\mathbb{Q}(\sqrt 2)$ is a field.*

Subring of $\mathbb{R}$: closed under $+, -$, and under multiplication:
$$(p + q\sqrt 2)(r + s\sqrt 2) = (pr + 2qs) + (ps + qr)\sqrt 2 \in \mathbb{Q}(\sqrt 2). \checkmark$$

Contains $0$ and $1$. Multiplicative inverses: for $(p, q) \neq (0, 0)$,
$$(p + q\sqrt 2)^{-1} = \frac{p - q\sqrt 2}{(p + q\sqrt 2)(p - q\sqrt 2)} = \frac{p - q\sqrt 2}{p^2 - 2q^2}.$$
The denominator $p^2 - 2q^2 \neq 0$: if it were, either $q = 0$ (then $p = 0$, contradicting $(p, q) \neq 0$) or $p/q = \pm\sqrt 2$, impossible since $\sqrt 2$ is irrational and $p, q \in \mathbb{Q}$. So the inverse exists in $\mathbb{Q}(\sqrt 2)$. $\checkmark$

*Step 2: $\mathbb{Z}[\sqrt 2] \subseteq \mathbb{Q}(\sqrt 2)$.* Trivial since $\mathbb{Z} \subseteq \mathbb{Q}$.

*Step 3: Every $p + q\sqrt 2 \in \mathbb{Q}(\sqrt 2)$ is a quotient from $\mathbb{Z}[\sqrt 2]$.* Write $p = a/b$, $q = c/d$ with $a, b, c, d \in \mathbb{Z}$, $b, d \neq 0$. Then
$$p + q\sqrt 2 = \frac{a}{b} + \frac{c}{d}\sqrt 2 = \frac{ad + bc\sqrt 2}{bd}.$$
Numerator $ad + bc\sqrt 2 \in \mathbb{Z}[\sqrt 2]$, denominator $bd \in \mathbb{Z} \subseteq \mathbb{Z}[\sqrt 2]$ (nonzero). $\checkmark$

*Step 4: Conversely, any $\alpha/\beta$ with $\alpha, \beta \in \mathbb{Z}[\sqrt 2]$, $\beta \neq 0$, lies in $\mathbb{Q}(\sqrt 2)$.* Rationalize: write $\beta = a + b\sqrt 2$ and use $\bar \beta = a - b\sqrt 2$:
$$\frac{\alpha}{\beta} = \frac{\alpha \bar\beta}{\beta \bar\beta} = \frac{\alpha \bar\beta}{a^2 - 2b^2}.$$
Here $a^2 - 2b^2 \in \mathbb{Z}_{\neq 0}$ (nonzero by $\sqrt 2$ irrational, as in Step 1) and $\alpha \bar\beta \in \mathbb{Z}[\sqrt 2]$. So $\alpha/\beta = (\alpha \bar\beta)/(a^2 - 2b^2)$, a $\mathbb{Z}[\sqrt 2]$-element divided by a nonzero rational integer — clearly in $\mathbb{Q}(\sqrt 2)$. $\checkmark$

*Conclusion.* By Steps 3 and 4, the field of fractions coincides with $\mathbb{Q}(\sqrt 2)$. By uniqueness (Theorem 21.12), $\operatorname{Frac}(\mathbb{Z}[\sqrt 2]) = \mathbb{Q}(\sqrt 2)$. $\blacksquare$

$\boxed{\operatorname{Frac}(\mathbb{Z}[\sqrt 2]) = \mathbb{Q}(\sqrt 2) = \{a + b\sqrt 2 : a, b \in \mathbb{Q}\}.}$

---

**Solution 7.** If $D$ is an integral domain, then $D[x]$ is an integral domain and $D[x]^\times = D^\times$.

*Setup.* $D[x]$ is the polynomial ring in one variable over $D$. For a nonzero $f \in D[x]$, $\deg f$ is the largest index $i$ with coefficient $a_i \neq 0$; the leading coefficient is $a_{\deg f}$.

**Part 1: $D[x]$ is an integral domain.**

*Strategy.* Show the leading coefficient of a product of nonzero polynomials is the product of leading coefficients, nonzero by the no-zero-divisor property of $D$.

*Proof.* $D[x]$ is a commutative ring with unity (constant polynomial $1$). Suppose $f, g \in D[x]$ are nonzero, with $f = a_m x^m + \cdots$ and $g = b_n x^n + \cdots$, $a_m, b_n \neq 0$. Multiplying:
$$fg = a_m b_n x^{m + n} + \text{(lower-order terms)}.$$
Since $D$ is an integral domain, $a_m b_n \neq 0$. Hence $fg$ has a nonzero leading term of degree $m + n$, so $fg \neq 0$.

By contrapositive: $fg = 0$ implies $f = 0$ or $g = 0$. $\checkmark$

**Part 2: $D[x]^\times = D^\times$.**

*($\supseteq$)* If $u \in D^\times$, then $u \in D \subseteq D[x]$ with inverse $u^{-1} \in D \subseteq D[x]$. So $u \in D[x]^\times$.

*($\subseteq$)* Suppose $f \in D[x]^\times$. Write $fg = 1$ for some $g \in D[x]$.

Taking degrees (possible since $D$ is an integral domain, giving **degree additivity**):
$$\deg(fg) = \deg f + \deg g = \deg 1 = 0.$$
Since $\deg f, \deg g \in \mathbb{Z}_{\geq 0}$ (both $f, g$ nonzero as $fg = 1 \neq 0$), the only way $\deg f + \deg g = 0$ is $\deg f = \deg g = 0$. So both are constants: $f = a \in D$, $g = b \in D$, with $ab = 1$, i.e., $a \in D^\times$.

*Conclusion.* $D[x]^\times = D^\times$. $\blacksquare$

*Concrete example.* $(\mathbb{Z}[x])^\times = \mathbb{Z}^\times = \{\pm 1\}$. So the only units in $\mathbb{Z}[x]$ are the constant polynomials $1$ and $-1$.

*Caution: this fails without the ID hypothesis.* In $\mathbb{Z}_4[x]$, $(2x + 1)(2x + 1) = 4x^2 + 4x + 1 = 1$, so $2x + 1$ is a unit of degree $1$! Degree additivity fails because $2 \cdot 2 = 0$ in $\mathbb{Z}_4$.

---

**Solution 8 (Bonus).** In $\mathbb{Z}[\sqrt{-5}]$, $3$ is irreducible but not prime.

*Setup.* $\mathbb{Z}[\sqrt{-5}]$ with norm $N(a + b\sqrt{-5}) = a^2 + 5b^2$, multiplicative. Units: $N(\alpha) = 1 \Rightarrow \alpha = \pm 1$, so $\mathbb{Z}[\sqrt{-5}]^\times = \{\pm 1\}$.

**Part 1: $3$ is irreducible.**

Suppose $3 = \alpha \beta$. Take norms: $9 = N(\alpha) N(\beta)$. Possible pairs: $(1, 9), (3, 3), (9, 1)$.

- $N(\alpha) = 1$: $\alpha = \pm 1$, a unit. $\checkmark$
- $N(\alpha) = 3$: $a^2 + 5b^2 = 3$ has no integer solutions ($b = 0 \Rightarrow a^2 = 3$ impossible; $|b| \geq 1 \Rightarrow 5b^2 \geq 5 > 3$).
- $N(\alpha) = 9$: $N(\beta) = 1$, so $\beta$ is a unit.

So some factor is a unit. Hence $3$ is irreducible. $\checkmark$

**Part 2: $3$ is not prime.**

Compute:
$$(1 + \sqrt{-5})(1 - \sqrt{-5}) = 1^2 - (\sqrt{-5})^2 = 1 - (-5) = 6.$$

So $3 \mid 6 = (1 + \sqrt{-5})(1 - \sqrt{-5})$.

If $3$ were prime, it would divide one of the factors.

*Test $3 \mid 1 + \sqrt{-5}$:* if $1 + \sqrt{-5} = 3(a + b\sqrt{-5}) = 3a + 3b\sqrt{-5}$, then $1 = 3a$ — impossible for $a \in \mathbb{Z}$.

*Test $3 \mid 1 - \sqrt{-5}$:* same issue, $1 = 3a$ impossible.

Hence $3 \nmid 1 \pm \sqrt{-5}$, so $3$ is not prime. $\checkmark$

*Conclusion.* $3$ is irreducible but not prime in $\mathbb{Z}[\sqrt{-5}]$, an example that "irreducible $\neq$ prime" in general integral domains. $\blacksquare$

*Remark (non-UFD).* This gives another witness that $\mathbb{Z}[\sqrt{-5}]$ is not a UFD: $6 = 2 \cdot 3 = (1 + \sqrt{-5})(1 - \sqrt{-5})$ are two essentially distinct factorizations of $6$ into irreducibles. Unique factorization fails.

---

## Related Concepts

- [[19-rings-definition-and-examples]] — ring basics; zero divisors introduced.
- [[22-ideals-and-quotient-rings]] — **prime** and **maximal** ideals are characterized via integral-domain and field quotients.
- [[23-ring-homomorphisms]] — the characteristic arises from the canonical homomorphism $\mathbb{Z} \to R$.
- [[24-polynomial-rings]] — $D[x]$ is an integral domain when $D$ is; factorization theory extends.
- [[26-fields-and-irreducibility]] — irreducibility tests in polynomial rings over integral domains.
- [[25-co4-practice-problems]] — consolidated practice across CO4 chapters.

---

*Last updated: 2026-04-19*
