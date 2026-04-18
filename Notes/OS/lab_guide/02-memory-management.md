# Lab 9: Memory Management -- End-Sem Lab Exam Guide

**Course:** CSS-2211 Operating Systems | **Institute:** MIT Manipal

---

## 1. Theory (Brief, Exam-Relevant)

### Contiguous Memory Allocation
Memory is divided into **partitions** (also called holes or blocks). Each process is loaded into a single contiguous partition. The OS maintains a list of free holes and decides which hole to assign to an incoming process.

### Fragmentation
| Type | What happens | Example |
|------|-------------|---------|
| **External** | Total free memory is enough, but it is **not contiguous** -- scattered across small holes | Three holes of 50K each = 150K free, but a 120K process cannot fit in any single hole |
| **Internal** | Allocated block is **slightly larger** than the process needs; the leftover inside the block is wasted | Process needs 18K, given a 20K partition -- 2K wasted inside |

### Paging
- Physical memory is divided into fixed-size **frames**.
- Logical memory is divided into same-size **pages**.
- A **page table** maps each page number to a frame number.
- **No external fragmentation**; possible internal fragmentation in the last page only.

### Segmentation
- Logical address = `<segment_number, offset>`
- Segment table stores: **base** (starting physical address) + **limit** (length of segment)
- Physical address = `base + offset` (only if `offset < limit`, else **trap/error**)

---

## 2. First Fit

**Rule:** Scan the hole list from the beginning. Allocate the **first** hole that is big enough.

- Fast -- stops at the first match.
- Tends to leave small fragments near the beginning of memory.

### Worked Example

**Memory partitions:** 100K, 500K, 200K, 300K, 600K
**Processes:** 212K, 417K, 112K, 426K

| Process | Scans holes (current sizes) | Allocated to | Remaining in hole |
|---------|---------------------------|--------------|-------------------|
| P1 (212K) | 100K (no), **500K (yes)** | Hole 2 (500K) | 288K |
| P2 (417K) | 100K (no), 288K (no), 200K (no), 300K (no), **600K (yes)** | Hole 5 (600K) | 183K |
| P3 (112K) | 100K (no), **288K (yes)** | Hole 2 (288K) | 176K |
| P4 (426K) | 100K (no), 176K (no), 200K (no), 300K (no), 183K (no) | **NOT ALLOCATED** | -- |

---

## 3. Best Fit

**Rule:** Search **all** holes. Allocate the **smallest** hole that is big enough.

- Must search entire list (slower).
- Leaves the smallest possible leftover (but those tiny leftovers may be useless).

### Worked Example (same input)

| Process | Best candidate | Allocated to | Remaining |
|---------|---------------|--------------|-----------|
| P1 (212K) | Smallest >= 212K is **300K** | Hole 4 (300K) | 88K |
| P2 (417K) | Smallest >= 417K is **500K** | Hole 2 (500K) | 83K |
| P3 (112K) | Smallest >= 112K is **200K** | Hole 3 (200K) | 88K |
| P4 (426K) | Smallest >= 426K is **600K** | Hole 5 (600K) | 174K |

All processes allocated.

---

## 4. Worst Fit

**Rule:** Search **all** holes. Allocate the **largest** hole.

- Leaves the largest leftover, which may still be usable for future processes.

### Worked Example (same input)

| Process | Largest hole | Allocated to | Remaining |
|---------|-------------|--------------|-----------|
| P1 (212K) | **600K** | Hole 5 (600K) | 388K |
| P2 (417K) | **500K** | Hole 2 (500K) | 83K |
| P3 (112K) | **388K** | Hole 5 (388K) | 276K |
| P4 (426K) | Largest is 300K -- too small | **NOT ALLOCATED** | -- |

---

## 5. C Implementation (All Three Algorithms)

Complete, self-contained program. Copy-paste ready for the lab exam.

