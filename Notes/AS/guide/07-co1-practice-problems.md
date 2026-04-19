# 7. CO1 Practice Problems — Groups, Subgroups, Cyclic Groups, Permutations

> **Scope.** Problems for **CO1** (Lessons 0–8): binary operations, group axioms, subgroups, generators/Cayley diagrams, permutation groups, dihedral groups, cyclic groups, and order of elements.
>
> **Prerequisites:** [[01-operations-and-algebraic-structures]] through [[06-cyclic-groups-and-order]].

---

## 7.1 Part A — Binary Operations and Group Axioms

**Problem 1.** Let $*$ on $\mathbb{Z}$ be $a * b = a + b - 3$. Show $(\mathbb{Z}, *)$ is an abelian group; find its identity.

**Problem 2.** On $S = \{(a, b) \in \mathbb{Q}^2 : a \neq 0\}$, define $(a, b) * (c, d) = (ac, ad + b)$. Show $(S, *)$ is a (non-abelian) group.

**Problem 3.** Decide whether each is a group:
(a) $(\mathbb{Z}, -)$
(b) $(\mathbb{Q}, \cdot)$
(c) $(\mathbb{Z}_6^*, \cdot)$ where $\mathbb{Z}_6^* = \mathbb{Z}_6 \setminus \{0\}$
(d) $(\{f : \mathbb{R} \to \mathbb{R} \mid f \text{ bijective}\}, \circ)$

**Problem 4.** Let $G$ be a group and $a \in G$ with $a^3 = e$. If $a \neq e$, show $|a| = 3$.

**Problem 5.** Prove: a non-empty finite subset of a group $G$ closed under the operation is a subgroup.

### Solutions — Part A

**Solution 1.**
We verify the four group axioms for $(\mathbb{Z}, *)$ where $a * b = a + b - 3$.

*(i) Closure.* For $a, b \in \mathbb{Z}$, $a + b - 3 \in \mathbb{Z}$ since $\mathbb{Z}$ is closed under addition and subtraction. ✓

*(ii) Associativity.* For all $a, b, c \in \mathbb{Z}$:
$$(a * b) * c = (a + b - 3) * c = (a + b - 3) + c - 3 = a + b + c - 6.$$
$$a * (b * c) = a * (b + c - 3) = a + (b + c - 3) - 3 = a + b + c - 6.$$
So $(a*b)*c = a*(b*c)$. ✓

*(iii) Identity.* We seek $e \in \mathbb{Z}$ such that $a * e = a$ for all $a$:
$$a + e - 3 = a \iff e = 3.$$
Check both sides: $a * 3 = a + 3 - 3 = a$ and $3 * a = 3 + a - 3 = a$. So $e = 3$ is the two-sided identity. ✓

*(iv) Inverses.* Given $a \in \mathbb{Z}$, seek $a' \in \mathbb{Z}$ with $a * a' = 3$:
$$a + a' - 3 = 3 \iff a' = 6 - a.$$
Check: $a * (6 - a) = a + (6 - a) - 3 = 3$ and symmetrically $(6 - a) * a = 3$. Since $6 - a \in \mathbb{Z}$, every element has an inverse. ✓

*(v) Commutativity.* $a * b = a + b - 3 = b + a - 3 = b * a$. ✓

Hence $(\mathbb{Z}, *)$ is an abelian group with identity $e = 3$ and $a^{-1} = 6 - a$. $\blacksquare$

---

**Solution 2.**
Verify the group axioms for $S = \{(a, b) \in \mathbb{Q}^2 : a \neq 0\}$ under $(a, b) * (c, d) = (ac, ad + b)$.

*(i) Closure.* If $a, c \in \mathbb{Q}^\times$, then $ac \in \mathbb{Q}^\times$, and $ad + b \in \mathbb{Q}$. So the product lies in $S$. ✓

*(ii) Associativity.* Compute both bracketings of $(a,b) * (c,d) * (e,f)$:
$$((a,b) * (c,d)) * (e,f) = (ac, ad + b) * (e, f) = (ace, \; ace \cdot 0 + \ldots).$$

Let me be careful. $(ac, ad+b) * (e,f) = (ac \cdot e, \; ac \cdot f + (ad + b)) = (ace, \; acf + ad + b)$.

On the other side:
$$(a,b) * ((c,d) * (e,f)) = (a,b) * (ce, cf + d) = (a \cdot ce, \; a(cf + d) + b) = (ace, \; acf + ad + b).$$
Both equal $(ace, \; acf + ad + b)$, so $*$ is associative. ✓

*(iii) Identity.* We claim $e = (1, 0)$. Check:
$$(a, b) * (1, 0) = (a \cdot 1, \; a \cdot 0 + b) = (a, b), \quad (1, 0) * (a, b) = (1 \cdot a, \; 1 \cdot b + 0) = (a, b). \checkmark$$

*(iv) Inverses.* Given $(a, b)$ with $a \neq 0$, we seek $(x, y)$ with $(a, b) * (x, y) = (1, 0)$:
$$ax = 1, \quad ay + b = 0 \implies x = \tfrac{1}{a}, \; y = -\tfrac{b}{a}.$$
Since $a \in \mathbb{Q}^\times$, we have $\tfrac{1}{a}, -\tfrac{b}{a} \in \mathbb{Q}$ with $\tfrac{1}{a} \neq 0$, so $(1/a, -b/a) \in S$. Verify the left-inverse:
$$\left(\tfrac{1}{a}, -\tfrac{b}{a}\right) * (a, b) = \left(\tfrac{1}{a} \cdot a, \; \tfrac{1}{a} \cdot b + \left(-\tfrac{b}{a}\right)\right) = (1, 0). \checkmark$$
So $(a, b)^{-1} = (1/a, -b/a)$.

