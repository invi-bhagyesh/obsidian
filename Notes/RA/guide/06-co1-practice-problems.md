# 6. CO1 Practice Problems — Real Numbers, Inequalities, Suprema, Cardinality, Topology

> **Scope.** Problems for **CO1** (Lessons 1–7): field/order axioms of $\mathbb{R}$, classical inequalities (AM-GM, Cauchy-Schwarz, Young, Hölder, Minkowski), supremum/infimum, the LUB axiom and Archimedean property, countable versus uncountable sets, and the topology of $\mathbb{R}$ (open, closed, compact sets).
>
> **Prerequisites:** [[01-real-number-system]] through [[07-compact-sets]].
>
> **Format.** Each worked solution follows the pattern **Setup → Strategy → Computation → Verification → Interpretation**. Every step is justified; no inequality is asserted without proof.

---

## Part A: Field Axioms, Order Axioms, Absolute Value

### Problem A1
Prove directly from the field axioms that, for any $x \in \mathbb{R}$, $0 \cdot x = 0$.

**Solution.**

**Setup.** We are given the field axioms for $(\mathbb{R}, +, \cdot)$ — associativity and commutativity of both operations, existence of additive identity $0$ and multiplicative identity $1$, existence of additive inverses $-a$ and (for $a \neq 0$) multiplicative inverses $a^{-1}$, and distributivity $a(b + c) = ab + ac$. We must prove $0 \cdot x = 0$ for every $x \in \mathbb{R}$ using *only* these axioms — we cannot assume any prior arithmetic facts, because "zero times anything equals zero" is one of the first consequences of the axioms that must be established.

**Strategy.** The crux is the identity $0 = 0 + 0$, which is the additive identity law applied to $0$ itself. Multiplying this equation by $x$ and applying distributivity produces an equation containing $0 \cdot x$ on both sides, which we can manipulate using the cancellation consequence of the existence of additive inverses.

**Step 1 — Use the additive identity axiom on $0$.** The additive identity axiom states $a + 0 = a$ for every $a$. Taking $a = 0$ yields
$$0 + 0 = 0.$$

**Step 2 — Multiply both sides by $x$.** Since equals multiplied by equals give equals (a logical consequence of the equality relation on the field, not an independent axiom),
$$(0 + 0) \cdot x = 0 \cdot x.$$

**Step 3 — Apply the right distributive law.** Distributivity gives $(a + b) \cdot c = a \cdot c + b \cdot c$. With $a = b = 0$ and $c = x$:
$$(0 + 0) \cdot x = 0 \cdot x + 0 \cdot x.$$
Combining Steps 2 and 3,
$$0 \cdot x + 0 \cdot x = 0 \cdot x. \tag{$*$}$$

**Step 4 — Cancel one copy of $0 \cdot x$ from both sides.** Let $y = 0 \cdot x$. Equation ($*$) reads $y + y = y$. Add the additive inverse $-y$ (which exists by the inverse axiom) to both sides:
$$(y + y) + (-y) = y + (-y).$$
The left side, by associativity of $+$, equals $y + (y + (-y)) = y + 0 = y$. The right side equals $0$. Hence
$$y = 0, \qquad \text{i.e.,} \qquad 0 \cdot x = 0.$$

**Verification.** Plug $x = 1$: we conclude $0 \cdot 1 = 0$. Plug $x = -1$: $0 \cdot (-1) = 0$. The proof used no hidden assumptions about the real numbers beyond the ten field axioms (the same argument works in any ring with unity).

**Interpretation.** This "absorbing" property of $0$ under multiplication is *not* built into the multiplicative axioms — it must be *derived* from the interaction of multiplication with addition via distributivity. The proof illustrates a recurring technique in axiomatic algebra: express a quantity as a self-referential equation ($y + y = y$) using distributivity, then cancel via additive inverses. $\blacksquare$

([[01-real-number-system]])

---

### Problem A2
Prove that $|x - y| \geq \big| |x| - |y| \big|$ for all $x, y \in \mathbb{R}$ (the reverse triangle inequality).

**Solution.**

**Setup.** We assume the (standard) triangle inequality $|a + b| \leq |a| + |b|$, valid for all $a, b \in \mathbb{R}$, and the basic properties of absolute value: $|a| \geq 0$, $|a| = 0 \iff a = 0$, and $|-a| = |a|$. Our goal is the reverse estimate, which bounds $|x - y|$ *below* by $\big||x| - |y|\big|$.

**Strategy.** We will write $x$ as $(x - y) + y$, apply the triangle inequality, and rearrange. The key realization is that the inequality is symmetric in $x$ and $y$ (after taking absolute values of the difference), so we prove two one-sided inequalities and combine.

**Step 1 — Express $x$ using $x - y$.** Trivially,
$$x = (x - y) + y.$$

**Step 2 — Apply the triangle inequality.**
$$|x| = |(x - y) + y| \leq |x - y| + |y|.$$
Subtract $|y|$ from both sides (a legal operation on real numbers):
$$|x| - |y| \leq |x - y|. \tag{1}$$

**Step 3 — Swap the roles of $x$ and $y$.** By exactly the same argument, writing $y = (y - x) + x$:
$$|y| - |x| \leq |y - x|.$$
Since $|y - x| = |-(x - y)| = |x - y|$, this becomes
$$|y| - |x| \leq |x - y|. \tag{2}$$

**Step 4 — Combine (1) and (2).** The quantity $\big||x| - |y|\big|$ equals either $|x| - |y|$ or $|y| - |x|$, whichever is non-negative. In either case, one of (1) or (2) yields directly
$$\big| |x| - |y| \big| = \max\{|x| - |y|, \; |y| - |x|\} \leq |x - y|.$$

**Verification.**
- Take $x = 5$, $y = 3$: LHS $= |5 - 3| = 2$, RHS $= \big||5| - |3|\big| = 2$. Equality holds (same sign).
- Take $x = 5$, $y = -3$: LHS $= |5 - (-3)| = 8$, RHS $= \big||5| - |-3|\big| = 2$. Inequality is strict (opposite signs).
- Take $x = y$: both sides are $0$.

**Interpretation.** The reverse triangle inequality controls how the modulus $|x|$ changes when $x$ is perturbed. It shows that the function $f(x) = |x|$ is **$1$-Lipschitz**: $\big|f(x) - f(y)\big| \leq |x - y|$, a fact that will be crucial when we discuss continuity of $|\cdot|$ later. Equality holds precisely when $x$ and $y$ have the same sign (or one of them is $0$). $\blacksquare$

([[01-real-number-system]])

---

### Problem A3
Show that for any $x \in \mathbb{R}$ and any $\varepsilon > 0$: $|x| < \varepsilon$ iff $-\varepsilon < x < \varepsilon$.

**Solution.**

**Setup.** The absolute value is defined piecewise: $|x| = x$ if $x \geq 0$ and $|x| = -x$ if $x < 0$. Equivalently, $|x| = \max\{x, -x\}$. We must prove a biconditional, so the argument splits into $(\Rightarrow)$ and $(\Leftarrow)$.

**Strategy.** Use the $\max$ characterization. The condition $\max\{x, -x\} < \varepsilon$ is equivalent to *both* $x < \varepsilon$ and $-x < \varepsilon$ (the second being the same as $x > -\varepsilon$).

**Step 1 — Forward direction $(\Rightarrow)$.** Suppose $|x| < \varepsilon$. By definition, $x \leq \max\{x, -x\} = |x| < \varepsilon$, so $x < \varepsilon$. Similarly, $-x \leq \max\{x, -x\} = |x| < \varepsilon$, so $-x < \varepsilon$, i.e.,
$$x > -\varepsilon.$$
Combining: $-\varepsilon < x < \varepsilon$.

**Step 2 — Converse direction $(\Leftarrow)$.** Suppose $-\varepsilon < x < \varepsilon$. Then $x < \varepsilon$ and $-x < \varepsilon$ (the latter from $x > -\varepsilon$ by multiplying by $-1$, which reverses the inequality). Hence
$$|x| = \max\{x, -x\} < \varepsilon,$$
because the maximum of two quantities each less than $\varepsilon$ is itself less than $\varepsilon$.

**Verification.**
- $x = 0.5$, $\varepsilon = 1$: $|0.5| = 0.5 < 1$ ✓, and $-1 < 0.5 < 1$ ✓.
- $x = -0.5$, $\varepsilon = 1$: $|-0.5| = 0.5 < 1$ ✓, and $-1 < -0.5 < 1$ ✓.
- Boundary case $x = 1$, $\varepsilon = 1$: $|1| = 1 \not< 1$ and $1 \not< 1$, so both sides fail — consistent with the iff.

**Interpretation.** This lemma is the reason $\varepsilon$-arguments in real analysis can be phrased interchangeably as $|x - a| < \varepsilon$ or $a - \varepsilon < x < a + \varepsilon$. The inequality $|x| < \varepsilon$ precisely says "$x$ lies in the open interval $(-\varepsilon, \varepsilon)$ centered at $0$". The analogous statement with $\leq$ gives a closed interval $[-\varepsilon, \varepsilon]$. $\blacksquare$

([[01-real-number-system]])

---

## Part B: Inequalities

### Problem B1
Prove that for positive $a, b, c$: $(a + b)(b + c)(c + a) \geq 8abc$.

**Solution.**

**Setup.** AM-GM for two positive reals says $\dfrac{u + v}{2} \geq \sqrt{uv}$, i.e., $u + v \geq 2\sqrt{uv}$, with equality iff $u = v$. We have three sums $a+b, b+c, c+a$ of pairs of positives, and we want to bound their product from below by $8abc$.

**Strategy.** Apply AM-GM separately to each of the three binomial factors, multiply the resulting inequalities (multiplication preserves inequalities between positives), and simplify the right-hand radical.

**Step 1 — AM-GM on each factor.** Since $a, b, c > 0$:
$$a + b \geq 2\sqrt{ab}, \qquad b + c \geq 2\sqrt{bc}, \qquad c + a \geq 2\sqrt{ca}. \tag{1}$$
Each factor on the left is positive, each factor on the right is positive. Equality in the $i$-th inequality holds iff the two summands are equal.

**Step 2 — Multiply the three inequalities.** Because all quantities are positive, we may multiply them term by term (multiplying inequalities between positives preserves direction):
$$(a+b)(b+c)(c+a) \geq \left(2\sqrt{ab}\right)\left(2\sqrt{bc}\right)\left(2\sqrt{ca}\right) = 8 \sqrt{ab \cdot bc \cdot ca}.$$

**Step 3 — Simplify the radicand.**
$$ab \cdot bc \cdot ca = a^2 b^2 c^2 = (abc)^2,$$
so $\sqrt{ab \cdot bc \cdot ca} = |abc| = abc$ (since $a, b, c > 0$).

**Step 4 — Conclude.** Combining Steps 2 and 3:
$$(a+b)(b+c)(c+a) \geq 8 \cdot abc. \tag{$*$}$$

**Verification.**
- Equality case: each of the three AM-GM inequalities in Step 1 is tight iff $a = b$, $b = c$, $c = a$ respectively. All three hold simultaneously iff $a = b = c$. Testing: $a = b = c = 1$ gives LHS $= 2 \cdot 2 \cdot 2 = 8 = 8 \cdot 1 = $ RHS. ✓
- Strict case: $a = 1, b = 2, c = 3$ gives LHS $= 3 \cdot 5 \cdot 4 = 60$ and RHS $= 8 \cdot 6 = 48$. $60 \geq 48$ ✓, strict.

**Interpretation.** This is a clean illustration of the "multiplicative tensoring" trick: many symmetric inequalities can be obtained by applying AM-GM (or Cauchy-Schwarz) factor-by-factor and multiplying. The same method establishes the general cyclic inequality $\prod (a_i + a_{i+1}) \geq 2^n \prod a_i$ for positive $a_1, \ldots, a_n$. $\blacksquare$

([[02-inequalities]])

---

### Problem B2
Use Cauchy-Schwarz to prove: for positive $a_1, \ldots, a_n$,
$$\left(\sum_{i=1}^{n} a_i\right)\left(\sum_{i=1}^{n} \frac{1}{a_i}\right) \geq n^2.$$

**Solution.**

**Setup.** The Cauchy-Schwarz inequality states: for real numbers $b_1, \ldots, b_n$ and $c_1, \ldots, c_n$,
$$\left(\sum_{i=1}^{n} b_i c_i\right)^2 \leq \left(\sum_{i=1}^{n} b_i^2\right)\left(\sum_{i=1}^{n} c_i^2\right),$$
with equality iff the vectors $(b_i)$ and $(c_i)$ are proportional.

**Strategy.** The right-hand side of our target inequality contains $\sum a_i$ and $\sum 1/a_i$, which match $\sum b_i^2$ and $\sum c_i^2$ if we set $b_i = \sqrt{a_i}$ and $c_i = 1/\sqrt{a_i}$. Then the inner product $\sum b_i c_i$ telescopes to $n$, giving a perfect square on the left.

