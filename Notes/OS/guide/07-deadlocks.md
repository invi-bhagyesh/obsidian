# 07 — Deadlocks

## 7.1 Definitions

**Deadlock:** A set of processes is deadlocked if each process in the set is waiting for an event that only another process in the set can cause.

A process is **deadlocked** if it is waiting for an event that will never occur (typically more than one process is involved).

A process is **indefinitely postponed** (starved) if it is delayed repeatedly while attention is given to other processes — it is ready to proceed but never gets the CPU.

### Examples
- **2 disk drives.** P1 and P2 each hold one drive and each needs the other.
- **Semaphores A, B (each initialized to 1):**
  ```
  P0:           P1:
  wait(A);      wait(B);
  wait(B);      wait(A);
  ```

### System model
- Resource types: $R_1, R_2, \ldots, R_n$.
- Each $R_i$ has $W_i$ instances.
- Reusable resources: **request → use → release**.
- Implemented via system calls (open/close, alloc/free) or wait/signal on semaphore.

---

## 7.2 Four Necessary Conditions for Deadlock

Deadlock can arise iff **all four** hold simultaneously:

1. **Mutual Exclusion** — only one process at a time can use a resource.
2. **Hold and Wait** — a process holding at least one resource is waiting to acquire additional resources held by other processes.
3. **No Preemption** — a resource can be released only voluntarily by the holding process.
4. **Circular Wait** — there exists a set $\{P_0, P_1, \ldots, P_n\}$ of waiting processes such that $P_0 \to P_1 \to \ldots \to P_n \to P_0$ each waiting for a resource held by the next.

---

## 7.3 Resource-Allocation Graph (RAG)

Vertex set $V$ partitioned into:
- $P = \{P_1, \ldots, P_n\}$ — processes (drawn as circles).
- $R = \{R_1, \ldots, R_m\}$ — resource types (drawn as rectangles with dots for instances).

Edges:
- **Request edge** $P_i \to R_j$.
- **Assignment edge** $R_j \to P_i$.

### Basic facts
- **No cycles ⇒ no deadlock.**
- **Cycle present:**
  - **Single instance per resource type** ⇒ deadlock.
  - **Multiple instances** ⇒ possibility of deadlock.

### Examples
- *Cycle but no deadlock* — multi-instance resources where the extra free instances break the wait chain.
- *Cycle = deadlock* — single-instance resources forming a complete cycle.

---

## 7.4 Methods for Handling Deadlocks

1. **Prevent or avoid** — guarantee deadlocks cannot occur.
2. **Detect and recover** — allow deadlocks; detect them and recover.
3. **Ignore** — pretend they never happen (UNIX-style for many cases).

