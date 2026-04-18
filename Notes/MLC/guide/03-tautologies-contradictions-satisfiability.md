---
title: "Tautologies, Contradictions, Satisfiability"
type: guide
module: "Propositional Logic"
file: 03
related: [02-wffs-and-truth-tables, 04-logical-equivalence-and-laws, 06-arguments-and-rules-of-inference, 11-soundness-and-completeness]
sources: [Lecture_Notes_on_Propositional_Logic]
---

# 3. Tautologies, Contradictions, Satisfiability

Once every WFF has a truth table ([[02-wffs-and-truth-tables]]), we can classify formulas by the pattern of their final column. This classification is the foundation for everything else in propositional logic — valid arguments ([[06-arguments-and-rules-of-inference]]) are exactly those whose associated implication is a tautology; logical equivalences ([[04-logical-equivalence-and-laws]]) are bidirectional tautologies; completeness of axiomatic systems ([[11-soundness-and-completeness]]) says the syntactic provable formulas are exactly the semantic tautologies.

## 3.1 Three Classes of Formulas

> **Definition 3.1.** Let $\alpha$ be a WFF.
>
> - $\alpha$ is a **tautology** (or **valid**) if $\bar v(\alpha) = \mathbf{T}$ under every valuation $v$. Written $\models \alpha$.
> - $\alpha$ is a **contradiction** (or **unsatisfiable**) if $\bar v(\alpha) = \mathbf{F}$ under every valuation. Written $\models \neg\alpha$.
> - $\alpha$ is a **contingency** if it is neither: some valuations satisfy it, others do not.

Equivalently, using truth tables: a tautology has an all-$\mathbf{T}$ final column, a contradiction has an all-$\mathbf{F}$ column, a contingency has both.

**Example 1.** Classify:
- $(a)$ $p \vee \neg p$ (**law of excluded middle**) — tautology.
- $(b)$ $p \wedge \neg p$ — contradiction.
- $(c)$ $p \to q$ — contingency.
- $(d)$ $p \to p$ — tautology.
- $(e)$ $((p \to q) \wedge p) \to q$ (**modus ponens**) — tautology (see Example 5).
- $(f)$ $(p \to q) \wedge (p \wedge \neg q)$ — contradiction.

## 3.2 Satisfiability

> **Definition 3.2 (Satisfiability).** A WFF $\alpha$ is **satisfiable** if some valuation $v$ satisfies it ($v \models \alpha$). It is **unsatisfiable** if no valuation satisfies it — i.e., $\alpha$ is a contradiction.

*Summary of relationships:*

| Class | All rows | Some row | No row |
|:------|:--------:|:--------:|:------:|
| Tautology | T | — | — |
| Contradiction | — | — | T (no row is T) |
| Satisfiable | — | T | — |
| Contingency | — | T (some T) | — (some F) |

- Every tautology is satisfiable.
- Satisfiable ≠ tautology (contingencies are satisfiable but not tautologies).
- $\alpha$ is a tautology iff $\neg \alpha$ is a contradiction.
- $\alpha$ is satisfiable iff $\neg \alpha$ is not a tautology.

The **SAT problem** asks: given $\alpha$, is it satisfiable? This is the first problem proven NP-complete (Cook–Levin theorem).

## 3.3 Standard Tautologies

Here are the most important tautologies in propositional logic. Each can be verified by truth table; each will be used repeatedly.

### Single-variable / self-evident

- $p \to p$ (identity)
- $p \vee \neg p$ (excluded middle)
- $\neg(p \wedge \neg p)$ (non-contradiction)
- $p \leftrightarrow p$
- $\neg\neg p \leftrightarrow p$ (double negation)

### Two-variable

- $p \to (q \to p)$ (axiom A1, [[08-axiomatic-propositional-calculus]])
- $(p \wedge q) \to p$ (simplification, left)
- $(p \wedge q) \to q$ (simplification, right)
- $p \to (p \vee q)$ (addition)
- $q \to (p \vee q)$
- $(p \to q) \leftrightarrow (\neg p \vee q)$ (implication as or)
- $(p \to q) \leftrightarrow (\neg q \to \neg p)$ (contrapositive)
- $\neg(p \wedge q) \leftrightarrow (\neg p \vee \neg q)$ (De Morgan)
- $\neg(p \vee q) \leftrightarrow (\neg p \wedge \neg q)$ (De Morgan)

### Three-variable / classic arguments

- $((p \to q) \wedge (q \to r)) \to (p \to r)$ (hypothetical syllogism)
- $(p \to (q \to r)) \leftrightarrow ((p \wedge q) \to r)$ (exportation/importation)
- $((p \vee q) \wedge \neg p) \to q$ (disjunctive syllogism)
- $(p \wedge (q \vee r)) \leftrightarrow ((p \wedge q) \vee (p \wedge r))$ (distributivity)
- $(p \to q) \to ((q \to r) \to (p \to r))$
- $((p \to r) \wedge (q \to r)) \to ((p \vee q) \to r)$ (proof by cases)

