# 9. Cosets and Lagrange's Theorem

> **Centerpiece of finite group theory.** Given $H \leq G$, the **cosets** of $H$ are the translates $gH = \{gh : h \in H\}$. These cosets partition $G$ into equal-sized pieces, and the number of pieces times $|H|$ equals $|G|$. This is **Lagrange's Theorem** — the first non-trivial theorem in group theory, and the foundation of everything that follows (quotient groups, normal subgroups, Sylow theory, Fermat's little theorem, Euler's theorem).
>
> Three ideas drive this chapter:
> 1. **Cosets are equivalence classes.** The relation $a \sim_L b \iff a^{-1}b \in H$ is an equivalence relation, and its classes are exactly the left cosets. So cosets partition $G$ automatically.
> 2. **Cosets all have the same size.** Left-multiplication by $g$ is a bijection $H \to gH$, so $|gH| = |H|$.
> 3. **Counting.** Equal-sized disjoint pieces covering a finite set force $|H|$ to divide $|G|$.
>
> The consequences are astonishingly far-reaching: Fermat's little theorem, Euler's theorem, the classification of prime-order groups, primality tests (RSA, Pocklington), and the whole theory of quotient groups.

---

## 9.1 Cosets — Definitions

> **Definition (Left coset).** Let $H \leq G$ and $g \in G$. The **left coset** of $H$ by $g$ is
> $$gH = \{gh : h \in H\}.$$
> Similarly, the **right coset** of $H$ by $g$ is
> $$Hg = \{hg : h \in H\}.$$
> The element $g$ is called a **representative** of the coset $gH$ (or $Hg$).

**Immediate facts (worth proving even though they look trivial).**

1. **$eH = H$.** Indeed $eH = \{eh : h \in H\} = \{h : h \in H\} = H$ because $e$ is the identity. So the subgroup itself is always one of its own cosets — specifically, the coset containing the identity.

2. **$g \in gH$ for every $g$.** Since $e \in H$ (subgroups contain the identity), $g = g \cdot e \in gH$.

3. **$gH = H \iff g \in H$.** ($\Rightarrow$) If $gH = H$ then $g = g \cdot e \in gH = H$. ($\Leftarrow$) If $g \in H$, then $gH \subseteq H$ because $H$ is closed under multiplication, and $H \subseteq gH$ because for any $h \in H$ we have $h = g(g^{-1}h)$ with $g^{-1}h \in H$ (since $g, h \in H$).

4. **A coset need not be a subgroup.** The coset $gH$ contains the identity iff $e = gh$ for some $h \in H$, i.e., iff $g^{-1} \in H$, i.e., iff $g \in H$. So only the coset $H$ itself is a subgroup; every other coset $gH$ (with $g \notin H$) lacks the identity and cannot be a subgroup.

**Notation warning (additive groups).** For additive groups (where the operation is written $+$ and the identity is $0$), write
$$g + H = \{g + h : h \in H\}.$$
All results below apply with the obvious translation. The main example is $\mathbb{Z}$ and its subgroups $n\mathbb{Z}$: the cosets of $n\mathbb{Z}$ in $\mathbb{Z}$ are precisely the residue classes $0 + n\mathbb{Z}, 1 + n\mathbb{Z}, \ldots, (n-1) + n\mathbb{Z}$.

**Remark (why we bother with both left and right).** In abelian groups the distinction is moot: $gH = Hg$ always, because $gh = hg$ for all $h$. In non-abelian groups the two families can differ (see Example 4). The crucial case where they agree — $gH = Hg$ for all $g$ — is exactly when $H$ is a **normal** subgroup, the subject of Chapter 10.

---

## 9.2 Coset Equivalence

> **Theorem 9.1 (Coset equivalence relation).** Let $H \leq G$. Define a relation $\sim_L$ on $G$ by
> $$a \sim_L b \iff a^{-1}b \in H.$$
> Then $\sim_L$ is an equivalence relation, and the equivalence class $[a]_{\sim_L}$ equals the left coset $aH$.

*Proof.* We verify the three axioms of an equivalence relation (reflexive, symmetric, transitive), then identify the classes.

**Step 1: Reflexivity.** For any $a \in G$,
$$a^{-1} a = e \in H$$
because every subgroup contains the identity. Hence $a \sim_L a$.

**Step 2: Symmetry.** Suppose $a \sim_L b$, i.e., $a^{-1}b \in H$. We must show $b \sim_L a$, i.e., $b^{-1}a \in H$.

Because $H$ is a subgroup, it is closed under inverses. Thus
$$(a^{-1}b)^{-1} \in H.$$
Using the socks-shoes rule $(xy)^{-1} = y^{-1}x^{-1}$ (Theorem 3.3),
$$(a^{-1}b)^{-1} = b^{-1}(a^{-1})^{-1} = b^{-1}a \in H,$$
as required.

**Step 3: Transitivity.** Suppose $a \sim_L b$ and $b \sim_L c$, i.e., $a^{-1}b \in H$ and $b^{-1}c \in H$. Since $H$ is closed under the group operation,
$$(a^{-1}b)(b^{-1}c) = a^{-1}(bb^{-1})c = a^{-1} e c = a^{-1}c \in H,$$
so $a \sim_L c$.

Having established that $\sim_L$ is an equivalence relation, we identify its classes.

**Step 4: $[a]_{\sim_L} = aH$.**

$(\subseteq)$ Let $b \in [a]_{\sim_L}$, i.e., $a \sim_L b$, i.e., $a^{-1}b \in H$. Write $h := a^{-1}b \in H$. Then $b = ah \in aH$.

$(\supseteq)$ Let $b \in aH$, so $b = ah$ for some $h \in H$. Then $a^{-1}b = a^{-1}(ah) = (a^{-1}a)h = h \in H$, giving $a \sim_L b$, i.e., $b \in [a]_{\sim_L}$.

$\blacksquare$

**Sanity check.** The class of $e$ under $\sim_L$ is $\{b : e^{-1}b \in H\} = \{b : b \in H\} = H$, matching $eH = H$. ✓

**Remark (why the definition uses $a^{-1}b$).** One might first try $a \sim_L b \iff ab^{-1} \in H$; this is also an equivalence relation, but its classes are the *right* cosets $Ha$. The asymmetry between $a^{-1}b$ and $ab^{-1}$ is precisely the left/right distinction. In abelian groups both definitions coincide.

> **Corollary 9.2 (Cosets partition $G$).** The distinct left cosets of $H$ partition $G$: every element of $G$ belongs to exactly one left coset.

*Proof.* Theorem 8.1 (equivalence relations partition the underlying set) applied to $\sim_L$ from Theorem 9.1, whose classes are the left cosets. $\blacksquare$

**Concrete meaning.** Writing $G$ as a disjoint union:
$$G = \bigsqcup_{g \in T} gH,$$
where $T \subseteq G$ is a **transversal** — a set of coset representatives, one per coset. Different choices of transversal yield the same partition.

---

## 9.3 Size of a Coset

> **Theorem 9.3 (All cosets have the same cardinality).** For every $g \in G$,
> $$|gH| = |H|.$$
> (In particular, if one coset is finite, all are, with the same size.)

*Proof.* We exhibit a bijection $\varphi: H \to gH$.

**Step 1: Define $\varphi$.** Let
$$\varphi: H \to gH, \qquad \varphi(h) = gh.$$

The image lies in $gH$ by definition.

