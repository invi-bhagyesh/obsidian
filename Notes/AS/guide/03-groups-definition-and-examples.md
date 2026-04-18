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
>
> *Proof.* Identity: if $e, e'$ are both identities, $e = e e' = e'$. Inverse: if $a', a''$ are both inverses of $a$, then
> $$a' = a' e = a' (a a'') = (a' a) a'' = e a'' = a''. \quad \blacksquare$$

> **Theorem 3.2 (Cancellation laws).** In a group $G$, if $ab = ac$ then $b = c$ (left cancellation); if $ba = ca$ then $b = c$ (right cancellation).
>
> *Proof.* $ab = ac \Rightarrow a^{-1}(ab) = a^{-1}(ac) \Rightarrow (a^{-1}a)b = (a^{-1}a)c \Rightarrow b = c$. Right version analogous. $\blacksquare$

> **Theorem 3.3 (Properties of inverses).** In a group:
> 1. $(a^{-1})^{-1} = a$.
> 2. $(ab)^{-1} = b^{-1} a^{-1}$ (socks-shoes rule).
> 3. $e^{-1} = e$.
>
> *Proof.*
> 1. $a^{-1}$ has a unique inverse, which is some element $x$ with $a^{-1} x = x a^{-1} = e$. $x = a$ works. By uniqueness, $(a^{-1})^{-1} = a$.
> 2. $(ab)(b^{-1}a^{-1}) = a(b b^{-1})a^{-1} = a e a^{-1} = a a^{-1} = e$, and similarly $(b^{-1}a^{-1})(ab) = e$. So $b^{-1}a^{-1}$ is the inverse of $ab$; by uniqueness, $(ab)^{-1} = b^{-1}a^{-1}$.
> 3. $e \cdot e = e$, so $e$ is its own inverse. $\blacksquare$

> **Theorem 3.4 (Solution of $ax = b$).** In a group $G$, the equation $ax = b$ has a unique solution $x = a^{-1}b$, and $ya = b$ has a unique solution $y = ba^{-1}$.
>
> *Proof.* $x = a^{-1}b$ works: $a(a^{-1}b) = (aa^{-1})b = b$. Uniqueness by cancellation. $\blacksquare$

> **Corollary 3.5 (Latin square property).** In the Cayley table of a finite group, every element appears **exactly once** in each row and each column.
>
> *Proof.* Row $a$ of the Cayley table lists $a g$ for $g \in G$. By Theorem 3.4, the map $g \mapsto ag$ is a bijection (inverse: $x \mapsto a^{-1}x$). Hence row $a$ is a permutation of $G$. Same for columns. $\blacksquare$

**Interpretation.** This is a necessary (not sufficient!) condition for a Cayley table to define a group. The sudoku puzzle is essentially finding a Latin square; most Latin squares do not come from groups.

---

## 3.3 Examples of Groups

### Abelian groups

**Example 1 (Integers under addition).** $(\mathbb{Z}, +)$. Identity $0$; inverse of $a$ is $-a$. Infinite abelian group.

**Example 2 (Rationals, reals, complexes).** $(\mathbb{Q}, +)$, $(\mathbb{R}, +)$, $(\mathbb{C}, +)$: all abelian groups under addition.

**Example 3 (Nonzero rationals under multiplication).** $(\mathbb{Q}^*, \cdot) = (\mathbb{Q} \setminus \{0\}, \cdot)$. Identity $1$; inverse of $a$ is $1/a$. Abelian.

**Example 4 (Positive reals).** $(\mathbb{R}_{>0}, \cdot)$. Abelian group.

**Example 5 (Integers mod $n$, additive).** $(\mathbb{Z}_n, +)$ with $\mathbb{Z}_n = \{0, 1, 2, \ldots, n-1\}$ and addition mod $n$. Identity $0$; inverse of $a$ is $n - a$. Abelian, order $n$.

