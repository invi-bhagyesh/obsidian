# 1. The Real Number System

---

## 1.1 Why Real Analysis Starts Here

Calculus uses real numbers freely, but it never explains what a real number *is*. Real analysis begins by fixing the structure of $\mathbb{R}$ — its algebraic, order, and completeness properties — because every later result (limits, continuity, derivatives, integrals) rests on these three layers.

We build up in stages:
- $\mathbb{N} = \{1, 2, 3, \ldots\}$ — natural numbers
- $\mathbb{Z} = \{\ldots, -2, -1, 0, 1, 2, \ldots\}$ — integers
- $\mathbb{Q} = \{p/q : p, q \in \mathbb{Z},\ q \neq 0\}$ — rationals
- $\mathbb{R}$ — reals (rationals + irrationals)
- $\mathbb{C} = \{a + bi : a, b \in \mathbb{R}\}$ — complex numbers

Each layer is obtained by closing the previous under a missing operation: $\mathbb{Z}$ closes $\mathbb{N}$ under subtraction, $\mathbb{Q}$ closes $\mathbb{Z}$ under (non-zero) division, $\mathbb{R}$ closes $\mathbb{Q}$ under limits (completeness), and $\mathbb{C}$ closes $\mathbb{R}$ under root-taking of polynomials.

---

## 1.2 Field Axioms

A **field** is a set $F$ with two binary operations $+$ (addition) and $\cdot$ (multiplication) satisfying the following:

### Additive axioms
For all $a, b, c \in F$:
1. **Closure:** $a + b \in F$
2. **Associativity:** $(a + b) + c = a + (b + c)$
3. **Commutativity:** $a + b = b + a$
4. **Identity:** $\exists\ 0 \in F$ such that $a + 0 = a$
5. **Inverse:** $\exists\ (-a) \in F$ such that $a + (-a) = 0$

### Multiplicative axioms
For all $a, b, c \in F$:
6. **Closure:** $a \cdot b \in F$
7. **Associativity:** $(a \cdot b) \cdot c = a \cdot (b \cdot c)$
8. **Commutativity:** $a \cdot b = b \cdot a$
9. **Identity:** $\exists\ 1 \in F$, $1 \neq 0$, such that $a \cdot 1 = a$
10. **Inverse:** For each $a \neq 0$, $\exists\ a^{-1} \in F$ such that $a \cdot a^{-1} = 1$

### Distributivity
11. $a \cdot (b + c) = a \cdot b + a \cdot c$

$\mathbb{Q}$, $\mathbb{R}$, and $\mathbb{C}$ are fields. $\mathbb{Z}$ is *not* (no multiplicative inverse for $2$). $\mathbb{N}$ is not (no additive inverse).

### Consequences of the field axioms
- $0 \cdot a = 0$ for all $a$
- $(-1) \cdot a = -a$
- $a \cdot b = 0 \iff a = 0$ or $b = 0$ (no zero divisors)
- Cancellation: if $a + c = b + c$ then $a = b$; if $ac = bc$ and $c \neq 0$ then $a = b$

---

## 1.3 Order Axioms

An **ordered field** is a field $F$ equipped with a relation $<$ satisfying:

For all $a, b, c \in F$:
1. **Trichotomy:** Exactly one of $a < b$, $a = b$, $b < a$ holds.
2. **Transitivity:** $a < b$ and $b < c \implies a < c$.
3. **Order-preserving addition:** $a < b \implies a + c < b + c$.
4. **Order-preserving multiplication by positives:** $a < b$ and $c > 0 \implies ac < bc$.

We write $a \leq b$ to mean $a < b$ or $a = b$.

### Consequences
- $a > 0 \iff -a < 0$
- $a^2 \geq 0$ for all $a$ (so $1 = 1^2 > 0$)
- If $a > 0$ then $a^{-1} > 0$
- $0 < a < b \implies 0 < b^{-1} < a^{-1}$ (inversion reverses order for positives)

$\mathbb{Q}$ and $\mathbb{R}$ are ordered fields. $\mathbb{C}$ is **not** an ordered field — no order on $\mathbb{C}$ can be compatible with the field operations, because $i^2 = -1$ would force $-1 > 0$.

---