**Step 1 — Choose the vectors.** For $i = 1, \ldots, n$, define
$$b_i := \sqrt{a_i} \quad (>0), \qquad c_i := \frac{1}{\sqrt{a_i}} \quad (>0).$$
These are well-defined since each $a_i > 0$.

**Step 2 — Compute $\sum b_i^2$ and $\sum c_i^2$.**
$$\sum_{i=1}^{n} b_i^2 = \sum_{i=1}^{n} a_i, \qquad \sum_{i=1}^{n} c_i^2 = \sum_{i=1}^{n} \frac{1}{a_i}.$$

**Step 3 — Compute $\sum b_i c_i$.**
$$b_i c_i = \sqrt{a_i} \cdot \frac{1}{\sqrt{a_i}} = 1,$$
so $\sum_{i=1}^{n} b_i c_i = n$.

**Step 4 — Apply Cauchy-Schwarz.**
$$\underbrace{\left(\sum b_i c_i\right)^2}_{= n^2} \leq \underbrace{\left(\sum b_i^2\right)}_{= \sum a_i} \underbrace{\left(\sum c_i^2\right)}_{= \sum 1/a_i},$$
i.e., $n^2 \leq \left(\sum a_i\right)\left(\sum 1/a_i\right)$.

**Step 5 — Equality condition.** Equality in Cauchy-Schwarz holds iff $(b_i)$ and $(c_i)$ are proportional: $c_i = \lambda b_i$ for all $i$, i.e., $1/\sqrt{a_i} = \lambda \sqrt{a_i}$, i.e., $a_i = 1/\lambda$ for all $i$. Thus all $a_i$ are equal.

**Verification.**
- $n = 2$, $a_1 = 1, a_2 = 4$: LHS $= 5 \cdot (1 + 1/4) = 5 \cdot 5/4 = 25/4$, RHS $= 4$. $25/4 = 6.25 \geq 4$ ✓.
- $n = 3$, $a_1 = a_2 = a_3 = 2$: LHS $= 6 \cdot (3/2) = 9 = n^2$. Equality ✓ (all $a_i$ equal).

**Interpretation.** This is a ubiquitous inequality sometimes called the **Cauchy-Schwarz inequality in Engel form** or the **harmonic-mean–arithmetic-mean (HM-AM) inequality**: rearranging yields $\dfrac{\sum a_i}{n} \geq \dfrac{n}{\sum 1/a_i}$, i.e., AM $\geq$ HM. It is the foundation of many bounds for convex functionals and resistor networks in physics. $\blacksquare$

([[02-inequalities]])

---

### Problem B3
Use the AM-GM inequality to prove: for positive $x$, $x + \dfrac{1}{x} \geq 2$, with equality iff $x = 1$.

**Solution.**

**Setup.** AM-GM for two positive reals $u, v$: $\dfrac{u + v}{2} \geq \sqrt{uv}$ with equality iff $u = v$. We apply this to $u = x$ and $v = 1/x$.

**Strategy.** Apply AM-GM directly; the product $x \cdot (1/x) = 1$ makes the right-hand side a constant, which collapses the inequality to a comparison with $2$.

**Step 1 — Apply AM-GM with $u = x$, $v = 1/x$.** Both are positive (as $x > 0$). Hence
$$\frac{x + 1/x}{2} \geq \sqrt{x \cdot \frac{1}{x}} = \sqrt{1} = 1.$$

**Step 2 — Multiply both sides by $2$.**
$$x + \frac{1}{x} \geq 2.$$

**Step 3 — Equality condition.** Equality in AM-GM holds iff $u = v$, i.e., $x = 1/x$, i.e., $x^2 = 1$. With the constraint $x > 0$, the unique solution is $x = 1$.

**Verification.**
- $x = 1$: $1 + 1 = 2 = 2$ ✓ (equality).
- $x = 2$: $2 + 0.5 = 2.5 \geq 2$ ✓.
- $x = 0.5$: $0.5 + 2 = 2.5 \geq 2$ ✓.
- Note symmetry under $x \leftrightarrow 1/x$: the function $f(x) = x + 1/x$ satisfies $f(x) = f(1/x)$.

**Interpretation.** The function $f(x) = x + 1/x$ on $(0, \infty)$ attains its minimum value $2$ at $x = 1$. Equivalently, this is the tangent-line inequality for the convex function $f$ at its minimum. Rearranged, $x^2 - 2x + 1 = (x - 1)^2 \geq 0$, which is another direct proof. $\blacksquare$

([[02-inequalities]])

---

### Problem B4
For $p > 1$ and positive reals $a, b$, use Young's inequality to prove:
$$ab \leq \frac{a^p}{p} + \frac{b^q}{q}, \qquad \frac{1}{p} + \frac{1}{q} = 1.$$

**Solution.**

**Setup.** The exponent $q$ is called the *conjugate exponent* of $p$: from $1/p + 1/q = 1$, we solve $q = p/(p-1)$. Since $p > 1$, also $q > 1$. The claim is an analytic refinement of AM-GM in which the weights $1/p$ and $1/q$ are tailored to the exponents.

**Strategy.** We use the concavity of the logarithm. A concave function $\varphi$ satisfies
$$\varphi(\lambda u + (1-\lambda) v) \geq \lambda \varphi(u) + (1-\lambda) \varphi(v), \qquad \lambda \in [0,1].$$
The logarithm is concave on $(0, \infty)$ (since $(\ln x)'' = -1/x^2 < 0$). Apply concavity with $\lambda = 1/p$, $1 - \lambda = 1/q$, $u = a^p$, $v = b^q$.

**Step 1 — Verify the conjugate relation.** $1/p + 1/q = 1$ by hypothesis, so $\lambda = 1/p$ and $1 - \lambda = 1/q$ are valid convex-combination weights in $[0, 1]$.

**Step 2 — Apply concavity of $\ln$.** Let $u = a^p > 0$ and $v = b^q > 0$. Concavity gives
$$\ln\left(\frac{1}{p} \cdot a^p + \frac{1}{q} \cdot b^q\right) \geq \frac{1}{p} \ln(a^p) + \frac{1}{q} \ln(b^q).$$

**Step 3 — Simplify the right-hand side.** Using $\ln(x^r) = r \ln x$:
$$\frac{1}{p} \ln(a^p) + \frac{1}{q} \ln(b^q) = \frac{1}{p} \cdot p \ln a + \frac{1}{q} \cdot q \ln b = \ln a + \ln b = \ln(ab).$$

**Step 4 — Exponentiate.** Since $\exp$ is strictly increasing, the inequality $\ln X \geq \ln Y$ (for $X, Y > 0$) is equivalent to $X \geq Y$. Hence
$$\frac{a^p}{p} + \frac{b^q}{q} \geq ab. \tag{$*$}$$

**Step 5 — Equality condition.** Concavity of $\ln$ is strict on $(0, \infty)$ ($\ln$ is strictly concave); strict concavity gives equality iff $u = v$, i.e., $a^p = b^q$.

**Verification.**
- $p = q = 2$: $ab \leq a^2/2 + b^2/2$, i.e., $2ab \leq a^2 + b^2$, i.e., $(a-b)^2 \geq 0$ ✓.
- $p = 3, q = 3/2, a = b = 1$: LHS $= 1$, RHS $= 1/3 + 2/3 = 1$. Equality ✓ (consistent: $a^3 = 1 = b^{3/2}$).
- $p = 4, q = 4/3, a = 2, b = 1$: LHS $= 2$, RHS $= 16/4 + 1/(4/3) = 4 + 3/4 = 4.75$. $2 \leq 4.75$ ✓.

**Interpretation.** Young's inequality is the bedrock of the theory of $L^p$ spaces: it implies Hölder's inequality (which generalizes Cauchy-Schwarz from $p = 2$ to all conjugate pairs) and, via summation, Minkowski's triangle inequality for $\|\cdot\|_p$-norms. The geometric picture: the curve $y = x^{p-1}$ bounds two regions whose areas are $a^p/p$ and $b^q/q$, and together they cover the rectangle $[0, a] \times [0, b]$ of area $ab$. $\blacksquare$

([[02-inequalities]])

---

## Part C: Supremum and Infimum

### Problem C1
Let $S = \{1 - 1/n : n \in \mathbb{N}\}$. Find $\sup S$ and $\inf S$. Does $S$ contain its sup? Its inf?

**Solution.**

**Setup.** $\mathbb{N} = \{1, 2, 3, \ldots\}$ (convention; the argument adjusts easily if one prefers $\mathbb{N}$ to include $0$). Writing out the first few elements:
$$n = 1: \ 1 - 1 = 0, \quad n = 2: \ 1/2, \quad n = 3: \ 2/3, \quad n = 4: \ 3/4, \quad \ldots$$

**Strategy.** Identify candidates for $\sup$ and $\inf$ by inspection, then verify that each candidate (i) is an upper (resp. lower) bound and (ii) is the *least* upper bound (resp. *greatest* lower bound) using the $\varepsilon$-characterization.

**Step 1 — Show $\inf S = 0$.** First, $0 \in S$ (at $n = 1$), so $0$ is a lower bound only if $0 \leq s$ for all $s \in S$. For $n \geq 1$, $1/n \leq 1$, so $1 - 1/n \geq 0$. Thus $0$ is a lower bound. Since $0 \in S$ and $0$ is a lower bound, $0$ is the *minimum*, hence the *infimum*. $\inf S = 0$ and the infimum is attained.

**Step 2 — Show $\sup S = 1$.**

*(i) $1$ is an upper bound.* For all $n \geq 1$, $1/n > 0$, so $1 - 1/n < 1$. Hence $s < 1$ for all $s \in S$; in particular $s \leq 1$.

*(ii) $1$ is the least upper bound.* Let $M < 1$. We must find $s \in S$ with $s > M$. Equivalently, we need $n$ with
$$1 - \frac{1}{n} > M \iff \frac{1}{n} < 1 - M \iff n > \frac{1}{1 - M}.$$
Since $M < 1$, $1 - M > 0$, so $1/(1 - M) \in \mathbb{R}$. By the **Archimedean property** (Problem C4), there exists $n \in \mathbb{N}$ with $n > 1/(1 - M)$. For such $n$, $1 - 1/n > M$, showing $M$ is *not* an upper bound of $S$.

Conclusion: $\sup S = 1$.

**Step 3 — Does $S$ contain its sup?** Suppose $1 = 1 - 1/n$ for some $n$: then $1/n = 0$, impossible for $n \in \mathbb{N}$. Hence $1 \notin S$, the supremum is *not* attained.

**Verification.**
- $S \subset [0, 1)$: confirmed.
- Every $s \in S$ strictly less than $1$: confirmed.
- $S$ has infinitely many points, clustering at $1$: the distance from $1$ to the $n$-th term is $1/n \to 0$.

**Interpretation.** $S$ is a countable set with min $= 0$ (attained) but $\sup = 1$ (not attained). This illustrates the fundamental distinction: supremum is a *limit*, maximum is an *element*. The LUB axiom guarantees that such a supremum exists in $\mathbb{R}$ even when the set does not contain its supremum — a property that fails in $\mathbb{Q}$ (e.g., $\{q \in \mathbb{Q}_{>0} : q^2 < 2\}$ has no rational supremum). $\blacksquare$

([[03-supremum-and-infimum]])

---

### Problem C2
Let $A$ and $B$ be nonempty bounded subsets of $\mathbb{R}$ with $A \subset B$. Prove $\sup A \leq \sup B$ and $\inf A \geq \inf B$.

**Solution.**

**Setup.** By hypothesis $A$ and $B$ are both nonempty and bounded (above and below), so $\sup A, \sup B, \inf A, \inf B \in \mathbb{R}$ all exist by the LUB axiom (and its dual GLB).

**Strategy.** Use the *definitions*: $\sup B$ is an upper bound of $B$; since $A \subset B$, any upper bound of $B$ is automatically an upper bound of $A$; hence $\sup A$ (the *least* upper bound of $A$) is $\leq \sup B$. Dual argument for infima.

**Step 1 — $\sup A \leq \sup B$.**

*(a)* $\sup B$ is an upper bound of $B$: for every $b \in B$, $b \leq \sup B$.

*(b)* Since $A \subset B$, every $a \in A$ is also an element of $B$, so $a \leq \sup B$. Hence $\sup B$ is an upper bound of $A$.

*(c)* $\sup A$ is, *by definition*, the *least* of all upper bounds of $A$. Since $\sup B$ is *some* upper bound of $A$,
$$\sup A \leq \sup B. \qquad \checkmark$$

**Step 2 — $\inf A \geq \inf B$.**

