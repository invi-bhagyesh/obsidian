# 6. CO1 Practice Problems — Real Numbers, Inequalities, Suprema, Cardinality, Topology

These problems cover the content of CO1 (Lessons 1-7 in the course plan):
- Field and order axioms of $\mathbb{R}$
- Inequalities: AM-GM, Cauchy-Schwarz, Young, Hölder, Minkowski
- Sup/inf, LUB, Archimedean property, density
- Countable vs uncountable sets
- Open, closed, compact sets

Each problem is followed by a complete solution with cross-references to the relevant content lessons.

---

## Part A: Field Axioms, Order Axioms, Absolute Value

### Problem A1
Prove directly from the field axioms that, for any $x \in \mathbb{R}$, $0 \cdot x = 0$.

**Solution.** By the additive identity axiom, $0 = 0 + 0$. Multiply both sides by $x$:
$$0 \cdot x = (0 + 0) \cdot x = 0 \cdot x + 0 \cdot x \quad \text{(distributivity)}.$$
Subtract $0 \cdot x$ from both sides: $0 = 0 \cdot x$. $\blacksquare$

([[01-real-number-system]])

---

### Problem A2
Prove that $|x - y| \geq \big| |x| - |y| \big|$ for all $x, y \in \mathbb{R}$ (the reverse triangle inequality).

**Solution.** Apply triangle inequality to $x = (x - y) + y$: $|x| \leq |x - y| + |y|$, hence $|x| - |y| \leq |x - y|$. Swap: $|y| - |x| \leq |y - x| = |x - y|$. So $\big||x| - |y|\big| \leq |x - y|$. $\blacksquare$

([[01-real-number-system]])

---

### Problem A3
Show that for any $x \in \mathbb{R}$ and any $\varepsilon > 0$: $|x| < \varepsilon$ iff $-\varepsilon < x < \varepsilon$.

**Solution.** $(⇒)$ $|x| < \varepsilon$ means $x \leq |x| < \varepsilon$ and $-x \leq |x| < \varepsilon$, i.e., $x > -\varepsilon$. So $-\varepsilon < x < \varepsilon$. $(⇐)$ Conversely, $-\varepsilon < x < \varepsilon$ gives $|x| = \max(x, -x) < \varepsilon$. $\blacksquare$

([[01-real-number-system]])

---

## Part B: Inequalities

### Problem B1
Prove that for positive $a, b, c$: $(a + b)(b + c)(c + a) \geq 8abc$.

**Solution.** By AM-GM on each factor: $a + b \geq 2\sqrt{ab}$, $b + c \geq 2\sqrt{bc}$, $c + a \geq 2\sqrt{ca}$. Multiplying:
$$(a+b)(b+c)(c+a) \geq 8 \sqrt{ab \cdot bc \cdot ca} = 8 \sqrt{a^2 b^2 c^2} = 8abc. \ \blacksquare$$

Equality iff $a = b = c$. ([[02-inequalities]])

---

### Problem B2
Use Cauchy-Schwarz to prove: for positive $a_1, \ldots, a_n$,
$$\left(\sum_{i=1}^{n} a_i\right)\left(\sum_{i=1}^{n} \frac{1}{a_i}\right) \geq n^2.$$

**Solution.** Cauchy-Schwarz on $b_i = \sqrt{a_i}$ and $c_i = 1/\sqrt{a_i}$:
$$\left(\sum b_i c_i\right)^2 \leq \left(\sum b_i^2\right)\left(\sum c_i^2\right) = \left(\sum a_i\right)\left(\sum \frac{1}{a_i}\right).$$
But $\sum b_i c_i = \sum 1 = n$, so $n^2 \leq (\sum a_i)(\sum 1/a_i)$. Equality iff all $a_i$ equal. $\blacksquare$

([[02-inequalities]])

---

### Problem B3
Use the AM-GM inequality to prove: for positive $x$, $x + \dfrac{1}{x} \geq 2$, with equality iff $x = 1$.

**Solution.** AM-GM on $x$ and $1/x$: $\dfrac{x + 1/x}{2} \geq \sqrt{x \cdot 1/x} = 1$. So $x + 1/x \geq 2$. Equality iff $x = 1/x$, i.e., $x = 1$ (since $x > 0$). $\blacksquare$

([[02-inequalities]])

---

