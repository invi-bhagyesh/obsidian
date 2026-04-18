# 9. Cosets and Lagrange's Theorem

> **Centerpiece of finite group theory.** Given $H \leq G$, the **cosets** of $H$ are the translates $gH = \{gh : h \in H\}$. These cosets partition $G$ into equal-sized pieces, and the number of pieces times $|H|$ equals $|G|$. This is **Lagrange's Theorem** — the first non-trivial theorem in group theory, and the foundation of everything that follows (quotient groups, normal subgroups, Sylow theory, Fermat's little theorem, Euler's theorem).

---

## 9.1 Cosets — Definitions

> **Definition (Left coset).** Let $H \leq G$, $g \in G$. The **left coset** of $H$ by $g$ is
> $$gH = \{gh : h \in H\}.$$
> Similarly, the **right coset** $Hg = \{hg : h \in H\}$.

**Immediate facts:**
- $eH = H$ (the subgroup itself is a coset).
- Every $g$ lies in its own coset $gH$ (since $e \in H$, $g = ge \in gH$).

**Notation warning.** For additive groups, write $g + H = \{g + h : h \in H\}$.

---

## 9.2 Coset Equivalence

> **Theorem 9.1.** Define $a \sim_L b \iff a^{-1} b \in H$. Then $\sim_L$ is an equivalence relation, and the equivalence class of $a$ is exactly $aH$.

*Proof.*
- Reflexive: $a^{-1} a = e \in H$.
- Symmetric: $a^{-1} b \in H \Rightarrow (a^{-1}b)^{-1} = b^{-1}a \in H$.
- Transitive: $a^{-1} b, b^{-1} c \in H \Rightarrow (a^{-1}b)(b^{-1}c) = a^{-1}c \in H$.

Class of $a$: $\{b : a \sim_L b\} = \{b : a^{-1} b = h \text{ for some } h\} = \{ah : h \in H\} = aH$. $\blacksquare$

> **Corollary 9.2.** The left cosets of $H$ partition $G$.

(Applying Theorem 8.1.)

---

## 9.3 Size of a Coset

> **Theorem 9.3.** All left cosets of $H$ have the same size: $|gH| = |H|$ for every $g \in G$.

*Proof.* Define $\varphi : H \to gH$ by $\varphi(h) = gh$. Surjective by definition of $gH$; injective by cancellation ($gh_1 = gh_2 \Rightarrow h_1 = h_2$). Bijection. $\blacksquare$

### When are two cosets equal?

> **Theorem 9.4 (Coset equality criteria).** The following are equivalent:
> 1. $aH = bH$.
> 2. $a^{-1}b \in H$.
> 3. $b \in aH$.
> 4. $aH \cap bH \neq \emptyset$.

*Proof.* (1)↔(2): by Theorem 9.1. (2)↔(3): $b \in aH \iff b = ah \iff a^{-1}b = h \in H$. (1)⇒(4): trivial. (4)⇒(1): if $c \in aH \cap bH$, then $[c] = aH = bH$ (Theorem 8.1). $\blacksquare$

**Consequence.** The distinct cosets are $\{g_1 H, g_2 H, \ldots\}$ for coset representatives $g_1, g_2, \ldots$, and we can detect coincidences by checking $g_i^{-1} g_j \in H$.

---

## 9.4 Lagrange's Theorem

