# 01 — Introduction to Database Systems

## 1.1 What is a Database System?

A **DBMS** (Database Management System) contains information about a particular enterprise:
- Collection of interrelated data
- Set of programs to access the data
- An environment that is both **convenient** and **efficient** to use

Database systems manage data that is **highly valuable**, **relatively large**, and **accessed by multiple users and applications, often at the same time**.

### Database-System Applications
- **Enterprise**: sales, accounting, HR
- **Manufacturing**: production, inventory, supply chain
- **Banking & finance**: accounts, loans, credit-card transactions, real-time market data
- **Universities**: registration, grades
- **Airlines**: reservations, schedules
- **Telecom**: call/text/data records, billing
- **Web services**: online retailers, advertising
- **Document databases**, **navigation systems**

---

## 1.2 Purpose of Database Systems — Drawbacks of File-System Approach

Early database applications were built on top of file systems, leading to:

1. **Data redundancy and inconsistency** — same data in multiple files/formats.
2. **Difficulty in accessing data** — must write a new program for each new task.
3. **Data isolation** — multiple files and formats.
4. **Integrity problems** — constraints buried in program code, hard to add/modify.
5. **Atomicity of updates** — failures can leave the database in an inconsistent state. Example: fund transfer must complete fully or not at all.
6. **Concurrent access by multiple users** — uncontrolled concurrent access can cause inconsistencies (e.g., two withdrawals reading the same balance).
7. **Security problems** — hard to give selective access.

DBMSs address all the above.

---

## 1.3 View of Data — Data Models

A **data model** is a collection of tools for describing data, relationships, semantics, and constraints.

Types of data models:
- **Relational model** (focus of this course)
- **Entity-Relationship (E-R) model** — used for design
- **Object-based** (object-oriented, object-relational)
- **Semi-structured** (XML, JSON)
- Older: **Network**, **Hierarchical**

### Relational Model
- Data stored in tables (relations); columns are **attributes**, rows are **tuples/records**.
- Example: `instructor(ID, name, dept_name, salary)`.

---

## 1.4 Levels of Data Abstraction

Three-level architecture:
- **View level** — multiple views (view 1, view 2, …, view n)
- **Logical level** — overall logical structure of the database
- **Physical level** — how data is actually stored on disk

### Instances and Schemas
- **Logical schema** — overall logical structure (analogous to type information).
- **Physical schema** — overall physical structure.
- **Instance** — actual content of the database at a point in time (analogous to a value).

### Physical Data Independence
The ability to modify the physical schema without changing the logical schema. Applications depend on the logical schema, not the physical one.

---

## 1.5 Database Languages

### Data Definition Language (DDL)
Specifies the database schema. Example:
```sql
create table instructor (
    ID         char(5),
    name       varchar(20),
    dept_name  varchar(20),
    salary     numeric(8,2)
)
```
The DDL compiler generates table templates stored in a **data dictionary** (metadata: schema, integrity constraints, authorization).

### Data Manipulation Language (DML)
Language for accessing and updating data; also known as **query language**.

Two types:
- **Procedural DML** — specify *what* data is needed AND *how* to get it.
- **Declarative (non-procedural) DML** — specify *what* data is needed.

Declarative DMLs (e.g., SQL) are usually easier to learn and use.

### SQL
- **Non-procedural** query language.
- A query takes one or more tables as input and returns one table.
- SQL is **NOT** Turing-complete. To compute complex functions, embed it in a host language.
- Application programs access databases through **embedded SQL** or **APIs (ODBC/JDBC)**.

Example:
```sql
select name from instructor where dept_name = 'Comp. Sci.'
```

---

## 1.6 Database Design

Process of designing the general structure:
- **Logical Design** — Decide schema. *Business decision:* what attributes to record. *CS decision:* what relation schemas, how to distribute attributes.
- **Physical Design** — Decide physical layout.

---

## 1.7 Database Engine

Functional components:
1. **Storage manager**
2. **Query processor**
3. **Transaction manager**

### Storage Manager
Interface between low-level data and queries/applications. Tasks:
- Interaction with the OS file manager.
- Efficient store, retrieve, update.

Components:
- **Authorization & integrity manager**
- **Transaction manager**
- **File manager**
- **Buffer manager**

Data structures:
- **Data files** — store the database.
- **Data dictionary** — metadata.
- **Indices** — fast access to data items.

### Query Processor
- **DDL interpreter** — interprets DDL, records definitions in data dictionary.
- **DML compiler** — translates DML into evaluation plans of low-level instructions; performs **query optimization**.
- **Query evaluation engine** — executes the low-level instructions.

### Query Processing — three steps
1. **Parsing and translation** → relational-algebra expression.
2. **Optimization** → execution plan (using statistics).
3. **Evaluation** → output.

### Transaction Management
- A **transaction** is a collection of operations performing a single logical function.
- The **transaction-management component** ensures consistency despite system/transaction failures.
- The **concurrency-control manager** coordinates concurrent transactions.

---

## 1.8 Database Architecture

Architecture types:
- **Centralized** — one to a few cores, shared memory.
- **Client-server** — server executes work for multiple clients.
- **Parallel** — many cores, shared memory; shared disk; shared nothing.
- **Distributed** — geographic distribution; schema/data heterogeneity.

### Centralized / Shared-Memory Layered Architecture
```
┌─ Query processor ──────────────────────────────────────┐
│ DDL interpreter | DML compiler | Query eval. engine    │
│ Compiler/linker | Application program object code      │
└────────────────────────────────────────────────────────┘
┌─ Storage manager ──────────────────────────────────────┐
│ Buffer manager | File manager                          │
│ Authorization & integrity manager | Transaction mgr.   │
└────────────────────────────────────────────────────────┘
┌─ Disk storage ─────────────────────────────────────────┐
│ Data | Indices | Data dictionary | Statistical data    │
└────────────────────────────────────────────────────────┘
```

### Two-tier vs Three-tier
- **Two-tier**: application on client invokes DBMS server functionality directly.
  ```
  user → application (client) → network → database server
  ```
- **Three-tier**: client is a front end; communicates with application server, which talks to the DBMS.
  ```
  user → application client → network → application server → DBMS
  ```

---

## 1.9 Database Users and Administrators

Four categories of users:
- **Naive users** (tellers, web users) — use application interfaces.
- **Application programmers** — write application programs.
- **Sophisticated users** (analysts) — use query tools.
- **Database administrators (DBA)** — use admin tools.

### DBA Functions
- Schema definition.
- Storage structure & access-method definition.
- Schema and physical-organization modification.
- Granting authorization for data access.
- Routine maintenance: backups, free disk space monitoring, jobs running.

---

## 1.10 Likely Exam Questions

1. Define DBMS. State its goals.
2. List the drawbacks of file systems that motivate DBMSs.
3. Explain the three levels of data abstraction.
4. Differentiate logical schema vs physical schema vs instance.
5. What is physical data independence? Why is it important?
6. Distinguish DDL vs DML; procedural vs declarative DML.
7. Describe the database engine components (storage, query processor, transaction).
8. Compare two-tier vs three-tier architectures.
9. List DBA responsibilities.
10. What are the four categories of database users?
