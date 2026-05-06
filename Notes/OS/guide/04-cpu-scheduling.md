# 04 — CPU Scheduling

## 4.1 Basic Concepts

### CPU–I/O Burst Cycle
Process execution consists of a cycle of CPU execution and I/O wait.
- Execution begins with a CPU burst, followed by I/O burst, alternating.
- The **last CPU burst** ends with a system request to terminate execution.

### CPU Scheduler (short-term scheduler)
Selects from the ready queue and allocates CPU to one process. The queue may be ordered in various ways.

**Scheduling decisions occur when a process:**
1. Switches from running → waiting (e.g., I/O request) — *non-preemptive*.
2. Switches from running → ready (e.g., interrupt) — *preemptive*.
3. Switches from waiting → ready (e.g., I/O completion) — *preemptive*.
4. Terminates — *non-preemptive*.

For situations 1 and 4 there is no choice; for 2 and 3, there is.

### Preemptive vs Non-preemptive
- **Non-preemptive:** once allocated, process keeps CPU until it exits or switches to waiting.
- **Preemptive:** process can be interrupted; need to coordinate access to shared data.

### Dispatcher
Gives control of the CPU to the process selected by the short-term scheduler:
- Switching context.
- Switching to user mode.
- Jumping to the proper location in the user program to restart that program.

**Dispatch latency** = time the dispatcher takes to stop one process and start another. Must be fast.

---

## 4.2 Scheduling Criteria

| Criterion | Definition |
|-----------|------------|
| **CPU utilization** | Keep CPU as busy as possible. Real systems: 40% (light) to 90% (heavy). |
| **Throughput** | Number of processes completed per time unit. |
| **Turnaround time** | Submission → completion. Sum of waits (memory, ready queue, I/O) + execution. |
| **Waiting time** | Total time spent in the ready queue. |
| **Response time** | Submission → first response (NOT completion). |

**Optimization goals:**
- Maximize: CPU utilization, throughput.
- Minimize: turnaround time, waiting time, response time.

### Useful formulas
- **Turnaround time** = Completion Time − Arrival Time.
- **Waiting time** = Turnaround Time − Burst Time = Start Time − Arrival Time (for non-preemptive; for preemptive, sum of times in ready queue).
- **Response time** = Time of First CPU − Arrival Time.

---

## 4.3 First-Come First-Served (FCFS) Scheduling

- Process that requests CPU first is allocated CPU first.
- **Non-preemptive.**
- Implemented with a **FIFO queue**.

### Solved Example 1 — order P1, P2, P3
| Process | Burst Time |
|---------|------------|
| P1 | 24 |
| P2 | 3 |
| P3 | 3 |

Gantt chart:
```
| P1                        | P2 | P3 |
0                          24   27   30
```
- Waiting time: P1=0, P2=24, P3=27.
- **Average waiting time = (0+24+27)/3 = 17.**
- **Average completion (turnaround) time = (24+27+30)/3 = 27.**

### Solved Example 2 — order P2, P3, P1 (same processes)
Gantt chart:
```
| P2 | P3 |  P1                       |
0    3    6                          30
```
- Waiting time: P2=0, P3=3, P1=6.
- **Average waiting time = (0+3+6)/3 = 3.**

### Convoy Effect
A short process waits behind a long one. One CPU-bound process can hold up many I/O-bound processes.

---

## 4.4 Shortest-Job-First (SJF) Scheduling

- Schedule the process with the shortest predicted next CPU burst.
- **Optimal**: gives minimum average waiting time for a given set of processes.

### Two schemes
- **Non-preemptive SJF** — once CPU is given, runs to completion of burst.
- **Preemptive SJF** = **Shortest-Remaining-Time-First (SRTF)** — preempt if a new process has a shorter burst than the remaining time of the current process.

### Disadvantages
- **Starvation** for long jobs.
- **Hard to predict** future CPU bursts.

### Solved Example — Non-preemptive SJF (no arrivals)
| Process | Burst Time |
|---------|-----------|
| P1 | 6 |
| P2 | 8 |
| P3 | 7 |
| P4 | 3 |

Gantt chart (run shortest first):
```
| P4 | P1   | P3   | P2     |
0    3      9     16        24
```
- Waiting time: P4=0, P1=3, P3=9, P2=16.
- **Average waiting time = (3+16+9+0)/4 = 7.**

### Solved Example — Preemptive SJF (with arrivals)
| Process | Arrival | Burst |
|---------|---------|-------|
| P1 | 0 | 7 |
| P2 | 2 | 4 |
| P3 | 4 | 1 |
| P4 | 5 | 4 |

