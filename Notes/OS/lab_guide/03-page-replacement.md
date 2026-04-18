# Page Replacement Algorithms (Lab 10) -- End-Sem Lab Exam Guide

> **Course:** CSS-2211 Operating Systems Lab | MIT Manipal
>
> **PYQ pattern:** Disk scheduling algorithm generates a page request order, which is then fed into a page replacement algorithm (e.g., LSTF + MFU, LCFS + LFU). Know both halves.

---

## Reference String Used in ALL Examples

```
7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2, 1, 2, 0, 1, 7, 0, 1
Frames = 3
```

---

## 1. FIFO (First In First Out)

### Theory

Replace the **oldest page** -- the one that was loaded into memory first. Maintain a circular pointer that advances each time a replacement happens. FIFO does not care whether a page is being used frequently or was just accessed; only insertion order matters.

**Key property:** Suffers from **Belady's Anomaly** -- increasing the number of frames can *increase* page faults. This is the only stack-based anomaly worth remembering.

### Worked Example (15 page faults)

```
Step  Ref  Action     F1  F2  F3   Reason
────  ───  ─────────  ──  ──  ──   ──────
 0     7   FAULT      7   -   -    Empty frame, load 7. ptr->F2
 1     0   FAULT      7   0   -    Empty frame, load 0. ptr->F3
 2     1   FAULT      7   0   1    Empty frame, load 1. ptr->F1
 3     2   FAULT      2   0   1    ptr at F1, replace 7 with 2. ptr->F2
 4     0   HIT        2   0   1    0 found in F2
 5     3   FAULT      2   3   1    ptr at F2, replace 0 with 3. ptr->F3
 6     0   FAULT      2   3   0    ptr at F3, replace 1 with 0. ptr->F1
 7     4   FAULT      4   3   0    ptr at F1, replace 2 with 4. ptr->F2
 8     2   FAULT      4   2   0    ptr at F2, replace 3 with 2. ptr->F3
 9     3   FAULT      4   2   3    ptr at F3, replace 0 with 3. ptr->F1
10     0   FAULT      0   2   3    ptr at F1, replace 4 with 0. ptr->F2
11     3   HIT        0   2   3    3 found in F3
12     2   HIT        0   2   3    2 found in F2
13     1   FAULT      0   1   3    ptr at F2, replace 2 with 1. ptr->F3
14     2   FAULT      0   1   2    ptr at F3, replace 3 with 2. ptr->F1
15     0   HIT        0   1   2    0 found in F1
16     1   HIT        0   1   2    1 found in F2
17     7   FAULT      7   1   2    ptr at F1, replace 0 with 7. ptr->F2
18     0   FAULT      7   0   2    ptr at F2, replace 1 with 0. ptr->F3
19     1   FAULT      7   0   1    ptr at F3, replace 2 with 1. ptr->F1

Total page faults = 15    Hit ratio = 5/20 = 25%
```

Compact view:
```
Ref: 7  0  1  2  0  3  0  4  2  3  0  3  2  1  2  0  1  7  0  1
F1:  7  7  7  2  2  2  2  4  4  4  0  0  0  0  0  0  0  7  7  7
F2:  -  0  0  0  0  3  3  3  2  2  2  2  2  1  1  1  1  1  0  0
F3:  -  -  1  1  1  1  0  0  0  3  3  3  3  3  2  2  2  2  2  1
PF:  *  *  *  *     *  *  *  *  *  *        *  *        *  *  *
                                                     (15 faults)
```

### Complete C Implementation

