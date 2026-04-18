---
title: "Closure Properties and Pumping Lemma"
type: guide
module: "Computability"
file: 21
related: [18-dfa, 19-nfa-and-enfa, 20-regular-expressions-and-kleenes-theorem, 22-turing-machines-and-computability]
sources: [Computability_260316_142548]
---

# 21. Closure Properties and Pumping Lemma

With DFAs, NFAs, and regex all recognizing the same class (regular languages), we can ask: what operations preserve regularity, and what languages are *not* regular? **Closure properties** give affirmative answers (union, intersection, etc. stay regular); the **Pumping Lemma** gives a necessary condition for regularity, used to prove specific languages non-regular.

## 21.1 Closure Properties

> **Theorem 21.1.** The class of regular languages is closed under:
>
> (a) **Union**: $L_1 \cup L_2$.
>
> (b) **Intersection**: $L_1 \cap L_2$.
>
> (c) **Complement**: $\overline{L} = \Sigma^* \setminus L$.
>
> (d) **Concatenation**: $L_1 L_2 = \{uv : u \in L_1, v \in L_2\}$.
>
> (e) **Kleene star**: $L^*$.
>
> (f) **Reversal**: $L^R = \{w^R : w \in L\}$.
>
> (g) **Difference**: $L_1 \setminus L_2$.
>
> (h) **Homomorphism**: $h(L) = \{h(w) : w \in L\}$ (where $h: \Sigma_1^* \to \Sigma_2^*$ is a homomorphism).
>
> (i) **Inverse homomorphism**: $h^{-1}(L) = \{w : h(w) \in L\}$.

*Proof sketches.*

- **(a)** Given DFAs $M_1, M_2$, construct a DFA for $L_1 \cup L_2$ via **product construction**: states $Q_1 \times Q_2$, transitions componentwise; accept if either component accepts.

- **(b)** Same product construction, but accept only if **both** components accept.

- **(c)** Swap $F$ and $Q \setminus F$ in the DFA for $L$. (Critical: $L$ must be given by a DFA, not NFA — for NFAs, swapping would give the complement of the nondeterministic acceptance, which is wrong.)

- **(d)** Given NFAs $N_1, N_2$, glue with ε-transitions from accept states of $N_1$ to start of $N_2$; only $N_2$'s accept states are accept. Precisely Thompson's construction (regex case).

- **(e)** Kleene star: add new start/accept with ε-loops.

- **(f)** Reversal: reverse all transitions, swap start ↔ accept. May yield an NFA (multiple start states would need an NFA); convert back to DFA via subset construction.

- **(g)** $L_1 \setminus L_2 = L_1 \cap \overline{L_2}$; combine (b) and (c).

- **(h), (i)** Standard constructions.

$\blacksquare$

### Worked example: product construction

**Example 1.** $L_1$ = strings over $\{0,1\}$ of even length. $L_2$ = strings ending in $1$. Construct a DFA for $L_1 \cap L_2$.

- $M_1$: $Q_1 = \{e, o\}$ (even, odd length), start $e$, accept $\{e\}$; flips on any symbol.
- $M_2$: $Q_2 = \{p, q\}$ (start/after-$0$, after-$1$), start $p$; accept $\{q\}$.

Product DFA $M$:
- States: $\{(e, p), (e, q), (o, p), (o, q)\}$.
- Start: $(e, p)$.
- Accept: $\{(e, q)\}$ (even-length AND ends in $1$).
- Transitions: $(s, t) \xrightarrow{a} (\delta_1(s, a), \delta_2(t, a))$.

For example: $(e, p) \xrightarrow{0} (o, p)$, $(e, p) \xrightarrow{1} (o, q)$, $(o, q) \xrightarrow{1} (e, q)$, etc.

On input $11$: $(e, p) \xrightarrow{1} (o, q) \xrightarrow{1} (e, q)$. Accept. ✓

## 21.2 The Pumping Lemma

> **Theorem 21.2 (Pumping Lemma for Regular Languages).** If $L$ is regular, then there exists an integer $p \ge 1$ (**pumping length**) such that every string $w \in L$ with $|w| \ge p$ can be decomposed as $w = xyz$ satisfying:
>
> (i) $|xy| \le p$,
>
> (ii) $|y| \ge 1$,
>
> (iii) $x y^i z \in L$ for every $i \ge 0$.

**Intuition.** If $L = L(M)$ for a DFA $M$ with $n$ states, take $p = n$. Any long enough string must repeat a state while reading the first $p$ symbols — yielding a loop that can be taken $0, 1, 2, \dots$ times, giving $x y^i z \in L$.

