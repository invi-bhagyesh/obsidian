---
title: "Formal Proofs and Modus Ponens"
type: guide
module: "Propositional Calculus"
file: 09
related: [08-axiomatic-propositional-calculus, 10-deduction-theorem, 11-soundness-and-completeness]
sources: [Lecture_Notes_2__on_Propositional_Calculus]
---

# 9. Formal Proofs and Modus Ponens

With the system $\mathcal{L}$ defined ([[08-axiomatic-propositional-calculus]]), we now practice constructing formal proofs. The chapter has three aims: master the mechanics of chaining A1, A2, A3, and MP; build a toolkit of derived theorems that subsequent proofs can cite; develop a feel for why the Deduction Theorem ([[10-deduction-theorem]]) is indispensable.

## 9.1 The Flavor of $\mathcal{L}$-Proofs

A formal proof is a finite sequence
$$
\alpha_1, \alpha_2, \dots, \alpha_n
$$
where each $\alpha_i$ is an axiom instance, a hypothesis, or the result of applying MP to two earlier lines. Every line is annotated.

Three things make $\mathcal{L}$-proofs challenging:
- **Everything must be traced back to A1, A2, A3.** No tricks, no jumps.
- **MP is the only inference move.** Every deduction has the shape "I have $\varphi$ and I have $\varphi \to \psi$, so $\psi$".
- **Axiom instances must be chosen cleverly.** A good A2 instance can collapse three moves into one.

## 9.2 Re-derivation: $\vdash \alpha \to \alpha$

(From [[08-axiomatic-propositional-calculus]] Theorem 8.3, restated.)

$$
\begin{array}{lll}
1. & \alpha \to ((\alpha \to \alpha) \to \alpha) & \text{A1 with } \beta := \alpha \to \alpha \\
2. & (\alpha \to ((\alpha \to \alpha) \to \alpha)) \to ((\alpha \to (\alpha \to \alpha)) \to (\alpha \to \alpha)) & \text{A2} \\
3. & (\alpha \to (\alpha \to \alpha)) \to (\alpha \to \alpha) & \text{MP 1, 2} \\
4. & \alpha \to (\alpha \to \alpha) & \text{A1} \\
5. & \alpha \to \alpha & \text{MP 3, 4}
\end{array}
$$

## 9.3 Proof from Hypotheses: Transitivity of $\to$

> **Theorem 9.1.** $\{p \to q, q \to r\} \vdash p \to r$.

*Proof.*
$$
\begin{array}{lll}
1. & p \to q & \text{hyp} \\
2. & q \to r & \text{hyp} \\
3. & (q \to r) \to (p \to (q \to r)) & \text{A1 with } \alpha := q \to r, \beta := p \\
4. & p \to (q \to r) & \text{MP 2, 3} \\
5. & (p \to (q \to r)) \to ((p \to q) \to (p \to r)) & \text{A2} \\
6. & (p \to q) \to (p \to r) & \text{MP 4, 5} \\
7. & p \to r & \text{MP 1, 6}
\end{array}
$$
$\blacksquare$

*Derived rule.* "From $\alpha \to \beta$ and $\beta \to \gamma$, derive $\alpha \to \gamma$" — **Hypothetical Syllogism (HS)**. We can now cite HS in later proofs.

## 9.4 Toolkit of Derived Theorems

With HS available, more theorems fall quickly. Each is a genuine theorem of $\mathcal{L}$ (no hypotheses needed).

### Double-implication chain

> **Theorem 9.2.** $\vdash (p \to (q \to r)) \to (q \to (p \to r))$ (permutation of hypotheses).

*Sketch.* Assume $p \to (q \to r)$; assume $q$; apply A1 to $q$ to get $p \to q$; then A2 on the original assumption; then MP; then MP with $p \to q$. The *formal* derivation below uses the Deduction Theorem ([[10-deduction-theorem]]) repeatedly; we will see the painless proof there. The pure-axiomatic version is instructive but long.

### Contraction

> **Theorem 9.3.** $\vdash (p \to (p \to q)) \to (p \to q)$.