*(v) Non-abelian.* Exhibit a counterexample:
$$(2, 0) * (1, 1) = (2 \cdot 1, \; 2 \cdot 1 + 0) = (2, 2),$$
$$(1, 1) * (2, 0) = (1 \cdot 2, \; 1 \cdot 0 + 1) = (2, 1).$$
Since $(2, 2) \neq (2, 1)$, the operation is non-abelian.

Hence $(S, *)$ is a non-abelian group (it is, in fact, isomorphic to the affine group $\operatorname{Aff}(\mathbb{Q})$ via $(a, b) \leftrightarrow (x \mapsto ax + b)$). $\blacksquare$

---

**Solution 3.**

*(a) $(\mathbb{Z}, -)$.* Fails associativity: $(5 - 3) - 2 = 0$, but $5 - (3 - 2) = 4$. Since $0 \neq 4$, subtraction is not associative, so $(\mathbb{Z}, -)$ is not a group. **Not a group.**

*(b) $(\mathbb{Q}, \cdot)$.* The operation is associative and has identity $1$. However, $0 \in \mathbb{Q}$ has no multiplicative inverse: there is no $q \in \mathbb{Q}$ with $0 \cdot q = 1$. So the inverse axiom fails. **Not a group.** Note that the restriction $(\mathbb{Q}^\times, \cdot) = (\mathbb{Q} \setminus \{0\}, \cdot)$ is a group.

*(c) $(\mathbb{Z}_6^*, \cdot) = (\{1, 2, 3, 4, 5\}, \cdot \bmod 6)$.* Closure fails:
$$2 \cdot 3 = 6 \equiv 0 \pmod{6},$$
but $0 \notin \mathbb{Z}_6^*$. **Not a group.** (To get a group, one must use the units $U(6) = \{1, 5\}$, not all of $\mathbb{Z}_6 \setminus \{0\}$.)

*(d) $(\{f : \mathbb{R} \to \mathbb{R} : f \text{ bijective}\}, \circ)$.*
- *Closure:* composition of bijections is a bijection.
- *Associativity:* composition of functions is always associative.
- *Identity:* $\operatorname{id}_\mathbb{R}$ is bijective and $f \circ \operatorname{id} = \operatorname{id} \circ f = f$.
- *Inverses:* every bijection $f$ has a two-sided inverse $f^{-1}$ which is also a bijection.

All four axioms hold. **Yes, this is a group** — the symmetric group $\operatorname{Sym}(\mathbb{R})$ on the underlying set $\mathbb{R}$. $\blacksquare$

---

**Solution 4.**
Let $G$ be a group, $a \in G$ with $a^3 = e$ and $a \neq e$. We show $|a| = 3$.

By definition, $|a|$ is the smallest positive integer $n$ such that $a^n = e$. Since $a^3 = e$, the set $\{n > 0 : a^n = e\}$ is non-empty, so $|a|$ exists and is finite.

**Claim.** $|a|$ divides $3$.

*Proof.* Write $3 = q \cdot |a| + r$ with $0 \leq r < |a|$. Then
$$e = a^3 = a^{q|a| + r} = (a^{|a|})^q \cdot a^r = e^q \cdot a^r = a^r.$$
By minimality of $|a|$, $a^r = e$ with $0 \leq r < |a|$ forces $r = 0$. Hence $|a| \mid 3$.

Since $3$ is prime, its positive divisors are $1$ and $3$. So $|a| \in \{1, 3\}$.

Now $|a| = 1 \iff a^1 = e \iff a = e$, which is excluded by hypothesis. Therefore $|a| = 3$. $\blacksquare$

---

**Solution 5.** (**Finite Subgroup Test**)
Let $H$ be a non-empty finite subset of a group $G$ closed under the group operation of $G$. We show $H \leq G$ by verifying the subgroup axioms.

Since $H$ is non-empty, pick any $a \in H$. By closure, the sequence $a, a^2, a^3, \ldots$ lies entirely in $H$. Because $H$ is finite, by the pigeonhole principle there exist positive integers $i < j$ with $a^i = a^j$. Multiplying by $(a^i)^{-1}$ in $G$ (inverses exist in $G$ though not a priori in $H$): $a^{j-i} = e$. Let $k = j - i \geq 1$.

*Identity in $H$:* We have $a^k = e$. If $k = 1$, then $a = e \in H$. If $k > 1$, then $a^{k-1} \cdot a = a^k = e$, so $a \cdot a^{k-1} = e$ — but we also need $e \in H$ directly. Note $a^k = e$, and since $a \in H$ is closed under $*$, $a^2, a^3, \ldots, a^k = e$ all lie in $H$. So $e \in H$.

*Inverses in $H$:* For any $b \in H$, by the same argument there exists $m \geq 1$ with $b^m = e$. Then $b^{m-1} \in H$ (since $H$ is closed) and $b \cdot b^{m-1} = b^m = e$, so $b^{-1} = b^{m-1} \in H$.

*Closure:* Given by hypothesis.

Hence $H$ contains $e$, is closed under $*$, and contains the inverse of each of its elements — so $H \leq G$. $\blacksquare$

---

## 7.2 Part B — Subgroups

