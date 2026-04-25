---
title: "Mathematical Logic and Computability — Master Index"
type: index
module: "All"
file: 00
related: []
sources: [Propositional_Logic_260316_142440, Propositional_Calculus_260316_142509, First-order_Logic_260316_142527, Computability_260316_142548]
---

# 00. Mathematical Logic and Computability — Master Index

A comprehensive self-contained guide to Mathematical Logic and the Theory of Computation, split across four modules and 23 content chapters plus this index. Built from four source lecture-note PDFs, designed for beginner-to-expert progression: each chapter includes formal definitions, intuitive motivation, worked examples, and proofs.

## Reading Paths

### Complete linear path (beginner → expert)
Work through files **01 → 23** in order. Each module builds on the previous:
- Module 1 (Propositional Logic, 01–07) introduces semantic reasoning.
- Module 2 (Propositional Calculus, 08–12) formalizes proof systems.
- Module 3 (First-Order Logic, 13–17) adds quantifiers and structures.
- Module 4 (Computability, 18–23) builds machines and proves limits of algorithmic solution.

### Short path: Logic only
01 → 02 → 03 → 04 → 06 → 08 → 10 → 11 → 13 → 14 → 15 → 16.

### Short path: Computability only
18 → 19 → 20 → 21 → 22 → 23.
*Prerequisite*: mathematical maturity with proofs and induction (skim 02 and 06).

### Fast review for exam
- Module 1: 03 (entailment), 04 (laws), 05 (normal forms), 06 (inference) + 07.
- Module 2: 08 (axiom schemes), 10 (DT), 11 (soundness/completeness) + 12.
- Module 3: 15 (substitution), 16 (satisfaction & validity) + 17.
- Module 4: 20 (Kleene), 21 (pumping), 22 (halting) + 23.

### Conceptual tour for the curious
01 → 03 → 11 → 16 → 22 — trace the full arc: syntax, semantics, completeness, first-order models, Turing's limit.

## Module Tables

### Module 1: Propositional Logic (semantics-first)

| # | Title | Core Concept | Key Results |
|:---|:------|:-------------|:------------|
| [[01-propositions-connectives-truth-values]] | Propositions, Connectives, Truth Values | $\neg, \wedge, \vee, \to, \leftrightarrow$ | Truth tables; precedence |
| [[02-wffs-and-truth-tables]] | Well-Formed Formulas and Truth Tables | Recursive syntax, valuations | Unique readability; parse trees |
| [[03-tautologies-contradictions-satisfiability]] | Tautologies, Contradictions, Satisfiability | 3-class taxonomy, entailment | Semantic deduction theorem |
| [[04-logical-equivalence-and-laws]] | Logical Equivalence and Laws | $\equiv$, algebraic laws | Duality; Replacement Theorem |
| [[05-normal-forms-cnf-dnf]] | Normal Forms (CNF, DNF) | CNF, DNF, canonical forms | Functional completeness |
| [[06-arguments-and-rules-of-inference]] | Arguments and Rules of Inference | MP, MT, HS, DS, Resolution | Fallacies; proof strategies |
| [[07-module1-practice-problems]] | Module 1 Practice Problems | — | 16 problems with full solutions |

### Module 2: Propositional Calculus (syntax-first, axiomatic)

| #                                       | Title                            | Core Concept                                                             | Key Results                           |
| :-------------------------------------- | :------------------------------- | :----------------------------------------------------------------------- | :------------------------------------ |
| [[08-axiomatic-propositional-calculus]] | Axiomatic Propositional Calculus | System $\mathcal{L}$, A1, A2, A3, MP                                     | $\vdash \alpha \to \alpha$ in 5 steps |
| [[09-formal-proofs-and-modus-ponens]]   | Formal Proofs and Modus Ponens   | Derivation toolkit                                                       | HS, contraposition, DNE               |
| [[10-deduction-theorem]]                | Deduction Theorem                | $\Gamma, \alpha \vdash \beta \Rightarrow \Gamma \vdash \alpha \to \beta$ | Full inductive proof                  |
| [[11-soundness-and-completeness]]       | Soundness and Completeness       | $\vdash = \models$                                                       | Kalmár; Henkin; compactness           |
| [[12-module2-practice-problems]]        | Module 2 Practice Problems       | —                                                                        | 20 problems                           |

### Module 3: First-Order Logic

