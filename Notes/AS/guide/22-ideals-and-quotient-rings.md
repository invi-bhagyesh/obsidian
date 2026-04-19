---
title: "Ideals and Quotient Rings"
type: guide
co: CO4
related: [19-rings-definition-and-examples, 21-integral-domains, 23-ring-homomorphisms, 18-isomorphism-theorems]
---

# 22. Ideals and Quotient Rings

**Ideals** are the ring-theoretic analog of normal subgroups: subsets of a ring $R$ that are closed under ring addition *and* absorb multiplication by arbitrary elements of $R$. Exactly as normal subgroups allow the formation of quotient groups, ideals allow the formation of **quotient rings** $R/I$, whose elements are additive cosets $a + I$ and whose multiplication is inherited from $R$ in a well-defined manner. The quotient $R/I$ preserves the ring structure of $R$ while collapsing all elements of $I$ to zero — and a remarkable dictionary emerges:

- $R/I$ is an integral domain $\iff$ $I$ is a **prime ideal**.
- $R/I$ is a field $\iff$ $I$ is a **maximal ideal**.

This chapter builds the entire theory from scratch: it defines ideals, constructs the quotient ring, classifies ideals in $\mathbb{Z}$ (every ideal is principal), proves that sum, intersection, and product of ideals are ideals, and establishes the fundamental equivalences between prime / maximal ideals and properties of the quotient. Each proof is written at graduate-exam standard: every inference is justified, every assumption made explicit, every computation displayed, and every conclusion verified.

---

## 22.1 Ideals

> **Definition 22.1 (Two-sided ideal).** A subset $I$ of a ring $R$ is an **ideal** (more precisely, a *two-sided ideal*) if it satisfies the two axioms:
>
> 1. **(Additive subgroup.)** $I$ is a subgroup of the additive group $(R, +)$. Concretely:
>    - $0_R \in I$.
>    - For all $a, b \in I$, $a - b \in I$ (closure under the subgroup test).
> 2. **(Absorption / two-sided closure.)** For every $r \in R$ and $a \in I$,
>    $$ra \in I \qquad \text{and} \qquad ar \in I.$$

Two remarks on the definition are worth noting explicitly:

- Axiom (2) is strictly stronger than "$I$ is closed under the multiplication of $R$": one must absorb products with *every* element of $R$, not merely with other elements of $I$. In particular, every ideal is closed under multiplication by itself, so every ideal is a subring of $R$ *without unity* (ideals need not contain $1_R$; see Prop. 22.3).
- For a **commutative** ring $R$, the left and right versions of absorption coincide, so axiom (2) reduces to: $ra \in I$ for all $r \in R, a \in I$. All rings in this chapter are commutative with unity unless explicitly stated.

> **Definition 22.2 (Proper ideal).** An ideal $I \subseteq R$ is **proper** if $I \neq R$, i.e., $I$ is a strict subset of $R$.

The next proposition gives a clean criterion for properness that is used constantly in proofs: a proper ideal cannot contain any unit.

> **Proposition 22.3 (Proper ideals contain no units).** An ideal $I \trianglelefteq R$ is proper if and only if $I$ contains no unit of $R$. Equivalently, $I$ is proper if and only if $1_R \notin I$.

**Proof.**

**($\Leftarrow$) Contrapositive of "$I$ proper $\implies$ no units."** Suppose $I$ contains a unit $u \in R^\times$. We prove $I = R$.

*Step 1.* Since $u$ is a unit, there exists $u^{-1} \in R$ with $u^{-1} u = u u^{-1} = 1_R$.

*Step 2.* By absorption (axiom 2 applied with $r = u^{-1} \in R$ and $a = u \in I$),
$$1_R = u^{-1} u \in I.$$

*Step 3.* For arbitrary $r \in R$, apply absorption again with the element $1_R \in I$:
$$r = r \cdot 1_R \in I.$$
Hence $R \subseteq I$. Combined with $I \subseteq R$ (definition of subset), $I = R$.

So a unit in $I$ forces $I = R$, contradicting properness.

**($\Rightarrow$) If $I = R$, then $1_R \in I$ (and $1_R$ is a unit, its own inverse).** Trivial.

Combining the two directions: $I$ proper $\iff$ $1_R \notin I$ $\iff$ $I$ contains no unit (since any unit $u$ in $I$ forces $1_R \in I$ by the argument above, and conversely $1_R$ is itself a unit). $\blacksquare$

**Corollary.** The only ideal containing $1_R$ is $R$ itself. Hence, when constructing a proper ideal, one must explicitly verify that the unit is excluded.

---

### Examples of ideals

**Example 1 (The principal ideal $n\mathbb{Z}$).** Fix $n \ge 0$. The set $n\mathbb{Z} = \{nk : k \in \mathbb{Z}\}$ is an ideal of $\mathbb{Z}$.

- Additive subgroup: $0 = n \cdot 0 \in n\mathbb{Z}$, and $nk_1 - nk_2 = n(k_1 - k_2) \in n\mathbb{Z}$.
- Absorption: for $r \in \mathbb{Z}$ and $nk \in n\mathbb{Z}$, $r \cdot (nk) = n(rk) \in n\mathbb{Z}$.

$n\mathbb{Z}$ is proper iff $n \neq \pm 1$. When $n = 0$, $n\mathbb{Z} = \{0\}$; when $n = 1$, $n\mathbb{Z} = \mathbb{Z}$.

**Example 2 (Trivial ideals).** For any ring $R$, both $\{0_R\}$ and $R$ itself are ideals, called the **trivial ideals**. These are respectively the smallest and largest ideals of $R$.

**Example 3 (Polynomials with even constant term).** In $R = \mathbb{Z}[x]$, let
$$I = \{p(x) \in \mathbb{Z}[x] : p(0) \text{ is even}\} = \{p(x) : p(0) \equiv 0 \pmod 2\}.$$

- *Additive subgroup:* $0 \in I$; and $(p - q)(0) = p(0) - q(0)$, a difference of even integers is even.
- *Absorption:* For $r(x) \in \mathbb{Z}[x]$ and $p(x) \in I$, $(rp)(0) = r(0)p(0) \in 2\mathbb{Z}$ (product of an integer and an even integer is even).

So $I$ is an ideal. We will see in §22.3 that $I = \langle 2, x\rangle$.

**Example 4 (Non-example: bottom-row-zero matrices).** In $R = M_n(\mathbb{R})$ with $n \ge 2$, let
$$J = \{A \in M_n(\mathbb{R}) : \text{bottom row of } A \text{ is zero}\}.$$

This is closed under addition (row-by-row) and under *left* multiplication by any $B \in M_n(\mathbb{R})$: indeed, the bottom row of $BA$ is a linear combination (weighted by the last row of $B$) of the rows of $A$, and if all rows of $A$ with nonzero bottom entry vanish in the last row — wait, this is wrong. Actually $J$ is not closed under left multiplication either. The correct observation: the set of matrices with bottom *column* zero is a right ideal but not a left ideal.

Let us instead verify directly that $J$ fails absorption on the right. Take $A = E_{1,n}$ (the matrix with $1$ in position $(1, n)$ and zeros elsewhere). The bottom row of $A$ is zero, so $A \in J$. Now let $B = E_{n, 1}$ (the matrix with $1$ in position $(n, 1)$). Compute $AB$: its $(1, 1)$-entry is $\sum_k A_{1k} B_{k1} = A_{1n} B_{n1} = 1$, and one checks that $AB = E_{1,1}$. But then $BA$ has bottom row $(BA)_{n,\cdot} = \sum_k B_{nk} A_{k, \cdot}$ — all entries $B_{nk}$ vanish for $k \neq 1$, and $B_{n,1} A_{1, \cdot} = A_{1,\cdot}$, so the bottom row of $BA$ equals the first row of $A = E_{1,n}$, which has a $1$ in position $n$. Hence the bottom row of $BA$ is nonzero, so $BA \notin J$, violating left absorption.

Conclusion: $J$ is not an ideal of $M_n(\mathbb{R})$. (Noncommutative rings often have "one-sided" ideals, as in this example.)

**Example 5 (Ideals of a field).** Let $F$ be a field. Then the only ideals of $F$ are $\{0\}$ and $F$.

*Proof.* Let $I \trianglelefteq F$ with $I \neq \{0\}$. Pick any $0 \neq a \in I$. Since $F$ is a field, $a$ is a unit, so by Prop. 22.3, $I = F$. $\blacksquare$

*Interpretation.* Fields are "simple" as rings: they have no proper non-trivial ideals. Conversely, a commutative ring with unity all of whose ideals are trivial must be a field (take any nonzero $a$; $\langle a\rangle = R$ gives $ab = 1$ for some $b$, so $a$ is a unit; hence all nonzero elements are units).

---

## 22.2 Principal Ideals

> **Definition 22.4 (Principal ideal).** Let $R$ be a commutative ring with unity and $a \in R$. The **principal ideal generated by $a$** is
> $$\langle a\rangle \;=\; Ra \;=\; \{ra : r \in R\}.$$
>
> (The notations $\langle a\rangle$, $(a)$, and $aR = Ra$ all refer to the same object when $R$ is commutative.)

**Verification that $\langle a\rangle$ is an ideal.**
- *Additive subgroup:* $0 = 0 \cdot a \in \langle a\rangle$, and for $r_1 a, r_2 a \in \langle a\rangle$, $(r_1 a) - (r_2 a) = (r_1 - r_2) a \in \langle a\rangle$.
- *Absorption:* For $s \in R$ and $ra \in \langle a\rangle$, $s(ra) = (sr) a \in \langle a\rangle$ by associativity and commutativity.

