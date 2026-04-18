# Lab 5: ER Model and SQL

## Key Concepts

### ER-to-Relational Mapping Rules

| ER Construct                      | Relational Mapping                                       |
| --------------------------------- | -------------------------------------------------------- |
| **Entity** with simple attributes | One table, attributes become columns                     |
| **Multi-valued attribute**        | Separate table with FK to parent entity                  |
| **1:1 Relationship**              | FK in either table (preferring total participation side) |
| **1:N Relationship**              | FK in the "many" side table                              |
| **N:N Relationship**              | New junction/bridge table with FKs to both entities      |

### Examples

**Entities & Simple Attributes:**
```
Persons(personid, name, lastname, email)
```

**Multi-Valued Attribute (phone numbers):**
```
Persons(personid, name, lastname, email)
Phones(phoneid, personid, phone)   -- FK personid -> Persons
```

**1:1 Relationship (person-wife):**
```
Persons(personid, name, lastname, email, wifeid)  -- FK wifeid -> Wife
Wife(wifeid, name)
-- OR --
Persons(personid, name, lastname, email)
Wife(wifeid, name, personid)  -- FK personid -> Persons
```

**1:N Relationship (person owns houses):**
```
Persons(personid, name, lastname, email)
House(houseid, num, address, personid)  -- FK personid -> Persons
```

**N:N Relationship (persons visited countries):**
```
Persons(personid, name, lastname, email)
Countries(countryid, name, code)
HasRelat(hasrelatid, personid, countryid)  -- FKs to both
```

---

## Lab Exercises — Solved

**Schema (Company ER):**
- `Employee(Fname, Minit, Lname, SSN, Bdate, Address, Sex, Salary, Super_SSN, Dno)`
- `Department(Dname, Dnumber, Mgr_SSN, Mgr_start_date)`
- `Dept_Locations(Dnumber, Dlocation)`
- `Project(Pname, Pnumber, Plocation, Dnum)`
- `Works_On(ESSN, Pno, Hours)`
- `Dependent(ESSN, Dependent_name, Sex, Bdate, Relationship)`

---

**Q1. Birth date and address of 'John B. Smith'; employees in 'Research' department.**
```sql
SELECT Bdate, Address FROM Employee
WHERE Fname = 'John' AND Minit = 'B' AND Lname = 'Smith';

SELECT E.Fname, E.Lname, E.Address
FROM Employee E JOIN Department D ON E.Dno = D.Dnumber
WHERE D.Dname = 'Research';
```

**Q2. Projects in 'Stanford' — project no, dept no, manager details.**
```sql
SELECT P.Pnumber, P.Dnum, E.Lname, E.Address, E.Bdate
FROM Project P
JOIN Department D ON P.Dnum = D.Dnumber
JOIN Employee E ON D.Mgr_SSN = E.SSN
WHERE P.Plocation = 'Stanford';
```


**Q3. Each employee and their supervisor's name.**
```sql
SELECT E.Fname AS Emp_First, E.Lname AS Emp_Last,
       S.Fname AS Sup_First, S.Lname AS Sup_Last
FROM Employee E LEFT JOIN Employee S ON E.Super_SSN = S.SSN;
```

**Q4. Projects involving employee 'Smith' (as worker or as dept manager).**
```sql
SELECT DISTINCT P.Pnumber FROM Project P
WHERE P.Pnumber IN (
    SELECT W.Pno FROM Works_On W JOIN Employee E ON W.ESSN = E.SSN
    WHERE E.Lname = 'Smith'
)
OR P.Dnum IN (
    SELECT D.Dnumber FROM Department D JOIN Employee E ON D.Mgr_SSN = E.SSN
    WHERE E.Lname = 'Smith'
);
```

**Q5. 10% raise for employees on 'ProductX'.**
```sql
SELECT E.Fname, E.Lname, E.Salary, E.Salary * 1.10 AS New_Salary
FROM Employee E JOIN Works_On W ON E.SSN = W.ESSN
JOIN Project P ON W.Pno = P.Pnumber
WHERE P.Pname = 'ProductX';
```

**Q6. Employees and projects, ordered by dept then name.**
```sql
SELECT D.Dname, E.Lname, E.Fname, P.Pname
FROM Employee E
JOIN Department D ON E.Dno = D.Dnumber
JOIN Works_On W ON E.SSN = W.ESSN
JOIN Project P ON W.Pno = P.Pnumber
ORDER BY D.Dname, E.Lname, E.Fname;
```

**Q7. Employees with a dependent of same first name and sex.**
```sql
SELECT E.Fname, E.Lname
FROM Employee E JOIN Dependent Dep ON E.SSN = Dep.ESSN
WHERE E.Fname = Dep.Dependent_name AND E.Sex = Dep.Sex;
```

**Q8. Employees with no dependents.**
```sql
SELECT Fname, Lname FROM Employee
WHERE SSN NOT IN (SELECT ESSN FROM Dependent);
```

**Q9. Managers with at least one dependent.**
```sql
SELECT E.Fname, E.Lname
FROM Employee E JOIN Department D ON E.SSN = D.Mgr_SSN
WHERE EXISTS (SELECT 1 FROM Dependent WHERE ESSN = E.SSN);
```

**Q10. Sum, max, min, avg of all salaries.**
```sql
SELECT SUM(Salary), MAX(Salary), MIN(Salary), AVG(Salary) FROM Employee;
```

**Q11. For each project: number, name, employee count.**
```sql
SELECT P.Pnumber, P.Pname, COUNT(W.ESSN) AS Num_Employees
FROM Project P JOIN Works_On W ON P.Pnumber = W.Pno
GROUP BY P.Pnumber, P.Pname;
```

**Q12. Projects with more than 2 employees.**
```sql
SELECT P.Pnumber, P.Pname, COUNT(W.ESSN) AS Num_Employees
FROM Project P JOIN Works_On W ON P.Pnumber = W.Pno
GROUP BY P.Pnumber, P.Pname
HAVING COUNT(W.ESSN) > 2;
```

**Q13. Departments with 5+ employees — count of those earning > 40000.**
```sql
SELECT E.Dno, COUNT(*) AS High_Earners
FROM Employee E
WHERE E.Salary > 40000
AND E.Dno IN (
    SELECT Dno FROM Employee GROUP BY Dno HAVING COUNT(*) > 5
)
GROUP BY E.Dno;
```