**Problem 6.** Find all subgroups of $\mathbb{Z}_{24}$.

**Problem 7.** Is $H = \left\{ \begin{pmatrix} a & 0 \\ c & d \end{pmatrix} : ad \neq 0 \right\}$ a subgroup of $GL_2(\mathbb{R})$?

**Problem 8.** Show that the center $Z(G) = \{z \in G : zg = gz \; \forall g \in G\}$ is a subgroup of $G$.

**Problem 9.** Show that the intersection of two subgroups is a subgroup.

**Problem 10.** In $D_4$, list all subgroups and draw the Hasse diagram.

### Solutions — Part B

**Solution 6.**
$\mathbb{Z}_{24}$ is cyclic of order $24$, generated by $1$. By the **fundamental theorem of cyclic groups** (see [[06-cyclic-groups-and-order]]), for every divisor $d$ of $24$ there exists exactly one subgroup of $\mathbb{Z}_{24}$ of order $d$, namely
$$\langle 24/d \rangle = \{0, 24/d, 2 \cdot 24/d, \ldots, (d - 1)\cdot 24/d\}.$$

The positive divisors of $24 = 2^3 \cdot 3$ are $\{1, 2, 3, 4, 6, 8, 12, 24\}$, giving **8 subgroups**:

| Order $d$ | Subgroup $\langle 24/d \rangle$ | Elements |
|---|---|---|
| $1$ | $\langle 0 \rangle$ | $\{0\}$ |
| $2$ | $\langle 12 \rangle$ | $\{0, 12\}$ |
| $3$ | $\langle 8 \rangle$ | $\{0, 8, 16\}$ |
| $4$ | $\langle 6 \rangle$ | $\{0, 6, 12, 18\}$ |
| $6$ | $\langle 4 \rangle$ | $\{0, 4, 8, 12, 16, 20\}$ |
| $8$ | $\langle 3 \rangle$ | $\{0, 3, 6, 9, 12, 15, 18, 21\}$ |
| $12$ | $\langle 2 \rangle$ | $\{0, 2, 4, \ldots, 22\}$ |
| $24$ | $\langle 1 \rangle$ | $\mathbb{Z}_{24}$ |

Containment: $\langle a \rangle \subseteq \langle b \rangle$ iff $b \mid a$ in $\mathbb{Z}$. The subgroup lattice mirrors the divisor lattice of $24$. $\blacksquare$

---

**Solution 7.**
$H$ is the set of *lower-triangular* invertible $2 \times 2$ real matrices. We check the subgroup criteria.

*Non-empty.* $I = \begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix} \in H$ (take $a = d = 1, c = 0$; $ad = 1 \neq 0$). ✓

*Closed under products.*
$$\begin{pmatrix} a & 0 \\ c & d \end{pmatrix} \begin{pmatrix} a' & 0 \\ c' & d' \end{pmatrix} = \begin{pmatrix} aa' + 0 & 0 + 0 \\ ca' + dc' & 0 + dd' \end{pmatrix} = \begin{pmatrix} aa' & 0 \\ ca' + dc' & dd' \end{pmatrix}.$$
This is lower-triangular, and $(aa')(dd') = (ad)(a'd') \neq 0$ since neither factor is zero. So the product lies in $H$. ✓

*Closed under inverses.* For $M = \begin{pmatrix} a & 0 \\ c & d \end{pmatrix}$ with $\det M = ad \neq 0$, the inverse is
$$M^{-1} = \frac{1}{ad}\begin{pmatrix} d & 0 \\ -c & a \end{pmatrix} = \begin{pmatrix} 1/a & 0 \\ -c/(ad) & 1/d \end{pmatrix}.$$
Verify: $M M^{-1} = \begin{pmatrix} a \cdot (1/a) & 0 \\ c(1/a) + d(-c/(ad)) & d(1/d) \end{pmatrix} = \begin{pmatrix} 1 & 0 \\ c/a - c/a & 1 \end{pmatrix} = I$. ✓

$M^{-1}$ is lower-triangular with $(1/a)(1/d) = 1/(ad) \neq 0$, so $M^{-1} \in H$. ✓

Hence **$H \leq GL_2(\mathbb{R})$**. $\blacksquare$

---

**Solution 8.**
Let $Z(G) = \{z \in G : zg = gz \text{ for all } g \in G\}$. We verify the subgroup axioms.

*Identity.* For all $g \in G$: $eg = g = ge$, so $e \in Z(G)$. ✓

*Closure.* Let $z_1, z_2 \in Z(G)$ and $g \in G$. Then
$$(z_1 z_2)g \stackrel{\text{assoc}}{=} z_1(z_2 g) \stackrel{z_2 \in Z}{=} z_1(g z_2) \stackrel{\text{assoc}}{=} (z_1 g) z_2 \stackrel{z_1 \in Z}{=} (g z_1) z_2 \stackrel{\text{assoc}}{=} g(z_1 z_2).$$
Hence $z_1 z_2 \in Z(G)$. ✓

*Inverses.* Let $z \in Z(G)$ and $g \in G$. We want $z^{-1} g = g z^{-1}$. Starting from $zg = gz$ (since $z \in Z(G)$), left-multiply by $z^{-1}$:
$$g = z^{-1} g z.$$
Right-multiply by $z^{-1}$:
$$g z^{-1} = z^{-1} g z \cdot z^{-1} = z^{-1} g.$$
So $z^{-1} g = g z^{-1}$, i.e., $z^{-1} \in Z(G)$. ✓

