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

**Solution 1.** Associative: $(a+b-3)+c-3 = a+b+c-6 = a+(b+c-3)-3$ ✓. Identity: $a + e - 3 = a \Rightarrow e = 3$. Inverse: $a + a' - 3 = 3 \Rightarrow a' = 6 - a$. Commutative ✓. $\blacksquare$

**Solution 2.** Closure: $ac \neq 0$ ✓. Associativity: $((a,b)*(c,d))*(e,f) = (ac, ad+b)*(e,f) = (ace, acf + ad + b)$; $(a,b)*((c,d)*(e,f)) = (a,b)*(ce, cf+d) = (ace, a(cf+d) + b) = (ace, acf + ad + b)$ ✓. Identity $(1, 0)$: $(a,b)*(1,0) = (a, b)$ and $(1,0)*(a,b) = (a, b)$ ✓. Inverse of $(a,b)$: need $(a,b)*(x,y) = (1,0)$: $ax = 1, ay + b = 0$, so $x = 1/a, y = -b/a$, i.e., $(a,b)^{-1} = (1/a, -b/a)$. Non-abelian: $(2, 0)*(1, 1) = (2, 2)$ but $(1, 1)*(2, 0) = (2, 1)$. $\blacksquare$

**Solution 3.**
(a) No (not associative: $(5-3)-2 = 0 \neq 4 = 5-(3-2)$).
(b) No ($0 \in \mathbb{Q}$ has no inverse). But $(\mathbb{Q} \setminus \{0\}, \cdot)$ is a group.
(c) No: $\mathbb{Z}_6^* = \{1, 2, 3, 4, 5\}$ but $2 \cdot 3 = 0 \notin \mathbb{Z}_6^*$. Not closed. Groups would require $U(6) = \{1, 5\}$.
(d) Yes — the symmetric group on $\mathbb{R}$. $\blacksquare$

**Solution 4.** $|a| \mid 3$, so $|a| \in \{1, 3\}$. $|a| = 1 \iff a = e$; excluded. So $|a| = 3$. $\blacksquare$

**Solution 5.** See [[04-subgroups-generators-cayley-diagrams]] Theorem 4.3 — finite subgroup test. $\blacksquare$

---

## 7.2 Part B — Subgroups

**Problem 6.** Find all subgroups of $\mathbb{Z}_{24}$.

**Problem 7.** Is $H = \{[a, b] \in GL_2(\mathbb{R}) : b = 0\}$ a subgroup of $GL_2(\mathbb{R})$?

**Problem 8.** Show that the center $Z(G) = \{z \in G : zg = gz \; \forall g\}$ is a subgroup of $G$.

**Problem 9.** Show that the intersection of two subgroups is a subgroup.

**Problem 10.** In $D_4$, list all subgroups and draw the Hasse diagram.

### Solutions — Part B

**Solution 6.** Divisors of 24: 1, 2, 3, 4, 6, 8, 12, 24. Subgroups: $\{0\}$, $\langle 12 \rangle, \langle 8 \rangle, \langle 6 \rangle, \langle 4 \rangle, \langle 3 \rangle, \langle 2 \rangle, \mathbb{Z}_{24}$ — 8 subgroups. $\blacksquare$

**Solution 7.** Interpret as upper-triangular with off-diagonal 0: $\begin{pmatrix} a & 0 \\ c & d \end{pmatrix}$ with $ad \neq 0$. Closed? $\begin{pmatrix} a & 0 \\ c & d \end{pmatrix}\begin{pmatrix} a' & 0 \\ c' & d' \end{pmatrix} = \begin{pmatrix} aa' & 0 \\ ca' + dc' & dd' \end{pmatrix}$ — yes, same form. Inverse: $\begin{pmatrix} a & 0 \\ c & d \end{pmatrix}^{-1} = \begin{pmatrix} 1/a & 0 \\ -c/(ad) & 1/d \end{pmatrix}$, still same form. Subgroup. ✓ $\blacksquare$

**Solution 8.** $e \in Z(G)$ (commutes with everything). If $z_1, z_2 \in Z(G)$: $(z_1 z_2) g = z_1 (z_2 g) = z_1 (g z_2) = (z_1 g) z_2 = (g z_1) z_2 = g(z_1 z_2)$, so $z_1 z_2 \in Z(G)$. If $z \in Z(G)$: $z^{-1} g = z^{-1} (z g z^{-1}) = g z^{-1}$, so $z^{-1} \in Z(G)$. $\blacksquare$

**Solution 9.** Let $H, K \leq G$. $e \in H \cap K$ ✓. For $a, b \in H \cap K$: $a, b \in H \Rightarrow ab^{-1} \in H$; similarly $\in K$. So $ab^{-1} \in H \cap K$. $\blacksquare$

