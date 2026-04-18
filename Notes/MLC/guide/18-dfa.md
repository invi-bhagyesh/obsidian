---
title: "Deterministic Finite Automata (DFA)"
type: guide
module: "Computability"
file: 18
related: [19-nfa-and-enfa, 20-regular-expressions-and-kleenes-theorem, 21-closure-and-pumping-lemma, 22-turing-machines-and-computability]
sources: [Computability_260316_142548]
---

# 18. Deterministic Finite Automata (DFA)

Automata theory studies abstract machines and the classes of languages they can recognize. The simplest model is the **Deterministic Finite Automaton (DFA)** — a machine with finitely many states that reads an input string and accepts or rejects. Despite its minimalism, the DFA captures exactly the **regular languages**, a foundational class with extensive applications in lexical analysis, pattern matching, and protocol verification.

## 18.1 Preliminaries: Alphabets, Strings, Languages

> **Definition 18.1.** An **alphabet** $\Sigma$ is a nonempty finite set of symbols. A **string** (or **word**) over $\Sigma$ is a finite sequence of symbols from $\Sigma$. The **empty string** is denoted $\varepsilon$ (or $\lambda$).

> **Definition 18.2.** $\Sigma^*$ is the set of all finite strings over $\Sigma$ (including $\varepsilon$). $\Sigma^+ = \Sigma^* \setminus \{\varepsilon\}$.

> **Definition 18.3.** A **language** over $\Sigma$ is a subset $L \subseteq \Sigma^*$.

**Examples.**
- $\Sigma = \{0, 1\}$. $\Sigma^* = \{\varepsilon, 0, 1, 00, 01, 10, 11, 000, \dots\}$.
- $L_1 = \{0^n 1^n : n \ge 0\}$ — the "balanced" language.
- $L_2 = \{w \in \{a, b\}^* : w \text{ has even length}\}$.
- $L_3 = \{\varepsilon, 01, 0011, 000111, \dots\}$ = $L_1$.

**Operations on strings.**
- **Length** $|w|$ = number of symbols.
- **Concatenation** $uv$: $u$ followed by $v$. $|uv| = |u| + |v|$.
- $\Sigma^n$ = all strings of length $n$.

**Operations on languages.**
- **Union**: $L_1 \cup L_2 = \{w : w \in L_1 \text{ or } w \in L_2\}$.
- **Intersection**: $L_1 \cap L_2$.
- **Concatenation**: $L_1 L_2 = \{uv : u \in L_1, v \in L_2\}$.
- **Kleene star**: $L^* = \{\varepsilon\} \cup L \cup LL \cup LLL \cup \dots$
- **Complement**: $\overline{L} = \Sigma^* \setminus L$.
- **Reversal**: $L^R = \{w^R : w \in L\}$.

## 18.2 The DFA Definition

> **Definition 18.4 (DFA).** A **Deterministic Finite Automaton** is a $5$-tuple
> $$
> M = (Q, \Sigma, \delta, q_0, F)
> $$
> where:
> - $Q$ is a finite set of **states**.
> - $\Sigma$ is the input alphabet.
> - $\delta: Q \times \Sigma \to Q$ is the **transition function**.
> - $q_0 \in Q$ is the **start state**.
> - $F \subseteq Q$ is the set of **accept states** (or **final states**).

A DFA processes an input string one symbol at a time, starting at $q_0$, applying $\delta$ to each symbol. After the last symbol is read, the DFA accepts iff the current state is in $F$.

## 18.3 Extended Transition Function

We extend $\delta$ from single symbols to strings:

> **Definition 18.5 (Extended transition $\hat\delta$).** $\hat\delta: Q \times \Sigma^* \to Q$ defined recursively:
> - $\hat\delta(q, \varepsilon) = q$.
> - $\hat\delta(q, wa) = \delta(\hat\delta(q, w), a)$ for $w \in \Sigma^*, a \in \Sigma$.

Equivalently, $\hat\delta(q, a_1 a_2 \cdots a_n) = \delta(\delta(\cdots \delta(\delta(q, a_1), a_2) \cdots), a_n)$.

Some texts denote $\hat\delta$ by $\delta^*$.

## 18.4 Language of a DFA

> **Definition 18.6.** A string $w$ is **accepted** by DFA $M$ iff $\hat\delta(q_0, w) \in F$. The **language** of $M$ is
> $$
> L(M) = \{w \in \Sigma^* : \hat\delta(q_0, w) \in F\}.
> $$

