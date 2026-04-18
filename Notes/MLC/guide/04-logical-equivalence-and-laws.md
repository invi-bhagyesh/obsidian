---
title: "Logical Equivalence and Laws"
type: guide
module: "Propositional Logic"
file: 04
related: [02-wffs-and-truth-tables, 03-tautologies-contradictions-satisfiability, 05-normal-forms-cnf-dnf, 06-arguments-and-rules-of-inference]
sources: [Lecture_Notes_on_Propositional_Logic]
---

# 4. Logical Equivalence and Laws

Two WFFs can differ in form yet say the same thing in every valuation. The equality-like relation that captures "same truth function" is **logical equivalence** ($\equiv$). This chapter lays out the standard algebraic laws of $\equiv$ — the propositional analogue of algebraic identities — and shows how to simplify and transform formulas mechanically. These laws power normal-form conversion ([[05-normal-forms-cnf-dnf]]) and equivalence-based proofs of tautology.

## 4.1 Logical Equivalence

> **Definition 4.1 (Logical Equivalence).** WFFs $\alpha$ and $\beta$ are **logically equivalent**, written $\alpha \equiv \beta$, if $\bar v(\alpha) = \bar v(\beta)$ for every valuation $v$. Equivalently, $\alpha \leftrightarrow \beta$ is a tautology.

*Notation.* Many textbooks use $\Leftrightarrow$ or $=$ for this relation; we use $\equiv$ consistently.

**Example 1.** Show $p \to q \equiv \neg p \vee q$.

*Solution.*
$$
\begin{array}{cc|c|c|c}
p & q & p \to q & \neg p & \neg p \vee q \\ \hline
\mathbf{T} & \mathbf{T} & \mathbf{T} & \mathbf{F} & \mathbf{T} \\
\mathbf{T} & \mathbf{F} & \mathbf{F} & \mathbf{F} & \mathbf{F} \\
\mathbf{F} & \mathbf{T} & \mathbf{T} & \mathbf{T} & \mathbf{T} \\
\mathbf{F} & \mathbf{F} & \mathbf{T} & \mathbf{T} & \mathbf{T}
\end{array}
$$
Columns 3 and 5 match, so $p \to q \equiv \neg p \vee q$. $\blacksquare$

### Properties of $\equiv$

$\equiv$ is an **equivalence relation** on WFFs:
- **Reflexive.** $\alpha \equiv \alpha$.
- **Symmetric.** $\alpha \equiv \beta \Rightarrow \beta \equiv \alpha$.
- **Transitive.** $\alpha \equiv \beta$ and $\beta \equiv \gamma$ imply $\alpha \equiv \gamma$.

More importantly, $\equiv$ is a **congruence** with respect to the connectives:

> **Theorem 4.2 (Replacement).** If $\alpha \equiv \beta$ and $\gamma'$ is obtained from $\gamma$ by replacing some (or all) occurrences of $\alpha$ in $\gamma$ by $\beta$, then $\gamma \equiv \gamma'$.

This is what licenses "algebraic" manipulation: we can simplify any subformula in place without affecting the global meaning. A proof proceeds by structural induction on $\gamma$.

## 4.2 The Standard Laws

The following equivalences hold for all WFFs $\alpha, \beta, \gamma$. Each can be verified by a truth table. Memorize them — they will drive every simplification.

### Idempotent laws
$$
\alpha \wedge \alpha \equiv \alpha \qquad \alpha \vee \alpha \equiv \alpha
$$

### Commutative laws
$$
\alpha \wedge \beta \equiv \beta \wedge \alpha \qquad \alpha \vee \beta \equiv \beta \vee \alpha \qquad \alpha \leftrightarrow \beta \equiv \beta \leftrightarrow \alpha
$$

### Associative laws
$$
(\alpha \wedge \beta) \wedge \gamma \equiv \alpha \wedge (\beta \wedge \gamma) \qquad (\alpha \vee \beta) \vee \gamma \equiv \alpha \vee (\beta \vee \gamma)
$$

### Distributive laws
$$
\alpha \wedge (\beta \vee \gamma) \equiv (\alpha \wedge \beta) \vee (\alpha \wedge \gamma)
$$
$$
\alpha \vee (\beta \wedge \gamma) \equiv (\alpha \vee \beta) \wedge (\alpha \vee \gamma)
$$
Unlike ordinary arithmetic, **both** directions distribute.

### Identity laws
$$
\alpha \wedge \top \equiv \alpha \qquad \alpha \vee \bot \equiv \alpha
$$

### Domination laws
$$
\alpha \vee \top \equiv \top \qquad \alpha \wedge \bot \equiv \bot
$$

### Double negation law
$$
\neg\neg \alpha \equiv \alpha
$$

### Negation laws (complement)
$$
\alpha \vee \neg \alpha \equiv \top \qquad \alpha \wedge \neg \alpha \equiv \bot
$$
($\alpha \vee \neg \alpha$: **excluded middle**. $\alpha \wedge \neg \alpha$: **non-contradiction**.)