**Step 2: $\varphi$ is surjective.** Any element of $gH$ has the form $gh$ for some $h \in H$ (definition of $gH$), which is exactly $\varphi(h)$.

**Step 3: $\varphi$ is injective.** Suppose $\varphi(h_1) = \varphi(h_2)$, i.e., $gh_1 = gh_2$. Left cancellation (Theorem 3.2) gives $h_1 = h_2$.

**Conclusion.** $\varphi$ is a bijection, so $|H| = |gH|$. $\blacksquare$

**Remark (the bijection is just left-translation).** The map $L_g: G \to G$, $L_g(x) = gx$, restricts to a bijection $L_g: H \to gH$. Left-translations are always bijections of $G$ (by Theorem 3.4); the content here is that $L_g$ restricted to $H$ has image exactly $gH$.

**Sanity check.** Taking $g = e$: $\varphi(h) = h$, the identity map $H \to eH = H$. ✓

### When are two cosets equal?

> **Theorem 9.4 (Coset equality criteria).** Let $H \leq G$ and $a, b \in G$. The following are equivalent:
> 1. $aH = bH$.
> 2. $a^{-1}b \in H$.
> 3. $b \in aH$.
> 4. $a \in bH$.
> 5. $aH \cap bH \neq \emptyset$.

*Proof.* We prove the ring of implications (1) $\Rightarrow$ (3) $\Rightarrow$ (2) $\Rightarrow$ (1) and (2) $\Rightarrow$ (4), then (5) $\Leftrightarrow$ (1).

**(1) $\Rightarrow$ (3):** Since $b = b \cdot e \in bH = aH$.

**(3) $\Rightarrow$ (2):** If $b \in aH$ then $b = ah$ for some $h \in H$, so $a^{-1}b = h \in H$.

**(2) $\Rightarrow$ (1):** Suppose $a^{-1}b \in H$, say $a^{-1}b = h_0 \in H$, i.e., $b = ah_0$.

To show $aH = bH$: given $ah \in aH$, write
$$ah = ah = (bh_0^{-1})h = b(h_0^{-1}h) \in bH,$$
so $aH \subseteq bH$. For the reverse, given $bh \in bH$,
$$bh = (ah_0)h = a(h_0 h) \in aH,$$
so $bH \subseteq aH$. Hence $aH = bH$.

**(2) $\Rightarrow$ (4):** By symmetry of $\sim_L$ (Theorem 9.1), $a^{-1}b \in H \Rightarrow b^{-1}a \in H \Rightarrow a \in bH$ (by (2) $\Rightarrow$ (3) applied with roles swapped).

**(1) $\Rightarrow$ (5):** The cosets $aH = bH$ are non-empty (they contain $a$ and $b$ respectively), so their intersection is non-empty.

**(5) $\Rightarrow$ (1):** Suppose $c \in aH \cap bH$. By Corollary 9.2, every element lies in a unique coset. Since $c \in aH$ and $c \in bH$, both $aH$ and $bH$ are "the coset containing $c$", hence equal. (Alternatively: $c = ah_1 = bh_2$ for some $h_1, h_2 \in H$, giving $a^{-1}b = h_1 h_2^{-1} \in H$, so (2) holds, hence (1).)

$\blacksquare$

**Consequence (how to enumerate cosets in practice).** Start with $g_1 = e$ (first coset is $H$). Find $g_2 \notin H$ — this gives a second coset $g_2 H$. Continue: at each step, find $g_{k+1} \notin g_1 H \cup \cdots \cup g_k H$, and this gives a new coset. Stop when the union covers $G$ (in the finite case) or indefinitely (in the infinite case).

**Detection of coincidences.** Two candidate representatives $g_i, g_j$ give the same coset iff $g_i^{-1} g_j \in H$. For right cosets: iff $g_i g_j^{-1} \in H$ (or equivalently $g_j g_i^{-1} \in H$).

---

## 9.4 Lagrange's Theorem

