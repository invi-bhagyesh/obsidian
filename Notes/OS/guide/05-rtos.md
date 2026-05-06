# 05 — Real-Time Operating Systems (RTOS)

## 5.1 Fundamentals

### System
**A system is a mapping of a set of inputs into a set of outputs.**
- An assembly of components connected together in an organized way.
- Fundamentally altered if a component joins or leaves.
- Has a purpose, a degree of permanence.
- Has been defined as being of particular interest.

### Real-Time System (definition)
**A real-time system is a computer system that must satisfy bounded response-time constraints, or risk severe consequences (including failure).**

Equivalently: *A real-time system is one whose logical correctness is based on both the correctness of the outputs and their timeliness.*

### Response Time
**The time between presentation of inputs and the realization of the required behavior** (including all associated outputs).

### Failed System
**A system that cannot satisfy one or more of the requirements stipulated in the system requirements specification.** Hence rigorous specification including timing constraints is necessary.

### Soft / Hard / Firm Real-Time
- **Soft real-time:** performance is *degraded but not destroyed* by missing deadlines.
- **Hard real-time:** missing even *a single deadline* may lead to catastrophic failure.
- **Firm real-time:** *a few* missed deadlines cause no total failure, but missing more than a few does.

### Examples
| System | Class | Why |
|--------|-------|-----|
| Avionics weapons delivery (button → missile) | **Hard** | Missing the deadline misses the target. |
| Autonomous weed-killer robot navigation | **Firm** | Few missed deadlines = damaged crops; many = ruined task. |
| Console hockey game | **Soft** | Missing many deadlines just degrades experience. |

### Events
**Event:** any occurrence that causes the program counter to change non-sequentially (a change of flow-of-control).

**Release time:** the time at which an instance of a scheduled task is ready to run; usually associated with an interrupt.

### Taxonomy of events
| | Synchronous | Asynchronous |
|-|-------------|--------------|
| **Periodic** | Cyclic code | Clock interrupt |
| **Aperiodic** | Conditional branch | Regular but variable-period interrupt |
| **Sporadic** | Divide-by-zero (trap) | Power-loss alarm |

- **Synchronous:** at predictable times in flow-of-control.
- **Asynchronous:** unpredictable, usually external.
- **Periodic:** regular pulses (e.g., real-time clock).
- **Aperiodic:** irregular.
- **Sporadic:** very infrequent aperiodic.

### Deterministic System
**A system is deterministic if for each possible state and each set of inputs, a unique set of outputs and next state can be determined.** Software control of any RTS is maintained when the next state is predictable.

---

## 5.2 CPU Utilization Factor (Time-Loading Factor)

The CPU keeps executing instructions. The **utilization factor** *U* measures non-idle (real-time) processing.

For *n* periodic tasks where task *i* has worst-case execution time $e_i$ and period $p_i$:

$$u_i = \frac{e_i}{p_i}, \qquad U = \sum_{i=1}^{n} u_i = \sum_{i=1}^{n} \frac{e_i}{p_i}$$

For aperiodic/sporadic tasks, assume worst-case execution period.

### Solved Example — Elevator Controller

| i | $e_i$ | $p_i$ | $u_i$ |
|---|-------|-------|-------|
| 1 (group dispatcher comm.) | 17 ms | 500 ms | 0.034 |
| 2 (car position/door) | 4 ms  | 25 ms  | 0.160 |
| 3 (car calls register/cancel) | 1 ms  | 75 ms  | 0.013 |
| 4 (system supervision) | 20 ms | 200 ms | 0.100 |

$U = 0.034 + 0.160 + 0.013 + 0.100 \approx 0.31 = 31\%$ → **very safe zone**.

---

## 5.3 Practical Embedded Domains

| Domain | Examples |
|--------|----------|
| Aerospace | Flight control, navigation, pilot interface |
| Automotive | Airbag deployment, antilock braking, fuel injection |
| Household | Microwave oven, rice cooker, washing machine |
| Industrial | Crane, paper machine, welding robot |
| Multimedia | Console game, home theater, simulator |
| Medical | Intensive-care monitor, MRI, remote surgery |

---

## 5.4 Classification of Real-Time Schedulers

Based on how scheduling points are defined:

1. **Clock-driven** — points determined by clock interrupts.
   - **Table-driven**.
   - **Cyclic**.