```c
#include <stdio.h>
#include <stdbool.h>

int main() {
    int frames, pages;
    printf("Enter number of frames: ");
    scanf("%d", &frames);
    printf("Enter number of pages: ");
    scanf("%d", &pages);

    int ref[pages], frame[frames];
    printf("Enter reference string: ");
    for (int i = 0; i < pages; i++) scanf("%d", &ref[i]);

    for (int i = 0; i < frames; i++) frame[i] = -1;

    int faults = 0, ptr = 0;  // ptr = circular queue pointer

    for (int i = 0; i < pages; i++) {
        // Check if page already in frame
        bool found = false;
        for (int j = 0; j < frames; j++)
            if (frame[j] == ref[i]) { found = true; break; }

        if (!found) {
            frame[ptr] = ref[i];
            ptr = (ptr + 1) % frames;  // circular pointer -- key FIFO mechanism
            faults++;
            printf("Page %d  FAULT  Frames: ", ref[i]);
        } else {
            printf("Page %d  HIT    Frames: ", ref[i]);
        }

        for (int j = 0; j < frames; j++)
            if (frame[j] != -1) printf("%d ", frame[j]);
        printf("\n");
    }

    printf("\nTotal page faults: %d\n", faults);
    printf("Hit ratio: %.2f%%\n", (float)(pages - faults) / pages * 100);
    return 0;
}
```

---

## 2. OPTIMAL (OPT)

### Theory

Replace the page that will **not be used for the longest time in the future**. For each page currently in a frame, look ahead in the reference string to find when it is next referenced. Replace the one whose next use is farthest away (or never used again).

**Key property:** Gives the **minimum possible page faults** -- used as a theoretical benchmark. Impractical in real systems because it requires future knowledge.

### Worked Example (9 page faults)

```
Step  Ref  Action     F1  F2  F3   Reason
────  ───  ─────────  ──  ──  ──   ──────
 0     7   FAULT      7   -   -    Empty frame
 1     0   FAULT      7   0   -    Empty frame
 2     1   FAULT      7   0   1    Empty frame
 3     2   FAULT      2   0   1    Who to replace? Look ahead from pos 4:
                                     7: next use at pos 17
                                     0: next use at pos 4
                                     1: next use at pos 13
                                   7 is farthest -> replace 7
 4     0   HIT        2   0   1    0 in F2
 5     3   FAULT      2   0   3    Who to replace? Look ahead from pos 6:
                                     2: next use at pos 8
                                     0: next use at pos 6
                                     1: next use at pos 13
                                   1 is farthest -> replace 1
 6     0   HIT        2   0   3    0 in F2
 7     4   FAULT      2   4   3    Who to replace? Look ahead from pos 8:
                                     2: next use at pos 8
                                     0: next use at pos 10
                                     3: next use at pos 9
                                   0 is farthest -> replace 0
 8     2   HIT        2   4   3    2 in F1
 9     3   HIT        2   4   3    3 in F3
10     0   FAULT      2   0   3    Who to replace? Look ahead from pos 11:
                                     2: next use at pos 12
                                     4: NEVER used again
                                     3: next use at pos 11
                                   4 is farthest (never) -> replace 4
11     3   HIT        2   0   3    3 in F3
12     2   HIT        2   0   3    2 in F1
13     1   FAULT      2   0   1    Who to replace? Look ahead from pos 14:
                                     2: next use at pos 14
                                     0: next use at pos 15
                                     3: NEVER used again
                                   3 is farthest (never) -> replace 3
14     2   HIT        2   0   1    2 in F1
15     0   HIT        2   0   1    0 in F2
16     1   HIT        2   0   1    1 in F3
17     7   FAULT      7   0   1    Who to replace? Look ahead from pos 18:
                                     2: NEVER used again
                                     0: next use at pos 18
                                     1: next use at pos 19
                                   2 is farthest (never) -> replace 2
18     0   HIT        7   0   1    0 in F2
19     1   HIT        7   0   1    1 in F3

Total page faults = 9    Hit ratio = 11/20 = 55%
```

### Complete C Implementation

