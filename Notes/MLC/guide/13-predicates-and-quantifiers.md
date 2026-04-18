---
title: "Predicates and Quantifiers"
type: guide
module: "First-Order Logic"
file: 13
related: [14-terms-formulas-parsing, 15-free-bound-substitutions, 16-interpretations-and-validity, 17-module3-practice-problems]
sources: [Lecture_Notes_1__on_First_Order_Logic]
---

# 13. Predicates and Quantifiers

Propositional logic treats every proposition as an opaque atomic unit. "All humans are mortal" and "Socrates is mortal" together imply "Socrates is a mortal" — but this argument is **invisible** to propositional logic because the internal structure ("human", "mortal") is hidden. First-order logic fixes this by exposing internal structure: **predicates** (properties and relations), **terms** (objects, possibly described), and **quantifiers** ($\forall, \exists$) binding over a domain of discourse.

## 13.1 Motivation

Consider the inference:
- All humans are mortal.
- Socrates is a human.
- Therefore, Socrates is mortal.

Propositional logic cannot capture this: each sentence looks like an atomic variable $p, q, r$, and $\{p, q\} \vdash r$ is invalid in general.

First-order logic (FOL) models the argument as:
- $\forall x\, (H(x) \to M(x))$ — "for every $x$, if $x$ is human, then $x$ is mortal".
- $H(s)$ — "Socrates is human", where $s$ is a constant.
- Infer $M(s)$ — "Socrates is mortal".

The validity now turns on a new inference principle, **universal instantiation**: from $\forall x\, \varphi(x)$, infer $\varphi(t)$ for any term $t$.

## 13.2 Predicates

> **Definition 13.1 (Predicate).** A **predicate symbol** $P$ has an associated **arity** $k \ge 0$. When applied to $k$ **terms** $t_1, \dots, t_k$, the expression $P(t_1, \dots, t_k)$ is an **atomic formula** — the first-order analogue of a propositional variable.

- A $0$-ary predicate is essentially a propositional variable (always takes no arguments).
- A $1$-ary predicate expresses a **property**: $H(x)$ = "$x$ is human".
- A $2$-ary predicate expresses a **binary relation**: $L(x, y)$ = "$x$ loves $y$".
- Higher arities express higher relations.

*Notation conventions.*
- Predicate symbols: uppercase $P, Q, R, H, M, L, \dots$
- Arity is fixed per symbol: once $L$ is introduced as binary, we cannot write $L(x)$ or $L(x,y,z)$.

## 13.3 Terms

> **Definition 13.2 (Term).** The set of **terms** is defined recursively:
> - Every **variable** $x, y, z, \dots$ is a term.
> - Every **constant** $a, b, c, \dots$ (or $0$-ary function symbol) is a term.
> - If $f$ is a $k$-ary function symbol and $t_1, \dots, t_k$ are terms, then $f(t_1, \dots, t_k)$ is a term.

Terms denote **objects** in the domain. Variables are placeholders for arbitrary objects; constants name specific objects; function-applications build new object-descriptions from old.

**Examples of terms.**
- Variables: $x, y, z$.
- Constants: $0, 1, \pi, \text{Socrates}$.
- Function applications: $f(x)$, $g(x, y)$, $x + y$ (i.e., $+(x, y)$ infix), $\sin(x)$, $f(g(x, y), z)$.

Terms **are not** formulas — they have no truth value, they just name things. Only applying a predicate to terms produces a formula.

## 13.4 The Quantifiers

### Universal quantifier

> **Definition 13.3.** The formula $\forall x\, \varphi(x)$ is true under an interpretation iff $\varphi(x)$ is true for **every** value of $x$ in the domain.

Readings: "for all $x$, $\varphi(x)$"; "for every $x$, $\varphi$"; "$\varphi$ holds universally".

### Existential quantifier

> **Definition 13.4.** The formula $\exists x\, \varphi(x)$ is true iff $\varphi(x)$ is true for **at least one** value of $x$ in the domain.

Readings: "there exists $x$ such that $\varphi$"; "for some $x$, $\varphi$"; "$\varphi$ is satisfiable in $x$".

### Duality