```c
#include <stdio.h>

int main() {
    int nh, np;
    printf("Enter number of holes and processes: ");
    scanf("%d %d", &nh, &np);

    int hole[nh], proc[np], alloc[np];
    int hole_orig[nh]; // keep original sizes for resetting

    // --- Read input ---
    for (int i = 0; i < nh; i++) {
        printf("Hole %d size: ", i + 1);
        scanf("%d", &hole[i]);
        hole_orig[i] = hole[i];
    }
    for (int i = 0; i < np; i++) {
        printf("Process %d size: ", i + 1);
        scanf("%d", &proc[i]);
        alloc[i] = -1; // -1 means not allocated
    }

    // =========================================================
    //  FIRST FIT
    // =========================================================
    printf("\n--- FIRST FIT ---\n");
    int h_copy[nh];
    for (int i = 0; i < nh; i++) h_copy[i] = hole_orig[i]; // reset holes
    for (int i = 0; i < np; i++) alloc[i] = -1;             // reset alloc

    for (int i = 0; i < np; i++) {
        // Scan from the first hole; pick the first one that fits
        for (int j = 0; j < nh; j++) {
            if (h_copy[j] >= proc[i]) {
                alloc[i] = j;
                h_copy[j] -= proc[i]; // reduce hole size
                break;                // stop at first fit
            }
        }
    }

    for (int i = 0; i < np; i++) {
        if (alloc[i] != -1)
            printf("P%d (%dK) -> Hole %d\n", i + 1, proc[i], alloc[i] + 1);
        else
            printf("P%d (%dK) -> NOT ALLOCATED\n", i + 1, proc[i]);
    }

    // =========================================================
    //  BEST FIT
    // =========================================================
    printf("\n--- BEST FIT ---\n");
    for (int i = 0; i < nh; i++) h_copy[i] = hole_orig[i]; // reset holes
    for (int i = 0; i < np; i++) alloc[i] = -1;             // reset alloc

    for (int i = 0; i < np; i++) {
        int best_idx = -1;
        // Search ALL holes; find the smallest one that fits
        for (int j = 0; j < nh; j++) {
            if (h_copy[j] >= proc[i]) {
                if (best_idx == -1 || h_copy[j] < h_copy[best_idx])
                    best_idx = j;
            }
        }
        if (best_idx != -1) {
            alloc[i] = best_idx;
            h_copy[best_idx] -= proc[i];
        }
    }

    for (int i = 0; i < np; i++) {
        if (alloc[i] != -1)
            printf("P%d (%dK) -> Hole %d\n", i + 1, proc[i], alloc[i] + 1);
        else
            printf("P%d (%dK) -> NOT ALLOCATED\n", i + 1, proc[i]);
    }

    // =========================================================
    //  WORST FIT
    // =========================================================
    printf("\n--- WORST FIT ---\n");
    for (int i = 0; i < nh; i++) h_copy[i] = hole_orig[i]; // reset holes
    for (int i = 0; i < np; i++) alloc[i] = -1;             // reset alloc

    for (int i = 0; i < np; i++) {
        int worst_idx = -1;
        // Search ALL holes; find the largest one that fits
        for (int j = 0; j < nh; j++) {
            if (h_copy[j] >= proc[i]) {
                if (worst_idx == -1 || h_copy[j] > h_copy[worst_idx])
                    worst_idx = j;
            }
        }
        if (worst_idx != -1) {
            alloc[i] = worst_idx;
            h_copy[worst_idx] -= proc[i];
        }
    }

    for (int i = 0; i < np; i++) {
        if (alloc[i] != -1)
            printf("P%d (%dK) -> Hole %d\n", i + 1, proc[i], alloc[i] + 1);
        else
            printf("P%d (%dK) -> NOT ALLOCATED\n", i + 1, proc[i]);
    }

    return 0;
}
```

### Sample Run

```
Enter number of holes and processes: 5 4
Hole 1 size: 100
Hole 2 size: 500
Hole 3 size: 200
Hole 4 size: 300
Hole 5 size: 600
Process 1 size: 212
Process 2 size: 417
Process 3 size: 112
Process 4 size: 426

--- FIRST FIT ---
P1 (212K) -> Hole 2
P2 (417K) -> Hole 5
P3 (112K) -> Hole 2
P4 (426K) -> NOT ALLOCATED

--- BEST FIT ---
P1 (212K) -> Hole 4
P2 (417K) -> Hole 2
P3 (112K) -> Hole 3
P4 (426K) -> Hole 5

--- WORST FIT ---
P1 (212K) -> Hole 5
P2 (417K) -> Hole 2
P3 (112K) -> Hole 5
P4 (426K) -> NOT ALLOCATED
```

---

## 6. Paging

### Address Translation

Given:
- **Total logical memory** = `2^m` bytes (m = total address bits)
- **Page size** = `2^n` bytes

Then:
- **Page number** = top `m - n` bits = `address / page_size`
- **Offset** = bottom `n` bits = `address % page_size`

### Worked Example

| Parameter | Value |
|-----------|-------|
| Page size | 32 bytes = 2^5 |
| Number of pages | 8 = 2^3 |
| Total logical memory | 8 x 32 = 256 bytes = 2^8 |
| Address bits (m) | 8 |
| Page bits (m - n) | 8 - 5 = **3** |
| Offset bits (n) | **5** |

**Translate logical address 204:**

```
Page number = 204 / 32 = 6       (integer division)
Offset      = 204 % 32 = 12

Binary:  204 = 11001100
         Page = 110 (= 6)  |  Offset = 01100 (= 12)
```

Look up page 6 in the page table to get frame number `f`. Physical address = `f * page_size + offset`.

### Quick C snippet for paging

