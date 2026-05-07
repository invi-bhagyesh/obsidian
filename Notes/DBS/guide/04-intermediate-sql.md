# 04 — Intermediate SQL

*Source: Chap4_IntermediateSQL.pdf — Database System Concepts, 7th Ed., Silberschatz, Korth and Sudarshan*

## Outline

- Join Expressions
- Views
- Transactions
- Integrity Constraints
- SQL Data Types and Schemas
- Index Definition in SQL
- Authorization

---

## 4.1 Joined Relations

- **Join operations** take two relations and return as a result another relation.
- A join operation is a Cartesian product which requires that tuples in the two relations match (under some condition). It also specifies the attributes that are present in the result of the join.
- The join operations are typically used as subquery expressions in the `from` clause.
- Three types of joins:
  - Natural join
  - Inner join
  - Outer join

---

## 4.2 Natural Join in SQL

- Natural join is the cartesian product of two relations that matches tuples with the same values for all common attributes.
- It retains only one copy of each common column.
- Example:
  - `student natural join takes`
- In relational algebra:
  - `student ⨝ takes`

### Student Relation

| ID    | name      | dept_name  | tot_cred |
|-------|-----------|------------|----------|
| 00128 | Zhang     | Comp. Sci. | 102      |
| 12345 | Shankar   | Comp. Sci. | 32       |
| 19991 | Brandt    | History    | 80       |
| 23121 | Chavez    | Finance    | 110      |
| 44553 | Peltier   | Physics    | 56       |
| 45678 | Levy      | Physics    | 46       |
| 54321 | Williams  | Comp. Sci. | 54       |
| 55739 | Sanchez   | Music      | 38       |
| 70557 | Snow      | Physics    | 0        |
| 76543 | Brown     | Comp. Sci. | 58       |
| 76653 | Aoi       | Elec. Eng. | 60       |
| 98765 | Bourikas  | Elec. Eng. | 98       |
| 98988 | Tanaka    | Biology    | 120      |

### Takes Relation

| ID    | course_id | sec_id | semester | year | grade |
|-------|-----------|--------|----------|------|-------|
| 00128 | CS-101    | 1      | Fall     | 2017 | A     |
| 00128 | CS-347    | 1      | Fall     | 2017 | A-    |
| 12345 | CS-101    | 1      | Fall     | 2017 | C     |
| 12345 | CS-190    | 2      | Spring   | 2017 | A     |
| 12345 | CS-315    | 1      | Spring   | 2018 | A     |
| 12345 | CS-347    | 1      | Fall     | 2017 | A     |
| 19991 | HIS-351   | 1      | Spring   | 2018 | B     |
| 23121 | FIN-201   | 1      | Spring   | 2018 | C+    |
| 44553 | PHY-101   | 1      | Fall     | 2017 | B-    |
| 45678 | CS-101    | 1      | Fall     | 2017 | F     |
| 45678 | CS-101    | 1      | Spring   | 2018 | B+    |
| 45678 | CS-319    | 1      | Spring   | 2018 | B     |
| 54321 | CS-101    | 1      | Fall     | 2017 | A-    |
| 54321 | CS-190    | 2      | Spring   | 2017 | B+    |
| 55739 | MU-199    | 1      | Spring   | 2018 | A-    |
| 76543 | CS-101    | 1      | Fall     | 2017 | A     |
| 76543 | CS-319    | 2      | Spring   | 2018 | A     |
| 76653 | EE-181    | 1      | Spring   | 2017 | C     |
| 98765 | CS-101    | 1      | Fall     | 2017 | C-    |
| 98765 | CS-315    | 1      | Spring   | 2018 | B     |
| 98988 | BIO-101   | 1      | Summer   | 2017 | A     |
| 98988 | BIO-301   | 1      | Summer   | 2018 | null  |

### student natural join takes

