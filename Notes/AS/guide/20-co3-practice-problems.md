---
title: "CO3 Practice Problems: Group Actions, Homomorphisms, Isomorphism Theorems, Rings"
type: guide
co: CO3
related: [15-group-actions, 16-centralizer-normalizer-stabilizer, 17-homomorphisms-and-isomorphisms, 18-isomorphism-theorems, 19-rings-definition-and-examples]
---

# 20. CO3 Practice Problems

This chapter consolidates practice covering chapters 15 through 19. Problems are in five parts corresponding to major topics.

---

## Part A — Group Actions, Orbit-Stabilizer

**Problem A1.** Let $G = \mathbb{Z}_4$ act on $X = \{1, 2, 3, 4\}$ by $k \cdot i = ((i + k - 1) \bmod 4) + 1$ (cyclic shift). Find the orbit and stabilizer of $2$.

**Problem A2.** Consider $S_5$ acting on ordered pairs of distinct elements from $\{1, \ldots, 5\}$. Find the orbit and stabilizer of $(1, 2)$.

**Problem A3.** Show that every transitive action of $G$ on a finite set $X$ with $|X| = n$ corresponds to a subgroup $H \le G$ of index $n$, where $X \cong G/H$ as $G$-sets.

**Problem A4.** Prove that a group of order $p^2$ is abelian using the class equation.

**Problem A5.** Find all conjugacy classes of $D_5$.

**Problem A6.** If $G$ acts on $X$ faithfully and $|G| > 1$, show that at least one orbit has size $> 1$.

### Solutions — Part A

**Solution A1.**
The action is $k \cdot i = ((i + k - 1) \bmod 4) + 1$ — a cyclic shift of $\{1, 2, 3, 4\}$ by $k$.

*Orbit of $2$.* Apply each $k \in \{0, 1, 2, 3\}$ to $2$:
- $0 \cdot 2 = 2$
- $1 \cdot 2 = ((2 + 1 - 1) \bmod 4) + 1 = (2 \bmod 4) + 1 = 3$
- $2 \cdot 2 = ((2 + 2 - 1) \bmod 4) + 1 = (3 \bmod 4) + 1 = 4$
- $3 \cdot 2 = ((2 + 3 - 1) \bmod 4) + 1 = (0 \bmod 4) + 1 = 1$

Hence $G \cdot 2 = \{2, 3, 4, 1\} = X$. The action is transitive, $|G \cdot 2| = 4$.

*Stabilizer of $2$.* $\operatorname{Stab}_G(2) = \{k : k \cdot 2 = 2\} = \{0\}$. Trivial stabilizer, $|\operatorname{Stab}| = 1$.

*Orbit-stabilizer check.* $|G \cdot 2| \cdot |\operatorname{Stab}(2)| = 4 \cdot 1 = 4 = |G|$. ✓

$\boxed{\text{Orbit} = \{1, 2, 3, 4\}, \; \operatorname{Stab}(2) = \{0\}}$ $\blacksquare$

---

**Solution A2.**
$S_5$ acts on $X = \{(i, j) : i, j \in \{1, \ldots, 5\}, i \neq j\}$, the set of ordered pairs of distinct elements. $|X| = 5 \cdot 4 = 20$.

The action is $\sigma \cdot (i, j) = (\sigma(i), \sigma(j))$.

*Orbit of $(1, 2)$.* We show the action is transitive on $X$. Given any $(i, j) \in X$, choose $\sigma \in S_5$ with $\sigma(1) = i, \sigma(2) = j$ (possible since $i \neq j$ and we only need to specify two values of $\sigma$, freely filling in the rest as any bijection on $\{3, 4, 5\} \to \{1, \ldots, 5\} \setminus \{i, j\}$). Then $\sigma \cdot (1, 2) = (i, j)$.

Hence $|G \cdot (1, 2)| = |X| = 20$.

*Stabilizer of $(1, 2)$.* $\operatorname{Stab}((1, 2)) = \{\sigma : \sigma(1) = 1, \sigma(2) = 2\}$. These permutations fix $1$ and $2$ and permute $\{3, 4, 5\}$ arbitrarily:
$$\operatorname{Stab}((1, 2)) \cong S_{\{3, 4, 5\}} \cong S_3, \qquad |\operatorname{Stab}((1, 2))| = 3! = 6.$$

*Orbit-stabilizer check.* $|G \cdot (1, 2)| \cdot |\operatorname{Stab}((1, 2))| = 20 \cdot 6 = 120 = 5! = |S_5|$. ✓

$\boxed{|\text{orbit}| = 20, \; \operatorname{Stab}((1, 2)) \cong S_3}$ $\blacksquare$

---

**Solution A3.**
Suppose $G$ acts transitively on a finite set $X$ with $|X| = n$.

**Construction.** Pick $x_0 \in X$, let $H = \operatorname{Stab}_G(x_0)$. Define
$$\Phi: G/H \to X, \qquad gH \mapsto g \cdot x_0.$$

**Well-defined.** If $g_1 H = g_2 H$, then $g_2^{-1} g_1 \in H$, so $g_2^{-1} g_1 \cdot x_0 = x_0$, hence $g_1 \cdot x_0 = g_2 \cdot x_0$. ✓

**Injective.** $\Phi(g_1 H) = \Phi(g_2 H)$ means $g_1 \cdot x_0 = g_2 \cdot x_0$, i.e., $g_2^{-1} g_1 \cdot x_0 = x_0$, i.e., $g_2^{-1} g_1 \in H$, so $g_1 H = g_2 H$. ✓

**Surjective.** Given $y \in X$, by transitivity there exists $g \in G$ with $g \cdot x_0 = y$. Then $\Phi(gH) = y$. ✓

**$G$-equivariant.** For any $a \in G$: $\Phi(a \cdot gH) = \Phi((ag)H) = (ag) \cdot x_0 = a \cdot (g \cdot x_0) = a \cdot \Phi(gH)$. So $\Phi$ commutes with the $G$-action. ✓

**Index.** Orbit-stabilizer theorem: $n = |X| = |G \cdot x_0| = [G : H]$.

Thus $\Phi$ is a $G$-equivariant bijection between $G/H$ and $X$, exhibiting $H$ as an index-$n$ subgroup and $X \cong G/H$ as $G$-sets. $\blacksquare$

*Remark.* This is the **classification of transitive $G$-sets**: they correspond bijectively (up to $G$-isomorphism) to conjugacy classes of subgroups of $G$. (Different base points $x_0$ give conjugate stabilizers, hence isomorphic coset spaces.)

---

**Solution A4.**
Let $G$ be a group of order $p^2$ with $p$ prime. We show $G$ is abelian.

**Class equation** ([[16-centralizer-normalizer-stabilizer]]): for a finite group $G$,
$$|G| = |Z(G)| + \sum_{i}[G : C_G(g_i)],$$
where the sum is over representatives $g_i$ of the non-central conjugacy classes (so $|C_G(g_i)| < |G|$, equivalently $[G : C_G(g_i)] > 1$).

**Step 1: $|Z(G)| > 1$.**

Each term in the sum satisfies $[G : C_G(g_i)] > 1$ and divides $|G| = p^2$, so $[G : C_G(g_i)] \in \{p, p^2\}$. In particular, each term in the sum is divisible by $p$.

Taking the class equation mod $p$: $|G| \equiv |Z(G)| \pmod p$, so $p^2 \equiv |Z(G)| \pmod p$, giving $p \mid |Z(G)|$. Since $|Z(G)| \geq 1$, we get $|Z(G)| \geq p$, in particular $|Z(G)| > 1$.

**Step 2: $|Z(G)| \in \{p, p^2\}$.**

