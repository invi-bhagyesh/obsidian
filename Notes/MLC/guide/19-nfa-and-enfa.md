---
title: "Non-deterministic Finite Automata (NFA, ε-NFA)"
type: guide
module: "Computability"
file: 19
related: [18-dfa, 20-regular-expressions-and-kleenes-theorem, 21-closure-and-pumping-lemma]
sources: [Computability_260316_142548]
---

# 19. Non-deterministic Finite Automata (NFA, ε-NFA)

Nondeterminism seems to give a machine extra power — the ability to "guess" correctly at each step. A surprising theorem in automata theory is that for finite automata, nondeterminism **does not** increase expressive power: every NFA can be converted to a DFA recognizing the same language. This chapter introduces NFAs, $\varepsilon$-NFAs (nondeterministic with silent $\varepsilon$-transitions), and the **subset construction** that makes them equivalent to DFAs.

## 19.1 Non-deterministic Finite Automata

> **Definition 19.1 (NFA).** A **Non-deterministic Finite Automaton** is a $5$-tuple
> $$
> N = (Q, \Sigma, \delta, q_0, F)
> $$
> where $Q, \Sigma, q_0, F$ are as in a DFA, and
> $$
> \delta: Q \times \Sigma \to 2^Q
> $$
> — the transition function maps each $(q, a)$ to a **set** of possible next states.

Key differences from DFA:
- On $(q, a)$, the NFA may have zero, one, or many possible next states.
- On an input string, the NFA has multiple possible computation paths.
- The NFA **accepts** $w$ if **at least one** path ends in an accept state.

## 19.2 Extended Transition Function for NFA

> **Definition 19.2.** $\hat\delta_N: Q \times \Sigma^* \to 2^Q$ defined by
> - $\hat\delta_N(q, \varepsilon) = \{q\}$.
> - $\hat\delta_N(q, wa) = \bigcup_{p \in \hat\delta_N(q, w)} \delta(p, a)$.

Equivalently, $\hat\delta_N(q, w)$ is the set of all states reachable from $q$ by reading $w$.

> **Definition 19.3.** $L(N) = \{w : \hat\delta_N(q_0, w) \cap F \ne \emptyset\}$.

## 19.3 Example NFA

**Example 1.** NFA for $L = $ strings over $\{0, 1\}$ ending in $01$.

- $Q = \{q_0, q_1, q_2\}$, $\Sigma = \{0, 1\}$.
- $\delta(q_0, 0) = \{q_0, q_1\}$, $\delta(q_0, 1) = \{q_0\}$.
- $\delta(q_1, 1) = \{q_2\}$, $\delta(q_1, 0) = \emptyset$.
- $\delta(q_2, 0) = \emptyset$, $\delta(q_2, 1) = \emptyset$.
- Start: $q_0$. Accept: $\{q_2\}$.

The machine "guesses" when the final two symbols $01$ are starting. On input $1101$:
- Start $\{q_0\}$.
- Read $1$: $\{q_0\}$.
- Read $1$: $\{q_0\}$.
- Read $0$: $\{q_0, q_1\}$.
- Read $1$: $\{q_0, q_2\}$. Contains $q_2$ — **accept**.

The NFA is simpler than the corresponding DFA: only $3$ states vs $3$ for the DFA, but the **design** is easier — we don't have to track as much explicit context.

## 19.4 ε-Transitions (ε-NFA)

> **Definition 19.4 (ε-NFA).** An **ε-NFA** has transition function $\delta: Q \times (\Sigma \cup \{\varepsilon\}) \to 2^Q$, allowing "silent" transitions labeled $\varepsilon$ that consume no input.

> **Definition 19.5 (ε-closure).** For $q \in Q$, the **ε-closure** of $q$, $E(q)$, is the set of states reachable from $q$ by any sequence of $\varepsilon$-transitions (including $q$ itself).
>
> Extended to sets: $E(S) = \bigcup_{q \in S} E(q)$.

> **Definition 19.6 (Extended transition for ε-NFA).**
> - $\hat\delta(q, \varepsilon) = E(q)$.
> - $\hat\delta(q, wa) = E\left(\bigcup_{p \in \hat\delta(q, w)} \delta(p, a)\right)$.

