# 02 — Intro to Relational Model

*Source: chap2_Relational_model.pdf — Database System Concepts, 7th Ed., Silberschatz, Korth and Sudarshan*

## Outline

- Structure of Relational Databases
- Database Schema
- Keys
- Schema Diagrams
- Relational Query Languages
- The Relational Algebra

---

## 2.1 Example of an Instructor Relation

| ID    | name       | dept_name  | salary |
|-------|------------|------------|--------|
| 10101 | Srinivasan | Comp. Sci. | 65000  |
| 12121 | Wu         | Finance    | 90000  |
| 15151 | Mozart     | Music      | 40000  |
| 22222 | Einstein   | Physics    | 95000  |
| 32343 | El Said    | History    | 60000  |
| 33456 | Gold       | Physics    | 87000  |
| 45565 | Katz       | Comp. Sci. | 75000  |
| 58583 | Califieri  | History    | 62000  |
| 76543 | Singh      | Finance    | 80000  |
| 76766 | Crick      | Biology    | 72000  |
| 83821 | Brandt     | Comp. Sci. | 92000  |
| 98345 | Kim        | Elec. Eng. | 80000  |

- Columns labeled `ID, name, dept_name, salary` are **attributes** (or columns).
- Each row is a **tuple** (or row).

---

## 2.2 Relation Schema and Instance

- $A_1, A_2, \ldots, A_n$ are **attributes**.
- $R = (A_1, A_2, \ldots, A_n)$ is a **relation schema**.
  - **Example:** `instructor = (ID, name, dept_name, salary)`
- A **relation instance** $r$ defined over schema $R$ is denoted by $r(R)$.
- The current values of a relation are specified by a table.
- An element $t$ of relation $r$ is called a **tuple** and is represented by a **row** in a table.

---

## 2.3 Attributes

- The set of allowed values for each attribute is called the **domain** of the attribute.
- Attribute values are (normally) required to be **atomic**; that is, indivisible.
- The special value **null** is a member of every domain. Indicates that the value is "unknown".
- The null value causes complications in the definition of many operations.

---

## 2.4 Relations are Unordered

- Order of tuples is irrelevant (tuples may be stored in an arbitrary order).
- **Example:** the *instructor* relation with unordered tuples:

| ID    | name       | dept_name  | salary |
|-------|------------|------------|--------|
| 22222 | Einstein   | Physics    | 95000  |
| 12121 | Wu         | Finance    | 90000  |
| 32343 | El Said    | History    | 60000  |
| 45565 | Katz       | Comp. Sci. | 75000  |
| 98345 | Kim        | Elec. Eng. | 80000  |
| 76766 | Crick      | Biology    | 72000  |
| 10101 | Srinivasan | Comp. Sci. | 65000  |
| 58583 | Califieri  | History    | 62000  |
| 83821 | Brandt     | Comp. Sci. | 92000  |
| 15151 | Mozart     | Music      | 40000  |
| 33456 | Gold       | Physics    | 87000  |
| 76543 | Singh      | Finance    | 80000  |

---

## 2.5 Database Schema

- **Database schema** — the logical structure of the database.
- **Database instance** — a snapshot of the data in the database at a given instant in time.

**Example:**
- schema: `instructor (ID, name, dept_name, salary)`
- Instance: (the 12-row table above)

---

## 2.6 Keys

Let $K \subseteq R$.

### Superkey
$K$ is a **superkey** of $R$ if values for $K$ are sufficient to identify a unique tuple of each possible relation $r(R)$.
- **Example:** `{ID}` and `{ID, name}` are both superkeys of *instructor*.

### Candidate Key
Superkey $K$ is a **candidate key** if $K$ is minimal.
- **Example:** `{ID}` is a candidate key for *Instructor*.

### Primary Key
One of the candidate keys is selected to be the **primary key**.
- *Which one?*

### Foreign Key Constraint
**Foreign key** constraint: Value in one relation must appear in another.
- **Referencing relation**
- **Referenced relation**
- **Example:** `dept_name` in *instructor* is a foreign key from *instructor* referencing *department*.

---

## 2.7 Schema Diagram for University Database