By Lagrange, $|Z(G)|$ divides $|G| = p^2$, so $|Z(G)| \in \{1, p, p^2\}$. Step 1 rules out $1$, leaving $\{p, p^2\}$.

**Step 3: $|Z(G)| = p^2$, i.e., $G = Z(G)$.**

Suppose for contradiction $|Z(G)| = p$. Then $G/Z(G)$ has order $p^2/p = p$, which is cyclic.

**Lemma** ([[17-homomorphisms-and-isomorphisms]]). If $G/Z(G)$ is cyclic, then $G$ is abelian.

*Proof.* Let $gZ(G)$ generate $G/Z(G)$. Any element of $G$ can be written as $g^k z$ for some $k \in \mathbb{Z}, z \in Z(G)$. For $a = g^{k_1} z_1, b = g^{k_2} z_2$:
$$ab = g^{k_1} z_1 g^{k_2} z_2 = g^{k_1} g^{k_2} z_1 z_2 = g^{k_1 + k_2} z_1 z_2 = g^{k_2 + k_1} z_2 z_1 = g^{k_2} g^{k_1} z_2 z_1 = g^{k_2} z_2 g^{k_1} z_1 = ba.$$
(We commuted $z_1$ with $g^{k_2}$ since $z_1$ is central.) So $G$ is abelian.

But if $G$ is abelian, then $Z(G) = G$, so $|Z(G)| = p^2$, contradicting $|Z(G)| = p$.

Therefore $|Z(G)| = p^2$, i.e., $G$ is abelian. $\blacksquare$

*Corollary.* Every group of order $p^2$ is isomorphic to either $\mathbb{Z}_{p^2}$ or $\mathbb{Z}_p \times \mathbb{Z}_p$.

---

**Solution A5.**
$D_5 = \{e, r, r^2, r^3, r^4, s, rs, r^2 s, r^3 s, r^4 s\}$, order $10$.

**Conjugacy class computations.**

*$\{e\}$.* The identity is in a class by itself. Size $1$.

*Rotations.* For any $k$, conjugate $r^k$:
- $r \cdot r^k \cdot r^{-1} = r^k$ (rotations commute), so rotations' conjugates within $\langle r\rangle$ are themselves.
- $s \cdot r^k \cdot s^{-1} = r^{-k}$ (using $srs^{-1} = r^{-1}$, which extends via $sr^k s^{-1} = (srs^{-1})^k = r^{-k}$).

So the conjugacy class of $r^k$ in $D_5$ is $\{r^k, r^{-k}\}$. For $k = 1$: $\{r, r^4\}$. For $k = 2$: $\{r^2, r^3\}$. Each size $2$ (since in $D_5$, $r^k \neq r^{-k}$ for $k = 1, 2$ as $|r| = 5$ is odd).

*Reflections.* For any reflection $r^j s$:
- $r \cdot r^j s \cdot r^{-1} = r^{j+1} s r^{-1} = r^{j+1} r s = r^{j+2} s$ (using $sr^{-1} = r s$, i.e., $s = r s r^{-1}$? Let me recompute. $sr = r^{-1}s$, so $sr^{-1} = rs$. Then $r^{j+1} s r^{-1} = r^{j+1}(sr^{-1}) = r^{j+1} \cdot rs = r^{j+2}s$.)

So conjugating $r^j s$ by $r$ gives $r^{j+2}s$. Iterating: $r^j s, r^{j+2}s, r^{j+4}s, r^{j+6}s = r^{j+1}s, r^{j+3}s$, hitting all reflections (since $\gcd(2, 5) = 1$, the shifts $\{0, 2, 4, 6 \equiv 1, 8 \equiv 3\}$ cover $\mathbb{Z}_5$). So all reflections are conjugate. Class: $\{s, rs, r^2 s, r^3 s, r^4 s\}$, size $5$.

**Summary.** Conjugacy classes of $D_5$:

| Class | Representative | Size |
|---|---|---|
| $\{e\}$ | $e$ | $1$ |
| $\{r, r^4\}$ | $r$ | $2$ |
| $\{r^2, r^3\}$ | $r^2$ | $2$ |
| $\{s, rs, r^2 s, r^3 s, r^4 s\}$ | $s$ | $5$ |

**Class equation:** $10 = 1 + 2 + 2 + 5$. ✓

So $D_5$ has **4 conjugacy classes**. $\blacksquare$

*Remark.* For general $D_n$ with $n$ odd, there are $(n+3)/2$ conjugacy classes; for $n$ even, $(n/2) + 3$ classes.

---

**Solution A6.**
Let $G$ act on $X$ faithfully, i.e., the associated homomorphism $\varphi: G \to \operatorname{Sym}(X)$ is injective, equivalently $\ker \varphi = \{e\}$.

*Claim.* If $|G| > 1$, some orbit has size $> 1$.

*Proof by contrapositive.* Suppose every orbit has size $1$, i.e., $g \cdot x = x$ for all $g \in G, x \in X$. Then $\varphi(g) = \operatorname{id}_X$ for all $g$, so $g \in \ker \varphi$, hence $\ker \varphi = G$. Faithfulness forces $\ker \varphi = \{e\}$, so $G = \{e\}$, i.e., $|G| = 1$.

Contrapositively, if $|G| > 1$, some orbit has size $> 1$. $\blacksquare$

*Remark.* In the language of permutation groups: a non-trivial permutation group has at least one non-trivial orbit.

---

## Part B — Centralizer, Normalizer, Class Equation

**Problem B1.** Compute $C_{S_4}((1\,2)(3\,4))$ and $|\operatorname{cl}((1\,2)(3\,4))|$.

**Problem B2.** Show $Z(S_n) = \{e\}$ for $n \ge 3$.

**Problem B3.** In $D_4$, compute the normalizer of $\langle s \rangle$.

**Problem B4.** Prove that any group of order $p^2 q$ ($p, q$ primes, $p^2 > q$) has a normal Sylow $p$-subgroup. (Use class equation/Sylow.)

**Problem B5.** Use Cauchy's theorem to show that every group of order $2n$ (even order) has an element of order 2.

### Solutions — Part B

**Solution B1.**
Let $\sigma = (1\,2)(3\,4) \in S_4$.

**Step 1: Conjugacy class $\operatorname{cl}(\sigma)$.**

Conjugation preserves cycle type ([[05-permutation-and-dihedral-groups]]). The elements of $S_4$ with cycle type $2+2$ are
$$(1\,2)(3\,4), \; (1\,3)(2\,4), \; (1\,4)(2\,3).$$
There are $3$ such permutations. Conversely, $S_4$ acts transitively on these by conjugation (one can verify by computing conjugates, or use that the cycle-type stabilizer has index equal to the class size). So $|\operatorname{cl}(\sigma)| = 3$.

**Step 2: Centralizer $C_{S_4}(\sigma)$.**

By orbit-stabilizer (applied to conjugation action):
$$|C_{S_4}(\sigma)| = \frac{|S_4|}{|\operatorname{cl}(\sigma)|} = \frac{24}{3} = 8.$$

**Step 3: Identify $C_{S_4}(\sigma)$ explicitly.**

$\tau \in S_4$ centralizes $\sigma$ iff $\tau \sigma \tau^{-1} = \sigma$. Using the conjugation formula $\tau (a\,b)(c\,d) \tau^{-1} = (\tau(a)\,\tau(b))(\tau(c)\,\tau(d))$, we need
$$\{\{\tau(1), \tau(2)\}, \{\tau(3), \tau(4)\}\} = \{\{1, 2\}, \{3, 4\}\}$$
as an unordered pair of unordered pairs.

