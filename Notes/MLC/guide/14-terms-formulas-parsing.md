---
title: "Terms, Formulas, and Parsing"
type: guide
module: "First-Order Logic"
file: 14
related: [13-predicates-and-quantifiers, 15-free-bound-substitutions, 16-interpretations-and-validity]
sources: [Lecture_Notes_1__on_First_Order_Logic]
---

# 14. Terms, Formulas, and Parsing

Chapter [[13-predicates-and-quantifiers]] introduced the *concepts* (predicates, terms, quantifiers). This chapter nails down the **precise syntax**: the grammar of FOL formulas, parse trees, scope of quantifiers, and the standard conventions for writing and reading FOL expressions.

## 14.1 First-Order Vocabulary

A **first-order vocabulary** (or **signature**) $\Sigma$ specifies:
- A set of **function symbols**, each with an **arity** $\ge 0$. A $0$-ary function symbol is a **constant**.
- A set of **predicate symbols**, each with an arity $\ge 0$.
- (Often) a special $2$-ary predicate $=$ for **equality**.

Different vocabularies yield different first-order languages. Examples:
- **Arithmetic**: $\Sigma = \{0, 1, +, \cdot, <\}$ — constants $0, 1$, binary functions $+, \cdot$, binary predicate $<$.
- **Group theory**: $\Sigma = \{e, \cdot, {}^{-1}\}$.
- **Set theory**: $\Sigma = \{\in\}$.
- **Order theory**: $\Sigma = \{\le\}$.

Beyond the vocabulary, every FOL language has a shared logical alphabet:
- **Variables**: $x, y, z, x_1, x_2, \dots$ (countably infinite).
- **Connectives**: $\neg, \wedge, \vee, \to, \leftrightarrow$.
- **Quantifiers**: $\forall, \exists$.
- **Punctuation**: $($, $)$, $,$.

## 14.2 Terms (Recursive Definition)

> **Definition 14.1 (Term).** The set of **$\Sigma$-terms** is defined recursively:
>
> $(T1)$ Every variable is a term.
>
> $(T2)$ Every constant is a term.
>
> $(T3)$ If $f$ is a $k$-ary function symbol and $t_1, \dots, t_k$ are terms, then $f(t_1, \dots, t_k)$ is a term.
>
> $(T4)$ Nothing else is a term.

**Example 1.** In arithmetic ($\Sigma = \{0, 1, +, \cdot\}$):
- Terms: $0$, $1$, $x$, $y$, $+(x, y)$ (written $x + y$), $\cdot(x, +(y, 1))$ (written $x \cdot (y + 1)$), $+(x, +(x, 0))$.
- Not terms: $x < y$ (uses predicate, not function), $+(x)$ (wrong arity), $\forall x$ (quantifier).

Terms **denote objects** (numbers, in the arithmetic example), not truth values.

## 14.3 Atomic Formulas

> **Definition 14.2 (Atomic Formula).** An **atomic formula** is:
> - $P(t_1, \dots, t_k)$ where $P$ is a $k$-ary predicate symbol and $t_1, \dots, t_k$ are terms.
> - $t_1 = t_2$ when equality is in the language.

Atomic formulas are the "leaves" of formula parse trees.

**Example 2.** In arithmetic with $<$ and $=$:
- Atomic: $x < y$, $x = 0$, $x + y = x \cdot 1$, $1 < x + 1$.
- Not atomic: $x$ (only a term), $\neg x < y$ (uses $\neg$), $x + y$ (only a term).

## 14.4 Well-Formed Formulas (FOL WFFs)

> **Definition 14.3 (WFF of FOL).** The set of **well-formed formulas** is the smallest set closed under:
>
> $(B)$ Every atomic formula is a WFF.
>
> $(R1)$ If $\varphi$ is a WFF, so is $(\neg \varphi)$.
>
> $(R2)$ If $\varphi, \psi$ are WFFs, so are $(\varphi \wedge \psi), (\varphi \vee \psi), (\varphi \to \psi), (\varphi \leftrightarrow \psi)$.
>
> $(R3)$ If $\varphi$ is a WFF and $x$ a variable, so are $(\forall x\, \varphi)$ and $(\exists x\, \varphi)$.
>
> $(C)$ Nothing else is a WFF.