```
┌───────────┐                                        ┌──────────┐
│  takes    │                                        │ student  │
│ ID        │                                        │ ID       │
│ course_id │                                        │ name     │
│ sec_id    │                                        │ dept_name│
│ semester  │                                        │ tot_cred │
│ year      │                                        └─────┬────┘
│ grade     │                                              │
└─────┬─────┘                                              │
      │                                                    │
┌─────▼─────┐  ┌──────────┐  ┌──────────┐  ┌────────┐  ┌───▼────┐
│ section   │  │ course   │  │department│  │advisor │  │advisor │
│course_id  │──│course_id │──│dept_name │  │ s_id   │  │        │
│sec_id     │  │title     │  │building  │  │ i_id   │  │        │
│semester   │  │dept_name │  │budget    │  └────────┘  └────────┘
│year       │  │credits   │  └──────────┘
│building   │  └──────────┘
│room_number│
│time_slot_id│
└─────┬──────┘
      │
┌─────▼─────┐
│ time_slot │
│time_slot_id│
│ day       │
│start_time │
│end_time   │
└───────────┘

┌───────────┐  ┌──────────┐  ┌──────────┐
│ classroom │  │ prereq   │  │instructor│
│ building  │  │course_id │  │ ID       │
│room_number│  │prereq_id │  │ name     │
│ capacity  │  └──────────┘  │ dept_name│
└───────────┘                │ salary   │
                             └──────────┘
┌───────────┐
│ teaches   │
│ ID        │
│ course_id │
│ sec_id    │
│ semester  │
│ year      │
└───────────┘
```

(Underlined attributes are primary keys; arrows represent foreign-key relationships.)

---

## 2.8 Relational Query Languages

- Procedural versus non-procedural, or declarative.
- "Pure" languages:
  - **Relational algebra**
  - **Tuple relational calculus**
  - **Domain relational calculus**
- The above 3 pure languages are **equivalent in computing power**.
- We will concentrate in this chapter on **relational algebra**.
  - Not Turing-machine equivalent.
  - Consists of **6 basic operations**.

---

## 2.9 Relational Algebra

A procedural language consisting of a set of operations that take one or two relations as input and produce a new relation as their result.

### Six basic operators
- **select:** $\sigma$
- **project:** $\Pi$
- **union:** $\cup$
- **set difference:** $-$
- **Cartesian product:** $\times$
- **rename:** $\rho$

---

## 2.10 Select Operation

The **select** operation selects tuples that satisfy a given predicate.
- **Notation:** $\sigma_p(r)$
- $p$ is called the **selection predicate**.

**Example:** select those tuples of the *instructor* relation where the instructor is in the "Physics" department.

**Query:**
$$\sigma_{\text{dept\_name}=\text{"Physics"}}(\text{instructor})$$

**Result:**

| ID    | name     | dept_name | salary |
|-------|----------|-----------|--------|
| 22222 | Einstein | Physics   | 95000  |
| 33456 | Gold     | Physics   | 87000  |

### Select Operation (Cont.)

We allow comparisons using
$$=,\, \ne,\, >,\, \ge,\, <,\, \le$$
in the selection predicate.

We can combine several predicates into a larger predicate by using the connectives:
$$\land\ (\text{and}),\ \lor\ (\text{or}),\ \neg\ (\text{not})$$

**Example:** Find the instructors in Physics with a salary greater $90,000:
$$\sigma_{\text{dept\_name}=\text{"Physics"}\,\land\,\text{salary}>90{,}000}(\text{instructor})$$

The select predicate may include comparisons between two attributes.
- **Example:** find all departments whose name is the same as their building name:
- $\sigma_{\text{dept\_name}=\text{building}}(\text{department})$

---

## 2.11 Project Operation

A unary operation that returns its argument relation, with certain attributes left out.

**Notation:**
$$\Pi_{A_1, A_2, A_3, \ldots, A_k}(r)$$
where $A_1, A_2, \ldots, A_k$ are attribute names and $r$ is a relation name.

- The result is defined as the relation of $k$ columns obtained by erasing the columns that are not listed.
- Duplicate rows removed from result, since relations are sets.

### Project Operation Example

**Example:** eliminate the *dept_name* attribute of *instructor*.

**Query:**
$$\Pi_{\text{ID, name, salary}}(\text{instructor})$$

**Result:**

