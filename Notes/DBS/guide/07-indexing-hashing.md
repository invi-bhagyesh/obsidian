# 07 — Indexing and Hashing

## 7.1 File Organization

A database is stored as a collection of files; each file is a sequence of **records**; each record is a sequence of **fields**.

### Fixed-length records
- Record $i$ starts at byte $n \cdot (i-1)$.
- Records may not cross block boundaries.
- **Deletion options:**
  1. Shift records up.
  2. Replace deleted record with the last one.
  3. Use a **free list** (linked list of empty slots).

### Variable-length records
Sources:
- Multiple record types in the same file.
- Variable-length attributes (`varchar`).
- Repeating fields.

**Layout:** fixed-length attributes first; variable-length attributes are represented by `(offset, length)` pointing to the actual data; null values via a bitmap.

### Slotted page structure
Block header contains:
- Number of record entries
- End of free space
- Location and size of each record

Records can move within the page; pointers point to header entries (indirect), not records directly.

### Storing large objects (BLOB/CLOB)
- Larger than a page; stored as files (in OS or DBMS-managed) or split into pieces in a separate relation.

---

## 7.2 Organization of Records in Files

- **Heap** — record placed anywhere with free space.
- **Sequential** — records sorted by a search-key value.
- **Multitable clustering** — records of related relations stored in the same file (good for joins).
- **B+-tree file organization** — leaves contain records.
- **Hashing** — hash function on search key determines block.

### Heap file organization
- Records do not move once allocated.
- Use a **free-space map** — array of block-fill fractions; can have a 2-level map (max of every 4 entries).

### Sequential file organization
- Suitable for sequential processing.
- Maintain pointer chains across blocks.
- Insertions:
  - If free space exists, insert in place.
  - Otherwise, place in **overflow block** and update pointer chain.
- Periodic reorganization required.

### Multitable clustering file organization
Store related records together (e.g., department + its instructors).
- Good for `department ⨝ instructor` queries.
- Bad for queries on department alone.

---

## 7.3 Indexing — Basic Concepts

- **Search key** — attribute(s) used to look up records.
- An **index** consists of records `(search-key, pointer)`.
- Index files are usually much smaller than the relation.

### Two basic kinds
- **Ordered indices** — search keys stored sorted.
- **Hash indices** — search keys distributed via a hash function across buckets.

### Index Evaluation Metrics
- Access types supported.
- Access time.
- Insertion time.
- Deletion time.
- Space overhead.

---

## 7.4 Ordered Indices

- **Clustering (primary) index** — index whose search key defines the sequential order of the file.
- **Secondary (nonclustering) index** — search key differs from physical order.
- **Index-sequential file** — sequential file with a clustering index on the search key.

### Dense Index
One index entry per **search-key value**.
- `(K, pointer to first record with that K)`.

### Sparse Index
- One index entry per **block** (or for some keys).
- For lookup: find largest entry ≤ K; scan from there.
- Less space, less maintenance, slower than dense.
- Applicable only when records are sequentially ordered.

**Tradeoff:**
- For clustered: sparse index, one entry per block.
- For unclustered: secondary index must be dense.

### Multilevel Index
Treat a large index as a sequential file and build a sparse index over it (the **outer index**). The original is the **inner index**. Repeat as needed.

### Index Update
- **Deletion:**
  - Dense: remove the search key.
  - Sparse: replace the entry with the next search-key value, or delete.
- **Insertion:**
  - Dense: insert if not present.
  - Sparse: only when a new block is created.

### Indices on Multiple Keys
Composite search keys, sorted lexicographically. e.g., index on `(name, ID)`.

---

## 7.5 B+-Tree Index Files

B+-trees solve the problem of indexed-sequential files: performance does not degrade with insertions/deletions.

### Properties
- All paths from root to leaf are the same length.
- Each non-root, non-leaf node has between $\lceil n/2 \rceil$ and $n$ children.
- A leaf has between $\lceil (n-1)/2 \rceil$ and $n - 1$ values.
- **Special cases:** Root may have between 0 and $n - 1$ values (if a leaf), or between 2 and $n$ children.