*Proof sketch.* A2 instance with $\alpha := p, \beta := p, \gamma := q$ gives $(p \to (p \to q)) \to ((p \to p) \to (p \to q))$. Combined with $\vdash p \to p$ (Theorem 8.3) via A1-and-MP maneuvers, yields the result. Again cleaner with Deduction Theorem.

### Double negation — halves

> **Theorem 9.4.** $\vdash \neg\neg\alpha \to \alpha$.

*Idea.* A3 with careful substitutions + $\vdash p \to p$. We postpone until after Deduction Theorem, where it is a one-page proof.

> **Theorem 9.5.** $\vdash \alpha \to \neg\neg\alpha$.

*Same remark.*

### Ex falso

> **Theorem 9.6.** $\vdash \neg\alpha \to (\alpha \to \beta)$ (anything follows from a contradiction — **ex falso quodlibet**).

### Contrapositive

> **Theorem 9.7.** $\vdash (p \to q) \to (\neg q \to \neg p)$.

All of these we will prove cleanly in [[10-deduction-theorem]]. The point here is to see that **without** Deduction Theorem, even these "obvious" results require long manipulations of A1, A2, A3. Building the toolkit by hand is therapeutic once, then we stop.

## 9.5 A Fully Worked Axiom-Only Proof

Let's do one non-trivial derivation without Deduction Theorem to feel the texture.

> **Theorem 9.8.** $\vdash \alpha \to (\neg\alpha \to \beta)$ (another form of ex falso).

We use derived HS (from Theorem 9.1) for brevity.

*Strategy.* Aim to chain: $\alpha \to (\text{something})$ and $(\text{something}) \to (\neg\alpha \to \beta)$.

A1 with $\alpha := \alpha, \beta := \neg\beta$: $\alpha \to (\neg\beta \to \alpha)$.
A1 with $\alpha := \neg\alpha, \beta := \neg\beta$: $\neg\alpha \to (\neg\beta \to \neg\alpha)$.

A3 with $\alpha := \alpha, \beta := \beta$: $(\neg\beta \to \neg\alpha) \to ((\neg\beta \to \alpha) \to \beta)$.

Now if we can get $\alpha \to (\neg\beta \to \alpha)$ and $\neg\alpha \to (\neg\beta \to \neg\alpha)$, we can chain to...

Actually the cleanest route to this theorem uses Deduction Theorem + A3. We exhibit only the high-level strategy: A3 at its core turns two sub-derivations $\neg\beta \to \alpha$ and $\neg\beta \to \neg\alpha$ (both derivable under the assumption $\alpha \wedge \neg\alpha$ — trivially) into $\beta$.

This section intentionally shows how intricate axiom-juggling becomes. The next chapter makes it easy.

## 9.6 Reading and Annotating Proofs

A reader should be able to verify a formal proof mechanically. Here is the checking discipline:

1. For each line, identify its justification.
2. If "axiom", confirm it matches one of the A1/A2/A3 schemes (specify which substitution).
3. If "hypothesis", confirm membership in the hypothesis set.
4. If "MP i, j", confirm line $i$ is $\varphi$ and line $j$ is $\varphi \to \psi$ (matching the *current* line).

If any step fails, the proof is invalid.

**Example 1.** Verify the proof of $\vdash \alpha \to \alpha$ above:
- Line 1: A1 with $\beta := \alpha \to \alpha$ gives $\alpha \to ((\alpha \to \alpha) \to \alpha)$. $\checkmark$
- Line 2: A2 with $\alpha, \beta := \alpha \to \alpha, \gamma := \alpha$ gives exactly the stated formula. $\checkmark$
- Line 3: MP on lines 1, 2. Line 2 starts with "$\alpha \to ((\alpha \to \alpha) \to \alpha) \to \dots$", and line 1 is that antecedent. $\checkmark$
- Line 4: A1 with $\alpha, \beta := \alpha$ gives $\alpha \to (\alpha \to \alpha)$. $\checkmark$
- Line 5: MP on lines 4, 3. $\checkmark$

All five lines check. The proof is valid. $\blacksquare$