> **Theorem 9.5 (Lagrange's Theorem).** If $G$ is a finite group and $H \leq G$, then $|H|$ divides $|G|$. Specifically,
> $$|G| = [G : H] \cdot |H|,$$
> where $[G : H]$ is the number of left (or right) cosets, called the **index** of $H$ in $G$.

*Proof.* $G$ is the disjoint union of the left cosets: $G = \bigsqcup_{i=1}^{[G:H]} g_i H$. Each coset has size $|H|$. So $|G| = [G:H] \cdot |H|$. $\blacksquare$

**Remark.** The right-coset count equals the left-coset count. In fact the map $gH \mapsto Hg^{-1}$ is a bijection between left and right cosets.

---

## 9.5 Consequences of Lagrange

> **Corollary 9.6.** In a finite group $G$, the order of every element divides $|G|$.
>
> *Proof.* $|a| = |\langle a \rangle|$, and $\langle a \rangle \leq G$. Apply Lagrange. $\blacksquare$

> **Corollary 9.7.** If $|G| = n$, then $a^n = e$ for every $a \in G$.
>
> *Proof.* $|a|$ divides $n$, so $n = |a| \cdot k$ for some $k$, giving $a^n = (a^{|a|})^k = e^k = e$. $\blacksquare$

> **Corollary 9.8.** Every group of prime order is cyclic.
>
> *Proof.* $|G| = p$ prime. Take any non-identity $a \in G$; $|a|$ divides $p$, $|a| \neq 1$, so $|a| = p$. $\langle a \rangle$ has $p$ elements = $G$. $\blacksquare$

> **Corollary 9.9 (Fermat's Little Theorem).** If $p$ is prime and $\gcd(a, p) = 1$, then $a^{p-1} \equiv 1 \pmod p$.
>
> *Proof.* $a \in U(p) = \{1, 2, \ldots, p-1\}$ (units mod $p$). $|U(p)| = p - 1$. By Cor 9.7, $a^{p-1} = 1$ in $U(p)$. $\blacksquare$

> **Corollary 9.10 (Euler's Theorem).** If $\gcd(a, n) = 1$, then $a^{\varphi(n)} \equiv 1 \pmod n$.
>
> *Proof.* $a \in U(n)$, $|U(n)| = \varphi(n)$. Same argument. $\blacksquare$

**Example 1 (Computing $7^{222} \pmod {10}$).** $\gcd(7, 10) = 1$. $\varphi(10) = 4$. So $7^4 \equiv 1 \pmod{10}$, and $7^{222} = 7^{4 \cdot 55 + 2} \equiv 7^2 = 49 \equiv 9 \pmod{10}$.

---

## 9.6 Converse of Lagrange — False!

**Warning.** $|H|$ divides $|G|$ does NOT mean a subgroup of order $|H|$ exists.

**Counter-example ($A_4$).** $|A_4| = 12$. Divisors: 1, 2, 3, 4, 6, 12.

Subgroups of $A_4$ exist of orders 1, 2, 3, 4, 12 — but **no subgroup of order 6** exists!

*Proof sketch.* If $H \leq A_4$ with $|H| = 6$, then $[A_4 : H] = 2$, so $H \triangleleft A_4$ (index-2 subgroups are always normal). But $A_4$ has 8 elements of order 3 (the eight 3-cycles). $H$ must contain at least 4 of them (pigeon-hole)... a careful count shows contradictions. **So $A_4$ has no subgroup of order 6.**

---

## 9.7 Worked Examples

**Example 2 (Cosets in $\mathbb{Z}$).** Find the left cosets of $5\mathbb{Z}$ in $\mathbb{Z}$.

*Solution.* Additive notation: $a + 5\mathbb{Z} = \{a + 5k : k \in \mathbb{Z}\}$. There are 5 cosets: $0 + 5\mathbb{Z}, 1 + 5\mathbb{Z}, 2 + 5\mathbb{Z}, 3 + 5\mathbb{Z}, 4 + 5\mathbb{Z}$. $[\mathbb{Z} : 5\mathbb{Z}] = 5$. Note $\mathbb{Z}$ is infinite but the index is finite. $\blacksquare$

**Example 3 (Cosets in $S_3$).** Let $H = \langle (1\,2) \rangle = \{e, (1\,2)\}$ in $S_3$. Find all left cosets.

*Solution.* $[S_3 : H] = 6/2 = 3$. Left cosets:
- $eH = \{e, (1\,2)\}$
- $(1\,3)H = \{(1\,3), (1\,3)(1\,2)\} = \{(1\,3), (1\,3\,2)\}$
- $(2\,3)H = \{(2\,3), (2\,3)(1\,2)\} = \{(2\,3), (1\,2\,3)\}$

Disjoint; union = $S_3$. ✓ $\blacksquare$

**Example 4 (Right cosets differ from left).** Same $H = \langle (1\,2) \rangle$ in $S_3$. Right cosets?

*Solution.*
- $He = \{e, (1\,2)\}$
- $H(1\,3) = \{(1\,3), (1\,2)(1\,3)\} = \{(1\,3), (1\,2\,3)\}$
- $H(2\,3) = \{(2\,3), (1\,3\,2)\}$

Note: $(1\,3)H = \{(1\,3), (1\,3\,2)\}$ vs $H(1\,3) = \{(1\,3), (1\,2\,3)\}$ — different! **Left $\neq$ right** cosets in general. Equal iff $H$ is *normal* (next chapter). $\blacksquare$

**Example 5 (Subgroup of index 2).** Show: if $[G : H] = 2$, then $H$ is normal (i.e., every $gH = Hg$).

*Solution.* Two left cosets: $H$ and $gH$ for $g \notin H$. Union = $G$, so $gH = G \setminus H$. Similarly, right cosets are $H$ and $Hg = G \setminus H$. Both equal $G \setminus H$. So $gH = Hg$ for $g \notin H$; and for $g \in H$, $gH = H = Hg$. Normal. $\blacksquare$

**Example 6 (Order of intersection).** Let $H, K \leq G$ with $|H| = 12$, $|K| = 35$. If $|G| = 420$, find $|H \cap K|$.

*Solution.* $|H \cap K|$ divides both $|H| = 12$ and $|K| = 35$. $\gcd(12, 35) = 1$. So $|H \cap K| = 1$, i.e., $H \cap K = \{e\}$. $\blacksquare$

**Example 7 (Applying Lagrange — $|G| = 45$).** Show every group of order 45 has an element of order 15 (or higher).

*Solution.* This requires Sylow theory in general, but using Lagrange + Cauchy (every prime $p | |G|$ gives an element of order $p$): $45 = 3^2 \cdot 5$. Cauchy: exists $a$ of order 3, $b$ of order 5. If $ab = ba$ (which requires analysis), then $|ab| = \text{lcm}(3, 5) = 15$. $\blacksquare$

**Example 8 (Using Fermat).** Find $3^{100} \pmod{11}$.

*Solution.* $\gcd(3, 11) = 1$. By Fermat, $3^{10} \equiv 1 \pmod{11}$. $3^{100} = (3^{10})^{10} \equiv 1 \pmod{11}$. $\blacksquare$

**Example 9 (No subgroup of order 6 in $A_4$).** Illustrate via coset count.

*Solution.* Suppose $H \leq A_4$, $|H| = 6$. Then $[A_4 : H] = 2$, so $H \triangleleft A_4$. $A_4 / H$ has order 2, abelian. Commutator $[a, b] = a b a^{-1} b^{-1} \in H$ for all $a, b \in A_4$. But $A_4$ contains 3-cycles $(1\,2\,3), (1\,2\,4)$ whose commutator is $(1\,4)(2\,3)$ — wait, let's compute: $[(1\,2\,3), (1\,2\,4)] = (1\,2\,3)(1\,2\,4)(1\,3\,2)(1\,4\,2)$. A 3-cycle. If all commutators are in $H$, $H$ contains many 3-cycles; but $H$ has only 6 elements. Careful counting gives contradiction. $\blacksquare$

---

## 9.8 Practice Problems

1. Find all left cosets of $3\mathbb{Z}$ in $\mathbb{Z}_{12}$.
2. In $D_4$, find the left cosets of $H = \{1, r^2\}$.
3. Compute $11^{402} \pmod{13}$.
4. Let $G$ be a group of order 77. Show $G$ has an element of order 7.
5. If $H, K \leq G$ with $|H| = 10$, $|K| = 21$, $|G| = 105$, find $|H \cap K|$.
6. Prove: if $|G| = p^2$ ($p$ prime), every proper subgroup is cyclic.
7. Let $G$ be a finite abelian group. Show the product of all elements equals $e$ unless $G$ has a unique element of order 2.
8. Compute the index $[S_4 : A_4]$.

### Solutions

**Solution 1.** $H = 3\mathbb{Z}_{12} = \langle 3 \rangle = \{0, 3, 6, 9\}$. Cosets:
- $0 + H = \{0, 3, 6, 9\}$
- $1 + H = \{1, 4, 7, 10\}$
- $2 + H = \{2, 5, 8, 11\}$

$[\mathbb{Z}_{12} : H] = 3$. $\blacksquare$

**Solution 2.** $H = \{1, r^2\}$, $|H| = 2$, $[D_4 : H] = 4$. Cosets:
- $H = \{1, r^2\}$
- $rH = \{r, r^3\}$
- $sH = \{s, sr^2\}$
- $srH = \{sr, sr^3\}$

Union = $D_4$ ✓. $\blacksquare$

**Solution 3.** $\varphi(13) = 12$. $11^{12} \equiv 1 \pmod{13}$. $402 = 12 \cdot 33 + 6$. $11^{402} \equiv 11^6 \pmod{13}$. $11 \equiv -2$, $11^2 \equiv 4$, $11^3 \equiv -8 \equiv 5$, $11^6 \equiv 25 \equiv 12 \equiv -1 \pmod{13}$. $\blacksquare$

**Solution 4.** $|G| = 77 = 7 \cdot 11$. By Cauchy (element of prime order): exists element of order 7 (and order 11). $\blacksquare$

**Solution 5.** $|H \cap K|$ divides $\gcd(10, 21) = 1$. So $|H \cap K| = 1$. $\blacksquare$

**Solution 6.** $|G| = p^2$. Proper subgroup $H$ has order 1 or $p$. Order $p$: cyclic (Cor 9.8). Order 1: trivially cyclic. $\blacksquare$

**Solution 7.** Pair each element $a$ with $a^{-1}$; in the product, they cancel. What remains are elements equal to their own inverse ($a^2 = e$, $a = a^{-1}$): identity $e$, plus elements of order 2. If $G$ has no element of order 2 or $\geq 2$ elements of order 2, product is $e$. If $G$ has a unique element $x$ of order 2, product is $x \neq e$. $\blacksquare$

**Solution 8.** $|S_4| = 24$, $|A_4| = 12$. $[S_4 : A_4] = 2$. $\blacksquare$

---

## 9.9 Cross-References

**Previous:** [[08-equivalence-relations-and-partitions]] — cosets are equivalence classes.

**Next:**
- [[10-normal-subgroups-and-quotient-groups]] — when can we turn $G/H$ into a group?
- [[11-direct-products]] — direct product and Lagrange interact nicely

**Takeaway.** Lagrange's theorem is the single most-used result in finite group theory. Memorize: *$|H| \mid |G|$*, *$|a| \mid |G|$*, *$a^{|G|} = e$*. These three consequences drive almost every finite-group computation.
