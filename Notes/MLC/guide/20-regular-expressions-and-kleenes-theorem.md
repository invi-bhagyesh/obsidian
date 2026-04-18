---
title: "Regular Expressions and Kleene's Theorem"
type: guide
module: "Computability"
file: 20
related: [18-dfa, 19-nfa-and-enfa, 21-closure-and-pumping-lemma]
sources: [Computability_260316_142548]
---

# 20. Regular Expressions and Kleene's Theorem

Regular expressions (regex) are a **declarative syntax** for specifying languages — concise, human-readable, and ubiquitous in practice (text search, lexical analysis, pattern matching). Kleene's theorem states that the languages expressible by regex are **exactly** the languages recognized by finite automata: the regular languages. This chapter defines regex precisely, gives both directions of the equivalence (regex ↔ NFA), and shows practical examples.

## 20.1 Regular Expression Syntax

> **Definition 20.1 (Regular Expression).** Over alphabet $\Sigma$, the set of **regular expressions** is defined recursively:
> - $\emptyset$ is a regex (denoting the empty language).
> - $\varepsilon$ is a regex (denoting $\{\varepsilon\}$).
> - For each $a \in \Sigma$, $a$ is a regex (denoting $\{a\}$).
> - If $r, s$ are regex, so are $(r + s)$ (union), $(rs)$ (concatenation), $(r^*)$ (Kleene star).

*Alternative notations.* $r + s$ often written $r \mid s$ or $r \cup s$. $r^*$ is standard.

> **Definition 20.2 (Language of regex).** $L(r)$ defined recursively:
> - $L(\emptyset) = \emptyset$.
> - $L(\varepsilon) = \{\varepsilon\}$.
> - $L(a) = \{a\}$ for $a \in \Sigma$.
> - $L(r + s) = L(r) \cup L(s)$.
> - $L(rs) = L(r) \cdot L(s) = \{uv : u \in L(r), v \in L(s)\}$.
> - $L(r^*) = L(r)^* = \{\varepsilon\} \cup L(r) \cup L(r)^2 \cup \dots$

*Precedence conventions.* $^*$ binds tighter than concatenation, which binds tighter than $+$. So $ab + c^*$ means $(ab) + (c^*)$.

## 20.2 Common Regex Patterns

| Regex | Language |
|:------|:---------|
| $\emptyset$ | $\emptyset$ |
| $\varepsilon$ | $\{\varepsilon\}$ |
| $a$ | $\{a\}$ |
| $ab$ | $\{ab\}$ |
| $a + b$ | $\{a, b\}$ |
| $a^*$ | $\{\varepsilon, a, aa, aaa, \dots\}$ |
| $a^* b$ | strings of any $a$'s followed by one $b$ |
| $(a + b)^*$ | all strings over $\{a, b\}$ |
| $a(a + b)^*$ | strings starting with $a$ |
| $(a + b)^* b (a + b)^*$ | strings containing $b$ |
| $a^+ := a a^*$ | one or more $a$'s |
| $\Sigma^*$ | shorthand for "any string" |

**Example 1.** Describe $L((0 + 1)^* 01 (0 + 1)^*)$.

*Answer.* Strings over $\{0, 1\}$ containing $01$ as a substring.

**Example 2.** Write a regex for: strings over $\{0, 1\}$ with an even number of $0$'s.

*Answer.* $1^* (01^* 01^*)^*$ — zero or more $1$'s, followed by pairs of "$01^*0$" (each contributing two $0$'s). Alternative: $(1 + 01^* 0)^*$.

## 20.3 Kleene's Theorem

> **Theorem 20.3 (Kleene).** A language $L \subseteq \Sigma^*$ is **regular** (accepted by a DFA) if and only if $L = L(r)$ for some regular expression $r$.

Both directions are constructive.

### 20.3.1 Regex → NFA (Thompson's Construction)

Given a regex $r$, build an ε-NFA $N_r$ with $L(N_r) = L(r)$ by induction on $r$.

> **Thompson's construction.**
>
> - **$\emptyset$**: two states, no accept reachable.
> - **$\varepsilon$**: one state, start = accept.
> - **$a$**: two states, $\delta(q_0, a) = \{q_f\}$.
> - **$r + s$**: new start state with ε-transitions to start states of $N_r, N_s$; merge accept states or add new accept with ε-transitions from both.
> - **$rs$**: ε-transitions from accept states of $N_r$ to start state of $N_s$; new accept = accept of $N_s$.
> - **$r^*$**: new start/accept; ε-transitions new_start → $r$-start, $r$-accept → new_accept, new_start → new_accept (accept $\varepsilon$), and $r$-accept → $r$-start (iterate).

Each step adds a constant number of states. A regex of size $n$ gives an ε-NFA of size $O(n)$.

**Example 3.** Build Thompson's NFA for $r = (a + b)^* a$.

1. For $a$: two states, $a$-transition.
2. For $b$: two states, $b$-transition.
3. For $a + b$: new start with ε → $a$-start, ε → $b$-start; new accept with ε from both $a$-accept and $b$-accept.
4. For $(a + b)^*$: add ε-loop and ε-start-to-accept.
5. For $(a + b)^* a$: concatenate with an $a$-NFA.

The result is an ε-NFA with roughly 10 states.

### 20.3.2 NFA → Regex (State Elimination)

Given a DFA or NFA, construct an equivalent regex.