### De Morgan's laws
$$
\neg(\alpha \wedge \beta) \equiv \neg\alpha \vee \neg\beta \qquad \neg(\alpha \vee \beta) \equiv \neg\alpha \wedge \neg\beta
$$

### Absorption laws
$$
\alpha \wedge (\alpha \vee \beta) \equiv \alpha \qquad \alpha \vee (\alpha \wedge \beta) \equiv \alpha
$$

### Implication law
$$
\alpha \to \beta \equiv \neg\alpha \vee \beta \qquad \alpha \to \beta \equiv \neg(\alpha \wedge \neg\beta)
$$

### Contrapositive
$$
\alpha \to \beta \equiv \neg\beta \to \neg\alpha
$$

### Biconditional decomposition
$$
\alpha \leftrightarrow \beta \equiv (\alpha \to \beta) \wedge (\beta \to \alpha)
$$
$$
\alpha \leftrightarrow \beta \equiv (\alpha \wedge \beta) \vee (\neg\alpha \wedge \neg\beta)
$$

### Exportation
$$
(\alpha \wedge \beta) \to \gamma \equiv \alpha \to (\beta \to \gamma)
$$

### Others worth knowing
$$
\neg(\alpha \to \beta) \equiv \alpha \wedge \neg\beta
$$
$$
(\alpha \to \gamma) \wedge (\beta \to \gamma) \equiv (\alpha \vee \beta) \to \gamma
$$
$$
(\alpha \to \beta) \wedge (\alpha \to \gamma) \equiv \alpha \to (\beta \wedge \gamma)
$$

## 4.3 The Duality Principle

> **Principle 4.3 (Duality).** Given an equivalence built only from $\wedge, \vee, \neg, \top, \bot$, exchanging $\wedge \leftrightarrow \vee$ and $\top \leftrightarrow \bot$ gives another equivalence.

This is visible above: each law usually comes in a $\wedge/\top$ version and a dual $\vee/\bot$ version. For example, De Morgan's two laws are duals of each other; so are the identity laws, the domination laws, and the distributive laws.

## 4.4 Using the Laws: Simplification

One uses equivalences to:
1. **Simplify** (reduce formula size).
2. **Convert** to normal forms ([[05-normal-forms-cnf-dnf]]).
3. **Prove tautology** without truth tables, by reducing to $\top$.

**Example 2.** Simplify $(p \wedge q) \vee (p \wedge \neg q)$.

*Solution.*
$$
\begin{aligned}
(p \wedge q) \vee (p \wedge \neg q) &\equiv p \wedge (q \vee \neg q) \qquad \text{(distributive)} \\
&\equiv p \wedge \top \qquad \text{(negation)} \\
&\equiv p. \qquad \text{(identity)}
\end{aligned}
$$
$\boxed{p}$. $\blacksquare$

**Example 3.** Simplify $\neg(p \to q) \vee (p \wedge q)$.

*Solution.*
$$
\begin{aligned}
\neg(p \to q) \vee (p \wedge q) &\equiv (p \wedge \neg q) \vee (p \wedge q) \qquad \text{(neg of impl)} \\
&\equiv p \wedge (\neg q \vee q) \qquad \text{(distributive)} \\
&\equiv p \wedge \top \qquad \text{(negation)} \\
&\equiv p.
\end{aligned}
$$
$\boxed{p}$. $\blacksquare$

**Example 4.** Show $(p \to q) \to (p \to (p \wedge q))$ is a tautology by equivalence reductions.

*Solution.*
$$
\begin{aligned}
(p \to q) \to (p \to (p \wedge q)) &\equiv (p \to q) \to (p \to p \wedge q) \\
&\equiv \neg(p \to q) \vee \neg p \vee (p \wedge q) \qquad \text{(impl, twice)} \\
&\equiv (p \wedge \neg q) \vee \neg p \vee (p \wedge q) \qquad \text{(neg of impl)} \\
&\equiv \neg p \vee (p \wedge q) \vee (p \wedge \neg q) \qquad \text{(comm)} \\
&\equiv \neg p \vee (p \wedge (q \vee \neg q)) \qquad \text{(distrib)} \\
&\equiv \neg p \vee (p \wedge \top) \qquad \text{(neg)} \\
&\equiv \neg p \vee p \qquad \text{(id)} \\
&\equiv \top. \qquad \text{(excl. mid.)}
\end{aligned}
$$
$\blacksquare$

**Example 5 (De Morgan for big conjunctions).** Show
$$
\neg(p_1 \wedge p_2 \wedge \cdots \wedge p_n) \equiv \neg p_1 \vee \neg p_2 \vee \cdots \vee \neg p_n.
$$

*Proof by induction on $n$.*
*Base $n=2$:* by De Morgan.
*Step:* Assume for $n$. For $n+1$:
$$
\neg(p_1 \wedge \cdots \wedge p_{n+1}) \equiv \neg((p_1 \wedge \cdots \wedge p_n) \wedge p_{n+1}) \equiv \neg(p_1 \wedge \cdots \wedge p_n) \vee \neg p_{n+1} \equiv (\neg p_1 \vee \cdots \vee \neg p_n) \vee \neg p_{n+1}.
$$
$\blacksquare$