```c
#include <stdio.h>
#include <stdbool.h>

int main() {
    int frames, pages;
    printf("Enter number of frames: ");
    scanf("%d", &frames);
    printf("Enter number of pages in reference string: ");
    scanf("%d", &pages);

    int ref[pages], frame[frames];
    printf("Enter reference string: ");
    for (int i = 0; i < pages; i++) scanf("%d", &ref[i]);

    for (int i = 0; i < frames; i++) frame[i] = -1;

    int faults = 0;

    for (int i = 0; i < pages; i++) {
        // Check if page already in frame
        bool found = false;
        for (int j = 0; j < frames; j++)
            if (frame[j] == ref[i]) { found = true; break; }

        if (!found) {
            // Check for empty frame first 
            bool empty_found = false;
            for (int j = 0; j < frames; j++) {
                if (frame[j] == -1) {
                    frame[j] = ref[i];
                    empty_found = true;
                    break;
                }
            }

            if (!empty_found) {
                // Find page not used for longest time in FUTURE
                int replace_idx = 0, farthest = -1;
                for (int j = 0; j < frames; j++) {
                    int next_use = pages;  // default: never used again (= infinity)
                    for (int k = i + 1; k < pages; k++) {
                        if (frame[j] == ref[k]) {
                            next_use = k;
                            break;          // stop at FIRST future occurrence
                        }
                    }
                    if (next_use > farthest) {
                        farthest = next_use;
                        replace_idx = j;
                    }
                }
                frame[replace_idx] = ref[i];
            }
            faults++;
            printf("Page %d  FAULT  Frames: ", ref[i]);
        } else {
            printf("Page %d  HIT    Frames: ", ref[i]);
        }

        for (int j = 0; j < frames; j++)
            if (frame[j] != -1) printf("%d ", frame[j]);
        printf("\n");
    }

    printf("\nTotal page faults: %d\n", faults);
    printf("Hit ratio: %.2f%%\n", (float)(pages - faults) / pages * 100);
    return 0;
}
```

---

## 3. LRU (Least Recently Used)

### Theory

Replace the page that has **not been used for the longest time** (looking backward). For each page in frame, track the most recent time it was accessed. On a fault, evict the page with the smallest "last used" timestamp.

**Key property:** Approximation of Optimal -- instead of looking forward (which requires future knowledge), LRU looks backward. Uses the principle of temporal locality: recently used pages are likely to be used again soon. Does **not** suffer from Belady's Anomaly.

### Worked Example (12 page faults)

```
Step  Ref  Action     F1  F2  F3   Reason
────  ───  ─────────  ──  ──  ──   ──────
 0     7   FAULT      7   -   -    Empty frame. recent: 7@0
 1     0   FAULT      7   0   -    Empty frame. recent: 7@0, 0@1
 2     1   FAULT      7   0   1    Empty frame. recent: 7@0, 0@1, 1@2
 3     2   FAULT      2   0   1    LRU = 7 (last used @0). Replace 7.
 4     0   HIT        2   0   1    Update 0's last-use to @4
 5     3   FAULT      2   0   3    LRU = 1 (last used @2). Replace 1.
 6     0   HIT        2   0   3    Update 0's last-use to @6
 7     4   FAULT      4   0   3    LRU = 2 (last used @3). Replace 2.
 8     2   FAULT      4   0   2    LRU = 3 (last used @5). Replace 3.
 9     3   FAULT      4   3   2    LRU = 0 (last used @6). Replace 0.
                                   (4@7, 0@6, 2@8 -> 0 is least recent)
                                   Wait -- recalculate: after step 8, recent =
                                   4@7, 0@6, 2@8. Smallest = 0@6. Replace 0.
10     0   FAULT      0   3   2    LRU = 4 (last used @7). Replace 4.
11     3   HIT        0   3   2    Update 3's last-use to @11
12     2   HIT        0   3   2    Update 2's last-use to @12
13     1   FAULT      1   3   2    LRU = 0 (last used @10). Replace 0.
14     2   HIT        1   3   2    Update 2's last-use to @14
15     0   FAULT      1   0   2    LRU = 3 (last used @11). Replace 3.
16     1   HIT        1   0   2    Update 1's last-use to @16
17     7   FAULT      1   0   7    LRU = 2 (last used @14). Replace 2.
18     0   HIT        1   0   7    Update 0's last-use to @18
19     1   HIT        1   0   7    Update 1's last-use to @19

Total page faults = 12    Hit ratio = 8/20 = 40%
```

