---
title: "Burnside's Theorem and Orbit Counting"
type: guide
co: CO2
related: [12-subgroup-lattice-and-dihedral-groups, 15-group-actions, 16-centralizer-normalizer-stabilizer]
---

# 13. Burnside's Theorem (Cauchy–Frobenius Lemma)

**Burnside's theorem** — more accurately credited to Cauchy and Frobenius — counts the number of orbits of a group action on a set. It is the foundational tool for answering combinatorial questions like: *How many distinct necklaces can be made with 6 beads and 3 colors?* or *How many ways can we color the faces of a cube with $n$ colors?*

The theorem reduces a hard orbit-counting problem to a simple averaging computation over the group. We present it here with full proof, followed by the classical applications: necklaces, bracelets, cube colorings, and polynomial invariants.

This chapter previews group actions (developed fully in [[15-group-actions]]) using only the definition; the orbit-stabilizer theorem is stated and used. Readers may cross-reference [[15-group-actions]] for the broader theory.

## 13.1 Group Actions — Minimal Definitions

> **Definition 13.1.** Let $G$ be a group, $X$ a set. An **action** of $G$ on $X$ is a map $G \times X \to X$, $(g, x) \mapsto g \cdot x$, satisfying:
>
> 1. $e \cdot x = x$ for all $x \in X$.
> 2. $(gh) \cdot x = g \cdot (h \cdot x)$ for all $g, h \in G$, $x \in X$.

> **Definition 13.2.** For $x \in X$:
> - **Orbit:** $G \cdot x = \{g \cdot x : g \in G\}$
> - **Stabilizer:** $G_x = \{g \in G : g \cdot x = x\}$ — a subgroup of $G$.
>
> For $g \in G$:
> - **Fixed points:** $X^g = \operatorname{Fix}(g) = \{x \in X : g \cdot x = x\}$

> **Theorem 13.3 (Orbit-Stabilizer).** For finite $G$ acting on $X$, and any $x \in X$:
> $$|G \cdot x| = [G : G_x] = \frac{|G|}{|G_x|}.$$

(Proof deferred to [[15-group-actions]]; here we use it as a tool.)

## 13.2 Burnside's Theorem

> **Theorem 13.4 (Cauchy–Frobenius–Burnside).** Let $G$ be a finite group acting on a finite set $X$. Let $N$ be the number of orbits of this action. Then
> $$N = \frac{1}{|G|} \sum_{g \in G} |X^g|.$$
>
> In words: the number of orbits equals the average number of fixed points over the group.

*Proof.* We count the set
$$S = \{(g, x) \in G \times X : g \cdot x = x\}$$
in two ways.

**First way (sum over $g$):**
$$|S| = \sum_{g \in G} |X^g|.$$

**Second way (sum over $x$):**
$$|S| = \sum_{x \in X} |G_x|.$$

By orbit-stabilizer, $|G_x| = |G| / |G \cdot x|$. Summing:
$$|S| = \sum_{x \in X} \frac{|G|}{|G \cdot x|} = |G| \sum_{x \in X} \frac{1}{|G \cdot x|}.$$

Within each orbit $\mathcal{O}$ of size $|\mathcal{O}|$, every element contributes $1/|\mathcal{O}|$, so the orbit's total contribution is $|\mathcal{O}| \cdot \frac{1}{|\mathcal{O}|} = 1$. Hence
$$|S| = |G| \cdot N.$$

Equating the two expressions:
$$\sum_{g \in G} |X^g| = |G| \cdot N,$$
so $N = \frac{1}{|G|} \sum_{g \in G} |X^g|$. $\blacksquare$

## 13.3 First Example: Coloring Beads on a Square

**Problem.** How many distinct ways are there to color the 4 corners of a square with 2 colors (say black and white), where two colorings are considered equivalent if one can be rotated or reflected into the other?

