# 04 — Structured Query Language (SQL)

## 4.1 Parts of SQL

- **DML** — query/insert/delete/modify.
- **DDL** — define schemas and integrity constraints.
- **View definition**.
- **Transaction control**.
- **Embedded/dynamic SQL**.
- **Authorization**.

---

## 4.2 SQL Data Types

| Type | Meaning |
|---|---|
| `char(n)` | Fixed-length string of length n |
| `varchar(n)` | Variable-length, max length n |
| `int` | Integer |
| `smallint` | Small integer |
| `numeric(p, d)` | Fixed-point: p digits, d after decimal |
| `real`, `double precision` | Floating point |
| `float(n)` | Floating point with at least n digits |
| `date` | (year, month, day), e.g., `date '2005-7-27'` |
| `time` | Hours/min/sec |
| `timestamp` | date + time |
| `interval` | Period of time |

User-defined types: `create type Dollars as numeric(12, 2) final`.

Large objects:
- `blob` — binary large object.
- `clob` — character large object.

---

## 4.3 Data Definition (DDL)

### CREATE TABLE
```sql
create table r (
    A1 D1, A2 D2, ..., An Dn,
    (integrity-constraint1),
    ...,
    (integrity-constraintk)
)
```

Example:
```sql
create table instructor (
    ID         char(5),
    name       varchar(20) not null,
    dept_name  varchar(20),
    salary     numeric(8,2),
    primary key (ID),
    foreign key (dept_name) references department
);
```

### Other DDL
```sql
drop table r;
alter table r add A D;       -- add attribute (existing rows = null)
alter table r drop A;        -- drop attribute (limited support)
```

---

## 4.4 Integrity Constraints

- `primary key (A1, ..., An)` — implies not-null + unique.
- `foreign key (Am, ..., An) references r` — referential integrity.
- `not null`.
- `unique (A1, ..., An)` — candidate key (allows null, unlike primary key).
- `check (P)` — predicate that every tuple must satisfy.

```sql
create table section (
    course_id varchar(8),
    sec_id varchar(8),
    semester varchar(6),
    year numeric(4,0),
    ...
    primary key (course_id, sec_id, semester, year),
    check (semester in ('Fall', 'Winter', 'Spring', 'Summer'))
);
```

### Cascading actions
```sql
foreign key (dept_name) references department
    on delete cascade
    on update cascade
```
Alternatives: `set null`, `set default`.

### Assertions
```sql
create assertion <name> check (<predicate>);
```

---

## 4.5 Basic Query Structure

```sql
select A1, A2, ..., An
from r1, r2, ..., rm
where P
```

- `select` corresponds to relational-algebra **projection**.
- `where` corresponds to **selection** ($\sigma$).
- `from` corresponds to **Cartesian product**.

### SELECT clause
- Case-insensitive: `Name ≡ name`.
- `select distinct dept_name from instructor` — eliminate duplicates.
- `select all dept_name from instructor` — keep duplicates (default).
- `select *` — all attributes.
- Arithmetic allowed: `select ID, name, salary/12 as monthly_salary from instructor`.

### WHERE clause
- Connectives: `and`, `or`, `not`.
- Comparisons: `<, <=, >, >=, =, <>`.
- `between`: `where salary between 90000 and 100000`.
- Tuple comparison: `where (instructor.ID, dept_name) = (teaches.ID, 'Biology')`.

### FROM clause and Cartesian product
```sql
select name, course_id
from instructor, teaches
where instructor.ID = teaches.ID
```

### Renaming with `as`
```sql
select distinct T.name
from instructor as T, instructor as S
where T.salary > S.salary and S.dept_name = 'Comp. Sci.'
```
The `as` keyword is optional.

### String operations — `like`
- `%` matches any substring.
- `_` matches any single character.
- Case-sensitive.
- `like '100 \%' escape '\'` — match the literal string "100%".

Examples:
- `'Intro%'` — strings starting with "Intro".
- `'%Comp%'` — strings containing "Comp".
- `'_ _ _'` — exactly 3 chars.

