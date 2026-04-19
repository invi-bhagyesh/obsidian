---
title: "Polynomial Rings"
type: guide
co: CO4
related: [19-rings-definition-and-examples, 21-integral-domains, 22-ideals-and-quotient-rings, 26-fields-and-irreducibility]
---

# 24. Polynomial Rings

**Polynomial rings** $R[x]$ are the fundamental construction that extends a base ring with a new indeterminate, producing a new ring with rich structure. When the base is a field $\mathbb{F}$, the resulting $\mathbb{F}[x]$ is **Euclidean** — equipped with a division algorithm — which makes it a principal ideal domain (PID) and a unique factorization domain (UFD). This chapter develops $R[x]$, proves the division algorithm for $\mathbb{F}[x]$, establishes the root-factor correspondence, and counts roots.

The guiding slogan: **"$\mathbb{F}[x]$ behaves like $\mathbb{Z}$."** Both are Euclidean domains — both admit division with remainder, both are PIDs, both are UFDs, and both have a gcd/lcm theory that makes them extraordinarily tractable. Most theorems about integers port over to polynomials over a field with "size" replaced by "degree" and "$\mathbb{Z}^\times = \{\pm 1\}$" replaced by "$\mathbb{F}[x]^\times = \mathbb{F}^\times$."

## 24.1 Definition and Basic Structure

> **Definition 24.1.** Let $R$ be a (commutative) ring. The **polynomial ring in one variable** over $R$ is
> $$R[x] = \left\{ a_0 + a_1 x + a_2 x^2 + \cdots + a_n x^n : n \ge 0,\ a_i \in R \right\},$$
> where two polynomials are equal iff their coefficients match term-by-term, and operations are:
> $$\left(\sum a_i x^i\right) + \left(\sum b_i x^i\right) = \sum (a_i + b_i) x^i$$
> $$\left(\sum a_i x^i\right) \cdot \left(\sum b_j x^j\right) = \sum_k \left( \sum_{i + j = k} a_i b_j \right) x^k.$$

**Formal construction.** Rigorously, $R[x]$ is the set of sequences $(a_0, a_1, a_2, \ldots)$ in $R$ with only finitely many non-zero entries, equipped with pointwise addition and **convolution** multiplication $(a \cdot b)_k = \sum_{i + j = k} a_i b_j$. The symbol $x$ denotes the sequence $(0, 1, 0, 0, \ldots)$, and $x^n$ denotes the sequence with $1$ in position $n$ and $0$ elsewhere. The notation $\sum a_i x^i$ is then shorthand for $(a_0, a_1, a_2, \ldots)$. This construction makes "addition of polynomials" and "multiplication of polynomials" definitional rather than a convention.

> **Definition 24.2.** The **degree** of $p(x) = a_0 + a_1 x + \cdots + a_n x^n$ with $a_n \neq 0$ is $\deg p = n$. Convention: $\deg 0 = -\infty$. The **leading coefficient** is $a_n$. A polynomial is **monic** if its leading coefficient is $1$.

The convention $\deg 0 = -\infty$ makes the formulas $\deg(p + q) \le \max(\deg p, \deg q)$ and $\deg(pq) \le \deg p + \deg q$ uniformly valid (with the convention $-\infty + n = -\infty$, etc.).

### Basic properties

> **Proposition 24.3.** For $p, q \in R[x]$:
> 1. $\deg(p + q) \le \max(\deg p, \deg q)$.
> 2. $\deg(pq) \le \deg p + \deg q$, with equality if $R$ is an integral domain.

*Proof.*

**(1) Degree of a sum.** Write $p = \sum_{i=0}^{n} a_i x^i$ and $q = \sum_{i=0}^{m} b_i x^i$ with $n = \deg p, m = \deg q$. WLOG $n \ge m$; extend $q$ by zeros so both run from $0$ to $n$. Then $p + q = \sum_{i=0}^{n}(a_i + b_i) x^i$, which has degree at most $n = \max(n, m)$. Strict inequality is possible: if $n = m$ and $a_n + b_n = 0$, the leading terms cancel.

**(2) Degree of a product.** Write $p = \sum_{i=0}^n a_i x^i$ and $q = \sum_{j=0}^m b_j x^j$. The coefficient of $x^{n+m}$ in $pq$ is
$$(pq)_{n+m} = \sum_{i + j = n + m} a_i b_j.$$
Now $i \le n$ and $j \le m$, so $i + j = n + m$ forces $i = n$ and $j = m$. Hence the only contributing term is $a_n b_m$:
$$(pq)_{n+m} = a_n b_m.$$
Higher coefficients $(pq)_k$ for $k > n + m$ are empty sums, hence zero. So $\deg(pq) \le n + m$, with equality **iff** $a_n b_m \neq 0$.

If $R$ is an integral domain, $a_n \neq 0$ and $b_m \neq 0$ give $a_n b_m \neq 0$ (no zero divisors), so equality holds. Otherwise $a_n b_m$ may vanish: in $\mathbb{Z}_6[x]$, $(2x)(3x) = 6x^2 = 0$, so the leading terms vanish. $\blacksquare$

**Sanity check.** In $\mathbb{Q}[x]$: $\deg(x^2 + 1) + \deg(x - 3) = 2 + 1 = 3 = \deg((x^2+1)(x-3)) = \deg(x^3 - 3x^2 + x - 3)$. $\checkmark$

## 24.2 Integral Domain Property

> **Theorem 24.4.** If $R$ is an integral domain, so is $R[x]$.

*Proof.* We verify the axioms of an integral domain.

**Step 1: $R[x]$ is a commutative ring with unity.** Commutativity of multiplication is inherited from $R$: the coefficient of $x^k$ in $pq$ is $\sum_{i+j=k} a_i b_j$, and in $qp$ it is $\sum_{i+j=k} b_i a_j = \sum_{i+j=k} a_j b_i$, which equals the first sum by relabeling (commutativity of addition in $R$ and commutativity of multiplication $a_i b_j = b_j a_i$ in $R$). Associativity and distributivity follow similarly from $R$. The unity $1 \in R$ serves as unity of $R[x]$: $1 \cdot p = p \cdot 1 = p$ for all $p$. Non-triviality: $0 \neq 1$ in $R$, hence $0 \neq 1$ in $R[x]$.

**Step 2: $R[x]$ has no zero divisors.** Suppose $p(x) q(x) = 0$ in $R[x]$ with $p, q \in R[x]$, and suppose for contradiction that $p \neq 0$ and $q \neq 0$. Let $n = \deg p \ge 0$ and $m = \deg q \ge 0$, with leading coefficients $a_n \neq 0$ and $b_m \neq 0$.

By Proposition 24.3(2), the leading coefficient of $pq$ is $a_n b_m$. Since $R$ is an integral domain, $a_n \neq 0$ and $b_m \neq 0$ force $a_n b_m \neq 0$. Hence $pq$ has a non-zero coefficient of $x^{n+m}$, so $pq \neq 0$.

This contradicts $pq = 0$. Therefore $p = 0$ or $q = 0$. $\blacksquare$

**Corollary.** By induction on the number of variables, if $R$ is an integral domain, so is $R[x_1, x_2, \ldots, x_n]$.

