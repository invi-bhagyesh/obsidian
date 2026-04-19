# 5. Permutation Groups and Dihedral Groups

> **Why permutations dominate group theory.** Cayley's theorem (proved in [[17-homomorphisms-and-isomorphisms]]) says: *every group is isomorphic to a subgroup of some $S_n$*. That makes permutation groups the universal object of study. Concretely, many finite groups — $\mathbb{Z}_n$, $D_n$, $A_n$, the quaternion group — admit natural representations as permutation groups. This chapter develops the machinery: cycle notation, transpositions, parity, and the alternating group.

---

## 5.1 The Symmetric Group $S_n$

> **Definition.** Let $X = \{1, 2, \ldots, n\}$. The **symmetric group** $S_n$ is the group of all bijections $X \to X$ under composition.

**Order:** $|S_n| = n!$

*Why $n!$?* A bijection $\sigma: X \to X$ is specified by choosing $\sigma(1)$ (one of $n$ elements), then $\sigma(2)$ (one of the remaining $n - 1$), and so on, giving $n \cdot (n - 1) \cdots 2 \cdot 1 = n!$ choices. Each such choice is a legitimate bijection because injectivity on a finite set implies surjectivity.

A permutation $\sigma \in S_n$ can be written in **two-line notation**:
$$\sigma = \begin{pmatrix} 1 & 2 & 3 & \cdots & n \\ \sigma(1) & \sigma(2) & \sigma(3) & \cdots & \sigma(n) \end{pmatrix}.$$

The top row lists the domain, and the bottom row gives the image. Two permutations are equal iff their bottom rows agree.

**Example 1.** $S_3$ has $3! = 6$ elements:
$$\text{id}, \quad \begin{pmatrix}1\,2\,3\\2\,1\,3\end{pmatrix}, \quad \begin{pmatrix}1\,2\,3\\3\,2\,1\end{pmatrix}, \quad \begin{pmatrix}1\,2\,3\\1\,3\,2\end{pmatrix}, \quad \begin{pmatrix}1\,2\,3\\2\,3\,1\end{pmatrix}, \quad \begin{pmatrix}1\,2\,3\\3\,1\,2\end{pmatrix}.$$

*Sanity check on the group axioms (brief).*

- **Closure.** The composition of two bijections of $X$ is again a bijection of $X$ (bijections are closed under composition).
- **Associativity.** Composition of functions is always associative: $((\sigma \tau) \rho)(x) = (\sigma \tau)(\rho(x)) = \sigma(\tau(\rho(x))) = \sigma((\tau \rho)(x)) = (\sigma(\tau\rho))(x)$.
- **Identity.** The identity map $\text{id}(x) = x$ is a bijection and satisfies $\text{id} \circ \sigma = \sigma \circ \text{id} = \sigma$.
- **Inverses.** A bijection $\sigma$ has a set-theoretic inverse $\sigma^{-1}$ (the function reversing the arrows), which is itself a bijection and satisfies $\sigma \sigma^{-1} = \sigma^{-1} \sigma = \text{id}$.

So $S_n$ is a group by the general principle "bijections of a set form a group under composition."

---

## 5.2 Cycle Notation

Two-line notation is clunky (it repeats the top row every time). **Cycle notation** is more economical because it exploits the orbit structure of the action $\sigma \curvearrowright X$.

> **Definition.** A **cycle** $(a_1\, a_2\, \ldots\, a_k)$ is the permutation that sends
> $$a_1 \to a_2, \quad a_2 \to a_3, \quad \ldots, \quad a_{k-1} \to a_k, \quad a_k \to a_1$$
> and fixes every element not in $\{a_1, \ldots, a_k\}$. Its **length** is $k$. A cycle of length $2$ is a **transposition**.

Two cycles are **disjoint** if they share no letter. Disjoint cycles act on different elements, so they do not interfere — we will see this formally below.

**Example 2.** Let $\sigma = \begin{pmatrix}1\,2\,3\,4\,5\\3\,5\,1\,4\,2\end{pmatrix}$.

*Strategy.* To read off the cycle decomposition, we pick an element and follow its orbit under repeated application of $\sigma$. Each orbit closes up (because $X$ is finite and $\sigma$ is injective), giving one cycle. We then pick an element not yet used, and repeat.

*Execution.*
- Start with $1$: $1 \xrightarrow{\sigma} 3 \xrightarrow{\sigma} 1$. Closed — cycle $(1\,3)$.
- Next unused element: $2$. $2 \xrightarrow{\sigma} 5 \xrightarrow{\sigma} 2$. Closed — cycle $(2\,5)$.
- Next unused: $4$. $4 \xrightarrow{\sigma} 4$. Fixed — cycle $(4)$, which we suppress.

Therefore $\sigma = (1\,3)(2\,5)$.

*Verification.* Apply $(1\,3)(2\,5)$ to each $x \in \{1, \ldots, 5\}$: $1 \mapsto 3$, $2 \mapsto 5$, $3 \mapsto 1$, $4 \mapsto 4$, $5 \mapsto 2$. Matches the bottom row of the two-line notation. $\checkmark$

> **Theorem 5.1 (Disjoint cycle decomposition).** Every permutation $\sigma \in S_n$ can be written as a product of pairwise disjoint cycles, and this decomposition is **unique** up to the order of the factors and the starting point within each cycle.

**Proof.**

*Step 1: Construction of the decomposition.*

Define an equivalence relation on $X = \{1, 2, \ldots, n\}$ by
$$x \sim y \iff y = \sigma^k(x) \text{ for some } k \in \mathbb{Z}.$$

This is indeed an equivalence relation:
- *Reflexive.* $x = \sigma^0(x)$.
- *Symmetric.* If $y = \sigma^k(x)$, then $x = \sigma^{-k}(y)$.
- *Transitive.* If $y = \sigma^k(x)$ and $z = \sigma^\ell(y)$, then $z = \sigma^{\ell + k}(x)$.

The equivalence classes are the **$\sigma$-orbits** of $X$; they partition $X$.

For each orbit $O$, pick any $a \in O$ and list its elements in the order they appear under $\sigma$:
$$a, \sigma(a), \sigma^2(a), \ldots, \sigma^{k-1}(a), \text{ with } \sigma^k(a) = a,$$
where $k = |O|$ is the length of the orbit (finite, since $X$ is finite). This gives a cycle
$$c_O = (a \; \sigma(a) \; \sigma^2(a) \; \ldots \; \sigma^{k-1}(a)).$$

The cycles $\{c_O : O \text{ an orbit}\}$ are pairwise disjoint (they act on disjoint orbits). Their product (in any order, since they commute — see Step 3) equals $\sigma$: if $x \in O$, then the product acts as $c_O$ on $x$, which sends $x$ to $\sigma(x)$; all other factors fix $x$. So the product agrees with $\sigma$ on every element.

*Step 2: Uniqueness.*