> **Definition 18.7 (Regular language).** A language $L$ is **regular** iff $L = L(M)$ for some DFA $M$.

## 18.5 State Diagrams

A DFA is visualized as a directed graph:
- States = nodes (circles).
- Transitions = labeled edges: $p \xrightarrow{a} q$ iff $\delta(p, a) = q$.
- Start state marked with an incoming arrow from nowhere.
- Accept states marked with double circles.

**Example 1.** A DFA recognizing strings over $\{0, 1\}$ ending in $1$:

- $Q = \{q_0, q_1\}$, $\Sigma = \{0, 1\}$.
- $\delta(q_0, 0) = q_0, \delta(q_0, 1) = q_1, \delta(q_1, 0) = q_0, \delta(q_1, 1) = q_1$.
- Start: $q_0$. Accept: $F = \{q_1\}$.

State diagram:
```
       0         1
    ┌──┐     ┌──┐
    ↓  │     ↓  │
→ (q_0) ─1→ ((q_1))
    ↑          │
    └────0─────┘
```

Trace on input $0110$: $q_0 \xrightarrow{0} q_0 \xrightarrow{1} q_1 \xrightarrow{1} q_1 \xrightarrow{0} q_0$. Ends in $q_0 \notin F$ — **rejected**.

Trace on input $0011$: $q_0 \to q_0 \to q_0 \to q_1 \to q_1$. Ends in $q_1 \in F$ — **accepted**.

## 18.6 Worked DFA Constructions

**Example 2.** DFA for $L = $ strings over $\{0,1\}$ containing substring $01$.