2. **Event-driven** — points by events (excluding clock interrupts).
   - **Simple priority-based**.
   - **Rate Monotonic Analysis (RMA)**.
   - **Earliest Deadline First (EDF)**.
3. **Hybrid** — uses both clock interrupts and events.
   - **Round-robin**.

---

## 5.5 Round-Robin Scheduling (Real-Time)

- Tasks executed sequentially, often with a cyclic executive.
- With **time slicing**, each executable task gets a fixed time quantum (slice).
- A fixed-rate clock initiates an interrupt at the slice rate.
- Task runs until it completes or its slice expires.
- If incomplete, context is saved, task placed at end of executable list, next task's context restored.

Round-robin can be combined with preemptive priority — **mixed scheduling**:
- Two processes A, C at the same priority; B at higher priority.
- A starts → B preempts (higher priority) → B runs to completion → A resumes → A's slice expires → context switches to C.

---

## 5.6 Cyclic Executives (CE)

A simple, deterministic, predictable scheduler.
- Interleaves and sequentializes execution of periodic tasks per a *pre-run-time* schedule.
- Implemented as a table of procedure calls, each task being a procedure, in a single `do` loop.
- Scheduling decisions made periodically, **at the beginning of each frame**.
- A **frame (minor cycle)** has length $f$ (the **frame size**).

### Major cycle (Hyperperiod)
**The hyperperiod is the minimum time required to execute all allocated tasks while meeting all deadlines and periods.**

$$p_{\text{hyper}} = \mathrm{lcm}(p_1, p_2, \ldots, p_n)$$

- No preemption within a frame.
- Phases of periodic tasks must be nonnegative integer multiples of $f$.

### Frame-size constraints
**C1 — Frame must accommodate longest task:**
$$f \ge \max_{i \in [1,n]} e_i$$

**C2 — Hyperperiod is an integer number of frames:**
$$\lfloor p_{\text{hyper}}/f \rfloor - p_{\text{hyper}}/f = 0$$

**C3 — Deadline guarantee (worst-case):**
$$2f - \gcd(p_i, f) \le D_i \quad \text{for every task } i$$

(where $D_i$ is the relative deadline.)

### Solved Example — Frame Size Calculation
| $\tau_i$ | $p_i$ | $e_i$ | $D_i$ |
|----------|-------|-------|-------|
| $\tau_2$ | 15    | 1     | 14    |
| $\tau_3$ | 20    | 2     | 26    |
| $\tau_4$ | 22    | 3     | 22    |

Hyperperiod = lcm(15, 20, 22) = **660**.

- $C_1$: $f \ge \max(1,2,3) = 3$.
- $C_2$: $f$ must divide each of 15, 20, 22 evenly → candidates $f \in \{2, 3, 4, 5, 10, \ldots\}$.
- $C_3$: For every task: $2f - \gcd(p_i, f) \le D_i$.
  - This narrows candidates to $f \in \{2, 3, 4, 5\}$.
- Combining all three: **$f \in \{3, 4, 5\}$**.

---

## 5.7 Rate-Monotonic Scheduling (RMS)

### Theorem (Liu and Layland, 1973)
*Given a set of periodic tasks and preemptive priority scheduling, then by assigning priorities such that tasks with shorter periods have higher priorities (rate-monotonic), the resulting algorithm is optimal among static-priority schedulers.*

### RMA Schedulability Bound
A set of $n$ periodic tasks is RM-schedulable if:

$$U \le n\left(2^{1/n} - 1\right)$$

| n | Bound |
|---|-------|
| 1 | 1.000 |
| 2 | 0.828 |
| 3 | 0.780 |
| 4 | 0.756 |
| ∞ | $\ln 2 \approx 0.693$ |

(So whenever $U \le n(2^{1/n}-1)$, a schedule definitely exists; if $U$ exceeds the bound, RM may or may not work.)

### Solved Example
| $\tau_i$ | $e_i$ | $p_i$ | $u_i = e_i/p_i$ |
|----------|-------|-------|------------------|
| $\tau_1$ | 1     | 4     | 0.25             |
| $\tau_2$ | 2     | 5     | 0.40             |
| $\tau_3$ | 5     | 20    | 0.25             |