Other string ops: concatenation `||`, `upper`, `lower`, length, substring.

### Ordering
```sql
select distinct name from instructor order by name;
order by name desc, dept_name;
```

---

## 4.6 Set Operations

```sql
(query1) union (query2)
(query1) intersect (query2)
(query1) except (query2)
```
Eliminate duplicates by default. Add `all` (`union all`, `intersect all`, `except all`) to retain duplicates.

---

## 4.7 Null Values

- `null` means unknown/missing.
- Any arithmetic with null = null. e.g., `5 + null = null`.
- Test with `is null` / `is not null`.

### Three-valued logic
- `5 < null` → unknown.
- `(true and unknown) = unknown`; `(false and unknown) = false`.
- `(true or unknown) = true`; `(false or unknown) = unknown`.
- `not unknown = unknown`.
- A `where` clause treats unknown as false.

---

## 4.8 Aggregate Functions

`avg, min, max, sum, count`.

```sql
select avg(salary) from instructor where dept_name = 'Comp. Sci.';
select count(distinct ID) from teaches where semester='Spring' and year=2018;
select count(*) from course;
```

### GROUP BY
```sql
select dept_name, avg(salary) as avg_salary
from instructor
group by dept_name;
```
Attributes outside aggregates in `select` must appear in `group by`.

### HAVING
Filter applied **after** grouping (vs. `where` which is before grouping).
```sql
select dept_name, avg(salary)
from instructor
group by dept_name
having avg(salary) > 42000;
```

---

## 4.9 Nested Subqueries

A subquery is a `select-from-where` nested in another query.

### IN / NOT IN
```sql
select distinct course_id
from section
where semester='Fall' and year=2017
  and course_id in (select course_id from section where semester='Spring' and year=2018);
```

### SOME / ALL
- $F \text{ <comp> some } r \Leftrightarrow \exists t \in r: F \text{ <comp> } t$.
- $F \text{ <comp> all } r \Leftrightarrow \forall t \in r: F \text{ <comp> } t$.

Examples:
- `(5 < some {0,5,6}) = true`
- `(5 = some {0,5}) = true`
- `(5 = all {4,5}) = false`

```sql
-- Salary > some Biology instructor:
select name from instructor
where salary > some (select salary from instructor where dept_name='Biology');

-- Salary > all Biology instructors:
select name from instructor
where salary > all (select salary from instructor where dept_name='Biology');
```

`= some` ≡ `in`. `≠ all` ≡ `not in`. The reverse equivalences do **not** hold.

### EXISTS / NOT EXISTS
```sql
-- Courses taught in both Fall 2017 and Spring 2018
select course_id from section as S
where semester='Fall' and year=2017
  and exists (select * from section as T
              where semester='Spring' and year=2018 and S.course_id = T.course_id);
```

```sql
-- Students who have taken all Biology courses
select distinct S.ID, S.name
from student as S
where not exists ((select course_id from course where dept_name='Biology')
                  except
                  (select T.course_id from takes as T where S.ID = T.ID));
```
Uses the equivalence: $X - Y = \emptyset \Leftrightarrow X \subseteq Y$.

### UNIQUE
Tests if a subquery has no duplicates.
```sql
select T.course_id from course as T
where unique (select R.course_id from section as R
              where T.course_id = R.course_id and R.year = 2017);
```

### Subqueries in FROM
```sql
select dept_name, avg_salary
from (select dept_name, avg(salary) as avg_salary from instructor group by dept_name)
where avg_salary > 42000;
```

### WITH (Common Table Expression)
```sql
with max_budget(value) as (select max(budget) from department)
select department.name from department, max_budget
where department.budget = max_budget.value;
```

### Scalar subquery
```sql
select dept_name,
  (select count(*) from instructor where department.dept_name = instructor.dept_name)
  as num_instructors
from department;
```

---

## 4.10 Database Modifications

