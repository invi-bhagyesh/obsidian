---
title: "Soundness and Completeness"
type: guide
module: "Propositional Calculus"
file: 11
related: [03-tautologies-contradictions-satisfiability, 08-axiomatic-propositional-calculus, 10-deduction-theorem]
sources: [Lecture_Notes_2__on_Propositional_Calculus]
---

# 11. Soundness and Completeness

We have two worlds in propositional logic: **semantic** (truth tables, tautologies, $\models$) and **syntactic** (axioms, MP, derivations, $\vdash$). The central metatheorems of Module 2 say these two worlds are **in perfect agreement**: the Hilbert system $\mathcal{L}$ ([[08-axiomatic-propositional-calculus]]) proves exactly the tautologies, and more generally, syntactic entailment $\vdash$ coincides with semantic entailment $\models$.

## 11.1 The Two Theorems

> **Theorem 11.1 (Soundness).** For all $\Gamma$ and $\alpha$: if $\Gamma \vdash \alpha$, then $\Gamma \models \alpha$.

"Every provable formula is a tautology (when $\Gamma = \emptyset$)." "Every entailment that can be derived is semantically valid."

> **Theorem 11.2 (Completeness).** For all $\Gamma$ and $\alpha$: if $\Gamma \models \alpha$, then $\Gamma \vdash \alpha$.

"Every tautology is provable." "Every semantic entailment can be derived formally."

Together: $\Gamma \vdash \alpha \iff \Gamma \models \alpha$.

## 11.2 Soundness: Proof

> **Proof of Theorem 11.1.** By induction on the length $n$ of a derivation $\alpha_1, \dots, \alpha_n = \alpha$ from $\Gamma$. We show: every $\alpha_i$ is entailed by $\Gamma$.

**Case 1:** $\alpha_i$ is an axiom (instance of A1, A2, or A3). Each axiom scheme is a tautology (verifiable by truth table — see [[08-axiomatic-propositional-calculus]] §8.7), hence $\models \alpha_i$, hence $\Gamma \models \alpha_i$.

**Case 2:** $\alpha_i \in \Gamma$. Then $\Gamma \models \alpha_i$ trivially.

**Case 3:** $\alpha_i$ from MP on earlier $\alpha_j, \alpha_k = \alpha_j \to \alpha_i$. By IH: $\Gamma \models \alpha_j$, $\Gamma \models \alpha_j \to \alpha_i$. Let $v$ satisfy $\Gamma$. Then $\bar v(\alpha_j) = \mathbf{T}$ and $\bar v(\alpha_j \to \alpha_i) = \mathbf{T}$. By the truth table of $\to$, $\bar v(\alpha_i) = \mathbf{T}$. So $\Gamma \models \alpha_i$.

Therefore $\Gamma \models \alpha_n = \alpha$. $\blacksquare$

*Key mechanism.* The two ingredients are:
- Axioms are tautologies.
- MP preserves truth.

These are both **one-shot** checks. Once verified, soundness is immediate.

### Corollary: Consistency

> **Corollary 11.3.** $\mathcal{L}$ is **consistent**: there is no $\alpha$ such that $\vdash \alpha$ and $\vdash \neg\alpha$.

*Proof.* Suppose $\vdash \alpha$ and $\vdash \neg\alpha$. By soundness, $\models \alpha$ and $\models \neg\alpha$ — impossible, since no valuation satisfies both. $\blacksquare$

## 11.3 Completeness: Sketch of the Proof

Completeness is harder. The standard proof (due to Kalmár and streamlined by Mendelson) goes:

### Step 1. Kalmár's Lemma

Let $\alpha$ be any WFF with propositional variables $p_1, \dots, p_n$. Fix a valuation $v$; for each $p_i$, let
$$
p_i' := \begin{cases} p_i & \text{if } v(p_i) = \mathbf{T} \\ \neg p_i & \text{if } v(p_i) = \mathbf{F} \end{cases} \qquad \alpha' := \begin{cases} \alpha & \text{if } \bar v(\alpha) = \mathbf{T} \\ \neg\alpha & \text{if } \bar v(\alpha) = \mathbf{F} \end{cases}
$$

> **Lemma 11.4 (Kalmár).** $\{p_1', \dots, p_n'\} \vdash \alpha'$.