**Setup.** $X = \{(c_1, c_2, c_3, c_4) : c_i \in \{B, W\}\}$, $|X| = 2^4 = 16$. $G = D_4$ acts on $X$ by permuting coordinates.

**Count fixed points for each $g \in D_4$:**

| $g$ | cycle type on corners | $\|X^g\|$ |
|---|---|---|
| $e$ | $(1)(2)(3)(4)$ — 4 fixed cycles | $2^4 = 16$ |
| $r$ | $(1\,2\,3\,4)$ — 1 cycle | $2^1 = 2$ |
| $r^2$ | $(1\,3)(2\,4)$ — 2 cycles | $2^2 = 4$ |
| $r^3$ | $(1\,4\,3\,2)$ — 1 cycle | $2$ |
| $s$ (horizontal flip) | $(1\,2)(3\,4)$ — 2 cycles | $2^2 = 4$ |
| $rs$ (diagonal) | $(1\,3)$ — 3 cycles total: $(1\,3)(2)(4)$ | $2^3 = 8$ |
| $r^2 s$ (vertical flip) | $(1\,4)(2\,3)$ — 2 cycles | $2^2 = 4$ |
| $r^3 s$ (anti-diagonal) | $(2\,4)(1)(3)$ — 3 cycles | $2^3 = 8$ |

**Sum:** $16 + 2 + 4 + 2 + 4 + 8 + 4 + 8 = 48$.

**Number of orbits:** $N = 48 / 8 = 6$.

So **6 distinct square colorings** with 2 colors, up to rotation and reflection. $\boxed{6}$

## 13.4 Key Identity: Fixed Points of a Rotation on an $n$-Necklace

For $c$-colorings of an $n$-bead necklace (linear action by $\mathbb{Z}_n$ cyclic rotation), a rotation by $k$ positions fixes a coloring iff the coloring is periodic with period dividing $\gcd(n, k)$. The number of orbits under this rotation is $\gcd(n, k)$, so the fixed colorings are exactly those constant on each orbit — i.e., $c^{\gcd(n, k)}$.

> **Key identity 13.5.** For cyclic action of $\mathbb{Z}_n$ on $n$-bead colorings with $c$ colors:
> $$|\operatorname{Fix}(r^k)| = c^{\gcd(n, k)}.$$

**Number of necklaces (cyclic only):**
$$N_{\text{cyc}} = \frac{1}{n} \sum_{k=0}^{n-1} c^{\gcd(n, k)} = \frac{1}{n} \sum_{d \mid n} \varphi(n/d) c^d.$$

(Using: number of $k \in \{0, \ldots, n-1\}$ with $\gcd(n, k) = d$ is $\varphi(n/d)$.)

**Example 1.** Cyclic necklaces with 6 beads, 2 colors:
$$N_{\text{cyc}} = \frac{1}{6} \sum_{d \mid 6} \varphi(6/d) 2^d = \frac{1}{6}(\varphi(6) \cdot 2 + \varphi(3) \cdot 4 + \varphi(2) \cdot 8 + \varphi(1) \cdot 64)$$
$$= \frac{1}{6}(2 \cdot 2 + 2 \cdot 4 + 1 \cdot 8 + 1 \cdot 64) = \frac{1}{6}(4 + 8 + 8 + 64) = \frac{84}{6} = 14.$$
So 14 distinct 2-color cyclic necklaces on 6 beads. $\boxed{14}$

## 13.5 Bracelets: Necklaces with Reflection

For **bracelets**, the group is $D_n$ (rotations plus reflections), so we add reflection contributions.

**Reflection fixed points.**
- If $n$ is **odd**: each of the $n$ reflections fixes 1 bead and swaps the remaining $n - 1$ in $(n-1)/2$ pairs. Fixed colorings: $c \cdot c^{(n-1)/2} = c^{(n+1)/2}$.
- If $n$ is **even**: half the reflections ($n/2$ of them) fix 2 beads and pair up the rest; other $n/2$ fix 0 beads.
  - Fixes 2 beads: $c^{2} \cdot c^{(n-2)/2} = c^{n/2 + 1}$. Count: $n/2$.
  - Fixes 0 beads: $c^{n/2}$. Count: $n/2$.