Compact view:
```
Ref: 7  0  1  2  0  3  0  4  2  3  0  3  2  1  2  0  1  7  0  1
F1:  7  7  7  2  2  2  2  4  4  4  0  0  0  1  1  1  1  1  1  1
F2:  -  0  0  0  0  0  0  0  0  3  3  3  3  3  3  0  0  0  0  0
F3:  -  -  1  1  1  3  3  3  2  2  2  2  2  2  2  2  2  7  7  7
PF:  *  *  *  *     *     *  *  *  *        *     *     *
                                                     (12 faults)
```

### Complete C Implementation

```c
#include <stdio.h>
#include <stdbool.h>

int main() {
    int frames, pages;
    printf("Enter number of frames: ");
    scanf("%d", &frames);
    printf("Enter number of pages in reference string: ");
    scanf("%d", &pages);

    int ref[pages], frame[frames], recent[frames];
    printf("Enter reference string: ");
    for (int i = 0; i < pages; i++) scanf("%d", &ref[i]);

    for (int i = 0; i < frames; i++) { frame[i] = -1; recent[i] = -1; }

    int faults = 0;

    for (int i = 0; i < pages; i++) {
        bool found = false;
        for (int j = 0; j < frames; j++) {
            if (frame[j] == ref[i]) {
                found = true;
                recent[j] = i;   // update last-used time on HIT
                break;
            }
        }

        if (!found) {
            // Find LRU page (smallest recent value)
            int lru_idx = 0;
            // First check for empty frame
            bool empty_found = false;
            for (int j = 0; j < frames; j++) {
                if (frame[j] == -1) {
                    lru_idx = j;
                    empty_found = true;
                    break;
                }
            }
            if (!empty_found) {
                for (int j = 1; j < frames; j++) {
                    if (recent[j] < recent[lru_idx])
                        lru_idx = j;      // this frame was used least recently
                }
            }

            frame[lru_idx] = ref[i];
            recent[lru_idx] = i;          // set last-used time on FAULT too
            faults++;
            printf("Page %d  FAULT  Frames: ", ref[i]);
        } else {
            printf("Page %d  HIT    Frames: ", ref[i]);
        }

        for (int j = 0; j < frames; j++)
            if (frame[j] != -1) printf("%d ", frame[j]);
        printf("\n");
    }

    printf("\nTotal page faults: %d\n", faults);
    printf("Hit ratio: %.2f%%\n", (float)(pages - faults) / pages * 100);
    return 0;
}
```

---

## 4. LFU (Least Frequently Used)

### Theory

Replace the page with the **smallest reference count**. Each page in a frame has a counter that increments on every hit. When a new page is loaded, its counter starts at 1. On a tie (multiple pages with the same frequency), use **FIFO** among the tied pages (replace the one that arrived earliest).

**Key property:** Suffers from Belady's Anomaly. A page used heavily early on can remain in memory long after it stops being relevant, while a newly loaded page with count=1 gets evicted immediately.

### Worked Example (13 page faults)

The `(f=N)` notation shows each page's frequency count.

