# 1. Operations on a Set & Algebraic Structures

> **Context.** Abstract algebra studies *sets equipped with operations* and the rules those operations obey. Before groups, rings, or fields, we need the language of **binary operations**: what it means to "combine" two elements, what properties those combinations can have, and how to check those properties on concrete examples.
>
> This opening chapter is a warm-up. Master it: every subsequent definition (group, subgroup, ring, ideal, field) reuses the same vocabulary — *closed*, *associative*, *identity*, *inverse*.

---

## 1.1 Binary Operations

> **Definition (Binary operation).** Let $S$ be a non-empty set. A **binary operation** on $S$ is a function
> $$* : S \times S \to S, \qquad (a, b) \mapsto a * b.$$
> Equivalently: a rule that takes two inputs from $S$ and returns a single output in $S$.

The key phrase is **"returns an output in $S$"** — this is the **closure** requirement, baked into the definition.

**Example 1.** Addition $+$ on $\mathbb{Z}$ is a binary operation: for any $a, b \in \mathbb{Z}$, $a + b \in \mathbb{Z}$.

**Example 2.** Subtraction $-$ on $\mathbb{N} = \{1, 2, 3, \ldots\}$ is **not** a binary operation: $2 - 5 = -3 \notin \mathbb{N}$. Subtraction fails closure on $\mathbb{N}$.

**Example 3.** Division $\div$ on $\mathbb{R}$ is **not** a binary operation (division by zero is undefined). But $\div$ is a binary operation on $\mathbb{R}^* = \mathbb{R} \setminus \{0\}$... wait, even this fails: $1 \div 2 = 0.5 \neq 0$, OK; $3 \div 4 = 0.75$, OK. Yes, $\div$ is a binary operation on $\mathbb{R}^*$ (closure holds — reciprocals and products of nonzero reals are nonzero).

**Example 4 (Matrix multiplication).** $\cdot$ on $M_n(\mathbb{R})$ (real $n \times n$ matrices) is a binary operation. For $A, B \in M_n(\mathbb{R})$, the product $AB \in M_n(\mathbb{R})$.

**Example 5 (Cross product on $\mathbb{R}^3$).** $\vec{a} \times \vec{b}$ is a binary operation on $\mathbb{R}^3$. (See [[01-vector-algebra-and-fields|VACV §1]].)

**Example 6 (Composition of functions).** On the set $S^S = \{f : S \to S\}$, composition $\circ$ is a binary operation: $(f \circ g)(x) = f(g(x))$.

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

**Observation.** Commutativity is optional; matrix multiplication is a classic non-commutative example: $\begin{pmatrix} 0 & 1 \\ 0 & 0 \end{pmatrix} \begin{pmatrix} 0 & 0 \\ 1 & 0 \end{pmatrix} = \begin{pmatrix} 1 & 0 \\ 0 & 0 \end{pmatrix}$ but $\begin{pmatrix} 0 & 0 \\ 1 & 0 \end{pmatrix} \begin{pmatrix} 0 & 1 \\ 0 & 0 \end{pmatrix} = \begin{pmatrix} 0 & 0 \\ 0 & 1 \end{pmatrix}$.

---

## 1.3 Uniqueness Theorems

> **Theorem 1.1 (Uniqueness of identity).** If $*$ is a binary operation on $S$ with an identity element, then the identity is unique.
>
> **Proof.** Suppose $e, e'$ are both identities. Then
> $$e = e * e' \quad \text{(since $e'$ is an identity)} \quad = e' \quad \text{(since $e$ is an identity)}.$$
> So $e = e'$. $\blacksquare$

> **Theorem 1.2 (Uniqueness of inverse, given associativity).** Let $*$ be **associative** on $S$ with identity $e$. If $a \in S$ has an inverse, it is unique.
>
> **Proof.** Suppose $a', a''$ are both inverses of $a$. Then
> $$a' = a' * e = a' * (a * a'') = (a' * a) * a'' = e * a'' = a''.$$
> The middle step uses associativity. Without associativity, the argument fails — and in fact inverses can be non-unique. $\blacksquare$