**Example 2.** Bracelets with 6 beads, 2 colors. $n = 6$ even, $c = 2$.

Total rotations contribute $4 + 8 + 8 + 64 = 84$ (from Example 1, but keeping as a sum; we sum over 6 rotations).

Wait, the rotation total was computed as sum over rotations = $84$. For the $D_6$ average we add reflections:
- 3 reflections fixing 2 beads: $3 \cdot 2^{3 + 1} = 3 \cdot 16 = 48$. Wait — $c^{n/2 + 1} = 2^4 = 16$ each, so $3 \cdot 16 = 48$.
- 3 reflections fixing 0 beads: $3 \cdot 2^{n/2} = 3 \cdot 2^3 = 24$.

Total sum $= 84 + 48 + 24 = 156$.

$N_{\text{brac}} = 156 / 12 = 13$.

So **13 distinct 2-color bracelets on 6 beads**. $\boxed{13}$

(One fewer than cyclic necklaces — one of the 14 cyclic patterns is mirror-symmetric to another.)

## 13.6 Cube Face Coloring

**Problem.** Count distinct ways to color the 6 faces of a cube with $n$ colors, where rotations (not reflections) of the cube are considered equivalent.

**The rotation group of the cube has order 24.** It consists of:

| Type | Count | Fixed faces per element |
|---|---|---|
| Identity | 1 | $n^6$ |
| Face rotations by $\pm 90°$ (3 axes, 2 each) | 6 | $n^3$ (top, bottom fixed; 4 sides cycle) |
| Face rotations by $180°$ (3 axes) | 3 | $n^4$ (top/bottom fixed; 2 pairs of opposite sides) |
| Vertex rotations by $\pm 120°$ (4 axes, 2 each) | 8 | $n^2$ (two 3-cycles of faces) |
| Edge rotations by $180°$ (6 axes) | 6 | $n^3$ (three pairs of faces swapped) |

**Total**: $1 + 6 + 3 + 8 + 6 = 24$ ✓.

**Sum:**
$$\sum_g |X^g| = 1 \cdot n^6 + 6 \cdot n^3 + 3 \cdot n^4 + 8 \cdot n^2 + 6 \cdot n^3 = n^6 + 3n^4 + 12n^3 + 8n^2.$$

**Number of orbits:**
$$N(n) = \frac{n^6 + 3n^4 + 12n^3 + 8n^2}{24}.$$

**Specific values:**
- $n = 2$: $N = (64 + 48 + 96 + 32)/24 = 240/24 = 10$. **10 cube colorings with 2 colors.**
- $n = 3$: $N = (729 + 243 + 324 + 72)/24 = 1368/24 = 57$.
- $n = 6$: $N = (46656 + 3888 + 2592 + 288)/24 = 53424/24 = 2226$.

## 13.7 Quick Sanity Checks

**Check 1.** For a trivial action ($g \cdot x = x$ for all $g$), every element fixes everything: $|X^g| = |X|$ for all $g$. Then $N = |G| \cdot |X| / |G| = |X|$. Each point is its own orbit. ✓

**Check 2.** For a transitive action (single orbit), Burnside says $1 = \frac{1}{|G|} \sum |X^g|$, i.e., the average fixed-point count is 1. Often this is a way to check a transitive action is genuinely transitive.

## 13.8 Applications to Polynomial Invariants

Burnside counts **orbits** — which correspond to **invariants**. If $G$ acts on polynomials by permuting variables, the number of orbits of monomials of fixed degree equals the number of linearly independent symmetric (under $G$) monomials of that degree.

