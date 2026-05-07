# 01 — Introduction

*Source: chap1_Introduction.pdf — Database System Concepts, 7th Ed., Silberschatz, Korth and Sudarshan*

## Outline

- Database-System Applications
- Purpose of Database Systems
- View of Data
- Database Languages
- Database Design
- Database Engine
- Database Architecture
- Database Users and Administrators

---

## 1.1 Database Systems

A **DBMS** contains information about a particular enterprise:
- Collection of interrelated data
- Set of programs to access the data
- An environment that is both **convenient** and **efficient** to use

Database systems are used to manage collections of data that are:
- Highly valuable
- Relatively large
- Accessed by multiple users and applications, often at the same time

A **modern database system** is a complex software system whose task is to manage a large, complex collection of data.

**Databases touch all aspects of our lives.**

---

## 1.2 Database Applications Examples

### Enterprise Information
- **Sales:** customers, products, purchases
- **Accounting:** payments, receipts, assets
- **Human Resources:** information about employees, salaries, payroll taxes

### Manufacturing
Management of production, inventory, orders, supply chain.

### Banking and Finance
- Customer information, accounts, loans, and banking transactions
- Credit card transactions
- Finance: sales and purchases of financial instruments (e.g., stocks and bonds; storing real-time market data)

### Universities
Registration, grades.

### Airlines
Reservations, schedules.

### Telecommunication
Records of calls, texts, and data usage; generating monthly bills; maintaining balances on prepaid calling cards.

### Web-based services
- Online retailers: order tracking, customized recommendations
- Online advertisements

### Document databases

### Navigation systems
For maintaining the locations of various places of interest along with the exact routes of roads, train systems, buses, etc.

---

## 1.3 Purpose of Database Systems

In the early days, database applications were built directly on top of file systems, which leads to:

### Data redundancy and inconsistency
Data is stored in multiple file formats, resulting in duplication of information in different files.

### Difficulty in accessing data
Need to write a new program to carry out each new task.

### Data isolation
Multiple files and formats.

### Integrity problems
- Integrity constraints (e.g., account balance > 0) become "buried" in program code rather than being stated explicitly
- Hard to add new constraints or change existing ones

### Atomicity of updates
- Failures may leave database in an inconsistent state with partial updates carried out
- **Example:** Transfer of funds from one account to another should either complete or not happen at all.

### Concurrent access by multiple users
- Concurrent access needed for performance
- Uncontrolled concurrent accesses can lead to inconsistencies
- **Example:** Two people reading a balance (say 100) and updating it by withdrawing money (say 50 each) at the same time

### Security problems
Hard to provide user access to some, but not all, data.

> **Database systems offer solutions to all the above problems.**

---

## 1.4 View of Data — Data Models

A **data model** is a collection of tools for describing:
- Data
- Data relationships
- Data semantics
- Data constraints

### Types of data models
- **Relational model**
- **Entity-Relationship data model** (mainly for database design)
- **Object-based data models** (Object-oriented and Object-relational)
- **Semi-structured data model** (XML)
- Other older models:
  - Network model
  - Hierarchical model

---

## 1.5 Relational Model

All the data is stored in various tables.

### Example: instructor table

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

(Columns: ID, name, dept_name, salary. Rows are tuples.)

### A Sample Relational Database — department table

| dept_name  | building | budget |
|------------|----------|--------|
| Comp. Sci. | Taylor   | 100000 |
| Biology    | Watson   | 90000  |
| Elec. Eng. | Taylor   | 85000  |
| Music      | Packard  | 80000  |
| Finance    | Painter  | 120000 |
| History    | Painter  | 50000  |
| Physics    | Watson   | 70000  |

---

## 1.6 View of Data — Architecture

```
┌──────────────────────────────────────┐
│          view level                  │
│ ┌────────┐ ┌────────┐    ┌────────┐  │
│ │ view 1 │ │ view 2 │ …  │ view n │  │
│ └────────┘ └────────┘    └────────┘  │
└──────────────────────────────────────┘
              │
              ▼
       ┌──────────────┐
       │ logical level│
       └──────────────┘
              │
              ▼
       ┌──────────────┐
       │physical level│
       └──────────────┘
```

### Instances and Schemas
Similar to types and variables in programming languages.

- **Logical Schema** — the overall logical structure of the database.
  - **Example:** The database consists of information about a set of customers and accounts in a bank and the relationship between them.
  - Analogous to type information of a variable in a program.