## 4.5 Proving Inequivalence

To show $\alpha \not\equiv \beta$, find one valuation $v$ with $\bar v(\alpha) \ne \bar v(\beta)$ — a **counterexample**.

**Example 6.** $p \to q$ vs $q \to p$.

*Counterexample.* $p = \mathbf{F}, q = \mathbf{T}$: $p \to q = \mathbf{T}$, but $q \to p = \mathbf{F}$. So $p \to q \not\equiv q \to p$. $\blacksquare$

**Example 7.** $(p \vee q) \to r$ vs $(p \to r) \vee (q \to r)$.

*Counterexample.* $p = \mathbf{T}, q = \mathbf{F}, r = \mathbf{F}$: $(p \vee q) \to r = \mathbf{T} \to \mathbf{F} = \mathbf{F}$; but $p \to r = \mathbf{F}$, $q \to r = \mathbf{T}$, so disjunction $= \mathbf{T}$. $\blacksquare$ (Note: $(p \vee q) \to r \equiv (p \to r) \wedge (q \to r)$ is correct.)

## 4.6 Eliminating Connectives

Using equivalences, any WFF can be rewritten using only a functionally complete subset of connectives ([[01-propositions-connectives-truth-values]] §1.6). Standard eliminations:

- $\alpha \leftrightarrow \beta \equiv (\alpha \to \beta) \wedge (\beta \to \alpha)$ — eliminates $\leftrightarrow$ in favor of $\to, \wedge$.
- $\alpha \to \beta \equiv \neg\alpha \vee \beta$ — eliminates $\to$ in favor of $\neg, \vee$.
- $\alpha \wedge \beta \equiv \neg(\neg \alpha \vee \neg \beta)$ — eliminates $\wedge$ in favor of $\neg, \vee$.
- $\alpha \vee \beta \equiv \neg(\neg \alpha \wedge \neg \beta)$ — eliminates $\vee$ in favor of $\neg, \wedge$.

This justifies restricting normal-form discussion ([[05-normal-forms-cnf-dnf]]) to $\{\neg, \wedge, \vee\}$.

## 4.7 Worked Examples

**Example 8.** Show $(p \to q) \wedge (p \to r) \equiv p \to (q \wedge r)$.

*Proof.*
$$
\begin{aligned}
(p \to q) \wedge (p \to r) &\equiv (\neg p \vee q) \wedge (\neg p \vee r) \qquad \text{(impl)} \\
&\equiv \neg p \vee (q \wedge r) \qquad \text{(distrib)} \\
&\equiv p \to (q \wedge r). \qquad \text{(impl, reversed)}
\end{aligned}
$$
$\blacksquare$

**Example 9.** Simplify $\neg(p \vee \neg q) \wedge q$.

*Solution.*
$$
\neg(p \vee \neg q) \wedge q \equiv (\neg p \wedge q) \wedge q \equiv \neg p \wedge (q \wedge q) \equiv \neg p \wedge q.
$$
$\boxed{\neg p \wedge q}$. $\blacksquare$

**Example 10.** Is $((p \to q) \to r) \equiv (p \to (q \to r))$?

*Check.* $p = \mathbf{F}, q = \mathbf{F}, r = \mathbf{F}$: left $= (\mathbf{T}) \to \mathbf{F} = \mathbf{F}$; right $= \mathbf{F} \to (\cdots) = \mathbf{T}$. So **no**. $\to$ is *not* associative. $\blacksquare$

## 4.8 Summary

- $\alpha \equiv \beta$ means they have the same truth table, equivalently $\alpha \leftrightarrow \beta$ is a tautology.
- $\equiv$ is an **equivalence relation** and a **congruence** w.r.t. connectives (Replacement Theorem).
- Core laws: **idempotent, commutative, associative, distributive, identity, domination, double negation, negation, De Morgan, absorption, implication, contrapositive**.
- **Duality principle**: swap $\wedge \leftrightarrow \vee, \top \leftrightarrow \bot$ and the equivalence still holds.
- Use equivalences to simplify formulas, prove tautologies, eliminate connectives.
- $\alpha \not\equiv \beta$ proved by a single counterexample valuation.
- $\to$ is **not associative**; converse/inverse are not equivalent to original.

## Related Concepts

- [[02-wffs-and-truth-tables]] — the truth-table backdrop.
- [[03-tautologies-contradictions-satisfiability]] — $\equiv$ = "$\leftrightarrow$ is tautology".
- [[05-normal-forms-cnf-dnf]] — equivalences used for canonicalization.
- [[06-arguments-and-rules-of-inference]] — equivalences used in proof search.

## Sources

- [[raw/Lecture_Notes_on_Propositional_Logic]] — equivalence laws (Chapter 5).
