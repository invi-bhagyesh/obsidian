# 06 — Normalization

*Source: Chap7_Relat_DBDesign_Norm.pdf — Database System Concepts, 7th Ed., Silberschatz, Korth and Sudarshan*

## Outline

- Features of Good Relational Design
- Functional Dependencies
- Decomposition Using Functional Dependencies
- Normal Forms
- Functional Dependency Theory
- Algorithms for Decomposition using Functional Dependencies
- Decomposition Using Multivalued Dependencies

---

## 6.1 Features of Good Relational Designs

Suppose we combine *instructor* and *department* into `in_dep`, which represents the natural join on the relations *instructor* and *department*:

| ID    | name       | salary | dept_name  | building | budget |
|-------|------------|--------|------------|----------|--------|
| 22222 | Einstein   | 95000  | Physics    | Watson   | 70000  |
| 12121 | Wu         | 90000  | Finance    | Painter  | 120000 |
| 32343 | El Said    | 60000  | History    | Painter  | 50000  |
| 45565 | Katz       | 75000  | Comp. Sci. | Taylor   | 100000 |
| 98345 | Kim        | 80000  | Elec. Eng. | Taylor   | 85000  |
| 76766 | Crick      | 72000  | Biology    | Watson   | 90000  |
| 10101 | Srinivasan | 65000  | Comp. Sci. | Taylor   | 100000 |
| 58583 | Califieri  | 62000  | History    | Painter  | 50000  |
| 83821 | Brandt     | 92000  | Comp. Sci. | Taylor   | 100000 |
| 15151 | Mozart     | 40000  | Music      | Packard  | 80000  |
| 33456 | Gold       | 87000  | Physics    | Watson   | 70000  |
| 76543 | Singh      | 80000  | Finance    | Painter  | 120000 |

- There is **repetition of information**.
- Need to use **null values** (if we add a new department with no instructors).

---

## 6.2 Decomposition

- The only way to avoid the repetition-of-information problem in the `in_dep` schema is to decompose it into two schemas — *instructor* and *department* schemas.
- Not all decompositions are good. Suppose we decompose:
  ```
  employee(ID, name, street, city, salary)
  ```
  into
  ```
  employee1 (ID, name)
  employee2 (name, street, city, salary)
  ```
- The problem arises when we have two employees with the same name.
- The next slide shows how we lose information — we cannot reconstruct the original *employee* relation — and so, this is a **lossy decomposition**.

---

## 6.3 A Lossy Decomposition

Original *employee*:

| ID    | name | street | city       | salary |
|-------|------|--------|------------|--------|
| 57766 | Kim  | Main   | Perryridge | 75000  |
| 98776 | Kim  | North  | Hampton    | 67000  |

Decomposed:

`(ID, name)`:

| ID    | name |
|-------|------|
| 57766 | Kim  |
| 98776 | Kim  |

`(name, street, city, salary)`:

| name | street | city       | salary |
|------|--------|------------|--------|
| Kim  | Main   | Perryridge | 75000  |
| Kim  | North  | Hampton    | 67000  |

Natural join of the two yields:

| ID    | name | street | city       | salary |
|-------|------|--------|------------|--------|
| 57766 | Kim  | Main   | Perryridge | 75000  |
| 57766 | Kim  | North  | Hampton    | 67000  |
| 98776 | Kim  | Main   | Perryridge | 75000  |
| 98776 | Kim  | North  | Hampton    | 67000  |

Spurious tuples are introduced — original information is lost.

---

## 6.4 Lossless Decomposition

- Let $R$ be a relation schema and let $R_1$ and $R_2$ form a decomposition of $R$. That is $R = R_1 \cup R_2$.
- We say that the decomposition is a **lossless decomposition** if there is no loss of information by replacing $R$ with the two relation schemas $R_1 \cup R_2$.
- Formally,
$$\Pi_{R_1}(r) \bowtie \Pi_{R_2}(r) = r$$
- And, conversely a decomposition is **lossy** if
$$r \subset \Pi_{R_1}(r) \bowtie \Pi_{R_2}(r)$$

---

## 6.5 Example of Lossless Decomposition

Decomposition of $R = (A, B, C)$ into $R_1 = (A, B)$ and $R_2 = (B, C)$.

$r$:

| A | B | C |
|---|---|---|
| α | 1 | A |
| β | 2 | B |

