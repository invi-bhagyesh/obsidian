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

**Solution A1.**
Define $\sim$ on $\mathbb{Z}$ by $a \sim b \iff 5 \mid (a - b)$. We verify the three axioms of an equivalence relation.

*Reflexive.* For all $a \in \mathbb{Z}$: $a - a = 0 = 5 \cdot 0$, so $5 \mid 0$, hence $a \sim a$. ✓

*Symmetric.* Suppose $a \sim b$, i.e., $a - b = 5k$ for some $k \in \mathbb{Z}$. Then $b - a = -5k = 5(-k)$ with $-k \in \mathbb{Z}$, so $5 \mid (b - a)$, hence $b \sim a$. ✓

*Transitive.* Suppose $a \sim b$ and $b \sim c$: $a - b = 5k$ and $b - c = 5\ell$ for some $k, \ell \in \mathbb{Z}$. Adding:
$$a - c = (a - b) + (b - c) = 5k + 5\ell = 5(k + \ell),$$
with $k + \ell \in \mathbb{Z}$. So $5 \mid (a - c)$, hence $a \sim c$. ✓

**Equivalence classes.** The class of $a$ is $[a] = \{b \in \mathbb{Z} : b \equiv a \pmod 5\}$. There are exactly $5$ distinct classes, represented by $0, 1, 2, 3, 4$:
$$[0] = \{\ldots, -10, -5, 0, 5, 10, \ldots\}, \; [1] = \{\ldots, -9, -4, 1, 6, 11, \ldots\}, \; \ldots, \; [4] = \{\ldots, -6, -1, 4, 9, \ldots\}.$$

The quotient set $\mathbb{Z}/\sim$ is the familiar $\mathbb{Z}_5$. $\blacksquare$

---

**Solution A2.**
Let $f: A \to B$ and define $a \sim a' \iff f(a) = f(a')$.

*Reflexive.* $f(a) = f(a)$ (equality is reflexive), so $a \sim a$. ✓

*Symmetric.* If $f(a) = f(a')$, then $f(a') = f(a)$ (equality is symmetric), so $a' \sim a$. ✓

*Transitive.* If $f(a) = f(a')$ and $f(a') = f(a'')$, then $f(a) = f(a'')$ (equality is transitive), so $a \sim a''$. ✓

**Classes and the image.** The equivalence class $[a] = \{a' \in A : f(a') = f(a)\} = f^{-1}(\{f(a)\})$ is the fiber of $f$ over $f(a)$. Two distinct classes $[a], [a']$ correspond to distinct image values $f(a) \neq f(a')$. Thus the map
$$\Phi: A/\sim \;\to\; f(A), \qquad [a] \mapsto f(a),$$
is well-defined and bijective: $A/\sim \; \cong \; f(A) = \operatorname{Image}(f)$.

*Consequence.* This is the set-theoretic "first isomorphism theorem": every function factors as $A \twoheadrightarrow A/\sim \xrightarrow{\sim} \operatorname{Image}(f) \hookrightarrow B$ — a surjection followed by a bijection followed by an inclusion. $\blacksquare$

---

**Solution A3.**
Parallelism on lines in the plane, $\ell_1 \parallel \ell_2$, with the convention $\ell \parallel \ell$.

*Reflexive.* Every line is parallel to itself by convention. ✓

*Symmetric.* The relation "has the same direction as" is symmetric: if $\ell_1$ and $\ell_2$ have the same direction, so do $\ell_2$ and $\ell_1$. ✓

*Transitive.* Suppose $\ell_1 \parallel \ell_2$ and $\ell_2 \parallel \ell_3$.

