# 5. Permutation Groups and Dihedral Groups

> **Why permutations dominate group theory.** Cayley's theorem (proved in [[17-homomorphisms-and-isomorphisms]]) says: *every group is isomorphic to a subgroup of some $S_n$*. That makes permutation groups the universal object of study. Concretely, many finite groups — $\mathbb{Z}_n$, $D_n$, $A_n$, the quaternion group — admit natural representations as permutation groups. This chapter develops the machinery: cycle notation, transpositions, parity, and the alternating group.

---

## 5.1 The Symmetric Group $S_n$

> **Definition.** Let $X = \{1, 2, \ldots, n\}$. The **symmetric group** $S_n$ is the group of all bijections $X \to X$ under composition.

**Order:** $|S_n| = n!$

A permutation $\sigma \in S_n$ can be written in **two-line notation**:
$$\sigma = \begin{pmatrix} 1 & 2 & 3 & \cdots & n \\ \sigma(1) & \sigma(2) & \sigma(3) & \cdots & \sigma(n) \end{pmatrix}.$$

**Example 1.** $S_3$ has $3! = 6$ elements:
$$\text{id}, \quad \begin{pmatrix}1\,2\,3\\2\,1\,3\end{pmatrix}, \quad \begin{pmatrix}1\,2\,3\\3\,2\,1\end{pmatrix}, \quad \begin{pmatrix}1\,2\,3\\1\,3\,2\end{pmatrix}, \quad \begin{pmatrix}1\,2\,3\\2\,3\,1\end{pmatrix}, \quad \begin{pmatrix}1\,2\,3\\3\,1\,2\end{pmatrix}.$$

---

## 5.2 Cycle Notation

Two-line notation is clunky. **Cycle notation** is more economical.

> **Definition.** A **cycle** $(a_1\, a_2\, \ldots\, a_k)$ is the permutation that sends $a_1 \to a_2 \to \cdots \to a_k \to a_1$ and fixes all other elements. Its **length** is $k$. A cycle of length 2 is a **transposition**.

**Example 2.** $\sigma = \begin{pmatrix}1\,2\,3\,4\,5\\3\,5\,1\,4\,2\end{pmatrix}$: trace $1 \to 3 \to 1$ (cycle $(1\,3)$) and $2 \to 5 \to 2$ (cycle $(2\,5)$) and $4 \to 4$ (fixed). So $\sigma = (1\,3)(2\,5)$.

> **Theorem 5.1.** Every permutation is a product of disjoint cycles, uniquely up to the order of the cycles.

*Proof sketch.* Pick $x_1 \in \{1, \ldots, n\}$. Follow the orbit $x_1, \sigma(x_1), \sigma^2(x_1), \ldots$ until it returns — this gives one cycle. Pick an element not in this cycle, repeat. Since the cycles are disjoint, the order doesn't matter. $\blacksquare$

### Conventions

- We usually suppress fixed points: $(1\,3)(2\,5)$ rather than $(1\,3)(2\,5)(4)$.
- Composition is written $\alpha \beta$ = "apply $\beta$ first, then $\alpha$" (right-to-left).
- A cycle $(a_1\, a_2\, \ldots\, a_k)$ has order $k$.
- Disjoint cycles **commute**: $(1\,2)(3\,4) = (3\,4)(1\,2)$.

### Order of a permutation

> **Theorem 5.2.** If $\sigma = c_1 c_2 \cdots c_r$ is a disjoint cycle decomposition with $c_i$ of length $\ell_i$, then
> $$|\sigma| = \text{lcm}(\ell_1, \ell_2, \ldots, \ell_r).$$

*Proof.* $\sigma^k = c_1^k c_2^k \cdots c_r^k$ (disjoint cycles commute). $\sigma^k = e$ iff each $c_i^k = e$ iff $\ell_i \mid k$ for each $i$, iff $\text{lcm}(\ell_i) \mid k$. $\blacksquare$

**Example 3.** $\sigma = (1\,2\,3)(4\,5) \in S_5$: $|\sigma| = \text{lcm}(3, 2) = 6$.

