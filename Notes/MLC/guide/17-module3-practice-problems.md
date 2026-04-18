---
title: "Module 3 Practice Problems (First-Order Logic)"
type: guide
module: "First-Order Logic"
file: 17
related: [13-predicates-and-quantifiers, 14-terms-formulas-parsing, 15-free-bound-substitutions, 16-interpretations-and-validity]
sources: [Lecture_Notes_1__on_First_Order_Logic]
---

# 17. Module 3 Practice Problems (First-Order Logic)

Drills on the FOL content of files 13–16: translation, parsing, free/bound variables, admissibility of substitutions, and validity.

## 17.1 Part A — Translation

**Problem 1.** With $S(x) = $ "$x$ is a student", $C(x) = $ "$x$ takes calculus", $P(x) = $ "$x$ is punctual", translate:
- $(a)$ "Every student takes calculus."
- $(b)$ "Some student does not take calculus."
- $(c)$ "No punctual student takes calculus."
- $(d)$ "Not every student is punctual."
- $(e)$ "Only students take calculus."

**Problem 2.** With $L(x, y) = $ "$x$ likes $y$", translate:
- $(a)$ "Everyone likes someone."
- $(b)$ "Someone is liked by everyone."
- $(c)$ "Nobody likes everyone."
- $(d)$ "There is exactly one person liked by Alice."
- $(e)$ "Anyone who likes Bob is liked by Carol."

**Problem 3.** Translate into FOL: "For every $\epsilon > 0$ there is $\delta > 0$ such that for all $x$, if $0 < |x - c| < \delta$ then $|f(x) - L| < \epsilon$." (Continuity/limit definition.)

## 17.2 Part B — Free and Bound Variables

**Problem 4.** In each formula, list free and bound variables:
- $(a)$ $\forall x\, (P(x, y) \to \exists z\, Q(y, z))$
- $(b)$ $(\forall x\, P(x)) \wedge P(x)$
- $(c)$ $\exists y\, \forall x\, R(x, y, z)$
- $(d)$ $\forall x\, \exists y\, (x \ne y \wedge R(x, y, x))$

**Problem 5.** Is the formula $\forall x\, \exists y\, R(x, y, z) \wedge P(x)$ a sentence?

## 17.3 Part C — Substitutions

**Problem 6.** Compute each substitution; identify whether admissible:
- $(a)$ $\varphi = P(x, y), \ t = f(z), \ x := t$. Compute $\varphi[t/x]$.
- $(b)$ $\varphi = \forall y\, P(x, y), \ t = y, \ x := t$. Admissible?
- $(c)$ $\varphi = \exists x\, (x < y), \ t = x, \ y := t$. Admissible?
- $(d)$ $\varphi = \forall x\, \exists y\, R(x, y, z), \ t = x, \ z := t$. Admissible?

**Problem 7.** For the inadmissible cases in Problem 6, perform α-renaming and complete the substitution safely.

## 17.4 Part D — Validity and Counterexamples

**Problem 8.** Classify as valid / satisfiable but not valid / unsatisfiable:
- $(a)$ $\forall x\, P(x) \to P(c)$ for a constant $c$.
- $(b)$ $\forall x\, P(x) \to \exists x\, P(x)$.
- $(c)$ $\exists x\, P(x) \to \forall x\, P(x)$.
- $(d)$ $\forall x\, (P(x) \vee Q(x)) \to (\forall x\, P(x) \vee \forall x\, Q(x))$.
- $(e)$ $(\forall x\, P(x) \vee \forall x\, Q(x)) \to \forall x\, (P(x) \vee Q(x))$.
- $(f)$ $\forall x\, (P(x) \wedge Q(x)) \leftrightarrow (\forall x\, P(x) \wedge \forall x\, Q(x))$.

**Problem 9.** Decide entailment; prove or give a counterexample:
- $(a)$ $\{\forall x\, (P(x) \to Q(x)), \forall x\, P(x)\} \models \forall x\, Q(x)$
- $(b)$ $\{\exists x\, P(x), \exists x\, Q(x)\} \models \exists x\, (P(x) \wedge Q(x))$
- $(c)$ $\{\forall x\, P(x), \exists x\, Q(x)\} \models \exists x\, (P(x) \wedge Q(x))$
- $(d)$ $\{\forall x\, \exists y\, R(x, y)\} \models \exists y\, \forall x\, R(x, y)$

