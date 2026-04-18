---
title: "Module 1 Practice Problems (Propositional Logic)"
type: guide
module: "Propositional Logic"
file: 07
related: [01-propositions-connectives-truth-values, 02-wffs-and-truth-tables, 03-tautologies-contradictions-satisfiability, 04-logical-equivalence-and-laws, 05-normal-forms-cnf-dnf, 06-arguments-and-rules-of-inference]
sources: [Lecture_Notes_on_Propositional_Logic]
---

# 7. Module 1 Practice Problems (Propositional Logic)

This chapter gathers worked problems testing the material of files 01–06: connective evaluation, truth-table construction, classification, equivalence, normal forms, and argument validity. Every problem is worked; solutions are collected at the end.

## 7.1 Part A — Translation and Evaluation

**Problem 1.** Let $p$ = "Alice passed", $q$ = "Bob passed", $r$ = "Carol passed". Translate:
- $(a)$ "Alice and Bob passed, but Carol did not."
- $(b)$ "Either Alice or Carol passed, but not both."
- $(c)$ "If Alice passed, then so did Bob and Carol."
- $(d)$ "Alice passed iff neither Bob nor Carol did."

**Problem 2.** Evaluate $(p \to q) \leftrightarrow (\neg p \vee q)$ at $p = \mathbf{T}, q = \mathbf{F}$.

**Problem 3.** Give English readings of:
- $(a)$ $\neg(p \to q)$
- $(b)$ $(p \vee q) \wedge \neg(p \wedge q)$
- $(c)$ $p \to (q \to p)$

## 7.2 Part B — Truth Tables and Classification

**Problem 4.** Classify as tautology / contradiction / contingency:
- $(a)$ $(p \to q) \vee (q \to p)$
- $(b)$ $(p \wedge \neg q) \wedge (\neg p \vee q)$
- $(c)$ $p \to (p \vee q)$
- $(d)$ $(p \wedge q) \to (p \vee q)$
- $(e)$ $(p \vee q) \to (p \wedge q)$
- $(f)$ $(p \to q) \wedge (p \wedge \neg q)$
- $(g)$ $((p \to q) \wedge (\neg p \to q)) \to q$

**Problem 5.** Build the truth table for $(p \to q) \to ((q \to r) \to (p \to r))$.

**Problem 6.** How many rows does the truth table of a WFF in $5$ distinct variables have? In $10$?

## 7.3 Part C — Equivalences and Laws

**Problem 7.** Simplify using laws (no truth tables):
- $(a)$ $(p \vee q) \wedge (p \vee \neg q)$
- $(b)$ $\neg(p \vee (\neg p \wedge q))$
- $(c)$ $(p \wedge q) \vee (p \wedge \neg q) \vee (\neg p \wedge q)$
- $(d)$ $\neg(p \to q) \wedge \neg(\neg p \to \neg q)$

**Problem 8.** Prove tautology by equivalence (reduce to $\top$):
- $(a)$ $p \to (q \to p)$
- $(b)$ $(p \to q) \to ((\neg p \to q) \to q)$

**Problem 9.** Show $(p \to q) \to r$ is **not** equivalent to $p \to (q \to r)$ via a counterexample.

**Problem 10.** Prove $(p \to r) \wedge (q \to r) \equiv (p \vee q) \to r$ using laws.

## 7.4 Part D — Normal Forms

**Problem 11.** Convert to CNF:
- $(a)$ $p \to (q \wedge r)$
- $(b)$ $\neg(p \wedge (q \vee \neg r))$
- $(c)$ $(p \leftrightarrow q) \vee r$

**Problem 12.** Convert to DNF:
- $(a)$ $(p \vee q) \wedge (r \vee \neg s)$
- $(b)$ $p \to (q \to r)$

**Problem 13.** Read off canonical DNF and CNF from the truth table of $p \oplus q \oplus r$ (exclusive-or of three variables — true iff an odd number of inputs are true).

## 7.5 Part E — Arguments

**Problem 14.** Determine validity; give a proof if valid, a counterexample if not:
- $(a)$ $\{p \to q, q \to r\} \vdash p \to r$
- $(b)$ $\{p \to q, q\} \vdash p$
- $(c)$ $\{p \vee q, \neg p \vee r, \neg q \vee r\} \vdash r$
- $(d)$ $\{p \to (q \vee r), \neg q, \neg r\} \vdash \neg p$
- $(e)$ $\{p \to q, r \to s, \neg q \vee \neg s\} \vdash \neg p \vee \neg r$

