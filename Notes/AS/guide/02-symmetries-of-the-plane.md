# 2. Symmetries of the Two-Dimensional Plane

> **Why this chapter.** Before the abstract definition of a group (file 03), we motivate the concept through **symmetries**: transformations of the plane that preserve distances. The symmetries of a geometric figure form the prototypical non-commutative group, and every concept in group theory — subgroup, order, generator, conjugation — has a geometric counterpart that is easiest to see in $\mathbb{R}^2$.

---

## 2.1 Isometries of the Plane

> **Definition (Isometry / rigid motion).** A function $T : \mathbb{R}^2 \to \mathbb{R}^2$ is an **isometry** (or **rigid motion**) if it preserves Euclidean distance:
> $$\|T(\vec{p}) - T(\vec{q})\| = \|\vec{p} - \vec{q}\| \quad \forall \vec{p}, \vec{q} \in \mathbb{R}^2.$$

Isometries are the "rigid" transformations — they preserve lengths and angles, and hence the shape of any figure.

> **Theorem 2.1 (Classification of plane isometries).** Every isometry $T : \mathbb{R}^2 \to \mathbb{R}^2$ is one of:
> 1. **Translation** $T_{\vec{v}}(\vec{p}) = \vec{p} + \vec{v}$.
> 2. **Rotation** $R_{\theta, \vec{c}}$ by angle $\theta$ about a point $\vec{c}$.
> 3. **Reflection** $F_\ell$ across a line $\ell$.
> 4. **Glide reflection** — a reflection followed by a translation parallel to the reflecting line.

**Proof sketch.** The key observations are:

(i) Any isometry $T$ is determined by the images of three non-collinear points $P_1, P_2, P_3$: given $T(P_1), T(P_2), T(P_3)$, every other point $Q$ is uniquely located by its distances $d(Q, P_i)$, which are preserved by $T$, so $T(Q)$ is uniquely determined.

(ii) Any distance-preserving map $\mathbb{R}^2 \to \mathbb{R}^2$ is **affine**: of the form $T(\vec p) = A\vec p + \vec v$ where $A$ is an orthogonal $2 \times 2$ matrix ($A^T A = I$) and $\vec v \in \mathbb{R}^2$. Orthogonal $2 \times 2$ matrices are rotations ($\det A = 1$) or reflection-rotations ($\det A = -1$).

(iii) Combining (ii) with a case analysis on fixed points yields the four types. A rotation is $A$ rotation plus any $\vec v$ (giving $R_{\theta, \vec c}$ for some $\vec c$). A reflection-with-translation decomposes as a pure reflection (if the translation is perpendicular to the reflecting line direction — it becomes a reflection in a shifted line) or a genuine glide reflection otherwise.

Full proof: Artin, *Geometric Algebra*, or any introductory abstract algebra text.

Isometries form a group under composition: the **Euclidean group** $E(2)$.

*Why a group?*
- Composition of isometries is an isometry (distance preservation is preserved under composition).
- The identity map is an isometry.
- Every isometry is a bijection (injective because distance-preserving; surjective because orthogonal matrices are invertible), and its inverse is an isometry.

We make this precise in [[03-groups-definition-and-examples]].

---

## 2.2 Symmetries of a Figure

> **Definition.** A **symmetry** of a set $F \subset \mathbb{R}^2$ is an isometry $T$ with $T(F) = F$ — i.e., $T$ maps $F$ onto itself (as a set).

Note: we require $T(F) = F$, not $T(p) = p$ for each $p \in F$. A symmetry can move individual points around as long as the set $F$ as a whole is preserved.

The set of all symmetries of $F$, denoted $\text{Sym}(F)$, is closed under composition and inversion:

*Closure.* If $S, T \in \text{Sym}(F)$, then $(S \circ T)(F) = S(T(F)) = S(F) = F$. ✓

*Identity.* $\operatorname{id}(F) = F$. ✓

*Inverses.* If $T(F) = F$, then $T^{-1}(F) = T^{-1}(T(F)) = F$. ✓

So $\text{Sym}(F)$ is a subgroup of $E(2)$. Groups of symmetries are the paradigmatic examples of groups throughout this guide.

---

## 2.3 Symmetries of the Equilateral Triangle

Let $F$ be the equilateral triangle with vertices at $A = (1, 0)$, $B = (-1/2, \sqrt{3}/2)$, $C = (-1/2, -\sqrt{3}/2)$ (centered at origin, inscribed in the unit circle).

