# 02 — Relational Model & Relational Algebra

## 2.1 Structure of Relational Databases

### Relation, Tuple, Attribute
A **relation** is a table; rows are **tuples**, columns are **attributes**.

Example *instructor* relation:
| ID | name | dept_name | salary |
|---|---|---|---|
| 10101 | Srinivasan | Comp. Sci. | 65000 |
| 12121 | Wu | Finance | 90000 |
| 22222 | Einstein | Physics | 95000 |
| 33456 | Gold | Physics | 87000 |
| 45565 | Katz | Comp. Sci. | 75000 |
| 76766 | Crick | Biology | 72000 |

### Schema and Instance
- $A_1, A_2, \ldots, A_n$ are **attributes**.
- $R = (A_1, A_2, \ldots, A_n)$ is a **relation schema**.
- A **relation instance** $r(R)$ is the current tuples — the table.

### Attributes and Domains
- The **domain** of an attribute is its set of allowed values.
- Attribute values are normally required to be **atomic** (indivisible).
- The special value **null** belongs to every domain — meaning unknown.
- Null values complicate many operations.

### Relations are Unordered
Order of tuples is irrelevant — they may be stored in arbitrary order.

---

## 2.2 Database Schema vs Database Instance

- **Database schema** — logical structure of the database (declarations).
- **Database instance** — snapshot of data at a given time.

Example: schema `instructor(ID, name, dept_name, salary)`; instance is a particular table of tuples.

---

## 2.3 Keys

Let $K \subseteq R$.

- **Superkey**: $K$ is a superkey of $R$ if values for $K$ are sufficient to identify a unique tuple of each possible relation $r(R)$. Example: `{ID}` and `{ID, name}` are both superkeys of *instructor*.
- **Candidate key**: a minimal superkey (no proper subset is a superkey). Example: `{ID}`.
- **Primary key**: one chosen candidate key.
- **Foreign key**: an attribute set in one relation (the **referencing** relation) whose value must appear in another (the **referenced** relation). Example: `dept_name` in *instructor* references *department*.

---

## 2.4 Schema Diagram for the University Database

Underlined attributes are primary keys; arrows represent foreign-key relationships.

- **classroom**(<u>building</u>, <u>room_number</u>, capacity)
- **department**(<u>dept_name</u>, building, budget)
- **course**(<u>course_id</u>, title, dept_name, credits)
- **instructor**(<u>ID</u>, name, dept_name, salary)
- **section**(<u>course_id</u>, <u>sec_id</u>, <u>semester</u>, <u>year</u>, building, room_number, time_slot_id)
- **teaches**(<u>ID</u>, <u>course_id</u>, <u>sec_id</u>, <u>semester</u>, <u>year</u>)
- **student**(<u>ID</u>, name, dept_name, tot_cred)
- **takes**(<u>ID</u>, <u>course_id</u>, <u>sec_id</u>, <u>semester</u>, <u>year</u>, grade)
- **advisor**(<u>s_id</u>, <u>i_id</u>)
- **time_slot**(<u>time_slot_id</u>, <u>day</u>, start_time, end_time)
- **prereq**(<u>course_id</u>, <u>prereq_id</u>)

---

## 2.5 Relational Query Languages

- Procedural vs. declarative.
- Pure languages:
  - **Relational algebra** (procedural) — focus of this chapter.
  - **Tuple relational calculus** (declarative).
  - **Domain relational calculus** (declarative).
- All three pure languages are **equivalent in expressive power** (not Turing-complete).

---

## 2.6 Relational Algebra — Six Fundamental Operations

| Operator | Symbol | Type |
|---|---|---|
| Select | $\sigma$ | Unary |
| Project | $\Pi$ | Unary |
| Union | $\cup$ | Binary |
| Set difference | $-$ | Binary |
| Cartesian product | $\times$ | Binary |
| Rename | $\rho$ | Unary |

---

## 2.7 Select ($\sigma$)

Selects tuples satisfying a predicate. Notation: $\sigma_p(r)$.

**Example:** Select Physics instructors:
$$\sigma_{\text{dept\_name}=\text{"Physics"}}(\text{instructor})$$

| ID | name | dept_name | salary |
|---|---|---|---|
| 22222 | Einstein | Physics | 95000 |
| 33456 | Gold | Physics | 87000 |

Predicates allow comparisons $=, \ne, >, \ge, <, \le$ and connectives $\land, \lor, \neg$.

**Example:** Physics instructors with salary > 90000:
$$\sigma_{\text{dept\_name}=\text{"Physics"} \land \text{salary} > 90000}(\text{instructor})$$

Predicates may compare two attributes, e.g.:
$$\sigma_{\text{dept\_name}=\text{building}}(\text{department})$$

---

## 2.8 Project ($\Pi$)

Returns the relation with only the listed attributes:
$$\Pi_{A_1, A_2, \ldots, A_k}(r)$$
- Duplicate rows are removed (relations are sets).

**Example:**
$$\Pi_{\text{ID, name, salary}}(\text{instructor})$$