Thus $Z(G) \leq G$. $\blacksquare$

---

**Solution 9.**
Let $H, K \leq G$. We show $H \cap K \leq G$ via the **one-step subgroup test**: a non-empty subset $S \subseteq G$ is a subgroup iff $ab^{-1} \in S$ for all $a, b \in S$.

*Non-empty.* $e \in H$ and $e \in K$, so $e \in H \cap K$. ✓

*Closure under $ab^{-1}$.* Let $a, b \in H \cap K$. Then:
- $a, b \in H \implies ab^{-1} \in H$ (since $H \leq G$),
- $a, b \in K \implies ab^{-1} \in K$ (since $K \leq G$).

Hence $ab^{-1} \in H \cap K$. ✓

By the one-step test, $H \cap K \leq G$. $\blacksquare$

*Remark.* The same argument shows that an arbitrary intersection $\bigcap_{i \in I} H_i$ of subgroups is a subgroup.

---

**Solution 10.**
The dihedral group $D_4 = \langle r, s \mid r^4 = s^2 = e, srs = r^{-1}\rangle$ has 8 elements:
$$D_4 = \{e, r, r^2, r^3, s, rs, r^2 s, r^3 s\}.$$

**Step 1: List subgroups by order.**
By Lagrange, possible subgroup orders divide $8$: $\{1, 2, 4, 8\}$.

*Order 1:* $\{e\}$.

*Order 2:* Subgroups of the form $\{e, x\}$ where $x^2 = e$, $x \neq e$. The elements of order $2$ in $D_4$ are:
- $r^2$ (since $r$ has order $4$, $(r^2)^2 = r^4 = e$),
- Each of the four reflections: $s, rs, r^2 s, r^3 s$ (each satisfies $(r^k s)^2 = r^k s r^k s = r^k (s r^k s) = r^k r^{-k} = e$).

This gives five subgroups of order $2$: $\langle r^2\rangle, \langle s\rangle, \langle rs\rangle, \langle r^2 s\rangle, \langle r^3 s\rangle$.

*Order 4:* By Lagrange, such a subgroup has index $2$, hence is normal. Three order-$4$ subgroups:
- $\langle r \rangle = \{e, r, r^2, r^3\}$ — cyclic.
- $\{e, r^2, s, r^2 s\}$ — the reflection $s$, its conjugate $r^2 s$, and their product $r^2$. Klein four.
- $\{e, r^2, rs, r^3 s\}$ — analogous Klein four.

(One checks these are closed under multiplication: e.g., $s \cdot r^2 s = s(sr^{-2}) = r^{-2} = r^2$. ✓)

*Order 8:* $D_4$ itself.

**Total: $1 + 5 + 3 + 1 = 10$ subgroups.**

**Step 2: Hasse diagram.**
```
                          D_4
                       /   |   \
              ⟨r⟩  ⟨r²,s⟩  ⟨r²,rs⟩
              |    /   \    /   \
              |  ⟨s⟩  ⟨r²s⟩ ⟨rs⟩ ⟨r³s⟩
              |    \    \   /    /
              └──── ⟨r²⟩ ────────┘
                     |
                    {e}
```
Key containments:
- $\{e\} \subseteq \langle r^2 \rangle$ is contained in *every* subgroup of order $\geq 2$ except the four non-trivial reflection-only subgroups $\langle s\rangle, \langle rs\rangle, \langle r^2 s\rangle, \langle r^3 s\rangle$.
- $\langle r^2 \rangle \subseteq \langle r \rangle, \langle r^2, s\rangle, \langle r^2, rs\rangle$.
- Each reflection subgroup $\langle r^k s\rangle$ is contained in exactly one of the two Klein four subgroups (and in $D_4$).

The center $Z(D_4) = \langle r^2\rangle$ (one verifies: $r^2$ commutes with $r$ and with each reflection). $\blacksquare$

---

## 7.3 Part C — Permutations

**Problem 11.** Write $\sigma = \begin{pmatrix}1\,2\,3\,4\,5\,6\,7\\3\,6\,4\,7\,1\,5\,2\end{pmatrix}$ as a product of disjoint cycles.

**Problem 12.** Find the order of $(1\,4\,7)(2\,5\,8\,6)(3) \in S_8$.

**Problem 13.** Express $(1\,2\,3\,4\,5)$ as a product of transpositions; determine its parity.

**Problem 14.** Compute $(1\,2\,3)(1\,4\,5)(1\,6\,7)$ and identify its cycle structure.

**Problem 15.** In $S_5$, how many elements of order 6 are there?

### Solutions — Part C

**Solution 11.**
Follow the orbit of each element until it closes.

Starting at $1$:
$$1 \xrightarrow{\sigma} 3 \xrightarrow{\sigma} 4 \xrightarrow{\sigma} 7 \xrightarrow{\sigma} 2 \xrightarrow{\sigma} 6 \xrightarrow{\sigma} 5 \xrightarrow{\sigma} 1.$$
All of $\{1, 2, 3, 4, 5, 6, 7\}$ are covered, so $\sigma$ is a single $7$-cycle:
$$\sigma = (1\,3\,4\,7\,2\,6\,5).$$

