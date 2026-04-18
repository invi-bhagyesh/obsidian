---
title: "Propositions, Connectives, Truth Values"
type: guide
module: "Propositional Logic"
file: 01
related: [02-wffs-and-truth-tables, 03-tautologies-contradictions-satisfiability, 04-logical-equivalence-and-laws]
sources: [Lecture_Notes_on_Propositional_Logic]
---

# 1. Propositions, Connectives, Truth Values

Logic is the study of valid reasoning. Mathematical logic formalizes reasoning by stripping natural-language statements down to a skeleton where truth can be computed mechanically. The first layer of that skeleton is **propositional logic** — the logic of declarative sentences combined by **connectives** ("not", "and", "or", "if...then", "if and only if"). This chapter introduces the objects (propositions), the operators (connectives), and the evaluation rules (truth tables) that together form propositional logic's kernel.

## 1.1 What is a Proposition?

> **Definition 1.1 (Proposition).** A **proposition** (or **statement**) is a declarative sentence that is either *true* or *false*, but not both.

The crucial words are **declarative** and **definite truth value**. Questions, commands, exclamations, and open formulas are **not** propositions.

**Example 1.**
- $(a)$ "Paris is the capital of France." — proposition (true).
- $(b)$ "$2 + 2 = 5$." — proposition (false).
- $(c)$ "What time is it?" — not a proposition (question).
- $(d)$ "Close the door." — not a proposition (command).
- $(e)$ "$x + 1 = 3$." — not a proposition (truth depends on $x$; this is an **open formula** or **predicate**).
- $(f)$ "This sentence is false." — not a proposition (Liar paradox: self-referential with no consistent truth assignment).

*Remark.* Item $(e)$ becomes a proposition once $x$ is fixed (e.g., $x = 2$ gives a true proposition), or once bound by a quantifier (e.g., "$\exists x: x + 1 = 3$" is a true proposition). These are the gateways into **first-order logic** ([[13-predicates-and-quantifiers]]).

### Propositional variables

In propositional logic, we abstract away the content of propositions and label them by **propositional variables** (or **atomic propositions**), usually $p, q, r, s, \dots$ or $P, Q, R, \dots$. A propositional variable stands for an unspecified proposition whose truth value is either **T** (true) or **F** (false), equivalently $1$ or $0$.

Throughout these notes we use $\mathbf{T}, \mathbf{F}$ interchangeably with $1, 0$. Both conventions are standard.

## 1.2 Truth Values and the Boolean Domain

> **Definition 1.2 (Truth values).** The set $\mathbb{B} = \{\mathbf{T}, \mathbf{F}\} = \{1, 0\}$ is the **Boolean domain**. Every proposition has a truth value in $\mathbb{B}$.

A **truth assignment** (or **valuation**) on a set of propositional variables $\{p_1, \dots, p_n\}$ is a function $v: \{p_1, \dots, p_n\} \to \mathbb{B}$. With $n$ variables there are $2^n$ possible assignments — this is what tabulates a truth table's rows.

## 1.3 The Five Standard Connectives

Propositional logic uses five connectives to build complex propositions from simple ones:

| Symbol | Name | English reading | Arity |
|:------:|:-----|:---------------|:-----:|
| $\neg$ | Negation | "not $p$" | unary |
| $\wedge$ | Conjunction | "$p$ and $q$" | binary |
| $\vee$ | Disjunction | "$p$ or $q$" | binary |
| $\to$ | Implication | "if $p$ then $q$" | binary |
| $\leftrightarrow$ | Biconditional | "$p$ if and only if $q$" | binary |

Alternative symbols in other texts: $\sim p$ or $\bar p$ for $\neg p$; $p \cdot q$ or $p\ \&\ q$ for $p \wedge q$; $p + q$ for $p \vee q$; $p \supset q$ for $p \to q$; $p \equiv q$ for $p \leftrightarrow q$.

### 1.3.1 Negation

> **Definition 1.3 (Negation).** The proposition $\neg p$ is true precisely when $p$ is false.

$$
\begin{array}{c|c}
p & \neg p \\ \hline
\mathbf{T} & \mathbf{F} \\
\mathbf{F} & \mathbf{T}
\end{array}
$$

**Example 2.** If $p$ = "It is raining", then $\neg p$ = "It is not raining" (equivalently, "It is not the case that it is raining"). If $p$ is true, $\neg p$ is false, and vice versa.

### 1.3.2 Conjunction

> **Definition 1.4 (Conjunction).** The proposition $p \wedge q$ is true precisely when **both** $p$ and $q$ are true.

$$
\begin{array}{cc|c}
p & q & p \wedge q \\ \hline
\mathbf{T} & \mathbf{T} & \mathbf{T} \\
\mathbf{T} & \mathbf{F} & \mathbf{F} \\
\mathbf{F} & \mathbf{T} & \mathbf{F} \\
\mathbf{F} & \mathbf{F} & \mathbf{F}
\end{array}
$$