This is a gateway to **Pólya enumeration**, which refines Burnside by assigning weights to colors and tracking them via the cycle index polynomial of $G$. A beautiful generalization, but beyond our scope here.

## 13.9 Pólya's Cycle Index (Preview)

> **Definition 13.6 (Cycle index).** For a permutation $\sigma$ on $n$ objects with $a_i$ cycles of length $i$ (so $\sum i a_i = n$), write the monomial $z_1^{a_1} z_2^{a_2} \cdots z_n^{a_n}$. The cycle index of $G \subseteq S_n$ is
> $$Z_G(z_1, \ldots, z_n) = \frac{1}{|G|} \sum_{\sigma \in G} z_1^{a_1(\sigma)} \cdots z_n^{a_n(\sigma)}.$$

**Pólya's theorem (brief).** The number of distinct colorings with $c$ colors is $Z_G(c, c, \ldots, c)$ — an immediate consequence of Burnside's theorem applied to coloring spaces.

## 13.10 Practice Problems

**Problem 1.** How many distinct ways to color the vertices of an equilateral triangle with 3 colors, considering $D_3$ symmetry?

**Problem 2.** Count the 3-color necklaces of length 5 (cyclic group $\mathbb{Z}_5$ acting).

**Problem 3.** Count the 2-color bracelets of length 4.

**Problem 4.** How many ways to color the edges of a square with 2 colors, up to $D_4$?

**Problem 5.** Derive the count of distinct cube vertex colorings with $n$ colors under rotation.

**Problem 6.** Use Burnside to count the orbits of $\mathbb{Z}_3$ acting on $\{1, 2, 3\} \times \{1, 2, 3\}$ by diagonal $(x, y) \mapsto (x+1, y+1)$ (mod 3).

**Problem 7.** Count the number of distinct ways to tile a $2 \times 3$ board with uniform $1 \times 1$ tiles colored in 2 colors, up to $D_2 = V_4$ symmetry (horizontal/vertical flips).

### Solutions

**Solution 1.** $|X| = 3^3 = 27$, $G = D_3$, $|G| = 6$.
- $e$: $3^3 = 27$
- $r, r^2$: each 1 cycle of length 3, so $3^1 = 3$ each. Total 6.
- 3 reflections: each fixes 1 vertex + swaps 2, so $3^2 = 9$ each. Total 27.

Sum $= 27 + 6 + 27 = 60$. $N = 60 / 6 = 10$. $\boxed{10}$

**Solution 2.** $G = \mathbb{Z}_5$, $c = 3$, $n = 5$.
$$N = \frac{1}{5} \sum_{d \mid 5} \varphi(5/d) 3^d = \frac{1}{5} (\varphi(5) \cdot 3 + \varphi(1) \cdot 243) = \frac{1}{5}(4 \cdot 3 + 1 \cdot 243) = \frac{12 + 243}{5} = \frac{255}{5} = 51.$$
$\boxed{51}$

**Solution 3.** $n = 4$, $c = 2$, $G = D_4$.

Rotations: $|\operatorname{Fix}(e)| = 16$, $|\operatorname{Fix}(r)| = 2$, $|\operatorname{Fix}(r^2)| = 4$, $|\operatorname{Fix}(r^3)| = 2$. Sum $= 24$.

Reflections ($n = 4$ even):
- 2 reflections fix 2 beads: $2^{2+1} = 8$ each. Total $16$.
- 2 reflections fix 0 beads: $2^2 = 4$ each. Total $8$.

Total sum = $24 + 16 + 8 = 48$. $N = 48 / 8 = 6$. $\boxed{6}$

**Solution 4.** 4 edges of a square. $G = D_4$ acts on edges.