**Problem 10.** Prove $\forall x\, (P(x) \to Q(x)) \not\models \forall x\, P(x) \to \forall x\, Q(x)$? (Trick — this is valid; see Example 9 in [[16-interpretations-and-validity]]. The opposite direction $\forall x\, P(x) \to \forall x\, Q(x) \not\models \forall x\, (P(x) \to Q(x))$ is a counterexample problem — which is it here?)

## 17.5 Part E — FOL Equivalences

**Problem 11.** Prove $\neg \forall x\, P(x) \equiv \exists x\, \neg P(x)$ semantically.

**Problem 12.** Rewrite $\forall x\, \neg(P(x) \wedge Q(x))$ using $\exists$.

**Problem 13.** Is $\forall x\, (P(x) \to Q)$ equivalent to $(\exists x\, P(x)) \to Q$ when $x$ is not free in $Q$? Prove or disprove.

---

## Solutions

**Problem 1.**
- $(a)$ $\forall x\, (S(x) \to C(x))$.
- $(b)$ $\exists x\, (S(x) \wedge \neg C(x))$.
- $(c)$ $\forall x\, ((P(x) \wedge S(x)) \to \neg C(x))$, equivalently $\neg\exists x\, (P(x) \wedge S(x) \wedge C(x))$.
- $(d)$ $\neg \forall x\, (S(x) \to P(x))$, equivalently $\exists x\, (S(x) \wedge \neg P(x))$.
- $(e)$ "Only students take calculus" = "if $x$ takes calculus, $x$ is a student" = $\forall x\, (C(x) \to S(x))$.

**Problem 2.**
- $(a)$ $\forall x\, \exists y\, L(x, y)$.
- $(b)$ $\exists y\, \forall x\, L(x, y)$.
- $(c)$ $\neg \exists x\, \forall y\, L(x, y)$, equivalently $\forall x\, \exists y\, \neg L(x, y)$.
- $(d)$ Let $a$ = Alice. $\exists y\, (L(a, y) \wedge \forall z\, (L(a, z) \to z = y))$, i.e., $\exists! y\, L(a, y)$.
- $(e)$ $\forall x\, (L(x, b) \to L(c, x))$ where $b, c$ are constants for Bob, Carol.

**Problem 3.** $\forall \epsilon\, (\epsilon > 0 \to \exists \delta\, (\delta > 0 \wedge \forall x\, ((0 < |x - c| \wedge |x - c| < \delta) \to |f(x) - L| < \epsilon)))$.

**Problem 4.**
- $(a)$ Free: $y$. Bound: $x, z$.
- $(b)$ $(\forall x\, P(x)) \wedge P(x)$: first $x$ bound (in the quantifier), second $x$ free.
- $(c)$ Free: $z$. Bound: $x, y$.
- $(d)$ Free: none. Bound: $x, y$. This is a sentence.

**Problem 5.** $\forall x\, \exists y\, R(x, y, z) \wedge P(x)$. Parsed with $\forall x$ scoping only the first conjunct: $(\forall x\, \exists y\, R(x, y, z)) \wedge P(x)$. Then the $x$ in $P(x)$ is free, as is $z$. **Not a sentence.**

**Problem 6.**
- $(a)$ $\varphi[f(z)/x] = P(f(z), y)$. FV of $t = \{z\}$; no bound $z$ in $\varphi$. **Admissible.**
- $(b)$ $\varphi = \forall y\, P(x, y)$; $t = y$. Free $x$ inside scope of $\forall y$; $y \in$ FV$(t)$. **Inadmissible.**
- $(c)$ $\varphi = \exists x\, (x < y)$; $t = x$; substituting for $y$. Free $y$ inside $\exists x$; $x \in$ FV$(t)$. **Inadmissible.**
- $(d)$ $\varphi = \forall x\, \exists y\, R(x, y, z)$; $t = x$; substituting for $z$. Free $z$ inside both $\forall x$ and $\exists y$; $x \in$ FV$(t)$, captured by $\forall x$. **Inadmissible.**