**Example 3.** "Alice is a doctor and Bob is an engineer" is true exactly when both conjuncts are true.

### 1.3.3 Disjunction (inclusive "or")

> **Definition 1.5 (Disjunction).** The proposition $p \vee q$ is true precisely when **at least one** of $p, q$ is true.

$$
\begin{array}{cc|c}
p & q & p \vee q \\ \hline
\mathbf{T} & \mathbf{T} & \mathbf{T} \\
\mathbf{T} & \mathbf{F} & \mathbf{T} \\
\mathbf{F} & \mathbf{T} & \mathbf{T} \\
\mathbf{F} & \mathbf{F} & \mathbf{F}
\end{array}
$$

*Caution — inclusive vs exclusive "or".* In everyday English "or" is sometimes **exclusive** ("tea or coffee?" usually rules out having both). In mathematics and logic, $\vee$ is always **inclusive**: $p \vee q$ is also true when both hold. The exclusive or is a separate connective $\oplus$ (Example 5 below).

### 1.3.4 Implication (conditional)

> **Definition 1.6 (Implication).** The proposition $p \to q$ is **false** only in the case $p$ true and $q$ false; otherwise true.

$$
\begin{array}{cc|c}
p & q & p \to q \\ \hline
\mathbf{T} & \mathbf{T} & \mathbf{T} \\
\mathbf{T} & \mathbf{F} & \mathbf{F} \\
\mathbf{F} & \mathbf{T} & \mathbf{T} \\
\mathbf{F} & \mathbf{F} & \mathbf{T}
\end{array}
$$

The proposition $p$ is the **antecedent** (or **hypothesis**); $q$ is the **consequent** (or **conclusion**).

*Vacuous truth.* When $p$ is false, $p \to q$ is automatically true regardless of $q$. This is the **material conditional** — the only reading that makes truth purely a function of component truth values. It sometimes diverges from everyday English ("If 2+2=5 then the moon is green" is vacuously true), but it is what makes propositional logic work as a calculus.

**Synonyms of $p \to q$:**
- "if $p$, then $q$"
- "$q$ if $p$"
- "$p$ only if $q$"
- "$p$ is sufficient for $q$"
- "$q$ is necessary for $p$"
- "$p$ implies $q$"

Given $p \to q$, the following are associated conditionals:

| Name | Form |
|:-----|:-----|
| Converse | $q \to p$ |
| Inverse | $\neg p \to \neg q$ |
| Contrapositive | $\neg q \to \neg p$ |

**Fact.** $p \to q$ is logically equivalent to its contrapositive $\neg q \to \neg p$ (proved in [[04-logical-equivalence-and-laws]]). Converse and inverse are *not* equivalent to the original implication.

### 1.3.5 Biconditional

> **Definition 1.7 (Biconditional).** The proposition $p \leftrightarrow q$ is true precisely when $p$ and $q$ share the same truth value.

$$
\begin{array}{cc|c}
p & q & p \leftrightarrow q \\ \hline
\mathbf{T} & \mathbf{T} & \mathbf{T} \\
\mathbf{T} & \mathbf{F} & \mathbf{F} \\
\mathbf{F} & \mathbf{T} & \mathbf{F} \\
\mathbf{F} & \mathbf{F} & \mathbf{T}
\end{array}
$$

**Synonyms of $p \leftrightarrow q$:**
- "$p$ if and only if $q$" (often "iff")
- "$p$ is necessary and sufficient for $q$"
- "$p$ exactly when $q$"

*Observation.* $p \leftrightarrow q$ is logically equivalent to $(p \to q) \wedge (q \to p)$ — it decomposes into an implication and its converse.

## 1.4 Combining Connectives: First Examples

Once we have the five connectives, we can combine them into arbitrary expressions. To evaluate a combined expression at a truth assignment, evaluate inside-out.

**Example 4.** Evaluate $(p \wedge \neg q) \to r$ when $p = \mathbf{T}, q = \mathbf{T}, r = \mathbf{F}$.

*Solution.* $\neg q = \mathbf{F}$, so $p \wedge \neg q = \mathbf{T} \wedge \mathbf{F} = \mathbf{F}$. Then $\mathbf{F} \to \mathbf{F} = \mathbf{T}$. So the formula is $\boxed{\mathbf{T}}$ under this assignment. $\blacksquare$

**Example 5 (Exclusive or).** Define $p \oplus q$ ("$p$ xor $q$") as "$p$ or $q$ but not both". Show $p \oplus q \equiv (p \vee q) \wedge \neg(p \wedge q)$ by truth table.

