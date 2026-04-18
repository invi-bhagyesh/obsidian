# DBS Lab Study Guide — Index

**Course:** Database Systems Lab (CSE 2241)

## Chapters

| # | Topic | Key Areas |
|---|-------|-----------|
| 1 | [Introduction to SQL](01-introduction-to-sql.md) | DDL, DML, CREATE, ALTER, DROP, INSERT, SELECT, UPDATE, DELETE |
| 2 | [Integrity Constraints](02-integrity-constraints.md) | PK, FK, UNIQUE, CHECK, NOT NULL, DEFAULT, ON DELETE CASCADE, built-in functions |
| 3 | [Intermediate SQL](03-intermediate-sql.md) | UNION, INTERSECT, MINUS, Views, Nested Subqueries, IN, EXISTS, SOME, ALL |
| 4 | [Complex Queries](04-complex-queries.md) | GROUP BY, HAVING, ORDER BY, WITH clause, derived relations, COMMIT, ROLLBACK |
| 5 | [ER Model and SQL](05-er-model-and-sql.md) | ER-to-relational mapping (1:1, 1:N, N:N, multi-valued), Company DB queries |
| 6 | [Mini Project Phase I](06-mini-project-phase1.md) | Synopsis format, project planning |
| 7 | [PL/SQL Basics](07-plsql-basics.md) | Block structure, IF/ELSIF, LOOP, WHILE, FOR, GOTO, exceptions, %TYPE, %ROWTYPE |
| 8 | [Cursors](08-cursors.md) | Implicit/explicit cursors, FOR loops, WHERE CURRENT OF, parameterized cursors, transactions |
| 9 | [Procedures, Functions & Packages](09-procedures-functions-packages.md) | CREATE PROCEDURE/FUNCTION, IN/OUT/IN OUT, packages (spec + body) |
| 10 | [Triggers](10-triggers.md) | BEFORE/AFTER, :OLD/:NEW, row triggers, INSTEAD OF triggers, audit trails |

## Database Schemas Used

**University DB:** Student, Instructor, Course, Takes, Section, Teaches, Department, Advisor, Classroom, Time_slot, Prereq

**Company DB (Lab 5):** Employee, Department, Dept_Locations, Project, Works_On, Dependent

**Simple Tables:** Employee(emp_no, emp_name, emp_address, salary), StudentTable(RollNo, GPA)