So $\langle a\rangle$ is indeed an ideal, and it clearly contains $a$ (namely, $a = 1 \cdot a$ uses the unity).

> **Proposition 22.5 (Minimality).** $\langle a\rangle$ is the *smallest* ideal of $R$ containing $a$: if $J$ is any ideal with $a \in J$, then $\langle a\rangle \subseteq J$.

**Proof.** Let $J$ be any ideal with $a \in J$. For any $r \in R$, $ra \in J$ by absorption (axiom 2 applied with the element $a \in J$). Hence $\{ra : r \in R\} = \langle a\rangle \subseteq J$. $\blacksquare$

**Alternative description.** $\langle a\rangle = \bigcap \{J \trianglelefteq R : a \in J\}$, the intersection of all ideals containing $a$. The two descriptions agree because the right side is an ideal (Proposition 22.23 below) containing $a$, hence containing $\langle a\rangle$ by Prop. 22.5; conversely the right side is inside $\langle a\rangle$ since $\langle a\rangle$ is one of the ideals being intersected.

### Examples of principal ideals

**Example 6 ($\mathbb{Z}$).** In $\mathbb{Z}$, $\langle n\rangle = n\mathbb{Z} = \{nk : k \in \mathbb{Z}\}$ for every $n \in \mathbb{Z}$. Note $\langle -n\rangle = \langle n\rangle$, since $-n\mathbb{Z} = n\mathbb{Z}$.

**Example 7 ($\mathbb{Q}$).** In $\mathbb{Q}$, $\langle 2\rangle = \mathbb{Q}$ because $2$ is a unit: $1 = 2 \cdot \frac{1}{2} \in \langle 2\rangle$, so $\langle 2\rangle$ contains $1$ and hence all of $\mathbb{Q}$. More generally, in a field, $\langle a\rangle = F$ whenever $a \neq 0$.

**Example 8 (Extremes).** $\langle 0\rangle = \{0\}$, the zero ideal. $\langle 1\rangle = \{r \cdot 1 : r \in R\} = R$, the whole ring. So the trivial ideals are principal.

> **Definition 22.6 (Principal ideal domain / PID).** A **principal ideal domain** is an integral domain $R$ in which *every* ideal is principal, i.e., for each ideal $I \trianglelefteq R$ there exists $a \in R$ with $I = \langle a\rangle$.

**Example 9.** $\mathbb{Z}$ is a PID (Theorem 22.7 below).

**Example 10.** $F[x]$ is a PID whenever $F$ is a field (proved in [[24-polynomial-rings]], Theorem 24.7; the proof uses polynomial division exactly analogously to Theorem 22.7 below).

**Example 11 (Non-example).** $\mathbb{Z}[x]$ is *not* a PID. The ideal $\langle 2, x\rangle$ is not principal.

*Sketch.* Suppose $\langle 2, x\rangle = \langle f(x)\rangle$. Then $2 \in \langle f(x)\rangle$, so $f(x) \mid 2$ in $\mathbb{Z}[x]$; since $2$ is a constant, $f$ must be a constant, say $f = c \in \mathbb{Z}$, with $c \mid 2$ so $c \in \{\pm 1, \pm 2\}$. Now $x \in \langle c\rangle$, so $c \mid x$ in $\mathbb{Z}[x]$; examining leading coefficients, $c \mid 1$, so $c = \pm 1$. But then $\langle f\rangle = \mathbb{Z}[x]$, contradicting the fact that $\langle 2, x\rangle$ is proper (it does not contain $1$: any element of $\langle 2, x\rangle$ has even constant term, but $1$ is odd). $\blacksquare$

### Every ideal of $\mathbb{Z}$ is principal

> **Theorem 22.7 ($\mathbb{Z}$ is a PID).** Every ideal $I \trianglelefteq \mathbb{Z}$ is principal: there exists $n \ge 0$ with $I = n\mathbb{Z} = \langle n\rangle$.

**Proof.** We split into cases based on whether $I$ is trivial.

**Case 1: $I = \{0\}$.** Then $I = 0 \cdot \mathbb{Z} = \langle 0\rangle$, principal.

**Case 2: $I \neq \{0\}$.** We must produce a generator.

*Step 1 (Find a positive element).* Since $I \neq \{0\}$, choose $0 \neq m \in I$. If $m > 0$, keep $m$. If $m < 0$, replace $m$ with $-m > 0$; this is legal because $-m = (-1) \cdot m \in I$ by absorption (and because $I$ is closed under additive inverses as a subgroup). In either case, $I$ contains a positive integer.

*Step 2 (Apply well-ordering).* The set $S = I \cap \mathbb{Z}_{>0}$ is a nonempty subset of $\mathbb{Z}_{>0}$. By the **well-ordering principle** of the positive integers, $S$ has a least element; call it $n$. So:
- $n \in I$,
- $n > 0$,
- $n \le m$ for every $m \in I$ with $m > 0$.

We claim $I = n\mathbb{Z} = \langle n\rangle$.

*Step 3 ($\langle n\rangle \subseteq I$).* Since $n \in I$ and $I$ is an ideal, $kn = k \cdot n \in I$ for every $k \in \mathbb{Z}$ (absorption). Hence $n\mathbb{Z} = \{kn : k \in \mathbb{Z}\} \subseteq I$.

*Step 4 ($I \subseteq \langle n\rangle$).* Let $m \in I$ be arbitrary. Apply the **division algorithm** in $\mathbb{Z}$: there exist unique integers $q, r$ with
$$m = qn + r, \qquad 0 \le r < n.$$

Solve for $r$:
$$r = m - qn.$$

Now $m \in I$ (given), and $qn \in I$ (from Step 3, since $n\mathbb{Z} \subseteq I$). So $r = m - qn \in I$ (closure of $I$ under subtraction).

We have $r \in I$ with $0 \le r < n$. Suppose for contradiction $r > 0$. Then $r \in S = I \cap \mathbb{Z}_{>0}$, but $r < n$ contradicts the minimality of $n$ in $S$. Hence $r = 0$.

Therefore $m = qn \in n\mathbb{Z} = \langle n\rangle$. This holds for every $m \in I$, so $I \subseteq \langle n\rangle$.

*Conclusion.* $I = \langle n\rangle$. $\blacksquare$

**Sanity check.** The generator $n$ is unique up to sign: if $\langle n\rangle = \langle n'\rangle$ with $n, n' > 0$, then $n \mid n'$ and $n' \mid n$ in $\mathbb{Z}$, forcing $n = n'$. So once we require $n \ge 0$, the generator is *unique*.

**Remark (same proof works in $F[x]$).** The only properties used are: $\mathbb{Z}$ is an integral domain, and it admits a division algorithm (with remainder smaller than the divisor in a well-ordered sense). Any ring with such a division algorithm is called a **Euclidean domain** and is automatically a PID. This yields the same theorem for $F[x]$ with $F$ a field (degrees play the role of absolute values).

---

## 22.3 Ideals Generated by Subsets

> **Definition 22.8 (Ideal generated by a set).** Let $R$ be a commutative ring with unity and $S \subseteq R$ a subset. The **ideal generated by $S$**, denoted $\langle S\rangle$, is the set of finite $R$-linear combinations of elements of $S$:
> $$\langle S\rangle \;=\; \left\{\sum_{i=1}^n r_i s_i \;:\; n \in \mathbb{N},\; r_i \in R,\; s_i \in S\right\}.$$
>
> By convention the empty sum is $0$, so $\langle \emptyset\rangle = \{0\}$. When $S = \{a_1, \ldots, a_k\}$ is finite, we write $\langle a_1, \ldots, a_k\rangle$ for $\langle S\rangle$.

**Proposition 22.9.** $\langle S\rangle$ is an ideal, and it is the smallest ideal of $R$ containing $S$.

**Proof.**

*(a) $\langle S\rangle$ is an ideal.*

