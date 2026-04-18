---
title: "Well-Formed Formulas and Truth Tables"
type: guide
module: "Propositional Logic"
file: 02
related: [01-propositions-connectives-truth-values, 03-tautologies-contradictions-satisfiability, 04-logical-equivalence-and-laws]
sources: [Lecture_Notes_on_Propositional_Logic]
---

# 2. Well-Formed Formulas and Truth Tables

In [[01-propositions-connectives-truth-values]] we defined connectives and saw examples. We now formalize the **syntax** of propositional logic — what counts as a legitimate formula — and describe the mechanical process for computing the truth value of a formula under every assignment. The result is a **decision procedure**: given any propositional formula, we can, in finite time, determine exactly which truth assignments satisfy it.

## 2.1 The Alphabet of Propositional Logic

> **Definition 2.1 (Alphabet).** The alphabet of propositional logic consists of:
> 1. **Propositional variables**: a countable supply $p_1, p_2, p_3, \dots$ (informally $p, q, r, \dots$).
> 2. **Connectives**: $\neg, \wedge, \vee, \to, \leftrightarrow$.
> 3. **Punctuation**: left and right parentheses $(, )$.

Two optional **logical constants** are sometimes added:
- $\bot$ (**falsum** / "false") — a 0-ary connective always interpreted as $\mathbf{F}$.
- $\top$ (**verum** / "true") — a 0-ary connective always interpreted as $\mathbf{T}$.

Some texts omit $\top, \bot$ entirely (they can be expressed as, e.g., $p \wedge \neg p$ and $p \vee \neg p$); we will use them when convenient.

## 2.2 Well-Formed Formulas (WFFs)

A string of symbols like "$p \wedge q$" should count as a formula; "$\wedge p )q$" should not. The distinction is captured by a recursive grammar.

> **Definition 2.2 (Well-Formed Formula).** The set $\text{WFF}$ of **well-formed formulas** of propositional logic is the smallest set satisfying:
>
> $(B)$ **Base clause.** Every propositional variable is in $\text{WFF}$. ($\bot, \top$ too if admitted.)
>
> $(R)$ **Recursive clauses.** If $\alpha, \beta \in \text{WFF}$, then:
> - $(\neg \alpha) \in \text{WFF}$
> - $(\alpha \wedge \beta) \in \text{WFF}$
> - $(\alpha \vee \beta) \in \text{WFF}$
> - $(\alpha \to \beta) \in \text{WFF}$
> - $(\alpha \leftrightarrow \beta) \in \text{WFF}$
>
> $(C)$ **Closure.** Nothing else is in $\text{WFF}$.

"Smallest set" means: $\text{WFF}$ is the intersection of all sets of strings closed under $(B)$ and $(R)$.

**Example 1.** Which are WFFs?
- $(a)$ $p$ — yes (base).
- $(b)$ $(\neg p)$ — yes.
- $(c)$ $((p \wedge q) \to r)$ — yes.
- $(d)$ $p \vee q$ — yes (by our usual omission of outermost parentheses; strictly $(p \vee q)$).
- $(e)$ $\wedge p q$ — **no** (prefix notation, but the grammar uses infix).
- $(f)$ $(p \wedge)$ — **no** ($\wedge$ needs two operands).
- $(g)$ $(\neg \neg p)$ — yes (applying $\neg$ twice, with $\alpha = (\neg p)$).

*Parenthesis conventions.* Strictly, every binary connective introduces a fresh pair of parentheses. In practice we drop outermost parentheses and use precedence $\neg > \wedge > \vee > \to > \leftrightarrow$ to avoid clutter. So we write $p \wedge q \to r$ for the strict form $((p \wedge q) \to r)$.

## 2.3 Structural Induction and Structural Recursion

Because WFFs are defined recursively, proofs about all WFFs are typically done by **structural induction** on formulas.

> **Principle 2.3 (Structural Induction on WFFs).** To prove a property $P(\alpha)$ holds for every $\alpha \in \text{WFF}$, it suffices to prove:
>
> - **Base step.** $P(p)$ for every propositional variable $p$ (and for $\bot, \top$ if used).
> - **Inductive step.** Assuming $P(\alpha), P(\beta)$ (inductive hypothesis), prove $P(\neg \alpha), P(\alpha \wedge \beta), P(\alpha \vee \beta), P(\alpha \to \beta), P(\alpha \leftrightarrow \beta)$.

**Example 2.** Every WFF has the same number of left and right parentheses.

*Proof by structural induction.* Let $L(\alpha), R(\alpha)$ count left and right parens in $\alpha$; we prove $L(\alpha) = R(\alpha)$.

*Base.* If $\alpha = p$, then $L(p) = R(p) = 0$. $\checkmark$

