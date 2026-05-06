# 08 — Transactions

## 8.1 Transaction Concept

A **transaction** is a unit of program execution that accesses and possibly updates data items.

**Example: Transfer $50 from A to B:**
```
1. read(A)
2. A := A - 50
3. write(A)
4. read(B)
5. B := B + 50
6. write(B)
```

### Two key issues
- Failures (hardware, system crashes).
- Concurrent execution of multiple transactions.

---

## 8.2 ACID Properties

| Property | Meaning |
|---|---|
| **Atomicity** | All operations of the transaction are reflected, or none are. |
| **Consistency** | Execution in isolation preserves database consistency. |
| **Isolation** | Concurrent transactions appear as serial — intermediate states are hidden. |
| **Durability** | Successful transaction's changes persist despite system failures. |

### Atomicity violation example
If transfer fails after step 3 (A debited but B not credited), money is "lost". The system must ensure partial updates are not visible.

### Consistency violation example
Sum of A + B must equal pre-transaction sum after transfer completes. Other constraints: PK/FK, sum rules, etc.

### Isolation violation example
If T2 reads A and B between steps 3 and 6 of T1, T2 sees A+B less than the true total.

---

## 8.3 Transaction State

| State | Meaning |
|---|---|
| **Active** | Initial; while executing |
| **Partially committed** | After final statement |
| **Failed** | When normal execution can't proceed |
| **Aborted** | After rollback to pre-transaction state — restart or kill |
| **Committed** | After successful completion |

State transitions:
```
active → partially committed → committed
   ↓            ↓
 failed → aborted
```

---

## 8.4 Concurrent Executions

**Advantages:**
- Increased CPU/disk utilization → better throughput.
- Reduced response time — short transactions don't wait behind long ones.

**Concurrency-control schemes** ensure isolation while allowing concurrency.

---

## 8.5 Schedules

A **schedule** is a sequence of instructions specifying the order of execution. It must:
- Include all instructions of all involved transactions.
- Preserve the order within each transaction.
- End each transaction with `commit` or `abort`.

### Serial Schedule 1: T1 then T2 (preserves A+B)
T1 transfers $50 from A to B; T2 transfers 10% of A's balance.

```
T1: read(A); A=A-50; write(A); read(B); B=B+50; write(B); commit;
T2: read(A); temp=A*0.1; A=A-temp; write(A); read(B); B=B+temp; write(B); commit;
```

### Concurrent Schedule 3 (interleaved, equivalent to Schedule 1)
T1's A operations precede T2's A operations; same for B. Equivalent to serial T1→T2.

### Schedule 4 (does NOT preserve A+B)
Operations interleave such that T2 reads A after T1's debit but reads B before T1's credit — sees inconsistent state.

---

## 8.6 Conflicting Instructions

$I_i, I_j$ in $T_i, T_j$ **conflict** if both access the same item Q and at least one is a write:

| $I_i$ | $I_j$ | Conflict? |
|---|---|---|
| read(Q) | read(Q) | No |
| read(Q) | write(Q) | Yes |
| write(Q) | read(Q) | Yes |
| write(Q) | write(Q) | Yes |

A conflict forces a logical order. Non-conflicting consecutive instructions can be swapped without changing the outcome.

---

## 8.7 Conflict Serializability

- A schedule $S$ is **conflict equivalent** to $S'$ if one can be transformed into the other by swapping non-conflicting instructions.
- $S$ is **conflict serializable** if conflict-equivalent to some serial schedule.

### Schedule that is NOT conflict serializable

```
T3: read(Q)
T4: write(Q)
T3: write(Q)
```
T3-read and T4-write conflict (cannot be swapped); T4-write and T3-write conflict. No swap sequence yields a serial order.

---

## 8.8 View Serializability

$S$ and $S'$ are **view equivalent** if for each data item Q:
1. Same transaction reads the **initial** value of Q.
2. Each `read(Q)` in $S$ reads the value produced by the same write as in $S'$.
3. Same transaction performs the **final** `write(Q)`.

- A schedule is **view serializable** if view-equivalent to a serial schedule.
- Every conflict-serializable schedule is view-serializable.
- View-serializable but not conflict-serializable schedules contain **blind writes** (writes without preceding reads).

### Example (view-serializable, not conflict-serializable)
```
T27: read(Q)
T28: write(Q)
T27: write(Q)
T29: write(Q)
```

---