*Proof.* Let $M = (Q, \Sigma, \delta, q_0, F)$ with $|Q| = p$. Take $w = a_1 \cdots a_n \in L$ with $n \ge p$. Let $q_i = \hat\delta(q_0, a_1 \cdots a_i)$ for $i = 0, 1, \dots, n$; these are $n + 1$ states. By pigeonhole, two $q_j, q_k$ ($j < k \le p$) coincide. Let $x = a_1 \cdots a_j$, $y = a_{j+1} \cdots a_k$, $z = a_{k+1} \cdots a_n$. Then:
- $|xy| = k \le p$. ✓
- $|y| = k - j \ge 1$. ✓
- $xy^i z$ traces through $M$: $x$ goes $q_0 \to q_j$, each $y$ goes $q_j \to q_k = q_j$, $z$ goes $q_k = q_j \to q_n \in F$. So $xy^i z \in L$. ✓

$\blacksquare$

## 21.3 Using the Pumping Lemma: Non-Regularity

To show $L$ is **not** regular: assume $L$ regular with pumping length $p$, choose a specific $w \in L$ with $|w| \ge p$, show that **no** decomposition $w = xyz$ satisfying (i), (ii), (iii) exists. Typically accomplished by choosing $i \ne 1$ and showing $xy^i z \notin L$.

**Example 2.** $L = \{0^n 1^n : n \ge 0\}$ is not regular.

*Proof.* Assume regular with pumping length $p$. Pick $w = 0^p 1^p$. Suppose $w = xyz$ with $|xy| \le p$, $|y| \ge 1$. Then $xy$ consists entirely of $0$'s (first $p$ symbols are $0$'s). So $y = 0^k$ for some $k \ge 1$. Then $xy^2 z = 0^{p+k} 1^p$, which has more $0$'s than $1$'s — not in $L$. Contradiction. So $L$ is not regular. $\blacksquare$

**Example 3.** $L = \{w w : w \in \{0, 1\}^*\}$ is not regular.

*Proof.* Assume regular with $p$. Pick $w_0 = 0^p 1 0^p 1 \in L$ (with $w = 0^p 1$, $|w_0| = 2p + 2 \ge p$). Decomposition $w_0 = xyz$ with $|xy| \le p$ forces $xy \subseteq 0^p$, so $y = 0^k, k \ge 1$. Then $xy^2 z = 0^{p+k} 1 0^p 1$. For this to be $uu$, we need each half to be identical, but now the first half contains $p+k$ zeros and the second has only $p$ zeros — mismatch. So $xy^2 z \notin L$. Contradiction. $\blacksquare$

**Example 4.** $L = \{a^n b^n c^n : n \ge 0\}$ is not regular.

*Proof.* Assume regular with $p$. Pick $w = a^p b^p c^p$. Then $xy \subseteq a^p$, $y = a^k$. Then $xy^2 z = a^{p+k} b^p c^p$, with $p+k$ $a$'s but only $p$ $b$'s — not in $L$. $\blacksquare$

**Example 5.** $L = \{a^{n^2} : n \ge 0\} = \{a^0, a^1, a^4, a^9, \dots\}$ is not regular.

*Proof.* Assume regular with $p$. Pick $w = a^{p^2}$, so $|w| = p^2 \ge p$. Decomposition $w = a^i a^k a^j$ with $i + k + j = p^2$, $k \ge 1$, $i + k \le p$. Pump: $xy^2 z = a^{p^2 + k}$.

For this to be in $L$, need $p^2 + k$ to be a perfect square. But $p^2 < p^2 + k \le p^2 + p < p^2 + 2p + 1 = (p+1)^2$. So $p^2 + k$ is strictly between two consecutive perfect squares — not a perfect square. Contradiction. $\blacksquare$

## 21.4 Strategies with the Pumping Lemma

- **Choose $w$ carefully.** It should be just long enough to force a specific structure (e.g., all pumping must happen in one "region" of the string).
- **Try $i = 0$ and $i = 2$** — these usually break the pattern.
- **Don't expect to guess $p$.** Reason symbolically, parameterized by $p$.
- **The pumping lemma is a *necessary* condition, not sufficient.** Some non-regular languages do satisfy the pumping condition; we use Myhill–Nerode or other tools in such cases.

## 21.5 The Myhill–Nerode Theorem (Alternative Non-Regularity Tool)