- If $\ell_2 = \ell_1$: transitivity is $\ell_1 \parallel \ell_3$ which is the second hypothesis. ✓
- If $\ell_1, \ell_2, \ell_3$ are distinct: each pair has no intersection point in the affine plane. Assume for contradiction $\ell_1 \cap \ell_3 = \{P\}$. Through $P$ there is a unique line parallel to $\ell_2$ (Playfair's axiom). Both $\ell_1$ and $\ell_3$ pass through $P$ and are parallel to $\ell_2$, so $\ell_1 = \ell_3$, contradicting distinctness. Hence $\ell_1 \cap \ell_3 = \emptyset$, i.e., $\ell_1 \parallel \ell_3$. ✓

**Equivalence classes.** Each class consists of all lines sharing a common direction. In the projective plane language, directions correspond to points at infinity, giving a bijection between classes and points on the line at infinity. $\blacksquare$

---

**Solution A4.**
The number of equivalence relations on an $n$-element set equals the **Bell number** $B_n$ (the number of set partitions of an $n$-set).

*Recursion.* Bell numbers satisfy $B_{n+1} = \sum_{k=0}^n \binom{n}{k} B_k$ with $B_0 = 1$.

Compute:
$$B_0 = 1$$
$$B_1 = \binom{0}{0} B_0 = 1$$
$$B_2 = \binom{1}{0}B_0 + \binom{1}{1}B_1 = 1 + 1 = 2$$
$$B_3 = \binom{2}{0}B_0 + \binom{2}{1}B_1 + \binom{2}{2}B_2 = 1 + 2 + 2 = 5$$
$$B_4 = \binom{3}{0}B_0 + \binom{3}{1}B_1 + \binom{3}{2}B_2 + \binom{3}{3}B_3 = 1 + 3 + 6 + 5 = 15.$$

*Verification by cases.* Partitions of $\{1, 2, 3, 4\}$ by block sizes:
- $\{4\}$: $1$ partition.
- $\{3, 1\}$: $\binom{4}{3} = 4$ partitions.
- $\{2, 2\}$: $\frac{1}{2}\binom{4}{2} = 3$ partitions.
- $\{2, 1, 1\}$: $\binom{4}{2} = 6$ partitions.
- $\{1, 1, 1, 1\}$: $1$ partition.

Total: $1 + 4 + 3 + 6 + 1 = \boxed{15}$. ✓ $\blacksquare$

---

**Solution A5.**
On $\mathbb{R}^\times = \mathbb{R} \setminus \{0\}$: $x \sim y \iff x/y > 0$.

*Reflexive.* $x/x = 1 > 0$. ✓
*Symmetric.* If $x/y > 0$ then $y/x = (x/y)^{-1} > 0$. ✓
*Transitive.* $x/y > 0$ and $y/z > 0$ imply $x/z = (x/y)(y/z) > 0$. ✓

**Equivalence classes.** $x \sim y$ holds iff $x$ and $y$ have the same sign. So:
$$[1] = (0, \infty), \qquad [-1] = (-\infty, 0).$$

There are exactly **$2$ equivalence classes**: positive reals and negative reals. $\blacksquare$

*Remark.* This mirrors the quotient $\mathbb{R}^\times/\mathbb{R}^\times_{>0} \cong \{\pm 1\} \cong \mathbb{Z}/2\mathbb{Z}$.

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

**Solution B1.**
$S_3 = \{e, (1\,2), (1\,3), (2\,3), (1\,2\,3), (1\,3\,2)\}$ has order $6$.

Let $H = \langle (1\,2)\rangle = \{e, (1\,2)\}$, of order $2$. By Lagrange, $[S_3 : H] = 6/2 = 3$, so there are $3$ cosets.

The left cosets $gH = \{g \cdot h : h \in H\}$:

*Pick $g = e$:* $eH = H = \{e, (1\,2)\}$.

*Pick $g = (1\,3)$:* compute $(1\,3) \cdot (1\,2)$. Applied right-to-left to $1, 2, 3$:
$1 \xrightarrow{(1\,2)} 2 \xrightarrow{(1\,3)} 2$, $2 \xrightarrow{(1\,2)} 1 \xrightarrow{(1\,3)} 3$, $3 \xrightarrow{(1\,2)} 3 \xrightarrow{(1\,3)} 1$. So $(1\,3)(1\,2) = (1\,2\,3)$.

Hence $(1\,3)H = \{(1\,3), (1\,2\,3)\}$.

*Pick $g = (2\,3)$:* compute $(2\,3)(1\,2)$. $1 \to 2 \to 3$, $2 \to 1 \to 1$, $3 \to 3 \to 2$. So $(2\,3)(1\,2) = (1\,3\,2)$.

Hence $(2\,3)H = \{(2\,3), (1\,3\,2)\}$.

*Verification.* The three cosets are disjoint (they must be, since cosets partition $G$) and each has size $|H| = 2$; their union is all of $S_3$:
$$\{e, (1\,2)\} \sqcup \{(1\,3), (1\,2\,3)\} \sqcup \{(2\,3), (1\,3\,2)\} = S_3. \checkmark$$

**Three left cosets:** $eH, (1\,3)H, (2\,3)H$. $\blacksquare$

*Remark.* $H$ is **not** normal in $S_3$: e.g., $(1\,3)H = \{(1\,3), (1\,2\,3)\}$ but $H(1\,3) = \{(1\,3), (1\,3\,2)\}$, different.

---

**Solution B2.**
$A_4$ is the alternating group, the subgroup of even permutations in $S_4$.

$|S_4| = 4! = 24$. The sign map $\operatorname{sgn}: S_4 \to \{\pm 1\}$ is a surjective group homomorphism with kernel $A_4$. By the first isomorphism theorem (or direct counting: half the permutations are even, half odd),
$$|A_4| = |S_4|/2 = 12.$$

By Lagrange,
$$[S_4 : A_4] = |S_4|/|A_4| = 24/12 = 2. \qquad \boxed{[S_4 : A_4] = 2.} \; \blacksquare$$

*Consequence.* Index-$2$ subgroups are always normal: $A_4 \trianglelefteq S_4$, with $S_4/A_4 \cong \mathbb{Z}/2\mathbb{Z}$.

---

**Solution B3.**
We compute $3^{100} \bmod 7$.

**Fermat's Little Theorem.** If $p$ is prime and $\gcd(a, p) = 1$, then $a^{p-1} \equiv 1 \pmod p$.

*Here.* $p = 7$, $a = 3$, $\gcd(3, 7) = 1$, so $3^6 \equiv 1 \pmod 7$.

*Reduce the exponent $\bmod 6$.* Divide $100$ by $6$: $100 = 6 \cdot 16 + 4$. So
$$3^{100} = (3^6)^{16} \cdot 3^4 \equiv 1^{16} \cdot 3^4 = 3^4 \pmod 7.$$

*Compute $3^4 \bmod 7$.* $3^2 = 9 \equiv 2 \pmod 7$, so $3^4 = (3^2)^2 \equiv 2^2 = 4 \pmod 7$.

**Hence $3^{100} \equiv 4 \pmod 7$.** $\boxed{4}$ $\blacksquare$

---

**Solution B4.**
We compute $7^{222} \bmod 15$.

**Euler's Theorem.** If $\gcd(a, n) = 1$, then $a^{\varphi(n)} \equiv 1 \pmod n$, where $\varphi$ is Euler's totient.

*Here.* $n = 15 = 3 \cdot 5$, so $\varphi(15) = \varphi(3)\varphi(5) = 2 \cdot 4 = 8$. Since $\gcd(7, 15) = 1$, we get $7^8 \equiv 1 \pmod{15}$.

*Reduce the exponent $\bmod 8$.* $222 = 8 \cdot 27 + 6$. So
$$7^{222} = (7^8)^{27} \cdot 7^6 \equiv 7^6 \pmod{15}.$$

*Compute $7^6 \bmod 15$.*
$$7^2 = 49 = 3 \cdot 15 + 4 \equiv 4.$$
$$7^4 = (7^2)^2 \equiv 4^2 = 16 \equiv 1 \pmod{15}.$$
$$7^6 = 7^4 \cdot 7^2 \equiv 1 \cdot 4 = 4.$$

**Hence $7^{222} \equiv 4 \pmod{15}$.** $\boxed{4}$

*Remark.* In fact $|7| = 4$ in $(\mathbb{Z}/15\mathbb{Z})^\times$, a sharper statement than Euler's bound of $8$. $\blacksquare$

---

**Solution B5.**
Let $G$ be a group of order $p$, $p$ prime.

**Claim.** The only subgroups of $G$ are $\{e\}$ and $G$.

*Proof.* Let $H \leq G$. By **Lagrange's theorem**, $|H| \mid |G| = p$. Since $p$ is prime, the only positive divisors of $p$ are $1$ and $p$. Hence $|H| \in \{1, p\}$.

- If $|H| = 1$: $H = \{e\}$.
- If $|H| = p = |G|$: $H \subseteq G$ with $|H| = |G|$ and $|G|$ finite, so $H = G$.

No proper nontrivial subgroup exists. $\blacksquare$

*Corollary.* Any group of prime order is cyclic (pick any $a \neq e$; $\langle a \rangle$ is a subgroup of order $\neq 1$, so $\langle a\rangle = G$).

---

**Solution B6.**
Let $|G| = 28 = 2^2 \cdot 7$. By **Lagrange's theorem**, the order $|H|$ of any subgroup $H \leq G$ divides $|G| = 28$.

Positive divisors of $28$: $\{1, 2, 4, 7, 14, 28\}$.

So the possible subgroup orders are $\boxed{\{1, 2, 4, 7, 14, 28\}}$.

*Remark.* Whether **every** such order is actually attained depends on $G$. By **Sylow's theorems** (beyond CO2), $G$ has subgroups of orders $1, 2, 4, 7, 28$ (Sylow $2$- and $7$-subgroups and the obvious ones). A subgroup of order $14$ may or may not exist depending on the structure of $G$; both possibilities occur for different groups of order $28$. $\blacksquare$

---

**Solution B7.**
Let $|G| = 2p$, $p$ odd prime.

**Step 1: $G$ has an element of order $p$.**

By Cauchy's theorem (CO3, but admissible here): since $p \mid |G|$, $G$ has an element of order $p$. (Alternatively, use the lemma: in a group of even order, some element has order $2$; and count: if every non-identity element had order $\leq 2$, $G$ would be an elementary abelian $2$-group, forcing $|G| = 2^k$, but $|G| = 2p$ with $p$ odd — contradiction. So some element has order $> 2$; by Lagrange its order is in $\{p, 2p\}$. If order $2p$: that element's square has order $p$. So in either case an element of order $p$ exists.)

Let $a \in G$ have $|a| = p$, and set $H = \langle a \rangle$, so $|H| = p$.

**Step 2: $H$ is normal.**

$[G : H] = |G|/|H| = 2p/p = 2$. Any subgroup of index $2$ is normal: for $g \in G$, if $g \in H$ then $gH = Hg = H$; if $g \notin H$, the two left cosets are $H, gH$ and the two right cosets are $H, Hg$. Since both coset families partition $G$ and $g \notin H$, we have $gH = G \setminus H = Hg$. Either way $gH = Hg$, so $H \trianglelefteq G$.

