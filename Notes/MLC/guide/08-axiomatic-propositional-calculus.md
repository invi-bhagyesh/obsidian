---
title: "Axiomatic Propositional Calculus"
type: guide
module: "Propositional Calculus"
file: 08
related: [06-arguments-and-rules-of-inference, 09-formal-proofs-and-modus-ponens, 10-deduction-theorem, 11-soundness-and-completeness]
sources: [Lecture_Notes_2__on_Propositional_Calculus]
---

# 8. Axiomatic Propositional Calculus

Module 1 was **semantics**: truth tables, satisfaction, entailment. Module 2 is **syntax**: what can be *derived* by manipulating symbols, independent of any truth assignment. The standard formal system is the **Hilbert-style propositional calculus** — a small set of axioms together with a single inference rule, Modus Ponens. The punchline of the module is that the two worlds agree: a formula is derivable iff it is a tautology (Soundness + Completeness, [[11-soundness-and-completeness]]).

## 8.1 Formal Language

We restrict the connectives to $\{\neg, \to\}$; the others are abbreviations. This is for economy — proofs are shorter with fewer rules. The other connectives are **defined**:

$$
\alpha \vee \beta :\equiv \neg\alpha \to \beta
$$
$$
\alpha \wedge \beta :\equiv \neg(\alpha \to \neg\beta)
$$
$$
\alpha \leftrightarrow \beta :\equiv (\alpha \to \beta) \wedge (\beta \to \alpha)
$$

WFFs are built from propositional variables using only $\neg$ and $\to$ (with parentheses).

## 8.2 The System $\mathcal{L}$: Axioms

> **Axiom Schemes.** For any WFFs $\alpha, \beta, \gamma$:
>
> **(A1)** $\alpha \to (\beta \to \alpha)$
>
> **(A2)** $(\alpha \to (\beta \to \gamma)) \to ((\alpha \to \beta) \to (\alpha \to \gamma))$
>
> **(A3)** $(\neg\beta \to \neg\alpha) \to ((\neg\beta \to \alpha) \to \beta)$

These are **schemes**: each scheme represents infinitely many axioms, one for every substitution of WFFs for $\alpha, \beta, \gamma$.

### Reading the axioms

- **(A1)** — "a true proposition is implied by anything". (This is exactly the tautology we proved by truth table in [[02-wffs-and-truth-tables]] Example 5.)
- **(A2)** — **implicational distributivity**. Allows us to "distribute" a hypothesis over a chain of implications.
- **(A3)** — the **reductio ad absurdum** mechanism: if $\neg\beta$ implies both $\neg\alpha$ and $\alpha$, then $\beta$.

Each axiom scheme is a **tautology** (checkable by truth table). This observation is the basis of **soundness** ([[11-soundness-and-completeness]]).

## 8.3 Rule of Inference: Modus Ponens

The system has **one** inference rule:

> **Modus Ponens (MP).** From $\alpha$ and $\alpha \to \beta$, infer $\beta$.

That's it. No other inference rule. Everything else — every other tautology, every other inference — must be **derived** from A1, A2, A3 and MP alone.

*Remark.* Many equivalent Hilbert-style systems exist — some with more axioms, some with rules other than MP. Ours is among the most economical.

## 8.4 Formal Proofs (Derivations)

> **Definition 8.1 (Formal Proof).** A **formal proof** of $\alpha$ from a set $\Gamma$ of WFFs is a finite sequence
> $$
> \alpha_1, \alpha_2, \dots, \alpha_n \quad (\alpha_n = \alpha)
> $$
> such that each $\alpha_i$ is either:
> - an **axiom** (instance of A1, A2, or A3);
> - a member of $\Gamma$ (a **hypothesis** or **premise**); or
> - obtained from two earlier $\alpha_j, \alpha_k$ ($j, k < i$) by **Modus Ponens** (so $\alpha_k$ has the form $\alpha_j \to \alpha_i$).

If such a proof exists, we write $\Gamma \vdash \alpha$ and say "$\alpha$ is **derivable** (or **provable**) from $\Gamma$". When $\Gamma = \emptyset$ we write simply $\vdash \alpha$ and call $\alpha$ a **theorem**.

