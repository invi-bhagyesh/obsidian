# Disk Scheduling Algorithms (Lab 11) -- Complete Exam Guide

> CSS-2211 | MIT Manipal | End-Semester Lab Exam Prep

---

## Table of Contents

1. [Concept](##1-concept)
2. [Standard Problem Setup](##2-standard-problem-setup)
3. [FCFS (First Come First Served)](##3-fcfs---first-come-first-served)
4. [SSTF (Shortest Seek Time First)](##4-sstf---shortest-seek-time-first)
5. [SCAN (Elevator Algorithm)](##5-scan---elevator-algorithm)
6. [C-SCAN (Circular SCAN)](##6-c-scan---circular-scan)
7. [LOOK](##7-look)
8. [C-LOOK (Circular LOOK)](##8-c-look---circular-look)
9. [LSTF (Largest Seek Time First) -- FROM PYQ](##9-lstf---largest-seek-time-first----from-pyq)
10. [LCFS (Last Come First Served) -- FROM PYQ](##10-lcfs---last-come-first-served----from-pyq)
11. [THM Comparison Table](##11-thm-comparison-table)
12. [Complete C Program: FCFS + SSTF](##12-complete-c-program-fcfs--sstf)
13. [Complete C Program: SCAN + C-SCAN + LOOK + C-LOOK](##13-complete-c-program-scan--c-scan--look--c-look)
14. [PYQ Combo: LSTF + MFU (Disk Scheduling + Page Replacement)](##14-pyq-combo-lstf--mfu)

---

## 1. Concept

A disk has concentric **tracks** (also called **cylinders**). The R/W head moves between tracks to service I/O requests.

- **Seek time** = time to move the head from one track to another. This is the expensive part.
- **Goal:** minimize **Total Head Movement (THM)** -- the sum of all distances the head travels.

THM is measured in **tracks** (number of cylinders traversed).

---

## 2. Standard Problem Setup

**Used for ALL worked examples below:**

```
Disk size:            200 cylinders (0-199)
Current head position: 53
Previous request at:   125 (head was moving LEFT, i.e., toward 0)
Request queue:         98, 183, 37, 122, 14, 124, 65, 67
Number of requests:    8
```

---

## 3. FCFS -- First Come First Served

### Theory
Serve requests in the **exact order they arrive** in the queue. No reordering.
- Simple to implement
- Can cause large unnecessary head movements (zig-zagging)
- No starvation

### Worked Example

```
Queue order: 98, 183, 37, 122, 14, 124, 65, 67

Movement: 53 -> 98 -> 183 -> 37 -> 122 -> 14 -> 124 -> 65 -> 67

THM = |98-53| + |183-98| + |37-183| + |122-37| + |14-122| + |124-14| + |65-124| + |67-65|
    =   45    +    85    +   146    +    85    +   108    +   110    +    59    +    2
    = 640 tracks
```

### C Code -- FCFS

```c
#include <stdio.h>
#include <stdlib.h>

int main() {
    int n, head;
    printf("Enter number of requests and initial head position: ");
    scanf("%d %d", &n, &head);

    int req[n];
    printf("Enter requests: ");
    for (int i = 0; i < n; i++) scanf("%d", &req[i]);

    // FCFS: serve in arrival order
    int thm = 0, cur = head;
    printf("\nFCFS Order: %d", cur);
    for (int i = 0; i < n; i++) {
        thm += abs(req[i] - cur);   // add distance to next request
        cur = req[i];                // move head
        printf(" -> %d", cur);
    }
    printf("\nFCFS THM = %d\n", thm);

    return 0;
}
```

---

## 4. SSTF -- Shortest Seek Time First

### Theory
Always go to the **closest unvisited request** next.
- Greedy algorithm (local optimum at each step)
- Much better THM than FCFS
- **Can cause starvation** -- requests far from the head may wait indefinitely

### Algorithm
1. From current head position, find the unvisited request with **minimum distance**
2. Service it, mark as visited, update head position
3. Repeat until all requests are serviced

### Worked Example

```
Head at 53. Pick closest each time:

Step 1: Distances: 98(45), 183(130), 37(16), 122(69), 14(39), 124(71), 65(12), 67(14)
        Closest = 65 (distance 12)
        Move: 53 -> 65

Step 2: Head at 65. Distances: 98(33), 183(118), 37(28), 122(57), 14(51), 124(59), 67(2)
        Closest = 67 (distance 2)
        Move: 65 -> 67

Step 3: Head at 67. Distances: 98(31), 183(116), 37(30), 122(55), 14(53), 124(57)
        Closest = 37 (distance 30)
        Move: 67 -> 37

Step 4: Head at 37. Distances: 98(61), 183(146), 122(85), 14(23), 124(87)
        Closest = 14 (distance 23)
        Move: 37 -> 14

Step 5: Head at 14. Distances: 98(84), 183(169), 122(108), 124(110)
        Closest = 98 (distance 84)
        Move: 14 -> 98

Step 6: Head at 98. Distances: 183(85), 122(24), 124(26)
        Closest = 122 (distance 24)
        Move: 98 -> 122

Step 7: Head at 122. Distances: 183(61), 124(2)
        Closest = 124 (distance 2)
        Move: 122 -> 124

Step 8: Head at 124. Distances: 183(59)
        Only one left = 183 (distance 59)
        Move: 124 -> 183

Order: 53 -> 65 -> 67 -> 37 -> 14 -> 98 -> 122 -> 124 -> 183
THM = 12 + 2 + 30 + 23 + 84 + 24 + 2 + 59 = 236 tracks
```

### C Code -- SSTF

```c
#include <stdio.h>
#include <stdlib.h>

int main() {
    int n, head;
    printf("Enter number of requests and initial head position: ");
    scanf("%d %d", &n, &head);

    int req[n], visited[n];
    printf("Enter requests: ");
    for (int i = 0; i < n; i++) {
        scanf("%d", &req[i]);
        visited[i] = 0;            // none visited yet
    }

    int thm = 0, cur = head;
    printf("\nSSTF Order: %d", cur);

    for (int i = 0; i < n; i++) {
        int min_dist = 999999, min_idx = -1;
        // Find closest unvisited request
        for (int j = 0; j < n; j++) {
            if (!visited[j] && abs(req[j] - cur) < min_dist) {
                min_dist = abs(req[j] - cur);
                min_idx = j;
            }
        }
        visited[min_idx] = 1;       // mark as visited
        thm += min_dist;
        cur = req[min_idx];
        printf(" -> %d", cur);
    }
    printf("\nSSTF THM = %d\n", thm);

    return 0;
}
```

---

## 5. SCAN -- Elevator Algorithm

### Theory
The head moves in **one direction**, servicing all requests along the way. When it reaches the **end of the disk (cylinder 0 or max)**, it **reverses** direction.
- Like an elevator going all the way down, then all the way up
- Fair -- no starvation
- Must go all the way to the disk boundary before reversing

### Key Detail
Direction is determined by the **previous request**. Since previous was 125 and current is 53, the head is moving **left** (toward 0).

### Algorithm
1. Sort all requests
2. Find the split point (where head position fits in sorted order)
3. Go LEFT from head, servicing requests in decreasing order
4. Hit cylinder 0 (disk boundary)
5. Reverse, go RIGHT, servicing requests in increasing order

### Worked Example

```
Sorted requests: 14, 37, 65, 67, 98, 122, 124, 183
Head at 53, moving LEFT.

Go left:  53 -> 37 -> 14 -> 0 (reach disk boundary)
Reverse, go right: 0 -> 65 -> 67 -> 98 -> 122 -> 124 -> 183

THM = |53-37| + |37-14| + |14-0| + |0-65| + |65-67| + |67-98| + |98-122| + |122-124| + |124-183|
    =   16   +   23    +   14   +   65   +    2    +   31    +    24    +     2     +    59
    = 236 tracks
```

### C Code -- SCAN

```c
#include <stdio.h>
#include <stdlib.h>

// Comparison function for qsort
int cmp(const void *a, const void *b) {
    return (*(int *)a - *(int *)b);
}

int main() {
    int n, head, max_cyl;
    printf("Enter number of requests, initial head position, max cylinders: ");
    scanf("%d %d %d", &n, &head, &max_cyl);

    int req[n];
    printf("Enter requests: ");
    for (int i = 0; i < n; i++) scanf("%d", &req[i]);

    // Sort the requests
    int sorted[n];
    for (int i = 0; i < n; i++) sorted[i] = req[i];
    qsort(sorted, n, sizeof(int), cmp);

    // Find split point: sorted[0..pos-1] are left of head, sorted[pos..n-1] are right
    int pos = 0;
    while (pos < n && sorted[pos] < head) pos++;
    // sorted[0..pos-1] are LEFT of head
    // sorted[pos..n-1] are RIGHT of head

    int thm = 0, cur = head;
    printf("\nSCAN Order: %d", cur);

    // Go LEFT first (toward 0)
    for (int i = pos - 1; i >= 0; i--) {
        thm += abs(cur - sorted[i]);
        cur = sorted[i];
        printf(" -> %d", cur);
    }
    // Hit cylinder 0
    thm += abs(cur - 0);
    cur = 0;
    printf(" -> %d", cur);

    // Go RIGHT (toward max)
    for (int i = pos; i < n; i++) {
        thm += abs(cur - sorted[i]);
        cur = sorted[i];
        printf(" -> %d", cur);
    }

    printf("\nSCAN THM = %d\n", thm);
    return 0;
}
```

---

## 6. C-SCAN -- Circular SCAN

### Theory
Like SCAN, but instead of reversing at the end, the head **jumps back to the other end** without servicing any requests during the jump. Then continues in the **same direction**.
- **Jump distance is NOT counted** in THM
- Provides more **uniform wait times** than SCAN
- Think of the disk as circular -- after reaching one end, wrap around to the other

### Key Detail
C-SCAN goes in ONE direction only. For this example, with head moving left (previous was 125), the "natural" C-SCAN direction is actually RIGHT (since C-SCAN is typically described as going right, hitting the end, jumping to 0, and continuing right). The lab guide uses **right-moving C-SCAN**.

### Algorithm
1. Sort all requests
2. Go RIGHT from head, servicing requests in increasing order
3. Reach end of disk (cylinder 199)
4. Jump to cylinder 0 -- **distance NOT counted**
5. Continue RIGHT, servicing remaining requests

### Worked Example

```
Sorted requests: 14, 37, 65, 67, 98, 122, 124, 183
Head at 53, moving RIGHT for C-SCAN.

Go right from 53: 53 -> 65 -> 67 -> 98 -> 122 -> 124 -> 183 -> 199 (reach end)
Jump to 0: (distance NOT counted)
Go right from 0:  0 -> 14 -> 37

THM = |53-65| + |65-67| + |67-98| + |98-122| + |122-124| + |124-183| + |183-199|
    + |0-14| + |14-37|
    (NOTE: 199->0 jump is NOT counted)
    = 12 + 2 + 31 + 24 + 2 + 59 + 16 + 14 + 23
    = 183 tracks
```

### C Code -- C-SCAN

```c
#include <stdio.h>
#include <stdlib.h>

int cmp(const void *a, const void *b) {
    return (*(int *)a - *(int *)b);
}

int main() {
    int n, head, max_cyl;
    printf("Enter number of requests, initial head position, max cylinders: ");
    scanf("%d %d %d", &n, &head, &max_cyl);

    int req[n];
    printf("Enter requests: ");
    for (int i = 0; i < n; i++) scanf("%d", &req[i]);

    int sorted[n];
    for (int i = 0; i < n; i++) sorted[i] = req[i];
    qsort(sorted, n, sizeof(int), cmp);

    int pos = 0;
    while (pos < n && sorted[pos] < head) pos++;

    int thm = 0, cur = head;
    printf("\nC-SCAN Order: %d", cur);

    // Go RIGHT from head
    for (int i = pos; i < n; i++) {
        thm += abs(cur - sorted[i]);
        cur = sorted[i];
        printf(" -> %d", cur);
    }
    // Go to end
    thm += abs(cur - (max_cyl - 1));
    cur = max_cyl - 1;
    printf(" -> %d", cur);

    // Jump to 0 (distance NOT counted)
    cur = 0;
    printf(" -> %d", cur);

    // Go RIGHT servicing remaining (those left of original head)
    for (int i = 0; i < pos; i++) {
        thm += abs(cur - sorted[i]);
        cur = sorted[i];
        printf(" -> %d", cur);
    }

    printf("\nC-SCAN THM = %d\n", thm);
    return 0;
}
```

---

## 7. LOOK

### Theory
Like SCAN, but the head only goes as far as the **last request** in each direction -- it does NOT go all the way to the disk boundary.
- "Looks" ahead and reverses if no more requests in that direction
- More efficient than SCAN (avoids unnecessary travel to disk edge)

### Algorithm
1. Sort all requests
2. Go LEFT from head, servicing requests in decreasing order
3. Stop at the last (smallest) request -- do NOT go to cylinder 0
4. Reverse, go RIGHT, servicing requests in increasing order

### Worked Example

```
Sorted requests: 14, 37, 65, 67, 98, 122, 124, 183
Head at 53, moving LEFT.

Go left:  53 -> 37 -> 14 (STOP -- no more requests to the left)
Reverse, go right: 14 -> 65 -> 67 -> 98 -> 122 -> 124 -> 183

THM = |53-37| + |37-14| + |14-65| + |65-67| + |67-98| + |98-122| + |122-124| + |124-183|
    =   16   +   23    +   51   +    2    +   31    +    24    +     2     +    59
    = 208 tracks
```

**Compare with SCAN (236):** LOOK saves the trip from 14 down to 0 and back to 14 (saves 28 tracks).

### C Code -- LOOK

```c
#include <stdio.h>
#include <stdlib.h>

int cmp(const void *a, const void *b) {
    return (*(int *)a - *(int *)b);
}

int main() {
    int n, head;
    printf("Enter number of requests and initial head position: ");
    scanf("%d %d", &n, &head);

    int req[n];
    printf("Enter requests: ");
    for (int i = 0; i < n; i++) scanf("%d", &req[i]);

    int sorted[n];
    for (int i = 0; i < n; i++) sorted[i] = req[i];
    qsort(sorted, n, sizeof(int), cmp);

    int pos = 0;
    while (pos < n && sorted[pos] < head) pos++;

    int thm = 0, cur = head;
    printf("\nLOOK Order: %d", cur);

    // Go LEFT (only to last request, NOT to 0)
    for (int i = pos - 1; i >= 0; i--) {
        thm += abs(cur - sorted[i]);
        cur = sorted[i];
        printf(" -> %d", cur);
    }
    // No trip to cylinder 0! Just reverse here.

    // Reverse RIGHT
    for (int i = pos; i < n; i++) {
        thm += abs(cur - sorted[i]);
        cur = sorted[i];
        printf(" -> %d", cur);
    }

    printf("\nLOOK THM = %d\n", thm);
    return 0;
}
```

---

## 8. C-LOOK -- Circular LOOK

### Theory
Like C-SCAN, but the head only goes as far as the **last request** in each direction (no trip to disk boundary). On reversal, jump to the other extreme request (not disk edge). Jump distance is NOT counted.
- Best practical choice for most scenarios
- Combines benefits of C-SCAN (uniform wait) and LOOK (no wasted travel)

### Algorithm
1. Sort all requests
2. Go RIGHT from head, servicing requests in increasing order
3. Stop at the last (largest) request -- do NOT go to cylinder 199
4. Jump to the smallest request -- **distance NOT counted**
5. Continue RIGHT, servicing remaining requests

### Worked Example

```
Sorted requests: 14, 37, 65, 67, 98, 122, 124, 183
Head at 53, moving RIGHT for C-LOOK.

Go right from 53: 53 -> 65 -> 67 -> 98 -> 122 -> 124 -> 183 (STOP -- last request)
Jump to 14: (distance NOT counted)
Go right from 14: 14 -> 37

THM = |53-65| + |65-67| + |67-98| + |98-122| + |122-124| + |124-183|
    + |14-37|
    (NOTE: 183->14 jump is NOT counted)
    = 12 + 2 + 31 + 24 + 2 + 59 + 23
    = 153 tracks
```

### C Code -- C-LOOK

```c
#include <stdio.h>
#include <stdlib.h>

int cmp(const void *a, const void *b) {
    return (*(int *)a - *(int *)b);
}


int main() {
    int n, head;
    printf("Enter number of requests and initial head position: ");
    scanf("%d %d", &n, &head);

    int req[n];
    printf("Enter requests: ");
    for (int i = 0; i < n; i++) scanf("%d", &req[i]);

    int sorted[n];
    for (int i = 0; i < n; i++) sorted[i] = req[i];
    qsort(sorted, n, sizeof(int), cmp);

    int pos = 0;
    while (pos < n && sorted[pos] < head) pos++;

    int thm = 0, cur = head;
    printf("\nC-LOOK Order: %d", cur);

    // Go RIGHT
    for (int i = pos; i < n; i++) {
        thm += abs(cur - sorted[i]);
        cur = sorted[i];
        printf(" -> %d", cur);
    }
    // Jump to smallest request (distance NOT counted)
    cur = sorted[0];
    printf(" -> %d", cur);

    // Continue RIGHT servicing remaining
    for (int i = 1; i < pos; i++) {
        thm += abs(cur - sorted[i]);
        cur = sorted[i];
        printf(" -> %d", cur);
    }

    printf("\nC-LOOK THM = %d\n", thm);
    return 0;
}
```

---

## 9. LSTF -- Largest Seek Time First -- FROM PYQ

### Theory
Serve the request with the **largest seek time** (farthest from current head) first.
This is the **exact opposite of SSTF** -- instead of picking the closest, pick the farthest.
- **Not practical** in real systems (maximizes head movement!)
- Appears in PYQs combined with page replacement algorithms

### Algorithm
1. From current head position, find the unvisited request with **maximum distance**
2. Service it, mark as visited, update head position
3. Repeat until all requests are serviced

### Worked Example

```
Head at 53. Pick FARTHEST each time:

Step 1: Distances: 98(45), 183(130), 37(16), 122(69), 14(39), 124(71), 65(12), 67(14)
        Farthest = 183 (distance 130)
        Move: 53 -> 183

Step 2: Head at 183. Distances: 98(85), 37(146), 122(61), 14(169), 124(59), 65(118), 67(116)
        Farthest = 14 (distance 169)
        Move: 183 -> 14

Step 3: Head at 14. Distances: 98(84), 37(23), 122(108), 124(110), 65(51), 67(53)
        Farthest = 124 (distance 110)
        Move: 14 -> 124

Step 4: Head at 124. Distances: 98(26), 37(87), 122(2), 65(59), 67(57)
        Farthest = 37 (distance 87)
        Move: 124 -> 37

Step 5: Head at 37. Distances: 98(61), 122(85), 65(28), 67(30)
        Farthest = 122 (distance 85)
        Move: 37 -> 122

Step 6: Head at 122. Distances: 98(24), 65(57), 67(55)
        Farthest = 65 (distance 57)
        Move: 122 -> 65

Step 7: Head at 65. Distances: 98(33), 67(2)
        Farthest = 98 (distance 33)
        Move: 65 -> 98

Step 8: Head at 98. Distances: 67(31)
        Only one left = 67 (distance 31)
        Move: 98 -> 67

Order: 53 -> 183 -> 14 -> 124 -> 37 -> 122 -> 65 -> 98 -> 67
THM = 130 + 169 + 110 + 87 + 85 + 57 + 33 + 31 = 702 tracks
```

### C Code -- LSTF

```c
#include <stdio.h>
#include <stdlib.h>

int main() {
    int n, head;
    printf("Enter number of requests and initial head position: ");
    scanf("%d %d", &n, &head);

    int req[n], visited[n];
    printf("Enter requests: ");
    for (int i = 0; i < n; i++) {
        scanf("%d", &req[i]);
        visited[i] = 0;
    }

    int thm = 0, cur = head;
    printf("\nLSTF Order: %d", cur);

    for (int i = 0; i < n; i++) {
        int max_dist = -1, max_idx = -1;
        // Find FARTHEST unvisited request
        for (int j = 0; j < n; j++) {
            if (!visited[j] && abs(req[j] - cur) > max_dist) {
                max_dist = abs(req[j] - cur);
                max_idx = j;
            }
        }
        visited[max_idx] = 1;
        thm += max_dist;
        cur = req[max_idx];
        printf(" -> %d", cur);
    }
    printf("\nLSTF THM = %d\n", thm);

    return 0;
}
```

---

## 10. LCFS -- Last Come First Served -- FROM PYQ

### Theory
Serve requests in **reverse order of arrival** (the last request that arrived gets served first).
- Like a **stack** (LIFO -- Last In, First Out)
- The most recent request is served first, the oldest request is served last
- **Can cause starvation** of older requests

### Algorithm
1. Process the request queue from the LAST element to the FIRST element

### Worked Example

```
Queue (arrival order): 98, 183, 37, 122, 14, 124, 65, 67

LCFS reverses this: 67, 65, 124, 14, 122, 37, 183, 98

Movement: 53 -> 67 -> 65 -> 124 -> 14 -> 122 -> 37 -> 183 -> 98

THM = |67-53| + |65-67| + |124-65| + |14-124| + |122-14| + |37-122| + |183-37| + |98-183|
    =   14   +    2    +    59    +   110    +   108    +    85    +   146    +    85
    = 609 tracks
```

### C Code -- LCFS

```c
#include <stdio.h>
#include <stdlib.h>

int main() {
    int n, head;
    printf("Enter number of requests and initial head position: ");
    scanf("%d %d", &n, &head);

    int req[n];
    printf("Enter requests: ");
    for (int i = 0; i < n; i++) scanf("%d", &req[i]);

    // LCFS: serve in REVERSE arrival order
    int thm = 0, cur = head;
    printf("\nLCFS Order: %d", cur);
    for (int i = n - 1; i >= 0; i--) {
        thm += abs(req[i] - cur);
        cur = req[i];
        printf(" -> %d", cur);
    }
    printf("\nLCFS THM = %d\n", thm);

    return 0;
}
```

---

## 11. THM Comparison Table

| Algorithm | Order Visited | THM (tracks) | Notes |
|-----------|--------------|-------------|-------|
| **FCFS** | 98,183,37,122,14,124,65,67 | **640** | Simple, high THM, no starvation |
| **SSTF** | 65,67,37,14,98,122,124,183 | **236** | Good THM, starvation possible |
| **SCAN** | 37,14,0,65,67,98,122,124,183 | **236** | Fair, goes to disk boundary |
| **C-SCAN** | 65,67,98,122,124,183,199,0,14,37 | **183** | Uniform wait, wraps around |
| **LOOK** | 37,14,65,67,98,122,124,183 | **208** | No wasted travel to boundary |
| **C-LOOK** | 65,67,98,122,124,183,14,37 | **153** | Best practical choice |
| **LSTF** | 183,14,124,37,122,65,98,67 | **702** | Opposite of SSTF, worst THM |
| **LCFS** | 67,65,124,14,122,37,183,98 | **609** | Stack-based, starvation possible |

**Ranking (best to worst THM):** C-LOOK (153) < C-SCAN (183) < LOOK (208) < SSTF = SCAN (236) < LCFS (609) < FCFS (640) < LSTF (702)

---

## 12. Complete C Program: FCFS + SSTF

This is the combined program from the lab guide. Both algorithms in one file.

```c
#include <stdio.h>
#include <stdlib.h>

int main() {
    int n, head;
    printf("Enter number of requests and initial head position: ");
    scanf("%d %d", &n, &head);

    int req[n];
    printf("Enter requests: ");
    for (int i = 0; i < n; i++) scanf("%d", &req[i]);

    // ============ FCFS ============
    int thm = 0;
    int cur = head;
    printf("\nFCFS Order: %d", cur);
    for (int i = 0; i < n; i++) {
        thm += abs(req[i] - cur);
        cur = req[i];
        printf(" -> %d", cur);
    }
    printf("\nFCFS THM = %d\n", thm);

    // ============ SSTF ============
    thm = 0;
    cur = head;
    int visited[n];
    for (int i = 0; i < n; i++) visited[i] = 0;

    printf("\nSSTF Order: %d", cur);
    for (int i = 0; i < n; i++) {
        int min_dist = 999999, min_idx = -1;
        for (int j = 0; j < n; j++) {
            if (!visited[j] && abs(req[j] - cur) < min_dist) {
                min_dist = abs(req[j] - cur);
                min_idx = j;
            }
        }
        visited[min_idx] = 1;
        thm += min_dist;
        cur = req[min_idx];
        printf(" -> %d", cur);
    }
    printf("\nSSTF THM = %d\n", thm);

    return 0;
}
```

**Compile & run:**
```
gcc fcfs_sstf.c -o fcfs_sstf
./fcfs_sstf
```

**Sample input:**
```
8 53
98 183 37 122 14 124 65 67
```

**Expected output:**
```
FCFS Order: 53 -> 98 -> 183 -> 37 -> 122 -> 14 -> 124 -> 65 -> 67
FCFS THM = 640

SSTF Order: 53 -> 65 -> 67 -> 37 -> 14 -> 98 -> 122 -> 124 -> 183
SSTF THM = 236
```

---

## 13. Complete C Program: SCAN + C-SCAN + LOOK + C-LOOK

All four direction-based algorithms in one file. Uses `qsort` and a split point.

```c
#include <stdio.h>
#include <stdlib.h>

// Comparison function for qsort
int cmp(const void *a, const void *b) {
    return (*(int *)a - *(int *)b);
}

int main() {
    int n, head, max_cyl;
    printf("Enter number of requests, initial head position, max cylinders: ");
    scanf("%d %d %d", &n, &head, &max_cyl);

    int req[n];
    printf("Enter requests: ");
    for (int i = 0; i < n; i++) scanf("%d", &req[i]);

    // Sort the requests
    int sorted[n];
    for (int i = 0; i < n; i++) sorted[i] = req[i];
    qsort(sorted, n, sizeof(int), cmp);

    // Find position where head fits in sorted order
    int pos = 0;
    while (pos < n && sorted[pos] < head) pos++;
    // sorted[0..pos-1] are left of head, sorted[pos..n-1] are right

    int thm, cur;

    // ============ SCAN (moving left first) ============
    thm = 0; cur = head;
    printf("\nSCAN Order: %d", cur);
    // Go left
    for (int i = pos - 1; i >= 0; i--) {
        thm += abs(cur - sorted[i]);
        cur = sorted[i];
        printf(" -> %d", cur);
    }
    // Hit cylinder 0
    thm += abs(cur - 0);
    cur = 0;
    printf(" -> %d", cur);
    // Go right
    for (int i = pos; i < n; i++) {
        thm += abs(cur - sorted[i]);
        cur = sorted[i];
        printf(" -> %d", cur);
    }
    printf("\nSCAN THM = %d\n", thm);

    // ============ C-SCAN (moving right) ============
    thm = 0; cur = head;
    printf("\nC-SCAN Order: %d", cur);
    // Go right
    for (int i = pos; i < n; i++) {
        thm += abs(cur - sorted[i]);
        cur = sorted[i];
        printf(" -> %d", cur);
    }
    // Go to end
    thm += abs(cur - (max_cyl - 1));
    cur = max_cyl - 1;
    printf(" -> %d", cur);
    // Jump to 0 (distance NOT counted)
    cur = 0;
    printf(" -> %d", cur);
    // Go right servicing remaining
    for (int i = 0; i < pos; i++) {
        thm += abs(cur - sorted[i]);
        cur = sorted[i];
        printf(" -> %d", cur);
    }
    printf("\nC-SCAN THM = %d\n", thm);

    // ============ LOOK (moving left first) ============
    thm = 0; cur = head;
    printf("\nLOOK Order: %d", cur);
    // Go left (only to last request, not to 0)
    for (int i = pos - 1; i >= 0; i--) {
        thm += abs(cur - sorted[i]);
        cur = sorted[i];
        printf(" -> %d", cur);
    }
    // Reverse right
    for (int i = pos; i < n; i++) {
        thm += abs(cur - sorted[i]);
        cur = sorted[i];
        printf(" -> %d", cur);
    }
    printf("\nLOOK THM = %d\n", thm);

    // ============ C-LOOK (moving right) ============
    thm = 0; cur = head;
    printf("\nC-LOOK Order: %d", cur);
    // Go right
    for (int i = pos; i < n; i++) {
        thm += abs(cur - sorted[i]);
        cur = sorted[i];
        printf(" -> %d", cur);
    }
    // Jump to smallest request (distance NOT counted)
    cur = sorted[0];
    printf(" -> %d", cur);
    // Continue right
    for (int i = 1; i < pos; i++) {
        thm += abs(cur - sorted[i]);
        cur = sorted[i];
        printf(" -> %d", cur);
    }
    printf("\nC-LOOK THM = %d\n", thm);

    return 0;
}
```

**Compile & run:**
```
gcc scan_all.c -o scan_all
./scan_all
```

**Sample input:**
```
8 53 200
98 183 37 122 14 124 65 67
```

**Expected output:**
```
SCAN Order: 53 -> 37 -> 14 -> 0 -> 65 -> 67 -> 98 -> 122 -> 124 -> 183
SCAN THM = 236

C-SCAN Order: 53 -> 65 -> 67 -> 98 -> 122 -> 124 -> 183 -> 199 -> 0 -> 14 -> 37
C-SCAN THM = 183

LOOK Order: 53 -> 37 -> 14 -> 65 -> 67 -> 98 -> 122 -> 124 -> 183
LOOK THM = 208

C-LOOK Order: 53 -> 65 -> 67 -> 98 -> 122 -> 124 -> 183 -> 14 -> 37
C-LOOK THM = 153
```

---

## 14. PYQ Combo: LSTF + MFU

> **PYQ Q1:** Implement LSTF disk scheduling with MFU page replacement.
> Input: number of frames, initial head position, pairs of (page_no, cylinder_position) until -1.
> First run LSTF on cylinder positions to get service order, then extract page numbers in that order and feed to MFU.

### How It Works

1. **Read input pairs** `(page_no, cylinder_position)` until user enters -1
2. **Run LSTF** on the cylinder positions to determine the service order
3. **Extract page numbers** corresponding to that LSTF-determined order
4. **Run MFU** (Most Frequently Used) page replacement on those page numbers

### MFU Quick Refresher
- **MFU replaces the page with the HIGHEST reference count** (most frequently used)
- Logic: a page with many references has probably been used enough; a page with few references was just loaded and might be needed soon
- On a tie, replace the one that was loaded earliest (or use any consistent tie-breaker)

### Worked Example

```
Input:
  Frames: 3
  Head position: 53
  Pairs: (5, 98) (3, 183) (2, 37) (7, 122) (5, 14) (3, 124) (2, 65) (1, 67) -1

Step 1: Extract cylinder positions -> 98, 183, 37, 122, 14, 124, 65, 67
        (same as our standard problem!)

Step 2: Run LSTF on cylinders (head=53):
        LSTF order: 183, 14, 124, 37, 122, 65, 98, 67
        (indices in original array: 1, 4, 5, 2, 3, 6, 0, 7)

Step 3: Extract page numbers in LSTF order:
        Page reference string: 3, 5, 3, 2, 7, 2, 5, 1

Step 4: Run MFU on page string with 3 frames:

  Ref: 3    Frames: [3, -, -]     FAULT (empty frame)         count: 3=1
  Ref: 5    Frames: [3, 5, -]     FAULT (empty frame)         count: 3=1, 5=1
  Ref: 3    Frames: [3, 5, -]     HIT (3 already in frame)    count: 3=2, 5=1
  Ref: 2    Frames: [3, 5, 2]     FAULT (empty frame)         count: 3=2, 5=1, 2=1
  Ref: 7    Frames: [7, 5, 2]     FAULT (MFU=3 count 2, replace 3)  count: 7=1, 5=1, 2=1
  Ref: 2    Frames: [7, 5, 2]     HIT (2 already in frame)    count: 7=1, 5=1, 2=2
  Ref: 5    Frames: [7, 5, 2]     HIT (5 already in frame)    count: 7=1, 5=2, 2=2
  Ref: 1    Frames: [7, 1, 2]     FAULT (MFU=5 or 2, count 2, pick 5) count: 7=1, 1=1, 2=2

  Total page faults: 5
```

### Complete C Implementation: LSTF + MFU Combined

```c
#include <stdio.h>
#include <stdlib.h>

int main() {
    int frames, head;
    printf("Enter number of frames: ");
    scanf("%d", &frames);
    printf("Enter initial head position: ");
    scanf("%d", &head);

    // Read pairs until -1
    int page[100], cyl[100];    // max 100 pairs
    int n = 0;
    printf("Enter (page_no cylinder_position) pairs, -1 to stop:\n");
    while (1) {
        int p;
        scanf("%d", &p);
        if (p == -1) break;
        page[n] = p;
        scanf("%d", &cyl[n]);
        n++;
    }

    printf("\n--- Input ---\n");
    printf("Frames: %d, Head: %d, Requests: %d\n", frames, head, n);
    for (int i = 0; i < n; i++)
        printf("  Page %d at Cylinder %d\n", page[i], cyl[i]);

    // ============================================================
    // PART 1: LSTF (Largest Seek Time First) on cylinder positions
    // ============================================================
    int visited[n];
    int lstf_order[n];  // stores INDICES in original order
    for (int i = 0; i < n; i++) visited[i] = 0;

    int cur = head, thm = 0;
    printf("\n--- LSTF Disk Scheduling ---\n");
    printf("LSTF Order: %d", cur);

    for (int i = 0; i < n; i++) {
        int max_dist = -1, max_idx = -1;
        for (int j = 0; j < n; j++) {
            if (!visited[j] && abs(cyl[j] - cur) > max_dist) {
                max_dist = abs(cyl[j] - cur);
                max_idx = j;
            }
        }
        visited[max_idx] = 1;
        lstf_order[i] = max_idx;
        thm += max_dist;
        cur = cyl[max_idx];
        printf(" -> %d", cur);
    }
    printf("\nLSTF THM = %d\n", thm);

    // Extract page reference string in LSTF order
    int ref[n];
    printf("\nPage reference string (LSTF order): ");
    for (int i = 0; i < n; i++) {
        ref[i] = page[lstf_order[i]];
        printf("%d ", ref[i]);
    }
    printf("\n");

    // ============================================================
    // PART 2: MFU (Most Frequently Used) Page Replacement
    // ============================================================
    int frame[frames], freq[frames];
    for (int i = 0; i < frames; i++) {
        frame[i] = -1;
        freq[i] = 0;
    }

    int faults = 0;
    printf("\n--- MFU Page Replacement ---\n");

    for (int i = 0; i < n; i++) {
        // Check if page already in a frame
        int found = 0, found_idx = -1;
        for (int j = 0; j < frames; j++) {
            if (frame[j] == ref[i]) {
                found = 1;
                found_idx = j;
                break;
            }
        }

        if (found) {
            freq[found_idx]++;
            printf("Page %d\tHIT\t\tFrames: ", ref[i]);
        } else {
            // Page fault -- need to load page
            faults++;

            // Check for empty frame first
            int empty_idx = -1;
            for (int j = 0; j < frames; j++) {
                if (frame[j] == -1) {
                    empty_idx = j;
                    break;
                }
            }

            if (empty_idx != -1) {
                // Empty frame available
                frame[empty_idx] = ref[i];
                freq[empty_idx] = 1;
            } else {
                // No empty frame -- find MFU page (highest frequency)
                int mfu_idx = 0;
                for (int j = 1; j < frames; j++) {
                    if (freq[j] > freq[mfu_idx]) {
                        mfu_idx = j;
                    }
                }
                // Replace MFU page
                printf("(Replace page %d, freq=%d) ", frame[mfu_idx], freq[mfu_idx]);
                frame[mfu_idx] = ref[i];
                freq[mfu_idx] = 1;
            }
            printf("Page %d\tFAULT\t\tFrames: ", ref[i]);
        }

        // Print current frame state
        for (int j = 0; j < frames; j++) {
            if (frame[j] != -1)
                printf("%d(f=%d) ", frame[j], freq[j]);
            else
                printf("- ");
        }
        printf("\n");
    }

    printf("\nTotal page faults: %d\n", faults);
    printf("Hit ratio: %.2f%%\n", (float)(n - faults) / n * 100);

    return 0;
}
```

**Compile & run:**
```
gcc lstf_mfu.c -o lstf_mfu
./lstf_mfu
```

**Sample input:**
```
3
53
5 98
3 183
2 37
7 122
5 14
3 124
2 65
1 67
-1
```

---

## Quick Reference: Code Patterns to Memorize

### Pattern 1: Greedy Selection (SSTF / LSTF)
```c
// Works for both -- just change < to > for LSTF
int visited[n];  // init to 0
for (int i = 0; i < n; i++) {
    int best = (SSTF ? 999999 : -1), idx = -1;
    for (int j = 0; j < n; j++) {
        if (!visited[j]) {
            int d = abs(req[j] - cur);
            if (SSTF ? d < best : d > best) { best = d; idx = j; }
        }
    }
    visited[idx] = 1; thm += best; cur = req[idx];
}
```

### Pattern 2: Sort + Split Point (SCAN / C-SCAN / LOOK / C-LOOK)
```c
qsort(sorted, n, sizeof(int), cmp);
int pos = 0;
while (pos < n && sorted[pos] < head) pos++;
// LEFT of head:  sorted[0 .. pos-1]   (iterate pos-1 down to 0)
// RIGHT of head: sorted[pos .. n-1]   (iterate pos up to n-1)
```

### Pattern 3: Direction Cheat Sheet
| Algorithm | Goes to boundary? | Jump cost counted? |
|-----------|------------------|--------------------|
| SCAN      | YES (0 or max)   | N/A (reverses)     |
| C-SCAN    | YES (0 and max)  | NO                 |
| LOOK      | NO               | N/A (reverses)     |
| C-LOOK    | NO               | NO                 |

### Common Exam Mistakes
1. **Forgetting to go to 0 in SCAN** -- SCAN must hit the disk boundary
2. **Counting the jump in C-SCAN/C-LOOK** -- the jump distance is NOT added to THM
3. **Wrong direction** -- check what "previous request" implies about head direction
4. **C-SCAN going to 199 but not 0** -- C-SCAN must go to max_cyl-1 AND jump to 0
5. **LOOK going to 0** -- LOOK does NOT go to the boundary, that is SCAN
6. **SSTF ties** -- if two requests are equidistant, pick either (be consistent)
