---
title: "Burnside's Theorem and Orbit Counting"
type: guide
co: CO2
related: [12-subgroup-lattice-and-dihedral-groups, 15-group-actions, 16-centralizer-normalizer-stabilizer]
---

# 13. Burnside's Theorem (Cauchy–Frobenius Lemma)

**Burnside's theorem** — more accurately credited to Cauchy and Frobenius (Burnside himself attributed it to Frobenius in his 1897 text) — counts the number of orbits of a group action on a set. It is the foundational tool for answering combinatorial questions like: *How many distinct necklaces can be made with 6 beads and 3 colors?* or *How many ways can we color the faces of a cube with $n$ colors?*

The theorem reduces a hard orbit-counting problem (which often requires enumerating equivalence classes directly — a combinatorial explosion) to a simple averaging computation over the group (which is a sum of $|G|$ fixed-point counts, each of which is usually easy to compute from cycle structure). We present it here with full proof, followed by the classical applications: necklaces, bracelets, cube colorings, and polynomial invariants.

This chapter previews group actions (developed fully in [[15-group-actions]]) using only the definition; the orbit-stabilizer theorem is stated and used. Readers may cross-reference [[15-group-actions]] for the broader theory. The central insight is a beautiful instance of **double counting**: count the same set $S \subseteq G \times X$ of fixed-point pairs in two ways, then equate.

## 13.1 Group Actions — Minimal Definitions

> **Definition 13.1.** Let $G$ be a group, $X$ a set. An **action** of $G$ on $X$ is a map $G \times X \to X$, $(g, x) \mapsto g \cdot x$, satisfying:
>
> 1. $e \cdot x = x$ for all $x \in X$.
> 2. $(gh) \cdot x = g \cdot (h \cdot x)$ for all $g, h \in G$, $x \in X$.

**Equivalent reformulation.** An action is the same data as a group homomorphism $\varphi : G \to \operatorname{Sym}(X)$, defined by $\varphi(g)(x) = g \cdot x$. Axiom 1 says $\varphi(e) = \operatorname{id}_X$; axiom 2 says $\varphi(gh) = \varphi(g) \circ \varphi(h)$. In particular, each $\varphi(g)$ is a bijection of $X$ with inverse $\varphi(g^{-1})$: from $g \cdot (g^{-1} \cdot x) = (g g^{-1}) \cdot x = e \cdot x = x$ and the symmetric computation.

> **Definition 13.2.** For $x \in X$:
> - **Orbit:** $G \cdot x = \{g \cdot x : g \in G\}$ — the set of all points reachable from $x$.
> - **Stabilizer:** $G_x = \{g \in G : g \cdot x = x\}$ — a subgroup of $G$.
>
> For $g \in G$:
> - **Fixed points:** $X^g = \operatorname{Fix}(g) = \{x \in X : g \cdot x = x\}$ — a subset of $X$ (not generally a subgroup of anything).

**Orbits partition $X$.** Define $x \sim y$ iff $y = g \cdot x$ for some $g \in G$. Reflexivity: $x = e \cdot x$. Symmetry: if $y = g \cdot x$ then $x = g^{-1} \cdot y$. Transitivity: if $y = g \cdot x$ and $z = h \cdot y$, then $z = h \cdot (g \cdot x) = (hg) \cdot x$. So $\sim$ is an equivalence relation, and orbits are equivalence classes, which partition $X$.

**Stabilizer is a subgroup.** $e \in G_x$ since $e \cdot x = x$. If $g, h \in G_x$, then $(gh) \cdot x = g \cdot (h \cdot x) = g \cdot x = x$, so $gh \in G_x$. If $g \in G_x$, from $g \cdot x = x$ apply $g^{-1}$: $x = g^{-1} \cdot (g \cdot x) = g^{-1} \cdot x$, so $g^{-1} \in G_x$.

> **Theorem 13.3 (Orbit-Stabilizer).** For finite $G$ acting on $X$, and any $x \in X$:
> $$|G \cdot x| = [G : G_x] = \frac{|G|}{|G_x|}.$$

**Proof.** We construct an explicit bijection
$$\Phi : G/G_x \longrightarrow G \cdot x, \qquad \Phi(gG_x) = g \cdot x,$$
where $G/G_x$ denotes the set of left cosets of $G_x$ in $G$.