## 1.4 Completeness — What Separates $\mathbb{R}$ from $\mathbb{Q}$

Both $\mathbb{Q}$ and $\mathbb{R}$ are ordered fields. The difference is **completeness**.

> **Completeness Axiom (LUB Property).** Every non-empty subset of $\mathbb{R}$ that is bounded above has a least upper bound (supremum) in $\mathbb{R}$.

$\mathbb{Q}$ fails this: $S = \{x \in \mathbb{Q} : x^2 < 2\}$ is bounded above in $\mathbb{Q}$ but has no least upper bound in $\mathbb{Q}$ (the natural candidate $\sqrt{2}$ is irrational).

This single axiom is what makes all of analysis work. We will unpack the supremum in [[03-supremum-and-infimum]].

### $\sqrt{2}$ is irrational

> **Theorem.** There is no $r \in \mathbb{Q}$ with $r^2 = 2$.

*Proof.* Suppose for contradiction that $r = p/q$ with $p, q \in \mathbb{Z}$, $q \neq 0$, $\gcd(p,q) = 1$, and $r^2 = 2$. Then $p^2 = 2q^2$, so $p^2$ is even, so $p$ is even (if $p$ were odd, $p^2$ would be odd). Write $p = 2k$. Then $4k^2 = 2q^2$, so $q^2 = 2k^2$, so $q^2$ is even, so $q$ is even. But then $2 \mid \gcd(p,q)$, contradicting $\gcd(p,q) = 1$. $\blacksquare$

This proves $\mathbb{Q} \subsetneq \mathbb{R}$ — there are reals that are not rational.

---

## 1.5 Absolute Value

For $x \in \mathbb{R}$, define
$$|x| = \begin{cases} x & \text{if } x \geq 0 \\ -x & \text{if } x < 0 \end{cases}$$

Equivalently, $|x| = \max\{x, -x\} = \sqrt{x^2}$.

### Properties
For all $x, y \in \mathbb{R}$:
1. $|x| \geq 0$, with $|x| = 0 \iff x = 0$
2. $|xy| = |x|\,|y|$
3. $|x + y| \leq |x| + |y|$  (**triangle inequality**)
4. $\big|\,|x| - |y|\,\big| \leq |x - y|$  (**reverse triangle inequality**)
5. $|x| \leq a \iff -a \leq x \leq a$  (for $a \geq 0$)
6. $|x - y|$ = distance between $x$ and $y$ on the real line

### Proof of the triangle inequality

> **Theorem.** $|x + y| \leq |x| + |y|$ for all $x, y \in \mathbb{R}$.

*Proof.* Since $-|x| \leq x \leq |x|$ and $-|y| \leq y \leq |y|$, adding gives
$$-(|x|+|y|) \leq x + y \leq |x| + |y|,$$
so $|x+y| \leq |x| + |y|$ by Property 5. $\blacksquare$

### Proof of the reverse triangle inequality

*Proof.* $|x| = |(x-y) + y| \leq |x-y| + |y|$, so $|x| - |y| \leq |x-y|$. By symmetry, $|y| - |x| \leq |x-y|$. Combining: $\big||x|-|y|\big| \leq |x-y|$. $\blacksquare$

---

## 1.6 Intervals in $\mathbb{R}$

For $a, b \in \mathbb{R}$ with $a < b$:

| Notation | Definition | Type |
|----------|-----------|------|
| $(a, b)$ | $\{x : a < x < b\}$ | Open, bounded |
| $[a, b]$ | $\{x : a \leq x \leq b\}$ | Closed, bounded |
| $[a, b)$ | $\{x : a \leq x < b\}$ | Half-open, bounded |
| $(a, b]$ | $\{x : a < x \leq b\}$ | Half-open, bounded |
| $(a, \infty)$ | $\{x : x > a\}$ | Open, unbounded |
| $[a, \infty)$ | $\{x : x \geq a\}$ | Closed, unbounded |
| $(-\infty, b)$ | $\{x : x < b\}$ | Open, unbounded |
| $(-\infty, b]$ | $\{x : x \leq b\}$ | Closed, unbounded |
| $(-\infty, \infty)$ | $\mathbb{R}$ | Open and closed |

**Note.** $\infty$ and $-\infty$ are *symbols*, not elements of $\mathbb{R}$.

