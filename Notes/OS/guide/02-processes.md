# 02 — Processes

## 2.1 Process Concept

**Process** = a program in execution. It is more than a program (a text section).
- A program is a **passive entity** stored on disk (an executable file).
- A process is an **active entity** — a program becomes a process when its executable file is loaded into memory.
- A program can invoke more than one process (e.g., several copies of an editor), each with different data.

### Parts of a process
- **Text section** — program code.
- **Program counter (PC)** and processor registers — current activity.
- **Stack** — temporary data: function parameters, return addresses, local variables.
- **Data section** — global variables.
- **Heap** — memory dynamically allocated during run time.

### Memory layout of a C program
From low to high addresses:
```
text                  ← program instructions
initialized data      ← e.g., int y = 15;
uninitialized data    ← BSS, e.g., int x;
heap          ↑       ← grows up; malloc() allocates here
   (free)             ← heap and stack grow toward each other
stack         ↓       ← grows down; locals, function frames
argc, argv            ← high memory; command-line args
```

Example C program:
```c
#include <stdio.h>
#include <stdlib.h>

int x;
int y = 15;

int main(int argc, char *argv[]) {
    int *values;
    int i;
    values = (int *)malloc(sizeof(int)*5);
    for(i = 0; i < 5; i++)
        values[i] = i;
    return 0;
}
```

---

## 2.2 Process State

As a process executes, it changes state:
- **New** — being created.
- **Ready** — waiting to be assigned to a processor.
- **Running** — instructions being executed.
- **Waiting** — waiting for some event to occur (e.g., I/O completion).
- **Terminated** — finished execution.

### State Diagram
```
       admitted              dispatch                 exit
new ─────────────► ready ─────────────► running ─────────────► terminated
                     ▲                    │
        I/O or event │                    │ interrupt
        completion   │                    ▼
                   waiting ◄──── I/O or event wait
```

Transitions:
- **new → ready** (admitted)
- **ready → running** (scheduler dispatch)
- **running → ready** (interrupt — preempted)
- **running → waiting** (I/O or event wait)
- **waiting → ready** (I/O or event completion)
- **running → terminated** (exit)

---

## 2.3 Process Control Block (PCB)

Information associated with each process (also called **task control block**):
- **Process state** — running, waiting, etc.
- **Program counter** — location of next instruction to execute.
- **CPU registers** — contents of all process-centric registers.
- **CPU scheduling information** — priorities, scheduling queue pointers.
- **Memory-management information** — memory allocated to the process.
- **Accounting information** — CPU used, clock time elapsed since start, time limits.
- **I/O status information** — I/O devices allocated, list of open files.

```
┌──────────────────────┐
│  process state       │
│  process number (PID)│
│  program counter     │
│  registers           │
│  memory limits       │
│  list of open files  │
│  ...                 │
└──────────────────────┘
```

---

## 2.4 Process Schedulers

### Three types
- **Long-term scheduler (job scheduler)** — selects processes from job pool to load into memory.
- **Short-term scheduler (CPU scheduler)** — selects which ready process gets the CPU.
- **Medium-term scheduler** — handles swapping (removes processes from memory to reduce multiprogramming, then later swaps them back).

### Process classification
- **I/O-bound process** — spends more time on I/O than CPU.
- **CPU-bound process** — spends more time on CPU computations.

### Scheduling diagram
```
ready queue → CPU
                ├─ I/O request → I/O queue → I/O → ready queue
                ├─ time slice expired → ready queue
                ├─ fork a child → child executes → ready queue
                └─ wait for interrupt → interrupt occurs → ready queue
```

### Queues as linked lists of PCBs
- **Ready queue** — head/tail pointers to PCBs of ready processes.
- **Wait/device queues** — one per I/O device, holding PCBs blocked on that device.

---

## 2.5 Context Switch

When the CPU switches to another process, the system must:
1. **Save the state** of the old process into PCB₀.
2. **Load the saved state** of the new process from PCB₁.

This is a **context switch**.

**Key facts:**
- Context-switch time is **pure overhead**; the system does no useful work while switching.
- The more complex the OS and PCB → the longer the context switch.
- Context is represented in the PCB.

### Diagram of CPU switch from P₀ to P₁
```
P₀ executing
   │ interrupt or system call
   ▼
OS: save state into PCB₀ ... reload state from PCB₁
   │
P₁ executing (P₀ idle)
   │ interrupt or system call
   ▼
OS: save state into PCB₁ ... reload state from PCB₀
   │
P₀ executing (P₁ idle)
```

---

## 2.6 Operations on Processes

System must provide mechanisms for:
- Process creation
- Process termination

### 2.6.1 Process Creation
- A **parent** process creates **child** processes, which create more processes, forming a **tree of processes**.
- Each process has a unique **process identifier (PID)**.

