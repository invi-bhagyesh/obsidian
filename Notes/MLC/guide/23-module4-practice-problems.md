---
title: "Module 4 Practice Problems: Computability"
type: guide
module: "Computability"
file: 23
related: [18-dfa, 19-nfa-and-enfa, 20-regular-expressions-and-kleenes-theorem, 21-closure-and-pumping-lemma, 22-turing-machines-and-computability]
sources: [Computability_260316_142548]
---

# 23. Module 4 Practice Problems: Computability

A collection of worked problems covering the full Computability module: DFA design, NFA/ε-NFA and the subset construction, regular expressions, closure properties, the Pumping Lemma, and Turing machines. Problems are graded from routine construction exercises to standard undecidability proofs.

## Part A. DFA Design

**Problem 1.** Design a DFA over $\{0, 1\}$ accepting strings whose number of $1$'s is divisible by $3$.

*Solution.* States $q_0, q_1, q_2$ tracking #$1$'s mod 3. $q_0$ accept.
- $q_i \xrightarrow{0} q_i$ (zeros don't change count).
- $q_i \xrightarrow{1} q_{(i+1)\bmod 3}$.

Accept set: $\{q_0\}$. $\blacksquare$

**Problem 2.** Design a DFA over $\{a, b\}$ accepting strings containing $abb$ as a substring.

*Solution.* Track progress toward $abb$.
- $q_0$: nothing seen. $q_0 \xrightarrow{a} q_1$, $q_0 \xrightarrow{b} q_0$.
- $q_1$: seen $a$. $q_1 \xrightarrow{a} q_1$, $q_1 \xrightarrow{b} q_2$.
- $q_2$: seen $ab$. $q_2 \xrightarrow{a} q_1$, $q_2 \xrightarrow{b} q_3$.
- $q_3$: seen $abb$ — accept. $q_3 \xrightarrow{a,b} q_3$ (sink accept).

Accept: $\{q_3\}$. $\blacksquare$

**Problem 3.** DFA for strings over $\{0,1\}$ whose length is divisible by 2 **and** ending in $1$.

*Solution.* Cross-product $\text{even-length} \times \text{ends-in-1}$:
- States $(p, q)$ where $p \in \{E, O\}$ (parity) and $q \in \{0, 1\}$ (last bit).
- Start $(E, 0)$ (empty string, last-bit "0" nominally).
- Accept: $(E, 1)$.

Transitions flip parity on every symbol; update last bit. Minimize if desired. $\blacksquare$

**Problem 4.** Design a DFA for $L = \{w \in \{a,b\}^* : |w|_a \equiv 1 \pmod 2, |w|_b \equiv 0 \pmod 2\}$.

*Solution.* States $(p, q)$, $p = |w|_a \bmod 2$, $q = |w|_b \bmod 2$. Four states. Start $(0,0)$. Accept $(1, 0)$. Transitions flip the appropriate coordinate. $\blacksquare$

**Problem 5.** Design a DFA for strings over $\{0, 1\}$ interpreted as binary numbers (most significant bit first) divisible by $5$.

*Solution.* Track value mod 5. States $r_0, \dots, r_4$, start $r_0$, accept $\{r_0\}$.

Transitions: from $r_i$, on input $b$, new value is $2i + b \bmod 5$.
- $r_0 \xrightarrow{0} r_0, r_0 \xrightarrow{1} r_1$.
- $r_1 \xrightarrow{0} r_2, r_1 \xrightarrow{1} r_3$.
- $r_2 \xrightarrow{0} r_4, r_2 \xrightarrow{1} r_0$.
- $r_3 \xrightarrow{0} r_1, r_3 \xrightarrow{1} r_2$.
- $r_4 \xrightarrow{0} r_3, r_4 \xrightarrow{1} r_4$. $\blacksquare$

## Part B. NFA / ε-NFA and the Subset Construction

**Problem 6.** Draw an NFA (with $\le 5$ states) accepting strings ending in $aba$ over $\{a, b\}$.

*Solution.* 4 states.
- $q_0$: initial, self-loop on $a, b$ (nondeterministically stay).
- $q_0 \xrightarrow{a} q_1$; $q_1 \xrightarrow{b} q_2$; $q_2 \xrightarrow{a} q_3$.
- Accept $\{q_3\}$; no transitions out of $q_3$.

NFA guesses when the final $aba$ begins. $\blacksquare$

**Problem 7.** Convert the NFA of Problem 6 to a DFA via subset construction.

*Solution.* Start: $\{q_0\}$. On $a$: $\{q_0, q_1\}$. On $b$: $\{q_0\}$. From $\{q_0, q_1\}$: on $a$: $\{q_0, q_1\}$; on $b$: $\{q_0, q_2\}$. From $\{q_0, q_2\}$: on $a$: $\{q_0, q_1, q_3\}$ (accept); on $b$: $\{q_0\}$. From $\{q_0, q_1, q_3\}$: on $a$: $\{q_0, q_1, q_3\}$; on $b$: $\{q_0, q_2\}$.

So 4 reachable subsets. Accept = subsets containing $q_3$. $\blacksquare$

**Problem 8.** ε-NFA $N$: states $\{p_0, p_1, p_2\}$, start $p_0$, accept $\{p_2\}$.
- $p_0 \xrightarrow{\varepsilon} p_1$, $p_1 \xrightarrow{a} p_2$, $p_2 \xrightarrow{\varepsilon} p_0$.

Compute $L(N)$.

*Solution.* From $p_0$ the ε-closure is $\{p_0, p_1\}$ (since $p_2$ requires $a$). $p_1 \xrightarrow{a} p_2$, then $\varepsilon$ back to $p_0$ via $\{p_0, p_1\}$. So loop: one $a$ reaches accept; loop again. $L(N) = \{a\}^+$. $\blacksquare$

**Problem 9.** Construct an ε-NFA for $L(a^* b^*)$.

*Solution.* Two components: loop on $a$, then $\varepsilon$-jump, then loop on $b$.
- $s_0$ start, self-loop on $a$; $s_0 \xrightarrow{\varepsilon} s_1$; $s_1$ self-loop on $b$; accept $\{s_1\}$. $\blacksquare$

**Problem 10.** Convert Problem 9's ε-NFA to a DFA.

*Solution.* States = subsets after ε-closure.
- $Q_0 = \{s_0, s_1\}$ (closure of $s_0$). Accept.
- On $a$: $\{s_0\} \cup \varepsilon\text{-closure} = \{s_0, s_1\}$ = $Q_0$.
- On $b$: $\{s_1\}$. Call this $Q_1$. Accept.
- $Q_1$ on $a$: $\emptyset$ (dead).
- $Q_1$ on $b$: $\{s_1\} = Q_1$.

DFA has 3 states: $Q_0, Q_1$, dead. $\blacksquare$

## Part C. Regular Expressions and Conversion

**Problem 11.** Write a regex for: strings over $\{a, b\}$ with exactly two $a$'s.

*Solution.*
$$
b^* a b^* a b^*.
$$
$\blacksquare$

**Problem 12.** Write a regex for: strings over $\{0, 1\}$ not containing $101$ as a substring.

*Hint/Solution.* Build a DFA tracking "how much of $101$ have I seen" ($q_0$: nothing, $q_1$: saw $1$, $q_2$: saw $10$). If we would hit $101$, go to a sink. Then use state elimination.

A direct regex is
$$
(0 + 1(10)^* (0 + \varepsilon))^*
$$
after simplification — the point is to block every occurrence of $101$. (Verify via state elimination on the DFA.) $\blacksquare$

**Problem 13.** Convert regex $(ab + ba)^*$ to ε-NFA via Thompson.

*Solution.*
- NFA for $ab$: $\to q_a \xrightarrow{a} q_{ab} \xrightarrow{b} q_{ab,f}$.
- NFA for $ba$: $\to q_b \xrightarrow{b} q_{ba} \xrightarrow{a} q_{ba,f}$.
- Union: new start $s$ with ε → $q_a$ and ε → $q_b$; new accept $f$ with ε from $q_{ab,f}, q_{ba,f}$.
- Star: new start $S$, new accept $F$, ε from $S \to s$, $f \to F$, $S \to F$ (for $\varepsilon$), $f \to s$ (for iteration).

Total: ≈12 states. $\blacksquare$

**Problem 14.** Apply state elimination to the DFA of Problem 1 to produce a regex.

*Sketch.* States $q_0, q_1, q_2$. Add new start $s \xrightarrow{\varepsilon} q_0$ and new accept $f$ with $q_0 \xrightarrow{\varepsilon} f$.

Observe the $0$-loop at each $q_i$: $0^*$. Eliminate $q_1$ and $q_2$ to derive self-loop at $q_0$: one pass around gives $0^* 1 0^* 1 0^* 1$ (three $1$'s through the cycle). So self-loop at $q_0$: $0^* 1 0^* 1 0^* 1$. With initial $0^*$ preceding, the regex is
$$
0^* (1 0^* 1 0^* 1 0^*)^*.
$$
$\blacksquare$

**Problem 15.** Prove $L(r) = L(s)$ for $r = (a + b)^*$ and $s = (a^* b)^* a^*$.

*Proof.* $L(r)$ is all strings over $\{a, b\}$. $L(s)$: zero or more blocks of the form $a^*b$, then $a^*$. Every string either ends in $a$ (captured by the tail $a^*$) or ends in $b$ (captured by a block $a^* b$). So $L(s) \supseteq \Sigma^*$, and clearly $L(s) \subseteq \Sigma^*$. Equal. $\blacksquare$

## Part D. Closure Properties

**Problem 16.** If $L$ is regular, show $L^R = \{w^R : w \in L\}$ is regular.

*Solution.* Take DFA $M$ for $L$. Construct NFA $M^R$:
- Reverse all transitions.
- Old accept states become start states (use ε-NFA with new start having ε-edges to each).
- Old start becomes unique accept.

$L(M^R) = L^R$. NFA $\Rightarrow$ regular. $\blacksquare$

**Problem 17.** Show regular languages are closed under intersection, using the product construction.

*Solution.* Given DFAs $M_1 = (Q_1, \Sigma, \delta_1, q_1, F_1)$, $M_2 = (Q_2, \Sigma, \delta_2, q_2, F_2)$. Define $M = (Q_1 \times Q_2, \Sigma, \delta, (q_1, q_2), F_1 \times F_2)$ with $\delta((p, q), a) = (\delta_1(p, a), \delta_2(q, a))$.

By induction on $|w|$: $\hat\delta((q_1, q_2), w) = (\hat\delta_1(q_1, w), \hat\delta_2(q_2, w))$. So $M$ accepts iff both do. $\blacksquare$

**Problem 18.** If $L$ is regular and $h: \Sigma^* \to \Gamma^*$ is a homomorphism, show $h(L)$ is regular.

*Solution.* Take DFA $M$ for $L$. Construct ε-NFA $N$ over $\Gamma$:
- Same states.
- Each $\delta(q, a) = q'$ becomes: read $h(a)$ (a string in $\Gamma^*$) via a chain of new intermediate states and single-letter or ε transitions.

$L(N) = h(L)$. Convert to DFA. $\blacksquare$

**Problem 19.** Show regular languages are closed under **complement** but not automatically closed under **difference** (without invoking intersection).

*Solution.* Complement: swap $F$ and $Q \setminus F$ in the DFA. Difference: $L_1 \setminus L_2 = L_1 \cap \overline{L_2}$. Both regular ⇒ $\overline{L_2}$ regular ⇒ by closure under intersection, difference regular. $\blacksquare$

**Problem 20.** Is the class of regular languages closed under the operation $L \mapsto \text{Prefix}(L) = \{u : \exists v,\ uv \in L\}$?

*Solution.* Yes. Take DFA $M$ for $L$. Let $A$ be the set of states that can reach an accepting state. Build new DFA $M'$ with same transitions but $F' = A$. Any prefix of a string in $L$ reaches a state in $A$; conversely, reaching $A$ means some continuation accepts. $\blacksquare$

## Part E. Pumping Lemma / Non-regularity

**Problem 21.** Prove $L = \{0^n 1^n : n \ge 0\}$ is not regular.

*Proof.* Assume regular. Let $p$ be the pumping length. Take $w = 0^p 1^p \in L$. Any split $w = xyz$ with $|xy| \le p, |y| \ge 1$ forces $y = 0^k$ for some $k \ge 1$. Pump with $i = 2$: $xy^2z = 0^{p+k} 1^p \notin L$. Contradiction. $\blacksquare$

**Problem 22.** Prove $L = \{ww : w \in \{0,1\}^*\}$ is not regular.

*Proof.* Assume regular with pumping length $p$. Let $w = 0^p 1 0^p 1$. Then $w \in L$ (with $w_0 = 0^p 1$). Split $w = xyz$ with $|xy| \le p$: $y = 0^k, k \ge 1$. Pump to $xy^2z = 0^{p+k} 1 0^p 1$. The two halves must be equal; but length $2p+2+k$ is odd if $k$ odd — more carefully, the split point changes, so the left half $0^{(p+k+1)/2}\dots$ no longer matches the right. Contradiction. $\blacksquare$

**Problem 23.** Prove $L = \{0^{n^2} : n \ge 0\}$ is not regular.

*Proof.* Assume pumping length $p$. Take $w = 0^{p^2}$. Split, $y = 0^k$, $1 \le k \le p$. Then $xy^2z = 0^{p^2 + k}$. For this to be in $L$, need $p^2 + k = m^2$ for some $m > p$. But $(p+1)^2 = p^2 + 2p + 1$, so next perfect square after $p^2$ is at distance $2p+1 > p \ge k$. So $p^2 + k$ is strictly between two consecutive squares, not a square. Contradiction. $\blacksquare$

**Problem 24.** Prove $L = \{a^n b^m : n \ne m\}$ is not regular.

*Proof.* Use closure. If $L$ regular, so is $\overline{L} \cap a^* b^* = \{a^n b^n : n \ge 0\}$, which is non-regular (Problem 21). Contradiction. $\blacksquare$

**Problem 25.** Prove $L = \{a^p : p \text{ prime}\}$ is not regular.

*Proof.* Assume pumping length $N$. Take $w = a^p$ for prime $p > N$. Split $w = xyz$, $|y| = k \ge 1$, $|xy| \le N$. Pump to $xy^{p+1}z = a^{p + pk} = a^{p(1+k)}$. Since $p(1+k)$ with $p > 1, 1+k > 1$ is composite, not in $L$. Contradiction. $\blacksquare$

## Part F. Turing Machines and Decidability

**Problem 26.** Design a TM that decides $L = \{a^n b^n c^n : n \ge 0\}$.

*Sketch.* Repeat: scan right, cross one $a$, one $b$, one $c$ (mark with $X, Y, Z$). Return left. If no more $a$: scan right, accept if only $X, Y, Z, \sqcup$; else reject.

States: $q_0$ (start/loop), $q_1$ (found $a$, seek $b$), $q_2$ (found $b$, seek $c$), $q_3$ (found $c$, return left), $q_\text{check}$ (verify all crossed), plus halts. $\blacksquare$

**Problem 27.** Show $\text{HALT} = \{\langle M, w \rangle : M \text{ halts on } w\}$ is Turing-recognizable.

*Proof.* Construct universal TM $U$ that simulates $M$ on $w$. If $M$ halts (accept or reject), $U$ accepts. If $M$ loops, $U$ loops. So $L(U) = \text{HALT}$. $\blacksquare$

**Problem 28.** Show $A_{\text{TM}} = \{\langle M, w \rangle : M \text{ accepts } w\}$ is undecidable.

*Proof.* Reduce $\text{HALT}$ to $A_{\text{TM}}$. Given $\langle M, w \rangle$, build $M'$: on any input $x$, simulate $M$ on $w$; if $M$ halts, accept. Then $M' \in A_{\text{TM}}$ (for any input, say $\varepsilon$) iff $M$ halts on $w$. If $A_{\text{TM}}$ decidable, HALT decidable — contradiction. $\blacksquare$

**Problem 29.** Show $E_{\text{TM}} = \{\langle M \rangle : L(M) = \emptyset\}$ is undecidable.

*Proof.* Reduce $A_{\text{TM}}$ to $\overline{E_{\text{TM}}}$. Given $\langle M, w \rangle$, build $M_w$: on input $x$, if $x = w$, simulate $M$ on $w$ and accept if $M$ accepts; else reject. Then $L(M_w) \ne \emptyset \iff M$ accepts $w$. So $\langle M, w \rangle \in A_{\text{TM}} \iff \langle M_w \rangle \notin E_{\text{TM}}$. Decidability of $E_{\text{TM}}$ would give decidability of $A_{\text{TM}}$. $\blacksquare$

**Problem 30.** Show $\{\langle M \rangle : M \text{ accepts at least one string}\}$ is **recognizable** but not decidable.

*Proof (Recognizable).* Enumerate all strings $s_1, s_2, \dots$ and simulate $M$ on $s_1, s_2, \dots$ in parallel (dovetail). If any simulation accepts, accept.

*(Not decidable).* It's $\overline{E_{\text{TM}}}$, whose complement is undecidable — so neither side is decidable. $\blacksquare$

**Problem 31.** State Rice's theorem and use it to derive that "$M$ halts on all inputs" is undecidable.

*Solution.* Rice: any **nontrivial** semantic property $P$ of TM languages is undecidable. The property "$L(M) = \Sigma^*$" (halts and accepts all) is a semantic property (depends only on $L(M)$), nontrivial (some TMs have this, some don't). By Rice, undecidable. (A separate argument handles "halts on all inputs" vs "accepts all inputs"; the standard reduction uses $A_{\text{TM}}$.) $\blacksquare$

**Problem 32.** Show that if $L$ and $\overline{L}$ are both Turing-recognizable, then $L$ is decidable.

*Proof.* Let $M_1$ recognize $L$, $M_2$ recognize $\overline{L}$. Build TM $D$: on input $w$, simulate $M_1, M_2$ in parallel (dovetail). Exactly one must eventually accept (since $w$ is in $L$ or $\overline{L}$). If $M_1$ accepts first, accept; if $M_2$ first, reject. $D$ halts on every input. $\blacksquare$

## Mixed Review

**Problem 33.** Classify each as (a) regular, (b) context-free but not regular, (c) decidable but not CF, (d) recognizable but not decidable, (e) not recognizable:
1. $\{a^n b^n : n \ge 0\}$. → (b)
2. $\{a^n b^n c^n : n \ge 0\}$. → (c)
3. $\overline{\text{HALT}}$. → (e)
4. $\{a^{2n} : n \ge 0\}$. → (a)
5. $\{\langle M, w \rangle : M \text{ accepts } w\}$. → (d)
6. $\{ww : w \in \Sigma^*\}$. → (c)
7. $\{ww^R : w \in \Sigma^*\}$ (palindromes). → (b)
8. $\{a^p : p \text{ prime}\}$. → (c)

**Problem 34.** True or False: If $L$ is recognizable and infinite, then some infinite subset of $L$ is decidable.

*Answer.* **True.** Since $L$ is recognizable, enumerate accepted strings $w_1, w_2, \dots$ in order they're accepted. The enumerated list is a decidable infinite subset (it's the range of a computable function, hence decidable as a language). $\blacksquare$

**Problem 35.** Describe how you'd show $\{a^n : n \text{ is a power of } 2\}$ is not regular.

*Solution.* Apply pumping lemma. Choose $w = a^{2^p}$ where $2^p > p$. Split, pump. Need $2^p + (i-1)k$ a power of 2 for all $i$ with $k \ge 1$. Consecutive powers differ by $2^p$, but pumping by $k \le p$ violates this gap. Contradiction. $\blacksquare$

## Summary

- Part A: DFA design requires identifying a **finite state variable** tracking relevant information.
- Part B: Subset construction = systematic way to simulate NFA with a DFA; state blowup up to $2^{|Q|}$.
- Part C: Thompson (regex → NFA) and state elimination (NFA → regex) are the practical tools.
- Part D: Closure properties let you build new regular languages from old — and disprove regularity by contradiction.
- Part E: Pumping lemma is the canonical tool for non-regularity; pick a string whose structure forces contradiction under pumping.
- Part F: Halting problem is the root of undecidability; reductions from HALT or $A_{\text{TM}}$ are the standard technique.

## Related Concepts

- [[18-dfa]], [[19-nfa-and-enfa]], [[20-regular-expressions-and-kleenes-theorem]] — automata and regex.
- [[21-closure-and-pumping-lemma]] — tools for proving (non-)regularity.
- [[22-turing-machines-and-computability]] — decidability and undecidability.

## Sources

- [[raw/Computability_260316_142548]] — all examples grounded in the source lecture notes.
