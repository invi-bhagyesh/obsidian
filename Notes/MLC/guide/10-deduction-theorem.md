---
title: "Deduction Theorem"
type: guide
module: "Propositional Calculus"
file: 10
related: [08-axiomatic-propositional-calculus, 09-formal-proofs-and-modus-ponens, 11-soundness-and-completeness, 12-module2-practice-problems]
sources: [Lecture_Notes_2__on_Propositional_Calculus]
---

# 10. Deduction Theorem

The Deduction Theorem is the key metatheorem of propositional calculus. It reconciles the natural proof-style of mathematicians ("assume $\alpha$, derive $\beta$, therefore $\alpha \to \beta$") with the minimalist axiomatic framework of $\mathcal{L}$ ([[08-axiomatic-propositional-calculus]]). After this chapter, every formal proof becomes an order of magnitude shorter.

## 10.1 Statement

> **Theorem 10.1 (Deduction Theorem, DT).** Let $\Gamma$ be a set of WFFs and $\alpha, \beta$ WFFs. Then
> $$
> \Gamma \cup \{\alpha\} \vdash \beta \iff \Gamma \vdash \alpha \to \beta.
> $$

The $\Leftarrow$ direction is easy: given a proof of $\alpha \to \beta$ from $\Gamma$, add $\alpha$ as a hypothesis and apply MP to get $\beta$.

The $\Rightarrow$ direction is the substantive claim: any proof with $\alpha$ as a hypothesis can be mechanically transformed into a proof (without $\alpha$ as a hypothesis) of $\alpha \to \beta$. This is what we prove.

## 10.2 Proof of the Forward Direction

> **Theorem 10.1 ($\Rightarrow$).** If $\Gamma \cup \{\alpha\} \vdash \beta$, then $\Gamma \vdash \alpha \to \beta$.

*Proof by induction on the length $n$ of the given derivation of $\beta$ from $\Gamma \cup \{\alpha\}$.*

Let $\beta_1, \beta_2, \dots, \beta_n = \beta$ be the derivation. We show by induction on $i$ that $\Gamma \vdash \alpha \to \beta_i$ for each $i$.

**Case 1:** $\beta_i$ is an **axiom**.

Then $\vdash \beta_i$ (one-line proof). Using A1 with substitution:
$$
\beta_i \to (\alpha \to \beta_i) \qquad \text{(A1)}
$$
MP with $\beta_i$ gives $\alpha \to \beta_i$. So $\Gamma \vdash \alpha \to \beta_i$.

**Case 2:** $\beta_i \in \Gamma$ (a hypothesis other than $\alpha$).

Same as Case 1, since $\Gamma \vdash \beta_i$ directly. Apply A1 and MP.

**Case 3:** $\beta_i = \alpha$ (the discharged hypothesis).

Then we must show $\Gamma \vdash \alpha \to \alpha$. But $\vdash \alpha \to \alpha$ is a theorem ([[08-axiomatic-propositional-calculus]] §8.6), hence $\Gamma \vdash \alpha \to \alpha$.

**Case 4:** $\beta_i$ is obtained by MP from earlier $\beta_j, \beta_k$ with $\beta_k = \beta_j \to \beta_i$.

By the inductive hypothesis applied to $j$ and $k$:
$$
\Gamma \vdash \alpha \to \beta_j \qquad \text{and} \qquad \Gamma \vdash \alpha \to (\beta_j \to \beta_i).
$$

Use A2 with substitutions $\alpha := \alpha$, $\beta := \beta_j$, $\gamma := \beta_i$:
$$
(\alpha \to (\beta_j \to \beta_i)) \to ((\alpha \to \beta_j) \to (\alpha \to \beta_i)). \qquad \text{(A2)}
$$

Apply MP: from $\alpha \to (\beta_j \to \beta_i)$ and A2, get $(\alpha \to \beta_j) \to (\alpha \to \beta_i)$. Apply MP again: from $\alpha \to \beta_j$ and the previous line, get $\alpha \to \beta_i$.

Therefore $\Gamma \vdash \alpha \to \beta_i$ in each case. By induction, $\Gamma \vdash \alpha \to \beta_n = \alpha \to \beta$. $\blacksquare$

*Remark.* The proof uses **only A1 and A2** (and $\vdash \alpha \to \alpha$, itself from A1, A2). A3 is **not needed**. This means the Deduction Theorem holds in any system that contains A1, A2 and MP — in particular, in weaker logics like *positive* propositional logic.

## 10.3 Consequences: Proofs Become Easy

Once DT is available, most propositional-calculus theorems have short proofs via:

