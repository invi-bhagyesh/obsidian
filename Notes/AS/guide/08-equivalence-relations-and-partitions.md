# 8. Equivalence Relations and Partitions

> **Bridge chapter.** Before cosets (next chapter), we need the tool that turns "having a common property" into "being in the same set": **equivalence relations** and the matching **partitions** they induce. This duality — "relation ↔ partition" — appears throughout algebra. Cosets partition a group. Conjugacy classes partition a group. Orbits partition a set under group action. The ring $\mathbb{Z}_n$ *is* a partition of $\mathbb{Z}$ into congruence classes. Get the bijection down once, here, and the rest of CO2–CO3 becomes painless.

---

## 8.1 Equivalence Relations

> **Definition (Binary relation).** A **binary relation** on a set $X$ is a subset $R \subseteq X \times X$. Write $a \sim b$ for $(a, b) \in R$.

> **Definition (Equivalence relation).** A relation $\sim$ on $X$ is an **equivalence relation** if:
> 1. **(Reflexive)** $\forall a \in X : a \sim a$.
> 2. **(Symmetric)** $a \sim b \Rightarrow b \sim a$.
> 3. **(Transitive)** $a \sim b \wedge b \sim c \Rightarrow a \sim c$.

Equivalence relations capture "sameness in some respect": same color, same parity, same residue mod $n$, same coset, same conjugacy class.

---

## 8.2 Examples and Non-examples

**Example 1 (Equality).** $a = b$ on any set $X$. The trivial equivalence relation.

**Example 2 (Congruence mod $n$).** $a \sim b \iff n \mid (a - b)$, on $\mathbb{Z}$.
- Reflexive: $n \mid 0 = a - a$. ✓
- Symmetric: $n \mid (a-b) \Rightarrow n \mid (b-a)$. ✓
- Transitive: $n \mid (a-b), n \mid (b-c) \Rightarrow n \mid ((a-b)+(b-c)) = (a-c)$. ✓

**Example 3 (Parallel lines).** Two lines in the plane are parallel iff they have the same slope (or both vertical). Equivalence relation.

**Example 4 (Conjugacy in $S_n$).** $\sigma \sim \tau \iff \exists \rho : \tau = \rho \sigma \rho^{-1}$. Equivalence relation (reflexivity via $\rho = e$; symmetry via $\rho \mapsto \rho^{-1}$; transitivity by composition).

**Example 5 (Same cycle type).** In $S_n$, $\sigma \sim \tau$ iff same cycle type. Equivalence; same partition as Example 4 by Corollary 5.6 of [[05-permutation-and-dihedral-groups]].

**Non-example 1.** $a \leq b$ on $\mathbb{Z}$: reflexive, transitive, but **not symmetric** ($2 \leq 3$ but $3 \not\leq 2$). "Partial order."

**Non-example 2.** $a \sim b \iff |a - b| < 1$ on $\mathbb{R}$: reflexive, symmetric, but **not transitive** ($0 \sim 0.7 \sim 1.3$ but $0 \not\sim 1.3$).

**Non-example 3.** $a \sim b \iff a \neq b$: symmetric, transitive on $X$ with $|X| \leq 1$, but **not reflexive**. (Technically transitive fails too: $a \sim b \sim a$ would give $a \sim a$, which is false.)

---

## 8.3 Equivalence Classes

> **Definition.** Given an equivalence relation $\sim$ on $X$, the **equivalence class** of $a \in X$ is
> $$[a] = \{x \in X : x \sim a\}.$$
> The **quotient set** $X/\sim$ is the collection of all equivalence classes.

> **Theorem 8.1 (Fundamental properties).** Let $\sim$ be an equivalence relation on $X$.
> 1. $a \in [a]$ for all $a$ (classes are non-empty).
> 2. $[a] = [b] \iff a \sim b$.
> 3. Either $[a] = [b]$ or $[a] \cap [b] = \emptyset$ (classes are either equal or disjoint).
> 4. $X = \bigcup_{a \in X} [a]$ (classes cover $X$).

*Proof.*
1. $a \sim a$, so $a \in [a]$.
2. ($\Leftarrow$) Suppose $a \sim b$. Take $x \in [a]$: $x \sim a \sim b$, so $x \in [b]$, i.e., $[a] \subseteq [b]$. Similarly $[b] \subseteq [a]$.
   ($\Rightarrow$) $[a] = [b]$ and $a \in [a]$ gives $a \in [b]$, i.e., $a \sim b$.
3. Suppose $c \in [a] \cap [b]$, so $c \sim a$ and $c \sim b$. Then $a \sim b$ (via symm + trans), and by (2), $[a] = [b]$.
4. Every $a \in [a] \subseteq \bigcup [x]$. $\blacksquare$

Points 3 and 4 together say: **the equivalence classes partition $X$.**

---

## 8.4 Partitions

> **Definition (Partition).** A **partition** of a set $X$ is a collection $\mathcal{P} = \{X_\alpha\}$ of non-empty subsets of $X$ such that:
> 1. $\bigcup X_\alpha = X$.
> 2. $X_\alpha \neq X_\beta \Rightarrow X_\alpha \cap X_\beta = \emptyset$.