Acceptance: $w \in L(N)$ iff $\hat\delta(q_0, w) \cap F \ne \emptyset$.

**Example 2.** ε-NFA for $L = $ strings that are decimal numbers (integer or decimal).

States: $q_0$ (start), $q_1$ (integer part), $q_2$ (seen decimal point), $q_3$ (fractional part — accept), $q_4$ (integer — accept).

Transitions include:
- $\delta(q_0, \varepsilon) = \{q_1\}$ (silently start reading digits).
- $\delta(q_1, \text{digit}) = \{q_1, q_4\}$.
- $\delta(q_4, '.') = \{q_2\}$.
- $\delta(q_2, \text{digit}) = \{q_2, q_3\}$.

(ε-transitions streamline the design; without them, we'd need more states to "branch" deterministically between integer and decimal forms.)

## 19.5 The Subset Construction: NFA → DFA

> **Theorem 19.7.** For every NFA $N$, there is a DFA $M$ with $L(M) = L(N)$.

*Proof (subset construction).* Given $N = (Q, \Sigma, \delta, q_0, F)$, define DFA $M = (Q', \Sigma, \delta', q_0', F')$ by:
- $Q' = 2^Q$ — **states of $M$ are subsets of $Q$**.
- $\delta'(S, a) = \bigcup_{p \in S} \delta(p, a)$ — from subset $S$ on $a$, go to union of all $\delta(p, a)$.
- $q_0' = \{q_0\}$.
- $F' = \{S \subseteq Q : S \cap F \ne \emptyset\}$.

Claim: $L(M) = L(N)$. By induction, $\hat\delta_M(q_0', w) = \hat\delta_N(q_0, w)$ for every $w$. $\blacksquare$

*Size blowup.* An NFA with $n$ states yields a DFA with up to $2^n$ states. In the worst case, this is tight.

### For ε-NFAs: incorporate ε-closure

For ε-NFAs, modify subset construction:
- $q_0' = E(q_0)$.
- $\delta'(S, a) = E\left(\bigcup_{p \in S} \delta(p, a)\right)$ — take ε-closure of the union.

**Example 3.** Convert the NFA of Example 1 (strings ending in $01$, NFA states $\{q_0, q_1, q_2\}$) to a DFA.

Starting subset: $\{q_0\}$.
- $\delta'(\{q_0\}, 0) = \delta(q_0, 0) = \{q_0, q_1\}$.
- $\delta'(\{q_0\}, 1) = \delta(q_0, 1) = \{q_0\}$.
- $\delta'(\{q_0, q_1\}, 0) = \delta(q_0, 0) \cup \delta(q_1, 0) = \{q_0, q_1\} \cup \emptyset = \{q_0, q_1\}$.
- $\delta'(\{q_0, q_1\}, 1) = \delta(q_0, 1) \cup \delta(q_1, 1) = \{q_0\} \cup \{q_2\} = \{q_0, q_2\}$.
- $\delta'(\{q_0, q_2\}, 0) = \{q_0, q_1\}$.
- $\delta'(\{q_0, q_2\}, 1) = \{q_0\}$.

Reachable subsets: $\{q_0\}, \{q_0, q_1\}, \{q_0, q_2\}$ — only 3 subsets, not all $2^3 = 8$.

Accept states: those containing $q_2$: $\{\{q_0, q_2\}\}$.

The resulting DFA recognizes exactly strings ending in $01$.

## 19.6 ε-Transitions Add No Power

> **Theorem 19.8.** Every ε-NFA $N$ has an equivalent NFA $N'$ (without ε-transitions).

*Construction.* Let $\delta'(q, a) = E(\bigcup_{p \in E(q)} \delta(p, a))$. Accept states: $F' = F \cup \{q : E(q) \cap F \ne \emptyset\}$. $\blacksquare$

Combined with the subset construction:

> **Corollary 19.9.** DFA, NFA, ε-NFA all accept exactly the **regular languages**.

## 19.7 When to Use Each Model

- **DFA**: efficient simulation, canonical form (unique minimal DFA). Use for implementation.
- **NFA**: concise design, especially for languages defined by patterns. Use for construction.
- **ε-NFA**: very flexible for building NFAs modularly (e.g., from regular expressions, [[20-regular-expressions-and-kleenes-theorem]]). Use during translation.

## 19.8 Worked Examples

**Example 4.** Build an NFA for $L = $ strings over $\{a, b\}$ containing "ab" or "ba".

- $q_0$: start.
- Branch to recognize "ab": on $a$ go to $q_1$; on $b$ go to $q_2$.
- From $q_1$, on $b$ go to accept $q_\text{acc}$.
- From $q_2$, on $a$ go to accept $q_\text{acc}$.
- $q_\text{acc}$: self-loop on $a, b$.

- $\delta(q_0, a) = \{q_0, q_1\}$, $\delta(q_0, b) = \{q_0, q_2\}$.
- $\delta(q_1, b) = \{q_\text{acc}\}$, $\delta(q_1, a) = \emptyset$.
- $\delta(q_2, a) = \{q_\text{acc}\}$, $\delta(q_2, b) = \emptyset$.
- $\delta(q_\text{acc}, a) = \{q_\text{acc}\}$, $\delta(q_\text{acc}, b) = \{q_\text{acc}\}$.

Accept: $\{q_\text{acc}\}$.

**Example 5.** Convert to DFA via subset construction.

Reachable subsets (from $\{q_0\}$):
- $\{q_0\}$: on $a$ → $\{q_0, q_1\}$; on $b$ → $\{q_0, q_2\}$.
- $\{q_0, q_1\}$: on $a$ → $\{q_0, q_1\}$ (from $q_0$) ∪ $\emptyset$ = $\{q_0, q_1\}$; on $b$ → $\{q_0, q_2\}$ ∪ $\{q_\text{acc}\}$ = $\{q_0, q_2, q_\text{acc}\}$.
- $\{q_0, q_2\}$: on $a$ → $\{q_0, q_1\}$ ∪ $\{q_\text{acc}\}$ = $\{q_0, q_1, q_\text{acc}\}$; on $b$ → $\{q_0, q_2\}$.
- $\{q_0, q_2, q_\text{acc}\}$: on $a$ → $\{q_0, q_1\}$ ∪ $\{q_\text{acc}\}$ ∪ $\{q_\text{acc}\}$ = $\{q_0, q_1, q_\text{acc}\}$; on $b$ → $\{q_0, q_2, q_\text{acc}\}$.
- $\{q_0, q_1, q_\text{acc}\}$: on $a$ → $\{q_0, q_1, q_\text{acc}\}$; on $b$ → $\{q_0, q_2, q_\text{acc}\}$.

Five states total; accept those containing $q_\text{acc}$: $\{\{q_0, q_2, q_\text{acc}\}, \{q_0, q_1, q_\text{acc}\}\}$.

**Example 6 (ε-NFA).** ε-NFA for $L = a^* \cup b^*$ (strings of only $a$'s or only $b$'s).

- $q_0$ (start) with ε-transitions to $q_a$ and $q_b$.
- $q_a$: self-loop on $a$, no $b$-transition.
- $q_b$: self-loop on $b$, no $a$-transition.
- Both $q_a, q_b$ are accept.

$E(q_0) = \{q_0, q_a, q_b\}$. On $\varepsilon$: read nothing, land in these three states. Since $q_a, q_b \in F$, $\varepsilon \in L(N)$. ✓ (Since $\varepsilon \in a^*$.)

## 19.9 Summary

- **NFA**: nondeterministic transitions $\delta(q, a) \subseteq Q$; accept if **some** path ends in $F$.
- **ε-NFA**: adds silent ε-transitions; $E(q)$ is the ε-closure.
- Extended transitions defined recursively; acceptance via $\hat\delta(q_0, w) \cap F \ne \emptyset$.
- **Subset construction** converts NFA to DFA: DFA states are subsets of NFA states. Blowup up to $2^n$.
- ε-transitions add convenience but not power.
- DFA = NFA = ε-NFA in expressive power: all recognize **regular languages**.

## Related Concepts

- [[18-dfa]] — deterministic model.
- [[20-regular-expressions-and-kleenes-theorem]] — equivalent declarative syntax.
- [[21-closure-and-pumping-lemma]] — the properties of the regular class.

## Sources

- [[raw/Computability_260316_142548]] — NFA, ε-NFA, subset construction.