**Rotation symmetries.** Rotations about the origin that cyclically permute $A, B, C$:
- $r_0 = \operatorname{identity}$: fixes all vertices.
- $r_1 = R_{120°}$: $A \to B, B \to C, C \to A$ (counterclockwise).
- $r_2 = R_{240°}$: $A \to C, C \to B, B \to A$.

*Verification that $r_1$ is a symmetry.* $R_{120°}$ applied to $A = (1, 0)$:
$$R_{120°}(A) = (\cos 120°, \sin 120°) = (-1/2, \sqrt 3/2) = B. \checkmark$$
Similarly $R_{120°}(B) = C$ and $R_{120°}(C) = A$. So $r_1(\{A, B, C\}) = \{A, B, C\}$. ✓

**Reflection symmetries.** Reflections across the three lines through the center and one vertex:
- $s_A$ = reflection across the $x$-axis (line through origin and $A$): fixes $A$, swaps $B \leftrightarrow C$.
- $s_B$ = reflection across the line through $B$ (at angle $120°$ from $x$-axis): fixes $B$, swaps $A \leftrightarrow C$.
- $s_C$ = reflection across the line through $C$ (at angle $-120°$ from $x$-axis): fixes $C$, swaps $A \leftrightarrow B$.

*Verification that $s_A$ is a symmetry.* Reflection across the $x$-axis sends $(x, y) \to (x, -y)$:
- $s_A(A) = s_A(1, 0) = (1, 0) = A$ ✓.
- $s_A(B) = s_A(-1/2, \sqrt 3/2) = (-1/2, -\sqrt 3/2) = C$ ✓.
- $s_A(C) = (-1/2, \sqrt 3/2) = B$ ✓.

So $s_A(\{A, B, C\}) = \{A, B, C\}$. ✓

**Total:** 6 symmetries — 3 rotations + 3 reflections. This is the **dihedral group $D_3$** (sometimes written $D_6$ in other conventions).

### Composition table for $D_3$

Using the convention **$fg$ means "apply $g$ first, then $f$"**:

$$
\begin{array}{c|cccccc}
\circ & r_0 & r_1 & r_2 & s_A & s_B & s_C \\
\hline
r_0 & r_0 & r_1 & r_2 & s_A & s_B & s_C \\
r_1 & r_1 & r_2 & r_0 & s_B & s_C & s_A \\
r_2 & r_2 & r_0 & r_1 & s_C & s_A & s_B \\
s_A & s_A & s_C & s_B & r_0 & r_2 & r_1 \\
s_B & s_B & s_A & s_C & r_1 & r_0 & r_2 \\
s_C & s_C & s_B & s_A & r_2 & r_1 & r_0
\end{array}
$$

*Sample computation of $r_1 \circ s_A$.* Apply $s_A$ first, then $r_1$:
- $A \xrightarrow{s_A} A \xrightarrow{r_1} B$, so $(r_1 \circ s_A)(A) = B$.
- $B \xrightarrow{s_A} C \xrightarrow{r_1} A$, so $(r_1 \circ s_A)(B) = A$.
- $C \xrightarrow{s_A} B \xrightarrow{r_1} C$, so $(r_1 \circ s_A)(C) = C$.

Result: $A \leftrightarrow B$, $C$ fixed. This matches $s_C$ (fixes $C$, swaps $A, B$). So $r_1 \circ s_A = s_C$ — matching the table entry in row $r_1$, column $s_A$. ✓

**Key observations:**

*(a) Rotations form a subgroup.* $r_1 r_1 = r_2$, $r_1 r_2 = r_0$, so $\{r_0, r_1, r_2\}$ is closed under composition and contains the identity. In fact this is cyclic: $\{r_0, r_1, r_1^2\} = \langle r_1 \rangle$.

*(b) Each reflection is self-inverse.* $s_A s_A = r_0$: applying $s_A$ twice undoes itself ($A$ fixed both times; $B \to C \to B$; $C \to B \to C$).

*(c) Non-commutativity.* From the table: $s_A r_1 = s_C$ but $r_1 s_A = s_B$. Since $s_C \neq s_B$, we have $s_A r_1 \neq r_1 s_A$. **$D_3$ is our first non-abelian group.**

*(d) Every reflection composed with a rotation gives a reflection.* From the bottom-left $3 \times 3$ block of the table: all entries are reflections ($s_A, s_B, s_C$). This generalizes — in $D_n$, "rotation $\times$ reflection" is always a reflection.

---

## 2.4 Symmetries of the Square

