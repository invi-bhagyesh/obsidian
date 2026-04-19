# 3. Groups — Definition and Examples

> **The central object.** A **group** is a set with a single binary operation satisfying four axioms: closure, associativity, identity, and inverses. Almost every subsequent chapter — subgroups, cosets, quotients, homomorphisms, even rings and fields — rests on this one definition.
>
> This chapter states the axioms, establishes the basic consequences (uniqueness, cancellation, $(ab)^{-1} = b^{-1}a^{-1}$), and walks through a zoo of examples, concrete and abstract.

---

## 3.1 The Group Axioms

> **Definition (Group).** A **group** is a pair $(G, *)$ where $G$ is a non-empty set and $*$ is a binary operation on $G$ satisfying:
>
> 1. **(Closure)** $\forall a, b \in G : a * b \in G$. *(Built into the definition of binary operation.)*
> 2. **(Associativity)** $\forall a, b, c \in G : (a * b) * c = a * (b * c)$.
> 3. **(Identity)** $\exists e \in G$ such that $\forall a \in G : e * a = a * e = a$.
> 4. **(Inverses)** $\forall a \in G, \exists a^{-1} \in G$ such that $a * a^{-1} = a^{-1} * a = e$.
>
> If additionally $a * b = b * a$ for all $a, b \in G$, the group is **abelian** (or **commutative**).

**Notation conventions.**
- We usually drop $*$ and write $ab$ for $a * b$.
- Identity: $e$ (or $1$ for multiplicative, $0$ for additive).
- Inverse: $a^{-1}$ (multiplicative) or $-a$ (additive).
- $|G|$ = **order** of the group = number of elements.

---

## 3.2 Immediate Consequences

> **Theorem 3.1 (Uniqueness).** In a group, the identity $e$ is unique, and each element's inverse is unique.

**Proof.**

*Uniqueness of identity.* Suppose $e, e' \in G$ are both identities. Apply each identity property to $ee'$:
$$e e' = e' \quad \text{(since $e$ is an identity: } ex = x \text{ with } x = e')$$
$$e e' = e \quad \text{(since $e'$ is an identity: } xe' = x \text{ with } x = e).$$
Both equal $ee'$, so $e = ee' = e'$. Hence $e = e'$ and the identity is unique.