**Remark.** The inverse uniqueness proof is the first place where associativity does real work. In a group (where associativity is axiomatic), we write $a^{-1}$ unambiguously for **the** inverse of $a$.

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

**Example 7.** Addition on $\mathbb{Z}_4 = \{0, 1, 2, 3\}$:

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

Observations: (a) each row and each column is a permutation of $\{0,1,2,3\}$; (b) the identity is $0$ (row $0$ and column $0$ read out $0, 1, 2, 3$); (c) inverses: $0 \leftrightarrow 0$, $1 \leftrightarrow 3$, $2 \leftrightarrow 2$.

**Theorem 1.3 (Latin square property for groups).** In a group's Cayley table, every element of the group appears *exactly once* in each row and each column. [Proved in [[03-groups-definition-and-examples]].]

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
- **Commutative:** $a * b = a + b - ab = b + a - ba = b * a$. ✓
- **Associative:** $(a * b) * c = (a + b - ab) * c = (a + b - ab) + c - (a + b - ab)c = a + b + c - ab - ac - bc + abc$. By symmetry, $a * (b * c) = a + b + c - ab - ac - bc + abc$. Equal. ✓
- **Identity:** need $e$ with $a * e = a$, i.e., $a + e - ae = a$, so $e(1 - a) = 0$. Since this must hold for *all* $a$, set $e = 0$: then $a + 0 - 0 = a$. ✓ (Identity is $e = 0$.)
- **Inverses:** $a * a' = 0$ gives $a + a' - aa' = 0$, so $a' = -a/(1 - a)$, defined for $a \neq 1$.

So $(R, *)$ is *almost* a group — $a = 1$ has no inverse. In fact, $(\mathbb{R} \setminus \{1\}, *)$ is a group (check closure: if $a, b \neq 1$, is $a + b - ab \neq 1$? Yes, $a + b - ab - 1 = -(1 - a)(1 - b) \neq 0$).

**Example 9.** On $\mathbb{Z}$, define $a * b = a + b + 1$. Is this a group operation?

*Solution.*
- Closure ✓
- Associative: $(a * b) * c = (a + b + 1) * c = a + b + c + 2$; $a * (b * c) = a + (b + c + 1) + 1 = a + b + c + 2$. ✓
- Identity: $a + e + 1 = a \Rightarrow e = -1$. ✓
- Inverse: $a + a' + 1 = -1 \Rightarrow a' = -a - 2$. ✓ (Integer, always exists.)
- Commutative ✓

So $(\mathbb{Z}, *)$ is an abelian group with identity $-1$. This is actually *isomorphic* to $(\mathbb{Z}, +)$ via the map $\varphi(n) = n + 1$ — a preview of [[17-homomorphisms-and-isomorphisms]].

**Example 10.** Define $a * b = \max(a, b)$ on $\mathbb{N}$. Check properties.

*Solution.*
- Commutative ✓, associative ✓
- Identity? Need $e$ with $\max(a, e) = a$ for all $a$; requires $e \leq a$ for all $a \in \mathbb{N}$. No such $e \in \mathbb{N}$. ✗

So $(\mathbb{N}, \max)$ is a commutative semigroup without identity.

**Example 11 (Non-associative operation).** On $\mathbb{Z}$, $a * b = a - b$.
- $(2 * 3) * 4 = -1 * 4 = -5$
- $2 * (3 * 4) = 2 * (-1) = 3$

Not associative. Note: in a non-associative setting, "$a * b * c$" is ambiguous.

**Example 12 (Cross product is non-associative).** On $\mathbb{R}^3$, $\vec{a} \times (\vec{b} \times \vec{c}) \neq (\vec{a} \times \vec{b}) \times \vec{c}$ in general. (The BAC–CAB rule: $\vec{a} \times (\vec{b} \times \vec{c}) = \vec{b}(\vec{a} \cdot \vec{c}) - \vec{c}(\vec{a} \cdot \vec{b})$.)

---

## 1.7 Practice Problems