*Verification.* In cycle notation, $(1\,3\,4\,7\,2\,6\,5)$ sends $1 \to 3, 3 \to 4, 4 \to 7, 7 \to 2, 2 \to 6, 6 \to 5, 5 \to 1$. This matches the two-line form:
- $\sigma(1) = 3$ ✓, $\sigma(2) = 6$ ✓, $\sigma(3) = 4$ ✓, $\sigma(4) = 7$ ✓, $\sigma(5) = 1$ ✓, $\sigma(6) = 5$ ✓, $\sigma(7) = 2$ ✓. $\blacksquare$

---

**Solution 12.**
Recall: the order of a product of disjoint cycles equals the lcm of the cycle lengths.

The given permutation $(1\,4\,7)(2\,5\,8\,6)(3)$ has disjoint cycles of lengths $3, 4, 1$. Therefore
$$|(1\,4\,7)(2\,5\,8\,6)(3)| = \operatorname{lcm}(3, 4, 1) = 12.$$

*Why?* If $\sigma = \sigma_1 \sigma_2 \cdots \sigma_k$ with disjoint cycles of lengths $\ell_1, \ldots, \ell_k$, then $\sigma^m = \sigma_1^m \sigma_2^m \cdots \sigma_k^m$ (disjointness ⟹ commutativity). Each cycle $\sigma_i$ has order $\ell_i$, so $\sigma^m = e$ iff $\sigma_i^m = e$ for all $i$, iff $\ell_i \mid m$ for all $i$, iff $\operatorname{lcm}(\ell_1, \ldots, \ell_k) \mid m$.

Hence $|(1\,4\,7)(2\,5\,8\,6)(3)| = \boxed{12}$. $\blacksquare$

---

**Solution 13.**
*Standard decomposition.* A $k$-cycle $(a_1\,a_2\,\ldots\,a_k)$ equals $(a_1\,a_k)(a_1\,a_{k-1})\cdots(a_1\,a_2)$, a product of $k - 1$ transpositions.

Apply to $(1\,2\,3\,4\,5)$:
$$(1\,2\,3\,4\,5) = (1\,5)(1\,4)(1\,3)(1\,2).$$

*Verification.* Apply right-to-left to $1$: $(1\,2)$ sends $1 \to 2$; $(1\,3)$ sends $2 \to 2$; $(1\,4)$ sends $2 \to 2$; $(1\,5)$ sends $2 \to 2$. So $1 \to 2$. ✓
To $2$: $(1\,2)$ sends $2 \to 1$; $(1\,3)$ sends $1 \to 3$; $(1\,4)$ sends $3 \to 3$; $(1\,5)$ sends $3 \to 3$. So $2 \to 3$. ✓
Similarly $3 \to 4, 4 \to 5, 5 \to 1$. ✓

**Parity.** The decomposition uses $4$ transpositions, an even number, so $(1\,2\,3\,4,5)$ is an **even permutation**.

*General fact.* A $k$-cycle is even iff $k$ is odd (since it is a product of $k - 1$ transpositions). Here $k = 5$ is odd, so the $5$-cycle is even. ✓ $\blacksquare$

---

**Solution 14.**
Compute $\tau = (1\,2\,3) \circ (1\,4\,5) \circ (1\,6\,7)$ by applying the cycles right-to-left to each element of $\{1, \ldots, 7\}$.

Write $\alpha = (1\,2\,3)$, $\beta = (1\,4\,5)$, $\gamma = (1\,6\,7)$, so $\tau = \alpha \beta \gamma$. For each $x$, compute $\gamma(x), \beta(\gamma(x)), \alpha(\beta(\gamma(x)))$:

| $x$ | $\gamma(x)$ | $\beta(\gamma(x))$ | $\alpha(\beta(\gamma(x))) = \tau(x)$ |
|---|---|---|---|
| $1$ | $6$ | $6$ | $6$ |
| $2$ | $2$ | $2$ | $3$ |
| $3$ | $3$ | $3$ | $1$ |
| $4$ | $4$ | $5$ | $5$ |
| $5$ | $5$ | $1$ | $2$ |
| $6$ | $7$ | $7$ | $7$ |
| $7$ | $1$ | $4$ | $4$ |

So $\tau$ sends $1 \to 6 \to 7 \to 4 \to 5 \to 2 \to 3 \to 1$, a **single 7-cycle**:
$$\tau = (1\,6\,7\,4\,5\,2\,3).$$

Cycle type: $(7)$, a $7$-cycle. Its order is $7$ and it is an even permutation (since $7 - 1 = 6$ is even). $\blacksquare$

---

**Solution 15.**
We count $\sigma \in S_5$ with $|\sigma| = 6$.

*Step 1: Which cycle types give order 6?* The order of a permutation equals the lcm of its cycle lengths. We need partitions $\lambda$ of $5$ with $\operatorname{lcm}(\lambda) = 6$.

The partitions of $5$ and their lcms:

| Partition | Cycle type | $\operatorname{lcm}$ |
|---|---|---|
| $(5)$ | $5$-cycle | $5$ |
| $(4, 1)$ | $4$-cycle | $4$ |
| $(3, 2)$ | $3$-cycle $\times$ $2$-cycle | **$6$** ✓ |
| $(3, 1, 1)$ | $3$-cycle | $3$ |
| $(2, 2, 1)$ | double transposition | $2$ |
| $(2, 1, 1, 1)$ | transposition | $2$ |
| $(1, 1, 1, 1, 1)$ | identity | $1$ |

Only cycle type $(3, 2)$ gives order $6$.

*Step 2: Count permutations of cycle type $(3, 2)$.*

