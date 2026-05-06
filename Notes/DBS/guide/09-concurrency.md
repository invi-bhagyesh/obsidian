# 09 — Concurrency Control

## 9.1 Lock-Based Protocols

A **lock** is a mechanism to control concurrent access to a data item. Lock requests go to the **concurrency-control manager**.

### Lock Modes
- **Shared (S)** — read only.
- **Exclusive (X)** — read and write.

### Lock Compatibility Matrix
|        | S       | X       |
|--------|---------|---------|
| **S**  | true    | false   |
| **X**  | false   | false   |

- Multiple S-locks can coexist on an item.
- Any X-lock excludes all other locks on that item.

### Locking Protocol
A set of rules defining when locks are acquired/released. A protocol is correct if all schedules it allows are serializable.

### Bad-locking example (not serializable)
T1 unlocks(B) before T2 reads it → T2 sees the new B but old A (it acquired A first). Locks alone don't enforce serializability.

### Deadlock example
```
T3: lock-X(B); ... ; lock-X(A) -- waits for T4
T4: lock-S(A); ... ; lock-S(B) -- waits for T3
```
Both block forever. Resolve by **rolling back** one of them.

### Starvation
A transaction may always be selected as victim, or always wait behind others. Concurrency-control manager must avoid this.

---

## 9.2 Two-Phase Locking (2PL)

Ensures **conflict serializability**.

### Two phases
1. **Growing phase** — only acquire locks.
2. **Shrinking phase** — only release locks.

A transaction's **lock point** is when it acquires its final lock. Schedules can be serialized in lock-point order.

### Variants
- **Strict 2PL** — hold all **X-locks** until commit/abort. Avoids cascading rollbacks; ensures recoverability.
- **Rigorous 2PL** — hold **all locks** until commit. Serial order = commit order. Most DBMSs use this (calling it just "2PL").

### Properties
- 2PL ensures serializability but **does not prevent deadlocks**.
- 2PL is **not necessary** for serializability — there are conflict-serializable schedules unattainable under 2PL — but in absence of extra info, 2PL is required.

### Lock conversions
- **Upgrade**: convert S → X (only in growing phase).
- **Downgrade**: convert X → S (only in shrinking phase).

### Automatic lock acquisition (pseudocode)
```c
read(D):
    if Ti has any lock on D: read(D)
    else:
        wait until no other Tj has X-lock on D
        grant Ti S-lock on D
        read(D)

write(D):
    if Ti has X-lock on D: write(D)
    else:
        wait until no other has any lock on D
        if Ti has S-lock on D: upgrade to X
        else: grant X-lock
        write(D)
```
All locks released after commit/abort.

### Lock Table Implementation
- Lock manager process; transactions send lock/unlock messages.
- In-memory **lock table** records granted locks and pending requests.
- New requests appended to queue; granted if compatible with all earlier granted/pending requests.
- On unlock, walk the queue and grant compatible requests.
- On abort, all locks/requests of the transaction removed.

---

## 9.3 Graph-Based Protocols (Tree Protocol)

Alternative to 2PL when partial order $\to$ on data items is known.

### Rules
- Only X-locks.
- First lock can be on any item.
- After that, lock $Q$ only if its parent (in the tree/DAG) is currently locked.
- Unlock at any time.
- Cannot relock a previously locked item.

### Properties
- Ensures conflict serializability.
- **Deadlock-free**.
- Allows unlocks earlier than 2PL → more concurrency.
- **Drawbacks**: doesn't ensure recoverability/cascade freedom; may force locking of items not actually accessed.

---

## 9.4 Deadlock Handling

Detection of deadlocks:
- The system is **deadlocked** if there is a set of transactions where each is waiting for another.

### Prevention strategies
1. **Pre-declaration** — lock all needed items before execution.
2. **Partial ordering** — graph-based protocol (lock in increasing order).

### Wait-Die and Wound-Wait Schemes (Timestamp-based)
Each transaction has a timestamp; rolled-back transactions are restarted with the **original** timestamp (avoids starvation).

| Scheme | Older Tᵢ requests lock held by younger Tⱼ | Younger Tᵢ requests lock held by older Tⱼ |
|---|---|---|
| **Wait-die** (non-preemptive) | Tᵢ **waits** | Tᵢ **dies** (rolled back) |
| **Wound-wait** (preemptive) | Tᵢ **wounds** Tⱼ (rolls Tⱼ back) | Tᵢ **waits** |

- Wait-die may cause repeated rollbacks (a transaction may die multiple times).
- Wound-wait has fewer rollbacks.

### Timeout-Based
Wait for at most a fixed time; otherwise roll back.
- Easy to implement.
- Hard to choose timeout; may roll back unnecessarily.
- Starvation possible.

### Deadlock Detection — Wait-For Graph
- Vertices: transactions.
- Edge $T_i \to T_j$ if $T_i$ waits for a lock held by $T_j$.
- The system is deadlocked iff the graph has a cycle.
- Periodically run cycle detection.