**Example 4.** $\sigma = (1\,2)(3\,4)(5\,6\,7)$: $|\sigma| = \text{lcm}(2, 2, 3) = 6$.

---

## 5.3 Transpositions and Parity

> **Theorem 5.3.** Every permutation is a product of transpositions.
>
> *Proof.* By Theorem 5.1, enough to decompose a cycle: $(a_1\, a_2\, \ldots\, a_k) = (a_1\, a_k)(a_1\, a_{k-1}) \cdots (a_1\, a_2)$.
> A $k$-cycle is a product of $k - 1$ transpositions. $\blacksquare$

**Example 5.** $(1\,2\,3\,4) = (1\,4)(1\,3)(1\,2)$. Three transpositions.

### The sign of a permutation

The decomposition into transpositions is **not unique** in length, but the **parity** (even/odd number) is invariant.

> **Theorem 5.4 (Parity Theorem).** Let $\sigma \in S_n$. Whenever $\sigma = t_1 t_2 \cdots t_r$ is written as a product of transpositions, the parity of $r$ depends only on $\sigma$.

*Proof (via the sign homomorphism).* Define $\text{sgn}(\sigma) = \prod_{i < j} \frac{\sigma(j) - \sigma(i)}{j - i} \in \{\pm 1\}$. A direct computation (see textbooks) shows:
- $\text{sgn}(\text{id}) = 1$.
- $\text{sgn}(\tau) = -1$ for every transposition $\tau$.
- $\text{sgn}(\sigma \rho) = \text{sgn}(\sigma) \text{sgn}(\rho)$.

Hence $\text{sgn}(t_1 \cdots t_r) = (-1)^r$, forcing $r$'s parity to be determined by $\sigma$. $\blacksquare$

> **Definition.** $\sigma$ is **even** if $\text{sgn}(\sigma) = +1$ (equivalently, an even number of transpositions), and **odd** if $\text{sgn}(\sigma) = -1$.

A $k$-cycle is *even* if $k$ is *odd*, and *odd* if $k$ is *even* (since a $k$-cycle = product of $k-1$ transpositions).

**Example 6.** $(1\,2\,3)$: 3-cycle, even.
$(1\,2\,3\,4)$: 4-cycle, odd.
$(1\,2)(3\,4\,5)$: parity $1 + 2 = 3$... wait, parities add. Transposition ($-1$) × $3$-cycle ($+1$) = $-1$, odd.

---

## 5.4 The Alternating Group $A_n$

> **Definition.** $A_n = \{\sigma \in S_n : \text{sgn}(\sigma) = +1\}$ is the **alternating group** on $n$ letters.

**Properties:**
- $A_n \leq S_n$ (kernel of the sign homomorphism).
- $|A_n| = n!/2$ for $n \geq 2$.
- $A_n$ is non-abelian for $n \geq 4$.
- $A_n$ is **simple** (no nontrivial proper normal subgroups) for $n \geq 5$ — a deep theorem essential to Galois's insolvability of the quintic.

**Example 7.** $A_3 = \{e, (1\,2\,3), (1\,3\,2)\}$, cyclic of order 3.

**Example 8.** $A_4$ has order 12. Its elements:
- $e$ (1)
- 8 three-cycles: $(1\,2\,3), (1\,3\,2), (1\,2\,4), (1\,4\,2), (1\,3\,4), (1\,4\,3), (2\,3\,4), (2\,4\,3)$
- 3 double-transpositions: $(1\,2)(3\,4), (1\,3)(2\,4), (1\,4)(2\,3)$
- Total 12.

The three double-transpositions plus identity form a normal subgroup isomorphic to $V_4$. $A_4$ is non-abelian but not simple.

---

## 5.5 The Dihedral Group $D_n$ as a Permutation Group

The dihedral group $D_n$ (symmetries of regular $n$-gon) embeds into $S_n$ via its action on the $n$ vertices.

