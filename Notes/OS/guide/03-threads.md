# 03 — Threads & Concurrency

## 3.1 Threads Overview

**Multithreading** = a single program made up of a number of different concurrent activities.

A **thread (lightweight process)** is the basic unit of CPU utilization. It consists of:
- Program counter (PC)
- Register set
- Stack space

**A thread shares with peer threads (in the same process):**
- Code section
- Data section
- OS resources (open files, signals)
- **No protection between threads** — threads in the same process can read/write each other's memory.

### Single-threaded vs multi-threaded process
```
SINGLE-THREADED                 MULTI-THREADED
┌─────┬─────┬─────┐             ┌─────┬─────┬─────┐
│code │data │files│             │code │data │files│  (shared)
├─────┴─────┴─────┤             ├─────┴─────┴─────┤
│registers, stack │             │ T1: regs|stack  │
│   one thread    │             │ T2: regs|stack  │
└─────────────────┘             │ T3: regs|stack  │
                                └─────────────────┘
```

**Per-thread state:** PC, registers, stack.
**Shared (per-process) state:** code, data, heap, open files, signals, PID/UID/GID.

---

## 3.2 Benefits of Threads

- **Responsiveness** — process may continue if part of it is blocked (especially important for UIs).
- **Resource sharing** — threads share resources of process; easier than shared memory or message passing.
- **Economy** — cheaper than process creation; thread switching has lower overhead than context switching.
- **Scalability** — process can take advantage of multicore architectures.

---

## 3.3 Multicore Programming — Challenges

- **Dividing activities** — identify which can be done in parallel.
- **Balance** — ensure tasks of equal value (work).
- **Data splitting** — divide data accessed/manipulated across cores.
- **Data dependency** — synchronize access when one task depends on another's data.
- **Testing and debugging** — many possible execution paths.

### Concurrency vs Parallelism
- **Parallelism** — system can perform more than one task simultaneously.
- **Concurrency** — supports more than one task making progress (single processor with scheduler interleaving).

```
CONCURRENT (single core):  T1│T2│T3│T4│T1│T2│T3│T4│ ... (time →)
PARALLEL  (two cores):
  core 1: T1│T3│T1│T3│T1│ ...
  core 2: T2│T4│T2│T4│T2│ ...
```

### Types of parallelism
- **Data parallelism** — same operation on different subsets of data, distributed across cores.
- **Task parallelism** — different operations distributed across cores; each thread performs a unique operation.

---

## 3.4 Amdahl's Law

Identifies performance gains from adding cores when an application has both serial and parallel components.

- **S** = serial portion (fraction that must run serially).
- **N** = number of processing cores.

$$
\text{speedup} \le \frac{1}{S + \dfrac{1 - S}{N}}
$$

### Solved example (textbook)
Application is 75% parallel, 25% serial → S = 0.25. Moving from 1 to 2 cores (N=2):
$$
\text{speedup} \le \frac{1}{0.25 + 0.75/2} = \frac{1}{0.25 + 0.375} = \frac{1}{0.625} = 1.6
$$
**Speedup of 1.6 ×.**

### Limit
As N → ∞, speedup → **1/S**.
- **The serial portion has a disproportionate effect on the gain from extra cores.**

### Practice numericals
1. S = 0.10, N = 4. Speedup ≤ 1/(0.10 + 0.90/4) = 1/(0.10 + 0.225) = 1/0.325 ≈ **3.08**.
2. S = 0.05, N = 16. Speedup ≤ 1/(0.05 + 0.95/16) = 1/(0.05 + 0.0594) ≈ **9.14**.
3. Maximum possible speedup with S = 0.20: limit = 1/0.20 = **5×** (no matter how many cores).

---

## 3.5 Types of Threads

### Kernel threads
- Supported by the kernel.
- Kernel performs creation, scheduling, management in kernel space.
- Expensive (slower to create and manage).
- Kernel can schedule on different processors.

### User threads
- Management done by user-level threads library.
- Supported above the kernel.
- Cheap, faster than kernel threads.
- Example: **Pthreads** in UNIX.
- If kernel is single-threaded, a blocking system call from any thread blocks the entire task.

---

## 3.6 Multithreading Models

### Many-to-One
- Many user threads → one kernel thread.
- One blocked thread blocks all (only one kernel thread).
- Cannot run in parallel on multicore.
- **Examples:** Solaris Green Threads, GNU Portable Threads.

### One-to-One
- Each user thread → one kernel thread.
- More concurrency than many-to-one.
- Number of threads per process sometimes restricted due to overhead.
- **Examples:** Windows, Linux.

### Many-to-Many
- Many user threads → many kernel threads (typically fewer kernel threads).
- OS can create a sufficient number of kernel threads.
- A blocking system call lets the kernel schedule another thread.
- **Examples:** Solaris 2, Windows with ThreadFiber package.

### Two-level model
- Like many-to-many but allows a user thread to be **bound** to a specific kernel thread.

---

## 3.7 Thread Libraries

