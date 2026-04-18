---
title: "Normal Forms (CNF, DNF)"
type: guide
module: "Propositional Logic"
file: 05
related: [04-logical-equivalence-and-laws, 06-arguments-and-rules-of-inference, 22-turing-machines-and-computability]
sources: [Lecture_Notes_on_Propositional_Logic]
---

# 5. Normal Forms (CNF, DNF)

A **normal form** is a canonical shape every formula can be rewritten into. The two standard normal forms are **Disjunctive Normal Form** (DNF — "OR of ANDs") and **Conjunctive Normal Form** (CNF — "AND of ORs"). Both have important uses: DNF makes satisfying assignments easy to read off, CNF is the input language for SAT solvers, and the DNF construction gives a clean proof that $\{\neg, \wedge, \vee\}$ is **functionally complete**.

## 5.1 Literals and Clauses

> **Definition 5.1.**
> - A **literal** is a propositional variable or its negation: $p$ and $\neg p$ are the literals on $p$.
> - A **positive literal** is a variable; a **negative literal** is a negated variable.
> - A **clause** is a disjunction of literals: $\ell_1 \vee \ell_2 \vee \dots \vee \ell_k$.
> - A **term** (or **monomial**) is a conjunction of literals: $\ell_1 \wedge \ell_2 \wedge \dots \wedge \ell_k$.

A clause or term of length $k$ is called a **$k$-clause** or **$k$-term**. Length-$1$ forms are literals.

*Convention.* The empty disjunction is $\bot$; the empty conjunction is $\top$.

## 5.2 Disjunctive and Conjunctive Normal Forms

> **Definition 5.2 (DNF).** A WFF is in **Disjunctive Normal Form** if it is a disjunction of terms: $T_1 \vee T_2 \vee \dots \vee T_m$ where each $T_i$ is a conjunction of literals.

> **Definition 5.3 (CNF).** A WFF is in **Conjunctive Normal Form** if it is a conjunction of clauses: $C_1 \wedge C_2 \wedge \dots \wedge C_m$ where each $C_i$ is a disjunction of literals.

**Examples of DNF.**
- $p$ — trivial DNF (one $1$-term).
- $p \wedge q$ — DNF (one $2$-term).
- $(p \wedge q) \vee (\neg p \wedge r)$ — DNF.
- $p \vee (\neg q \wedge r) \vee (s \wedge \neg t \wedge u)$ — DNF.

**Examples of CNF.**
- $p$ — trivial CNF.
- $p \vee q$ — CNF.
- $(p \vee q) \wedge (\neg p \vee r)$ — CNF.
- $p \wedge (p \vee q) \wedge (\neg p \vee q \vee \neg r)$ — CNF.

**Neither DNF nor CNF:**
- $p \to q$ — $\to$ is not in $\{\neg, \wedge, \vee\}$.
- $\neg(p \wedge q)$ — negation applied to a non-literal.
- $(p \wedge (q \vee r))$ — not a flat disjunction-of-conjunctions.

## 5.3 Converting to DNF / CNF

Every WFF is equivalent to a WFF in DNF, and to one in CNF. The algorithm:

> **Algorithm 5.4 (To DNF / CNF).**
> 1. **Eliminate $\leftrightarrow$** using $\alpha \leftrightarrow \beta \equiv (\alpha \to \beta) \wedge (\beta \to \alpha)$.
> 2. **Eliminate $\to$** using $\alpha \to \beta \equiv \neg\alpha \vee \beta$.
> 3. **Push negations inward** using De Morgan and double negation, so each $\neg$ sits directly on a variable (yielding a **Negation Normal Form**, NNF).
> 4. **Distribute**:
>    - For DNF, distribute $\wedge$ over $\vee$: $\alpha \wedge (\beta \vee \gamma) \equiv (\alpha \wedge \beta) \vee (\alpha \wedge \gamma)$.
>    - For CNF, distribute $\vee$ over $\wedge$: $\alpha \vee (\beta \wedge \gamma) \equiv (\alpha \vee \beta) \wedge (\alpha \vee \gamma)$.
> 5. **Simplify** (absorption, idempotence, identity, domination) if desired.

> **Theorem 5.5 (Normal-form existence).** Every WFF is equivalent to a WFF in DNF and to one in CNF.

*Proof sketch.* The algorithm above, applied to any WFF, terminates and produces an equivalent formula in the required shape. Each step uses equivalences from [[04-logical-equivalence-and-laws]]. $\blacksquare$

**Example 1.** Convert $p \to (q \leftrightarrow r)$ to CNF.

*Solution.*

*Step 1. Eliminate $\leftrightarrow$:*
$$
p \to ((q \to r) \wedge (r \to q)).
$$