**Method.** Choose $3$ of the $5$ symbols for the $3$-cycle: $\binom{5}{3} = 10$ ways. Arrange these $3$ symbols into a $3$-cycle: there are $(3-1)! = 2$ distinct $3$-cycles on $3$ symbols (e.g., $\{a, b, c\}$ gives $(a\,b\,c)$ and $(a\,c\,b)$). The remaining $2$ symbols must form a $2$-cycle: only $1$ way.

Total: $10 \cdot 2 \cdot 1 = 20$.

**Alternative (general formula).** For cycle type $1^{a_1} 2^{a_2} \cdots n^{a_n}$ in $S_n$, the number of permutations is
$$\frac{n!}{\prod_i (i^{a_i} a_i!)}.$$
For type $(3, 2)$ in $S_5$: $a_2 = 1, a_3 = 1$, other $a_i = 0$, so
$$\frac{5!}{2^1 \cdot 1! \cdot 3^1 \cdot 1!} = \frac{120}{6} = 20.$$

Hence **there are 20 elements of order 6 in $S_5$**. $\blacksquare$

---

## 7.4 Part D — Dihedral and Cyclic Groups

**Problem 16.** Write out the 8 elements of $D_4$ as permutations of $\{1, 2, 3, 4\}$ (vertices of the square). Verify closure with a Cayley table (full table not required — one sample row).

**Problem 17.** In $\mathbb{Z}_{30}$, find $|18|$.

**Problem 18.** List all generators of $\mathbb{Z}_{18}$.

**Problem 19.** Show that $D_n$ is not cyclic for $n \geq 2$.

**Problem 20.** In $D_6$, find the centralizer of $r$.

### Solutions — Part D

**Solution 16.**
Label vertices $1, 2, 3, 4$ of the square in counterclockwise order. The rotation $r$ sends $1 \to 2, 2 \to 3, 3 \to 4, 4 \to 1$, and we take $s$ to be the reflection across the diagonal through vertices $1$ and $3$ (so $s$ fixes $1, 3$ and swaps $2, 4$).

Compute each element:

| Element | As a permutation | Cycle notation |
|---|---|---|
| $e$ | $1\to 1, 2\to 2, 3\to 3, 4\to 4$ | $e$ |
| $r$ | $1\to 2, 2\to 3, 3\to 4, 4\to 1$ | $(1\,2\,3\,4)$ |
| $r^2$ | $1\to 3, 2\to 4, 3\to 1, 4\to 2$ | $(1\,3)(2\,4)$ |
| $r^3$ | $1\to 4, 2\to 1, 3\to 2, 4\to 3$ | $(1\,4\,3\,2)$ |
| $s$ | $1\to 1, 2\to 4, 3\to 3, 4\to 2$ | $(2\,4)$ |

For $rs$: apply $s$ first, then $r$.
$1 \xrightarrow{s} 1 \xrightarrow{r} 2$, $2 \xrightarrow{s} 4 \xrightarrow{r} 1$, $3 \xrightarrow{s} 3 \xrightarrow{r} 4$, $4 \xrightarrow{s} 2 \xrightarrow{r} 3$. So $rs = (1\,2)(3\,4)$.

For $r^2 s$: $1 \to 1 \to 3, 2 \to 4 \to 2, 3 \to 3 \to 1, 4 \to 2 \to 4$. So $r^2 s = (1\,3)$.

For $r^3 s$: $1 \to 1 \to 4, 2 \to 4 \to 3, 3 \to 3 \to 2, 4 \to 2 \to 1$. So $r^3 s = (1\,4)(2\,3)$.

**Sample Cayley row (row for $r$):**

| $\cdot$ | $e$ | $r$ | $r^2$ | $r^3$ | $s$ | $rs$ | $r^2 s$ | $r^3 s$ |
|---|---|---|---|---|---|---|---|---|
| $r \cdot$ | $r$ | $r^2$ | $r^3$ | $e$ | $rs$ | $r^2 s$ | $r^3 s$ | $s$ |

Closure is manifest: all entries lie in $D_4$. The relation $sr^k = r^{-k}s$ is used to normalize any product to the canonical form $r^i$ or $r^i s$.

*Check.* $r \cdot rs = r^2 s \in D_4$ ✓. $r \cdot r^3 s = r^4 s = s$ ✓. $\blacksquare$

---

**Solution 17.**
We compute $|18|$ in $\mathbb{Z}_{30}$ under addition.

**Theorem** ([[06-cyclic-groups-and-order]]). In $\mathbb{Z}_n$, the order of the element $k$ is $n/\gcd(n, k)$.

*Proof sketch.* The order $|k|$ is the smallest positive $m$ with $mk \equiv 0 \pmod n$, i.e., $n \mid mk$. Letting $d = \gcd(n, k)$, this is equivalent to $(n/d) \mid (k/d) m$. Since $\gcd(n/d, k/d) = 1$, we get $(n/d) \mid m$. The smallest such $m$ is $n/d$.

**Apply.** $\gcd(30, 18) = 6$, so
$$|18| = \frac{30}{\gcd(30, 18)} = \frac{30}{6} = 5.$$

*Verification.* $5 \cdot 18 = 90 = 3 \cdot 30 \equiv 0 \pmod{30}$ ✓. And for $m \in \{1, 2, 3, 4\}$: $18, 36 \equiv 6, 54 \equiv 24, 72 \equiv 12$ — none are $0$. So indeed $|18| = 5$. $\blacksquare$

---