## 8.9 Testing for Serializability — Precedence Graph

- Vertex per transaction.
- Edge $T_i \to T_j$ if $T_i$ accessed an item conflicting with a later access by $T_j$.

**Theorem:** A schedule is **conflict serializable iff its precedence graph is acyclic**.

- Cycle detection: $O(n^2)$ or better.
- Serializability order = topological sort of the graph.

### Example
For schedule A with topological sort `T5 → T1 → T3 → T2 → T4`, the schedule is serializable.

### View serializability test
- Cannot use precedence graph directly.
- The decision problem is **NP-complete**.
- In practice, sufficient-condition tests are used.

---

## 8.10 Recoverable Schedules

A schedule is **recoverable** if for any pair of transactions $T_i, T_j$ where $T_j$ reads a data item written by $T_i$, $T_i$'s commit appears before $T_j$'s commit.

### Non-recoverable example (Schedule 11)
```
T8: write(A);
T9: read(A); commit;
T8: ... abort
```
T9 has already committed using uncommitted data from T8 → cannot roll back T8 cleanly.

### Cascading rollbacks
If $T_{10}$ fails, $T_{11}$ (which read $T_{10}$'s output) and $T_{12}$ (which read $T_{11}$'s output) must roll back too. Wastes a lot of work.

### Cascadeless schedules
For each pair $T_i, T_j$ where $T_j$ reads a data item written by $T_i$, $T_i$'s commit appears before $T_j$'s read.

- Every cascadeless schedule is recoverable.
- It is desirable to restrict schedules to cascadeless.

---

## 8.11 Concurrency Control Goal

Schedules must be:
- Conflict (or view) serializable, AND
- Recoverable, preferably cascadeless.

Trade-off: serial schedules are correct but slow. **Concurrency control protocols** generate concurrent schedules that meet these properties.

Concurrency control protocols (e.g., 2PL, timestamp ordering) **don't** examine precedence graphs at runtime; they impose discipline that avoids non-serializable schedules.

---

## 8.12 Weak Levels of Consistency

Some applications tolerate non-serializable schedules:
- A read-only transaction needing only an approximate balance.
- Statistics for query optimization.

Trades accuracy for performance.

### SQL-92 Isolation Levels
| Level | Phenomena allowed |
|---|---|
| **Serializable** | Default; full ACID isolation |
| **Repeatable read** | Only committed records; repeated reads return same value; phantom reads possible |
| **Read committed** | Only committed records; successive reads may differ |
| **Read uncommitted** | Allows reading uncommitted records |

Some systems' defaults: Oracle and PostgreSQL (pre-9) default to **snapshot isolation** (not part of the SQL standard).

---

## 8.13 Transactions in SQL

- Transactions begin implicitly.
- End with `commit work` or `rollback work`.
- Most systems auto-commit each statement; can be turned off (`connection.setAutoCommit(false)` in JDBC).
- Set isolation:
  ```sql
  set transaction isolation level serializable
  ```
  ```java
  connection.setTransactionIsolation(Connection.TRANSACTION_SERIALIZABLE);
  ```

---

## 8.14 Likely Exam Questions

1. Define a transaction. State and explain ACID properties.
2. Draw the transaction state diagram.
3. Define conflicting operations. Construct a precedence graph for a given schedule and test for conflict serializability.
4. Differentiate conflict vs view serializability with examples.
5. Define recoverable, cascadeless schedules.
6. Why is cascading rollback undesirable?
7. List the four SQL isolation levels and explain phenomena allowed at each.
8. Show a schedule that is view-serializable but not conflict-serializable.
9. State the theorem for testing conflict serializability via precedence graph.

### Practice problem: Test conflict serializability

Schedule:
```
T1: r(A); T2: r(A); T1: w(A); T3: r(A); T2: w(A); T1: commit; T2: commit; T3: commit;
```
Precedence graph:
- T1 reads A then T2 writes A → edge T1 → T2.
- T1 writes A and T2 writes A (both write) → edge T1 → T2 (already), T2 → T1?
- Wait: ordering: T1 writes before T2 writes → T1→T2. T2 reads before T1 writes → T2→T1.

Cycle T1↔T2 → **not conflict serializable**.

### Practice problem: Topological sort
Given graph T1→T2, T2→T3, T1→T4, T4→T3 — possible serial orders: T1→T2→T4→T3 or T1→T4→T2→T3.
