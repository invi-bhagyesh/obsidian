# 4. Finite, Countable, and Uncountable Sets

> **The central question.** How do we compare the sizes of infinite sets? The naive notion of "number of elements" breaks down once we leave finite sets behind. Cantor's revolutionary insight (1874-1891) was that we should compare sets by the existence of bijections between them — and when we do, some infinities turn out to be strictly larger than others.
>
> This chapter formalises the hierarchy **finite ⊂ countably infinite ⊂ uncountable**, proves the foundational closure theorems (subsets of countable are countable, countable unions of countable sets are countable, finite products of countable sets are countable), executes the diagonal argument to show $\mathbb{R}$ is uncountable, proves Cantor's theorem that no set is equinumerous with its power set, and uses the Schröder–Bernstein theorem to establish equinumerosities without constructing explicit bijections.

---

## 4.1 Why Counting Infinity Matters

When we pass from finite sets to infinite ones, "size" stops being a natural number. Yet some infinite sets feel "bigger" than others:
$$\mathbb{N} \subsetneq \mathbb{Z} \subsetneq \mathbb{Q} \subsetneq \mathbb{R},$$
and while the first three can be **listed out** (enumerated as a sequence), $\mathbb{R}$ cannot. Cantor's 1874 insight — that $\mathbb{R}$ is strictly larger than $\mathbb{N}$ — underpins why real analysis is genuinely about a *continuum* and not just a long list.

**Why this matters for analysis.**
- Measure theory begins with the observation that $\mathbb{Q}$ has measure zero in $\mathbb{R}$, reflecting its countability.
- The Baire category theorem contrasts countable with "generic" (comeager) sets.
- Sequences (indexed by $\mathbb{N}$) cannot exhaust $\mathbb{R}$; limits require genuinely non-sequential tools (filters, nets) in general topology.
- The distinction between countable and uncountable is the first quantitative separation inside "infinity" and it is the gateway to the theory of ordinals and cardinals.

This chapter formalises three sizes: **finite**, **countably infinite** (the size of $\mathbb{N}$, denoted $\aleph_0$), and **uncountable** (strictly larger than $\aleph_0$).

---

## 4.2 Functions, Bijections, and Equivalence

### Definitions

> **Definition 4.1 (Injective, surjective, bijective).** Let $f : A \to B$ be a function.
> - $f$ is **injective** (one-to-one) if $f(a_1) = f(a_2) \Rightarrow a_1 = a_2$ for all $a_1, a_2 \in A$. Equivalently, the contrapositive: $a_1 \neq a_2 \Rightarrow f(a_1) \neq f(a_2)$.
> - $f$ is **surjective** (onto) if for every $b \in B$, some $a \in A$ has $f(a) = b$. Equivalently, $f(A) = B$.
> - $f$ is **bijective** if it is both injective and surjective.

A bijection $f: A \to B$ has a (unique) inverse $f^{-1}: B \to A$, itself a bijection, characterised by $f^{-1}(b) = $ the unique $a$ with $f(a) = b$.

**Notation.** We write $A \hookrightarrow B$ to mean there exists an injection $A \to B$, and $A \twoheadrightarrow B$ for a surjection.

### Equivalent sets

> **Definition 4.2 (Equinumerous sets).** Two sets $A, B$ are **equivalent** (or **equinumerous**), written $A \sim B$, if there exists a bijection $f: A \to B$.

> **Proposition 4.3.** The relation $\sim$ is an equivalence relation on the class of all sets.

**Proof.** We check the three defining properties.

1. **Reflexive:** The identity $\mathrm{id}_A : A \to A$, $\mathrm{id}_A(a) = a$, is a bijection. So $A \sim A$.

2. **Symmetric:** Suppose $A \sim B$ via a bijection $f : A \to B$. Then $f^{-1} : B \to A$ is a bijection (the inverse of a bijection is a bijection: if $f$ has $f \circ f^{-1} = \mathrm{id}_B$ and $f^{-1} \circ f = \mathrm{id}_A$, then $f^{-1}$ is surjective — every $a \in A$ equals $f^{-1}(f(a))$ — and injective — $f^{-1}(b_1) = f^{-1}(b_2)$ gives $b_1 = f(f^{-1}(b_1)) = f(f^{-1}(b_2)) = b_2$). So $B \sim A$.

3. **Transitive:** Suppose $A \sim B$ via $f$ and $B \sim C$ via $g$. Then $g \circ f : A \to C$ is a composition of bijections, hence bijective:
 - Injective: $(g \circ f)(a_1) = (g \circ f)(a_2) \Rightarrow g(f(a_1)) = g(f(a_2)) \Rightarrow f(a_1) = f(a_2)$ (by $g$ injective) $\Rightarrow a_1 = a_2$ (by $f$ injective).
 - Surjective: given $c \in C$, $g$ surjective yields $b \in B$ with $g(b) = c$, then $f$ surjective yields $a \in A$ with $f(a) = b$; so $(g \circ f)(a) = g(b) = c$.
 So $A \sim C$. $\blacksquare$