### Insertion
```sql
insert into course values ('CS-437', 'Database Systems', 'Comp. Sci.', 4);
insert into course (course_id, title, dept_name, credits)
    values ('CS-437', 'Database Systems', 'Comp. Sci.', 4);

-- Insert via select
insert into instructor
    select ID, name, dept_name, 18000
    from student
    where dept_name = 'Music' and tot_cred > 144;
```
The `select` is fully evaluated before insert.

### Deletion
```sql
delete from instructor;
delete from instructor where dept_name = 'Finance';

-- Delete instructors below average salary (snapshot pre-delete)
delete from instructor where salary < (select avg(salary) from instructor);
```
SQL first computes targets, then deletes.

### Update
```sql
update instructor set salary = salary * 1.05;
update instructor set salary = salary * 1.05 where salary < 70000;

-- Conditional update
update instructor
set salary = case
    when salary <= 100000 then salary * 1.05
    else salary * 1.03
end;
```

---

## 4.11 Joins

### Natural join
- Equates all columns with the same name; retains one copy of each common column.
```sql
select name, course_id from student natural join takes;
```
Beware of accidental name collisions on unrelated attributes.

### Inner join (with explicit condition)
```sql
select * from course inner join prereq on course.course_id = prereq.course_id;
```

### Outer joins
- **Left outer join** (`R ⟕ S`): preserves all of left + matched right (nulls on unmatched).
- **Right outer join** (`R ⟖ S`): preserves all of right.
- **Full outer join** (`R ⟗ S`): preserves both.
```sql
course natural left outer join prereq;
course full outer join prereq using (course_id);
```

### Join types and conditions table
| Join types | Join conditions |
|---|---|
| inner join | natural |
| left outer join | on <predicate> |
| right outer join | using (A1, ..., An) |
| full outer join |  |

---

## 4.12 Views

A **view** is a virtual relation. Defined via:
```sql
create view v as <query expression>;
```

Examples:
```sql
create view faculty as
    select ID, name, dept_name from instructor;

create view departments_total_salary(dept_name, total_salary) as
    select dept_name, sum(salary)
    from instructor group by dept_name;
```

### Views Defined Using Other Views
- View `v1` directly depends on `v2` if `v2` appears in `v1`'s definition.
- `v1` depends on `v2` if there is a path of dependencies.
- A view is **recursive** if it depends on itself.

### Updating views
SQL allows updates only on simple views:
- Single relation in `from`.
- `select` lists only attribute names (no expressions/aggregates/distinct).
- Any non-listed attribute can be set null.
- No `group by` / `having`.

### Materialized views
- Physically stored; must be **maintained** when underlying relations change.

---

## 4.13 Transactions in SQL

A transaction is a sequence of queries/updates treated as a unit. Begins implicitly; ends with:
- `commit work` — make changes permanent.
- `rollback work` — undo all changes.

By default, every statement auto-commits unless turned off (e.g., JDBC `setAutoCommit(false)`).

Set isolation:
```sql
set transaction isolation level serializable;
```

---

## 4.14 Indexes
```sql
create index <name> on <relation>(<attribute>);
create unique index <name> on <relation>(<attribute>);  -- candidate-key constraint
drop index <name>;
```
Database systems often use indices automatically to speed up queries.

---

## 4.15 Likely Exam Questions

1. Write SQL DDL to create a relation with PK, FK, NOT NULL, CHECK constraints.
2. Write SQL queries for: aggregate with GROUP BY/HAVING, set operations, nested subqueries with IN/EXISTS/ALL/SOME.
3. Write a self-join query.
4. Translate "students who have taken every Biology course" using `not exists`.
5. Difference between `where` and `having`.
6. Compare `union`, `intersect`, `except` (with vs without `all`).
7. Explain three-valued logic in SQL.
8. Compare inner, left outer, right outer, full outer joins.
9. What is a view? When can it be updated?
10. Explain on-delete-cascade.

### Practice queries
Given the university schema:
1. List names of instructors who teach a Comp. Sci. course.
2. Find the dept_name with the highest average salary.
3. List students who have taken all courses of the Comp. Sci. department (relational division via `not exists`).