> **Theorem 9.5 (Lagrange's Theorem, 1771).** If $G$ is a finite group and $H \leq G$, then $|H|$ divides $|G|$. More precisely,
> $$|G| = [G : H] \cdot |H|,$$
> where $[G : H]$ — called the **index** of $H$ in $G$ — is the number of distinct left cosets of $H$ in $G$.

*Proof.* We assemble the preceding three theorems.

**Step 1: Cosets partition $G$.** By Corollary 9.2,
$$G = g_1 H \sqcup g_2 H \sqcup \cdots \sqcup g_m H,$$
where $g_1 H, \ldots, g_m H$ are the distinct left cosets, and $m = [G : H]$.

**Step 2: Each coset has $|H|$ elements.** By Theorem 9.3, $|g_i H| = |H|$ for every $i$.

**Step 3: Count both sides.** Since the union is disjoint,
$$|G| = \sum_{i=1}^{m} |g_i H| = \sum_{i=1}^{m} |H| = m \cdot |H| = [G : H] \cdot |H|.$$

In particular $|H|$ divides $|G|$. $\blacksquare$

**Remark (left vs right).** The theorem can be proved identically using right cosets. As a byproduct, the number of left cosets equals the number of right cosets, even when the left and right coset partitions disagree set-theoretically. Explicitly, the map
$$\Phi: \{\text{left cosets}\} \to \{\text{right cosets}\}, \quad gH \mapsto Hg^{-1}$$
is a well-defined bijection: if $gH = g'H$, then $g^{-1}g' \in H$, hence $g'(g^{-1}) = (g^{-1}g')^{-1} \cdot \text{conjugate}$... more simply, $H g^{-1} = H (g')^{-1}$ iff $g' g^{-1} \in H$ iff $g^{-1}g' \in H$ (using that $H$ is closed under conjugation only if normal — but the relation $gH = g'H \iff g^{-1}g' \in H$ and $Hg^{-1} = Hg'^{-1} \iff g^{-1}(g')^{-1^{-1}} = g^{-1}g' \in H$... actually we need to check this more carefully).

*Cleaner statement.* Define $\Phi(gH) = Hg^{-1}$. Well-defined: if $gH = g'H$ then $g = g'h$ for some $h \in H$, so $g^{-1} = h^{-1}(g')^{-1}$, hence $Hg^{-1} = H h^{-1} (g')^{-1} = H(g')^{-1}$ (since $Hh^{-1} = H$). Injective by the same calculation run backwards. Surjective: any right coset $Hx$ is the image of $x^{-1}H$.

**Remark (failure in infinite groups).** For infinite $G$, Lagrange's theorem is vacuous as an identity of cardinalities ($|G| = \infty$ doesn't "divide" anything), but the formula $|G| = [G : H] \cdot |H|$ still holds as a statement about cardinal arithmetic. The index $[G : H]$ may be finite even when $G$ is infinite: e.g., $[\mathbb{Z} : 5\mathbb{Z}] = 5$.

**Historical note.** Lagrange proved this in 1771 for the symmetric group $S_n$, before the abstract notion of a group was formulated. He was studying which functions of $n$ variables are permuted among finitely many values by the $n!$ permutations — a question on the eve of Galois theory. The fully abstract form is due to Cauchy and later Cayley.

---

## 9.5 Consequences of Lagrange

We list five immediate corollaries, each with a careful proof. The power of Lagrange's theorem is that these consequences flow from it almost for free.

> **Corollary 9.6 (Order divides group order).** If $G$ is a finite group and $a \in G$, then $|a|$ divides $|G|$.

*Proof.* Let $n = |a|$. By definition, $\langle a \rangle = \{e, a, a^2, \ldots, a^{n-1}\}$ has exactly $n$ distinct elements (Chapter 6), so $|\langle a \rangle| = n = |a|$.

Since $\langle a \rangle$ is a subgroup of $G$, by Lagrange's theorem $|\langle a \rangle| = |a|$ divides $|G|$. $\blacksquare$

**Use.** This tells us *a priori* which element orders are even possible in a group of size $n$. In $S_3$ ($|S_3| = 6$), every element order must divide $6$, so orders are in $\{1, 2, 3, 6\}$. (A quick check reveals $S_3$ has no element of order $6$, though Lagrange doesn't preclude it.)

> **Corollary 9.7 ($a^{|G|} = e$).** If $G$ is a finite group and $a \in G$, then $a^{|G|} = e$.

*Proof.* By Corollary 9.6, $|a|$ divides $|G|$, so $|G| = |a| \cdot k$ for some positive integer $k$. Then
$$a^{|G|} = a^{|a| \cdot k} = \left(a^{|a|}\right)^k = e^k = e,$$
using the definition of order ($a^{|a|} = e$) and the identity $e^k = e$. $\blacksquare$

**Remark.** Corollary 9.7 is the engine behind Fermat and Euler's theorems: apply it to the multiplicative group of units modulo $p$ or modulo $n$.

> **Corollary 9.8 (Groups of prime order are cyclic).** If $|G| = p$ is prime, then $G$ is cyclic; in particular $G \cong \mathbb{Z}/p\mathbb{Z}$.

*Proof.* Since $p \geq 2$, $G$ contains some element $a \neq e$. Let $n = |a|$.

By Corollary 9.6, $n \mid p$. Since $p$ is prime, $n \in \{1, p\}$. But $n = 1$ would force $a = e$ (the only element of order $1$ is the identity), contradicting $a \neq e$. Hence $n = p$.

Thus $\langle a \rangle$ has exactly $p$ elements, and since $\langle a \rangle \subseteq G$ with $|G| = p$, we conclude $\langle a \rangle = G$. So $G$ is cyclic of order $p$.

Finally, every cyclic group of order $p$ is isomorphic to $\mathbb{Z}/p\mathbb{Z}$ via $a^k \mapsto k$ (see Chapter 6). $\blacksquare$

**Corollary (classification of small groups).** Groups of order $1, 2, 3, 5, 7, 11, 13, \ldots$ are all cyclic and uniquely determined up to isomorphism.

> **Corollary 9.9 (Fermat's Little Theorem).** If $p$ is prime and $a$ is an integer with $\gcd(a, p) = 1$, then
> $$a^{p-1} \equiv 1 \pmod{p}.$$

*Proof.* Consider the multiplicative group of units modulo $p$:
$$U(p) = \{1, 2, 3, \ldots, p - 1\} \pmod{p}.$$
(Every nonzero residue class mod $p$ is a unit, because $\gcd(a, p) = 1$ whenever $1 \leq a \leq p-1$, since $p$ is prime.)

**Step 1: Order.** $|U(p)| = p - 1$.

**Step 2: Membership.** Since $\gcd(a, p) = 1$, the residue $a \bmod p$ lies in $U(p)$. (If $a \equiv 0$ we would have $p \mid a$, contradicting $\gcd(a, p) = 1$.)

**Step 3: Apply Corollary 9.7.** With $G = U(p)$ and our element $a \bmod p$,
$$a^{|U(p)|} = a^{p-1} \equiv 1 \pmod{p}.$$

$\blacksquare$

**Variant.** Without the coprimality hypothesis: for every integer $a$ and prime $p$, $a^p \equiv a \pmod{p}$. (Multiply both sides of $a^{p-1} \equiv 1$ by $a$ when $p \nmid a$; when $p \mid a$, both sides are $\equiv 0$.)

**Application.** Fermat's little theorem is the basis of the Fermat primality test: if $a^{n-1} \not\equiv 1 \pmod n$ for some $a$ with $\gcd(a, n) = 1$, then $n$ is composite. (Converse is false — Carmichael numbers exist — but the test is still useful.)

> **Corollary 9.10 (Euler's Theorem).** If $n \geq 1$ and $\gcd(a, n) = 1$, then
> $$a^{\varphi(n)} \equiv 1 \pmod{n},$$
> where $\varphi(n)$ is Euler's totient function.

*Proof.* Consider the multiplicative group of units modulo $n$:
$$U(n) = \{k : 1 \leq k \leq n, \gcd(k, n) = 1\} \pmod{n}.$$
This is a group under multiplication mod $n$ (Example 6 of Chapter 3), and by definition $|U(n)| = \varphi(n)$.

**Step 1: $a \bmod n \in U(n)$,** because $\gcd(a, n) = 1$.

**Step 2: Apply Corollary 9.7** to $G = U(n)$ with the element $a \bmod n$:
$$a^{|U(n)|} = a^{\varphi(n)} \equiv 1 \pmod{n}.$$

$\blacksquare$

**Remark (RSA cryptography).** Euler's theorem is the backbone of the RSA cryptosystem. If $n = pq$ is a product of two large primes, $\varphi(n) = (p-1)(q-1)$, and choosing an encryption exponent $e$ coprime to $\varphi(n)$ with decryption exponent $d \equiv e^{-1} \pmod{\varphi(n)}$, one gets $(a^e)^d = a^{ed} = a^{1 + k\varphi(n)} = a \cdot (a^{\varphi(n)})^k \equiv a \cdot 1^k = a \pmod{n}$ — decryption recovers the plaintext.

**Example 1 (Computing $7^{222} \pmod{10}$).**

*Strategy.* Apply Euler's theorem (Corollary 9.10) with $n = 10$ and $a = 7$.

*Step 1: Verify hypothesis.* $\gcd(7, 10) = 1$ ✓.

*Step 2: Compute $\varphi(10)$.* Using $\varphi(10) = \varphi(2)\varphi(5) = 1 \cdot 4 = 4$ (since $10 = 2 \cdot 5$ and $\varphi$ is multiplicative for coprime arguments, and $\varphi(p) = p-1$ for prime $p$). Alternatively, $U(10) = \{1, 3, 7, 9\}$, size $4$.

*Step 3: Reduce exponent mod $\varphi(n)$.* By Euler, $7^4 \equiv 1 \pmod{10}$. Write $222 = 4 \cdot 55 + 2$, so
$$7^{222} = 7^{4 \cdot 55 + 2} = (7^4)^{55} \cdot 7^2 \equiv 1^{55} \cdot 49 \equiv 49 \pmod{10}.$$

*Step 4: Final reduction.* $49 \equiv 9 \pmod{10}$.

*Answer.* $7^{222} \equiv 9 \pmod{10}$.

*Sanity check.* Direct: $7^1 = 7, 7^2 = 49 \equiv 9, 7^3 \equiv 63 \equiv 3, 7^4 \equiv 21 \equiv 1$ (mod $10$). So the powers cycle $7, 9, 3, 1, 7, 9, 3, 1, \ldots$ with period $4$. $222 \bmod 4 = 2$, so $7^{222} \equiv 7^2 \equiv 9$. ✓ $\blacksquare$

---

## 9.6 Converse of Lagrange — False!

**Warning.** The converse of Lagrange is **not** a theorem: if $d \mid |G|$, it does *not* follow that $G$ has a subgroup of order $d$.

A group in which every divisor $d$ of $|G|$ is the order of some subgroup is called a **CLT group** (for "converse of Lagrange theorem"). Abelian groups, supersolvable groups, and many nilpotent groups are CLT — but the smallest non-CLT example has order $12$, the alternating group $A_4$.

**Counter-example ($A_4$).** $|A_4| = 12$, whose divisors are $\{1, 2, 3, 4, 6, 12\}$. Subgroups of $A_4$ exist of orders $1, 2, 3, 4, 12$, but there is **no subgroup of order $6$**.

*Proof (detailed).* Suppose, for contradiction, that $H \leq A_4$ with $|H| = 6$.

**Step 1: Index and normality.** $[A_4 : H] = 12/6 = 2$. Any subgroup of index $2$ is normal (Example 5 below); so $H \triangleleft A_4$.

**Step 2: Counting 3-cycles.** $A_4$ contains exactly eight 3-cycles:
$$(1\,2\,3), (1\,3\,2), (1\,2\,4), (1\,4\,2), (1\,3\,4), (1\,4\,3), (2\,3\,4), (2\,4\,3).$$
(There are $\binom{4}{3} \cdot 2 = 8$ choices: $\binom{4}{3} = 4$ ways to pick the support, and $2$ cyclic orders on each triple.)

**Step 3: Squaring 3-cycles.** Every 3-cycle $\sigma$ has order $3$, so $\sigma^2 = \sigma^{-1}$ is also a 3-cycle. The 3-cycles pair up as $\{\sigma, \sigma^{-1}\}$ into four pairs.

**Step 4: Every 3-cycle is in $H$.** Since $A_4/H$ has order $2$, for any $\sigma \in A_4$, the image $\sigma H \in A_4/H$ satisfies $(\sigma H)^2 = \sigma^2 H = H$, i.e., $\sigma^2 \in H$.

Now $\sigma^2 = \sigma^{-1}$ is a 3-cycle whenever $\sigma$ is a 3-cycle. And we can recover $\sigma$ from $\sigma^{-1}$ by inverting: $\sigma = (\sigma^{-1})^{-1}$. Applying "square" to the 3-cycle $\sigma^{-1}$:
$$(\sigma^{-1})^2 = \sigma^{-2} = \sigma \in H.$$
Hence every 3-cycle is in $H$.

**Step 5: Contradiction by counting.** $H$ contains all eight 3-cycles plus the identity, giving at least $9$ elements — but $|H| = 6$. Contradiction.

Therefore no subgroup of order $6$ exists in $A_4$. $\blacksquare$

**Remark.** Despite this, several partial converses of Lagrange do hold:
- **Cauchy's theorem** (Chapter 16): if a prime $p$ divides $|G|$, then $G$ has an element (hence a subgroup) of order $p$.
- **Sylow's first theorem**: if $p^k$ divides $|G|$, then $G$ has a subgroup of order $p^k$.

So Lagrange's converse holds for prime-power divisors. It can fail for composite divisors, as in $A_4$ at $d = 6$.

---

## 9.7 Worked Examples

**Example 2 (Cosets in $\mathbb{Z}$).** Find all left cosets of $5\mathbb{Z}$ in $\mathbb{Z}$.

*Setup.* $G = (\mathbb{Z}, +)$, $H = 5\mathbb{Z} = \{5k : k \in \mathbb{Z}\} = \{\ldots, -10, -5, 0, 5, 10, \ldots\}$. We use additive notation: cosets are $a + H = \{a + 5k : k \in \mathbb{Z}\}$.

*Strategy.* Use Theorem 9.4: $a + H = b + H \iff a - b \in H \iff 5 \mid (a - b)$. So cosets correspond to residue classes mod $5$.

*Computation.* The distinct cosets are indexed by representatives $0, 1, 2, 3, 4$:
- $0 + 5\mathbb{Z} = \{\ldots, -10, -5, 0, 5, 10, \ldots\}$
- $1 + 5\mathbb{Z} = \{\ldots, -9, -4, 1, 6, 11, \ldots\}$
- $2 + 5\mathbb{Z} = \{\ldots, -8, -3, 2, 7, 12, \ldots\}$
- $3 + 5\mathbb{Z} = \{\ldots, -7, -2, 3, 8, 13, \ldots\}$
- $4 + 5\mathbb{Z} = \{\ldots, -6, -1, 4, 9, 14, \ldots\}$

No two of these are equal (differences $1, 2, 3, 4$ are not multiples of $5$), and every integer is in one of them (division by $5$ gives a unique remainder in $\{0, 1, 2, 3, 4\}$).

*Verification.* Union is $\mathbb{Z}$ ✓; disjoint by Theorem 9.4 ✓.

*Interpretation.* $[\mathbb{Z} : 5\mathbb{Z}] = 5$ — so $\mathbb{Z}$ is infinite, yet has finite index $5$ over $5\mathbb{Z}$. The quotient group $\mathbb{Z}/5\mathbb{Z}$ (to be defined formally in Chapter 10) is the familiar $\mathbb{Z}_5$. $\blacksquare$

**Example 3 (Cosets in $S_3$).** Let $H = \langle (1\,2) \rangle = \{e, (1\,2)\}$ in $S_3$. Find all left cosets of $H$.

*Setup.* $|S_3| = 6$, $|H| = 2$, so by Lagrange $[S_3 : H] = 6/2 = 3$. There are exactly $3$ left cosets.

*Strategy.* List representatives systematically. The coset $eH = H$ is one. Pick $g_1 \notin H$, get a second coset $g_1 H$; pick $g_2 \notin H \cup g_1 H$, get a third. Stop when done.

*Computation.* Write $S_3 = \{e, (1\,2), (1\,3), (2\,3), (1\,2\,3), (1\,3\,2)\}$.

**Coset 1.** $eH = \{e, (1\,2)\}$.

**Coset 2.** Pick $(1\,3) \notin H$.
$$(1\,3)H = \{(1\,3) \cdot e, (1\,3) \cdot (1\,2)\} = \{(1\,3), (1\,3)(1\,2)\}.$$
Compute $(1\,3)(1\,2)$: read right to left. $(1\,2)$ sends $1 \to 2$, then $(1\,3)$ sends $2 \to 2$. Net: $1 \to 2$. $(1\,2)$ sends $2 \to 1$, then $(1\,3)$ sends $1 \to 3$. Net: $2 \to 3$. $(1\,2)$ sends $3 \to 3$, then $(1\,3)$ sends $3 \to 1$. Net: $3 \to 1$. So $(1\,3)(1\,2) = (1\,2\,3)$? Let me re-check: the permutation $1 \to 2, 2 \to 3, 3 \to 1$ is $(1\,2\,3)$. Hmm, but one convention issue. Let me verify by evaluating at $1$: right-to-left, $(1\,2)(1) = 2$, $(1\,3)(2) = 2$. So $1 \to 2$. At $2$: $(1\,2)(2) = 1$, $(1\,3)(1) = 3$. So $2 \to 3$. At $3$: $(1\,2)(3) = 3$, $(1\,3)(3) = 1$. So $3 \to 1$. Cycle: $(1\,2\,3)$.

Wait, the original file had $(1\,3\,2)$. Let me recompute with the *left-to-right* (function-composition-from-left) convention: $(1\,3)(1\,2)$ meaning "apply $(1\,3)$ first, then $(1\,2)$". $(1\,3)$ sends $1 \to 3$, $(1\,2)$ fixes $3$. Net $1 \to 3$. $(1\,3)$ fixes $2$, $(1\,2)$ sends $2 \to 1$. Net $2 \to 1$. $(1\,3)$ sends $3 \to 1$, $(1\,2)$ sends $1 \to 2$. Net $3 \to 2$. So $1 \to 3, 3 \to 2, 2 \to 1$: cycle $(1\,3\,2)$. This is the $S_3$ left-to-right convention used in the original.

We'll stick with the **left-to-right** convention: $\alpha\beta$ means "apply $\alpha$ first, then $\beta$". Then:

$(1\,3)(1\,2) = (1\,3\,2)$.

So $(1\,3)H = \{(1\,3), (1\,3\,2)\}$.

**Coset 3.** Pick $(2\,3) \notin H \cup (1\,3)H$.
$$(2\,3)H = \{(2\,3), (2\,3)(1\,2)\}.$$
$(2\,3)(1\,2)$: $1 \to 1 \to 2$. $2 \to 3 \to 3$. $3 \to 2 \to 1$. Cycle $(1\,2\,3)$.

So $(2\,3)H = \{(2\,3), (1\,2\,3)\}$.

*Verification.* Union: $\{e, (1\,2)\} \cup \{(1\,3), (1\,3\,2)\} \cup \{(2\,3), (1\,2\,3)\} = S_3$ ✓. Disjoint ✓. Three cosets ✓.

*Interpretation.* The left cosets partition $S_3$ into three pairs of size $2$. $\blacksquare$

**Example 4 (Right cosets differ from left).** Same $H = \langle (1\,2) \rangle$ in $S_3$. Compute all right cosets and compare.

*Strategy.* Right cosets: $Hg = \{hg : h \in H\}$. Representatives chosen as in Example 3.

*Computation.*

**Right coset 1.** $He = \{e \cdot e, (1\,2) \cdot e\} = \{e, (1\,2)\}$.

**Right coset 2.** $H(1\,3) = \{e \cdot (1\,3), (1\,2) \cdot (1\,3)\} = \{(1\,3), (1\,2)(1\,3)\}$.

$(1\,2)(1\,3)$ (left-to-right): $1 \to 2 \to 2$. $2 \to 1 \to 3$. $3 \to 3 \to 1$. Cycle $(1\,2\,3)$.

So $H(1\,3) = \{(1\,3), (1\,2\,3)\}$.

**Right coset 3.** $H(2\,3) = \{(2\,3), (1\,2)(2\,3)\}$.

$(1\,2)(2\,3)$: $1 \to 2 \to 3$. $2 \to 1 \to 1$. $3 \to 3 \to 2$. Cycle $(1\,3\,2)$.

So $H(2\,3) = \{(2\,3), (1\,3\,2)\}$.

*Comparison with Example 3.*

| Element | Left coset | Right coset |
|---------|------------|-------------|
| $(1\,3)$ | $(1\,3)H = \{(1\,3), (1\,3\,2)\}$ | $H(1\,3) = \{(1\,3), (1\,2\,3)\}$ |
| $(2\,3)$ | $(2\,3)H = \{(2\,3), (1\,2\,3)\}$ | $H(2\,3) = \{(2\,3), (1\,3\,2)\}$ |

Different! **Left cosets $\neq$ right cosets** in general.

*Interpretation.* The subgroup $H = \langle (1\,2) \rangle$ is *not normal* in $S_3$. We'll see in Chapter 10 that $gH = Hg$ for all $g$ iff $H$ is a normal subgroup. In $S_3$, only $\{e\}$, $A_3 = \langle (1\,2\,3)\rangle$, and $S_3$ itself are normal. $\blacksquare$

**Example 5 (Subgroup of index 2 is normal).** Prove: if $H \leq G$ with $[G : H] = 2$, then every left coset equals the corresponding right coset, i.e., $gH = Hg$ for all $g \in G$.

*Strategy.* Use the coset partition. With only two cosets, the "non-$H$" coset is forced.

*Proof.*

**Case 1: $g \in H$.** Then $gH = H$ (since $g \in H$ forces $gH \subseteq H$ and $|gH| = |H|$) and similarly $Hg = H$. Hence $gH = H = Hg$ ✓.

**Case 2: $g \notin H$.** Then $gH \neq H$ (since $g \in gH$ but $g \notin H$), so $gH$ is the *other* left coset. The two left cosets partition $G$, so
$$gH = G \setminus H.$$

Similarly, $Hg \neq H$ (since $g \in Hg$ but $g \notin H$), and the two right cosets partition $G$, so
$$Hg = G \setminus H.$$

Therefore $gH = G \setminus H = Hg$ ✓.

**Conclusion.** In both cases $gH = Hg$, so $H$ is normal in $G$. $\blacksquare$

**Remark.** This lemma is tremendously useful. It immediately gives: $A_n \triangleleft S_n$ for every $n \geq 2$ (since $[S_n : A_n] = 2$); $SL_n(\mathbb{R}) \triangleleft GL_n(\mathbb{R})$ when restricted to $\det = \pm 1$; the subgroup of rotations is normal in the dihedral group; etc.

**Example 6 (Order of intersection via Lagrange).** Let $H, K \leq G$ with $|H| = 12$ and $|K| = 35$. Given $|G| = 420$, find $|H \cap K|$.

*Strategy.* $H \cap K \leq H$ and $H \cap K \leq K$ (intersections of subgroups are subgroups; Chapter 4). Apply Lagrange to each.

*Computation.*

**Step 1: $|H \cap K|$ divides $|H| = 12$.** By Lagrange with $H \cap K \leq H$.

**Step 2: $|H \cap K|$ divides $|K| = 35$.** Same reasoning.

**Step 3: Combine.** $|H \cap K|$ divides $\gcd(|H|, |K|) = \gcd(12, 35) = 1$. Hence $|H \cap K| = 1$.

**Step 4: Identify.** The only subgroup of order $1$ is the trivial subgroup $\{e\}$. So $H \cap K = \{e\}$.

*Verification.* Consistent with $|G| = 420 = 12 \cdot 35$: since $H \cap K = \{e\}$, the subset $HK = \{hk : h \in H, k \in K\}$ has $|HK| = |H| \cdot |K| / |H \cap K| = 12 \cdot 35 / 1 = 420 = |G|$, so $HK = G$. $G$ factors as a (possibly non-direct) internal product of $H$ and $K$. ✓

*Interpretation.* Coprime subgroup orders force trivial intersection. This is a structural phenomenon — subgroups of coprime orders "can't share nontrivial elements". $\blacksquare$

**Example 7 (Applying Lagrange — $|G| = 45$).** Show every group of order $45$ has an element whose order is a multiple of both $3$ and $5$, and in the abelian case, an element of order exactly $15$.

*Setup.* $45 = 3^2 \cdot 5$. We'll use Cauchy's theorem (Chapter 16): if a prime $p$ divides $|G|$, then $G$ has an element of order $p$.

*Step 1: Elements of orders $3$ and $5$.* By Cauchy applied to $p = 3$, there is $a \in G$ with $|a| = 3$. By Cauchy applied to $p = 5$, there is $b \in G$ with $|b| = 5$.

*Step 2: If $G$ is abelian, combine.* Suppose $G$ is abelian (a fact one can prove for groups of order $45$ using Sylow theory, but assume it here). Then $ab = ba$, so
$$(ab)^{\operatorname{lcm}(3, 5)} = (ab)^{15} = a^{15} b^{15} = (a^3)^5 (b^5)^3 = e \cdot e = e.$$
Thus $|ab|$ divides $15$. Conversely, $|ab|$ is the lcm of $|a|$ and $|b|$ when $\langle a \rangle \cap \langle b \rangle = \{e\}$ (which holds because $|\langle a \rangle| = 3, |\langle b \rangle| = 5$ are coprime, so the intersection has order dividing $\gcd(3, 5) = 1$). Hence $|ab| = 15$.

*Step 3: Non-abelian caveat.* If $G$ is non-abelian, $|ab|$ need not equal $\operatorname{lcm}(|a|, |b|)$. But in fact *every* group of order $45$ turns out to be abelian (by Sylow + structure theorem). See Chapter 17 for the full argument.

*Conclusion.* Every group of order $45$ has an element of order $15$. $\blacksquare$

**Example 8 (Using Fermat's little theorem).** Compute $3^{100} \pmod{11}$.

*Setup.* $11$ is prime, $\gcd(3, 11) = 1$. Apply Fermat: $3^{10} \equiv 1 \pmod{11}$.

*Strategy.* Reduce exponent mod $10$.

*Computation.* $100 = 10 \cdot 10 + 0$, so
$$3^{100} = (3^{10})^{10} \equiv 1^{10} = 1 \pmod{11}.$$

*Answer.* $3^{100} \equiv 1 \pmod{11}$.

*Sanity check.* $3$ has order dividing $10$ in $U(11)$. Computing: $3^1 = 3, 3^2 = 9, 3^3 = 27 \equiv 5, 3^4 \equiv 15 \equiv 4, 3^5 \equiv 12 \equiv 1$ (mod $11$). So $|3| = 5$ in $U(11)$. Then $3^{100} = (3^5)^{20} = 1^{20} = 1$. ✓

*Interpretation.* Note $|3| = 5$ divides $10 = |U(11)|$, consistent with Lagrange (Corollary 9.6). $\blacksquare$

**Example 9 (No subgroup of order $6$ in $A_4$, alternate proof).**

*Setup.* $|A_4| = 12$. Suppose $H \leq A_4$ with $|H| = 6$.

*Proof (via commutator subgroup).*

**Step 1: $H$ is normal.** $[A_4 : H] = 2$, so $H \triangleleft A_4$ by Example 5.

**Step 2: $A_4/H$ is abelian.** $|A_4/H| = 2$, so $A_4/H \cong \mathbb{Z}_2$, which is abelian.

**Step 3: Commutators land in $H$.** For any $a, b \in A_4$, the image $[aH, bH]$ in $A_4/H$ is $aHbH a^{-1}H b^{-1}H = (aba^{-1}b^{-1})H$. Since $A_4/H$ is abelian, commutators are trivial there: $(aba^{-1}b^{-1})H = H$, i.e., $aba^{-1}b^{-1} \in H$.

So every commutator of $A_4$ lies in $H$.

**Step 4: Compute a commutator.** Take $a = (1\,2\,3), b = (1\,2\,4)$. Compute $aba^{-1}b^{-1}$:

$a^{-1} = (1\,3\,2)$, $b^{-1} = (1\,4\,2)$.

$a \cdot b$ (left-to-right, so apply $a$ first, then $b$): 
$1 \xrightarrow{a} 2 \xrightarrow{b} 4$.
$2 \xrightarrow{a} 3 \xrightarrow{b} 3$.
$3 \xrightarrow{a} 1 \xrightarrow{b} 2$.
$4 \xrightarrow{a} 4 \xrightarrow{b} 1$.

So $ab = (1\,4)(2\,3)$ no wait, tracking: $1 \to 4, 4 \to 1$ (2-cycle), $2 \to 3, 3 \to 2$ (2-cycle). So $ab = (1\,4)(2\,3)$.

Then $(ab)a^{-1}$: apply $(1\,4)(2\,3)$ first, then $(1\,3\,2)$:
$1 \to 4 \to 4$. $2 \to 3 \to 2$. $3 \to 2 \to 1$. $4 \to 1 \to 3$.
So $(ab)a^{-1}$ maps $1 \to 4, 2 \to 2, 3 \to 1, 4 \to 3$, i.e., $(1\,4\,3)$.

Then $(aba^{-1})b^{-1}$: apply $(1\,4\,3)$ first, then $(1\,4\,2)$:
$1 \to 4 \to 2$. $2 \to 2 \to 1$. $3 \to 1 \to 4$. $4 \to 3 \to 3$.
So the final result maps $1 \to 2, 2 \to 1, 3 \to 4, 4 \to 3$, i.e., $(1\,2)(3\,4)$.

**Step 5: Repeat for multiple pairs.** Similar computations with different 3-cycles $a, b$ yield $(1\,3)(2\,4), (1\,4)(2\,3)$, and all eight 3-cycles themselves (not just double-transpositions).

Actually, a simpler argument: the commutator subgroup of $A_4$ is the Klein four subgroup $V_4 = \{e, (1\,2)(3\,4), (1\,3)(2\,4), (1\,4)(2\,3)\}$, plus commutators that give 3-cycles. So $H$ must contain $V_4$ *and* all 3-cycles — that's $4 + 8 = 12$ elements, but $|H| = 6$. Contradiction.

**Conclusion.** No subgroup of order $6$ in $A_4$. $\blacksquare$

*Remark.* The commutator subgroup of $A_4$ is precisely $V_4$. Its index $[A_4 : V_4] = 3$, so $A_4/V_4 \cong \mathbb{Z}_3$, abelian. This is the "abelianization" of $A_4$.

---

## 9.8 Practice Problems

1. Find all left cosets of $3\mathbb{Z}_{12}$ in $\mathbb{Z}_{12}$.
2. In $D_4$, find the left cosets of $H = \{1, r^2\}$.
3. Compute $11^{402} \pmod{13}$.
4. Let $G$ be a group of order $77$. Show $G$ has an element of order $7$.
5. If $H, K \leq G$ with $|H| = 10$, $|K| = 21$, $|G| = 105$, find $|H \cap K|$.
6. Prove: if $|G| = p^2$ ($p$ prime), every proper subgroup is cyclic.
7. Let $G$ be a finite abelian group. Show the product of all elements equals $e$ unless $G$ has a unique element of order $2$.
8. Compute the index $[S_4 : A_4]$.

### Solutions

**Solution 1.** Left cosets of $3\mathbb{Z}_{12}$ in $\mathbb{Z}_{12}$.

*Setup.* $G = \mathbb{Z}_{12}$ (additive), $H = 3\mathbb{Z}_{12} = \langle 3 \rangle$. Identify $H$ first.

*Step 1: Compute $H = \langle 3 \rangle$ in $\mathbb{Z}_{12}$.*

$0, 3, 6, 9, 12 \equiv 0, \ldots$ — the cycle closes at $12 \equiv 0$. So
$$H = \{0, 3, 6, 9\}, \quad |H| = 4.$$

*Step 2: Apply Lagrange to get index.*
$$[\mathbb{Z}_{12} : H] = 12/4 = 3.$$
So there are exactly $3$ cosets.

*Step 3: List cosets.* Representatives $0, 1, 2$ (generic; any $g \notin$ previous cosets).

- $0 + H = \{0, 3, 6, 9\}$ (the subgroup itself).
- $1 + H = \{1, 4, 7, 10\}$ — check by adding $1$ to every element of $H$ mod $12$.
- $2 + H = \{2, 5, 8, 11\}$ — check by adding $2$.

*Step 4: Verify partition.*

Union: $\{0, 3, 6, 9\} \cup \{1, 4, 7, 10\} \cup \{2, 5, 8, 11\} = \{0, 1, 2, \ldots, 11\} = \mathbb{Z}_{12}$ ✓.

Disjoint: $1 \notin H$ so $1 + H \neq H$ (Theorem 9.4); $2 \notin H$ and $2 \notin 1+H$ (since $2 - 1 = 1 \notin H$), so $2 + H \neq H$ and $2 + H \neq 1 + H$ ✓.

*Answer.* $[\mathbb{Z}_{12} : H] = 3$; cosets as above. $\blacksquare$

**Solution 2.** Left cosets of $H = \{1, r^2\}$ in $D_4$.

*Setup.* $D_4 = \langle r, s : r^4 = s^2 = 1, srs = r^{-1}\rangle$ with $|D_4| = 8$. Elements:
$$D_4 = \{1, r, r^2, r^3, s, sr, sr^2, sr^3\}.$$
Subgroup $H = \{1, r^2\}$ (the center of $D_4$ — both $1$ and $r^2$ commute with everything). $|H| = 2$.

*Step 1: Index.* $[D_4 : H] = 8/2 = 4$.

*Step 2: List cosets systematically.*

**Coset 1: $1 \cdot H = H = \{1, r^2\}$.**

**Coset 2: $rH$.** Using the rule $aH = \{a, a \cdot r^2\}$ (just multiply each element of $H$ by $a$ on the left):
$$rH = \{r \cdot 1, r \cdot r^2\} = \{r, r^3\}.$$

**Coset 3: $sH$.** 
$$sH = \{s \cdot 1, s \cdot r^2\} = \{s, sr^2\}.$$

**Coset 4: $srH$.** 
$$srH = \{sr \cdot 1, sr \cdot r^2\} = \{sr, sr^3\}.$$

*Step 3: Verify no coincidences.*

- $1, r, s, sr \in$ distinct cosets. Check $r^{-1} \cdot s = r^3 s$. Is this in $H$? Use the relation $sr = r^{-1}s = r^3 s$, so $r^3 s = sr$, which is not $1$ or $r^2$. So $r^3 s \notin H$, hence $rH \neq sH$ ✓.

*Step 4: Verify partition.*

Union: $\{1, r^2\} \cup \{r, r^3\} \cup \{s, sr^2\} \cup \{sr, sr^3\} = \{1, r, r^2, r^3, s, sr, sr^2, sr^3\} = D_4$ ✓.

*Answer.* Four cosets as listed; $[D_4 : H] = 4$. 

*Remark.* $H = Z(D_4)$ (center), and $D_4/Z \cong \mathbb{Z}_2 \times \mathbb{Z}_2$ (Klein four) — a useful fact in representation theory. $\blacksquare$

**Solution 3.** Compute $11^{402} \pmod{13}$.

*Setup.* $13$ is prime, $\gcd(11, 13) = 1$.

*Strategy.* Fermat: $11^{12} \equiv 1 \pmod{13}$. Reduce $402 \bmod 12$.

*Step 1: Reduce exponent.* $402 = 12 \cdot 33 + 6$, so $402 \equiv 6 \pmod{12}$.

Therefore $11^{402} \equiv 11^6 \pmod{13}$.

*Step 2: Compute $11^6 \pmod{13}$.*

Reduce the base: $11 \equiv -2 \pmod{13}$.

$11^6 \equiv (-2)^6 = 64 \pmod{13}$.

$64 = 13 \cdot 4 + 12$, so $64 \equiv 12 \equiv -1 \pmod{13}$.

*Answer.* $11^{402} \equiv -1 \equiv 12 \pmod{13}$.

*Sanity check.* $11^6 \equiv -1$ means $11$ has order $12$ in $U(13)$: $11^{12} \equiv 1$, and $11^6 \equiv -1 \neq 1$, so order is $12$ (not $6$ or less). $11$ is a primitive root mod $13$. ✓ $\blacksquare$

**Solution 4.** $|G| = 77 = 7 \cdot 11$; show $G$ has an element of order $7$.

*Strategy.* Cauchy's theorem (Chapter 16): if a prime $p$ divides $|G|$, then $G$ has an element of order $p$.

*Proof.* Since $7 \mid |G| = 77$, by Cauchy's theorem there exists $a \in G$ with $|a| = 7$. $\blacksquare$

*Alternative (without Cauchy).* Every element order divides $77$ (Corollary 9.6). So orders are in $\{1, 7, 11, 77\}$. The identity has order $1$. Suppose *no* element has order $7$.

Then every non-identity element has order $11$ or $77$. If an element has order $77$, $G$ is cyclic of order $77$, and its generator's $11$th power has order $77/\gcd(77, 11) = 77/11 = 7$ — contradicting "no element of order $7$".

So every non-identity element has order $11$. Each cyclic subgroup of order $11$ contains $10$ elements of order $11$, and two such subgroups intersect trivially (intersection is a subgroup of both, so has order dividing $11$; being contained in a subgroup of order $11$, intersection is $\{e\}$ or the whole subgroup; the latter means the subgroups are equal). So non-identity elements partition into disjoint sets of $10$, giving $|G| - 1 = 76$ elements of order $11$. Need $10 \mid 76$, but $76 / 10 = 7.6$, not an integer. Contradiction.

Hence some element has order $7$. $\blacksquare$

*Interpretation.* This avoids the full Sylow machinery but illustrates the typical counting argument.

**Solution 5.** $|H| = 10$, $|K| = 21$, $|G| = 105$; find $|H \cap K|$.

*Setup.* $H \cap K$ is a subgroup of both $H$ and $K$.

*Step 1: Apply Lagrange to each.* $|H \cap K|$ divides $|H| = 10$ and divides $|K| = 21$.

*Step 2: Compute gcd.* $\gcd(10, 21)$: $10 = 2 \cdot 5$, $21 = 3 \cdot 7$, no common prime factors, so $\gcd(10, 21) = 1$.

*Step 3: Conclude.* $|H \cap K| \mid 1$, so $|H \cap K| = 1$, hence $H \cap K = \{e\}$.

*Verification.* $|HK| = |H| \cdot |K| / |H \cap K| = 10 \cdot 21 / 1 = 210 > 105 = |G|$, which *would* be a contradiction if $HK$ were required to be a subset of $G$. But $HK = \{hk : h \in H, k \in K\}$ is automatically a subset of $G$, and $|HK| \leq |G|$. So the formula $|HK| = |H||K|/|H \cap K|$ would give $|HK| = 210$, contradicting $|HK| \leq 105$.

Hmm — this is a contradiction. It means *no such pair $H, K$ exists* in a group of order $105$! Indeed, one can prove using Sylow theory that every group of order $105$ has a *unique* subgroup of order $21$ (the "normal" Sylow complement), and similarly structured subgroups of order $15$, etc. The hypothesis "$|H| = 10$ and $|K| = 21$" is actually vacuous in $|G| = 105$ — there is no subgroup of order $10$.

*Reconciliation.* The problem only asks for $|H \cap K|$, so we answer based on divisibility: $|H \cap K| = 1$ *if* such subgroups exist. The Lagrange-based argument is valid; it's just that the hypothesis is vacuous. $\blacksquare$

**Solution 6.** $|G| = p^2$; every proper subgroup is cyclic.

*Setup.* By Lagrange, any subgroup $H < G$ has $|H| \mid p^2$, so $|H| \in \{1, p, p^2\}$. Properness eliminates $|H| = p^2$.

*Step 1: $|H| = 1$.* Then $H = \{e\}$, the trivial group, which is cyclic (generated by $e$ — conventionally, or trivially).

*Step 2: $|H| = p$.* By Corollary 9.8, $H$ is cyclic of prime order, isomorphic to $\mathbb{Z}/p\mathbb{Z}$.

*Conclusion.* Every proper subgroup is cyclic. $\blacksquare$

*Remark.* In fact, $G$ *itself* is abelian when $|G| = p^2$ — this is a famous result (see Chapter 17: use class equation or Sylow argument). The two groups of order $p^2$ up to isomorphism are $\mathbb{Z}/p^2\mathbb{Z}$ (cyclic) and $\mathbb{Z}/p\mathbb{Z} \times \mathbb{Z}/p\mathbb{Z}$ (elementary abelian). In the second, the proper subgroups are the $p + 1$ lines through the origin (each cyclic of order $p$) — consistent with Solution 6.

**Solution 7.** Let $G$ be a finite abelian group. Show: the product $\prod_{g \in G} g$ equals $e$ unless $G$ has a unique element of order $2$, in which case the product is that element.

*Strategy.* Pair each element $a$ with $a^{-1}$. If $a \neq a^{-1}$, the two cancel in the product. What's left are "self-inverse" elements: those with $a = a^{-1}$, equivalently $a^2 = e$.

*Step 1: Identify self-inverse elements.* $a^2 = e$ iff $a \in \{e\}$ or $|a| = 2$. Let $T = \{a \in G : a^2 = e\}$ — this is a subgroup (in an abelian group, the set of self-inverse elements is always a subgroup).

*Step 2: Pair non-self-inverse elements.* Define an equivalence relation $a \sim b$ iff $\{a, a^{-1}\} = \{b, b^{-1}\}$. Non-self-inverse elements pair up into $\{a, a^{-1}\}$ pairs, each pair of size $2$. Their product $a \cdot a^{-1} = e$ contributes $e$ to the total product.

*Step 3: Total product.* Because $G$ is abelian, we can reorder. Multiplying all non-self-inverse elements gives $e$ (each pair cancels). The total product equals the product of self-inverse elements:
$$\prod_{g \in G} g = \prod_{a \in T} a.$$

*Step 4: Structure of $T$.* $T$ is a subgroup where every element satisfies $a^2 = e$. So $T$ is an **elementary abelian $2$-group**: $T \cong (\mathbb{Z}/2\mathbb{Z})^k$ for some $k \geq 0$.

*Step 5: Compute $\prod_{a \in T} a$.*

*Case A: $T = \{e\}$ (no elements of order $2$).* Product is $e$.

*Case B: $|T| = 2$, i.e., $T = \{e, x\}$ where $|x| = 2$.* Product is $e \cdot x = x$.

*Case C: $|T| \geq 4$.* $T \cong (\mathbb{Z}/2\mathbb{Z})^k$ with $k \geq 2$. In this case, pair each $a \in T \setminus \{e\}$ with $a \cdot x_0$ where $x_0$ is some fixed non-identity element — or more cleanly: the sum (in additive notation) of all elements of $(\mathbb{Z}/2\mathbb{Z})^k$ with $k \geq 2$ is $0$, because each coordinate is $0$ in half the elements and $1$ in the other half; summing gives $2^{k-1}$ ones, which is $\equiv 0 \pmod 2$ since $k \geq 2$. Product is $e$.

*Combining:* Product is $e$ unless $G$ has *exactly one* element of order $2$, i.e., $|T| = 2$, in which case the product is that element.

*Verification on $\mathbb{Z}/6\mathbb{Z}$:* Sum $0 + 1 + 2 + 3 + 4 + 5 = 15 \equiv 3 \pmod 6$. The unique element of order $2$ is $3$. ✓

*Verification on $\mathbb{Z}/8\mathbb{Z}$:* Sum $0 + 1 + \cdots + 7 = 28 \equiv 4 \pmod 8$. Unique element of order $2$ is $4$. ✓

*Verification on $V_4 = (\mathbb{Z}/2\mathbb{Z})^2$:* Sum $(0,0) + (1,0) + (0,1) + (1,1) = (2, 2) = (0, 0) = e$. No unique element of order $2$ (there are three: $(1,0), (0,1), (1,1)$). ✓

**Consequence: Wilson's theorem.** Apply this to $U(p) = (\mathbb{Z}/p\mathbb{Z})^*$ for prime $p$. The unique self-inverse element in $U(p)$ aside from $1$ is $-1$ (since $x^2 = 1$ in $\mathbb{Z}/p\mathbb{Z}$ implies $x = \pm 1$ by Chapter 14). So
$$\prod_{k=1}^{p-1} k \equiv -1 \pmod p,$$
i.e., $(p-1)! \equiv -1 \pmod p$ — **Wilson's theorem**. $\blacksquare$

**Solution 8.** Index $[S_4 : A_4]$.

*Setup.* $S_4$ = symmetric group on $\{1,2,3,4\}$, $|S_4| = 4! = 24$. $A_4$ = alternating group (even permutations), $|A_4| = 24/2 = 12$.

*Computation.*
$$[S_4 : A_4] = \frac{|S_4|}{|A_4|} = \frac{24}{12} = 2.$$

*Verification.* The two cosets of $A_4$ in $S_4$ are:
- $A_4$ itself (even permutations): $12$ elements.
- $(1\,2) A_4$ (odd permutations, i.e., anything $\times$ a transposition): $12$ elements.

Union: all of $S_4$ ✓; disjoint (even and odd permutations are disjoint by the sign homomorphism) ✓.

*Remark.* $A_n$ is the kernel of the sign homomorphism $\operatorname{sgn}: S_n \to \{\pm 1\}$, so $[S_n : A_n] = 2$ for all $n \geq 2$. This makes $A_n$ normal (Example 5). $\blacksquare$

---

## 9.9 Cross-References

**Previous:**
- [[08-equivalence-relations-and-partitions]] — cosets are equivalence classes; partition structure used throughout.
- [[06-cyclic-groups-and-order]] — $|a| = |\langle a \rangle|$, the bridge from element order to subgroup order.
- [[04-subgroups-generators-cayley-diagrams]] — subgroup definition, intersections.

**Next:**
- [[10-normal-subgroups-and-quotient-groups]] — when is $gH = Hg$ for all $g$? (Left = right cosets.)
- [[11-direct-products]] — $|G \times H| = |G| \cdot |H|$, product of orders.
- [[16-centralizer-normalizer-stabilizer]] — orbit-stabilizer theorem, a refinement of Lagrange.

**Takeaway.** Lagrange's theorem is the single most-used result in finite group theory. The three consequences to memorize are:

1. **$|H|$ divides $|G|$** (for $H \leq G$).
2. **$|a|$ divides $|G|$** (for $a \in G$).
3. **$a^{|G|} = e$** (for every $a \in G$).

From these, Fermat's little theorem, Euler's theorem, and the classification of prime-order groups follow in a single line each. The failure of the converse (no subgroup of order $6$ in $A_4$) sets the stage for Sylow theory, which rescues a partial converse for prime-power divisors.