**Example 6 (Integers mod $n$, multiplicative).** Define $U(n) = \{a \in \mathbb{Z}_n : \gcd(a, n) = 1\}$. Under multiplication mod $n$, $U(n)$ is an abelian group. Order $|U(n)| = \varphi(n)$ (Euler's totient).
- $U(5) = \{1, 2, 3, 4\}$, order 4.
- $U(8) = \{1, 3, 5, 7\}$, order 4.
- $U(12) = \{1, 5, 7, 11\}$, order 4.

**Example 7 (Klein four-group).** $V_4 = \{e, a, b, ab\}$ with $a^2 = b^2 = (ab)^2 = e$ and $ab = ba$. Abelian, order 4. Isomorphic to $\mathbb{Z}_2 \times \mathbb{Z}_2$.

### Non-abelian groups

**Example 8 (Symmetric group $S_n$).** Permutations of $\{1, 2, \ldots, n\}$ under composition. Order $|S_n| = n!$. Non-abelian for $n \geq 3$. See [[05-permutation-and-dihedral-groups]].

**Example 9 (Dihedral group $D_n$).** Symmetries of regular $n$-gon. Order $2n$. Non-abelian for $n \geq 3$. See [[02-symmetries-of-the-plane]].

**Example 10 (General linear group).** $GL_n(\mathbb{R}) = \{$invertible $n \times n$ real matrices$\}$ under matrix multiplication. Non-abelian for $n \geq 2$. Infinite.

**Example 11 (Special linear group).** $SL_n(\mathbb{R}) = \{A \in GL_n(\mathbb{R}) : \det A = 1\}$. Non-abelian subgroup.

**Example 12 (Quaternion group).** $Q_8 = \{\pm 1, \pm i, \pm j, \pm k\}$ with relations $i^2 = j^2 = k^2 = -1$, $ij = k$, $jk = i$, $ki = j$, $ji = -k$, etc. Order 8, non-abelian. **Every subgroup of $Q_8$ is normal** (a rare feature for non-abelian groups).

---

## 3.4 Non-Examples

Always useful to see what *fails* an axiom:

- $(\mathbb{N}, +)$: no identity (if we take $\mathbb{N} = \{1, 2, \ldots\}$); alternatively, no inverses if we include $0$.
- $(\mathbb{Z}, \cdot)$: $2$ has no inverse (its inverse would be $1/2 \notin \mathbb{Z}$). So $(\mathbb{Z}, \cdot)$ is a monoid, not a group.
- $(\mathbb{Z}, -)$: subtraction is not associative: $(5 - 3) - 2 = 0$ but $5 - (3 - 2) = 4$.
- All $2\times 2$ matrices under $\cdot$: the zero matrix has no inverse.
- $(\mathbb{Z}_n, \cdot)$: not a group — $0$ has no inverse. Restricting to $U(n) \subset \mathbb{Z}_n$ (units) fixes this.

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

**Pattern:** primes $p$ have exactly 1 group ($\mathbb{Z}_p$); $p^2$ has 2; odd order $pq$ ($p < q$) has 1 or 2 depending on whether $q \equiv 1 \pmod p$.

---

## 3.6 Worked Examples

**Example 13 (Verifying group axioms — rationals under $*$).** Show $(\mathbb{Q} \setminus \{-1\}, *)$ with $a * b = a + b + ab$ is an abelian group.

*Solution.*
- **Closure:** Need $a * b \neq -1$. Check: $a + b + ab = -1 \iff (1 + a)(1 + b) = 0 \iff a = -1$ or $b = -1$. Both excluded. ✓
- **Associative:** $(a * b) * c = (a+b+ab) + c + (a+b+ab)c = a + b + c + ab + ac + bc + abc$ symmetric in $a, b, c$, hence equals $a * (b*c)$. ✓
- **Identity:** $e = 0$: $a * 0 = a + 0 + 0 = a$. ✓
- **Inverse:** $a * a' = 0 \Rightarrow a' = -a/(1+a)$, defined since $a \neq -1$. Need $a' \neq -1$: $-a/(1+a) = -1 \Rightarrow a = 1 + a \Rightarrow 0 = 1$, impossible. ✓
- **Commutative** ✓

$(\mathbb{Q} \setminus \{-1\}, *)$ is an abelian group. $\blacksquare$

**Example 14 ($GL_2$ is a group).** Verify $(GL_2(\mathbb{R}), \cdot)$ is a group.

*Solution.*
- **Closure:** If $\det A \neq 0$, $\det B \neq 0$, then $\det(AB) = \det A \det B \neq 0$. ✓
- **Associative:** matrix multiplication is always associative. ✓
- **Identity:** $I_2 = \begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix}$. ✓
- **Inverse:** if $\det A \neq 0$, $A^{-1}$ exists with $\det A^{-1} = 1/\det A \neq 0$. ✓
- **Non-abelian:** $\begin{pmatrix} 1 & 1 \\ 0 & 1 \end{pmatrix} \begin{pmatrix} 1 & 0 \\ 1 & 1 \end{pmatrix} = \begin{pmatrix} 2 & 1 \\ 1 & 1 \end{pmatrix}$ but $\begin{pmatrix} 1 & 0 \\ 1 & 1 \end{pmatrix} \begin{pmatrix} 1 & 1 \\ 0 & 1 \end{pmatrix} = \begin{pmatrix} 1 & 1 \\ 1 & 2 \end{pmatrix}$. ✓

$\blacksquare$

**Example 15 (Left-inverse equals right-inverse — fact).** Show that in a group, if $ba = e$, then $ab = e$ as well (one-sided inverses coincide).

*Solution.* Since inverses exist, let $a^{-1}$ denote the two-sided inverse. Then $b = b(aa^{-1}) = (ba)a^{-1} = e a^{-1} = a^{-1}$. Hence $ab = a a^{-1} = e$. $\blacksquare$

**Remark.** This means: in proving a set with an operation forms a group, it suffices to verify one-sided identity and one-sided inverses (with the same side). A common time-saver.

**Example 16 (Group of order 4 is abelian).** Show every group of order 4 is abelian.

*Solution.* $G = \{e, a, b, c\}$. By Lagrange (proved later in [[09-cosets-and-lagranges-theorem]]), every element's order divides 4, so it's 1, 2, or 4.
- If some element has order 4, $G$ is cyclic, hence abelian.
- Else every non-identity has order 2: $a^2 = b^2 = c^2 = e$. Then $a^{-1} = a$ etc.