**Counterexample when $R$ is not an ID.** In $\mathbb{Z}_4[x]$: $(2x)(2x) = 4x^2 = 0$, yet $2x \neq 0$. So $\mathbb{Z}_4[x]$ is not an integral domain, consistent with $\mathbb{Z}_4$ not being one ($2 \cdot 2 = 0$).

### Units in $R[x]$

> **Theorem 24.5.** If $R$ is an integral domain, $R[x]^\times = R^\times$. That is, the units of $R[x]$ are exactly the constant polynomials whose constant value is a unit in $R$.

*Proof.* We show both containments.

**($\supseteq$) Every unit of $R$ is a unit of $R[x]$.** If $u \in R^\times$, there exists $v \in R$ with $uv = 1$. Viewing $u, v$ as constant polynomials in $R[x]$, we have $u \cdot v = 1$ in $R[x]$, so $u \in R[x]^\times$.

**($\subseteq$) Every unit of $R[x]$ is a constant unit.** Suppose $p, q \in R[x]$ satisfy $p(x) q(x) = 1$. Apply the degree formula (Proposition 24.3(2), using that $R$ is an integral domain so equality holds):
$$\deg(pq) = \deg p + \deg q.$$
The LHS is $\deg(1) = 0$. Since $\deg p, \deg q \ge 0$ (both are non-zero, as $pq = 1 \neq 0$), the equation $\deg p + \deg q = 0$ with $\deg p, \deg q \ge 0$ forces
$$\deg p = \deg q = 0.$$
So both $p, q$ are constants, say $p = a, q = b \in R$. Then $p q = 1$ in $R[x]$ is $ab = 1$ in $R$, i.e., $a \in R^\times$. $\blacksquare$

**Example 1.** $\mathbb{Z}[x]^\times = \mathbb{Z}^\times = \{\pm 1\}$. $\mathbb{Q}[x]^\times = \mathbb{Q}^\times = \mathbb{Q} \setminus \{0\}$. $\mathbb{R}[x]^\times = \mathbb{R}^\times$. For any field $\mathbb{F}$, $\mathbb{F}[x]^\times = \mathbb{F}^\times$.

**Interpretation.** Over an integral domain, "units in $R[x]$ don't see $x$" — adding an indeterminate does not create new units, only preserves the old ones.

**Warning: the ID hypothesis is essential.** In rings with zero divisors, $R[x]$ may have more units because the degree formula only gives an upper bound. In $\mathbb{Z}_4[x]$:
$$(1 + 2x)(1 + 2x) = 1 + 4x + 4x^2 = 1 + 0 + 0 = 1,$$
so $1 + 2x$ is a unit of degree $1$! The leading coefficient $2$ is a zero divisor in $\mathbb{Z}_4$, which allows the "degree" of the product $(1+2x)^2$ to collapse.

*General fact (for commutative rings).* $p = a_0 + a_1 x + \cdots + a_n x^n \in R[x]$ is a unit iff $a_0 \in R^\times$ and $a_1, \ldots, a_n$ are **nilpotent** in $R$. In an integral domain the only nilpotent element is $0$, recovering Theorem 24.5.

## 24.3 Division Algorithm

The division algorithm is the structural heart of $\mathbb{F}[x]$. It is the analogue of "divide $a$ by $b$, get quotient and remainder" for integers, and it is what makes $\mathbb{F}[x]$ Euclidean.

> **Theorem 24.6 (Division Algorithm for $\mathbb{F}[x]$).** Let $\mathbb{F}$ be a field. For any $f(x), g(x) \in \mathbb{F}[x]$ with $g(x) \neq 0$, there exist **unique** $q(x), r(x) \in \mathbb{F}[x]$ such that
> $$f(x) = q(x) g(x) + r(x), \qquad r(x) = 0 \text{ or } \deg r < \deg g.$$

*Proof.*

### Existence.

We prove existence by **strong induction** on $\deg f$ (with the convention $\deg 0 = -\infty < \deg g$ handled as the base case).

**Base case: $f = 0$ or $\deg f < \deg g$.** Take $q = 0$ and $r = f$. Then $f = 0 \cdot g + f$, and $r = f$ satisfies either $r = 0$ or $\deg r < \deg g$. $\checkmark$

**Inductive step.** Fix $n \ge \deg g$ and assume the theorem holds for all polynomials of degree $< n$. Let $f$ have $\deg f = n$, and let $\deg g = m$ (so $n \ge m$). Write
$$f(x) = a_n x^n + \text{lower terms}, \qquad g(x) = b_m x^m + \text{lower terms},$$
with $a_n, b_m \in \mathbb{F}^\times$ (non-zero leading coefficients).

**Key step: kill the leading term of $f$.** Since $\mathbb{F}$ is a field, $b_m^{-1}$ exists in $\mathbb{F}$. Define
$$f_1(x) := f(x) - \underbrace{a_n b_m^{-1} x^{n - m}}_{\text{monomial}} \cdot g(x).$$

Compute the coefficient of $x^n$ in $f_1$: the term $a_n b_m^{-1} x^{n-m} \cdot g(x)$ contributes $a_n b_m^{-1} \cdot b_m = a_n$ at position $x^n$. So the $x^n$ coefficient of $f_1$ is $a_n - a_n = 0$. Hence
$$\deg f_1 < n.$$

(Note: $f_1$ could be zero, in which case we interpret $\deg f_1 = -\infty < n$. The induction covers this case via the base.)

**Apply the inductive hypothesis to $f_1$.** There exist $q_1, r \in \mathbb{F}[x]$ with
$$f_1(x) = q_1(x) g(x) + r(x), \qquad r = 0 \text{ or } \deg r < m.$$

Substitute back:
$$f(x) = a_n b_m^{-1} x^{n-m} g(x) + f_1(x) = a_n b_m^{-1} x^{n-m} g(x) + q_1(x) g(x) + r(x).$$
Set $q(x) := a_n b_m^{-1} x^{n-m} + q_1(x)$. Then
$$f(x) = q(x) g(x) + r(x),$$
with $r = 0$ or $\deg r < m = \deg g$. This completes the induction. $\checkmark_{\text{existence}}$

### Uniqueness.

Suppose $f = q g + r = q' g + r'$ with both $r, r' \in \{0\} \cup \{\deg < m\}$. Subtracting:
$$(q - q') g = r' - r.$$

**Case 1:** $q - q' = 0$. Then $q = q'$, and $r' - r = 0$, so $r = r'$. $\checkmark$

**Case 2:** $q - q' \neq 0$. Then the LHS has degree $\deg(q - q') + \deg g \ge 0 + m = m$ (using that $\mathbb{F}[x]$ is an integral domain so degrees add). So $\deg(\text{LHS}) \ge m$.