- **Physical schema** — the overall physical structure of the database.
- **Instance** — the actual content of the database at a particular point in time.
  - Analogous to the value of a variable.

### Physical Data Independence
**Physical Data Independence** — the ability to modify the physical schema without changing the logical schema.
- Applications depend on the logical schema.
- In general, the interfaces between the various levels and components should be well defined so that changes in some parts do not seriously influence others.

---

## 1.7 Database Languages

### Data Definition Language (DDL)

Specification notation for defining the database schema.

**Example:**
```sql
create table instructor (
    ID         char(5),
    name       varchar(20),
    dept_name  varchar(20),
    salary     numeric(8,2)
)
```

- DDL compiler generates a set of table templates stored in a **data dictionary**.
- Data dictionary contains **metadata** (i.e., data about data):
  - Database schema
  - Integrity constraints
    - Primary key (ID uniquely identifies instructors)
  - Authorization
    - Who can access what

### Data Manipulation Language (DML)
- Language for accessing and updating the data organized by the appropriate data model.
- DML also known as **query language**.

Two basic types:
- **Procedural DML** — require a user to specify what data are needed and **how** to get those data.
- **Declarative DML** — require a user to specify what data are needed **without specifying how** to get those data.

Declarative DMLs are usually easier to learn and use than procedural DMLs. Declarative DMLs are also referred to as **non-procedural DMLs**.

The portion of a DML that involves information retrieval is called a **query language**.

### SQL Query Language

SQL query language is **non-procedural**. A query takes as input several tables (possibly only one) and always returns a single table.

**Example:** find all instructors in Comp. Sci. dept:
```sql
select name
from instructor
where dept_name = 'Comp. Sci.'
```

- SQL is **NOT** a Turing machine equivalent language.
- To be able to compute complex functions SQL is usually embedded in some higher-level language.
- Application programs generally access databases through one of:
  - Language extensions to allow embedded SQL
  - Application program interface (e.g., **ODBC/JDBC**) which allow SQL queries to be sent to a database

### Database Access from Application Program
- Non-procedural query languages such as SQL are not as powerful as a universal Turing machine.
- SQL does not support actions such as input from users, output to displays, or communication over the network.
- Such computations and actions must be written in a **host language**, such as C/C++, Java or Python, with embedded SQL queries that access the data in the database.
- **Application programs** — are programs that are used to interact with the database in this fashion.

---

## 1.8 Database Design

The process of designing the general structure of the database:

### Logical Design
Deciding on the database schema. Database design requires that we find a "good" collection of relation schemas.
- **Business decision** — What attributes should we record in the database?
- **Computer Science decision** — What relation schemas should we have and how should the attributes be distributed among the various relation schemas?

### Physical Design
Deciding on the physical layout of the database.

---

## 1.9 Database Engine

A database system is partitioned into modules that deal with each of the responsibilities of the overall system.

The functional components of a database system can be divided into:
- The **storage manager**
- The **query processor component**
- The **transaction management component**

### Storage Manager
A program module that provides the interface between the low-level data stored in the database and the application programs and queries submitted to the system.

The storage manager is responsible for the following tasks:
- Interaction with the OS file manager
- Efficient storing, retrieving and updating of data

The storage manager components include:
- **Authorization and integrity manager**
- **Transaction manager**
- **File manager**
- **Buffer manager**

The storage manager implements several data structures as part of the physical system implementation:
- **Data files** — store the database itself.
- **Data dictionary** — stores metadata about the structure of the database, in particular the schema of the database.
- **Indices** — can provide fast access to data items. A database index provides pointers to those data items that hold a particular value.

### Query Processor
The query processor components include:
- **DDL interpreter** — interprets DDL statements and records the definitions in the data dictionary.
- **DML compiler** — translates DML statements in a query language into an evaluation plan consisting of low-level instructions that the query evaluation engine understands.
  - The DML compiler performs **query optimization**; that is, it picks the lowest cost evaluation plan from among the various alternatives.
- **Query evaluation engine** — executes low-level instructions generated by the DML compiler.

### Query Processing — Three steps
1. Parsing and translation
2. Optimization
3. Evaluation

