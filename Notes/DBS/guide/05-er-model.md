# 05 — Entity-Relationship (E-R) Model

## 5.1 Overview of the Design Process

### Phases
1. **Initial phase** — characterize fully the data needs of users.
2. **Conceptual design** — applying a data model to translate requirements into a conceptual schema (functional requirements + transactions).
3. **Final phase** — abstract data model to implementation:
   - **Logical Design** — choose schemas (business + CS decisions).
   - **Physical Design** — physical layout.

### Pitfalls to avoid
- **Redundancy** — repeated information leads to inconsistency.
- **Incompleteness** — design fails to capture some aspect.

### Approaches
- **E-R Model** — entities + relationships.
- **Normalization Theory** — formal way to detect bad designs.

---

## 5.2 Entity Sets

- **Entity** — an object that exists and is distinguishable (specific person, company, event).
- **Entity set** — set of entities of the same type sharing properties.
- An entity is described by **attributes**.
  - Example: `instructor = (ID, name, salary)`.
- A subset of attributes forms a **primary key**.

ER diagram:
- **Rectangles** = entity sets; attributes listed inside; **underline** indicates primary key.

---

## 5.3 Relationship Sets

- **Relationship** — association among entities.
  - e.g., `(44553 Peltier, 22222 Einstein) ∈ advisor`.
- **Relationship set** — mathematical relation:
  $$\{(e_1, \ldots, e_n) | e_1 \in E_1, \ldots, e_n \in E_n\}$$

ER diagram:
- **Diamonds** represent relationship sets, connected by lines to participating entity sets.

### Relationship Sets with Attributes
A relationship set may itself have attributes (e.g., `date` on the *advisor* relationship).

### Roles
When an entity set participates in a relationship more than once, label the connections with **roles**.
Example: recursive `prereq` relationship on `course` with roles `course_id` and `prereq_id`.

### Degree
- **Binary** — most common; involves 2 entity sets.
- **Ternary** — 3 entity sets (e.g., `proj_guide` between *instructor*, *student*, *project*).

---

## 5.4 Attributes — Types

- **Simple** vs **Composite** (can be subdivided, e.g., `name → first, middle, last`).
- **Single-valued** vs **Multivalued** (e.g., `phone_numbers`).
- **Derived** (computed from other attributes, e.g., `age` from `date_of_birth`).
- **Domain** — set of permitted values.

### ER Notation
- Composite: tree of sub-attributes.
- Multivalued: braces `{ ... }`.
- Derived: parentheses `name()`.

---

## 5.5 Mapping Cardinalities

For binary relationship sets: one-to-one, one-to-many, many-to-one, many-to-many.

### Notation in ER diagrams
- **Directed line (→)**: "one"
- **Undirected line (—)**: "many"

| Cardinality | Notation |
|---|---|
| One-to-one | `←R→` (arrows on both sides) |
| One-to-many | `←R—` (arrow on the "one" side, instructor) |
| Many-to-one | `—R→` (arrow on the "one" side) |
| Many-to-many | `—R—` (no arrows) |

### Total vs Partial Participation
- **Total participation** — every entity must participate. Drawn as **double line** between entity set and relationship.
- **Partial participation** — some entities may not participate.

### l..h Notation
A line may carry $l..h$ where $l$ = min, $h$ = max cardinality.
- $l = 1$ → total participation; $h = 1$ → at most one relationship; $h = *$ → no upper limit.

### Cardinality on Ternary Relationships
At most one arrow may exit a relationship of degree ≥ 3 to avoid ambiguity.

---

## 5.6 Primary Keys for Relationship Sets

- For relationship set $R$ involving $E_1, \ldots, E_n$: primary key = union of primary keys of $E_i$, plus any attributes of $R$.

| Cardinality | Primary key choice |
|---|---|
| Many-to-many | Union of both entity primary keys. |
| One-to-many / Many-to-one | Primary key of the "many" side. |
| One-to-one | Primary key of either side. |

---

## 5.7 Weak Entity Sets

- **Weak entity set** — its existence depends on another (the **identifying** entity set).
- **Discriminator** — a set of attributes that uniquely identifies a weak entity within the context of its identifying entity.
- ER notation:
  - **Double rectangle** for weak entity set.
  - **Double diamond** for identifying relationship.
  - **Dashed underline** for the discriminator.

Example: `section(course_id, sec_id, semester, year)` — *section* is a weak entity, identified by *course*; primary key = `(course_id, sec_id, semester, year)`.

---

## 5.8 Removing Redundant Attributes

If a relationship `stud_dept` between `student` and `department` exists, then `student` shouldn't also store `dept_name` — it's redundant.

(However, when reducing to relations, the attribute may reappear.)

---

## 5.9 Reduction to Relational Schemas

### Strong entity set → relation with same attributes
`student(ID, name, tot_cred)`

### Weak entity set → include identifying entity's primary key
`section(course_id, sec_id, semester, year)`

### Composite attributes → flatten
`address(street, city, ...)` → `address_street, address_city, ...`

