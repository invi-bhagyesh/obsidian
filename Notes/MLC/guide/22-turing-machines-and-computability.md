---
title: "Turing Machines and Computability"
type: guide
module: "Computability"
file: 22
related: [18-dfa, 19-nfa-and-enfa, 20-regular-expressions-and-kleenes-theorem, 21-closure-and-pumping-lemma, 23-module4-practice-problems]
sources: [Computability_260316_142548]
---

# 22. Turing Machines and Computability

Finite automata recognize the **regular languages** — a small class. To capture "all algorithms" we need a stronger machine: the **Turing machine** (TM), introduced by Alan Turing in 1936. TMs define the class of **decidable** and **recognizable** languages, and via the **Church–Turing thesis** are taken to capture all intuitively computable functions. This chapter gives the TM definition, basic examples, the key theoretical classes, and signposts major undecidability results.

## 22.1 The Turing Machine

> **Definition 22.1 (Turing machine).** A **Turing machine** is a $7$-tuple
> $$
> M = (Q, \Sigma, \Gamma, \delta, q_0, q_\text{accept}, q_\text{reject})
> $$
> where:
> - $Q$ is a finite set of states.
> - $\Sigma$ is the input alphabet (not containing the **blank symbol** $\sqcup$).
> - $\Gamma \supseteq \Sigma$ is the tape alphabet, with $\sqcup \in \Gamma$.
> - $\delta: Q \times \Gamma \to Q \times \Gamma \times \{L, R\}$ is the transition function: on $(q, a)$, write a new symbol, move left or right, transition to a new state.
> - $q_0 \in Q$ is the start state.
> - $q_\text{accept}, q_\text{reject} \in Q$ (distinct) are the accepting/rejecting halting states.

## 22.2 How a TM Computes

- **Tape**: an infinite (in one or both directions) tape divided into cells, each holding a symbol from $\Gamma$.
- **Head**: reads/writes one cell at a time; moves left or right.
- **Initial configuration**: input written on tape, rest blank; head at leftmost symbol; state $q_0$.
- **Step**: read current cell, apply $\delta$: write new symbol, move, new state.
- **Halt**: when entering $q_\text{accept}$ or $q_\text{reject}$.

### Configuration

A configuration is $(q, w, i)$: state $q$, tape contents $w$ (possibly with blanks), head position $i$. Often written $u q v$ where the head is at the first symbol of $v$.

## 22.3 Language of a TM

> **Definition 22.2.** A TM $M$ **accepts** $w$ if, starting from the initial configuration, $M$ eventually reaches $q_\text{accept}$.
> $$
> L(M) = \{w : M \text{ accepts } w\}.
> $$

Three outcomes on input $w$:
- **Accept** ($q_\text{accept}$ reached).
- **Reject** ($q_\text{reject}$ reached).
- **Loop forever** (neither halt state reached).

> **Definition 22.3.**
> - $L$ is **Turing-recognizable** (or **recursively enumerable**, RE) if $L = L(M)$ for some TM $M$ (may loop on strings not in $L$).
> - $L$ is **Turing-decidable** (or **recursive**) if $L = L(M)$ for some TM that **halts on every input** (and accepts iff $w \in L$).

Decidable ⊂ Recognizable ⊂ All languages.

## 22.4 Simple TM Examples

**Example 1.** TM for $L = \{0^n 1^n : n \ge 0\}$.

Algorithm: sweep across the tape, crossing off one $0$ and one $1$ per pass, until all symbols are crossed. Accept if no uncrossed $0$s or $1$s remain.