*Inductive.* If $\alpha = (\neg \beta)$, then $L(\alpha) = 1 + L(\beta) = 1 + R(\beta) = R(\alpha)$. Similarly for binary cases: $L(\alpha \wedge \beta \text{ wrapped}) = 1 + L(\alpha) + L(\beta) = 1 + R(\alpha) + R(\beta) = R(\ldots)$. $\blacksquare$

### Parse trees

Every WFF has a unique **parse tree**: the leaves are propositional variables (or $\top, \bot$), internal nodes are connectives with subformulas as children, and the root is the main connective of the whole WFF.

**Example 3.** The parse tree of $(p \vee q) \to (\neg r \wedge s)$:
```
          →
         / \
       ∨     ∧
      / \   / \
     p   q ¬   s
           |
           r
```
The **main connective** (root) is $\to$. The subformulas are $(p \vee q)$, $(\neg r \wedge s)$, $\neg r$, $p$, $q$, $r$, $s$, and the whole formula itself.

> **Theorem 2.4 (Unique Readability).** Every WFF has a unique parse, i.e., a unique main connective and unique decomposition into subformulas.

This is a nontrivial theorem — it depends on the parenthesis convention. Without parentheses, $p \wedge q \vee r$ is ambiguous. Our grammar inserts parentheses on every recursive step precisely to guarantee unique readability.

## 2.4 Semantics: Truth Valuations

We now give **meaning** to WFFs.

> **Definition 2.5 (Valuation).** A **valuation** is a function $v: \text{PV} \to \{\mathbf{T}, \mathbf{F}\}$ where $\text{PV}$ is the set of propositional variables. A valuation extends uniquely (by Unique Readability) to $\bar v: \text{WFF} \to \{\mathbf{T}, \mathbf{F}\}$ via:
>
> - $\bar v(p) = v(p)$ for each variable $p$.
> - $\bar v(\neg \alpha) = \mathbf{T} \iff \bar v(\alpha) = \mathbf{F}$.
> - $\bar v(\alpha \wedge \beta) = \mathbf{T} \iff \bar v(\alpha) = \bar v(\beta) = \mathbf{T}$.
> - $\bar v(\alpha \vee \beta) = \mathbf{T} \iff \bar v(\alpha) = \mathbf{T}$ or $\bar v(\beta) = \mathbf{T}$.
> - $\bar v(\alpha \to \beta) = \mathbf{F} \iff \bar v(\alpha) = \mathbf{T}$ and $\bar v(\beta) = \mathbf{F}$.
> - $\bar v(\alpha \leftrightarrow \beta) = \mathbf{T} \iff \bar v(\alpha) = \bar v(\beta)$.

By the uniqueness of parse, this recursion is well-defined: given $v$, the value $\bar v(\alpha)$ is determined.

*Notation.* We write $v \models \alpha$ for "$v$ **satisfies** $\alpha$", i.e., $\bar v(\alpha) = \mathbf{T}$.

## 2.5 Truth Tables

A **truth table** for a WFF $\alpha$ with propositional variables $p_1, \dots, p_n$ systematically lists $\bar v(\alpha)$ for all $2^n$ possible valuations.

### Constructing a truth table

1. Identify all variables in $\alpha$; say there are $n$.
2. Write a column for each variable, filling in the $2^n$ assignments (conventionally, the leftmost column alternates T/F in blocks of $2^{n-1}$, next in blocks of $2^{n-2}$, etc.).
3. Add columns for each **subformula** in order of increasing complexity (leaves first, root last).
4. Fill each new column using the values of its direct subformulas and the truth table of the top-level connective.

**Example 4.** Truth table for $(p \to q) \wedge (\neg q \vee r)$.

$$
\begin{array}{ccc|cc|c|c}
p & q & r & p \to q & \neg q & \neg q \vee r & (p \to q) \wedge (\neg q \vee r) \\ \hline
\mathbf{T} & \mathbf{T} & \mathbf{T} & \mathbf{T} & \mathbf{F} & \mathbf{T} & \mathbf{T} \\
\mathbf{T} & \mathbf{T} & \mathbf{F} & \mathbf{T} & \mathbf{F} & \mathbf{F} & \mathbf{F} \\
\mathbf{T} & \mathbf{F} & \mathbf{T} & \mathbf{F} & \mathbf{T} & \mathbf{T} & \mathbf{F} \\
\mathbf{T} & \mathbf{F} & \mathbf{F} & \mathbf{F} & \mathbf{T} & \mathbf{T} & \mathbf{F} \\
\mathbf{F} & \mathbf{T} & \mathbf{T} & \mathbf{T} & \mathbf{F} & \mathbf{T} & \mathbf{T} \\
\mathbf{F} & \mathbf{T} & \mathbf{F} & \mathbf{T} & \mathbf{F} & \mathbf{F} & \mathbf{F} \\
\mathbf{F} & \mathbf{F} & \mathbf{T} & \mathbf{T} & \mathbf{T} & \mathbf{T} & \mathbf{T} \\
\mathbf{F} & \mathbf{F} & \mathbf{F} & \mathbf{T} & \mathbf{T} & \mathbf{T} & \mathbf{T}
\end{array}
$$