| ID    | name       | salary |
|-------|------------|--------|
| 10101 | Srinivasan | 65000  |
| 12121 | Wu         | 90000  |
| 15151 | Mozart     | 40000  |
| 22222 | Einstein   | 95000  |
| 32343 | El Said    | 60000  |
| 33456 | Gold       | 87000  |
| 45565 | Katz       | 75000  |
| 58583 | Califieri  | 62000  |
| 76543 | Singh      | 80000  |
| 76766 | Crick      | 72000  |
| 83821 | Brandt     | 92000  |
| 98345 | Kim        | 80000  |

---

## 2.12 Composition of Relational Operations

- The result of a relational-algebra operation is a relation, and therefore relational-algebra operations can be composed together into a **relational-algebra expression**.
- Consider the query: Find the names of all instructors in the Physics department.

$$\Pi_{\text{name}}(\sigma_{\text{dept\_name}=\text{"Physics"}}(\text{instructor}))$$

- Instead of giving the name of a relation as the argument of the projection operation, we give an expression that evaluates to a relation.

---

## 2.13 Cartesian-Product Operation

- The Cartesian-product operation (denoted by $\times$) allows us to combine information from any two relations.
- **Example:** the Cartesian product of the relations *instructor* and *teaches* is written as:
$$\text{instructor} \times \text{teaches}$$

- We construct a tuple of the result out of each possible pair of tuples: one from the *instructor* relation and one from the *teaches* relation.
- Since the instructor `ID` appears in both relations we distinguish between these attributes by attaching the name of the relation from which the attribute originally came:
  - `instructor.ID`
  - `teaches.ID`

### The instructor × teaches table (sample)

| instructor.ID | name       | dept_name  | salary | teaches.ID | course_id | sec_id | semester | year |
|---------------|------------|------------|--------|------------|-----------|--------|----------|------|
| 10101 | Srinivasan | Comp. Sci. | 65000  | 10101 | CS-101  | 1 | Fall   | 2017 |
| 10101 | Srinivasan | Comp. Sci. | 65000  | 10101 | CS-315  | 1 | Spring | 2018 |
| 10101 | Srinivasan | Comp. Sci. | 65000  | 10101 | CS-347  | 1 | Fall   | 2017 |
| 10101 | Srinivasan | Comp. Sci. | 65000  | 12121 | FIN-201 | 1 | Spring | 2018 |
| 10101 | Srinivasan | Comp. Sci. | 65000  | 15151 | MU-199  | 1 | Spring | 2018 |
| 10101 | Srinivasan | Comp. Sci. | 65000  | 22222 | PHY-101 | 1 | Fall   | 2017 |
| ...   | ...        | ...        | ...    | ...   | ...     | ...| ...   | ...  |
| 12121 | Wu         | Finance    | 90000  | 10101 | CS-101  | 1 | Fall   | 2017 |
| 12121 | Wu         | Finance    | 90000  | 12121 | FIN-201 | 1 | Spring | 2018 |
| ...   | ...        | ...        | ...    | ...   | ...     | ...| ...   | ...  |
| 15151 | Mozart     | Music      | 40000  | 15151 | MU-199  | 1 | Spring | 2018 |
| ...   | ...        | ...        | ...    | ...   | ...     | ...| ...   | ...  |
| 22222 | Einstein   | Physics    | 95000  | 22222 | PHY-101 | 1 | Fall   | 2017 |

---

## 2.14 Joining Two Relations — Natural Join

Let $r$ and $s$ be relations on schemas $R$ and $S$ respectively. Then, the **natural join** of relations $R$ and $S$ is a relation on schema $R \cup S$ obtained as follows:

- Consider each pair of tuples $t_r$ from $r$ and $t_s$ from $s$.
- If $t_r$ and $t_s$ have the same value on each of the attributes in $R \cap S$, add a tuple $t$ to the result, where:
  - $t$ has the same value as $t_r$ on $r$
  - $t$ has the same value as $t_s$ on $s$

### Natural Join Example

**Relations $r$, $s$:**

$r$:
| A | B | C | D |
|---|---|---|---|
| α | 1 | α | a |
| β | 2 | γ | a |
| γ | 4 | β | b |
| α | 1 | γ | a |
| δ | 2 | β | b |

$s$:
| B | D | E |
|---|---|---|
| 1 | a | α |
| 3 | a | β |
| 1 | a | γ |
| 2 | b | δ |
| 3 | b | ε |

