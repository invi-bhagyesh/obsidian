# Lab 10: Triggers

## Key Concepts

A **trigger** is a named PL/SQL block stored in the DB that fires automatically in response to DML events (INSERT, UPDATE, DELETE).

### Trigger Types
| Type                         | Fires...                         |
| ---------------------------- | -------------------------------- |
| **BEFORE** row trigger       | Before each row is affected      |
| **AFTER** row trigger        | After each row is affected       |
| **BEFORE** statement trigger | Once before the entire statement |
| **AFTER** statement trigger  | Once after the entire statement  |
| **INSTEAD OF** trigger       | Replaces the DML on a view       |

### :OLD and :NEW
| Reference     | Available on... | Contains...               |
| ------------- | --------------- | ------------------------- |
| `:NEW.column` | INSERT, UPDATE  | New values being written  |
| `:OLD.column` | DELETE, UPDATE  | Old values being replaced |

**Note:** `:NEW` is modifiable in BEFORE triggers (you can change values before they hit the table).

### Triggers vs Constraints
- Triggers apply to **new data only**; constraints hold for **all data**
- Constraints are simpler and less error-prone
- Triggers can enforce **complex business rules** constraints can't

---

## Syntax

### Row Trigger
```sql
CREATE OR REPLACE TRIGGER trigger_name
BEFORE | AFTER  INSERT OR UPDATE OR DELETE
ON table_name
FOR EACH ROW
BEGIN
    CASE
        WHEN INSERTING THEN
            -- actions on insert
        WHEN UPDATING THEN
            -- actions on update
        WHEN DELETING THEN
            -- actions on delete
    END CASE;
END;
/
```

### Simple BEFORE DELETE Trigger
```sql
CREATE OR REPLACE TRIGGER emp_trigger
BEFORE DELETE ON employee
FOR EACH ROW
BEGIN
    INSERT INTO emp_delete VALUES (:OLD.emp_id, :OLD.emp_name, :OLD.emp_sal);
END;
/

-- When you run: DELETE FROM employee WHERE emp_id = 1101;
-- The old row is saved in emp_delete before deletion
```

### INSTEAD OF Trigger (for views)
```sql
CREATE OR REPLACE TRIGGER trigger_name
INSTEAD OF DELETE ON view_name
FOR EACH ROW
BEGIN
    -- Custom delete logic for underlying tables
    DELETE FROM table_a WHERE id = :OLD.a_id;
    DELETE FROM table_b WHERE id = :OLD.b_id;
END;
/
```

---

## Lab Exercises — Solved

**Q1. Log all changes to Takes table with timestamp.**
```sql
-- First create: log_change_Takes(Time_Of_Change TIMESTAMP, ID, course_id, sec_id, semester, year, grade)

CREATE OR REPLACE TRIGGER takes_log
AFTER INSERT OR UPDATE OR DELETE ON Takes
FOR EACH ROW
BEGIN
    CASE
        WHEN INSERTING THEN
            INSERT INTO log_change_Takes VALUES (
                SYSTIMESTAMP, :NEW.ID, :NEW.course_id, :NEW.sec_id,
                :NEW.semester, :NEW.year, :NEW.grade);
        WHEN UPDATING THEN
            INSERT INTO log_change_Takes VALUES (
                SYSTIMESTAMP, :NEW.ID, :NEW.course_id, :NEW.sec_id,
                :NEW.semester, :NEW.year, :NEW.grade);
        WHEN DELETING THEN
            INSERT INTO log_change_Takes VALUES (
                SYSTIMESTAMP, :OLD.ID, :OLD.course_id, :OLD.sec_id,
                :OLD.semester, :OLD.year, :OLD.grade);
    END CASE;
END;
/
```

**Q2. Archive old instructor data on salary update.**
```sql
-- First create: Old_Data_Instructor(ID, name, dept_name, salary)

CREATE OR REPLACE TRIGGER instructor_archive
BEFORE UPDATE OF salary ON Instructor
FOR EACH ROW
BEGIN
    INSERT INTO Old_Data_Instructor VALUES (
        :OLD.ID, :OLD.name, :OLD.dept_name, :OLD.salary);
END;
/
```

**Q3. Validate instructor data before insert/update.**
```sql
CREATE OR REPLACE TRIGGER instructor_validate
BEFORE INSERT OR UPDATE ON Instructor
FOR EACH ROW
DECLARE
    v_budget Department.budget%TYPE;
BEGIN
    -- Check name is alphabets only
    IF NOT REGEXP_LIKE(:NEW.name, '^[A-Za-z ]+$') THEN
        RAISE_APPLICATION_ERROR(-20001, 'Name must contain only alphabets');
    END IF;

    -- Check salary is positive and not zero
    IF :NEW.salary IS NULL OR :NEW.salary <= 0 THEN
        RAISE_APPLICATION_ERROR(-20002, 'Salary must be positive and non-zero');
    END IF;

    -- Check salary does not exceed department budget
    SELECT budget INTO v_budget FROM Department WHERE dept_name = :NEW.dept_name;
    IF :NEW.salary > v_budget THEN
        RAISE_APPLICATION_ERROR(-20003, 'Salary exceeds department budget');
    END IF;
END;
/
```

**Q4. Audit system for Client_master.**
```sql
-- Schema: Client_master(client_no, name, address, Bal_due)
-- Schema: auditclient(client_no, name, bal_due, operation, userid, opdate)

CREATE OR REPLACE TRIGGER client_audit
BEFORE UPDATE OR DELETE ON Client_master
FOR EACH ROW
BEGIN
    CASE
        WHEN UPDATING THEN
            INSERT INTO auditclient VALUES (
                :OLD.client_no, :OLD.name, :OLD.Bal_due,
                'UPDATE', USER, SYSDATE);
        WHEN DELETING THEN
            INSERT INTO auditclient VALUES (
                :OLD.client_no, :OLD.name, :OLD.Bal_due,
                'DELETE', USER, SYSDATE);
    END CASE;
END;
/
```

**Q5. INSTEAD OF trigger on Advisor_Student view.**
```sql
-- Create the view
CREATE OR REPLACE VIEW Advisor_Student AS
SELECT S.ID AS student_id, S.name AS student_name, S.dept_name AS student_dept,
       I.ID AS instructor_id, I.name AS instructor_name
FROM Advisor A
JOIN Student S ON A.s_id = S.ID
JOIN Instructor I ON A.i_id = I.ID;

-- INSTEAD OF trigger: delete from Advisor when deleting from view
CREATE OR REPLACE TRIGGER advisor_student_delete
INSTEAD OF DELETE ON Advisor_Student
FOR EACH ROW
BEGIN
    DELETE FROM Advisor WHERE s_id = :OLD.student_id AND i_id = :OLD.instructor_id;
END;
/

-- Usage: DELETE FROM Advisor_Student WHERE student_id = 12345;
-- This actually deletes the row from the Advisor table
```
