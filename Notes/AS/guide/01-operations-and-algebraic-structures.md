# 1. Operations on a Set & Algebraic Structures

> **Context.** Abstract algebra studies *sets equipped with operations* and the rules those operations obey. Before groups, rings, or fields, we need the language of **binary operations**: what it means to "combine" two elements, what properties those combinations can have, and how to check those properties on concrete examples.

---

## 1.1 Binary Operations

> **Definition (Binary operation).** Let $S$ be a non-empty set. A **binary operation** on $S$ is a function
> $$* : S \times S \to S, \qquad (a, b) \mapsto a * b.$$
> Equivalently: a rule that takes two inputs from $S$ and returns a single output in $S$.

The key phrase is **"returns an output in $S$"** — this is the **closure** requirement, baked into the definition.

**Example 1 (Addition on $\mathbb{Z}$).** Define $+ : \mathbb{Z} \times \mathbb{Z} \to \mathbb{Z}$ by ordinary addition.

*Verification that $+$ is a binary operation.* We must check two things:
1. **Well-defined.** For any $a, b \in \mathbb{Z}$, the expression $a + b$ denotes a specific integer (no ambiguity). ✓
2. **Closed.** $\mathbb{Z}$ is closed under addition: the sum of two integers is an integer. ✓

Hence $+$ is a binary operation on $\mathbb{Z}$.

**Example 2 (Subtraction fails on $\mathbb{N}$).** Consider $- : \mathbb{N} \times \mathbb{N} \to ?$ on $\mathbb{N} = \{1, 2, 3, \ldots\}$.

Pick $a = 2, b = 5$. Then $a - b = 2 - 5 = -3 \notin \mathbb{N}$.

Since the output $-3$ is not in the source set $\mathbb{N}$, the function $-$ does **not** map $\mathbb{N} \times \mathbb{N}$ into $\mathbb{N}$. **Subtraction is not a binary operation on $\mathbb{N}$.**

However, $-$ *is* a binary operation on $\mathbb{Z}$: for any $a, b \in \mathbb{Z}$, $a - b \in \mathbb{Z}$.

**Example 3 (Division on $\mathbb{R}^\times$).** Define $\div : \mathbb{R}^\times \times \mathbb{R}^\times \to \mathbb{R}^\times$ where $\mathbb{R}^\times = \mathbb{R} \setminus \{0\}$.

*Check well-defined.* For $a, b \in \mathbb{R}^\times$: $b \neq 0$, so $a/b$ is a defined real number. ✓
*Check closed.* Is $a/b \neq 0$? Since $a \neq 0$, $a/b = 0$ would force $a = 0$ (multiplying by $b$). So $a/b \neq 0$, i.e., $a/b \in \mathbb{R}^\times$. ✓

Hence $\div$ is a binary operation on $\mathbb{R}^\times$. Note that $\div$ is **not** a binary operation on $\mathbb{R}$ (division by $0$ undefined).

**Example 4 (Matrix multiplication).** The map $\cdot : M_n(\mathbb{R}) \times M_n(\mathbb{R}) \to M_n(\mathbb{R})$, $(A, B) \mapsto AB$, is a binary operation on the set of $n \times n$ real matrices.

*Closure.* For $n \times n$ matrices $A, B$, the product $AB$ is defined (column count of $A$ = row count of $B$ = $n$), and $AB$ is again $n \times n$. ✓

**Example 5 (Cross product on $\mathbb{R}^3$).** $\vec{a} \times \vec{b}$ yields another vector in $\mathbb{R}^3$, so $\times$ is a binary operation on $\mathbb{R}^3$.

**Example 6 (Function composition).** On the set $S^S = \{f : S \to S\}$ of all functions from $S$ to itself, composition $\circ$ defined by $(f \circ g)(x) = f(g(x))$ is a binary operation.

*Well-defined.* For $f, g : S \to S$ and $x \in S$: $g(x) \in S$, so $f(g(x))$ is defined and lies in $S$. ✓
*Closed.* $f \circ g$ is a function $S \to S$, i.e., an element of $S^S$. ✓