| ID    | name     | dept_name  | tot_cred | course_id | sec_id | semester | year | grade |
|-------|----------|------------|----------|-----------|--------|----------|------|-------|
| 00128 | Zhang    | Comp. Sci. | 102      | CS-101    | 1      | Fall     | 2017 | A     |
| 00128 | Zhang    | Comp. Sci. | 102      | CS-347    | 1      | Fall     | 2017 | A-    |
| 12345 | Shankar  | Comp. Sci. | 32       | CS-101    | 1      | Fall     | 2017 | C     |
| 12345 | Shankar  | Comp. Sci. | 32       | CS-190    | 2      | Spring   | 2017 | A     |
| 12345 | Shankar  | Comp. Sci. | 32       | CS-315    | 1      | Spring   | 2018 | A     |
| 12345 | Shankar  | Comp. Sci. | 32       | CS-347    | 1      | Fall     | 2017 | A     |
| 19991 | Brandt   | History    | 80       | HIS-351   | 1      | Spring   | 2018 | B     |
| 23121 | Chavez   | Finance    | 110      | FIN-201   | 1      | Spring   | 2018 | C+    |
| 44553 | Peltier  | Physics    | 56       | PHY-101   | 1      | Fall     | 2017 | B-    |
| 45678 | Levy     | Physics    | 46       | CS-101    | 1      | Fall     | 2017 | F     |
| 45678 | Levy     | Physics    | 46       | CS-101    | 1      | Spring   | 2018 | B+    |
| 45678 | Levy     | Physics    | 46       | CS-319    | 1      | Spring   | 2018 | B     |
| 54321 | Williams | Comp. Sci. | 54       | CS-101    | 1      | Fall     | 2017 | A-    |
| 54321 | Williams | Comp. Sci. | 54       | CS-190    | 2      | Spring   | 2017 | B+    |
| 55739 | Sanchez  | Music      | 38       | MU-199    | 1      | Spring   | 2018 | A-    |
| 76543 | Brown    | Comp. Sci. | 58       | CS-101    | 1      | Fall     | 2017 | A     |
| 76543 | Brown    | Comp. Sci. | 58       | CS-319    | 2      | Spring   | 2018 | A     |
| 76653 | Aoi      | Elec. Eng. | 60       | EE-181    | 1      | Spring   | 2017 | C     |
| 98765 | Bourikas | Elec. Eng. | 98       | CS-101    | 1      | Fall     | 2017 | C-    |
| 98765 | Bourikas | Elec. Eng. | 98       | CS-315    | 1      | Spring   | 2018 | B     |
| 98988 | Tanaka   | Biology    | 120      | BIO-101   | 1      | Summer   | 2017 | A     |
| 98988 | Tanaka   | Biology    | 120      | BIO-301   | 1      | Summer   | 2018 | null  |

### Natural Join Use Example
List the names of instructors along with the course ID of the courses that they taught:
```sql
select name, course_id
from instructor natural join takes
```

The same query without the use of natural join:
```sql
select name, course_id
from instructor, takes
where instructor.ID = takes.ID
```

### Natural Join Structure in SQL
The `from` clause can have multiple relations combined using natural join:
```sql
select A1, A2, ... An
from r1 natural join r2 natural join .. natural join rn
where P;
```

### Dangerous in Natural Join
Beware of unrelated attributes with same name which get equated incorrectly.

**Example —** List the names of students along with the titles of courses that they have taken.

**Correct version:**
```sql
select name, title
from student natural join takes, course
where takes.course_id = course.course_id;
```

**Incorrect version:**
```sql
select name, title
from student natural join takes natural join course;
```
- This query omits all (student name, course title) pairs where the student takes a course in a department other than the student's own department.
- The correct version (above) correctly outputs such pairs.

---

## 4.3 Outer Join

- An extension of the join operation that avoids loss of information.
- Computes the join and then adds tuples from one relation that does not match tuples in the other relation to the result of the join.
- Uses *null* values.
- Three forms of outer join:
  - left outer join
  - right outer join
  - full outer join

### Outer Join Example Tables

`course` relation:

| course_id | title       | dept_name  | credits |
|-----------|-------------|------------|---------|
| BIO-301   | Genetics    | Biology    | 4       |
| CS-190    | Game Design | Comp. Sci. | 4       |
| CS-315    | Robotics    | Comp. Sci. | 3       |

`prereq` relation:

| course_id | prereq_id |
|-----------|-----------|
| BIO-301   | BIO-101   |
| CS-190    | CS-101    |
| CS-347    | CS-101    |

Observe that:
- `course` information is missing CS-347
- `prereq` information is missing CS-315

### Left Outer Join

**General structure**
```
<table 1> natural left outer join <table 2>
```

**Example**
```
course natural left outer join prereq
```

| course_id | title       | dept_name  | credits | prereq_id |
|-----------|-------------|------------|---------|-----------|
| BIO-301   | Genetics    | Biology    | 4       | BIO-101   |
| CS-190    | Game Design | Comp. Sci. | 4       | CS-101    |
| CS-315    | Robotics    | Comp. Sci. | 3       | null      |

- Add to the *course* relation (on the left) the relevant info from *prereq*.
- Since CS-315 does not appear in *prereq* we use *null* for `prereq_id`.
- In relational algebra syntax: `course ⟕ prereq`

### Right Outer Join