Let $F$ be the unit square with vertices $\{(\pm 1, \pm 1)\}$.

**Rotation symmetries:** $R_0, R_{90°}, R_{180°}, R_{270°}$ — 4 rotations preserving the square (since the square has $4$-fold rotational symmetry).

**Reflection symmetries:**
- $h$: reflection across horizontal axis (the $x$-axis).
- $v$: reflection across vertical axis (the $y$-axis).
- $d_1$: reflection across $y = x$ (main diagonal).
- $d_2$: reflection across $y = -x$ (anti-diagonal).

**Total:** 8 symmetries — the **dihedral group $D_4$**.

### Algebraic presentation of $D_4$

Let $r = R_{90°}$ (counterclockwise) and $s = h$ (horizontal reflection). The 8 elements of $D_4$ can be written as:
$$D_4 = \{e, r, r^2, r^3, s, rs, r^2 s, r^3 s\}.$$

*Why this list exhausts $D_4$?* Every element of $D_4$ is a composition of $r$'s and $s$'s in some order. Using the relation $sr = r^{-1}s$ (proved below), we can push every $s$ to the right, obtaining a word of the form $r^i s^j$ with $i \in \{0, 1, 2, 3\}$ and $j \in \{0, 1\}$. There are $4 \times 2 = 8$ such words, matching $|D_4| = 8$.

**Key relation $sr = r^{-1}s$.** Verify geometrically: apply $sr$ and $r^{-1}s$ to a test point, say $P = (1, 0)$ (the right-middle edge midpoint, or an arbitrary reference point).

Using matrix representations:
$$r = \begin{pmatrix} 0 & -1 \\ 1 & 0 \end{pmatrix}, \quad s = \begin{pmatrix} 1 & 0 \\ 0 & -1 \end{pmatrix} \; (\text{reflection across } x\text{-axis}).$$

$sr$: $s \cdot r \cdot P = s(r P) = s \begin{pmatrix} 0 \\ 1 \end{pmatrix} = \begin{pmatrix} 0 \\ -1 \end{pmatrix}$.

$r^{-1}s$: $r^{-1} = \begin{pmatrix} 0 & 1 \\ -1 & 0 \end{pmatrix}$. $r^{-1} s P = r^{-1}(sP) = r^{-1}\begin{pmatrix} 1 \\ 0 \end{pmatrix} = \begin{pmatrix} 0 \\ -1 \end{pmatrix}$.

Equal. ✓ Check on a second test point, say $P = (0, 1)$: $sr P = s(-1, 0) = (-1, 0)$; $r^{-1}s P = r^{-1}(0, -1) = (-1, 0)$. ✓

Since $sr$ and $r^{-1}s$ agree on two linearly independent vectors (and both are linear maps), they are equal as transformations.

**Group presentation:**
$$D_4 = \langle r, s \mid r^4 = 1, s^2 = 1, srs = r^{-1} \rangle.$$

This is the **dihedral presentation**: three relations completely determine the group structure. Equivalently: $sr = r^{-1}s$, so conjugation of $r$ by $s$ inverts $r$.

More on presentations in [[04-subgroups-generators-cayley-diagrams]] and [[05-permutation-and-dihedral-groups]].

---

## 2.5 The Dihedral Group $D_n$

Generalizing, the symmetries of a regular $n$-gon form the **dihedral group $D_n$**, with $2n$ elements:
- $n$ rotations: $e, r, r^2, \ldots, r^{n-1}$ (where $r = R_{2\pi/n}$).
- $n$ reflections: $s, sr, sr^2, \ldots, sr^{n-1}$ (or equivalently $s, rs, r^2 s, \ldots, r^{n-1} s$).

**Presentation:**
$$D_n = \langle r, s \mid r^n = e, s^2 = e, srs = r^{-1} \rangle.$$

**Orders:**
- $|D_3| = 6$ (equilateral triangle)
- $|D_4| = 8$ (square)
- $|D_5| = 10$ (regular pentagon)
- $|D_6| = 12$ (regular hexagon)

> **Note on notation.** Some books write $D_{2n}$ instead of $D_n$ (emphasizing the order $2n$). This guide uses $D_n$ for the group of $2n$ elements (symmetries of the $n$-gon), matching [[05-permutation-and-dihedral-groups]] and the course plan for MAT 2235.

---

## 2.6 Rotation-Only Symmetries: The Cyclic Groups