**Example 9 ($D_3 \subset S_3$).** Label vertices $1, 2, 3$. Rotations: $e, (1\,2\,3), (1\,3\,2)$. Reflections (through each vertex): $(2\,3), (1\,3), (1\,2)$. Total 6 elements = $S_3$. **$D_3 = S_3$ as subgroups of $S_3$.**

**Example 10 ($D_4 \subset S_4$).** Vertices $1, 2, 3, 4$ of the square in cyclic order. Rotations:
- $e$
- $r = (1\,2\,3\,4)$
- $r^2 = (1\,3)(2\,4)$
- $r^3 = (1\,4\,3\,2)$

Reflections:
- $s_1 = (2\,4)$ (through vertex 1 and vertex 3)
- $s_2 = (1\,3)$ (through vertex 2 and vertex 4)
- $s_3 = (1\,2)(3\,4)$ (through midpoints of edges 1-2 and 3-4)
- $s_4 = (1\,4)(2\,3)$ (through midpoints of edges 1-4 and 2-3)

8 elements total. $|D_4| = 8 \neq 24 = |S_4|$, so $D_4 \subsetneq S_4$.

**Example 11 ($D_5 \subset S_5$).** Order 10.

---

## 5.6 Conjugation in $S_n$

> **Theorem 5.5 (Conjugation formula).** For $\sigma \in S_n$ and a cycle $(a_1\, a_2\, \ldots\, a_k)$:
> $$\sigma (a_1\, a_2\, \ldots\, a_k) \sigma^{-1} = (\sigma(a_1)\, \sigma(a_2)\, \ldots\, \sigma(a_k)).$$

*Proof.* Both sides act the same way: the LHS sends $\sigma(a_i)$ to $\sigma(a_{i+1})$, and the RHS does the same. $\blacksquare$

> **Corollary 5.6.** Two permutations in $S_n$ are conjugate iff they have the same **cycle type** (same multiset of cycle lengths).

**Example 12.** In $S_5$, $(1\,2\,3)$ and $(4\,5\,1)$ are conjugate (both 3-cycles). Take $\sigma = (1\,4)(2\,5)$: $\sigma (1\,2\,3) \sigma^{-1} = (\sigma(1)\, \sigma(2)\, \sigma(3)) = (4\,5\,3)$. Not quite — trying $\sigma = (1\,4\,2\,5\,3)$: $\sigma(1) = 4, \sigma(2) = 5, \sigma(3) = 1$. So $\sigma (1\,2\,3) \sigma^{-1} = (4\,5\,1)$. ✓

**Conjugacy classes of $S_5$.** Cycle types (partitions of 5):
| Type | Example | Size of class |
| ---- | ------- | ------------- |
| $1^5$ | $e$ | 1 |
| $2\,1^3$ | $(1\,2)$ | $\binom{5}{2} = 10$ |
| $2^2\,1$ | $(1\,2)(3\,4)$ | 15 |
| $3\,1^2$ | $(1\,2\,3)$ | 20 |
| $3\,2$ | $(1\,2\,3)(4\,5)$ | 20 |
| $4\,1$ | $(1\,2\,3\,4)$ | 30 |
| $5$ | $(1\,2\,3\,4\,5)$ | 24 |
| **Total** | | 120 ✓ |

(Class size = $n! / $ centralizer size; see [[16-centralizer-normalizer-stabilizer]].)

---

## 5.7 Worked Examples

**Example 13 (Compute product).** In $S_6$, compute $(1\,2\,3)(4\,5)(2\,4\,6)$.

*Solution.* Apply right-to-left: $(2\,4\,6)$ first. Trace each element:
- $1 \to 1 \to 1 \to 1$. $(2\,4\,6)(1) = 1$; $(4\,5)(1) = 1$; $(1\,2\,3)(1) = 2$. So $1 \to 2$.
- $2 \to 4 \to 5 \to 5$. $(2\,4\,6)(2) = 4$; $(4\,5)(4) = 5$; $(1\,2\,3)(5) = 5$. So $2 \to 5$.
- $3 \to 3 \to 3 \to 1$. $3 \to 1$.
- $4 \to 6 \to 6 \to 6$. $4 \to 6$.
- $5 \to 5 \to 4 \to 4$. $5 \to 4$.
- $6 \to 2 \to 2 \to 3$. $6 \to 3$.

