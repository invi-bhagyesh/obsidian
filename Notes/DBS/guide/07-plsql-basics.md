# Lab 7: PL/SQL Basics

## Key Concepts

### What is PL/SQL?
Oracle's procedural extension to SQL. Adds variables, loops, conditionals, exceptions — things SQL alone can't do. Sends entire blocks to Oracle engine in one go (reduces network traffic).

### Block Structure
```sql
DECLARE       -- Optional: variables, constants, cursors, exceptions
    ...
BEGIN         -- Mandatory: executable SQL + PL/SQL statements
    ...
EXCEPTION     -- Optional: error handling
    ...
END;
/
```

**Important:** Run `SET SERVEROUTPUT ON;` before executing to see output.

### Data Types & Variables
```sql
-- Basic types
sname     VARCHAR2(30);
age       NUMBER(3);
dob       DATE;
flag      BOOLEAN;

-- %TYPE: mirrors a column's type (auto-updates if column changes)
sname     Student.name%TYPE;

-- %ROWTYPE: mirrors entire row structure
srecord   Student%ROWTYPE;
-- Access fields: srecord.name, srecord.ID, etc.

-- Constants
pi CONSTANT NUMBER := 3.141592654;

-- NOT NULL
counter NUMBER NOT NULL := 0;
```

### Assignment
```sql
x := 10;                               -- direct assignment
SELECT salary INTO v_sal FROM ...;      -- from query
```

### Output
```sql
DBMS_OUTPUT.PUT_LINE('Hello ' || variable_name);
```

---

## Control Structures

### IF-THEN-ELSIF-ELSE
```sql
IF grade = 'A' THEN
    DBMS_OUTPUT.PUT_LINE('Excellent');
ELSIF grade = 'B' THEN
    DBMS_OUTPUT.PUT_LINE('Very Good');
ELSIF grade = 'C' THEN
    DBMS_OUTPUT.PUT_LINE('Good');
ELSE
    DBMS_OUTPUT.PUT_LINE('No such grade');
END IF;
```

### Simple LOOP (with EXIT)
```sql
x := 0;
LOOP
    DBMS_OUTPUT.PUT_LINE('x = ' || TO_CHAR(x));
    x := x + 1;
    IF x > 3 THEN EXIT; END IF;
END LOOP;
-- Output: x = 0, 1, 2, 3
```

### WHILE LOOP
```sql
x := 0;
WHILE x < 4 LOOP
    DBMS_OUTPUT.PUT_LINE('x = ' || TO_CHAR(x));
    x := x + 1;
END LOOP;
```

### FOR LOOP
```sql
FOR i IN 1..5 LOOP
    DBMS_OUTPUT.PUT_LINE(i);
END LOOP;

-- Reverse
FOR i IN REVERSE 1..5 LOOP
    DBMS_OUTPUT.PUT_LINE(i);  -- prints 5, 4, 3, 2, 1
END LOOP;
```

### GOTO
```sql
FOR j IN 2..ROUND(SQRT(n)) LOOP
    IF n MOD j = 0 THEN
        p := ' is not a prime number';
        GOTO print_now;
    END IF;
END LOOP;
p := ' is a prime number';

<<print_now>>
DBMS_OUTPUT.PUT_LINE(TO_CHAR(n) || p);
```

---

## Exception Handling

### Pre-defined Exceptions
| Exception | Raised when... |
|-----------|---------------|
| `NO_DATA_FOUND` | SELECT INTO returns no rows |
| `TOO_MANY_ROWS` | SELECT INTO returns > 1 row |
| `ZERO_DIVIDE` | Division by zero |
| `DUP_VAL_ON_INDEX` | Duplicate value in unique column |
| `VALUE_ERROR` | Arithmetic/conversion/size error |

### Syntax
```sql
BEGIN
    -- statements
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        DBMS_OUTPUT.PUT_LINE('No rows found');
    WHEN TOO_MANY_ROWS THEN
        DBMS_OUTPUT.PUT_LINE('Too many rows');
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('Unknown error');
END;
```