> **Strategy.** To prove $\Gamma \vdash \alpha \to \beta$, **assume $\alpha$** as an additional hypothesis, derive $\beta$ informally (using MP freely), and **discharge** via DT.

This is **conditional proof** — exactly the natural-deduction move from [[06-arguments-and-rules-of-inference]] — now formally licensed.

**Example 1 (Transitivity revisited).** $\vdash (p \to q) \to ((q \to r) \to (p \to r))$.

*Proof.*
$$
\begin{array}{lll}
1. & p \to q & \text{hyp} \\
2. & q \to r & \text{hyp} \\
3. & p & \text{hyp} \\
4. & q & \text{MP 1, 3} \\
5. & r & \text{MP 2, 4}
\end{array}
$$
So $\{p \to q, q \to r, p\} \vdash r$. Apply DT three times:
$$
\{p \to q, q \to r\} \vdash p \to r, \qquad \{p \to q\} \vdash (q \to r) \to (p \to r), \qquad \vdash (p \to q) \to ((q \to r) \to (p \to r)).
$$
$\blacksquare$

What was seven lines of careful A1/A2 juggling in [[09-formal-proofs-and-modus-ponens]] §9.3 is now a three-line MP derivation plus appeals to DT.

**Example 2 (Permutation of hypotheses).** $\vdash (p \to (q \to r)) \to (q \to (p \to r))$.

*Proof.*
$$
\begin{array}{lll}
1. & p \to (q \to r) & \text{hyp} \\
2. & q & \text{hyp} \\
3. & p & \text{hyp} \\
4. & q \to r & \text{MP 1, 3} \\
5. & r & \text{MP 4, 2}
\end{array}
$$
DT thrice gives the claim. $\blacksquare$

**Example 3 (Contraction).** $\vdash (p \to (p \to q)) \to (p \to q)$.

*Proof.*
$$
\begin{array}{lll}
1. & p \to (p \to q) & \text{hyp} \\
2. & p & \text{hyp} \\
3. & p \to q & \text{MP 1, 2} \\
4. & q & \text{MP 3, 2}
\end{array}
$$
DT twice. $\blacksquare$

## 10.4 Contrapositive and Double Negation

A3 finally does some work.

> **Lemma 10.2.** $\vdash (\neg p \to p) \to p$.

*Proof.*
$$
\begin{array}{lll}
1. & \neg p \to p & \text{hyp} \\
2. & \neg p \to \neg p & \vdash p \to p \text{ with substitution} \\
3. & (\neg p \to \neg p) \to ((\neg p \to p) \to p) & \text{A3 with } \beta := p, \alpha := p \\
4. & (\neg p \to p) \to p & \text{MP 2, 3} \\
5. & p & \text{MP 1, 4}
\end{array}
$$
DT: $\vdash (\neg p \to p) \to p$. $\blacksquare$

> **Lemma 10.3.** $\vdash \neg\neg p \to p$.

*Proof.*
$$
\begin{array}{lll}
1. & \neg\neg p & \text{hyp} \\
2. & \neg\neg p \to (\neg p \to \neg\neg p) & \text{A1} \\
3. & \neg p \to \neg\neg p & \text{MP 1, 2} \\
4. & (\neg p \to \neg\neg p) \to ((\neg p \to \neg p) \to p) & \text{A3 with } \beta := p, \alpha := \neg p \\
5. & (\neg p \to \neg p) \to p & \text{MP 3, 4} \\
6. & \neg p \to \neg p & \vdash p \to p \\
7. & p & \text{MP 6, 5}
\end{array}
$$
DT: $\vdash \neg\neg p \to p$. $\blacksquare$

> **Lemma 10.4.** $\vdash p \to \neg\neg p$.

*Proof.* Apply DT to a derivation of $\{p\} \vdash \neg\neg p$. This requires several uses of A3; a clean proof goes via $\vdash (p \to q) \to ((p \to \neg q) \to \neg p)$ (reductio), which itself follows from A3. Working this out is Problem 14 in [[12-module2-practice-problems]]. $\blacksquare$

> **Theorem 10.5 (Contrapositive).** $\vdash (p \to q) \to (\neg q \to \neg p)$.

*Proof sketch.* Using derived rules:
$$
\begin{array}{lll}
1. & p \to q & \text{hyp} \\
2. & \neg q & \text{hyp} \\
3. & \neg\neg p & \text{hyp (for contradiction, or via A3 maneuver)} \\
 & \vdots & \\
 & \neg p &
\end{array}
$$
The cleanest route uses reductio + A3. Full derivation in [[12-module2-practice-problems]]. $\blacksquare$