$\Pi_{A,B}(r)$:

| A | B |
|---|---|
| α | 1 |
| β | 2 |

$\Pi_{B,C}(r)$:

| B | C |
|---|---|
| 1 | A |
| 2 | B |

$\Pi_A(r) \bowtie \Pi_B(r)$:

| A | B | C |
|---|---|---|
| α | 1 | A |
| β | 2 | B |

The join reconstructs $r$ exactly — lossless.

---

## 6.6 Normalization Theory

Decide whether a particular relation $R$ is in "good" form.

In the case that a relation $R$ is not in "good" form, decompose it into a set of relations $\{R_1, R_2, \ldots, R_n\}$ such that:
- Each relation is in good form
- The decomposition is a lossless decomposition

Our theory is based on:
- Functional dependencies
- Multivalued dependencies

---

## 6.7 Functional Dependencies

There are usually a variety of constraints (rules) on the data in the real world.

For example, some of the constraints that are expected to hold in a university database are:
- Students and instructors are uniquely identified by their ID.
- Each student and instructor has only one name.
- Each instructor and student is (primarily) associated with only one department.
- Each department has only one value for its budget, and only one associated building.

### Functional Dependencies (Cont.)
- An instance of a relation that satisfies all such real-world constraints is called a **legal instance** of the relation.
- A legal instance of a database is one where all the relation instances are legal instances.
- Constraints on the set of legal relations.
- Require that the value for a certain set of attributes determines uniquely the value for another set of attributes.
- A functional dependency is a generalization of the notion of a *key*.

---

## 6.8 Functional Dependencies Definition

Let $R$ be a relation schema:
$$\alpha \subseteq R \text{ and } \beta \subseteq R$$

The functional dependency
$$\alpha \to \beta$$
**holds on** $R$ if and only if for any legal relations $r(R)$, whenever any two tuples $t_1$ and $t_2$ of $r$ agree on the attributes $\alpha$, they also agree on the attributes $\beta$. That is,
$$t_1[\alpha] = t_2[\alpha] \implies t_1[\beta] = t_2[\beta]$$

**Example:** Consider $r(A,B)$ with the following instance of $r$:

| A | B |
|---|---|
| 1 | 4 |
| 1 | 5 |
| 3 | 7 |

On this instance, $B \to A$ holds; $A \to B$ does **NOT** hold.

---

## 6.9 Example: Functional Dependency

$R = \{A, B, C, D\}$. Let $\alpha = \{A\}$ and $\beta = \{B\}$; $\alpha$ and $\beta$ are subsets of $R$.

| A  | B  | C  | D  |
|----|----|----|----|
| a₁ | b₁ | c₁ | d₁ |
| a₁ | b₂ | c₁ | d₂ |
| a₂ | b₂ | c₂ | d₂ |
| a₂ | b₃ | c₂ | d₃ |
| a₃ | b₃ | c₂ | d₄ |

- Is $A \to B$? — No (a₁ → b₁ and a₁ → b₂).
- Is $A \to C$? — Yes.
- Is $C \to A$? — No.

**Note:** Functional dependency is not determined by the data appearing in a relation at a given point of time; instead, it **depends on the meaning (semantics) of the attributes**.

---

## 6.10 Closure of a Set of Functional Dependencies

Given a set $F$ of functional dependencies, there are certain other functional dependencies that are logically implied by $F$.
- If $A \to B$ and $B \to C$, then we can infer that $A \to C$.
- etc.

The set of **all** functional dependencies logically implied by $F$ is the **closure** of $F$.

We denote the closure of $F$ by $F^+$.

---

## 6.11 Keys and Functional Dependencies

- $K$ is a **superkey** for relation schema $R$ if and only if $K \to R$.
- $K$ is a **candidate key** for $R$ if and only if:
  - $K \to R$, and
  - for no $\alpha \subset K$, $\alpha \to R$
- Functional dependencies allow us to express constraints that cannot be expressed using superkeys. Consider the schema:
  ```
  in_dep (ID, name, salary, dept_name, building, budget)
  ```
- We expect these functional dependencies to hold:
  - `dept_name → building`
  - `ID → building`
- but would not expect the following to hold:
  - `dept_name → salary`

---

## 6.12 Use of Functional Dependencies