**Example 2.** Verify by truth table that $((p \to q) \wedge p) \to q$ is a tautology (this is **modus ponens**).

*Solution.*
$$
\begin{array}{cc|c|c|c}
p & q & p \to q & (p \to q) \wedge p & ((p \to q) \wedge p) \to q \\ \hline
\mathbf{T} & \mathbf{T} & \mathbf{T} & \mathbf{T} & \mathbf{T} \\
\mathbf{T} & \mathbf{F} & \mathbf{F} & \mathbf{F} & \mathbf{T} \\
\mathbf{F} & \mathbf{T} & \mathbf{T} & \mathbf{F} & \mathbf{T} \\
\mathbf{F} & \mathbf{F} & \mathbf{T} & \mathbf{F} & \mathbf{T}
\end{array}
$$
Final column is uniformly $\mathbf{T}$. $\blacksquare$

## 3.4 Properties and Closure

> **Proposition 3.3.** The class of tautologies is closed under:
> - **Modus Ponens.** If $\models \alpha$ and $\models \alpha \to \beta$, then $\models \beta$.
> - **Substitution.** If $\models \alpha(p)$ (tautology using variable $p$), then $\models \alpha(\gamma / p)$ for any WFF $\gamma$ substituted uniformly for $p$.

*Proof of Modus Ponens closure.* Let $v$ be any valuation. Since $\models \alpha$, $\bar v(\alpha) = \mathbf{T}$. Since $\models \alpha \to \beta$, $\bar v(\alpha \to \beta) = \mathbf{T}$. By the truth table of $\to$, the only way to have $\alpha = \mathbf{T}$ and $\alpha \to \beta = \mathbf{T}$ is $\beta = \mathbf{T}$. So $\bar v(\beta) = \mathbf{T}$ for arbitrary $v$, hence $\models \beta$. $\blacksquare$

*Substitution closure* follows by induction on the formula: substituting everywhere preserves "true under every valuation" because every valuation after substitution corresponds to some valuation before.

**Consequence.** Instances of tautologies are tautologies. E.g., $p \to p$ is a tautology; so is $((a \wedge b) \to c) \to ((a \wedge b) \to c)$ obtained by substituting $((a \wedge b) \to c)$ for $p$.

## 3.5 Entailment

