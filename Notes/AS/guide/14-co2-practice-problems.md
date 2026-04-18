---
title: "CO2 Practice Problems: Equivalence, Cosets, Lagrange, Normal Subgroups, Direct Products, Burnside"
type: guide
co: CO2
related: [08-equivalence-relations-and-partitions, 09-cosets-and-lagranges-theorem, 10-normal-subgroups-and-quotient-groups, 11-direct-products, 12-subgroup-lattice-and-dihedral-groups, 13-burnsides-theorem]
---

# 14. CO2 Practice Problems

This chapter consolidates practice covering chapters 8 through 13. Problems are organized in six parts corresponding to the major topics. Work through each part before checking solutions. Each solution includes full reasoning.

---

## Part A — Equivalence Relations and Partitions

**Problem A1.** On $\mathbb{Z}$, define $a \sim b$ iff $a - b$ is a multiple of 5. Verify this is an equivalence relation and describe the equivalence classes.

**Problem A2.** Let $f: A \to B$ be a function. Define $a \sim a'$ iff $f(a) = f(a')$. Show this is an equivalence relation. How are the equivalence classes related to the image of $f$?

**Problem A3.** On the set of lines in the plane, define $\ell_1 \sim \ell_2$ iff $\ell_1 \parallel \ell_2$ (parallel, where a line is considered parallel to itself). Prove this is an equivalence relation.

**Problem A4.** How many equivalence relations are there on a 4-element set? (Bell number $B_4$.)

**Problem A5.** On $\mathbb{R} \setminus \{0\}$, define $x \sim y$ iff $x/y > 0$. Describe the equivalence classes.

### Solutions — Part A

**A1.** Reflexive: $a - a = 0$, multiple of 5. Symmetric: if $a - b = 5k$, then $b - a = -5k$. Transitive: if $a - b = 5k$ and $b - c = 5l$, then $a - c = 5(k+l)$. Classes: $\{0, 5, 10, \ldots, \pm 5, \ldots\}$, $\{1, 6, 11, \ldots\}$, etc. — 5 classes $[0], [1], [2], [3], [4]$. $\blacksquare$