### User-Defined Exception
```sql
DECLARE
    insufficient_balance EXCEPTION;
    temp NUMBER;
BEGIN
    SELECT balance INTO temp FROM account WHERE account_number = &num;
    temp := temp - &amount;
    IF temp >= 500 THEN
        UPDATE account SET balance = temp WHERE account_number = &num;
    ELSE
        RAISE insufficient_balance;
    END IF;
EXCEPTION
    WHEN insufficient_balance THEN
        DBMS_OUTPUT.PUT_LINE('Insufficient Balance');
END;
/
```

---

## Lab Exercises — Solved

**Table:** `StudentTable(RollNo, GPA)` with data `{(1,5.8),(2,6.5),(3,3.4),(4,7.8),(5,9.5)}`

**Q1. Display GPA of a given student.**
```sql
DECLARE
    v_gpa StudentTable.GPA%TYPE;
    v_roll StudentTable.RollNo%TYPE := &roll;
BEGIN
    SELECT GPA INTO v_gpa FROM StudentTable WHERE RollNo = v_roll;
    DBMS_OUTPUT.PUT_LINE('GPA: ' || v_gpa);
END;
/
```

**Q2. Display letter grade for a student.**
```sql
DECLARE
    v_gpa StudentTable.GPA%TYPE;
    v_roll StudentTable.RollNo%TYPE := &roll;
BEGIN
    SELECT GPA INTO v_gpa FROM StudentTable WHERE RollNo = v_roll;
    IF v_gpa >= 9 THEN DBMS_OUTPUT.PUT_LINE('Grade: A+');
    ELSIF v_gpa >= 8 THEN DBMS_OUTPUT.PUT_LINE('Grade: A');
    ELSIF v_gpa >= 7 THEN DBMS_OUTPUT.PUT_LINE('Grade: B');
    ELSIF v_gpa >= 6 THEN DBMS_OUTPUT.PUT_LINE('Grade: C');
    ELSIF v_gpa >= 5 THEN DBMS_OUTPUT.PUT_LINE('Grade: D');
    ELSIF v_gpa >= 4 THEN DBMS_OUTPUT.PUT_LINE('Grade: E');
    ELSE DBMS_OUTPUT.PUT_LINE('Grade: F');
    END IF;
END;
/
```

**Q3. Library fine calculator.**
```sql
DECLARE
    v_issue DATE := TO_DATE('&issue_date', 'DD-MM-YYYY');
    v_return DATE := TO_DATE('&return_date', 'DD-MM-YYYY');
    v_days NUMBER;
    v_fine NUMBER := 0;
BEGIN
    v_days := v_return - v_issue;
    IF v_days <= 7 THEN
        v_fine := 0;
        DBMS_OUTPUT.PUT_LINE('No fine. Days: ' || v_days);
    ELSIF v_days <= 15 THEN
        v_fine := (v_days - 7) * 1;
        DBMS_OUTPUT.PUT_LINE('Fine: Rs.' || v_fine);
    ELSIF v_days <= 30 THEN
        v_fine := (8 * 1) + (v_days - 15) * 2;
        DBMS_OUTPUT.PUT_LINE('Fine: Rs.' || v_fine);
    ELSE
        v_fine := 5;
        DBMS_OUTPUT.PUT_LINE('Fine: Rs.' || v_fine || ' (membership cancelled)');
    END IF;
END;
/
```

**Q4. Print letter grade of ALL students (Simple LOOP).**
```sql
DECLARE
    v_roll NUMBER := 1;
    v_gpa NUMBER;
    v_grade VARCHAR2(2);
BEGIN
    LOOP
        SELECT GPA INTO v_gpa FROM StudentTable WHERE RollNo = v_roll;
        IF v_gpa >= 9 THEN v_grade := 'A+';
        ELSIF v_gpa >= 8 THEN v_grade := 'A';
        ELSIF v_gpa >= 7 THEN v_grade := 'B';
        ELSIF v_gpa >= 6 THEN v_grade := 'C';
        ELSIF v_gpa >= 5 THEN v_grade := 'D';
        ELSIF v_gpa >= 4 THEN v_grade := 'E';
        ELSE v_grade := 'F';
        END IF;
        DBMS_OUTPUT.PUT_LINE('Roll: ' || v_roll || ' Grade: ' || v_grade);
        v_roll := v_roll + 1;
        EXIT WHEN v_roll > 5;
    END LOOP;
END;
/
```

