# Lab 2: Integrity Constraints in SQL

## Key Concepts

**Constraint Types:**
| Constraint | Purpose | Level |
|------------|---------|-------|
| `NOT NULL` | Column cannot have NULL | Column |
| `DEFAULT` | Default value when none specified | Column |
| `UNIQUE` | All values must be distinct | Column/Table |
| `PRIMARY KEY` | Unique + NOT NULL identifier | Column/Table |
| `FOREIGN KEY` | References PK of another table | Column/Table |
| `CHECK` | Values must satisfy a condition | Column/Table |

**Key Rules:**
- Column-level constraints apply to one column; table-level apply to the whole table
- `PRIMARY KEY` = `UNIQUE` + `NOT NULL`
- `FOREIGN KEY` ensures referential integrity (child must have valid parent)
- `ON DELETE CASCADE` — deleting parent auto-deletes children

---

## Syntax Reference

### Defining constraints inline (column-level)
```sql
column_name datatype PRIMARY KEY
column_name datatype UNIQUE
column_name datatype NOT NULL
column_name datatype DEFAULT (value)
column_name datatype CHECK (condition)
```

### Table-level constraints
```sql
PRIMARY KEY (col1, col2)
FOREIGN KEY (col) REFERENCES other_table(col)
FOREIGN KEY (col) REFERENCES other_table(col) ON DELETE CASCADE
CHECK (col IN ('val1', 'val2'))
```

### Named constraints
```sql
CONSTRAINT constraint_name PRIMARY KEY (col)
CONSTRAINT constraint_name CHECK (salary > 5000)
```

### Managing constraints
```sql
-- View constraints
SELECT * FROM user_cons_columns WHERE table_name = 'EMPLOYEE';

-- Drop a constraint
ALTER TABLE EMPLOYEES DROP CONSTRAINT employees_pk;

-- Add/Modify/Disable/Enable
ALTER TABLE table_name ADD CONSTRAINT name CHECK (condition);
ALTER TABLE table_name DISABLE CONSTRAINT name;
ALTER TABLE table_name ENABLE CONSTRAINT name;
```

---

## Built-in Functions

| Function | Purpose | Example |
|----------|---------|---------|
| `LENGTH(str)` | String length | `LENGTH('hello')` -> 5 |
| `LOWER(str)` | To lowercase | `LOWER('ABC')` -> 'abc' |
| `UPPER(str)` | To uppercase | `UPPER('abc')` -> 'ABC' |
| `SUBSTR(str, start, len)` | Substring | `SUBSTR('hello',2,3)` -> 'ell' |
| `NVL(col, replacement)` | Replace NULL | `NVL(salary, 0)` |
| `ROUND(num, dec)` | Round number | `ROUND(15.193, 1)` -> 15.2 |
| `TO_CHAR(date, fmt)` | Date to string | `TO_CHAR(dob, 'DD-MON-YYYY')` |
| `TO_DATE(str, fmt)` | String to date | `TO_DATE('12021998','DDMMYYYY')` |
| `LAST_DAY(date)` | Last day of month | `LAST_DAY('15-JAN-24')` -> 31-JAN-24 |
| `MONTHS_BETWEEN(d1,d2)` | Month difference | `MONTHS_BETWEEN(d1, d2)` |
| `NEXT_DAY(date, 'day')` | Next weekday | `NEXT_DAY(SYSDATE, 'MONDAY')` |

---

## Lab Exercises — Solved

**Schemas:**
- `Employee(EmpNo, EmpName, Gender, Salary, Address, DNo)`
- `Department(DeptNo, DeptName, Location)`

**University Database:**
- `Student(ID, name, dept_name, tot_cred)`
- `Instructor(ID, name, dept_name, salary)`
- `Course(course_id, title, dept_name, credits)`
- `Takes(ID, course_id, sec_id, semester, year, grade)`
- `Department(dept_name, building, budget)`
- `Section(course_id, section_id, semester, year, building, room_number, time_slot_id)`
- `Teaches(ID, course_id, section_id, semester, year)`
- `Advisor(s_id, i_id)`

---

**Q1. Create Employee with constraints.**
```sql
CREATE TABLE Employee (
    EmpNo   NUMBER(5) PRIMARY KEY,
    EmpName VARCHAR(20) NOT NULL,
    Gender  CHAR(1) NOT NULL CHECK (Gender IN ('M', 'F')),
    Salary  NUMBER(10) NOT NULL,
    Address VARCHAR(30) NOT NULL,
    DNo     NUMBER(5)
);
```

**Q2. Create Department with PK and candidate key.**
```sql
CREATE TABLE Department (
    DeptNo   NUMBER(5) PRIMARY KEY,
    DeptName VARCHAR(20) UNIQUE,
    Location VARCHAR(20)
);
```

**Q3. Make DNo a foreign key.**
```sql
ALTER TABLE Employee ADD CONSTRAINT fk_dept
    FOREIGN KEY (DNo) REFERENCES Department(DeptNo);
```

