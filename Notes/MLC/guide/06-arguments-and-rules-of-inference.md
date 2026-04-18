---
title: "Arguments and Rules of Inference"
type: guide
module: "Propositional Logic"
file: 06
related: [03-tautologies-contradictions-satisfiability, 04-logical-equivalence-and-laws, 07-module1-practice-problems, 09-formal-proofs-and-modus-ponens]
sources: [Lecture_Notes_on_Propositional_Logic]
---

# 6. Arguments and Rules of Inference

An **argument** is what practical reasoning looks like in logical form: a finite list of **premises** and a single **conclusion**. This chapter defines argument validity, enumerates the inference rules that natural deduction-style proofs repeatedly invoke, and shows how to construct proofs by chaining them. These rules are the semantic ancestor of the formal derivations in the axiomatic system of [[08-axiomatic-propositional-calculus]].

## 6.1 Arguments and Validity

> **Definition 6.1 (Argument).** An **argument** is a finite sequence $\alpha_1, \alpha_2, \dots, \alpha_k \vdash \beta$ where $\alpha_1, \dots, \alpha_k$ are **premises** and $\beta$ is the **conclusion**.

> **Definition 6.2 (Validity).** The argument $\alpha_1, \dots, \alpha_k \vdash \beta$ is **valid** if every valuation that satisfies all premises also satisfies the conclusion — i.e., $\{\alpha_1, \dots, \alpha_k\} \models \beta$.

Equivalently (by [[03-tautologies-contradictions-satisfiability]] §3.5): the argument is valid iff
$$
(\alpha_1 \wedge \alpha_2 \wedge \dots \wedge \alpha_k) \to \beta
$$
is a tautology.

*Symbol convention.* We use $\vdash$ loosely for "argument" or "entails"; in later chapters $\vdash$ becomes formal provability ([[08-axiomatic-propositional-calculus]]).

### Validity vs. soundness

A **valid** argument guarantees truth of the conclusion *if* the premises are true. A **sound** argument is valid **and** all premises are in fact true. Logic establishes validity; soundness additionally requires the premises match reality. We focus exclusively on validity here.

**Example 1.** Is the following valid?
- Premise 1: "If it rains, the match is cancelled."
- Premise 2: "It is raining."
- Conclusion: "The match is cancelled."

*Solution.* Let $p$ = "it rains", $q$ = "match cancelled". Premises: $p \to q$, $p$. Conclusion: $q$. The implication $((p \to q) \wedge p) \to q$ is a tautology (Example 2 in [[03-tautologies-contradictions-satisfiability]]). Valid. $\blacksquare$

### Validity via truth tables

To decide validity of a small argument, build a truth table with columns for all premises and the conclusion. The argument is valid iff in every row where all premise-columns are $\mathbf{T}$, the conclusion column is also $\mathbf{T}$.

**Example 2.** $\{p \vee q, \neg p\} \vdash q$ (**disjunctive syllogism**)?

$$
\begin{array}{cc|cc|c}
p & q & p \vee q & \neg p & q \\ \hline
\mathbf{T} & \mathbf{T} & \mathbf{T} & \mathbf{F} & \mathbf{T} \\
\mathbf{T} & \mathbf{F} & \mathbf{T} & \mathbf{F} & \mathbf{F} \\
\mathbf{F} & \mathbf{T} & \mathbf{T} & \mathbf{T} & \mathbf{T} \\
\mathbf{F} & \mathbf{F} & \mathbf{F} & \mathbf{T} & \mathbf{F}
\end{array}
$$

Rows where both premises are $\mathbf{T}$: only row 3. Conclusion is $\mathbf{T}$ there. Valid. $\blacksquare$

## 6.2 Fallacies

An **invalid argument** is a **fallacy**. Two classic fallacies to watch for:

### Affirming the consequent

$\{p \to q, q\} \vdash p$? **No.** Counterexample: $p = \mathbf{F}, q = \mathbf{T}$ — both premises $\mathbf{T}$, conclusion $\mathbf{F}$.

"If it's raining, the street is wet. The street is wet. Therefore it's raining." Invalid — the street could be wet from a sprinkler.

### Denying the antecedent

$\{p \to q, \neg p\} \vdash \neg q$? **No.** Same counterexample: $p = \mathbf{F}, q = \mathbf{T}$.

"If it's raining, the street is wet. It is not raining. Therefore the street is not wet." Invalid — same reason.

## 6.3 Rules of Inference

An **inference rule** is a certified valid argument form. Once proved valid, it can be invoked to extend a proof without re-deriving the justification. The following are the standard rules.

### Modus Ponens (MP)
$$
\frac{\alpha,\quad \alpha \to \beta}{\beta}
$$
From $\alpha$ and $\alpha \to \beta$, infer $\beta$. The fundamental rule.

### Modus Tollens (MT)
$$
\frac{\alpha \to \beta,\quad \neg\beta}{\neg\alpha}
$$
From $\alpha \to \beta$ and $\neg\beta$, infer $\neg\alpha$. (Proof: $\alpha \to \beta \equiv \neg\beta \to \neg\alpha$, then MP.)

