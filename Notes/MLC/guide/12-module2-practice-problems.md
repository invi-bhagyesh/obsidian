---
title: "Module 2 Practice Problems (Propositional Calculus)"
type: guide
module: "Propositional Calculus"
file: 12
related: [08-axiomatic-propositional-calculus, 09-formal-proofs-and-modus-ponens, 10-deduction-theorem, 11-soundness-and-completeness]
sources: [Lecture_Notes_2__on_Propositional_Calculus]
---

# 12. Module 2 Practice Problems (Propositional Calculus)

This chapter assembles drills on formal derivations in $\mathcal{L}$, the Deduction Theorem, soundness, and completeness. Many problems have two solutions: a "pure axiomatic" one and a concise one using DT. We favor the DT version unless the pure version is the pedagogical point.

## 12.1 Part A — Axiomatic Derivations

**Problem 1.** Exhibit a formal proof of $\vdash \alpha \to \alpha$ using only A1, A2, and MP.

**Problem 2.** Prove $\{p \to q, p\} \vdash q$.

**Problem 3.** Prove $\{p \to (q \to r), p \to q, p\} \vdash r$.

**Problem 4.** Prove $\{p \to q, q \to r\} \vdash p \to r$ (i) without DT; (ii) with DT.

**Problem 5.** Prove $\vdash (p \to q) \to ((q \to r) \to (p \to r))$ using DT.

## 12.2 Part B — Deduction Theorem