*Proof sketch.* Induction on the structure of $\alpha$:
- **Base.** $\alpha = p_i$. Then $\alpha' = p_i'$; $\{p_i'\} \vdash p_i'$ by reflexivity.
- **Step $\alpha = \neg\beta$.** By IH, $\{p_1', \dots\} \vdash \beta'$. If $\bar v(\beta) = \mathbf{T}$, then $\alpha' = \neg\alpha = \neg\neg\beta$, and from $\beta$ we derive $\neg\neg\beta$ (using Lemma 10.4). If $\bar v(\beta) = \mathbf{F}$, then $\alpha' = \alpha = \neg\beta = \beta'$.
- **Step $\alpha = \beta \to \gamma$.** Case analysis on $\bar v(\beta), \bar v(\gamma)$ — four cases. Each case uses standard derived theorems.

$\blacksquare$

### Step 2. Reduction

Suppose $\models \alpha$ (i.e., $\alpha$ is a tautology). We show $\vdash \alpha$.

Let $p_1, \dots, p_n$ be the variables of $\alpha$. By Kalmár's Lemma applied to each of the $2^n$ valuations $v$: for every $v$, $\{p_1', \dots, p_n'\} \vdash \alpha$ (since $\bar v(\alpha) = \mathbf{T}$ for all $v$, we always have $\alpha' = \alpha$).

### Step 3. Eliminate hypotheses pairwise

Pair up the $2^n$ valuations: for any valuation-pair differing only in the value of $p_n$, we can apply DT to both and combine using the theorem
$$
\vdash (p \to r) \to ((\neg p \to r) \to r)
$$
(proof-by-cases as a theorem of $\mathcal{L}$ — a consequence of A3 and DT). This eliminates the variable $p_n$ from the hypothesis set.

Iterating, all $n$ variables are eliminated, yielding $\vdash \alpha$.

### Step 4. Extending to $\Gamma \models \alpha \Rightarrow \Gamma \vdash \alpha$

Compactness of propositional logic (every unsatisfiable set has a finite unsatisfiable subset — provable via König's lemma or directly) lets us reduce to the case $\Gamma$ finite. Then $\Gamma = \{\gamma_1, \dots, \gamma_m\}$ and $\Gamma \models \alpha$ translates (via Semantic Deduction, [[03-tautologies-contradictions-satisfiability]] §3.5) into $\models \gamma_1 \to \cdots \to \gamma_m \to \alpha$. By Steps 1–3, $\vdash \gamma_1 \to \cdots \to \gamma_m \to \alpha$; by DT converse, $\Gamma \vdash \alpha$. $\blacksquare$

## 11.4 Consistency-Based Reformulation (Henkin-style)

A cleaner alternative is the Henkin method, which applies to both propositional and first-order logic.

> **Definitions.**
> - $\Gamma$ is **consistent** if there is no $\alpha$ with $\Gamma \vdash \alpha$ and $\Gamma \vdash \neg\alpha$.
> - $\Gamma$ is **maximally consistent** if consistent, and for every WFF $\alpha$ either $\alpha \in \Gamma$ or $\neg\alpha \in \Gamma$.

> **Theorem 11.5 (Lindenbaum).** Every consistent $\Gamma$ extends to a maximally consistent $\Gamma^* \supseteq \Gamma$.

*Proof.* Enumerate all WFFs $\varphi_1, \varphi_2, \dots$. Set $\Gamma_0 = \Gamma$; at stage $i+1$, if $\Gamma_i \cup \{\varphi_i\}$ is consistent, set $\Gamma_{i+1} = \Gamma_i \cup \{\varphi_i\}$; else $\Gamma_{i+1} = \Gamma_i \cup \{\neg\varphi_i\}$. Let $\Gamma^* = \bigcup_i \Gamma_i$. Then $\Gamma^*$ is consistent (consistency is finitary, and each stage preserves it) and maximal. $\blacksquare$

> **Theorem 11.6 (Henkin).** Every maximally consistent $\Gamma^*$ has a model: define $v^*(p) = \mathbf{T}$ iff $p \in \Gamma^*$. Then $v^* \models \Gamma^*$.

*Proof.* Show by induction on WFFs $\varphi$: $v^* \models \varphi \iff \varphi \in \Gamma^*$.

- **Base.** For variable $p$: $v^*(p) = \mathbf{T} \iff p \in \Gamma^*$.
- **$\neg\varphi$.** $v^* \models \neg\varphi \iff v^* \not\models \varphi \iff \varphi \notin \Gamma^* \iff \neg\varphi \in \Gamma^*$ (by maximal consistency).
- **$\varphi \to \psi$.** Case analysis using consistency. $\blacksquare$

> **Corollary 11.7 (Completeness).** If $\Gamma \not\vdash \alpha$, then $\Gamma \not\models \alpha$ (contrapositive).

*Proof.* $\Gamma \not\vdash \alpha$ means $\Gamma \cup \{\neg\alpha\}$ is consistent. By Lindenbaum, extend to $\Gamma^*$ max consistent. By Henkin, $\Gamma^*$ has a model $v^*$. Then $v^* \models \Gamma$ and $v^* \models \neg\alpha$, so $v^* \not\models \alpha$. Hence $\Gamma \not\models \alpha$. $\blacksquare$

## 11.5 Compactness

> **Theorem 11.8 (Compactness).** $\Gamma$ is satisfiable iff every finite subset $\Gamma_0 \subseteq \Gamma$ is satisfiable.

*Proof.* ($\Rightarrow$) Trivial. ($\Leftarrow$) Suppose every finite subset is satisfiable. Use Completeness (and its contrapositive): if $\Gamma$ were unsatisfiable, then $\Gamma \models \bot$ (for any contradiction $\bot$), so $\Gamma \vdash \bot$ by Completeness. But a derivation uses only finitely many hypotheses, so some finite $\Gamma_0 \vdash \bot$, hence $\Gamma_0$ is unsatisfiable — contradiction. $\blacksquare$

Compactness is powerful: it lets us prove satisfiability of infinite theories by checking all finite fragments. In first-order logic ([[16-interpretations-and-validity]]) compactness is the backbone of model theory (non-standard models, ultraproducts, etc.).

## 11.6 Decidability and Complexity

Soundness + Completeness + the truth-table decision procedure together imply:

> **Theorem 11.9.** For any $\alpha$, one can decide in finite time whether $\vdash \alpha$.

*Proof.* Check whether $\alpha$ is a tautology (truth table: $2^n$ rows). By Soundness+Completeness this is equivalent to $\vdash \alpha$. $\blacksquare$

*Caveat.* This is a **decidability** statement, not an efficiency one. SAT (the dual problem — is $\alpha$ satisfiable?) is NP-complete; **TAUT** (is $\alpha$ a tautology?) is coNP-complete. We return to this in [[22-turing-machines-and-computability]].

## 11.7 Intuition: Why It Works

Why do the three axioms A1, A2, A3 manage to capture **every** tautology?

- **A1** $\alpha \to (\beta \to \alpha)$ encodes "extra information is harmless" — can weaken any true proposition.
- **A2** $(\alpha \to (\beta \to \gamma)) \to ((\alpha \to \beta) \to (\alpha \to \gamma))$ encodes implicational distributivity — enables the Deduction Theorem.
- **A3** $(\neg\beta \to \neg\alpha) \to ((\neg\beta \to \alpha) \to \beta)$ encodes classical reductio — the one axiom that distinguishes classical logic from intuitionistic logic.

Remove A3 and we lose double negation elimination, excluded middle, and contrapositive — but we still get **intuitionistic propositional logic**, which has its own soundness/completeness w.r.t. Heyting-algebra semantics or Kripke semantics.

## 11.8 Worked Example: Applying the Results

**Example 1.** Use Completeness to conclude $\vdash ((p \to q) \to p) \to p$ (Peirce's law) **without** exhibiting a derivation.

*Solution.* Check by truth table that Peirce's law is a tautology:
$$
\begin{array}{cc|c|c|c}
p & q & p \to q & (p \to q) \to p & \text{Peirce} \\ \hline
\mathbf{T} & \mathbf{T} & \mathbf{T} & \mathbf{T} & \mathbf{T} \\
\mathbf{T} & \mathbf{F} & \mathbf{F} & \mathbf{T} & \mathbf{T} \\
\mathbf{F} & \mathbf{T} & \mathbf{T} & \mathbf{F} & \mathbf{T} \\
\mathbf{F} & \mathbf{F} & \mathbf{T} & \mathbf{F} & \mathbf{T}
\end{array}
$$
All $\mathbf{T}$. By Completeness, $\vdash ((p \to q) \to p) \to p$. $\blacksquare$

(Exhibiting a direct derivation of Peirce's law is notoriously tricky. Completeness hands us the result for free.)

**Example 2.** Show $\vdash (p \to q) \vee (q \to p)$ semantically.

*Solution.* Check the truth table: tautology (confirmed in [[03-tautologies-contradictions-satisfiability]] Example 3). By Completeness, $\vdash (p \to q) \vee (q \to p)$. $\blacksquare$

## 11.9 Summary

- **Soundness** ($\vdash \Rightarrow \models$): follows because axioms are tautologies and MP preserves truth.
- **Completeness** ($\models \Rightarrow \vdash$): Kalmár method or Henkin method via Lindenbaum extension.
- **Consistency**: $\mathcal{L}$ is consistent (Corollary of Soundness).
- **Compactness**: $\Gamma$ satisfiable iff every finite subset is.
- **Decidability**: provability reduces to tautology-checking → truth tables.
- Completeness lets us bypass intricate derivations when convenient — just verify the truth table.
- A3 is the one axiom specific to **classical** logic; without it, intuitionistic logic.

## Related Concepts

- [[03-tautologies-contradictions-satisfiability]] — semantic entailment.
- [[08-axiomatic-propositional-calculus]] — the syntactic system $\mathcal{L}$.
- [[10-deduction-theorem]] — key tool in the Completeness proof.
- [[22-turing-machines-and-computability]] — complexity of SAT and TAUT.

## Sources

- [[raw/Lecture_Notes_2__on_Propositional_Calculus]] — Soundness, Completeness (Chapter 5).
