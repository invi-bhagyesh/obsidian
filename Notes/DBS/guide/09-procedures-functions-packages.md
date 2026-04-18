# Lab 9: Procedures, Functions & Packages

## Key Concepts

### Procedures vs Functions
| Feature | Procedure | Function |
|---------|-----------|----------|
| Purpose | Perform an action | Compute & return a value |
| RETURN clause | No (uses OUT params) | Yes, mandatory |
| Called from SQL? | No | Yes (in SELECT, WHERE, etc.) |
| Return statement | Optional (returns control) | Mandatory (returns value) |

### Parameter Modes
| Mode | Description | Default value? | Can assign? |
|------|-------------|---------------|-------------|
| `IN` | Input only (default) | Yes | No |
| `OUT` | Output only | No | Yes |
| `IN OUT` | Input + Output | No | Yes |

**Rule:** Don't use OUT/IN OUT for function params — use procedures instead.

---

## Procedures

### Syntax
```sql
CREATE OR REPLACE PROCEDURE procedure_name (param1 IN datatype, param2 OUT datatype)
IS
    -- declarations
BEGIN
    -- statements
END;
/
```

### Calling a Procedure
```sql
-- From another PL/SQL block:
BEGIN
    procedure_name(value1, variable2);
END;
/

-- Or directly:
EXECUTE procedure_name(value1, variable2);
```

### Example: Hello World
```sql
CREATE OR REPLACE PROCEDURE print_hello IS
BEGIN
    DBMS_OUTPUT.PUT_LINE('Hello World');
END;
/

-- Call:
BEGIN
    print_hello;
END;
/
```

### Example: Count instructors in a department (OUT param)
```sql
CREATE OR REPLACE PROCEDURE dept_count_proc (
    p_dept_name IN VARCHAR2,
    d_count     OUT INTEGER
) IS
BEGIN
    SELECT COUNT(*) INTO d_count
    FROM Instructor
    WHERE dept_name = p_dept_name;
END;
/

-- Call:
DECLARE
    v_count INTEGER;
BEGIN
    dept_count_proc('Physics', v_count);
    DBMS_OUTPUT.PUT_LINE('Count: ' || v_count);
END;
/
```

---

## Functions

### Syntax
```sql
CREATE OR REPLACE FUNCTION function_name (param1 datatype)
RETURN datatype
AS
    -- declarations
BEGIN
    -- statements
    RETURN value;
END;
/
```

### Example: Sum of two numbers
```sql
CREATE OR REPLACE FUNCTION sum_number (a NUMBER, b NUMBER)
RETURN NUMBER AS
    tot NUMBER;
BEGIN
    tot := a + b;
    RETURN tot;
END;
/

-- Call:
BEGIN
    DBMS_OUTPUT.PUT_LINE(sum_number(5, 4));  -- Output: 9
END;
/
```

### Example: Instructor count by department (usable in SQL)
```sql
CREATE OR REPLACE FUNCTION dept_count (p_dept VARCHAR2)
RETURN INTEGER AS
    d_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO d_count
    FROM Instructor WHERE dept_name = p_dept;
    RETURN d_count;
END;
/

-- Use in SQL query:
SELECT dept_name, budget
FROM Department
WHERE dept_count(dept_name) > 12;
```

---

## Packages

A **package** groups related procedures, functions, variables, cursors, and exceptions.

### Two components:
1. **Specification** — declares public items (interface)
2. **Body** — defines implementation

### Syntax
```sql
-- Package Specification
CREATE OR REPLACE PACKAGE package_name AS
    PROCEDURE proc1(param1 datatype);
    FUNCTION func1(param1 datatype) RETURN datatype;
END package_name;
/

-- Package Body
CREATE OR REPLACE PACKAGE BODY package_name AS
    PROCEDURE proc1(param1 datatype) IS
    BEGIN
        -- implementation
    END;

    FUNCTION func1(param1 datatype) RETURN datatype IS
    BEGIN
        -- implementation
        RETURN value;
    END;
END package_name;
/
```

### Calling package members
```sql
EXECUTE package_name.proc1('value');
-- or
SELECT package_name.func1('value') FROM dual;
```

### Package Benefits
- **Modularity** — group related logic
- **Information hiding** — body details are private
- **Performance** — entire package loaded on first call, subsequent calls are in-memory
- **Easier grants** — grant on package, not individual objects

---

## Lab Exercises — Solved

**Q1. Procedure to display a message.**
```sql
CREATE OR REPLACE PROCEDURE greet IS
BEGIN
    DBMS_OUTPUT.PUT_LINE('Good Day to You');
END;
/

BEGIN greet; END;
/
```

**Q2. List instructors and courses for a department.**
```sql
CREATE OR REPLACE PROCEDURE dept_info (p_dept IN VARCHAR2) IS
    CURSOR c_inst IS SELECT name FROM Instructor WHERE dept_name = p_dept;
    CURSOR c_course IS SELECT title FROM Course WHERE dept_name = p_dept;
BEGIN
    DBMS_OUTPUT.PUT_LINE('--- Instructors in ' || p_dept || ' ---');
    FOR rec IN c_inst LOOP
        DBMS_OUTPUT.PUT_LINE(rec.name);
    END LOOP;
    DBMS_OUTPUT.PUT_LINE('--- Courses in ' || p_dept || ' ---');
    FOR rec IN c_course LOOP
        DBMS_OUTPUT.PUT_LINE(rec.title);
    END LOOP;
END;
/

BEGIN dept_info('Comp. Sci.'); END;
/
```