*(a)* $\inf B$ is a lower bound of $B$: $b \geq \inf B$ for every $b \in B$.

*(b)* Since $A \subset B$, $a \geq \inf B$ for every $a \in A$. Hence $\inf B$ is a lower bound of $A$.

*(c)* $\inf A$ is the *greatest* lower bound of $A$, so $\inf A \geq \inf B$. $\checkmark$

**Verification.**
- $A = \{1, 2\}$, $B = \{0, 1, 2, 3\}$: $\sup A = 2, \sup B = 3$ — indeed $2 \leq 3$. $\inf A = 1, \inf B = 0$ — indeed $1 \geq 0$. ✓
- Degenerate case $A = B$: both inequalities become equalities. ✓

**Interpretation.** **Monotonicity of sup/inf with respect to set inclusion** is perhaps the most useful structural fact about bounds. It underpins the comparison principle in measure theory (outer measure is monotone), the squeeze theorem for limits, and the domination of partial sums in convergence tests. $\blacksquare$

([[03-supremum-and-infimum]])

---

### Problem C3
Let $A = \{a_n : n \in \mathbb{N}\}$ be the set of terms of the sequence $a_n = (-1)^n (1 - 1/n)$. Find $\sup A$, $\inf A$.

**Solution.**

**Setup.** Evaluate the first several terms to spot the pattern:
- $n = 1$: $(-1)(1 - 1) = 0$.
- $n = 2$: $(+1)(1 - 1/2) = 1/2$.
- $n = 3$: $(-1)(1 - 1/3) = -2/3$.
- $n = 4$: $(+1)(1 - 1/4) = 3/4$.
- $n = 5$: $(-1)(1 - 1/5) = -4/5$.
- $n = 6$: $(+1)(1 - 1/6) = 5/6$.

The sequence alternates sign; even-indexed terms increase toward $1$, odd-indexed terms decrease toward $-1$.

**Strategy.** Split $A$ into even and odd subsequences; find the sup/inf of each; combine.

**Step 1 — Analyze even $n$.** For $n = 2k$ with $k \geq 1$:
$$a_{2k} = 1 - \frac{1}{2k} \in \left[\frac{1}{2}, 1\right),$$
increasing in $k$ with limit $1$. The minimum of this subsequence is $a_2 = 1/2$, and the supremum is $1$ (not attained, by the argument of C1).

**Step 2 — Analyze odd $n$.** For $n = 2k - 1$ with $k \geq 1$:
$$a_{2k-1} = -\left(1 - \frac{1}{2k - 1}\right) \in (-1, 0],$$
decreasing in $k$ (i.e., getting more negative, since $1 - 1/(2k-1)$ increases toward $1$, so its negative decreases toward $-1$). The maximum of this subsequence is $a_1 = 0$, and the infimum is $-1$ (not attained).

**Step 3 — Compute $\sup A$.** The set of values is $\{\text{even terms}\} \cup \{\text{odd terms}\} \subset (-1, 1)$. The even subsequence has supremum $1$ (not attained), and no odd term exceeds $0$, so the overall supremum comes from the even terms:
$$\sup A = 1, \quad \text{not attained.}$$

To verify this is the supremum: $1$ is an upper bound (all $a_n < 1$); for any $M < 1$, pick $k$ with $1 - 1/(2k) > M$, giving $a_{2k} > M$.

**Step 4 — Compute $\inf A$.** Similarly, the odd subsequence has infimum $-1$ (not attained), and no even term is below $1/2 > -1$, so
$$\inf A = -1, \quad \text{not attained.}$$

**Verification.**
- Explicit check: $a_{10} = 1 - 1/10 = 0.9$; $a_{11} = -(1 - 1/11) = -10/11 \approx -0.909$.
- All terms lie in $(-1, 1)$: confirmed.
- For any $\varepsilon > 0$, there is $n$ with $a_n > 1 - \varepsilon$ (pick even $n$ large) and $n$ with $a_n < -1 + \varepsilon$ (pick odd $n$ large). ✓

**Interpretation.** $A$ accumulates at both $\pm 1$, so these are the extremes the set approaches without reaching. This is a prototype example of the **limit superior** and **limit inferior** of an oscillating sequence: $\limsup a_n = 1$, $\liminf a_n = -1$. The sequence diverges (has no ordinary limit) precisely because $\limsup \neq \liminf$. $\blacksquare$

([[03-supremum-and-infimum]])

---

### Problem C4
Prove the **Archimedean property** directly from the LUB axiom: for any $x > 0$ and $y \in \mathbb{R}$, there exists $n \in \mathbb{N}$ with $nx > y$.

**Solution.**

**Setup.** The LUB axiom says every nonempty subset of $\mathbb{R}$ that is bounded above has a least upper bound in $\mathbb{R}$. The Archimedean property says no real number dominates all integer multiples of a fixed positive number — intuitively, no positive real is "infinitesimally small" compared to $\mathbb{R}$.

**Strategy.** Proceed by contradiction. If the Archimedean property fails, then some $y$ bounds $\{nx : n \in \mathbb{N}\}$ above. Apply LUB to extract a supremum $s$, then produce a contradiction by showing $s - x$ is *also* an upper bound (violating the "least" property).

**Step 1 — Assume for contradiction.** Suppose there exist $x > 0, y \in \mathbb{R}$ such that
$$nx \leq y \quad \text{for all } n \in \mathbb{N}.$$
Define
$$S := \{nx : n \in \mathbb{N}\}.$$
Then $S$ is nonempty (contains $x$) and bounded above (by $y$).

**Step 2 — Apply LUB.** By the LUB axiom, $s := \sup S$ exists in $\mathbb{R}$ and satisfies $s \leq y$.

**Step 3 — Produce a smaller upper bound.** Since $x > 0$, $s - x < s$. By definition of supremum, $s - x$ is *not* an upper bound of $S$ (else $s$ would not be the *least* upper bound). So there exists some $n_0 \in \mathbb{N}$ with
$$n_0 x > s - x.$$

**Step 4 — Derive a contradiction.** Rearranging Step 3:
$$n_0 x + x > s \iff (n_0 + 1) x > s.$$
But $(n_0 + 1) \in \mathbb{N}$ (the natural numbers are closed under $+1$), so $(n_0 + 1) x \in S$. Having an element of $S$ strictly greater than $s = \sup S$ contradicts $s$ being an upper bound of $S$.

**Step 5 — Conclude.** The assumption in Step 1 is false, so for every $x > 0, y \in \mathbb{R}$, some $n \in \mathbb{N}$ has $nx > y$. $\blacksquare$

**Verification.**
- Contrapositive consequence: for any $\varepsilon > 0$, there exists $n \in \mathbb{N}$ with $1/n < \varepsilon$ (apply Archimedean to $x = \varepsilon$, $y = 1$: some $n$ with $n\varepsilon > 1$, i.e., $1/n < \varepsilon$). This is the version most often used in $\varepsilon$–$N$ proofs.
- The property fails in non-Archimedean ordered fields like $\mathbb{R}(\varepsilon)$ (ordered by leading coefficient), confirming that LUB is essential.

**Interpretation.** The Archimedean property is what distinguishes $\mathbb{R}$ from "exotic" fields containing infinitesimals. It is the quantitative content of the statement "$\mathbb{N}$ is unbounded in $\mathbb{R}$". Every useful limit computation in classical analysis relies on it, either directly (choosing $N$ with $1/N < \varepsilon$) or indirectly (through density of $\mathbb{Q}$, which follows from Archimedean). $\blacksquare$

([[03-supremum-and-infimum]])

---

## Part D: Countability

### Problem D1
Prove that $\mathbb{N} \times \mathbb{N}$ is countable.

**Solution.**

**Setup.** A set $X$ is *countable* if either $X$ is finite or there exists a bijection $f: \mathbb{N} \to X$ (equivalently, an injection $X \hookrightarrow \mathbb{N}$). We produce an explicit bijection $\mathbb{N} \times \mathbb{N} \to \mathbb{N}$.

**Strategy.** Two standard constructions, both explicit:
- **Odd-even decomposition:** Every positive integer $k$ has a *unique* factorization $k = 2^{m-1}(2n - 1)$ (with $m, n \in \mathbb{N}$): $m - 1$ is the $2$-adic valuation of $k$, and $2n - 1$ is the odd part. This gives a bijection $\mathbb{N} \times \mathbb{N} \to \mathbb{N}$.
- **Cantor's pairing function:** Diagonal enumeration $(m, n) \mapsto \binom{m+n-1}{2} + m$.

We present both.

**Method 1: Odd-even factorization.**

**Step 1 — Define $f$.** For $(m, n) \in \mathbb{N} \times \mathbb{N}$, set
$$f(m, n) := 2^{m - 1} (2n - 1).$$
Note $m \geq 1$, so $2^{m-1} \geq 1$; $n \geq 1$, so $2n - 1 \geq 1$. Hence $f(m, n) \geq 1$ and $f: \mathbb{N} \times \mathbb{N} \to \mathbb{N}$.

**Step 2 — Injectivity.** Every positive integer $k \in \mathbb{N}$ admits a *unique* decomposition $k = 2^a \cdot b$ with $a \geq 0$ and $b$ a positive odd integer (this is a basic fact of elementary number theory: $a$ is the largest power of $2$ dividing $k$). Setting $a = m - 1$ and $b = 2n - 1$ recovers $(m, n)$ uniquely from $k$. So $f$ is injective.

**Step 3 — Surjectivity.** Given $k \in \mathbb{N}$, perform the decomposition $k = 2^a \cdot b$ with $b$ odd, then set $m := a + 1$, $n := (b + 1)/2$. Both are positive integers, and $f(m, n) = 2^a \cdot b = k$.

Hence $f$ is a bijection, proving $\mathbb{N} \times \mathbb{N}$ is countable.

**Method 2: Cantor pairing.**

**Step 1 — Define $g$.** The Cantor pairing function is
$$g(m, n) := \frac{(m + n - 2)(m + n - 1)}{2} + m.$$
Geometrically, this enumerates points along successive anti-diagonals $m + n = 2, 3, 4, \ldots$: on anti-diagonal $d = m + n$, the $\binom{d-1}{2}$ pairs with smaller anti-diagonal have already been counted, and $(m, n)$ is the $m$-th element of its diagonal.

**Step 2 — Verify bijectivity.** One can check (i) injectivity by showing distinct $(m, n)$ yield distinct $g(m, n)$, and (ii) surjectivity by an inductive argument or by solving the quadratic $(m+n-1)(m+n-2)/2 = K$ for the diagonal index.

**Verification.**
- $f(1, 1) = 2^0 \cdot 1 = 1$; $f(1, 2) = 2^0 \cdot 3 = 3$; $f(2, 1) = 2^1 \cdot 1 = 2$; $f(2, 2) = 2^1 \cdot 3 = 6$. Distinct outputs. ✓
- $g(1, 1) = 0 \cdot 1/2 + 1 = 1$; $g(1, 2) = 1 \cdot 2/2 + 1 = 2$; $g(2, 1) = 1 \cdot 2/2 + 2 = 3$; $g(1, 3) = 2 \cdot 3/2 + 1 = 4$. Enumerating diagonally. ✓

**Interpretation.** Both constructions prove $|\mathbb{N} \times \mathbb{N}| = \aleph_0$ (the countable cardinal). More abstractly, this is the statement that a countable union of countable sets is countable: write $\mathbb{N} \times \mathbb{N} = \bigcup_{m=1}^\infty \{m\} \times \mathbb{N}$. The result extends by induction to $\mathbb{N}^k$ and is the key step in proving $|\mathbb{Q}| = \aleph_0$. $\blacksquare$

([[04-sets-finite-countable-uncountable]])

---

### Problem D2
Prove that the set of all **finite** subsets of $\mathbb{N}$ is countable.

**Solution.**

**Setup.** Let $\mathcal{F} := \{A \subset \mathbb{N} : A \text{ is finite}\}$. We want to show $|\mathcal{F}| = \aleph_0$.

**Strategy.** Stratify $\mathcal{F}$ by size. For each $N \geq 0$, let
$$\mathcal{F}_N := \{A \subset \{1, 2, \ldots, N\}\},$$
so $|\mathcal{F}_N| = 2^N$ (each element of $\{1, \ldots, N\}$ is independently either in $A$ or not). Then $\mathcal{F} = \bigcup_{N=0}^\infty \mathcal{F}_N$ because every finite subset of $\mathbb{N}$ has a maximum element, which bounds it in some initial segment $\{1, \ldots, N\}$.

**Step 1 — $\mathcal{F}_N$ is finite, hence countable.** $|\mathcal{F}_N| = 2^N < \infty$. Finite sets are countable by convention.

**Step 2 — Express $\mathcal{F}$ as a countable union of countable sets.**
$$\mathcal{F} = \bigcup_{N=0}^{\infty} \mathcal{F}_N.$$
The index set $\{0, 1, 2, \ldots\} = \mathbb{N} \cup \{0\}$ is countable.

