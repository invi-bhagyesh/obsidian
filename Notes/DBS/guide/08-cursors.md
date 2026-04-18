# Lab 8: Cursors

## Key Concepts

A **cursor** is a temporary work area in memory for processing SQL query results row-by-row.

### Implicit vs Explicit Cursors

| Feature | Implicit | Explicit |
|---------|----------|----------|
| Created by | Oracle automatically | User manually |
| Used for | INSERT, UPDATE, DELETE, single-row SELECT INTO | Multi-row SELECT results |
| Name | `SQL` | User-defined name |
| Management | Auto open/fetch/close | Must open/fetch/close manually |

### Implicit Cursor Attributes
| Attribute      | Returns                            |
| -------------- | ---------------------------------- |
| `SQL%FOUND`    | TRUE if last DML affected >= 1 row |
| `SQL%NOTFOUND` | TRUE if last DML affected 0 rows   |
| `SQL%ROWCOUNT` | Number of rows affected            |
| `SQL%ISOPEN`   | Always FALSE (Oracle auto-closes)  |

### Explicit Cursor — Steps
```sql
-- 1. DECLARE
CURSOR cursor_name IS SELECT ...;

-- 2. OPEN
OPEN cursor_name;

-- 3. FETCH (in a loop)
LOOP
    FETCH cursor_name INTO variable_list;
    EXIT WHEN cursor_name%NOTFOUND;
    -- process row
END LOOP;

-- 4. CLOSE
CLOSE cursor_name;
```

### Cursor FOR LOOP (simplifies open/fetch/close)
```sql
CURSOR C1 IS SELECT * FROM Department;
...
FOR dept IN C1 LOOP
    -- dept is auto-declared as %ROWTYPE record
    DBMS_OUTPUT.PUT_LINE(dept.dept_name);
END LOOP;
-- No need to OPEN, FETCH, or CLOSE
```

### WHERE CURRENT OF (update/delete current row)
```sql
CURSOR C1 IS SELECT * FROM Department FOR UPDATE;  -- must use FOR UPDATE
...
FOR dept IN C1 LOOP
    UPDATE Department SET budget = budget * 1.1 WHERE CURRENT OF C1;
END LOOP;
```

### Parameterized Cursors
```sql
CURSOR c(dname Instructor.dept_name%TYPE) IS
    SELECT * FROM Instructor WHERE dept_name = dname;
...
FOR tmp IN c('Comp. Sci.') LOOP
    DBMS_OUTPUT.PUT_LINE(tmp.name);
END LOOP;
```

### Transactions
| Command | Effect |
|---------|--------|
| `COMMIT` | Makes changes permanent |
| `ROLLBACK` | Undoes all changes since last COMMIT |
| `SAVEPOINT name` | Creates a rollback point |
| `ROLLBACK TO SAVEPOINT name` | Undoes to that point only |

---

## Lab Exercises — Solved

**(University Database)**

**Q1. 5% salary raise for instructors in a department; log each raise.**

```sql
-- First create: salary_raise(Instructor_Id, Raise_date, Raise_amt)
DECLARE
    v_dept Instructor.dept_name%TYPE := '&dept';
    v_raise NUMBER;
    CURSOR C1 IS SELECT * FROM Instructor WHERE dept_name = v_dept FOR UPDATE;
BEGIN
    FOR inst IN C1 LOOP
        v_raise := inst.salary * 0.05;
        UPDATE Instructor SET salary = salary + v_raise WHERE CURRENT OF C1;
        INSERT INTO salary_raise VALUES (inst.ID, SYSDATE, v_raise);
    END LOOP;
    IF SQL%FOUND THEN
        DBMS_OUTPUT.PUT_LINE('Salary updated for ' || v_dept);
    ELSE
        DBMS_OUTPUT.PUT_LINE('No instructors in ' || v_dept);
    END IF;
    COMMIT;
END;
/
```

**Q2. First 10 students with lowest total credit.**
```sql
DECLARE
    CURSOR C1 IS SELECT ID, name, dept_name, tot_cred
        FROM Student ORDER BY tot_cred ASC;
    v_rec C1%ROWTYPE;
BEGIN
    OPEN C1;
    LOOP
        FETCH C1 INTO v_rec;
        EXIT WHEN C1%NOTFOUND OR C1%ROWCOUNT > 10;
        DBMS_OUTPUT.PUT_LINE(v_rec.ID || ' ' || v_rec.name || ' ' ||
            v_rec.dept_name || ' ' || v_rec.tot_cred);
    END LOOP;
    CLOSE C1;
END;
/
```