### Node Structure
```
| P1 | K1 | P2 | K2 | ... | P(n-1) | K(n-1) | Pn |
```
- $K_1 < K_2 < \ldots < K_{n-1}$.
- For non-leaf nodes, $P_i$ points to a child subtree.
- For leaf nodes, $P_i$ points to record (or bucket) with key $K_i$; $P_n$ points to next leaf.

### Search algorithm
```
function find(v):
    C = root
    while C is not a leaf:
        i = least number such that v ≤ K_i
        if no such i: C = last child pointer of C
        elif v == K_i: C = P_{i+1}
        else: C = P_i
    if some K_i in C equals v: return P_i
    else: return null
```
For range queries, use `findRange(lb, ub)`.

### Performance
- Tree height $\le \lceil \log_{\lceil n/2 \rceil}(K) \rceil$ for $K$ keys.
- Typical: $n \approx 100$ (4 KB block, 40 B/entry); 1 million keys → $\log_{50}(10^6) \approx 4$ levels.

### Insertion
1. Find the leaf where the key would go.
2. If room, insert.
3. If full: **split** the leaf — first $\lceil n/2 \rceil$ stay; rest go to a new node $p$. Insert $(\text{first key of } p, p)$ into parent.
4. If parent is full, recursively split.
5. In the worst case, the root splits; tree height grows.

### Splitting non-leaf
- Copy entries to a buffer of size $n+1$ pointers and $n$ keys.
- Place first $\lceil n/2 \rceil$ pointers and corresponding keys in original; rest in new node.
- Insert middle key into parent.

### Deletion
1. Remove the entry.
2. If underfull and entries fit with sibling: **merge**. Recursively delete the parent's entry.
3. If underfull but cannot merge: **redistribute** entries with sibling. Update parent's separator.
4. If root has only one child after deletion, delete root.

---

## 7.6 Worked B+-Tree Examples

### Example tree (n = 6)
```
                [El Said | Mozart]
               /        |        \
[Brandt|Califieri|Crick|Einstein]  [El Said|Gold|Katz|Kim]  [Mozart|Singh|Srinivasan|Wu]
```
- Leaves carry between 3 and 5 values.
- Non-leaf, non-root: 3 to 6 children.
- Root: at least 2 children.

### Insertion of "Adams"
Leaf `[Brandt, Califieri, Crick]` is full and about to overflow. Split into `[Adams, Brandt]` and `[Califieri, Crick]`. Add `Califieri` to parent.

### Insertion of "Lamport"
Leaf `[Gold, Katz, Kim]` overflows when adding Lamport — split into `[Gold, Katz]` and `[Kim, Lamport]`. Parent overflows → split. Root grows.

### Deletion of "Srinivasan"
Leaf becomes underfull → merge with sibling. Affected separator removed from parent.

### Deletion of "Singh, Wu"
Underflow → borrow `Kim` from left sibling; update parent's separator.

### Deletion of "Gold"
Underflow → merge with sibling. Parent underflow → merge again. Root reduces in height.

---

## 7.7 B+-Tree File Organization

- Leaves store actual records (instead of pointers).
- Keeps records clustered.
- Insertions/deletions same as B+-tree index.

---

## 7.8 B-Tree Index Files

- Like B+-tree but search keys appear only once across the tree.
- Non-leaf nodes also store record pointers.

**Pros:** less storage, can find in higher levels.
**Cons:** non-leaf nodes are larger → smaller fanout → deeper tree; harder insertion/deletion.

In practice B+-trees dominate.

---

## 7.9 Static Hashing

- A **bucket** is a unit of storage (typically a block) holding one or more entries.
- A hash function $h$ maps search key → bucket address.
- **Hash index** — buckets store entries with pointers to records.
- **Hash file organization** — buckets store records.

### Bucket Overflow
Causes:
- Insufficient buckets.
- Skewed distribution: identical keys; non-uniform hash.

**Overflow chaining (closed hashing):**
- Overflow buckets linked in a chain.
- Open hashing (no overflow buckets) is unsuitable for DB.

### Example: hash file by `dept_name`
Assume binary representation of i-th character is integer $i$; $h(\text{name}) = \sum$ chars mod 10.
- $h(\text{Music}) = 1, h(\text{History}) = 2, h(\text{Physics}) = h(\text{Elec. Eng.}) = 3$, etc.