**Step 3: $H$ is the unique subgroup of order $p$.**

Suppose $K \leq G$ is another subgroup with $|K| = p$. Both $H$ and $K$ are subgroups of prime order $p$.

*Intersection.* $H \cap K \leq H$, so $|H \cap K| \mid p$, hence $|H \cap K| \in \{1, p\}$.

- If $|H \cap K| = p$: $H \cap K = H$ (equal order in a finite group), and similarly $H \cap K = K$, so $H = K$.
- If $|H \cap K| = 1$: Counting elements of $H \cup K$: by inclusion-exclusion, $|H \cup K| = |H| + |K| - |H \cap K| = p + p - 1 = 2p - 1$. The non-identity elements of $H$ are $p - 1$ elements of order $p$; ditto for $K$. So $H \cup K$ contains $2(p - 1) = 2p - 2$ elements of order $p$, plus $e$.

Now, $G$ has order $2p$. The remaining $2p - (2p - 1) = 1$ element (aside from those in $H \cup K$) has order dividing $2p$, which by Lagrange is in $\{1, 2, p, 2p\}$. Since it's not $e$, and having order $p$ would put it in some order-$p$ subgroup... continuing the count quickly becomes awkward, so use a cleaner argument:

*Cleaner.* Elements of order $p$ in $G$: any such generates a subgroup of order $p$, and a subgroup of order $p$ has $p - 1$ elements of order $p$. Distinct subgroups of order $p$ intersect only in $e$ (prime order, Lagrange), so they contribute disjoint sets of order-$p$ elements. If there are $k$ subgroups of order $p$, there are $k(p - 1)$ elements of order $p$. These, together with $e$ and the elements of order $2$ or $2p$, make up $G$. Elements of order $2$: contribute some count $m$. The total is $1 + k(p - 1) + m + (\text{elements of order } 2p)$. But also $|G| = 2p$, so
$$k(p - 1) \leq 2p - 1 - m \leq 2p - 1.$$
Dividing by $p - 1$ (positive since $p \geq 3$): $k \leq (2p - 1)/(p - 1) = 2 + 1/(p - 1)$. Since $p \geq 3$, $1/(p - 1) \leq 1/2 < 1$, so $k \leq 2$. Suppose $k = 2$. Then $2(p - 1) = 2p - 2$ elements of order $p$, plus $e$, accounts for $2p - 1$ elements, leaving exactly $1$ element not of order $p$ or $e$. But non-identity elements come in inverse pairs (unless self-inverse, i.e., order $2$); having exactly one element of order $\neq p, 1$ is impossible unless that element is its own inverse (order $2$). One element of order $2$ and the structure is consistent. However, we can now invoke index-$2$ normality: the (unique) index-$2$ subgroup $H$ of order $p$ is normal (Step 2). If $K$ were a second index-$2$ subgroup, $HK = G$ would force $|HK| = |H||K|/|H \cap K| = p^2$, contradicting $|G| = 2p$. So in fact $k = 1$: $H$ is unique.

Therefore $G$ has a unique subgroup of order $p$, and it is normal. $\blacksquare$

*Remark.* Combined with Step 1–2, this classifies groups of order $2p$: either $G \cong \mathbb{Z}/2p\mathbb{Z}$ (cyclic, when the element of order $2$ commutes with $a$) or $G \cong D_p$ (dihedral, when $bab^{-1} = a^{-1}$).

---

## Part C — Normal Subgroups and Quotient Groups

**Problem C1.** Show that the center $Z(G)$ is always a normal subgroup.

**Problem C2.** In $S_4$, show that $V = \{e, (1\,2)(3\,4), (1\,3)(2\,4), (1\,4)(2\,3)\}$ is normal.

**Problem C3.** Compute $S_3 / A_3$.

**Problem C4.** Show that if $N \trianglelefteq G$ and $G/N$ is abelian, then $[G, G] \le N$ where $[G, G]$ is the commutator subgroup.

**Problem C5.** Let $N \trianglelefteq G$ with $|G/N| = 5$. If $a \in G$ satisfies $a^3 \in N$, show that $a \in N$.

**Problem C6.** Prove: if $|G| = 6$, then either $G \cong \mathbb{Z}_6$ or $G \cong S_3$.

### Solutions — Part C

**Solution C1.**
We already know $Z(G) \leq G$ (Solution 8 of CO1). To show $Z(G) \trianglelefteq G$, we verify $gZ(G)g^{-1} \subseteq Z(G)$ for all $g \in G$.

Let $z \in Z(G)$ and $g \in G$. Compute
$$g z g^{-1} \stackrel{z \in Z}{=} z g g^{-1} = z \cdot e = z.$$
In the first equality, we used that $z$ commutes with $g$ (by definition of $Z(G)$), i.e., $gz = zg$, so $gzg^{-1} = z$.

Hence $gzg^{-1} = z \in Z(G)$, so $gZ(G)g^{-1} \subseteq Z(G)$. In fact $gZ(G)g^{-1} = Z(G)$ (equality since conjugation is a bijection).

Therefore $Z(G) \trianglelefteq G$. $\blacksquare$

*Remark.* This even shows $Z(G)$ is **characteristic**: fixed by every automorphism, not just by conjugation (since any automorphism preserves the center, by definition of center).

---

**Solution C2.**
Let $V = \{e, (1\,2)(3\,4), (1\,3)(2\,4), (1\,4)(2\,3)\}$ — the "Klein four subgroup" of $S_4$, consisting of the identity and all three products of two disjoint transpositions.

**Step 1: $V \leq S_4$.**

Closure: the three double transpositions $\alpha = (1\,2)(3\,4)$, $\beta = (1\,3)(2\,4)$, $\gamma = (1\,4)(2\,3)$ satisfy $\alpha \beta = \gamma$ (check: $1 \to 2 \to 4, 2 \to 1 \to 3, 3 \to 4 \to 2, 4 \to 3 \to 1$, giving $(1\,4)(2\,3) = \gamma$ ✓). Similarly $\alpha^2 = \beta^2 = \gamma^2 = e$. So $V$ is closed under products, contains inverses (each element is its own inverse), and contains $e$. $V \leq S_4$ ✓. In fact $V \cong \mathbb{Z}/2\mathbb{Z} \times \mathbb{Z}/2\mathbb{Z}$.

**Step 2: $V \trianglelefteq S_4$.**

Recall a key fact ([[05-permutation-and-dihedral-groups]]): for $\sigma, \tau \in S_n$, conjugation acts on cycle decomposition by relabeling:
$$\sigma(a_1\,a_2\,\ldots\,a_k)\sigma^{-1} = (\sigma(a_1)\,\sigma(a_2)\,\ldots\,\sigma(a_k)).$$
In particular, **conjugation preserves cycle type**.

The non-identity elements of $V$ are precisely the permutations in $S_4$ of cycle type $2+2$ (double transpositions). There are exactly three such elements, and conjugation by any $\sigma \in S_4$ permutes these three. Hence for any $\sigma \in S_4$ and $v \in V$, $\sigma v \sigma^{-1} \in V$, so $\sigma V \sigma^{-1} = V$.

Therefore $V \trianglelefteq S_4$. $\blacksquare$

*Remark.* This normal $V_4$ is the **Klein four-group**, often denoted $K_4$ or $V$. It is the kernel of the surjection $S_4 \twoheadrightarrow S_3$ induced by the action of $S_4$ on the $3$ pairs of opposite edges of a tetrahedron. So $S_4/V \cong S_3$, giving one of the classical exceptional quotients.