**Resource sharing options:**
- Parent and children share all resources.
- Children share a subset of parent's resources.
- Parent and child share no resources.

**Execution options:**
- Parent and children execute concurrently.
- Parent waits until children terminate.

**Address space options:**
- Child is a duplicate of parent.
- Child has a program loaded into it.

### UNIX system calls
- `fork()` — creates a new process (child is a duplicate of the parent).
- `exec()` — used after `fork()` to replace the process's memory space with a new program.
- `wait()` — parent waits for the child to terminate.

```
            ┌────────► child (pid = 0) → exec() → exit()
parent ─ fork() ─┤
            └────────► parent (pid > 0) → wait() → resumes
```

### C example — fork() and exec()
```c
#include <sys/types.h>
#include <stdio.h>
#include <unistd.h>

int main() {
    pid_t pid;
    pid = fork();              /* fork a child process */

    if (pid < 0) {             /* error */
        fprintf(stderr, "Fork Failed");
        return 1;
    } else if (pid == 0) {     /* child process */
        execlp("/bin/ls", "ls", NULL);
    } else {                   /* parent process */
        wait(NULL);
        printf("Child Complete");
    }
    return 0;
}
```

### Process tree (Linux example)
```
init (1)
├── login (8415)
│     └── bash (8416)
│           ├── ps (9298)
│           └── emacs (9204)
├── kthreadd (2)
│     ├── khelper (6)
│     └── pdflush (200)
└── sshd (3028)
      └── sshd (3610)
            └── tcsch (4005)
```

### 2.6.2 Process Termination
- A process executes its last statement and asks the OS to delete it via `exit()`:
  - Returns status data from child to parent (via `wait()`).
  - Process resources deallocated by the OS.
- A parent may terminate execution of a child via `abort()`. Reasons:
  - Child has exceeded allocated resources.
  - Task assigned is no longer required.
  - Parent is exiting and OS doesn't allow child to continue.
- **Cascading termination** — if parent terminates, all children, grandchildren, ... must also terminate (initiated by OS).
- Parent may use `wait()` to wait for child termination:
  ```c
  pid = wait(&status);   // returns status info and pid of terminated process
  ```

### Special states
- **Zombie** — process has terminated but parent has not yet called `wait()`.
- **Orphan** — parent has terminated without calling `wait()` on the child.

---

## 2.7 Inter-Process Communication (IPC)

### Independent vs cooperating processes
- **Independent** — cannot affect or be affected by other processes.
- **Cooperating** — can affect or be affected by others (sharing data).

**Reasons for cooperation:**
- Information sharing
- Computation speedup
- Modularity
- Convenience

### Two IPC models
1. **Shared memory.**
2. **Message passing.**

```
SHARED MEMORY                MESSAGE PASSING
┌────┐    ┌────┐             ┌────┐    ┌────┐
│ A  │    │ B  │             │ A  │    │ B  │
└─┬──┘    └──┬─┘             └─┬──┘    └──┬─┘
  │  shared  │                  │           │
  ▼  region  ▼                  └─►kernel◄──┘
  ┌─────────┐                     msg queue
  │  user   │                     m₀ m₁ ... mₙ
  │  space  │
  └─────────┘
   kernel below
```

---

## 2.8 IPC — Shared Memory

- A region of memory shared by cooperating processes is established.
- Resides in the address space of the process creating the segment.
- Other processes attach it to their address space.
- Form of data and location are determined by the processes; **OS is not involved** after setup.
- **Processes are responsible for synchronization.**

---

## 2.9 IPC — Message Passing

Mechanism for processes to communicate and synchronize **without sharing the same address space**. Useful in distributed environments.

**Two operations:**
- `send(message)` — message size fixed or variable.
- `receive(message)`.

If P and Q wish to communicate, they need to:
- Establish a **communication link** between them.
- Exchange messages via send/receive.

### Implementation issues
- How are links established?
- Can a link be associated with more than two processes?
- How many links can there be between every pair of processes?
- What is the capacity of a link?
- Is message size fixed or variable?
- Is the link unidirectional or bidirectional?

### Fixed vs variable size messages
- **Fixed:** straightforward physical implementation; programming task is harder.
- **Variable:** simpler programming; more complex implementation.

### Implementation of a link
- **Physical:** shared memory, hardware bus, network.
- **Logical:** direct or indirect; synchronous or asynchronous; automatic or explicit buffering.

---

## 2.10 Direct vs Indirect Communication

### Direct communication
Sender and receiver name each other explicitly:
- `send(P, message)` — send a message to process P.
- `receive(Q, message)` — receive a message from process Q.