### Hypothetical Syllogism (HS)
$$
\frac{\alpha \to \beta,\quad \beta \to \gamma}{\alpha \to \gamma}
$$
Transitivity of implication.

### Disjunctive Syllogism (DS)
$$
\frac{\alpha \vee \beta,\quad \neg\alpha}{\beta}
$$
Eliminating a falsified disjunct.

### Addition
$$
\frac{\alpha}{\alpha \vee \beta}
$$
Introducing a disjunction.

### Simplification (Simp)
$$
\frac{\alpha \wedge \beta}{\alpha} \qquad \frac{\alpha \wedge \beta}{\beta}
$$
Extracting a conjunct.

### Conjunction (Conj)
$$
\frac{\alpha,\quad \beta}{\alpha \wedge \beta}
$$
Combining premises.

### Constructive Dilemma (CD)
$$
\frac{(\alpha \to \beta) \wedge (\gamma \to \delta),\quad \alpha \vee \gamma}{\beta \vee \delta}
$$

### Destructive Dilemma (DD)
$$
\frac{(\alpha \to \beta) \wedge (\gamma \to \delta),\quad \neg\beta \vee \neg\delta}{\neg\alpha \vee \neg\gamma}
$$

### Resolution
$$
\frac{\alpha \vee \beta,\quad \neg\alpha \vee \gamma}{\beta \vee \gamma}
$$
(Single rule strong enough for automated theorem proving on CNF.)

### Biconditional-related
$$
\frac{\alpha \leftrightarrow \beta}{\alpha \to \beta} \qquad \frac{\alpha \leftrightarrow \beta}{\beta \to \alpha} \qquad \frac{\alpha \to \beta,\quad \beta \to \alpha}{\alpha \leftrightarrow \beta}
$$

### Replacement (via equivalences)
Any equivalence $\alpha \equiv \beta$ from [[04-logical-equivalence-and-laws]] can be applied in either direction to any subformula (by the Replacement Theorem 4.2). E.g., replace $\neg\neg p$ by $p$, or $p \to q$ by $\neg p \vee q$.

## 6.4 Constructing a Proof

A **proof** of $\{\alpha_1, \dots, \alpha_k\} \vdash \beta$ is a finite sequence of formulas, each either a premise, a previously derived formula, or obtained by an inference rule from earlier formulas, ending in $\beta$. Each line is annotated with the rule and line numbers used.

**Example 3.** Show $\{p \to q, q \to r, p\} \vdash r$.

*Proof.*
$$
\begin{array}{lll}
1. & p \to q & \text{premise} \\
2. & q \to r & \text{premise} \\
3. & p & \text{premise} \\
4. & q & \text{MP on 1, 3} \\
5. & r & \text{MP on 2, 4}
\end{array}
$$
$\blacksquare$

**Example 4.** Show $\{p \to q, r \to s, p \vee r\} \vdash q \vee s$.

*Proof.*
$$
\begin{array}{lll}
1. & p \to q & \text{premise} \\
2. & r \to s & \text{premise} \\
3. & p \vee r & \text{premise} \\
4. & (p \to q) \wedge (r \to s) & \text{Conj on 1, 2} \\
5. & q \vee s & \text{CD on 4, 3}
\end{array}
$$
$\blacksquare$

**Example 5.** Show $\{\neg p \vee q, \neg q \vee r, p\} \vdash r$.

*Proof.*
$$
\begin{array}{lll}
1. & \neg p \vee q & \text{premise} \\
2. & \neg q \vee r & \text{premise} \\
3. & p & \text{premise} \\
4. & \neg\neg p & \text{double negation on 3} \\
5. & q & \text{DS on 1, 4} \\
6. & \neg\neg q & \text{double neg on 5} \\
7. & r & \text{DS on 2, 6}
\end{array}
$$
Alternatively: steps 1 and 2 are $p \to q$ and $q \to r$ in disguise; then HS + MP. $\blacksquare$

## 6.5 Strategies

When constructing a proof:

1. **Work backward from the conclusion.** If the goal is $\alpha \wedge \beta$, prove each conjunct. If $\alpha \vee \beta$, prove either (or apply addition). If $\alpha \to \beta$, assume $\alpha$ and derive $\beta$ (conditional proof / deduction theorem, see [[10-deduction-theorem]]).
2. **Work forward from premises.** Extract conjuncts (Simp), apply MP wherever implications are present, combine with Conj.
3. **Look for patterns.** $p, p \to q$ → MP. $p \vee q, \neg p$ → DS. $p \to q, \neg q$ → MT. Two implications and a disjunction of their antecedents → CD.
4. **Translate using equivalences.** If stuck, rewrite an implication as $\neg p \vee q$, or a biconditional as two implications, etc.
5. **Proof by contradiction.** To prove $\alpha$, add $\neg\alpha$ as a premise and derive a contradiction ($\bot$).
6. **Proof by cases.** If a premise $p \vee q$ is present, prove the conclusion in case $p$ and in case $q$ separately.

**Example 6 (Conditional proof).** $\{p \to q\} \vdash (p \wedge r) \to (q \wedge r)$.