| Method | When applied | Approach |
|--------|--------------|----------|
| Prevention | Statically | Deny one of the four conditions |
| Avoidance | Dynamically | Refuse risky allocations using a priori info (Banker's) |
| Detection | After-the-fact | Periodically check for deadlock |
| Recovery | After detection | Abort processes / preempt resources |

---

## 7.5 Deadlock Prevention

Deny at least one necessary condition.

### Mutual Exclusion
- No issue for sharable resources.
- Cannot deny for non-sharable resources.

### Hold and Wait
Guarantee that when a process requests a resource, it does not hold any others.
- Force process to acquire all required resources at once before starting.
- Or release current set before requesting more.
- ✗ Drawbacks: low utilization, possible starvation.

### No Preemption
- Preempt resources from a process that requests but cannot get more.
- Preempted resources added to the list of resources the process is waiting for.
- Process restarts only when it can regain old + new requested resources.

### Circular Wait
- Impose a **total ordering** of resource types; processes must request in increasing order.
- Let $F: R \to \mathbb{N}$ be a unique numbering. After acquiring $R_i$, a process can request $R_j$ only if $F(R_j) > F(R_i)$.
- Mathematical impossibility: $F(R_0) < F(R_1) < \ldots < F(R_n) < F(R_0)$.

---

## 7.6 Deadlock Avoidance

Requires **a priori information** about each process's maximum needs.

The avoidance algorithm dynamically examines the resource-allocation state to ensure there can never be a circular wait. **Resource-allocation state** = number of available + allocated resources + maximum demands.

### Safe state
A system is in a **safe state** if there exists a sequence $\langle P_1, P_2, \ldots, P_n \rangle$ of *all* processes such that for each $P_j$, the resources $P_j$ can still request can be satisfied by:
**currently available + resources held by all $P_i$ with $i < j$.**

### Implications
- Safe ⇒ no deadlocks.
- Deadlocked ⇒ unsafe.
- Unsafe ⇒ *possibility* of deadlock.
- **Avoidance: never enter unsafe state.**

### Avoidance algorithms
- **Single instance per resource type** → resource-allocation graph (claim edges).
- **Multiple instances** → **Banker's Algorithm**.

### Resource-allocation graph algorithm (single instance)
- **Claim edge** $P_i \dashrightarrow R_j$ (dashed): may request later.
- Claim edge converts to request edge when the process actually requests.
- Request granted only if converting it to an assignment edge does **not create a cycle**.
- Resources must be claimed a priori.

---

## 7.7 Banker's Algorithm

For multiple instances of each resource type. Each process declares max usage upfront.

### Data structures
Let $n$ = processes, $m$ = resource types.

| Symbol | Type | Meaning |
|--------|------|---------|
| `Available[m]` | vector | `Available[j] = k` → k instances of $R_j$ free. |
| `Max[n][m]`    | matrix | `Max[i][j] = k` → process $P_i$ may request at most k of $R_j$. |
| `Allocation[n][m]` | matrix | `Allocation[i][j] = k` → currently allocated to $P_i$. |
| `Need[n][m]`   | matrix | `Need[i][j] = Max[i][j] - Allocation[i][j]`. |

### Safety algorithm
1. `Work = Available`; `Finish[i] = false` for all i.
2. Find an i with `Finish[i] = false` and `Need_i ≤ Work`. If none, go to 4.
3. `Work = Work + Allocation_i`; `Finish[i] = true`. Go to 2.
4. If `Finish[i] = true` for all i → **safe state**; otherwise unsafe.

### Resource-Request algorithm (process $P_i$ requests $\text{Request}_i$)
1. If `Request_i ≤ Need_i`, go to 2; else error (exceeded max).
2. If `Request_i ≤ Available`, go to 3; else $P_i$ must wait.
3. Pretend allocation:
   - `Available -= Request_i`
   - `Allocation_i += Request_i`
   - `Need_i -= Request_i`
4. Run safety check.
5. Safe → grant; Unsafe → roll back, $P_i$ waits.

---

## 7.8 Banker's Algorithm — Worked Numerical

### Setup
5 processes, 3 resource types: A(10), B(5), C(7).

**Snapshot at $T_0$:**
| Process | Allocation (A B C) | Max (A B C) |
|---------|--------------------|-------------|
| P0 | 0 1 0 | 7 5 3 |
| P1 | 2 0 0 | 3 2 2 |
| P2 | 3 0 2 | 9 0 2 |
| P3 | 2 1 1 | 2 2 2 |
| P4 | 0 0 2 | 4 3 3 |

Total allocation = (7, 2, 5). **Available = (10−7, 5−2, 7−5) = (3, 3, 2).**

### Need = Max − Allocation
| Process | Need (A B C) |
|---------|--------------|
| P0 | 7 4 3 |
| P1 | 1 2 2 |
| P2 | 6 0 0 |
| P3 | 0 1 1 |
| P4 | 4 3 1 |

### Run Safety Algorithm
Initial: Work = (3,3,2); Finish = [F,F,F,F,F].

| Step | Pick | Need ≤ Work? | New Work |
|------|------|--------------|----------|
| 1 | P1 | (1,2,2) ≤ (3,3,2)? Y | (3+2, 3+0, 2+0) = (5,3,2) |
| 2 | P3 | (0,1,1) ≤ (5,3,2)? Y | (5+2, 3+1, 2+1) = (7,4,3) |
| 3 | P0 | (7,4,3) ≤ (7,4,3)? Y | (7+0, 4+1, 3+0) = (7,5,3) |
| 4 | P2 | (6,0,0) ≤ (7,5,3)? Y | (7+3, 5+0, 3+2) = (10,5,5) |
| 5 | P4 | (4,3,1) ≤ (10,5,5)? Y | (10+0, 5+0, 5+2) = (10,5,7) |

**Safe sequence: ⟨P1, P3, P0, P2, P4⟩.**

### Resource Request example: P1 requests (1, 0, 2)
- Request ≤ Need_1? (1,0,2) ≤ (1,2,2)? Yes.
- Request ≤ Available? (1,0,2) ≤ (3,3,2)? Yes.
- Pretend allocate:
  - Available = (3,3,2) − (1,0,2) = **(2,3,0)**.
  - Allocation_1 = (2,0,0) + (1,0,2) = **(3,0,2)**.
  - Need_1 = (1,2,2) − (1,0,2) = **(0,2,0)**.

Run safety on new state (Work = (2,3,0)):
| Step | Pick | Need ≤ Work? | New Work |
|------|------|--------------|----------|
| 1 | P1 | (0,2,0) ≤ (2,3,0)? Y | (2+3, 3+0, 0+2) = (5,3,2) |
| 2 | P3 | (0,1,1) ≤ (5,3,2)? Y | (5+2, 3+1, 2+1) = (7,4,3) |
| 3 | P0 | (7,4,3) ≤ (7,4,3)? Y | (7,5,3) |
| 4 | P2 | (6,0,0) ≤ (7,5,3)? Y | (10,5,5) |
| 5 | P4 | (4,3,1) ≤ (10,5,5)? Y | (10,5,7) |

Safe → **request granted.**

### Try requests yourself
- Can P4's request (3,3,0) be granted? Hint: check Need_4 first.
- Can P0's request (0,2,0) be granted (after P1's grant)? Check available (2,3,0).

