# Operating Systems — Final Theory Exam Guide

A topic-wise, self-contained study guide compiled from the lecture decks (`Notes/OS/raw/`). Each chapter contains all theory, code examples, diagrams in text form, and the standard solved numericals you should expect on the theory paper.

## Topics

| # | Chapter | Source decks | Key numerical content |
|---|---------|--------------|-----------------------|
| 1 | [Introduction](01-introduction.md) | L1–L3 | (conceptual) |
| 2 | [Processes](02-processes.md) | L4–L6 | fork-tree counting |
| 3 | [Threads & Concurrency](03-threads.md) | L7–L8 | **Amdahl's Law** |
| 4 | [CPU Scheduling](04-cpu-scheduling.md) | L9–L12 | **Gantt chart, avg waiting/turnaround time** for FCFS/SJF/SRTF/Priority/RR |
| 5 | [Real-Time OS](05-rtos.md) | L13–L15 | **CPU utilization, frame-size constraints, RMS bound, EDF schedulability** |
| 6 | [Process Synchronization](06-synchronization.md) | L16–L20 | (algorithmic) |
| 7 | [Deadlocks](07-deadlocks.md) | L21–L24 | **Banker's algorithm, detection algorithm** |
| 8 | [Memory Management](08-memory-management.md) | L25–L27 | **Segment/page address translation, TLB EAT, page-table size** |
| 9 | [Virtual Memory](09-virtual-memory.md) | L28–L31 | **Demand-paging EAT, FIFO/OPT/LRU page-fault counts** |

## Use this guide

- **Theory questions:** every chapter ends with a "Likely exam questions" section.
- **Numerical questions:** every chapter with computational content has a "Practice numericals" section right after the worked examples.
- **Concept review:** the "Quick Reference" boxes inside chapters 3 and 4 give one-page summaries.

## Suggested study order

1. Start with **Introduction → Processes → Threads** (Ch. 1–3) for the foundation.
2. Read **CPU Scheduling** (Ch. 4) and practice every Gantt-chart variant — this is heavy in numericals.
3. **RTOS** (Ch. 5) builds on scheduling — focus on RMS and EDF formulas.
4. **Synchronization** (Ch. 6) and **Deadlocks** (Ch. 7) form a tight pair — focus on Banker's algorithm steps.
5. **Memory Management** (Ch. 8) → **Virtual Memory** (Ch. 9) — EAT formulas and page-replacement traces are mandatory.

## Frequently asked numerical formulas (cheat list)

- **CPU scheduling:** Turnaround = Completion − Arrival; Waiting = Turnaround − Burst.
- **Amdahl's Law:** speedup ≤ 1 / (S + (1−S)/N); limit 1/S.
- **CPU utilization (RT):** $U = \sum e_i / p_i$.
- **RMS bound:** $U \le n(2^{1/n} − 1)$.
- **EDF condition:** $U \le 1$.
- **Cyclic Executive frame:** $f \ge \max e_i$, $f \mid p_{\text{hyper}}$, $2f − \gcd(p_i, f) \le D_i$.
- **Banker's:** Need = Max − Allocation; safety: find P with Need ≤ Work, then Work += Allocation.
- **Memory paging EAT:** EAT = α(ε+m) + (1−α)(ε+2m).
- **Demand-paging EAT:** EAT = (1−p)·m + p·page_fault_service_time.

## Source

All content is extracted from `Notes/OS/raw/`:
- `L1 L3 Introduction.pdf`
- `L4 L6 Process.pdf`
- `L7_L8_Threads_Concurrency.pdf`
- `L9_L12_CPU_Scheduling.pdf`
- `L13-L15_RTOS.pdf`
- `L16-L20_Process Synchronization.pdf`
- `L21-_24_Deadlock.pdf`
- `L25-L27_Memory_Management.pdf`
- `L28-L31_Virtual Memory.pdf`