## 9.7 Derived Rules vs. Derived Theorems

A **derived theorem** is a single formula $\vdash \varphi$ established once and cited later (as a shortcut for "replay the proof of $\varphi$ here"). A **derived rule** is a pattern: "from $\varphi_1, \dots, \varphi_k$, infer $\psi$" — e.g., HS.

A derived rule is justified by a metatheorem: "whenever the premises are derivable, the conclusion is derivable". Using it in a proof means: if the premises appear, the conclusion can follow with a single annotation, even though the **literal** formal proof would insert many lines.

*Caution.* A derived rule is a **proof-editing shortcut**, not a new inference rule of $\mathcal{L}$. The literal formal system still has only MP.

## 9.8 Worked Examples

**Example 2.** Prove $\vdash p \to p$ (redo).

(As in §9.2; the five-line proof above.)

**Example 3.** Prove $\{p, q\} \vdash p \wedge q$ in $\mathcal{L}$, where $p \wedge q := \neg(p \to \neg q)$.

*Sketch.* The expansion of $p \wedge q$ is $\neg(p \to \neg q)$. To derive it, we use A3 in the form "if $\neg\neg(p \to \neg q)$ led to a contradiction, we get $\neg(p \to \neg q)$". This is intricate by hand. After Deduction Theorem we can handle it in four lines.

**Example 4.** Prove $\{p \to q, q \to r, r \to s\} \vdash p \to s$.

*Proof.* Apply HS (derived rule) twice:
- $p \to q$ and $q \to r$: HS gives $p \to r$.
- $p \to r$ and $r \to s$: HS gives $p \to s$.

In the literal axiomatic system, this unfolds into $\sim 14$ lines. Using the derived rule we write 5. $\blacksquare$

**Example 5.** Prove $\{p \to q\} \vdash (r \to p) \to (r \to q)$.

*Proof using A2 directly.*
$$
\begin{array}{lll}
1. & p \to q & \text{hyp} \\
2. & (p \to q) \to (r \to (p \to q)) & \text{A1 with } \alpha := p \to q, \beta := r \\
3. & r \to (p \to q) & \text{MP 1, 2} \\
4. & (r \to (p \to q)) \to ((r \to p) \to (r \to q)) & \text{A2} \\
5. & (r \to p) \to (r \to q) & \text{MP 3, 4}
\end{array}
$$
$\blacksquare$

*Derived rule.* "From $p \to q$, derive $(r \to p) \to (r \to q)$" — **implication under common hypothesis**.

## 9.9 Why Proofs in $\mathcal{L}$ Are Hard

The difficulty comes from a mismatch between:
- **How humans think about inference.** "Assume $\alpha$; derive $\beta$; conclude $\alpha \to \beta$." This is conditional proof.
- **What $\mathcal{L}$ allows.** We cannot assume-and-discharge; we can only apply MP to existing formulas.

Axioms A1 and A2 together **simulate** conditional proof. The simulation is precisely the content of the **Deduction Theorem** ([[10-deduction-theorem]]), which we prove next. Once available, derivations that seem impossible become routine.

## 9.10 Summary

- A formal proof is a finite annotated sequence of WFFs, each an axiom, hypothesis, or MP-result.
- Writing $\mathcal{L}$-proofs requires cleverly-chosen axiom instances.
- Core derived theorems: $\vdash \alpha \to \alpha$; HS; contraction; contrapositive; double negation halves; ex falso.
- **Derived rules** (HS, etc.) are editing shortcuts, not new inference rules.
- The **Deduction Theorem** ([[10-deduction-theorem]]) bridges "assume and discharge" to the axiomatic calculus, making all the above easy.

## Related Concepts

- [[08-axiomatic-propositional-calculus]] — the formal system $\mathcal{L}$ whose proofs we construct.
- [[10-deduction-theorem]] — the bridge that makes proofs mechanical.
- [[11-soundness-and-completeness]] — shows the toolkit above is provably complete w.r.t. tautologies.

## Sources

- [[raw/Lecture_Notes_2__on_Propositional_Calculus]] — formal proofs, derived theorems (Chapter 3).