**A2.** Reflexive: $f(a) = f(a)$. Symmetric: $f(a) = f(a') \Rightarrow f(a') = f(a)$. Transitive: $f(a) = f(a') = f(a'') \Rightarrow f(a) = f(a'')$. Classes are preimages $f^{-1}(b)$ for $b \in f(A)$, so in bijection with $\operatorname{Image}(f)$. $\blacksquare$

**A3.** Reflexive: $\ell \parallel \ell$ by convention. Symmetric: if $\ell_1 \parallel \ell_2$, then $\ell_2 \parallel \ell_1$. Transitive: if $\ell_1 \parallel \ell_2$ and $\ell_2 \parallel \ell_3$, then $\ell_1 \parallel \ell_3$ (both have same direction as $\ell_2$). Classes = directions. $\blacksquare$

**A4.** Bell numbers: $B_0 = 1, B_1 = 1, B_2 = 2, B_3 = 5, B_4 = 15$. $\boxed{15}$

**A5.** $x \sim y$ iff $x, y$ have the same sign. Two classes: $(0, \infty)$ and $(-\infty, 0)$. $\boxed{2\text{ classes}}$

---

## Part B — Cosets and Lagrange's Theorem

**Problem B1.** List the left cosets of $\langle (1\,2) \rangle$ in $S_3$.

**Problem B2.** Find $[S_4 : A_4]$.

**Problem B3.** Compute $3^{100} \bmod 7$ using Fermat's little theorem.

**Problem B4.** Compute $7^{222} \bmod 15$ using Euler's theorem.

**Problem B5.** Prove that a group of order $p$ (prime) has no nontrivial proper subgroups.

**Problem B6.** Let $G$ have order 28. What are the possible orders of subgroups?

**Problem B7.** Show that if $|G| = 2p$ with $p$ an odd prime, then $G$ has a unique subgroup of order $p$, and it is normal.

### Solutions — Part B

**B1.** $H = \langle (1\,2) \rangle = \{e, (1\,2)\}$. Cosets:
- $eH = \{e, (1\,2)\}$
- $(1\,3)H = \{(1\,3), (1\,3)(1\,2)\} = \{(1\,3), (1\,3\,2)\}$
- $(2\,3)H = \{(2\,3), (2\,3)(1\,2)\} = \{(2\,3), (1\,2\,3)\}$

Three cosets, each of size 2. $\boxed{3\text{ cosets}}$

**B2.** $[S_4 : A_4] = |S_4|/|A_4| = 24/12 = 2$. $\boxed{2}$

**B3.** By Fermat's little theorem, $3^6 \equiv 1 \pmod 7$. $100 = 6 \cdot 16 + 4$, so $3^{100} = (3^6)^{16} \cdot 3^4 \equiv 1 \cdot 81 \equiv 81 - 77 \equiv 4 \pmod 7$. $\boxed{4}$

**B4.** $\gcd(7, 15) = 1$, $\varphi(15) = 8$. $222 = 8 \cdot 27 + 6$, so $7^{222} \equiv 7^6 \pmod{15}$. Compute: $7^2 = 49 \equiv 4$, $7^4 \equiv 16 \equiv 1$, so $7^6 = 7^4 \cdot 7^2 \equiv 1 \cdot 4 \equiv 4 \pmod{15}$. $\boxed{4}$

**B5.** Let $|G| = p$. By Lagrange, any subgroup $H \le G$ has $|H| \mid p$. Since $p$ is prime, $|H| \in \{1, p\}$, so $H = \{e\}$ or $H = G$. $\blacksquare$

**B6.** $|G| = 28 = 2^2 \cdot 7$. By Lagrange, subgroup orders divide 28: $\{1, 2, 4, 7, 14, 28\}$. $\boxed{\{1, 2, 4, 7, 14, 28\}}$

**B7.** Any element $a \neq e$ has order dividing $2p$, so $|a| \in \{2, p, 2p\}$. If every non-identity element had order 2, $G$ would be abelian with $|G| = 2p > 2$ divisible by $p$, contradiction (the only abelian group with all elements of order 2 has order $2^n$). So some element has order $p$ or $2p$.

If order $2p$: $G$ is cyclic of order $2p$, has a unique subgroup of order $p$, normal because abelian.

If order $p$: $\langle a \rangle$ is order $p$. Subgroups of order $p$ correspond to cyclic subgroups; count elements of order $p$ — each subgroup contributes $p - 1$. If there were 2 such subgroups, we'd have $2(p-1) + 1 = 2p - 1$ elements of order dividing $p$, plus identity — but total group has $2p$ elements with the remaining $p$ of order 2 or $2p$. Detailed counting forces uniqueness; see standard texts.

Alternatively: index $[G : \langle a \rangle] = 2$, so $\langle a \rangle$ is normal ([[09-cosets-and-lagranges-theorem]] Thm 9.11). Uniqueness by counting: another order-$p$ subgroup would intersect $\langle a \rangle$ trivially (else they'd coincide by order), giving $> 2p$ elements. Contradiction. $\blacksquare$

---

## Part C — Normal Subgroups and Quotient Groups

**Problem C1.** Show that the center $Z(G)$ is always a normal subgroup.

**Problem C2.** In $S_4$, show that $V = \{e, (1\,2)(3\,4), (1\,3)(2\,4), (1\,4)(2\,3)\}$ is normal.

**Problem C3.** Compute $S_3 / A_3$.

**Problem C4.** Show that if $N \trianglelefteq G$ and $G/N$ is abelian, then $[G, G] \le N$ where $[G, G]$ is the commutator subgroup.

**Problem C5.** Let $N \trianglelefteq G$ with $|G/N| = 5$. If $a \in G$ satisfies $a^3 \in N$, show that $a \in N$.

**Problem C6.** Prove: if $|G| = 6$, then either $G \cong \mathbb{Z}_6$ or $G \cong S_3$.

### Solutions — Part C

**C1.** For $z \in Z(G)$ and $g \in G$: $gzg^{-1} = zgg^{-1} = z \in Z(G)$. So $gZ(G)g^{-1} \subseteq Z(G)$, giving normality. $\blacksquare$

**C2.** $V$ is the set of identity and all products of two disjoint transpositions in $S_4$. This set is closed under conjugation because conjugation preserves cycle type (by [[05-permutation-and-dihedral-groups]]). So $V \trianglelefteq S_4$. Note $V \cong \mathbb{Z}_2 \times \mathbb{Z}_2$. $\blacksquare$

**C3.** $A_3 \trianglelefteq S_3$ (index 2). $|S_3/A_3| = 2$. Any group of order 2 is $\mathbb{Z}_2$. $\boxed{\mathbb{Z}_2}$

**C4.** $G/N$ abelian $\iff$ for all $a, b \in G$: $\bar{a}\bar{b} = \bar{b}\bar{a}$ $\iff$ $aba^{-1}b^{-1} \in N$. So every commutator is in $N$, hence $[G, G] \le N$. $\blacksquare$

**C5.** $\bar{a}^3 = \bar{e}$ in $G/N$ of order 5. So $|\bar{a}| \mid 3$. But $|\bar{a}| \mid |G/N| = 5$ as well. So $|\bar{a}| \mid \gcd(3, 5) = 1$, meaning $\bar{a} = \bar{e}$, i.e., $a \in N$. $\blacksquare$

**C6.** By Lagrange, element orders divide 6. If $G$ has an element of order 6, $G = \langle a \rangle \cong \mathbb{Z}_6$.

Otherwise element orders are in $\{1, 2, 3\}$. Not all elements of order 2 (else $G$ abelian of order $2^k$). So some element $a$ has order 3, giving $\langle a \rangle = \{e, a, a^2\}$ of index 2, normal.

Pick $b \notin \langle a \rangle$. Then $b^2 \in \langle a \rangle$ (since $|G/\langle a \rangle| = 2$). If $b$ has order 2, we're in the $S_3$ case. Compute $bab^{-1}$: in $\langle a \rangle$ which is $\{e, a, a^2\}$ and of order 3. It can't be $e$ (else $a = e$). If $bab^{-1} = a$, then $G$ is abelian — but then $|ab| = \operatorname{lcm}(2, 3) = 6$, contradiction. So $bab^{-1} = a^2 = a^{-1}$. This is the $S_3 = D_3$ presentation: $G \cong S_3$.

If $b$ has order 3, $\langle b \rangle$ would also be order 3, and $G$ has only one order-3 subgroup (otherwise counting elements of order 3 forces too many), so $\langle b \rangle = \langle a \rangle$, contradicting $b \notin \langle a \rangle$. $\blacksquare$

---

## Part D — Direct Products and Abelian Groups

**Problem D1.** Find the order of $(4, 3)$ in $\mathbb{Z}_{10} \times \mathbb{Z}_{6}$.

**Problem D2.** Is $\mathbb{Z}_{12} \times \mathbb{Z}_{18} \cong \mathbb{Z}_{6} \times \mathbb{Z}_{36}$? Justify.

**Problem D3.** How many abelian groups of order 72 are there up to isomorphism?

**Problem D4.** Show $U(20) \cong \mathbb{Z}_2 \times \mathbb{Z}_4$.

**Problem D5.** Determine whether $\mathbb{Z}_2 \times \mathbb{Z}_4$ and $\mathbb{Z}_8$ are isomorphic.

**Problem D6.** Find the number of elements of order 10 in $\mathbb{Z}_{10} \times \mathbb{Z}_{15}$.

### Solutions — Part D

**D1.** $|4|$ in $\mathbb{Z}_{10}$: $10/\gcd(10, 4) = 10/2 = 5$. $|3|$ in $\mathbb{Z}_6$: $6/\gcd(6, 3) = 6/3 = 2$. $|(4, 3)| = \operatorname{lcm}(5, 2) = 10$. $\boxed{10}$

**D2.** Use invariant factor decomposition. $\mathbb{Z}_{12} \times \mathbb{Z}_{18}$: $12 = 4 \cdot 3$, $18 = 2 \cdot 9$, so $\cong \mathbb{Z}_4 \times \mathbb{Z}_3 \times \mathbb{Z}_2 \times \mathbb{Z}_9 \cong \mathbb{Z}_4 \times \mathbb{Z}_2 \times \mathbb{Z}_{27}$... wait, let me redo: $\mathbb{Z}_{12} \cong \mathbb{Z}_4 \times \mathbb{Z}_3$, $\mathbb{Z}_{18} \cong \mathbb{Z}_2 \times \mathbb{Z}_9$. So $\mathbb{Z}_{12} \times \mathbb{Z}_{18} \cong \mathbb{Z}_4 \times \mathbb{Z}_2 \times \mathbb{Z}_3 \times \mathbb{Z}_9$.

$\mathbb{Z}_6 \times \mathbb{Z}_{36}$: $6 = 2 \cdot 3$, $36 = 4 \cdot 9$. So $\cong \mathbb{Z}_2 \times \mathbb{Z}_3 \times \mathbb{Z}_4 \times \mathbb{Z}_9$.

Both decompose to $\mathbb{Z}_2 \times \mathbb{Z}_4 \times \mathbb{Z}_3 \times \mathbb{Z}_9$. **Yes, isomorphic.** $\blacksquare$

**D3.** $72 = 2^3 \cdot 3^2$. Partitions of 3: $3, 2+1, 1+1+1$ (3 ways). Partitions of 2: $2, 1+1$ (2 ways). Total $3 \cdot 2 = 6$. $\boxed{6}$

**D4.** $U(20) \cong U(4) \times U(5)$. $U(4) = \{1, 3\} \cong \mathbb{Z}_2$. $U(5) = \{1, 2, 3, 4\}$ cyclic, generated by 2: $2^1 = 2, 2^2 = 4, 2^3 = 3, 2^4 = 1$. So $U(5) \cong \mathbb{Z}_4$. Hence $U(20) \cong \mathbb{Z}_2 \times \mathbb{Z}_4$. $\blacksquare$

**D5.** $\mathbb{Z}_8$ is cyclic (has element of order 8). $\mathbb{Z}_2 \times \mathbb{Z}_4$ has max element order $\operatorname{lcm}(2, 4) = 4$, so no element of order 8. **Not isomorphic.** $\blacksquare$

**D6.** Need $\operatorname{lcm}(|a|, |b|) = 10$ with $|a| \mid 10$, $|b| \mid 15$.

Divisors of 10: $\{1, 2, 5, 10\}$. Divisors of 15: $\{1, 3, 5, 15\}$. Need $\operatorname{lcm}(|a|, |b|) = 10$.

Pairs $(|a|, |b|)$ with $\operatorname{lcm} = 10$: $|a|$ must provide all prime-power factors of 10 (namely 2 and 5), or share; $|b|$'s primes from $\{3, 5\}$. Since 10 = 2·5 and $|b| \in \{1, 3, 5, 15\}$ has no factor 2, $|a|$ must be a multiple of 2. And the factor 5 must come from either. So $|a| \in \{2, 10\}$ and $\operatorname{lcm}(|a|, |b|) = 10$.

- $|a| = 2$, $|b| \in \{5, 15\}$ give $\operatorname{lcm} = 10, 30$. Only $|b| = 5$ works (not 15). So $(|a|, |b|) = (2, 5)$.
- $|a| = 10$, $|b| \in \{1, 5\}$: $\operatorname{lcm}(10, 1) = 10$ ✓, $\operatorname{lcm}(10, 5) = 10$ ✓. Not 3 or 15 (would give 30). So $(10, 1)$ and $(10, 5)$.

Counting elements:
- In $\mathbb{Z}_{10}$: $\varphi(1) = 1, \varphi(2) = 1, \varphi(5) = 4, \varphi(10) = 4$.
- In $\mathbb{Z}_{15}$: $\varphi(1) = 1, \varphi(3) = 2, \varphi(5) = 4, \varphi(15) = 8$.

Totals:
- $(2, 5)$: $1 \cdot 4 = 4$.
- $(10, 1)$: $4 \cdot 1 = 4$.
- $(10, 5)$: $4 \cdot 4 = 16$.

Sum = $4 + 4 + 16 = 24$. $\boxed{24}$

---

## Part E — Subgroup Lattice and Dihedral

**Problem E1.** Count all subgroups of $D_5$.

**Problem E2.** Draw the subgroup lattice of $D_3$.

**Problem E3.** List all normal subgroups of $D_4$.

**Problem E4.** Compute $Z(D_7)$ and $Z(D_8)$.

**Problem E5.** Find all quotient groups of $D_4$ up to isomorphism.

### Solutions — Part E

**E1.** $n = 5$ prime. Total = $\tau(5) + \sigma(5) = 2 + 6 = 8$. $\boxed{8}$

**E2.** $D_3$ has 6 subgroups: $\{e\}, \langle (1\,2) \rangle, \langle (1\,3) \rangle, \langle (2\,3) \rangle, A_3, D_3$.
```
              D_3
            / | | \
         <12><13><23> <A_3>
            \ | | /
              {e}
```
$\blacksquare$

**E3.** From §12.5: $\{e\}, \langle r^2 \rangle, \langle r \rangle, \{e, r^2, s, r^2 s\}, \{e, r^2, rs, r^3 s\}, D_4$. **6 normal subgroups.** $\boxed{6}$

**E4.** $D_7$: $n = 7$ odd, so $Z(D_7) = \{e\}$. $D_8$: $n = 8$ even, so $Z(D_8) = \{e, r^4\}$. $\boxed{Z(D_7) = \{e\},\ Z(D_8) = \{e, r^4\}}$

**E5.** Normal subgroups and their quotients:
- $D_4 / \{e\} \cong D_4$
- $D_4 / \langle r^2 \rangle \cong V_4$ (Example 4 of [[12-subgroup-lattice-and-dihedral-groups]])
- $D_4 / \langle r \rangle \cong \mathbb{Z}_2$
- $D_4 / \{e, r^2, s, r^2 s\} \cong \mathbb{Z}_2$
- $D_4 / \{e, r^2, rs, r^3 s\} \cong \mathbb{Z}_2$
- $D_4 / D_4 \cong \{e\}$

Up to isomorphism: $\{e\}, \mathbb{Z}_2, V_4, D_4$. $\boxed{4\text{ isomorphism types}}$

---

## Part F — Burnside's Theorem

**Problem F1.** Count 3-color vertex colorings of a square, up to $D_4$.

**Problem F2.** Count 2-color necklaces of length 7 (cyclic group $\mathbb{Z}_7$).

**Problem F3.** Count 3-color bracelets of length 4 (group $D_4$).

**Problem F4.** Count distinct colorings of a tetrahedron with $n$ colors on vertices, under its rotation group ($A_4$, order 12).

**Problem F5.** How many ways to distribute 3 identical balls into 4 distinguishable boxes, where boxes related by a fixed cyclic permutation are considered equivalent?

### Solutions — Part F

**F1.** $|X| = 3^4 = 81$, $G = D_4$.
- $e$: $81$.
- $r, r^3$: 1 cycle. $3$ each. Total 6.
- $r^2$: 2 cycles. $9$.
- 2 edge reflections (fix 2 vertices, swap 2): 3 cycles. $3^3 = 27$ each. Total 54.
- 2 diagonal reflections (fix 0, 2 pairs): 2 cycles. $9$ each. Total 18.

Sum = $81 + 6 + 9 + 54 + 18 = 168$. $N = 168/8 = 21$. $\boxed{21}$

**F2.** $n = 7$ prime, $c = 2$.
$$N = \frac{1}{7}[\varphi(7) \cdot 2 + \varphi(1) \cdot 128] = \frac{1}{7}[6 \cdot 2 + 128] = \frac{140}{7} = 20.$$
$\boxed{20}$

**F3.** $n = 4$, $c = 3$, $G = D_4$.
- Rotations: $e \to 81$, $r \to 3$, $r^2 \to 9$, $r^3 \to 3$. Sum 96.
- 2 reflections fixing 2 beads: $3^3 = 27$ each. Sum 54.
- 2 reflections fixing 0 beads: $3^2 = 9$ each. Sum 18.

Total = $96 + 54 + 18 = 168$. $N = 168/8 = 21$. $\boxed{21}$

(Same as F1 because vertex coloring of a square is the same problem as length-4 bracelet with colors = vertices.)

**F4.** Tetrahedron rotations = $A_4$, order 12. Action on 4 vertices:
- Identity (1): cycle type $1^4$. $n^4$.
- 8 vertex rotations $\pm 120°$: cycle type $1 \cdot 3$ (one vertex fixed, a 3-cycle). $n^2$ each. Total $8n^2$.
- 3 edge rotations $180°$: cycle type $2 \cdot 2$. $n^2$ each. Total $3n^2$.

Sum $= n^4 + 8n^2 + 3n^2 = n^4 + 11n^2$.

$N(n) = (n^4 + 11n^2)/12$. Check: $n = 1$: $12/12 = 1$ ✓. $n = 2$: $(16 + 44)/12 = 60/12 = 5$. $\boxed{(n^4 + 11n^2)/12}$

**F5.** 3 identical balls, 4 distinct boxes: distributions = integer compositions of 3 into 4 parts, i.e., $\binom{3 + 3}{3} = 20$... wait, with repetition, stars and bars gives $\binom{3+3}{3} = 20$. Hmm, let me redo: number of ways = $\binom{n+k-1}{k-1}$ where $n = 3$ balls, $k = 4$ boxes. So $\binom{6}{3} = 20$.

Under cyclic $\mathbb{Z}_4$ action on boxes, we count orbits. Let $X$ = all distributions.

Actually let's identify $X$ with $\{(a_1, a_2, a_3, a_4) : a_i \ge 0, \sum a_i = 3\}$, $|X| = 20$.

The group $\mathbb{Z}_4$ acts by cyclic permutation of indices. Fixed points of generator $r$ (rotation by 1): $a_1 = a_2 = a_3 = a_4$, sum = 4a = 3, no solution. 0 fixed. $r^2$ (rotation by 2): $a_1 = a_3, a_2 = a_4$, $2a_1 + 2a_2 = 3$, no solution. 0 fixed. $r^3$: same as $r$, 0 fixed. $e$: 20 fixed.

$N = (20 + 0 + 0 + 0)/4 = 5$. $\boxed{5}$ orbits.

---

## Summary of CO2

CO2 covers the mid-game of group theory:

1. **Equivalence & Partitions** — foundational set-theoretic machinery.
2. **Cosets & Lagrange** — subgroups index the group by equivalence classes, with strong arithmetic consequences (Fermat, Euler).
3. **Normal Subgroups & Quotient Groups** — the kernel of transmitting structure to the quotient.
4. **Direct Products** — building new groups from old, with CRT applications.
5. **Subgroup Lattice & $D_n$** — structural classification.
6. **Burnside's Theorem** — counting via group actions, the bridge to applied combinatorics.

With this toolkit mastered, CO3 (group actions, homomorphisms, isomorphism theorems) will be an enrichment rather than a leap.

## Related Concepts

- [[08-equivalence-relations-and-partitions]]
- [[09-cosets-and-lagranges-theorem]]
- [[10-normal-subgroups-and-quotient-groups]]
- [[11-direct-products]]
- [[12-subgroup-lattice-and-dihedral-groups]]
- [[13-burnsides-theorem]]

---

*Last updated: 2026-04-18*