Action on edges:
- $e$: 4 fixed cycles. $|X^e| = 2^4 = 16$.
- $r$: single 4-cycle on edges. $|X^r| = 2$.
- $r^2$: 2 cycles of length 2. $|X^{r^2}| = 4$.
- $r^3$: single 4-cycle. $|X^{r^3}| = 2$.
- horizontal/vertical reflections (2 of these): fix 2 edges, swap other 2. $|X^s| = 2^3 = 8$ each. Total 16.
- diagonal reflections (2 of these): swap edges in pairs, 0 fixed edges. $|X^{rs}| = 2^2 = 4$ each. Total 8.

Sum $= 16 + 2 + 4 + 2 + 16 + 8 = 48$. $N = 48/8 = 6$. $\boxed{6}$

**Solution 5.** Cube has 8 vertices. The rotation group's action on vertices has this cycle structure:
- Identity: 8 fixed cycles. $n^8$.
- Face rotations $\pm 90°$ (6): two 4-cycles of vertices. $n^2$ each. Total $6n^2$.
- Face rotations $180°$ (3): four 2-cycles. $n^4$ each. Total $3n^4$.
- Vertex rotations $\pm 120°$ (8): two fixed vertices and two 3-cycles. $n^{2 + 2} = n^4$ each. Total $8n^4$.
- Edge rotations $180°$ (6): four 2-cycles. $n^4$ each. Total $6n^4$.

Sum $= n^8 + 6n^2 + 3n^4 + 8n^4 + 6n^4 = n^8 + 17n^4 + 6n^2$.

$N(n) = (n^8 + 17n^4 + 6n^2)/24$.

Check: $n = 1$: $(1 + 17 + 6)/24 = 24/24 = 1$ ✓.
$n = 2$: $(256 + 272 + 24)/24 = 552/24 = 23$. $\boxed{(n^8 + 17n^4 + 6n^2)/24}$

**Solution 6.** $X = \{1,2,3\}^2$ has 9 elements. $G = \mathbb{Z}_3 = \{0, 1, 2\}$.
- $0$: identity, fixes all 9.
- $1$: $(x, y) \mapsto (x+1, y+1)$. Fixed iff $x = x + 1$ and $y = y + 1$ (mod 3). Never. 0 fixed.
- $2$: same reasoning. 0 fixed.

$N = (9 + 0 + 0)/3 = 3$. $\boxed{3}$ orbits. (Orbits are $\{(x, y), (x+1, y+1), (x+2, y+2)\}$, i.e., the three "diagonal classes" of the $3 \times 3$ grid.)

**Solution 7.** The $2 \times 3$ board has $6$ cells, so $|X| = 2^6 = 64$. $G = V_4 = \{e, h, v, hv\}$.
- $e$: $64$.
- $h$ (horizontal flip, swaps rows): 3 pairs of cells. $2^3 = 8$.
- $v$ (vertical flip, swaps columns): for a $2 \times 3$ board, vertical flip pairs up columns $\{1, 3\}$ and fixes middle column. 2 paired cells + 2 fixed = fixed iff we fix 2 cells and choose 2 colors freely. $|X^v| = 2^{2 + 2} = 16$. Wait: 6 cells total, vertical flip swaps columns 1↔3 pairwise: 2 pairs swapped (2 cells in col 1 paired with 2 in col 3), 2 cells in column 2 are fixed. Cycle count: 2 transpositions + 2 fixed = 2 + 2 = 4 cycles. $|X^v| = 2^4 = 16$.
- $hv$ (both): pairs cells across center. 6 cells in 3 pairs. $|X^{hv}| = 2^3 = 8$.

Sum $= 64 + 8 + 16 + 8 = 96$. $N = 96 / 4 = 24$. $\boxed{24}$ distinct colorings.

## Related Concepts

- [[12-subgroup-lattice-and-dihedral-groups]] — dihedral groups as symmetry groups
- [[15-group-actions]] — full theory of actions, orbits, stabilizers
- [[16-centralizer-normalizer-stabilizer]] — orbit-stabilizer theorem applied
- [[14-co2-practice-problems]] — additional Burnside-style problems

---

*Last updated: 2026-04-18*