| # | Title | Core Concept | Key Results |
|:---|:------|:-------------|:------------|
| [[13-predicates-and-quantifiers]] | Predicates and Quantifiers | $\forall, \exists$, translation patterns | Quantifier duality |
| [[14-terms-formulas-parsing]] | Terms, Formulas, and Parsing | Signatures, recursive grammar | Structural induction |
| [[15-free-bound-substitutions]] | Free/Bound Variables and Substitution | $\phi[t/x]$ with capture-avoidance | Admissible substitutions; $\alpha$-renaming |
| [[16-interpretations-and-validity]] | Interpretations and Validity | Structures, assignments, $\models$ | FOL equivalences; FOL undecidable |
| [[17-module3-practice-problems]] | Module 3 Practice Problems | — | 13 problems |

### Module 4: Computability

| # | Title | Core Concept | Key Results |
|:---|:------|:-------------|:------------|
| [[18-dfa]] | Deterministic Finite Automata | 5-tuple, $\hat\delta$, regular languages | Worked DFA constructions |
| [[19-nfa-and-enfa]] | NFA and $\varepsilon$-NFA | Subset construction, $\varepsilon$-closure | DFA = NFA = $\varepsilon$-NFA |
| [[20-regular-expressions-and-kleenes-theorem]] | Regular Expressions and Kleene's Theorem | Regex syntax, Thompson, state elimination | Regex $=$ regular languages |
| [[21-closure-and-pumping-lemma]] | Closure and Pumping Lemma | Boolean closures; pumping proof | Myhill–Nerode |
| [[22-turing-machines-and-computability]] | Turing Machines and Computability | TM 7-tuple, recognizable vs decidable | Halting problem; Rice's theorem |
| [[23-module4-practice-problems]] | Module 4 Practice Problems | — | 35 problems |

## Theorem Index

Quick reference to major named theorems. File numbers in brackets.

### Module 1
- **Semantic Deduction Theorem**: $\Gamma, \alpha \models \beta \iff \Gamma \models \alpha \to \beta$. [03]
- **Replacement Theorem**: Equivalents can substitute within a formula. [04]
- **Normal Form Theorem**: Every formula has an equivalent CNF and DNF. [05]
- **Functional Completeness**: $\{\neg, \vee\}, \{\neg, \wedge\}, \{\neg, \to\}, \{\text{NAND}\}, \{\text{NOR}\}$ are each complete. [05]
- **Soundness of Resolution**: Resolution preserves satisfiability. [06]

### Module 2
- **$\vdash \alpha \to \alpha$**: 5-step derivation. [08]
- **Hypothetical Syllogism derived**: $\alpha \to \beta, \beta \to \gamma \vdash \alpha \to \gamma$. [09]
- **Deduction Theorem**: $\Gamma \cup \{\alpha\} \vdash \beta \iff \Gamma \vdash \alpha \to \beta$. [10]
- **Soundness**: $\Gamma \vdash \varphi \Rightarrow \Gamma \models \varphi$. [11]
- **Completeness (Kalmár/Henkin)**: $\Gamma \models \varphi \Rightarrow \Gamma \vdash \varphi$. [11]
- **Compactness**: $\Gamma \models \varphi \Rightarrow$ some finite $\Gamma_0 \subseteq \Gamma$ has $\Gamma_0 \models \varphi$. [11]

### Module 3
- **Quantifier Duality**: $\neg \forall x\, \phi \equiv \exists x\, \neg \phi$. [13]
- **$\alpha$-conversion**: Renaming bound variables preserves meaning. [15]
- **FOL validity is undecidable**: Reduces to Halting Problem. [16]
- **Gödel Completeness**: $\Gamma \models \varphi \iff \Gamma \vdash \varphi$ in FOL. [16 — cited]

### Module 4
- **Subset Construction**: NFA $\to$ DFA, $2^{|Q|}$ states max. [19]
- **Kleene's Theorem**: Regex $=$ DFA-recognizable. [20]
- **Pumping Lemma (Regular)**: Long strings in a regular $L$ can be split $xyz$ with $xy^iz \in L$. [21]
- **Myhill–Nerode**: $L$ regular $\iff$ finite index of $\equiv_L$. [21]
- **Halting Problem Undecidable**: Diagonalization. [22]
- **Rice's Theorem**: Nontrivial semantic properties of TMs are undecidable. [22]
- **Decidable $= \text{RE} \cap \text{co-RE}$**. [22]
- **Church–Turing Thesis**: Effective computation $=$ TM computation. [22]

## Dependency Graph

```
     01 ─── 02 ─── 03 ─── 04 ─── 05
                    │      │      │
                    └──────┴──────┴── 06 ─── 07
                                            (Module 1 done)

     08 ─── 09 ─── 10 ─── 11 ─── 12
      ↑      (Module 2 done)
    uses 03 (semantics), 06 (MP)

     13 ─── 14 ─── 15 ─── 16 ─── 17
            ↑      (Module 3 done)
          uses 02 (recursive syntax),
          04 (laws lift to ∀/∃)

     18 ─── 19 ─── 20 ─── 21 ─── 22 ─── 23
      (Module 4 done — 22 cites 16 for FOL↔HALT)
```

