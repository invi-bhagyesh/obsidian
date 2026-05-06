# 10 — Recovery System

## 10.1 Failure Classification

### Transaction failure
- **Logical errors** — internal error condition (constraint violation, division by zero).
- **System errors** — DB system aborts (deadlock).

### System crash
- Power/hardware/software failure.
- **Fail-stop assumption**: non-volatile storage is uncorrupted.

### Disk failure
- Head crash destroys data; failures detectable via checksums.

---

## 10.2 Storage Structure

| Type | Survives crashes? | Examples |
|---|---|---|
| Volatile | No | RAM, cache |
| Non-volatile | Yes (usually) | Disk, tape, flash, NVRAM |
| Stable | Yes (idealization) | Multi-copy on distinct media |

### Stable Storage Implementation
- Maintain multiple copies on separate disks (possibly remote).
- Block transfer outcomes: success / partial failure / total failure.
- Output protocol (for two copies):
  1. Write to copy 1.
  2. After success, write to copy 2.
  3. Output is complete only when both succeed.
- Recovery from inconsistent copies:
  - Detect inconsistent blocks (compare or use a record of in-progress writes on NVRAM).
  - If one is corrupted: overwrite by the other.
  - If both intact but differ: overwrite copy 2 by copy 1.

---

## 10.3 Data Access

- **Physical blocks** — on disk.
- **Buffer blocks** — temporarily in memory.
- Operations:
  - `input(B)` — load physical block B into memory.
  - `output(B)` — write buffer block B to disk (replacing physical copy).

Each transaction $T_i$ has a private workspace:
- `read(X)` — copy X into local variable $x_i$.
- `write(X)` — store $x_i$ into the buffer block.
- The DBMS performs `output` later (not necessarily right after `write`).

Each data item assumed to fit in a single block.

---

## 10.4 Recovery and Atomicity — Motivation

If the system crashes after writing A to disk but before writing B, the database is inconsistent. The recovery mechanism must:
1. Provide enough info during normal operation to recover from failures.
2. Restore the database to a state ensuring atomicity, consistency, durability.

Two main approaches:
- **Log-based recovery** (focus of this chapter).
- **Shadow-copy / shadow-paging** (alternative; brief mention).

---

## 10.5 Log-Based Recovery

The **log** is a sequence of records on stable storage describing updates.

### Log records
- `<T_i start>` — when $T_i$ begins.
- `<T_i, X, V_1, V_2>` — update record: X had value $V_1$ (old), now $V_2$ (new).
- `<T_i commit>` — when $T_i$ finishes.

### Log example
```
<T0 start>
<T0, A, 1000, 950>
<T0, B, 2000, 2050>
<T0 commit>
<T1 start>
<T1, C, 700, 600>
<T1 commit>
```

### Two strategies
- **Immediate database modification** — buffer/disk may be updated before commit.
- **Deferred database modification** — updates applied only at commit.

### Order constraint (immediate-modification)
- The log record must be **output before** the corresponding database update.
- Output of updated blocks may occur any time before or after commit.
- Order of outputs may differ from order of writes.

---

## 10.6 Transaction Commit

- A transaction is **committed** when its `<T_i commit>` log record is on stable storage.
- All earlier log records of the transaction must be on stable storage already.
- Updated buffer blocks may still be in memory when the transaction commits.

---

## 10.7 Concurrency + Recovery

- Single buffer + single log shared across transactions.
- A buffer block can have updates from multiple transactions.
- Assumption: if $T_i$ has updated an item, no other transaction may modify it until $T_i$ commits/aborts.
  - Ensured via strict two-phase locking.
- Log records of different transactions may be interleaved.

---

## 10.8 Undo and Redo

For log record $<T_i, X, V_1, V_2>$:
- **undo**: restore X to $V_1$.
- **redo**: set X to $V_2$.

### undo($T_i$)
Scan log backwards, undoing each update.
- For each restoration, write a log record $<T_i, X, V>$ (a **compensation log record**, CLR).
- After undo completes, write `<T_i abort>`.

### redo($T_i$)
Scan log forwards, applying each new value. **No logging during redo.**

---

## 10.9 Recovering from Failure — When to Undo or Redo

After a crash:
- $T_i$ needs **undo** if log has `<T_i start>` but no `<T_i commit>` or `<T_i abort>`.
- $T_i$ needs **redo** if log has `<T_i start>` AND has `<T_i commit>` or `<T_i abort>`.
  - Even if previously undone (with `<T_i abort>` written), redo replays everything — known as **repeating history**. This simplifies recovery.

### Worked example (immediate-modification, three crash scenarios)