---

## 1.2 Properties of Binary Operations

Given a binary operation $*$ on a set $S$, we ask: **what structural properties does it have?**

> **Definition (Associativity).** $*$ is **associative** on $S$ if
> $$\forall a, b, c \in S : (a * b) * c = a * (b * c).$$

> **Definition (Commutativity).** $*$ is **commutative** on $S$ if
> $$\forall a, b \in S : a * b = b * a.$$

> **Definition (Identity element).** An element $e \in S$ is an **identity** for $*$ if
> $$\forall a \in S : a * e = e * a = a.$$

> **Definition (Inverse element).** Given an identity $e$, an element $a' \in S$ is an **inverse** of $a \in S$ if
> $$a * a' = a' * a = e.$$

**Why two-sided?** Asking $a * e = a$ only is a **right-identity**; $e * a = a$ is a **left-identity**. The definition above demands both. In a general (non-commutative) setting, one-sided identities need not be two-sided, but in a group we always mean two-sided.

**Observation.** Commutativity is optional; matrix multiplication is a classic non-commutative example. Let
$$A = \begin{pmatrix} 0 & 1 \\ 0 & 0 \end{pmatrix}, \quad B = \begin{pmatrix} 0 & 0 \\ 1 & 0 \end{pmatrix}.$$
Then
$$AB = \begin{pmatrix} 0 \cdot 0 + 1 \cdot 1 & 0 \cdot 0 + 1 \cdot 0 \\ 0 \cdot 0 + 0 \cdot 1 & 0 \cdot 0 + 0 \cdot 0 \end{pmatrix} = \begin{pmatrix} 1 & 0 \\ 0 & 0 \end{pmatrix},$$
$$BA = \begin{pmatrix} 0 \cdot 0 + 0 \cdot 0 & 0 \cdot 1 + 0 \cdot 0 \\ 1 \cdot 0 + 0 \cdot 0 & 1 \cdot 1 + 0 \cdot 0 \end{pmatrix} = \begin{pmatrix} 0 & 0 \\ 0 & 1 \end{pmatrix}.$$
$AB \neq BA$, confirming non-commutativity.

---

## 1.3 Uniqueness Theorems

> **Theorem 1.1 (Uniqueness of identity).** If $*$ is a binary operation on $S$ with an identity element, then the identity is unique.

**Proof.** Suppose $e, e' \in S$ are both identities for $*$.

Since $e$ is an identity, applying it with $a = e'$:
$$e * e' = e' \quad \text{(e is an identity; } e * a = a \text{ with } a = e').$$

Since $e'$ is an identity, applying it with $a = e$:
$$e * e' = e \quad \text{(e' is an identity; } a * e' = a \text{ with } a = e).$$

Both expressions equal $e * e'$, so $e = e * e' = e'$. Hence $e = e'$.

Therefore the identity, if it exists, is unique. $\blacksquare$

**Why this works without associativity.** We only needed the *identity* property applied in two places; no re-bracketing was required. Compare with the next theorem, which *does* require associativity.

---

> **Theorem 1.2 (Uniqueness of inverse, given associativity).** Let $*$ be **associative** on $S$ with identity $e$. If $a \in S$ has an inverse, it is unique.

**Proof.** Suppose $a', a''$ are both inverses of $a$, so:
$$a * a' = a' * a = e, \qquad a * a'' = a'' * a = e.$$