**Q3. Most popular course per department (using a procedure).**
```sql
CREATE OR REPLACE PROCEDURE course_popular (p_dept IN VARCHAR2) IS
    v_course Course.title%TYPE;
    v_cid Course.course_id%TYPE;
    v_max NUMBER := 0;
    CURSOR c IS
        SELECT C.course_id, C.title, COUNT(T.ID) AS cnt
        FROM Course C LEFT JOIN Takes T ON C.course_id = T.course_id
        WHERE C.dept_name = p_dept
        GROUP BY C.course_id, C.title;
BEGIN
    FOR rec IN c LOOP
        IF rec.cnt > v_max THEN
            v_max := rec.cnt;
            v_course := rec.title;
            v_cid := rec.course_id;
        END IF;
    END LOOP;
    DBMS_OUTPUT.PUT_LINE(p_dept || ': ' || v_course || ' (' || v_cid || ') - ' || v_max || ' students');
END;
/

-- Call for all departments:
DECLARE
    CURSOR c_dept IS SELECT DISTINCT dept_name FROM Course;
BEGIN
    FOR d IN c_dept LOOP
        course_popular(d.dept_name);
    END LOOP;
END;
/
```

**Q4. List students and courses for a department.**
```sql
CREATE OR REPLACE PROCEDURE dept_students (p_dept IN VARCHAR2) IS
    CURSOR c_stu IS SELECT name FROM Student WHERE dept_name = p_dept;
    CURSOR c_course IS SELECT title FROM Course WHERE dept_name = p_dept;
BEGIN
    DBMS_OUTPUT.PUT_LINE('--- Students in ' || p_dept || ' ---');
    FOR rec IN c_stu LOOP
        DBMS_OUTPUT.PUT_LINE(rec.name);
    END LOOP;
    DBMS_OUTPUT.PUT_LINE('--- Courses in ' || p_dept || ' ---');
    FOR rec IN c_course LOOP
        DBMS_OUTPUT.PUT_LINE(rec.title);
    END LOOP;
END;
/

BEGIN dept_students('Comp. Sci.'); END;
/
```

**Q5. Function: square of a number.**
```sql
CREATE OR REPLACE FUNCTION square_num (n NUMBER) RETURN NUMBER AS
BEGIN
    RETURN n * n;
END;
/

BEGIN
    DBMS_OUTPUT.PUT_LINE('Square of 7: ' || square_num(7));  -- 49
END;
/
```

**Q6. Highest paid instructor per department (using function).**
```sql
CREATE OR REPLACE FUNCTION department_highest (p_dept VARCHAR2) RETURN VARCHAR2 AS
    v_name Instructor.name%TYPE;
BEGIN
    SELECT name INTO v_name FROM Instructor
    WHERE dept_name = p_dept AND salary = (
        SELECT MAX(salary) FROM Instructor WHERE dept_name = p_dept
    ) AND ROWNUM = 1;
    RETURN v_name;
END;
/

DECLARE
    CURSOR c IS SELECT DISTINCT dept_name FROM Instructor;
BEGIN
    FOR d IN c LOOP
        DBMS_OUTPUT.PUT_LINE(d.dept_name || ': ' || department_highest(d.dept_name));
    END LOOP;
END;
/
```

**Q7. Package: instructor names + max salary for a department.**
```sql
-- Specification
CREATE OR REPLACE PACKAGE dept_pkg AS
    PROCEDURE list_instructors (p_dept VARCHAR2);
    FUNCTION max_salary (p_dept VARCHAR2) RETURN NUMBER;
END dept_pkg;
/

-- Body
CREATE OR REPLACE PACKAGE BODY dept_pkg AS
    PROCEDURE list_instructors (p_dept VARCHAR2) IS
        CURSOR c IS SELECT name FROM Instructor WHERE dept_name = p_dept;
    BEGIN
        DBMS_OUTPUT.PUT_LINE('Instructors in ' || p_dept || ':');
        FOR rec IN c LOOP
            DBMS_OUTPUT.PUT_LINE('  ' || rec.name);
        END LOOP;
    END;

    FUNCTION max_salary (p_dept VARCHAR2) RETURN NUMBER IS
        v_sal NUMBER;
    BEGIN
        SELECT MAX(salary) INTO v_sal FROM Instructor WHERE dept_name = p_dept;
        RETURN v_sal;
    END;
END dept_pkg;
/

-- Usage
BEGIN
    dept_pkg.list_instructors('Comp. Sci.');
    DBMS_OUTPUT.PUT_LINE('Max salary: ' || dept_pkg.max_salary('Comp. Sci.'));
END;
/
```

**Q8. Procedure with IN, OUT, IN OUT: simple & compound interest.**
```sql
CREATE OR REPLACE PROCEDURE calc_interest (
    p_principal IN NUMBER,
    p_rate      IN NUMBER,
    p_years     IN NUMBER,
    p_si        OUT NUMBER,
    p_ci        OUT NUMBER,
    p_total     IN OUT NUMBER   -- initially principal, returns principal + CI
) IS
BEGIN
    p_si := (p_principal * p_rate * p_years) / 100;
    p_ci := p_principal * POWER((1 + p_rate/100), p_years) - p_principal;
    p_total := p_total + p_ci;  -- sum of principal + compound interest
END;
/

DECLARE
    v_si NUMBER;
    v_ci NUMBER;
    v_total NUMBER := 10000;  -- principal
BEGIN
    calc_interest(10000, 8, 3, v_si, v_ci, v_total);
    DBMS_OUTPUT.PUT_LINE('Simple Interest: ' || ROUND(v_si, 2));
    DBMS_OUTPUT.PUT_LINE('Compound Interest: ' || ROUND(v_ci, 2));
    DBMS_OUTPUT.PUT_LINE('Total (P + CI): ' || ROUND(v_total, 2));
END;
/
```