---

## 7.9 Deadlock Detection

Allow deadlock to occur; detect periodically.

### Single-instance resources — Wait-For Graph
Remove resource nodes from RAG; combine $P_i \to R_q$ and $R_q \to P_j$ into $P_i \to P_j$.

Periodically run a cycle-detection algorithm — $O(n^2)$ in number of vertices.

### Multi-instance — Detection algorithm

Data:
- `Available[m]`.
- `Allocation[n][m]`.
- `Request[n][m]` — current outstanding requests.

Algorithm:
1. Initialize `Work = Available`; for each i, `Finish[i] = (Allocation_i == 0)`.
2. Find an i with `Finish[i] = false` and `Request_i ≤ Work`. If none → step 4.
3. `Work += Allocation_i`; `Finish[i] = true`. Go to 2.
4. If `Finish[i] = false` for some i, **system is in deadlock**, and those processes are deadlocked.

Complexity: **O(m × n²)**.

---

## 7.10 Deadlock Detection — Worked Numerical

### Setup
5 processes; 3 resource types: A(7), B(2), C(6).

| Process | Allocation (A B C) | Request (A B C) |
|---------|--------------------|------------------|
| P0 | 0 1 0 | 0 0 0 |
| P1 | 2 0 0 | 2 0 2 |
| P2 | 3 0 3 | 0 0 0 |
| P3 | 2 1 1 | 1 0 0 |
| P4 | 0 0 2 | 0 0 2 |

Available = total − Σ Allocation = (7−7, 2−2, 6−6) = **(0, 0, 0)**.

### Run detection (Work = (0,0,0))
| Step | Pick | Request ≤ Work? | New Work |
|------|------|------------------|----------|
| 1 | P0 | (0,0,0) ≤ (0,0,0)? Y | (0,1,0) |
| 2 | P2 | (0,0,0) ≤ (0,1,0)? Y | (3,1,3) |
| 3 | P3 | (1,0,0) ≤ (3,1,3)? Y | (5,2,4) |
| 4 | P1 | (2,0,2) ≤ (5,2,4)? Y | (7,2,4) |
| 5 | P4 | (0,0,2) ≤ (7,2,4)? Y | (7,2,6) |