**Step 3 — Apply the countable-union theorem.** A countable union of countable sets is countable (Theorem in [[04-sets-finite-countable-uncountable]]). Explicitly: enumerate each $\mathcal{F}_N$ as $\mathcal{F}_N = \{A_{N,1}, A_{N,2}, \ldots, A_{N, 2^N}\}$; then $\mathcal{F}$ has enumeration
$$A_{0,1}, \; A_{1,1}, A_{1,2}, \; A_{2,1}, \ldots, A_{2,4}, \; A_{3,1}, \ldots$$
which is a sequence, hence at most countable. Since $\mathcal{F}$ is infinite (it contains $\{1\}, \{2\}, \ldots$), it is exactly countable.

**Alternative explicit bijection.** Encode each finite $A = \{a_1 < a_2 < \cdots < a_k\} \subset \mathbb{N}$ as the integer $\sum_{i=1}^{k} 2^{a_i - 1}$ — i.e., the integer whose binary expansion has $1$'s precisely in positions $a_1 - 1, \ldots, a_k - 1$. This is a bijection $\mathcal{F} \to \mathbb{N}_0$ (non-negative integers).

**Verification.**
- $\emptyset \leftrightarrow 0$ ✓
- $\{1\} \leftrightarrow 2^0 = 1$ ✓
- $\{2\} \leftrightarrow 2^1 = 2$ ✓
- $\{1, 2\} \leftrightarrow 1 + 2 = 3$ ✓
- $\{3\} \leftrightarrow 2^2 = 4$ ✓