*Annotation convention.* Each line is annotated with its justification: "axiom A1", "hypothesis", or "MP i, j" where $\alpha_j = \alpha_i \to \alpha_k$.

## 8.5 Elementary Properties

> **Proposition 8.2.** The derivability relation $\vdash$ satisfies:
>
> $(a)$ **Reflexivity.** $\alpha \in \Gamma \Rightarrow \Gamma \vdash \alpha$.
>
> $(b)$ **Monotonicity.** If $\Gamma \subseteq \Delta$ and $\Gamma \vdash \alpha$, then $\Delta \vdash \alpha$.
>
> $(c)$ **Transitivity (Cut).** If $\Gamma \vdash \alpha$ and $\Delta \cup \{\alpha\} \vdash \beta$, then $\Gamma \cup \Delta \vdash \beta$.
>
> $(d)$ **Compactness of derivation.** If $\Gamma \vdash \alpha$, there is a **finite** $\Gamma_0 \subseteq \Gamma$ with $\Gamma_0 \vdash \alpha$.

*Proofs.* $(a), (b)$ are immediate from the definition. $(c)$ concatenate proofs. $(d)$ a proof is finite, so it uses finitely many hypotheses. $\blacksquare$

## 8.6 The First Theorem: $\vdash \alpha \to \alpha$

The famous "warm-up" derivation establishes the simplest non-axiom theorem.

> **Theorem 8.3.** $\vdash \alpha \to \alpha$ for every WFF $\alpha$.

*Proof.* We exhibit a formal proof.
$$
\begin{array}{lll}
1. & \alpha \to ((\alpha \to \alpha) \to \alpha) & \text{A1 with } \beta := \alpha \to \alpha \\
2. & (\alpha \to ((\alpha \to \alpha) \to \alpha)) \to ((\alpha \to (\alpha \to \alpha)) \to (\alpha \to \alpha)) & \text{A2 with } \beta := \alpha \to \alpha, \gamma := \alpha \\
3. & (\alpha \to (\alpha \to \alpha)) \to (\alpha \to \alpha) & \text{MP 1, 2} \\
4. & \alpha \to (\alpha \to \alpha) & \text{A1 with } \beta := \alpha \\
5. & \alpha \to \alpha & \text{MP 4, 3}
\end{array}
$$
$\blacksquare$

*Why this proof is instructive.* Without the Deduction Theorem ([[10-deduction-theorem]]), even $\vdash \alpha \to \alpha$ requires careful axiom juggling. The Deduction Theorem will make such proofs mechanical — but proving *it* requires precisely this level of manipulation.

## 8.7 Interpreting the Axioms Semantically

Each axiom scheme is a tautology — each derivable formula is therefore a tautology (by soundness).

*Verification by truth table:*

**A1** $\alpha \to (\beta \to \alpha)$:
$$
\begin{array}{cc|c|c}
\alpha & \beta & \beta \to \alpha & \alpha \to (\beta \to \alpha) \\ \hline
\mathbf{T} & \mathbf{T} & \mathbf{T} & \mathbf{T} \\
\mathbf{T} & \mathbf{F} & \mathbf{T} & \mathbf{T} \\
\mathbf{F} & \mathbf{T} & \mathbf{F} & \mathbf{T} \\
\mathbf{F} & \mathbf{F} & \mathbf{T} & \mathbf{T}
\end{array}
$$

**A2** $(\alpha \to (\beta \to \gamma)) \to ((\alpha \to \beta) \to (\alpha \to \gamma))$: tautology (Problem 5 in [[07-module1-practice-problems]] is the dual; direct check has 8 rows).

**A3** $(\neg\beta \to \neg\alpha) \to ((\neg\beta \to \alpha) \to \beta)$: tautology. The semantics: $(\neg\beta \to \neg\alpha) \wedge (\neg\beta \to \alpha)$ says $\neg\beta$ implies both $\alpha$ and $\neg\alpha$ — impossible — so $\beta$.

## 8.8 What $\mathcal{L}$ Captures

Under interpretations, $\mathcal{L}$ is:

- **Sound.** $\Gamma \vdash \alpha \Rightarrow \Gamma \models \alpha$ ([[11-soundness-and-completeness]]).
- **Complete.** $\Gamma \models \alpha \Rightarrow \Gamma \vdash \alpha$ (same reference).