**Problem 15.** Give a formal proof of $\{p \to q, q \to r, \neg r\} \vdash \neg p$.

**Problem 16.** Give a formal proof using resolution of $\vdash (p \to q) \to (\neg q \to \neg p)$.

---

## Solutions

**Problem 1.**
- $(a)$ $(p \wedge q) \wedge \neg r$.
- $(b)$ $(p \vee r) \wedge \neg(p \wedge r)$, equivalently $p \oplus r$.
- $(c)$ $p \to (q \wedge r)$.
- $(d)$ $p \leftrightarrow (\neg q \wedge \neg r)$.

**Problem 2.** $p \to q = \mathbf{T} \to \mathbf{F} = \mathbf{F}$. $\neg p \vee q = \mathbf{F} \vee \mathbf{F} = \mathbf{F}$. Both are $\mathbf{F}$, so $\mathbf{F} \leftrightarrow \mathbf{F} = \mathbf{T}$. $\boxed{\mathbf{T}}$.

**Problem 3.**
- $(a)$ "$p$ but not $q$" / "$p$ holds and $q$ fails" (equivalent to $p \wedge \neg q$).
- $(b)$ "$p$ or $q$ but not both" / "exactly one of $p, q$".
- $(c)$ "If $p$ then ($q$ implies $p$)" — trivially true (a tautology, Axiom A1).

**Problem 4.**
- $(a)$ Tautology. (Already shown in [[03-tautologies-contradictions-satisfiability]] Example 3.)
- $(b)$ Contradiction. $(p \wedge \neg q)$ sets $p=\mathbf{T}, q=\mathbf{F}$, but then $\neg p \vee q = \mathbf{F}$. So always $\mathbf{F}$.
- $(c)$ Tautology (Addition rule, in implicational form).
- $(d)$ Tautology. If $p \wedge q = \mathbf{T}$, then $p=q=\mathbf{T}$, so $p \vee q = \mathbf{T}$. Antecedent-false case: vacuously true.
- $(e)$ Contingency. True when $p=q=\mathbf{T}$ or when $p \vee q = \mathbf{F}$; false e.g. at $p=\mathbf{T},q=\mathbf{F}$.
- $(f)$ Contradiction. $p \wedge \neg q$ forces $p=\mathbf{T}, q=\mathbf{F}$, but then $p \to q = \mathbf{F}$.
- $(g)$ Tautology. Case $p$: from $p \to q$ infer $q$. Case $\neg p$: from $\neg p \to q$ infer $q$. Either way $q$.

**Problem 5.** Eight rows; final column:
$$
\begin{array}{ccc|c|c|c|c}
p & q & r & p \to q & q \to r & p \to r & \text{Formula} \\ \hline
\mathbf{T} & \mathbf{T} & \mathbf{T} & \mathbf{T} & \mathbf{T} & \mathbf{T} & \mathbf{T} \\
\mathbf{T} & \mathbf{T} & \mathbf{F} & \mathbf{T} & \mathbf{F} & \mathbf{F} & \mathbf{T} \\
\mathbf{T} & \mathbf{F} & \mathbf{T} & \mathbf{F} & \mathbf{T} & \mathbf{T} & \mathbf{T} \\
\mathbf{T} & \mathbf{F} & \mathbf{F} & \mathbf{F} & \mathbf{T} & \mathbf{F} & \mathbf{T} \\
\mathbf{F} & \mathbf{T} & \mathbf{T} & \mathbf{T} & \mathbf{T} & \mathbf{T} & \mathbf{T} \\
\mathbf{F} & \mathbf{T} & \mathbf{F} & \mathbf{T} & \mathbf{F} & \mathbf{T} & \mathbf{T} \\
\mathbf{F} & \mathbf{F} & \mathbf{T} & \mathbf{T} & \mathbf{T} & \mathbf{T} & \mathbf{T} \\
\mathbf{F} & \mathbf{F} & \mathbf{F} & \mathbf{T} & \mathbf{T} & \mathbf{T} & \mathbf{T}
\end{array}
$$
All $\mathbf{T}$ — tautology (this is in fact axiom A2 wrapped in an application of hypothetical syllogism).

**Problem 6.** $2^5 = 32$; $2^{10} = 1024$.