Permutation: $1 \to 2, 2 \to 5, 5 \to 4, 4 \to 6, 6 \to 3, 3 \to 1$. Single cycle: $(1\,2\,5\,4\,6\,3)$. $\blacksquare$

**Example 14 (Order and parity).** $\sigma = (1\,2\,3\,4\,5\,6\,7)(8\,9)$. Find order and parity.

*Solution.* Order = $\text{lcm}(7, 2) = 14$. Parity: 7-cycle is even (6 transpositions), 2-cycle odd (1 transposition), total 7 transpositions = odd. $\blacksquare$

**Example 15 (Express as transpositions).** Write $(1\,3\,5\,7\,9)$ as transpositions.

*Solution.* $(1\,3\,5\,7\,9) = (1\,9)(1\,7)(1\,5)(1\,3)$. Four transpositions, so even. ✓ $\blacksquare$

**Example 16 (Inverse of a cycle).** Find the inverse of $(1\,2\,3\,4\,5)$.

*Solution.* Reverse: $(1\,5\,4\,3\,2)$. Check: $(1\,2\,3\,4\,5)(1\,5\,4\,3\,2)(1) = (1\,2\,3\,4\,5)(5) = 1$. ✓ $\blacksquare$

**Example 17 (Order of elements in $S_5$).** What orders are possible?

*Solution.* Possible cycle types (partitions of 5) and $\text{lcm}$:
| Cycle type | lcm |
| --- | --- |
| $1^5$ | 1 |
| $2\,1^3$ | 2 |
| $3\,1^2$ | 3 |
| $2^2\,1$ | 2 |
| $4\,1$ | 4 |
| $3\,2$ | 6 |
| $5$ | 5 |

Possible orders: $\{1, 2, 3, 4, 5, 6\}$. Note $6$ is achieved despite $S_5$ having no element of order equal to $|S_5|/$ anything simple. $\blacksquare$

**Example 18 (Is $\sigma \in A_n$?).** Determine which of $(1\,2\,3)$, $(1\,2)(3\,4)$, $(1\,2\,3\,4)$ are in $A_n$.

*Solution.* 
- $(1\,2\,3)$: 3-cycle, even ✓ → $A_n$.
- $(1\,2)(3\,4)$: 2 transpositions, even ✓ → $A_n$.
- $(1\,2\,3\,4)$: 4-cycle = 3 transpositions, odd ✗. $\blacksquare$

---

## 5.8 Practice Problems

1. Write $(1\,2\,3\,4\,5\,6)$ as a product of transpositions.
2. Find the order of $\sigma = (1\,2\,3)(4\,5\,6\,7)(8\,9) \in S_9$.
3. Is $A_4$ abelian?
4. Show that $(1\,2\,3)$ and $(1\,3\,2)$ are inverses.
5. In $S_4$, find all elements of order 3.
6. Compute the number of elements of order 2 in $S_4$.
7. Show that any two transpositions in $S_n$ are conjugate.
8. Prove that $S_n$ is generated by the transpositions $(1\,2), (1\,3), \ldots, (1\,n)$.

### Solutions

**Solution 1.** $(1\,2\,3\,4\,5\,6) = (1\,6)(1\,5)(1\,4)(1\,3)(1\,2)$. Five transpositions. $\blacksquare$

**Solution 2.** $\text{lcm}(3, 4, 2) = 12$. $\blacksquare$