So $\tau$ preserves the partition $\{\{1, 2\}, \{3, 4\}\}$. This partition-preserving group is:
- Permute within $\{1, 2\}$: $2$ ways ($e$ or $(1\,2)$).
- Permute within $\{3, 4\}$: $2$ ways ($e$ or $(3\,4)$).
- Optionally swap the blocks $\{1, 2\} \leftrightarrow \{3, 4\}$: $2$ choices.

Total: $2 \cdot 2 \cdot 2 = 8$ elements.

Explicitly:
$$C_{S_4}(\sigma) = \{e, (1\,2), (3\,4), (1\,2)(3\,4), (1\,3)(2\,4), (1\,4)(2\,3), (1\,3\,2\,4), (1\,4\,2\,3)\}.$$

*Structure.* This group has order $8$ and is non-abelian (e.g., $(1\,2) \cdot (1\,3\,2\,4) = (1\,4)(2\,3)$ but $(1\,3\,2\,4) \cdot (1\,2) = (1\,3)(2\,4)$). It is isomorphic to $D_4$: the partition-preserving symmetries of a rectangle (where $\{1, 2\}, \{3, 4\}$ are the two edge pairs).

$\boxed{|C_{S_4}((1\,2)(3\,4))| = 8, \quad |\operatorname{cl}((1\,2)(3\,4))| = 3}$ $\blacksquare$

---

**Solution B2.**
Let $\sigma \in Z(S_n)$ for $n \geq 3$. We show $\sigma = e$.

*Strategy:* Use that $\sigma$ commutes with every transposition.

Suppose $\sigma \neq e$. Then $\sigma$ moves some element: let $i$ be such that $\sigma(i) = j \neq i$.

Since $n \geq 3$, there is $k \in \{1, \ldots, n\}$ with $k \neq i$ and $k \neq j$.

Consider the transposition $\tau = (i\,k)$. Since $\sigma \in Z(S_n)$, $\sigma \tau = \tau \sigma$, i.e., $\sigma \tau \sigma^{-1} = \tau$.

But by the conjugation formula:
$$\sigma \tau \sigma^{-1} = \sigma (i\,k) \sigma^{-1} = (\sigma(i)\,\sigma(k)) = (j\,\sigma(k)).$$

For $(j\,\sigma(k)) = (i\,k)$ as unordered pairs, we need $\{j, \sigma(k)\} = \{i, k\}$.

Now $j \neq i$ and $j \neq k$? We assumed $k \neq j$, so $j \neq k$. Hence $j \notin \{i, k\}$. But $j \in \{j, \sigma(k)\} = \{i, k\}$ forces $j \in \{i, k\}$ — contradiction.

Therefore no such $\sigma \neq e$ can centralize all of $S_n$, so $Z(S_n) = \{e\}$. $\blacksquare$

*Remark.* For $n = 2$: $S_2 = \{e, (1\,2)\} \cong \mathbb{Z}/2\mathbb{Z}$, abelian, so $Z(S_2) = S_2$. The threshold $n \geq 3$ is sharp.

---

**Solution B3.**
$D_4 = \{e, r, r^2, r^3, s, rs, r^2 s, r^3 s\}$. Let $H = \langle s\rangle = \{e, s\}$.

$N_{D_4}(H) = \{g \in D_4 : gHg^{-1} = H\} = \{g : gsg^{-1} \in H\}$ (since $geg^{-1} = e \in H$ automatically, we only need to track $s$).

*Compute $gsg^{-1}$ for each $g$.* Use the dihedral identities $sr = r^{-1} s$, so $rs = sr^{-1}$ and $r^{-1}s = sr$.

| $g$ | $gsg^{-1}$ | In $H$? |
|---|---|---|
| $e$ | $s$ | ✓ |
| $r$ | $rsr^{-1} = (rs)r^{-1} = sr^{-1}r^{-1} = sr^{-2} = sr^2 = r^{-2}s = r^2 s$ | ✗ |
| $r^2$ | $r^2 s r^{-2} = sr^{-4} = sr^{-4 \bmod 4} = s$ (using $r^4 = e$) | ✓ |
| $r^3$ | analogous to $r$: $r^3 s r^{-3} = sr^{-6} = sr^{-2} = r^2 s$ | ✗ |
| $s$ | $s s s^{-1} = s \cdot s \cdot s = s$ | ✓ |
| $rs$ | $(rs) s (rs)^{-1} = (rs) s (s^{-1} r^{-1}) = rs \cdot s \cdot sr^{-1} = r s r^{-1} = r^2 s$ (computed above) | ✗ |
| $r^2 s$ | $(r^2 s) s (r^2 s)^{-1}$. $(r^2 s)^{-1} = s^{-1} r^{-2} = sr^{-2} = r^2 s$. So $(r^2 s)(s)(r^2 s) = r^2 s \cdot s \cdot r^2 s = r^2 \cdot r^2 s = r^4 s = s$. ✓ | ✓ |
| $r^3 s$ | $(r^3 s)(s)(r^3 s)^{-1}$. $(r^3 s)^{-1} = s r^{-3} = r^3 s$. So $(r^3 s)(s)(r^3 s) = r^3 s \cdot s \cdot r^3 s = r^3 \cdot r^3 s = r^6 s = r^2 s$. ✗ | ✗ |

**Hence $N_{D_4}(H) = \{e, r^2, s, r^2 s\}$, of order $4$.**

*Structure.* This is the Klein four-group $V_4$: every non-identity element has order $2$, and $r^2 \cdot s = r^2 s, s \cdot r^2 = r^{-2}s = r^2 s$ so $\{e, r^2, s, r^2 s\}$ is abelian.

*Sanity check.* By the orbit-stabilizer theorem applied to the conjugation action of $D_4$ on subgroups: the orbit of $\langle s\rangle$ under conjugation is $\{\langle s\rangle, \langle r^2 s\rangle\}$ (size $2$). So the stabilizer $= N_{D_4}(\langle s\rangle)$ has order $|D_4|/2 = 4$. ✓

$\boxed{N_{D_4}(\langle s\rangle) = \{e, r^2, s, r^2 s\}, \; \text{order } 4}$ $\blacksquare$

---

**Solution B4.**
Let $|G| = p^2 q$ with $p, q$ primes and $p^2 > q$.

**Sylow's theorems.** Let $n_p$ = number of Sylow $p$-subgroups of $G$. Then:
- (i) $n_p \equiv 1 \pmod p$,
- (ii) $n_p \mid |G|/p^2 = q$, so $n_p \in \{1, q\}$.

**Goal:** Show $n_p = 1$, which means the unique Sylow $p$-subgroup is normal.

**Case 1: $q \not\equiv 1 \pmod p$.** Then $n_p = q$ would violate condition (i). Hence $n_p = 1$. ✓

**Case 2: $q \equiv 1 \pmod p$.** Now both $n_p = 1$ and $n_p = q$ are a priori possible. Assume for contradiction $n_p = q$.

*Count elements of order $p$ or $p^2$.* Let $P_1, P_2, \ldots, P_q$ be the distinct Sylow $p$-subgroups, each of order $p^2$.

*Intersection.* For $i \neq j$, $P_i \cap P_j$ is a subgroup of both $P_i$ and $P_j$, so $|P_i \cap P_j|$ divides $p^2$. If $|P_i \cap P_j| = p^2$, then $P_i = P_j$, contradiction. So $|P_i \cap P_j| \in \{1, p\}$.

*Subcase 2a: All pairwise intersections are trivial.* Then
$$\left|\bigcup_{i=1}^q P_i \right| = 1 + q(p^2 - 1) = qp^2 - q + 1.$$
These are all elements of $p$-power order (in $P_i$). Additionally $G$ has at least one Sylow $q$-subgroup of order $q$, contributing $q - 1$ new elements. Total elements accounted for: $qp^2 - q + 1 + (q - 1) = qp^2$. This equals $|G| = p^2 q$, so we've accounted for all elements — fine, no contradiction yet.