```
Step  Ref  Action     Frames (with freq)         Reason
────  ───  ─────────  ─────────────────────────   ──────
 0     7   FAULT      7(1)                        Empty frame
 1     0   FAULT      7(1) 0(1)                   Empty frame
 2     1   FAULT      7(1) 0(1) 1(1)              Empty frame
 3     2   FAULT      2(1) 0(1) 1(1)              All freq=1, oldest=7(@0). Replace 7.
 4     0   HIT        2(1) 0(2) 1(1)              0's freq -> 2
 5     3   FAULT      2(1) 0(2) 3(1)              Freq=1: 2(@3), 1(@2). Oldest=1(@2). Replace 1.
 6     0   HIT        2(1) 0(3) 3(1)              0's freq -> 3
 7     4   FAULT      4(1) 0(3) 3(1)              Freq=1: 2(@3), 3(@5). Oldest=2(@3). Replace 2.
 8     2   FAULT      4(1) 0(3) 2(1)              Freq=1: 4(@7), 3(@5). Oldest=3(@5). Replace 3.
 9     3   FAULT      3(1) 0(3) 2(1)              Freq=1: 4(@7), 2(@8). Oldest=4(@7). Replace 4.
10     0   HIT        3(1) 0(4) 2(1)              0's freq -> 4
11     3   HIT        3(2) 0(4) 2(1)              3's freq -> 2
12     2   HIT        3(2) 0(4) 2(2)              2's freq -> 2
13     1   FAULT      3(2) 0(4) 1(1)              Freq: 3(2), 0(4), 2(2). Least=2.
                                                   Tie between 3(f=2,@9) and 2(f=2,@8).
                                                   Oldest arrival = 2(@8). Replace 2.
14     2   FAULT      3(2) 0(4) 2(1)              Least freq=1: only 1(f=1,@13). Replace 1.
15     0   HIT        3(2) 0(5) 2(1)              0's freq -> 5
16     1   FAULT      3(2) 0(5) 1(1)              Least freq=1: only 2(f=1,@14). Replace 2.
17     7   FAULT      3(2) 0(5) 7(1)              Least freq=1: only 1(f=1,@16). Replace 1.
18     0   HIT        3(2) 0(6) 7(1)              0's freq -> 6
19     1   FAULT      3(2) 0(6) 1(1)              Least freq=1: only 7(f=1,@17). Replace 7.

Total page faults = 13    Hit ratio = 7/20 = 35%
```

### Complete C Implementation

```c
#include <stdio.h>
#include <stdbool.h>

int main() {
    int frames, pages;
    printf("Enter number of frames: ");
    scanf("%d", &frames);
    printf("Enter number of pages: ");
    scanf("%d", &pages);

    int ref[pages], frame[frames], freq[frames], time_in[frames];
    printf("Enter reference string: "),`
    for (int i = 0; i < pages; i++) scanf("%d", &ref[i]);

    for (int i = 0; i < frames; i++) {
        frame[i] = -1;
        freq[i] = 0;
        time_in[i] = 0;
    }

    int faults = 0;

    for (int i = 0; i < pages; i++) {
        bool found = false;
        for (int j = 0; j < frames; j++) {
            if (frame[j] == ref[i]) {
                found = true;
                freq[j]++;  // increment frequency on hit
                break;
            }
        }

        if (!found) {
            // Check for empty frame first
            int replace_idx = -1;
            for (int j = 0; j < frames; j++) {
                if (frame[j] == -1) {
                    replace_idx = j;
                    break;
                }
            }

            if (replace_idx == -1) {
                // Find page with LEAST frequency
                // On tie: oldest arrival (smallest time_in)
                replace_idx = 0;
                for (int j = 1; j < frames; j++) {
                    if (freq[j] < freq[replace_idx] ||
                        (freq[j] == freq[replace_idx] && time_in[j] < time_in[replace_idx]))
                        replace_idx = j;
                }
            }

            frame[replace_idx] = ref[i];
            freq[replace_idx] = 1;       // reset frequency for new page
            time_in[replace_idx] = i;     // record arrival time
            faults++;
            printf("Page %d  FAULT  Frames: ", ref[i]);
        } else {
            printf("Page %d  HIT    Frames: ", ref[i]);
        }

        for (int j = 0; j < frames; j++)
            if (frame[j] != -1) printf("%d ", frame[j]);
        printf("\n");
    }

    printf("\nTotal page faults: %d\n", faults);
    printf("Hit ratio: %.2f%%\n", (float)(pages - faults) / pages * 100);
    return 0;
}
```

---

## 5. MFU (Most Frequently Used)

### Theory

Replace the page with the **largest reference count**. The argument: the page with the smallest count was just brought in and will likely be needed again soon, so keep it and evict the heavily-used page instead (it may have finished its burst of use).

On a tie: replace the **oldest** page among the tied pages (FIFO tiebreaker).

**Key property:** Important for PYQ -- appears in the LSTF + MFU combo question.

### Worked Example (15 page faults)

```
Step  Ref  Action     Frames (with freq)         Reason
────  ───  ─────────  ─────────────────────────   ──────
 0     7   FAULT      7(1)                        Empty frame
 1     0   FAULT      7(1) 0(1)                   Empty frame
 2     1   FAULT      7(1) 0(1) 1(1)              Empty frame
 3     2   FAULT      2(1) 0(1) 1(1)              All freq=1, oldest=7(@0). Replace 7.
 4     0   HIT        2(1) 0(2) 1(1)              0's freq -> 2
 5     3   FAULT      2(1) 3(1) 1(1)              Highest freq=2: 0(@1). Replace 0.
 6     0   FAULT      2(1) 3(1) 0(1)              All freq=1, oldest=1(@2). Replace 1.
 7     4   FAULT      4(1) 3(1) 0(1)              All freq=1, oldest=2(@3). Replace 2.
 8     2   FAULT      4(1) 2(1) 0(1)              All freq=1, oldest=3(@5). Replace 3.
 9     3   FAULT      4(1) 2(1) 3(1)              All freq=1, oldest=0(@6). Replace 0.