*Proof.*
$$
\begin{array}{lll}
1. & p \to q & \text{premise} \\
2. & p \wedge r & \text{assumption (for conditional proof)} \\
3. & p & \text{Simp on 2} \\
4. & r & \text{Simp on 2} \\
5. & q & \text{MP on 1, 3} \\
6. & q \wedge r & \text{Conj on 5, 4} \\
7. & (p \wedge r) \to (q \wedge r) & \text{CP, discharging assumption 2}
\end{array}
$$
$\blacksquare$

**Example 7 (Proof by contradiction).** $\vdash \neg(p \wedge \neg p)$.

*Proof.*
$$
\begin{array}{lll}
1. & p \wedge \neg p & \text{assumption (for contradiction)} \\
2. & p & \text{Simp on 1} \\
3. & \neg p & \text{Simp on 1} \\
4. & \bot & \text{from 2, 3} \\
5. & \neg(p \wedge \neg p) & \text{by contradiction, discharging 1}
\end{array}
$$
$\blacksquare$

**Example 8 (Cases).** $\{p \vee q, p \to r, q \to r\} \vdash r$.

*Proof.*
- Case $p$: by MP with $p \to r$, infer $r$.
- Case $q$: by MP with $q \to r$, infer $r$.
- Since $p \vee q$, either case holds; in both, $r$. Therefore $r$. $\blacksquare$

## 6.6 Resolution as a Single-Rule System

Resolution alone, applied to CNF, is **refutation-complete**: to check whether $\Gamma \models \beta$, negate $\beta$, convert $\Gamma \cup \{\neg\beta\}$ to CNF, and repeatedly apply resolution. If the empty clause $\bot$ is derived, $\Gamma \models \beta$; else not.

**Example 9.** Check $\{p \vee q, \neg p\} \vdash q$ by resolution.

Resolve $p \vee q$ and $\neg p$ on literal $p$: $q$. (If we then assumed $\neg q$, we would resolve $q$ and $\neg q$ to get $\bot$.) $\blacksquare$

Resolution is the engine of modern SAT solvers ([[22-turing-machines-and-computability]]).

## 6.7 Worked Examples

**Example 10.** Show $\{p \to (q \to r), p, \neg r\} \vdash \neg q$.

*Proof.*
$$
\begin{array}{lll}
1. & p \to (q \to r) & \text{premise} \\
2. & p & \text{premise} \\
3. & \neg r & \text{premise} \\
4. & q \to r & \text{MP on 1, 2} \\
5. & \neg q & \text{MT on 4, 3}
\end{array}
$$
$\blacksquare$

**Example 11.** Show $\{(p \vee q) \to r, \neg r\} \vdash \neg p \wedge \neg q$.

*Proof.*
$$
\begin{array}{lll}
1. & (p \vee q) \to r & \text{premise} \\
2. & \neg r & \text{premise} \\
3. & \neg(p \vee q) & \text{MT on 1, 2} \\
4. & \neg p \wedge \neg q & \text{De Morgan on 3}
\end{array}
$$
$\blacksquare$

**Example 12.** Show $\{p \leftrightarrow q, q \leftrightarrow r\} \vdash p \leftrightarrow r$.

*Proof.*
From 1 extract $p \to q$ and $q \to p$; from 2 extract $q \to r$ and $r \to q$. HS gives $p \to r$ and $r \to p$. Biconditional introduction gives $p \leftrightarrow r$. $\blacksquare$

**Example 13 (Invalid).** Show $\{p \to q, q\}$ **does not entail** $p$.

*Counterexample.* $p = \mathbf{F}, q = \mathbf{T}$: both premises $\mathbf{T}$, conclusion $\mathbf{F}$. $\blacksquare$ (Classic fallacy of affirming the consequent.)

## 6.8 Summary

- An **argument** $\alpha_1, \dots, \alpha_k \vdash \beta$ is **valid** iff $\{\alpha_1, \dots, \alpha_k\} \models \beta$, iff $(\alpha_1 \wedge \dots \wedge \alpha_k) \to \beta$ is a tautology.
- **Sound** = valid + true premises; logic establishes validity only.
- **Fallacies**: affirming the consequent, denying the antecedent.
- Standard **inference rules**: MP, MT, HS, DS, Addition, Simp, Conj, CD, DD, Resolution, biconditional rules, Replacement.
- A **proof** is a rule-annotated sequence of formulas from premises to conclusion.
- **Strategies**: work backward, work forward, conditional proof, proof by contradiction, proof by cases.
- **Resolution** alone is refutation-complete on CNF.

## Related Concepts

- [[03-tautologies-contradictions-satisfiability]] — validity via tautology.
- [[04-logical-equivalence-and-laws]] — equivalences used as replacement rules.
- [[05-normal-forms-cnf-dnf]] — resolution works on CNF.
- [[09-formal-proofs-and-modus-ponens]] — the axiomatic analogue of rule-based proofs.
- [[10-deduction-theorem]] — formalizes "conditional proof".

## Sources

- [[raw/Lecture_Notes_on_Propositional_Logic]] — arguments and inference rules (Chapters 7–8).