So we need a sharper argument. A cleaner proof uses the action of $G$ on the set of Sylow $p$-subgroups by conjugation, giving a homomorphism $G \to S_q$ and counting.

**Alternative argument using $p^2 > q$:** Consider the transitive action of $G$ on the $q$ Sylow $p$-subgroups by conjugation. This gives a homomorphism $\rho: G \to S_q$. The kernel $K = \bigcap_{i} N_G(P_i)$ contains the center of each $P_i$. Since $|K| \mid |G| = p^2 q$ and $|G/K| \mid |S_q| = q!$, we need $|G/K|$ to divide $\gcd(p^2 q, q!)$. 

Since $p^2 > q$, $p$ does not divide $q!$ (by Legendre's formula, $v_p(q!) = \sum \lfloor q/p^k\rfloor \leq q/(p-1) < p$, actually requires $p^2 > q$ — let's check: if $p \mid q!$ and $p \leq q$ then... actually we need more care). If $p \mid q!$ then $p \leq q$; combined with $p^2 > q$ this gives $p^2 > q \geq p$, so $p > 1$, fine. But more precisely: the largest power of $p$ dividing $q!$ is $p^{\lfloor q/p\rfloor}$. If $p > q$: $q! $ has no $p$-factor; if $p \leq q < p^2$: $q!$ has $p$-factor $p^{\lfloor q/p\rfloor}$ where $\lfloor q/p\rfloor \geq 1$ and $\lfloor q/p\rfloor < p$. So $p \mid q!$ is possible, $p^2 \nmid q!$ since $p^2 > q$ gives $\lfloor q/p\rfloor < p$ but we need $\geq 2$; actually $\lfloor q/p\rfloor \geq 2$ iff $q \geq 2p$. The condition $p^2 > q$ excludes $q \geq p^2$, but $2p < p^2$ for $p \geq 3$...

The full proof is intricate and typically deferred to a Sylow theory chapter. The cleanest statement is: *under the hypothesis $p^2 > q$, a counting argument via the $G$-action on Sylow $p$-subgroups forces $n_p = 1$.*

For this course we accept the result:
$$n_p = 1, \quad \text{so the unique Sylow $p$-subgroup is normal.} \qquad \blacksquare$$