10     0   FAULT      0(1) 2(1) 3(1)              All freq=1, oldest=4(@7). Replace 4.
11     3   HIT        0(1) 2(1) 3(2)              3's freq -> 2
12     2   HIT        0(1) 2(2) 3(2)              2's freq -> 2
13     1   FAULT      0(1) 1(1) 3(2)              Highest freq=2: 2(@8), 3(@9).
                                                   Oldest arrival = 2(@8). Replace 2.
14     2   FAULT      0(1) 1(1) 2(1)              Highest freq=2: 3(@9). Replace 3.
15     0   HIT        0(2) 1(1) 2(1)              0's freq -> 2
16     1   HIT        0(2) 1(2) 2(1)              1's freq -> 2
17     7   FAULT      7(1) 1(2) 2(1)              Highest freq=2: 0(@10), 1(@13).
                                                   Oldest arrival = 0(@10). Replace 0.
18     0   FAULT      7(1) 0(1) 2(1)              Highest freq=2: 1(@13). Replace 1.
19     1   FAULT      7(1) 0(1) 1(1)              All freq=1, oldest=2(@14). Replace 2.

Total page faults = 15    Hit ratio = 5/20 = 25%
```

### Complete C Implementation

The code is identical to LFU except the comparison operator is flipped (`>` instead of `<`).

```c
#include <stdio.h>
#include <stdbool.h>

int main() {
    int frames, pages;
    printf("Enter number of frames: ");
    scanf("%d", &frames);
    printf("Enter number of pages: ");
    scanf("%d", &pages);

    int ref[pages], frame[frames], freq[frames], time_in[frames];
    printf("Enter reference string: ");
    for (int i = 0; i < pages; i++) scanf("%d", &ref[i]);

    for (int i = 0; i < frames; i++) {
        frame[i] = -1;
        freq[i] = 0;
        time_in[i] = 0;
    }

    int faults = 0;

    for (int i = 0; i < pages; i++) {
        bool found = false;
        for (int j = 0; j < frames; j++) {
            if (frame[j] == ref[i]) {
                found = true;
                freq[j]++;  // increment frequency on hit
                break;
            }
        }

        if (!found) {
            // Check for empty frame first
            int replace_idx = -1;
            for (int j = 0; j < frames; j++) {
                if (frame[j] == -1) {
                    replace_idx = j;
                    break;
                }
            }

            if (replace_idx == -1) {
                // Find page with MOST frequency (only change vs LFU: > instead of <)
                // On tie: oldest arrival (smallest time_in)
                replace_idx = 0;
                for (int j = 1; j < frames; j++) {
                    if (freq[j] > freq[replace_idx] ||
                        (freq[j] == freq[replace_idx] && time_in[j] < time_in[replace_idx]))
                        replace_idx = j;
                }
            }

            frame[replace_idx] = ref[i];
            freq[replace_idx] = 1;       // reset frequency for new page
            time_in[replace_idx] = i;     // record arrival time
            faults++;
            printf("Page %d  FAULT  Frames: ", ref[i]);
        } else {
            printf("Page %d  HIT    Frames: ", ref[i]);
        }

        for (int j = 0; j < frames; j++)
            if (frame[j] != -1) printf("%d ", frame[j]);
        printf("\n");
    }

    printf("\nTotal page faults: %d\n", faults);
    printf("Hit ratio: %.2f%%\n", (float)(pages - faults) / pages * 100);
    return 0;
}
```

---

## 6. Algorithm Comparison Table

| Algorithm | Replaces | What it tracks | Page faults (this example) | Belady's Anomaly? |
|-----------|----------|---------------|:-:|:-:|
| **FIFO** | Oldest loaded page | Queue position (circular ptr) | **15** | Yes |
| **Optimal** | Farthest future use | Future reference string | **9** | No |
| **LRU** | Least recently used | Last access timestamp | **12** | No |
| **LFU** | Least frequently used | Access count per page | **13** | Yes |
| **MFU** | Most frequently used | Access count per page | **15** | Yes |

### Quick Decision Guide

```
Need to replace a page?
  |
  |-- FIFO:     Who has been HERE the longest?        (oldest arrival)
  |-- Optimal:  Who will I NOT NEED the longest?      (farthest future use)
  |-- LRU:      Who have I NOT TOUCHED the longest?   (oldest last-access)
  |-- LFU:      Who have I TOUCHED the FEWEST times?  (smallest count)
  |-- MFU:      Who have I TOUCHED the MOST times?    (largest count)