**Solution 10.** $D_4 = \{1, r, r^2, r^3, s, sr, sr^2, sr^3\}$, $|D_4| = 8$. Subgroups (from [[02-symmetries-of-the-plane]] Problem 7):
- Order 1: $\{1\}$
- Order 2: $\{1, r^2\}, \{1, s\}, \{1, sr\}, \{1, sr^2\}, \{1, sr^3\}$
- Order 4: $\{1, r, r^2, r^3\}, \{1, r^2, s, sr^2\}, \{1, r^2, sr, sr^3\}$
- Order 8: $D_4$

Hasse diagram:
```
                    D_4
                  /  |  \
         ⟨r⟩  ⟨r²,s⟩  ⟨r²,sr⟩
         |    /  |  \   /  |  \
         |   ⟨s⟩ ⟨sr²⟩ ⟨sr⟩ ⟨sr³⟩
         |    \  |  /   \  |  /
         ⟨r²⟩—————————————————
              \    |    /
                 {1}
```
$\{1, r^2\}$ is contained in all three order-4 subgroups. The center $Z(D_4) = \{1, r^2\}$. $\blacksquare$

---

## 7.3 Part C — Permutations

**Problem 11.** Write $\sigma = \begin{pmatrix}1\,2\,3\,4\,5\,6\,7\\3\,6\,4\,7\,1\,5\,2\end{pmatrix}$ as a product of disjoint cycles.

**Problem 12.** Find the order of $(1\,4\,7)(2\,5\,8\,6)(3) \in S_8$.

**Problem 13.** Express $(1\,2\,3\,4\,5)$ as a product of transpositions; determine its parity.

**Problem 14.** Compute $(1\,2\,3)(1\,4\,5)(1\,6\,7)$ and identify its cycle structure.

**Problem 15.** In $S_5$, how many elements of order 6 are there?

### Solutions — Part C

**Solution 11.** Trace: $1 \to 3 \to 4 \to 7 \to 2 \to 6 \to 5 \to 1$. Single 7-cycle: $(1\,3\,4\,7\,2\,6\,5)$. $\blacksquare$

**Solution 12.** $\text{lcm}(3, 4, 1) = 12$. $\blacksquare$

**Solution 13.** $(1\,2\,3\,4\,5) = (1\,5)(1\,4)(1\,3)(1\,2)$. 4 transpositions, even. $\blacksquare$

**Solution 14.** Apply right to left. $1 \to 6, 6 \to 7, 7 \to 7$. Hmm let me go carefully. Read $(1\,2\,3)(1\,4\,5)(1\,6\,7)$: this is $\alpha \circ \beta \circ \gamma$ where $\gamma = (1\,6\,7)$, $\beta = (1\,4\,5)$, $\alpha = (1\,2\,3)$. Apply to each element:
- $1 \to \gamma(1) = 6 \to \beta(6) = 6 \to \alpha(6) = 6$. $1 \to 6$.
- $2 \to 2 \to 2 \to 3$. $2 \to 3$.
- $3 \to 3 \to 3 \to 1$. $3 \to 1$.
- $4 \to 4 \to 5 \to 5$. $4 \to 5$.
- $5 \to 5 \to 1 \to 2$. $5 \to 2$.
- $6 \to 7 \to 7 \to 7$. $6 \to 7$.
- $7 \to 1 \to 4 \to 4$. $7 \to 4$.

Permutation: $1\to6, 6\to7, 7\to4, 4\to5, 5\to2, 2\to3, 3\to1$. Single 7-cycle: $(1\,6\,7\,4\,5\,2\,3)$. $\blacksquare$

**Solution 15.** Order 6 in $S_5$ requires $\text{lcm}$ of cycle lengths $= 6$. Cycle types of partitions of 5 giving lcm 6: only $3 + 2 = 5$, type $(3, 2)$. Count: choose 3-cycle from 5 elements: $\binom{5}{3} \cdot 2 = 20$ (2 ways to arrange a 3-cycle); then 2-cycle is forced from the remaining 2 elements: 1 way. Total: 20 elements of order 6. $\blacksquare$

---

## 7.4 Part D — Dihedral and Cyclic Groups

**Problem 16.** Write out the 8 elements of $D_4$ as permutations of $\{1, 2, 3, 4\}$ (vertices of the square). Verify closure with a Cayley table (full table not required — one sample row).

**Problem 17.** In $\mathbb{Z}_{30}$, find $|18|$.

**Problem 18.** List all generators of $\mathbb{Z}_{18}$.

**Problem 19.** Show that $D_n$ is not cyclic for $n \geq 2$.

**Problem 20.** In $D_6$, find the centralizer of $r$.

### Solutions — Part D