So the formula is true in exactly five of the eight rows.

### Reading a truth table

- A formula is a **tautology** if its final column is all $\mathbf{T}$.
- A **contradiction** if its final column is all $\mathbf{F}$.
- A **contingency** otherwise.
- Two formulas are **logically equivalent** if their final columns match row-for-row.

These definitions are made precise in [[03-tautologies-contradictions-satisfiability]] and [[04-logical-equivalence-and-laws]].

## 2.6 Worked Examples

**Example 5.** Build the truth table for $p \to (q \to p)$.

*Solution.*
$$
\begin{array}{cc|c|c}
p & q & q \to p & p \to (q \to p) \\ \hline
\mathbf{T} & \mathbf{T} & \mathbf{T} & \mathbf{T} \\
\mathbf{T} & \mathbf{F} & \mathbf{T} & \mathbf{T} \\
\mathbf{F} & \mathbf{T} & \mathbf{F} & \mathbf{T} \\
\mathbf{F} & \mathbf{F} & \mathbf{T} & \mathbf{T}
\end{array}
$$
The last column is all $\mathbf{T}$ — this is a **tautology** (and is in fact axiom A1 of the Hilbert system; see [[08-axiomatic-propositional-calculus]]). $\boxed{}$

**Example 6.** Build the truth table for $(p \wedge \neg p) \vee q$.

*Solution.*
$$
\begin{array}{cc|c|c|c}
p & q & \neg p & p \wedge \neg p & (p \wedge \neg p) \vee q \\ \hline
\mathbf{T} & \mathbf{T} & \mathbf{F} & \mathbf{F} & \mathbf{T} \\
\mathbf{T} & \mathbf{F} & \mathbf{F} & \mathbf{F} & \mathbf{F} \\
\mathbf{F} & \mathbf{T} & \mathbf{T} & \mathbf{F} & \mathbf{T} \\
\mathbf{F} & \mathbf{F} & \mathbf{T} & \mathbf{F} & \mathbf{F}
\end{array}
$$
The column matches that of $q$ alone — so $(p \wedge \neg p) \vee q \equiv q$. $\boxed{}$

**Example 7.** Verify that $p \to q$ and its contrapositive $\neg q \to \neg p$ are logically equivalent.

*Solution.*
$$
\begin{array}{cc|c|cc|c}
p & q & p \to q & \neg q & \neg p & \neg q \to \neg p \\ \hline
\mathbf{T} & \mathbf{T} & \mathbf{T} & \mathbf{F} & \mathbf{F} & \mathbf{T} \\
\mathbf{T} & \mathbf{F} & \mathbf{F} & \mathbf{T} & \mathbf{F} & \mathbf{F} \\
\mathbf{F} & \mathbf{T} & \mathbf{T} & \mathbf{F} & \mathbf{T} & \mathbf{T} \\
\mathbf{F} & \mathbf{F} & \mathbf{T} & \mathbf{T} & \mathbf{T} & \mathbf{T}
\end{array}
$$
Columns 3 and 6 agree in every row. $\blacksquare$

## 2.7 Size of Truth Tables

A WFF with $n$ distinct variables has a truth table with $2^n$ rows. This is the **worst-case cost** of evaluating propositional satisfiability by brute force. (The **SAT problem** — deciding whether a WFF has at least one satisfying row — is the prototypical NP-complete problem; see [[22-turing-machines-and-computability]].)

For $n = 10$ variables, the table already has $1024$ rows — truth-table methods scale poorly. Logical equivalence laws ([[04-logical-equivalence-and-laws]]) and normal-form reductions ([[05-normal-forms-cnf-dnf]]) give shorter alternative paths in practice.

## 2.8 Summary

- The **alphabet** is variables, connectives, and parentheses; **WFFs** are built recursively.
- Every WFF has a unique parse tree and main connective (**Unique Readability**).
- A **valuation** $v: \text{PV} \to \mathbb{B}$ extends uniquely to $\bar v: \text{WFF} \to \mathbb{B}$ via the connective semantics.
- A **truth table** lists $\bar v(\alpha)$ for all $2^n$ assignments.
- Truth tables give a **decision procedure** for tautology, contradiction, satisfiability, and equivalence.
- Cost grows as $2^n$; this is why equivalence laws and normal forms matter.

## Related Concepts

- [[01-propositions-connectives-truth-values]] — the connective truth tables that drive the recursion.
- [[03-tautologies-contradictions-satisfiability]] — classification of WFFs.
- [[04-logical-equivalence-and-laws]] — algebraic simplification.
- [[05-normal-forms-cnf-dnf]] — canonical WFF forms.

## Sources

- [[raw/Lecture_Notes_on_Propositional_Logic]] — WFFs, truth tables (Chapters 2–3).