> **Theorem 21.3 (Myhill–Nerode).** $L$ is regular iff the equivalence relation $\sim_L$ on $\Sigma^*$ defined by
> $$
> x \sim_L y \iff \forall z \in \Sigma^*: (xz \in L \iff yz \in L)
> $$
> has only **finitely many** equivalence classes. The number of classes equals the number of states of the minimal DFA for $L$.

**Example 6.** Show $L = \{0^n 1^n\}$ is not regular via Myhill–Nerode.

*Proof.* Consider $0^0, 0^1, 0^2, \dots$. For each pair $i \ne j$: $0^i \cdot 1^i \in L$ but $0^j \cdot 1^i \notin L$, so $0^i \not\sim_L 0^j$. Infinitely many classes — not regular. $\blacksquare$

Myhill–Nerode is strictly more powerful than the pumping lemma.

## 21.6 Decision Problems for Regular Languages

For regular languages given via DFAs:
- **Emptiness**: Is $L(M) = \emptyset$? Decidable by reachability: BFS from $q_0$, check if any accept state reachable.
- **Membership**: Is $w \in L(M)$? Decidable by simulation in $O(|w|)$.
- **Equivalence**: $L(M_1) = L(M_2)$? Decidable: minimize both DFAs and check isomorphism, or check emptiness of $(L_1 \setminus L_2) \cup (L_2 \setminus L_1)$.
- **Inclusion**: $L(M_1) \subseteq L(M_2)$? Decidable via $L_1 \setminus L_2 = \emptyset$.
- **Finiteness**: Is $L(M)$ finite? Decidable: check for a cycle reachable from $q_0$ that reaches an accept state.

These are all **P** or fast polynomial time (varying with input representation — regex equivalence is PSPACE-complete, but DFA equivalence is P).

## 21.7 Worked Examples

**Example 7.** Prove $L = \{a^i b^j : i > j\}$ is not regular.

*Proof.* Take $w = a^{p+1} b^p$. $xy \subseteq a^{p+1}$, $y = a^k$. Pump down to $xy^0 z = a^{p+1-k} b^p$. If $k = 1$: $p$ $a$'s and $p$ $b$'s — not in $L$ (need $i > j$). ✓ Contradiction. $\blacksquare$

**Example 8.** Show $L = \{a^p : p \text{ prime}\}$ is not regular.

*Proof.* Assume regular with pumping length $n$. Pick a prime $p \ge n$. Decomposition $a^p = xyz$ with $|y| = k \ge 1$. Pump $i$ times: $a^{p + (i-1)k}$. For $i = p + 1$: $a^{p + p k} = a^{p(1+k)}$. Length $p(1+k)$, composite (since $p \ge 2$ and $1 + k \ge 2$). So $a^{p(1+k)} \notin L$. Contradiction. $\blacksquare$

**Example 9 (Closure).** If $L_1, L_2$ are regular, show $L_1 L_2$ is regular.

*Proof.* Let $N_1, N_2$ be NFAs for $L_1, L_2$. Build $N$: states $Q_1 \cup Q_2$ (disjoint); start = start of $N_1$; accept = accept of $N_2$; add ε-transitions from every accept of $N_1$ to start of $N_2$. Then $L(N) = L_1 L_2$. (Thompson's concatenation step.) $\blacksquare$

## 21.8 Summary

- **Closure properties**: regular languages closed under union, intersection, complement, concatenation, Kleene star, reversal, difference, homomorphisms, inverse homomorphisms.
- **Product construction** gives union/intersection; **complement** swaps accept/non-accept (DFA); **Thompson-style gluing** gives concatenation/Kleene star.
- **Pumping Lemma** (necessary condition): every long string has a decomposition $xyz$ with $y$ pumpable.
- Use PL to prove non-regularity (e.g., $\{0^n 1^n\}$, $\{a^n b^n c^n\}$, $\{a^{n^2}\}$, $\{a^p : p \text{ prime}\}$).
- PL is necessary but not sufficient; **Myhill–Nerode** is the tight characterization.
- **Decision problems** (emptiness, membership, equivalence) all decidable in polynomial time.

## Related Concepts

- [[18-dfa]] — DFA construction basis.
- [[19-nfa-and-enfa]] — NFA constructions for closure.
- [[20-regular-expressions-and-kleenes-theorem]] — declarative regular languages.
- [[22-turing-machines-and-computability]] — non-regular languages like $\{0^n 1^n\}$ are often context-free; going further reaches undecidable languages.

## Sources

- [[raw/Computability_260316_142548]] — closure properties, pumping lemma.
