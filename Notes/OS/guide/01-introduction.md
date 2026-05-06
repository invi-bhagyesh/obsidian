# 01 — Introduction to Operating Systems

## 1.1 What is an Operating System?

An **Operating System (OS)** is a program that acts as an intermediary between the user of a computer and the computer hardware.

**Goals of an OS:**
- Execute user programs and make solving user problems easier.
- Make the computer system convenient to use.
- Use the computer hardware in an efficient manner.

### Computer System Structure
A computer system has four components:
1. **Hardware** — provides basic computing resources (CPU, memory, I/O devices).
2. **Operating system** — controls and coordinates use of hardware among various applications and users.
3. **Application programs** — define the ways in which system resources are used to solve users' computing problems (word processors, compilers, web browsers, database systems, video games).
4. **Users** — people, machines, other computers.

```
   user
    ↕
application programs (compilers, web browsers, ...)
    ↕
operating system
    ↕
computer hardware (CPU, memory, I/O)
```

### Two-fold OS definition
- **Resource allocator** — manages all resources, decides between conflicting requests for efficient and fair resource use.
- **Control program** — controls execution of programs to prevent errors and improper use of the computer.

### Kernel
There is no universally accepted definition of an OS. A working definition: *"the one program running at all times on the computer"* is the **kernel**. Everything else is either a **system program** (ships with the OS) or an **application program**.

---

## 1.2 Computer Startup

The **bootstrap program** is loaded at power-up or reboot.
- Typically stored in ROM or EPROM, generally known as **firmware**.
- Initializes all aspects of the system.
- Loads the operating system kernel and starts execution.

---

## 1.3 Computer-System Operation

- I/O devices and the CPU can execute concurrently.
- Each **device controller** is in charge of a particular device type and has a local buffer.
- CPU moves data from/to main memory to/from local buffers.
- I/O is from the device to the local buffer of the controller.
- The device controller informs the CPU that it has finished its operation by causing an **interrupt**.

### Interrupts
- An interrupt transfers control to the **interrupt service routine (ISR)** through the **interrupt vector**, which contains the addresses of all the service routines.
- Interrupt architecture must save the address of the interrupted instruction.
- A **trap** or **exception** is a software-generated interrupt caused either by an error or a user request.
- An OS is **interrupt driven**.

### Interrupt Handling
- The OS preserves the state of the CPU by storing registers and the program counter.
- Determines which type of interrupt has occurred:
  - **Polling** — query each device.
  - **Vectored interrupt system** — direct lookup in interrupt vector.
- Separate segments of code determine what action should be taken for each type of interrupt.

### Intel Pentium event-vector table (selected)
| Vector # | Description |
|----------|-------------|
| 0  | Divide error |
| 1  | Debug exception |
| 3  | Breakpoint |
| 6  | Invalid opcode |
| 8  | Double fault |
| 13 | General protection |
| 14 | Page fault |
| 16 | Floating-point error |
| 32–255 | Maskable interrupts |

---

## 1.4 Operating-System Operations

The OS is **interrupt driven** (hardware and software):
- **Hardware interrupt** — caused by one of the devices.
- **Software interrupt (exception or trap):**
  - Software error (e.g., division by zero).
  - Request for OS service.
  - Other process problems: infinite loop, processes modifying each other or the OS.

### Dual-mode operation
The OS protects itself and other system components using **dual-mode operation**:
- **User mode** and **kernel mode**.
- A **mode bit** is provided by the hardware:
  - Distinguishes when the system is running user code or kernel code.
  - Some instructions designated as **privileged** — only executable in kernel mode.
  - System call changes mode to kernel; return from call resets it to user.
- Modern CPUs support multi-mode operation: e.g., **virtual machine manager (VMM)** mode for guest VMs.

### Transition from User to Kernel Mode
```
user process executing → calls system call → trap (mode bit = 0)
                       → execute system call (kernel mode)
                       → return (mode bit = 1) → user process resumes
```

---

## 1.5 Computer-System Architecture

### Single-processor systems
Most early systems used a single general-purpose processor. Most modern systems also have special-purpose processors (e.g., GPU, disk controller).

### Multiprocessor systems
Also known as **parallel systems** or **tightly-coupled systems**.

**Advantages:**
1. **Increased throughput**.
2. **Economy of scale**.
3. **Increased reliability** — graceful degradation or fault tolerance.

**Two types:**
1. **Asymmetric Multiprocessing** — each processor is assigned a specific task.
2. **Symmetric Multiprocessing (SMP)** — each processor performs all tasks.

### Symmetric Multiprocessing Architecture
Each CPU has its own registers and cache; all CPUs share a common memory.
```
CPU₀ [reg, cache]   CPU₁ [reg, cache]   CPU₂ [reg, cache]
            ↓               ↓                ↓
                        memory
```

### Multicore designs
A single chip contains multiple CPU cores, each with its own registers and cache, sharing memory.

### Clustered Systems
Like multiprocessor systems, but multiple systems work together:
- Usually share storage via a **storage-area network (SAN)**.
- Provide **high-availability** service that survives failures:
  - **Asymmetric clustering** — one machine in hot-standby mode.
  - **Symmetric clustering** — multiple nodes run applications, monitor each other.
- Some clusters are for **high-performance computing (HPC)** — applications must be written to use **parallelization**.

---

## 1.6 Operating-System Structure (Multiprogramming & Timesharing)

