---
title: "Free and Bound Variables, Substitutions"
type: guide
module: "First-Order Logic"
file: 15
related: [13-predicates-and-quantifiers, 14-terms-formulas-parsing, 16-interpretations-and-validity, 17-module3-practice-problems]
sources: [Lecture_Notes_1__on_First_Order_Logic]
---

# 15. Free and Bound Variables, Substitutions

First-order logic's main complication over propositional logic is **variables** and **quantifier binding**. A formula like $\forall x\, P(x, y)$ has an outer-world $y$ (free) and an inner quantified $x$ (bound). When we substitute a term for a free variable — e.g., replacing $y$ by $f(z)$ — we must be careful not to **capture** a variable accidentally. This chapter defines free vs bound occurrences precisely, introduces **admissible substitutions**, and explains **α-renaming** as the cleanup mechanism.

## 15.1 Free and Bound: Precise Definitions

> **Definition 15.1 (Free and bound occurrences).** In a formula $\varphi$, an occurrence of a variable $x$ is:
> - **Bound** if it is within the scope of a quantifier $\forall x$ or $\exists x$ (or is the quantifier variable itself).
> - **Free** otherwise.
>
> A variable $x$ **occurs free in** $\varphi$ if some occurrence of $x$ in $\varphi$ is free; $x$ **occurs bound** if some occurrence is bound.

Both kinds of occurrence can coexist.

**Example 1.** In $\forall x\, P(x) \wedge Q(x, y)$ (parsed as $(\forall x\, P(x)) \wedge Q(x, y)$):
- The first two $x$'s (in $\forall x$ and $P(x)$) are bound.
- The $x$ in $Q(x, y)$ is **free** (outside the scope of $\forall x$).
- The $y$ in $Q(x, y)$ is free.

**Example 2.** In $\forall x\, (P(x) \wedge Q(x, y))$:
- All three $x$'s are bound.
- $y$ is free.

## 15.2 Sentences vs Open Formulas

> **Definition 15.2.** A WFF is a **sentence** (or **closed formula**) if it has no free variables. Otherwise it is an **open formula**.

- Sentences have a definite truth value under any interpretation (see [[16-interpretations-and-validity]]).
- Open formulas' truth values depend on the assignment of free variables.

**Example 3.**
- Sentence: $\forall x\, \exists y\, (x + y = 0)$.
- Open: $\exists y\, (x + y = 0)$ — $x$ free.

*Convention.* Write $\varphi(x_1, \dots, x_n)$ to indicate the free variables of $\varphi$. In a later substitution $\varphi(t_1, \dots, t_n)$, $t_i$ replaces $x_i$.

## 15.3 Substitution: Naïve Version

Given a formula $\varphi$, a variable $x$, and a term $t$, the **naïve substitution** $\varphi[t/x]$ replaces every free occurrence of $x$ in $\varphi$ by $t$.

Recursive definition for terms:
- $x[t/x] = t$.
- $y[t/x] = y$ for $y \ne x$ (variables) and for constants.
- $f(s_1, \dots, s_k)[t/x] = f(s_1[t/x], \dots, s_k[t/x])$.

For formulas:
- $P(s_1, \dots, s_k)[t/x] = P(s_1[t/x], \dots, s_k[t/x])$.
- $(\neg\varphi)[t/x] = \neg(\varphi[t/x])$.
- $(\varphi \wedge \psi)[t/x] = \varphi[t/x] \wedge \psi[t/x]$; similarly for $\vee, \to, \leftrightarrow$.
- $(\forall y\, \varphi)[t/x]$:
  - If $y = x$: leave unchanged (the scope rebinds).
  - If $y \ne x$: $\forall y\, (\varphi[t/x])$.
- Similarly for $\exists y$.

**Example 4.** $(\forall x\, P(x, y))[f(z)/y] = \forall x\, P(x, f(z))$.

**Example 5.** $(\forall y\, P(x, y))[f(z)/x] = \forall y\, P(f(z), y)$.

## 15.4 Variable Capture: the Pitfall

Naïve substitution can go wrong when the term $t$ contains a variable that gets **bound** by a quantifier in $\varphi$.

**Example 6 (Capture).** Let $\varphi = \exists y\, (y > x)$ over $\mathbb{N}$. Semantically, $\varphi(x)$ means "there is something greater than $x$" — which is true for every $x$ in $\mathbb{N}$.

Naïve substitution $\varphi[y/x] = \exists y\, (y > y)$. This says "there is a $y$ with $y > y$" — false.

Meaning was destroyed. The substituted $y$ was **captured** by the $\exists y$.

The fix: disallow such substitutions, or rename the bound variable first.

## 15.5 Admissible Substitutions

> **Definition 15.3 (Substitution admissible).** The term $t$ is **admissible for $x$ in $\varphi$** (or "**$t$ is free for $x$ in $\varphi$**") if no free variable of $t$ becomes bound after substitution.
>
> Formally: for every free occurrence of $x$ in $\varphi$, that occurrence lies outside the scope of every quantifier $\forall y$ or $\exists y$ where $y \in \text{FV}(t)$.

*Reformulation.* $t$ is admissible for $x$ in $\varphi$ iff for every variable $y$ appearing in $t$, no free occurrence of $x$ in $\varphi$ is within the scope of $\forall y$ or $\exists y$.

**Example 7 (continued).** $t = y$, $\varphi = \exists y\, (y > x)$. The free occurrence of $x$ is inside the scope of $\exists y$, and $y \in \text{FV}(t)$. So $t$ is **not** admissible for $x$ in $\varphi$.

**Example 8.** $t = z$, $\varphi = \exists y\, (y > x)$. Since $z$ does not appear in $\varphi$ bound, $t$ is admissible. Substitution $\varphi[z/x] = \exists y\, (y > z)$, semantically sensible.

