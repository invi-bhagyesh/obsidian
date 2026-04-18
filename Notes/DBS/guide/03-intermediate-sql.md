# Lab 3: Intermediate SQL

## Key Concepts

### Set Operations
| Operation       | Returns                      | Duplicates |
| --------------- | ---------------------------- | ---------- |
| `UNION`         | Rows in either result        | Removed    |
| `UNION ALL`     | Rows in either result        | Kept       |
| `INTERSECT`     | Rows in both results         | Removed    |
| `INTERSECT ALL` | Rows in both results         | Kept       |
| `MINUS`         | Rows in first but not second | Removed    |

**Rules:** Both SELECTs must have same number of columns with compatible data types.

### Views
A view is a **virtual table** based on a SELECT statement. Does not store data — recomputes each time.

```sql
CREATE VIEW view_name AS
SELECT columns FROM table WHERE condition;
```

### Nested Subqueries
- **Set Membership:** `IN`, `NOT IN`
- **Set Comparison:** `> SOME`, `> ALL`, `>= SOME`, `>= ALL`
- **Existence Test:** `EXISTS`, `NOT EXISTS`
- **Subqueries in FROM clause** (derived relations)

---

## Lab Exercises — Solved

**(University Database)**

### Set Operations

**Q1. Courses in Fall 2009 OR Spring 2010.**
```sql
SELECT course_id FROM Section WHERE semester = 'Fall' AND year = 2009
UNION
SELECT course_id FROM Section WHERE semester = 'Spring' AND year = 2010;
```

**Q2. Courses in Fall 2009 AND Spring 2010.**
```sql
SELECT course_id FROM Section WHERE semester = 'Fall' AND year = 2009
INTERSECT
SELECT course_id FROM Section WHERE semester = 'Spring' AND year = 2010;
```

**Q3. Courses in Fall 2009 but NOT Spring 2010.**
```sql
SELECT course_id FROM Section WHERE semester = 'Fall' AND year = 2009
MINUS
SELECT course_id FROM Section WHERE semester = 'Spring' AND year = 2010;
```

### Null Values

**Q4. Courses with no students registered.**
```sql
SELECT title FROM Course
WHERE course_id NOT IN (SELECT course_id FROM Takes);
```

### Nested Subqueries — Set Membership (IN / NOT IN)

**Q5. Courses in Fall 2009 AND Spring 2010 (using IN).**
```sql
SELECT course_id FROM Section
WHERE semester = 'Fall' AND year = 2009
AND course_id IN (
    SELECT course_id FROM Section
    WHERE semester = 'Spring' AND year = 2010
);
```

**Q6. Total students taught by instructor 10101.**
```sql
SELECT COUNT(DISTINCT ID) FROM Takes
WHERE course_id IN (
    SELECT course_id FROM Teaches WHERE ID = 10101
);
```

**Q7. Courses in Fall 2009 but NOT Spring 2010 (using NOT IN).**
```sql
SELECT course_id FROM Section
WHERE semester = 'Fall' AND year = 2009
AND course_id NOT IN (
    SELECT course_id FROM Section
    WHERE semester = 'Spring' AND year = 2010
);
```

**Q8. Students whose name matches an instructor's name.**
```sql
SELECT name FROM Student
WHERE name IN (SELECT name FROM Instructor);
```

### Set Comparison (SOME / ALL)

**Q9. Instructors earning more than some Biology instructor.**
```sql
SELECT name FROM Instructor
WHERE salary > SOME (
    SELECT salary FROM Instructor WHERE dept_name = 'Biology'
);
```

**Q10. Instructors earning more than ALL Biology instructors.**
```sql
SELECT name FROM Instructor
WHERE salary > ALL (
    SELECT salary FROM Instructor WHERE dept_name = 'Biology'
);
```

**Q11. Department with highest average salary.**
```sql
SELECT dept_name FROM Instructor
GROUP BY dept_name
HAVING AVG(salary) >= ALL (
    SELECT AVG(salary) FROM Instructor GROUP BY dept_name
);
```

**Q12. Departments with budget less than average salary of all instructors.**
```sql
SELECT dept_name FROM Department
WHERE budget < (SELECT AVG(salary) FROM Instructor);
```

### Existence Tests (EXISTS / NOT EXISTS)

**Q13. Courses taught in both Fall 2009 and Spring 2010 (using EXISTS).**
```sql
SELECT course_id FROM Section S
WHERE semester = 'Fall' AND year = 2009
AND EXISTS (
    SELECT 1 FROM Section T
    WHERE T.course_id = S.course_id
    AND T.semester = 'Spring' AND T.year = 2010
);
```

**Q14. Students who have taken ALL Biology courses.**
```sql
SELECT S.name FROM Student S
WHERE NOT EXISTS (
    SELECT course_id FROM Course WHERE dept_name = 'Biology'
    MINUS
    SELECT T.course_id FROM Takes T WHERE T.ID = S.ID
);
```

### Duplicate Tests

**Q15. Courses offered at most once in 2009.**
```sql
SELECT course_id FROM Section
WHERE year = 2009
GROUP BY course_id
HAVING COUNT(*) <= 1;
```

**Q16. Students with at least 2 CSE courses.**
```sql
SELECT ID FROM Takes
WHERE course_id IN (SELECT course_id FROM Course WHERE dept_name = 'Comp. Sci.')
GROUP BY ID
HAVING COUNT(*) >= 2;
```

### Subqueries in FROM Clause

**Q17. Departments where avg salary > 42000.**
```sql
SELECT dept_name, avg_sal
FROM (SELECT dept_name, AVG(salary) AS avg_sal FROM Instructor GROUP BY dept_name)
WHERE avg_sal > 42000;
```

### Views

**Q18. Create view — Physics courses in Fall 2009.**
```sql
CREATE VIEW all_courses AS
SELECT course_id, title, building, room_number
FROM Section NATURAL JOIN Course
WHERE dept_name = 'Physics' AND semester = 'Fall' AND year = 2009;
```

**Q19. Select from the view.**
```sql
SELECT * FROM all_courses;
```

**Q20. View of department total salary.**
```sql
CREATE VIEW department_total_salary AS
SELECT dept_name, SUM(salary) AS total_salary
FROM Instructor
GROUP BY dept_name;
```