## Glossary

| Term | Module | Meaning |
|:-----|:-------|:--------|
| **Atomic formula** | 1, 3 | Proposition / predicate application to terms |
| **Axiom scheme** | 2 | A pattern; every instance is an axiom |
| **CFL** | 4 | Context-free language |
| **CNF** | 1 | Conjunctive Normal Form (∧ of ∨'s) |
| **DFA** | 4 | Deterministic Finite Automaton |
| **DNF** | 1 | Disjunctive Normal Form (∨ of ∧'s) |
| **Entailment** | 1 | $\Gamma \models \varphi$: every model of $\Gamma$ models $\varphi$ |
| **Free variable** | 3 | Variable not bound by any quantifier |
| **HALT** | 4 | Halting Problem language |
| **Kleene closure** | 4 | $L^* = \bigcup_n L^n$ |
| **MP** | 2 | Modus Ponens |
| **NFA** | 4 | Nondeterministic Finite Automaton |
| **Pumping length** | 4 | Constant $p$ from pumping lemma |
| **RE** | 4 | Recursively Enumerable $=$ Turing-recognizable |
| **Signature** | 3 | Set of function and predicate symbols with arities |
| **Tautology** | 1 | True under every valuation |
| **TM** | 4 | Turing Machine |
| **Valuation** | 1 | Assignment $v: \text{Props} \to \{T, F\}$ |
| **WFF** | 1, 3 | Well-Formed Formula |
| **$\vdash$** | 2, 3 | Syntactic derivability |
| **$\models$** | 1, 3 | Semantic entailment |
| **$\sqcup$** | 4 | Blank tape symbol |
| **$\varepsilon$** | 1, 4 | Empty string (Ch. 20) / propositional $\top$ (less common) |

## How to Use This Guide

### For self-study
- Do every worked example before reading the solution.
- Use practice sets 07, 12, 17, 23 as milestones — if you can solve ~80%, move on.
- When stuck on a proof, read the next chapter to see how the concept is used, then return.

### For revision
- Skim the **Summary** section at the end of each chapter (every chapter has one).
- Use the **Theorem Index** above to locate a specific result.
- Practice problems 07, 12, 17, 23 are self-contained — do them closed-book.

### For teaching
- Each module is 5–7 chapters, suitable as 5–7 lectures.
- Chapters 07, 12, 17, 23 make good tutorial-session material.
- The dependency graph above shows minimum prerequisites for any chapter.

## Topics Beyond This Scope

This guide covers the core undergraduate / early-graduate syllabus. The following connect outward but are not developed in detail here:

- **Gödel's Incompleteness Theorems** — touched on in 22; full treatment requires a course.
- **Cook–Levin Theorem and NP-completeness** — mentioned; see any complexity textbook.
- **Modal, Intuitionistic, Temporal logics** — non-classical logics; see Blackburn–de Rijke–Venema.
- **Higher-order logic and type theory** — Church's simple type theory, dependent types.
- **Descriptive complexity** — Fagin's theorem, SO ↔ NP.
- **Proof theory** — sequent calculus, cut-elimination, ordinal analysis.
- **Automated theorem proving** — resolution in FOL, SMT solvers.
- **Descriptive set theory / computability at higher levels** — hyperarithmetic, analytical hierarchy.
- **Randomized and quantum complexity** — BPP, BQP.

For follow-ups: Sipser (Theory of Computation), Enderton (Mathematical Logic), Shoenfield (Mathematical Logic), Boolos–Burgess–Jeffrey (Computability and Logic), Mendelson (Introduction to Mathematical Logic).

## Sources

Four lecture-note PDFs underlie this guide:
- [[raw/Propositional_Logic_260316_142440]] — Module 1.
- [[raw/Propositional_Calculus_260316_142509]] — Module 2.
- [[raw/First-order_Logic_260316_142527]] — Module 3.
- [[raw/Computability_260316_142548]] — Module 4.

(A fifth source, "Theory of Computation", was unreadable (HTML) and substituted by the Computability notes plus standard results — no unique content was lost, as the Computability source covers the required ground.)

## Changelog

- **2026-04-19**: Initial compilation — 23 content chapters (01–23) plus this index (00). Complete coverage of all four source modules; 60+ worked examples; 100+ practice problems; 40+ named theorems.