---

**Solution C3.**
Recall $|S_3| = 6$ and $A_3 = \{e, (1\,2\,3), (1\,3\,2)\}$ has order $3$. Since $[S_3 : A_3] = 2$, $A_3 \trianglelefteq S_3$ (index $2$ ⟹ normal, see B7).

So $S_3/A_3$ is a group of order $|S_3|/|A_3| = 6/3 = 2$.

**Claim.** Any group of order $2$ is isomorphic to $\mathbb{Z}/2\mathbb{Z}$.

*Proof.* Order $2$ is prime, so the group is cyclic (Solution B5 corollary): $G = \{e, x\}$ with $x^2 = e$. The map $\mathbb{Z}/2\mathbb{Z} \to G$ sending $0 \mapsto e, 1 \mapsto x$ is an isomorphism.

Hence $S_3/A_3 \cong \mathbb{Z}/2\mathbb{Z}$, i.e., $\boxed{S_3/A_3 \cong \mathbb{Z}_2}$.

*Concrete description.* The two cosets are $A_3$ (even permutations) and $S_3 \setminus A_3$ (odd permutations). The quotient map $S_3 \to \{e, x\}$ is precisely the sign homomorphism $\operatorname{sgn}$. $\blacksquare$

---

**Solution C4.**
Let $N \trianglelefteq G$. Recall $[G, G]$ is generated by all commutators $[a, b] := aba^{-1}b^{-1}$ for $a, b \in G$. We show:
$$G/N \text{ abelian} \iff [G, G] \leq N.$$
The "only if" direction is what we need; we prove the equivalence.

**Step 1: Characterization.** $G/N$ abelian means $(aN)(bN) = (bN)(aN)$ for all $a, b \in G$. Now
$$(aN)(bN) = (ab)N, \quad (bN)(aN) = (ba)N.$$
So $G/N$ is abelian iff $(ab)N = (ba)N$ for all $a, b \in G$, iff $(ab)(ba)^{-1} \in N$, iff $aba^{-1}b^{-1} \in N$ for all $a, b \in G$, iff every commutator lies in $N$.

**Step 2: From commutators to $[G, G]$.** $[G, G]$ is the subgroup generated by commutators. If every commutator is in $N$, then every product of commutators (and their inverses — but commutators are closed under inversion: $[a, b]^{-1} = [b, a]$) is in $N$ (since $N$ is closed under products and inverses). Thus the subgroup $[G, G]$ generated by commutators is contained in $N$.

**Conclusion.** $G/N$ abelian $\iff$ every commutator lies in $N$ $\iff$ $[G, G] \leq N$. $\blacksquare$

*Remark.* This shows $[G, G]$ is the **smallest** normal subgroup with abelian quotient; $G^{\mathrm{ab}} := G/[G, G]$ is the **abelianization** of $G$, and it satisfies a universal property: any homomorphism $G \to A$ with $A$ abelian factors uniquely through $G^{\mathrm{ab}}$.

---

**Solution C5.**
Let $N \trianglelefteq G$ with $|G/N| = 5$, and suppose $a \in G$ satisfies $a^3 \in N$.

In the quotient $G/N$, let $\bar a = aN$. Then
$$\bar a^3 = a^3 N = \bar e \qquad (\text{since } a^3 \in N).$$

So the order of $\bar a$ divides $3$ (by the same argument as CO1 Solution 4: $|\bar a| \mid 3$).

But also $|\bar a|$ divides $|G/N| = 5$ by Lagrange's theorem in $G/N$.

Hence
$$|\bar a| \mid \gcd(3, 5) = 1.$$

So $|\bar a| = 1$, i.e., $\bar a = \bar e$, i.e., $aN = N$, i.e., $a \in N$. $\blacksquare$

*Remark.* The key fact is that when $\gcd(3, |G/N|) = 1$, the cube map $x \mapsto x^3$ is a bijection on $G/N$ (the inverse of multiplication by $3$ modulo the order). So $\bar a^3 = \bar e$ forces $\bar a = \bar e$.

---

**Solution C6.**
Let $|G| = 6$. We show $G \cong \mathbb{Z}/6\mathbb{Z}$ or $G \cong S_3$.

**Step 1: Existence of an element of order $3$.**

By Cauchy's theorem, since $3 \mid |G|$, there exists $a \in G$ with $|a| = 3$. Let $H = \langle a\rangle = \{e, a, a^2\}$, of order $3$. Then $[G : H] = 6/3 = 2$, so $H \trianglelefteq G$ (index $2$).

**Step 2: Existence of an element of order $2$.**

By Cauchy (or by the $2p$ argument from B7): there exists $b \in G$ with $|b| = 2$. Since $|b| = 2 \neq 3$, $b \notin H$. So $b \notin \{e, a, a^2\}$.

**Step 3: Structure.**

Since $H \trianglelefteq G$, $bHb^{-1} = H$. In particular, $bab^{-1} \in H = \{e, a, a^2\}$.

- $bab^{-1} = e$: then $a = e$, contradiction ($|a| = 3$).
- $bab^{-1} = a$: $G$ is generated by $a, b$ with $ba = ab$. Then $G$ is abelian (since $\langle a, b\rangle$ generated by commuting elements). Compute $|ab|$: $(ab)^k = a^k b^k$, so $(ab)^k = e$ iff $a^k = b^{-k}$. Since $\langle a\rangle \cap \langle b\rangle \subseteq \langle a\rangle \cap \{e, b\}$; as $|a| = 3$ and $|b| = 2$ with $\gcd(2, 3) = 1$, we have $\langle a\rangle \cap \langle b\rangle = \{e\}$. So $a^k = b^{-k} = e$, i.e., $3 \mid k$ and $2 \mid k$, i.e., $6 \mid k$. Hence $|ab| = 6$, and $G = \langle ab\rangle \cong \mathbb{Z}/6\mathbb{Z}$.

- $bab^{-1} = a^2 = a^{-1}$: $G$ has generators $a, b$ with relations $a^3 = e, b^2 = e, bab^{-1} = a^{-1}$ — this is precisely the presentation of $D_3 = S_3$. So $G \cong D_3 \cong S_3$.

**Conclusion.** Every group of order $6$ is isomorphic to either $\mathbb{Z}/6\mathbb{Z}$ (cyclic, abelian) or $S_3$ (dihedral, non-abelian). These are non-isomorphic (one abelian, one not). $\blacksquare$

---

## Part D — Direct Products and Abelian Groups

**Problem D1.** Find the order of $(4, 3)$ in $\mathbb{Z}_{10} \times \mathbb{Z}_{6}$.

**Problem D2.** Is $\mathbb{Z}_{12} \times \mathbb{Z}_{18} \cong \mathbb{Z}_{6} \times \mathbb{Z}_{36}$? Justify.

**Problem D3.** How many abelian groups of order 72 are there up to isomorphism?

**Problem D4.** Show $U(20) \cong \mathbb{Z}_2 \times \mathbb{Z}_4$.

**Problem D5.** Determine whether $\mathbb{Z}_2 \times \mathbb{Z}_4$ and $\mathbb{Z}_8$ are isomorphic.

**Problem D6.** Find the number of elements of order 10 in $\mathbb{Z}_{10} \times \mathbb{Z}_{15}$.

### Solutions — Part D

**Solution D1.**
**Theorem** ([[11-direct-products]]). In $G \times H$, $|(g, h)| = \operatorname{lcm}(|g|, |h|)$.