1. On $\mathbb{Q}$, define $a * b = a + b + ab$. Is $*$ a binary operation? Associative? Is there an identity? Find inverses where possible.
2. Is $(\mathbb{R}, \max)$ a monoid? What about $(\mathbb{R}_{\geq 0}, \max)$?
3. On the set $S = \{0, 1, 2\}$ define $a * b = (a + b + ab) \bmod 3$. Write the Cayley table. Is $*$ commutative? Associative? Is there an identity?
4. Prove that the composition of functions $\circ$ on $S^S$ is associative.
5. Show that if $*$ is associative and commutative on $S$, and $a, b, c, d \in S$, then $(a * b) * (c * d) = (a * c) * (b * d)$.
6. Give a binary operation on $\{0, 1\}$ that has no identity.

### Solutions

**Solution 1.**
- Closure ✓ (rationals closed under $+$, $\cdot$).
- Associative: $(a * b) * c = (a + b + ab) + c + (a + b + ab)c = a + b + c + ab + ac + bc + abc$; by symmetry $a * (b * c)$ equals the same. ✓
- Identity: $a + e + ae = a \Rightarrow e(1 + a) = 0$ for all $a \Rightarrow e = 0$. ✓
- Inverses: $a + a' + a a' = 0 \Rightarrow a' = -a/(1+a)$, defined for $a \neq -1$. So $(\mathbb{Q} \setminus \{-1\}, *)$ is an abelian group (closure needs checking — left as exercise). $\blacksquare$

**Solution 2.** $(\mathbb{R}, \max)$: no identity (same argument as Example 10, need $e \leq x$ for all $x$; none exists in $\mathbb{R}$). On $\mathbb{R}_{\geq 0}$, $e = 0$ works: $\max(a, 0) = a$ for $a \geq 0$. So $(\mathbb{R}_{\geq 0}, \max)$ is a commutative monoid. No inverses (not a group). $\blacksquare$

**Solution 3.** Compute $(a + b + ab) \bmod 3$ for all pairs:

$$
\begin{array}{c|ccc}
* & 0 & 1 & 2 \\
\hline
0 & 0 & 1 & 2 \\
1 & 1 & 0 & 2 \\
2 & 2 & 2 & 2
\end{array}
$$

Check: $1 * 1 = 1 + 1 + 1 = 3 \equiv 0$. $2 * 2 = 2 + 2 + 4 = 8 \equiv 2$. $1 * 2 = 1 + 2 + 2 = 5 \equiv 2$.

- Commutative (table symmetric).
- Identity: row/column $0$ reads $0, 1, 2$ — so $e = 0$ is an identity. ✓
- Associative? Check $(1 * 1) * 2 = 0 * 2 = 2$ and $1 * (1 * 2) = 1 * 2 = 2$. ✓ for this triple. Actually since $a * b = a + b + ab = (1+a)(1+b) - 1$, we have $(1 + (a * b)) = (1+a)(1+b)$, so $(1 + (a*b)*c) = (1+a)(1+b)(1+c)$ symmetric in $a, b, c$. Hence associative. ✓
- Inverse of $a$: need $(1 + a)(1 + a') \equiv 1 \pmod 3$. For $a = 0$: $a' = 0$. For $a = 1$: $(2)(1 + a') \equiv 1 \pmod 3 \Rightarrow 1 + a' \equiv 2 \Rightarrow a' = 1$. For $a = 2$: $(3)(1 + a') = 0 \not\equiv 1$, no inverse.

$\blacksquare$

**Solution 4.** Let $f, g, h \in S^S$. For any $x \in S$:
$((f \circ g) \circ h)(x) = (f \circ g)(h(x)) = f(g(h(x)))$.
$(f \circ (g \circ h))(x) = f((g \circ h)(x)) = f(g(h(x)))$.
Equal for all $x$, so $(f \circ g) \circ h = f \circ (g \circ h)$. $\blacksquare$

**Solution 5.** $(a * b) * (c * d) = a * (b * (c * d))$ by associativity $= a * ((b * c) * d) = a * ((c * b) * d)$ by commutativity $= a * (c * (b * d)) = (a * c) * (b * d)$. $\blacksquare$

**Solution 6.** Define $a * b = 0$ for all $a, b \in \{0, 1\}$. Table: all zeros. If $e$ were an identity, $1 * e = 1$, but $1 * e = 0$. No identity. $\blacksquare$

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