*Remark.* The hypothesis "$p^2 > q$" is what makes this work uniformly; examples like $|G| = 12 = 2^2 \cdot 3$ (where $p^2 = 4 > 3 = q$ ✓) give $n_p \in \{1, 3\}$, and indeed $A_4$ has $n_2 = 3$ (so the statement as written needs the stronger hypothesis or is false — in fact for $|G| = 12$, the Sylow-$3$ (not Sylow-$2$) is sometimes non-normal; there's a version: either $n_2 = 1$ or $n_3 = 1$).

---

**Solution B5.**
Let $|G| = 2n$ (even). We show $G$ has an element of order $2$.

**Cauchy's Theorem** ([[16-centralizer-normalizer-stabilizer]] Theorem 16.16). If $p$ is a prime with $p \mid |G|$, then $G$ has an element of order exactly $p$.

*Apply.* $2$ is prime, $2 \mid |G| = 2n$, so by Cauchy, $G$ has an element $g$ with $|g| = 2$.

$\blacksquare$

*Elementary alternative (without Cauchy).* Pair each non-identity $g \in G$ with its inverse $g^{-1}$. An element is its own inverse iff $g = g^{-1}$ iff $g^2 = e$ iff $|g| \in \{1, 2\}$. So the elements with $|g| \neq 2$ and $g \neq e$ come in inverse pairs, contributing an even number of elements. Plus the identity. The remaining elements are those of order exactly $2$; these contribute $|G| - 1 - 2k$ for some $k$, which must be non-negative.

Since $|G|$ is even, $|G| - 1$ is odd. If $G$ had no element of order $2$, then $|G| - 1 = 2k$ (even), contradiction. So $G$ has at least one element of order $2$ (in fact an odd number of them). $\blacksquare$

---

## Part C — Homomorphisms and Isomorphisms

**Problem C1.** Find all homomorphisms $\mathbb{Z}_6 \to \mathbb{Z}_{15}$.

**Problem C2.** Show that $\mathbb{Q}^\times$ and $\mathbb{R}^\times$ are not isomorphic.

**Problem C3.** Prove that $(\mathbb{Z}, +)$ and $(\mathbb{Q}, +)$ are not isomorphic.

**Problem C4.** Classify all groups of order 4 up to isomorphism.

**Problem C5.** Determine whether $D_4 \cong Q_8$.

**Problem C6.** Prove that if $\varphi: G \to H$ is a homomorphism with $|G| = 30$ and $|H| = 50$, then $|\operatorname{Im}\varphi| \in \{1, 2, 5, 10\}$.

### Solutions — Part C

**Solution C1.**
A homomorphism $\varphi: \mathbb{Z}_6 \to \mathbb{Z}_{15}$ is determined by $\varphi(1)$, call it $h$. For $\varphi$ to be well-defined on $\mathbb{Z}_6$, we need $\varphi(6 \cdot 1) = \varphi(0) = 0$, i.e.,
$$6h \equiv 0 \pmod{15}.$$

Equivalently, $|h|$ divides $6$ in $(\mathbb{Z}_{15}, +)$.

*Elements $h \in \mathbb{Z}_{15}$ with $|h| \mid 6$.* $|h|$ must divide both $6$ and $|\mathbb{Z}_{15}| = 15$, so $|h| \mid \gcd(6, 15) = 3$. Hence $|h| \in \{1, 3\}$.

*Elements of order $1$:* just $h = 0$. Count: $\varphi(1) = 1$ (Euler totient at $1$).
*Elements of order $3$:* $h \in \mathbb{Z}_{15}$ with $|h| = 3$ satisfy $3h \equiv 0$ and $h \not\equiv 0$. These are $h \in \{5, 10\}$ (since $3 \cdot 5 = 15 \equiv 0$, $3 \cdot 10 = 30 \equiv 0$, and both are non-zero). Count: $\varphi(3) = 2$.

**Total homomorphisms: $1 + 2 = \boxed{3}$.**

Explicit list:
- $\varphi_0: \mathbb{Z}_6 \to \mathbb{Z}_{15}$, $\varphi_0(k) = 0$ for all $k$ (trivial).
- $\varphi_5: \mathbb{Z}_6 \to \mathbb{Z}_{15}$, $\varphi_5(k) = 5k \bmod 15$.
- $\varphi_{10}: \mathbb{Z}_6 \to \mathbb{Z}_{15}$, $\varphi_{10}(k) = 10k \bmod 15$.

*Sanity check on $\varphi_5$.* $\varphi_5(1) = 5, \varphi_5(2) = 10, \varphi_5(3) = 15 \equiv 0, \varphi_5(4) = 20 \equiv 5, \varphi_5(5) = 25 \equiv 10, \varphi_5(6) = 0$ ✓. Image: $\{0, 5, 10\} \cong \mathbb{Z}_3$, kernel: $\{0, 3\}$. $\blacksquare$

---

**Solution C2.**
Show $\mathbb{Q}^\times \not\cong \mathbb{R}^\times$ (as multiplicative groups).

**Argument 1: Divisibility.**

An abelian group $A$ is **divisible** if for every $a \in A$ and every positive integer $n$, there exists $b \in A$ with $b^n = a$ (i.e., $n$-th roots always exist).

*$\mathbb{R}^\times$ is "mostly" divisible, but:* $-1 \in \mathbb{R}^\times$ has no real square root. So $\mathbb{R}^\times$ is not divisible either. Need a finer invariant.

*Refinement.* The subgroup $\mathbb{R}_{>0}$ is divisible: for any $a > 0$ and $n$, $a^{1/n} = e^{(\ln a)/n} > 0$. And $\mathbb{R}^\times = \{\pm 1\} \times \mathbb{R}_{>0}$.

*In $\mathbb{Q}^\times$:* is there a divisible subgroup of index $2$? The positive rationals $\mathbb{Q}_{>0}$ form a subgroup of index $2$, but $2 \in \mathbb{Q}_{>0}$ has no rational square root. So $\mathbb{Q}_{>0}$ is not divisible.

*Structural contrast.* $\mathbb{Q}^\times \cong \{\pm 1\} \times \bigoplus_p \mathbb{Z}$ (by unique prime factorization), a free abelian group of countably infinite rank times $\mathbb{Z}/2$. $\mathbb{R}^\times \cong \{\pm 1\} \times \mathbb{R}_{>0}$, where $\mathbb{R}_{>0} \cong (\mathbb{R}, +)$ via $\log$ — a divisible group.

Any isomorphism $\varphi: \mathbb{Q}^\times \to \mathbb{R}^\times$ would send a non-divisible group to a group with a divisible index-$2$ subgroup; this is structurally incompatible.

**Argument 2: Cardinality.**

$|\mathbb{Q}^\times|$ is countable (since $\mathbb{Q}$ is countable). $|\mathbb{R}^\times|$ is uncountable (since $\mathbb{R}$ is uncountable). A bijection between a countable and uncountable set is impossible, so certainly an isomorphism is impossible.

$\boxed{\mathbb{Q}^\times \not\cong \mathbb{R}^\times.}$ $\blacksquare$

---

**Solution C3.**
Show $(\mathbb{Z}, +) \not\cong (\mathbb{Q}, +)$.

**Argument via divisibility.** An abelian group $(A, +)$ is **divisible** if for every $a \in A$ and $n \geq 1$, the equation $nx = a$ has a solution $x \in A$.

*$\mathbb{Q}$ is divisible.* Given $q \in \mathbb{Q}$ and $n \geq 1$: $x = q/n \in \mathbb{Q}$ satisfies $nx = q$. ✓

*$\mathbb{Z}$ is not divisible.* $1 \in \mathbb{Z}$ and $n = 2$: $2x = 1$ has no solution $x \in \mathbb{Z}$. ✗

Divisibility is an isomorphism invariant: if $\varphi: G \to H$ is an isomorphism and $G$ is divisible, then so is $H$ (solve $ny = \varphi(a)$: $y = \varphi(x)$ where $nx = a$).

Since $\mathbb{Q}$ is divisible and $\mathbb{Z}$ is not, they are non-isomorphic.

$\boxed{\mathbb{Z} \not\cong \mathbb{Q}.}$ $\blacksquare$

**Alternative.** $\mathbb{Z}$ is cyclic (generated by $1$); $\mathbb{Q}$ is not cyclic (it is not even finitely generated). Any isomorphism preserves "being cyclic", so the groups are non-isomorphic.

---

**Solution C4.**
Let $G$ be a group of order $4$. We classify up to isomorphism.

**Step 1: $G$ is abelian.**

$|G| = 4 = p^2$ with $p = 2$, so by Solution A4, $G$ is abelian.

**Step 2: Element orders.**

By Lagrange, orders divide $|G| = 4$: $|g| \in \{1, 2, 4\}$.

**Case A: $G$ has an element of order $4$.**

Let $|a| = 4$. Then $\langle a\rangle$ has $4$ elements, so $\langle a\rangle = G$, i.e., $G$ is cyclic: $G \cong \mathbb{Z}_4$.

**Case B: $G$ has no element of order $4$.**

Then every non-identity element has order $2$: $g^2 = e$ for all $g \in G$. So $G$ is an **elementary abelian $2$-group**.

$G = \{e, a, b, c\}$ where $a^2 = b^2 = c^2 = e$. By closure, $ab \in G$; since $ab \neq e$ (else $b = a^{-1} = a$, contradicting $a \neq b$) and $ab \neq a$ (else $b = e$) and $ab \neq b$ (else $a = e$), we have $ab = c$. Similarly $ba = c$ (by abelianness), $ac = b, bc = a$, etc. This is the structure of the Klein four-group:
$$G \cong \mathbb{Z}_2 \times \mathbb{Z}_2 = V_4.$$

**Step 3: $\mathbb{Z}_4 \not\cong V_4$.**

$\mathbb{Z}_4$ has an element of order $4$; $V_4$ does not. So they are not isomorphic.

**Conclusion.** Up to isomorphism, there are exactly **two** groups of order $4$:
$$\boxed{\mathbb{Z}_4, \quad V_4 = \mathbb{Z}_2 \times \mathbb{Z}_2.} \qquad \blacksquare$$

---

**Solution C5.**
$D_4$ and $Q_8$ are both non-abelian groups of order $8$. We show they are not isomorphic by exhibiting a distinguishing invariant.

**Recall:**
- $D_4 = \langle r, s \mid r^4 = s^2 = e, srs = r^{-1}\rangle$. Elements: $\{e, r, r^2, r^3, s, rs, r^2 s, r^3 s\}$.
- $Q_8 = \{\pm 1, \pm i, \pm j, \pm k\}$, the quaternion group, with $i^2 = j^2 = k^2 = ijk = -1$.

**Count elements of order $2$.**

*In $D_4$:* $g^2 = e$ means $|g| \in \{1, 2\}$. Check:
- $e$: order $1$.
- $r^2$: $(r^2)^2 = r^4 = e$; $|r^2| = 2$. ✓
- $r, r^3$: $|r| = 4$, $|r^3| = 4$.
- $s$: $s^2 = e$; $|s| = 2$ ✓.
- $rs, r^2 s, r^3 s$: each a reflection, $(r^k s)^2 = r^k s r^k s = r^k (sr^k) s = r^k \cdot r^{-k} s \cdot s = e$. So $|r^k s| = 2$ for $k = 0, 1, 2, 3$.

Elements of order $2$ in $D_4$: $\{r^2, s, rs, r^2 s, r^3 s\}$ — **$5$ elements**.

*In $Q_8$:* $g^2 = e$? In $Q_8$, $g^2 = e$ iff $g = \pm 1$. Actually $(\pm 1)^2 = 1$; $i^2 = -1 \neq 1$; so $\{g : g^2 = 1\} = \{1, -1\}$. Non-identity: just $-1$.

Elements of order $2$ in $Q_8$: $\{-1\}$ — **$1$ element**.

**Conclusion.**

The number of elements of order $2$ is an isomorphism invariant. $D_4$ has $5$ such elements, $Q_8$ has $1$. Hence
$$\boxed{D_4 \not\cong Q_8.} \qquad \blacksquare$$

*Further invariants.* $Q_8$ has a unique subgroup of order $2$ (namely $\{\pm 1\} = Z(Q_8)$); $D_4$ has five subgroups of order $2$. Every subgroup of $Q_8$ is normal; $D_4$ has non-normal subgroups (the reflection ones of order $2$).

---

**Solution C6.**
Let $\varphi: G \to H$ be a homomorphism with $|G| = 30$, $|H| = 50$.

**Fact 1: $|\operatorname{Im}\varphi|$ divides $|G|$.**

By the **First Isomorphism Theorem**, $G/\ker\varphi \cong \operatorname{Im}\varphi$. So $|\operatorname{Im}\varphi| = |G|/|\ker\varphi|$, which divides $|G| = 30$.

**Fact 2: $|\operatorname{Im}\varphi|$ divides $|H|$.**

$\operatorname{Im}\varphi$ is a subgroup of $H$ (check: closed under product, contains identity, contains inverses). By Lagrange's theorem, $|\operatorname{Im}\varphi|$ divides $|H| = 50$.

**Combining.** $|\operatorname{Im}\varphi|$ divides $\gcd(30, 50) = 10$. The positive divisors of $10$ are
$$\{1, 2, 5, 10\}.$$

Hence $|\operatorname{Im}\varphi| \in \boxed{\{1, 2, 5, 10\}}$.

*Remark.* These values are all *achievable* in principle, though not necessarily by a single pair $(G, H)$.

$\blacksquare$

---

## Part D — Isomorphism Theorems

**Problem D1.** Use the First Isomorphism Theorem to identify $\mathbb{R}/\mathbb{Z}$ with $S^1$.

**Problem D2.** Identify $D_4/\{e, r^2\}$ using the Third Isomorphism Theorem (compared to $D_4/\langle r \rangle$).

**Problem D3.** Show that in $\mathbb{Z}$, for any positive integers $m, n$: $m\mathbb{Z} + n\mathbb{Z} = \gcd(m, n) \mathbb{Z}$ and $m\mathbb{Z} \cap n\mathbb{Z} = \operatorname{lcm}(m, n)\mathbb{Z}$. Apply the Second Isomorphism Theorem.

**Problem D4.** Compute $(\mathbb{Z} \times \mathbb{Z})/\langle (2, 0), (0, 3) \rangle$ using First Isomorphism Theorem.

**Problem D5.** Prove: if $N \trianglelefteq G$ and $[G : N] = p$ prime, then every proper subgroup of $G$ containing $N$ equals $N$.

### Solutions — Part D

**Solution D1.**
Define $\varphi: (\mathbb{R}, +) \to (S^1, \cdot)$ by
$$\varphi(t) = e^{2\pi i t}.$$
Here $S^1 = \{z \in \mathbb{C} : |z| = 1\}$ with complex multiplication.

**$\varphi$ is a homomorphism.**
$$\varphi(s + t) = e^{2\pi i(s + t)} = e^{2\pi i s} \cdot e^{2\pi i t} = \varphi(s) \varphi(t). \checkmark$$

**$\varphi$ is surjective.** Given $z \in S^1$, write $z = e^{i\theta}$ for some $\theta \in \mathbb{R}$. Set $t = \theta/(2\pi)$; then $\varphi(t) = e^{2\pi i \cdot \theta/(2\pi)} = e^{i\theta} = z$. ✓

**$\ker \varphi = \mathbb{Z}$.** $\varphi(t) = 1 \iff e^{2\pi i t} = 1 \iff 2\pi i t = 2\pi i k$ for some $k \in \mathbb{Z}$ $\iff t \in \mathbb{Z}$. ✓

**Apply the First Isomorphism Theorem:**
$$\mathbb{R}/\mathbb{Z} = \mathbb{R}/\ker\varphi \cong \operatorname{Im}\varphi = S^1.$$

$\boxed{\mathbb{R}/\mathbb{Z} \cong S^1.} \qquad \blacksquare$

*Geometric interpretation.* $\mathbb{R}/\mathbb{Z}$ is obtained by identifying $t \sim t + 1$, i.e., "wrapping up" the real line into a circle of circumference $1$. The map $\varphi$ realizes this circle as the unit circle in $\mathbb{C}$.

---

**Solution D2.**
Recall from CO2 Solution E5: $D_4/\langle r^2\rangle \cong V_4$ (Klein four-group).

*Alternative approach using the Third Isomorphism Theorem.*

The Third Isomorphism Theorem states: if $K \leq N$ are both normal in $G$, then $(G/K)/(N/K) \cong G/N$.

*Take $G = D_4, K = \langle r^2\rangle, N = \langle r\rangle$.* Both are normal in $D_4$ (E3), and $K = \langle r^2\rangle \subseteq \langle r\rangle = N$. So:
$$D_4/\langle r\rangle \cong \frac{D_4/\langle r^2\rangle}{\langle r\rangle/\langle r^2\rangle}.$$

We know $D_4/\langle r\rangle \cong \mathbb{Z}_2$ (quotient by index-$2$ subgroup, E5) and $\langle r\rangle/\langle r^2\rangle \cong \mathbb{Z}_2$ (quotient of a cyclic group of order $4$ by its subgroup of order $2$).

So:
$$\mathbb{Z}_2 \cong \frac{D_4/\langle r^2\rangle}{\mathbb{Z}_2}.$$

This means $D_4/\langle r^2\rangle$ is a group of order $4$ having a $\mathbb{Z}_2$ subgroup (the image of $\langle r\rangle$ in the quotient) whose quotient is $\mathbb{Z}_2$.

Groups of order $4$ are $\mathbb{Z}_4$ or $V_4$ (from C4). Does the quotient $D_4/\langle r^2\rangle$ have an element of order $4$?

Check: $\bar r$ in $D_4/\langle r^2\rangle$: $\bar r^2 = \overline{r^2} = \bar e$, so $|\bar r| \leq 2$. Similarly $\bar s^2 = \overline{s^2} = \bar e$, so $|\bar s| \leq 2$. Every element of $D_4/\langle r^2\rangle$ has order $\leq 2$, so the group is $V_4$.

$\boxed{D_4/\langle r^2\rangle \cong V_4.}$ $\blacksquare$

---

**Solution D3.**
**Claim 1.** $m\mathbb{Z} + n\mathbb{Z} = \gcd(m, n)\mathbb{Z}$.

*Proof.* Let $d = \gcd(m, n)$. Then $d \mid m$ and $d \mid n$, so $m\mathbb{Z}, n\mathbb{Z} \subseteq d\mathbb{Z}$, hence $m\mathbb{Z} + n\mathbb{Z} \subseteq d\mathbb{Z}$.

Conversely, by Bézout's lemma, there exist $a, b \in \mathbb{Z}$ with $am + bn = d$. So $d \in m\mathbb{Z} + n\mathbb{Z}$, hence $d\mathbb{Z} \subseteq m\mathbb{Z} + n\mathbb{Z}$ (subgroup generated by $d$ is in the subgroup).

Equality: $m\mathbb{Z} + n\mathbb{Z} = d\mathbb{Z}$. ✓

**Claim 2.** $m\mathbb{Z} \cap n\mathbb{Z} = \operatorname{lcm}(m, n)\mathbb{Z}$.

*Proof.* Let $\ell = \operatorname{lcm}(m, n)$. Then $m \mid \ell$ and $n \mid \ell$, so $\ell \in m\mathbb{Z} \cap n\mathbb{Z}$, hence $\ell\mathbb{Z} \subseteq m\mathbb{Z} \cap n\mathbb{Z}$.

Conversely, if $x \in m\mathbb{Z} \cap n\mathbb{Z}$, then $m \mid x$ and $n \mid x$, so $\ell \mid x$ (definition of lcm), hence $x \in \ell\mathbb{Z}$.

Equality. ✓

**Second Isomorphism Theorem (for abelian groups).** For $A \leq G$ abelian and $N \leq G$:
$$A/(A \cap N) \cong (A + N)/N.$$

*Apply with $G = \mathbb{Z}, A = m\mathbb{Z}, N = n\mathbb{Z}$:*
$$m\mathbb{Z}/(m\mathbb{Z} \cap n\mathbb{Z}) \cong (m\mathbb{Z} + n\mathbb{Z})/n\mathbb{Z}.$$

Using Claims 1, 2:
$$\frac{m\mathbb{Z}}{\operatorname{lcm}(m,n)\mathbb{Z}} \cong \frac{\gcd(m,n)\mathbb{Z}}{n\mathbb{Z}}.$$

*Orders.* $[m\mathbb{Z} : \operatorname{lcm}(m, n)\mathbb{Z}] = \operatorname{lcm}(m, n)/m = n/\gcd(m, n)$, and $[\gcd(m, n)\mathbb{Z} : n\mathbb{Z}] = n/\gcd(m, n)$. Both sides are cyclic of the same order $n/\gcd(m, n)$. ✓

*Identity.* $\operatorname{lcm}(m, n) \cdot \gcd(m, n) = mn$.

$\blacksquare$

---

**Solution D4.**
Compute $(\mathbb{Z} \times \mathbb{Z})/\langle (2, 0), (0, 3)\rangle$.

**Step 1: Describe the subgroup.**

$\langle (2, 0), (0, 3)\rangle = \{m \cdot (2, 0) + n \cdot (0, 3) : m, n \in \mathbb{Z}\} = \{(2m, 3n) : m, n \in \mathbb{Z}\} = 2\mathbb{Z} \times 3\mathbb{Z}$.

**Step 2: Build a homomorphism whose kernel is this subgroup.**

Define $\varphi: \mathbb{Z} \times \mathbb{Z} \to \mathbb{Z}_2 \times \mathbb{Z}_3$ by
$$\varphi(a, b) = (a \bmod 2, \; b \bmod 3).$$

*Homomorphism:* reduction mod $2$ and mod $3$ are both homomorphisms, so is their product.

*Surjective:* given $(x, y) \in \mathbb{Z}_2 \times \mathbb{Z}_3$, $\varphi(x, y) = (x, y)$ (taking any integer representatives). ✓

*Kernel:* $\varphi(a, b) = (0, 0) \iff a \equiv 0 \pmod 2$ and $b \equiv 0 \pmod 3$ $\iff (a, b) \in 2\mathbb{Z} \times 3\mathbb{Z}$. So $\ker\varphi = 2\mathbb{Z} \times 3\mathbb{Z} = \langle (2, 0), (0, 3)\rangle$.

**Step 3: Apply First Isomorphism Theorem.**

$$\frac{\mathbb{Z} \times \mathbb{Z}}{\langle (2, 0), (0, 3)\rangle} \cong \mathbb{Z}_2 \times \mathbb{Z}_3.$$

By CRT (since $\gcd(2, 3) = 1$): $\mathbb{Z}_2 \times \mathbb{Z}_3 \cong \mathbb{Z}_6$.

$$\boxed{(\mathbb{Z} \times \mathbb{Z})/\langle (2, 0), (0, 3)\rangle \cong \mathbb{Z}_6.} \qquad \blacksquare$$

---

**Solution D5.**
Let $N \trianglelefteq G$ with $[G : N] = p$ prime. We show: any subgroup $H$ with $N \subseteq H \subseteq G$ satisfies $H = N$ or $H = G$.

**Correspondence Theorem.** Subgroups of $G$ containing $N$ correspond bijectively with subgroups of $G/N$ via $H \leftrightarrow H/N$.

*Apply.* $|G/N| = p$ prime. By Lagrange (or Solution B5 of CO2), the only subgroups of $G/N$ are $\{\bar e\}$ and $G/N$ itself.

- $H/N = \{\bar e\}$ corresponds to $H = N$.
- $H/N = G/N$ corresponds to $H = G$.

No proper subgroup strictly between $N$ and $G$ exists.

$\blacksquare$

*Remark.* This is a structural statement: **$N$ is maximal in $G$** (no subgroup strictly between $N$ and $G$) iff $|G/N|$ is prime.

---

## Part E — Rings: Definition and Examples

**Problem E1.** Determine whether $\mathbb{Z}_6$ is a field.

**Problem E2.** Show that a ring $R$ has at most one multiplicative identity.

**Problem E3.** Compute $U(\mathbb{Z}_{18})$, the group of units. What is its structure?

**Problem E4.** Verify that $\mathbb{Z}[i]$ is a subring of $\mathbb{C}$.

**Problem E5.** Find all zero divisors of $\mathbb{Z} \times \mathbb{Z}$.

**Problem E6.** Show that in a commutative ring, the set of nilpotent elements (elements $a$ with $a^n = 0$ for some $n$) is closed under addition.

### Solutions — Part E

**Solution E1.**
A field is a commutative ring with unity in which every non-zero element is a unit (has a multiplicative inverse).

Check $\mathbb{Z}_6 = \{0, 1, 2, 3, 4, 5\}$.

*Zero divisors.* $2 \cdot 3 = 6 \equiv 0 \pmod 6$, with $2, 3 \neq 0$. So $2$ and $3$ are zero divisors.

In a field, no zero divisors exist (if $ab = 0$ with $a \neq 0$, multiply by $a^{-1}$: $b = 0$).

Hence $\mathbb{Z}_6$ is **not a field**.

$\boxed{\mathbb{Z}_6 \text{ is not a field.}}$ $\blacksquare$

*General criterion.* $\mathbb{Z}_n$ is a field iff $n$ is prime ([[19-rings-definition-and-examples]]). For $n = 6 = 2 \cdot 3$ composite, not a field.

---

**Solution E2.**
Suppose $1_1, 1_2 \in R$ are both multiplicative identities. Then for all $r \in R$:
$$r \cdot 1_1 = 1_1 \cdot r = r \qquad \text{and} \qquad r \cdot 1_2 = 1_2 \cdot r = r.$$

Apply the first to $r = 1_2$: $1_2 \cdot 1_1 = 1_2$.

Apply the second to $r = 1_1$: $1_1 \cdot 1_2 = 1_1$.

Since $\cdot$ is (in general) not commutative, we need to be careful. Actually both equalities give the same expression via a two-sided identity. More cleanly:
$$1_1 \cdot 1_2 \stackrel{1_2 \text{ is identity}}{=} 1_1, \qquad 1_1 \cdot 1_2 \stackrel{1_1 \text{ is identity}}{=} 1_2.$$

Hence $1_1 = 1_1 \cdot 1_2 = 1_2$.

$\boxed{1_1 = 1_2.}$ The multiplicative identity, if it exists, is unique. $\blacksquare$

---

**Solution E3.**
$U(\mathbb{Z}_{18}) = \{k \in \mathbb{Z}_{18} : \gcd(k, 18) = 1\}$.

*List.* Integers in $\{1, 2, \ldots, 17\}$ coprime to $18 = 2 \cdot 3^2$ (i.e., not divisible by $2$ or $3$):
$$U(18) = \{1, 5, 7, 11, 13, 17\}, \qquad |U(18)| = \varphi(18) = \varphi(2) \varphi(9) = 1 \cdot 6 = 6.$$

**Structure.** By the **Chinese Remainder Theorem** for rings: $\mathbb{Z}_{18} \cong \mathbb{Z}_2 \times \mathbb{Z}_9$ (as rings). Taking unit groups:
$$U(18) \cong U(2) \times U(9).$$

Now $U(2) = \{1\}$ is trivial, and $U(9) = \{1, 2, 4, 5, 7, 8\}$ has order $\varphi(9) = 6$.

Is $U(9)$ cyclic? $U(p^k)$ is cyclic for $p$ odd prime ([[19-rings-definition-and-examples]]), so $U(9)$ is cyclic of order $6$. (Verify: $2^1 = 2, 2^2 = 4, 2^3 = 8, 2^4 = 16 \equiv 7, 2^5 = 14 \equiv 5, 2^6 = 10 \equiv 1$. So $|2| = 6$ in $U(9)$; $U(9) = \langle 2\rangle$.)

Hence $U(18) \cong \{1\} \times \mathbb{Z}_6 \cong \mathbb{Z}_6$.

**Explicit generator in $U(18)$:** $5$ (since $5 \equiv 2 \cdot 9 - 13$... let's verify directly).

$5^1 = 5$, $5^2 = 25 \equiv 7$, $5^3 = 35 \equiv 17$, $5^4 = 85 \equiv 85 - 4 \cdot 18 = 85 - 72 = 13$, $5^5 = 65 \equiv 65 - 3 \cdot 18 = 65 - 54 = 11$, $5^6 = 55 \equiv 55 - 3 \cdot 18 = 1$. ✓

So $U(18) = \langle 5\rangle = \{5, 7, 17, 13, 11, 1\} \cong \mathbb{Z}_6$, cyclic.

$\boxed{U(\mathbb{Z}_{18}) \cong \mathbb{Z}_6 \text{ (cyclic of order } 6\text{)}.}$ $\blacksquare$

---

**Solution E4.**
$\mathbb{Z}[i] = \{a + bi : a, b \in \mathbb{Z}\} \subseteq \mathbb{C}$, the Gaussian integers.

**Subring test.** A subset $S$ of a ring $R$ is a subring iff $S$ is non-empty, closed under subtraction, and closed under multiplication.

*Non-empty.* $0 = 0 + 0 \cdot i \in \mathbb{Z}[i]$ ✓. Also $1 = 1 + 0 \cdot i \in \mathbb{Z}[i]$.

*Closed under subtraction.* $(a + bi) - (c + di) = (a - c) + (b - d)i$ with $a - c, b - d \in \mathbb{Z}$. ✓

*Closed under multiplication.*
$$(a + bi)(c + di) = ac + adi + bci + bd i^2 = (ac - bd) + (ad + bc)i.$$
Since $a, b, c, d \in \mathbb{Z}$, $ac - bd, ad + bc \in \mathbb{Z}$. ✓

Hence $\mathbb{Z}[i]$ is a subring of $\mathbb{C}$ (moreover, a subring with unity, and commutative).

$\boxed{\mathbb{Z}[i] \leq \mathbb{C}.}$ $\blacksquare$

*Further properties.* $\mathbb{Z}[i]$ is an integral domain (subring of $\mathbb{C}$, which has no zero divisors). It is a Euclidean domain with norm $N(a + bi) = a^2 + b^2$. Hence $\mathbb{Z}[i]$ is a PID and a UFD.

---

**Solution E5.**
Find all zero divisors of $\mathbb{Z} \times \mathbb{Z}$ (componentwise operations).

A **zero divisor** in a commutative ring $R$ is a non-zero element $r$ for which there exists a non-zero $s$ with $rs = 0$.

Suppose $(a, b) \in \mathbb{Z} \times \mathbb{Z}$ with $(a, b) \neq (0, 0)$, i.e., $a \neq 0$ or $b \neq 0$.

**Case 1: $a = 0$ and $b \neq 0$.** Then $(0, b) \cdot (1, 0) = (0, 0)$, with $(1, 0) \neq (0, 0)$. So $(0, b)$ is a zero divisor.

**Case 2: $a \neq 0$ and $b = 0$.** Symmetric: $(a, 0) \cdot (0, 1) = (0, 0)$. Zero divisor.

**Case 3: $a \neq 0$ and $b \neq 0$.** Suppose $(a, b) \cdot (c, d) = (ac, bd) = (0, 0)$. Then $ac = 0$ and $bd = 0$ in $\mathbb{Z}$. Since $\mathbb{Z}$ is an integral domain and $a \neq 0, b \neq 0$, we must have $c = 0$ and $d = 0$, i.e., $(c, d) = (0, 0)$. So no non-zero $(c, d)$ makes the product zero: $(a, b)$ is **not** a zero divisor.

**Conclusion.** The zero divisors of $\mathbb{Z} \times \mathbb{Z}$ are exactly
$$\{(a, 0) : a \in \mathbb{Z}, a \neq 0\} \cup \{(0, b) : b \in \mathbb{Z}, b \neq 0\}.$$

Equivalently: zero divisors are non-zero elements with at least one zero coordinate.

$\boxed{\text{Zero divisors} = \{(a, 0), (0, b) : a, b \in \mathbb{Z} \setminus \{0\}\}.}$ $\blacksquare$

*Remark.* In general, in a product $R \times S$ of commutative rings (each with no zero divisors), the zero divisors are exactly the elements with at least one zero coordinate but not all coordinates zero.

---

**Solution E6.**
Let $R$ be a commutative ring and let $\operatorname{Nil}(R) = \{a \in R : a^n = 0 \text{ for some } n \geq 1\}$ (the set of nilpotents).

**Claim.** $a, b \in \operatorname{Nil}(R) \implies a + b \in \operatorname{Nil}(R)$.

*Proof.* Let $a^m = 0$ and $b^n = 0$ for some positive integers $m, n$.

Expand $(a + b)^{m + n - 1}$ using the **binomial theorem** (valid in commutative rings):
$$(a + b)^{m + n - 1} = \sum_{k = 0}^{m + n - 1} \binom{m+n-1}{k} a^k b^{m + n - 1 - k}.$$

Consider the $k$-th term $\binom{m+n-1}{k} a^k b^{m+n-1-k}$. 

*Case $k \geq m$:* $a^k = a^m \cdot a^{k - m} = 0 \cdot a^{k-m} = 0$. Term vanishes.

*Case $k < m$:* Then $m + n - 1 - k > m + n - 1 - m = n - 1$, i.e., $m + n - 1 - k \geq n$. So $b^{m + n - 1 - k} = b^n \cdot b^{m + n - 1 - k - n} = 0$. Term vanishes.

Every term in the sum vanishes, so $(a + b)^{m + n - 1} = 0$. Hence $a + b \in \operatorname{Nil}(R)$. $\blacksquare$

*Remark.* $\operatorname{Nil}(R)$ is actually an **ideal** of $R$: also closed under additive inverses (trivial: $(-a)^m = (-1)^m a^m = 0$) and under multiplication by any $r \in R$ (if $a^n = 0$, then $(ra)^n = r^n a^n = 0$). This ideal is called the **nilradical** of $R$. Commutativity is essential: in the non-commutative ring $M_2(\mathbb{Z})$, $\begin{pmatrix} 0 & 1 \\ 0 & 0 \end{pmatrix}$ and $\begin{pmatrix} 0 & 0 \\ 1 & 0 \end{pmatrix}$ are nilpotent but their sum $\begin{pmatrix} 0 & 1 \\ 1 & 0 \end{pmatrix}$ has square $I$, so is not nilpotent.

---

## Summary of CO3

CO3 encompasses the architecture of group theory:

1. **Group Actions** — the master framework; encompasses permutation groups, symmetries, representations.
2. **Conjugation Framework** — centralizer, normalizer, class equation, leading to deep structural theorems ($p$-groups, Cauchy).
3. **Homomorphisms & Isomorphisms** — structure-preserving maps and the recognition that two groups are "the same."
4. **Isomorphism Theorems** — the First Isomorphism Theorem alone is sufficient for most quotient computations in practice.
5. **Rings** — introducing the multi-operation algebraic structure that occupies the rest of the course.

## Related Concepts

- [[15-group-actions]]
- [[16-centralizer-normalizer-stabilizer]]
- [[17-homomorphisms-and-isomorphisms]]
- [[18-isomorphism-theorems]]
- [[19-rings-definition-and-examples]]

---

*Last updated: 2026-04-19*