**Q5. Update LetterGrade column using WHILE.**
```sql
-- First: ALTER TABLE StudentTable ADD (LetterGrade VARCHAR2(2));
DECLARE
    v_roll NUMBER := 1;
    v_gpa NUMBER;
    v_grade VARCHAR2(2);
BEGIN
    WHILE v_roll <= 5 LOOP
        SELECT GPA INTO v_gpa FROM StudentTable WHERE RollNo = v_roll;
        IF v_gpa >= 9 THEN v_grade := 'A+';
        ELSIF v_gpa >= 8 THEN v_grade := 'A';
        ELSIF v_gpa >= 7 THEN v_grade := 'B';
        ELSIF v_gpa >= 6 THEN v_grade := 'C';
        ELSIF v_gpa >= 5 THEN v_grade := 'D';
        ELSIF v_gpa >= 4 THEN v_grade := 'E';
        ELSE v_grade := 'F';
        END IF;
        UPDATE StudentTable SET LetterGrade = v_grade WHERE RollNo = v_roll;
        v_roll := v_roll + 1;
    END LOOP;
    COMMIT;
END;
/
```

**Q6. Find max GPA without aggregate (FOR loop).**
```sql
DECLARE
    v_gpa NUMBER;
    v_max NUMBER := 0;
    v_roll NUMBER;
BEGIN
    FOR i IN 1..5 LOOP
        SELECT GPA INTO v_gpa FROM StudentTable WHERE RollNo = i;
        IF v_gpa > v_max THEN
            v_max := v_gpa;
            v_roll := i;
        END IF;
    END LOOP;
    DBMS_OUTPUT.PUT_LINE('Max GPA: ' || v_max || ' (Roll: ' || v_roll || ')');
END;
/
```

**Q7. Lab exercise 4 using GOTO.**
```sql
DECLARE
    v_roll NUMBER := 1;
    v_gpa NUMBER;
    v_grade VARCHAR2(2);
BEGIN
    <<start_loop>>
    SELECT GPA INTO v_gpa FROM StudentTable WHERE RollNo = v_roll;
    IF v_gpa >= 9 THEN v_grade := 'A+';
    ELSIF v_gpa >= 8 THEN v_grade := 'A';
    ELSIF v_gpa >= 7 THEN v_grade := 'B';
    ELSIF v_gpa >= 6 THEN v_grade := 'C';
    ELSIF v_gpa >= 5 THEN v_grade := 'D';
    ELSIF v_gpa >= 4 THEN v_grade := 'E';
    ELSE v_grade := 'F';
    END IF;
    DBMS_OUTPUT.PUT_LINE('Roll: ' || v_roll || ' Grade: ' || v_grade);
    v_roll := v_roll + 1;
    IF v_roll <= 5 THEN
        GOTO start_loop;
    END IF;
END;
/
```

**Q8. Instructor lookup with exceptions.**
```sql
DECLARE
    v_name Instructor.name%TYPE := '&instructor_name';
    v_id Instructor.ID%TYPE;
    v_dept Instructor.dept_name%TYPE;
    v_salary Instructor.salary%TYPE;
BEGIN
    SELECT ID, dept_name, salary INTO v_id, v_dept, v_salary
    FROM Instructor WHERE name = v_name;
    DBMS_OUTPUT.PUT_LINE('ID: ' || v_id);
    DBMS_OUTPUT.PUT_LINE('Dept: ' || v_dept);
    DBMS_OUTPUT.PUT_LINE('Salary: ' || v_salary);
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        DBMS_OUTPUT.PUT_LINE('No instructor found with name: ' || v_name);
    WHEN TOO_MANY_ROWS THEN
        DBMS_OUTPUT.PUT_LINE('Multiple instructors found with name: ' || v_name);
END;
/
```