If we restrict to **orientation-preserving** symmetries (rotations only, no reflections), we get the **cyclic group** $C_n = \{e, r, r^2, \ldots, r^{n-1}\}$ with $|C_n| = n$.

$C_n$ is a subgroup of $D_n$ (indeed, it is the kernel of the sign homomorphism that sends rotations to $+1$ and reflections to $-1$; cf. [[17-homomorphisms-and-isomorphisms]]).

*Geometric examples where only $C_n$ appears:*
- A pinwheel with $n$ blades (bent in one direction) has $C_n$ symmetry but no reflection symmetry.
- The Isle of Man triskelion (three spiral legs, all curling the same way): $C_3$.
- A gear or propeller with $n$ teeth/blades curved the same way: $C_n$.

---

## 2.7 Worked Examples

**Example 1 (Computing $s_A r_1 s_A$ in $D_3$).**

*Goal.* Verify the dihedral relation $s r s^{-1} = r^{-1}$, i.e., $s_A r_1 s_A = r_1^{-1} = r_2$.

*Computation via vertex tracking.* Apply each symmetry to the triangle's vertices, right-to-left.

Compute $r_1 \circ s_A$ (to be left-multiplied by $s_A$ afterward):
- $A \xrightarrow{s_A} A \xrightarrow{r_1} B$.
- $B \xrightarrow{s_A} C \xrightarrow{r_1} A$.
- $C \xrightarrow{s_A} B \xrightarrow{r_1} C$.

So $r_1 \circ s_A$: swaps $A \leftrightarrow B$, fixes $C$. This matches $s_C$.

Now apply $s_A$ to the result $s_C$: $s_A \circ s_C$:
- $A \xrightarrow{s_C} B \xrightarrow{s_A} C$.
- $B \xrightarrow{s_C} A \xrightarrow{s_A} A$.
- $C \xrightarrow{s_C} C \xrightarrow{s_A} B$.

So $s_A \circ s_C$: $A \to C, B \to A, C \to B$, i.e., $A \to C \to B \to A$, which is the rotation $R_{240°} = r_2$.

Hence $s_A r_1 s_A = r_2 = r_1^{-1}$. This confirms the dihedral relation. $\blacksquare$

*Remark.* Geometrically, conjugating a rotation by a reflection reverses the rotation's direction. This is an instance of the general fact: conjugation in $D_n$ by a reflection sends $r^k$ to $r^{-k}$.

---

**Example 2 (Inverse in $D_4$).** Find $(rs)^{-1}$.

*Method 1: direct computation using inverse laws.*

We know $r^4 = e, s^2 = e$, so $r^{-1} = r^3$ and $s^{-1} = s$.

By the rule $(xy)^{-1} = y^{-1} x^{-1}$:
$$(rs)^{-1} = s^{-1} r^{-1} = s \cdot r^3 = sr^3.$$

*Verification.* Compute $(rs)(sr^3)$:
$$(rs)(sr^3) = r(ss)r^3 = r \cdot e \cdot r^3 = r^4 = e. \checkmark$$

Also $(sr^3)(rs) = sr^3 \cdot rs = s r^4 s = s \cdot e \cdot s = s^2 = e$. ✓

**Method 2: canonical form.** Using $sr = r^{-1}s = r^3 s$, we can rewrite $sr^3$:
$$sr^3 = s \cdot r^3 = s \cdot r \cdot r^2 = (sr) \cdot r^2 = r^3 s \cdot r^2 = r^3 (sr^2) = r^3 \cdot r^{-2}s = r \cdot s = rs.$$

Wait — that suggests $sr^3 = rs$, so $(rs)^{-1} = rs$, i.e., $rs$ has order $2$.

*Verify:* $(rs)^2 = rs \cdot rs = r(sr)s = r(r^{-1}s)s = (r r^{-1})(ss) = e \cdot e = e$. ✓

So $(rs)^{-1} = rs$ (the element is its own inverse). Equivalently, $(rs)^{-1} = sr^3 = rs$ — both canonical forms represent the same element.

$\boxed{(rs)^{-1} = rs = sr^3.}$

*General fact.* Every reflection in $D_n$ has order $2$, so it is its own inverse.

$\blacksquare$

---

**Example 3 (Orders of elements in $D_4$).** Find the order of every element.

*Definition.* The order $|g|$ is the smallest positive integer $k$ with $g^k = e$.

