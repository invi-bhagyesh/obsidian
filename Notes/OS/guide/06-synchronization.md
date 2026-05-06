# 06 — Process Synchronization

## 6.1 Background — Why We Need Synchronization

- Processes can execute **concurrently**.
- They may be **interrupted** at any time, **partially completing** execution.
- Concurrent access to shared data may cause **data inconsistency**.
- Maintaining data consistency requires mechanisms to ensure orderly execution of cooperating processes.

### Motivating example — Counter
```c
int counter = 5;          // shared

// Process P0
counter++;

// Process P1
counter--;
```
Expected counter remains 5, but actual value can be 4, 5, or 6. Why?

**`counter++` is not atomic** — it decomposes into:
```
R1 = counter; R1 = R1 + 1; counter = R1;
```
Similarly `counter--`:
```
R2 = counter; R2 = R2 - 1; counter = R2;
```

Interleavings cause:
- **counter = 5** (correct execution).
- **counter = 6** (lost decrement): both load 5; P0 increments to 6, writes; P1 had already written 4 — wait, the simpler bug:
  ```
  R1 = counter   // R1=5
  R2 = counter   // R2=5
  R2 = R2 - 1    // R2=4
  counter = R2   // counter=4
  R1 = R1 + 1    // R1=6
  counter = R1   // counter=6  (decrement lost!)
  ```
- **counter = 4** (lost increment): symmetric.

---

## 6.2 Race Conditions

**Race**: Several processes access and manipulate the same data (the **critical section**), and the result depends on the order of access.

Prevent races via **synchronization**: ensure only one process at a time manipulates the critical data.

---

## 6.3 The Critical Section Problem

Consider $n$ processes $\{P_0, P_1, \ldots, P_{n-1}\}$. Each has a **critical section** (CS) — code that modifies shared variables, tables, or files.

**Rule:** When one process is in its CS, no other may be in its CS.

### General process structure
```c
do {
    [entry section]        // request permission
        critical section
    [exit section]         // release
        remainder section
} while (true);
```

### Three required properties for a valid solution

1. **Mutual Exclusion** — If $P_i$ is in CS, no other process can be in its CS.
2. **Progress** — If no process is in CS and some processes wish to enter, then the selection of the next process to enter cannot be postponed indefinitely.
3. **Bounded Waiting** — A bound exists on the number of times other processes are allowed to enter their CS after a process has requested entry and before that request is granted.

Assume nonzero execution speed, no assumption on relative speed.

---

## 6.4 Dekker's Algorithm — Stepwise Development

(Two-process synchronization, gradually fixing flaws.)

**v1 — Strict alternation (`turn`):** mutual exclusion holds, but progress fails (one process can block the other from re-entering).

**v2 — Test-then-set flag:** ME may be violated if both processes pass the test before either sets its flag.

**v3 — Set-then-test flag:** Can deadlock if both set their flags simultaneously.

**v4 — Yield if other has flag set:** Can livelock (both keep yielding).

**Final Dekker's algorithm** combines `flag[]` with `turn`:
```c
// P0
flag[0] = true;
while (flag[1]) {
    if (turn == 1) {
        flag[0] = false;
        while (turn == 1) ;
        flag[0] = true;
    }
}
// critical section
turn = 1;
flag[0] = false;
// remainder

// P1 (symmetric with 0↔1)
```

---

## 6.5 Peterson's Solution (Two Processes)

Shared:
```c
int turn;
boolean flag[2];          // flag[i] = true means Pi is ready
```

### Algorithm
```c
do {
    flag[i] = true;
    turn = j;                              // j = 1-i (the other process)
    while (flag[j] && turn == j) ;        // busy wait
        critical section
    flag[i] = false;
        remainder section
} while (true);
```

### Side-by-side:
```c
// P0                                   // P1
flag[0] = true;                          flag[1] = true;
turn = 1;                                turn = 0;
while (flag[1] && turn == 1);            while (flag[0] && turn == 0);
   critical section                          critical section
flag[0] = false;                         flag[1] = false;
   remainder                                  remainder
```

Peterson's solution satisfies all three CS requirements (ME, progress, bounded waiting) — assuming load/store of shared variables are atomic.

---

## 6.6 Synchronization Hardware

### Key idea
All software solutions are based on **locking** — protecting critical regions via locks. Hardware can offer atomic primitives.