**Problem 7.**
- $(a)$ $(p \vee q) \wedge (p \vee \neg q) \equiv p \vee (q \wedge \neg q) \equiv p \vee \bot \equiv p$. $\boxed{p}$.
- $(b)$ $\neg(p \vee (\neg p \wedge q)) \equiv \neg p \wedge \neg(\neg p \wedge q) \equiv \neg p \wedge (p \vee \neg q) \equiv (\neg p \wedge p) \vee (\neg p \wedge \neg q) \equiv \bot \vee (\neg p \wedge \neg q) \equiv \neg p \wedge \neg q$. $\boxed{\neg p \wedge \neg q}$.
- $(c)$ $(p \wedge q) \vee (p \wedge \neg q) \vee (\neg p \wedge q) \equiv p \vee (\neg p \wedge q) \equiv (p \vee \neg p) \wedge (p \vee q) \equiv \top \wedge (p \vee q) \equiv p \vee q$. $\boxed{p \vee q}$.
- $(d)$ $\neg(p \to q) \equiv p \wedge \neg q$; $\neg(\neg p \to \neg q) \equiv \neg p \wedge q$. Conjunction: $(p \wedge \neg q) \wedge (\neg p \wedge q) \equiv \bot$. $\boxed{\bot}$.

**Problem 8.**
- $(a)$ $p \to (q \to p) \equiv \neg p \vee (\neg q \vee p) \equiv (\neg p \vee p) \vee \neg q \equiv \top \vee \neg q \equiv \top$.
- $(b)$ Let $\varphi = (p \to q) \to ((\neg p \to q) \to q)$. Write as $\neg(p \to q) \vee \neg(\neg p \to q) \vee q$ $\equiv (p \wedge \neg q) \vee (\neg p \wedge \neg q) \vee q$. Factor the first two: $(p \vee \neg p) \wedge \neg q = \top \wedge \neg q = \neg q$. So $\varphi \equiv \neg q \vee q \equiv \top$.

**Problem 9.** Take $p = \mathbf{F}, q = \mathbf{T}, r = \mathbf{F}$. Then $p \to q = \mathbf{T}$, $(p \to q) \to r = \mathbf{F}$. And $q \to r = \mathbf{F}$, $p \to (q \to r) = \mathbf{T}$. Different values. $\blacksquare$

**Problem 10.** $(p \to r) \wedge (q \to r) \equiv (\neg p \vee r) \wedge (\neg q \vee r) \equiv r \vee (\neg p \wedge \neg q) \equiv r \vee \neg(p \vee q) \equiv \neg(p \vee q) \vee r \equiv (p \vee q) \to r$. $\blacksquare$

**Problem 11.**
- $(a)$ $p \to (q \wedge r) \equiv \neg p \vee (q \wedge r) \equiv (\neg p \vee q) \wedge (\neg p \vee r)$. $\boxed{(\neg p \vee q) \wedge (\neg p \vee r)}$.
- $(b)$ $\neg(p \wedge (q \vee \neg r)) \equiv \neg p \vee \neg(q \vee \neg r) \equiv \neg p \vee (\neg q \wedge r) \equiv (\neg p \vee \neg q) \wedge (\neg p \vee r)$. $\boxed{(\neg p \vee \neg q) \wedge (\neg p \vee r)}$.
- $(c)$ $(p \leftrightarrow q) \vee r \equiv ((p \to q) \wedge (q \to p)) \vee r \equiv ((\neg p \vee q) \wedge (\neg q \vee p)) \vee r \equiv (\neg p \vee q \vee r) \wedge (\neg q \vee p \vee r)$. $\boxed{(\neg p \vee q \vee r) \wedge (p \vee \neg q \vee r)}$.

**Problem 12.**
- $(a)$ $(p \vee q) \wedge (r \vee \neg s) \equiv (p \wedge r) \vee (p \wedge \neg s) \vee (q \wedge r) \vee (q \wedge \neg s)$. $\boxed{(p \wedge r) \vee (p \wedge \neg s) \vee (q \wedge r) \vee (q \wedge \neg s)}$.
- $(b)$ $p \to (q \to r) \equiv \neg p \vee \neg q \vee r$. This is already DNF (three length-1 terms with literals only): $\neg p \vee \neg q \vee r$. $\boxed{}$