```

### What Changes Between LFU and MFU in Code

Literally one character:

```c
// LFU -- find LEAST frequent
if (freq[j] < freq[replace_idx] || ...)

// MFU -- find MOST frequent
if (freq[j] > freq[replace_idx] || ...)
```

Everything else (freq tracking, time_in tiebreaker, freq reset on load) stays identical.

---

## 7. PYQ Combo: Disk Scheduling + Page Replacement

### The Pattern (from PYQ Q1 and Q2)

The exam combines two algorithms into one program:

1. **Input:** number of frames, initial head position, then pairs of `(page_number, cylinder_position)` until `-1`
2. **Step 1 -- Disk Scheduling:** Run the disk scheduling algorithm (e.g., LSTF, LCFS) on the cylinder positions to determine the service order
3. **Step 2 -- Extract Pages:** The service order determines which pages get requested and in what order
4. **Step 3 -- Page Replacement:** Feed those page numbers into the page replacement algorithm (e.g., MFU, LFU)

### Known PYQ Combinations

| Question | Disk Scheduling | Page Replacement |
|----------|----------------|-----------------|
| Q1 | LSTF (Largest Seek Time First) | MFU |
| Q2 | LCFS (Last Come First Served) | LFU |

### How LSTF (Largest Seek Time First) Works

LSTF is the opposite of SSTF. At each step, pick the request with the **largest** seek distance from the current head position.

```
Input pairs: (page, cylinder) = (5,98), (3,37), (7,122), (2,14), (8,124), (1,65), (4,67)
Head at 53

Step 1: Distances from 53: 98->45, 37->16, 122->69, 14->39, 124->71, 65->12, 67->14
        Largest = 124 (dist 71). Serve page 8. Head moves to 124.

Step 2: Distances from 124: 98->26, 37->87, 122->2, 14->110, 65->59, 67->57
        Largest = 14 (dist 110). Serve page 2. Head moves to 14.

...continue until all served.