**Example 3.** With predicates $P$ (unary) and $L$ (binary), some WFFs:
- $P(x)$
- $\neg P(x)$
- $L(x, y) \to P(x)$
- $\forall x\, P(x)$
- $\exists y\, (P(y) \wedge L(x, y))$
- $\forall x\, (P(x) \to \exists y\, L(x, y))$

**Non-WFFs:**
- $P \to Q$ (not predicates applied to terms).
- $\forall P(x)$ (quantifying over a predicate — not allowed in FOL).
- $\forall x\, x$ (the body is a term, not a formula).

## 14.5 Parenthesis Conventions

As in propositional logic, we drop redundant parentheses using precedence:
$$
\neg \text{ and quantifiers (tightest)} > \wedge > \vee > \to > \leftrightarrow.
$$

Additionally:
- Quantifiers bind the **smallest possible** following formula.
- $\forall x\, \varphi \wedge \psi$ parses as $(\forall x\, \varphi) \wedge \psi$, **not** $\forall x\, (\varphi \wedge \psi)$.
- To make the quantifier scope explicit, use parens: $\forall x\, (\varphi \wedge \psi)$.

**Example 4.**
- $\forall x\, P(x) \wedge Q(x)$ parses as $(\forall x\, P(x)) \wedge Q(x)$. The $x$ in $Q(x)$ is free.
- $\forall x\, (P(x) \wedge Q(x))$: the $x$ in both $P$ and $Q$ is bound.

## 14.6 Parse Trees

Every WFF has a unique parse tree (Unique Readability Theorem for FOL). Leaves are variables or constants; internal nodes are function symbols, predicates, connectives, or quantifiers.

**Example 5.** Parse tree of $\forall x\, (P(x) \to \exists y\, (Q(x, y) \wedge R(y)))$:

```
            ∀x
              \
               →
              / \
            P    ∃y
            |     \
            x      ∧
                  / \
                 Q   R
                / \  |
               x  y  y
```

Main connective at each quantifier: the quantifier itself. Within $P(x) \to \exists y\, (\dots)$, main connective is $\to$.

## 14.7 Scope of a Quantifier

> **Definition 14.4 (Scope).** The **scope** of a quantifier $\forall x$ or $\exists x$ is the (sub)formula $\varphi$ immediately following it in $\forall x\, \varphi$ or $\exists x\, \varphi$.

Scope determines which occurrences of $x$ are bound. Understanding scope is critical for correct substitution ([[15-free-bound-substitutions]]).

**Example 6.** In $(\forall x\, P(x)) \wedge Q(x)$:
- Scope of $\forall x$ is $P(x)$.
- The $x$ in $Q(x)$ is **outside** the scope — hence free.

## 14.8 Subformulas

> **Definition 14.5 (Subformula).** The subformulas of a WFF are all formulas appearing in its parse tree, including itself.

**Example 7.** Subformulas of $\forall x\, (P(x) \to Q(x))$:
- $\forall x\, (P(x) \to Q(x))$
- $P(x) \to Q(x)$
- $P(x)$
- $Q(x)$

## 14.9 Structural Induction on FOL Formulas

> **Principle 14.6.** To prove a property $\Phi$ holds for every FOL WFF:
>
> - **Base.** $\Phi(\alpha)$ for every atomic $\alpha$.
> - **Step.** Assuming $\Phi(\varphi), \Phi(\psi)$: prove $\Phi(\neg\varphi), \Phi(\varphi \wedge \psi), \Phi(\varphi \vee \psi), \Phi(\varphi \to \psi), \Phi(\varphi \leftrightarrow \psi), \Phi(\forall x\, \varphi), \Phi(\exists x\, \varphi)$.

Typical uses: prove every WFF has balanced parentheses; prove every WFF has finitely many subformulas; prove a semantic claim by induction.

**Example 8.** Prove: every FOL WFF has the same number of left and right parentheses.

*Proof.* Structural induction. Atomic: $P(t_1, \dots, t_k)$ has one of each. Negation: $(\neg\varphi)$ has $L(\varphi) + 1 = R(\varphi) + 1$. Binary and quantifier cases analogous. $\blacksquare$