Because $\mathcal{L}$ proves exactly the tautologies (and more generally, the semantic entailments), it is said to **axiomatize propositional logic**.

## 8.9 Strategy for Working in $\mathcal{L}$

Deriving even simple formulas can be laborious. Three techniques compound to make it tractable:

1. **Use the Deduction Theorem ([[10-deduction-theorem]]).** The theorem states: if $\Gamma \cup \{\alpha\} \vdash \beta$, then $\Gamma \vdash \alpha \to \beta$. This lets us "assume $\alpha$" freely and later "discharge" to an implication — exactly parallel to conditional proof.
2. **Build a toolkit of derived rules.** Once $\vdash \alpha \to \alpha$, $\vdash \neg\neg\alpha \to \alpha$, HS, etc. are established (as theorems of $\mathcal{L}$), they can be quoted as shortcuts in future proofs.
3. **Use replacement equivalences sparingly.** In strict $\mathcal{L}$, each "equivalent" rewrite is still a formal derivation. In practice we abbreviate.

We develop the toolkit in [[09-formal-proofs-and-modus-ponens]] and the Deduction Theorem in [[10-deduction-theorem]].

## 8.10 A Second Example: Swapping Hypotheses

> **Theorem 8.4.** $\{p \to (q \to r), q\} \vdash p \to r$ (hypothesis swap for a $\to$-nested formula).

*Proof sketch (using only axioms + MP; full proof involves A2).*
$$
\begin{array}{lll}
1. & p \to (q \to r) & \text{hyp} \\
2. & q & \text{hyp} \\
3. & q \to (p \to q) & \text{A1} \\
4. & p \to q & \text{MP 2, 3} \\
5. & (p \to (q \to r)) \to ((p \to q) \to (p \to r)) & \text{A2} \\
6. & (p \to q) \to (p \to r) & \text{MP 1, 5} \\
7. & p \to r & \text{MP 4, 6}
\end{array}
$$
$\blacksquare$

## 8.11 Historical Note

The system above is due to Łukasiewicz (a streamlining of the Hilbert–Bernays and earlier axiomatic systems). Other standard formulations:

- **Frege 1879** — first truly rigorous propositional calculus, several axioms.
- **Russell & Whitehead (Principia Mathematica, 1910)** — five axioms, one rule.
- **Hilbert–Ackermann (1928)** — the "Hilbert calculus" in its textbook shape.
- **Łukasiewicz** — minimalist three-axiom system (ours, roughly).
- **Gentzen natural deduction / sequent calculus** — different shape, introduces and eliminates connectives one at a time; closer to [[06-arguments-and-rules-of-inference]].

All these systems are **equivalent** (prove the same theorems) for classical propositional logic.

## 8.12 Summary

- The Hilbert system $\mathcal{L}$ has connectives $\{\neg, \to\}$; others defined.
- **Three axiom schemes** (A1, A2, A3) and **one rule** (Modus Ponens).
- A **formal proof** is a sequence of WFFs, each an axiom, hypothesis, or MP-inference.
- $\Gamma \vdash \alpha$: $\alpha$ is derivable from $\Gamma$. $\vdash \alpha$: $\alpha$ is a theorem.
- $\vdash$ is **reflexive, monotone, transitive, compact**.
- First non-trivial theorem: $\vdash \alpha \to \alpha$ (a five-line derivation).
- Each axiom is a **tautology**; MP preserves truth — the roots of **soundness** ([[11-soundness-and-completeness]]).
- Strategy: use the **Deduction Theorem** ([[10-deduction-theorem]]) and derived rules.

## Related Concepts

- [[06-arguments-and-rules-of-inference]] — semantic rule-based proofs that $\mathcal{L}$ formalizes.
- [[09-formal-proofs-and-modus-ponens]] — building up a toolkit of derived theorems.
- [[10-deduction-theorem]] — the bridge that makes derivations tractable.
- [[11-soundness-and-completeness]] — $\vdash$ and $\models$ match exactly.

## Sources

- [[raw/Lecture_Notes_2__on_Propositional_Calculus]] — axiomatic system, MP, proofs (Chapters 1–2).