```
course natural right outer join prereq
```

| course_id | title       | dept_name  | credits | prereq_id |
|-----------|-------------|------------|---------|-----------|
| BIO-301   | Genetics    | Biology    | 4       | BIO-101   |
| CS-190    | Game Design | Comp. Sci. | 4       | CS-101    |
| CS-347    | null        | null       | null    | CS-101    |

- Add to the *prereq* relation (on the right) the relevant info from *course*.
- In relational algebra: `course ⟖ prereq`

### Full Outer Join

```
course natural full outer join prereq
```

| course_id | title       | dept_name  | credits | prereq_id |
|-----------|-------------|------------|---------|-----------|
| BIO-301   | Genetics    | Biology    | 4       | BIO-101   |
| CS-190    | Game Design | Comp. Sci. | 4       | CS-101    |
| CS-315    | Robotics    | Comp. Sci. | 3       | null      |
| CS-347    | null        | null       | null    | CS-101    |

- In relational algebra: `course ⟗ prereq`

---

## 4.4 Joined Types and Conditions

- **Join operations** take two relations and return as a result another relation.
- These additional operations are typically used as subquery expressions in the `from` clause.
- **Join type** — defines how tuples are treated in each relation that do not match any tuple in the other relation (based on the join condition).
- **Join condition** — defines which tuples in the two relations match.

| Join types       | Join conditions       |
|------------------|------------------------|
| inner join       | natural               |
| left outer join  | on `<predicate>`      |
| right outer join | using (A1, A2, ..., An) |
| full outer join  |                        |

### Joined Relations — Examples

`course natural right outer join prereq`:

| course_id | title       | dept_name  | credits | prereq_id |
|-----------|-------------|------------|---------|-----------|
| BIO-301   | Genetics    | Biology    | 4       | BIO-101   |
| CS-190    | Game Design | Comp. Sci. | 4       | CS-101    |
| CS-347    | null        | null       | null    | CS-101    |

`course full outer join prereq using (course_id)`:

| course_id | title       | dept_name  | credits | prereq_id |
|-----------|-------------|------------|---------|-----------|
| BIO-301   | Genetics    | Biology    | 4       | BIO-101   |
| CS-190    | Game Design | Comp. Sci. | 4       | CS-101    |
| CS-315    | Robotics    | Comp. Sci. | 3       | null      |
| CS-347    | null        | null       | null    | CS-101    |

---

## 4.5 Views

### View Definition

A view is defined using the `create view` statement which has the form:
```sql
create view v as <query expression>
```
where `<query expression>` is any legal SQL expression. The view name is represented by `v`.

- Once a view is defined, the view name can be used to refer to the virtual relation that the view generates.
- View definition is not the same as creating a new relation by evaluating the query expression.
  - Rather, a view definition causes the saving of an expression; the expression is substituted into queries using the view.

### View Definition and Use

Create a view of instructors without their salary:
```sql
create view faculty as
    select ID, name, dept_name
    from instructor
```

Find the names of all instructors in the Biology department:
```sql
select name
from faculty
where dept_name = 'Biology'
```

Create a view of department salary totals:
```sql
create view departments_total_salary(dept_name, total_salary) as
    select dept_name, sum(salary) as total_salary
    from instructor
    group by dept_name;
```

### Views Defined Using Other Views
- One view may be used in the expression defining another view.
- A view relation $v_1$ is said to **depend directly** on a view relation $v_2$ if $v_2$ is used in the expression defining $v_1$.
- A view relation $v_1$ is said to **depend on** view relation $v_2$ if either $v_1$ depends directly on $v_2$ or there is a path of dependencies from $v_1$ to $v_2$.
- A view relation $v$ is said to be **recursive** if it depends on itself.

### Views Defined Using Other Views Example
```sql
create view physics_fall_2017 as
    select course.course_id, sec_id, building, room_number
    from course, section
    where course.course_id = section.course_id
      and course.dept_name = 'Physics'
      and section.semester = 'Fall'
      and section.year = '2017';

create view physics_fall_2017_watson as
    select course_id, room_number
    from physics_fall_2017
    where building = 'Watson';
```

### View Expansion

Expand the view:
```sql
create view physics_fall_2017_watson as
    select course_id, room_number
    from physics_fall_2017
    where building = 'Watson'
```

To:
```sql
create view physics_fall_2017_watson as
    select course_id, room_number
    from (select course.course_id, building, room_number
          from course, section
          where course.course_id = section.course_id
            and course.dept_name = 'Physics'
            and section.semester = 'Fall'
            and section.year = '2017')
    where building = 'Watson';
```