## 14.10 Terms vs Formulas: A Critical Distinction

A **term** denotes an **object**; a **formula** denotes a **truth value** (given an interpretation). Conflating them is a common error:
- $x + y$ — term.
- $x + y = 5$ — formula (atomic).
- $\forall x\, (x + y)$ — **not a WFF** (quantifier needs a formula body, not a term).
- $\forall x\, (x + y = 5)$ — WFF.

Predicate symbols take terms; they **produce** atomic formulas. Connectives and quantifiers take formulas and produce formulas.

## 14.11 Languages With and Without Equality

**Equality** $=$ is often (but not always) part of the logical vocabulary:
- Classical FOL often assumes $=$ is built in with fixed semantics (reflexive, symmetric, transitive, congruent).
- Some presentations treat $=$ as a predicate symbol subject to explicit axioms.

In either case, a formula like $\forall x\, (x = x)$ is a logical validity ("law of reflexivity").

## 14.12 Worked Examples

**Example 9.** Identify the main connective and scope:

$\forall x\, \exists y\, (P(x, y) \to \forall z\, Q(y, z))$.

*Answer.* Main connective: $\forall x$. Scope: $\exists y\, (P(x, y) \to \forall z\, Q(y, z))$.
- Inside that: $\exists y$ binds $y$ with scope $P(x, y) \to \forall z\, Q(y, z)$.
- $\forall z$ binds $z$ with scope $Q(y, z)$.

**Example 10.** Is $\forall x\, P(x) \to Q(y)$ the same as $\forall x\, (P(x) \to Q(y))$?

*Answer.* Yes, as formulas, they are **logically equivalent** when $x$ does not appear in $Q(y)$ (which it doesn't, so the $\forall$ has vacuous scope over $Q(y)$). But syntactically they parse differently: the first is $(\forall x\, P(x)) \to Q(y)$. Under standard convention, $(\forall x\, P(x)) \to Q(y)$ is the default parse. $\blacksquare$

**Example 11.** Translate $\forall x\, (x \in A \to \exists y\, (y \in B \wedge f(x) = y))$ to English.

*Answer.* "For every $x$ in $A$, there is a $y$ in $B$ with $f(x) = y$" — i.e., the image of $A$ under $f$ is contained in $B$.

**Example 12.** Determine which variables are free in $\forall y\, (R(x, y) \to \exists x\, Q(x, z))$.

*Answer.*
- Outer $\forall y$ binds $y$.
- Inner $\exists x$ binds the inner $x$. But the **outer** $x$ in $R(x, y)$ is **not** in the scope of $\exists x$ — it is free.
- $z$ is free.

Free variables: $x, z$. Bound variables: $y$ (by $\forall y$), inner $x$ (by $\exists x$).

This example illustrates that the same variable letter can appear both free and bound in the same formula — a confusing but legal situation, handled carefully by α-renaming ([[15-free-bound-substitutions]]).

## 14.13 Summary

- FOL **signature**: function symbols (with arities, including constants) + predicate symbols + (optionally) $=$.
- **Terms**: built recursively from variables, constants, function applications; denote objects.
- **Atomic formulas**: $P(t_1, \dots, t_k)$ or $t_1 = t_2$.
- **WFFs**: atomic + connectives + quantifiers.
- **Scope** of a quantifier is the formula immediately following it.
- Standard **precedence**: $\neg$/$\forall$/$\exists$ > $\wedge$ > $\vee$ > $\to$ > $\leftrightarrow$.
- Every FOL WFF has a unique parse tree (**Unique Readability**).
- **Structural induction** proves properties over all FOL WFFs.

## Related Concepts

- [[13-predicates-and-quantifiers]] — conceptual introduction.
- [[15-free-bound-substitutions]] — variable management under substitution.
- [[16-interpretations-and-validity]] — FOL semantics.
- [[02-wffs-and-truth-tables]] — the propositional analogue of WFFs.

## Sources

- [[raw/Lecture_Notes_1__on_First_Order_Logic]] — terms, formulas, parsing (Section 2).