*Solution.*
$$
\begin{array}{cc|c|cc|c}
p & q & p \oplus q & p \vee q & \neg(p \wedge q) & (p \vee q) \wedge \neg(p \wedge q) \\ \hline
\mathbf{T} & \mathbf{T} & \mathbf{F} & \mathbf{T} & \mathbf{F} & \mathbf{F} \\
\mathbf{T} & \mathbf{F} & \mathbf{T} & \mathbf{T} & \mathbf{T} & \mathbf{T} \\
\mathbf{F} & \mathbf{T} & \mathbf{T} & \mathbf{T} & \mathbf{T} & \mathbf{T} \\
\mathbf{F} & \mathbf{F} & \mathbf{F} & \mathbf{F} & \mathbf{T} & \mathbf{F}
\end{array}
$$
Columns 3 and 6 match, so $p \oplus q \equiv (p \vee q) \wedge \neg(p \wedge q)$. $\blacksquare$

**Example 6 (Translation).** Translate to symbols, with $p$ = "You study", $q$ = "You pass", $r$ = "You sleep":
- $(a)$ "If you study, you pass."
- $(b)$ "You pass only if you study."
- $(c)$ "You study or sleep, but not both."
- $(d)$ "You study and sleep, or you don't pass."

*Solution.*
- $(a)$ $p \to q$.
- $(b)$ $q \to p$ (note: "only if" reverses to give the *converse* direction).
- $(c)$ $p \oplus r$, i.e., $(p \vee r) \wedge \neg(p \wedge r)$.
- $(d)$ $(p \wedge r) \vee \neg q$. $\blacksquare$

## 1.5 Precedence and Parentheses

To avoid ambiguity, connectives have a conventional precedence (highest binds tightest):
$$
\neg \ >\ \wedge \ >\ \vee \ >\ \to \ >\ \leftrightarrow.
$$
So $\neg p \vee q \wedge r \to s$ parses as $((\neg p) \vee (q \wedge r)) \to s$. When in doubt, **parenthesize**. The formal rules are given in [[02-wffs-and-truth-tables]].

**Associativity conventions.**
- $\wedge$ and $\vee$ are **associative**, so $p \wedge q \wedge r$ is unambiguous (means $(p \wedge q) \wedge r$, equivalently $p \wedge (q \wedge r)$).
- $\to$ is **right-associative**: $p \to q \to r$ means $p \to (q \to r)$.
- $\leftrightarrow$ is usually parenthesized to avoid confusion.

## 1.6 Functional Completeness (preview)

A natural question: with the five connectives $\{\neg, \wedge, \vee, \to, \leftrightarrow\}$, can we express *every* possible truth function? The answer is yes, and in fact we already have redundancy: any two of the following are sufficient:
- $\{\neg, \wedge\}$ — since $p \vee q \equiv \neg(\neg p \wedge \neg q)$, $p \to q \equiv \neg(p \wedge \neg q)$, etc.
- $\{\neg, \vee\}$ — dually.
- $\{\neg, \to\}$ — since $p \wedge q \equiv \neg(p \to \neg q)$, $p \vee q \equiv (\neg p) \to q$.

Even single-connective systems exist: the **Sheffer stroke** $p \mid q \equiv \neg(p \wedge q)$ (NAND) and the **Peirce arrow** $p \downarrow q \equiv \neg(p \vee q)$ (NOR) are each functionally complete on their own.

We will establish functional completeness rigorously in [[05-normal-forms-cnf-dnf]].

## 1.7 Summary

- A **proposition** is a declarative sentence with a definite truth value $\mathbf{T}$ or $\mathbf{F}$.
- **Propositional variables** $p, q, r, \dots$ abstract atomic propositions.
- The five standard connectives are $\neg, \wedge, \vee, \to, \leftrightarrow$, each defined by its truth table.
- $p \to q$ is **material implication**: false only when antecedent is true and consequent is false.
- The contrapositive of $p \to q$ is $\neg q \to \neg p$, which is always equivalent; the converse $q \to p$ and inverse $\neg p \to \neg q$ are in general *not*.
- Standard connective precedence: $\neg > \wedge > \vee > \to > \leftrightarrow$.
- $\{\neg, \wedge\}$, $\{\neg, \vee\}$, $\{\neg, \to\}$, $\{\mid\}$, $\{\downarrow\}$ are each functionally complete.

## Related Concepts

- [[02-wffs-and-truth-tables]] — the recursive syntax of propositional formulas.
- [[03-tautologies-contradictions-satisfiability]] — classification by truth-table column pattern.
- [[04-logical-equivalence-and-laws]] — formalizes $\equiv$ and the algebraic laws.
- [[13-predicates-and-quantifiers]] — gateway to first-order logic, handling open formulas like $x + 1 = 3$.

## Sources

- [[raw/Lecture_Notes_on_Propositional_Logic]] — propositions, connectives, truth tables (Chapter 1).