Consider $ab$. It's not $e$ (else $b = a^{-1} = a$, contradiction). Not $a$ (else $b = e$). Not $b$ (else $a = e$). So $ab = c$. By symmetry, $ba = c$, $ac = b$, $ca = b$, etc. So $ab = ba$. $G$ is abelian (isomorphic to $V_4$). $\blacksquare$

**Example 17 (A group from a functional equation).** The set $\{f_1, f_2, \ldots, f_6\}$ of rational functions:
$$f_1(x) = x, \quad f_2(x) = \frac{1}{1-x}, \quad f_3(x) = \frac{x-1}{x}, \quad f_4(x) = \frac{1}{x}, \quad f_5(x) = 1-x, \quad f_6(x) = \frac{x}{x-1}$$
is closed under composition. Verify it's a group isomorphic to $S_3$.

*Solution.* Compute $f_2 \circ f_2$: $f_2(1/(1-x)) = 1/(1 - 1/(1-x)) = (1-x)/((1-x) - 1) = (1-x)/(-x) = (x-1)/x = f_3$. So $f_2^2 = f_3$, $f_2^3 = f_1$. $|f_2| = 3$. Check $f_4^2 = f_1$, so $|f_4| = 2$. $f_4 f_2 = ?$: $f_4(f_2(x)) = (1-x)$... let me compute: $f_4(1/(1-x)) = 1 - x = f_5$. And $f_2 f_4(x) = f_2(1/x) = 1/(1 - 1/x) = x/(x-1) = f_6$. So $f_4 f_2 \neq f_2 f_4$. Non-abelian, order 6: isomorphic to $S_3 = D_3$. $\blacksquare$

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

**Solution 1.** Identity: $a + e - 5 = a \Rightarrow e = 5$. Inverse: $a + a' - 5 = 5 \Rightarrow a' = 10 - a$. Associative: $(a * b) * c = (a + b - 5) + c - 5 = a + b + c - 10$, same as $a * (b * c)$. ✓ Commutative ✓. Abelian group. $\blacksquare$

**Solution 2.** Closure: $(\pm 1)(\pm i) = \pm i$, $i^2 = -1$, $i \cdot (-i) = 1$, etc. Identity $1$. Inverses: $i^{-1} = -i$, $(-1)^{-1} = -1$. Order of $i$ is 4, so $G$ is cyclic of order 4, i.e., $G \cong \mathbb{Z}_4$. $\blacksquare$

**Solution 3.** $a^2 = e$ means $a = a^{-1}$. For any $a, b \in G$:
$$ab = (ab)^{-1} = b^{-1}a^{-1} = ba.$$
So $G$ is abelian. $\blacksquare$

**Solution 4.** $(ba)(a^{-1}b^{-1}) = b(aa^{-1})b^{-1} = bb^{-1} = e$, and similarly on the other side. So $a^{-1}b^{-1} = (ba)^{-1}$. $\blacksquare$

**Solution 5.** Up to isomorphism, 2 groups of order 6: $\mathbb{Z}_6$ (cyclic, abelian) and $S_3 = D_3$ (non-abelian). *Proof outline:* by Cauchy's theorem, $G$ has elements of orders 2 and 3. If these commute, $G$ has an element of order 6, so $G = \mathbb{Z}_6$. Else $G$ has structure $\langle r, s \mid r^3 = s^2 = 1, srs = r^{-1}\rangle = D_3$. $\blacksquare$

**Solution 6.** *Addition:* $G$ as defined excludes $0$, so not closed under subtraction. Including 0: $\mathbb{Q}(\sqrt 2) = \{a + b\sqrt 2\}$ is a group under $+$. *Multiplication:* $(a + b\sqrt 2)(c + d\sqrt 2) = (ac + 2bd) + (ad + bc)\sqrt 2 \in G$. Identity $1$. Inverse: $(a + b\sqrt 2)^{-1} = (a - b\sqrt 2)/(a^2 - 2b^2)$; nonzero denominator since $\sqrt 2 \notin \mathbb{Q}$. So $G \setminus \{0\}$ is a multiplicative group. $\blacksquare$

**Solution 7.** Let $|a| = n$, so $a^n = e$. Then $(a^{-1})^n = a^{-n} = (a^n)^{-1} = e^{-1} = e$. So $|a^{-1}|$ divides $n$. Conversely, if $(a^{-1})^k = e$, then $a^k = e$, so $|a|$ divides $k$. Hence $|a^{-1}| = |a|$. $\blacksquare$

---

## 3.8 Cross-References

**Previous:** [[01-operations-and-algebraic-structures]], [[02-symmetries-of-the-plane]]

**Next:**
- [[04-subgroups-generators-cayley-diagrams]] — studying groups via their subgroups
- [[05-permutation-and-dihedral-groups]] — the most important infinite family of non-abelian groups
- [[06-cyclic-groups-and-order]] — the simplest non-trivial groups