```
<T0 start>
<T0, A, 1000, 950>
<T0, B, 2000, 2050>
[possible crash here]
<T0 commit>
<T1 start>
<T1, C, 700, 600>
[possible crash here]
<T1 commit>
[possible crash here]
```

Recovery actions:
- **(a) Crash before T0 commits**: undo T0 — restore B=2000, A=1000; write `<T0, B, 2000>`, `<T0, A, 1000>`, `<T0, abort>`.
- **(b) Crash after T0 commit, before T1 commit**: redo T0 (A=950, B=2050); undo T1 (restore C=700); write `<T1, C, 700>`, `<T1, abort>`.
- **(c) Crash after T1 commit**: redo both (A=950, B=2050, C=600).

---

## 10.10 Checkpoints

Avoid scanning the entire log on recovery.

### Checkpoint operation
1. Output all in-memory log records to stable storage.
2. Output all modified buffer blocks to disk.
3. Write `<checkpoint L>` to stable storage, where L is the list of active transactions at checkpoint time.
4. Updates paused during checkpointing.

### Recovery using checkpoint
- Find the most recent `<checkpoint L>` record.
- Only transactions in L or started after the checkpoint need to be processed.
- Earlier transactions have already been output to disk.
- Continue scanning backwards to find each `<T_i start>` for transactions in L.

### Example timeline
```
T1: completed before T_c              -- ignore
T2: started before T_c, ended after   -- redo
T3: started after T_c, ended before T_f -- redo
T4: started after T_c, active at T_f  -- undo
```

---

## 10.11 Recovery Algorithm

### Logging during normal operation
- `<T_i start>` at start.
- `<T_i, X_j, V_1, V_2>` per update.
- `<T_i commit>` at end.

### Transaction rollback
1. Scan backward; for each $<T_i, X_j, V_1, V_2>$:
   - Write $V_1$ to $X_j$.
   - Write CLR $<T_i, X_j, V_1>$.
2. On `<T_i start>`, stop and write `<T_i abort>`.

### Recovery from failure — Two phases

#### Redo phase
1. Find last `<checkpoint L>`; set undo-list to $L$.
2. Scan **forward** from checkpoint:
   - For each $<T_i, X_j, V_1, V_2>$ or $<T_i, X_j, V_2>$: redo by writing $V_2$.
   - On `<T_i start>`: add $T_i$ to undo-list.
   - On `<T_i commit>` or `<T_i abort>`: remove $T_i$ from undo-list.

#### Undo phase
1. Scan **backward** from end of log:
   - For $<T_i, X_j, V_1, V_2>$ where $T_i$ in undo-list: write $V_1$; write CLR $<T_i, X_j, V_1>$.
   - For `<T_i start>` where $T_i$ in undo-list: write `<T_i abort>`; remove from undo-list.
2. Stop when undo-list is empty.

### Worked recovery trace

Log at crash time:
```
<T0 start>
<T0, B, 2000, 2050>
<T1 start>
<checkpoint {T0, T1}>
<T1, C, 700, 600>
<T1 commit>
<T2 start>
<T2, A, 500, 400>
<T0, B, 2000>          -- T0 rollback (during normal op)
<T0 abort>
[crash]
```

**Redo phase:**
- Start from checkpoint with undo-list = {T0, T1}.
- Process `<T1, C, 700, 600>` → C := 600.
- `<T1 commit>` → remove T1 from undo-list.
- `<T2 start>` → add T2.
- `<T2, A, 500, 400>` → A := 400.
- `<T0, B, 2000>` → B := 2000.
- `<T0 abort>` → remove T0.
- Final undo-list = {T2}.

**Undo phase:** roll back T2 — restore A := 500; write `<T2, A, 500>`, `<T2 abort>`.

---

## 10.12 Likely Exam Questions

1. List types of failures and their effects.
2. Differentiate volatile, non-volatile, and stable storage.
3. Describe stable-storage implementation (two copies; recovery).
4. Define log-based recovery; list the types of log records.
5. Differentiate immediate vs deferred database modification.
6. State the order rule for log records vs database writes.
7. Define undo and redo. When does each apply?
8. What is a compensation log record (CLR)?
9. Explain checkpointing. Why does it speed up recovery?
10. Trace recovery for a given log: identify which transactions need redo/undo.
11. Define "repeating history" and explain why it simplifies recovery.

### Practice trace

Given log:
```
<T1 start>
<T1, A, 100, 110>
<T2 start>
<T2, B, 200, 250>
<T1 commit>
<checkpoint {T2}>
<T2, C, 300, 320>
<T3 start>
<T3, D, 400, 420>
<T2 commit>
[crash]
```

- Redo phase: T2 (D, B, C); T3 (D). Undo-list at end: {T3}.
- Undo phase: D := 400; write `<T3, D, 400>`, `<T3 abort>`.