---

## 2.9 Composition of Operations

Result of any operation is a relation, so operations compose:
$$\Pi_{\text{name}}(\sigma_{\text{dept\_name}=\text{"Physics"}}(\text{instructor}))$$

---

## 2.10 Cartesian Product ($\times$)

Combines every tuple of $r$ with every tuple of $s$. Common attributes are disambiguated using relation prefixes (e.g., `instructor.ID`, `teaches.ID`).

---

## 2.11 Natural Join ($\bowtie$)

For relations $r$ and $s$ on schemas $R$ and $S$:
- Result schema: $R \cup S$.
- For each pair $(t_r, t_s)$ that agree on all attributes in $R \cap S$, output a single tuple combining them.

Example: $r \bowtie s$ on relations with common attributes B and D — only tuples agreeing on B and D combine, with single columns for B and D.

Equivalent expression:
$$\Pi_{A, r.B, C, r.D, E}(\sigma_{r.B = s.B \,\land\, r.D = s.D}(r \times s))$$

---

## 2.12 Theta Join ($\bowtie_\theta$)

Combines select with cartesian product:
$$r \bowtie_\theta s = \sigma_\theta(r \times s)$$

Example:
$$\sigma_{\text{instructor.id} = \text{teaches.id}}(\text{instructor} \times \text{teaches}) = \text{instructor} \bowtie_{\text{instructor.id} = \text{teaches.id}} \text{teaches}$$

---

## 2.13 Union ($\cup$)

$r \cup s$ valid only if:
1. Same arity.
2. Compatible domains.

**Example:** Courses taught in Fall 2017 OR Spring 2018:
$$\Pi_{\text{course\_id}}(\sigma_{\text{semester}=\text{"Fall"} \land \text{year}=2017}(\text{section})) \cup \Pi_{\text{course\_id}}(\sigma_{\text{semester}=\text{"Spring"} \land \text{year}=2018}(\text{section}))$$

---

## 2.14 Set Intersection ($\cap$)

Tuples in both relations. Same arity/domain compatibility.

**Example:** Courses in Fall 2017 AND Spring 2018:
$$\Pi_{\text{course\_id}}(\sigma_{\ldots\text{Fall 2017}}(\text{section})) \cap \Pi_{\text{course\_id}}(\sigma_{\ldots\text{Spring 2018}}(\text{section}))$$

---

## 2.15 Set Difference ($-$)

Tuples in $r$ but not in $s$. Same arity/domain compatibility.

**Example:** Courses in Fall 2017 but NOT in Spring 2018:
$$\Pi_{\text{course\_id}}(\sigma_{\ldots\text{Fall 2017}}(\text{section})) - \Pi_{\text{course\_id}}(\sigma_{\ldots\text{Spring 2018}}(\text{section}))$$

---

## 2.16 Assignment ($\leftarrow$)

Allows query to be written as a sequence of steps using temporary names:
```
Physics ← σ_{dept_name="Physics"}(instructor)
Music   ← σ_{dept_name="Music"}(instructor)
result  ← Physics ∪ Music
```

---

## 2.17 Rename ($\rho$)

$\rho_x(E)$ — call the result of $E$ by name $x$.
$\rho_{x(A_1, \ldots, A_n)}(E)$ — also rename attributes.

Useful for self-joins and disambiguation.

---

## 2.18 Equivalent Queries

Multiple expressions can yield the same result.
**Example 1:** Physics instructors with salary > 90000:
- $\sigma_{\text{dept\_name}=\text{"Physics"} \land \text{salary}>90000}(\text{instructor})$
- $\sigma_{\text{dept\_name}=\text{"Physics"}}(\sigma_{\text{salary}>90000}(\text{instructor}))$

**Example 2:** Courses taught by Physics instructors:
- $\sigma_{\text{dept\_name}=\text{"Physics"}}(\text{instructor} \bowtie_{\ldots} \text{teaches})$
- $(\sigma_{\text{dept\_name}=\text{"Physics"}}(\text{instructor})) \bowtie_{\ldots} \text{teaches}$

The optimizer chooses the most efficient form.

---

## 2.19 Likely Exam Questions

1. Define relation, tuple, attribute, domain.
2. Differentiate superkey, candidate key, primary key, foreign key.
3. List the six fundamental relational-algebra operations.
4. Show that the natural join can be expressed using $\sigma$, $\times$, and $\Pi$.
5. Write a relational-algebra expression for: "names of all students enrolled in Comp. Sci. courses".
6. State conditions under which $r \cup s$ is well-defined.
7. Write equivalent expressions for a given query and compare.

### Practice queries
Given the university schema:
1. Find names of instructors in the Biology department.
   `Π_{name}(σ_{dept_name="Biology"}(instructor))`
2. Find IDs of students who have taken a course taught by instructor 10101.
   `Π_{takes.ID}(takes ⨝ σ_{teaches.ID="10101"}(teaches))`
3. Find names of departments with budget > 100000.
   `Π_{dept_name}(σ_{budget>100000}(department))`