**Problem 7.**
- $(b)$ α-rename $\forall y$ to $\forall w$: $\forall w\, P(x, w)$. Substitute: $\forall w\, P(y, w)$.
- $(c)$ α-rename $\exists x$ to $\exists w$: $\exists w\, (w < y)$. Substitute: $\exists w\, (w < x)$.
- $(d)$ α-rename $\forall x$ to $\forall w$: $\forall w\, \exists y\, R(w, y, z)$. Substitute: $\forall w\, \exists y\, R(w, y, x)$.

**Problem 8.**
- $(a)$ Valid. Universal instantiation.
- $(b)$ Valid (nonempty domain).
- $(c)$ Satisfiable but not valid. E.g., $M = \{0, 1\}$, $P = \{0\}$: $\exists x\, P(x)$ true, $\forall x\, P(x)$ false.
- $(d)$ Satisfiable but not valid. $M = \{0, 1\}$, $P = \{0\}$, $Q = \{1\}$: $\forall x\, (P(x) \vee Q(x))$ true but $\forall x\, P(x) \vee \forall x\, Q(x)$ false.
- $(e)$ Valid. If some $x$ is in $P$ for all $x$, then each $x$ satisfies $P \vee Q$. Similarly for $Q$.
- $(f)$ Valid. Distributivity of $\forall$ over $\wedge$.

**Problem 9.**
- $(a)$ **Yes.** For any $\mathcal{M}$ satisfying both premises, and any $a$: $P(a)$ (from second), $P(a) \to Q(a)$ (from first); MP gives $Q(a)$.
- $(b)$ **No.** Counterexample: $M = \{1, 2\}$, $P = \{1\}$, $Q = \{2\}$. Premises true, but no $x$ is in both $P$ and $Q$.
- $(c)$ **Yes.** Pick any $a$ with $Q(a)$; by first premise, $P(a)$; so $P(a) \wedge Q(a)$, hence $\exists x\, (P(x) \wedge Q(x))$.
- $(d)$ **No.** Counterexample: $\mathcal{N} = (\mathbb{N}, <)$, $R(x, y) := x < y$. LHS true, RHS false (no $y$ is larger than every $x$).

**Problem 10.** The direction stated ($\forall x\, (P \to Q) \models \forall x\, P \to \forall x\, Q$) is **valid** — see [[16-interpretations-and-validity]] Example 9. The question is asking about a *possibly* invalid direction, reversed.

The reverse, $\forall x\, P(x) \to \forall x\, Q(x) \models \forall x\, (P(x) \to Q(x))$, is **not valid**.

*Counterexample for the reverse.* $M = \{1, 2\}$, $P = \{1\}$, $Q = \emptyset$. Then $\forall x\, P(x)$ false, so $\forall x\, P(x) \to \forall x\, Q(x)$ vacuously true. But $P(1)$ true, $Q(1)$ false, so $P(1) \to Q(1)$ false, so $\forall x\, (P(x) \to Q(x))$ false.

**Problem 11.** $\mathcal{M} \models \neg \forall x\, P(x) \iff \mathcal{M} \not\models \forall x\, P(x) \iff$ some $a \in M$ with $\mathcal{M} \not\models P(a) \iff \mathcal{M} \models \exists x\, \neg P(x)$. $\blacksquare$

**Problem 12.** $\forall x\, \neg(P(x) \wedge Q(x)) \equiv \forall x\, (\neg P(x) \vee \neg Q(x)) \equiv \neg \exists x\, (P(x) \wedge Q(x))$. Or directly: $\forall x\, \neg(P \wedge Q)$ equals "no $x$ has both"; $\neg \exists x\, (P \wedge Q)$ equals the same. $\blacksquare$

**Problem 13.** Yes, valid (when $x$ not free in $Q$). Proved in [[16-interpretations-and-validity]] Example 11. $\blacksquare$

---

## Summary

- "All $A$ are $B$" uses $\forall \to$; "some $A$ is $B$" uses $\exists \wedge$.
- Scope determines binding; same variable letter can be free and bound.
- Admissibility: free variables of the substitutand must not be captured.
- α-rename first, then substitute.
- $\forall \exists \ne \exists \forall$.
- $\forall$ distributes over $\wedge$, $\exists$ over $\vee$; other distributions need "$x$ not free" side conditions.
- Many semantic facts resolve by direct unpacking of $\models$.

## Related Concepts

- Files [[13-predicates-and-quantifiers]] – [[16-interpretations-and-validity]].

## Sources

- [[raw/Lecture_Notes_1__on_First_Order_Logic]].