Tautology is a 1-place concept (a formula is or isn't a tautology). We also want a **relational** concept:

> **Definition 3.4 (Semantic entailment).** Let $\Gamma$ be a set of WFFs and $\alpha$ a WFF. We say $\Gamma$ **semantically entails** $\alpha$, written $\Gamma \models \alpha$, if every valuation that satisfies all formulas in $\Gamma$ also satisfies $\alpha$.

- When $\Gamma = \emptyset$, $\emptyset \models \alpha$ iff every valuation satisfies $\alpha$, i.e., iff $\alpha$ is a tautology. We often write just $\models \alpha$.
- $\{p, p \to q\} \models q$ (modus ponens).
- $\{p \to q, q \to r\} \models p \to r$ (hypothetical syllogism).

> **Theorem 3.5 (Deduction-style equivalence).** $\Gamma \cup \{\alpha\} \models \beta$ iff $\Gamma \models \alpha \to \beta$.

*Proof.* ($\Rightarrow$) Suppose $v$ satisfies all of $\Gamma$. If $v \models \alpha$, then $v \models \beta$ by hypothesis, so $v \models \alpha \to \beta$. If $v \not\models \alpha$, then $\alpha \to \beta$ is vacuously true under $v$. Either way, $v \models \alpha \to \beta$.

($\Leftarrow$) Suppose $v$ satisfies $\Gamma \cup \{\alpha\}$. Then $v \models \alpha \to \beta$ by hypothesis; combined with $v \models \alpha$, modus ponens gives $v \models \beta$. $\blacksquare$

This semantic deduction theorem is the shadow of the syntactic **Deduction Theorem** ([[10-deduction-theorem]]).

## 3.6 Decidability of Propositional Logic

> **Theorem 3.6.** The following are decidable (computable in finite time) for any WFF $\alpha$:
> - whether $\alpha$ is a tautology;
> - whether $\alpha$ is satisfiable;
> - whether $\alpha$ is a contradiction;
> - whether $\alpha \equiv \beta$ for another WFF $\beta$.

*Proof.* Build the truth table for $\alpha$ (or $\alpha \leftrightarrow \beta$). With $n$ variables this has $2^n$ rows — finite. Inspect the final column. $\blacksquare$

*Complexity caveat.* "Decidable" and "efficient" are different. Truth-table construction is exponential in $n$, and the SAT problem is NP-complete. In [[22-turing-machines-and-computability]] we distinguish decidability from polynomial-time decidability.

## 3.7 Worked Examples

**Example 3.** Is $(p \to q) \vee (q \to p)$ a tautology?

*Solution.*
$$
\begin{array}{cc|c|c|c}
p & q & p \to q & q \to p & (p \to q) \vee (q \to p) \\ \hline
\mathbf{T} & \mathbf{T} & \mathbf{T} & \mathbf{T} & \mathbf{T} \\
\mathbf{T} & \mathbf{F} & \mathbf{F} & \mathbf{T} & \mathbf{T} \\
\mathbf{F} & \mathbf{T} & \mathbf{T} & \mathbf{F} & \mathbf{T} \\
\mathbf{F} & \mathbf{F} & \mathbf{T} & \mathbf{T} & \mathbf{T}
\end{array}
$$
Yes — tautology. (Known as the **linearity of implication**.) $\blacksquare$

**Example 4.** Is $(p \to q) \to (p \wedge q)$ a tautology?

*Solution.* Look for a falsifying row. The formula is false iff $p \to q$ is true but $p \wedge q$ is false. Take $p = \mathbf{F}, q = \mathbf{F}$: then $p \to q = \mathbf{T}$ but $p \wedge q = \mathbf{F}$, so the implication is $\mathbf{F}$.

$\Rightarrow$ Not a tautology. $\blacksquare$

**Example 5.** Prove $\models ((p \to q) \wedge (p \to \neg q)) \to \neg p$.

*Solution.* Suppose for a valuation $v$ that $(p \to q) \wedge (p \to \neg q) = \mathbf{T}$. Then both $p \to q$ and $p \to \neg q$ are true. If $p = \mathbf{T}$, MP gives $q = \mathbf{T}$ and $\neg q = \mathbf{T}$, impossible. So $p = \mathbf{F}$, hence $\neg p = \mathbf{T}$. This is the semantic version of **reductio ad absurdum**. $\blacksquare$

**Example 6.** Is $\{p \to q, q \to r, \neg r\} \models \neg p$?

*Solution.* Suppose $v$ satisfies all three premises. From $\neg r$, $r = \mathbf{F}$. From $q \to r$ with $r = \mathbf{F}$, we get $q = \mathbf{F}$. From $p \to q$ with $q = \mathbf{F}$, we get $p = \mathbf{F}$, so $\neg p = \mathbf{T}$. Hence $\{p \to q, q \to r, \neg r\} \models \neg p$. $\blacksquare$

## 3.8 Why Tautologies Matter

**Arguments.** An argument with premises $\alpha_1, \dots, \alpha_k$ and conclusion $\beta$ is **valid** iff $(\alpha_1 \wedge \dots \wedge \alpha_k) \to \beta$ is a tautology, equivalently iff $\{\alpha_1, \dots, \alpha_k\} \models \beta$ (see [[06-arguments-and-rules-of-inference]]).

**Equivalences.** $\alpha \equiv \beta$ iff $\alpha \leftrightarrow \beta$ is a tautology (see [[04-logical-equivalence-and-laws]]).

**Axiomatics.** The Hilbert-style calculus of [[08-axiomatic-propositional-calculus]] designates three tautology schemes as axioms; completeness ([[11-soundness-and-completeness]]) says the derivable formulas are exactly the tautologies.

**Computability.** The SAT problem (existence of a satisfying valuation) is the canonical NP-complete problem ([[22-turing-machines-and-computability]]).

## 3.9 Summary

- **Tautology / contradiction / contingency** classify WFFs by truth-table pattern.
- $\alpha$ **satisfiable** = some row is T; $\alpha$ **tautology** = all rows are T; $\alpha$ **unsatisfiable** = $\alpha$ is a contradiction.
- Tautologies are closed under **Modus Ponens** and **uniform substitution**.
- **Semantic entailment** $\Gamma \models \alpha$: every model of $\Gamma$ is a model of $\alpha$.
- **Semantic Deduction**: $\Gamma, \alpha \models \beta \iff \Gamma \models \alpha \to \beta$.
- Propositional logic is **decidable** via truth tables; **SAT** is NP-complete.

## Related Concepts

- [[02-wffs-and-truth-tables]] — truth-table construction.
- [[04-logical-equivalence-and-laws]] — tautologies of the form $\alpha \leftrightarrow \beta$.
- [[06-arguments-and-rules-of-inference]] — validity via tautology.
- [[11-soundness-and-completeness]] — matching tautologies to formal provability.

## Sources

- [[raw/Lecture_Notes_on_Propositional_Logic]] — classification, tautologies (Chapter 4).