**Interpretation.** The argument contrasts sharply with the case of *all* (including infinite) subsets of $\mathbb{N}$, which has cardinality $2^{\aleph_0} = |\mathbb{R}| > \aleph_0$ (by Cantor's theorem, Problem D4). Restricting to finite subsets buys us countability because each finite subset is specified by finitely many bits of information. $\blacksquare$

([[04-sets-finite-countable-uncountable]])

---

### Problem D3
Prove that the set of all algebraic numbers (roots of polynomials with integer coefficients) is countable.

**Solution.**

**Setup.** A complex number $\alpha$ is *algebraic* if it is a root of some nonzero polynomial
$$p(x) = a_n x^n + a_{n-1} x^{n-1} + \cdots + a_1 x + a_0, \qquad a_i \in \mathbb{Z}, \; a_n \neq 0, \; n \geq 1.$$
Let $\mathcal{A}$ denote the set of all algebraic numbers. We want $|\mathcal{A}| = \aleph_0$.

**Strategy.** Decompose $\mathcal{A}$ as a countable union of *finite* sets (the roots of each individual polynomial), using that the set of polynomials $\mathbb{Z}[x]$ is itself countable.

**Step 1 — The set $\mathbb{Z}[x]$ of polynomials with integer coefficients is countable.**

For each $n \geq 0$, let $\mathbb{Z}[x]_n$ denote polynomials of degree $\leq n$. A degree-$\leq n$ polynomial is specified by its $(n+1)$ coefficients in $\mathbb{Z}$; hence
$$\mathbb{Z}[x]_n \leftrightarrow \mathbb{Z}^{n+1},$$
and $|\mathbb{Z}^{n+1}| = \aleph_0$ (by induction from $|\mathbb{Z} \times \mathbb{Z}| = \aleph_0$, which follows from Problem D1 since $|\mathbb{Z}| = \aleph_0$).

Now $\mathbb{Z}[x] = \bigcup_{n=0}^\infty \mathbb{Z}[x]_n$ is a countable union of countable sets, hence countable.

**Step 2 — Each polynomial has finitely many roots.** By the Fundamental Theorem of Algebra, a polynomial $p$ of degree $n \geq 1$ has exactly $n$ roots in $\mathbb{C}$ counted with multiplicity, hence *at most* $n$ distinct roots. In particular, for each nonzero $p \in \mathbb{Z}[x]$ of degree $n$, the root set $R(p) := \{\alpha \in \mathbb{C} : p(\alpha) = 0\}$ is finite with $|R(p)| \leq n$.

**Step 3 — Express $\mathcal{A}$ as a countable union of finite sets.**
$$\mathcal{A} = \bigcup_{\substack{p \in \mathbb{Z}[x] \\ p \neq 0}} R(p).$$
This is a union indexed by a countable set (by Step 1, removing the zero polynomial), each summand being finite (by Step 2).

**Step 4 — Apply the countable-union theorem.** A countable union of countable sets is countable. Since each $R(p)$ is finite (hence countable), $\mathcal{A}$ is countable.

**Step 5 — $\mathcal{A}$ is infinite.** It contains $\mathbb{Z}$ (every integer $m$ is a root of $x - m$), which is already infinite. Hence $|\mathcal{A}| = \aleph_0$ exactly.

**Verification.**
- $\sqrt{2}$ is algebraic: root of $x^2 - 2$. ✓
- $i$ is algebraic: root of $x^2 + 1$. ✓
- The golden ratio $\varphi = (1 + \sqrt{5})/2$ is algebraic: root of $x^2 - x - 1$. ✓

**Interpretation.** Since $|\mathbb{R}| = |\mathbb{C}| = 2^{\aleph_0} > \aleph_0$, and $|\mathcal{A}| = \aleph_0$, "most" real numbers are **transcendental** (non-algebraic) — in fact, the transcendentals have the same cardinality as $\mathbb{R}$ itself. This is the famous **Cantor existence proof for transcendentals**, antedating the direct construction of specific transcendentals like $e$ (Hermite, 1873) and $\pi$ (Lindemann, 1882). Yet producing a concrete transcendental number remained difficult; Liouville's 1844 construction $\sum_k 10^{-k!}$ was the first explicit example. $\blacksquare$

([[04-sets-finite-countable-uncountable]])

---

### Problem D4
Use Cantor's diagonal argument to show the set of all infinite binary sequences is uncountable.

**Solution.**

**Setup.** Let $\mathcal{S} := \{0, 1\}^{\mathbb{N}}$ be the set of all functions $\mathbb{N} \to \{0, 1\}$, equivalently all infinite sequences $s = (s^1, s^2, s^3, \ldots)$ with $s^n \in \{0, 1\}$. We show $|\mathcal{S}| > \aleph_0$ by the **diagonal method**, the prototypical technique for proving uncountability.

**Strategy.** Assume for contradiction that $\mathcal{S}$ is countable. Then the elements can be listed: $s_1, s_2, s_3, \ldots$. Construct a new sequence $t$ that differs from $s_k$ in the $k$-th position (for every $k$). Then $t$ cannot be any of the $s_k$ in the list — contradiction.

**Step 1 — Assume countability.** Suppose $\mathcal{S}$ is countable. Then there is a bijection (or enumeration) $k \mapsto s_k$ giving
$$\mathcal{S} = \{s_1, s_2, s_3, \ldots\}.$$
Write each $s_k = (s_k^1, s_k^2, s_k^3, \ldots)$ where $s_k^n \in \{0, 1\}$.

Visualizing as an infinite table:

| | pos 1 | pos 2 | pos 3 | pos 4 | $\cdots$ |
|---|---|---|---|---|---|
| $s_1$ | $s_1^1$ | $s_1^2$ | $s_1^3$ | $s_1^4$ | $\cdots$ |
| $s_2$ | $s_2^1$ | $s_2^2$ | $s_2^3$ | $s_2^4$ | $\cdots$ |
| $s_3$ | $s_3^1$ | $s_3^2$ | $s_3^3$ | $s_3^4$ | $\cdots$ |
| $\vdots$ | | | | | $\ddots$ |

The **diagonal** of the table is the sequence $(s_1^1, s_2^2, s_3^3, \ldots)$.

**Step 2 — Define $t$ by flipping the diagonal.** For every $n \in \mathbb{N}$, set
$$t^n := 1 - s_n^n \in \{0, 1\}.$$
Explicitly: if $s_n^n = 0$ then $t^n = 1$; if $s_n^n = 1$ then $t^n = 0$. Define $t := (t^1, t^2, t^3, \ldots) \in \mathcal{S}$.

**Step 3 — Show $t \notin \{s_1, s_2, \ldots\}$.** Suppose $t = s_k$ for some $k \in \mathbb{N}$. Then every coordinate matches: $t^n = s_k^n$ for all $n$. In particular at $n = k$:
$$t^k = s_k^k.$$
But by construction, $t^k = 1 - s_k^k$. Combining:
$$s_k^k = 1 - s_k^k \implies 2 s_k^k = 1 \implies s_k^k = 1/2,$$
which is impossible since $s_k^k \in \{0, 1\}$. Contradiction.

**Step 4 — Conclude.** The assumption $\mathcal{S}$ is countable leads to a contradiction, so $\mathcal{S}$ is uncountable. $\blacksquare$

**Verification.**
- Toy example: enumerate three sequences $s_1 = (0, 0, 0, \ldots)$, $s_2 = (1, 1, 1, \ldots)$, $s_3 = (0, 1, 0, \ldots)$. Diagonal: $(0, 1, 0, \ldots)$; flipped diagonal $t = (1, 0, 1, \ldots)$. Indeed $t \neq s_1$ (differs at pos 1), $t \neq s_2$ (differs at pos 2), $t \neq s_3$ (differs at pos 3). ✓

**Interpretation.** Cantor's diagonal argument is the first and cleanest uncountability proof, revolutionary in 1874: it proves $\mathcal{S}$ is "strictly larger" than $\mathbb{N}$ in a precise sense. Since $\mathcal{S}$ is in bijection with $[0, 1)$ (via binary expansion, up to a countable set of dyadic rationals with two expansions) and $|\mathcal{S}| = 2^{\aleph_0} = |\mathbb{R}|$, we obtain $|\mathbb{R}| > |\mathbb{N}|$, establishing the existence of multiple infinite cardinalities. The technique generalizes to Cantor's theorem $|P(X)| > |X|$ for arbitrary sets $X$. $\blacksquare$

([[04-sets-finite-countable-uncountable]])

---

## Part E: Open and Closed Sets

### Problem E1
Prove that the arbitrary intersection of closed sets is closed.

**Solution.**

**Setup.** A set $F \subset \mathbb{R}$ is *closed* if its complement $F^c := \mathbb{R} \setminus F$ is *open*. A set $U \subset \mathbb{R}$ is *open* if every point has an open-interval neighborhood contained in $U$. Given an arbitrary family $\{F_\alpha\}_{\alpha \in I}$ of closed sets (with *any* index set $I$, finite, countable, or uncountable), we want $\bigcap_{\alpha} F_\alpha$ closed.

**Strategy.** Take complements. By De Morgan's laws, the complement of an intersection is the union of complements. Each complement is open. Use: *arbitrary unions of open sets are open*. Hence the complement of $\bigcap F_\alpha$ is open, i.e., $\bigcap F_\alpha$ is closed.

**Step 1 — Set up.** Let $F = \bigcap_{\alpha \in I} F_\alpha$.

**Step 2 — Compute $F^c$ via De Morgan.**
$$F^c = \left(\bigcap_{\alpha \in I} F_\alpha\right)^c = \bigcup_{\alpha \in I} F_\alpha^c.$$
*Proof of De Morgan (for completeness).* $x \in F^c$ iff $x \notin F$ iff $\exists \alpha : x \notin F_\alpha$ iff $\exists \alpha : x \in F_\alpha^c$ iff $x \in \bigcup_\alpha F_\alpha^c$. ✓

**Step 3 — Each $F_\alpha^c$ is open.** By the hypothesis that $F_\alpha$ is closed, its complement $F_\alpha^c$ is open.

**Step 4 — Arbitrary union of open sets is open.** This is a fundamental property of the topology: let $U = \bigcup_\alpha U_\alpha$ with each $U_\alpha$ open. Take any $x \in U$; then $x \in U_\beta$ for some $\beta$. Since $U_\beta$ is open, there exists $r > 0$ with $B(x, r) = (x - r, x + r) \subset U_\beta \subset U$. Hence $U$ is open.

**Step 5 — Conclude.** By Step 2, $F^c = \bigcup_\alpha F_\alpha^c$, a union of open sets (Step 3), hence open (Step 4). Therefore $F = (F^c)^c$ is closed by definition.

**Verification.**
- Finite case: $[0, 2] \cap [1, 3] = [1, 2]$, closed. ✓
- Countable case: $\bigcap_{n=1}^\infty [0, 1 + 1/n] = [0, 1]$, closed. ✓
- *Arbitrary* (uncountable) index case: $\bigcap_{t \in (0,1)} [0, 1 + t] = [0, 1]$, closed. ✓
- **Warning:** The analogous statement for *union* fails: $\bigcup_{n=1}^\infty [1/n, 1] = (0, 1]$ is *not* closed (limit point $0$ missing).

**Interpretation.** The closed-set axioms of a topological space are dual to the open-set axioms: closed sets are preserved by arbitrary intersections and finite unions (the converse pattern of open sets, which are preserved by arbitrary unions and finite intersections). This duality underlies the definition of **closure** as the smallest closed set containing a given set: $\overline{A} = \bigcap \{F \text{ closed} : F \supset A\}$, well-defined precisely because arbitrary intersections of closed sets are closed. $\blacksquare$

([[05-open-sets-closed-sets]])

---

### Problem E2
Find the interior, closure, and boundary of $A = [0, 1] \cup \{2\}$.

**Solution.**

**Setup.** Recall:
- **Interior** $A^\circ$ = largest open set contained in $A$ = $\{x \in A : \exists r > 0, B(x, r) \subset A\}$.
- **Closure** $\overline{A}$ = smallest closed set containing $A$ = $A \cup \{\text{limit points of } A\}$.
- **Boundary** $\partial A = \overline{A} \setminus A^\circ$ = points that are in the closure of both $A$ and $A^c$.

**Strategy.** Examine each point of $A$ and each limit point to classify it as interior, boundary, or exterior. The isolated point $\{2\}$ and the endpoints $0, 1$ will behave differently from the "inner" points $(0, 1)$.

**Step 1 — Compute $A^\circ$.**

Take any $x \in (0, 1)$. Let $r := \min(x, 1 - x) > 0$. Then $B(x, r) = (x - r, x + r) \subset (0, 1) \subset A$. So $x \in A^\circ$.

Take $x = 0$. Any $r > 0$ gives $B(0, r) = (-r, r)$; this contains $-r/2 \notin A$, so $B(0, r) \not\subset A$. Hence $0 \notin A^\circ$.

Similarly, $x = 1$ is not interior: $B(1, r) = (1 - r, 1 + r)$ contains $1 + r/2 \notin A$ (for $r$ small enough that $1 + r/2 < 2$).

Take $x = 2$. For $r = 1/2$, $B(2, 1/2) = (3/2, 5/2)$. The only point of this interval in $A$ is $2$ itself — any point distinct from $2$ in $(3/2, 5/2)$ lies outside $A$. So no $r > 0$ yields $B(2, r) \subset A$ (in fact for $r < 1/2$ the ball contains irrationals like $2 - r/2 \notin [0,1] \cup \{2\}$). Hence $2 \notin A^\circ$.

**Conclusion.** $A^\circ = (0, 1)$.

**Step 2 — Compute $\overline{A}$.**

Limit points of $A$ are points $p \in \mathbb{R}$ such that every neighborhood of $p$ contains some $x \in A$ with $x \neq p$.

- Every point of $(0, 1)$ is a limit point (trivially: any neighborhood hits $(0, 1)$).
- $0$ is a limit point: any $B(0, r)$ contains points of $(0, r) \cap (0, 1) \subset A$.
- $1$ is a limit point: similarly.
- $2$ is *not* a limit point: $B(2, 1/2) \cap A = \{2\}$, so there is no point of $A$ distinct from $2$ in this neighborhood. Hence $2$ is an *isolated* point of $A$.
- Points in $(-\infty, 0) \cup (1, 2) \cup (2, \infty)$ are not limit points: each has a neighborhood disjoint from $A$.

Limit points of $A$: $[0, 1]$. Hence $\overline{A} = A \cup [0,1] = [0, 1] \cup \{2\}$.

So $A$ is already closed: $\overline{A} = A$.

**Step 3 — Compute $\partial A$.**
$$\partial A = \overline{A} \setminus A^\circ = \big([0, 1] \cup \{2\}\big) \setminus (0, 1) = \{0, 1, 2\}.$$

Alternatively, $\partial A$ consists of points whose every neighborhood meets both $A$ and $A^c$:
- $0$: $B(0, r)$ contains $(0, r) \subset A$ and $(-r, 0) \subset A^c$. ✓
- $1$: similarly.
- $2$: $B(2, r)$ contains $2 \in A$ and $(2 - r, 2) \subset A^c$ (for $r < 1$). ✓
- Any $x \in (0, 1)$: $B(x, \min(x, 1-x)) \subset A$, so no points of $A^c$. Not boundary.

**Verification.**
- $A^\circ \subset A \subset \overline{A}$: $(0,1) \subset [0,1]\cup\{2\} \subset [0,1]\cup\{2\}$ ✓.
- $A$ closed iff $\overline{A} = A$: confirmed.
- $\partial A \cap A^\circ = \emptyset$: $\{0,1,2\} \cap (0,1) = \emptyset$ ✓.
- $\partial A \cup A^\circ = \overline{A}$: $\{0,1,2\} \cup (0,1) = [0,1] \cup \{2\}$ ✓.

**Interpretation.** The set $A$ illustrates two kinds of "edge" behavior: topological endpoints ($0, 1$ — boundary points of an interval) and isolated points ($2$ — boundary points that are not limit points). Classification:
- Interior points of $A$: $(0,1)$.
- Boundary points of $A$ that are in $A$: $\{0, 1, 2\}$.
- Limit points of $A$: $[0, 1]$.
- Isolated points of $A$: $\{2\}$.

The set is *closed* (equals its closure), bounded, hence **compact**. $\blacksquare$

([[05-open-sets-closed-sets]])

---

### Problem E3
Show that a set $E \subset \mathbb{R}$ is closed iff it contains all its limit points.

**Solution.**

**Setup.** A *limit point* (or *accumulation point*) of $E$ is a point $p \in \mathbb{R}$ such that every neighborhood $U$ of $p$ contains a point of $E$ distinct from $p$: $(U \setminus \{p\}) \cap E \neq \emptyset$. Note: $p$ need not itself be in $E$. The set of limit points is denoted $E'$.

**Strategy.** Prove both directions. $(\Rightarrow)$: if $E$ is closed, use that $E^c$ is open to show any $p \in E'$ must be in $E$. $(\Leftarrow)$: if $E$ contains all its limit points, show $E^c$ is open directly, i.e., every point not in $E$ has a neighborhood disjoint from $E$.

**Step 1 — Direction $(\Rightarrow)$.** Suppose $E$ is closed. Let $p$ be a limit point of $E$. We show $p \in E$.

Suppose for contradiction $p \notin E$, i.e., $p \in E^c$. Since $E$ is closed, $E^c$ is open. So there exists $r > 0$ with $B(p, r) = (p - r, p + r) \subset E^c$, which means $B(p, r) \cap E = \emptyset$.

But $p$ is a limit point of $E$, so $B(p, r)$ contains some point of $E$ distinct from $p$ — contradicting $B(p, r) \cap E = \emptyset$.

Hence $p \in E$. Since $p$ was an arbitrary limit point, $E' \subset E$.

**Step 2 — Direction $(\Leftarrow)$.** Suppose $E' \subset E$. We show $E$ is closed, i.e., $E^c$ is open.

Let $p \in E^c$, i.e., $p \notin E$. We must find $r > 0$ with $B(p, r) \subset E^c$.

Since $p \notin E$ and $E' \subset E$, in particular $p \notin E'$. By negation of the definition of limit point: there exists $r > 0$ such that $(B(p, r) \setminus \{p\}) \cap E = \emptyset$. Since additionally $p \notin E$, we strengthen to $B(p, r) \cap E = \emptyset$, i.e., $B(p, r) \subset E^c$.

Hence every $p \in E^c$ has an open-ball neighborhood in $E^c$: $E^c$ is open, so $E$ is closed.

**Verification.**
- $E = [0, 1]$: limit points are $[0, 1]$, all contained in $E$. ✓ $E$ is closed.
- $E = (0, 1)$: limit points are $[0, 1]$; $0, 1 \notin E$. ✗ $E$ is not closed.
- $E = \{1, 1/2, 1/3, \ldots\}$: unique limit point is $0$, not in $E$. ✗ Not closed.
- $E = \{1, 1/2, 1/3, \ldots\} \cup \{0\}$: adds $0$; now closed. ✓

**Interpretation.** This problem gives an *equivalent* characterization of closedness that is often more natural than "complement is open": closedness is preserved under taking limits. This is the formulation used to define closedness in abstract topology via nets/filters, and in metric spaces it reduces to the sequential criterion: $E$ is closed iff whenever $x_n \in E$ and $x_n \to x$, we have $x \in E$. The equivalence relies on the **first-countability** of metric spaces ($\mathbb{R}$ has a countable local base at each point, namely balls of rational radius). $\blacksquare$

([[05-open-sets-closed-sets]])

---

### Problem E4
Prove that a set $E$ is **open** iff for every $x \in E$ there exists $r > 0$ with $B(x, r) \subset E$.

**Solution.**

**Setup.** In $\mathbb{R}$ with the standard topology, the *definition* of openness is exactly the condition stated: "every point is an interior point". The problem asks us to confirm this equivalence; in many texts the stated condition is taken *as* the definition, and the problem becomes a sanity check. Either way, the resolution is:

**Step 1 — "$E$ open" means by definition: $\forall x \in E$, $\exists r > 0$, $B(x, r) \subset E$.**

Different textbook conventions:
- Some texts define openness directly by this property, making the proposition a tautology.
- Others define openness in terms of topology axioms (arbitrary union of basic open sets) or in terms of "$E$ is a union of open intervals", in which case the equivalence requires short verification.

Assume the latter: $E$ open $\iff$ $E$ is a union of open intervals $I_\alpha$.

**Step 2 — $(\Rightarrow)$.** Suppose $E = \bigcup_\alpha I_\alpha$ with each $I_\alpha = (a_\alpha, b_\alpha)$. Take $x \in E$. Then $x \in I_\beta = (a_\beta, b_\beta)$ for some $\beta$. Set $r := \min(x - a_\beta, b_\beta - x) > 0$ (both positive since $a_\beta < x < b_\beta$). Then $B(x, r) = (x - r, x + r) \subset (a_\beta, b_\beta) \subset E$.

**Step 3 — $(\Leftarrow)$.** Suppose every $x \in E$ has $r_x > 0$ with $B(x, r_x) \subset E$. Then
$$E = \bigcup_{x \in E} B(x, r_x),$$
a union of open intervals. Hence $E$ is open.

**Verification.**
- $E = (0, 1)$: for $x \in (0,1)$, $r = \min(x, 1 - x) > 0$ works. ✓
- $E = (0, 1) \cup (2, 3)$: same argument applied pointwise. ✓
- $E = [0, 1]$: at $x = 0$, no $r > 0$ works (balls contain negative numbers). Not open. ✓

**Interpretation.** This is the point-set version of openness. Equivalent formulations useful in practice:
- Every point has a neighborhood contained in $E$ (stated).
- $E$ equals its interior: $E = E^\circ$.
- $E$ is a union of open balls (intervals in $\mathbb{R}$).
- $E$ contains none of its boundary: $E \cap \partial E = \emptyset$.

All four are equivalent characterizations of openness in a metric space. $\blacksquare$

([[05-open-sets-closed-sets]])

---

## Part F: Compact Sets

### Problem F1
Prove that $[0, 1]$ is compact using the Heine-Borel theorem.

**Solution.**

**Setup.** A subset $K \subset \mathbb{R}$ is *compact* iff every open cover has a finite subcover. The **Heine-Borel theorem** states: for subsets of $\mathbb{R}^n$ (in particular $\mathbb{R}$), $K$ is compact iff $K$ is *closed* and *bounded*.

**Strategy.** Apply Heine-Borel: verify $[0, 1]$ is closed and bounded.

**Step 1 — $[0, 1]$ is bounded.** It is contained in $[-M, M]$ for any $M \geq 1$; for instance, $[0, 1] \subset [-1, 2]$. So $|x| \leq 1$ for all $x \in [0, 1]$. Bounded by $1$ in absolute value.

**Step 2 — $[0, 1]$ is closed.** We show the complement $[0, 1]^c = (-\infty, 0) \cup (1, \infty)$ is open.

*Proof that $(-\infty, 0) \cup (1, \infty)$ is open.* Both $(-\infty, 0)$ and $(1, \infty)$ are open intervals (open half-lines), hence open. Union of open sets is open.

Alternatively, using the limit-point criterion (Problem E3): every limit point of $[0, 1]$ lies in $[0, 1]$. If $p$ is a limit point, every neighborhood $B(p, r)$ contains a point of $[0, 1]$. By the $\varepsilon$-argument: if $p < 0$, take $r = |p|/2$; then $B(p, r) = (p - r, p + r) \subset (-\infty, 0)$, disjoint from $[0, 1]$ — so $p$ cannot be a limit point. Similarly $p > 1$ gives a neighborhood disjoint from $[0, 1]$. Hence every limit point satisfies $p \in [0, 1]$.

**Step 3 — Apply Heine-Borel.** $[0, 1]$ is closed and bounded, hence compact. $\blacksquare$

**Verification.**
- Sanity check via finite subcover of a specific cover: $[0, 1] \subset \bigcup_{n=1}^\infty (1/(n+2), 1)$ is a cover, but note $0 \notin (1/(n+2), 1)$ for any $n$, so this is *not* actually a cover — a typical trap. Adjust: $[0, 1] \subset \{(-\varepsilon, \varepsilon)\} \cup \bigcup_n (1/(n+2), 1 + \varepsilon)$. Compact gives finite subcover ✓.

**Interpretation.** The Heine-Borel theorem is the single most powerful tool for proving compactness of Euclidean sets; it reduces a quantifier-heavy open-cover condition to two easily checked properties. The proof of Heine-Borel itself uses the bisection argument or Lebesgue-number argument. In general metric spaces, closed + bounded need not imply compact (e.g., the unit ball of an infinite-dimensional Banach space); the correct generalization is *complete + totally bounded*, and for general topological spaces one uses open-cover compactness directly. $\blacksquare$

([[07-compact-sets]])

---

### Problem F2
Show that the set $\{1/n : n \in \mathbb{N}\} \cup \{0\}$ is compact, but $\{1/n : n \in \mathbb{N}\}$ (without $0$) is not.

**Solution.**

**Setup.** Let $S := \{1/n : n \in \mathbb{N}\} = \{1, 1/2, 1/3, \ldots\}$ and $T := S \cup \{0\}$. We must show $T$ is compact and $S$ is not.

**Strategy.** Both are bounded (inside $[0, 1]$). The decisive question is closedness.

**Step 1 — $T$ is bounded.** $T \subset [0, 1]$ since $1/n \in (0, 1]$ and $0 \in [0, 1]$.

**Step 2 — $T$ is closed.** We show the set of limit points of $T$ is $\{0\}$, and $0 \in T$.

*Candidates for limit points.* Any limit point $p$ of $T$ satisfies: every neighborhood $B(p, r)$ contains a point of $T$ distinct from $p$.

*Case $p \notin \{0, 1, 1/2, 1/3, \ldots\}$.* Then $p$ has a positive distance $d := \min\{|p|, |p - 1/n|\} > 0$ to the set $T$. (This minimum is attained because $T \cup \{0\}$ has a smallest positive element near $p$ and $0$ is also at distance $|p|$.) The ball $B(p, d/2)$ is disjoint from $T$, so $p$ is not a limit point.

*Case $p = 1/m$ for some $m \in \mathbb{N}$.* The consecutive points in $T$ near $1/m$ are $1/(m-1)$ (for $m > 1$) above and $1/(m+1)$ below, at distances
$$\frac{1}{m-1} - \frac{1}{m} = \frac{1}{m(m-1)}, \qquad \frac{1}{m} - \frac{1}{m+1} = \frac{1}{m(m+1)}.$$
Let $d := \min\bigl(\tfrac{1}{m(m-1)}, \tfrac{1}{m(m+1)}\bigr) > 0$. Then $B(1/m, d/2) \cap T = \{1/m\}$, so no point of $T$ distinct from $1/m$ is in the neighborhood. Hence $1/m$ is *not* a limit point (it is an *isolated* point of $T$).

*Case $p = 0$.* For any $r > 0$, by Archimedean there exists $n$ with $1/n < r$, i.e., $1/n \in B(0, r)$ and $1/n \neq 0$. So every neighborhood of $0$ contains a point of $T$ distinct from $0$: $0$ is a limit point.

Hence the set of limit points of $T$ is $\{0\}$, and $0 \in T$. By Problem E3, $T$ is closed.

**Step 3 — Apply Heine-Borel.** $T$ closed + bounded ⟹ $T$ compact.

**Step 4 — $S$ is not closed.** $0$ is a limit point of $S$ (same argument as above), but $0 \notin S$. By Problem E3, $S$ is not closed, so $S$ is not compact by Heine-Borel.

**Step 5 — Explicit cover of $S$ with no finite subcover.** For each $n \in \mathbb{N}$, set
$$U_n := \left(\frac{1}{n + 1/2}, \frac{2}{n}\right) = \left(\frac{2}{2n + 1}, \frac{2}{n}\right).$$
We verify $U_n$ is open (it is an open interval) and contains $1/n$: $\frac{2}{2n+1} < \frac{1}{n} < \frac{2}{n}$. ✓

*No other $1/m$ is in $U_n$.* We claim $1/m \in U_n \iff m = n$. If $1/m > \frac{2}{2n+1}$, then $m < \frac{2n+1}{2} = n + 1/2$, so $m \leq n$. If $1/m < \frac{2}{n}$, then $m > n/2$. Combining: $n/2 < m \leq n$, and for $n \geq 2$ this gives $m \in \{\lceil n/2 + 1 \rceil, \ldots, n\}$ — so *possibly* other indices as well, meaning this choice of interval is not tight.

**Simpler cover.** Use $U_n := (1/n - \delta_n, 1/n + \delta_n)$ with $\delta_n = 1/(2n(n+1))$, chosen small enough so that $U_n \cap S = \{1/n\}$ (the nearest other points $1/(n \pm 1)$ are distance $\geq 1/(n(n+1))$ away). Then $\{U_n\}_{n \geq 1}$ covers $S$ (each $1/n$ is in exactly one $U_n$), but any finite subcollection $U_{n_1}, \ldots, U_{n_k}$ misses $1/m$ for $m \notin \{n_1, \ldots, n_k\}$. Since infinitely many such $m$ exist, no finite subcover works. Hence $S$ fails open-cover compactness directly.

**Verification.**
- $T$ is the "one-point compactification at $0$" of $S$; adding the missing limit point makes the set closed. ✓
- Alternative proof that $T$ is compact via open-cover: given any open cover $\{V_\alpha\}$, choose $V_{\alpha_0}$ containing $0$. By openness, $V_{\alpha_0} \supset B(0, r)$ for some $r > 0$, and this ball contains $1/n$ for all $n$ with $1/n < r$, i.e., all but finitely many $n$. The finitely many remaining $1/n$ are each covered by some $V_{\alpha_i}$, giving a finite subcover.

**Interpretation.** $T$ is a prototype of a **convergent sequence together with its limit**, which in any metric space is compact (it is closed and contained in a bounded set, here $[0, 1]$). This example explains why compactness is *not* equivalent to "every sequence has a convergent subsequence" unless one also requires the limit to lie in the set — the correct formulation is **sequential compactness**, which in a metric space is equivalent to compactness. $\blacksquare$

([[07-compact-sets]])

---

### Problem F3
Let $K$ be compact and $F$ closed, with $K \subset \mathbb{R}$, $F \subset \mathbb{R}$. Show $K \cap F$ is compact.

**Solution.**

**Setup.** We want to show $K \cap F$ compact. Using Heine-Borel, this is equivalent to showing $K \cap F$ is closed and bounded.

**Strategy.**
- *Closedness:* $K \cap F$ is the intersection of a closed set $F$ and a closed set $K$ (compact implies closed), hence closed.
- *Boundedness:* $K \cap F \subset K$, and $K$ is bounded.

**Step 1 — $K$ is closed.** In $\mathbb{R}$, compact $\Rightarrow$ closed and bounded (Heine-Borel, one direction). So $K$ is closed.

**Step 2 — $K \cap F$ is closed.** Intersection of two closed sets is closed (finite case of Problem E1: if $F_1, F_2$ closed, then $(F_1 \cap F_2)^c = F_1^c \cup F_2^c$, a finite union of open sets, hence open).

**Step 3 — $K \cap F$ is bounded.** Since $K$ is bounded, there exists $M > 0$ with $|x| \leq M$ for all $x \in K$. Since $K \cap F \subset K$, the same bound $M$ works for $K \cap F$.

**Step 4 — Apply Heine-Borel.** $K \cap F$ closed + bounded ⟹ $K \cap F$ compact. $\blacksquare$

**Alternative proof via open covers.** Let $\{U_\alpha\}$ be an open cover of $K \cap F$. Then $\{U_\alpha\} \cup \{F^c\}$ covers $K$ (a point of $K$ is either in $F$, hence in $K \cap F \subset \bigcup U_\alpha$, or not in $F$, hence in $F^c$). The set $F^c$ is open ($F$ closed), so this is an open cover of $K$. By compactness of $K$, a finite subcover exists: $\{U_{\alpha_1}, \ldots, U_{\alpha_n}, F^c\}$ or $\{U_{\alpha_1}, \ldots, U_{\alpha_n}\}$ (with $F^c$ possibly omitted). Restricting to $K \cap F$: no point of $K \cap F$ is in $F^c$ (by definition), so $K \cap F$ is covered by $\{U_{\alpha_1}, \ldots, U_{\alpha_n}\}$, a finite subcover.

**Verification.**
- $K = [0, 2]$, $F = [1, 3]$: $K \cap F = [1, 2]$, closed and bounded, hence compact. ✓
- $K = [0, 1]$, $F = \mathbb{Z}$: $K \cap F = \{0, 1\}$, finite hence compact. ✓
- Contrast: replace "compact" with "closed": if $K, F$ are both closed but unbounded, $K \cap F$ may or may not be bounded. E.g., $K = [0, \infty), F = (-\infty, 1]$ gives $K \cap F = [0, 1]$, compact. But $K = F = \mathbb{Z}$: $K \cap F = \mathbb{Z}$, closed but not compact.

**Interpretation.** This is a frequently used "closing" lemma in analysis: compact sets are closed under intersection with closed sets — a stronger statement than closed sets are closed under arbitrary intersection. The theorem says compact subsets of a Hausdorff space form an ideal under intersection in a certain sense: *if $K$ is compact and $F$ is any closed subset of the ambient space, then $K \cap F$ is compact*. This is used e.g. in proofs of local compactness and in descending-intersection arguments like Cantor's nested intersection theorem. $\blacksquare$

([[07-compact-sets]])

---

### Problem F4
Prove the **Bolzano-Weierstrass theorem**: every bounded infinite subset of $\mathbb{R}$ has a limit point.

**Solution.**

**Setup.** Let $E \subset \mathbb{R}$ be bounded and infinite. "Bounded" means $E \subset [-M, M]$ for some $M > 0$. A *limit point* $p$ of $E$ is a point such that every neighborhood of $p$ contains a point of $E$ distinct from $p$.

**Strategy.** We give the compactness-based proof. The key insight: $[-M, M]$ is compact (closed + bounded). If $E$ had no limit points, every point of $[-M, M]$ would have a neighborhood containing at most one point of $E$; compactness would then reduce $E$ to a finite set — contradiction.

**Step 1 — Embed $E$ in a compact set.** Since $E$ is bounded, $E \subset [-M, M]$ for some $M > 0$. Recall $[-M, M]$ is compact by Heine-Borel (Problem F1, generalized to arbitrary bounded closed intervals).

**Step 2 — Assume for contradiction no limit point.** Suppose $E$ has no limit point in $\mathbb{R}$. We derive a contradiction with the infinitude of $E$.

**Step 3 — Construct a neighborhood cover.** For each $x \in [-M, M]$, consider whether $x$ is a limit point of $E$:

*Case $x$ is not a limit point of $E$.* By the negation of the definition, there exists $r_x > 0$ such that $B(x, r_x) \cap E \subset \{x\}$, i.e., the ball contains at most one point of $E$ (namely $x$ itself, if $x \in E$).

*Case $x$ is a limit point of $E$.* By our contradiction hypothesis, this case is empty: no $x$ is a limit point.

Hence for *every* $x \in [-M, M]$, there is $r_x > 0$ with $B(x, r_x) \cap E$ containing at most one element.

**Step 4 — Open cover.** $\{B(x, r_x)\}_{x \in [-M, M]}$ is an open cover of $[-M, M]$ (each $x$ is in its own ball).

**Step 5 — Apply compactness.** By compactness of $[-M, M]$, there is a finite subcover:
$$[-M, M] \subset B(x_1, r_{x_1}) \cup B(x_2, r_{x_2}) \cup \cdots \cup B(x_n, r_{x_n}).$$

**Step 6 — Count points of $E$.** Every point of $E$ is in $[-M, M]$, hence in some $B(x_i, r_{x_i})$. But each such ball contains at most $1$ point of $E$. Therefore
$$|E| \leq n < \infty,$$
contradicting the hypothesis that $E$ is infinite.

**Step 7 — Conclude.** The assumption in Step 2 is false. Hence $E$ has a limit point. $\blacksquare$

**Verification.**
- $E = \{1, 1/2, 1/3, \ldots\} \subset [0, 1]$: infinite, bounded. Limit point $0 \in \mathbb{R}$. ✓
- $E = \mathbb{Q} \cap [0, 1]$: infinite (countably), bounded. Every point of $[0, 1]$ is a limit point. ✓
- Counterexample if "bounded" dropped: $E = \mathbb{N}$ is infinite, no limit points in $\mathbb{R}$ (each $n$ has neighborhood $(n - 1/2, n + 1/2)$ containing no other natural). Boundedness is essential.
- Counterexample if "infinite" dropped: $E = \{0, 1\}$ is bounded, no limit points. Infinitude is essential.

**Interpretation.** Bolzano-Weierstrass is the "finiteness under boundedness" theorem: bounded infinite sets in $\mathbb{R}$ cannot be spread out — they must accumulate somewhere. It is equivalent (in $\mathbb{R}$) to:
- Every bounded sequence has a convergent subsequence.
- Every closed bounded set is sequentially compact.
- Heine-Borel (compactness of closed bounded sets).
- LUB axiom.

The theorem is the gateway to proofs of the Extreme Value Theorem, the Intermediate Value Theorem (indirectly), and the existence of many limits in analysis. In higher dimensions, the same statement holds by reducing to $1$-D coordinate-wise. $\blacksquare$

([[07-compact-sets]])

---

## Part G: Mixed / Challenging

### Problem G1
Show that between any two real numbers there are infinitely many rationals **and** infinitely many irrationals.

**Solution.**

**Setup.** Fix $a < b$ in $\mathbb{R}$. We want to show both $|\mathbb{Q} \cap (a, b)| = \aleph_0$ and $|(\mathbb{R} \setminus \mathbb{Q}) \cap (a, b)| = \aleph_0$ (in fact the irrationals give $2^{\aleph_0}$, but we content ourselves with "infinite").

**Strategy.** Use **density** of $\mathbb{Q}$ in $\mathbb{R}$: for any $a < b$, there exists $r \in \mathbb{Q}$ with $a < r < b$. Once we have one rational, we apply density again to smaller intervals to produce more, iterating to get infinitely many. For irrationals, observe that if $r$ is rational, $r + \sqrt{2}$ is irrational (since $\sqrt{2}$ is irrational and rationals are closed under addition), and the set $\mathbb{Q} + \sqrt{2}$ is dense.

**Step 1 — Prove density of $\mathbb{Q}$ (for completeness).** Given $a < b$, we find $p/q \in \mathbb{Q}$ with $a < p/q < b$. Set $\varepsilon := b - a > 0$. By Archimedean (Problem C4), choose $q \in \mathbb{N}$ with $q > 1/\varepsilon$, i.e., $1/q < \varepsilon$. Now let
$$p := \lceil q a \rceil + 1 = \lfloor q a \rfloor + 1 \text{ (or appropriate)},$$
chosen so that $p > qa$ and $p \leq qa + 1$ (smallest integer exceeding $qa$ gives $qa < p \leq qa + 1$). Then
$$\frac{p}{q} > a, \qquad \frac{p}{q} \leq a + \frac{1}{q} < a + \varepsilon = b.$$
Hence $a < p/q < b$.

**Step 2 — Infinitely many rationals.** Having produced $r_1 \in \mathbb{Q} \cap (a, b)$, apply Step 1 to the interval $(a, r_1)$ to produce $r_2 \in \mathbb{Q} \cap (a, r_1)$, then to $(a, r_2)$ to produce $r_3$, etc. We get a strictly decreasing sequence $r_1 > r_2 > r_3 > \cdots > a$ of distinct rationals in $(a, b)$. Hence $|\mathbb{Q} \cap (a, b)| \geq \aleph_0$.

Since $\mathbb{Q}$ itself is countable, $|\mathbb{Q} \cap (a, b)| \leq \aleph_0$. Hence $|\mathbb{Q} \cap (a, b)| = \aleph_0$.

**Step 3 — Infinitely many irrationals.** Consider the shifted set
$$\mathbb{Q} + \sqrt{2} := \{q + \sqrt{2} : q \in \mathbb{Q}\}.$$

*Each element is irrational:* if $q + \sqrt{2} = p/r$ for $p/r \in \mathbb{Q}$, then $\sqrt{2} = p/r - q \in \mathbb{Q}$, contradicting the irrationality of $\sqrt{2}$ (classical result, via parity argument or unique factorization).

*The set $\mathbb{Q} + \sqrt{2}$ is dense:* given $a < b$, apply Step 1 to the interval $(a - \sqrt{2}, b - \sqrt{2})$ to find $q \in \mathbb{Q}$ with $a - \sqrt{2} < q < b - \sqrt{2}$; then $a < q + \sqrt{2} < b$, and $q + \sqrt{2}$ is irrational.

Iterating as in Step 2 yields infinitely many irrationals in $(a, b)$.

**Verification.**
- $a = 0, b = 0.1$: the rationals $1/11, 1/12, 1/13, \ldots$ are in $(0, 0.1)$ (all $< 1/10$), confirming infinitely many. ✓
- Irrationals $\sqrt{2}/n$ for large $n$: eventually $\sqrt{2}/n < 0.1$, giving infinitely many irrationals in $(0, 0.1)$. ✓

**Interpretation.** The theorem says $\mathbb{Q}$ and $\mathbb{R} \setminus \mathbb{Q}$ are both **dense** in $\mathbb{R}$. Despite countable $\mathbb{Q}$ being "measure-theoretically negligible" and uncountable $\mathbb{R} \setminus \mathbb{Q}$ being "measure-theoretically full", they are topologically interlaced — you cannot separate them by any open interval. This density is the ultimate reason why Riemann integration of the Dirichlet function fails (the function oscillates wildly on every subinterval) while Lebesgue integration succeeds. $\blacksquare$

([[03-supremum-and-infimum]], [[04-sets-finite-countable-uncountable]])

---

### Problem G2
Prove: if $S \subset \mathbb{R}$ is a nonempty set with $\sup S = M$, then for every $n \in \mathbb{N}$ there is $x_n \in S$ with $M - 1/n < x_n \leq M$.

**Solution.**

**Setup.** We are given $M = \sup S$. Recall the two defining properties of supremum:
*(i) Upper bound:* $s \leq M$ for all $s \in S$.
*(ii) Least upper bound:* if $M' < M$, then $M'$ is not an upper bound, i.e., there exists $s \in S$ with $s > M'$.

This is sometimes called the **$\varepsilon$-characterization of supremum**: $M = \sup S$ iff $M$ is an upper bound and, for every $\varepsilon > 0$, there exists $s \in S$ with $s > M - \varepsilon$.

**Strategy.** Apply the $\varepsilon$-characterization with $\varepsilon = 1/n$.

**Step 1 — Fix $n \in \mathbb{N}$.** We seek $x_n \in S$ with $M - 1/n < x_n \leq M$.

**Step 2 — Note $1/n > 0$.** Hence $M - 1/n < M$.

**Step 3 — $M - 1/n$ is not an upper bound of $S$.** By definition of supremum (least upper bound property), any value strictly less than $M$ fails to be an upper bound. Hence there exists $x_n \in S$ with
$$x_n > M - \frac{1}{n}. \tag{1}$$

**Step 4 — $x_n \leq M$.** Since $M$ is an upper bound of $S$ and $x_n \in S$,
$$x_n \leq M. \tag{2}$$

**Step 5 — Combine.** Inequalities (1) and (2) together give
$$M - \frac{1}{n} < x_n \leq M,$$
as required. $\blacksquare$

**Verification.**
- $S = (0, 1)$, $M = \sup S = 1$: for $n = 10$, need $x \in (0, 1)$ with $0.9 < x \leq 1$; e.g., $x = 0.95$. ✓
- $S = [0, 1]$, $M = 1$: for $n = 10$, $x_n = 1$ works. ✓
- $S = \{1 - 1/k : k \in \mathbb{N}\}$, $M = 1$: for $n = 10$, need $x > 0.9$; take $k = 11$: $x = 1 - 1/11 = 10/11 \approx 0.909$. ✓

**Interpretation.** This is the starting point for any proof that uses suprema to construct approximating sequences. The formal consequence: the sequence $(x_n)$ produced satisfies $x_n \to M$, since $|x_n - M| < 1/n \to 0$. This *approximation by sequence* is crucial in:
- Proving closedness of suprema under limits.
- Extending suprema to topological completions.
- The construction of the Riemann-Lebesgue theory of integration as a supremum of step-function integrals.

The argument generalizes verbatim to infima (with $\inf S = m$ giving $x_n \in S$ with $m \leq x_n < m + 1/n$). $\blacksquare$

([[03-supremum-and-infimum]])

---

### Problem G3
Prove that the Cantor set $C$ (constructed by repeatedly removing middle thirds from $[0, 1]$) is compact, uncountable, and has empty interior.

**Solution.**

**Setup.** Let $C_0 := [0, 1]$. Having defined $C_{n}$ as a disjoint union of $2^n$ closed intervals each of length $3^{-n}$, form $C_{n+1}$ by removing the open middle third of each constituent interval. Define
$$C := \bigcap_{n=0}^{\infty} C_n.$$

Geometrically:
- $C_0 = [0, 1]$.
- $C_1 = [0, 1/3] \cup [2/3, 1]$.
- $C_2 = [0, 1/9] \cup [2/9, 1/3] \cup [2/3, 7/9] \cup [8/9, 1]$.
- Etc.

**Strategy — Compactness.** Each $C_n$ is a finite union of closed intervals, hence closed. The intersection $C = \bigcap C_n$ is closed (Problem E1). $C \subset [0, 1]$ is bounded. Heine-Borel gives compactness.

**Strategy — Uncountability.** Show every $x \in [0, 1]$ with ternary expansion in $\{0, 2\}^\mathbb{N}$ belongs to $C$, and vice versa. Then $|C| \geq |\{0, 2\}^\mathbb{N}| = 2^{\aleph_0}$ (uncountable by Problem D4).

**Strategy — Empty interior.** Show no open interval $(a, b)$ with $a < b$ is contained in $C$: the total length of $C_n$ is $(2/3)^n \to 0$, so any interval of positive length fails to fit in $C_n$ for large $n$, and hence fails to fit in $C$.

**Step 1 — Compactness.**

*(a) Each $C_n$ is closed.* $C_0 = [0, 1]$ is closed. Inductively, $C_{n+1}$ is obtained from $C_n$ by removing the open middle thirds of each component; removing open sets from a closed set yields a closed set, so $C_{n+1}$ is closed. (Alternatively: $C_n$ is a finite union of closed intervals, hence closed.)

*(b) $C = \bigcap_n C_n$ is closed.* Intersection of closed sets is closed (Problem E1).

*(c) $C$ is bounded.* $C \subset C_0 = [0, 1]$, bounded.

*(d) By Heine-Borel, $C$ is compact.*

**Step 2 — Uncountability via ternary expansion.**

Every $x \in [0, 1]$ admits a ternary expansion
$$x = \sum_{k=1}^{\infty} \frac{d_k}{3^k}, \qquad d_k \in \{0, 1, 2\}.$$
(The expansion is unique except for ternary "rationals" with finitely many nonzero digits, which have two expansions — we adopt the convention of choosing the expansion without tail of $0$'s where there is a choice.)

*Claim:* $x \in C$ iff $x$ has some ternary expansion with $d_k \in \{0, 2\}$ for all $k$.

*Proof of Claim.*
- At the first step, $[1/3, 2/3)$ is removed. Points of $[0, 1]$ minus this interval have $d_1 \in \{0, 2\}$ (with endpoint $1/3$ taking the expansion $0.0222\ldots_3$ with $d_1 = 0$, and $2/3 = 0.2000\ldots_3$ with $d_1 = 2$).
- Inductively, at step $n$, the middle third of each surviving subinterval is removed, which corresponds to disallowing $d_n = 1$.
- $C$ is the intersection: $x \in C$ iff $d_k \neq 1$ for all $k$ (choosing the appropriate expansion).

*Bijection.* Define $\phi : \{0, 2\}^{\mathbb{N}} \to C$ by
$$\phi(d_1, d_2, \ldots) := \sum_{k=1}^{\infty} \frac{d_k}{3^k}.$$
This is injective (distinct expansions in $\{0, 2\}^\mathbb{N}$ yield distinct values, since they do not have the ambiguity issue — no expansion of the form $0.d_1 \ldots d_{n-1} 2 \, 000 \ldots = 0.d_1 \ldots d_{n-1} 1 \, 222 \ldots$ arises when $d_k \in \{0, 2\}$).

Hence $|C| \geq |\{0, 2\}^\mathbb{N}| = 2^{\aleph_0}$, uncountable.

**Step 3 — Empty interior.** We show no open interval $(a, b)$ with $a < b$ is contained in $C$.

Let $L_n := $ total length of $C_n = (2/3)^n$. (Proof: $C_n$ is a disjoint union of $2^n$ intervals of length $3^{-n}$, so total length $2^n \cdot 3^{-n} = (2/3)^n$.)

Given any open interval $(a, b) \subset [0, 1]$ with $b - a > 0$: by Archimedean, pick $n$ with $(2/3)^n < b - a$. Then $(a, b)$ has length exceeding the total length of $C_n$, so $(a, b) \not\subset C_n$, hence $(a, b) \not\subset C$.

More carefully: $(a, b)$ cannot fit inside any single component of $C_n$ (each of length $3^{-n} \leq (2/3)^n$ only for small $n$; for large $n$ the components are much shorter than $(2/3)^n$, specifically $3^{-n}$). For $n$ with $3^{-n} < b - a$, $(a, b)$ exceeds every component of $C_n$ and must span at least one removed middle third — so $(a, b) \not\subset C_n$. Hence $(a, b) \not\subset C$.

Therefore $C$ contains no nontrivial open interval: $C^\circ = \emptyset$.

**Verification.**
- Measure: $m(C) = \lim_{n\to\infty} (2/3)^n = 0$. So $C$ is a *null set*. ✓
- Endpoints $0, 1/3, 2/3, 1 \in C$ (all survive every stage). Their ternary expansions $0.000\ldots, 0.0222\ldots, 0.2000\ldots, 0.222\ldots$ are in $\{0, 2\}^\mathbb{N}$. ✓
- Nowhere dense: $C$ is closed (hence $\overline{C} = C$) with $C^\circ = \emptyset$, so $\overline{C}$ has empty interior — i.e., $C$ is nowhere dense.

**Interpretation.** The Cantor set is a canonical example of a **perfect, compact, nowhere dense, uncountable, measure-zero** subset of $[0, 1]$ — illustrating that these adjectives are logically independent. It refutes many naive intuitions (e.g., "uncountable $\Rightarrow$ has interior" or "has measure zero $\Rightarrow$ countable"). The Cantor set is the prototype of a **fractal**: it has Hausdorff dimension $\log 2 / \log 3 \approx 0.631$. It is homeomorphic to $\{0, 1\}^\mathbb{N}$ (the Cantor space), which makes it a universal object: every compact metric space without isolated points and totally disconnected is homeomorphic to $C$. $\blacksquare$

([[05-open-sets-closed-sets]], [[07-compact-sets]], [[04-sets-finite-countable-uncountable]])

---

### Problem G4
Show that $[0, 1]$ is **uncountable**.

**Solution.**

**Setup.** We use Cantor's diagonal argument in decimal form (parallel to Problem D4, but for decimal rather than binary expansions).

**Strategy.** Assume $[0, 1]$ is countable. Enumerate its elements, write each as a decimal expansion, and construct a new number that differs from the $n$-th listed number in the $n$-th decimal digit. The new number is in $[0, 1]$ but not in the enumeration — contradiction.

A subtle point: decimal expansions are not unique (e.g., $0.5000\ldots = 0.4999\ldots$). To avoid this pitfall, we choose the "flipping" to avoid ambiguous values like $0$ and $9$.

**Step 1 — Assume for contradiction $[0, 1]$ is countable.** List its elements: $[0, 1] = \{x_1, x_2, x_3, \ldots\}$.

**Step 2 — Decimal expand each $x_n$.** Choose for each $x_n$ a decimal expansion
$$x_n = 0 . d_1^n \, d_2^n \, d_3^n \, \ldots, \qquad d_k^n \in \{0, 1, \ldots, 9\}.$$
(If $x_n$ is a dyadic or terminating decimal, choose, say, the non-terminating expansion $0.4999\ldots$ instead of $0.5000\ldots$; or adopt any fixed convention. The argument works for any choice.)

Visualize:

| | pos 1 | pos 2 | pos 3 | $\cdots$ |
|---|---|---|---|---|
| $x_1$ | $d_1^1$ | $d_2^1$ | $d_3^1$ | $\cdots$ |
| $x_2$ | $d_1^2$ | $d_2^2$ | $d_3^2$ | $\cdots$ |
| $x_3$ | $d_1^3$ | $d_2^3$ | $d_3^3$ | $\cdots$ |
| $\vdots$ | | | | $\ddots$ |

**Step 3 — Define the "flipped diagonal" $y$.** For each $n \in \mathbb{N}$, define
$$e_n := \begin{cases} 2 & \text{if } d_n^n = 1, \\ 1 & \text{if } d_n^n \neq 1. \end{cases}$$
Note $e_n \in \{1, 2\}$ always. Define
$$y := 0 . e_1 \, e_2 \, e_3 \, \ldots = \sum_{n=1}^{\infty} \frac{e_n}{10^n}.$$

**Step 4 — $y \in [0, 1]$.** Since each $e_n \in \{1, 2\}$,
$$0 < y \leq \sum_{n=1}^{\infty} \frac{2}{10^n} = \frac{2}{9} < 1.$$
So $y \in (0, 2/9] \subset [0, 1]$. ✓

**Step 5 — $y \neq x_n$ for every $n$.** Suppose $y = x_n$ for some $n$. Then the decimal expansions of $y$ and $x_n$ must agree, at least up to the $\pm 1$ ambiguity at terminating decimals.

Crucially, $y$'s expansion uses only digits $\{1, 2\}$ — in particular, $y$ is not of the form $a/10^k$ (terminating decimal) because such decimals have either a tail of $0$'s (absent from $y$) or a tail of $9$'s (absent from $y$). So $y$'s decimal expansion is *unique*.

Therefore the expansion of $y$ must equal the expansion of $x_n$ we chose in Step 2. In particular, at position $n$:
$$e_n = d_n^n.$$
But by construction, $e_n \neq d_n^n$: if $d_n^n = 1$, $e_n = 2$, and if $d_n^n \neq 1$, $e_n = 1 \neq d_n^n$ (since $d_n^n$ might happen to be $1$... wait, in the second branch $d_n^n \neq 1$ so $e_n = 1 \neq d_n^n$ ✓). Contradiction.

**Step 6 — Conclude.** The assumption in Step 1 is false. Hence $[0, 1]$ is uncountable. $\blacksquare$

**Verification.**
- Toy case: three-element list $x_1 = 0.12345\ldots$, $x_2 = 0.67890\ldots$, $x_3 = 0.11111\ldots$. Diagonals: $d_1^1 = 1, d_2^2 = 7, d_3^3 = 1$. Flipped: $e_1 = 2, e_2 = 1, e_3 = 2$. So $y = 0.212\ldots$. We have $y \neq x_1$ (first digit $2$ vs $1$), $y \neq x_2$ (second digit $1$ vs $7$), $y \neq x_3$ (third digit $2$ vs $1$). ✓

**Interpretation.** This establishes $|[0, 1]| > \aleph_0 = |\mathbb{N}|$, and consequently $|\mathbb{R}| > \aleph_0$ (since $\mathbb{R}$ contains $[0, 1]$). The cardinality of $\mathbb{R}$ is denoted $\mathfrak{c}$ (the *continuum*) and equals $2^{\aleph_0}$. Whether $\mathfrak{c}$ equals $\aleph_1$ (the smallest uncountable cardinal) is the **Continuum Hypothesis**, famously independent of ZFC set theory (Gödel 1940, Cohen 1963). The use of digits $\{1, 2\}$ avoids the ambiguity of terminal $9$s: a number like $0.1999\ldots = 0.2000\ldots$ has two decimal expansions, which could break the proof if not handled. $\blacksquare$

([[04-sets-finite-countable-uncountable]])

---

### Problem G5
Let $f : A \to B$ be injective with $B$ countable. Prove $A$ is countable.

**Solution.**

**Setup.** $B$ countable means either $B$ is finite or there is a bijection $g : \mathbb{N} \to B$. Injectivity of $f$ means $f(a_1) = f(a_2) \implies a_1 = a_2$. We must show $A$ is countable.

**Strategy.** View $f$ as a bijection onto its image. The image $f(A) \subset B$ is a subset of a countable set, hence countable. Transfer the enumeration back to $A$ via $f^{-1}|_{f(A)}$.

**Step 1 — $f: A \to f(A)$ is a bijection.** By definition $f: A \to f(A)$ is surjective (it surjects onto its image). Injectivity of $f$ is preserved under restricting the codomain. Hence $f: A \to f(A)$ is bijective.

**Step 2 — $f(A) \subset B$ is countable.** Subsets of countable sets are countable.

*Proof.* Let $C \subset B$. If $B$ is finite, so is $C$ (and finite $\Rightarrow$ countable). If $B$ is countably infinite with bijection $g: \mathbb{N} \to B$, set $C' := g^{-1}(C) \subset \mathbb{N}$. If $C' = \emptyset$, $C = \emptyset$ is countable. Otherwise, $C' \subset \mathbb{N}$ is nonempty; we can enumerate $C'$ in increasing order $n_1 < n_2 < n_3 < \ldots$, with either a finite or infinite list. The restriction $g|_{C'} : C' \to C$ is a bijection composed with the enumeration $k \mapsto n_k$ gives an enumeration of $C$.

**Step 3 — $A$ is countable.** By Step 1, $|A| = |f(A)|$. By Step 2, $|f(A)| \leq \aleph_0$. Hence $|A| \leq \aleph_0$, i.e., $A$ is countable.

**Explicit enumeration of $A$.** Suppose $g : \mathbb{N} \to B$ is a bijection. The composition $g^{-1} \circ f : A \to \mathbb{N}$ is injective. Order the elements of $A$ by the integers they map to: if $A = \{a_1, a_2, \ldots\}$ with $g^{-1}(f(a_1)) < g^{-1}(f(a_2)) < \cdots$, this is a well-defined enumeration (either finite or infinite). $\blacksquare$

**Verification.**
- $A = \mathbb{Z}$, $B = \mathbb{Q}$, $f: n \mapsto n$. Injective, $B$ countable, $A = \mathbb{Z}$ countable ✓.
- $A = \mathbb{Q}$, $B = \mathbb{Z}^2 \setminus \{(a, 0)\}$, $f(p/q) = (p, q)$ with gcd condition. Injective (reduced form), $B$ countable, $A$ countable ✓.
- Contrapositive: if $A$ is uncountable and $B$ countable, no injection $A \hookrightarrow B$ exists. E.g., no injection $\mathbb{R} \hookrightarrow \mathbb{Q}$.

**Interpretation.** This is one of the most fundamental tools for proving countability: exhibit an injection into a known countable set. Combined with:
- Subsets of countable sets are countable.
- Finite products of countable sets are countable.
- Countable unions of countable sets are countable.

These three facts encode most of "cardinal arithmetic $\leq \aleph_0$" and allow rapid proofs of countability for sets like $\mathbb{Q}$, $\mathbb{Z}[x]$, algebraic numbers, finite subsets of $\mathbb{N}$, etc. Dually, for uncountability proofs one exhibits a surjection *from* a known uncountable set (like $\{0, 1\}^\mathbb{N}$) or uses diagonal arguments. $\blacksquare$

([[04-sets-finite-countable-uncountable]])

---

## Summary

| Problem Topic | Key lesson | Core technique |
|---|---|---|
| A1-A3 | [[01-real-number-system]] | Field/order axioms, triangle inequality, $\varepsilon$-characterization of $|\cdot|$ |
| B1-B4 | [[02-inequalities]] | AM-GM (pairwise, factor-by-factor multiplication), Cauchy-Schwarz with judicious vector choice, Young via log-concavity |
| C1-C4 | [[03-supremum-and-infimum]] | $\varepsilon$-characterization of sup, monotonicity under inclusion, LUB axiom $\Rightarrow$ Archimedean |
| D1-D4 | [[04-sets-finite-countable-uncountable]] | Explicit bijection $(m,n) \mapsto 2^{m-1}(2n-1)$, countable unions, roots of $\mathbb{Z}[x]$, Cantor diagonal |
| E1-E4 | [[05-open-sets-closed-sets]] | De Morgan, limit-point criterion for closedness, interior/closure/boundary trichotomy |
| F1-F4 | [[07-compact-sets]] | Heine-Borel (closed + bounded), compact $\cap$ closed = compact, Bolzano-Weierstrass via finite subcover |
| G1-G5 | Cross-topic | Density of $\mathbb{Q}$ and $\mathbb{Q} + \sqrt{2}$, $\varepsilon$-selection from sup, Cantor set is the prototype "big-small" set |

These problems should build fluency with the foundational topological and order-theoretic tools used throughout the rest of the course: every technique appearing here (Archimedean extraction, diagonal arguments, Heine-Borel reduction, epsilon-flexibility of sup/inf) recurs in CO2–CO5 for sequences, series, continuity, differentiation, and Riemann integration.

---

## Related Topics

- [[01-real-number-system]] through [[07-compact-sets]] — CO1 content lessons.
- [[08-sequences-introduction]] — next unit (CO2) builds on these foundations, using the Archimedean property and Bolzano-Weierstrass repeatedly.