> **Proposition 13.5 (Quantifier duality).**
> $$
> \neg \forall x\, \varphi \equiv \exists x\, \neg\varphi \qquad \neg \exists x\, \varphi \equiv \forall x\, \neg\varphi
> $$

"Not all are" ≡ "some isn't"; "none are" ≡ "all aren't". These are the **De Morgan laws for quantifiers** and extend De Morgan laws for $\wedge/\vee$.

Consequence: $\exists x$ is definable from $\forall x$ and $\neg$ (or vice versa), so only one of the two quantifiers is strictly needed.

## 13.5 Bound and Free Variables

> **Definition 13.6.** In $\forall x\, \varphi$ or $\exists x\, \varphi$, the variable $x$ is **bound**. Other occurrences of $x$ within $\varphi$ fall under the scope of the quantifier and are also bound. Variables that are not bound are **free**.

(Full treatment in [[15-free-bound-substitutions]].)

**Example 1.** In $\forall x\, (P(x) \to Q(x, y))$:
- $x$ is bound.
- $y$ is free.

**Example 2.** In $\exists x\, P(x) \wedge Q(x)$:
- The first $x$ (in $P(x)$) is bound by $\exists x$.
- The second $x$ (in $Q(x)$) is **free** — its scope is not under the quantifier (assuming no implicit parentheses).

Parentheses matter. $\exists x\, (P(x) \wedge Q(x))$ binds both; without the parenthesis, only the first.

## 13.6 Sentences and Open Formulas

- A **sentence** is a formula with no free variables; it has a definite truth value under any interpretation.
- An **open formula** has at least one free variable; its truth value depends on the assignment to free variables.

**Example 3.**
- $\forall x\, (P(x) \to Q(x))$ — sentence.
- $P(x) \to Q(x)$ — open formula (free $x$).
- $\forall x\, (P(x) \to Q(x, y))$ — open formula (free $y$).
- $\exists x\, \forall y\, R(x, y)$ — sentence.

Only sentences can be called "true" or "false" simpliciter. For open formulas we specify assignments.

## 13.7 Translating English into FOL

The classical exercise: turning natural language into first-order formulas.

### Templates

- "All $A$s are $B$": $\forall x\, (A(x) \to B(x))$.
- "Some $A$ is $B$": $\exists x\, (A(x) \wedge B(x))$.
- "No $A$ is $B$": $\forall x\, (A(x) \to \neg B(x))$, equivalently $\neg \exists x\, (A(x) \wedge B(x))$.
- "Not all $A$s are $B$": $\neg \forall x\, (A(x) \to B(x))$, equivalently $\exists x\, (A(x) \wedge \neg B(x))$.

**Warning.** The combinations to memorize:
- "All $A$s are $B$" uses $\to$ inside $\forall$ (not $\wedge$). Otherwise $\forall x\, (A(x) \wedge B(x))$ asserts everything is both $A$ and $B$.
- "Some $A$ is $B$" uses $\wedge$ inside $\exists$ (not $\to$). Otherwise $\exists x\, (A(x) \to B(x))$ is vacuously true when some $x$ isn't $A$.

**Example 4.** Translate:
- $(a)$ "Every cat is a mammal." $\forall x\, (C(x) \to M(x))$.
- $(b)$ "Some mammals are not cats." $\exists x\, (M(x) \wedge \neg C(x))$.
- $(c)$ "No cat is a fish." $\forall x\, (C(x) \to \neg F(x))$.
- $(d)$ "Every student has a teacher." $\forall x\, (S(x) \to \exists y\, (T(y) \wedge H(x, y)))$, where $H(x, y)$ = "$x$ has $y$".
- $(e)$ "There is a student who has every teacher." $\exists x\, (S(x) \wedge \forall y\, (T(y) \to H(x, y)))$.

### Quantifier nesting

Word order matters:
- "Everyone loves someone": $\forall x\, \exists y\, L(x, y)$.
- "Someone loves everyone": $\exists x\, \forall y\, L(x, y)$.

These are **not** equivalent: the first allows each person to love a different someone; the second says one person loves all.