## 10.5 Importance of DT

- **Proof-building machinery.** Most textbook derivations in $\mathcal{L}$ use DT repeatedly.
- **Part of the completeness proof.** The proof of the Completeness Theorem ([[11-soundness-and-completeness]]) uses DT extensively.
- **Transfers to first-order logic.** The DT generalizes: in first-order logic, $\Gamma \cup \{\alpha\} \vdash \beta$ (with $\alpha$ a sentence) gives $\Gamma \vdash \alpha \to \beta$. A caveat arises with free variables, handled carefully in [[16-interpretations-and-validity]].

## 10.6 Converse

The reverse direction of DT is trivial:

> **Proposition 10.6 (Converse of DT).** If $\Gamma \vdash \alpha \to \beta$, then $\Gamma \cup \{\alpha\} \vdash \beta$.

*Proof.* Assume $\Gamma \vdash \alpha \to \beta$; append $\alpha$ as a hypothesis (monotone); apply MP. $\blacksquare$

Thus DT is a biconditional: $\Gamma \cup \{\alpha\} \vdash \beta \iff \Gamma \vdash \alpha \to \beta$.

## 10.7 Worked Examples

**Example 4.** Prove $\vdash (p \to q) \to ((r \to p) \to (r \to q))$.

*Proof.*
$$
\begin{array}{lll}
1. & p \to q & \text{hyp} \\
2. & r \to p & \text{hyp} \\
3. & r & \text{hyp} \\
4. & p & \text{MP 2, 3} \\
5. & q & \text{MP 1, 4}
\end{array}
$$
DT thrice. $\blacksquare$

**Example 5.** Prove $\vdash (p \to q) \to ((p \to (q \to r)) \to (p \to r))$.

*Proof.*
$$
\begin{array}{lll}
1. & p \to q & \text{hyp} \\
2. & p \to (q \to r) & \text{hyp} \\
3. & p & \text{hyp} \\
4. & q & \text{MP 1, 3} \\
5. & q \to r & \text{MP 2, 3} \\
6. & r & \text{MP 5, 4}
\end{array}
$$
DT thrice. $\blacksquare$

**Example 6.** Prove $\vdash (p \to q) \to ((q \to r) \to (p \to r))$ (restatement of Example 1).

(Already done above.)

**Example 7 (Derived HS rule, formalized).**

Given derived theorem $\vdash (p \to q) \to ((q \to r) \to (p \to r))$, and hypotheses $p \to q, q \to r$:
- MP first with $(p \to q) \to ((q \to r) \to (p \to r))$ and $p \to q$: get $(q \to r) \to (p \to r)$.
- MP with $q \to r$: get $p \to r$.

So $\{p \to q, q \to r\} \vdash p \to r$ — **HS** is a valid derived rule. $\blacksquare$

## 10.8 Limits of DT

DT is a **conservative** result: it lets us eliminate hypotheses in favor of implications. It does **not** give us:
- The ability to prove independent results about specific WFFs.
- Soundness or completeness (those require separate proofs — [[11-soundness-and-completeness]]).
- Decidability (we already know propositional logic is decidable by truth tables).

DT is best seen as an **economy theorem** — proofs about $\mathcal{L}$ become short and readable.

## 10.9 Summary

- **Deduction Theorem**: $\Gamma \cup \{\alpha\} \vdash \beta \iff \Gamma \vdash \alpha \to \beta$.
- Proof of $\Rightarrow$: induction on the derivation, using A1 (hyp./axiom cases), A2 (MP case), and $\vdash \alpha \to \alpha$.
- DT uses only A1, A2, MP — not A3.
- Converse is trivial (MP with hypothesized antecedent).
- With DT, **conditional proof** is licensed: assume $\alpha$, derive $\beta$, conclude $\alpha \to \beta$.
- Core derived theorems become short: transitivity, permutation, contraction, double negation halves, contrapositive.
- DT is foundational for proving **Completeness** ([[11-soundness-and-completeness]]) and generalizes to first-order logic ([[16-interpretations-and-validity]]).

## Related Concepts

- [[08-axiomatic-propositional-calculus]] — the system $\mathcal{L}$ over which DT is stated.
- [[09-formal-proofs-and-modus-ponens]] — motivation: axiomatic proofs are too long without DT.
- [[11-soundness-and-completeness]] — uses DT centrally.
- [[12-module2-practice-problems]] — DT drills.

## Sources

- [[raw/Lecture_Notes_2__on_Propositional_Calculus]] — Deduction Theorem (Chapter 4).