*(Step 1) $\Phi$ is well-defined.* If $gG_x = g'G_x$, then $g^{-1}g' \in G_x$, so $(g^{-1}g') \cdot x = x$, so $g' \cdot x = g \cdot (g^{-1}g') \cdot x = g \cdot x$. Hence $\Phi(gG_x) = \Phi(g'G_x)$.

*(Step 2) $\Phi$ is injective.* Suppose $g \cdot x = g' \cdot x$. Then $(g^{-1}g') \cdot x = g^{-1} \cdot (g' \cdot x) = g^{-1} \cdot (g \cdot x) = (g^{-1}g) \cdot x = e \cdot x = x$, so $g^{-1}g' \in G_x$, i.e., $gG_x = g'G_x$.

*(Step 3) $\Phi$ is surjective.* Every element of the orbit has the form $g \cdot x = \Phi(gG_x)$ by definition.

Hence $\Phi$ is a bijection, and $|G \cdot x| = |G/G_x| = [G : G_x] = |G|/|G_x|$ by Lagrange's theorem. $\blacksquare$

**Remark (why this is central).** Orbit-stabilizer links **orbit size** (a combinatorial invariant of a single point's trajectory) to **subgroup index** (a purely algebraic invariant). This duality is the beating heart of Burnside's theorem, and will be used repeatedly in the double-counting proof below.

## 13.2 Burnside's Theorem

> **Theorem 13.4 (Cauchy–Frobenius–Burnside).** Let $G$ be a finite group acting on a finite set $X$. Let $N$ be the number of orbits of this action. Then
> $$N = \frac{1}{|G|} \sum_{g \in G} |X^g|.$$
>
> In words: the number of orbits equals the average number of fixed points over the group.

**Proof.** The strategy is **double counting**. We form the incidence set
$$S = \{(g, x) \in G \times X : g \cdot x = x\} \subseteq G \times X,$$
i.e., the set of $(g, x)$ pairs such that $g$ fixes $x$. We compute $|S|$ in two ways.

**(1) First way — sum over $g$ (fix $g$, count fixed $x$):**

For each fixed $g \in G$, the $x$'s satisfying $(g, x) \in S$ are exactly those in $X^g$. So
$$|S| = \sum_{g \in G} |\{x : (g, x) \in S\}| = \sum_{g \in G} |X^g|. \tag{*}$$

**(2) Second way — sum over $x$ (fix $x$, count fixing $g$):**

For each fixed $x \in X$, the $g$'s satisfying $(g, x) \in S$ are exactly those in $G_x$. So
$$|S| = \sum_{x \in X} |\{g : (g, x) \in S\}| = \sum_{x \in X} |G_x|.$$

By the orbit-stabilizer theorem (Theorem 13.3), $|G_x| = |G| / |G \cdot x|$. Substituting:
$$|S| = \sum_{x \in X} \frac{|G|}{|G \cdot x|} = |G| \sum_{x \in X} \frac{1}{|G \cdot x|}.$$

**(3) Regrouping the sum over orbits.** Since orbits partition $X$, we can rewrite the sum by grouping points in the same orbit:
$$\sum_{x \in X} \frac{1}{|G \cdot x|} = \sum_{\mathcal{O} \text{ orbit}} \sum_{x \in \mathcal{O}} \frac{1}{|\mathcal{O}|}.$$

Within each orbit $\mathcal{O}$, every $x \in \mathcal{O}$ has $|G \cdot x| = |\mathcal{O}|$ (same orbit → same size). So the inner sum is
$$\sum_{x \in \mathcal{O}} \frac{1}{|\mathcal{O}|} = |\mathcal{O}| \cdot \frac{1}{|\mathcal{O}|} = 1.$$

Therefore
$$\sum_{x \in X} \frac{1}{|G \cdot x|} = \sum_{\mathcal{O} \text{ orbit}} 1 = N.$$

Hence
$$|S| = |G| \cdot N. \tag{**}$$

**(4) Equate and solve.** From $(*)$ and $(**)$:
$$\sum_{g \in G} |X^g| = |G| \cdot N.$$

Dividing by $|G|$:
$$\boxed{N = \frac{1}{|G|} \sum_{g \in G} |X^g|}. \qquad \blacksquare$$

**Sanity check (before any examples).** The right-hand side must be a non-negative integer. The sum is at least $|X^e| = |X|$ (taking just $g = e$), so $N \geq |X|/|G|$. Also $N \leq |X|$ (orbits partition $X$ into non-empty subsets). Both bounds are satisfied.

**Remark (why the proof works).** The key is that orbit-stabilizer converts $|G_x|$ (which depends intricately on $x$) into the reciprocal of orbit size. Summing reciprocals over an orbit telescopes to $1$ — an elegant cancellation that gives the orbit count *exactly*. Without orbit-stabilizer, the sum $\sum_x |G_x|$ would have no obvious combinatorial interpretation.

**Remark (historical/credit).** The identity is due independently to Frobenius (1887) and earlier Cauchy. Burnside included it in his 1897 textbook *Theory of Groups of Finite Order*, attributing it to Frobenius; later textbooks called it "Burnside's lemma" — hence the dual naming.

## 13.3 First Example: Coloring Corners of a Square

**Problem.** How many distinct ways are there to color the 4 corners of a square with 2 colors (say black $B$ and white $W$), where two colorings are considered equivalent if one can be rotated or reflected into the other?

**Setup.** 
- $X = \{(c_1, c_2, c_3, c_4) : c_i \in \{B, W\}\}$, so $|X| = 2^4 = 16$.
- $G = D_4 = \{e, r, r^2, r^3, s, rs, r^2s, r^3s\}$, with $|G| = 8$.
- $G$ acts on $X$ by permuting coordinate labels (e.g., rotation $r$ sends corner $1 \to 2 \to 3 \to 4 \to 1$; so $r \cdot (c_1, c_2, c_3, c_4) = (c_4, c_1, c_2, c_3)$).

**Strategy.** For each $g \in G$, determine the permutation of $\{1,2,3,4\}$ that $g$ induces, decompose it into disjoint cycles, and count fixed colorings: a coloring is fixed by $g$ iff every cycle of $g$ is monochromatic (all corners in a cycle have the same color). Hence
$$|X^g| = c^{\#\text{cycles of } g}$$
where $c = 2$ is the number of colors. This is the **cycle-index principle**.

**Count fixed points for each $g \in D_4$** — label corners $1, 2, 3, 4$ clockwise.

| $g$ | Permutation of corners | Cycle decomposition | # cycles | $|X^g| = 2^{\#\text{cyc}}$ |
|---|---|---|---|---|
| $e$ | identity | $(1)(2)(3)(4)$ | 4 | $2^4 = 16$ |
| $r$ (rot $90°$) | $1\to2\to3\to4\to1$ | $(1\,2\,3\,4)$ | 1 | $2^1 = 2$ |
| $r^2$ (rot $180°$) | $1\leftrightarrow3, 2\leftrightarrow4$ | $(1\,3)(2\,4)$ | 2 | $2^2 = 4$ |
| $r^3$ (rot $270°$) | $1\to4\to3\to2\to1$ | $(1\,4\,3\,2)$ | 1 | $2^1 = 2$ |
| $s$ (horizontal flip) | $1\leftrightarrow2, 3\leftrightarrow4$ | $(1\,2)(3\,4)$ | 2 | $2^2 = 4$ |
| $rs$ (diagonal: $1$–$3$ axis) | $1, 3$ fixed; $2\leftrightarrow4$ | $(1)(3)(2\,4)$ | 3 | $2^3 = 8$ |
| $r^2 s$ (vertical flip) | $1\leftrightarrow4, 2\leftrightarrow3$ | $(1\,4)(2\,3)$ | 2 | $2^2 = 4$ |
| $r^3 s$ (diagonal: $2$–$4$ axis) | $2, 4$ fixed; $1\leftrightarrow3$ | $(2)(4)(1\,3)$ | 3 | $2^3 = 8$ |

**Verification of axis count.** $D_4$ has two types of reflection axes for a square: through opposite edges (2 axes: horizontal, vertical — each fixes no corners) and through opposite corners (2 axes — each fixes 2 corners). Total $2 + 2 = 4$ reflections, $4$ rotations = $8 = |D_4|$. ✓

**Sum of fixed-point counts:**
$$\sum_{g \in G} |X^g| = 16 + 2 + 4 + 2 + 4 + 8 + 4 + 8 = 48.$$

**Apply Burnside:**
$$N = \frac{1}{|G|} \sum_{g} |X^g| = \frac{48}{8} = 6.$$

**Interpretation — enumerate the 6 orbits explicitly** (sanity check):
1. All 4 corners $W$ — 1 coloring in orbit.
2. All 4 corners $B$ — 1 coloring.
3. One $B$ corner, three $W$ — 4 rotations, but $D_4$ includes reflections, so all 4 are equivalent; 1 orbit.
4. Two adjacent corners $B$, two $W$ — $D_4$ makes all such configurations equivalent; 1 orbit.
5. Two opposite corners $B$, two $W$ — 1 orbit.
6. Three $B$ corners, one $W$ — 1 orbit (dual of case 3).

Total: $6$ orbits. ✓

So **6 distinct square colorings** with 2 colors, up to rotation and reflection. $\boxed{6}$

## 13.4 Key Identity: Fixed Points of a Rotation on an $n$-Necklace

Consider the cyclic group $\mathbb{Z}_n = \langle r \rangle$ acting on the set $X = [c]^n$ of $c$-colorings of $n$ beads arranged in a circle, where $r$ rotates positions by $1$: $r \cdot (x_1, x_2, \ldots, x_n) = (x_n, x_1, \ldots, x_{n-1})$ — equivalently, $r^k$ cycles position $i$ to position $i + k \pmod n$.

**Claim.** The permutation $r^k$ decomposes into $\gcd(n, k)$ disjoint cycles, each of length $n / \gcd(n, k)$.

*Proof.* Let $d = \gcd(n, k)$. The orbit of position $i$ under $r^k$ is $\{i, i + k, i + 2k, \ldots\} \pmod n$. This is a coset of the subgroup $\langle k \rangle = d\mathbb{Z}_n$ of $\mathbb{Z}_n$, which has order $n/d$. So each cycle has length $n/d$, and there are $d$ such cycles partitioning $\{0, 1, \ldots, n-1\}$. ✓

**Fixed colorings.** A coloring is fixed by $r^k$ iff it is constant on each orbit of $r^k$. Since each orbit has $n/d$ elements and there are $d$ orbits, and we choose a color for each:
$$|\operatorname{Fix}(r^k)| = c^d = c^{\gcd(n, k)}.$$

> **Key identity 13.5.** For cyclic action of $\mathbb{Z}_n$ on $n$-bead colorings with $c$ colors:
> $$|\operatorname{Fix}(r^k)| = c^{\gcd(n, k)}.$$

**Number of necklaces (cyclic only):**
$$N_{\text{cyc}} = \frac{1}{n} \sum_{k=0}^{n-1} c^{\gcd(n, k)}.$$

**Regrouping by $d$.** For each divisor $d \mid n$, the values $k \in \{0, 1, \ldots, n-1\}$ with $\gcd(n, k) = d$ are exactly $k = d j$ where $0 \leq j < n/d$ and $\gcd(j, n/d) = 1$. The number of such $j$ is $\varphi(n/d)$ (Euler totient). So
$$N_{\text{cyc}} = \frac{1}{n} \sum_{d \mid n} \varphi(n/d) \cdot c^d.$$

**Example 1 — Cyclic necklaces with 6 beads, 2 colors.**

Divisors of $6$: $d \in \{1, 2, 3, 6\}$. Using $\varphi(1) = 1, \varphi(2) = 1, \varphi(3) = 2, \varphi(6) = 2$:

| $d$ | $n/d$ | $\varphi(n/d)$ | $c^d = 2^d$ | $\varphi(n/d) \cdot c^d$ |
|---|---|---|---|---|
| $1$ | $6$ | $\varphi(6) = 2$ | $2$ | $4$ |
| $2$ | $3$ | $\varphi(3) = 2$ | $4$ | $8$ |
| $3$ | $2$ | $\varphi(2) = 1$ | $8$ | $8$ |
| $6$ | $1$ | $\varphi(1) = 1$ | $64$ | $64$ |

Sum: $4 + 8 + 8 + 64 = 84$.

$$N_{\text{cyc}} = \frac{84}{6} = 14.$$

**Verification of totient sum.** $\sum_{d \mid 6} \varphi(6/d) = \varphi(6) + \varphi(3) + \varphi(2) + \varphi(1) = 2 + 2 + 1 + 1 = 6 = n$. ✓ (This is the classical identity $\sum_{d \mid n} \varphi(d) = n$.)

So 14 distinct 2-color cyclic necklaces on 6 beads. $\boxed{14}$

## 13.5 Bracelets: Necklaces with Reflection

For **bracelets**, the group is $D_n$ (rotations plus reflections), so we add reflection contributions to the rotation sum.

**Reflection fixed points — cycle analysis.**

*If $n$ is **odd**:* Every reflection axis passes through one bead and the midpoint of the opposite edge. Under the reflection, that single bead is fixed, and the remaining $n - 1$ beads are paired into $(n-1)/2$ transpositions (each bead swapped with its mirror image). Cycle count: $1 + (n-1)/2 = (n+1)/2$. Fixed colorings: $c^{(n+1)/2}$. Count of such reflections: $n$.

*If $n$ is **even**:* Two types of axes.
- **Edge-axis reflections** ($n/2$ of them): axis passes through midpoints of two opposite edges. No bead is fixed; all $n$ beads paired into $n/2$ transpositions. Cycle count: $n/2$. Fixed colorings: $c^{n/2}$.
- **Vertex-axis reflections** ($n/2$ of them): axis passes through two opposite beads. These two beads are fixed; remaining $n - 2$ beads form $(n-2)/2$ transpositions. Cycle count: $2 + (n-2)/2 = n/2 + 1$. Fixed colorings: $c^{n/2 + 1}$.

Summarizing ($n$ even):

| Type | # reflections | $|X^g|$ |
|---|---|---|
| Vertex-axis (fixes 2 beads) | $n/2$ | $c^{n/2 + 1}$ |
| Edge-axis (fixes 0 beads) | $n/2$ | $c^{n/2}$ |

**Example 2 — Bracelets with 6 beads, 2 colors.** $n = 6$ even, $c = 2$, $|D_6| = 12$.

*Rotation contribution* (from §13.4): 
$$\sum_{k = 0}^{5} 2^{\gcd(6, k)} = 4 + 8 + 8 + 64 = 84.$$

More explicitly:
- $k = 0$: $\gcd = 6$, $2^6 = 64$.
- $k = 1$: $\gcd = 1$, $2^1 = 2$.
- $k = 2$: $\gcd = 2$, $2^2 = 4$.
- $k = 3$: $\gcd = 3$, $2^3 = 8$.
- $k = 4$: $\gcd = 2$, $2^2 = 4$.
- $k = 5$: $\gcd = 1$, $2^1 = 2$.

Sum: $64 + 2 + 4 + 8 + 4 + 2 = 84$. ✓

*Reflection contribution* ($n = 6$ even):
- Vertex-axis reflections ($n/2 = 3$): each has $|X^g| = c^{n/2 + 1} = 2^4 = 16$. Total: $3 \cdot 16 = 48$.
- Edge-axis reflections ($n/2 = 3$): each has $|X^g| = c^{n/2} = 2^3 = 8$. Total: $3 \cdot 8 = 24$.

*Total sum:* $84 + 48 + 24 = 156$.

$$N_{\text{brac}} = \frac{156}{12} = 13.$$

So **13 distinct 2-color bracelets on 6 beads**. $\boxed{13}$

**Interpretation.** One fewer than cyclic necklaces ($N_{\text{cyc}} = 14$). The cyclic case distinguishes a pattern from its mirror image; adding reflections merges exactly one such pair. Concretely, the pattern $BBWBWW$ is mirror-distinct from $BWWBWB$ as a cyclic necklace but they fuse to the same bracelet. (All other patterns on 6 beads with 2 colors turn out to be equal to their own mirror image as cyclic necklaces, i.e., palindromic under some rotation.)

## 13.6 Cube Face Coloring

**Problem.** Count distinct ways to color the 6 faces of a cube with $n$ colors, where rotations (not reflections) of the cube are considered equivalent.

**The rotation group $R$ of the cube has order 24.** This equals the number of face-to-face orientations: 6 choices for which face is on top, then 4 rotations around the vertical axis = $6 \cdot 4 = 24$. Equivalently, $R \cong S_4$ (via action on the 4 long diagonals of the cube).

**Enumeration by axis type:**

| Type | Description | Count | Action on faces | Cycle structure on 6 faces | Fixed faces per element |
|---|---|---|---|---|---|
| Identity $e$ | No rotation | $1$ | trivial | $1^6$ (6 fixed) | $n^6$ |
| Face-axis $\pm 90°$ | Axis through centers of two opposite faces; rotate $\pm 90°$ | $3 \cdot 2 = 6$ | top/bottom fixed, 4 sides cycle | $1^2 \cdot 4^1$ | $n^3$ |
| Face-axis $180°$ | Axis through centers of two opposite faces; rotate $180°$ | $3$ | top/bottom fixed, 2 pairs of opposite sides swap | $1^2 \cdot 2^2$ | $n^4$ |
| Vertex-axis $\pm 120°$ | Axis through two opposite vertices; rotate $\pm 120°$ | $4 \cdot 2 = 8$ | faces cycle in two 3-cycles | $3^2$ | $n^2$ |
| Edge-axis $180°$ | Axis through midpoints of two opposite edges; rotate $180°$ | $6$ | 3 pairs of faces swapped | $2^3$ | $n^3$ |

**Total rotation count:** $1 + 6 + 3 + 8 + 6 = 24$. ✓

**Justification of counts.**
- Face-axes: there are 3 pairs of opposite faces (top-bottom, left-right, front-back), hence 3 axes. Each contributes rotations by $\pm 90°$ (giving 2 nontrivial elements) and $180°$ (1 element), so $3 \times 3 = 9$ face-axis rotations — matching $6 + 3 = 9$. ✓
- Vertex-axes: 4 pairs of opposite vertices, hence 4 axes. Each gives $\pm 120°$ (2 elements), so $4 \times 2 = 8$. ✓
- Edge-axes: 6 pairs of opposite edges (the cube has 12 edges, paired into 6 opposite pairs), hence 6 axes. Each gives only a $180°$ rotation (since rotation by other angles would not preserve the cube), so $6 \times 1 = 6$. ✓

**Justification of cycle structures on faces.**

*Face-axis $\pm 90°$.* Fix the top and bottom faces (they lie on the axis). The four side faces (front, right, back, left) cycle $F \to R \to B \to L \to F$ — a $4$-cycle. Cycle type on faces: $1 + 1 + 4$, i.e., 3 disjoint cycles. Fixed colorings: $n^3$.

*Face-axis $180°$.* Top/bottom fixed; side faces swap in pairs: front $\leftrightarrow$ back, left $\leftrightarrow$ right. Cycle type: $1 + 1 + 2 + 2 = $ 4 cycles. Fixed colorings: $n^4$.

*Vertex-axis $\pm 120°$.* The axis through opposite vertices $v, v'$ passes through no face centers. The three faces meeting at $v$ cycle among themselves; the three faces meeting at $v'$ cycle among themselves (in the opposite direction). Cycle type: $3 + 3 = 2$ cycles. Fixed colorings: $n^2$.

*Edge-axis $180°$.* The axis through midpoints of two opposite edges. The two faces sharing edge near $v$ swap with the two faces sharing edge near $v'$... more precisely, 3 pairs of faces swap (a bit of care is needed to visualize — e.g., the axis through midpoints of top-front and bottom-back edges swaps top↔front, bottom↔back, left↔right). Cycle type: $2 + 2 + 2 = 3$ cycles. Fixed colorings: $n^3$.

**Sum of fixed-point counts:**
$$\sum_{g \in R} |X^g| = \underbrace{1 \cdot n^6}_{e} + \underbrace{6 \cdot n^3}_{\pm 90° \text{ face}} + \underbrace{3 \cdot n^4}_{180° \text{ face}} + \underbrace{8 \cdot n^2}_{\pm 120° \text{ vertex}} + \underbrace{6 \cdot n^3}_{180° \text{ edge}} = n^6 + 3n^4 + 12n^3 + 8n^2.$$

**Number of orbits:**
$$N(n) = \frac{n^6 + 3n^4 + 12n^3 + 8n^2}{24}.$$

**Specific values.**

*$n = 1$:* $N = (1 + 3 + 12 + 8)/24 = 24/24 = 1$. ✓ (A single color: one coloring.)

*$n = 2$:* 
$$N = \frac{64 + 48 + 96 + 32}{24} = \frac{240}{24} = 10.$$
**10 cube colorings with 2 colors.**

Sanity: total colorings without equivalence is $2^6 = 64$; average orbit size $= 64/10 = 6.4$, plausibly between $1$ (a pure color) and $24$ (the maximum orbit size $|R|$).

*$n = 3$:* 
$$N = \frac{729 + 243 + 324 + 72}{24} = \frac{1368}{24} = 57.$$

*$n = 6$:* 
$$N = \frac{46656 + 3888 + 2592 + 288}{24} = \frac{53424}{24} = 2226.$$

**Consistency check.** The polynomial $(n^6 + 3n^4 + 12n^3 + 8n^2)/24$ must yield integers for every positive integer $n$; this is automatic from Burnside's theorem (the RHS *is* the orbit count, an integer). Factor: $n^2(n^4 + 3n^2 + 12n + 8)/24$ — the $n^2$ reflects that any two-face constant coloring (same color on all 6 faces) gives a 1-orbit fixed by everything; 2 colors give... well, the factorization is cosmetic.

## 13.7 Quick Sanity Checks

**Check 1 (Trivial action).** If $g \cdot x = x$ for all $g, x$ (the action is trivial), every $g$ fixes every $x$: $|X^g| = |X|$ for all $g$. Burnside gives
$$N = \frac{1}{|G|} \sum_{g} |X| = \frac{|G| \cdot |X|}{|G|} = |X|.$$
Each point is its own orbit. ✓

**Check 2 (Transitive action).** If the action is transitive (single orbit), Burnside says $1 = \frac{1}{|G|} \sum_g |X^g|$, i.e., **the average number of fixed points is 1**. This is often used as a test: if we suspect an action is transitive, we compute the average fixed-point count and verify it equals $1$. If the average exceeds $1$, there must be $\geq 2$ orbits.

**Check 3 (Free action).** An action is **free** if $G_x = \{e\}$ for all $x$, i.e., only the identity fixes any point. Then $|X^g| = 0$ for $g \neq e$ and $|X^e| = |X|$, so
$$N = \frac{|X| + 0 + \cdots + 0}{|G|} = \frac{|X|}{|G|}.$$
Every orbit has size $|G|$ (maximum possible). This is consistent with orbit-stabilizer: $|G \cdot x| = |G|/|G_x| = |G|/1 = |G|$.

**Check 4 (Regular action).** The action of $G$ on itself by left multiplication ($g \cdot h = gh$) is both free and transitive, so $N = 1 = |G|/|G|$. ✓

## 13.8 Applications to Polynomial Invariants

Burnside counts **orbits** — which correspond to **invariants**. If $G$ acts on polynomials by permuting variables (e.g., $S_n$ on $\mathbb{C}[x_1, \ldots, x_n]$), the number of orbits of monomials of fixed degree equals the number of linearly independent $G$-symmetric monomials of that degree, which forms a basis for the degree-$d$ component of the invariant ring $\mathbb{C}[x_1, \ldots, x_n]^G$.

**Example: $S_3$ acting on degree-2 monomials in three variables.** Monomials of degree 2 in $x_1, x_2, x_3$: $\{x_1^2, x_2^2, x_3^2, x_1 x_2, x_1 x_3, x_2 x_3\}$, six in total. $S_3$ acts by permuting indices. Orbits:
- $\{x_1^2, x_2^2, x_3^2\}$ — size 3, represents $\sum x_i^2$.
- $\{x_1 x_2, x_1 x_3, x_2 x_3\}$ — size 3, represents $\sum_{i < j} x_i x_j$.

So 2 orbits → 2 invariants: $e_1^2$ and $e_2$ (elementary symmetric polynomials), consistent with the structure of the invariant ring.

This is a gateway to **Pólya enumeration**, which refines Burnside by assigning weights to colors and tracking them via the cycle index polynomial of $G$. A beautiful generalization, but beyond our scope here.

## 13.9 Pólya's Cycle Index (Preview)

> **Definition 13.6 (Cycle index).** For a permutation $\sigma$ on $n$ objects with $a_i(\sigma)$ cycles of length $i$ (so $\sum_i i \cdot a_i(\sigma) = n$), the **cycle-type monomial** is $z_1^{a_1(\sigma)} z_2^{a_2(\sigma)} \cdots z_n^{a_n(\sigma)}$. The **cycle index** of a permutation group $G \subseteq S_n$ is
> $$Z_G(z_1, \ldots, z_n) = \frac{1}{|G|} \sum_{\sigma \in G} z_1^{a_1(\sigma)} z_2^{a_2(\sigma)} \cdots z_n^{a_n(\sigma)}.$$

**Pólya's theorem (brief).** The number of distinct colorings with $c$ colors is $Z_G(c, c, \ldots, c)$. This follows directly from Burnside: each $\sigma$ fixes $c^{\sum_i a_i(\sigma)}$ colorings (one color per cycle), and the number of cycles is $\sum_i a_i(\sigma)$. Evaluating the cycle index at $(c, c, \ldots, c)$ gives
$$Z_G(c, \ldots, c) = \frac{1}{|G|} \sum_{\sigma \in G} c^{\sum_i a_i(\sigma)} = \frac{1}{|G|} \sum_{\sigma \in G} |X^\sigma|,$$
which is exactly Burnside's formula with $X = [c]^n$. ✓

**Example: cycle index of $D_4$ acting on 4 square corners.** From §13.3:
$$Z_{D_4}(z_1, z_2, z_3, z_4) = \frac{1}{8}\left(z_1^4 + 2 z_4 + z_2^2 + 2 z_1^2 z_2 + 2 z_1^2 z_2\right).$$

Wait — let me recount from the table in §13.3:
- $e$: cycle type $1^4$ → $z_1^4$.
- $r, r^3$: cycle type $4^1$ → $z_4$ each; 2 elements.
- $r^2$: cycle type $2^2$ → $z_2^2$.
- $s, r^2 s$ (edge reflections): cycle type $2^2$ → $z_2^2$ each; 2 elements.
- $rs, r^3 s$ (vertex/diagonal reflections): cycle type $1^2 \cdot 2^1$ → $z_1^2 z_2$ each; 2 elements.

$$Z_{D_4}(z_1, z_2, z_3, z_4) = \frac{1}{8}\left(z_1^4 + 2 z_4 + 3 z_2^2 + 2 z_1^2 z_2\right).$$

Evaluating at $z_1 = z_2 = z_3 = z_4 = 2$:
$$Z_{D_4}(2, 2, 2, 2) = \frac{1}{8}(16 + 2 \cdot 2 + 3 \cdot 4 + 2 \cdot 4 \cdot 2) = \frac{1}{8}(16 + 4 + 12 + 16) = \frac{48}{8} = 6. \checkmark$$

Matches §13.3.

## 13.10 Practice Problems

**Problem 1.** How many distinct ways to color the vertices of an equilateral triangle with 3 colors, considering $D_3$ symmetry?

**Problem 2.** Count the 3-color necklaces of length 5 (cyclic group $\mathbb{Z}_5$ acting).

**Problem 3.** Count the 2-color bracelets of length 4.

**Problem 4.** How many ways to color the edges of a square with 2 colors, up to $D_4$?

**Problem 5.** Derive the count of distinct cube vertex colorings with $n$ colors under rotation.

**Problem 6.** Use Burnside to count the orbits of $\mathbb{Z}_3$ acting on $\{1, 2, 3\} \times \{1, 2, 3\}$ by diagonal $(x, y) \mapsto (x+1, y+1)$ (mod 3).

**Problem 7.** Count the number of distinct ways to tile a $2 \times 3$ board with uniform $1 \times 1$ tiles colored in 2 colors, up to $D_2 = V_4$ symmetry (horizontal/vertical flips).

### Solutions

---

**Solution 1.** Triangle vertex colorings with 3 colors under $D_3$.

**Setup.** $X = \{(c_1, c_2, c_3) : c_i \in \{1, 2, 3\}\}$, so $|X| = 3^3 = 27$. Group $G = D_3 = \{e, r, r^2, s_1, s_2, s_3\}$, where $r$ is rotation by $120°$ and $s_1, s_2, s_3$ are the three reflections (each fixes one vertex and swaps the other two). $|G| = 6$.

**Strategy.** Decompose each $g$'s action on the three vertices into disjoint cycles, then compute $|X^g| = 3^{\#\text{cycles}}$.

**Fixed-point count for each $g$:**

| $g$ | Cycle structure on vertices | # cycles | $|X^g| = 3^{\#\text{cyc}}$ |
|---|---|---|---|
| $e$ | $(1)(2)(3)$ | $3$ | $3^3 = 27$ |
| $r$ | $(1\,2\,3)$ | $1$ | $3^1 = 3$ |
| $r^2$ | $(1\,3\,2)$ | $1$ | $3^1 = 3$ |
| $s_1$ (fixes vertex 1) | $(1)(2\,3)$ | $2$ | $3^2 = 9$ |
| $s_2$ (fixes vertex 2) | $(2)(1\,3)$ | $2$ | $3^2 = 9$ |
| $s_3$ (fixes vertex 3) | $(3)(1\,2)$ | $2$ | $3^2 = 9$ |

**Sum:** $27 + 3 + 3 + 9 + 9 + 9 = 60$.

**Burnside:**
$$N = \frac{60}{6} = 10.$$

**Verification by direct enumeration.** Distinct triangle colorings with colors from $\{A, B, C\}$ under $D_3$:
- All three same: $AAA, BBB, CCC$ — 3 orbits.
- Exactly two colors used: pick the two colors ($\binom{3}{2} = 3$ ways) and the count is: within $\{A, B\}$, patterns like $AAB, ABB$ are all equivalent under $D_3$ (any single-odd-one-out position can be rotated/reflected to any other), so 2 orbits per pair × 3 pairs = 6 orbits.
- All three colors used: pattern $ABC$ (one of each). Under rotations alone this gives 2 orbits ($ABC$ vs. $ACB$), but reflections identify them: so 1 orbit.

Total: $3 + 6 + 1 = 10$. ✓

$\boxed{10}$

---

**Solution 2.** 3-color necklaces of length 5 under $\mathbb{Z}_5$.

**Setup.** $X = [3]^5$, $|X| = 3^5 = 243$. $G = \mathbb{Z}_5 = \langle r \rangle$, $|G| = 5$.

**Strategy.** Apply the necklace formula from §13.4: $N_{\text{cyc}} = \frac{1}{n} \sum_{d \mid n} \varphi(n/d) c^d$ with $n = 5, c = 3$.

**Divisors of 5:** $d \in \{1, 5\}$. Totients: $\varphi(1) = 1, \varphi(5) = 4$.

| $d$ | $n/d$ | $\varphi(n/d)$ | $c^d = 3^d$ | Contribution |
|---|---|---|---|---|
| $1$ | $5$ | $4$ | $3$ | $12$ |
| $5$ | $1$ | $1$ | $243$ | $243$ |

Sum: $12 + 243 = 255$.

$$N_{\text{cyc}} = \frac{255}{5} = 51.$$

**Direct interpretation.**
- $k = 0$ (identity): $|\operatorname{Fix}| = 3^5 = 243$.
- $k = 1, 2, 3, 4$ (non-identity rotations): each has $\gcd(5, k) = 1$ (since 5 prime), so $|\operatorname{Fix}| = 3^1 = 3$ each. Total: $4 \cdot 3 = 12$.

Sum: $243 + 12 = 255$. $N = 51$. ✓

**Sanity.** $51 \cdot 5 = 255 < 243 \cdot 5 = 1215$. But we expect $N \approx 243/5 \approx 48.6$ for a generic action (one orbit per 5 configurations), adjusted upward by the 3 "constant necklaces" (each fixed by all rotations, orbit size 1). Indeed, 3 constant necklaces + rest of orbit size 5: $3 + (243 - 3)/5 = 3 + 48 = 51$. ✓

$\boxed{51}$

---

**Solution 3.** 2-color bracelets of length 4.

**Setup.** $X = \{0, 1\}^4$, $|X| = 2^4 = 16$. $G = D_4$, $|G| = 8$.

**Strategy.** Compute fixed points for all 8 elements of $D_4$.

*Rotations.* Using $|\operatorname{Fix}(r^k)| = 2^{\gcd(4, k)}$:

| $k$ | $\gcd(4, k)$ | $|\operatorname{Fix}(r^k)|$ |
|---|---|---|
| $0$ | $4$ | $16$ |
| $1$ | $1$ | $2$ |
| $2$ | $2$ | $4$ |
| $3$ | $1$ | $2$ |

Rotation sum: $16 + 2 + 4 + 2 = 24$.

*Reflections* ($n = 4$ even):
- $n/2 = 2$ **vertex-axis** reflections (through opposite beads), fixing 2 beads: $|X^g| = 2^{n/2 + 1} = 2^3 = 8$ each. Contribution: $2 \cdot 8 = 16$.
- $n/2 = 2$ **edge-axis** reflections (through midpoints of opposite edges), fixing 0 beads: $|X^g| = 2^{n/2} = 2^2 = 4$ each. Contribution: $2 \cdot 4 = 8$.

Reflection sum: $16 + 8 = 24$.

**Total sum:** $24 + 24 = 48$.

**Burnside:**
$$N = \frac{48}{8} = 6.$$

**Enumerate orbits for verification.**
1. $WWWW$ (all white).
2. $BBBB$ (all black).
3. $BWWW$ (one B): all 4 rotations + reflections merge.
4. $BBWW$ (two adjacent B): one orbit.
5. $BWBW$ (two opposite B): one orbit.
6. $BBBW$ (three B): one orbit.

Total: 6 orbits. ✓

$\boxed{6}$

---

**Solution 4.** Edge colorings of a square with 2 colors under $D_4$.

**Setup.** Label edges $1, 2, 3, 4$ going clockwise (edge $i$ is between corner $i$ and corner $i+1$). $X = \{0, 1\}^4$, $|X| = 16$. $G = D_4$ acts on edges via the induced permutation from its action on corners.

**Strategy.** Determine the permutation on edges for each $g \in D_4$, find cycle structure, compute $|X^g| = 2^{\#\text{cyc}}$.

**Action on edges:**

| $g$ | Action on corners | Induced action on edges | Cycle structure on edges | $|X^g|$ |
|---|---|---|---|---|
| $e$ | identity | identity | $(1)(2)(3)(4)$ | $2^4 = 16$ |
| $r$ | $1\to2\to3\to4\to1$ | $1\to2\to3\to4\to1$ | $(1\,2\,3\,4)$ | $2^1 = 2$ |
| $r^2$ | $1\leftrightarrow3, 2\leftrightarrow4$ | $1\leftrightarrow3, 2\leftrightarrow4$ | $(1\,3)(2\,4)$ | $2^2 = 4$ |
| $r^3$ | reverse rotation | $1\to4\to3\to2\to1$ | $(1\,4\,3\,2)$ | $2^1 = 2$ |
| $s$ (horizontal flip) | $1\leftrightarrow2, 3\leftrightarrow4$ | edges $1 (=12), 3(=34)$ fixed; $2(=23) \leftrightarrow 4(=41)$ | $(1)(3)(2\,4)$ | $2^3 = 8$ |
| $r^2 s$ (vertical flip) | $1\leftrightarrow4, 2\leftrightarrow3$ | edges $2, 4$ fixed; $1 \leftrightarrow 3$ | $(2)(4)(1\,3)$ | $2^3 = 8$ |
| $rs$ (diagonal $1$-$3$) | $2\leftrightarrow4$ | edges $1 \leftrightarrow 4, 2 \leftrightarrow 3$ | $(1\,4)(2\,3)$ | $2^2 = 4$ |
| $r^3 s$ (diagonal $2$-$4$) | $1\leftrightarrow3$ | edges $1 \leftrightarrow 2, 3 \leftrightarrow 4$ | $(1\,2)(3\,4)$ | $2^2 = 4$ |

**Careful check on $s$ (horizontal flip).** The horizontal flip swaps corner 1↔2 and corner 3↔4. Edge 1 is between corners 1–2; after the flip, it's still between corners 2–1 = 1–2, so edge 1 is fixed. Edge 2 is between corners 2–3; after flip, it's between corners 1–4, which is edge 4. So $2 \leftrightarrow 4$. Edge 3 (between 3–4) maps to edge between 4–3 = edge 3, fixed. Edge 4 (between 4–1) maps to edge between 3–2 = edge 2. So $s$: $(1)(3)(2\,4)$. ✓ (Note this is different from the corner case where $s$ gave $(1\,2)(3\,4)$.)

**Careful check on $rs$ (diagonal reflection through corners 1 and 3).** This reflection fixes corners 1 and 3, swaps corners 2 and 4. So edge 1 (between 1–2) maps to edge between 1–4, which is edge 4. Edge 2 (between 2–3) maps to edge between 4–3, which is edge 3. Edge 3 maps to edge 2; edge 4 maps to edge 1. So $rs$: $(1\,4)(2\,3)$. ✓

**Sum of fixed-point counts:**
$$\sum_{g} |X^g| = 16 + 2 + 4 + 2 + 8 + 8 + 4 + 4 = 48.$$

**Burnside:**
$$N = \frac{48}{8} = 6.$$

$\boxed{6}$

**Remark.** Coincidentally, the same answer as square-corner coloring (§13.3) and as 4-bead bracelets (Problem 3) — all three give 6. This is not a deep coincidence: the induced action of $D_4$ on 4 edges has the same cycle index as on 4 corners (the edges and corners are both regular $D_4$-sets of size 4 in their own right), so their orbit counts agree for any number of colors.

---

**Solution 5.** Cube vertex colorings with $n$ colors under rotation.

**Setup.** The cube has $8$ vertices. $X = [n]^8$, $|X| = n^8$. Rotation group $R$ of the cube, $|R| = 24$.

**Strategy.** Determine the cycle structure of each $g \in R$ acting on the 8 vertices.

**Cube rotations acting on vertices:**

| Type | # | Action on 8 vertices | Cycle structure | Fixed colorings |
|---|---|---|---|---|
| Identity | 1 | trivial | $1^8$ | $n^8$ |
| Face-axis $\pm 90°$ | 6 | Axis through 2 opposite face centers; 4 vertices in top face cycle, 4 in bottom face cycle | $4^2$ | $n^2$ |
| Face-axis $180°$ | 3 | Top-face vertices swap in 2 pairs, bottom-face vertices swap in 2 pairs | $2^4$ | $n^4$ |
| Vertex-axis $\pm 120°$ | 8 | Axis through 2 opposite vertices (fixed); remaining 6 vertices in two 3-cycles | $1^2 \cdot 3^2$ | $n^4$ |
| Edge-axis $180°$ | 6 | No fixed vertices; 4 pairs of vertices swap | $2^4$ | $n^4$ |

**Justifications of cycle structures.**

*Face-axis $\pm 90°$.* The axis through two opposite face centers passes through no vertex. The four vertices of the "top" face lie on a circle and rotate by $90°$ — a 4-cycle. Same for the "bottom" face — another 4-cycle. No fixed vertex. Cycle type: $4 + 4$, so 2 cycles.

*Face-axis $180°$.* Same axis as above, but rotate $180°$. Each 4-cycle on top/bottom becomes two 2-cycles (a 4-cycle squared = two 2-cycles). No fixed vertex. Cycle type: $2 + 2 + 2 + 2$, so 4 cycles.

*Vertex-axis $\pm 120°$.* The axis through opposite vertices $v, v'$ fixes both $v$ and $v'$. The three vertices adjacent to $v$ form an equilateral triangle and are cyclically permuted — a 3-cycle. Similarly the three vertices adjacent to $v'$ form another 3-cycle. Cycle type: $1 + 1 + 3 + 3$, so 4 cycles.

*Edge-axis $180°$.* The axis through midpoints of two opposite edges. The two endpoints of each "axis edge" are swapped (one 2-cycle per axis edge = 2 vertices in 1 transposition, and there are 2 axis edges), plus the remaining 4 vertices pair up into 2 more 2-cycles. Total: $2 + 2 + 2 + 2$, so 4 cycles. No fixed vertex.

**Sum of fixed-point counts:**
\begin{align}
\sum_{g \in R} |X^g| &= 1 \cdot n^8 + 6 \cdot n^2 + 3 \cdot n^4 + 8 \cdot n^4 + 6 \cdot n^4 \\
&= n^8 + 6 n^2 + (3 + 8 + 6) n^4 \\
&= n^8 + 17 n^4 + 6 n^2.
\end{align}

**Burnside:**
$$N(n) = \frac{n^8 + 17 n^4 + 6 n^2}{24}.$$

**Sanity checks.**

*$n = 1$:* $N(1) = (1 + 17 + 6)/24 = 24/24 = 1$. ✓ (One monochromatic vertex-coloring.)

*$n = 2$:* 
$$N(2) = \frac{256 + 272 + 24}{24} = \frac{552}{24} = 23.$$

Compare to face coloring with 2 colors: 10. Cube vertex coloring with 2 colors: 23. More colorings in vertex case because vertices are further apart and fewer symmetries identify configurations.

*$n = 3$:*
$$N(3) = \frac{6561 + 1377 + 54}{24} = \frac{7992}{24} = 333.$$

**Integrality verification.** The formula $(n^8 + 17 n^4 + 6 n^2)/24$ must give integers. Modulo arithmetic check: $n^8 + 17 n^4 + 6 n^2 \equiv n^2(n^6 + 17 n^2 + 6) \pmod{24}$. For $n \in \{1, 2, 3, 4, 5, 6\}$: all give integer results (checked above and $N(4) = (65536 + 4352 + 96)/24 = 70\,984/24 = 2957\tfrac{16}{24}$... wait let me recompute: $4^8 = 65536, 17 \cdot 4^4 = 17 \cdot 256 = 4352, 6 \cdot 16 = 96$. Sum $= 69984$. $69984/24 = 2916$. ✓)

$\boxed{N(n) = \dfrac{n^8 + 17 n^4 + 6 n^2}{24}}$

---

**Solution 6.** Orbits of $\mathbb{Z}_3$ on $\{1, 2, 3\}^2$ via diagonal shift.

**Setup.** $X = \{(x, y) : x, y \in \{1, 2, 3\}\} = (\mathbb{Z}/3\mathbb{Z})^2$, $|X| = 9$. $G = \mathbb{Z}_3 = \{0, 1, 2\}$ acts by $k \cdot (x, y) = (x + k, y + k) \pmod 3$. $|G| = 3$.

**Fixed-point analysis.**

*$g = 0$ (identity):* $|X^0| = 9$.

*$g = 1$:* $(x, y)$ is fixed iff $x + 1 \equiv x$ and $y + 1 \equiv y \pmod 3$, i.e., $1 \equiv 0 \pmod 3$. False, so no $(x, y)$ is fixed. $|X^1| = 0$.

*$g = 2$:* $(x, y)$ is fixed iff $x + 2 \equiv x \pmod 3$, i.e., $2 \equiv 0$. False. $|X^2| = 0$.

**Sum:** $9 + 0 + 0 = 9$.

**Burnside:**
$$N = \frac{9}{3} = 3.$$

**Describe the 3 orbits.** Points in the same orbit differ by a diagonal shift $(k, k)$:
- Orbit of $(1, 1)$: $\{(1,1), (2,2), (3,3)\}$ — the main diagonal.
- Orbit of $(1, 2)$: $\{(1,2), (2,3), (3,1)\}$ — one off-diagonal.
- Orbit of $(1, 3)$: $\{(1,3), (2,1), (3,2)\}$ — the other off-diagonal.

Total: 3 orbits, each of size 3, partitioning the 9 points. ✓ (Sanity: each orbit has size $|G|/|G_x| = 3/1 = 3$ since the action is free — stabilizer is trivial for every point since $k = 0$ is the only $k$ with $k \cdot x = x$.)

**Structural remark.** This is exactly the action of a subgroup $\{(k, k) : k \in \mathbb{Z}_3\}$ (the diagonal subgroup of $\mathbb{Z}_3 \times \mathbb{Z}_3$) by translation. Orbits are cosets of the diagonal in $\mathbb{Z}_3^2$, and there are $9/3 = 3$ cosets.

$\boxed{3}$ orbits.

---

**Solution 7.** $2 \times 3$ board, 2-color cell coloring, $V_4$ symmetry.

**Setup.** The $2 \times 3$ board has $6$ cells. Label them:
$$\begin{pmatrix} (1,1) & (1,2) & (1,3) \\ (2,1) & (2,2) & (2,3) \end{pmatrix}$$
(row, column). $X = \{0, 1\}^6$, $|X| = 2^6 = 64$.

Group $G = V_4 = \{e, h, v, hv\}$ where:
- $h$ = horizontal flip (swap rows): $(i, j) \mapsto (3 - i, j)$, so row 1 ↔ row 2.
- $v$ = vertical flip (swap columns left-right, preserving the middle column): $(i, j) \mapsto (i, 4 - j)$, so column 1 ↔ column 3, column 2 fixed.
- $hv$ = 180° rotation: combines both.

$|G| = 4$.

**Fixed-point analysis.**

*$g = e$:* $|X^e| = 2^6 = 64$.

*$g = h$ (row swap):* The permutation on the 6 cells is
$$h: (1,j) \leftrightarrow (2,j) \text{ for } j = 1, 2, 3.$$
Cycle structure: 3 transpositions (one per column). Number of cycles: 3. $|X^h| = 2^3 = 8$.

*$g = v$ (column swap, middle fixed):* The permutation is
$$v: (i, 1) \leftrightarrow (i, 3) \text{ for } i = 1, 2; \quad (i, 2) \text{ fixed for } i = 1, 2.$$
Cycle structure: 2 transpositions + 2 fixed points = 4 cycles. $|X^v| = 2^4 = 16$.

*$g = hv$ (180° rotation):* This is the composition, sending $(i, j) \mapsto (3 - i, 4 - j)$. So:
$$(1,1) \leftrightarrow (2,3), \quad (1,2) \leftrightarrow (2,2), \quad (1,3) \leftrightarrow (2,1).$$
Cycle structure: 3 transpositions, no fixed points. Number of cycles: 3. $|X^{hv}| = 2^3 = 8$.

**Careful check — does $hv$ have any fixed cell?** $(i, j)$ fixed by $hv$ iff $i = 3 - i$ (so $i = 3/2$, not integer) — no. ✓ All 6 cells move.

**Sum of fixed-point counts:** $64 + 8 + 16 + 8 = 96$.

**Burnside:**
$$N = \frac{96}{4} = 24.$$

$\boxed{24}$ distinct colorings.

**Structural commentary.** Applying the cycle-index approach:
$$Z_{V_4}(z_1, z_2, \ldots) = \frac{1}{4}\left(z_1^6 + z_1^0 z_2^3 + z_1^2 z_2^2 + z_1^0 z_2^3\right) = \frac{1}{4}(z_1^6 + 2 z_2^3 + z_1^2 z_2^2).$$

Evaluating at $z_1 = z_2 = \cdots = 2$:
$$Z_{V_4}(2, 2, \ldots) = \frac{1}{4}(64 + 2 \cdot 8 + 4 \cdot 4) = \frac{1}{4}(64 + 16 + 16) = \frac{96}{4} = 24. \checkmark$$

**Sanity.** Without symmetry, $64$ colorings; with $V_4$ (order 4), expected $\approx 64/4 = 16$ orbits for a generic (free) action. We get $24$, significantly more — reflecting that many colorings are fixed by non-identity elements (small orbits), pushing the orbit count up.

---

## Related Concepts

- [[12-subgroup-lattice-and-dihedral-groups]] — dihedral groups as symmetry groups; their subgroup structure relates to the sub-orbits in bracelet problems.
- [[15-group-actions]] — full theory of actions, orbits, stabilizers, and the orbit-stabilizer theorem used here.
- [[16-centralizer-normalizer-stabilizer]] — orbit-stabilizer theorem applied in conjugation contexts.
- [[14-co2-practice-problems]] — additional Burnside-style problems across symmetries.

---

*Last updated: 2026-04-19*