**Solution 16.** Labeling vertices of the square 1, 2, 3, 4 in cyclic order:
- $e$ = identity
- $r = (1\,2\,3\,4)$
- $r^2 = (1\,3)(2\,4)$
- $r^3 = (1\,4\,3\,2)$
- $s = (2\,4)$ (reflection across vertex 1, vertex 3 axis)
- $rs = r \cdot (2\,4)$: applied right-to-left, $1 \to 1 \to 2, 2 \to 4 \to 1, 3 \to 3 \to 4, 4 \to 2 \to 3$. So $rs = (1\,2)(3\,4)$.
- $r^2 s$: $1 \to 1 \to 3, 2 \to 4 \to 2, 3 \to 3 \to 1, 4 \to 2 \to 4$. $r^2 s = (1\,3)$.
- $r^3 s$: $1 \to 1 \to 4, 2 \to 4 \to 3, 3 \to 3 \to 2, 4 \to 2 \to 1$. $r^3 s = (1\,4)(2\,3)$.

Product sample: $r \cdot s = rs = (1\,2)(3\,4)$ ✓ as listed. $\blacksquare$

**Solution 17.** $|18| = 30/\gcd(30, 18) = 30/6 = 5$. $\blacksquare$

**Solution 18.** Generators of $\mathbb{Z}_{18}$: $\{k : \gcd(k, 18) = 1, 1 \leq k < 18\} = \{1, 5, 7, 11, 13, 17\}$. $\varphi(18) = 6$. $\blacksquare$

**Solution 19.** $D_n$ is non-abelian for $n \geq 3$ (Problem 6 of File 03). Cyclic groups are abelian, so $D_n$ is not cyclic. For $n = 2$: $D_2 = V_4$ (Klein four), abelian but not cyclic (no element of order 4). $\blacksquare$

**Solution 20.** $C_{D_6}(r) = \{g \in D_6 : gr = rg\}$. $r$ commutes with all rotations: $\langle r \rangle$ = 6 elements. Does $r$ commute with any reflection? If $sr = rs$, then $r^{-1}sr = s$, i.e., $s \in$ centralizer of $r$. But $srs^{-1} = r^{-1}$, so $sr = r^{-1}s \neq rs$ unless $r = r^{-1}$, i.e., $r^2 = e$. In $D_6$, $r$ has order 6, so $r^2 \neq e$. Hence no reflection commutes with $r$. Centralizer = $\langle r \rangle$, order 6. $\blacksquare$

---

## 7.5 Part E — Mixed / Conceptual

**Problem 21.** Show: in any group, $(ab)^{-1} = b^{-1}a^{-1}$.

**Problem 22.** If $a^2 = b^2 = (ab)^2 = e$ in a group $G$, prove $ab = ba$.

**Problem 23.** Is $\mathbb{Q}^*$ (nonzero rationals under multiplication) cyclic? Justify.

**Problem 24.** Show: if $H_1, H_2, \ldots$ are subgroups of $G$ with $H_1 \subseteq H_2 \subseteq \cdots$, then $\bigcup H_i \leq G$.

**Problem 25.** Find all finite subgroups of $(\mathbb{C}^*, \cdot)$ (nonzero complex numbers under multiplication).

### Solutions — Part E

**Solution 21.** $(ab)(b^{-1}a^{-1}) = a(bb^{-1})a^{-1} = aea^{-1} = aa^{-1} = e$. Similarly $(b^{-1}a^{-1})(ab) = e$. So $b^{-1}a^{-1}$ is the two-sided inverse. $\blacksquare$

**Solution 22.** $(ab)^2 = e$: $abab = e \Rightarrow ab = (ab)^{-1} = b^{-1}a^{-1} = ba$ (since $b = b^{-1}$, $a = a^{-1}$). $\blacksquare$

**Solution 23.** No. Suppose $\mathbb{Q}^* = \langle q \rangle$ with $q = m/n$ in lowest terms. Consider prime $p$ not dividing $mn$: then $p = q^k$ has $p \cdot n^k = m^k$, forcing $p | m^k$ so $p | m$ — contradiction. $\blacksquare$

**Solution 24.** $e \in H_1 \subseteq \bigcup H_i$. For $a, b \in \bigcup H_i$: $a \in H_i$, $b \in H_j$, WLOG $i \leq j$, so $a, b \in H_j$, hence $ab^{-1} \in H_j \subseteq \bigcup$. Subgroup by one-step test. (Crucial: chain condition ensures $H_i \cup H_j$ is a subgroup.) $\blacksquare$

**Solution 25.** Every finite subgroup of $\mathbb{C}^*$ consists of roots of unity: $\mu_n = \{z \in \mathbb{C} : z^n = 1\}$. These are cyclic: $\mu_n = \langle e^{2\pi i/n} \rangle \cong \mathbb{Z}_n$. So the finite subgroups are exactly $\mu_n$ for each $n \geq 1$.

*Proof.* Let $H \leq \mathbb{C}^*$ finite, $|H| = n$. By Lagrange ([[09-cosets-and-lagranges-theorem]]) every $z \in H$ has $z^n = 1$, so $H \subseteq \mu_n$. Both have $n$ elements, so $H = \mu_n$. $\blacksquare$

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