- *Contains $0$:* Take $n = 0$ (empty sum) or $n = 1, r_1 = 0$.
- *Closed under subtraction:* $\sum_{i=1}^n r_i s_i - \sum_{j=1}^m r'_j s'_j = \sum r_i s_i + \sum (-r'_j) s'_j$, which is again a finite $R$-linear combination of elements of $S$.
- *Absorption:* for $t \in R$,
  $$t \left(\sum_{i=1}^n r_i s_i\right) = \sum_{i=1}^n (t r_i) s_i,$$
  using distributivity and commutativity; the right side is in $\langle S\rangle$ since $tr_i \in R$.

So $\langle S\rangle$ is an ideal.

*(b) Minimality.* Let $J$ be any ideal containing $S$. Then for each $s_i \in S \subseteq J$ and each $r_i \in R$, $r_i s_i \in J$ (absorption); and finite sums of elements of $J$ stay in $J$ (additive subgroup). Hence every element $\sum r_i s_i \in \langle S\rangle$ is in $J$, so $\langle S\rangle \subseteq J$. $\blacksquare$

**Alternative description.** Analogously to the principal case,
$$\langle S\rangle = \bigcap \{J \trianglelefteq R : S \subseteq J\}.$$

### Examples

**Example 12 (GCD in $\mathbb{Z}$).** $\langle 6, 10\rangle = \langle \gcd(6, 10)\rangle = \langle 2\rangle = 2\mathbb{Z}$.

*Setup.* We need to show $\langle 6, 10\rangle = 2\mathbb{Z}$ by proving both containments.

*$2\mathbb{Z} \subseteq \langle 6, 10\rangle$:* We exhibit $2$ as an explicit integer linear combination. By extended Euclid (or inspection):
$$2 = (-3)(6) + (2)(10) = -18 + 20.$$
Indeed, $-18 + 20 = 2$. ✓

So $2 \in \langle 6, 10\rangle$, hence $\langle 2\rangle = 2\mathbb{Z} \subseteq \langle 6, 10\rangle$ by Prop. 22.9.

*$\langle 6, 10\rangle \subseteq 2\mathbb{Z}$:* Both $6 = 2 \cdot 3$ and $10 = 2 \cdot 5$ are in $2\mathbb{Z}$. Hence $\langle 6, 10\rangle \subseteq 2\mathbb{Z}$ by Prop. 22.9 (with $J = 2\mathbb{Z}$).

Conclusion: $\langle 6, 10\rangle = 2\mathbb{Z} = \langle 2\rangle$.

*General fact.* In $\mathbb{Z}$: $\langle m, n\rangle = \langle \gcd(m, n)\rangle$. This is essentially **Bézout's identity**: the gcd is a $\mathbb{Z}$-linear combination of $m$ and $n$, and every linear combination of $m, n$ is divisible by $\gcd(m, n)$.

**Example 13 (The ideal $\langle 2, x\rangle$ in $\mathbb{Z}[x]$).** Compute
$$\langle 2, x\rangle = \{2 r(x) + x s(x) : r, s \in \mathbb{Z}[x]\}.$$

*Claim.* $\langle 2, x\rangle = \{p(x) \in \mathbb{Z}[x] : p(0) \text{ is even}\}$ (the ideal of Example 3).

*($\subseteq$)* Any element $2r + xs$ has constant term $2 r(0) + 0 = 2 r(0) \in 2\mathbb{Z}$, so has even constant term.

*($\supseteq$)* Let $p(x) = a_0 + a_1 x + a_2 x^2 + \cdots + a_n x^n$ with $a_0 \in 2\mathbb{Z}$, say $a_0 = 2c$. Then
$$p(x) = 2c + x(a_1 + a_2 x + \cdots + a_n x^{n-1}) = 2 \cdot c + x \cdot s(x),$$
with $c \in \mathbb{Z}[x]$ (a constant polynomial) and $s \in \mathbb{Z}[x]$. Hence $p \in \langle 2, x\rangle$.

*Non-principality (recap from Example 11).* As shown earlier, $\langle 2, x\rangle$ is not principal, so $\mathbb{Z}[x]$ is not a PID.

---

## 22.4 Operations on Ideals

Three fundamental ways of building new ideals from old:

> **Definition 22.10 (Sum).** For ideals $I, J \trianglelefteq R$, the **sum** is
> $$I + J = \{a + b : a \in I,\; b \in J\}.$$

> **Definition 22.11 (Intersection).** The **intersection** $I \cap J$ is the usual set intersection.

> **Definition 22.12 (Product).** The **product** is
> $$IJ = \left\{\sum_{k=1}^n a_k b_k : n \in \mathbb{N},\; a_k \in I,\; b_k \in J\right\}.$$
> Note: the product $IJ$ is *not* simply $\{ab : a \in I, b \in J\}$; one must take finite sums to achieve closure under addition.

We prove each yields an ideal.

> **Proposition 22.13.** $I + J$, $I \cap J$, and $IJ$ are ideals of $R$.

**Proof.**

**(i) $I + J$ is an ideal.**

*Contains $0$:* $0 = 0 + 0$, with $0 \in I, 0 \in J$.

*Closed under subtraction:* If $a_1 + b_1, a_2 + b_2 \in I + J$ (with $a_i \in I, b_i \in J$), then
$$(a_1 + b_1) - (a_2 + b_2) = (a_1 - a_2) + (b_1 - b_2) \in I + J,$$
since $a_1 - a_2 \in I$ (ideal closed under subtraction) and $b_1 - b_2 \in J$.

*Absorption:* For $r \in R$,
$$r(a + b) = ra + rb \in I + J,$$
since $ra \in I$ (absorption in $I$) and $rb \in J$ (absorption in $J$).

Furthermore, $I + J$ is the **smallest ideal containing both $I$ and $J$**: clearly $I \subseteq I + J$ (take $b = 0$) and $J \subseteq I + J$ (take $a = 0$); conversely any ideal $K \supseteq I \cup J$ contains all sums $a + b$ with $a \in I \subseteq K, b \in J \subseteq K$ (by closure under addition), so $K \supseteq I + J$.

In particular, when $I = \langle a_1, \ldots, a_k\rangle$ and $J = \langle b_1, \ldots, b_\ell\rangle$, we have $I + J = \langle a_1, \ldots, a_k, b_1, \ldots, b_\ell\rangle$.

**(ii) $I \cap J$ is an ideal.**

*Contains $0$:* $0 \in I$ and $0 \in J$, so $0 \in I \cap J$.

*Closed under subtraction:* If $a, b \in I \cap J$, then $a - b \in I$ (since $a, b \in I$) and $a - b \in J$ (since $a, b \in J$), so $a - b \in I \cap J$.

*Absorption:* For $r \in R$ and $a \in I \cap J$, $ra \in I$ (absorption in $I$, using $a \in I$) and $ra \in J$ (absorption in $J$, using $a \in J$), so $ra \in I \cap J$.

**(iii) $IJ$ is an ideal.**

*Contains $0$:* Empty sum, or $0 = 0 \cdot 0$.

*Closed under subtraction:* $\sum_k a_k b_k - \sum_\ell a'_\ell b'_\ell = \sum_k a_k b_k + \sum_\ell (-a'_\ell) b'_\ell$, a finite sum of products from $I \times J$, hence in $IJ$.

*Absorption:* For $r \in R$,
$$r \left(\sum_k a_k b_k\right) = \sum_k (r a_k) b_k,$$
and $ra_k \in I$ (absorption in $I$), so the sum is in $IJ$. Absorption on the right: $(\sum_k a_k b_k) r = \sum_k a_k (b_k r)$, with $b_k r \in J$. $\blacksquare$

**Remark (product is contained in intersection).** For ideals $I, J$, we always have
$$IJ \subseteq I \cap J.$$
*Proof:* $a_k b_k \in I$ (since $b_k \in J \subseteq R$ and $a_k \in I$, absorption) and $a_k b_k \in J$ (since $a_k \in I \subseteq R$ and $b_k \in J$, absorption). Hence $a_k b_k \in I \cap J$, and finite sums stay in $I \cap J$.

Equality $IJ = I \cap J$ holds when $I + J = R$ (ideals are **coprime / comaximal**); this is one form of the Chinese Remainder Theorem.

**Example 14 (Operations in $\mathbb{Z}$).** For $m, n \in \mathbb{Z}$:
- $\langle m\rangle + \langle n\rangle = \langle \gcd(m, n)\rangle$ (Bézout);
- $\langle m\rangle \cap \langle n\rangle = \langle \operatorname{lcm}(m, n)\rangle$ (an integer $k$ divisible by both $m$ and $n$ is divisible by $\operatorname{lcm}(m, n)$);
- $\langle m\rangle \cdot \langle n\rangle = \langle mn\rangle$ (direct check: $am \cdot bn = (ab)(mn)$; finite sums of multiples of $mn$ stay multiples of $mn$).

Specializing $m = 6, n = 10$: $\gcd = 2, \operatorname{lcm} = 30, \text{product} = 60$, so
$$\langle 6\rangle + \langle 10\rangle = \langle 2\rangle,\quad \langle 6\rangle \cap \langle 10\rangle = \langle 30\rangle,\quad \langle 6\rangle\langle 10\rangle = \langle 60\rangle.$$

Note $\langle 60\rangle \subsetneq \langle 30\rangle$, confirming $IJ \subsetneq I \cap J$ here (since $\gcd(6, 10) = 2 \neq 1$, so the ideals are not coprime).

---

## 22.5 Quotient Rings

We now construct the **quotient ring** $R/I$. Think of $I$ as "elements we wish to treat as zero"; the quotient collapses them.

Given an ideal $I \trianglelefteq R$, regard $(R, +)$ as an abelian group and $I$ as a normal subgroup (automatic in abelian groups). The quotient *group* $R/I = \{a + I : a \in R\}$ exists, with cosets $a + I$ and addition $(a + I) + (b + I) = (a + b) + I$. The new feature is that we can also define a multiplication.

> **Theorem 22.14 (Quotient ring construction).** Let $I \trianglelefteq R$ be an ideal in a commutative ring $R$ with unity. The set
> $$R/I = \{a + I : a \in R\}$$
> of additive cosets becomes a commutative ring with unity under the operations
> $$(a + I) + (b + I) \;=\; (a + b) + I,$$
> $$(a + I) \cdot (b + I) \;=\; ab + I,$$
> with zero element $0 + I = I$ and unity $1 + I$.

**Proof.** We verify in order: (1) the operations are well-defined, (2) the ring axioms hold.

**(1) Well-definedness of addition.**

Suppose $a + I = a' + I$ and $b + I = b' + I$. By the coset-equality criterion in an abelian group: $a - a' \in I$ and $b - b' \in I$. We check that the sum defined via $a, b$ agrees with that defined via $a', b'$:
$$(a + b) - (a' + b') = (a - a') + (b - b') \in I,$$
since $I$ is closed under addition (as an additive subgroup). Hence $(a + b) + I = (a' + b') + I$. ✓

(This part uses only that $I$ is an additive subgroup; no absorption required.)

**(1') Well-definedness of multiplication.**

Suppose again $a + I = a' + I$ and $b + I = b' + I$, i.e., $a - a' \in I$ and $b - b' \in I$. We must show
$$ab + I = a'b' + I, \quad \text{i.e.,} \quad ab - a'b' \in I.$$

**This is where absorption is essential.** Use the "add and subtract" trick:
$$ab - a'b' \;=\; ab - a'b + a'b - a'b' \;=\; (a - a')b + a'(b - b').$$

Examine each summand:
- $(a - a') b$: we have $a - a' \in I$ (given) and $b \in R$, so $(a - a')b \in I$ by absorption.
- $a'(b - b')$: we have $a' \in R$ and $b - b' \in I$ (given), so $a'(b - b') \in I$ by absorption.

Hence $ab - a'b' = (\text{element of } I) + (\text{element of } I) \in I$, since $I$ is closed under addition. ✓

*Comment.* Without absorption — if $I$ were merely a subring — we would not be able to conclude $(a - a')b \in I$, because $b$ lies in $R$ but might not lie in $I$. Absorption is **exactly** the condition needed to make coset multiplication well-defined. This is the ring-theoretic analog of normality of a subgroup.

**(2) Ring axioms in $R/I$.**

Once the operations are well-defined, the ring axioms in $R/I$ follow mechanically from those in $R$. For instance:
- *Associativity of $+$*: $((a + I) + (b + I)) + (c + I) = (a + b + c) + I = (a + I) + ((b + I) + (c + I))$, using associativity of $+$ in $R$.
- *Distributivity*: $(a + I) \cdot ((b + I) + (c + I)) = (a + I)(b + c + I) = a(b+c) + I = (ab + ac) + I = ab + I + ac + I = (a + I)(b + I) + (a + I)(c + I)$, using distributivity in $R$.
- *Zero*: $0 + I = I$ is additive identity.
- *Unity*: $(1 + I)(a + I) = a + I$.
- *Commutativity of $\cdot$* (if $R$ is commutative): $(a + I)(b + I) = ab + I = ba + I = (b + I)(a + I)$.

All axioms check. Hence $R/I$ is a commutative ring with unity. $\blacksquare$

> **Proposition 22.15 (Canonical projection).** The map $\pi: R \to R/I$, $\pi(a) = a + I$, is a surjective ring homomorphism with $\ker \pi = I$. It is called the **canonical projection** or **quotient map**.

**Proof.**
- *Homomorphism:* $\pi(a + b) = (a + b) + I = (a + I) + (b + I) = \pi(a) + \pi(b)$; $\pi(ab) = ab + I = (a + I)(b + I) = \pi(a)\pi(b)$; $\pi(1) = 1 + I$, the unity of $R/I$.
- *Surjective:* every coset $a + I$ equals $\pi(a)$.
- *Kernel:* $\pi(a) = 0 + I = I$ iff $a + I = I$ iff $a \in I$. So $\ker\pi = I$. $\blacksquare$

---

### Worked examples of quotient rings

**Example 15 ($\mathbb{Z}/n\mathbb{Z} = \mathbb{Z}_n$).**

*Setup.* $R = \mathbb{Z}$, $I = n\mathbb{Z}$. The quotient $\mathbb{Z}/n\mathbb{Z}$ has cosets $\{k + n\mathbb{Z} : k = 0, 1, \ldots, n-1\}$ (one for each residue class mod $n$).

*Strategy.* Identify elements and operations explicitly.

*Computation.* Every integer $k$ is congruent mod $n$ to exactly one of $0, 1, \ldots, n-1$, so $|\mathbb{Z}/n\mathbb{Z}| = n$. Addition and multiplication: $(a + n\mathbb{Z}) + (b + n\mathbb{Z}) = (a + b) + n\mathbb{Z}$ and $(a + n\mathbb{Z})(b + n\mathbb{Z}) = ab + n\mathbb{Z}$ — the usual arithmetic mod $n$.

*Interpretation.* This is the standard construction of the ring $\mathbb{Z}_n$ of integers modulo $n$, realized now as a quotient of $\mathbb{Z}$ by an ideal.

*Verification.* $\mathbb{Z}_n$ has $n$ elements; it is a field iff $n$ is prime (Theorem 22.23 below). ✓

---

**Example 16 ($\mathbb{R}[x]/\langle x^2 + 1\rangle \cong \mathbb{C}$).**

*Setup.* $R = \mathbb{R}[x]$, $I = \langle x^2 + 1\rangle$.

*Strategy.* Construct a surjective ring homomorphism $\varphi: \mathbb{R}[x] \to \mathbb{C}$ with kernel $\langle x^2 + 1\rangle$, then apply the First Isomorphism Theorem for rings.

*Computation.*

*(a) Define $\varphi: \mathbb{R}[x] \to \mathbb{C}$ by $p(x) \mapsto p(i)$.*

This is the evaluation homomorphism at $i \in \mathbb{C}$. Check it is a ring homomorphism: $\varphi(p + q) = (p + q)(i) = p(i) + q(i) = \varphi(p) + \varphi(q)$; similarly for products; and $\varphi(1) = 1$.

*(b) Surjective.*

Every complex number has the form $a + bi$ with $a, b \in \mathbb{R}$. Let $p(x) = a + bx$; then $\varphi(p) = a + bi$. So $\mathbb{C} \subseteq \operatorname{Im}\varphi$, hence $\varphi$ is surjective. ✓

*(c) Kernel.*

We compute $\ker\varphi = \{p(x) \in \mathbb{R}[x] : p(i) = 0\}$.

$(\supseteq)$ Clearly $x^2 + 1 \in \ker\varphi$: $i^2 + 1 = -1 + 1 = 0$. Hence $\langle x^2 + 1\rangle \subseteq \ker\varphi$.

$(\subseteq)$ Suppose $p(x) \in \mathbb{R}[x]$ has $p(i) = 0$. Since $p$ has real coefficients and $i$ is a root, the complex conjugate $\bar i = -i$ is also a root. So $(x - i)$ and $(x + i)$ both divide $p(x)$ in $\mathbb{C}[x]$, and since they are coprime, their product $(x - i)(x + i) = x^2 + 1$ divides $p(x)$ in $\mathbb{C}[x]$. But $x^2 + 1 \in \mathbb{R}[x]$ and $p(x) \in \mathbb{R}[x]$, and division in $\mathbb{R}[x]$ yields a real quotient (uniqueness of polynomial division over any field works both in $\mathbb{R}[x]$ and $\mathbb{C}[x]$). So $(x^2 + 1) \mid p(x)$ in $\mathbb{R}[x]$, i.e., $p \in \langle x^2 + 1\rangle$.

Hence $\ker\varphi = \langle x^2 + 1\rangle$. ✓

*(d) First Isomorphism Theorem.*

$\varphi$ is surjective with kernel $\langle x^2 + 1\rangle$. Hence
$$\mathbb{R}[x]/\langle x^2 + 1\rangle \cong \mathbb{C}.$$

*Verification.* As an $\mathbb{R}$-vector space, $\mathbb{R}[x]/\langle x^2 + 1\rangle$ is spanned by $\{\bar 1, \bar x\}$ (any polynomial reduces mod $x^2 + 1$ to a linear polynomial of the form $a + bx$, since $x^2 \equiv -1$), so it has $\mathbb{R}$-dimension $2$. $\mathbb{C}$ also has $\mathbb{R}$-dimension $2$. ✓

*Interpretation.* $\mathbb{C}$ is *constructed* as the ring $\mathbb{R}[x]$ with the relation $x^2 = -1$ imposed. Setting $i := \bar x$ makes this a formal algebraic realization of the complex numbers. $\blacksquare$

---

**Example 17 ($\mathbb{Z}[x]/\langle x\rangle \cong \mathbb{Z}$).**

*Setup.* $R = \mathbb{Z}[x]$, $I = \langle x\rangle$.

*Strategy.* Evaluation at $0$.

*Computation.* Define $\varphi: \mathbb{Z}[x] \to \mathbb{Z}$ by $p(x) \mapsto p(0)$.

- *Homomorphism:* evaluation at $0$ respects $+$ and $\cdot$, and sends $1 \mapsto 1$. ✓
- *Surjective:* for any $n \in \mathbb{Z}$, $\varphi(n) = n$. ✓
- *Kernel:* $p(0) = 0$ iff $x \mid p(x)$ (factor theorem, valid over any commutative ring with unity), iff $p \in \langle x\rangle$.

By First Iso, $\mathbb{Z}[x]/\langle x\rangle \cong \mathbb{Z}$. $\blacksquare$

*Interpretation.* Setting $x = 0$ in a polynomial keeps only the constant term; the quotient sees only constant polynomials.

---

**Example 18 ($\mathbb{Z}[i]/\langle 1 + i\rangle \cong \mathbb{F}_2$).**

*Setup.* $R = \mathbb{Z}[i]$, $I = \langle 1 + i\rangle$. (Discussed also in Example 16 of [[21-integral-domains]].)

*Strategy.* Find a surjective ring homomorphism $\mathbb{Z}[i] \to \mathbb{F}_2$ with kernel $\langle 1 + i\rangle$.

*Computation.* Note $N(1 + i) = 1^2 + 1^2 = 2$. The inclusion $\mathbb{Z} \hookrightarrow \mathbb{Z}[i]$ induces $\mathbb{Z} \to \mathbb{Z}[i]/\langle 1 + i\rangle$. In this quotient, $\bar i = -\bar 1$ (since $1 + i \equiv 0$, so $i \equiv -1$), and $2 = (1 + i)(1 - i) \equiv 0$. Hence the composite $\mathbb{Z} \to \mathbb{Z}[i]/\langle 1 + i\rangle$ factors through $\mathbb{Z}/2\mathbb{Z} = \mathbb{F}_2$.

Conversely, every $a + bi \in \mathbb{Z}[i]$ is $\equiv a + b(-1) = a - b \pmod{\langle 1 + i\rangle}$, hence $\equiv (a - b) \bmod 2 \pmod{\langle 1 + i\rangle}$. So the quotient is spanned by $\{\bar 0, \bar 1\}$ and has at most $2$ elements. Since $\bar 0 \neq \bar 1$ (else $1 \in \langle 1 + i\rangle$, impossible because the norm $N(1) = 1$ is not a multiple of $N(1 + i) = 2$), the quotient has exactly $2$ elements.

Hence $\mathbb{Z}[i]/\langle 1 + i\rangle \cong \mathbb{F}_2$. $\blacksquare$

---

## 22.6 The Correspondence Theorem for Rings

> **Theorem 22.16 (Correspondence / Lattice Isomorphism).** Let $I \trianglelefteq R$ and $\pi: R \to R/I$ the canonical projection. The map
> $$\{J \trianglelefteq R : I \subseteq J\} \;\longleftrightarrow\; \{\bar J \trianglelefteq R/I\}, \qquad J \mapsto J/I, \quad \bar J \mapsto \pi^{-1}(\bar J),$$
> is a bijection that preserves inclusions, sums, intersections, and the properties "prime" and "maximal."

The proof is structurally identical to the group-theoretic correspondence theorem (see [[18-isomorphism-theorems]]). The key point is that $\pi^{-1}$ of an ideal is an ideal containing $I$, and $\pi$ of an ideal containing $I$ is an ideal of the quotient; both operations are inverse to each other on the respective subsets.

**Example 19 (Ideals of $\mathbb{Z}/12\mathbb{Z}$).**

*Strategy.* Apply the Correspondence Theorem with $R = \mathbb{Z}$, $I = 12\mathbb{Z}$.

*Computation.* Ideals of $\mathbb{Z}$ containing $12\mathbb{Z}$ are $d\mathbb{Z}$ where $12\mathbb{Z} \subseteq d\mathbb{Z}$, i.e., $d \mid 12$. Divisors of $12$: $\{1, 2, 3, 4, 6, 12\}$.

Correspondingly, $\mathbb{Z}_{12}$ has six ideals:

| $d$ | Ideal in $\mathbb{Z}$ | Ideal in $\mathbb{Z}_{12}$ | Size |
|---|---|---|---|
| $1$ | $\mathbb{Z}$ | $\mathbb{Z}_{12}$ | $12$ |
| $2$ | $2\mathbb{Z}$ | $\{0,2,4,6,8,10\}$ | $6$ |
| $3$ | $3\mathbb{Z}$ | $\{0,3,6,9\}$ | $4$ |
| $4$ | $4\mathbb{Z}$ | $\{0,4,8\}$ | $3$ |
| $6$ | $6\mathbb{Z}$ | $\{0,6\}$ | $2$ |
| $12$ | $12\mathbb{Z}$ | $\{0\}$ | $1$ |

Six ideals, corresponding to the six divisors of $12$. ✓

---

## 22.7 Prime and Maximal Ideals

> **Definition 22.17 (Prime ideal).** A proper ideal $P \subsetneq R$ in a commutative ring $R$ is **prime** if for all $a, b \in R$,
> $$ab \in P \;\implies\; a \in P \;\text{ or }\; b \in P.$$

> **Definition 22.18 (Maximal ideal).** A proper ideal $M \subsetneq R$ is **maximal** if there is no ideal $J$ strictly between $M$ and $R$; equivalently, for every ideal $J$ with $M \subseteq J \subseteq R$, either $J = M$ or $J = R$.

*Why call $P$ "prime"?* In $\mathbb{Z}$, $\langle p\rangle$ is a prime ideal iff $p$ is a prime number: $ab \in \langle p\rangle$ means $p \mid ab$, and $p$ prime means $p \mid a$ or $p \mid b$, i.e., $a \in \langle p\rangle$ or $b \in \langle p\rangle$. So Definition 22.17 generalizes the usual definition of a prime.

### Characterization via quotient rings

The central theorem of this section translates ideal-theoretic properties of $I$ into ring-theoretic properties of $R/I$.

> **Theorem 22.19 (Quotient characterizations).** Let $R$ be a commutative ring with unity and $I \subsetneq R$ a proper ideal. Then:
>
> 1. $I$ is a **prime ideal** $\iff$ $R/I$ is an **integral domain**.
> 2. $I$ is a **maximal ideal** $\iff$ $R/I$ is a **field**.

**Proof of (1).**

First note $R/I$ is a commutative ring with unity $1 + I$ (by Theorem 22.14), and $1 + I \neq 0 + I$ because $1 \notin I$ (as $I$ is proper). So $R/I$ has at least two elements.

$R/I$ is an integral domain $\iff$ $R/I$ has no nonzero zero divisors $\iff$ for all $\bar a, \bar b \in R/I$,
$$\bar a \cdot \bar b = \bar 0 \implies \bar a = \bar 0 \text{ or } \bar b = \bar 0.$$

Translating to cosets: $\bar a \cdot \bar b = (a + I)(b + I) = ab + I$, so $\bar a \bar b = \bar 0$ iff $ab + I = 0 + I$ iff $ab \in I$. Similarly $\bar a = \bar 0$ iff $a \in I$, and $\bar b = \bar 0$ iff $b \in I$.

So the condition "$R/I$ is an integral domain" translates to: for all $a, b \in R$,
$$ab \in I \implies a \in I \text{ or } b \in I,$$
which is exactly the definition of $I$ being a prime ideal. ✓ $\blacksquare_{(1)}$

**Proof of (2).**

$R/I$ is a field $\iff$ every nonzero element of $R/I$ has a multiplicative inverse $\iff$ for every $a \in R$ with $a \notin I$, there exists $b \in R$ with $(a + I)(b + I) = 1 + I$, i.e., $ab - 1 \in I$, i.e., $ab \equiv 1 \pmod I$.

We rephrase this as a statement about ideals.

**Claim.** For $a \in R$ with $a \notin I$, the following are equivalent:
- (i) There exists $b \in R$ with $ab - 1 \in I$.
- (ii) $I + \langle a\rangle = R$.

*(i) $\Rightarrow$ (ii):* If $ab - 1 \in I$, then $1 = ab - (ab - 1) = (-1)(ab - 1) + ab \in I + \langle a\rangle$ (noting $ab \in \langle a\rangle$ and $-(ab - 1) \in I$). Hence $1 \in I + \langle a\rangle$, so $I + \langle a\rangle = R$ (by the Proposition 22.3 corollary).

*(ii) $\Rightarrow$ (i):* If $I + \langle a\rangle = R$, then in particular $1 \in I + \langle a\rangle$, so $1 = c + ab$ for some $c \in I, b \in R$. Hence $ab - 1 = -c \in I$.

So $R/I$ is a field $\iff$ for every $a \notin I$, $I + \langle a\rangle = R$.

**Now translate to maximality of $I$.**

$I$ is maximal $\iff$ the only ideals $J$ with $I \subseteq J \subseteq R$ are $J = I$ or $J = R$ $\iff$ for every $a \notin I$, the ideal $I + \langle a\rangle$ (which properly contains $I$, since $a \in I + \langle a\rangle$ and $a \notin I$) must equal $R$.

(Direction $\Rightarrow$: given maximality, $I + \langle a\rangle$ is an ideal strictly containing $I$, hence equals $R$.

Direction $\Leftarrow$: given the condition, suppose $I \subsetneq J \subseteq R$. Pick any $a \in J \setminus I$. Then $I + \langle a\rangle \subseteq J$ and $I + \langle a\rangle = R$ by assumption, so $J = R$.)

Combining the two equivalences:
$$R/I \text{ is a field} \iff \forall a \notin I,\; I + \langle a\rangle = R \iff I \text{ is maximal}. \qquad \blacksquare_{(2)}$$

### Prime vs. Maximal

> **Corollary 22.20 (Maximal implies prime).** In a commutative ring with unity, every maximal ideal is prime.

**Proof.** $I$ maximal $\Rightarrow$ $R/I$ is a field (Thm. 22.19(2)) $\Rightarrow$ $R/I$ is an integral domain (every field is an ID: the only way to have $xy = 0$ with $x \neq 0$ is $y = x^{-1} \cdot 0 = 0$) $\Rightarrow$ $I$ is prime (Thm. 22.19(1)). $\blacksquare$

**Converse fails in general.**

*Counterexample:* $\langle 0\rangle \subsetneq \mathbb{Z}$. The ideal $\{0\}$ is prime because $\mathbb{Z}/\{0\} = \mathbb{Z}$ is an integral domain; but it is not maximal, because $\{0\} \subsetneq 2\mathbb{Z} \subsetneq \mathbb{Z}$.

Another counterexample: $\langle x\rangle \subsetneq \mathbb{Z}[x]$. The quotient $\mathbb{Z}[x]/\langle x\rangle \cong \mathbb{Z}$ is an integral domain (Example 17), so $\langle x\rangle$ is prime. But $\mathbb{Z}$ is not a field, so $\langle x\rangle$ is not maximal: indeed $\langle x\rangle \subsetneq \langle 2, x\rangle \subsetneq \mathbb{Z}[x]$.

> **Corollary 22.21 (Finite case: prime = maximal).** If $R$ is a *finite* commutative ring with unity, then every prime ideal is maximal.

**Proof.** $R/P$ is a finite commutative ring with unity, and by primality of $P$, it has no zero divisors (Thm. 22.19(1)). A finite integral domain is a field ([[21-integral-domains]], Thm. 21.4: injective multiplication-by-$a$ on a finite set is surjective, so every nonzero element has an inverse). Hence $R/P$ is a field, so $P$ is maximal. $\blacksquare$

### Prime and maximal ideals of $\mathbb{Z}$

> **Theorem 22.22 (Prime / maximal ideals of $\mathbb{Z}$).**
> - The **prime ideals** of $\mathbb{Z}$ are $\{0\}$ and $\langle p\rangle$ for $p$ a prime number.
> - The **maximal ideals** of $\mathbb{Z}$ are $\langle p\rangle$ for $p$ a prime number.

**Proof.** Every ideal of $\mathbb{Z}$ is $\langle n\rangle = n\mathbb{Z}$ for some $n \ge 0$ (Thm. 22.7). We examine $R/I = \mathbb{Z}/\langle n\rangle = \mathbb{Z}_n$ (with $\mathbb{Z}_0 := \mathbb{Z}$).

*Case $n = 0$:* $\mathbb{Z}_0 = \mathbb{Z}$ is an integral domain but not a field. So $\langle 0\rangle$ is prime (Thm. 22.19(1)) but not maximal (Thm. 22.19(2)).

*Case $n = 1$:* $\langle 1\rangle = \mathbb{Z}$ is not proper, so not prime or maximal by definition.

*Case $n \ge 2$ composite, say $n = ab$ with $1 < a, b < n$:* In $\mathbb{Z}_n$, $\bar a \cdot \bar b = \bar{ab} = \bar n = \bar 0$, with $\bar a, \bar b \neq \bar 0$. So $\mathbb{Z}_n$ has zero divisors, hence is not an integral domain. So $\langle n\rangle$ is not prime, hence not maximal.

*Case $n = p$ prime:* $\mathbb{Z}_p$ is a field (standard result: for $0 < a < p$, $\gcd(a, p) = 1$, so by Bézout $\exists b : ab \equiv 1 \pmod p$; so $\bar a$ is a unit). Hence $\langle p\rangle$ is maximal, and by Cor. 22.20 also prime.

Summarizing: prime ideals are $\{0\} \cup \{\langle p\rangle : p \text{ prime}\}$; maximal ideals are $\{\langle p\rangle : p \text{ prime}\}$. $\blacksquare$

**Sanity check (dimension).** $\mathbb{Z}$ has "Krull dimension $1$" — its chain of prime ideals has length $1$:
$$\{0\} \subsetneq \langle p\rangle.$$
(No prime ideal strictly between.) This is consistent with $\mathbb{Z}$ being a PID that is not a field. For a field $F$, the only prime ideal is $\{0\}$ (Krull dimension $0$); for $\mathbb{Z}[x]$, chains like $\{0\} \subsetneq \langle x\rangle \subsetneq \langle 2, x\rangle$ give Krull dimension $2$.

---

## 22.8 Nilradical and Jacobson Radical (Preview)

Two further ideals measure "universal" prime- and maximal-ideal behavior:

- The **nilradical** $\operatorname{Nil}(R) = \bigcap_{P \text{ prime}} P$ equals the set of nilpotent elements:
  $$\operatorname{Nil}(R) = \{a \in R : a^n = 0 \text{ for some } n \ge 1\}.$$
  *Sketch of ($\subseteq$): if $a^n = 0$, then $a^n \in P$ for every prime $P$, so by primality $a \in P$. Sketch of ($\supseteq$): if $a$ is not nilpotent, one constructs a prime ideal not containing $a$ using Zorn's Lemma.*
- The **Jacobson radical** $J(R) = \bigcap_{M \text{ maximal}} M$ is always a (possibly zero) ideal; in a ring satisfying the descending chain condition it coincides with $\operatorname{Nil}(R)$.

For $R = \mathbb{Z}$: $\operatorname{Nil}(\mathbb{Z}) = \{0\}$ (since $\mathbb{Z}$ is an integral domain, no nonzero nilpotents) and $J(\mathbb{Z}) = \bigcap_{p \text{ prime}} p\mathbb{Z} = \{0\}$ (any nonzero $n$ has only finitely many prime factors, and misses some prime $p$).

For $R = \mathbb{Z}_{12}$: $\operatorname{Nil}(\mathbb{Z}_{12}) = \langle 6\rangle = \{0, 6\}$ (since $6^2 = 36 \equiv 0$); $J(\mathbb{Z}_{12}) = \langle 2\rangle \cap \langle 3\rangle = \langle 6\rangle$.

These radicals play central roles in commutative algebra and algebraic geometry (notably, $\operatorname{Nil}(R) = 0$ iff $\operatorname{Spec}(R)$ is *reduced*).

---

## 22.9 Practice Problems

**Problem 1.** Show that the set $I = \{2a + 4bi : a, b \in \mathbb{Z}\}$ is **not** an ideal of $\mathbb{Z}[i]$.

**Problem 2.** List all ideals of $\mathbb{Z}_{24}$.

**Problem 3.** Is $\langle 2, x\rangle$ a prime ideal of $\mathbb{Z}[x]$? A maximal ideal?

**Problem 4.** Show that $\langle x\rangle$ is a prime ideal of $\mathbb{Z}[x]$ but not maximal.

**Problem 5.** Compute $\mathbb{R}[x]/\langle x^2 - 1\rangle$.

**Problem 6.** Show that in a finite commutative ring with unity, every prime ideal is maximal.

**Problem 7.** Determine whether $\mathbb{Z}[x]/\langle x^2 + 1\rangle$ is an integral domain.

---

### Solutions

**Solution 1.** Determine whether $I = \{2a + 4bi : a, b \in \mathbb{Z}\}$ is an ideal of $\mathbb{Z}[i]$.

*Setup.* Elements of $I$ have real part in $2\mathbb{Z}$ and imaginary part in $4\mathbb{Z}$.

*Check: additive subgroup.*
- $0 = 2 \cdot 0 + 4 \cdot 0 \cdot i \in I$.
- $(2a_1 + 4b_1 i) - (2a_2 + 4b_2 i) = 2(a_1 - a_2) + 4(b_1 - b_2) i \in I$ (since $a_1 - a_2, b_1 - b_2 \in \mathbb{Z}$).

So $I$ is an additive subgroup. ✓

*Check: absorption.* Take the specific element $a = 2 \in I$ (with real-part integer $1$ and imaginary-part integer $0$, so $a = 2 \cdot 1 + 4 \cdot 0 \cdot i = 2$) and the specific ring element $r = i \in \mathbb{Z}[i]$. Compute:
$$r \cdot a = i \cdot 2 = 2i.$$

Question: is $2i \in I$? If so, $2i = 2\alpha + 4\beta i$ for some $\alpha, \beta \in \mathbb{Z}$, which forces $2\alpha = 0$ (real part) and $4\beta = 2$ (imaginary part). The first gives $\alpha = 0$; the second gives $\beta = 1/2 \notin \mathbb{Z}$. Contradiction.

Hence $2i \notin I$, so absorption fails: $I$ is not closed under multiplication by $i \in \mathbb{Z}[i]$.

*Conclusion.* $I$ is **not an ideal** of $\mathbb{Z}[i]$. $\blacksquare$

*Interpretation.* The set $I$ restricts the imaginary part more tightly ($4\mathbb{Z}$) than the real part ($2\mathbb{Z}$). Since multiplication by $i$ interchanges real and imaginary parts (up to sign), such asymmetry breaks absorption. An ideal must be symmetric under the ring's multiplication, which for $\mathbb{Z}[i]$ includes rotation by $i$.

*Sanity check — the fix.* The symmetric analog $I' = \{2a + 2bi : a, b \in \mathbb{Z}\} = 2 \mathbb{Z}[i] = \langle 2\rangle$ *is* an ideal of $\mathbb{Z}[i]$. Indeed $\mathbb{Z}[i]/\langle 2\rangle \cong \mathbb{F}_2[x]/\langle x^2 + 1\rangle = \mathbb{F}_2[x]/\langle (x+1)^2\rangle$, a ring with $4$ elements.

---

**Solution 2.** List all ideals of $\mathbb{Z}_{24}$.

*Setup.* By Correspondence Theorem (Thm. 22.16), ideals of $\mathbb{Z}_{24} = \mathbb{Z}/24\mathbb{Z}$ correspond bijectively to ideals $J \trianglelefteq \mathbb{Z}$ with $24\mathbb{Z} \subseteq J$.

*Strategy.* Use $\mathbb{Z}$ is a PID: $J = d\mathbb{Z}$ for some $d \ge 0$, and $24\mathbb{Z} \subseteq d\mathbb{Z}$ iff $d \mid 24$.

*Computation.* $24 = 2^3 \cdot 3$, so the positive divisors of $24$ are
$$\{1, 2, 3, 4, 6, 8, 12, 24\},$$
totaling $\tau(24) = (3+1)(1+1) = 8$ divisors.

Each divisor $d$ corresponds to an ideal $d\mathbb{Z}/24\mathbb{Z} \subseteq \mathbb{Z}_{24}$:

| $d$ | Ideal $(d\mathbb{Z})/(24\mathbb{Z})$ in $\mathbb{Z}_{24}$ | Size $24/d$ |
|---|---|---|
| $1$ | $\mathbb{Z}_{24} = \{0, 1, \ldots, 23\}$ | $24$ |
| $2$ | $\{0, 2, 4, \ldots, 22\}$ | $12$ |
| $3$ | $\{0, 3, 6, \ldots, 21\}$ | $8$ |
| $4$ | $\{0, 4, 8, \ldots, 20\}$ | $6$ |
| $6$ | $\{0, 6, 12, 18\}$ | $4$ |
| $8$ | $\{0, 8, 16\}$ | $3$ |
| $12$ | $\{0, 12\}$ | $2$ |
| $24$ | $\{0\}$ | $1$ |

*Verification.* Sum of ideal sizes $= 24 + 12 + 8 + 6 + 4 + 3 + 2 + 1 = 60$. This has no particular interpretation, but each size $24/d$ divides $24$ (by Lagrange in the additive group), which they all do. ✓

$\boxed{\mathbb{Z}_{24} \text{ has exactly } 8 \text{ ideals, corresponding to the divisors } 1, 2, 3, 4, 6, 8, 12, 24 \text{ of } 24.}$ $\blacksquare$

*Which are prime?* The prime divisors of $24$ are $2$ and $3$. Correspondingly, the prime ideals of $\mathbb{Z}_{24}$ are $\langle \bar 2\rangle$ and $\langle \bar 3\rangle$ (and are maximal, by Cor. 22.21, since $\mathbb{Z}_{24}$ is finite).

---

**Solution 3.** Is $\langle 2, x\rangle$ a prime ideal of $\mathbb{Z}[x]$? A maximal ideal?

*Setup.* We compute the quotient $\mathbb{Z}[x]/\langle 2, x\rangle$ and apply Thm. 22.19.

*Strategy.* Iterate quotients: first mod $2$, then mod $x$.

*Computation.*

*Stage 1: $\mathbb{Z}[x]/\langle 2\rangle$.*

The surjection $\pi_2: \mathbb{Z}[x] \to \mathbb{F}_2[x]$ (reduce coefficients mod $2$) has kernel $\langle 2\rangle$. By First Iso,
$$\mathbb{Z}[x]/\langle 2\rangle \cong \mathbb{F}_2[x].$$

*Stage 2: Apply Third Isomorphism Theorem.*

Let $I = \langle 2\rangle$, $J = \langle 2, x\rangle$. Then $I \subseteq J$. By the Third Iso Theorem for rings:
$$\mathbb{Z}[x]/J \;\cong\; (\mathbb{Z}[x]/I) / (J/I) \;\cong\; \mathbb{F}_2[x] / \bar J,$$
where $\bar J = J/I$ is the image of $J$ in $\mathbb{F}_2[x]$. Since $J = \langle 2, x\rangle$ and $2$ vanishes in $\mathbb{F}_2[x]$, we have $\bar J = \langle \bar x\rangle \subseteq \mathbb{F}_2[x]$, the ideal generated by $x$.

Hence
$$\mathbb{Z}[x]/\langle 2, x\rangle \;\cong\; \mathbb{F}_2[x]/\langle x\rangle.$$

*Stage 3: Compute $\mathbb{F}_2[x]/\langle x\rangle$.*

Evaluation at $0$: $\mathbb{F}_2[x] \to \mathbb{F}_2$, $p(x) \mapsto p(0)$, is surjective with kernel $\langle x\rangle$ (factor theorem). By First Iso,
$$\mathbb{F}_2[x]/\langle x\rangle \cong \mathbb{F}_2.$$

*Combine.* $\mathbb{Z}[x]/\langle 2, x\rangle \cong \mathbb{F}_2$, which is a field.

*Conclusion.* By Thm. 22.19(2), $\langle 2, x\rangle$ is a **maximal ideal** of $\mathbb{Z}[x]$. By Cor. 22.20, it is also **prime**. $\boxed{\text{Both prime and maximal.}} \blacksquare$

*Sanity check.* An explicit representative for the isomorphism: the coset $a_0 + a_1 x + \cdots + a_n x^n + \langle 2, x\rangle$ equals $\bar{a_0}$ in $\mathbb{F}_2$, where $\bar{a_0} \in \{0, 1\}$ is the parity of $a_0$. So the quotient sees only the constant-term mod $2$. ✓

*Interpretation.* $\langle 2, x\rangle$ consists of polynomials with even constant term (Example 13), which is exactly the kernel of the "constant term mod 2" map $\mathbb{Z}[x] \twoheadrightarrow \mathbb{F}_2$. The quotient is $\mathbb{F}_2$.

---

**Solution 4.** Show that $\langle x\rangle$ is a prime ideal of $\mathbb{Z}[x]$ but not maximal.

*Setup.* Compute $\mathbb{Z}[x]/\langle x\rangle$ and apply Thm. 22.19.

*Strategy.* Evaluation at $0$.

*Computation.*

Define $\varphi: \mathbb{Z}[x] \to \mathbb{Z}$ by $p(x) \mapsto p(0)$. As in Example 17:
- $\varphi$ is a surjective ring homomorphism.
- $\ker \varphi = \langle x\rangle$ (by factor theorem: $p(0) = 0 \iff x \mid p(x)$ in $\mathbb{Z}[x]$).

First Iso: $\mathbb{Z}[x]/\langle x\rangle \cong \mathbb{Z}$.

*Interpretation via Thm. 22.19.*
- $\mathbb{Z}$ is an **integral domain** (standard). Hence by Thm. 22.19(1), $\langle x\rangle$ is prime.
- $\mathbb{Z}$ is **not a field** (e.g., $2 \in \mathbb{Z}$ has no multiplicative inverse in $\mathbb{Z}$). Hence by Thm. 22.19(2), $\langle x\rangle$ is not maximal.

*Explicit chain showing non-maximality.*
$$\langle x\rangle \;\subsetneq\; \langle 2, x\rangle \;\subsetneq\; \mathbb{Z}[x].$$
The middle ideal $\langle 2, x\rangle$ is maximal (Solution 3), strictly contains $\langle x\rangle$ (since $2 \in \langle 2, x\rangle \setminus \langle x\rangle$: indeed $2$ is a nonzero constant, but $\langle x\rangle$ contains only polynomials with zero constant term), and is strictly contained in $\mathbb{Z}[x]$ (it is proper, not containing $1$).

$\boxed{\langle x\rangle \text{ is prime but not maximal in } \mathbb{Z}[x].} \blacksquare$

---

**Solution 5.** Compute $\mathbb{R}[x]/\langle x^2 - 1\rangle$.

*Setup.* $x^2 - 1$ factors over $\mathbb{R}$ as $(x - 1)(x + 1)$, a product of two distinct linear factors.

*Strategy.* Apply the **Chinese Remainder Theorem for rings**: if $R$ is a commutative ring with unity and $I, J$ are ideals with $I + J = R$ (coprime / comaximal), then
$$R/(I \cap J) \;\cong\; R/I \times R/J, \qquad \text{with } I \cap J = IJ \text{ under coprimality}.$$

*Verify coprimality of $\langle x - 1\rangle$ and $\langle x + 1\rangle$ in $\mathbb{R}[x]$.*

We exhibit $1 \in \langle x - 1\rangle + \langle x + 1\rangle$:
$$(x + 1) - (x - 1) = 2 \;\in\; \langle x - 1, x + 1\rangle.$$
Dividing by the invertible scalar $2$ (legal in $\mathbb{R}[x]$, since $2$ is a unit — $2 \neq 0$ and $2^{-1} = 1/2$):
$$1 = \tfrac{1}{2}((x + 1) - (x - 1)) = -\tfrac{1}{2}(x - 1) + \tfrac{1}{2}(x + 1) \in \langle x - 1\rangle + \langle x + 1\rangle.$$
So $\langle x - 1\rangle + \langle x + 1\rangle = \mathbb{R}[x]$: the ideals are coprime. ✓

*Verify $\langle x - 1\rangle \cdot \langle x + 1\rangle = \langle x^2 - 1\rangle$ (and equals $\langle x - 1\rangle \cap \langle x + 1\rangle$).*

Certainly $(x - 1)(x + 1) = x^2 - 1 \in \langle x - 1\rangle \cdot \langle x + 1\rangle$. Conversely, any generator of the product is of the form $a(x)(x - 1) \cdot b(x)(x + 1) = a(x)b(x)(x^2 - 1) \in \langle x^2 - 1\rangle$. So the product equals $\langle x^2 - 1\rangle$. Since the ideals are coprime, $\langle x - 1\rangle \cap \langle x + 1\rangle = \langle x - 1\rangle \cdot \langle x + 1\rangle = \langle x^2 - 1\rangle$.

*Apply CRT.*
$$\mathbb{R}[x]/\langle x^2 - 1\rangle \;\cong\; \mathbb{R}[x]/\langle x - 1\rangle \;\times\; \mathbb{R}[x]/\langle x + 1\rangle.$$

Now $\mathbb{R}[x]/\langle x - 1\rangle \cong \mathbb{R}$ via evaluation at $1$, and $\mathbb{R}[x]/\langle x + 1\rangle \cong \mathbb{R}$ via evaluation at $-1$. Hence
$$\mathbb{R}[x]/\langle x^2 - 1\rangle \;\cong\; \mathbb{R} \times \mathbb{R}.$$

*Verification.*
- *Dimension:* as $\mathbb{R}$-vector spaces, $\mathbb{R}[x]/\langle x^2 - 1\rangle$ has basis $\{\bar 1, \bar x\}$ (so dimension $2$); $\mathbb{R} \times \mathbb{R}$ has dimension $2$. ✓
- *Explicit isomorphism:* $p(x) + \langle x^2 - 1\rangle \mapsto (p(1), p(-1))$. Example: $\bar x = x + \langle x^2 - 1\rangle \mapsto (1, -1)$; $\bar x^2 = x^2 + \langle x^2 - 1\rangle \mapsto (1, 1)$, consistent with $\bar x^2 = \bar 1$ in the quotient (since $x^2 - 1 \equiv 0$, so $x^2 \equiv 1$). ✓
- *Zero divisors:* $\mathbb{R} \times \mathbb{R}$ has zero divisors $(1, 0) \cdot (0, 1) = (0, 0)$, so $\mathbb{R}[x]/\langle x^2 - 1\rangle$ is not an integral domain; consistent with $\langle x^2 - 1\rangle$ not being prime (since $(x - 1)(x + 1) = x^2 - 1 \in \langle x^2 - 1\rangle$ but neither $(x - 1)$ nor $(x + 1)$ is in $\langle x^2 - 1\rangle$).

$\boxed{\mathbb{R}[x]/\langle x^2 - 1\rangle \cong \mathbb{R} \times \mathbb{R}.} \blacksquare$

*Interpretation.* $\mathbb{R}[x]/\langle x^2 - 1\rangle$ consists of "functions on $\{1, -1\}$ with real values" — knowing $p(x)$ modulo $x^2 - 1$ is equivalent to knowing $p(1)$ and $p(-1)$. This is a baby case of the general principle "functions on a variety $= $ coordinate ring $ = $ polynomial ring modulo the ideal of the variety."

---

**Solution 6.** Show that in a finite commutative ring with unity, every prime ideal is maximal.

*Setup.* Let $R$ be a finite commutative ring with unity, and $P \trianglelefteq R$ a prime ideal. Goal: show $P$ is maximal.

*Strategy.* Use Thm. 22.19 to translate to a statement about $R/P$, then invoke "finite integral domain $\Rightarrow$ field."

*Computation.*

*Step 1.* By Thm. 22.19(1), $P$ prime $\iff$ $R/P$ is an integral domain.

*Step 2.* $R$ finite $\Rightarrow$ $R/P$ finite: the quotient map $\pi: R \twoheadrightarrow R/P$ is surjective, so $|R/P| \le |R| < \infty$.

*Step 3 (Key lemma — finite ID is field).* Let $D$ be a finite integral domain. For any $a \in D$ with $a \neq 0$, consider the multiplication-by-$a$ map
$$m_a: D \to D, \qquad m_a(x) = ax.$$

*Injective:* $m_a(x) = m_a(y)$ gives $ax = ay$, hence $a(x - y) = 0$. Since $D$ is an ID and $a \neq 0$, $x - y = 0$, so $x = y$. ✓

*Surjective:* an injective function from a finite set to itself is a bijection (pigeonhole). Hence $m_a$ is surjective. In particular, $\exists b \in D$ with $m_a(b) = 1$, i.e., $ab = 1$. So $a$ is a unit.

Every nonzero $a \in D$ is a unit $\Rightarrow$ $D$ is a field.

*Step 4.* Apply the lemma with $D = R/P$ (a finite integral domain by Steps 1–2): $R/P$ is a field.

*Step 5.* By Thm. 22.19(2), $R/P$ a field $\iff$ $P$ maximal.

*Conclusion.* $P$ is maximal. $\boxed{\text{Prime + Finite } R \implies \text{ Maximal.}} \blacksquare$

*Remark.* This is the key reason that in any finite commutative ring — e.g., $\mathbb{Z}_n$ — prime and maximal ideals coincide. In infinite rings like $\mathbb{Z}$ or $\mathbb{Z}[x]$, the two notions diverge, and this divergence is measured by the Krull dimension of the ring.

---

**Solution 7.** Determine whether $\mathbb{Z}[x]/\langle x^2 + 1\rangle$ is an integral domain.

*Setup.* Compute the quotient explicitly, then check for zero divisors.

*Strategy.* Find a surjection $\mathbb{Z}[x] \twoheadrightarrow \mathbb{Z}[i]$ with kernel $\langle x^2 + 1\rangle$, then identify the quotient.

*Computation.*

*Step 1: Define $\varphi: \mathbb{Z}[x] \to \mathbb{Z}[i]$ by $p(x) \mapsto p(i)$.*

This is an evaluation homomorphism (well-defined since $\mathbb{Z}[x]$ is "free" on $x$, so we can send $x \mapsto i$ and extend). It is a ring homomorphism.

*Step 2: Surjective.* Every $a + bi \in \mathbb{Z}[i]$ (with $a, b \in \mathbb{Z}$) equals $\varphi(a + bx)$.

*Step 3: Kernel.* We claim $\ker \varphi = \langle x^2 + 1\rangle$.

$(\supseteq)$ $\varphi(x^2 + 1) = i^2 + 1 = 0$, so $x^2 + 1 \in \ker\varphi$, and since $\ker\varphi$ is an ideal, $\langle x^2 + 1\rangle \subseteq \ker\varphi$.

$(\subseteq)$ Let $p(x) \in \mathbb{Z}[x]$ with $p(i) = 0$. By polynomial division in $\mathbb{Z}[x]$ with divisor $x^2 + 1$ (legal because $x^2 + 1$ is **monic**; so division works in $\mathbb{Z}[x]$ even though $\mathbb{Z}$ is not a field):
$$p(x) = (x^2 + 1) q(x) + r(x), \qquad r(x) \in \mathbb{Z}[x] \text{ with } \deg r < 2.$$

Write $r(x) = a + bx$ with $a, b \in \mathbb{Z}$. Evaluate at $i$:
$$0 = p(i) = (i^2 + 1) q(i) + r(i) = 0 + (a + bi) = a + bi.$$

So $a + bi = 0$ in $\mathbb{Z}[i]$, which (comparing real and imaginary parts) gives $a = 0$ and $b = 0$. Hence $r = 0$, so $p(x) = (x^2 + 1) q(x) \in \langle x^2 + 1\rangle$. ✓

*Step 4: First Iso.* $\mathbb{Z}[x]/\langle x^2 + 1\rangle \cong \mathbb{Z}[i]$.

*Step 5: $\mathbb{Z}[i]$ is an integral domain.*

$\mathbb{Z}[i] \subseteq \mathbb{C}$ is a subring of the field $\mathbb{C}$. Subrings of integral domains are integral domains (if $\alpha\beta = 0$ in $\mathbb{Z}[i]$ with $\alpha, \beta \in \mathbb{Z}[i] \subseteq \mathbb{C}$, then $\alpha = 0$ or $\beta = 0$ in $\mathbb{C}$, hence in $\mathbb{Z}[i]$).

More directly: the norm $N(\alpha) = \alpha \bar\alpha = a^2 + b^2$ for $\alpha = a + bi$ is multiplicative, so $N(\alpha\beta) = N(\alpha)N(\beta)$; if $\alpha\beta = 0$ then $N(\alpha)N(\beta) = 0$ in $\mathbb{Z}_{\ge 0}$, so one is $0$, hence $\alpha$ or $\beta$ is $0$.

*Conclusion.*
$$\boxed{\mathbb{Z}[x]/\langle x^2 + 1\rangle \cong \mathbb{Z}[i] \text{ is an integral domain.}} \blacksquare$$

*Is it a field?* No: $\mathbb{Z}[i]$ is not a field (e.g., $2$ has no inverse in $\mathbb{Z}[i]$ — its inverse in $\mathbb{Q}(i)$ is $1/2 \notin \mathbb{Z}[i]$). Hence $\langle x^2 + 1\rangle$ is prime but *not* maximal in $\mathbb{Z}[x]$. Compare with Example 16: over $\mathbb{R}$, $\langle x^2 + 1\rangle$ *is* maximal (quotient is $\mathbb{C}$, a field). The distinction: $\mathbb{R}$ is already a field, so $\mathbb{R}[x]$ has "enough" invertibility to make $\mathbb{R}[x]/\langle x^2 + 1\rangle$ a field, whereas $\mathbb{Z}$ has unit group $\{\pm 1\}$ only, producing just an integral domain in the quotient.

---

## Related Concepts

- [[19-rings-definition-and-examples]] — foundational ring theory (subrings, units, zero divisors).
- [[21-integral-domains]] — integral domains appear as $R/P$ for prime ideals $P$; finite IDs are fields.
- [[23-ring-homomorphisms]] — kernel of a ring homomorphism is an ideal; ideals are exactly the kernels of homomorphisms; First/Second/Third Isomorphism Theorems for rings.
- [[24-polynomial-rings]] — $F[x]$ is a PID; Euclidean algorithm; division algorithm; ideals of $F[x]$.
- [[26-fields-and-irreducibility]] — quotient of $F[x]$ by a maximal ideal is a field extension; irreducibility criterion; construction of finite fields as $\mathbb{F}_p[x]/\langle f\rangle$ for $f$ irreducible.
- [[18-isomorphism-theorems]] — group-theoretic analogues; the proofs here mirror the group case mutatis mutandis.

---

*Last updated: 2026-04-19*