All Finish = true → **no deadlock**.

### Modified scenario — P2 requests one more C
New requests:
| Process | Request (A B C) |
|---------|------------------|
| P0 | 0 0 0 |
| P1 | 2 0 2 |
| P2 | 0 0 1 |  ← changed
| P3 | 1 0 0 |
| P4 | 0 0 2 |

Run detection (Work = (0,0,0)):
- P0: (0,0,0) ≤ Work → Work = (0,1,0); Finish[0] = T.
- Try P1: (2,0,2) ≤ (0,1,0)? No.
- Try P2: (0,0,1) ≤ (0,1,0)? **No** (C needed).
- Try P3: (1,0,0) ≤ (0,1,0)? **No** (A needed).
- Try P4: (0,0,2) ≤ (0,1,0)? **No**.

No further progress. **Deadlock exists** consisting of P1, P2, P3, P4.

---

## 7.11 Detection-Algorithm Usage

**When/how often to invoke:**
- **Every time an allocation cannot be granted immediately** — detects exactly when, but adds overhead.
- **Periodically (e.g., hourly or when CPU drops)** — cheaper but the cause becomes harder to identify.

---

## 7.12 Recovery from Deadlock

### Process termination
- **Abort all deadlocked processes** — expensive, discards work.
- **Abort one at a time until cycle eliminated** — overhead (re-run detection after each abort).

**Issues:**
- Process mid-print/file update — OS may need to undo partial state.

**Factors when choosing victim:**
- Priority of process.
- How many and which resources used / required.
- Foreground vs background.
- How long has the process executed; how much more is needed.

### Resource preemption
1. **Selecting a victim** — minimize cost (e.g., resources held, time computed).
2. **Rollback** — return process to a safe state OR total rollback (abort + restart).
3. **Starvation** — same process always selected? Include rollback count in cost.

---

## 7.13 Likely Exam Questions

1. State the four necessary conditions for deadlock.
2. Draw a resource-allocation graph; explain when a cycle implies deadlock.
3. Compare deadlock prevention, avoidance, detection.
4. Explain how each of the four conditions can be denied (prevention).
5. Define safe state. Why is unsafe state not necessarily deadlock?
6. State the Banker's algorithm. Apply to a given allocation/max table to find a safe sequence.
7. Apply the Resource-Request algorithm: should a given request be granted?
8. Explain the wait-for graph and its use in detection.
9. Apply the multi-instance detection algorithm and identify deadlocked processes.
10. Discuss recovery strategies — process termination vs resource preemption.

### Practice numericals

**Problem A.** 4 processes, resources A(6), B(3), C(4):
| | Alloc (A B C) | Max (A B C) |
|-|----------------|--------------|
| P0 | 1 0 0 | 4 1 1 |
| P1 | 1 1 2 | 2 2 2 |
| P2 | 1 0 1 | 1 0 3 |
| P3 | 2 1 1 | 5 2 1 |

Available = (6−5, 3−2, 4−4) = (1, 1, 0).
Need = Max − Alloc:
- P0: 3 1 1
- P1: 1 1 0
- P2: 0 0 2
- P3: 3 1 0

Safety check (Work = (1,1,0)):
- P1: (1,1,0) ≤ (1,1,0)? Y → Work = (2,2,2)
- P3: (3,1,0) ≤ (2,2,2)? **No** (A needs 3 > 2)
- P0: (3,1,1) ≤ (2,2,2)? **No**
- P2: (0,0,2) ≤ (2,2,2)? Y → Work = (3,2,3)
- P0: (3,1,1) ≤ (3,2,3)? Y → Work = (4,2,3)... continue.
- Eventually all finish → **safe**.

**Problem B.** Prove deadlock-prevention by ordering: assume 3 resources $R_1, R_2, R_3$ ordered $1<2<3$. If P1 holds $R_2$ and requests $R_1$, what happens? — Request denied (must request in increasing order); P1 must release $R_2$ first.