We use functional dependencies to:
- **Test** relations to see if they are legal under a given set of functional dependencies.
  - If a relation $r$ is legal under a set $F$ of functional dependencies, we say that $r$ **satisfies** $F$.
- **Specify constraints** on the set of legal relations
  - We say that $F$ **holds on** $R$ if all legal relations on $R$ satisfy the set of functional dependencies $F$.

**Note:** A specific instance of a relation schema may satisfy a functional dependency even if the functional dependency does not hold on all legal instances.
- For example, a specific instance of *instructor* may, by chance, satisfy `name → ID`.

---

## 6.13 Trivial Functional Dependencies

A functional dependency is **trivial** if it is satisfied by all instances of a relation.

**Examples:**
- `ID, name → ID`
- `name → name`

In general, $\alpha \to \beta$ is trivial if $\beta \subseteq \alpha$.

---

## 6.14 Lossless Decomposition

We can use functional dependencies to show when certain decompositions are lossless.

For the case of $R = (R_1, R_2)$, we require that for all possible relations $r$ on schema $R$:
$$r = \Pi_{R_1}(r) \bowtie \Pi_{R_2}(r)$$

A decomposition of $R$ into $R_1$ and $R_2$ is a **lossless decomposition** if at least one of the following dependencies is in $F^+$:
- $R_1 \cap R_2 \to R_1$
- $R_1 \cap R_2 \to R_2$

The above functional dependencies are a sufficient condition for lossless join decomposition; the dependencies are a necessary condition only if all constraints are functional dependencies.

---

## 6.15 Example

$R = (A, B, C)$, $F = \{A \to B, B \to C\}$.

**Case 1:** $R_1 = (A, B), R_2 = (B, C)$
- Lossless decomposition:
  - $R_1 \cap R_2 = \{B\}$ and $B \to BC$

**Case 2:** $R_1 = (A, B), R_2 = (A, C)$
- Lossless decomposition:
  - $R_1 \cap R_2 = \{A\}$ and $A \to AB$

**Note:**
- $B \to BC$ is a shorthand notation for $B \to \{B, C\}$.

---

## 6.16 Dependency Preservation

- Testing functional dependency constraints each time the database is updated can be costly.
- It is useful to design the database in a way that constraints can be tested efficiently.
- If testing a functional dependency can be done by considering just one relation, then the cost of testing this constraint is low.
- When decomposing a relation it is possible that it is no longer possible to do the testing without having to perform a Cartesian Product.
- A decomposition that makes it computationally hard to enforce functional dependency is said to be **NOT dependency preserving**.

---

## 6.17 Dependency Preservation Example

Consider a schema:
```
dept_advisor(s_ID, i_ID, department_name)
```

With function dependencies:
- `i_ID → dept_name`
- `s_ID, dept_name → i_ID`

In the above design we are forced to repeat the department name once for each time an instructor participates in a `dept_advisor` relationship.

To fix this, we need to decompose `dept_advisor`.

Any decomposition will not include all the attributes in
$$s\_ID, dept\_name \to i\_ID$$

Thus, the composition will **NOT be dependency preserving**.

---

## 6.18 Normal Forms — First Normal Form

Domain is **atomic** if its elements are considered to be indivisible units.
- Examples of non-atomic domains:
  - Set of names, composite attributes
  - Identification numbers like `CS101` that can be broken up into parts

A relational schema $R$ is in **first normal form** if the domains of all attributes of $R$ are atomic.

Non-atomic values complicate storage and encourage redundant (repeated) storage of data.
- **Example:** Set of accounts stored with each customer, and set of owners stored with each account.

We assume all relations are in first normal form.

### First Normal Form (Cont.)
Atomicity is actually a property of how the elements of the domain are used.
- Strings would normally be considered indivisible.
- Suppose that students are given roll numbers which are strings of the form `CS0012` or `EE1127`.
- If the first two characters are extracted to find the department, the domain of roll numbers is not atomic.
- Doing so is a **bad idea**: leads to encoding of information in application program rather than in the database.

---

## 6.19 Second Normal Form (2NF)

For a table to be in 2NF, there are two requirements:
- The database is in **first normal form**.
- All **nonkey** attributes in the table must be **fully functionally dependent** on the entire primary key.