**Solution 3.** No. $(1\,2\,3)(1\,2)(3\,4) = ?$ Actually $A_4$ contains $(1\,2\,3)$ and $(1\,2)(3\,4)$. Compute $(1\,2\,3)(1\,2)(3\,4) = (1\,2\,3)(1\,2)(3\,4)$: first $(3\,4): 1\to 1, 2\to 2, 3\to 4, 4\to 3$. Then $(1\,2): 1\to 2, 2\to 1, 3\to 3, 4\to 4$. Then $(1\,2\,3): 1\to 2, 2\to 3, 3\to 1, 4\to 4$. Composition: $1 \to 1 \to 2 \to 3$; $2 \to 2 \to 1 \to 2$; wait need to recompute. Composition $(1\,2\,3)(1\,2)(3\,4)$ applied to $x$ means: first $(3\,4)$, then $(1\,2)$, then $(1\,2\,3)$. $1 \mapsto 1 \mapsto 2 \mapsto 3$. $2 \mapsto 2 \mapsto 1 \mapsto 2$. $3 \mapsto 4 \mapsto 4 \mapsto 4$. $4 \mapsto 3 \mapsto 3 \mapsto 1$. Result: $1 \to 3, 2 \to 2, 3 \to 4, 4 \to 1$, i.e., $(1\,3\,4)$.

Now reverse order: $(1\,2)(3\,4)(1\,2\,3) = ?$ $1 \to 2 \to 2 \to 2 \to 1$... let me redo. Apply $(1\,2\,3)$ first: $1 \to 2, 2 \to 3, 3 \to 1, 4 \to 4$. Then $(3\,4)$: $2 \to 2, 3 \to 4, 1 \to 1, 4 \to 3$. Then $(1\,2)$: $2 \to 1, 4 \to 4, 1 \to 2, 3 \to 3$. Composition: $1 \to 2 \to 2 \to 1$; $2 \to 3 \to 4 \to 4$; $3 \to 1 \to 1 \to 2$; $4 \to 4 \to 3 \to 3$. Result: $1 \to 1, 2 \to 4, 3 \to 2, 4 \to 3$, i.e., $(2\,4\,3)$.

So $(1\,2\,3)(1\,2)(3\,4) = (1\,3\,4) \neq (2\,4\,3) = (1\,2)(3\,4)(1\,2\,3)$. $A_4$ not abelian. $\blacksquare$

**Solution 4.** $(1\,2\,3)(1\,3\,2) = ?$ $1 \to 3 \to 1, 2 \to 1 \to 2, 3 \to 2 \to 3$. Identity. ✓ $\blacksquare$

**Solution 5.** Order 3 means a 3-cycle. In $S_4$: $(1\,2\,3), (1\,3\,2), (1\,2\,4), (1\,4\,2), (1\,3\,4), (1\,4\,3), (2\,3\,4), (2\,4\,3)$ — 8 elements. $\blacksquare$

**Solution 6.** Order 2: cycle types $2\,1^2$ (transpositions) and $2^2$ (double transpositions).
- Transpositions: $\binom{4}{2} = 6$.
- Double transpositions: $\binom{4}{2}/2 = 3$ (e.g., $(1\,2)(3\,4), (1\,3)(2\,4), (1\,4)(2\,3)$).
Total: 9. $\blacksquare$

**Solution 7.** Any two transpositions have cycle type $2\,1^{n-2}$. By Corollary 5.6, they are conjugate. $\blacksquare$

**Solution 8.** Any transposition $(i\,j) = (1\,i)(1\,j)(1\,i)$. So $\{(1\,k)\}$ generates all transpositions. Transpositions generate $S_n$ (Theorem 5.3). $\blacksquare$

---

## 5.9 Cross-References

**Previous:** [[04-subgroups-generators-cayley-diagrams]]

**Next:**
- [[06-cyclic-groups-and-order]] — $\mathbb{Z}_n$ as cyclic group
- [[12-subgroup-lattice-and-dihedral]] — full analysis of $D_n$
- [[16-centralizer-normalizer-stabilizer]] — conjugacy classes and centralizers in $S_n$

**Key takeaway.** Cycle notation + parity + cycle-type classification of conjugacy classes makes $S_n$ tractable. The sign homomorphism $\text{sgn}: S_n \to \{\pm 1\}$ and its kernel $A_n$ are the first example of a non-trivial normal subgroup.