- $|e| = 1$. (Trivially.)
- $|r| = 4$. $r^1 = r, r^2 = r^2, r^3 = r^3, r^4 = e$. Smallest $k$ with $r^k = e$ is $4$.
- $|r^2| = 2$. $r^2 \neq e$ (since $|r| = 4 > 2$); $(r^2)^2 = r^4 = e$. So order $2$. Geometric: $r^2 = R_{180°}$ is a half-turn.
- $|r^3| = 4$. $(r^3)^2 = r^6 = r^2 \neq e$; $(r^3)^3 = r^9 = r \neq e$; $(r^3)^4 = r^{12} = e$. Order $4$.
- $|s| = 2$. $s^2 = e$ by definition.
- $|rs| = 2$. Computed in Example 2.
- $|r^2 s| = 2$. $(r^2 s)^2 = r^2 s \cdot r^2 s = r^2 (sr^2) s = r^2 (r^{-2}s) s = r^2 r^{-2} s^2 = e$. ✓
- $|r^3 s| = 2$. Similar: $(r^3 s)^2 = r^3 s r^3 s = r^3 (sr^3) s = r^3 (r^{-3}s) s = s^2 = e$.

**Summary.**

| Element | Order |
|---|---|
| $e$ | $1$ |
| $r$ | $4$ |
| $r^2$ | $2$ |
| $r^3$ | $4$ |
| $s$ | $2$ |
| $rs$ | $2$ |
| $r^2 s$ | $2$ |
| $r^3 s$ | $2$ |

Count: one element of order $1$, five elements of order $2$, two elements of order $4$. Total $1 + 5 + 2 = 8$. ✓

*Geometric interpretation.* Order-$4$ elements are the $90°$ and $270°$ rotations. Order-$2$ elements are the $180°$ rotation and the four reflections. Identity is order $1$. $\blacksquare$

---

**Example 4 (Symmetries of a non-square rectangle).**

*Setup.* Take a rectangle with unequal side lengths (say $4 \times 2$).

*Rotations.* Only $R_{180°}$ (half-turn) preserves the rectangle. $R_{90°}$ would swap the long and short sides, changing the shape. So rotation symmetries: $\{e, R_{180°}\}$.

*Reflections.* The rectangle's two axes of symmetry are its horizontal and vertical bisectors:
- $h$ = reflection across horizontal bisector (fixes the horizontal middle).
- $v$ = reflection across vertical bisector.

Diagonal reflections (across $y = x$, etc.) fail because the sides are unequal.

**Total symmetries:** $\{e, R_{180°}, h, v\}$, four elements.

*Cayley table.* Let $a = R_{180°}, b = h, c = v$. Then:
- $a^2 = e$ (two half-turns = identity).
- $b^2 = c^2 = e$ (reflections are involutions).
- $ab$: half-turn followed by $h$. A half-turn $(x, y) \to (-x, -y)$ followed by $h: (x, y) \to (x, -y)$ gives $(x, y) \to (-x, y)$, which is $v$. So $ab = v = c$.
- $bc$: $h \circ v$: $(x, y) \to (x, -y) \to (-x, -y)$, which is $R_{180°} = a$. So $bc = a$.
- Similarly $ac = b, ba = c, ca = b, cb = a$.

$$
\begin{array}{c|cccc}
\circ & e & a & b & c \\
\hline
e & e & a & b & c \\
a & a & e & c & b \\
b & b & c & e & a \\
c & c & b & a & e
\end{array}
$$

Observe: the table is **symmetric about the diagonal**, so the group is **abelian**. Every non-identity element has order $2$. Every element's inverse is itself.

This is the **Klein four-group** $V_4 = \{e, a, b, c\}$ with $a^2 = b^2 = c^2 = e$ and $ab = c, bc = a, ca = b$.

Alternatively, $V_4 \cong \mathbb{Z}/2\mathbb{Z} \times \mathbb{Z}/2\mathbb{Z}$ (see [[11-direct-products]]).

**Key difference from $D_3$ or $D_4$.** $V_4$ is abelian; $D_n$ for $n \geq 3$ is non-abelian. The difference stems from losing the $n$-fold rotational symmetry — a non-square rectangle doesn't have a full "rotation + reflection" tension. $\blacksquare$

---

**Example 5 (Chirality of letters).**

We classify the symmetry group of several common letters and shapes.

*Letter "F".* No rotation (other than $R_0$) or reflection preserves "F". Symmetry group: $\{e\}$, trivial.

*Letter "Z".* Rotation by $180°$ preserves "Z" (since Z is invariant under $180°$ rotation about its center). No reflection symmetry. Symmetry group: $\{e, R_{180°}\} \cong \mathbb{Z}/2\mathbb{Z}$.

