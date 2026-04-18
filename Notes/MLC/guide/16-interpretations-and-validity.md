---
title: "Interpretations and Validity"
type: guide
module: "First-Order Logic"
file: 16
related: [13-predicates-and-quantifiers, 14-terms-formulas-parsing, 15-free-bound-substitutions, 17-module3-practice-problems]
sources: [Lecture_Notes_1__on_First_Order_Logic]
---

# 16. Interpretations and Validity

First-order semantics answers: "What does a formula **mean**?" A formula is a syntactic object; it needs an **interpretation** to become a statement about some concrete world. This chapter defines structures (interpretations), assignments, the satisfaction relation $\models$, validity, and first-order equivalences involving quantifiers.

## 16.1 Structures (Interpretations)

> **Definition 16.1 (Structure / Interpretation).** A **structure** (or **interpretation**) for a signature $\Sigma$ is a tuple $\mathcal{M} = (M, I)$ where:
> - $M$ is a nonempty set, the **domain** (or **universe**) of the structure.
> - $I$ assigns meanings:
>   - To each constant $c \in \Sigma$, an element $I(c) \in M$.
>   - To each $k$-ary function symbol $f$, a function $I(f): M^k \to M$.
>   - To each $k$-ary predicate symbol $P$, a relation $I(P) \subseteq M^k$.

Often we write $c^{\mathcal{M}}, f^{\mathcal{M}}, P^{\mathcal{M}}$ for the interpretations.

**Example 1.** $\Sigma = \{0, 1, +, \cdot, <\}$ (arithmetic). One structure:
- $\mathcal{M} = (\mathbb{N}, +, \cdot, 0, 1, <)$: domain $\mathbb{N}$, standard interpretations.

Another structure with the same signature:
- $\mathcal{M}' = (\{0, 1\}, \oplus, \wedge, 0, 1, <)$: domain $\{0, 1\}$ (Booleans), $+$ as XOR, $\cdot$ as AND.

Same signature, completely different models.

## 16.2 Variable Assignments

Structures interpret constants and functions over the whole domain, but **free variables** need assignments.

> **Definition 16.2 (Assignment).** Given structure $\mathcal{M} = (M, I)$, a **variable assignment** is a function $\sigma: \text{Var} \to M$ mapping each variable to an element of $M$.

Given $\sigma$ and $a \in M$, let $\sigma[x \mapsto a]$ be the assignment that agrees with $\sigma$ except on $x$, which is mapped to $a$.

## 16.3 Term Semantics

Given $\mathcal{M}$ and $\sigma$, define the **value of a term** $t$ recursively:
- $\sigma(x) = \sigma(x)$ for variables.
- $\sigma(c) = I(c)$ for constants.
- $\sigma(f(t_1, \dots, t_k)) = I(f)(\sigma(t_1), \dots, \sigma(t_k))$.

Often written $t^{\mathcal{M}}[\sigma]$ or just $\sigma(t)$.

**Example 2.** In $\mathcal{N} = (\mathbb{N}, +, \cdot, 0, 1)$, with $\sigma(x) = 3, \sigma(y) = 4$:
- $\sigma(x + y) = 3 + 4 = 7$.
- $\sigma(x \cdot (y + 1)) = 3 \cdot 5 = 15$.

## 16.4 Formula Semantics: the Satisfaction Relation