### Problem B4
For $p > 1$ and positive reals $a, b$, use Young's inequality to prove:
$$ab \leq \frac{a^p}{p} + \frac{b^q}{q}, \qquad \frac{1}{p} + \frac{1}{q} = 1.$$

**Solution.** By concavity of $\ln$: $\ln(\frac{a^p}{p} + \frac{b^q}{q}) \geq \frac{1}{p} \ln a^p + \frac{1}{q} \ln b^q = \ln a + \ln b = \ln(ab)$. Exponentiating: $\frac{a^p}{p} + \frac{b^q}{q} \geq ab$. $\blacksquare$

([[02-inequalities]])

---

## Part C: Supremum and Infimum

### Problem C1
Let $S = \{1 - 1/n : n \in \mathbb{N}\}$. Find $\sup S$ and $\inf S$. Does $S$ contain its sup? Its inf?

**Solution.** For $n = 1$: $1 - 1 = 0$. For $n = 2$: $1/2$. As $n$ increases, $1 - 1/n \to 1$. So all elements are in $[0, 1)$, and values get arbitrarily close to 1.

$\inf S = 0 \in S$ (attained at $n = 1$).
$\sup S = 1 \notin S$ (strictly less than 1 for every $n$).

([[03-supremum-and-infimum]])

---

### Problem C2
Let $A$ and $B$ be nonempty bounded subsets of $\mathbb{R}$ with $A \subset B$. Prove $\sup A \leq \sup B$ and $\inf A \geq \inf B$.

**Solution.** $\sup B$ is an upper bound of $B$, hence of $A$; so $\sup A \leq \sup B$. Similarly $\inf B$ is a lower bound of $B$, hence of $A$; so $\inf B \leq \inf A$. $\blacksquare$

([[03-supremum-and-infimum]])

---

### Problem C3
Let $A = \{a_n : n \in \mathbb{N}\}$ be the set of terms of the sequence $a_n = (-1)^n (1 - 1/n)$. Find $\sup A$, $\inf A$.

**Solution.** Even $n$: $a_n = 1 - 1/n \in [1/2, 1)$, approaching $1$.
Odd $n$: $a_n = -(1 - 1/n) \in (-1, -2/3]$, approaching $-1$.

$\sup A = 1$ (not attained), $\inf A = -1$ (not attained). $\blacksquare$

([[03-supremum-and-infimum]])

---

### Problem C4
Prove the **Archimedean property** directly from the LUB axiom: for any $x > 0$ and $y \in \mathbb{R}$, there exists $n \in \mathbb{N}$ with $nx > y$.

**Solution.** Suppose not: for some $x > 0, y$, $nx \leq y$ for all $n \in \mathbb{N}$. Then the set $\{nx : n \in \mathbb{N}\}$ is bounded above by $y$. By LUB axiom, $s = \sup \{nx\}$ exists. But $s - x < s$, so $s - x$ is not an upper bound: some $n$ with $nx > s - x$, i.e., $(n+1) x > s$, contradicting $s$ as upper bound. $\blacksquare$

([[03-supremum-and-infimum]])

---

## Part D: Countability

### Problem D1
Prove that $\mathbb{N} \times \mathbb{N}$ is countable.

**Solution.** Define $f : \mathbb{N} \times \mathbb{N} \to \mathbb{N}$ by $f(m, n) = 2^{m-1}(2n - 1)$. Every natural number has a unique representation $2^k \cdot \text{odd}$, so $f$ is a bijection. Alternatively, Cantor's pairing function $g(m, n) = (m + n - 2)(m + n - 1)/2 + m$. $\blacksquare$

([[04-sets-finite-countable-uncountable]])

---

### Problem D2
Prove that the set of all **finite** subsets of $\mathbb{N}$ is countable.

**Solution.** Let $\mathcal{F}_n$ denote the subsets of $\{1, \ldots, n\}$. $|\mathcal{F}_n| = 2^n$, finite. The set of all finite subsets of $\mathbb{N}$ is $\bigcup_n \mathcal{F}_n$, a countable union of finite (hence countable) sets, hence countable. $\blacksquare$

([[04-sets-finite-countable-uncountable]])

---

### Problem D3
Prove that the set of all algebraic numbers (roots of polynomials with integer coefficients) is countable.

**Solution.** Polynomials with integer coefficients correspond to finite tuples of integers, a countable set (countable product). Each polynomial has finitely many roots. So the set of algebraic numbers is a countable union of finite sets, hence countable. $\blacksquare$