A thread library provides API for creating and managing threads.

Two ways of implementing:
- Library entirely in user space.
- Kernel-level library supported by the OS.

### Pthreads
- POSIX standard (**IEEE 1003.1c**) API for thread creation/synchronization.
- A **specification, not an implementation**.
- Common in UNIX systems (Linux, Mac OS X).

### Pthreads example
```c
#include <pthread.h>
#include <stdio.h>
#include <stdlib.h>

int sum;                            /* shared by threads */
void *runner(void *param);

int main(int argc, char *argv[]) {
    pthread_t tid;
    pthread_attr_t attr;
    pthread_attr_init(&attr);
    pthread_create(&tid, &attr, runner, argv[1]);
    pthread_join(tid, NULL);
    printf("sum = %d\n", sum);
}

void *runner(void *param) {
    int i, upper = atoi(param);
    sum = 0;
    for (i = 1; i <= upper; i++)
        sum += i;
    pthread_exit(0);
}
```

### Joining N threads
```c
#define NUM_THREADS 10
pthread_t workers[NUM_THREADS];
for (int i = 0; i < NUM_THREADS; i++)
    pthread_join(workers[i], NULL);
```

Key Pthreads functions: `pthread_attr_init`, `pthread_create`, `pthread_join`, `pthread_exit`, `pthread_cancel`, `pthread_testcancel`.

---

## 3.8 Threading Issues

### Semantics of fork() and exec()
- Does `fork()` duplicate **only the calling thread** or **all threads**?
  - Some UNIXes provide both versions.
- `exec()` usually replaces the entire process image including all threads.

### Signal handling
A **signal** notifies a process that an event occurred. A **signal handler** processes signals.
1. Signal generated by an event.
2. Delivered to a process.
3. Handled by either the **default handler** or a **user-defined handler**.

For multi-threaded processes, where should a signal be delivered?
- To the thread the signal applies to.
- To every thread in the process.
- To certain threads.
- To a specific thread assigned to receive all signals.

### Thread cancellation
Terminating a thread before it finishes (the **target thread**).
- **Asynchronous cancellation** — terminates immediately.
- **Deferred cancellation** — target periodically checks if it should be cancelled (default).

```c
pthread_t tid;
pthread_create(&tid, 0, worker, NULL);
...
pthread_cancel(tid);
pthread_join(tid, NULL);
```

| Mode | State | Type |
|------|-------|------|
| Off | Disabled | — |
| Deferred | Enabled | Deferred (default) |
| Asynchronous | Enabled | Asynchronous |

- If cancellation is **disabled**, request stays pending until enabled.
- Default = deferred. Cancellation only at **cancellation points** (e.g., `pthread_testcancel()`), then **cleanup handler** is invoked.
- On Linux, thread cancellation is handled through signals.

### Thread-local storage (TLS)
- Each thread has its own copy of data.
- Useful when not in control of thread creation (e.g., thread pools).
- Different from local variables (only visible during a single function invocation).
- Like `static` data, but unique per thread.

### Scheduler activations
The mechanism by which the kernel notifies a user-level thread library of events (such as a kernel thread blocking) via "upcalls"; typically used to support the M:M model.

---

## 3.9 OS Examples — Linux Threads

- Linux refers to them as **tasks** rather than threads.
- Created via `clone()` system call.
- `clone()` allows child to share the address space of parent.

| Flag | Meaning |
|------|---------|
| `CLONE_FS` | File-system information shared |
| `CLONE_VM` | Same memory space shared |
| `CLONE_SIGHAND` | Signal handlers shared |
| `CLONE_FILES` | Set of open files shared |

Each task is described by `struct task_struct` (points to shared or unique data structures).

---

## 3.10 Quick Reference Cheat Sheet

- **Per-thread:** PC, registers, stack.
- **Shared:** code, data, heap, open files, signals, PID/UID/GID.
- **Benefits:** responsiveness, resource sharing, economy, scalability.
- **Models:** Many-to-One (Green/GNU PT) | One-to-One (Linux/Windows) | Many-to-Many (Solaris 2) | Two-Level.
- **Pthreads:** POSIX IEEE 1003.1c spec; calls `pthread_create/join/exit/cancel/testcancel/attr_init`.
- **Amdahl's Law:** speedup ≤ 1/(S + (1−S)/N); limit = 1/S.
  - S=0.25, N=2 → 1.6×.

---

## 3.11 Likely Exam Questions

1. Define thread. Differentiate process vs thread.
2. List benefits of multithreading.
3. Compare and contrast user-level and kernel-level threads.
4. Explain the three multithreading models with diagrams.
5. State Amdahl's Law. With S = 0.25 and N = 2 cores, compute the maximum speedup.
6. Explain fork() and exec() semantics in multi-threaded processes.
7. Discuss the four signal-delivery options in multithreaded programs.
8. Explain thread cancellation: asynchronous vs deferred.
9. What is thread-local storage? How does it differ from `static` data?
10. How does Linux create threads (clone() and flags)?