**Solution 18.**
An element $k \in \mathbb{Z}_{18}$ is a generator iff $\langle k \rangle = \mathbb{Z}_{18}$ iff $|k| = 18$. By the order formula, $|k| = 18/\gcd(18, k)$, so $|k| = 18$ iff $\gcd(18, k) = 1$.

The integers in $\{1, 2, \ldots, 17\}$ coprime to $18 = 2 \cdot 3^2$ are exactly those not divisible by $2$ or $3$:
$$\{1, 5, 7, 11, 13, 17\}.$$

*Count check.* $\varphi(18) = \varphi(2)\varphi(9) = 1 \cdot 6 = 6$, matching the list size.

**Generators of $\mathbb{Z}_{18}$:** $\{1, 5, 7, 11, 13, 17\}$. $\blacksquare$

---

**Solution 19.**
Recall $D_n = \langle r, s \mid r^n = s^2 = e, srs = r^{-1}\rangle$ has $2n$ elements.

**Case $n \geq 3$.** In $D_n$, $r$ has order $n \geq 3$ and $s$ has order $2$, and they satisfy $sr = r^{-1}s \neq rs$ (since $r^{-1} \neq r$ when $n \geq 3$). So $D_n$ is non-abelian.

**Every cyclic group is abelian** (since $a^i a^j = a^{i+j} = a^j a^i$). Hence $D_n$ is not cyclic.

**Case $n = 2$.** Here $D_2 = \{e, r, s, rs\}$ with $r^2 = s^2 = e$ and $rs = sr$ (one checks $sr = r^{-1}s = rs$ since $r = r^{-1}$). So $D_2$ is abelian. However, every non-identity element has order $2$:
$$|r| = |s| = |rs| = 2.$$
A cyclic group of order $4$ would need an element of order $4$ (namely a generator). Since $D_2$ has no such element, $D_2$ is not cyclic. In fact, $D_2 \cong \mathbb{Z}_2 \times \mathbb{Z}_2 = V_4$, the Klein four-group.

In both cases, $D_n$ is not cyclic for $n \geq 2$. $\blacksquare$

---

**Solution 20.**
We find $C_{D_6}(r) = \{g \in D_6 : gr = rg\}$.

Write $D_6 = \{e, r, r^2, r^3, r^4, r^5, s, rs, r^2 s, r^3 s, r^4 s, r^5 s\}$ with $|r| = 6$, $|s| = 2$, $sr = r^{-1}s = r^5 s$.

**Step 1: Rotations commute with $r$.** For any $k$, $r^k r = r^{k+1} = r r^k$, so $r^k \in C_{D_6}(r)$. This gives the $6$ rotations $\{e, r, r^2, r^3, r^4, r^5\} = \langle r \rangle$.

**Step 2: Do any reflections commute with $r$?** A general reflection has the form $r^k s$. Compute
$$(r^k s) r = r^k (sr) = r^k (r^{-1} s) = r^{k - 1} s.$$
$$r (r^k s) = r^{k+1} s.$$
So $(r^k s) r = r(r^k s)$ iff $r^{k-1} s = r^{k+1} s$ iff $r^{-1} = r$ iff $r^2 = e$. But $|r| = 6$ in $D_6$, so $r^2 \neq e$. Hence **no reflection commutes with $r$**.

**Conclusion.** $C_{D_6}(r) = \langle r \rangle$, of order $6$.

*Remark.* More generally, in $D_n$ with $n \geq 3$, $C_{D_n}(r^k) = \langle r \rangle$ whenever $r^k \neq e$ and $r^k \neq r^{-k}$ (i.e., $r^{2k} \neq e$), which is the generic case. $\blacksquare$

---

## 7.5 Part E — Mixed / Conceptual

**Problem 21.** Show: in any group, $(ab)^{-1} = b^{-1}a^{-1}$.

**Problem 22.** If $a^2 = b^2 = (ab)^2 = e$ in a group $G$, prove $ab = ba$.

**Problem 23.** Is $\mathbb{Q}^*$ (nonzero rationals under multiplication) cyclic? Justify.

**Problem 24.** Show: if $H_1 \subseteq H_2 \subseteq \cdots$ is an ascending chain of subgroups of $G$, then $\bigcup_i H_i \leq G$.

**Problem 25.** Find all finite subgroups of $(\mathbb{C}^*, \cdot)$ (nonzero complex numbers under multiplication).

### Solutions — Part E

**Solution 21.**
We show $(ab)^{-1} = b^{-1} a^{-1}$ by verifying the defining property of an inverse.

By associativity and the inverse axioms:
$$(ab)(b^{-1}a^{-1}) = a(b b^{-1})a^{-1} = a \cdot e \cdot a^{-1} = a a^{-1} = e.$$
Symmetrically:
$$(b^{-1}a^{-1})(ab) = b^{-1}(a^{-1} a)b = b^{-1} \cdot e \cdot b = b^{-1} b = e.$$
So $b^{-1} a^{-1}$ is a two-sided inverse of $ab$. Since inverses in a group are **unique** (suppose $xy = yx = e$ and $xz = zx = e$; then $y = ey = (zx)y = z(xy) = ze = z$), we conclude
$$(ab)^{-1} = b^{-1} a^{-1}. \qquad \blacksquare$$

*Remark.* By induction, $(a_1 a_2 \cdots a_n)^{-1} = a_n^{-1} \cdots a_2^{-1} a_1^{-1}$ — reversal of order.

---

