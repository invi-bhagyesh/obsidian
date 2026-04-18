# PYQ Combo Solutions — OS Lab End-Sem (CSS-2211)

Complete, compilable C programs for every PYQ combination pattern.

---

## Table of Contents

1. [Q1: LSTF + MFU](#q1-lstf--mfu)
2. [Q2: LCFS + LFU](#q2-lcfs--lfu)
3. [Q3/Q4: Best Fit + Banker's Safety](#q3q4-best-fit--bankers-safety)
4. [Q5: SSTF + LRU](#q5-sstf--lru)
5. [Q6: SCAN + FIFO](#q6-scan--fifo)
6. [Q7: C-SCAN + Optimal](#q7-c-scan--optimal)
7. [Q8: LOOK + LFU](#q8-look--lfu)
8. [Q9: C-LOOK + MFU](#q9-c-look--mfu)
9. [Q10: FCFS + FIFO](#q10-fcfs--fifo)
10. [Q11: First Fit + Banker's Safety](#q11-first-fit--bankers-safety)
11. [Q12: Worst Fit + Banker's Safety](#q12-worst-fit--bankers-safety)
12. [Exam Strategy](#exam-strategy)
13. [All Possible Combinations Reference](#all-possible-combinations-reference)

---

## Q1: LSTF + MFU

**LSTF** = Largest Seek Time First (always jump to the farthest cylinder from current head).
**MFU** = Most Frequently Used (evict the page with the highest access count).

### Input format
- Number of frames
- Initial head position
- Pairs of `(page_number, cylinder_position)` until user enters `-1`

### How it works
1. Read all (page, cylinder) pairs.
2. Run LSTF disk scheduling on cylinder positions to determine service order.
3. Extract page numbers in that LSTF service order.
4. Run MFU page replacement on those page numbers.

### Complete C Program

```c
#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

int main() {
    int frames, head;
    printf("Enter number of frames: ");
    scanf("%d", &frames);
    printf("Enter initial head position: ");
    scanf("%d", &head);

    // --- Read (page, cylinder) pairs until -1 ---
    int page[100], cyl[100], n = 0;
    printf("Enter (page_no cylinder_pos) pairs, -1 to stop:\n");
    while (1) {
        int p;
        scanf("%d", &p);
        if (p == -1) break;
        page[n] = p;
        scanf("%d", &cyl[n]);
        n++;
    }

    // ========================================
    // PART 1: LSTF Disk Scheduling
    // ========================================
    printf("\n=== LSTF Disk Scheduling ===\n");

    int visited[100];
    int order[100];  // stores original indices in LSTF service order
    for (int i = 0; i < n; i++) visited[i] = 0;

    int cur = head, thm = 0;
    printf("Head movement: %d", cur);

    for (int i = 0; i < n; i++) {
        // Find the FARTHEST unvisited request from current head
        int max_dist = -1, max_idx = -1;
        for (int j = 0; j < n; j++) {
            if (!visited[j] && abs(cyl[j] - cur) > max_dist) {
                max_dist = abs(cyl[j] - cur);
                max_idx = j;
            }
        }
        visited[max_idx] = 1;
        order[i] = max_idx;
        thm += max_dist;
        cur = cyl[max_idx];
        printf(" -> %d", cur);
    }
    printf("\nTotal Head Movement: %d\n", thm);

    // Extract page reference string from LSTF order
    int ref[100];
    printf("\nPage reference string (from LSTF order): ");
    for (int i = 0; i < n; i++) {
        ref[i] = page[order[i]];
        printf("%d ", ref[i]);
    }
    printf("\n");

    // ========================================
    // PART 2: MFU Page Replacement
    // ========================================
    printf("\n=== MFU Page Replacement ===\n");

    int frame_arr[frames], freq[frames], time_in[frames];
    for (int i = 0; i < frames; i++) {
        frame_arr[i] = -1;
        freq[i] = 0;
        time_in[i] = 0;
    }

    int faults = 0;
    for (int i = 0; i < n; i++) {
        // Check if page is already in a frame (HIT)
        bool found = false;
        for (int j = 0; j < frames; j++) {
            if (frame_arr[j] == ref[i]) {
                found = true;
                freq[j]++;  // increment frequency on hit
                break;
            }
        }

        if (!found) {
            // PAGE FAULT
            int replace_idx = -1;

            // First check for an empty frame
            for (int j = 0; j < frames; j++) {
                if (frame_arr[j] == -1) {
                    replace_idx = j;
                    break;
                }
            }

            if (replace_idx == -1) {
                // All frames full: evict page with HIGHEST frequency (MFU)
                // Tie-break: oldest arrival (smallest time_in)
                replace_idx = 0;
                for (int j = 1; j < frames; j++) {
                    if (freq[j] > freq[replace_idx] ||
                        (freq[j] == freq[replace_idx] && time_in[j] < time_in[replace_idx]))
                        replace_idx = j;
                }
            }

            frame_arr[replace_idx] = ref[i];
            freq[replace_idx] = 1;     // new page starts with frequency 1
            time_in[replace_idx] = i;  // record arrival time
            faults++;
            printf("Page %d  FAULT  Frames: ", ref[i]);
        } else {
            printf("Page %d  HIT    Frames: ", ref[i]);
        }

        // Print current frame state
        for (int j = 0; j < frames; j++)
            if (frame_arr[j] != -1) printf("%d ", frame_arr[j]);
        printf("\n");
    }

    printf("\nTotal page faults: %d\n", faults);
    printf("Hit ratio: %.2f%%\n", (float)(n - faults) / n * 100);

    return 0;
}
```

### Sample Run Walkthrough

**Input:**
```
Frames: 3, Head: 50
Pairs: (1,20) (2,90) (3,10) (1,80) (4,60) (2,30) -1
```

**LSTF Scheduling (always go to farthest):**
```
Head at 50 -> farthest is 10 (dist=40) or 90 (dist=40)... tie goes to first found
50 -> 90 (dist=40) -> 10 (dist=80) -> 80 (dist=70) -> 20 (dist=60) -> 60 (dist=40) -> 30 (dist=30)
THM = 40 + 80 + 70 + 60 + 40 + 30 = 320
```

**Page reference string:** `2 3 1 1 4 2` (pages in the order their cylinders were serviced)

**MFU on [2, 3, 1, 1, 4, 2] with 3 frames:**
```
Page 2  FAULT  Frames: 2
Page 3  FAULT  Frames: 2 3
Page 1  FAULT  Frames: 2 3 1
Page 1  HIT    Frames: 2 3 1       (freq of 1 becomes 2)
Page 4  FAULT  Frames: 2 3 4       (evict page 1, freq=2 is highest)
Page 2  HIT    Frames: 2 3 4
Total faults: 4, Hit ratio: 33.33%
```

---

## Q2: LCFS + LFU

**LCFS** = Last Come First Served (serve the most recently arrived request first, i.e., reverse order).
**LFU** = Least Frequently Used (evict the page with the lowest access count).

### Input format
Same as Q1: frames, head position, (page, cylinder) pairs until -1.

### How it works
1. Read all (page, cylinder) pairs.
2. LCFS: serve requests in reverse arrival order (last pair entered is served first).
3. Extract page numbers in LCFS service order.
4. Run LFU page replacement on those page numbers.

### Complete C Program

```c
#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

int main() {
    int frames, head;
    printf("Enter number of frames: ");
    scanf("%d", &frames);
    printf("Enter initial head position: ");
    scanf("%d", &head);

    // --- Read (page, cylinder) pairs until -1 ---
    int page[100], cyl[100], n = 0;
    printf("Enter (page_no cylinder_pos) pairs, -1 to stop:\n");
    while (1) {
        int p;
        scanf("%d", &p);
        if (p == -1) break;
        page[n] = p;
        scanf("%d", &cyl[n]);
        n++;
    }

    // ========================================
    // PART 1: LCFS Disk Scheduling
    // ========================================
    // LCFS = serve in reverse order of arrival
    printf("\n=== LCFS Disk Scheduling ===\n");

    int cur = head, thm = 0;
    int order[100];  // LCFS order = reversed indices
    printf("Head movement: %d", cur);

    for (int i = 0; i < n; i++) {
        int idx = n - 1 - i;  // reverse: last arrived is served first
        order[i] = idx;
        int dist = abs(cyl[idx] - cur);
        thm += dist;
        cur = cyl[idx];
        printf(" -> %d", cur);
    }
    printf("\nTotal Head Movement: %d\n", thm);

    // Extract page reference string from LCFS order
    int ref[100];
    printf("\nPage reference string (from LCFS order): ");
    for (int i = 0; i < n; i++) {
        ref[i] = page[order[i]];
        printf("%d ", ref[i]);
    }
    printf("\n");

    // ========================================
    // PART 2: LFU Page Replacement
    // ========================================
    printf("\n=== LFU Page Replacement ===\n");

    int frame_arr[frames], freq[frames], time_in[frames];
    for (int i = 0; i < frames; i++) {
        frame_arr[i] = -1;
        freq[i] = 0;
        time_in[i] = 0;
    }

    int faults = 0;
    for (int i = 0; i < n; i++) {
        // Check for HIT
        bool found = false;
        for (int j = 0; j < frames; j++) {
            if (frame_arr[j] == ref[i]) {
                found = true;
                freq[j]++;  // increment frequency on hit
                break;
            }
        }

        if (!found) {
            // PAGE FAULT
            int replace_idx = -1;

            // Check for empty frame
            for (int j = 0; j < frames; j++) {
                if (frame_arr[j] == -1) {
                    replace_idx = j;
                    break;
                }
            }

            if (replace_idx == -1) {
                // All frames full: evict page with LOWEST frequency (LFU)
                // Tie-break: oldest arrival (smallest time_in)
                replace_idx = 0;
                for (int j = 1; j < frames; j++) {
                    if (freq[j] < freq[replace_idx] ||
                        (freq[j] == freq[replace_idx] && time_in[j] < time_in[replace_idx]))
                        replace_idx = j;
                }
            }

            frame_arr[replace_idx] = ref[i];
            freq[replace_idx] = 1;     // new page starts with frequency 1
            time_in[replace_idx] = i;  // record arrival time
            faults++;
            printf("Page %d  FAULT  Frames: ", ref[i]);
        } else {
            printf("Page %d  HIT    Frames: ", ref[i]);
        }

        for (int j = 0; j < frames; j++)
            if (frame_arr[j] != -1) printf("%d ", frame_arr[j]);
        printf("\n");
    }

    printf("\nTotal page faults: %d\n", faults);
    printf("Hit ratio: %.2f%%\n", (float)(n - faults) / n * 100);

    return 0;
}
```

### Sample Run Walkthrough

**Input:**
```
Frames: 3, Head: 50
Pairs: (1,20) (2,90) (3,10) (1,80) (4,60) (2,30) -1
```

**LCFS Order (reverse of arrival):**
```
Serve order: (2,30) (4,60) (1,80) (3,10) (2,90) (1,20)
Head: 50 -> 30 -> 60 -> 80 -> 10 -> 90 -> 20
THM = 20 + 30 + 20 + 70 + 80 + 70 = 290
```

**Page reference string:** `2 4 1 3 2 1`

**LFU on [2, 4, 1, 3, 2, 1] with 3 frames:**
```
Page 2  FAULT  Frames: 2
Page 4  FAULT  Frames: 2 4
Page 1  FAULT  Frames: 2 4 1
Page 3  FAULT  Frames: 2 3 1       (evict 4, freq=1, oldest among ties)
Page 2  HIT    Frames: 2 3 1       (freq of 2 becomes 2)
Page 1  HIT    Frames: 2 3 1       (freq of 1 becomes 2)
Total faults: 4, Hit ratio: 33.33%
```

---

## Q3/Q4: Best Fit + Banker's Safety

**Best Fit** = Allocate from the smallest block that is large enough.
**Banker's Safety** = After each allocation, check if the system can still allow all processes to finish.

### Input format
- Number of memory blocks
- Number of processes
- Size of each memory block
- Maximum memory each process can be allocated
- Loop: `(pid, resource_amount)` until `-1`

### How it works
For each request:
1. Display memory blocks sorted in descending order.
2. Apply Best Fit: find smallest block >= requested amount.
3. Reduce that block by requested amount, add to process allocation.
4. Display memory after allocation (sorted descending).
5. Run safety check: can all processes finish with remaining memory?
   - A process can finish if `(max - current_allocation) <= available_memory`.
   - When it finishes, its allocated memory returns to available pool.
6. Print safe sequence.

### Complete C Program

```c
#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

// Sort an array in descending order (bubble sort)
void sort_desc(int arr[], int n) {
    for (int i = 0; i < n - 1; i++)
        for (int j = 0; j < n - i - 1; j++)
            if (arr[j] < arr[j + 1]) {
                int tmp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = tmp;
            }
}

// Print array
void print_arr(int arr[], int n) {
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\n");
}

int main() {
    int nb, np;
    printf("Enter number of memory blocks: ");
    scanf("%d", &nb);
    printf("Enter number of processes: ");
    scanf("%d", &np);

    int block[100];
    printf("Enter size of each memory block:\n");
    for (int i = 0; i < nb; i++)
        scanf("%d", &block[i]);

    int max_alloc[100], cur_alloc[100];
    printf("Enter maximum memory for each process:\n");
    for (int i = 0; i < np; i++) {
        printf("P%d: ", i);
        scanf("%d", &max_alloc[i]);
        cur_alloc[i] = 0;
    }

    // --- Process requests in a loop ---
    int pid, resource;
    printf("\nEnter (pid resource_amount), -1 to stop:\n");

    while (1) {
        scanf("%d", &pid);
        if (pid == -1) break;
        scanf("%d", &resource);

        printf("\n--- P%d requests %d bytes ---\n", pid, resource);

        // Sort and display memory BEFORE allocation
        sort_desc(block, nb);
        printf("Memory before allocation (sorted desc): ");
        print_arr(block, nb);

        // === Best Fit: find smallest block >= resource ===
        int best_idx = -1;
        for (int i = 0; i < nb; i++) {
            if (block[i] >= resource) {
                if (best_idx == -1 || block[i] < block[best_idx])
                    best_idx = i;
            }
        }

        if (best_idx != -1) {
            block[best_idx] -= resource;
            cur_alloc[pid] += resource;
            printf("Allocated to P%d from block (remaining: %d)\n", pid, block[best_idx]);
        } else {
            printf("P%d NOT ALLOCATED (no suitable block)\n", pid);
            continue;  // skip safety check if allocation failed
        }

        // Sort and display memory AFTER allocation
        sort_desc(block, nb);
        printf("Memory after allocation (sorted desc): ");
        print_arr(block, nb);

        // === Banker's Safety Check ===
        // Calculate total available memory (sum of all blocks)
        int work = 0;
        for (int i = 0; i < nb; i++) work += block[i];

        bool finish[100];
        int safe_seq[100];
        int seq_count = 0;
        for (int i = 0; i < np; i++) finish[i] = false;

        bool progress = true;
        while (progress && seq_count < np) {
            progress = false;
            for (int i = 0; i < np; i++) {
                if (!finish[i] && cur_alloc[i] > 0) {
                    // Process i needs (max - current) more to complete
                    int need = max_alloc[i] - cur_alloc[i];
                    if (need <= work) {
                        // Process can finish, releases its memory
                        work += cur_alloc[i];
                        finish[i] = true;
                        safe_seq[seq_count++] = i;
                        progress = true;
                    }
                } else if (!finish[i] && cur_alloc[i] == 0) {
                    // Process with no allocation is trivially finished
                    finish[i] = true;
                }
            }
        }

        // Check if system is safe
        bool safe = true;
        for (int i = 0; i < np; i++) {
            if (cur_alloc[i] > 0 && !finish[i]) {
                safe = false;
                break;
            }
        }

        if (safe) {
            printf("System is SAFE\n");
            if (seq_count > 0) {
                printf("Safe sequence: ");
                for (int i = 0; i < seq_count; i++)
                    printf("P%d ", safe_seq[i]);
                printf("\n");
            }
        } else {
            printf("System is NOT SAFE!\n");
        }
    }

    // --- Final allocation summary ---
    printf("\n=== Final Allocation ===\n");
    for (int i = 0; i < np; i++)
        printf("P%d: %d / %d (max)\n", i, cur_alloc[i], max_alloc[i]);

    printf("\n=== Remaining Memory Blocks ===\n");
    sort_desc(block, nb);
    print_arr(block, nb);

    return 0;
}
```

### Worked Example (PYQ Q4 Pattern)

**Input:**
```
3 memory blocks: 100 300 200
3 processes: P0 max=150, P1 max=80, P2 max=200
Requests: (2,150) (0,150) (1,50) (1,20)
```

**Step-by-step output:**

```
--- P2 requests 150 bytes ---
Memory before allocation (sorted desc): 300 200 100
Best Fit: 200 is smallest block >= 150 -> allocate from it
Allocated to P2 from block (remaining: 50)
Memory after allocation (sorted desc): 300 100 50
P2 has 150/200. Need=50. Available=300+100+50=450. 50<=450 -> P2 can finish.
Work becomes 450+150=600. All done.
System is SAFE
Safe sequence: P2

--- P0 requests 150 bytes ---
Memory before allocation (sorted desc): 300 100 50
Best Fit: 300 is smallest block >= 150 -> allocate from it
Allocated to P0 from block (remaining: 150)
Memory after allocation (sorted desc): 150 100 50
P0 has 150/150. Need=0. Available=300. 0<=300 -> P0 finishes. Work=300+150=450.
P2 has 150/200. Need=50. 50<=450 -> P2 finishes. Work=450+150=600.
System is SAFE
Safe sequence: P0 P2

--- P1 requests 50 bytes ---
Memory before allocation (sorted desc): 150 100 50
Best Fit: 50 is smallest block >= 50 -> allocate from it
Allocated to P1 from block (remaining: 0)
Memory after allocation (sorted desc): 150 100 0
P0 has 150/150. Need=0. 0<=250 -> P0 finishes. Work=250+150=400.
P1 has 50/80. Need=30. 30<=400 -> P1 finishes. Work=400+50=450.
P2 has 150/200. Need=50. 50<=450 -> P2 finishes. Work=450+150=600.
System is SAFE
Safe sequence: P0 P1 P2

--- P1 requests 20 bytes ---
Memory before allocation (sorted desc): 150 100 0
Best Fit: 100 is smallest block >= 20 -> allocate from it
Allocated to P1 from block (remaining: 80)
Memory after allocation (sorted desc): 150 80 0
P0 has 150/150. Need=0. 0<=230 -> P0 finishes. Work=230+150=380.
P1 has 70/80. Need=10. 10<=380 -> P1 finishes. Work=380+70=450.
P2 has 150/200. Need=50. 50<=450 -> P2 finishes. Work=450+150=600.
System is SAFE
Safe sequence: P0 P1 P2

Final Allocation:
P0: 150 / 150 (max)
P1: 70 / 80 (max)
P2: 150 / 200 (max)
Remaining blocks: 150 80 0
```

---

## Q5: SSTF + LRU

**SSTF** = Shortest Seek Time First (always go to the nearest cylinder).
**LRU** = Least Recently Used (evict the page that was accessed longest ago).

### Complete C Program

```c
#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

int main() {
    int frames, head;
    printf("Enter number of frames: ");
    scanf("%d", &frames);
    printf("Enter initial head position: ");
    scanf("%d", &head);

    int page[100], cyl[100], n = 0;
    printf("Enter (page_no cylinder_pos) pairs, -1 to stop:\n");
    while (1) {
        int p;
        scanf("%d", &p);
        if (p == -1) break;
        page[n] = p;
        scanf("%d", &cyl[n]);
        n++;
    }

    // ========================================
    // PART 1: SSTF Disk Scheduling
    // ========================================
    printf("\n=== SSTF Disk Scheduling ===\n");

    int visited[100];
    int order[100];
    for (int i = 0; i < n; i++) visited[i] = 0;

    int cur = head, thm = 0;
    printf("Head movement: %d", cur);

    for (int i = 0; i < n; i++) {
        // Find NEAREST unvisited request
        int min_dist = 999999, min_idx = -1;
        for (int j = 0; j < n; j++) {
            if (!visited[j] && abs(cyl[j] - cur) < min_dist) {
                min_dist = abs(cyl[j] - cur);
                min_idx = j;
            }
        }
        visited[min_idx] = 1;
        order[i] = min_idx;
        thm += min_dist;
        cur = cyl[min_idx];
        printf(" -> %d", cur);
    }
    printf("\nTotal Head Movement: %d\n", thm);

    // Extract page reference string
    int ref[100];
    printf("\nPage reference string (from SSTF order): ");
    for (int i = 0; i < n; i++) {
        ref[i] = page[order[i]];
        printf("%d ", ref[i]);
    }
    printf("\n");

    // ========================================
    // PART 2: LRU Page Replacement
    // ========================================
    printf("\n=== LRU Page Replacement ===\n");

    int frame_arr[frames], last_used[frames];
    for (int i = 0; i < frames; i++) {
        frame_arr[i] = -1;
        last_used[i] = -1;
    }

    int faults = 0;
    for (int i = 0; i < n; i++) {
        // Check for HIT
        bool found = false;
        for (int j = 0; j < frames; j++) {
            if (frame_arr[j] == ref[i]) {
                found = true;
                last_used[j] = i;  // update last used time
                break;
            }
        }

        if (!found) {
            // PAGE FAULT
            int replace_idx = -1;

            // Check for empty frame
            for (int j = 0; j < frames; j++) {
                if (frame_arr[j] == -1) {
                    replace_idx = j;
                    break;
                }
            }

            if (replace_idx == -1) {
                // Find frame with OLDEST last_used time (LRU)
                replace_idx = 0;
                for (int j = 1; j < frames; j++) {
                    if (last_used[j] < last_used[replace_idx])
                        replace_idx = j;
                }
            }

            frame_arr[replace_idx] = ref[i];
            last_used[replace_idx] = i;
            faults++;
            printf("Page %d  FAULT  Frames: ", ref[i]);
        } else {
            printf("Page %d  HIT    Frames: ", ref[i]);
        }

        for (int j = 0; j < frames; j++)
            if (frame_arr[j] != -1) printf("%d ", frame_arr[j]);
        printf("\n");
    }

    printf("\nTotal page faults: %d\n", faults);
    printf("Hit ratio: %.2f%%\n", (float)(n - faults) / n * 100);

    return 0;
}
```

---

## Q6: SCAN + FIFO

**SCAN** = Elevator algorithm (move in one direction, then reverse at the end).
**FIFO** = First In First Out (evict the page that was loaded earliest).

### Complete C Program

```c
#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

int main() {
    int frames, head, disk_size;
    char direction;
    printf("Enter number of frames: ");
    scanf("%d", &frames);
    printf("Enter initial head position: ");
    scanf("%d", &head);
    printf("Enter disk size (max cylinder): ");
    scanf("%d", &disk_size);
    printf("Enter initial direction (l/r): ");
    scanf(" %c", &direction);

    int page[100], cyl[100], n = 0;
    printf("Enter (page_no cylinder_pos) pairs, -1 to stop:\n");
    while (1) {
        int p;
        scanf("%d", &p);
        if (p == -1) break;
        page[n] = p;
        scanf("%d", &cyl[n]);
        n++;
    }

    // ========================================
    // PART 1: SCAN Disk Scheduling
    // ========================================
    printf("\n=== SCAN Disk Scheduling ===\n");

    // Sort cylinders by value (keep page association)
    // Create index array sorted by cylinder value
    int idx[100];
    for (int i = 0; i < n; i++) idx[i] = i;
    for (int i = 0; i < n - 1; i++)
        for (int j = 0; j < n - i - 1; j++)
            if (cyl[idx[j]] > cyl[idx[j + 1]]) {
                int tmp = idx[j];
                idx[j] = idx[j + 1];
                idx[j + 1] = tmp;
            }

    // Build SCAN service order
    int order[200], order_count = 0;
    int thm = 0, cur = head;

    if (direction == 'r' || direction == 'R') {
        // Move right first
        // Serve requests >= head in ascending order
        for (int i = 0; i < n; i++)
            if (cyl[idx[i]] >= head)
                order[order_count++] = idx[i];
        // Add disk end boundary (only if we need to reverse)
        // Then serve requests < head in descending order
        // SCAN goes to disk_size-1, then reverses
        for (int i = n - 1; i >= 0; i--)
            if (cyl[idx[i]] < head)
                order[order_count++] = idx[i];

        // Calculate THM: head -> right requests -> disk_size-1 -> left requests
        printf("Head movement: %d", cur);
        bool went_to_end = false;
        // Right side
        for (int i = 0; i < n; i++) {
            if (cyl[idx[i]] >= head) {
                thm += abs(cyl[idx[i]] - cur);
                cur = cyl[idx[i]];
            }
        }
        // Go to end if there are requests on the left
        bool has_left = false;
        for (int i = 0; i < n; i++)
            if (cyl[idx[i]] < head) has_left = true;
        if (has_left) {
            thm += abs((disk_size - 1) - cur);
            cur = disk_size - 1;
        }
        // Left side (descending)
        for (int i = n - 1; i >= 0; i--) {
            if (cyl[idx[i]] < head) {
                thm += abs(cyl[idx[i]] - cur);
                cur = cyl[idx[i]];
            }
        }
    } else {
        // Move left first
        // Serve requests <= head in descending order
        for (int i = n - 1; i >= 0; i--)
            if (cyl[idx[i]] <= head)
                order[order_count++] = idx[i];
        // Then serve requests > head in ascending order
        for (int i = 0; i < n; i++)
            if (cyl[idx[i]] > head)
                order[order_count++] = idx[i];

        printf("Head movement: %d", cur);
        // Left side
        for (int i = n - 1; i >= 0; i--) {
            if (cyl[idx[i]] <= head) {
                thm += abs(cyl[idx[i]] - cur);
                cur = cyl[idx[i]];
            }
        }
        // Go to 0 if there are requests on the right
        bool has_right = false;
        for (int i = 0; i < n; i++)
            if (cyl[idx[i]] > head) has_right = true;
        if (has_right) {
            thm += abs(cur - 0);
            cur = 0;
        }
        // Right side (ascending)
        for (int i = 0; i < n; i++) {
            if (cyl[idx[i]] > head) {
                thm += abs(cyl[idx[i]] - cur);
                cur = cyl[idx[i]];
            }
        }
    }

    // Print the actual head traversal using order[]
    printf("Head movement: %d", head);
    cur = head;
    for (int i = 0; i < order_count; i++) {
        printf(" -> %d", cyl[order[i]]);
    }
    printf("\nTotal Head Movement: %d\n", thm);

    // Extract page reference string
    int ref[200];
    printf("\nPage reference string (from SCAN order): ");
    for (int i = 0; i < order_count; i++) {
        ref[i] = page[order[i]];
        printf("%d ", ref[i]);
    }
    printf("\n");
    int ref_count = order_count;

    // ========================================
    // PART 2: FIFO Page Replacement
    // ========================================
    printf("\n=== FIFO Page Replacement ===\n");

    int frame_arr[frames];
    int fifo_ptr = 0;  // points to the oldest frame (circular)
    int filled = 0;    // how many frames are filled
    for (int i = 0; i < frames; i++) frame_arr[i] = -1;

    int faults = 0;
    for (int i = 0; i < ref_count; i++) {
        // Check for HIT
        bool found = false;
        for (int j = 0; j < frames; j++) {
            if (frame_arr[j] == ref[i]) {
                found = true;
                break;
            }
        }

        if (!found) {
            // PAGE FAULT: replace at fifo_ptr position
            frame_arr[fifo_ptr] = ref[i];
            fifo_ptr = (fifo_ptr + 1) % frames;
            faults++;
            printf("Page %d  FAULT  Frames: ", ref[i]);
        } else {
            printf("Page %d  HIT    Frames: ", ref[i]);
        }

        for (int j = 0; j < frames; j++)
            if (frame_arr[j] != -1) printf("%d ", frame_arr[j]);
        printf("\n");
    }

    printf("\nTotal page faults: %d\n", faults);
    printf("Hit ratio: %.2f%%\n", (float)(ref_count - faults) / ref_count * 100);

    return 0;
}
```

---

## Q7: C-SCAN + Optimal

**C-SCAN** = Circular SCAN (move in one direction, jump to the other end, continue same direction).
**Optimal** = Replace the page that will not be used for the longest time in the future.

### Complete C Program

```c
#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

int main() {
    int frames, head, disk_size;
    printf("Enter number of frames: ");
    scanf("%d", &frames);
    printf("Enter initial head position: ");
    scanf("%d", &head);
    printf("Enter disk size (max cylinder): ");
    scanf("%d", &disk_size);

    int page[100], cyl[100], n = 0;
    printf("Enter (page_no cylinder_pos) pairs, -1 to stop:\n");
    while (1) {
        int p;
        scanf("%d", &p);
        if (p == -1) break;
        page[n] = p;
        scanf("%d", &cyl[n]);
        n++;
    }

    // ========================================
    // PART 1: C-SCAN Disk Scheduling
    // ========================================
    // C-SCAN: move right, go to end, jump to 0, continue right
    printf("\n=== C-SCAN Disk Scheduling ===\n");

    // Sort cylinders (keeping index association)
    int idx[100];
    for (int i = 0; i < n; i++) idx[i] = i;
    for (int i = 0; i < n - 1; i++)
        for (int j = 0; j < n - i - 1; j++)
            if (cyl[idx[j]] > cyl[idx[j + 1]]) {
                int tmp = idx[j];
                idx[j] = idx[j + 1];
                idx[j + 1] = tmp;
            }

    int order[100], order_count = 0;
    int thm = 0, cur = head;

    // Serve requests >= head (ascending)
    for (int i = 0; i < n; i++)
        if (cyl[idx[i]] >= head)
            order[order_count++] = idx[i];

    // Go to end (disk_size-1), jump to 0 (no seek cost for jump in some versions;
    // in standard C-SCAN, the jump counts: head->end + end->0)
    // Then serve requests < head (ascending, from 0 upward)
    for (int i = 0; i < n; i++)
        if (cyl[idx[i]] < head)
            order[order_count++] = idx[i];

    // Calculate THM
    printf("Head movement: %d", head);
    cur = head;

    // Count right-side requests
    int right_count = 0;
    for (int i = 0; i < n; i++)
        if (cyl[idx[i]] >= head) right_count++;

    bool has_left = (order_count > right_count);

    // Go right
    for (int i = 0; i < right_count; i++) {
        thm += abs(cyl[order[i]] - cur);
        cur = cyl[order[i]];
        printf(" -> %d", cur);
    }

    if (has_left) {
        // Go to end
        thm += abs((disk_size - 1) - cur);
        cur = disk_size - 1;
        printf(" -> %d", cur);
        // Jump to 0
        thm += cur;  // distance from end to 0
        cur = 0;
        printf(" -> %d", cur);
        // Go right from 0
        for (int i = right_count; i < order_count; i++) {
            thm += abs(cyl[order[i]] - cur);
            cur = cyl[order[i]];
            printf(" -> %d", cur);
        }
    }
    printf("\nTotal Head Movement: %d\n", thm);

    // Extract page reference string
    int ref[100];
    printf("\nPage reference string (from C-SCAN order): ");
    for (int i = 0; i < order_count; i++) {
        ref[i] = page[order[i]];
        printf("%d ", ref[i]);
    }
    printf("\n");
    int ref_count = order_count;

    // ========================================
    // PART 2: Optimal Page Replacement
    // ========================================
    printf("\n=== Optimal Page Replacement ===\n");

    int frame_arr[frames];
    for (int i = 0; i < frames; i++) frame_arr[i] = -1;

    int faults = 0;
    for (int i = 0; i < ref_count; i++) {
        // Check for HIT
        bool found = false;
        for (int j = 0; j < frames; j++) {
            if (frame_arr[j] == ref[i]) {
                found = true;
                break;
            }
        }

        if (!found) {
            // PAGE FAULT
            int replace_idx = -1;

            // Check for empty frame
            for (int j = 0; j < frames; j++) {
                if (frame_arr[j] == -1) {
                    replace_idx = j;
                    break;
                }
            }

            if (replace_idx == -1) {
                // Optimal: evict the page not used for the longest time in FUTURE
                int farthest_use = -1;
                for (int j = 0; j < frames; j++) {
                    // Find next use of frame_arr[j] after position i
                    int next_use = 999999;  // assume never used again
                    for (int k = i + 1; k < ref_count; k++) {
                        if (ref[k] == frame_arr[j]) {
                            next_use = k;
                            break;
                        }
                    }
                    if (next_use > farthest_use) {
                        farthest_use = next_use;
                        replace_idx = j;
                    }
                }
            }

            frame_arr[replace_idx] = ref[i];
            faults++;
            printf("Page %d  FAULT  Frames: ", ref[i]);
        } else {
            printf("Page %d  HIT    Frames: ", ref[i]);
        }

        for (int j = 0; j < frames; j++)
            if (frame_arr[j] != -1) printf("%d ", frame_arr[j]);
        printf("\n");
    }

    printf("\nTotal page faults: %d\n", faults);
    printf("Hit ratio: %.2f%%\n", (float)(ref_count - faults) / ref_count * 100);

    return 0;
}
```

---

## Q8: LOOK + LFU

**LOOK** = Like SCAN but reverses at the last request in each direction (does NOT go to disk end).
**LFU** = Least Frequently Used.

### Complete C Program

```c
#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

int main() {
    int frames, head;
    char direction;
    printf("Enter number of frames: ");
    scanf("%d", &frames);
    printf("Enter initial head position: ");
    scanf("%d", &head);
    printf("Enter initial direction (l/r): ");
    scanf(" %c", &direction);

    int page[100], cyl[100], n = 0;
    printf("Enter (page_no cylinder_pos) pairs, -1 to stop:\n");
    while (1) {
        int p;
        scanf("%d", &p);
        if (p == -1) break;
        page[n] = p;
        scanf("%d", &cyl[n]);
        n++;
    }

    // ========================================
    // PART 1: LOOK Disk Scheduling
    // ========================================
    printf("\n=== LOOK Disk Scheduling ===\n");

    // Sort cylinders
    int idx[100];
    for (int i = 0; i < n; i++) idx[i] = i;
    for (int i = 0; i < n - 1; i++)
        for (int j = 0; j < n - i - 1; j++)
            if (cyl[idx[j]] > cyl[idx[j + 1]]) {
                int tmp = idx[j];
                idx[j] = idx[j + 1];
                idx[j + 1] = tmp;
            }

    int order[100], order_count = 0;
    int thm = 0, cur = head;

    if (direction == 'r' || direction == 'R') {
        // LOOK right: serve >= head ascending, then < head descending
        // Does NOT go to disk end
        for (int i = 0; i < n; i++)
            if (cyl[idx[i]] >= head)
                order[order_count++] = idx[i];
        for (int i = n - 1; i >= 0; i--)
            if (cyl[idx[i]] < head)
                order[order_count++] = idx[i];
    } else {
        // LOOK left: serve <= head descending, then > head ascending
        for (int i = n - 1; i >= 0; i--)
            if (cyl[idx[i]] <= head)
                order[order_count++] = idx[i];
        for (int i = 0; i < n; i++)
            if (cyl[idx[i]] > head)
                order[order_count++] = idx[i];
    }

    printf("Head movement: %d", head);
    cur = head;
    for (int i = 0; i < order_count; i++) {
        thm += abs(cyl[order[i]] - cur);
        cur = cyl[order[i]];
        printf(" -> %d", cur);
    }
    printf("\nTotal Head Movement: %d\n", thm);

    // Extract page reference string
    int ref[100];
    printf("\nPage reference string (from LOOK order): ");
    for (int i = 0; i < order_count; i++) {
        ref[i] = page[order[i]];
        printf("%d ", ref[i]);
    }
    printf("\n");
    int ref_count = order_count;

    // ========================================
    // PART 2: LFU Page Replacement
    // ========================================
    printf("\n=== LFU Page Replacement ===\n");

    int frame_arr[frames], freq[frames], time_in[frames];
    for (int i = 0; i < frames; i++) {
        frame_arr[i] = -1;
        freq[i] = 0;
        time_in[i] = 0;
    }

    int faults = 0;
    for (int i = 0; i < ref_count; i++) {
        bool found = false;
        for (int j = 0; j < frames; j++) {
            if (frame_arr[j] == ref[i]) {
                found = true;
                freq[j]++;
                break;
            }
        }

        if (!found) {
            int replace_idx = -1;
            for (int j = 0; j < frames; j++) {
                if (frame_arr[j] == -1) {
                    replace_idx = j;
                    break;
                }
            }

            if (replace_idx == -1) {
                // LFU: evict LEAST frequent. Tie: oldest arrival.
                replace_idx = 0;
                for (int j = 1; j < frames; j++) {
                    if (freq[j] < freq[replace_idx] ||
                        (freq[j] == freq[replace_idx] && time_in[j] < time_in[replace_idx]))
                        replace_idx = j;
                }
            }

            frame_arr[replace_idx] = ref[i];
            freq[replace_idx] = 1;
            time_in[replace_idx] = i;
            faults++;
            printf("Page %d  FAULT  Frames: ", ref[i]);
        } else {
            printf("Page %d  HIT    Frames: ", ref[i]);
        }

        for (int j = 0; j < frames; j++)
            if (frame_arr[j] != -1) printf("%d ", frame_arr[j]);
        printf("\n");
    }

    printf("\nTotal page faults: %d\n", faults);
    printf("Hit ratio: %.2f%%\n", (float)(ref_count - faults) / ref_count * 100);

    return 0;
}
```

---

## Q9: C-LOOK + MFU

**C-LOOK** = Circular LOOK (move in one direction, jump to lowest request, continue same direction).
**MFU** = Most Frequently Used.

### Complete C Program

```c
#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

int main() {
    int frames, head;
    printf("Enter number of frames: ");
    scanf("%d", &frames);
    printf("Enter initial head position: ");
    scanf("%d", &head);

    int page[100], cyl[100], n = 0;
    printf("Enter (page_no cylinder_pos) pairs, -1 to stop:\n");
    while (1) {
        int p;
        scanf("%d", &p);
        if (p == -1) break;
        page[n] = p;
        scanf("%d", &cyl[n]);
        n++;
    }

    // ========================================
    // PART 1: C-LOOK Disk Scheduling
    // ========================================
    // C-LOOK: go right, reverse to lowest request (not 0), continue right
    printf("\n=== C-LOOK Disk Scheduling ===\n");

    int idx[100];
    for (int i = 0; i < n; i++) idx[i] = i;
    for (int i = 0; i < n - 1; i++)
        for (int j = 0; j < n - i - 1; j++)
            if (cyl[idx[j]] > cyl[idx[j + 1]]) {
                int tmp = idx[j];
                idx[j] = idx[j + 1];
                idx[j + 1] = tmp;
            }

    int order[100], order_count = 0;
    int thm = 0, cur = head;

    // Serve requests >= head (ascending)
    for (int i = 0; i < n; i++)
        if (cyl[idx[i]] >= head)
            order[order_count++] = idx[i];

    // Jump to lowest request, serve requests < head (ascending)
    for (int i = 0; i < n; i++)
        if (cyl[idx[i]] < head)
            order[order_count++] = idx[i];

    printf("Head movement: %d", head);
    cur = head;
    for (int i = 0; i < order_count; i++) {
        thm += abs(cyl[order[i]] - cur);
        cur = cyl[order[i]];
        printf(" -> %d", cur);
    }
    printf("\nTotal Head Movement: %d\n", thm);

    // Extract page reference string
    int ref[100];
    printf("\nPage reference string (from C-LOOK order): ");
    for (int i = 0; i < order_count; i++) {
        ref[i] = page[order[i]];
        printf("%d ", ref[i]);
    }
    printf("\n");
    int ref_count = order_count;

    // ========================================
    // PART 2: MFU Page Replacement
    // ========================================
    printf("\n=== MFU Page Replacement ===\n");

    int frame_arr[frames], freq[frames], time_in[frames];
    for (int i = 0; i < frames; i++) {
        frame_arr[i] = -1;
        freq[i] = 0;
        time_in[i] = 0;
    }

    int faults = 0;
    for (int i = 0; i < ref_count; i++) {
        bool found = false;
        for (int j = 0; j < frames; j++) {
            if (frame_arr[j] == ref[i]) {
                found = true;
                freq[j]++;
                break;
            }
        }

        if (!found) {
            int replace_idx = -1;
            for (int j = 0; j < frames; j++) {
                if (frame_arr[j] == -1) {
                    replace_idx = j;
                    break;
                }
            }

            if (replace_idx == -1) {
                // MFU: evict MOST frequent. Tie: oldest arrival.
                replace_idx = 0;
                for (int j = 1; j < frames; j++) {
                    if (freq[j] > freq[replace_idx] ||
                        (freq[j] == freq[replace_idx] && time_in[j] < time_in[replace_idx]))
                        replace_idx = j;
                }
            }

            frame_arr[replace_idx] = ref[i];
            freq[replace_idx] = 1;
            time_in[replace_idx] = i;
            faults++;
            printf("Page %d  FAULT  Frames: ", ref[i]);
        } else {
            printf("Page %d  HIT    Frames: ", ref[i]);
        }

        for (int j = 0; j < frames; j++)
            if (frame_arr[j] != -1) printf("%d ", frame_arr[j]);
        printf("\n");
    }

    printf("\nTotal page faults: %d\n", faults);
    printf("Hit ratio: %.2f%%\n", (float)(ref_count - faults) / ref_count * 100);

    return 0;
}
```

---

## Q10: FCFS + FIFO

**FCFS** = First Come First Served (serve requests in arrival order -- the simplest combo).
**FIFO** = First In First Out.

### Complete C Program

```c
#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

int main() {
    int frames, head;
    printf("Enter number of frames: ");
    scanf("%d", &frames);
    printf("Enter initial head position: ");
    scanf("%d", &head);

    int page[100], cyl[100], n = 0;
    printf("Enter (page_no cylinder_pos) pairs, -1 to stop:\n");
    while (1) {
        int p;
        scanf("%d", &p);
        if (p == -1) break;
        page[n] = p;
        scanf("%d", &cyl[n]);
        n++;
    }

    // ========================================
    // PART 1: FCFS Disk Scheduling
    // ========================================
    printf("\n=== FCFS Disk Scheduling ===\n");
    // FCFS = serve in arrival order. order[i] = i.

    int thm = 0, cur = head;
    printf("Head movement: %d", cur);
    for (int i = 0; i < n; i++) {
        thm += abs(cyl[i] - cur);
        cur = cyl[i];
        printf(" -> %d", cur);
    }
    printf("\nTotal Head Movement: %d\n", thm);

    // Page reference string is just page[] in original order
    int ref[100];
    printf("\nPage reference string (from FCFS order): ");
    for (int i = 0; i < n; i++) {
        ref[i] = page[i];
        printf("%d ", ref[i]);
    }
    printf("\n");

    // ========================================
    // PART 2: FIFO Page Replacement
    // ========================================
    printf("\n=== FIFO Page Replacement ===\n");

    int frame_arr[frames];
    int fifo_ptr = 0;
    for (int i = 0; i < frames; i++) frame_arr[i] = -1;

    int faults = 0;
    for (int i = 0; i < n; i++) {
        bool found = false;
        for (int j = 0; j < frames; j++) {
            if (frame_arr[j] == ref[i]) {
                found = true;
                break;
            }
        }

        if (!found) {
            frame_arr[fifo_ptr] = ref[i];
            fifo_ptr = (fifo_ptr + 1) % frames;
            faults++;
            printf("Page %d  FAULT  Frames: ", ref[i]);
        } else {
            printf("Page %d  HIT    Frames: ", ref[i]);
        }

        for (int j = 0; j < frames; j++)
            if (frame_arr[j] != -1) printf("%d ", frame_arr[j]);
        printf("\n");
    }

    printf("\nTotal page faults: %d\n", faults);
    printf("Hit ratio: %.2f%%\n", (float)(n - faults) / n * 100);

    return 0;
}
```

---

## Q11: First Fit + Banker's Safety

**First Fit** = Allocate from the first block (in sorted descending order) that is large enough.
**Banker's Safety** = Same as Q3/Q4.

### Complete C Program

```c
#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

void sort_desc(int arr[], int n) {
    for (int i = 0; i < n - 1; i++)
        for (int j = 0; j < n - i - 1; j++)
            if (arr[j] < arr[j + 1]) {
                int tmp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = tmp;
            }
}

void print_arr(int arr[], int n) {
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\n");
}

int main() {
    int nb, np;
    printf("Enter number of memory blocks: ");
    scanf("%d", &nb);
    printf("Enter number of processes: ");
    scanf("%d", &np);

    int block[100];
    printf("Enter size of each memory block:\n");
    for (int i = 0; i < nb; i++)
        scanf("%d", &block[i]);

    int max_alloc[100], cur_alloc[100];
    printf("Enter maximum memory for each process:\n");
    for (int i = 0; i < np; i++) {
        printf("P%d: ", i);
        scanf("%d", &max_alloc[i]);
        cur_alloc[i] = 0;
    }

    int pid, resource;
    printf("\nEnter (pid resource_amount), -1 to stop:\n");

    while (1) {
        scanf("%d", &pid);
        if (pid == -1) break;
        scanf("%d", &resource);

        printf("\n--- P%d requests %d bytes ---\n", pid, resource);

        // Sort descending before allocation
        sort_desc(block, nb);
        printf("Memory before (sorted desc): ");
        print_arr(block, nb);

        // === First Fit: first block >= resource (in desc sorted order) ===
        int fit_idx = -1;
        for (int i = 0; i < nb; i++) {
            if (block[i] >= resource) {
                fit_idx = i;
                break;  // FIRST one found (largest first since sorted desc)
            }
        }

        if (fit_idx != -1) {
            block[fit_idx] -= resource;
            cur_alloc[pid] += resource;
            printf("First Fit: allocated from block[%d] (remaining: %d)\n", fit_idx, block[fit_idx]);
        } else {
            printf("P%d NOT ALLOCATED (no suitable block)\n", pid);
            continue;
        }

        sort_desc(block, nb);
        printf("Memory after (sorted desc): ");
        print_arr(block, nb);

        // === Banker's Safety Check ===
        int work = 0;
        for (int i = 0; i < nb; i++) work += block[i];

        bool finish[100];
        int safe_seq[100];
        int seq_count = 0;
        for (int i = 0; i < np; i++) finish[i] = false;

        bool progress = true;
        while (progress && seq_count < np) {
            progress = false;
            for (int i = 0; i < np; i++) {
                if (!finish[i] && cur_alloc[i] > 0) {
                    int need = max_alloc[i] - cur_alloc[i];
                    if (need <= work) {
                        work += cur_alloc[i];
                        finish[i] = true;
                        safe_seq[seq_count++] = i;
                        progress = true;
                    }
                } else if (!finish[i] && cur_alloc[i] == 0) {
                    finish[i] = true;
                }
            }
        }

        bool safe = true;
        for (int i = 0; i < np; i++) {
            if (cur_alloc[i] > 0 && !finish[i]) {
                safe = false;
                break;
            }
        }

        if (safe) {
            printf("System is SAFE\n");
            if (seq_count > 0) {
                printf("Safe sequence: ");
                for (int i = 0; i < seq_count; i++)
                    printf("P%d ", safe_seq[i]);
                printf("\n");
            }
        } else {
            printf("System is NOT SAFE!\n");
        }
    }

    printf("\n=== Final Allocation ===\n");
    for (int i = 0; i < np; i++)
        printf("P%d: %d / %d (max)\n", i, cur_alloc[i], max_alloc[i]);

    return 0;
}
```

**Key difference from Best Fit:** First Fit takes the first suitable block in descending-sorted order (i.e., the largest suitable block comes first). Best Fit scans ALL blocks and picks the smallest suitable one.

---

## Q12: Worst Fit + Banker's Safety

**Worst Fit** = Allocate from the LARGEST available block.
**Banker's Safety** = Same as Q3/Q4.

### Complete C Program

```c
#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

void sort_desc(int arr[], int n) {
    for (int i = 0; i < n - 1; i++)
        for (int j = 0; j < n - i - 1; j++)
            if (arr[j] < arr[j + 1]) {
                int tmp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = tmp;
            }
}

void print_arr(int arr[], int n) {
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\n");
}

int main() {
    int nb, np;
    printf("Enter number of memory blocks: ");
    scanf("%d", &nb);
    printf("Enter number of processes: ");
    scanf("%d", &np);

    int block[100];
    printf("Enter size of each memory block:\n");
    for (int i = 0; i < nb; i++)
        scanf("%d", &block[i]);

    int max_alloc[100], cur_alloc[100];
    printf("Enter maximum memory for each process:\n");
    for (int i = 0; i < np; i++) {
        printf("P%d: ", i);
        scanf("%d", &max_alloc[i]);
        cur_alloc[i] = 0;
    }

    int pid, resource;
    printf("\nEnter (pid resource_amount), -1 to stop:\n");

    while (1) {
        scanf("%d", &pid);
        if (pid == -1) break;
        scanf("%d", &resource);

        printf("\n--- P%d requests %d bytes ---\n", pid, resource);

        sort_desc(block, nb);
        printf("Memory before (sorted desc): ");
        print_arr(block, nb);

        // === Worst Fit: find LARGEST block >= resource ===
        int worst_idx = -1;
        for (int i = 0; i < nb; i++) {
            if (block[i] >= resource) {
                if (worst_idx == -1 || block[i] > block[worst_idx])
                    worst_idx = i;
            }
        }

        if (worst_idx != -1) {
            block[worst_idx] -= resource;
            cur_alloc[pid] += resource;
            printf("Worst Fit: allocated from block[%d] (remaining: %d)\n", worst_idx, block[worst_idx]);
        } else {
            printf("P%d NOT ALLOCATED (no suitable block)\n", pid);
            continue;
        }

        sort_desc(block, nb);
        printf("Memory after (sorted desc): ");
        print_arr(block, nb);

        // === Banker's Safety Check ===
        int work = 0;
        for (int i = 0; i < nb; i++) work += block[i];

        bool finish[100];
        int safe_seq[100];
        int seq_count = 0;
        for (int i = 0; i < np; i++) finish[i] = false;

        bool progress = true;
        while (progress && seq_count < np) {
            progress = false;
            for (int i = 0; i < np; i++) {
                if (!finish[i] && cur_alloc[i] > 0) {
                    int need = max_alloc[i] - cur_alloc[i];
                    if (need <= work) {
                        work += cur_alloc[i];
                        finish[i] = true;
                        safe_seq[seq_count++] = i;
                        progress = true;
                    }
                } else if (!finish[i] && cur_alloc[i] == 0) {
                    finish[i] = true;
                }
            }
        }

        bool safe = true;
        for (int i = 0; i < np; i++) {
            if (cur_alloc[i] > 0 && !finish[i]) {
                safe = false;
                break;
            }
        }

        if (safe) {
            printf("System is SAFE\n");
            if (seq_count > 0) {
                printf("Safe sequence: ");
                for (int i = 0; i < seq_count; i++)
                    printf("P%d ", safe_seq[i]);
                printf("\n");
            }
        } else {
            printf("System is NOT SAFE!\n");
        }
    }

    printf("\n=== Final Allocation ===\n");
    for (int i = 0; i < np; i++)
        printf("P%d: %d / %d (max)\n", i, cur_alloc[i], max_alloc[i]);

    return 0;
}
```

**Key difference:** Worst Fit picks `block[i] > block[worst_idx]` (largest). Since blocks are sorted descending, Worst Fit always picks `block[0]` (the first/largest). But we keep the general loop for correctness.

---

## Exam Strategy

### Step-by-step approach for ANY combo question

1. **Read the question completely.** Identify which two algorithms are combined.
   - Disk + Page replacement? Or Memory allocation + Safety?

2. **Write the boilerplate FIRST:**
   ```c
   #include <stdio.h>
   #include <stdlib.h>
   #include <stdbool.h>
   int main() { ... return 0; }
   ```

3. **Code the input section.** All combos use one of two patterns:
   - Disk+Page: `frames, head, (page, cyl) pairs`
   - Memory+Safety: `blocks[], processes[], max[], (pid, resource) pairs`

4. **Code Algorithm 1** (disk scheduling OR memory allocation).

5. **Connect:** Output of Algorithm 1 becomes input to Algorithm 2.
   - Disk scheduling produces a service order --> extract page reference string
   - Memory allocation modifies blocks --> run safety check

6. **Code Algorithm 2** (page replacement OR safety check).

7. **Match the output format EXACTLY as shown in the question.**

### Quick-reference: Algorithm cores

| Algorithm | Core logic (the ONE line that differs) |
|-----------|---------------------------------------|
| FCFS | `order[i] = i` (arrival order) |
| LCFS | `order[i] = n-1-i` (reverse arrival) |
| SSTF | `min(abs(cyl[j]-cur))` for unvisited |
| LSTF | `max(abs(cyl[j]-cur))` for unvisited |
| SCAN | Sort cyls, go right then left (hit ends) |
| C-SCAN | Sort cyls, go right, jump to 0, go right |
| LOOK | Sort cyls, go right then left (hit last request) |
| C-LOOK | Sort cyls, go right, jump to lowest request, go right |
| FIFO | Replace at `fifo_ptr`, advance circularly |
| LRU | Replace frame with smallest `last_used[j]` |
| LFU | Replace frame with smallest `freq[j]` |
| MFU | Replace frame with largest `freq[j]` |
| Optimal | Replace frame whose next use is farthest in future |
| First Fit | First block >= size (in sorted desc order) |
| Best Fit | Smallest block >= size |
| Worst Fit | Largest block >= size |

### Common pitfalls

1. **Forgetting to sort blocks descending** before displaying memory state.
2. **SCAN vs LOOK:** SCAN goes to disk boundary (0 or disk_size-1). LOOK stops at the last request.
3. **C-SCAN vs C-LOOK:** C-SCAN jumps from disk_size-1 to 0. C-LOOK jumps from last request to first request.
4. **LFU vs MFU:** LFU evicts `min(freq)`. MFU evicts `max(freq)`. Both use oldest-arrival as tie-breaker.
5. **Frequency starts at 1** when a page is loaded (the fault counts as the first access).
6. **Safety check:** processes with `cur_alloc == 0` are trivially safe (skip them in the safe sequence).
7. **Hit ratio formula:** `(total_references - faults) / total_references * 100`.

---

## All Possible Combinations Reference

### Disk Scheduling + Page Replacement

| Disk Scheduling | Page Replacement | Notes |
|----------------|-----------------|-------|
| FCFS | FIFO | Simplest combo. Both use arrival order. |
| FCFS | LRU | FCFS order, LRU replacement. |
| FCFS | LFU | FCFS order, LFU replacement. |
| FCFS | MFU | FCFS order, MFU replacement. |
| FCFS | Optimal | FCFS order, Optimal replacement. |
| SSTF | FIFO | Nearest-first scheduling. |
| SSTF | LRU | **Common PYQ pattern.** |
| SSTF | LFU | Nearest-first + least frequent. |
| SSTF | MFU | Nearest-first + most frequent. |
| SSTF | Optimal | Nearest-first + optimal. |
| SCAN | FIFO | Elevator + FIFO. Needs direction + disk size. |
| SCAN | LRU | Elevator + LRU. |
| SCAN | LFU | Elevator + LFU. |
| SCAN | MFU | Elevator + MFU. |
| SCAN | Optimal | Elevator + Optimal. |
| C-SCAN | FIFO | Circular elevator + FIFO. |
| C-SCAN | LRU | Circular elevator + LRU. |
| C-SCAN | LFU | Circular elevator + LFU. |
| C-SCAN | MFU | Circular elevator + MFU. |
| C-SCAN | Optimal | **Q7 above.** |
| LOOK | FIFO | LOOK + FIFO. |
| LOOK | LRU | LOOK + LRU. |
| LOOK | LFU | **Q8 above.** |
| LOOK | MFU | LOOK + MFU. |
| LOOK | Optimal | LOOK + Optimal. |
| C-LOOK | FIFO | C-LOOK + FIFO. |
| C-LOOK | LRU | C-LOOK + LRU. |
| C-LOOK | LFU | C-LOOK + LFU. |
| C-LOOK | MFU | **Q9 above.** |
| C-LOOK | Optimal | C-LOOK + Optimal. |
| LSTF | FIFO | Farthest-first + FIFO. |
| LSTF | LRU | Farthest-first + LRU. |
| LSTF | LFU | Farthest-first + LFU. |
| LSTF | MFU | **Q1 above.** |
| LSTF | Optimal | Farthest-first + Optimal. |
| LCFS | FIFO | Reverse order + FIFO. |
| LCFS | LRU | Reverse order + LRU. |
| LCFS | LFU | **Q2 above.** |
| LCFS | MFU | Reverse order + MFU. |
| LCFS | Optimal | Reverse order + Optimal. |

### Memory Allocation + Safety Check

| Allocation Strategy | Safety Check | Notes |
|-------------------|-------------|-------|
| First Fit | Banker's Safety | **Q11 above.** |
| Best Fit | Banker's Safety | **Q3/Q4 above.** |
| Worst Fit | Banker's Safety | **Q12 above.** |

### How to adapt any combo from the programs above

All disk scheduling + page replacement combos use the SAME structure:
1. Read input (always the same).
2. Swap in the disk scheduling algorithm (only the loop that computes `order[]` changes).
3. Swap in the page replacement algorithm (only the eviction logic changes).

For any combo not explicitly listed, just:
- Copy the closest program above.
- Replace the disk scheduling section with the one you need (copy from the relevant program).
- Replace the page replacement section with the one you need (copy from the relevant program).

The connection between the two halves (extracting `ref[]` from `order[]`) is always identical:
```c
for (int i = 0; i < n; i++)
    ref[i] = page[order[i]];
```

---

## Compilation & Testing

Compile any program above with:
```bash
gcc -o combo combo.c
./combo
```

All programs use standard C99. If your lab uses `gcc` without flags, add `-std=c99` if `stdbool.h` causes issues:
```bash
gcc -std=c99 -o combo combo.c
```