*Letter "H".* Has both horizontal and vertical reflection symmetry, plus $R_{180°} = h \circ v$. Symmetry group: $V_4$, the Klein four-group.

*Letter "X".* (Drawn symmetrically, with equal arms.) Has $4$ rotations (by $0°, 90°, 180°, 270°$) and $4$ reflections (two through arm midlines, two through angle bisectors). Symmetry group: $D_4$.

*If "X" is drawn with thick-thin arms* (as in some fonts): only horizontal and vertical reflections + half-turn. Symmetry group: $V_4$.

*A $5$-pointed star with bilateral symmetry.* Has $5$ rotations ($0°, 72°, \ldots$) and $5$ reflections (through each point). Total $10$. Symmetry group: $D_5$.

*Pinwheel with $5$ curved blades* (no reflection): Symmetry group: $C_5 = \mathbb{Z}/5\mathbb{Z}$.

$\blacksquare$

---

## 2.8 Practice Problems

1. Describe the symmetry group of a regular hexagon. How many elements? What are the generators?
2. What is the symmetry group of the letter "Z"?
3. In $D_3$, compute $s_B \circ s_C$.
4. Show that in $D_n$, every element is either a rotation $r^k$ or a reflection $sr^k$ (exactly $n$ of each).
5. Find a figure whose symmetry group is $\mathbb{Z}_3$ (cyclic of order 3). *Hint: remove symmetry by orientation.*
6. Prove that $D_n$ is non-abelian for $n \geq 3$.
7. List all subgroups of $D_4$.

### Solutions

**Solution 1.** Symmetry group of the regular hexagon.

*Rotations.* A hexagon has $6$-fold rotational symmetry: rotations by multiples of $60°$. That is $6$ rotations: $R_0, R_{60°}, R_{120°}, R_{180°}, R_{240°}, R_{300°}$.

*Reflections.* A hexagon has $6$ axes of symmetry:
- $3$ axes through opposite vertices (each axis passes through a pair of diagonally opposite vertices).
- $3$ axes through midpoints of opposite edges.

Total: $6 + 6 = 12$ symmetries. **Group:** $D_6$, order $12$.

*Generators.* Take $r = R_{60°}$ and $s$ = any reflection (e.g., through a vertex pair).

*Relations.* $r^6 = e$ (six $60°$ rotations = identity). $s^2 = e$. $srs = r^{-1}$ (conjugating a rotation by a reflection inverts it).

**Presentation:** $D_6 = \langle r, s \mid r^6 = s^2 = e, \; srs = r^{-1}\rangle$. $\blacksquare$

---

**Solution 2.** Letter "Z" has $180°$ rotational symmetry but no reflection symmetry.

*Verify no reflection.* A horizontal flip of "Z" gives the mirror image "S-like" shape, not "Z". A vertical flip gives a "sideways-Z". Neither is "Z".

*Verify $R_{180°}$.* Rotating "Z" by $180°$ returns "Z" (the stroke goes top-left to bottom-right before; after $180°$, it goes bottom-right to top-left — same figure).

**Symmetry group:** $\{e, R_{180°}\} \cong \mathbb{Z}/2\mathbb{Z} = C_2$. $\blacksquare$

---

**Solution 3.** Compute $s_B \circ s_C$ in $D_3$.

*Recall.* $s_B$ fixes $B$, swaps $A \leftrightarrow C$. $s_C$ fixes $C$, swaps $A \leftrightarrow B$.

Apply $s_C$ first, then $s_B$:
- $A \xrightarrow{s_C} B \xrightarrow{s_B} B$. So $(s_B s_C)(A) = B$.
- $B \xrightarrow{s_C} A \xrightarrow{s_B} C$. So $(s_B s_C)(B) = C$.
- $C \xrightarrow{s_C} C \xrightarrow{s_B} A$. So $(s_B s_C)(C) = A$.

Result: $A \to B, B \to C, C \to A$ — the rotation $R_{120°} = r_1$.

$$\boxed{s_B \circ s_C = r_1.}$$

*Remark.* Composition of two reflections in $D_n$ always gives a rotation. If the reflecting lines make angle $\theta$, the resulting rotation is by $2\theta$. Here the lines through $B$ and $C$ make $120°$, and $s_B \circ s_C = R_{240°}$? Let me double-check. Actually the angle from the $C$-axis (at $-120°$ from x-axis) to the $B$-axis (at $+120°$) is $240°$. So $R_{2 \cdot 240°} = R_{480°} = R_{120°} = r_1$. ✓ (Or: angle between the lines, modulo $180°$, is $60°$, giving $R_{120°}$.) $\blacksquare$