([[04-sets-finite-countable-uncountable]])

---

### Problem D4
Use Cantor's diagonal argument to show the set of all infinite binary sequences is uncountable.

**Solution.** Suppose we have an enumeration $(s_1, s_2, \ldots)$ of all binary sequences. Each $s_k$ is a sequence $s_k = (s_k^1, s_k^2, \ldots)$ where $s_k^n \in \{0, 1\}$. Define $t = (t_1, t_2, \ldots)$ by $t_n = 1 - s_n^n$. Then $t$ differs from every $s_k$ (in the $k$-th position), so $t$ is not in the enumeration — contradiction. $\blacksquare$

([[04-sets-finite-countable-uncountable]])

---

## Part E: Open and Closed Sets

### Problem E1
Prove that the arbitrary intersection of closed sets is closed.

**Solution.** Let $\{F_\alpha\}$ be closed sets, and $F = \bigcap F_\alpha$. Then $F^c = \bigcup F_\alpha^c$ (De Morgan), and each $F_\alpha^c$ is open. Arbitrary union of open sets is open, so $F^c$ is open, hence $F$ is closed. $\blacksquare$

([[05-open-sets-closed-sets]])

---

### Problem E2
Find the interior, closure, and boundary of $A = [0, 1] \cup \{2\}$.

**Solution.**
- **Interior:** $A^\circ = (0, 1)$. (The point $2$ is isolated, no open neighbourhood in $A$.)
- **Closure:** $\overline{A} = [0, 1] \cup \{2\}$. (Already closed: no new limit points.)
- **Boundary:** $\partial A = \{0, 1, 2\}$.

([[05-open-sets-closed-sets]])

---

### Problem E3
Show that a set $E \subset \mathbb{R}$ is closed iff it contains all its limit points.

**Solution.** $(\Rightarrow)$ If $E$ is closed and $a$ is a limit point of $E$, then every neighbourhood of $a$ meets $E$. So $a \in \overline{E} = E$.

$(\Leftarrow)$ If $E$ contains all its limit points, $\overline{E} = E \cup \{\text{limit points of } E\} = E$, so $E$ is closed. $\blacksquare$

([[05-open-sets-closed-sets]])

---

### Problem E4
Prove that a set $E$ is **open** iff for every $x \in E$ there exists $r > 0$ with $B(x, r) \subset E$.

**Solution.** The given condition is the definition of open set. (Every point is an interior point.) $\blacksquare$

([[05-open-sets-closed-sets]])

---

## Part F: Compact Sets

### Problem F1
Prove that $[0, 1]$ is compact using the Heine-Borel theorem.

**Solution.** $[0, 1]$ is closed (contains all its limit points; complement is open) and bounded. By Heine-Borel (Theorem 7.3 in [[07-compact-sets]]), it is compact. $\blacksquare$

---

### Problem F2
Show that the set $\{1/n : n \in \mathbb{N}\} \cup \{0\}$ is compact, but $\{1/n : n \in \mathbb{N}\}$ (without $0$) is not.

**Solution.**

**With 0:** Let $S = \{1/n\} \cup \{0\}$. It is bounded (inside $[0, 1]$). It is closed: every limit point sequence $1/n_k$ converges to $0 \in S$ (no other limit points). By Heine-Borel, compact.

**Without 0:** $T = \{1/n\}$. It is bounded but **not closed**: $0$ is a limit point but $0 \notin T$. So $T$ is not compact. Alternatively: the cover $\{(1/(n+1), 2/n) : n \in \mathbb{N}\}$ of $T$ has no finite subcover. $\blacksquare$

([[07-compact-sets]])

---

### Problem F3
Let $K$ be compact and $F$ closed, with $K \subset \mathbb{R}$, $F \subset \mathbb{R}$. Show $K \cap F$ is compact.

**Solution.** $K \cap F$ is closed (intersection of closed sets). It is bounded (subset of $K$, which is bounded). By Heine-Borel, compact. $\blacksquare$

([[07-compact-sets]])

---

### Problem F4
Prove the **Bolzano-Weierstrass theorem**: every bounded infinite subset of $\mathbb{R}$ has a limit point.

