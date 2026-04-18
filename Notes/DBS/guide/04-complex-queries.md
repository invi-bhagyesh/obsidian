# Lab 4: Complex Queries on SQL

## Key Concepts

### GROUP BY
Groups rows sharing a value; used with aggregate functions (`COUNT`, `SUM`, `AVG`, `MIN`, `MAX`).

```sql
SELECT dept_name, AVG(salary) FROM Instructor GROUP BY dept_name;
```

### HAVING
Filters **groups** (not individual rows — that's WHERE).

```sql
SELECT dept_name, COUNT(*) FROM Student
GROUP BY dept_name
HAVING COUNT(*) > 10;
```

**Execution order:** FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY

### ORDER BY
Sorts output. `ASC` (default) or `DESC`.

```sql
SELECT * FROM Instructor ORDER BY salary DESC;
```

### WITH Clause
Defines a temporary named result set (CTE) for the query.

```sql
WITH dept_avg(dept_name, avg_sal) AS (
    SELECT dept_name, AVG(salary) FROM Instructor GROUP BY dept_name
)
SELECT * FROM dept_avg WHERE avg_sal > 42000;
```

### COMMIT & ROLLBACK
| Command | Effect |
|---------|--------|
| `COMMIT` | Makes all changes permanent |
| `ROLLBACK` | Undoes all changes since last COMMIT |
| `SAVEPOINT name` | Marks a point to roll back to |
| `ROLLBACK TO name` | Undoes changes back to that savepoint |

---

## Lab Exercises — Solved

**(University Database)**

### GROUP BY

**Q1. Number of students in each course.**
```sql
SELECT course_id, COUNT(ID) AS num_students
FROM Takes
GROUP BY course_id;
```

**Q2. Departments where avg students > 10.**
```sql
SELECT dept_name, COUNT(ID) AS num_students
FROM Student
GROUP BY dept_name
HAVING COUNT(ID) > 10;
```

**Q3. Total courses in each department.**
```sql
SELECT dept_name, COUNT(course_id) AS num_courses
FROM Course
GROUP BY dept_name;
```

**Q4. Departments with avg salary > 42000.**
```sql
SELECT dept_name, AVG(salary) AS avg_salary
FROM Instructor
GROUP BY dept_name
HAVING AVG(salary) > 42000;
```

**Q5. Enrolment of each section in Spring 2009.**
```sql
SELECT course_id, sec_id, COUNT(ID) AS enrolment
FROM Takes
WHERE semester = 'Spring' AND year = 2009
GROUP BY course_id, sec_id;
```

### ORDER BY

**Q6. Courses with prerequisites, ordered by course_id ASC.**
```sql
SELECT * FROM Prereq ORDER BY course_id ASC;
```

**Q7. Instructors sorted by salary DESC.**
```sql
SELECT * FROM Instructor ORDER BY salary DESC;
```

### Derived Relations

**Q8. Maximum total salary across departments.**
```sql
SELECT MAX(total_sal) AS max_total_salary
FROM (SELECT dept_name, SUM(salary) AS total_sal FROM Instructor GROUP BY dept_name);
```

**Q9. Avg salary of departments where avg > 42000.**
```sql
SELECT dept_name, avg_sal
FROM (SELECT dept_name, AVG(salary) AS avg_sal FROM Instructor GROUP BY dept_name)
WHERE avg_sal > 42000;
```

**Q10. Sections with max enrolment in Spring 2010.**
```sql
SELECT course_id, sec_id, cnt
FROM (
    SELECT course_id, sec_id, COUNT(ID) AS cnt
    FROM Takes
    WHERE semester = 'Spring' AND year = 2010
    GROUP BY course_id, sec_id
)
WHERE cnt = (
    SELECT MAX(cnt) FROM (
        SELECT COUNT(ID) AS cnt FROM Takes
        WHERE semester = 'Spring' AND year = 2010
        GROUP BY course_id, sec_id
    )
);
```

**Q11. Instructors who teach ALL CSE students.**
```sql
SELECT I.name FROM Instructor I
WHERE NOT EXISTS (
    SELECT S.ID FROM Student S WHERE S.dept_name = 'Comp. Sci.'
    MINUS
    SELECT T.ID FROM Takes T
    JOIN Teaches Te ON T.course_id = Te.course_id
        AND T.sec_id = Te.section_id
        AND T.semester = Te.semester
        AND T.year = Te.year
    WHERE Te.ID = I.ID
);
```

**Q12. Departments: avg salary > 50000 AND more than 5 instructors.**
```sql
SELECT dept_name, AVG(salary) AS avg_salary
FROM Instructor
GROUP BY dept_name
HAVING AVG(salary) > 50000 AND COUNT(*) > 5;
```

### WITH Clause

**Q13. Departments with maximum budget.**
```sql
WITH max_budget(val) AS (
    SELECT MAX(budget) FROM Department
)
SELECT dept_name FROM Department, max_budget
WHERE budget = max_budget.val;
```

**Q14. Departments where total salary > avg of all department totals.**
```sql
WITH dept_total(dept_name, total) AS (
    SELECT dept_name, SUM(salary) FROM Instructor GROUP BY dept_name
),
dept_total_avg(val) AS (
    SELECT AVG(total) FROM dept_total
)
SELECT dept_name FROM dept_total, dept_total_avg
WHERE total > val;
```

### COMMIT / ROLLBACK

**Q15. Transfer all CSE students to IT (with rollback).**
```sql
SAVEPOINT before_transfer;
UPDATE Student SET dept_name = 'IT' WHERE dept_name = 'Comp. Sci.';
-- If wrong: ROLLBACK TO before_transfer;
-- If correct: COMMIT;
```

**Q16. Conditional salary raise.**
```sql
SAVEPOINT before_raise;
UPDATE Instructor SET salary = salary * 1.03 WHERE salary > 100000;
UPDATE Instructor SET salary = salary * 1.05 WHERE salary <= 100000;
COMMIT;
```