We compute $a'$ in two ways:
$$a' = a' * e \quad \text{(e is identity)}$$
$$\phantom{a'} = a' * (a * a'') \quad \text{(since } a * a'' = e)$$
$$\phantom{a'} = (a' * a) * a'' \quad \text{(associativity — this is the key step!)}$$
$$\phantom{a'} = e * a'' \quad \text{(since } a' * a = e)$$
$$\phantom{a'} = a'' \quad \text{(e is identity)}.$$

Hence $a' = a''$. The inverse, if it exists, is unique. $\blacksquare$

**Why associativity is essential.** Without associativity, the step $(a' * e) \to (a' * a) * a''$ would not equal $a' * (a * a'')$. Inverse uniqueness can genuinely fail in non-associative algebras — this is why groups demand associativity as an axiom.

**Remark.** In a group (where associativity is axiomatic), we write $a^{-1}$ unambiguously for **the** inverse of $a$.

---

## 1.4 Cayley Tables (Multiplication Tables)

For a finite set $S = \{a_1, \ldots, a_n\}$ with a binary operation $*$, the **Cayley table** records all products $a_i * a_j$ in an $n \times n$ grid:

$$
\begin{array}{c|cccc}
* & a_1 & a_2 & \cdots & a_n \\
\hline
a_1 & a_1 * a_1 & a_1 * a_2 & \cdots & a_1 * a_n \\
a_2 & a_2 * a_1 & a_2 * a_2 & \cdots & a_2 * a_n \\
\vdots & & & & \\
a_n & a_n * a_1 & \cdots & & a_n * a_n
\end{array}
$$

**Convention.** Entry in row $a_i$, column $a_j$ is $a_i * a_j$ (row first).

**Example 7 (Cayley table of $(\mathbb{Z}_4, +)$).** For $\mathbb{Z}_4 = \{0, 1, 2, 3\}$ with addition mod $4$:

$$
\begin{array}{c|cccc}
+ & 0 & 1 & 2 & 3 \\
\hline
0 & 0 & 1 & 2 & 3 \\
1 & 1 & 2 & 3 & 0 \\
2 & 2 & 3 & 0 & 1 \\
3 & 3 & 0 & 1 & 2
\end{array}
$$

*Sample entries.* Row $2$, column $3$: $2 + 3 = 5 \equiv 1 \pmod 4$. ✓
Row $3$, column $3$: $3 + 3 = 6 \equiv 2 \pmod 4$. ✓

**Observations:**

*(a) Each row and each column is a permutation of $\{0, 1, 2, 3\}$.* This is the **Latin square property** — a hallmark of group tables.

*(b) The identity is $0$.* Row $0$ reads $0, 1, 2, 3$ (unchanged); column $0$ reads $0, 1, 2, 3$ (unchanged). So $0 + a = a + 0 = a$. ✓

*(c) Inverses.* The inverse of $a$ is the element $b$ with $a + b = 0$:
- $0^{-1} = 0$ (since $0 + 0 = 0$).
- $1^{-1} = 3$ (since $1 + 3 = 4 \equiv 0$).
- $2^{-1} = 2$ (since $2 + 2 = 4 \equiv 0$).
- $3^{-1} = 1$ (since $3 + 1 = 4 \equiv 0$).

*(d) Symmetric about the diagonal* ⟹ commutative.

**Theorem 1.3 (Latin square property for groups).** In a group's Cayley table, every element of the group appears *exactly once* in each row and each column.

*Proof sketch.* In row $a$: the row lists $a * a_1, a * a_2, \ldots, a * a_n$. These are all distinct (suppose $a * a_i = a * a_j$; left-cancel — valid in a group — to get $a_i = a_j$). Since there are $n$ distinct entries from an $n$-element set, each element appears exactly once. Similar for columns. Full proof in [[03-groups-definition-and-examples]].

---

## 1.5 Algebraic Structures — A Hierarchy

Binary operations plus properties give *algebraic structures*. The following is the hierarchy that drives this entire guide:

| Structure       | Operations      | Axioms                                                                                       |
| --------------- | --------------- | -------------------------------------------------------------------------------------------- |
| **Semigroup**   | $*$             | associative                                                                                  |
| **Monoid**      | $*$             | associative + identity                                                                       |
| **Group**       | $*$             | associative + identity + inverses                                                            |
| **Abelian group** | $*$           | Group + commutative                                                                          |
| **Ring**        | $+, \cdot$      | $(R, +)$ abelian group; $(R, \cdot)$ semigroup; distributivity                               |
| **Commutative ring** | $+, \cdot$ | Ring + $\cdot$ commutative                                                                   |
| **Integral domain** | $+, \cdot$  | Commutative ring with unity + no zero divisors                                               |
| **Field**       | $+, \cdot$      | Commutative ring with unity + every nonzero element has $\cdot$-inverse                      |

Our sequence follows this hierarchy: Part A (Files 3–18) covers groups, Part B (Files 19–28) covers rings and fields.

---

## 1.6 Worked Examples

**Example 8.** Define $a * b = a + b - ab$ on $\mathbb{R}$. Check: associative? commutative? identity? inverses?

*Solution.*

**Closure.** For $a, b \in \mathbb{R}$: $a + b - ab \in \mathbb{R}$ (real numbers closed under $+, -, \cdot$). ✓

**Commutativity.** $a * b = a + b - ab$ and $b * a = b + a - ba$. Since $+$ and $\cdot$ are commutative on $\mathbb{R}$, $a + b = b + a$ and $ab = ba$, so $a * b = b * a$. ✓

**Associativity.** Compute both bracketings.

*Left bracketing.*
$$(a * b) * c = (a + b - ab) * c = (a + b - ab) + c - (a + b - ab) c.$$
Expand $(a + b - ab) c = ac + bc - abc$:
$$(a * b) * c = a + b - ab + c - ac - bc + abc = a + b + c - ab - ac - bc + abc.$$

*Right bracketing.*
$$a * (b * c) = a * (b + c - bc) = a + (b + c - bc) - a(b + c - bc).$$
Expand $a(b + c - bc) = ab + ac - abc$:
$$a * (b * c) = a + b + c - bc - ab - ac + abc = a + b + c - ab - ac - bc + abc.$$

Both equal $a + b + c - ab - ac - bc + abc$ — symmetric in $a, b, c$. So $*$ is associative. ✓

**Identity.** Seek $e \in \mathbb{R}$ with $a * e = a$ for all $a$:
$$a + e - ae = a \iff e(1 - a) = 0.$$

For this to hold *for every* $a \in \mathbb{R}$, we need $e = 0$ (otherwise for $a \neq 1$ we'd need $e = 0$). Check: $a * 0 = a + 0 - a \cdot 0 = a$ ✓ and $0 * a = 0 + a - 0 \cdot a = a$ ✓. So $e = 0$ is the identity.

**Inverses.** Given $a \in \mathbb{R}$, seek $a' \in \mathbb{R}$ with $a * a' = 0$:
$$a + a' - a a' = 0 \iff a'(1 - a) = -a \iff a' = \frac{-a}{1 - a} = \frac{a}{a - 1}, \quad a \neq 1.$$

For $a = 1$: the equation becomes $1 + a' - a' = 0$, i.e., $1 = 0$ — impossible. So $a = 1$ has no inverse.

**Interpretation.** $(\mathbb{R}, *)$ is not a group (the element $1$ lacks an inverse). But $(\mathbb{R} \setminus \{1\}, *)$ is a group.

*Closure check for $\mathbb{R} \setminus \{1\}$:* if $a, b \neq 1$, is $a * b = a + b - ab \neq 1$? Compute $a * b - 1 = a + b - ab - 1 = -(1 - a)(1 - b)$. Since $a \neq 1, b \neq 1$, $(1 - a), (1 - b) \neq 0$, so the product is non-zero, hence $a * b \neq 1$. ✓

So $(\mathbb{R} \setminus \{1\}, *)$ is an abelian group. In fact, the map $\varphi: \mathbb{R} \setminus \{1\} \to \mathbb{R}^\times$, $\varphi(a) = 1 - a$, is a group isomorphism (check: $\varphi(a * b) = 1 - (a + b - ab) = (1 - a)(1 - b) = \varphi(a)\varphi(b)$).

$\blacksquare$

---

**Example 9.** On $\mathbb{Z}$, define $a * b = a + b + 1$. Is this a group operation?

*Solution.*

**Closure.** $a + b + 1 \in \mathbb{Z}$ for all $a, b \in \mathbb{Z}$. ✓

**Associativity.**
$$(a * b) * c = (a + b + 1) * c = (a + b + 1) + c + 1 = a + b + c + 2.$$
$$a * (b * c) = a * (b + c + 1) = a + (b + c + 1) + 1 = a + b + c + 2.$$
Both equal $a + b + c + 2$. ✓

**Commutativity.** $a * b = a + b + 1 = b + a + 1 = b * a$. ✓

**Identity.** Seek $e$ with $a + e + 1 = a$, i.e., $e = -1$. Check $-1 \in \mathbb{Z}$: ✓. Verify: $a * (-1) = a - 1 + 1 = a$ ✓ and $(-1) * a = -1 + a + 1 = a$ ✓.

**Inverses.** Given $a$, seek $a'$ with $a * a' = -1$:
$$a + a' + 1 = -1 \iff a' = -a - 2.$$
Check $a' \in \mathbb{Z}$: ✓. Verify: $a * (-a - 2) = a - a - 2 + 1 = -1$ ✓.

**Conclusion.** $(\mathbb{Z}, *)$ is an abelian group with identity $-1$ and $a^{-1} = -a - 2$.

**Relation to $(\mathbb{Z}, +)$.** Define $\varphi : \mathbb{Z} \to \mathbb{Z}$ by $\varphi(n) = n + 1$. Then:
$$\varphi(m + n) = m + n + 1, \qquad \varphi(m) * \varphi(n) = (m + 1) * (n + 1) = (m + 1) + (n + 1) + 1 = m + n + 3.$$
These don't match. Let's try $\varphi(n) = n - 1$: $\varphi(m + n) = m + n - 1$, $\varphi(m) * \varphi(n) = (m - 1) + (n - 1) + 1 = m + n - 1$. ✓ So $\varphi(n) = n - 1$ is a group isomorphism $(\mathbb{Z}, +) \to (\mathbb{Z}, *)$. (Preview of [[17-homomorphisms-and-isomorphisms]].)

$\blacksquare$

---

**Example 10.** Define $a * b = \max(a, b)$ on $\mathbb{N} = \{1, 2, 3, \ldots\}$. Check properties.

*Solution.*

**Commutativity.** $\max(a, b) = \max(b, a)$ by definition of max. ✓

**Associativity.** $\max(\max(a, b), c) = \max(a, b, c) = \max(a, \max(b, c))$. Both equal the largest among $\{a, b, c\}$. ✓

**Identity.** Seek $e \in \mathbb{N}$ with $\max(a, e) = a$ for all $a \in \mathbb{N}$. This requires $e \leq a$ for all $a \in \mathbb{N}$. The smallest element of $\mathbb{N}$ is $1$; for $a = 1$, we need $e \leq 1$, so $e = 1$. Check: $\max(a, 1) = a$ for all $a \geq 1$ ✓.

Wait — so $e = 1$ *does* work! The claim that $(\mathbb{N}, \max)$ has no identity was incorrect. Let me correct: if $\mathbb{N} = \{1, 2, 3, \ldots\}$, then $1$ is the identity for $\max$.

But if $\mathbb{N} = \{0, 1, 2, \ldots\}$ (including $0$), then $0$ is the identity.

**Inverses.** Given identity $e = 1$ (or $0$), seek $a'$ with $\max(a, a') = 1$. Since $\max(a, a') \geq a$, we need $a \leq 1$, i.e., only $a = 1$ has an inverse (namely $a' = 1$). No non-trivial inverses exist.

**Conclusion.** $(\mathbb{N}, \max)$ is a commutative monoid but not a group. $\blacksquare$

*Remark on $(\mathbb{R}, \max)$.* $\mathbb{R}$ has no smallest element, so there is no $e \in \mathbb{R}$ with $e \leq a$ for all $a \in \mathbb{R}$. Hence $(\mathbb{R}, \max)$ has no identity, and is only a commutative semigroup.

---

**Example 11 (Non-associative subtraction).** On $\mathbb{Z}$, define $a * b = a - b$.

*Check associativity by counterexample.*
$$(2 * 3) * 4 = (2 - 3) * 4 = (-1) * 4 = -1 - 4 = -5.$$
$$2 * (3 * 4) = 2 * (3 - 4) = 2 * (-1) = 2 - (-1) = 3.$$

$-5 \neq 3$, so subtraction is **not associative**.

**Important consequence.** In a non-associative setting, the expression "$a * b * c$" is ambiguous — we *must* write parentheses. Worse, inverse uniqueness (Theorem 1.2) fails, and we cannot simplify $(a * b) * a^{-1}$ reliably.

---

**Example 12 (Cross product is non-associative).** On $\mathbb{R}^3$, the cross product $\times$ is not associative.

*Counter-identity.* The **BAC–CAB rule**:
$$\vec{a} \times (\vec{b} \times \vec{c}) = \vec{b}(\vec{a} \cdot \vec{c}) - \vec{c}(\vec{a} \cdot \vec{b}).$$

If $\times$ were associative, $\vec{a} \times (\vec{b} \times \vec{c}) = (\vec{a} \times \vec{b}) \times \vec{c}$. But the LHS is a linear combination of $\vec{b}, \vec{c}$, while by the same rule with roles switched,
$$(\vec{a} \times \vec{b}) \times \vec{c} = -\vec{c} \times (\vec{a} \times \vec{b}) = -\vec{a}(\vec{c} \cdot \vec{b}) + \vec{b}(\vec{c} \cdot \vec{a})$$
is a linear combination of $\vec{a}, \vec{b}$. Generally these are not equal.

*Concrete counterexample.* $\vec e_1 \times (\vec e_1 \times \vec e_2) = \vec e_1 \times \vec e_3 = -\vec e_2$, but $(\vec e_1 \times \vec e_1) \times \vec e_2 = \vec 0 \times \vec e_2 = \vec 0$. Not equal. ✓

$(\mathbb{R}^3, \times)$ is a **Lie algebra**, not a group — a different kind of algebraic structure.

---

## 1.7 Practice Problems

1. On $\mathbb{Q}$, define $a * b = a + b + ab$. Is $*$ a binary operation? Associative? Is there an identity? Find inverses where possible.
2. Is $(\mathbb{R}, \max)$ a monoid? What about $(\mathbb{R}_{\geq 0}, \max)$?
3. On the set $S = \{0, 1, 2\}$ define $a * b = (a + b + ab) \bmod 3$. Write the Cayley table. Is $*$ commutative? Associative? Is there an identity?
4. Prove that the composition of functions $\circ$ on $S^S$ is associative.
5. Show that if $*$ is associative and commutative on $S$, and $a, b, c, d \in S$, then $(a * b) * (c * d) = (a * c) * (b * d)$.
6. Give a binary operation on $\{0, 1\}$ that has no identity.

### Solutions

**Solution 1.** Define $a * b = a + b + ab$ on $\mathbb{Q}$.

*Closure.* $a + b + ab \in \mathbb{Q}$ since $\mathbb{Q}$ is closed under $+, \cdot$. ✓

*Associativity.*
$$(a * b) * c = (a + b + ab) * c = (a + b + ab) + c + (a + b + ab) c.$$
Expand $(a + b + ab) c = ac + bc + abc$:
$$(a * b) * c = a + b + c + ab + ac + bc + abc.$$

$$a * (b * c) = a * (b + c + bc) = a + (b + c + bc) + a(b + c + bc).$$
Expand $a(b + c + bc) = ab + ac + abc$:
$$a * (b * c) = a + b + c + bc + ab + ac + abc.$$

Both equal $a + b + c + ab + ac + bc + abc$, symmetric in $a, b, c$. Associative ✓.

*Trick identity.* Notice $a * b + 1 = a + b + ab + 1 = (1 + a)(1 + b)$. So if we set $\psi(a) = 1 + a$, then $\psi(a * b) = \psi(a) \psi(b)$ — multiplication on $\mathbb{Q}$ modulo a shift. This is the fastest proof of associativity.

*Commutativity.* $a * b = a + b + ab = b + a + ba = b * a$. ✓

*Identity.* Seek $e$ with $a + e + ae = a$, i.e., $e(1 + a) = 0$ for all $a$. Requires $e = 0$. Check: $a * 0 = a + 0 + 0 = a$ ✓. Identity is $e = 0$.

*Inverses.* Given $a$, seek $a'$ with $a + a' + a a' = 0$:
$$a'(1 + a) = -a \iff a' = \frac{-a}{1 + a}, \quad a \neq -1.$$

For $a = -1$: $-1 + a' - a' = -1 \neq 0$ — no solution. So $a = -1$ has no inverse.

*Verifying $(\mathbb{Q} \setminus \{-1\}, *)$ is a group.* Need closure: if $a, b \neq -1$, is $a * b \neq -1$? Compute $a * b + 1 = (1 + a)(1 + b)$; since $a \neq -1, b \neq -1$, both $(1 + a), (1 + b) \neq 0$, so $(1 + a)(1 + b) \neq 0$, so $a * b \neq -1$. ✓

Hence $(\mathbb{Q} \setminus \{-1\}, *)$ is an abelian group with identity $0$ and $a^{-1} = -a/(1 + a)$. $\blacksquare$

---

**Solution 2.** $(\mathbb{R}, \max)$: commutative ✓, associative ✓. Identity? Need $e \leq a$ for all $a \in \mathbb{R}$; but $\mathbb{R}$ is unbounded below, so no such $e$ exists in $\mathbb{R}$. **Not a monoid.**

$(\mathbb{R}_{\geq 0}, \max)$: same checks, plus identity $e = 0$ (since $0 \leq a$ for all $a \geq 0$, and $\max(a, 0) = a$). **Is a commutative monoid.** Inverses: $\max(a, a') = 0$ requires $a \leq 0$, so only $a = 0$ has an inverse. Not a group. $\blacksquare$

---

**Solution 3.** On $S = \{0, 1, 2\}$, define $a * b = (a + b + ab) \bmod 3$.

*Compute entries.*
- $0 * 0 = 0 + 0 + 0 = 0$.
- $0 * 1 = 0 + 1 + 0 = 1$.
- $0 * 2 = 0 + 2 + 0 = 2$.
- $1 * 1 = 1 + 1 + 1 = 3 \equiv 0$.
- $1 * 2 = 1 + 2 + 2 = 5 \equiv 2$.
- $2 * 2 = 2 + 2 + 4 = 8 \equiv 2$.

Full table:
$$
\begin{array}{c|ccc}
* & 0 & 1 & 2 \\
\hline
0 & 0 & 1 & 2 \\
1 & 1 & 0 & 2 \\
2 & 2 & 2 & 2
\end{array}
$$

*Commutative?* Table symmetric about the diagonal: $1 * 2 = 2 = 2 * 1$ ✓; $0 * 1 = 1 = 1 * 0$ ✓; etc. Commutative. ✓

*Identity.* Row $0$: $0, 1, 2$ (same as the header). Column $0$: $0, 1, 2$. So $0$ is the identity. ✓

*Associativity.* Use the identity $a * b + 1 \equiv (1 + a)(1 + b) \pmod 3$ (same as Solution 1, but mod $3$). So
$$1 + ((a * b) * c) \equiv (1 + a * b)(1 + c) \equiv (1 + a)(1 + b)(1 + c) \pmod 3,$$
symmetric in $a, b, c$. Hence $*$ is associative. ✓

*Inverses.* Solve $a * a' = 0$, i.e., $(1 + a)(1 + a') \equiv 1 \pmod 3$.
- $a = 0$: $(1)(1 + a') \equiv 1 \Rightarrow a' = 0$. ✓
- $a = 1$: $(2)(1 + a') \equiv 1 \pmod 3 \Rightarrow 1 + a' \equiv 2$ (since $2 \cdot 2 = 4 \equiv 1$) $\Rightarrow a' = 1$. ✓
- $a = 2$: $(3)(1 + a') \equiv 1 \pmod 3 \Rightarrow 0 \equiv 1$, contradiction. No inverse.

So $0$ and $1$ have inverses, $2$ does not. $(S, *)$ is a commutative monoid, not a group.

*Note on $2$.* In terms of $1 + a$: $1 + 2 = 3 \equiv 0 \pmod 3$. So $2$ corresponds to the "element $0$" under the shift, which is exactly the non-unit of $(\mathbb{Z}/3\mathbb{Z}, \cdot)$. $\blacksquare$

---

**Solution 4.** Show $\circ$ on $S^S$ is associative. Let $f, g, h \in S^S$.

For any $x \in S$:
$$((f \circ g) \circ h)(x) = (f \circ g)(h(x)) \quad \text{(definition of outer composition)}$$
$$\phantom{((f \circ g) \circ h)(x)} = f(g(h(x))) \quad \text{(definition of inner composition)}.$$

$$(f \circ (g \circ h))(x) = f((g \circ h)(x)) \quad \text{(definition of outer composition)}$$
$$\phantom{(f \circ (g \circ h))(x)} = f(g(h(x))) \quad \text{(definition of inner composition)}.$$

Both equal $f(g(h(x)))$ for every $x \in S$. By the definition of equality of functions, $(f \circ g) \circ h = f \circ (g \circ h)$. $\blacksquare$

---

**Solution 5.** Given $*$ associative and commutative, show $(a * b) * (c * d) = (a * c) * (b * d)$.

Strategy: use associativity to regroup, commutativity to swap.

$$(a * b) * (c * d) \stackrel{\text{assoc}}{=} a * (b * (c * d)) \qquad (\text{move all brackets to the right})$$

$$\stackrel{\text{assoc}}{=} a * ((b * c) * d) \qquad (\text{re-bracket inside})$$

$$\stackrel{\text{comm}}{=} a * ((c * b) * d) \qquad (\text{swap } b, c)$$

$$\stackrel{\text{assoc}}{=} a * (c * (b * d)) \qquad (\text{re-bracket})$$

$$\stackrel{\text{assoc}}{=} (a * c) * (b * d) \qquad (\text{move bracket left})$$

Hence $(a * b) * (c * d) = (a * c) * (b * d)$. $\blacksquare$

*Remark.* In an abelian semigroup (or group), any product of elements can be rearranged arbitrarily. This identity is a baby version of that fact.

---

**Solution 6.** Define $* : \{0, 1\}^2 \to \{0, 1\}$ by $a * b = 0$ for all $a, b$.

Cayley table:
$$
\begin{array}{c|cc}
* & 0 & 1 \\
\hline
0 & 0 & 0 \\
1 & 0 & 0
\end{array}
$$

*Suppose $e$ is an identity.* Then $1 * e = 1$, but by the table $1 * e = 0$ (regardless of $e$). Contradiction. So no identity exists. $\blacksquare$

*Sanity check of associativity.* $(a * b) * c = 0 * c = 0$; $a * (b * c) = a * 0 = 0$. Equal. So this operation is associative. $(\{0, 1\}, *)$ is a commutative semigroup with no identity.

---

## 1.8 Cross-References

**Next:**
- [[02-symmetries-of-the-plane]] — symmetries as a motivating example for groups
- [[03-groups-definition-and-examples]] — the formal definition

**Later (forward references):**
- [[07-co1-practice-problems]] — problems on all CO1 topics
- [[19-rings-definition-and-examples]] — rings generalize the (+, ·) structure of $\mathbb{Z}$

**External:**
- [[01-vector-algebra-and-fields]] — dot and cross products as binary operations