Total $U = 0.90$.
- RM bound for n=3 is $3(2^{1/3}-1) \approx 0.780$.
- $U = 0.90 > 0.780$ → RM bound test inconclusive (utilization above the sufficient bound).
- Priority assignment: $\tau_1$ highest (smallest period), $\tau_2$ next, $\tau_3$ lowest.
- All released at t=0; $\tau_1$ runs first; at t=4, second instance of $\tau_1$ preempts $\tau_3$.

(For task sets above the RM bound, perform the **exact response-time analysis** to confirm schedulability.)

### RMS limitations
- Not every system fits RM (e.g., a nuclear-plant control system may want visual display at highest priority).
- Aperiodic and sporadic tasks need feasibility checks.

---

## 5.8 Earliest-Deadline-First (EDF) Scheduling

In **dynamic-priority** schemes, the priority of a task changes as tasks are released and completed.

**EDF rule:** the ready task with the earliest deadline has the highest priority at any point in time.

### EDF Schedulability Theorem
A set of $n$ periodic tasks each with relative deadline equal to its period can be feasibly scheduled by EDF *if and only if*:

$$\sum_{i=1}^{n} \frac{e_i}{p_i} \le 1$$

### Solved Example
| $\tau_i$ | $e_i$ | $p_i$ |
|----------|-------|-------|
| $\tau_1$ | 2     | 5     |
| $\tau_2$ | 4     | 7     |

$U = 2/5 + 4/7 = 0.4 + 0.571 \approx 0.971 \le 1$ → EDF schedulable.

**Schedule trace:**
- At t=0, both released. $\tau_1$ has deadline 5, $\tau_2$ has deadline 7 → $\tau_1$ runs first (2 units).
- At t=2, $\tau_2$ runs.
- At t=5, $\tau_1$ releases again with deadline 10; $\tau_2$ has deadline 7 (earlier) → $\tau_2$ continues.
- At t=15, $\tau_2$ is preempted because its (next) deadline t=21 is later than $\tau_1$'s deadline t=20.
- $\tau_2$ resumes when $\tau_1$ completes.

### EDF vs RMS — Comparison
| | RMS | EDF |
|---|-----|-----|
| Priority | Static (period-based) | Dynamic (deadline-based) |
| Optimal among | Fixed-priority | All schedulers (single CPU) |
| Schedulability bound | $n(2^{1/n}-1)$ ≈ 69% | 100% |
| Overhead | Low | Higher (priority recomputed) |

---

## 5.9 Likely Exam Questions

1. Define a real-time system. Distinguish hard, soft, and firm real-time with examples.
2. Define synchronous vs asynchronous events; periodic vs aperiodic vs sporadic; give one example of each.
3. State the formula for CPU utilization. Compute $U$ for a given task set.
4. Explain the Cyclic Executive scheduling. State the three frame-size constraints.
5. Compute the valid frame sizes for a given task set (worked above).
6. State the Rate-Monotonic theorem. Compute the RM utilization bound for n = 1, 2, 3.
7. State the EDF schedulability condition. Verify schedulability for a given task set.
8. Compare RMS and EDF.
9. Explain Round-Robin scheduling in real-time and how it combines with priorities.

### Practice numericals

**Problem A.** Three periodic tasks: $\tau_1 (e=1, p=3), \tau_2 (e=1, p=4), \tau_3 (e=2, p=6)$. Is the task set RM-schedulable?
$U = 1/3 + 1/4 + 2/6 = 0.333 + 0.25 + 0.333 = 0.917$.
RM bound for n=3 is 0.780. $U > 0.780$ → RM bound is exceeded; need exact analysis. EDF bound: $U=0.917 \le 1$ → EDF-schedulable.

**Problem B.** Frame size for $\tau_1(p=4, e=1, D=4), \tau_2(p=5, e=2, D=5), \tau_3(p=20, e=5, D=20)$.
- Hyperperiod = lcm(4,5,20) = 20.
- $C_1$: $f \ge 5$.
- $C_2$: $f$ divides 20: $f \in \{1, 2, 4, 5, 10, 20\}$. Combined with C1: $f \in \{5, 10, 20\}$.
- $C_3$: e.g., for $f = 5$: $2(5) - \gcd(4,5) = 10 - 1 = 9 > D_1 = 4$ → fails. So no valid $f$ here without re-deriving the deadlines.

(In practice, you may need to relax the deadline constraints or change task parameters.)
