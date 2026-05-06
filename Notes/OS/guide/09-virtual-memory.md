# 09 — Virtual Memory

## 9.1 Background

**Virtual memory** = separation of user logical memory from physical memory, allowing execution of processes that may not be completely in memory.

### Advantages
- Logical address space can be **much larger** than physical address space.
- Each process uses **less physical memory**, so more programs can run simultaneously → **higher throughput**.
- **Less I/O** to load/swap each program → faster execution.
- Allows **more efficient process creation**.

Virtual memory can be implemented via **demand paging**.

```
Process virtual space       Memory map         Physical RAM
   page 0  ─┐
   page 1  ─┤  →  page table  ─┐                ┌─ frame  X
   page 2  ─┘                  ├──── present ───┤
   page 3  ─── on disk ────────┘                └─ frame Y
   ...
```

---

## 9.2 Demand Paging

Bring a page into memory **only when needed**.

### Benefits
- Less I/O, less memory used, faster response, more users.

**Lazy swapper** = never swaps a page in unless needed; swapper for pages is called a **pager**.

### Mechanics
- If page is **memory resident** → behaves like normal paging.
- If page **not resident** → detect, load from disk, restart instruction (no programmer or program changes needed).

### Valid–Invalid Bit
Each page-table entry has a valid/invalid bit:
- **v** (valid) = page is memory-resident.
- **i** (invalid) = not in memory (or not in logical address space).

Initially all entries marked **i**. During address translation, an i bit triggers a **page fault**.

---

## 9.3 Page Fault Handling

Steps when a referenced page has its bit = i:

1. OS checks another table: **invalid reference?** If yes → abort. Else, page just not in memory.
2. **Find a free frame.**
3. **Swap the page into the frame** via a disk operation.
4. **Reset tables** to indicate the page is now in memory; set valid bit.
5. **Restart the instruction** that caused the fault.

### Aspects
- **Pure demand paging** — process starts with no pages; every first access faults.
- **Hardware support needed:** page table with valid bit, secondary memory (swap space), instruction restart.

### Worst-case Page Fault — 12 stages
1. Trap to OS.
2. Save user registers and process state.
3. Determine that the interrupt was a page fault.
4. Check page reference is legal; locate page on disk.
5. Issue disk read to a free frame:
   1. Wait in device queue.
   2. Wait for seek/latency.
   3. Begin transfer.
6. While waiting, allocate CPU to another process.
7. Receive disk-completion interrupt.
8. Save registers/state of other process.
9. Determine interrupt was from disk.
10. Update page table — page now in memory.
11. Wait for CPU again.
12. Restore registers/state and resume the interrupted instruction.

---

## 9.4 Performance of Demand Paging

Three major activities:
- **Service the interrupt** (carefully coded — small overhead).
- **Read the page** (large overhead).
- **Restart the process** (small overhead).

### Effective Access Time (EAT) Formula
Let $p$ = page-fault rate (probability), $0 \le p \le 1$.

$$\text{EAT} = (1-p) \cdot \text{memory\_access} + p \cdot (\text{page\_fault\_overhead} + \text{swap\_in})$$

(Some derivations also include swap-out if a dirty victim is written.)

### Solved example
Memory access = 200 ns; average page-fault service = 8 ms = 8,000,000 ns.
$$\text{EAT} = (1-p) \cdot 200 + p \cdot 8\,000\,000 = 200 + p \cdot 7\,999\,800$$

**Case 1.** p = 1/1000 (one page fault per 1000 references):
$$\text{EAT} = 200 + 7\,999\,800/1000 = 200 + 7999.8 = 8199.8 \text{ ns} \approx 8.2 \mu s.$$
This is a **slowdown of 40×** vs the baseline 200 ns.

**Case 2.** Limit performance degradation to <10%, i.e., EAT < 220 ns:
$$220 > 200 + 7\,999\,800 \cdot p$$
$$p < 20 / 7\,999\,800 \approx 2.5 \times 10^{-6}$$
**Less than one page fault every 400,000 memory accesses.**

---

## 9.5 Copy-on-Write (COW)

Parent and child initially **share** pages in memory. Only when one modifies a shared page is it copied for that process.