Suppose $\sigma = c'_1 c'_2 \cdots c'_s$ is another disjoint-cycle decomposition. For each $x \in X$, the cycle $c'_j$ containing $x$ is the one that moves $x$ (or, if $x$ is a fixed point of $\sigma$, no cycle contains $x$). The elements of $c'_j$ containing $x$ are precisely the $\sigma$-orbit of $x$ (since disjoint cycles do not interact, and $c'_j$ cyclically permutes its support). So the set of cycles $\{c'_j\}$ — as unordered sets of permutations — equals $\{c_O\}$.

Within each cycle, the cyclic order of letters is determined (up to choice of starting letter, since a cycle $(a_1 \, a_2 \, \ldots \, a_k) = (a_2 \, a_3 \, \ldots \, a_k \, a_1)$).

*Step 3: Disjoint cycles commute.* (Used implicitly in Step 1.)

Let $\alpha, \beta$ be disjoint cycles, with supports $A = \text{supp}(\alpha)$ and $B = \text{supp}(\beta)$, $A \cap B = \emptyset$. For $x \in X$:
- If $x \in A$: $\alpha(x) \in A$ and $\beta$ fixes $A$ (since $A \cap B = \emptyset$), so $\beta(\alpha(x)) = \alpha(x)$ and $\alpha(\beta(x)) = \alpha(x)$. Equal.
- If $x \in B$: symmetric argument gives $\alpha(\beta(x)) = \beta(x) = \beta(\alpha(x))$.
- If $x \notin A \cup B$: both $\alpha$ and $\beta$ fix $x$, so both compositions give $x$.

In every case $\alpha\beta(x) = \beta\alpha(x)$, so $\alpha\beta = \beta\alpha$. $\blacksquare$

### Conventions

- We usually suppress fixed points: write $(1\,3)(2\,5)$ rather than $(1\,3)(2\,5)(4)$.
- **Composition** is written $\alpha \beta$ = "apply $\beta$ first, then $\alpha$" (right-to-left). This matches function composition $(\alpha \circ \beta)(x) = \alpha(\beta(x))$.
- A cycle $(a_1\, a_2\, \ldots\, a_k)$ has order $k$: $(a_1 \, \ldots \, a_k)^j$ sends $a_i$ to $a_{i + j \bmod k}$, and this equals the identity iff $k \mid j$.
- Disjoint cycles **commute** (Step 3 above).
- The same cycle can be written starting from any of its letters: $(1\,2\,3) = (2\,3\,1) = (3\,1\,2)$. These are three names for the same permutation, not three different permutations.

### Order of a permutation

> **Theorem 5.2.** If $\sigma = c_1 c_2 \cdots c_r$ is a disjoint cycle decomposition with $c_i$ of length $\ell_i$, then
> $$|\sigma| = \operatorname{lcm}(\ell_1, \ell_2, \ldots, \ell_r).$$

**Proof.**

*Step 1: $\sigma^k = c_1^k c_2^k \cdots c_r^k$.*

Since the $c_i$ are pairwise disjoint, they pairwise commute (Theorem 5.1, Step 3). By induction on $k$ (trivial for $k = 1$; for the inductive step, $\sigma^{k+1} = \sigma^k \sigma = (c_1^k \cdots c_r^k)(c_1 \cdots c_r)$, and repeated commuting rearranges this to $c_1^{k+1} \cdots c_r^{k+1}$). The same holds for negative $k$ by taking inverses.

*Step 2: $\sigma^k = e \iff c_i^k = e$ for each $i$.*

**($\Leftarrow$)** If each $c_i^k = e$, then $\sigma^k = e \cdot e \cdots e = e$.

**($\Rightarrow$)** Suppose $\sigma^k = e$. Then $c_1^k c_2^k \cdots c_r^k = e$. Fix any $i$ and let $x \in \text{supp}(c_i)$. For $j \neq i$, $c_j$ fixes $x$ (since $c_i$ and $c_j$ are disjoint), hence $c_j^k$ fixes $x$. So
$$x = e(x) = \sigma^k(x) = c_1^k(\cdots c_r^k(x)) = c_i^k(x)$$
(the other factors all fix $x$). Thus $c_i^k(x) = x$ for every $x$ in the support of $c_i$. For $x \notin \text{supp}(c_i)$, $c_i^k(x) = x$ automatically. Hence $c_i^k = e$.

*Step 3: $c_i^k = e \iff \ell_i \mid k$.*

A cycle of length $\ell_i$ has order exactly $\ell_i$ (the element $a_1$ returns to itself after exactly $\ell_i$ applications, and no fewer). So $c_i^k = e$ iff $\ell_i \mid k$.

*Step 4: Combining.*

$\sigma^k = e$ iff $\ell_i \mid k$ for every $i$, iff $k$ is a common multiple of $\ell_1, \ldots, \ell_r$, iff $\operatorname{lcm}(\ell_1, \ldots, \ell_r) \mid k$. The smallest positive such $k$ is $\operatorname{lcm}(\ell_1, \ldots, \ell_r)$. $\blacksquare$

*Remark (why disjointness is essential).* Without disjointness, the formula fails. For instance, $(1\,2)(2\,3) = (1\,2\,3)$ is a 3-cycle (order $3$), but $\operatorname{lcm}(2, 2) = 2$. The argument Step 1–2 relies on commutativity of the factors, which only holds for disjoint cycles.

**Example 3.** $\sigma = (1\,2\,3)(4\,5) \in S_5$.

- The cycles $(1\,2\,3)$ and $(4\,5)$ are disjoint.
- Their lengths are $3$ and $2$.
- $|\sigma| = \operatorname{lcm}(3, 2) = 6$.

*Verification by direct computation.* Apply $\sigma$ repeatedly to $1$:
$$1 \xrightarrow{\sigma} 2 \xrightarrow{\sigma} 3 \xrightarrow{\sigma} 1.$$
So $(1\,2\,3)$ contributes period $3$ to the orbit of $1$. The orbit of $4$ has period $2$. The overall permutation returns to identity after the smallest multiple of both, which is $6$. $\checkmark$

**Example 4.** $\sigma = (1\,2)(3\,4)(5\,6\,7)$.

$|\sigma| = \operatorname{lcm}(2, 2, 3) = 6$.

*Note.* The repeated $2$ doesn't change the $\operatorname{lcm}$ — $\operatorname{lcm}(2, 2, 3) = \operatorname{lcm}(2, 3) = 6$.

---

## 5.3 Transpositions and Parity

> **Theorem 5.3.** Every permutation is a product of transpositions.

**Proof.**

By Theorem 5.1, $\sigma = c_1 c_2 \cdots c_r$ for disjoint cycles. It suffices to show each cycle is a product of transpositions.

*Key decomposition.* For $k \geq 2$,
$$(a_1\, a_2\, \ldots\, a_k) = (a_1\, a_k)(a_1\, a_{k-1}) \cdots (a_1\, a_3)(a_1\, a_2).$$

*Verification.* Apply the right-hand side (read right-to-left) to each $a_i$.

- **Apply to $a_1$.** The rightmost transposition is $(a_1\, a_2)$, which sends $a_1 \to a_2$. Each subsequent transposition $(a_1\, a_j)$ for $j \geq 3$ acts on $a_2$ by fixing it (since $a_2 \neq a_1, a_j$). So $a_1 \mapsto a_2$. $\checkmark$

- **Apply to $a_i$ with $2 \leq i \leq k - 1$.** The transpositions $(a_1\, a_2), (a_1\, a_3), \ldots, (a_1\, a_{i-1})$ all fix $a_i$ (they don't involve it). Then $(a_1\, a_i)$ sends $a_i \to a_1$. The next transposition $(a_1\, a_{i+1})$ sends $a_1 \to a_{i+1}$. Subsequent transpositions $(a_1\, a_j)$ with $j \geq i + 2$ fix $a_{i+1}$. So $a_i \mapsto a_{i+1}$. $\checkmark$

- **Apply to $a_k$.** Only the leftmost transposition $(a_1\, a_k)$ involves $a_k$; the earlier ones fix $a_k$. First apply $(a_1\, a_2), \ldots, (a_1\, a_{k-1})$ to $a_k$ — all fix $a_k$ — giving $a_k$. Then $(a_1\, a_k)$ sends $a_k \to a_1$. So $a_k \mapsto a_1$. $\checkmark$

- **Apply to $x \notin \{a_1, \ldots, a_k\}$.** Every transposition $(a_1\, a_j)$ fixes $x$. So $x \mapsto x$. $\checkmark$

The right-hand side acts the same as the cycle on every input, so they are equal as permutations.

A $k$-cycle is therefore a product of $k - 1$ transpositions. Combining decompositions of all cycles in $\sigma$ gives $\sigma$ as a product of transpositions. $\blacksquare$

*Remark.* The identity is the empty product of transpositions, by convention. Alternatively, $\text{id} = (1\,2)(1\,2)$ — two transpositions — which is still an even count.

**Example 5.** $(1\,2\,3\,4) = (1\,4)(1\,3)(1\,2)$.

*Verification.* Apply right to left:
- $1 \xrightarrow{(1\,2)} 2 \xrightarrow{(1\,3)} 2 \xrightarrow{(1\,4)} 2$. So $1 \to 2$. $\checkmark$
- $2 \xrightarrow{(1\,2)} 1 \xrightarrow{(1\,3)} 3 \xrightarrow{(1\,4)} 3$. So $2 \to 3$. $\checkmark$
- $3 \xrightarrow{(1\,2)} 3 \xrightarrow{(1\,3)} 1 \xrightarrow{(1\,4)} 4$. So $3 \to 4$. $\checkmark$
- $4 \xrightarrow{(1\,2)} 4 \xrightarrow{(1\,3)} 4 \xrightarrow{(1\,4)} 1$. So $4 \to 1$. $\checkmark$

Matches $(1\,2\,3\,4)$ — three transpositions.

### The sign of a permutation

The decomposition into transpositions is **not unique** in length. For example,
$$(1\,2) = (1\,2) = (1\,3)(2\,3)(1\,3) = (1\,2)(1\,3)(1\,2)(1\,3)(1\,2)(1\,3)$$
(check the last one: three swaps of any two transpositions is another transposition; see practice below). But the **parity** of the number of transpositions (even/odd) is well-defined.

> **Theorem 5.4 (Parity Theorem).** Let $\sigma \in S_n$. Whenever $\sigma = t_1 t_2 \cdots t_r$ is written as a product of transpositions, the parity of $r$ depends only on $\sigma$.

**Proof (via the sign homomorphism).**

*Step 1: Definition of the sign.*

Define
$$\operatorname{sgn}(\sigma) = \prod_{1 \leq i < j \leq n} \frac{\sigma(j) - \sigma(i)}{j - i}.$$

Each factor is a nonzero rational number; the product is a rational number. We claim $\operatorname{sgn}(\sigma) \in \{+1, -1\}$.

Indeed, as $(i, j)$ ranges over pairs $i < j$, the multiset $\{\sigma(j) - \sigma(i) : i < j\}$ consists of the same absolute values $|j - i|$ as the denominators, but some may be negated. Let $N(\sigma) = |\{(i, j) : i < j, \sigma(i) > \sigma(j)\}|$ be the number of **inversions** of $\sigma$. Each inversion contributes a factor of $-1$ (the numerator is negative while the denominator is positive); non-inversions contribute $+1$. So
$$\operatorname{sgn}(\sigma) = (-1)^{N(\sigma)} \in \{\pm 1\}.$$

*Step 2: $\operatorname{sgn}(\text{id}) = +1$.*

The identity has no inversions ($\sigma(i) = i < j = \sigma(j)$ for $i < j$). So $N(\text{id}) = 0$, $\operatorname{sgn}(\text{id}) = (-1)^0 = +1$.

*Step 3: $\operatorname{sgn}(\tau) = -1$ for every transposition $\tau$.*

Let $\tau = (p\, q)$ with $p < q$. Count inversions of $\tau$: pairs $(i, j)$ with $i < j$ and $\tau(i) > \tau(j)$.

- If $\{i, j\} \cap \{p, q\} = \emptyset$: $\tau(i) = i, \tau(j) = j$, so $\tau(i) < \tau(j)$. Not an inversion.
- If $\{i, j\} = \{p, q\}$ (i.e., $i = p, j = q$): $\tau(p) = q > p = \tau(q)$. Inversion. $1$ inversion from this pair.
- If $\{i, j\} \cap \{p, q\}$ has exactly one element. Subcases:
  - $i = p, p < j < q$: $\tau(i) = q$, $\tau(j) = j$. Since $j < q$, $\tau(i) > \tau(j)$: inversion.
  - $i = p, j > q$: $\tau(i) = q$, $\tau(j) = j$. Since $j > q$, $\tau(i) < \tau(j)$: not an inversion.
  - $j = q, p < i < q$: $\tau(i) = i$, $\tau(j) = p$. Since $i > p$, $\tau(i) > \tau(j)$: inversion.
  - $j = q, i < p$: $\tau(i) = i$, $\tau(j) = p$. Since $i < p$, $\tau(i) < \tau(j)$: not an inversion.
  - Other subcases (involving $j = p$ or $i = q$ with suitable inequalities) are handled analogously, and give similar patterns.

Counting: the inversions are $(p, q)$ itself (one), plus $(p, j)$ for $p < j < q$ ($q - p - 1$ values), plus $(i, q)$ for $p < i < q$ ($q - p - 1$ values). Total:
$$N(\tau) = 1 + 2(q - p - 1) = 2(q - p) - 1,$$
which is **odd**. So $\operatorname{sgn}(\tau) = (-1)^{N(\tau)} = -1$.

*Step 4: $\operatorname{sgn}$ is multiplicative: $\operatorname{sgn}(\sigma\rho) = \operatorname{sgn}(\sigma)\operatorname{sgn}(\rho)$.*

Starting from the definition:
$$\operatorname{sgn}(\sigma\rho) = \prod_{i < j} \frac{\sigma(\rho(j)) - \sigma(\rho(i))}{j - i}.$$

Multiply numerator and denominator by $\rho(j) - \rho(i)$ (non-zero since $\rho$ is injective):
$$\operatorname{sgn}(\sigma\rho) = \prod_{i < j} \frac{\sigma(\rho(j)) - \sigma(\rho(i))}{\rho(j) - \rho(i)} \cdot \prod_{i < j} \frac{\rho(j) - \rho(i)}{j - i}.$$

The second factor is $\operatorname{sgn}(\rho)$.

For the first factor: as $(i, j)$ ranges over unordered pairs with $i < j$, the pair $(\rho(i), \rho(j))$ ranges over all unordered pairs of elements of $\{1, \ldots, n\}$ (since $\rho$ is a bijection). If $\rho(i) < \rho(j)$, the factor is $\frac{\sigma(\rho(j)) - \sigma(\rho(i))}{\rho(j) - \rho(i)}$, contributing a factor that appears in the definition of $\operatorname{sgn}(\sigma)$ for the pair $(\rho(i), \rho(j))$. If $\rho(i) > \rho(j)$, numerator and denominator both flip sign, leaving the factor unchanged — and this still corresponds to the pair $(\rho(j), \rho(i))$ in $\operatorname{sgn}(\sigma)$. So the first factor equals
$$\prod_{k < \ell} \frac{\sigma(\ell) - \sigma(k)}{\ell - k} = \operatorname{sgn}(\sigma).$$

Therefore $\operatorname{sgn}(\sigma\rho) = \operatorname{sgn}(\sigma) \operatorname{sgn}(\rho)$.

*Step 5: Parity is well-defined.*

If $\sigma = t_1 t_2 \cdots t_r$, then by multiplicativity and $\operatorname{sgn}(t_i) = -1$:
$$\operatorname{sgn}(\sigma) = \operatorname{sgn}(t_1) \operatorname{sgn}(t_2) \cdots \operatorname{sgn}(t_r) = (-1)^r.$$

Since $\operatorname{sgn}(\sigma)$ is intrinsic to $\sigma$ (not to any particular decomposition), $(-1)^r$ is the same for every decomposition. Hence the parity of $r$ is an invariant of $\sigma$. $\blacksquare$

> **Definition.** $\sigma$ is **even** if $\operatorname{sgn}(\sigma) = +1$ (equivalently, decomposable into an even number of transpositions), and **odd** if $\operatorname{sgn}(\sigma) = -1$.

*Consequence.* A $k$-cycle is the product of $k - 1$ transpositions (Theorem 5.3 proof), so:
- $k$-cycle is **even** $\iff$ $k - 1$ is even $\iff$ $k$ is **odd**.
- $k$-cycle is **odd** $\iff$ $k$ is **even**.

Brief slogan: *odd length = even parity*, and vice versa.

**Example 6.** Parities via the slogan.

- $(1\,2\,3)$: $3$-cycle, length odd, so **even** parity. $\operatorname{sgn} = +1$.
- $(1\,2\,3\,4)$: $4$-cycle, length even, so **odd** parity. $\operatorname{sgn} = -1$.
- $(1\,2)(3\,4\,5)$: transposition times $3$-cycle. Transposition is odd ($-1$), $3$-cycle is even ($+1$). By multiplicativity: $\operatorname{sgn} = (-1)(+1) = -1$. Odd.

*Cross-check.* $(1\,2)(3\,4\,5) = (1\,2)(3\,5)(3\,4)$ (expanding the $3$-cycle). That's $3$ transpositions, odd. $\checkmark$

---

## 5.4 The Alternating Group $A_n$

> **Definition.** $A_n = \{\sigma \in S_n : \operatorname{sgn}(\sigma) = +1\}$ is the **alternating group** on $n$ letters.

**Properties.**

*(a) $A_n \leq S_n$.* $A_n$ is the kernel of the homomorphism $\operatorname{sgn}: S_n \to \{\pm 1\}$, hence a (normal) subgroup. Explicit check: closed under products ($\operatorname{sgn}(\sigma\tau) = \operatorname{sgn}(\sigma)\operatorname{sgn}(\tau) = (+1)(+1) = +1$), contains the identity ($\operatorname{sgn}(e) = +1$), and closed under inverses ($\operatorname{sgn}(\sigma^{-1}) = \operatorname{sgn}(\sigma)^{-1} = 1$).

*(b) $|A_n| = n!/2$ for $n \geq 2$.*

**Proof.** For $n \geq 2$, $S_n$ contains the transposition $(1\,2)$, which is odd. Define a map
$$\psi: A_n \to S_n \setminus A_n, \qquad \psi(\sigma) = (1\,2)\sigma.$$

The image lies in $S_n \setminus A_n$ because $\operatorname{sgn}((1\,2)\sigma) = (-1)(+1) = -1$.

**Injective.** If $(1\,2)\sigma = (1\,2)\sigma'$, left-multiply by $(1\,2)$ (whose own inverse is itself): $\sigma = \sigma'$.

**Surjective.** For any $\tau \in S_n \setminus A_n$ (odd permutation), let $\sigma = (1\,2)\tau$. Then $\operatorname{sgn}(\sigma) = (-1)(-1) = +1$, so $\sigma \in A_n$, and $\psi(\sigma) = (1\,2)(1\,2)\tau = e\tau = \tau$.

So $\psi$ is a bijection between $A_n$ and $S_n \setminus A_n$, hence $|A_n| = |S_n \setminus A_n|$. Since $A_n \cup (S_n \setminus A_n) = S_n$ and the union is disjoint:
$$|S_n| = |A_n| + |S_n \setminus A_n| = 2|A_n|,$$
so $|A_n| = n!/2$. $\blacksquare$

*(c) $A_n$ is non-abelian for $n \geq 4$.* E.g., in $A_4$: $(1\,2\,3)(1\,2)(3\,4) \neq (1\,2)(3\,4)(1\,2\,3)$ — see Solution 3 below.

*(d) $A_n$ is **simple** for $n \geq 5$.* No nontrivial proper normal subgroups. This is a classical theorem (due essentially to Galois); it underlies Galois's proof that the general quintic is not solvable by radicals.

**Example 7.** $A_3 = \{e, (1\,2\,3), (1\,3\,2)\}$, cyclic of order $3$.

*Verification.* $|A_3| = 3!/2 = 3$. The even permutations in $S_3$ are: identity (trivially even), and the two $3$-cycles $(1\,2\,3)$ and $(1\,3\,2)$ (odd length $\Rightarrow$ even parity). These three elements form a subgroup isomorphic to $\mathbb{Z}_3$.

**Example 8.** $A_4$ has order $12$. Its elements:

- Identity: $e$ — $1$ element.
- $3$-cycles: every $3$-cycle in $S_4$ is even (length $3$, odd). Count: choose $3$ letters out of $4$ ($\binom{4}{3} = 4$ ways), and each set of $3$ letters gives $2$ distinct $3$-cycles (e.g., $(1\,2\,3)$ and $(1\,3\,2)$ on $\{1,2,3\}$). Total $4 \cdot 2 = 8$: $(1\,2\,3), (1\,3\,2), (1\,2\,4), (1\,4\,2), (1\,3\,4), (1\,4\,3), (2\,3\,4), (2\,4\,3)$.
- Double transpositions (cycle type $2^2$): $(a\,b)(c\,d)$, product of two transpositions — even. Count: number of ways to partition $\{1,2,3,4\}$ into two unordered pairs is $\frac{1}{2}\binom{4}{2} = 3$: $(1\,2)(3\,4), (1\,3)(2\,4), (1\,4)(2\,3)$.
- Total: $1 + 8 + 3 = 12$. $\checkmark$

The three double transpositions plus the identity form a subgroup:
$$V = \{e, (1\,2)(3\,4), (1\,3)(2\,4), (1\,4)(2\,3)\}.$$

*Check closure.* $(1\,2)(3\,4) \cdot (1\,3)(2\,4)$: apply to $1$: $(1\,3)(2\,4)$ sends $1 \to 3$; $(1\,2)(3\,4)$ sends $3 \to 4$. So $1 \to 4$. Apply to $2$: $(1\,3)(2\,4)$ sends $2 \to 4$; $(1\,2)(3\,4)$ sends $4 \to 3$. So $2 \to 3$. Apply to $3$: $\to 1 \to 2$. So $3 \to 2$. Apply to $4$: $\to 2 \to 1$. So $4 \to 1$. Result: $(1\,4)(2\,3)$. $\in V$.

More generally, any product of two distinct double transpositions in $V$ gives the third one; and each element squares to $e$. So $V \cong V_4$ (the Klein four-group).

$V$ is **normal** in $A_4$ (in fact, in $S_4$) because it is the unique subgroup of order $4$ in $A_4$, so any conjugate is also a subgroup of order $4$, which must equal $V$. (Alternatively: the set of double transpositions is a union of conjugacy classes in both $S_4$ and $A_4$.) Hence $A_4$ is non-abelian but not simple.

---

## 5.5 The Dihedral Group $D_n$ as a Permutation Group

The dihedral group $D_n$ (symmetries of a regular $n$-gon; order $2n$) embeds into $S_n$ via its action on the $n$ vertices. Each symmetry permutes the vertices, and the homomorphism sending a symmetry to its induced permutation is injective (a symmetry is determined by where it sends each vertex, since the $n$-gon is uniquely reconstructable from a vertex labelling).

**Example 9 ($D_3 \subseteq S_3$).**

Label the vertices of an equilateral triangle $1, 2, 3$.

*Rotations.* (Around the center.)
- $e$ = identity.
- Rotation by $120^\circ$: $1 \to 2, 2 \to 3, 3 \to 1$, i.e., $(1\,2\,3)$.
- Rotation by $240^\circ$: $1 \to 3, 3 \to 2, 2 \to 1$, i.e., $(1\,3\,2)$.

*Reflections.* (Through each vertex and the midpoint of the opposite edge.)
- Through vertex $1$: fixes $1$, swaps $2$ and $3$: $(2\,3)$.
- Through vertex $2$: fixes $2$, swaps $1$ and $3$: $(1\,3)$.
- Through vertex $3$: fixes $3$, swaps $1$ and $2$: $(1\,2)$.

Total $6$ elements, which exhausts $S_3$. Therefore **$D_3 = S_3$** as subgroups of $S_3$. This is a special coincidence at $n = 3$: the orders match ($|D_3| = 2 \cdot 3 = 6 = 3! = |S_3|$) and every permutation of $3$ elements extends to a symmetry of the triangle.

**Example 10 ($D_4 \subsetneq S_4$).**

Label the vertices of a square $1, 2, 3, 4$ in cyclic order.

*Rotations.* (By multiples of $90^\circ$.)
- $e = $ identity.
- $r = $ rotation by $90^\circ$: $1 \to 2, 2 \to 3, 3 \to 4, 4 \to 1$, i.e., $(1\,2\,3\,4)$.
- $r^2 = $ rotation by $180^\circ$: $1 \to 3, 2 \to 4, 3 \to 1, 4 \to 2$, i.e., $(1\,3)(2\,4)$.
- $r^3 = $ rotation by $270^\circ$: $1 \to 4, 4 \to 3, 3 \to 2, 2 \to 1$, i.e., $(1\,4\,3\,2)$.

*Reflections.* Four axes: two through opposite vertices, two through midpoints of opposite edges.

- Through vertices $1$ and $3$: fixes $1, 3$, swaps $2, 4$. Permutation $(2\,4)$.
- Through vertices $2$ and $4$: fixes $2, 4$, swaps $1, 3$. Permutation $(1\,3)$.
- Through midpoints of edge $1$–$2$ and edge $3$–$4$: swaps $1 \leftrightarrow 2$, swaps $3 \leftrightarrow 4$. Permutation $(1\,2)(3\,4)$.
- Through midpoints of edge $1$–$4$ and edge $2$–$3$: swaps $1 \leftrightarrow 4$, swaps $2 \leftrightarrow 3$. Permutation $(1\,4)(2\,3)$.

Total $8$ elements. $|D_4| = 8$, $|S_4| = 24$, so $D_4 \subsetneq S_4$.

*Check the presentation $D_4 = \langle r, s \mid r^4 = s^2 = e, \, srs = r^{-1}\rangle$.* Take $r = (1\,2\,3\,4)$ and $s = (2\,4)$ (reflection through the axis $1$–$3$). Compute $srs$:

Apply $s$ first: $1 \to 1, 2 \to 4, 3 \to 3, 4 \to 2$.
Apply $r$: $1 \to 2, 4 \to 1, 3 \to 4, 2 \to 3$.
Apply $s$ again: $2 \to 4, 1 \to 1, 4 \to 2, 3 \to 3$.

Composition: $1 \to 1 \to 2 \to 4$. $2 \to 4 \to 1 \to 1$. $3 \to 3 \to 4 \to 2$. $4 \to 2 \to 3 \to 3$. Result: $1 \to 4, 2 \to 1, 3 \to 2, 4 \to 3$, which is $(1\,4\,3\,2) = r^{-1}$. $\checkmark$

**Example 11 ($D_5 \subseteq S_5$).** Order $|D_5| = 10$.

Generators: $r = (1\,2\,3\,4\,5)$ (rotation by $72^\circ$) and any reflection, e.g., $s = (2\,5)(3\,4)$ (through vertex $1$). Elements: $\{e, r, r^2, r^3, r^4, s, rs, r^2 s, r^3 s, r^4 s\}$.

---

## 5.6 Conjugation in $S_n$

> **Theorem 5.5 (Conjugation formula).** For $\sigma \in S_n$ and a cycle $(a_1\, a_2\, \ldots\, a_k)$:
> $$\sigma (a_1\, a_2\, \ldots\, a_k) \sigma^{-1} = (\sigma(a_1)\, \sigma(a_2)\, \ldots\, \sigma(a_k)).$$

**Proof.**

Let $\alpha = (a_1\, \ldots\, a_k)$ and let $\beta = (\sigma(a_1)\, \ldots\, \sigma(a_k))$ be the claimed result. We show $\sigma \alpha \sigma^{-1} = \beta$ by checking that both sides act the same way on every element of $X = \{1, \ldots, n\}$.

*Case 1: $y = \sigma(a_i)$ for some $i \in \{1, \ldots, k\}$.*

(Here $y$ is in the support of $\beta$.)

**LHS:** $\sigma \alpha \sigma^{-1}(y) = \sigma \alpha \sigma^{-1}(\sigma(a_i)) = \sigma \alpha(a_i) = \sigma(a_{i + 1 \bmod k})$ (where the index is taken mod $k$, so $a_{k+1} = a_1$).

**RHS:** $\beta(\sigma(a_i)) = \sigma(a_{i + 1 \bmod k})$ (by definition of the cycle $\beta$ applied to its $i$-th element).

Equal. $\checkmark$

*Case 2: $y \neq \sigma(a_i)$ for any $i$.*

(Here $y$ is not in the support of $\beta$, nor is $\sigma^{-1}(y)$ in the support of $\alpha$.)

**LHS:** Let $x = \sigma^{-1}(y)$. Since $y \neq \sigma(a_i)$ for any $i$, we have $x \neq a_i$ for any $i$ (else $y = \sigma(a_i)$). So $\alpha$ fixes $x$: $\alpha(x) = x$. Then $\sigma\alpha\sigma^{-1}(y) = \sigma\alpha(x) = \sigma(x) = y$.

**RHS:** $\beta$ fixes $y$ (by hypothesis $y$ is not in its support). So $\beta(y) = y$.

Equal. $\checkmark$

Since LHS and RHS agree on every input, they are the same permutation. $\blacksquare$

*Remark (mnemonic).* Conjugation by $\sigma$ **relabels** a cycle: replace each letter $a_i$ by $\sigma(a_i)$. This tracks the natural principle that conjugation corresponds to "change of coordinates."

*Remark (extension to products of cycles).* By induction, if $\tau = c_1 c_2 \cdots c_r$ is any permutation (not necessarily disjoint),
$$\sigma \tau \sigma^{-1} = (\sigma c_1 \sigma^{-1})(\sigma c_2 \sigma^{-1}) \cdots (\sigma c_r \sigma^{-1}).$$
Each factor $\sigma c_i \sigma^{-1}$ is a cycle of the same length as $c_i$, obtained by relabelling. Inserted into a disjoint decomposition, this proves the next corollary.

> **Corollary 5.6.** Two permutations in $S_n$ are conjugate iff they have the same **cycle type** (same multiset of cycle lengths in their disjoint decompositions).

**Proof.**

*($\Rightarrow$)* If $\sigma = \tau \rho \tau^{-1}$ and $\rho = c_1 c_2 \cdots c_r$ is the disjoint cycle decomposition with $c_i$ of length $\ell_i$, then by Theorem 5.5 (applied to each cycle),
$$\sigma = (\tau c_1 \tau^{-1})(\tau c_2 \tau^{-1}) \cdots (\tau c_r \tau^{-1}).$$
Each $\tau c_i \tau^{-1}$ is a cycle of the same length $\ell_i$. They remain disjoint (relabelling via a bijection preserves disjointness of supports). So $\sigma$ has the same multiset of cycle lengths $\{\ell_1, \ldots, \ell_r\}$ as $\rho$.

*($\Leftarrow$)* Suppose $\rho$ and $\sigma$ have the same cycle type. Write
$$\rho = (a_1^{(1)} \cdots a_{\ell_1}^{(1)})(a_1^{(2)} \cdots a_{\ell_2}^{(2)}) \cdots (a_1^{(r)} \cdots a_{\ell_r}^{(r)}),$$
$$\sigma = (b_1^{(1)} \cdots b_{\ell_1}^{(1)})(b_1^{(2)} \cdots b_{\ell_2}^{(2)}) \cdots (b_1^{(r)} \cdots b_{\ell_r}^{(r)}),$$
(including all fixed points as $1$-cycles, so every element of $\{1, \ldots, n\}$ appears exactly once in each row). Define $\tau \in S_n$ by $\tau(a_j^{(i)}) = b_j^{(i)}$. This is a bijection of $\{1, \ldots, n\}$ (both rows exhaust $\{1, \ldots, n\}$).

By Theorem 5.5, $\tau \rho \tau^{-1}$ has cycle $(b_1^{(i)} \cdots b_{\ell_i}^{(i)})$ in place of cycle $(a_1^{(i)} \cdots a_{\ell_i}^{(i)})$, so $\tau\rho\tau^{-1} = \sigma$. $\blacksquare$

*Caveat.* One must include fixed points (as $1$-cycles) when choosing $\tau$, because otherwise the supports of $\rho$ and $\sigma$ might differ and $\tau$ is not fully determined.

**Example 12.** In $S_5$, $(1\,2\,3)$ and $(4\,5\,1)$ are conjugate (both $3$-cycles).

*Construction of the conjugator.* Using the recipe in the Corollary: align cycles letter-by-letter. Writing fixed points:
$$(1\,2\,3) = (1\,2\,3)(4)(5),$$
$$(4\,5\,1) = (4\,5\,1)(2)(3).$$

Match: $1 \to 4, 2 \to 5, 3 \to 1, 4 \to 2, 5 \to 3$. Call this $\tau$. Then $\tau = \begin{pmatrix}1\,2\,3\,4\,5\\4\,5\,1\,2\,3\end{pmatrix}$ in two-line notation, i.e., $\tau = (1\,4\,2\,5\,3)$ in cycle notation.

*Verification.* $\tau (1\,2\,3) \tau^{-1} = (\tau(1)\, \tau(2)\, \tau(3)) = (4\,5\,1)$. $\checkmark$

**Conjugacy classes of $S_5$.** The cycle types are the partitions of $5$:

| Type | Example | Size of class |
| ---- | ------- | ------------- |
| $1^5$ | $e$ | $1$ |
| $2\,1^3$ | $(1\,2)$ | $\binom{5}{2} = 10$ |
| $2^2\,1$ | $(1\,2)(3\,4)$ | $15$ |
| $3\,1^2$ | $(1\,2\,3)$ | $20$ |
| $3\,2$ | $(1\,2\,3)(4\,5)$ | $20$ |
| $4\,1$ | $(1\,2\,3\,4)$ | $30$ |
| $5$ | $(1\,2\,3\,4\,5)$ | $24$ |
| **Total** | | $120$ $\checkmark$ |

*Sample count ($3$-cycles, type $3\,1^2$):* Choose $3$ letters out of $5$ ($\binom{5}{3} = 10$ ways), and arrange the $3$ letters into a $3$-cycle in $\frac{3!}{3} = 2$ ways (cyclic rotations give the same cycle). Total $10 \cdot 2 = 20$. $\checkmark$

*Sample count (double transposition, type $2^2\,1$):* Choose the fixed element ($5$ ways), partition the remaining $4$ into two pairs ($\frac{1}{2}\binom{4}{2} = 3$ ways). Total $5 \cdot 3 = 15$. $\checkmark$

(Class size = $n! / |C_\sigma|$ where $C_\sigma$ is the centralizer; see [[16-centralizer-normalizer-stabilizer]] for the general formula involving cycle-type automorphisms.)

---

## 5.7 Worked Examples

**Example 13 (Compute a product).** In $S_6$, compute $(1\,2\,3)(4\,5)(2\,4\,6)$.

*Setup.* We apply right-to-left: the rightmost cycle $(2\,4\,6)$ acts first, then $(4\,5)$, then $(1\,2\,3)$. The product is a single permutation in $S_6$; we want its disjoint cycle decomposition.

*Strategy.* Track each element $x \in \{1, \ldots, 6\}$ through the three cycles. Each step is easy to evaluate by reading the cycle.

*Computation.* Let $\tau = (1\,2\,3)(4\,5)(2\,4\,6)$.

- **$x = 1$.** $(2\,4\,6)$: $1 \to 1$. $(4\,5)$: $1 \to 1$. $(1\,2\,3)$: $1 \to 2$. So $1 \mapsto 2$.
- **$x = 2$.** $(2\,4\,6)$: $2 \to 4$. $(4\,5)$: $4 \to 5$. $(1\,2\,3)$: $5 \to 5$ (not in the cycle). So $2 \mapsto 5$.
- **$x = 3$.** $(2\,4\,6)$: $3 \to 3$. $(4\,5)$: $3 \to 3$. $(1\,2\,3)$: $3 \to 1$. So $3 \mapsto 1$.
- **$x = 4$.** $(2\,4\,6)$: $4 \to 6$. $(4\,5)$: $6 \to 6$. $(1\,2\,3)$: $6 \to 6$. So $4 \mapsto 6$.
- **$x = 5$.** $(2\,4\,6)$: $5 \to 5$. $(4\,5)$: $5 \to 4$. $(1\,2\,3)$: $4 \to 4$. So $5 \mapsto 4$.
- **$x = 6$.** $(2\,4\,6)$: $6 \to 2$. $(4\,5)$: $2 \to 2$. $(1\,2\,3)$: $2 \to 3$. So $6 \mapsto 3$.

*Cycle decomposition.* Start with $1$: $1 \to 2 \to 5 \to 4 \to 6 \to 3 \to 1$. Closes after $6$ steps — a single $6$-cycle $(1\,2\,5\,4\,6\,3)$.

*Verification.* Check the order: $|\tau| = \operatorname{lcm}(6) = 6$. Apply the cycle formula to $\tau$: $\tau^6 = e$. $\checkmark$

*Verification via sign.* $(1\,2\,3)$ is even (+1), $(4\,5)$ is odd ($-1$), $(2\,4\,6)$ is even (+1). Product sign: $(+1)(-1)(+1) = -1$, so $\tau$ is odd. A $6$-cycle is odd (length even). Consistent. $\checkmark$

Result: $\boxed{(1\,2\,3)(4\,5)(2\,4\,6) = (1\,2\,5\,4\,6\,3).}$ $\blacksquare$

---

**Example 14 (Order and parity).** $\sigma = (1\,2\,3\,4\,5\,6\,7)(8\,9) \in S_9$. Find the order and parity.

*Setup.* The cycles $(1\,2\,3\,4\,5\,6\,7)$ and $(8\,9)$ are disjoint — their supports $\{1, \ldots, 7\}$ and $\{8, 9\}$ are disjoint.

*Order.* By Theorem 5.2,
$$|\sigma| = \operatorname{lcm}(7, 2) = 14.$$

(Since $\gcd(7, 2) = 1$, $\operatorname{lcm}(7, 2) = 7 \cdot 2 = 14$.)

*Parity.* By the slogan in §5.3:
- $7$-cycle: length $7$ (odd), so even parity ($+1$).
- $2$-cycle: length $2$ (even), so odd parity ($-1$).
- Product: $(+1)(-1) = -1$. Odd.

*Verification by transposition count.* The $7$-cycle = $6$ transpositions (even count); the $2$-cycle = $1$ transposition (odd count). Total $6 + 1 = 7$ transpositions, odd. $\checkmark$

Result: $|\sigma| = 14$, $\operatorname{sgn}(\sigma) = -1$. $\blacksquare$

---

**Example 15 (Express as transpositions).** Write $(1\,3\,5\,7\,9)$ as a product of transpositions.

*Setup.* Apply Theorem 5.3: $(a_1\, \ldots\, a_k) = (a_1\, a_k)(a_1\, a_{k-1}) \cdots (a_1\, a_2)$.

*Computation.* $k = 5$, $a_1 = 1, a_2 = 3, a_3 = 5, a_4 = 7, a_5 = 9$.
$$(1\,3\,5\,7\,9) = (1\,9)(1\,7)(1\,5)(1\,3).$$

Four transpositions.

*Verification.* Apply right to left.
- $1$: $(1\,3)$ sends $1 \to 3$; $(1\,5), (1\,7), (1\,9)$ all fix $3$. So $1 \to 3$. $\checkmark$
- $3$: $(1\,3)$ sends $3 \to 1$; $(1\,5)$ sends $1 \to 5$; $(1\,7), (1\,9)$ fix $5$. So $3 \to 5$. $\checkmark$
- $5$: $(1\,3)$ fixes $5$; $(1\,5)$ sends $5 \to 1$; $(1\,7)$ sends $1 \to 7$; $(1\,9)$ fixes $7$. So $5 \to 7$. $\checkmark$
- $7$: fixes under $(1\,3), (1\,5)$; then $(1\,7)$ sends $7 \to 1$; $(1\,9)$ sends $1 \to 9$. So $7 \to 9$. $\checkmark$
- $9$: fixes under $(1\,3), (1\,5), (1\,7)$; $(1\,9)$ sends $9 \to 1$. So $9 \to 1$. $\checkmark$

Four transpositions confirm even parity; a $5$-cycle is indeed even. $\checkmark$ $\blacksquare$

---

**Example 16 (Inverse of a cycle).** Find the inverse of $(1\,2\,3\,4\,5)$.

*Strategy.* The inverse of a cycle $(a_1\, a_2\, \ldots\, a_k)$ is $(a_1\, a_k\, a_{k-1}\, \ldots\, a_2)$ — reverse the order. This is because if $a_i \to a_{i+1}$ under the cycle, then $a_{i+1} \to a_i$ under the inverse.

*Application.* $(1\,2\,3\,4\,5)^{-1} = (1\,5\,4\,3\,2)$.

*Verification.* Compute $(1\,2\,3\,4\,5)(1\,5\,4\,3\,2)$ — apply inverse first (right), then cycle.
- $1$: $(1\,5\,4\,3\,2)$: $1 \to 5$. $(1\,2\,3\,4\,5)$: $5 \to 1$. So $1 \to 1$. $\checkmark$
- $2$: $(1\,5\,4\,3\,2)$: $2 \to 1$. $(1\,2\,3\,4\,5)$: $1 \to 2$. So $2 \to 2$. $\checkmark$
- $3, 4, 5$: analogous, all fixed.

Product is the identity. $\checkmark$ $\blacksquare$

*Alternative approach.* $(1\,2\,3\,4\,5)^{-1} = (1\,2\,3\,4\,5)^{-1}$; and since the cycle has order $5$, $(1\,2\,3\,4\,5)^{-1} = (1\,2\,3\,4\,5)^4$. Apply four times:
- $1 \to 2 \to 3 \to 4 \to 5$. So $1 \to 5$. Matches.

Result: $(1\,2\,3\,4\,5)^{-1} = (1\,5\,4\,3\,2)$.

---

**Example 17 (Possible orders in $S_5$).** What orders are attained by elements of $S_5$?

*Strategy.* By Theorem 5.2, $|\sigma| = \operatorname{lcm}$ of cycle lengths. Enumerate partitions of $5$ (= cycle types) and compute $\operatorname{lcm}$.

| Cycle type | Cycle lengths | $\operatorname{lcm}$ |
| ---------- | ------------- | ------------------- |
| $1^5$ | $1, 1, 1, 1, 1$ | $1$ |
| $2\,1^3$ | $2, 1, 1, 1$ | $2$ |
| $3\,1^2$ | $3, 1, 1$ | $3$ |
| $2^2\,1$ | $2, 2, 1$ | $2$ |
| $4\,1$ | $4, 1$ | $4$ |
| $3\,2$ | $3, 2$ | $6$ |
| $5$ | $5$ | $5$ |

Distinct orders attained: $\{1, 2, 3, 4, 5, 6\}$.

*Remark.* $|S_5| = 120 = 2^3 \cdot 3 \cdot 5$, so a priori any order dividing $120$ is consistent with Lagrange. But $S_5$ has no element of order $8, 12, 15, 20, 24, 30, 60, 120$, etc. The reason: orders of elements in $S_n$ are the **Landau function** $g(n) = \max \operatorname{lcm}$ over partitions of $n$, and Landau grows much more slowly than $n!$.

Notably, **$6 \in \{1, 2, 3, 4, 5, 6\}$** is achieved by $3\,2$-type permutations, e.g., $(1\,2\,3)(4\,5)$ — despite $6 = 2 \cdot 3$ not being a "pure" prime power. $\blacksquare$

---

**Example 18 (Is $\sigma \in A_n$?).** Determine which of $(1\,2\,3), (1\,2)(3\,4), (1\,2\,3\,4)$ belong to $A_n$.

*Strategy.* Use the slogan: $k$-cycle is even iff $k$ is odd. Sign multiplicative.

*Application.*
- $(1\,2\,3)$: $3$-cycle, length odd $\Rightarrow$ **even**. $\sigma \in A_n$. $\checkmark$
- $(1\,2)(3\,4)$: two transpositions. $(-1)(-1) = +1 \Rightarrow$ **even**. $\sigma \in A_n$. $\checkmark$
- $(1\,2\,3\,4)$: $4$-cycle, length even $\Rightarrow$ **odd**. $\sigma \notin A_n$. ✗

*Verification via transposition count.* $(1\,2\,3) = (1\,3)(1\,2)$: $2$ transpositions, even. $(1\,2)(3\,4)$: $2$ transpositions, even. $(1\,2\,3\,4) = (1\,4)(1\,3)(1\,2)$: $3$ transpositions, odd.

Consistent. $\blacksquare$

---

## 5.8 Practice Problems

1. Write $(1\,2\,3\,4\,5\,6)$ as a product of transpositions.
2. Find the order of $\sigma = (1\,2\,3)(4\,5\,6\,7)(8\,9) \in S_9$.
3. Is $A_4$ abelian?
4. Show that $(1\,2\,3)$ and $(1\,3\,2)$ are inverses.
5. In $S_4$, find all elements of order $3$.
6. Compute the number of elements of order $2$ in $S_4$.
7. Show that any two transpositions in $S_n$ are conjugate.
8. Prove that $S_n$ is generated by the transpositions $(1\,2), (1\,3), \ldots, (1\,n)$.

### Solutions

---

**Solution 1.** Write $(1\,2\,3\,4\,5\,6)$ as a product of transpositions.

*Strategy.* Apply the canonical formula from Theorem 5.3: $(a_1 \, a_2 \, \ldots \, a_k) = (a_1 \, a_k)(a_1 \, a_{k-1}) \cdots (a_1 \, a_2)$.

*Computation.* Here $k = 6$, $a_1 = 1, a_2 = 2, \ldots, a_6 = 6$.

$$(1\,2\,3\,4\,5\,6) = (1\,6)(1\,5)(1\,4)(1\,3)(1\,2).$$

Five transpositions.

*Verification.* Trace each element through the product (right to left).

- **$1$**: $(1\,2)$: $1 \to 2$. Subsequent $(1\,3), (1\,4), (1\,5), (1\,6)$ fix $2$. So $1 \to 2$. $\checkmark$
- **$2$**: $(1\,2)$: $2 \to 1$. $(1\,3)$: $1 \to 3$. Subsequent $(1\,4), (1\,5), (1\,6)$ fix $3$. So $2 \to 3$. $\checkmark$
- **$3$**: $(1\,2)$ fixes $3$. $(1\,3)$: $3 \to 1$. $(1\,4)$: $1 \to 4$. Remainder fix $4$. So $3 \to 4$. $\checkmark$
- **$4$**: First three fix $4$. $(1\,4)$: $4 \to 1$. $(1\,5)$: $1 \to 5$. $(1\,6)$ fixes $5$. So $4 \to 5$. $\checkmark$
- **$5$**: First four fix $5$. $(1\,5)$: $5 \to 1$. $(1\,6)$: $1 \to 6$. So $5 \to 6$. $\checkmark$
- **$6$**: First five fix $6$. $(1\,6)$: $6 \to 1$. So $6 \to 1$. $\checkmark$

Each element $a_i \to a_{i+1 \bmod 6}$, matching the $6$-cycle.

*Parity.* Five transpositions = odd parity. A $6$-cycle has length $6$ (even), hence odd parity. Consistent. $\checkmark$ $\blacksquare$

*Remark.* The decomposition into transpositions is far from unique. For example, $(1\,2\,3\,4\,5\,6) = (1\,2)(2\,3)(3\,4)(4\,5)(5\,6)$ (adjacent transpositions) is another five-transposition decomposition. Any valid decomposition has an odd number of transpositions.

---

**Solution 2.** Find the order of $\sigma = (1\,2\,3)(4\,5\,6\,7)(8\,9) \in S_9$.

*Setup.* The three cycles have pairwise disjoint supports: $\{1, 2, 3\}$, $\{4, 5, 6, 7\}$, $\{8, 9\}$. So Theorem 5.2 applies directly.

*Computation.*
$$|\sigma| = \operatorname{lcm}(3, 4, 2).$$

Compute step by step: $\operatorname{lcm}(3, 4) = 12$ (since $\gcd(3, 4) = 1$), then $\operatorname{lcm}(12, 2) = 12$ (since $2 \mid 12$).

So $|\sigma| = 12$.

*Sanity check.* $|\sigma|$ must divide $|S_9| = 362880$. Indeed $12 \mid 362880$. $\checkmark$

*Sanity check by direct computation.* Compute $\sigma^{12}$. On the $3$-cycle block: $(1\,2\,3)^{12} = ((1\,2\,3)^3)^4 = e^4 = e$. On the $4$-cycle block: $(4\,5\,6\,7)^{12} = ((4\,5\,6\,7)^4)^3 = e^3 = e$. On the $2$-cycle block: $(8\,9)^{12} = ((8\,9)^2)^6 = e^6 = e$. All parts give $e$, so $\sigma^{12} = e$.

Is $12$ minimal? $\sigma^6$: $(1\,2\,3)^6 = e$, $(4\,5\,6\,7)^6 = (4\,5\,6\,7)^{4+2} = (4\,5\,6\,7)^2 = (4\,6)(5\,7) \neq e$. So $\sigma^6 \neq e$. $\sigma^4$: $(1\,2\,3)^4 = (1\,2\,3) \neq e$. So $\sigma^4 \neq e$. $12$ is minimal. $\checkmark$

Result: $|\sigma| = 12$. $\blacksquare$

---

**Solution 3.** Is $A_4$ abelian?

*Claim.* $A_4$ is **not** abelian.

*Strategy.* Exhibit two elements of $A_4$ that do not commute.

*Candidates.* $\alpha = (1\,2\,3)$ and $\beta = (1\,2)(3\,4)$. Both are in $A_4$: $\alpha$ is a $3$-cycle (even), $\beta$ is a product of two transpositions (even).

*Computation 1: $\alpha \beta = (1\,2\,3)(1\,2)(3\,4)$.*

Apply right-to-left.

- **$1$.** $(3\,4)$: $1 \to 1$. $(1\,2)$: $1 \to 2$. $(1\,2\,3)$: $2 \to 3$. So $1 \to 3$.
- **$2$.** $(3\,4)$: $2 \to 2$. $(1\,2)$: $2 \to 1$. $(1\,2\,3)$: $1 \to 2$. So $2 \to 2$.
- **$3$.** $(3\,4)$: $3 \to 4$. $(1\,2)$: $4 \to 4$. $(1\,2\,3)$: $4 \to 4$. So $3 \to 4$.
- **$4$.** $(3\,4)$: $4 \to 3$. $(1\,2)$: $3 \to 3$. $(1\,2\,3)$: $3 \to 1$. So $4 \to 1$.

Result: $1 \to 3, 2 \to 2, 3 \to 4, 4 \to 1$. Cycle: $1 \to 3 \to 4 \to 1$ with $2$ fixed. That's $(1\,3\,4)$.

*Computation 2: $\beta \alpha = (1\,2)(3\,4)(1\,2\,3)$.*

Apply right-to-left.

- **$1$.** $(1\,2\,3)$: $1 \to 2$. $(3\,4)$: $2 \to 2$. $(1\,2)$: $2 \to 1$. So $1 \to 1$.
- **$2$.** $(1\,2\,3)$: $2 \to 3$. $(3\,4)$: $3 \to 4$. $(1\,2)$: $4 \to 4$. So $2 \to 4$.
- **$3$.** $(1\,2\,3)$: $3 \to 1$. $(3\,4)$: $1 \to 1$. $(1\,2)$: $1 \to 2$. So $3 \to 2$.
- **$4$.** $(1\,2\,3)$: $4 \to 4$. $(3\,4)$: $4 \to 3$. $(1\,2)$: $3 \to 3$. So $4 \to 3$.

Result: $1 \to 1, 2 \to 4, 3 \to 2, 4 \to 3$. Cycle: $2 \to 4 \to 3 \to 2$ with $1$ fixed. That's $(2\,4\,3)$.

*Comparison.* $\alpha\beta = (1\,3\,4)$ and $\beta\alpha = (2\,4\,3)$. These are different permutations ($\alpha\beta$ fixes $2$; $\beta\alpha$ fixes $1$). Hence $\alpha\beta \neq \beta\alpha$, so $A_4$ is not abelian. $\blacksquare$

*Remark.* In fact, all $A_n$ with $n \geq 4$ are non-abelian. For $n = 3$, $A_3 \cong \mathbb{Z}_3$ is abelian (cyclic). For $n \leq 2$, $A_n$ is trivial or $\{e\}$, trivially abelian.

*Sanity check via conjugation formula.* $\alpha \beta \alpha^{-1}$: applying Theorem 5.5 to $\beta = (1\,2)(3\,4)$ with $\alpha = (1\,2\,3)$: replace $1 \to \alpha(1) = 2$, $2 \to \alpha(2) = 3$, $3 \to \alpha(3) = 1$, $4 \to \alpha(4) = 4$. So $\alpha \beta \alpha^{-1} = (2\,3)(1\,4) = (1\,4)(2\,3) \neq \beta$. Commutativity would require $\alpha \beta \alpha^{-1} = \beta$. Not the case — another confirmation of non-commutativity. $\checkmark$

---

**Solution 4.** Show that $(1\,2\,3)$ and $(1\,3\,2)$ are inverses.

*Strategy.* To show $\alpha = (1\,2\,3)$ and $\beta = (1\,3\,2)$ are inverses, verify $\alpha\beta = e$ (by the single-product criterion — left inverse = right inverse automatically in a group, so one direction suffices).

*Computation: $\alpha\beta = (1\,2\,3)(1\,3\,2)$.* Apply right-to-left.

- **$1$.** $(1\,3\,2)$: $1 \to 3$. $(1\,2\,3)$: $3 \to 1$. So $1 \to 1$.
- **$2$.** $(1\,3\,2)$: $2 \to 1$. $(1\,2\,3)$: $1 \to 2$. So $2 \to 2$.
- **$3$.** $(1\,3\,2)$: $3 \to 2$. $(1\,2\,3)$: $2 \to 3$. So $3 \to 3$.

Result: identity. $\checkmark$

*Verification: $\beta\alpha = e$ too.* By uniqueness of inverse, once $\alpha\beta = e$ is established and the group structure ensures both sides match, $\beta\alpha = e$ follows. Let's verify directly.

$\beta\alpha = (1\,3\,2)(1\,2\,3)$.

- **$1$.** $(1\,2\,3)$: $1 \to 2$. $(1\,3\,2)$: $2 \to 1$. So $1 \to 1$.
- **$2$.** $(1\,2\,3)$: $2 \to 3$. $(1\,3\,2)$: $3 \to 2$. So $2 \to 2$.
- **$3$.** $(1\,2\,3)$: $3 \to 1$. $(1\,3\,2)$: $1 \to 3$. So $3 \to 3$.

Also identity. $\checkmark$

*Alternative via the inverse-of-cycle formula.* Reverse the order of letters: $(1\,2\,3)^{-1} = (1\,3\,2)$. Immediate.

*Alternative via order.* $(1\,2\,3)$ has order $3$. So $(1\,2\,3)^{-1} = (1\,2\,3)^{3 - 1} = (1\,2\,3)^2$.

Compute $(1\,2\,3)^2$: $1 \to 2 \to 3$, $2 \to 3 \to 1$, $3 \to 1 \to 2$. That's $(1\,3\,2)$. $\checkmark$

All three methods agree: $(1\,2\,3)^{-1} = (1\,3\,2)$. $\blacksquare$

---

**Solution 5.** In $S_4$, find all elements of order $3$.

*Strategy.* An element has order $3$ iff its disjoint cycle decomposition has $\operatorname{lcm} = 3$ of cycle lengths. The only way to get $\operatorname{lcm} = 3$ with cycles of lengths summing to at most $4$ is a single $3$-cycle (plus a fixed point).

Enumerate cycle types of $S_4$: $1^4, 2\,1^2, 2^2, 3\,1, 4$. Orders (by Theorem 5.2): $1, 2, 2, 3, 4$. Only type $3\,1$ gives order $3$.

*Count.* $3$-cycles in $S_4$: choose which $3$ elements of $\{1, 2, 3, 4\}$ appear in the cycle ($\binom{4}{3} = 4$ subsets), and each subset gives $2$ distinct $3$-cycles (a $3$-element set $\{a, b, c\}$ supports the cycles $(a\,b\,c)$ and $(a\,c\,b)$; the three cyclic rotations $(a\,b\,c) = (b\,c\,a) = (c\,a\,b)$ are one cycle).

Total: $4 \cdot 2 = 8$.

*Explicit list.*
- On $\{1, 2, 3\}$ (fixing $4$): $(1\,2\,3), (1\,3\,2)$.
- On $\{1, 2, 4\}$ (fixing $3$): $(1\,2\,4), (1\,4\,2)$.
- On $\{1, 3, 4\}$ (fixing $2$): $(1\,3\,4), (1\,4\,3)$.
- On $\{2, 3, 4\}$ (fixing $1$): $(2\,3\,4), (2\,4\,3)$.

Eight elements.

*Sanity check.* All eight are even (odd-length cycles are even permutations), so they all lie in $A_4$. Recall $|A_4| = 12$: it contains $1$ (identity) + $8$ ($3$-cycles) + $3$ (double transpositions) $= 12$. $\checkmark$ $\blacksquare$

---

**Solution 6.** Compute the number of elements of order $2$ in $S_4$.

*Strategy.* Order $2$ means $\sigma^2 = e$ but $\sigma \neq e$. Equivalently, in cycle notation, every cycle has length $1$ or $2$, and there is at least one $2$-cycle.

Cycle types in $S_4$ with $\operatorname{lcm} = 2$: (i) $2\,1^2$ (one transposition, two fixed points) and (ii) $2^2$ (two disjoint transpositions).

*(i) Transpositions (type $2\,1^2$).* Choose the pair of swapped elements: $\binom{4}{2} = 6$. List: $(1\,2), (1\,3), (1\,4), (2\,3), (2\,4), (3\,4)$.

*(ii) Double transpositions (type $2^2$).* Partition $\{1, 2, 3, 4\}$ into two unordered pairs. Number of such partitions: $\frac{1}{2} \binom{4}{2} = \frac{6}{2} = 3$. (The $\binom{4}{2} = 6$ counts the first pair with order; dividing by $2$ accounts for the fact that the two pairs are unordered, i.e., the partition $\{\{1,2\},\{3,4\}\}$ is the same as $\{\{3,4\},\{1,2\}\}$.)

List: $(1\,2)(3\,4), (1\,3)(2\,4), (1\,4)(2\,3)$.

*Total elements of order $2$.* $6 + 3 = 9$. $\blacksquare$

*Sanity check via $|S_4|$.* $|S_4| = 24$. We can verify with all cycle types:
- $1^4$ (identity): $1$ (order $1$)
- $2\,1^2$: $6$ (order $2$)
- $2^2$: $3$ (order $2$)
- $3\,1$: $8$ (order $3$, from Sol'n 5)
- $4$: choose $4$ letters arranged in a cycle, $\frac{4!}{4} = 6$ (order $4$)

Total: $1 + 6 + 3 + 8 + 6 = 24$. $\checkmark$

Elements of order $2$: $6 + 3 = 9$. $\checkmark$

---

**Solution 7.** Show that any two transpositions in $S_n$ are conjugate.

*Strategy.* Apply Corollary 5.6: two permutations are conjugate iff they have the same cycle type. Every transposition has cycle type $2\,1^{n-2}$ (one $2$-cycle and $n - 2$ fixed points).

*Explicit construction.* Let $\tau_1 = (a\,b)$ and $\tau_2 = (c\,d)$ be two transpositions in $S_n$.

Define $\sigma \in S_n$ by $\sigma(a) = c$, $\sigma(b) = d$, and $\sigma$ is a bijection on $\{1, \ldots, n\} \setminus \{a, b\} \to \{1, \ldots, n\} \setminus \{c, d\}$ (any such bijection works; the existence follows because both sets have the same size $n - 2$).

*Verification by the conjugation formula (Theorem 5.5).*
$$\sigma \tau_1 \sigma^{-1} = \sigma(a\,b)\sigma^{-1} = (\sigma(a)\, \sigma(b)) = (c\,d) = \tau_2. \checkmark$$

So $\tau_1$ and $\tau_2$ are conjugate. $\blacksquare$

*Worked example.* In $S_5$, conjugate $(1\,2)$ and $(3\,5)$. Need $\sigma(1) = 3, \sigma(2) = 5$. Take $\sigma(3) = 1, \sigma(4) = 2, \sigma(5) = 4$ (any extension). Then $\sigma = (1\,3)(2\,5\,4)$ in cycle notation (check: $1 \to 3$, $3 \to 1$, $2 \to 5$, $5 \to 4$, $4 \to 2$; yes that's $(1\,3)(2\,5\,4)$). Verify: $\sigma(1\,2)\sigma^{-1} = (\sigma(1)\, \sigma(2)) = (3\, 5) = \tau_2$. $\checkmark$

*Remark.* This is a special case of a much more general fact: conjugacy classes in $S_n$ are in bijection with **partitions of $n$**, and transpositions make up the class of partition $(2, 1, 1, \ldots, 1)$.

---

**Solution 8.** Prove that $S_n$ is generated by the transpositions $(1\,2), (1\,3), \ldots, (1\,n)$.

*Strategy.* Two-step argument:
(a) show every transposition is expressible in terms of $(1\,k)$'s;
(b) invoke Theorem 5.3 to conclude all of $S_n$ is generated.

*Step 1: Every transposition $(i\,j)$ (with $1 \leq i < j \leq n$) is a product of $(1\,k)$'s.*

We consider two cases.

**Case (a): $i = 1$.** Then $(i\,j) = (1\,j)$ is already in the generating set.

**Case (b): $i \neq 1$ (so $1 < i < j$).** Claim: $(i\,j) = (1\,i)(1\,j)(1\,i)$.

*Verification.* Apply the right-hand side (read right-to-left) to each element.

Applying $(1\,i)(1\,j)(1\,i)$:

- **$1$**: $(1\,i)$: $1 \to i$. $(1\,j)$: $i \to i$ (since $i \neq 1, j$ as $i < j$). $(1\,i)$: $i \to 1$. So $1 \to 1$. $\checkmark$ ($(i\,j)$ fixes $1$.)
- **$i$**: $(1\,i)$: $i \to 1$. $(1\,j)$: $1 \to j$. $(1\,i)$: $j \to j$ (since $j \neq 1, i$). So $i \to j$. $\checkmark$
- **$j$**: $(1\,i)$: $j \to j$. $(1\,j)$: $j \to 1$. $(1\,i)$: $1 \to i$. So $j \to i$. $\checkmark$
- **$k$ for $k \notin \{1, i, j\}$**: All three transpositions fix $k$. So $k \to k$. $\checkmark$ ($(i\,j)$ fixes such $k$.)

The right-hand side acts as the transposition $(i\,j)$ on every element, so they are equal. Thus $(i\,j) = (1\,i)(1\,j)(1\,i)$, which is a product of three elements of the generating set $\{(1\,k) : 2 \leq k \leq n\}$.

*Step 2: Every $\sigma \in S_n$ is a product of $(1\,k)$'s.*

By Theorem 5.3, $\sigma$ is a product of transpositions $\tau_1 \tau_2 \cdots \tau_r$. By Step 1, each $\tau_i$ is a product of $(1\,k)$'s. Substituting, $\sigma$ is a product of $(1\,k)$'s.

*Conclusion.* $\{(1\,2), (1\,3), \ldots, (1\,n)\}$ generates $S_n$. $\blacksquare$

*Remark (minimality).* This generating set has $n - 1$ elements. This is in fact minimal for a transposition generating set (one can show $S_n$ has no generating set of transpositions with fewer than $n - 1$ elements, via a connected-graph argument: view transpositions as edges of a graph on $\{1, \ldots, n\}$; generation requires connectedness, and a connected graph on $n$ vertices has at least $n - 1$ edges). The **star generating set** $\{(1\,k)\}_{k=2}^n$ is one such minimal set; **adjacent transpositions** $\{(k, k+1)\}_{k=1}^{n-1}$ are another.

*Remark (further generation).* Another standard result: $S_n$ is generated by just two elements, e.g., $(1\,2)$ and $(1\,2\,3\,\ldots\,n)$. The proof requires showing all $(i, i+1)$ arise as conjugates, which then gives all of $S_n$.

---

## 5.9 Cross-References

**Previous:** [[04-subgroups-generators-cayley-diagrams]]

**Next:**
- [[06-cyclic-groups-and-order]] — $\mathbb{Z}_n$ as cyclic group
- [[12-subgroup-lattice-and-dihedral]] — full analysis of $D_n$
- [[16-centralizer-normalizer-stabilizer]] — conjugacy classes and centralizers in $S_n$

**Key takeaway.** Cycle notation + parity + cycle-type classification of conjugacy classes makes $S_n$ tractable. The sign homomorphism $\operatorname{sgn}: S_n \to \{\pm 1\}$ and its kernel $A_n$ are the first example of a non-trivial normal subgroup, and the cycle-type classification of conjugacy classes (Corollary 5.6) is the first instance of a combinatorial description of an orbit structure — a template repeated throughout group theory.