*Component orders.*
- In $\mathbb{Z}_{10}$: $|4| = 10/\gcd(10, 4) = 10/2 = 5$. (Check: $2 \cdot 4 = 8 \neq 0, 3 \cdot 4 = 12 \equiv 2, 4 \cdot 4 = 16 \equiv 6, 5 \cdot 4 = 20 \equiv 0$.) ✓
- In $\mathbb{Z}_6$: $|3| = 6/\gcd(6, 3) = 6/3 = 2$. (Check: $2 \cdot 3 = 6 \equiv 0$.) ✓

Hence
$$|(4, 3)| = \operatorname{lcm}(5, 2) = 10. \qquad \boxed{10}$$ $\blacksquare$

---

**Solution D2.**
Use the **invariant factor decomposition** (equivalently, **elementary divisor** decomposition) for finite abelian groups.

**Key fact.** $\mathbb{Z}_m \times \mathbb{Z}_n \cong \mathbb{Z}_{mn}$ iff $\gcd(m, n) = 1$.

*Decompose $\mathbb{Z}_{12} \times \mathbb{Z}_{18}$.* 
$$\mathbb{Z}_{12} \cong \mathbb{Z}_4 \times \mathbb{Z}_3 \quad (\gcd(4, 3) = 1).$$
$$\mathbb{Z}_{18} \cong \mathbb{Z}_2 \times \mathbb{Z}_9 \quad (\gcd(2, 9) = 1).$$
Therefore
$$\mathbb{Z}_{12} \times \mathbb{Z}_{18} \cong \mathbb{Z}_4 \times \mathbb{Z}_3 \times \mathbb{Z}_2 \times \mathbb{Z}_9 \cong \mathbb{Z}_2 \times \mathbb{Z}_4 \times \mathbb{Z}_3 \times \mathbb{Z}_9.$$

*Decompose $\mathbb{Z}_6 \times \mathbb{Z}_{36}$.*
$$\mathbb{Z}_6 \cong \mathbb{Z}_2 \times \mathbb{Z}_3.$$
$$\mathbb{Z}_{36} \cong \mathbb{Z}_4 \times \mathbb{Z}_9 \quad (\gcd(4, 9) = 1).$$
Therefore
$$\mathbb{Z}_6 \times \mathbb{Z}_{36} \cong \mathbb{Z}_2 \times \mathbb{Z}_3 \times \mathbb{Z}_4 \times \mathbb{Z}_9.$$

*Compare.* Both decompose as $\mathbb{Z}_2 \times \mathbb{Z}_4 \times \mathbb{Z}_3 \times \mathbb{Z}_9$ (up to reordering). By uniqueness of elementary divisor decomposition for finite abelian groups,
$$\mathbb{Z}_{12} \times \mathbb{Z}_{18} \;\cong\; \mathbb{Z}_6 \times \mathbb{Z}_{36}. \qquad \boxed{\text{Yes, isomorphic}} \; \blacksquare$$

*Check via invariant factors.* Both groups have invariant factors $(6, 36)$ (where $6 \mid 36$): $\mathbb{Z}_6 \times \mathbb{Z}_{36}$ is already in this form; for $\mathbb{Z}_{12} \times \mathbb{Z}_{18}$, compute $\gcd(12, 18) = 6$ and $\operatorname{lcm}(12, 18) = 36$, giving invariant factors $(6, 36)$ as well. ✓

---

**Solution D3.**
**Fundamental Theorem of Finite Abelian Groups.** Every finite abelian group $G$ of order $n$ is isomorphic to a product
$$\prod_i \mathbb{Z}_{p_i^{a_{i,1}}} \times \mathbb{Z}_{p_i^{a_{i,2}}} \times \cdots$$
where the $p_i$ are the distinct prime factors of $n$ and $(a_{i, 1} \geq a_{i, 2} \geq \ldots)$ is a partition of the exponent of $p_i$ in $n$.

*Apply to $n = 72 = 2^3 \cdot 3^2$.* The number of abelian groups of order $72$ equals $p(3) \cdot p(2)$, where $p(k)$ is the number of partitions of $k$.

*Partitions of $3$:* $3, 2 + 1, 1 + 1 + 1$. So $p(3) = 3$.

Corresponding abelian $2$-groups of order $8$:
- $\mathbb{Z}_8$ (partition $3$)
- $\mathbb{Z}_4 \times \mathbb{Z}_2$ (partition $2+1$)
- $\mathbb{Z}_2 \times \mathbb{Z}_2 \times \mathbb{Z}_2$ (partition $1+1+1$)

*Partitions of $2$:* $2, 1 + 1$. So $p(2) = 2$.

Corresponding abelian $3$-groups of order $9$:
- $\mathbb{Z}_9$ (partition $2$)
- $\mathbb{Z}_3 \times \mathbb{Z}_3$ (partition $1+1$)

**Total number:** $p(3) \cdot p(2) = 3 \cdot 2 = \boxed{6}$ abelian groups of order $72$ up to isomorphism.

Explicit list:
1. $\mathbb{Z}_8 \times \mathbb{Z}_9 \cong \mathbb{Z}_{72}$
2. $\mathbb{Z}_8 \times \mathbb{Z}_3 \times \mathbb{Z}_3$
3. $\mathbb{Z}_4 \times \mathbb{Z}_2 \times \mathbb{Z}_9$
4. $\mathbb{Z}_4 \times \mathbb{Z}_2 \times \mathbb{Z}_3 \times \mathbb{Z}_3$
5. $\mathbb{Z}_2 \times \mathbb{Z}_2 \times \mathbb{Z}_2 \times \mathbb{Z}_9$
6. $\mathbb{Z}_2 \times \mathbb{Z}_2 \times \mathbb{Z}_2 \times \mathbb{Z}_3 \times \mathbb{Z}_3$ $\blacksquare$

---

**Solution D4.**
$U(20) = \{k \in \mathbb{Z}_{20} : \gcd(k, 20) = 1\} = \{1, 3, 7, 9, 11, 13, 17, 19\}$, order $\varphi(20) = 8$.

**Chinese Remainder Theorem.** Since $20 = 4 \cdot 5$ with $\gcd(4, 5) = 1$,
$$\mathbb{Z}_{20} \cong \mathbb{Z}_4 \times \mathbb{Z}_5 \quad \text{as rings,}$$
so taking unit groups,
$$U(20) \cong U(4) \times U(5).$$

*Compute $U(4)$.* $U(4) = \{1, 3\}$, order $2$, cyclic: $U(4) \cong \mathbb{Z}_2$.

*Compute $U(5)$.* $U(5) = \{1, 2, 3, 4\}$, order $4$. Check $2$ as generator: $2^1 = 2, 2^2 = 4, 2^3 = 8 \equiv 3, 2^4 = 16 \equiv 1$. So $|2| = 4$, and $U(5) = \langle 2\rangle \cong \mathbb{Z}_4$.

**Conclusion.** $U(20) \cong \mathbb{Z}_2 \times \mathbb{Z}_4$. $\blacksquare$

*Sanity check.* $\mathbb{Z}_2 \times \mathbb{Z}_4$ has order $8$ ✓. It is not cyclic: $\operatorname{lcm}(2, 4) = 4 < 8$, so no element has order $8$. Indeed $U(20)$ is not cyclic either: e.g., $3^2 = 9, 3^4 = 81 \equiv 1$, so $|3| = 4 < 8$. ✓

---