**Solution.** Let $E \subset [-M, M]$ be infinite. $[-M, M]$ is compact. Suppose $E$ has no limit point: then for every $x \in [-M, M]$ there is a neighbourhood $U_x$ containing at most one point of $E$ (the point $x$ itself, if it's in $E$). The $\{U_x\}$ form an open cover of $[-M, M]$; compactness gives a finite subcover $\{U_{x_1}, \ldots, U_{x_n}\}$. But each $U_{x_i}$ contains at most one point of $E$, so $|E| \leq n$ — contradicting $E$ infinite. So $E$ has a limit point. $\blacksquare$

([[07-compact-sets]])

---

## Part G: Mixed / Challenging

### Problem G1
Show that between any two real numbers there are infinitely many rationals **and** infinitely many irrationals.

**Solution.** Fix $a < b$. By density of $\mathbb{Q}$ ([[03-supremum-and-infimum]]), pick $r_1 \in \mathbb{Q} \cap (a, b)$. Apply density again to $(a, r_1)$: pick $r_2 \in \mathbb{Q} \cap (a, r_1)$. Continue: infinitely many distinct rationals.

For irrationals: $\mathbb{Q} + \sqrt{2}$ is dense (since $\mathbb{Q}$ is dense); its elements are irrational. Apply the same density argument. $\blacksquare$

---

### Problem G2
Prove: if $S \subset \mathbb{R}$ is a nonempty set with $\sup S = M$, then for every $n \in \mathbb{N}$ there is $x_n \in S$ with $M - 1/n < x_n \leq M$.

**Solution.** $M - 1/n < M$, so $M - 1/n$ is not an upper bound (since $M$ is the least upper bound). So some $x_n \in S$ with $x_n > M - 1/n$. Also $x_n \leq M$. $\blacksquare$

([[03-supremum-and-infimum]])

---

### Problem G3
Prove that the Cantor set $C$ (constructed by repeatedly removing middle thirds from $[0, 1]$) is compact, uncountable, and has empty interior.

**Solution sketch.**

**Compact.** Each stage of construction leaves a closed set (finite union of closed intervals). $C$ is the intersection, hence closed. Bounded in $[0, 1]$. Heine-Borel: compact.

**Uncountable.** Every element of $C$ has a base-3 expansion using only digits 0 and 2. This gives an injection into the set of $\{0, 2\}$-sequences, which is uncountable (Cantor diagonal).

**Empty interior.** Each stage removes open middle thirds; any interval $(a, b) \subset [0, 1]$ eventually has a middle third removed. So no open interval fits in $C$; interior is empty. $\blacksquare$

---

### Problem G4
Show that $[0, 1]$ is **uncountable**.

**Solution.** Suppose countable: $[0, 1] = \{x_1, x_2, \ldots\}$. Each $x_n$ has a decimal expansion $x_n = 0.d_1^n d_2^n \ldots$. Define $y = 0.e_1 e_2 \ldots$ with $e_n = 1$ if $d_n^n \neq 1$ and $e_n = 2$ if $d_n^n = 1$. Then $y \in [0, 1]$ but $y \neq x_n$ (differs at position $n$). Contradiction. $\blacksquare$

([[04-sets-finite-countable-uncountable]])

---

### Problem G5
Let $f : A \to B$ be injective with $B$ countable. Prove $A$ is countable.

**Solution.** $f : A \to f(A) \subset B$ is a bijection. $f(A)$ is a subset of a countable set, hence countable. So $A$ is countable. $\blacksquare$

([[04-sets-finite-countable-uncountable]])

---

## Summary

| Problem Topic | Key lesson | Core technique |
|---|---|---|
| A1-A3 | [[01-real-number-system]] | Field/order axioms, triangle inequality |
| B1-B4 | [[02-inequalities]] | AM-GM, Cauchy-Schwarz, Young |
| C1-C4 | [[03-supremum-and-infimum]] | Supremum ε-characterisation, LUB, Archimedean |
| D1-D4 | [[04-sets-finite-countable-uncountable]] | Bijections, pairing, countable union, Cantor diagonal |
| E1-E4 | [[05-open-sets-closed-sets]] | De Morgan, limit points, interior/closure |
| F1-F4 | [[07-compact-sets]] | Heine-Borel, finite subcovers, Bolzano-Weierstrass |

These problems should build fluency with the foundational topological and order-theoretic tools used throughout the rest of the course.

---

## Related Topics

- [[01-real-number-system]] through [[07-compact-sets]] — CO1 content lessons
- [[08-sequences-introduction]] — next unit (CO2) builds on these foundations