Gantt chart:
```
| P1 | P2 | P3 | P2 | P4   | P1            |
0    2    4    5    7      11             16
```
- Waiting time = (start_time − arrival − previous_runtime):
  - P1: (11−0)−(2−0) = 9 (waits from 2 to 11)
  - P2: (5−2) + (7−4) = 1; the slide answer is 1.
  - P3: 0
  - P4: 11−5 = 6... actually slide gives 2.
- Slide answer: **Average waiting time = (9+1+0+2)/4 = 3.**

### Solved Example — SRTF (4 processes)
| Process | Arrival | Burst |
|---------|---------|-------|
| P1 | 0 | 8 |
| P2 | 1 | 4 |
| P3 | 2 | 9 |
| P4 | 3 | 5 |

Gantt:
```
| P1 | P2     | P4    | P1               | P3             |
0    1        5       10                  17                26
```
- Waiting times: P1=10−1=9, P2=1−1=0, P3=17−2=15, P4=5−3=2.
- **Average waiting time = (9+0+15+2)/4 = 26/4 = 6.5.**

### Predicting next CPU burst — Exponential Averaging
- $t_n$ = actual length of n-th CPU burst.
- $\tau_{n+1}$ = predicted next CPU burst.
- $0 \le \alpha \le 1$.

$$
\tau_{n+1} = \alpha t_n + (1 - \alpha) \tau_n
$$