**Solution 22.**
Given $a^2 = b^2 = (ab)^2 = e$, we show $ab = ba$.

Since $a^2 = e$, we have $a^{-1} = a$. Similarly $b^{-1} = b$.

From $(ab)^2 = e$: $(ab)(ab) = e$, so $ab = (ab)^{-1}$. But by Problem 21,
$$(ab)^{-1} = b^{-1} a^{-1} = ba.$$
Hence $ab = ba$. $\blacksquare$

*Remark.* This shows any group in which every non-identity element has order $\leq 2$ is abelian — in fact such a group is an elementary abelian $2$-group, isomorphic to $(\mathbb{Z}/2\mathbb{Z})^k$ for some $k$.

---

**Solution 23.**
We show $(\mathbb{Q}^*, \cdot)$ is **not cyclic**.

Suppose for contradiction $\mathbb{Q}^* = \langle q \rangle$ for some $q \in \mathbb{Q}^*$. Write $q = m/n$ in lowest terms (so $\gcd(m, n) = 1, n > 0$).

Choose a prime $p$ such that $p \nmid m$ and $p \nmid n$ (there are infinitely many primes, but only finitely many divisors of $m$ and $n$, so such a $p$ exists). Then $p \in \mathbb{Q}^*$, so $p = q^k$ for some integer $k$.

- If $k > 0$: $p = (m/n)^k = m^k/n^k$, so $p \cdot n^k = m^k$. Hence $p \mid m^k$, and by primality $p \mid m$ — contradicting our choice of $p$.
- If $k < 0$: let $j = -k > 0$. Then $p = n^j/m^j$, so $p \cdot m^j = n^j$, forcing $p \mid n^j$ and $p \mid n$ — again a contradiction.
- If $k = 0$: $p = q^0 = 1$, but $p \geq 2$ — contradiction.

All cases lead to contradiction, so $\mathbb{Q}^*$ is not cyclic. $\blacksquare$

*Remark.* By unique prime factorization, $\mathbb{Q}^* \cong \{\pm 1\} \times \bigoplus_{p \text{ prime}} \mathbb{Z}$, a free abelian group of infinite rank (times $\mathbb{Z}/2$). This is manifestly not cyclic.

---

**Solution 24.**
Let $H = \bigcup_{i \geq 1} H_i$ where $H_1 \subseteq H_2 \subseteq \cdots$ is an ascending chain of subgroups of $G$. Apply the one-step subgroup test.

*Non-empty.* $e \in H_1 \subseteq H$. ✓

*Closure under $ab^{-1}$.* Let $a, b \in H$. By definition of union, $a \in H_i$ and $b \in H_j$ for some indices $i, j$. Let $k = \max(i, j)$. Since the chain is ascending, $H_i \subseteq H_k$ and $H_j \subseteq H_k$, so $a, b \in H_k$. Since $H_k \leq G$, we have $ab^{-1} \in H_k \subseteq H$. ✓

By the one-step subgroup test, $H \leq G$. $\blacksquare$

**Remark on the chain condition.** The hypothesis $H_1 \subseteq H_2 \subseteq \cdots$ is essential. Without it, the union of two subgroups may fail to be a subgroup: e.g., in $\mathbb{Z}$, $2\mathbb{Z} \cup 3\mathbb{Z}$ contains $2$ and $3$ but not $2 + 3 = 5$.

---

**Solution 25.**
**Claim.** The finite subgroups of $(\mathbb{C}^*, \cdot)$ are exactly the groups of $n$-th roots of unity,
$$\mu_n = \{z \in \mathbb{C}^* : z^n = 1\},$$
for each positive integer $n$. Moreover, $\mu_n$ is cyclic of order $n$, generated by $e^{2\pi i/n}$.

*Proof.*

**Step 1: $\mu_n$ is a subgroup.** Let $\zeta = e^{2\pi i/n}$. Then $\zeta^n = 1$. The powers $\{1, \zeta, \zeta^2, \ldots, \zeta^{n-1}\}$ are $n$ distinct roots of $z^n - 1 = 0$. Since a polynomial of degree $n$ over $\mathbb{C}$ has at most $n$ roots, these are all the roots, and $\mu_n = \langle \zeta \rangle$ is cyclic of order $n$.

**Step 2: Every finite subgroup is some $\mu_n$.** Let $H \leq \mathbb{C}^*$ with $|H| = n$ finite.

By **Lagrange's theorem** ([[09-cosets-and-lagranges-theorem]]), every $z \in H$ has order dividing $|H| = n$, hence $z^n = 1$. So $H \subseteq \mu_n$.

Both $H$ and $\mu_n$ have exactly $n$ elements (Step 1), so $H = \mu_n$.

**Conclusion.** The finite subgroups of $\mathbb{C}^*$ are precisely $\{\mu_n : n \geq 1\}$, and each $\mu_n \cong \mathbb{Z}/n\mathbb{Z}$. $\blacksquare$

*Remark.* This result is foundational for the theory of cyclotomic fields $\mathbb{Q}(\zeta_n)$ and roots of unity in number theory.

---

## 7.6 Cross-References

**Files covered:**
- [[01-operations-and-algebraic-structures]]
- [[02-symmetries-of-the-plane]]
- [[03-groups-definition-and-examples]]
- [[04-subgroups-generators-cayley-diagrams]]
- [[05-permutation-and-dihedral-groups]]
- [[06-cyclic-groups-and-order]]

**Next:** [[08-equivalence-relations-and-partitions]] — start of CO2.