Two views of the same structure: either give equivalence classes, or give disjoint blocks that cover $X$.

> **Theorem 8.2 (Relation-partition bijection).** For any set $X$, there is a natural bijection:
> $$\{\text{equivalence relations on } X\} \longleftrightarrow \{\text{partitions of } X\}.$$
>
> - Given $\sim$: take the partition $\{[a] : a \in X\}$.
> - Given $\mathcal{P} = \{X_\alpha\}$: define $a \sim b \iff \exists \alpha : a, b \in X_\alpha$.
>
> *Proof.* One direction is Theorem 8.1. For the other: given a partition $\mathcal{P}$, define $\sim$ as stated. Then $\sim$ is reflexive (each $a$ is in its unique block), symmetric ("together in a block" is symmetric), transitive (if $a, b \in X_\alpha$ and $b, c \in X_\beta$, then $X_\alpha \cap X_\beta \ni b$, so $X_\alpha = X_\beta$, hence $a, c$ in the same block). The two constructions are inverse. $\blacksquare$

---

## 8.5 Modular Arithmetic via Equivalence Classes

Congruence mod $n$ partitions $\mathbb{Z}$ into $n$ classes:
$$[0] = \{\ldots, -n, 0, n, 2n, \ldots\}, \quad [1] = \{\ldots, 1-n, 1, 1+n, \ldots\}, \quad \ldots, \quad [n-1].$$

The quotient set $\mathbb{Z}/n\mathbb{Z} = \{[0], [1], \ldots, [n-1]\}$ is the set $\mathbb{Z}_n$.

**Well-definedness of operations.** Addition and multiplication descend to $\mathbb{Z}_n$: if $a \sim a'$ and $b \sim b'$, then $a + b \sim a' + b'$ and $ab \sim a'b'$.