**Q3. Course details with total students (Cursor FOR Loop).**
```sql
DECLARE
    CURSOR C1 IS
        SELECT S.course_id, C.title, C.dept_name, C.credits,
               I.name AS instructor_name,
               Sec.building, Sec.room_number, Sec.time_slot_id,
               COUNT(T.ID) AS tot_students
        FROM Section Sec
        JOIN Course C ON Sec.course_id = C.course_id
        LEFT JOIN Teaches Te ON Sec.course_id = Te.course_id
            AND Sec.section_id = Te.section_id
            AND Sec.semester = Te.semester AND Sec.year = Te.year
        LEFT JOIN Instructor I ON Te.ID = I.ID
        LEFT JOIN Takes T ON Sec.course_id = T.course_id
            AND Sec.section_id = T.sec_id
            AND Sec.semester = T.semester AND Sec.year = T.year
        GROUP BY S.course_id, C.title, C.dept_name, C.credits,
                 I.name, Sec.building, Sec.room_number, Sec.time_slot_id;
BEGIN
    FOR rec IN C1 LOOP
        DBMS_OUTPUT.PUT_LINE(rec.course_id || ' | ' || rec.title || ' | ' ||
            rec.dept_name || ' | Credits: ' || rec.credits || ' | ' ||
            rec.instructor_name || ' | ' || rec.building || '-' ||
            rec.room_number || ' | Slot: ' || rec.time_slot_id ||
            ' | Students: ' || rec.tot_students);
    END LOOP;
END;
/
```

**Q4. Deregister CS101 students with tot_cred < 30.**
```sql
DECLARE
    CURSOR C1 IS SELECT T.ID, S.tot_cred
        FROM Takes T JOIN Student S ON T.ID = S.ID
        WHERE T.course_id = 'CS-101';
BEGIN
    FOR rec IN C1 LOOP
        IF rec.tot_cred < 30 THEN
            DELETE FROM Takes WHERE ID = rec.ID AND course_id = 'CS-101';
            DBMS_OUTPUT.PUT_LINE('Deregistered student: ' || rec.ID);
        END IF;
    END LOOP;
    COMMIT;
END;
/
```

**Q5. Update LetterGrade using WHERE CURRENT OF.**
```sql
-- First: UPDATE StudentTable SET LetterGrade = 'F';
DECLARE
    CURSOR C1 IS SELECT * FROM StudentTable FOR UPDATE;
    v_grade VARCHAR2(2);
BEGIN
    FOR rec IN C1 LOOP
        IF rec.GPA >= 9 THEN v_grade := 'A+';
        ELSIF rec.GPA >= 8 THEN v_grade := 'A';
        ELSIF rec.GPA >= 7 THEN v_grade := 'B';
        ELSIF rec.GPA >= 6 THEN v_grade := 'C';
        ELSIF rec.GPA >= 5 THEN v_grade := 'D';
        ELSIF rec.GPA >= 4 THEN v_grade := 'E';
        ELSE v_grade := 'F';
        END IF;
        UPDATE StudentTable SET LetterGrade = v_grade WHERE CURRENT OF C1;
    END LOOP;
    COMMIT;
END;
/
```

**Q6. Instructors teaching a specified course (Parameterized Cursor).**
```sql
DECLARE
    CURSOR c(cid Course.course_id%TYPE) IS
        SELECT I.name, I.dept_name
        FROM Instructor I JOIN Teaches T ON I.ID = T.ID
        WHERE T.course_id = cid;
BEGIN
    DBMS_OUTPUT.PUT_LINE('Instructors for CS-101:');
    FOR rec IN c('CS-101') LOOP
        DBMS_OUTPUT.PUT_LINE(rec.name || ' (' || rec.dept_name || ')');
    END LOOP;
END;
/
```

**Q7. Students registered for a course taught by their advisor.**
```sql
DECLARE
    CURSOR c IS
        SELECT S.name AS student_name, I.name AS advisor_name, T.course_id
        FROM Student S
        JOIN Advisor A ON S.ID = A.s_id
        JOIN Instructor I ON A.i_id = I.ID
        JOIN Takes T ON S.ID = T.ID
        JOIN Teaches Te ON I.ID = Te.ID AND T.course_id = Te.course_id;
BEGIN
    FOR rec IN c LOOP
        DBMS_OUTPUT.PUT_LINE(rec.student_name || ' takes ' || rec.course_id ||
            ' taught by advisor ' || rec.advisor_name);
    END LOOP;
END;
/
```