### Disabling interrupts (uniprocessor only)
```c
disable_interrupts();
/* critical section */
enable_interrupts();
```
- Simple; context switch can't happen with interrupts off.
- **Privileged** operation (user processes can't disable).
- **Doesn't scale** to multicore.

### Naive lock variable — fails
```c
while (lock != 0);
lock = 1;
/* CS */
lock = 0;
```
Two processes can both pass `while` then both set lock = 1 → both in CS.

**Fix:** make test-then-set atomic with hardware support.

### `test_and_set` instruction
```c
boolean test_and_set(boolean *target) {       // executed atomically
    boolean rv = *target;
    *target = TRUE;
    return rv;
}
```
Returns the **original value**; sets new value to TRUE.

Usage:
```c
while (test_and_set(&lock));    // entry
/* critical section */
lock = false;                   // exit
```

### `compare_and_swap` instruction
```c
int compare_and_swap(int *value, int expected, int new_value) {  // atomic
    int temp = *value;
    if (*value == expected)
        *value = new_value;
    return temp;
}
```

Usage:
```c
do {
    while (compare_and_swap(&lock, 0, 1) != 0) ;
    /* critical section */
    lock = 0;
    /* remainder */
} while (true);
```

### Properties of hardware solutions
- ✓ Mutual exclusion guaranteed.
- ✗ Bounded waiting is **NOT** guaranteed (a process may keep failing the atomic test indefinitely).
- ✓ Works on multicore.
- ✓ Simple, supports many critical sections.

### Bounded-Waiting ME with `test_and_set`
```c
do {
    waiting[i] = true;
    key = true;
    while (waiting[i] && key)
        key = test_and_set(&lock);
    waiting[i] = false;
    /* critical section */
    j = (i + 1) % n;
    while ((j != i) && !waiting[j])
        j = (j + 1) % n;
    if (j == i)
        lock = false;
    else
        waiting[j] = false;
    /* remainder */
} while (true);
```

---

## 6.7 Mutex Locks

Higher-level abstraction:
```c
acquire() {
    while (!available) ;          // busy wait
    available = false;
}

release() {
    available = true;
}
```

Solution:
```c
do {
    acquire(lock);
    /* critical section */
    release(lock);
    /* remainder */
} while (true);
```

A mutex with busy waiting is a **spinlock**.

---

## 6.8 Atomic Variables

Built atop instructions like compare-and-swap. Provide atomic updates on basic data types.

```c
void increment(atomic_int *v) {
    int temp;
    do {
        temp = *v;
    } while (temp != compare_and_swap(v, temp, temp+1));
}
```

---

## 6.9 Semaphores

A **semaphore** is a synchronization tool with an integer value `S`, accessed only by two atomic operations:
- `wait(S)` — historically `P()` (Dutch *proberen*, "test").
- `signal(S)` — historically `V()` (*verhogen*, "increment").

### Busy-wait form
```c
wait(S) {
    while (S <= 0) ;        // busy wait
    S--;
}

signal(S) {
    S++;
}
```

### Types
- **Counting semaphore** — value over an unrestricted domain.
- **Binary semaphore** — value 0 or 1; equivalent to a mutex lock.

### Mutual-exclusion via binary semaphore
```c
Semaphore mutex = 1;
do {
    wait(mutex);
    /* CS */
    signal(mutex);
    /* remainder */
} while (true);
```

### Use cases
- **Resource counting:** initialize semaphore to number of resources; count = 0 means all in use.
- **Process synchronization:** ensure S2 runs only after S1.
  ```
  P1: S1; signal(synch);    // synch initialized to 0
  P2: wait(synch); S2;
  ```

### Drawback: spinlock semantics
Busy waiting wastes CPU cycles.

### Block-style semaphore (no busy waiting)
Each semaphore has a waiting queue.
```c
typedef struct {
    int value;
    struct process *list;
} semaphore;

wait(semaphore *S) {
    S->value--;
    if (S->value < 0) {
        add this process to S->list;
        block();
    }
}

signal(semaphore *S) {
    S->value++;
    if (S->value <= 0) {
        remove a process P from S->list;
        wakeup(P);
    }
}
```
Negative `value` = number of processes waiting.

---

## 6.10 Deadlock and Starvation

### Deadlock
**Two or more processes wait indefinitely for events caused only by other waiting processes.**

```
S = 1, Q = 1
P0:  wait(S);      P1:  wait(Q);
     wait(Q);            wait(S);
     ...                 ...
     signal(S); Q       signal(Q); S
```

### Starvation
A process may never be removed from the semaphore queue in which it is suspended.

### Priority inversion
A high-priority task is indirectly preempted by a low-priority task that holds a lock the high-priority task needs.
**Fix:** **priority-inheritance protocol**.

---

## 6.11 Classical Problems of Synchronization

### 6.11.1 Bounded-Buffer (Producer-Consumer)
N buffers; semaphores `mutex = 1`, `full = 0`, `empty = N`.

**Producer:**
```c
do {
    /* produce item in nextp */
    wait(empty);
    wait(mutex);
        /* add nextp to buffer */
    signal(mutex);
    signal(full);
} while (TRUE);
```

**Consumer:**
```c
do {
    wait(full);
    wait(mutex);
        /* remove item from buffer to nextc */
    signal(mutex);
    signal(empty);
        /* consume item in nextc */
} while (TRUE);
```

### 6.11.2 Readers-Writers
- Readers: only read shared data; can read concurrently.
- Writers: read and modify; need exclusive access.

Shared:
```c
Semaphore mutex = 1;        // protects read_count
Semaphore rw_mutex = 1;     // protects shared data
int read_count = 0;
```

**Writer:**
```c
do {
    wait(rw_mutex);
        /* writing */
    signal(rw_mutex);
} while (true);
```

**Reader:**
```c
do {
    wait(mutex);
    read_count++;
    if (read_count == 1)
        wait(rw_mutex);              // first reader locks out writers
    signal(mutex);
        /* reading */
    wait(mutex);
    read_count--;
    if (read_count == 0)
        signal(rw_mutex);            // last reader releases
    signal(mutex);
} while (true);
```

### 6.11.3 Dining Philosophers
5 philosophers either think or eat; each needs both adjacent forks (5 forks total). Classical illustration of allocating resources without deadlock or starvation.

**Setup:**
```c
fork: array[0..4] of semaphores;      // each initialized to 1
```

**Naive (deadlock):**
```c
repeat
    think;
    wait(fork[i]);
    wait(fork[(i+1) mod 5]);
    eat;
    signal(fork[(i+1) mod 5]);
    signal(fork[i]);
forever;
```
Deadlock occurs if all five philosophers pick up their left fork simultaneously.

**Possible solutions:**
- Allow at most 4 philosophers at the table.
- Pick up both forks atomically (only if both available).
- Asymmetric: even-indexed philosophers pick right then left; odd-indexed pick left then right.

---

## 6.12 Monitors

A high-level construct: a software module with one or more procedures, an initialization sequence, and local data variables.

### Syntax
```c
monitor monitor-name {
    // shared variables
    procedure P1(...) { ... }
    ...
    procedure Pn(...) { ... }
    Initialization code(...) { ... }
}
```

### Properties
- Local variables only accessible by monitor procedures.
- A process enters by calling a procedure.
- **Only one process at a time can be active in the monitor** — mutual exclusion implicit.

### Condition variables
```c
condition x, y;
```
- `x.wait()` — caller is suspended until another process invokes `x.signal()`.
- `x.signal()` — resumes exactly one suspended process; if none, signal has **no effect**.

### Dining Philosophers — monitor solution
```c
monitor DP {
    enum { THINKING, HUNGRY, EATING } state[5];
    condition self[5];

    void pickup(int i) {
        state[i] = HUNGRY;
        test(i);
        if (state[i] != EATING) self[i].wait;
    }

    void putdown(int i) {
        state[i] = THINKING;
        test((i + 4) % 5);
        test((i + 1) % 5);
    }

    void test(int i) {
        if (state[(i + 4) % 5] != EATING &&
            state[i] == HUNGRY &&
            state[(i + 1) % 5] != EATING) {
            state[i] = EATING;
            self[i].signal();
        }
    }

    void init() {
        for (int i = 0; i < 5; i++) state[i] = THINKING;
    }
}
```

Usage: `DP.pickup(i); ... eat ...; DP.putdown(i);`

### Dining Philosophers — semaphore solution (sketch)
```c
#define N 5
typedef enum { THINKING, HUNGRY, EATING } phil_state;
phil_state state[N];
semaphore mutex = 1;
semaphore s[N];               // each 0

void test(int i) {
    if (state[i] == HUNGRY &&
        state[LEFT(i)] != EATING &&
        state[RIGHT(i)] != EATING) {
        state[i] = EATING;
        signal(s[i]);
    }
}

void get_forks(int i)  { wait(mutex); state[i]=HUNGRY; test(i); signal(mutex); wait(s[i]); }
void put_forks(int i)  { wait(mutex); state[i]=THINKING; test(LEFT(i)); test(RIGHT(i)); signal(mutex); }
```

---

## 6.13 Pthreads Synchronization

OS-independent API; provides mutex locks and condition variables; non-portable extensions: read-write locks, spinlocks.

### Mutex
```c
#include <pthread.h>
pthread_mutex_t mutex;
pthread_mutex_init(&mutex, NULL);

pthread_mutex_lock(&mutex);
/* critical section */
pthread_mutex_unlock(&mutex);
```

### Semaphore
```c
#include <semaphore.h>
sem_t sem;
sem_init(&sem, 0 /* not shared */, 1 /* initial */);

sem_wait(&sem);
/* critical section */
sem_post(&sem);
```

---

## 6.14 Likely Exam Questions

1. Define race condition. Show with an example why `counter++` may produce wrong results.
2. State the three requirements for a CS solution.
3. Explain Peterson's algorithm; show how it satisfies all three properties.
4. Explain `test_and_set` and `compare_and_swap`. Implement a lock with each.
5. Why is bounded waiting not guaranteed by the basic test_and_set lock?
6. Define semaphores. Differentiate counting vs binary semaphores.
7. Implement producer-consumer with semaphores.
8. Implement readers-writers with semaphores.
9. Explain the dining philosophers problem and the deadlock scenario.
10. Provide a monitor-based solution to dining philosophers.
11. Differentiate semaphore vs monitor.
12. What is priority inversion? How is it solved?