*Step 2. Eliminate $\to$:*
$$
\neg p \vee ((\neg q \vee r) \wedge (\neg r \vee q)).
$$

*Step 3. Push $\neg$ inward.* Already done (only $\neg p$, $\neg q$, $\neg r$ appear).

*Step 4. Distribute $\vee$ over $\wedge$:*
$$
(\neg p \vee \neg q \vee r) \wedge (\neg p \vee \neg r \vee q).
$$
$\boxed{(\neg p \vee \neg q \vee r) \wedge (\neg p \vee q \vee \neg r)}$ — CNF. $\blacksquare$

**Example 2.** Convert $\neg(p \to q) \vee (r \wedge s)$ to DNF.

*Solution.*

*Step 2 (eliminate $\to$) / Step 3 (push neg):* $\neg(p \to q) \equiv p \wedge \neg q$.
$$
(p \wedge \neg q) \vee (r \wedge s).
$$
Already DNF. $\boxed{(p \wedge \neg q) \vee (r \wedge s)}$. $\blacksquare$

## 5.4 Canonical DNF/CNF from Truth Tables

There is a shortcut: given a truth table for $\alpha$, one can read off DNF and CNF directly.

### Canonical DNF — "sum over satisfying rows"

For each row of the truth table where $\alpha$ is $\mathbf{T}$, form the term that picks out that row:
$$
T_{\text{row}} = \ell_1 \wedge \ell_2 \wedge \cdots \wedge \ell_n
$$
where $\ell_i = p_i$ if $p_i = \mathbf{T}$ in the row, else $\ell_i = \neg p_i$. The canonical DNF is the disjunction of these terms.

### Canonical CNF — "product over falsifying rows"

For each row where $\alpha$ is $\mathbf{F}$, form the clause that excludes that row:
$$
C_{\text{row}} = \ell_1 \vee \ell_2 \vee \cdots \vee \ell_n
$$
where $\ell_i = \neg p_i$ if $p_i = \mathbf{T}$ in the row, else $\ell_i = p_i$. The canonical CNF is the conjunction.

*Why it works.* $T_{\text{row}}$ is true precisely at that one row; taking the disjunction over all satisfying rows gives a formula that is true exactly where $\alpha$ is true. Dually for CNF.

**Example 3.** Canonical DNF and CNF for $\alpha = p \to q$.

Truth table:
$$
\begin{array}{cc|c}
p & q & p \to q \\ \hline
\mathbf{T} & \mathbf{T} & \mathbf{T} \\
\mathbf{T} & \mathbf{F} & \mathbf{F} \\
\mathbf{F} & \mathbf{T} & \mathbf{T} \\
\mathbf{F} & \mathbf{F} & \mathbf{T}
\end{array}
$$

*Canonical DNF:* rows where $\alpha = \mathbf{T}$: 1, 3, 4.
- Row 1 ($p=\mathbf{T}, q=\mathbf{T}$): $p \wedge q$.
- Row 3 ($p=\mathbf{F}, q=\mathbf{T}$): $\neg p \wedge q$.
- Row 4 ($p=\mathbf{F}, q=\mathbf{F}$): $\neg p \wedge \neg q$.

Canonical DNF: $(p \wedge q) \vee (\neg p \wedge q) \vee (\neg p \wedge \neg q)$.

*Canonical CNF:* rows where $\alpha = \mathbf{F}$: 2.
- Row 2 ($p=\mathbf{T}, q=\mathbf{F}$): exclude by $\neg p \vee q$.

Canonical CNF: $\neg p \vee q$ (a single clause). This matches the identity $p \to q \equiv \neg p \vee q$. $\blacksquare$

*Remark on uniqueness.* The canonical DNF and CNF are unique up to reordering and reshuffling inside clauses/terms, because each satisfying/falsifying row contributes exactly one "full" term/clause using all variables. Without this "full-length" requirement, a formula can have many DNF/CNF equivalents.

## 5.5 Functional Completeness

The canonical DNF construction gives an immediate proof:

> **Theorem 5.6 (Functional Completeness of $\{\neg, \wedge, \vee\}$).** Every Boolean function $f: \mathbb{B}^n \to \mathbb{B}$ is expressible by a WFF using only $\neg, \wedge, \vee$.

*Proof.* Treat $f$ as the truth column of an unknown WFF. If $f$ is identically $\mathbf{F}$, use $p \wedge \neg p$. Otherwise, the canonical DNF built from $f$'s truth table uses only $\neg, \wedge, \vee$ and realizes $f$. $\blacksquare$

**Corollary.** $\{\neg, \wedge\}$, $\{\neg, \vee\}$, $\{\neg, \to\}$ are each functionally complete (use De Morgan or implication laws to eliminate the missing connective).

## 5.6 Further Normal Forms