- Allows efficient process creation; only modified pages are copied.
- Free pages are typically **zero-fill-on-demand** from a pool.
- `vfork()`: parent suspends; child uses parent's COW address space — designed for child to call `exec()` quickly.

---

## 9.6 Page Replacement

**No free frame?** Options:
- Terminate a process.
- Swap out a process and release its frames.
- **Page replacement:** find an unused page in memory and swap it out.

### Modified page-fault routine (4 steps)
1. Find desired page on disk.
2. Find a free frame:
   - If free, use it.
   - Else, run page-replacement to pick a **victim**.
   - If victim is dirty, write to disk.
3. Bring desired page in; update page and frame tables.
4. Restart the instruction that caused the fault.

A page fault may now require **two** disk transfers (write victim + read new page) → higher EAT.

### Choosing a replacement algorithm
Goal: minimize page-fault rate. Evaluate using a **reference string** (sequence of page numbers referenced) and count page faults given a number of frames.

---

## 9.7 FIFO (First-In, First-Out) Page Replacement

Replace the page that has been in memory the longest. Implemented as a FIFO queue of pages.

### Belady's Anomaly
For some reference strings, **more frames can cause more page faults** with FIFO. Classic counterexample:
- Reference string: 1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5.
  - With 3 frames → 9 page faults.
  - With 4 frames → 10 page faults.

### Numerical example
Reference string: **7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2, 1, 2, 0, 1, 7, 0, 1**, 3 frames.

Trace (page faults marked *):
| Ref | F1 | F2 | F3 | Fault? |
|-----|----|----|----|--------|
| 7 | 7 | – | – | * |
| 0 | 7 | 0 | – | * |
| 1 | 7 | 0 | 1 | * |
| 2 | 2 | 0 | 1 | * |
| 0 | 2 | 0 | 1 | hit |
| 3 | 2 | 3 | 1 | * |
| 0 | 2 | 3 | 0 | * |
| 4 | 4 | 3 | 0 | * |
| 2 | 4 | 2 | 0 | * |
| 3 | 4 | 2 | 3 | * |
| 0 | 0 | 2 | 3 | * |
| 3 | 0 | 2 | 3 | hit |
| 2 | 0 | 2 | 3 | hit |
| 1 | 0 | 1 | 3 | * |
| 2 | 0 | 1 | 2 | * |
| 0 | 0 | 1 | 2 | hit |
| 1 | 0 | 1 | 2 | hit |
| 7 | 7 | 1 | 2 | * |
| 0 | 7 | 0 | 2 | * |
| 1 | 7 | 0 | 1 | * |

**FIFO page faults = 15.**

---

## 9.8 Optimal (OPT/MIN) Page Replacement

Replace the page that **will not be used for the longest time in the future**.
- **Provably the lowest page-fault rate.**
- Requires future knowledge → only used as a benchmark.

For reference string **7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2, 1, 2, 0, 1, 7, 0, 1** with 3 frames, OPT yields **9 page faults** (textbook answer).

---

## 9.9 LRU (Least Recently Used) Page Replacement

Replace the page that **has not been used for the longest time** (look backward).
- Optimal among "look-backward" algorithms.
- Page-fault rate of LRU on string $S$ equals that on the reverse string $S^R$.

### Implementations
**Counter:** every page entry has a "time of use"; update on each reference; replace minimum. Search needed.

**Stack:** keep page numbers in a doubly-linked list:
- On reference, move that page to the top.
- Victim = bottom of stack.

For reference string **7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2, 1, 2, 0, 1, 7, 0, 1** with 3 frames, LRU yields **12 page faults** (textbook answer).

---

## 9.10 Allocation of Frames

Each process needs a **minimum** number of frames (defined by instruction set; e.g., a single-address instruction needs 2 frames; a two-address instruction needs 3).

### Schemes
**Fixed/Equal:** with $m$ frames and $n$ processes, each gets $m/n$. Unfair for large vs small processes.

**Proportional:** allocate by size:
- $s_i$ = size of $P_i$, $S = \sum s_i$, $m$ = total frames.
- $a_i = (s_i / S) \times m$.

