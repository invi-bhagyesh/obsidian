# 03 — Query Processing

## 3.1 Steps in Query Processing

```
query → parser & translator → relational-algebra expression
                            ↓
                      optimizer (uses statistics)
                            ↓
                      evaluation plan
                            ↓
                      evaluation engine (uses data)
                            ↓
                      query output
```

Three main steps:
1. **Parsing and translation** — parser checks syntax and converts the query to an internal relational-algebra form.
2. **Optimization** — among many equivalent plans, choose lowest-cost one.
3. **Evaluation** — execute the chosen plan.

### Equivalent Expressions
- $\sigma_{\text{salary}<75000}(\Pi_{\text{salary}}(\text{instructor})) \equiv \Pi_{\text{salary}}(\sigma_{\text{salary}<75000}(\text{instructor}))$
- Each operation can be implemented by several algorithms. An annotated expression specifying the algorithm is an **evaluation plan**.

---

## 3.2 Measures of Query Cost

Time cost factors: disk access, CPU, network.

**Cost can be measured by:**
- **Response time** — total elapsed time, OR
- **Total resource consumption** (preferred — easier to estimate, fairer in shared systems).

CPU costs are usually ignored for simplicity. Network costs matter for distributed/parallel systems. We don't include the cost of writing final output.

### Disk cost components
- Seeks: number_of_seeks × average_seek_cost
- Block reads: number_of_blocks_read × average_block_read_cost
- Block writes: number_of_blocks_written × average_block_write_cost

**Simplified cost formula** using:
- $t_T$ — time to transfer one block (read or write)
- $t_S$ — time for one seek

$$\text{Cost} = b \cdot t_T + S \cdot t_S$$

Where $b$ = block transfers, $S$ = seeks.

**Typical values (4 KB blocks):**
- High-end magnetic disk: $t_S \approx 4$ ms, $t_T \approx 0.1$ ms
- SSD: $t_S \approx 20$–$90$ μs, $t_T \approx 2$–$10$ μs

We typically use **worst-case estimates** (no data initially in buffer).

---

## 3.3 Selection Operation

### A1 — Linear search (file scan)
- Scan each block, test each record.
- **Cost = $b_r$ block transfers + 1 seek**, where $b_r$ = number of blocks containing $r$.
- If condition is on a key attribute: average **cost = $b_r/2$ + 1 seek** (can stop when found).
- Works for any selection condition.

### A2 — Clustering index, equality on key
- Retrieve a single record.
- **Cost = $(h_i + 1) \cdot (t_T + t_S)$**, where $h_i$ = index height.

### A3 — Clustering index, equality on non-key
- Retrieve multiple records on consecutive blocks.
- $b$ = number of matching blocks.
- **Cost = $h_i \cdot (t_T + t_S) + t_S + b \cdot t_T$**

### A4 — Secondary index, equality
- Single record (search key is candidate key): **Cost = $(h_i + 1)(t_T + t_S)$**.
- Multiple records: each may be on a different block.
  - **Cost = $(h_i + n)(t_T + t_S)$**, where $n$ = number of records — can be very expensive!

### A5 — Clustering index, comparison (≥ V or ≤ V)
- For $\sigma_{A \ge V}(r)$: use index to find first tuple ≥ V; scan sequentially.
- For $\sigma_{A \le V}(r)$: scan from the start until first tuple > V; **don't use the index**.

### A6 — Secondary index, comparison
- For $\sigma_{A \ge V}(r)$: use index to find first entry ≥ V; scan index leaf pages.
- For $\sigma_{A \le V}(r)$: scan leaf pages from start until > V.
- Then retrieve records — **one I/O per record**. Linear scan may be cheaper for many matches.

---

## 3.4 Sorting

### Why sort
- Order by; group by; merge join; duplicate elimination.
- For relations that fit in memory: quicksort.
- For larger relations: **external sort-merge**.

### External Sort-Merge

Let $M$ = memory size in pages.

**Phase 1: Create sorted runs.**
```
i = 0
while not end of relation:
    Read M blocks of relation into memory
    Sort the in-memory blocks
    Write sorted data to run R_i
    i = i + 1
```
At end, there are $N$ runs.

**Phase 2: Merge the runs (N-way merge).**
- If $N < M$:
  - Use $N$ blocks for input runs and 1 block for output.
  - Read first block of each run into its buffer.
  - Repeatedly:
    1. Pick smallest record across all input buffers.
    2. Append to output buffer; if full, flush.
    3. If a buffer empties, read next block of that run.
