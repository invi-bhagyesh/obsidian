### Q.1
implement LSTF (largest seek time first) disk scheduling with MFU (most frequently used) page replacement

input:
•⁠  ⁠no. of frames
•⁠  ⁠initial head position
•⁠  ⁠pairs of (page no. and cyl position) until user enters -1

first do lstf on the input and using that generate page request order for mfu

---
### Q.2
One more was
LCFS (last come first serve) with LFU (least frequently used) page replacement

---
### Q.3
Input -> 
no of processes
No of memory blocks
Size of memory blocks
Max size process can be allocated

(Input until -1)
Pid + resource for that process

Output
Sort and display block memory
Apply best fit
Again sort and display memory
Check if system is Safe
Find safe sequence
Final allocation

---
### Q. 4
Ex
No of memory blocks - 3
No of processes - 3
Size of memory blocks 
100 300 200
Maximum memory processes can be allocated
P0: 150
P1: 80
P2: 200

Enter pid + resource, -1 to stop
2 150
0 150
1 50
1 20
-1

Output

P2 request 150 bytes
Memory before allocation (sorted)
300 200 100
-> P2 allocated (remaini g 50)
Memory after allocation (sorted) 300 100 50
System.is safe
Safe sequence P2

P0 request 150 bytes
Memory before allocation (sorted)
300 100 50
-> P0 allocated (remaini g 150)
Memory after allocation (sorted) 150 100 50
System.is safe
Safe sequence P2 P0

P1 request 50 bytes
Memory before allocation (sorted)
150 100 50
-> P1 allocated (remaini g 0)
Memory after allocation (sorted) 150 100 0
System.is safe
Safe sequence P2 P0 P1

P1 request 20 bytes
Memory before allocation (sorted)
150 100 0
-> P1 allocated (remaini g 80)
Memory after allocation (sorted) 150 80 0
System.is safe
Safe sequence P2 P0 P1 P1

Final Allocation
P0: 150
P1: 70
P2: 150

---
### Q.5
Question 1
Input an array of logical addresses
Use the array to obtain offsets and page numbers(print them as well)
Use the array of page numbers obtained for optimal page replacement
Print each iteration of the replacement (print the frames every time, fault or hit)
Print faults, hits and hit ratio

There was some theoretical subquestion about memory access time, page fault service time and using some formula to obtain eat (idk what that is). Simple input, formula and output 

Question 2
Basic paging for 10 marks
Enter a single address and obtain the page number and offset (page size and everything else defined already)

---
### Q.6
Design and implement a program to simulate the Most Recently Used (MRU) page replacement algorithm utilizing 8-bit reference registers for each frame in main memory. The system must process a given sequence of page references under a fixed frame allocation, wherein at each memory access all frame registers are shifted right by one bit position, and the most significant bit is set to 1 for the referenced page. In the event of a page fault with no free frames available, the page possessing the maximum register value (indicating most recent usage) must be selected for replacement. The program must display, after each reference, the current frame contents along with their corresponding 8-bit register values and indicate whether the operation resulted in a hit or a fault. Finally, the total number of hits and faults must be reported.

**Input:**

Pages = 12

Frames = 4

Reference string:

1 2 3 4 1 2 5 1 2 3 4 5

**Output:**

After page 1:

1 : 10000000

- : 00000000

- : 00000000

- : 00000000

Fault

After page 2:

1 : 01000000

2 : 10000000

- : 00000000

- : 00000000

Fault

After page 3:

1 : 00100000

2 : 01000000

3 : 10000000

- : 00000000

Fault

After page 4:

1 : 00010000

2 : 00100000

3 : 01000000

4 : 10000000

Fault

After page 1:

1 : 10001000

2 : 00010000

3 : 00100000

4 : 01000000

Hit

After page 2:

1 : 01000100

2 : 10001000

3 : 000100004 : 00100000

Hit

After page 5:

1 : 00100010

5 : 10000000

3 : 00001000

4 : 00010000

Fault

After page 1:

1 : 10010001

5 : 01000000

3 : 00000100

4 : 00001000

Hit

After page 2:

2 : 10000000

5 : 00100000

3 : 00000010

4 : 00000100

Fault

After page 3:

2 : 01000000

5 : 00010000

3 : 10000001

4 : 00000010

Hit

After page 4:

2 : 00100000

5 : 00001000

3 : 01000000

4 : 10000001

Hit

After page 5:

2 : 00010000

5 : 10000100

3 : 00100000

4 : 01000000

Hit

Total Hits = 6

Total Faults = 6