### Rule of thumb

**A substitution is safe iff the free variables of the term being substituted remain free in the result.**

## 15.6 α-Renaming (Bound Variable Renaming)

When a substitution would be inadmissible, we can rename the offending bound variable.

> **Definition 15.4 (α-equivalence).** Two formulas $\varphi, \varphi'$ are **α-equivalent** ($\varphi =_\alpha \varphi'$) if one can be obtained from the other by consistently renaming bound variables (to fresh letters, avoiding clashes).

α-renaming preserves meaning: $\forall x\, P(x, y) =_\alpha \forall z\, P(z, y)$ iff $z$ does not appear free in $P(\cdot, y)$.

**Example 9.** Apply $(\exists y\, (y > x))[y/x]$ safely.

*Step 1.* Rename the bound $y$ to $z$ (a fresh variable): $\exists z\, (z > x)$. This is α-equivalent to the original.

*Step 2.* Now substitute: $(\exists z\, (z > x))[y/x] = \exists z\, (z > y)$.

Meaning preserved: "there is $z$ with $z > y$".

## 15.7 Substitution in Practice

Substitution is central to:
- **Universal instantiation.** From $\forall x\, \varphi$, derive $\varphi[t/x]$ for any admissible $t$.
- **Existential generalization.** From $\varphi[t/x]$, derive $\exists x\, \varphi$ (where $t$ is admissible).
- **Equality substitution.** From $s = t$ and $\varphi$, derive $\varphi[t/s]$.
- **Proof by axiom schemes** in FOL calculi.

When the substitution is inadmissible, first α-rename, then substitute.

## 15.8 Simultaneous Substitution

Replacing multiple variables at once: $\varphi[t_1/x_1, \dots, t_n/x_n]$ substitutes all $x_i$ "simultaneously" — that is, each $t_i$ replaces original free occurrences of $x_i$, **not** whatever $x_i$ becomes after an earlier substitution.

**Example 10.** $\varphi = P(x, y)$.
- Simultaneous $[y/x, x/y]$: $P(y, x)$ (swap).
- Sequential $[y/x]$ then $[x/y]$: first $P(y, y)$, then $P(x, x)$ — different result.

Simultaneous substitution matches mathematical intuition; sequential composition does not.

## 15.9 Worked Examples

**Example 11.** Is $f(y, z)$ admissible for $x$ in $\forall y\, P(x, y)$?

*Answer.* The free $x$ is inside $\forall y$'s scope. FV of $f(y, z) = \{y, z\}$; $y$ is one of them. So $y$ would be captured. **Not admissible.**

Fix: α-rename $\forall y$ to $\forall w$: $\forall w\, P(x, w)$. Now $f(y, z)$ is admissible: substitution gives $\forall w\, P(f(y, z), w)$.

**Example 12.** Is $x + 1$ admissible for $y$ in $\exists x\, (x \cdot y = 1)$?

*Answer.* Free $y$ inside $\exists x$'s scope. FV of $x + 1$ = $\{x\}$; $x$ would be captured. **Not admissible.**

Fix: α-rename: $\exists z\, (z \cdot y = 1)$. Now $(x + 1)$ is admissible: $\exists z\, (z \cdot (x + 1) = 1)$.

**Example 13.** Compute $(\forall x\, (P(x) \to Q(x, y)))[x/y]$ naïvely; note if admissible.

*Naïve.* Free occurrences of $y$: exactly in $Q(x, y)$. Replace: $\forall x\, (P(x) \to Q(x, x))$.

*Admissibility.* Free $y$ is inside $\forall x$'s scope; $x \in \text{FV}(x) = \{x\}$; capture would occur. **Not admissible.**

Fix: α-rename bound $x$ to $z$: $\forall z\, (P(z) \to Q(z, y))$. Now safe substitution: $\forall z\, (P(z) \to Q(z, x))$. This is the **correct** meaning-preserving substitution.

**Example 14.** List free and bound variables in $\forall x\, \exists y\, (R(x, y) \to P(z))$.

*Answer.* Bound: $x, y$. Free: $z$.

**Example 15.** List free and bound variables in $(\forall x\, R(x, y)) \to \exists y\, Q(y, z)$.

*Answer.*
- $(\forall x\, R(x, y))$: $x$ bound, $y$ free (in this subformula).
- $\exists y\, Q(y, z)$: $y$ bound (in this subformula), $z$ free.
- Overall: $x$ and $y$ occur bound (via different quantifiers); $y$ also occurs free (in the left conjunct); $z$ free.

Note the $y$ appears **both** free and bound in the same formula.

## 15.10 Summary

- A variable occurrence is **bound** if inside the scope of a quantifier binding it; otherwise **free**.
- Same variable letter can be free and bound in the same formula.
- A **sentence** has no free variables; an **open formula** has at least one.
- Naïve **substitution** $\varphi[t/x]$ replaces free occurrences of $x$ by $t$; can fail via **capture**.
- **Admissible** ("free for"): no free variable of $t$ gets captured.
- **α-renaming** changes bound variables to avoid clashes; preserves meaning.
- **Simultaneous** vs **sequential** substitution are different.
- Correct use of substitution is essential for first-order **instantiation**, **generalization**, and **equality** rules.

## Related Concepts

- [[13-predicates-and-quantifiers]] — the meaning of $\forall, \exists$.
- [[14-terms-formulas-parsing]] — the underlying formula syntax.
- [[16-interpretations-and-validity]] — semantics where substitution matters.
- [[17-module3-practice-problems]] — substitution drills.

## Sources

- [[raw/Lecture_Notes_1__on_First_Order_Logic]] — free/bound, substitutions (Section 3).