> **Definition 16.3 (Satisfaction, $\models$).** Given structure $\mathcal{M} = (M, I)$ and assignment $\sigma$, the relation "$\mathcal{M} \models \varphi[\sigma]$" (read: "$\mathcal{M}$ satisfies $\varphi$ under $\sigma$") is defined recursively:
>
> - **Atomic** $P(t_1, \dots, t_k)$: $\mathcal{M} \models P(t_1, \dots, t_k)[\sigma] \iff (\sigma(t_1), \dots, \sigma(t_k)) \in I(P)$.
> - **Equality** $t_1 = t_2$: $\mathcal{M} \models t_1 = t_2[\sigma] \iff \sigma(t_1) = \sigma(t_2)$.
> - **Negation**: $\mathcal{M} \models \neg\varphi[\sigma] \iff \mathcal{M} \not\models \varphi[\sigma]$.
> - **Conjunction**: $\mathcal{M} \models (\varphi \wedge \psi)[\sigma] \iff \mathcal{M} \models \varphi[\sigma]$ and $\mathcal{M} \models \psi[\sigma]$.
> - **Disjunction, implication, biconditional**: analogous.
> - **Universal**: $\mathcal{M} \models (\forall x\, \varphi)[\sigma] \iff \mathcal{M} \models \varphi[\sigma[x \mapsto a]]$ for **every** $a \in M$.
> - **Existential**: $\mathcal{M} \models (\exists x\, \varphi)[\sigma] \iff \mathcal{M} \models \varphi[\sigma[x \mapsto a]]$ for **some** $a \in M$.

For sentences (no free variables), the assignment is irrelevant, so we write $\mathcal{M} \models \varphi$.

**Example 3.** Let $\varphi = \forall x\, \exists y\, (y > x)$ over $\mathcal{N} = (\mathbb{N}, <)$. Check: for every $n \in \mathbb{N}$, is there $m \in \mathbb{N}$ with $m > n$? Yes, $m = n + 1$. So $\mathcal{N} \models \varphi$.

Now take $\mathcal{M}' = (\{0, 1, \dots, 99\}, <)$. Then $\forall x\, \exists y\, (y > x)$ fails when $x = 99$. So $\mathcal{M}' \not\models \varphi$.

## 16.5 Validity and Satisfiability

> **Definitions 16.4.**
> - $\varphi$ is **valid** (or a **logical truth**): $\mathcal{M} \models \varphi$ for every structure $\mathcal{M}$ (and every $\sigma$ for open formulas). Written $\models \varphi$.
> - $\varphi$ is **satisfiable**: $\mathcal{M} \models \varphi$ for some $\mathcal{M}$ (and some $\sigma$).
> - $\varphi$ is **unsatisfiable** (or **contradictory**): no $\mathcal{M}$ satisfies $\varphi$.
>
> For sets $\Gamma$ of formulas, $\Gamma \models \varphi$ (**semantic entailment**) means: every structure that satisfies all of $\Gamma$ also satisfies $\varphi$.

Note the promotion over propositional logic: validity is now "true in every interpretation", and there are infinitely many — so truth tables no longer suffice.

**Example 4.** $\forall x\, (P(x) \vee \neg P(x))$ — valid (excluded middle applied pointwise).

**Example 5.** $\forall x\, P(x) \to \exists x\, P(x)$ — valid **provided the domain is nonempty** (which we require). If $M = \emptyset$, then $\forall x\, P(x)$ is vacuously true but $\exists x\, P(x)$ is false.

**Example 6.** $\forall x\, \exists y\, R(x, y) \to \exists y\, \forall x\, R(x, y)$ — **not** valid. Counterexample: $\mathcal{N}, R = <$. Then $\forall x\, \exists y\, (y > x)$ holds but $\exists y\, \forall x\, (y > x)$ fails.

## 16.6 Key First-Order Equivalences

In contrast to propositional equivalence (truth-table based), FOL equivalence is based on every interpretation giving the same value.