**Example:** m=64, s₁=10, s₂=127. a₁ = (10/137)·64 ≈ 5; a₂ = (127/137)·64 ≈ 59.

**Priority allocation:** combine size with priority.

### Global vs Local Replacement
- **Local** — process replaces only from its own frames. Consistent per-process performance, but possible underutilization.
- **Global** — process can replace from any process's frames. Greater throughput; common; but execution time becomes unpredictable.

---

## 9.11 Thrashing

If a process does not have enough active pages, page-fault rate is very high. Result: low CPU utilization → OS thinks it needs more multiprogramming → adds processes → more faults → CPU drops further.

> **Thrashing ≡ busy swapping pages in and out ≡ doing more paging than executing.**

A process is thrashing if it is spending more time paging than executing.

### Cause
As multiprogramming grows, CPU utilization rises until thrashing sets in, then sharply drops.
- Limit using **local replacement** (only partial fix).

```
CPU
util.   ▲
 100%   │   ╱─────╲
        │  ╱       ╲────
        │ ╱             ╲   ← thrashing
        │╱                ╲
   0%   └──────────────────► degree of multiprogramming
```

### Why demand paging works
**Locality model** — a process migrates from one locality to another (localities may overlap).

### Why thrashing occurs
$\sum \text{size of locality} > \text{total memory}$ → can be limited by local/priority replacement.

---

## 9.12 Working-Set Model

- $\Delta$ = working-set window = a fixed number of recent page references.
- The set of pages in the most recent $\Delta$ references is the **working set**.
- Approximates current locality. A page in active use is in the working set; otherwise, it drops out $\Delta$ references after its last reference.

### Example (Δ = 10)
```
... 2 6 1 5 7 7 7 7 5 1 6 2 3 4 1 2 3 4 4 4 3 4 3 4 4 4 1 3 2 3 4 4 4 3 4 4 4 ...
                          ↑t1                            ↑t2
```
- WS(t₁) = {1, 2, 5, 6, 7}
- WS(t₂) = {3, 4}

### Choice of Δ
- Too small → won't encompass the entire locality.
- Too large → encompasses several localities.
- Δ = ∞ → encompasses entire program.

### Definitions
- $WSS_i$ = working-set size of process $P_i$ (pages referenced in most recent Δ).
- $D = \sum WSS_i$ = total demand for frames.

**If $D > m$ (total frames) ⇒ thrashing.**
Policy: if D > m, suspend a process.

---

## 9.13 Page-Fault Frequency (PFF)

Direct way to control thrashing:
- Set upper and lower bounds on desired page-fault rate.
- If actual rate **exceeds upper bound**, allocate the process another frame.
- If rate **falls below lower bound**, take a frame away.
- If no free frames and rate is too high, suspend a process.

---

## 9.14 Likely Exam Questions

1. Define virtual memory. State its advantages.
2. Explain demand paging. List the steps in handling a page fault.
3. State the EAT formula and compute it for given values.
4. Find p (max acceptable page-fault rate) for a given EAT bound.
5. What is COW? How does it improve `fork()`?
6. Compare FIFO, OPT, LRU page replacement on a given reference string and count page faults.
7. Demonstrate Belady's anomaly.
8. Explain the working-set model and its role in detecting thrashing.
9. Define thrashing; explain its cause and remedies.
10. Describe the page-fault frequency (PFF) approach to controlling thrashing.

### Practice numericals

**Problem A.** Reference string `1 2 3 4 1 2 5 1 2 3 4 5`. Count page faults for FIFO with 3 frames vs 4 frames.
- 3 frames: **9 page faults**.
- 4 frames: **10 page faults** (Belady's anomaly).

**Problem B.** Reference string `7 0 1 2 0 3 0 4 2 3 0 3 2` with 3 frames; compute LRU page faults.
- Page faults under LRU: **count step by step** — answer ≈ 9 (depending on string and starting state).

**Problem C.** Memory access = 100 ns; page fault service = 25 ms; what is acceptable p for EAT ≤ 200 ns?
- 200 ≥ (1-p)·100 + p·25,000,100.
- 100 ≥ p·25,000,000 → p ≤ 4 × 10⁻⁶ → **roughly 1 fault per 250,000 accesses.**