**Q4. Insert valid tuples.**
```sql
INSERT INTO Department VALUES (10, 'CSE', 'Block A');
INSERT INTO Department VALUES (20, 'ECE', 'Block B');
INSERT INTO Employee VALUES (1, 'Ravi', 'M', 50000, 'Manipal', 10);
INSERT INTO Employee VALUES (2, 'Sneha', 'F', 60000, 'Bangalore', 20);
```

**Q5. Insert violating tuples (these will FAIL).**
```sql
-- Violates NOT NULL on EmpName
INSERT INTO Employee VALUES (3, NULL, 'M', 40000, 'Delhi', 10);

-- Violates CHECK on Gender
INSERT INTO Employee VALUES (4, 'Aman', 'X', 45000, 'Mumbai', 10);

-- Violates FOREIGN KEY (DNo=99 doesn't exist)
INSERT INTO Employee VALUES (5, 'Priya', 'F', 55000, 'Chennai', 99);
```

**Q6. Delete a department that has employees (will FAIL without CASCADE).**
```sql
-- This fails because employees reference DeptNo=10
DELETE FROM Department WHERE DeptNo = 10;
```

**Q7. Modify FK to ON DELETE CASCADE.**
```sql
ALTER TABLE Employee DROP CONSTRAINT fk_dept;
ALTER TABLE Employee ADD CONSTRAINT fk_dept
    FOREIGN KEY (DNo) REFERENCES Department(DeptNo) ON DELETE CASCADE;
-- Now deleting a department also deletes its employees
```

**Q8. Named constraint for default salary.**
```sql
ALTER TABLE Employee ADD CONSTRAINT def_salary DEFAULT 10000 FOR salary;
-- OR during CREATE:
-- salary NUMBER(10) DEFAULT 10000
```

**Q9-25 (University DB queries):**

**Q9. List students with names and dept names.**
```sql
SELECT name, dept_name FROM Student;
```

**Q10. List all instructors in CSE.**
```sql
SELECT * FROM Instructor WHERE dept_name = 'Comp. Sci.';
```

**Q11. CSE courses with 3 credits.**
```sql
SELECT title FROM Course WHERE dept_name = 'Comp. Sci.' AND credits = 3;
```

**Q12. Courses registered by student ID 12345.**
```sql
SELECT T.course_id, C.title
FROM Takes T JOIN Course C ON T.course_id = C.course_id
WHERE T.ID = 12345;
```

**Q13. Instructors with salary between 40000 and 90000.**
```sql
SELECT * FROM Instructor WHERE salary BETWEEN 40000 AND 90000;
```

**Q14. Instructors who never taught.**
```sql
SELECT ID FROM Instructor WHERE ID NOT IN (SELECT ID FROM Teaches);
```

**Q15. Students in room 303 — names, course names, year.**
```sql
SELECT S.name, C.title, Sec.year
FROM Student S
JOIN Takes T ON S.ID = T.ID
JOIN Section Sec ON T.course_id = Sec.course_id
    AND T.sec_id = Sec.section_id
    AND T.semester = Sec.semester
    AND T.year = Sec.year
JOIN Course C ON T.course_id = C.course_id
WHERE Sec.room_number = '303';
```

**Q16. Students in 2015 — names and course id renamed to c_name.**
```sql
SELECT S.name, T.course_id AS c_name
FROM Student S JOIN Takes T ON S.ID = T.ID
WHERE T.year = 2015;
```

**Q17. Instructors earning more than some CSE instructor.**
```sql
SELECT name, salary AS inst_salary
FROM Instructor
WHERE salary > SOME (SELECT salary FROM Instructor WHERE dept_name = 'Comp. Sci.');
```

**Q18. Instructors whose dept name contains 'ch'.**
```sql
SELECT name FROM Instructor WHERE dept_name LIKE '%ch%';
```

**Q19. Student names with their name lengths.**
```sql
SELECT name, LENGTH(name) FROM Student;
```

**Q20. 3 chars from position 3 of dept name.**
```sql
SELECT dept_name, SUBSTR(dept_name, 3, 3) FROM Department;
```

**Q21. Instructor names in uppercase.**
```sql
SELECT UPPER(name) FROM Instructor;
```

**Q22. Replace NULL with 0.**
```sql
SELECT NVL(salary, 0) FROM Instructor;
```

**Q23. Salary and salary/3 rounded to nearest hundred.**
```sql
SELECT salary, ROUND(salary/3, -2) FROM Instructor;
```

**Q24. Display DOB in different formats.**
```sql
SELECT TO_CHAR(DOB, 'DD-MON-YYYY') FROM Employee;
SELECT TO_CHAR(DOB, 'DD-MON-YY') FROM Employee;
SELECT TO_CHAR(DOB, 'DD-MM-YY') FROM Employee;
```

**Q25. Year of birth in different cases.**
```sql
SELECT EmpName, TO_CHAR(DOB, 'YEAR') FROM Employee;  -- e.g. NINETEEN NINETY-EIGHT
SELECT EmpName, TO_CHAR(DOB, 'Year') FROM Employee;  -- e.g. Nineteen Ninety-Eight
SELECT EmpName, TO_CHAR(DOB, 'year') FROM Employee;  -- e.g. nineteen ninety-eight
```