On the other hand, $\deg(r' - r) \le \max(\deg r, \deg r') < m$ (if $r' - r \neq 0$; else $= -\infty$). So $\deg(\text{RHS}) < m$.

A polynomial cannot simultaneously have degree $\ge m$ and degree $< m$. Contradiction. Hence Case 2 is impossible.

Therefore $q = q'$ and $r = r'$. $\blacksquare_{\text{uniqueness}} \blacksquare$

**Crucial requirement: $\mathbb{F}$ is a field.** The algorithm uses the quotient $a_n b_m^{-1}$, which requires $b_m$ to be invertible. Over a general ring, the inverse might not exist.

**Partial generalization.** Over any commutative ring $R$, if $g(x)$ is monic (leading coefficient $1$, which is always invertible), the division algorithm **works** and produces $q, r \in R[x]$. This is because we only need to divide by $b_m = 1$, which is trivial.

*Example.* In $\mathbb{Z}[x]$: we can divide $f(x)$ by $x - 2$ (monic) and get $q(x), r \in \mathbb{Z}[x]$. But we cannot divide by $2x - 1$ (leading coefficient $2$ is not invertible in $\mathbb{Z}$) without passing to $\mathbb{Q}[x]$.

### Euclidean Algorithm

The division algorithm gives the greatest common divisor (gcd) in $\mathbb{F}[x]$ via repeated division, exactly analogous to integers.

> **Algorithm.** Given $f, g \in \mathbb{F}[x]$, not both zero:
> 1. If $g = 0$: return $f$.
> 2. Divide: $f = qg + r$ with $r = 0$ or $\deg r < \deg g$.
> 3. Return $\gcd(g, r)$ recursively.

*Termination.* The degree of the second argument strictly decreases at each step: initially $\deg g$, then $\deg r < \deg g$, etc. After finitely many steps, the degree reaches $-\infty$ (i.e., the remainder is $0$), and we stop.

*Correctness.* $\gcd(f, g) = \gcd(g, r)$ because the set of common divisors of $(f, g)$ equals the set of common divisors of $(g, r)$ (from $f = qg + r$: any common divisor of $g$ and $r$ divides $f$; any common divisor of $f$ and $g$ divides $r = f - qg$).

*Bezout.* Back-substitution in the Euclidean algorithm produces $u, v \in \mathbb{F}[x]$ with $uf + vg = \gcd(f, g)$.

*Uniqueness up to units.* The gcd is unique only up to multiplication by a unit (i.e., a non-zero scalar). The **monic gcd** (i.e., the one with leading coefficient $1$) is the canonical choice.

## 24.4 $\mathbb{F}[x]$ is a PID

A **principal ideal domain (PID)** is an integral domain in which every ideal is principal — generated by a single element. This is a strong structural property: it means every ideal has a "shape" controlled by one polynomial.

> **Theorem 24.7.** If $\mathbb{F}$ is a field, then $\mathbb{F}[x]$ is a principal ideal domain.

*Proof.* Let $I \subseteq \mathbb{F}[x]$ be an ideal. We show $I$ is principal.

**Case 1: $I = \{0\}$.** Then $I = \langle 0 \rangle$, the principal ideal generated by $0$. $\checkmark$

**Case 2: $I \neq \{0\}$.** The set
$$D := \{\deg p : p \in I, p \neq 0\} \subseteq \mathbb{Z}_{\ge 0}$$
is non-empty (since $I$ has non-zero elements and their degrees are $\ge 0$). By the well-ordering principle on $\mathbb{Z}_{\ge 0}$, $D$ has a minimum. Pick $g \in I$ non-zero with $\deg g$ minimal.

We claim $I = \langle g \rangle$.

**$\langle g \rangle \subseteq I$: easy direction.** For any $h \in \mathbb{F}[x]$, $hg \in I$ by the absorption axiom of ideals. So $\langle g \rangle = \{hg : h \in \mathbb{F}[x]\} \subseteq I$.

**$I \subseteq \langle g \rangle$: the key direction.** Let $f \in I$ be arbitrary. Apply the division algorithm (Theorem 24.6):
$$f = qg + r, \qquad r = 0 \text{ or } \deg r < \deg g.$$
Rearrange: $r = f - qg$. Now $f \in I$ and $qg \in I$ (the latter by absorption, since $g \in I$ and $I$ is an ideal). Ideals are closed under subtraction, so
$$r = f - qg \in I.$$

Suppose for contradiction that $r \neq 0$. Then $\deg r < \deg g$, but $r \in I$ and $r \neq 0$, contradicting the minimality of $\deg g$ among non-zero elements of $I$.

Hence $r = 0$, which gives $f = qg \in \langle g \rangle$. So $I \subseteq \langle g \rangle$.

Combining, $I = \langle g \rangle$. $\blacksquare$

**Uniqueness of the generator.** The generator $g$ is unique up to multiplication by a unit of $\mathbb{F}[x]$, i.e., a non-zero scalar. The canonical choice is the **monic** generator (leading coefficient $1$), obtained by multiplying by $a_n^{-1}$ where $a_n$ is the leading coefficient.

**Interpretation.** Every ideal of $\mathbb{F}[x]$ is determined by the single polynomial of smallest degree it contains. Pictorially, $\mathbb{F}[x]$ is "one-dimensional" from the ideal perspective — each ideal is an "arithmetic progression" $\{gh : h \in \mathbb{F}[x]\}$.

**Contrast with $\mathbb{Z}[x]$ and $\mathbb{F}[x, y]$.** Neither of these is a PID. See Example 3 below and Problem 5.

**Corollary (PID $\Rightarrow$ UFD).** Every PID is a UFD. Hence $\mathbb{F}[x]$ is a UFD: every non-zero non-unit factors uniquely (up to order and units) into irreducibles. We revisit irreducibility in [[26-fields-and-irreducibility]].

## 24.5 Roots and Factor Theorem

> **Theorem 24.8 (Factor Theorem).** Let $\mathbb{F}$ be a field, $p(x) \in \mathbb{F}[x]$, and $a \in \mathbb{F}$. Then
> $$(x - a) \mid p(x) \quad \iff \quad p(a) = 0.$$

*Proof.*

**Step 1: Apply the division algorithm with divisor $x - a$.**

Since $x - a \neq 0$ (it has degree $1$), Theorem 24.6 yields unique $q(x), r(x) \in \mathbb{F}[x]$ with
$$p(x) = (x - a) q(x) + r(x), \qquad r = 0 \text{ or } \deg r < \deg(x - a) = 1.$$

So $r(x)$ is either the zero polynomial or a non-zero polynomial of degree $0$. In either case, $r$ is a constant — an element of $\mathbb{F}$. Write $r = r_0 \in \mathbb{F}$.

**Step 2: Evaluate at $x = a$.**

Since evaluation at $a$ is a ring homomorphism $\mathbb{F}[x] \to \mathbb{F}$ (see [[23-ring-homomorphisms]], Example 4), it preserves $+$ and $\cdot$:
$$p(a) = (a - a) q(a) + r_0 = 0 \cdot q(a) + r_0 = r_0.$$

So $r_0 = p(a)$, and the division becomes
$$p(x) = (x - a) q(x) + p(a).$$

**Step 3: Conclude.**

$(x - a) \mid p(x)$ means there exists $Q(x) \in \mathbb{F}[x]$ with $p(x) = (x - a) Q(x)$. By uniqueness of division (Theorem 24.6), $Q = q$ and $r_0 = 0$, i.e., $p(a) = 0$. Conversely, if $p(a) = 0$, then $r_0 = 0$, so $p(x) = (x - a) q(x)$, meaning $(x - a) \mid p(x)$.

$\boxed{(x - a) \mid p(x) \iff p(a) = 0.}$ $\blacksquare$

> **Corollary 24.8a (Remainder Theorem).** For $p(x) \in \mathbb{F}[x]$ and $a \in \mathbb{F}$, the remainder of dividing $p(x)$ by $x - a$ is $p(a)$.

This is a direct byproduct of the proof above: $r_0 = p(a)$.

### Number of roots

> **Corollary 24.9.** Let $D$ be an integral domain, $p(x) \in D[x]$ non-zero with $\deg p = n$. Then $p$ has at most $n$ roots in $D$.

*Proof.* We use **strong induction on $n = \deg p$**.

**Base case: $n = 0$.** Then $p(x) = c$ is a non-zero constant. $p(a) = c \neq 0$ for every $a \in D$, so $p$ has $0$ roots, and $0 \le 0 = n$. $\checkmark$

**Inductive step: $n \ge 1$.** Assume the result holds for all non-zero polynomials of degree $< n$ over $D$. Let $p \in D[x]$ with $\deg p = n$.

**Case A: $p$ has no roots in $D$.** Then $p$ has $0$ roots, and $0 \le n$. $\checkmark$

**Case B: $p$ has at least one root $a \in D$.** By the Factor Theorem (which holds over any commutative ring when the divisor is monic: $x - a$ is monic, so we can divide),
$$p(x) = (x - a) q(x),$$
for some $q(x) \in D[x]$. Comparing degrees (using $D$ is an ID so degrees add):
$$n = \deg p = \deg(x - a) + \deg q = 1 + \deg q,$$
so $\deg q = n - 1$. Also $q \neq 0$ since $p \neq 0$.

**Key step: count roots of $p$ via roots of $q$.** For any $b \in D$,
$$p(b) = (b - a) q(b).$$
Since $D$ is an integral domain (no zero divisors),
$$p(b) = 0 \iff b - a = 0 \text{ or } q(b) = 0 \iff b = a \text{ or } b \text{ is a root of } q.$$

Hence the set of roots of $p$ is contained in $\{a\} \cup \{\text{roots of } q\}$. By the inductive hypothesis, $q$ has at most $n - 1$ roots. Therefore
$$|\{\text{roots of } p\}| \le 1 + (n - 1) = n.$$

This completes the induction. $\blacksquare$

**Why the ID hypothesis is essential.** The step "$p(b) = (b - a) q(b) = 0$ implies $b - a = 0$ or $q(b) = 0$" uses the absence of zero divisors. Without it, roots can "multiply" beyond the degree bound.

**Counterexample over a non-ID.** In $\mathbb{Z}_8$: the polynomial $p(x) = x^2 - 1$ has degree $2$, but its roots in $\mathbb{Z}_8$ are
$$1^2 = 1, \quad 3^2 = 9 \equiv 1, \quad 5^2 = 25 \equiv 1, \quad 7^2 = 49 \equiv 1.$$
So $p$ has **four** roots: $\{1, 3, 5, 7\} \subset \mathbb{Z}_8$. The polynomial factors as
$$x^2 - 1 = (x - 1)(x + 1) = (x - 3)(x + 3) \cdot (\text{unit correction})$$
— multiple factorizations are possible, consistent with $\mathbb{Z}_8$ being non-UFD and having zero divisors.

**Sharp bound.** The bound $n$ is **sharp**: the polynomial $(x - a_1)(x - a_2) \cdots (x - a_n)$ over an ID has exactly $n$ roots $\{a_1, \ldots, a_n\}$ (assuming they are distinct).

### Corollary: Polynomial identity from sufficiently many values

> **Corollary 24.9a.** Let $D$ be an integral domain. If $p(x) \in D[x]$ has degree $\le n$ and agrees with $0$ at $n + 1$ distinct points of $D$, then $p = 0$.

*Proof.* If $p \neq 0$, then $\deg p \le n$ and $p$ has $\ge n + 1$ roots, contradicting Corollary 24.9. $\blacksquare$

**Corollary.** Two polynomials of degree $\le n$ over an infinite integral domain that agree on infinitely many points are equal. This justifies "polynomial identities" like $(x+y)^2 = x^2 + 2xy + y^2$ holding as an equation of polynomials once we verify it for enough values.

## 24.6 Evaluation and the Substitution Principle

> **Definition 24.10.** For a commutative ring $R$ and $a \in R$, the **evaluation homomorphism at $a$** is
> $$\operatorname{ev}_a: R[x] \to R, \qquad p(x) \mapsto p(a).$$

This is a ring homomorphism (see [[23-ring-homomorphisms]], Example 4). Its structure:

- **Surjective:** $\operatorname{ev}_a(r) = r$ for any constant $r \in R$.
- **Kernel:** $\ker(\operatorname{ev}_a) = \langle x - a \rangle$ (all polynomials having $a$ as a root, which by the factor theorem equals the multiples of $x - a$).

By the First Isomorphism Theorem for rings,
$$R[x] / \langle x - a \rangle \cong R.$$

*Interpretation.* Quotienting $R[x]$ by $\langle x - a \rangle$ forces $x \equiv a$, collapsing the polynomial ring to the base ring $R$.

**Universal property.** For any commutative ring $R$, any ring $S \supseteq R$, and any $s \in S$, there is a **unique** ring homomorphism $R[x] \to S$ extending the inclusion $R \hookrightarrow S$ and sending $x \mapsto s$. This is the **substitution principle**: $R[x]$ is the free commutative $R$-algebra on one generator.

## 24.7 Polynomial Rings in Several Variables

> **Definition 24.11.** $R[x_1, x_2, \ldots, x_n]$ is the iterated construction:
> $$R[x_1, \ldots, x_n] := (R[x_1, \ldots, x_{n-1}])[x_n].$$
> Elements are polynomials in $n$ commuting variables.

**Example 2.** $\mathbb{R}[x, y]$ contains $p(x, y) = x^2 + 3xy - y^2$, viewed either as a polynomial in $y$ with coefficients in $\mathbb{R}[x]$:
$$p = -y^2 + (3x) y + x^2 \in \mathbb{R}[x][y],$$
or as a polynomial in $x$ with coefficients in $\mathbb{R}[y]$:
$$p = x^2 + (3y) x + (-y^2) \in \mathbb{R}[y][x].$$
Both viewpoints yield the same element of $\mathbb{R}[x, y]$.

**Structural inheritance.** If $R$ is an integral domain, so is $R[x_1, \ldots, x_n]$ (induction on $n$ using Theorem 24.4). If $\mathbb{F}$ is a field, $\mathbb{F}[x_1, \ldots, x_n]$ is a **UFD** (Gauss's lemma + induction) but **not** a PID for $n \ge 2$.

**Example 3.** In $\mathbb{F}[x, y]$, the ideal $\langle x, y \rangle = \{x \cdot p + y \cdot q : p, q \in \mathbb{F}[x, y]\}$ is **not principal**.

*Proof.* Suppose for contradiction $\langle x, y \rangle = \langle f \rangle$ for some $f \in \mathbb{F}[x, y]$. Then $f \mid x$ and $f \mid y$.

$f \mid x$: since $\mathbb{F}[x, y] = \mathbb{F}[y][x]$, viewing $x$ as a polynomial of degree $1$ in $\mathbb{F}[y][x]$, divisors of $x$ have degree $0$ or $1$. A degree-$1$ divisor would be $ax + b$ with $a \in \mathbb{F}[y]^\times = \mathbb{F}^\times$ and $b \in \mathbb{F}[y]$, so $ax + b = x$ forces $b = 0$, hence $f = ax$ with $a$ a unit. Then $f \mid y$ gives $ax \mid y$, impossible (the RHS has no $x$-dependence, yet LHS has $x$-degree $1$). So $f$ has $x$-degree $0$, i.e., $f \in \mathbb{F}[y]$.

Similarly $f \mid y$ forces $f \in \mathbb{F}$ (a constant).

Hence $f \in \mathbb{F}$. If $f = 0$, $\langle f \rangle = \{0\} \not\ni x$. So $f \in \mathbb{F}^\times$, a unit, giving $\langle f \rangle = \mathbb{F}[x, y]$.

But $1 \notin \langle x, y \rangle$: every element of $\langle x, y \rangle$ has $0$ as its constant term (substituting $x = y = 0$ gives $0$), while $1$ has constant term $1$.

Contradiction. So $\langle x, y \rangle$ is not principal. $\blacksquare$

**Consequence.** $\mathbb{F}[x, y]$ is not a PID.

## 24.8 Monic Polynomials and Leading-Coefficient Arithmetic

Monic polynomials enjoy special closure and arithmetic properties.

**Proposition 24.12.**
1. The product of monic polynomials is monic.
2. In any commutative ring $R$, for any $f \in R[x]$ and any monic $g \in R[x]$, the division algorithm produces $q, r \in R[x]$ (not just in $\operatorname{Frac}(R)[x]$).

*Proof.*

**(1).** Let $p, q \in R[x]$ be monic with $\deg p = n$ and $\deg q = m$. Leading coefficient of $pq$ is (leading of $p$) $\cdot$ (leading of $q$) $= 1 \cdot 1 = 1$. So $pq$ is monic with $\deg pq = n + m$. $\checkmark$

**(2).** Re-examine the proof of Theorem 24.6: the only division step is $a_n b_m^{-1}$, where $b_m$ is the leading coefficient of $g$. If $g$ is monic, $b_m = 1$, so $b_m^{-1} = 1 \in R$, and the entire argument runs within $R[x]$ without needing $R$ to be a field. $\checkmark$ $\blacksquare$

**Example 4.** In $\mathbb{Z}[x]$: divide $f(x) = x^3 + 2x^2 + x + 1$ by the monic divisor $g(x) = x - 2$.

*Setup.* $\deg f = 3$, $\deg g = 1$, so we expect $\deg q = 2$ and $r$ a constant.

*Computation (synthetic division / polynomial long division).*

Step 1: $\dfrac{x^3}{x} = x^2$. Multiply: $x^2 (x - 2) = x^3 - 2x^2$. Subtract:
$$x^3 + 2x^2 + x + 1 - (x^3 - 2x^2) = 4x^2 + x + 1.$$

Step 2: $\dfrac{4x^2}{x} = 4x$. Multiply: $4x(x - 2) = 4x^2 - 8x$. Subtract:
$$4x^2 + x + 1 - (4x^2 - 8x) = 9x + 1.$$

Step 3: $\dfrac{9x}{x} = 9$. Multiply: $9(x - 2) = 9x - 18$. Subtract:
$$9x + 1 - (9x - 18) = 19.$$

Step 4: $\deg 19 = 0 < 1 = \deg g$, so we stop.

*Result.* $q(x) = x^2 + 4x + 9$ and $r = 19$:
$$x^3 + 2x^2 + x + 1 = (x - 2)(x^2 + 4x + 9) + 19.$$

*Verification via the Remainder Theorem.* By Corollary 24.8a, the remainder should equal $f(2)$:
$$f(2) = 2^3 + 2 \cdot 2^2 + 2 + 1 = 8 + 8 + 2 + 1 = 19. \checkmark$$

*Interpretation.* All coefficients stay in $\mathbb{Z}$ throughout, because $g$ is monic. If we had divided by $2x - 4$ (same zero but not monic), we would have needed $\mathbb{Q}$-coefficients.

## 24.9 Derivatives (Formal)

> **Definition 24.13.** For $p(x) = \sum_{i=0}^{n} a_i x^i \in R[x]$, the **formal derivative** is
> $$p'(x) := \sum_{i=1}^{n} i \cdot a_i x^{i-1}.$$

Here $i \cdot a_i$ means $a_i + a_i + \cdots + a_i$ ($i$ times), i.e., repeated addition in $R$ — **no limit, no topology**. This is a purely algebraic operation that makes sense over any ring, not just $\mathbb{R}$ or $\mathbb{C}$.

**Basic rules.** For $p, q \in R[x]$:
1. **Linearity:** $(p + q)' = p' + q'$ and $(c p)' = c p'$ for $c \in R$.
2. **Leibniz (product) rule:** $(pq)' = p' q + p q'$.
3. **Chain rule (for polynomials):** $p(q(x))' = p'(q(x)) \cdot q'(x)$.

All three are verified by the same argument as in calculus but working with polynomial coefficients directly.

> **Theorem 24.14.** Over a field $\mathbb{F}$, a polynomial $p(x) \in \mathbb{F}[x]$ has a **multiple root** (i.e., a root $a \in \bar{\mathbb{F}}$ with $(x - a)^2 \mid p$ in $\bar{\mathbb{F}}[x]$) iff $\gcd(p, p') \neq 1$ in $\mathbb{F}[x]$.

*Sketch.* If $p = (x - a)^2 h$, then $p' = 2(x - a) h + (x - a)^2 h'$, and $(x - a) \mid \gcd(p, p')$. Conversely, if $\gcd(p, p')$ has a root $a$, then $a$ is a root of both $p$ and $p'$, which forces multiplicity $\ge 2$.

*Application (separability test).* A polynomial is **separable** (no repeated roots in $\bar{\mathbb{F}}$) iff $\gcd(p, p') = 1$. This is decidable via the Euclidean algorithm without ever computing roots explicitly!

*Example.* $p(x) = x^3 - 3x + 2 = (x - 1)^2 (x + 2) \in \mathbb{Q}[x]$. Then $p'(x) = 3x^2 - 3 = 3(x-1)(x+1)$. $\gcd(p, p') = x - 1 \neq 1$. So $p$ has a multiple root (namely $x = 1$). $\checkmark$

## 24.10 Irreducibility — Preview

A polynomial $p(x) \in \mathbb{F}[x]$ is **irreducible** if $\deg p \ge 1$ and $p$ cannot be written as a product of two polynomials of strictly smaller positive degree.

- Over $\mathbb{C}$: only linear polynomials are irreducible (Fundamental Theorem of Algebra).
- Over $\mathbb{R}$: linear polynomials and irreducible quadratics ($ax^2 + bx + c$ with discriminant $< 0$).
- Over $\mathbb{Q}$: much richer — see [[26-fields-and-irreducibility]].

**Rational root theorem (preview).** Let $p(x) = a_n x^n + \cdots + a_0 \in \mathbb{Z}[x]$ with $a_n, a_0 \neq 0$. If $p$ has a rational root $\dfrac{r}{s}$ in lowest terms (i.e., $\gcd(r, s) = 1$), then $r \mid a_0$ and $s \mid a_n$.

*Proof.* Substitute: $a_n (r/s)^n + \cdots + a_0 = 0$. Multiply by $s^n$:
$$a_n r^n + a_{n-1} r^{n-1} s + \cdots + a_1 r s^{n-1} + a_0 s^n = 0.$$

Rearrange: $a_n r^n = -s(a_{n-1} r^{n-1} + \cdots + a_0 s^{n-1})$, so $s \mid a_n r^n$. Since $\gcd(r, s) = 1$, $\gcd(r^n, s) = 1$, so $s \mid a_n$.

Similarly, $a_0 s^n = -r(a_n r^{n-1} + \cdots + a_1 s^{n-1})$, so $r \mid a_0 s^n$. Since $\gcd(r, s) = 1$, $r \mid a_0$. $\blacksquare$

**Application.** To test whether a polynomial in $\mathbb{Z}[x]$ with small $a_n$ and $a_0$ is irreducible over $\mathbb{Q}$, list the finite set of candidate rational roots and check each.

## 24.11 Practice Problems

**Problem 1.** Compute the quotient and remainder of $x^4 - 2x^2 + 1$ divided by $x^2 + 1$ in $\mathbb{Q}[x]$.

**Problem 2.** Show that $x^2 + 1$ is irreducible in $\mathbb{R}[x]$ but reducible in $\mathbb{C}[x]$.

**Problem 3.** Find all roots of $x^2 - 1$ in $\mathbb{Z}_8$.

**Problem 4.** Compute $\gcd(x^4 - 1, x^2 + x)$ in $\mathbb{Q}[x]$.

**Problem 5.** Show that $\mathbb{Z}[x]$ is not a PID by exhibiting a non-principal ideal.

**Problem 6.** Let $p \in \mathbb{F}[x]$ with $\deg p = 3$. Show $p$ is reducible iff $p$ has a root in $\mathbb{F}$.

**Problem 7.** Show that $x^3 - 2$ is irreducible in $\mathbb{Q}[x]$.

### Solutions

---

**Solution 1.** Compute the quotient and remainder of $f(x) = x^4 - 2x^2 + 1$ divided by $g(x) = x^2 + 1$ in $\mathbb{Q}[x]$.

*Setup.* $\deg f = 4$, $\deg g = 2$, so by the division algorithm we expect $\deg q = 2$ and $\deg r < 2$ (or $r = 0$). Since $g$ is monic, we can work directly in $\mathbb{Q}[x]$ (or indeed $\mathbb{Z}[x]$, as coefficients will be integers).

*Strategy.* Polynomial long division.

*Computation.*

**Step 1.** Leading term of $f$ is $x^4$; leading term of $g$ is $x^2$. Quotient's leading term: $x^4/x^2 = x^2$.

Multiply: $x^2 \cdot (x^2 + 1) = x^4 + x^2$. Subtract:
$$f - x^2 g = (x^4 - 2x^2 + 1) - (x^4 + x^2) = -3x^2 + 1.$$

**Step 2.** The current partial remainder is $-3x^2 + 1$, with degree $2 = \deg g$, so we continue. Leading term: $-3x^2$. Quotient term: $-3x^2 / x^2 = -3$.

Multiply: $-3 \cdot (x^2 + 1) = -3x^2 - 3$. Subtract:
$$(-3x^2 + 1) - (-3x^2 - 3) = 4.$$

**Step 3.** Remainder is $4$, degree $0 < 2 = \deg g$. Stop.

*Result.* $q(x) = x^2 - 3$ and $r(x) = 4$:
$$x^4 - 2x^2 + 1 = (x^2 + 1)(x^2 - 3) + 4.$$

*Verification.* Expand $(x^2 + 1)(x^2 - 3) + 4$:
$$(x^2 + 1)(x^2 - 3) = x^4 - 3x^2 + x^2 - 3 = x^4 - 2x^2 - 3.$$
Adding $4$:
$$x^4 - 2x^2 - 3 + 4 = x^4 - 2x^2 + 1. \checkmark$$

*Interpretation.* The remainder $4$ is non-zero, so $(x^2 + 1) \nmid (x^4 - 2x^2 + 1)$. Equivalently: although $x^4 - 2x^2 + 1 = (x^2 - 1)^2 = (x-1)^2(x+1)^2$ factors nicely over $\mathbb{Q}$, it has no root at $\pm i$ — since $(\pm i)^2 = -1$ gives $(x^2 - 1)^2|_{x = i} = (-1 - 1)^2 = 4 \neq 0$.

$$\boxed{q(x) = x^2 - 3, \quad r(x) = 4.} \blacksquare$$

---

**Solution 2.** Show that $x^2 + 1$ is irreducible in $\mathbb{R}[x]$ but reducible in $\mathbb{C}[x]$.

**Part (a): Irreducibility over $\mathbb{R}$.**

*Strategy.* A degree-$2$ polynomial is reducible over a field iff it factors into two linear factors, iff it has a root in the field (Problem 6 for degree $2$; also by direct inspection).

Suppose for contradiction $x^2 + 1 = (x - \alpha)(x - \beta)$ in $\mathbb{R}[x]$ with $\alpha, \beta \in \mathbb{R}$. Expand:
$$(x - \alpha)(x - \beta) = x^2 - (\alpha + \beta) x + \alpha \beta.$$

Matching coefficients with $x^2 + 0 \cdot x + 1$:
$$\alpha + \beta = 0, \quad \alpha \beta = 1.$$

From the first equation, $\beta = -\alpha$. Substitute: $\alpha \cdot (-\alpha) = -\alpha^2 = 1$, so $\alpha^2 = -1$. But $\alpha^2 \ge 0$ for all $\alpha \in \mathbb{R}$, so $\alpha^2 = -1$ has no real solution. Contradiction.

Alternatively (discriminant): $x^2 + 1$ has discriminant $0^2 - 4 \cdot 1 \cdot 1 = -4 < 0$, so no real roots, hence irreducible over $\mathbb{R}$.

$\therefore$ $x^2 + 1$ is irreducible in $\mathbb{R}[x]$. $\checkmark$

**Part (b): Reducibility over $\mathbb{C}$.**

In $\mathbb{C}$, let $i \in \mathbb{C}$ with $i^2 = -1$. Then $i^2 + 1 = 0$ and $(-i)^2 + 1 = -1 + 1 = 0$, so $\pm i$ are roots. By the Factor Theorem:
$$x^2 + 1 = (x - i)(x + i).$$

*Verification.* $(x - i)(x + i) = x^2 - i^2 = x^2 - (-1) = x^2 + 1$. $\checkmark$

Both factors have degree $1 \ge 1$, so $x^2 + 1$ is reducible in $\mathbb{C}[x]$.

*Interpretation.* The field matters. Over $\mathbb{R}$, $x^2 + 1 = 0$ has no solution (the "obstruction" is the negative discriminant). Passing to $\mathbb{C}$ introduces $i$, which unlocks the factorization. More generally, $\mathbb{C}$ is **algebraically closed** (every non-constant polynomial has a root), so the only irreducibles in $\mathbb{C}[x]$ are linear polynomials — Fundamental Theorem of Algebra. $\blacksquare$

---

**Solution 3.** Find all roots of $x^2 - 1$ in $\mathbb{Z}_8$.

*Setup.* We want $a \in \mathbb{Z}_8 = \{0, 1, 2, 3, 4, 5, 6, 7\}$ with $a^2 \equiv 1 \pmod 8$.

*Strategy.* Exhaustive check (the ring is finite).

*Computation.*

| $a$ | $a^2$ | $a^2 \bmod 8$ | Root? |
|---|---|---|---|
| $0$ | $0$ | $0$ | No |
| $1$ | $1$ | $1$ | **Yes** |
| $2$ | $4$ | $4$ | No |
| $3$ | $9$ | $1$ | **Yes** |
| $4$ | $16$ | $0$ | No |
| $5$ | $25$ | $1$ | **Yes** |
| $6$ | $36$ | $4$ | No |
| $7$ | $49$ | $1$ | **Yes** |

*Result.* The roots are $\{1, 3, 5, 7\}$ — the four units $\mathbb{Z}_8^\times$.

*Verification / pattern.* The roots of $x^2 - 1$ in $\mathbb{Z}_n$ are precisely the elements of order dividing $2$ in the unit group $\mathbb{Z}_n^\times$. For $n = 8$: $\mathbb{Z}_8^\times = \{1, 3, 5, 7\} \cong \mathbb{Z}_2 \times \mathbb{Z}_2$ (Klein four-group), so every non-identity element has order $2$. All four units are roots.

*Interpretation.* A degree-$2$ polynomial with $4$ roots — this is the concrete demonstration that Corollary 24.9 **fails** over rings with zero divisors. $\mathbb{Z}_8$ has zero divisors ($2, 4, 6$), which enables the factorization
$$x^2 - 1 = (x - 1)(x + 1) = (x - 1)(x - 7) \text{ in } \mathbb{Z}_8[x],$$
but also
$$(x - 3)(x - 5) = x^2 - 8x + 15 \equiv x^2 + 7 \equiv x^2 - 1 \pmod 8.$$
Two different factorizations as a product of linear polynomials!

$$\boxed{\text{Roots: } \{1, 3, 5, 7\} \subset \mathbb{Z}_8. \text{ Four roots of a degree-}2 \text{ polynomial.}} \blacksquare$$

---

**Solution 4.** Compute $\gcd(x^4 - 1, x^2 + x)$ in $\mathbb{Q}[x]$.

*Setup.* We apply the Euclidean algorithm for polynomials. The gcd in $\mathbb{Q}[x]$ is defined up to a unit (non-zero scalar); we will produce the monic gcd.

*Strategy.* Repeated division until remainder is $0$.

*Computation.*

**Step 1.** Divide $f_1 := x^4 - 1$ by $f_2 := x^2 + x$.

Leading ratio: $x^4 / x^2 = x^2$. Multiply: $x^2(x^2 + x) = x^4 + x^3$. Subtract:
$$(x^4 - 1) - (x^4 + x^3) = -x^3 - 1.$$

Leading ratio: $-x^3/x^2 = -x$. Multiply: $-x(x^2 + x) = -x^3 - x^2$. Subtract:
$$(-x^3 - 1) - (-x^3 - x^2) = x^2 - 1.$$

Leading ratio: $x^2/x^2 = 1$. Multiply: $1 \cdot (x^2 + x) = x^2 + x$. Subtract:
$$(x^2 - 1) - (x^2 + x) = -x - 1.$$

Degree of $-x - 1$ is $1 < 2 = \deg f_2$, so we stop.

Thus $f_1 = q_1 f_2 + f_3$ with $q_1 = x^2 - x + 1$ and $f_3 = -x - 1$.

*Verification:* $q_1 f_2 + f_3 = (x^2 - x + 1)(x^2 + x) + (-x - 1)$. Expand:
$$(x^2 - x + 1)(x^2 + x) = x^4 + x^3 - x^3 - x^2 + x^2 + x = x^4 + x.$$
Adding $-x - 1$: $x^4 + x - x - 1 = x^4 - 1 = f_1$. $\checkmark$

**Step 2.** Divide $f_2 = x^2 + x$ by $f_3 = -x - 1 = -(x + 1)$.

Since gcd is invariant under scaling, replace $f_3$ with its monic associate $x + 1$. Divide $x^2 + x$ by $x + 1$:

Leading ratio: $x^2/x = x$. Multiply: $x(x + 1) = x^2 + x$. Subtract:
$$(x^2 + x) - (x^2 + x) = 0.$$

Remainder is $0$, so we stop. $\gcd = x + 1$.

*Alternative via factorization (sanity check).*
$$x^4 - 1 = (x^2 - 1)(x^2 + 1) = (x - 1)(x + 1)(x^2 + 1),$$
$$x^2 + x = x(x + 1).$$
Common factor: $x + 1$ (the others — $x - 1, x^2 + 1, x$ — are pairwise coprime to each other in $\mathbb{Q}[x]$). $\checkmark$

$$\boxed{\gcd(x^4 - 1, x^2 + x) = x + 1 \text{ in } \mathbb{Q}[x].} \blacksquare$$

*Bezout (for extra credit).* Back-substitute to find $u, v \in \mathbb{Q}[x]$ with $u(x^4 - 1) + v(x^2 + x) = x + 1$. From Step 1: $-x - 1 = (x^4 - 1) - (x^2 - x + 1)(x^2 + x)$, so $x + 1 = -(x^4 - 1) + (x^2 - x + 1)(x^2 + x)$. Hence $u = -1, v = x^2 - x + 1$.

*Verification.* $-1 \cdot (x^4 - 1) + (x^2 - x + 1)(x^2 + x) = -x^4 + 1 + (x^4 + x) = 1 + x$. $\checkmark$

---

**Solution 5.** Show that $\mathbb{Z}[x]$ is not a PID by exhibiting a non-principal ideal.

*Claim.* The ideal $I = \langle 2, x \rangle = \{2 p(x) + x q(x) : p, q \in \mathbb{Z}[x]\} \subseteq \mathbb{Z}[x]$ is not principal.

*Strategy.* Describe $I$ concretely; then suppose $I = \langle f \rangle$ and derive a contradiction from $f \mid 2$ and $f \mid x$.

*Concrete description of $I$.* An element of $I$ has the form $2 p(x) + x q(x)$ for some $p, q \in \mathbb{Z}[x]$. Evaluating at $x = 0$:
$$(2 p + x q)(0) = 2 p(0) + 0 = 2 p(0) \in 2\mathbb{Z}.$$
So every element of $I$ has an even constant term. Conversely, any polynomial $a_0 + a_1 x + a_2 x^2 + \cdots$ with $a_0$ even can be written as
$$a_0 + a_1 x + a_2 x^2 + \cdots = 2 \cdot (a_0/2) + x \cdot (a_1 + a_2 x + \cdots) \in I.$$

Hence
$$I = \{p \in \mathbb{Z}[x] : p(0) \in 2\mathbb{Z}\} = \{p \in \mathbb{Z}[x] : \text{constant term of } p \text{ is even}\}.$$

Note $1 \notin I$ (constant term $1$ is odd).

*Suppose $I = \langle f \rangle$ for some $f \in \mathbb{Z}[x]$.* Then:

1. $f \mid 2$ in $\mathbb{Z}[x]$ (since $2 \in I$). Write $2 = f \cdot h$ for some $h \in \mathbb{Z}[x]$. Take degrees (over $\mathbb{Z}$, degrees add since $\mathbb{Z}$ is an ID): $0 = \deg 2 = \deg f + \deg h$, so $\deg f = \deg h = 0$, i.e., $f, h$ are constants in $\mathbb{Z}$. From $2 = fh$: $f \in \{\pm 1, \pm 2\}$.

2. $f \mid x$ in $\mathbb{Z}[x]$ (since $x \in I$). Write $x = f \cdot k$. From (1), $f$ is a constant in $\{\pm 1, \pm 2\}$. If $f = \pm 2$, then $x = \pm 2 k$, forcing the coefficient of $x$ in $\pm 2 k$ to be $\pm 1$. Write $k = a_0 + a_1 x + \cdots$; then $\pm 2 k = \pm 2 a_0 + (\pm 2 a_1) x + \cdots$, and the $x$-coefficient is $\pm 2 a_1$, which is even. But it must equal $1$ (the coefficient of $x$ in $x$), a contradiction. So $f \neq \pm 2$.

3. Combining, $f \in \{\pm 1\}$. But $\pm 1 \in \mathbb{Z}[x]^\times$, so $\langle f \rangle = \mathbb{Z}[x]$. Hence $I = \mathbb{Z}[x]$.

4. This contradicts $1 \notin I$.

$\therefore I = \langle 2, x \rangle$ is **not principal**, so $\mathbb{Z}[x]$ is not a PID. $\blacksquare$

*Deeper perspective.* $\mathbb{Z}[x]$ is still a **UFD** (a deep theorem of Gauss: if $R$ is a UFD, so is $R[x]$), but the factorization structure is more subtle. $\mathbb{Z}[x]/\langle 2, x \rangle \cong \mathbb{F}_2$: it is the maximal ideal, and the quotient identifies $(x, 2) \mapsto (0, 0)$.

*Contrast.* $\mathbb{Q}[x]$ (extend $\mathbb{Z}$ to its fraction field first) is a PID. The "obstruction" in $\mathbb{Z}[x]$ is exactly that $\mathbb{Z}$ is not a field.

---

**Solution 6.** Let $p \in \mathbb{F}[x]$ with $\deg p = 3$ over a field $\mathbb{F}$. Show $p$ is reducible iff $p$ has a root in $\mathbb{F}$.

*Setup.* Recall: $p$ is **reducible** (in $\mathbb{F}[x]$, with $\deg p \ge 1$) iff $p = gh$ with both $g, h \in \mathbb{F}[x]$ of degree $\ge 1$ and $< \deg p$.

**($\Rightarrow$) Reducible $\Rightarrow$ root.**

Suppose $p = gh$ with $0 < \deg g, \deg h < 3$. Since $\mathbb{F}[x]$ is an ID, $\deg g + \deg h = \deg p = 3$. The only decompositions of $3$ as a sum of two positive integers are $1 + 2$ and $2 + 1$. In either case, exactly one of $g, h$ has degree $1$; WLOG $\deg g = 1$.

Write $g(x) = \alpha x + \beta$ with $\alpha \neq 0, \alpha, \beta \in \mathbb{F}$. Then $g(-\beta/\alpha) = 0$ (using $\alpha \neq 0$ and $\mathbb{F}$ a field, so $\alpha^{-1}$ exists). Consequently $p(-\beta/\alpha) = g(-\beta/\alpha) h(-\beta/\alpha) = 0$. So $p$ has the root $-\beta/\alpha \in \mathbb{F}$. $\checkmark$

**($\Leftarrow$) Root $\Rightarrow$ reducible.**

Suppose $p(a) = 0$ for some $a \in \mathbb{F}$. By the Factor Theorem (Theorem 24.8), $(x - a) \mid p(x)$: write $p(x) = (x - a) q(x)$ for some $q \in \mathbb{F}[x]$.

Since $\deg p = 3$ and $\deg(x - a) = 1$, we get $\deg q = 2$. Both factors — $x - a$ of degree $1$ and $q$ of degree $2$ — have degree $\ge 1$ and $< 3 = \deg p$. So $p$ is reducible. $\checkmark$

$\therefore p$ reducible $\iff$ $p$ has a root in $\mathbb{F}$. $\blacksquare$

*Caveat.* The argument used **$\deg p = 3$** essentially: the only factorizations of $3 = 1 + 2$ force a linear factor. For $\deg p = 4$, the factorization $4 = 2 + 2$ is also possible, so "reducible" does not entail "has a root". E.g., $p(x) = x^4 + 4 = (x^2 + 2x + 2)(x^2 - 2x + 2) \in \mathbb{Q}[x]$ is reducible but has no rational roots.

*Generalization.* The statement "reducible iff has a root" holds for $\deg p \in \{2, 3\}$ over any field. For $\deg p \ge 4$, reducibility into two factors of degree $\ge 2$ with no root in $\mathbb{F}$ is possible.

---

**Solution 7.** Show that $x^3 - 2$ is irreducible in $\mathbb{Q}[x]$.

*Setup.* We apply Solution 6 (valid for degree $3$): $p(x) = x^3 - 2$ is reducible in $\mathbb{Q}[x]$ iff it has a rational root. So we prove $p$ has **no rational root**.

*Strategy.* Use the Rational Root Theorem.

*Rational Root Theorem applied.* Write $p(x) = x^3 + 0 \cdot x^2 + 0 \cdot x - 2$, so $a_3 = 1$ (leading) and $a_0 = -2$ (constant). Any rational root $r/s$ in lowest terms (with $\gcd(r, s) = 1$, $s > 0$) satisfies:
$$r \mid a_0 = -2, \quad s \mid a_3 = 1.$$

So $r \in \{\pm 1, \pm 2\}$ and $s \in \{1\}$, giving candidate rational roots $\{\pm 1, \pm 2\}$.

*Check each candidate.*

| $a$ | $a^3$ | $a^3 - 2$ | Root? |
|---|---|---|---|
| $1$ | $1$ | $-1$ | No |
| $-1$ | $-1$ | $-3$ | No |
| $2$ | $8$ | $6$ | No |
| $-2$ | $-8$ | $-10$ | No |

None of the candidate rationals is a root.

*Conclude.* $x^3 - 2$ has no rational roots. By Solution 6, $x^3 - 2$ is irreducible in $\mathbb{Q}[x]$. $\blacksquare$

*Interpretation.* The roots of $x^3 - 2$ in $\mathbb{C}$ are $\sqrt[3]{2}, \omega \sqrt[3]{2}, \omega^2 \sqrt[3]{2}$, where $\omega = e^{2\pi i/3}$ is a primitive cube root of unity. All three are irrational. The minimal polynomial of $\sqrt[3]{2}$ over $\mathbb{Q}$ is $x^3 - 2$, which is why $[\mathbb{Q}(\sqrt[3]{2}) : \mathbb{Q}] = 3$.

*Alternative proof (Eisenstein).* Over $\mathbb{Z}[x]$, $p = x^3 - 2$ satisfies Eisenstein's criterion at prime $2$: (i) $2 \nmid 1$ (leading), (ii) $2 \mid 0, 0, -2$ (other coefficients), (iii) $2^2 = 4 \nmid -2$ (constant term). So $p$ is irreducible in $\mathbb{Z}[x]$, hence in $\mathbb{Q}[x]$ by Gauss's lemma. This generalizes: $x^n - p$ is irreducible over $\mathbb{Q}$ for any prime $p$ and any $n \ge 1$.

---

## Related Concepts

- [[19-rings-definition-and-examples]] — $R[x]$ is a fundamental example of a ring
- [[21-integral-domains]] — $D[x]$ is an integral domain when $D$ is
- [[22-ideals-and-quotient-rings]] — principal ideals in $\mathbb{F}[x]$ correspond to polynomials
- [[23-ring-homomorphisms]] — evaluation homomorphisms
- [[26-fields-and-irreducibility]] — full treatment of irreducibility

---

*Last updated: 2026-04-19*