States:
- $q_0$: start; read first symbol. If $\sqcup$: accept ($\varepsilon$ case). If $0$: cross it (write $X$), move right, go to $q_1$. Else reject.
- $q_1$: scan right past $0$'s and $X$'s and $Y$'s until finding $1$. Cross ($Y$), move left, $q_2$.
- $q_2$: scan left to the last crossed $X$, then move right, $q_0$.
- If in $q_1$ we hit $\sqcup$ before $1$: reject.
- If in $q_0$ we read $Y$ (no more $0$'s), scan right — if all remaining are $Y$ or $\sqcup$, accept; else reject.

**Example 2.** TM for $L = \{w w^R : w \in \{0,1\}^*\}$ (palindromes).

Repeatedly: compare first and last uncrossed symbols. If equal, cross both; else reject. Accept when all crossed.

**Example 3.** TM computing $f(x) = x + 1$ in binary (input is binary number, output is binary of $x+1$).

Scan right to find the rightmost bit; if $0$, flip to $1$ and accept. If $1$, flip to $0$, move left, repeat. If move past leftmost, write $1$ there, accept.

## 22.5 Variants of TM (All Equivalent)

TMs have many variants, all with the same expressive power (any language decidable by one is decidable by another, possibly with polynomial slowdown):

- **Multi-tape TM**: several tapes, each with its own head. Simulated by single-tape with polynomial overhead.
- **Non-deterministic TM (NTM)**: multiple possible transitions. Simulated deterministically with exponential overhead.
- **Two-way infinite tape**: same power.
- **Enumeration machines**: output language by listing its elements.
- **Register machines / RAM**: von Neumann-style. Equivalent.

## 22.6 The Church–Turing Thesis

> **Thesis.** Every effectively computable function (by algorithm) is computable by a Turing machine.

This is a **thesis** (not a theorem) — it asserts an equivalence between an informal concept (effective computation) and a formal one (TM computation). The evidence is overwhelming: every proposed formalism (λ-calculus, recursive functions, μ-recursive, register machines, cellular automata, \dots) turns out equivalent to TMs.

## 22.7 Recognizable vs Decidable vs Beyond

| Class | Machine | Closure properties |
|:------|:--------|:------------------|
| Regular | DFA/NFA | union, intersection, complement |
| Context-free | Pushdown automaton (PDA) | union, concat., star (not intersection or complement) |
| Decidable (recursive) | halting TM | all boolean, closure |
| Recognizable (RE) | TM | union, intersection (not complement) |
| co-RE | $\overline{L}$ is RE | dual |
| $\text{RE} \cap \text{co-RE}$ | = decidable |  |
| All languages |  | everything else |

The classical diagram:
```
Regular ⊂ Context-free ⊂ Decidable ⊂ Recognizable ⊂ All
```
Each inclusion is proper.

## 22.8 The Halting Problem

> **Theorem 22.4 (Halting Problem Undecidability).** The language
> $$
> \text{HALT} = \{\langle M, w \rangle : M \text{ is a TM that halts on input } w\}
> $$
> is **Turing-recognizable** but **not Turing-decidable**.

*Proof by diagonalization.* Assume some TM $H$ decides HALT. Build:
$$
D(\langle M \rangle) = \begin{cases} \text{loop} & \text{if } H(\langle M, \langle M \rangle \rangle) = \text{accept} \\ \text{accept} & \text{if } H(\langle M, \langle M \rangle \rangle) = \text{reject} \end{cases}
$$
$D$ is a TM. What does $D$ do on $\langle D \rangle$?
- If $H$ says $D$ halts on $\langle D \rangle$: then $D$ loops — contradiction.
- If $H$ says $D$ doesn't halt on $\langle D \rangle$: then $D$ accepts (halts) — contradiction.

Either way, contradiction. So $H$ cannot exist. $\blacksquare$

### Consequence: undecidability cascades

Many other problems reduce to HALT and are hence undecidable:
- **$\text{A}_{\text{TM}} = \{\langle M, w \rangle : M \text{ accepts } w\}$** — undecidable.
- **$\text{E}_{\text{TM}} = \{\langle M \rangle : L(M) = \emptyset\}$** — undecidable.
- **Equality of TM languages** $\text{EQ}_{\text{TM}}$ — undecidable.
- **Rice's Theorem**: Any nontrivial semantic property of TMs is undecidable.

## 22.9 Decidable vs Recognizable: Key Asymmetry

> **Theorem 22.5.** $L$ is decidable iff $L$ and $\overline{L}$ are both recognizable.

*Proof.* $(\Rightarrow)$ If $L$ is decidable, swap accept/reject for $\overline{L}$.

$(\Leftarrow)$ Given recognizers $M_1$ for $L$ and $M_2$ for $\overline{L}$: simulate them in parallel. One must eventually accept; declare accordingly. $\blacksquare$

This explains: HALT is recognizable but $\overline{\text{HALT}}$ is not; otherwise HALT would be decidable. So $\overline{\text{HALT}}$ is not recognizable — **complement of a recognizable language may not be recognizable**.

## 22.10 Complexity Hierarchy (Brief)

Turing machines let us define **time** and **space** complexity classes:

- $\text{TIME}(f(n))$: languages decidable by a TM in $O(f(n))$ time.
- $\text{SPACE}(f(n))$: similarly for space.

Key classes:
- $\text{P} = \bigcup_k \text{TIME}(n^k)$ — deterministic polynomial time.
- $\text{NP} = $ languages decidable by an NTM in polynomial time; equivalently, languages with poly-time verifiers.
- $\text{PSPACE}$, $\text{EXPTIME}$, etc.

Major open question: $\text{P} \stackrel{?}{=} \text{NP}$.

## 22.11 Landmark Results

- **Hilbert's Entscheidungsproblem** (1928): is there an algorithm to decide any mathematical statement? Answered **No** by Church–Turing (1936) — undecidability of first-order validity reduces to HALT.
- **Gödel's Incompleteness** (1931): any sufficiently expressive formal system is either inconsistent or incomplete. Uses diagonalization in the style of HALT.
- **Cook–Levin theorem** (1971): SAT is NP-complete. The starting point of complexity theory.

## 22.12 Worked Examples

**Example 4.** Show $A_{\text{TM}} = \{\langle M, w \rangle : M \text{ accepts } w\}$ is recognizable.

*Proof.* Define TM $U$: simulate $M$ on $w$. If $M$ accepts, accept. If $M$ rejects, reject. If $M$ loops, $U$ loops. $U$ accepts exactly $A_{\text{TM}}$. (This $U$ is a **universal Turing machine**, a pivotal construction.) $\blacksquare$

**Example 5.** Show $A_{\text{TM}}$ is not decidable.

*Proof.* Reduce HALT to $A_{\text{TM}}$. Given $\langle M, w \rangle$, build $M'$: on input $x$, simulate $M$ on $w$; if $M$ halts, accept. Then $M'$ accepts $x$ (for any $x$) iff $M$ halts on $w$. So $\langle M, w \rangle \in \text{HALT} \iff \langle M', \varepsilon \rangle \in A_{\text{TM}}$. If $A_{\text{TM}}$ decidable, HALT decidable — contradiction. $\blacksquare$

**Example 6.** Show $\{a^n b^n c^n\}$ is decidable but not context-free.

*Decidability.* Simple TM: verify prefix of $a$'s (count), then $b$'s (match), then $c$'s (match).

*Not context-free.* Pumping lemma for CFLs — beyond our scope, but intuitively the three-way counting exceeds what a PDA can track.

## 22.13 Church–Turing-Deutsch

Modern extension: the **Church–Turing-Deutsch** thesis conjectures that even physically realizable computation (e.g., quantum computing) does not exceed Turing-computability, though **polynomial-time** equivalence is an open question.

## 22.14 Summary

- **TM**: 7-tuple with tape, head, finite control; one-step = read, write, move, change state.
- **Recognizable** (RE): TM may accept, reject, or loop; accept iff $w \in L$.
- **Decidable**: TM halts on every input; accept iff $w \in L$.
- Regular ⊊ CFL ⊊ Decidable ⊊ Recognizable ⊊ All languages.
- **Church–Turing Thesis**: TM captures effective computability.
- **Halting Problem** undecidable (diagonalization); many problems reduce to HALT.
- Decidable = RE ∩ co-RE.
- **Rice's Theorem**: nontrivial semantic TM properties all undecidable.
- Complexity theory sits on top: P, NP, PSPACE, ...
- SAT is NP-complete; TAUT is coNP-complete; FOL validity is undecidable.

## Related Concepts

- [[18-dfa]] — a weaker model (regular languages).
- [[19-nfa-and-enfa]] — NFAs, another regular recognizer.
- [[21-closure-and-pumping-lemma]] — regular/non-regular boundary.
- [[16-interpretations-and-validity]] — FOL validity undecidable (reduces to HALT).

## Sources

- [[raw/Computability_260316_142548]] — TM definition, decidability, halting problem.