Proof: $a - a' = ni$, $b - b' = nj$. Then $(a+b) - (a'+b') = n(i+j)$ ✓. And $ab - a'b' = ab - a'b + a'b - a'b' = n(ib + a'j)$ ✓.

This is the prototype for why quotient groups and quotient rings "make sense."

---

## 8.6 Conjugacy Relation in a Group

> **Definition.** In a group $G$, elements $a, b$ are **conjugate** ($a \sim b$) if $\exists g \in G$ with $b = gag^{-1}$.

> **Theorem 8.3.** Conjugacy is an equivalence relation on $G$. The equivalence classes are called **conjugacy classes**.

*Proof.*
- Reflexive: $a = eae^{-1}$.
- Symmetric: $b = gag^{-1} \Rightarrow a = g^{-1}bg = g^{-1}b(g^{-1})^{-1}$.
- Transitive: $b = gag^{-1}, c = hbh^{-1} \Rightarrow c = (hg)a(hg)^{-1}$. $\blacksquare$

**Example 6 ($S_3$ conjugacy classes).** $S_3$ partitions into:
- $\{e\}$ — size 1
- $\{(1\,2), (1\,3), (2\,3)\}$ — size 3 (transpositions)
- $\{(1\,2\,3), (1\,3\,2)\}$ — size 2 (3-cycles)

Total: $1 + 3 + 2 = 6 = |S_3|$. Class sizes divide $|S_3|$ — this is the **class equation** (see [[16-centralizer-normalizer-stabilizer]]).

---

## 8.7 Worked Examples

**Example 7 (Classes of fractions).** Define on $\mathbb{Z} \times \mathbb{Z}^*$ (with $\mathbb{Z}^* = \mathbb{Z} \setminus \{0\}$): $(a, b) \sim (c, d) \iff ad = bc$. Show this is an equivalence relation; identify the classes.

*Solution.*
- Reflexive: $ab = ba$. ✓
- Symmetric: $ad = bc \Rightarrow cb = da$. ✓
- Transitive: $(a, b) \sim (c, d)$ and $(c, d) \sim (e, f)$: $ad = bc$, $cf = de$. Multiply: $adf = bcf = bde$. Since $d \neq 0$, cancel: $af = be$, i.e., $(a, b) \sim (e, f)$. ✓

Classes: $[(a, b)]$ is the set of all "equivalent" pairs — these are precisely the representations of the fraction $a/b$. Quotient = $\mathbb{Q}$. $\blacksquare$

**Example 8 (Diagonal of $\mathbb{R}^2$).** Define $(x_1, y_1) \sim (x_2, y_2) \iff x_1 + y_1 = x_2 + y_2$. Describe the classes geometrically.

*Solution.* Sum of coordinates is the invariant. $[(x, y)]$ = set of points on the line $X + Y = x + y$ = the anti-diagonal line through $(x, y)$. Quotient set = $\{$anti-diagonal lines$\} \cong \mathbb{R}$ (line parametrized by $x + y$). $\blacksquare$

**Example 9 (Same fiber).** Given $f : X \to Y$, define $x_1 \sim x_2 \iff f(x_1) = f(x_2)$. Verify equivalence relation; describe classes.

*Solution.* Reflexive, symmetric, transitive all immediate. Classes: $[x] = f^{-1}(f(x))$ — the "fiber" over $f(x)$. Quotient $X / \sim$ is in bijection with $\text{image}(f) \subseteq Y$. This is the set-theoretic **first isomorphism theorem**. $\blacksquare$

**Example 10 (Counting partitions).** How many partitions of a 3-element set $\{a, b, c\}$?

*Solution.*
- 1 block: $\{\{a, b, c\}\}$.
- 2 blocks: $\{\{a\}, \{b, c\}\}$, $\{\{b\}, \{a, c\}\}$, $\{\{c\}, \{a, b\}\}$.
- 3 blocks: $\{\{a\}, \{b\}, \{c\}\}$.

Total: $1 + 3 + 1 = 5$. This is the **Bell number** $B_3 = 5$. $\blacksquare$

**Example 11 ($\mathbb{R}/\mathbb{Q}$).** On $\mathbb{R}$, define $a \sim b \iff a - b \in \mathbb{Q}$. Equivalence? Describe classes.

*Solution.* Reflexive ($0 \in \mathbb{Q}$), symmetric ($\mathbb{Q}$ closed under negation), transitive ($\mathbb{Q}$ closed under addition). Class of $a$ = $a + \mathbb{Q}$. Quotient is "reals modulo rationals," an uncountable set. This is used in constructions of non-measurable sets (Vitali sets). $\blacksquare$

---

## 8.8 Practice Problems

1. On $\mathbb{Z}$, define $a \sim b$ iff $a + b$ is even. Equivalence? How many classes?
2. On $\mathbb{R}^2$, $p \sim q$ iff $\|p\| = \|q\|$. Equivalence? Geometric description of classes?
3. Count the partitions of a 4-element set (find $B_4$).
4. In $S_4$, list the conjugacy classes with their sizes; verify they sum to 24.
5. On $\mathbb{Z}$, $a \sim b$ iff $a b > 0$. Is this an equivalence?
6. Find the number of equivalence relations on $\{1, 2, 3\}$.
7. Show that $\{a \in \mathbb{Z} : a \equiv 3 \pmod 7\}$ is infinite.

### Solutions

**Solution 1.** $a + b$ even iff $a, b$ same parity. ✓ equivalence. Two classes: even integers, odd integers. $\blacksquare$

**Solution 2.** Equivalence (reflexive/symmetric/transitive via $=$ on norms). Classes: circles centered at origin (radius $\geq 0$). $\mathbb{R}^2/{\sim}$ corresponds to $[0, \infty)$ — the set of possible radii. $\blacksquare$

**Solution 3.** $B_4 = 15$. Enumerate by cycle type:
- 1 block (cycle type $4$): 1
- 2 blocks ($3+1$ or $2+2$): $\binom{4}{3} = 4$ (for $3+1$) plus $\binom{4}{2}/2 = 3$ (for $2+2$) = 7
- 3 blocks ($2+1+1$): $\binom{4}{2} = 6$
- 4 blocks ($1^4$): 1

Total: $1 + 7 + 6 + 1 = 15$. $\blacksquare$

**Solution 4.** Conjugacy classes of $S_4$ = cycle types, i.e., partitions of 4:
- $1^4$: $\{e\}$, size 1
- $2\,1^2$: transpositions, size $\binom{4}{2} = 6$
- $2^2$: double-transpositions, size 3
- $3\,1$: 3-cycles, size $\binom{4}{3} \cdot 2 = 8$
- $4$: 4-cycles, size $(4-1)! = 6$

Total: $1 + 6 + 3 + 8 + 6 = 24$ ✓. $\blacksquare$

**Solution 5.** Reflexive? $a \cdot a = a^2 \geq 0$; need $> 0$. Fails if $a = 0$ (since $0 \cdot 0 = 0 \not> 0$). **Not reflexive**. Not an equivalence. $\blacksquare$

**Solution 6.** Number of equivalence relations on $\{1, 2, 3\}$ = Bell number $B_3 = 5$ (Example 10). $\blacksquare$

**Solution 7.** The class is $\{3 + 7k : k \in \mathbb{Z}\} = \{\ldots, -11, -4, 3, 10, 17, \ldots\}$. Infinite. $\blacksquare$

---

## 8.9 Cross-References

**Previous:** [[07-co1-practice-problems]]

**Next:**
- [[09-cosets-and-lagranges-theorem]] — cosets define a very important equivalence relation on $G$
- [[15-group-actions]] — orbits are equivalence classes of "same orbit under the group"
- [[16-centralizer-normalizer-stabilizer]] — conjugacy classes and the class equation

**Takeaway.** Every equivalence relation corresponds to a partition, and vice versa. In group theory, we'll pick up more special relations (congruence mod a subgroup, conjugacy, orbit-equivalence), and each gives a quotient structure. Mastering the abstract theory once here saves time later.