*Interpretation.* Because $\sim$ is an equivalence relation, the class of all sets splits into **equivalence classes**, each containing sets of the same "size". The common invariant is called the **cardinality** $|A|$ (or $\operatorname{card}(A)$, $\# A$) of any representative.

**Remark (foundational subtlety).** The "set of all sets equivalent to $A$" is a proper class, not a set, by Russell's paradox. In ZFC one defines $|A|$ as the least ordinal equinumerous with $A$ (requires the axiom of choice / the well-ordering theorem). For our purposes, we can treat $|A|$ informally: two sets have the same cardinality iff they are in bijection.

---

## 4.3 Finite and Infinite Sets

> **Definition 4.4 (Finite set).** A set $A$ is **finite** if $A = \emptyset$ or $A \sim \{1, 2, \ldots, n\} = [n]$ for some $n \in \mathbb{N}$. In the first case we set $|A| = 0$; in the second, $|A| = n$.

> **Definition 4.5 (Infinite set).** A set $A$ is **infinite** if it is not finite.

The cardinality is **well-defined**: if $A \sim [n]$ and $A \sim [m]$, then $[n] \sim [m]$ by transitivity, which forces $n = m$ (pigeonhole — proved by induction on $n$).

### Pigeonhole principle

> **Proposition 4.6 (Pigeonhole).** If $m > n$, there is no injection $[m] \to [n]$.

**Proof.** Induct on $n$. For $n = 0$: $[0] = \emptyset$, and no function maps a non-empty set into $\emptyset$. Inductive step: suppose the claim holds for $n$; prove for $n+1$. Let $f : [m] \to [n+1]$ be injective with $m > n + 1$. Two cases.

(a) If $n+1 \notin f([m])$, then $f$ maps $[m]$ into $[n]$ injectively, contradicting the inductive hypothesis (since $m > n+1 > n$).

(b) If $n+1 \in f([m])$, say $f(k) = n+1$ for a unique $k$ (injectivity). Define $g : [m - 1] \to [n]$ by
$$g(i) = \begin{cases} f(i) & i < k \\ f(i + 1) & i \geq k, \end{cases}$$
which skips the index $k$ but re-indexes. Then $g$ is injective (as a restriction/reindexing of $f$) and $g$ avoids the value $n+1$, so $g : [m-1] \to [n]$. But $m - 1 > n$, contradiction. $\blacksquare$

### Dedekind-infinite characterisation

> **Theorem 4.7 (Dedekind).** A set $A$ is infinite if and only if $A$ is equinumerous with a proper subset of itself.

**Proof.** (⇐) If $A \sim B$ with $B \subsetneq A$ a proper subset, then $A$ cannot be finite: if $A$ were finite of cardinality $n$, then $B$, being a subset, would have cardinality $\leq n$, and being a proper subset strictly less, say $k < n$. But $A \sim B$ gives $n = k$ (by well-definedness of cardinality), contradiction.

(⇒) Assume $A$ is infinite. Then $A$ contains a sequence $a_1, a_2, a_3, \ldots$ of distinct elements (pick $a_1 \in A$; having picked $a_1, \ldots, a_k$ distinct, the set $A \setminus \{a_1, \ldots, a_k\}$ is non-empty since $A$ is infinite; pick $a_{k+1}$). Define $f : A \to A$ by
$$f(x) = \begin{cases} a_{n+1} & x = a_n \text{ for some } n \\ x & \text{otherwise.} \end{cases}$$
Then $f$ is injective but $a_1 \notin f(A)$, so $f(A) = A \setminus \{a_1\} \subsetneq A$, and $A \sim f(A)$. $\blacksquare$

**Example 4.8.** $\mathbb{N} \sim 2\mathbb{N} = \{2, 4, 6, \ldots\}$ via $n \mapsto 2n$. So $\mathbb{N}$ is equinumerous with its proper subset $2\mathbb{N}$, confirming infinity.

*Interpretation.* This is a hallmark of infinite sets: they have "as many" elements as some of their strict parts. Finite sets **cannot** be equivalent to a proper subset (by pigeonhole). Hence Dedekind's characterisation is a genuine dichotomy.

**Remark (choice).** The implication (⇒) uses the axiom of **dependent choice** (DC) to pick the sequence $a_1, a_2, \ldots$ inductively. Without some choice, there exist models of ZF with infinite sets that are not Dedekind-infinite.

---

## 4.4 Countable Sets

> **Definition 4.9 (Countably infinite, countable, uncountable).** 
> - A set $A$ is **countably infinite** (or **denumerable**) if $A \sim \mathbb{N}$. We write $|A| = \aleph_0$ (aleph-null).
> - A set $A$ is **countable** if it is finite or countably infinite.
> - A set $A$ is **uncountable** if it is infinite but not countable.

A countably infinite set can be **enumerated** as a sequence: $A = \{a_1, a_2, a_3, \ldots\}$, with each element listed exactly once. The bijection $\mathbb{N} \to A$, $n \mapsto a_n$, is the enumeration.

**Convention.** Some authors use "countable" to mean "countably infinite"; we adopt the **inclusive** convention (finite sets are countable). Both are common; context usually disambiguates.

### Basic countable examples

**Example 4.10 ($\mathbb{Z}$ is countable).**

*Strategy.* Interleave positive and negative integers, starting from $0$.

*Construction.* List $\mathbb{Z}$ as
$$0, 1, -1, 2, -2, 3, -3, 4, -4, \ldots$$

*Explicit bijection.* Define $f : \mathbb{N} \to \mathbb{Z}$ by
$$f(n) = \begin{cases} n/2 & \text{if } n \text{ even} \\ -(n-1)/2 & \text{if } n \text{ odd.} \end{cases}$$

Adopting the convention $\mathbb{N} = \{0, 1, 2, \ldots\}$: $f(0) = 0, f(1) = 0$? That conflicts. Let us redo with $\mathbb{N} = \{1, 2, 3, \ldots\}$:
$$f(n) = \begin{cases} n/2 & n \text{ even} \\ -(n-1)/2 & n \text{ odd.} \end{cases}$$
Compute: $f(1) = 0, f(2) = 1, f(3) = -1, f(4) = 2, f(5) = -2, f(6) = 3, \ldots$ — matches the enumeration above.

*Verification.* 
- **Injective.** If $f(n) = f(m)$ with $n, m$ of the same parity, the formulas give $n = m$ directly. If $n$ even and $m$ odd, $f(n) > 0 > f(m)$ unless both are $0$; $f(n) = 0 \Rightarrow n = 0$ (not in our $\mathbb{N}$); $f(m) = 0 \Rightarrow m = 1$. No collision.
- **Surjective.** Given $k \in \mathbb{Z}$: if $k > 0$, take $n = 2k$ (even); if $k < 0$, take $n = -2k + 1$ (odd); if $k = 0$, take $n = 1$.

So $f$ is bijective and $\mathbb{Z} \sim \mathbb{N}$, i.e., $|\mathbb{Z}| = \aleph_0$. $\blacksquare$

*Interpretation.* Despite the intuition "$\mathbb{Z}$ is twice as big as $\mathbb{N}$", cardinality disagrees: both have size $\aleph_0$. Cardinality is insensitive to the "doubling" that our intuition notices.

**Example 4.11 (Even naturals).** $2\mathbb{N} = \{2, 4, 6, \ldots\}$ is countably infinite via the bijection $n \leftrightarrow 2n$. This was Example 4.8.

**Example 4.12 (A finite set is countable).** $\{7, 19, 42\} \sim \{1, 2, 3\}$ via $7 \mapsto 1, 19 \mapsto 2, 42 \mapsto 3$. Finite, hence countable.

---

## 4.5 Basic Theorems on Countability

### Subsets of countable sets

> **Theorem 4.13.** Every subset of a countable set is countable.

**Proof.** Let $A$ be countable and $B \subseteq A$.

*Case 1: $A$ is finite.* Then $|A| = n$ for some $n$, and $|B| \leq n$ (pigeonhole), so $B$ is finite.

*Case 2: $A$ is countably infinite.* Enumerate $A = \{a_1, a_2, a_3, \ldots\}$.

 *Sub-case 2a: $B$ is finite.* Then $B$ is countable by definition.

 *Sub-case 2b: $B$ is infinite.* Define $g : \mathbb{N} \to B$ **recursively** by letting $g(k)$ be the element $a_m$ with smallest index $m$ such that $a_m \in B$ and $a_m \notin \{g(1), \ldots, g(k-1)\}$:
 - $g(1) = a_{m_1}$ where $m_1 = \min\{m : a_m \in B\}$ (exists since $B \neq \emptyset$);
 - Given $g(1), \ldots, g(k-1)$, the set $\{m : a_m \in B, a_m \notin \{g(1), \ldots, g(k-1)\}\}$ is non-empty (since $B$ is infinite — otherwise we'd have enumerated all of $B$ in finitely many steps); let $m_k$ be its minimum, and set $g(k) = a_{m_k}$.

 The sequence $(m_k)$ is strictly increasing (each step picks a **new** element, and "smallest index" ensures $m_k > m_{k-1}$), so all $g(k)$ are distinct: $g$ is injective. Also surjective: every $b \in B$ has $b = a_m$ for some $m$; the indices $m_1 < m_2 < \ldots$ eventually exceed $m$, so $a_m$ is picked.

So $g$ is a bijection $\mathbb{N} \to B$, showing $B$ is countably infinite. $\blacksquare$

*Remark.* This argument uses **dependent choice** implicitly (to perform the recursion); for subsets of $\mathbb{N}$ itself, we can use the well-ordering of $\mathbb{N}$ and no choice is needed.

### Surjective and injective characterisations

> **Theorem 4.14.** Let $A$ be non-empty. The following are equivalent:
> 1. $A$ is countable.
> 2. There exists a surjection $\mathbb{N} \twoheadrightarrow A$.
> 3. There exists an injection $A \hookrightarrow \mathbb{N}$.

**Proof.** 

(1) $\Rightarrow$ (2): If $A$ is finite with $|A| = n$, enumerate $A = \{a_1, \ldots, a_n\}$ and define $f : \mathbb{N} \to A$ by $f(k) = a_k$ for $k \leq n$ and $f(k) = a_n$ for $k > n$ — surjective. If $A$ is countably infinite, a bijection $\mathbb{N} \to A$ is already a surjection.

(2) $\Rightarrow$ (3): Given a surjection $f : \mathbb{N} \to A$, define $g : A \to \mathbb{N}$ by $g(a) = \min\{n : f(n) = a\}$ (the preimage is non-empty by surjectivity, and $\mathbb{N}$ is well-ordered, so the min exists). Then $g$ is injective: if $g(a) = g(b) = n$, then $a = f(n) = b$.

(3) $\Rightarrow$ (1): Given an injection $g : A \to \mathbb{N}$, $g$ induces a bijection $A \to g(A)$. Now $g(A) \subseteq \mathbb{N}$ is countable by Theorem 4.13, so $A \sim g(A)$ is countable too.

$\blacksquare$

*Interpretation.* **To prove $A$ is countable, we may enumerate $A$ with possible repetitions.** This is the single most useful criterion in practice.

### Countable union of countable sets

> **Theorem 4.15 (Countable union theorem).** If $\{A_n\}_{n \in \mathbb{N}}$ is a countable family of countable sets, then $\bigcup_{n \in \mathbb{N}} A_n$ is countable.

**Proof.** 

*Setup.* For each $n$, since $A_n$ is countable and non-empty (WLOG — discard empty $A_n$ first), pick an enumeration (possibly with repetitions if $A_n$ is finite):
$$A_n = \{a_{n,1}, a_{n,2}, a_{n,3}, \ldots\}.$$
Here if $A_n$ is finite, say $A_n = \{b_1, \ldots, b_{k_n}\}$, we pad by setting $a_{n,j} = b_{k_n}$ for all $j > k_n$. The enumeration is now indexed by $\mathbb{N}$ for every $n$.

*Strategy.* Arrange the $a_{n,j}$ in an infinite grid and enumerate by diagonals.

*Construction.* The grid:
$$
\begin{array}{ccccccc}
 & j=1 & j=2 & j=3 & j=4 & j=5 & \cdots \\
n=1: & a_{1,1} & a_{1,2} & a_{1,3} & a_{1,4} & a_{1,5} & \cdots \\
n=2: & a_{2,1} & a_{2,2} & a_{2,3} & a_{2,4} & a_{2,5} & \cdots \\
n=3: & a_{3,1} & a_{3,2} & a_{3,3} & a_{3,4} & a_{3,5} & \cdots \\
n=4: & a_{4,1} & a_{4,2} & a_{4,3} & \cdots & & \\
\vdots & & & & & & \\
\end{array}
$$

The $k$-th **anti-diagonal** (sum $n + j = k + 1$) contains $k$ entries: $a_{k,1}, a_{k-1,2}, \ldots, a_{1,k}$. Enumerate by reading diagonals:
$$a_{1,1}, \underbrace{a_{2,1}, a_{1,2}}_{\text{diag 2}}, \underbrace{a_{3,1}, a_{2,2}, a_{1,3}}_{\text{diag 3}}, \underbrace{a_{4,1}, a_{3,2}, a_{2,3}, a_{1,4}}_{\text{diag 4}}, \ldots$$

This produces a surjection $F : \mathbb{N} \to \bigcup_n A_n$: every element $a_{n,j}$ appears in diagonal $n + j - 1$, position $j$ within that diagonal, giving a specific $\mathbb{N}$-index.

*Explicit formula.* Position in the enumeration is $\frac{(n+j-1)(n+j-2)}{2} + j$ (diagonals $1, 2, \ldots, n+j-2$ contribute $1 + 2 + \cdots + (n+j-2) = \frac{(n+j-2)(n+j-1)}{2}$ elements, then offset $j$ into the current diagonal). This is essentially the **Cantor pairing function** (Example 4.17 below).

By Theorem 4.14, $\bigcup_n A_n$ is countable. $\blacksquare$

**Verification that no element is missed.** Any element in $\bigcup_n A_n$ is some $x \in A_n$, so $x = a_{n,j}$ for some $j$ (by the enumeration of $A_n$), and this $a_{n,j}$ appears in the big enumeration. ✓

**Remark (choice).** We selected an enumeration of each $A_n$; this requires the axiom of **countable choice** $\mathrm{AC}_\omega$. In ZF alone, a countable union of countable sets need not be countable — there are models (Solovay, Feferman–Lévy) in which $\mathbb{R}$ is a countable union of countable sets.

### Cartesian products

> **Corollary 4.16.** $\mathbb{N} \times \mathbb{N}$ is countable.

**Proof.** Write $\mathbb{N} \times \mathbb{N} = \bigcup_{n \in \mathbb{N}} (\{n\} \times \mathbb{N})$. Each $\{n\} \times \mathbb{N}$ is in bijection with $\mathbb{N}$ via $(n, j) \leftrightarrow j$, so countable. A countable union of countable sets is countable by Theorem 4.15. $\blacksquare$

> **Example 4.17 (Cantor pairing function).** The explicit bijection $\mathbb{N} \times \mathbb{N} \to \mathbb{N}$ (using $\mathbb{N} = \{1, 2, \ldots\}$) is
> $$\pi(m, n) = \frac{(m+n-1)(m+n-2)}{2} + m.$$

*Verification (informal).* Input pairs on the $k$-th anti-diagonal $m + n = k + 1$ map to outputs $\{\tfrac{(k-1)k}{2} + 1, \ldots, \tfrac{(k-1)k}{2} + k\} = \{\tfrac{(k-1)k}{2} + 1, \ldots, \tfrac{k(k+1)}{2}\}$. As $k$ ranges over $\mathbb{N}$, these intervals partition $\mathbb{N}$, so $\pi$ is a bijection.

> **Theorem 4.18.** A finite product of countable sets is countable: if $A_1, \ldots, A_n$ are countable, so is $A_1 \times \cdots \times A_n$.

**Proof.** Induction on $n$.

*Base $n = 1$:* trivial.

*Base $n = 2$:* Given $A_1, A_2$ countable, inject each into $\mathbb{N}$ via $f_1, f_2$ (Theorem 4.14). Then $A_1 \times A_2 \to \mathbb{N} \times \mathbb{N}$, $(a_1, a_2) \mapsto (f_1(a_1), f_2(a_2))$ is injective, and $\mathbb{N} \times \mathbb{N} \hookrightarrow \mathbb{N}$ by Corollary 4.16. Composing: $A_1 \times A_2 \hookrightarrow \mathbb{N}$, so countable.

*Inductive step.* Assume $A_1 \times \cdots \times A_n$ is countable. Then $A_1 \times \cdots \times A_{n+1} \sim (A_1 \times \cdots \times A_n) \times A_{n+1}$, a product of two countable sets, hence countable by the $n=2$ case. $\blacksquare$

> **Corollary 4.19.** $\mathbb{Q}$ is countable.

**Proof.** 

*Strategy.* Present every rational as a fraction and use an injection to a countable set.

*Map.* Consider $\varphi : \mathbb{Z} \times \mathbb{N} \to \mathbb{Q}$, $\varphi(p, r) = p/r$.

*Surjective.* Every $q \in \mathbb{Q}$ has a representation $p/r$ with $p \in \mathbb{Z}, r \in \mathbb{N}$, so $\varphi$ is surjective.

*Countable domain.* $\mathbb{Z} \times \mathbb{N}$ is a product of countable sets (Example 4.10 and $\mathbb{N}$ itself), hence countable by Theorem 4.18.

By Theorem 4.14, a surjective image of a countable set is countable, so $\mathbb{Q}$ is countable. $\blacksquare$

**Remark.** The surjection is not injective ($2/4 = 1/2 = 3/6 = \ldots$), but Theorem 4.14 only needs surjection. An injection $\mathbb{Q} \hookrightarrow \mathbb{Z} \times \mathbb{N}$ is obtained by sending each $q$ to its **unique lowest-terms** representation $(p, r)$ with $\gcd(p, r) = 1$ and $r > 0$.

> **Corollary 4.20.** $\mathbb{Q}^n$ is countable for every $n \in \mathbb{N}$.

**Proof.** Finite product of countable sets is countable. $\blacksquare$

*Interpretation.* The set of points in $\mathbb{R}^n$ with rational coordinates is countable — a **dense** countable subset of $\mathbb{R}^n$. This fact is foundational for separable spaces and for approximation arguments.

---

## 4.6 Uncountable Sets — Cantor's Theorem

> **Theorem 4.21 (Cantor, 1874/1891).** The interval $[0, 1] \subseteq \mathbb{R}$ is uncountable. Consequently $\mathbb{R}$ is uncountable.

### Proof by the diagonal argument

*Strategy.* Assume a countable enumeration of $[0, 1]$ exists; construct an element not in the enumeration by choosing digits to differ from the $n$-th digit of the $n$-th listed number.

*Preliminary on decimal expansions.* Every $x \in [0, 1]$ has a decimal expansion $x = 0.d_1 d_2 d_3 \ldots$ with $d_n \in \{0, 1, \ldots, 9\}$. The only ambiguity is for dyadic / terminating expansions: $0.5 = 0.4\overline{9} = 0.5\overline{0}$. To make expansions unique, fix a convention, e.g., always use the non-terminating form. So $0.3 = 0.2\overline{9}$ gets written $0.2\overline{9}$. All real numbers in $[0, 1]$ now have a **unique** decimal expansion.

**Proof.** Suppose, for contradiction, $[0, 1]$ is countable. Then there is an enumeration
$$[0, 1] = \{x_1, x_2, x_3, \ldots\}.$$
Write each $x_n$ in its unique decimal expansion:
$$
\begin{aligned}
x_1 &= 0.\mathbf{a_{11}} a_{12} a_{13} a_{14} \cdots \\
x_2 &= 0.a_{21} \mathbf{a_{22}} a_{23} a_{24} \cdots \\
x_3 &= 0.a_{31} a_{32} \mathbf{a_{33}} a_{34} \cdots \\
x_4 &= 0.a_{41} a_{42} a_{43} \mathbf{a_{44}} \cdots \\
 & \ \ \vdots
\end{aligned}
$$
The **diagonal digits** are $a_{11}, a_{22}, a_{33}, \ldots$.

*Construction of $y \notin$ the list.* Define $y = 0.b_1 b_2 b_3 \ldots$ by
$$b_n = \begin{cases} 5 & \text{if } a_{nn} \neq 5 \\ 6 & \text{if } a_{nn} = 5. \end{cases}$$

*Why digits $5, 6$?* They avoid the ambiguous digits $0$ and $9$: a number whose decimal expansion contains no $0$s and no $9$s has a **unique** expansion (no trailing-$9$ issue). This ensures $y$ is unambiguously determined by its $b_n$'s.

*Verification.*

1. **$y \in [0, 1]$:** Each $b_n \in \{5, 6\}$, so $y = 0.b_1 b_2 \ldots \in [0, 1]$. In fact $y \in [5/9, 7/9]$ since all digits are $5$ or $6$.

2. **$y \neq x_n$ for every $n$:** The $n$-th decimal digit of $y$ is $b_n$, chosen so that $b_n \neq a_{nn}$. So $y$ and $x_n$ differ in the $n$-th digit. Since both have unique expansions (the one for $x_n$ is fixed by convention; the one for $y$ is forced since its digits are all $5$ or $6$), they are different numbers.

But $y \in [0, 1]$, so $y$ should appear in the enumeration as some $x_k$. Yet $y \neq x_k$ (the previous bullet with $n = k$). Contradiction.

Hence $[0, 1]$ is **uncountable**.

*Passage to $\mathbb{R}$.* Since $[0, 1] \subseteq \mathbb{R}$ and a subset of a countable set is countable (Theorem 4.13, contrapositive), $\mathbb{R}$ cannot be countable. $\blacksquare$

**Remark (naming).** Cantor's **cardinality of the continuum** is denoted $\mathfrak{c} = |\mathbb{R}|$. We have $\mathfrak{c} > \aleph_0$. The **continuum hypothesis** (CH) asserts $\mathfrak{c}$ is the smallest cardinality greater than $\aleph_0$ — independent of ZFC (Gödel 1940, Cohen 1963).

### Consequence: irrationals are uncountable

> **Corollary 4.22.** The set $\mathbb{R} \setminus \mathbb{Q}$ of irrational numbers is uncountable.

**Proof.** Decompose $\mathbb{R} = \mathbb{Q} \cup (\mathbb{R} \setminus \mathbb{Q})$. Suppose, for contradiction, $\mathbb{R} \setminus \mathbb{Q}$ is countable. Then $\mathbb{R}$ is the union of two countable sets ($\mathbb{Q}$ by Corollary 4.19 and $\mathbb{R} \setminus \mathbb{Q}$ by assumption), hence countable by Theorem 4.15 — contradicting Theorem 4.21. So $\mathbb{R} \setminus \mathbb{Q}$ is uncountable. $\blacksquare$

*Interpretation.* In a precise sense, there are "vastly more" irrationals than rationals: all but a measure-zero set of reals are irrational, and the irrationals form the "typical" real number.

### Cardinality summary

| Set | Cardinality |
|-----|-------------|
| $\emptyset$ | $0$ |
| $\{1, \ldots, n\}$ | $n$ |
| $\mathbb{N}, \mathbb{Z}, \mathbb{Q}$, finite products thereof | $\aleph_0$ (countably infinite) |
| Set of algebraic numbers, set of finite subsets of $\mathbb{N}$ | $\aleph_0$ |
| $\mathbb{R}$, non-empty open interval, $\mathbb{R} \setminus \mathbb{Q}$ | $\mathfrak{c}$ (continuum) |
| $\{0,1\}^{\mathbb{N}}$, $\mathcal{P}(\mathbb{N})$, $C(\mathbb{R})$, $\mathbb{R}^n$ | $\mathfrak{c}$ |
| $\mathcal{P}(\mathbb{R})$, the set of all functions $\mathbb{R} \to \mathbb{R}$ | $2^{\mathfrak{c}}$ (larger still) |

---

## 4.7 Cantor's Power Set Theorem

> **Theorem 4.23 (Cantor's theorem).** For any set $A$, there is no surjection $f : A \to \mathcal{P}(A)$. In particular, $A \not\sim \mathcal{P}(A)$, and so $|\mathcal{P}(A)| > |A|$.

*Strategy.* Use a **diagonalisation** generalising the argument for $\mathbb{R}$. Given any candidate surjection $f$, define the "diagonal" subset $D$ of elements $a$ that are not in their own image $f(a)$; show $D$ cannot be in the image of $f$.

**Proof.** Suppose, for contradiction, $f : A \to \mathcal{P}(A)$ is a surjection. Define
$$D = \{a \in A : a \notin f(a)\} \subseteq A.$$
Since $D \in \mathcal{P}(A)$ and $f$ is surjective, some $a_0 \in A$ satisfies $f(a_0) = D$. Ask the key question: **is $a_0 \in D$?**

*Case 1: $a_0 \in D$.* By definition of $D$, $a_0 \in D \iff a_0 \notin f(a_0)$. Since $f(a_0) = D$, this says $a_0 \notin D$. Contradiction.

*Case 2: $a_0 \notin D$.* Again by definition, $a_0 \notin D \iff a_0 \in f(a_0) = D$. So $a_0 \in D$. Contradiction.

Either way, contradiction. So no surjection $A \to \mathcal{P}(A)$ exists. $\blacksquare$

**Corollary.** There is no largest cardinality: for any set $A$, $|\mathcal{P}(A)| > |A|$, so the hierarchy of infinite cardinals is **unbounded**:
$$|\mathbb{N}| < |\mathcal{P}(\mathbb{N})| < |\mathcal{P}(\mathcal{P}(\mathbb{N}))| < \cdots.$$

**Relation to Russell's paradox.** The set $D$ is the "Russell set" for $f$: "elements that are not contained in what they map to". Russell's original paradox (the set of all sets that do not contain themselves) is the special case where $f$ is the identity on a hypothetical universal set.

**Relation to the continuum hypothesis.** $|\mathcal{P}(\mathbb{N})| = 2^{\aleph_0} = \mathfrak{c}$ (Example 4.28 below and Problem 4). So $|\mathbb{R}| = |\mathcal{P}(\mathbb{N})| > \aleph_0$, confirming $\mathbb{R}$ is uncountable. CH says $2^{\aleph_0} = \aleph_1$, the next cardinal after $\aleph_0$.

---

## 4.8 The Schröder–Bernstein Theorem

> **Theorem 4.24 (Schröder–Bernstein / Cantor–Bernstein).** If there exist injections $f: A \to B$ and $g: B \to A$, then $A \sim B$.

*Motivation.* This is the main tool for proving equinumerosity **without building an explicit bijection**. In practice, producing two injections (in opposite directions) is often easy, while a bijection is delicate. Schröder–Bernstein bridges the gap.

**Proof sketch (back-and-forth).** Given $f : A \to B$ and $g : B \to A$ injective, think of elements as having "ancestors" under $f, g$. Partition $A = A_A \cup A_B \cup A_\infty$ where:

- $A_A$: elements of $A$ whose ancestor chain (repeatedly applying $g^{-1}, f^{-1}$ as far as possible) terminates in $A$ (i.e., eventually hits an $a \in A \setminus g(B)$).
- $A_B$: chain terminates in $B$.
- $A_\infty$: chain is infinite.

Define $h : A \to B$ by $h(a) = f(a)$ if $a \in A_A \cup A_\infty$ and $h(a) = g^{-1}(a)$ if $a \in A_B$ (defined since $a \in A_B$ implies $a \in g(B)$). Verifying $h$ is a bijection is a careful case analysis using the partition. $\blacksquare$

**No choice needed.** A notable feature: Schröder–Bernstein is provable in ZF (no AC).

### Application: intervals and $\mathbb{R}$ have the same cardinality

> **Theorem 4.25.** $[0, 1] \sim (0, 1) \sim \mathbb{R}$.

*Strategy.* Use Schröder–Bernstein for the first equinumerosity, an explicit continuous bijection for the second.

*Proof.*

**Step 1: $(0, 1) \hookrightarrow [0, 1]$.** Inclusion is injective. ✓

**Step 2: $[0, 1] \hookrightarrow (0, 1)$.** Define $\varphi : [0, 1] \to (0, 1)$ by $\varphi(x) = (x+1)/3$. The image is $[1/3, 2/3] \subseteq (0, 1)$, and $\varphi$ is injective (affine, non-constant). ✓

**Step 3: Apply Schröder–Bernstein.** From Steps 1 and 2, $[0, 1] \sim (0, 1)$ by Theorem 4.24.

**Step 4: $(0, 1) \sim \mathbb{R}$.** The map $\psi : (0, 1) \to \mathbb{R}$, $\psi(x) = \tan(\pi(x - 1/2))$, is continuous, strictly increasing on $(0, 1)$ (derivative $\pi \sec^2(\pi(x - 1/2)) > 0$), with $\lim_{x \to 0^+} \psi(x) = -\infty$ and $\lim_{x \to 1^-} \psi(x) = +\infty$. By the intermediate value theorem and strict monotonicity, $\psi$ is a bijection $(0, 1) \to \mathbb{R}$.

**Step 5: Chain.** $[0, 1] \sim (0, 1) \sim \mathbb{R}$, so by transitivity $[0, 1] \sim \mathbb{R}$. $\blacksquare$

*Interpretation.* Any two non-trivial intervals (open, closed, half-open, bounded, unbounded) have the same cardinality $\mathfrak{c}$. The cardinality is robust to boundary inclusion.

---

## Worked Examples

### Example 1: Powers of 2

**Example 4.26.** Show that the set $A = \{2^n : n \in \mathbb{N}\}$ is countably infinite.

**Setup.** We want a bijection between $A$ and $\mathbb{N}$.

**Strategy.** The defining formula already suggests the bijection $n \leftrightarrow 2^n$.

**Computation.** Define $f : \mathbb{N} \to A$, $f(n) = 2^n$.

- **Injective.** Suppose $f(n) = f(m)$, i.e., $2^n = 2^m$. Taking $\log_2$: $n = m$. (Or: $2^n$ is a strictly increasing function of $n \in \mathbb{N}$, hence injective.)
- **Surjective.** Every element of $A$ has the form $2^n$ for some $n \in \mathbb{N}$, and $f(n) = 2^n$.

**Verification.** The first few values: $f(1) = 2, f(2) = 4, f(3) = 8, f(4) = 16$, matching $A = \{2, 4, 8, 16, \ldots\}$. No repetitions, all elements hit.

**Interpretation.** $A \sim \mathbb{N}$, so $|A| = \aleph_0$. Even though $A$ has exponential gaps between consecutive elements, it has the same cardinality as $\mathbb{N}$. $\blacksquare$

---

### Example 2: Algebraic numbers are countable

**Example 4.27.** Prove that the set $\mathbb{A}$ of **algebraic numbers** — real (or complex) numbers that are roots of non-zero polynomials with integer coefficients — is countable.

**Setup.** Formally, $\alpha \in \mathbb{R}$ is algebraic if there exists a non-zero $p(x) = c_n x^n + c_{n-1} x^{n-1} + \cdots + c_0 \in \mathbb{Z}[x]$ with $p(\alpha) = 0$.

**Strategy.** 
1. Show the set of integer polynomials is countable.
2. Each polynomial has finitely many roots.
3. The algebraic numbers are a countable union of finite sets.

**Computation.**

**Step 1: $\mathbb{Z}[x]$ is countable.** Let $P_n$ denote polynomials in $\mathbb{Z}[x]$ of **degree at most $n$**. A polynomial $p = c_n x^n + \cdots + c_0$ is determined by its coefficient tuple $(c_0, c_1, \ldots, c_n) \in \mathbb{Z}^{n+1}$. So $P_n \hookrightarrow \mathbb{Z}^{n+1}$. Since $\mathbb{Z}^{n+1}$ is a finite product of countable sets (Theorem 4.18), it is countable, and thus $P_n$ is countable.

Now $\mathbb{Z}[x] = \bigcup_{n \geq 0} P_n$, a countable union of countable sets (Theorem 4.15), so **$\mathbb{Z}[x]$ is countable**.

**Step 2: Roots of each polynomial form a finite set.** The fundamental theorem of algebra (and its real specialization) gives: a non-zero polynomial of degree $n$ has at most $n$ distinct roots in $\mathbb{C}$ (or $\mathbb{R}$).

Let $R(p) = \{\alpha \in \mathbb{R} : p(\alpha) = 0\}$ denote the (real) root set of $p$. Then $|R(p)| \leq \deg(p) < \infty$.

**Step 3: Assemble.**
$$\mathbb{A} = \bigcup_{p \in \mathbb{Z}[x] \setminus \{0\}} R(p).$$
This is indexed by the countable set $\mathbb{Z}[x] \setminus \{0\}$ (Step 1), and each $R(p)$ is finite (hence countable) by Step 2. By Theorem 4.15 (countable union of countable sets), $\mathbb{A}$ is countable.

**Verification.** $\mathbb{A}$ is infinite (contains $\mathbb{Q}$: each $q = a/b$ is the root of $bx - a$; also contains $\sqrt{2}, \sqrt[3]{5}$, etc.). So $\mathbb{A}$ is **countably infinite**, $|\mathbb{A}| = \aleph_0$.

**Interpretation.** Since $|\mathbb{R}| = \mathfrak{c} > \aleph_0 = |\mathbb{A}|$, the set $\mathbb{R} \setminus \mathbb{A}$ of **transcendental numbers** (non-algebraic reals) has cardinality $\mathfrak{c}$ and is uncountable. This is a pure existence proof that transcendentals exist — **due to Cantor (1874)** — and came a decade **before** Lindemann proved $\pi$ is transcendental (1882). Indeed, transcendentals are the "typical" real number, though specific examples are hard to construct. $\blacksquare$

---

### Example 3: Finite subsets of $\mathbb{N}$

**Example 4.28.** Prove that $\mathcal{F}(\mathbb{N}) = \{S \subseteq \mathbb{N} : S \text{ is finite}\}$ is countable.

**Setup.** Unlike $\mathcal{P}(\mathbb{N})$ (which is uncountable, being $\sim \{0,1\}^\mathbb{N}$), the finite subsets form a much smaller family.

**Strategy.** Stratify by cardinality: $\mathcal{F}(\mathbb{N}) = \bigcup_{k \geq 0} F_k$ where $F_k = \{S \subseteq \mathbb{N} : |S| = k\}$.

**Computation.**

**Step 1: $F_0$ is countable.** $F_0 = \{\emptyset\}$, size $1$.

**Step 2: $F_k$ is countable for $k \geq 1$.** A subset $S = \{s_1 < s_2 < \cdots < s_k\}$ of size $k$ is uniquely determined by the ordered tuple $(s_1, \ldots, s_k) \in \mathbb{N}^k$ with $s_1 < s_2 < \cdots < s_k$. This gives an injection
$$F_k \hookrightarrow \mathbb{N}^k, \quad S \mapsto \text{increasing enumeration.}$$
$\mathbb{N}^k$ is countable (Theorem 4.18), so $F_k \subseteq $ countable set, hence $F_k$ countable.

**Step 3: Union.** $\mathcal{F}(\mathbb{N}) = \bigcup_{k \geq 0} F_k$ is a countable union of countable sets, so countable by Theorem 4.15.

**Verification.** $\mathcal{F}(\mathbb{N})$ is infinite (contains all $\{n\}$ for $n \in \mathbb{N}$), so $|\mathcal{F}(\mathbb{N})| = \aleph_0$.

**Interpretation.** Finite subsets = countable; all subsets = uncountable. The leap from $\aleph_0$ to $\mathfrak{c}$ occurs precisely when we admit infinite subsets. $\blacksquare$

*Alternative construction (explicit bijection).* Send each finite subset $S \subseteq \mathbb{N}$ to the natural number $\sum_{s \in S} 2^{s - 1}$ (characteristic function in binary). This is a bijection $\mathcal{F}(\mathbb{N}) \to \mathbb{N} \cup \{0\}$ (finite binary expansions). So $\mathcal{F}(\mathbb{N}) \sim \mathbb{N}$ directly.

---

### Example 4: Uncountability of binary sequences

**Example 4.29.** Show that $\{0, 1\}^{\mathbb{N}}$, the set of all infinite binary sequences, is uncountable.

**Setup.** An element of $\{0, 1\}^{\mathbb{N}}$ is a function $s : \mathbb{N} \to \{0, 1\}$, equivalently a sequence $(s_1, s_2, s_3, \ldots)$ with each $s_n \in \{0, 1\}$.

**Strategy.** The cleanest form of the diagonal argument: flip the diagonal bit.

**Computation.**

**Step 1: Assume countable.** Suppose for contradiction $\{0, 1\}^\mathbb{N}$ is countable, enumerated as
$$\{0, 1\}^\mathbb{N} = \{s^{(1)}, s^{(2)}, s^{(3)}, \ldots\},$$
where $s^{(n)} = (s^{(n)}_1, s^{(n)}_2, s^{(n)}_3, \ldots)$.

**Step 2: Lay out in a grid.**
$$
\begin{array}{c|ccccccc}
 & k = 1 & k = 2 & k = 3 & k = 4 & \cdots \\
\hline
s^{(1)}: & \mathbf{s^{(1)}_1} & s^{(1)}_2 & s^{(1)}_3 & s^{(1)}_4 & \cdots \\
s^{(2)}: & s^{(2)}_1 & \mathbf{s^{(2)}_2} & s^{(2)}_3 & s^{(2)}_4 & \cdots \\
s^{(3)}: & s^{(3)}_1 & s^{(3)}_2 & \mathbf{s^{(3)}_3} & s^{(3)}_4 & \cdots \\
\vdots & & & & & & \\
\end{array}
$$

**Step 3: Construct the "diagonal flip" sequence.** Define $t = (t_1, t_2, t_3, \ldots)$ by
$$t_n = 1 - s^{(n)}_n.$$

Since $s^{(n)}_n \in \{0, 1\}$, $t_n \in \{0, 1\}$ as well, so $t \in \{0, 1\}^\mathbb{N}$.

**Step 4: Derive a contradiction.** We claim $t \neq s^{(n)}$ for every $n$.

Indeed, the $n$-th coordinate of $t$ is $t_n = 1 - s^{(n)}_n$, which differs from $s^{(n)}_n$ (the $n$-th coordinate of $s^{(n)}$). So $t$ and $s^{(n)}$ disagree in position $n$, hence are different sequences.

But $t \in \{0, 1\}^\mathbb{N}$, so $t = s^{(k)}$ for some $k$ (by the enumeration). Yet we just showed $t \neq s^{(k)}$. Contradiction.

**Verification.** The contradiction is sharp: we constructed a specific sequence that evades the enumeration by design.

**Interpretation.** This is the cleanest form of the diagonal argument — no need to worry about decimal ambiguities (as in the Cantor theorem for $\mathbb{R}$). It shows $|\{0, 1\}^\mathbb{N}| > \aleph_0 $. In fact $|\{0, 1\}^\mathbb{N}| = \mathfrak{c}$: the map sending a sequence $s$ to the real number $0.s_1 s_2 s_3 \ldots$ in base 3 (using digits $0, 1$, avoiding 2 to prevent ambiguity) is an injection into $\mathbb{R}$, while $\mathbb{R} \hookrightarrow \{0, 1\}^\mathbb{N}$ via binary expansions. Schröder–Bernstein gives $|\{0, 1\}^\mathbb{N}| = \mathfrak{c}$. $\blacksquare$

---

### Example 5: $\mathbb{R} \sim \mathbb{R} \times \mathbb{R}$

**Example 4.30.** Show that $\mathbb{R}$ and $\mathbb{R} \times \mathbb{R}$ have the same cardinality.

**Setup.** Astonishingly (this result baffled Cantor himself in 1877), the "two-dimensional" plane and the "one-dimensional" line have the same cardinality. "I see it, but I don't believe it," Cantor wrote to Dedekind.

**Strategy.** Construct injections in both directions and apply Schröder–Bernstein.

**Computation.**

**Step 1: $\mathbb{R} \hookrightarrow \mathbb{R} \times \mathbb{R}$.** Trivial: $x \mapsto (x, 0)$ is injective. ✓

**Step 2: $\mathbb{R} \times \mathbb{R} \hookrightarrow \mathbb{R}$.** This is the interesting direction.

*Reduce to the unit square.* Since $\mathbb{R} \sim (0, 1)$ (Theorem 4.25), it suffices to inject $(0, 1) \times (0, 1) \hookrightarrow (0, 1)$.

*Interleave decimal expansions.* Given $(x, y) \in (0, 1) \times (0, 1)$, write each in its unique decimal expansion (using the non-terminating convention):
$$x = 0.a_1 a_2 a_3 a_4 \ldots, \qquad y = 0.b_1 b_2 b_3 b_4 \ldots$$

Define $\iota(x, y) = 0.a_1 b_1 a_2 b_2 a_3 b_3 \ldots \in (0, 1)$ by interleaving.

*Injectivity.* Suppose $\iota(x, y) = \iota(x', y')$. Their decimal expansions (in the unique non-terminating form) must agree in every digit. Reading off odd-indexed digits: $a_n = a'_n$ for all $n$, so $x = x'$. Reading even-indexed digits: $b_n = b'_n$, so $y = y'$.

*A subtle issue.* The interleaved digit string may not itself be in non-terminating form. For instance, if $x = 0.19999\ldots$ and $y = 0.19999\ldots$, the interleave is $0.11999\ldots99\ldots$, which terminates in $9$s — non-terminating already. This is fine: we work with the **unique** expansion and only need injectivity, which the argument above gives. An alternate robust construction uses **continued fractions**: every irrational $x \in (0, 1)$ has a unique continued fraction expansion $[0; a_1, a_2, a_3, \ldots]$ with $a_i \in \mathbb{N}$, and interleaving the $a_i, b_i$ of $x, y$ gives an injection restricted to irrationals, which suffices since $\mathbb{R}$ and $\mathbb{R} \setminus \mathbb{Q}$ have the same cardinality (Corollary 4.22).

**Step 3: Apply Schröder–Bernstein.** Steps 1 and 2 give injections $\mathbb{R} \hookrightarrow \mathbb{R}^2$ and $\mathbb{R}^2 \hookrightarrow \mathbb{R}$, so $\mathbb{R} \sim \mathbb{R}^2$ by Theorem 4.24.

**Verification.** Both have cardinality $\mathfrak{c}$.

**Interpretation.** This shows **dimension is not a cardinality invariant**. A 1D line has the same number of points as a 2D plane or an $n$-D space ($\mathbb{R}^n \sim \mathbb{R}$ by induction). The notion that distinguishes them is **topological** (dimension requires continuous maps, and continuous bijections $\mathbb{R}^m \to \mathbb{R}^n$ don't exist for $m \neq n$ — invariance of domain). Cardinality is a very coarse measure of "size". $\blacksquare$

---

## Practice Problems

1. Prove that $\mathbb{N}^3 = \mathbb{N} \times \mathbb{N} \times \mathbb{N}$ is countable.

2. Show that any collection of pairwise disjoint non-empty open intervals in $\mathbb{R}$ is countable.

3. Prove that $|C(\mathbb{R})| = \mathfrak{c}$, where $C(\mathbb{R})$ is the set of continuous functions $\mathbb{R} \to \mathbb{R}$. *Hint:* a continuous function is determined by its values on $\mathbb{Q}$.

4. Show that the power set $\mathcal{P}(\mathbb{N})$ is uncountable and $|\mathcal{P}(\mathbb{N})| = \mathfrak{c}$.

5. Let $A$ be countably infinite. Show that the set of all finite sequences from $A$ is countable.

6. Show that the set of all monotonic functions $\mathbb{R} \to \mathbb{R}$ has cardinality $\mathfrak{c}$.

7. Prove that the set of **open subsets** of $\mathbb{R}$ has cardinality $\mathfrak{c}$.

### Solutions

---

#### Solution 1: $\mathbb{N}^3$ is countable

**Setup.** $\mathbb{N}^3 = \mathbb{N} \times \mathbb{N} \times \mathbb{N}$.

**Strategy.** Apply the finite product theorem (Theorem 4.18).

**Computation.**

*Method 1 (direct).* $\mathbb{N}$ is countable. $\mathbb{N}^3$ is a product of three countable sets. By Theorem 4.18 (finite product of countable), $\mathbb{N}^3$ is countable.

*Method 2 (iteration).* $\mathbb{N}^2$ is countable (Corollary 4.16). Then $\mathbb{N}^3 \sim \mathbb{N}^2 \times \mathbb{N}$ is a product of two countable sets, hence countable.

*Method 3 (explicit bijection).* Iterate the Cantor pairing function $\pi$:
$$\mathbb{N}^3 \to \mathbb{N}, \quad (a, b, c) \mapsto \pi(\pi(a, b), c).$$
This is a bijection (composition of bijections).

**Verification.** The concrete enumeration via Method 3: $\pi(1, 1) = 1$, so $(1, 1, 1) \mapsto \pi(1, 1) = 1$, etc.

**Interpretation.** By induction $\mathbb{N}^k$ is countable for every $k \in \mathbb{N}$; but $\mathbb{N}^\mathbb{N}$ (infinite sequences of naturals) is **uncountable** with $|\mathbb{N}^\mathbb{N}| = \mathfrak{c}$. The finite-$k$ case and the infinite case diverge sharply. $\blacksquare$

---

#### Solution 2: Disjoint open intervals

**Setup.** Let $\mathcal{I} = \{I_\alpha\}_{\alpha \in \Lambda}$ be a family of pairwise disjoint non-empty open intervals in $\mathbb{R}$.

**Strategy.** Use density of $\mathbb{Q}$: pick a rational inside each interval, injecting $\mathcal{I}$ into $\mathbb{Q}$.

**Computation.**

**Step 1: Choose a rational inside each interval.** By the density of $\mathbb{Q}$ in $\mathbb{R}$ (proved in [[03-supremum-and-infimum]]), each non-empty open interval $I_\alpha = (a_\alpha, b_\alpha)$ with $a_\alpha < b_\alpha$ contains at least one rational number $q_\alpha \in I_\alpha \cap \mathbb{Q}$.

(Formally, we invoke the axiom of choice to pick one such $q_\alpha$ per $\alpha$. A standard workaround: enumerate $\mathbb{Q} = \{r_1, r_2, \ldots\}$ and let $q_\alpha$ be the rational of smallest index in $I_\alpha$ — this is definable, no choice needed.)

**Step 2: The map $\alpha \mapsto q_\alpha$ is injective.** Suppose $q_\alpha = q_\beta$ for $\alpha, \beta \in \Lambda$. Then $q_\alpha \in I_\alpha \cap I_\beta$. By pairwise disjointness of the family, $I_\alpha \cap I_\beta \neq \emptyset$ forces $I_\alpha = I_\beta$, i.e., $\alpha = \beta$.

**Step 3: Conclude.** The map $\Lambda \to \mathbb{Q}$, $\alpha \mapsto q_\alpha$, is injective. $\mathbb{Q}$ is countable (Corollary 4.19), so $\Lambda$ is countable (Theorem 4.13).

**Verification.** This argument works verbatim in any separable metric space: open sets are determined by a countable base, so any disjoint family is countable.

**Interpretation.** This is a fundamental **countability from density** argument, key in measure theory: the open subsets of $\mathbb{R}$ can be written as countable disjoint unions of open intervals, hence are Borel-measurable. Moreover, the structure of open sets in $\mathbb{R}^n$ is controlled by a countable base (e.g., balls with rational centers and rational radii). $\blacksquare$

---

#### Solution 3: Continuous functions $\mathbb{R} \to \mathbb{R}$

**Setup.** Let $C(\mathbb{R}) = \{f : \mathbb{R} \to \mathbb{R} \mid f \text{ continuous}\}$.

**Strategy.** Sandwich $|C(\mathbb{R})|$ between $\mathfrak{c}$ (via constants) and $\mathfrak{c}$ (via restriction to $\mathbb{Q}$). Apply Schröder–Bernstein.

**Computation.**

**Step 1: $\mathfrak{c} \leq |C(\mathbb{R})|$.** The constant functions $\mathbb{R} \to \mathbb{R}$, $f_c(x) = c$ for each $c \in \mathbb{R}$, are continuous. The map $c \mapsto f_c$ is injective: $f_c = f_{c'}$ implies $c = c'$. So $\mathbb{R} \hookrightarrow C(\mathbb{R})$, giving $|C(\mathbb{R})| \geq \mathfrak{c}$.

**Step 2: $|C(\mathbb{R})| \leq \mathfrak{c}$.** This is the non-trivial direction.

*Key lemma (Determination by rationals).* If $f, g \in C(\mathbb{R})$ and $f|_\mathbb{Q} = g|_\mathbb{Q}$, then $f = g$.

*Proof of lemma.* Given $x \in \mathbb{R}$, pick a sequence $(q_n) \subset \mathbb{Q}$ with $q_n \to x$ (density of $\mathbb{Q}$). By continuity of $f$ and $g$:
$$f(x) = \lim_{n \to \infty} f(q_n) = \lim_{n \to \infty} g(q_n) = g(x),$$
where the middle equality uses $f(q_n) = g(q_n)$ for all $n$. So $f = g$. ✓

*Restriction map.* Define $R : C(\mathbb{R}) \to \mathbb{R}^\mathbb{Q}$, $R(f) = f|_\mathbb{Q}$. By the lemma, $R$ is injective.

*Cardinality of $\mathbb{R}^\mathbb{Q}$.* We have 
$$|\mathbb{R}^\mathbb{Q}| = \mathfrak{c}^{\aleph_0} = (2^{\aleph_0})^{\aleph_0} = 2^{\aleph_0 \cdot \aleph_0} = 2^{\aleph_0} = \mathfrak{c}.$$
Here we use: $\mathfrak{c} = 2^{\aleph_0}$; cardinal exponentiation rules $(2^a)^b = 2^{ab}$ and $\aleph_0 \cdot \aleph_0 = \aleph_0$ (since $\mathbb{N}^2 \sim \mathbb{N}$).

So $|C(\mathbb{R})| \leq |\mathbb{R}^\mathbb{Q}| = \mathfrak{c}$.

**Step 3: Apply Schröder–Bernstein.** From Steps 1 and 2, $\mathfrak{c} \leq |C(\mathbb{R})| \leq \mathfrak{c}$, so $|C(\mathbb{R})| = \mathfrak{c}$.

**Verification.** The identity $x \mapsto x$, polynomials $p(x)$, $\sin, \cos, e^x$, etc., are all continuous; the space $C(\mathbb{R})$ is very rich. Yet cardinality-wise, it is no larger than $\mathbb{R}$ itself.

**Interpretation.** This is surprising at first: the "space of continuous functions" feels vastly bigger than $\mathbb{R}$. But the continuity constraint is extremely restrictive — it reduces the "degrees of freedom" from $\mathfrak{c}^\mathfrak{c} = 2^\mathfrak{c}$ (all functions) to $\mathfrak{c}^{\aleph_0} = \mathfrak{c}$ (continuous functions). The entire function is pinned down by countably many values.

**Contrast.** The set of **all** functions $\mathbb{R} \to \mathbb{R}$ has cardinality $\mathfrak{c}^\mathfrak{c} = 2^\mathfrak{c} > \mathfrak{c}$, strictly larger than $C(\mathbb{R})$. $\blacksquare$

---

#### Solution 4: $\mathcal{P}(\mathbb{N})$ has cardinality $\mathfrak{c}$

**Setup.** We need to show $\mathcal{P}(\mathbb{N})$ is uncountable and in fact has cardinality $\mathfrak{c}$.

**Strategy.** 
(a) Bijection $\mathcal{P}(\mathbb{N}) \to \{0, 1\}^\mathbb{N}$ via indicator functions; then use Example 4.29.
(b) Show $\{0, 1\}^\mathbb{N} \sim \mathbb{R}$ via Schröder–Bernstein.

**Computation.**

**Step 1: $\mathcal{P}(\mathbb{N}) \sim \{0, 1\}^\mathbb{N}$.** Define the indicator map:
$$\chi : \mathcal{P}(\mathbb{N}) \to \{0, 1\}^\mathbb{N}, \qquad \chi(S) = \mathbf{1}_S = (\mathbf{1}_S(1), \mathbf{1}_S(2), \mathbf{1}_S(3), \ldots),$$
where $\mathbf{1}_S(n) = 1$ if $n \in S$ and $0$ otherwise.

*Injective.* If $\chi(S) = \chi(T)$, then $\mathbf{1}_S(n) = \mathbf{1}_T(n)$ for all $n$, so $n \in S \iff n \in T$, hence $S = T$.

*Surjective.* Given $t \in \{0, 1\}^\mathbb{N}$, let $S = \{n \in \mathbb{N} : t_n = 1\}$. Then $\chi(S) = t$.

So $\chi$ is a bijection and $|\mathcal{P}(\mathbb{N})| = |\{0, 1\}^\mathbb{N}|$.

**Step 2: $\mathcal{P}(\mathbb{N})$ is uncountable.** By Example 4.29, $\{0, 1\}^\mathbb{N}$ is uncountable, so $\mathcal{P}(\mathbb{N})$ is too. (This also follows from Cantor's theorem 4.23: $|\mathcal{P}(\mathbb{N})| > |\mathbb{N}| = \aleph_0$.)

**Step 3: $|\{0, 1\}^\mathbb{N}| = \mathfrak{c}$.**

*$\{0, 1\}^\mathbb{N} \hookrightarrow \mathbb{R}$.* Map $(t_n) \mapsto \sum_{n=1}^\infty t_n / 3^n \in [0, 1/2]$. This is injective: different sequences give different base-$3$ expansions (using digits $0, 1$, which uniquely determine the real, as digits avoid $2$ and there's no $\ldots 222\ldots$ carryover issue).

*$\mathbb{R} \hookrightarrow \{0, 1\}^\mathbb{N}$.* By Theorem 4.25, $\mathbb{R} \sim (0, 1)$. Given $x \in (0, 1)$, use its unique **non-terminating binary expansion** $x = 0.c_1 c_2 c_3 \ldots$ with $c_n \in \{0, 1\}$; map $x \mapsto (c_1, c_2, \ldots) \in \{0, 1\}^\mathbb{N}$. Injective by uniqueness of expansion.

*Apply Schröder–Bernstein (Theorem 4.24).* Both injections exist, so $\{0, 1\}^\mathbb{N} \sim \mathbb{R}$.

**Step 4: Combine.** $|\mathcal{P}(\mathbb{N})| = |\{0, 1\}^\mathbb{N}| = \mathfrak{c}$.

**Verification.** This gives the standard identity $2^{\aleph_0} = \mathfrak{c}$ — the number of subsets of a countable set equals the size of the continuum.

**Interpretation.** This is the first concrete **bridge** between the arithmetic of cardinals ($2^{\aleph_0}$) and the "geometric" continuum ($\mathfrak{c}$). The continuum hypothesis asks whether $2^{\aleph_0} = \aleph_1$, i.e., whether there is a cardinality strictly between $\aleph_0$ and $\mathfrak{c}$. Gödel (1940) and Cohen (1963) established that CH is independent of ZFC. $\blacksquare$

---

#### Solution 5: Finite sequences from a countable set

**Setup.** Let $A$ be countably infinite, $A \sim \mathbb{N}$. The set of finite sequences from $A$ is
$$A^* = \bigcup_{n = 0}^\infty A^n = \{(a_1, \ldots, a_n) : n \geq 0, a_i \in A\},$$
where $A^0 = \{()\}$ is the singleton containing the empty sequence.

**Strategy.** Each $A^n$ is a finite product of countable sets; $A^*$ is a countable union of these.

**Computation.**

**Step 1: $A^0$ is countable.** Singleton, size $1$.

**Step 2: $A^n$ is countable for $n \geq 1$.** Since $A$ is countable, Theorem 4.18 (finite product of countable sets) gives that $A^n$ is countable.

**Step 3: Union is countable.** $A^* = \bigcup_{n = 0}^\infty A^n$ is a countable union (index set $\mathbb{N}$) of countable sets, so countable by Theorem 4.15.

**Verification.** For $A = \mathbb{N}$, the set $A^*$ is the set of all **finite tuples of naturals**, countable. Example enumeration: $(), (1), (2), (1, 1), (3), (1, 2), (2, 1), (1, 1, 1), \ldots$ — lexicographic by length then by some order.

**Interpretation.** The set of all finite **strings** over a countable alphabet is countable — the basis for Gödel numbering, proving that the set of formulas in any countable formal language is countable. Consequently, in any first-order theory, the set of theorems is countable.

*Contrast.* The set of **infinite** sequences $A^\mathbb{N}$ is uncountable: $|\mathbb{N}^\mathbb{N}| = \mathfrak{c}$. $\blacksquare$

---

#### Solution 6: Monotonic functions $\mathbb{R} \to \mathbb{R}$

**Setup.** Let $M(\mathbb{R}) = \{f : \mathbb{R} \to \mathbb{R} \mid f \text{ is monotone (non-decreasing or non-increasing)}\}$.

**Strategy.** Monotonic functions have at most countably many discontinuities, and are determined "almost" by their values on $\mathbb{Q}$. Use this to inject into $\mathbb{R}^\mathbb{Q} \times (\text{countable extra data})$.

**Computation.**

**Step 1: $\mathfrak{c} \leq |M(\mathbb{R})|$.** Constants are both non-decreasing and non-increasing (monotone), so constants give $\mathbb{R} \hookrightarrow M(\mathbb{R})$.

**Step 2: $|M(\mathbb{R})| \leq \mathfrak{c}$.** 

*Fact.* A monotonic $f : \mathbb{R} \to \mathbb{R}$ has at most countably many discontinuities (proof: at each discontinuity there is a jump $f(x^+) - f(x^-) > 0$, and disjoint jumps sum to at most $\|f\|_\text{var}$ on any bounded interval — only countably many can exceed $1/k$ for each $k$, and so the full set of discontinuities is a countable union of countable sets). WLOG, $f$ is non-decreasing.

*Determination by a countable dataset.* A non-decreasing $f$ is determined by the pair $(f|_\mathbb{Q}, f|_D)$ where $D$ is the (countable) set of discontinuities together with left- and right-limits there. Actually, a cleaner statement:

*Cleaner injection.* Define $\Phi : M(\mathbb{R}) \to \mathbb{R}^\mathbb{Q}$, $\Phi(f) = f|_\mathbb{Q}$. 

*Claim.* For non-decreasing $f$, $\Phi(f)$ determines $f(x)$ at every continuity point $x$ of $f$: $f(x) = \sup\{f(q) : q \in \mathbb{Q}, q < x\} = \inf\{f(q) : q \in \mathbb{Q}, q > x\}$.

At discontinuity points, $f|_\mathbb{Q}$ determines the left- and right-limits but not the specific value $f(x)$ (which lies in $[f(x^-), f(x^+)]$). The discontinuities are countably many, say $\{x_1, x_2, \ldots\}$, and the values $\{f(x_1), f(x_2), \ldots\}$ are an extra datum.

*Injection.* $\Psi : M(\mathbb{R}) \to \mathbb{R}^\mathbb{Q} \times \mathbb{R}^\mathbb{N}$, $f \mapsto (f|_\mathbb{Q}, (f(x_n))_n)$ (with $x_n$ enumerating discontinuities; if there are fewer than $\aleph_0$ we pad).

*Cardinality.* $|\mathbb{R}^\mathbb{Q} \times \mathbb{R}^\mathbb{N}| = \mathfrak{c} \cdot \mathfrak{c} = \mathfrak{c}$.

So $|M(\mathbb{R})| \leq \mathfrak{c}$.

**Step 3: Schröder–Bernstein.** $|M(\mathbb{R})| = \mathfrak{c}$.

**Verification.** Specific example: every CDF (cumulative distribution function) is a non-decreasing function $\mathbb{R} \to [0, 1]$, and the set of probability measures on $\mathbb{R}$ is in bijection with CDFs, with cardinality $\mathfrak{c}$ (contained in $M(\mathbb{R})$).

**Interpretation.** Despite the freedom in choosing monotonic functions, they are controlled by countable data (values on $\mathbb{Q}$ plus discontinuities). Same-order-of-cardinality as continuous functions. $\blacksquare$

---

#### Solution 7: Open subsets of $\mathbb{R}$

**Setup.** Let $\mathcal{U} = \{U \subseteq \mathbb{R} : U \text{ is open}\}$.

**Strategy.** Every open set in $\mathbb{R}$ is a countable disjoint union of open intervals (structure theorem). Intervals are described by pairs of endpoints; sequences of intervals give a countable-product-like structure, total cardinality $\mathfrak{c}$.

**Computation.**

**Step 1: $\mathfrak{c} \leq |\mathcal{U}|$.** For each $r \in \mathbb{R}$, the set $(-\infty, r)$ is open. Different $r$ give different sets, so $\mathbb{R} \hookrightarrow \mathcal{U}$, $r \mapsto (-\infty, r)$.

**Step 2: $|\mathcal{U}| \leq \mathfrak{c}$.**

*Structure theorem.* Every non-empty open $U \subseteq \mathbb{R}$ is a **countable** disjoint union of open intervals $U = \bigcup_{n} I_n$, each $I_n = (a_n, b_n)$ with $-\infty \leq a_n < b_n \leq +\infty$. (This follows from Solution 2: the connected components are disjoint open intervals, countable in number.)

*Encoding.* We can represent each component $I_n$ by its endpoint pair $(a_n, b_n) \in \overline{\mathbb{R}}^2$ where $\overline{\mathbb{R}} = [-\infty, +\infty]$. Ordering components by, say, the smallest rational inside, we get a sequence $(I_1, I_2, \ldots)$. The map
$$U \mapsto ((a_1, b_1), (a_2, b_2), \ldots) \in \overline{\mathbb{R}}^{2 \mathbb{N}}$$
is injective.

*Cardinality.* $|\overline{\mathbb{R}}^{2\mathbb{N}}| = |\mathbb{R}^\mathbb{N}| = \mathfrak{c}^{\aleph_0} = \mathfrak{c}$.

So $|\mathcal{U}| \leq \mathfrak{c}$.

**Step 3: Schröder–Bernstein.** $|\mathcal{U}| = \mathfrak{c}$.

**Verification.** Finite open sets are a small subset; open sets include $\mathbb{R}$, $\emptyset$, all open intervals, and their countable disjoint unions. The total count is $\mathfrak{c}$.

**Interpretation.** The Borel $\sigma$-algebra $\mathcal{B}(\mathbb{R})$ (generated by open sets) also has cardinality $\mathfrak{c}$ (by transfinite induction and cardinal arithmetic). But the full power set $\mathcal{P}(\mathbb{R})$ has cardinality $2^\mathfrak{c}$, which is strictly larger. So "most" subsets of $\mathbb{R}$ are non-Borel — the existence of Lebesgue-measurable non-Borel sets and non-measurable sets fits in this cardinality gap. $\blacksquare$

---

## 4.9 Cross-References

**Previous:** 
- [[01-real-number-system]] — $\mathbb{Q} \subsetneq \mathbb{R}$: irrationals exist and are uncountable (Corollary 4.22)
- [[03-supremum-and-infimum]] — density of $\mathbb{Q}$ used above (Solutions 2, 7)

**Next:** 
- [[05-open-sets-closed-sets]] — disjoint open intervals form a countable family (Solution 2); structure of open sets in $\mathbb{R}$ (Solution 7)
- [[06-compact-sets]] — countable compactness, Bolzano–Weierstrass
- [[08-sequences-introduction]] — countable sets match naturally with sequences (Theorem 4.14)
- [[09-continuity-fundamentals]] — continuous functions determined by dense subsets (Solution 3)