---

**Solution 4.** Every element of $D_n$ has the form $r^k$ or $sr^k$ (exactly $n$ of each).

*Recall.* $D_n = \langle r, s \mid r^n = s^2 = e, \; srs = r^{-1}\rangle$. Elements are words in $r, s$.

*Key relation rewrite.* From $srs = r^{-1}$: $sr = r^{-1}s$. More generally, $sr^k = r^{-k}s$ for any integer $k$ (induction: $sr^{k+1} = (sr^k) r = r^{-k}sr = r^{-k} r^{-1} s = r^{-(k+1)}s$).

*Word-reduction.* Any word in $r, s$ can be reduced by repeatedly applying $sr^k = r^{-k}s$ to move all $s$'s to the right:
- Any word $w$ is a finite sequence of $r^{\pm 1}$'s and $s$'s.
- Each time an $s$ appears before an $r$ (like $\ldots sr \ldots$), use $sr = r^{-1}s$ to move $s$ one step right.
- Since $s^2 = e$, any consecutive $s s$ cancels.

After reduction, the word has the form $r^k s^\varepsilon$ with $k \in \mathbb{Z}, \varepsilon \in \{0, 1\}$.

*Reduce $k$ mod $n$.* Since $r^n = e$, we can take $k \in \{0, 1, \ldots, n - 1\}$.

So the $2n$ canonical forms are:
$$\{r^0, r^1, \ldots, r^{n-1}\} \cup \{r^0 s, r^1 s, \ldots, r^{n-1} s\}.$$

*Distinctness.* Suppose $r^i = r^j$ (with $0 \leq i, j < n$). Then $r^{i - j} = e$, so $n \mid (i - j)$; with $|i - j| < n$, this gives $i = j$. Similarly $r^i s = r^j s$ implies $r^i = r^j$ (right-cancel $s$), hence $i = j$. And $r^i \neq r^j s$ for any $i, j$: else $s = r^{i - j} \in \langle r\rangle$, but $s$ is a reflection (orientation-reversing) while elements of $\langle r\rangle$ are rotations (orientation-preserving) — contradiction.

So we have exactly $2n$ distinct elements. Since $|D_n| = 2n$, these are all of $D_n$.

*Alternate form.* We could equally write elements as $s^\varepsilon r^k$; using $sr^k = r^{-k}s$, we have $sr^k = r^{-k}s$, so $\{sr^k : 0 \leq k < n\} = \{r^{-k}s : 0 \leq k < n\} = \{r^j s : 0 \leq j < n\}$ (the same set, just reindexed).

**Conclusion.** $D_n = \{r^0, r^1, \ldots, r^{n-1}\} \sqcup \{s, rs, r^2 s, \ldots, r^{n-1} s\}$ — $n$ rotations and $n$ reflections.

$\blacksquare$

---

**Solution 5.** A figure with symmetry group $C_3 = \mathbb{Z}/3\mathbb{Z}$.

*Requirement.* Must have $3$-fold rotational symmetry (rotations by $0°, 120°, 240°$) but **no** reflection symmetry.

*Construction: the triskelion.* Draw three curved spirals (or bent legs) meeting at a center, all spiraling in the same rotational direction (e.g., all clockwise).

- Rotation by $120°$ cycles the three spirals, preserving the figure. ✓
- A reflection would reverse the spiral direction, producing a mirror image that is not identical to the original. ✗

Hence the symmetry group consists of only the $3$ rotations: $\{R_0, R_{120°}, R_{240°}\} = C_3$.

*Real-world examples.*
- Flag of the **Isle of Man** (three armored legs bent at the knee, all pointing in the same rotational direction): $C_3$.
- A pinwheel or windmill with $3$ blades curved in one direction: $C_3$.

*Contrast.* A simple equilateral triangle has $D_3$ (rotations + reflections). Adding directional ornamentation breaks the reflection symmetry, leaving only $C_3$.

$\blacksquare$

---

**Solution 6.** $D_n$ is non-abelian for $n \geq 3$.

*Strategy.* Exhibit two elements whose products in the two orders differ.

*Use $r$ and $s$.* Compute $sr$ and $rs$ using the key relation $srs = r^{-1}$.

$sr \cdot s = srs = r^{-1}$, so $sr = r^{-1} s$.
$rs$: leave as $rs$.

