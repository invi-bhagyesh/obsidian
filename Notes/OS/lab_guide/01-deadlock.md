# Deadlock (Lab 8) -- End-Semester Lab Exam Guide

**CSS-2211 | MIT Manipal | 2-hour exam, 20 marks**

Compile: `gcc program.c -o program` then `./program`
Headers you need: `<stdio.h>`, `<stdbool.h>`

---

## 1. THEORY (exam-relevant only)

### What is Deadlock?
A set of blocked processes, each holding a resource and waiting for a resource held by another process in the set. Nobody can proceed.

Example: P1 holds R1, wants R2. P2 holds R2, wants R1. Deadlock.

### Four Necessary Conditions (ALL must hold)

| Condition | Meaning |
|---|---|
| **Mutual Exclusion** | At least one resource is non-sharable (only one process can use it at a time) |
| **Hold and Wait** | A process holds at least one resource AND waits for another |
| **No Preemption** | Resources cannot be forcibly taken away from a process |
| **Circular Wait** | P1 -> P2 -> P3 -> ... -> P1 circular chain of waiting |

### Methods for Handling Deadlocks

| Method | How |
|---|---|
| **Prevention** | Break one of the 4 conditions (e.g., impose ordering on resource requests to prevent circular wait) |
| **Avoidance** | Before granting a request, check if it leads to a safe state (Banker's Algorithm) |
| **Detection** | Let deadlocks happen, then detect and recover (kill processes / preempt resources) |

### Safe State vs Unsafe State

- **Safe state** = there exists a safe sequence (an ordering of ALL processes such that each can finish using currently available resources + resources held by all previously finished processes). Safe state means **no deadlock possible**.
- **Unsafe state** = no such ordering exists. Deadlock **MAY** occur (not guaranteed).
- Avoidance = ensure the system **never enters an unsafe state**.

---

## 2. BANKER'S ALGORITHM -- Safety Algorithm

This is the core algorithm. Know it cold.

### Data Structures

Let `n` = number of processes, `m` = number of resource types.

| Structure | Size | Meaning |
|---|---|---|
| `Available[m]` | 1D | How many of each resource are currently free |
| `Max[n][m]` | 2D | Maximum demand of each process |
| `Allocation[n][m]` | 2D | Currently allocated to each process |
| `Need[n][m]` | 2D | `Need[i][j] = Max[i][j] - Allocation[i][j]` (what each process still needs) |

### Algorithm Steps

```
1. Work = Available (copy), Finish[i] = false for all i

2. Find process i where:
   Finish[i] == false  AND  Need[i] <= Work  (for ALL resource types)
   If no such i exists, go to step 4

3. Work = Work + Allocation[i]    // process i finishes, releases its resources
   Finish[i] = true
   Add i to safe sequence
   Go to step 2

4. If ALL Finish[i] == true  -->  SAFE (print safe sequence)
   Otherwise                 -->  UNSAFE (deadlock possible)
```

### Worked Example

5 processes (P0-P4), 3 resource types (A, B, C). Total: A=10, B=5, C=7.

```
         Allocation    Max         Available
         A  B  C       A  B  C     A  B  C
P0       0  1  0       7  5  3     3  3  2
P1       2  0  0       3  2  2
P2       3  0  2       9  0  2
P3       2  1  1       2  2  2
P4       0  0  2       4  3  3
```

**Step 0: Calculate Need = Max - Allocation**

```
P0: 7-0, 5-1, 3-0 = 7  4  3
P1: 3-2, 2-0, 2-0 = 1  2  2
P2: 9-3, 0-0, 2-2 = 6  0  0
P3: 2-2, 2-1, 2-1 = 0  1  1
P4: 4-0, 3-0, 3-2 = 4  3  1
```

**Safety Check: Work = [3, 3, 2]**

```
Step 1: Scan all unfinished processes
  P0: Need [7,4,3] <= Work [3,3,2]?  7>3 NO
  P1: Need [1,2,2] <= Work [3,3,2]?  YES --> Execute P1
      Work = [3,3,2] + [2,0,0] = [5,3,2]

Step 2:
  P0: Need [7,4,3] <= Work [5,3,2]?  7>5 NO
  P2: Need [6,0,0] <= Work [5,3,2]?  6>5 NO
  P3: Need [0,1,1] <= Work [5,3,2]?  YES --> Execute P3
      Work = [5,3,2] + [2,1,1] = [7,4,3]

Step 3:
  P0: Need [7,4,3] <= Work [7,4,3]?  YES --> Execute P0
      Work = [7,4,3] + [0,1,0] = [7,5,3]

Step 4:
  P2: Need [6,0,0] <= Work [7,5,3]?  YES --> Execute P2
      Work = [7,5,3] + [3,0,2] = [10,5,5]

Step 5:
  P4: Need [4,3,1] <= Work [10,5,5]? YES --> Execute P4
```

**Safe sequence: P1 -> P3 -> P0 -> P2 -> P4. System is SAFE.**

### Complete C Implementation

```c
#include <stdio.h>
#include <stdbool.h>

int main() {
    int n, m;
    printf("Enter number of processes and resource types: ");
    scanf("%d %d", &n, &m);

    int alloc[n][m], max[n][m], need[n][m], avail[m];

    // --- Input ---
    printf("Enter Allocation matrix:\n");
	    for (int i = 0; i < n; i++)
        for (int j = 0; j < m; j++)
            scanf("%d", &alloc[i][j]);

    printf("Enter Max matrix:\n");
    for (int i = 0; i < n; i++)
        for (int j = 0; j < m; j++)
            scanf("%d", &max[i][j]);

    printf("Enter Available vector:\n");
    for (int j = 0; j < m; j++)
        scanf("%d", &avail[j]);

    // --- Calculate Need = Max - Allocation ---
    for (int i = 0; i < n; i++)
        for (int j = 0; j < m; j++)
            need[i][j] = max[i][j] - alloc[i][j];

    // --- Print Need matrix ---
    printf("\nNeed Matrix:\n");
    for (int i = 0; i < n; i++) {
        printf("P%d: ", i);
        for (int j = 0; j < m; j++)
            printf("%d ", need[i][j]);
        printf("\n");
    }

    // --- Safety Algorithm ---
    int work[m];
    bool finish[n];
    int safeSeq[n];
    int count = 0;

    // Step 1: Initialize
    for (int j = 0; j < m; j++) work[j] = avail[j];
    for (int i = 0; i < n; i++) finish[i] = false;

    // Step 2-3: Find processes that can run
    while (count < n) {
        bool found = false;
        for (int i = 0; i < n; i++) {
            if (!finish[i]) {
                // Check if Need[i] <= Work (all resource types)
                bool canRun = true;
                for (int j = 0; j < m; j++) {
                    if (need[i][j] > work[j]) {
                        canRun = false;
                        break;
                    }
                }
                if (canRun) {
                    // Process i can finish: release its resources
                    for (int j = 0; j < m; j++)
                        work[j] += alloc[i][j];
                    safeSeq[count++] = i;
                    finish[i] = true;
                    found = true;
                }
            }
        }
        if (!found) break;  // No process can run = stuck
    }

    // Step 4: Check result
    if (count == n) {
        printf("\nSystem is in SAFE state.\nSafe sequence: ");
        for (int i = 0; i < n; i++)
            printf("P%d%s", safeSeq[i], i < n - 1 ? " -> " : "\n");
    } else {
        printf("\nSystem is NOT in a safe state (DEADLOCK possible).\n");
    }

    return 0;
}
```

**Test input for the worked example:**
```
5 3
0 1 0  2 0 0  3 0 2  2 1 1  0 0 2
7 5 3  3 2 2  9 0 2  2 2 2  4 3 3
3 3 2
```

---

## 3. RESOURCE REQUEST ALGORITHM

When process `Pi` requests resources `Request[i]`:

```
1. If Request[i] > Need[i]       --> ERROR (exceeded max claim)
2. If Request[i] > Available     --> WAIT  (resources not available right now)
3. Pretend to allocate:
     Available    = Available    - Request[i]
     Allocation[i] = Allocation[i] + Request[i]
     Need[i]      = Need[i]      - Request[i]

   Run Safety Algorithm on the new state.
     If SAFE   --> grant the request (keep changes)
     If UNSAFE --> rollback and make process wait:
       Available    = Available    + Request[i]
       Allocation[i] = Allocation[i] - Request[i]
       Need[i]      = Need[i]      + Request[i]
```

### C Code for Resource Request (add after safety check)

```c
    // --- Resource Request Algorithm ---
    int req_pid;
    int request[m];
    printf("\nEnter requesting process ID: ");
    scanf("%d", &req_pid);
    printf("Enter request vector: ");
    for (int j = 0; j < m; j++)
        scanf("%d", &request[j]);

    // Step 1: Check Request <= Need
    bool valid = true;
    for (int j = 0; j < m; j++) {
        if (request[j] > need[req_pid][j]) {
            printf("Error: Request exceeds maximum claim!\n");
            valid = false;
            break;
        }
    }

    if (valid) {
        // Step 2: Check Request <= Available
        bool can_allocate = true;
        for (int j = 0; j < m; j++) {
            if (request[j] > avail[j]) {
                printf("Process must wait: resources not available.\n");
                can_allocate = false;
                break;
            }
        }

        if (can_allocate) {
            // Step 3: Pretend to allocate
            for (int j = 0; j < m; j++) {
                avail[j]          -= request[j];
                alloc[req_pid][j] += request[j];
                need[req_pid][j]  -= request[j];
            }

            // Recalculate safety (reuse same logic)
            int work2[m];
            bool finish2[n];
            int safeSeq2[n];
            int count2 = 0;

            for (int j = 0; j < m; j++) work2[j] = avail[j];
            for (int i = 0; i < n; i++) finish2[i] = false;

            while (count2 < n) {
                bool found2 = false;
                for (int i = 0; i < n; i++) {
                    if (!finish2[i]) {
                        bool canRun2 = true;
                        for (int j = 0; j < m; j++) {
                            if (need[i][j] > work2[j]) {
                                canRun2 = false;
                                break;
                            }
                        }
                        if (canRun2) {
                            for (int j = 0; j < m; j++)
                                work2[j] += alloc[i][j];
                            safeSeq2[count2++] = i;
                            finish2[i] = true;
                            found2 = true;
                        }
                    }
                }
                if (!found2) break;
            }

            if (count2 == n) {
                printf("Request GRANTED. New safe sequence: ");
                for (int i = 0; i < n; i++)
                    printf("P%d%s", safeSeq2[i], i < n - 1 ? " -> " : "\n");
            } else {
                // ROLLBACK
                printf("Request DENIED (would lead to unsafe state).\n");
                for (int j = 0; j < m; j++) {
                    avail[j]          += request[j];
                    alloc[req_pid][j] -= request[j];
                    need[req_pid][j]  += request[j];
                }
            }
        }
    }
```

---

## 4. DEADLOCK DETECTION

Similar to the safety algorithm but with two key differences:

| Safety Algorithm (Banker's) | Detection Algorithm |
|---|---|
| Uses `Need` matrix | Uses `Request` matrix (what each process is currently requesting, not max need) |
| `Finish[i]` starts as `false` for all | `Finish[i] = true` if `Allocation[i]` is all zeros (process holds nothing, can't be part of deadlock) |

**Detection result:** If any `Finish[i] == false` at the end, process `i` is **deadlocked**.

The C code is essentially the same as the safety algorithm -- just replace `need[i][j]` with `request[i][j]` and initialize `finish[i]` based on whether `alloc[i]` is all zeros.

```c
// Detection: initialize Finish differently
for (int i = 0; i < n; i++) {
    bool allZero = true;
    for (int j = 0; j < m; j++) {
        if (alloc[i][j] != 0) { allZero = false; break; }
    }
    finish[i] = allZero;  // true if process holds nothing
}

// Then run the same while loop, but compare request[i][j] > work[j]
// instead of need[i][j] > work[j]

// After the loop:
printf("Deadlocked processes: ");
bool deadlock = false;
for (int i = 0; i < n; i++) {
    if (!finish[i]) {
        printf("P%d ", i);
        deadlock = true;
    }
}
if (!deadlock) printf("None (no deadlock)");
printf("\n");
```

---

## 5. PYQ COMBO QUESTION: Best Fit + Simplified Safety Check

PYQ Q3/Q4 combine memory allocation with a simplified deadlock safety check. This is **single resource type** (memory bytes), not the full multi-resource Banker's.

### How the PYQ Pattern Works

1. Input: number of processes, number of memory blocks, block sizes, max allocation per process
2. Input loop: `(pid, request_size)` pairs until `-1`
3. For each request:
   - Display memory blocks sorted (descending) BEFORE allocation
   - Apply **Best Fit** (smallest block that fits)
   - Display memory blocks sorted (descending) AFTER allocation
   - Track how much each process has been allocated so far
   - **Safety check**: can all processes that have received memory finish within their max? Build safe sequence of processes whose current `allocated <= max`
4. Print final allocation table

### Key Logic

- **Best Fit**: Among all blocks >= request size, pick the one with the **smallest** size (leaves smallest leftover)
- **Safety check (simplified)**: A process can "complete" if it has been allocated some memory and its total allocation does not exceed its max. Processes that have completed release their resources. Build the safe sequence in order of completion.
- The safe sequence accumulates across requests (a process that was safe earlier stays in the sequence, new completable processes get appended)

### Complete C Implementation (PYQ Q3/Q4 Pattern)

```c
#include <stdio.h>
#include <stdbool.h>

// Helper: sort an array in descending order (for display)
void sortDesc(int arr[], int n) {
    for (int i = 0; i < n - 1; i++)
        for (int j = 0; j < n - i - 1; j++)
            if (arr[j] < arr[j + 1]) {
                int tmp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = tmp;
            }
}

int main() {
    int np, nb;
    printf("Enter number of processes: ");
    scanf("%d", &np);
    printf("Enter number of memory blocks: ");
    scanf("%d", &nb);

    int blocks[nb];
    printf("Enter block sizes:\n");
    for (int i = 0; i < nb; i++)
        scanf("%d", &blocks[i]);

    int maxAlloc[np];      // max memory each process can be allocated
    int allocated[np];     // how much each process has been allocated so far
    printf("Enter max allocation for each process:\n");
    for (int i = 0; i < np; i++) {
        scanf("%d", &maxAlloc[i]);
        allocated[i] = 0;
    }

    // Safe sequence tracking
    int safeSeq[100];      // safe sequence (can grow across requests)
    int safeCount = 0;
    bool inSafe[np];       // track which processes are already in safe sequence
    for (int i = 0; i < np; i++) inSafe[i] = false;

    // Input loop: (pid, request) until -1
    printf("\nEnter pid and resource request (-1 to stop):\n");
    int pid, req;
    while (1) {
        scanf("%d", &pid);
        if (pid == -1) break;
        scanf("%d", &req);

        printf("\nP%d requests %d bytes\n", pid, req);

        // Display memory BEFORE allocation (sorted descending)
        // Work on a sorted copy for display
        int display[nb];
        for (int i = 0; i < nb; i++) display[i] = blocks[i];
        sortDesc(display, nb);
        printf("Memory before allocation (sorted): ");
        for (int i = 0; i < nb; i++)
            printf("%d ", display[i]);
        printf("\n");

        // Best Fit: find smallest block >= req
        int bestIdx = -1;
        for (int i = 0; i < nb; i++) {
            if (blocks[i] >= req) {
                if (bestIdx == -1 || blocks[i] < blocks[bestIdx])
                    bestIdx = i;
            }
        }

        if (bestIdx != -1) {
            blocks[bestIdx] -= req;
            allocated[pid] += req;
            printf("-> P%d allocated (remaining %d)\n", pid, blocks[bestIdx]);
        } else {
            printf("-> P%d NOT ALLOCATED (no block large enough)\n", pid);
        }

        // Display memory AFTER allocation (sorted descending)
        for (int i = 0; i < nb; i++) display[i] = blocks[i];
        sortDesc(display, nb);
        printf("Memory after allocation (sorted): ");
        for (int i = 0; i < nb; i++)
            printf("%d ", display[i]);
        printf("\n");

        // Safety check: find processes that can complete
        // A process can complete if it has allocation > 0 and allocation <= max
        // and it is not already in the safe sequence
        bool changed = true;
        while (changed) {
            changed = false;
            for (int i = 0; i < np; i++) {
                if (!inSafe[i] && allocated[i] > 0 && allocated[i] <= maxAlloc[i]) {
                    safeSeq[safeCount++] = i;
                    inSafe[i] = true;
                    changed = true;
                }
            }
        }

        // Check if system is safe
        bool safe = true;
        for (int i = 0; i < np; i++) {
            if (allocated[i] > 0 && !inSafe[i]) {
                safe = false;
                break;
            }
        }

        if (safe) {
            printf("System is safe\n");
            printf("Safe sequence: ");
            for (int i = 0; i < safeCount; i++)
                printf("P%d ", safeSeq[i]);
            printf("\n");
        } else {
            printf("System is NOT safe\n");
        }
    }

    // Final allocation
    printf("\nFinal Allocation:\n");
    for (int i = 0; i < np; i++)
        printf("P%d: %d\n", i, allocated[i]);

    return 0;
}
```

**Test input (from PYQ Q4):**
```
3
3
100 300 200
150 80 200
2 150
0 150
1 50
1 20
-1
```

**Expected output:**
```
P2 requests 150 bytes
Memory before allocation (sorted): 300 200 100
-> P2 allocated (remaining 50)
Memory after allocation (sorted): 300 100 50
System is safe
Safe sequence: P2

P0 requests 150 bytes
Memory before allocation (sorted): 300 100 50
-> P0 allocated (remaining 150)
Memory after allocation (sorted): 150 100 50
System is safe
Safe sequence: P2 P0

P1 requests 50 bytes
Memory before allocation (sorted): 150 100 50
-> P1 allocated (remaining 0)
Memory after allocation (sorted): 150 100 0
System is safe
Safe sequence: P2 P0 P1

P1 requests 20 bytes
Memory before allocation (sorted): 150 100 0
-> P1 allocated (remaining 80)
Memory after allocation (sorted): 150 80 0
System is safe
Safe sequence: P2 P0 P1

Final Allocation:
P0: 150
P1: 70
P2: 150
```

---

## 6. FULL COMBINED PROGRAM (Banker's + Resource Request)

If the exam asks for both safety check AND resource request handling in one program, use this complete version:

```c
#include <stdio.h>
#include <stdbool.h>

// Returns 1 if safe, 0 if unsafe. Fills safeSeq[] and sets *seqLen.
int checkSafety(int n, int m, int alloc[][m], int need[][m], int avail[],
                int safeSeq[], int *seqLen) {
    int work[m];
    bool finish[n];
    *seqLen = 0;

    for (int j = 0; j < m; j++) work[j] = avail[j];
    for (int i = 0; i < n; i++) finish[i] = false;

    while (*seqLen < n) {
        bool found = false;
        for (int i = 0; i < n; i++) {
            if (!finish[i]) {
                bool canRun = true;
                for (int j = 0; j < m; j++) {
                    if (need[i][j] > work[j]) {
                        canRun = false;
                        break;
                    }
                }
                if (canRun) {
                    for (int j = 0; j < m; j++)
                        work[j] += alloc[i][j];
                    safeSeq[(*seqLen)++] = i;
                    finish[i] = true;
                    found = true;
                }
            }
        }
        if (!found) break;
    }
    return (*seqLen == n);
}

int main() {
    int n, m;
    printf("Enter number of processes and resource types: ");
    scanf("%d %d", &n, &m);

    int alloc[n][m], max[n][m], need[n][m], avail[m];

    printf("Enter Allocation matrix:\n");
    for (int i = 0; i < n; i++)
        for (int j = 0; j < m; j++)
            scanf("%d", &alloc[i][j]);

    printf("Enter Max matrix:\n");
    for (int i = 0; i < n; i++)
        for (int j = 0; j < m; j++)
            scanf("%d", &max[i][j]);

    printf("Enter Available vector:\n");
    for (int j = 0; j < m; j++)
        scanf("%d", &avail[j]);

    // Calculate Need
    for (int i = 0; i < n; i++)
        for (int j = 0; j < m; j++)
            need[i][j] = max[i][j] - alloc[i][j];

    // Print Need
    printf("\nNeed Matrix:\n");
    for (int i = 0; i < n; i++) {
        printf("P%d: ", i);
        for (int j = 0; j < m; j++)
            printf("%d ", need[i][j]);
        printf("\n");
    }

    // Initial safety check
    int safeSeq[n], seqLen;
    if (checkSafety(n, m, alloc, need, avail, safeSeq, &seqLen)) {
        printf("\nSystem is in SAFE state.\nSafe sequence: ");
        for (int i = 0; i < n; i++)
            printf("P%d%s", safeSeq[i], i < n - 1 ? " -> " : "\n");
    } else {
        printf("\nSystem is NOT in a safe state.\n");
        return 0;
    }

    // Resource Request
    int req_pid, request[m];
    printf("\nEnter requesting process ID (-1 to skip): ");
    scanf("%d", &req_pid);

    if (req_pid != -1) {
        printf("Enter request vector: ");
        for (int j = 0; j < m; j++)
            scanf("%d", &request[j]);

        // Step 1: Request <= Need?
        for (int j = 0; j < m; j++) {
            if (request[j] > need[req_pid][j]) {
                printf("Error: Request exceeds maximum claim!\n");
                return 1;
            }
        }

        // Step 2: Request <= Available?
        for (int j = 0; j < m; j++) {
            if (request[j] > avail[j]) {
                printf("Process must wait: resources not available.\n");
                return 0;
            }
        }

        // Step 3: Pretend to allocate
        for (int j = 0; j < m; j++) {
            avail[j]            -= request[j];
            alloc[req_pid][j]   += request[j];
            need[req_pid][j]    -= request[j];
        }

        // Check safety again
        if (checkSafety(n, m, alloc, need, avail, safeSeq, &seqLen)) {
            printf("Request GRANTED.\nNew safe sequence: ");
            for (int i = 0; i < n; i++)
                printf("P%d%s", safeSeq[i], i < n - 1 ? " -> " : "\n");
        } else {
            printf("Request DENIED (would cause unsafe state).\n");
            // Rollback
            for (int j = 0; j < m; j++) {
                avail[j]            += request[j];
                alloc[req_pid][j]   -= request[j];
                need[req_pid][j]    += request[j];
            }
        }
    }

    return 0;
}
```

---

## 7. QUICK REFERENCE -- What to Write for Each Question Type

| Question asks for... | What to code |
|---|---|
| "Check if system is safe" | Section 2: Safety algorithm only |
| "Check safe + handle resource request" | Section 6: Combined program |
| "Deadlock detection" | Section 4: Modify safety to use Request matrix and different Finish init |
| "Best Fit + safety check" (PYQ Q3/Q4 style) | Section 5: Combined Best Fit + simplified single-resource safety |
| "Implement Banker's Algorithm" | Section 6: Full combined program (covers everything) |

---

## 8. COMMON MISTAKES TO AVOID

1. **Forgetting to compare ALL resource types**: `Need[i] <= Work` must be true for EVERY `j` (all resource types), not just one. Use the inner `for` loop with `break`.

2. **Not breaking out of the while loop when stuck**: If no process can run in a full pass (`found == false`), you MUST `break`. Otherwise infinite loop.

3. **Forgetting the rollback on unsafe**: If the resource request makes the system unsafe, you must undo all three changes (avail, alloc, need).

4. **Off-by-one in safe sequence print**: Use `count` variable, don't assume `n` processes are always in the sequence.

5. **VLA (Variable Length Array) issues**: `int alloc[n][m]` requires C99 or later. Compile with `gcc -std=c99` or just `gcc` (default on most lab machines). If the compiler rejects it, use `#define MAX 20` and fixed-size arrays.

6. **PYQ combo: sorting the wrong array**: Sort a COPY for display. Don't sort the original blocks array or you lose track of which block is which.

---

## 9. SKELETON YOU CAN MEMORIZE

If you only memorize one thing, memorize this core loop (the safety algorithm). Everything else is input/output around it:

```c
while (count < n) {
    bool found = false;
    for (int i = 0; i < n; i++) {
        if (!finish[i]) {
            bool ok = true;
            for (int j = 0; j < m; j++)
                if (need[i][j] > work[j]) { ok = false; break; }
            if (ok) {
                for (int j = 0; j < m; j++) work[j] += alloc[i][j];
                safeSeq[count++] = i;
                finish[i] = true;
                found = true;
            }
        }
    }
    if (!found) break;
}
// safe if count == n
```

That is 15 lines. The rest is scanf/printf.