**Problem 13.** Truth table of $p \oplus q \oplus r$ (true iff odd number of $\mathbf{T}$):
$$
\begin{array}{ccc|c}
p & q & r & \alpha \\ \hline
\mathbf{T} & \mathbf{T} & \mathbf{T} & \mathbf{T} \\
\mathbf{T} & \mathbf{T} & \mathbf{F} & \mathbf{F} \\
\mathbf{T} & \mathbf{F} & \mathbf{T} & \mathbf{F} \\
\mathbf{T} & \mathbf{F} & \mathbf{F} & \mathbf{T} \\
\mathbf{F} & \mathbf{T} & \mathbf{T} & \mathbf{F} \\
\mathbf{F} & \mathbf{T} & \mathbf{F} & \mathbf{T} \\
\mathbf{F} & \mathbf{F} & \mathbf{T} & \mathbf{T} \\
\mathbf{F} & \mathbf{F} & \mathbf{F} & \mathbf{F}
\end{array}
$$

*Canonical DNF* (rows 1, 4, 6, 7):
$$
(p \wedge q \wedge r) \vee (p \wedge \neg q \wedge \neg r) \vee (\neg p \wedge q \wedge \neg r) \vee (\neg p \wedge \neg q \wedge r).
$$

*Canonical CNF* (rows 2, 3, 5, 8):
$$
(\neg p \vee \neg q \vee r) \wedge (\neg p \vee q \vee \neg r) \wedge (p \vee \neg q \vee \neg r) \wedge (p \vee q \vee r).
$$

**Problem 14.**
- $(a)$ Valid. Proof: HS on the two premises gives $p \to r$. $\blacksquare$
- $(b)$ Invalid. Counterexample: $p = \mathbf{F}, q = \mathbf{T}$.
- $(c)$ Valid. Proof by cases on $p \vee q$. Case $p$: from $\neg p \vee r$, since $\neg p$ is false, $r$. Case $q$: from $\neg q \vee r$, $r$.
- $(d)$ Valid. From $\neg q$ and $\neg r$: $\neg q \wedge \neg r = \neg(q \vee r)$. Then MT on $p \to (q \vee r)$ gives $\neg p$.
- $(e)$ Valid. Suppose $\neg q \vee \neg s$. Contrapositives of the first two premises: $\neg q \to \neg p$, $\neg s \to \neg r$. Constructive dilemma yields $\neg p \vee \neg r$.

**Problem 15.** $\{p \to q, q \to r, \neg r\} \vdash \neg p$.
$$
\begin{array}{lll}
1. & p \to q & \text{premise} \\
2. & q \to r & \text{premise} \\
3. & \neg r & \text{premise} \\
4. & p \to r & \text{HS on 1, 2} \\
5. & \neg p & \text{MT on 4, 3}
\end{array}
$$
$\blacksquare$

**Problem 16.** $\vdash (p \to q) \to (\neg q \to \neg p)$.

*Resolution refutation.* Negate goal: $\neg((p \to q) \to (\neg q \to \neg p)) \equiv (p \to q) \wedge \neg(\neg q \to \neg p) \equiv (\neg p \vee q) \wedge \neg q \wedge p$. So CNF clauses:
$$
C_1 = \neg p \vee q, \quad C_2 = \neg q, \quad C_3 = p.
$$

Resolve $C_1$ and $C_3$ on $p$: $q$. Resolve this with $C_2$ on $q$: $\bot$. Empty clause $\Rightarrow$ the assumed negation is unsatisfiable $\Rightarrow$ original is valid. $\blacksquare$

---

## Summary

- **Translation**: watch for "only if" (reverses), "unless" ($\vee$), "but" ($\wedge$).
- **Classification**: tautology (all T), contradiction (all F), contingency.
- **Equivalence simplification**: combine distributive + negation + absorption repeatedly.
- **CNF/DNF**: eliminate $\leftrightarrow, \to$, push $\neg$ inward, distribute.
- **Argument proof**: use MP, MT, HS, DS, Conj, Simp, CD, Resolution, conditional proof.
- **Invalidity**: exhibit one valuation making premises T and conclusion F.

## Related Concepts

- [[01-propositions-connectives-truth-values]] through [[06-arguments-and-rules-of-inference]] — all Module 1 chapters.
- [[08-axiomatic-propositional-calculus]] — axiomatic successor to rule-based proofs.

## Sources

- [[raw/Lecture_Notes_on_Propositional_Logic]].