### Characterization of intervals
A subset $I \subseteq \mathbb{R}$ is an interval $\iff$ for all $x, y \in I$ with $x < y$, every $z \in \mathbb{R}$ with $x < z < y$ also lies in $I$. (Convexity on the line.)

---

## 1.7 The Extended Real Line

Sometimes we adjoin $+\infty$ and $-\infty$ to $\mathbb{R}$:
$$\overline{\mathbb{R}} = \mathbb{R} \cup \{-\infty, +\infty\}$$

Conventions: $-\infty < x < +\infty$ for all $x \in \mathbb{R}$; $x + \infty = \infty$ for $x \in \mathbb{R}$; $x \cdot \infty = \infty$ for $x > 0$. Forms like $\infty - \infty$, $0 \cdot \infty$ remain undefined.

$\overline{\mathbb{R}}$ is *not* a field — it is only a convenient order-completion.

---

## 1.8 The Complex Number System

### Definition
$$\mathbb{C} = \{a + bi : a, b \in \mathbb{R}\}, \quad i^2 = -1.$$

For $z = a + bi$: **real part** $\operatorname{Re}(z) = a$, **imaginary part** $\operatorname{Im}(z) = b$.

### Operations
For $z = a + bi$, $w = c + di$:
- $z + w = (a+c) + (b+d)i$
- $z \cdot w = (ac - bd) + (ad + bc)i$
- **Conjugate:** $\bar{z} = a - bi$
- **Modulus:** $|z| = \sqrt{a^2 + b^2} = \sqrt{z\bar{z}}$
- **Inverse** (for $z \neq 0$): $z^{-1} = \bar{z}/|z|^2$

### Properties of conjugation and modulus
1. $\overline{z+w} = \bar{z} + \bar{w}$, $\overline{zw} = \bar{z}\bar{w}$
2. $\bar{\bar{z}} = z$
3. $z + \bar{z} = 2\operatorname{Re}(z)$, $z - \bar{z} = 2i\operatorname{Im}(z)$
4. $|z|^2 = z\bar{z}$
5. $|zw| = |z||w|$
6. $|z + w| \leq |z| + |w|$ (triangle inequality in $\mathbb{C}$)
7. $\big||z| - |w|\big| \leq |z - w|$

### Polar form
Every $z \neq 0$ has a polar representation
$$z = r(\cos\theta + i\sin\theta) = re^{i\theta},$$
where $r = |z|$ and $\theta = \arg(z) \in (-\pi, \pi]$ (principal argument).

**De Moivre's theorem:** $(r e^{i\theta})^n = r^n e^{in\theta}$ for $n \in \mathbb{Z}$.

$\mathbb{C}$ is a field, but as noted in §1.3 it **cannot** be ordered compatibly with its field structure. Because of this, real analysis — which is fundamentally about order — develops most of its theory on $\mathbb{R}$; complex analysis (see [[08-complex-numbers]]) takes a different path.

---

## Worked Examples

**Example 1:** Prove that if $a, b \in \mathbb{R}$ with $a < b$, then there exists $c \in \mathbb{R}$ with $a < c < b$.

*Solution:* Take $c = (a+b)/2$. Since $a < b$, adding $a$ gives $2a < a + b$ so $a < (a+b)/2$. Adding $b$ to $a < b$ gives $a + b < 2b$ so $(a+b)/2 < b$. Hence $a < c < b$. $\blacksquare$

This shows $\mathbb{R}$ is *densely ordered* — between any two reals lies another real.

---

**Example 2:** Solve $|2x - 5| < 3$.

*Solution:* By Property 5 of absolute value:
$$-3 < 2x - 5 < 3 \implies 2 < 2x < 8 \implies 1 < x < 4.$$
Solution set: $(1, 4)$.

---

**Example 3:** Prove that for all $a, b \in \mathbb{R}$, $\max(a, b) = \dfrac{a+b+|a-b|}{2}$ and $\min(a, b) = \dfrac{a+b-|a-b|}{2}$.

*Solution:* Case 1: $a \geq b$. Then $|a-b| = a-b$, so $(a+b+(a-b))/2 = a = \max$. Case 2: $a < b$. Then $|a-b| = b-a$, so $(a+b+(b-a))/2 = b = \max$. The min formula follows from $\min(a,b) = a+b - \max(a,b)$. $\blacksquare$