### View Expansion (Cont.)
A way to define the meaning of views defined in terms of other views.

Let view $v_1$ be defined by an expression $e_1$ that may itself contain uses of view relations.

View expansion of an expression repeats the following replacement step:
```
repeat
    Find any view relation v_i in e_1
    Replace the view relation v_i by the expression defining v_i
until no more view relations are present in e_1
```

As long as the view definitions are not recursive, this loop will terminate.

### Update of a View

Add a new tuple to the *faculty* view which we defined earlier:
```sql
insert into faculty
    values ('30765', 'Green', 'Music');
```

This insertion must be represented by the insertion of the tuple into the *instructor* relation.
- Must have a value for *salary*.

Two approaches:
- Reject the insert
- Insert the tuple `('30765', 'Green', 'Music', null)` into the *instructor* relation

### Some Updates Cannot be Translated Uniquely
```sql
create view instructor_info as
    select ID, name, building
    from instructor, department
    where instructor.dept_name = department.dept_name;

insert into instructor_info
    values ('69987', 'White', 'Taylor');
```

Issues:
- Which department, if multiple departments in Taylor?
- What if no department is in Taylor?

### And Some Cannot be Done at All
```sql
create view history_instructors as
    select *
    from instructor
    where dept_name = 'History';
```
What happens if we insert `('25566', 'Brown', 'Biology', 100000)` into `history_instructors`?

### View Updates in SQL
Most SQL implementations allow updates only on simple views:
- The `from` clause has only one database relation.
- The `select` clause contains only attribute names of the relation, and does not have any expressions, aggregates, or `distinct` specification.
- Any attribute not listed in the `select` clause can be set to null.
- The query does not have a `group by` or `having` clause.

### Materialized Views
- Certain database systems allow view relations to be physically stored.
  - Physical copy created when the view is defined.
  - Such views are called **materialized view**.
- If relations used in the query are updated, the materialized view result becomes out of date.
  - Need to **maintain** the view, by updating the view whenever the underlying relations are updated.

---

## 4.6 Transactions

- A **transaction** consists of a sequence of query and/or update statements and is a "unit" of work.
- The SQL standard specifies that a transaction begins implicitly when an SQL statement is executed.
- The transaction must end with one of the following statements:
  - **Commit work.** The updates performed by the transaction become permanent in the database.
  - **Rollback work.** All the updates performed by the SQL statements in the transaction are undone.
- **Atomic transaction**
  - Either fully executed or rolled back as if it never occurred
- **Isolation** from concurrent transactions

---

## 4.7 Integrity Constraints

Integrity constraints guard against accidental damage to the database, by ensuring that authorized changes to the database do not result in a loss of data consistency.

- A checking account must have a balance greater than $10,000.00
- A salary of a bank employee must be at least $11.00 an hour
- A customer must have a (non-null) phone number

### Constraints on a Single Relation
- **not null**
- **primary key**
- **unique**
- **check (P)**, where P is a predicate

### Not Null Constraints
- An attribute tagged with `not null` cannot have a null value.
- Declare *name* and *budget* to be `not null`:
  ```sql
  name varchar(20) not null
  budget numeric(12,2) not null
  ```

### Unique Constraints
```
unique (A1, A2, ..., Am)
```
- The unique specification states that the attributes $A_1, A_2, \ldots, A_m$ form a candidate key.
- Candidate keys are permitted to be null (in contrast to primary keys).

### The check clause
- The `check (P)` clause specifies a predicate $P$ that must be satisfied by every tuple in a relation.
- Example: ensure that the value of *semester* is one of {Fall, Winter, Spring, Summer}:

```sql
create table section
    (course_id varchar(8),
     sec_id varchar(8),
     semester varchar(6),
     year numeric(4,0),
     building varchar(15),
     room_number varchar(7),
     time_slot_id varchar(4),
     primary key (course_id, sec_id, semester, year),
     check (semester in ('Fall', 'Winter', 'Spring', 'Summer')))
```

---

## 4.8 Referential Integrity

- Ensures that a value that appears in one relation for a given set of attributes also appears for a certain set of attributes in another relation.
  - **Example:** If "Biology" is a department name appearing in one of the tuples in the *instructor* relation, then there exists a tuple in the *department* relation for "Biology".
- A foreign-key constraint from attribute(s) $A$ of relation $r_1$ to the primary-key $B$ of relation $r_2$ states that on any database instance, the value of $A$ for each tuple in $r_1$ must also be the value of $B$ for some tuple in $r_2$.
- Attribute set $A$ is called a **foreign key** from $r_1$, referencing $r_2$.
- The relation $r_1$ is also called the **referencing relation** of the foreign-key constraint, and
- $r_2$ is called the **referenced relation**.