Buckets contain instructor records grouped by department.

### Deficiencies of Static Hashing
- Fixed bucket count.
- File grows → many overflows.
- File shrinks → wasted space.
- Periodic rehash is expensive.

---

## 7.10 Dynamic Hashing

- **Periodic rehashing**: when load > threshold, double table and rehash entries.
- **Linear hashing** — incremental rehashing.
- **Extendable hashing** — directory-based; doubles directory without doubling buckets; suited for disk-based hashing.

---

## 7.11 Comparison of Ordered Indexing vs Hashing

| Factor | Ordered (B+-tree) | Hashing |
|---|---|---|
| Equality lookup | Good | Better |
| Range queries | Good | Bad |
| Insert/delete cost | Good (logarithmic) | Variable (overflow possible) |
| Space | Predictable | May waste due to overflows |

In practice:
- PostgreSQL supports hash indices but discourages them.
- Oracle supports static hash organization but not hash indices.
- SQL Server uses only B+-trees.

---

## 7.12 Multiple-Key Access

For:
```sql
select ID from instructor
where dept_name='Finance' and salary=80000;
```
Strategies with single-attribute indices:
1. Use index on dept_name; filter on salary.
2. Use index on salary; filter on dept_name.
3. Use both indices; intersect record pointers.

### Composite Index
Index on `(dept_name, salary)` directly answers the query without intersecting.
- Also handles `dept_name='Finance' and salary < 80000` efficiently.
- Cannot efficiently handle `dept_name < 'Finance' and salary = 80000` (lexicographic ordering puts dept_name first).

### Index Definition in SQL
```sql
create index b-index on branch(branch_name);
create unique index <name> on <relation>(<attribute>);
drop index <name>;
```

---

## 7.13 Bitmap Indices

- Best for attributes with few distinct values (gender, country, income-level).
- For each value, a **bitmap** = bit per record (1 if record has that value).

### Example
| record # | ID | gender | income_level |
|---|---|---|---|
| 0 | 76766 | m | L1 |
| 1 | 22222 | f | L2 |
| 2 | 12121 | f | L1 |
| 3 | 15151 | m | L4 |
| 4 | 58583 | f | L3 |

Bitmaps:
- gender m: `10010`; f: `01101`.
- income L1: `10100`; L2: `01000`; L3: `00001`; L4: `00010`.

### Bitmap operations
- AND, OR, NOT — bit-level operations.
- e.g., males with L1: `10010 AND 10100 = 10000`.
- Useful for multi-attribute queries; very fast.

### Size
- 1 bit per record; if record is 100 bytes, bitmap is 1/800 of relation size.

---

## 7.14 Likely Exam Questions

1. Differentiate clustering vs secondary index.
2. Differentiate dense vs sparse index.
3. Define multilevel index. Why is it useful?
4. State the B+-tree properties (constraints on leaf/non-leaf nodes).
5. Insert keys into a B+-tree of order $n$ — show splits.
6. Delete keys from a B+-tree — show merges/redistributions.
7. Compute B+-tree height for $K$ keys with given $n$.
8. Differentiate B+-tree vs B-tree.
9. Define static hashing; explain overflow chaining.
10. Compare ordered indices and hashing.
11. Explain bitmap indices and operations.

### Practice numericals

**Problem A.** B+-tree of order $n = 4$ (each node holds 3 keys, 4 children). Insert 1, 4, 7, 10, 17, 21 into an empty tree; show each step.
- After 1, 4, 7: leaf = `[1,4,7]`.
- Insert 10: split into `[1,4]` and `[7,10]`; root = `[7]`.
- Insert 17: leaf `[7,10]` becomes `[7,10,17]`.
- Insert 21: split into `[7,10]` and `[17,21]`; root = `[7,17]`.

**Problem B.** With $n = 100$ and 1,000,000 records, height ≤ $\log_{50}(10^6) \approx 4$.

**Problem C.** Bitmap query — find females with income L1:
- gender f = 01101; L1 = 10100. AND = 00100 → record 2.