### Multiprogramming (Batch system)
Needed for efficiency:
- A single user cannot keep CPU and I/O devices busy at all times.
- Multiprogramming organizes jobs (code and data) so the CPU always has one to execute.
- A subset of total jobs in the system is kept in memory.
- One job is selected and run via **job scheduling**.
- When it has to wait (e.g., for I/O), the OS switches to another job.

### Timesharing (Multitasking)
A logical extension where the CPU switches jobs so frequently that users can interact with each job while it is running, creating **interactive computing**.
- **Response time** should be < 1 second.
- Each user has at least one program executing in memory ⇒ **process**.
- If several jobs ready to run at the same time ⇒ **CPU scheduling**.
- If processes don't fit in memory, **swapping** moves them in and out to run.
- **Virtual memory** allows execution of processes not completely in memory.

### Memory layout for a multiprogrammed system
```
0      ┌──────────────────┐
       │  operating system│
       ├──────────────────┤
       │     job 1        │
       ├──────────────────┤
       │     job 2        │
       ├──────────────────┤
       │     job 3        │
       ├──────────────────┤
       │     job 4        │
512 M  └──────────────────┘
```

---

## 1.7 OS Services

OS provides an environment for execution of programs and services.

**Services helpful to the user:**
- **User interface (UI)** — CLI, GUI, batch, touch screen.
- **Program execution** — load programs into memory and run them; end normally or abnormally.
- **I/O operations** — running programs may need files or I/O devices.
- **File-system manipulation** — read/write files and directories, search them, list info, manage permissions.
- **Communications** — exchange information between processes (same or different computers) via shared memory or message passing.
- **Error detection** — detect errors in CPU, memory, I/O devices, and user programs; take appropriate action.

**Services for efficient operation of the system:**
- **Resource allocation** — when multiple users/jobs running, allocate resources (CPU cycles, memory, file storage, I/O devices).
- **Accounting** — keep track of which users use how much and what kinds of resources.
- **Protection and security:**
  - **Protection** — ensure all access to system resources is controlled.
  - **Security** — defend system from outsiders; requires user authentication.

---

## 1.8 User Interface

Three types:

### CLI (Command-Line Interpreter)
- Allows direct command entry.
- Implemented in kernel or by system programs.
- Multiple flavors implemented — **shells**.
- Primarily fetches a command from user and executes it.
- Sometimes commands built-in, sometimes just names of programs.

### GUI (Graphical User Interface)
- User-friendly **desktop** metaphor interface.
- Mouse, keyboard, monitor.
- **Icons** represent files, programs, actions, etc.
- Various mouse buttons over objects cause actions.
- Invented at Xerox PARC.
- Many systems include both CLI and GUI:
  - Microsoft Windows: GUI with CLI "command" shell.
  - Apple Mac OS X: "Aqua" GUI with UNIX kernel underneath.
  - Unix and Linux: CLI with optional GUI (CDE, KDE, GNOME).

### Touchscreen Interfaces
- Mouse not possible or not desired.
- Actions and selection based on gestures.
- Virtual keyboard for text entry.
- Voice commands.

---

## 1.9 System Calls

- **Programming interface** to the services provided by the OS.
- Typically written in a high-level language (C or C++).
- Mostly accessed by programs via a high-level **Application Programming Interface (API)** rather than direct system call use.
- Three most common APIs: **Win32 API** (Windows), **POSIX API** (UNIX/Linux/Mac OS X), **Java API** (JVM).

### Standard C Library Example
A C program invoking `printf()` library call, which calls the `write()` system call:
```c
#include <stdio.h>
int main() {
    printf("Greetings");
    return 0;
}
```
The `printf()` runs in user mode → enters the standard C library → calls `write()` system call → kernel mode executes the actual write.

---

## 1.10 Open-Source Operating Systems

- OSes made available in source-code format rather than just binary (closed-source).
- Counter to copy protection and Digital Rights Management (DRM).
- Started by **Free Software Foundation (FSF)**, which has the "copyleft" **GNU Public License (GPL)**.
- Examples: **GNU/Linux**, **BSD UNIX** (including the core of Mac OS X).
- Use VMMs like VMware Player, Virtualbox to run guest OSes for exploration.

---

## 1.11 Key Definitions to Remember

| Term | Meaning |
|------|---------|
| Kernel | The one program running at all times on the computer. |
| Bootstrap program | Loaded at power-up; initializes the system and loads the kernel. |
| Firmware | Bootstrap stored in ROM/EPROM. |
| Interrupt | Hardware/software signal that transfers control to an ISR. |
| Trap / Exception | Software-generated interrupt (error or user request). |
| Mode bit | Hardware bit distinguishing user vs kernel mode. |
| Privileged instruction | Only executable in kernel mode. |
| SMP | Symmetric multiprocessing — each CPU runs all tasks. |
| Multiprogramming | Keeps multiple jobs in memory, CPU always has one to run. |
| Timesharing | CPU switches jobs frequently for interactive use. |
| System call | Programming interface to OS services. |
| API | High-level interface programs use to make system calls. |

---

## 1.12 Likely Exam Questions

1. Define an OS. State its goals and the dual definition (resource allocator vs control program).
2. Describe the bootstrap process.
3. Explain interrupt handling: what happens on interrupt, role of interrupt vector, polling vs vectored.
4. Differentiate trap vs interrupt.
5. Explain dual-mode operation and why it is needed.
6. Compare SMP vs Asymmetric multiprocessing.
7. Compare multiprogramming vs timesharing.
8. List and explain the services provided by an OS.
9. What is a system call? Explain how `printf()` reaches the kernel.
10. Explain clustered systems and high-availability vs HPC.