**Solution D5.**
Both groups have order $8$. The question is whether they are isomorphic.

**Invariant:** the maximum order of an element.

*In $\mathbb{Z}_8$:* the element $1$ has order $8$. So max order = $8$.

*In $\mathbb{Z}_2 \times \mathbb{Z}_4$:* by D1-style reasoning, $|(a, b)| = \operatorname{lcm}(|a|, |b|)$. We have $|a| \in \{1, 2\}$ (divisors of $2$) and $|b| \in \{1, 2, 4\}$. So $\operatorname{lcm}(|a|, |b|) \in \{1, 2, 4\}$. Max order = $4$.

Since max order is an isomorphism invariant ($\varphi: G \to H$ an isomorphism sends an element of order $k$ to an element of order $k$), and $8 \neq 4$,
$$\mathbb{Z}_2 \times \mathbb{Z}_4 \;\not\cong\; \mathbb{Z}_8. \qquad \boxed{\text{Not isomorphic}} \; \blacksquare$$

*Equivalent argument.* $\mathbb{Z}_8$ is cyclic; $\mathbb{Z}_2 \times \mathbb{Z}_4$ is not (no element of order $8$).

---

**Solution D6.**
Count $(a, b) \in \mathbb{Z}_{10} \times \mathbb{Z}_{15}$ with $|(a, b)| = 10$.

Recall $|(a, b)| = \operatorname{lcm}(|a|, |b|)$.

**Step 1: Possible component orders.**

In $\mathbb{Z}_{10}$: divisors of $10$ are $\{1, 2, 5, 10\}$. The number of elements of order $d$ is $\varphi(d)$:
- order $1$: $\varphi(1) = 1$ element (namely $0$).
- order $2$: $\varphi(2) = 1$.
- order $5$: $\varphi(5) = 4$.
- order $10$: $\varphi(10) = 4$.

Total: $1 + 1 + 4 + 4 = 10$ ✓.

In $\mathbb{Z}_{15}$: divisors of $15$ are $\{1, 3, 5, 15\}$:
- order $1$: $\varphi(1) = 1$.
- order $3$: $\varphi(3) = 2$.
- order $5$: $\varphi(5) = 4$.
- order $15$: $\varphi(15) = 8$.

Total: $1 + 2 + 4 + 8 = 15$ ✓.

**Step 2: Enumerate pairs $(|a|, |b|)$ with $\operatorname{lcm}(|a|, |b|) = 10$.**

We need $\operatorname{lcm}(|a|, |b|) = 10 = 2 \cdot 5$.

Since $\mathbb{Z}_{15}$ has order coprime to $2$, $|b|$ is always odd (divides $15$), so $|b| \in \{1, 3, 5, 15\}$. The factor of $2$ in the lcm must come from $|a|$, so $|a|$ must be even, i.e., $|a| \in \{2, 10\}$.

*Case $|a| = 2$:* Need $\operatorname{lcm}(2, |b|) = 10$, so $|b|$ must contribute a $5$ and cannot contribute a $3$ (since $\operatorname{lcm}$ would pick up a $3$). Hence $|b| = 5$.
*Case $|a| = 10$:* Need $\operatorname{lcm}(10, |b|) = 10$, so $|b| \mid 10$. Combined with $|b| \mid 15$, we get $|b| \mid \gcd(10, 15) = 5$, so $|b| \in \{1, 5\}$.

Valid pairs: $(|a|, |b|) \in \{(2, 5), (10, 1), (10, 5)\}$.

**Step 3: Count in each case.**

| $(|a|, |b|)$ | \# of $a$ | \# of $b$ | Count |
|---|---|---|---|
| $(2, 5)$ | $1$ | $4$ | $4$ |
| $(10, 1)$ | $4$ | $1$ | $4$ |
| $(10, 5)$ | $4$ | $4$ | $16$ |

**Total:** $4 + 4 + 16 = \boxed{24}$ elements of order $10$ in $\mathbb{Z}_{10} \times \mathbb{Z}_{15}$. $\blacksquare$

---

## Part E — Subgroup Lattice and Dihedral

**Problem E1.** Count all subgroups of $D_5$.

**Problem E2.** Draw the subgroup lattice of $D_3$.

**Problem E3.** List all normal subgroups of $D_4$.

**Problem E4.** Compute $Z(D_7)$ and $Z(D_8)$.

**Problem E5.** Find all quotient groups of $D_4$ up to isomorphism.

### Solutions — Part E

**Solution E1.**
$D_5$ has order $2n = 10$ with $n = 5$. The full classification of subgroups of $D_n$ ([[12-subgroup-lattice-and-dihedral-groups]]):
- For each divisor $d$ of $n$, exactly **one** cyclic subgroup $\langle r^{n/d}\rangle$ of rotations (order $d$).
- For each divisor $d$ of $n$, exactly $n/d$ dihedral subgroups of order $2d$ (conjugate reflection-closed subgroups).

*Apply to $n = 5$ prime.* Divisors of $5$: $\{1, 5\}$.

*Cyclic rotation subgroups:*
- $d = 1$: $\{e\}$ (order $1$).
- $d = 5$: $\langle r\rangle = \{e, r, r^2, r^3, r^4\}$ (order $5$, the full rotation subgroup).

*Dihedral subgroups:*
- $d = 1, 2d = 2$: $n/d = 5$ subgroups of order $2$, namely $\langle s\rangle, \langle rs\rangle, \langle r^2 s\rangle, \langle r^3 s\rangle, \langle r^4 s\rangle$.
- $d = 5, 2d = 10$: $n/d = 1$ subgroup of order $10$, namely $D_5$ itself.

**Total:** $2 + 5 + 1 = \boxed{8}$ subgroups. $\blacksquare$

---

**Solution E2.**
$D_3 = S_3$, order $6$. Subgroups (from the $D_n$ classification, $n = 3$):

- Order $1$: $\{e\}$.
- Order $2$ (three, from reflections): $\langle s \rangle, \langle rs \rangle, \langle r^2 s \rangle$. In $S_3$ these are $\langle (1\,2) \rangle, \langle (1\,3)\rangle, \langle (2\,3)\rangle$ (depending on which edge each reflection fixes).
- Order $3$: $\langle r\rangle = A_3 = \{e, (1\,2\,3), (1\,3\,2)\}$.
- Order $6$: $D_3 = S_3$.

**Lattice.**
```
                        D_3 = S_3
                      /   |   |   \
               A_3  ⟨s⟩  ⟨rs⟩  ⟨r²s⟩
                      \   |   |   /
                         { e }
```