Properties:
- Links established **automatically**.
- A link is associated with **exactly one pair** of processes.
- Exactly **one link** between each pair.
- Symmetric or asymmetric (asymmetric: receiver names sender, but receiver may receive from any).

### Indirect communication
Messages directed to/from **mailboxes (ports)**:
- Each mailbox has a unique ID.
- Processes can communicate only if they share a mailbox.
- Operations:
  - Create a new mailbox.
  - Send/receive messages through mailbox.
  - Destroy a mailbox.
- `send(A, message)` / `receive(A, message)`.

Properties:
- Link established only if processes share a common mailbox.
- A link can be associated with **many** processes.
- A pair of processes may share several communication links.

**Issue (OS-owned mailbox):** P1, P2, P3 share mailbox A. P1 sends a message — who gets it (P2 or P3)?

**Possible solutions:**
- Disallow links between more than 2 processes.
- Allow only one process at a time to execute receive.
- Allow system to arbitrarily select receiver and notify sender.

---

## 2.11 Synchronization in Message Passing

Message passing may be **blocking** (synchronous) or **non-blocking** (asynchronous):
- **Blocking send** — sender is blocked until message is received.
- **Blocking receive** — receiver is blocked until a message is available.
- **Non-blocking send** — sender sends and continues.
- **Non-blocking receive** — receiver receives a valid message or null.

---

## 2.12 Buffering

Link has some capacity — number of messages residing temporarily in it:
- **Zero capacity (no buffering):** Sender blocks until recipient receives the message.
- **Bounded capacity (n messages):** If queue is not full, sender continues; if full, sender must block.
- **Unbounded capacity:** Sender never blocks.

### Producer-Consumer using message passing
```c
// Producer
message next_produced;
while (true) {
    /* produce an item in next_produced */
    send(next_produced);
}

// Consumer
message next_consumed;
while (true) {
    receive(next_consumed);
    /* consume the item in next_consumed */
}
```

---

## 2.13 IPC — POSIX Shared Memory

Steps:
1. Create shared memory segment:
   ```c
   shm_fd = shm_open(name, O_CREAT | O_RDWR, 0666);
   ```
2. Set its size:
   ```c
   ftruncate(shm_fd, 4096);
   ```
3. `mmap()` the file pointer to the shared object.
4. Read/write via the returned pointer.

### POSIX Producer
```c
const int SIZE = 4096;
const char *name = "OS";
const char *message_0 = "Hello";
const char *message_1 = "World!";

shm_fd = shm_open(name, O_CREAT | O_RDWR, 0666);
ftruncate(shm_fd, SIZE);
ptr = mmap(0, SIZE, PROT_WRITE, MAP_SHARED, shm_fd, 0);

sprintf(ptr, "%s", message_0); ptr += strlen(message_0);
sprintf(ptr, "%s", message_1); ptr += strlen(message_1);
```

### POSIX Consumer
```c
shm_fd = shm_open(name, O_RDONLY, 0666);
ptr = mmap(0, SIZE, PROT_READ, MAP_SHARED, shm_fd, 0);
printf("%s", (char *)ptr);
shm_unlink(name);
```

---

## 2.14 Pipes

A conduit allowing two processes to communicate.

### Issues
- Unidirectional or bidirectional?
- Half- or full-duplex (if bidirectional)?
- Must there be a parent-child relationship?
- Can the pipe be used over a network?

### Ordinary pipes
- Producer writes to the **write-end**; consumer reads from the **read-end**.
- **Unidirectional**.
- Require **parent-child relationship** between communicating processes.
- Cannot be accessed from outside the creating process.
- Windows calls these **anonymous pipes**.

### Named pipes
- More powerful than ordinary pipes.
- **Bidirectional**.
- No parent-child relationship necessary.
- Several processes can use the same named pipe.
- Available on UNIX and Windows.

---

## 2.15 Likely Exam Questions

1. Define a process. Differentiate program vs process.
2. Draw and explain the process state diagram.
3. List PCB contents and explain why each is needed.
4. Differentiate long-term, short-term, and medium-term schedulers.
5. Explain context switching. Why is it pure overhead?
6. Describe `fork()`, `exec()`, `wait()`. Trace a fork-exec-wait example.
7. What are zombie and orphan processes?
8. Compare shared memory vs message passing IPC.
9. Compare direct vs indirect communication; list properties of links.
10. Compare blocking vs non-blocking send/receive.
11. Differentiate ordinary pipes vs named pipes.
12. Explain the producer-consumer problem and message-passing solution.

### Numerical/Conceptual practice
- Predict the output of a simple `fork()` program: how many processes/print outputs result from N consecutive `fork()` calls? (Answer: 2^N processes if no exits between.)
- A process performs 3 `fork()` in sequence. How many child processes are created in total? (2³ − 1 = 7 children.)