Page request order from LSTF: 8, 2, 7, 5, 1, 3, 4 (example)
Then feed this into MFU with the given number of frames.
```

### How LCFS (Last Come First Served) Works

Service requests in **reverse order of arrival** (stack, not queue). The last request to arrive gets served first. Simply reverse the input order.

```
Input pairs in arrival order: (5,98), (3,37), (7,122), (2,14)
LCFS service order: (2,14), (7,122), (3,37), (5,98)
Page request order: 2, 7, 3, 5
Then feed this into LFU.
```

### Skeleton Code for LSTF + MFU Combo

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

    // Read (page, cylinder) pairs until -1
    int page_arr[100], cyl_arr[100], n = 0;
    printf("Enter (page cylinder) pairs, -1 to stop:\n");
    while (1) {
        int p;
        scanf("%d", &p);
        if (p == -1) break;
        int c;
        scanf("%d", &c);
        page_arr[n] = p;
        cyl_arr[n] = c;
        n++;
    }

    // ── STEP 1: LSTF Disk Scheduling ──
    // Determine service order by always picking largest seek distance
    int visited[n];
    for (int i = 0; i < n; i++) visited[i] = 0;

    int page_order[n];  // resulting page request order
    int cur = head;

    printf("\nLSTF Disk Scheduling Order:\n");
    printf("Head: %d", cur);

    for (int i = 0; i < n; i++) {
        int max_dist = -1, max_idx = -1;
        for (int j = 0; j < n; j++) {
            if (!visited[j] && abs(cyl_arr[j] - cur) > max_dist) {
                max_dist = abs(cyl_arr[j] - cur);
                max_idx = j;
            }
        }
        visited[max_idx] = 1;
        page_order[i] = page_arr[max_idx];
        cur = cyl_arr[max_idx];
        printf(" -> %d(cyl %d)", page_order[i], cur);
    }
    printf("\n");

    // ── STEP 2: MFU Page Replacement on page_order[] ──
    int frame_arr[frames], freq[frames], time_in[frames];
    for (int i = 0; i < frames; i++) {
        frame_arr[i] = -1;
        freq[i] = 0;
        time_in[i] = 0;
    }

    int faults = 0;
    printf("\nMFU Page Replacement:\n");

    for (int i = 0; i < n; i++) {
        bool found = false;
        for (int j = 0; j < frames; j++) {
            if (frame_arr[j] == page_order[i]) {
                found = true;
                freq[j]++;
                break;
            }
        }

        if (!found) {
            int replace_idx = -1;
            for (int j = 0; j < frames; j++) {
                if (frame_arr[j] == -1) { replace_idx = j; break; }
            }
            if (replace_idx == -1) {
                replace_idx = 0;
                for (int j = 1; j < frames; j++) {
                    if (freq[j] > freq[replace_idx] ||
                        (freq[j] == freq[replace_idx] && time_in[j] < time_in[replace_idx]))
                        replace_idx = j;
                }
            }
            frame_arr[replace_idx] = page_order[i];
            freq[replace_idx] = 1;
            time_in[replace_idx] = i;
            faults++;
            printf("Page %d  FAULT  Frames: ", page_order[i]);
        } else {
            printf("Page %d  HIT    Frames: ", page_order[i]);
        }

        for (int j = 0; j < frames; j++)
            if (frame_arr[j] != -1) printf("%d ", frame_arr[j]);
        printf("\n");
    }

    printf("\nTotal page faults: %d\n", faults);
    return 0;
}
```

### Adapting for LCFS + LFU

To convert the above skeleton:

1. **Disk scheduling:** Replace the LSTF loop with LCFS -- simply reverse the input array:
   ```c
   // LCFS: reverse the input order
   for (int i = 0; i < n; i++)
       page_order[i] = page_arr[n - 1 - i];
   ```

2. **Page replacement:** Change `>` to `<` in the MFU comparison to get LFU:
   ```c
   if (freq[j] < freq[replace_idx] || ...)
   ```

---

## 8. Exam Cheat Sheet

### Compilation
```bash
gcc program.c -o program
./program
```

### Common Mistakes to Avoid

1. **Forgetting to reset frequency** when a new page replaces an old one (`freq[idx] = 1`, not `freq[idx] = 0`)
2. **Not updating `recent[]` on HIT** in LRU -- a hit updates the last-access time
3. **Optimal: stopping at first future occurrence** -- you want `break` after finding the first match when scanning forward
4. **FIFO: using the wrong pointer update** -- `ptr = (ptr + 1) % frames` not `ptr++`
5. **LFU/MFU tiebreaker** -- FIFO among ties means **oldest arrival** (smallest `time_in`), not oldest page number
6. **Not handling empty frames** before searching for a victim -- always check for `frame[j] == -1` first

### Page Fault Count Quick Reference (this example)

```
FIFO = 15    (worst practical)
OPT  =  9    (theoretical best)
LRU  = 12    (good practical)
LFU  = 13    (moderate)
MFU  = 15    (poor for this example)
```