```
query → ┌──────────┐ → relational-algebra → ┌─────────┐ → execution → ┌──────────┐ → query output
        │parser and│   expression           │optimizer│   plan        │evaluation│
        │translator│                        └─────────┘               │  engine  │
        └──────────┘                              ▲                   └──────────┘
                                                  │                         │
                                            statistics about data           ▼
                                                                         data
```

### Transaction Management
- A **transaction** is a collection of operations that performs a single logical function in a database application.
- **Transaction-management component** ensures that the database remains in a consistent (correct) state despite system failures (e.g., power failures and operating system crashes) and transaction failures.
- **Concurrency-control manager** controls the interaction among the concurrent transactions, to ensure the consistency of the database.

---

## 1.10 Database Architecture

### Centralized databases
- One to a few cores, shared memory.

### Client-server
- One server machine executes work on behalf of multiple client machines.

### Parallel databases
- Many core shared memory
- Shared disk
- Shared nothing

### Distributed databases
- Geographical distribution
- Schema/data heterogeneity

### Database Architecture (Centralized/Shared-Memory)
```
┌─────────── query processor ──────────────────────────────────┐
│  ┌────────┐ ┌──────┐  ┌─────────┐    ┌───────────────┐       │
│  │compiler│ │DML   │  │DDL      │    │application    │       │
│  │and     │ │queries│ │interpreter│  │program object │       │
│  │linker  │ └──┬───┘  └────┬────┘    │code           │       │
│  └────┬───┘    ▼           │         └───────┬───────┘       │
│       │  ┌────────────┐    │                 │               │
│       └─►│DML compiler│    │                 │               │
│          │and organizer│   │                 │               │
│          └──────┬─────┘    │                 │               │
│                 ▼          ▼                 ▼               │
│            ┌──────────────────────────────────────┐          │
│            │      query evaluation engine         │          │
│            └──────────────────────────────────────┘          │
└──────────────────────────────────────────────────────────────┘
┌───────────── storage manager ────────────────────────────────┐
│  ┌──────────┐ ┌────────┐ ┌─────────────────┐ ┌─────────────┐ │
│  │  buffer  │ │ file   │ │ authorization   │ │ transaction │ │
│  │ manager  │ │manager │ │ and integrity   │ │  manager    │ │
│  │          │ │        │ │    manager      │ │             │ │
│  └──────────┘ └────────┘ └─────────────────┘ └─────────────┘ │
└──────────────────────────────────────────────────────────────┘
                              ▼
                     ┌────── disk storage ──────┐
                     │  data | indices |        │
                     │  data dictionary |       │
                     │  statistical data        │
                     └──────────────────────────┘
```

---

## 1.11 Database Applications

Database applications are usually partitioned into two or three parts.

### Two-tier architecture
The application resides at the client machine, where it invokes database system functionality at the server machine.

```
client: [user] → [application]
                       │
                    network
                       │
server: [database system]
```

### Three-tier architecture
The client machine acts as a front end and does not contain any direct database calls.
- The client end communicates with an application server, usually through a forms interface.
- The application server in turn communicates with a database system to access data.

```
client: [user] → [application client]
                          │
                       network
                          │
server: [application server]
              │
        [database system]
```

---

## 1.12 Database Users

Four different types of database-system users:

### Naive users
(tellers, agents, web users) — *use* application interfaces.

### Application programmers
*Write* application programs.

### Sophisticated users (analysts)
*Use* query tools.

### Database administrators
*Use* administration tools.

```
[naive users]   [app programmers]  [sophisticated]  [DBAs]
     │                 │                  │             │
     ▼                 ▼                  ▼             ▼
[app interfaces] [app programs]    [query tools] [admin tools]
                       │                  │             │
                  [compiler/linker]       │             │
                       │                  ▼             ▼
                  [app obj code]    [DML queries]  [DDL interpreter]
                       └──────┬──────────┬──┘
                              ▼          ▼
                          [DML compiler and organizer]
                                    │
                          [query evaluation engine]
                                    │
                          (storage manager / disk storage below)
```

---

## 1.13 Database Administrator

A person who has central control over the system is called a **database administrator (DBA)**.

### Functions of a DBA
- Schema definition
- Storage structure and access-method definition
- Schema and physical-organization modification
- Granting of authorization for data access
- Routine maintenance
- Periodically backing up the database
- Ensuring that enough free disk space is available for normal operations, and upgrading disk space as required
- Monitoring jobs running on the database

---

## End of Chapter 1