> **Proposition 16.5 (Quantifier equivalences).** For WFFs $\varphi, \psi$:
>
> (i) $\neg\forall x\, \varphi \equiv \exists x\, \neg\varphi$, $\neg\exists x\, \varphi \equiv \forall x\, \neg\varphi$ (**quantifier De Morgan**).
>
> (ii) $\forall x\, (\varphi \wedge \psi) \equiv (\forall x\, \varphi) \wedge (\forall x\, \psi)$ (distribute $\forall$ over $\wedge$).
>
> (iii) $\exists x\, (\varphi \vee \psi) \equiv (\exists x\, \varphi) \vee (\exists x\, \psi)$ (distribute $\exists$ over $\vee$).
>
> (iv) If $x$ does not occur free in $\psi$:
> - $\forall x\, (\varphi \vee \psi) \equiv (\forall x\, \varphi) \vee \psi$.
> - $\exists x\, (\varphi \wedge \psi) \equiv (\exists x\, \varphi) \wedge \psi$.
> - $\forall x\, (\varphi \to \psi) \equiv (\exists x\, \varphi) \to \psi$.
> - $\forall x\, (\psi \to \varphi) \equiv \psi \to \forall x\, \varphi$.
>
> (v) $\forall x\, \forall y\, \varphi \equiv \forall y\, \forall x\, \varphi$, $\exists x\, \exists y\, \varphi \equiv \exists y\, \exists x\, \varphi$ (quantifiers of the same kind commute).
>
> (vi) **$\forall \exists \ne \exists \forall$** in general: $\forall x\, \exists y\, \varphi$ and $\exists y\, \forall x\, \varphi$ are not equivalent.

**Caution.** Distributing $\forall$ over $\vee$ or $\exists$ over $\wedge$ is **not** always valid. E.g., $\forall x\, (P(x) \vee Q(x))$ is weaker than $(\forall x\, P(x)) \vee (\forall x\, Q(x))$ in general.

## 16.7 Models of Theories

> **Definition 16.6.** A **theory** $T$ is a set of FOL sentences. A **model** of $T$ is a structure $\mathcal{M}$ with $\mathcal{M} \models \varphi$ for every $\varphi \in T$.

**Example 7.** Group theory is the theory in signature $\Sigma = \{e, \cdot, {}^{-1}\}$ with axioms:
- $\forall x\, (x \cdot e = x)$
- $\forall x\, (x \cdot x^{-1} = e)$
- $\forall x\, \forall y\, \forall z\, ((x \cdot y) \cdot z = x \cdot (y \cdot z))$

Models: all groups $(\mathbb{Z}, +, 0, -)$, $(\mathbb{Q}^\times, \cdot, 1, {}^{-1})$, $S_n$, etc. Non-models: $(\mathbb{N}, +)$ (lacks inverses).

## 16.8 First-Order Metatheorems

FOL has its own versions of the propositional metatheorems:

- **Soundness.** $\Gamma \vdash \varphi \Rightarrow \Gamma \models \varphi$ (any FOL proof system).
- **Completeness (Gödel, 1930).** $\Gamma \models \varphi \Rightarrow \Gamma \vdash \varphi$.
- **Compactness.** $\Gamma$ satisfiable iff every finite subset is.
- **Löwenheim–Skolem.** Every satisfiable theory has countable models (and models of arbitrarily large cardinality).

These lie beyond the scope of the lecture PDFs and this chapter, but they frame why FOL is the centerpiece of mathematical logic.

## 16.9 Decidability

**Unlike** propositional logic, FOL is **undecidable**: there is no algorithm that, given an arbitrary FOL sentence $\varphi$, decides whether $\models \varphi$.

> **Theorem 16.7 (Church, Turing, 1936).** FOL validity is undecidable.