**Natural Join $r \bowtie s$:**

| A | B | C | D | E |
|---|---|---|---|---|
| α | 1 | α | a | α |
| α | 1 | α | a | γ |
| α | 1 | γ | a | α |
| α | 1 | γ | a | γ |
| δ | 2 | β | b | δ |

Equivalent expression:
$$\Pi_{A, r.B, C, r.D, E}(\sigma_{r.B = s.B \,\land\, r.D = s.D}(r \times s))$$

---

## 2.15 Join Operation

- The Cartesian-Product `instructor × teaches` associates every tuple of *instructor* with every tuple of *teaches*.
  - Most of the resulting rows have information about instructors who did NOT teach a particular course.
- To get only those tuples of "instructor × teaches" that pertain to instructors and the courses that they taught, we write:

$$\sigma_{\text{instructor.id}\,=\,\text{teaches.id}}(\text{instructor} \times \text{teaches})$$

- We get only those tuples of "instructor × teaches" that pertain to instructors and the courses that they taught.

### Join Operation (Cont.) — table

The table corresponding to $\sigma_{\text{instructor.id}=\text{teaches.id}}(\text{instructor} \times \text{teaches})$:

| instructor.ID | name       | dept_name  | salary | teaches.ID | course_id | sec_id | semester | year |
|---------------|------------|------------|--------|------------|-----------|--------|----------|------|
| 10101 | Srinivasan | Comp. Sci. | 65000  | 10101 | CS-101  | 1 | Fall   | 2017 |
| 10101 | Srinivasan | Comp. Sci. | 65000  | 10101 | CS-315  | 1 | Spring | 2018 |
| 10101 | Srinivasan | Comp. Sci. | 65000  | 10101 | CS-347  | 1 | Fall   | 2017 |
| 12121 | Wu         | Finance    | 90000  | 12121 | FIN-201 | 1 | Spring | 2018 |
| 15151 | Mozart     | Music      | 40000  | 15151 | MU-199  | 1 | Spring | 2018 |
| 22222 | Einstein   | Physics    | 95000  | 22222 | PHY-101 | 1 | Fall   | 2017 |
| 32343 | El Said    | History    | 60000  | 32343 | HIS-351 | 1 | Spring | 2018 |
| 45565 | Katz       | Comp. Sci. | 75000  | 45565 | CS-101  | 1 | Spring | 2018 |
| 45565 | Katz       | Comp. Sci. | 75000  | 45565 | CS-319  | 1 | Spring | 2018 |
| 76766 | Crick      | Biology    | 72000  | 76766 | BIO-101 | 1 | Summer | 2017 |
| 76766 | Crick      | Biology    | 72000  | 76766 | BIO-301 | 1 | Summer | 2018 |
| 83821 | Brandt     | Comp. Sci. | 92000  | 83821 | CS-190  | 1 | Spring | 2017 |
| 83821 | Brandt     | Comp. Sci. | 92000  | 83821 | CS-190  | 2 | Spring | 2017 |
| 83821 | Brandt     | Comp. Sci. | 92000  | 83821 | CS-319  | 2 | Spring | 2018 |
| 98345 | Kim        | Elec. Eng. | 80000  | 98345 | EE-181  | 1 | Spring | 2017 |

### Join Operation (Cont.) — formal

The **join** operation allows us to combine a select operation and a Cartesian-Product operation into a single operation.

Consider relations $r(R)$ and $s(S)$.

Let $\theta$ be a predicate on attributes in the schema $R \cup S$. The join operation $r \bowtie_\theta s$ is defined as follows:
$$r \bowtie_\theta s = \sigma_\theta(r \times s)$$

Thus
$$\sigma_{\text{instructor.id}=\text{teaches.id}}(\text{instructor} \times \text{teaches})$$

Can equivalently be written as
$$\text{instructor} \bowtie_{\text{instructor.id}=\text{teaches.id}} \text{teaches}$$

---

## 2.16 Union Operation

- The union operation allows us to combine two relations.
- **Notation:** $r \cup s$
- For $r \cup s$ to be valid:
  1. $r, s$ must have the same **arity** (same number of attributes)
  2. The attribute domains must be **compatible** (example: 2nd column of $r$ deals with the same type of values as does the 2nd column of $s$)