Claim: $sr \neq rs$ unless $r^{-1} = r$, i.e., $r^2 = e$.

$r$ has order $n$, so $r^2 = e$ iff $n \mid 2$ iff $n \in \{1, 2\}$.

For $n \geq 3$, $r^2 \neq e$, so $r^{-1} \neq r$, so $sr = r^{-1}s \neq rs$.

Hence $sr \neq rs$ in $D_n$ for $n \geq 3$, proving non-commutativity.

**$D_n$ is non-abelian for $n \geq 3$.** $\blacksquare$

*Remark.* For $n = 1$: $D_1 \cong \mathbb{Z}/2\mathbb{Z}$, abelian. For $n = 2$: $D_2 = V_4$, abelian. For $n \geq 3$: non-abelian.

---

**Solution 7.** List all subgroups of $D_4$.

$D_4 = \{e, r, r^2, r^3, s, rs, r^2 s, r^3 s\}$, order $8$.

By **Lagrange's theorem** (proved later in [[09-cosets-and-lagranges-theorem]]), the order of any subgroup divides $|D_4| = 8$. So possible orders are $\{1, 2, 4, 8\}$.

*Order $1$.* Only $\{e\}$.

*Order $2$.* Subgroups generated by elements of order $2$. From Example 3, elements of order $2$: $\{r^2, s, rs, r^2 s, r^3 s\}$ — five elements.
- $\langle r^2\rangle = \{e, r^2\}$.
- $\langle s\rangle = \{e, s\}$.
- $\langle rs\rangle = \{e, rs\}$.
- $\langle r^2 s\rangle = \{e, r^2 s\}$.
- $\langle r^3 s\rangle = \{e, r^3 s\}$.

Total: $5$ subgroups of order $2$.

*Order $4$.* Subgroups of order $4$ have index $2$, hence are normal (to be proved later). They are:

*(i) $\langle r\rangle = \{e, r, r^2, r^3\}$ — cyclic of order $4$.*

*(ii) $\{e, r^2, s, r^2 s\}$.* Check closure:
- $s \cdot r^2 s = s(r^2 s) = (sr^2) s = r^{-2}s \cdot s = r^{-2} = r^2$. ✓ (in the subset)
- $r^2 \cdot s = r^2 s$. ✓
- $r^2 \cdot r^2 s = r^4 s = s$. ✓
- $(r^2 s)^2 = e$ (verified in Example 3). ✓

This is a Klein four-subgroup: three elements of order $2$ (namely $r^2, s, r^2 s$) and identity. $\cong V_4$.

*(iii) $\{e, r^2, rs, r^3 s\}$.* Similar check:
- $rs \cdot r^3 s = r(sr^3)s = r \cdot r^{-3}s \cdot s = r^{-2} = r^2$. ✓
- $(rs)(r^2) = rsr^2 = r(sr)r = r(r^{-1}s)r = sr = r^{-1}s = r^3 s$. ✓
- $(rs)^2 = e$ (Example 2). ✓

Also $\cong V_4$.

Total: $3$ subgroups of order $4$.

*Order $8$.* Only $D_4$ itself.

**Summary.**

| Order | Subgroups | Count |
|---|---|---|
| $1$ | $\{e\}$ | $1$ |
| $2$ | $\langle r^2\rangle, \langle s\rangle, \langle rs\rangle, \langle r^2 s\rangle, \langle r^3 s\rangle$ | $5$ |
| $4$ | $\langle r\rangle, \{e, r^2, s, r^2 s\}, \{e, r^2, rs, r^3 s\}$ | $3$ |
| $8$ | $D_4$ | $1$ |

**Total: $10$ subgroups.** The subgroup lattice is discussed in [[12-subgroup-lattice-and-dihedral-groups]]. $\blacksquare$

---

## 2.9 Cross-References

**Previous:** [[01-operations-and-algebraic-structures]] — binary operations set the stage.

**Next:**
- [[03-groups-definition-and-examples]] — the formal definition of a group, with $D_n$ as a prototype.
- [[05-permutation-and-dihedral-groups]] — a systematic treatment of $S_n$ and $D_n$.
- [[04-subgroups-generators-cayley-diagrams]] — Cayley diagrams make the structure of $D_n$ visual.

**Takeaway.** The symmetries of a geometric figure form a group. Rotations form a cyclic subgroup; reflections contribute non-abelian structure. The dihedral groups $D_n$ will reappear throughout this guide as the canonical small non-abelian examples.
