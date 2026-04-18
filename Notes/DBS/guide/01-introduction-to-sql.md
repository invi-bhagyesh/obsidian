# Lab 1: Introduction to SQL

## Key Concepts

**SQL Statement Categories:**
| Category | Purpose | Commands |
|----------|---------|----------|
| DDL (Data Definition Language) | Define/modify schema | CREATE, ALTER, DROP, RENAME, TRUNCATE |
| DML (Data Manipulation Language) | Manipulate data | SELECT, INSERT, UPDATE, DELETE |
| DCL (Data Control Language) | Control access | GRANT, REVOKE |
| TCL (Transaction Control Language) | Manage transactions | COMMIT, ROLLBACK, SAVEPOINT |

**Common Data Types:**
| Type | Description |
|------|-------------|
| `CHAR(n)` / `VARCHAR(n)` | Fixed / variable-length string |
| `NUMBER(p,s)` | Numeric with precision p, scale s |
| `INTEGER` / `INT` | Whole number |
| `DATE` | Date value |
| `BOOLEAN` | TRUE/FALSE |
| `CLOB` / `BLOB` | Large character/binary object |

---

## DDL Commands — Syntax & Solved Examples

### 1. CREATE TABLE
```sql
CREATE TABLE STUDENT (
    reg_no    NUMBER(5),
    stu_name  VARCHAR(20),
    stu_age   NUMBER(5),
    stu_dob   DATE,
    subject1_marks NUMBER(4,2),
    subject2_marks NUMBER(4,2),
    subject3_marks NUMBER(4,1)
);
```

### 2. INSERT INTO
```sql
INSERT INTO STUDENT VALUES (101, 'AAA', 16, '03-JUL-88', 80, 90, 98);

-- Partial insert (specific columns):
INSERT INTO STUDENT(reg_no, stu_name) VALUES (102, 'KRISH');
```

### 3. ALTER TABLE — Add Column
```sql
ALTER TABLE STUDENT ADD (Gender CHAR(5));
```

### 4. ALTER TABLE — Drop Column
```sql
ALTER TABLE STUDENT DROP COLUMN Gender;
```

### 5. ALTER TABLE — Modify Column
```sql
ALTER TABLE STUDENT MODIFY (stu_age NUMBER(3));
```

### 6. RENAME TABLE
```sql
RENAME STUDENT TO STUDENTS;
```

### 7. TRUNCATE TABLE (removes all rows, keeps structure)
```sql
TRUNCATE TABLE STUDENTS;
```

### 8. DROP TABLE (removes table entirely)
```sql
DROP TABLE STUDENT;
```

---

## DML Commands — Syntax & Solved Examples

### SELECT
```sql
-- All columns
SELECT * FROM STUDENT;

-- Column alias
SELECT stu_age AS student_age FROM STUDENT;

-- Computed column
SELECT subject1_marks + subject2_marks + subject3_marks AS tot_marks FROM STUDENT;
```

### UPDATE
```sql
-- Update all rows
UPDATE STUDENT SET stu_name = 'MANAV';

-- Update specific row
UPDATE STUDENT SET stu_name = 'YADAV' WHERE reg_no = 101;
```

### DELETE
```sql
-- Delete specific rows
DELETE FROM STUDENT WHERE reg_no = 102;

-- Delete all rows
DELETE FROM STUDENT;
```

---

## Lab Exercises — Solved

**Schema:** `EMPLOYEE(emp_no, emp_name, emp_address)`

**Q1. Create the employee table.**
```sql
CREATE TABLE EMPLOYEE (
    emp_no      NUMBER(5) PRIMARY KEY,
    emp_name    VARCHAR(20),
    emp_address VARCHAR(30)
);
```

**Q2. Insert five employees.**
```sql
INSERT INTO EMPLOYEE VALUES (1, 'Ravi', 'MANIPAL');
INSERT INTO EMPLOYEE VALUES (2, 'Sneha', 'MANGALORE');
INSERT INTO EMPLOYEE VALUES (3, 'Aman', 'MANIPAL');
INSERT INTO EMPLOYEE VALUES (4, 'Priya', 'BANGALORE');
INSERT INTO EMPLOYEE VALUES (5, 'Karan', 'MANGALORE');
```

**Q3. Display names of all employees.**
```sql
SELECT emp_name FROM EMPLOYEE;
```

**Q4. Display all employees from 'MANIPAL'.**
```sql
SELECT * FROM EMPLOYEE WHERE emp_address = 'MANIPAL';
```

**Q5. Add a column salary.**
```sql
ALTER TABLE EMPLOYEE ADD (salary NUMBER(10));
```

**Q6. Assign salary for all employees.**
```sql
UPDATE EMPLOYEE SET salary = 50000 WHERE emp_no = 1;
UPDATE EMPLOYEE SET salary = 45000 WHERE emp_no = 2;
UPDATE EMPLOYEE SET salary = 55000 WHERE emp_no = 3;
UPDATE EMPLOYEE SET salary = 60000 WHERE emp_no = 4;
UPDATE EMPLOYEE SET salary = 40000 WHERE emp_no = 5;
```

**Q7. View the structure of the table.**
```sql
DESCRIBE EMPLOYEE;
```

**Q8. Delete all employees from 'MANGALORE'.**
```sql
DELETE FROM EMPLOYEE WHERE emp_address = 'MANGALORE';
```

**Q9. Rename employee to employee1.**
```sql
RENAME EMPLOYEE TO EMPLOYEE1;
```

**Q10. Drop the table.**
```sql
DROP TABLE EMPLOYEE1;
```