*Negation Normal Form (NNF).* A WFF where only $\neg, \wedge, \vee$ appear and $\neg$ is applied only to variables. NNF is a way-station to DNF/CNF.

*$k$-CNF, $k$-DNF.* CNF (resp. DNF) in which each clause (resp. term) has length $\le k$. **3-CNF** is crucial in complexity theory: **3-SAT** (deciding satisfiability of a 3-CNF formula) is NP-complete.

*Horn CNF.* A CNF in which each clause has at most one positive literal. **Horn-SAT** is decidable in polynomial time by unit propagation.

## 5.7 Worked Examples

**Example 4.** Convert $(p \wedge q) \to (\neg r \vee s)$ to CNF.

*Solution.*

Step 2: $\neg(p \wedge q) \vee \neg r \vee s \equiv (\neg p \vee \neg q) \vee \neg r \vee s$.

Already CNF (one clause). $\boxed{\neg p \vee \neg q \vee \neg r \vee s}$. $\blacksquare$

**Example 5.** Convert $((p \vee q) \wedge r) \leftrightarrow s$ to CNF.

*Solution.*

Step 1: $(((p \vee q) \wedge r) \to s) \wedge (s \to ((p \vee q) \wedge r))$.

Step 2, both directions:
- $\neg((p \vee q) \wedge r) \vee s \equiv (\neg p \wedge \neg q) \vee \neg r \vee s$ (after De Morgan).
- $\neg s \vee ((p \vee q) \wedge r)$.

Step 4, distribute on the first:
$$
(\neg p \vee \neg r \vee s) \wedge (\neg q \vee \neg r \vee s).
$$

On the second:
$$
(\neg s \vee p \vee q) \wedge (\neg s \vee r).
$$

Conjunction:
$$
(\neg p \vee \neg r \vee s) \wedge (\neg q \vee \neg r \vee s) \wedge (\neg s \vee p \vee q) \wedge (\neg s \vee r).
$$
$\blacksquare$

**Example 6.** Truth table of $\alpha = (p \wedge q) \vee (\neg p \wedge r)$ and read off canonical DNF, CNF.

$$
\begin{array}{ccc|c}
p & q & r & \alpha \\ \hline
\mathbf{T} & \mathbf{T} & \mathbf{T} & \mathbf{T} \\
\mathbf{T} & \mathbf{T} & \mathbf{F} & \mathbf{T} \\
\mathbf{T} & \mathbf{F} & \mathbf{T} & \mathbf{F} \\
\mathbf{T} & \mathbf{F} & \mathbf{F} & \mathbf{F} \\
\mathbf{F} & \mathbf{T} & \mathbf{T} & \mathbf{T} \\
\mathbf{F} & \mathbf{T} & \mathbf{F} & \mathbf{F} \\
\mathbf{F} & \mathbf{F} & \mathbf{T} & \mathbf{T} \\
\mathbf{F} & \mathbf{F} & \mathbf{F} & \mathbf{F}
\end{array}
$$

*Canonical DNF* (rows 1, 2, 5, 7):
$$
(p \wedge q \wedge r) \vee (p \wedge q \wedge \neg r) \vee (\neg p \wedge q \wedge r) \vee (\neg p \wedge \neg q \wedge r).
$$

*Canonical CNF* (rows 3, 4, 6, 8):
$$
(\neg p \vee q \vee \neg r) \wedge (\neg p \vee q \vee r) \wedge (p \vee \neg q \vee r) \wedge (p \vee q \vee r).
$$
$\blacksquare$

## 5.8 Summary

- **Literal** = variable or negated variable; **clause** = disjunction of literals; **term** = conjunction of literals.
- **DNF**: OR of ANDs. **CNF**: AND of ORs.
- **Conversion algorithm**: eliminate $\leftrightarrow, \to$; push $\neg$ to variables (NNF); distribute.
- **Canonical DNF/CNF** can be read off the truth table: DNF = sum over satisfying rows; CNF = product over falsifying rows.
- The canonical DNF proves **functional completeness** of $\{\neg, \wedge, \vee\}$ (and by rewriting, of $\{\neg, \wedge\}$, $\{\neg, \vee\}$, $\{\neg, \to\}$, $\{\mid\}$, $\{\downarrow\}$).
- **3-SAT** and **Horn-SAT** arise as restricted classes of CNF with dramatically different complexity.

## Related Concepts

- [[04-logical-equivalence-and-laws]] — laws used to convert between forms.
- [[06-arguments-and-rules-of-inference]] — resolution works on CNF.
- [[22-turing-machines-and-computability]] — SAT as the canonical NP-complete problem.

## Sources

- [[raw/Lecture_Notes_on_Propositional_Logic]] — normal forms (Chapter 6).