### Referential Integrity in SQL
Foreign keys can be specified as part of the SQL `create table` statement:
```sql
foreign key (dept_name) references department
```

By default, a foreign key references the primary-key attributes of the referenced table.

SQL allows a list of attributes of the referenced relation to be specified explicitly:
```sql
foreign key (dept_name) references department(dept_name)
```

### Cascading Actions in Referential Integrity
- When a referential-integrity constraint is violated, the normal procedure is to reject the action that caused the violation.
  - The transaction performing the update action is rolled back.
- For foreign keys, in the case of a delete or update, instead of rejecting the action, the system can take steps to change the tuple in the referencing relation to restore the constraint.
- In the declaration of a foreign key, we can use:
  - **on delete cascade**
  - **on update cascade**
- For delete: If a delete of a tuple results in a referential-integrity constraint being violated, the system does not reject the delete. Instead, the delete cascades to the referencing relation, deleting the appropriate tuples.
- Similarly for updates.

### Complex Check Conditions
The predicate in the `check` clause can be an arbitrary predicate that can include a subquery:
```sql
check (time_slot_id in (select time_slot_id from time_slot))
```
The check condition states that the `time_slot_id` in each tuple in the *section* relation is actually the identifier of a time slot in the *time_slot* relation.
- The condition has to be checked not only when a tuple is inserted or modified in *section*, but also when the relation *time_slot* changes.

### Assertions
- An **assertion** is a predicate expressing a condition that we wish the database always to satisfy.
- The following constraints can be expressed using assertions:
  - For each tuple in the *student* relation, the value of the attribute *tot_cred* must equal the sum of credits of courses that the student has completed successfully.
  - An instructor cannot teach in two different classrooms in a semester in the same time slot.
- An assertion in SQL takes the form:
  ```sql
  create assertion <assertion-name> check (<predicate>);
  ```

---

## 4.9 SQL Data Types and Schemas

### Built-in Data Types in SQL
- **date:** Dates, containing a (4 digit) year, month and day
  - Example: `date '2005-7-27'`
- **time:** Time of day, in hours, minutes and seconds.
  - Example: `time '09:00:30'`
  - Example: `time '09:00:30.75'`
- **timestamp:** date plus time of day
  - Example: `timestamp '2005-7-27 09:00:30.75'`
- **interval:** period of time
  - Example: `interval '1' day`
  - Subtracting a date/time/timestamp value from another gives an interval value
  - Interval values can be added to date/time/timestamp values

### User-Defined Types
`create type` construct in SQL creates user-defined type:
```sql
create type Dollars as numeric(12,2) final
```

**Example:**
```sql
create table department
    (dept_name varchar(20),
     building  varchar(15),
     budget    Dollars);
```

### Domains
`create domain` construct in SQL-92 creates user-defined domain types:
```sql
create domain person_name char(20) not null
```

Types and domains are similar. Domains can have constraints, such as `not null`, specified on them.

**Example:**
```sql
create domain degree_level varchar(10)
    constraint degree_level_test
        check (value in ('Bachelors', 'Masters', 'Doctorate'));
```

### Large-Object Types
- Large objects (photos, videos, CAD files, word files, etc.) are stored as a *large object*:
  - **blob:** binary large object — object is a large collection of uninterpreted binary data (whose interpretation is left to an application outside of the database system).
    - Photo of a student
    - Video of a lecture
  - **clob:** character large object — object is a large collection of character data
    - Essay of a student
- Large objects are usually not stored in the tables.
- When a query returns a large object, a pointer is returned rather than the large object itself.

---

## 4.10 Index Definition in SQL

### Index Creation
- Many queries reference only a small proportion of the records in a table.
- It is inefficient for the system to read every record to find a record with particular value.
- An **index** on an attribute of a relation is a data structure that allows the database system to find those tuples in the relation that have a specified value for that attribute efficiently, without scanning through all the tuples of the relation.
- We create an index with the `create index` command:
  ```sql
  create index <name> on <relation-name> (attribute);
  ```

### Index Creation Example
```sql
create table student
    (ID         varchar(5),
     name       varchar(20) not null,
     dept_name  varchar(20),
     tot_cred   numeric(3,0) default 0,
     primary key (ID))

create index studentID_index on student(ID)
```

The query:
```sql
select *
from student
where ID = '12345'
```
can be executed by using the index to find the required record, without looking at all records of *student*.

---

## End of Chapter 4