### Multivalued attributes → separate relation
`inst_phone(ID, phone_number)` — one tuple per (entity, value).

### Relationship set → relation with primary keys of participants + descriptive attributes
`advisor(s_id, i_id)`.

### Many-to-one / One-to-many (total on many side)
- Add the "one" side's PK as an attribute on the "many" side instead of creating a separate relationship relation.
- e.g., add `dept_name` to *instructor* instead of creating `inst_dept`.

### One-to-one
- Pick either side and add the other's PK.

### Weak entity sets — relationship redundant
- The schema for the identifying relationship is implicit in the weak entity's foreign keys.

---

## 5.10 Extended E-R Features

### Specialization
- **Top-down**: subgroups within an entity set with distinct attributes/relationships.
- ER notation: triangle labeled **ISA**.
- **Attribute inheritance** — subclasses inherit attributes/relationships of the superclass.

Example:
```
                 person
                  / \
                ISA ISA
                /     \
            employee  student
              / \
            ISA ISA
            /     \
        instructor secretary
```

### Generalization
- **Bottom-up**: combine entity sets into a higher-level set.
- Notational equivalent of specialization.

### Constraints on Specialization
- **Disjointness**:
  - **Disjoint** — entity belongs to at most one subclass.
  - **Overlapping** — entity may belong to multiple.
- **Completeness**:
  - **Total** — every superclass entity belongs to some subclass.
  - **Partial** — not required (default).

### Aggregation
Treat a relationship as an entity to allow relationships between relationships.

Example: `eval_for(s_ID, project_id, i_ID, evaluation_id)` — relate the aggregated `proj_guide` ternary relationship to an `evaluation` entity.

### Reduction for specialization
**Method 1**: Higher-level entity + each lower-level entity (PK + local attributes).
- Drawback: getting employee info needs two relations.

**Method 2**: Each entity set with all attributes (local + inherited).
- Drawback: redundancy for entities in multiple subclasses.

### Reduction for aggregation
Schema with: PK of aggregated relationship + PK of associated entity + descriptive attributes.

---

## 5.11 E-R Design Issues

### Common mistakes
- Using a redundant attribute when a relationship suffices.
- Single-valued relationship attribute that should be a multi-valued composite or a separate entity.
  - Solution: introduce a new (often weak) entity set.

### Entity vs Attribute
Use an entity set when extra information about the value is needed (or values can repeat).
- `phone_number` as attribute vs `phone(phone_number, location)` as entity.

### Entity vs Relationship
Designate a relationship set to describe an action between entities.

### Binary vs Non-binary
- Any non-binary can be replaced by binary relationships + an artificial entity, but ternary may be more natural for some scenarios (e.g., `proj_guide`).

### Conversion of non-binary R between A, B, C → binary
Replace R with entity E and three binary relationship sets RA(E,A), RB(E,B), RC(E,C). E gets an identifying attribute (or be made weak).

---

## 5.12 Symbols Used in ER Notation

| Symbol | Meaning |
|---|---|
| Rectangle E | Entity set |
| Diamond R | Relationship set |
| Double diamond | Identifying relationship for weak entity |
| Double line E—R | Total participation |
| Underlined attribute | Primary key |
| Dashed underline | Discriminator (weak entity) |
| Oval / list inside rectangle | Attribute |
| `{ }` braces | Multivalued attribute |
| `( )` parentheses | Derived attribute |
| ISA triangle | Generalization/specialization |
| Dashed `total` label | Total generalization |

### Crow's-foot vs Chen
| Relationship | Chen | Crow's foot |
|---|---|---|
| Many-to-many | `E1 *—R—* E2` | `E1 ⊃—R—⊂ E2` |
| One-to-one | `E1 1—R—1 E2` | `E1 —R— E2` |
| Many-to-one | `E1 *—R—1 E2` | `E1 ⊃—R— E2` |

---

## 5.13 Likely Exam Questions

1. Define entity set, relationship set, attribute.
2. Differentiate weak vs strong entity sets.
3. Distinguish composite/multivalued/derived attributes; show ER notation.
4. Explain mapping cardinalities; total vs partial participation.
5. Reduce an ER diagram (with multivalued and weak entities) to relational schemas.
6. Differentiate specialization vs generalization. Disjoint vs overlapping; total vs partial.
7. What is aggregation? Why is it useful?
8. Convert a ternary relationship to binary form.
9. Choose between attribute and entity set; entity vs relationship.
10. Draw an ER diagram for a given enterprise (e.g., bank, hospital, university).

### Practice
Design an ER for a hospital:
- Entities: `Patient`, `Doctor`, `Department`, `Room`, `Treatment` (weak, identified by Patient + date).
- Relationships: `treats(Doctor, Patient)` — many-to-many; `assigned_to(Doctor, Department)` — many-to-one; `admitted(Patient, Room)` — many-to-one with date attribute.
- Specialization: `Doctor → {Surgeon, Physician}`.