---

**Example 4:** Compute $(1 + i)^8$.

*Solution:* Use polar form. $1 + i = \sqrt{2}\,e^{i\pi/4}$, so by De Moivre
$$(1+i)^8 = (\sqrt{2})^8 e^{i \cdot 8 \cdot \pi/4} = 16 e^{i 2\pi} = 16.$$

---

**Example 5:** Show that if $|x - a| < \varepsilon/2$ and $|y - b| < \varepsilon/2$, then $|(x+y) - (a+b)| < \varepsilon$.

*Solution:*
$$|(x+y)-(a+b)| = |(x-a)+(y-b)| \leq |x-a| + |y-b| < \varepsilon/2 + \varepsilon/2 = \varepsilon. \blacksquare$$

This "$\varepsilon/2$ trick" is the workhorse of analysis — you'll see it repeatedly in limit proofs.

---

## Practice Problems

1. Prove that $\sqrt{3}$ is irrational.

2. Solve $|x - 2| + |x + 1| = 5$.

3. Show that for all $a, b \in \mathbb{R}$: $|a + b|^2 + |a - b|^2 = 2(a^2 + b^2)$ (**parallelogram law**).

4. Find all $z \in \mathbb{C}$ such that $z^3 = 8$.

5. Prove that $|x| + |y| \leq |x+y| + |x-y|$ for all $x, y \in \mathbb{R}$.

### Solutions

**1.** Suppose $\sqrt{3} = p/q$ with $\gcd(p,q)=1$. Then $p^2 = 3q^2$, so $3 \mid p^2$, so $3 \mid p$ (since $3$ is prime). Write $p = 3k$. Then $9k^2 = 3q^2 \Rightarrow q^2 = 3k^2 \Rightarrow 3 \mid q$. Contradiction with $\gcd(p,q)=1$. $\blacksquare$

**2.** The expression $|x-2|+|x+1|$ is the sum of distances from $x$ to $2$ and $x$ to $-1$. Break into cases:
 - $x \geq 2$: $(x-2)+(x+1) = 2x - 1 = 5 \Rightarrow x = 3$. Valid.
 - $-1 \leq x < 2$: $(2-x)+(x+1) = 3 \neq 5$. No solution.
 - $x < -1$: $(2-x)+(-x-1) = -2x+1 = 5 \Rightarrow x = -2$. Valid.

Solutions: $x = 3$ or $x = -2$.

**3.** Expand:
$$|a+b|^2 = (a+b)^2 = a^2 + 2ab + b^2,$$
$$|a-b|^2 = (a-b)^2 = a^2 - 2ab + b^2.$$
Sum: $2a^2 + 2b^2 = 2(a^2+b^2)$. $\blacksquare$

**4.** Write $z = r e^{i\theta}$. Then $z^3 = r^3 e^{i3\theta} = 8 = 8 e^{i \cdot 2k\pi}$, giving $r = 2$ and $3\theta = 2k\pi \Rightarrow \theta = 2k\pi/3$ for $k = 0, 1, 2$. Roots:
$$z_0 = 2,\quad z_1 = 2e^{i 2\pi/3} = -1 + i\sqrt{3},\quad z_2 = 2e^{i 4\pi/3} = -1 - i\sqrt{3}.$$

**5.** Note $2x = (x+y) + (x-y)$ and $2y = (x+y) - (x-y)$. Triangle inequality:
$$2|x| = |(x+y)+(x-y)| \leq |x+y|+|x-y|,$$
$$2|y| = |(x+y)-(x-y)| \leq |x+y|+|x-y|.$$
Adding and dividing by $2$: $|x| + |y| \leq |x+y| + |x-y|$. $\blacksquare$

---

## Related Topics
- [[02-inequalities]] — Cauchy-Schwarz, Hölder, Minkowski build on the absolute value
- [[03-supremum-and-infimum]] — the LUB axiom made explicit
- [[04-sets-finite-countable-uncountable]] — $|\mathbb{Q}| \neq |\mathbb{R}|$ explained
- [[08-sequences-introduction]] — the real number system is the habitat of sequences