- If $N \ge M$: do **multiple merge passes**, each merging $M-1$ runs at a time.
  - Each pass reduces the number of runs by factor $M-1$.
  - Example: $M = 11$, 90 runs → after 1 pass, 9 runs (each 10× longer).

### Cost analysis

Use $b_b$ buffer blocks per run (read/write $b_b$ at a time):
- Can merge $\lfloor M/b_b \rfloor - 1$ runs per pass.
- **Total merge passes = $\lceil \log_{\lfloor M/b_b \rfloor - 1}(b_r/M) \rceil$**.
- Block transfers per pass = $2 b_r$ (run creation also $2 b_r$). Final pass can skip writes.

**Total block transfers:**
$$b_r \cdot \left( 2 \left\lceil \log_{\lfloor M/b_b \rfloor - 1} (b_r/M) \right\rceil + 1 \right)$$

**Total seeks:**
$$2 \lceil b_r/M \rceil + \lceil b_r/b_b \rceil \cdot \left( 2 \lceil \log_{\lfloor M/b_b \rfloor - 1}(b_r/M) \rceil - 1 \right)$$

---

## 3.5 Join Operation — Algorithms

Several algorithms; choice based on cost estimate.

**Setup for examples:**
- student: 5,000 records, 100 blocks.
- takes: 10,000 records, 400 blocks.

### Nested-Loop Join
For $r \bowtie_\theta s$:
```
for each tuple t_r in r:
    for each tuple t_s in s:
        test (t_r, t_s) against θ
        if match, emit t_r ∘ t_s
```

- $r$ = outer relation, $s$ = inner.
- Works for any join condition; needs no indices.
- **Worst-case cost = $b_r \cdot b_s + b_r$ block transfers** (no buffer benefit).
- **Best case (s fits in memory):** $b_r + b_s$ block transfers.

### Block Nested-Loop Join
Process block-by-block instead of tuple-by-tuple:
```
for each block B_r of r:
    for each block B_s of s:
        for each tuple t_r in B_r:
            for each tuple t_s in B_s:
                if match, emit t_r ∘ t_s
```
- **Cost = $b_r \cdot b_s + b_r$ block transfers + $2 b_r$ seeks** (worst case).
- Can be improved if extra buffers are available.

### Indexed Nested-Loop Join
If index is available on the inner relation's join attribute:
- For each tuple in $r$, do an index lookup in $s$.
- **Cost = $b_r (t_T + t_S) + n_r \cdot c$** where $c$ = index lookup cost, $n_r$ = number of tuples in $r$.

### Merge Join
- Both relations sorted on the join attribute.
- Sequentially scan both, merging matching tuples.
- **Cost = $b_r + b_s$ block transfers + sort costs (if not already sorted).**

### Hash Join
- Partition both relations on the join attribute using a hash function.
- For each partition, perform an in-memory build (smaller side) and probe.
- **Cost ≈ $3(b_r + b_s)$** for the partitioning + build/probe phases.

---

## 3.6 Other Operations

### Duplicate elimination
- Sort and eliminate duplicates in a single pass; or use hashing.
- Cost similar to external sort.

### Projection
- Remove unwanted attributes; possibly eliminate duplicates.

### Set operations (∪, ∩, −)
- Sort both relations on all attributes; merge.

### Aggregation
- Group by: sort or hash on group attributes; aggregate within groups.

### Outer join
- Variants of merge or hash join with extra logic to retain unmatched tuples.

---

## 3.7 Likely Exam Questions

1. List the three steps of query processing.
2. State the simplified cost formula. What does $t_T, t_S$ represent?
3. Compare A1–A6 selection algorithms.
4. Describe external sort-merge. Compute number of passes required.
5. Compare nested-loop, block nested-loop, indexed nested-loop, merge, and hash joins.
6. Given a relation of 1000 blocks and a query with selection on a non-key attribute that is the clustering index attribute (matching 50 tuples on 5 blocks, $h_i = 2$), compute cost of A3.
   - Cost = $h_i (t_T + t_S) + t_S + b t_T = 2(0.1 + 4) + 4 + 5(0.1) = 8.2 + 4 + 0.5 = 12.7$ ms.
7. For external sort with $M = 5$ blocks, $b_b = 1$, $b_r = 100$, compute number of passes:
   - Initial: 100/5 = 20 runs. Merge factor = $\lfloor 5/1 \rfloor - 1 = 4$. Passes = $\lceil \log_4(100/5) \rceil = \lceil \log_4(20) \rceil = 3$.