*Uniqueness of inverse.* Suppose $a', a''$ are both inverses of $a$, i.e., $aa' = a'a = e$ and $aa'' = a''a = e$. We chain:
$$a' = a' e \quad \text{(identity)}$$
$$\phantom{a'} = a' (a a'') \quad \text{(since $aa'' = e$)}$$
$$\phantom{a'} = (a' a) a'' \quad \text{(associativity — the key step!)}$$
$$\phantom{a'} = e \, a'' \quad \text{(since $a'a = e$)}$$
$$\phantom{a'} = a''.$$
So $a' = a''$. $\blacksquare$

*Why associativity is essential.* Without the re-bracketing $(a' e) \to (a' (aa'')) \to ((a'a) a'')$, we could not conclude. In non-associative algebras (e.g., octonions), this proof collapses and inverses can fail to be unique.

---

> **Theorem 3.2 (Cancellation laws).** In a group $G$:
> - **Left cancellation:** $ab = ac \implies b = c$.
> - **Right cancellation:** $ba = ca \implies b = c$.

**Proof.**

*Left cancellation.* Given $ab = ac$. Multiply both sides on the left by $a^{-1}$:
$$a^{-1}(ab) = a^{-1}(ac).$$
By associativity:
$$(a^{-1}a)b = (a^{-1}a)c.$$
By the inverse property, $a^{-1}a = e$, so:
$$eb = ec \implies b = c. \checkmark$$

*Right cancellation.* Analogously, multiply $ba = ca$ on the right by $a^{-1}$:
$$(ba)a^{-1} = (ca)a^{-1} \implies b(aa^{-1}) = c(aa^{-1}) \implies be = ce \implies b = c. \checkmark$$

$\blacksquare$

*Remark.* Cancellation uses all three non-closure axioms (associativity + identity + inverses). It fails in a monoid without inverses (e.g., $\mathbb{Z}$ under multiplication: $0 \cdot 1 = 0 \cdot 2$ but $1 \neq 2$).

---

> **Theorem 3.3 (Properties of inverses).** In a group:
> 1. $(a^{-1})^{-1} = a$.
> 2. $(ab)^{-1} = b^{-1} a^{-1}$ (**socks-shoes rule**).
> 3. $e^{-1} = e$.

**Proof.**

*(1) $(a^{-1})^{-1} = a$.* By definition of inverse, $(a^{-1})^{-1}$ is the unique element $x$ satisfying $a^{-1} x = x a^{-1} = e$.

Check $x = a$: $a^{-1} a = e$ ✓ (inverse property) and $a a^{-1} = e$ ✓. So $a$ is an inverse of $a^{-1}$. By uniqueness of inverse (Theorem 3.1), $(a^{-1})^{-1} = a$.

*(2) $(ab)^{-1} = b^{-1}a^{-1}$.* We verify $b^{-1}a^{-1}$ is an inverse of $ab$ by checking both products.

$$(ab)(b^{-1}a^{-1}) = a(bb^{-1})a^{-1} \quad \text{(associativity)}$$
$$\phantom{(ab)(b^{-1}a^{-1})} = a \cdot e \cdot a^{-1} = a a^{-1} = e.$$

$$(b^{-1}a^{-1})(ab) = b^{-1}(a^{-1}a)b \quad \text{(associativity)}$$
$$\phantom{(b^{-1}a^{-1})(ab)} = b^{-1} \cdot e \cdot b = b^{-1}b = e.$$

Both products equal $e$, so $b^{-1}a^{-1}$ is the two-sided inverse of $ab$. By uniqueness, $(ab)^{-1} = b^{-1}a^{-1}$.

**Analogy (socks and shoes).** Putting on socks then shoes: to undo, remove shoes first (un-shoe = $a^{-1}$), then socks (un-sock = $b^{-1}$). The order reverses.

*(3) $e^{-1} = e$.* $e \cdot e = e$ (using $e$ as identity), so $e$ is its own inverse. By uniqueness, $e^{-1} = e$.

$\blacksquare$

*Generalization.* By induction, $(a_1 a_2 \cdots a_n)^{-1} = a_n^{-1} a_{n-1}^{-1} \cdots a_1^{-1}$ — full reversal.

---

> **Theorem 3.4 (Solution of $ax = b$).** In a group $G$, the equation $ax = b$ has a unique solution $x = a^{-1}b$, and $ya = b$ has a unique solution $y = ba^{-1}$.

**Proof.**

*Existence.* Set $x = a^{-1}b$. Then
$$ax = a(a^{-1}b) = (aa^{-1})b = eb = b. \checkmark$$

*Uniqueness.* Suppose $ax = ax'$. By left cancellation, $x = x'$.

Analogously for $ya = b$: $y = ba^{-1}$ works and is unique by right cancellation.

$\blacksquare$

---

> **Corollary 3.5 (Latin square property).** In the Cayley table of a finite group, every element appears **exactly once** in each row and each column.

**Proof.** Let $G = \{g_1, \ldots, g_n\}$. Row $i$ of the Cayley table lists the products $g_i g_1, g_i g_2, \ldots, g_i g_n$.

Consider the map $L_{g_i}: G \to G$ defined by $L_{g_i}(x) = g_i x$ (left-multiplication by $g_i$).

*$L_{g_i}$ is injective.* If $g_i x = g_i y$, by left cancellation $x = y$.

*$L_{g_i}$ is surjective.* Given any $z \in G$, by Theorem 3.4, $x = g_i^{-1} z$ satisfies $g_i x = z$. So $L_{g_i}$ hits every element.

Hence $L_{g_i}: G \to G$ is a bijection. The row $i$ of the Cayley table is $L_{g_i}(g_1), \ldots, L_{g_i}(g_n)$, which is a permutation of $G$ — each element of $G$ appears exactly once.

Analogously for columns using right-multiplication $R_{g_j}(x) = x g_j$. $\blacksquare$

**Interpretation.** This is a **necessary (but not sufficient)** condition for a Cayley table to define a group. The sudoku puzzle is essentially finding a Latin square; most Latin squares do not come from groups (associativity can fail).

*Example of a non-group Latin square.* The table with entries $(i + j^2) \bmod 3$ is Latin but typically not associative.

---

## 3.3 Examples of Groups

### Abelian groups

**Example 1 (Integers under addition).** $(\mathbb{Z}, +)$.

*Verification.* 
- Closed: $\mathbb{Z} + \mathbb{Z} \subseteq \mathbb{Z}$.
- Associative: standard property of integer addition.
- Identity: $0$ (since $a + 0 = 0 + a = a$).
- Inverses: $a^{-1} = -a$ (additive inverse).
- Commutative: $a + b = b + a$.

Abelian, infinite. $\blacksquare$

**Example 2 (Rationals, reals, complexes).** $(\mathbb{Q}, +)$, $(\mathbb{R}, +)$, $(\mathbb{C}, +)$: all abelian groups under addition, by the same verifications.

**Example 3 (Nonzero rationals under multiplication).** $(\mathbb{Q}^*, \cdot)$ where $\mathbb{Q}^* = \mathbb{Q} \setminus \{0\}$.

*Verification.*
- Closed: product of two nonzero rationals is nonzero. ✓
- Associative: standard. ✓
- Identity: $1$. ✓
- Inverses: $a^{-1} = 1/a$, defined since $a \neq 0$. ✓
- Commutative: ✓

*Why exclude $0$?* $0$ has no multiplicative inverse.

**Example 4 (Positive reals under multiplication).** $(\mathbb{R}_{>0}, \cdot)$.

*Closure.* Product of positive reals is positive. ✓ Inverses: $a^{-1} = 1/a > 0$. ✓ Abelian group.

**Example 5 (Integers mod $n$, additive).** $(\mathbb{Z}_n, +)$ where $\mathbb{Z}_n = \{0, 1, 2, \ldots, n - 1\}$ and addition is mod $n$.

*Verification.*
- Closed: $(a + b) \bmod n \in \{0, 1, \ldots, n - 1\}$. ✓
- Associative: $(a + b) + c \equiv a + (b + c) \pmod n$. ✓
- Identity: $0$.
- Inverses: $a^{-1} = n - a$ for $a \neq 0$; $0^{-1} = 0$. Check: $a + (n - a) = n \equiv 0 \pmod n$. ✓
- Commutative: ✓

Abelian, order $n$.

**Example 6 (Units of $\mathbb{Z}_n$, multiplicative).** $U(n) = \{a \in \mathbb{Z}_n : \gcd(a, n) = 1\}$ under multiplication mod $n$.

*Verification of closure.* If $\gcd(a, n) = 1$ and $\gcd(b, n) = 1$, then $\gcd(ab, n) = 1$ (since any prime $p \mid n$ divides $ab$ iff $p \mid a$ or $p \mid b$, contradicting $\gcd(a, n) = \gcd(b, n) = 1$). ✓

*Inverses.* If $\gcd(a, n) = 1$, by Bézout's lemma there exist $x, y \in \mathbb{Z}$ with $ax + ny = 1$. Then $a \cdot x \equiv 1 \pmod n$, so $a^{-1} \equiv x \pmod n$ exists. ✓

*Order.* $|U(n)| = \varphi(n)$, Euler's totient.

Examples:
- $U(5) = \{1, 2, 3, 4\}$, $|U(5)| = \varphi(5) = 4$.
- $U(8) = \{1, 3, 5, 7\}$, $|U(8)| = \varphi(8) = 4$.
- $U(12) = \{1, 5, 7, 11\}$, $|U(12)| = \varphi(12) = 4$.

**Example 7 (Klein four-group $V_4$).** $V_4 = \{e, a, b, c\}$ with $a^2 = b^2 = c^2 = e$ and $ab = c, bc = a, ca = b$ (commutatively).

*Cayley table.*
$$
\begin{array}{c|cccc}
\cdot & e & a & b & c \\
\hline
e & e & a & b & c \\
a & a & e & c & b \\
b & b & c & e & a \\
c & c & b & a & e
\end{array}
$$

Abelian (table symmetric), order $4$. Isomorphic to $\mathbb{Z}_2 \times \mathbb{Z}_2$ via $e \leftrightarrow (0, 0), a \leftrightarrow (1, 0), b \leftrightarrow (0, 1), c \leftrightarrow (1, 1)$.

### Non-abelian groups

**Example 8 (Symmetric group $S_n$).** Permutations of $\{1, 2, \ldots, n\}$ under composition.

*Order.* $|S_n| = n!$ (number of bijections of an $n$-set).

*Non-abelian for $n \geq 3$.* E.g., in $S_3$: $(1\,2)(1\,3) = (1\,3\,2)$ but $(1\,3)(1\,2) = (1\,2\,3)$. Different.

See [[05-permutation-and-dihedral-groups]] for systematic treatment.

**Example 9 (Dihedral group $D_n$).** Symmetries of regular $n$-gon.

*Order.* $|D_n| = 2n$.

Non-abelian for $n \geq 3$ (by [[02-symmetries-of-the-plane]] Solution 6).

**Example 10 (General linear group).** $GL_n(\mathbb{R}) = \{A \in M_n(\mathbb{R}) : \det A \neq 0\}$ under matrix multiplication.

*Verification.*
- Closed: $\det(AB) = \det A \cdot \det B \neq 0$. ✓
- Associative: matrix multiplication. ✓
- Identity: $I_n$.
- Inverses: $A^{-1}$ exists iff $\det A \neq 0$; its determinant is $1/\det A \neq 0$. ✓

Non-abelian for $n \geq 2$: e.g.,
$$\begin{pmatrix} 1 & 1 \\ 0 & 1 \end{pmatrix} \begin{pmatrix} 1 & 0 \\ 1 & 1 \end{pmatrix} = \begin{pmatrix} 2 & 1 \\ 1 & 1 \end{pmatrix}, \quad \begin{pmatrix} 1 & 0 \\ 1 & 1 \end{pmatrix} \begin{pmatrix} 1 & 1 \\ 0 & 1 \end{pmatrix} = \begin{pmatrix} 1 & 1 \\ 1 & 2 \end{pmatrix}.$$
Different.

Infinite group.

**Example 11 (Special linear group).** $SL_n(\mathbb{R}) = \{A \in GL_n(\mathbb{R}) : \det A = 1\}$.

*Subgroup of $GL_n$.* If $\det A = \det B = 1$, then $\det(AB) = 1$ (closure) and $\det(A^{-1}) = 1/\det A = 1$. ✓

Non-abelian for $n \geq 2$, infinite.

**Example 12 (Quaternion group $Q_8$).** $Q_8 = \{1, -1, i, -i, j, -j, k, -k\}$ with
$$i^2 = j^2 = k^2 = ijk = -1,$$
and $ij = k, jk = i, ki = j$, $ji = -k, kj = -i, ik = -j$.

*Non-abelian.* $ij = k$ but $ji = -k$, different.

*Order.* $|Q_8| = 8$.

*Unique feature:* Every subgroup of $Q_8$ is normal (a rare feature for non-abelian groups — see [[12-subgroup-lattice-and-dihedral-groups]]).

---

## 3.4 Non-Examples

Always useful to see what *fails* an axiom:

- **$(\mathbb{N}, +)$:** Depends on convention. If $\mathbb{N} = \{1, 2, \ldots\}$, no identity. If $\mathbb{N} = \{0, 1, 2, \ldots\}$, no inverses (e.g., $1$ has no additive inverse in $\mathbb{N}$).
- **$(\mathbb{Z}, \cdot)$:** $2$ has no multiplicative inverse ($1/2 \notin \mathbb{Z}$). So $(\mathbb{Z}, \cdot)$ is a commutative monoid, not a group.
- **$(\mathbb{Z}, -)$:** Subtraction is not associative: $(5 - 3) - 2 = 0$ but $5 - (3 - 2) = 4$. Also no identity on the right: $a - e = a$ gives $e = 0$, but $e - a = a$ gives $e = 2a$ depending on $a$ — no two-sided identity.
- **All $2 \times 2$ matrices under $\cdot$:** $M_2(\mathbb{R})$ has a multiplicative identity $I_2$, but the zero matrix has no inverse. Need to restrict to $GL_2$.
- **$(\mathbb{Z}_n, \cdot)$ for $n > 1$:** Not a group — $0$ has no inverse, and zero divisors may exist for composite $n$. Restricting to $U(n) \subset \mathbb{Z}_n$ (units) fixes this.

---

## 3.5 Finite Groups of Small Order

A big question: **how many groups of each order exist up to isomorphism?** The answer is surprisingly intricate, but for small orders:

| Order $n$ | # of groups (up to isomorphism) | Groups                                                  |
| --------- | ------------------------------- | ------------------------------------------------------- |
| 1         | 1                               | Trivial $\{e\}$                                         |
| 2         | 1                               | $\mathbb{Z}_2$                                          |
| 3         | 1                               | $\mathbb{Z}_3$                                          |
| 4         | 2                               | $\mathbb{Z}_4$, $V_4 = \mathbb{Z}_2 \times \mathbb{Z}_2$ |
| 5         | 1                               | $\mathbb{Z}_5$                                          |
| 6         | 2                               | $\mathbb{Z}_6$, $S_3 = D_3$                             |
| 7         | 1                               | $\mathbb{Z}_7$                                          |
| 8         | 5                               | $\mathbb{Z}_8, \mathbb{Z}_4 \times \mathbb{Z}_2, \mathbb{Z}_2^3, D_4, Q_8$ |
| 9         | 2                               | $\mathbb{Z}_9, \mathbb{Z}_3 \times \mathbb{Z}_3$         |
| 10        | 2                               | $\mathbb{Z}_{10}, D_5$                                   |
| 12        | 5                               | $\mathbb{Z}_{12}, \mathbb{Z}_6 \times \mathbb{Z}_2, D_6, A_4, \text{Dic}_3$ |

**Pattern:**
- Primes $p$ have exactly $1$ group ($\mathbb{Z}_p$).
- $p^2$ has $2$ (namely $\mathbb{Z}_{p^2}$ and $\mathbb{Z}_p \times \mathbb{Z}_p$).
- Order $pq$ (distinct primes $p < q$) has $1$ if $q \not\equiv 1 \pmod p$, else $2$.

---

## 3.6 Worked Examples

**Example 13 (Verifying group axioms — rationals under $*$).** Show $(\mathbb{Q} \setminus \{-1\}, *)$ with $a * b = a + b + ab$ is an abelian group.

*Solution.*

**Closure.** Need $a * b \neq -1$ whenever $a, b \neq -1$.

$a * b = -1 \iff a + b + ab = -1 \iff a + b + ab + 1 = 0 \iff (1 + a)(1 + b) = 0 \iff a = -1 \text{ or } b = -1$.

Both excluded by hypothesis, so $a * b \neq -1$. ✓

**Associativity.** Expand both bracketings.
$$(a * b) * c = (a + b + ab) * c = (a + b + ab) + c + (a + b + ab)c.$$
Distribute: $(a + b + ab)c = ac + bc + abc$. So
$$(a * b) * c = a + b + c + ab + ac + bc + abc.$$

$$a * (b * c) = a * (b + c + bc) = a + (b + c + bc) + a(b + c + bc).$$
Distribute: $a(b + c + bc) = ab + ac + abc$. So
$$a * (b * c) = a + b + c + bc + ab + ac + abc.$$

Both equal $a + b + c + ab + ac + bc + abc$ (symmetric in $a, b, c$). Associative. ✓

*Slick proof:* Note $(1 + a * b) = (1 + a)(1 + b)$. So $(1 + (a * b) * c) = (1 + a * b)(1 + c) = (1 + a)(1 + b)(1 + c)$, symmetric in $a, b, c$. Hence $(a * b) * c = a * (b * c)$ by comparing their "shifted" forms.

**Identity.** Seek $e$ with $a * e = a$: $a + e + ae = a \Rightarrow e(1 + a) = 0$. Must hold for all $a \neq -1$, hence $e = 0$.

Verify: $a * 0 = a + 0 + 0 = a$. ✓

**Inverses.** Seek $a'$ with $a * a' = 0$: $a + a' + aa' = 0 \Rightarrow a'(1 + a) = -a \Rightarrow a' = -a/(1 + a)$.

Defined since $a \neq -1$. And $a' \neq -1$: suppose $-a/(1 + a) = -1$, i.e., $a = 1 + a$, i.e., $0 = 1$ — contradiction. So $a' \in \mathbb{Q} \setminus \{-1\}$. ✓

**Commutativity.** $a * b = a + b + ab = b + a + ba = b * a$. ✓

**Conclusion.** $(\mathbb{Q} \setminus \{-1\}, *)$ is an abelian group. $\blacksquare$

*Remark (isomorphism).* The map $\psi: \mathbb{Q} \setminus \{-1\} \to \mathbb{Q}^\times$, $\psi(a) = 1 + a$, is a group isomorphism onto the nonzero rationals under multiplication (check: $\psi(a * b) = 1 + a + b + ab = (1 + a)(1 + b) = \psi(a)\psi(b)$; $\psi(0) = 1$; $\psi$ is a bijection $\mathbb{Q} \setminus \{-1\} \to \mathbb{Q} \setminus \{0\}$).

---

**Example 14 ($GL_2$ is a group).** Verify $(GL_2(\mathbb{R}), \cdot)$ is a group.

*Solution.*

**Closure.** Multiplicativity of determinant: $\det(AB) = \det A \cdot \det B$. If $\det A, \det B \neq 0$, then $\det(AB) \neq 0$, so $AB \in GL_2$. ✓

**Associativity.** Matrix multiplication is associative:
$$((AB)C)_{ij} = \sum_k (AB)_{ik} C_{kj} = \sum_k \sum_\ell A_{i\ell} B_{\ell k} C_{kj} = \sum_\ell A_{i\ell} \sum_k B_{\ell k} C_{kj} = \sum_\ell A_{i\ell}(BC)_{\ell j} = (A(BC))_{ij}. \checkmark$$

**Identity.** $I_2 = \begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix}$ with $\det I_2 = 1 \neq 0$. Check $A I_2 = I_2 A = A$. ✓

**Inverses.** For $A = \begin{pmatrix} a & b \\ c & d \end{pmatrix}$ with $\det A = ad - bc \neq 0$,
$$A^{-1} = \frac{1}{ad - bc}\begin{pmatrix} d & -b \\ -c & a\end{pmatrix}.$$
Check $\det(A^{-1}) = \frac{1}{(ad-bc)^2}(ad - bc) = \frac{1}{ad-bc} \neq 0$, so $A^{-1} \in GL_2$. ✓

**Non-abelian.** Counterexample:
$$A = \begin{pmatrix} 1 & 1 \\ 0 & 1 \end{pmatrix}, \quad B = \begin{pmatrix} 1 & 0 \\ 1 & 1 \end{pmatrix}.$$
$AB = \begin{pmatrix} 2 & 1 \\ 1 & 1 \end{pmatrix}$, $BA = \begin{pmatrix} 1 & 1 \\ 1 & 2 \end{pmatrix}$. Different. ✓

So $GL_2(\mathbb{R})$ is a non-abelian group. $\blacksquare$

---

**Example 15 (Left-inverse equals right-inverse).** Show that in a group, if $ba = e$, then $ab = e$.

*Solution.*

Since $G$ is a group, $a$ has a (two-sided) inverse $a^{-1}$ with $a a^{-1} = a^{-1} a = e$.

Given $ba = e$, compute:
$$b = b \cdot e = b (a a^{-1}) = (ba) a^{-1} = e \cdot a^{-1} = a^{-1}.$$

Hence $b = a^{-1}$. So $ab = a a^{-1} = e$. ✓ $\blacksquare$

**Remark.** This means: **in proving a set with an operation forms a group, it suffices to verify one-sided identity and one-sided inverses** (with the same side). A common time-saver.

*More precisely.* If $(G, *)$ satisfies:
- Closure,
- Associativity,
- There exists $e$ with $ea = a$ for all $a$ (left identity),
- For each $a$, there exists $a'$ with $a'a = e$ (left inverse),

then $(G, *)$ is a group (i.e., $ae = a$ and $aa' = e$ follow automatically). This is a standard strengthening — proof: use left-inverses of $a'$ to show $aa' = e$, then deduce $ae = a$.

---

**Example 16 (Group of order 4 is abelian).** Show every group of order $4$ is abelian.

*Solution.*

Let $G = \{e, a, b, c\}$ be a group of order $4$. By Lagrange's theorem (proved in [[09-cosets-and-lagranges-theorem]]), every element's order divides $|G| = 4$. So each element has order $1, 2$, or $4$.

**Case 1: Some element has order $4$.**

Let $|g| = 4$. Then $\{e, g, g^2, g^3\}$ has $4$ distinct elements (orders would clash otherwise), so $G = \langle g \rangle$ is cyclic, i.e., $G \cong \mathbb{Z}/4\mathbb{Z}$. Cyclic groups are abelian. ✓

**Case 2: No element has order $4$.**

Then every non-identity element has order $2$: $a^2 = b^2 = c^2 = e$.

So $a = a^{-1}, b = b^{-1}, c = c^{-1}$.

*Key claim: $G$ is abelian.*

For any $x, y \in G$: $(xy)^2 = e$ implies $xy = (xy)^{-1} = y^{-1}x^{-1} = yx$.

So $xy = yx$ for all $x, y$, i.e., $G$ is abelian.

**Determining structure.** Consider $ab$. It's in $G$, so $ab \in \{e, a, b, c\}$.
- $ab \neq e$: else $b = a^{-1} = a$ (since $a = a^{-1}$), contradicting $a \neq b$.
- $ab \neq a$: else $b = e$, contradicting $b \neq e$.
- $ab \neq b$: else $a = e$, contradicting $a \neq e$.

So $ab = c$. By symmetry $ba = c, bc = a, cb = a, ac = b, ca = b$. All products work out — this is precisely the Klein four-group $V_4$.

**Conclusion.** Every group of order $4$ is either cyclic ($\mathbb{Z}/4\mathbb{Z}$) or Klein four ($V_4$). Both are abelian. $\blacksquare$

---

**Example 17 (A group from a functional equation).** The set of rational functions
$$f_1(x) = x, \quad f_2(x) = \frac{1}{1-x}, \quad f_3(x) = \frac{x-1}{x}, \quad f_4(x) = \frac{1}{x}, \quad f_5(x) = 1-x, \quad f_6(x) = \frac{x}{x-1}$$
is closed under composition. Verify it's a group isomorphic to $S_3$.

*Solution.*

**Step 1: $f_2$ has order $3$.**

Compute $f_2 \circ f_2$:
$$f_2(f_2(x)) = f_2\left(\frac{1}{1 - x}\right) = \frac{1}{1 - \frac{1}{1-x}} = \frac{1}{\frac{(1-x) - 1}{1-x}} = \frac{1 - x}{-x} = \frac{x - 1}{x} = f_3(x).$$

So $f_2^2 = f_3$.

Compute $f_2^3 = f_2 \circ f_3$:
$$f_2(f_3(x)) = f_2\left(\frac{x - 1}{x}\right) = \frac{1}{1 - \frac{x-1}{x}} = \frac{1}{\frac{x - (x-1)}{x}} = \frac{x}{1} = x = f_1.$$

So $f_2^3 = f_1 = e$. Hence $|f_2| = 3$ and $\{f_1, f_2, f_3\}$ is a cyclic subgroup of order $3$.

**Step 2: $f_4$ has order $2$.**

$$f_4(f_4(x)) = f_4\left(\frac{1}{x}\right) = \frac{1}{1/x} = x = f_1.$$

So $f_4^2 = f_1 = e$, and $|f_4| = 2$.

Similarly, $f_5^2 = f_1$ (since $1 - (1 - x) = x$) and $f_6^2 = f_1$ (check: $f_6(x/(x-1)) = \frac{x/(x-1)}{x/(x-1) - 1} = \frac{x/(x-1)}{(x - (x-1))/(x-1)} = \frac{x/(x-1)}{1/(x-1)} = x$). So $|f_5| = |f_6| = 2$.

**Step 3: Non-commutativity.**

Compute $f_4 \circ f_2$:
$$f_4(f_2(x)) = f_4\left(\frac{1}{1 - x}\right) = 1 - x = f_5.$$

Compute $f_2 \circ f_4$:
$$f_2(f_4(x)) = f_2\left(\frac{1}{x}\right) = \frac{1}{1 - 1/x} = \frac{x}{x - 1} = f_6.$$

$f_4 f_2 = f_5 \neq f_6 = f_2 f_4$. Non-commutative.

**Step 4: Structure — isomorphism with $S_3$.**

The group has $6$ elements: $\{f_1, f_2, f_3\}$ (order $3$ cyclic subgroup, analogous to $\langle r\rangle$ in $D_3$) and $\{f_4, f_5, f_6\}$ (three order-$2$ elements, analogous to reflections).

*Explicit isomorphism.* Let $G = \{f_1, \ldots, f_6\}$. Define $\varphi: G \to S_3$ by describing each $f_i$ as a permutation of three points on the projective line: say $\{0, 1, \infty\}$.

Actions:
- $f_1 = \operatorname{id}$: fixes $0, 1, \infty$.
- $f_2(x) = 1/(1 - x)$: $f_2(0) = 1, f_2(1) = \infty, f_2(\infty) = 0$. Cycle: $(0 \to 1 \to \infty \to 0)$, a $3$-cycle.
- $f_3(x) = (x - 1)/x$: $f_3(0) = \infty, f_3(1) = 0, f_3(\infty) = 1$. Cycle: $(0 \to \infty \to 1 \to 0)$, inverse $3$-cycle.
- $f_4(x) = 1/x$: $f_4(0) = \infty, f_4(1) = 1, f_4(\infty) = 0$. Fixes $1$, swaps $0, \infty$.
- $f_5(x) = 1 - x$: $f_5(0) = 1, f_5(1) = 0, f_5(\infty) = \infty$. Fixes $\infty$, swaps $0, 1$.
- $f_6(x) = x/(x - 1)$: $f_6(0) = 0, f_6(1) = \infty, f_6(\infty) = 1$. Fixes $0$, swaps $1, \infty$.

Identifying $\{0, 1, \infty\}$ with $\{1, 2, 3\}$ (say $0 \leftrightarrow 1, 1 \leftrightarrow 2, \infty \leftrightarrow 3$):
- $f_1 = e$, $f_2 = (1\,2\,3)$, $f_3 = (1\,3\,2)$, $f_4 = (1\,3)$, $f_5 = (1\,2)$, $f_6 = (2\,3)$.

This is $S_3$. Isomorphism $G \cong S_3 \cong D_3$. $\blacksquare$

*Geometric interpretation.* The six functions are the **Möbius transformations** permuting $\{0, 1, \infty\}$ on the Riemann sphere — the "anharmonic group" in projective geometry.

---

## 3.7 Practice Problems

1. Is $(\mathbb{R}, *)$ a group under $a * b = a + b - 5$? Find identity and inverses.
2. Show that the set $G = \{1, -1, i, -i\} \subset \mathbb{C}$ is a group under multiplication. What is it isomorphic to?
3. Let $G$ be a group with $a^2 = e$ for every $a \in G$. Prove $G$ is abelian.
4. Prove: in a group, $a^{-1}b^{-1} = (ba)^{-1}$.
5. Find all groups of order 6 up to isomorphism.
6. Let $G = \{a + b\sqrt{2} : a, b \in \mathbb{Q}\} \setminus \{0\}$. Is $G$ a group under multiplication? Under addition?
7. In a finite group $G$, show $|a| = |a^{-1}|$ for every $a \in G$.

### Solutions

**Solution 1.** Analyze $(\mathbb{R}, *)$ with $a * b = a + b - 5$.

*Closure.* $a + b - 5 \in \mathbb{R}$. ✓

*Associativity.*
$$(a * b) * c = (a + b - 5) + c - 5 = a + b + c - 10.$$
$$a * (b * c) = a + (b + c - 5) - 5 = a + b + c - 10.$$
Equal. ✓

*Identity.* $a * e = a$: $a + e - 5 = a \iff e = 5$. Check: $a * 5 = a + 5 - 5 = a$ ✓ and $5 * a = 5 + a - 5 = a$ ✓. $e = 5$.

*Inverses.* $a * a' = 5$: $a + a' - 5 = 5 \iff a' = 10 - a$. Check: $a * (10 - a) = a + 10 - a - 5 = 5$ ✓. So $a^{-1} = 10 - a$ (always in $\mathbb{R}$).

*Commutativity.* $a * b = a + b - 5 = b + a - 5 = b * a$ ✓.

**$(\mathbb{R}, *)$ is an abelian group** with identity $5$ and $a^{-1} = 10 - a$.

*Isomorphism check.* $\varphi: (\mathbb{R}, +) \to (\mathbb{R}, *)$, $\varphi(x) = x + 5$: $\varphi(x + y) = x + y + 5$; $\varphi(x) * \varphi(y) = (x + 5) + (y + 5) - 5 = x + y + 5$. Match. So this is isomorphic to $(\mathbb{R}, +)$.

$\blacksquare$

---

**Solution 2.** $G = \{1, -1, i, -i\}$ under complex multiplication.

**Cayley table.**
$$
\begin{array}{c|cccc}
\cdot & 1 & -1 & i & -i \\
\hline
1 & 1 & -1 & i & -i \\
-1 & -1 & 1 & -i & i \\
i & i & -i & -1 & 1 \\
-i & -i & i & 1 & -1
\end{array}
$$

Sample: $i \cdot i = i^2 = -1$; $i \cdot (-i) = -i^2 = 1$; $(-i)(-i) = i^2 = -1$.

*Closure.* All table entries in $G$ ✓.

*Associative.* Inherited from $\mathbb{C}$.

*Identity.* $1$ (row/column $1$ is unchanged).

*Inverses.* $1^{-1} = 1, (-1)^{-1} = -1$ (since $(-1)^2 = 1$), $i^{-1} = -i$ (since $i \cdot (-i) = 1$), $(-i)^{-1} = i$.

*Commutativity.* Table symmetric ✓.

**Orders.**
- $|1| = 1$.
- $|-1| = 2$.
- $|i| = ?$: $i^1 = i, i^2 = -1, i^3 = -i, i^4 = 1$. So $|i| = 4$.
- $|-i| = 4$ similarly.

Since $G$ has an element of order $4$, $G = \langle i\rangle$ is cyclic of order $4$: $G \cong \mathbb{Z}/4\mathbb{Z}$.

*Explicit iso.* $\mathbb{Z}_4 \to G$, $k \mapsto i^k$.

$\boxed{G \cong \mathbb{Z}/4\mathbb{Z}.}$ $\blacksquare$

---

**Solution 3.** $G$ with $a^2 = e$ for all $a \in G$ is abelian.

*Given.* Every element is self-inverse: $a = a^{-1}$.

*Goal.* $ab = ba$ for all $a, b \in G$.

*Proof.* For any $a, b \in G$:
$$ab = (ab)^{-1} \quad \text{(since } (ab)^2 = e)$$
$$\phantom{ab} = b^{-1} a^{-1} \quad \text{(socks-shoes rule, Theorem 3.3)}$$
$$\phantom{ab} = ba \quad \text{(since } a^{-1} = a, b^{-1} = b).$$

Hence $ab = ba$, so $G$ is abelian. $\blacksquare$

*Remark.* Such groups are called **elementary abelian $2$-groups**. They are exactly the groups isomorphic to $(\mathbb{Z}/2\mathbb{Z})^n$ for some $n \geq 0$.

---

**Solution 4.** Show $a^{-1} b^{-1} = (ba)^{-1}$.

*Method 1: use socks-shoes on $ba$.*
$$(ba)^{-1} = a^{-1} b^{-1}. \checkmark$$
Done.

*Method 2: direct verification.* Compute $(ba)(a^{-1} b^{-1})$:
$$(ba)(a^{-1} b^{-1}) = b(a a^{-1}) b^{-1} = b \cdot e \cdot b^{-1} = b b^{-1} = e.$$

Similarly $(a^{-1} b^{-1})(ba) = a^{-1}(b^{-1} b) a = a^{-1} e a = a^{-1} a = e$.

So $a^{-1} b^{-1}$ is the two-sided inverse of $ba$. By uniqueness of inverse, $a^{-1} b^{-1} = (ba)^{-1}$. $\blacksquare$

---

**Solution 5.** Groups of order $6$ up to isomorphism.

*Claim.* There are exactly two: $\mathbb{Z}/6\mathbb{Z}$ (cyclic, abelian) and $S_3$ (non-abelian).

**Proof outline.**

*By Cauchy's theorem* (CO3, [[16-centralizer-normalizer-stabilizer]]): $G$ has elements of orders $2$ and $3$ (since $2, 3$ both divide $6$).

Let $|a| = 3$ and $|b| = 2$. Then $H = \langle a\rangle = \{e, a, a^2\}$ has order $3$, and since $[G : H] = 2$, $H$ is normal (see [[10-normal-subgroups-and-quotient-groups]]).

So $b H b^{-1} = H$, hence $b a b^{-1} \in H = \{e, a, a^2\}$.

*Case 1: $b a b^{-1} = a$.* Then $ab = ba$. Compute $|ab|$: powers $(ab)^k = a^k b^k$. We need the smallest $k$ with $a^k = b^{-k} = b^k$ (since $b^2 = e$). If $k$ is even, $b^k = e$, so need $a^k = e$, i.e., $3 \mid k$. If $k$ is odd, $b^k = b$, so need $a^k = b$, impossible since $a^k \in \langle a\rangle$ and $b \notin \langle a\rangle$. So $k$ is even and $3 \mid k$, smallest is $k = 6$. $|ab| = 6$, $G = \langle ab\rangle \cong \mathbb{Z}/6\mathbb{Z}$.

*Case 2: $b a b^{-1} = a^2 = a^{-1}$.* Then $ba = a^{-1}b$, the dihedral relation. So $G$ has presentation $\langle a, b \mid a^3 = b^2 = e, bab^{-1} = a^{-1}\rangle = D_3 = S_3$.

*Case $bab^{-1} = e$:* impossible ($a \neq e$).

**Conclusion.** Two groups of order $6$: $\mathbb{Z}/6\mathbb{Z}$ and $S_3$. $\blacksquare$

---

**Solution 6.** $G = \{a + b\sqrt 2 : a, b \in \mathbb{Q}\} \setminus \{0\}$. 

*Under addition:* $G$ excludes $0$, so $G$ is not closed under subtraction ($x - x = 0 \notin G$). So not a group. The set $\mathbb{Q}(\sqrt 2) = G \cup \{0\}$ *is* a group under $+$.

*Under multiplication.*

Closure: $(a + b\sqrt 2)(c + d\sqrt 2) = (ac + 2bd) + (ad + bc)\sqrt 2 \in \mathbb{Q}(\sqrt 2)$. Nonzero? Suppose the product is $0$. In $\mathbb{Q}(\sqrt 2)$ (a subfield of $\mathbb{R}$), the product of two nonzero elements is nonzero. ✓

Associativity: inherited from $\mathbb{R}$.

Identity: $1 = 1 + 0\sqrt 2 \in G$.

Inverse: $(a + b\sqrt 2)^{-1} = \frac{a - b\sqrt 2}{a^2 - 2b^2}$.

Need $a^2 - 2b^2 \neq 0$. Suppose $a^2 = 2b^2$ with $a, b \in \mathbb{Q}$. If $b = 0$: $a = 0$, contradicting $(a, b) \neq (0, 0)$. If $b \neq 0$: $(a/b)^2 = 2$, so $a/b = \pm\sqrt 2 \notin \mathbb{Q}$, contradiction. So $a^2 - 2b^2 \neq 0$. ✓

Inverse has the form $\alpha + \beta\sqrt 2$ with $\alpha = a/(a^2 - 2b^2), \beta = -b/(a^2 - 2b^2) \in \mathbb{Q}$. So inverse is in $G$.

**$(G, \cdot)$ is an abelian group** — the multiplicative group of the field $\mathbb{Q}(\sqrt 2)$. $\blacksquare$

---

**Solution 7.** In a group $G$, show $|a| = |a^{-1}|$.

*Recall.* $|a|$ = smallest positive integer $n$ with $a^n = e$ (or $\infty$ if no such $n$).

**Case 1: $|a|$ finite, say $|a| = n$.**

Then $a^n = e$. Take inverses:
$$(a^{-1})^n = (a^n)^{-1} = e^{-1} = e.$$

So $|a^{-1}|$ divides $n$. Say $|a^{-1}| = m$, so $m \mid n$.

Symmetrically, $|a^{-1}| = m$ means $(a^{-1})^m = e$, so $a^m = ((a^{-1})^m)^{-1} = e^{-1} = e$, hence $|a|$ divides $m$, i.e., $n \mid m$.

From $m \mid n$ and $n \mid m$: $m = n$. So $|a^{-1}| = |a| = n$.

**Case 2: $|a| = \infty$.**

Suppose $|a^{-1}| = k$ finite. Then $(a^{-1})^k = e$, hence $a^k = e$, contradicting $|a| = \infty$. So $|a^{-1}| = \infty$ as well.

**Conclusion.** $|a^{-1}| = |a|$ in all cases. $\blacksquare$

*Remark.* This is often phrased as: in the cyclic subgroup $\langle a\rangle$, the element $a^{-1}$ generates the same subgroup and has the same order.

---

## 3.8 Cross-References

**Previous:** [[01-operations-and-algebraic-structures]], [[02-symmetries-of-the-plane]]

**Next:**
- [[04-subgroups-generators-cayley-diagrams]] — studying groups via their subgroups
- [[05-permutation-and-dihedral-groups]] — the most important infinite family of non-abelian groups
- [[06-cyclic-groups-and-order]] — the simplest non-trivial groups