> **State elimination algorithm.**
>
> 1. Add a new unique start state with ε-transition to the old start.
> 2. Add a new unique accept state; all old accept states get ε-transitions to it.
> 3. Repeatedly eliminate intermediate states (i.e., neither start nor accept):
>    - When eliminating state $q$, for every pair of (remaining) states $p, r$ with transitions $p \xrightarrow{\alpha} q \xrightarrow{\gamma} r$ and a self-loop $q \xrightarrow{\beta} q$: add transition $p \xrightarrow{\alpha \beta^* \gamma} r$. If multiple transitions already exist between $p, r$, union them.
> 4. When only start and accept remain, with transitions labeled by regex, the answer is the regex on the sole path.

This works for any DFA/NFA and always terminates, producing a regex.

## 20.4 Regex Equivalences

Regular expressions satisfy many algebraic identities:

- **Idempotence**: $r + r \equiv r$.
- **Commutativity of $+$**: $r + s \equiv s + r$.
- **Associativity**: $(r + s) + t \equiv r + (s + t)$; $(rs)t \equiv r(st)$.
- **Distributivity**: $r(s + t) \equiv rs + rt$; $(r + s)t \equiv rt + st$.
- **Identity**: $\varepsilon r \equiv r \equiv r \varepsilon$; $\emptyset r \equiv \emptyset \equiv r \emptyset$; $r + \emptyset \equiv r$.
- **Star laws**: $\emptyset^* \equiv \varepsilon$; $\varepsilon^* \equiv \varepsilon$; $r^{**} \equiv r^*$; $r^* = \varepsilon + r r^*$; $(r + s)^* = (r^* s^*)^*$.

*Caveat.* The equivalence problem for regex is **PSPACE-complete** — algebraic identities don't give a polynomial decision procedure.

## 20.5 Worked Examples

**Example 4.** Regex for "strings over $\{0, 1\}$ of length exactly 3": $(0 + 1)(0 + 1)(0 + 1)$, often written $\Sigma \Sigma \Sigma$.

**Example 5.** Regex for "strings starting with $01$ and ending with $10$, length $\ge 4$":
$$
01 (0 + 1)^* 10.
$$

**Example 6.** Regex for "binary strings with at least one $0$":
$$
(0 + 1)^* 0 (0 + 1)^*.
$$

**Example 7 (State elimination).** Find a regex for the DFA of [[18-dfa]] Example 1 (strings ending in $1$).

- States: $q_0, q_1$. Start $q_0$, accept $q_1$.
- Transitions: $q_0 \xrightarrow{0} q_0, q_0 \xrightarrow{1} q_1, q_1 \xrightarrow{0} q_0, q_1 \xrightarrow{1} q_1$.

Add new start $s$ and new accept $f$: $s \xrightarrow{\varepsilon} q_0$; $q_1 \xrightarrow{\varepsilon} f$.

Eliminate $q_0$: self-loop $0$. Paths through $q_0$: $s \xrightarrow{\varepsilon} q_0 \xrightarrow{0^* \cdot 1} q_1$, and $q_1 \xrightarrow{0} q_0 \xrightarrow{0^* \cdot 1} q_1$.
- New transition $s \xrightarrow{0^* \cdot 1} q_1$ (absorbing $\varepsilon$).
- New self-loop at $q_1$: $q_1 \xrightarrow{0 \cdot 0^* \cdot 1} q_1$, union with original $1$: $1 + 0 \cdot 0^* \cdot 1 = (1 + 00^* 1) = (\varepsilon + 00^*) \cdot 1 = 0^* \cdot 1$.

So $q_1$ has self-loop $0^* 1$. Eliminate $q_1$: path $s \to q_1 \to f$ with self-loop: $0^* 1 \cdot (0^* 1)^* \cdot \varepsilon = 0^* 1 (0^* 1)^*$.

Simplify: $0^* 1 (0^* 1)^* \equiv 0^* (1 \cdot 0^*)^* \cdot 1 \equiv (0 + 1)^* 1$. ✓

## 20.6 Extended Regex Features (Practice)

In real-world tools (grep, Python's re, PCRE), regex are augmented with:
- **Character classes**: $[a\text{-}z], [0\text{-}9], \backslash d$ for digits.
- **Anchors**: $\hat{}$, $\$$ for line start/end.
- **Quantifiers**: $r^?, r^+, r^{n,m}$.
- **Back-references**: $\backslash 1$ for "match of first group".

With **back-references**, the syntax steps outside regular languages; such patterns can recognize, e.g., $\{w w : w \in \{0, 1\}^*\}$, which is not regular. Theoretical regex (the Kleene-theoretic version) excludes back-references.

## 20.7 Summary

- **Regex** are recursive: $\emptyset, \varepsilon, a, r + s, rs, r^*$.
- Each regex denotes a **regular language**.
- **Kleene's Theorem**: regex expressions = DFA-recognizable languages.
- **Regex → NFA**: Thompson's construction, compositional, yields ε-NFA of size $O(|r|)$.
- **NFA → Regex**: state elimination, always terminates.
- Regex satisfy algebraic identities but **equivalence is PSPACE-complete**.
- Real-world regex (with back-references) go beyond regular languages.

## Related Concepts

- [[18-dfa]] and [[19-nfa-and-enfa]] — the automata equivalents.
- [[21-closure-and-pumping-lemma]] — closure properties of the regex-expressible class.
- [[22-turing-machines-and-computability]] — what lies beyond.

## Sources

- [[raw/Computability_260316_142548]] — regular expressions, Kleene's theorem.