- States: $q_0$ (haven't started seeing $01$), $q_1$ (just saw a $0$), $q_2$ (accept — saw $01$).
- $\delta(q_0, 0) = q_1, \delta(q_0, 1) = q_0$.
- $\delta(q_1, 0) = q_1, \delta(q_1, 1) = q_2$.
- $\delta(q_2, 0) = q_2, \delta(q_2, 1) = q_2$ (stay accepted).
- Start: $q_0$, Accept: $\{q_2\}$.

**Example 3.** DFA for $L = $ strings over $\{a, b\}$ of even length.

- States: $q_0$ (even), $q_1$ (odd).
- $\delta(q_0, a) = q_1, \delta(q_0, b) = q_1$. $\delta(q_1, a) = q_0, \delta(q_1, b) = q_0$.
- Start: $q_0$, Accept: $\{q_0\}$.

**Example 4.** DFA for $L = $ binary strings representing integers divisible by $3$ (most-significant bit first).

*Idea.* Track the remainder mod $3$. State $q_r$ means "so far, remainder $r$".
- If we're in state $r$ and read $b \in \{0, 1\}$, the new number is $2r + b$, remainder $(2r + b) \mod 3$.
- $\delta(q_0, 0) = q_0, \delta(q_0, 1) = q_1$.
- $\delta(q_1, 0) = q_2, \delta(q_1, 1) = q_0$.
- $\delta(q_2, 0) = q_1, \delta(q_2, 1) = q_2$.
- Start & accept: $\{q_0\}$.

Trace on input $110$ (= 6): $q_0 \to q_1 \to q_0 \to q_0$. Accept. $6 = 2 \cdot 3$ ✓.

## 18.7 Formal Language Recognition

> **Theorem 18.8.** A language $L \subseteq \Sigma^*$ is **regular** iff it is accepted by some DFA.

(This is a *definition* here; the "only if" direction becomes a theorem once we connect to NFAs and regular expressions in [[19-nfa-and-enfa]], [[20-regular-expressions-and-kleenes-theorem]].)

## 18.8 Examples of Regular Languages

- Finite languages: any finite $L$ is regular (construct a DFA with one state per prefix, plus trap states).
- Regular patterns: "strings ending in $abc$", "strings containing $0101$", "strings of length $\equiv 2 \pmod{5}$".
- Arithmetic predicates mod $k$: "numbers divisible by $k$" (as in Example 4).

## 18.9 Non-Regular Languages

Not every language is regular. The classical example:

> **Theorem 18.9.** $L = \{0^n 1^n : n \ge 0\}$ is **not** regular.

*Intuition.* To check $n$ $0$'s matched by $n$ $1$'s, the DFA must remember how many $0$'s it has seen — but it has only finitely many states.

The rigorous tool for such proofs is the **Pumping Lemma** ([[21-closure-and-pumping-lemma]]).

## 18.10 DFA Minimization (Preview)

Two DFAs can recognize the same language with different numbers of states. There is a **minimal DFA** (unique up to isomorphism) for every regular language. The minimization algorithm identifies "equivalent" states and merges them — state $p \sim q$ iff they accept the same language from that point onward.

In Example 2 above, the three-state DFA is minimal. Adding useless states (e.g., dead states not reachable) would be non-minimal.

## 18.11 Worked Examples

**Example 5.** Design a DFA for $L = \{w \in \{a, b\}^* : w \text{ contains exactly two } a\text{'s}\}$.

- States: $q_0$ (0 $a$'s), $q_1$ (1 $a$), $q_2$ (2 $a$'s), $q_3$ (≥ 3 $a$'s — trap).
- $\delta(q_0, a) = q_1, \delta(q_0, b) = q_0$.
- $\delta(q_1, a) = q_2, \delta(q_1, b) = q_1$.
- $\delta(q_2, a) = q_3, \delta(q_2, b) = q_2$.
- $\delta(q_3, a) = q_3, \delta(q_3, b) = q_3$.
- Start: $q_0$. Accept: $\{q_2\}$.

**Example 6.** Design a DFA for $L = \{w \in \{0, 1\}^* : w \text{ starts with } 0 \text{ and ends with } 1\}$.

States track two bits: "has $w$ started with $0$?" and "does $w$ currently end with $1$?"
- $q_0$: initial (empty or not-yet-started).
- $q_1$: started with $0$, currently ends with $0$.
- $q_2$: started with $0$, currently ends with $1$ (**accept**).
- $q_3$: started with $1$ — trap (can never end correctly).

- $\delta(q_0, 0) = q_1, \delta(q_0, 1) = q_3$.
- $\delta(q_1, 0) = q_1, \delta(q_1, 1) = q_2$.
- $\delta(q_2, 0) = q_1, \delta(q_2, 1) = q_2$.
- $\delta(q_3, 0) = q_3, \delta(q_3, 1) = q_3$.

Accept: $\{q_2\}$.

**Example 7.** Trace DFA of Example 4 on $1010$ (= 10).

$q_0 \xrightarrow{1} q_1 \xrightarrow{0} q_2 \xrightarrow{1} q_2 \xrightarrow{0} q_1$. End at $q_1 \notin F$. **Rejected**. $10 \mod 3 = 1$ ✓.

## 18.12 DFA Products (Closure Construction Preview)

If $L_1 = L(M_1)$ and $L_2 = L(M_2)$ for DFAs $M_1, M_2$, we can construct a DFA for $L_1 \cap L_2$ using the **product construction**:
- States of product DFA: $Q_1 \times Q_2$.
- $\delta((p, q), a) = (\delta_1(p, a), \delta_2(q, a))$.
- Accept states: $F_1 \times F_2$ for intersection, $(F_1 \times Q_2) \cup (Q_1 \times F_2)$ for union.

This proves: **regular languages are closed under union, intersection, complement** (flipping accept states). Details in [[21-closure-and-pumping-lemma]].

## 18.13 Summary

- An **alphabet** $\Sigma$ is finite; $\Sigma^*$ is all strings; a **language** is $\subseteq \Sigma^*$.
- A **DFA** $M = (Q, \Sigma, \delta, q_0, F)$ consumes strings and accepts/rejects.
- Extended $\hat\delta$ handles whole strings recursively.
- $L(M) = \{w : \hat\delta(q_0, w) \in F\}$; $L$ is **regular** iff $L = L(M)$ for some DFA.
- DFAs drawn as labeled digraphs with double circles on accept states.
- **Product construction**: DFAs for union, intersection via Cartesian product.
- Not every language is regular (e.g., $\{0^n 1^n\}$); the boundary is tested by the **Pumping Lemma** ([[21-closure-and-pumping-lemma]]).

## Related Concepts

- [[19-nfa-and-enfa]] — a more permissive model with the same expressive power.
- [[20-regular-expressions-and-kleenes-theorem]] — a declarative syntax for the same class.
- [[21-closure-and-pumping-lemma]] — closure properties and non-regularity.
- [[22-turing-machines-and-computability]] — what lies beyond regular languages.

## Sources

- [[raw/Computability_260316_142548]] — DFA definition, examples, state diagrams.