**Example 5.** Translate:
- "For every integer there is a larger integer": $\forall x\, \exists y\, (x < y)$.
- "There is a smallest integer": $\exists x\, \forall y\, (x \le y)$ — false for $\mathbb{Z}$, true for $\mathbb{N}$.
- "Every integer has a unique successor": $\forall x\, \exists! y\, (y = x + 1)$ (using the uniqueness-shorthand $\exists!$).

*Uniqueness.* $\exists! x\, \varphi(x)$ abbreviates $\exists x\, (\varphi(x) \wedge \forall y\, (\varphi(y) \to y = x))$.

## 13.8 Restricted (Bounded) Quantifiers

In number theory and set theory, quantifiers often range over a subset. Abbreviations:

- $\forall x \in A\, \varphi$ means $\forall x\, (x \in A \to \varphi)$.
- $\exists x \in A\, \varphi$ means $\exists x\, (x \in A \wedge \varphi)$.
- $\forall x < n\, \varphi$ means $\forall x\, (x < n \to \varphi)$.
- $\exists x > 0\, \varphi$ means $\exists x\, (x > 0 \wedge \varphi)$.

**Example 6.** "Every prime greater than $2$ is odd": $\forall p > 2\, (P(p) \to O(p))$, unpacked to $\forall p\, (p > 2 \to (P(p) \to O(p)))$.

## 13.9 FOL's Limits: What It Captures

FOL handles properties, relations, and quantification over individuals. It does **not** directly handle:
- **Quantification over predicates** (second-order logic): e.g., "for every property $P$, $\dots$".
- **Finiteness** in a single sentence (no FOL sentence has exactly the finite models as models).
- **Transitive closure** without schemas (FOL cannot express "$x$ is reachable from $y$" in general graph).

These are serious expressiveness limits, but FOL compensates with a proof theory, semantics, and metatheorems (soundness, completeness, compactness, Löwenheim-Skolem) that generalize the propositional story to an enormously wider universe of mathematical reasoning.

## 13.10 Worked Examples

**Example 7.** Translate "All roses are red or white.":
- $\forall x\, (R(x) \to (\text{Red}(x) \vee \text{White}(x)))$.

**Example 8.** Translate "There exist two distinct even primes." — a deliberately false claim.
- $\exists x\, \exists y\, (x \ne y \wedge P(x) \wedge P(y) \wedge E(x) \wedge E(y))$.

**Example 9.** Translate the axiom of infinity (loosely): "There is a set which contains the empty set, and for every element it contains, it also contains that element's successor."
- $\exists S\, (\emptyset \in S \wedge \forall x\, (x \in S \to \text{succ}(x) \in S))$.

**Example 10.** Convert to English: $\forall x\, (P(x) \to \exists y\, (Q(x, y) \wedge R(y)))$.
- "Every $P$-object has a $Q$-related $R$-object."
- Or concretely: "For every $x$ with property $P$, there is some $y$ with $R$ such that $x$ is $Q$-related to $y$."

## 13.11 Summary

- **Predicates** $P(x_1, \dots, x_k)$ are $k$-ary relation symbols applied to terms.
- **Terms** are variables, constants, or function applications.
- **Quantifiers**: $\forall x\, \varphi$ (for all), $\exists x\, \varphi$ (there exists).
- **Duality**: $\neg\forall x\, \varphi \equiv \exists x\, \neg\varphi$, $\neg\exists x\, \varphi \equiv \forall x\, \neg\varphi$.
- **Bound** vs **free** variables; **sentences** have no free variables.
- Standard templates: "all $A$s are $B$" uses $\forall \to$; "some $A$ is $B$" uses $\exists \wedge$.
- Quantifier order matters: $\forall \exists \ne \exists \forall$.
- **Bounded quantifiers**: $\forall x \in A, \exists x \in A$.

## Related Concepts

- [[14-terms-formulas-parsing]] — precise syntax of terms and formulas.
- [[15-free-bound-substitutions]] — managing free/bound variables under substitution.
- [[16-interpretations-and-validity]] — semantics of quantifiers.
- [[01-propositions-connectives-truth-values]] — propositional logic, now subsumed.

## Sources

- [[raw/Lecture_Notes_1__on_First_Order_Logic]] — predicates, quantifiers (Section 1).