### Example (Not 2NF)
Scheme: `Book_author(PubId, AuId, Title, Price, AuAddress)`
1. **Primary Key** is `{PubId, AuId}`
2. `{PubId, AuID} → {Price}`
3. `{PubId, AuID} → {Title}`
4. `{AuID} → {AuAddress}`
5. AuAddress is *not determined by all key attributes*
6. **AuAddress** functionally depends **on AuId** which is a **subset of a key**
7. Hence **AuAddress partially depends on Primary Key**

### 2NF — Decomposition
1. If a data item is fully functionally dependent on only a part of the primary key, move that data item and that part of the primary key to a new table.
2. If other data items are functionally dependent on the same part of the key, place them in the new table also.
3. Make the partial primary key copied from the original table the primary key for the new table. Place all items that appear in the repeating group in a new table.

### Example 1 (Convert to 2NF)
- Old Scheme: `{PubId, AuId, Title, Price, AuAddress}`
- New Scheme1: `{PubId, AuId, Title, Price}`
- New Scheme 2: `{AuId, AuAddress}`

---

## 6.20 Third Normal Form (3NF)

A relation schema $R$ is in **third normal form (3NF)** if for all:
$$\alpha \to \beta \text{ in } F^+$$
at least one of the following holds:
- $\alpha \to \beta$ is trivial (i.e., $\beta \subseteq \alpha$)
- $\alpha$ is a superkey for $R$
- Each attribute $A$ in $\beta - \alpha$ is contained in a candidate key for $R$.
  - (**NOTE:** each attribute may be in a different candidate key)

If a relation is in BCNF it is in 3NF (since in BCNF one of the first two conditions above must hold).

Third condition is a minimal relaxation of BCNF to ensure dependency preservation (will see why later).

---

## 6.21 3NF Example

Consider a schema:
```
dept_advisor(s_ID, i_ID, dept_name)
```

With function dependencies:
- `i_ID → dept_name`
- `s_ID, dept_name → i_ID`

Two candidate keys: `{s_ID, dept_name}`, `{s_ID, i_ID}`.

We have seen before that `dept_advisor` is **not** in BCNF.

$R$, however, **is in 3NF**:
- `s_ID, dept_name` is a superkey
- `i_ID → dept_name` and `i_ID` is NOT a superkey, but:
  - `{dept_name} − {i_ID} = {dept_name}` and
  - `dept_name` is contained in a candidate key

---

## 6.22 Redundancy in 3NF

Consider the schema $R$ below, which is in 3NF:
- $R = (J, K, L)$
- $F = \{JK \to L, L \to K\}$
- And an instance table:

| J     | L  | K  |
|-------|----|----|
| j₁    | l₁ | k₁ |
| j₂    | l₁ | k₁ |
| j₃    | l₁ | k₁ |
| null  | l₂ | k₂ |

What is wrong with the table?
- Repetition of information
- Need to use null values (e.g., to represent the relationship $l_2, k_2$ where there is no corresponding value for $J$)

---

## 6.23 Boyce-Codd Normal Form

A relation schema $R$ is in **BCNF** with respect to a set $F$ of functional dependencies if for all functional dependencies in $F^+$ of the form
$$\alpha \to \beta$$
where $\alpha \subseteq R$ and $\beta \subseteq R$, at least one of the following holds:
- $\alpha \to \beta$ is trivial (i.e., $\beta \subseteq \alpha$)
- $\alpha$ is a **superkey** for $R$

### Boyce-Codd Normal Form (Cont.)
Example schema that is **not** in BCNF:
```
in_dep (ID, name, salary, dept_name, building, budget)
```
because:
- `dept_name → building, budget`
  - holds on `in_dep`
  - but
- `dept_name` is not a superkey

When we decompose `in_dep` into *instructor* and *department*:
- *instructor* is in BCNF
- *department* is in BCNF

---

## 6.24 Decomposing a Schema into BCNF

Let $R$ be a schema $R$ that is not in BCNF. Let $\alpha \to \beta$ be the FD that causes a violation of BCNF.

We decompose $R$ into:
- $(\alpha \cup \beta)$
- $(R - (\beta - \alpha))$

In our example of `in_dep`,
- $\alpha = \text{dept\_name}$
- $\beta = \text{building, budget}$

and `in_dep` is replaced by:
- $(\alpha \cup \beta) = (\text{dept\_name, building, budget})$
- $(R - (\beta - \alpha)) = (\text{ID, name, dept\_name, salary})$

---