**Problem 6.** Use DT to prove $\vdash (p \to (q \to r)) \to ((p \to q) \to (p \to r))$. (This is A2 itself; we confirm it's a theorem even without being an axiom — just for practice.)

**Problem 7.** Prove $\vdash (p \to (q \to r)) \to (q \to (p \to r))$ via DT.

**Problem 8.** Prove $\vdash (p \to q) \to ((r \to p) \to (r \to q))$ via DT.

**Problem 9.** Prove $\vdash (p \to (p \to q)) \to (p \to q)$ via DT (contraction).

**Problem 10.** Prove $\{p, q\} \vdash p$ and $\{p, q\} \vdash q$ trivially, then $\{p, q\} \vdash p \wedge q$, where $p \wedge q := \neg(p \to \neg q)$.

## 12.3 Part C — Negation Management

**Problem 11.** Prove $\vdash \neg\neg p \to p$.

**Problem 12.** Prove $\vdash p \to \neg\neg p$.

**Problem 13.** Prove $\vdash (p \to q) \to (\neg q \to \neg p)$ (contrapositive).

**Problem 14.** Prove $\vdash (\neg q \to \neg p) \to (p \to q)$ (converse of contrapositive, using A3).

**Problem 15.** Prove $\vdash p \to (\neg p \to q)$ (ex falso).

## 12.4 Part D — Using Soundness and Completeness

**Problem 16.** Using Soundness, show $\not\vdash p \to q$ for distinct propositional variables $p, q$.

**Problem 17.** Using Completeness, conclude $\vdash ((p \to q) \to p) \to p$ (Peirce's law) without building a derivation.

**Problem 18.** Using Completeness, show $\{p \vee q, p \to r, q \to r\} \vdash r$.

**Problem 19.** Show $\mathcal{L}$ is consistent — i.e., there is no $\alpha$ with both $\vdash \alpha$ and $\vdash \neg\alpha$.

**Problem 20.** Use Compactness to show: if every finite subset of an infinite $\Gamma$ is satisfiable, so is $\Gamma$.

---

## Solutions

**Problem 1.** (Theorem 8.3 / §9.2.)
$$
\begin{array}{lll}
1. & \alpha \to ((\alpha \to \alpha) \to \alpha) & \text{A1} \\
2. & (\alpha \to ((\alpha \to \alpha) \to \alpha)) \to ((\alpha \to (\alpha \to \alpha)) \to (\alpha \to \alpha)) & \text{A2} \\
3. & (\alpha \to (\alpha \to \alpha)) \to (\alpha \to \alpha) & \text{MP 1,2} \\
4. & \alpha \to (\alpha \to \alpha) & \text{A1} \\
5. & \alpha \to \alpha & \text{MP 4,3}
\end{array}
$$

**Problem 2.** $\{p \to q, p\} \vdash q$.
$$
\begin{array}{lll}
1. & p \to q & \text{hyp} \\
2. & p & \text{hyp} \\
3. & q & \text{MP 2,1}
\end{array}
$$

**Problem 3.**
$$
\begin{array}{lll}
1. & p \to (q \to r) & \text{hyp} \\
2. & p \to q & \text{hyp} \\
3. & p & \text{hyp} \\
4. & q \to r & \text{MP 3,1} \\
5. & q & \text{MP 3,2} \\
6. & r & \text{MP 5,4}
\end{array}
$$

**Problem 4.**

*(i) Without DT.* See Theorem 9.1 / §9.3 of [[09-formal-proofs-and-modus-ponens]] — seven lines.

*(ii) With DT.* Add $p$ as a hypothesis; MP twice to get $r$; DT gives $\{p \to q, q \to r\} \vdash p \to r$. Three lines.

**Problem 5.** Treat $p \to q$, $q \to r$, $p$ as hypotheses, derive $r$ (Problem 3's pattern), then DT three times.

**Problem 6.** Assume $p \to (q \to r)$, $p \to q$, $p$; derive $r$ as in Problem 3; DT thrice.

**Problem 7.**
$$
\begin{array}{lll}
1. & p \to (q \to r) & \text{hyp} \\
2. & q & \text{hyp} \\
3. & p & \text{hyp} \\
4. & q \to r & \text{MP 3,1} \\
5. & r & \text{MP 2,4}
\end{array}
$$
DT thrice.

**Problem 8.**
$$
\begin{array}{lll}
1. & p \to q & \text{hyp} \\
2. & r \to p & \text{hyp} \\
3. & r & \text{hyp} \\
4. & p & \text{MP 3,2} \\
5. & q & \text{MP 4,1}
\end{array}
$$
DT thrice.

**Problem 9.**
$$
\begin{array}{lll}
1. & p \to (p \to q) & \text{hyp} \\
2. & p & \text{hyp} \\
3. & p \to q & \text{MP 2,1} \\
4. & q & \text{MP 2,3}
\end{array}
$$
DT twice.

**Problem 10.** $\{p, q\} \vdash p$: just hypothesis. Similarly for $q$. For $p \wedge q = \neg(p \to \neg q)$: we need $\{p, q\} \vdash \neg(p \to \neg q)$. Sketch via A3:
- Assume $p \to \neg q$. MP with $p$: $\neg q$. But $q$ is a hypothesis — contradiction.
- Formally: $\{p, q, p \to \neg q\} \vdash \neg q$ and $\vdash q$. Then, using A3 applied to a derived rule "from $\alpha$ and $\neg\alpha$ infer anything" — gets us $\neg(p \to \neg q)$ via reductio.

Full derivation uses Lemma 10.3-style techniques; omitted for brevity.

**Problem 11.** $\vdash \neg\neg p \to p$. See [[10-deduction-theorem]] Lemma 10.3.

**Problem 12.** $\vdash p \to \neg\neg p$. Sketch via A3:
$$
\begin{array}{lll}
1. & p & \text{hyp} \\
2. & \neg\neg\neg p \to \neg p & \text{via } \vdash \neg\neg q \to q \text{ with } q := \neg p \\
3. & (\neg\neg\neg p \to \neg p) \to ((\neg\neg\neg p \to p) \to \neg\neg p) & \text{A3 with } \beta := \neg\neg p, \alpha := p \\
4. & (\neg\neg\neg p \to p) \to \neg\neg p & \text{MP 2,3} \\
5. & p \to (\neg\neg\neg p \to p) & \text{A1} \\
6. & \neg\neg\neg p \to p & \text{MP 1,5} \\
7. & \neg\neg p & \text{MP 6,4}
\end{array}
$$
DT: $\vdash p \to \neg\neg p$. $\blacksquare$

**Problem 13.**
$$
\begin{array}{lll}
1. & p \to q & \text{hyp} \\
2. & \neg q & \text{hyp} \\
3. & p & \text{hyp (for contradiction)} \\
4. & q & \text{MP 3,1} \\
 & \vdots & \text{derive } \neg p \text{ via A3 reductio on } q, \neg q \\
 & \neg p &
\end{array}
$$
DT thrice. Full derivation requires assembling A3 with the hypotheses.

**Problem 14.**
$$
\begin{array}{lll}
1. & \neg q \to \neg p & \text{hyp} \\
2. & p & \text{hyp} \\
3. & \neg q \to p & \text{via A1-and-MP from 2} \\
4. & (\neg q \to \neg p) \to ((\neg q \to p) \to q) & \text{A3 with } \alpha := p, \beta := q \\
5. & (\neg q \to p) \to q & \text{MP 1,4} \\
6. & q & \text{MP 3,5}
\end{array}
$$
DT twice: $\vdash (\neg q \to \neg p) \to (p \to q)$. $\blacksquare$

**Problem 15.**
$$
\begin{array}{lll}
1. & p & \text{hyp} \\
2. & \neg p & \text{hyp} \\
 & \vdots & \text{A3 reductio: from } p \text{ and } \neg p \text{ derive } q \\
 & q &
\end{array}
$$
DT twice. The core step: $\neg q \to p$ (A1 from hyp) and $\neg q \to \neg p$ (A1 from $\neg p$), then A3 gives $q$.

**Problem 16.** Suppose $\vdash p \to q$. By Soundness, $\models p \to q$. But the valuation $v(p) = \mathbf{T}, v(q) = \mathbf{F}$ falsifies $p \to q$. Contradiction. So $\not\vdash p \to q$. $\blacksquare$

**Problem 17.** Truth table of Peirce's law $((p \to q) \to p) \to p$: all rows $\mathbf{T}$ (shown in [[11-soundness-and-completeness]] Example 1). Hence $\models$, hence $\vdash$ by Completeness. $\blacksquare$

**Problem 18.** Suppose $v$ satisfies $p \vee q, p \to r, q \to r$. Case $p$: MP with $p \to r$ gives $r$. Case $q$: MP with $q \to r$ gives $r$. So $v \models r$. Thus $\{p \vee q, p \to r, q \to r\} \models r$. By Completeness, $\vdash$. $\blacksquare$

**Problem 19.** Suppose $\vdash \alpha$ and $\vdash \neg\alpha$. By Soundness, $\models \alpha$ and $\models \neg\alpha$. But no valuation makes both true. Contradiction. $\blacksquare$

**Problem 20.** Contrapositive: if $\Gamma$ unsatisfiable, then $\Gamma \models \bot$; by Completeness $\Gamma \vdash \bot$; derivation uses finite subset; that subset is unsatisfiable. So if every finite subset is satisfiable, so is $\Gamma$. $\blacksquare$

---

## Summary

- Axiomatic proofs (without DT) hinge on clever instances of A1, A2, A3 chained with MP.
- DT transforms all such proofs into "assume hypothesis, derive conclusion, discharge".
- Double negation and contrapositive require A3.
- Soundness gives free non-provability results (find a falsifying valuation).
- Completeness gives free provability results (verify tautology by truth table).

## Related Concepts

- [[08-axiomatic-propositional-calculus]] — A1, A2, A3, MP.
- [[09-formal-proofs-and-modus-ponens]] — raw axiom-only derivations.
- [[10-deduction-theorem]] — bridges into natural-deduction style.
- [[11-soundness-and-completeness]] — $\vdash \iff \models$.

## Sources

- [[raw/Lecture_Notes_2__on_Propositional_Calculus]].