Proof sketch: encode Turing machine halting into FOL (see [[22-turing-machines-and-computability]]). Many specific theories, however, are decidable: Presburger arithmetic (addition only, no multiplication) is decidable; dense linear orders are decidable. Full arithmetic (Peano Arithmetic) is undecidable and incomplete (Gödel's Incompleteness, far beyond our scope).

## 16.10 Worked Examples

**Example 8.** In $\mathcal{N} = (\mathbb{N}, +, \cdot, 0, 1, <)$, evaluate:
- $(a)$ $\exists x\, (x + x = 1)$.
- $(b)$ $\forall x\, \forall y\, (x \cdot y = y \cdot x)$.
- $(c)$ $\forall x\, (x > 0 \to \exists y\, (x = y + 1))$.

*Answers.*
- $(a)$ False. No natural number $n$ with $2n = 1$.
- $(b)$ True. $\cdot$ commutative on $\mathbb{N}$.
- $(c)$ True. Every positive natural is the successor of its predecessor.

**Example 9.** Show $\forall x\, (P(x) \to Q(x)) \models \forall x\, P(x) \to \forall x\, Q(x)$.

*Proof.* Suppose $\mathcal{M} \models \forall x\, (P(x) \to Q(x))$. Assume also $\mathcal{M} \models \forall x\, P(x)$; we must show $\mathcal{M} \models \forall x\, Q(x)$. For any $a \in M$: $\mathcal{M} \models P(a) \to Q(a)$ (from the first) and $\mathcal{M} \models P(a)$ (from the second). MP: $\mathcal{M} \models Q(a)$. Since $a$ was arbitrary, $\mathcal{M} \models \forall x\, Q(x)$. $\blacksquare$

**Example 10 (Non-equivalence).** Show $\exists x\, P(x) \wedge \exists x\, Q(x) \not\equiv \exists x\, (P(x) \wedge Q(x))$.

*Counterexample.* $M = \{1, 2\}$, $P = \{1\}$, $Q = \{2\}$. Then $\exists x\, P(x)$ true ($x=1$), $\exists x\, Q(x)$ true ($x=2$), conjunction true. But $\exists x\, (P(x) \wedge Q(x))$ needs one $x$ in both $P$ and $Q$ — no such $x$. So the RHS is false. $\blacksquare$

**Example 11.** Prove $\forall x\, (\varphi \to \psi) \equiv (\exists x\, \varphi) \to \psi$ when $x$ does not occur free in $\psi$.

*Semantic proof.* $\mathcal{M} \models \forall x\, (\varphi \to \psi) \iff$ for every $a$, $\mathcal{M} \models \varphi \to \psi$ at $\sigma[x \mapsto a]$. Since $\psi$ does not depend on $x$, RHS $\iff$ for every $a$: $\mathcal{M} \models \varphi[\sigma[x \mapsto a]] \Rightarrow \mathcal{M} \models \psi[\sigma]$. Equivalently, $(\exists a)\, \mathcal{M} \models \varphi[\sigma[x \mapsto a]] \Rightarrow \mathcal{M} \models \psi$. This is exactly $\mathcal{M} \models (\exists x\, \varphi) \to \psi$. $\blacksquare$

## 16.11 Summary

- A **structure** $\mathcal{M}$ interprets a signature: domain + meanings for constants, functions, predicates.
- A **variable assignment** maps variables to domain elements.
- Terms evaluate to **objects**; formulas evaluate to **truth values** via the satisfaction relation $\models$.
- $\forall x\, \varphi[\sigma]$ iff $\varphi$ holds for every $x$-variant of $\sigma$; $\exists x\, \varphi[\sigma]$ iff for some.
- **Valid** = true in every structure; **satisfiable** = true in some; **unsatisfiable** = in none.
- Key equivalences: quantifier De Morgan; $\forall/\wedge$ distribute; $\exists/\vee$ distribute; quantifier commutation (same kind).
- **$\forall \exists \ne \exists \forall$** in general.
- A **model** of a theory is a structure satisfying all axioms.
- **Completeness** (Gödel) and **compactness** hold; **validity is undecidable** (Church–Turing).

## Related Concepts

- [[13-predicates-and-quantifiers]] — intuitive meaning of $\forall, \exists$.
- [[14-terms-formulas-parsing]] — syntax being interpreted.
- [[15-free-bound-substitutions]] — substitutions underpinning $\forall/\exists$ rules.
- [[22-turing-machines-and-computability]] — undecidability of FOL validity.

## Sources

- [[raw/Lecture_Notes_1__on_First_Order_Logic]] — interpretations, validity (Section 4).