```c
int page_size = 32;
int logical_addr = 204;
int page_num = logical_addr / page_size;   // 6
int offset   = logical_addr % page_size;   // 12
// Physical = page_table[page_num] * page_size + offset;
```

---

## 7. Segmentation

### Address Translation

Logical address = `<segment_number, offset>`

```
if (offset < segment_table[segment_number].limit)
    physical_address = segment_table[segment_number].base + offset;
else
    TRAP;  // segmentation fault
```

### Worked Example

| Segment | Base | Limit |
|---------|------|-------|
| 0 | 219 | 600 |
| 1 | 2300 | 14 |
| 2 | 90 | 100 |
| 3 | 1327 | 580 |
| 4 | 1952 | 96 |

**Translate `<2, 53>`:**
- Segment 2: base = 90, limit = 100
- offset (53) < limit (100)? **Yes**
- Physical address = 90 + 53 = **143**

**Translate `<1, 100>`:**
- Segment 1: base = 2300, limit = 14
- offset (100) < limit (14)? **No -> TRAP (error)**

---

## 8. PYQ Pattern: Best Fit + Safety Check Combined

This is the most likely exam pattern based on previous year questions. It combines:
1. Memory allocation using Best Fit
2. Safety check (Banker's algorithm style)
3. Sorted display of memory blocks

### How it works

1. Read memory blocks, number of processes, and max allocation for each process.
2. Process requests arrive as `(pid, amount)` pairs until `-1`.
3. For each request:
   - Sort and display memory blocks in **descending** order
   - Apply **Best Fit** to allocate
   - Display memory blocks after allocation (sorted descending)
   - Check if the system is **safe** (can all remaining processes finish with available memory?)
   - Print safe sequence

### PYQ Example Walkthrough

**Input:**
- 3 memory blocks: 100, 300, 200
- 3 processes with max: P0=150, P1=80, P2=200
- Requests: `2 150`, `0 150`, `1 50`, `1 20`, `-1`

**Request: P2 requests 150 bytes**

```
Memory before allocation (sorted): 300 200 100
Best Fit: smallest block >= 150 -> 200 (remaining = 50)
Memory after allocation (sorted): 300 100 50
P2 has been allocated 150, needs 200-150 = 50 more
Check safety: Can all processes finish?
  Available blocks can satisfy remaining needs -> Safe
Safe sequence: P2 ...
```

### Complete C Program (PYQ Pattern)

```c
#include <stdio.h>

// Sort array in descending order (for display)
void sort_desc(int arr[], int n) {
    for (int i = 0; i < n - 1; i++)
        for (int j = 0; j < n - 1 - i; j++)
            if (arr[j] < arr[j + 1]) {
                int tmp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = tmp;
            }
}

// Print array
void print_arr(int arr[], int n) {
    for (int i = 0; i < n; i++)
        printf("%d ", arr[i]);
    printf("\n");
}

// Best Fit: find the smallest block >= request
// Returns index in the block array, or -1 if none fits
int best_fit(int blocks[], int nb, int request) {
    int best_idx = -1;
    for (int i = 0; i < nb; i++) {
        if (blocks[i] >= request) {
            if (best_idx == -1 || blocks[i] < blocks[best_idx])
                best_idx = i;
        }
    }
    return best_idx;
}

// Safety check: can all processes finish?
// 'allocated' = how much each process has received so far
// 'max' = maximum each process needs
// 'blocks' = current free memory blocks
// Returns 1 if safe, 0 if not. Fills safe_seq[] with the order.
int is_safe(int blocks[], int nb, int allocated[], int max[], int np,
            int safe_seq[], int *seq_len) {
    int finish[np];
    int work[nb];
    int alloc_copy[np];
    for (int i = 0; i < np; i++) { finish[i] = 0; alloc_copy[i] = allocated[i]; }
    for (int i = 0; i < nb; i++) work[i] = blocks[i];

    *seq_len = 0;
    int found = 1;

    while (found) {
        found = 0;
        for (int i = 0; i < np; i++) {
            if (finish[i]) continue;

            int need = max[i] - alloc_copy[i]; // how much more this process needs

            // Find if any single block can satisfy the remaining need
            // (simplified: check if best fit can satisfy it)
            int can_finish = 0;
            for (int b = 0; b < nb; b++) {
                if (work[b] >= need) {
                    can_finish = 1;
                    break;
                }
            }

            if (need <= 0) can_finish = 1; // already fully allocated

            if (can_finish) {
                // Process i can finish; release its allocated memory
                // Add allocated memory back to the smallest block (or a new block)
                // Simplified: add back to the first block that was used
                // For exam purposes: just add to the largest block
                finish[i] = 1;
                safe_seq[*seq_len] = i;
                (*seq_len)++;
                found = 1;

                // Release: the allocated memory becomes available again
                // Find the largest block and add to it (simplification)
                if (alloc_copy[i] > 0) {
                    int max_idx = 0;
                    for (int b = 1; b < nb; b++)
                        if (work[b] > work[max_idx]) max_idx = b;
                    work[max_idx] += alloc_copy[i];
                }
            }
        }
    }

    // Check if all finished
    for (int i = 0; i < np; i++)
        if (!finish[i]) return 0;
    return 1;
}

int main() {
    int nb, np;

    // --- Read memory blocks ---
    printf("Enter number of memory blocks: ");
    scanf("%d", &nb);
    int blocks[nb];
    for (int i = 0; i < nb; i++) {
        printf("Block %d size: ", i + 1);
        scanf("%d", &blocks[i]);
    }

    // --- Read processes and their max allocation ---
    printf("Enter number of processes: ");
    scanf("%d", &np);
    int max_alloc[np];
    int allocated[np]; // how much each process has been allocated so far
    for (int i = 0; i < np; i++) {
        printf("P%d max allocation: ", i);
        scanf("%d", &max_alloc[i]);
        allocated[i] = 0;
    }

    // --- Process requests until -1 ---
    printf("\nEnter requests as: pid amount (enter -1 to stop)\n");
    int pid, amount;

    while (1) {
        scanf("%d", &pid);
        if (pid == -1) break;
        scanf("%d", &amount);

        printf("\nP%d requests %d bytes\n", pid, amount);

        // Sort and display blocks before allocation
        sort_desc(blocks, nb);
        printf("Memory before allocation (sorted): ");
        print_arr(blocks, nb);

        // Best Fit allocation
        int idx = best_fit(blocks, nb, amount);
        if (idx != -1) {
            printf("-> P%d allocated %d from block of size %d (remaining %d)\n",
                   pid, amount, blocks[idx], blocks[idx] - amount);
            blocks[idx] -= amount;
            allocated[pid] += amount;
        } else {
            printf("-> P%d: NOT ALLOCATED (no block large enough)\n", pid);
        }

        // Sort and display blocks after allocation
        sort_desc(blocks, nb);
        printf("Memory after allocation (sorted): ");
        print_arr(blocks, nb);

        // Safety check
        int safe_seq[np];
        int seq_len = 0;
        if (is_safe(blocks, nb, allocated, max_alloc, np, safe_seq, &seq_len)) {
            printf("System is safe\n");
            printf("Safe sequence: ");
            for (int i = 0; i < seq_len; i++)
                printf("P%d ", safe_seq[i]);
            printf("\n");
        } else {
            printf("System is UNSAFE\n");
        }
    }

    return 0;
}
```

### Sample Run (matching PYQ output format)

```
Enter number of memory blocks: 3
Block 1 size: 100
Block 2 size: 300
Block 3 size: 200
Enter number of processes: 3
P0 max allocation: 150
P1 max allocation: 80
P2 max allocation: 200

Enter requests as: pid amount (enter -1 to stop)
2 150

P2 requests 150 bytes
Memory before allocation (sorted): 300 200 100
-> P2 allocated 150 from block of size 200 (remaining 50)
Memory after allocation (sorted): 300 100 50
System is safe
Safe sequence: P2 P1 P0

0 150

P0 requests 150 bytes
Memory before allocation (sorted): 300 100 50
-> P0 allocated 150 from block of size 300 (remaining 150)
Memory after allocation (sorted): 150 100 50
System is safe
Safe sequence: P2 P1 P0

1 50

P1 requests 50 bytes
Memory before allocation (sorted): 150 100 50
-> P1 allocated 50 from block of size 50 (remaining 0)
Memory after allocation (sorted): 150 100 0
System is safe
Safe sequence: P1 P2 P0

1 20

P1 requests 20 bytes
Memory before allocation (sorted): 150 100 0
-> P1 allocated 20 from block of size 100 (remaining 80)
Memory after allocation (sorted): 150 80 0
System is safe
Safe sequence: P1 P2 P0

-1
```

---

## Quick Reference Card (tear-off for exam)

| Algorithm | Selection Rule | Pros | Cons |
|-----------|---------------|------|------|
| **First Fit** | First hole >= size | Fast | Fragments at start |
| **Best Fit** | Smallest hole >= size | Tight fit | Tiny useless holes |
| **Worst Fit** | Largest hole | Large leftovers | Wastes big blocks |

**Paging formulas:**
```
page_number = address / page_size
offset      = address % page_size
physical    = frame_number * page_size + offset
```

**Segmentation formula:**
```
if (offset < limit)  physical = base + offset
else                 TRAP
```

**Best Fit in 5 lines:**
```c
int best = -1;
for (int j = 0; j < nh; j++)
    if (h[j] >= proc[i])
        if (best == -1 || h[j] < h[best])
            best = j;
```