### Recovery from Deadlock
1. **Victim selection** — choose transaction with minimum cost (work done, locks held).
2. **Rollback**:
   - **Total** — abort and restart.
   - **Partial** — roll back only enough to release the conflicting lock.
3. **Avoid starvation** — ensure same transaction isn't always the victim (e.g., never select the oldest).

---

## 9.5 Timestamp-Based Concurrency Control

Each transaction $T_i$ has unique timestamp $TS(T_i)$ at start.
- Newer transactions get larger timestamps.
- Goal: serialization order = timestamp order.

### Per-data timestamps
- $W\text{-timestamp}(Q)$ — largest timestamp of any transaction that successfully wrote $Q$.
- $R\text{-timestamp}(Q)$ — largest timestamp of any transaction that successfully read $Q$.

### Read rule
For `read(Q)` by $T_i$:
- If $TS(T_i) < W\text{-TS}(Q)$ → reject and roll back $T_i$ (it would read overwritten data).
- Otherwise → execute; $R\text{-TS}(Q) := \max(R\text{-TS}(Q), TS(T_i))$.

### Write rule
For `write(Q)` by $T_i$:
- If $TS(T_i) < R\text{-TS}(Q)$ → reject (someone newer needs older value); roll back $T_i$.
- If $TS(T_i) < W\text{-TS}(Q)$ → reject (obsolete write); roll back $T_i$.
- Otherwise → write; $W\text{-TS}(Q) := TS(T_i)$.

### Properties
- All conflict edges go from smaller to larger timestamp → no cycles → **serializable**.
- **Deadlock-free** (no transaction waits).
- May not be cascade-free or even recoverable. Solutions:
  1. Defer all writes to end of transaction.
  2. Limited locking — wait for committed data before reading.
  3. Use commit dependencies.

### Worked example
Initially $R\text{-TS}(A) = W\text{-TS}(A) = R\text{-TS}(B) = W\text{-TS}(B) = 0$. $TS(T_{25}) = 25, TS(T_{26}) = 26$.

Schedule executes successfully under TSO when operations are in increasing timestamp order; otherwise some are rolled back.

### Thomas' Write Rule
Modification: if $TS(T_i) < W\text{-TS}(Q)$ on a write, simply **ignore the obsolete write** instead of rolling back.
- Allows greater concurrency.
- Permits some view-serializable but not conflict-serializable schedules.

---

## 9.6 Validation-Based (Optimistic) Protocol

Idea: assume conflicts are rare; let transactions execute then validate.

### Three Phases
1. **Read phase** — execute, read from DB, write only to local variables.
2. **Validation phase** — check serializability.
3. **Write phase** — apply writes (if validated) or rollback.

Each transaction $T_i$ has three timestamps:
- $\text{StartTS}(T_i)$
- $\text{ValidationTS}(T_i)$ — used as $TS(T_i)$.
- $\text{FinishTS}(T_i)$

### Validation Test for $T_j$
For all $T_i$ with $TS(T_i) < TS(T_j)$, at least one must hold:
- $\text{FinishTS}(T_i) < \text{StartTS}(T_j)$, OR
- $\text{StartTS}(T_j) < \text{FinishTS}(T_i) < \text{ValidationTS}(T_j)$ AND **the set of items written by $T_i$ doesn't intersect the set of items read by $T_j$**.

If validation fails → abort $T_j$.

### Properties
- Higher concurrency when conflicts are rare.
- For high-conflict workloads, frequent rollbacks degrade performance.

---

## 9.7 Likely Exam Questions

1. State the lock compatibility matrix; explain S/X locks.
2. Define basic, strict, and rigorous 2PL. Compare them.
3. Show a non-serializable schedule that's possible without 2PL but not with 2PL.
4. Explain deadlock; show a wait-for graph with a cycle.
5. Compare wait-die vs wound-wait.
6. State the timestamp ordering rules for read/write. Apply to a given schedule.
7. Explain Thomas' Write Rule.
8. Describe the three phases of validation-based protocols. State the validation test.
9. When to choose timestamp ordering vs validation-based vs 2PL?
10. Discuss starvation and how it is prevented.

### Practice numericals

**Problem A.** Apply 2PL to:
```
T1: r(A); w(A); r(B); w(B);
T2: r(B); w(B); r(A); w(A);
```
Under strict 2PL: T1 grabs X(A), then needs X(B); T2 already has X(B); deadlock.

**Problem B.** Timestamp ordering: $TS(T_1) = 10, TS(T_2) = 20$. Initial RTS=WTS=0 for X.
- T2 writes X. Now WTS(X) = 20.
- T1 attempts to write X: $TS(T_1) = 10 < WTS(X) = 20$ → roll back T1 (under standard TSO) or **ignore** (under Thomas' rule).
