# Database Systems (CSS 2201) — Final Theory Exam Guide

A topic-wise, self-contained study guide compiled from the lecture decks (`Notes/DBS/raw/`). Each chapter contains all theory, SQL examples, algorithms, and the standard solved numericals/problems you should expect on the theory paper.

---

## Module Map (per CSS 2201 Syllabus)

| Module | Topics | Chapters | Hours |
|---|---|---|---|
| **1** | Introduction, Relational Model, Query Processing | [01](01-introduction.md), [02](02-relational-model.md), [03](03-query-processing.md) | 8 |
| **2** | Structured Query Language | [04](04-sql.md) | 12 |
| **3** | E-R Model + Normalization | [05](05-er-model.md), [06](06-normalization.md) | 14 |
| **4** | Indexing & Hashing, Transactions, Concurrency, Recovery | [07](07-indexing-hashing.md), [08](08-transactions.md), [09](09-concurrency.md), [10](10-recovery.md) | 14 |
| Extra | NoSQL | [11](11-nosql.md) | — |

---

## Chapter Index

1. [Introduction](01-introduction.md) — Database applications, purpose, levels of abstraction, languages, engine, architecture, users.
2. [Relational Model](02-relational-model.md) — Relations, schema, keys, schema diagram, relational algebra (σ, π, ∪, −, ×, ρ + joins).
3. [Query Processing](03-query-processing.md) — Cost measures, selection algorithms (A1–A6), sorting, joins.
4. [SQL](04-sql.md) — DDL, queries, joins, views, integrity constraints, transactions in SQL.
5. [E-R Model](05-er-model.md) — Entities, relationships, cardinalities, weak entities, specialization, aggregation, reduction to schemas.
6. [Normalization](06-normalization.md) — FDs, attribute closure, canonical cover, 1NF–4NF, BCNF/3NF decomposition.
7. [Indexing & Hashing](07-indexing-hashing.md) — Ordered indices, B+ trees, hashing, bitmap indices.
8. [Transactions](08-transactions.md) — ACID, schedules, conflict & view serializability, recoverable/cascadeless schedules.
9. [Concurrency Control](09-concurrency.md) — Lock-based, 2PL, deadlock handling, timestamp ordering, validation-based.
10. [Recovery](10-recovery.md) — Failure types, log-based recovery, checkpoints, recovery algorithm.
11. [NoSQL](11-nosql.md) — Types, advantages/disadvantages, CAP theorem.

---

## How to Use This Guide

- **Theory questions:** every chapter ends with a "Likely exam questions" section.
- **SQL questions:** Chapter 4 has every syntactic construct you need; practice queries are listed at the end.
- **Algorithmic questions** (B+ tree insert/delete, Banker's-style decomposition, Banker's-like recovery traces): solved examples are in chapters 6, 7, 9, 10.
- **Concept review:** the "Quick Reference" sections inside chapters 6 and 9 are good for fast revision.

---

## Suggested Study Order

1. **Module 1:** Ch. 1 → Ch. 2 → Ch. 3 (foundation).
2. **Module 2:** Ch. 4 (SQL — practice queries heavily).
3. **Module 3:** Ch. 5 (ER) → Ch. 6 (Normalization — FDs and BCNF/3NF decomposition are big exam topics).
4. **Module 4:** Ch. 7 (Indexing — B+ tree insertion/deletion mandatory) → Ch. 8 (Transactions) → Ch. 9 (Concurrency) → Ch. 10 (Recovery).
5. **Bonus:** Ch. 11 (NoSQL — short read).

---

## Frequently-Tested Algorithms (cheat sheet)

- **Attribute closure** (Ch. 6): repeatedly add all attributes implied by FDs in F.
- **Canonical cover** (Ch. 6): merge same-LHS, drop extraneous attributes.
- **BCNF decomposition** (Ch. 6): for each violator α→β, split into (α∪β) and (R−(β−α)).
- **3NF synthesis** (Ch. 6): use canonical cover; one schema per FD; ensure candidate key included.
- **Lossless decomposition test** (Ch. 6): R₁ ∩ R₂ functionally determines R₁ or R₂.
- **B+ tree insertion** (Ch. 7): split overflowing leaves; propagate new keys to parent.
- **B+ tree deletion** (Ch. 7): merge or redistribute on underflow; cascade upward.
- **Conflict serializability test** (Ch. 8): build precedence graph; check acyclic.
- **Wait-die / Wound-wait** (Ch. 9): deadlock prevention by timestamp.
- **Timestamp ordering rules** (Ch. 9): reject reads/writes that violate timestamp order.
- **Recovery algorithm** (Ch. 10): redo from last checkpoint forward, undo backward for incomplete transactions.

---

## Key Formulas

- **Selection cost A1 (linear scan):** $b_r$ block transfers + 1 seek.
- **Selection cost A2 (clustering equality on key):** $(h_i + 1)(t_T + t_S)$.
- **External sort total transfers:** $b_r (2 \lceil \log_{\lfloor M/b_b \rfloor - 1}(b_r/M) \rceil + 1)$.
- **Nested-loop join (worst):** $b_r \cdot b_s + b_r$ block transfers.
- **B+ tree height:** $\le \lceil \log_{\lceil n/2 \rceil}(K) \rceil$.

---

## Source

All content is extracted from `Notes/DBS/raw/`:
- `chap1_Introduction.pdf`
- `chap2_Relational_model.pdf`
- `Chap3_Intro_SQL.pdf`
- `Chap4_IntermediateSQL.pdf`
- `Chap6_ER Model.pdf`
- `Chap7_Relat_DBDesign_Norm.pdf`
- `Chap13_14_Indexing_Hashing.pdf`
- `Chap17_Transactions.pdf`
- `Chap18_ConcurrencyControl.pdf`
- `Chap19_Recovery.pdf`
- `SDL_Mod1_NoSQL_QueryProc.pdf`
- `CSS2201 DBS2026 Detailed Syllabus.pdf` (course outline)