No containments between the four middle-row subgroups beyond the trivial one ($A_3$ is normal, the three reflection subgroups are not; they are pairwise non-contained since they're all of the same prime order $2$ and are distinct).

**Normality.** $A_3 \trianglelefteq S_3$ (index $2$); the three reflection subgroups are *not* normal (they are conjugate to each other under $S_3$, forming a single conjugacy class).

**Six subgroups total.** $\blacksquare$

---

**Solution E3.**
$D_4$ has order $8$. From Solution 10 of CO1, the $10$ subgroups are:

| Order | Subgroup |
|---|---|
| $1$ | $\{e\}$ |
| $2$ | $\langle r^2\rangle, \langle s\rangle, \langle rs\rangle, \langle r^2 s\rangle, \langle r^3 s\rangle$ |
| $4$ | $\langle r\rangle, \{e, r^2, s, r^2 s\}, \{e, r^2, rs, r^3 s\}$ |
| $8$ | $D_4$ |

**Normality.**

- $\{e\}$ and $D_4$: always normal.
- $\langle r^2\rangle = Z(D_4)$: center is always normal. ✓
- $\langle s\rangle$: not normal. Check $r\langle s\rangle r^{-1} = \{e, rsr^{-1}\} = \{e, r^2 s\}$ (using $rsr^{-1} = r \cdot rs^{-1} \cdot \ldots$; actually $rsr^{-1} = r \cdot s \cdot r^{-1}$; and from $sr = r^{-1}s$ we get $rs = sr^{-1}$, so $rsr^{-1} = sr^{-2} = sr^2 = r^{-2}s = r^2 s$). Hence $r\langle s\rangle r^{-1} = \langle r^2 s\rangle \neq \langle s\rangle$. Not normal. ✗
- Similarly $\langle rs\rangle, \langle r^2 s\rangle, \langle r^3 s\rangle$ are not individually normal (they form two conjugate pairs: $\{\langle s\rangle, \langle r^2 s\rangle\}$ and $\{\langle rs\rangle, \langle r^3 s\rangle\}$).
- Order-$4$ subgroups: each has index $2$, hence **all normal**.

**Normal subgroups of $D_4$:**
1. $\{e\}$
2. $\langle r^2\rangle$
3. $\langle r\rangle$
4. $\{e, r^2, s, r^2 s\}$
5. $\{e, r^2, rs, r^3 s\}$
6. $D_4$

**Total: $\boxed{6}$ normal subgroups.** $\blacksquare$

---

**Solution E4.**
**General fact** ([[12-subgroup-lattice-and-dihedral-groups]]): in $D_n$ with $n \geq 2$,
$$Z(D_n) = \begin{cases} \{e\}, & n \text{ odd}, \\ \{e, r^{n/2}\}, & n \text{ even}.\end{cases}$$

*Proof sketch.* $Z(D_n)$ consists of rotations commuting with $s$ (since $\langle r\rangle$ is the set of rotations, and $s$ is the key reflection to test). $r^k s = s r^k \iff r^k = s r^k s = r^{-k} \iff r^{2k} = e \iff n \mid 2k$. For $n$ odd, only $k = 0$ works. For $n$ even, $k = 0$ and $k = n/2$ both work. Also, no reflection commutes with $r$ (same argument as CO1 Problem 20) unless $r^2 = e$, i.e., $n \leq 2$.

*For $D_7$:* $n = 7$ odd, so $Z(D_7) = \{e\}$. $\boxed{|Z(D_7)| = 1}$

*For $D_8$:* $n = 8$ even, so $Z(D_8) = \{e, r^4\}$. $\boxed{Z(D_8) = \{e, r^4\}\cong \mathbb{Z}/2\mathbb{Z}}$ $\blacksquare$

---

**Solution E5.**
The quotient groups of $D_4$ are $D_4/N$ for each normal subgroup $N$ (from E3, there are $6$ of them).

| $N$ | $|N|$ | $|D_4/N|$ | Quotient |
|---|---|---|---|
| $\{e\}$ | $1$ | $8$ | $D_4$ |
| $\langle r^2\rangle$ | $2$ | $4$ | ? |
| $\langle r\rangle$ | $4$ | $2$ | $\mathbb{Z}_2$ |
| $\{e, r^2, s, r^2 s\}$ | $4$ | $2$ | $\mathbb{Z}_2$ |
| $\{e, r^2, rs, r^3 s\}$ | $4$ | $2$ | $\mathbb{Z}_2$ |
| $D_4$ | $8$ | $1$ | $\{e\}$ |

*Determine $D_4/\langle r^2\rangle$.* This quotient has order $4$. Elements: $\bar e = \{e, r^2\}, \bar r = \{r, r^3\}, \bar s = \{s, r^2 s\}, \overline{rs} = \{rs, r^3 s\}$. Check whether abelian:
- $\bar r \cdot \bar s = \overline{rs}$.
- $\bar s \cdot \bar r = \overline{sr} = \overline{r^{-1} s} = \overline{r^3 s} = \overline{rs}$ (since $r^3 s \in \{rs, r^3 s\}$).

So $\bar r \bar s = \bar s \bar r = \overline{rs}$. Abelian. Also $\bar r^2 = \bar e, \bar s^2 = \bar e, \overline{rs}^2 = \bar e$. Every non-identity element has order $2$, so the group is $V_4 = \mathbb{Z}_2 \times \mathbb{Z}_2$.

$\boxed{D_4/\langle r^2\rangle \cong V_4.}$

**Isomorphism types of quotients:** $\{e\}, \mathbb{Z}_2, V_4, D_4$. That is $\boxed{4}$ distinct isomorphism types. $\blacksquare$

---

## Part F — Burnside's Theorem

**Problem F1.** Count 3-color vertex colorings of a square, up to $D_4$.

**Problem F2.** Count 2-color necklaces of length 7 (cyclic group $\mathbb{Z}_7$).

**Problem F3.** Count 3-color bracelets of length 4 (group $D_4$).

**Problem F4.** Count distinct colorings of a tetrahedron with $n$ colors on vertices, under its rotation group ($A_4$, order 12).

**Problem F5.** How many ways to distribute 3 identical balls into 4 distinguishable boxes, where boxes related by a fixed cyclic permutation are considered equivalent?

### Solutions — Part F

**Solution F1.**
**Burnside's Lemma.** If $G$ acts on a set $X$, then
$$|X/G| = \frac{1}{|G|}\sum_{g \in G}|X^g|,$$
where $X^g = \{x \in X : g \cdot x = x\}$ is the fixed-point set.

*Setup.* $X = \{\text{functions } V \to \{R, G, B\}\}$ where $V = \{1, 2, 3, 4\}$ labels the $4$ vertices of a square. $|X| = 3^4 = 81$. $G = D_4$ acts by permuting vertices.

*Compute $|X^g|$ for each $g \in D_4$.* A coloring is fixed by $g$ iff it is constant on every cycle of $g$ (acting on $V$); so $|X^g| = c^{\text{(\# of cycles of } g)}$ with $c = 3$ colors.

| $g$ | Cycle structure on $V$ | \# cycles | $|X^g|$ |
|---|---|---|---|
| $e$ | $(1)(2)(3)(4)$ | $4$ | $3^4 = 81$ |
| $r = (1\,2\,3\,4)$ | $(1\,2\,3\,4)$ | $1$ | $3^1 = 3$ |
| $r^2 = (1\,3)(2\,4)$ | two $2$-cycles | $2$ | $3^2 = 9$ |
| $r^3 = (1\,4\,3\,2)$ | one $4$-cycle | $1$ | $3$ |
| $s_1$: reflection through vertices $1, 3$ — fixes $1, 3$, swaps $2, 4$ | $(1)(3)(2\,4)$ | $3$ | $3^3 = 27$ |
| $s_2$: reflection through vertices $2, 4$ — fixes $2, 4$, swaps $1, 3$ | $(1\,3)(2)(4)$ | $3$ | $27$ |
| $s_3$: reflection through midpoints of edges $1\!-\!2$ and $3\!-\!4$ — swaps $1, 2$ and swaps $3, 4$ | $(1\,2)(3\,4)$ | $2$ | $9$ |
| $s_4$: reflection through midpoints of edges $2\!-\!3$ and $4\!-\!1$ — swaps $2, 3$ and swaps $1, 4$ | $(1\,4)(2\,3)$ | $2$ | $9$ |

*Sum.* $\sum_g |X^g| = 81 + 3 + 9 + 3 + 27 + 27 + 9 + 9 = 168$.

*Number of orbits.*
$$|X/D_4| = \frac{168}{8} = 21. \qquad \boxed{21}$$ $\blacksquare$

---

**Solution F2.**
Necklaces of length $7$ with $c = 2$ colors: color the $7$ positions, with rotational equivalence ($\mathbb{Z}_7$ action).

*Fixed-point counts.* For $g = r^k \in \mathbb{Z}_7$ (rotation by $k$), the cycle structure on $7$ positions consists of cycles of length $7/\gcd(7, k)$. Since $7$ is prime:
- $k = 0$: identity, $7$ fixed points ($7$ cycles of length $1$), so $|X^e| = 2^7 = 128$.
- $k = 1, 2, \ldots, 6$: rotation by $k$ with $\gcd(7, k) = 1$, so a single $7$-cycle. $|X^{r^k}| = 2^1 = 2$.

*Sum.* $\sum_g |X^g| = 128 + 6 \cdot 2 = 140$.

*Orbits.*
$$|X/\mathbb{Z}_7| = \frac{140}{7} = 20. \qquad \boxed{20}$$

*Check.* Equivalently, by Polya-style formula for prime $p$: $\frac{1}{p}(c^p + (p-1)c) = \frac{1}{7}(2^7 + 6 \cdot 2) = \frac{140}{7} = 20$. ✓ $\blacksquare$

---

**Solution F3.**
Bracelets of length $4$ with $c = 3$ colors: positions on a cycle acted upon by $D_4$ (rotations + reflections).

This is exactly Problem F1 (vertex colorings of a square under $D_4$ with $3$ colors). From F1, the answer is $\boxed{21}$. $\blacksquare$

*Remark.* This is no coincidence: a "bracelet" is, by definition, a cyclic coloring up to rotations **and** reflections, which matches the $D_n$ action. A "necklace" allows only rotations ($\mathbb{Z}_n$ or $C_n$).

---

**Solution F4.**
Rotation group of the tetrahedron: $A_4$, order $12$.

*Rotation types.* On the $4$ vertices:
- Identity ($1$ element): cycle type $(1, 1, 1, 1)$, $4$ cycles.
- Vertex rotations ($8$ elements): $\pm 120°$ about an axis through one vertex and the opposite face center. Fixes the chosen vertex and $3$-cycles the other $3$. Cycle type $(1, 3)$, $2$ cycles.
- Edge rotations ($3$ elements): $180°$ about an axis through midpoints of two opposite edges. Two $2$-cycles (each pair of the opposite edge's endpoints swapped). Cycle type $(2, 2)$, $2$ cycles.

Total: $1 + 8 + 3 = 12$ ✓.

*Fixed-point counts (with $n$ colors).*

| Element count | Cycles | $|X^g|$ |
|---|---|---|
| $1$ | $4$ | $n^4$ |
| $8$ | $2$ | $n^2$ |
| $3$ | $2$ | $n^2$ |

*Sum.* $\sum_g |X^g| = n^4 + 8 n^2 + 3 n^2 = n^4 + 11 n^2$.

*Orbits.*
$$N(n) = \frac{n^4 + 11 n^2}{12}. \qquad \boxed{\frac{n^4 + 11n^2}{12}}$$

*Check for small $n$.*
- $n = 1$: one coloring trivially, and formula gives $(1 + 11)/12 = 1$ ✓.
- $n = 2$: $(16 + 44)/12 = 60/12 = 5$ — 5 distinct $2$-colorings ✓ (matches direct enumeration: all-one-color (2), one-and-three (2), two-and-two (1)).
- $n = 3$: $(81 + 99)/12 = 180/12 = 15$. $\blacksquare$

---

**Solution F5.**
$3$ identical balls in $4$ distinguishable boxes, with cyclic $\mathbb{Z}_4$ action on boxes.

**Setup.** $X = \{(a_1, a_2, a_3, a_4) \in \mathbb{Z}_{\geq 0}^4 : a_1 + a_2 + a_3 + a_4 = 3\}$. By stars-and-bars, $|X| = \binom{3 + 4 - 1}{4 - 1} = \binom{6}{3} = 20$.

$\mathbb{Z}_4 = \{e, r, r^2, r^3\}$ acts by cyclic permutation: $r \cdot (a_1, a_2, a_3, a_4) = (a_4, a_1, a_2, a_3)$.

**Burnside.**

*Identity.* Fixes all: $|X^e| = 20$.

*$r$ (rotation by $1$):* Fixed points satisfy $a_1 = a_4, a_2 = a_1, a_3 = a_2, a_4 = a_3$, i.e., $a_1 = a_2 = a_3 = a_4 = a$ with $4a = 3$. No non-negative integer solution. $|X^r| = 0$.

*$r^2$ (rotation by $2$):* Fixed points satisfy $a_1 = a_3, a_2 = a_4$, with $2a_1 + 2a_2 = 3$. Left side is even, right side is odd — no solution. $|X^{r^2}| = 0$.

*$r^3$:* By symmetry with $r$, $|X^{r^3}| = 0$.

*Sum.* $20 + 0 + 0 + 0 = 20$.

*Orbits.*
$$|X/\mathbb{Z}_4| = \frac{20}{4} = 5. \qquad \boxed{5\text{ orbits}}$$

*Explicit enumeration (as a check).* Orbits under $\mathbb{Z}_4$ of sequences $(a, b, c, d)$ with $a + b + c + d = 3, a_i \geq 0$:

1. $(3, 0, 0, 0)$ and its rotations — $1$ orbit.
2. $(2, 1, 0, 0), (2, 0, 1, 0), (2, 0, 0, 1)$ — size-$4$ orbit of $(2, 1, 0, 0)$, and size-$4$ orbit of $(2, 0, 1, 0)$. Wait — let's compute more carefully. Acting on $(2, 1, 0, 0)$: rotations give $(2, 1, 0, 0) \to (0, 2, 1, 0) \to (0, 0, 2, 1) \to (1, 0, 0, 2) \to (2, 1, 0, 0)$. Orbit of size $4$.
3. $(2, 0, 1, 0)$: $(2, 0, 1, 0) \to (0, 2, 0, 1) \to (1, 0, 2, 0) \to (0, 1, 0, 2) \to$ back to $(2, 0, 1, 0)$. Orbit of size $4$.
4. $(1, 1, 1, 0)$: rotations cycle through $4$ arrangements. Orbit of size $4$.

Total: $1 + 4 + 4 + 4 + \ldots$ but we need to hit $20$ total. Let me list more carefully:

Compositions $(a, b, c, d)$ of $3$:
- $(3,0,0,0), (0,3,0,0), (0,0,3,0), (0,0,0,3)$: orbit of size $4$.
- $(2,1,0,0), (0,2,1,0), (0,0,2,1), (1,0,0,2)$: orbit of size $4$.
- $(2,0,1,0), (0,2,0,1), (1,0,2,0), (0,1,0,2)$: orbit of size $4$.
- $(2,0,0,1), (1,2,0,0), (0,1,2,0), (0,0,1,2)$: orbit of size $4$.
- $(1,1,1,0), (0,1,1,1), (1,0,1,1), (1,1,0,1)$: orbit of size $4$.

Total: $5$ orbits $\times$ $4$ each $= 20$ ✓. **$5$ orbits.** ✓ $\blacksquare$

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

*Last updated: 2026-04-19*