**Example:** to find all courses taught in the Fall 2017 semester, or in the Spring 2018 semester, or in both:
$$\Pi_{\text{course\_id}}(\sigma_{\text{semester}=\text{"Fall"}\,\land\,\text{year}=2017}(\text{section})) \cup \Pi_{\text{course\_id}}(\sigma_{\text{semester}=\text{"Spring"}\,\land\,\text{year}=2018}(\text{section}))$$

### Union Operation (Cont.) — Result

| course_id |
|-----------|
| CS-101    |
| CS-315    |
| CS-319    |
| CS-347    |
| FIN-201   |
| HIS-351   |
| MU-199    |
| PHY-101   |

---

## 2.17 Set-Intersection Operation

- The set-intersection operation allows us to find tuples that are in both the input relations.
- **Notation:** $r \cap s$
- Assume:
  - $r, s$ have the same arity
  - attributes of $r$ and $s$ are compatible

**Example:** Find the set of all courses taught in both the Fall 2017 and the Spring 2018 semesters.
$$\Pi_{\text{course\_id}}(\sigma_{\text{semester}=\text{"Fall"}\,\land\,\text{year}=2017}(\text{section})) \cap \Pi_{\text{course\_id}}(\sigma_{\text{semester}=\text{"Spring"}\,\land\,\text{year}=2018}(\text{section}))$$

**Result:**

| course_id |
|-----------|
| CS-101    |

---

## 2.18 Set-Difference Operation

- The set-difference operation allows us to find tuples that are in one relation but are not in another.
- **Notation:** $r - s$
- Set differences must be taken between **compatible** relations.
  - $r$ and $s$ must have the **same** arity
  - attribute domains of $r$ and $s$ must be compatible

**Example:** to find all courses taught in the Fall 2017 semester, but not in the Spring 2018 semester:
$$\Pi_{\text{course\_id}}(\sigma_{\text{semester}=\text{"Fall"}\,\land\,\text{year}=2017}(\text{section})) - \Pi_{\text{course\_id}}(\sigma_{\text{semester}=\text{"Spring"}\,\land\,\text{year}=2018}(\text{section}))$$

**Result:**

| course_id |
|-----------|
| CS-347    |
| PHY-101   |

---

## 2.19 The Assignment Operation

- It is convenient at times to write a relational-algebra expression by assigning parts of it to temporary relation variables.
- The assignment operation is denoted by $\leftarrow$ and works like assignment in a programming language.

**Example:** Find all instructors in the "Physics" and Music department.
```
Physics ← σ_{dept_name="Physics"}(instructor)
Music   ← σ_{dept_name="Music"}(instructor)
Physics ∪ Music
```

- With the assignment operation, a query can be written as a sequential program consisting of a series of assignments followed by an expression whose value is displayed as the result of the query.

---

## 2.20 The Rename Operation

- The results of relational-algebra expressions do not have a name that we can use to refer to them. The rename operator, $\rho$, is provided for that purpose.
- The expression:
$$\rho_x(E)$$
returns the result of expression $E$ under the name $x$.
- Another form of the rename operation:
$$\rho_{x(A_1, A_2, \ldots, A_n)}(E)$$

---

## 2.21 Equivalent Queries

There is more than one way to write a query in relational algebra.

### Example 1: Find information about courses taught by instructors in the Physics department with salary greater than 90,000.

**Query 1:**
$$\sigma_{\text{dept\_name}=\text{"Physics"}\,\land\,\text{salary}>90{,}000}(\text{instructor})$$

**Query 2:**
$$\sigma_{\text{dept\_name}=\text{"Physics"}}(\sigma_{\text{salary}>90{,}000}(\text{instructor}))$$

The two queries are not identical; they are, however, equivalent — they give the same result on any database.

### Example 2: Find information about courses taught by instructors in the Physics department.

**Query 1:**
$$\sigma_{\text{dept\_name}=\text{"Physics"}}(\text{instructor} \bowtie_{\text{instructor.ID}=\text{teaches.ID}} \text{teaches})$$

**Query 2:**
$$(\sigma_{\text{dept\_name}=\text{"Physics"}}(\text{instructor})) \bowtie_{\text{instructor.ID}=\text{teaches.ID}} \text{teaches}$$

The two queries are not identical; they are, however, equivalent — they give the same result on any database.

---

## End of Chapter 2