- $\alpha = 0$: $\tau_{n+1} = \tau_n$ (recent history doesn't count).
- $\alpha = 1$: $\tau_{n+1} = t_n$ (only the actual last burst counts).
- Common choice: $\alpha = 1/2$.

Expanded:
$$
\tau_{n+1} = \alpha t_n + (1-\alpha)\alpha t_{n-1} + \ldots + (1-\alpha)^{n+1}\tau_0
$$

#### Worked trace (τ₀ = 10, α = 0.5)
| t (actual)| 6 | 4 | 6 | 4 | 13 | 13 | 13 |
|-----------|---|---|---|---|----|----|----|
| τ (guess) |10 | 8 | 6 | 6 | 5  | 9  | 11 | 12 |

---

## 4.5 Priority Scheduling

A priority value (integer) is associated with each process. **CPU is allocated to the highest-priority process.**
- **Preemptive** or **non-preemptive**.
- **SJF is a priority scheme** where priority = predicted next CPU burst.

### Problem: Starvation
Low-priority processes may never execute.

### Solution: Aging
Increase the priority of a process as time progresses.

### Solved Example
| Process | Burst | Priority (lower = higher) |
|---------|-------|----------------------------|
| P1 | 10 | 3 |
| P2 | 1  | 1 |
| P3 | 2  | 4 |
| P4 | 1  | 5 |
| P5 | 5  | 2 |

Gantt:
```
| P2 | P5     | P1                | P3 | P4 |
0    1        6                  16    18  19
```
- Waiting time: P2=0, P5=1, P1=6, P3=16, P4=18.
- **Average waiting time = (0+1+6+16+18)/5 = 41/5 = 8.2 ms.**

---

## 4.6 Round-Robin (RR) Scheduling

Each process gets a small unit of CPU time = **time quantum** (typically 10–100 ms).
- After quantum, process is **preempted** and added to the **end** of the ready queue.

### Performance
- **q large** ⇒ behaves like FCFS.
- **q small** ⇒ better responsiveness, but context-switch overhead grows.
- Quantum should be large compared to context-switch time.

### Pros & Cons
- ✓ Better for short jobs.
- ✗ Context-switching overhead adds up for long jobs.

### Solved Example — q = 20
| Process | Burst |
|---------|-------|
| P1 | 53 |
| P2 | 8  |
| P3 | 68 |
| P4 | 24 |

Gantt chart:
```
|P1|P2|P3|P4|P1|P3|P4|P1|P3|P3 |
0  20 28 48 68 88 108 112 125 145 153
```

**Waiting times:**
- P1 = (68−20) + (112−88) = 48 + 24 = **72**.
- P2 = (20−0) = **20**.
- P3 = 28 + (88−48) + (125−108) = 28 + 40 + 17 = **85**.
- P4 = 48 + (108−68) = 48 + 40 = **88**.

- **Average waiting time = (72+20+85+88)/4 = 265/4 = 66.25.**
- Average completion time = (125+28+153+112)/4 = 418/4 = **104.5.**

---

## 4.7 Multilevel Queue Scheduling

Ready queue **partitioned** into separate queues, e.g.:
- **Foreground** (interactive)
- **Background** (batch)

A process is **permanently** in a given queue (cannot move between queues). Each queue has its own scheduling algorithm:
- Foreground — RR.
- Background — FCFS.

### Scheduling between queues
1. **Fixed priority** — serve foreground first; possibility of starvation.
2. **Time slice** — each queue gets a slice of CPU time, e.g. 80% RR foreground, 20% FCFS background.

### Typical priority hierarchy
```
priority 0 (highest): system processes
priority 1:           interactive processes
priority 2:           interactive editing
priority 3:           batch processes
priority n (lowest):  student processes
```

---

## 4.8 Multilevel Feedback Queue Scheduling

A process **can move between** queues. This can implement **aging**.

### Defined by
1. Number of queues.
2. Scheduling algorithm for each queue.
3. Method to determine when to upgrade a process.
4. Method to determine when to demote a process.
5. Method to determine which queue a process enters when needing service.

### Example — three queues
- Q₀: RR with quantum = 8 ms.
- Q₁: RR with quantum = 16 ms.
- Q₂: FCFS.

```
new job → Q₀ (q=8) → if not done → Q₁ (q=16) → if not done → Q₂ (FCFS)
```

A new job enters Q₀ which is served FCFS. When it gains CPU, the job receives 8 ms; if it does not finish, it moves to Q₁ where it gets 16 more ms; if still not done, it moves to Q₂.

---

## 4.9 Summary Table — Algorithms

| Algorithm | Preemptive | Selection rule          | Pros                 | Cons                             |
| --------- | ---------- | ----------------------- | -------------------- | -------------------------------- |
| FCFS      | No         | Earliest arrival        | Simple               | Convoy effect                    |
| SJF (NP)  | No         | Shortest next burst     | Min avg waiting time | Starvation, prediction           |
| SRTF      | Yes        | Shortest remaining time | Even better avg      | Starvation, prediction, overhead |
| Priority  | Yes/No     | Highest priority        | Flexible             | Starvation (fix: aging)          |
| RR        | Yes        | Time quantum            | Fair, responsive     | Overhead at small q              |
| MLQ       | Mixed      | Per-queue policy        | Separate classes     | Inflexible (fixed queue)         |
| MLFQ      | Yes        | Aging across queues     | Adapts to behavior   | Complex tuning                   |

---

## 4.10 Likely Exam Questions

1. State scheduling criteria; which to maximize and which to minimize.
2. Differentiate preemptive vs non-preemptive scheduling.
3. Compute average waiting time and average turnaround time using Gantt charts for a given process set under FCFS, SJF (NP/P), Priority, and RR.
4. Explain the convoy effect.
5. SJF is optimal — explain.
6. Why SJF needs prediction; explain exponential averaging.
7. Difference between SJF and SRTF.
8. Explain starvation in priority scheduling and how aging solves it.
9. Effect of time-quantum size on RR performance.
10. Compare MLQ vs MLFQ. Why MLFQ supports aging?

### Practice numerical problems

**Problem A.** Given the table below, compute the average waiting time and average turnaround time for FCFS:
| Process | Arrival | Burst |
|---------|---------|-------|
| P1 | 0 | 5 |
| P2 | 1 | 3 |
| P3 | 2 | 8 |
| P4 | 3 | 6 |

Gantt: |P1|P2|P3|P4|, completing at 5, 8, 16, 22.
- TAT = Completion − Arrival: P1=5, P2=7, P3=14, P4=19. Avg = 11.25.
- WT = TAT − Burst: P1=0, P2=4, P3=6, P4=13. Avg = 5.75.

**Problem B.** Same table but with non-preemptive SJF.
At t=0, only P1 is in queue (runs 5). At t=5, P2(B=3), P3(B=8), P4(B=6) all in queue → P2 next, then P4, then P3.
Gantt: |P1 | P2 | P4 | P3 |. Completion: 5, 8, 14, 22.
- TAT: P1=5, P2=7, P4=11, P3=20. Avg = 10.75.
- WT: P1=0, P2=4, P4=5, P3=12. Avg = 5.25.

**Problem C.** Round-Robin with q=2 on:
| Process | Arrival | Burst |
|---------|---------|-------|
| P1 | 0 | 4 |
| P2 | 1 | 3 |
| P3 | 2 | 5 |

Gantt (assuming arrivals are placed at queue tail in arrival order):
|P1|P2|P3|P1|P2|P3|P3|
0  2  4  6  8  9  11 12
- Completion: P1=8, P2=9, P3=12.
- TAT: P1=8, P2=8, P3=10. Avg = 26/3 ≈ 8.67.
- WT: P1=4, P2=5, P3=5. Avg = 14/3 ≈ 4.67.

(Use Gantt construction carefully — exact results depend on tie-breaking rules.)
